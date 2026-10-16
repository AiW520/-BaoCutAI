import { diagramKind } from "./diagram-kind";
import type { StateDeclaration } from "./label-source";
import { maskNonIdentifiers } from "./masked-identifiers";
function stateDeclaration(source: string, id: string): StateDeclaration | null {
  if (!id) return null;
  let offset = 0;
  while (offset <= source.length) {
    let value2 = source.indexOf(
      `
`,
      offset,
    );
    if (value2 < 0) value2 = source.length;
    const slice = source.slice(offset, value2);
    const value3 =
      /^([ \t]*)state[ \t]+"([^"\n]*)"[ \t]+as[ \t]+([\p{L}\p{N}_.-]+)[ \t]*(?:;[ \t]*)?$/u.exec(
        slice,
      );
    if (value3 && value3[3] === id) {
      const value4 = offset + slice.indexOf('"', value3[1].length + 5);
      const value5 = offset + slice.lastIndexOf(id);
      return {
        decl: {
          from: offset + value3[1].length,
          to: value5 + id.length,
        },
        content: {
          from: value4 + 1,
          to: value4 + 1 + value3[2].length,
        },
        line: {
          from: offset,
          to: Math.min(source.length, value2 + 1),
        },
        kind: "as",
      };
    }
    if (value2 >= source.length) break;
    offset = value2 + 1;
  }
  const descriptions = stateDescriptions(source, id);
  return descriptions.length === 1 ? descriptions[0] : null;
}
function stateDescriptionCount(source: string, id: string): number {
  return stateDescriptions(source, id).length;
}
function stateDescriptions(source: string, id: string): StateDeclaration[] {
  const declarations: StateDeclaration[] = [];
  if (diagramKind(source) !== "state") return declarations;
  const masked = maskNonIdentifiers(source);
  let offset = 0;
  const frontMatter = /^(?:[ \t]*\n)*---[ \t]*\n[\s\S]*?\n---[ \t]*(?:\n|$)/.exec(source);
  if (frontMatter && frontMatter.index === 0) offset = frontMatter[0].length;
  while (offset <= source.length) {
    let value3 = offset;
    while (
      value3 < source.length &&
      source[value3] !==
        `
` &&
      masked[value3] !== ";"
    )
      value3++;
    const value4 =
      source.indexOf(
        `
`,
        offset,
      ) < 0
        ? source.length
        : source.indexOf(
            `
`,
            offset,
          );
    const slice = source.slice(offset, value3);
    const value5 = /^([ \t]*)([\p{L}\p{N}_.-]+)[ \t]*:[ \t]*(.*?)[ \t]*$/u.exec(slice);
    const value6 = offset + (value5?.[1].length ?? 0);
    if (
      value5 &&
      value5[2] === id &&
      value5[3] !== "" &&
      !value5[3].startsWith(":") &&
      masked[value6] === source[value6]
    ) {
      const value7 = offset + slice.indexOf(value5[3], value5[1].length + id.length + 1);
      const value8 =
        source.lastIndexOf(
          `
`,
          offset - 1,
        ) + 1;
      declarations.push({
        decl: {
          from: offset + value5[1].length,
          to: value7 + value5[3].length,
        },
        content: {
          from: value7,
          to: value7 + value5[3].length,
        },
        line: {
          from: value8,
          to: Math.min(source.length, value4 + 1),
        },
        kind: "desc",
      });
    }
    if (value3 >= source.length) break;
    offset = value3 + 1;
  }
  return declarations;
}
export { stateDeclaration, stateDescriptionCount };
