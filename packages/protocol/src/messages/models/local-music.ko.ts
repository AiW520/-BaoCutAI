import type { ModelsLocalMusicMessages } from './local-music.ts';

export const ko: ModelsLocalMusicMessages = {
  slowLocal: '이 컴퓨터의 audio.cpp 엔진으로 생성합니다. 1분짜리 곡에 몇 분이 걸리며 길수록 더 오래 걸립니다',
  engineMissing: 'audio.cpp 엔진(audiocpp_cli)이 설치되어 있지 않습니다. 설정 › 음악 생성에서 설치하거나 `baocut external-tools install audiocpp`를 실행하세요. 직접 빌드한 엔진은 BAOCUT_AUDIOCPP_CLI로 지정할 수 있습니다',
};
