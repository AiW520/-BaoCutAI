export type RefusalRoad = "write" | "mint" | "read" | "presence" | "stream" | "oneshot";
export type RefusalScope = "op" | "node" | "link" | "page" | "session";
export type RetryKind =
  | "never"
  | "reread"
  | "rehandshake"
  | "counter"
  | "bounded"
  | "transient"
  | "lost";
export type RefusalSource = "wire" | "table" | "local" | "relay" | "http" | "default";
export type RefusalSurface = "words" | "silent" | "generic" | "quiet";
export type PageTerminalFace =
  | "unreached"
  | "view_only"
  | "not_governed"
  | "cmek"
  | "deleted";
export type LinkTerminalFace =
  | "node_gone"
  | "unreached"
  | "session"
  | "too_old"
  | "readonly";
export type OperationCustody = "unsynced" | "none" | "tray";
export interface RetryContract {
  retry: RetryKind;
  scope?: RefusalScope;
  face?: string;
  custody?: string;
  max?: number;
  floorMs?: number;
  redial?: boolean;
  after?: "assert" | RetryContract;
  surfaces?: RefusalSurface;
  words?: string | null;
  note?: string;
}
export interface ReasonRow extends RetryContract {
  key: string;
  reason: string;
  sub: string;
  subKey?: string;
  aliases?: readonly string[];
  today: string;
  fixture?: Readonly<Record<string, unknown>>;
  flip?: string;
  writeRoad?: string;
  mintedBy?: string;
  rigSkip?: boolean;
  rigWhy?: string;
  unwired?: string;
}
export interface TransportRow {
  key: string;
  code?: string;
  status?: number | "4xx";
  as: string;
  retry?: RetryKind;
  max?: number;
  today: string;
  sub?: string;
  verbs?: readonly string[];
  error?: string;
  note?: string;
  flip?: string;
  ships?: string;
  rigWhy?: string;
}
export type RefusalPolicy =
  | {
      k: "page_terminal";
      face: PageTerminalFace;
    }
  | {
      k: "link_terminal";
      face: LinkTerminalFace;
    }
  | {
      k: "op_terminal";
      custody: OperationCustody;
    }
  | {
      k: "reread_once";
      after: "assert";
    }
  | {
      k: "counter";
    }
  | {
      k: "rehandshake";
      max: number;
      after: RefusalPolicy;
    }
  | {
      k: "bounded";
      max: number;
      floorMs: number;
      after: RefusalPolicy;
      redial: boolean;
    }
  | {
      k: "transient";
      max: number;
      redial: boolean;
    }
  | {
      k: "lost";
      max: number;
    };
export interface RefusalMetadata {
  reason: string;
  sub?: string;
  source: RefusalSource;
  scope: RefusalScope;
  words: string | null;
  surfaces: RefusalSurface;
}
export type RefusalClassification = RefusalPolicy & RefusalMetadata;
export interface RefusalReply {
  outcome?: unknown;
  verdict?: string;
  reason?: string;
  data?: unknown;
  code?: unknown;
  error?: unknown;
  detail?: unknown;
  retryAfterMs?: unknown;
  nextIndex?: unknown;
  why?: unknown;
  asked?: unknown;
  status?: number;
  hung?: boolean;
  reopens?: boolean;
  lost?: boolean;
  transient?: boolean;
  next_free?: unknown;
}
export interface RefusalContext {
  road: RefusalRoad;
  verb?: string;
  seated?: boolean;
  replayed?: boolean;
  kStart?: number;
  node?: string;
  lost?: boolean;
}
export interface ReasonMatch {
  row: ReasonRow;
  local: boolean;
  sub?: string;
  via?: string;
}
export interface RetryCounts {
  transient: number;
  lost: number;
  bounded: number;
  rehandshake: number;
}
export interface TransportRefusal {
  rep: RefusalReply;
  rowKey: string;
  relay?: string;
  http?: number;
}
export interface RefusalRequest extends RefusalContext {
  opId?: string;
  stream?: boolean;
  burst?: number;
  tries?: number;
  ops?: number;
  vis?: string;
  feedUp?: boolean;
  gap?: boolean;
}
export interface OperationBirth {
  g: string;
  cell?: boolean;
  cross?: boolean;
  kind?: number;
  drag?: string;
  sh?: string;
}
export interface BirthBook {
  get(key: string): OperationBirth | undefined;
  drop(key: string): void;
}
export interface WeatherConditions {
  online?: boolean;
  laneOpen?: boolean;
}
export interface RefusalObserverEnvironment {
  surface: string;
  page: string;
  feBuild?: string;
  supportCode?: string;
  session?: () => string | undefined;
  doorBuild?: () => string | undefined;
  now?: () => number;
  weather?: () => WeatherConditions | undefined;
  browser?: () => string | undefined;
  loweringShadow?: () => boolean;
  births?: BirthBook;
}
export interface WriteSample {
  why: string;
  component: string;
  gesture: string;
  ops: number;
  cell: boolean;
  cross: boolean;
  sh?: string;
}
export interface WriteSampler {
  take(
    birth: OperationBirth | undefined,
    operations: number | undefined,
    now: number,
  ): WriteSample | undefined;
}
export interface RefusalObserverOptions {
  cap?: number;
  sample?: {
    n?: number;
    cap?: number;
    changeMax?: number;
    changeHoldMs?: number;
  };
}
/** Telemetry intentionally accepts extensible, opaque event fields. */
export type TelemetryFields = Record<string, unknown>;
export interface RefusalEvent {
  name: string;
  key?: string;
  fields: TelemetryFields;
  wire?: {
    word: string;
    rowKey?: string;
  };
}
export type RefusalEventSink = (event: RefusalEvent) => void;
export interface RefusalObserverState {
  down: "unreached" | "signed_out" | "refusing" | null;
  trips: number;
  strikes: number;
  readsUnanswered: number;
  createFails: number;
  rows: number;
  page: PageTerminalFace | "live";
  nodesGone: number;
  emitted: number;
  weathered: number;
}
export interface RefusalObserver {
  threw(request: unknown, error: unknown): void;
  judged(
    request: unknown,
    reply: RefusalReply,
    action: unknown,
    context: RefusalRequest,
  ): void;
  state(): RefusalObserverState;
  close(): void;
}
