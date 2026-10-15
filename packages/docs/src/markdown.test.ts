// markdown ⇄ 正文：智能体写的 markdown（含 chip）转结构化节点，块导出成 markdown。
import { describe, expect, it } from 'vitest';
import { blocksToMarkdown, markdownToWire, normalizeChip } from './markdown.ts';
import { OpError } from './op-error.ts';
import type { ProseBlock } from './prose-document.ts';

describe('markdownToWire', () => {
  it('标题、段落、格式与链接', () => {
    const nodes = markdownToWire('# 标题\n\n普通 **粗** *斜* ~~删~~ `码` [链](https://a.example)');
    expect(nodes[0]).toEqual({ type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: '标题' }] });
    const content = nodes[1]!.content!;
    expect(content.map((node) => node.text)).toEqual(['普通 ', '粗', ' ', '斜', ' ', '删', ' ', '码', ' ', '链']);
    expect(content[1]!.marks).toEqual([{ type: 'bold' }]);
    expect(content[7]!.marks).toEqual([{ type: 'code' }]);
    expect(content[9]!.marks).toEqual([{ type: 'link', attrs: { href: 'https://a.example' } }]);
  });

  it('软换行是空格，硬换行与 <br> 是换行，<u> <mark> 是下划线与高亮', () => {
    const [paragraph] = markdownToWire('一\n二  \n三<br>四 <u>下</u><mark>亮</mark>');
    const content = paragraph!.content!;
    expect(content[0]).toEqual({ type: 'text', text: '一 二' });
    expect(content.filter((node) => node.type === 'hardBreak')).toHaveLength(2);
    expect(content.find((node) => node.text === '下')!.marks).toEqual([{ type: 'underline' }]);
    expect(content.find((node) => node.text === '亮')!.marks).toEqual([{ type: 'highlight' }]);
  });

  it('列表：无序、有序（起始编号）、清单（勾选）', () => {
    const [bullet, ordered, check] = markdownToWire('- a\n- b\n\n3. x\n4. y\n\n- [x] 完成\n- [ ] 未完成');
    expect(bullet).toMatchObject({ type: 'list', attrs: { kind: 'bullet' }, content: [{ type: 'listItem' }, { type: 'listItem' }] });
    expect(ordered).toMatchObject({ type: 'list', attrs: { kind: 'ordered', start: 3 } });
    expect(check).toMatchObject({ type: 'list', attrs: { kind: 'check' }, content: [{ attrs: { checked: true } }, { attrs: { checked: false } }] });
  });

  it('GFM 表格：第一行是表头，列对齐写进单元格', () => {
    const [table] = markdownToWire('| 名称 | 数量 |\n| :-- | --: |\n| 苹果 | 3 |');
    expect(table).toMatchObject({
      type: 'table',
      content: [
        { type: 'tableRow', content: [{ type: 'tableHeader' }, { type: 'tableHeader', attrs: { align: 'right' } }] },
        { type: 'tableRow', content: [{ type: 'tableCell' }, { type: 'tableCell', attrs: { align: 'right' } }] },
      ],
    });
  });

  it('代码块、引用、分隔线、图片', () => {
    const nodes = markdownToWire('```ts\nconst a = 1;\n```\n\n> 引用\n\n---\n\n![图](blob/abc)');
    expect(nodes.map((node) => node.type)).toEqual(['codeBlock', 'blockquote', 'horizontalRule', 'paragraph']);
    expect(nodes[0]).toMatchObject({ attrs: { language: 'ts' }, content: [{ type: 'text', text: 'const a = 1;' }] });
    expect(nodes[3]!.content![0]).toEqual({ type: 'image', attrs: { src: 'blob/abc', alt: '图' } });
  });

  it('chip：行内的日期、提及夹在文字里；块级的待写块独占一行', () => {
    const chips = {
      asof: normalizeChip({ type: 'date', value: '2026-10-14' }, 'asof'),
      me: normalizeChip({ type: 'mention', user: 'me' }, 'me'),
      s1: normalizeChip({ type: 'pending', intent: '目标' }, 's1'),
      s2: normalizeChip({ type: 'pending', intent: '风险' }, 's2'),
    };
    const nodes = markdownToWire('# 标题\n\n<?claude block asof?> · <?claude block me?>\n\n<?claude block s1?>\n<?claude block s2?>', chips);
    expect(nodes.map((node) => node.type)).toEqual(['heading', 'paragraph', 'pending', 'pending']);
    expect(nodes[1]!.content).toEqual([
      { type: 'date', attrs: { value: '2026-10-14' } },
      { type: 'text', text: ' · ' },
      { type: 'mention', attrs: { user: 'me' } },
    ]);
    expect(nodes[3]).toEqual({ type: 'pending', attrs: { intent: '风险' } });
  });

  it('列表项里的 chip 不会被当成 HTML 吞掉后面的文字', () => {
    const [list] = markdownToWire('- <?claude block d?> 上线 **完成**', { d: { type: 'date', attrs: { value: '2026-01-01' } } });
    const paragraph = list!.content![0]!.content![0]!;
    expect(paragraph.content!.map((node) => node.type)).toEqual(['date', 'text', 'text']);
    expect(paragraph.content![2]).toMatchObject({ text: '完成', marks: [{ type: 'bold' }] });
  });

  it('代码里的 chip 原样保留；表里没有的 chip、和文字同行的块级 chip 被拒', () => {
    expect(markdownToWire('`<?claude block x?>`')[0]!.content![0]!.text).toBe('<?claude block x?>');
    expect(() => markdownToWire('<?claude block nope?>', {})).toThrow(OpError);
    expect(() => markdownToWire('前面 <?claude block p?>', { p: { type: 'pending', attrs: { intent: 'x' } } })).toThrow(/单独占一行/);
  });

  it('清空用的空段落 chip', () => {
    expect(markdownToWire('<?claude block empty?>', { empty: normalizeChip({ type: 'paragraph' }, 'empty') })).toEqual([{ type: 'paragraph' }]);
  });
});

describe('blocksToMarkdown', () => {
  const char = (id: string, ch: string, marks: string[] = [], href?: string) => ({ kind: 'char' as const, id, char: ch, marks, ...(href ? { href } : {}) });
  const text = (prefix: string, value: string, marks: string[] = [], href?: string) => Array.from(value).map((ch, index) => char(`${prefix}.${index}`, ch, marks, href));

  it('标题、嵌套格式、链接、提及、日期、下拉、图片', () => {
    const blocks: ProseBlock[] = [
      { type: 'paragraph', id: 'a.1', rev: 1, heading: 2, items: text('h', '计划') },
      {
        type: 'paragraph',
        id: 'b.1',
        rev: 1,
        items: [
          ...text('p', '粗', ['bold']),
          ...text('q', '粗斜', ['bold', 'italic']),
          ...text('s', ' '),
          ...text('r', '链接', [], 'https://a.example'),
          { kind: 'mention', id: 'm.1', user: 'claude' },
          { kind: 'date', id: 'd.1', value: '2026-10-14' },
          { kind: 'dropdown', id: 'x.1', enum: 'e.1', index: 1 },
          { kind: 'media', id: 'i.1', blob: 'blob/abc', alt: '图' },
        ],
      },
    ];
    const markdown = blocksToMarkdown(blocks, { dropdownLabel: (id, index) => (id === 'e.1' && index === 1 ? '进行中' : undefined) });
    expect(markdown).toBe('## 计划\n\n**粗*粗斜*** [链接](https://a.example)@Claude2026-10-14进行中![图](blob/abc)\n');
  });

  it('列表、清单、表格、代码、引用、待写块', () => {
    const paragraph = (id: string, value: string): ProseBlock => ({ type: 'paragraph', id, rev: 1, items: text(id, value) });
    const blocks: ProseBlock[] = [
      { type: 'list', id: 'l.1', rev: 1, kind: 'check', children: [{ type: 'listItem', id: 'l.2', rev: 1, checked: true, children: [paragraph('l.3', '完成')] }] },
      { type: 'list', id: 'o.1', rev: 1, kind: 'ordered', start: 3, children: [{ type: 'listItem', id: 'o.2', rev: 1, children: [paragraph('o.3', '三')] }] },
      {
        type: 'table',
        id: 't.1',
        rev: 1,
        children: [
          { type: 'tableRow', id: 't.2', rev: 1, children: [{ type: 'cell', id: 't.3', rev: 1, header: true, children: [paragraph('t.4', '名')] }, { type: 'cell', id: 't.5', rev: 1, header: true, align: 'right', children: [paragraph('t.6', '数')] }] },
          { type: 'tableRow', id: 't.7', rev: 1, children: [{ type: 'cell', id: 't.8', rev: 1, children: [paragraph('t.9', '甲'), paragraph('t.10', '乙')] }, { type: 'cell', id: 't.11', rev: 1, children: [paragraph('t.12', '1')] }] },
        ],
      },
      { type: 'codeBlock', id: 'c.1', rev: 1, language: 'ts', items: [...text('c', 'a'), { kind: 'break', id: 'c.9' }, ...text('k', 'b')] },
      { type: 'blockquote', id: 'q.1', rev: 1, children: [paragraph('q.2', '引')] },
      { type: 'pending', id: 'w.1', rev: 1, intent: '风险 -- 待写' },
      { type: 'rule', id: 'r.1', rev: 1 },
    ];
    expect(blocksToMarkdown(blocks)).toBe(
      ['- [x] 完成', '', '3. 三', '', '| 名      |  数 |', '| ------ | -: |', '| 甲<br>乙 |  1 |', '', '```ts\na\nb\n```', '', '> 引', '', '<!-- pending: 风险 - 待写 -->', '', '---', ''].join('\n'),
    );
  });

  it('导出再读回来，结构一致', () => {
    const markdown = '# 标题\n\n- a\n- b\n\n| x | y |\n| - | - |\n| 1 | 2 |\n';
    const nodes = markdownToWire(markdown);
    expect(nodes.map((node) => node.type)).toEqual(['heading', 'list', 'table']);
  });
});
