import { intlLocale, type SemanticCoverage, type SemanticEstimate, type SemanticIndexStatus } from '@baocut/protocol';
import { M } from './semantic-copy.ts';
import { fmtSize } from './task-facts.ts';

/*
 * 本机语义索引的状态与每个入口的那一句（创作辅助集成设计 §2.11、§3.11；设计稿 model-semantic.js）。
 *
 * - 每个入口自己说明状态：置灰或退回时写一句原因，能去设置时给入口；不弹全局警告。
 * - 索引在更新或暂停时是不阻塞的提醒；用电池、过热降频自动停下时写原因（检索规格 §16.1）。
 * - 还要多久按 `indexStatus.estimates` 写（§13.2）：量过的速度、参考速度、还没有速度三种说法。
 * - 完整性按通道分别写（「文字 2/3 部视频（1 部在排队）」），不是一根百分比进度条；设置里建索引的进度是一根按估算时间合的
 *   条，下面也按路写计数（`indexProgressView`）。
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

/** 索引还没跟上：有在排队的，或已建的落后于当前版本。只看文字一路（各入口用的都是它）。 */
export function indexUpdating(status: Pick<SemanticIndexStatus, 'coverage'> | null): boolean {
  const text = status ? textCoverage(status) : null;
  return !!text && (text.pending > 0 || text.stale > 0);
}

/** 画面一路还没跟上（打开了画面，或要过某些视频的画面）：设置页的状态与轮询看它，各入口不看。 */
export function visualUpdating(status: Pick<SemanticIndexStatus, 'coverage'> | null): boolean {
  const visual = status?.coverage.find((c) => c.channel === 'visual') ?? null;
  return !!visual && visual.eligible > 0 && (visual.pending > 0 || visual.stale > 0);
}

/**
 * 一个入口此刻那一句。`reason` 是这次结果自己带回来的退回原因（搜索的 `degraded.reason`、翻译记忆的 `summary.memory.reason`），
 * 给了就以它为准；否则看总体状态。能用且最新时为 null；状态还没取到时也是 null（不先吓人）。
 */
export function entryNote(entry: SemanticEntry, status: SemanticIndexStatus | null, reason?: string | null): SemanticNoteView | null {
  const blocking = entry === 'topic' || entry === 'shorts';
  const why = reason ?? (status && (status.model === null ? (status.reason ?? 'MODEL_NOT_INSTALLED') : status.reason));
  if (why) {
    if (PARTIAL.has(why)) return { tone: 'notice', text: status?.paused ? pausedNote(status) : M.note.stale, settingsLink: false, blocking: false };
    const e = M.entry[entry];
    const text = why === 'MODEL_NOT_INSTALLED' ? e.not : M.note.degraded(e.fallback, reasonText(why));
    return { tone: 'info', text, settingsLink: FIXABLE.has(why), blocking };
  }
  if (!status) return null;
  if (status.paused) return { tone: 'notice', text: pausedNote(status), settingsLink: status.pauseReason !== 'thermal', blocking: false };
  if (indexUpdating(status)) return { tone: 'notice', text: M.note.stale, settingsLink: false, blocking: false };
  return null;
}

/** 停着时那一句：用电池、过热降频各写原因与什么时候接着建；用户暂停（或旧的 Runtime 没给原因）写已暂停。 */
export function pausedNote(status: Pick<SemanticIndexStatus, 'pauseReason'>): string {
  return status.pauseReason === 'battery' ? M.note.battery : status.pauseReason === 'thermal' ? M.note.thermal : M.note.paused;
}

/** 估时给人看：不写秒，一小时以上写一位小数的小时。 */
export function etaTime(seconds: number): string {
  if (seconds < 60) return M.settings.eta.lessThanMinute;
  if (seconds < 3600) return M.settings.eta.minutes(Math.round(seconds / 60));
  return M.settings.eta.hours((Math.round(seconds / 360) / 10).toString());
}

/** 一路还要多久那一句；没有待建的视频时 null。 */
export function etaLine(estimate: SemanticEstimate | null | undefined): string | null {
  if (!estimate || estimate.videos === 0) return null;
  const line =
    estimate.seconds === null
      ? M.settings.eta.noRate(estimate.videos)
      : estimate.basis === 'default'
        ? M.settings.eta.reference(estimate.videos, etaTime(estimate.seconds))
        : M.settings.eta.measured(estimate.videos, etaTime(estimate.seconds));
  return estimate.unknownDuration > 0 && estimate.seconds !== null ? M.settings.eta.withUnknown(line, estimate.unknownDuration) : line;
}

export interface IndexProgressView {
  /** 0–100；有一路还估不出时间时 null（条不定量）。 */
  value: number | null;
  /**
   * 按路的计数：「讲话内容 8/12 部视频（当前这部 35%） · 画面 0/825 帧（讲话内容建完后开始）」。只有讲话内容正在建的那一部写
   * 百分比（一部长视频要建几分钟，只写部数时一直不动），整体不写。
   */
  line: string;
  /** 两路合起来还要多久（等讲话内容的时间也算在里面）；停着时写原因。 */
  eta: string;
}

/**
 * 「状态」下面那根合并的进度条（检索规格 §13.2）。讲话内容先建，画面等它建完再建，所以两路合在一根条里，不在画面那一行
 * 另画一根（那根在讲话内容建完之前一直是 0）。
 *
 * - 条按估算时间合：讲话内容按部视频、画面按帧，单位不能相加；值 = 两路已建的估算秒 ÷（已建 + 还剩）。还剩的取 `estimates`
 *   里没开 `ifEnabled` 的那一项，有一路还估不出时间时不定量。
 * - 计数按路写；讲话内容正在建的那一部写它的句群编到百分之几（`progress.text.current`）；讲话内容还没建完时画面写明排在后面。
 * - 两路都建完、或旧的 Runtime 没给 `progress` 时 null。
 */
export function indexProgressView(
  status: Pick<SemanticIndexStatus, 'progress' | 'estimates' | 'paused' | 'pauseReason'>,
): IndexProgressView | null {
  const p = status.progress;
  if (!p) return null;
  const lanes = [
    p.text ? { channel: 'text' as const, ...p.text } : null,
    p.visual ? { channel: 'visual' as const, ...p.visual } : null,
  ].filter((l) => l !== null);
  const left = lanes.filter((l) => l.done < l.total);
  if (left.length === 0) return null;
  const P = M.settings.progress;
  const count = new Intl.NumberFormat(intlLocale());
  const textBusy = !!p.text && p.text.done < p.text.total;
  const counts: string[] = [];
  if (p.text) {
    const t = p.text;
    const line = P.text(count.format(t.done), count.format(t.total));
    const current = textBusy && !status.paused && t.current && t.current.total > 0 ? t.current : null;
    counts.push(t.done >= t.total ? P.textDone : current ? P.textCurrent(line, Math.floor((current.done / current.total) * 100)) : line);
  }
  if (p.visual) {
    const v = p.visual;
    const line = P.visual(count.format(v.done), count.format(v.total));
    counts.push(v.done >= v.total ? P.visualDone : !textBusy ? line : v.done > 0 ? P.continuesAfter(line) : P.startsAfter(line));
  }
  const estimates = left.map((l) => status.estimates?.find((e) => e.channel === l.channel && !e.ifEnabled) ?? null);
  const timed = estimates.every((e) => e !== null && e.seconds !== null);
  const leftSeconds = timed ? estimates.reduce((sum, e) => sum + (e?.seconds ?? 0), 0) : null;
  const doneSeconds = lanes.reduce((sum, l) => sum + (l.doneSeconds ?? 0), 0);
  const value = leftSeconds === null || doneSeconds + leftSeconds <= 0 ? null : (doneSeconds / (doneSeconds + leftSeconds)) * 100;
  let eta: string;
  if (status.paused) eta = P.paused[status.pauseReason ?? 'user'];
  else if (leftSeconds === null) eta = P.noRate;
  else {
    const bases = estimates.map((e) => e?.basis);
    const basis = bases.every((b) => b === 'measured') ? P.basis.measured : bases.every((b) => b !== 'measured') ? P.basis.reference : P.basis.mixed;
    eta = P.eta(etaTime(leftSeconds), basis, p.unknownDuration > 0 ? P.unknown(p.unknownDuration) : null);
  }
  return { value, line: counts.join(P.separator), eta };
}

/**
 * 一个范围的文字完整性（§2.11）：「文字已就绪」「文字 2/3 部视频（1 部在排队、1 部没有文稿）」。没有文稿与排除在语义索引外
 * （设置里排除的项目、Space 里设了不索引的视频）分开写：前者要先转写，后者要去恢复。
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

/** 一个范围的画面完整性：「画面已就绪」「画面 2/5 部视频（3 部在排队）」；这个范围里没有要建画面的视频时 null。 */
export function visualCoverageLine(coverage: readonly SemanticCoverage[]): string | null {
  const visual = coverage.find((c) => c.channel === 'visual');
  if (!visual || visual.eligible === 0) return null;
  const details = [
    visual.pending ? M.coverage.queued(visual.pending) : null,
    visual.failed ? M.coverage.failed(visual.failed) : null,
    visual.stale ? M.coverage.outdated(visual.stale) : null,
  ].filter((d): d is string => d !== null);
  if (details.length === 0) return M.coverage.visualReady;
  return M.coverage.visualPartial(visual.indexed, visual.eligible, details.join(M.coverage.separator));
}

export type IndexState = 'unavailable' | 'paused' | 'updating' | 'ready';

/** 设置页「状态」那一格。 */
export function indexState(status: SemanticIndexStatus): IndexState {
  if (status.model === null || status.reason === 'INDEX_NOT_READY') return 'unavailable';
  if (status.paused) return 'paused';
  return indexUpdating(status) || visualUpdating(status) ? 'updating' : 'ready';
}

/** 打开画面之前那一句（§13.2，`estimates` 里 `ifEnabled` 的画面一项）：多少视频、多少帧、首次要多久、向量多大；没有要建的时 null。 */
export function visualCostLine(estimate: SemanticEstimate | null | undefined): string | null {
  if (!estimate || estimate.videos === 0) return null;
  const c = M.settings.cost;
  if (!estimate.frames) return c.noLength(estimate.videos);
  const vectors = estimate.vectorBytes === null ? null : c.vectors(estimate.vectorBytes < 1024 * 1024 ? null : fmtSize(estimate.vectorBytes));
  const parts = [
    c.head(estimate.videos, etaTime(estimate.sourceSeconds), estimate.frames),
    estimate.unknownDuration > 0 ? c.unknown(estimate.unknownDuration) : null,
    estimate.seconds === null ? null : c.firstRun(etaTime(estimate.seconds), estimate.basis === 'measured'),
    vectors,
  ].filter((p): p is string => p !== null);
  return c.cacheNote(parts.join(c.separator));
}

/** 「运行在」的设备：Worker 报的 GPU 名（`metal`，以及 `cuda`、`vulkan`）都写 GPU（检索规格 §4.4），别的照原样大写。 */
export function deviceName(device: string): string {
  return device === 'metal' || device === 'cuda' || device === 'vulkan' ? 'GPU' : device.toUpperCase();
}
