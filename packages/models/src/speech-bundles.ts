import type { ModelLicense, SpeechVoiceDescription } from '@baocut/protocol';
import { ModelsSpeechBundles as M } from '@baocut/protocol/messages/models/speech-bundles.ts';
import type { BundleComponentSource, BundleDefinition, SpeechBundleProfile } from './bundle-registry.ts';
import { OMNIVOICE_LANGUAGES } from './omnivoice-languages.ts';
import type { ModelFamily } from './worker-contract.ts';

/**
 * 本地语音合成的模型包（架构设计 §6.3）。`bundleId` 是 `<模型>@<backend>-<量化>`，模型名与原型的合成模型表一致。
 *
 * 权重是 audio.cpp 发布的 Q8 GGUF（上游一个大仓库 `audio-cpp/audio.cpp-gguf` 的子目录，每个模型一个 GGUF：主模型、编解码器或
 * 声码器、分词器与模型规格都在里面）。各模型包在模型目录里登记成兄弟目录（`audio-cpp/audio.cpp-gguf-<模型>`），只下载自己那个
 * GGUF（`repo-manifests.ts`），各装各删。执行它们的是内置 audio.cpp 引擎的常驻服务（`audiocpp_server`，与本地音乐共用一个引擎，
 * 见 `audio-cpp-engine.ts`），不经 Model Worker；请求的换算在 `local-speech.ts`。
 *
 * 引擎按构建选设备（macOS 上 Metal，Windows 与 Linux 是 Vulkan 或 CPU），所以登记的 `device` 是 `auto`；全平台列出，主机没有内置
 * 引擎时模型包报告为 `unsupported`。
 */

/** GGUF 仓库的固定版本（`audio-cpp/audio.cpp-gguf`）。 */
const GGUF_REVISION = 'f861648c0c1f4da9f18e9a0ce5e217b0679bb2f5';

/** 一个模型包的 `tts` 组件：模型目录里的兄弟目录（`repo-manifests.ts` 登记了它的上游仓库与文件）。 */
function gguf(family: ModelFamily, name: string): BundleComponentSource {
  return { family, repo: `audio-cpp/audio.cpp-gguf-${name}`, revision: GGUF_REVISION };
}

const QWEN3_TTS_LANGUAGES = ['zh', 'en', 'ja', 'ko', 'de', 'fr', 'es', 'it', 'pt', 'ru'];
/** Qwen3-TTS CustomVoice 的九个说话人（0.6B 与 1.7B 同一张表）；名字是权重里的标识，不翻译。 */
export const QWEN3_TTS_SPEAKERS = ['Vivian', 'Serena', 'Uncle_Fu', 'Dylan', 'Eric', 'Ryan', 'Aiden', 'Ono_Anna', 'Sohee'];

/** 克隆的参考录音建议 3–15 秒（Fish 以外能克隆的引擎共用）。 */
const REFERENCE_SECONDS: [number, number] = [3, 15];

/** OmniVoice 按描述造声的封闭词表：每类至多一项；同一类各语言的词条按下标对应。 */
// i18n-ignore-start: 交给模型的声音描述词表（各语言的词条原样传给 OmniVoice）
export const OMNIVOICE_VOCABULARY: SpeechVoiceDescription = {
  kind: 'vocabulary',
  categories: [
    { category: 'gender', terms: { en: ['male', 'female'], zh: ['男', '女'] } },
    {
      category: 'age',
      terms: { en: ['child', 'teenager', 'young adult', 'middle-aged', 'elderly'], zh: ['儿童', '少年', '青年', '中年', '老年'] },
    },
    {
      category: 'pitch',
      terms: {
        en: ['very low pitch', 'low pitch', 'moderate pitch', 'high pitch', 'very high pitch'],
        zh: ['极低音调', '低音调', '中音调', '高音调', '极高音调'],
      },
    },
    { category: 'style', terms: { en: ['whisper'], zh: ['耳语'] } },
    {
      category: 'accent',
      terms: {
        en: [
          'american accent',
          'british accent',
          'australian accent',
          'chinese accent',
          'canadian accent',
          'indian accent',
          'korean accent',
          'portuguese accent',
          'russian accent',
          'japanese accent',
        ],
      },
    },
    {
      category: 'dialect',
      terms: {
        zh: ['河南话', '陕西话', '四川话', '贵州话', '云南话', '桂林话', '济南话', '石家庄话', '甘肃话', '宁夏话', '青岛话', '东北话'],
      },
    },
  ],
};
// i18n-ignore-end

const QWEN3_TTS_LICENSE: ModelLicense = {
  name: 'Apache-2.0',
  url: 'https://huggingface.co/Qwen/Qwen3-TTS-12Hz-1.7B-Base',
  commercialUse: true,
  // 许可摘要给人看：用 getter，读的时候（列出状态、序列化过线）按当前语言生成。
  get summary() {
    return M.qwen3TtsLicense().text;
  },
};
const INDEX_TTS2_LICENSE: ModelLicense = {
  name: 'bilibili Model Use License Agreement',
  url: 'https://huggingface.co/IndexTeam/IndexTTS-2/blob/main/LICENSE.txt',
  commercialUse: true,
  get summary() {
    return M.indexTts2License().text;
  },
};
const INDEX_TTS25_LICENSE: ModelLicense = {
  name: 'bilibili Model Use License Agreement',
  url: 'https://huggingface.co/IndexTeam/IndexTTS-2.5/blob/main/LICENSE',
  commercialUse: true,
  get summary() {
    return M.indexTts25License().text;
  },
};

/** audio.cpp 执行，设备由引擎按构建选。 */
const AUDIO_CPP = { backend: 'audio-cpp', device: 'auto', capability: 'synthesize' } as const;

/**
 * 长文按句切块的上限（字符，引擎的 `text_chunk_size`）。Qwen3-TTS（上游默认 8192）与 IndexTTS2（上游默认不切）几乎一次吃下整段，
 * 自回归的 token 上限会截掉长段的结尾，所以取几句话的长度；VoxCPM2 取上游默认（2048）的一小段，理由相同。Fish 用上游默认
 * （200），OmniVoice 由引擎按时长自动切，都不给。
 */
const QWEN3_TTS_CHUNK = 150;
const INDEX_TTS2_CHUNK = 120;
const VOXCPM2_CHUNK = 300;

function qwen3(
  bundleId: string,
  label: string,
  name: string,
  file: string,
  variant: 'base' | 'customvoice' | 'voicedesign',
  slow: boolean,
  license: ModelLicense = QWEN3_TTS_LICENSE,
): BundleDefinition {
  const common = {
    family: 'qwen3-tts',
    engine: { family: 'qwen3_tts', file, chunkSize: QWEN3_TTS_CHUNK, languages: QWEN3_TTS_LANGUAGES },
    languages: QWEN3_TTS_LANGUAGES,
    emotion: false,
    knobs: {},
    maxDurationSec: null,
    acceptsSeed: true,
    // 引擎不认读音标注：按表面文字合成，报告没念的标注。
    readings: 'unsupported',
    sampleRate: 24_000,
    slow,
  } as const;
  const speech: SpeechBundleProfile =
    variant === 'customvoice'
      ? {
          ...common,
          voiceModes: ['preset'],
          presets: 'model',
          speakers: QWEN3_TTS_SPEAKERS,
          reference: null,
          voiceDescription: null,
          instructions: 'style',
        }
      : variant === 'voicedesign'
        ? {
            ...common,
            voiceModes: ['preset', 'describe'],
            presets: 'builtin-description',
            reference: null,
            voiceDescription: { kind: 'free' },
            instructions: null,
          }
        : {
            ...common,
            voiceModes: ['preset', 'clone'],
            presets: 'builtin-reference',
            reference: { recommendedSeconds: REFERENCE_SECONDS, withTranscriptSeconds: null, acceptsTranscript: true },
            voiceDescription: null,
            instructions: null,
          };
  return { bundleId, label, ...AUDIO_CPP, components: { tts: gguf('qwen3-tts', name) }, license, speech };
}

export const SPEECH_BUNDLES: readonly BundleDefinition[] = [
  qwen3(
    'qwen3-tts-0.6b-base@audio-cpp-q8',
    'Qwen3-TTS 0.6B Base',
    'qwen3-tts-0.6b-base',
    'Qwen3-TTS-12Hz-0.6B-Base-GGUF/qwen3-tts-12hz-0.6b-base-q8_0.gguf',
    'base',
    false,
  ),
  qwen3(
    'qwen3-tts-1.7b-base@audio-cpp-q8',
    'Qwen3-TTS 1.7B Base',
    'qwen3-tts-1.7b-base',
    'Qwen3-TTS-12Hz-1.7B-Base-GGUF/qwen3-tts-12hz-1.7b-base-q8_0_v2.gguf',
    'base',
    true,
  ),
  qwen3(
    'qwen3-tts-1.7b-customvoice@audio-cpp-q8',
    'Qwen3-TTS 1.7B CustomVoice',
    'qwen3-tts-1.7b-customvoice',
    'Qwen3-TTS-12Hz-1.7B-CustomVoice-GGUF/qwen3-tts-12hz-1.7b-customvoice-q8_0.gguf',
    'customvoice',
    true,
  ),
  qwen3(
    'qwen3-tts-1.7b-voicedesign@audio-cpp-q8',
    'Qwen3-TTS 1.7B VoiceDesign',
    'qwen3-tts-1.7b-voicedesign',
    'Qwen3-TTS-12Hz-1.7B-VoiceDesign-GGUF/qwen3-tts-12hz-1.7b-voicedesign-q8_0.gguf',
    'voicedesign',
    true,
    { ...QWEN3_TTS_LICENSE, url: 'https://huggingface.co/Qwen/Qwen3-TTS-12Hz-1.7B-VoiceDesign' },
  ),
  {
    bundleId: 'indextts2@audio-cpp-q8',
    label: 'IndexTTS2',
    ...AUDIO_CPP,
    components: { tts: gguf('indextts2', 'indextts2') },
    license: INDEX_TTS2_LICENSE,
    speech: {
      family: 'indextts2',
      engine: { family: 'index_tts2', file: 'IndexTTS2-GGUF/index-tts2-q8_0.gguf', chunkSize: INDEX_TTS2_CHUNK, languages: ['zh', 'en'] },
      languages: 'any',
      voiceModes: ['preset', 'clone'],
      presets: 'builtin-reference',
      // IndexTTS 只从参考录音取音色，不读原文。
      reference: { recommendedSeconds: REFERENCE_SECONDS, withTranscriptSeconds: null, acceptsTranscript: false },
      voiceDescription: null,
      instructions: null,
      emotion: true,
      knobs: {},
      maxDurationSec: null,
      acceptsSeed: true,
      readings: 'unsupported',
      sampleRate: 22_050,
      slow: false,
    },
  },
  {
    bundleId: 'index-tts2.5@audio-cpp-q8',
    label: 'IndexTTS 2.5',
    ...AUDIO_CPP,
    // GGUF 里同时有 2.5 的主模型与它用到的 IndexTTS2 辅助权重（w2v-BERT、CAM++、BigVGAN）。
    components: { tts: gguf('indextts2.5', 'indextts2.5') },
    license: INDEX_TTS25_LICENSE,
    speech: {
      family: 'indextts2',
      engine: {
        family: 'index_tts2',
        file: 'IndexTTS2.5-GGUF/index-tts2_5-q8_0.gguf',
        chunkSize: INDEX_TTS2_CHUNK,
        languages: ['zh', 'en', 'ja', 'es', 'ar'],
      },
      languages: ['zh', 'en', 'ja', 'es', 'ar'],
      voiceModes: ['preset', 'clone'],
      presets: 'builtin-reference',
      reference: { recommendedSeconds: REFERENCE_SECONDS, withTranscriptSeconds: null, acceptsTranscript: false },
      voiceDescription: null,
      instructions: null,
      emotion: true,
      // 语速按倍率缩放目标时长（引擎的 `duration_scale` 是它的倒数）。
      knobs: { speed: { min: 0.5, max: 1.5, step: 0.05, default: 1 } },
      maxDurationSec: null,
      acceptsSeed: true,
      // 引擎直接认 `<字|拼音>`。
      readings: 'annotated',
      sampleRate: 22_050,
      slow: false,
    },
  },
  {
    bundleId: 'voxcpm2@audio-cpp-q8',
    label: 'VoxCPM2',
    ...AUDIO_CPP,
    components: { tts: gguf('voxcpm2', 'voxcpm2') },
    license: {
      name: 'Apache-2.0',
      url: 'https://huggingface.co/openbmb/VoxCPM2',
      commercialUse: true,
      get summary() {
        return M.voxcpm2License().text;
      },
    },
    speech: {
      family: 'voxcpm2',
      engine: { family: 'voxcpm2', file: 'VoxCPM2-GGUF/voxcpm2-q8_0.gguf', chunkSize: VOXCPM2_CHUNK },
      languages: 'any',
      voiceModes: ['preset', 'clone'],
      presets: 'builtin-reference',
      reference: { recommendedSeconds: REFERENCE_SECONDS, withTranscriptSeconds: null, acceptsTranscript: true },
      voiceDescription: null,
      // 风格说明接在正文前（`(说明)正文`）。
      instructions: 'style',
      emotion: false,
      knobs: { cfg: { min: 1, max: 3, step: 0.1, default: 2 }, steps: { min: 1, max: 50, step: 1, default: 10 } },
      maxDurationSec: null,
      acceptsSeed: true,
      readings: 'unsupported',
      sampleRate: 48_000,
      slow: false,
    },
  },
  {
    bundleId: 'omnivoice@audio-cpp-q8',
    label: 'OmniVoice',
    ...AUDIO_CPP,
    components: { tts: gguf('omnivoice', 'omnivoice') },
    license: {
      name: 'CC-BY-NC-4.0',
      url: 'https://huggingface.co/k2-fsa/OmniVoice',
      commercialUse: false,
      get summary() {
        return M.omnivoiceLicense().text;
      },
    },
    speech: {
      family: 'omnivoice',
      engine: { family: 'omnivoice', file: 'OmniVoice-GGUF/omnivoice-q8_0.gguf', languages: OMNIVOICE_LANGUAGES },
      languages: 'any',
      voiceModes: ['preset', 'clone', 'describe'],
      presets: 'builtin-reference',
      reference: { recommendedSeconds: REFERENCE_SECONDS, withTranscriptSeconds: null, acceptsTranscript: true },
      voiceDescription: OMNIVOICE_VOCABULARY,
      instructions: null,
      emotion: false,
      knobs: {
        speed: { min: 0.5, max: 1.5, step: 0.05, default: 1 },
        cfg: { min: 0, max: 4, step: 0.1, default: 2 },
        steps: { min: 4, max: 64, step: 1, default: 32 },
      },
      maxDurationSec: 60,
      acceptsSeed: true,
      readings: 'unsupported',
      sampleRate: 24_000,
      slow: false,
    },
  },
  {
    bundleId: 'fish-s2-pro@audio-cpp-q8',
    label: 'Fish Audio S2 Pro',
    ...AUDIO_CPP,
    components: { tts: gguf('fish-s2-pro', 'fish-s2-pro') },
    license: {
      name: 'Fish Audio Research License',
      url: 'https://huggingface.co/fishaudio/s2-pro/blob/main/LICENSE.md',
      commercialUse: false,
      get summary() {
        return M.fishS2ProLicense().text;
      },
    },
    speech: {
      family: 'fish-s2-pro',
      engine: { family: 'fish_audio', task: 'clon', file: 'Fish-Audio-S2-Pro-GGUF/fish-audio-s2-pro-q8_0.gguf' },
      languages: 'any',
      voiceModes: ['preset', 'clone'],
      presets: 'builtin-reference',
      // 带参考录音时必须给原文；参考至多 30 秒。
      reference: { recommendedSeconds: [10, 30], withTranscriptSeconds: [0, 30], acceptsTranscript: true, requiresTranscript: true },
      voiceDescription: null,
      instructions: null,
      emotion: false,
      knobs: {},
      maxDurationSec: null,
      acceptsSeed: true,
      readings: 'unsupported',
      sampleRate: 44_100,
      slow: true,
    },
  },
];
