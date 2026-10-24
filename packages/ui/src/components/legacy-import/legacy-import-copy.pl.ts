import { pluralForm } from '@baocut/protocol';
import type { LegacyImportMessages } from './legacy-import-copy.ts';

const projects = (n: number) => pluralForm('pl', n, { one: 'projekt', few: 'projekty', many: 'projektów', other: 'projektu' });

export const pl: LegacyImportMessages = {
  title: 'Zaimportować projekty z wcześniejszej wersji?',
  lead: (n) =>
    `Na tym komputerze znaleziono: ${n} ${projects(n)} z wcześniejszej wersji OpenFox. Po zaimportowaniu można je dalej edytować w tej wersji. Oryginalne pliki zostają na miejscu, bez zmian.`,
  found: 'Znalezione projekty',
  destination: 'Importuj do',
  resetDefault: 'Użyj domyślnej lokalizacji',
  change: 'Zmień…',
  pickTitle: 'Wybierz, dokąd importować',
  destinationNote: 'Ten folder pojawi się w Home jako projekt, a każdy wcześniejszy projekt stanie się w nim filmem.',
  hint: 'Jeśli pominiesz, pytanie pojawi się znowu przy następnym uruchomieniu OpenFox. Zaznacz „Nie przypominaj więcej”, aby nigdy ich nie importować.',
  never: 'Nie przypominaj więcej',
  skip: 'Pomiń',
  import: 'Importuj',
  importing: (n) => `Import w tle: ${n} ${projects(n)} z wcześniejszej wersji`,
  neverDone: 'Nie będziemy już przypominać o imporcie wcześniejszych projektów. Oryginalne pliki zostają bez zmian.',
  skipped: 'Pominięto. Pytanie pojawi się znowu przy następnym uruchomieniu OpenFox.',
  failed: (message) => `Nie udało się zaimportować: ${message}`,
  settingsTitle: "Przenoszenie ustawień z wcześniejszej wersji",
  settingsLeadAdopted: "Podczas aktualizacji przejęto wcześniejszy folder modeli. Instalacja sprawdza istniejące pliki na podstawie aktualnego manifestu i pobiera tylko brakujące lub uszkodzone pliki.",
  settingsLeadPreserved: "Zachowano bieżące ustawienia i folder modeli. Niektóre wcześniejsze preferencje transkrypcji nie zostały przeniesione.",
  settingsDirectory: "Folder modeli przejęty podczas aktualizacji",
  settingsPreferences: "Preferencje do ponownego wybrania",
  settingsModel: "Wcześniejszy domyślny model transkrypcji nie został przeniesiony. Uzupełnij wymagane składniki, a następnie wybierz model domyślny w ustawieniach rozpoznawania mowy.",
  settingsLanguage: "Wcześniejszy język rozpoznawania nie został przeniesiony. W tej wersji język wybiera się dla każdej transkrypcji.",
  settingsHint: "Ten raport jest zawsze dostępny w Ustawienia › Rozpoznawanie mowy. Potwierdzenie nie instaluje modeli ani nie zmienia preferencji.",
  settingsAcknowledge: "Rozumiem",
  settingsOpen: "Otwórz ustawienia rozpoznawania mowy",
  settingsNotice: "Wcześniejsze preferencje transkrypcji trzeba wybrać ponownie.",
  settingsNoticeDetail: "Istniejące pliki modeli można sprawdzić i użyć ponownie. Zobacz szczegóły i dalsze kroki.",
  settingsViewReport: "Zobacz raport przenoszenia",
};
