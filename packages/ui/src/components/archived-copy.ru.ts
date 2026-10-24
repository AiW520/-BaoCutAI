import { pluralForm } from '@baocut/protocol';
import type { ArchivedMessages } from './archived-copy.ts';

export const ru: ArchivedMessages = {
  title: 'Архивные сессии',
  intro: 'Архивные сессии скрыты из боковой панели. Их видео, файлы и изменения сохранены. Восстановленная сессия вернётся в свой проект.',
  search: 'Поиск по архивным сессиям',
  filterLabel: 'Фильтр по проекту',
  allProjects: 'Все проекты',
  noProject: 'Вне проекта',
  sessionCount: (n) => `${n} ${pluralForm('ru', n, { one: 'сессия', few: 'сессии', many: 'сессий', other: 'сессии' })}`,
  meta: (archived, active) => `Архивировано: ${archived} · Последняя активность: ${active}`,
  restore: 'Восстановить',
  restoreNamed: (title) => `Восстановить «${title}»`,
  deleteNamed: (title) => `Удалить «${title}»`,
  deleteAll: 'Удалить все',
  deleteAllTitle: (n) =>
    pluralForm('ru', n, {
      one: `Удалить ${n} архивную сессию?`,
      few: `Удалить все ${n} архивные сессии?`,
      many: `Удалить все ${n} архивных сессий?`,
      other: `Удалить ${n} архивной сессии?`,
    }),
  deleteAllBody: 'Их история удалится из OpenFox, выполняющиеся задачи сначала остановятся. Это действие нельзя отменить. Файлы в папках проектов не затронуты.',
  restored: (title) => `Восстановлено «${title}»`,
  open: 'Открыть',
  restoreFailed: (message) => `Не удалось восстановить: ${message}`,
  deleted: (title) => `Удалено «${title}»`,
  deletedAll: (n) =>
    pluralForm('ru', n, {
      one: `Удалена ${n} архивная сессия`,
      few: `Удалены ${n} архивные сессии`,
      many: `Удалено ${n} архивных сессий`,
      other: `Удалено ${n} архивной сессии`,
    }),
  deletedSome: (done, total) =>
    `Удалено ${done} из ${total} ${pluralForm('ru', total, { one: 'архивной сессии', few: 'архивных сессий', many: 'архивных сессий', other: 'архивной сессии' })}. Остальные удалить не удалось.`,
  emptyTitle: 'Архивных сессий нет',
  emptyBody: 'Чтобы переместить сессию сюда, архивируйте её из строки в боковой панели. Позже её можно восстановить.',
  noMatchTitle: 'Подходящих сессий нет',
  noMatchBody: 'Попробуйте другой запрос или верните фильтр проекта на «Все проекты».',
  banner: 'Эта сессия в архиве и скрыта из боковой панели.',
  viewAll: 'Показать весь архив',
  viewArchived: 'Показать архив',
};
