import type { SemanticIndexStatus, SemanticVideoChannelState, SemanticVideoIndex, SpaceEntry } from '@baocut/protocol';
import { M } from './semantic-copy.ts';

/**
 * Space 条目上的语义索引标志（检索规格 §9.1、§13.2；集成设计 §2.10；原型 model-space-index.js `entryState`）。
 *
 * - 只给 BaoCut 视频与成片标；其他条目（视频素材、图片、文档……）这一版不建索引，不标。没装模型或这台电脑不支持时都不标。
 * - 成片不另建索引：导出它的视频已经按讲话内容与画面建过，标「不需要索引」并说是哪部视频（不问 Runtime）。
 * - 排除的（所在项目在设置里排除了、单个视频设了「不索引」）标「不索引」：项目排除的恢复要去设置，单个的在条目上恢复。
 * - 其余取最需要人注意的那一路：失败 > 过期 > 在建 > 排队 > 已建；两路都没有可建的写「没有可索引的内容」（只在查看框里写）。
 */

export type EntryIndexKey = 'failed' | 'stale' | 'indexing' | 'queued' | 'indexed' | 'empty' | 'notNeeded' | 'excluded';
export type EntryIndexTone = 'negative' | 'notice' | 'informative' | 'neutral' | 'positive';

export interface EntryIndexState {
  key: EntryIndexKey;
  label: string;
  tone: EntryIndexTone;
  /** 每一路一句（「讲话内容：已索引」），查看框与悬停说明用；排除、成片时为空。 */
  lines: string[];
  /** 为什么是这个状态（排除、成片、没有可建的）；其余 null。 */
  why: string | null;
  /** 画面在建时的百分比。 */
  pct: number | null;
  canReindex: boolean;
  canExclude: boolean;
  canInclude: boolean;
}

const TONE: Record<EntryIndexKey, EntryIndexTone> = {
  failed: 'negative',
  stale: 'notice',
  indexing: 'informative',
  queued: 'neutral',
  indexed: 'positive',
  empty: 'neutral',
  notNeeded: 'neutral',
  excluded: 'neutral',
};
const ORDER: EntryIndexKey[] = ['failed', 'stale', 'indexing', 'queued', 'indexed'];

/** 条目指向的视频（视频条目的 `ref.videoId`）；不是视频条目时 null。 */
export function entryVideoId(entry: SpaceEntry): string | null {
  return entry.kind === 'video' && entry.ref && 'videoId' in entry.ref ? entry.ref.videoId : null;
}

/** 语义索引在这台电脑上用得上（装了模型）：用不上时条目都不标。 */
export function indexUsable(status: SemanticIndexStatus | null): boolean {
  return status?.model != null && status.channels.text.available;
}

export function entryIndexState(
  entry: SpaceEntry,
  options: {
    status: SemanticIndexStatus | null;
    /** 这部视频的状态（`space.indexStatus` 的 `videos`）；还没取到时 null。 */
    video: SemanticVideoIndex | null;
    /** 所在项目的名字（项目排除时写进说明）。 */
    projectName?: string | null;
    /** 成片：导出它的视频的名字。 */
    sourceName?: string | null;
  },
): EntryIndexState | null {
  if (entry.user.trashedAt !== null || !indexUsable(options.status)) return null;
  const S = M.spaceIndex;
  const off = { lines: [], pct: null, canReindex: false, canExclude: false, canInclude: false };
  if (entry.kind === 'export' && entry.origin?.videoId) {
    return { ...off, key: 'notNeeded', label: S.state.notNeeded, tone: TONE.notNeeded, why: S.whyExport(options.sourceName ?? null) };
  }
  const video = options.video;
  if (entry.kind !== 'video' || !video) return null;
  if (video.excludedBy === 'project') {
    return { ...off, key: 'excluded', label: S.state.excluded, tone: TONE.excluded, why: S.whyProject(options.projectName ?? null) };
  }
  if (video.excludedBy === 'video') {
    return { ...off, key: 'excluded', label: S.state.excluded, tone: TONE.excluded, why: S.whyVideo, canInclude: true };
  }
  const visualOn = options.status?.channels.visual.enabled === true && options.status.channels.visual.available;
  const channels: { name: string; state: SemanticVideoChannelState | 'off' }[] = [{ name: S.channel.text, state: video.text }];
  if (video.visual !== null) channels.push({ name: S.channel.visual, state: visualOn || video.visual !== 'excluded' ? video.visual : 'off' });
  const pct = video.visualFrames && video.visualFrames.total > 0 ? Math.round((video.visualFrames.done / video.visualFrames.total) * 100) : null;
  const lines = channels.map((c) =>
    S.line(c.name, c.state === 'indexing' && c.name === S.channel.visual && pct !== null ? S.withPct(S.channelState.indexing, pct) : S.channelState[c.state]),
  );
  const live: string[] = channels.map((c) => c.state);
  const top = ORDER.find((k) => live.includes(k));
  if (!top) {
    return { ...off, key: 'empty', label: S.state.empty, tone: TONE.empty, lines, why: visualOn ? S.whyNoTranscript : S.whyNoTranscriptVisualOff, canExclude: true };
  }
  return {
    key: top,
    label: S.state[top],
    tone: TONE[top],
    lines,
    why: null,
    pct: top === 'indexing' && video.visual === 'indexing' && video.text !== 'indexing' ? pct : null,
    canReindex: true,
    canExclude: true,
    canInclude: false,
  };
}

/** 标志的悬停说明与无障碍名：「语义索引：排队中 · 讲话内容：已索引；画面：排队中」。 */
export function entryIndexTitle(state: EntryIndexState): string {
  const tail = state.why ?? state.lines.join(M.spaceIndex.lineSeparator);
  return M.spaceIndex.title(state.pct !== null ? M.spaceIndex.withPct(state.label, state.pct) : state.label, tail || null);
}
