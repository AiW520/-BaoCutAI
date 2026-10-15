import type { Dispose, UnknownRecord } from "./common";
import type { TabsPlacement } from "./style";

export type FontFace = "serif" | "sans" | "mono";
export interface DocumentFonts {
  readonly headings: FontFace;
  readonly text: FontFace;
}
export interface FontDisplay {
  headingFont?: FontFace;
  textFont?: FontFace;
}
export interface TypographySeat {
  readonly pid: string;
  readonly typography: DocumentFonts;
}
export type FontPostState =
  | { post: DocumentFonts; applied: true }
  | { post: DocumentFonts | null; applied: false };
export interface TabsPick {
  readonly place: TabsPlacement;
  readonly token: number;
  readonly kept: boolean;
}
export interface TabTreeNode {
  readonly id: string;
  readonly children: readonly TabTreeNode[];
  readonly entry: {
    readonly name?: string | null;
    readonly [key: string]: unknown;
  };
  readonly [key: string]: unknown;
}
export interface FlatTab {
  node: TabTreeNode;
  depth: number;
  parentId: string | undefined;
}
export interface TabMove {
  parent: string | undefined;
  beforeId: string | undefined;
}
export interface TabSiblings {
  sibs: readonly TabTreeNode[];
  i: number;
  parentId: string | undefined;
}
export interface TabPosition {
  parentId: string | undefined;
  pos: number;
  size: number;
}
export type TabDrop = "before" | "after" | "into";
export type TabKeyboardMove = "up" | "down" | "into" | "out";
export interface PeekFocusState {
  peekSurface: boolean;
  focusId: string | null;
  draftAnchor: unknown;
  dirtyCount: number;
}
export interface TitleEscapeState extends PeekFocusState {
  quietAskCard: boolean;
  docFocused: boolean;
  listPopover: boolean;
  hostPopoverOpen: boolean;
}
export interface FrameFocusState {
  hasFocus: boolean;
  activeElement: Element | null;
  body: HTMLElement | null;
  iframe: HTMLIFrameElement | null;
  inDraftCard(element: Element): boolean;
}
export interface TitleFocusState {
  id: unknown;
  live: boolean;
  frameFocused: boolean;
  focusId: string | null;
  unsent: boolean;
  draftFloats: boolean;
  held(id: string): boolean;
  hidden(id: string): boolean;
}
export type TitleFocusDecision =
  | { act: "ignore" | "unavailable" | "refuse-unsent" | "refuse-draft" }
  | { act: "open"; id: string };
export interface KeyboardHelpState {
  open: boolean;
  mounted: number;
}
export interface KeyboardHelpPatch {
  open: boolean;
  returnTo?: Element | null;
}
export type FontListener = () => void;
export type FontSubscription = (listener: FontListener) => Dispose;
export type DisplayRecord = UnknownRecord;
