import type { QuotedLabel } from "./label-source";
import { maskNonIdentifiers } from "./masked-identifiers";
import { isIdentifierBoundary, shapeDataEnd } from "./source-context";
function shapeDataLabel(source: string, id: string): QuotedLabel | null {
  const value = maskNonIdentifiers(source);
  for (
    let value2 = source.indexOf(id + "@{");
    value2 >= 0;
    value2 = source.indexOf(id + "@{", value2 + 1)
  ) {
    if (!isIdentifierBoundary(source, value2, id.length)) continue;
    if (value[value2] !== source[value2]) continue;
    const value3 = value2 + id.length + 2;
    const value4 = shapeDataEnd(source, value3);
    if (value4 < 0) continue;
    let text = "";
    for (let value9 = value3; value9 < value4; value9++) {
      const value10 = source[value9];
      if (
        (value10 === '"' || value10 === "'") &&
        /[:,{[-][ \t]*$/.test(source.slice(value3 - 1, value9))
      ) {
        let value11 = value9 + 1;
        for (; value11 < value4; value11++)
          if (source[value11] === "\\" && value10 === '"') value11++;
          else if (
            source[value11] === value10 &&
            !(value10 === "'" && source[value11 + 1] === "'")
          )
            break;
          else if (source[value11] === value10) value11++;
        text += " ".repeat(Math.min(value11, value4 - 1) - value9 + 1);
        value9 = Math.min(value11, value4 - 1);
        continue;
      }
      text += value10;
    }
    const value5 = /(^|[,{\s])label[ \t]*:/.exec(text);
    if (!value5) continue;
    let value6 = value3 + value5.index + value5[0].length;
    while (source[value6] === " " || source[value6] === "\t") value6++;
    const value7 = source[value6];
    if (value7 === '"' || value7 === "'") {
      const value9 = source.indexOf(value7, value6 + 1);
      if (value9 < 0 || value9 > value4) continue;
      if (value7 === "'" && source[value9 + 1] === "'") return null;
      if (value7 === '"' && source[value9 - 1] === "\\") return null;
      return {
        from: value6 + 1,
        to: value9,
        quoted: value7 === '"',
        squote: value7 === "'",
      };
    }
    let value8 = value6;
    while (
      value8 < value4 &&
      source[value8] !== "," &&
      source[value8] !==
        `
`
    )
      value8++;
    while (value8 > value6 && (source[value8 - 1] === " " || source[value8 - 1] === "\t"))
      value8--;
    while (value6 < value8 && (source[value6] === " " || source[value6] === "\t"))
      value6++;
    return value8 > value6
      ? {
          from: value6,
          to: value8,
          quoted: false,
          bare: true,
        }
      : null;
  }
  return null;
}
export { shapeDataLabel };
