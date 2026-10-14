// @vitest-environment happy-dom
import fs from 'node:fs';
import path from 'node:path';
import { act, createElement, useState } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { Provider } from '@react-spectrum/s2';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import type { TemplateManifest } from '@baocut/protocol';
import { homeTemplateOf } from '../../model/home-templates.ts';
import { useTemplateCatalog } from '../../state/template-catalog-store.ts';
import { TemplateLibrary } from './template-library.tsx';

// Keep the real dialog and browsing controls; isolate Runtime reads and media.
vi.mock('./use-templates.ts', () => ({
  useTemplateCatalogLoader: () => useTemplateCatalog(),
  useTemplatePrompt: () => ({ state: 'ready', text: 'Template prompt', retry() {} }),
  useTemplateFileUrl: () => ({ url: null, failed: false, fail() {} }),
}));

const templates = ['promo-ad', 'white-ui-launch'].map((id) => homeTemplateOf({
  manifest: JSON.parse(fs.readFileSync(path.resolve(import.meta.dirname, '../../../../..', 'templates', id, 'template.json'), 'utf8')) as TemplateManifest,
  origin: 'builtin', languages: ['zh-CN'], files: { cover: false, preview: false, assets: 0 },
}));
const onUse = vi.fn();
const initialCatalog = useTemplateCatalog.getState();
let container: HTMLDivElement;
let root: Root;

function Page() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState('My existing prompt');
  const [picked, setPicked] = useState(templates[0]!.id);
  return createElement(Provider, { locale: 'en-US', children: [
    createElement('input', { key: 'prompt', 'aria-label': 'Draft', value: prompt, onChange: (e) => setPrompt(e.currentTarget.value) }),
    createElement('output', { key: 'picked' }, picked),
    createElement('button', { key: 'open', onClick: () => setOpen(true) }, 'Browse'),
    createElement(TemplateLibrary, { key: 'library', open, picked, onUse: (template) => {
      onUse(template);
      setPicked(template.id);
      setPrompt('Template prompt');
      setOpen(false);
    }, onClose: () => setOpen(false) }),
  ] });
}

beforeEach(async () => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  onUse.mockClear();
  useTemplateCatalog.setState({ loaded: true, status: 'ready', templates, diagnostics: [] });
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
  await act(() => root.render(createElement(Page)));
  await act(() => container.querySelector('button')!.click());
});

afterEach(async () => {
  await act(() => root.unmount());
  container.remove();
  useTemplateCatalog.setState(initialCatalog, true);
  vi.unstubAllGlobals();
});

it.each(['button', 'Escape', 'backdrop'] as const)('dismisses with %s without applying a browsed template', async (method) => {
  const dialog = document.querySelector('[role="dialog"]')!;
  expect(dialog).not.toBeNull();
  const cards = dialog.querySelectorAll<HTMLButtonElement>('button[aria-pressed]');
  await act(() => cards[cards.length - 1]!.click());
  const close = dialog.querySelector<HTMLButtonElement>('button[aria-label="Dismiss"]');
  expect(close).not.toBeNull();
  await act(() => {
    if (method === 'button') close!.click();
    else if (method === 'Escape') dialog.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    else {
      const overlay = dialog.parentElement!.parentElement!.parentElement!;
      overlay.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, button: 0, pointerId: 1 }));
      overlay.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, button: 0, pointerId: 1 }));
      overlay.click();
    }
  });
  expect(document.querySelector('[role="dialog"]')).toBeNull();
  expect(onUse).not.toHaveBeenCalled();
  expect(container.querySelector('input')!.value).toBe('My existing prompt');
  expect(container.querySelector('output')!.textContent).toBe(templates[0]!.id);
});
