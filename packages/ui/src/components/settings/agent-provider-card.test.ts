// @vitest-environment happy-dom
import { act, createElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { Provider } from '@react-spectrum/s2';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import type { DriverInfo } from '@baocut/protocol';
import { RuntimeContext } from '../../runtime/context.tsx';
import type { RuntimeSession } from '../../runtime/session.ts';
import { useConnection } from '../../state/connection-store.ts';
import { AgentProviderCard } from './agent-provider-card.tsx';

const qwen: DriverInfo = {
  id: 'qwen-code', name: 'Qwen Code', command: 'qwen', state: 'ready', status: 'available',
  enabled: true, isDefault: false, source: 'custom', custom: { command: ['qwen', '--acp'], envKeys: [], addedAt: '2026-10-15T00:00:00Z' },
  version: null, minVersion: '', latestVersion: null, detail: null, unavailableReason: null,
  models: [], configModel: null, configModelKnown: null, defaultModel: null, defaultEffort: null,
  executable: '/usr/local/bin/qwen', realExecutable: null, executableOverride: null,
  account: null, plan: '', loginCommand: 'qwen', install: [], tested: false, verified: true,
  checkedAt: '2026-10-15T00:00:00Z',
  capabilities: { approvals: true, images: true, resume: true, steer: false },
};
const initial = useConnection.getState();
const request = vi.fn(async () => ({ drivers: [{ ...qwen, isDefault: true }], checking: [], preferences: initial.agentPreferences! }));
let root: Root;
let container: HTMLDivElement;

async function render(platform = 'darwin', connected = true, patch: Partial<DriverInfo> = {}) {
  useConnection.setState({ drivers: [{ ...qwen, ...patch }] });
  const runtime = { host: { platform }, client: { request } } as unknown as RuntimeSession;
  function Page() {
    const driver = useConnection((s) => s.drivers![0]!);
    return createElement(AgentProviderCard, { driver, open: false, onToggle: vi.fn(), connected });
  }
  await act(() => root.render(createElement(Provider, { locale: 'zh-CN', children:
    createElement(RuntimeContext.Provider, { value: runtime }, createElement(Page)),
  })));
}
const makeDefault = () => [...container.querySelectorAll('button')].find((el) => el.textContent === '设为默认');

beforeEach(() => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  request.mockClear();
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
});
afterEach(async () => {
  await act(() => root.unmount());
  container.remove();
  useConnection.setState(initial, true);
  vi.unstubAllGlobals();
});

it.each(['custom', 'builtin'] as const)('makes a ready %s Agent with no model list default without opening details', async (source) => {
  await render('darwin', true, { source });
  expect(container.querySelector('[id="agent-detail-qwen-code"]')).toBeNull();
  expect(makeDefault()).toBeDefined();
  await act(async () => makeDefault()!.click());
  expect(request).toHaveBeenCalledExactlyOnceWith('agents.setDefault', { driverId: 'qwen-code' });
  expect(useConnection.getState().drivers![0]!.isDefault).toBe(true);
  expect(makeDefault()).toBeUndefined();
});

it.each([['web', true], ['darwin', false]] as const)('keeps the action disabled on %s when connected=%s', async (platform, connected) => {
  await render(platform, connected);
  expect(makeDefault()?.disabled).toBe(true);
  await act(() => makeDefault()!.click());
  expect(request).not.toHaveBeenCalled();
});

it('does not offer unavailable or already-default Agents as a new default', async () => {
  await render('darwin', true, { state: 'signed-out' });
  expect(makeDefault()).toBeUndefined();
  await render('darwin', true, { isDefault: true });
  expect(makeDefault()).toBeUndefined();
});
