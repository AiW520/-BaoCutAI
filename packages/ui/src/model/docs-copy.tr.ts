import type { DocsMessages } from './docs-copy.ts';

const list = (labels: readonly string[]) => new Intl.ListFormat('tr', { type: 'conjunction' }).format(labels);

export const tr: DocsMessages = {
  tabs: (n) => `${n} sekme`,
  paneLabel: (name) => `“${name}” ortak belgesi`,
  frameTitle: (name) => `Ortak belge düzenleyici: ${name}`,
  opening: 'Ortak belge açılıyor…',
  unavailableTitle: 'Ortak belge düzenleyici kullanılamıyor',
  unavailableBody: 'Bu OpenFox sürümünde ortak belge düzenleyici yok. Belgenin dosyaları hâlâ klasöründe.',
  openFailed: (reason) => `Ortak belge açılamadı: ${reason}`,
  open: 'Ortak belgeyi aç',
  openCard: (name) => `“${name}” ortak belgesini aç`,
  openInEditor: 'Ortak belge düzenleyicide aç',
  comment: 'Yorum',
  ask: 'İstek',
  token: (n) => `Belge notları · ${n}`,
  added: (token) => `Sohbete eklendi · ${token}`,
  removeAll: 'Tüm belge notlarını kaldır',
  removeOne: (n) => `${n}. notu kaldır`,
  item: (n, label, text) => `Not ${n}, ${label}: ${text}`,
  empty: 'Bu yorum boş olduğu için sohbete eklenmedi',
  tooLong: (max) => `Bir not en fazla ${max} karakter olabilir`,
  tooMany: (max) => `Bir mesaj en fazla ${max} belge notu taşıyabilir. Önce bunları gönderin.`,
  noConversation: 'Bu sekme henüz bir oturuma ait değil. Bir oturum başlatmak için mesaj gönderin, ardından yorumları ajana gönderin.',
  message: 'Belgedeki bu yorumları ve istekleri ele al.',
  flushFailed: (names) =>
    `${list(names.map((n) => `“${n}”`))} ortak belgesindeki değişiklikler henüz kaydedilmedi, bu yüzden mesaj gönderilmedi. Yeniden deneyin ya da önce belge notlarını kaldırın.`,
};
