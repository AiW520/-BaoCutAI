import type { ModelsLocalMusicMessages } from './local-music.ts';

export const it: ModelsLocalMusicMessages = {
  slowLocal: 'Genera su questo computer con il motore audio.cpp: un brano di un minuto richiede alcuni minuti; brani più lunghi proporzionalmente di più',
  engineMissing: 'Il motore audio.cpp (audiocpp_cli) non è installato: installalo da Impostazioni › Generazione di musica o con `baocut external-tools install audiocpp`, oppure indica la tua build in BAOCUT_AUDIOCPP_CLI',
};
