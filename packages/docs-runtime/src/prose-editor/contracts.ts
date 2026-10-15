
/** Untrusted host payload: each field must be checked before use. */
export type HostMessageRecord = Readonly<Record<string, unknown>>;
/** Mount's file comes from the parent's document loader; the runtime assumes this shape. */
export interface HostDocumentFile {
  readonly styleSheet?: unknown;
  readonly root: string;
  readonly nodes: Readonly<
    Record<string, { readonly type: string; readonly body?: string }>
  >;
}
export type ZoomLevel = number | "fit";
export interface MediaSize {
  w: number;
  h: number;
}
export interface SpellDictionary {
  en: string;
  tech: string;
  en60: string;
  en70: string;
  neverSuggest: string;
}
export interface SpellPreferences {
  claude: "on" | "ask" | "off";
  paced: boolean;
  show: boolean;
  builtinAutocorrect: boolean;
  words: string[];
}
export interface SpellWireSettings {
  readonly claude?: unknown;
  readonly cadence?: unknown;
  readonly on?: unknown;
  readonly builtinAutocorrect?: unknown;
  readonly userWords?: unknown;
}
export interface CommentFocus {
  id: string | null;
  focused: boolean;
}
export interface CommentFocusRequest {
  id: string | null;
  focus: boolean;
}
export interface EditorPermissions {
  readonly readonly: boolean;
  readonly viewOnly?: boolean;
  readonly commentOnly?: boolean;
  readonly phone?: boolean;
  readonly phoneEdit?: "always" | "on-inset" | false;
  readonly hostMenu?: boolean;
  readonly hostMenuFolds?: boolean;
}
export type PermissionFlags = [
  readonly: boolean,
  viewOnly: boolean,
  commentOnly: boolean,
  phoneComment: boolean,
  hostMenu: boolean,
  hostMenuFolds: boolean,
  phoneEdit: "always" | "on-inset" | false,
];
export type InlineStyle = Record<string, string>;

/** Definition passed to the inline-chip node factory. */
export interface InlineChipDefinition {
  readonly name: string;
  readonly attrs: Readonly<Record<string, { readonly default?: unknown }>>;
  readonly copyText?: (
    attrs: Readonly<Record<string, unknown>>,
  ) => string | null | undefined;
  readonly render: unknown;
}

/** Common graph shape needed to collect slide and placement identifiers. */
export interface SlideGraphProjection {
  readonly nodes: Readonly<Record<string, { readonly type: string } | undefined>>;
}
