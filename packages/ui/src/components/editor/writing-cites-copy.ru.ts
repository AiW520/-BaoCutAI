import type { WritingCitesMessages } from './writing-cites-copy.ts';

const many = (n: number, one: string, few: string, other: string) => {
  const d = n % 10;
  const t = n % 100;
  return d === 1 && t !== 11 ? one : d >= 2 && d <= 4 && (t < 12 || t > 14) ? few : other;
};

export const ru: WritingCitesMessages = {
  statsParas: (n: number, cited: number) => `${n} ${many(n, 'абзац', 'абзаца', 'абзацев')} · с источниками: ${cited}`,
  statsInferred: (n: number) => `выведено моделью: ${n}`,
  statsDropped: (n: number) => `отброшено источников, которых не было в отправленном: ${n}`,
  statsVideos: (n: number) => `источники из ${n} видео`,
  seekHint: 'Нажмите на время, чтобы перейти туда',
  inferred: 'Вывод модели',
  inferredHint: 'У этого абзаца нет источника: его вывела модель. Проверьте перед публикацией.',
  citeAria: (label: string) => `Источник ${label}`,
  otherVideo: 'Другое видео',
  otherVideoNote: (name: string, at: string) => `Этот источник — в «${name}» на ${at}. Откройте то видео, чтобы посмотреть.`,
  copyPlain: 'Копировать Markdown',
  copyTimecodes: 'Копировать с таймкодами',
  saved: 'Сохранено в Space как документ',
  showInSpace: 'Показать в Space',
  paraMenu: 'Этот абзац',
  paraSources: 'Показать источники',
  paraHideSources: 'Скрыть источники',
  paraRewrite: 'Переписать этот абзац',
  paraMaterial: 'Переписать по другому материалу…',
  paraUndo: 'Отменить переписывание',
  figuresNote: 'Иллюстрации: кадры взяты по времени ссылки, не выбраны по содержанию',
  figureCaption: (clock) => `Кадр на ${clock}`,
  figureNext: 'Другой кадр',
  figureDrop: 'Убрать',
  rewritten: 'Переписан',
  materialTitle: 'Переписать по другому материалу',
  materialLead: 'Отметьте, на чём должен основываться абзац. Его текущие источники отмечены; ниже — фрагменты, найденные по его содержанию.',
  materialCited: 'Текущие источники',
  materialFound: 'Найдено для этого абзаца',
  materialLoading: 'Поиск фрагментов…',
  materialFailed: (message: string) => `Не удалось найти фрагменты: ${message}`,
  materialNone: 'Больше ничего не найдено.',
  materialUse: (n: number) => `Переписать по отмеченному (${n})`,
  cancel: 'Отмена',
  retry: 'Повторить',
  rewriteFailed: (message: string) => `Не удалось переписать абзац: ${message}`,
  rewriteUndone: 'Переписывание отменено. Новая версия осталась в Space.',
};
