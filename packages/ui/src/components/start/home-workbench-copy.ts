import { defineMessages, pluralForm } from '@baocut/protocol';
import { zhHans } from './home-workbench-copy.zh-Hans.ts';
import { zhHant } from './home-workbench-copy.zh-Hant.ts';
import { ja } from './home-workbench-copy.ja.ts';
import { ko } from './home-workbench-copy.ko.ts';
import { es } from './home-workbench-copy.es.ts';
import { fr } from './home-workbench-copy.fr.ts';
import { de } from './home-workbench-copy.de.ts';
import { nl } from './home-workbench-copy.nl.ts';
import { ptBR } from './home-workbench-copy.pt-BR.ts';
import { it } from './home-workbench-copy.it.ts';
import { ru } from './home-workbench-copy.ru.ts';
import { pl } from './home-workbench-copy.pl.ts';
import { tr } from './home-workbench-copy.tr.ts';
import { vi } from './home-workbench-copy.vi.ts';

const en = {
  eyebrow: "OpenFox · Creative workspace",
  title: "Turn an idea into your next video.",
  intro: "Describe an idea, add your media, or pick up where you left off.",
  recentTitle: "Recent projects",
  recentHint: "Continue where you left off",
  browse: "Browse all work",
  continueVideo: "Continue editing",
  continueSession: "Continue session",
  startSession: "Start session",
  empty: "Create a project to keep your videos and creative sessions together.",
  videos: (n: number) => `${n} ${pluralForm('en', n, { one: "video", other: "videos" })}`,
  sessions: (n: number) => `${n} ${pluralForm('en', n, { one: "session", other: "sessions" })}`,
};
export type WorkbenchMessages = typeof en;
export const W = defineMessages(en, { 'zh-Hans': zhHans, 'zh-Hant': zhHant, 'ja': ja, 'ko': ko, 'es': es, 'fr': fr, 'de': de, 'nl': nl, 'pt-BR': ptBR, 'it': it, 'ru': ru, 'pl': pl, 'tr': tr, 'vi': vi });
