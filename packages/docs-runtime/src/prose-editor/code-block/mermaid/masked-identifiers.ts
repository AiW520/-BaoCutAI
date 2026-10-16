import { diagramKind } from "./diagram-kind";
import { maskSourceLabels } from "./source-mask";
function maskNonIdentifiers(source: string): string {
  const kind = diagramKind(source);
  let masked = maskSourceLabels(source, kind);
  const styleStatementPattern =
    kind === "class"
      ? /(^|;)[ \t]*(?:classDef|style|linkStyle|click)\b[^\n;]*/gm
      : /(^|;)[ \t]*(?:classDef|class|style|linkStyle|click)\b[^\n;]*/gm;
  masked = masked.replace(
    styleStatementPattern,
    (input2: string, options: string) =>
      options + " ".repeat(input2.length - options.length),
  );
  masked = masked.replace(
    /(^|;)[ \t]*acc(?:Title|Descr)[ \t]*:[^\n]*/gm,
    (input2: string, options: string) =>
      options + " ".repeat(input2.length - options.length),
  );
  masked = masked.replace(
    /(^|;)[ \t]*accDescr[ \t]*\{[^}]*\}/gm,
    (input2: string, options: string) =>
      options + input2.slice(options.length).replace(/[^\n]/g, " "),
  );
  if (kind === "class" || kind === "er")
    masked = masked.replace(
      /\{[ \t]*\n[^{}]*\n[ \t]*\}/g,
      (input2: string) => "{" + input2.slice(1, -1).replace(/[^\n]/g, " ") + "}",
    );
  masked = masked.replace(/#(?:\d+|[a-zA-Z]+);/g, (input2: string) =>
    " ".repeat(input2.length),
  );
  masked = masked.replace(
    /:::[\p{L}\p{N}_-]+/gu,
    (input2: string) => ":::" + " ".repeat(input2.length - 3),
  );
  if (kind !== "flowchart")
    masked = masked
      .replace(/:::/g, "")
      .replace(/:[^\n;]*/g, (input2: string) => " ".repeat(input2.length))
      .replace(/\uE000\uE000\uE000/g, ":::");
  return masked;
}
export { maskNonIdentifiers };
