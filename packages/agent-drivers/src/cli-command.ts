import fs from 'node:fs/promises';
import path from 'node:path';
import { isExecutable } from './login-shell.ts';

/**
 * npm 在 Windows 上装的 CLI `.cmd` 是批处理垫片。Node 20.12 / 18.20.2 起不经 shell 不能直接 `execFile` / `spawn` 一个 .cmd（EINVAL），
 * 经 cmd.exe 又会弄坏 SDK 传给 CLI 的带引号的 JSON 参数（paseo 的 claude/query.ts 因此用 `shell: false`）。所以从垫片里读出
 * 它真正启动的文件：npm cmd-shim 写成 `"%dp0%\<相对路径>"`，取最后一个（前面可能是 `%dp0%\node.exe`）。
 * `.exe` 直接用；`.js` 用 node 跑（见 `nodeCliCommand`；SDK 遇到 `.js` 的 pathToClaudeCodeExecutable 也自己用 node 起）。
 * 读不出时为 null。未在 Windows 上验证。
 */
export function parseCmdShimTarget(content: string, shimDir: string): string | null {
  const targets = [...content.matchAll(/"%~?dp0%?\\([^"%]+)"/gi)].map((m) => m[1]!).filter((rel) => !/^node\.exe$/i.test(rel));
  const last = targets.at(-1);
  return last ? path.win32.join(shimDir, last) : null;
}

/** `.cmd` 换成垫片指向的文件；不是 `.cmd`、读不出时原样返回（探测随后报 `--version` 没有正常退出）。 */
export async function resolveCmdShim(file: string): Promise<string> {
  if (!/\.cmd$/i.test(file)) return file;
  try {
    const target = parseCmdShimTarget(await fs.readFile(file, 'utf8'), path.win32.dirname(file));
    return target && (await isExecutable(target)) ? target : file;
  } catch {
    return file;
  }
}

/** 跑 CLI 的子命令（`--version`、`auth status`）用的程序与前置参数：`.js` 入口交给 node。 */
export function nodeCliCommand(command: string): { file: string; args: string[] } {
  return /\.[cm]?js$/i.test(command) ? { file: 'node', args: [command] } : { file: command, args: [] };
}

/** 不经 shell 启动 npm CLI：Windows 的 .cmd 先还原成入口，JS 入口交给 node。 */
export async function resolveCliCommand(command: string, platform: NodeJS.Platform = process.platform): Promise<{ file: string; args: string[] }> {
  return nodeCliCommand(platform === 'win32' ? await resolveCmdShim(command) : command);
}
