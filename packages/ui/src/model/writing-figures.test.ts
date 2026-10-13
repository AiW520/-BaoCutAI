import { describe, expect, it } from 'vitest';
import type { CitationAnchor, CitationParagraph, CitationsFile, VideoSnapshot } from '@baocut/protocol';
import { FIGURE_NUDGE_SECONDS, figureFrame, figurePlans, figureTime, nextFigure } from './writing-figures.ts';

const anchor = (videoId: string, startSec: number, extra: Partial<CitationAnchor> = {}): CitationAnchor => ({
  videoId,
  documentId: 'speech',
  sentenceIds: [],
  clock: 'sequence',
  startSec,
  endSec: startSec + 2,
  text: '',
  ...extra,
});
const para = (index: number, cites: CitationAnchor[], extra: Partial<CitationParagraph> = {}): CitationParagraph =>
  ({ index, role: 'body', markdown: `p${index}`, cites, inferred: false, ...extra }) as CitationParagraph;
const file = (paragraphs: CitationParagraph[]): CitationsFile => ({ videoIds: ['v'], paragraphs }) as unknown as CitationsFile;

describe('关键帧插图（按出处时间取帧）', () => {
  it('只给有这部视频出处的正文段，每两段一张；标题、模型推断与只有别的视频出处的不算', () => {
    const plans = figurePlans(
      file([
        para(0, [], { role: 'heading' }),
        para(1, [anchor('other', 5), anchor('v', 30)]),
        para(2, [], { inferred: true }),
        para(3, [anchor('other', 8)]),
        para(4, [anchor('v', 50)]),
        para(5, [anchor('v', 1)]),
      ]),
      'v',
    );
    expect(plans.map((p) => [p.index, p.anchor.startSec, p.candidates])).toEqual([
      [1, 30, [30, 30 + FIGURE_NUDGE_SECONDS, 30 - FIGURE_NUDGE_SECONDS]],
      [5, 1, [1, 1 + FIGURE_NUDGE_SECONDS]],
    ]);
  });

  it('换一张在候选时间里轮换，转一圈回到出处的起点', () => {
    const [plan] = figurePlans(file([para(0, [anchor('v', 30)])]), 'v');
    let choice = undefined as ReturnType<typeof nextFigure> | undefined;
    const seen = [figureTime(plan!, choice)];
    for (let i = 0; i < 3; i++) {
      choice = nextFigure(choice);
      seen.push(figureTime(plan!, choice));
    }
    expect(seen).toEqual([30, 32.5, 27.5, 30]);
  });

  it('源时钟的出处取转写所属素材自己的时间；素材没有画面时不配图', () => {
    const video = {
      rootSequenceId: 'seq',
      sequences: {},
      assets: {
        movie: { id: 'movie', currentRevision: '2', revisions: { '2': { video: { displayWidth: 1920 } } } },
        sound: { id: 'sound', currentRevision: '1', revisions: { '1': {} } },
      },
      documents: { speech: { sourceAssetId: 'movie' }, voice: { sourceAssetId: 'sound' } },
    } as unknown as Pick<VideoSnapshot, 'rootSequenceId' | 'sequences' | 'assets' | 'documents'>;
    expect(figureFrame(anchor('v', 12, { clock: 'source' }), 14.5, video)).toEqual({ asset: { id: 'movie', revision: '2' }, at: 14.5 });
    expect(figureFrame(anchor('v', 12, { clock: 'source', documentId: 'voice' }), 12, video)).toBeNull();
    // 序列时钟：没有主序列时不配图。
    expect(figureFrame(anchor('v', 12), 12, video)).toBeNull();
  });
});
