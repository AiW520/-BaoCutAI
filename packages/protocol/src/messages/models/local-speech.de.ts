import type { ModelsLocalSpeechMessages } from './local-speech.ts';

export const de: ModelsLocalSpeechMessages = {
  cpuNote: (p: { pace: string }) => `Synthetisiert auf der CPU dieses Computers, deutlich langsamer als auf einer GPU: ${p.pace}`,
  paceOmnivoice: 'dauert etwa das 9-Fache der Audiolänge; ein 10-Sekunden-Satz braucht etwa anderthalb Minuten',
  paceDefault: 'die Geschwindigkeit auf der CPU wurde noch nicht gemessen',
  referenceTranscriptRequired: "Gib das Transkript der Referenzaufnahme ein",
  oneVoiceSource: "Nur einen der Werte voice, reference oder voiceDescription angeben",
  modeUnsupported: (p: { modelId: string; what: string; mode: string }) => `Modell ${p.modelId} unterstützt nicht ${p.what} (${p.mode})`,
  modeClone: "Klonen aus einer Referenzaufnahme",
  modeDescribe: "Erstellen einer Stimme aus einer Beschreibung",
  noReferenceTranscript: (p: { modelId: string }) => `Modell ${p.modelId} liest das Transkript der Referenzaufnahme nicht (reference.transcript)`,
  descriptionEmpty: "Die Beschreibung darf nicht leer sein",
  noPresetVoice: (p: { modelId: string; need: string }) => `Modell ${p.modelId} hat keine voreingestellten Stimmen; angeben: ${p.need}`,
  noSuchVoice: (p: { modelId: string; voice: string }) => `Modell ${p.modelId} hat keine Stimme ${p.voice}`,
  noDefaultVoice: (p: { modelId: string }) => `Modell ${p.modelId} hat keine Standardstimme; voice angeben`,
  termNotInVocabulary: (p: { modelId: string; term: string }) => `Stimmbeschreibungen für Modell ${p.modelId} akzeptieren nur Wörter aus dessen Vokabular: „${p.term}“ gehört nicht dazu`,
  onePerCategory: (p: { modelId: string; category: string }) => `Stimmbeschreibungen für Modell ${p.modelId} akzeptieren höchstens einen Begriff pro Kategorie (${p.category})`,
  builtinReferenceLabel: "integrierte Stimmaufnahme",
  referenceUnreadable: (p: { name: string }) => `Referenzaufnahme konnte nicht gelesen werden: „${p.name}“: fehlt, ist keine Datei oder ist nicht lesbar. Eine andere Aufnahme versuchen`,
};
