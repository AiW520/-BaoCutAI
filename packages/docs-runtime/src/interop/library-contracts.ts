import type { RefObject } from "react";
import type { ResolvedPos, Slice } from "prosemirror-model";
import type { EditorView } from "prosemirror-view";

/** Runtime exports absent from the packages' public declaration files. */
export interface ReactPrivateExports {
  __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE: unknown;
  __COMPILER_RUNTIME: unknown;
  unstable_useCacheRefresh: () => () => void;
}
export interface ProseMirrorViewPrivateExports {
  __endComposition: (view: EditorView, restarting?: boolean) => boolean | undefined;
  __parseFromClipboard: (
    view: EditorView,
    text: string,
    html: string | null,
    plainText: boolean,
    context: ResolvedPos,
  ) => Slice | null;
}
/** prosemirror-tables' paste implementation uses only these two view members. */
export type TablePasteHandler = (
  view: Pick<EditorView, "state" | "dispatch">,
  event: ClipboardEvent | null,
  slice: Slice,
) => boolean;

export interface SheetBoundaryState {
  sheet: boolean;
  pending: boolean;
  covered: boolean;
  inert: boolean;
  depth: number;
}
export interface OverlayBoundaryState {
  open: boolean;
  dismiss(): void;
}
export interface SheetLabels {
  sheetTitle?: string;
  backLabel?: string;
  closeLabel?: string;
}
export interface FieldBoundaryState {
  invalid: boolean;
  disabled: boolean;
}
export interface MenuTriggerBoundaryState {
  triggerRef: RefObject<HTMLElement | null>;
}
