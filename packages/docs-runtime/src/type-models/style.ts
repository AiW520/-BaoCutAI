import type { JsonValue } from './common';

export type StyleRecord = Readonly<Record<string, JsonValue>>;
export type StyleChange = Readonly<Record<string, JsonValue | undefined>>;
export type StylePatch =
  | { op: 'set'; path: ['display'] | ['display', string]; value: JsonValue }
  | { op: 'delete'; path: ['display'] | ['display', string] };
export type StyleWriteResult = 'allowed' | 'refused' | 'notSent' | 'left' | 'superseded';
export type StyleFailure = Extract<StyleWriteResult, 'refused' | 'notSent'>;
export type StyleReply = { verdict: 'allow' } | { verdict: 'deny'; reason?: string; data?: unknown };
export interface StyleRoad {
  pid: string;
  post?: (operations: StylePatch[]) => Promise<StyleReply | undefined>;
  latestStyle(): StyleRecord | null | undefined;
  styleReads(): number;
  onWritten(): boolean | Promise<boolean>;
}
export interface StyleWrite { change: StyleChange; road(): StyleRoad }
export type VisitGeneration = number;
export interface StyleJob { w: StyleWrite; visit: VisitGeneration; settle(result: StyleWriteResult): void }
export interface StyleChain {
  tail: Promise<void>;
  waiting: StyleJob[];
  out: StyleJob | null;
  unread: { wrote: StyleRecord; reads: number; visit: VisitGeneration } | null;
}
export type TabsPlacement = 'left' | 'default';
