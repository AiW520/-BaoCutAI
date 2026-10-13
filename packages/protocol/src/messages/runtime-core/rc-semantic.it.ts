import type { RcSemanticMessages } from './rc-semantic.ts';

export const it: RcSemanticMessages = {
  modelNotInstalled: 'La ricerca semantica richiede il modello di ricerca testuale. Installalo in Impostazioni › Indice semantico',
  modelUnavailable: 'Impossibile eseguire il modello di ricerca testuale',
  profileIncompatible: 'L’indice semantico è stato creato con un altro modello e va ricostruito',
  inputTooLong: (p) => `La query è troppo lunga (più di ${p.max} caratteri)`,
  sourceMissing: 'L’origine di questo risultato non esiste più',
  indexNotReady: 'L’indice semantico non è ancora pronto. Crealo in Impostazioni › Indice semantico',
  indexPartial: 'L’indice semantico copre solo una parte di questo ambito; alcuni risultati potrebbero mancare',
  staleRevision: 'Il video è cambiato dopo che è stato trovato questo risultato',
  cursorStale: 'I risultati sono cambiati. Cerca di nuovo',
  searchCancelled: 'La ricerca è stata annullata',
  resourceExhausted: 'Al momento non c’è abbastanza memoria o potenza di calcolo per eseguire il modello di ricerca',
  appearanceUnavailable: 'La ricerca di ciò che si vede nel video finale non è ancora disponibile',
  channelUnavailable: 'La ricerca di immagini e suoni non è ancora disponibile',
  storeUnavailable: 'Impossibile aprire l’indice semantico',
  hitInvalid: 'Questo risultato non è stato trovato. Cerca di nuovo',
  needsTextChannel: 'Scegli il parlato: per ora si può cercare solo ciò che viene detto',
};
