import { ModelsEmbedding as E } from '@baocut/protocol/messages/models/embedding.ts';
import {
  EMBED_MAX_BATCH,
  EmbeddingError,
  INPUT_TOO_LONG,
  LITERTLM_VERSION,
  ProviderFailure,
  bundleUsable,
  digestText,
  formatEmbeddingInput,
  PROMPT_PAIR_MODEL_CARD,
  truncateAndNormalize,
  type BundleDefinition,
  type EmbeddingBundleProfile,
  type EmbeddingProfile,
  type EmbeddingProvider,
  type EmbeddingPurpose,
  type EmbeddingRequest,
  type EmbeddingResult,
  type ModelCatalog,
} from '@baocut/models';
import type { LocalTranscribeProvider } from './local-provider.ts';

/**
 * 本机 embedding Provider（EmbeddingGemma 2 检索集成方案 v0.1 §3.1、§4、§5）：检索库只经 `EmbeddingProvider` 要向量，这里把它接到
 * Model Worker 的 `embed.run`（经 `LocalTranscribeProvider.embed`，共用进程管理与资源 holder）。
 *
 * - 选模型包：用户选的（`selected`）可用时用它，否则按登记次序（文字包在前）用第一个装好的；多模态包也满足文字检索。
 *   一个都没装好时 `MODEL_NOT_INSTALLED`；装了但用不了（平台不支持、停用、Worker 不认识）时 `MODEL_UNAVAILABLE`。
 * - 向量：向 Worker 要 `outputSize`（768）维（引擎已归一化），截到 `dims`（512）维再归一化。前缀只在 `formatEmbeddingInput` 加一次。
 * - 身份（§5.3）：`embeddingSpaceId = embeddinggemma2/<变体>/<promptPairId>/<维度>/l2/<量化兼容组>`；`encoderProfileId` 在它后面加
 *   输入模态、LiteRT-LM 版本、模型文件的 sha256 与登记的设备。
 * - 一批至多 `EMBED_MAX_BATCH`（16）条；超长不截断，以 `INPUT_TOO_LONG` 报出是第几条（从 1 数）。
 * - 这一阶段只有文字：`text-to-visual` 报 `PROFILE_INCOMPATIBLE`。
 */

/** Worker 的单条文本上限（字节，与 `embed.run` 的参数检查一致）：超过的不交给 Worker，直接按超长报。 */
const MAX_TEXT_BYTES = 256 * 1024;

export interface LocalEmbeddingProviderOptions {
  catalog: Pick<ModelCatalog, 'definitions' | 'status'>;
  worker: Pick<LocalTranscribeProvider, 'embed'>;
  /** 用户选的 embedding 模型包；没选时 null。 */
  selected?: () => string | null;
}

interface Resolved {
  def: BundleDefinition & { embedding: EmbeddingBundleProfile };
}

export class LocalEmbeddingProvider implements EmbeddingProvider {
  readonly #catalog: LocalEmbeddingProviderOptions['catalog'];
  readonly #worker: LocalEmbeddingProviderOptions['worker'];
  readonly #selected: () => string | null;
  /** 最近一次用到的模型包与 Worker 报告的设备（状态显示用）。 */
  #current: { bundleId: string; label: string } | null = null;
  #device: string | null = null;

  constructor(options: LocalEmbeddingProviderOptions) {
    this.#catalog = options.catalog;
    this.#worker = options.worker;
    this.#selected = options.selected ?? (() => null);
  }

  /** 最近一次解析出的模型包（语义检索的状态显示）；还没解析过、或没有可用的时 null。 */
  current(): { bundleId: string; label: string } | null {
    return this.#current;
  }

  async profile(purpose: EmbeddingPurpose): Promise<EmbeddingProfile> {
    const { def } = await this.#resolve(purpose);
    return this.#profileOf(def);
  }

  async embed(purpose: EmbeddingPurpose, request: EmbeddingRequest, signal?: AbortSignal): Promise<EmbeddingResult> {
    signal?.throwIfAborted();
    const { def } = await this.#resolve(purpose);
    const profile = this.#profileOf(def);
    const spec = def.embedding;
    const payloads = request.inputs.map((input) => formatEmbeddingInput(profile.promptPairId, request.role, input));
    const tooLong = payloads.findIndex((payload) => Buffer.byteLength(payload, 'utf8') > MAX_TEXT_BYTES);
    if (tooLong >= 0) throw new EmbeddingError(INPUT_TOO_LONG, E.inputTooLong({ index: tooLong + 1, max: spec.maxInputTokens }).text);
    const vectors: Float32Array[] = [];
    for (let start = 0; start < payloads.length; start += EMBED_MAX_BATCH) {
      const batch = payloads.slice(start, start + EMBED_MAX_BATCH);
      let result;
      try {
        result = await this.#worker.embed(
          def.bundleId,
          batch,
          { outputSize: spec.outputSize, insertSpecialTokens: spec.insertSpecialTokens },
          signal,
        );
      } catch (error) {
        throw embeddingErrorOf(error, start, spec.maxInputTokens);
      }
      this.#device = result.device;
      for (const vector of result.vectors) vectors.push(truncateAndNormalize(vector, spec.dims));
    }
    return { vectors, payloadDigests: payloads.map(digestText) };
  }

  #profileOf(def: Resolved['def']): EmbeddingProfile {
    const spec = def.embedding;
    const embeddingSpaceId = ['embeddinggemma2', spec.variant, PROMPT_PAIR_MODEL_CARD, String(spec.dims), 'l2', spec.quantGroup].join('/');
    const encoderProfileId = [embeddingSpaceId, 'text', `litertlm-${LITERTLM_VERSION}`, spec.modelSha256, def.device].join('/');
    return {
      embeddingSpaceId,
      encoderProfileId,
      promptPairId: PROMPT_PAIR_MODEL_CARD,
      dims: spec.dims,
      maxInputTokens: spec.maxInputTokens,
      device: this.#device,
    };
  }

  async #resolve(purpose: EmbeddingPurpose): Promise<Resolved> {
    if (purpose === 'text-to-visual') {
      throw new EmbeddingError('PROFILE_INCOMPATIBLE', E.modelUnavailable({ problem: purpose }).text);
    }
    const candidates = this.#catalog
      .definitions()
      .filter((d): d is Resolved['def'] => d.capability === 'embed' && d.embedding !== undefined);
    const selected = this.#selected();
    const ordered = [...candidates.filter((d) => d.bundleId === selected), ...candidates.filter((d) => d.bundleId !== selected)];
    let unavailable: string | null = null;
    for (const def of ordered) {
      const status = await this.#catalog.status(def.bundleId);
      if (!status) continue;
      if (bundleUsable(status)) {
        this.#current = { bundleId: def.bundleId, label: def.label };
        return { def };
      }
      // 装了（或装过）却用不了：记下第一个原因。
      if (status.state === 'error') unavailable ??= status.detail ?? status.reason ?? def.bundleId;
    }
    this.#current = null;
    if (unavailable !== null) throw new EmbeddingError('MODEL_UNAVAILABLE', E.modelUnavailable({ problem: unavailable }).text);
    throw new EmbeddingError('MODEL_NOT_INSTALLED', E.noModel().text);
  }
}

/** Worker 一侧的失败 → `EmbeddingError`（`reason` 是 `SemanticReason`）。取消原样抛出。 */
function embeddingErrorOf(error: unknown, offset: number, maxInputTokens: number): unknown {
  if (!(error instanceof ProviderFailure)) return error;
  const details = error.details;
  if (details.workerCode === INPUT_TOO_LONG) {
    const index = typeof details.index === 'number' ? offset + details.index : offset;
    return new EmbeddingError(INPUT_TOO_LONG, E.inputTooLong({ index: index + 1, max: maxInputTokens }).text);
  }
  if (details.workerCode === 'MODEL_RESOURCE' || details.reason === 'resource') {
    // 停用（反复崩溃）也是 `resource`：那是模型不可用，不是资源不够。
    if (error.kind === 'unavailable') return new EmbeddingError('MODEL_UNAVAILABLE', E.modelUnavailable({ problem: error.message }).text);
    return new EmbeddingError('RESOURCE_EXHAUSTED', E.modelUnavailable({ problem: error.message }).text);
  }
  if (error.kind === 'load-failed' && details.reason === 'not-installed') {
    return new EmbeddingError('MODEL_NOT_INSTALLED', E.modelUnavailable({ problem: error.message }).text);
  }
  return new EmbeddingError('MODEL_UNAVAILABLE', E.modelUnavailable({ problem: error.message }).text);
}
