import { describe, expect, it } from 'vitest';
import type { TranslationGlossary } from '@baocut/protocol';
import { consistencyTerms, recordedTerms, termSpots, unifiedTexts } from './term-consistency.ts';
import type { PairRow, TranslationBody, TranslationUnit } from './translation-doc.ts';

const glossary = (terms: Array<[string, string]>, over: Partial<TranslationGlossary> = {}): TranslationGlossary => ({
  name: '剪辑',
  kind: 'translation',
  sourceLanguage: 'en',
  targetLanguage: 'zh-Hans',
  defaultEnabled: false,
  terms: terms.map(([source, target]) => ({ source, target, note: null })),
  ...over,
});

const unit = (id: string, text: string): TranslationUnit => ({
  id,
  sourceSentenceId: `s-${id}`,
  sourceFingerprint: '',
  naturalText: text,
  alignment: null,
  status: 'draft',
});
const row = (id: string, source: string, text: string, state: PairRow['state'] = 'ok'): PairRow => ({
  key: id,
  sentence: { id: `s-${id}`, wordIds: [], text: source, fingerprint: '' },
  unit: unit(id, text),
  state,
});
const body = (units: TranslationUnit[], recorded: Array<[string, string]> = []): TranslationBody => ({
  schema: 'baocut.translation/2',
  language: 'zh-Hans',
  sourceBasis: { speechRef: { id: 'speech', revision: 'r1' }, sequenceId: 'seq', scopeLineage: [], editViewHash: '' },
  ...(recorded.length ? { glossaryRef: { entries: [], inline: null, terms: recorded.map(([source, target]) => ({ entryId: 'g1', source, target })) } } : {}),
  units,
});

describe('术语一致的术语', () => {
  it('按启用次序、同一原文写法只取第一条；跳过没读出来的与方向不符的', () => {
    const candidates = [
      { id: 'g1', name: 'A', content: glossary([['Timeline', '时间线'], ['clip', '片段']]) },
      { id: 'g2', name: 'B', content: glossary([['timeline', '时间轴'], ['Render', '渲染']]) },
      { id: 'g3', name: 'C', content: glossary([['Track', '轨道']], { targetLanguage: 'ja' }) },
      { id: 'g4', name: 'D', content: undefined },
    ];
    expect(consistencyTerms(candidates, ['g2', 'g1', 'g3', 'g4'], 'en', 'zh-Hans')).toEqual([
      { source: 'timeline', target: '时间轴' },
      { source: 'Render', target: '渲染' },
      { source: 'clip', target: '片段' },
    ]);
  });
});

describe('翻译时记下的术语（读不到用户库时）', () => {
  it('同一原文写法只取第一条；拿它核对只找得出没翻的原文', () => {
    const units = [unit('a', '今天我们发布 Kubernetes。'), unit('b', 'price 是十美元。')];
    const doc = body(units, [['deploy', '发布'], ['Price', '价格'], ['price', '定价'], ['empty', ' ']]);
    const terms = recordedTerms(doc);
    expect(terms).toEqual([
      { source: 'deploy', target: '发布' },
      { source: 'Price', target: '价格' },
    ]);
    const rows = [row('a', 'Today we deploy Kubernetes.', units[0]!.naturalText), row('b', 'The price is ten dollars.', units[1]!.naturalText)];
    const spots = termSpots(rows, doc, terms);
    expect(spots.map((s) => [s.row.key, s.term, s.got, s.want])).toEqual([['b', 'Price', 'price', '价格']]);
  });
});

describe('术语不一致的位置', () => {
  const terms = [
    { source: 'timeline', target: '时间轴' },
    { source: 'BaoCut', target: '宝剪' },
  ];

  it('译句里还是翻译时的旧译法，或原样留着原文写法；已用了术语表译法的不列', () => {
    const rows = [
      row('a', 'Open the timeline.', '打开时间线。'),
      row('b', 'BaoCut is fast.', 'BaoCut 很快。'),
      row('c', 'The timeline again.', '又是时间轴。'),
      row('d', 'The timeline here.', '这里的时间面板。'),
    ];
    const spots = termSpots(rows, body(rows.map((r) => r.unit!), [['timeline', '时间线']]), terms);
    expect(spots.map((s) => [s.row.key, s.term, s.got, s.want])).toEqual([
      ['a', 'timeline', '时间线', '时间轴'],
      ['b', 'BaoCut', 'BaoCut', '宝剪'],
    ]);
    // 统一：同一句的几处依次替换。
    expect(unifiedTexts(spots).map((c) => [c.row.key, c.text])).toEqual([
      ['a', '打开时间轴。'],
      ['b', '宝剪 很快。'],
    ]);
  });

  it('过期、没有译文的句子不列；译法与原文写法相同的术语不算没翻', () => {
    const rows = [row('a', 'Open the timeline.', '打开时间线。', 'marked-stale'), row('b', 'Use BaoCut.', '用 BaoCut。')];
    expect(termSpots(rows, body(rows.map((r) => r.unit!), [['timeline', '时间线']]), terms)).toEqual([
      expect.objectContaining({ term: 'BaoCut' }),
    ]);
    expect(termSpots(rows, body(rows.map((r) => r.unit!)), [{ source: 'BaoCut', target: 'baocut' }])).toEqual([]);
  });

  it('拉丁写法按词边界：原文里的 said 不算出现了 AI', () => {
    const rows = [row('a', 'He said so.', 'He said so 他说。')];
    expect(termSpots(rows, body(rows.map((r) => r.unit!)), [{ source: 'AI', target: '人工智能' }])).toEqual([]);
  });
});
