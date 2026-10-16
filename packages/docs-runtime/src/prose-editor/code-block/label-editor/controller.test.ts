// @vitest-environment happy-dom
import { Schema } from "prosemirror-model";
import { EditorState, PluginKey, TextSelection } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { HeldDiagramLabel } from "../mermaid/label-source";
import { DiagramLabelEditor } from "./controller";
import { labelTextSelection, selectLabelText } from "./dom";
import type { LabelEditorSession } from "./session";
import {
  mermaidSiblingWritesMeta,
  mermaidWriteMeta,
  trimSourceReplacement,
} from "./source-replacement";

const schema = new Schema({
  nodes: {
    doc: { content: "codeBlock" },
    codeBlock: { content: "text*", code: true, toDOM: () => ["pre", ["code", 0]] },
    text: {},
  },
  marks: {},
});
const views: EditorView[] = [];
afterEach(() => {
  for (const view of views.splice(0)) view.destroy();
  document.body.replaceChildren();
  vi.restoreAllMocks();
});

function fixture(
  source = "flowchart TD\n A[First] --> A[First]",
  label = "First",
  enabled = true,
) {
  const from = source.indexOf(label);
  const doc = schema.node(
    "doc",
    null,
    schema.node("codeBlock", null, schema.text(source)),
  );
  const transactions: { write: unknown; siblings: unknown }[] = [];
  const keys: string[] = [];
  const key = new PluginKey<unknown>("label-editor-test");
  const view = new EditorView(document.body, {
    state: EditorState.create({
      doc,
      selection: TextSelection.create(doc, from + 1, from + label.length + 1),
    }),
    dispatchTransaction(transaction) {
      transactions.push({
        write: transaction.getMeta(key),
        siblings: transaction.getMeta(mermaidSiblingWritesMeta),
      });
      view.updateState(view.state.apply(transaction));
    },
    handleKeyDown(_view, event) {
      keys.push(event.key);
      return true;
    },
  });
  views.push(view);
  const dom = document.createElement("div");
  const render = document.createElement("div");
  render.innerHTML =
    '<svg><g class="node" id="flowchart-A-0"><text>First</text></g></svg>';
  dom.appendChild(render);
  document.body.appendChild(dom);
  const element = render.querySelector("g");
  if (!element) throw new Error("Missing diagram label");
  let held: HeldDiagramLabel | null = {
    from,
    to: from + label.length,
    id: "A",
    label,
    el: element,
    exact: true,
  };
  let editor: LabelEditorSession | null = null;
  const host: ConstructorParameters<typeof DiagramLabelEditor>[0] = {
    dom,
    view,
    render,
    srcOpen: false,
    destroyed: false,
    get node() {
      const node = view.state.doc.firstChild;
      if (!node) throw new Error("Missing code block");
      return node;
    },
    get editor() {
      return editor;
    },
    set editor(value) {
      editor = value;
    },
    get inPlace() {
      return held;
    },
    set inPlace(value) {
      held = value;
    },
    getPos: () => 0,
    isSyncPending: () => false,
    flushSyncSoon: () => {},
    exitSelection: (doc, pos) => TextSelection.create(doc, pos + 1),
  };
  const controller = new DiagramLabelEditor(host, () => enabled, key);
  const session = (): LabelEditorSession => {
    const current = host.editor;
    if (!current) throw new Error("Missing label editor");
    return current;
  };
  return { host, controller, session, transactions, keys };
}

describe("label editor source transactions", () => {
  it("keeps the feature gate, writes through with original metadata and restores on Escape", () => {
    const gated = fixture(undefined, undefined, false);
    expect(gated.controller.openLabelEditor({})).toBe(false);
    const { host, controller, session, transactions } = fixture();
    expect(controller.openLabelEditor({})).toBe(true);
    expect(labelTextSelection(session().el)).toEqual([0, 5]);
    session().el.textContent = "Changed";
    session().el.dispatchEvent(new InputEvent("input", { bubbles: true }));
    expect(host.node.textContent).toBe("flowchart TD\n A[Changed] --> A[First]");
    expect(transactions.at(-1)).toEqual({
      write: mermaidWriteMeta,
      siblings: [{ from: 30, to: 35, insert: "Changed" }],
    });
    session().el.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Escape", bubbles: true, cancelable: true }),
    );
    expect(host.editor).toBeNull();
    expect(host.dom.querySelector(".cw-mm-edit-host")).toBeNull();
    expect(host.node.textContent).toBe("flowchart TD\n A[First] --> A[First]");
  });

  it("creates a display label for bare ids and rolls back the declaration without changing the id", () => {
    for (const source of ["flowchart TD\n A --> B", "stateDiagram-v2\n A --> B"]) {
      const { host, controller } = fixture(source, "A");
      expect(controller.openLabelEditor({ replaceWith: "Hello" })).toBe(true);
      expect(host.node.textContent).toContain("Hello");
      expect(host.inPlace?.id).toBe("A");
      controller.closeLabelEditor(true);
      expect(host.node.textContent).toBe(source);
    }
  });

  it("defers source reads during composition and applies them after composition ends", () => {
    const { host, controller, session } = fixture();
    controller.openLabelEditor({});
    const editor = session();
    editor.el.dispatchEvent(new CompositionEvent("compositionstart", { bubbles: true }));
    const from = host.node.textContent.indexOf("First");
    host.view.dispatch(host.view.state.tr.insertText("Other", from + 1, from + 6));
    expect(controller.readBack()).toBe(true);
    expect(editor.readPending).toBe(true);
    expect(editor.el.textContent).toBe("First");
    editor.el.dispatchEvent(new CompositionEvent("compositionend", { bubbles: true }));
    expect(editor.composing).toBe(false);
    expect(editor.readPending).toBe(false);
    expect(editor.el.textContent).toBe("Other");
    controller.closeLabelEditor(false);
  });

  it("routes keyboard and beforeinput history through the ProseMirror view", () => {
    const { controller, session, keys } = fixture();
    controller.openLabelEditor({});
    const editor = session();
    const undo = new KeyboardEvent("keydown", {
      key: "z",
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    });
    editor.el.dispatchEvent(undo);
    expect(undo.defaultPrevented).toBe(true);
    const redo = new InputEvent("beforeinput", {
      inputType: "historyRedo",
      bubbles: true,
      cancelable: true,
    });
    editor.el.dispatchEvent(redo);
    expect(redo.defaultPrevented).toBe(true);
    expect(keys).toEqual(["z", "z"]);
    controller.closeLabelEditor(false);
  });

  it("normalizes pasted newlines and removes document listeners when closed", () => {
    const { host, controller, session } = fixture();
    const remove = vi.spyOn(document, "removeEventListener");
    controller.openLabelEditor({});
    const editor = session();
    selectLabelText(editor.el, 0, 5);
    const clipboard = new DataTransfer();
    clipboard.setData("text/plain", "Hello\n world");
    editor.el.dispatchEvent(
      new ClipboardEvent("paste", {
        clipboardData: clipboard,
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(editor.el.textContent).toBe("Hello world");
    expect(host.node.textContent).toContain("Hello world");
    controller.closeLabelEditor(false);
    expect(
      remove.mock.calls.some(
        ([type, , capture]) => type === "pointerdown" && capture === true,
      ),
    ).toBe(true);
    expect(
      remove.mock.calls.some(
        ([type, , capture]) => type === "mouseup" && capture === true,
      ),
    ).toBe(true);
  });
});

describe("minimal source replacement", () => {
  it("uses the caret to disambiguate overlapping repeated prefixes and suffixes", () => {
    expect(trimSourceReplacement("aaaa", { from: 0, to: 4, insert: "aaaaa" }, 2)).toEqual(
      { from: 1, to: 1, insert: "a" },
    );
    expect(trimSourceReplacement("abc", { from: 0, to: 3, insert: "abc" })).toEqual({
      from: 3,
      to: 3,
      insert: "",
    });
  });
});
