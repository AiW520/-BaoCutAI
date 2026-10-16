import type { LabelCopies } from "../mermaid/label-source";
export interface LabelEditorSession {
  el: HTMLDivElement;
  host: HTMLDivElement;
  original: string;
  def0: string | null;
  written: string;
  bare: "flowchart" | "state" | null;
  declared: "flowchart" | "state" | null;
  composing: boolean;
  readPending: boolean;
  forId: string | null;
  quoted0: boolean;
  squote0: boolean;
  chord: boolean;
  copies: LabelCopies | null;
  unwire(): void;
}
export interface OpenLabelEditorOptions {
  replaceWith?: string;
  deleteSel?: boolean;
  caretEnd?: boolean;
  caret?: number;
}
