import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { newId, type DriverProbe } from '@baocut/protocol';
import { ConversationStore, ProjectStore, resolveRuntimeHome, type RuntimeHome } from '@baocut/runtime-storage';
import { DriverRegistry } from './agent-manager.ts';
import type { AgentDriver, AgentEvent, AgentSession } from './driver.ts';
import { Harness } from './harness.ts';
import { silentLogger } from './logger.ts';

/** 会话标题（产品设计 §3.1）：按第一句话起，链接素材解析出标题时换成它，用户改过的不动。假 Driver，全部在临时目录里。 */

const capabilities: DriverProbe['capabilities'] = { steer: false, approvals: true, resume: false, images: false };

/** 回合开始后一直开着。 */
class Session implements AgentSession {
  readonly id = newId('fake');
  readonly capabilities = capabilities;
  readonly #listeners = new Set<(event: AgentEvent) => void>();
  #turn = 0;

  startTurn(): Promise<{ turnId: string }> {
    const turnId = `turn-${++this.#turn}`;
    setTimeout(() => this.#emit({ type: 'turn.started', turnId }), 1);
    return Promise.resolve({ turnId });
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
    return new Session();
  }
}

let dir: string;
let home: RuntimeHome;
let harness: Harness;

const titleOf = (conversationId: string) => harness.getConversation(conversationId).conversation.title;

beforeEach(async () => {
  dir = await fs.realpath(await fs.mkdtemp(path.join(os.tmpdir(), 'baocut-conversation-title-')));
  home = resolveRuntimeHome({ BAOCUT_HOME: path.join(dir, 'home') });
  const drivers = new DriverRegistry();
  drivers.register(new Driver());
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

describe('retitleIfAuto', () => {
  it('按第一句话起的标题换成媒体标题，写法相同（第一行、最多 40 字），不改最近活动；只换一次', async () => {
    const conversation = await harness.createConversation({});
    await harness.send({ conversationId: conversation.id, text: 'Transcribe this video and translate it into Chinese https://x.com/a/status/1', commandId: newId('cmd') });
    expect(titleOf(conversation.id)).toBe('Transcribe this video and translate it i…');
    const before = harness.getConversation(conversation.id).conversation.updatedAt;

    const media = 'Sundar Pichai - Some magical progress towards "magic state" in quantum!\nhttps://t.co/abc';
    expect(harness.retitleIfAuto(conversation.id, media)).toBe(true);
    expect(titleOf(conversation.id)).toBe('Sundar Pichai - Some magical progress to…');
    expect(harness.getConversation(conversation.id).conversation.updatedAt).toBe(before);

    // 第二个链接不再换。
    expect(harness.retitleIfAuto(conversation.id, 'Another video')).toBe(false);
    expect(titleOf(conversation.id)).toBe('Sundar Pichai - Some magical progress to…');
  });

  it('用户改过的、创建时给了的标题不动', async () => {
    const renamed = await harness.createConversation({});
    await harness.send({ conversationId: renamed.id, text: '下载这个视频 https://youtu.be/x', commandId: newId('cmd') });
    await harness.updateConversation({ conversationId: renamed.id, title: '量子计算访谈' });
    expect(harness.retitleIfAuto(renamed.id, 'Quantum talk')).toBe(false);
    expect(titleOf(renamed.id)).toBe('量子计算访谈');

    const named = await harness.createConversation({ title: '我的片子' });
    await harness.send({ conversationId: named.id, text: '转录 https://youtu.be/y', commandId: newId('cmd') });
    expect(harness.retitleIfAuto(named.id, 'Some video')).toBe(false);
    expect(titleOf(named.id)).toBe('我的片子');
  });

  it('还没有标题的会话直接用媒体标题；空的媒体标题与不存在的会话不处理', async () => {
    const conversation = await harness.createConversation({});
    expect(harness.retitleIfAuto(conversation.id, '  \n  ')).toBe(false);
    expect(harness.retitleIfAuto(conversation.id, 'A talk')).toBe(true);
    expect(titleOf(conversation.id)).toBe('A talk');
    expect(harness.retitleIfAuto('conv_missing', 'A talk')).toBe(false);
  });
});
