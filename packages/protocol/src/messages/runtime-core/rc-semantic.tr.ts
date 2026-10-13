import type { RcSemanticMessages } from './rc-semantic.ts';

export const tr: RcSemanticMessages = {
  modelNotInstalled: 'Anlamsal arama için metin arama modeli gerekir. Ayarlar › Anlamsal dizin bölümünden yükleyin',
  modelUnavailable: 'Metin arama modeli çalıştırılamadı',
  profileIncompatible: 'Anlamsal dizin başka bir modelle oluşturulmuş; yeniden oluşturulması gerekiyor',
  inputTooLong: (p) => `Sorgu çok uzun (${p.max} karakterden fazla)`,
  sourceMissing: 'Bu sonucun kaynağı artık yok',
  indexNotReady: 'Anlamsal dizin henüz hazır değil. Ayarlar › Anlamsal dizin bölümünden oluşturun',
  indexPartial: 'Anlamsal dizin bu kapsamın yalnızca bir kısmını içeriyor; sonuçlar eksik olabilir',
  staleRevision: 'Bu sonuç bulunduktan sonra video değişti',
  cursorStale: 'Sonuçlar değişti. Yeniden arayın',
  searchCancelled: 'Arama iptal edildi',
  resourceExhausted: 'Şu anda arama modelini çalıştırmak için yeterli bellek veya işlem gücü yok',
  appearanceUnavailable: 'Bitmiş videoda görünenleri arama henüz kullanılamıyor',
  channelUnavailable: 'Görüntü ve ses arama henüz kullanılamıyor',
  storeUnavailable: 'Anlamsal dizin açılamadı',
  hitInvalid: 'Bu sonuç bulunamadı. Yeniden arayın',
  needsTextChannel: 'Konuşma içeriğini seçin: şimdilik yalnızca söylenenler aranabilir',
};
