import { pluralForm } from '@baocut/protocol';
import type { WorkbenchMessages } from './home-workbench-copy.ts';

export const zhHans: WorkbenchMessages = {
  eyebrow: "Tuzi · 创作工作台",
  title: "把灵感，变成下一部作品。",
  intro: "描述你的想法，拖入素材，或继续上次的创作。",
  recentTitle: "最近的项目",
  recentHint: "从上次停下的地方继续",
  browse: "浏览所有作品",
  continueVideo: "继续剪辑",
  continueSession: "继续会话",
  startSession: "开始会话",
  empty: "创建一个项目，集中管理视频和创作会话。",
  videos: (n: number) => `${n} ${pluralForm('zh-Hans', n, { other: "部视频" })}`,
  sessions: (n: number) => `${n} ${pluralForm('zh-Hans', n, { other: "个会话" })}`,
};
