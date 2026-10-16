import type { ModelsLocalSpeechMessages } from './local-speech.ts';

export const ko: ModelsLocalSpeechMessages = {
  referenceTranscriptRequired: "참조 녹음의 원문을 입력하세요",
  oneVoiceSource: 'voice, reference, voiceDescription 중 하나만 지정하세요',
  modeUnsupported: (p: { modelId: string; what: string; mode: string }) =>
    `${p.modelId} 모델은 ${p.what} 기능(${p.mode})을 지원하지 않습니다`,
  modeClone: '참조 녹음으로 복제',
  modeDescribe: '설명으로 목소리 만들기',
  noReferenceTranscript: (p: { modelId: string }) =>
    `${p.modelId} 모델은 참조 녹음의 전사본(reference.transcript)을 읽지 않습니다`,
  descriptionEmpty: '설명은 비워 둘 수 없습니다',
  noPresetVoice: (p: { modelId: string; need: string }) => `${p.modelId} 모델에는 프리셋 목소리가 없습니다. ${p.need} 항목을 지정하세요`,
  noSuchVoice: (p: { modelId: string; voice: string }) => `${p.modelId} 모델에는 ${p.voice} 목소리가 없습니다`,
  noDefaultVoice: (p: { modelId: string }) => `${p.modelId} 모델에는 기본 목소리가 없습니다. voice를 지정하세요`,
  termNotInVocabulary: (p: { modelId: string; term: string }) =>
    `${p.modelId} 모델의 목소리 설명에는 해당 어휘의 단어만 쓸 수 있습니다: “${p.term}” 단어는 어휘에 없습니다`,
  onePerCategory: (p: { modelId: string; category: string }) =>
    `${p.modelId} 모델의 목소리 설명에는 범주마다 용어를 하나만 쓸 수 있습니다(${p.category})`,
  builtinReferenceLabel: '기본 제공 목소리 녹음',
  referenceUnreadable: (p: { name: string }) =>
    `“${p.name}” 참조 녹음을 읽을 수 없습니다: 없거나, 파일이 아니거나, 읽을 수 없는 상태입니다. 다른 녹음을 사용해 보세요`,
};
