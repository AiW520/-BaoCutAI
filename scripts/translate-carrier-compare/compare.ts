/**
 * rows vs lines/1：用生产的 `runSpeechTranslate`（packages/jobs 源码）与编好的 speech-worker，把 extract.py 导出的转写各按两种载体翻一遍，
 * 记下 report.json、译文的对齐器分布与每次调用。用法见同目录 README。
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

import {
  resolveSpeechWorkerCommand,
  runSpeechTranslate,
  type SpeechTranslateResult,
} from '../../packages/jobs/src/pipelines/speech-worker.ts';
import { fakeSpeechAnswer, speechRequestKind } from '../../packages/jobs/src/testing/fake-speech-model.ts';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

const { values } = parseArgs({
  options: {
    corpus: { type: 'string' },
    out: { type: 'string' },
    generator: { type: 'string', default: 'echo' },
    fusion: { type: 'string', default: 'rows,lines' },
    videos: { type: 'string' },
    perturb: { type: 'string', default: 'none' },
    'max-words': { type: 'string' },
    worker: { type: 'string' },
    provider: { type: 'string' },
    model: { type: 'string' },
    'max-output-tokens': { type: 'string', default: '32000' },
    replay: { type: 'string' },
    'page-words': { type: 'string' },
    'base-url': { type: 'string' },
    'key-env': { type: 'string' },
    thinking: { type: 'string' },
    'reasoning-effort': { type: 'string' },
  },
});
if (!values.corpus || !values.out) throw new Error('--corpus <dir> and --out <dir> are required');
if (values.generator === 'runtime' && (!values.provider || !values.model))
  throw new Error('--generator runtime needs --provider and --model');
if (values.generator === 'replay' && !values.replay) throw new Error('--generator replay needs --replay <earlier --out>');
if (values.generator === 'direct' && (!values['base-url'] || !values['key-env'] || !values.model))
  throw new Error('--generator direct needs --base-url, --key-env and --model');
const worker = values.worker ?? resolveSpeechWorkerCommand(null);
if (!worker) throw new Error('speech-worker not found: cargo build -p speech-worker, or pass --worker');
const out = values.out;
// 这次运行的模型配置，写进每条调用与汇总，免得不同配置的结果混在一起。
const arm = {
  generator: values.generator,
  model: values.model ?? null,
  thinking: values.thinking ?? null,
  reasoningEffort: values['reasoning-effort'] ?? null,
  maxOutputTokens: Number(values['max-output-tokens']),
  pageWords: values['page-words'] ? Number(values['page-words']) : null,
};
fs.mkdirSync(out, { recursive: true });
const fusions = values.fusion!.split(',') as Array<'rows' | 'lines'>;
const only = values.videos ? new Set(values.videos.split(',')) : null;
const maxWords = values['max-words'] ? Number(values['max-words']) : Infinity;

// 回声答案的填充文本：mulberry32 伪随机。线性同余的低位周期很短，会写出 `kaka kaka …`，被核心当占位译文拒收。
let seed = 12345;
const next = () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return (t ^ (t >>> 14)) >>> 0;
};
const CJK_POOL =
  '我们今天讨论人工智能硬件软件系统模型未来发展合作研究团队世界实验室空间理解图像生成视频数据计算平台产品用户市场经济社会文化历史教育科学技术工程设计管理服务资源环境能源交通城市农村健康医疗安全法律政策';
const SYLLABLES = ['ka', 'lo', 'mi', 're', 'su', 'ta', 'no', 'vi', 'de', 'po', 'ri', 'ga', 'ne', 'bu', 'si', 'mo'];

/** 长度与 `size` 个源词成比例的填充（中日韩目标约 1.6 字/词，其他约 1 词/词；中日韩源按字数的一半算词）。 */
function filler(size: number, cjkTarget: boolean, cjkSource: boolean): string {
  const n = cjkTarget ? Math.max(2, Math.round(size * 1.6)) : Math.max(1, Math.round(size * (cjkSource ? 0.5 : 1)));
  const words: string[] = [];
  for (let i = 0; i < n; i++) {
    if (cjkTarget) words.push(CJK_POOL[next() % CJK_POOL.length]!);
    else words.push(Array.from({ length: 2 + (next() % 2) }, () => SYLLABLES[next() % SYLLABLES.length]).join(''));
  }
  return words.join(cjkTarget ? '' : ' ');
}

/** 引用里的一个原词：去掉页里的转义，再按 `lines/1` 引用的规矩转义。 */
function quoted(word: string): string {
  return word.replace(/\\(.)/g, '$1').replace(/[\\|⏸¦.∅?]/g, '\\$&');
}

/** 两种载体同一规则的回声答案：rows 按 `data-align-groups` 每组一块，lines 按 `¦` 每片一块。别的请求交给测试假模型。 */
function echoAnswer(user: string, kind: string, cjkSource: boolean): string {
  if (kind === 'translate-lines') {
    const cjk = /^! format=lines\/1 .*target=(zh|ja|ko)/m.test(user);
    const lines: string[] = [];
    for (const line of user.split('\n')) {
      const match = /^(\d+) (.*)$/.exec(line);
      if (!match) continue;
      const source = match[2]!
        .split(/\s+/)
        .filter((t) => t && !t.startsWith('≤') && !t.startsWith('≥') && t !== '⏸')
        .join(' ');
      const chunks = source.split('¦').flatMap((piece) => {
        const words = piece.trim().split(/\s+/).filter(Boolean);
        if (words.length === 0) return [];
        const size = cjkSource ? [...piece.replace(/\s+/g, '')].length / 2 : words.length;
        const quote = words.length === 1 ? quoted(words[0]!) : `${quoted(words[0]!)}..${quoted(words.at(-1)!)}`;
        return [`|${quote}|${filler(size, cjk, cjkSource)}`];
      });
      lines.push(`${match[1]} ${chunks.join('')}${cjk ? '。' : '.'}`);
    }
    return lines.join('\n');
  }
  if (kind === 'translate') {
    const cjk = /data-target="(zh|ja|ko)/.test(user);
    const stop = cjk ? '。' : '.';
    let html = '<article>';
    for (const section of user.matchAll(/<section id="([^"]+)"[^>]*>([\s\S]*?)<\/section>/g)) {
      html += `<section id="${section[1]}">`;
      for (const p of section[2]!.matchAll(/<p ([^>]*)>([\s\S]*?)<\/p>/g)) {
        const attrs = p[1]!;
        if (/data-editable="false"/.test(attrs)) continue;
        const id = /id="([^"]+)"/.exec(attrs)![1];
        const groups = /data-align-groups="([^"]+)"/.exec(attrs)?.[1];
        const words = /data-align-words="([^"]+)"/.exec(attrs)?.[1];
        const tokens = words
          ? words
              .split(/\[\d+\]/)
              .slice(1)
              .map((t) => t.trim())
          : [];
        const span = (a: number, b: number) =>
          cjkSource ? tokens.slice(a - 1, b).reduce((sum, t) => sum + [...t].length, 0) / 2 : b - a + 1;
        const spans: Array<[string, string]> = groups
          ? groups.split(';').map((g) => {
              const [a, b] = g.split('@')[0]!.split('-').map(Number) as [number, number];
              return [`${a}-${b}`, filler(span(a, b), cjk, cjkSource)];
            })
          : words
            ? [[`1-${tokens.length}`, filler(span(1, tokens.length), cjk, cjkSource)]]
            : [];
        const plain = p[2]!;
        const plainSize = cjkSource ? [...plain.replace(/\s+/g, '')].length / 2 : plain.split(/\s+/).length;
        html += `<p id="${id}">`;
        html += spans.length
          ? spans.map(([src, text], i) => `<span data-src="${src}">${text}${i === spans.length - 1 ? stop : ''}</span>`).join('')
          : filler(plainSize, cjk, cjkSource) + stop;
        html += '</p>';
      }
      html += '</section>';
    }
    return `${html}</article>`;
  }
  return fakeSpeechAnswer(user);
}

/** 只扰动整页（≥8 行）的头一次 `translate-lines` 答案；同一页再问、核心的小补做页都答得干净。 */
function perturb(text: string, attempt: number): string {
  const lines = text.split('\n');
  if (attempt > 0 || lines.length < 8) return text;
  switch (values.perturb) {
    case 'nomarks': // 每三行去掉块标记
      return lines.map((l, i) => (i % 3 === 0 ? l.replace(/\|[^|]*\|/g, '') : l)).join('\n');
    case 'merge': // 第 2 行并进第 1 行
      return [lines[0] + lines[1]!.replace(/^\d+ /, ''), ...lines.slice(2)].join('\n');
    case 'range': // 每四行的头一个引用写成原文里没有的词
      return lines.map((l, i) => (i % 4 === 0 ? l.replace(/\|([^|.]+)\.\.([^|]+)\|/, '|zzqx..$1|') : l)).join('\n');
    case 'fence':
      return 'Here is the translation:\n```text\n' + text + '\n```';
    case 'drop': // 漏掉末行
      return lines.slice(0, -1).join('\n');
    default:
      return text;
  }
}

function runCli(args: string[], stdin: string, signal: AbortSignal): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [path.join(REPO, 'apps/cli/src/main.ts'), ...args], { env: process.env, signal });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (d) => (stdout += d));
    child.stderr.on('data', (d) => (stderr += d));
    child.on('error', reject);
    child.on('close', () => (stdout ? resolve(stdout) : reject(new Error(stderr || 'no output'))));
    child.stdin.end(stdin);
  });
}

/**
 * 直连 OpenAI 兼容端点（`POST {base}/chat/completions`），请求体与 Runtime 的兼容服务商一致（model、messages、max_tokens、temperature）。
 * 密钥只从 `--key-env` 指定的环境变量读，不写进日志；429 / 5xx / 网络错误在这里有界重试，次数单独记，不算进核心的重试。
 */
async function direct(request: { messages: Message[]; maxOutputTokens?: number; temperature?: number }, signal: AbortSignal) {
  const key = process.env[values['key-env']!];
  if (!key) throw new Error(`${values['key-env']} is not set`);
  const body = JSON.stringify({
    model: values.model,
    messages: request.messages.map((m) => ({ role: m.role, content: m.content })),
    ...(request.maxOutputTokens ? { max_tokens: request.maxOutputTokens } : {}),
    ...(request.temperature !== undefined ? { temperature: request.temperature } : {}),
    // DeepSeek 的思考开关与档位；不给时照服务商默认（Runtime 也不发）。
    ...(values.thinking ? { thinking: { type: values.thinking } } : {}),
    ...(values['reasoning-effort'] ? { reasoning_effort: values['reasoning-effort'] } : {}),
  });
  let transportRetries = 0;
  for (;;) {
    let status = 0;
    let detail = '';
    try {
      const response = await fetch(`${values['base-url']}/chat/completions`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
        body,
        signal: AbortSignal.any([signal, AbortSignal.timeout(15 * 60 * 1000)]),
      });
      status = response.status;
      const raw = await response.text();
      if (response.ok) {
        const value = JSON.parse(raw);
        const choice = value.choices?.[0] ?? {};
        const finish = choice.finish_reason;
        return {
          text: typeof choice.message?.content === 'string' ? choice.message.content : '',
          finishReason: finish === 'length' ? 'length' : finish === 'content_filter' ? 'content-filter' : 'stop',
          usage: value.usage ?? null,
          modelVersion: value.model ?? values.model!,
          transportRetries,
        };
      }
      detail = raw.slice(0, 300);
      if (status !== 429 && status < 500) throw new Error(`HTTP ${status}: ${detail}`);
    } catch (error) {
      if (signal.aborted || (status && status !== 429 && status < 500)) throw error;
      detail = String((error as Error)?.message ?? error).slice(0, 300);
    }
    if (++transportRetries > 5) throw new Error(`transport failed after retries: ${status} ${detail}`);
    await new Promise((resolve) => setTimeout(resolve, 2000 * 2 ** transportRetries));
  }
}

interface Message {
  role: string;
  content: string;
}

const attemptOf = new Map<string, number>();

type Recorded = Map<string, Array<{ text: string; usage: unknown }>>;

/** 先前一次运行记下的回答，按提示词排队（同一页重发时依次取）；失败的调用没有回答，不收。 */
function loadRecorded(file: string): Recorded {
  const recorded: Recorded = new Map();
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    if (!line.trim()) continue;
    const call = JSON.parse(line);
    if (typeof call.text !== 'string') continue;
    const queue = recorded.get(call.user) ?? [];
    queue.push({ text: call.text, usage: call.usage });
    recorded.set(call.user, queue);
  }
  return recorded;
}

function makeText(log: fs.WriteStream, cjkSource: boolean, recorded: Recorded | null) {
  let seq = 0;
  return {
    async generate(
      request: { messages: Message[]; maxOutputTokens?: number; temperature?: number },
      { signal }: { signal?: AbortSignal } = {},
    ) {
      const system = request.messages.find((m) => m.role === 'system')?.content ?? '';
      const user = request.messages.find((m) => m.role === 'user')?.content ?? '';
      const kind = speechRequestKind(user) ?? 'other';
      const started = Date.now();
      const n = seq++;
      let text: string;
      let usage: unknown = null;
      let modelVersion = values.generator!;
      let finishReason = 'stop';
      let transportRetries = 0;
      // 有录制就原样回放；录制里没有的提示词（这次的输入与录制时不同）交给 --generator，纯回放直接失败。
      const answer = recorded?.get(user)?.shift();
      if (answer) {
        text = answer.text;
        usage = answer.usage;
        modelVersion = 'replay';
      } else if (values.generator === 'replay') {
        throw new Error(`no recorded answer for this ${kind} prompt`);
      } else if (values.generator === 'direct') {
        const reply = await direct(request, signal ?? new AbortController().signal);
        ({ text, usage, modelVersion, finishReason, transportRetries } = reply);
      } else if (values.generator === 'runtime') {
        // 生产的 models.generateText（授权、预算、账本都在 Runtime 那边）。
        const args = ['text', '--json', '--system', system, '--provider', values.provider!, '--model', values.model!];
        if (request.maxOutputTokens) args.push('--max-output-tokens', String(request.maxOutputTokens));
        if (request.temperature !== undefined) args.push('--temperature', String(request.temperature));
        args.push('-');
        const envelope = JSON.parse(await runCli(args, user, signal ?? new AbortController().signal));
        if (!envelope.ok) {
          const error = { code: envelope.error?.code, message: envelope.error?.message };
          log.write(
            `${JSON.stringify({ n, kind, maxOutputTokens: request.maxOutputTokens, error, ms: Date.now() - started, system, user })}\n`,
          );
          throw new Error(`${error.code}: ${error.message}`);
        }
        text = envelope.result.text;
        usage = envelope.result.usage ?? null;
        modelVersion = envelope.result.modelVersion ?? envelope.result.modelId;
        finishReason = envelope.result.finishReason ?? 'stop';
      } else {
        text = values.generator === 'fake' ? fakeSpeechAnswer(user) : echoAnswer(user, kind, cjkSource);
        if (kind === 'translate-lines') text = perturb(text, attemptOf.get(user) ?? 0);
        attemptOf.set(user, (attemptOf.get(user) ?? 0) + 1);
      }
      const ms = Date.now() - started;
      log.write(
        `${JSON.stringify({ n, kind, replayed: Boolean(answer), systemChars: system.length, userChars: user.length, answerChars: text.length, arm, maxOutputTokens: request.maxOutputTokens ?? null, finishReason, transportRetries, usage, ms, user, text })}\n`,
      );
      return { text, finishReason, modelVersion, usage } as never;
    },
  };
}

function tally(result: SpeechTranslateResult) {
  const aligners: Record<string, number> = {};
  for (const unit of result.translation.units) {
    const split = (unit as { alignment?: { split?: { aligner?: string } } }).alignment?.split;
    const tag = split?.aligner ?? '-';
    aligners[tag] = (aligners[tag] ?? 0) + 1;
  }
  return {
    units: result.translation.units.length,
    cues: result.cues.cues.length,
    fallbackCues: result.cues.cues.filter((c) => c.fallback).length,
    aligners,
    report: result.report,
    calls: result.calls,
  };
}

const summary: Array<Record<string, unknown>> = [];
for (const file of fs
  .readdirSync(values.corpus)
  .filter((f) => f.endsWith('.json'))
  .sort()) {
  const doc = JSON.parse(fs.readFileSync(path.join(values.corpus, file), 'utf8'));
  if ((only && !only.has(doc.videoId)) || doc.words > maxWords) continue;
  const language: string = doc.language ?? '';
  const target = /^zh/.test(language) ? 'en' : 'zh-Hans';
  const lastEnd = Math.max(0, ...(doc.speech.words as Array<{ end: number }>).map((w) => w.end));
  for (const fusion of fusions) {
    const dir = path.join(out, `${doc.videoId}.${fusion}.${values.perturb}`);
    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });
    const log = fs.createWriteStream(path.join(dir, 'calls.jsonl'));
    const started = Date.now();
    const row: Record<string, unknown> = { videoId: doc.videoId, words: doc.words, language, target, fusion, perturb: values.perturb, arm };
    try {
      const result = await runSpeechTranslate({
        command: values['page-words']
          ? {
              command: worker,
              env: {
                ...Object.fromEntries(['PATH', 'TMPDIR', 'LANG', 'LC_ALL', 'RUST_BACKTRACE'].map((k) => [k, process.env[k]])),
                BCUT_LLM_PAGE_WORDS: values['page-words'],
              },
            }
          : worker,
        staging: path.join(dir, 'staging'),
        input: {
          media: { assetId: doc.assetId ?? null, contentHash: '', duration: { ticks: String(lastEnd), timescale: doc.speech.timescale } },
          sourceLanguage: doc.language ?? null,
          speechRef: { id: doc.documentId, revision: doc.revision },
          sequenceId: doc.sequenceId,
          speech: doc.speech,
          targetLanguage: target,
          glossary: [],
          glossaryRef: null,
          params: { alignFusion: fusion },
        },
        text: makeText(
          log,
          /^(zh|ja|ko)/.test(language),
          values.replay ? loadRecorded(path.join(values.replay!, `${doc.videoId}.${fusion}.${values.perturb}`, 'calls.jsonl')) : null,
        ),
        provider: values.provider ?? values.generator!,
        model: values.model ?? values.generator!,
        modelInfo: { maxOutputTokens: Number(values['max-output-tokens']), acceptsTemperature: true },
        signal: AbortSignal.timeout(60 * 60 * 1000),
      });
      Object.assign(row, { ok: true }, tally(result));
      fs.writeFileSync(path.join(dir, 'translation.json'), JSON.stringify(result.translation));
      fs.writeFileSync(path.join(dir, 'cues.json'), JSON.stringify(result.cues));
    } catch (error) {
      const e = error as { code?: unknown; message?: unknown; details?: unknown };
      Object.assign(row, { ok: false, error: { code: e?.code, message: String(e?.message ?? error).slice(0, 500), details: e?.details } });
    }
    row.ms = Date.now() - started;
    log.end();
    summary.push(row);
    const head = `${row.ok ? 'ok ' : 'ERR'} ${doc.videoId} ${String(doc.words).padStart(6)}w ${language}->${target} ${fusion.padEnd(5)}`;
    const align = (row.report as { align?: unknown } | undefined)?.align;
    console.log(
      row.ok
        ? `${head} units=${row.units} cues=${row.cues} calls=${(row.calls as { calls: number }).calls} aligners=${JSON.stringify(row.aligners)} align=${JSON.stringify(align)}`
        : `${head} ${JSON.stringify(row.error)}`,
    );
    fs.writeFileSync(path.join(out, `summary.${values.perturb}.json`), JSON.stringify(summary, null, 1));
  }
}
