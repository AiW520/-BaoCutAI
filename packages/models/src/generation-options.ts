import {
  RpcError,
  type FrozenSpeechReference,
  type GenerateImageRequest,
  type GenerateMusicRequest,
  type FrozenImageInput,
  type GenerationParameters,
  type ImageInputMode,
  type ImageModelInfo,
  type MusicModelInfo,
  type SpeechModelInfo,
  type SynthesizeSpeechRequest,
} from '@baocut/protocol';
import { ModelsGenerationOptions as M } from '@baocut/protocol/messages/models/generation-options.ts';
import { canonicalLanguageTag } from './asr-result.ts';
import { megabytes } from './image-inputs.ts';
import { builtinReferenceFile, frozenVoiceOf, planLocalVoice, type LocalVoicePlan } from './local-speech.ts';
import type { ModelChoice } from './model-selection.ts';

/**
 * 本地模型提交时已经决定的声音与读出的参考录音（`clone`、克隆模型的内置音色）。不给时按请求现算声音，
 * 需要参考录音而没有给出时是调用方的错。
 */
export interface LocalSpeechFreeze {
  plan: LocalVoicePlan;
  reference: FrozenSpeechReference | null;
}

/**
 * 生成请求与模型的特性是否相容，相容时给出冻结的参数（架构设计 §6.2、§6.6）。都在提交时检查，不在执行到一半时失败；
 * 不合的一律 `invalid-request`，`details` 带上模型的限制，不悄悄改参数（不截断文本、不换声音、不改尺寸）。
 */

export type SpeechParameters = Extract<GenerationParameters, { capability: 'synthesizeSpeech' }>;
export type ImageParameters = Extract<GenerationParameters, { capability: 'generateImage' }>;
export type MusicParameters = Extract<GenerationParameters, { capability: 'generateMusic' }>;

/** 按 Unicode 码点计的长度（供应商的字符上限按字符算，代理对算一个）。 */
export function codePointLength(text: string): number {
  let length = 0;
  for (const _ of text) length++;
  return length;
}

export function speechParameters(
  choice: ModelChoice<'synthesizeSpeech'>,
  request: SynthesizeSpeechRequest,
  local?: LocalSpeechFreeze,
): SpeechParameters {
  const model: SpeechModelInfo = choice.model;
  const where = { providerId: choice.providerId, modelId: choice.modelId };
  if (!model.local) {
    // 参考录音、描述与扩散旋钮只有本地模型接受。
    for (const [key, value] of [
      ['reference', request.reference],
      ['voiceDescription', request.voiceDescription],
      ['cfg', request.cfg],
      ['steps', request.steps],
    ] as const) {
      if (value !== undefined) throw new RpcError('invalid-request', M.notLocalOnly({ modelId: choice.modelId, key }), where);
    }
  }
  const text = request.text;
  if (!text.trim()) throw new RpcError('invalid-request', M.textEmpty());
  const length = codePointLength(text);
  if (length > model.maxInputChars) {
    throw new RpcError(
      'invalid-request',
      M.textTooLong({ length, modelId: choice.modelId, limit: model.maxInputChars }),
      {
        ...where,
        length,
        limit: model.maxInputChars,
      },
    );
  }

  if (model.local) return localSpeechParameters(choice, request, local ?? { plan: planLocalVoice(choice, request), reference: null });

  const voice = request.voice ?? model.defaultVoice;
  if (!voice) {
    throw new RpcError('invalid-request', M.noDefaultVoice({ modelId: choice.modelId }), {
      ...where,
      voices: model.voices.map((v) => v.voiceId),
    });
  }
  const preset = model.voices.some((v) => v.voiceId === voice);
  if (!preset && !model.voiceModes.includes('custom')) {
    throw new RpcError('invalid-request', M.noSuchVoice({ modelId: choice.modelId, voice }), {
      ...where,
      voices: model.voices.map((v) => v.voiceId),
    });
  }

  let language: string | null = null;
  if (request.language !== undefined) {
    language = canonicalLanguageTag(request.language);
    if (!language) throw new RpcError('invalid-request', M.badLanguageTag({ tag: request.language }));
    if (model.languages !== 'any' && !languageListed(model.languages, language)) {
      throw new RpcError('invalid-request', M.languageUnsupported({ modelId: choice.modelId, language }), {
        ...where,
        languages: model.languages,
      });
    }
  }

  const format = request.format ?? model.defaultFormat;
  if (!model.formats.includes(format)) {
    throw new RpcError('invalid-request', M.formatUnsupported({ modelId: choice.modelId, format }), { ...where, formats: model.formats });
  }

  const instructions = request.instructions?.trim() ? request.instructions.trim() : null;
  if (instructions && !model.acceptsInstructions) {
    throw new RpcError('invalid-request', M.noInstructions({ modelId: choice.modelId }), where);
  }

  let speed: number | null = null;
  if (request.speed !== undefined) {
    if (!model.speedRange) throw new RpcError('invalid-request', M.noSpeed({ modelId: choice.modelId }), where);
    if (!(request.speed >= model.speedRange.min && request.speed <= model.speedRange.max)) {
      throw new RpcError('invalid-request', M.speedRange({ min: model.speedRange.min, max: model.speedRange.max }), {
        ...where,
        speedRange: model.speedRange,
      });
    }
    speed = request.speed;
  }

  const seed = checkSeed(request.seed, model.acceptsSeed, choice.modelId, where);
  return { capability: 'synthesizeSpeech', text, voice, language, format, instructions, speed, seed };
}

/** 本地模型：声音按提交时决定的方式冻结；语言、格式、说明、语速、种子与扩散旋钮按模型描述检查。 */
function localSpeechParameters(
  choice: ModelChoice<'synthesizeSpeech'>,
  request: SynthesizeSpeechRequest,
  local: LocalSpeechFreeze,
): SpeechParameters {
  const model: SpeechModelInfo = choice.model;
  const traits = model.local!;
  const where = { providerId: choice.providerId, modelId: choice.modelId };
  const { plan } = local;
  const needsReference = plan.mode === 'clone' || builtinReferenceFile(model, plan) !== null;
  if (needsReference && !local.reference) throw new Error(`Reference recording for local synthesis was not frozen: ${choice.modelId}`);

  let language: string | null = null;
  if (request.language !== undefined) {
    language = canonicalLanguageTag(request.language);
    if (!language) throw new RpcError('invalid-request', M.badLanguageTag({ tag: request.language }));
    if (model.languages !== 'any' && !languageListed(model.languages, language)) {
      throw new RpcError('invalid-request', M.languageUnsupported({ modelId: choice.modelId, language }), {
        ...where,
        languages: model.languages,
      });
    }
  }
  const format = request.format ?? model.defaultFormat;
  if (!model.formats.includes(format)) {
    throw new RpcError('invalid-request', M.formatUnsupported({ modelId: choice.modelId, format }), { ...where, formats: model.formats });
  }
  const instructions = request.instructions?.trim() ? request.instructions.trim() : null;
  if (instructions && !model.acceptsInstructions) {
    throw new RpcError('invalid-request', M.noInstructions({ modelId: choice.modelId }), where);
  }
  const knob = (key: 'speed' | 'cfg' | 'steps', value: number | undefined): number | null => {
    if (value === undefined) return null;
    const range = traits.knobs[key];
    if (!range) throw new RpcError('invalid-request', M.knobUnsupported({ modelId: choice.modelId, key }), where);
    if (!(value >= range.min && value <= range.max)) {
      throw new RpcError('invalid-request', M.knobRange({ key, min: range.min, max: range.max }), { ...where, [key]: range });
    }
    return value;
  };
  const speed = knob('speed', request.speed);
  const cfg = knob('cfg', request.cfg);
  const steps = knob('steps', request.steps);
  const seed = checkSeed(request.seed, model.acceptsSeed, choice.modelId, where);

  const voiceDescription =
    plan.mode === 'describe'
      ? plan.description
      : plan.mode === 'preset' && plan.builtin && traits.builtinVoices === 'description'
        ? plan.builtin.description
        : undefined;
  return {
    capability: 'synthesizeSpeech',
    // 文本原样冻结：读音标注是文本的一部分，由引擎换成自己的写法。
    text: request.text,
    voice: frozenVoiceOf(plan),
    language,
    format,
    instructions,
    speed,
    seed,
    voiceMode: plan.mode,
    ...(needsReference ? { reference: local.reference! } : {}),
    ...(voiceDescription !== undefined ? { voiceDescription } : {}),
    ...(cfg !== null ? { cfg } : {}),
    ...(steps !== null ? { steps } : {}),
  };
}

/** 生图请求的检查只看输入图的张数与顺序，不管它们是路径、条目还是换好的文件。 */
export type ImageRequestShape = Omit<GenerateImageRequest, 'images'> & { images?: readonly unknown[] };

/** 输入图的用法：模型是否接受、张数、改动幅度，以及这次出几张。 */
export interface ImageInputPlan {
  mode: ImageInputMode;
  strength: number | null;
  /** 这次出几张：`img2img` 是底图的组数，`ref` 是请求的 `count`（默认 1）。 */
  count: number;
}

/**
 * 输入图的检查（架构设计 §6.1「生图的输入图」）：只看请求与模型的描述，不读文件，所以在读文件之前先过这一关。没有输入图时
 * null。不接受输入图、张数超过上限、模型不能以图为底重画、`count` 与底图的组数不符、`strength` 超出范围都是 `invalid-request`。
 */
export function imageInputPlan(choice: ModelChoice<'generateImage'>, request: ImageRequestShape): ImageInputPlan | null {
  const images = request.images;
  if (!images?.length) return null;
  const model: ImageModelInfo = choice.model;
  const where = { providerId: choice.providerId, modelId: choice.modelId };
  const refs = model.referenceImages;
  if (!refs) throw new RpcError('invalid-request', M.imagesUnsupported({ modelId: choice.modelId }), { ...where, referenceImages: null });
  if (images.length > refs.max) {
    throw new RpcError('invalid-request', M.imagesTooMany({ modelId: choice.modelId, count: images.length, max: refs.max }), {
      ...where,
      referenceImages: refs,
    });
  }
  const mode = request.imageMode ?? 'ref';
  if (mode === 'ref') return { mode, strength: null, count: request.count ?? 1 };
  const img2img = model.img2img;
  if (!img2img) throw new RpcError('invalid-request', M.img2imgUnsupported({ modelId: choice.modelId }), { ...where, img2img: null });
  const groups = Math.ceil(images.length / img2img.max);
  if (request.count !== undefined && request.count !== groups) {
    throw new RpcError('invalid-request', M.img2imgCount({ count: groups }), { ...where, count: groups, img2img });
  }
  const range = img2img.strength;
  const strength = request.strength ?? range.default;
  if (!(strength >= range.min && strength <= range.max)) {
    throw new RpcError('invalid-request', M.strengthRange({ min: range.min, max: range.max }), { ...where, strength: range });
  }
  return { mode, strength, count: groups };
}

/** 冻结好的输入图按模型的字节上限检查（每张、合计）；超了 `invalid-request`（`INPUT_TOO_LARGE`）。 */
function checkImageBytes(choice: ModelChoice<'generateImage'>, images: readonly FrozenImageInput[]): void {
  const refs = choice.model.referenceImages;
  if (!refs) return;
  const where = { providerId: choice.providerId, modelId: choice.modelId, code: 'INPUT_TOO_LARGE' };
  if (refs.maxBytesEach !== null) {
    const big = images.find((i) => i.byteLength > refs.maxBytesEach!);
    if (big) {
      throw new RpcError('invalid-request', M.imageTooLarge({ name: big.name, modelId: choice.modelId, limitMb: megabytes(refs.maxBytesEach) }), {
        ...where,
        name: big.name,
        byteLength: big.byteLength,
        limit: refs.maxBytesEach,
      });
    }
  }
  const total = images.reduce((sum, i) => sum + i.byteLength, 0);
  if (refs.maxBytesTotal !== null && total > refs.maxBytesTotal) {
    throw new RpcError('invalid-request', M.imagesTooLarge({ modelId: choice.modelId, limitMb: megabytes(refs.maxBytesTotal) }), {
      ...where,
      byteLength: total,
      limit: refs.maxBytesTotal,
    });
  }
}

/**
 * `images` 是提交时冻结好的输入图（与请求的 `images` 一一对应）；请求带输入图却没有冻结好的是调用方的错。
 */
export function imageParameters(
  choice: ModelChoice<'generateImage'>,
  request: ImageRequestShape,
  images: readonly FrozenImageInput[] = [],
): ImageParameters {
  const model: ImageModelInfo = choice.model;
  const where = { providerId: choice.providerId, modelId: choice.modelId };
  const prompt = request.prompt;
  if (!prompt.trim()) throw new RpcError('invalid-request', M.promptEmpty());
  const length = codePointLength(prompt);
  if (length > model.maxPromptChars) {
    throw new RpcError('invalid-request', M.promptTooLong({ length, modelId: choice.modelId, limit: model.maxPromptChars }), {
      ...where,
      length,
      limit: model.maxPromptChars,
    });
  }

  let size = model.defaultSize;
  let aspectRatio: string | null = null;
  if (request.size !== undefined) {
    if (request.size.includes(':')) {
      const found = model.aspectRatios.find((r) => r.ratio === request.size);
      if (!found) {
        throw new RpcError('invalid-request', M.aspectUnsupported({ modelId: choice.modelId, ratio: request.size }), {
          ...where,
          aspectRatios: model.aspectRatios.map((r) => r.ratio),
        });
      }
      size = found.size;
      aspectRatio = found.ratio;
    } else {
      if (!model.sizes.includes(request.size)) {
        throw new RpcError('invalid-request', M.sizeUnsupported({ modelId: choice.modelId, size: request.size }), {
          ...where,
          sizes: model.sizes,
        });
      }
      size = request.size;
    }
  }

  const plan = imageInputPlan(choice, request);
  if (plan && images.length !== request.images!.length) {
    throw new Error(`Input images for image generation were not frozen: ${choice.modelId}`);
  }
  if (plan) checkImageBytes(choice, images);
  // 以图为底重画时张数是底图的组数，上限由 `referenceImages.max` 管，不看 `maxCount`（本地模型一次一张，逐组各跑一次）。
  const count = plan?.count ?? request.count ?? 1;
  if (plan?.mode !== 'img2img' && (!Number.isInteger(count) || count < 1 || count > model.maxCount)) {
    throw new RpcError('invalid-request', M.maxCount({ modelId: choice.modelId, max: model.maxCount }), {
      ...where,
      maxCount: model.maxCount,
    });
  }

  const format = request.format ?? model.defaultFormat;
  if (!model.formats.includes(format)) {
    throw new RpcError('invalid-request', M.formatUnsupported({ modelId: choice.modelId, format }), { ...where, formats: model.formats });
  }
  const seed = checkSeed(request.seed, model.acceptsSeed, choice.modelId, where);
  let steps: number | null = null;
  if (request.steps !== undefined) {
    // 去噪步数只有本地文生图接受，范围见模型描述的 `local.steps`。
    const range = model.local?.steps;
    if (!range) throw new RpcError('invalid-request', M.noSteps({ modelId: choice.modelId }), where);
    if (!(Number.isInteger(request.steps) && request.steps >= range.min && request.steps <= range.max)) {
      throw new RpcError('invalid-request', stepsMessage(choice.modelId, range), { ...where, steps: range });
    }
    steps = request.steps;
  }
  return {
    capability: 'generateImage',
    prompt,
    size,
    aspectRatio,
    count,
    format,
    seed,
    ...(steps !== null ? { steps } : {}),
    ...(plan ? { images: [...images], imageMode: plan.mode, ...(plan.strength !== null ? { strength: plan.strength } : {}) } : {}),
  };
}

/** 步数超出范围的说明：上下限相同（蒸馏模型的固定步数）时直接说只收这一个值。 */
function stepsMessage(modelId: string, range: { min: number; max: number }) {
  return range.min === range.max ? M.stepsFixed({ modelId, steps: range.min }) : M.stepsRange({ min: range.min, max: range.max });
}

function checkSeed(seed: number | undefined, accepts: boolean, modelId: string, where: Record<string, string>): number | null {
  if (seed === undefined) return null;
  if (!accepts) throw new RpcError('invalid-request', M.noSeed({ modelId }), where);
  return seed;
}

function languageListed(languages: string[], tag: string): boolean {
  const lower = tag.toLowerCase();
  const primary = lower.split('-')[0]!;
  return languages.some((l) => l.toLowerCase() === lower || l.toLowerCase() === primary);
}

/**
 * 音乐生成的参数检查与冻结：风格与歌词按模型的上限，歌曲必须有歌词、纯音乐不收歌词；时长（目标与上限）在模型的范围内，不给上限时
 * 用目标时长、再没有用模型的默认时长；编排与格式按模型声明；seed 没给时留给本地 Provider 冻结（`localMusicSeed`）；步数只有本地模型接受。
 */
export function musicParameters(choice: ModelChoice<'generateMusic'>, request: GenerateMusicRequest, seed: number): MusicParameters {
  const model: MusicModelInfo = choice.model;
  const where = { providerId: choice.providerId, modelId: choice.modelId };
  if (!model.modes.includes(request.mode)) {
    throw new RpcError('invalid-request', M.modeUnsupported({ modelId: choice.modelId, mode: request.mode }), { ...where, modes: model.modes });
  }
  const style = request.style;
  if (!style.trim()) throw new RpcError('invalid-request', M.styleEmpty());
  const styleLength = codePointLength(style);
  if (styleLength > model.maxStyleChars) {
    throw new RpcError('invalid-request', M.styleTooLong({ length: styleLength, modelId: choice.modelId, limit: model.maxStyleChars }), {
      ...where,
      length: styleLength,
      limit: model.maxStyleChars,
    });
  }
  let lyrics: string | null = null;
  if (request.mode === 'song') {
    if (!request.lyrics?.trim()) throw new RpcError('invalid-request', M.lyricsEmpty(), where);
    const length = codePointLength(request.lyrics);
    if (length > model.maxLyricsChars) {
      throw new RpcError('invalid-request', M.lyricsTooLong({ length, modelId: choice.modelId, limit: model.maxLyricsChars }), {
        ...where,
        length,
        limit: model.maxLyricsChars,
      });
    }
    lyrics = request.lyrics;
  } else if (request.lyrics !== undefined) {
    throw new RpcError('invalid-request', M.lyricsNotInstrumental(), where);
  }
  const duration = (value: number | undefined): number | null => {
    if (value === undefined) return null;
    if (!(Number.isFinite(value) && value > 0 && value <= model.maxDurationSec)) {
      throw new RpcError('invalid-request', M.durationRange({ modelId: choice.modelId, max: model.maxDurationSec }), {
        ...where,
        maxDurationSec: model.maxDurationSec,
      });
    }
    return value;
  };
  const targetDurationSec = duration(request.targetDurationSec);
  const maxDurationSec = duration(request.maxDurationSec) ?? targetDurationSec ?? model.defaultDurationSec;
  if (targetDurationSec !== null && targetDurationSec > maxDurationSec) throw new RpcError('invalid-request', M.targetOverMax(), where);
  const planningOptions = model.local?.planning.options ?? ['off'];
  const planning = request.planning ?? model.local?.planning.default ?? 'off';
  if (!planningOptions.includes(planning)) {
    throw new RpcError(
      'invalid-request',
      M.planningUnsupported({ modelId: choice.modelId, planning, options: planningOptions.join(', ') }),
      { ...where, planning: planningOptions },
    );
  }
  const format = request.format ?? model.defaultFormat;
  if (!model.formats.includes(format)) {
    throw new RpcError('invalid-request', M.formatUnsupported({ modelId: choice.modelId, format }), { ...where, formats: model.formats });
  }
  if (request.seed !== undefined && !model.acceptsSeed) throw new RpcError('invalid-request', M.noSeed({ modelId: choice.modelId }), where);
  let steps: number | null = null;
  if (request.steps !== undefined) {
    const range = model.local?.steps;
    if (!range) throw new RpcError('invalid-request', M.noSteps({ modelId: choice.modelId }), where);
    if (!(Number.isInteger(request.steps) && request.steps >= range.min && request.steps <= range.max)) {
      throw new RpcError('invalid-request', stepsMessage(choice.modelId, range), { ...where, steps: range });
    }
    steps = request.steps;
  }
  return {
    capability: 'generateMusic',
    mode: request.mode,
    style,
    lyrics,
    targetDurationSec,
    maxDurationSec,
    planning,
    format,
    seed,
    ...(steps !== null ? { steps } : {}),
  };
}

/**
 * 出处与给智能体看的参数里去掉输入的本机路径（架构设计 §6.1）：生图的输入图只留来源、名字、摘要、大小、格式与条目或素材 id；
 * 语音合成的参考录音只留来源、摘要、大小与原文（音色库条目的 id 在 `voice` 里）。别的能力与没有输入的参数原样返回。
 */
export function withoutInputPaths<T extends GenerationParameters>(parameters: T): T {
  if (parameters.capability === 'generateImage' && parameters.images) {
    return { ...parameters, images: parameters.images.map(({ path: _path, ...rest }) => rest) };
  }
  if (parameters.capability === 'synthesizeSpeech' && parameters.reference) {
    const { path: _path, ...reference } = parameters.reference;
    return { ...parameters, reference };
  }
  return parameters;
}
