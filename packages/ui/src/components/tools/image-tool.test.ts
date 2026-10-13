// @vitest-environment happy-dom
import { act, createElement, type ReactNode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { fixtureView, imageModel } from '../../model/models-test-fixtures.ts';
import { BLANK_IMAGE } from '../../model/tools-image.ts';
import { useModels } from '../../state/models-store.ts';
import { useTools } from '../../state/tools-store.ts';
import { ImageTool } from './image-tool.tsx';

const { generateImage, submitFailed } = vi.hoisted(() => ({ generateImage: vi.fn(), submitFailed: vi.fn() }));
vi.mock('../../runtime/context.tsx', () => ({ useRuntime: () => ({ generateImage }) }));
vi.mock('./use-tool-status.ts', () => ({ useToolStatus: () => ({ saveDirectory: null }) }));
vi.mock('./use-tool-records.ts', () => ({
  useToolRecords: () => ({ ready: true, list: [], all: [], live: 0 }),
  useSubmitFailed: () => submitFailed,
}));
vi.mock('./video-tool-parts.tsx', () => ({ useRerun: () => {} }));
vi.mock('../media/image-lightbox.tsx', () => ({ ImageLightbox: () => null }));
vi.mock('./image-record.tsx', () => ({ ImageRecord: () => null }));
// Render the submit control while leaving unrelated layout and media views out of this regression.
vi.mock('./tool-parts.tsx', async (original) => ({
  ...await original<typeof import('./tool-parts.tsx')>(),
  ToolPage: ({ bar }: { bar: ReactNode }) => createElement('div', null, bar),
}));
vi.mock('@react-spectrum/s2', async (original) => ({
  ...await original<typeof import('@react-spectrum/s2')>(),
  Button: ({ children, onPress, isPending }: { children: ReactNode; onPress: () => void; isPending: boolean }) =>
    createElement('button', { onClick: onPress, disabled: isPending }, children),
  ToastQueue: { positive: vi.fn(), neutral: vi.fn() },
}));

let container: HTMLDivElement;
let root: Root;
const initialModels = useModels.getState();
const initialTools = useTools.getState();
const draft = {
  ...BLANK_IMAGE,
  prompt: 'A paper crane',
  refs: [{ entryId: 'image-entry', name: 'crane.png' }],
  model: 'openai/gpt-image-1',
  size: '1024x1024',
  seed: '42',
  advanced: true,
};

beforeEach(async () => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  generateImage.mockReset();
  submitFailed.mockReset();
  const capabilities = fixtureView();
  capabilities.generateImage.providers[0]!.models = [imageModel('gpt-image-1', {
    acceptsSeed: true,
    referenceImages: { max: 3, maxBytesEach: null, maxBytesTotal: null, edit: true },
  })];
  useModels.setState({ capabilities });
  useTools.setState({ image: draft });
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
  await act(() => root.render(createElement(ImageTool)));
});

afterEach(async () => {
  await act(() => root.unmount());
  container.remove();
  useModels.setState(initialModels, true);
  useTools.setState(initialTools, true);
  vi.unstubAllGlobals();
});

it('clears only prompt and attachments after submission succeeds, preserving the submitted request', async () => {
  let accepted!: () => void;
  generateImage.mockImplementation(() => new Promise<void>((resolve) => { accepted = resolve; }));
  await act(() => container.querySelector('button')!.click());
  expect(generateImage).toHaveBeenCalledWith(expect.objectContaining({
    prompt: draft.prompt,
    images: [{ entryId: 'image-entry' }],
    seed: 42,
  }));
  expect(useTools.getState().image).toEqual(draft);
  await act(() => accepted());
  expect(useTools.getState().image).toEqual({ ...draft, prompt: '', refs: [] });
});

it('keeps prompt and attachments when submission fails', async () => {
  const failure = new Error('Submission rejected');
  generateImage.mockRejectedValue(failure);
  await act(() => container.querySelector('button')!.click());
  expect(submitFailed).toHaveBeenCalledWith(failure);
  expect(useTools.getState().image).toEqual(draft);
});
