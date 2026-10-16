import { describe, expect, it, vi } from 'vitest';
import type { UpdateChoice } from './quit-prompt.ts';
import type { ActiveWork } from './runtime-supervisor.ts';
import { createInstallGate } from './update-install-gate.ts';

const busy = (jobs: number): ActiveWork => ({ jobs, tasks: 0, remote: [] });

function setup(options: { work?: (ActiveWork | null)[]; choice?: UpdateChoice; willRestart?: boolean } = {}) {
  const work = [...(options.work ?? [busy(0)])];
  const state = { ready: true, quitting: false };
  const timers: (() => void)[] = [];
  const ask = vi.fn(async () => options.choice ?? 'cancel');
  const install = vi.fn(async () => {});
  const gate = createInstallGate({
    // The last answer repeats once the list runs out.
    activeWork: async () => (work.length > 1 ? work.shift()! : work[0]!),
    ask,
    ready: () => state.ready,
    quitting: () => state.quitting,
    schedule: (run) => {
      timers.push(run);
      return () => timers.splice(timers.indexOf(run), 1);
    },
  });
  const request = { install, willRestart: async () => options.willRestart ?? true };
  /** Fire the scheduled check and let it finish asking. */
  const tick = async () => {
    timers.shift()?.();
    await new Promise((resolve) => setImmediate(resolve));
  };
  return { gate, request, ask, install, state, timers, tick };
}

describe('restart-to-update gate', () => {
  it('installs without asking when nothing runs, the Runtime is not its own, or the install will not quit the app', async () => {
    for (const options of [{ work: [busy(0)] }, { work: [null] }, { work: [busy(2)], willRestart: false }]) {
      const { gate, request, ask, install } = setup(options);
      await gate.request(request);
      expect(ask).not.toHaveBeenCalled();
      expect(install).toHaveBeenCalledTimes(1);
    }
  });

  it('asks when work is running; stop now installs, cancel drops it', async () => {
    const now = setup({ work: [busy(1)], choice: 'now' });
    await now.gate.request(now.request);
    expect(now.ask).toHaveBeenCalledWith(busy(1));
    expect(now.install).toHaveBeenCalledTimes(1);

    const cancel = setup({ work: [busy(1)], choice: 'cancel' });
    await cancel.gate.request(cancel.request);
    expect(cancel.install).not.toHaveBeenCalled();
    expect(cancel.timers).toHaveLength(0);
  });

  it('waiting installs only once the work is done, and skips a check while the quit dialog is open', async () => {
    const { gate, request, install, state, timers, tick } = setup({ work: [busy(1), busy(1), busy(0)], choice: 'wait' });
    await gate.request(request);
    expect(install).not.toHaveBeenCalled();
    await tick();
    expect(install).not.toHaveBeenCalled();
    state.quitting = true;
    await tick();
    expect(install).not.toHaveBeenCalled();
    state.quitting = false;
    await tick();
    expect(install).toHaveBeenCalledTimes(1);
    expect(timers).toHaveLength(0);
  });

  it('stops waiting when the update is no longer ready or the app quits', async () => {
    const stale = setup({ work: [busy(1), busy(0)], choice: 'wait' });
    await stale.gate.request(stale.request);
    stale.state.ready = false;
    await stale.tick();
    expect(stale.install).not.toHaveBeenCalled();
    expect(stale.timers).toHaveLength(0);

    const quit = setup({ work: [busy(1), busy(0)], choice: 'wait' });
    await quit.gate.request(quit.request);
    quit.gate.cancel();
    expect(quit.timers).toHaveLength(0);
  });

  it('ignores the answer when the app starts quitting while the dialog is open', async () => {
    const { gate, request, ask, install } = setup({ work: [busy(1)], choice: 'now' });
    let answer!: (choice: UpdateChoice) => void;
    ask.mockImplementationOnce(() => new Promise((resolve) => (answer = resolve)));
    const pending = gate.request(request);
    await vi.waitFor(() => expect(ask).toHaveBeenCalled());
    gate.cancel();
    answer('now');
    await pending;
    expect(install).not.toHaveBeenCalled();
  });
});
