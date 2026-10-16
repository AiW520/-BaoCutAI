import type { SourceReplacement } from "../mermaid/label-source";
export function trimSourceReplacement(
  source: string,
  replacement: SourceReplacement,
  caret?: number | null,
): SourceReplacement {
  const slice = source.slice(replacement.from, replacement.to);
  let [items, items2] = [slice.length, replacement.insert.length];
  const value = Math.min(items, items2);
  let index = 0;
  while (
    index < value &&
    slice.charCodeAt(index) === replacement.insert.charCodeAt(index)
  )
    index++;
  let index2 = 0;
  while (
    index2 < value &&
    slice.charCodeAt(items - 1 - index2) ===
      replacement.insert.charCodeAt(items2 - 1 - index2)
  )
    index2++;
  if (index + index2 > value && caret != null && items !== items2) {
    const value2 = items2 > items ? caret - (items2 - items) : caret;
    index = Math.max(value - index2, Math.min(index, value2));
  }
  index2 = Math.min(index2, value - index);
  return {
    from: replacement.from + index,
    to: replacement.to - index2,
    insert: replacement.insert.slice(index, items2 - index2),
  };
}
export const mermaidWriteMeta = "mm-write";
export const mermaidSiblingWritesMeta = "cwMermaidSiblingWrites";
