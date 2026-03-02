# Obby Voice

An Obsidian plugin for quick voice-to-text. Records from your microphone, transcribes locally with Whisper (via WASM — no API key, no network calls for transcription), and appends the result to a daily inbox note.

## Features

- One-command recording: invoke "Record voice note to Inbox" and tap again to stop
- Local transcription via `@xenova/transformers` (Whisper ONNX, runs in-browser)
- Saves audio alongside the transcript (MP3 or WebM)
- Low-confidence detection: flags transcriptions with suspiciously low WPM and links to the audio
- Configurable inbox folder, filename date format, entry timestamp format, mic device, and audio subfolder

## Installation

Copy `main.js`, `styles.css`, `manifest.json`, and the `vendor/` folder to:

```
<vault>/.obsidian/plugins/obby-voice/
```

Then enable the plugin in Obsidian settings.

## Development

```
npm install
npm run dev   # watch mode
```

Requires Node 18+.

## Settings

| Setting | Default | Description |
|---|---|---|
| Inbox folder | `Inbox` | Daily note files are created here |
| Filename date format | `YYYY-MM-DD` | Moment format for the daily file name |
| Entry timestamp format | `MMM D, YYYY h:mm A` | Moment format for each entry line prefix |
| ASR model | `Xenova/whisper-tiny.en` | Whisper model (tiny/base recommended) |
| Input device | system default | Microphone to record from |
| Save audio file | on | Save audio alongside the transcript |
| Audio format | MP3 | `mp3` or `webm` |
| Audio subfolder | `Audio` | Subfolder inside inbox for audio files |
| Save audio on low confidence | on | Link audio when WPM heuristic flags poor transcription |
