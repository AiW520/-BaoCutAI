#!/usr/bin/env node
/**
 * 取内置的 audio.cpp 引擎（架构设计 §6.3；登记在 `packages/models/src/audio-cpp-engine.ts`）：按平台选上游 GitHub Releases 的
 * 压缩包，核对大小与 sha256，只解开包根目录的普通文件（`audiocpp_cli`、`audiocpp_server`、`LICENSE`，Linux / Windows 另有它们要的
 * 动态库），放进 `<目录>/`。开发时目录是 cargo 产物目录里的 `audiocpp/`，Runtime 在那里找它；打包脚本（`package-desktop.mjs`）用同一个
 * 函数取目标平台的引擎，放进 `<resources>/bin/audiocpp/`。
 *
 *   node tools/fetch-audiocpp.ts                                 取这台机器的引擎到 cargo 产物目录的 audiocpp/
 *   node tools/fetch-audiocpp.ts --variant cpu                   Windows / Linux 取 CPU 构建
 *   node tools/fetch-audiocpp.ts --platform win32 --arch x64 --out <目录>
 *
 * 压缩包缓存在 `<cargo 产物目录>/audiocpp-download/`，核对过的不再下载；目录里的 `.release.json` 记着解开的是哪个包，一致时什么都不做。
 * `BAOCUT_TOOLS_ENDPOINT` 给了时从镜像 `<基址>/audiocpp/<版本>/<文件名>` 下载（与应用里工具下载镜像的路径相同）。
 * 根 `package.json` 的 `build:audiocpp` 跑它，`setup` 包含它。
 */
import { createHash } from 'node:crypto';
import { createReadStream, createWriteStream } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { AUDIO_CPP_RELEASE, AUDIO_CPP_TOOL, audioCppAssetKey } from '../packages/models/src/audio-cpp-engine.ts';
import { extractToolArchive } from '../packages/models/src/tool-archive.ts';
import { cargoTargetDirs } from '../packages/process-host/src/cargo-target.ts';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const STAMP = '.release.json';

export interface FetchAudioCppOptions {
  platform: string;
  arch: string;
  /** `cpu` 时取 CPU 构建（有的话）；其余取默认的包。 */
  variant?: string | null;
  /** 解开到哪里（整个目录会被替换）。 */
  dest: string;
  /** 压缩包的缓存目录。 */
  cacheDir: string;
  /** 工具下载镜像的基址；没有时用上游的发布页。 */
  mirror?: string | null;
  log?: (line: string) => void;
}

/** 取一个平台的引擎到 `dest`；返回 `audiocpp_cli` 的路径。这个平台上游没有发布时抛错。 */
export async function fetchAudioCpp(options: FetchAudioCppOptions): Promise<string> {
  const log = options.log ?? ((line: string) => console.log(line));
  const key = audioCppAssetKey(options.platform, options.arch, options.variant);
  const asset = AUDIO_CPP_RELEASE.assets[key];
  if (!asset) throw new Error(`audio.cpp ${AUDIO_CPP_RELEASE.version} has no build for ${key}`);
  const cli = path.join(options.dest, asset.executable);
  const stamp = { version: AUDIO_CPP_RELEASE.version, file: asset.fileName, sha256: asset.sha256 };
  const current = await fs.readFile(path.join(options.dest, STAMP), 'utf8').then(JSON.parse, () => null);
  if (current && JSON.stringify(current) === JSON.stringify(stamp) && (await isFile(cli))) {
    log(`audio.cpp ${AUDIO_CPP_RELEASE.version}（${asset.fileName}）已在 ${options.dest}`);
    return cli;
  }

  await fs.mkdir(options.cacheDir, { recursive: true });
  const archive = path.join(options.cacheDir, asset.fileName);
  if ((await sha256Of(archive)) !== asset.sha256) {
    const url = options.mirror
      ? `${options.mirror.replace(/\/+$/, '')}/${AUDIO_CPP_TOOL}/${AUDIO_CPP_RELEASE.version}/${encodeURIComponent(asset.fileName)}`
      : AUDIO_CPP_RELEASE.urlTemplate.replace('{version}', AUDIO_CPP_RELEASE.version).replace('{file}', encodeURIComponent(asset.fileName));
    log(`下载 ${url}（${(asset.size / 2 ** 20).toFixed(1)} MiB）`);
    const response = await fetch(url, { redirect: 'follow' });
    if (!response.ok || !response.body) throw new Error(`download failed: HTTP ${response.status} ${url}`);
    const part = `${archive}.part`;
    await pipeline(Readable.fromWeb(response.body as import('node:stream/web').ReadableStream), createWriteStream(part));
    const size = (await fs.stat(part)).size;
    const sha256 = await sha256Of(part);
    if (size !== asset.size || sha256 !== asset.sha256) {
      await fs.rm(part, { force: true });
      throw new Error(`${asset.fileName} does not match the registry: ${size} bytes, sha256 ${sha256}`);
    }
    await fs.rename(part, archive);
  }

  // 先解到旁边的临时目录，齐了再换掉旧的：中途失败不留下半个引擎。
  const staging = `${options.dest}.staging`;
  await fs.rm(staging, { recursive: true, force: true });
  await fs.mkdir(staging, { recursive: true });
  const names = await extractToolArchive(archive, asset.archive, staging);
  for (const required of [asset.executable, asset.executable.replace('audiocpp_cli', 'audiocpp_server')]) {
    if (!names.includes(required)) throw new Error(`${asset.fileName} has no ${required}`);
  }
  await fs.writeFile(path.join(staging, STAMP), `${JSON.stringify(stamp)}\n`);
  await fs.rm(options.dest, { recursive: true, force: true });
  await fs.mkdir(path.dirname(options.dest), { recursive: true });
  await fs.rename(staging, options.dest);
  log(`audio.cpp ${AUDIO_CPP_RELEASE.version}（${asset.fileName}）→ ${options.dest}：${names.sort().join('、')}`);
  return path.join(options.dest, asset.executable);
}

/** 开发时放引擎的 cargo 产物目录：`CARGO_TARGET_DIR`、`.cargo` 配置里的 `target-dir`，都没有时是仓库的 `target/`。 */
export function devTargetDir(): string {
  return cargoTargetDirs(ROOT).next().value ?? path.join(ROOT, 'target');
}

async function isFile(file: string): Promise<boolean> {
  return fs.stat(file).then(
    (s) => s.isFile(),
    () => false,
  );
}

async function sha256Of(file: string): Promise<string | null> {
  if (!(await isFile(file))) return null;
  const hash = createHash('sha256');
  await pipeline(createReadStream(file), hash);
  return hash.digest('hex');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { values } = parseArgs({
    options: {
      platform: { type: 'string', default: process.platform },
      arch: { type: 'string', default: process.arch },
      variant: { type: 'string' },
      out: { type: 'string' },
    },
  });
  const target = devTargetDir();
  try {
    await fetchAudioCpp({
      platform: values.platform!,
      arch: values.arch!,
      variant: values.variant ?? null,
      dest: values.out ? path.resolve(values.out) : path.join(target, AUDIO_CPP_TOOL),
      cacheDir: path.join(target, `${AUDIO_CPP_TOOL}-download`),
      mirror: process.env.BAOCUT_TOOLS_ENDPOINT || null,
    });
  } catch (error) {
    console.error(`取 audio.cpp 引擎失败：${(error as Error).message}`);
    process.exit(1);
  }
}
