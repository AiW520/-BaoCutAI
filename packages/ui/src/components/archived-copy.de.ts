import { pluralForm } from '@baocut/protocol';
import type { ArchivedMessages } from './archived-copy.ts';

export const de: ArchivedMessages = {
  title: 'Archivierte Sitzungen',
  intro: 'Archivierte Sitzungen sind in der Seitenleiste ausgeblendet. Videos, Dateien und Änderungen bleiben vollständig erhalten. Eine wiederhergestellte Sitzung erscheint wieder unter ihrem Projekt.',
  search: 'Archivierte Sitzungen durchsuchen',
  filterLabel: 'Nach Projekt filtern',
  allProjects: 'Alle Projekte',
  noProject: 'Nicht in einem Projekt',
  sessionCount: (n) => `${n} ${pluralForm('de', n, { one: 'Sitzung', other: 'Sitzungen' })}`,
  meta: (archived, active) => `Archiviert: ${archived} · Zuletzt aktiv: ${active}`,
  restore: 'Wiederherstellen',
  restoreNamed: (title) => `„${title}“ wiederherstellen`,
  deleteNamed: (title) => `„${title}“ löschen`,
  deleteAll: 'Alle löschen',
  deleteAllTitle: (n) => pluralForm('de', n, { one: `${n} archivierte Sitzung löschen?`, other: `Alle ${n} archivierten Sitzungen löschen?` }),
  deleteAllBody:
    'Der Verlauf dieser Sitzungen wird aus OpenFox entfernt; laufende Aufgaben werden zuerst gestoppt. Dies kann nicht rückgängig gemacht werden. Dateien in Projektordnern sind nicht betroffen.',
  restored: (title) => `Wiederhergestellt: „${title}“`,
  open: 'Öffnen',
  restoreFailed: (message) => `Wiederherstellen fehlgeschlagen: ${message}`,
  deleted: (title) => `Gelöscht: „${title}“`,
  deletedAll: (n) => pluralForm('de', n, { one: `${n} archivierte Sitzung gelöscht`, other: `${n} archivierte Sitzungen gelöscht` }),
  deletedSome: (done, total) =>
    `${done} von ${total} ${pluralForm('de', total, { one: 'archivierten Sitzung', other: 'archivierten Sitzungen' })} gelöscht. Der Rest konnte nicht gelöscht werden.`,
  emptyTitle: 'Keine archivierten Sitzungen',
  emptyBody: 'Eine Sitzung über ihre Zeile in der Seitenleiste archivieren, um sie hierher zu verschieben. Sie lässt sich später wiederherstellen.',
  noMatchTitle: 'Keine passenden Sitzungen',
  noMatchBody: 'Anders suchen oder den Projektfilter auf „Alle Projekte“ zurücksetzen.',
  banner: 'Diese Sitzung ist archiviert und in der Seitenleiste ausgeblendet.',
  viewAll: 'Alle archivierten anzeigen',
  viewArchived: 'Archivierte anzeigen',
};
