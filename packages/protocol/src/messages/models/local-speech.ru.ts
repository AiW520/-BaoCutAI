import type { ModelsLocalSpeechMessages } from './local-speech.ts';

export const ru: ModelsLocalSpeechMessages = {
  referenceTranscriptRequired: "Введите расшифровку эталонной записи",
  paceQwen06: "примерно в 7 раз медленнее реального времени: фраза на 10 секунд занимает чуть больше минуты",
  paceQwen17: "ожидается медленнее 0.6B (примерно в 7 раз медленнее реального времени); эта модель не измерена",
  paceIndexTts2: "в 30–60 раз медленнее реального времени: фраза на 10 секунд занимает от пяти до десяти минут",
  paceIndexTts25: "ожидается примерно как IndexTTS2 (в 30–60 раз медленнее реального времени); эта модель не измерена",
  paceDefault: "скорость не измерена",
  cpuNote: (p: { pace: string }) => `Синтез на CPU этого компьютера с использованием лишь нескольких ядер: ${p.pace}. С NVIDIA GPU (CUDA) гораздо быстрее: на RTX 3060 примерно в реальном времени`,
  oneVoiceSource: "Укажите только одно из voice, reference и voiceDescription",
  modeUnsupported: (p: { modelId: string; what: string; mode: string }) => `Модель ${p.modelId} не поддерживает ${p.what} (${p.mode})`,
  modeClone: "клонирование по эталонной записи",
  modeDescribe: "создание голоса по описанию",
  noReferenceTranscript: (p: { modelId: string }) => `Модель ${p.modelId} не читает расшифровку эталонной записи (reference.transcript)`,
  descriptionEmpty: "Описание не может быть пустым",
  noPresetVoice: (p: { modelId: string; need: string }) => `Модель ${p.modelId} не имеет готовых голосов; укажите ${p.need}`,
  noSuchVoice: (p: { modelId: string; voice: string }) => `Модель ${p.modelId} не имеет голоса ${p.voice}`,
  noDefaultVoice: (p: { modelId: string }) => `Модель ${p.modelId} не имеет голоса по умолчанию; укажите voice`,
  termNotInVocabulary: (p: { modelId: string; term: string }) => `Описания голосов модели ${p.modelId} принимают только слова из словаря: «${p.term}» в нём нет`,
  onePerCategory: (p: { modelId: string; category: string }) => `Описания голосов модели ${p.modelId} принимают не более одного термина на категорию (${p.category})`,
  builtinReferenceLabel: "запись встроенного голоса",
  referenceUnreadable: (p: { name: string }) => `Не удалось прочитать эталонную запись «${p.name}»: отсутствует, не файл или недоступна для чтения. Попробуйте другую запись`,
};
