import { describe, expect, it } from 'vitest';
import { editorWasmAvailable, sourceSentences } from '@baocut/jobs';
import type { Id, VideoSnapshot } from '@baocut/protocol';
import type { ReadContentResult, VideoFacts } from '../space/content-extract.ts';
import type { SemanticCatalogSource } from '../space/semantic/coordinator.ts';
import type { SemanticServices } from '../space/semantic/services.ts';
import { createTranslationMemory, primaryLanguage } from './translation-memory.ts';

/** 翻译记忆的查找：假的 Space 目录与内容读取，散列的词袋向量代替模型。 */

const log = { warn: () => {}, info: () => {}, debug: () => {}, error: () => {}, child: () => log } as never;

function speechBody(sentences: string[]): unknown {
  const words: unknown[] = [];
  let clock = 0;
  sentences.forEach((sentence, s) => {
    sentence.split(' ').forEach((text, w) => {
      words.push({ id: `w${s}_${w}`, text: w === 0 ? text : ` ${text}`, start: clock, end: clock + 300, speaker: 's1' });
      clock += 300;
    });
    clock += 2000;
  });
  return { schema: 'baocut.speech/1', timescale: 1000, speakers: [{ id: 's1', name: 'S1' }], words, sentences: null };
}

interface FakeVideo {
  dir: string;
  videoId: Id;
  speechLanguage: string;
  translationLanguage: string;
  pairs: Array<[string, string]>;
  /** 这几个下标的单元指纹对不上（原文改过）。 */
  staleAt?: number[];
}

function content(video: FakeVideo): ReadContentResult {
  const body = speechBody(video.pairs.map(([source]) => source));
  const read = sourceSentences(body);
  if (!('sentences' in read)) throw new Error(read.problem);
  const units = read.sentences.map((sentence, i) => ({
    id: `t-${sentence.id}`,
    sourceSentenceId: sentence.id,
    sourceFingerprint: video.staleAt?.includes(i) ? 'x' : sentence.fingerprint,
    naturalText: video.pairs[i]![1],
    status: 'draft',
  }));
  return {
    videoId: video.videoId,
    name: video.videoId,
    revision: '1',
    snapshot: {} as VideoSnapshot,
    documents: [
      { documentId: 'speech', kind: 'speech', schema: 'baocut.speech/1', language: video.speechLanguage, body },
      { documentId: 'tr', kind: 'translation', schema: 'baocut.translation/2', language: video.translationLanguage, sourceDocumentId: 'speech', body: { units } },
    ] as ReadContentResult['documents'],
  };
}

function catalog(videos: FakeVideo[]): SemanticCatalogSource {
  return {
    scanning: false,
    videos: () => videos.map((v) => ({ entryId: v.dir, dir: v.dir, projectId: null, conversationId: null, lastActivityAt: '', videoId: v.videoId })),
    index: {
      at: (dir: string) => {
        const video = videos.find((v) => v.dir === dir)!;
        const facts = {
          transcripts: [{ documentId: 'speech', name: '', language: video.speechLanguage, wordTiming: true, onTimeline: true }],
          translations: [{ documentId: 'tr', name: '', language: video.translationLanguage, sourceDocumentId: 'speech', units: video.pairs.length, staleUnits: 0 }],
          dubGroups: [],
        } as unknown as VideoFacts;
        return { dir, videoId: video.videoId, facts } as never;
      },
      pendingCount: () => 0,
      listen: () => () => {},
    },
  };
}

/** 词袋散列向量（归一化）：词相同的句子余弦为 1，差一个词的接近 1。 */
function vector(text: string): Float32Array {
  const v = new Float32Array(64);
  for (const word of text.toLowerCase().match(/[a-z0-9]+/g) ?? []) {
    let h = 0;
    for (const c of word) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    v[h % 64]! += 1;
  }
  const norm = Math.hypot(...v) || 1;
  return v.map((x) => x / norm);
}

function semantic(embedded: string[][], fail = false, profile: { id: string } | null = null): () => SemanticServices {
  return () =>
    ({
      scheduler: () => (profile ? { profile: async () => ({ encoderProfileId: profile.id }) } : null),
      context: () => ({
        embedTexts: async (texts: string[]) => {
          if (fail) throw Object.assign(new Error('down'), { reason: 'MODEL_UNAVAILABLE' });
          embedded.push(texts);
          return texts.map(vector);
        },
      }),
    }) as unknown as SemanticServices;
}

const OTHER: FakeVideo = {
  dir: '/v/other',
  videoId: 'vid_other',
  speechLanguage: 'en-US',
  translationLanguage: 'zh-Hans',
  pairs: [
    ['Welcome back to the channel.', '欢迎回到频道。'],
    ['Today we edit a long interview video.', '今天我们剪一段长采访。'],
    ['Thanks for watching.', '感谢观看。'],
  ],
  staleAt: [2],
};
const OLDER: FakeVideo = {
  dir: '/v/older',
  videoId: 'vid_older',
  speechLanguage: 'en',
  translationLanguage: 'zh-Hans',
  pairs: [['Welcome back to the channel!', '欢迎再次回来。']],
};
const HANT: FakeVideo = {
  dir: '/v/hant',
  videoId: 'vid_hant',
  speechLanguage: 'en',
  translationLanguage: 'zh-Hant',
  pairs: [['Thanks for watching.', '感謝觀看。']],
};
const SELF: FakeVideo = { ...OTHER, dir: '/v/self', videoId: 'vid_self' };

const sentences = [
  { id: 's1', text: 'welcome back to the channel' },
  { id: 's2', text: 'Today we edit a long interview video clip.' },
  { id: 's3', text: 'Thanks for watching.' },
  { id: 's4', text: 'Ok.' },
];

function memory(videos: FakeVideo[], options: { semantic?: () => SemanticServices | null; enabled?: boolean } = {}) {
  const reads: string[] = [];
  const tm = createTranslationMemory({
    catalog: () => catalog(videos),
    readContent: async (dir) => {
      reads.push(dir);
      return content(videos.find((v) => v.dir === dir)!);
    },
    semantic: options.semantic ?? (() => null),
    enabled: () => options.enabled ?? true,
    log,
  });
  return { tm, reads };
}

const request = { videoId: 'vid_self', sourceLanguage: 'en', targetLanguage: 'zh-Hans', sentences, signal: new AbortController().signal };

describe.skipIf(!editorWasmAvailable())('翻译记忆的查找', () => {
  it('沿用：规范化后原文相同，取最近的视频；指纹不符、别的目标语言与当前视频不用；没装模型时只有沿用', async () => {
    const { tm, reads } = memory([SELF, OTHER, OLDER, HANT]);
    const result = await tm.lookup(request);
    expect(reads).toEqual(['/v/other', '/v/older']);
    expect(result).toMatchObject({ videos: 2, effectiveMode: 'lexical', reason: 'MODEL_NOT_INSTALLED', references: [] });
    expect(result.reuse).toEqual([{ sentenceId: 's1', text: '欢迎回到频道。', fromVideoId: 'vid_other', unitId: expect.stringMatching(/^t-s-/) }]);
  });

  it('参考：语义相近的已有译句，每句最多 3 条；沿用了的句子不再找参考', async () => {
    const embedded: string[][] = [];
    const { tm } = memory([OTHER, OLDER], { semantic: semantic(embedded) });
    const result = await tm.lookup(request);
    expect(result.effectiveMode).toBe('semantic');
    expect(result.reason).toBeNull();
    expect(result.reuse.map((r) => r.sentenceId)).toEqual(['s1']);
    expect(result.references).toEqual([
      { sentenceId: 's2', source: 'Today we edit a long interview video.', target: '今天我们剪一段长采访。', fromVideoId: 'vid_other' },
    ]);
    // 已有原句与待译句分两次编码；沿用的句子不编码。再查一次时已有原句用缓存。
    expect(embedded[1]).toEqual(['Today we edit a long interview video clip.', 'Thanks for watching.', 'Ok.']);
    embedded.length = 0;
    await tm.lookup(request);
    expect(embedded).toHaveLength(1);
  });

  it('换了编码 profile 时已有原句重新编码', async () => {
    const embedded: string[][] = [];
    const profile = { id: 'p1' };
    const { tm } = memory([OTHER], { semantic: semantic(embedded, false, profile) });
    await tm.lookup(request);
    await tm.lookup(request);
    expect(embedded).toHaveLength(3);
    profile.id = 'p2';
    await tm.lookup(request);
    expect(embedded).toHaveLength(5);
  });

  it('编码失败时退回只有沿用，原因写进结果；设置关掉时什么都不查', async () => {
    const failing = memory([OTHER], { semantic: semantic([], true) });
    const result = await failing.tm.lookup(request);
    expect(result).toMatchObject({ effectiveMode: 'lexical', reason: 'MODEL_UNAVAILABLE', references: [] });
    expect(result.reuse).toHaveLength(1);

    const off = memory([OTHER], { enabled: false });
    expect(await off.tm.lookup(request)).toEqual({ reuse: [], references: [], videos: 0, effectiveMode: 'lexical', reason: 'DISABLED' });
    expect(off.reads).toEqual([]);
  });

  it('原文语言按主语言子标签比较', async () => {
    expect(primaryLanguage('en-US')).toBe('en');
    expect(primaryLanguage(null)).toBeNull();
    const { tm, reads } = memory([{ ...OTHER, speechLanguage: 'ja' }]);
    expect((await tm.lookup(request)).videos).toBe(0);
    expect(reads).toEqual([]);
  });
});
