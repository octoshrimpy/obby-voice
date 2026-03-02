// src/ui/SettingsTab.ts
import { App, Plugin, PluginSettingTab, Setting, normalizePath } from "obsidian";
import type { ObbyVoiceSettings } from "../types";
import { listInputDevices } from "../audio";
import { getASRPipeline } from "../asr";
import { ensureHFModelInVault } from "../storage";

export class ObbyVoiceSettingsTab extends PluginSettingTab {
  constructor(
    app: App,
    plugin: Plugin,
    private getSettings: () => ObbyVoiceSettings,
    private save: () => Promise<void>
  ) {
    super(app, plugin);
  }

  private removeDevChange?: () => void;

  async display() {
    const settings = this.getSettings();
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl("h3", { text: "Obby Voice settings" });

    // ---------- Inbox / filenames ----------
    new Setting(containerEl)
      .setName("Inbox folder")
      .setDesc("Per-day files will be created here (e.g., 2025-08-17.md).")
      .addText((t) =>
        t.setPlaceholder("Inbox")
          .setValue(settings.inboxFolder)
          .onChange(async (v) => {
            settings.inboxFolder = v || "Inbox";
            await this.save();
          })
      );

    new Setting(containerEl)
      .setName("Filename date format")
      .setDesc("Moment format for the daily file (default: YYYY-MM-DD).")
      .addText((t) =>
        t.setPlaceholder("YYYY-MM-DD")
          .setValue(settings.filenameDateFormat)
          .onChange(async (v) => {
            settings.filenameDateFormat = v || "YYYY-MM-DD";
            await this.save();
          })
      );

    new Setting(containerEl)
      .setName("Entry timestamp format")
      .setDesc("Moment format for each line prefix (default: MMM D, YYYY h:mm A).")
      .addText((t) =>
        t.setPlaceholder("MMM D, YYYY h:mm A")
          .setValue(settings.entryDateFormat)
          .onChange(async (v) => {
            settings.entryDateFormat = v || "MMM D, YYYY h:mm A";
            await this.save();
          })
      );

    // ---------- Speech-to-text (Whisper via @xenova/transformers) ----------
    containerEl.createEl("h4", { text: "Speech-to-text (Whisper)" });

    const KNOWN_MODELS: Record<string, string> = {
      "Tiny (English-only, fastest)": "Xenova/whisper-tiny.en",
      "Base (English-only)":          "Xenova/whisper-base.en",
      "Small (English-only)":         "Xenova/whisper-small.en",
      "Medium (English-only, slower)": "Xenova/whisper-medium.en",
    };

    new Setting(containerEl)
      .setName("ASR model")
      .setDesc("Known-good ONNX models for Transformers.js (tiny/base recommended).")
      .addDropdown((d) => {
        // add the curated options
        for (const [label, id] of Object.entries(KNOWN_MODELS)) {
          d.addOption(id, label);
        }

        const current = (settings.modelId || "").trim();
        const knownIds = new Set(Object.values(KNOWN_MODELS));

        // If a custom model was previously saved, keep it selectable
        if (current && !knownIds.has(current)) {
          d.addOption(current, `Custom: ${current}`);
        }

        // Choose initial value (default to tiny)
        const initial = current && (knownIds.has(current) || !!Array.from((d as any).selectEl.options).find((o: any) => o.value === current))
          ? current
          : KNOWN_MODELS["Tiny (English-only, fastest)"];

        d.setValue(initial);
        settings.modelId = initial;

        d.onChange(async (value: string) => {
          settings.modelId = value || KNOWN_MODELS["Tiny (English-only, fastest)"];
          await this.save();
        });
      });

    // Model verify/download with live progress (mirror → validate → warm)
    const modelRow = new Setting(containerEl).setName("Model assets");
    const modelStatusEl = modelRow.controlEl.createEl("div", { text: "Not checked." });
    const setModelStatus = (msg: string) => { modelStatusEl.textContent = msg; };

    modelRow.addButton((b) => {
      b.setButtonText("Verify / Download")
        .setCta()
        .onClick(async () => {
          const modelId = (settings.modelId?.trim()) || "Xenova/whisper-tiny.en";
          try {
            setModelStatus("Checking Hugging Face…");
            const onProgress = (msg: string, pct?: number) =>
              setModelStatus(pct != null ? `${msg} (${pct}%)` : msg);

            // 1) Mirror repo files into the vault (idempotent)
            const { modelDir, fileCount } = await ensureHFModelInVault(
              this.app,
              modelId,
              "Obby Voice/models/hf",
              onProgress
            );

            // 2) Validate config.json says "whisper"
            const cfgPath = normalizePath(`${modelDir}/config.json`);
            const raw = await this.app.vault.adapter.read(cfgPath);
            const cfg = JSON.parse(raw);
            const mt = (cfg?.model_type || "").toLowerCase();
            if (mt !== "whisper") {
              throw new Error(`Invalid model_type in config.json: ${cfg?.model_type ?? "unknown"}`);
            }

            // Warm/verify pipeline
            await getASRPipeline(modelId, onProgress);

            setModelStatus(`Ready ✓  (${fileCount} files in ${modelDir})`);
          } catch (err: any) {
            const hint =
              /Unsupported model type: whisper/i.test(String(err?.message))
                ? " (Hint: ensure you're on @xenova/transformers and using a Xenova/whisper-* ONNX repo)"
                : "";
            setModelStatus(`Error: ${err?.message ?? String(err)}${hint}`);
          }
        });
    });

    // ---------- Microphone (single dropdown, self-primes permission) ----------
    containerEl.createEl("h4", { text: "Microphone" });

    let selectEl: HTMLSelectElement | undefined;

    const micRow = new Setting(containerEl)
      .setName("Input device")
      .setDesc("Pick a microphone. If names are blank, click the dropdown once to grant access.")
      .addDropdown((d) => {
        selectEl = (d as any).selectEl as HTMLSelectElement;
        d.addOption("", "(system default)");
        d.setValue(settings.inputDeviceId || "");
        d.onChange(async (value: string) => {
          settings.inputDeviceId = value; // "" => default
          await this.save();
          await updateDesc();
        });
      });

    // First build (labels may be blank until permission)
    await rebuild();

    // On first user interaction with the dropdown, prime permission and rebuild
    const primeOnce = async () => {
      if (await labelsAreBlank()) {
        let warm: MediaStream | null = null;
        try {
          warm = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        } catch {
        } finally {
          try { warm?.getTracks().forEach((t) => t.stop()); } catch {}
        }
        await rebuild();
      }
    };
    selectEl?.addEventListener("mousedown", primeOnce, { once: true });

    // Refresh on device hot-plug
    const onDevChange = async () => { await rebuild(); };
    try {
      this.removeDevChange?.();
      navigator.mediaDevices.addEventListener("devicechange", onDevChange);
      this.removeDevChange = () => {
        try { navigator.mediaDevices.removeEventListener("devicechange", onDevChange); } catch {}
      };
    } catch { /* ignore if unsupported */ }

    // ---- helpers (always use listInputDevices) ----
    async function rebuild() {
      if (!selectEl) return;

      const inputs = await listInputDevices();

      while (selectEl.firstChild) selectEl.removeChild(selectEl.firstChild);
      selectEl.append(new Option("(system default)", ""));

      for (const dev of inputs) {
        const label = dev.label || `(device ${dev.deviceId})`;
        selectEl.append(new Option(label, dev.deviceId));
      }

      const want = settings.inputDeviceId || "";
      const exists = Array.from(selectEl.options).some((o) => o.value === want);
      selectEl.value = exists ? want : "";
      selectEl.dispatchEvent(new Event("change", { bubbles: true }));

      await updateDesc(inputs);
    }

    async function updateDesc(inputsArg?: MediaDeviceInfo[]) {
      const inputs = inputsArg ?? (await listInputDevices());
      const id = selectEl?.value || "";
      const label =
        id === ""
          ? "(system default)"
          : (inputs.find((d) => d.deviceId === id)?.label || `(device ${id})`);
      micRow.setDesc(`Current: ${label}`);
    }

    async function labelsAreBlank(): Promise<boolean> {
      const inputs = await listInputDevices();
      if (inputs.length === 0) return false; // nothing to prime
      return inputs.every((d) => !d.label);
    }

    // ---------- Audio saving ----------
    containerEl.createEl("h4", { text: "Audio saving" });

    new Setting(containerEl)
      .setName("Save audio file")
      .setDesc("If off, only the transcription is saved to your daily note.")
      .addToggle((t) =>
        t.setValue(settings.saveAudioFile).onChange(async (v) => {
          settings.saveAudioFile = v;
          await this.save();
        })
      );

    new Setting(containerEl)
      .setName("Audio format")
      .setDesc("Choose the file format to save. MP3 is default.")
      .addDropdown((d) => {
        d.addOption("mp3", "MP3 (experimental)");
        d.addOption("webm", "WebM/Opus (recommended)");
        d.setValue(settings.audioFormat as string);
        d.onChange(async (value: string) => {
          settings.audioFormat = value === "webm" ? "webm" : "mp3";
          await this.save();
        });
      });

    new Setting(containerEl)
      .setName("Audio subfolder")
      .setDesc("Optional subfolder (inside the inbox folder) to store saved audio files.")
      .addText((t) =>
        t.setPlaceholder("Audio")
          .setValue(settings.audioSubfolder)
          .onChange(async (v) => {
            settings.audioSubfolder = v ?? "";
            await this.save();
          })
      );

    // ---------- Low-confidence ----------
    containerEl.createEl("h4", { text: "Low-confidence behavior" });

    new Setting(containerEl)
      .setName("Also save audio on low confidence")
      .setDesc("If enabled and transcription looks poor, include the audio link in the note.")
      .addToggle((t) =>
        t.setValue(settings.saveAudioOnLowConfidence)
          .onChange(async (v) => {
            settings.saveAudioOnLowConfidence = v;
            await this.save();
          })
      );

    new Setting(containerEl)
      .setName("Low-confidence: min duration (ms)")
      .setDesc("Only evaluate WPM if recording is at least this long. Default 5000.")
      .addText((t) =>
        t.setPlaceholder("5000")
          .setValue(String(settings.lowConfMinDurationMs))
          .onChange(async (v) => {
            const n = parseInt(v || "5000", 10);
            settings.lowConfMinDurationMs = Number.isFinite(n) ? Math.max(0, n) : 5000;
            await this.save();
          })
      );

    new Setting(containerEl)
      .setName("Low-confidence: min WPM")
      .setDesc("Flag low accuracy if words-per-minute is below this for long recordings. Default 15.")
      .addText((t) =>
        t.setPlaceholder("15")
          .setValue(String(settings.lowConfMinWpm))
          .onChange(async (v) => {
            const n = parseInt(v || "15", 10);
            settings.lowConfMinWpm = Number.isFinite(n) ? Math.max(1, n) : 15;
            await this.save();
          })
      );
  }

  hide() {
    this.removeDevChange?.();
    this.removeDevChange = undefined;
  }
}
