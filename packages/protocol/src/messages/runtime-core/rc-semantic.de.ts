import type { RcSemanticMessages } from './rc-semantic.ts';

export const de: RcSemanticMessages = {
  modelNotInstalled: 'Die semantische Suche braucht das Textsuchmodell. Installiere es unter Einstellungen › Semantischer Index',
  modelUnavailable: 'Das Textsuchmodell konnte nicht ausgeführt werden',
  profileIncompatible: 'Der semantische Index wurde mit einem anderen Modell erstellt und muss neu aufgebaut werden',
  inputTooLong: (p) => `Die Suchanfrage ist zu lang (mehr als ${p.max} Zeichen)`,
  sourceMissing: 'Die Quelle dieses Ergebnisses ist nicht mehr vorhanden',
  indexNotReady: 'Der semantische Index ist noch nicht bereit. Erstelle ihn unter Einstellungen › Semantischer Index',
  indexPartial: 'Der semantische Index deckt nur einen Teil dieses Bereichs ab; Ergebnisse können fehlen',
  staleRevision: 'Das Video wurde geändert, nachdem dieses Ergebnis gefunden wurde',
  cursorStale: 'Die Ergebnisse haben sich geändert. Suche erneut',
  searchCancelled: 'Die Suche wurde abgebrochen',
  resourceExhausted: 'Gerade reichen Arbeitsspeicher oder Rechenleistung nicht aus, um das Suchmodell auszuführen',
  appearanceUnavailable: 'Die Suche nach dem, was im fertigen Video zu sehen ist, ist noch nicht verfügbar',
  channelUnavailable: 'Die Suche nach Bildern und Tönen ist noch nicht verfügbar',
  storeUnavailable: 'Der semantische Index konnte nicht geöffnet werden',
  hitInvalid: 'Dieses Ergebnis wurde nicht gefunden. Suche erneut',
  needsTextChannel: 'Wähle Gesprochenes: Derzeit lässt sich nur Gesprochenes durchsuchen',
};
