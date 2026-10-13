import { describe, expect, it } from 'vitest';
import { checkCitations, extractCites, markdownParagraphs, numberSentences, stamp, type SentenceWord } from './ai-tool-citations.ts';

const w = (id: string, text: string, start: number, sentenceId: string | null, speaker: string | null = null): SentenceWord => ({
  id,
  text,
  start,
  end: start + 0.5,
  speaker,
  sentenceId,
});

describe('写作出处：句子编号', () => {
  it('连续属于同一句的词是一次出现；同一句在时间线上再出现时另编一号', () => {
    const numbered = numberSentences({
      videoId: 'vid_1',
      documentId: 'doc_1',
      words: [w('a', 'We', 0, 's-a', 'A'), w('b', 'chose', 0.5, 's-a', 'A'), w('c', 'it.', 1, 's-a', 'A'), w('x', 'um', 2, null), w('d', '因为', 3, 's-d', 'B'), w('e', '快。', 3.5, 's-d', 'B'), w('a', 'We', 9, 's-a', 'A')],
      chapters: [{ at: 0, title: 'Why' }],
    });
    expect(numbered.sentences.map((s) => [s.ref, s.sentenceId, s.text])).toEqual([
      ['s1', 's-a', 'We chose it.'],
      ['s2', 's-d', '因为快。'],
      ['s3', 's-a', 'We'],
    ]);
    expect(numbered.text).toBe('## Why [00:00]\n[s1] [00:00] A: We chose it.\n[s2] [00:03] B: 因为快。\n[s3] [00:09] A: We');
  });

  it('范围之外的章节不写空标题；系列文章的编号带视频前缀', () => {
    const numbered = numberSentences({
      videoId: 'vid_2',
      documentId: 'doc_2',
      words: [w('a', 'Late', 120, 's-a')],
      chapters: [{ at: 0, title: 'One' }, { at: 100, title: 'Two' }],
      prefix: 'v2:',
      first: 5,
    });
    expect(numbered.text).toBe('## Two [01:40]\n[v2:s5] [02:00] Late');
  });

  it('时间码：一小时以上写小时', () => {
    expect(stamp(59.9)).toBe('00:59');
    expect(stamp(3725)).toBe('1:02:05');
  });
});

describe('写作出处：校验', () => {
  const sentences = numberSentences({
    videoId: 'vid_1',
    documentId: 'doc_1',
    words: [w('a', 'One.', 0, 's-a'), w('b', 'Two.', 5, 's-b'), w('c', 'Three.', 10, 's-c')],
    chapters: [],
  }).sentences;

  it('段落：空行分隔，列表每项、每个标题各一段，代码块整块', () => {
    expect(markdownParagraphs('# T\nIntro line\nmore\n\n- a [s1]\n- b\n  cont\n1. c\n\n```\nx\n\ny\n```')).toEqual([
      '# T',
      'Intro line\nmore',
      '- a [s1]',
      '- b\n  cont',
      '1. c',
      '```\nx\n\ny\n```',
    ]);
  });

  it('编号的各种写法都拿出来，去掉后不留空白', () => {
    expect(extractCites('Hello [s1, s2]。 World [v2:s3][s4].')).toEqual({ markdown: 'Hello。 World.', refs: ['s1', 's2', 'v2:s3', 's4'] });
  });

  it('只接受发出的编号；相邻句并成一处；没有有效引用的正文段标模型推断', () => {
    const checked = checkCitations({
      output: '## Head [s1]\n\nAll three [s1, s2, s3].\n\nOnly ends [s3][s1]\n\nMade up [s99].',
      sentences,
      videoIds: ['vid_1'],
      effectiveMode: 'none',
    });
    expect(checked.markdown).toBe('## Head\n\nAll three.\n\nOnly ends\n\nMade up.');
    const [head, all, ends, made] = checked.file.paragraphs;
    expect(head).toMatchObject({ role: 'heading', inferred: false, cites: [] });
    expect(all!.cites).toEqual([{ videoId: 'vid_1', documentId: 'doc_1', sentenceIds: ['s-a', 's-b', 's-c'], clock: 'sequence', startSec: 0, endSec: 10.5, text: 'One. Two. Three.' }]);
    expect(ends!.cites.map((c) => c.sentenceIds)).toEqual([['s-a'], ['s-c']]);
    expect(made).toMatchObject({ role: 'body', inferred: true, cites: [] });
    expect(checked.file.droppedCites).toBe(1);
  });
});
