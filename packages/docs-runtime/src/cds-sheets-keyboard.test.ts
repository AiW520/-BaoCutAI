import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  initializeSheetsKeyboardStep1,
  installSheetsCapture,
  resolveSheetsEnter,
  resolveSheetsIsComposing,
  resolveSheetsValue5,
} from './cds-sheets-keyboard';

beforeEach(() => {
  initializeSheetsKeyboardStep1();
  vi.stubGlobal('window', { navigator: { vendor: 'Apple Computer, Inc.' } });
});
afterEach(() => vi.unstubAllGlobals());

describe('sheet keyboard composition state', () => {
  it('shares the composition timestamp and remembers the consumed event', () => {
    resolveSheetsValue5(1_000);
    const enter = { key: 'Enter', timeStamp: 1_050 };
    resolveSheetsEnter(enter);
    expect(resolveSheetsIsComposing(enter)).toBe(true);
    expect(resolveSheetsIsComposing(enter)).toBe(true);
    expect(resolveSheetsIsComposing({ ...enter })).toBe(false);
  });

  it('clears stale composition state on another key or an explicit IME event', () => {
    resolveSheetsValue5(1_000);
    resolveSheetsEnter({ key: 'ArrowDown' });
    expect(resolveSheetsIsComposing({ timeStamp: 1_050 })).toBe(false);
    resolveSheetsValue5(1_000);
    expect(resolveSheetsIsComposing({ keyCode: 229 })).toBe(true);
    expect(resolveSheetsIsComposing({ timeStamp: 1_050 })).toBe(false);
    resolveSheetsValue5(1_000);
    expect(resolveSheetsIsComposing({ timeStamp: 1_050, ctrlKey: true })).toBe(false);
    expect(resolveSheetsIsComposing({ timeStamp: 1_050 })).toBe(false);
  });

  it('suppresses only the next matching paragraph input and removes listeners', () => {
    resolveSheetsValue5(1_000);
    const enter = { key: 'Enter', timeStamp: 1_050 };
    expect(resolveSheetsIsComposing(enter)).toBe(true);
    const listeners = new Map<string, (event: unknown) => void>();
    const target = {
      addEventListener: vi.fn((type, listener) => listeners.set(type, listener)),
      removeEventListener: vi.fn((type) => listeners.delete(type)),
    };
    const onParagraph = vi.fn();
    installSheetsCapture(enter, target, onParagraph);
    expect(listeners.size).toBe(5);
    listeners.get('keydown')!(enter);
    expect(listeners.size).toBe(5);
    const paragraph = {
      type: 'beforeinput',
      inputType: 'insertParagraph',
      preventDefault: vi.fn(),
    };
    listeners.get('beforeinput')!(paragraph);
    expect(paragraph.preventDefault).toHaveBeenCalledOnce();
    expect(onParagraph).toHaveBeenCalledOnce();
    expect(listeners.size).toBe(0);
    expect(target.removeEventListener).toHaveBeenCalledTimes(5);
  });
});
