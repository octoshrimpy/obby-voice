// src/storage.ts
import { App, moment, Notice, TFolder, TFile, normalizePath, requestUrl } from "obsidian";
import type ObbyVoicePlugin from "./main";
import type { ObbyVoiceSettings } from "./types";
import { encodeMp3FromPCM } from "./audio";

/* -------------------------------------------------------------------------- */
/* utils                                                                      */
/* -------------------------------------------------------------------------- */

export type ProgressFn = (msg: string, pct?: number) => void;

function pad(n: number) { return n < 10 ? `0${n}` : String(n); }
function stamp(when: Date) {
  return `${when.getFullYear()}${pad(when.getMonth() + 1)}${pad(when.getDate())}-${pad(when.getHours())}${pad(when.getMinutes())}${pad(when.getSeconds())}`;
}

async function ensureFolder(app: App, path: string) {
  const existing = app.vault.getAbstractFileByPath(path);
  if (existing instanceof TFolder) return;
  await app.vault.createFolder(path).catch(() => {});
}

function fileExists(app: App, path: string): boolean {
  return app.vault.getAbstractFileByPath(path) instanceof TFile;
}

/* -------------------------------------------------------------------------- */
/* public API                                                                  */
/* -------------------------------------------------------------------------- */

// Append a line to the daily inbox note (creates the file if missing).
export async function appendToDailyInbox(
  app: App,
  settings: ObbyVoiceSettings,
  line: string,
  when: Date
): Promise<string> {
  const root = normalizePath(settings.inboxFolder || "Inbox");
  await ensureFolder(app, root);

  const m = moment(when);
  const filename = m.format(settings.filenameDateFormat || "YYYY-MM-DD");
  const path = normalizePath(`${root}/${filename}.md`);

  // create file if it doesn't exist
  let file = app.vault.getAbstractFileByPath(path);
  if (!(file instanceof TFile)) {
    try {
      await app.vault.create(path, `# ${filename}\n`);
    } catch {
      // race: someone else created it; continue
    }
    file = app.vault.getAbstractFileByPath(path);
  }

  if (!(file instanceof TFile)) throw new Error("Failed to open daily inbox file.");

  const prefix = m.format(settings.entryDateFormat || "HH:mm");
  await app.vault.append(file, `- ${prefix} ${line}\n`);
  return path;
}

export async function saveAudioBinary(
  plugin: ObbyVoicePlugin,
  buf: ArrayBuffer,
  when: Date,
  ext: "mp3" | "webm",
): Promise<string> {
  const settings = plugin.settings as ObbyVoiceSettings;
  const root = normalizePath(settings.inboxFolder || "Inbox");
  const sub = (settings.audioSubfolder || "").trim();
  const dir = sub ? normalizePath(`${root}/${sub}`) : root;

  await ensureFolder(plugin.app, dir);

  const ts = stamp(when);
  let path = normalizePath(`${dir}/voice-${ts}.${ext}`);
  let i = 1;
  while (plugin.app.vault.getAbstractFileByPath(path)) {
    path = normalizePath(`${dir}/voice-${ts}-${i++}.${ext}`);
  }
  await plugin.app.vault.createBinary(path, buf);
  return path;
}

export async function saveAudioPerSettings(
  plugin: ObbyVoicePlugin,
  pcm16k: Float32Array,
  webmBlob: Blob,
  when: Date,
): Promise<{ path: string | null; used: "mp3" | "webm" | null }> {
  const settings = plugin.settings as ObbyVoiceSettings;

  if (!settings.saveAudioFile) return { path: null, used: null };

  if (settings.audioFormat === "mp3") {
    try {
      const mp3Blob = await encodeMp3FromPCM(plugin, pcm16k, 16000);
      const path = await saveAudioBinary(plugin, await mp3Blob.arrayBuffer(), when, "mp3");
      console.log("[Obby Voice] Saved MP3:", path);
      return { path, used: "mp3" };
    } catch (err) {
      console.warn("[Obby Voice] MP3 encode failed, saving WebM instead:", err);
      new Notice("MP3 encode failed — saved WebM instead.");
    }
  }

  const path = await saveAudioBinary(plugin, await webmBlob.arrayBuffer(), when, "webm");
  console.log("[Obby Voice] Saved WebM:", path);
  return { path, used: "webm" };
}

/* -------------------------------------------------------------------------- */
/* Hugging Face helpers (Whisper)                                              */
/* -------------------------------------------------------------------------- */

// Download a model repo into the vault under baseDir/<repoId>/...
export async function ensureHFModelInVault(
  app: App,
  repoId: string,                      // e.g. "Xenova/whisper-tiny.en"
  baseDir = "Obby Voice/models/hf",    // where models live in the vault
  onProgress?: ProgressFn
): Promise<{ modelDir: string; fileCount: number }> {
  const metaUrl = `https://huggingface.co/api/models/${repoId}`;
  const metaRes = await requestUrl({ url: metaUrl });
  const meta = (metaRes as any).json ?? JSON.parse(metaRes.text ?? "{}");

  if (!meta || !Array.isArray(meta.siblings)) {
    throw new Error("Could not read model file list from Hub.");
  }

  // Files we care about + all ONNX weights
  const wanted = new Set([
    "config.json",
    "preprocessor_config.json",
    "tokenizer.json",
    "vocabulary.json",
    "merges.txt",
  ]);

  const files: string[] = [];
  for (const s of meta.siblings as Array<{ rfilename: string }>) {
    const f = s.rfilename;
    if (f.startsWith("onnx/") || wanted.has(f)) files.push(f);
  }
  if (files.length === 0) throw new Error("No ONNX/Whisper assets found in repo.");

  // Create base folder structure: <baseDir>/<repoId>/
  const repoDir = normalizePath(`${baseDir}/${repoId}`);
  await ensureFolder(app, baseDir);
  await ensureFolder(app, repoDir);

  const ensureSubfolders = new Set<string>();
  files.forEach((f) => {
    const slash = f.lastIndexOf("/");
    if (slash > 0) ensureSubfolders.add(f.slice(0, slash));
  });
  for (const sub of ensureSubfolders) {
    await ensureFolder(app, normalizePath(`${repoDir}/${sub}`));
  }

  // Download any missing files
  let done = 0;
  for (const rel of files) {
    const dest = normalizePath(`${repoDir}/${rel}`);
    if (fileExists(app, dest)) {
      done++;
      onProgress?.(`Checked ${done}/${files.length}`, Math.round((done / files.length) * 100));
      continue;
    }
    const url = `https://huggingface.co/${repoId}/resolve/main/${rel}`;
    const resp = await requestUrl({ url, headers: { Accept: "application/octet-stream" } });
    const buf: ArrayBuffer = (resp as any).arrayBuffer ?? new TextEncoder().encode(resp.text ?? "").buffer;
    await app.vault.createBinary(dest, buf);
    done++;
    onProgress?.(`Downloaded ${rel}`, Math.round((done / files.length) * 100));
  }

  onProgress?.("Ready ✓", 100);
  return { modelDir: repoDir, fileCount: files.length };
}

// Compute a browser-usable URL prefix for local models (for Transformers.js)
export function localModelBaseURL(app: App, baseDir = "Obby Voice/models/hf") {
  const url = (app.vault as any).adapter.getResourcePath(baseDir);
  return url.endsWith("/") ? url : url + "/";
}
