declare module 'virtual:editor-extras-source' { const source: string; export default source; }
declare module 'virtual:katex-css' { const css: string; export default css; }
declare module 'virtual:katex-font-css' { const css: string; export default css; }

declare module '@ungap/structured-clone' {
  export interface CloneOptions extends StructuredSerializeOptions {
    json?: boolean;
    lossy?: boolean;
  }
  export type SerializedRecord = [tag: number | string, payload?: unknown];
  export default function clone<Value>(value: Value, options?: StructuredSerializeOptions): Value;
  export default function clone(value: unknown, options: CloneOptions): unknown;
  export function serialize(value: unknown, options?: CloneOptions): SerializedRecord[];
  export function deserialize(records: readonly Readonly<SerializedRecord>[]): unknown;
}
declare module 'use-sync-external-store/shim' {
  export { useSyncExternalStore } from 'react';
}
