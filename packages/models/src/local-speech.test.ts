import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { FrozenSpeechReference, ModelBundleStatus, SynthesizeSpeechRequest } from '@baocut/protocol';
import { speechParameters } from './generation-options.ts';
import {
  audioCppSpeechRequestOf,
  builtinReferenceFile,
  engineLanguage,
  freezeReferenceFile,
  frozenVoiceOf,
  limitSpeechPeak,
  localSpeechModelInfo,
  planLocalVoice,
  SPEECH_PEAK_CEILING,
  type LocalVoicePlan,
} from './local-speech.ts';
import type { ModelChoice } from './model-selection.ts';
import { SPEECH_BUNDLES } from './speech-bundles.ts';
import {
  inspectWav,
  SPEECH_SELF_TEST_LIMITS,
  SPEECH_SELF_TEST_SENTENCES,
  speechSelfTestRequest,
  speechSelfTestVerdict,
} from './speech-self-test.ts';
import { builtinVoice, builtinVoiceFile } from './speech-voices.ts';

/** 本地合成在提交时的检查与冻结（架构设计 §6.1、§6.6），以及自检的判定（Model Worker 协议规范 §4.3）。 */

const status = { detail: undefined } as unknown as ModelBundleStatus;
const def = (id: string) => SPEECH_BUNDLES.find((b) => b.bundleId === id)!;
const local = (id: string): ModelChoice<'synthesizeSpeech'> => ({
  capability: 'synthesizeSpeech',
  providerId: 'local',
  modelId: id,
  kind: 'local',
  label: 'local',
  source: 'explicit',
  model: localSpeechModelInfo(def(id), status, true),
});
const BASE = local('qwen3-tts-0.6b-base@audio-cpp-q8');
const CUSTOM = local('qwen3-tts-1.7b-customvoice@audio-cpp-q8');
const DESIGN = local('qwen3-tts-1.7b-voicedesign@audio-cpp-q8');
const INDEX = local('indextts2@audio-cpp-q8');
const INDEX25 = local('index-tts2.5@audio-cpp-q8');
const VOX = local('voxcpm2@audio-cpp-q8');
const OMNI = local('omnivoice@audio-cpp-q8');
const FISH = local('fish-s2-pro@audio-cpp-q8');

const invalid = (details?: Record<string, unknown>) =>
  expect.objectContaining({ code: 'invalid-request', ...(details ? { details: expect.objectContaining(details) } : {}) });

const plan = (choice: ModelChoice<'synthesizeSpeech'>, request: Partial<SynthesizeSpeechRequest>) =>
  planLocalVoice(choice, { text: '你好', ...request });

const REFERENCE: FrozenSpeechReference = {
  source: 'file',
  path: '/r.wav',
  sha256: `sha256:${'a'.repeat(64)}`,
  byteLength: 10,
  transcript: null,
};

describe('planLocalVoice', () => {
  it('不指定声音：内置音色按请求语言挑（没有那种语言时取第一只）；说话人模型用默认说话人', () => {
    expect(plan(BASE, { language: 'ja-JP' })).toMatchObject({ mode: 'preset', voice: 'ja-female', builtin: { id: 'ja-female' } });
    expect(plan(BASE, { language: 'sw' })).toMatchObject({ mode: 'preset', voice: 'zh-female' });
    expect(plan(BASE, {})).toMatchObject({ mode: 'preset', voice: 'zh-female' });
    expect(plan(CUSTOM, {})).toEqual({ mode: 'preset', voice: 'Vivian', builtin: null });
    expect(plan(CUSTOM, { voice: 'Ryan' })).toEqual({ mode: 'preset', voice: 'Ryan', builtin: null });
    expect(plan(BASE, { voice: 'en-male' })).toMatchObject({ mode: 'preset', voice: 'en-male', builtin: { id: 'en-male' } });
  });

  it('克隆：文件或音色库条目；原文只给读原文的模型', () => {
    expect(plan(BASE, { reference: { file: '/r.wav', transcript: '  原文 ' } })).toEqual({
      mode: 'clone',
      source: 'file',
      path: '/r.wav',
      transcript: '原文',
    });
    expect(plan(BASE, { reference: { file: '/r.wav', transcript: '   ' } })).toMatchObject({ transcript: null });
    expect(plan(BASE, { voice: 'library:vce_1' })).toEqual({ mode: 'clone', source: 'library', libraryId: 'vce_1' });
    expect(plan(INDEX, { reference: { file: '/r.wav' } })).toMatchObject({ mode: 'clone', transcript: null });
    expect(() => plan(INDEX, { reference: { file: '/r.wav', transcript: '原文' } })).toThrow(invalid());
  });

  it('描述：自由文本或封闭词表（每类至多一项，英文不分大小写，全角逗号也算）', () => {
    expect(plan(DESIGN, { voiceDescription: ' a calm narrator ' })).toEqual({ mode: 'describe', description: 'a calm narrator' });
    expect(plan(OMNI, { voiceDescription: 'Female, low pitch，四川话' })).toMatchObject({ mode: 'describe' });
    expect(() => plan(OMNI, { voiceDescription: 'female, robot' })).toThrow(invalid({ term: 'robot' }));
    expect(() => plan(OMNI, { voiceDescription: 'female, male' })).toThrow(invalid({ category: 'gender' }));
    expect(() => plan(OMNI, { voiceDescription: ' , ' })).toThrow(invalid());
    expect(() => plan(DESIGN, { voiceDescription: '  ' })).toThrow(invalid());
  });

  it('模型做不到的方式与没有的音色都拒绝，不换声音；三种声音只能给一个', () => {
    expect(() => plan(CUSTOM, { reference: { file: '/r.wav' } })).toThrow(invalid({ voiceMode: 'clone' }));
    expect(() => plan(CUSTOM, { voice: 'library:vce_1' })).toThrow(invalid({ voiceMode: 'clone' }));
    expect(() => plan(BASE, { voiceDescription: 'calm' })).toThrow(invalid({ voiceMode: 'describe' }));
    expect(() => plan(DESIGN, { reference: { file: '/r.wav' } })).toThrow(invalid({ voiceMode: 'clone' }));
    expect(() => plan(CUSTOM, { voice: 'alloy' })).toThrow(invalid({ voices: expect.arrayContaining(['Vivian']) }));
    expect(() => plan(BASE, { voice: 'Vivian' })).toThrow(invalid());
    expect(() => plan(BASE, { voice: 'zh-female', reference: { file: '/r.wav' } })).toThrow(invalid());
    expect(() => plan(OMNI, { reference: { file: '/r.wav' }, voiceDescription: 'female' })).toThrow(invalid());
  });

  it('内置音色：克隆模型要它的录音，描述模型不要；冻结的 voice 记下来源', () => {
    const preset = plan(BASE, { voice: 'en-female' });
    expect(builtinReferenceFile(BASE.model, preset)).toMatchObject({
      source: 'builtin',
      path: builtinVoiceFile(builtinVoice('en-female')!),
    });
    expect(builtinReferenceFile(DESIGN.model, plan(DESIGN, { voice: 'en-female' }))).toBeNull();
    expect(builtinReferenceFile(CUSTOM.model, plan(CUSTOM, {}))).toBeNull();
    const cases: Array<[LocalVoicePlan, string]> = [
      [preset, 'en-female'],
      [{ mode: 'clone', source: 'file', path: '/r.wav', transcript: null }, 'reference'],
      [{ mode: 'clone', source: 'library', libraryId: 'vce_1' }, 'library:vce_1'],
      [{ mode: 'describe', description: 'x' }, 'description'],
    ];
    for (const [p, voice] of cases) expect(frozenVoiceOf(p)).toBe(voice);
  });
});

describe('speechParameters（本地模型）', () => {
  const freeze = (choice: ModelChoice<'synthesizeSpeech'>, request: SynthesizeSpeechRequest, reference: FrozenSpeechReference | null) =>
    speechParameters(choice, request, { plan: planLocalVoice(choice, request), reference });

  it('克隆：参考录音冻结进参数；文本原样保留（读音标注由引擎处理）', () => {
    const text = '重(chong2)新开始';
    const parameters = freeze(BASE, { text, reference: { file: '/r.wav' } }, REFERENCE);
    expect(parameters).toEqual({
      capability: 'synthesizeSpeech',
      text,
      voice: 'reference',
      language: null,
      format: 'wav',
      instructions: null,
      speed: null,
      seed: null,
      voiceMode: 'clone',
      reference: REFERENCE,
    });
  });

  it('需要参考录音却没有冻结：编程错误', () => {
    expect(() => freeze(BASE, { text: 'x', voice: 'en-female' }, null)).toThrow(/was not frozen/);
    expect(() => freeze(BASE, { text: 'x', reference: { file: '/r.wav' } }, null)).toThrow(/was not frozen/);
  });

  it('VoiceDesign 的内置音色冻结成它的描述；说话人模型不带参考录音', () => {
    expect(freeze(DESIGN, { text: 'x', voice: 'en-male' }, null)).toMatchObject({
      voice: 'en-male',
      voiceMode: 'preset',
      voiceDescription: builtinVoice('en-male')!.description,
    });
    const custom = freeze(CUSTOM, { text: 'x', voice: 'Eric', instructions: ' 慢一点 ' }, null);
    expect(custom).toMatchObject({ voice: 'Eric', voiceMode: 'preset', instructions: '慢一点' });
    expect(custom).not.toHaveProperty('reference');
  });

  it('旋钮按模型的范围检查；模型没有的旋钮拒绝', () => {
    const omni = freeze(OMNI, { text: 'x', voiceDescription: 'male', speed: 1.2, cfg: 3, steps: 16, seed: 9 }, null);
    expect(omni).toMatchObject({ voiceMode: 'describe', voiceDescription: 'male', speed: 1.2, cfg: 3, steps: 16, seed: 9 });
    expect(() => freeze(OMNI, { text: 'x', voiceDescription: 'male', steps: 100 }, null)).toThrow(invalid());
    expect(() => freeze(VOX, { text: 'x', voice: 'en-female', speed: 1 }, REFERENCE)).toThrow(invalid());
    expect(() => freeze(BASE, { text: 'x', voice: 'en-female', cfg: 2 }, REFERENCE)).toThrow(invalid());
    expect(() => freeze(BASE, { text: 'x', voice: 'en-female', instructions: '慢' }, REFERENCE)).toThrow(invalid());
    expect(() => freeze(BASE, { text: 'x', voice: 'en-female', format: 'mp3' }, REFERENCE)).toThrow(invalid());
    expect(() => freeze(BASE, { text: 'x', voice: 'en-female', language: 'sw' }, REFERENCE)).toThrow(invalid());
    expect(() => freeze(BASE, { text: 'x'.repeat(2001), voice: 'en-female' }, REFERENCE)).toThrow(invalid({ limit: 2000 }));
  });

  it('在线模型不接受本地才有的字段', () => {
    const online: ModelChoice<'synthesizeSpeech'> = {
      ...BASE,
      providerId: 'openai',
      kind: 'online',
      model: { ...BASE.model, local: undefined, voices: [{ voiceId: 'alloy', label: 'Alloy' }], defaultVoice: 'alloy' },
    };
    expect(() => speechParameters(online, { text: 'x', reference: { file: '/r.wav' } })).toThrow(invalid());
    expect(() => speechParameters(online, { text: 'x', voiceDescription: 'calm' })).toThrow(invalid());
    expect(() => speechParameters(online, { text: 'x', cfg: 1 })).toThrow(invalid());
    expect(() => speechParameters(online, { text: 'x', steps: 4 })).toThrow(invalid());
  });
});

describe('audioCppSpeechRequestOf', () => {
  const freeze = (choice: ModelChoice<'synthesizeSpeech'>, request: SynthesizeSpeechRequest, reference: FrozenSpeechReference | null) =>
    speechParameters(choice, request, { plan: planLocalVoice(choice, request), reference });
  const request = (choice: ModelChoice<'synthesizeSpeech'>, parameters: ReturnType<typeof freeze>, wav: string | null = '/tmp/ref.wav') =>
    audioCppSpeechRequestOf(parameters, def(choice.modelId).speech!, wav);
  const chunk = (choice: ModelChoice<'synthesizeSpeech'>) => def(choice.modelId).speech!.engine.chunkSize;
  const BUILTIN: FrozenSpeechReference = { ...REFERENCE, source: 'builtin', transcript: '原文' };

  it('Qwen3-TTS Base 克隆：有原文给 reference_text，没有原文只用说话人向量；语言取引擎认得的写法', () => {
    const withText = request(BASE, freeze(BASE, { text: '你好', language: 'zh-CN', reference: { file: '/r.wav', transcript: '原文' } }, BUILTIN));
    expect(withText).toEqual({
      body: {
        model: 'speech',
        input: '你好',
        voice_ref: '/tmp/ref.wav',
        reference_text: '原文',
        options: { language: 'zh', text_chunk_size: chunk(BASE) },
      },
      dropped: [],
    });
    const bare = request(BASE, freeze(BASE, { text: '你好', reference: { file: '/r.wav' } }, REFERENCE));
    expect(bare.body).not.toHaveProperty('reference_text');
    expect(bare.body.options).toEqual({ x_vector_only_mode: true, text_chunk_size: chunk(BASE) });
  });

  it('IndexTTS2：不读原文；读音标注按表面文字合成并报告；引擎不认的语言不给', () => {
    const parameters = freeze(INDEX, { text: '他在<银行|yin2 hang2>上班', language: 'ja', voice: 'zh-female' }, BUILTIN);
    const { body, dropped } = request(INDEX, parameters);
    expect(body).toEqual({ model: 'speech', input: '他在银行上班', voice_ref: '/tmp/ref.wav', options: { text_chunk_size: chunk(INDEX) } });
    expect(dropped).toEqual([{ start: 2, end: 4, reading: 'yin2 hang2', origin: 'user' }]);
  });

  it('IndexTTS 2.5：读音标注原样交给引擎；语速换成目标时长的倍率', () => {
    const parameters = freeze(INDEX25, { text: '银<行|háng>', language: 'ja-JP', speed: 1.25, seed: 7, reference: { file: '/r.wav' } }, REFERENCE);
    expect(request(INDEX25, parameters)).toEqual({
      body: {
        model: 'speech',
        input: '银<行|hang2>',
        voice_ref: '/tmp/ref.wav',
        seed: 7,
        options: { language: 'ja', text_chunk_size: chunk(INDEX25), duration_scale: 0.8 },
      },
      dropped: [],
    });
  });

  it('CustomVoice 给说话人与语气说明；VoiceDesign 的描述（内置音色也是描述）是 instruct', () => {
    const custom = request(CUSTOM, freeze(CUSTOM, { text: 'x', voice: 'Eric', instructions: ' 慢一点 ' }, null), null);
    expect(custom.body).toEqual({
      model: 'speech',
      input: 'x',
      options: { instruct: '慢一点', text_chunk_size: chunk(CUSTOM), voice_id: 'Eric' },
    });
    const design = request(DESIGN, freeze(DESIGN, { text: 'x', voiceDescription: 'a calm narrator' }, null), null);
    expect(design.body.options).toEqual({ instruct: 'a calm narrator', text_chunk_size: chunk(DESIGN) });
    const builtin = request(DESIGN, freeze(DESIGN, { text: 'x', voice: 'en-male' }, null), null);
    expect(builtin.body.options.instruct).toBe(builtinVoice('en-male')!.description);
    expect(builtin.body).not.toHaveProperty('voice_ref');
  });

  it('VoxCPM2：风格说明接在正文前；引导强度与步数', () => {
    const parameters = freeze(VOX, { text: '正文', voice: 'en-female', instructions: '轻快', cfg: 2.5, steps: 20 }, BUILTIN);
    expect(request(VOX, parameters).body).toEqual({
      model: 'speech',
      input: '(轻快)正文',
      voice_ref: '/tmp/ref.wav',
      reference_text: '原文',
      options: { text_chunk_size: chunk(VOX), guidance_scale: 2.5, num_inference_steps: 20 },
    });
  });

  it('OmniVoice：描述、语速、引导强度、步数与种子；不认得的语言由模型自己判断', () => {
    const parameters = freeze(OMNI, { text: 'x', language: 'zh-CN', voiceDescription: 'male', speed: 1.2, cfg: 3, steps: 16, seed: 9 }, null);
    expect(request(OMNI, parameters, null).body).toEqual({
      model: 'speech',
      input: 'x',
      seed: 9,
      options: { language: 'zh', instruct: 'male', speed: 1.2, guidance_scale: 3, num_inference_steps: 16 },
    });
    const unknown = freeze(OMNI, { text: 'x', language: 'tlh', voiceDescription: 'male' }, null);
    expect(request(OMNI, unknown, null).body.options).toEqual({ instruct: 'male' });
  });

  it('Fish 克隆带原文；克隆却没有转好的参考 WAV 是编程错误', () => {
    const fish = freeze(FISH, { text: 'x', reference: { file: '/r.wav', transcript: 'Hello' } }, { ...REFERENCE, transcript: 'Hello' });
    expect(request(FISH, fish).body).toEqual({ model: 'speech', input: 'x', voice_ref: '/tmp/ref.wav', reference_text: 'Hello', options: {} });
    expect(() => request(FISH, fish, null)).toThrow(/without a converted reference/);
  });
});

describe('engineLanguage', () => {
  it('整个标签或主语言子标签，不分大小写；不在表里或没有表时 null', () => {
    expect(engineLanguage('yue', ['zh', 'yue'])).toBe('yue');
    expect(engineLanguage('zh-Hant-TW', ['zh', 'en'])).toBe('zh');
    expect(engineLanguage('EN-us', ['zh', 'en'])).toBe('en');
    expect(engineLanguage('sw', ['zh', 'en'])).toBeNull();
    expect(engineLanguage(null, ['zh'])).toBeNull();
    expect(engineLanguage('zh', undefined)).toBeNull();
  });
});

describe('limitSpeechPeak', () => {
  const samples16 = (bytes: Buffer) => Array.from({ length: (bytes.length - 44) / 2 }, (_, i) => bytes.readInt16LE(44 + i * 2) / 32_768);

  it('16 位满幅等比缩到 −1 dBFS，返回增益', () => {
    const bytes = wav({ seconds: 0.01, sample: (i) => (i % 2 ? 1 : -0.5) });
    const gain = limitSpeechPeak(bytes);
    expect(gain).toBeCloseTo(SPEECH_PEAK_CEILING, 3);
    const peak = Math.max(...samples16(bytes).map(Math.abs));
    expect(peak).toBeLessThanOrEqual(SPEECH_PEAK_CEILING + 1e-4);
    expect(peak).toBeGreaterThan(SPEECH_PEAK_CEILING - 1e-3);
    expect(samples16(bytes)[0]).toBeCloseTo(-0.5 * SPEECH_PEAK_CEILING, 3);
  });

  it('峰值没到上限时不动；浮点 WAV 里的 NaN 清零', () => {
    const quiet = wav({ seconds: 0.01 });
    const copy = Buffer.from(quiet);
    expect(limitSpeechPeak(quiet)).toBeNull();
    expect(quiet.equals(copy)).toBe(true);
    const float = wav({ seconds: 0.01, float: true, bits: 32, sample: (i) => (i === 0 ? Number.NaN : 0.5) });
    expect(limitSpeechPeak(float)).toBeNull();
    expect(float.readFloatLE(44)).toBe(0);
    expect(float.readFloatLE(48)).toBe(0.5);
  });

  it('不是 WAV、其他位深原样返回', () => {
    expect(limitSpeechPeak(Buffer.from('ID3 not a wav'))).toBeNull();
    const deep = wav({ seconds: 0.01, bits: 24, sample: () => 1 });
    const copy = Buffer.from(deep);
    expect(limitSpeechPeak(deep)).toBeNull();
    expect(deep.equals(copy)).toBe(true);
  });
});

describe('freezeReferenceFile', () => {
  let dir: string;
  beforeAll(async () => {
    dir = await fs.mkdtemp(path.join(os.tmpdir(), 'baocut-local-speech-'));
  });
  afterAll(async () => {
    await fs.rm(dir, { recursive: true, force: true });
  });

  it('读出摘要与长度；读不出（不存在、是目录）时 invalid-request', async () => {
    const file = path.join(dir, 'ref.wav');
    await fs.writeFile(file, 'reference bytes');
    expect(await freezeReferenceFile({ source: 'file', path: file, transcript: '原文' })).toEqual({
      source: 'file',
      path: file,
      sha256: `sha256:${crypto.createHash('sha256').update('reference bytes').digest('hex')}`,
      byteLength: 15,
      transcript: '原文',
    });
    const missing = path.join(dir, 'missing.wav');
    await expect(freezeReferenceFile({ source: 'file', path: missing, transcript: null })).rejects.toMatchObject({
      code: 'invalid-request',
      message: expect.stringContaining('参考录音「missing.wav」读不出来'),
      details: { code: 'INPUT_UNREADABLE', reference: 'file', file: missing },
    });
    await expect(freezeReferenceFile({ source: 'file', path: dir, transcript: null })).rejects.toMatchObject({
      code: 'invalid-request',
      details: { code: 'INPUT_UNREADABLE', file: dir },
    });
  });

  it('内置音色的录音读不出来是安装不完整（APP_FILE_MISSING），句子里不带路径', async () => {
    const voice = builtinVoice('en-male')!;
    const builtin = { source: 'builtin' as const, voiceId: voice.id, asset: voice.asset, transcript: null };
    const gone = path.join(dir, 'gone', 'en-male.wav');
    for (const file of [gone, null]) {
      const error = await freezeReferenceFile({ ...builtin, path: file }).catch((e: unknown) => e);
      expect(error).toMatchObject({
        code: 'conflict',
        message: expect.stringContaining('重新安装 BaoCut'),
        details: { code: 'APP_FILE_MISSING', asset: 'tts-voices/en-male.wav', file },
      });
      expect((error as Error).message).not.toContain(dir);
    }
  });

  it('随应用分发的内置音色录音都在', async () => {
    const voice = builtinVoice('zh-female')!;
    const frozen = await freezeReferenceFile({
      source: 'builtin',
      voiceId: voice.id,
      asset: voice.asset,
      path: builtinVoiceFile(voice),
      transcript: voice.transcript,
    });
    expect(frozen.byteLength).toBeGreaterThan(1000);
    expect(speechSelfTestVerdict(await fs.readFile(builtinVoiceFile(voice)!))).toMatchObject({ passed: true });
  });
});

/** 合成一段 WAV：`sample(i)` 是 -1..1 的样本。 */
function wav(options: {
  seconds: number;
  rate?: number;
  channels?: number;
  bits?: 16 | 24 | 32;
  float?: boolean;
  sample?: (i: number) => number;
}) {
  const { seconds, rate = 24_000, channels = 1, bits = 16, float = false, sample = (i) => Math.sin(i / 10) * 0.25 } = options;
  const frames = Math.round(seconds * rate);
  const width = bits / 8;
  const data = Buffer.alloc(frames * channels * width);
  for (let i = 0; i < frames * channels; i++) {
    const value = sample(i);
    if (float) data.writeFloatLE(value, i * width);
    else if (bits === 16) data.writeInt16LE(Math.round(value * 32_767), i * width);
    else if (bits === 24) data.writeIntLE(Math.round(value * 8_388_607), i * width, 3);
    else data.writeInt32LE(Math.round(value * 2_147_483_647), i * width);
  }
  const header = Buffer.alloc(44);
  header.write('RIFF', 0, 'ascii');
  header.writeUInt32LE(36 + data.length, 4);
  header.write('WAVE', 8, 'ascii');
  header.write('fmt ', 12, 'ascii');
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(float ? 3 : 1, 20);
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(rate, 24);
  header.writeUInt32LE(rate * channels * width, 28);
  header.writeUInt16LE(channels * width, 32);
  header.writeUInt16LE(bits, 34);
  header.write('data', 36, 'ascii');
  header.writeUInt32LE(data.length, 40);
  return Buffer.concat([header, data]);
}

describe('自检的判定', () => {
  it('能解码、时长合理、有声音才通过', () => {
    expect(speechSelfTestVerdict(wav({ seconds: 1 }))).toMatchObject({
      passed: true,
      wav: { sampleRate: 24_000, channels: 1, bitsPerSample: 16, encoding: 'pcm', durationSec: 1 },
    });
    expect(speechSelfTestVerdict(wav({ seconds: 1.5, rate: 48_000, channels: 2, float: true, bits: 32 }))).toMatchObject({
      passed: true,
      wav: { encoding: 'float', channels: 2, durationSec: 1.5 },
    });
    expect(speechSelfTestVerdict(wav({ seconds: 0.5, rate: 22_050, bits: 24 }))).toMatchObject({ passed: true });
    expect(speechSelfTestVerdict(wav({ seconds: 0.5, bits: 32 }))).toMatchObject({ passed: true });
  });

  it('静音、太短、太长、不是 WAV 都不通过', () => {
    expect(speechSelfTestVerdict(wav({ seconds: 1, sample: () => 0 }))).toMatchObject({ passed: false, problem: '输出是静音' });
    // -70 dBFS 也当作静音。
    expect(speechSelfTestVerdict(wav({ seconds: 1, sample: (i) => (i % 2 ? 1 : -1) * 10 ** (-70 / 20) }))).toMatchObject({ passed: false });
    expect(speechSelfTestVerdict(wav({ seconds: SPEECH_SELF_TEST_LIMITS.minDurationSec / 2 }))).toMatchObject({
      passed: false,
      problem: expect.stringMatching(/时长/),
    });
    expect(speechSelfTestVerdict(wav({ seconds: 31, rate: 8_000 }))).toMatchObject({
      passed: false,
      problem: expect.stringMatching(/时长/),
    });
    expect(speechSelfTestVerdict(Buffer.from('ID3 not a wav'))).toMatchObject({
      passed: false,
      problem: expect.stringMatching(/不能解码/),
    });
  });

  it('削波：到了满幅的样本超过 0.1% 不通过；峰值接近满幅但没有削到顶的照常通过', () => {
    const square = speechSelfTestVerdict(wav({ seconds: 1, sample: (i) => (i % 2 ? 1 : -1) * 0.6 }));
    expect(square).toMatchObject({ passed: true, wav: { clippedRatio: 0 } });
    // 一秒里 24 个样本到顶（0.1%）还算通过，再多就是削波。
    const edge = (count: number) => wav({ seconds: 1, sample: (i) => (i < count ? 1 : Math.sin(i / 10) * 0.25) });
    expect(speechSelfTestVerdict(edge(24))).toMatchObject({ passed: true, wav: { peak: expect.closeTo(1, 3) } });
    expect(speechSelfTestVerdict(edge(25))).toMatchObject({ passed: false, problem: expect.stringMatching(/^输出削波：/) });
    const hot = speechSelfTestVerdict(wav({ seconds: 1, sample: (i) => Math.max(-1, Math.min(1, Math.sin(i / 10) * 1.5)) }));
    expect(hot).toMatchObject({ passed: false, problem: expect.stringMatching(/削波/), wav: { clippedRatio: expect.any(Number) } });
    expect(hot.wav!.clippedRatio).toBeGreaterThan(0.3);
    expect(speechSelfTestVerdict(wav({ seconds: 1, sample: (i) => Math.sin(i / 10) * 0.95, float: true, bits: 32 }))).toMatchObject({
      passed: true,
      wav: { clippedRatio: 0 },
    });
  });

  it('inspectWav 认出坏头：缺 data、编码与声道不支持', () => {
    const good = wav({ seconds: 0.1 });
    expect(inspectWav(good.subarray(0, 36))).toEqual({ ok: false, problem: '缺少 data 块' });
    const alaw = Buffer.from(good);
    alaw.writeUInt16LE(6, 20);
    expect(inspectWav(alaw)).toMatchObject({ ok: false, problem: expect.stringMatching(/编码/) });
    const many = Buffer.from(good);
    many.writeUInt16LE(6, 22);
    expect(inspectWav(many)).toMatchObject({ ok: false, problem: expect.stringMatching(/声道/) });
    const bits = Buffer.from(good);
    bits.writeUInt16LE(8, 34);
    expect(inspectWav(bits)).toMatchObject({ ok: false, problem: expect.stringMatching(/位深/) });
  });

  it('自检的句子：模型列出的第一种有句子的语言；接受任意语言时用英文', () => {
    expect(speechSelfTestRequest(def(BASE.modelId))).toEqual({ text: SPEECH_SELF_TEST_SENTENCES.zh, language: 'zh' });
    expect(speechSelfTestRequest(def(OMNI.modelId))).toEqual({ text: SPEECH_SELF_TEST_SENTENCES.en, language: 'en' });
    const swahili = { ...def(VOX.modelId), speech: { ...def(VOX.modelId).speech!, languages: ['sw', 'ar'] } };
    expect(speechSelfTestRequest(swahili)).toEqual({ text: SPEECH_SELF_TEST_SENTENCES.ar, language: 'ar' });
    const none = { ...swahili, speech: { ...swahili.speech, languages: ['sw'] } };
    expect(speechSelfTestRequest(none)).toEqual({ text: SPEECH_SELF_TEST_SENTENCES.en, language: 'en' });
  });
});

describe('Fish reference transcript', () => {
  const fish = FISH;
  it('rejects absent or blank transcripts before starting a generation job', () => {
    for (const transcript of [undefined, '', '  ']) {
      expect(() => plan(fish, {reference: {file: '/r.wav', transcript}})).toThrow();
    }
    expect(plan(fish, {reference: {file: '/r.wav', transcript: 'Hello'}})).toMatchObject({mode: 'clone', transcript: 'Hello'});
    expect(plan(fish, {})).toMatchObject({mode: 'preset', builtin: { id: 'zh-female' }});
    expect(() => plan(fish, {voiceDescription: 'Warm voice'})).toThrow();
  });
});
