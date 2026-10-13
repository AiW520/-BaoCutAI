import type { DriversAntigravityMessages } from './drivers-antigravity.ts';

export const fr: DriversAntigravityMessages = {
  invalidOutput: "Antigravity a renvoyé des données de flux invalides",
  invalidModels: "Antigravity a renvoyé une liste de modèles invalide",
  resumeMismatch: "Antigravity a restauré une autre conversation",
  mcpUnavailable: "Antigravity ne peut pas recevoir la configuration MCP temporaire de BaoCut. Les outils de BaoCut sont indisponibles dans cette session.",
  effortUnsupported: "Antigravity choisit l’effort de raisonnement par l’ID du modèle ; sélectionnez un modèle",
  turnFailed: "Le tour Antigravity a échoué",
  denied: (p) => `La politique d’Antigravity a refusé ces actions: ${p.actions}`,
  fullAccessOnly: (p: { mode: string }) =>
    `Antigravity ne peut pas demander avant chaque action ; BaoCut peut seulement l’exécuter en mode « ${p.mode} » : aucune demande avant les commandes ou les modifications de fichiers.`,
};
