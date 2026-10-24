import type { DocsMessages } from './docs-copy.ts';

const list = (labels: readonly string[]) => new Intl.ListFormat('de', { type: 'conjunction' }).format(labels);

export const de: DocsMessages = {
  tabs: (n) => (n === 1 ? '1 Tab' : `${n} Tabs`),
  paneLabel: (name) => `Gemeinschaftsdokument „${name}“`,
  frameTitle: (name) => `Editor für Gemeinschaftsdokumente: ${name}`,
  opening: 'Gemeinschaftsdokument wird geöffnet…',
  unavailableTitle: 'Editor für Gemeinschaftsdokumente nicht verfügbar',
  unavailableBody: 'Diese OpenFox-Version enthält den Editor für Gemeinschaftsdokumente nicht. Die Dateien des Dokuments liegen weiterhin in ihrem Ordner.',
  openFailed: (reason) => `Gemeinschaftsdokument konnte nicht geöffnet werden: ${reason}`,
  open: 'Gemeinschaftsdokument öffnen',
  openCard: (name) => `Gemeinschaftsdokument „${name}“ öffnen`,
  openInEditor: 'Im Editor für Gemeinschaftsdokumente öffnen',
  comment: 'Kommentar',
  ask: 'Anfrage',
  token: (n) => `Dokumentanmerkungen · ${n}`,
  added: (token) => `Zum Chat hinzugefügt · ${token}`,
  removeAll: 'Alle Dokumentanmerkungen entfernen',
  removeOne: (n) => `Anmerkung ${n} entfernen`,
  item: (n, label, text) => `Anmerkung ${n}, ${label}: ${text}`,
  empty: 'Dieser Kommentar ist leer und wurde nicht zum Chat hinzugefügt',
  tooLong: (max) => `Eine Anmerkung darf höchstens ${max} Zeichen lang sein`,
  tooMany: (max) => `Eine Nachricht kann höchstens ${max} Dokumentanmerkungen enthalten. Sende diese zuerst.`,
  noConversation: 'Dieser Tab gehört noch zu keiner Sitzung. Sende eine Nachricht, um eine zu starten, und schicke dann Kommentare an den Agent.',
  message: 'Bitte bearbeite diese Kommentare und Anfragen im Dokument.',
  flushFailed: (names) =>
    `Änderungen ${names.length === 1 ? 'am Gemeinschaftsdokument' : 'an den Gemeinschaftsdokumenten'} ${list(names.map((n) => `„${n}“`))} sind noch nicht gespeichert, daher wurde die Nachricht nicht gesendet. Versuche es erneut oder entferne zuerst die Dokumentanmerkungen.`,
};
