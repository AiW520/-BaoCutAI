import type { DriversAntigravityMessages } from './drivers-antigravity.ts';

export const es: DriversAntigravityMessages = {
  invalidOutput: "Antigravity devolvió datos de flujo no válidos",
  invalidModels: "Antigravity devolvió una lista de modelos no válida",
  resumeMismatch: "Antigravity restauró otra conversación",
  mcpUnavailable: "Antigravity no puede recibir la configuración MCP temporal de BaoCut. Sus herramientas no están disponibles en esta sesión.",
  effortUnsupported: "Antigravity elige el esfuerzo de razonamiento mediante el ID del modelo; selecciona un modelo",
  turnFailed: "Falló el turno de Antigravity",
  denied: (p) => `La política propia de Antigravity rechazó estas acciones: ${p.actions}`,
  fullAccessOnly: (p) => `Antigravity no puede preguntar antes de cada acción, por lo que BaoCut solo puede ejecutarlo en modo «${p.mode}»: no preguntará antes de ejecutar comandos o cambiar archivos.`,
};
