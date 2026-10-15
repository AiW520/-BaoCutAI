import type { EditorNodeJSON } from "../document/contracts";
import type { UnknownRecord } from "../serialization/value-contracts";

export interface SnapshotHttpReply { status: number; body: unknown }
export interface SnapshotView { xml: string; rev: number }
export type PictureNodeType = 'blockquote' | 'cell' | 'codeBlock' | 'date' | 'doc' | 'dropdown' | 'hardBreak' | 'horizontalRule' | 'list' | 'listItem' | 'media' | 'mention' | 'paragraph' | 'pending' | 'table' | 'tableRow' | 'text';
export type PictureMarkType = 'bold' | 'code' | 'highlight' | 'italic' | 'link' | 'strike' | 'underline';
export interface PictureNode extends EditorNodeJSON {
  readonly type: PictureNodeType;
  readonly content?: readonly PictureNode[];
  readonly marks?: readonly {type: PictureMarkType; attrs?: EditorNodeJSON['attrs']}[];
}
export interface RecordReference { object: 'file' | 'node'; id: string }
export type LaneRead = (reference: RecordReference) => UnknownRecord | undefined;
export interface PictureLane { read: LaneRead }
export interface TabNode { nodeId: string; bodyLid?: string }
export interface PictureReader {
  pid: string; fileId: string; lane: PictureLane;
  readFrom: number; container?: {kind: 'project'; id: string};
  read?: (nodeId: string) => Promise<SnapshotHttpReply>;
}
export type ResolvedPictureReader = PictureReader & TabNode;
export interface TabPicture {
  key: string; pid: string; fileId: string; nodeId: string; rev: number;
  readFrom: number;
  /** Parsed host file is opaque to the preview reader; it is never treated as arbitrary callable data. */
  file: unknown;
}
export type PictureFailure = 'paged' | 'refused' | 'behind' | 'embeds' | 'unknown' | 'threw' | 'no-node';
export type PictureResult = TabPicture | PictureFailure;
export type PreviewParser = (input: string | {doc: EditorNodeJSON}, at: number, options: {rev: number; bodyLid?: string}) => {doc: EditorNodeJSON; file: unknown};
