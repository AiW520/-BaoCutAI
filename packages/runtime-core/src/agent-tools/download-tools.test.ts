import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { AgentPrincipal } from './grants.ts';
import type { CitationsFile } from '@baocut/protocol';
import { MemoryCitationRegistry } from '../ai-tools/citation-registry.ts';
import { DownloadTools, downloadFileName, prepareDownloadSave, type DownloadHandover } from './download-tools.ts';
import { ToolError } from './tool-catalog.ts';
import { TOOL_RISK, toolRisk, type ToolConfirmation, type ToolScope } from './tool-scope.ts';

/**
 * `downloads_save`：工作目录里的文件复制到下载目录。路径检查（`..`、绝对路径、符号链接、目录、视频目录）在审批之前拒绝；
 * 只新建文件，重名加序号；文件名按下载的文件同一套规则清理，扩展名沿用源文件的。
 */

let tmp: string;
let root: string;
let downloads: string;

beforeEach(async () => {
  tmp = await fs.realpath(await fs.mkdtemp(path.join(os.tmpdir(), 'baocut-downloads-save-')));
  root = path.join(tmp, 'scratch');
  downloads = path.join(tmp, 'Downloads');
  await fs.mkdir(root);
});

afterEach(async () => {
  await fs.rm(tmp, { recursive: true, force: true });
});

async function rejected(promise: Promise<unknown>): Promise<string> {
  try {
    await promise;
  } catch (error) {
    if (error instanceof ToolError) return error.code;
    throw error;
  }
  throw new Error('应当拒绝');
}

/** 只实现这个工具用到的三件事：授权、确认（记下请求）、工作目录。 */
function fakeScope(write = true): { scope: ToolScope; confirmed: ToolConfirmation[] } {
  const confirmed: ToolConfirmation[] = [];
  const scope = {
    authorize: (principal: AgentPrincipal, wants: boolean) => {
      if (wants && !write) throw new ToolError('PLAN_ONLY', '规划模式只读');
      return { principal, submitter: { kind: 'agent', id: principal.conversationId, taskId: 'task_1' } };
    },
    confirm: async (_access: unknown, request: ToolConfirmation) => {
      confirmed.push(request);
      return { mode: 'auto', risk: toolRisk(request), decidedBy: 'auto' };
    },
    saveRoot: () => root,
  } as unknown as ToolScope;
  return { scope, confirmed };
}

const principal = { kind: 'agent', conversationId: 'conv_1' } as unknown as AgentPrincipal;

describe('downloads_save', () => {
  it('带句子编号的 Markdown：按会话发过的编号校验，交出去掉编号的正文，出处另存并随登记带上；没发过的编号丢弃、段落标推断', async () => {
    const registry = new MemoryCitationRegistry();
    const sentence = (sentenceId: string, start: number, text: string) => ({ videoId: 'v1', documentId: 'd1', sentenceId, text, start, end: start + 2, speaker: null });
    const issued = registry.issue('conversation:conv_1', [sentence('s-w1', 0, '第一句。'), sentence('s-w5', 2, '第二句。'), sentence('s-w9', 30, '第三句。')]);
    expect(issued.map((s) => s.ref)).toEqual(['s1', 's2', 's3']);
    // 别的会话的编号互不相干。
    registry.issue('conversation:other', [sentence('s-w20', 50, '别处。')]);
    await fs.writeFile(path.join(root, 'post.md'), '# 标题\n\n第一段 [s1, s2]。\n\n- 要点 [s3]\n- 没依据 [s9]\n');
    const { scope } = fakeScope();
    const handovers: DownloadHandover[] = [];
    const published: CitationsFile[] = [];
    const tools = new DownloadTools({
      scope,
      downloadsDirectory: () => downloads,
      register: async (handover) => void handovers.push(handover),
      citations: { registry, publish: async (file) => (published.push(file), 'sha256:cit') },
    });
    const saved = (await tools.dispatch('downloads_save', { path: 'post.md' }, principal)) as Record<string, unknown>;
    const written = await fs.readFile(path.join(downloads, 'post.md'), 'utf8');
    expect(written).toBe('# 标题\n\n第一段。\n\n- 要点\n- 没依据\n');
    expect(saved.citations).toEqual({ cited: 2, inferred: 1, dropped: 1, saved: true });
    expect(handovers[0]).toMatchObject({ citationsArtifactId: 'sha256:cit', artifactId: `sha256:${createHash('sha256').update(written).digest('hex')}` });
    expect(published[0]!.videoIds).toEqual(['v1']);
    expect(published[0]!.paragraphs[1]!.cites).toEqual([
      { videoId: 'v1', documentId: 'd1', sentenceIds: ['s-w1', 's-w5'], clock: 'sequence', startSec: 0, endSec: 4, text: '第一句。 第二句。' },
    ]);

    // 没有编号的 Markdown 与别的文件原样复制，不存出处。
    await fs.writeFile(path.join(root, 'plain.md'), '# 只是笔记\n');
    const plain = (await tools.dispatch('downloads_save', { path: 'plain.md' }, principal)) as Record<string, unknown>;
    expect(plain.citations).toBeUndefined();
    expect(await fs.readFile(path.join(downloads, 'plain.md'), 'utf8')).toBe('# 只是笔记\n');
    expect(handovers[1]!.citationsArtifactId).toBeNull();
  });

  it('复制之后登记为 Space 交付物：下载目录里的真实路径、字节数、内容摘要与提交者；登记失败不影响结果', async () => {
    await fs.writeFile(path.join(root, 'post.md'), '# 你好\n');
    const { scope } = fakeScope();
    const handovers: DownloadHandover[] = [];
    const tools = new DownloadTools({ scope, downloadsDirectory: () => downloads, register: async (handover) => void handovers.push(handover) });
    const saved = (await tools.dispatch('downloads_save', { path: 'post.md' }, principal)) as Record<string, unknown>;
    const expected = `sha256:${createHash('sha256').update('# 你好\n').digest('hex')}`;
    expect(handovers).toEqual([
      { path: path.join(downloads, 'post.md'), bytes: saved.bytes, artifactId: expected, submitter: { kind: 'agent', id: 'conv_1', taskId: 'task_1' }, at: expect.any(String), citationsArtifactId: null },
    ]);

    const failing = new DownloadTools({ scope, downloadsDirectory: () => downloads, register: () => Promise.reject(new Error('space not ready')) });
    const second = (await failing.dispatch('downloads_save', { path: 'post.md' }, principal)) as Record<string, unknown>;
    expect(second.path).toBe(path.join(downloads, 'post-2.md'));
  });

  it('复制到下载目录（不存在时新建）；重名时加序号，不覆盖；风险 command，确认之后才写', async () => {
    await fs.mkdir(path.join(root, 'out'));
    await fs.writeFile(path.join(root, 'out', 'talk.zh-Hans.srt'), '1\n00:00:00,000 --> 00:00:01,000\n你好\n');
    const { scope, confirmed } = fakeScope();
    const tools = new DownloadTools({ scope, downloadsDirectory: () => downloads });

    const first = (await tools.dispatch('downloads_save', { path: 'out/talk.zh-Hans.srt' }, principal)) as Record<string, unknown>;
    const target = path.join(downloads, 'talk.zh-Hans.srt');
    expect(first).toMatchObject({ path: target, bytes: 39, approval: { risk: 'command' } });
    expect(first.next).toContain('告诉用户');
    expect(await fs.readFile(target, 'utf8')).toContain('你好');
    expect(confirmed).toHaveLength(1);
    expect(confirmed[0]).toMatchObject({ tool: 'downloads_save', targets: [target] });
    expect(TOOL_RISK.downloads_save).toBe('command');

    // 已有同名文件：不覆盖，加序号。
    await fs.writeFile(target, 'user edited');
    const second = (await tools.dispatch('downloads_save', { path: 'out/talk.zh-Hans.srt' }, principal)) as Record<string, unknown>;
    expect(second.path).toBe(path.join(downloads, 'talk.zh-Hans-2.srt'));
    expect(await fs.readFile(target, 'utf8')).toBe('user edited');

    // 给了 name：清理过，扩展名沿用源文件的。
    const named = (await tools.dispatch('downloads_save', { path: 'out/talk.zh-Hans.srt', name: '../../-字幕:中文' }, principal)) as Record<
      string,
      unknown
    >;
    expect(named.path).toBe(path.join(downloads, '字幕 中文.srt'));
  });

  it('不生成审批就拒绝：绝对路径、..、符号链接（文件与目录）、目录、不存在、视频目录与 .bcut、超过上限', async () => {
    const outside = path.join(tmp, 'secret.txt');
    await fs.writeFile(outside, 'secret');
    await fs.symlink(outside, path.join(root, 'link.txt'));
    await fs.symlink(tmp, path.join(root, 'up'));
    await fs.mkdir(path.join(root, 'dir'));
    await fs.mkdir(path.join(root, 'clip', 'blobs'), { recursive: true });
    await fs.writeFile(path.join(root, 'clip', 'video.db'), '');
    await fs.writeFile(path.join(root, 'clip', 'blobs', 'a.bin'), 'x');
    await fs.mkdir(path.join(root, '.bcut'));
    await fs.writeFile(path.join(root, '.bcut', 'state.json'), '{}');
    await fs.writeFile(path.join(root, 'big.txt'), 'x'.repeat(100));

    const { scope, confirmed } = fakeScope();
    const tools = new DownloadTools({ scope, downloadsDirectory: () => downloads });
    const save = (args: Record<string, unknown>) => rejected(tools.dispatch('downloads_save', args, principal));
    expect(await save({ path: outside })).toBe('PATH_OUTSIDE_WORKSPACE');
    expect(await save({ path: '../secret.txt' })).toBe('PATH_OUTSIDE_WORKSPACE');
    expect(await save({ path: 'dir/../../secret.txt' })).toBe('PATH_OUTSIDE_WORKSPACE');
    expect(await save({ path: 'link.txt' })).toBe('PATH_IS_SYMLINK');
    expect(await save({ path: 'up/secret.txt' })).toBe('PATH_OUTSIDE_WORKSPACE');
    expect(await save({ path: 'dir' })).toBe('NOT_A_FILE');
    expect(await save({ path: '.' })).toBe('PATH_OUTSIDE_WORKSPACE');
    expect(await save({ path: 'missing.txt' })).toBe('FILE_NOT_FOUND');
    expect(await save({ path: 'clip/video.db' })).toBe('PATH_INSIDE_VIDEO');
    expect(await save({ path: 'clip/blobs/a.bin' })).toBe('PATH_INSIDE_VIDEO');
    expect(await save({ path: '.bcut/state.json' })).toBe('PATH_INSIDE_VIDEO');
    expect(await rejected(prepareDownloadSave({ root, path: 'big.txt', downloadsDir: downloads, maxBytes: 10 }))).toBe('FILE_TOO_LARGE');
    expect(confirmed).toHaveLength(0);
    await expect(fs.stat(downloads)).rejects.toThrow();

    // 规划模式（只读）：写操作在授权时拒绝。
    const plan = new DownloadTools({ scope: fakeScope(false).scope, downloadsDirectory: () => downloads });
    expect(await rejected(plan.dispatch('downloads_save', { path: 'big.txt' }, principal))).toBe('PLAN_ONLY');
  });

  it('下载目录里已有同名的符号链接：不跟随、不覆盖，换下一个序号', async () => {
    await fs.writeFile(path.join(root, 'notes.txt'), 'mine');
    await fs.mkdir(downloads);
    const victim = path.join(tmp, 'victim.txt');
    await fs.writeFile(victim, 'keep');
    await fs.symlink(victim, path.join(downloads, 'notes.txt'));
    const plan = await prepareDownloadSave({ root, path: 'notes.txt', downloadsDir: downloads });
    const saved = await plan.commit();
    expect(saved).toMatchObject({ path: path.join(downloads, 'notes-2.txt'), bytes: 4 });
    expect(await fs.readFile(victim, 'utf8')).toBe('keep');
  });

  it('检查之后源被换成符号链接：拒绝', async () => {
    await fs.writeFile(path.join(root, 'notes.txt'), 'mine');
    const plan = await prepareDownloadSave({ root, path: 'notes.txt', downloadsDir: downloads });
    await fs.rm(path.join(root, 'notes.txt'));
    await fs.writeFile(path.join(tmp, 'secret.txt'), 'secret');
    await fs.symlink(path.join(tmp, 'secret.txt'), path.join(root, 'notes.txt'));
    expect(await rejected(plan.commit())).toBe('PATH_IS_SYMLINK');
  });

  it('文件名：去掉分隔符、控制字符与开头的 . 和 -；扩展名沿用源文件的；连扩展名不超过 120 个字符', () => {
    expect(downloadFileName('talk.zh-Hans', '.srt')).toBe('talk.zh-Hans.srt');
    expect(downloadFileName('talk.SRT', '.srt')).toBe('talk.SRT');
    expect(downloadFileName('.hidden', '.txt')).toBe('hidden.txt');
    expect(downloadFileName('-rf', '.txt')).toBe('rf.txt');
    expect(downloadFileName('a/b\\c\u0000d', '.txt')).toBe('a b c d.txt');
    expect(downloadFileName('..', '.txt')).toBe('download.txt');
    expect(downloadFileName('.srt', '.srt')).toBe('srt.srt');
    expect(downloadFileName('notes', '')).toBe('notes');
    expect(downloadFileName('notes', '.weird ext')).toBe('notes');
    const long = downloadFileName('长'.repeat(300), '.srt');
    expect([...long]).toHaveLength(120);
    expect(long.endsWith('.srt')).toBe(true);
  });
});
