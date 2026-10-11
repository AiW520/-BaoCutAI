import type { ModelsLocalMusicMessages } from './local-music.ts';

export const nl: ModelsLocalMusicMessages = {
  slowLocal: 'Genereert op deze computer met de audio.cpp-engine: een nummer van één minuut duurt enkele minuten, langere nummers evenredig langer',
  engineMissing: 'De audio.cpp-engine (audiocpp_cli) is niet geïnstalleerd: installeer hem via Instellingen › Muziek genereren of met `baocut external-tools install audiocpp`, of geef je eigen build op in BAOCUT_AUDIOCPP_CLI',
};
