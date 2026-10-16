const canvasContexts = new WeakMap<Document, CanvasRenderingContext2D | null>();

export function codeMeasurementContext(
  document: Document,
): CanvasRenderingContext2D | null {
  if (!canvasContexts.has(document)) {
    let context: CanvasRenderingContext2D | null = null;
    try {
      context = document.createElement("canvas").getContext("2d");
    } catch {
      context = null;
    }
    canvasContexts.set(document, context);
  }
  return canvasContexts.get(document) ?? null;
}

export function codeFont(style: CSSStyleDeclaration | undefined): string {
  return style
    ? `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
    : "";
}

export function measuredCodeWidth(
  source: string,
  measure: (line: string) => number,
  tabSize: number,
  padding: number,
): number | null {
  const tab = " ".repeat(tabSize > 0 ? tabSize : 8);
  let width = 0;
  let length = 0;
  for (const sourceLine of source.split("\n")) {
    const line = sourceLine.slice(0, 2000).replaceAll("\t", tab);
    if (line.length * 2 < length) continue;
    const advance = measure(line);
    if (advance <= width) continue;
    width = advance;
    length = line.length;
    if (width > 8192) break;
  }
  return width > 0 ? Math.ceil(width + padding + length / 64) : null;
}

export function naturalTableWidth(table: HTMLTableElement): number | null {
  const style = table.style;
  if (!style) return null;
  const previous = style.getPropertyValue("width");
  style.setProperty("width", "max-content");
  const width = table.getBoundingClientRect().width;
  if (previous) style.setProperty("width", previous);
  else style.removeProperty("width");
  return width > 0 ? width : null;
}

export function paneClippedOnRight(element: HTMLElement): boolean {
  return element.scrollWidth - element.clientWidth - element.scrollLeft > 1;
}
