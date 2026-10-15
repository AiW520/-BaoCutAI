import type { ModelsLocalSpeechMessages } from './local-speech.ts';

export const ja: ModelsLocalSpeechMessages = {
  referenceTranscriptRequired: "参照録音の原文を入力してください",
  paceQwen06: 'リアルタイムの約 7 倍遅く、10 秒の 1 文に 1 分強かかります',
  paceQwen17: '0.6B（リアルタイムの約 7 倍遅い）よりさらに遅いと見込まれます。このモデルは実測していません',
  paceIndexTts2: 'リアルタイムの 30〜60 倍遅く、10 秒の 1 文に 5〜10 分かかります',
  paceIndexTts25: 'IndexTTS2（リアルタイムの 30〜60 倍遅い）と同程度と見込まれます。このモデルは実測していません',
  paceDefault: '速度は実測していません',
  cpuNote: (p: { pace: string }) =>
    `このコンピュータの CPU で合成し、使うのは数コアだけです。${p.pace}。NVIDIA GPU（CUDA）があればはるかに速く、RTX 3060 ではほぼリアルタイムです`,
  oneVoiceSource: 'voice、reference、voiceDescription のうち指定できるのは 1 つだけです',
  modeUnsupported: (p: { modelId: string; what: string; mode: string }) => `モデル ${p.modelId} は ${p.what}（${p.mode}）に対応していません`,
  modeClone: '参照録音からのクローン',
  modeDescribe: '説明からの声の作成',
  noReferenceTranscript: (p: { modelId: string }) => `モデル ${p.modelId} は参照録音の原文（reference.transcript）を読み取りません`,
  descriptionEmpty: '説明を空にすることはできません',
  noPresetVoice: (p: { modelId: string; need: string }) => `モデル ${p.modelId} にはプリセット音声がありません。${p.need} を指定してください`,
  noSuchVoice: (p: { modelId: string; voice: string }) => `モデル ${p.modelId} に声 ${p.voice} はありません`,
  noDefaultVoice: (p: { modelId: string }) => `モデル ${p.modelId} には既定の声がありません。voice を指定してください`,
  termNotInVocabulary: (p: { modelId: string; term: string }) =>
    `モデル ${p.modelId} の声の説明には語彙リストの語しか使えません：「${p.term}」は含まれていません`,
  onePerCategory: (p: { modelId: string; category: string }) => `モデル ${p.modelId} の声の説明は、カテゴリごとに 1 語までです（${p.category}）`,
  builtinReferenceLabel: '内蔵の声の録音',
  referenceUnreadable: (p: { name: string }) =>
    `参照録音「${p.name}」を読み取れません。存在しないか、ファイルではないか、読み取り権限がありません。別の録音で再試行してください`,
};
