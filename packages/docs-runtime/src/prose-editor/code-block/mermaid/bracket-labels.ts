import type { BracketLabel } from "./label-source";
import { maskNonIdentifiers } from "./masked-identifiers";
import {
  endsWithUnfinishedEdge,
  isIdentifierBoundary,
  shapeClosers,
  shapeOpeners,
  shapeTerminator,
} from "./source-context";
function shapeGroupEnd(source: string, offset: number): number {
  let value = offset;
  while (
    value < source.length &&
    value - offset < 4 &&
    shapeOpeners.includes(source[value])
  )
    value++;
  if (value === offset) return offset;
  let value2 = value;
  while (value2 < source.length && (source[value2] === " " || source[value2] === "\t"))
    value2++;
  if (source[value2] === '"') {
    const value4 = source.indexOf('"', value2 + 1);
    if (value4 < 0) return offset;
    value = value4 + 1;
    while (value < source.length && (source[value] === " " || source[value] === "\t"))
      value++;
  } else {
    const value4 = value + 400;
    while (
      value < source.length &&
      value < value4 &&
      !shapeTerminator.includes(source[value])
    )
      value++;
    if (value >= source.length || value >= value4) return offset;
  }
  const value3 = value + 5;
  while (value < source.length && value < value3 && shapeClosers.includes(source[value]))
    value++;
  return value;
}
function bracketLabels(source: string, id: string): BracketLabel[] {
  const labels: BracketLabel[] = [];
  const masked = maskNonIdentifiers(source);
  for (
    let value2 = source.indexOf(id);
    value2 >= 0;
    value2 = source.indexOf(id, value2 + 1)
  ) {
    if (!isIdentifierBoundary(source, value2, id.length)) continue;
    const value3 = value2 + id.length;
    const value4 =
      source.lastIndexOf(
        `
`,
        value2 - 1,
      ) + 1;
    let value5 = value3;
    if (/(?:^|;)[ \t]*subgraph[ \t]+$/.test(source.slice(value4, value2)))
      while (source[value5] === " " || source[value5] === "\t") value5++;
    const value6 = shapeGroupEnd(source, value5);
    if (value6 === value5) continue;
    if (masked[value2] !== source[value2]) continue;
    if (endsWithUnfinishedEdge(masked.slice(value4, value2))) continue;
    let value7 = value5;
    const value8 = value7 + 4;
    while (value7 < value6 && value7 < value8 && shapeOpeners.includes(source[value7]))
      value7++;
    let value9 = value6;
    const value10 = value6 - 5;
    while (
      value9 > value7 &&
      value9 > value10 &&
      shapeClosers.includes(source[value9 - 1])
    )
      value9--;
    let value11 = value7;
    while (value11 < value9 && (source[value11] === " " || source[value11] === "\t"))
      value11++;
    let value12 = value9;
    while (
      value12 > value11 &&
      (source[value12 - 1] === " " || source[value12 - 1] === "\t")
    )
      value12--;
    const value13 =
      value12 - value11 >= 2 && source[value11] === '"' && source[value12 - 1] === '"';
    const state = {
      from: value3,
      to: value6,
    };
    labels.push(
      value13
        ? {
            from: value11 + 1,
            to: value12 - 1,
            quoted: value13,
            group: state,
          }
        : {
            from: value7,
            to: value9,
            quoted: value13,
            group: state,
          },
    );
  }
  return labels;
}
export { bracketLabels };
