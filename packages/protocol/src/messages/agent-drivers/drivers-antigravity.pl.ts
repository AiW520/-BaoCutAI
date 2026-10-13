import type { DriversAntigravityMessages } from './drivers-antigravity.ts';

export const pl: DriversAntigravityMessages = {
  invalidOutput: "Antigravity zwrócił nieprawidłowe dane strumienia",
  invalidModels: "Antigravity zwrócił nieprawidłową listę modeli",
  resumeMismatch: "Antigravity przywrócił inną rozmowę",
  mcpUnavailable: "Antigravity nie może odebrać tymczasowej konfiguracji MCP BaoCut. Narzędzia BaoCut są niedostępne w tej sesji.",
  effortUnsupported: "Antigravity wybiera poziom rozumowania przez ID modelu; wybierz model",
  turnFailed: "Tura Antigravity nie powiodła się",
  denied: (p) => `Własna polityka Antigravity odrzuciła te działania: ${p.actions}`,
  fullAccessOnly: (p) => `Antigravity nie pyta przed każdym działaniem, więc BaoCut może uruchomić go tylko w trybie „${p.mode}”: nie pyta przed uruchamianiem poleceń ani zmianami plików.`,
};
