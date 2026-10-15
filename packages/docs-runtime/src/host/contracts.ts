import type { Dispose } from "../boot/lifecycle-contracts";
import type { JsonValue, UnknownRecord } from "../serialization/value-contracts";

export interface HostEvent {
  type: string;
}
export type BridgeRequest =
  | { verb: "read" | "watch" | "navigate"; ref: string }
  | {
      verb: "editType";
      typeRef: string;
      rect: { top: number; left: number; width: number; height: number };
      sig: string;
    }
  | { verb: "run"; ref: string; params: JsonValue | null; sig: string }
  | { verb: "widget-bundle" | "widget-vs-load"; nodeId: string }
  | { verb: "blob-bytes"; key: string }
  | {
      verb: "widget-source";
      ref: string;
      target?: string;
      argsJson?: string;
      nodeId?: string;
    }
  | {
      verb: "widget-write";
      nodeId: string;
      ref: string;
      target?: string;
      valueJson: string;
      sig: string;
    }
  | {
      verb: "widget-invoke";
      nodeId: string;
      routine: string;
      argsJson?: string;
      sig: string;
    };
export type BridgeCall = BridgeRequest & { type: "bridge-call"; id: number };
export interface BridgeUnwatch {
  type: "bridge-unwatch";
  id: number;
}
export type BridgeReply =
  | { ok: true; value: unknown }
  | { ok: false; error: string };
export type BridgeWatch = (value: unknown, error: unknown) => void;
export interface WidgetSourceWire {
  ref: string;
  target?: string;
  argsJson?: string;
  nodeId?: string;
}
export interface WidgetInvokeWire {
  nodeId: string;
  routine: string;
  argsJson?: string;
}
export interface WidgetWriteWire {
  nodeId: string;
  ref: string;
  target?: string;
  valueJson: string;
}
export interface WidgetLog {
  level: string;
  message: string;
}
export interface WidgetLogWire extends WidgetLog {
  nodeId: string;
}
export interface WidgetChannels<
  Source = unknown,
  Invoke = unknown,
  Write = unknown,
> {
  watch(ref: string, onValue: BridgeWatch): Dispose;
  widgetSource?(request: WidgetSourceWire): PromiseLike<Source> | Source;
  widgetInvoke?(request: WidgetInvokeWire): PromiseLike<Invoke> | Invoke;
  widgetWrite?(request: WidgetWriteWire): PromiseLike<Write> | Write;
  widgetLog?(request: WidgetLogWire): unknown;
}
export interface WidgetFailure {
  error: true;
  rule: "no-channel" | "not-implemented" | "too-large" | "not-allowed";
  message: string;
}
export interface WidgetOperations<Source, Invoke, Write> {
  source(request: {
    ref: string;
    target?: string;
    args?: JsonValue;
  }): Promise<Awaited<Source>>;
  watch(ref: string, onValue: BridgeWatch): Dispose;
  invoke(
    routine: string,
    args?: JsonValue,
  ): Promise<Awaited<Invoke> | WidgetFailure>;
  write(request: {
    ref: string;
    target?: string;
    value: JsonValue;
  }): Promise<Awaited<Write> | WidgetFailure>;
  log(event: WidgetLog): unknown;
}
export interface HostBridge extends WidgetChannels {
  read(ref: string): Promise<unknown>;
  navigate(ref: string): void;
  editType(
    typeRef: string,
    element: Pick<Element, "getBoundingClientRect">,
  ): Promise<unknown>;
  run(ref: string, params?: JsonValue): Promise<string>;
  viewState: UnknownRecord;
  widgetBundle(nodeId: string): Promise<unknown>;
  widgetSource(request: WidgetSourceWire): Promise<unknown>;
  widgetWrite(request: WidgetWriteWire): Promise<unknown>;
  widgetInvoke(request: WidgetInvokeWire): Promise<unknown>;
  widgetLog(request: WidgetLogWire): void;
  widgetFault(request: { nodeId: string; phase: string; cls: string }): void;
  widgetVsLoad(nodeId: string): Promise<unknown>;
  widgetVsSave(request: { nodeId: string; vs: JsonValue }): void;
  widgetReread(nodeId: string): void;
}
export interface FrameLane {
  whenSeeded(): PromiseLike<void>;
  read(ref: { object: "project" | "version" | "enum"; id: string }): unknown;
  refs(): Map<string, { born?: { seq: number; at: string } }>;
  head: number;
  deadReason: string | null;
}
export interface VersionLine {
  id: string;
  parent: string | null;
  base: number;
  name?: string;
  frozen?: boolean;
  abandoned?: boolean;
  bornAtSeq?: number;
  bornAt?: string;
}
export interface FrameVersions {
  head: number;
  defaultVersionId: string | null;
  lines: VersionLine[];
}
export interface EnumRow {
  id: string;
  name: string;
  options: unknown[];
}
export type FrameVerdict =
  | { verdict: "allow"; value?: unknown }
  | {
      verdict: "deny";
      reason: "forbidden";
      detail: string;
      data: { code: "forbidden"; why: "lane" };
    };
export interface SaveRequest {
  request?: string;
  readonly [key: string]: unknown;
}
export interface DownloadsCapability {
  save(request: SaveRequest): PromiseLike<unknown> | unknown;
}
export interface McpCapability {
  callTool(request: unknown): PromiseLike<unknown> | unknown;
  listTools?(): PromiseLike<unknown> | unknown;
}
export type McpMount =
  | { at: "mounted"; ns: McpCapability }
  | { at: "absent" }
  | { at: "withheld" }
  | { at: "failed" };
export type SaveResult =
  | { ok: true }
  | { ok: false; code: string; unlisted?: true };
export interface NonceDependencies {
  reloaded: boolean;
  mint(): string;
  storage?: Pick<Storage, "getItem" | "setItem"> | null;
}
export interface ModeStore {
  set(on: boolean, byKey?: boolean): void;
  subscribe(listener: (on: boolean) => void): Dispose;
}
export interface HostThread {
  id: string;
  anchor: unknown;
  readonly [key: string]: unknown;
}
export interface ModeCallbacks {
  cbs: {
    mode(on: unknown, options: unknown): void;
    threads(threads: readonly HostThread[]): void;
    reveal(id: string): void;
  };
  attach(host: { exitMode?(): void }): void;
  threads(): readonly HostThread[];
  hostOn(): boolean;
  dispose: Dispose;
}
export type KeyboardPlace = "inText" | "notInText";
export type PrimeAnswer = "restored" | "other" | "none";
export type KeyboardDecision =
  | "notInText"
  | "restored"
  | "primedInText"
  | "elsewhereInText";
export interface KeyboardSeat {
  keyboard(): KeyboardPlace;
  writable?(): boolean | undefined;
  answer: PrimeAnswer | null;
  resets: number;
}
export interface KeyboardLease {
  answer(restored: boolean): void;
  noPrime(): void;
  reset(): void;
  dispose(): void;
}
export type FrameStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;
export interface HeadingGate {
  ready?: boolean;
  navigated?: boolean;
  displayOn: boolean;
  filmed: boolean;
  key: string | null;
}
export interface RectPin {
  rect?: { x: number; y: number; w: number; h: number };
  scrollY?: number;
  rowsPin?: unknown;
  fedPath?: unknown;
  readonly [key: string]: unknown;
}
export interface OpenWindow {
  openedAt: number | null;
  closedAt: number;
}
export interface CapabilityAccess {
  use?(capability: "downloads" | "mcp"): PromiseLike<unknown> | unknown;
  downloads?: unknown;
  mcp?: unknown;
}
