// @vitest-environment happy-dom
import { act, createElement, useState } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TaskDetailBoundary } from './task-detail-boundary.tsx';

let container: HTMLDivElement;
let root: Root;
let fail: boolean;
let renders: number;
const failure = new TypeError('TaskSource rendering failed');

function Detail() {
  renders++;
  if (fail) throw failure;
  return createElement('p', null, 'Task details');
}

function Page({ taskId }: { taskId: string }) {
  return createElement('main', null,
    createElement('nav', null, 'Home'),
    createElement(TaskDetailBoundary, { key: taskId, fallback: createElement('p', null, 'Unavailable'), children: createElement(Detail) }),
  );
}

beforeEach(() => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  vi.spyOn(console, 'error').mockImplementation(() => {});
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
  fail = true;
  renders = 0;
});

afterEach(async () => {
  await act(() => root.unmount());
  container.remove();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('task detail error isolation', () => {
  it('replaces a throwing detail with the fallback while preserving navigation', async () => {
    await act(() => root.render(createElement(Page, { taskId: 'music' })));
    expect(container.querySelector('nav')?.textContent).toBe('Home');
    expect(container.textContent).toContain('Unavailable');
    expect(console.error).toHaveBeenCalledWith('Task detail rendering failed', failure, expect.any(String));
  });

  it('does not keep attempting a broken task when the same page updates', async () => {
    await act(() => root.render(createElement(Page, { taskId: 'music' })));
    const attempts = renders;
    await act(() => root.render(createElement(Page, { taskId: 'music' })));
    expect(renders).toBe(attempts);
    expect(container.textContent).toContain('Unavailable');
  });

  it('renders a different task normally after a failure', async () => {
    await act(() => root.render(createElement(Page, { taskId: 'music' })));
    fail = false;
    await act(() => root.render(createElement(Page, { taskId: 'other' })));
    expect(container.textContent).toContain('Task details');
    expect(container.textContent).not.toContain('Unavailable');
  });

  it('tries the same task again after returning to the list and reopening it', async () => {
    await act(() => root.render(createElement(Page, { taskId: 'music' })));
    await act(() => root.render(createElement('main', null, 'Task list')));
    fail = false;
    await act(() => root.render(createElement(Page, { taskId: 'music' })));
    expect(container.textContent).toContain('Task details');
  });

  it('also catches a failure during hook initialization', async () => {
    function BrokenHook() {
      useState(() => { throw failure; });
      return null;
    }
    await act(() => root.render(createElement(TaskDetailBoundary, { fallback: 'Unavailable', children: createElement(BrokenHook) })));
    expect(container.textContent).toBe('Unavailable');
  });
});
