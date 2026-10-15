import type { TimerScheduler } from "../boot/lifecycle-contracts";

export type WritingVerdict = 'write' | 'handoff';
export interface SimulationKnobs {
  decide?: 'auto' | 'handoff' | 'write';
  firstWordsMs?: number;
  lines?: number;
  table?: boolean;
  fail?: boolean;
}
export interface SimulationParagraph { line: string; text: string }
export type WritingEvent =
  | { t: 'outline'; heading: string; lines: string[] }
  | { t: 'block'; kind: 'heading'; text: string; level?: number }
  | { t: 'block'; kind: 'paragraph'; text: string }
  | { t: 'block'; kind: 'row'; header: boolean; cells: string[] }
  | { t: 'error'; code: 'simulated' }
  | { t: 'done' };
export type WritingStage = 'grow' | 'in' | 'loop';
export interface WritingSprite { url: string; frames: number }
export interface VerdictSuccess { verdict: WritingVerdict; stray: boolean }
export interface VerdictFailure { failed: string }
export type VerdictResult = VerdictSuccess | VerdictFailure;
export type VerdictRunner = (prompt: string, options: {
  modelTier: 'quick'; cache: false; signal: AbortSignal;
}) => Promise<{ text?: string } | null>;
export interface VerdictTimers<Handle = number> extends TimerScheduler<Handle> { signal: AbortSignal }
export interface DecideRequest<Card = string> {
  card: Card; signal: AbortSignal; words: string;
  simulated: boolean; live: boolean | null;
}
export interface VerdictDesk<Card = string, Handle = number> {
  perView: number; minGapMs: number;
  state: { realAsks: number; lastRealAsk: number; closed: boolean };
  closeFor(card: Card, reason: string): void;
  deps: {
    now(): number;
    timers: TimerScheduler<Handle>;
    knobs(): SimulationKnobs | null | undefined;
    loadSim(): Promise<{
      SIM_VERDICT_MS: number;
      simulatedVerdict(knobs: SimulationKnobs, request: string): WritingVerdict;
    }>;
    onStrayVerdict?(card: Card): void;
  };
}
