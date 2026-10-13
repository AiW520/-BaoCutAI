/*
 * 部分机制移植自 paseo（Apache-2.0，Copyright (c) 2025-present Mohamed Boudra），modified：
 * plugins/antigravity-provider/server/internal/process.ts 的启动握手、stdin prompt、关闭与恢复参数。
 * 改成 BaoCut 的本地化错误、LF 分帧与共享进程树清理；不写用户的配置，也不记录环境或 MCP 令牌。
 */
import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process';
import { killProcessTree } from '@baocut/process-host';
import { DriversCommon, DriversAcp, DriversAntigravity as M } from '@baocut/protocol/messages/agent-drivers';
import { LocalizedError } from '../driver-text.ts';
import type { AntigravityInstall } from './antigravity-binary.ts';
import { decodeAntigravityFrame, encodeAntigravityPrompt, type AntigravityFrame } from './antigravity-wire.ts';

const NAME = 'Antigravity CLI';
type Init = Extract<AntigravityFrame, { event: 'init' }>;
export interface AntigravityLaunch {
  install: AntigravityInstall;
  cwd: string;
  model: string | null;
  conversationId: string | null;
  timeoutMs?: number;
  onFrame(frame: AntigravityFrame): void;
  onError(error: Error): void;
}
export class AntigravityProcess {
  readonly ready: Promise<Init>;
  readonly #child: ChildProcessWithoutNullStreams;
  readonly #exited: Promise<void>;
  #state: 'starting' | 'ready' | 'stopping' | 'exited' = 'starting';
  #stop: Promise<void> | null = null;
  #buffer = '';
  #stderr = '';
  #deadline: NodeJS.Timeout;
  #resolveReady!: (frame: Init) => void;
  #rejectReady!: (error: Error) => void;

  readonly launch: AntigravityLaunch;
  constructor(launch: AntigravityLaunch) {
    this.launch = launch;
    const args = ['--input-format', 'stream-json', '--output-format', 'stream-json', '--add-dir', launch.cwd, '--disable-slash-commands', '--dangerously-skip-permissions'];
    if (launch.model) args.push('--model', launch.model);
    if (launch.conversationId) args.push('--conversation', launch.conversationId);
    this.ready = new Promise((resolve, reject) => { this.#resolveReady = resolve; this.#rejectReady = reject; });
    this.#child = spawn(launch.install.command, args, { cwd: launch.cwd, env: launch.install.env, detached: process.platform !== 'win32', windowsHide: true, stdio: 'pipe' });
    this.#child.stdout.setEncoding('utf8');
    this.#child.stderr.setEncoding('utf8');
    this.#child.stderr.on('data', (chunk: string) => { this.#stderr = (this.#stderr + chunk).slice(-8192); });
    this.#deadline = setTimeout(() => this.#fail(new LocalizedError(DriversCommon.timedOut({ label: NAME, seconds: (launch.timeoutMs ?? 30_000) / 1000 }))), launch.timeoutMs ?? 30_000);
    this.#child.stdout.on('data', (chunk: string) => this.#read(chunk));
    this.#child.stdin.on('error', (error) => this.#fail(error));
    this.#child.on('error', (error) => this.#fail(new LocalizedError(DriversCommon.startFailed({ name: NAME, error: error.message }))));
    this.#exited = new Promise((resolve) => this.#child.on('close', (code, signal) => {
      clearTimeout(this.#deadline);
      if (this.#buffer.trim()) this.#line(this.#buffer);
      const error = new LocalizedError(DriversAcp.exited({ name: NAME, status: String(signal ?? code), tail: this.#stderr.trim() }));
      if (this.#state === 'starting') this.#rejectReady(error);
      else if (this.#state === 'ready') launch.onError(error);
      this.#state = 'exited';
      if (process.platform !== 'win32') killProcessTree(this.#child, 'SIGKILL');
      resolve();
    }));
  }
  get active(): boolean { return this.#state === 'ready'; }
  prompt(text: string): Promise<void> {
    if (!this.active) return Promise.reject(new LocalizedError(DriversCommon.sessionNotReady({ name: NAME })));
    return new Promise((resolve, reject) => this.#child.stdin.write(encodeAntigravityPrompt(text), (error) => error ? reject(error) : resolve()));
  }
  stop(reason: 'interrupt' | 'close'): Promise<void> {
    this.#stop ??= this.#terminate(reason);
    return this.#stop;
  }
  async #terminate(reason: 'interrupt' | 'close'): Promise<void> {
    if (this.#state === 'exited') return;
    if (this.#state === 'starting') this.#rejectReady(new LocalizedError(DriversCommon.sessionClosed({ name: NAME })));
    this.#state = 'stopping';
    clearTimeout(this.#deadline);
    // Windows 必须在父进程还活着时结束整棵树，不能先关 stdin 让父进程退出。
    if (process.platform === 'win32' || reason === 'interrupt') killProcessTree(this.#child, 'SIGINT');
    else this.#child.stdin.end();
    const term = setTimeout(() => killProcessTree(this.#child, 'SIGTERM'), 1000);
    const kill = setTimeout(() => killProcessTree(this.#child, 'SIGKILL'), 2000);
    let limit: NodeJS.Timeout | undefined;
    try {
      await Promise.race([this.#exited, new Promise<never>((_, reject) => { limit = setTimeout(() => reject(new LocalizedError(DriversCommon.timedOut({ label: NAME, seconds: 5 }))), 5000); })]);
    } finally {
      clearTimeout(term); clearTimeout(kill); clearTimeout(limit);
    }
  }
  #fail(error: Error): void {
    if (this.#state === 'exited' || this.#state === 'stopping') return;
    const starting = this.#state === 'starting';
    this.#state = 'stopping';
    clearTimeout(this.#deadline);
    killProcessTree(this.#child, 'SIGKILL');
    if (starting) this.#rejectReady(error);
    else this.launch.onError(error);
  }
  #read(chunk: string): void {
    this.#buffer += chunk;
    let newline: number;
    while ((newline = this.#buffer.indexOf('\n')) !== -1) {
      const line = this.#buffer.slice(0, newline).replace(/\r$/, '');
      this.#buffer = this.#buffer.slice(newline + 1);
      this.#line(line);
    }
    if (this.#buffer.length > 16 * 1024 * 1024) this.#fail(new LocalizedError(M.invalidOutput()));
  }
  #line(line: string): void {
    if (!line.trim() || this.#state === 'stopping' || this.#state === 'exited') return;
    if (line.length > 16 * 1024 * 1024) return this.#fail(new LocalizedError(M.invalidOutput()));
    try {
      const frame = decodeAntigravityFrame(line);
      if (this.#state === 'starting') {
        if (frame.event === 'init') {
          clearTimeout(this.#deadline); this.#state = 'ready'; this.#resolveReady(frame);
        } else if (frame.event === 'result') this.#fail(frame.result.error ? new Error(frame.result.error) : new LocalizedError(M.turnFailed()));
        return;
      }
      this.launch.onFrame(frame);
    } catch (error) { this.#fail(error instanceof Error ? error : new LocalizedError(M.invalidOutput())); }
  }
}
