import type { WritingTopicMessages } from './writing-topic-copy.ts';

const many = (n: number, one: string, few: string, other: string) => {
  const d = n % 10;
  const t = n % 100;
  return d === 1 && t !== 11 ? one : d >= 2 && d <= 4 && (t < 12 || t > 14) ? few : other;
};

export const ru: WritingTopicMessages = {
  scopeTopic: 'По теме',
  topicLabel: 'Тема',
  topicPlaceholder: 'Необязательно, например: как мы выбирали модель',
  topicHow: 'Фрагменты, связанные с темой, выбираются на этом компьютере и отправляются модели по порядку времени. Без темы используется запрос.',
  topicPicked: (n: number, chapters: number) =>
    `Выбрано ${n} ${many(n, 'фрагмент', 'фрагмента', 'фрагментов')}${chapters ? ` из ${chapters} ${many(chapters, 'главы', 'глав', 'глав')}` : ''}, по порядку времени`,
  topicNeedsTopic: 'Напишите тему, чтобы увидеть, какие фрагменты будут выбраны.',
  topicLoading: 'Выбираем фрагменты…',
  topicNone: 'Ничего связанного не найдено. Попробуйте другие слова.',
  topicFailed: (message: string) => `Не удалось выбрать фрагменты: ${message}`,
  topicView: 'Посмотреть выбранные фрагменты',
  topicDialogTitle: 'Выбранные фрагменты',
  topicDialogLead: 'Выбраны на этом компьютере по теме, по порядку времени. Снимите отметку с того, что модели видеть не нужно. Это решает только, что прочитает модель; расшифровка не меняется.',
  topicWeak: 'Слабо связано',
  topicUse: (n: number) => `Использовать ${n}`,
  cancel: 'Отмена',
  topicDefaultLong: 'Видео длиннее 30 минут, поэтому сначала выбрано «По теме».',
  topicDefaultShort: 'Видео короткое, поэтому сначала выбран весь текст. Для видео длиннее 30 минут сначала выбирается «По теме».',
  contextTopic: (n: number, chapters: number) =>
    `расшифровка: ${n} ${many(n, 'фрагмент', 'фрагмента', 'фрагментов')} (выбраны по теме${chapters ? `, ${chapters} ${many(chapters, 'глава', 'главы', 'глав')}` : ''})`,
  contextTopicPending: 'фрагменты расшифровки, выбранные по теме',
  contextSeries: (n: number) => `серия из ${n} ${many(n, 'видео', 'видео', 'видео')}`,
  seriesLabel: 'Видео',
  seriesOnlyThis: 'Только это',
  seriesWith: (names: string) => `Это + ${names}`,
  seriesAdd: 'Добавить из этого проекта…',
  seriesChange: 'Изменить…',
  seriesTitle: 'Видео для текста',
  seriesLead: (max: number) =>
    `Видео из того же проекта. Фрагменты выбираются из всех, в источниках указано видео; результат — один документ. Можно добавить ещё до ${max}.`,
  seriesThis: (name: string) => `${name} (это)`,
  seriesDerived: 'Вырезано из другого видео, его содержимое уже есть в исходном',
  seriesNone: 'В этом проекте нет других видео.',
  seriesLoading: 'Загружаем видео…',
  seriesFailed: (message: string) => `Не удалось получить список видео: ${message}`,
  seriesDone: 'Готово',
  boundaryLabel: 'Границы',
  boundaryTopic: 'Определять по теме',
  boundaryModel: 'Решает модель',
  boundaryTopicSub: 'Сначала на этом компьютере ищутся смены темы; модель делит и называет главы только в этих местах. При повторном запуске меняются названия, а не границы.',
  boundaryModelSub: 'Весь текст отправляется модели, она сразу решает границы и названия. Длинные видео при каждом запуске могут делиться по-разному.',
  boundaryOff: 'Для определения по теме нужна локальная семантическая модель, поэтому границы решает модель.',
};
