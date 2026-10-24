import type { DocsMessages } from './docs-copy.ts';

const list = (labels: readonly string[]) => new Intl.ListFormat('pt-BR', { type: 'conjunction' }).format(labels);

export const ptBR: DocsMessages = {
  tabs: (n) => (n === 1 ? '1 aba' : `${n} abas`),
  paneLabel: (name) => `Documento colaborativo “${name}”`,
  frameTitle: (name) => `Editor de documentos colaborativos: ${name}`,
  opening: 'Abrindo documento colaborativo…',
  unavailableTitle: 'Editor de documentos colaborativos indisponível',
  unavailableBody: 'Esta versão do OpenFox não inclui o editor de documentos colaborativos. Os arquivos do documento continuam na pasta.',
  openFailed: (reason) => `Não foi possível abrir o documento colaborativo: ${reason}`,
  open: 'Abrir documento colaborativo',
  openCard: (name) => `Abrir documento colaborativo “${name}”`,
  openInEditor: 'Abrir no editor de documentos colaborativos',
  comment: 'Comentário',
  ask: 'Pedido',
  token: (n) => `Anotações de documento · ${n}`,
  added: (token) => `Adicionado ao chat · ${token}`,
  removeAll: 'Remover todas as anotações de documento',
  removeOne: (n) => `Remover a anotação ${n}`,
  item: (n, label, text) => `Anotação ${n}, ${label}: ${text}`,
  empty: 'Este comentário está vazio, então não foi adicionado ao chat',
  tooLong: (max) => `Uma anotação pode ter no máximo ${max} caracteres`,
  tooMany: (max) => `Uma mensagem pode levar no máximo ${max} anotações de documento. Envie estas primeiro.`,
  noConversation: 'Esta aba ainda não faz parte de uma sessão. Envie uma mensagem para começar uma e depois envie comentários ao agente.',
  message: 'Atenda a estes comentários e pedidos do documento.',
  flushFailed: (names) =>
    `As alterações ${names.length === 1 ? 'no documento colaborativo' : 'nos documentos colaborativos'} ${list(names.map((n) => `“${n}”`))} ainda não foram salvas, então a mensagem não foi enviada. Tente de novo ou remova antes as anotações de documento.`,
};
