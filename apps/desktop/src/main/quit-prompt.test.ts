import { afterEach, expect, it, vi } from 'vitest';
import { setLocale } from '@baocut/protocol';
import { quitChoice, quitPrompt } from './quit-prompt.ts';

afterEach(() => {
  vi.unstubAllEnvs();
  setLocale('zh-Hans');
});

it('does not ask when its own Runtime has nothing running or cannot be asked', () => {
  expect(quitPrompt(null)).toBeNull();
  expect(quitPrompt({ jobs: 0, tasks: 0 })).toBeNull();
});

it('asks with running jobs and tasks counted together; Enter keeps them running, Esc cancels', () => {
  vi.stubEnv('BAOCUT_LOCALE', 'en');
  setLocale('en');
  const options = quitPrompt({ jobs: 1, tasks: 2 })!;
  expect(options).toMatchObject({
    message: '3 tasks are still running',
    buttons: ['Keep Running in Background', 'Stop and Quit', 'Cancel'],
    defaultId: 0,
    cancelId: 2,
  });
  expect(quitPrompt({ jobs: 0, tasks: 1 })!.message).toBe('1 task is still running');
  expect([0, 1, 2, 3, -1].map(quitChoice)).toEqual(['background', 'stop', 'cancel', 'cancel', 'cancel']);
});
