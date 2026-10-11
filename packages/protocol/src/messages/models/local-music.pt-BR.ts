import type { ModelsLocalMusicMessages } from './local-music.ts';

export const ptBR: ModelsLocalMusicMessages = {
  slowLocal: 'Gera neste computador com o motor audio.cpp: uma faixa de um minuto leva alguns minutos; faixas mais longas levam proporcionalmente mais',
  engineMissing: 'O motor audio.cpp (audiocpp_cli) não está instalado: instale em Configurações › Geração de música ou com `baocut external-tools install audiocpp`, ou defina sua própria compilação em BAOCUT_AUDIOCPP_CLI',
};
