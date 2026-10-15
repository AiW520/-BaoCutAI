import type { TimerScheduler } from './common';

export type RowWhose = 'm' | 'o' | 'u';
export type EnvelopeRelation = 'named' | 'others' | 'none';
export type SessionEnd = 'ended' | 'timeout' | 'stopped' | 'failed' | 'written' | 'reset' | 'gone' | 'replied' | 'marked';
export type UntiedReason = 'queued_row' | 'elsewhere' | 'comment_row';
export type GoneRoad = 'q' | 'd';
export interface DiffItem {
  address?: {ref?: {object?: unknown; id?: unknown} | null} | null;
  after?: {body?: unknown; kind?: unknown; parent?: {object?: unknown; id?: unknown} | null} | null;
}
export interface DiffEnvelope { diff?: readonly (DiffItem | null | undefined)[] | null }
export interface SessionRun<Card, Handle, Kind> {
  card: Card; bid: string | null; kind: Kind | null; threadId: string | null;
  carrierP: Promise<string>; startedAt: number;
  repliedAt: number | null; overAt: number | null; othersAt: number | null; emptiedAt: number | null;
  whose: RowWhose | null; sure: boolean; delivered: boolean; takenBack: boolean;
  untied: UntiedReason | null; why: string | undefined;
  maxTimer: Handle | undefined; graceTimer: Handle | undefined;
  overTimer: Handle | undefined; othersTimer: Handle | undefined;
}
export interface DetachedRun<Card, Kind> {
  card: Card; bid: string | null; kind: Kind | null; threadId: string | null;
  carrierP: Promise<string>; how: 'stopped' | 'failed' | 'timeout' | 'ended';
  startedAt: number; delivered: boolean; takenBack: boolean;
  lateSaid: boolean; untiedSaid: boolean; why?: string;
}
export interface SessionMark<Card, Kind> { card: Card; bid: string; kind: Kind | null; threadId: string; startedAt: number }
export interface SessionDependencies<Card, Handle, Kind> extends TimerScheduler<Handle> {
  now(): number;
  carrier(card: Card): Promise<string>;
  resummon(card: Card, threadId: string): void;
  kindOf?(card: Card): Kind | null;
  queued?(threadId: string): boolean;
  ended(card: Card, reason: SessionEnd, threadId: string | null, delivered: boolean, sure: boolean): void;
  said?(reason: SessionEnd, threadId: string | null, elapsedMs: number, kind: Kind | null, untied: UntiedReason | undefined, ...whose: (RowWhose | GoneRoad)[]): void;
  saidLate?(threadId: string | null, elapsedMs: number, kind: Kind | null): void;
}
export interface SessionRuns<Card, Kind> {
  live(): Card | null; threadOf(card: Card): string | null; lineOf(): string | null;
  start(card: Card, bid: string | null): 'joined' | 'started';
  resume(card: Card): boolean;
  join(card: Card, bid: string | null, carrier: Promise<string>): boolean;
  lateAccepted(card: Card, bid: string | null, threadId: string): boolean;
  unfail(card: Card, threadId: string): boolean; retryable(card: Card): boolean; retry(this: SessionRuns<Card, Kind>, card: Card): boolean;
  lineIs(card: Card, bid: string): void;
  agentWrote(relation?: EnvelopeRelation, whose?: unknown): void;
  agentWroteElsewhere(): void; agentEmptiedLine(revision?: number): void; agentCommentedElsewhere(): void;
  lateHeard(card: Card): void; heardAfterStop(card: Card, extra?: unknown): boolean;
  delivered(threadId: string): void; spotGone(card: Card): void;
  threadSaid(threadId: string, word: string, details?: unknown): void;
  failedWhy(card: Card, threadId: string): string | undefined;
  forget(card: Card): void; stop(card: Card): void; reset(): void;
  mark(card: Card): SessionMark<Card, Kind> | null;
}
