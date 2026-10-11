import type { ModelsLocalMusicMessages } from './local-music.ts';

export const ru: ModelsLocalMusicMessages = {
  slowLocal: 'Генерирует на этом компьютере движком audio.cpp: минутный трек занимает несколько минут, более длинные — пропорционально дольше',
  engineMissing: 'Движок audio.cpp (audiocpp_cli) не найден: положите его рядом с бинарниками приложения или укажите путь в BAOCUT_AUDIOCPP_CLI',
};
