import { pluralForm } from '@baocut/protocol';
import type { WorkbenchMessages } from './home-workbench-copy.ts';

export const ja: WorkbenchMessages = {
  eyebrow: "OpenFox · 制作ワークスペース",
  title: "アイデアを、次の動画へ。",
  intro: "アイデアを入力し、素材を追加するか、前回の続きを始めましょう。",
  recentTitle: "最近のプロジェクト",
  recentHint: "前回の続きから再開",
  browse: "すべての作品を見る",
  continueVideo: "編集を続ける",
  continueSession: "セッションを続ける",
  startSession: "セッションを開始",
  empty: "プロジェクトを作成して動画と制作セッションをまとめましょう。",
  videos: (n: number) => `${n} ${pluralForm('ja', n, { other: "本の動画" })}`,
  sessions: (n: number) => `${n} ${pluralForm('ja', n, { other: "件のセッション" })}`,
};
