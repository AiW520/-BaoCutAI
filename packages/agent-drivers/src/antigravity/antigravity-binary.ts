import { execFile } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import { agentEnv, findOnPath, isExecutable, pickNewest } from '../login-shell.ts';

const run = promisify(execFile);
export interface AntigravityInstall { command: string; version: string | null; env: NodeJS.ProcessEnv }
export const ANTIGRAVITY_PATH_VARIABLE = 'BAOCUT_ANTIGRAVITY_PATH';
export function antigravityLocations(platform: NodeJS.Platform, home: string, env: NodeJS.ProcessEnv): string[] {
  if (platform === 'win32') return [path.win32.join(env.LOCALAPPDATA || path.win32.join(home, 'AppData', 'Local'), 'agy', 'bin', 'agy.exe')];
  return [path.join(home, '.local/bin/agy'), '/opt/homebrew/bin/agy', '/usr/local/bin/agy'];
}
export async function antigravityAt(command: string, env?: NodeJS.ProcessEnv): Promise<AntigravityInstall | null> {
  if (!(await isExecutable(command))) return null;
  const launchEnv = env ?? await agentEnv();
  let version: string | null = null;
  try {
    const { stdout } = await run(command, ['--version'], { env: launchEnv, timeout: 10_000, windowsHide: true });
    version = /^\s*(\d+\.\d+\.\d+)\s*$/.exec(stdout)?.[1] ?? null;
  } catch { /* 探测继续报告「读不到版本」，不把存在的程序说成未安装。 */ }
  return { command, version, env: launchEnv };
}
export async function locateAntigravity(): Promise<AntigravityInstall | null> {
  const env = await agentEnv();
  const override = env[ANTIGRAVITY_PATH_VARIABLE];
  if (override) return antigravityAt(override, env);
  const onPath = await findOnPath(process.platform === 'win32' ? 'agy.exe' : 'agy', env.PATH ?? env.Path ?? '');
  const candidates = onPath ? [onPath] : [];
  for (const candidate of antigravityLocations(process.platform, os.homedir(), env)) if (await isExecutable(candidate)) candidates.push(candidate);
  const installs = await pickNewest(candidates, async (file) => (await antigravityAt(file, env)) ?? { command: file, version: null, env });
  return installs;
}
