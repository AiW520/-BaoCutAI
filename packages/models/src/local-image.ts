import { randomInt } from 'node:crypto';

import type { GenerationParameters, ImageModelInfo, ModelBundleStatus } from '@baocut/protocol';
import { ModelsLocalImage as M } from '@baocut/protocol/messages/models/local-image.ts';
import type { BundleDefinition } from './bundle-registry.ts';
import type { ImageRunOptions } from './worker-contract.ts';

/**
 * 本地文生图（架构设计 §6.1、§6.3）：模型包的描述、提交时冻结的 seed，与冻结参数到 Worker `job.run`（`image`）的换算。
 */

type ImageParameters = Extract<GenerationParameters, { capability: 'generateImage' }>;

/** `generateImage` 的模型描述：一次一张、只出 PNG、接受 seed 与步数，按模型包登记的能力收输入图；尺寸是模型包登记的几档（各宽高比的 1K、2K 与「试画」的小图）。 */
export function localImageModelInfo(def: BundleDefinition, status: ModelBundleStatus, usable: boolean): ImageModelInfo {
  const profile = def.image!;
  return {
    modelId: def.bundleId,
    label: def.label,
    // 先列各宽高比的默认尺寸，再列别的档，最后是「试画」的小图。
    sizes: [...new Set([...profile.aspects.map((a) => a.size), ...profile.aspects.flatMap((a) => (a.tiers ?? []).map((t) => t.size)), ...profile.extraSizes])],
    aspectRatios: profile.aspects.map((a) => ({ ratio: a.ratio, size: a.size, ...(a.tiers ? { tiers: a.tiers.map((t) => ({ ...t })) } : {}) })),
    defaultSize: profile.aspects[0]?.size ?? null,
    maxCount: 1,
    maxPromptChars: profile.maxPromptChars,
    formats: ['png'],
    defaultFormat: 'png',
    // 输入图只在本机读，没有字节上限（Worker 按像素缩放）；以图为底重画一次吃一张底图（架构设计 §6.1）。
    referenceImages: profile.inputs ? { max: profile.inputs.max, edit: true, maxBytesEach: null, maxBytesTotal: null } : null,
    img2img: profile.inputs?.img2img ? { max: 1, strength: { ...IMG2IMG_STRENGTH } } : null,
    acceptsSeed: true,
    cost: 'free-local',
    available: usable,
    local: { steps: { ...profile.steps } },
    ...(profile.slow ? { notes: slowNote(def, status) } : {}),
    ...(!usable && status.detail ? { detail: status.detail, ...(status.detailRef ? { detailRef: status.detailRef } : {}) } : {}),
  };
}

/** 以图为底重画的改动幅度（diffusers 的 strength）：重画 `round(步数 × strength)` 步（至少一步），太小时与底图几乎一样，下限取 0.1。 */
const IMG2IMG_STRENGTH = { min: 0.1, max: 1, step: 0.05, default: 0.6 } as const;

/**
 * 耗时的提示。candle 在 CPU 上（没有 CUDA 时）比 GPU 慢一到两个数量级：每一步都要把整个 DiT 重新反量化，1024² 二十步要
 * 几个小时（架构设计 §6.5 的实测），照实说。
 */
// `notes` 没有引用字段：按生成时的语言存文本。
function slowNote(def: BundleDefinition, status: ModelBundleStatus): string {
  const steps = def.image!.steps.default;
  if (def.backend === 'candle' && (status.device ?? def.device) === 'cpu') {
    return M.slowCpu({ steps }).text;
  }
  return M.slowLocal({ steps }).text;
}

/**
 * 本地生图的 seed 在提交时冻结：请求没给时在这里抽一个（`0..2^32-1`，与请求的 `seed` 同一范围）。重试与重新执行用同一个，
 * 同一台机器上得到同一张图。
 */
export function localImageSeed(seed: number | null): number {
  return seed ?? randomInt(0, 2 ** 32);
}

/**
 * 冻结的参数 → Worker 的 `job.run`（`image`）选项。尺寸与 seed 都已在提交时决定；缺了是调用方的错。步数取冻结的 `steps`，
 * 没有时取调用方给的（模型包自检用少步数出一张小图，不经提交时的范围检查；固定步数的模型包用它固定的步数），都没有时 null（用模型的默认步数）。
 * `files` 是这一次运行的输入图（已按冻结的摘要核对过的本机文件，按顺序）；用法与 `strength` 取冻结的参数。
 */
export function imageRunOf(parameters: ImageParameters, steps: number | null = null, files: readonly string[] = []): ImageRunOptions {
  const match = /^(\d+)x(\d+)$/.exec(parameters.size ?? '');
  if (!match) throw new Error(`Local image size was not frozen: ${String(parameters.size)}`);
  if (parameters.seed === null) throw new Error('Local image seed was not frozen');
  return {
    prompt: parameters.prompt,
    width: Number(match[1]),
    height: Number(match[2]),
    steps: parameters.steps ?? steps,
    seed: parameters.seed,
    ...(files.length ? imageInputsOf(parameters, files) : {}),
  };
}

function imageInputsOf(parameters: ImageParameters, files: readonly string[]): Pick<ImageRunOptions, 'images' | 'imageMode' | 'strength'> {
  const images = files.map((file) => ({ file }));
  if (parameters.imageMode !== 'img2img') return { images, imageMode: 'ref' };
  if (parameters.strength === undefined) throw new Error('Local image strength was not frozen');
  return { images, imageMode: 'img2img', strength: parameters.strength };
}
