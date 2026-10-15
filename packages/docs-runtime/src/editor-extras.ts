import { renderToString } from 'katex';
import KATEX_CSS from 'virtual:katex-css';
import { nameToEmoji } from './emoji-data';

/** Standalone child-frame payload, built as an IIFE by the Vite asset plugin. */
export function installEditorExtras(target: typeof globalThis): void {
  (target as typeof globalThis & { __lfileRuntimeExtras?: unknown }).__lfileRuntimeExtras = {
    katex: { renderToString },
    KATEX_CSS,
    nameToEmoji,
  };
}

installEditorExtras(globalThis);
