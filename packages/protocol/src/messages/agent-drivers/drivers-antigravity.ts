import { defineCatalog } from '../../message-ref.ts';
import { zhHans } from './drivers-antigravity.zh-Hans.ts';
import { zhHant } from './drivers-antigravity.zh-Hant.ts';
import { ja } from './drivers-antigravity.ja.ts';
import { ko } from './drivers-antigravity.ko.ts';
import { es } from './drivers-antigravity.es.ts';
import { fr } from './drivers-antigravity.fr.ts';
import { de } from './drivers-antigravity.de.ts';
import { nl } from './drivers-antigravity.nl.ts';
import { ptBR } from './drivers-antigravity.pt-BR.ts';
import { it } from './drivers-antigravity.it.ts';
import { ru } from './drivers-antigravity.ru.ts';
import { pl } from './drivers-antigravity.pl.ts';
import { tr } from './drivers-antigravity.tr.ts';
import { vi } from './drivers-antigravity.vi.ts';

const en = {
  invalidOutput: "Antigravity returned invalid stream data",
  invalidModels: "Antigravity returned an invalid model list",
  resumeMismatch: "Antigravity restored a different conversation",
  mcpUnavailable: "Antigravity cannot receive BaoCut’s temporary MCP configuration. BaoCut’s tools are unavailable in this session.",
  effortUnsupported: "Antigravity selects reasoning effort through the model ID; choose a model instead",
  turnFailed: "Antigravity turn failed",
  denied: (p: { actions: string }) => `Antigravity denied these actions under its own policy: ${p.actions}`,
  fullAccessOnly: (p: { mode: string }) =>
    `Antigravity has no way to ask before each action, so BaoCut can only run it in "${p.mode}" mode: it won't ask you before running commands or changing files.`,
};

export type DriversAntigravityMessages = typeof en;
export const DriversAntigravity = defineCatalog('driversAntigravity', en, { 'zh-Hans': zhHans, 'zh-Hant': zhHant, ja, ko, es, fr, de, nl, 'pt-BR': ptBR, it, ru, pl, tr, vi });
