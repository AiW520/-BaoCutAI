import type { DriversAntigravityMessages } from './drivers-antigravity.ts';

export const ja: DriversAntigravityMessages = {
  invalidOutput: "Antigravity が無効なストリームデータを返しました",
  invalidModels: "Antigravity のモデル一覧が無効です",
  resumeMismatch: "Antigravity が別の会話を復元しました",
  mcpUnavailable: "Antigravity は BaoCut の一時的な MCP 設定を受け取れません。この会話では BaoCut のツールを使用できません。",
  effortUnsupported: "Antigravity の推論強度はモデル ID で選択します。モデルを選び直してください",
  turnFailed: "Antigravity のターンが失敗しました",
  denied: (p) => `Antigravity のポリシーにより次の操作が拒否されました: ${p.actions}`,
  fullAccessOnly: (p) =>
    `Antigravity には操作ごとに確認する仕組みがないため、BaoCut は「${p.mode}」モードでしか実行できません。コマンドの実行やファイルの変更の前に確認はありません。`,
};
