import type { ModelsLocalMusicMessages } from './local-music.ts';

export const zhHans: ModelsLocalMusicMessages = {
  slowLocal: '用本机的 audio.cpp 引擎生成：一分钟的曲子要几分钟，越长越久',
  engineMissing: '没有找到 audio.cpp 引擎（audiocpp_cli）：把它放到应用的可执行文件目录，或用 BAOCUT_AUDIOCPP_CLI 指定路径',
};
