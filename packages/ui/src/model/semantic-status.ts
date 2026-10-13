import type { SemanticCoverage, SemanticIndexStatus } from '@baocut/protocol';
import { M } from './semantic-copy.ts';

/*
 * 本机语义索引的状态与每个入口的那一句（创作辅助集成设计 §2.11、§3.11；设计稿 model-semantic.js）。
 *
 * - 每个入口自己说明状态：置灰或退回时写一句原因，能去设置时给入口；不弹全局警告。
 * - 索引在更新或暂停时是不阻塞的提醒。
 * - 完整性按通道分别写（「文字 2/3 部视频（1 部在排队）」），不是一根百分比进度条。
 *
 * 原因码是 `SemanticReason`，另有翻译记忆的 `DISABLED`（设置关掉）与 `MEMORY_UNAVAILABLE`（查找失败）；认不出的原因码照写，
 * 不吞掉。
 */

/** 用到语义索引的入口：Space 搜索、按主题选材、术语候选、翻译记忆、重录候选、剪成短视频的主题、相关视频。 */
export type SemanticEntry = 'search' | 'topic' | 'terms' | 'tm' | 'retakes' | 'shorts' | 'related';

export interface SemanticNoteView {
  /** `info`：退回了另一条路或用不了；`notice`：照常可用，只是索引还没跟上。 */
  tone: 'info' | 'notice';
  text: string;
  /** 给不给「去设置」：装模型、恢复索引能解决时给；这台电脑跑不了、只是索引在更新时不给。 */
  settingsLink: boolean;
  /** 这个入口没有退路，整个置灰（按主题选材、短视频的主题）。 */
  blocking: boolean;
}

/** 装模型或在设置里处理能解决的原因。 */
const FIXABLE = new Set(['MODEL_NOT_INSTALLED', 'MODEL_UNAVAILABLE', 'PROFILE_INCOMPATIBLE', 'INDEX_NOT_READY', 'DISABLED']);
/** 照常可用、只是索引还没跟上：不阻塞的提醒。 */
const PARTIAL = new Set(['INDEX_PARTIAL', 'STALE_REVISION']);

/** 原因码给人看的一句；认不出的原因码照写。 */
export function reasonText(reason: string): string {
  const known = (M.reason as Record<string, string>)[reason];
  return typeof known === 'string' ? known : M.unknownReason(reason);
}

function textCoverage(status: Pick<SemanticIndexStatus, 'coverage'>): SemanticCoverage | null {
  return status.coverage.find((c) => c.channel === 'text') ?? null;
}

/** 索引还没跟上：有在排队的，或已建的落后于当前版本。 */
export function indexUpdating(status: Pick<SemanticIndexStatus, 'coverage'> | null): boolean {
  const text = status ? textCoverage(status) : null;
  return !!text && (text.pending > 0 || text.stale > 0);
}

/**
 * 一个入口此刻那一句。`reason` 是这次结果自己带回来的退回原因（搜索的 `degraded.reason`、翻译记忆的 `summary.memory.reason`），
 * 给了就以它为准；否则看总体状态。能用且最新时为 null；状态还没取到时也是 null（不先吓人）。
 */
export function entryNote(entry: SemanticEntry, status: SemanticIndexStatus | null, reason?: string | null): SemanticNoteView | null {
  const blocking = entry === 'topic' || entry === 'shorts';
  const why = reason ?? (status && (status.model === null ? (status.reason ?? 'MODEL_NOT_INSTALLED') : status.reason));
  if (why) {
    if (PARTIAL.has(why)) return { tone: 'notice', text: status?.paused ? M.note.paused : M.note.stale, settingsLink: false, blocking: false };
    const e = M.entry[entry];
    const text = why === 'MODEL_NOT_INSTALLED' ? e.not : M.note.degraded(e.fallback, reasonText(why));
    return { tone: 'info', text, settingsLink: FIXABLE.has(why), blocking };
  }
  if (!status) return null;
  if (status.paused) return { tone: 'notice', text: M.note.paused, settingsLink: true, blocking: false };
  if (indexUpdating(status)) return { tone: 'notice', text: M.note.stale, settingsLink: false, blocking: false };
  return null;
}

/**
 * 一个范围的文字完整性（§2.11）：「文字已就绪」「文字 2/3 部视频（1 部在排队、1 部没有文稿）」。没有文稿与没纳入语义索引（设置里
 * 只建部分项目）分开写：前者要先转写，后者要去设置。
 */
export function coverageLine(coverage: readonly SemanticCoverage[]): string {
  const text = coverage.find((c) => c.channel === 'text');
  if (!text) return M.coverage.none;
  const excluded = text.excluded ?? 0;
  if (text.eligible === 0) return excluded > 0 ? M.coverage.notIncluded : text.missingInput > 0 ? M.coverage.noTranscripts : M.coverage.empty;
  const absent = [text.missingInput ? M.coverage.missing(text.missingInput) : null, excluded ? M.coverage.excluded(excluded) : null].filter(
    (d): d is string => d !== null,
  );
  const details = [
    text.pending ? M.coverage.queued(text.pending) : null,
    text.failed ? M.coverage.failed(text.failed) : null,
    text.stale ? M.coverage.outdated(text.stale) : null,
    ...absent,
  ].filter((d): d is string => d !== null);
  if (text.indexed >= text.eligible && text.pending === 0 && text.failed === 0 && text.stale === 0) {
    return absent.length > 0 ? M.coverage.readyWith(absent.join(M.coverage.separator)) : M.coverage.ready;
  }
  return M.coverage.partial(text.indexed, text.eligible, details.join(M.coverage.separator));
}

export type IndexState = 'unavailable' | 'paused' | 'updating' | 'ready';

/** 设置页「状态」那一格。 */
export function indexState(status: SemanticIndexStatus): IndexState {
  if (status.model === null || status.reason === 'INDEX_NOT_READY') return 'unavailable';
  if (status.paused) return 'paused';
  return indexUpdating(status) ? 'updating' : 'ready';
}
