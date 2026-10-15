import { mkdir, mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createDocsConnector, DocsRefusal, type DocsConnector } from './connector.ts';
import { DocsServer } from './server.ts';

const actor = { id: 'claude', name: 'Agent' };

interface BlockRow {
  type: string;
  id: string;
  h: string;
  text: string;
}

/** 读回来的 xml 里的块（`.N` 补上会话前缀）。 */
function blocksOf(xml: string): BlockRow[] {
  const prefix = /id='([a-z0-9]+)\./.exec(xml)?.[1] ?? '';
  return [...xml.matchAll(/<(\w+) id='([^']+)' h='([^']+)'[^>]*>(?:<text id='[^']+'>([^<]*))?/g)].map((match) => ({
    type: match[1]!,
    id: match[2]!.startsWith('.') ? prefix + match[2] : match[2]!,
    h: match[3]!,
    text: match[4] ?? '',
  }));
}

async function refusal(work: Promise<unknown>): Promise<DocsRefusal> {
  try {
    await work;
  } catch (error) {
    if (error instanceof DocsRefusal) return error;
    throw error;
  }
  throw new Error('expected a refusal');
}

const PLAN = '# Plan\n\nDue <?claude block d?> for sure.\n\nAlpha beta gamma.\n\n| A | B |\n| --- | --- |\n| 1 | 2 |\n| 3 | 4 |';

let root: string;
let dir: string;
let server: DocsServer;
let docs: DocsConnector;

beforeEach(async () => {
  root = await mkdtemp(path.join(os.tmpdir(), 'baocut-docs-connector-'));
  dir = path.join(root, 'plan');
  await mkdir(dir);
  server = new DocsServer({ editorDist: () => null });
  docs = createDocsConnector(server);
});

afterEach(async () => {
  await server.close();
  await rm(root, { recursive: true, force: true });
});

async function birthPlan() {
  await docs.batch(dir, { container: { kind: 'project', create: { name: 'Plan', doc: { blocks: { d: { type: 'date', value: '2026-10-14' } }, markdown: PLAN } } }, batch: [] }, actor);
  const project = (await docs.read(dir, {}, actor)) as { id: string; files: { id: string; content: { id: string } }[] };
  const ref = { object: 'node', id: project.files[0]!.content.id };
  const full = (await docs.read(dir, { ref }, actor)) as { rev: number; xml: string };
  const blocks = blocksOf(full.xml);
  const find = (type: string, text: string) => blocks.find((block) => block.type === type && block.text.startsWith(text))!;
  return { project, ref, full, blocks, find };
}

describe('新建', () => {
  it('骨架：待写块各有 key，回执是大纲，填一节时提示待写块结束', async () => {
    const born = (await docs.batch(
      dir,
      {
        container: {
          kind: 'project',
          create: {
            name: 'Q3 plan',
            doc: {
              blocks: { asof: { type: 'date', value: '2026-10-14' }, s1: { type: 'pending', intent: 'Goals' }, s2: { type: 'pending', intent: 'Risks' } },
              markdown: '# Q3 plan\n\n<?claude block asof?>\n\n<?claude block s1?>\n\n<?claude block s2?>',
            },
          },
        },
        batch: [],
      },
      actor,
    )) as { created: { id: string; name: string }; keys: Record<string, string>; n: { xml: string } };
    expect(born.created.name).toBe('Q3 plan');
    expect(Object.keys(born.keys).sort()).toEqual(['asof', 's1', 's2']);
    expect(born.n.xml).toContain('<pending');

    const s1 = born.keys['s1']!;
    const project = (await docs.read(dir, {}, actor)) as { files: { content: { id: string } }[] };
    const ref = { object: 'node', id: project.files[0]!.content.id };
    const filled = (await docs.update(
      dir,
      { ref, payload: { ops: [{ op: 'replace', target: { kind: 'blocks', ids: [s1] }, with: { from: { kind: 'inline', content: '## Goals\n\nShip it.' }, as: 'markdown' } }] } },
      actor,
    )) as { notices?: { code: string }[] };
    expect(filled.notices?.map((notice) => notice.code)).toContain('pending_ended');

    const markdown = await docs.exportMarkdown(dir, {});
    expect(JSON.stringify(markdown)).toContain('Ship it.');
    expect(JSON.stringify(markdown)).toContain('pending: Risks');
  });

  it('目录已经是文档时拒绝再建；container 不对时 absent', async () => {
    await birthPlan();
    const again = await refusal(docs.batch(dir, { container: { kind: 'project', create: { name: 'Again', doc: { markdown: 'x' } } }, batch: [] }, actor));
    expect(again.code).toBe('exists');
    const wrong = await refusal(docs.read(dir, { container: { kind: 'project', id: 'nope' } }, actor));
    expect(wrong.code).toBe('absent');
  });

  it('写盘后换一个服务重新载入，正文一致', async () => {
    const { ref, full } = await birthPlan();
    await server.close();
    server = new DocsServer({ editorDist: () => null });
    docs = createDocsConnector(server);
    const again = (await docs.read(dir, { ref }, actor)) as { rev: number; xml: string };
    expect(again.rev).toBe(full.rev);
    expect(blocksOf(again.xml).map((block) => block.text)).toEqual(blocksOf(full.xml).map((block) => block.text));
  });
});

describe('读', () => {
  it('文档：标签页与未解决的评论数；大纲、搜索、atRev', async () => {
    const { project, ref } = await birthPlan();
    expect(project).toMatchObject({ name: 'Plan', files: [{ name: 'Plan' }] });
    const outline = (await docs.read(dir, { ref, payload: { projection: 'outline' } }, actor)) as { xml: string };
    expect(outline.xml).toContain('Alpha beta gamma.');
    expect(outline.xml).not.toContain('<text');
    const search = (await docs.read(dir, { ref, payload: { kind: 'search', text: 'beta' } }, actor)) as { xml: string };
    expect(search.xml).toContain('<hit');
    const old = (await docs.read(dir, { ref, payload: { atRev: 1 } }, actor)) as { xml: string };
    expect(old.xml).not.toContain('Alpha');
  });

  it('图表等引擎不支持', async () => {
    await birthPlan();
    const chart = await refusal(docs.create(dir, { object: 'node', engine: 'chart', payload: {} }, actor));
    expect(chart.code).toBe('unsupported');
  });
});

describe('改正文', () => {
  it('整块 replace / delete 要 guard；guard 不对时给出现在的样子', async () => {
    const { ref, full, find } = await birthPlan();
    const alpha = find('paragraph', 'Alpha');
    const missing = await refusal(docs.update(dir, { ref, payload: { ops: [{ op: 'delete', target: { kind: 'blocks', ids: [alpha.id] } }] } }, actor));
    expect(missing.code).toBe('missing_guard');
    const mismatch = await refusal(
      docs.update(dir, { ref, payload: { ops: [{ op: 'delete', target: { kind: 'blocks', ids: [alpha.id] }, ifHash: 'deadbeef', ifRev: full.rev }] } }, actor),
    );
    expect(mismatch.code).toBe('guard_mismatch');
    expect(mismatch.details).toMatchObject({ id: alpha.id, h: alpha.h });

    const reworded = (await docs.update(
      dir,
      {
        ref,
        payload: { ops: [{ op: 'replace', target: { kind: 'blocks', ids: [alpha.id] }, ifHash: alpha.h, ifRev: full.rev, with: { from: { kind: 'inline', content: 'Alpha BETA gamma.' }, as: 'text' } }] },
      },
      actor,
    )) as { changed: boolean; xml: string };
    expect(reworded.changed).toBe(true);
    expect(reworded.xml).toContain('Alpha BETA gamma.');
    // 按字改写：块 id 不变
    expect(reworded.xml).toContain(alpha.id);
  });

  it('replace 会丢掉 chip 时拒绝（dropped）', async () => {
    const { ref, find } = await birthPlan();
    const due = find('paragraph', 'Due');
    const dropped = await refusal(
      docs.update(dir, { ref, payload: { ops: [{ op: 'replace', target: { kind: 'blocks', ids: [due.id] }, force: true, with: { from: { kind: 'inline', content: 'Due soon.' }, as: 'markdown' } }] } }, actor),
    );
    expect(dropped.code).toBe('dropped');
    expect(dropped.details).toMatchObject({ chips: ['date:2026-10-14'] });
  });

  it('find：没找到、多处命中、nth 选第几处', async () => {
    const { ref } = await birthPlan();
    const none = await refusal(docs.update(dir, { ref, payload: { ops: [{ op: 'format', target: { kind: 'find', text: 'zeta' }, add: [{ type: 'bold' }] }] } }, actor));
    expect(none.code).toBe('find_none');
    const ambiguous = await refusal(docs.update(dir, { ref, payload: { ops: [{ op: 'format', target: { kind: 'find', text: 'a' }, add: [{ type: 'bold' }] }] } }, actor));
    expect(ambiguous.code).toBe('find_ambiguous');
    expect(ambiguous.details).toMatchObject({ count: 5 });
    const bold = (await docs.update(dir, { ref, payload: { ops: [{ op: 'format', target: { kind: 'find', text: 'gamma', nth: 1 }, add: [{ type: 'bold' }] }] } }, actor)) as { changed: boolean };
    expect(bold.changed).toBe(true);
    const view = (await docs.read(dir, { ref }, actor)) as { xml: string };
    expect(view.xml).toMatch(/<text id='[^']+' marks='bold'>gamma<\/text>/);
  });

  it('评论挂着的字被删光要 allowDetach，删后线程保持打开并提示 detached', async () => {
    const { ref, project } = await birthPlan();
    const comment = (await docs.create(dir, { object: 'utterance', payload: { value: { parent: { object: 'node', id: ref.id, anchor: { kind: 'find', text: 'gamma' } }, body: 'Check' } } }, actor)) as { id: string };
    expect(comment.id).toBeTruthy();
    const threads = (await docs.query(dir, { object: 'utterance', payload: { under: { object: 'file', id: project.files[0]!.id } } }, actor)) as { rows?: unknown[] };
    expect(JSON.stringify(threads)).toContain('gamma');

    const blocked = await refusal(docs.update(dir, { ref, payload: { ops: [{ op: 'delete', target: { kind: 'find', text: 'gamma' } }] } }, actor));
    expect(blocked.code).toBe('anchors_affected');
    expect(blocked.details).toMatchObject({ threads: [comment.id] });
    const detached = (await docs.update(dir, { ref, payload: { ops: [{ op: 'delete', target: { kind: 'find', text: 'gamma' }, allowDetach: true }] } }, actor)) as {
      notices?: { code: string; threads?: string[] }[];
    };
    expect(detached.notices).toContainEqual(expect.objectContaining({ code: 'detached', threads: [comment.id] }));
    expect(((await docs.read(dir, {}, actor)) as { openThreads: number }).openThreads).toBe(1);
  });

  it('表格：整格 replace 要 ifRev，越界给出形状；each 给每行加一列', async () => {
    const { ref, full, find } = await birthPlan();
    const table = find('table', '');
    const cell = (row: number) => ({ op: 'replace', target: { kind: 'cell', table: table.id, row, col: 1 }, with: { from: { kind: 'inline', content: 'two' }, as: 'markdown' } });
    expect((await refusal(docs.update(dir, { ref, payload: { ops: [cell(1)] } }, actor))).code).toBe('missing_guard');
    const outside = await refusal(docs.update(dir, { ref, payload: { ops: [{ ...cell(9), ifRev: full.rev }] } }, actor));
    expect(outside.code).toBe('cell_none');
    expect(outside.details).toMatchObject({ rows: 3, cols: 2 });
    await docs.update(dir, { ref, payload: { ops: [{ ...cell(1), ifRev: full.rev }] } }, actor);

    const view = (await docs.read(dir, { ref, payload: { kind: 'view', parentId: table.id } }, actor)) as { xml: string };
    expect(view.xml).toContain('>two<');
    const rows = blocksOf(view.xml).filter((block) => block.type === 'row').map((block) => block.id);
    expect(rows).toHaveLength(3);
    const insert = { op: 'insert', target: { kind: 'blocks', ids: rows }, side: 'end', source: { from: { kind: 'inline', content: 'C' }, as: 'markdown' } };
    expect((await refusal(docs.update(dir, { ref, payload: { ops: [insert] } }, actor))).code).toBe('place_arity');
    await docs.update(dir, { ref, payload: { ops: [{ ...insert, each: true }] } }, actor);
    const widened = (await docs.read(dir, { ref, payload: { kind: 'view', parentId: table.id } }, actor)) as { xml: string };
    expect(blocksOf(widened.xml).filter((block) => block.type === 'cell')).toHaveLength(9);
  });

  it('restore：ifRev 要是最新的，回到旧修订', async () => {
    const { ref, full, find } = await birthPlan();
    const alpha = find('paragraph', 'Alpha');
    await docs.update(
      dir,
      { ref, payload: { ops: [{ op: 'replace', target: { kind: 'blocks', ids: [alpha.id] }, ifHash: alpha.h, ifRev: full.rev, with: { from: { kind: 'inline', content: 'Changed.' }, as: 'markdown' } }] } },
      actor,
    );
    const latest = (await docs.read(dir, { ref, payload: { projection: 'outline' } }, actor)) as { rev: number; xml: string };
    expect(latest.xml).toContain('Changed.');
    const stale = await refusal(docs.update(dir, { ref, payload: { ifRev: latest.rev - 1, ops: [{ op: 'restore', rev: full.rev }] } }, actor));
    expect(stale.code).toBe('guard_mismatch');
    const restored = (await docs.update(dir, { ref, payload: { ifRev: latest.rev, ops: [{ op: 'restore', rev: full.rev }] } }, actor)) as { xml: string; notices?: { code: string }[] };
    expect(restored.xml).toContain('Alpha beta gamma.');
    expect(restored.notices).toContainEqual(expect.objectContaining({ code: 'restored', from: full.rev }));
  });
});

describe('标签页、素材与导出', () => {
  it('一个 batch 加标签页：建 file、建正文、挂上、放进 tabs', async () => {
    const { project } = await birthPlan();
    const result = (await docs.batch(
      dir,
      {
        container: { kind: 'project', id: project.id },
        batch: [
          { $lid: 'f', verb: 'create', object: 'file', payload: { value: { birthName: 'Sources.ldoc' } } },
          {
            $lid: 'n',
            verb: 'create',
            object: 'node',
            engine: 'prose',
            payload: { parent: { object: 'file', id: '$lid:f' }, source: { as: 'markdown', from: { kind: 'inline', content: '# Sources\n\n- Vendor pricing' } } },
          },
          { verb: 'update', ref: { object: 'file', id: '$lid:f' }, payload: { kind: 'value', value: { birthName: 'Sources.ldoc', content: { kind: 'node', id: '$lid:n' } } } },
          {
            verb: 'update',
            ref: { object: 'project', id: project.id },
            payload: {
              kind: 'patch',
              patch: [
                { op: 'set', path: ['tabs', '$lid:f'], value: { name: 'Sources', order: 'a1' } },
                { op: 'set', path: ['tabs', project.files[0]!.id, 'order'], value: 'a0' },
              ],
            },
          },
        ],
      },
      actor,
    )) as { lids: Record<string, string> };
    const after = (await docs.read(dir, {}, actor)) as { files: { id: string; name: string; hidden?: boolean }[] };
    expect(after.files.map((file) => file.name)).toEqual(['Plan', 'Sources']);
    expect(after.files[1]).toMatchObject({ id: result.lids['f'] });
    expect(after.files[1]!.hidden).toBeUndefined();
    const markdown = await docs.exportMarkdown(dir, { tab: result.lids['f'] });
    expect(JSON.stringify(markdown)).toContain('Vendor pricing');
  });

  it('上传素材：按内容寻址，回执给 blob 地址', async () => {
    await birthPlan();
    const uploaded = await docs.upload(dir, { bytes: new Uint8Array([137, 80, 78, 71, 1, 2, 3]), contentType: 'image/png', name: 'x.png' }, actor);
    expect(uploaded).toMatchObject({ blob: `blob/${uploaded.id}`, bytes: 7, contentType: 'image/png', name: 'x.png' });
  });
});
