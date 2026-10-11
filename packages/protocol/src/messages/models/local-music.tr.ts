import type { ModelsLocalMusicMessages } from './local-music.ts';

export const tr: ModelsLocalMusicMessages = {
  slowLocal: 'Bu bilgisayarda audio.cpp motoruyla oluşturur: bir dakikalık parça birkaç dakika sürer, daha uzun parçalar orantılı olarak daha uzun',
  engineMissing: 'audio.cpp motoru (audiocpp_cli) yüklü değil: Ayarlar › Müzik üretimi bölümünden ya da `baocut external-tools install audiocpp` ile yükleyin veya kendi derlemenizi BAOCUT_AUDIOCPP_CLI ile belirtin',
};
