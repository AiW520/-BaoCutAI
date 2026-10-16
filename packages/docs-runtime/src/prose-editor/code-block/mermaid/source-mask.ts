import type { DiagramKind } from "./label-source";
import { isIdentifierCharacter, shapeDataEnd } from "./source-context";
function maskSourceLabels(source: string, kind: DiagramKind): string {
  const masked: string[] = [];
  let offset = 0;
  const frontMatter = /^(?:[ \t]*\n)*---[ \t]*\n[\s\S]*?\n---[ \t]*(?:\n|$)/.exec(source);
  if (frontMatter && frontMatter.index === 0) {
    masked.push(frontMatter[0].replace(/[^\n]/g, " "));
    offset = frontMatter[0].length;
  }
  const maskRange = (input2: number, options2: number) =>
    source.slice(input2, options2).replace(/[^\n]/g, " ");
  let lineBeginning = true;
  let depth = 0;
  const closers: string[] = [];
  while (offset < source.length) {
    const value4 = source[offset];
    if (
      value4 ===
      `
`
    ) {
      masked.push(value4);
      lineBeginning = true;
      depth = 0;
      closers.length = 0;
      offset++;
      continue;
    }
    const value5 =
      lineBeginning &&
      /^[ \t]*$/.test(
        source.slice(
          source.lastIndexOf(
            `
`,
            offset - 1,
          ) + 1,
          offset,
        ),
      );
    if (value4 !== " " && value4 !== "\t") lineBeginning = false;
    if (
      value4 === "%" &&
      source[offset + 1] === "%" &&
      source[offset + 2] !== "{" &&
      (value5 || depth === 0)
    ) {
      const value6: number = source.indexOf(
        `
`,
        offset,
      );
      const value7 = value6 < 0 ? source.length : value6;
      masked.push(" ".repeat(value7 - offset));
      offset = value7;
      continue;
    }
    if (value4 === '"') {
      let value6: number;
      if (source[offset + 1] === "`") {
        const value7 = source.indexOf('`"', offset + 2);
        value6 = value7 < 0 ? source.length : value7 + 2;
      } else {
        const value7 = source.indexOf(
          `
`,
          offset + 1,
        );
        const value8 = source.indexOf('"', offset + 1);
        value6 =
          value8 < 0 || (value7 >= 0 && value8 > value7)
            ? value7 < 0
              ? source.length
              : value7
            : value8 + 1;
      }
      masked.push(maskRange(offset, value6));
      offset = value6;
      continue;
    }
    if (
      value4 === "@" &&
      source[offset + 1] === "{" &&
      isIdentifierCharacter(source[offset - 1]) &&
      depth === 0
    ) {
      const value6: number = shapeDataEnd(source, offset + 2);
      if (value6 >= 0) {
        masked.push("@{" + maskRange(offset + 2, value6) + "}");
        offset = value6 + 1;
      } else {
        const value7 = source.indexOf(
          `
`,
          offset,
        );
        const value8 = value7 < 0 ? source.length : value7;
        masked.push("@{" + " ".repeat(Math.max(0, value8 - offset - 2)));
        offset = value8;
      }
      continue;
    }
    if (value4 === "|" && depth === 0) {
      const value6: number = source.indexOf(
        `
`,
        offset + 1,
      );
      const value7 = value6 < 0 ? source.length : value6;
      let value8 = -1;
      for (let value9 = offset + 1; value9 < value7; value9++)
        if (source[value9] === '"') {
          const value10 = source.indexOf('"', value9 + 1);
          if (value10 < 0 || value10 >= value7) break;
          value9 = value10;
        } else if (source[value9] === "|") {
          value8 = value9;
          break;
        }
      if (value8 >= 0) {
        masked.push(" ".repeat(value8 + 1 - offset));
        offset = value8 + 1;
        continue;
      }
    }
    if (
      value4 === "[" ||
      value4 === "(" ||
      (value4 === "{" &&
        (kind !== "er" || source[offset - 1] === " " || source[offset - 1] === "\t")) ||
      (value4 === ">" && depth === 0 && isIdentifierCharacter(source[offset - 1]))
    ) {
      if (depth === 0) {
        const value6: number = source.indexOf(
          `
`,
          offset,
        );
        const slice = source.slice(offset + 1, value6 < 0 ? source.length : value6);
        if (!/[\])}]/.test(slice)) {
          masked.push(value4);
          offset++;
          continue;
        }
      }
      masked.push(depth === 0 ? value4 : " ");
      depth++;
      closers.push(
        value4 === "[" ? "]" : value4 === "(" ? ")" : value4 === "{" ? "}" : "]",
      );
      offset++;
      continue;
    }
    if (depth > 0 && (value4 === "]" || value4 === ")" || value4 === "}")) {
      depth--;
      closers.pop();
      masked.push(depth === 0 ? value4 : " ");
      offset++;
      continue;
    }
    masked.push(depth > 0 ? " " : value4);
    offset++;
  }
  const result = masked.join("");
  return result.length === source.length ? result : source.replace(/[^\n]/g, " ");
}
export { maskSourceLabels };
