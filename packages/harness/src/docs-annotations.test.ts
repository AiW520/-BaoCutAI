import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { newId, type DocsAnnotation, type DriverProbe, type Id, type VideoAnnotation } from '@baocut/protocol';
import { ConversationStore, ProjectStore, resolveRuntimeHome, type RuntimeHome } from '@baocut/runtime-storage';
import { DriverRegistry } from './agent-manager.ts';
import type { AgentDriver, AgentEvent, AgentSession } from './driver.ts';
import { Harness, withDocsAnnotations, type ResolvedDesignAnnotation, type ResolvedDocsAnnotation } from './harness.ts';
import { silentLogger } from './logger.ts';

/** 文档标注（docs/design/docs §8）随消息发出，与文档卡片（§7.3）。假 Driver，全部在临时目录里。 */

const comment = (over: Partial<DocsAnnotation> = {}): DocsAnnotation => ({
  doc: { conversationId: 'c', path: 'plan' },
  kind: 'comment',
  path: 'f-afc001d0-ce07#be1476b2-62c1/mq2x81a0kfd.16;thread=u-3f2a9c1e',
  label: 'Q3 launch plan › "500 weekly active teams"',
  quote: '500 weekly active teams',
  text: '改成 750',
  ...over,
});

const ask = (over: Partial<DocsAnnotation> = {}): DocsAnnotation => ({
  doc: { conversationId: 'c', path: 'plan' },
  kind: 'ask',
  path: 'f-afc001d0-ce07#be1476b2-62c1/mq2x81a0kfd.40',
  label: 'Q3 launch plan › 空行',
  text: '这里补一张风险表',
  ...over,
});

describe('withDocsAnnotations', () => {
  it('没有标注时原样返回', () => {
    expect(withDocsAnnotations('改一下', [])).toBe('改一下');
  });

  it('每份文档一段，按第一次出现的顺序；评论带原文与回复的线程，请求带写到哪里；多行缩进对齐', () => {
    const text = withDocsAnnotations('按评论改', [
      { annotation: comment(), docPath: 'plan/' },
      { annotation: ask({ text: '补一张风险表\n按影响排序' }), docPath: '/abs/other/' },
      { annotation: ask({ path: 'f-afc001d0-ce07#be1476b2-62c1', label: '末尾' }), docPath: 'plan/' },
      { annotation: comment({ path: 'f-afc001d0-ce07#be1476b2-62c1/mq2x81a0kfd.16', quote: undefined, text: '数据来源？' }), docPath: 'plan/' },
    ]);
    expect(text).toBe(
      [
        '按评论改',
        '',
        '<baocut-docs-annotations doc="plan/">',
        '1. 评论 · Q3 launch plan › "500 weekly active teams"',
        '   位置：f-afc001d0-ce07#be1476b2-62c1/mq2x81a0kfd.16;thread=u-3f2a9c1e',
        '   原文：500 weekly active teams',
        '   评论：改成 750',
        '   回复：在线程 u-3f2a9c1e 里回复（docs_create utterance，parent 是这个 id）',
        '3. 请求 · 末尾',
        '   位置：f-afc001d0-ce07#be1476b2-62c1',
        '   请求：这里补一张风险表',
        '   写到：正文 be1476b2-62c1 的末尾',
        '4. 评论 · Q3 launch plan › "500 weekly active teams"',
        '   位置：f-afc001d0-ce07#be1476b2-62c1/mq2x81a0kfd.16',
        '   评论：数据来源？',
        '</baocut-docs-annotations>',
        '<baocut-docs-annotations doc="/abs/other/">',
        '2. 请求 · Q3 launch plan › 空行',
        '   位置：f-afc001d0-ce07#be1476b2-62c1/mq2x81a0kfd.40',
        '   请求：补一张风险表',
        '        按影响排序',
        '   写到：正文 be1476b2-62c1 的块 mq2x81a0kfd.40（还空着就替换它，否则写在它后面）',
        '</baocut-docs-annotations>',
      ].join('\n'),
    );
  });

  it('路径不是元素路径的写法时只给原样的位置', () => {
    const text = withDocsAnnotations('看看', [{ annotation: ask({ path: 'somewhere' }), docPath: 'plan/' }]);
    expect(text).toContain('   位置：somewhere\n   请求：这里补一张风险表\n</baocut-docs-annotations>');
  });
});

const capabilities: DriverProbe['capabilities'] = { steer: true, approvals: true, resume: false, images: false };

/** 回合开始后一直开着；收下插话。 */
class Session implements AgentSession {
  readonly id = newId('fake');
  readonly capabilities = capabilities;
  readonly inputs: string[] = [];
  readonly #listeners = new Set<(event: AgentEvent) => void>();
  #turn = 0;
  turnId: string | null = null;

  startTurn(input: { text: string }): Promise<{ turnId: string }> {
    const turnId = `turn-${++this.#turn}`;
    this.turnId = turnId;
    this.inputs.push(input.text);
    setTimeout(() => this.#emit({ type: 'turn.started', turnId }), 1);
    return Promise.resolve({ turnId });
  }

  async steer(_turnId: string, input: { text: string }) {
    this.inputs.push(input.text);
    return 'accepted' as const;
  }

  async interrupt() {
    return { status: 'requested' as const };
  }

  async respondToApproval() {}

  subscribe(listener: (event: AgentEvent) => void) {
    this.#listeners.add(listener);
    return () => this.#listeners.delete(listener);
  }

  describePersistence() {
    return null;
  }

  async close() {}

  #emit(event: AgentEvent) {
    for (const listener of this.#listeners) listener(event);
  }
}

class Driver implements AgentDriver {
  readonly id = 'codex' as const;
  readonly sessions: Session[] = [];

  async probe(): Promise<DriverProbe> {
    return {
      id: 'codex',
      name: 'Fake',
      command: 'fake',
      state: 'ready',
      status: 'available',
      version: '0',
      minVersion: '0',
      latestVersion: null,
      unavailableReason: null,
      detail: null,
      executable: null,
      realExecutable: null,
      account: null,
      plan: '',
      loginCommand: null,
      install: [],
      models: [],
      configModel: null,
      configModelKnown: null,
      checkedAt: new Date().toISOString(),
      verified: true,
      tested: true,
      capabilities,
    };
  }

  async createSession(): Promise<AgentSession> {
    const session = new Session();
    this.sessions.push(session);
    return session;
  }
}

let dir: string;
let home: RuntimeHome;
let driver: Driver;
let harness: Harness;

async function until<T>(read: () => T | undefined | null | false, timeoutMs = 3000): Promise<T> {
  const deadline = Date.now() + timeoutMs;
  for (;;) {
    const value = read();
    if (value) return value;
    if (Date.now() > deadline) throw new Error('等待超时');
    await new Promise((resolve) => setTimeout(resolve, 5));
  }
}

const userMessages = (conversationId: Id) => harness.getConversation(conversationId).items.filter((item) => item.kind === 'user-message');

beforeEach(async () => {
  dir = await fs.realpath(await fs.mkdtemp(path.join(os.tmpdir(), 'baocut-docs-notes-')));
  home = resolveRuntimeHome({ BAOCUT_HOME: path.join(dir, 'home') });
  driver = new Driver();
  const drivers = new DriverRegistry();
  drivers.register(driver);
  harness = await Harness.open({
    home,
    conversations: new ConversationStore(home.conversationsDir),
    projects: new ProjectStore(home.projectsFile),
    drivers,
    log: silentLogger,
  });
});

afterEach(async () => {
  await harness.shutdown();
  await fs.rm(dir, { recursive: true, force: true });
});

const videoNote = (conversationId: Id): VideoAnnotation => ({
  video: { conversationId, path: 'talk' },
  revision: '3',
  timeMs: 42300,
  kind: 'pin',
  region: { x: 0.5, y: 0.5, w: 0, h: 0 },
  label: '00:42.3',
  text: '改这里',
});

describe('send 与 steer 带文档标注', () => {
  it('文档标注段排在设计稿标注段之后，用户消息上原样记一份（不带解析出的路径）', async () => {
    const conversation = await harness.createConversation({ title: '改文档' });
    const designAnnotations: ResolvedDesignAnnotation[] = [
      {
        annotation: { canvas: { conversationId: conversation.id, path: 'poster' }, anchor: 'Main.dc.html#el-1', board: 'Main.dc.html', label: 'Main', text: '大一点' },
        canvasPath: 'poster/',
      },
    ];
    const docsAnnotations: ResolvedDocsAnnotation[] = [{ annotation: comment({ doc: { conversationId: conversation.id, path: 'plan' } }), docPath: 'plan/' }];
    const video = videoNote(conversation.id);
    await harness.send({ conversationId: conversation.id, text: '按评论改', commandId: newId('cmd'), designAnnotations,
      videoAnnotations: [{ annotation: video, videoPath: 'talk/' }], docsAnnotations });
    const session = await until(() => driver.sessions.at(-1));
    const input = await until(() => session.inputs[0]);
    const designAt = input.indexOf('<baocut-design-annotations canvas="poster/">');
    const docsAt = input.indexOf('<baocut-docs-annotations doc="plan/">\n1. 评论');
    expect(designAt).toBeGreaterThan(0);
    const videoAt = input.indexOf('<baocut-video-annotations video="talk/"');
    expect(videoAt).toBeGreaterThan(designAt);
    expect(docsAt).toBeGreaterThan(videoAt);
    expect(input.trimEnd().endsWith('</baocut-docs-annotations>')).toBe(true);
    const [message] = userMessages(conversation.id);
    expect(message).toMatchObject({ text: '按评论改', docsAnnotations: [docsAnnotations[0]!.annotation], videoAnnotations: [video] });
  });

  it('没带标注的消息不写这个字段；插话带的标注同样附上、记下', async () => {
    const conversation = await harness.createConversation({ title: '插话' });
    await harness.send({ conversationId: conversation.id, text: '写一份计划', commandId: newId('cmd') });
    const session = await until(() => driver.sessions.at(-1));
    await until(() => harness.agentRun(conversation.id).taskId && session.turnId);
    expect(userMessages(conversation.id)[0]).not.toHaveProperty('docsAnnotations');

    const annotation = ask({ doc: { conversationId: conversation.id, path: 'plan' } });
    const video = videoNote(conversation.id);
    const result = await harness.steer({
      conversationId: conversation.id,
      text: '顺便补这里',
      commandId: newId('cmd'),
      docsAnnotations: [{ annotation, docPath: 'plan/' }],
      videoAnnotations: [{ annotation: video, videoPath: 'talk/' }],
    });
    expect(result).toEqual({ status: 'steered' });
    expect(session.inputs[1]).toContain('<baocut-docs-annotations doc="plan/">');
    expect(session.inputs[1]).toContain('   请求：这里补一张风险表');
    expect(session.inputs[1]).toContain('<baocut-video-annotations video="talk/"');
    expect(userMessages(conversation.id)[1]).toMatchObject({ text: '顺便补这里', docsAnnotations: [annotation], videoAnnotations: [video] });
  });
});

describe('recordDocsCreated（docs/design/docs §7.3）', () => {
  it('同一份文档只有一条：再次记录时更新标题、标签页数与任务，id 不变；别的文档另起一条', async () => {
    const conversation = await harness.createConversation({ title: '文档卡片' });
    const target = { conversationId: conversation.id, path: 'plan' };
    const cards = () => harness.getConversation(conversation.id).items.filter((item) => item.kind === 'docs-created');
    harness.recordDocsCreated(conversation.id, 'task-1', { target, title: 'Q3 plan', tabCount: 1 });
    const [first] = cards();
    expect(first).toMatchObject({ kind: 'docs-created', taskId: 'task-1', target, title: 'Q3 plan', tabCount: 1 });
    expect(first!.id.startsWith('docs')).toBe(true);
    harness.recordDocsCreated(conversation.id, 'task-2', { target: { ...target }, title: 'Q3 launch plan', tabCount: 2 }, true);
    expect(cards()).toEqual([{ ...first, taskId: 'task-2', title: 'Q3 launch plan', tabCount: 2 }]);
    harness.recordDocsCreated(conversation.id, null, { target: { conversationId: conversation.id, path: 'notes' }, title: 'Notes', tabCount: 1 });
    expect(cards()).toHaveLength(2);
    harness.recordDocsCreated('missing', null, { target, title: 'x', tabCount: 1 });
  });

  it('onlyExisting：没有这份文档的卡片时不新添', async () => {
    const conversation = await harness.createConversation({ title: '别处的文档' });
    harness.recordDocsCreated(conversation.id, 'task-1', { target: { conversationId: conversation.id, path: 'old' }, title: 'Old', tabCount: 1 }, true);
    expect(harness.getConversation(conversation.id).items.filter((item) => item.kind === 'docs-created')).toEqual([]);
  });
});
