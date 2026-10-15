import { DOCS_ANNOTATION_LIMITS, parseDocsPath, type DocsAnnotation } from '@baocut/protocol';
import { targetKey } from './workspace.ts';

/**
 * 会话里的协作文档标注（docs/design/docs §8）：草稿的增删与发送时交出去的那一份。与设计稿标注（design-annotations.ts）同一套规则，
 * 不同的是没有批注框、也没有编号标记：编辑器里点「发给智能体」（评论线程 `comment`，或空行上写给智能体的请求 `ask`）直接进草稿，
 * 评论本身已经存在文档里，标注只是指向它。纯函数，无 React、无 DOM。
 */

/** 草稿里的一条：协议的 `DocsAnnotation` 加一个只在界面里用的 id（删除、跳转用）。 */
export type DraftDocsAnnotation = DocsAnnotation & { id: string };

/** 加不进去的原因：空的、超长的、超过条数的。 */
export type DocsAnnotationError = 'empty' | 'too-long' | 'too-many';

/** `editor:reveal` 的 id 上限（`@baocut/slides/editor-messages` 的校验）。 */
const REVEAL_ID_MAX = 100;

/**
 * 新加一条：正文与原文去掉首尾空白；空的、超长的、超过条数的都不收。
 * 同一份文档、同一种、同一个位置的已经在草稿里时（同一条评论线程又发了一次）换成新的这条，位置与 id 不变，不算新加。
 */
export function addDocsAnnotation(
  list: readonly DraftDocsAnnotation[],
  note: DraftDocsAnnotation,
): { list: readonly DraftDocsAnnotation[]; error: DocsAnnotationError | null } {
  const text = note.text.trim();
  if (!text) return { list, error: 'empty' };
  if (text.length > DOCS_ANNOTATION_LIMITS.text) return { list, error: 'too-long' };
  const quote = note.quote?.trim().slice(0, DOCS_ANNOTATION_LIMITS.text);
  const { id, doc, kind, path, label } = note;
  const next: DraftDocsAnnotation = { id, doc, kind, path, label, ...(quote ? { quote } : {}), text };
  const key = targetKey(note.doc);
  const at = list.findIndex((n) => n.kind === note.kind && n.path === note.path && targetKey(n.doc) === key);
  if (at >= 0) return { list: list.map((n, i) => (i === at ? { ...next, id: n.id } : n)), error: null };
  if (list.length >= DOCS_ANNOTATION_LIMITS.perMessage) return { list, error: 'too-many' };
  return { list: [...list, next], error: null };
}

export function removeDocsAnnotation(list: readonly DraftDocsAnnotation[], id: string): readonly DraftDocsAnnotation[] {
  return list.some((n) => n.id === id) ? list.filter((n) => n.id !== id) : list;
}

/** 随消息交出去的那一份：去掉界面里的 id，字段按协议排。 */
export function sentDocsAnnotations(list: readonly DraftDocsAnnotation[]): DocsAnnotation[] {
  return list.map(({ doc, kind, path, label, quote, text }) => ({ doc, kind, path, label, ...(quote ? { quote } : {}), text }));
}

/**
 * 点一条标注时交给编辑器的 `editor:reveal` id（尽力而为）：路径里的评论线程、块或正文节点 id，越具体越先；
 * 路径不是这个写法时用路径本身（超过 `editor:reveal` 的上限时不跳，返回 null）。
 */
export function docsRevealId(path: string): string | null {
  const parts = parseDocsPath(path);
  const id = parts ? (parts.thread ?? parts.block ?? parts.node) : path;
  return id.length <= REVEAL_ID_MAX ? id : null;
}
