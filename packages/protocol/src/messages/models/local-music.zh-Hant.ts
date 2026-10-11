import type { ModelsLocalMusicMessages } from './local-music.ts';

export const zhHant: ModelsLocalMusicMessages = {
  slowLocal: '用本機的 audio.cpp 引擎生成：一分鐘的曲子要幾分鐘，越長越久',
  engineMissing: '沒有找到 audio.cpp 引擎（audiocpp_cli）：把它放到應用程式的可執行檔目錄，或用 BAOCUT_AUDIOCPP_CLI 指定路徑',
};
