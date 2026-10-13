import type { DriversAntigravityMessages } from './drivers-antigravity.ts';

export const zhHans: DriversAntigravityMessages = {
  invalidOutput: "Antigravity 返回了无效的流式数据",
  invalidModels: "Antigravity 返回的模型列表无效",
  resumeMismatch: "Antigravity 恢复了另一条会话",
  mcpUnavailable: "Antigravity 无法接收 BaoCut 的临时 MCP 配置，这条会话里用不了 BaoCut 的工具。",
  effortUnsupported: "Antigravity 通过模型 ID 选择推理强度，请改选模型",
  turnFailed: "Antigravity 本轮运行失败",
  denied: (p) => `Antigravity 的原生策略拒绝了这些操作: ${p.actions}`,
  fullAccessOnly: (p) => `Antigravity 没有逐次询问的通道，BaoCut 只能让它在「${p.mode}」模式下运行：执行命令和修改文件之前不会先问你。`,
};
