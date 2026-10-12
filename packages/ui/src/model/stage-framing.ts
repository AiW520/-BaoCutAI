import { FOCAL_MAX_ZOOM, focalZoom, videoDisplaySize, type Crop, type EditOperation, type FocalPoint, type Id, type SequenceItem, type VideoItem } from '@baocut/protocol';
import { placeFields, poseOf, type Assets, type CanvasSize, type Point, type Pose } from './stage-pose.ts';

/**
 * 按原片取景（产品设计 §5.10「画面怎么取景」，原型 model-framing.js 与 stage-framing.jsx）：铺满画面、`cover`、带取景点的视频。
 * 剪成短视频时每段原片都这样摆：取景点是剪的时候按画面里的人找到的位置，按镜头分段时每段各有一份；换画幅时按新画幅重新对准，
 * 画面始终铺满。所以画布上只能围着取景点放大、缩小（`focalPoint.zoom`，视频格式规范 §3.5），不能拖动、留边、拉伸或旋转；
 * 要自己摆就明确地「改成自由摆放」。旧的短视频只带裁剪、没有取景点，按居中的取景点看（看到的一样）。
 */

export type FramedVideo = VideoItem;

export function isFramed(item: SequenceItem): item is FramedVideo {
  return item.type === 'video' && item.mode === 'fullscreen' && (item.fit ?? 'cover') === 'cover' && !!(item.crop || item.focalPoint);
}

/** 源的显示尺寸（已按旋转交换，乘上像素宽高比；与 `render-graph` 的 `display_size` 同口径）；素材表里没有时 null。 */
export function sourceSize(item: VideoItem, assets: Assets | undefined): { width: number; height: number } | null {
  return videoDisplaySize(assets?.[item.assetRef.id]?.revisions[item.assetRef.revision]);
}

/** 视频的取景：裁剪与取景点（视频格式规范 §3.5），没有的是 null。 */
export interface ItemFraming {
  crop: Crop | null;
  focalPoint: FocalPoint | null;
}

export const framingOf = (item: VideoItem): ItemFraming => ({ crop: item.crop ?? null, focalPoint: item.focalPoint ?? null });

/** 缩过头、放过头多少倍才说一句（手上的抖动不该一直弹）；拖画面本身是 `locked`。 */
const SLACK = 0.03;
export type FramingHit = 'locked' | 'min' | 'max';

/**
 * 铺满画布的盒随 `rot` 与镜像绕画布中心转、翻（帧计划里铺满的视频就是画布那么大的框）：画布上的点 → 画面上看到的位置。
 */
function onScreen(item: FramedVideo, canvas: CanvasSize, p: Point): Point {
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const x = item.place.flipX ? 2 * cx - p.x : p.x;
  const y = item.place.flipY ? 2 * cy - p.y : p.y;
  const a = ((item.place.rot ?? 0) * Math.PI) / 180;
  if (!a) return { x, y };
  const cos = Math.cos(a);
  const sin = Math.sin(a);
  return { x: cx + (x - cx) * cos - (y - cy) * sin, y: cy + (x - cx) * sin + (y - cy) * cos };
}

/** 取景点落在画面上的那一点（画布像素）：原片上取景点那一点永远落在画面的同一比例处，放大围着它，准星也画在这里。 */
export function framingAnchor(item: FramedVideo, canvas: CanvasSize): Point {
  const f = item.focalPoint;
  return onScreen(item, canvas, { x: (f?.x ?? 0.5) * canvas.width, y: (f?.y ?? 0.5) * canvas.height });
}

/**
 * 画布上的盒：整幅原片（裁剪留下的那块）按 `cover` 铺满再乘放大倍数，多出来的按取景点分到两边（与 `render-graph` 的
 * `media_layer` 同口径）。选中框和四角落在原片的边上，可以超出画面。不知道源尺寸时 null。
 */
export function framedPose(item: FramedVideo, canvas: CanvasSize, assets: Assets | undefined): Pose | null {
  const source = sourceSize(item, assets);
  const c = item.crop ?? { left: 0, top: 0, right: 0, bottom: 0 };
  const sw = (1 - c.left - c.right) * (source?.width ?? 0);
  const sh = (1 - c.top - c.bottom) * (source?.height ?? 0);
  if (!(sw > 0) || !(sh > 0) || !(canvas.width > 0) || !(canvas.height > 0)) return null;
  const scale = Math.max(canvas.width / sw, canvas.height / sh) * focalZoom(item.focalPoint);
  const w = sw * scale;
  const h = sh * scale;
  const fx = item.focalPoint?.x ?? 0.5;
  const fy = item.focalPoint?.y ?? 0.5;
  const center = onScreen(item, canvas, { x: (canvas.width - w) * fx + w / 2, y: (canvas.height - h) * fy + h / 2 });
  return { cx: center.x, cy: center.y, w, h, rotation: item.place.rot ?? 0 };
}

/** 换放大倍数：取景点与裁剪不动（旧的只带裁剪的视频补一个居中的取景点，看到的一样），夹在 [1, 上限]，取三位小数，1 不写。 */
export function withZoom(item: FramedVideo, zoom: number): ItemFraming {
  const z = Math.round(Math.min(FOCAL_MAX_ZOOM, Math.max(1, Number.isFinite(zoom) ? zoom : 1)) * 1000) / 1000;
  const x = item.focalPoint?.x ?? 0.5;
  const y = item.focalPoint?.y ?? 0.5;
  return { crop: item.crop ?? null, focalPoint: z === 1 ? { x, y } : { x, y, zoom: z } };
}

/**
 * 拖角缩放（画布像素）：起手的放大倍数 × 指针到取景点落点的距离比，于是那一点在画面上不动、角柄一直跟着手。
 * 想缩到比铺满还小时 `hit` 为 `min`，超过上限时为 `max`。
 */
export function zoomFraming(item: FramedVideo, anchor: Point, p0: Point, p: Point): { framing: ItemFraming; hit: FramingHit | null } {
  const d0 = Math.hypot(p0.x - anchor.x, p0.y - anchor.y);
  const start = focalZoom(item.focalPoint);
  const want = d0 > 1e-6 ? (start * Math.hypot(p.x - anchor.x, p.y - anchor.y)) / d0 : start;
  return { framing: withZoom(item, want), hit: want < 1 - SLACK ? 'min' : want > FOCAL_MAX_ZOOM + SLACK ? 'max' : null };
}

const sameCrop = (a: Crop | undefined, b: Crop | null) =>
  a && b ? a.left === b.left && a.top === b.top && a.right === b.right && a.bottom === b.bottom : !a && !b;
/** 没有取景点就是居中、不放大（渲染器的缺省）：旧的只带裁剪的视频缩回 100% 时不该多出一笔什么都没变的修改。 */
const CENTER: FocalPoint = { x: 0.5, y: 0.5 };
const sameFocal = (a: FocalPoint | undefined, b: FocalPoint | null) => {
  const p = a ?? CENTER;
  const q = b ?? CENTER;
  return p.x === q.x && p.y === q.y && focalZoom(p) === focalZoom(q);
};

/** 把取景写进一件视频：只写变了的裁剪与取景点（null 去掉）；都一样时是空表（不提交）。 */
export function framingOperations(sequenceId: Id, item: SequenceItem, framing: ItemFraming): EditOperation[] {
  if (item.type !== 'video') return [];
  const crop = sameCrop(item.crop, framing.crop) ? {} : { crop: framing.crop ? { ...framing.crop } : null };
  const focal = sameFocal(item.focalPoint, framing.focalPoint) ? {} : { focalPoint: framing.focalPoint ? { ...framing.focalPoint } : null };
  if (!('crop' in crop) && !('focalPoint' in focal)) return [];
  return [{ type: 'setStyle', sequenceId, itemId: item.id, ...crop, ...focal }];
}

/** 「填满画布」：放大回 100%。已经是 100% 的空表。 */
export function fillFramingOperations(sequenceId: Id, item: FramedVideo): EditOperation[] {
  return focalZoom(item.focalPoint) === 1 ? [] : framingOperations(sequenceId, item, withZoom(item, 1));
}

/**
 * 改成自由摆放：换成画中画，盒就是此刻画面上那幅原片（切换的那一下画面不动），去掉取景点；裁剪留着（框按留下的那块的宽高比）。
 * 之后换画幅时这一段不再自动对准。一笔事务；不知道源尺寸时空表。
 */
export function freeFramingOperations(sequenceId: Id, item: FramedVideo, canvas: CanvasSize, assets: Assets | undefined): EditOperation[] {
  const pose = framedPose(item, canvas, assets);
  if (!pose) return [];
  const { focalPoint: _focal, ...rest } = item;
  const pip: VideoItem = { ...rest, mode: 'pip' };
  const fields = placeFields(pip, pose, canvas, assets);
  return [
    { type: 'setStyle', sequenceId, itemId: item.id, mode: 'pip', focalPoint: null },
    ...(Object.keys(fields).length ? [{ type: 'setTransform' as const, sequenceId, itemId: item.id, ...fields }] : []),
  ];
}

/** 选中框用的盒：按原片取景的视频是整幅原片，其余照帧计划的框。 */
export function stagePose(item: Parameters<typeof poseOf>[0], canvas: CanvasSize, assets: Assets | undefined): Pose {
  return (isFramed(item) ? framedPose(item, canvas, assets) : null) ?? poseOf(item, canvas, assets);
}
