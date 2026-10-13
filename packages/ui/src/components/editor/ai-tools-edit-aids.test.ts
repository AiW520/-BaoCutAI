// @vitest-environment happy-dom
import { act, createElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { GlossaryCandidatesResult } from '@baocut/protocol';
import { RuntimeContext } from '../../runtime/context.tsx';
import type { RuntimeSession } from '../../runtime/session.ts';
import { useSettings } from '../../state/settings-store.ts';
import { PolishTermCandidates } from './ai-tools-edit-aids.tsx';
import { EditorContext, type EditorActions } from './editor-context.tsx';

const empty: GlossaryCandidatesResult = { documentId: 'doc1', effectiveMode: 'semantic', reason: null, glossaries: 1, candidates: [], discovered: [] };

let container: HTMLDivElement;
let root: Root;
let request: ReturnType<typeof vi.fn>;
const glossaryCalls = () => request.mock.calls.filter(([method]) => method === 'edits.glossaryCandidates');

function mount(on: boolean) {
  const runtime = { client: { request }, host: { platform: 'electron' } } as unknown as RuntimeSession;
  const actions = { seek: vi.fn(), apply: vi.fn(), undo: vi.fn() } as unknown as EditorActions;
  return act(() =>
    root.render(
      createElement(
        RuntimeContext.Provider,
        { value: runtime },
        createElement(EditorContext.Provider, { value: actions }, createElement(PolishTermCandidates, { videoId: 'v1', documentId: 'doc1', on })),
      ),
    ),
  );
}

function setting(value: boolean) {
  useSettings.setState({ snapshot: { settings: { 'semantic.glossaryCandidates': value } } as never });
}

beforeEach(() => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
  // 只认术语候选；语义状态等别的请求一直不回（这里只看术语候选发没发）。
  request = vi.fn((method: string) => (method === 'edits.glossaryCandidates' ? Promise.resolve(empty) : new Promise(() => {})));
});

afterEach(async () => {
  await act(() => root.unmount());
  container.remove();
  useSettings.setState({ snapshot: null });
  vi.unstubAllGlobals();
});

describe('润色的术语候选受设置开关管', () => {
  it('设置 › 语义索引里关掉术语候选时一个请求都不发', async () => {
    setting(false);
    await mount(true);
    expect(glossaryCalls()).toEqual([]);
    expect(container.textContent).toBe('');
  });

  it('勾选项不勾时也不发', async () => {
    setting(true);
    await mount(false);
    expect(glossaryCalls()).toEqual([]);
  });

  it('开着、勾着时按视频与转写查一次', async () => {
    setting(true);
    await mount(true);
    expect(glossaryCalls()).toEqual([['edits.glossaryCandidates', { videoId: 'v1', documentId: 'doc1' }]]);
  });
});
