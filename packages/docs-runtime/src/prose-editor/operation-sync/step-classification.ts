import type { Node } from "prosemirror-model";
import { ReplaceAroundStep, ReplaceStep, type Step } from "prosemirror-transform";

export function isBlockShellReplacement(step: Step, document: Node): boolean {
  if (!(step instanceof ReplaceAroundStep)) return false;
  if (step.from > document.content.size || step.to > document.content.size) return false;
  const original = document.nodeAt(step.from);
  const replacement =
    step.slice.content.childCount === 1 ? step.slice.content.firstChild : null;
  return (
    !!original &&
    !!replacement &&
    !original.isInline &&
    replacement.content.size === 0 &&
    typeof original.attrs.bid === "string" &&
    replacement.attrs.bid === original.attrs.bid &&
    step.insert === 1 &&
    step.gapFrom === step.from + 1 &&
    step.gapTo === step.to - 1 &&
    step.to === step.from + original.nodeSize
  );
}

export function isSameTypeBlockShellReplacement(step: Step, document: Node): boolean {
  if (!(step instanceof ReplaceAroundStep)) return false;
  if (step.from > document.content.size || step.to > document.content.size) return false;
  const original = document.nodeAt(step.from);
  const replacement =
    step.slice.content.childCount === 1 ? step.slice.content.firstChild : null;
  return (
    !!original &&
    !!replacement &&
    !original.isInline &&
    replacement.type === original.type &&
    replacement.content.size === 0 &&
    typeof original.attrs.bid === "string" &&
    replacement.attrs.bid === original.attrs.bid &&
    step.insert === 1 &&
    step.gapFrom === step.from + 1 &&
    step.gapTo === step.to - 1 &&
    step.to === step.from + original.nodeSize
  );
}

export function isInlineLeafReplacement(step: Step, document: Node): boolean {
  if (!(step instanceof ReplaceStep)) return false;
  const { from, to, slice } = step;
  if (
    to !== from + 1 ||
    to > document.content.size ||
    slice.openStart !== 0 ||
    slice.openEnd !== 0 ||
    slice.content.childCount !== 1
  )
    return false;
  const original = document.nodeAt(from);
  const replacement = slice.content.firstChild;
  return (
    !!original &&
    original.isInline &&
    original.isLeaf &&
    !original.isText &&
    replacement?.type === original.type
  );
}

export function isStructurePreservingStep(step: Step, document: Node): boolean {
  let changesPositions = false;
  step.getMap().forEach(() => {
    changesPositions = true;
  });
  if (
    !changesPositions ||
    isSameTypeBlockShellReplacement(step, document) ||
    isBlockShellReplacement(step, document) ||
    isInlineLeafReplacement(step, document)
  )
    return true;
  if (!(step instanceof ReplaceStep)) return false;
  return step.from === step.to && step.slice.openStart === 0 && step.slice.openEnd === 0;
}

/** Unchanged text at either edge must not count as a foreign edit taking text. */
export function replacementTextEdges(
  step: Step,
  document: Node,
): { head: number; tail: number } {
  const unchanged = { head: 0, tail: 0 };
  if (
    !(step instanceof ReplaceStep) ||
    step.from === step.to ||
    step.slice.openStart ||
    step.slice.openEnd
  )
    return unchanged;
  const content = step.slice.content;
  for (let index = 0; index < content.childCount; index++)
    if (!content.child(index).isText) return unchanged;
  if (!document.resolve(step.from).sameParent(document.resolve(step.to)))
    return unchanged;
  const before = document.textBetween(step.from, step.to, "\uFFFC", "\uFFFC");
  const after = content.textBetween(0, content.size);
  if (before.includes("\uFFFC") || before.length !== step.to - step.from)
    return unchanged;
  let head = 0;
  while (head < before.length && head < after.length && before[head] === after[head])
    head++;
  let tail = 0;
  while (
    tail < before.length - head &&
    tail < after.length - head &&
    before[before.length - 1 - tail] === after[after.length - 1 - tail]
  )
    tail++;
  return { head, tail };
}
