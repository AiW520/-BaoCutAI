import { describe, expect, it } from 'vitest';
import type { ContextWord } from './ai-tool-prompt.ts';
import { glossaryCandidates, rewriteWords, type GlossaryTerm } from './glossary-candidates.ts';
import { retakeCandidates, suggestKeep, timelineSentences } from './retake-candidates.ts';
import { charSimilarity, endsSentence, literalFeatures } from './text-compare.ts';
import { semanticError } from '../space/semantic/errors.ts';
import type { TrustedPrincipal } from '../gateway.ts';
import { editAidMethods } from './edit-aids.ts';

/** 一串词：每个词 0.5 秒；`|` 开始新段落。 */
function wordsOf(text: string, start = 0): ContextWord[] {
  const out: ContextWord[] = [];
  let t = start;
  let paragraph = true;
  for (const token of text.split(/\s+/u).filter(Boolean)) {
    if (token === '|') {
      paragraph = true;
      continue;
    }
    out.push({ id: `w${out.length + Math.round(start * 10)}`, text: token, paragraphStart: paragraph, start: t, end: t + 0.4 });
    paragraph = false;
    t += 0.5;
  }
  return out;
}

/** 假的对称编码：同一组里的文字向量相同（相似度 1），其余正交。 */
function fakeEmbed(groups: string[][]) {
  const calls: string[][] = [];
  const embed = async (texts: string[]) => {
    calls.push(texts);
    return texts.map((text) => {
      const v = new Float32Array(groups.length + texts.length + 1);
      const g = groups.findIndex((group) => group.includes(text));
      v[g >= 0 ? g : groups.length + 1 + texts.indexOf(text)] = 1;
      return v;
    });
  };
  return { embed, calls };
}

const term = (canonical: string, misheard: string[] = []): GlossaryTerm => ({ glossaryId: 'g1', glossaryName: 'Products', canonical, misheard });

describe('字面比较', () => {
  it('字符相似度、句末标点、数字否定词与专有名词', () => {
    expect(charSimilarity('kubernetes', 'kubernates')).toBeCloseTo(0.9);
    expect(endsSentence('Done.')).toBe(true);
    expect(endsSentence('So we...')).toBe(false);
    expect(endsSentence('好了。')).toBe(true);
    const f = literalFeatures('We do not ship on Friday, version 3 with iPhone.');
    expect(f.number).toEqual(['3']);
    expect(f.negation).toEqual(['not']);
    expect(f.name).toEqual(['Friday', 'iPhone']);
    expect(literalFeatures('我们不发布三个版本').negation).toEqual(['不']);
    expect(literalFeatures('我们不发布三个版本').number).toEqual(['三']);
  });
});

describe('术语候选', () => {
  it('一对一的改法：标点留着；空格分开的写法按词对应；中文按字数分；换不成一对一时没有', () => {
    expect(rewriteWords(wordsOf('chatgbt,'), 'ChatGPT')).toEqual([{ id: 'w0', text: 'ChatGPT,' }]);
    expect(rewriteWords(wordsOf('open ai'), 'Open AI')).toEqual([
      { id: 'w0', text: 'Open' },
      { id: 'w1', text: 'AI' },
    ]);
    expect(rewriteWords(wordsOf('特斯 垃'), '特斯拉')).toEqual([
      { id: 'w0', text: '特斯' },
      { id: 'w1', text: '拉' },
    ]);
    expect(rewriteWords(wordsOf('chat gpt'), 'ChatGPT')).toBeNull();
  });

  it('没装模型：只按术语表里记下的误听写法与大小写变体找，写明原因；已经是规范写法的不列', async () => {
    const words = wordsOf('I use chat gbt and ChatGPT and chatgpt daily. | Ask Kubernates later.');
    const out = await glossaryCandidates({ words, terms: [term('ChatGPT', ['chatgbt']), term('Kubernetes')], unavailable: 'MODEL_NOT_INSTALLED' });
    expect(out.effectiveMode).toBe('lexical');
    expect(out.reason).toBe('MODEL_NOT_INSTALLED');
    expect(out.candidates.map((c) => [c.from, c.to, c.mode, c.occurrences.length])).toEqual([['chatgpt', 'ChatGPT', 'exact', 1]]);
    // 「chat gbt」是记下的误听写法，但两个词换不成一个词，不列。
    expect(out.candidates[0]!.occurrences[0]!.words).toEqual([{ id: 'w7', text: 'ChatGPT' }]);
  });

  it('装了模型：字符相近且对称相似度过线的才列（语义相近但字面不像的不列）', async () => {
    const words = wordsOf('Deploy on Kubernates today. Then Docker helps. Kubernates again.');
    const { embed, calls } = fakeEmbed([['Kubernetes', 'Kubernates', 'Docker']]);
    const out = await glossaryCandidates({ words, terms: [term('Kubernetes')], embed });
    expect(out.effectiveMode).toBe('semantic');
    expect(out.candidates).toHaveLength(1);
    expect(out.candidates[0]).toMatchObject({ from: 'Kubernates', to: 'Kubernetes', mode: 'semantic', score: 1 });
    expect(out.candidates[0]!.occurrences.map((o) => o.wordIds)).toEqual([['w2'], ['w7']]);
    // 字符不像的 Docker 不送去比较。
    expect(calls.flat()).not.toContain('Docker');
  });

  it('对称相似度不过线时不列；编码失败时退回字面并写明原因', async () => {
    const words = wordsOf('Deploy on Kubernates today.');
    const low = await glossaryCandidates({ words, terms: [term('Kubernetes')], embed: fakeEmbed([]).embed });
    expect(low.candidates).toEqual([]);
    const failed = await glossaryCandidates({
      words: wordsOf('Deploy on Kubernates and Kubernetis today.'),
      terms: [term('Kubernetes', ['kubernates'])],
      embed: async () => {
        throw semanticError('RESOURCE_EXHAUSTED');
      },
    });
    expect(failed.effectiveMode).toBe('lexical');
    expect(failed.reason).toBe('RESOURCE_EXHAUSTED');
    expect(failed.candidates.map((c) => c.mode)).toEqual(['exact']);
  });

  it('发现：写法不一致的专有名词与反复出现的特殊写法；术语表里有的不提示', async () => {
    const words = wordsOf(
      'We tried OpenAI first. Then Open AI again. Later Openai and OpenAI. The iPhone and the iPhone and an iPhone. ChatGPT ChatGPT ChatGPT.',
    );
    const out = await glossaryCandidates({ words, terms: [term('ChatGPT')] });
    const openai = out.discovered.find((d) => d.key === 'openai')!;
    expect(openai.source).toBe('OpenAI');
    expect(openai.forms).toEqual([
      { text: 'OpenAI', count: 2 },
      { text: 'Open AI', count: 1 },
      { text: 'Openai', count: 1 },
    ]);
    expect(out.discovered.find((d) => d.key === 'iphone')).toMatchObject({ forms: [{ text: 'iPhone', count: 3 }] });
    expect(out.discovered.some((d) => d.key === 'chatgpt')).toBe(false);
  });
});

describe('重录候选', () => {
  const sentenceMap = (words: ContextWord[]) => {
    const map = new Map<string, string>();
    let id = '';
    for (const w of words) {
      if (!id || /[.!?]$/.test(words[words.indexOf(w) - 1]?.text ?? '')) id = `s-${w.id}`;
      map.set(w.id, id);
    }
    return map;
  };

  it('按句子 ID 切句；没有句子 ID 时按句末标点', () => {
    const words = wordsOf('One two. Three four.');
    expect(timelineSentences(words, new Map()).map((s) => s.text)).toEqual(['One two.', 'Three four.']);
    expect(timelineSentences(words, sentenceMap(words)).map((s) => s.id)).toEqual(['s-w0', 's-w2']);
  });

  it('没装模型：只找文字完全相同的；窗口外的不算', async () => {
    const words = [...wordsOf('Welcome to the channel. Welcome to the channel! Something else here.'), ...wordsOf('Welcome to the channel.', 200)];
    const out = await retakeCandidates({ words, sentenceOf: sentenceMap(words) });
    expect(out.effectiveMode).toBe('lexical');
    expect(out.reason).toBe('MODEL_NOT_INSTALLED');
    expect(out.groups).toHaveLength(1);
    expect(out.groups[0]!.takes.map((t) => t.text)).toEqual(['Welcome to the channel.', 'Welcome to the channel!']);
    expect(out.groups[0]).toMatchObject({ keep: 1, differ: false, differences: [] });
  });

  it('语义相同的几遍连成一组；数字或否定词不同的列为有差异，并标出各遍不同的地方', async () => {
    const words = wordsOf('So the price is ten dollars. So the price is, um, ten dollars. We ship 3 units. We ship 4 units. It works well. It does not work well.');
    const { embed } = fakeEmbed([
      ['So the price is ten dollars.', 'So the price is, um, ten dollars.'],
      ['We ship 3 units.', 'We ship 4 units.'],
      ['It works well.', 'It does not work well.'],
    ]);
    const out = await retakeCandidates({ words, sentenceOf: sentenceMap(words), embed });
    expect(out.effectiveMode).toBe('semantic');
    expect(out.groups.map((g) => [g.differ, g.differences])).toEqual([
      [false, []],
      [true, ['number']],
      [true, ['negation']],
    ]);
    expect(out.groups[1]!.takes.map((t) => t.marks)).toEqual([['3'], ['4']]);
    expect(out.groups[2]!.takes.map((t) => t.marks)).toEqual([[], ['not']]);
  });

  it('建议保留：最后一遍；最后一遍没说完且明显短时取最后一个说完的', () => {
    expect(suggestKeep([{ start: 0, end: 3, complete: true }, { start: 4, end: 7, complete: true }])).toBe(1);
    expect(suggestKeep([{ start: 0, end: 3, complete: true }, { start: 4, end: 5, complete: false }])).toBe(0);
    expect(suggestKeep([{ start: 0, end: 3, complete: false }, { start: 4, end: 5, complete: false }])).toBe(0);
  });
});

describe('edits.glossaryCandidates / edits.retakeCandidates', () => {
  it('读视频里唯一的转写与启用的转写术语表；没有语义服务时走字面；对外服务不可用；视频没打开时报错', async () => {
    const words = wordsOf('I use chatgbt daily. I use chatgbt daily.');
    const videos = {
      mirror: (videoId: string) =>
        videoId === 'v1' ? { video: { rootSequenceId: 'q1', documents: { d1: { id: 'd1', kind: 'speech', currentRevision: 'r1' } } } } : null,
      exportPlan: async () => ({
        parts: [{ plans: [{ range: { startSeconds: 0 }, entries: words.map((w) => ({ ...w, paragraphStart: w.paragraphStart })) }] }],
      }),
      document: async () => ({ body: {} }),
    };
    const library = {
      enabledGlossaries: async () => ({ ids: ['g1'], skipped: [] }),
      store: { get: () => ({ content: { name: 'Products', kind: 'transcription', language: null, defaultEnabled: true, terms: [{ canonical: 'ChatGPT', misheard: ['chatgbt'] }] } }) },
    };
    const methods = editAidMethods({ videos: videos as never, library: library as never, semantic: () => null });
    const user = { kind: 'local' } as unknown as TrustedPrincipal;
    const glossary = await methods['edits.glossaryCandidates']({ videoId: 'v1' }, user);
    expect(glossary).toMatchObject({ documentId: 'd1', glossaries: 1, effectiveMode: 'lexical', reason: 'MODEL_NOT_INSTALLED' });
    expect(glossary.candidates[0]!.occurrences.map((o) => o.words)).toEqual([[{ id: 'w2', text: 'ChatGPT' }], [{ id: 'w6', text: 'ChatGPT' }]]);
    const retakes = await methods['edits.retakeCandidates']({ videoId: 'v1' }, user);
    expect(retakes).toMatchObject({ documentId: 'd1', effectiveMode: 'lexical', reason: 'MODEL_NOT_INSTALLED' });
    expect(retakes.groups[0]!.takes.map((t) => t.wordIds)).toEqual([['w0', 'w1', 'w2', 'w3'], ['w4', 'w5', 'w6', 'w7']]);
    const service = { kind: 'service' } as unknown as TrustedPrincipal;
    await expect(methods['edits.glossaryCandidates']({ videoId: 'v1' }, service)).rejects.toMatchObject({ code: 'forbidden' });
    await expect(methods['edits.retakeCandidates']({ videoId: 'v2' }, user)).rejects.toMatchObject({ code: 'not-found' });
  });
});
