import { describe, expect, it } from 'vitest';
import type { GlossaryCandidate, RetakeGroup, RetakeTake } from '@baocut/protocol';
import { checkedPlaces, discoveredTerm, glossaryEdit, keptTake, markPieces, retakeCuts, retakeWordIndexes } from './edit-aids.ts';

const cand = (id: string, occurrences: Array<Array<[string, string]>>): GlossaryCandidate => ({
  id,
  from: 'x',
  to: 'y',
  glossaryId: 'g1',
  glossaryName: 'Products',
  mode: 'exact',
  occurrences: occurrences.map((words, i) => ({ wordIds: words.map(([w]) => w), start: i, end: i + 1, words: words.map(([wid, text]) => ({ id: wid, text })) })),
});

const take = (sentenceId: string, start: number, wordIds: string[], complete = true): RetakeTake => ({
  sentenceId,
  wordIds,
  start,
  end: start + 2,
  text: sentenceId,
  complete,
  marks: [],
});

describe('术语候选：勾了才改，一笔 updateWords', () => {
  const candidates = [cand('a', [[['w1', 'Kubernetes']], [['w9', 'Kubernetes']]]), cand('b', [[['w4', 'BaoCut']]])];

  it('没勾时没有编辑', () => {
    expect(glossaryEdit('doc1', candidates, new Set())).toBeNull();
    expect(checkedPlaces(candidates, new Set())).toBe(0);
  });

  it('勾了的各处合成一笔 updateWords，按处计数', () => {
    const edit = glossaryEdit('doc1', candidates, new Set(['a', 'b']))!;
    expect(edit.operations).toEqual([
      {
        type: 'updateWords',
        documentId: 'doc1',
        words: [
          { id: 'w1', text: 'Kubernetes' },
          { id: 'w9', text: 'Kubernetes' },
          { id: 'w4', text: 'BaoCut' },
        ],
      },
    ]);
    expect(edit.places).toBe(3);
    expect(edit.kinds).toBe(2);
    expect(checkedPlaces(candidates, new Set(['a']))).toBe(2);
  });

  it('发现的术语：出现最多的写法作规范写法，其余记成误听', () => {
    expect(
      discoveredTerm({
        key: 'k',
        source: 'OpenAI',
        forms: [
          { text: 'OpenAI', count: 3 },
          { text: 'Open AI', count: 1 },
        ],
        count: 4,
      }),
    ).toEqual({ canonical: 'OpenAI', misheard: ['Open AI'] });
  });
});

describe('重录：确认的组剪掉保留那遍之外的各遍', () => {
  const g1: RetakeGroup = { id: 'g1', takes: [take('s1', 0, ['a1', 'a2']), take('s2', 3, ['b1']), take('s3', 6, ['c1'])], keep: 2, differ: false, differences: [] };
  const g2: RetakeGroup = { id: 'g2', takes: [take('s7', 20, ['d1']), take('s8', 24, ['e1'])], keep: 1, differ: true, differences: ['number'] };

  it('不确认就一遍都不剪（建议不等于勾选）', () => {
    expect(retakeCuts([g1, g2], new Set(), {})).toEqual([]);
  });

  it('按建议保留；用户改留哪遍以用户为准', () => {
    expect(retakeCuts([g1], new Set(['g1']), {}).map((t) => t.sentenceId)).toEqual(['s1', 's2']);
    expect(retakeCuts([g1], new Set(['g1']), { g1: 0 }).map((t) => t.sentenceId)).toEqual(['s2', 's3']);
    expect(keptTake(g1, { g1: 9 })).toBe(2);
  });

  it('几组一起剪：词的下标合成一个集合，交给一笔 addCuts', () => {
    const cuts = retakeCuts([g1, g2], new Set(['g1', 'g2']), {});
    expect(cuts.map((t) => t.sentenceId)).toEqual(['s1', 's2', 's7']);
    const words = ['a1', 'a2', 'b1', 'c1', 'd1', 'e1'].map((id, index) => ({ id, index }));
    expect([...retakeWordIndexes(cuts, words)].sort((a, b) => a - b)).toEqual([0, 1, 2, 4]);
  });

  it('差异词在原文里高亮', () => {
    expect(markPieces('价格是 30 元', ['30'])).toEqual([
      { text: '价格是 ', hl: false },
      { text: '30', hl: true },
      { text: ' 元', hl: false },
    ]);
    expect(markPieces('no marks', [])).toEqual([{ text: 'no marks', hl: false }]);
  });
});
