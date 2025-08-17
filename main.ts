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
} from "obsidian";

import {
  canUseWhisperWeb,
  downloadWhisperModel,
  transcribe,
  resampleTo16Khz,
  getAvailableModels,
} from "@remotion/whisper-web";

// ---------------- Types & support cache ----------------

type SupportStatus = { supported: boolean; reason?: string };
let SUPPORT: SupportStatus = { supported: true }; // optimistic until we check

// ---------------- Settings ----------------

interface VoiceInboxSettings {
  inboxFolder: string;              // folder that holds YYYY-MM-DD.md
  filenameDateFormat: string;       // e.g. "YYYY-MM-DD"
  entryDateFormat: string;          // e.g. "MMM D, YYYY h:mm A"
  model: string;                    // e.g. "tiny.en" (fast, ~75 MB)

  // Low-confidence / failure handling
  saveAudioOnLowConfidence: boolean;
  lowConfMinDurationMs: number;     // duration floor to evaluate WPM confidence
  lowConfMinWpm: number;            // words-per-minute threshold
  audioSubfolder: string;           // optional subfolder for saved audio (inside inboxFolder)
}

const DEFAULT_SETTINGS: VoiceInboxSettings = {
  inboxFolder: "Inbox",
  filenameDateFormat: "YYYY-MM-DD",
  entryDateFormat: "MMM D, YYYY h:mm A",
  model: "tiny.en",
  saveAudioOnLowConfidence: true,
  lowConfMinDurationMs: 5000,
  lowConfMinWpm: 15,
  audioSubfolder: "Audio",
};

// ---------------- Plugin ----------------

export default class VoiceInboxPlugin extends Plugin {
  settings: VoiceInboxSettings;
  private activeModal?: RecordModal;

  async onload() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());

    // Async support preflight (don’t block UI)
    (async () => {
      try {
        const { supported, detailedReason } = await canUseWhisperWeb(this.settings.model);
        SUPPORT = { supported, reason: detailedReason };
      } catch (e: any) {
        SUPPORT = { supported: false, reason: e?.message || String(e) };
      }
    })();

    // Command used on desktop & mobile (users add it to mobile toolbar)
    this.addCommand({
      id: "record-voice-note-to-inbox",
      name: "Record voice note to Inbox (tap to stop)",
      checkCallback: (checking) => {
        if (!SUPPORT.supported) return false;
        if (checking) return true;
        this.openRecorder();
      },
    });

    // Optional: quick debug command to surface environment support info
    this.addCommand({
      id: "obby-voice-support-info",
      name: "Obby Voice: environment support info",
      callback: () =>
        new Notice(SUPPORT.supported ? "Whisper is supported." : `Not supported: ${SUPPORT.reason || "unknown"}`),
    });

    // Desktop-only ribbon + status bar (status bar doesn’t exist on mobile)
    if (!this.app.isMobile) {
      this.addRibbonIcon("microphone", "Record voice note to Inbox", () => this.openRecorder());
      const sb = this.addStatusBarItem();
      sb.setText("Obby Voice: use Command Palette → Record");
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

  async saveSettings() {
    await this.saveData(this.settings);
  }

  // Append transcript line to the day’s inbox file (using a provided timestamp)
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

  // Save raw audio into (inboxFolder / audioSubfolder)/voice-YYYYMMDD-HHmmss.webm
  async saveAudioBlob(blob: Blob, when: Date, _reason: string): Promise<string> {
    const root = normalizePath(this.settings.inboxFolder || "Inbox");
    const sub = (this.settings.audioSubfolder || "").trim();
    const dir = sub ? normalizePath(`${root}/${sub}`) : root;
    await this.ensureFolder(dir);

    const stamp = moment(when).format("YYYYMMDD-HHmmss");
    const base = `voice-${stamp}.webm`;
    let path = normalizePath(`${dir}/${base}`);

    // Avoid accidental overwrite
    let i = 1;
    while (this.app.vault.getAbstractFileByPath(path)) {
      path = normalizePath(`${dir}/voice-${stamp}-${i++}.webm`);
    }

    const buf = await blob.arrayBuffer();
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

  constructor(app: App, plugin: VoiceInboxPlugin) {
    super(app);
    this.plugin = plugin;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();

    contentEl.createEl("h3", { text: "Obby Voice" });
    this.note = contentEl.createEl("div", { text: "Tap to start recording." });

    this.btn = contentEl.createEl("button", { text: "Start" });
    this.btn.addEventListener("click", () => this.toggleRecording());

    const small = contentEl.createEl("div");
    small.setCssStyles({ opacity: "0.7", marginTop: "8px" });
    small.setText(`Model: ${this.plugin.settings.model} (first run downloads the model)`);

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
        new Notice(`Whisper not supported here: ${SUPPORT.reason || "unknown"}`);
        return;
      }

      // Request mic
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mt = this.pickMimeType();
      this.recorder = new MediaRecorder(this.stream, mt ? { mimeType: mt } : undefined);
      this.chunks = [];

      this.recorder.ondataavailable = (e: BlobEvent) => {
        if (e.data && e.data.size > 0) this.chunks.push(e.data);
      };
      this.startedAtMs = Date.now();
      this.recorder.start();
      this.state = "recording";
      this.note.setText("Recording… Tap to stop.");
      this.btn.setText("Stop");

      // Lazy model download on first use
      await downloadWhisperModel({
        model: this.plugin.settings.model,
        onProgress: ({ progress }) => (this.note.innerText = `Downloading model… ${Math.round(progress * 100)}%`),
      });

      if (this.state === "recording") this.note.setText("Recording… Tap to stop.");
    } catch (e: any) {
      new Notice(`Mic error: ${e?.message || e}`);
    }
  }

  private async stopAndTranscribe() {
    if (!this.recorder) return;
    this.recorder.stop();
    this.stream?.getTracks().forEach((t) => t.stop());
    this.state = "transcribing";
    this.note.setText("Processing audio…");

    const blob = new Blob(this.chunks, { type: "audio/webm" });
    const file = new File([blob], `voice-${Date.now()}.webm`, { type: "audio/webm" });
    const endedAtMs = Date.now();
    const durationMs = Math.max(0, endedAtMs - this.startedAtMs);
    const when = new Date(endedAtMs);

    try {
      // Convert to 16k mono waveform & transcribe (in-browser WASM)
      const channelWaveform = await resampleTo16Khz({
        file,
        onProgress: (p) => (this.note.innerText = `Resampling… ${Math.round(p * 100)}%`),
      });

      const { transcription } = await transcribe({
        channelWaveform,
        model: this.plugin.settings.model,
        onProgress: (p) => (this.note.innerText = `Transcribing… ${Math.round(p * 100)}%`),
      });

      const text = (transcription?.map((t: any) => t.text).join(" ") || "").trim();

      // Heuristic “confidence”
      const onlyPunct = text.replace(/[^\p{L}\p{N}]+/gu, "").length === 0;
      const words = text ? text.split(/\s+/).length : 0;
      const wpm = durationMs > 0 ? Math.round((words / (durationMs / 60000))) : 0;
      const longEnough = durationMs >= this.plugin.settings.lowConfMinDurationMs;
      const lowWpm = longEnough && wpm > 0 && wpm < this.plugin.settings.lowConfMinWpm;
      const looksBad = !text || onlyPunct || lowWpm;

      if (this.plugin.settings.saveAudioOnLowConfidence && looksBad) {
        const audioPath = await this.plugin.saveAudioBlob(blob, when, lowWpm ? "low_wpm" : "empty_text");
        const link = `[[${audioPath}|voice audio]]`;
        const line = text
          ? `(low confidence) ${link} — tentative: ${text}`
          : `(no speech detected) ${link}`;
        await this.plugin.appendToDailyInbox(line, when);
        new Notice("Saved audio for review; added note with link.");
      } else {
        await this.plugin.appendToDailyInbox(text || "(no speech detected)", when);
        new Notice("Saved to Inbox");
      }

      this.close();
    } catch (e: any) {
      try {
        if (this.plugin.settings.saveAudioOnLowConfidence) {
          const audioPath = await this.plugin.saveAudioBlob(blob, when, "exception");
          const link = `[[${audioPath}|voice audio]]`;
          const line = `(transcription error) ${link}`;
          await this.plugin.appendToDailyInbox(line, when);
          new Notice("Transcription failed; audio saved and noted in Inbox.");
        } else {
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

  display(): void {
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

    const models = getAvailableModels().map((m) => m.id); // e.g., tiny.en, base.en
    new Setting(containerEl)
      .setName("Whisper model")
      .setDesc("Smaller = faster; larger = more accurate.")
      .addDropdown((d) => {
        models.forEach((id) => d.addOption(id, id));
        d.setValue(this.plugin.settings.model);
        d.onChange(async (v) => {
          this.plugin.settings.model = v;
          await this.plugin.saveSettings();
        });
      });

    new Setting(containerEl)
      .setName("Save audio on low confidence")
      .setDesc("If STT fails or looks low-accuracy, save the .webm and note it in the daily file.")
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

    new Setting(containerEl)
      .setName("Audio subfolder")
      .setDesc("Optional subfolder (inside the inbox folder) to store saved audio files. Leave blank to store alongside the daily note.")
      .addText((t) =>
        t
          .setPlaceholder("Audio")
          .setValue(this.plugin.settings.audioSubfolder)
          .onChange(async (v) => {
            this.plugin.settings.audioSubfolder = v ?? "";
            await this.plugin.saveSettings();
          }),
      );
  }
}
