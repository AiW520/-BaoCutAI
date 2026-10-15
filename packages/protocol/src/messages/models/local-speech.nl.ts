import type { ModelsLocalSpeechMessages } from './local-speech.ts';

export const nl: ModelsLocalSpeechMessages = {
  referenceTranscriptRequired: "Voer het transcript van de referentieopname in",
  paceQwen06: "ongeveer 7 keer langzamer dan realtime, dus een zin van 10 seconden duurt iets meer dan een minuut",
  paceQwen17: "naar verwachting langzamer dan 0.6B (ongeveer 7 keer langzamer dan realtime); dit model is nog niet gemeten",
  paceIndexTts2: "30–60 keer langzamer dan realtime, dus een zin van 10 seconden duurt vijf tot tien minuten",
  paceIndexTts25: "naar verwachting ongeveer gelijk aan IndexTTS2 (30–60 keer langzamer dan realtime); dit model is nog niet gemeten",
  paceDefault: "de snelheid is nog niet gemeten",
  cpuNote: (p: { pace: string }) => `Synthetiseert op de CPU van deze computer met slechts een paar kernen: ${p.pace}. Met een NVIDIA-GPU (CUDA) gaat het veel sneller, op een RTX 3060 ongeveer in realtime`,
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
