import { describe, expect, it } from 'vitest';
import { CITATIONS_SCHEMA, type CitationAnchor, type CitationsFile } from '@baocut/protocol';
import { citedMarkdown, citeLabel, citeStats, otherVideos } from './writing-cites.ts';

const at = (videoId: string, startSec: number, id = `s-w${startSec}`): CitationAnchor => ({
  videoId,
  documentId: 'doc',
  sentenceIds: [id],
  clock: 'sequence',
  startSec,
  endSec: startSec + 2,
  text: `sentence at ${startSec}`,
});

const file: CitationsFile = {
  schema: CITATIONS_SCHEMA,
  videoIds: ['v1', 'v2'],
  effectiveMode: 'semantic',
  droppedCites: 2,
  paragraphs: [
    { index: 0, role: 'heading', markdown: '# Why local', inferred: false, cites: [] },
    { index: 1, role: 'body', markdown: 'Footage belongs to clients.', inferred: false, cites: [at('v1', 72), at('v1', 3725)] },
    { index: 2, role: 'body', markdown: '- Renders must be deterministic', inferred: false, cites: [at('v2', 5)] },
    { index: 3, role: 'body', markdown: 'Local-first will win.', inferred: true, cites: [] },
  ],
};
const o = { videoId: 'v1', names: new Map([['v2', 'Episode 41']]), other: 'Another video', inferred: 'Model inference' };

describe('写作结果的出处', () => {
  it('统计只算正文段：有出处、模型推断、丢掉的条数与几部视频', () => {
    expect(citeStats(file)).toEqual({ paras: 3, cited: 2, inferred: 1, dropped: 2, videos: 2 });
  });

  it('标签：这部只写时间，另一部带名字，不知道名字时写「另一部视频」', () => {
    expect(citeLabel(at('v1', 72), o)).toBe('01:12');
    expect(citeLabel(at('v1', 3725), o)).toBe('1:02:05');
    expect(citeLabel(at('v2', 5), o)).toBe('Episode 41 · 00:05');
    expect(citeLabel(at('v3', 5), o)).toBe('Another video · 00:05');
  });

  it('复制去掉出处时就是正文；带时间码时每段末尾写时间，推断段标出来，标题不动', () => {
    expect(citedMarkdown(file, 'plain', o)).toBe('# Why local\n\nFootage belongs to clients.\n\n- Renders must be deterministic\n\nLocal-first will win.');
    expect(citedMarkdown(file, 'timecodes', o)).toBe(
      '# Why local\n\nFootage belongs to clients. [01:12] [1:02:05]\n\n- Renders must be deterministic [Episode 41 · 00:05]\n\nLocal-first will win. *(Model inference)*',
    );
  });

  it('要查名字的只是别的视频，去重', () => {
    expect(otherVideos(file, 'v1')).toEqual(['v2']);
    expect(otherVideos(file, 'v2')).toEqual(['v1']);
  });
});
