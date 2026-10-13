// @vitest-environment happy-dom
import { act, createElement, useRef, type RefObject } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { useVisibleLane } from './use-visible-lane.ts';

let container: HTMLDivElement;
let root: Root;
const observers: Array<{ callback: ResizeObserverCallback; element?: Element; disconnect: () => void }> = [];

function Cues({ scrollRef }: { scrollRef: RefObject<HTMLDivElement | null> }) {
  const range = useVisibleLane(scrollRef, 100);
  return createElement('span', { 'data-cues': true }, `${range.left}:${range.right}`);
}
function Timeline({ showCues = true }: { showCues?: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const range = useVisibleLane(scrollRef, 100);
  return createElement('div', { ref: scrollRef, 'data-scroller': true },
    createElement('span', { 'data-parent': true }, `${range.left}:${range.right}`),
    showCues ? createElement(Cues, { scrollRef }) : null);
}

beforeEach(() => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  observers.length = 0;
  vi.stubGlobal('ResizeObserver', class {
    entry: typeof observers[number];
    constructor(callback: ResizeObserverCallback) {
      this.entry = { callback, disconnect: vi.fn() };
      observers.push(this.entry);
    }
    observe(element: Element) { this.entry.element = element; }
    disconnect() { this.entry.disconnect(); }
  });
  vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(700);
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
});
afterEach(async () => {
  await act(() => root.unmount());
  container.remove();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

it('subscribes descendants mounted before the scroller ref is assigned, so seeking and playback paging update their range', async () => {
  await act(() => root.render(createElement(Timeline)));
  const scroller = container.querySelector('[data-scroller]')!;
  await act(() => { scroller.scrollLeft = 10000; scroller.dispatchEvent(new Event('scroll')); });
  expect(container.querySelector('[data-parent]')!.textContent).toBe('9216:11264');
  expect(container.querySelector('[data-cues]')!.textContent).toBe('9216:11264');
  expect(observers).toHaveLength(1);
});

it('shares resize updates with initially mounted descendants and disposes after the last subscriber unmounts', async () => {
  await act(() => root.render(createElement(Timeline)));
  const scroller = container.querySelector('[data-scroller]')!;
  scroller.scrollLeft = 8000;
  await act(() => observers[0]!.callback([], {} as ResizeObserver));
  expect(container.querySelector('[data-cues]')!.textContent).toBe(container.querySelector('[data-parent]')!.textContent);
  await act(() => root.render(createElement(Timeline, { showCues: false })));
  expect(observers[0]!.disconnect).not.toHaveBeenCalled();
  await act(() => root.render(null));
  expect(observers[0]!.disconnect).toHaveBeenCalledOnce();
});

it('starts newly mounted cue layers at an already scrolled viewport', async () => {
  await act(() => root.render(createElement(Timeline, { showCues: false })));
  const scroller = container.querySelector('[data-scroller]')!;
  await act(() => { scroller.scrollLeft = 10000; scroller.dispatchEvent(new Event('scroll')); });
  await act(() => root.render(createElement(Timeline)));
  expect(container.querySelector('[data-cues]')!.textContent).toBe('9216:11264');
});
