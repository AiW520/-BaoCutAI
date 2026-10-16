import type { ModelsLocalSpeechMessages } from './local-speech.ts';

export const zhHant: ModelsLocalSpeechMessages = {
  referenceTranscriptRequired: "請填寫參考錄音的原文",
  oneVoiceSource: 'voice、reference 與 voiceDescription 只能指定其中一個',
  modeUnsupported: (p: { modelId: string; what: string; mode: string }) => `模型 ${p.modelId} 不支援${p.what}（${p.mode}）`,
  modeClone: '用參考錄音克隆音色',
  modeDescribe: '依描述建立音色',
  noReferenceTranscript: (p: { modelId: string }) => `模型 ${p.modelId} 不會讀取參考錄音的原文（reference.transcript）`,
  descriptionEmpty: '描述不能為空',
  noPresetVoice: (p: { modelId: string; need: string }) => `模型 ${p.modelId} 沒有內建音色，請指定 ${p.need}`,
  noSuchVoice: (p: { modelId: string; voice: string }) => `模型 ${p.modelId} 沒有音色 ${p.voice}`,
  noDefaultVoice: (p: { modelId: string }) => `模型 ${p.modelId} 沒有預設音色，請指定 voice`,
  termNotInVocabulary: (p: { modelId: string; term: string }) => `模型 ${p.modelId} 的音色描述只接受詞表中的詞：「${p.term}」不在詞表中`,
  onePerCategory: (p: { modelId: string; category: string }) => `模型 ${p.modelId} 的音色描述每一類最多只能有一個詞（${p.category}）`,
  builtinReferenceLabel: '內建音色錄音',
  referenceUnreadable: (p: { name: string }) => `無法讀取參考錄音「${p.name}」：檔案不存在、不是檔案或沒有讀取權限。請換一段錄音再試`,
};
