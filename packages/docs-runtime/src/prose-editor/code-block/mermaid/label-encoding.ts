import type { SourceRange } from "./label-source";
const mermaidEntities: Readonly<Record<string, unknown>> = {
  quot: '"',
  amp: "&",
  lt: "<",
  gt: ">",
  apos: "'",
  nbsp: " ",
  semi: ";",
  num: "#",
};
function decodeMermaidLabel(source: string): string {
  return source.replace(/#(\d+|[a-z]+);/g, (input2: string, options: string) => {
    if (!/^\d+$/.test(options)) return String(mermaidEntities[options] ?? input2);
    const value = Number(options);
    return value <= 1114111 ? String.fromCodePoint(value) : input2;
  });
}
function matchesDisplayLabel(
  source: string,
  range: SourceRange,
  label: string | null | undefined,
): boolean {
  const expected = (label ?? "").trim();
  if (!expected) return false;
  const actual = decodeMermaidLabel(source.slice(range.from, range.to)).trim();
  if (actual === expected) return true;
  const plainText = (input2: string) =>
    input2
      .replace(/<br\s*\/?>/gi, "")
      .replace(/[*_`]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  return plainText(actual) === plainText(expected);
}
function decodedSourceLabel(source: string, range: SourceRange): string {
  return decodeMermaidLabel(source.slice(range.from, range.to)).trim();
}
const matchesWrittenLabel = (
  source: string,
  range: SourceRange,
  label: string,
): boolean => {
  const value = decodedSourceLabel(source, range);
  return value === label.trim() || value === decodeMermaidLabel(label).trim();
};
const normalizeLabelText = (text: string | null | undefined): string =>
  (text ?? "").replace(/\s*[\n\r]+\s*/g, " ").trim();
export {
  decodedSourceLabel,
  decodeMermaidLabel,
  matchesDisplayLabel,
  matchesWrittenLabel,
  normalizeLabelText,
};
