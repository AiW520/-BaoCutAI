import type { RcSemanticMessages } from './rc-semantic.ts';

export const nl: RcSemanticMessages = {
  modelNotInstalled: 'Semantisch zoeken heeft het tekstzoekmodel nodig. Installeer het via Instellingen › Semantische index',
  modelUnavailable: 'Het tekstzoekmodel kon niet worden uitgevoerd',
  profileIncompatible: 'De semantische index is met een ander model gemaakt en moet opnieuw worden opgebouwd',
  inputTooLong: (p) => `De zoekopdracht is te lang (meer dan ${p.max} tekens)`,
  sourceMissing: 'De bron van dit resultaat bestaat niet meer',
  indexNotReady: 'De semantische index is nog niet klaar. Maak hem via Instellingen › Semantische index',
  indexPartial: 'De semantische index dekt maar een deel van dit bereik; er kunnen resultaten ontbreken',
  staleRevision: 'De video is gewijzigd nadat dit resultaat is gevonden',
  cursorStale: 'De resultaten zijn veranderd. Zoek opnieuw',
  searchCancelled: 'Het zoeken is geannuleerd',
  resourceExhausted: 'Er is nu niet genoeg geheugen of rekenkracht om het zoekmodel uit te voeren',
  appearanceUnavailable: 'Zoeken naar wat er in de uiteindelijke video te zien is, is nog niet beschikbaar',
  channelUnavailable: 'Zoeken naar beelden en geluiden is nog niet beschikbaar',
  storeUnavailable: 'De semantische index kon niet worden geopend',
  hitInvalid: 'Dit resultaat is niet gevonden. Zoek opnieuw',
  needsTextChannel: 'Kies gesproken inhoud: voorlopig kan alleen wat er gezegd wordt worden doorzocht',
};
