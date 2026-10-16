import { diagramKind } from "./diagram-kind";
const shapeOpeners = "[({>/\\";
const shapeClosers = "])}/\\";
const shapeTerminator = "])}";
const nonNodeStatement =
  /^\s*(?:%%|(?:flowchart|graph|stateDiagram(?:-v2)?|sequenceDiagram|classDiagram(?:-v2)?|erDiagram|direction|classDef|class|style|linkStyle|click|note|end)\b)/;
const edgePattern = /[xo<]?(?:--+[-xo>]|==+[=xo>]|-?\.+-[xo>]?)|[xo<]?(?:--|==|-\.)/g;
const unfinishedEdgePattern = /^[xo<]?(?:--|==|-\.)$/;
const isIdentifierCharacter = (character: string | null | undefined): boolean =>
  character != null && /[\p{L}\p{N}_]/u.test(character);
function isIdentifierBoundary(source: string, offset: number, length: number): boolean {
  const value = source[offset - 1];
  const value2 = source[offset + length];
  if (isIdentifierCharacter(value) || isIdentifierCharacter(value2)) return false;
  if ((value === "-" || value === ".") && isIdentifierCharacter(source[offset - 2]))
    return false;
  if (
    (value2 === "-" || value2 === ".") &&
    isIdentifierCharacter(source[offset + length + 1])
  ) {
    if (
      !(
        value2 === "-" &&
        source[offset + length + 1] === "x" &&
        diagramKind(source) === "sequence"
      )
    )
      return false;
  }
  return true;
}
function endsWithUnfinishedEdge(source: string): boolean {
  const masked = source
    .replace(/"[^"]*"/g, (input2: string) => " ".repeat(input2.length))
    .replace(/\|[^|]*\|/g, (input2: string) => " ".repeat(input2.length));
  let unfinished = false;
  edgePattern.lastIndex = 0;
  for (let value3 = edgePattern.exec(masked); value3; value3 = edgePattern.exec(masked))
    unfinished = unfinishedEdgePattern.test(value3[0]);
  return unfinished;
}
function edgeLabelKind(
  source: string,
  offset: number,
  length: number,
): "piped" | "open" | "colon" | null {
  const lineStart =
    source.lastIndexOf(
      `
`,
      offset - 1,
    ) + 1;
  let from = offset;
  let to = offset + length;
  const skipSpaces = () => {
    while (from > lineStart && /[ \t]/.test(source[from - 1])) from--;
    while (to < source.length && /[ \t]/.test(source[to])) to++;
  };
  skipSpaces();
  if (source[from - 1] === '"' && source[to] === '"') {
    from--;
    to++;
    skipSpaces();
  }
  if (source[from - 1] === "|" && source[to] === "|") return "piped";
  const before = source.slice(lineStart, from);
  const after = source.slice(to);
  if (
    /(?:--|==|-\.)$/.test(before) &&
    /^[xo<]?(?:--+[-xo>]|==+[=xo>]|-?\.+-[xo>]?)/.test(after)
  )
    return "open";
  if (/(?:--|\.\.|==)[^:]*:$/.test(before) && /^[ \t]*(?:;|\n|$)/.test(after))
    return "colon";
  return null;
}
function shapeDataEnd(source: string, offset: number): number {
  for (let value = offset; value < source.length; value++) {
    const value2 = source[value];
    if (
      (value2 === '"' || value2 === "'") &&
      /[:,{[-][ \t]*$/.test(source.slice(offset - 1, value))
    ) {
      for (value++; value < source.length; value++)
        if (source[value] === "\\" && value2 === '"') value++;
        else if (
          source[value] === value2 &&
          !(value2 === "'" && source[value + 1] === "'")
        )
          break;
        else if (source[value] === value2) value++;
      continue;
    }
    if (value2 === "}") return value;
  }
  return -1;
}
function isBareSourcePosition(source: string, offset: number): boolean {
  const value = sourceContextAt(source, offset);
  return (
    !value.inDq &&
    !value.inSq &&
    !value.inPipe &&
    !value.comment &&
    value.depth === 0 &&
    value.shapeData === 0
  );
}
function isEdgeLabelPosition(source: string, offset: number): boolean {
  const value = sourceContextAt(source, offset);
  if (
    value.inDq &&
    !value.inPipe &&
    !/"[ \t]*$/.test(source.slice(source.lastIndexOf('"', offset - 1), offset))
  )
    return false;
  return !value.inSq && !value.comment && value.depth === 0 && value.shapeData === 0;
}
function sourceContextAt(source: string, offset: number) {
  const entityRelationship = diagramKind(source) === "er";
  let doubleQuoted = false;
  let markdownQuoted = false;
  let singleQuoted = false;
  let piped = false;
  let comment = false;
  let depth = 0;
  let shapeDepth = 0;
  for (let index3 = 0; index3 < offset && index3 < source.length; index3++) {
    const value7 = source[index3];
    if (
      value7 ===
      `
`
    ) {
      comment = false;
      piped = false;
      if (!shapeDepth) {
        singleQuoted = false;
        depth = 0;
        if (doubleQuoted && !markdownQuoted) doubleQuoted = false;
      }
      continue;
    }
    if (comment) continue;
    if (doubleQuoted) {
      if (value7 === "\\" && shapeDepth) index3++;
      else if (value7 === '"') doubleQuoted = markdownQuoted = false;
      continue;
    }
    if (singleQuoted) {
      if (value7 === "'" && source[index3 + 1] === "'") index3++;
      else if (value7 === "'") singleQuoted = false;
      continue;
    }
    if (
      value7 === "%" &&
      source[index3 + 1] === "%" &&
      source[index3 + 2] !== "{" &&
      depth === 0 &&
      !piped
    ) {
      comment = true;
      continue;
    }
    if (value7 === '"') {
      doubleQuoted = true;
      markdownQuoted = source[index3 + 1] === "`";
      continue;
    }
    if (
      shapeDepth &&
      value7 === "'" &&
      /[:,{[-][ \t]*$/.test(source.slice(Math.max(0, index3 - 40), index3))
    ) {
      singleQuoted = true;
      continue;
    }
    if (
      value7 === "@" &&
      source[index3 + 1] === "{" &&
      isIdentifierCharacter(source[index3 - 1]) &&
      depth === 0
    ) {
      shapeDepth++;
      depth++;
      index3++;
      continue;
    }
    if (shapeDepth) {
      if (value7 === "{") {
        depth++;
        shapeDepth++;
      } else if (value7 === "}") {
        depth--;
        shapeDepth--;
      }
      continue;
    }
    if (value7 === "|" && depth === 0) {
      piped = !piped;
      continue;
    }
    if (piped) continue;
    if (
      value7 === "[" ||
      value7 === "(" ||
      (value7 === "{" &&
        (!entityRelationship ||
          source[index3 - 1] === " " ||
          source[index3 - 1] === "\t")) ||
      (value7 === ">" && isIdentifierCharacter(source[index3 - 1]) && depth === 0)
    )
      depth++;
    else if ((value7 === "]" || value7 === ")" || value7 === "}") && depth > 0) depth--;
  }
  return {
    inDq: doubleQuoted,
    inSq: singleQuoted,
    inPipe: piped,
    comment,
    depth,
    shapeData: shapeDepth,
  };
}
function isQuotedRange(source: string, from: number, to: number): boolean {
  let value = from;
  let value2 = to;
  while (value > 0 && (source[value - 1] === " " || source[value - 1] === "\t")) value--;
  while (value2 < source.length && (source[value2] === " " || source[value2] === "\t"))
    value2++;
  return (
    (source[value - 1] === '"' && source[value2] === '"') ||
    (source[from - 1] === '"' && source[to] === '"')
  );
}
export {
  edgeLabelKind,
  endsWithUnfinishedEdge,
  isBareSourcePosition,
  isEdgeLabelPosition,
  isIdentifierBoundary,
  isIdentifierCharacter,
  isQuotedRange,
  nonNodeStatement,
  shapeClosers,
  shapeDataEnd,
  shapeOpeners,
  shapeTerminator,
};
