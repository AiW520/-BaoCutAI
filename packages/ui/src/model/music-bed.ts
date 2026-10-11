import type { AssetRecord, EditOperation, Id, MediaTime, Sequence, SequenceItemInput } from '@baocut/protocol';
import { mediaTimeToSeconds } from '@baocut/protocol';
import { durationSeconds } from './editor.ts';
import { M } from './tools-music-copy.ts';

/**
 * 配乐铺满（产品设计 §2.7「生成配乐」、架构设计 §7.9「生成配乐的铺轨」；设计稿 model-music.js `loopLayout`）：
 * 视频比单次上限长时只生成上限长度的一段，加到视频时首尾相接循环铺满——后一段在前一段结束前 `crossfade` 秒进来、两边交叉淡化，
 * 最后一段截到视频结尾、片尾淡出；不拉伸、不改节奏。同一条轨道上的实例不能重叠（视频格式规范 §3.4），接缝两侧交替放在两条音乐轨上；
 * 淡入淡出都在实例 [0, 5] 秒之内、两者之和不超过片段长度（§3.9）。
 * 写入是一笔事务：`addTrack`（一或两条音乐轨）加一个 `insertItems`，每段一个音频实例带 `playDuration`（这就是截断）与 `mix` 的淡化；
 * 一次撤销整笔回去。
 */

export const LOOP = { crossfade: 2, tailFade: 3 } as const;

/** 加到视频的音乐实例的作用（开放词表，§3.1）。 */
export const MUSIC_ROLE = 'music';

export interface LoopPiece {
  /** 在序列上的起点、长度（秒，精确到毫秒）。 */
  start: number;
  dur: number;
  /** 交替的两条音乐轨：0 / 1。 */
  lane: 0 | 1;
  fadeIn: number;
  fadeOut: number;
}

const r3 = (n: number) => Math.round(n * 1000) / 1000;

/**
 * 一段 `pieceSec` 秒的音乐铺满 `totalSec` 秒：每段从音乐开头起放，后一段在前一段结束前 `crossfade` 秒进来；
 * 最后一段截到视频结尾、带片尾淡出；音乐比视频长时只有一段。时长不成立时空表。
 */
export function loopLayout(pieceSec: number, totalSec: number, opts: Partial<typeof LOOP> = {}): LoopPiece[] {
  const o = { ...LOOP, ...opts };
  const piece = Number(pieceSec);
  const total = Number(totalSec);
  if (!(piece > 0) || !(total > 0)) return [];
  const xf = Math.min(o.crossfade, piece / 4);
  const out: LoopPiece[] = [];
  let start = 0;
  for (;;) {
    const dur = Math.min(piece, total - start);
    out.push({ start: r3(start), dur: r3(dur), lane: out.length % 2 === 0 ? 0 : 1, fadeIn: out.length ? r3(xf) : 0, fadeOut: 0 });
    if (start + piece >= total) break;
    start += piece - xf;
  }
  out.forEach((s, i) => {
    if (i < out.length - 1) s.fadeOut = r3(xf);
  });
  const last = out[out.length - 1]!;
  last.fadeOut = r3(Math.min(o.tailFade, Math.max(0, last.dur - last.fadeIn)));
  return out;
}

/** 加到视频之后的一句：「循环 3 段铺满 742 秒 · 接缝交叉淡化 2 秒 · 片尾淡出 3 秒」；只有一段时只说片尾淡出。 */
export function loopSummary(layout: readonly LoopPiece[], totalSec: number): string {
  if (!layout.length) return '';
  const tail = M.tailFade(layout[layout.length - 1]!.fadeOut);
  if (layout.length === 1) return tail;
  return [M.loopPieces(layout.length, r3(totalSec)), M.seamCrossfade(layout[1]!.fadeIn), tail].join(' · ');
}

/** 素材当前版本的实际时长（秒）；音乐的长度以做出来的为准，不是请求的目标。 */
export function pieceSeconds(asset: AssetRecord): number | null {
  const duration = asset.revisions[asset.currentRevision]?.duration;
  return duration ? mediaTimeToSeconds(duration) : null;
}

/** 整数毫秒写成精确时间。 */
const ms = (seconds: number): MediaTime => ({ ticks: String(Math.round(seconds * 1000)), timescale: 1000 });

/** 新建音乐轨在同一事务里的 `ref`。 */
const trackRef = (lane: 0 | 1) => `music-bed-${lane}`;

/**
 * 把这段音乐循环铺满这部视频的那一笔操作：按实际时长算铺法，新建用到的音乐轨（一或两条），每段一个音频实例
 * （从音乐开头起、`playDuration` 截到该段长度、淡入淡出按铺法）。视频没有时长、素材不是音频或没有时长时 null。
 */
export function musicBedOperations(sequence: Sequence, asset: AssetRecord): { operations: EditOperation[]; layout: LoopPiece[]; totalSec: number } | null {
  if (asset.kind !== 'audio') return null;
  const piece = pieceSeconds(asset);
  const total = r3(durationSeconds(sequence));
  if (piece === null || !(piece > 0) || !(total > 0)) return null;
  const layout = loopLayout(piece, total);
  if (!layout.length) return null;
  const { num, den } = sequence.fps;
  const lanes = [...new Set(layout.map((p) => p.lane))].sort();
  const items: SequenceItemInput[] = layout.map((p) => {
    // 起点拆成帧与帧内偏移（视频格式规范 §2.10）：都按毫秒的整数算，不经浮点。
    const startMs = Math.round(p.start * 1000);
    const fromFrame = Math.floor((startMs * num) / (1000 * den));
    const subframeTicks = startMs * num - fromFrame * den * 1000;
    return {
      type: 'audio',
      trackRef: trackRef(p.lane),
      assetRef: { id: asset.id, revision: asset.currentRevision },
      fromFrame,
      subframeOffset: { ticks: String(subframeTicks), timescale: 1000 * num },
      playDuration: ms(p.dur),
      timeMap: { kind: 'linear', sourceIn: { ticks: '0', timescale: 1 }, rate: { num: 1, den: 1 } },
      mix: { volume: 1, ...(p.fadeIn > 0 ? { fadeIn: ms(p.fadeIn) } : {}), ...(p.fadeOut > 0 ? { fadeOut: ms(p.fadeOut) } : {}) },
      name: asset.name,
      role: MUSIC_ROLE,
    };
  });
  const operations: EditOperation[] = [
    ...lanes.map((lane): EditOperation => ({ type: 'addTrack', sequenceId: sequence.id, kind: 'audio', ref: trackRef(lane), name: M.musicTrack(lane + 1) })),
    { type: 'insertItems', sequenceId: sequence.id, items },
  ];
  return { operations, layout, totalSec: total };
}

/** 这段素材已经在时间线上了（铺过、或用户自己放过）：不再自动铺。 */
export function assetOnTimeline(sequence: Sequence, assetId: Id): boolean {
  return sequence.items.some((item) => item.type === 'audio' && item.assetRef.id === assetId);
}
