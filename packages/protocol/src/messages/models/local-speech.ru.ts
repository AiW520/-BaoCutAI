import type { ModelsLocalSpeechMessages } from './local-speech.ts';

export const ru: ModelsLocalSpeechMessages = {
  cpuNote: (p: { pace: string }) => `Синтез на CPU этого компьютера, намного медленнее, чем на GPU: ${p.pace}`,
  paceOmnivoice: 'занимает примерно в 9 раз больше времени, чем длится аудио: фраза на 10 секунд — около полутора минут',
  paceDefault: 'скорость на CPU ещё не измерена',
  referenceTranscriptRequired: "Введите расшифровку эталонной записи",
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
