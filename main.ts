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

// =========================
// Settings & Defaults
// =========================

interface ObbyVoiceSettings {
  // Inbox / note formatting
  inboxFolder: string;             // e.g., "Inbox"
  filenameDateFormat: string;      // e.g., "YYYY-MM-DD"
  entryDateFormat: string;         // e.g., "MMM D, YYYY h:mm A"

  // STT model
  modelId: string;                 // e.g., "Xenova/whisper-tiny.en"

  // Mic selection
  inputDeviceId: string;           // exact deviceId or "" for default

  // Audio saving
  saveAudioFile: boolean;          // true = save audio alongside transcript
  audioFormat: "mp3" | "webm";     // default mp3
  audioSubfolder: string;          // subfolder inside inbox to store audio

  // Low-confidence behavior
  saveAudioOnLowConfidence: boolean;
  lowConfMinDurationMs: number;
  lowConfMinWpm: number;
}

const DEFAULT_SETTINGS: ObbyVoiceSettings = {
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

// =========================
// Environment Checks
// =========================

type SupportStatus = { supported: boolean; reason?: string };
let SUPPORT: SupportStatus = { supported: true };

function envSupported(): SupportStatus {
  const hasMedia = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  const hasAudioCtx = !!(window.AudioContext || (window as any).webkitAudioContext);
  if (!hasMedia) return { supported: false, reason: "No mediaDevices.getUserMedia" };
  if (!hasAudioCtx) return { supported: false, reason: "No AudioContext" };
  return { supported: true };
}

// =========================
// STT (Xenova/transformers) - WASM only, no SAB
// =========================

let asrPipeline: any = null;

async function getASRPipeline(
  modelId: string,
  onProgress?: (msg: string, pct?: number) => void
): Promise<any> {
  if (asrPipeline) return asrPipeline;

  const { pipeline, env } = await import("@xenova/transformers");

  env.useBrowserCache = true;
  env.allowLocalModels = false;

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

// =========================
/** Decode Blob → mono Float32 PCM @ 16kHz */
// =========================

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
  const out = new Float32Array(rendered.getChannelData(0)); // copy
  ac.close();
  return out;
}

// =========================
/** Encode Float32 PCM → MP3 using lamejs */
// =========================

async function encodeMp3FromPCM(pcm: Float32Array, sampleRate = 16000): Promise<Blob> {
  const lamejs = await import("lamejs");
  const Mp3Encoder = (lamejs as any).Mp3Encoder as any;
  const encoder = new Mp3Encoder(1, sampleRate, 128); // mono, 16kHz, 128 kbps

  // Float32 [-1,1] -> Int16
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

// =========================
/** Media devices helpers */
// =========================

async function listInputDevices(): Promise<MediaDeviceInfo[]> {
  try {
    const all = await navigator.mediaDevices.enumerateDevices();
    return all.filter((d) => d.kind === "audioinput");
  } catch {
    return [];
  }
}

async function ensureMicPermission(deviceId?: string): Promise<MediaStream> {
  const base: MediaTrackConstraints = {
    // Use "ideal" so devices that don't support these won't fail the whole request
    echoCancellation: { ideal: true },
    noiseSuppression: { ideal: true },
    autoGainControl: { ideal: true },
    channelCount: { ideal: 1 },
  };

  // Try the chosen device strictly first
  if (deviceId) {
    try {
      return await navigator.mediaDevices.getUserMedia({
        audio: { ...base, deviceId: { exact: deviceId } },
        video: false,
      });
    } catch (e: any) {
      // If that fails (e.g., OverconstrainedError), fall back to "ideal" deviceId,
      // then finally to system default.
      try {
        return await navigator.mediaDevices.getUserMedia({
          audio: { ...base, deviceId: { ideal: deviceId } },
          video: false,
        });
      } catch {}
    }
  }

  // Default device (no deviceId constraint)
  return navigator.mediaDevices.getUserMedia({ audio: base, video: false });
}


// =========================
// Helper: save audio per settings (with MP3→WebM fallback)
// =========================

async function saveAudioPerSettings(
  plugin: { saveAudioBinary: (buf: ArrayBuffer, when: Date, ext: "mp3"|"webm") => Promise<string>;
            settings: ObbyVoiceSettings },
  pcm16k: Float32Array,         // already computed for STT
  webmBlob: Blob,               // original recording
  when: Date
): Promise<{ path: string | null; used: "mp3" | "webm" | null }> {
  if (!plugin.settings.saveAudioFile) return { path: null, used: null };

  if (plugin.settings.audioFormat === "mp3") {
    try {
      const mp3Blob = await encodeMp3FromPCM(pcm16k, 16000);
      const path = await plugin.saveAudioBinary(await mp3Blob.arrayBuffer(), when, "mp3");
      console.log("[Obby Voice] Saved MP3:", path);
      return { path, used: "mp3" };
    } catch (err) {
      console.warn("[Obby Voice] MP3 encode failed, saving WebM instead:", err);
      new Notice("MP3 encode failed — saved WebM instead.");
    }
  }
  const path = await plugin.saveAudioBinary(await webmBlob.arrayBuffer(), when, "webm");
  console.log("[Obby Voice] Saved WebM:", path);
  return { path, used: "webm" };
}

// =========================
// Plugin
// =========================

export default class ObbyVoicePlugin extends Plugin {
  settings: ObbyVoiceSettings;
  private activeModal?: RecordModal;

  async onload() {
    await this.loadSettings();
    SUPPORT = envSupported();

    // if (!this.app.isMobile) {
    //   this.addRibbonIcon("microphone", "Record voice note to Inbox", () => this.openRecorder());
    //   const sb = this.addStatusBarItem();
    //   sb.setText("Obby Voice: Cmd Palette → Record");
    // }

    this.addCommand({
      id: "record-voice-note-to-inbox",
      name: "Record voice note to Inbox (tap to stop)",
      checkCallback: (checking) => {
        if (!SUPPORT.supported) return false;
        if (checking) return true;
        this.openRecorder();
      },
    });

    this.addSettingTab(new ObbyVoiceSettingsTab(this.app, this));
    new Notice(`Obby Voice loaded`);
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

  // -------- Settings IO --------
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }

  // -------- Note/Audio helpers --------
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
    return path;
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

// =========================
// Record Modal
// =========================

class RecordModal extends Modal {
  private plugin: ObbyVoicePlugin;
  private stream?: MediaStream;
  private recorder?: MediaRecorder;
  private chunks: BlobPart[] = [];
  private state: "idle" | "recording" | "transcribing" | "finished" = "idle";
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

  // results UI
  private resultWrap!: HTMLDivElement;
  private transcriptEl!: HTMLTextAreaElement;
  private audioEl!: HTMLAudioElement;
  private savedPathEl!: HTMLDivElement;
  private objectURL?: string;

  constructor(app: App, plugin: ObbyVoicePlugin) {
    super(app);
    this.plugin = plugin;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();

    contentEl.createEl("h3", { text: "Obby Voice" });

    // Canvas for waveform/bars
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
      this.mobileTipEl.textContent =
        "Tip: keep your screen on while recording on mobile (iOS/Android may pause otherwise).";
    } else {
      this.mobileTipEl.textContent = "";
    }

    // Results area (hidden until finished)
    this.resultWrap = contentEl.createDiv({ cls: "obby-voice-results" });
    this.resultWrap.style.marginTop = "12px";
    this.resultWrap.style.display = "none";

    // transcript textarea
    const tlabel = this.resultWrap.createEl("div", { text: "Transcription (editable):" });
    tlabel.style.margin = "6px 0 4px";

    this.transcriptEl = this.resultWrap.createEl("textarea");
    this.transcriptEl.rows = 5;
    this.transcriptEl.style.width = "100%";
    this.transcriptEl.style.resize = "vertical";

    // audio player
    const alabel = this.resultWrap.createEl("div", { text: "Recording:" });
    alabel.style.margin = "10px 0 4px";
    this.audioEl = this.resultWrap.createEl("audio");
    this.audioEl.controls = true;
    this.audioEl.style.width = "100%";

    // saved path
    this.savedPathEl = this.resultWrap.createDiv();
    this.savedPathEl.style.opacity = "0.7";
    this.savedPathEl.style.marginTop = "6px";

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

      // Request mic with user's chosen device
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

      // Device details
      const [track] = this.stream.getAudioTracks();
      const settings = track.getSettings?.() || {};
	  const actualId = (settings as any).deviceId; // not standardized everywhere, but present in Chromium/Electron
	  console.log("[Obby Voice] Using deviceId:", actualId, "label:", track.label);

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

      this.recorder.addEventListener("dataavailable", (e: BlobEvent) => {
        if (e.data && e.data.size > 0) this.chunks.push(e.data);
      });

      if (track.muted) {
        new Notice("Warning: selected microphone track is muted (no signal).");
      }
      track.onmute = () => new Notice("Microphone muted by system.");
      track.onunmute = () => new Notice("Microphone unmuted.");

      this.startedAtMs = Date.now();

      // Use timeslice to flush chunks
      this.recorder.start(1000);

      this.state = "recording";
      this.note.setText(`Recording from: ${details}`);
      this.btn.setText("Stop");

      // Warm model (download on first run)
      try {
        await getASRPipeline(this.plugin.settings.modelId, (msg, pct) => {
          this.note.innerText = pct !== undefined
            ? `Recording from: ${details}\n${msg} ${pct}%`
            : `Recording from: ${details}\n${msg}`;
        });
        if (this.state === "recording") this.note.setText(`Recording from: ${details}`);
      } catch {
        // ignore
      }
    } catch (e: any) {
      new Notice(`Mic error: ${e?.message || e}`);
    }
  }

  // Visualization (wave + bars + silence detector)
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
      if (!this.analyser) return;
      this.analyser.getByteTimeDomainData(buf);

      // crude amplitude
      let sum = 0;
      for (let i = 0; i < buf.length; i++) sum += Math.abs(buf[i] - 128);
      const avg = sum / buf.length;

      // silence warning (~2s)
      if (avg < 1.5) this.silenceFrames++; else this.silenceFrames = 0;
      if (this.silenceFrames > 120) {
        this.warningEl.textContent = "⚠️ No audio detected — check mic/input device or permissions.";
      } else {
        this.warningEl.textContent = "";
      }

      // draw
      ctx.clearRect(0, 0, cssW, cssH);

      // baseline
      ctx.globalAlpha = 0.08;
      ctx.fillStyle = "currentColor";
      const mid = cssH / 2;
      ctx.fillRect(0, mid, cssW, 1);
      ctx.globalAlpha = 1;

      // waveform
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "var(--text-accent)";
      const step = Math.max(1, Math.floor(buf.length / cssW));
      for (let x = 0, i = 0; x < cssW; x++, i += step) {
        const v = (buf[Math.min(i, buf.length - 1)] - 128) / 128;
        const y = mid + v * (cssH * 0.38);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // bars
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

  // finalize MediaRecorder → Blob
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

    if (!webmBlob || webmBlob.size === 0) {
      await this.plugin.appendToDailyInbox(`(recording error)`, when);
      new Notice("Recording produced empty audio.");
      this.close();
      return;
    }

    // Make a local object URL for playback right away (works even if not saved)
    try { if (this.objectURL) URL.revokeObjectURL(this.objectURL); } catch {}
    this.objectURL = URL.createObjectURL(webmBlob);

    try {
      this.note.setText("Processing audio…");
      const pcm16k = await decodeAndResampleTo16k(webmBlob);

      // STT
      const asr = await getASRPipeline(this.plugin.settings.modelId, (msg, pct) => {
        this.note.innerText = pct !== undefined ? `Downloading model… ${pct}%` : String(msg);
      });

      this.note.setText("Transcribing…");
      const out = await asr(pcm16k, { sampling_rate: 16000 });
      const text: string = (out?.text || "").trim();

      // Save per settings (MP3/WebM/none)
      const saved = await saveAudioPerSettings(this.plugin, pcm16k, webmBlob, when);
      const savedPath = saved.path;
      const audioLink = savedPath ? ` [[${savedPath}|audio]]` : "";

      // Confidence heuristic
      const onlyPunct = text.replace(/[^\p{L}\p{N}]+/gu, "").length === 0;
      const words = text ? text.split(/\s+/).length : 0;
      const wpm = durationMs > 0 ? Math.round((words / (durationMs / 60000))) : 0;
      const longEnough = durationMs >= this.plugin.settings.lowConfMinDurationMs;
      const lowWpm = longEnough && wpm > 0 && wpm < this.plugin.settings.lowConfMinWpm;
      const looksBad = !text || onlyPunct || lowWpm;

      // Append to daily note (immediately)
      if (this.plugin.settings.saveAudioOnLowConfidence && looksBad) {
        const line = text
          ? `(low confidence)${audioLink} — tentative: ${text}`
          : `(no speech detected)${audioLink}`;
        await this.plugin.appendToDailyInbox(line, when);
      } else {
        await this.plugin.appendToDailyInbox((text || "(no speech detected)") + audioLink, when);
      }

      // --- NEW UX: show transcript + audio in the popup ---
      this.showResultsUI({
        transcript: text || "(no speech detected)",
        objectUrl: this.objectURL,
        savedPath,
        usedFormat: saved.used,
      });

      new Notice(savedPath ? "Saved audio and note." : "Saved note.");
      this.state = "finished";
      this.btn.setText("Close");
      this.btn.onclick = () => this.close();

    } catch (e: any) {
      // Try to at least save original audio if configured
      try {
        const saved = await saveAudioPerSettings(this.plugin, new Float32Array(0), webmBlob, when);
        if (saved.path) {
          await this.plugin.appendToDailyInbox(`(transcription error) [[${saved.path}|audio]]`, when);
          // Show results UI with playback even on error
          this.showResultsUI({
            transcript: "(transcription error)",
            objectUrl: this.objectURL,
            savedPath: saved.path,
            usedFormat: saved.used,
          });
          this.state = "finished";
          this.btn.setText("Close");
          this.btn.onclick = () => this.close();
          new Notice("Transcription failed; audio saved and noted in Inbox.");
          return;
        }
      } catch {}
      await this.plugin.appendToDailyInbox(`(transcription error)`, when);
      this.showResultsUI({
        transcript: "(transcription error)",
        objectUrl: this.objectURL,
        savedPath: null,
        usedFormat: null,
      });
      this.state = "finished";
      this.btn.setText("Close");
      this.btn.onclick = () => this.close();
      new Notice(`Transcription failed: ${e?.message || e}`);
    }
  }

  private showResultsUI(opts: {
    transcript: string;
    objectUrl: string;
    savedPath: string | null;
    usedFormat: "mp3" | "webm" | null;
  }) {
    // reveal area
    this.resultWrap.style.display = "";
    // fill
    this.transcriptEl.value = opts.transcript;
    this.audioEl.src = opts.objectUrl;
    this.audioEl.playbackRate = 1;
    // saved path text
    if (opts.savedPath) {
      this.savedPathEl.textContent = `Saved: ${opts.savedPath} (${opts.usedFormat?.toUpperCase()})`;
    } else {
      this.savedPathEl.textContent = `Audio not saved (disabled in settings).`;
    }
    // update header note
    this.note.setText(this.deviceLabel ? `From: ${this.deviceLabel}` : "Finished");
  }

  onClose() {
    try { if (this.objectURL) URL.revokeObjectURL(this.objectURL); } catch {}
    this.stopViz();
    this.stream?.getTracks().forEach((t) => t.stop());
    this.contentEl.empty();
    this.state = "idle";
  }
}

// =========================
// Settings Tab UI
// =========================

class ObbyVoiceSettingsTab extends PluginSettingTab {
  plugin: ObbyVoicePlugin;
  

  constructor(app: App, plugin: ObbyVoicePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  async display() {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl("h3", { text: "Obby Voice settings" });

    // Inbox folder
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

    // Filename date format
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

    // Entry prefix format
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

    // STT model
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

    // Microphone selection
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

    // Try to prompt for permission so labels appear
	let warm: MediaStream | null = null;
	try {
	// prime permission so labels appear
	warm = await ensureMicPermission(this.plugin.settings.inputDeviceId || undefined);
	} catch {
	// ignore
	} finally {
	// always release the mic
	try { warm?.getTracks().forEach(t => t.stop()); } catch {}
	}
	const devices = await listInputDevices();


    // Cross-version safe population via raw select
    const select = (dropdown as any).selectEl as HTMLSelectElement | undefined;
    if (select) {
      while (select.firstChild) select.removeChild(select.firstChild);
      select.append(new Option("(system default)", ""));
      for (const dev of devices) {
        const label = dev.label || `(device ${dev.deviceId})`;
        select.append(new Option(label, dev.deviceId));
      }
      const want = this.plugin.settings.inputDeviceId || "";
      const exists = Array.from(select.options).some(o => o.value === want);
      select.value = exists ? want : "";
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }

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

    // Low-confidence
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



class SelectInputDeviceModal extends Modal {
	constructor(app: App, private plugin: ObbyVoicePlugin, private devices: MediaDeviceInfo[]) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;

		new Setting(contentEl).setName('Select audio input device').setHeading();
		const dropdown = contentEl.createEl('select');
		this.devices.forEach(device => {
			const option = dropdown.createEl('option');
			option.value = device.deviceId;
			option.text = device.label || `Device ${device.deviceId}`;
		});

		const button = contentEl.createEl('button', { text: 'Select' });
		button.onclick = async () => {
			const selectedDeviceId = dropdown.value;
			this.plugin.settings.audioDeviceId = selectedDeviceId;
			await this.plugin.saveSettings();
			new Notice(`Selected audio device: ${dropdown.selectedOptions[0].text}`);
			this.close();
		};
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
