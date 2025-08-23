export async function listInputDevices(): Promise<MediaDeviceInfo[]> {
  try {
    const all = await navigator.mediaDevices.enumerateDevices();
    return all.filter((d) => d.kind === "audioinput");
  } catch {
    return [];
  }
}

export async function ensureMicPermission(deviceId?: string): Promise<MediaStream> {
  const base: MediaTrackConstraints = {
    echoCancellation: { ideal: true },
    noiseSuppression: { ideal: true },
    autoGainControl: { ideal: true },
    channelCount: { ideal: 1 },
  };

  if (deviceId) {
    try {
      return await navigator.mediaDevices.getUserMedia({
        audio: { ...base, deviceId: { exact: deviceId } },
        video: false,
      });
    } catch {
      try {
        return await navigator.mediaDevices.getUserMedia({
          audio: { ...base, deviceId: { ideal: deviceId } },
          video: false,
        });
      } catch {}
    }
  }
  return navigator.mediaDevices.getUserMedia({ audio: base, video: false });
}

export function pickMimeType(): string | undefined {
  const candidates = ["audio/webm;codecs=opus", "audio/webm"];
  for (const t of candidates) if ((window as any).MediaRecorder && MediaRecorder.isTypeSupported(t)) return t;
  return undefined;
}

/** Decode Blob → mono Float32 PCM @ 16kHz */
export async function decodeAndResampleTo16k(blob: Blob): Promise<Float32Array> {
  const arr = await blob.arrayBuffer();
  const AC = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
  const ac = new AC();
  const src = await ac.decodeAudioData(arr);

  // mixdown to mono
  const frames = src.length;
  const channels = src.numberOfChannels;
  const mixed = new Float32Array(frames);
  for (let ch = 0; ch < channels; ch++) {
    const data = src.getChannelData(ch);
    for (let i = 0; i < frames; i++) mixed[i] += data[i] / channels;
  }

  if (src.sampleRate === 16000) {
    ac.close();
    return mixed;
  }

  const durationSec = src.duration;
  const targetFrames = Math.ceil(16000 * durationSec);
  const OAC = (window as any).OfflineAudioContext || (window as any).webkitOfflineAudioContext;
  const oac = new OAC(1, targetFrames, 16000);
  const buf = oac.createBuffer(1, frames, src.sampleRate);
  buf.copyToChannel(mixed, 0);
  const node = oac.createBufferSource();
  node.buffer = buf;
  node.connect(oac.destination);
  node.start();
  const rendered: AudioBuffer = await oac.startRendering();
  const out = new Float32Array(rendered.getChannelData(0));
  ac.close();
  return out;
}

/** Encode Float32 PCM → MP3 using lamejs */
export async function encodeMp3FromPCM(pcm: Float32Array, sampleRate = 16000): Promise<Blob> {
  const lamejs = await import("lamejs");
  const Mp3Encoder = (lamejs as any).Mp3Encoder as any;
  const encoder = new Mp3Encoder(1, sampleRate, 128);

  const pcm16 = new Int16Array(pcm.length);
  for (let i = 0; i < pcm.length; i++) {
    let s = Math.max(-1, Math.min(1, pcm[i]));
    pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }

  const block = 1152;
  const chunks: Uint8Array[] = [];
  for (let i = 0; i < pcm16.length; i += block) {
    const slice = pcm16.subarray(i, Math.min(i + block, pcm16.length));
    const mp3buf = encoder.encodeBuffer(slice);
    if (mp3buf.length > 0) chunks.push(new Uint8Array(mp3buf));
  }
  const end = encoder.flush();
  if (end.length > 0) chunks.push(new Uint8Array(end));
  return new Blob(chunks, { type: "audio/mpeg" });
}
