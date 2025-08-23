import { moment } from "obsidian";

export interface ObbyVoiceSettings {
  // Inbox / note formatting
  inboxFolder: string;            // e.g., "Inbox"
  filenameDateFormat: string;     // e.g., "YYYY-MM-DD"
  entryDateFormat: string;        // e.g., "MMM D, YYYY h:mm A"

  // STT model
  modelId: string;                // e.g., "Xenova/whisper-tiny.en"

  // Mic selection
  inputDeviceId: string;          // exact deviceId or "" for default

  // Audio saving
  saveAudioFile: boolean;         // true = save audio alongside transcript
  audioFormat: "mp3" | "webm";    // default mp3
  audioSubfolder: string;         // subfolder inside inbox to store audio

  // Low-confidence behavior
  saveAudioOnLowConfidence: boolean;
  lowConfMinDurationMs: number;
  lowConfMinWpm: number;
}

export const DEFAULT_SETTINGS: ObbyVoiceSettings = {
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

export type SupportStatus = { supported: boolean; reason?: string };
