import type { DriversAntigravityMessages } from './drivers-antigravity.ts';

export const de: DriversAntigravityMessages = {
  invalidOutput: "Antigravity hat ungültige Streamdaten zurückgegeben",
  invalidModels: "Antigravity hat eine ungültige Modellliste zurückgegeben",
  resumeMismatch: "Antigravity hat eine andere Unterhaltung wiederhergestellt",
  mcpUnavailable: "Antigravity kann die temporäre MCP-Konfiguration von BaoCut nicht empfangen. Die BaoCut-Werkzeuge sind in dieser Sitzung nicht verfügbar.",
  effortUnsupported: "Antigravity wählt den Denkaufwand über die Modell-ID; wähle ein Modell",
  turnFailed: "Der Antigravity-Durchlauf ist fehlgeschlagen",
  denied: (p) => `Antigravity hat diese Aktionen aufgrund eigener Richtlinien abgelehnt: ${p.actions}`,
  fullAccessOnly: (p: { mode: string }) =>
    `Antigravity kann nicht vor jeder Aktion nachfragen. BaoCut kann es daher nur im Modus „${p.mode}“ ausführen: Es fragt vor Befehlen oder Dateiänderungen nicht nach.`,
};
