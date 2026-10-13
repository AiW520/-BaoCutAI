// @vitest-environment happy-dom
import { act, createElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CITATIONS_SCHEMA, getLocale, setLocale, type CitationsFile } from '@baocut/protocol';
import { CitedResult, type SectionActions } from './ai-tool-cites.tsx';
import { citedRows, foundRows, materialExclude } from './ai-tool-section.tsx';
import { EditorContext, type EditorActions } from './editor-context.tsx';

const file: CitationsFile = {
  schema: CITATIONS_SCHEMA,
  videoIds: ['v1'],
  effectiveMode: 'none',
  droppedCites: 0,
  paragraphs: [
    { index: 0, role: 'heading', markdown: '## Setup', inferred: false, cites: [] },
    {
      index: 1,
      role: 'body',
      markdown: 'We deploy on Kubernetes.',
      inferred: false,
      cites: [{ videoId: 'v1', documentId: 'doc', sentenceIds: ['s-w1'], clock: 'sequence', startSec: 12.5, endSec: 14, text: 'We deploy Kubernetes.' }],
    },
    { index: 2, role: 'body', markdown: 'It will win.', inferred: true, cites: [] },
  ],
};

let container: HTMLDivElement;
let root: Root;
const before = getLocale();

beforeEach(() => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  // 测试进程把 `BAOCUT_LOCALE` 定成中文：换语言要连它一起换。
  vi.stubEnv('BAOCUT_LOCALE', 'en');
  setLocale('en');
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(() => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  setLocale(before);
});

describe('带出处的写作结果', () => {
  it('每段末尾是时间码，点了跳到那一句；没有出处的段落标模型推断；标题不带', async () => {
    const actions = { seek: vi.fn() } as unknown as EditorActions;
    await act(() => root.render(createElement(EditorContext.Provider, { value: actions }, createElement(CitedResult, { file, videoId: 'v1', names: new Map() }))));
    expect(container.textContent).toContain('2 paragraphs · 1 with sources · 1 inferred by the model');
    expect(container.querySelector('h2')?.textContent).toBe('Setup');
    const chip = container.querySelector('[aria-label="Source 00:12"]') as HTMLElement;
    expect(chip).not.toBeNull();
    await act(async () => {
      chip.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
      chip.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
      chip.click();
    });
    expect(actions.seek).toHaveBeenCalledWith(12.5);
    expect(container.textContent).toContain('Model inference');
  });

  it('正文段有菜单（标题没有）：看出处列原句；重写、换材料交给页面；刚重写过的段标出来、能撤回', async () => {
    const actions = { seek: vi.fn() } as unknown as EditorActions;
    const section: SectionActions = { rewritten: { index: 1, span: 1 }, onRewrite: vi.fn(), onMaterial: vi.fn(), onUndo: vi.fn() };
    await act(() => root.render(createElement(EditorContext.Provider, { value: actions }, createElement(CitedResult, { file, videoId: 'v1', names: new Map(), section }))));
    const menus = [...container.querySelectorAll('[aria-label="This paragraph"]')] as HTMLElement[];
    expect(menus).toHaveLength(2);
    expect(container.textContent).toContain('Rewritten');
    const press = async (el: HTMLElement) =>
      act(async () => {
        el.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerType: 'mouse' }));
        el.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerType: 'mouse' }));
        el.click();
      });
    await press(menus[0]!);
    const items = () => [...document.querySelectorAll('[role="menuitem"]')].map((el) => el.textContent);
    expect(items()).toEqual(['Show sources', 'Rewrite this paragraph', 'Rewrite with other material…', 'Undo the rewrite']);
    await press([...document.querySelectorAll('[role="menuitem"]')].find((el) => el.textContent === 'Rewrite this paragraph') as HTMLElement);
    expect(section.onRewrite).toHaveBeenCalledWith(1);
    await press(menus[0]!);
    await press([...document.querySelectorAll('[role="menuitem"]')].find((el) => el.textContent === 'Show sources') as HTMLElement);
    expect(container.textContent).toContain('We deploy Kubernetes.');
    // 没给重写（不是从这里整篇跑出来的）：只能看出处。
    await act(() => root.render(createElement(EditorContext.Provider, { value: actions }, createElement(CitedResult, { file, videoId: 'v1', names: new Map() }))));
    await press(container.querySelector('[aria-label="This paragraph"]') as HTMLElement);
    expect(items()).toEqual(['Hide sources']);
  });
});

describe('换材料重写的候选', () => {
  it('原来的出处编号 cite:序号、默认勾上；找到的只列时间线上的；交回没勾的', () => {
    const rows = [
      ...citedRows(file.paragraphs[1]!),
      ...foundRows({
        effectiveMode: 'semantic',
        reason: null,
        coverage: { chapters: [], stale: false },
        chunks: [
          { chunkId: 'c1', videoId: 'v1', chapter: 'Intro', clock: 'sequence', start: 30, end: 32, text: 'Extra.' },
          { chunkId: 'c2', videoId: 'v1', chapter: null, clock: 'source', start: 1, end: 2, text: 'Off timeline.' },
        ],
      }),
    ];
    expect(rows.map((r) => r.id)).toEqual(['cite:0', 'c1']);
    expect(materialExclude(rows, new Set(['cite:0']))).toEqual(['c1']);
    expect(materialExclude(rows, new Set(['c1']))).toEqual(['cite:0']);
  });
});
