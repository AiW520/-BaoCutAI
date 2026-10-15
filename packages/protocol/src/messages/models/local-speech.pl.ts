import type { ModelsLocalSpeechMessages } from './local-speech.ts';

export const pl: ModelsLocalSpeechMessages = {
  referenceTranscriptRequired: "Wpisz transkrypcję nagrania referencyjnego",
  paceQwen06: "około 7 razy wolniej niż w czasie rzeczywistym: 10-sekundowa wypowiedź zajmuje nieco ponad minutę",
  paceQwen17: "oczekiwana wolniejsza od 0.6B (około 7 razy wolniej niż w czasie rzeczywistym); tej nie zmierzono",
  paceIndexTts2: "30–60 razy wolniej niż w czasie rzeczywistym: 10-sekundowa wypowiedź zajmuje od pięciu do dziesięciu minut",
  paceIndexTts25: "oczekiwana podobna do IndexTTS2 (30–60 razy wolniej niż w czasie rzeczywistym); tej nie zmierzono",
  paceDefault: "szybkości nie zmierzono",
  cpuNote: (p: { pace: string }) => `Synteza na CPU tego komputera, używając tylko kilku rdzeni: ${p.pace}. Z NVIDIA GPU (CUDA) jest znacznie szybciej: na RTX 3060 mniej więcej w czasie rzeczywistym`,
  oneVoiceSource: "Podaj tylko jedną z wartości voice, reference i voiceDescription",
  modeUnsupported: (p: { modelId: string; what: string; mode: string }) => `Model ${p.modelId} nie obsługuje ${p.what} (${p.mode})`,
  modeClone: "klonowania z nagrania referencyjnego",
  modeDescribe: "tworzenia głosu z opisu",
  noReferenceTranscript: (p: { modelId: string }) => `Model ${p.modelId} nie odczytuje transkrypcji nagrania referencyjnego (reference.transcript)`,
  descriptionEmpty: "Opis nie może być pusty",
  noPresetVoice: (p: { modelId: string; need: string }) => `Model ${p.modelId} nie ma gotowych głosów; podaj ${p.need}`,
  noSuchVoice: (p: { modelId: string; voice: string }) => `Model ${p.modelId} nie ma głosu ${p.voice}`,
  noDefaultVoice: (p: { modelId: string }) => `Model ${p.modelId} nie ma domyślnego głosu; podaj voice`,
  termNotInVocabulary: (p: { modelId: string; term: string }) => `Opisy głosów modelu ${p.modelId} przyjmują tylko słowa ze słownika: „${p.term}” w nim nie ma`,
  onePerCategory: (p: { modelId: string; category: string }) => `Opisy głosów modelu ${p.modelId} przyjmują najwyżej jeden termin na kategorię (${p.category})`,
  builtinReferenceLabel: "nagranie wbudowanego głosu",
  referenceUnreadable: (p: { name: string }) => `Nie można odczytać nagrania referencyjnego „${p.name}”: nie istnieje, nie jest plikiem lub jest nieczytelne. Spróbuj innego nagrania`,
};
