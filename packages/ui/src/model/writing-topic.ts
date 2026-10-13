import { AI_TOOL_SERIES_MAX, type AiToolSelection, type Id, type SemanticIndexStatus, type SpaceEntry, type SpaceRelevantChunk } from '@baocut/protocol';
import { entryNote } from './semantic-status.ts';

/*
 * 写作「按主题」选材、系列文章与生成章节的边界（创作辅助集成设计 §2.2、§2.4；原型 model-tool-semantic.js `topicDefault`、
 * `chaptersCovered`，panel-aitools-topic.jsx）。只在直接调模型时用：选材由 Runtime 的 `ai-tool` 流程做（`selection`、
 * `videoIds`、`boundaries`），交给 Agent 时 Agent 自己用 `speech_relevant`。
 */

/** 视频超过 30 分钟时缺省按主题（设计 §4 待评审第 2 条的原型提议）。 */
export const TOPIC_LONG_SECONDS = 30 * 60;

/** 按主题、系列给写作与发布类：写总结、写博客、起标题、写简介（设计 §2.2 第 5 条；原型 2026-10-13 起标题与写简介也有这两行）。 */
export function topicTool(tool: string): boolean {
  return tool === 'summary' || tool === 'blog' || tool === 'title' || tool === 'desc';
}

/** 本机语义能不能用来按主题选材：状态取到了，且这一入口没有被置灰（没装模型、索引没建好、设置关掉）。 */
export function topicUsable(status: SemanticIndexStatus | null): boolean {
  return !!status && status.model !== null && !entryNote('topic', status)?.blocking;
}

/** 缺省范围：能用且视频超过 30 分钟时按主题，否则整篇。没装模型时永远不缺省按主题。 */
export function topicDefault(o: { usable: boolean; duration: number }): 'topic' | 'all' {
  return o.usable && o.duration > TOPIC_LONG_SECONDS ? 'topic' : 'all';
}

/** 交给流程的 `selection`：写了主题就用它作意图句（同预览查的那句），否则让流程用提示词；勾掉的句群作 `exclude`。 */
export function topicSelection(o: { topic: string; excluded: ReadonlySet<string> }): AiToolSelection {
  const intent = o.topic.trim();
  return { mode: 'topic', ...(intent ? { intent } : {}), ...(o.excluded.size ? { exclude: [...o.excluded] } : {}) };
}

/** 挑中的句群（去掉勾掉的）与它们覆盖几章。 */
export function pickedChunks(chunks: readonly SpaceRelevantChunk[], excluded: ReadonlySet<string>): { chunks: SpaceRelevantChunk[]; chapters: number } {
  const kept = chunks.filter((c) => !excluded.has(c.chunkId));
  return { chunks: kept, chapters: new Set(kept.map((c) => (c.chapter ? `${c.videoId}\u0000${c.chapter}` : null)).filter((k) => k !== null)).size };
}

export interface SeriesVideo {
  videoId: Id;
  name: string;
  /** 切出的短视频：内容已在来源视频里，列出但不可选。 */
  derived: boolean;
}

/** 同一项目里可以一起写的视频（`space.list` 的视频条目）：不含这部、不含回收站里的，按名字排。 */
export function seriesVideos(entries: readonly SpaceEntry[], videoId: Id): SeriesVideo[] {
  const out: SeriesVideo[] = [];
  for (const e of entries) {
    if (e.kind !== 'video' || !e.ref || !('videoId' in e.ref) || e.ref.videoId === videoId || e.user.trashedAt) continue;
    out.push({ videoId: e.ref.videoId, name: e.user.displayName ?? e.name, derived: e.origin?.source === 'derived' });
  }
  return out.sort((a, b) => a.name.localeCompare(b.name));
}

/** 这部之外最多还能选几部。 */
export const SERIES_OTHERS_MAX = AI_TOOL_SERIES_MAX - 1;

/** 勾一部或去掉一部；满了不再加。 */
export function toggleSeries(picked: readonly Id[], videoId: Id, on: boolean): Id[] {
  if (!on) return picked.filter((id) => id !== videoId);
  if (picked.includes(videoId) || picked.length >= SERIES_OTHERS_MAX) return [...picked];
  return [...picked, videoId];
}

/** 生成章节的边界缺省：能用本机语义时按话题检测，否则由模型决定。 */
export function boundaryDefault(usable: boolean): 'topic' | 'model' {
  return usable ? 'topic' : 'model';
}
