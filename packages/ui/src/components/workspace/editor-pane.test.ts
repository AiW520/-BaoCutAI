// @vitest-environment happy-dom
import { act, createElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import type { FileTarget } from '@baocut/protocol';
import { RuntimeContext } from '../../runtime/context.tsx';
import type { RuntimeSession } from '../../runtime/session.ts';
import { useConnection } from '../../state/connection-store.ts';
import { useShell } from '../../state/shell-store.ts';
import { EditorPane, type EditorOpened, type EditorPaneKind } from './editor-pane.tsx';

const open = vi.fn(async (): Promise<EditorOpened> => ({ url: 'about:blank', editorAvailable: true, title: 'Plan', count: null }));
const spec: EditorPaneKind = {
  kind: 'docs',
  icon: null,
  copy: {
    paneLabel: (name) => `Doc ${name}`,
    frameTitle: (name) => `Editor ${name}`,
    opening: 'Opening',
    unavailableTitle: 'Unavailable',
    unavailableBody: 'No editor',
    openFailed: (reason) => `Failed: ${reason}`,
  },
  open,
};
const target: FileTarget = { conversationId: 'conv_1', path: 'plan' };
const runtime = { host: { revealPath: vi.fn() } } as unknown as RuntimeSession;
const initialConnection = useConnection.getState();
let container: HTMLDivElement;
let root: Root;

async function render(active: boolean) {
  await act(() => root.render(createElement(RuntimeContext.Provider, { value: runtime }, createElement(EditorPane, { spec, target, conversationId: 'conv_1', active }))));
}
const frame = () => container.querySelector('iframe');

beforeEach(() => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  vi.clearAllMocks();
  useConnection.setState({ state: { status: 'connected', connectionId: 'c1' } as never });
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
});
afterEach(async () => {
  await act(() => root.unmount());
  container.remove();
  useConnection.setState(initialConnection, true);
  vi.unstubAllGlobals();
});

it('opens and loads a hidden tab only once it is first shown, then keeps it mounted when switched away', async () => {
  await render(false);
  expect(open).not.toHaveBeenCalled();
  expect(frame()).toBeNull();
  expect(container.textContent).not.toContain('Opening');
  // 头部照常显示（还没打开时标题取文件名）
  expect(container.querySelector('header strong')?.textContent).toBe('plan');

  await render(true);
  expect(open).toHaveBeenCalledTimes(1);
  expect(frame()?.getAttribute('title')).toBe('Editor Plan');

  await render(false);
  expect(open).toHaveBeenCalledTimes(1);
  expect(frame()).not.toBeNull();
});

it('opens a tab that is already shown when it mounts', async () => {
  await render(true);
  expect(open).toHaveBeenCalledTimes(1);
  expect(open).toHaveBeenCalledWith(runtime, target);
  expect(frame()).not.toBeNull();
});

it('reveals the conversation and focuses its composer when the editor asks for the chat', async () => {
  const initialShell = useShell.getState();
  const revealConversation = vi.fn();
  useShell.setState({ route: { tab: 'home', conversationId: 'conv_1', projectId: null }, revealConversation });
  const composer = document.createElement('div');
  composer.dataset.composer = 'conv_1';
  const input = document.createElement('div');
  input.setAttribute('role', 'textbox');
  input.tabIndex = 0;
  composer.append(input);
  document.body.append(composer);
  try {
    await render(true);
    await act(() => {
      window.dispatchEvent(new MessageEvent('message', { data: { type: 'editor:focus-chat' }, source: frame()!.contentWindow }));
    });
    await act(() => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())));
    expect(revealConversation).toHaveBeenCalledTimes(1);
    expect(document.activeElement).toBe(input);
  } finally {
    composer.remove();
    useShell.setState(initialShell, true);
  }
});
