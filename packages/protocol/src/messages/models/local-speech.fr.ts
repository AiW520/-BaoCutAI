import type { ModelsLocalSpeechMessages } from './local-speech.ts';

export const fr: ModelsLocalSpeechMessages = {
  referenceTranscriptRequired: "Saisissez la transcription de l’enregistrement de référence",
  paceQwen06: "environ 7 fois plus lent que le temps réel ; une phrase de 10 secondes prend donc un peu plus d’une minute",
  paceQwen17: "estimé plus lent que le 0.6B (environ 7 fois plus lent que le temps réel) ; celui-ci n’a pas été mesuré",
  paceIndexTts2: "30–60 fois plus lent que le temps réel ; une phrase de 10 secondes prend cinq à dix minutes",
  paceIndexTts25: "estimé similaire à IndexTTS2 (30–60 fois plus lent que le temps réel) ; celui-ci n’a pas été mesuré",
  paceDefault: "sa vitesse n’a pas été mesurée",
  cpuNote: (p: { pace: string }) => `Synthétise sur le CPU de cet ordinateur avec quelques cœurs seulement : ${p.pace}. Bien plus rapide avec un GPU NVIDIA (CUDA) : à peu près en temps réel sur une RTX 3060`,
  oneVoiceSource: "Indiquez un seul choix parmi voice, reference et voiceDescription",
  modeUnsupported: (p: { modelId: string; what: string; mode: string }) => `Le modèle ${p.modelId} ne prend pas en charge ${p.what} (${p.mode})`,
  modeClone: "le clonage depuis un enregistrement de référence",
  modeDescribe: "la création d’une voix depuis une description",
  noReferenceTranscript: (p: { modelId: string }) => `Le modèle ${p.modelId} ne lit pas la transcription de l’enregistrement de référence (reference.transcript)`,
  descriptionEmpty: "La description ne peut pas être vide",
  noPresetVoice: (p: { modelId: string; need: string }) => `Le modèle ${p.modelId} n’a aucune voix prédéfinie ; indiquez ${p.need}`,
  noSuchVoice: (p: { modelId: string; voice: string }) => `Le modèle ${p.modelId} n’a aucune voix ${p.voice}`,
  noDefaultVoice: (p: { modelId: string }) => `Le modèle ${p.modelId} n’a aucune voix par défaut ; indiquez voice`,
  termNotInVocabulary: (p: { modelId: string; term: string }) => `Les descriptions de voix du modèle ${p.modelId} acceptent seulement les mots de son vocabulaire : « ${p.term} » n’en fait pas partie`,
  onePerCategory: (p: { modelId: string; category: string }) => `Les descriptions de voix du modèle ${p.modelId} acceptent au plus un terme par catégorie (${p.category})`,
  builtinReferenceLabel: "enregistrement de voix intégré",
  referenceUnreadable: (p: { name: string }) => `Impossible de lire l’enregistrement de référence « ${p.name} » : absent, pas un fichier ou illisible. Essayez un autre enregistrement`,
};
