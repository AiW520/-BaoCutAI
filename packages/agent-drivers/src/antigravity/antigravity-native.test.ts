import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { expect, it } from 'vitest';
import { silentLogger, type AgentEvent, type AgentSession } from '@baocut/harness';
import { AntigravityDriver } from './antigravity-driver.ts';

/**
 * 真 CLI 的协议验收（D08）：显式给官方二进制路径才运行；假 API 密钥 + 回环模型服务，不用用户的账号。
 * HOME、配置、工程与日志全在临时目录；测试结束删除。模型应答按原生公布的 Gemini functionCall 格式驱动真实工具。
 */
const binary = process.env.BAOCUT_ANTIGRAVITY_TEST_BINARY;
const settings = { accessMode: 'fullAccess', model: null, effort: null } as const;
const waitFor = async <T>(read: () => Promise<T | undefined>): Promise<T> => {
  for (let i = 0; i < 1000; i++) { const result = await read(); if (result !== undefined) return result; await new Promise((r) => setTimeout(r, 10)); }
  throw new Error('Native Antigravity test timed out');
};
it.skipIf(!binary || process.platform === 'win32')('real agy: catalog, tools, follow-up, model restart, interruption, and persistence', async () => {
  const dir = await fs.realpath(await fs.mkdtemp(path.join(os.tmpdir(), 'baocut-agy-native-test-')));
  const home = path.join(dir, 'home'); const cwd = path.join(dir, 'workspace');
  const config = path.join(home, '.gemini/antigravity-cli');
  await fs.mkdir(config, { recursive: true }); await fs.mkdir(cwd);
  await fs.writeFile(path.join(config, 'settings.json'), JSON.stringify({ modelProvider: 'gemini' }));
  await fs.writeFile(path.join(cwd, 'marker.txt'), 'BAOCUT_MARKER');
  const image = path.join(cwd, 'image.png');
  await fs.writeFile(image, Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jYQAAAABJRU5ErkJggg==', 'base64'));
  const output = path.join(cwd, 'output.txt'); const pidFile = path.join(cwd, 'child.pid');
  let plan: Array<{ name: string; args: Record<string, unknown> }> = [];
  const requests: string[] = [];
  const server = http.createServer(async (req, res) => {
    if (req.method === 'GET') { res.end(JSON.stringify({ models: [] })); return; }
    let source = ''; for await (const chunk of req) source += chunk;
    const body = JSON.parse(source) as { tools?: unknown };
    requests.push(req.url ?? '');
    const call = body.tools ? plan.shift() : undefined;
    const parts = call ? [{ functionCall: call }] : [{ text: 'BAOCUT_NATIVE_OK' }];
    const data = { candidates: [{ content: { role: 'model', parts }, finishReason: 'STOP' }], usageMetadata: { promptTokenCount: 10, candidatesTokenCount: 3, totalTokenCount: 13 } };
    const stream = req.url?.includes('streamGenerateContent');
    res.writeHead(200, { 'Content-Type': stream ? 'text/event-stream' : 'application/json' });
    res.end(stream ? `data: ${JSON.stringify(data)}\n\n` : JSON.stringify(data));
  });
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = (server.address() as { port: number }).port;
  const env = { HOME: home, PATH: process.env.PATH, XDG_CONFIG_HOME: path.join(home, '.config'), XDG_CACHE_HOME: path.join(home, '.cache'), XDG_DATA_HOME: path.join(home, '.local/share'), GEMINI_API_KEY: 'baocut-test-dummy', GOOGLE_GEMINI_BASE_URL: `http://127.0.0.1:${port}`, BROWSER: '/usr/bin/true' };
  const { stdout: version } = await promisify(execFile)(binary!, ['--version'], { env, timeout: 10_000 });
  const driver = new AntigravityDriver(silentLogger, { locate: async () => ({ command: binary!, version: version.trim(), env }), timeoutMs: 10_000 });
  const sessions: AgentSession[] = [];
  try {
    const probe = await driver.probe();
    expect(probe.state).toBe('ready'); expect(probe.models.length).toBeGreaterThan(0); expect(requests).toHaveLength(0);
    const session = await driver.createSession({ cwd, ...settings, resume: null, developerInstructions: 'You are running a BaoCut protocol test.' }); sessions.push(session);
    const events: AgentEvent[] = []; session.subscribe((e) => events.push(e));
    const completed = (id: string) => waitFor(async () => events.find((e) => e.type === 'turn.completed' && e.turnId === id));
    const summary = { toolSummary: 'BaoCut protocol test', toolAction: 'test' };
    plan = [
      { name: 'view_file', args: { AbsolutePath: path.join(cwd, 'marker.txt'), ...summary } },
      { name: 'view_file', args: { AbsolutePath: image, ...summary } },
      { name: 'write_to_file', args: { TargetFile: output, Overwrite: true, CodeContent: 'first\n', Description: 'test', ...summary } },
      { name: 'replace_file_content', args: { TargetFile: output, Instruction: 'replace first with second', Description: 'test', AllowMultiple: false, TargetContent: 'first', ReplacementContent: 'second', StartLine: 1, EndLine: 1, ...summary } },
      { name: 'run_command', args: { CommandLine: 'printf BAOCUT_COMMAND', Cwd: cwd, WaitMsBeforeAsync: 1000, ...summary } },
    ];
    const first = await session.startTurn({ text: 'Run the protocol test.', images: [{ path: image, mimeType: 'image/png' }] }, settings); await completed(first.turnId);
    expect(await fs.readFile(output, 'utf8')).toBe('second\n');
    expect(events).toContainEqual(expect.objectContaining({ type: 'item.completed', item: expect.objectContaining({ detail: image, status: 'completed' }) }));
    expect(events).toContainEqual(expect.objectContaining({ type: 'item.completed', item: expect.objectContaining({ tool: 'command', output: expect.stringContaining('BAOCUT_COMMAND') }) }));
    const followup = await session.startTurn({ text: 'Follow up.' }, settings); await completed(followup.turnId);
    const persistence = session.describePersistence();
    const model = probe.models.find((m) => /flash/.test(m.id))!.id;
    const switched = await session.startTurn({ text: 'Change model.' }, { ...settings, model }); await completed(switched.turnId);
    expect(session.describePersistence()).toEqual(persistence);
    plan = [{ name: 'run_command', args: { CommandLine: `sleep 60 & printf '%s' "$!" > '${pidFile}'; wait`, Cwd: cwd, WaitMsBeforeAsync: 10000, ...summary } }];
    const hanging = await session.startTurn({ text: 'Start the interrupt test.' }, { ...settings, model });
    const pid = await waitFor(async () => { try { const value = Number(await fs.readFile(pidFile, 'utf8')); return value || undefined; } catch { return undefined; } });
    expect(await session.interrupt(hanging.turnId)).toEqual({ status: 'requested' });
    await waitFor(async () => { try { process.kill(pid, 0); return undefined; } catch { return true; } });
    expect(events).toContainEqual(expect.objectContaining({ type: 'turn.completed', turnId: hanging.turnId, outcome: 'interrupted' }));
    plan = [];
    const continued = await session.startTurn({ text: 'Continue after interruption.' }, { ...settings, model }); await completed(continued.turnId);
    await session.close();
    const restored = await driver.createSession({ cwd, ...settings, resume: persistence }); sessions.push(restored);
    const restoredEvents: AgentEvent[] = []; restored.subscribe((e) => restoredEvents.push(e));
    const last = await restored.startTurn({ text: 'Resume after close.' }, settings);
    await waitFor(async () => restoredEvents.find((e) => e.type === 'turn.completed' && e.turnId === last.turnId));
    expect(restored.describePersistence()).toEqual(persistence);
    expect(events.filter((e) => e.type === 'turn.completed').every((e) => e.outcome === 'completed' || e.outcome === 'interrupted')).toBe(true);
  } finally {
    await Promise.all(sessions.map((s) => s.close()));
    server.closeAllConnections(); await new Promise<void>((resolve) => server.close(() => resolve()));
    await fs.rm(dir, { recursive: true, force: true });
  }
}, 60_000);
