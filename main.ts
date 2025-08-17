import {
  App,
  Modal,
  Notice,
  Plugin,
  PluginSettingTab,
  Setting,
  TFile,
  TFolder,
  moment,
  normalizePath,
  DropdownComponent,
} from "obsidian";

// ---------------- Types & support cache ----------------

type SupportStatus = { supported: boolean; reason?: string };
let SUPPORT: SupportStatus = { supported: true };

// ---------------- Settings ----------------

interface VoiceInboxSettings {
  inboxFolder: string;              // folder for YYYY-MM-DD.md
  filenameDateFormat: string;       // e.g., "YYYY-MM-DD"
  entryDateFormat: string;          // e.g., "MMM D, YYYY h:mm A"

  // STT (transformers) model id
  modelId: string;                  // e.g., "Xenova/whisper-tiny.en"

  // Mic selection
  inputDeviceId: string;            // exact deviceId or "" for default

  // Audio saving
  saveAudioFile: boolean;           // default true (save MP3)
  audioFormat: "mp3" | "webm";      // default "mp3"
  audioSubfolder: string;           // optional subfolder for saved audio

  // Low-confidence / failure handling (still used for notes/warnings)
  saveAudioOnLowConfidence: boolean;
  lowConfMinDurationMs: number;     // min duration to evaluate WPM
  lowConfMinWpm: number;            // WPM threshold
}

const DEFAULT_SETTINGS: VoiceInboxSettings = {
  inboxFolder: "Inbox",
  filenameDateFormat: "YYYY-MM-DD",
  entryDateFormat: "MMM D, YYYY h:mm A",

  modelId: "Xenova/whisper-tiny.en",

  inputDeviceId: "",

  saveAudioFile: true,
  audioFormat: "mp3",
  audioSubfolder: "Audio",

  saveAudioOnLowConfidence: true,
  lowConfMinDurationMs: 5000,
  lowConfMinWpm: 15,
};

// ---------------- Minimal environment preflight ----------------

function envSupported(): SupportStatus {
  const hasMedia = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  const hasAudioCtx = !!(window.AudioContext || (window as any).webkitAudioContext);
  if (!hasMedia) return { supported: false, reason: "No mediaDevices.getUserMedia" };
  if (!hasAudioCtx) return { supported: false, reason: "No AudioContext" };
  return { supported: true };
}

// ---------------- ASR (transformers, SAB-free WASM) ----------------
// Lazily loaded to avoid heavy startup
let asrPipeline: any = null;

async function getASRPipeline(
  modelId: string,
  onProgress?: (msg: string, pct?: number) => void
): Promise<any> {
  if (asrPipeline) return asrPipeline;

  const { pipeline, env } = await import("@xenova/transformers");

  // Cache models in browser storage
  env.useBrowserCache = true;
  env.allowLocalModels = false;

  // Force plain WASM (no threads / no SIMD / no proxy worker) => no SharedArrayBuffer
  if (env.backends?.onnx?.wasm) {
    env.backends.onnx.wasm.proxy = false;
    env.backends.onnx.wasm.numThreads = 1;
    env.backends.onnx.wasm.simd = false;
  }

  asrPipeline = await pipeline("automatic-speech-recognition", modelId, {
    quantized: true,
    progress_callback: (p: any) => {
      if (!onProgress) return;
      const total = p.total ?? 0;
      const loaded = p.loaded ?? 0;
      const pct = total ? Math.round((loaded / total) * 100) : undefined;
      if (p.status) onProgress(`${p.status}…`, pct);
    },
  });

  return asrPipeline;
}

// Decode Blob → mono Float32 PCM @ 16kHz (browser-native resampler)
async function decodeAndResampleTo16k(blob: Blob): Promise<Float32Array> {
  const arr = await blob.arrayBuffer();
  const AC = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
  const ac = new AC();
  const src = await ac.decodeAudioData(arr);

  // Mixdown to mono
  const frames = src.length;
  const channels = src.numberOfChannels;
  const mixed = new Float32Array(frames);
  for (let ch = 0; ch < channels; ch++) {
    const data = src.getChannelData(ch);
    for (let i = 0; i < frames; i++) mixed[i] += data[i] / channels;
  }

  // If already 16kHz, return
  if (src.sampleRate === 16000) {
    ac.close();
    return mixed;
  }

  // Resample using OfflineAudioContext
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
  const out = new Float32Array(rendered.getChannelData(0)); // copy
  ac.close();
  return out;
}

// Encode Float32 PCM (mono) → MP3 (lamejs)
async function encodeMp3FromPCM(pcm: Float32Array, sampleRate = 16000): Promise<Blob> {
  const lame: any = await import("lamejs");
  const Mp3Encoder = lame.Mp3Encoder as any;
  const encoder = new Mp3Encoder(1, sampleRate, 128); // mono, 16kHz, 128 kbps

  // Convert Float32 [-1,1] → Int16
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

// Enumerate input devices (labels only appear AFTER at least one mic permission grant)
async function listInputDevices(): Promise<MediaDeviceInfo[]> {
  try {
    const all = await navigator.mediaDevices.enumerateDevices();
    return all.filter((d) => d.kind === "audioinput");
  } catch {
    return [];
  }
}

// Request permission explicitly so we get labels for device selection UI
async function ensureMicPermission(deviceId?: string): Promise<MediaStream> {
  const constraints: MediaStreamConstraints = {
    audio: deviceId
      ? {
          deviceId: { exact: deviceId },
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1,
        }
      : {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1,
        },
    video: false,
  };
  return navigator.mediaDevices.getUserMedia(constraints);
}

// ---------------- Plugin ----------------

export default class VoiceInboxPlugin extends Plugin {
  settings: VoiceInboxSettings;
  private activeModal?: RecordModal;

  async onload() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    SUPPORT = envSupported();

    this.addCommand({
      id: "record-voice-note-to-inbox",
      name: "Record voice note to Inbox (tap to stop)",
      checkCallback: (checking) => {
        if (!SUPPORT.supported) return false;
        if (checking) return true;
        this.openRecorder();
      },
    });

    this.addCommand({
      id: "obby-voice-support-info",
      name: "Obby Voice: environment support info",
      callback: () =>
        new Notice(SUPPORT.supported ? "Ready." : `Not supported: ${SUPPORT.reason || "unknown"}`),
    });

    if (!this.app.isMobile) {
      this.addRibbonIcon("microphone", "Record voice note to Inbox", () => this.openRecorder());
      const sb = this.addStatusBarItem();
      sb.setText("Obby Voice: Cmd Palette → Record");
    }

    this.addSettingTab(new VoiceInboxSettingsTab(this.app, this));
    new Notice("Obby Voice loaded");
  }

  onunload() {
    try { this.activeModal?.close(); } catch {}
    this.activeModal = undefined;
  }

  private openRecorder() {
    const m = new RecordModal(this.app, this);
    this.activeModal = m;
    m.openAndAutoStart();
  }

  async saveSettings() { await this.saveData(this.settings); }

  // Append transcript line to the day’s inbox (use captured time)
  async appendToDailyInbox(line: string, when = new Date()) {
    const m = moment(when);
    const folderPath = normalizePath(this.settings.inboxFolder || "Inbox");
    await this.ensureFolder(folderPath);

    const fileName = m.format(this.settings.filenameDateFormat) + ".md";
    const filePath = normalizePath(`${folderPath}/${fileName}`);

    let file = this.app.vault.getAbstractFileByPath(filePath) as TFile | null;
    if (!file) file = await this.app.vault.create(filePath, "");

    const prefix = `[${m.format(this.settings.entryDateFormat)}] `;
    const text = `${prefix}${line}\n`;
    await this.app.vault.append(file, (await this.needsLeadingNewline(file)) ? `\n${text}` : text);
  }

  // Save binary buffer into (inboxFolder[/audioSubfolder]) with chosen extension
  async saveAudioBinary(buf: ArrayBuffer, when: Date, ext: "mp3" | "webm"): Promise<string> {
    const root = normalizePath(this.settings.inboxFolder || "Inbox");
    const sub = (this.settings.audioSubfolder || "").trim();
    const dir = sub ? normalizePath(`${root}/${sub}`) : root;
    await this.ensureFolder(dir);

    const stamp = moment(when).format("YYYYMMDD-HHmmss");
    let path = normalizePath(`${dir}/voice-${stamp}.${ext}`);
    let i = 1;
    while (this.app.vault.getAbstractFileByPath(path)) {
      path = normalizePath(`${dir}/voice-${stamp}-${i++}.${ext}`);
    }
    await this.app.vault.createBinary(path, buf);
    return path; // vault-relative
  }

  private async needsLeadingNewline(file: TFile): Promise<boolean> {
    const content = await this.app.vault.cachedRead(file);
    return content.length > 0 && !content.endsWith("\n");
  }

  private async ensureFolder(path: string) {
    const existing = this.app.vault.getAbstractFileByPath(path);
    if (existing instanceof TFolder) return;
    await this.app.vault.createFolder(path).catch(() => {});
  }
}

// ---------------- Record Modal ----------------

class RecordModal extends Modal {
  private plugin: VoiceInboxPlugin;
  private stream?: MediaStream;
  private recorder?: MediaRecorder;
  private chunks: BlobPart[] = [];
  private state: "idle" | "recording" | "transcribing" = "idle";
  private btn!: HTMLButtonElement;
  private note!: HTMLElement;
  private startedAtMs = 0;
  private deviceLabel = "unknown";

  // Visualization
  private ac?: AudioContext;
  private analyser?: AnalyserNode;
  private srcNode?: MediaStreamAudioSourceNode;
  private rafId?: number;
  private canvas!: HTMLCanvasElement;
  private warningEl!: HTMLElement;
  private silenceFrames = 0;

  // mobile tip
  private mobileTipEl!: HTMLElement;

  constructor(app: App, plugin: VoiceInboxPlugin) {
    super(app);
    this.plugin = plugin;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();

    contentEl.createEl("h3", { text: "Obby Voice" });

    // Canvas for simple waveform/bars
    this.canvas = contentEl.createEl("canvas");
    this.canvas.width = 360;
    this.canvas.height = 70;
    this.canvas.style.width = "100%";
    this.canvas.style.height = "70px";
    this.canvas.style.borderRadius = "8px";
    this.canvas.style.background = "var(--background-secondary)";
    this.canvas.style.marginBottom = "8px";

    this.note = contentEl.createEl("div", { text: "Tap to start recording." });

    const controls = contentEl.createDiv();
    controls.style.display = "flex";
    controls.style.gap = "8px";
    controls.style.alignItems = "center";
    controls.style.marginTop = "8px";

    this.btn = controls.createEl("button", { text: "Start" });
    this.btn.addEventListener("click", () => this.toggleRecording());

    // Warning text (silence detector)
    this.warningEl = controls.createDiv();
    this.warningEl.style.flex = "1";
    this.warningEl.style.color = "var(--text-warning)";
    this.warningEl.style.fontSize = "0.9em";

    // Mobile-only reminder
    this.mobileTipEl = contentEl.createDiv();
    this.mobileTipEl.style.opacity = "0.7";
    this.mobileTipEl.style.marginTop = "6px";
    if ((this.app as any).isMobile) {
      this.mobileTipEl.textContent = "Tip: keep your screen on while recording on mobile (iOS/Android may pause otherwise).";
    }

    const small = contentEl.createEl("div");
    small.setCssStyles({ opacity: "0.7", marginTop: "8px" });
    small.setText(`ASR model: ${this.plugin.settings.modelId} (first run downloads & caches)`);
    contentEl.setCssStyles({ padding: "16px" });
  }

  async openAndAutoStart() {
    this.open();
    await this.toggleRecording();
  }

  private async toggleRecording() {
    if (this.state === "idle") {
      await this.startRecording();
    } else if (this.state === "recording") {
      await this.stopAndTranscribe();
    }
  }

  private pickMimeType(): string | undefined {
    const candidates = [
      "audio/webm;codecs=opus",
      "audio/webm",
    ];
    for (const t of candidates) {
      if ((window as any).MediaRecorder && MediaRecorder.isTypeSupported(t)) return t;
    }
    return undefined;
  }

  private async startRecording() {
    try {
      if (!SUPPORT.supported) {
        new Notice(`Obby Voice not supported: ${SUPPORT.reason || "unknown"}`);
        return;
      }

      // Request mic with user's chosen device (if any)
      let stream: MediaStream | null = null;
      try {
        stream = await ensureMicPermission(this.plugin.settings.inputDeviceId || undefined);
      } catch (e: any) {
        if (e?.name === "NotAllowedError" || e?.name === "SecurityError") {
          new Notice("Microphone permission denied. Please allow mic access for Obsidian.");
        } else if (e?.name === "OverconstrainedError") {
          new Notice("Selected mic not available. Check Settings → Input device.");
        } else {
          new Notice(`Mic error: ${e?.message || e}`);
        }
        return;
      }

      this.stream = stream;

      // Show which device we actually got
      const [track] = this.stream.getAudioTracks();
      const settings = track.getSettings?.() || {};
      this.deviceLabel = track.label || (settings.deviceId ? `(device ${settings.deviceId})` : "unknown");
      const details = [
        this.deviceLabel,
        settings.sampleRate ? `${settings.sampleRate} Hz` : "",
        settings.channelCount ? `${settings.channelCount} ch` : "",
      ].filter(Boolean).join(" · ");

      // Visualizer setup
      const AC = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
      this.ac = new AC();
      this.srcNode = this.ac.createMediaStreamSource(this.stream);
      this.analyser = this.ac.createAnalyser();
      this.analyser.fftSize = 1024;
      this.srcNode.connect(this.analyser);
      this.silenceFrames = 0;
      this.startViz();

      // MediaRecorder
      const mt = this.pickMimeType();
      this.recorder = new MediaRecorder(this.stream, mt ? { mimeType: mt } : undefined);
      this.chunks = [];

      // Collect chunks
      this.recorder.addEventListener("dataavailable", (e: BlobEvent) => {
        if (e.data && e.data.size > 0) this.chunks.push(e.data);
      });

      // Mute notices
      if (track.muted) {
        new Notice("Warning: selected microphone track is muted (no signal).");
      }
      track.onmute = () => new Notice("Microphone muted by system.");
      track.onunmute = () => new Notice("Microphone unmuted.");

      this.startedAtMs = Date.now();

      // Use a timeslice so chunks flush periodically (more reliable)
      this.recorder.start(1000);

      this.state = "recording";
      this.note.setText(`Recording from: ${details}`);
      this.btn.setText("Stop");

      // Warm up model in background (first run download)
      try {
        await getASRPipeline(this.plugin.settings.modelId, (msg, pct) => {
          this.note.innerText = pct !== undefined
            ? `Recording from: ${details}\n${msg} ${pct}%`
            : `Recording from: ${details}\n${msg}`;
        });
        if (this.state === "recording") this.note.setText(`Recording from: ${details}`);
      } catch {
        // We'll fall back to audio save if load fails later
      }
    } catch (e: any) {
      new Notice(`Mic error: ${e?.message || e}`);
    }
  }

  // Visualization (simple bars/wave + silence detector)
  private startViz() {
    const ctx = this.canvas.getContext("2d");
    if (!ctx || !this.analyser) return;

    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const cssW = this.canvas.clientWidth || 360;
    const cssH = this.canvas.clientHeight || 70;
    this.canvas.width = Math.floor(cssW * dpr);
    this.canvas.height = Math.floor(cssH * dpr);
    ctx.scale(dpr, dpr);

    const buf = new Uint8Array(this.analyser.frequencyBinCount);

    const draw = () => {
      if (!this.analyser) return; // stopped
      this.analyser.getByteTimeDomainData(buf);

      // Compute average deviation from 128 (midline) as rough amplitude
      let sum = 0;
      for (let i = 0; i < buf.length; i++) sum += Math.abs(buf[i] - 128);
      const avg = sum / buf.length;

      // Silence detector: if avg < 1.5 for ~120 frames (~2s at 60fps), warn
      if (avg < 1.5) this.silenceFrames++; else this.silenceFrames = 0;
      if (this.silenceFrames > 120) {
        this.warningEl.textContent = "⚠️ No audio detected — check mic/input device or permissions.";
      } else {
        this.warningEl.textContent = "";
      }

      // Draw background
      ctx.clearRect(0, 0, cssW, cssH);

      // Draw subtle grid baseline
      ctx.globalAlpha = 0.08;
      ctx.fillStyle = "currentColor";
      const mid = cssH / 2;
      ctx.fillRect(0, mid, cssW, 1);
      ctx.globalAlpha = 1;

      // Draw waveform as thin line + a few vertical bars
      // Wave
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "var(--text-accent)";
      const step = Math.max(1, Math.floor(buf.length / cssW));
      for (let x = 0, i = 0; x < cssW; x++, i += step) {
        const v = (buf[Math.min(i, buf.length - 1)] - 128) / 128; // -1..1
        const y = mid + v * (cssH * 0.38);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Bars (5 bars across)
      const bars = 5;
      const barGap = cssW / bars;
      for (let b = 0; b < bars; b++) {
        let local = 0;
        const start = Math.floor((b * buf.length) / bars);
        const end = Math.floor(((b + 1) * buf.length) / bars);
        for (let i = start; i < end; i++) local += Math.abs(buf[i] - 128);
        local /= (end - start);
        const h = Math.max(2, (local / 128) * (cssH * 0.75));
        const x = b * barGap + barGap * 0.4;
        ctx.fillStyle = "var(--interactive-accent)";
        ctx.globalAlpha = 0.6;
        ctx.fillRect(x, mid - h / 2, barGap * 0.2, h);
        ctx.globalAlpha = 1;
      }

      this.rafId = requestAnimationFrame(draw);
    };

    this.rafId = requestAnimationFrame(draw);
  }

  private stopViz() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = undefined;
    try { this.srcNode?.disconnect(); } catch {}
    try { this.analyser?.disconnect(); } catch {}
    this.srcNode = undefined;
    this.analyser = undefined;
    try { this.ac?.close(); } catch {}
    this.ac = undefined;
  }

  // Wait until the recorder fully stops and the final chunk has been delivered
  private async finalizeRecording(): Promise<Blob> {
    if (!this.recorder) throw new Error("No recorder");

    const rec = this.recorder;

    try { rec.requestData(); } catch {}

    await new Promise<void>((resolve) => {
      rec.addEventListener("stop", () => resolve(), { once: true });
      if (rec.state !== "inactive") rec.stop();
    });

    const type = rec.mimeType || "audio/webm";
    return new Blob(this.chunks, { type });
  }

  private async stopAndTranscribe() {
    if (!this.recorder) return;

    this.state = "transcribing";
    this.note.setText("Finalizing recording…");
    this.stopViz();

    const webmBlob = await this.finalizeRecording();
    this.stream?.getTracks().forEach((t) => t.stop());

    const endedAtMs = Date.now();
    const durationMs = Math.max(0, endedAtMs - this.startedAtMs);
    const when = new Date(endedAtMs);

    // If somehow still empty, bail to audio-save path with a notice
    if (!webmBlob || webmBlob.size === 0) {
      const emptyBuf = new ArrayBuffer(0);
      if (this.plugin.settings.saveAudioFile) {
        // Save placeholder with chosen extension
        const ext = this.plugin.settings.audioFormat;
        await this.plugin.saveAudioBinary(emptyBuf, when, ext);
      }
      await this.plugin.appendToDailyInbox(`(recording error)`, when);
      new Notice("Recording produced empty audio.");
      this.close();
      return;
    }

    try {
      this.note.setText("Processing audio…");
      const pcm16k = await decodeAndResampleTo16k(webmBlob);

      // Get pipeline (download on first run)
      const asr = await getASRPipeline(this.plugin.settings.modelId, (msg, pct) => {
        this.note.innerText = pct !== undefined ? `Downloading model… ${pct}%` : String(msg);
      });

      // Transcribe
      this.note.setText("Transcribing…");
      const out = await asr(pcm16k, { sampling_rate: 16000 });
      const text: string = (out?.text || "").trim();

      // Optionally save audio file (MP3 by default, encoded from PCM we already computed)
      let savedPath: string | null = null;
      if (this.plugin.settings.saveAudioFile) {
        if (this.plugin.settings.audioFormat === "mp3") {
          const mp3Blob = await encodeMp3FromPCM(pcm16k, 16000);
          const buf = await mp3Blob.arrayBuffer();
          savedPath = await this.plugin.saveAudioBinary(buf, when, "mp3");
        } else {
          // Save original webm
          const buf = await webmBlob.arrayBuffer();
          savedPath = await this.plugin.saveAudioBinary(buf, when, "webm");
        }
      }

      // Heuristic confidence (still useful for note text)
      const onlyPunct = text.replace(/[^\p{L}\p{N}]+/gu, "").length === 0;
      const words = text ? text.split(/\s+/).length : 0;
      const wpm = durationMs > 0 ? Math.round((words / (durationMs / 60000))) : 0;
      const longEnough = durationMs >= this.plugin.settings.lowConfMinDurationMs;
      const lowWpm = longEnough && wpm > 0 && wpm < this.plugin.settings.lowConfMinWpm;
      const looksBad = !text || onlyPunct || lowWpm;

      const audioLink = savedPath ? ` [[${savedPath}|audio]]` : "";

      if (this.plugin.settings.saveAudioOnLowConfidence && looksBad) {
        const line = text
          ? `(low confidence)${audioLink} — tentative: ${text}`
          : `(no speech detected)${audioLink}`;
        await this.plugin.appendToDailyInbox(line, when);
        new Notice(savedPath ? "Saved audio and note." : "Saved note.");
      } else {
        await this.plugin.appendToDailyInbox((text || "(no speech detected)") + audioLink, when);
        new Notice(savedPath ? "Saved audio and note." : "Saved note.");
      }

      this.close();
    } catch (e: any) {
      try {
        if (this.plugin.settings.saveAudioOnLowConfidence && this.plugin.settings.saveAudioFile) {
          // Save original webm (most reliable) if MP3 encode/STT threw
          const buf = await webmBlob.arrayBuffer();
          const path = await this.plugin.saveAudioBinary(buf, when, "webm");
          await this.plugin.appendToDailyInbox(`(transcription error) [[${path}|audio]]`, when);
          new Notice("Transcription failed; audio saved and noted in Inbox.");
        } else {
          await this.plugin.appendToDailyInbox(`(transcription error)`, when);
          new Notice(`Transcription failed: ${e?.message || e}`);
        }
      } catch (saveErr: any) {
        new Notice(`Transcription failed and save also failed: ${saveErr?.message || saveErr}`);
      } finally {
        this.close();
      }
    }
  }

  onClose() {
    this.stopViz();
    this.stream?.getTracks().forEach((t) => t.stop());
    this.contentEl.empty();
    this.state = "idle";
  }
}

// ---------------- Settings UI ----------------

class VoiceInboxSettingsTab extends PluginSettingTab {
  plugin: VoiceInboxPlugin;

  constructor(app: App, plugin: VoiceInboxPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  async display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h3", { text: "Obby Voice settings" });

    new Setting(containerEl)
      .setName("Inbox folder")
      .setDesc("Per-day files will be created here (e.g., 2025-08-17.md).")
      .addText((t) =>
        t
          .setPlaceholder("Inbox")
          .setValue(this.plugin.settings.inboxFolder)
          .onChange(async (v) => {
            this.plugin.settings.inboxFolder = v || "Inbox";
            await this.plugin.saveSettings();
          }),
      );

    new Setting(containerEl)
      .setName("Filename date format")
      .setDesc("Moment format for the daily file (default: YYYY-MM-DD).")
      .addText((t) =>
        t
          .setPlaceholder("YYYY-MM-DD")
          .setValue(this.plugin.settings.filenameDateFormat)
          .onChange(async (v) => {
            this.plugin.settings.filenameDateFormat = v || "YYYY-MM-DD";
            await this.plugin.saveSettings();
          }),
      );

    new Setting(containerEl)
      .setName("Entry timestamp format")
      .setDesc("Moment format for each line prefix (default: MMM D, YYYY h:mm A).")
      .addText((t) =>
        t
          .setPlaceholder("MMM D, YYYY h:mm A")
          .setValue(this.plugin.settings.entryDateFormat)
          .onChange(async (v) => {
            this.plugin.settings.entryDateFormat = v || "MMM D, YYYY h:mm A";
            await this.plugin.saveSettings();
          }),
      );

    new Setting(containerEl)
      .setName("ASR model (HuggingFace id)")
      .setDesc("Examples: Xenova/whisper-tiny.en, Xenova/whisper-base.en")
      .addText((t) =>
        t
          .setPlaceholder("Xenova/whisper-tiny.en")
          .setValue(this.plugin.settings.modelId)
          .onChange(async (v) => {
            this.plugin.settings.modelId = v || "Xenova/whisper-tiny.en";
            await this.plugin.saveSettings();
          }),
      );

    // Mic selection UI
    containerEl.createEl("h4", { text: "Microphone" });
    const micSetting = new Setting(containerEl)
      .setName("Input device")
      .setDesc("Grant mic permission once so device names appear. Leave blank for system default.");

    const dropdown = micSetting.addDropdown((d) => {
      d.addOption("", "(system default)");
      d.setValue(this.plugin.settings.inputDeviceId || "");
      d.onChange(async (val) => {
        this.plugin.settings.inputDeviceId = val;
        await this.plugin.saveSettings();
        new Notice(val ? "Selected mic updated." : "Using system default mic.");
      });
    });

    // Try to get labels (may prompt)
    try { await ensureMicPermission(this.plugin.settings.inputDeviceId || undefined); } catch {}
    const devices = await listInputDevices();

    // Refill compatibly across Obsidian versions
    const dd = dropdown as unknown as DropdownComponent & {
      addOptions?: (opts: Record<string, string>) => void;
      addOption?: (value: string, label: string) => void;
      selectEl?: HTMLSelectElement;
    };

    // clear
    if (dd.selectEl?.replaceChildren) dd.selectEl.replaceChildren();
    else if (dd.selectEl) dd.selectEl.innerHTML = "";

    // add system default first
    if (dd.addOptions) dd.addOptions({ "": "(system default)" });
    else if (dd.addOption) dd.addOption("", "(system default)");
    else dd.selectEl?.add(new Option("(system default)", ""));

    // add devices
    for (const dev of devices) {
      const label = dev.label || `(device ${dev.deviceId})`;
      if (dd.addOptions) dd.addOptions({ [dev.deviceId]: label });
      else if (dd.addOption) dd.addOption(dev.deviceId, label);
      else dd.selectEl?.add(new Option(label, dev.deviceId));
    }
    dropdown.setValue(this.plugin.settings.inputDeviceId || "");

    // Audio saving
    containerEl.createEl("h4", { text: "Audio saving" });

    new Setting(containerEl)
      .setName("Save audio file")
      .setDesc("If off, only the transcription is saved to your daily note.")
      .addToggle((t) => {
        t.setValue(this.plugin.settings.saveAudioFile)
          .onChange(async (v) => {
            this.plugin.settings.saveAudioFile = v;
            await this.plugin.saveSettings();
          });
      });

    new Setting(containerEl)
      .setName("Audio format")
      .setDesc("Choose the file format to save. MP3 is default.")
      .addDropdown((d) => {
        d.addOption("mp3", "MP3 (mono, 16 kHz)");
        d.addOption("webm", "WebM/Opus");
        d.setValue(this.plugin.settings.audioFormat);
        d.onChange(async (v: "mp3" | "webm") => {
          this.plugin.settings.audioFormat = v;
          await this.plugin.saveSettings();
        });
      });

    new Setting(containerEl)
      .setName("Audio subfolder")
      .setDesc("Optional subfolder (inside the inbox folder) to store saved audio files.")
      .addText((t) =>
        t
          .setPlaceholder("Audio")
          .setValue(this.plugin.settings.audioSubfolder)
          .onChange(async (v) => {
            this.plugin.settings.audioSubfolder = v ?? "";
            await this.plugin.saveSettings();
          }),
      );

    // Confidence thresholds (still useful to flag doubtful output)
    containerEl.createEl("h4", { text: "Low-confidence behavior" });

    new Setting(containerEl)
      .setName("Also save audio on low confidence")
      .setDesc("If enabled and transcription looks poor, include the audio link in the note.")
      .addToggle((t) => {
        t.setValue(this.plugin.settings.saveAudioOnLowConfidence)
          .onChange(async (v) => {
            this.plugin.settings.saveAudioOnLowConfidence = v;
            await this.plugin.saveSettings();
          });
      });

    new Setting(containerEl)
      .setName("Low-confidence: min duration (ms)")
      .setDesc("Only evaluate WPM if recording is at least this long. Default 5000.")
      .addText((t) =>
        t
          .setPlaceholder("5000")
          .setValue(String(this.plugin.settings.lowConfMinDurationMs))
          .onChange(async (v) => {
            const n = parseInt(v || "5000", 10);
            this.plugin.settings.lowConfMinDurationMs = Number.isFinite(n) ? Math.max(0, n) : 5000;
            await this.plugin.saveSettings();
          }),
      );

    new Setting(containerEl)
      .setName("Low-confidence: min WPM")
      .setDesc("Flag low accuracy if words-per-minute is below this for long recordings. Default 15.")
      .addText((t) =>
        t
          .setPlaceholder("15")
          .setValue(String(this.plugin.settings.lowConfMinWpm))
          .onChange(async (v) => {
            const n = parseInt(v || "15", 10);
            this.plugin.settings.lowConfMinWpm = Number.isFinite(n) ? Math.max(1, n) : 15;
            await this.plugin.saveSettings();
          }),
      );
  }
}
