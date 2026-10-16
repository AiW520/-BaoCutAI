import { bracketLabels } from "./bracket-labels";
import type { BracketLabel, QuotedLabel } from "./label-source";
import { maskNonIdentifiers } from "./masked-identifiers";
import { shapeDataLabel } from "./shape-labels";
import { isIdentifierBoundary } from "./source-context";
import { stateDeclaration, stateDescriptionCount } from "./state-declarations";
function containsDeclaredLabel(
  source: string,
  id: string,
  from: number,
  to: number,
): boolean {
  if (bracketLabels(source, id).some((input2) => from >= input2.from && to <= input2.to))
    return true;
  const value2 = stateDeclaration(source, id);
  if (value2 && from >= value2.content.from && to <= value2.content.to) return true;
  const value3 = shapeDataLabel(source, id);
  return value3 != null && from >= value3.from && to <= value3.to;
}
function labelDefinitionCount(
  source: string,
  id: string,
  groups: readonly BracketLabel[],
): number {
  const value = maskNonIdentifiers(source);
  let value2 = false;
  for (
    let value5 = source.indexOf(id + "@{");
    value5 >= 0 && !value2;
    value5 = source.indexOf(id + "@{", value5 + 1)
  )
    value2 =
      value[value5] === source[value5] && isIdentifierBoundary(source, value5, id.length);
  const value3 = stateDeclaration(source, id);
  const value4 =
    value3?.kind === "as" && stateDescriptionCount(source, id) > 0 ? 2 : value3 ? 1 : 0;
  return groups.length + value4 + (value2 ? 1 : 0);
}
function firstDeclaredLabel(source: string, id: string): QuotedLabel | null {
  const value = bracketLabels(source, id)[0];
  if (value)
    return {
      from: value.from,
      to: value.to,
      quoted: value.quoted,
    };
  const value2 = stateDeclaration(source, id);
  if (value2)
    return {
      ...value2.content,
      quoted: value2.kind !== "desc",
    };
  const value3 = shapeDataLabel(source, id);
  return value3
    ? {
        from: value3.from,
        to: value3.to,
        quoted: value3.quoted,
      }
    : null;
}
export { containsDeclaredLabel, firstDeclaredLabel, labelDefinitionCount };
