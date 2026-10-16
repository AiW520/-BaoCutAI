import type { Node as ProseMirrorNode } from "prosemirror-model";
import { type PluginKey, type Selection } from "prosemirror-state";
import type { EditorView } from "prosemirror-view";
import { firstBareIdentifier } from "../mermaid/bare-identifiers";
import { bracketLabels } from "../mermaid/bracket-labels";
import { diagramKind } from "../mermaid/diagram-kind";
import { firstDeclaredLabel } from "../mermaid/label-definitions";
import { planLabelEdit } from "../mermaid/label-edit";
import { decodeMermaidLabel, normalizeLabelText } from "../mermaid/label-encoding";
import { locateHeldLabelSource, locateLabelSelection } from "../mermaid/label-location";
import type { HeldDiagramLabel } from "../mermaid/label-source";
import { isEditableDiagramLabel } from "../mermaid/labels";
import { edgeLabelKind } from "../mermaid/source-context";
import { stateDeclaration } from "../mermaid/state-declarations";
import { labelTextSelection, positionLabelEditor, selectLabelText } from "./dom";
import { wireLabelEditorInput } from "./input";
import type { LabelEditorSession, OpenLabelEditorOptions } from "./session";
import { copiesOf, siblingReverts, siblingWrites } from "./siblings";
import { canWriteLabelSource, replaceLabelSource } from "./source-writing";

interface LabelEditorHost {
  readonly dom: HTMLDivElement;
  readonly view: EditorView;
  readonly node: ProseMirrorNode;
  readonly srcOpen: boolean;
  readonly render: HTMLDivElement | null;
  readonly destroyed: boolean;
  editor: LabelEditorSession | null;
  inPlace: HeldDiagramLabel | null;
  getPos(): number | undefined;
  isSyncPending(): boolean;
  flushSyncSoon(): void;
  exitSelection(doc: ProseMirrorNode, pos: number, direction: number): Selection | null;
}
const hintDocuments = new WeakSet<Document>();
export class DiagramLabelEditor {
  private readonly host: LabelEditorHost;
  private readonly enabled: () => boolean;
  private readonly pluginKey: PluginKey<unknown>;
  constructor(
    host: LabelEditorHost,
    enabled: () => boolean,
    pluginKey: PluginKey<unknown>,
  ) {
    this.host = host;
    this.enabled = enabled;
    this.pluginKey = pluginKey;
  }
  position(): void {
    positionLabelEditor(
      this.host.dom,
      this.host.editor,
      this.host.inPlace,
      this.host.render,
    );
  }
  openLabelEditor(options: OpenLabelEditorOptions) {
    if (!this.enabled()) return false;
    const held = this.host.inPlace;
    if (
      !held ||
      this.host.srcOpen ||
      this.host.editor ||
      !this.host.view.editable ||
      !this.host.render
    )
      return false;
    if (!isEditableDiagramLabel(held.el)) return false;
    const blockPosition = this.host.getPos();
    if (blockPosition == null) return false;
    const source = this.host.node.textContent;
    const definition = locateHeldLabelSource(source, held.id, held.label, held);
    const bareIdentifier =
      held.id != null &&
      definition?.label != null &&
      definition.from === definition.label.from &&
      definition.to === definition.label.to &&
      source.slice(definition.from, definition.to) === held.id;
    const kind = bareIdentifier ? diagramKind(source) : null;
    const bareKind = kind === "flowchart" || kind === "state" ? kind : null;
    if (bareIdentifier && !bareKind) return false;
    const probe = planLabelEdit(
      source,
      held.id,
      held.label,
      `${held.label ?? ""}​`,
      held,
    );
    if (
      !probe ||
      !canWriteLabelSource(source, held.id, probe.from, probe.to, probe.insert)
    )
      return false;
    const original = held.exact
      ? source.slice(held.from, held.to)
      : (held.label ?? "").replace(/\s*\n\s*/g, " ");
    const selection = this.host.view.state.selection;
    const clampOffset = (input2: number) =>
      Math.max(0, Math.min(original.length, input2));
    let selectionFrom = held.exact
      ? clampOffset(selection.from - (blockPosition + 1) - held.from)
      : 0;
    let selectionTo = held.exact
      ? clampOffset(selection.to - (blockPosition + 1) - held.from)
      : original.length;
    if (selectionTo < selectionFrom)
      [selectionFrom, selectionTo] = [selectionTo, selectionFrom];
    let initialText = original;
    let initialFrom = selectionFrom;
    let initialTo = selectionTo;
    if (options.replaceWith != null) {
      initialText =
        original.slice(0, selectionFrom) +
        options.replaceWith +
        original.slice(selectionTo);
      initialFrom = initialTo = selectionFrom + options.replaceWith.length;
    } else if (options.deleteSel) {
      initialText = original.slice(0, selectionFrom) + original.slice(selectionTo);
      initialFrom = initialTo = selectionFrom;
    } else if (options.caretEnd) initialFrom = initialTo = initialText.length;
    else if (options.caret != null)
      initialFrom = initialTo = held.exact
        ? clampOffset(options.caret)
        : initialText.length;
    const ownerDocument = this.host.dom.ownerDocument;
    const editorHost = ownerDocument.createElement("div");
    editorHost.className = "cw-mm-edit-host";
    editorHost.setAttribute("contenteditable", "false");
    const editorElement = ownerDocument.createElement("div");
    editorElement.className = "cw-mm-edit";
    editorElement.setAttribute("contenteditable", "true");
    editorElement.tabIndex = 0;
    editorElement.spellcheck = false;
    editorElement.setAttribute("role", "textbox");
    editorElement.setAttribute("aria-label", "Edit label");
    editorElement.dataset.testid = "mermaid-label-editor";
    editorElement.textContent = initialText;
    this.host.editor = {
      el: editorElement,
      host: editorHost,
      original,
      def0: definition ? source.slice(definition.from, definition.to) : null,
      written: original,
      bare: bareKind,
      declared: null,
      composing: false,
      readPending: false,
      forId: held.id,
      quoted0:
        definition != null &&
        source[definition.from - 1] === '"' &&
        source[definition.to] === '"',
      squote0:
        definition != null &&
        source[definition.from - 1] === "'" &&
        source[definition.to] === "'",
      chord: false,
      copies: held.id ? copiesOf(source, held.id, definition, original) : null,
      unwire: () => {},
    };
    if (bareKind && !hintDocuments.has(ownerDocument)) {
      hintDocuments.add(ownerDocument);
      const value19 = ownerDocument.createElement("div");
      value19.className = "cw-mm-edit-hint";
      value19.textContent = `Adds a display label — the id stays “${held.id}”`;
      editorHost.appendChild(value19);
    }
    wireLabelEditorInput(this.host, this, editorElement, editorHost);
    editorHost.appendChild(editorElement);
    this.host.dom.appendChild(editorHost);
    this.host.dom.classList.add("cw-mm-editing");
    this.position();
    editorElement.focus({
      preventScroll: true,
    });
    if (ownerDocument.activeElement !== editorElement) editorElement.focus();
    selectLabelText(this.host.editor?.el, initialFrom, initialTo);
    if (initialText !== original) this.writeThrough();
    return true;
  }
  writeThrough() {
    const editor = this.host.editor;
    const held = this.host.inPlace;
    const blockPosition = this.host.getPos();
    if (!editor || !held || blockPosition == null || this.host.destroyed) return;
    const label = normalizeLabelText(editor.el.textContent);
    if (!label || label === editor.written) return;
    const textContent = this.host.node.textContent;
    const edit = planLabelEdit(textContent, held.id, held.label, label, held);
    if (!edit) return;
    const siblings = edit.declared
      ? []
      : siblingWrites(this.host.inPlace, textContent, edit, editor, label);
    editor.written = label;
    if (edit.declared) editor.declared = edit.declared;
    let [selectionFrom, selectionTo] = labelTextSelection(this.host.editor?.el);
    const editorText = editor.el.textContent ?? "";
    const caretOffset =
      selectionFrom === selectionTo
        ? selectionFrom - (editorText.length - editorText.trimStart().length)
        : null;
    const sourceCaret =
      edit.exact && caretOffset != null && caretOffset >= 0 && caretOffset <= label.length
        ? edit.label.from - edit.from + caretOffset
        : null;
    replaceLabelSource(
      this.host,
      this.pluginKey,
      textContent,
      edit.from,
      edit.to,
      edit.insert,
      {
        from: edit.label.from,
        to: edit.label.to,
        label,
        exact: edit.exact,
      },
      siblings,
      sourceCaret,
    );
  }

  historyChord(event: KeyboardEvent) {
    const editor = this.host.editor;
    if (!editor || this.host.destroyed || !this.host.view.editable) return;
    if (
      normalizeLabelText(editor.el.textContent) !== editor.written &&
      this.readBack(true)
    )
      return;
    editor.chord = true;
    try {
      this.host.view.someProp("handleKeyDown", (input2) => input2(this.host.view, event));
    } finally {
      editor.chord = false;
    }
    if (this.host.editor === editor && !this.host.inPlace && !this.host.destroyed)
      this.closeLabelEditor(false);
  }
  readBack(force: boolean = false) {
    const editor = this.host.editor;
    if (!editor || this.host.destroyed) return false;
    if (editor.composing) {
      editor.readPending = true;
      return true;
    }
    const label = this.labelInSource();
    const sourceText = label == null ? null : normalizeLabelText(label);
    if (!sourceText) return false;
    if (sourceText === editor.written && !force) return true;
    editor.written = sourceText;
    const editorText = normalizeLabelText(editor.el.textContent);
    if (editorText === sourceText) return true;
    const focused = editor.el.ownerDocument.activeElement === editor.el;
    let [selectionStart] = labelTextSelection(this.host.editor?.el);
    editor.el.textContent = sourceText;
    if (focused && !editorText)
      selectLabelText(this.host.editor?.el, 0, sourceText.length);
    else if (focused && editor.chord) {
      let index = 0;
      const value6 = Math.min(editorText.length, sourceText.length);
      while (
        index < value6 &&
        editorText[editorText.length - 1 - index] ===
          sourceText[sourceText.length - 1 - index]
      )
        index++;
      let index2 = 0;
      while (index2 < value6 && editorText[index2] === sourceText[index2]) index2++;
      index = Math.min(index, Math.max(0, sourceText.length - index2));
      selectLabelText(
        this.host.editor?.el,
        sourceText.length - index,
        sourceText.length - index,
      );
    } else if (focused) {
      const value6 =
        editorText.slice(0, selectionStart) === sourceText.slice(0, selectionStart)
          ? selectionStart
          : sourceText.endsWith(editorText.slice(selectionStart))
            ? sourceText.length - (editorText.length - selectionStart)
            : sourceText.length;
      selectLabelText(this.host.editor?.el, value6, value6);
    }
    this.position();
    return true;
  }
  labelInSource() {
    const editor = this.host.editor;
    const held = this.host.inPlace;
    if (!editor || !held) return null;
    const source = this.host.node.textContent;
    if (held.exact) return source.slice(held.from, held.to);
    const definition = locateHeldLabelSource(source, held.id, held.label, held);
    if (
      definition &&
      editor.def0 != null &&
      source.slice(definition.from, definition.to) === editor.def0
    )
      return editor.original;
    const currentLabel = held.id
      ? (bracketLabels(source, held.id).find(
          (input) => held.from >= input.group.from && held.to <= input.group.to,
        ) ?? firstDeclaredLabel(source, held.id))
      : held.from < held.to && edgeLabelKind(source, held.from, held.to - held.from)
        ? held
        : null;
    return currentLabel
      ? decodeMermaidLabel(source.slice(currentLabel.from, currentLabel.to))
      : null;
  }
  closeLabelEditor(cancel: boolean) {
    const editor = this.host.editor;
    if (!editor) return;
    this.host.editor = null;
    editor.unwire();
    editor.host.remove();
    this.host.dom.classList.remove("cw-mm-editing");
    const held = this.host.inPlace;
    const blockPosition = this.host.getPos();
    if (cancel && held && held.id !== editor.forId) cancel = false;
    if (
      cancel &&
      held &&
      blockPosition != null &&
      !this.host.destroyed &&
      editor.written !== editor.original
    ) {
      const textContent = this.host.node.textContent;
      const value2 = locateHeldLabelSource(textContent, held.id, held.label, held);
      const value3 =
        editor.declared === "state" && held.id
          ? stateDeclaration(textContent, held.id)
          : null;
      const value4 = value3 && value3.kind !== "desc" ? value3 : null;
      if (value4 && held.id) {
        const value5 =
          textContent.slice(0, value4.line.from) + textContent.slice(value4.line.to);
        const value6 = firstBareIdentifier(value5, held.id);
        replaceLabelSource(
          this.host,
          this.pluginKey,
          textContent,
          value4.line.from,
          value4.line.to,
          "",
          {
            from: value6 >= 0 ? value6 : value4.line.from,
            to: value6 >= 0 ? value6 + held.id.length : value4.line.from,
            label: held.id,
            exact: value6 >= 0,
          },
        );
      } else if (value2 && editor.def0 != null && editor.declared !== "state") {
        let { from, to: to2 } = value2;
        let def0 = editor.def0;
        if (
          !editor.quoted0 &&
          textContent[from - 1] === '"' &&
          textContent[to2] === '"' &&
          !/^"|"$/.test(editor.def0)
        ) {
          from--;
          to2++;
          if (editor.squote0) def0 = `'${editor.def0}'`;
        }
        const value5 = textContent.slice(0, from) + def0 + textContent.slice(to2);
        if (held.id) {
          const value7 = editor.squote0 && def0 !== editor.def0 ? 1 : 0;
          const value8 = locateHeldLabelSource(value5, held.id, editor.original || null, {
            from: from + value7,
            to: from + value7 + editor.def0.length,
          });
          if (
            !value8 ||
            value8.from !== from + value7 ||
            value8.to !== from + value7 + editor.def0.length
          )
            return void this.afterClose();
        }
        const value6 = held.id
          ? locateLabelSelection(value5, held.id, editor.original || null)
          : {
              from,
              to: from + editor.def0.length,
              exact: editor.def0 === editor.original,
            };
        replaceLabelSource(
          this.host,
          this.pluginKey,
          textContent,
          from,
          to2,
          def0,
          {
            from: value6 ? value6.from : from,
            to: value6 ? value6.to : from + def0.length,
            label: editor.original,
            exact: value6 ? value6.exact : false,
          },
          siblingReverts(this.host.inPlace, textContent, value2, editor),
        );
      }
    }
    this.afterClose();
  }
  afterClose() {
    if (this.host.destroyed) return;
    if (this.host.isSyncPending()) this.host.flushSyncSoon();
    this.host.view.focus();
  }
}
