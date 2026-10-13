import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import type { FrozenImageInput, ImageModelInfo, ProviderView, SpeechModelInfo } from '@baocut/protocol';
import { codePointLength, imageInputPlan, imageParameters, speechParameters } from './generation-options.ts';
import { freezeImageInput, readFrozenImage, sniffImageMediaType, withoutImagePaths } from './image-inputs.ts';
import { ProviderFailure } from './transcribe-provider.ts';
import { selectModel, type ModelChoice } from './model-selection.ts';

/** 生成请求的提交时检查与选择（架构设计 §6.2、§6.6）：不合的拒绝，不悄悄改参数；合成没有出厂默认，生图按 §6.2 的顺序取第一个可用的。 */

const speechModel = (extra: Partial<SpeechModelInfo> = {}): SpeechModelInfo => ({
  modelId: 'tts',
  label: 'tts',
  default: true,
  voices: [{ voiceId: 'alloy', label: 'Alloy' }],
  defaultVoice: 'alloy',
  voiceModes: ['preset'],
  languages: ['en', 'zh'],
  maxInputChars: 5,
  formats: ['mp3', 'wav'],
  defaultFormat: 'mp3',
  acceptsInstructions: false,
  speedRange: { min: 0.5, max: 2 },
  acceptsSeed: false,
  cost: 'unknown',
  ...extra,
});

const imageModel = (extra: Partial<ImageModelInfo> = {}): ImageModelInfo => ({
  modelId: 'img',
  label: 'img',
  default: true,
  sizes: ['1024x1024', '1536x1024'],
  aspectRatios: [
    { ratio: '1:1', size: '1024x1024' },
    { ratio: '3:2', size: '1536x1024' },
  ],
  defaultSize: null,
  maxCount: 2,
  maxPromptChars: 10,
  formats: ['png'],
  defaultFormat: 'png',
  referenceImages: null,
  img2img: null,
  acceptsSeed: true,
  cost: 'unknown',
  ...extra,
});

const choice = <C extends 'synthesizeSpeech' | 'generateImage'>(capability: C, model: ModelChoice<C>['model']): ModelChoice<C> => ({
  capability,
  providerId: 'openai',
  modelId: model.modelId,
  kind: 'online',
  label: 'OpenAI',
  source: 'explicit',
  model,
});

const invalid = (details?: Record<string, unknown>) =>
  expect.objectContaining({ code: 'invalid-request', ...(details ? { details: expect.objectContaining(details) } : {}) });

describe('speechParameters', () => {
  const speech = choice('synthesizeSpeech', speechModel());

  it('补上默认音色与格式，冻结成完整的参数', () => {
    expect(speechParameters(speech, { text: 'hi', language: 'zh-Hans-CN', speed: 1.5 })).toEqual({
      capability: 'synthesizeSpeech',
      text: 'hi',
      voice: 'alloy',
      language: 'zh-Hans-CN',
      format: 'mp3',
      instructions: null,
      speed: 1.5,
      seed: null,
    });
  });

  it('文本按码点计上限，超过时拒绝（不截断）；空文本拒绝', () => {
    expect(codePointLength('😀😀😀')).toBe(3);
    expect(speechParameters(speech, { text: '😀😀😀😀😀' }).text).toBe('😀😀😀😀😀');
    expect(() => speechParameters(speech, { text: '123456' })).toThrow(invalid({ length: 6, limit: 5 }));
    expect(() => speechParameters(speech, { text: '  ' })).toThrow(invalid());
  });

  it('音色、语言、格式、语气说明、语速、seed 不合模型时拒绝', () => {
    expect(() => speechParameters(speech, { text: 'hi', voice: 'nova' })).toThrow(invalid({ voices: ['alloy'] }));
    expect(() => speechParameters(speech, { text: 'hi', language: 'ja' })).toThrow(invalid({ languages: ['en', 'zh'] }));
    expect(() => speechParameters(speech, { text: 'hi', language: 'not a tag!' })).toThrow(invalid());
    expect(() => speechParameters(speech, { text: 'hi', format: 'flac' })).toThrow(invalid({ formats: ['mp3', 'wav'] }));
    expect(() => speechParameters(speech, { text: 'hi', instructions: 'calm' })).toThrow(invalid());
    expect(() => speechParameters(speech, { text: 'hi', speed: 3 })).toThrow(invalid({ speedRange: { min: 0.5, max: 2 } }));
    expect(() => speechParameters(speech, { text: 'hi', seed: 1 })).toThrow(invalid());
    // 只有空白的语气说明当作没给。
    expect(speechParameters(speech, { text: 'hi', instructions: '  ' }).instructions).toBeNull();
  });

  it('没有默认音色时必须指定；接受自定义音色时任意 ID 原样传', () => {
    const custom = choice('synthesizeSpeech', speechModel({ voices: [], defaultVoice: null, voiceModes: ['custom'], languages: 'any' }));
    expect(() => speechParameters(custom, { text: 'hi' })).toThrow(invalid({ voices: [] }));
    expect(speechParameters(custom, { text: 'hi', voice: 'JBFqnCBsd6RMkjVDRZzb', language: 'ja' })).toMatchObject({
      voice: 'JBFqnCBsd6RMkjVDRZzb',
      language: 'ja',
    });
  });
});

describe('imageParameters', () => {
  const image = choice('generateImage', imageModel());

  it('不给尺寸时用模型的默认（null 交给供应商）；宽高比换成对应的尺寸', () => {
    expect(imageParameters(image, { prompt: 'a fox' })).toEqual({
      capability: 'generateImage',
      prompt: 'a fox',
      size: null,
      aspectRatio: null,
      count: 1,
      format: 'png',
      seed: null,
    });
    expect(imageParameters(image, { prompt: 'a fox', size: '3:2', count: 2, seed: 9 })).toMatchObject({
      size: '1536x1024',
      aspectRatio: '3:2',
      count: 2,
      seed: 9,
    });
    expect(imageParameters(image, { prompt: 'a fox', size: '1536x1024' })).toMatchObject({ size: '1536x1024', aspectRatio: null });
  });

  it('尺寸、宽高比、张数、格式、提示词长度不合模型时拒绝', () => {
    expect(() => imageParameters(image, { prompt: 'a fox', size: '512x512' })).toThrow(invalid({ sizes: ['1024x1024', '1536x1024'] }));
    expect(() => imageParameters(image, { prompt: 'a fox', size: '16:9' })).toThrow(invalid({ aspectRatios: ['1:1', '3:2'] }));
    expect(() => imageParameters(image, { prompt: 'a fox', count: 3 })).toThrow(invalid({ maxCount: 2 }));
    expect(() => imageParameters(image, { prompt: 'a fox', count: 0 })).toThrow(invalid());
    expect(() => imageParameters(image, { prompt: 'a fox', format: 'webp' })).toThrow(invalid({ formats: ['png'] }));
    expect(() => imageParameters(image, { prompt: 'a fox in the snow' })).toThrow(invalid({ limit: 10 }));
    expect(() => imageParameters(image, { prompt: '' })).toThrow(invalid());
  });

  it('步数只有本地模型接受：在线模型拒绝；本地按 local.steps 的范围检查，给了才冻结', () => {
    expect(() => imageParameters(image, { prompt: 'a fox', steps: 20 })).toThrow(invalid());
    const local = choice('generateImage', { ...imageModel(), local: { steps: { min: 8, max: 40, step: 4, default: 20 } } });
    expect(imageParameters(local, { prompt: 'a fox', steps: 8 })).toMatchObject({ steps: 8 });
    expect(imageParameters(local, { prompt: 'a fox' })).not.toHaveProperty('steps');
    for (const steps of [4, 41, 8.5]) expect(() => imageParameters(local, { prompt: 'a fox', steps })).toThrow(invalid());
  });

  it('固定步数的蒸馏模型只收那一个值，说明直接点出固定的步数', () => {
    const turbo = choice('generateImage', { ...imageModel(), local: { steps: { min: 8, max: 8, step: 8, default: 8 } } });
    expect(imageParameters(turbo, { prompt: 'a fox', steps: 8 })).toMatchObject({ steps: 8 });
    let message = '';
    try {
      imageParameters(turbo, { prompt: 'a fox', steps: 20 });
    } catch (error) {
      expect(error).toEqual(invalid({ steps: { min: 8, max: 8, step: 8, default: 8 } }));
      message = String((error as Error).message);
    }
    expect(message).toMatch(/\b8\b/);
    expect(message).not.toMatch(/8 (and|到) 8/);
  });
});

describe('生图的输入图（§6.1）', () => {
  const frozen = (name: string, byteLength = 10): FrozenImageInput => ({
    source: 'file',
    path: `/tmp/${name}`,
    sha256: `sha256:${'0'.repeat(64)}`,
    byteLength,
    mediaType: 'image/png',
    name,
  });
  const refs = { max: 3, edit: true, maxBytesEach: 100, maxBytesTotal: 150 };
  const img2img = { max: 1, strength: { min: 0.1, max: 1, step: 0.05, default: 0.6 } };
  const editing = choice('generateImage', imageModel({ referenceImages: refs }));
  const redraw = choice('generateImage', imageModel({ referenceImages: refs, img2img }));

  it('模型不收输入图、张数超过上限、不收 img2img 时拒绝，在冻结之前', () => {
    const plain = choice('generateImage', imageModel());
    expect(() => imageInputPlan(plain, { prompt: 'x', images: ['/a.png'] })).toThrow(invalid({ referenceImages: null }));
    expect(() => imageInputPlan(editing, { prompt: 'x', images: ['/a', '/b', '/c', '/d'] })).toThrow(invalid({ referenceImages: refs }));
    expect(() => imageInputPlan(editing, { prompt: 'x', images: ['/a'], imageMode: 'img2img' })).toThrow(invalid({ img2img: null }));
    expect(imageInputPlan(editing, { prompt: 'x' })).toBeNull();
    expect(imageInputPlan(editing, { prompt: 'x', images: ['/a', '/b'], count: 2 })).toEqual({ mode: 'ref', strength: null, count: 2 });
  });

  it('img2img：张数是底图的组数，给了别的张数拒绝；强度默认取模型的 default，超出范围拒绝', () => {
    expect(imageInputPlan(redraw, { prompt: 'x', images: ['/a', '/b', '/c'], imageMode: 'img2img' })).toEqual({
      mode: 'img2img',
      strength: 0.6,
      count: 3,
    });
    expect(() => imageInputPlan(redraw, { prompt: 'x', images: ['/a', '/b'], imageMode: 'img2img', count: 1 })).toThrow(invalid({ count: 2 }));
    expect(() => imageInputPlan(redraw, { prompt: 'x', images: ['/a'], imageMode: 'img2img', strength: 0.05 })).toThrow(
      invalid({ strength: img2img.strength }),
    );
    const params = imageParameters(redraw, { prompt: 'x', images: ['/a', '/b', '/c'], imageMode: 'img2img', strength: 0.3 }, [
      frozen('a'),
      frozen('b'),
      frozen('c'),
    ]);
    // 组数不受 maxCount（2）限制：本地模型逐组各跑一次。
    expect(params).toMatchObject({ count: 3, imageMode: 'img2img', strength: 0.3 });
    expect(params.images!.map((i) => i.name)).toEqual(['a', 'b', 'c']);
  });

  it('冻结后按模型的字节上限检查：单张与合计；ref 模式不带 strength', () => {
    expect(() => imageParameters(editing, { prompt: 'x', images: ['/a'] }, [frozen('a', 101)])).toThrow(
      invalid({ code: 'INPUT_TOO_LARGE', limit: 100 }),
    );
    expect(() => imageParameters(editing, { prompt: 'x', images: ['/a', '/b'] }, [frozen('a', 80), frozen('b', 80)])).toThrow(
      invalid({ code: 'INPUT_TOO_LARGE', limit: 150 }),
    );
    const params = imageParameters(editing, { prompt: 'x', images: ['/a'] }, [frozen('a')]);
    expect(params).toMatchObject({ imageMode: 'ref', count: 1 });
    expect(params).not.toHaveProperty('strength');
    // 出处与给智能体看的参数里没有本机路径。
    const { path: _path, ...withoutPath } = frozen('a');
    expect(withoutImagePaths(params).images).toEqual([withoutPath]);
  });

  it('按文件头认格式（扩展名不算）；冻结摘要，文件变了执行前读出时失败', async () => {
    const png = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0]);
    expect(sniffImageMediaType(png)).toBe('image/png');
    expect(sniffImageMediaType(Buffer.from([0xff, 0xd8, 0xff, 0xe0]))).toBe('image/jpeg');
    expect(sniffImageMediaType(Buffer.from('RIFF\0\0\0\0WEBPVP8 ', 'latin1'))).toBe('image/webp');
    expect(sniffImageMediaType(Buffer.from('GIF89a'))).toBeNull();

    const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'baocut-image-input-'));
    try {
      const file = path.join(dir, 'photo.jpg');
      await fs.writeFile(file, png);
      const input = await freezeImageInput({ source: 'space', path: file, entryId: 'ent_1', name: 'Photo' });
      expect(input).toMatchObject({ source: 'space', mediaType: 'image/png', byteLength: png.length, name: 'Photo', entryId: 'ent_1' });
      expect(input.sha256).toMatch(/^sha256:[0-9a-f]{64}$/);
      expect((await readFrozenImage(input)).equals(png)).toBe(true);
      await fs.writeFile(file, Buffer.concat([png, Buffer.from([1])]));
      await expect(readFrozenImage(input)).rejects.toBeInstanceOf(ProviderFailure);
      await expect(readFrozenImage(input)).rejects.toMatchObject({ kind: 'input-unreadable', details: { reason: 'changed', name: 'Photo' } });

      await fs.writeFile(path.join(dir, 'anim.png'), Buffer.from('GIF89a......'));
      await expect(freezeImageInput({ source: 'file', path: path.join(dir, 'anim.png') })).rejects.toMatchObject({
        code: 'invalid-request',
        details: { code: 'INPUT_FORMAT_UNSUPPORTED' },
      });
      await expect(freezeImageInput({ source: 'file', path: path.join(dir, 'missing.png') })).rejects.toMatchObject({
        code: 'invalid-request',
        details: { code: 'INPUT_UNREADABLE' },
      });
    } finally {
      await fs.rm(dir, { recursive: true, force: true });
    }
  });
});

describe('生成能力的选择', () => {
  const view = (providerId: string, kind: ProviderView['kind'], available = true): ProviderView => ({
    providerId,
    kind,
    label: providerId,
    config: null,
    capabilities: { synthesizeSpeech: { models: [speechModel()], available } },
  });

  it('没有出厂默认：local 提供了也不自动选，要显式指定或设默认值', () => {
    const select = (input: { provider?: string; userDefault?: { providerId: string; modelId: string } }) =>
      selectModel({
        capability: 'synthesizeSpeech',
        userDefault: null,
        providers: [view('local', 'local'), view('openai', 'online')],
        ...input,
      });
    expect(() => select({})).toThrow(
      expect.objectContaining({
        details: expect.objectContaining({
          code: 'CAPABILITY_NOT_CONFIGURED',
          capability: 'synthesizeSpeech',
          reason: 'no-default',
          remedy: expect.objectContaining({ action: 'set-default' }),
        }),
      }),
    );
    expect(select({ provider: 'local' })).toMatchObject({ providerId: 'local', modelId: 'tts', source: 'explicit' });
    expect(select({ userDefault: { providerId: 'openai', modelId: 'tts' } })).toMatchObject({
      providerId: 'openai',
      source: 'user-default',
    });
  });

  it('什么都不可用：remedy 是去配置一个服务', () => {
    expect(() => selectModel({ capability: 'synthesizeSpeech', userDefault: null, providers: [view('openai', 'online', false)] })).toThrow(
      expect.objectContaining({ details: expect.objectContaining({ remedy: expect.objectContaining({ action: 'configure-provider' }) }) }),
    );
  });
});
