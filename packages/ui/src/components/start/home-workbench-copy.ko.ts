import { pluralForm } from '@baocut/protocol';
import type { WorkbenchMessages } from './home-workbench-copy.ts';

export const ko: WorkbenchMessages = {
  eyebrow: "OpenFox · 창작 작업 공간",
  title: "아이디어를 다음 영상으로.",
  intro: "아이디어를 적거나 미디어를 추가하고, 이전 작업을 이어가세요.",
  recentTitle: "최근 프로젝트",
  recentHint: "이전 작업 이어가기",
  browse: "모든 작업 보기",
  continueVideo: "편집 계속",
  continueSession: "세션 계속",
  startSession: "세션 시작",
  empty: "프로젝트를 만들어 영상과 창작 세션을 함께 관리하세요.",
  videos: (n: number) => `${n} ${pluralForm('ko', n, { other: "개 영상" })}`,
  sessions: (n: number) => `${n} ${pluralForm('ko', n, { other: "개 세션" })}`,
};
