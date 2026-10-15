import type { Dispose, TimerScheduler } from './common';

export type FeedbackChoice = 'by_hand' | 'not_sure' | 'looking' | 'usage' | 'other';
export type CloseCause = 'release' | 'typing' | 'press' | 'page' | 'escape';
export type CloseVerdict = 'hold' | 'release' | 'close' | 'ask';
export interface CloseState {
  asking: boolean; by: CloseCause; sinceUpMs: number;
  counted?: boolean; held?: boolean; docked?: boolean; onSheet?: boolean;
}
export interface KeysDueState { asking: boolean; picked: boolean; leaving?: boolean; sinceUpMs: number }
export type FocusPosition = 'card' | 'none' | 'other';
export interface PageEvent {
  type: 'mousedown' | 'keydown'; trusted: boolean;
  settled: boolean; onCard: boolean; focus: FocusPosition;
  key?: string; chord?: boolean; composing?: boolean; defaultPrevented?: boolean;
}
export interface PageDecision { dismiss: boolean; claim: boolean; toText: boolean }
export type ChipPosition = 'away' | 'group' | 'own' | 'entered' | 'typed';
export interface ChipRest { readonly since: number; readonly held: { key: string; code: string } | null }
export type ChipEvent =
  | { type: 'press'; pointer: boolean; stamp: number }
  | { type: 'key'; key: string; code: string; stamp: number; at: number; count: number;
      repeat: boolean; chord: boolean; composing: boolean; shift: boolean; alt: boolean };
export interface TypedChipResult {
  state: 'typed'; spent: true; typed: true;
  rest: ChipRest; hold: string | null; leaves?: never;
}
export interface UntypedChipResult {
  state: ChipPosition; spent: boolean; typed: false;
  rest: ChipRest; hold: string | null; leaves?: 'up' | 'down';
}
export type ChipStepResult = TypedChipResult | UntypedChipResult;
export interface FeedbackOffer<Card = string> { readonly nonce: Card; readonly picked: FeedbackChoice | null; readonly thanks?: true }
export type StorageStatus = 'asked' | 'not_asked' | 'unavailable';
export type FeedbackStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
export type StorageReader = () => FeedbackStorage | null | undefined;
export type RemoteSeen = 'seen' | 'unseen' | 'unknown';
export interface FeedbackDependencies<Card = string, Handle = number> extends TimerScheduler<Handle> {
  now(): number; idleMs?: number | null;
  storage: StorageReader; offered(): boolean;
  show(offer: FeedbackOffer<Card> | null): void;
  say(event: FeedbackChoice | 'shown'): void;
  release(card: Card): void;
  keep?(): void; keysOff?(card: Card): void; thank?(text: string): void;
  split?(location: 'host' | 'both' | 'local' | 'fresh' | 'blind'): void;
  remoteStrict?(): boolean; remoteSeen?(): RemoteSeen;
}
export interface FeedbackController<Card = string> {
  closedEmpty(card: Card): boolean;
  heard(): void; pick(choice: FeedbackChoice): void; ending(card: Card): void;
  cardGone(card?: Card): void; reset(): void; current(): FeedbackOffer<Card> | null;
}
export interface FeedbackLeaveDependencies<Card = string, Handle = number> extends TimerScheduler<Handle> {
  easeMs(card: Card): number; mark(card: Card, leaving: boolean): void;
  cancel(card: Card): void; fold(card: Card): void; focusInCard(card: Card): boolean; toText(): void;
}
export interface FeedbackLeaveController<Card = string> {
  leave(card: Card): void; stay(card: Card): void; reset(): void; going(): Card | null;
}
export interface KeyReport<Card = string> {
  doc: Document; frame: HTMLIFrameElement | null;
  nonce: Card; granted: Card | null; up: FeedbackOffer<Card> | null;
  leaving: boolean; sinceUpMs: number; spend(card: Card): void;
}
export interface FeedbackKeyDependencies<Card = string, Handle = number> extends TimerScheduler<Handle> {
  doc(): Document; frame(): HTMLIFrameElement | null; up(): FeedbackOffer<Card> | null;
  leaving(card: Card): boolean; sinceUpMs(): number; now(): number;
  post(card: Card, held: boolean, code?: string): void;
  heard(): void; toText(): void; typing(): void;
}
export interface FeedbackKeyController<Card = string> {
  watch(card: Card): Dispose; revoke(card: Card): void; backInText(): void;
  reported(card: Card): boolean; chip(event: ChipEvent): boolean;
  chips(): ChipPosition; rest(): ChipRest; granted(): Card | null;
}
export interface PageWatchCallbacks { close(reason: 'escape' | 'press'): void; toText(): void }
export type PageWatchHost = Pick<Window, 'document' | 'performance' | 'addEventListener' | 'removeEventListener'>;
export type PageInteraction = KeyboardEvent | (MouseEvent & Partial<Pick<KeyboardEvent, 'key' | 'metaKey' | 'ctrlKey' | 'isComposing'>>);
export interface OfferedState { served: boolean; marks: boolean; viewerId?: unknown; outside: boolean }

export type ClosestTarget = EventTarget & Partial<Pick<Element, 'closest'>>;
