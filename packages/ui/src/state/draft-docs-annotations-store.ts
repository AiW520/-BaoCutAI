import { create } from 'zustand';
import type { Id } from '@baocut/protocol';
import { addDocsAnnotation, removeDocsAnnotation, type DocsAnnotationError, type DraftDocsAnnotation } from '../model/docs-annotations.ts';

/**
 * 协作文档标签里发给智能体的评论与请求（docs/design/docs §8），按会话 id 分；composer 上显示「协作文档标注 · N 条」，
 * 发送时随消息交出去。只在这个窗口里，不持久化（同设计稿标注，draft-design-annotations-store.ts）。
 * 标注只加在建好的会话上：文档标签所在的位置还没有会话时不收（标签页回编辑器 `ok: false` 并提示）。
 */
interface DraftDocsAnnotationsStore {
  /** 会话 id → 按添加顺序的标注。 */
  annotations: Record<Id, readonly DraftDocsAnnotation[]>;
  /** 接在后面加一条（同一个位置的换掉旧的）；加不进去时返回原因，草稿不变。 */
  add(conversationId: Id, note: DraftDocsAnnotation): DocsAnnotationError | null;
  remove(conversationId: Id, id: string): void;
  clear(conversationId: Id): void;
  /** 发出去了：摘掉发出去的那几条（发送期间新加的留着）。 */
  sent(conversationId: Id, ids: readonly string[]): void;
}

const EMPTY: readonly DraftDocsAnnotation[] = [];

export const useDraftDocsAnnotations = create<DraftDocsAnnotationsStore>()((set, get) => {
  const write = (conversationId: Id, next: readonly DraftDocsAnnotation[]) =>
    set((s) => {
      if (next === (s.annotations[conversationId] ?? EMPTY)) return {};
      const annotations = { ...s.annotations };
      if (next.length) annotations[conversationId] = next;
      else delete annotations[conversationId];
      return { annotations };
    });
  return {
    annotations: {},
    add: (conversationId, note) => {
      const { list, error } = addDocsAnnotation(get().annotations[conversationId] ?? EMPTY, note);
      if (!error) write(conversationId, list);
      return error;
    },
    remove: (conversationId, id) => write(conversationId, removeDocsAnnotation(get().annotations[conversationId] ?? EMPTY, id)),
    clear: (conversationId) => write(conversationId, EMPTY),
    sent: (conversationId, ids) => {
      const gone = new Set(ids);
      const before = get().annotations[conversationId] ?? EMPTY;
      const after = before.filter((n) => !gone.has(n.id));
      write(conversationId, after.length === before.length ? before : after);
    },
  };
});

/** 这个会话草稿里的协作文档标注；没有时是同一个空数组（订阅不抖）。 */
export function useDraftDocsAnnotationList(conversationId: Id | null): readonly DraftDocsAnnotation[] {
  return useDraftDocsAnnotations((s) => (conversationId ? (s.annotations[conversationId] ?? EMPTY) : EMPTY));
}
