import { pluralForm } from '@baocut/protocol';
import type { WorkbenchMessages } from './home-workbench-copy.ts';

export const tr: WorkbenchMessages = {
  eyebrow: "OpenFox · Yaratıcı çalışma alanı",
  title: "Bir fikri yeni videona dönüştür.",
  intro: "Bir fikir anlat, medya ekle veya kaldığın yerden devam et.",
  recentTitle: "Son projeler",
  recentHint: "Kaldığın yerden devam et",
  browse: "Tüm çalışmaları gör",
  continueVideo: "Düzenlemeye devam et",
  continueSession: "Oturuma devam et",
  startSession: "Oturum başlat",
  empty: "Videolarını ve yaratıcı oturumlarını bir arada tutmak için bir proje oluştur.",
  videos: (n: number) => `${n} ${pluralForm('tr', n, { other: "video" })}`,
  sessions: (n: number) => `${n} ${pluralForm('tr', n, { other: "oturum" })}`,
};
