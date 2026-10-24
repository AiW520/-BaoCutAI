import { pluralForm } from '@baocut/protocol';
import type { ArchivedMessages } from './archived-copy.ts';

export const pl: ArchivedMessages = {
  title: 'Zarchiwizowane sesje',
  intro: 'Zarchiwizowane sesje są ukryte na pasku bocznym. Ich wideo, pliki i zmiany nadal są na miejscu. Przywrócona sesja wraca do swojego projektu.',
  search: 'Szukaj w zarchiwizowanych sesjach',
  filterLabel: 'Filtruj według projektu',
  allProjects: 'Wszystkie projekty',
  noProject: 'Poza projektem',
  sessionCount: (n) => `${n} ${pluralForm('pl', n, { one: 'sesja', few: 'sesje', many: 'sesji', other: 'sesji' })}`,
  meta: (archived, active) => `Zarchiwizowano: ${archived} · Ostatnia aktywność: ${active}`,
  restore: 'Przywróć',
  restoreNamed: (title) => `Przywróć „${title}”`,
  deleteNamed: (title) => `Usuń „${title}”`,
  deleteAll: 'Usuń wszystkie',
  deleteAllTitle: (n) =>
    pluralForm('pl', n, {
      one: `Usunąć ${n} zarchiwizowaną sesję?`,
      few: `Usunąć wszystkie ${n} zarchiwizowane sesje?`,
      many: `Usunąć wszystkie ${n} zarchiwizowanych sesji?`,
      other: `Usunąć ${n} zarchiwizowanej sesji?`,
    }),
  deleteAllBody:
    'Ich historia zostanie usunięta z OpenFox, a trwające zadania najpierw zatrzymane. Tej operacji nie można cofnąć. Pliki w folderach projektów pozostaną bez zmian.',
  restored: (title) => `Przywrócono „${title}”`,
  open: 'Otwórz',
  restoreFailed: (message) => `Nie udało się przywrócić: ${message}`,
  deleted: (title) => `Usunięto „${title}”`,
  deletedAll: (n) =>
    pluralForm('pl', n, {
      one: `Usunięto ${n} zarchiwizowaną sesję`,
      few: `Usunięto ${n} zarchiwizowane sesje`,
      many: `Usunięto ${n} zarchiwizowanych sesji`,
      other: `Usunięto ${n} zarchiwizowanej sesji`,
    }),
  deletedSome: (done, total) =>
    `Usunięto ${done} z ${total} ${pluralForm('pl', total, { one: 'zarchiwizowanej sesji', few: 'zarchiwizowanych sesji', many: 'zarchiwizowanych sesji', other: 'zarchiwizowanej sesji' })}. Pozostałych nie udało się usunąć.`,
  emptyTitle: 'Brak zarchiwizowanych sesji',
  emptyBody: 'Zarchiwizuj sesję z jej wiersza na pasku bocznym, aby przenieść ją tutaj. Później możesz ją przywrócić.',
  noMatchTitle: 'Brak pasujących sesji',
  noMatchBody: 'Spróbuj innego wyszukiwania lub ustaw filtr projektu z powrotem na „Wszystkie projekty”.',
  banner: 'Ta sesja jest zarchiwizowana i ukryta na pasku bocznym.',
  viewAll: 'Pokaż całe archiwum',
  viewArchived: 'Pokaż archiwum',
};
