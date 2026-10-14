/**
 * CPU 与 GPU 的文字向量是否同一空间（检索规格 v0.1 §4.4）：用本机装好的每个嵌入模型包，经真的 Model Worker 把
 * `fixtures/` 的全部句群（文档）与查询编码一遍，向量与耗时写进 `--out`。同一份输入跑两次——`BAOCUT_GPU=off`（CPU）与不设
 * （macOS 上 GPU，FP32 激活）——再用 `--compare a.json b.json` 比：逐条余弦的最小值与分位、每条查询的第一名是否一致。
 * 多模态包另编码参考帧，确认文字在 GPU 时画面仍在 CPU、向量不变。模型目录与 `--tools` 只读：不安装、不自检。
 *
 *    BAOCUT_GPU=off node --experimental-strip-types tools/embedding-eval/device-compare.ts --models <dir> --tools <dir> --out cpu.json
 *    node --experimental-strip-types tools/embedding-eval/device-compare.ts --models <dir> --tools <dir> --out gpu.json
 *    node --experimental-strip-types tools/embedding-eval/device-compare.ts --compare cpu.json gpu.json
 */

import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { REFERENCE_FRAME, openProviders } from './reference-vectors.ts';

const HERE = path.dirname(fileURLToPath(import.meta.url));

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
}

async function encode(models: string, tools: string): Promise<Run[]> {
  const corpus = JSON.parse(await fs.readFile(path.join(HERE, 'fixtures', 'corpus.json'), 'utf8')) as { groups: { text: string }[] };
  const queries = JSON.parse(await fs.readFile(path.join(HERE, 'fixtures', 'queries.json'), 'utf8')) as { queries: { text: string }[] };
  const work = await fs.mkdtemp(path.join(os.tmpdir(), 'baocut-device-compare-'));
  const opened = await openProviders(models, tools, work);
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
      let imageDevice: string | null = null;
      if (bundle.vision) {
        frame = Array.from((await bundle.provider.embedImages!({ images: [REFERENCE_FRAME] })).vectors[0]!);
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

function top1(query: readonly number[], documents: readonly number[][]): number {
  let best = -1;
  let at = -1;
  documents.forEach((d, i) => {
    const s = cosine(query, d);
    if (s > best) [best, at] = [s, i];
  });
  return at;
}

function median(values: readonly number[]): number {
  const sorted = [...values].sort((x, y) => x - y);
  return sorted[Math.floor(sorted.length / 2)] ?? NaN;
}

function compare(a: Run[], b: Run[]) {
  return a.map((x) => {
    const y = b.find((r) => r.bundleId === x.bundleId);
    if (!y) return { bundleId: x.bundleId, missing: true };
    const cosines = [...x.documents.map((d, i) => cosine(d, y.documents[i]!)), ...x.queries.map((q, i) => cosine(q, y.queries[i]!))].sort(
      (p, q) => p - q,
    );
    const agree = x.queries.filter((q, i) => top1(q, x.documents) === top1(y.queries[i]!, y.documents)).length;
    return {
      bundleId: x.bundleId,
      devices: [x.textDevice, y.textDevice],
      imageDevices: [x.imageDevice, y.imageDevice],
      sameEncoderProfileId: x.encoderProfileId === y.encoderProfileId,
      vectors: cosines.length,
      minCosine: Number(cosines[0]!.toFixed(5)),
      p10Cosine: Number(cosines[Math.floor(cosines.length * 0.1)]!.toFixed(5)),
      medianCosine: Number(median(cosines).toFixed(5)),
      top1Agreement: `${agree}/${x.queries.length}`,
      frameCosine: x.frame && y.frame ? Number(cosine(x.frame, y.frame).toFixed(6)) : null,
      firstBatchMs: [Math.round(x.firstBatchMs), Math.round(y.firstBatchMs)],
      medianBatchMs: [Math.round(median(x.batchMs)), Math.round(median(y.batchMs))],
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
  if (!models || !tools || !out) throw new Error('usage: device-compare.ts --models <dir> --tools <dir> --out <file>');
  await fs.writeFile(out, JSON.stringify(await encode(models, tools)));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
