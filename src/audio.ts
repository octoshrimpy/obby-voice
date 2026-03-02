// src/audio.ts
import type { App, Plugin } from "obsidian";

/* -------------------------------------------------------------------------- */
/*                               Input utilities                               */
/* -------------------------------------------------------------------------- */

/** List available audio-input devices (labels may be empty until gUM granted). */
export async function listInputDevices(): Promise<MediaDeviceInfo[]> {
  try {
    const all = await navigator.mediaDevices.enumerateDevices();
    return all.filter((d) => d.kind === "audioinput");
  } catch {
    return [];
  }
}

/** Ask for mic permission; prefer the chosen device if provided, with graceful fallback. */
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
      } catch {
        /* fall through */
      }
    }
  }
  return navigator.mediaDevices.getUserMedia({ audio: base, video: false });
}

/** Pick the best recording mime type available. */
export function pickMimeType(): string | undefined {
  const candidates = [
    "audio/webm;codecs=opus",
    "audio/ogg;codecs=opus",
    "audio/webm",
  ];
  for (const t of candidates) {
    if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(t)) {
      return t;
    }
  }
  return undefined;
}

/* -------------------------------------------------------------------------- */
/*                              Decode + Resample                              */
/* -------------------------------------------------------------------------- */

/** Decode Blob → mono Float32 PCM @ 16 kHz. */
export async function decodeAndResampleTo16k(blob: Blob): Promise<Float32Array> {
  const arr = await blob.arrayBuffer();

  const AC = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
  const ac = new AC();

  // Safari still supports the promise form; keep try/catch in case of legacy
  const src: AudioBuffer = await ac.decodeAudioData(arr);

  // Mixdown to mono
  const frames = src.length;
  const channels = src.numberOfChannels;
  const mixed = new Float32Array(frames);
  for (let ch = 0; ch < channels; ch++) {
    const data = src.getChannelData(ch);
    for (let i = 0; i < frames; i++) mixed[i] += data[i] / channels;
  }

  if (src.sampleRate === 16000) {
    try { ac.close(); } catch {}
    return mixed;
  }

  const durationSec = src.duration;
  const targetFrames = Math.ceil(16000 * durationSec);

  const OAC =
    (window as any).OfflineAudioContext || (window as any).webkitOfflineAudioContext;
  const oac = new OAC(1, targetFrames, 16000);

  const buf = oac.createBuffer(1, frames, src.sampleRate);
  buf.copyToChannel(mixed, 0);

  const node = oac.createBufferSource();
  node.buffer = buf;
  node.connect(oac.destination);
  node.start(0);

  const rendered: AudioBuffer = await oac.startRendering();
  const out = new Float32Array(rendered.getChannelData(0)); // copy

  try { ac.close(); } catch {}
  return out;
}

/* -------------------------------------------------------------------------- */
/*                          MP3 (lamejs UMD/IIFE loader)                       */
/* -------------------------------------------------------------------------- */

let lameOnce: Promise<any> | null = null;

/** Build a vault resource URL for a file inside this plugin. */
function pluginResourceUrl(app: App, pluginId: string, relPath: string): string {
  // Path relative to vault root
  return app.vault.adapter.getResourcePath(`.obsidian/plugins/${pluginId}/${relPath}`);
}

/** Load vendor/lame.min.js (UMD) once and return window.lamejs. Falls back to CDN. */
export async function loadLame(plugin: Plugin): Promise<any> {
  const w = window as any;
  if (w.lamejs?.Mp3Encoder) return w.lamejs;
  if (lameOnce) return lameOnce;

  lameOnce = new Promise<void>((resolve, reject) => {
    const trySrcs = [
      // ✅ local copy you ship with the plugin
      () => pluginResourceUrl(plugin.app, plugin.manifest.id, "vendor/lame.min.js"),
      // fallback CDNs (either works)
      () => "https://cdn.jsdelivr.net/npm/lamejs@1.2.0/lame.min.js",
      () => "https://unpkg.com/lamejs@1.2.0/lame.min.js",
    ];

    const loadNext = (i: number) => {
      if (i >= trySrcs.length) return reject(new Error("Failed to load lamejs"));
      const s = document.createElement("script");
      s.async = true;
      s.src = trySrcs[i]();
      s.onload = () => {
        if ((window as any).lamejs?.Mp3Encoder) resolve();
        else loadNext(i + 1); // loaded but wrong build; try next
      };
      s.onerror = () => loadNext(i + 1);
      document.head.appendChild(s);
    };

    loadNext(0);
  }).then(() => (window as any).lamejs);

  return lameOnce;
}

/** Encode Float32 PCM → MP3 using lamejs (mono, 16 kHz). */
export async function encodeMp3FromPCM(
  plugin: Plugin,
  pcm: Float32Array,
  sampleRate = 16000
): Promise<Blob> {
  const lame = await loadLame(plugin);
  const Mp3Encoder = lame.Mp3Encoder;
  if (!Mp3Encoder) {
    throw new Error("lamejs did not expose Mp3Encoder (non-UMD build?)");
  }

  // Float32 [-1,1] → Int16
  const pcm16 = new Int16Array(pcm.length);
  for (let i = 0; i < pcm.length; i++) {
    const v = Math.max(-1, Math.min(1, pcm[i]));
    pcm16[i] = v < 0 ? v * 0x8000 : v * 0x7fff;
  }

  // 96–128 kbps is fine for voice
  const encoder = new Mp3Encoder(1, sampleRate, 96);

  const CHUNK = 1152;
  const out: Uint8Array[] = [];
  for (let i = 0; i < pcm16.length; i += CHUNK) {
    const slice = pcm16.subarray(i, Math.min(i + CHUNK, pcm16.length));
    const buf = encoder.encodeBuffer(slice);
    if (buf && buf.length) out.push(new Uint8Array(buf));
  }
  const end = encoder.flush();
  if (end && end.length) out.push(new Uint8Array(end));

  return new Blob(out, { type: "audio/mpeg" });
}
