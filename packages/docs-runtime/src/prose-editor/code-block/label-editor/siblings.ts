import { bracketLabels } from "../mermaid/bracket-labels";
import { replaceDeclaredLabel } from "../mermaid/label-edit";
import { matchesWrittenLabel } from "../mermaid/label-encoding";
import type {
  BracketLabel,
  HeldDiagramLabel,
  LabelCopies,
  SourceRange,
  SourceReplacement,
} from "../mermaid/label-source";
import { matchingSiblingEdits } from "../mermaid/sibling-label-edits";
import type { LabelEditorSession } from "./session";
function copiesOf(
  source: string,
  id: string,
  primary: SourceRange | null,
  original: string,
) {
  const labels = bracketLabels(source, id);
  const primaryIndex = primary
    ? labels.findIndex(
        (input2) => input2.group.from >= primary.from && input2.group.to <= primary.to,
      )
    : -1;
  const primaryText =
    primaryIndex >= 0
      ? source.slice(labels[primaryIndex].from, labels[primaryIndex].to).trim()
      : null;
  const siblings: number[] = [];
  labels.forEach((input2, options2) => {
    if (options2 === primaryIndex || primaryIndex < 0) return;
    if (
      matchesWrittenLabel(source, input2, original) ||
      source.slice(input2.from, input2.to).trim() === primaryText
    )
      siblings.push(options2);
  });
  return {
    groups: labels.map((input2) => source.slice(input2.group.from, input2.group.to)),
    idx: siblings,
    pi: primaryIndex,
  };
}
function copiesAligned(
  source: string,
  labels: readonly BracketLabel[],
  primary: SourceRange,
  copies: LabelCopies,
) {
  const overlapsPrimary = (input2: BracketLabel) =>
    (primary.from >= input2.group.from && primary.to <= input2.group.to) ||
    (input2.group.from >= primary.from && input2.group.to <= primary.to);
  return (
    labels.length === copies.groups.length &&
    (copies.pi < 0 || labels.findIndex(overlapsPrimary) === copies.pi) &&
    labels.every(
      (input2, options2) =>
        overlapsPrimary(input2) ||
        copies.idx.includes(options2) ||
        source.slice(input2.group.from, input2.group.to) === copies.groups[options2],
    )
  );
}
function siblingsByText(
  source: string,
  id: string,
  primary: SourceRange,
  written: string,
  replacement: string,
  copies: LabelCopies,
) {
  const unrelatedGroups = new Set(
    copies.groups.filter(
      (input2, options2) => options2 !== copies.pi && !copies.idx.includes(options2),
    ),
  );
  const labels = bracketLabels(source, id);
  return matchingSiblingEdits(source, id, primary, written, replacement).filter(
    (input2) => {
      const match = labels.find(
        (input3) => input2.from >= input3.group.from && input2.to <= input3.group.to,
      );
      return (
        !match || !unrelatedGroups.has(source.slice(match.group.from, match.group.to))
      );
    },
  );
}
function siblingWrites(
  held: HeldDiagramLabel | null,
  source: string,
  edit: SourceRange,
  session: LabelEditorSession,
  replacement: string,
) {
  const heldLabel = held;
  if (!heldLabel?.id || !session.copies) return [];
  const labels = bracketLabels(source, heldLabel.id);
  if (!copiesAligned(source, labels, edit, session.copies))
    return siblingsByText(
      source,
      heldLabel.id,
      edit,
      session.written,
      replacement,
      session.copies,
    );
  const match = labels.find(
    (input2) => edit.from >= input2.group.from && edit.to <= input2.group.to,
  );
  const primaryText = match ? source.slice(match.from, match.to).trim() : null;
  const edits: SourceReplacement[] = [];
  for (const value4 of session.copies.idx) {
    const value5 = labels[value4];
    if (value5 === match) continue;
    if (
      !matchesWrittenLabel(source, value5, session.written) &&
      source.slice(value5.from, value5.to).trim() !== primaryText
    )
      continue;
    const value6 = replaceDeclaredLabel(source, value5, replacement);
    if (value6) edits.push(value6);
  }
  return edits;
}
function siblingReverts(
  held: HeldDiagramLabel | null,
  source: string,
  primary: SourceRange,
  session: LabelEditorSession,
) {
  const heldLabel = held;
  if (!heldLabel?.id || !session.copies) return [];
  let { groups, idx } = session.copies;
  const labels = bracketLabels(source, heldLabel.id);
  const containsGroup = (input2: BracketLabel) =>
    input2.group.from >= primary.from && input2.group.to <= primary.to;
  if (!copiesAligned(source, labels, primary, session.copies)) {
    const match2 = labels.find(containsGroup);
    return match2
      ? siblingsByText(
          source,
          heldLabel.id,
          match2,
          session.written,
          session.original,
          session.copies,
        )
      : [];
  }
  const match = labels.find(containsGroup);
  const primaryText = match ? source.slice(match.from, match.to).trim() : null;
  const edits: SourceReplacement[] = [];
  for (const value4 of idx) {
    const value5 = labels[value4];
    if (containsGroup(value5)) continue;
    if (
      !matchesWrittenLabel(source, value5, session.written) &&
      source.slice(value5.from, value5.to).trim() !== primaryText
    )
      continue;
    if (source.slice(value5.group.from, value5.group.to) !== groups[value4])
      edits.push({
        from: value5.group.from,
        to: value5.group.to,
        insert: groups[value4],
      });
  }
  return edits;
}
export { copiesOf, siblingReverts, siblingWrites };
