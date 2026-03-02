import { Notice, Plugin } from "obsidian";
import { DEFAULT_SETTINGS, ObbyVoiceSettings, SupportStatus } from "./types";
import { envSupported } from "./env";
import { getASRPipeline, setWasmPath, setTransformersPath } from "./asr";
import { RecordModal } from "./ui/RecordModal";
import { ObbyVoiceSettingsTab } from "./ui/SettingsTab";

export default class ObbyVoicePlugin extends Plugin {
    settings!: ObbyVoiceSettings;
    private support: SupportStatus = { supported: true };
    private activeModal?: RecordModal;
    private ribbonEl?: HTMLElement;

    async onload() {
        await this.loadSettings();
        this.support = envSupported();

        this.ribbonEl = this.addRibbonIcon("mic", "Obby Voice: Record", () => {
            this.toggleRecording();
        });

        this.addCommand({
            id: "record-voice-note-to-inbox",
            name: "Toggle voice recording",
            checkCallback: (checking) => {
                if (!this.support.supported) return false;
                if (checking) return true;
                this.toggleRecording();
            },
        });

        this.addSettingTab(
            new ObbyVoiceSettingsTab(
                this.app,
                this,
                () => this.settings,
                () => this.saveSettings()
            )
        );

        // this.manifest.dir is the actual plugin folder name (e.g. "aa-obby-voice"),
        // which may differ from this.manifest.id. getResourcePath adds a ?timestamp
        // cache-buster, so we call it per-file rather than on a directory to avoid
        // the timestamp being concatenated into a broken filename.
        const pluginDir = (this.manifest as any).dir ?? `.obsidian/plugins/${this.manifest.id}`;
        const res = (rel: string) =>
            (this.app.vault.adapter as any).getResourcePath(`${pluginDir}/${rel}`);

        // Load @xenova/transformers from the vendored pre-built file so esbuild
        // never re-bundles it (which breaks onnxruntime-web's InferenceSession).
        setTransformersPath(res("vendor/transformers.min.js"));
        // For the WASM directory, strip ?timestamp so onnxruntime-web can append
        // filenames without garbling the URL.
        setWasmPath(res("vendor/wasm/ort-wasm.wasm").replace(/\/ort-wasm\.wasm.*$/, "/"));

        // Warm up the model in the background so first recording has no cold-start
        if (this.support.supported) {
            getASRPipeline(this.settings.modelId).catch(() => { /* silent */ });
        }
    }

    private toggleRecording() {
        if (this.activeModal) {
            this.activeModal.stop();
            return;
        }

        const modal = new RecordModal(this.app, this.settings, this, {
            onRecordingStarted: () => this.setRibbonRecording(true),
            onClosed: () => {
                this.activeModal = undefined;
                this.setRibbonRecording(false);
            },
        });
        this.activeModal = modal;
        modal.openAndAutoStart();
    }

    private setRibbonRecording(recording: boolean) {
        this.ribbonEl?.toggleClass("obby-voice-recording", recording);
        this.ribbonEl?.setAttribute(
            "aria-label",
            recording ? "Obby Voice: Stop recording" : "Obby Voice: Record"
        );
    }

    async loadSettings() {
        this.settings = Object.assign(
            {},
            DEFAULT_SETTINGS,
            await this.loadData()
        );
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}
