import type { Logger } from '@baocut/harness';
import { sourceSentences, type TranslationMemory, type TranslationMemoryLookup } from '@baocut/jobs';
import type { Id, SemanticReason } from '@baocut/protocol';
import { compareKey } from '../ai-tools/text-compare.ts';
import type { ReadContentResult } from '../space/content-extract.ts';
import type { SemanticCatalogSource } from '../space/semantic/coordinator.ts';
import { reasonOf } from '../space/semantic/errors.ts';
import type { SemanticServices } from '../space/semantic/services.ts';
import { USER_VIEWER } from '../space/space-queries.ts';
import { SEMANTIC_THRESHOLDS } from '../space/semantic/thresholds.ts';

/**
 * 翻译记忆的查找（创作辅助集成设计 §2.6、§3.7）：在用户其他视频里同一语言方向的已有译文（`baocut.translation/2`，没过期的
 * 单元）里找。
 *
 * - 范围：内容索引里有这个目标语言译文的视频，按最近活动从新到旧，最多 `aids.memoryMaxVideos` 部；目标语言按完整标签比较
 *   （`zh-Hans` 与 `zh-Hant` 不混），原文语言按主语言子标签（双方都知道时）。当前视频不算。
 * - 单元的指纹与它的原句不符（原文改过）时不用。
 * - 沿用：规范化后原文相同（`compareKey`，至少 `aids.memoryMinChars` 个字符），取最近的那一条。
 * - 参考：其余的句子用对称编码与已有原句比较，相似度不低于 `aids.memoryReference` 的每句最多 `memoryReferencesPerSentence`
 *   条，总数最多 `memoryReferenceTotal` 条，按相似度从高到低取。已有原句最多取 `memoryPairPool` 条（越近的视频越先）。
 *   没装模型或编码失败时只有沿用，原因写进结果。
 *
 * 全部在本机；只有最后附进提示的参考译句随翻译请求外发，受翻译的外发授权约束。向量只在内存里缓存（换了编码 profile 时清掉），
 * 不落盘。沿用不核对当前的术语表。
 */
export interface TranslationMemoryOptions {
  catalog: () => SemanticCatalogSource | null;
  readContent: (dir: string) => Promise<ReadContentResult>;
  semantic: () => SemanticServices | null;
  /** 设置 `semantic.translationMemory`：关掉时什么都不查。 */
  enabled: () => boolean;
  log: Logger;
}

interface Pair {
  source: string;
  key: string;
  target: string;
  fromVideoId: Id;
  unitId: Id;
}

const AIDS = SEMANTIC_THRESHOLDS.aids;
/** 内存里的原句向量缓存上限（条）。 */
const VECTOR_CACHE = 20_000;

export function primaryLanguage(tag: string | null | undefined): string | null {
  if (!tag) return null;
  return tag.toLowerCase().split(/[-_]/)[0] || null;
}

export function createTranslationMemory(options: TranslationMemoryOptions): TranslationMemory {
  const vectors = new Map<string, Float32Array>();
  /** 缓存的向量出自哪个编码 profile：换了模型包就清掉。 */
  let profileId: string | null = null;
  const remember = (text: string, vector: Float32Array) => {
    if (vectors.size >= VECTOR_CACHE) vectors.delete(vectors.keys().next().value!);
    vectors.set(text, vector);
  };

  return {
    async lookup(request): Promise<TranslationMemoryLookup> {
      const empty = (reason: string | null): TranslationMemoryLookup => ({ reuse: [], references: [], videos: 0, effectiveMode: 'lexical', reason });
      if (!options.enabled()) return empty('DISABLED');
      const catalog = options.catalog();
      if (!catalog?.index) return empty('INDEX_NOT_READY' satisfies SemanticReason);
      const pairs = await collectPairs(options, catalog, request);
      const result: TranslationMemoryLookup = { ...empty(null), videos: pairs.videos };

      // 沿用：规范化后相同。
      const byKey = new Map<string, Pair>();
      for (const pair of pairs.list) if (!byKey.has(pair.key)) byKey.set(pair.key, pair);
      const rest: Array<{ id: Id; text: string }> = [];
      for (const sentence of request.sentences) {
        const key = compareKey(sentence.text);
        const hit = [...key].length >= AIDS.memoryMinChars.value ? byKey.get(key) : undefined;
        if (hit) result.reuse.push({ sentenceId: sentence.id, text: hit.target, fromVideoId: hit.fromVideoId, unitId: hit.unitId });
        else if (sentence.text.trim() !== '') rest.push(sentence);
      }

      // 参考：语义相近。
      const semantic = options.semantic();
      if (!semantic) return { ...result, reason: 'MODEL_NOT_INSTALLED' satisfies SemanticReason };
      result.effectiveMode = 'semantic';
      if (rest.length === 0 || pairs.list.length === 0) return result;
      const pool = dedupeSources(pairs.list).slice(0, AIDS.memoryPairPool.value);
      try {
        const profile = await semantic.scheduler()?.profile('symmetric');
        if (profile && profile.encoderProfileId !== profileId) {
          vectors.clear();
          profileId = profile.encoderProfileId;
        }
        const context = semantic.context(USER_VIEWER);
        const embed = (texts: string[]) => context.embedTexts(texts, { role: 'symmetric', signal: request.signal });
        const missing = [...new Set(pool.map((p) => p.source).filter((text) => !vectors.has(text)))];
        if (missing.length > 0) (await embed(missing)).forEach((vector, i) => remember(missing[i]!, vector));
        const queries = await embed(rest.map((s) => s.text));
        result.references = rankReferences(
          rest,
          queries,
          pool.map((pair) => ({ pair, vector: vectors.get(pair.source) ?? null })),
        );
      } catch (error) {
        if (request.signal.aborted) throw error;
        options.log.warn('translation memory references failed', { error: error instanceof Error ? error.message : String(error) });
        return { ...result, effectiveMode: 'lexical', reason: reasonOf(error) };
      }
      return result;
    },
  };
}

/** 每个已有原句只留最近的一条（同一句话在多部视频里译过时）。 */
function dedupeSources(list: readonly Pair[]): Pair[] {
  const seen = new Set<string>();
  return list.filter((pair) => (seen.has(pair.key) ? false : (seen.add(pair.key), true)));
}

export function rankReferences(
  sentences: ReadonlyArray<{ id: Id; text: string }>,
  queries: readonly Float32Array[],
  pool: ReadonlyArray<{ pair: Pair; vector: Float32Array | null }>,
): TranslationMemoryLookup['references'] {
  const threshold = AIDS.memoryReference.value;
  const scored: Array<{ sentence: number; pair: Pair; score: number }> = [];
  sentences.forEach((_, i) => {
    const query = queries[i]!;
    const best: Array<{ pair: Pair; score: number }> = [];
    for (const { pair, vector } of pool) {
      if (!vector) continue;
      const score = cosine(query, vector);
      if (score >= threshold) best.push({ pair, score });
    }
    best.sort((a, b) => b.score - a.score);
    const seenTargets = new Set<string>();
    for (const hit of best) {
      if (seenTargets.size >= AIDS.memoryReferencesPerSentence.value) break;
      if (seenTargets.has(hit.pair.target)) continue;
      seenTargets.add(hit.pair.target);
      scored.push({ sentence: i, ...hit });
    }
  });
  scored.sort((a, b) => b.score - a.score);
  return scored
    .slice(0, AIDS.memoryReferenceTotal.value)
    .sort((a, b) => a.sentence - b.sentence || b.score - a.score)
    .map(({ sentence, pair }) => ({ sentenceId: sentences[sentence]!.id, source: pair.source, target: pair.target, fromVideoId: pair.fromVideoId }));
}

function cosine(a: Float32Array, b: Float32Array): number {
  const n = Math.min(a.length, b.length);
  let dot = 0;
  for (let i = 0; i < n; i++) dot += a[i]! * b[i]!;
  return dot;
}

async function collectPairs(
  options: TranslationMemoryOptions,
  catalog: SemanticCatalogSource,
  request: { videoId: Id; sourceLanguage: string | null; targetLanguage: string; signal: AbortSignal },
): Promise<{ list: Pair[]; videos: number }> {
  const index = catalog.index!;
  const target = request.targetLanguage.toLowerCase();
  const source = primaryLanguage(request.sourceLanguage);
  const list: Pair[] = [];
  let videos = 0;
  for (const video of catalog.videos()) {
    if (videos >= AIDS.memoryMaxVideos.value || list.length >= AIDS.memoryPairPool.value) break;
    request.signal.throwIfAborted();
    const indexed = index.at(video.dir);
    if (!indexed || indexed.videoId === request.videoId) continue;
    const transcriptLanguage = new Map(indexed.facts.transcripts.map((t) => [t.documentId, primaryLanguage(t.language)]));
    const wanted = indexed.facts.translations.filter((t) => {
      if (t.language?.toLowerCase() !== target || t.units <= t.staleUnits) return false;
      const from = t.sourceDocumentId ? transcriptLanguage.get(t.sourceDocumentId) : null;
      return !source || !from || from === source;
    });
    if (wanted.length === 0) continue;
    let content: ReadContentResult;
    try {
      content = await options.readContent(video.dir);
    } catch (error) {
      options.log.warn('translation memory skipped a video', { dir: video.dir, error: error instanceof Error ? error.message : String(error) });
      continue;
    }
    const before = list.length;
    try {
      for (const fact of wanted) list.push(...pairsOf(content, fact.documentId));
    } catch (error) {
      // 句子的 WASM 没有构建：没有可用的已有译文。
      options.log.warn('translation memory skipped a video', { dir: video.dir, error: error instanceof Error ? error.message : String(error) });
    }
    if (list.length > before) videos++;
  }
  return { list, videos };
}

interface UnitLike {
  id?: unknown;
  sourceSentenceId?: unknown;
  sourceFingerprint?: unknown;
  naturalText?: unknown;
  status?: unknown;
}

/** 一份译文里还对得上原句的单元：原句 ↔ 自然译句。 */
export function pairsOf(content: ReadContentResult, documentId: Id): Pair[] {
  const doc = content.documents.find((d) => d.documentId === documentId && d.error === undefined);
  if (!doc || doc.schema !== 'baocut.translation/2') return [];
  const body = doc.body as { units?: UnitLike[]; sourceBasis?: { speechRef?: { id?: unknown } } } | null;
  const speechId = doc.sourceDocumentId ?? (typeof body?.sourceBasis?.speechRef?.id === 'string' ? body.sourceBasis.speechRef.id : null);
  const speech = speechId ? content.documents.find((d) => d.documentId === speechId && d.error === undefined) : undefined;
  if (!speech || !Array.isArray(body?.units)) return [];
  const read = sourceSentences(speech.body && typeof speech.body === 'object' ? { schema: speech.schema, ...speech.body } : speech.body);
  if ('problem' in read) return [];
  const sentences = new Map(read.sentences.map((s) => [s.id, s]));
  const out: Pair[] = [];
  for (const unit of body.units) {
    if (unit.status === 'stale' || typeof unit.id !== 'string' || typeof unit.naturalText !== 'string') continue;
    const sentence = typeof unit.sourceSentenceId === 'string' ? sentences.get(unit.sourceSentenceId) : undefined;
    if (!sentence || sentence.fingerprint !== unit.sourceFingerprint) continue;
    const target = unit.naturalText.trim();
    if (target === '' || sentence.text.trim() === '') continue;
    out.push({ source: sentence.text.trim(), key: compareKey(sentence.text), target, fromVideoId: content.videoId, unitId: unit.id });
  }
  return out;
}
