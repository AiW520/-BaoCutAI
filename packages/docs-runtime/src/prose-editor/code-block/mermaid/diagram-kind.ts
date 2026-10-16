import type { DiagramKind } from "./label-source";
function diagramKind(source: string): DiagramKind {
  let frontMatter = false;
  for (const value2 of source.split(`
`)) {
    const value3 = value2.trim();
    if (value3 === "---") {
      frontMatter = !frontMatter;
      continue;
    }
    if (frontMatter || !value3 || value3.startsWith("%%")) continue;
    const value4 = value3.split(/[\s;]/, 1)[0];
    if (value4 === "flowchart" || value4 === "graph") return "flowchart";
    if (value4.startsWith("stateDiagram")) return "state";
    if (value4 === "sequenceDiagram") return "sequence";
    if (value4.startsWith("classDiagram")) return "class";
    if (value4 === "erDiagram") return "er";
    return "other";
  }
  return "other";
}
export { diagramKind };
