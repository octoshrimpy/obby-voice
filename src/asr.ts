// src/asr.ts
let asrPipeline: any = null;
let asrModelId: string | null = null;
let inflight: Promise<any> | null = null;
let wasmBasePath: string | null = null;
let transformersPath: string | null = null;

/** Call this once on plugin load with the vault resource URL for vendor/wasm/. */
export function setWasmPath(basePath: string) {
  wasmBasePath = basePath;
}

/**
 * Call this once on plugin load with the vault resource URL for vendor/transformers.min.js.
 * Using a runtime URL prevents esbuild from re-bundling @xenova/transformers, which
 * breaks onnxruntime-web's internal InferenceSession initialization.
 */
export function setTransformersPath(url: string) {
  transformersPath = url;
}

/** Quick health check: is the pipeline callable & can it run a tiny inference? */
async function verifyASRReady(
  pipe: any,
  modelId: string,
  onProgress?: (msg: string, pct?: number) => void
): Promise<void> {
  if (typeof pipe !== "function" || !(pipe as any)?.model) {
    throw new Error(`ASR pipeline for "${modelId}" did not initialize correctly.`);
  }
  try {
    onProgress?.("Warming up Whisper…");
    const sr = 16000;
    const silence = new Float32Array(Math.floor(sr * 0.08)); // ~80ms
    await pipe(silence, { sampling_rate: sr, chunk_length_s: 0.1, return_timestamps: false });
  } catch (err: any) {
    throw new Error(`ASR warm-up failed: ${err?.message ?? String(err)}`);
  }
}

export async function getASRPipeline(
  modelId: string,
  onProgress?: (msg: string, pct?: number) => void
): Promise<any> {
  if (asrPipeline && asrModelId === modelId) return asrPipeline;
  if (inflight) return inflight;

  inflight = (async () => {
    // Load from the vendored pre-built file via runtime URL.
    const url = transformersPath;
    if (!url) throw new Error("Transformers path not set — call setTransformersPath() on plugin load.");

    // CRITICAL: Hide Node.js `process` global during import().
    //
    // @xenova/transformers' backends/onnx.js checks:
    //   if (typeof process !== 'undefined' && process?.release?.name === 'node')
    // In Electron, this is TRUE → it selects onnxruntime-node, which is
    // excluded from the webpack bundle (empty stub).  Result:
    //   ONNX = {} → ONNX.InferenceSession = undefined → .create() explodes.
    //
    // By hiding `process`, the check fails → browser branch runs →
    // ONNX = onnxruntime-web (bundled & functional).
    const _proc = (globalThis as any).process;
    delete (globalThis as any).process;
    let pipeline: any, env: any;
    try {
      ({ pipeline, env } = await import(url as any));
    } finally {
      (globalThis as any).process = _proc;
    }

    // Cache in browser storage/IDB; load from HF
    env.useBrowserCache = true;
    env.allowLocalModels = false;

    // Patch WASM config on the existing object (ort captures the reference
    // at load time — replacing the object is silently ignored).
    try {
      const onnxEnv: any = env.backends?.onnx;
      if (onnxEnv) {
        const w = onnxEnv.wasm ?? {};
        if (!onnxEnv.wasm) onnxEnv.wasm = w;
        w.numThreads = 1;
        w.simd       = true;
        if (wasmBasePath) w.wasmPaths = wasmBasePath;
        console.debug("[Obby Voice] ort wasm config:", JSON.stringify({
          numThreads: w.numThreads,
          simd: w.simd,
          wasmPaths: w.wasmPaths,
        }));
      }
    } catch {
      /* let library defaults apply if shape changes */
    }

    try {
      const pipe = await pipeline("automatic-speech-recognition", modelId, {
        quantized: true, // use the quantized ONNX models (e.g., Xenova/whisper-tiny.en)
        progress_callback: (p: any) => {
          if (!onProgress) return;
          const total = p.total ?? 0;
          const loaded = p.loaded ?? 0;
          const pct = total ? Math.round((loaded / total) * 100) : undefined;
          if (p.status) onProgress(`${p.status}…`, pct);
        },
      });

      await verifyASRReady(pipe, modelId, onProgress);
      asrPipeline = pipe;
      asrModelId = modelId;
      return pipe;
    } catch (err) {
      asrPipeline = null;
      asrModelId = null;
      throw err;
    }
  })();

  try {
    return await inflight;
  } finally {
    inflight = null;
  }
}

export async function transcribePCM16k(
  pcm16k: Float32Array,
  modelId: string,
  onProgress?: (msg: string, pct?: number) => void
): Promise<string> {
  if (!(pcm16k instanceof Float32Array)) {
    throw new Error("transcribePCM16k expects a Float32Array of mono PCM at 16 kHz.");
  }
  const asr = await getASRPipeline(modelId, onProgress);
  const out = await asr(pcm16k, { sampling_rate: 16000 });
  return (out?.text || "").trim();
}
