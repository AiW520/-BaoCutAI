import { pluralForm } from '@baocut/protocol';
import type { ArchivedMessages } from './archived-copy.ts';

export const nl: ArchivedMessages = {
  title: 'Gearchiveerde sessies',
  intro: 'Gearchiveerde sessies staan niet in de zijbalk. Hun video’s, bestanden en wijzigingen zijn er allemaal nog. Een herstelde sessie komt weer onder het eigen project te staan.',
  search: 'Gearchiveerde sessies zoeken',
  filterLabel: 'Filteren op project',
  allProjects: 'Alle projecten',
  noProject: 'Hoort niet bij een project',
  sessionCount: (n) => `${n} ${pluralForm('nl', n, { one: 'sessie', other: 'sessies' })}`,
  meta: (archived, active) => `Gearchiveerd: ${archived} · Laatst actief: ${active}`,
  restore: 'Herstellen',
  restoreNamed: (title) => `‘${title}’ herstellen`,
  deleteNamed: (title) => `‘${title}’ verwijderen`,
  deleteAll: 'Alles verwijderen',
  deleteAllTitle: (n) => pluralForm('nl', n, { one: `${n} gearchiveerde sessie verwijderen?`, other: `Alle ${n} gearchiveerde sessies verwijderen?` }),
  deleteAllBody:
    'De geschiedenis van deze sessies wordt uit BaoCut verwijderd en lopende taken worden eerst gestopt. Dit kan niet ongedaan worden gemaakt. Bestanden in projectmappen blijven onaangetast.',
  restored: (title) => `‘${title}’ hersteld`,
  open: 'Openen',
  restoreFailed: (message) => `Kan niet herstellen: ${message}`,
  deleted: (title) => `‘${title}’ verwijderd`,
  deletedAll: (n) => pluralForm('nl', n, { one: `${n} gearchiveerde sessie verwijderd`, other: `${n} gearchiveerde sessies verwijderd` }),
  deletedSome: (done, total) =>
    `${done} van ${total} ${pluralForm('nl', total, { one: 'gearchiveerde sessie', other: 'gearchiveerde sessies' })} verwijderd. De rest kon niet worden verwijderd.`,
  emptyTitle: 'Geen gearchiveerde sessies',
  emptyBody: 'Archiveer een sessie vanuit de rij in de zijbalk om die hierheen te verplaatsen. Je kunt die later herstellen.',
  noMatchTitle: 'Geen overeenkomende sessies',
  noMatchBody: 'Probeer een andere zoekopdracht of zet het projectfilter terug op ‘Alle projecten’.',
  banner: 'Deze sessie is gearchiveerd en staat niet in de zijbalk.',
  viewAll: 'Alle gearchiveerde bekijken',
  viewArchived: 'Gearchiveerde bekijken',
};
