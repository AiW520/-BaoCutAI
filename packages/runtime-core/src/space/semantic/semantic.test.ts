import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { RpcError, videoTimeHref, type Id, type SemanticResolveResult, type SpaceEntry, type VideoSnapshot } from '@baocut/protocol';
import { silentLogger } from '@baocut/harness';
import { EmbeddingError, HashingEmbeddingProvider, type EmbeddingProvider } from '@baocut/models';
import type { SpaceCatalog, SpaceVideo } from '../../space-catalog.ts';
import { ContentIndex, type ContentReader } from '../content-index.ts';
import type { ContentSegment, ReadContentDocument, ReadContentResult } from '../content-extract.ts';
import { resolveSearchHit } from '../search-hit-resolver.ts';
import { readCitations } from '../space-citations.ts';
import { spaceMethods } from '../space-methods.ts';
import type { TrustedPrincipal } from '../../gateway.ts';
import { USER_VIEWER, searchContent, visibleTo, type SpaceViewer } from '../space-queries.ts';
import { SpaceTools, spaceViewerOf } from '../../agent-tools/space-tools.ts';
import { MemoryCitationRegistry } from '../../ai-tools/citation-registry.ts';
import { SemanticTools } from '../../agent-tools/semantic-tools.ts';
import type { ToolPrincipal, ToolScope } from '../../agent-tools/tool-scope.ts';
import { chunkVideo, estimateTokens } from './chunks.ts';
import { embeddingKeyOf } from './coordinator.ts';
import { frameTimes, type KeyframeSource, type VisualAsset } from './visual-lane.ts';
import { openSemanticServices, type SemanticServices } from './services.ts';
import { SEMANTIC_STORE_FILE, SemanticStore, SemanticStoreTooNew } from './store.ts';
import { RANKING_VERSION, SEMANTIC_THRESHOLDS } from './thresholds.ts';

/**
 * 本机语义检索（EmbeddingGemma 2 检索集成方案 v0.1 PR 3–5）：分片、派生库、增量构建、检索（字面 / 语义 / 综合与退回）、
 * 结果解析与 SemanticContext。编码用确定性的 `HashingEmbeddingProvider`；内容索引是真的（临时目录），引擎的只读查询是假的。
 */

// ---- 假的视频内容 ----

interface FakeVideo {
  videoId: Id;
  name: string;
  revision: string;
  sentences: string[];
  /** 在时间线上的句子（下标）；默认全部。 */
  onTimeline?: number[];
  /** 另有一份同样内容、同样（源）时间的字幕。 */
  captions?: boolean;
  /** 素材 a1 是有画面的视频（画面索引取帧用）：内容哈希与时长（秒）。 */
  clip?: { contentHash: string; seconds: number };
}

function captionDoc(video: FakeVideo): ReadContentDocument {
  const cues = video.sentences.map((text, i) => ({ id: `c${i}`, start: i * 5000, end: i * 5000 + text.split(' ').length * 300, text }));
  return {
    documentId: `c-${video.videoId}`,
    kind: 'caption',
    name: 'Subtitles',
    language: 'en',
    revision: '1',
    schema: 'baocut.caption/1',
    sourceAssetId: 'a1',
    sourceDocumentId: null,
    body: { timescale: 1000, cues },
    plan: null,
  } as unknown as ReadContentDocument;
}

function speechDoc(video: FakeVideo): ReadContentDocument {
  const words: { id: string; text: string; start: number; end: number; speaker: string }[] = [];
  const bySentence: (typeof words)[] = [];
  video.sentences.forEach((sentence, i) => {
    const list = sentence.split(' ').map((text, j) => ({ id: `w${i}x${j}`, text, start: i * 5000 + j * 300, end: i * 5000 + j * 300 + 300, speaker: 'Host' }));
    words.push(...list);
    bySentence.push(list);
  });
  const timeline = video.onTimeline ?? video.sentences.map((_, i) => i);
  const entries = timeline.flatMap((i) =>
    bySentence[i]!.map((w) => ({ key: w.id, id: w.id, start: 100 + w.start / 1000, end: 100 + w.end / 1000, text: w.text, speaker: w.speaker, wordTiming: true })),
  );
  return {
    documentId: `d-${video.videoId}`,
    kind: 'speech',
    name: 'Transcript',
    language: 'en',
    revision: '1',
    schema: 'baocut.speech/1',
    sourceAssetId: 'a1',
    sourceDocumentId: null,
    body: { timescale: 1000, words, sentences: null },
    plan:
      entries.length > 0
        ? {
            sequenceId: 'seq',
            documentId: `d-${video.videoId}`,
            unit: 'speech' as const,
            clock: 'sequence' as const,
            scope: { basis: 'root', captionItemIds: [], scopeItemIds: [] },
            range: { startSeconds: 0, endSeconds: 1000, durationSeconds: 1000 },
            entries,
            sourceCount: words.length,
            omittedCount: words.length - entries.length,
          }
        : null,
  } as ReadContentDocument;
}

function contentOf(video: FakeVideo): ReadContentResult {
  const snapshot = {
    rootSequenceId: 'seq',
    sequences: { seq: { id: 'seq', fps: { num: 30, den: 1 }, items: [], markers: [] } },
    assets: {
      a1: {
        id: 'a1',
        name: 'clip.mp4',
        currentRevision: 'r1',
        revisions: {
          r1: video.clip
            ? {
                storage: { mode: 'managed' },
                contentHash: video.clip.contentHash,
                mediaType: 'video/mp4',
                duration: { ticks: video.clip.seconds * 1000, timescale: 1000 },
                video: { width: 1920, height: 1080 },
              }
            : { storage: { mode: 'managed' } },
        },
      },
    },
  } as unknown as VideoSnapshot;
  const documents = [speechDoc(video), ...(video.captions ? [captionDoc(video)] : [])];
  return { videoId: video.videoId, name: video.name, revision: video.revision, snapshot, documents };
}

class FakeReader implements ContentReader {
  readonly videos = new Map<string, FakeVideo>();
  reads = 0;
  async peek(dir: string) {
    const v = this.#get(dir);
    return { videoId: v.videoId, name: v.name, revision: v.revision };
  }
  async readContent(dir: string) {
    this.reads++;
    return contentOf(this.#get(dir));
  }
  #get(dir: string): FakeVideo {
    const found = this.videos.get(dir);
    if (!found) throw new Error('not a video');
    return found;
  }
}

/** 计数、可以换成不可用的 Provider。 */
class CountingProvider implements EmbeddingProvider {
  readonly inner: HashingEmbeddingProvider;
  constructor(dims = 64) {
    this.inner = new HashingEmbeddingProvider({ dims, synonyms: { 'power cell': 'battery' } });
  }
  documents = 0;
  queries = 0;
  images = 0;
  failing: string | null = null;
  /** 只装了文字模型包：画面的 profile 报没装。 */
  noVision = false;
  async profile(purpose: Parameters<EmbeddingProvider['profile']>[0]) {
    if (this.failing) throw new EmbeddingError(this.failing, 'unavailable');
    if (this.noVision && purpose === 'text-to-visual') throw new EmbeddingError('MODEL_NOT_INSTALLED', 'no image-capable bundle');
    return this.inner.profile(purpose);
  }
  async embedImages(...args: Parameters<NonNullable<EmbeddingProvider['embedImages']>>) {
    if (this.failing) throw new EmbeddingError(this.failing, 'unavailable');
    this.images += args[0].images.length;
    return this.inner.embedImages(...args);
  }
  async embed(...args: Parameters<EmbeddingProvider['embed']>) {
    if (this.failing) throw new EmbeddingError(this.failing, 'unavailable');
    const [, request] = args;
    if (request.role === 'document') this.documents += request.inputs.length;
    else this.queries += request.inputs.length;
    return this.inner.embed(...args);
  }
}

const V1: FakeVideo = {
  videoId: 'v1',
  name: 'Interview',
  revision: 'r1',
  sentences: ['The camera battery died during the interview.', 'We switched to the backup microphone.', 'Lighting was too warm in the afternoon.'],
};
const V2: FakeVideo = {
  videoId: 'v2',
  name: 'Launch',
  revision: 'r1',
  sentences: ['Secret battery launch plan for the new product.', 'Budget numbers are confidential.'],
};
const V3: FakeVideo = { videoId: 'v3', name: 'Cooking', revision: 'r1', sentences: ['Cooking pasta with fresh tomatoes and a battery timer.'] };

let tmp: string;
let reader: FakeReader;
let index: ContentIndex;
let videos: SpaceVideo[];
let provider: CountingProvider;
let services: SemanticServices | null;
const opened: SemanticServices[] = [];

async function addVideo(video: FakeVideo, projectId: Id | null, conversationId: Id | null): Promise<SpaceVideo> {
  const dir = await fs.realpath(await fs.mkdir(path.join(tmp, 'videos', video.videoId), { recursive: true }).then(() => path.join(tmp, 'videos', video.videoId)));
  reader.videos.set(dir, video);
  const entry: SpaceVideo = { entryId: `e-${video.videoId}`, dir, projectId, conversationId, lastActivityAt: '2026-01-01T00:00:00Z', videoId: video.videoId };
  videos.push(entry);
  return entry;
}

async function syncIndex(mtime = 1): Promise<void> {
  await index.sync(videos.map((v) => ({ dir: v.dir, mtimeMs: mtime })));
  await index.idle();
}

/** 假的关键帧：写着「素材内容哈希 + 秒」的文本文件（散列 Provider 把文件内容当文字编码）；`broken` 里的秒取不出来。 */
class FakeFrames implements KeyframeSource {
  calls = 0;
  readonly broken = new Set<number>();
  async keyframe(_dir: string, asset: VisualAsset, at: number): Promise<string> {
    this.calls++;
    if (this.broken.has(at)) throw new Error('decode failed');
    const file = path.join(tmp, 'frames', `${asset.contentHash}-${Math.round(at * 1000)}.jpg`);
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, `frame ${asset.contentHash} at ${at}`);
    return file;
  }
}

function open(
  options: { provider?: EmbeddingProvider | null; indexedProjects?: 'all' | Id[]; channels?: string[]; frames?: KeyframeSource } = {},
): SemanticServices {
  const catalog = { videos: () => videos, index, scanning: false };
  const s = openSemanticServices({
    cacheDir: path.join(tmp, 'cache'),
    catalog,
    reader,
    provider: options.provider === undefined ? provider : options.provider,
    settings: () => ({ channels: options.channels ?? ['text'], indexedProjects: options.indexedProjects ?? 'all' }),
    log: silentLogger,
    ...(options.frames ? { frames: options.frames } : {}),
    debounceMs: 0,
  });
  opened.push(s);
  return s;
}

async function build(s: SemanticServices): Promise<void> {
  s.coordinator.start();
  await s.coordinator.idle();
}

const SOURCE_P1: SpaceViewer = { kind: 'source', projectId: 'p1', conversationId: 'c-x' };

function reasonOf(error: unknown): unknown {
  return error instanceof RpcError ? (error.details as { reason?: string } | undefined)?.reason : error;
}

async function rejection(promise: Promise<unknown>): Promise<RpcError> {
  try {
    await promise;
  } catch (error) {
    if (error instanceof RpcError) return error;
    throw error;
  }
  throw new Error('expected a rejection');
}

beforeEach(async () => {
  tmp = await fs.mkdtemp(path.join(os.tmpdir(), 'baocut-semantic-'));
  reader = new FakeReader();
  videos = [];
  provider = new CountingProvider();
  services = null;
  index = new ContentIndex({ dir: path.join(tmp, 'cache', 'content-index'), reader, log: silentLogger });
  await index.load();
  await addVideo(V1, 'p1', 'c1');
  await addVideo(V2, 'p2', 'c2');
  await addVideo(V3, null, 'c3');
  await syncIndex();
});

afterEach(async () => {
  for (const s of opened.splice(0)) await s.close();
  await index.close?.();
  await fs.rm(tmp, { recursive: true, force: true });
});

// ---- 分片 ----

describe('分片', () => {
  function segment(i: number, text: string, extra: Partial<ContentSegment> = {}): ContentSegment {
    return { kind: 'speech', documentId: 'd1', language: 'en', clock: 'sequence', start: i, end: i + 1, text, speaker: 'A', sentenceIds: [`s-${i}`], ...extra };
  }

  it('同一文档按句子攒块、相邻块重叠一句；chunkId 不随时间变化', () => {
    const segments = Array.from({ length: 12 }, (_, i) => segment(i, `Sentence number ${i} talks about the topic in some detail here.`));
    const { chunks, sentences } = chunkVideo('v1', segments, { targetTokens: 40, minTokens: 10, maxTokens: 60, overlapSentences: 1 });
    expect(chunks.length).toBeGreaterThan(1);
    expect(sentences).toHaveLength(12);
    for (const chunk of chunks) expect(estimateTokens(chunk.text)).toBeLessThanOrEqual(60);
    // 重叠一句。
    expect(chunks[1]!.sentenceIds[0]).toBe(chunks[0]!.sentenceIds.at(-1));
    const shifted = chunkVideo(
      'v1',
      segments.map((s) => ({ ...s, start: s.start + 30, end: s.end + 30 })),
      { targetTokens: 40, minTokens: 10, maxTokens: 60, overlapSentences: 1 },
    );
    expect(shifted.chunks.map((c) => c.chunkId)).toEqual(chunks.map((c) => c.chunkId));
  });

  it('超长的一句按上限切开，不静默截断；章节单独成块（summary）', () => {
    const long = Array.from({ length: 400 }, (_, i) => `word${i}`).join(' ');
    const { chunks } = chunkVideo('v1', [segment(0, long), segment(5, 'Opening', { kind: 'chapter', documentId: null, sentenceIds: [], markerId: 'm1' })], {
      maxTokens: 64,
    });
    const pieces = chunks.filter((c) => c.documentKind === 'speech');
    expect(pieces.length).toBeGreaterThan(1);
    expect(pieces.every((c) => c.sentenceIds.join() === 's-0')).toBe(true);
    expect(pieces.map((c) => c.text).join(' ')).toBe(long);
    const chapter = chunks.find((c) => c.documentKind === 'chapter');
    expect(chapter).toMatchObject({ evidenceType: 'summary', sentenceIds: ['marker:m1'] });
  });
});

// ---- 派生库 ----

describe('语义派生库', () => {
  it('旧版本的库删掉重建，更新版本写的库不动', async () => {
    const dir = path.join(tmp, 'store');
    await fs.mkdir(dir, { recursive: true });
    const file = path.join(dir, SEMANTIC_STORE_FILE);
    const old = new DatabaseSync(file);
    old.exec('CREATE TABLE junk (x INTEGER); PRAGMA user_version = 0;');
    old.close();
    const store = new SemanticStore(dir);
    expect(store.sources()).toEqual([]);
    store.setMeta('k', 'v');
    store.close();

    const newer = new DatabaseSync(file);
    newer.exec('PRAGMA user_version = 99;');
    newer.close();
    expect(() => new SemanticStore(dir)).toThrow(SemanticStoreTooNew);
  });

  it('发布按冻结的世代做 CAS：过期的发布被拒，缺向量的不发布，撤下后立即不可见', () => {
    const store = new SemanticStore(path.join(tmp, 'store'));
    const profile = { encoderProfileId: 'enc@1', promptPairId: 'model-card-v1' };
    const { chunks, sentences } = chunkVideo('v1', [
      { kind: 'speech', documentId: 'd1', language: 'en', clock: 'sequence', start: 0, end: 1, text: 'Hello there.', speaker: null, sentenceIds: ['s-1'] },
    ]);
    const keyed = chunks.map((c) => ({ ...c, embeddingKey: embeddingKeyOf(profile, c.text) }));
    const vector = new Float32Array([1, 0, 0, 0]);
    const base = { videoId: 'v1', encoderProfileId: 'enc@1', embeddingSpaceId: 'space', dims: 4, chunks: keyed, sentences };

    const first = store.freeze('v1', '/v1', 'p1', 'r1');
    expect(store.publish({ ...base, revision: 'r1', expectedGeneration: first.expectedGeneration })).toEqual({ published: false, reason: 'missing-vectors' });
    store.putEmbeddings(keyed.map((c) => ({ key: c.embeddingKey, encoderProfileId: 'enc@1', vector })));
    // 发布前又冻结了更新的版本：这次的结果过期。
    const second = store.freeze('v1', '/v1', 'p1', 'r2');
    expect(store.publish({ ...base, revision: 'r1', expectedGeneration: first.expectedGeneration })).toEqual({ published: false, reason: 'stale' });
    const published = store.publish({ ...base, revision: 'r2', expectedGeneration: second.expectedGeneration });
    expect(published.published).toBe(true);
    expect(store.activeGenerations(['v1']).get('v1')).toMatchObject({ revision: 'r2', chunkCount: 1 });
    // 同一 embeddingKey 的向量可复用。
    expect(store.embeddings([keyed[0]!.embeddingKey], 'enc@1', 4).size).toBe(1);
    expect(store.embeddings([keyed[0]!.embeddingKey], 'other@1', 4).size).toBe(0);

    store.removeVideos(['v1']);
    expect(store.activeGenerations(['v1']).size).toBe(0);
    expect(store.source('v1')).toBeNull();
    store.close();
  });

  it('格式 1 的库原地升到 2：文字索引原样保留，补上画面的表', () => {
    const dir = path.join(tmp, 'store');
    const store = new SemanticStore(dir);
    const { chunks, sentences } = chunkVideo('v1', [
      { kind: 'speech', documentId: 'd1', language: 'en', clock: 'sequence', start: 0, end: 1, text: 'Hello there.', speaker: null, sentenceIds: ['s-1'] },
    ]);
    const keyed = chunks.map((c) => ({ ...c, embeddingKey: `k-${c.chunkId}` }));
    store.putEmbeddings(keyed.map((c) => ({ key: c.embeddingKey, encoderProfileId: 'enc@1', vector: new Float32Array([1, 0, 0, 0]) })));
    const frozen = store.freeze('v1', '/v1', 'p1', 'r1');
    const base = { videoId: 'v1', encoderProfileId: 'enc@1', embeddingSpaceId: 'space', dims: 4, chunks: keyed, sentences };
    expect(store.publish({ ...base, revision: 'r1', expectedGeneration: frozen.expectedGeneration }).published).toBe(true);
    store.close();
    // 退回格式 1 的样子：没有画面的表。
    const v1 = new DatabaseSync(path.join(dir, SEMANTIC_STORE_FILE));
    v1.exec('DROP TABLE visual_frames; DROP TABLE visual_sources; PRAGMA user_version = 1;');
    v1.close();

    const reopened = new SemanticStore(dir);
    expect(reopened.activeGenerations(['v1']).get('v1')).toMatchObject({ channel: 'text', revision: 'r1', chunkCount: 1 });
    expect(reopened.partition(reopened.activeGenerations(['v1']).get('v1')!.id)!.chunks).toHaveLength(1);
    expect(reopened.visualSources()).toEqual([]);
    reopened.close();
    const check = new DatabaseSync(path.join(dir, SEMANTIC_STORE_FILE));
    expect((check.prepare('PRAGMA user_version').get() as { user_version: number }).user_version).toBe(2);
    check.close();
  });

  it('画面世代：与文字各自的版本与指针，发布同样做 CAS；发布文字时回收向量不动画面的，撤下视频两边都撤', () => {
    const dir = path.join(tmp, 'store');
    const store = new SemanticStore(dir);
    const vector = new Float32Array([0, 1, 0, 0]);
    const frames = [
      { assetId: 'a1', contentHash: 'h1', sourceSec: 0, embeddingKey: 'vis-0' },
      { assetId: 'a1', contentHash: 'h1', sourceSec: 8, embeddingKey: 'vis-8' },
    ];
    const base = { videoId: 'v1', encoderProfileId: 'img@1', embeddingSpaceId: 'space', dims: 4, frames };
    const first = store.freezeVisual('v1', 'vr1');
    expect(store.publishVisual({ ...base, revision: 'vr1', expectedGeneration: first.expectedGeneration })).toEqual({
      published: false,
      reason: 'missing-vectors',
    });
    store.putEmbeddings(frames.map((f) => ({ key: f.embeddingKey, encoderProfileId: 'img@1', vector })));
    store.putEmbeddings([{ key: 'orphan', encoderProfileId: 'img@1', vector }]);
    const second = store.freezeVisual('v1', 'vr2');
    expect(store.publishVisual({ ...base, revision: 'vr1', expectedGeneration: first.expectedGeneration })).toEqual({ published: false, reason: 'stale' });
    expect(store.publishVisual({ ...base, revision: 'vr2', expectedGeneration: second.expectedGeneration }).published).toBe(true);
    expect(store.visualSource('v1')).toMatchObject({ state: 'indexed', wantedRevision: 'vr2' });
    // 画面世代不占文字的指针。
    expect(store.source('v1')).toBeNull();
    expect(store.activeGenerations(['v1']).size).toBe(0);
    const generation = store.activeVisualGenerations(['v1']).get('v1')!;
    expect(generation).toMatchObject({ channel: 'visual', chunkCount: 2 });
    const partition = store.visualPartition(generation.id)!;
    expect(partition.frames.map((f) => [f.assetId, f.sourceSec])).toEqual([
      ['a1', 0],
      ['a1', 8],
    ]);
    expect(Array.from(partition.vectors.slice(4, 8))).toEqual([0, 1, 0, 0]);

    // 所有向量都过了宽限期；发布一次文字（触发回收）：画面引用的留下，没人引用的删掉。
    const db = new DatabaseSync(path.join(dir, SEMANTIC_STORE_FILE));
    db.exec('UPDATE embeddings SET created_at = 0');
    db.close();
    const { chunks, sentences } = chunkVideo('v2', [
      { kind: 'speech', documentId: 'd1', language: 'en', clock: 'sequence', start: 0, end: 1, text: 'Hi.', speaker: null, sentenceIds: ['s-1'] },
    ]);
    const keyed = chunks.map((c) => ({ ...c, embeddingKey: `k-${c.chunkId}` }));
    store.putEmbeddings(keyed.map((c) => ({ key: c.embeddingKey, encoderProfileId: 'enc@1', vector })));
    const text = store.freeze('v2', '/v2', 'p1', 'r1');
    store.publish({ videoId: 'v2', revision: 'r1', expectedGeneration: text.expectedGeneration, encoderProfileId: 'enc@1', embeddingSpaceId: 'space', dims: 4, chunks: keyed, sentences });
    expect(store.embeddings(['vis-0', 'vis-8'], 'img@1', 4).size).toBe(2);
    expect(store.embeddings(['orphan'], 'img@1', 4).size).toBe(0);

    store.removeVideos(['v1']);
    expect(store.activeVisualGenerations(['v1']).size).toBe(0);
    expect(store.visualSource('v1')).toBeNull();
    expect(store.visualPartition(generation.id)).toBeNull();
    store.close();
  });
});

// ---- 增量构建 ----

describe('增量构建', () => {
  it('跟着内容索引建好全部视频；重启后只靠向量缓存，不再编码', async () => {
    services = open();
    await build(services);
    const store = services.store()!;
    expect(store.activeGenerations(['v1', 'v2', 'v3']).size).toBe(3);
    const encoded = provider.documents;
    expect(encoded).toBeGreaterThan(0);
    await services.close();

    // 世代都在：重启不重建。
    const again = open();
    await build(again);
    expect(provider.documents).toBe(encoded);

    // 清掉世代但向量还在（崩溃在发布前的情形）：重建复用向量。
    const reopened = again.store()!;
    reopened.removeVideos(['v1']);
    again.coordinator.schedule(0);
    await again.coordinator.idle();
    expect(reopened.activeGenerations(['v1']).size).toBe(1);
    expect(provider.documents).toBe(encoded);
  });

  it('清除删掉索引与向量，文件也缩回去；之后按当前内容重建', async () => {
    services = open();
    await build(services);
    const store = services.store()!;
    const built = store.sizeBytes();
    await services.coordinator.clear();
    services.coordinator.pause();
    await services.coordinator.idle();
    expect(store.activeGenerations(['v1', 'v2', 'v3']).size).toBe(0);
    expect(store.sizeBytes()).toBeLessThan(built);
    services.coordinator.resume();
    await build(services);
    expect(store.activeGenerations(['v1', 'v2', 'v3']).size).toBe(3);
  });

  it('视频改了版本才重建；Space 里没有的视频撤下', async () => {
    services = open();
    await build(services);
    const before = services.store()!.activeGenerations(['v1']).get('v1')!.id;
    reader.videos.set(videos[0]!.dir, { ...V1, revision: 'r2', sentences: [...V1.sentences, 'A brand new closing line.'] });
    await syncIndex(2);
    await services.coordinator.idle();
    const after = services.store()!.activeGenerations(['v1']).get('v1')!;
    expect(after.revision).toBe('r2');
    expect(after.id).not.toBe(before);

    videos.splice(2, 1);
    await syncIndex(2);
    services.coordinator.schedule(0);
    await services.coordinator.idle();
    expect(services.store()!.source('v3')).toBeNull();
  });

  it('暂停持久化，恢复后继续；模型不可用时停下而不是把视频记失败', async () => {
    services = open();
    services.coordinator.pause();
    await build(services);
    expect(services.store()!.activeGenerations(['v1']).size).toBe(0);
    await services.close();

    const again = open();
    expect(again.coordinator.paused).toBe(true);
    provider.failing = 'MODEL_UNAVAILABLE';
    again.coordinator.resume();
    await build(again);
    expect(again.coordinator.blockedReason).toBe('MODEL_UNAVAILABLE');
    expect(again.store()!.sources().filter((s) => s.state === 'failed')).toEqual([]);

    provider.failing = null;
    again.coordinator.schedule(0);
    await again.coordinator.idle();
    expect(again.store()!.activeGenerations(['v1', 'v2', 'v3']).size).toBe(3);
  });

  it('换了模型（profile 变了）而内容没变时也按新 profile 重建；重建之前语义检索报 PROFILE_INCOMPATIBLE', async () => {
    services = open();
    await build(services);
    await services.close();
    provider = new CountingProvider(32);
    const again = open();
    again.coordinator.pause();
    await build(again);
    const error = await rejection(again.search.searchV2(USER_VIEWER, { query: { kind: 'text', text: 'battery' }, mode: 'semantic' }));
    expect(reasonOf(error)).toBe('PROFILE_INCOMPATIBLE');
    again.coordinator.resume();
    await again.coordinator.idle();
    const generations = [...again.store()!.activeGenerations(['v1', 'v2', 'v3']).values()];
    expect(generations.map((g) => g.encoderProfileId)).toEqual(Array(3).fill('test-hashing-32-retrieval@1'));
    expect(provider.documents).toBeGreaterThan(0);
    const result = await again.search.searchV2(USER_VIEWER, { query: { kind: 'text', text: 'battery' }, mode: 'semantic' });
    expect(result.hits.length).toBeGreaterThan(0);
  });

  it('只建设置里的项目', async () => {
    services = open({ indexedProjects: ['p1'] });
    await build(services);
    expect([...services.store()!.activeGenerations(['v1', 'v2', 'v3']).keys()]).toEqual(['v1']);
  });
});

describe('画面索引', () => {
  const CLIP = { contentHash: 'h-clip', seconds: 40 };

  async function withClips(): Promise<void> {
    // v1、v2 用同一份素材，v3 没有画面。
    reader.videos.set(videos[0]!.dir, { ...V1, revision: 'r2', clip: CLIP });
    reader.videos.set(videos[1]!.dir, { ...V2, revision: 'r2', clip: CLIP });
    await syncIndex(2);
  }

  it('设置开了画面：文字建完再按每 8 秒取帧建画面；同一份素材只编码一次，重启不再编码', async () => {
    await withClips();
    const frames = new FakeFrames();
    services = open({ channels: ['text', 'visual'], frames });
    await build(services);
    const store = services.store()!;
    expect(store.activeGenerations(['v1', 'v2', 'v3']).size).toBe(3);
    const generations = store.activeVisualGenerations(['v1', 'v2', 'v3']);
    expect([...generations.keys()].sort()).toEqual(['v1', 'v2', 'v3']);
    expect(frameTimes(40)).toEqual([4, 12, 20, 28, 36]);
    const partition = store.visualPartition(generations.get('v1')!.id)!;
    expect(partition.frames.map((f) => f.sourceSec)).toEqual([4, 12, 20, 28, 36]);
    expect(partition.frames.every((f) => f.assetId === 'a1' && f.contentHash === 'h-clip')).toBe(true);
    expect(provider.images).toBe(5);
    expect(frames.calls).toBe(5);
    // v3 没有画面素材：发布一个空的画面世代，不算失败。
    expect(store.visualSource('v3')?.state).toBe('empty');
    expect(store.visualPartition(generations.get('v3')!.id)!.frames).toEqual([]);
    await services.close();

    const again = open({ channels: ['text', 'visual'], frames });
    await build(again);
    expect(provider.images).toBe(5);
    expect(frames.calls).toBe(5);
  });

  it('设置没开时只建要过的视频（space.indexBuild 带 visual），之后跟着内容变化保持更新', async () => {
    await withClips();
    const frames = new FakeFrames();
    services = open({ frames });
    await build(services);
    expect(services.store()!.visualSources()).toEqual([]);
    expect(services.coordinator.build([videos[0]!], { channels: ['visual'] })).toBe(1);
    await services.coordinator.idle();
    const store = services.store()!;
    expect([...store.activeVisualGenerations(['v1', 'v2', 'v3']).keys()]).toEqual(['v1']);

    reader.videos.set(videos[0]!.dir, { ...V1, revision: 'r3', clip: { contentHash: 'h-new', seconds: 10 } });
    await syncIndex(3);
    await services.coordinator.idle();
    const after = store.activeVisualGenerations(['v1']).get('v1')!;
    expect(after.revision).toBe('r3');
    expect(store.visualPartition(after.id)!.frames.map((f) => [f.contentHash, f.sourceSec])).toEqual([['h-new', 4]]);
    expect(store.visualSource('v2')).toBeNull();
  });

  it('取不出的帧跳过；只装了文字模型包时画面停下、文字照建；暂停也停画面', async () => {
    await withClips();
    const frames = new FakeFrames();
    frames.broken.add(12);
    provider.noVision = true;
    services = open({ channels: ['text', 'visual'], frames });
    await build(services);
    const store = services.store()!;
    expect(store.activeGenerations(['v1', 'v2', 'v3']).size).toBe(3);
    expect(store.activeVisualGenerations(['v1', 'v2']).size).toBe(0);
    expect(services.coordinator.visual?.blockedReason).toBe('MODEL_NOT_INSTALLED');
    expect(store.visualSources().filter((s) => s.state === 'failed')).toEqual([]);

    provider.noVision = false;
    services.coordinator.pause();
    services.coordinator.schedule(0);
    await services.coordinator.idle();
    expect(store.activeVisualGenerations(['v1', 'v2']).size).toBe(0);
    services.coordinator.resume();
    await services.coordinator.idle();
    const generation = store.activeVisualGenerations(['v1']).get('v1')!;
    expect(store.visualPartition(generation.id)!.frames.map((f) => f.sourceSec)).toEqual([4, 20, 28, 36]);
    expect(services.coordinator.visual?.blockedReason).toBeNull();

    // Space 里没有的视频：画面也撤下。
    videos.splice(0, 1);
    await syncIndex(3);
    services.coordinator.schedule(0);
    await services.coordinator.idle();
    expect(store.visualSource('v1')).toBeNull();
  });

  it('space.indexBuild：画面要有取帧来源与能读图的模型包，声音通道还没有', async () => {
    await withClips();
    const catalog = { videos: () => videos, index, scanning: false } as unknown as SpaceCatalog;
    const methods = (s: SemanticServices) =>
      spaceMethods(catalog, { harness: {} as never, trash: {} as never, thumbnails: {} as never, semantic: s, artifacts: null });
    const plain = open();
    await build(plain);
    const principal = { kind: 'local' } as unknown as TrustedPrincipal;
    const call = (s: SemanticServices, channels: string[]) =>
      Promise.resolve(methods(s)['space.indexBuild']({ channels } as never, principal));
    expect(reasonOf(await rejection(call(plain, ['visual'])))).toBe('CHANNEL_UNAVAILABLE');
    await plain.close();

    provider.noVision = true;
    const visual = open({ frames: new FakeFrames() });
    await build(visual);
    expect(reasonOf(await rejection(call(visual, ['audio'])))).toBe('CHANNEL_UNAVAILABLE');
    const missing = await rejection(call(visual, ['visual']));
    expect(missing.details).toMatchObject({ reason: 'MODEL_NOT_INSTALLED', channel: 'visual' });
  });
});

// ---- 检索 ----

describe('space.searchV2', () => {
  it('字面模式与旧的 space.search 命中一致', async () => {
    services = open();
    await build(services);
    const catalog = { videos: () => videos, index, scanning: false };
    const old = searchContent(catalog, USER_VIEWER, { query: 'battery', limit: 50 });
    const v2 = await services.search.searchV2(USER_VIEWER, { query: { kind: 'text', text: 'battery' }, mode: 'lexical' });
    expect(v2.effectiveMode).toBe('lexical');
    expect(v2.rankingVersion).toBe(RANKING_VERSION);
    expect(v2.hits.map((h) => [h.target.videoId, h.snippet])).toEqual(old.hits.map((h) => [h.videoId, h.snippet]));
    expect(v2.hits.every((h) => h.matchedBy.join() === 'lexical' && h.highlights.length > 0)).toBe(true);
  });

  it('语义模式找到字面上没有的说法；综合模式两路融合', async () => {
    services = open();
    await build(services);
    const lexical = await services.search.searchV2(USER_VIEWER, { query: { kind: 'text', text: 'power cell' }, mode: 'lexical' });
    expect(lexical.hits).toEqual([]);
    const semantic = await services.search.searchV2(USER_VIEWER, { query: { kind: 'text', text: 'power cell' }, mode: 'semantic' });
    expect(semantic.effectiveMode).toBe('semantic');
    expect(semantic.hits.length).toBeGreaterThan(0);
    expect(semantic.hits[0]!.snippet).toContain('battery');
    expect(semantic.hits.every((h) => h.highlights.length === 0 && h.matchedBy.join() === 'semantic')).toBe(true);
    // 结果总给出最近的一批：分数低于弱命中线的标 weak，几乎原样的那条不是。
    const exact = await services.search.searchV2(USER_VIEWER, { query: { kind: 'text', text: V3.sentences[0]! }, mode: 'semantic' });
    expect(exact.hits[0]).toMatchObject({ weak: false, target: { videoId: 'v3' } });
    expect(exact.hits.slice(1).every((h) => h.weak)).toBe(true);

    const hybrid = await services.search.searchV2(USER_VIEWER, { query: { kind: 'text', text: 'battery' }, mode: 'hybrid' });
    expect(hybrid.effectiveMode).toBe('hybrid');
    expect(hybrid.degraded).toBeNull();
    const both = hybrid.hits.filter((h) => h.matchedBy.length === 2);
    expect(both.length).toBeGreaterThan(0);
    // 两路都命中的排在只有一路的前面（RRF）。
    const firstSingle = hybrid.hits.findIndex((h) => h.matchedBy.length === 1);
    if (firstSingle >= 0) expect(hybrid.hits.findIndex((h) => h.matchedBy.length === 2)).toBeLessThan(firstSingle);
    for (let i = 1; i < hybrid.hits.length; i++) expect(hybrid.hits[i - 1]!.rank).toBeGreaterThanOrEqual(hybrid.hits[i]!.rank);
    // 字面命中从不标弱。
    expect(hybrid.hits.filter((h) => h.matchedBy.includes('lexical')).every((h) => !h.weak)).toBe(true);
    expect(SEMANTIC_THRESHOLDS.fusion.k).toEqual({ value: 60, calibrated: false });
  });

  it('对来源与对外服务零泄漏：范围外的视频不进结果、也不被扫描', async () => {
    services = open();
    await build(services);
    const store = services.store()!;
    const own = store.activeGenerations(['v1']).get('v1')!.id;
    services.scanner.touched.clear();
    const result = await services.search.searchV2(SOURCE_P1, { query: { kind: 'text', text: 'battery launch secret' }, mode: 'hybrid' });
    expect(result.hits.every((h) => h.target.videoId === 'v1')).toBe(true);
    expect(JSON.stringify(result)).not.toMatch(/Secret|confidential|pasta/);
    expect([...services.scanner.touched]).toEqual([own]);

    const service: SpaceViewer = { kind: 'service', videos: new Set(['v2']), owns: () => false, jobs: () => null };
    const scoped = await services.search.searchV2(service, { query: { kind: 'text', text: 'camera battery interview' }, mode: 'semantic' });
    expect(scoped.hits.every((h) => h.target.videoId === 'v2')).toBe(true);
    expect(scoped.coverage[0]).toMatchObject({ indexed: 1 });
    const status = await services.search.indexStatus(service);
    expect(status.cacheBytes).toBe(0);
    expect(JSON.stringify(status)).not.toMatch(/v1|v3/);
  });

  it('没有模型：语义模式报 MODEL_NOT_INSTALLED，综合模式退回字面并说明原因', async () => {
    services = open({ provider: null });
    await build(services);
    const error = await rejection(services.search.searchV2(USER_VIEWER, { query: { kind: 'text', text: 'battery' }, mode: 'semantic' }));
    expect(reasonOf(error)).toBe('MODEL_NOT_INSTALLED');
    expect(error.code).toBe('unsupported');
    const hybrid = await services.search.searchV2(USER_VIEWER, { query: { kind: 'text', text: 'battery' }, mode: 'hybrid' });
    expect(hybrid.effectiveMode).toBe('lexical');
    expect(hybrid.degraded).toEqual({ reason: 'MODEL_NOT_INSTALLED' });
    expect(hybrid.hits.length).toBeGreaterThan(0);
  });

  it('输入与能力的错误带原因码', async () => {
    services = open();
    await build(services);
    const search = (params: object) => rejection(services!.search.searchV2(USER_VIEWER, { query: { kind: 'text', text: 'battery' }, mode: 'hybrid', ...params }));
    const tooLong = await rejection(services.search.searchV2(USER_VIEWER, { query: { kind: 'text', text: 'x'.repeat(1001) }, mode: 'lexical' }));
    expect([reasonOf(tooLong), tooLong.code]).toEqual(['INPUT_TOO_LONG', 'invalid-request']);
    expect(tooLong.message).toContain('1000');
    expect(reasonOf(await search({ appearance: 'rendered' }))).toBe('APPEARANCE_UNAVAILABLE');
    expect(reasonOf(await search({ channels: ['visual'] }))).toBe('CHANNEL_UNAVAILABLE');
    expect(reasonOf(await search({ query: { kind: 'image', referenceId: 'e1' } }))).toBe('CHANNEL_UNAVAILABLE');
  });

  it('翻页游标：同一查询接着翻，索引或查询变了报 CURSOR_STALE', async () => {
    services = open();
    await build(services);
    const params = { query: { kind: 'text' as const, text: 'the battery' }, mode: 'hybrid' as const, limit: 1 };
    const first = await services.search.searchV2(USER_VIEWER, params);
    expect(first.nextCursor).not.toBeNull();
    const second = await services.search.searchV2(USER_VIEWER, { ...params, cursor: first.nextCursor! });
    expect(second.hits[0]!.hitId).not.toBe(first.hits[0]!.hitId);
    const other = await rejection(services.search.searchV2(USER_VIEWER, { ...params, query: { kind: 'text', text: 'other' }, cursor: first.nextCursor! }));
    expect([reasonOf(other), other.code]).toEqual(['CURSOR_STALE', 'conflict']);

    reader.videos.set(videos[0]!.dir, { ...V1, revision: 'r2' });
    await syncIndex(3);
    await services.coordinator.idle();
    expect(reasonOf(await rejection(services.search.searchV2(USER_VIEWER, { ...params, cursor: first.nextCursor! })))).toBe('CURSOR_STALE');
  });

  it('同一段话的文稿与字幕只留一条', async () => {
    await addVideo({ videoId: 'v5', name: 'Subtitled', revision: 'r1', sentences: ['The tripod head was loose.', 'We bought a new tripod.'], onTimeline: [], captions: true }, 'p5', 'c5');
    await syncIndex();
    services = open();
    await build(services);
    const result = await services.search.searchV2(USER_VIEWER, { query: { kind: 'text', text: 'tripod head loose' }, mode: 'hybrid', videoIds: ['v5'] });
    const first = result.hits.filter((h) => h.snippet.includes('loose'));
    expect(first).toHaveLength(1);
    const lexical = await services.search.searchV2(USER_VIEWER, { query: { kind: 'text', text: 'loose' }, mode: 'lexical', videoIds: ['v5'] });
    // 字面模式与旧的 space.search 一致，不去重。
    expect(lexical.hits.map((h) => h.target.kind === 'document-span' && h.target.documentKind).sort()).toEqual(['caption', 'speech']);
  });

  it('范围里还有没建好的视频时标 INDEX_PARTIAL；没纳入设置的项目单独计数', async () => {
    services = open({ indexedProjects: ['p1'] });
    await build(services);
    const result = await services.search.searchV2(USER_VIEWER, { query: { kind: 'text', text: 'battery' }, mode: 'semantic' });
    expect(result.coverage[0]).toMatchObject({ indexed: 1, missingInput: 0, excluded: 2 });
    const scoped = await services.search.searchV2(USER_VIEWER, { query: { kind: 'text', text: 'battery' }, mode: 'semantic', projectId: 'p1' });
    expect(scoped.degraded).toBeNull();
    expect(scoped.coverage[0]!.knownScopeComplete).toBe(true);

    // 设置里要建、但还没建好的视频：结果标不完整。
    services.coordinator.pause();
    await addVideo({ videoId: 'v4', name: 'Late', revision: 'r1', sentences: ['Another battery story.'] }, 'p1', 'c4');
    await syncIndex();
    await services.coordinator.idle();
    const partial = await services.search.searchV2(USER_VIEWER, { query: { kind: 'text', text: 'battery' }, mode: 'semantic', projectId: 'p1' });
    expect(partial.degraded).toEqual({ reason: 'INDEX_PARTIAL' });
    expect(partial.coverage[0]).toMatchObject({ indexed: 1, pending: 1, knownScopeComplete: false });
  });
});

// ---- 结果解析 ----

describe('space.resolveSearchHit', () => {
  it('在时间线上：resolved；只剩文稿里：not-in-timeline；视频没了或看不到：gone', async () => {
    services = open();
    await build(services);
    const catalog = { videos: () => videos, index, scanning: false };
    const options = { catalog, reader };
    const result = await services.search.searchV2(USER_VIEWER, { query: { kind: 'text', text: 'backup microphone' }, mode: 'hybrid', videoIds: ['v1'] });
    const hit = result.hits.find((h) => h.snippet.includes('microphone'))!;
    expect(hit.anchor.clock).toBe('sequence');
    const resolved = await resolveSearchHit(options, USER_VIEWER, hit.hitId);
    expect(resolved).toMatchObject({ status: 'resolved', videoId: 'v1', revision: 'r1' });
    expect(resolved.spans[0]!.clock).toBe('sequence');

    // 这些句子从时间线上剪掉了（文稿里还在）。
    reader.videos.set(videos[0]!.dir, { ...V1, revision: 'r2', onTimeline: [] });
    const cut = await resolveSearchHit(options, USER_VIEWER, hit.hitId);
    expect(cut.status).toBe('not-in-timeline');
    expect(cut.spans.every((s) => s.clock === 'source')).toBe(true);

    expect(await resolveSearchHit(options, { kind: 'source', projectId: 'p2', conversationId: 'c2' }, hit.hitId)).toMatchObject({ status: 'gone', videoId: null });
    videos.splice(0, 1);
    expect((await resolveSearchHit(options, USER_VIEWER, hit.hitId)).status).toBe('gone');
    const bad = await rejection(resolveSearchHit(options, USER_VIEWER, 'not-a-hit'));
    expect(bad.code).toBe('invalid-request');
  });
});

// ---- SemanticContext ----

describe('SemanticContext', () => {
  it('按意图取句子：语义可用时带邻句；没有模型时退回字面、形状不变', async () => {
    services = open();
    await build(services);
    const context = services.context(USER_VIEWER);
    const set = await context.findRelevantChunks({ intent: 'camera battery', scope: { videoIds: ['v1'] }, channel: 'text', limit: 3, order: 'relevance', neighbors: 1 });
    expect(set.effectiveMode).toBe('semantic');
    expect(set.chunks.length).toBeGreaterThan(0);
    const first = set.chunks[0]!;
    expect(first.videoId).toBe('v1');
    expect(first.sentences.some((s) => s.text.includes('battery') && !s.neighbor)).toBe(true);
    expect(first.sentences.every((s) => s.clock === 'sequence' && typeof s.sentenceId === 'string')).toBe(true);
    // 低于弱命中阈值的只标 weak、不藏起来；调用方明确给 minScore 时才筛。
    expect(set.chunks.every((c) => (c.score < SEMANTIC_THRESHOLDS.thresholds.weakHit.value) === (c.weak === true))).toBe(true);
    const strict = await context.findRelevantChunks({ intent: 'camera battery', scope: { videoIds: ['v1'] }, channel: 'text', limit: 3, order: 'relevance', minScore: 1.01 });
    expect(strict).toMatchObject({ effectiveMode: 'semantic', chunks: [] });
    expect((await context.status({ videoIds: ['v1'] })).state).toBe('ready');

    const bare = open({ provider: null }).context(USER_VIEWER);
    const fallback = await bare.findRelevantChunks({ intent: 'battery', scope: { videoIds: ['v1'] }, channel: 'text', limit: 3, order: 'relevance', neighbors: 0 });
    expect(fallback.effectiveMode).toBe('lexical');
    expect(fallback.reason).toBe('MODEL_NOT_INSTALLED');
    expect(fallback.chunks[0]).toMatchObject({ videoId: 'v1', documentKind: 'speech' });
    expect(fallback.chunks[0]!.sentences[0]!.sentenceId).toMatch(/^s-/);
    await expect(bare.matchFrames({ text: 'x', videoId: 'v1', limit: 1 })).rejects.toThrow();
  });

  it('章节边界用的句群：直接取当前版本索引里的向量，起点跳过与上一个句群重叠的那句；没有模型时 null', async () => {
    const long: FakeVideo = {
      videoId: 'v9',
      name: 'Long talk',
      revision: 'r1',
      sentences: Array.from({ length: 24 }, (_, i) => `Sentence number ${i} talks about the topic of this part of the long recorded talk in some detail.`),
    };
    await addVideo(long, null, null);
    await syncIndex();
    services = open();
    await build(services);
    const units = await services.context(USER_VIEWER).topicUnits({ videoId: 'v9', documentId: 'd-v9' });
    const generation = services.store()!.activeGenerations(['v9']).get('v9')!;
    const chunks = services.store()!.generationChunks(generation.id).filter((c) => c.documentKind === 'speech').sort((a, b) => a.ord - b.ord);
    expect(chunks.length).toBeGreaterThanOrEqual(3);
    expect(units).toHaveLength(chunks.length);
    expect(units![0]!.start).toBe(chunks[0]!.start);
    // 相邻句群重叠一句：从第二个起，起点是第二句的开头（晚于句群自己的起点），时间线上递增。
    const sentenceStarts = long.sentences.map((_, i) => 100 + i * 5);
    for (let i = 1; i < units!.length; i++) {
      expect(units![i]!.start).toBeGreaterThan(chunks[i]!.start);
      expect(sentenceStarts).toContain(units![i]!.start);
      expect(units![i]!.start).toBeGreaterThan(units![i - 1]!.start);
    }
    expect(units![0]!.vector).toHaveLength(generation.dims);
    expect(await services.context(USER_VIEWER).topicUnits({ videoId: 'v9', documentId: 'other' })).toBeNull();
    expect(await open({ provider: null }).context(USER_VIEWER).topicUnits({ videoId: 'v9', documentId: 'd-v9' })).toBeNull();
  });

  it('对称相似只比较看得到的视频', async () => {
    services = open();
    await build(services);
    const pairs = await services.context(USER_VIEWER).pairSimilar({ left: ['The camera battery died.'], right: ['camera battery died', 'pasta'], threshold: 0.5 });
    expect(pairs).toEqual([expect.objectContaining({ left: 0, right: 0 })]);
  });
});

// ---- space.relevantChunks ----

describe('space.relevantChunks', () => {
  it('写作按主题的预览：按时间排、只要讲话，句群带章节与时间；没有语义服务时是 none；对外服务不走网关', async () => {
    services = open();
    await build(services);
    const methods = (semantic: SemanticServices | null) =>
      spaceMethods({} as SpaceCatalog, { harness: {} as never, trash: {} as never, thumbnails: {} as never, semantic: semantic ?? undefined, artifacts: null });
    const user = { kind: 'local' } as unknown as TrustedPrincipal;
    const result = await methods(services)['space.relevantChunks']({ intent: 'camera battery', videoIds: ['v1'], limit: 3 }, user);
    expect(result.effectiveMode).toBe('semantic');
    expect(result.chunks.length).toBeGreaterThan(0);
    expect(result.chunks.every((c) => c.videoId === 'v1' && c.clock === 'sequence' && c.end >= c.start)).toBe(true);
    const starts = result.chunks.map((c) => c.start);
    expect(starts).toEqual([...starts].sort((a, b) => a - b));
    expect(result.chunks.some((c) => c.text.includes('battery'))).toBe(true);
    const none = await methods(null)['space.relevantChunks']({ intent: 'camera battery', videoIds: ['v1'] }, user);
    expect(none).toEqual({ effectiveMode: 'none', reason: 'MODEL_NOT_INSTALLED', coverage: { chapters: [], stale: false }, chunks: [] });
    await expect(methods(services)['space.relevantChunks']({ intent: 'x', videoIds: ['v1'] }, { kind: 'service' } as unknown as TrustedPrincipal)).rejects.toMatchObject({ code: 'forbidden' });
  });
});

// ---- space.relatedVideos ----

describe('space.relatedVideos', () => {
  it('打开视频时按整部视频的意思找别的视频，每部给最近的一段讲话；没有语义服务时退回名字相近', async () => {
    services = open();
    await build(services);
    const entries = new Map(
      videos.map((v) => [
        v.entryId,
        { id: v.entryId, kind: 'video', name: reader.videos.get(v.dir)!.name, source: { projectId: v.projectId, conversationId: v.conversationId }, user: { trashedAt: null }, ref: { videoId: v.videoId } } as unknown as SpaceEntry,
      ]),
    );
    const catalog = { videos: () => videos, index, scanning: false, get: (id: Id) => entries.get(id)! } as unknown as SpaceCatalog;
    const methods = (semantic: SemanticServices | null) =>
      spaceMethods(catalog, { harness: {} as never, trash: {} as never, thumbnails: {} as never, semantic: semantic ?? undefined, artifacts: null });
    const user = { kind: 'local' } as unknown as TrustedPrincipal;
    const saved = SEMANTIC_THRESHOLDS.thresholds.related.value;
    SEMANTIC_THRESHOLDS.thresholds.related.value = -1;
    try {
      const result = await methods(services)['space.relatedVideos']({ entryId: 'e-v1' }, user);
      expect(result.basis).toBe('semantic');
      expect(result.videos.map((v) => v.videoId).sort()).toEqual(['v2', 'v3']);
      for (const v of result.videos) {
        expect(v.passage?.clock).toBe('sequence');
        expect(v.passage!.end).toBeGreaterThanOrEqual(v.passage!.start);
        expect(reader.videos.get(videos.find((x) => x.videoId === v.videoId)!.dir)!.sentences.some((s) => v.passage!.text.includes(s.split(' ')[0]!))).toBe(true);
      }
    } finally {
      SEMANTIC_THRESHOLDS.thresholds.related.value = saved;
    }
    const none = await methods(null)['space.relatedVideos']({ entryId: 'e-v1' }, user);
    expect(none).toEqual({ basis: 'name', reason: 'MODEL_NOT_INSTALLED', videos: [] });
    await expect(methods(services)['space.relatedVideos']({ entryId: 'e-v1' }, { kind: 'service' } as unknown as TrustedPrincipal)).rejects.toMatchObject({ code: 'forbidden' });
  });
});

// ---- space.citations ----

describe('space.citations', () => {
  it('读出处旁文件；没有、读不出或格式不对时为 null', async () => {
    const files = new Map<string, string>();
    const artifacts = { locate: async (id: string) => files.get(id) ?? null };
    const entry = (artifactId: string | null) => ({ entryId: 'e1', citations: artifactId ? { artifactId } : null }) as unknown as SpaceEntry;
    const good = path.join(tmp, 'good.json');
    await fs.writeFile(good, JSON.stringify({ schema: 'baocut.citations/1', paragraphs: [], videoIds: ['v1'] }));
    const bad = path.join(tmp, 'bad.json');
    await fs.writeFile(bad, JSON.stringify({ schema: 'other/1', paragraphs: [], videoIds: [] }));
    files.set('a-good', good);
    files.set('a-bad', bad);
    files.set('a-missing', path.join(tmp, 'nope.json'));
    expect(await readCitations(entry('a-good'), artifacts)).toMatchObject({ schema: 'baocut.citations/1', videoIds: ['v1'] });
    expect(await readCitations(entry('a-bad'), artifacts)).toBeNull();
    expect(await readCitations(entry('a-missing'), artifacts)).toBeNull();
    expect(await readCitations(entry(null), artifacts)).toBeNull();
    expect(await readCitations(entry('a-good'), null)).toBeNull();
  });
});


// ---- 智能体工具 ----

describe('语义检索的智能体工具', () => {
  function tools(registry = new MemoryCitationRegistry(), conversation: object = { id: 'c-x', projectId: 'p1', folderOf: null }) {
    const scope = {
      authorize: (principal: ToolPrincipal) => (principal.kind === 'agent' ? { principal, conversation } : { principal }),
    } as unknown as ToolScope;
    return { registry, tools: new SemanticTools({ semantic: () => services, space: spaceOf, scope, jobs: { list: () => [] }, registry }) };
  }
  /** 带条目的 Space 目录（相关视频要按条目找）。 */
  function spaceOf(): SpaceCatalog {
    const entries = new Map(
      videos.map((v) => [
        v.entryId,
        { id: v.entryId, kind: 'video', name: reader.videos.get(v.dir)!.name, source: { projectId: v.projectId, conversationId: v.conversationId }, user: { trashedAt: null }, ref: { videoId: v.videoId } } as unknown as SpaceEntry,
      ]),
    );
    return { videos: () => videos, index, scanning: false, get: (id: Id) => entries.get(id)! } as unknown as SpaceCatalog;
  }
  const agent = { kind: 'agent', conversationId: 'c-x' } as unknown as ToolPrincipal;

  it('speech_relevant 给时间线上的讲话句子发出处编号，同一句再取沿用原编号；范围不超过会话', async () => {
    services = open();
    await build(services);
    const { registry, tools: t } = tools();
    const first = (await t.dispatch('speech_relevant', { intent: 'battery', neighbors: 0 }, agent)) as {
      effectiveMode: string;
      chunks: { videoId: string; sentences: { ref?: string; text: string; start: number }[] }[];
    };
    expect(first.effectiveMode).toBe('semantic');
    expect(first.chunks.every((c) => c.videoId === 'v1')).toBe(true);
    const refs = first.chunks.flatMap((c) => c.sentences.map((s) => s.ref));
    expect(refs.length).toBeGreaterThan(0);
    expect(refs.every((ref) => typeof ref === 'string' && /^s\d+$/.test(ref))).toBe(true);
    const issued = registry.issued('conversation:c-x');
    expect(issued.length).toBe(new Set(refs).size);
    expect(issued[0]).toMatchObject({ videoId: 'v1', documentId: 'd-v1' });
    expect(issued[0]!.start).toBeGreaterThanOrEqual(100);
    const again = (await t.dispatch('speech_relevant', { intent: 'battery', neighbors: 0 }, agent)) as typeof first;
    expect(again.chunks.flatMap((c) => c.sentences.map((s) => s.ref))).toEqual(refs);
  });

  it('space_search_v2 与 space_resolve_search_hit；没有语义服务时报 SEMANTIC_UNAVAILABLE', async () => {
    services = open();
    await build(services);
    const { tools: t } = tools();
    const result = (await t.dispatch('space_search_v2', { query: 'backup microphone' }, agent)) as {
      hits: { hitId: string; videoId: string; time: { clock: string; start: number }; needsResolve?: true; href?: string }[];
      effectiveMode: string;
    };
    expect(result.effectiveMode).toBe('hybrid');
    expect(result.hits.every((h) => h.videoId === 'v1')).toBe(true);
    // 在当前时间线上的命中带链接，源时间与要重新定位的不带。
    for (const h of result.hits) expect(h.href).toBe(h.time.clock === 'sequence' && !h.needsResolve ? videoTimeHref(h.videoId, h.time.start) : undefined);
    expect(result.hits.some((h) => h.href)).toBe(true);
    const resolved = (await t.dispatch('space_resolve_search_hit', { hitId: result.hits[0]!.hitId }, agent)) as SemanticResolveResult & { href?: string };
    expect(resolved).toMatchObject({ status: 'resolved' });
    const span = resolved.spans.find((x) => x.clock === 'sequence')!;
    expect(resolved.href).toBe(videoTimeHref('v1', span.startSec));
    services = null;
    await expect(t.dispatch('space_search_v2', { query: 'x' }, agent)).rejects.toMatchObject({ code: 'SEMANTIC_UNAVAILABLE' });
  });

  it('space_index_status 按视频给状态，能等到建好；没有转写的、没纳入的分开写', async () => {
    const v4 = await addVideo({ videoId: 'v4', name: 'Silent', revision: 'r1', sentences: [] }, 'p1', 'c-x');
    await syncIndex();
    services = open({ indexedProjects: ['p1'] });
    const { tools: wide } = tools(undefined, { id: 'c-x', projectId: null, spaceReadScope: 'all' });
    // 还没开始建：都在排队（v2、v3 不在纳入的项目里）。
    const before = (await wide.dispatch('space_index_status', {}, agent)) as { available: boolean; videos: { videoId: string; state: string }[] };
    expect(before.available).toBe(true);
    expect(Object.fromEntries(before.videos.map((v) => [v.videoId, v.state]))).toEqual({ v1: 'pending', v2: 'excluded', v3: 'excluded', v4: 'pending' });
    services.coordinator.start();
    const waited = (await wide.dispatch('space_index_status', { videoIds: ['v1', 'v4'], waitSec: 10 }, agent)) as {
      settled: boolean;
      videos: { videoId: string; state: string; name: string }[];
      coverage: { indexed: number; missingInput: number; pending: number };
    };
    expect(waited.settled).toBe(true);
    expect(waited.videos).toEqual([
      { videoId: 'v1', name: 'Interview', state: 'indexed' },
      { videoId: 'v4', name: 'Silent', state: 'missingInput' },
    ]);
    expect(waited.coverage).toMatchObject({ indexed: 1, missingInput: 1, pending: 0 });
    expect(v4.videoId).toBe('v4');
  });

  it('space_index_build 只按会话自己的范围催建；没装模型或没有语义服务时什么也不做', async () => {
    services = open();
    const { tools: t } = tools(undefined, { id: 'c-x', projectId: null, spaceReadScope: 'all' });
    // 放宽的只读范围不用于建索引：无项目会话 c-x 自己的目录里没有视频。
    const own = (await t.dispatch('space_index_build', {}, agent)) as { planned: number; videos: unknown[] };
    expect(own).toMatchObject({ planned: 0, videos: [] });
    const { tools: p1 } = tools();
    const built = (await p1.dispatch('space_index_build', { waitSec: 10 }, agent)) as { planned: number; settled: boolean; videos: { videoId: string; state: string }[] };
    expect(built).toMatchObject({ planned: 1, settled: true, videos: [{ videoId: 'v1', state: 'indexed' }] });
    services = open({ provider: null });
    expect(await p1.dispatch('space_index_build', { waitSec: 5 }, agent)).toMatchObject({ planned: 0, available: false, reason: 'MODEL_NOT_INSTALLED', settled: false });
    services = null;
    expect(await p1.dispatch('space_index_status', {}, agent)).toMatchObject({ available: false });
  });

  it('space_related_videos 按 videoId 找讲相近内容的视频，在时间线上的段落带链接', async () => {
    services = open();
    await build(services);
    const saved = SEMANTIC_THRESHOLDS.thresholds.related.value;
    SEMANTIC_THRESHOLDS.thresholds.related.value = -1;
    try {
      const { tools: wide } = tools(undefined, { id: 'c-x', projectId: null, spaceReadScope: 'all' });
      const result = (await wide.dispatch('space_related_videos', { videoId: 'v1' }, agent)) as {
        basis: string;
        videos: { videoId: string; passage?: { href?: string; text: string } }[];
      };
      expect(result.basis).toBe('semantic');
      expect(result.videos.map((v) => v.videoId).sort()).toEqual(['v2', 'v3']);
      expect(result.videos.every((v) => v.passage?.href?.startsWith(`/videos/${v.videoId}?t=`))).toBe(true);
      // 看不到的视频与不存在的一样。
      const { tools: narrow } = tools(undefined, { id: 'c-y', projectId: null });
      await expect(narrow.dispatch('space_related_videos', { videoId: 'v1' }, agent)).rejects.toMatchObject({ code: 'VIDEO_NOT_FOUND' });
    } finally {
      SEMANTIC_THRESHOLDS.thresholds.related.value = saved;
    }
  });

  it('用户给会话放宽的只读检索范围：all 看得到全部视频，unfiled 只多看不属于项目的；别的用途不放宽', async () => {
    services = open();
    await build(services);
    const videosOf = async (conversation: object) => {
      const { tools: t } = tools(undefined, conversation);
      const result = (await t.dispatch('space_search_v2', { query: 'battery', mode: 'lexical' }, agent)) as { hits: { videoId: string }[] };
      return [...new Set(result.hits.map((h) => h.videoId))].sort();
    };
    // 无项目会话 c-y 本来什么也看不到（三部视频都不在它的工作目录里）。
    expect(await videosOf({ id: 'c-y', projectId: null })).toEqual([]);
    expect(await videosOf({ id: 'c-y', projectId: null, spaceReadScope: 'all' })).toEqual(['v1', 'v2', 'v3']);
    expect(await videosOf({ id: 'c-y', projectId: null, spaceReadScope: 'unfiled' })).toEqual(['v3']);
    // 旧的 Space 工具（space_search，与 space_list 同一个取范围的入口）同样放宽。
    const spaceSearch = async (conversation: object) => {
      const scope = { authorize: (principal: ToolPrincipal) => ({ principal, conversation }) } as unknown as ToolScope;
      const space = () => ({ videos: () => videos, index, scanning: false }) as unknown as SpaceCatalog;
      const result = (await new SpaceTools({ space, scope, jobs: { list: () => [] } }).dispatch('space_search', { query: 'battery' }, agent)) as { hits: { videoId: string }[] };
      return [...new Set(result.hits.map((h) => h.videoId))].sort();
    };
    expect(await spaceSearch({ id: 'c-y', projectId: null })).toEqual([]);
    expect(await spaceSearch({ id: 'c-y', projectId: null, spaceReadScope: 'all' })).toEqual(['v1', 'v2', 'v3']);
    // 放宽的命中也能重新定位。
    const { tools: wide } = tools(undefined, { id: 'c-y', projectId: null, spaceReadScope: 'all' });
    const hits = (await wide.dispatch('space_search_v2', { query: 'confidential budget', mode: 'lexical' }, agent)) as { hits: { hitId: string; videoId: string }[] };
    expect(hits.hits[0]!.videoId).toBe('v2');
    expect(await wide.dispatch('space_resolve_search_hit', { hitId: hits.hits[0]!.hitId }, agent)).toMatchObject({ status: 'resolved' });
    // 不是检索的用途（生图取输入图等）不带放宽的范围。
    const scope = { authorize: (principal: ToolPrincipal) => ({ principal, conversation: { id: 'c-y', projectId: null, spaceReadScope: 'all' } }) } as unknown as ToolScope;
    expect(spaceViewerOf(scope, { list: () => [] }, agent)).toEqual({ kind: 'source', projectId: null, conversationId: 'c-y' });
    expect(spaceViewerOf(scope, { list: () => [] }, agent, { retrieval: true })).toMatchObject({ readScope: 'all' });
  });
});

describe('放宽的只读检索范围只多看视频条目', () => {
  it('visibleTo：范围里的视频条目看得到，别处的文件看不到', () => {
    const viewer: SpaceViewer = { kind: 'source', projectId: null, conversationId: 'c-y', readScope: 'all' };
    const entry = (kind: SpaceEntry['kind'], projectId: string | null) =>
      ({ kind, source: { projectId, conversationId: projectId ? null : 'c-other' }, origin: null }) as unknown as SpaceEntry;
    expect(visibleTo(viewer, entry('video', 'p1'))).toBe(true);
    expect(visibleTo(viewer, entry('image', 'p1'))).toBe(false);
    expect(visibleTo({ ...viewer, readScope: 'unfiled' }, entry('video', 'p1'))).toBe(false);
    expect(visibleTo({ ...viewer, readScope: 'unfiled' }, entry('video', null))).toBe(true);
    expect(visibleTo({ ...viewer, readScope: 'unfiled' }, entry('document', null))).toBe(false);
  });
});
