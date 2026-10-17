import { expect, it, vi } from 'vitest';
import type { LegacyImportEvent, LegacyImportSnapshot } from '@baocut/protocol';
import { RuntimeSession } from './session.ts';

it('keeps settings recovery through project events and replaces it on a reconnect snapshot', () => {
  let listener!: { snapshot(value: LegacyImportSnapshot): void; event(value: LegacyImportEvent): void };
  const unsubscribe = vi.fn();
  const client = { subscribeLegacyImport: vi.fn((callbacks: typeof listener) => { listener = callbacks; return unsubscribe; }) };
  const onChange = vi.fn();
  const stop = RuntimeSession.prototype.watchLegacyImport.call({ client } as unknown as RuntimeSession, onChange);
  const settingsReport = { reportId: 'report', fields: ['transcribe.sourceLang' as const], modelsDirectory: null };
  listener.snapshot({ prompt: null, run: null, settingsReport });
  listener.event({ type: 'prompt.updated', prompt: null });
  listener.event({ type: 'run.updated', run: null });
  expect(onChange.mock.calls.map(([snapshot]) => snapshot)).toEqual([
    { prompt: null, run: null, settingsReport },
    { prompt: null, run: null, settingsReport },
    { prompt: null, run: null, settingsReport },
  ]);
  listener.snapshot({ prompt: null, run: null });
  expect(onChange).toHaveBeenLastCalledWith({ prompt: null, run: null });
  stop();
  expect(unsubscribe).toHaveBeenCalledOnce();
});

it('sends skipProjectBrand only when the brand token was dismissed', async () => {
  const request = vi.fn(async () => ({ taskId: 't' }));
  const send = RuntimeSession.prototype.send.bind({ client: { request } } as unknown as RuntimeSession);
  await send('c', 'hi');
  await send('c', 'hi', undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, { skipProjectBrand: true });
  const params = request.mock.calls.map((call) => (call as unknown as [string, Record<string, unknown>])[1]);
  expect(params[0]).not.toHaveProperty('skipProjectBrand');
  expect(params[1]).toMatchObject({ conversationId: 'c', skipProjectBrand: true });
});
