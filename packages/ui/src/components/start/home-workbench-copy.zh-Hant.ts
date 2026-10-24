import { pluralForm } from '@baocut/protocol';
import type { WorkbenchMessages } from './home-workbench-copy.ts';

export const zhHant: WorkbenchMessages = {
  eyebrow: "OpenFox · 創作工作台",
  title: "把靈感，變成下一部作品。",
  intro: "描述你的想法，拖入素材，或繼續上次的創作。",
  recentTitle: "最近的專案",
  recentHint: "從上次停下的地方繼續",
  browse: "瀏覽所有作品",
  continueVideo: "繼續剪輯",
  continueSession: "繼續對話",
  startSession: "開始對話",
  empty: "建立專案，集中管理影片和創作對話。",
  videos: (n: number) => `${n} ${pluralForm('zh-Hant', n, { other: "部影片" })}`,
  sessions: (n: number) => `${n} ${pluralForm('zh-Hant', n, { other: "個對話" })}`,
};
