import type { ModelsLocalMusicMessages } from './local-music.ts';

export const de: ModelsLocalMusicMessages = {
  slowLocal: 'Erzeugt auf diesem Computer mit der audio.cpp-Engine: ein einminütiges Stück dauert einige Minuten, längere entsprechend länger',
  engineMissing: 'Die audio.cpp-Engine (audiocpp_cli) ist nicht installiert: über Einstellungen › Musikerzeugung oder mit `baocut external-tools install audiocpp` installieren, oder einen eigenen Build in BAOCUT_AUDIOCPP_CLI angeben',
};
