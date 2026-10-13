import type { SemanticStore, StoredChunk, VectorPartition } from './store.ts';

/**
 * 精确向量扫描（EmbeddingGemma 2 检索集成方案 v0.1 §8.4）。调用方先由权限与筛选得出允许的世代（每个视频一个分区），
 * 只在这些分区里算余弦；不存在「先全库取 Top-K 再删掉没权限的」这条路。
 *
 * `VectorScanner` 是接口：首版在主线程里扫（512 维 FP32、单个视频几百个 chunk，一次查询通常只有几毫秒；分区按需从库里读进内存
 * 并缓存，世代切换时作废）。库大到主线程扫描影响事件循环（§16.2 的 P95 < 50ms）时，换成 `worker_threads` 或原生 SIMD 实现，
 * SearchService 与权限合同不变。
 */

export interface ScanHit {
  chunk: StoredChunk;
  /** 余弦（向量都已 L2 归一化，就是点积）。只用于排序与阈值，不是置信度。 */
  score: number;
}

export interface VectorScanner {
  /** 在这些世代（分区）里取与查询最近的 `k` 个；`filter` 再按 chunk 的元数据（文档种类）筛。 */
  exactSearch(query: Float32Array, generationIds: readonly number[], k: number, filter?: (chunk: StoredChunk) => boolean): ScanHit[];
  /** 世代换了或被撤下：丢掉缓存的分区。不给时全部丢掉。 */
  invalidate(generationIds?: readonly number[]): void;
}

/** 缓存的分区向量总数上限（约 100k × 512 × 4 字节 ≈ 200 MiB）；超出时丢掉最早读入的分区。 */
const CACHE_MAX_FLOATS = 100_000 * 512;

export class InThreadVectorScanner implements VectorScanner {
  readonly #store: () => SemanticStore | null;
  readonly #cache = new Map<number, VectorPartition>();
  #floats = 0;
  /** 读过的分区（测试用：确认扫描没有碰范围之外的世代）。 */
  readonly touched = new Set<number>();

  constructor(store: () => SemanticStore | null) {
    this.#store = store;
  }

  exactSearch(query: Float32Array, generationIds: readonly number[], k: number, filter?: (chunk: StoredChunk) => boolean): ScanHit[] {
    if (k <= 0) return [];
    const top: ScanHit[] = [];
    for (const id of generationIds) {
      const partition = this.#partition(id);
      if (!partition) continue;
      this.touched.add(id);
      const dims = partition.generation.dims;
      if (dims !== query.length) continue;
      const { vectors, chunks } = partition;
      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i]!;
        if (filter && !filter(chunk)) continue;
        let dot = 0;
        const base = i * dims;
        for (let d = 0; d < dims; d++) dot += vectors[base + d]! * query[d]!;
        if (top.length < k) {
          top.push({ chunk, score: dot });
          if (top.length === k) top.sort((a, b) => b.score - a.score);
        } else if (dot > top[k - 1]!.score) {
          top[k - 1] = { chunk, score: dot };
          for (let j = k - 1; j > 0 && top[j]!.score > top[j - 1]!.score; j--) [top[j], top[j - 1]] = [top[j - 1]!, top[j]!];
        }
      }
    }
    return top.sort((a, b) => b.score - a.score || a.chunk.chunkId.localeCompare(b.chunk.chunkId));
  }

  invalidate(generationIds?: readonly number[]): void {
    const ids = generationIds ?? [...this.#cache.keys()];
    for (const id of ids) {
      const partition = this.#cache.get(id);
      if (!partition) continue;
      this.#floats -= partition.vectors.length;
      this.#cache.delete(id);
    }
  }

  #partition(id: number): VectorPartition | null {
    const cached = this.#cache.get(id);
    if (cached) return cached;
    const partition = this.#store()?.partition(id) ?? null;
    if (!partition) return null;
    this.#cache.set(id, partition);
    this.#floats += partition.vectors.length;
    for (const [other, old] of this.#cache) {
      if (this.#floats <= CACHE_MAX_FLOATS || other === id) break;
      this.#cache.delete(other);
      this.#floats -= old.vectors.length;
    }
    return partition;
  }
}

/** 两个已归一化向量的余弦。 */
export function cosine(a: Float32Array, b: Float32Array): number {
  const n = Math.min(a.length, b.length);
  let dot = 0;
  for (let i = 0; i < n; i++) dot += a[i]! * b[i]!;
  return dot;
}
