/*
 * 部分机制移植自 paseo（Apache-2.0，Copyright (c) 2025-present Mohamed Boudra），modified：
 * plugins/antigravity-provider/server/internal/session.ts 的多轮生命周期、模型变更重启、恢复和累计拒绝去重。
 * 改为 BaoCut 的 AgentSession，输入图片使用本机路径，拒绝非完全访问；临时 MCP 注入未验证，只发明确提示。
 */
import { agentModeLabel, newId, RpcError, type Id } from '@baocut/protocol';
import { DriversCommon, DriversAntigravity as M } from '@baocut/protocol/messages/agent-drivers';
import type { AgentEvent, AgentInput, AgentPersistenceHandle, AgentSession, ApprovalResponse, CreateSessionOptions, InterruptReceipt, Logger, TurnOutcome, TurnSettings } from '@baocut/harness';
import { errorRefField, LocalizedError, refField } from '../driver-text.ts';
import { agentError } from '../acp/acp-session.ts';
import type { AntigravityInstall } from './antigravity-binary.ts';
import { AntigravityProcess } from './antigravity-process.ts';
import { AntigravityItems } from './antigravity-items.ts';
import type { AntigravityFrame } from './antigravity-wire.ts';

const NAME = 'Antigravity CLI';
export const ANTIGRAVITY_CAPABILITIES = { steer: false, approvals: false, resume: true, images: true } as const;
export function checkAntigravitySettings(settings: TurnSettings): void {
  if (settings.accessMode !== 'fullAccess') throw agentError('invalid-request', M.fullAccessOnly({ mode: agentModeLabel('fullAccess') }), 'AGENT_ACCESS_MODE_UNSUPPORTED');
  if (settings.effort !== null) throw new RpcError('invalid-request', M.effortUnsupported());
}
interface Turn { id: string; items: AntigravityItems }
export class AntigravitySession implements AgentSession {
  readonly id: Id = newId('session');
  readonly capabilities = ANTIGRAVITY_CAPABILITIES;
  readonly #listeners = new Set<(event: AgentEvent) => void>();
  #early: AgentEvent[] | null = [];
  #process: AntigravityProcess | null = null;
  #conversationId: string | null = null;
  #model: string | null = null;
  #firstMessage = true;
  #turn: Turn | null = null;
  #starting = false;
  #closed = false;
  #closing: Promise<void> | null = null;
  #retiring: Promise<void> | null = null;
  #interrupting: Promise<InterruptReceipt> | null = null;
  readonly #denials = new Map<string, number>();

  readonly install: AntigravityInstall;
  readonly options: CreateSessionOptions;
  readonly log: Logger;
  readonly timeoutMs: number;
  private constructor(install: AntigravityInstall, options: CreateSessionOptions, log: Logger, timeoutMs: number) {
    this.install = install; this.options = options; this.log = log; this.timeoutMs = timeoutMs;
    if (options.resume) {
      const data = options.resume.data as { version?: unknown; conversationId?: unknown } | null;
      if (options.resume.driverId !== 'antigravity' || data?.version !== 1 || typeof data.conversationId !== 'string' || !data.conversationId) throw new LocalizedError(M.resumeMismatch());
      this.#conversationId = data.conversationId;
      this.#firstMessage = false;
    }
  }
  static async start(install: AntigravityInstall, options: CreateSessionOptions, log: Logger, timeoutMs = 30_000): Promise<AntigravitySession> {
    checkAntigravitySettings(options);
    if (options.confinement) throw new RpcError('driver-unavailable', DriversCommon.confinedUnsupported({ name: NAME }));
    const session = new AntigravitySession(install, options, log.child('antigravity'), timeoutMs);
    try {
      await session.#ensureProcess(options.model);
      if (Object.keys(options.mcpServers ?? {}).length) {
        const message = M.mcpUnavailable();
        session.#emit({ type: 'session.warning', message: String(message), ...refField('messageRef', message) });
      }
      return session;
    } catch (error) { await session.close(); throw error; }
  }
  async startTurn(input: AgentInput, settings: TurnSettings): Promise<{ turnId: string }> {
    if (this.#closed) throw new LocalizedError(DriversCommon.sessionClosed({ name: NAME }));
    if (this.#turn || this.#starting) throw new LocalizedError(DriversCommon.turnInProgress());
    checkAntigravitySettings(settings);
    this.#starting = true;
    try {
      await this.#ensureProcess(settings.model);
      if (this.#closed) throw new LocalizedError(DriversCommon.sessionClosed({ name: NAME }));
      const proc = this.#process!;
      const id = newId('turn');
      const turn: Turn = { id, items: new AntigravityItems(id, (event) => this.#emit(event)) };
      this.#turn = turn;
      this.#emit({ type: 'turn.started', turnId: id });
      // i18n-ignore-start: 给原生模型的指令与图片路径，不是产品文案。
      const images = (input.images ?? []).map((image) => `Image attachment (read this local file with view_file): ${JSON.stringify(image.path)}`).join('\n');
      let text = images ? `${input.text}\n\n${images}` : input.text;
      if (this.#firstMessage && this.options.developerInstructions) {
        const unavailable = Object.keys(this.options.mcpServers ?? {}).length ? '\nBaoCut MCP tools are not connected in this session. Do not claim that you can call them.\n' : '';
        text = `${this.options.developerInstructions}${unavailable}\n\n${text}`;
      }
      // i18n-ignore-end
      try { await proc.prompt(text); this.#firstMessage = false; }
      catch (error) { this.#failure(proc, error instanceof Error ? error : new Error(String(error))); }
      return { turnId: id };
    } finally { this.#starting = false; }
  }
  async interrupt(turnId: string): Promise<InterruptReceipt> {
    const turn = this.#turn;
    if (!turn || turn.id !== turnId) return { status: 'not-running' };
    if (this.#interrupting) return this.#interrupting;
    const stopping = this.#interruptTurn(turn);
    this.#interrupting = stopping;
    try { return await stopping; }
    finally { if (this.#interrupting === stopping) this.#interrupting = null; }
  }
  async #interruptTurn(turn: Turn): Promise<InterruptReceipt> {
    if (this.#closing) { await this.#closing; return { status: 'not-running' }; }
    const proc = this.#process;
    if (!proc) return { status: 'unknown' };
    this.#process = null;
    try {
      const stopping = proc.stop('interrupt');
      this.#retiring = stopping;
      await stopping;
      this.#finish(turn, 'interrupted');
      return { status: 'requested' };
    } catch { return { status: 'unknown' }; }
    finally { this.#retiring = null; }
  }
  async respondToApproval(_approvalId: Id, _response: ApprovalResponse): Promise<void> {}
  subscribe(listener: (event: AgentEvent) => void): () => void {
    this.#listeners.add(listener);
    const early = this.#early;
    this.#early = null;
    for (const event of early ?? []) listener(event);
    return () => this.#listeners.delete(listener);
  }
  describePersistence(): AgentPersistenceHandle | null {
    return this.#conversationId ? { driverId: 'antigravity', data: { version: 1, conversationId: this.#conversationId } } : null;
  }
  close(): Promise<void> {
    this.#closing ??= this.#shutdown();
    return this.#closing;
  }
  async #shutdown(): Promise<void> {
    if (this.#closed) return;
    this.#closed = true;
    const proc = this.#process;
    this.#process = null;
    await this.#retiring;
    await proc?.stop('close');
    if (this.#turn) this.#finish(this.#turn, 'interrupted');
  }
  async #ensureProcess(model: string | null): Promise<void> {
    await this.#retiring;
    if (this.#closed) throw new LocalizedError(DriversCommon.sessionClosed({ name: NAME }));
    if (this.#process?.active && this.#model === model) return;
    await this.#process?.stop('close');
    this.#process = null;
    const proc = new AntigravityProcess({ install: this.install, cwd: this.options.cwd, model, conversationId: this.#conversationId, timeoutMs: this.timeoutMs,
      onFrame: (frame) => this.#accept(proc, frame), onError: (error) => this.#failure(proc, error) });
    this.#process = proc;
    try {
      const init = await proc.ready;
      if (this.#closed || this.#process !== proc) throw new LocalizedError(DriversCommon.sessionClosed({ name: NAME }));
      if (this.#conversationId && init.conversation_id !== this.#conversationId) throw new LocalizedError(M.resumeMismatch());
      this.#conversationId = init.conversation_id;
      this.#model = model;
      this.#denials.clear();
    } catch (error) { if (this.#process === proc) this.#process = null; await proc.stop('interrupt'); throw error; }
  }
  #accept(proc: AntigravityProcess, frame: AntigravityFrame): void {
    const turn = this.#turn;
    if (proc !== this.#process || !turn) return;
    if (frame.event === 'step_update') {
      if (frame.step_update.conversation_id !== this.#conversationId) return this.#failure(proc, new LocalizedError(M.invalidOutput()));
      turn.items.step(frame.step_update);
    } else if (frame.event === 'result') {
      const result = frame.result;
      if (result.conversation_id !== this.#conversationId) return this.#failure(proc, new LocalizedError(M.invalidOutput()));
      const counts = new Map<string, number>();
      const fresh = result.denied_actions.filter((action) => {
        const key = JSON.stringify(action); const count = (counts.get(key) ?? 0) + 1;
        counts.set(key, count); return count > (this.#denials.get(key) ?? 0);
      });
      for (const [key, count] of counts) this.#denials.set(key, Math.max(count, this.#denials.get(key) ?? 0));
      if (fresh.length) {
        const message = M.denied({ actions: fresh.map((a) => a.display_name || a.action).join(', ') });
        this.#emit({ type: 'session.warning', message: String(message), ...refField('messageRef', message) });
      }
      const outcome = result.status === 'SUCCESS' ? 'completed' : result.error === 'interrupted' ? 'interrupted' : 'failed';
      this.#finish(turn, outcome, outcome === 'failed' ? result.error ? new Error(result.error) : new LocalizedError(M.turnFailed()) : undefined, result.response);
      if (outcome !== 'completed') this.#retire(proc);
    }
  }
  #failure(proc: AntigravityProcess, error: Error): void {
    if (proc !== this.#process) return;
    if (this.#turn) this.#finish(this.#turn, 'failed', error);
    else this.#emit({ type: 'session.error', turnId: null, message: error.message, ...errorRefField('messageRef', error), willRetry: false });
    this.#retire(proc);
  }
  #retire(proc: AntigravityProcess): void {
    if (this.#process === proc) this.#process = null;
    this.#retiring = proc.stop('interrupt');
    void this.#retiring.catch((error) => this.log.warn('Antigravity cleanup failed', { error: String(error) }));
  }
  #finish(turn: Turn, outcome: TurnOutcome, error?: Error, response = ''): void {
    if (this.#turn !== turn) return;
    turn.items.finish(outcome, response);
    this.#turn = null;
    this.#emit({ type: 'turn.completed', turnId: turn.id, outcome, error: error?.message ?? null, ...errorRefField('errorRef', error), errorCode: antigravityErrorCode(error?.message ?? '') });
  }
  #emit(event: AgentEvent): void {
    if (this.#early) { this.#early.push(event); return; }
    for (const listener of this.#listeners) {
      try { listener(event); } catch (error) { this.log.error('AgentEvent listener threw', { error: String(error) }); }
    }
  }
}
export function antigravityErrorCode(text: string) {
  if (/auth|sign.in|log.in|\b401\b|invalid.api.key/i.test(text)) return 'AGENT_AUTH_REQUIRED' as const;
  if (/rate.?limit|too many requests|\b429\b/i.test(text)) return 'AGENT_RATE_LIMITED' as const;
  if (/billing|credit|quota|\b402\b/i.test(text)) return 'AGENT_BILLING_REQUIRED' as const;
  if (/model.*(not found|unavailable|unsupported|invalid)/i.test(text)) return 'AGENT_MODEL_UNAVAILABLE' as const;
  return null;
}
