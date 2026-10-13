import type { RcSemanticMessages } from './rc-semantic.ts';

export const ja: RcSemanticMessages = {
  modelNotInstalled: '意味検索にはテキスト検索モデルが必要です。設定 › 意味インデックス でインストールしてください',
  modelUnavailable: 'テキスト検索モデルを実行できませんでした',
  profileIncompatible: '意味インデックスは別のモデルで作成されているため、再作成が必要です',
  inputTooLong: (p) => `検索語が長すぎます（${p.max} 文字を超えています）`,
  sourceMissing: 'この結果の元のデータはもうありません',
  indexNotReady: '意味インデックスはまだ準備できていません。設定 › 意味インデックス で作成してください',
  indexPartial: '意味インデックスはこの範囲の一部しかカバーしていないため、結果が不完全な可能性があります',
  staleRevision: 'この結果が見つかった後に動画が変更されました',
  cursorStale: '結果が変わりました。もう一度検索してください',
  searchCancelled: '検索はキャンセルされました',
  resourceExhausted: '現在メモリまたは計算資源が足りず、検索モデルを実行できません',
  appearanceUnavailable: '完成した動画の見た目の検索はまだ利用できません',
  channelUnavailable: '映像と音の検索はまだ利用できません',
  storeUnavailable: '意味インデックスを開けませんでした',
  hitInvalid: 'この結果が見つかりません。もう一度検索してください',
  needsTextChannel: '発話内容を選んでください。現在検索できるのは発話内容のみです',
};
