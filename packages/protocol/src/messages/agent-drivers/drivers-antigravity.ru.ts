import type { DriversAntigravityMessages } from './drivers-antigravity.ts';

export const ru: DriversAntigravityMessages = {
  invalidOutput: "Antigravity вернул некорректные потоковые данные",
  invalidModels: "Antigravity вернул некорректный список моделей",
  resumeMismatch: "Antigravity восстановил другой разговор",
  mcpUnavailable: "Antigravity не может получить временную конфигурацию MCP BaoCut. Инструменты BaoCut недоступны в этой сессии.",
  effortUnsupported: "Antigravity выбирает уровень рассуждений по ID модели; выберите модель",
  turnFailed: "Ход Antigravity завершился с ошибкой",
  denied: (p) => `Собственная политика Antigravity отклонила эти действия: ${p.actions}`,
  fullAccessOnly: (p) => `Antigravity не может спрашивать перед каждым действием, BaoCut запускает его только в режиме «${p.mode}»: он не будет спрашивать перед командами и изменениями файлов.`,
};
