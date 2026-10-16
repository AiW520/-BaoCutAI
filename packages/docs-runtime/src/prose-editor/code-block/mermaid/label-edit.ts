import { bracketLabels } from "./bracket-labels";
import { diagramKind } from "./diagram-kind";
import {
  containsDeclaredLabel,
  firstDeclaredLabel,
  labelDefinitionCount,
} from "./label-definitions";
import { matchesDisplayLabel } from "./label-encoding";
import { locateHeldLabelSource } from "./label-location";
import type {
  LabelEdit,
  QuotedLabel,
  SourceRange,
  SourceReplacement,
} from "./label-source";
import { shapeDataLabel } from "./shape-labels";
import { edgeLabelKind, isQuotedRange } from "./source-context";
import { stateDeclaration } from "./state-declarations";
const labelDelimiterPattern = /[()[\]{}|<>";#]/;
const edgeDelimiterPattern = /--|[=.]/;
function replaceDeclaredLabel(
  source: string,
  range: QuotedLabel,
  label: string,
): SourceReplacement | null {
  const value = label.replace(/"/g, "#quot;");
  const value2 = range.quoted
    ? value
    : labelDelimiterPattern.test(label)
      ? `"${value}"`
      : label;
  return value2 === source.slice(range.from, range.to)
    ? null
    : {
        from: range.from,
        to: range.to,
        insert: value2,
      };
}
function planLabelEdit(
  source: string,
  id: string | null,
  label: string | null,
  replacement: string,
  held?: SourceRange | null,
): LabelEdit | null {
  const definition = locateHeldLabelSource(source, id, label, held);
  if (!definition) return null;
  const escapedLabel = replacement.replace(/"/g, "#quot;");
  const exact = escapedLabel === replacement;
  let from: number;
  let to: number;
  let quoted: boolean | undefined;
  if (definition.label) {
    if (
      id != null &&
      definition.from === definition.label.from &&
      definition.to === definition.label.to &&
      source.slice(definition.from, definition.to) === id &&
      !containsDeclaredLabel(source, id, definition.from, definition.to)
    ) {
      const value13 = diagramKind(source);
      if (value13 === "flowchart") {
        const value14 = definition.from + id.length + 2;
        return {
          from: definition.from,
          to: definition.to,
          insert: `${id}["${escapedLabel}"]`,
          label: {
            from: value14,
            to: value14 + escapedLabel.length,
          },
          exact,
          declared: "flowchart",
        };
      }
      if (value13 === "state") {
        const value14 =
          source.lastIndexOf(
            `
`,
            definition.from - 1,
          ) + 1;
        const value15 = /^[ \t]*/.exec(source.slice(value14, definition.from))?.[0] ?? "";
        const value16 = `${value15}state "${escapedLabel}" as ${id}
`;
        const value17 = value14 + value15.length + 7;
        return {
          from: value14,
          to: value14,
          insert: value16,
          label: {
            from: value17,
            to: value17 + escapedLabel.length,
          },
          exact,
          declared: "state",
        };
      }
      return null;
    }
    from = definition.label.from;
    to = definition.label.to;
    const value10 =
      id != null
        ? bracketLabels(source, id).find(
            (input2) => from >= input2.from && to <= input2.to,
          )
        : null;
    const value11 = id != null && !value10 ? shapeDataLabel(source, id) : null;
    const value12 = value11 != null && from >= value11.from && to <= value11.to;
    quoted = value10
      ? value10.quoted
      : value12 && value11
        ? value11.quoted
        : isQuotedRange(source, from, to);
    if (value12 && replacement.includes("\\")) return null;
    if (value12 && value11 && (value11.squote || value11.bare)) {
      const value13 = value11.squote ? value11.from - 1 : value11.from;
      const value14 = value11.squote ? value11.to + 1 : value11.to;
      return {
        from: value13,
        to: value14,
        insert: `"${escapedLabel}"`,
        label: {
          from: value13 + 1,
          to: value13 + 1 + escapedLabel.length,
        },
        exact,
      };
    }
  } else if (id) {
    const value10 = bracketLabels(source, id);
    const value11 = shapeDataLabel(source, id);
    const value12 =
      value10.find(
        (input2) =>
          input2.group.from >= definition.from && input2.group.to <= definition.to,
      ) ??
      (labelDefinitionCount(source, id, value10) <= 1
        ? firstDeclaredLabel(source, id)
        : value11 && matchesDisplayLabel(source, value11, label)
          ? value11
          : (() => {
              const value14 = stateDeclaration(source, id);
              return value14 &&
                value14.decl.from >= definition.from &&
                value14.decl.to <= definition.to &&
                matchesDisplayLabel(source, value14.content, label)
                ? {
                    from: value14.content.from,
                    to: value14.content.to,
                    quoted: value14.kind !== "desc",
                  }
                : null;
            })());
    if (!value12) return null;
    ({ from, to, quoted } = value12);
    const value13 = value11 != null && from >= value11.from && to <= value11.to;
    if (value13 && replacement.includes("\\")) return null;
    if (value13 && value11 && (value11.squote || value11.bare)) {
      const value14 = value11.squote ? from - 1 : from;
      const value15 = value11.squote ? to + 1 : to;
      return {
        from: value14,
        to: value15,
        insert: `"${escapedLabel}"`,
        label: {
          from: value14 + 1,
          to: value14 + 1 + escapedLabel.length,
        },
        exact,
      };
    }
  } else {
    from = definition.from;
    to = definition.to;
    quoted = isQuotedRange(source, from, to);
  }
  if (quoted)
    return {
      from,
      to,
      insert: escapedLabel,
      label: {
        from,
        to: from + escapedLabel.length,
      },
      exact,
    };
  const edgeKind = edgeLabelKind(source, from, to - from);
  const state = id != null ? stateDeclaration(source, id) : null;
  if (
    edgeKind === "colon" ||
    (state?.kind === "desc" && from >= state.content.from && to <= state.content.to)
  ) {
    const value10 = replacement
      .replace(/;/g, "#59;")
      .replace(/"/g, "#quot;")
      .replace(/^:/, "#58;");
    return {
      from,
      to,
      insert: value10,
      label: {
        from,
        to: from + value10.length,
      },
      exact: exact && value10 === replacement,
    };
  }
  if (
    labelDelimiterPattern.test(replacement) ||
    (edgeDelimiterPattern.test(replacement) && edgeKind === "open")
  )
    return {
      from,
      to,
      insert: `"${escapedLabel}"`,
      label: {
        from: from + 1,
        to: from + 1 + escapedLabel.length,
      },
      exact,
    };
  return {
    from,
    to,
    insert: replacement,
    label: {
      from,
      to: from + replacement.length,
    },
    exact: true,
  };
}
export { planLabelEdit, replaceDeclaredLabel };
