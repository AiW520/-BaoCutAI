import { pluralForm } from '@baocut/protocol';
import type { WorkbenchMessages } from './home-workbench-copy.ts';

export const ru: WorkbenchMessages = {
  eyebrow: "OpenFox · Творческая мастерская",
  title: "Превратите идею в новое видео.",
  intro: "Опишите идею, добавьте материалы или продолжите работу.",
  recentTitle: "Недавние проекты",
  recentHint: "Продолжите с того места, где остановились",
  browse: "Все работы",
  continueVideo: "Продолжить монтаж",
  continueSession: "Продолжить сеанс",
  startSession: "Начать сеанс",
  empty: "Создайте проект, чтобы хранить видео и творческие сеансы вместе.",
  videos: (n: number) => `${n} ${pluralForm('ru', n, { one: "видео", few: "видео", other: "видео" })}`,
  sessions: (n: number) => `${n} ${pluralForm('ru', n, { one: "сеанс", few: "сеанса", other: "сеансов" })}`,
};
