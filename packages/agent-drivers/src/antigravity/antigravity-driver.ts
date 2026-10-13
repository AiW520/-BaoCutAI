/*
 * 部分机制移植自 paseo（Apache-2.0，Copyright (c) 2025-present Mohamed Boudra），modified：
 * plugins/antigravity-provider/server/internal/catalog.ts 的最低版本与 agy models 的制表符目录。
 * 改成 BaoCut 的 DriverProbe、跨平台安装说明与 AgentSession；不把模型目录或凭据文件存在当作登录证据。
 */
import { execFile } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import { promisify } from 'node:util';
import { driverAvailability, nowIso, refOf, type DriverModel, type DriverProbe, type DriverState } from '@baocut/protocol';
import { DriversCommon, DriversAcp, DriversAntigravity as M } from '@baocut/protocol/messages/agent-drivers';
import type { AgentDriver, AgentSession, CreateSessionOptions, DriverDescription, Logger, ProbeOptions } from '@baocut/harness';
import { LocalizedError, officialScript, refField, textOf, type DriverText } from '../driver-text.ts';
import { compareVersions } from '../login-shell.ts';
import { agentError } from '../acp/acp-session.ts';
import { antigravityAt, locateAntigravity, type AntigravityInstall } from './antigravity-binary.ts';
import { AntigravitySession, ANTIGRAVITY_CAPABILITIES, antigravityErrorCode } from './antigravity-session.ts';

const run = promisify(execFile);
export const ANTIGRAVITY_MIN_VERSION = '1.1.15';
export function antigravityInstallCommand(platform: NodeJS.Platform): string {
  return platform === 'win32' ? 'irm https://antigravity.google/cli/install.ps1 | iex' : 'curl -fsSL https://antigravity.google/cli/install.sh | bash';
}
export function parseAntigravityModels(output: string): DriverModel[] {
  const seen = new Set<string>();
  const rows = output.trim().split(/\r?\n/);
  if (!output.trim()) throw new LocalizedError(M.invalidModels());
  return rows.map((row) => {
    const [id, label, ...extra] = row.split('\t');
    if (!id || !label || extra.length || seen.has(id)) throw new LocalizedError(M.invalidModels());
    seen.add(id);
    return { id, label, description: null, tier: /flash/i.test(id) ? 'balanced' : null, isDefault: false, efforts: [], defaultEffort: null };
  });
}
export interface AntigravityDriverOptions {
  locate?: () => Promise<AntigravityInstall | null>;
  timeoutMs?: number;
}
export class AntigravityDriver implements AgentDriver {
  readonly id = 'antigravity';
  readonly verified = true;
  readonly tested = false;
  readonly slowProbe = true;
  readonly #locate: () => Promise<AntigravityInstall | null>;
  readonly #timeout: number;
  readonly log: Logger;
  constructor(log: Logger, options: AntigravityDriverOptions = {}) {
    this.log = log;
    this.#locate = options.locate ?? locateAntigravity;
    this.#timeout = options.timeoutMs ?? 30_000;
  }
  describe(): DriverDescription {
    const plan = DriversAcp.geminiPlan();
    return { id: this.id, name: 'Antigravity CLI', command: 'agy', minVersion: ANTIGRAVITY_MIN_VERSION,
      plan: String(plan), planRef: refOf(plan), loginCommand: 'agy',
      install: [officialScript(antigravityInstallCommand(process.platform), 'agy update')],
      verified: this.verified, tested: this.tested, capabilities: ANTIGRAVITY_CAPABILITIES };
  }
  async probe(options: ProbeOptions = {}): Promise<DriverProbe> {
    const install = options.executable ? await antigravityAt(options.executable) : await this.#locate();
    const base = { ...this.describe(), version: install?.version ?? null, latestVersion: null, account: null,
      executable: install?.command ?? options.executable ?? null,
      realExecutable: install ? await fs.realpath(install.command).catch(() => null) : null,
      models: [] as DriverModel[], configModel: null, configModelKnown: null, checkedAt: nowIso() };
    const result = (state: Exclude<DriverState, 'disabled'>, detail: DriverText | null, models: DriverModel[] = []): DriverProbe =>
      ({ ...base, state, ...driverAvailability(state), detail: textOf(detail), ...refField('detailRef', detail), models });
    if (!install) return result('not-installed', options.executable
      ? DriversCommon.executableMissing({ command: 'agy', path: options.executable })
      : DriversCommon.commandMissing({ command: 'agy', hint: DriversCommon.installItFirst() }));
    if (!install.version) return result('error', DriversCommon.versionFailed({ command: install.command }));
    if (compareVersions(install.version, ANTIGRAVITY_MIN_VERSION) < 0) return result('outdated', DriversCommon.outdated({ name: base.name, version: install.version, min: ANTIGRAVITY_MIN_VERSION }));
    try {
      // 只问模型目录，不发送 prompt、不触发模型调用；登录结果取 CLI 原话，不读取或复制凭据。
      const { stdout } = await run(install.command, ['models'], { env: install.env, cwd: install.env.HOME ?? install.env.USERPROFILE ?? os.homedir(), timeout: this.#timeout, maxBuffer: 4 * 1024 * 1024, windowsHide: true });
      return result('ready', null, parseAntigravityModels(stdout));
    } catch (error) {
      const raw = error as Error & { stderr?: string };
      const detail = raw.stderr?.trim() || raw.message;
      if (antigravityErrorCode(detail) === 'AGENT_AUTH_REQUIRED') {
        return result('signed-out', DriversAcp.signedOut({ name: base.name, login: DriversAcp.loginViaTerminal({ command: 'agy' }), detail: '' }));
      }
      return result('error', error instanceof LocalizedError ? M.invalidModels() : DriversCommon.startFailed({ name: base.name, error: detail }));
    }
  }
  async createSession(options: CreateSessionOptions): Promise<AgentSession> {
    const install = options.executable ? await antigravityAt(options.executable) : await this.#locate();
    if (!install) throw agentError('driver-unavailable', DriversCommon.commandNotFound({ command: 'agy' }), 'AGENT_NOT_INSTALLED');
    if (!install.version || compareVersions(install.version, ANTIGRAVITY_MIN_VERSION) < 0) throw agentError('driver-unavailable', DriversCommon.outdated({ name: 'Antigravity CLI', version: install.version ?? '', min: ANTIGRAVITY_MIN_VERSION }), 'AGENT_OUTDATED');
    return AntigravitySession.start(install, options, this.log, this.#timeout);
  }
}
