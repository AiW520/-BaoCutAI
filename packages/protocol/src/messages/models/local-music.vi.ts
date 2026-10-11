import type { ModelsLocalMusicMessages } from './local-music.ts';

export const vi: ModelsLocalMusicMessages = {
  slowLocal: 'Tạo trên máy tính này bằng engine audio.cpp: một bản nhạc một phút mất vài phút, bản dài hơn mất lâu hơn tương ứng',
  engineMissing: 'Chưa cài engine audio.cpp (audiocpp_cli): cài trong Cài đặt › Tạo nhạc hoặc chạy `baocut external-tools install audiocpp`, hoặc chỉ bản tự build qua BAOCUT_AUDIOCPP_CLI',
};
