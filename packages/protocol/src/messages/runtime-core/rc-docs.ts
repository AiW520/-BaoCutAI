import { defineCatalog } from '../../message-ref.ts';
import { zhHans } from './rc-docs.zh-Hans.ts';
import { zhHant } from './rc-docs.zh-Hant.ts';
import { ja } from './rc-docs.ja.ts';
import { ko } from './rc-docs.ko.ts';
import { es } from './rc-docs.es.ts';
import { fr } from './rc-docs.fr.ts';
import { de } from './rc-docs.de.ts';
import { nl } from './rc-docs.nl.ts';
import { ptBR } from './rc-docs.pt-BR.ts';
import { it } from './rc-docs.it.ts';
import { ru } from './rc-docs.ru.ts';
import { pl } from './rc-docs.pl.ts';
import { tr } from './rc-docs.tr.ts';
import { vi } from './rc-docs.vi.ts';

/** 会话里的文档（docs/design/docs）。英文是键与类型的来源，译文在 `rc-docs.<语言>.ts`。 */
const en = {
  notADoc: "This folder isn't a doc: it has no valid doc.json",
};

export type RcDocsMessages = typeof en;

export const RcDocs = defineCatalog('rcDocs', en, { 'zh-Hans': zhHans, 'zh-Hant': zhHant, ja, ko, es, fr, de, nl, 'pt-BR': ptBR, it, ru, pl, tr, vi });
