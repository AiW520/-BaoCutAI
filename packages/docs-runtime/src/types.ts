import type { JsonObject, JsonValue } from './type-models/common';
import type { StylePatch, StyleReply } from './type-models/style';

/** Legacy browser/polyglot interop only. Refined business modules use explicit contracts. */
export type Dynamic = any;
export type { JsonObject, JsonValue } from './type-models/common';
export type PageId = string;
export type TabId = string;
export type DocumentFont = 'serif' | 'sans' | 'mono';
export interface DocumentTypography { headings: DocumentFont; text: DocumentFont }
export type WriteVerdict = import('./type-models/style').StyleWriteResult;
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
