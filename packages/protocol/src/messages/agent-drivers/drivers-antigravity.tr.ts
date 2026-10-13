import type { DriversAntigravityMessages } from './drivers-antigravity.ts';

export const tr: DriversAntigravityMessages = {
  invalidOutput: "Antigravity geçersiz akış verileri döndürdü",
  invalidModels: "Antigravity geçersiz bir model listesi döndürdü",
  resumeMismatch: "Antigravity farklı bir konuşmayı geri yükledi",
  mcpUnavailable: "Antigravity, BaoCut’un geçici MCP yapılandırmasını alamaz. BaoCut araçları bu oturumda kullanılamaz.",
  effortUnsupported: "Antigravity akıl yürütme düzeyini model kimliğiyle seçer; bir model seçin",
  turnFailed: "Antigravity turu başarısız oldu",
  denied: (p) => `Antigravity’nin kendi politikası bu işlemleri reddetti: ${p.actions}`,
  fullAccessOnly: (p) => `Antigravity her işlemden önce soramaz; BaoCut yalnızca “${p.mode}” modunda çalıştırabilir: komut çalıştırmadan veya dosya değiştirmeden önce size sormaz.`,
};
