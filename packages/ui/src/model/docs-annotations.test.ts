import { describe, expect, it } from 'vitest';
import { DOCS_ANNOTATION_LIMITS } from '@baocut/protocol';
import { addDocsAnnotation, docsRevealId, removeDocsAnnotation, sentDocsAnnotations, type DraftDocsAnnotation } from './docs-annotations.ts';

const doc = { conversationId: 'c1', path: 'launch-plan' };
const other = { conversationId: 'c1', path: 'retro' };
const note = (over: Partial<DraftDocsAnnotation> = {}): DraftDocsAnnotation => ({
  id: 'n1',
  doc,
  kind: 'comment',
  path: 'f-t1#body/b3;thread=c9',
  label: '计划 › "500 weekly active teams"',
  quote: '500 weekly active teams',
  text: '这个数字从哪来？',
  ...over,
});

describe('docs-annotations', () => {
  it('加一条：正文与原文去掉首尾空白；空的、超长的、超过条数的不收', () => {
    const one = addDocsAnnotation([], note({ text: '  有出处吗 \n', quote: ' 原文 ' }));
    expect(one.error).toBeNull();
    expect(one.list[0]!.text).toBe('有出处吗');
    expect(one.list[0]!.quote).toBe('原文');
    expect(addDocsAnnotation([], note({ quote: '  ' })).list[0]).not.toHaveProperty('quote');
    expect(addDocsAnnotation([], note({ text: '   ' })).error).toBe('empty');
    expect(addDocsAnnotation([], note({ text: 'x'.repeat(DOCS_ANNOTATION_LIMITS.text + 1) })).error).toBe('too-long');
    expect(addDocsAnnotation([], note({ text: 'x'.repeat(DOCS_ANNOTATION_LIMITS.text) })).error).toBeNull();
    const full = Array.from({ length: DOCS_ANNOTATION_LIMITS.perMessage }, (_, i) => note({ id: `n${i}`, path: `f-t1#body/b${i}` }));
    const over = addDocsAnnotation(full, note({ id: 'extra', path: 'f-t2#body/x' }));
    expect(over.error).toBe('too-many');
    expect(over.list).toBe(full);
  });

  it('同一份文档、同一种、同一个位置再发一次时换成新的，id 与位置不变；别的文档、别的种类照常新加', () => {
    const list = [note(), note({ id: 'n2', kind: 'ask', path: 'f-t1#body/b7', quote: undefined, text: '补一段风险' })];
    const again = addDocsAnnotation(list, note({ id: 'n3', text: '又追问了一句' }));
    expect(again.error).toBeNull();
    expect(again.list.map((n) => [n.id, n.text])).toEqual([
      ['n1', '又追问了一句'],
      ['n2', '补一段风险'],
    ]);
    expect(addDocsAnnotation(list, note({ id: 'n4', doc: other })).list.map((n) => n.id)).toEqual(['n1', 'n2', 'n4']);
    expect(addDocsAnnotation(list, note({ id: 'n5', kind: 'ask' })).list.map((n) => n.id)).toEqual(['n1', 'n2', 'n5']);
    // 满了也能换掉已有的那条
    const full = Array.from({ length: DOCS_ANNOTATION_LIMITS.perMessage }, (_, i) => note({ id: `n${i}`, path: `f-t1#body/b${i}` }));
    expect(addDocsAnnotation(full, note({ id: 'x', path: 'f-t1#body/b0', text: '改' })).error).toBeNull();
  });

  it('删一条；没有这条时原样返回', () => {
    const list = [note(), note({ id: 'n2', path: 'f-t1#body/b4' })];
    expect(removeDocsAnnotation(list, 'missing')).toBe(list);
    expect(removeDocsAnnotation(list, 'n1').map((n) => n.id)).toEqual(['n2']);
  });

  it('交出去的那一份去掉 id，没有原文时不带 quote', () => {
    expect(sentDocsAnnotations([note(), note({ id: 'n2', kind: 'ask', path: 'f-t2#body/b1', quote: undefined, text: '写个总结' })])).toEqual([
      { doc, kind: 'comment', path: 'f-t1#body/b3;thread=c9', label: '计划 › "500 weekly active teams"', quote: '500 weekly active teams', text: '这个数字从哪来？' },
      { doc, kind: 'ask', path: 'f-t2#body/b1', label: '计划 › "500 weekly active teams"', text: '写个总结' },
    ]);
  });

  it('跳转用的 id：线程优先，其次块、正文节点；不是路径写法时用原文，太长不跳', () => {
    expect(docsRevealId('f-t1#body/b3;thread=c9')).toBe('c9');
    expect(docsRevealId('f-t1#body/b3/12')).toBe('b3');
    expect(docsRevealId('f-t1#body')).toBe('body');
    expect(docsRevealId('anything')).toBe('anything');
    expect(docsRevealId('x'.repeat(101))).toBeNull();
    expect(docsRevealId(`f-t1#body/${'b'.repeat(150)}`)).toBeNull();
  });
});
