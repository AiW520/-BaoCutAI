import { defineCatalog } from '../../message-ref.ts';
import { zhHans } from './rc-semantic.zh-Hans.ts';
import { zhHant } from './rc-semantic.zh-Hant.ts';
import { ja } from './rc-semantic.ja.ts';
import { ko } from './rc-semantic.ko.ts';
import { es } from './rc-semantic.es.ts';
import { fr } from './rc-semantic.fr.ts';
import { de } from './rc-semantic.de.ts';
import { nl } from './rc-semantic.nl.ts';
import { ptBR } from './rc-semantic.pt-BR.ts';
import { it } from './rc-semantic.it.ts';
import { ru } from './rc-semantic.ru.ts';
import { pl } from './rc-semantic.pl.ts';
import { tr } from './rc-semantic.tr.ts';
import { vi } from './rc-semantic.vi.ts';

/**
 * 本机语义检索（space/semantic/、search-service、search-hit-resolver）给人看的说明：`RpcError` 的文字。原因码
 * （`details.reason`，`SemanticReason`）是稳定的英文标识，不在这里。英文是键与类型的来源，译文在 `rc-semantic.<语言>.ts`。
 */
const en = {
  modelNotInstalled: 'Semantic search needs the text search model. Install it in Settings › Semantic index',
  modelUnavailable: 'The text search model couldn\'t run',
  profileIncompatible: 'The semantic index was built with a different model and needs to be rebuilt',
  inputTooLong: (p: { max: number }) => `The query is too long (more than ${p.max} characters)`,
  sourceMissing: 'The source of this result is gone',
  indexNotReady: 'The semantic index isn\'t ready yet. Build it in Settings › Semantic index',
  indexPartial: 'The semantic index covers only part of this scope; results may be incomplete',
  staleRevision: 'The video changed after this result was found',
  cursorStale: 'The results changed. Search again',
  searchCancelled: 'The search was canceled',
  resourceExhausted: 'Not enough memory or compute to run the search model right now',
  appearanceUnavailable: 'Searching what the finished video looks like isn\'t available yet',
  channelUnavailable: 'Searching visuals and sounds isn\'t available yet',
  storeUnavailable: 'The semantic index couldn\'t be opened',
  hitInvalid: 'This result can\'t be found. Search again',
  needsTextChannel: 'Choose the speech channel: only speech is searchable for now',
};

export type RcSemanticMessages = typeof en;

export const RcSemantic = defineCatalog('rcSemantic', en, { 'zh-Hans': zhHans, 'zh-Hant': zhHant, ja, ko, es, fr, de, nl, 'pt-BR': ptBR, it, ru, pl, tr, vi });
