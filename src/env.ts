import type { SupportStatus } from "./types";

export function envSupported(): SupportStatus {
  const hasMedia = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  const hasAudioCtx = !!(window.AudioContext || (window as any).webkitAudioContext);
  if (!hasMedia) return { supported: false, reason: "No mediaDevices.getUserMedia" };
  if (!hasAudioCtx) return { supported: false, reason: "No AudioContext" };
  return { supported: true };
}
