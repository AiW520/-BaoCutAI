import { afterEach, expect, it, vi } from 'vitest';
import { setLocale } from '@baocut/protocol';
import { quitChoice, quitPrompt, updateChoice, updatePrompt } from './quit-prompt.ts';
import type { RemoteCall } from './runtime-supervisor.ts';

afterEach(() => {
  vi.unstubAllEnvs();
  setLocale('zh-Hans');
});

function english() {
  vi.stubEnv('BAOCUT_LOCALE', 'en');
  setLocale('en');
}

it('does not ask when its own Runtime has nothing running or cannot be asked', () => {
  expect(quitPrompt(null)).toBeNull();
  expect(quitPrompt({ jobs: 0, tasks: 0, remote: [] })).toBeNull();
  expect(updatePrompt(null)).toBeNull();
  expect(updatePrompt({ jobs: 0, tasks: 0, remote: [] })).toBeNull();
});

it('asks with running jobs and tasks counted together; Enter keeps them running, Esc cancels', () => {
  english();
  const options = quitPrompt({ jobs: 1, tasks: 2, remote: [] })!;
  expect(options).toMatchObject({
    message: '3 tasks are still running',
    buttons: ['Keep Running in Background', 'Stop and Quit', 'Cancel'],
    defaultId: 0,
    cancelId: 2,
  });
  expect(options.detail).not.toContain('billed');
  expect(quitPrompt({ jobs: 0, tasks: 1, remote: [] })!.message).toBe('1 task is still running');
  expect([0, 1, 2, 3, -1].map(quitChoice)).toEqual(['background', 'stop', 'cancel', 'cancel', 'cancel']);
});

it('lists calls already sent to a provider by step, task kind, or as an Agent task, and folds the rest', () => {
  english();
  const remote: RemoteCall[] = [
    { kind: 'pipeline-step', provider: 'Codex', step: { label: 'Translate subtitles' } },
    { kind: 'transcribe', provider: 'OpenAI' },
    { kind: null, provider: 'Claude' },
    { kind: 'export', provider: 'Google' },
    { kind: 'generateImage', provider: 'Google' },
    { kind: 'synthesizeSpeech', provider: 'ElevenLabs' },
    { kind: 'voiceClone', provider: 'ElevenLabs' },
  ];
  const detail = quitPrompt({ jobs: 3, tasks: 1, remote })!.detail!;
  expect(detail.split('\n\n')[1]!.split('\n')).toEqual([
    'Already sent out. Stopping won’t cancel these at the provider, and they may still be billed:',
    '• Translate subtitles · Codex',
    '• Transcribe · OpenAI',
    '• Agent task · Claude',
    '• Task · Google',
    '• Generate image · Google',
    'and 2 more',
  ]);
});

it('asks before restarting to update; Enter waits for the tasks, Esc cancels', () => {
  english();
  const options = updatePrompt({ jobs: 2, tasks: 0, remote: [{ kind: 'transcribe', provider: 'OpenAI' }] })!;
  expect(options).toMatchObject({
    message: '2 tasks are still running',
    buttons: ['Install When Finished', 'Stop and Install Now', 'Cancel'],
    defaultId: 0,
    cancelId: 2,
  });
  expect(options.detail).toContain('• Transcribe · OpenAI');
  expect([0, 1, 2, 3].map(updateChoice)).toEqual(['wait', 'now', 'cancel', 'cancel']);
});
