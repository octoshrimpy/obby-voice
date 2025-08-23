// Do NOT import or export anything else in this file.
// This must be a global declaration, not a module.

declare module "lamejs" {
  // CommonJS export object with a Mp3Encoder class on it
  export class Mp3Encoder {
    constructor(channels: number, sampleRate: number, kbps: number);
    encodeBuffer(buffer: Int16Array | Int16Array[]): Int8Array;
    flush(): Int8Array;
  }

  // For default import compatibility (when esModuleInterop/allowSyntheticDefaultImports are on)
  const _default: {
    Mp3Encoder: typeof Mp3Encoder;
  };
  export default _default;
}
