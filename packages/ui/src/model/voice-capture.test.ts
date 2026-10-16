import { describe, expect, it } from 'vitest';
import type { ModelCapabilitiesView, VoiceClone } from '@baocut/protocol';
import { speechModel, withLocalSpeech } from './models-test-fixtures.ts';
import {
  CONSENT_COMMON,
  CONSENT_PHRASES,
  FALLBACK_SEED,
  clock,
  cloneSteps,
  cloneTargets,
  consentLanguageName,
  consentMore,
  consentPhrase,
  consentTooShort,
  defaultPicked,
  defaultScriptLanguage,
  defaultVoiceName,
  downmix,
  encodeWav,
  initialSeeds,
  randomSeed,
  reseedTargets,
  reseeded,
  sampleScript,
  sampleVerdict,
  seedFor,
  seedGroups,
  voiceIdBindings,
  voicesBoundTo,
  type CloneTarget,
} from './voice-capture.ts';
import { captureVoiceRequest, cloneProviders, consentClipRequest, reseedRequest, type VoiceEntry } from './voices-library.ts';

/** 本机两只能克隆的（一只收种子）、一只没装的；云端 ElevenLabs（不要授权声明录音）与一家要的。 */
function view(): ModelCapabilitiesView {
  const v = withLocalSpeech();
  const providers = v.synthesizeSpeech.providers.map((p) => {
    if (p.providerId === 'local') {
      return {
        ...p,
        models: [
          ...p.models,
          speechModel('qwen3-tts-0.6b-base', [], { label: 'Qwen3-TTS 0.6B Base', voiceModes: ['clone'], acceptsSeed: true }),
          speechModel('gpt-sovits-v2', [], { label: 'GPT-SoVITS', voiceModes: ['clone'] }),
          speechModel('voxcpm2', [], { label: 'VoxCPM2', voiceModes: ['clone'], available: false }),
        ],
      };
    }
    if (p.providerId === 'elevenlabs') return { ...p, voiceClone: { requiresConsentClip: false } };
    return p;
  });
  providers.push({
    providerId: 'consent-co',
    kind: 'online',
    label: 'Consent Co',
    config: null,
    available: true,
    models: [],
    voiceClone: { requiresConsentClip: true },
  });
  return { ...v, synthesizeSpeech: { ...v.synthesizeSpeech, providers } };
}

describe('授权声明的语言', () => {
  it('官方表 30 种，代码不重复；英文推荐且实测能过，简体中文标着常验不过', () => {
    expect(CONSENT_PHRASES).toHaveLength(30);
    expect(new Set(CONSENT_PHRASES.map((p) => p.code)).size).toBe(30);
    expect(consentPhrase('en-US')).toMatchObject({ verified: true, recommended: true });
    expect(consentPhrase('zh-CN')).toMatchObject({ flaky: true });
    expect(consentPhrase('custom')).toBeNull();
    for (const p of CONSENT_PHRASES) expect(p.text.trim()).not.toBe('');
  });

  it('en-US 与 zh-CN 给芯片，其余 28 种进「更多语言」，按原表次序', () => {
    expect(CONSENT_COMMON).toEqual(['en-US', 'zh-CN']);
    const more = consentMore();
    expect(more).toHaveLength(28);
    expect(more.map((p) => p.code)).not.toContain('en-US');
    expect(more[0]!.code).toBe('en-GB');
    expect(more.at(-1)!.code).toBe('te-IN');
  });

  it('显示名按界面语言取；ar-XA 按阿拉伯语取', () => {
    expect(consentLanguageName('ja-JP', 'en')).toMatch(/Japanese/);
    expect(consentLanguageName('ar-XA', 'en')).toBe('Arabic');
    expect(consentLanguageName('de-DE', 'de')).toMatch(/Deutsch/);
  });
});

describe('录音门槛', () => {
  it('样本：5 秒以下不给存，10 秒以下只够本机，30 秒到顶', () => {
    expect(sampleVerdict(4.9)).toBe('short');
    expect(sampleVerdict(Number.NaN)).toBe('short');
    expect(sampleVerdict(5)).toBe('local');
    expect(sampleVerdict(12)).toBe('ok');
    expect(sampleVerdict(30)).toBe('best');
  });

  it('授权声明：3 秒以下算没念完', () => {
    expect(consentTooShort(2.9)).toBe(true);
    expect(consentTooShort(3)).toBe(false);
  });

  it('计时器写成 mm:ss.s', () => {
    expect(clock(0)).toBe('00:00.0');
    expect(clock(7.94)).toBe('00:07.9');
    expect(clock(30)).toBe('00:30.0');
  });

  it('样本的台词：界面语言有台词时念它，没有时用表里第一门', () => {
    expect(defaultScriptLanguage('de-DE')).toBe('de');
    expect(defaultScriptLanguage('xx')).toBe(scriptFirst());
    expect(sampleScript('en').length).toBeGreaterThan(1);
  });
});

function scriptFirst(): string {
  return defaultScriptLanguage('zz-ZZ');
}

describe('克隆去哪些模型', () => {
  it('本机装好的、能克隆的模型 + 能克隆的云端；没装的不列', () => {
    const targets = cloneTargets(view());
    expect(targets.map((t) => `${t.kind}:${t.id}`)).toEqual([
      'local:qwen3-tts-0.6b-base',
      'local:gpt-sovits-v2',
      'cloud:elevenlabs',
      'cloud:consent-co',
    ]);
    expect(targets.find((t) => t.id === 'elevenlabs')).toMatchObject({ consent: false, connected: false });
    expect(targets.find((t) => t.id === 'consent-co')).toMatchObject({ consent: true, connected: true });
    expect(cloneTargets(null)).toEqual([]);
  });

  it('默认选上本机全部与连着的云端；从模型页过来时加上那一只', () => {
    const targets = cloneTargets(view());
    expect(defaultPicked(targets, null)).toEqual(['qwen3-tts-0.6b-base', 'gpt-sovits-v2', 'consent-co']);
    expect(defaultPicked(targets, 'elevenlabs')).toContain('elevenlabs');
  });

  it('选法按当下的模型现算：点过的以点的为准，晚到的模型照默认选上', () => {
    const targets = cloneTargets(view());
    const late = [...targets, { ...targets[0]!, id: 'qwen3-tts-1.7b-base', name: 'Qwen3-TTS 1.7B Base' }];
    expect(defaultPicked(late, 'qwen3-tts-1.7b-base')).toContain('qwen3-tts-1.7b-base');
    const toggled = { 'gpt-sovits-v2': false, elevenlabs: true };
    expect(defaultPicked(late, null, toggled)).toEqual(['qwen3-tts-0.6b-base', 'elevenlabs', 'consent-co', 'qwen3-tts-1.7b-base']);
    expect(defaultPicked(late, 'qwen3-tts-1.7b-base', { 'qwen3-tts-1.7b-base': false })).not.toContain('qwen3-tts-1.7b-base');
  });

  it('新音色的默认名字：重名时依次加编号', () => {
    expect(defaultVoiceName('我的声音', [])).toBe('我的声音');
    expect(defaultVoiceName('我的声音', ['千问', '我的声音'])).toBe('我的声音 2');
    expect(defaultVoiceName('我的声音', ['我的声音', '我的声音 2', '我的声音 3 '])).toBe('我的声音 4');
  });

  it('步骤：选中的里有要授权声明录音的才有那一步，点名谁要', () => {
    const targets = cloneTargets(view());
    const local = targets.filter((t) => t.kind === 'local');
    expect(cloneSteps(local).map((s) => s.key)).toEqual(['models', 'sample', 'save']);
    const withConsent = cloneSteps(targets);
    expect(withConsent.map((s) => s.key)).toEqual(['models', 'sample', 'consent', 'save']);
    expect(withConsent[2]!.needed).toEqual(['Consent Co']);
  });

  it('克隆的 Provider 带上要不要授权声明录音', () => {
    expect(cloneProviders(view())).toEqual([
      { providerId: 'elevenlabs', label: 'ElevenLabs', available: false, detail: '没有启用', requiresConsentClip: false },
      { providerId: 'consent-co', label: 'Consent Co', available: true, detail: null, requiresConsentClip: true },
    ]);
  });
});

describe('种子', () => {
  const targets: CloneTarget[] = [
    { kind: 'local', id: 'a', name: 'A', consent: false, connected: true, acceptsSeed: true },
    { kind: 'local', id: 'b', name: 'B', consent: false, connected: true, acceptsSeed: false },
    { kind: 'cloud', id: 'c', name: 'C', consent: false, connected: true, acceptsSeed: false },
  ];

  it('界面抽的种子在 1..2^31-1；只给收种子的本机引擎', () => {
    expect(randomSeed(() => 0)).toBe(1);
    expect(randomSeed(() => 0.999999999999)).toBe(2147483646);
    expect(initialSeeds(targets, () => 0.5)).toEqual({ a: 1073741824 });
  });

  it('取种子的次序：这只引擎的，其次兜底的，都没有时 null', () => {
    expect(seedFor({ seeds: { a: 5 }, seed: 9 }, 'a')).toBe(5);
    expect(seedFor({ seeds: { a: 5 }, seed: 9 }, 'b')).toBe(9);
    expect(seedFor({}, 'b')).toBeNull();
    expect(seedFor(null, 'a')).toBeNull();
  });

  it('换一颗只改那一只；* 换兜底的', () => {
    expect(reseeded({ seeds: { a: 1, b: 2 }, seed: 3 }, 'a', 7)).toEqual({ seeds: { a: 7, b: 2 }, seed: 3 });
    expect(reseeded({ seeds: { a: 1 } }, FALLBACK_SEED, 8)).toEqual({ seeds: { a: 1 }, seed: 8 });
    expect(reseeded({}, 'a', 4)).toEqual({ seeds: { a: 4 } });
  });

  it('⋯ 里能换种子的引擎：收种子的本机引擎，加上记着种子但已经不列的', () => {
    expect(reseedTargets({ seeds: { gone: 1 } }, targets)).toEqual(['a', 'gone']);
  });

  it('同一颗种子的几只引擎合在一起，兜底的在后', () => {
    expect(seedGroups({ seeds: { a: 5, b: 6, c: 5 }, seed: 6 })).toEqual([
      { value: 5, ids: ['a', 'c'] },
      { value: 6, ids: ['b', FALLBACK_SEED] },
    ]);
    expect(seedGroups({})).toEqual([]);
  });
});

describe('凭什么认人', () => {
  const clone = (voiceId: string, state: VoiceClone['state']): VoiceClone => ({
    voiceId,
    state,
    referenceHash: 'sha256:r',
    createdAt: '2026-10-14T00:00:00Z',
  });
  const voices = [
    { id: 'v1', content: { name: 'Me', seeds: { a: 11 }, seed: 12 }, clones: { elevenlabs: clone('test-voice-1', 'valid') } },
    { id: 'v2', content: { name: 'Host' }, clones: { elevenlabs: clone('test-voice-2', 'stale') } },
    { id: 'v3', content: { name: 'Other' } },
  ];

  it('云端各家的 voice id，有效的在前', () => {
    expect(voiceIdBindings({ x: clone('old', 'stale'), y: clone('new', 'valid') })).toEqual([
      { providerId: 'y', voiceId: 'new', stale: false },
      { providerId: 'x', voiceId: 'old', stale: true },
    ]);
  });

  it('模型页：本机列每只音色与它的种子，云端只列在这家建过克隆的', () => {
    expect(voicesBoundTo(voices, { kind: 'local', id: 'a' }).map((b) => [b.name, b.seed])).toEqual([
      ['Me', 11],
      ['Host', null],
      ['Other', null],
    ]);
    expect(voicesBoundTo(voices, { kind: 'local', id: 'z' })[0]!.seed).toBe(12);
    expect(voicesBoundTo(voices, { kind: 'cloud', id: 'elevenlabs' }).map((b) => [b.name, b.voiceId, b.stale])).toEqual([
      ['Me', 'test-voice-1', false],
      ['Host', 'test-voice-2', true],
    ]);
  });
});

describe('录音写成 WAV', () => {
  it('多声道取平均、截到上限', () => {
    const mono = downmix([new Float32Array([1, 1, 1, 1]), new Float32Array([0, 0, 0, 0])], 2, 1.5);
    expect([...mono]).toEqual([0.5, 0.5, 0.5]);
  });

  it('16 位单声道 WAV 的头与数据', () => {
    const bytes = encodeWav(new Float32Array([0, 1, -1]), 48_000);
    const text = (from: number, to: number) => String.fromCharCode(...bytes.slice(from, to));
    expect(text(0, 4)).toBe('RIFF');
    expect(text(8, 12)).toBe('WAVE');
    const view = new DataView(bytes.buffer);
    expect(view.getUint32(24, true)).toBe(48_000);
    expect(view.getUint16(22, true)).toBe(1);
    expect(view.getUint32(40, true)).toBe(6);
    expect(view.getInt16(46, true)).toBe(0x7fff);
    expect(view.getInt16(48, true)).toBe(-0x8000);
    expect(bytes.byteLength).toBe(50);
  });
});

describe('存下的请求', () => {
  const entry: VoiceEntry = {
    library: 'voices',
    id: 'voc_1',
    version: 4,
    contentHash: 'sha256:c',
    createdAt: '2026-10-01T00:00:00Z',
    updatedAt: '2026-10-02T00:00:00Z',
    content: {
      name: 'Me',
      language: 'en',
      transcript: 'hello',
      origin: 'recorded',
      consent: { declared: true, declaredAt: '2026-10-01T00:00:00Z', statement: 'mine' },
      reference: { fileName: 'reference.wav', mediaType: 'audio/wav', sha256: 'sha256:r', byteLength: 10 },
      seeds: { a: 1 },
      seed: 2,
    },
  } as VoiceEntry;

  it('克隆新音色：样本是参考录音，种子与授权声明录音一起交', () => {
    const request = captureVoiceRequest({
      name: ' Me ',
      language: 'en',
      transcript: 'line one',
      origin: 'recorded',
      consent: true,
      seeds: { a: 5 },
      samplePath: '/tmp/sample.wav',
      consentClip: { language: 'en-US', text: null, path: '/tmp/consent.wav' },
    });
    expect(request).toMatchObject({
      library: 'voices',
      source: { path: '/tmp/sample.wav' },
      consentSource: { path: '/tmp/consent.wav' },
      content: {
        name: 'Me',
        language: 'en',
        transcript: 'line one',
        origin: 'recorded',
        seeds: { a: 5 },
        consentClip: { language: 'en-US', text: null },
      },
    });
    const bare = captureVoiceRequest({
      name: 'Me',
      language: null,
      transcript: '',
      origin: 'imported',
      consent: true,
      seeds: {},
      samplePath: '/tmp/sample.wav',
      consentClip: null,
    });
    expect(bare).not.toHaveProperty('consentSource');
    expect(bare.content).not.toHaveProperty('seeds');
    expect(bare.content).not.toHaveProperty('consentClip');
  });

  it('补录授权声明与换种子：带版本号，别的不动', () => {
    expect(consentClipRequest(entry, { language: 'custom', text: 'I agree', path: '/tmp/c.wav' })).toMatchObject({
      id: 'voc_1',
      expectedVersion: 4,
      consentSource: { path: '/tmp/c.wav' },
      content: { name: 'Me', consent: { declared: true, statement: 'mine' }, consentClip: { language: 'custom', text: 'I agree' } },
    });
    const reseed = reseedRequest(entry, 'a', 9);
    expect(reseed).toMatchObject({ id: 'voc_1', expectedVersion: 4, content: { seeds: { a: 9 }, seed: 2 } });
    expect(reseed).not.toHaveProperty('source');
    expect(reseed.content).not.toHaveProperty('consentClip');
  });
});
