import type { ModelsLocalSpeechMessages } from './local-speech.ts';

export const it: ModelsLocalSpeechMessages = {
  cpuNote: (p: { pace: string }) => `Sintetizza sulla CPU di questo computer, molto più lentamente che su una GPU: ${p.pace}`,
  paceOmnivoice: 'richiede circa 9 volte la durata dell’audio; una frase di 10 secondi richiede circa un minuto e mezzo',
  paceDefault: 'la velocità sulla CPU non è ancora stata misurata',
  referenceTranscriptRequired: "Inserisci la trascrizione della registrazione di riferimento",
  oneVoiceSource: 'Indica solo uno tra voice, reference e voiceDescription',
  modeUnsupported: (p) => `Il modello ${p.modelId} non supporta ${p.what} (${p.mode})`,
  modeClone: 'clonazione da una registrazione di riferimento', modeDescribe: 'creazione di una voce da una descrizione',
  noReferenceTranscript: (p) => `Il modello ${p.modelId} non legge la trascrizione della registrazione di riferimento (reference.transcript)`,
  descriptionEmpty: 'La descrizione non può essere vuota',
  noPresetVoice: (p) => `Il modello ${p.modelId} non ha voci preset; indica ${p.need}`,
  noSuchVoice: (p) => `Il modello ${p.modelId} non ha la voce ${p.voice}`, noDefaultVoice: (p) => `Il modello ${p.modelId} non ha una voce predefinita; specifica voice`,
  termNotInVocabulary: (p) => `Le descrizioni vocali del modello ${p.modelId} accettano solo parole del suo vocabolario: «${p.term}» non è presente`,
  onePerCategory: (p) => `Le descrizioni vocali del modello ${p.modelId} accettano al massimo un termine per categoria (${p.category})`,
  builtinReferenceLabel: 'registrazione della voce integrata',
  referenceUnreadable: (p) => `Impossibile leggere la registrazione di riferimento «${p.name}»: manca, non è un file o non è leggibile. Prova un’altra registrazione`,
};
