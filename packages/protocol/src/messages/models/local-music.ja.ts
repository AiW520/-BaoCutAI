import type { ModelsLocalMusicMessages } from './local-music.ts';

export const ja: ModelsLocalMusicMessages = {
  slowLocal: 'このコンピューターの audio.cpp エンジンで生成します。1 分の曲に数分かかり、長いほど時間がかかります',
  engineMissing: 'audio.cpp エンジン（audiocpp_cli）がインストールされていません。設定 › 音楽生成からインストールするか、`baocut external-tools install audiocpp` を実行してください。自分でビルドしたエンジンは BAOCUT_AUDIOCPP_CLI で指定できます',
};
