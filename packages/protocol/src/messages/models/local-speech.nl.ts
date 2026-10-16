import type { ModelsLocalSpeechMessages } from './local-speech.ts';

export const nl: ModelsLocalSpeechMessages = {
  referenceTranscriptRequired: "Voer het transcript van de referentieopname in",
  oneVoiceSource: "Geef alleen voice, reference of voiceDescription op",
  modeUnsupported: (p: { modelId: string; what: string; mode: string }) => `Model ${p.modelId} ondersteunt niet ${p.what} (${p.mode})`,
  modeClone: "klonen vanuit een referentieopname",
  modeDescribe: "een stem maken vanuit een beschrijving",
  noReferenceTranscript: (p: { modelId: string }) => `Model ${p.modelId} leest het transcript van de referentieopname niet (reference.transcript)`,
  descriptionEmpty: "De beschrijving mag niet leeg zijn",
  noPresetVoice: (p: { modelId: string; need: string }) => `Model ${p.modelId} heeft geen vooringestelde stemmen; geef op: ${p.need}`,
  noSuchVoice: (p: { modelId: string; voice: string }) => `Model ${p.modelId} heeft geen stem ${p.voice}`,
  noDefaultVoice: (p: { modelId: string }) => `Model ${p.modelId} heeft geen standaardstem; geef voice op`,
  termNotInVocabulary: (p: { modelId: string; term: string }) => `Stembeschrijvingen voor model ${p.modelId} accepteren alleen woorden uit de woordenschat: ‘${p.term}’ staat er niet in`,
  onePerCategory: (p: { modelId: string; category: string }) => `Stembeschrijvingen voor model ${p.modelId} accepteren maximaal één term per categorie (${p.category})`,
  builtinReferenceLabel: "ingebouwde stemopname",
  referenceUnreadable: (p: { name: string }) => `Kan de referentieopname niet lezen: ‘${p.name}’: ontbreekt, is geen bestand of is niet leesbaar. Probeer een andere opname`,
};
