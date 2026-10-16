import { bracketLabels } from "./bracket-labels";
import { labelDefinitionCount } from "./label-definitions";
import { decodeMermaidLabel, matchesDisplayLabel } from "./label-encoding";
import { findLabelMatch } from "./label-match";
import type { LabelSelection, LabelSource, SourceRange } from "./label-source";
import {
  edgeLabelKind,
  isIdentifierCharacter,
  shapeClosers,
  shapeOpeners,
} from "./source-context";
import { stateDeclaration } from "./state-declarations";
function locateLabelSource(
  source: string,
  id: string | null,
  label: string | null,
): LabelSource | null {
  const match = findLabelMatch(source, id, label);
  if (!match) return null;
  if (match.by === "label") {
    const state = {
      from: match.at,
      to: match.at + match.len,
    };
    if (id) {
      const value2 = (input2: number, options2: number) => {
        while (
          options2 < 0
            ? input2 > 0 && /[ \t]/.test(source[input2 - 1])
            : input2 < source.length && /[ \t]/.test(source[input2])
        )
          input2 += options2;
        return input2;
      };
      let value3 = value2(state.from, -1);
      if (source[value3 - 1] === '"') value3 = value2(value3 - 1, -1);
      let value4 = value3;
      while (
        value4 > 0 &&
        value3 - value4 < 4 &&
        shapeOpeners.includes(source[value4 - 1])
      )
        value4--;
      const value5 = value4 - id.length;
      if (
        value4 < value3 &&
        value5 >= 0 &&
        source.slice(value5, value4) === id &&
        !isIdentifierCharacter(source[value5 - 1])
      ) {
        let value7 = value2(state.to, 1);
        if (source[value7] === '"') value7 = value2(value7 + 1, 1);
        const value8 = value7 + 5;
        const value9 = value7;
        while (
          value7 < source.length &&
          value7 < value8 &&
          shapeClosers.includes(source[value7])
        )
          value7++;
        if (value7 > value9)
          return {
            from: value5,
            to: value7,
            label: state,
          };
      }
      const value6 = stateDeclaration(source, id);
      if (value6 && state.from >= value6.content.from && state.to <= value6.content.to)
        return {
          from: value6.decl.from,
          to: value6.decl.to,
          label: state,
        };
    }
    return {
      from: state.from,
      to: state.to,
      label: state,
    };
  }
  if (id) {
    const value2 = bracketLabels(source, id);
    const value3 = labelDefinitionCount(source, id, value2);
    const value4 =
      value3 === 1
        ? value2[0]
        : value2.findLast((input2) => matchesDisplayLabel(source, input2, label));
    if (value4)
      return {
        from: value4.group.from - id.length,
        to: value4.group.to,
        label: null,
      };
    const value5 = stateDeclaration(source, id);
    if (value3 > 1 && !(value5 && matchesDisplayLabel(source, value5.content, label)))
      return {
        from: match.at,
        to: match.at + match.len,
        label: null,
      };
    if (value5)
      return {
        from: value5.decl.from,
        to: value5.decl.to,
        label: null,
      };
  }
  return {
    from: match.at,
    to: match.at + match.len,
    label: null,
  };
}
function locateHeldLabelSource(
  source: string,
  id: string | null,
  label: string | null,
  held?: SourceRange | null,
): LabelSource | null {
  if (id != null && held && held.from <= held.to) {
    const value2 = bracketLabels(source, id);
    let match = value2.find(
      (input2) =>
        held.from >= input2.group.from - id.length && held.to <= input2.group.to,
    );
    if (
      match &&
      held.to - held.from === id.length &&
      held.from === match.group.from - id.length &&
      labelDefinitionCount(source, id, value2) > 1 &&
      !matchesDisplayLabel(source, match, label)
    )
      match = value2.findLast((input2) => matchesDisplayLabel(source, input2, label));
    if (match) {
      const value3 = label?.trim() ?? "";
      const slice = source.slice(match.from, match.to);
      const value4 = slice.length - slice.trimStart().length;
      const value5 = value3 !== "" && slice.trim() === value3;
      return {
        from: match.group.from - id.length,
        to: match.group.to,
        label: value5
          ? {
              from: match.from + value4,
              to: match.from + value4 + value3.length,
            }
          : null,
      };
    }
  }
  if (id == null && held && held.from < held.to && held.to <= source.length) {
    const value2 = label?.trim() ?? "";
    const slice = source.slice(held.from, held.to);
    const value3 = slice === value2;
    if (
      value2 &&
      (value3 || decodeMermaidLabel(slice) === value2) &&
      edgeLabelKind(source, held.from, held.to - held.from)
    )
      return {
        from: held.from,
        to: held.to,
        label: value3
          ? {
              ...held,
            }
          : null,
      };
    const value4 = locateLabelSource(source, null, label);
    return value4 && value4.from < held.to && value4.to > held.from ? value4 : null;
  }
  return locateLabelSource(source, id, label);
}
function locateLabelSelection(
  source: string,
  id: string | null,
  label: string | null,
  from?: number | null,
  to?: number | null,
): LabelSelection | null {
  const value2 = findLabelMatch(source, id, label);
  if (!value2) return null;
  const state = {
    from: value2.at,
    to: value2.at + value2.len,
  };
  if (value2.by !== "label")
    return {
      ...state,
      exact: false,
      whole: state,
    };
  if (from == null || to == null)
    return {
      ...state,
      exact: true,
      whole: state,
    };
  const value3 = Math.max(0, Math.min(value2.len, Math.min(from, to)));
  const value4 = Math.max(0, Math.min(value2.len, Math.max(from, to)));
  if (value4 <= value3)
    return {
      ...state,
      exact: true,
      whole: state,
    };
  return {
    from: value2.at + value3,
    to: value2.at + value4,
    exact: true,
    whole: state,
  };
}
function labelOverlap(
  range: LabelSource,
  from: number,
  to: number,
): {
  start: number;
  end: number;
  whole: boolean;
} | null {
  if (!range.label) return null;
  const value = Math.max(from, range.label.from) - range.label.from;
  const value2 = Math.min(to, range.label.to) - range.label.from;
  if (value2 <= value) return null;
  return {
    start: value,
    end: value2,
    whole: value <= 0 && value2 >= range.label.to - range.label.from,
  };
}
export { labelOverlap, locateHeldLabelSource, locateLabelSelection, locateLabelSource };
