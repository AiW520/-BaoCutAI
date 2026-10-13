import type { WritingTopicMessages } from './writing-topic-copy.ts';

const many = (n: number, one: string, few: string, other: string) => {
  const d = n % 10;
  const t = n % 100;
  return n === 1 ? one : d >= 2 && d <= 4 && (t < 12 || t > 14) ? few : other;
};

export const pl: WritingTopicMessages = {
  scopeTopic: 'Według tematu',
  topicLabel: 'Temat',
  topicPlaceholder: 'Opcjonalnie, np. jak wybraliśmy model',
  topicHow: 'Fragmenty związane z tematem są wybierane na tym komputerze i wysyłane do modelu w kolejności czasowej. Bez tematu używany jest prompt.',
  topicPicked: (n: number, chapters: number) =>
    `Wybrano ${n} ${many(n, 'fragment', 'fragmenty', 'fragmentów')}${chapters ? ` z ${chapters} ${many(chapters, 'rozdziału', 'rozdziałów', 'rozdziałów')}` : ''}, w kolejności czasowej`,
  topicNeedsTopic: 'Wpisz temat, aby zobaczyć, które fragmenty zostaną wybrane.',
  topicLoading: 'Wybieranie fragmentów…',
  topicNone: 'Nie znaleziono nic powiązanego. Spróbuj innych słów.',
  topicFailed: (message: string) => `Nie udało się wybrać fragmentów: ${message}`,
  topicView: 'Zobacz wybrane fragmenty',
  topicDialogTitle: 'Wybrane fragmenty',
  topicDialogLead: 'Wybrane na tym komputerze według tematu, w kolejności czasowej. Odznacz to, czego model nie powinien widzieć. To decyduje tylko o tym, co czyta model; transkrypcja się nie zmienia.',
  topicWeak: 'Słabo powiązane',
  topicUse: (n: number) => `Użyj ${n}`,
  cancel: 'Anuluj',
  topicDefaultLong: 'To wideo trwa ponad 30 minut, więc zaczyna się od „Według tematu”.',
  topicDefaultShort: 'To wideo jest krótkie, więc zaczyna się od całego tekstu. Powyżej 30 minut zaczyna się od „Według tematu”.',
  contextTopic: (n: number, chapters: number) =>
    `transkrypcja: ${n} ${many(n, 'fragment', 'fragmenty', 'fragmentów')} (wybrane według tematu${chapters ? `, ${chapters} ${many(chapters, 'rozdział', 'rozdziały', 'rozdziałów')}` : ''})`,
  contextTopicPending: 'fragmenty transkrypcji wybrane według tematu',
  contextSeries: (n: number) => `seria ${n} ${many(n, 'wideo', 'wideo', 'wideo')}`,
  seriesLabel: 'Wideo',
  seriesOnlyThis: 'Tylko to',
  seriesWith: (names: string) => `To + ${names}`,
  seriesAdd: 'Dodaj z tego projektu…',
  seriesChange: 'Zmień…',
  seriesTitle: 'Wideo do tekstu',
  seriesLead: (max: number) =>
    `Wideo z tego samego projektu. Fragmenty są wybierane ze wszystkich, a źródła podają wideo; wynik to nadal jeden dokument. Jeszcze do ${max}.`,
  seriesThis: (name: string) => `${name} (to)`,
  seriesDerived: 'Wycięte z innego wideo, więc jego treść jest już w wideo źródłowym',
  seriesNone: 'W tym projekcie nie ma innych wideo.',
  seriesLoading: 'Wczytywanie wideo…',
  seriesFailed: (message: string) => `Nie udało się wyświetlić wideo: ${message}`,
  seriesDone: 'Gotowe',
  boundaryLabel: 'Granice',
  boundaryTopic: 'Wykrywaj według tematu',
  boundaryModel: 'Niech zdecyduje model',
  boundaryTopicSub: 'Najpierw na tym komputerze szukane są zmiany tematu; model dzieli i nazywa rozdziały tylko w tych miejscach. Ponowne uruchomienie zmienia tytuły, nie granice.',
  boundaryModelSub: 'Cały tekst trafia do modelu, który ustala granice i tytuły jednocześnie. Długie wideo przy każdym uruchomieniu może zostać podzielone inaczej.',
  boundaryOff: 'Wykrywanie według tematu wymaga lokalnego modelu semantycznego, więc granice ustala model.',
};
