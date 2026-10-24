import { pluralForm } from '@baocut/protocol';
import type { WorkbenchMessages } from './home-workbench-copy.ts';

export const fr: WorkbenchMessages = {
  eyebrow: "OpenFox · Espace créatif",
  title: "Une idée, votre prochaine vidéo.",
  intro: "Décrivez une idée, ajoutez vos médias ou reprenez votre travail.",
  recentTitle: "Projets récents",
  recentHint: "Reprenez là où vous en étiez",
  browse: "Voir toutes les créations",
  continueVideo: "Continuer le montage",
  continueSession: "Reprendre la session",
  startSession: "Démarrer une session",
  empty: "Créez un projet pour regrouper vos vidéos et sessions créatives.",
  videos: (n: number) => `${n} ${pluralForm('fr', n, { one: "vidéo", other: "vidéos" })}`,
  sessions: (n: number) => `${n} ${pluralForm('fr', n, { one: "session", other: "sessions" })}`,
};
