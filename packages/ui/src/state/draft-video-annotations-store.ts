import { create } from 'zustand';
import type { Id } from '@baocut/protocol';
import {
  addVideoAnnotation,
  removeVideoAnnotation,
  type DraftVideoAnnotation,
  type VideoAnnotationError,
} from '../model/video-annotations.ts';

/**
 * 编辑器预览画面上加进对话的视频标注（产品设计 §3.2.3「视频标注」），按**视频 id** 分：编辑器的快聊会话常常还没建，
 * 所以草稿挂在视频上，不挂在会话上（原型 store.jsx 的 `videoNotes[videoId]`）。composer 上显示「视频标注 · N 条」，
 * 发送时随消息交出去，发出去的那几条摘掉。只在这个窗口里，不持久化（同另外三种标注）。
 */
interface DraftVideoAnnotationsStore {
  /** 视频 id → 按添加顺序的标注。 */
  annotations: Record<Id, readonly DraftVideoAnnotation[]>;
  /** 接在后面加一条；加不进去时返回原因，草稿不变。 */
  add(videoId: Id, note: DraftVideoAnnotation): VideoAnnotationError | null;
  remove(videoId: Id, id: string): void;
  clear(videoId: Id): void;
  /** 发出去了：摘掉发出去的那几条（发送期间新加的留着）。 */
  sent(videoId: Id, ids: readonly string[]): void;
}

const EMPTY: readonly DraftVideoAnnotation[] = [];

export const useDraftVideoAnnotations = create<DraftVideoAnnotationsStore>()((set, get) => {
  const write = (videoId: Id, next: readonly DraftVideoAnnotation[]) =>
    set((s) => {
      if (next === (s.annotations[videoId] ?? EMPTY)) return {};
      const annotations = { ...s.annotations };
      if (next.length) annotations[videoId] = next;
      else delete annotations[videoId];
      return { annotations };
    });
  return {
    annotations: {},
    add: (videoId, note) => {
      const { list, error } = addVideoAnnotation(get().annotations[videoId] ?? EMPTY, note);
      if (!error) write(videoId, list);
      return error;
    },
    remove: (videoId, id) => write(videoId, removeVideoAnnotation(get().annotations[videoId] ?? EMPTY, id)),
    clear: (videoId) => write(videoId, EMPTY),
    sent: (videoId, ids) => {
      const gone = new Set(ids);
      const before = get().annotations[videoId] ?? EMPTY;
      const after = before.filter((n) => !gone.has(n.id));
      write(videoId, after.length === before.length ? before : after);
    },
  };
});

/** 这部视频草稿里的视频标注；没有时是同一个空数组（订阅不抖）。 */
export function useDraftVideoAnnotationList(videoId: Id | null | undefined): readonly DraftVideoAnnotation[] {
  return useDraftVideoAnnotations((s) => (videoId ? (s.annotations[videoId] ?? EMPTY) : EMPTY));
}
