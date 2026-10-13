import type { RcSemanticMessages } from './rc-semantic.ts';

export const pl: RcSemanticMessages = {
  modelNotInstalled: 'Wyszukiwanie semantyczne wymaga modelu wyszukiwania tekstu. Zainstaluj go w Ustawienia › Indeks semantyczny',
  modelUnavailable: 'Nie udało się uruchomić modelu wyszukiwania tekstu',
  profileIncompatible: 'Indeks semantyczny został utworzony innym modelem i trzeba go odbudować',
  inputTooLong: (p) => `Zapytanie jest za długie (ponad ${p.max} znaków)`,
  sourceMissing: 'Źródło tego wyniku już nie istnieje',
  indexNotReady: 'Indeks semantyczny nie jest jeszcze gotowy. Utwórz go w Ustawienia › Indeks semantyczny',
  indexPartial: 'Indeks semantyczny obejmuje tylko część tego zakresu; wyników może brakować',
  staleRevision: 'Wideo zmieniło się po znalezieniu tego wyniku',
  cursorStale: 'Wyniki się zmieniły. Wyszukaj ponownie',
  searchCancelled: 'Wyszukiwanie zostało anulowane',
  resourceExhausted: 'Teraz brakuje pamięci lub mocy obliczeniowej, aby uruchomić model wyszukiwania',
  appearanceUnavailable: 'Wyszukiwanie tego, co widać w gotowym wideo, nie jest jeszcze dostępne',
  channelUnavailable: 'Wyszukiwanie obrazu i dźwięku nie jest jeszcze dostępne',
  storeUnavailable: 'Nie udało się otworzyć indeksu semantycznego',
  hitInvalid: 'Nie znaleziono tego wyniku. Wyszukaj ponownie',
  needsTextChannel: 'Wybierz wypowiedzi: na razie można przeszukiwać tylko to, co zostało powiedziane',
};
