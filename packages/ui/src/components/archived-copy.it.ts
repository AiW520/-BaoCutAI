import { pluralForm } from '@baocut/protocol';
import type { ArchivedMessages } from './archived-copy.ts';

export const it: ArchivedMessages = {
  title: 'Sessioni archiviate',
  intro: 'Le sessioni archiviate non compaiono nella barra laterale. Video, file e modifiche sono ancora tutti lì. Una sessione ripristinata torna sotto il suo progetto.',
  search: 'Cerca nelle sessioni archiviate',
  filterLabel: 'Filtra per progetto',
  allProjects: 'Tutti i progetti',
  noProject: 'Fuori da un progetto',
  sessionCount: (n) => `${n} ${pluralForm('it', n, { one: 'sessione', other: 'sessioni' })}`,
  meta: (archived, active) => `Archiviata: ${archived} · Ultima attività: ${active}`,
  restore: 'Ripristina',
  restoreNamed: (title) => `Ripristina «${title}»`,
  deleteNamed: (title) => `Elimina «${title}»`,
  deleteAll: 'Elimina tutte',
  deleteAllTitle: (n) => pluralForm('it', n, { one: `Eliminare ${n} sessione archiviata?`, other: `Eliminare tutte le ${n} sessioni archiviate?` }),
  deleteAllBody:
    'La loro cronologia verrà rimossa da OpenFox e le attività in corso verranno prima interrotte. L’operazione non si può annullare. I file nelle cartelle dei progetti non vengono toccati.',
  restored: (title) => `«${title}» ripristinata`,
  open: 'Apri',
  restoreFailed: (message) => `Impossibile ripristinare: ${message}`,
  deleted: (title) => `«${title}» eliminata`,
  deletedAll: (n) => pluralForm('it', n, { one: `${n} sessione archiviata eliminata`, other: `${n} sessioni archiviate eliminate` }),
  deletedSome: (done, total) =>
    `Eliminate ${done} di ${total} ${pluralForm('it', total, { one: 'sessione archiviata', other: 'sessioni archiviate' })}. Non è stato possibile eliminare le altre.`,
  emptyTitle: 'Nessuna sessione archiviata',
  emptyBody: 'Archivia una sessione dalla sua riga nella barra laterale per spostarla qui. Potrai ripristinarla in seguito.',
  noMatchTitle: 'Nessuna sessione corrispondente',
  noMatchBody: 'Prova un’altra ricerca o reimposta il filtro di progetto su «Tutti i progetti».',
  banner: 'Questa sessione è archiviata e nascosta nella barra laterale.',
  viewAll: 'Vedi tutte le archiviate',
  viewArchived: 'Vedi archiviate',
};
