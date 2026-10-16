import { execFile } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import { nodeCliCommand, resolveCmdShim } from '../cli-command.ts';
import { agentEnv, findOnPath, isExecutable, pickNewest } from '../login-shell.ts';

const run = promisify(execFile);

export interface PiInstall {
  command: string;
  version: string | null;
  env: NodeJS.ProcessEnv;
}

/** 覆盖可执行文件位置的环境变量。 */
export const PI_PATH_VARIABLE = 'BAOCUT_PI_PATH';

/**
 * 每次起 pi 都带上：不去网上查新版本（探测与会话都不需要，省一次网络往返）。旧版不认识这个变量，照样能跑。
 */
export const PI_ENV: Record<string, string> = { PI_SKIP_VERSION_CHECK: '1' };

let located: { at: number; result: Promise<PiInstall | null> } | null = null;

/**
 * `BAOCUT_PI_PATH` 优先；否则在登录 shell 的 PATH 与常见安装位置（见 `piSearch`）里取版本最新的一个。
 * 结果缓存 30 秒，避免每次开会话都跑一遍 `--version`。
 */
export function locatePi(): Promise<PiInstall | null> {
  if (located && Date.now() - located.at <= 30_000) return located.result;
  located = { at: Date.now(), result: findPi() };
  return located.result;
}

const nvmVersionsDir = (env: NodeJS.ProcessEnv, home: string) => path.join(env.NVM_DIR || path.join(home, '.nvm'), 'versions/node');

/**
 * 在 PATH 上找的文件名，与另外再看的位置。
 * - macOS / Linux：`~/.local/bin`、Homebrew、`/usr/local/bin`，以及 npm 全局安装常见的落点——nvm 每个 Node 版本一套全局目录，
 *   `nvmVersions` 是 `$NVM_DIR/versions/node` 下的目录名，逐个列出来。
 * - Windows：独立的 `pi.exe`；npm 全局安装的批处理垫片 `%APPDATA%\npm\pi.cmd`（见 `resolveCmdShim`）。未在 Windows 上验证。
 */
export function piSearch(
  platform: NodeJS.Platform,
  env: NodeJS.ProcessEnv,
  home: string,
  nvmVersions: readonly string[] = [],
): { names: string[]; locations: string[] } {
  if (platform === 'win32') {
    const win = path.win32;
    return { names: ['pi.exe', 'pi.cmd'], locations: [win.join(env.APPDATA || win.join(home, 'AppData', 'Roaming'), 'npm', 'pi.cmd')] };
  }
  const nvm = nvmVersionsDir(env, home);
  return {
    names: ['pi'],
    locations: [
      path.join(home, '.local/bin/pi'),
      '/opt/homebrew/bin/pi',
      '/usr/local/bin/pi',
      ...nvmVersions.map((version) => path.join(nvm, version, 'bin/pi')),
    ],
  };
}

async function findPi(): Promise<PiInstall | null> {
  const env = await agentEnv();
  const override = process.env[PI_PATH_VARIABLE];
  if (override) return inspectPi(override, env);
  const home = os.homedir();
  const nvmVersions = process.platform === 'win32' ? [] : await fs.readdir(nvmVersionsDir(env, home)).catch(() => [] as string[]);
  const search = piSearch(process.platform, env, home, nvmVersions);
  const candidates: string[] = [];
  for (const name of search.names) {
    const onPath = await findOnPath(name, env.PATH ?? '');
    if (onPath) candidates.push(onPath);
  }
  for (const file of search.locations) {
    if (await isExecutable(file)) candidates.push(file);
  }
  const resolved = process.platform === 'win32' ? await Promise.all(candidates.map(resolveCmdShim)) : candidates;
  return pickNewest(resolved, (command) => inspectPi(command, env));
}

/** 用户手动指定的可执行文件：只认这一个，不再到别处找。不存在或不可执行时为 null。 */
export async function piAt(command: string): Promise<PiInstall | null> {
  if (!(await isExecutable(command))) return null;
  return inspectPi(command, await agentEnv());
}

/**
 * Windows 上 npm 装的 `pi.cmd` 不能不经 shell 直接起，换成垫片指向的 `cli.js`（之后交给 node，见 `piCommand`）。
 * 跑一次 `--version`，读不出版本时 version 为 null（探测报「出错」）。
 */
async function inspectPi(command: string, env: NodeJS.ProcessEnv): Promise<PiInstall> {
  const file = process.platform === 'win32' ? await resolveCmdShim(command) : command;
  return { command: file, version: await readPiVersion(file, env), env };
}

/** 起 pi（`--version`、`--mode rpc`）的程序与参数：`.js` 入口交给 node。 */
export function piCommand(command: string, args: readonly string[]): { file: string; args: string[] } {
  const exec = nodeCliCommand(command);
  return { file: exec.file, args: [...exec.args, ...args] };
}

/** `pi --version` 输出里的版本号（实测 1.0.4 只打印 `1.0.4`）。 */
export function parsePiVersion(output: string): string | null {
  return /(\d+(?:\.\d+)+)/.exec(output)?.[1] ?? null;
}

async function readPiVersion(command: string, env: NodeJS.ProcessEnv): Promise<string | null> {
  try {
    const exec = piCommand(command, ['--version']);
    const { stdout, stderr } = await run(exec.file, exec.args, { env: { ...env, ...PI_ENV }, timeout: 10_000 });
    return parsePiVersion(stdout) ?? parsePiVersion(stderr);
  } catch {
    return null;
  }
}
