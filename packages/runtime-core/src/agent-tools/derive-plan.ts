import { createHash } from 'node:crypto';
import {
  itemAssetRef,
  sequenceDurationFrames,
  type Crop,
  type DocumentRecord,
  type EditOperation,
  type FitMode,
  type Id,
  type MediaTime,
  type Rate,
  type Sequence,
  type SequenceItem,
  type Track,
  type TrackKind,
  type VersionRef,
  type VideoSnapshot,
} from '@baocut/protocol';

/**
 * 派生子视频的规划（架构设计 §3.5「派生子视频」，视频格式规范 §4.6 的 `derivation`）：复制父视频的整条时间线与文稿，
 * 再把区间之外的部分用剪口（`addCuts`，视频格式规范 §6.7）剪掉。子视频在编辑器里打开时，文稿面板是父视频的全文，
 * 区间之外的话显示为剪掉的，恢复剪口就能把片段往外扩。本模块只算事务，不提交、不读写文件；工具 `videos_derive`、
 * RPC `videos.derive` 与测试共用。
 *
 * 两笔事务：
 *
 * 1. 复制（`planDerivation` 的 `operations`）：轨道、素材（同一份文件，收在父视频里的同样收进子视频）、全部实例
 *    （字幕实例除外，不平移、不截断）、文稿整份、章节、画布背景与派生来源文档。
 * 2. 收尾（`planDerivationTrim`，要用第一笔新建的 ID）：轨道的隐藏与静音、转场、译文、父视频已有的剪口集合，
 *    然后对主素材记下区间之外的剪口（剪掉之后时间线只剩区间），最后锁回父视频锁着的轨道。
 *
 * 剪口记在素材的源时钟上，只作用于播放那个素材的实例；其余实例在复制时一律改成 `follow-cuts`，跟着剪口移动、缩短，
 * 整个落在剪掉范围里的删掉（恢复剪口时回不来，结果的 `items-not-restorable` 说明）。首版只对一个主素材（时间线上
 * 播放得最多的那个）记剪口：主素材盖不到的区间之外的部分（空隙、只有别的素材或图文的段落）留在子视频里，
 * 以 `range-not-exact` 说明。
 */

export type DeriveErrorCode = 'DERIVE_RANGE_EMPTY' | 'DERIVE_UNSUPPORTED_ITEM' | 'DERIVE_PARENT_UNPLACED';

/** 派生的拒绝：调用方按 `code` 换成 RPC 错误或工具错误。 */
export class DeriveError extends Error {
  readonly code: DeriveErrorCode;
  readonly details: Record<string, unknown>;
  constructor(code: DeriveErrorCode, details: Record<string, unknown> = {}) {
    super(code);
    this.code = code;
    this.details = details;
  }
}

/** 派生时丢掉、改动或没做到的东西。 */
export type DeriveWarningCode =
  | 'anchor-dropped'
  | 'locks-dropped'
  | 'animation-bindings-dropped'
  | 'multiple-assets'
  | 'range-not-exact'
  | 'items-not-restorable';

export interface DeriveWarning {
  code: DeriveWarningCode;
  itemId?: Id;
  assetId?: Id;
  /** `range-not-exact`：区间之外没能剪掉的帧数；`items-not-restorable`：会被剪口删掉的实例数；`multiple-assets`：媒体素材数。 */
  count?: number;
}

export interface DeriveSettings {
  width: number;
  height: number;
  fit: FitMode | null;
  crop: Crop | null;
  captions: boolean;
  translations: boolean;
  chapters: boolean;
}

/** 对到帧之后的区间：帧号与秒（`[start, end)`）。 */
export interface AlignedRange {
  startFrame: number;
  endFrame: number;
  start: number;
  end: number;
}

/** 区间之外的一个剪口：父视频素材源时钟上的秒。 */
export interface DerivedCut {
  assetId: Id;
  from: number;
  to: number;
}

/** 派生来源文档的正文（`baocut.derivation/1`）。 */
export interface DerivationBody {
  schema: 'baocut.derivation/1';
  parentVideoId: Id;
  parentRevision: string;
  range: { start: number; end: number };
  /** 记剪口的主素材（父视频里的 ID）；没有可剪的媒体时 null。 */
  primaryAssetId: Id | null;
  cuts: DerivedCut[];
  settings: DeriveSettings;
  key: string;
}

/** 放在哪条轨道上：子视频已有的轨道，或第一笔事务里新建的轨道的 ref。 */
export type TrackTarget = { trackId: Id } | { trackRef: string };

/** 子视频里的一个实例：按轨道、种类与在时间线上的位置（复制时不平移，与父视频相同）找回。 */
export interface ItemLocator {
  track: TrackTarget;
  type: SequenceItem['type'];
  position: string;
}

export interface PlannedTransition {
  left?: ItemLocator;
  right?: ItemLocator;
  kind: string;
  params?: Record<string, unknown>;
  durationFrames: number;
  easing: string;
  placement: string;
  audioCrossfade?: boolean;
}

/** 收尾时写的译文：子视频的转写有了 ID 之后才填 `sourceBasis` 与 `sourceDocument`。 */
export interface PlannedTranslation {
  from: Id;
  speechRef: string;
  name: string;
  language?: string;
  body: Record<string, unknown>;
}

/** 收尾时复制的剪口集合：剪口原样，`scopeItemIds` 换成子视频的实例。 */
export interface PlannedCutSet {
  from: Id;
  importRef: string;
  name: string;
  body: Record<string, unknown>;
  scope: ItemLocator[];
}

export interface PlannedSpeech {
  ref: string;
  from: Id;
  assetId: Id;
  words: number;
}

export interface TrimPlan {
  tracks: { track: TrackTarget; visible?: false; muted?: true; locked?: true }[];
  transitions: PlannedTransition[];
  translations: PlannedTranslation[];
  cutSets: PlannedCutSet[];
  cuts: { importRef: string; cuts: { from: string; to: string }[] } | null;
}

export interface DerivationPlan {
  operations: EditOperation[];
  trim: TrimPlan;
  cuts: DerivedCut[];
  speech: PlannedSpeech[];
  derivation: DerivationBody;
  warnings: DeriveWarning[];
  /** 复制的实例数。 */
  itemCount: number;
}

export interface DerivationInput {
  snapshot: VideoSnapshot;
  range: AlignedRange;
  settings: DeriveSettings;
  key: string;
  /** 子视频的根序列：ID、新建时的轨道与背景。 */
  target: { sequenceId: Id; tracks: readonly Track[]; background: string };
  /** 素材版本的文件（绝对路径），键是 `assetFileKey`。 */
  files: ReadonlyMap<string, string>;
  /** 父视频文稿、译文与剪口集合的正文（当前版本），键是文档 ID。没有的不复制。 */
  documents: ReadonlyMap<Id, unknown>;
  /** 写进视频的名字（按当前语言）。 */
  labels: { derivationName: string };
}

export const DERIVATION_REF = 'derivation';
export const DERIVATION_KIND = 'derivation';
export const DERIVATION_SCHEMA = 'baocut.derivation/1';
const CUT_SET_KIND = 'cut-set';
/** 比这短的剪口不记（音频帧内偏移留下的零头）。 */
const MIN_CUT_SECONDS = 0.001;

export function assetFileKey(ref: VersionRef): string {
  return `${ref.id}@${ref.revision}`;
}

// ---- 有理数（BigInt），只用于时间换算 ----

interface Q {
  n: bigint;
  d: bigint;
}

function gcd(a: bigint, b: bigint): bigint {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b) [a, b] = [b, a % b];
  return a || 1n;
}

function q(n: bigint, d: bigint = 1n): Q {
  if (d < 0n) [n, d] = [-n, -d];
  const g = gcd(n, d);
  return { n: n / g, d: d / g };
}

const ZERO = q(0n);
const add = (a: Q, b: Q): Q => q(a.n * b.d + b.n * a.d, a.d * b.d);
const sub = (a: Q, b: Q): Q => q(a.n * b.d - b.n * a.d, a.d * b.d);
const mul = (a: Q, b: Q): Q => q(a.n * b.n, a.d * b.d);
const div = (a: Q, b: Q): Q => q(a.n * b.d, a.d * b.n);
const cmp = (a: Q, b: Q): number => {
  const x = a.n * b.d - b.n * a.d;
  return x < 0n ? -1 : x > 0n ? 1 : 0;
};
const min = (a: Q, b: Q): Q => (cmp(a, b) <= 0 ? a : b);
const max = (a: Q, b: Q): Q => (cmp(a, b) >= 0 ? a : b);
const toNumber = (a: Q): number => Number(a.n) / Number(a.d);

function floorDiv(n: bigint, d: bigint): bigint {
  const r = n / d;
  return n % d !== 0n && n < 0n !== d < 0n ? r - 1n : r;
}

const frames = (f: number, fps: Rate): Q => q(BigInt(f) * BigInt(fps.den), BigInt(fps.num));
const time = (t: MediaTime): Q => q(BigInt(t.ticks), BigInt(t.timescale));
const rate = (r: Rate): Q => q(BigInt(r.num), BigInt(r.den));
const exact = (a: Q): string => `${a.n}/${a.d}`;

/** 十进制秒，9 位小数：`up` 向上取整，否则向下（剪口起点向上、终点向下，只会略短，不会剪进区间或越出素材）。 */
function decimal(value: Q, up: boolean): string {
  const scale = 1_000_000_000n;
  const scaled = value.n * scale;
  let units = floorDiv(scaled, value.d);
  if (up && units * value.d !== scaled) units += 1n;
  const negative = units < 0n;
  const abs = negative ? -units : units;
  const whole = abs / scale;
  const frac = (abs % scale).toString().padStart(9, '0').replace(/0+$/, '');
  return `${negative ? '-' : ''}${whole}${frac ? `.${frac}` : ''}`;
}

// ---- 区间与幂等键 ----

/**
 * 剪辑后时间线上的 `[start, end)` 秒对到帧：起点向下取整、终点向上取整，截到序列长度。空了时 `DERIVE_RANGE_EMPTY`。
 * 秒数换帧时留一点余量，免得 0.1 × 30 这类浮点误差多出一帧。
 */
export function alignRange(sequence: Sequence, start: number, end: number): AlignedRange {
  const fps = sequence.fps;
  const toFrames = (seconds: number) => (seconds * fps.num) / fps.den;
  const duration = sequenceDurationFrames(sequence);
  const startFrame = Math.max(0, Math.floor(toFrames(start) + 1e-9));
  const endFrame = Math.min(duration, Math.ceil(toFrames(end) - 1e-9));
  if (!(endFrame > startFrame)) throw new DeriveError('DERIVE_RANGE_EMPTY', { start, end, durationFrames: duration });
  return {
    startFrame,
    endFrame,
    start: toNumber(frames(startFrame, fps)),
    end: toNumber(frames(endFrame, fps)),
  };
}

/** 幂等键：父视频、版本、对齐后的区间与设置的 sha256 的前 12 位。名字不算在内。 */
export function derivationKey(input: {
  parentVideoId: Id;
  parentRevision: string;
  range: { start: number; end: number };
  settings: DeriveSettings;
}): string {
  const s = input.settings;
  const canonical = JSON.stringify({
    parentVideoId: input.parentVideoId,
    parentRevision: input.parentRevision,
    range: { start: input.range.start, end: input.range.end },
    settings: {
      width: s.width,
      height: s.height,
      fit: s.fit,
      crop: s.crop ? { left: s.crop.left, top: s.crop.top, right: s.crop.right, bottom: s.crop.bottom } : null,
      captions: s.captions,
      translations: s.translations,
      chapters: s.chapters,
    },
  });
  return createHash('sha256').update(canonical).digest('hex').slice(0, 12);
}

// ---- 复制哪些实例 ----

function rootSequence(snapshot: VideoSnapshot): Sequence {
  const sequence = snapshot.sequences[snapshot.rootSequenceId];
  if (!sequence) throw new Error('Video has no root sequence');
  return sequence;
}

/** 复制的轨道（字幕轨除外，按次序，空的不要）与上面的实例（字幕实例除外，按叠放次序）。有合成实例时拒绝。 */
function copiedTimeline(sequence: Sequence): { tracks: Track[]; items: SequenceItem[] } {
  const ordered = [...sequence.tracks].filter((t) => t.kind !== 'subtitle').sort((a, b) => a.order - b.order);
  const items: SequenceItem[] = [];
  const tracks: Track[] = [];
  for (const track of ordered) {
    const onTrack = sequence.items
      .filter((item) => item.trackId === track.id && item.type !== 'caption')
      .sort((a, b) => a.paintOrder - b.paintOrder);
    if (!onTrack.length) continue;
    for (const item of onTrack) {
      // 合成实例引用代码包（目录），不能经素材文件复制。
      if (item.type === 'composition') throw new DeriveError('DERIVE_UNSUPPORTED_ITEM', { itemId: item.id, itemType: item.type });
    }
    tracks.push(track);
    items.push(...onTrack);
  }
  return { tracks, items };
}

/** 实例在时间线上的位置，子视频里按它找回（复制时不平移）。 */
function positionOf(item: SequenceItem): string {
  if (item.type === 'audio') return `a:${item.fromFrame}:${exact(time(item.subframeOffset))}:${exact(time(item.playDuration))}`;
  return `v:${item.span.fromFrame}:${item.span.durationFrames}`;
}

/** 实例的输入：去掉引擎分配的（ID、来历、轨道、叠放次序）与引用父视频里别的对象的（链接组、跟随的目标），一律跟随剪口。 */
function itemInput(item: SequenceItem, settings: DeriveSettings, warnings: DeriveWarning[]): Record<string, unknown> {
  const {
    id: _id,
    lineage: _lineage,
    trackId: _trackId,
    paintOrder: _paintOrder,
    linkGroupId: _link,
    followPolicy,
    locked,
    ...rest
  } = item as SequenceItem & Record<string, unknown>;
  const input: Record<string, unknown> = { ...rest, followPolicy: { kind: 'follow-cuts' } };
  if (followPolicy.kind !== 'sequence-fixed' && followPolicy.kind !== 'follow-cuts') warnings.push({ code: 'anchor-dropped', itemId: item.id });
  // 锁着的实例挡住剪口的波纹删除：复制成不锁的。
  if (locked) warnings.push({ code: 'locks-dropped', itemId: item.id });
  delete input.assetRef;
  if (item.type === 'video') {
    if (settings.fit) input.fit = settings.fit;
    if (settings.crop) input.crop = settings.crop;
  }
  return input;
}

// ---- 区间之外的剪口 ----

interface Interval {
  start: Q;
  end: Q;
}

/** 播放素材的一段：时间线上的 `[a, b)` 与源时钟 `sourceIn + (t − a) × rate`。 */
interface MediaPiece {
  item: SequenceItem;
  assetId: Id;
  a: Q;
  b: Q;
  sourceIn: Q;
  rate: Q;
}

function itemInterval(item: SequenceItem, fps: Rate): Interval {
  if (item.type === 'audio') {
    const start = add(frames(item.fromFrame, fps), time(item.subframeOffset));
    return { start, end: add(start, time(item.playDuration)) };
  }
  return { start: frames(item.span.fromFrame, fps), end: frames(item.span.fromFrame + item.span.durationFrames, fps) };
}

function mediaPiece(item: SequenceItem, fps: Rate): MediaPiece | 'unsupported' | null {
  if (item.type !== 'video' && item.type !== 'audio') return null;
  const map = item.timeMap;
  // 剪口集合的实例要求正速率的线性源时钟（静帧、倒放的素材不记剪口）。
  if (map.kind !== 'linear' || map.rate.num <= 0) return 'unsupported';
  const { start, end } = itemInterval(item, fps);
  return { item, assetId: item.assetRef.id, a: start, b: end, sourceIn: time(map.sourceIn), rate: rate(map.rate) };
}

function merge(list: Interval[]): Interval[] {
  const sorted = list.filter((s) => cmp(s.end, s.start) > 0).sort((x, y) => cmp(x.start, y.start));
  const out: Interval[] = [];
  for (const s of sorted) {
    const last = out[out.length - 1];
    if (last && cmp(s.start, last.end) <= 0) last.end = max(last.end, s.end);
    else out.push({ ...s });
  }
  return out;
}

function subtract(from: Interval[], minus: Interval[]): Interval[] {
  let rest = merge(from);
  for (const m of merge(minus)) {
    rest = rest.flatMap((s) => {
      if (cmp(m.end, s.start) <= 0 || cmp(m.start, s.end) >= 0) return [s];
      const parts: Interval[] = [];
      if (cmp(m.start, s.start) > 0) parts.push({ start: s.start, end: m.start });
      if (cmp(m.end, s.end) < 0) parts.push({ start: m.end, end: s.end });
      return parts;
    });
  }
  return rest;
}

function intersect(x: Interval, y: Interval): Interval | null {
  const start = max(x.start, y.start);
  const end = min(x.end, y.end);
  return cmp(end, start) > 0 ? { start, end } : null;
}

const totalLength = (list: Interval[]): Q => list.reduce((sum, s) => add(sum, sub(s.end, s.start)), ZERO);
const toSource = (p: MediaPiece, s: Interval): Interval => ({
  start: add(p.sourceIn, mul(sub(s.start, p.a), p.rate)),
  end: add(p.sourceIn, mul(sub(s.end, p.a), p.rate)),
});
const toTimeline = (p: MediaPiece, s: Interval): Interval => ({
  start: add(p.a, div(sub(s.start, p.sourceIn), p.rate)),
  end: add(p.a, div(sub(s.end, p.sourceIn), p.rate)),
});

interface CutPlan {
  primaryAssetId: Id | null;
  cuts: Interval[];
  warnings: DeriveWarning[];
}

/**
 * 区间之外要剪掉的源区间：主素材（时间线上播放得最多、源时钟都是正速率线性的素材）在 `[0, S)` 与 `[E, 时长)` 里播放的源区间，
 * 减去它在区间里播放的（剪口作用于播放这个素材的全部实例，同一段源在区间里也播放时不能剪）。父视频已有的剪口对应的源区间
 * 不在实例里，这里自然不会重复记。
 */
function planCuts(sequence: Sequence, items: SequenceItem[], range: AlignedRange, assetDuration: (assetId: Id) => Q | null): CutPlan {
  const fps = sequence.fps;
  const warnings: DeriveWarning[] = [];
  const pieces: MediaPiece[] = [];
  const unsupported = new Set<Id>();
  for (const item of items) {
    const piece = mediaPiece(item, fps);
    if (piece === 'unsupported') unsupported.add((item as { assetRef: VersionRef }).assetRef.id);
    else if (piece) pieces.push(piece);
  }
  const assets = new Set([...pieces.map((p) => p.assetId), ...unsupported]);
  if (assets.size > 1) warnings.push({ code: 'multiple-assets', count: assets.size });

  // 主素材：播放得最多的那个；一样多时按 ID。
  const coverage = new Map<Id, Q>();
  for (const p of pieces) if (!unsupported.has(p.assetId)) coverage.set(p.assetId, add(coverage.get(p.assetId) ?? ZERO, sub(p.b, p.a)));
  const primary = [...coverage.entries()].sort(([x, a], [y, b]) => cmp(b, a) || (x < y ? -1 : x > y ? 1 : 0))[0]?.[0] ?? null;

  const S = frames(range.startFrame, fps);
  const E = frames(range.endFrame, fps);
  const D = frames(sequenceDurationFrames(sequence), fps);
  const outside: Interval[] = [
    { start: ZERO, end: S },
    { start: E, end: D },
  ].filter((s) => cmp(s.end, s.start) > 0);
  const kept: Interval = { start: S, end: E };

  let cuts: Interval[] = [];
  const own = pieces.filter((p) => p.assetId === primary);
  if (primary) {
    const out: Interval[] = [];
    const keep: Interval[] = [];
    for (const p of own) {
      for (const o of outside) {
        const part = intersect({ start: p.a, end: p.b }, o);
        if (part) out.push(toSource(p, part));
      }
      const part = intersect({ start: p.a, end: p.b }, kept);
      if (part) keep.push(toSource(p, part));
    }
    const limit = assetDuration(primary);
    cuts = subtract(out, keep)
      .map((s) => ({ start: max(s.start, ZERO), end: limit ? min(s.end, limit) : s.end }))
      .filter((s) => toNumber(sub(s.end, s.start)) >= MIN_CUT_SECONDS);
  }

  // 剪口在时间线上盖住的部分；区间之外剩下没盖住的帧要说明。
  const covered = merge(
    own.flatMap((p) =>
      cuts.flatMap((c) => {
        const part = intersect(toTimeline(p, c), { start: p.a, end: p.b });
        return part ? [part] : [];
      }),
    ),
  );
  const left = subtract(outside, covered);
  const leftFrames = Math.round(toNumber(div(totalLength(left), frames(1, fps))));
  if (leftFrames >= 1) warnings.push({ code: 'range-not-exact', count: leftFrames });

  // 不归主素材管的实例整个落在剪掉的范围里时，跟着剪口被删掉，恢复剪口也回不来。
  const lost = items.filter((item) => {
    if (own.some((p) => p.item === item)) return false;
    const span = itemInterval(item, fps);
    return covered.some((c) => cmp(c.start, span.start) <= 0 && cmp(span.end, c.end) <= 0);
  });
  if (lost.length) warnings.push({ code: 'items-not-restorable', count: lost.length });

  return { primaryAssetId: primary, cuts, warnings };
}

// ---- 调用方要先准备的输入 ----

/**
 * 规划之前要准备的东西：要导入的素材版本（找文件）与要读正文的文档（这些素材的转写、剪口集合，以及转写的译文）。
 * 父视频里有合成实例时同样抛 `DERIVE_UNSUPPORTED_ITEM`。
 */
export function derivationNeeds(snapshot: VideoSnapshot, settings: DeriveSettings): { assets: VersionRef[]; documentIds: Id[] } {
  const { items } = copiedTimeline(rootSequence(snapshot));
  const assets = new Map<string, VersionRef>();
  for (const item of items) {
    const ref = itemAssetRef(item);
    if (ref) assets.set(assetFileKey(ref), ref);
  }
  const assetIds = new Set([...assets.values()].map((a) => a.id));
  const docs = Object.values(snapshot.documents).sort(byId);
  const sourced = docs.filter((d) => (d.kind === 'speech' || d.kind === CUT_SET_KIND) && d.sourceAssetId && assetIds.has(d.sourceAssetId));
  const speechIds = new Set(sourced.filter((d) => d.kind === 'speech').map((d) => d.id));
  const translations = settings.translations
    ? docs.filter((d) => d.kind === 'translation' && d.sourceDocumentId && speechIds.has(d.sourceDocumentId))
    : [];
  return { assets: [...assets.values()], documentIds: [...sourced, ...translations].map((d) => d.id) };
}

// ---- 规划 ----

export function planDerivation(input: DerivationInput): DerivationPlan {
  const { snapshot, range, settings, target } = input;
  const sequence = rootSequence(snapshot);
  const { tracks, items } = copiedTimeline(sequence);
  const warnings: DeriveWarning[] = [];
  const operations: EditOperation[] = [];

  // 轨道：每种轨道里第一条用到的接子视频新建时的那条，其余按父视频的次序新建（新建的排在上面，相对次序不变）。
  const trackTargets = new Map<Id, TrackTarget>();
  const defaults = new Map<TrackKind, Track[]>();
  for (const t of [...target.tracks].sort((a, b) => a.order - b.order)) defaults.set(t.kind, [...(defaults.get(t.kind) ?? []), t]);
  const trimTracks: TrimPlan['tracks'] = [];
  for (const [n, track] of tracks.entries()) {
    const free = defaults.get(track.kind)?.shift();
    let targetTrack: TrackTarget;
    if (free) targetTrack = { trackId: free.id };
    else {
      const ref = `track-${n + 1}`;
      operations.push({ type: 'addTrack', sequenceId: target.sequenceId, kind: track.kind, ...(track.name ? { name: track.name } : {}), ref });
      targetTrack = { trackRef: ref };
    }
    trackTargets.set(track.id, targetTrack);
    if (!track.visible || track.muted || track.locked) {
      trimTracks.push({
        track: targetTrack,
        ...(!track.visible ? { visible: false as const } : {}),
        ...(track.muted ? { muted: true as const } : {}),
        ...(track.locked ? { locked: true as const } : {}),
      });
    }
  }

  // 素材：每个用到的素材版本导入一次，来源沿用父视频里的记录；收在父视频里的同样收进子视频，链接的仍链接到原文件。
  const importRefs = new Map<string, string>();
  const assetImportRef = new Map<Id, string>();
  for (const item of items) {
    const asset = itemAssetRef(item);
    if (!asset) continue;
    const fileKey = assetFileKey(asset);
    if (importRefs.has(fileKey)) continue;
    const file = input.files.get(fileKey);
    if (!file) throw new Error(`No file for asset ${fileKey}`);
    const record = snapshot.assets[asset.id];
    const assetRevision = record?.revisions[asset.revision];
    const provenance = assetRevision?.provenance;
    const storage = assetRevision?.storage.mode === 'managed' ? 'managed' : 'linked';
    const ref = `asset-${importRefs.size + 1}`;
    importRefs.set(fileKey, ref);
    if (!assetImportRef.has(asset.id) || record?.currentRevision === asset.revision) assetImportRef.set(asset.id, ref);
    operations.push({
      type: 'importAsset',
      path: file,
      ...(record?.name ? { name: record.name } : {}),
      storage,
      ref,
      ...(provenance ? { provenance: { origin: provenance.origin, ...(provenance.source !== undefined ? { source: provenance.source } : {}) } } : {}),
    });
  }

  // 文稿：整份复制（素材时钟，与时间线无关）。
  const speech: PlannedSpeech[] = [];
  const speechRefs = new Map<Id, string>();
  const docs = Object.values(snapshot.documents).sort(byId);
  for (const record of docs) {
    if (record.kind !== 'speech' || !record.sourceAssetId) continue;
    const importRef = assetImportRef.get(record.sourceAssetId);
    const body = input.documents.get(record.id);
    if (!importRef || !isSpeechBody(body)) continue;
    const ref = `speech-${speech.length + 1}`;
    speech.push({ ref, from: record.id, assetId: record.sourceAssetId, words: body.words.length });
    speechRefs.set(record.id, ref);
    operations.push({
      type: 'putDocument',
      ref,
      kind: 'speech',
      name: record.name,
      ...(record.language ? { language: record.language } : {}),
      sourceAsset: { ref: importRef },
      body,
    });
  }

  // 实例：整条时间线，不平移、不截断。
  const inserted: Record<string, unknown>[] = [];
  const locatorOf = new Map<Id, ItemLocator>();
  for (const item of items) {
    const track = trackTargets.get(item.trackId)!;
    const entry: Record<string, unknown> = { ...itemInput(item, settings, warnings), ...track };
    const asset = itemAssetRef(item);
    if (asset) entry.assetImportRef = importRefs.get(assetFileKey(asset));
    inserted.push(entry);
    locatorOf.set(item.id, { track, type: item.type, position: positionOf(item) });
  }
  if (inserted.length) operations.push({ type: 'insertItems', sequenceId: target.sequenceId, items: inserted as never });
  if (sequence.animationBindings.length) warnings.push({ code: 'animation-bindings-dropped' });

  // 章节：全部复制；剪口剪掉时章节跟着内容走（§3.13 的例外）。缩略图引用父视频的素材，不带过来。
  if (settings.chapters) {
    const chapters = sequence.markers
      .filter((m) => m.kind === 'chapter')
      .sort((a, b) => a.frame - b.frame)
      .map((m) => ({ at: { unit: 'frames' as const, value: m.frame }, title: m.label, ...(m.summary ? { summary: m.summary } : {}) }));
    if (chapters.length) operations.push({ type: 'setChapters', sequenceId: target.sequenceId, chapters, alignment: 'exact-frame' });
  }

  // 画布背景沿用父视频（宽高在新建时已经给了）。
  if (sequence.canvas.background !== target.background) {
    operations.push({ type: 'updateSequence', sequenceId: target.sequenceId, background: sequence.canvas.background });
  }

  // 转场：两侧都复制了，收尾时按位置找回实例。
  const transitions: PlannedTransition[] = [];
  for (const t of sequence.transitions) {
    const left = t.leftItemId !== undefined ? locatorOf.get(t.leftItemId) : undefined;
    const right = t.rightItemId !== undefined ? locatorOf.get(t.rightItemId) : undefined;
    if ((t.leftItemId !== undefined && !left) || (t.rightItemId !== undefined && !right)) continue;
    transitions.push({
      ...(left ? { left } : {}),
      ...(right ? { right } : {}),
      kind: t.kind,
      ...(t.params ? { params: t.params } : {}),
      durationFrames: t.durationFrames,
      easing: t.easing,
      placement: t.placement,
      ...(t.audioCrossfade ? { audioCrossfade: true } : {}),
    });
  }

  // 译文：整份复制；`sourceBasis` 等子视频的转写有了 ID 再填。
  const translations: PlannedTranslation[] = [];
  if (settings.translations) {
    for (const record of docs) {
      if (record.kind !== 'translation' || !record.sourceDocumentId) continue;
      const speechRef = speechRefs.get(record.sourceDocumentId);
      const body = input.documents.get(record.id);
      if (!speechRef || !isTranslationBody(body)) continue;
      translations.push({ from: record.id, speechRef, name: record.name, ...(record.language ? { language: record.language } : {}), body });
    }
  }

  // 父视频已有的剪口集合：剪口原样（对应的源区间已经不在复制的实例里），范围换成子视频的实例。
  const cutSets: PlannedCutSet[] = [];
  for (const record of docs) {
    if (record.kind !== CUT_SET_KIND || !record.sourceAssetId) continue;
    const importRef = assetImportRef.get(record.sourceAssetId);
    const body = input.documents.get(record.id) as { scopeItemIds?: unknown } | undefined;
    if (!importRef || !body || typeof body !== 'object') continue;
    const scopeIds = Array.isArray(body.scopeItemIds) ? (body.scopeItemIds as Id[]) : [];
    cutSets.push({
      from: record.id,
      importRef,
      name: record.name,
      body: body as Record<string, unknown>,
      scope: scopeIds.flatMap((id) => locatorOf.get(id) ?? []),
    });
  }

  // 区间之外的剪口。
  const durationOf = (assetId: Id): Q | null => {
    const record = snapshot.assets[assetId];
    const duration = record?.revisions[record.currentRevision]?.duration;
    return duration ? time(duration) : null;
  };
  const cutPlan = planCuts(sequence, items, range, durationOf);
  warnings.push(...cutPlan.warnings);
  const primaryRef = cutPlan.primaryAssetId ? assetImportRef.get(cutPlan.primaryAssetId) : undefined;
  const cuts: DerivedCut[] = cutPlan.primaryAssetId
    ? cutPlan.cuts.map((c) => ({ assetId: cutPlan.primaryAssetId!, from: toNumber(c.start), to: toNumber(c.end) }))
    : [];

  const derivation: DerivationBody = {
    schema: DERIVATION_SCHEMA,
    parentVideoId: snapshot.id,
    parentRevision: snapshot.revision,
    range: { start: range.start, end: range.end },
    primaryAssetId: cutPlan.primaryAssetId,
    cuts,
    settings,
    key: input.key,
  };
  operations.push({
    type: 'putDocument',
    ref: DERIVATION_REF,
    kind: DERIVATION_KIND,
    name: input.labels.derivationName,
    body: derivation,
    summary: derivation,
  });

  return {
    operations,
    trim: {
      tracks: trimTracks,
      transitions,
      translations,
      cutSets,
      cuts:
        primaryRef && cutPlan.cuts.length
          ? { importRef: primaryRef, cuts: cutPlan.cuts.map((c) => ({ from: decimal(c.start, true), to: decimal(c.end, false) })) }
          : null,
    },
    cuts,
    speech,
    derivation,
    warnings: dedupeWarnings(warnings),
    itemCount: inserted.length,
  };
}

/**
 * 第二笔事务（要用第一笔新建的 ID，`refs` 是第一笔回执的 `refs`）：轨道的隐藏与静音、转场、译文、父视频的剪口集合，
 * 然后记区间之外的剪口，最后锁回锁着的轨道。没有要做的时返回空数组。
 */
export function planDerivationTrim(
  plan: Pick<DerivationPlan, 'trim'>,
  child: { sequence: Sequence; documents: Record<Id, DocumentRecord> },
  refs: Readonly<Record<string, Id>>,
): EditOperation[] {
  const operations: EditOperation[] = [];
  const sequence = child.sequence;
  const trackId = (track: TrackTarget) => ('trackId' in track ? track.trackId : refs[track.trackRef]);
  const itemAt = (locator: ItemLocator | undefined): Id | undefined => {
    if (!locator) return undefined;
    const id = trackId(locator.track);
    const matches = sequence.items.filter((item) => item.trackId === id && item.type === locator.type && positionOf(item) === locator.position);
    // 同一条轨道上同类型、同位置的实例不止一个时认不出是哪个。
    return matches.length === 1 ? matches[0]!.id : undefined;
  };

  for (const t of plan.trim.tracks) {
    const id = trackId(t.track);
    if (!id || (t.visible === undefined && t.muted === undefined)) continue;
    operations.push({
      type: 'updateTrack',
      sequenceId: sequence.id,
      trackId: id,
      ...(t.visible === false ? { visible: false } : {}),
      ...(t.muted ? { muted: true } : {}),
    });
  }
  for (const t of plan.trim.transitions) {
    const left = itemAt(t.left);
    const right = itemAt(t.right);
    if ((t.left && !left) || (t.right && !right)) continue;
    operations.push({
      type: 'setTransition',
      sequenceId: sequence.id,
      ...(left ? { leftItemId: left } : {}),
      ...(right ? { rightItemId: right } : {}),
      kind: t.kind as never,
      ...(t.params ? { params: t.params } : {}),
      duration: { unit: 'frames', value: t.durationFrames },
      alignment: 'exact-frame',
      easing: t.easing as never,
      placement: t.placement as never,
      ...(t.audioCrossfade ? { audioCrossfade: true } : {}),
    });
  }
  for (const [n, t] of plan.trim.translations.entries()) {
    const speechId = refs[t.speechRef];
    const speech = speechId ? child.documents[speechId] : undefined;
    if (!speechId || !speech) continue;
    const basis = (t.body.sourceBasis ?? {}) as Record<string, unknown>;
    operations.push({
      type: 'putDocument',
      ref: `translation-${n + 1}`,
      kind: 'translation',
      name: t.name,
      ...(t.language ? { language: t.language } : {}),
      sourceDocument: { documentId: speechId },
      // 转写整份复制，编辑视图的指纹（只取决于转写正文）不变；换成子视频的转写与序列。
      body: { ...t.body, sourceBasis: { ...basis, speechRef: { id: speechId, revision: speech.currentRevision }, sequenceId: sequence.id } },
    });
  }
  for (const [n, c] of plan.trim.cutSets.entries()) {
    const assetId = refs[c.importRef];
    if (!assetId) continue;
    const scope = c.scope.flatMap((locator) => itemAt(locator) ?? []);
    operations.push({
      type: 'putDocument',
      ref: `cut-set-${n + 1}`,
      kind: CUT_SET_KIND,
      name: c.name,
      sourceAsset: { assetId },
      body: { ...c.body, scopeItemIds: scope },
    });
  }
  const cuts = plan.trim.cuts;
  const cutAsset = cuts ? refs[cuts.importRef] : undefined;
  if (cuts && cutAsset) operations.push({ type: 'addCuts', sequenceId: sequence.id, assetId: cutAsset, cuts: cuts.cuts });
  for (const t of plan.trim.tracks) {
    const id = trackId(t.track);
    if (id && t.locked) operations.push({ type: 'updateTrack', sequenceId: sequence.id, trackId: id, locked: true });
  }
  return operations;
}

function dedupeWarnings(list: DeriveWarning[]): DeriveWarning[] {
  const seen = new Set<string>();
  return list.filter((w) => {
    const k = JSON.stringify(w);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

// ---- 文稿与译文的正文 ----

interface SpeechBodyShape {
  schema: 'baocut.speech/1';
  words: unknown[];
  [key: string]: unknown;
}

function isSpeechBody(body: unknown): body is SpeechBodyShape {
  const b = body as SpeechBodyShape | null;
  return !!b && b.schema === 'baocut.speech/1' && Array.isArray(b.words);
}

interface TranslationBodyShape {
  schema: 'baocut.translation/2';
  units: unknown[];
  [key: string]: unknown;
}

function isTranslationBody(body: unknown): body is TranslationBodyShape {
  const b = body as TranslationBodyShape | null;
  return !!b && b.schema === 'baocut.translation/2' && Array.isArray(b.units);
}

function byId(a: { id: Id }, b: { id: Id }): number {
  return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
}

/** 秒数写成 mm:ss（一小时以上 h:mm:ss），子视频的默认名用。 */
export function clockLabel(seconds: number): string {
  const total = Math.floor(seconds + 1e-6);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const mm = String(m).padStart(2, '0');
  const ss = String(s).padStart(2, '0');
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}
