import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { BaoCutClient } from '@baocut/client';
import { newId, type AgentMode, type Id } from '@baocut/protocol';
import { resolveRuntimeHome } from '@baocut/runtime-storage';
import { startRuntime, type RunningRuntime } from '../runtime.ts';
import { ToolDriver, tool, until, type ToolSession } from './testing/fake-agent.ts';

/**
 * `conversations_set_title`（产品设计 §3.1、架构设计 §3.10）：会话里的智能体读懂本机素材之后给会话起标题。经真实的 MCP 端点调用，
 * 侧栏读到的会话记录（`conversations.list`）跟着换；只换按第一句话自动起的标题、只换一次，用户改过的不动；规划模式也能用。
 * 不需要视频引擎与模型。
 */

describe('conversations_set_title', () => {
  let dir: string;
  let driver: ToolDriver;
  let runtime: RunningRuntime;
  let client: BaoCutClient;

  beforeEach(async () => {
    dir = await fs.realpath(await fs.mkdtemp(path.join(os.tmpdir(), 'baocut-conversation-tools-')));
    driver = new ToolDriver();
    runtime = await startRuntime({
      home: resolveRuntimeHome({ BAOCUT_HOME: path.join(dir, 'home') }),
      drivers: () => [driver],
      watchSpace: false,
      engineHost: null,
      modelWorker: null,
      initiator: { discoverer: null },
      nodes: { host: '127.0.0.1', advertiser: null },
    });
    const { endpoint, token } = runtime.discovery;
    client = new BaoCutClient({
      resolve: async () => ({ endpoint, token }),
      client: { kind: 'desktop', name: 'test', version: '0' },
      reconnect: false,
    });
    await client.connect();
  });

  afterEach(async () => {
    client?.close();
    await runtime?.close();
    await fs.rm(dir, { recursive: true, force: true });
  });

  /** 一个不属于项目的会话，发出第一句话，等到它的原生会话。 */
  async function agent(text: string, accessMode: AgentMode = 'auto'): Promise<{ conversationId: Id; session: ToolSession }> {
    const { conversation } = await client.request('conversations.create', { projectId: null });
    const before = driver.sessions.length;
    await client.request('conversations.send', { conversationId: conversation.id, text, commandId: newId('cmd'), accessMode });
    const session = await until(() => driver.sessions[before]);
    return { conversationId: conversation.id, session };
  }

  /** 侧栏读到的标题。 */
  async function sidebarTitle(conversationId: Id): Promise<string> {
    const { conversations } = await client.request('conversations.list', {});
    return conversations.find((c) => c.id === conversationId)!.title;
  }

  it('按第一句话起的标题换成智能体起的；只换一次', async () => {
    const { conversationId, session } = await agent('Transcribe this video and translate it into Chinese\n/Users/me/clip.mp4');
    expect(await sidebarTitle(conversationId)).toBe('Transcribe this video and translate it i…');

    const first = await tool(session, 'conversations_set_title', { title: '  城市骑行通勤的五个误区 ' });
    expect(first.isError).toBe(false);
    expect(first.body).toMatchObject({ changed: true, title: '城市骑行通勤的五个误区' });
    expect(await sidebarTitle(conversationId)).toBe('城市骑行通勤的五个误区');

    const second = await tool(session, 'conversations_set_title', { title: '另一个标题' });
    expect(second.body).toMatchObject({ changed: false, title: '城市骑行通勤的五个误区' });
    expect(second.body.next).toContain('不要再调用');
    expect(await sidebarTitle(conversationId)).toBe('城市骑行通勤的五个误区');
  });

  it('用户改过的标题不动', async () => {
    const { conversationId, session } = await agent('转录这个视频');
    await client.request('conversations.update', { conversationId, title: '我的片子' });
    const result = await tool(session, 'conversations_set_title', { title: '城市骑行通勤的五个误区' });
    expect(result.body).toMatchObject({ changed: false, title: '我的片子' });
    expect(await sidebarTitle(conversationId)).toBe('我的片子');
  });

  it('规划模式下也能用：只改会话自己的标题，不确认', async () => {
    const { conversationId, session } = await agent('总结一下这个视频', 'plan');
    const result = await tool(session, 'conversations_set_title', { title: '季度财报电话会要点' });
    expect(result.isError).toBe(false);
    expect(result.body.changed).toBe(true);
    expect(result.body.approval).toBeUndefined();
    expect(await sidebarTitle(conversationId)).toBe('季度财报电话会要点');
  });

  it('超过 40 个字符或不止一行时拒绝，标题不变', async () => {
    const { conversationId, session } = await agent('转录这个视频');
    for (const title of ['长'.repeat(41), '第一行\n第二行']) {
      const result = await tool(session, 'conversations_set_title', { title });
      expect(result.isError).toBe(true);
      expect(result.body.error.code).toBe('INVALID_ARGUMENTS');
    }
    expect(await sidebarTitle(conversationId)).toBe('转录这个视频');
  });
});
