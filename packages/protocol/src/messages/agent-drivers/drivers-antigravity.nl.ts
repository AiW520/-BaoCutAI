import type { DriversAntigravityMessages } from './drivers-antigravity.ts';

export const nl: DriversAntigravityMessages = {
  invalidOutput: "Antigravity gaf ongeldige streamgegevens terug",
  invalidModels: "Antigravity gaf een ongeldige modellenlijst terug",
  resumeMismatch: "Antigravity heeft een ander gesprek hersteld",
  mcpUnavailable: "Antigravity kan de tijdelijke MCP-configuratie van BaoCut niet ontvangen. De BaoCut-tools zijn niet beschikbaar in deze sessie.",
  effortUnsupported: "Antigravity kiest de redeneerinspanning via de model-ID; kies een model",
  turnFailed: "De Antigravity-beurt is mislukt",
  denied: (p) => `Het eigen beleid van Antigravity heeft deze acties geweigerd: ${p.actions}`,
  fullAccessOnly: (p: { mode: string }) =>
    `Antigravity kan niet voor elke actie toestemming vragen, dus BaoCut kan het alleen uitvoeren in de modus ‘${p.mode}’: het vraagt je geen toestemming voordat het opdrachten uitvoert of bestanden wijzigt.`,
};
