import { defineMessages } from '@baocut/protocol';
import { zhHans } from './writing-cites-copy.zh-Hans.ts';
import { zhHant } from './writing-cites-copy.zh-Hant.ts';
import { ja } from './writing-cites-copy.ja.ts';
import { ko } from './writing-cites-copy.ko.ts';
import { es } from './writing-cites-copy.es.ts';
import { fr } from './writing-cites-copy.fr.ts';
import { de } from './writing-cites-copy.de.ts';
import { nl } from './writing-cites-copy.nl.ts';
import { ptBR } from './writing-cites-copy.pt-BR.ts';
import { it } from './writing-cites-copy.it.ts';
import { ru } from './writing-cites-copy.ru.ts';
import { pl } from './writing-cites-copy.pl.ts';
import { tr } from './writing-cites-copy.tr.ts';
import { vi } from './writing-cites-copy.vi.ts';

/** 写作结果的出处（ai-tool-cites.tsx）的文案。英文是键与类型的来源，译文在 `writing-cites-copy.<语言>.ts`。 */
const en = {
  statsParas: (n: number, cited: number) => `${n === 1 ? '1 paragraph' : `${n} paragraphs`} · ${cited} with sources`,
  statsInferred: (n: number) => `${n} inferred by the model`,
  statsDropped: (n: number) => (n === 1 ? '1 source dropped: it wasn’t in what was sent' : `${n} sources dropped: they weren’t in what was sent`),
  statsVideos: (n: number) => `sources from ${n} videos`,
  seekHint: 'Click a time to jump there',
  inferred: 'Model inference',
  inferredHint: 'No source for this paragraph: the model inferred it. Check it before publishing.',
  citeAria: (label: string) => `Source ${label}`,
  otherVideo: 'Another video',
  otherVideoNote: (name: string, at: string) => `This source is in “${name}” at ${at}. Open that video to see it.`,
  copyPlain: 'Copy Markdown',
  copyTimecodes: 'Copy with timecodes',
  saved: 'Saved to Space as a document',
  showInSpace: 'Show in Space',
  paraMenu: 'This paragraph',
  paraSources: 'Show sources',
  paraHideSources: 'Hide sources',
  paraRewrite: 'Rewrite this paragraph',
  paraMaterial: 'Rewrite with other material…',
  paraUndo: 'Undo the rewrite',
  figuresNote: 'Illustrations: frames taken at the cited time, not picked by content',
  figureCaption: (clock: string) => `Frame at ${clock}`,
  figureNext: 'Another frame',
  figureDrop: 'Remove',
  rewritten: 'Rewritten',
  materialTitle: 'Rewrite with other material',
  materialLead: 'Tick what this paragraph should be based on. Its current sources are ticked; passages found for its wording are listed below them.',
  materialCited: 'Current sources',
  materialFound: 'Found for this paragraph',
  materialLoading: 'Finding passages…',
  materialFailed: (message: string) => `Couldn’t find passages: ${message}`,
  materialNone: 'Nothing else found.',
  materialUse: (n: number) => `Rewrite with selected (${n})`,
  cancel: 'Cancel',
  retry: 'Retry',
  rewriteFailed: (message: string) => `Couldn’t rewrite the paragraph: ${message}`,
  rewriteUndone: 'Undid the rewrite. The rewritten version is still in Space.',
};

export type WritingCitesMessages = typeof en;
export const WRITING_CITES_COPY = defineMessages(en, { 'zh-Hans': zhHans, 'zh-Hant': zhHant, ja, ko, es, fr, de, nl, 'pt-BR': ptBR, it, ru, pl, tr, vi });
