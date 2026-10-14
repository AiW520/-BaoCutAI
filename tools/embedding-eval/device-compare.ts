/**
 * CPU 与 GPU 的文字向量是否同一空间（检索规格 v0.1 §4.4）：用本机装好的每个嵌入模型包，经真的 Model Worker 把
 * `fixtures/` 的全部句群（文档）与查询编码一遍，向量与耗时写进 `--out`。同一份输入跑两次——`BAOCUT_GPU=off`（CPU）与不设
 * （macOS 上 GPU，FP32 激活）——再用 `--compare a.json b.json` 比：逐条余弦的最小值与分位、每条查询的第一名是否一致。
 * 多模态包另编码参考帧；给了 `--frames <dir>` 时再编码那个目录里的全部 JPEG / PNG（每批 4 张，同画面一路）与
 * `FRAME_QUERIES`，比帧向量的余弦、画面检索第一名是否一致、前 5 名重合多少与每帧耗时（GPU 报告 §7）。模型目录与 `--tools`
 * 只读：不安装、不自检。
 *
 *    BAOCUT_GPU=off node --experimental-strip-types tools/embedding-eval/device-compare.ts --models <dir> --tools <dir> [--frames <dir>] --out cpu.json
 *    node --experimental-strip-types tools/embedding-eval/device-compare.ts --models <dir> --tools <dir> [--frames <dir>] --out gpu.json
 *    node --experimental-strip-types tools/embedding-eval/device-compare.ts --compare cpu.json gpu.json
 */

import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { REFERENCE_FRAME, openProviders } from './reference-vectors.ts';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const FRAME_BATCH = 4;
/** `--frames` 时按描述找画面的查询（英、中、日文，没有标注：只比两种设备的名次是否一致）。 */
const FRAME_QUERIES = [
  'a slide with a bar chart',
  'a man speaking into a microphone on stage',
  'an audience in a lecture hall',
  'a title slide with large text',
  'two people sitting in chairs talking',
  'a close-up of a face',
  'a company logo on a screen',
  'program code on a screen',
  'a diagram with boxes and arrows',
  'a woman presenting on stage',
  '演讲者站在讲台前',
  '幻灯片上的表格',
  '两个人面对面采访',
  '黑色背景上的白色文字',
  'a graph of model performance over time',
  'a bookshelf in the background',
  'a person wearing glasses',
  'a whiteboard with handwriting',
  'a stage with blue lighting',
  'a laptop on a table',
  'bullet points on a white slide',
  'スライドの箇条書き',
  'a podcast studio with microphones',
  'an empty stage',
];

interface FrameRun {
  files: string[];
  vectors: number[][];
  /** 每批（至多 4 张）的毫秒数，第一批含加载图像编码器与预热，单列。 */
  firstBatchMs: number;
  batchMs: number[];
  queries: number[][];
}

interface Run {
  bundleId: string;
  textDevice: string | null;
  imageDevice: string | null;
  encoderProfileId: string;
  /** 每批（至多 16 条）的毫秒数，第一批含加载与预热，单列。 */
  firstBatchMs: number;
  batchMs: number[];
  documents: number[][];
  queries: number[][];
  frame: number[] | null;
  frames: FrameRun | null;
}

type Provider = Awaited<ReturnType<typeof openProviders>>['bundles'][number]['provider'];

async function encodeFrames(provider: Provider, dir: string): Promise<FrameRun> {
  const files = (await fs.readdir(dir)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();
  const vectors: number[][] = [];
  const timings: number[] = [];
  for (let i = 0; i < files.length; i += FRAME_BATCH) {
    const started = performance.now();
    const result = await provider.embedImages!({ images: files.slice(i, i + FRAME_BATCH).map((f) => path.join(dir, f)) });
    timings.push(performance.now() - started);
    for (const v of result.vectors) vectors.push(Array.from(v));
  }
  const asked = await provider.embed('text-to-visual', { role: 'query', inputs: FRAME_QUERIES.map((text) => ({ text })) });
  return { files, vectors, firstBatchMs: timings[0]!, batchMs: timings.slice(1), queries: Array.from(asked.vectors, (v) => Array.from(v)) };
}

async function encode(models: string, tools: string, framesDir: string | undefined): Promise<Run[]> {
  const corpus = JSON.parse(await fs.readFile(path.join(HERE, 'fixtures', 'corpus.json'), 'utf8')) as { groups: { text: string }[] };
  const queries = JSON.parse(await fs.readFile(path.join(HERE, 'fixtures', 'queries.json'), 'utf8')) as { queries: { text: string }[] };
  const work = await fs.mkdtemp(path.join(os.tmpdir(), 'baocut-device-compare-'));
  const opened = await openProviders(models, tools, work, framesDir ? [framesDir] : []);
  const runs: Run[] = [];
  try {
    for (const bundle of opened.bundles) {
      const timings: number[] = [];
      const batches = async (role: 'document' | 'query', texts: string[]) => {
        const out: number[][] = [];
        for (let i = 0; i < texts.length; i += 16) {
          const started = performance.now();
          const result = await bundle.provider.embed('retrieval', { role, inputs: texts.slice(i, i + 16).map((text) => ({ text })) });
          timings.push(performance.now() - started);
          for (const v of result.vectors) out.push(Array.from(v));
        }
        return out;
      };
      const documents = await batches(
        'document',
        corpus.groups.map((g) => g.text),
      );
      const asked = await batches(
        'query',
        queries.queries.map((q) => q.text),
      );
      const text = await bundle.provider.profile('retrieval');
      let frame: number[] | null = null;
      let frames: FrameRun | null = null;
      let imageDevice: string | null = null;
      if (bundle.vision) {
        frame = Array.from((await bundle.provider.embedImages!({ images: [REFERENCE_FRAME] })).vectors[0]!);
        if (framesDir) frames = await encodeFrames(bundle.provider, framesDir);
        imageDevice = (await bundle.provider.profile('text-to-visual')).device ?? null;
      }
      runs.push({
        bundleId: bundle.bundleId,
        textDevice: text.device ?? null,
        imageDevice,
        encoderProfileId: text.encoderProfileId,
        firstBatchMs: timings[0]!,
        batchMs: timings.slice(1),
        documents,
        queries: asked,
        frame,
        frames,
      });
      console.log(`${bundle.bundleId}: text on ${text.device}${bundle.vision ? `, image on ${imageDevice}` : ''}`);
    }
  } finally {
    await opened.close();
    await fs.rm(work, { recursive: true, force: true });
  }
  return runs;
}

function cosine(a: readonly number[], b: readonly number[]): number {
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i]! * b[i]!;
    na += a[i]! * a[i]!;
    nb += b[i]! * b[i]!;
  }
  return dot / Math.sqrt(na * nb);
}

function ranked(query: readonly number[], documents: readonly number[][]): number[] {
  const scores = documents.map((d) => cosine(query, d));
  return scores.map((_, i) => i).sort((p, q) => scores[q]! - scores[p]!);
}

function top1(query: readonly number[], documents: readonly number[][]): number {
  return ranked(query, documents)[0] ?? -1;
}

function spread(values: number[]) {
  const sorted = values.sort((p, q) => p - q);
  return {
    min: Number(sorted[0]!.toFixed(5)),
    p10: Number(sorted[Math.floor(sorted.length * 0.1)]!.toFixed(5)),
    median: Number(median(sorted).toFixed(5)),
  };
}

function compareFrames(x: FrameRun, y: FrameRun) {
  const top5 = x.queries.map((q, i) => {
    const a = new Set(ranked(q, x.vectors).slice(0, 5));
    return ranked(y.queries[i]!, y.vectors)
      .slice(0, 5)
      .filter((f) => a.has(f)).length;
  });
  return {
    frames: x.vectors.length,
    cosine: spread(x.vectors.map((v, i) => cosine(v, y.vectors[i]!))),
    top1Agreement: `${x.queries.filter((q, i) => top1(q, x.vectors) === top1(y.queries[i]!, y.vectors)).length}/${x.queries.length}`,
    top5Overlap: Number((top5.reduce((p, q) => p + q, 0) / (5 * top5.length)).toFixed(3)),
    firstBatchMs: [Math.round(x.firstBatchMs), Math.round(y.firstBatchMs)],
    medianFrameMs: [Math.round(median(x.batchMs) / FRAME_BATCH), Math.round(median(y.batchMs) / FRAME_BATCH)],
  };
}

function median(values: readonly number[]): number {
  const sorted = [...values].sort((x, y) => x - y);
  return sorted[Math.floor(sorted.length / 2)] ?? NaN;
}

function compare(a: Run[], b: Run[]) {
  return a.map((x) => {
    const y = b.find((r) => r.bundleId === x.bundleId);
    if (!y) return { bundleId: x.bundleId, missing: true };
    const cosines = spread([...x.documents.map((d, i) => cosine(d, y.documents[i]!)), ...x.queries.map((q, i) => cosine(q, y.queries[i]!))]);
    const vectors = x.documents.length + x.queries.length;
    const agree = x.queries.filter((q, i) => top1(q, x.documents) === top1(y.queries[i]!, y.documents)).length;
    return {
      bundleId: x.bundleId,
      devices: [x.textDevice, y.textDevice],
      imageDevices: [x.imageDevice, y.imageDevice],
      sameEncoderProfileId: x.encoderProfileId === y.encoderProfileId,
      vectors,
      minCosine: cosines.min,
      p10Cosine: cosines.p10,
      medianCosine: cosines.median,
      top1Agreement: `${agree}/${x.queries.length}`,
      frameCosine: x.frame && y.frame ? Number(cosine(x.frame, y.frame).toFixed(6)) : null,
      firstBatchMs: [Math.round(x.firstBatchMs), Math.round(y.firstBatchMs)],
      medianBatchMs: [Math.round(median(x.batchMs)), Math.round(median(y.batchMs))],
      ...(x.frames && y.frames ? { frames: compareFrames(x.frames, y.frames) } : {}),
    };
  });
}

async function main(argv: readonly string[]): Promise<void> {
  const at = (name: string) => {
    const i = argv.indexOf(name);
    return i >= 0 ? argv[i + 1] : undefined;
  };
  const compared = argv.indexOf('--compare');
  if (compared >= 0) {
    const [a, b] = [argv[compared + 1], argv[compared + 2]];
    if (!a || !b) throw new Error('usage: device-compare.ts --compare <a.json> <b.json>');
    const read = async (file: string) => JSON.parse(await fs.readFile(file, 'utf8')) as Run[];
    console.log(JSON.stringify(compare(await read(a), await read(b)), null, 2));
    return;
  }
  const models = at('--models');
  const tools = at('--tools');
  const out = at('--out');
  if (!models || !tools || !out) throw new Error('usage: device-compare.ts --models <dir> --tools <dir> [--frames <dir>] --out <file>');
  await fs.writeFile(out, JSON.stringify(await encode(models, tools, at('--frames'))));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
