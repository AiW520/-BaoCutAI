import type { DriversAntigravityMessages } from './drivers-antigravity.ts';

export const it: DriversAntigravityMessages = {
  invalidOutput: "Antigravity ha restituito dati di flusso non validi",
  invalidModels: "Antigravity ha restituito un elenco di modelli non valido",
  resumeMismatch: "Antigravity ha ripristinato un’altra conversazione",
  mcpUnavailable: "Antigravity non può ricevere la configurazione MCP temporanea di BaoCut. Gli strumenti di BaoCut non sono disponibili in questa sessione.",
  effortUnsupported: "Antigravity sceglie lo sforzo di ragionamento tramite l’ID del modello; seleziona un modello",
  turnFailed: "Il turno di Antigravity non è riuscito",
  denied: (p) => `La politica di Antigravity ha negato queste azioni: ${p.actions}`,
  fullAccessOnly: (p) => `Antigravity non ha modo di chiedere prima di ogni azione, quindi BaoCut può eseguirlo solo in modalità «${p.mode}»: non chiederà prima di eseguire comandi o modificare file.`,
};
