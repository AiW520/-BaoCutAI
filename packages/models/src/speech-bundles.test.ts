import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { ModelBundleStatus } from '@baocut/protocol';
import { BUNDLES, backendSupported } from './bundle-registry.ts';
import { localSpeechModelInfo, LOCAL_SPEECH_MAX_CHARS } from './local-speech.ts';
import { MANIFEST_FILE, ModelCatalog } from './model-catalog.ts';
import { REPO_MANIFESTS, repoManifestFor } from './repo-manifests.ts';
import { SPEECH_BUNDLES } from './speech-bundles.ts';
import { BUILTIN_VOICES } from './speech-voices.ts';

/** 本地语音合成模型包的登记（架构设计 §6.3）：每个模型包是 audio.cpp 的一个 Q8 GGUF，由内置引擎执行；许可随模型描述给出。 */

const EXPECTED_IDS = [
  'qwen3-tts-0.6b-base@audio-cpp-q8',
  'qwen3-tts-1.7b-base@audio-cpp-q8',
  'qwen3-tts-1.7b-customvoice@audio-cpp-q8',
  'qwen3-tts-1.7b-voicedesign@audio-cpp-q8',
  'indextts2@audio-cpp-q8',
  'index-tts2.5@audio-cpp-q8',
  'voxcpm2@audio-cpp-q8',
  'omnivoice@audio-cpp-q8',
  'fish-s2-pro@audio-cpp-q8',
];

const status = { detail: undefined } as unknown as ModelBundleStatus;
const def = (id: string) => SPEECH_BUNDLES.find((b) => b.bundleId === id)!;

describe('本地语音合成模型包的登记', () => {
  it('九个 audio.cpp 模型包都在总登记里，都是 synthesize；每个只有一个 tts 组件；不登记 AuK', () => {
    expect(SPEECH_BUNDLES.map((b) => b.bundleId)).toEqual(EXPECTED_IDS);
    for (const bundle of SPEECH_BUNDLES) {
      expect(BUNDLES).toContain(bundle);
      expect(bundle).toMatchObject({ capability: 'synthesize', backend: 'audio-cpp', device: 'auto' });
      expect(bundle.speech).toBeDefined();
      expect(bundle.license).toBeDefined();
      expect(bundle.label).toBeTruthy();
      expect(Object.keys(bundle.components)).toEqual(['tts']);
    }
    expect(JSON.stringify(BUNDLES).toLowerCase()).not.toMatch(/\bauk\b/);
    expect(new Set(BUNDLES.map((b) => b.bundleId)).size).toBe(BUNDLES.length);
  });

  it('每个组件都有内置清单：一个 GGUF，就是引擎要加载的文件；有 64 位十六进制 sha256 与正的大小', () => {
    const repos = new Set<string>();
    for (const bundle of SPEECH_BUNDLES) {
      const source = bundle.components.tts!;
      repos.add(source.repo);
      const manifest = repoManifestFor(source.repo, source.revision);
      expect(manifest, `${bundle.bundleId}（${source.repo}@${source.revision}）`).not.toBeNull();
      expect(manifest!.sourceRepo).toBe('audio-cpp/audio.cpp-gguf');
      expect(manifest!.files.map((f) => f.path)).toEqual([bundle.speech!.engine.file]);
      const [file] = manifest!.files;
      expect(file!.path).toMatch(/\.gguf$/);
      expect(file!.sha256).toMatch(/^[0-9a-f]{64}$/);
      expect(file!.size).toBeGreaterThan(0);
      expect(manifest!.estimatedBytes).toBe(file!.size);
    }
    // 各模型包各装各删，不共用仓库目录。
    expect(repos.size).toBe(SPEECH_BUNDLES.length);
    // 同一仓库版本只登记一次。
    const keys = REPO_MANIFESTS.map((m) => `${m.repo}@${m.revision}`);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('列出的语言都在引擎认得的语言里（请求的语言原样交给引擎）', () => {
    for (const bundle of SPEECH_BUNDLES) {
      const speech = bundle.speech!;
      if (speech.languages === 'any') continue;
      for (const language of speech.languages) expect(speech.engine.languages, `${bundle.bundleId}：${language}`).toContain(language);
    }
  });

  describe('目录里的状态', () => {
    let dir: string;
    beforeEach(async () => {
      dir = await fs.mkdtemp(path.join(os.tmpdir(), 'baocut-speech-bundles-'));
    });
    afterEach(async () => {
      await fs.rm(dir, { recursive: true, force: true });
    });

    it('哪个平台都列；没装时 not-installed，不与别的模型包共用组件；Model Worker 在不在与它无关', async () => {
      for (const [platform, arch] of [
        ['darwin', 'arm64'],
        ['win32', 'x64'],
        ['linux', 'arm64'],
      ] as const) {
        expect(backendSupported('audio-cpp', platform, arch)).toBe(true);
        const catalog = new ModelCatalog({ root: dir, platform, arch, workerAvailable: () => false });
        for (const id of EXPECTED_IDS) {
          const s = await catalog.status(id);
          expect(s, `${platform}/${arch} ${id}`).toMatchObject({ capability: 'synthesize', state: 'not-installed', backend: 'audio-cpp' });
          expect(s!.components!.map((c) => [c.component, c.sharedWith])).toEqual([['tts', []]]);
        }
      }
      const base = (await new ModelCatalog({ root: dir, platform: 'darwin', arch: 'arm64' }).status(EXPECTED_IDS[0]!))!;
      expect(base).toMatchObject({ label: 'Qwen3-TTS 0.6B Base', license: { commercialUse: true } });
    });

    it('权重齐了就 installed（引擎随应用内置）；找不到内置引擎时 unsupported', async () => {
      const omni = def('omnivoice@audio-cpp-q8');
      await writeRepo(dir, omni.components.tts!.repo, omni.components.tts!.revision, { [omni.speech!.engine.file]: 'gguf' });
      const catalog = new ModelCatalog({ root: dir, platform: 'win32', arch: 'x64', workerAvailable: () => false });
      expect(await catalog.status(omni.bundleId)).toMatchObject({ state: 'installed' });
      const noEngine = new ModelCatalog({ root: dir, platform: 'darwin', arch: 'arm64', engineAvailable: () => false });
      const unsupported = await noEngine.status(omni.bundleId);
      expect(unsupported).toMatchObject({ state: 'error', reason: 'unsupported' });
      expect(unsupported!.detail).toContain('audio.cpp');
    });

    it('常驻量按 GGUF 的存储字节估计：Apple Silicon 计在 GPU 内存，别的平台计在内存', async () => {
      const id = 'omnivoice@audio-cpp-q8';
      const gguf = repoManifestFor(def(id).components.tts!.repo, def(id).components.tts!.revision)!.estimatedBytes;
      const mac = await new ModelCatalog({ root: dir, platform: 'darwin', arch: 'arm64' }).workerFootprint(id);
      const win = await new ModelCatalog({ root: dir, platform: 'win32', arch: 'x64' }).workerFootprint(id);
      expect(mac).toMatchObject({ pool: 'gpuMemory' });
      expect(win).toMatchObject({ pool: 'memory' });
      expect(mac!.bytes).toBe(win!.bytes);
      expect(mac!.bytes).toBeGreaterThan(gguf);
      expect(mac!.bytes).toBeLessThan(gguf * 2);
    });
  });

  describe('模型描述', () => {
    const info = (id: string) => localSpeechModelInfo(def(id), status, true);

    it('OmniVoice 与 Fish 的许可不可商用，写在模型描述里；OmniVoice 能克隆、能按词表描述', () => {
      const omni = info('omnivoice@audio-cpp-q8');
      expect(omni.local!.license).toMatchObject({ name: 'CC-BY-NC-4.0', commercialUse: false });
      expect(omni.voiceModes).toEqual(['preset', 'clone', 'describe']);
      expect(omni.local!.voiceDescription).toMatchObject({ kind: 'vocabulary' });
      expect(omni.local!.maxDurationSec).toBe(60);
      const nonCommercial = ['omnivoice@audio-cpp-q8', 'fish-s2-pro@audio-cpp-q8'];
      for (const id of EXPECTED_IDS) expect(info(id).local!.license.commercialUse, id).toBe(!nonCommercial.includes(id));
    });

    it('CustomVoice 列出模型自己的说话人；克隆模型列出内置音色；VoiceDesign 的内置音色是描述', () => {
      const custom = info('qwen3-tts-1.7b-customvoice@audio-cpp-q8');
      expect(custom.voices.every((v) => v.source === 'model')).toBe(true);
      expect(custom.defaultVoice).toBe('Vivian');
      expect(custom.local!.builtinVoices).toBeNull();
      expect(custom.acceptsInstructions).toBe(true);

      const base = info('qwen3-tts-0.6b-base@audio-cpp-q8');
      expect(base.voices.map((v) => v.voiceId)).toEqual(BUILTIN_VOICES.map((v) => v.id));
      expect(base.local!.builtinVoices).toBe('reference');
      expect(base.voiceModes).toEqual(['preset', 'clone']);

      const design = info('qwen3-tts-1.7b-voicedesign@audio-cpp-q8');
      expect(design.local!.builtinVoices).toBe('description');
      expect(design.voiceModes).toEqual(['preset', 'describe']);

      for (const id of EXPECTED_IDS) {
        expect(info(id)).toMatchObject({ formats: ['wav'], defaultFormat: 'wav', cost: 'free-local', maxInputChars: LOCAL_SPEECH_MAX_CHARS });
      }
    });

    it('只有 IndexTTS 2.5 认读音标注；语速旋钮只在 IndexTTS 2.5 与 OmniVoice', () => {
      for (const id of EXPECTED_IDS) {
        expect(info(id).local!.readings, id).toBe(id === 'index-tts2.5@audio-cpp-q8' ? 'annotated' : 'unsupported');
        const speed = id === 'index-tts2.5@audio-cpp-q8' || id === 'omnivoice@audio-cpp-q8';
        expect(info(id).speedRange === null, id).toBe(!speed);
      }
    });

    it('不可用时带上原因', () => {
      const model = localSpeechModelInfo(SPEECH_BUNDLES[0]!, { detail: '没装' } as unknown as ModelBundleStatus, false);
      expect(model).toMatchObject({ available: false, detail: '没装' });
    });
  });
});

describe('Fish S2 Pro', () => {
  it('克隆按 audio.cpp 的 clon 任务；带参考录音必须给原文，参考至多 30 秒；研究许可', () => {
    const fish = def('fish-s2-pro@audio-cpp-q8');
    expect(fish.speech).toMatchObject({
      engine: { family: 'fish_audio', task: 'clon' },
      sampleRate: 44_100,
      voiceModes: ['preset', 'clone'],
      reference: { requiresTranscript: true, withTranscriptSeconds: [0, 30] },
      instructions: null,
      knobs: {},
    });
    expect(fish.license!.commercialUse).toBe(false);
  });
});

/** 在模型目录里写一个合成的仓库：几个小文件和与之相符的清单。 */
async function writeRepo(root: string, repo: string, revision: string, files: Record<string, string>): Promise<void> {
  const dir = path.join(root, ...repo.split('/'));
  const entries = [];
  for (const [name, content] of Object.entries(files)) {
    await fs.mkdir(path.dirname(path.join(dir, name)), { recursive: true });
    await fs.writeFile(path.join(dir, name), content);
    entries.push({
      path: name,
      size: Buffer.byteLength(content),
      sha256: crypto.createHash('sha256').update(content).digest('hex'),
      source_verified: true,
    });
  }
  await fs.writeFile(
    path.join(dir, MANIFEST_FILE),
    JSON.stringify({ format_version: 1, repo, revision, source: 'https://huggingface.co', files: entries }),
  );
}
