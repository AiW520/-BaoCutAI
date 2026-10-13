/**
 * 章节边界候选（创作辅助集成设计 §3.6）：时间线上相邻句群的文档向量之间的余弦距离是一条「话题漂移」序列；候选是其中的局部
 * 极大值且超过自适应阈值（中位数 + k·MAD）的位置，再按最短章节长度与最多章节数收拢。只做确定性的数学：同一组向量结果不变，
 * 生成章节时文本模型只在候选处分章（可以合并，不能新增）。
 *
 * k、最短章节长度都是待校准的默认值（`semantic-thresholds.json` 的 `chapterBoundary`，UNCALIBRATED）。
 */

import { SEMANTIC_THRESHOLDS } from '../space/semantic/thresholds.ts';

/** 时间线上的一个句群：起止（秒，`sequence` 时钟）与 L2 归一化的文档向量。 */
export interface BoundaryChunk {
  start: number;
  end: number;
  vector: Float32Array;
}

export interface BoundaryOptions {
  /** 阈值 = 中位数 + k·MAD。 */
  k: number;
  /** 两个边界（以及边界与时间线首尾）之间至少隔这么多秒。 */
  minChapterSec: number;
  /** 最多这么多章（边界数 + 1）；超出时留漂移最大的。 */
  maxChapters: number;
}

/** 阈值高出中位数的最小余量（余弦距离）：只为挡住浮点误差，不是话题判断。 */
const MIN_MARGIN = 1e-4;

const TUNED = SEMANTIC_THRESHOLDS.chapterBoundary;
export const DEFAULT_BOUNDARY_OPTIONS: BoundaryOptions = { k: TUNED.k.value, minChapterSec: TUNED.minChapterSec.value, maxChapters: TUNED.maxChapters.value };

/** 一处候选：新章节从 `at`（后一个句群的起点）开始；`drift` 是这里的余弦距离，`score` 是它超出阈值多少个 MAD。 */
export interface BoundaryCandidate {
  at: number;
  /** 边界前后的句群序号（`chunks` 里的下标）：`before + 1 === after`。 */
  before: number;
  after: number;
  drift: number;
  score: number;
}

export interface BoundaryResult {
  candidates: BoundaryCandidate[];
  /** 漂移序列的中位数、MAD 与阈值（诊断与界面上的「为什么在这里」）。 */
  median: number;
  mad: number;
  threshold: number;
}

/** 余弦距离（向量已归一化：1 − 点积）。 */
function distance(a: Float32Array, b: Float32Array): number {
  const n = Math.min(a.length, b.length);
  let dot = 0;
  for (let i = 0; i < n; i++) dot += a[i]! * b[i]!;
  return 1 - dot;
}

function median(values: readonly number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = sorted.length >> 1;
  return sorted.length % 2 === 1 ? sorted[mid]! : (sorted[mid - 1]! + sorted[mid]!) / 2;
}

export function chapterBoundaryCandidates(chunks: readonly BoundaryChunk[], options: Partial<BoundaryOptions> = {}): BoundaryResult {
  const { k, minChapterSec, maxChapters } = { ...DEFAULT_BOUNDARY_OPTIONS, ...options };
  const drift: number[] = [];
  for (let i = 0; i + 1 < chunks.length; i++) drift.push(distance(chunks[i]!.vector, chunks[i + 1]!.vector));
  const m = median(drift);
  const mad = median(drift.map((d) => Math.abs(d - m)));
  // 漂移几乎都一样时 MAD 接近零：阈值至少高出中位数一点（浮点误差之外），没有转折就没有候选。
  const threshold = m + Math.max(k * mad, MIN_MARGIN);
  const peaks: BoundaryCandidate[] = [];
  for (let i = 0; i < drift.length; i++) {
    const d = drift[i]!;
    const left = i > 0 ? drift[i - 1]! : -Infinity;
    const right = i + 1 < drift.length ? drift[i + 1]! : -Infinity;
    // 局部极大：不小于两侧，平台只取第一个。
    if (!(d > threshold && d >= right && d > left)) continue;
    peaks.push({ at: chunks[i + 1]!.start, before: i, after: i + 1, drift: d, score: mad > 0 ? (d - m) / mad : Infinity });
  }
  if (chunks.length === 0) return { candidates: [], median: m, mad, threshold };
  const first = chunks[0]!.start;
  const last = chunks[chunks.length - 1]!.end;
  // 按漂移从大到小收：离时间线首尾或已收的边界不足最短章节长度的丢掉（确定性：漂移相同按时间先后）。
  const kept: BoundaryCandidate[] = [];
  for (const peak of [...peaks].sort((a, b) => b.drift - a.drift || a.at - b.at)) {
    if (kept.length + 1 >= maxChapters) break;
    if (peak.at - first < minChapterSec || last - peak.at < minChapterSec) continue;
    if (kept.some((other) => Math.abs(other.at - peak.at) < minChapterSec)) continue;
    kept.push(peak);
  }
  kept.sort((a, b) => a.at - b.at);
  return { candidates: kept, median: m, mad, threshold };
}
