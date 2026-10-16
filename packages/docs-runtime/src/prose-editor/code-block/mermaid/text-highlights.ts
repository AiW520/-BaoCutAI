import { hasSvgCharacterExtents } from "./svg-geometry";

interface SplitDiagramText {
  parent: Element;
  original: Text;
  inserted: Element[];
}
interface DiagramTextBackground {
  rect: SVGRectElement;
  unit: Element;
}

/** Temporary SVG/HTML runs are restored before the next selection paint. */
export class MermaidTextHighlights {
  private readonly splits: SplitDiagramText[] = [];
  private readonly backgrounds: DiagramTextBackground[] = [];
  clear(): void {
    for (const background of this.backgrounds) background.rect.remove();
    this.backgrounds.length = 0;
    for (const split of this.splits)
      if (split.inserted[0]?.parentNode === split.parent) {
        split.parent.insertBefore(split.original, split.inserted[0]);
        for (const inserted of split.inserted) inserted.remove();
      }
    this.splits.length = 0;
  }
  splitAt(element: Element, from: number, to: number, className: string): boolean {
    if (to <= from) return false;
    const document = element.ownerDocument;
    const text = element.textContent ?? "";
    const whitespace = text.length - text.trimStart().length;
    const start = from + whitespace;
    const end = to + whitespace;
    const texts: Text[] = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode())
      if (node instanceof Text) texts.push(node);
    let offset = 0;
    let changed = false;
    for (const original of texts) {
      const data = original.data;
      const position = offset;
      offset += data.length;
      const localFrom = Math.max(start, position) - position;
      const localTo = Math.min(end, offset) - position;
      if (localTo <= localFrom) continue;
      const parent = original.parentElement;
      if (!parent || parent.closest("svg") == null) continue;
      const html = parent.namespaceURI === "http://www.w3.org/1999/xhtml";
      const span = (content: string, highlight?: string): Element => {
        const element = html
          ? document.createElement("span")
          : document.createElementNS("http://www.w3.org/2000/svg", "tspan");
        if (highlight) element.setAttribute("class", highlight);
        element.textContent = content;
        return element;
      };
      const inserted: Element[] = [];
      if (localFrom > 0) inserted.push(span(data.slice(0, localFrom)));
      inserted.push(span(data.slice(localFrom, localTo), className));
      if (localTo < data.length) inserted.push(span(data.slice(localTo)));
      for (const element of inserted) parent.insertBefore(element, original);
      parent.removeChild(original);
      this.splits.push({
        parent,
        inserted,
        original,
      });
      if (!html) this.backSvgRun(inserted[localFrom > 0 ? 1 : 0], element, className);
      changed = true;
    }
    return changed;
  }
  private backSvgRun(span: Element, unit: Element, className: string): void {
    const text = span.closest("text");
    const parent = text?.parentNode;
    const length = (span.textContent ?? "").length;
    if (!text || !parent || length === 0 || !hasSvgCharacterExtents(span)) return;
    let left = Infinity,
      top = Infinity,
      right = -Infinity,
      bottom = -Infinity;
    try {
      for (let index = 0; index < length; index++) {
        const extent = span.getExtentOfChar(index);
        if (!extent || !(extent.width > 0)) continue;
        left = Math.min(left, extent.x);
        top = Math.min(top, extent.y);
        right = Math.max(right, extent.x + extent.width);
        bottom = Math.max(bottom, extent.y + extent.height);
      }
    } catch {
      return;
    }
    if (!(right > left && bottom > top)) return;
    const rect = text.ownerDocument.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute(
      "class",
      className === "cw-mm-txt-sel" ? "cw-mm-selbg" : "cw-mm-hlbg",
    );
    rect.setAttribute("x", String(left - 1));
    rect.setAttribute("y", String(top));
    rect.setAttribute("width", String(right - left + 2));
    rect.setAttribute("height", String(bottom - top));
    rect.setAttribute("rx", "2");
    const transform = text.getAttribute("transform");
    if (transform) rect.setAttribute("transform", transform);
    parent.insertBefore(rect, text);
    this.backgrounds.push({
      rect,
      unit,
    });
  }
  syncFlags(): void {
    for (const { rect, unit } of this.backgrounds) {
      if (!rect.classList.contains("cw-mm-hlbg")) continue;
      rect.classList.toggle("cw-on", unit.classList.contains("cw-on"));
      rect.classList.toggle("cw-res", unit.classList.contains("cw-res"));
    }
  }
}
