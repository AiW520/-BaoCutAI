// @vitest-environment happy-dom
import { act, createElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import type { AssetRecord } from '@baocut/protocol';
import { RuntimeContext } from '../../runtime/context.tsx';
import type { RuntimeSession } from '../../runtime/session.ts';
import { useEditor } from '../../state/editor-store.ts';
import { useVideo, type OpenVideo } from '../../state/video-store.ts';
import { chapter, sequence, track, videoItem } from '../../testing/sequence-records.ts';
import { EditorContext, type EditorActions } from './editor-context.tsx';
import { TimelineChapters } from './timeline-chapters.tsx';

const seq = sequence([track('v', 'visual', 1)], [videoItem('clip', 'v', 0, 1800)], {
  markers: [chapter('intro', 0, 'Intro'), chapter('body', 600, 'Body')],
});
const assets = { asset_v: { id: 'asset_v', revisions: { '1': { video: { width: 1920, height: 1080 } } } } } as unknown as Record<string, AssetRecord>;
const seek = vi.fn();
const apply = vi.fn(async () => null);
const thumbnail = vi.fn(() => 'http://media/frame.jpg');
const runtime = { videos: { media: { thumbnail, subscribe: () => () => {}, version: () => 0 } } } as unknown as RuntimeSession;
const actions = { seek, apply, pause: vi.fn() } as unknown as EditorActions;
const initialEditor = useEditor.getState();
const initialVideo = useVideo.getState();
let container: HTMLDivElement;
let root: Root;
let band: HTMLDivElement;
let bar: HTMLDivElement;

async function mount(markers = seq.markers, editable = true) {
  useVideo.setState({ video: { status: editable ? 'ready' : 'stale', state: { video: { assets } } } as OpenVideo });
  await act(() => root.render(createElement(RuntimeContext.Provider, { value: runtime },
    createElement(EditorContext.Provider, { value: actions }, createElement(TimelineChapters, { sequence: { ...seq, markers } })))));
  band = container.firstElementChild as HTMLDivElement;
  bar = band.firstElementChild as HTMLDivElement;
  vi.spyOn(bar, 'getBoundingClientRect').mockReturnValue({ left: 100, width: 600 } as DOMRect);
}

async function pointer(type: string, x: number, target: EventTarget = bar, buttons = 0) {
  await act(() => target.dispatchEvent(new PointerEvent(type, { bubbles: true, clientX: x, button: 0, buttons })));
}
async function click(x: number, target: EventTarget = bar) {
  await act(() => target.dispatchEvent(new MouseEvent('click', { bubbles: true, clientX: x })));
}

beforeEach(() => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  vi.clearAllMocks();
  useEditor.setState({ playhead: 20, selection: ['clip'] });
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
});
afterEach(async () => {
  await act(() => root.unmount());
  container.remove();
  useEditor.setState(initialEditor, true);
  useVideo.setState(initialVideo, true);
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

it('seeks to the pointer within a chapter instead of its start, including the padded hit area and seams', async () => {
  await mount();
  await pointer('pointerdown', 450, bar, 1);
  expect(useEditor.getState().selection).toEqual([]);
  await click(450);
  expect(seek).toHaveBeenLastCalledWith(35);
  await click(300);
  expect(seek).toHaveBeenLastCalledWith(20);
  expect(container.querySelector(`[aria-label="Add chapter at playhead"]`)).toBeNull();
  expect(band.querySelector('button')).toBeNull();
});

it('previews the pointer frame and chapter, then clears the card on leaving the bar', async () => {
  await mount();
  await pointer('pointermove', 450);
  expect(container.textContent).toContain('Body');
  expect(container.textContent).toContain('00:35');
  expect(thumbnail).toHaveBeenLastCalledWith({ id: 'asset_v', revision: '1' }, 35);
  expect(container.querySelector('[style*="frame.jpg"]')).not.toBeNull();
  expect(seek).not.toHaveBeenCalled();
  await pointer('pointerout', 750);
  expect(container.querySelector('[style*="frame.jpg"]')).toBeNull();
});

it('keeps position seeking and preview available without chapters or editing permission', async () => {
  await mount([], false);
  await pointer('pointermove', 450);
  expect(thumbnail).toHaveBeenLastCalledWith({ id: 'asset_v', revision: '1' }, 35);
  await click(450);
  expect(seek).toHaveBeenLastCalledWith(35);
});

it('moves a chapter boundary without seeking when its resulting click bubbles', async () => {
  await mount();
  const edge = bar.querySelectorAll('[title]')[1]!;
  await pointer('pointerdown', 300, edge, 1);
  await pointer('pointermove', 350, window, 1);
  await pointer('pointerup', 350, window);
  await click(350);
  expect(apply).toHaveBeenCalledWith([expect.objectContaining({ type: 'upsertChapter', at: { unit: 'frames', value: 750 } })], expect.anything());
  expect(seek).not.toHaveBeenCalled();
});

it('offers only rename and remove for an existing chapter', async () => {
  await mount();
  await act(() => bar.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, clientX: 450 })));
  expect(Array.from(document.querySelectorAll('[role="menuitem"]')).map((item) => item.textContent)).toEqual(['改标题…', '删除这一章']);
});
