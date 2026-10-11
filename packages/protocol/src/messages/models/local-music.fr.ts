import type { ModelsLocalMusicMessages } from './local-music.ts';

export const fr: ModelsLocalMusicMessages = {
  slowLocal: 'Génère sur cet ordinateur avec le moteur audio.cpp : un morceau d’une minute prend plusieurs minutes, les morceaux plus longs proportionnellement plus',
  engineMissing: 'Le moteur audio.cpp (audiocpp_cli) n’est pas installé : installez-le depuis Réglages › Génération de musique ou avec `baocut external-tools install audiocpp`, ou indiquez votre propre build dans BAOCUT_AUDIOCPP_CLI',
};
