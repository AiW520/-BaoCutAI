import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { silentLogger, type AgentEvent, type AgentSession, type CreateSessionOptions } from '@baocut/harness';
import { AntigravityDriver } from './antigravity-driver.ts';
import { createFakeAntigravity, type FakeAntigravityScenario } from '../testing/fake-antigravity.ts';

type Completed = Extract<AgentEvent, { type: 'turn.completed' }>;
const settings = { accessMode: 'fullAccess', model: null, effort: null } as const;
const until = async <T>(read: () => T | undefined): Promise<T> => {
  for (let i = 0; i < 300; i++) { const value = read(); if (value !== undefined) return value; await new Promise((r) => setTimeout(r, 10)); }
  throw new Error('Timed out waiting for event');
};
describe.skipIf(process.platform === 'win32')('Antigravity stream sessions', () => {
  let dir: string;
  let fake: Awaited<ReturnType<typeof createFakeAntigravity>>;
  let driver: AntigravityDriver;
  const sessions: AgentSession[] = [];
  beforeEach(async () => { dir = await fs.mkdtemp(path.join(os.tmpdir(), 'baocut-agy-session-')); fake = await createFakeAntigravity(dir); driver = new AntigravityDriver(silentLogger, { locate: fake.locate, timeoutMs: 5000 }); });
  afterEach(async () => { await Promise.all(sessions.splice(0).map((s) => s.close())); await fs.rm(dir, { recursive: true, force: true }); });
  const options = (extra: Partial<CreateSessionOptions> = {}): CreateSessionOptions => ({ cwd: dir, ...settings, resume: null, ...extra });
  async function start(scenario: FakeAntigravityScenario = {}, extra: Partial<CreateSessionOptions> = {}) {
    fake.scenario(scenario);
    const session = await driver.createSession(options(extra)); sessions.push(session);
    const events: AgentEvent[] = []; session.subscribe((e) => events.push(e));
    const completed = (id: string) => until(() => events.find((e): e is Completed => e.type === 'turn.completed' && e.turnId === id));
    return { session, events, completed };
  }
  it('maps streamed Unicode text and command/file records across multiple turns', async () => {
    const { session, events, completed } = await start();
    const { turnId } = await session.startTurn({ text: 'First' }, settings);
    expect((await completed(turnId)).outcome).toBe('completed');
    expect(events.filter((e) => e.type === 'item.delta').map((e) => e.delta).join('')).toBe('Hello\u2028世界!');
    const items = events.flatMap((e) => e.type === 'item.completed' ? [e.item] : []);
    expect(items).toContainEqual(expect.objectContaining({ kind: 'tool-call', tool: 'command', title: 'printf done', output: 'done', status: 'completed' }));
    expect(items).toContainEqual(expect.objectContaining({ kind: 'tool-call', tool: 'file-change', detail: '/tmp/文稿.txt', output: null, status: 'completed' }));
    const next = await session.startTurn({ text: 'Second' }, settings);
    expect((await completed(next.turnId)).outcome).toBe('completed');
    expect(fake.log().filter((e) => e.kind === 'start')).toHaveLength(1);
  });
  it('puts developer instructions on the first new message, keeps images as paths, and resumes on model changes', async () => {
    const { session, completed } = await start({}, { developerInstructions: 'DEVELOPER_INSTRUCTIONS', mcpServers: { baocut: { url: 'http://localhost/mcp', headers: { Authorization: 'secret' } } } });
    const handle = session.describePersistence();
    const first = await session.startTurn({ text: 'First', images: [{ path: '/tmp/a b\n世界.png', mimeType: 'image/png' }] }, settings); await completed(first.turnId);
    const second = await session.startTurn({ text: 'Second' }, { ...settings, model: 'gemini-3.1-pro-high' }); await completed(second.turnId);
    const prompts = fake.log().filter((e) => e.kind === 'prompt');
    expect(prompts[0]?.text).toContain('DEVELOPER_INSTRUCTIONS');
    expect(prompts[0]?.text).toContain(JSON.stringify('/tmp/a b\n世界.png'));
    expect(prompts[1]?.text).toBe('Second');
    const launches = fake.log().filter((e) => e.args);
    expect(launches[1]?.args).toContain('--conversation');
    expect(launches[1]?.args).toContain((handle?.data as { conversationId: string }).conversationId);
    expect(JSON.stringify(fake.log())).not.toContain('secret');
    expect(session.describePersistence()).toEqual(handle);
  });
  it('restores a native conversation without reinjecting instructions', async () => {
    const first = await start(); const handle = first.session.describePersistence(); await first.session.close();
    const restored = await start({}, { resume: handle, developerInstructions: 'DO_NOT_REPEAT' });
    const turn = await restored.session.startTurn({ text: 'Resume' }, settings); await restored.completed(turn.turnId);
    expect(restored.session.describePersistence()).toEqual(handle);
    expect(fake.log().filter((e) => e.kind === 'prompt').at(-1)?.text).toBe('Resume');
  });
  it('rejects foreign, malformed and mismatched persistence without dropping context silently', async () => {
    await expect(driver.createSession(options({ resume: { driverId: 'antigravity', data: {} } }))).rejects.toThrow();
    await expect(driver.createSession(options({ resume: { driverId: 'codex', data: { version: 1, conversationId: 'x' } } }))).rejects.toThrow();
    fake.scenario({ wrongResume: true });
    await expect(driver.createSession(options({ resume: { driverId: 'antigravity', data: { version: 1, conversationId: 'x' } } }))).rejects.toThrow();
  });
  it('reports the unavailable temporary MCP channel in a localized warning', async () => {
    const { events } = await start({}, { mcpServers: { baocut: { url: 'http://localhost/mcp', headers: {} } } });
    expect(events).toContainEqual(expect.objectContaining({ type: 'session.warning', messageRef: { key: 'driversAntigravity.mcpUnavailable' } }));
  });
  it('rejects every unsupported access mode and confined calls without launching', async () => {
    for (const accessMode of ['ask', 'autoAcceptEdits', 'auto', 'plan'] as const) {
      await expect(driver.createSession(options({ accessMode }))).rejects.toMatchObject({ agentCode: 'AGENT_ACCESS_MODE_UNSUPPORTED' });
    }
    await expect(driver.createSession(options({ confinement: 'cwd-write-only' }))).rejects.toThrow();
    await expect(driver.createSession(options({ effort: 'high' }))).rejects.toThrow();
    expect(fake.log()).toHaveLength(0);
    const { session } = await start();
    await expect(session.startTurn({ text: 'No' }, { ...settings, accessMode: 'ask' })).rejects.toThrow();
    expect(fake.log().filter((e) => e.kind === 'prompt')).toHaveLength(0);
  });
  it('interrupts the full process tree, settles unfinished tools, and can continue by resume', async () => {
    const { session, events, completed } = await start({ turn: 'hang' });
    const first = await session.startTurn({ text: 'Hang' }, settings);
    await until(() => events.find((e) => e.type === 'item.started' && e.item.kind === 'tool-call'));
    const child = fake.log().find((e) => e.childPid)?.childPid;
    expect(child).toBeTypeOf('number');
    expect(await Promise.all([session.interrupt(first.turnId), session.interrupt(first.turnId)])).toEqual([{ status: 'requested' }, { status: 'requested' }]);
    expect((await completed(first.turnId)).outcome).toBe('interrupted');
    expect(events).toContainEqual(expect.objectContaining({ type: 'item.completed', item: expect.objectContaining({ kind: 'tool-call', status: 'interrupted' }) }));
    await until(() => { try { process.kill(child!, 0); } catch { return true; } return undefined; });
    fake.scenario({ turn: 'normal' }); const next = await session.startTurn({ text: 'Continue' }, settings); await completed(next.turnId);
    expect(fake.log().filter((e) => e.args).at(-1)?.args).toContain('--conversation');
  });
  it('rejects overlapping turns and closed sessions', async () => {
    const { session, events } = await start({ turn: 'hang' });
    await session.startTurn({ text: 'First' }, settings);
    await until(() => events.find((e) => e.type === 'item.started'));
    await expect(session.startTurn({ text: 'Second' }, settings)).rejects.toThrow();
    await session.close(); await expect(session.startTurn({ text: 'Closed' }, settings)).rejects.toThrow();
  });
  it.each(['malformed', 'wrong-id', 'crash', 'error'] as const)('reports %s as failure and can restart', async (turn) => {
    const started = await start({ turn });
    const first = await started.session.startTurn({ text: 'Fail' }, settings);
    const ended = await started.completed(first.turnId);
    expect(ended.outcome).toBe('failed');
    if (turn === 'error') expect(ended.errorCode).toBe('AGENT_RATE_LIMITED');
    fake.scenario({ turn: 'normal' }); const next = await started.session.startTurn({ text: 'Try again' }, settings);
    expect((await started.completed(next.turnId)).outcome).toBe('completed');
  });
  it('uses result text when no response steps were streamed and parses a final line without LF', async () => {
    const first = await start({ turn: 'result-only' });
    const turn = await first.session.startTurn({ text: 'First' }, settings); await first.completed(turn.turnId);
    expect(first.events).toContainEqual(expect.objectContaining({ type: 'item.completed', item: expect.objectContaining({ kind: 'agent-message', text: 'Hello\u2028世界!' }) }));
    fake.scenario({ turn: 'tail' }); const next = await first.session.startTurn({ text: 'Tail' }, settings);
    expect((await first.completed(next.turnId)).outcome).toBe('completed');
  });
  it('does not replay cumulative native denial warnings on later turns', async () => {
    const { session, events, completed } = await start({ denied: true });
    for (let i = 0; i < 2; i++) { const turn = await session.startTurn({ text: String(i) }, settings); await completed(turn.turnId); }
    expect(events.filter((e) => e.type === 'session.warning')).toHaveLength(1);
  });
  it.each(['timeout', 'exit', 'invalid'] as const)('cleans up startup %s', async (startup) => {
    fake.scenario({ startup });
    await expect(driver.createSession(options())).rejects.toThrow();
    const pid = fake.log().find((e) => e.pid)?.pid;
    if (pid) expect(() => process.kill(pid, 0)).toThrow();
  });
});
