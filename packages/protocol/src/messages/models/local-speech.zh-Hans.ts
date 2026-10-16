import type { ModelsLocalSpeechMessages } from './local-speech.ts';

export const zhHans: ModelsLocalSpeechMessages = {
  cpuNote: (p: { pace: string }) => `在本机的 CPU 上合成，比用显卡慢得多：${p.pace}`,
  paceOmnivoice: '耗时约为音频长度的 9 倍，10 秒的一句要一分半钟左右',
  paceDefault: '这个模型在 CPU 上的速度还没有实测',
  referenceTranscriptRequired: "请填写参考录音的原文",
  oneVoiceSource: 'voice、reference 与 voiceDescription 只能给一个',
  modeUnsupported: (p: { modelId: string; what: string; mode: string }) => `模型 ${p.modelId} 不支持${p.what}（${p.mode}）`,
  modeClone: '用参考录音克隆',
  modeDescribe: '按描述造声',
  noReferenceTranscript: (p: { modelId: string }) => `模型 ${p.modelId} 不读参考录音的原文（reference.transcript）`,
  descriptionEmpty: '描述不能为空',
  noPresetVoice: (p: { modelId: string; need: string }) => `模型 ${p.modelId} 没有预设音色，请给出 ${p.need}`,
  noSuchVoice: (p: { modelId: string; voice: string }) => `模型 ${p.modelId} 没有音色 ${p.voice}`,
  noDefaultVoice: (p: { modelId: string }) => `模型 ${p.modelId} 没有默认音色，请指定 voice`,
  termNotInVocabulary: (p: { modelId: string; term: string }) => `模型 ${p.modelId} 的声音描述只接受词表里的词：「${p.term}」不在词表里`,
  onePerCategory: (p: { modelId: string; category: string }) => `模型 ${p.modelId} 的声音描述每类至多一项（${p.category}）`,
  builtinReferenceLabel: '内置音色录音',
  referenceUnreadable: (p: { name: string }) => `参考录音「${p.name}」读不出来：文件不在、不是文件或没有读取权限，换一段录音再试`,
};
