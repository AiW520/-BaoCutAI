import type { ModelsLocalMusicMessages } from './local-music.ts';

export const zhHans: ModelsLocalMusicMessages = {
  slowLocal: '用本机的 audio.cpp 引擎生成：一分钟的曲子要几分钟，越长越久',
  engineMissing: '还没有安装 audio.cpp 引擎（audiocpp_cli）：在设置 › 音乐生成里安装，或运行 `baocut external-tools install audiocpp`；也可以用 BAOCUT_AUDIOCPP_CLI 指定自己构建的引擎',
};
