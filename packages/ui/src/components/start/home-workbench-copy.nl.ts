import { pluralForm } from '@baocut/protocol';
import type { WorkbenchMessages } from './home-workbench-copy.ts';

export const nl: WorkbenchMessages = {
  eyebrow: "OpenFox · Creatieve werkruimte",
  title: "Van idee naar je volgende video.",
  intro: "Beschrijf een idee, voeg media toe of ga verder waar je was gebleven.",
  recentTitle: "Recente projecten",
  recentHint: "Ga verder waar je was gebleven",
  browse: "Alle werken bekijken",
  continueVideo: "Verder bewerken",
  continueSession: "Sessie voortzetten",
  startSession: "Sessie starten",
  empty: "Maak een project om je video’s en creatieve sessies bij elkaar te houden.",
  videos: (n: number) => `${n} ${pluralForm('nl', n, { one: "video", other: "video’s" })}`,
  sessions: (n: number) => `${n} ${pluralForm('nl', n, { one: "sessie", other: "sessies" })}`,
};
