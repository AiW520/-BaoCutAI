import { diagramKind } from "./diagram-kind";
import { maskNonIdentifiers } from "./masked-identifiers";
import {
  endsWithUnfinishedEdge,
  isBareSourcePosition,
  isIdentifierBoundary,
  isIdentifierCharacter,
  nonNodeStatement,
} from "./source-context";
function firstBareIdentifier(source: string, id: string): number {
  return findBareIdentifiers(source, id, true)[0] ?? -1;
}
function bareIdentifierOffsets(source: string, id: string): number[] {
  return findBareIdentifiers(source, id, false);
}
function findBareIdentifiers(source: string, id: string, firstOnly: boolean): number[] {
  const items: number[] = [];
  if (!id) return items;
  const value = maskNonIdentifiers(source);
  for (
    let value2 = source.indexOf(id);
    value2 >= 0;
    value2 = source.indexOf(id, value2 + 1)
  ) {
    if (!isIdentifierBoundary(source, value2, id.length)) continue;
    if (value[value2] !== source[value2]) continue;
    let value3 =
      source.lastIndexOf(
        `
`,
        value2 - 1,
      ) + 1;
    for (let value10 = value2 - 1; value10 >= value3; value10--)
      if (value[value10] === ";") {
        value3 = value10 + 1;
        break;
      }
    let value4 = source.indexOf(
      `
`,
      value2,
    );
    if (value4 < 0) value4 = source.length;
    for (let value10 = value2; value10 < value4; value10++)
      if (value[value10] === ";") {
        value4 = value10;
        break;
      }
    const slice = value.slice(value3, value4);
    if (
      nonNodeStatement.test(slice) &&
      !(/^\s*class\b/.test(slice) && diagramKind(source) === "class")
    )
      continue;
    const value5 = value.slice(value3, value2).trimEnd();
    const value6 = value.slice(value2 + id.length, value4).trimStart();
    const value7 =
      value5 === "" ||
      /(?:[&|>=.({;-]|-[xo)]|~~)$/.test(value5) ||
      /(?:^|[\s;])(?:participant|actor|class|state|subgraph)$/.test(value5);
    const value8 = value6 === "" || /^(?:[;&=.~<:|}{@-]|[xo](?:--|==|-\.))/.test(value6);
    if (!value7 || !value8) continue;
    const value9 = source[value2 - 1] ?? "";
    if (
      /[[({"']/.test(value9) ||
      (value9 === ">" && isIdentifierCharacter(source[value2 - 2]))
    )
      continue;
    if (!isBareSourcePosition(source, value2)) continue;
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
    items.push(value2);
    if (firstOnly) break;
  }
  return items;
}
export { bareIdentifierOffsets, firstBareIdentifier };
