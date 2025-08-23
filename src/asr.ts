let asrPipeline: any = null;

export async function getASRPipeline(
  modelId: string,
  onProgress?: (msg: string, pct?: number) => void
): Promise<any> {
  if (asrPipeline) return asrPipeline;

  const { pipeline, env } = await import("@xenova/transformers");

  env.useBrowserCache = true;
  env.allowLocalModels = false;
  if (env.backends?.onnx?.wasm) {
    env.backends.onnx.wasm.proxy = false;
    env.backends.onnx.wasm.numThreads = 1;
    env.backends.onnx.wasm.simd = false;
  }

  asrPipeline = await pipeline("automatic-speech-recognition", modelId, {
    quantized: true,
    progress_callback: (p: any) => {
      if (!onProgress) return;
      const total = p.total ?? 0;
      const loaded = p.loaded ?? 0;
      const pct = total ? Math.round((loaded / total) * 100) : undefined;
      if (p.status) onProgress(`${p.status}…`, pct);
    },
  });

  return asrPipeline;
}
