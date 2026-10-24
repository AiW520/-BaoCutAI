import type { DocsMessages } from './docs-copy.ts';

const list = (labels: readonly string[]) => new Intl.ListFormat('it', { type: 'conjunction' }).format(labels);

export const it: DocsMessages = {
  tabs: (n) => (n === 1 ? '1 scheda' : `${n} schede`),
  paneLabel: (name) => `Documento collaborativo «${name}»`,
  frameTitle: (name) => `Editor di documenti collaborativi: ${name}`,
  opening: 'Apertura del documento collaborativo…',
  unavailableTitle: 'Editor di documenti collaborativi non disponibile',
  unavailableBody: 'Questa versione di OpenFox non include l’editor di documenti collaborativi. I file del documento sono ancora nella loro cartella.',
  openFailed: (reason) => `Impossibile aprire il documento collaborativo: ${reason}`,
  open: 'Apri documento collaborativo',
  openCard: (name) => `Apri documento collaborativo «${name}»`,
  openInEditor: 'Apri nell’editor di documenti collaborativi',
  comment: 'Commento',
  ask: 'Richiesta',
  token: (n) => `Annotazioni sul documento · ${n}`,
  added: (token) => `Aggiunto alla chat · ${token}`,
  removeAll: 'Rimuovi tutte le annotazioni sul documento',
  removeOne: (n) => `Rimuovi l’annotazione ${n}`,
  item: (n, label, text) => `Annotazione ${n}, ${label}: ${text}`,
  empty: 'Questo commento è vuoto, quindi non è stato aggiunto alla chat',
  tooLong: (max) => `Un’annotazione può avere al massimo ${max} caratteri`,
  tooMany: (max) => `Un messaggio può contenere al massimo ${max} annotazioni sul documento. Invia prima queste.`,
  noConversation: 'Questa scheda non fa ancora parte di una sessione. Invia un messaggio per avviarne una, poi invia i commenti all’agente.',
  message: 'Gestisci questi commenti e richieste del documento.',
  flushFailed: (names) =>
    `Le modifiche ${names.length === 1 ? 'al documento collaborativo' : 'ai documenti collaborativi'} ${list(names.map((n) => `«${n}»`))} non sono ancora state salvate, quindi il messaggio non è stato inviato. Riprova oppure rimuovi prima le annotazioni sul documento.`,
};
