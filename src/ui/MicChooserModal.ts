// If you're on NodeNext/ESM, add `.js` to local imports.
import { App, Modal, Notice, Setting } from "obsidian";
import type { ObbyVoiceSettings } from "../types";

export class MicChooserModal extends Modal {
  private getSettings: () => ObbyVoiceSettings;
  private save: () => Promise<void>;

  private stream: MediaStream | null = null;
  private ac?: AudioContext;
  private analyser?: AnalyserNode;
  private rafId?: number;

  private selectEl!: HTMLSelectElement;
  private canvas!: HTMLCanvasElement;
  private stopListening?: () => void;

  constructor(app: App, getSettings: () => ObbyVoiceSettings, save: () => Promise<void>) {
    super(app);
    this.getSettings = getSettings;
    this.save = save;
  }

  async onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h3", { text: "Choose microphone" });

    // 1) Start a generic stream (user gesture — opening the modal) and KEEP IT OPEN.
    //    This is the key difference vs your settings dropdown.
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: { ideal: true }, noiseSuppression: { ideal: true }, autoGainControl: { ideal: true } },
        video: false,
      });
    } catch (e) {
      new Notice("Microphone permission denied/unavailable.");
      this.close();
      return;
    }

    // 2) Tiny level meter so we know the stream is alive (also helps keep permissions “warm”)
    this.canvas = contentEl.createEl("canvas", { attr: { width: "360", height: "30" } });
    this.canvas.style.width = "100%";
    this.canvas.style.height = "30px";
    this.canvas.style.background = "var(--background-secondary)";
    this.setupLevelMeter();

    // 3) Device list (built while stream is active → labels show up)
    new Setting(contentEl).setName("Input device").setDesc("Pick your mic (labels appear only after permission).");
    this.selectEl = contentEl.createEl("select", { cls: "mic-device-select" });
    this.selectEl.style.width = "100%";
    await this.rebuildDeviceList();

    // Rebuild on hot-plug
    const onDevChange = () => this.rebuildDeviceList();
    try {
      navigator.mediaDevices.addEventListener("devicechange", onDevChange);
      this.stopListening = () => {
        try { navigator.mediaDevices.removeEventListener("devicechange", onDevChange); } catch {}
      };
    } catch { /* older envs */ }

    // 4) Actions
    new Setting(contentEl)
      .addButton((b) =>
        b.setButtonText("Use selection").onClick(async () => {
          const settings = this.getSettings();
          settings.inputDeviceId = this.selectEl.value; // "" → system default
          await this.save();
          const label = this.selectEl.selectedOptions[0]?.text || "(system default)";
          new Notice(`Input device set: ${label}`);
          this.close();
        })
      )
      .addButton((b) =>
        b.setButtonText("System default").onClick(async () => {
          const settings = this.getSettings();
          settings.inputDeviceId = "";
          await this.save();
          new Notice("Input device set: (system default)");
          this.close();
        })
      )
      .addExtraButton((b) =>
        b.setIcon("cross").setTooltip("Cancel").onClick(() => this.close())
      );
  }

  private async rebuildDeviceList() {
    const all = await navigator.mediaDevices.enumerateDevices();
    const inputs = all.filter((d) => d.kind === "audioinput");

    // rebuild options
    while (this.selectEl.firstChild) this.selectEl.removeChild(this.selectEl.firstChild);
    this.selectEl.append(new Option("(system default)", ""));

    for (const d of inputs) {
      const label = d.label || `(device ${d.deviceId})`; // pre-permission fallback
      this.selectEl.append(new Option(label, d.deviceId));
    }

    // preselect current
    const want = this.getSettings().inputDeviceId || "";
    const exists = Array.from(this.selectEl.options).some((o) => o.value === want);
    this.selectEl.value = exists ? want : "";
  }

  private setupLevelMeter() {
    const AC = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
    this.ac = new AC();
    this.analyser = this.ac.createAnalyser();
    this.analyser.fftSize = 512;

    const src = this.ac.createMediaStreamSource(this.stream!);
    src.connect(this.analyser);

    const ctx = this.canvas.getContext("2d")!;
    const buf = new Uint8Array(this.analyser.frequencyBinCount);

    const draw = () => {
      if (!this.analyser) return;
      this.analyser.getByteTimeDomainData(buf);
      let sum = 0;
      for (let i = 0; i < buf.length; i++) sum += Math.abs(buf[i] - 128);
      const avg = sum / buf.length;
      const level = Math.min(1, avg / 20); // crude scaling

      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      ctx.fillStyle = "var(--interactive-accent)";
      ctx.globalAlpha = 0.7;
      ctx.fillRect(0, 0, Math.floor(this.canvas.width * level), this.canvas.height);
      ctx.globalAlpha = 1;

      this.rafId = requestAnimationFrame(draw);
    };
    this.rafId = requestAnimationFrame(draw);
  }

  onClose() {
    try { if (this.rafId) cancelAnimationFrame(this.rafId); } catch {}
    try { this.ac?.close(); } catch {}
    try { this.stream?.getTracks().forEach((t) => t.stop()); } catch {}
    this.stopListening?.();
    this.contentEl.empty();
  }
}
