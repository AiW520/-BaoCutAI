// @vitest-environment happy-dom
import { act, createElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { Provider } from '@react-spectrum/s2';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import type { DriverInfo } from '@baocut/protocol';
import { AgentPicker } from './agent-picker.tsx';

const driver = (id: string, name: string, extra: Partial<DriverInfo> = {}): DriverInfo => ({
  id, name, state: 'ready', enabled: true, source: 'custom', models: [],
  defaultModel: null, defaultEffort: null, configModel: null, account: null, ...extra,
}) as DriverInfo;
const codex = driver('codex', 'Codex');
const qwen = driver('qwen', 'Qwen Code');
const onChange = vi.fn();
let container: HTMLDivElement;
let root: Root;

async function press(el: Element) {
  await act(async () => {
    el.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerType: 'mouse' }));
    el.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerType: 'mouse' }));
    (el as HTMLElement).click();
  });
}

async function openModels(drivers = [codex, qwen], lockedTo: string | null = null) {
  await act(() => root.render(createElement(Provider, { locale: 'zh-CN', children: createElement(AgentPicker, {
    drivers, driverId: 'codex', model: null, effort: null, lockedTo, onChange,
  }) })));
  await press(container.querySelector('button')!);
  return [...document.querySelectorAll('[role="menuitem"]')].find((el) => el.textContent?.includes('Qwen Code'))!;
}

async function enter(el: Element) {
  await act(async () => {
    (el as HTMLElement).focus();
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    el.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowRight', bubbles: true }));
  });
}

beforeEach(() => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  onChange.mockClear();
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(() => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});

it.each(['mouse', 'keyboard'])('selects another Agent with no model list using %s', async (input) => {
  await enter(await openModels());
  const option = document.querySelector('[role="menuitemradio"]')!;
  expect(option?.textContent).toContain('Agent 默认模型');
  expect(option.getAttribute('aria-checked')).toBe('false');
  if (input === 'mouse') await press(option);
  else await act(async () => {
    (option as HTMLElement).focus();
    option.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    option.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', bubbles: true }));
  });
  expect(onChange).toHaveBeenCalledExactlyOnceWith({ driverId: 'qwen', model: null, effort: null });
});

it('selects another Agent whose recommended model matches the submenu initial value', async () => {
  const qwenWithModel = driver('qwen', 'Qwen Code', {
    defaultModel: 'qwen-coder',
    models: [{ id: 'qwen-coder', label: 'Qwen Coder', description: null, tier: 'balanced', isDefault: true, efforts: [], defaultEffort: null }],
  });
  await enter(await openModels([codex, qwenWithModel]));
  const option = [...document.querySelectorAll('[role="menuitemradio"]')].find((el) => el.textContent?.includes('Qwen Coder'))!;
  expect(option.getAttribute('aria-checked')).toBe('false');
  await press(option);
  expect(onChange).toHaveBeenCalledExactlyOnceWith({ driverId: 'qwen', model: 'qwen-coder', effort: null });
});

it('keeps other Agents disabled after a conversation has started', async () => {
  const other = await openModels([codex, qwen], 'codex');
  expect(other.getAttribute('aria-disabled')).toBe('true');
  await press(other);
  expect(onChange).not.toHaveBeenCalled();
});

it('still changes effort for the selected Agent while keeping its model choice', async () => {
  const current = driver('codex', 'Codex', {
    configModel: 'coder',
    models: [{ id: 'coder', label: 'Coder', description: null, tier: null, isDefault: true,
      efforts: [{ id: 'low', label: 'Low' }, { id: 'high', label: 'High' }], defaultEffort: 'low' }],
  });
  await openModels([current, qwen]);
  await enter([...document.querySelectorAll('[role="menuitem"]')].find((el) => el.textContent?.includes('Codex'))!);
  const high = [...document.querySelectorAll('[role="menuitemradio"]')].find((el) => el.textContent?.startsWith('高'))!;
  await press(high);
  expect(onChange).toHaveBeenCalledExactlyOnceWith({ driverId: 'codex', model: null, effort: 'high' });
});
