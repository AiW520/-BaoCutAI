import type { HeldDiagramLabel } from "../mermaid/label-source";
import { hasSvgBoundingBox } from "../mermaid/svg-geometry";
import type { LabelEditorSession } from "./session";
export function selectLabelText(
  editor: HTMLElement | null | undefined,
  from: number,
  to: number,
): void {
  const selection = editor?.ownerDocument.getSelection?.();
  if (!editor || !selection) return;
  let first = editor.firstChild;
  if (!first) editor.appendChild((first = editor.ownerDocument.createTextNode("")));
  if (!(first instanceof Text)) return;
  try {
    selection.removeAllRanges();
    selection.setBaseAndExtent(
      first,
      Math.min(from, first.data.length),
      first,
      Math.min(to, first.data.length),
    );
  } catch {}
}
export function labelTextSelection(
  editor: HTMLElement | null | undefined,
): [number, number] {
  let from = (editor?.textContent ?? "").length;
  let to = from;
  const selection = editor?.ownerDocument.getSelection?.();
  const anchor = selection?.anchorNode;
  const focus = selection?.focusNode;
  if (
    editor &&
    selection &&
    selection.rangeCount &&
    anchor &&
    focus &&
    editor.contains(anchor) &&
    editor.contains(focus)
  ) {
    const range = editor.ownerDocument.createRange();
    range.setStart(editor, 0);
    range.setEnd(anchor, selection.anchorOffset);
    from = range.toString().length;
    range.setEnd(focus, selection.focusOffset);
    to = range.toString().length;
    if (to < from) [from, to] = [to, from];
  }
  return [from, to];
}
export function insertLabelText(
  editor: HTMLElement | null | undefined,
  text: string,
): void {
  if (!editor) return;
  const source = editor.textContent ?? "";
  const [from, to] = labelTextSelection(editor);
  editor.textContent = source.slice(0, from) + text + source.slice(to);
  selectLabelText(editor, from + text.length, from + text.length);
}
export function positionLabelEditor(
  block: HTMLElement,
  editor: LabelEditorSession | null,
  held: HeldDiagramLabel | null,
  pane: HTMLElement | null,
): void {
  if (!editor || !held || !pane) return;
  const target =
    held.el.isConnected &&
    pane.contains(held.el) &&
    (held.el.querySelector("foreignObject > *, text") ?? held.el);
  if (!target) return;
  const bounds = target.getBoundingClientRect();
  const blockBounds = block.getBoundingClientRect();
  const element = editor.el;
  element.style.left = `${bounds.left + bounds.width / 2 - blockBounds.left}px`;
  element.style.top = `${bounds.top + bounds.height / 2 - blockBounds.top}px`;
  element.style.minWidth = `${Math.max(16, bounds.width + 4)}px`;
  element.style.minHeight = `${bounds.height}px`;
  const style = block.ownerDocument.defaultView?.getComputedStyle(target);
  if (!style) return;
  let scale = 1;
  if (
    "offsetWidth" in target &&
    typeof target.offsetWidth === "number" &&
    target.offsetWidth > 0
  )
    scale = bounds.width / target.offsetWidth;
  else if (hasSvgBoundingBox(target)) {
    try {
      const box = target.getBBox();
      if (box.width > 0) scale = bounds.width / box.width;
    } catch {}
  }
  if (!(scale > 0.2 && scale < 5)) scale = 1;
  element.style.fontFamily = style.fontFamily;
  element.style.fontWeight = style.fontWeight;
  element.style.fontStyle = style.fontStyle;
  element.style.letterSpacing = style.letterSpacing;
  const fontSize = parseFloat(style.fontSize);
  if (fontSize > 0) element.style.fontSize = `${fontSize * scale}px`;
  const lineHeight = parseFloat(style.lineHeight);
  element.style.lineHeight =
    lineHeight > 0 && style.lineHeight.endsWith("px")
      ? `${lineHeight * scale}px`
      : style.lineHeight;
  if (style.color) element.style.color = style.color;
  const hint = editor.host.querySelector<HTMLElement>(".cw-mm-edit-hint");
  if (hint) {
    hint.style.left = element.style.left;
    hint.style.top = `${bounds.bottom - blockBounds.top + 6}px`;
  }
}
