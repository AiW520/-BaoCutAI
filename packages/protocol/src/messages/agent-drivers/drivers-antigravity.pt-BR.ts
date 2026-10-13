import type { DriversAntigravityMessages } from './drivers-antigravity.ts';

export const ptBR: DriversAntigravityMessages = {
  invalidOutput: "Antigravity retornou dados de fluxo inválidos",
  invalidModels: "Antigravity retornou uma lista de modelos inválida",
  resumeMismatch: "Antigravity restaurou outra conversa",
  mcpUnavailable: "Antigravity não pode receber a configuração MCP temporária do BaoCut. As ferramentas do BaoCut não estão disponíveis nesta sessão.",
  effortUnsupported: "Antigravity escolhe o esforço de raciocínio pelo ID do modelo; selecione um modelo",
  turnFailed: "O turno do Antigravity falhou",
  denied: (p) => `A política própria do Antigravity recusou estas ações: ${p.actions}`,
  fullAccessOnly: (p) => `Antigravity não tem como perguntar antes de cada ação, então o BaoCut só pode executá-lo no modo “${p.mode}”: não perguntará antes de executar comandos ou alterar arquivos.`,
};
