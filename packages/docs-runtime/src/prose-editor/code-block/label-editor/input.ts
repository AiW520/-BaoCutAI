import type { EditorView } from "prosemirror-view";
import type { HeldDiagramLabel } from "../mermaid/label-source";
import { insertLabelText, labelTextSelection, selectLabelText } from "./dom";
import { isLabelHistoryKey, labelHistoryKey } from "./keyboard";
import type { LabelEditorSession } from "./session";
interface LabelEditorInputHost {
  readonly editor: LabelEditorSession | null;
  readonly inPlace: HeldDiagramLabel | null;
  readonly view: EditorView;
  readonly destroyed: boolean;
}
interface LabelEditorInputActions {
  closeLabelEditor(cancel: boolean): void;
  historyChord(event: KeyboardEvent): void;
  writeThrough(): void;
  readBack(force?: boolean): boolean;
}
export function wireLabelEditorInput(
  context: LabelEditorInputHost,
  actions: LabelEditorInputActions,
  element: HTMLDivElement,
  host: HTMLDivElement,
): void {
  const ownerDocument = element.ownerDocument;
  element.addEventListener("keydown", (event) => {
    event.stopPropagation();
    if (event.key === "Enter") {
      event.preventDefault();
      actions.closeLabelEditor(false);
    } else if (event.key === "Escape") {
      event.preventDefault();
      actions.closeLabelEditor(true);
    } else if (isLabelHistoryKey(event)) {
      event.preventDefault();
      actions.historyChord(event);
    }
  });
  for (const value19 of [
    "keyup",
    "keypress",
    "beforeinput",
    "input",
    "compositionstart",
    "compositionupdate",
    "compositionend",
    "cut",
    "copy",
  ])
    element.addEventListener(value19, (input2) => input2.stopPropagation());
  element.addEventListener("input", () => {
    const value19 = element.textContent ?? "";
    if (/[\n\r]/.test(value19))
      element.textContent = value19.replace(/\s*[\n\r]+\s*/g, " ");
    actions.writeThrough();
  });
  element.addEventListener("compositionstart", () => {
    if (context.editor?.el === element) context.editor.composing = true;
  });
  element.addEventListener("compositionend", () => {
    const editor = context.editor;
    if (editor?.el !== element) return;
    editor.composing = false;
    if (!editor.readPending) return;
    editor.readPending = false;
    actions.readBack();
  });
  element.addEventListener("beforeinput", (event) => {
    const inputType = event.inputType;
    if (inputType !== "historyUndo" && inputType !== "historyRedo") return;
    event.preventDefault();
    actions.historyChord(labelHistoryKey(ownerDocument, inputType === "historyRedo"));
  });
  element.addEventListener("paste", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const value19 = (event.clipboardData?.getData("text/plain") ?? "").replace(
      /\s*[\n\r]+\s*/g,
      " ",
    );
    if (value19) {
      insertLabelText(context.editor?.el, value19);
      actions.writeThrough();
    }
  });
  const state = {
    down: false,
    tab: false,
  };
  const value16 = () => (state.down = true);
  const value17 = () =>
    queueMicrotask(() => {
      state.down = false;
    });
  ownerDocument.addEventListener("pointerdown", value16, true);
  ownerDocument.addEventListener("pointerup", value17, true);
  ownerDocument.addEventListener("mousedown", value16, true);
  ownerDocument.addEventListener("mouseup", value17, true);
  element.addEventListener("keydown", (input2) => {
    if (input2.key === "Tab") state.tab = true;
  });
  const value18 = () => {
    ownerDocument.removeEventListener("pointerdown", value16, true);
    ownerDocument.removeEventListener("pointerup", value17, true);
    ownerDocument.removeEventListener("mousedown", value16, true);
    ownerDocument.removeEventListener("mouseup", value17, true);
  };
  if (context.editor) context.editor.unwire = value18;
  element.addEventListener("blur", (input2) => {
    if (context.editor?.el !== element) return value18();
    const relatedTarget = input2.relatedTarget;
    if (
      !state.down &&
      !state.tab &&
      context.inPlace != null &&
      relatedTarget instanceof Node &&
      (relatedTarget === context.view.dom || context.view.dom.contains(relatedTarget)) &&
      !host.contains(relatedTarget)
    ) {
      let [value19, value20] = labelTextSelection(context.editor?.el);
      queueMicrotask(() => {
        if (context.editor?.el !== element || context.destroyed) return;
        element.focus({
          preventScroll: true,
        });
        selectLabelText(context.editor?.el, value19, value20);
      });
      return;
    }
    value18();
    actions.closeLabelEditor(false);
  });
}
