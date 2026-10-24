import { pluralForm } from '@baocut/protocol';
import type { WorkbenchMessages } from './home-workbench-copy.ts';

export const pl: WorkbenchMessages = {
  eyebrow: "OpenFox · Przestrzeń twórcza",
  title: "Zamień pomysł w kolejny film.",
  intro: "Opisz pomysł, dodaj materiały lub wróć do swojej pracy.",
  recentTitle: "Ostatnie projekty",
  recentHint: "Kontynuuj od miejsca, w którym przerwano",
  browse: "Wszystkie prace",
  continueVideo: "Kontynuuj montaż",
  continueSession: "Kontynuuj sesję",
  startSession: "Rozpocznij sesję",
  empty: "Utwórz projekt, aby zebrać filmy i sesje twórcze w jednym miejscu.",
  videos: (n: number) => `${n} ${pluralForm('pl', n, { one: "film", few: "filmy", other: "filmów" })}`,
  sessions: (n: number) => `${n} ${pluralForm('pl', n, { one: "sesja", few: "sesje", other: "sesji" })}`,
};
