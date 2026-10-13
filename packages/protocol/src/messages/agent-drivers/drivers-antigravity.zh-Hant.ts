import type { DriversAntigravityMessages } from './drivers-antigravity.ts';

export const zhHant: DriversAntigravityMessages = {
  invalidOutput: "Antigravity 傳回了無效的串流資料",
  invalidModels: "Antigravity 傳回的模型清單無效",
  resumeMismatch: "Antigravity 恢復了另一個對話",
  mcpUnavailable: "Antigravity 無法接收 BaoCut 的臨時 MCP 設定，這個對話裡無法使用 BaoCut 的工具。",
  effortUnsupported: "Antigravity 透過模型 ID 選擇推理強度，請改選模型",
  turnFailed: "Antigravity 本回合執行失敗",
  denied: (p) => `Antigravity 的原生政策拒絕了這些操作: ${p.actions}`,
  fullAccessOnly: (p) => `Antigravity 無法在每個動作前先詢問，因此 BaoCut 只能讓它在「${p.mode}」模式下執行：執行指令或修改檔案前不會先問你。`,
};
