import type { ModelsLocalMusicMessages } from './local-music.ts';

export const pl: ModelsLocalMusicMessages = {
  slowLocal: 'Generuje na tym komputerze silnikiem audio.cpp: minutowy utwór zajmuje kilka minut, dłuższe proporcjonalnie dłużej',
  engineMissing: 'Silnik audio.cpp (audiocpp_cli) nie jest zainstalowany: zainstaluj go w Ustawienia › Generowanie muzyki lub poleceniem `baocut external-tools install audiocpp`, albo wskaż własną kompilację w BAOCUT_AUDIOCPP_CLI',
};
