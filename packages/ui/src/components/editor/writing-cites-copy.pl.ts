import type { WritingCitesMessages } from './writing-cites-copy.ts';

const many = (n: number, one: string, few: string, other: string) => {
  const d = n % 10;
  const t = n % 100;
  return n === 1 ? one : d >= 2 && d <= 4 && (t < 12 || t > 14) ? few : other;
};

export const pl: WritingCitesMessages = {
  statsParas: (n: number, cited: number) => `${n} ${many(n, 'akapit', 'akapity', 'akapitów')} · ze źródłami: ${cited}`,
  statsInferred: (n: number) => `wywnioskowane przez model: ${n}`,
  statsDropped: (n: number) => `odrzucone źródła spoza wysłanego tekstu: ${n}`,
  statsVideos: (n: number) => `źródła z ${n} ${many(n, 'wideo', 'wideo', 'wideo')}`,
  seekHint: 'Kliknij czas, aby tam przejść',
  inferred: 'Wniosek modelu',
  inferredHint: 'Ten akapit nie ma źródła: model go wywnioskował. Sprawdź go przed publikacją.',
  citeAria: (label: string) => `Źródło ${label}`,
  otherVideo: 'Inne wideo',
  otherVideoNote: (name: string, at: string) => `To źródło jest w „${name}” w ${at}. Otwórz to wideo, aby je zobaczyć.`,
  copyPlain: 'Kopiuj Markdown',
  copyTimecodes: 'Kopiuj z kodami czasowymi',
  saved: 'Zapisano w Space jako dokument',
  showInSpace: 'Pokaż w Space',
  paraMenu: 'Ten akapit',
  paraSources: 'Pokaż źródła',
  paraHideSources: 'Ukryj źródła',
  paraRewrite: 'Przepisz ten akapit',
  paraMaterial: 'Przepisz z innym materiałem…',
  paraUndo: 'Cofnij przepisanie',
  figuresNote: 'Ilustracje: klatki z cytowanego momentu, niewybrane według treści',
  figureCaption: (clock) => `Klatka z ${clock}`,
  figureNext: 'Inna klatka',
  figureDrop: 'Usuń',
  rewritten: 'Przepisany',
  materialTitle: 'Przepisz z innym materiałem',
  materialLead: 'Zaznacz, na czym ma się opierać ten akapit. Obecne źródła są zaznaczone; poniżej są fragmenty znalezione według jego treści.',
  materialCited: 'Obecne źródła',
  materialFound: 'Znalezione dla tego akapitu',
  materialLoading: 'Szukanie fragmentów…',
  materialFailed: (message: string) => `Nie udało się znaleźć fragmentów: ${message}`,
  materialNone: 'Nic więcej nie znaleziono.',
  materialUse: (n: number) => `Przepisz z zaznaczonych (${n})`,
  cancel: 'Anuluj',
  retry: 'Ponów',
  rewriteFailed: (message: string) => `Nie udało się przepisać akapitu: ${message}`,
  rewriteUndone: 'Cofnięto przepisanie. Nowa wersja została w Space.',
};
