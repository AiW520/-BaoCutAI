import { describe, expect, it } from 'vitest';
import type { AssetRecord, Crop, EditOperation, Sequence, SequenceItem } from '@baocut/protocol';
import {
  fillFramingOperations,
  framedPose,
  framingAnchor,
  framingOf,
  framingOperations,
  freeFramingOperations,
  isFramed,
  sourceSize,
  stagePose,
  withZoom,
  type FramedVideo,
} from './stage-framing.ts';
import { gestureOperations, gesturePatch, memberOf, stepGesture, zoomGesture } from './stage-gesture.ts';
import { poseOf } from './stage-pose.ts';
import { applyFramingToAll, framingPieces, shotSeconds, showsShotChip } from './stage-shots.ts';
import { patchItem } from './item-draft.ts';

/** 9:16 的子视频画布，16:9 的源：裁剪窗口正好是 9:16（宽 0.3164），按 cover 铺满。 */
const canvas = { width: 1080, height: 1920 };
const window916 = (left: number): Crop => ({ left, top: 0, right: +(1 - 0.3164 - left).toFixed(4), bottom: 0 });
const assets = {
  a1: {
    id: 'a1',
    kind: 'video',
    revisions: { r1: { video: { displayWidth: 1920, displayHeight: 1080, rotation: 0, pixelAspectRatio: { num: 1, den: 1 } } } },
  },
} as unknown as Record<string, AssetRecord>;

const piece = (id: string, fromFrame: number, durationFrames: number, crop: Crop | undefined, over: Record<string, unknown> = {}) =>
  ({
    id,
    type: 'video',
    trackId: 'v1',
    mode: 'fullscreen',
    fit: 'cover',
    place: {},
    span: { fromFrame, durationFrames },
    assetRef: { id: 'a1', revision: 'r1' },
    ...(crop ? { crop } : {}),
    ...over,
  }) as unknown as SequenceItem;

const seq = (items: SequenceItem[]) => ({ id: 's1', fps: { num: 30, den: 1 }, canvas, items }) as unknown as Sequence;

describe('按原片取景', () => {
  const env = { canvas, others: [], pxScale: 1 };
  const mods = { shift: false, alt: false };
  const focal = (x: number, y = 0.5, zoom?: number) => piece('a', 0, 30, undefined, { focalPoint: { x, y, ...(zoom ? { zoom } : {}) } }) as FramedVideo;

  it('只认铺满、cover、带取景点（或旧的只带裁剪）的视频', () => {
    expect(isFramed(piece('a', 0, 30, window916(0.2)))).toBe(true);
    expect(isFramed(piece('a', 0, 30, undefined, { focalPoint: { x: 0.4, y: 0.5 } }))).toBe(true);
    expect(isFramed(piece('a', 0, 30, window916(0.2), { fit: undefined }))).toBe(true);
    expect(isFramed(piece('a', 0, 30, undefined))).toBe(false);
    expect(isFramed(piece('a', 0, 30, window916(0.2), { fit: 'contain' }))).toBe(false);
    expect(isFramed(piece('a', 0, 30, window916(0.2), { mode: 'pip' }))).toBe(false);
  });

  it('盒是整幅原片：铺满再乘放大倍数，取景点在画面上的那一点不动', () => {
    expect(sourceSize(focal(0.5), assets)).toEqual({ width: 1920, height: 1080 });
    // 1920×1080 铺满 1080×1920：放大到 3413.3×1920，多出来的 2333.3 按 x 分到两边。
    const left = framedPose(focal(0), canvas, assets)!;
    expect(left.w).toBeCloseTo(3413.33, 1);
    expect(left.h).toBeCloseTo(1920, 6);
    expect(left.cx - left.w / 2).toBeCloseTo(0, 6);
    const zoomed = framedPose(focal(0.3, 0.5, 2), canvas, assets)!;
    expect(zoomed.w).toBeCloseTo(6826.67, 1);
    // 原片上 x 0.3 那一点落在画面 x 0.3 处（324 像素）。
    expect(zoomed.cx - zoomed.w / 2 + 0.3 * zoomed.w).toBeCloseTo(324, 6);
    expect(framingAnchor(focal(0.3, 0.5, 2), canvas)).toEqual({ x: 324, y: 960 });
    expect(framedPose(focal(0.5), canvas, undefined)).toBeNull();
    // 舞台用的盒：按原片取景的是整幅原片，别的照帧计划。
    expect(stagePose(focal(0), canvas, assets)).toEqual(left);
    const pip = piece('p', 0, 30, undefined, { mode: 'pip', place: { x: 50, y: 50, w: 40 } });
    expect(stagePose(pip as FramedVideo, canvas, assets)).toEqual(poseOf(pip as FramedVideo, canvas, assets));
  });

  it('拖角：按指针到取景点落点的距离比放大，夹在 1–4 倍，缩过头、放过头时说一句', () => {
    const item = focal(0.3, 0.5, 1.5);
    const g = zoomGesture(item, { x: 324 + 100, y: 960 }, canvas, assets);
    expect(g.anchor).toEqual({ x: 324, y: 960 });
    const twice = stepGesture(g, { x: 324 + 200, y: 960 }, mods, env);
    expect(twice.framing).toEqual({ crop: null, focalPoint: { x: 0.3, y: 0.5, zoom: 3 } });
    expect(twice.hit).toBeNull();
    // 草稿只叠取景，盒按它现算。
    expect(gesturePatch(item, twice.poses[0]!, 1, canvas, assets, twice.framing)).toEqual({ framing: twice.framing });
    const patched = patchItem(item, { framing: twice.framing }) as FramedVideo;
    expect(framedPose(patched, canvas, assets)!.w).toBeCloseTo(3413.33 * 3, 0);
    // 缩到比铺满还小：停在 1（不写 zoom），说「最小是铺满」。
    const small = stepGesture(g, { x: 324 + 10, y: 960 }, mods, env);
    expect(small.framing).toEqual({ crop: null, focalPoint: { x: 0.3, y: 0.5 } });
    expect(small.hit).toBe('min');
    const big = stepGesture(g, { x: 324 + 1000, y: 960 }, mods, env);
    expect(big.framing!.focalPoint!.zoom).toBe(4);
    expect(big.hit).toBe('max');
    expect(framingOperations('s1', item, twice.framing!)).toEqual([
      { type: 'setStyle', sequenceId: 's1', itemId: 'a', focalPoint: { x: 0.3, y: 0.5, zoom: 3 } },
    ]);
    expect(framingOperations('s1', item, framingOf(item))).toEqual([]);
  });

  it('旧的只带裁剪的视频补一个居中的取景点，裁剪留着；拖画面本身什么都不写', () => {
    const legacy = piece('b', 0, 30, window916(0.3)) as FramedVideo;
    expect(withZoom(legacy, 2)).toEqual({ crop: window916(0.3), focalPoint: { x: 0.5, y: 0.5, zoom: 2 } });
    // 缩回 100%（拖角往里、滑杆松在 100%）看到的和原来一样，不写一笔空修改。
    expect(framingOperations('s1', legacy, withZoom(legacy, 1))).toEqual([]);
    expect(framingOperations('s1', legacy, withZoom(legacy, 2))).toEqual([
      { type: 'setStyle', sequenceId: 's1', itemId: 'b', focalPoint: { x: 0.5, y: 0.5, zoom: 2 } },
    ]);
    const hold = { kind: 'hold' as const, member: memberOf(legacy, canvas, assets), p0: { x: 540, y: 960 } };
    const frame = stepGesture(hold, { x: 700, y: 960 }, mods, env);
    expect(frame.hit).toBe('locked');
    expect(frame.framing).toBeUndefined();
    expect(gestureOperations('s1', [hold.member], frame.poses, 1, canvas)).toEqual([]);
  });

  it('填满画布是放大回 100%；改成自由摆放用此刻画面上那幅原片当画中画的框', () => {
    expect(fillFramingOperations('s1', focal(0.3, 0.5, 2))).toEqual([
      { type: 'setStyle', sequenceId: 's1', itemId: 'a', focalPoint: { x: 0.3, y: 0.5 } },
    ]);
    expect(fillFramingOperations('s1', focal(0.3))).toEqual([]);
    expect(fillFramingOperations('s1', piece('b', 0, 30, window916(0.3)) as FramedVideo)).toEqual([]);
    const item = focal(0.3, 0.5, 2);
    const ops = freeFramingOperations('s1', item, canvas, assets);
    expect(ops[0]).toEqual({ type: 'setStyle', sequenceId: 's1', itemId: 'a', mode: 'pip', focalPoint: null });
    const transform = ops[1] as Extract<EditOperation, { type: 'setTransform' }>;
    expect(transform.type).toBe('setTransform');
    // 换成画中画后帧计划推出的框就是原来画面上那幅原片。
    const { type: _type, sequenceId: _seq, itemId: _id, ...fields } = transform;
    const pip = { ...item, mode: 'pip', focalPoint: undefined, place: { ...item.place, ...fields } } as FramedVideo;
    const before = framedPose(item, canvas, assets)!;
    const after = poseOf(pip, canvas, assets);
    expect(after.cx).toBeCloseTo(before.cx, 0);
    expect(after.cy).toBeCloseTo(before.cy, 0);
    expect(after.w).toBeCloseTo(before.w, 0);
    expect(after.h).toBeCloseTo(before.h, 0);
    expect(freeFramingOperations('s1', item, canvas, undefined)).toEqual([]);
  });
});

describe('按镜头分段取景的小牌', () => {
  const a = piece('a', 0, 225, window916(0.1));
  const b = piece('b', 225, 300, window916(0.5));
  const overlay = piece('o', 0, 90, window916(0.2), { assetRef: { id: 'a2', revision: 'r1' } });
  const plain = piece('p', 525, 60, undefined);

  it('同一素材拆成不止一段取景、选中其中一段时才出', () => {
    const s = seq([b, a, overlay, plain]);
    expect(framingPieces(s, b).map((x) => x.id)).toEqual(['a', 'b']);
    expect(showsShotChip(s, a)).toBe(true);
    expect(showsShotChip(s, overlay)).toBe(false);
    expect(showsShotChip(s, plain)).toBe(false);
    expect(showsShotChip(seq([a, plain]), a)).toBe(false);
  });

  it('秒是子视频时间线上的起止，取整，至少 1 秒', () => {
    expect(shotSeconds(b as FramedVideo, { fps: { num: 30, den: 1 } })).toEqual({ from: 8, to: 18 });
    expect(shotSeconds(piece('t', 0, 6, window916(0)) as FramedVideo, { fps: { num: 30, den: 1 } })).toEqual({ from: 0, to: 1 });
  });

  it('套到整支：只把放大倍数写到其它几段，各段的取景点与裁剪不动，放大倍数一样的不写', () => {
    const zoomed = piece('z', 0, 225, undefined, { focalPoint: { x: 0.2, y: 0.5, zoom: 1.5 } });
    const other = piece('f', 225, 300, undefined, { focalPoint: { x: 0.7, y: 0.4 } });
    const same = piece('g', 525, 30, undefined, { focalPoint: { x: 0.1, y: 0.5, zoom: 1.5 } });
    const s = seq([zoomed, other, same, b, overlay]);
    const pieces = framingPieces(s, zoomed);
    expect(applyFramingToAll('s1', zoomed as FramedVideo, pieces)).toEqual([
      { type: 'setStyle', sequenceId: 's1', itemId: 'f', focalPoint: { x: 0.7, y: 0.4, zoom: 1.5 } },
      // 旧的只带裁剪的一段补居中的取景点，裁剪留着。
      { type: 'setStyle', sequenceId: 's1', itemId: 'b', focalPoint: { x: 0.5, y: 0.5, zoom: 1.5 } },
    ]);
    // 放大回 100% 的一段套到整支：写回不放大，没放大的不写。
    expect(applyFramingToAll('s1', other as FramedVideo, pieces)).toEqual([
      { type: 'setStyle', sequenceId: 's1', itemId: 'z', focalPoint: { x: 0.2, y: 0.5 } },
      { type: 'setStyle', sequenceId: 's1', itemId: 'g', focalPoint: { x: 0.1, y: 0.5 } },
    ]);
  });
});
