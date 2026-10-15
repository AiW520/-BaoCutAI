export type Dispose = () => void;
export interface TimerScheduler<Handle = number> {
  setTimeout(callback: () => void, delayMs: number): Handle;
  clearTimeout(handle: Handle | undefined): void;
}
