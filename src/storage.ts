import { App, Notice, TFile, TFolder, normalizePath } from "obsidian";
import type { ObbyVoiceSettings } from "./types";
import { encodeMp3FromPCM } from "./audio";
import moment from "moment";

async function ensureFolder(app: App, path: string) {
  const existing = app.vault.getAbstractFileByPath(path);
  if (existing instanceof TFolder) return;
  await app.vault.createFolder(path).catch(() => {});
}

async function needsLeadingNewline(app: App, file: TFile): Promise<boolean> {
  const content = await app.vault.cachedRead(file);
  return content.length > 0 && !content.endsWith("\n");
}

export async function appendToDailyInbox(app: App, settings: ObbyVoiceSettings, line: string, when = new Date()) {
  const m = moment(when);
  const folderPath = normalizePath(settings.inboxFolder || "Inbox");
  await ensureFolder(app, folderPath);

  const fileName = m.format(settings.filenameDateFormat) + ".md";
  const filePath = normalizePath(`${folderPath}/${fileName}`);

  let file = app.vault.getAbstractFileByPath(filePath) as TFile | null;
  if (!file) file = await app.vault.create(filePath, "");

  const prefix = `[${m.format(settings.entryDateFormat)}] `;
  const text = `${prefix}${line}\n`;
  await app.vault.append(file, (await needsLeadingNewline(app, file)) ? `\n${text}` : text);
}

export async function saveAudioBinary(app: App, settings: ObbyVoiceSettings, buf: ArrayBuffer, when: Date, ext: "mp3" | "webm"): Promise<string> {
  const root = normalizePath(settings.inboxFolder || "Inbox");
  const sub = (settings.audioSubfolder || "").trim();
  const dir = sub ? normalizePath(`${root}/${sub}`) : root;
  await ensureFolder(app, dir);

  const stamp = moment(when).format("YYYYMMDD-HHmmss");
  let path = normalizePath(`${dir}/voice-${stamp}.${ext}`);
  let i = 1;
  while (app.vault.getAbstractFileByPath(path)) path = normalizePath(`${dir}/voice-${stamp}-${i++}.${ext}`);
  await app.vault.createBinary(path, buf);
  return path;
}

export async function saveAudioPerSettings(
  app: App,
  settings: ObbyVoiceSettings,
  pcm16k: Float32Array,
  webmBlob: Blob,
  when: Date
): Promise<{ path: string | null; used: "mp3" | "webm" | null }> {
  if (!settings.saveAudioFile) return { path: null, used: null };

  if (settings.audioFormat === "mp3") {
    try {
      const mp3Blob = await encodeMp3FromPCM(pcm16k, 16000);
      const path = await saveAudioBinary(app, settings, await mp3Blob.arrayBuffer(), when, "mp3");
      console.log("[Obby Voice] Saved MP3:", path);
      return { path, used: "mp3" };
    } catch (err) {
      console.warn("[Obby Voice] MP3 encode failed, saving WebM instead:", err);
      new Notice("MP3 encode failed — saved WebM instead.");
    }
  }
  const path = await saveAudioBinary(app, settings, await webmBlob.arrayBuffer(), when, "webm");
  console.log("[Obby Voice] Saved WebM:", path);
  return { path, used: "webm" };
}
