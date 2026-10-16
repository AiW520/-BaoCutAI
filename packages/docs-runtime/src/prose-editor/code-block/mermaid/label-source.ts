/** UTF-16 offsets into the Mermaid source, matching ProseMirror text positions. */
export interface SourceRange {
  from: number;
  to: number;
}
export type DiagramKind = "flowchart" | "state" | "sequence" | "class" | "er" | "other";
export interface StateDeclaration {
  decl: SourceRange;
  content: SourceRange;
  line: SourceRange;
  kind: "as" | "desc";
}
export interface QuotedLabel extends SourceRange {
  quoted?: boolean;
  squote?: boolean;
  bare?: boolean;
}
export interface BracketLabel extends QuotedLabel {
  group: SourceRange;
  quoted: boolean;
}
export interface LabelSource extends SourceRange {
  label: SourceRange | null;
}
export interface LabelMatch {
  at: number;
  len: number;
  by: "id" | "label";
}
export interface LabelSelection extends SourceRange {
  exact: boolean;
  whole: SourceRange;
}
export interface SourceReplacement extends SourceRange {
  insert: string;
}
export interface LabelEdit extends SourceReplacement {
  label: SourceRange;
  exact: boolean;
  declared?: "flowchart" | "state";
}
export interface HeldDiagramLabel extends SourceRange {
  id: string | null;
  label: string | null;
  el: Element;
  exact: boolean;
}
export interface DiagramLabel {
  el: Element;
  id: string | null;
  label: string | null;
}
export interface LabelCopies {
  groups: string[];
  idx: number[];
  pi: number;
}
