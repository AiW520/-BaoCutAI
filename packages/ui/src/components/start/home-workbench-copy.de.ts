import { pluralForm } from '@baocut/protocol';
import type { WorkbenchMessages } from './home-workbench-copy.ts';

export const de: WorkbenchMessages = {
  eyebrow: "Tuzi · Kreativbereich",
  title: "Aus einer Idee wird dein nächstes Video.",
  intro: "Beschreibe eine Idee, füge Medien hinzu oder setze deine Arbeit fort.",
  recentTitle: "Letzte Projekte",
  recentHint: "Dort weitermachen, wo du aufgehört hast",
  browse: "Alle Arbeiten ansehen",
  continueVideo: "Weiter bearbeiten",
  continueSession: "Sitzung fortsetzen",
  startSession: "Sitzung starten",
  empty: "Erstelle ein Projekt, um Videos und kreative Sitzungen zusammenzuhalten.",
  videos: (n: number) => `${n} ${pluralForm('de', n, { one: "Video", other: "Videos" })}`,
  sessions: (n: number) => `${n} ${pluralForm('de', n, { one: "Sitzung", other: "Sitzungen" })}`,
};
