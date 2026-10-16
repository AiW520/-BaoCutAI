import { bracketLabels } from "./bracket-labels";
import { replaceDeclaredLabel } from "./label-edit";
import { decodedSourceLabel, decodeMermaidLabel } from "./label-encoding";
import type { SourceRange, SourceReplacement } from "./label-source";
function matchingSiblingEdits(
  source: string,
  id: string,
  primary: SourceRange,
  written: string,
  replacement: string,
): SourceReplacement[] {
  const edits: SourceReplacement[] = [];
  const labels = bracketLabels(source, id);
  const match = labels.find(
    (input2) => primary.from >= input2.group.from && primary.to <= input2.group.to,
  );
  const primaryText = match ? source.slice(match.from, match.to).trim() : null;
  for (const value4 of labels) {
    if (value4 === match) continue;
    const value5 = decodedSourceLabel(source, value4);
    if (
      value5 !== written.trim() &&
      value5 !== decodeMermaidLabel(written).trim() &&
      source.slice(value4.from, value4.to).trim() !== primaryText
    )
      continue;
    const value6 = replaceDeclaredLabel(source, value4, replacement);
    if (value6) edits.push(value6);
  }
  return edits;
}
export { matchingSiblingEdits };
