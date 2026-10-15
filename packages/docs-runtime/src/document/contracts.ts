import type { JsonObject, JsonValue } from "../serialization/value-contracts";
import type { StylePatch, StyleReply } from "./style-contracts";

export type { JsonObject, JsonValue } from "../serialization/value-contracts";
export type PageId = string;
export type TabId = string;
export type DocumentFont = 'serif' | 'sans' | 'mono';
export interface DocumentTypography { headings: DocumentFont; text: DocumentFont }
export type WriteVerdict = import("./style-contracts").StyleWriteResult;
export interface TextPosition { from: number; to: number }
export interface DocumentSeat {
  pid: PageId;
  typography: DocumentTypography;
  post?: (operations: StylePatch[]) => Promise<StyleReply | undefined>;
}
export interface EditorMarkJSON { readonly type: string; readonly attrs?: JsonObject }
export interface EditorNodeJSON {
  readonly type: string;
  readonly attrs?: JsonObject;
  readonly content?: readonly EditorNodeJSON[];
  readonly marks?: readonly EditorMarkJSON[];
  readonly text?: string;
}
export interface PageVersion {
  id: string; createdAt?: string; content?: EditorNodeJSON;
  readonly metadata?: JsonObject;
}
export interface SourceLocation { path: string; start: number; end: number }
