import { App, Notice, Plugin } from "obsidian";
import { DEFAULT_SETTINGS, ObbyVoiceSettings, SupportStatus } from "./types";
import { envSupported } from "./env";
import { RecordModal } from "./ui/RecordModal";
import { ObbyVoiceSettingsTab } from "./ui/SettingsTab";

export default class ObbyVoicePlugin extends Plugin {
  settings!: ObbyVoiceSettings;
  private support: SupportStatus = { supported: true };

  async onload() {
    await this.loadSettings();
    this.support = envSupported();

    this.addCommand({
      id: "record-voice-note-to-inbox",
      name: "Record voice note to Inbox (tap to stop)",
      checkCallback: (checking) => {
        if (!this.support.supported) return false;
        if (checking) return true;
        const modal = new RecordModal(this.app, this.settings);
        modal.openAndAutoStart();
      },
    });

    this.addSettingTab(new (class extends ObbyVoiceSettingsTab {
      constructor(app: App, plugin: ObbyVoicePlugin) { super(app, () => plugin.settings, () => plugin.saveSettings()); }
    })(this.app, this));

    new Notice("Obby Voice loaded");
  }

  async loadSettings() { this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData()); }
  async saveSettings() { await this.saveData(this.settings); }
}
