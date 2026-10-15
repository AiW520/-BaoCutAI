import type { DocsMessages } from './docs-copy.ts';

const list = (labels: readonly string[]) => new Intl.ListFormat('nl', { type: 'conjunction' }).format(labels);

export const nl: DocsMessages = {
  tabs: (n) => (n === 1 ? '1 tabblad' : `${n} tabbladen`),
  paneLabel: (name) => `Samenwerkingsdocument ‘${name}’`,
  frameTitle: (name) => `Editor voor samenwerkingsdocumenten: ${name}`,
  opening: 'Samenwerkingsdocument openen…',
  unavailableTitle: 'Editor voor samenwerkingsdocumenten niet beschikbaar',
  unavailableBody: 'Deze versie van BaoCut bevat de editor voor samenwerkingsdocumenten niet. De bestanden van het document staan nog in hun map.',
  openFailed: (reason) => `Kan samenwerkingsdocument niet openen: ${reason}`,
  open: 'Samenwerkingsdocument openen',
  openCard: (name) => `Samenwerkingsdocument ‘${name}’ openen`,
  openInEditor: 'Openen in editor voor samenwerkingsdocumenten',
  comment: 'Opmerking',
  ask: 'Verzoek',
  token: (n) => `Documentannotaties · ${n}`,
  added: (token) => `Aan chat toegevoegd · ${token}`,
  removeAll: 'Alle documentannotaties verwijderen',
  removeOne: (n) => `Annotatie ${n} verwijderen`,
  item: (n, label, text) => `Annotatie ${n}, ${label}: ${text}`,
  empty: 'Deze opmerking is leeg en is niet aan de chat toegevoegd',
  tooLong: (max) => `Een annotatie mag hoogstens ${max} tekens lang zijn`,
  tooMany: (max) => `Een bericht kan hoogstens ${max} documentannotaties bevatten. Verstuur deze eerst.`,
  noConversation: 'Dit tabblad hoort nog niet bij een sessie. Stuur een bericht om er een te starten en stuur daarna opmerkingen naar de agent.',
  message: 'Verwerk deze opmerkingen en verzoeken uit het document.',
  flushFailed: (names) =>
    `Wijzigingen in ${names.length === 1 ? 'het samenwerkingsdocument' : 'de samenwerkingsdocumenten'} ${list(names.map((n) => `‘${n}’`))} zijn nog niet opgeslagen, dus het bericht is niet verzonden. Probeer het opnieuw of verwijder eerst de documentannotaties.`,
};
