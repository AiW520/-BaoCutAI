import type { Node as ProseMirrorNode } from "prosemirror-model";
import { TextSelection, type PluginKey, type Selection } from "prosemirror-state";
import type { EditorView } from "prosemirror-view";
import { firstBareIdentifier } from "../mermaid/bare-identifiers";
import { bracketLabels } from "../mermaid/bracket-labels";
import { containsDeclaredLabel } from "../mermaid/label-definitions";
import type { HeldDiagramLabel, SourceReplacement } from "../mermaid/label-source";
import { shapeDataLabel } from "../mermaid/shape-labels";
import {
  edgeLabelKind,
  isBareSourcePosition,
  isEdgeLabelPosition,
} from "../mermaid/source-context";
import { stateDeclaration } from "../mermaid/state-declarations";
import {
  mermaidSiblingWritesMeta,
  mermaidWriteMeta,
  trimSourceReplacement,
} from "./source-replacement";
export interface LabelSourceHost {
  readonly view: EditorView;
  inPlace: HeldDiagramLabel | null;
  getPos(): number | undefined;
  exitSelection(doc: ProseMirrorNode, pos: number, direction: number): Selection | null;
}
export type HeldLabelUpdate = Pick<HeldDiagramLabel, "from" | "to" | "label" | "exact">;
export function replaceLabelSource(
  host: LabelSourceHost,
  pluginKey: PluginKey<unknown>,
  source: string,
  from: number,
  to: number,
  insert: string,
  label: HeldLabelUpdate,
  siblings: readonly SourceReplacement[] = [],
  caret: number | null = null,
) {
  const held = host.inPlace;
  const blockPosition = host.getPos();
  if (!held || blockPosition == null) return;
  if (!canWriteLabelSource(source, held.id, from, to, insert)) return;
  const edit = trimSourceReplacement(
    source,
    {
      from,
      to,
      insert,
    },
    caret,
  );
  const documentFrom = blockPosition + 1 + edit.from;
  const documentTo = blockPosition + 1 + edit.to;
  const transaction = host.view.state.tr.setMeta(pluginKey, mermaidWriteMeta);
  const normalizedSiblings = siblings
    .map((input2) => trimSourceReplacement(source, input2))
    .filter((input2) => input2.insert || input2.to > input2.from);
  const siblingDelta = normalizedSiblings
    .filter((input2) => input2.to <= edit.from)
    .reduce(
      (input2, options2) =>
        input2 + options2.insert.length - (options2.to - options2.from),
      0,
    );
  const absoluteSiblings = normalizedSiblings.map((input2) => ({
    from: blockPosition + 1 + input2.from,
    to: blockPosition + 1 + input2.to,
    insert: input2.insert,
  }));
  if (absoluteSiblings.length)
    transaction.setMeta(mermaidSiblingWritesMeta, absoluteSiblings);
  if (edit.insert) transaction.insertText(edit.insert, documentFrom, documentTo);
  else if (documentTo > documentFrom) transaction.delete(documentFrom, documentTo);
  host.inPlace = {
    from: label.from + siblingDelta,
    to: label.to + siblingDelta,
    id: held.id,
    label: label.label,
    el: held.el,
    exact: label.exact,
  };
  const selectionFrom = Math.min(
    blockPosition + 1 + label.from,
    transaction.doc.content.size,
  );
  const selectionTo = Math.min(
    blockPosition + 1 + label.to,
    transaction.doc.content.size,
  );
  if (selectionTo > selectionFrom)
    transaction.setSelection(
      TextSelection.create(transaction.doc, selectionFrom, selectionTo),
    );
  else {
    host.inPlace = null;
    const value10 = host.exitSelection(transaction.doc, blockPosition, 1);
    if (value10) transaction.setSelection(value10);
  }
  if (transaction.docChanged || transaction.selectionSet) host.view.dispatch(transaction);
}
export function canWriteLabelSource(
  source: string,
  id: string | null,
  from: number,
  to: number,
  insert: string,
) {
  if (id == null)
    return (
      isEdgeLabelPosition(source, from) &&
      (edgeLabelKind(source, from, to - from) != null ||
        (source[from] === '"' &&
          source[to - 1] === '"' &&
          to - from >= 2 &&
          edgeLabelKind(source, from + 1, to - from - 2) != null))
    );
  if (containsDeclaredLabel(source, id, from, to)) return true;
  if (
    bracketLabels(source, id).some(
      (input2) => from === input2.group.from - id.length && to === input2.group.to,
    )
  )
    return true;
  const declaration = stateDeclaration(source, id);
  if (
    declaration &&
    ((from === declaration.decl.from && to === declaration.decl.to) ||
      (from === declaration.line.from && to === declaration.line.to))
  )
    return true;
  if (from === to && /^[ \t]*state "[^"\n]*" as (.+)\n$/u.exec(insert)?.[1] === id)
    return true;
  const shapeLabel = shapeDataLabel(source, id);
  if (shapeLabel && from === shapeLabel.from - 1 && to === shapeLabel.to + 1) return true;
  if (
    source.slice(from, to) === id &&
    insert.startsWith(id) &&
    !/[\p{L}\p{N}_.-]/u.test(insert[id.length] ?? "")
  )
    return from === firstBareIdentifier(source, id) && isBareSourcePosition(source, from);
  return false;
}
