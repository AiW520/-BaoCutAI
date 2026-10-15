// Google Gemini 语音合成适配器（架构设计 §6.4）。2026-10-15 读过的文档：
//   https://ai.google.dev/gemini-api/docs/speech-generation
//   https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash-tts
//   https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash-lite-tts
//   https://ai.google.dev/api/interactions-api
//   https://ai.google.dev/api/voices
// 文档确认的：`POST {base}/interactions`，请求头 `x-goog-api-key`；`input: [{ type: 'user_input', content: [{ type: 'text',
// text, annotations: [{ type: 'speech_metadata', style }] }] }]`——3.8 把 `text` 当逐字稿念，语气要写进 `style`（对应我们的
// `instructions`）；单人时 `generation_config.speech_config: [{ voice }]`，`voice` 可以是 30 个预置音色的名字或自定义音色
// （`voice_…`、`voicekey_…`）；`response_format: { type: 'audio', mime_type: 'audio/wav' }` 返回带 RIFF 头的 WAV（24 kHz、
// 单声道、16 位），结果在 `steps[]` 里 `type: 'model_output'` 的 `content[]`，音频块 `{ type: 'audio', data（base64）}`；
// `store` 默认 true（服务端保留交互），我们传 false；语言自动识别（Flash 130 种、Flash-Lite 101 种，文档只列名字）；
// 输入上限 8,192 token、输出上限 16,384 token（音频按 25 token/秒，约 655 秒）；`GET {base}/models` 会列出 TTS 模型。
// 没能确认的：`audio/mp3`（Interactions 的枚举里有，TTS 指南的格式表没列，所以只出 WAV）；`generation_config.seed` 与
// `languageCode` 对 TTS 是否生效（不开放 seed，不发语言）；语速参数（没有，speed 为 null）；单次字符上限（按输出上限折算：
// 中文约每秒 4–5 字，2,000 字约 400–500 秒，留出余量，与参考脚本的默认分段一致）。
import { ProviderFailure } from '@baocut/models';
import type { SpeechModelInfo } from '@baocut/protocol';
import {
  generationTimeoutMs,
  type AdapterConfig,
  type SpeechAdapter,
  type SpeechOutput,
  type SpeechRequest,
} from '../adapter.ts';
import { providerFetch } from '../http/provider-fetch.ts';
import { classifyGoogle, GOOGLE_API_REVISION, googleAuthOf, googleHttpOptions } from './google-adapter.ts';
import { ProvidersHttp as PH } from '@baocut/protocol/messages/providers';

const LABEL = 'Google Gemini';

/** 30 个预置音色（文档的顺序）。 */
const PRESET_VOICES = [
  'Zephyr',
  'Puck',
  'Charon',
  'Kore',
  'Fenrir',
  'Leda',
  'Orus',
  'Aoede',
  'Callirrhoe',
  'Autonoe',
  'Enceladus',
  'Iapetus',
  'Umbriel',
  'Algieba',
  'Despina',
  'Erinome',
  'Algenib',
  'Rasalgethi',
  'Laomedeia',
  'Achernar',
  'Alnilam',
  'Schedar',
  'Gacrux',
  'Pulcherrima',
  'Achird',
  'Zubenelgenubi',
  'Vindemiatrix',
  'Sadachbia',
  'Sadaltager',
  'Sulafat',
];

const BASE = {
  voices: PRESET_VOICES.map((voiceId) => ({ voiceId, label: voiceId })),
  defaultVoice: 'Kore',
  voiceModes: ['preset', 'custom'],
  languages: 'any',
  maxInputChars: 2_000,
  formats: ['wav'],
  defaultFormat: 'wav',
  acceptsInstructions: true,
  speedRange: null,
  acceptsSeed: false,
  cost: 'unknown',
} satisfies Partial<SpeechModelInfo>;

const MODELS: SpeechModelInfo[] = [
  { ...BASE, modelId: 'gemini-3.8-flash-tts', label: 'Gemini 3.8 Flash TTS', default: true },
  { ...BASE, modelId: 'gemini-3.8-flash-lite-tts', label: 'Gemini 3.8 Flash-Lite TTS' },
];

export class GoogleSpeechAdapter implements SpeechAdapter {
  readonly version = 'baocut-providers/google-speech@1';

  models(_config: AdapterConfig): SpeechModelInfo[] {
    return structuredClone(MODELS);
  }

  async synthesize(request: SpeechRequest): Promise<SpeechOutput> {
    const { config, model, parameters } = request;
    if (parameters.format !== 'wav') {
      throw new ProviderFailure('rejected', PH.formatUnsupported({ label: LABEL, format: parameters.format }).text, { code: 'PROVIDER_REJECTED' });
    }
    const style = parameters.instructions?.trim();
    const body = JSON.stringify({
      model: model.modelId,
      input: [
        {
          type: 'user_input',
          content: [{ type: 'text', text: parameters.text, ...(style ? { annotations: [{ type: 'speech_metadata', style }] } : {}) }],
        },
      ],
      response_format: { type: 'audio', mime_type: 'audio/wav' },
      generation_config: { speech_config: [{ voice: parameters.voice }] },
      store: false,
    });
    const response = await providerFetch(googleHttpOptions(config, request.http), {
      method: 'POST',
      url: `${config.baseUrl}/interactions`,
      headers: { 'content-type': 'application/json', 'api-revision': GOOGLE_API_REVISION },
      auth: googleAuthOf(config),
      body: () => body,
      timeoutMs: generationTimeoutMs(request.http),
      signal: request.signal,
      classify: classifyGoogle,
    });
    return parseSpeechInteraction(response.json());
  }
}

/** 取 `model_output` step 里的最后一段音频；要的是 WAV，所以不是 RIFF 开头的按协议错误处理（不自己补头）。 */
export function parseSpeechInteraction(value: unknown): SpeechOutput {
  if (!isObject(value)) throw new ProviderFailure('protocol', PH.notObject({ label: LABEL }).text);
  if (value.status === 'failed' || value.status === 'cancelled') {
    throw new ProviderFailure('rejected', PH.generateIncomplete({ label: LABEL, status: String(value.status) }).text, { code: 'PROVIDER_REJECTED' });
  }
  let found: Record<string, unknown> | null = null;
  for (const step of arrayOf(value.steps)) {
    if (step.type !== 'model_output') continue;
    for (const content of arrayOf(step.content)) {
      if (content.type === 'audio' && typeof content.data === 'string' && content.data) found = content;
    }
  }
  const bytes = found ? Buffer.from(found.data as string, 'base64') : Buffer.alloc(0);
  if (bytes.length === 0) throw new ProviderFailure('protocol', PH.emptyAudio({ label: LABEL }).text);
  if (bytes.subarray(0, 4).toString('latin1') !== 'RIFF') {
    const got = typeof found?.mime_type === 'string' && found.mime_type ? found.mime_type : 'audio/l16';
    throw new ProviderFailure('protocol', PH.wrongMime({ label: LABEL, got, want: 'audio/wav' }).text);
  }
  return { bytes, ...(value.usage !== undefined ? { usage: value.usage } : {}) };
}

function arrayOf(value: unknown): Array<Record<string, unknown>> {
  return Array.isArray(value) ? value.filter(isObject) : [];
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
