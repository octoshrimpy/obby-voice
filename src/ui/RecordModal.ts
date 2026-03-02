import { App, Modal, Notice } from "obsidian";
import type { ObbyVoiceSettings } from "../types";
import { ensureMicPermission, pickMimeType, decodeAndResampleTo16k } from "../audio";
import { getASRPipeline, transcribePCM16k } from "../asr";
import { appendToDailyInbox, saveAudioBinary, saveAudioPerSettings } from "../storage";
import type ObbyVoicePlugin from "../main";

export interface RecordModalCallbacks {
  onRecordingStarted?: () => void;
  onClosed?: () => void;
}

export class RecordModal extends Modal {
  private plugin: ObbyVoicePlugin;
  private settings: ObbyVoiceSettings;
  private callbacks?: RecordModalCallbacks;
  private stream?: MediaStream;
  private recorder?: MediaRecorder;
  private chunks: BlobPart[] = [];
  private state: "idle" | "recording" | "transcribing" | "finished" = "idle";
  private btn!: HTMLButtonElement;
  private note!: HTMLElement;
  private startedAtMs = 0;
  private deviceLabel = "unknown";

  // Viz
  private ac?: AudioContext;
  private analyser?: AnalyserNode;
  private srcNode?: MediaStreamAudioSourceNode;
  private rafId?: number;
  private canvas!: HTMLCanvasElement;
  private warningEl!: HTMLElement;
  private silenceFrames = 0;

  // results UI
  private resultWrap!: HTMLDivElement;
  private transcriptEl!: HTMLTextAreaElement;
  private audioEl!: HTMLAudioElement;
  private savedPathEl!: HTMLDivElement;
  private objectURL?: string;

  constructor(app: App, settings: ObbyVoiceSettings, plugin: ObbyVoicePlugin, callbacks?: RecordModalCallbacks) {
    super(app);
    this.settings = settings;
    this.plugin = plugin;
    this.callbacks = callbacks;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();

    contentEl.createEl("h3", { text: "Obby Voice" });

    // Canvas
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

    this.warningEl = controls.createDiv();
    this.warningEl.style.flex = "1";
    this.warningEl.style.color = "var(--text-warning)";
    this.warningEl.style.fontSize = "0.9em";

    // Results
    this.resultWrap = contentEl.createDiv({ cls: "obby-voice-results" });
    this.resultWrap.style.marginTop = "12px";
    this.resultWrap.style.display = "none";

    const tlabel = this.resultWrap.createEl("div", { text: "Transcription (editable):" });
    tlabel.style.margin = "6px 0 4px";
    this.transcriptEl = this.resultWrap.createEl("textarea");
    this.transcriptEl.rows = 5;
    this.transcriptEl.style.width = "100%";
    this.transcriptEl.style.resize = "vertical";

    const alabel = this.resultWrap.createEl("div", { text: "Recording:" });
    alabel.style.margin = "10px 0 4px";
    this.audioEl = this.resultWrap.createEl("audio");
    this.audioEl.controls = true;
    this.audioEl.style.width = "100%";

    this.savedPathEl = this.resultWrap.createDiv();
    this.savedPathEl.style.opacity = "0.7";
    this.savedPathEl.style.marginTop = "6px";

    contentEl.setCssStyles({ padding: "16px" });
  }

  async openAndAutoStart() { this.open(); await this.toggleRecording(); }

  /** Called by the plugin ribbon/command to stop an in-progress recording. */
  public stop() {
    if (this.state === "recording") this.stopAndTranscribe();
  }

  private async toggleRecording() {
    if (this.state === "idle") await this.startRecording();
    else if (this.state === "recording") await this.stopAndTranscribe();
  }

  private async startRecording() {
    try {
      let stream: MediaStream | null = null;
      try {
        stream = await ensureMicPermission(this.settings.inputDeviceId || undefined);
      } catch (e: any) {
        new Notice(e?.message || "Mic error");
        return;
      }
      this.stream = stream;

      const [track] = this.stream.getAudioTracks();
      const settings = track.getSettings?.() || {};
      this.deviceLabel = track.label || (settings.deviceId ? `(device ${settings.deviceId})` : "unknown");
      const details = [
        this.deviceLabel,
        settings.sampleRate ? `${settings.sampleRate} Hz` : "",
        settings.channelCount ? `${settings.channelCount} ch` : "",
      ].filter(Boolean).join(" · ");

      // Viz
      const AC = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
      this.ac = new AC();
      this.srcNode = this.ac.createMediaStreamSource(this.stream);
      this.analyser = this.ac.createAnalyser();
      this.analyser.fftSize = 1024;
      this.srcNode.connect(this.analyser);
      this.silenceFrames = 0;
      this.startViz();

      // Recorder
      const mt = pickMimeType();
      this.recorder = new MediaRecorder(this.stream, mt ? { mimeType: mt } : undefined);
      this.chunks = [];
      this.recorder.addEventListener("dataavailable", (e: BlobEvent) => { if (e.data && e.data.size > 0) this.chunks.push(e.data); });
      this.startedAtMs = Date.now();
      this.recorder.start(1000);

      this.state = "recording";
      this.note.setText(`Recording from: ${details}`);
      this.btn.setText("Stop");
      this.callbacks?.onRecordingStarted?.();

      // preload model (likely already warm from plugin onload, but covers model-change case)
      try {
        await getASRPipeline(this.settings.modelId, (msg, pct) => {
          this.note.innerText = pct !== undefined ? `Recording from: ${details}\n${msg} ${pct}%` : `Recording from: ${details}\n${msg}`;
        });
        if (this.state === "recording") this.note.setText(`Recording from: ${details}`);
      } catch {}
    } catch (e: any) {
      new Notice(`Mic error: ${e?.message || e}`);
    }
  }

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
      let sum = 0; for (let i = 0; i < buf.length; i++) sum += Math.abs(buf[i] - 128);
      const avg = sum / buf.length;
      this.silenceFrames = avg < 1.5 ? this.silenceFrames + 1 : 0;
      this.warningEl.textContent = this.silenceFrames > 120 ? "⚠️ No audio detected — check mic/input device or permissions." : "";

      // draw
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.globalAlpha = 0.08; ctx.fillStyle = "currentColor"; const mid = cssH / 2; ctx.fillRect(0, mid, cssW, 1); ctx.globalAlpha = 1;

      ctx.beginPath(); ctx.lineWidth = 2; ctx.strokeStyle = "var(--text-accent)";
      const step = Math.max(1, Math.floor(buf.length / cssW));
      for (let x = 0, i = 0; x < cssW; x++, i += step) {
        const v = (buf[Math.min(i, buf.length - 1)] - 128) / 128; const y = mid + v * (cssH * 0.38);
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();

      this.rafId = requestAnimationFrame(draw);
    };
    this.rafId = requestAnimationFrame(draw);
  }

  private stopViz() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = undefined;
    try { this.srcNode?.disconnect(); } catch {}
    try { this.analyser?.disconnect(); } catch {}
    this.srcNode = undefined; this.analyser = undefined;
    try { this.ac?.close(); } catch {}
    this.ac = undefined;
  }

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
      await appendToDailyInbox(this.app, this.settings, `(recording error)`, new Date(endedAtMs));
      new Notice("Recording produced empty audio.");
      this.close();
      return;
    }

    try { if (this.objectURL) URL.revokeObjectURL(this.objectURL); } catch {}
    this.objectURL = URL.createObjectURL(webmBlob);

    try {
      this.note.setText("Processing audio…");
      const pcm16k = await decodeAndResampleTo16k(webmBlob);

      const asr = await getASRPipeline(this.settings.modelId, (msg, pct) => {
        this.note.innerText = pct !== undefined ? `Downloading model… ${pct}%` : String(msg);
      });

      this.note.setText("Transcribing…");
      const text = await transcribePCM16k(pcm16k, this.settings.modelId);
      const saved = await saveAudioPerSettings(this.plugin, pcm16k, webmBlob, when);

      const savedPath = saved.path;
      const audioLink = savedPath ? ` [[${savedPath}|audio]]` : "";

      const onlyPunct = text.replace(/[^\p{L}\p{N}]+/gu, "").length === 0;
      const words = text ? text.split(/\s+/).length : 0;
      const wpm = durationMs > 0 ? Math.round((words / (durationMs / 60000))) : 0;
      const longEnough = durationMs >= this.settings.lowConfMinDurationMs;
      const lowWpm = longEnough && wpm > 0 && wpm < this.settings.lowConfMinWpm;
      const looksBad = !text || onlyPunct || lowWpm;

      if (this.settings.saveAudioOnLowConfidence && looksBad) {
        const line = text ? `(low confidence)${audioLink} — tentative: ${text}` : `(no speech detected)${audioLink}`;
        await appendToDailyInbox(this.app, this.settings, line, new Date(endedAtMs));
      } else {
        await appendToDailyInbox(this.app, this.settings, (text || "(no speech detected)") + audioLink, new Date(endedAtMs));
      }

      this.showResultsUI({ transcript: text || "(no speech detected)", objectUrl: this.objectURL, savedPath, usedFormat: saved.used });

      new Notice(savedPath ? "Saved audio and note." : "Saved note.");
      this.state = "finished";
      this.btn.setText("Close");
      this.btn.onclick = () => this.close();

      // Auto-close after a brief moment so the user can glance at the transcript
      setTimeout(() => { if (this.state === "finished") this.close(); }, 2000);

    } catch (e: any) {
      console.error("[Obby Voice] Transcription failed:", e);
      try {
        if (this.plugin.settings.saveAudioFile) {
          const savedPath = await saveAudioBinary(this.plugin, await webmBlob.arrayBuffer(), when, "webm");
          await appendToDailyInbox(this.app, this.settings, `(transcription error) [[${savedPath}|audio]]`, new Date(endedAtMs));
          this.showResultsUI({ transcript: "(transcription error)", objectUrl: this.objectURL!, savedPath, usedFormat: "webm" });
          this.state = "finished"; this.btn.setText("Close"); this.btn.onclick = () => this.close();
          new Notice("Transcription failed; audio saved and noted in Inbox.");
          return;
        }
      } catch {}
      await appendToDailyInbox(this.app, this.settings, `(transcription error)`, new Date(endedAtMs));
      this.showResultsUI({ transcript: "(transcription error)", objectUrl: this.objectURL!, savedPath: null, usedFormat: null });
      this.state = "finished"; this.btn.setText("Close"); this.btn.onclick = () => this.close();
      new Notice(`Transcription failed: ${e?.message || e}`);
    }
  }

  private showResultsUI(opts: { transcript: string; objectUrl: string; savedPath: string | null; usedFormat: "mp3" | "webm" | null; }) {
    this.resultWrap.style.display = "";
    this.transcriptEl.value = opts.transcript;
    this.audioEl.src = opts.objectUrl; this.audioEl.playbackRate = 1;
    this.savedPathEl.textContent = opts.savedPath ? `Saved: ${opts.savedPath} (${opts.usedFormat?.toUpperCase()})` : `Audio not saved (disabled in settings).`;
    this.note.setText(this.deviceLabel ? `From: ${this.deviceLabel}` : "Finished");
  }

  onClose() {
    try { if (this.objectURL) URL.revokeObjectURL(this.objectURL); } catch {}
    this.stopViz();
    this.stream?.getTracks().forEach((t) => t.stop());
    this.contentEl.empty();
    this.state = "idle";
    this.callbacks?.onClosed?.();
  }
}
