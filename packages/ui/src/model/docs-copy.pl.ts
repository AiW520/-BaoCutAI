import type { DocsMessages } from './docs-copy.ts';

const list = (labels: readonly string[]) => new Intl.ListFormat('pl', { type: 'conjunction' }).format(labels);

export const pl: DocsMessages = {
  tabs: (n) => `${n} ${n === 1 ? 'karta' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? 'karty' : 'kart'}`,
  paneLabel: (name) => `Wspólny dokument „${name}”`,
  frameTitle: (name) => `Edytor wspólnych dokumentów: ${name}`,
  opening: 'Otwieranie wspólnego dokumentu…',
  unavailableTitle: 'Edytor wspólnych dokumentów niedostępny',
  unavailableBody: 'Ta wersja BaoCut nie zawiera edytora wspólnych dokumentów. Pliki dokumentu nadal są w swoim folderze.',
  openFailed: (reason) => `Nie udało się otworzyć wspólnego dokumentu: ${reason}`,
  open: 'Otwórz wspólny dokument',
  openCard: (name) => `Otwórz wspólny dokument „${name}”`,
  openInEditor: 'Otwórz w edytorze wspólnych dokumentów',
  comment: 'Komentarz',
  ask: 'Prośba',
  token: (n) => `Adnotacje do dokumentu · ${n}`,
  added: (token) => `Dodano do czatu · ${token}`,
  removeAll: 'Usuń wszystkie adnotacje do dokumentu',
  removeOne: (n) => `Usuń adnotację ${n}`,
  item: (n, label, text) => `Adnotacja ${n}, ${label}: ${text}`,
  empty: 'Ten komentarz jest pusty, więc nie został dodany do czatu',
  tooLong: (max) => `Adnotacja może mieć najwyżej ${max} znaków`,
  tooMany: (max) => `Jedna wiadomość może zawierać najwyżej ${max} adnotacji do dokumentu. Najpierw wyślij te.`,
  noConversation: 'Ta karta nie należy jeszcze do żadnej sesji. Wyślij wiadomość, aby ją rozpocząć, a potem wysyłaj komentarze do agenta.',
  message: 'Zajmij się tymi komentarzami i prośbami w dokumencie.',
  flushFailed: (names) =>
    `Części zmian we ${names.length === 1 ? 'wspólnym dokumencie' : 'wspólnych dokumentach'} ${list(names.map((n) => `„${n}”`))} jeszcze nie zapisano, więc wiadomość nie została wysłana. Spróbuj ponownie albo najpierw usuń adnotacje do dokumentu.`,
};
