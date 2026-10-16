import { firstBareIdentifier } from "./bare-identifiers";
import { bracketLabels } from "./bracket-labels";
import { decodeMermaidLabel } from "./label-encoding";
import type { LabelMatch, SourceRange } from "./label-source";
import { maskNonIdentifiers } from "./masked-identifiers";
import { shapeDataLabel } from "./shape-labels";
import {
  edgeLabelKind,
  endsWithUnfinishedEdge,
  isEdgeLabelPosition,
  isIdentifierBoundary,
} from "./source-context";
import { stateDeclaration } from "./state-declarations";
const isLabelWordCharacter = (character: string | null | undefined): boolean =>
  character != null && /[\p{L}\p{N}_]/u.test(character);
function sequenceParticipantLabel(source: string, id: string): SourceRange | null {
  let index = 0;
  while (index <= source.length) {
    let value = source.indexOf(
      `
`,
      index,
    );
    if (value < 0) value = source.length;
    const slice = source.slice(index, value);
    const value2 = /^[ \t]*(participant|actor)[ \t]+/.exec(slice);
    if (value2 && slice.startsWith(id, value2[0].length)) {
      const slice2 = slice.slice(value2[0].length + id.length);
      const value3 = /^[ \t]+as[ \t]+/.exec(slice2);
      if (value3) {
        const value4 = index + value2[0].length + id.length + value3[0].length;
        let value5 = value;
        while (
          value5 > value4 &&
          (source[value5 - 1] === " " || source[value5 - 1] === "\t")
        )
          value5--;
        if (value5 > value4)
          return {
            from: value4,
            to: value5,
          };
      }
    }
    if (value >= source.length) break;
    index = value + 1;
  }
  return null;
}
function firstVisibleIdentifier(source: string, id: string): number {
  if (!id) return -1;
  const value = maskNonIdentifiers(source);
  for (
    let value2 = source.indexOf(id);
    value2 >= 0;
    value2 = source.indexOf(id, value2 + 1)
  ) {
    if (
      value[value2] !== source[value2] ||
      !isIdentifierBoundary(source, value2, id.length)
    )
      continue;
    if (
      endsWithUnfinishedEdge(
        value.slice(
          source.lastIndexOf(
            `
`,
            value2 - 1,
          ) + 1,
          value2,
        ),
      )
    )
      continue;
    return value2;
  }
  return -1;
}
function findLabelMatch(
  source: string,
  id: string | null,
  label: string | null,
): LabelMatch | null {
  const displayLabel = label?.trim() ?? "";
  const escapedLabel = displayLabel.replace(/"/g, "#quot;");
  const unescapedLabel = id != null && escapedLabel === displayLabel;
  if (displayLabel && unescapedLabel && id !== null)
    for (const value4 of bracketLabels(source, id)) {
      const slice = source.slice(value4.from, value4.to);
      let value5 = slice.trim();
      if (value5.length >= 2 && value5[0] === '"' && value5[value5.length - 1] === '"')
        value5 = value5.slice(1, -1).trim();
      if (value5.length >= 2 && value5[0] === "`" && value5[value5.length - 1] === "`")
        value5 = value5.slice(1, -1).trim();
      if (value5 === displayLabel)
        return {
          at: value4.from + slice.indexOf(displayLabel),
          len: displayLabel.length,
          by: "label",
        };
    }
  if (displayLabel && id) {
    const value4 = stateDeclaration(source, id);
    const value5 = value4 ? source.slice(value4.content.from, value4.content.to) : null;
    if (value4 && value5 === displayLabel)
      return {
        at: value4.content.from,
        len: displayLabel.length,
        by: "label",
      };
    if (
      value4 &&
      value5 != null &&
      value5 !== displayLabel &&
      decodeMermaidLabel(value5) === displayLabel
    )
      return {
        at: value4.content.from,
        len: value5.length,
        by: "id",
      };
    const value6 = escapedLabel !== displayLabel ? shapeDataLabel(source, id) : null;
    if (value6 && source.slice(value6.from, value6.to).trim() === escapedLabel)
      return {
        at: value6.from,
        len: escapedLabel.length,
        by: "id",
      };
  }
  if (displayLabel && unescapedLabel && id !== null) {
    const value4 = shapeDataLabel(source, id);
    const value5 = value4 ? source.slice(value4.from, value4.to) : null;
    if (value4 && value5 !== null && value5.trim() === displayLabel)
      return {
        at: value4.from + (value5.length - value5.trimStart().length),
        len: displayLabel.length,
        by: "label",
      };
    const value6 = sequenceParticipantLabel(source, id);
    if (value6 && source.slice(value6.from, value6.to) === displayLabel)
      return {
        at: value6.from,
        len: displayLabel.length,
        by: "label",
      };
  }
  if (displayLabel && unescapedLabel && displayLabel === id) {
    const value4 = firstBareIdentifier(source, id);
    if (value4 >= 0)
      return {
        at: value4,
        len: id.length,
        by: "label",
      };
  }
  if (displayLabel && id == null) {
    const value4 = (input2: string) => {
      let value7 = -1;
      for (
        let value8 = source.indexOf(input2);
        value8 >= 0;
        value8 = source.indexOf(input2, value8 + 1)
      ) {
        const value9 =
          !isLabelWordCharacter(input2[0]) || !isLabelWordCharacter(source[value8 - 1]);
        const value10 =
          !isLabelWordCharacter(input2[input2.length - 1]) ||
          !isLabelWordCharacter(source[value8 + input2.length]);
        if (!value9 || !value10) continue;
        if (!isEdgeLabelPosition(source, value8)) continue;
        if (edgeLabelKind(source, value8, input2.length)) return value8;
        if (value7 < 0) value7 = value8;
      }
      return value7;
    };
    const value5 = value4(displayLabel);
    if (value5 >= 0)
      return {
        at: value5,
        len: displayLabel.length,
        by: "label",
      };
    const value6 = displayLabel
      .replace(/;/g, "#59;")
      .replace(/"/g, "#quot;")
      .replace(/^:/, "#58;");
    for (const value7 of new Set([
      escapedLabel,
      displayLabel.replace(/;/g, "#59;").replace(/"/g, "#quot;"),
      value6,
    ]))
      if (value7 !== displayLabel) {
        const value8 = value4(value7);
        if (value8 >= 0)
          return {
            at: value8,
            len: value7.length,
            by: "id",
          };
      }
  }
  if (id) {
    const value4 = firstVisibleIdentifier(source, id);
    if (value4 >= 0)
      return {
        at: value4,
        len: id.length,
        by: "id",
      };
  }
  return null;
}
export { findLabelMatch };
