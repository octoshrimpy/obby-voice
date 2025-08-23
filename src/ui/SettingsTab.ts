import { App, Notice, PluginSettingTab, Setting, DropdownComponent } from "obsidian";
import type { ObbyVoiceSettings } from "../types";
import { ensureMicPermission, listInputDevices } from "../audio";

export class ObbyVoiceSettingsTab extends PluginSettingTab {
    constructor(
        app: App,
        private getSettings: () => ObbyVoiceSettings,
        private save: () => Promise<void>
    ) {
        super(app, {} as any);
    }

    async display() {
        const settings = this.getSettings();
        const { containerEl } = this;
        containerEl.empty();

        containerEl.createEl("h3", { text: "Obby Voice settings" });

        new Setting(containerEl)
            .setName("Inbox folder")
            .setDesc(
                "Per-day files will be created here (e.g., 2025-08-17.md)."
            )
            .addText((t) =>
                t
                    .setPlaceholder("Inbox")
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
                t
                    .setPlaceholder("YYYY-MM-DD")
                    .setValue(settings.filenameDateFormat)
                    .onChange(async (v) => {
                        settings.filenameDateFormat = v || "YYYY-MM-DD";
                        await this.save();
                    })
            );

        new Setting(containerEl)
            .setName("Entry timestamp format")
            .setDesc(
                "Moment format for each line prefix (default: MMM D, YYYY h:mm A)."
            )
            .addText((t) =>
                t
                    .setPlaceholder("MMM D, YYYY h:mm A")
                    .setValue(settings.entryDateFormat)
                    .onChange(async (v) => {
                        settings.entryDateFormat = v || "MMM D, YYYY h:mm A";
                        await this.save();
                    })
            );

        new Setting(containerEl)
            .setName("ASR model (HuggingFace id)")
            .setDesc("Examples: Xenova/whisper-tiny.en, Xenova/whisper-base.en")
            .addText((t) =>
                t
                    .setPlaceholder("Xenova/whisper-tiny.en")
                    .setValue(settings.modelId)
                    .onChange(async (v) => {
                        settings.modelId = v || "Xenova/whisper-tiny.en";
                        await this.save();
                    })
            );

        // ---------- Microphone ----------
        containerEl.createEl("h4", { text: "Microphone" });

        let dd!: DropdownComponent;
        const micRow = new Setting(containerEl)
            .setName("Input device")
            .setDesc(
                "Grant mic permission once so device names appear. Leave blank for system default."
            )
            .addDropdown((d) => {
                dd = d;
                d.addOption("", "(system default)");
                d.setValue(settings.inputDeviceId || "");
                d.onChange(async (value: string) => {
                    // Save selection
                    settings.inputDeviceId = value; // "" = system default
                    await this.save();

                    // Update desc with current label
                    const devices = await listInputDevices();
                    const label = value
                        ? devices.find((x) => x.deviceId === value)?.label ||
                          `(device ${value})`
                        : "(system default)";
                    micRow.setDesc(`Current: ${label}`);

                    new Notice(
                        value
                            ? `Input device set: ${label}`
                            : "Input device set: (system default)"
                    );
                });
            })
            .addButton((b) =>
                b.setButtonText("Refresh list").onClick(async () => {
                    await refreshDevices(/*prime=*/ false);
                })
            )
            .addButton((b) =>
                b.setButtonText("Grant mic & refresh").onClick(async () => {
                    await refreshDevices(/*prime=*/ true);
                })
            );

        // populate dropdown (with optional permission warm-up so labels appear)
        await refreshDevices(true);

        // ---- helpers ----
        async function refreshDevices(prime: boolean) {
            // Warm permission so labels are revealed by browsers that hide them until gUM
            let warm: MediaStream | null = null;
            if (prime) {
                try {
                    warm = await ensureMicPermission(
                        settings.inputDeviceId || undefined
                    );
                } catch {
                    // ignore – user may deny; we still show device IDs
                } finally {
                    try {
                        warm?.getTracks().forEach((t) => t.stop());
                    } catch {}
                }
            }

            const devices = await listInputDevices();

            // Rebuild <select> options robustly
            const select = (dd as any).selectEl as
                | HTMLSelectElement
                | undefined;
            if (!select) return;

            while (select.firstChild) select.removeChild(select.firstChild);
            select.append(new Option("(system default)", ""));
            for (const dev of devices) {
                const label = dev.label || `(device ${dev.deviceId})`;
                select.append(new Option(label, dev.deviceId));
            }

            // Preserve current selection if still present
            const want = settings.inputDeviceId || "";
            const exists = Array.from(select.options).some(
                (o) => o.value === want
            );
            select.value = exists ? want : "";
            select.dispatchEvent(new Event("change", { bubbles: true }));

            // Update description with the visible label
            const label =
                select.value === ""
                    ? "(system default)"
                    : devices.find((d) => d.deviceId === select.value)?.label ||
                      `(device ${select.value})`;
            micRow.setDesc(`Current: ${label}`);
        }

        containerEl.createEl("h4", { text: "Audio saving" });
        new Setting(containerEl)
            .setName("Save audio file")
            .setDesc(
                "If off, only the transcription is saved to your daily note."
            )
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
                d.addOption("mp3", "MP3 (mono, 16 kHz)");
                d.addOption("webm", "WebM/Opus");

                // settings.audioFormat is a union; DropdownComponent wants string
                d.setValue(settings.audioFormat as string);

                // Dropdown onChange => (value: string)
                d.onChange(async (value: string) => {
                    // Narrow to our union safely
                    const v: ObbyVoiceSettings["audioFormat"] =
                        value === "webm" ? "webm" : "mp3";
                    settings.audioFormat = v;
                    await this.save();
                });
            });

        new Setting(containerEl)
            .setName("Audio subfolder")
            .setDesc(
                "Optional subfolder (inside the inbox folder) to store saved audio files."
            )
            .addText((t) =>
                t
                    .setPlaceholder("Audio")
                    .setValue(settings.audioSubfolder)
                    .onChange(async (v) => {
                        settings.audioSubfolder = v ?? "";
                        await this.save();
                    })
            );

        containerEl.createEl("h4", { text: "Low-confidence behavior" });
        new Setting(containerEl)
            .setName("Also save audio on low confidence")
            .setDesc(
                "If enabled and transcription looks poor, include the audio link in the note."
            )
            .addToggle((t) =>
                t
                    .setValue(settings.saveAudioOnLowConfidence)
                    .onChange(async (v) => {
                        settings.saveAudioOnLowConfidence = v;
                        await this.save();
                    })
            );

        new Setting(containerEl)
            .setName("Low-confidence: min duration (ms)")
            .setDesc(
                "Only evaluate WPM if recording is at least this long. Default 5000."
            )
            .addText((t) =>
                t
                    .setPlaceholder("5000")
                    .setValue(String(settings.lowConfMinDurationMs))
                    .onChange(async (v) => {
                        const n = parseInt(v || "5000", 10);
                        settings.lowConfMinDurationMs = Number.isFinite(n)
                            ? Math.max(0, n)
                            : 5000;
                        await this.save();
                    })
            );

        new Setting(containerEl)
            .setName("Low-confidence: min WPM")
            .setDesc(
                "Flag low accuracy if words-per-minute is below this for long recordings. Default 15."
            )
            .addText((t) =>
                t
                    .setPlaceholder("15")
                    .setValue(String(settings.lowConfMinWpm))
                    .onChange(async (v) => {
                        const n = parseInt(v || "15", 10);
                        settings.lowConfMinWpm = Number.isFinite(n)
                            ? Math.max(1, n)
                            : 15;
                        await this.save();
                    })
            );
    }
}
