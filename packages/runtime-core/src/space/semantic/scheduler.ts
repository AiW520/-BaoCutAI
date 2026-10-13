import type { EmbeddingProfile, EmbeddingProvider, EmbeddingPurpose, EmbeddingRequest, EmbeddingResult } from '@baocut/models';

/**
 * Provider 前面的优先级队列（EmbeddingGemma 2 检索集成方案 v0.1 §16.1）：交互调用（查询向量、写作选材、取材工具）先于后台建索引。
 * 一次只把一批交给 Provider（共用已加载的模型，不并发加载）；每批最多 `TEXT_BATCH_MAX` 条。后台的批次之间让出事件循环。
 */

/** 文字 batch 的上限（§16.1）。 */
export const TEXT_BATCH_MAX = 16;

export type EmbeddingPriority = 'interactive' | 'background';

interface Task {
  purpose: EmbeddingPurpose;
  request: EmbeddingRequest;
  signal: AbortSignal | undefined;
  resolve: (result: EmbeddingResult) => void;
  reject: (error: unknown) => void;
}

export class EmbeddingScheduler {
  readonly provider: EmbeddingProvider;
  readonly #interactive: Task[] = [];
  readonly #background: Task[] = [];
  #running = false;

  constructor(provider: EmbeddingProvider) {
    this.provider = provider;
  }

  profile(purpose: EmbeddingPurpose): Promise<EmbeddingProfile> {
    return this.provider.profile(purpose);
  }

  /** 编码一组输入：按 `TEXT_BATCH_MAX` 切批排队，结果按输入顺序合并。 */
  async embed(
    purpose: EmbeddingPurpose,
    request: EmbeddingRequest,
    options: { priority?: EmbeddingPriority; signal?: AbortSignal } = {},
  ): Promise<EmbeddingResult> {
    const priority = options.priority ?? 'interactive';
    const batches: Promise<EmbeddingResult>[] = [];
    for (let i = 0; i < request.inputs.length; i += TEXT_BATCH_MAX) {
      const inputs = request.inputs.slice(i, i + TEXT_BATCH_MAX);
      batches.push(this.#enqueue(priority, { purpose, request: { role: request.role, inputs }, signal: options.signal }));
    }
    const results = await Promise.all(batches);
    return { vectors: results.flatMap((r) => r.vectors), payloadDigests: results.flatMap((r) => r.payloadDigests) };
  }

  /** 排队中的批数（诊断、测试）。 */
  get queued(): { interactive: number; background: number } {
    return { interactive: this.#interactive.length, background: this.#background.length };
  }

  #enqueue(priority: EmbeddingPriority, task: Omit<Task, 'resolve' | 'reject'>): Promise<EmbeddingResult> {
    return new Promise<EmbeddingResult>((resolve, reject) => {
      (priority === 'interactive' ? this.#interactive : this.#background).push({ ...task, resolve, reject });
      if (!this.#running) void this.#drain();
    });
  }

  async #drain(): Promise<void> {
    this.#running = true;
    try {
      for (;;) {
        const task = this.#interactive.shift() ?? this.#background.shift();
        if (!task) break;
        try {
          task.signal?.throwIfAborted();
          task.resolve(await this.provider.embed(task.purpose, task.request, task.signal));
        } catch (error) {
          task.reject(error);
        }
        // 后台批次之间让出事件循环：排队中的交互调用与别的工作有机会先跑。
        if (this.#interactive.length === 0) await new Promise<void>((resolve) => setImmediate(resolve));
      }
    } finally {
      this.#running = false;
    }
  }
}
