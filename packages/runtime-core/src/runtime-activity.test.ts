import { describe, expect, it, vi } from 'vitest';
import type { RuntimeInfo } from '@baocut/protocol';
import type { TrustedPrincipal } from './gateway.ts';
import { RuntimeActivity } from './runtime-activity.ts';

const info = { pid: 1, launchedBy: 'cli' } as RuntimeInfo;
const principal = (kind: TrustedPrincipal['kind']) => ({ kind, connectionId: `c-${kind}` }) as TrustedPrincipal;

function setup(state: { jobs?: number; services?: string[] } = {}) {
  let now = 0;
  const onIdle = vi.fn();
  const activity = new RuntimeActivity(
    { info, activeJobs: () => state.jobs ?? 0, runningServices: () => state.services ?? [] },
    { minutes: () => 10, onIdle, checkMs: 1_000_000, now: () => now },
  );
  activity.start();
  return { activity, onIdle, advance: (ms: number) => (now += ms), state };
}

describe('Runtime 的空闲退出', () => {
  it('没有连接、任务与对外服务满 idleExitMinutes 时退出一次', () => {
    const { activity, onIdle, advance } = setup();
    advance(9 * 60_000);
    activity.check();
    expect(onIdle).not.toHaveBeenCalled();
    advance(60_000);
    activity.check();
    activity.check();
    expect(onIdle).toHaveBeenCalledTimes(1);
    activity.stop();
  });

  it('连接、任务、对外服务都算在用；断开之后重新计时', () => {
    const state: { jobs?: number; services?: string[] } = {};
    const { activity, onIdle, advance } = setup(state);
    activity.connected(principal('desktop'));
    advance(60 * 60_000);
    activity.check();
    expect(onIdle).not.toHaveBeenCalled();
    expect(activity.status().connections).toEqual({ desktop: 1, cli: 0, agent: 0 });
    activity.disconnected(principal('desktop'));
    state.jobs = 1;
    advance(60 * 60_000);
    activity.check();
    state.jobs = 0;
    state.services = ['mcp'];
    advance(60 * 60_000);
    activity.check();
    expect(onIdle).not.toHaveBeenCalled();
    state.services = [];
    activity.check();
    advance(5 * 60_000);
    activity.touch();
    advance(9 * 60_000);
    activity.check();
    expect(onIdle).not.toHaveBeenCalled();
    advance(60_000);
    activity.check();
    expect(onIdle).toHaveBeenCalledTimes(1);
    expect(activity.status().idleExit).toMatchObject({ minutes: 10 });
  });

  it('只查状态的 CLI 连接不改空闲计时；发出别的请求才算在用', () => {
    const { activity, onIdle, advance } = setup();
    const since = activity.status().idleExit!.idleSince;
    expect(since).toEqual(expect.any(String));
    advance(5 * 60_000);

    // baocut runtime status：连上、查状态、断开。报出的是查询之前的 idleSince，断开之后也不重新算。
    const probe = { kind: 'cli', connectionId: 'c-probe' } as TrustedPrincipal;
    activity.connected(probe);
    activity.requested(probe, 'runtime.status');
    activity.check();
    expect(activity.status()).toMatchObject({ connections: { cli: 1 }, idleExit: { idleSince: since } });
    activity.disconnected(probe);
    expect(activity.status().idleExit!.idleSince).toBe(since);
    advance(5 * 60_000);
    activity.check();
    expect(onIdle).toHaveBeenCalledTimes(1);

    // 别的请求：在用，断开之后从断开时重新算。
    const later = setup();
    const cli = { kind: 'cli', connectionId: 'c-cli' } as TrustedPrincipal;
    later.activity.connected(cli);
    later.activity.requested(cli, 'runtime.status');
    later.activity.requested(cli, 'catalog.call');
    later.advance(60 * 60_000);
    later.activity.check();
    expect(later.activity.status().idleExit!.idleSince).toBeNull();
    later.activity.disconnected(cli);
    later.advance(9 * 60_000);
    later.activity.check();
    expect(later.onIdle).not.toHaveBeenCalled();
    later.advance(60_000);
    later.activity.check();
    expect(later.onIdle).toHaveBeenCalledTimes(1);
  });

  it('桌面端退出时选了在后台继续：运行中开启空闲退出，只等手上的活做完', () => {
    let now = 0;
    let work = 1;
    const onIdle = vi.fn();
    // 开着的对外服务与智能体连接不再挡着退出，否则留在后台的 Runtime 永远停不下来。
    const activity = new RuntimeActivity({ info, activeJobs: () => 0, runningServices: () => ['mcp'] }, null);
    activity.start();
    activity.connected(principal('desktop'));
    activity.connected(principal('agent'));
    const busy = ({ desktop, cli }: { desktop: number; cli: number }) => desktop + cli + work > 0;
    activity.enableIdleExit({ minutes: () => 10, onIdle, checkMs: 1_000_000, now: () => now, busy });
    expect(activity.status().idleExit).toEqual({ minutes: 10, idleSince: null });

    activity.disconnected(principal('desktop'));
    now += 60 * 60_000;
    activity.check();
    expect(onIdle).not.toHaveBeenCalled();
    work = 0;
    activity.check();
    now += 9 * 60_000;
    activity.check();
    expect(onIdle).not.toHaveBeenCalled();
    now += 60_000;
    activity.check();
    expect(onIdle).toHaveBeenCalledTimes(1);
  });

  it('已经带空闲退出的不被后来的开启改掉', () => {
    const { activity, onIdle, advance } = setup({ jobs: 1 });
    activity.enableIdleExit({ minutes: () => 10, onIdle: vi.fn(), busy: () => false });
    advance(60 * 60_000);
    activity.check();
    expect(onIdle).not.toHaveBeenCalled();
    activity.stop();
  });

  it('不带空闲退出时只报告，不计时', () => {
    const activity = new RuntimeActivity({ info, activeJobs: () => 0, runningServices: () => [] }, null);
    activity.start();
    activity.connected(principal('cli'));
    activity.connected(principal('web'));
    expect(activity.status()).toMatchObject({ connections: { desktop: 0, cli: 1, agent: 0 }, activeJobs: 0, idleExit: null });
  });
});
