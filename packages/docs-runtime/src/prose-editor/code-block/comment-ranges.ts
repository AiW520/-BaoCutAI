import type { Node } from "prosemirror-model";
import type { DecorationSource } from "prosemirror-view";

export interface CodeCommentRange {
  from: number;
  to: number;
  threadId: string;
}

export function markedCodeCommentRanges(node: Node): CodeCommentRange[] {
  const ranges: CodeCommentRange[] = [];
  let offset = 0;
  node.content.forEach((child) => {
    const length = child.text?.length ?? child.nodeSize;
    for (const mark of child.marks) {
      const threadId: unknown = mark.attrs.threadId;
      if (mark.type.name === "commentAnchor" && typeof threadId === "string")
        ranges.push({ from: offset, to: offset + length, threadId });
    }
    offset += length;
  });
  return ranges;
}

export function decoratedCodeCommentRanges(
  decorations: DecorationSource | null | undefined,
  length: number,
): CodeCommentRange[] {
  const ranges: CodeCommentRange[] = [];
  const isComment = (
    spec: { thread?: unknown; cell?: unknown } | null | undefined,
  ): boolean =>
    typeof spec?.thread === "string" && spec.thread !== "" && spec.cell !== true;
  decorations?.forEachSet((set) => {
    for (const decoration of set.find(0, length, isComment)) {
      const from = Math.max(0, decoration.from);
      const to = Math.min(length, decoration.to);
      const threadId: unknown = decoration.spec.thread;
      if (from < to && typeof threadId === "string") ranges.push({ from, to, threadId });
    }
  });
  return ranges.toSorted(
    (left, right) =>
      left.from - right.from ||
      left.to - right.to ||
      (left.threadId < right.threadId ? -1 : left.threadId > right.threadId ? 1 : 0),
  );
}

export function codeThreadRange(
  ranges: readonly CodeCommentRange[],
  thread: unknown,
): { from: number; to: number } | null {
  let range: { from: number; to: number } | null = null;
  for (const candidate of ranges) {
    if (candidate.threadId !== thread) continue;
    range = range
      ? {
          from: Math.min(range.from, candidate.from),
          to: Math.max(range.to, candidate.to),
        }
      : { from: candidate.from, to: candidate.to };
  }
  return range;
}

export function partitionCodeComments(
  source: string,
  ranges: readonly CodeCommentRange[],
  excluded: ReadonlySet<string>,
): { whole: Set<string>; inline: CodeCommentRange[] } {
  const threads = new Map<string, { from: number; to: number }>();
  for (const range of ranges) {
    const previous = threads.get(range.threadId);
    threads.set(
      range.threadId,
      previous
        ? {
            from: Math.min(previous.from, range.from),
            to: Math.max(previous.to, range.to),
          }
        : { from: range.from, to: range.to },
    );
  }
  let start = 0;
  while (start < source.length && /\s/.test(source[start])) start++;
  let end = source.length;
  while (end > start && /\s/.test(source[end - 1])) end--;
  const whole = new Set<string>();
  const inline: CodeCommentRange[] = [];
  for (const [threadId, range] of threads) {
    if (excluded.has(threadId)) continue;
    if (end > start && range.from <= start && range.to >= end) whole.add(threadId);
    else inline.push({ from: range.from, to: range.to, threadId });
  }
  return { whole, inline };
}
