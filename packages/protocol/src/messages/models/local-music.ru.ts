import type { ModelsLocalMusicMessages } from './local-music.ts';

export const ru: ModelsLocalMusicMessages = {
  slowLocal: 'Генерирует на этом компьютере движком audio.cpp: минутный трек занимает несколько минут, более длинные — пропорционально дольше',
  engineMissing: 'Движок audio.cpp (audiocpp_cli) не установлен: установите его в Настройки › Генерация музыки или командой `baocut external-tools install audiocpp`, либо укажите свою сборку в BAOCUT_AUDIOCPP_CLI',
};
