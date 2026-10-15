export interface ErrorDetails {
  isError: boolean;
  message: string;
  stack: string;
  text: string;
}
export interface RunSource {
  readonly surface: string;
  readonly id: string;
  readonly attested: boolean;
}
export type LanguageAttributes =
  | { readonly lang: string; readonly declared: true }
  | { readonly lang: "" | undefined; readonly declared: false };
export interface SidebarEstimateState {
  readonly wide: boolean;
  readonly railDocked: boolean;
  readonly layout: unknown;
  readonly zoom: unknown;
}
export interface SidebarViewport {
  readonly left: number;
  readonly docTop: number;
}
export type TelemetryCode =
  | "conflict"
  | "read_only"
  | "too_large"
  | "invalid_content"
  | "backpressure"
  | "transient";
export type TelemetryValueKind =
  | "null"
  | "undef"
  | "str"
  | "num"
  | "bool"
  | "sym"
  | "fn"
  | "event"
  | "response"
  | "domx"
  | "errsub"
  | "obj";
export type JavaScriptType =
  | "string"
  | "number"
  | "bigint"
  | "boolean"
  | "symbol"
  | "function"
  | "undefined"
  | "object";
export type MediaListener = () => void;
export interface MediaList {
  readonly matches: boolean;
  addEventListener?(type: "change", listener: MediaListener): void;
  removeEventListener?(type: "change", listener: MediaListener): void;
}
export interface MediaHost {
  matchMedia?: (query: string) => MediaList;
}
export interface MediaSubscription {
  subscribe(listener: MediaListener): () => void;
  getSnapshot(): boolean;
}
export interface CoarseMediaState {
  readonly source: MediaHost["matchMedia"];
  readonly list: MediaList;
  readonly subscribers: Set<MediaListener>;
  readonly onListChange: MediaListener;
  coarse: boolean;
}
