import type { RcSemanticMessages } from './rc-semantic.ts';

export const ptBR: RcSemanticMessages = {
  modelNotInstalled: 'A busca semântica precisa do modelo de busca de texto. Instale-o em Configurações › Índice semântico',
  modelUnavailable: 'Não foi possível executar o modelo de busca de texto',
  profileIncompatible: 'O índice semântico foi criado com outro modelo e precisa ser recriado',
  inputTooLong: (p) => `A consulta é longa demais (mais de ${p.max} caracteres)`,
  sourceMissing: 'A origem deste resultado não existe mais',
  indexNotReady: 'O índice semântico ainda não está pronto. Crie-o em Configurações › Índice semântico',
  indexPartial: 'O índice semântico cobre só parte deste escopo; os resultados podem estar incompletos',
  staleRevision: 'O vídeo mudou depois que este resultado foi encontrado',
  cursorStale: 'Os resultados mudaram. Pesquise de novo',
  searchCancelled: 'A busca foi cancelada',
  resourceExhausted: 'Não há memória ou capacidade de processamento suficiente para executar o modelo de busca agora',
  appearanceUnavailable: 'Ainda não é possível buscar o que aparece no vídeo final',
  channelUnavailable: 'Ainda não é possível buscar imagens e sons',
  storeUnavailable: 'Não foi possível abrir o índice semântico',
  hitInvalid: 'Este resultado não foi encontrado. Pesquise de novo',
  needsTextChannel: 'Escolha o conteúdo falado: por enquanto só é possível buscar o que é dito',
};
