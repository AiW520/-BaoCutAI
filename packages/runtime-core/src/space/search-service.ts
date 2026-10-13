import crypto from 'node:crypto';
import {
  SEMANTIC_QUERY_MAX_CHARS,
  SPACE_SEARCH_V2_MAX_LIMIT,
  type Id,
  type SearchHitAnchor,
  type SemanticCoverage,
  type SemanticEvidenceType,
  type SemanticHitAction,
  type SemanticIndexStatus,
  type SemanticIndexStatusParams,
  type SemanticReason,
  type SpaceSearchDocumentKind,
  type SpaceSearchHit,
  type SpaceSearchV2Hit,
  type SpaceSearchV2Params,
  type SpaceSearchV2Result,
} from '@baocut/protocol';
import type { EmbeddingProfile } from '@baocut/models';
import type { SearchableVideo } from './content-search.ts';
import { searchScope, type SearchScope, type SpaceSearchSource, type SpaceViewer } from './space-queries.ts';
import type { SemanticCoordinator, SemanticSettings } from './semantic/coordinator.ts';
import { reasonOf, semanticError } from './semantic/errors.ts';
import { encodeHitId } from './semantic/hit-id.ts';
import type { EmbeddingScheduler } from './semantic/scheduler.ts';
import type { GenerationRow, SemanticStore, StoredChunk } from './semantic/store.ts';
import { RANKING_VERSION, SEMANTIC_THRESHOLDS } from './semantic/thresholds.ts';
import type { ScanHit, VectorScanner } from './semantic/vector-index.ts';

/**
 * `space.searchV2` 与 `space.indexStatus`（EmbeddingGemma 2 检索集成方案 v0.1 §10、§11）。
 *
 * 顺序（§10.1）：校验输入 → 按主体与筛选确定范围（`searchScope`，与 `space.search` 同一套规则）→ 只取范围内视频当前发布的世代 →
 * 在这些世代里精确扫描（范围先于计算：没有「先全库取再删」）→ 字面一路走内容索引（旧 `space.search` 的同一个检索）→
 * 按名次融合（RRF，§10.2）→ 去重 → 分页。
 *
 * 模式：
 * - `lexical`：就是旧 `space.search` 的命中（同样的顺序与片段），换成 V2 的形状。
 * - `semantic`：只走向量；不可用（没装模型、索引没建、profile 不兼容）时报错，不把空结果当成功（§11.5）。
 * - `hybrid`：两路融合；向量一路不可用时退回字面，结果写 `effectiveMode: 'lexical'` 与 `degraded.reason`。
 *
 * 范围内有还没建好或落后的索引时照样返回结果，并标 `INDEX_PARTIAL`；覆盖情况在 `coverage` 里逐项给出。
 * `view` 只是偏好：命中的锚点按实际的时钟给（素材不在时间线上时是源时间）。
 */

export interface SearchServiceOptions {
  catalog: SpaceSearchSource;
  store: () => SemanticStore | null;
  scanner: VectorScanner;
  scheduler: () => EmbeddingScheduler | null;
  coordinator: SemanticCoordinator | null;
  settings: () => SemanticSettings;
  /** 模型包的显示信息（设置页）；没有时用 profile 的 ID。 */
  model?: () => { bundleId: string; label: string } | null;
}

const DEFAULT_LIMIT = 20;
const SNIPPET_MAX = 240;
const CURSOR_TTL_MS = 5 * 60 * 1000;

/** 范围内一个视频的语义索引状况。 */
export interface ScopedVideo {
  video: SearchableVideo;
  generation: GenerationRow | null;
  /** 当前 profile 能用的世代（同一个 embeddingSpaceId、有 chunk）。 */
  usable: boolean;
}

export interface ResolvedScope {
  scope: SearchScope;
  videos: ScopedVideo[];
  coverage: SemanticCoverage;
}

interface Candidate {
  key: string;
  video: SearchableVideo;
  generation: GenerationRow | null;
  chunk: StoredChunk | null;
  lexical: SpaceSearchHit | null;
  /** 字面命中对回的句子身份（对不回时为空）。 */
  sentenceIds: string[];
  lexicalRank: number | null;
  semanticRank: number | null;
  score: number;
}

export class SearchService {
  readonly #options: SearchServiceOptions;

  constructor(options: SearchServiceOptions) {
    this.#options = options;
  }

  /** 字面一路用的内容索引（SemanticContext 的退路也用它）。 */
  get contentIndex(): SpaceSearchSource['index'] {
    return this.#options.catalog.index;
  }

  // ---- 范围与覆盖 ----

  /**
   * 主体能看到的范围（按项目、videoId 名单筛过）与每个视频的世代、覆盖。`profile` 给时只把同一向量空间的世代算作可用。
   */
  resolveScope(viewer: SpaceViewer, params: { projectId?: Id | null; videoIds?: readonly Id[] }, profile: EmbeddingProfile | null): ResolvedScope {
    const scope = searchScope(this.#options.catalog, viewer, params);
    const store = this.#options.store();
    const generations = store?.activeGenerations(scope.videos.map((v) => v.videoId)) ?? new Map<Id, GenerationRow>();
    const settings = this.#options.settings();
    const coverage: SemanticCoverage = {
      channel: 'text',
      eligible: 0,
      indexed: 0,
      pending: scope.pending,
      failed: 0,
      missingInput: 0,
      stale: 0,
      knownScopeComplete: false,
    };
    const videos: ScopedVideo[] = [];
    for (const video of scope.videos) {
      const generation = generations.get(video.videoId) ?? null;
      const compatible = generation !== null && (profile === null || generation.embeddingSpaceId === profile.embeddingSpaceId);
      const usable = compatible && generation.chunkCount > 0;
      videos.push({ video, generation, usable });
      const source = store?.source(video.videoId) ?? null;
      const wanted = settings.indexedProjects === 'all' || (video.projectId !== null && settings.indexedProjects.includes(video.projectId));
      if (compatible && generation.chunkCount === 0 && generation.revision === video.revision) coverage.missingInput++;
      else if (usable) {
        coverage.indexed++;
        if (generation.revision !== video.revision) coverage.stale++;
      } else if (!wanted) coverage.missingInput++;
      else if (source?.state === 'failed' && source.wantedRevision === video.revision) coverage.failed++;
      else coverage.pending++;
    }
    coverage.eligible = coverage.indexed + coverage.pending + coverage.failed;
    coverage.knownScopeComplete =
      coverage.pending === 0 && coverage.failed === 0 && coverage.stale === 0 && !this.#options.catalog.scanning && this.#options.catalog.index !== null;
    return { scope, videos, coverage };
  }

  /** 当前检索 profile；没装模型或不可用时给原因。 */
  async profile(): Promise<{ profile: EmbeddingProfile } | { reason: SemanticReason }> {
    const scheduler = this.#options.scheduler();
    if (!scheduler) return { reason: 'MODEL_NOT_INSTALLED' };
    try {
      return { profile: await scheduler.profile('retrieval') };
    } catch (error) {
      return { reason: reasonOf(error) };
    }
  }

  /**
   * 向量一路：只在 `videos` 里可用的世代上扫描。失败时抛带原因码的 `RpcError`。`SemanticContext` 也用它。
   */
  async semanticCandidates(
    resolved: ResolvedScope,
    profile: EmbeddingProfile,
    text: string,
    k: number,
    options: { kinds?: readonly SpaceSearchDocumentKind[] | null; signal?: AbortSignal } = {},
  ): Promise<ScanHit[]> {
    const scheduler = this.#options.scheduler();
    if (!scheduler) throw semanticError('MODEL_NOT_INSTALLED');
    if (!this.#options.store()) throw semanticError('INDEX_NOT_READY');
    const usable = resolved.videos.filter((v) => v.usable);
    if (usable.length === 0) {
      const incompatible = resolved.videos.some((v) => v.generation !== null && v.generation.chunkCount > 0 && v.generation.embeddingSpaceId !== profile.embeddingSpaceId);
      throw semanticError(incompatible ? 'PROFILE_INCOMPATIBLE' : 'INDEX_NOT_READY');
    }
    let vector: Float32Array;
    try {
      const result = await scheduler.embed('retrieval', { role: 'query', inputs: [{ text }] }, { priority: 'interactive', ...(options.signal ? { signal: options.signal } : {}) });
      vector = result.vectors[0]!;
    } catch (error) {
      throw semanticError(options.signal?.aborted ? 'SEARCH_CANCELLED' : reasonOf(error), { max: SEMANTIC_QUERY_MAX_CHARS });
    }
    if (vector.length !== profile.dims) throw semanticError('PROFILE_INCOMPATIBLE');
    const kinds = options.kinds && options.kinds.length > 0 ? new Set(options.kinds) : null;
    return this.#options.scanner.exactSearch(
      vector,
      usable.map((v) => v.generation!.id),
      k,
      kinds ? (chunk) => kinds.has(chunk.documentKind) : undefined,
    );
  }

  // ---- space.searchV2 ----

  async searchV2(viewer: SpaceViewer, params: SpaceSearchV2Params, signal?: AbortSignal): Promise<SpaceSearchV2Result> {
    if (params.query.kind !== 'text') throw semanticError('CHANNEL_UNAVAILABLE');
    const text = params.query.text;
    if ([...text].length > SEMANTIC_QUERY_MAX_CHARS) throw semanticError('INPUT_TOO_LONG', { max: SEMANTIC_QUERY_MAX_CHARS });
    if (params.appearance === 'rendered') throw semanticError('APPEARANCE_UNAVAILABLE');
    const channels = params.channels && params.channels.length > 0 ? params.channels : ['text'];
    if (channels.some((channel) => channel !== 'text')) throw semanticError('CHANNEL_UNAVAILABLE');
    const limit = Math.max(1, Math.min(params.limit ?? DEFAULT_LIMIT, SPACE_SEARCH_V2_MAX_LIMIT));
    const kinds = params.kinds && params.kinds.length > 0 ? params.kinds : null;

    const wantsSemantic = params.mode !== 'lexical';
    const profiled = wantsSemantic ? await this.profile() : null;
    const profile = profiled && 'profile' in profiled ? profiled.profile : null;
    const resolved = this.resolveScope(viewer, params, profile);
    const queryDigest = digest([text, params.mode, channels, kinds, params.projectId ?? '*', params.videoIds ?? null, params.view ?? 'sequence', RANKING_VERSION]);
    const scopeHash = digest(resolved.videos.map((v) => `${v.video.videoId}:${v.video.revision}:${v.generation?.id ?? '-'}`));
    const offset = params.cursor ? readCursor(params.cursor, queryDigest, scopeHash) : 0;

    if (params.mode === 'lexical') return this.#lexical(resolved, text, kinds, offset, limit, queryDigest, scopeHash);

    // 向量一路。
    let semantic: ScanHit[] | null = null;
    let failure: SemanticReason | null = profiled && 'reason' in profiled ? profiled.reason : null;
    if (profile) {
      try {
        semantic = await this.semanticCandidates(resolved, profile, text, SEMANTIC_THRESHOLDS.fusion.perRouteCandidates.value, {
          kinds,
          ...(signal ? { signal } : {}),
        });
      } catch (error) {
        const reason = reasonOf(error);
        // 输入问题与取消不退回：调用方要知道。
        if (reason === 'INPUT_TOO_LONG' || reason === 'SEARCH_CANCELLED' || params.mode === 'semantic') throw error;
        failure = reason;
      }
    }
    if (!semantic) {
      if (params.mode === 'semantic') throw semanticError(failure ?? 'MODEL_NOT_INSTALLED');
      const lexical = this.#lexical(resolved, text, kinds, offset, limit, queryDigest, scopeHash);
      return { ...lexical, degraded: { reason: failure ?? 'MODEL_NOT_INSTALLED' } };
    }

    const candidates = new Map<string, Candidate>();
    const byVideo = new Map(resolved.videos.map((v) => [v.video.videoId, v]));
    semantic.forEach((hit, index) => {
      const scoped = byVideo.get(hit.chunk.videoId);
      if (!scoped) return;
      candidates.set(`chunk:${hit.chunk.chunkId}`, {
        key: `chunk:${hit.chunk.chunkId}`,
        video: scoped.video,
        generation: scoped.generation,
        chunk: hit.chunk,
        lexical: null,
        sentenceIds: hit.chunk.sentenceIds,
        lexicalRank: null,
        semanticRank: index + 1,
        score: 0,
      });
    });
    if (params.mode === 'hybrid') {
      const lexical = this.#options.catalog.index?.search(resolved.scope.videos, {
        query: text,
        ...(kinds ? { kinds } : {}),
        limit: SEMANTIC_THRESHOLDS.fusion.perRouteCandidates.value,
      }) ?? { hits: [], truncated: false };
      const mapper = new LexicalMapper(this.#options.store(), byVideo);
      lexical.hits.forEach((hit, index) => {
        const mapped = mapper.map(hit);
        const key = mapped.chunk ? `chunk:${mapped.chunk.chunkId}` : `lex:${hit.videoId}:${hit.documentKind}:${hit.documentId ?? ''}:${hit.time.clock}:${hit.time.start}`;
        const existing = candidates.get(key);
        if (existing) {
          existing.lexicalRank ??= index + 1;
          existing.lexical ??= hit;
          return;
        }
        const scoped = byVideo.get(hit.videoId);
        if (!scoped) return;
        candidates.set(key, {
          key,
          video: scoped.video,
          generation: scoped.generation,
          chunk: mapped.chunk,
          lexical: hit,
          sentenceIds: mapped.sentenceIds,
          lexicalRank: index + 1,
          semanticRank: null,
          score: 0,
        });
      });
    }
    const merged = fuse([...candidates.values()]);
    const cap = SEMANTIC_THRESHOLDS.fusion.mergedCandidates.value;
    const kept = dedupe(merged).slice(0, cap);
    const page = kept.slice(offset, offset + limit);
    const next = offset + page.length;
    const partial = !resolved.coverage.knownScopeComplete;
    return {
      hits: page.map((c) => hitOf(c)),
      effectiveMode: params.mode,
      degraded: partial ? { reason: 'INDEX_PARTIAL' } : null,
      coverage: [resolved.coverage],
      rankingVersion: RANKING_VERSION,
      nextCursor: next < kept.length ? writeCursor(queryDigest, scopeHash, next) : null,
      truncated: merged.length > cap,
    };
  }

  #lexical(
    resolved: ResolvedScope,
    text: string,
    kinds: readonly SpaceSearchDocumentKind[] | null,
    offset: number,
    limit: number,
    queryDigest: string,
    scopeHash: string,
  ): SpaceSearchV2Result {
    const { hits, truncated } = this.#options.catalog.index?.search(resolved.scope.videos, {
      query: text,
      ...(kinds ? { kinds } : {}),
      limit: offset + limit,
    }) ?? { hits: [], truncated: false };
    const byVideo = new Map(resolved.videos.map((v) => [v.video.videoId, v]));
    const mapper = new LexicalMapper(this.#options.store(), byVideo);
    const page = hits.slice(offset, offset + limit);
    const k = SEMANTIC_THRESHOLDS.fusion.k.value;
    return {
      hits: page.flatMap((hit, index) => {
        const scoped = byVideo.get(hit.videoId);
        if (!scoped) return [];
        const mapped = mapper.map(hit);
        return [
          hitOf({
            key: '',
            video: scoped.video,
            generation: scoped.generation,
            chunk: null,
            lexical: hit,
            sentenceIds: mapped.sentenceIds,
            lexicalRank: offset + index + 1,
            semanticRank: null,
            score: 1 / (k + offset + index + 1),
          }),
        ];
      }),
      effectiveMode: 'lexical',
      degraded: null,
      coverage: [resolved.coverage],
      rankingVersion: RANKING_VERSION,
      nextCursor: truncated ? writeCursor(queryDigest, scopeHash, offset + page.length) : null,
      truncated,
    };
  }

  // ---- space.indexStatus ----

  async indexStatus(viewer: SpaceViewer, params: SemanticIndexStatusParams = {}): Promise<SemanticIndexStatus> {
    const profiled = await this.profile();
    const profile = 'profile' in profiled ? profiled.profile : null;
    const resolved = this.resolveScope(viewer, params, profile);
    const settings = this.#options.settings();
    const store = this.#options.store();
    const described = this.#options.model?.() ?? null;
    const blocked = this.#options.coordinator?.blockedReason ?? null;
    return {
      model: profile
        ? {
            bundleId: described?.bundleId ?? profile.embeddingSpaceId,
            label: described?.label ?? profile.encoderProfileId,
            encoderProfileId: profile.encoderProfileId,
            embeddingSpaceId: profile.embeddingSpaceId,
            device: profile.device,
          }
        : null,
      reason: 'reason' in profiled ? profiled.reason : !store ? 'INDEX_NOT_READY' : ((blocked as SemanticReason | null) ?? null),
      channels: {
        text: { enabled: settings.channels.includes('text'), available: profile !== null && store !== null },
        visual: { enabled: settings.channels.includes('visual'), available: false },
        audio: { enabled: settings.channels.includes('audio'), available: false },
      },
      coverage: [resolved.coverage],
      // 磁盘占用是全局的（不分主体）：只给用户本人。
      cacheBytes: viewer.kind === 'user' ? (store?.sizeBytes() ?? 0) : 0,
      paused: this.#options.coordinator?.paused ?? false,
      jobId: null,
    };
  }
}

// ---- 字面命中对回 chunk ----

/** 字面命中（内容索引的段落）对回语义索引的句子与 chunk：同一份文档、同一时钟、时间重叠；世代版本与命中版本相同时才对。 */
class LexicalMapper {
  readonly #store: SemanticStore | null;
  readonly #byVideo: ReadonlyMap<Id, ScopedVideo>;
  readonly #cache = new Map<number, { sentences: ReturnType<SemanticStore['sentences']>; chunks: StoredChunk[] }>();

  constructor(store: SemanticStore | null, byVideo: ReadonlyMap<Id, ScopedVideo>) {
    this.#store = store;
    this.#byVideo = byVideo;
  }

  map(hit: SpaceSearchHit): { chunk: StoredChunk | null; sentenceIds: string[] } {
    const generation = this.#byVideo.get(hit.videoId)?.generation ?? null;
    if (!this.#store || !generation || generation.revision !== hit.indexedRevision) return { chunk: null, sentenceIds: [] };
    let data = this.#cache.get(generation.id);
    if (!data) {
      data = { sentences: this.#store.sentences(generation.id), chunks: this.#store.generationChunks(generation.id) };
      this.#cache.set(generation.id, data);
    }
    const sameDoc = (row: { documentId: Id | null; documentKind: SpaceSearchDocumentKind; clock: string }) =>
      row.documentId === hit.documentId && row.documentKind === hit.documentKind && row.clock === hit.time.clock;
    if (hit.documentKind === 'chapter') {
      const chunk = data.chunks.find((c) => sameDoc(c) && Math.abs(c.start - hit.time.start) < 1e-3) ?? null;
      return { chunk, sentenceIds: chunk?.sentenceIds ?? [] };
    }
    const ids = new Set<string>();
    for (const row of data.sentences) {
      if (!sameDoc(row)) continue;
      if (overlaps(row.start, row.end, hit.time.start, hit.time.end)) for (const id of row.sentenceIds) ids.add(id);
    }
    if (ids.size === 0) return { chunk: null, sentenceIds: [] };
    let best: StoredChunk | null = null;
    let bestOverlap = 0;
    for (const chunk of data.chunks) {
      if (!sameDoc(chunk)) continue;
      const overlap = chunk.sentenceIds.filter((id) => ids.has(id)).length;
      if (overlap > bestOverlap) {
        best = chunk;
        bestOverlap = overlap;
      }
    }
    return { chunk: best, sentenceIds: [...ids] };
  }
}

function overlaps(aStart: number, aEnd: number, bStart: number, bEnd: number): boolean {
  if (aStart === bStart) return true;
  return aStart < bEnd && bStart < aEnd;
}

// ---- 融合、去重 ----

/** RRF（§10.2）：Σ w / (k + rank)；同分按 key 排，结果稳定。 */
function fuse(candidates: Candidate[]): Candidate[] {
  const f = SEMANTIC_THRESHOLDS.fusion;
  for (const c of candidates) {
    c.score =
      (c.lexicalRank !== null ? f.weights.lexical.value / (f.k.value + c.lexicalRank) : 0) +
      (c.semanticRank !== null ? f.weights.semantic.value / (f.k.value + c.semanticRank) : 0);
  }
  return candidates.sort((a, b) => b.score - a.score || a.key.localeCompare(b.key));
}

/** 同一个视频、同一份文档里句子身份大半重叠的（相邻 chunk 的重叠句、同一句的字面与语义命中）只留排名靠前的。 */
function dedupe(sorted: readonly Candidate[]): Candidate[] {
  const kept: Candidate[] = [];
  for (const c of sorted) {
    const ids = c.chunk?.sentenceIds ?? c.sentenceIds;
    const duplicate =
      ids.length > 0 &&
      kept.some((other) => {
        if (other.video.videoId !== c.video.videoId) return false;
        const otherChunk = other.chunk;
        const otherKind = otherChunk?.documentKind ?? other.lexical?.documentKind;
        const otherDoc = otherChunk ? otherChunk.documentId : (other.lexical?.documentId ?? null);
        const kind = c.chunk?.documentKind ?? c.lexical?.documentKind;
        const doc = c.chunk ? c.chunk.documentId : (c.lexical?.documentId ?? null);
        if (otherKind !== kind || otherDoc !== doc) return false;
        const otherIds = new Set(otherChunk?.sentenceIds ?? other.sentenceIds);
        const shared = ids.filter((id) => otherIds.has(id)).length;
        return shared * 2 > ids.length;
      });
    if (!duplicate) kept.push(c);
  }
  return kept;
}

// ---- 命中 ----

const EVIDENCE: Record<SpaceSearchDocumentKind, SemanticEvidenceType> = {
  speech: 'transcript',
  caption: 'caption',
  translation: 'translation',
  chapter: 'summary',
};

function hitOf(c: Candidate): SpaceSearchV2Hit {
  const chunk = c.chunk;
  const lexical = c.lexical;
  const documentKind = (chunk?.documentKind ?? lexical?.documentKind)!;
  const documentId = chunk ? chunk.documentId : (lexical?.documentId ?? null);
  // 字面命中的片段与高亮更准（句子级）；纯语义命中给 chunk 原文，不假高亮。
  const time = lexical ? lexical.time : { clock: chunk!.clock, start: chunk!.start, end: chunk!.end };
  const revision = lexical ? lexical.indexedRevision : c.generation!.revision;
  const sentenceIds = lexical ? c.sentenceIds : chunk!.sentenceIds;
  const matchedBy: Array<'lexical' | 'semantic'> = [];
  if (c.lexicalRank !== null) matchedBy.push('lexical');
  if (c.semanticRank !== null) matchedBy.push('semantic');
  const actions: SemanticHitAction[] = ['preview', 'cite'];
  if (time.clock === 'sequence') actions.splice(1, 0, 'open-in-timeline');
  const text = chunk?.text ?? lexical!.snippet;
  return {
    hitId: encodeHitId({
      videoId: c.video.videoId,
      documentId,
      kind: documentKind,
      sentenceIds,
      revision,
      clock: time.clock,
      start: time.start,
      end: time.end,
      chunkId: chunk?.chunkId ?? null,
      text: lexical ? lexical.snippet : clip(text),
    }),
    target: { kind: 'document-span', videoId: c.video.videoId, documentId, documentKind, sentenceIds },
    videoName: c.video.videoName,
    entryId: c.video.entryId,
    projectId: c.video.projectId,
    matchChannels: ['text'],
    matchedBy,
    evidenceType: EVIDENCE[documentKind],
    snippet: lexical ? lexical.snippet : clip(text),
    highlights: lexical ? lexical.highlights : [],
    speaker: lexical ? lexical.speaker : chunk!.speaker,
    language: lexical ? lexical.language : chunk!.language,
    anchor: anchorOf(time.clock, time.start, time.end),
    indexedRevision: revision,
    needsResolve: revision !== c.video.revision,
    chapter: chunk?.chapter ?? null,
    rank: c.score,
    actions,
  };
}

export function anchorOf(clock: 'sequence' | 'source', start: number, end: number): SearchHitAnchor {
  return {
    clock,
    start: { ticks: String(Math.round(start * 1000)), timescale: 1000 },
    end: { ticks: String(Math.round(end * 1000)), timescale: 1000 },
    startSec: start,
    endSec: end,
    boundary: 'exact',
  };
}

function clip(text: string): string {
  const chars = [...text];
  return chars.length <= SNIPPET_MAX ? text : `${chars.slice(0, SNIPPET_MAX).join('')}…`;
}

// ---- 游标 ----

function digest(value: unknown): string {
  return crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex').slice(0, 24);
}

function writeCursor(query: string, scope: string, offset: number): string {
  return Buffer.from(JSON.stringify({ q: query, s: scope, o: offset, t: Date.now() }), 'utf8').toString('base64url');
}

/** 游标里记着查询、范围（视频版本与世代）与位置；任何一项变了或过期都报 `CURSOR_STALE`，不静默换一批结果。 */
function readCursor(cursor: string, query: string, scope: string): number {
  let value: { q?: unknown; s?: unknown; o?: unknown; t?: unknown };
  try {
    value = JSON.parse(Buffer.from(cursor, 'base64url').toString('utf8')) as typeof value;
  } catch {
    throw semanticError('CURSOR_STALE');
  }
  if (
    value.q !== query ||
    value.s !== scope ||
    typeof value.o !== 'number' ||
    !Number.isInteger(value.o) ||
    value.o < 0 ||
    typeof value.t !== 'number' ||
    Date.now() - value.t > CURSOR_TTL_MS
  ) {
    throw semanticError('CURSOR_STALE');
  }
  return value.o;
}
