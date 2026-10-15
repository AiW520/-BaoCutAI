import type { TimerScheduler } from "../../boot/lifecycle-contracts";
import type { UnknownRecord } from "../../serialization/value-contracts";
import type { ResolvedPos } from "prosemirror-model";

export interface CutResult {
  $cut: ResolvedPos | null;
  leavesList: boolean;
  walled: boolean;
}
export interface RoutineConsent {
  consentLive?: boolean;
  scheduleApproved?: boolean;
  declaresParams?: boolean;
}
export interface RoutineRunStatus {
  status: "pending" | "staged";
  params?: unknown;
}
export interface RetryStreak {
  first: number;
  n: number;
}
export interface RetryAttempt {
  streak: RetryStreak;
  delayMs: number;
  giveUp: boolean;
}
export interface RetryClock<Handle> extends TimerScheduler<Handle> {
  now(): number;
  random(): number;
}
export interface RetryScheduler<Key> {
  shed(
    key: Key,
    retry: () => void,
    minimumDelay?: number,
  ): "retrying" | "gave-up";
  settle(key: Key): void;
  dispose(): void;
  pending(): number;
}
export interface RunPool {
  run<Result>(
    work: () => Result | PromiseLike<Result>,
  ): Promise<Awaited<Result>>;
  inFlight(): number;
  waiting(): number;
}
export type RoutineMechanism = "toolCall" | "prompt" | "code";
export type NodeReader = (reference: {
  object: "node";
  id: string;
}) => UnknownRecord | null | undefined;
export interface HistoryVersion {
  readonly unsaved?: boolean;
}
