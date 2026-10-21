import { pluralForm } from '@baocut/protocol';
import type { WorkbenchMessages } from './home-workbench-copy.ts';

export const it: WorkbenchMessages = {
  eyebrow: "Tuzi · Spazio creativo",
  title: "Da un’idea al tuo prossimo video.",
  intro: "Descrivi un’idea, aggiungi contenuti o riprendi il lavoro.",
  recentTitle: "Progetti recenti",
  recentHint: "Riprendi da dove eri rimasto",
  browse: "Tutti i lavori",
  continueVideo: "Continua a modificare",
  continueSession: "Continua sessione",
  startSession: "Avvia sessione",
  empty: "Crea un progetto per riunire video e sessioni creative.",
  videos: (n: number) => `${n} ${pluralForm('it', n, { one: "video", other: "video" })}`,
  sessions: (n: number) => `${n} ${pluralForm('it', n, { one: "sessione", other: "sessioni" })}`,
};
