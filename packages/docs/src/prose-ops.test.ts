// 编辑操作：用编辑器真实发出的 op 形状（取自本地服务日志）验证落地结果与 id 分配。
import { describe, expect, it } from 'vitest';
import { charIdRange } from './char-id.ts';
import { findBlock, plainText, type CharItem, type ParagraphBlock, type ProseBlock } from './prose-document.ts';
import { applyProseOps, type ApplyOptions, type ProseOp } from './prose-ops.ts';

const SESSION = 'docsession1';
const MINT = 'mintsession';

function paragraph(id: string, text: string, firstCharClock: number): ParagraphBlock {
  const ids = charIdRange(`${SESSION}.${firstCharClock}`, Array.from(text).length);
  return {
    type: 'paragraph',
    id,
    rev: 1,
    items: Array.from(text).map((char, index): CharItem => ({ kind: 'char', id: ids[index]!, char, marks: [] })),
  };
}

/** 两个段落 + 一个两项的列表。 */
function sampleDocument(): ProseBlock[] {
  return [
    paragraph(`${SESSION}.0`, '你好世界', 1),
    paragraph(`${SESSION}.10`, '第二段', 11),
    {
      type: 'list',
      id: `${SESSION}.20`,
      kind: 'bullet',
      rev: 1,
      children: [
        { type: 'listItem', id: `${SESSION}.21`, rev: 1, children: [paragraph(`${SESSION}.22`, '一项', 23)] },
        { type: 'listItem', id: `${SESSION}.30`, rev: 1, children: [paragraph(`${SESSION}.31`, '二项', 32)] },
      ],
    },
  ];
}

const options: ApplyOptions = { rev: 2, mintSession: MINT, mintFrom: 1 };

function apply(ops: ProseOp[], blocks = sampleDocument()) {
  const outcome = applyProseOps(blocks, ops, options);
  if (!outcome.ok) throw new Error(`${outcome.reason}: ${outcome.detail ?? ''}`);
  return outcome;
}

function textOf(blocks: ProseBlock[], id: string): string {
  const found = findBlock(blocks, id);
  if (!found) throw new Error(`找不到块 ${id}`);
  return plainText(found.block);
}

describe('insert', () => {
  it('在某个字后面插入文字，编辑器不带 id 时由服务端连续分配', () => {
    const outcome = apply([
      {
        op: 'insert',
        target: { kind: 'chars', range: [`${SESSION}.2`, `${SESSION}.2`] },
        side: 'after',
        source: { from: { kind: 'inline', content: '，' }, as: 'text' },
      },
    ]);
    expect(textOf(outcome.blocks, `${SESSION}.0`)).toBe('你好，世界');
    expect(outcome.results[0]?.minted).toEqual([`${MINT}.1`]);
    expect(outcome.usedIds).toContain(`${MINT}.1`);
  });

  it('插入空段落（ids 用 {from,count}），再在段首写字', () => {
    const outcome = apply([
      {
        op: 'insert',
        target: { kind: 'blocks', ids: [`${SESSION}.0`] },
        side: 'after',
        source: { from: { kind: 'inline', content: [{ type: 'paragraph' }] }, as: 'blocks' },
        ids: { from: 'editorsess1.11', count: 1 },
      },
      {
        op: 'insert',
        target: { kind: 'blocks', ids: ['editorsess1.11'] },
        side: 'start',
        source: { from: { kind: 'inline', content: '新段落' }, as: 'text' },
      },
    ]);
    expect(outcome.blocks.map((block) => block.id).slice(0, 3)).toEqual([`${SESSION}.0`, 'editorsess1.11', `${SESSION}.10`]);
    expect(textOf(outcome.blocks, 'editorsess1.11')).toBe('新段落');
    expect(outcome.results[1]?.minted).toEqual(charIdRange(`${MINT}.1`, 3));
  });
});

describe('delete / mark', () => {
  it('删除一段连续的字', () => {
    const outcome = apply([{ op: 'delete', target: { kind: 'chars', range: [`${SESSION}.3`, `${SESSION}.4`] } }]);
    expect(textOf(outcome.blocks, `${SESSION}.0`)).toBe('你好');
  });

  it('加粗只作用在区间内', () => {
    const outcome = apply([{ op: 'mark', style: 'bold', on: true, range: [`${SESSION}.12`, `${SESSION}.13`] }]);
    const block = findBlock(outcome.blocks, `${SESSION}.10`)!.block as ParagraphBlock;
    const bold = block.items.filter((item) => item.kind === 'char' && item.marks.includes('bold'));
    expect(bold.map((item) => (item as CharItem).char).join('')).toBe('二段');
  });
});

describe('块结构', () => {
  it('列表项末尾回车：block_split 带 item 时拆出新的列表项', () => {
    const outcome = apply([
      { op: 'block_split', at: `${SESSION}.24`, side: 'after', item: 'editorsess1.1', id: 'editorsess1.2' },
      {
        op: 'insert',
        target: { kind: 'blocks', ids: ['editorsess1.2'] },
        side: 'start',
        source: { from: { kind: 'inline', content: '新项' }, as: 'text' },
      },
    ]);
    const list = findBlock(outcome.blocks, `${SESSION}.20`)!.block;
    expect(list.type).toBe('list');
    expect(plainText(list).split('\n')).toEqual(['一项', '新项', '二项']);
  });

  it('block_split 带 item 时 minted 先列表项、再段落（编辑器按这个顺序给两块记 id）', () => {
    const outcome = apply([{ op: 'block_split', at: `${SESSION}.24`, side: 'after', item: 'editorsess1.1', id: 'editorsess1.2' }]);
    expect(outcome.results[0]?.minted).toEqual(['editorsess1.1', 'editorsess1.2']);
    expect(findBlock(outcome.blocks, 'editorsess1.1')!.block.type).toBe('listItem');
    expect(findBlock(outcome.blocks, 'editorsess1.2')!.block.type).toBe('paragraph');
  });

  it('列表项末尾连按两次回车再写字：拆出空项、把它提出列表，字落在两段列表之间的段落里', () => {
    const outcome = apply([
      { op: 'block_split', at: `${SESSION}.24`, side: 'after', item: 'editorsess1.1', id: 'editorsess1.2' },
      { op: 'unwrap', block: 'editorsess1.1', id: 'editorsess1.3' },
      {
        op: 'insert',
        target: { kind: 'blocks', ids: ['editorsess1.2'] },
        side: 'start',
        source: { from: { kind: 'inline', content: '新段' }, as: 'text' },
      },
    ]);
    expect(outcome.blocks.map((block) => block.id)).toEqual([`${SESSION}.0`, `${SESSION}.10`, `${SESSION}.20`, 'editorsess1.2', 'editorsess1.3']);
    expect(textOf(outcome.blocks, `${SESSION}.20`)).toBe('一项');
    expect(textOf(outcome.blocks, 'editorsess1.2')).toBe('新段');
    expect(textOf(outcome.blocks, 'editorsess1.3')).toBe('二项');
  });

  it('段首退格：block_join 把后一段并进前一段', () => {
    const outcome = apply([{ op: 'block_join', block: [`${SESSION}.0`, `${SESSION}.10`] }]);
    expect(textOf(outcome.blocks, `${SESSION}.0`)).toBe('你好世界第二段');
    expect(findBlock(outcome.blocks, `${SESSION}.10`)).toBeUndefined();
  });

  it('目标不存在时整批拒绝，原文不变', () => {
    const blocks = sampleDocument();
    const outcome = applyProseOps(blocks, [{ op: 'delete', target: { kind: 'chars', range: ['nosuchsessn.1', 'nosuchsessn.1'] } }], options);
    expect(outcome.ok).toBe(false);
    expect(textOf(blocks, `${SESSION}.0`)).toBe('你好世界');
  });
});

describe('工具栏：清单、列表、引用、分隔线、标题、日期', () => {
  it('wrap 成清单：ids 先是列表、再是列表项，新项未勾选', () => {
    const outcome = apply([
      { op: 'wrap', block: `${SESSION}.10`, in: { type: 'list', kind: 'check' }, ids: ['editorsess1.1', 'editorsess1.2'] },
    ]);
    const list = findBlock(outcome.blocks, 'editorsess1.1')!.block;
    expect(list).toMatchObject({ type: 'list', kind: 'check', children: [{ type: 'listItem', id: 'editorsess1.2', checked: false }] });
    expect(textOf(outcome.blocks, 'editorsess1.2')).toBe('第二段');
    expect(outcome.blocks[1]?.id).toBe('editorsess1.1');
  });

  it('wrap 成引用', () => {
    const outcome = apply([{ op: 'wrap', block: `${SESSION}.0`, in: { type: 'blockquote' }, ids: ['editorsess1.1'] }]);
    expect(outcome.blocks[0]).toMatchObject({ type: 'blockquote', id: 'editorsess1.1', children: [{ id: `${SESSION}.0` }] });
  });

  it('unwrap 整个列表：列表项里的段落回到原处', () => {
    const outcome = apply([{ op: 'unwrap', block: `${SESSION}.20` }]);
    expect(outcome.blocks.map((block) => block.id)).toEqual([`${SESSION}.0`, `${SESSION}.10`, `${SESSION}.22`, `${SESSION}.31`]);
  });

  it('unwrap 列表的第一项：这一项提到列表前面，剩下的项另成一个列表（id 用 op.id）', () => {
    const outcome = apply([{ op: 'unwrap', block: `${SESSION}.21`, id: 'editorsess1.1' }]);
    expect(outcome.blocks.map((block) => block.id)).toEqual([`${SESSION}.0`, `${SESSION}.10`, `${SESSION}.22`, 'editorsess1.1']);
    expect(textOf(outcome.blocks, 'editorsess1.1')).toBe('二项');
  });

  it('分隔线：插入 hr、拆段、把后半段挪到 hr 后面', () => {
    const outcome = apply([
      {
        op: 'insert',
        target: { kind: 'blocks', ids: [`${SESSION}.0`] },
        side: 'after',
        source: { from: { kind: 'inline', content: [{ type: 'horizontalRule' }] }, as: 'blocks' },
        ids: { from: 'editorsess1.1', count: 1 },
      },
      { op: 'block_split', at: `${SESSION}.3`, side: 'before', id: 'editorsess1.2' },
      { op: 'block_move', block: 'editorsess1.2', before: `${SESSION}.10` },
    ]);
    expect(outcome.blocks.map((block) => block.type).slice(0, 4)).toEqual(['paragraph', 'rule', 'paragraph', 'paragraph']);
    expect(textOf(outcome.blocks, `${SESSION}.0`)).toBe('你好');
    expect(textOf(outcome.blocks, 'editorsess1.2')).toBe('世界');
  });

  it('block_move 挪出列表后，空了的列表项一并移除', () => {
    const outcome = apply([{ op: 'block_move', block: `${SESSION}.31`, after: `${SESSION}.20` }]);
    const list = findBlock(outcome.blocks, `${SESSION}.20`)!.block;
    expect(plainText(list)).toBe('一项');
    expect(findBlock(outcome.blocks, `${SESSION}.30`)).toBeUndefined();
    expect(outcome.blocks.at(-1)?.id).toBe(`${SESSION}.31`);
  });

  it('set heading：数字设为标题，null 改回正文', () => {
    const heading = apply([{ op: 'set', target: { kind: 'blocks', ids: [`${SESSION}.0`] }, attrs: { heading: 1 } }]);
    expect(heading.blocks[0]).toMatchObject({ heading: 1 });
    const body = apply([{ op: 'set', target: { kind: 'blocks', ids: [`${SESSION}.0`] }, attrs: { heading: null } }], heading.blocks);
    expect(body.blocks[0]).not.toHaveProperty('heading');
  });

  it('插入空日期，再用日期选择器选定（set 字符区间）', () => {
    const inserted = apply([
      {
        op: 'insert',
        target: { kind: 'chars', range: [`${SESSION}.2`, `${SESSION}.2`] },
        side: 'after',
        source: { from: { kind: 'inline', content: [{ type: 'date' }] }, as: 'inline' },
      },
    ]);
    const chipId = inserted.results[0]!.minted![0]!;
    const picked = apply([{ op: 'set', target: { kind: 'chars', range: [chipId, chipId] }, attrs: { type: 'date', value: '2026-10-15' } }], inserted.blocks);
    const block = findBlock(picked.blocks, `${SESSION}.0`)!.block as ParagraphBlock;
    expect(block.items.find((item) => item.kind === 'date')).toMatchObject({ value: '2026-10-15' });
  });
});

// ---------- 表格、图片、下拉、待写块、markdown ----------

function tableDocument(): ProseBlock[] {
  const cell = (id: string, text: string, clock: number, header = false) => ({
    type: 'cell' as const,
    id,
    rev: 1,
    ...(header ? { header: true } : {}),
    children: [paragraph(`${id}0`, text, clock)],
  });
  return [
    paragraph(`${SESSION}.0`, '表格前', 1),
    {
      type: 'table',
      id: 't.1',
      rev: 1,
      children: [
        { type: 'tableRow', id: 't.2', rev: 1, children: [cell('t.3', '名称', 100, true), cell('t.4', '数量', 110, true)] },
        { type: 'tableRow', id: 't.5', rev: 1, children: [cell('t.6', '苹果', 120), cell('t.7', '3', 130)] },
      ],
    },
  ];
}

describe('表格', () => {
  it('as:blocks 插入整张表：行、单元格、段落都有 id，空单元格补段落', () => {
    const outcome = apply([
      {
        op: 'insert',
        target: { kind: 'blocks', ids: [`${SESSION}.0`] },
        side: 'after',
        source: {
          from: {
            kind: 'inline',
            content: [
              {
                type: 'table',
                content: [
                  { type: 'tableRow', content: [{ type: 'tableHeader', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'A' }] }] }, { type: 'tableHeader' }] },
                  { type: 'tableRow', content: [{ type: 'tableCell', attrs: { background: '#FFEEDD', align: 'center' } }, { type: 'tableCell' }] },
                ],
              },
            ],
          },
          as: 'blocks',
        },
      },
    ]);
    const table = outcome.blocks[1]!;
    expect(table).toMatchObject({ type: 'table', children: [{ type: 'tableRow' }, { type: 'tableRow' }] });
    const cells = (table as Extract<ProseBlock, { type: 'table' }>).children.flatMap((row) => row.children);
    expect(cells.map((cell) => cell.header ?? false)).toEqual([true, true, false, false]);
    expect(cells[2]).toMatchObject({ background: '#ffeedd', align: 'center' });
    expect(cells.every((cell) => cell.children[0]?.type === 'paragraph')).toBe(true);
  });

  it('在单元格里写字、改单元格属性', () => {
    const outcome = apply(
      [
        { op: 'insert', target: { kind: 'blocks', ids: ['t.60'] }, side: 'end', source: { from: { kind: 'inline', content: '汁' }, as: 'text' } },
        { op: 'set', target: { kind: 'blocks', ids: ['t.6'] }, attrs: { background: '#00ff00', colwidth: [120] } },
      ],
      tableDocument(),
    );
    expect(textOf(outcome.blocks, 't.6')).toBe('苹果汁');
    expect(findBlock(outcome.blocks, 't.6')!.block).toMatchObject({ background: '#00ff00', colwidth: [120] });
  });

  it('删掉一整行；删掉最后一行时整张表一并移除', () => {
    const one = apply([{ op: 'delete', target: { kind: 'blocks', ids: ['t.5'] } }], tableDocument());
    expect(findBlock(one.blocks, 't.5')).toBeUndefined();
    const both = apply([{ op: 'delete', target: { kind: 'blocks', ids: ['t.2'] } }], one.blocks);
    expect(findBlock(both.blocks, 't.1')).toBeUndefined();
    expect(both.results[0]!.removed).toContain('t.1');
  });

  it('单元格里不能放表格', () => {
    const outcome = applyProseOps(
      tableDocument(),
      [
        {
          op: 'insert',
          target: { kind: 'blocks', ids: ['t.60'] },
          side: 'after',
          source: { from: { kind: 'inline', content: [{ type: 'table', content: [{ type: 'tableRow', content: [{ type: 'tableCell' }] }] }] }, as: 'blocks' },
        },
      ],
      options,
    );
    expect(outcome.ok).toBe(false);
  });
});

describe('图片、下拉、待写块、嵌入', () => {
  const blobs = new Map([['blob/abc', { mime: 'image/png', name: 'a.png' }]]);
  const withBlobs: ApplyOptions = { ...options, blobExists: (blob) => blobs.has(blob), blobInfo: (blob) => blobs.get(blob) };

  it('插入已上传的图片，mime / 文件名从 blob 记录补上', () => {
    const outcome = applyProseOps(
      sampleDocument(),
      [
        {
          op: 'insert',
          target: { kind: 'chars', range: [`${SESSION}.4`, `${SESSION}.4`] },
          side: 'after',
          source: { from: { kind: 'inline', content: [{ type: 'media', attrs: { blob: 'blob/abc', alt: '示意', dims: '640,480' } }] }, as: 'inline' },
        },
      ],
      withBlobs,
    );
    expect(outcome.ok).toBe(true);
    if (!outcome.ok) return;
    const block = outcome.blocks[0] as ParagraphBlock;
    expect(block.items.at(-1)).toMatchObject({ kind: 'media', blob: 'blob/abc', mime: 'image/png', name: 'a.png', alt: '示意', dims: { w: 640, h: 480 } });
  });

  it('引用不存在的 blob 被拒（blob_unknown），没有 blob 的图片被拒（unsupported_construct）', () => {
    const insert = (attrs: Record<string, unknown>) =>
      applyProseOps(
        sampleDocument(),
        [{ op: 'insert', target: { kind: 'chars', range: [`${SESSION}.4`, `${SESSION}.4`] }, side: 'after', source: { from: { kind: 'inline', content: [{ type: 'image', attrs }] }, as: 'inline' } }],
        withBlobs,
      );
    expect(insert({ blob: 'blob/nope' })).toMatchObject({ ok: false, reason: 'blob_unknown' });
    expect(insert({ src: 'https://example.com/a.png' })).toMatchObject({ ok: false, reason: 'unsupported_construct' });
  });

  it('下拉：插入后用 set 改选中项', () => {
    const inserted = apply([
      {
        op: 'insert',
        target: { kind: 'chars', range: [`${SESSION}.4`, `${SESSION}.4`] },
        side: 'after',
        source: { from: { kind: 'inline', content: [{ type: 'dropdown', attrs: { enum: 'status.1' } }] }, as: 'inline' },
      },
    ]);
    const id = inserted.results[0]!.minted![0]!;
    const picked = apply([{ op: 'set', target: { kind: 'chars', range: [id, id] }, attrs: { index: 2 } }], inserted.blocks);
    expect((picked.blocks[0] as ParagraphBlock).items.at(-1)).toMatchObject({ kind: 'dropdown', enum: 'status.1', index: 2 });
  });

  it('待写块：插入、改意图，再整块换成正文', () => {
    const inserted = apply([
      {
        op: 'insert',
        target: { kind: 'blocks', ids: [`${SESSION}.0`] },
        side: 'after',
        source: { from: { kind: 'inline', content: [{ type: 'pending', attrs: { intent: '风险' } }] }, as: 'blocks' },
      },
    ]);
    const pending = inserted.blocks[1]!;
    expect(pending).toMatchObject({ type: 'pending', intent: '风险' });
    // 真实服务里补发 id 的序号一直往前走；这里第二次调用换个起点
    const outcome = applyProseOps(
      inserted.blocks,
      [{ op: 'replace', target: { kind: 'blocks', ids: [pending.id] }, with: { from: { kind: 'inline', content: '## 风险\n\n可能延期' }, as: 'markdown' } }],
      { ...options, mintFrom: 100 },
    );
    if (!outcome.ok) throw new Error(outcome.reason);
    const filled = outcome;
    expect(filled.blocks.slice(1, 3)).toMatchObject([{ type: 'paragraph', heading: 2 }, { type: 'paragraph' }]);
    expect(textOf(filled.blocks, filled.blocks[2]!.id)).toBe('可能延期');
    expect(findBlock(filled.blocks, pending.id)).toBeUndefined();
  });

  it('新建图表 / 组件（embed）被拒，给出改用表格或列表的理由', () => {
    const outcome = applyProseOps(
      sampleDocument(),
      [{ op: 'insert', target: { kind: 'blocks', ids: [`${SESSION}.0`] }, side: 'after', source: { from: { kind: 'inline', content: [{ type: 'embed', attrs: { ref: 'node/x' } }] }, as: 'blocks' } }],
      options,
    );
    expect(outcome).toMatchObject({ ok: false, reason: 'unsupported_construct' });
    if (!outcome.ok) expect(outcome.detail).toContain('表格');
  });
});

describe('最终写法', () => {
  it('split 两个 id = 列表项 + 段落；join；move 到根末尾', () => {
    const split = apply([{ op: 'split', target: { kind: 'chars', range: [`${SESSION}.24`, `${SESSION}.24`] }, side: 'after', ids: ['e.1', 'e.2'] }]);
    expect(findBlock(split.blocks, 'e.1')!.block.type).toBe('listItem');
    expect(split.results[0]?.minted).toEqual(['e.1', 'e.2']);
    const joined = apply([{ op: 'join', target: { kind: 'blocks', ids: [`${SESSION}.0`, `${SESSION}.10`] } }]);
    expect(textOf(joined.blocks, `${SESSION}.0`)).toBe('你好世界第二段');
    const moved = apply([{ op: 'move', target: { kind: 'blocks', ids: [`${SESSION}.0`] }, to: { target: { kind: 'root' }, side: 'end' } }]);
    expect(moved.blocks.at(-1)!.id).toBe(`${SESSION}.0`);
  });

  it('format 加删格式，attr 改块属性', () => {
    const outcome = apply([
      { op: 'format', target: { kind: 'chars', range: [`${SESSION}.1`, `${SESSION}.2`] }, add: [{ type: 'highlight', color: 'red' }, { type: 'link', attrs: { href: 'https://a.example' } }] },
      { op: 'attr', block: `${SESSION}.20`, set: { kind: 'ordered', start: 3 } },
    ]);
    const first = (outcome.blocks[0] as ParagraphBlock).items[0] as CharItem;
    expect(first.marks).toEqual(['highlight-red']);
    expect(first.href).toBe('https://a.example');
    expect(outcome.blocks[2]).toMatchObject({ type: 'list', kind: 'ordered', start: 3 });
  });

  it('删掉全部块被拒（last_block）', () => {
    const outcome = applyProseOps(
      [paragraph(`${SESSION}.0`, '唯一', 1)],
      [{ op: 'delete', target: { kind: 'blocks', ids: [`${SESSION}.0`] } }],
      options,
    );
    expect(outcome).toMatchObject({ ok: false, reason: 'last_block' });
  });
});
