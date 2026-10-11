import type { ModelsLocalMusicMessages } from './local-music.ts';

export const zhHant: ModelsLocalMusicMessages = {
  slowLocal: '用本機的 audio.cpp 引擎生成：一分鐘的曲子要幾分鐘，越長越久',
  engineMissing: '尚未安裝 audio.cpp 引擎（audiocpp_cli）：在設定 › 音樂生成裡安裝，或執行 `baocut external-tools install audiocpp`；也可以用 BAOCUT_AUDIOCPP_CLI 指定自己建置的引擎',
};
