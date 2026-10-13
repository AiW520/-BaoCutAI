/*
 * 部分机制移植自 paseo（Apache-2.0，Copyright (c) 2025-present Mohamed Boudra），modified：
 * plugins/antigravity-provider/server/internal/session.ts 与 timeline.ts 的 step_index、工具分类和累计拒绝记录。
 * 改成 BaoCut 的 AgentItem 增量事件；原生写操作没有文件内容或 diff 时保留 null，不伪造修改内容。
 */
import type { AgentEvent, AgentItem, TurnOutcome } from '@baocut/harness';
import { DriversAntigravity as M } from '@baocut/protocol/messages/agent-drivers';
import type { AntigravityStep } from './antigravity-wire.ts';

type ToolItem = Extract<AgentItem, { kind: 'tool-call' }>;
export class AntigravityItems {
  readonly #items = new Map<string, AgentItem>();
  #hasResponse = false;
  readonly turnId: string;
  readonly emit: (event: AgentEvent) => void;
  constructor(turnId: string, emit: (event: AgentEvent) => void) { this.turnId = turnId; this.emit = emit; }
  step(step: AntigravityStep): void {
    const id = `${this.turnId}:${step.step_index}`;
    const previous = this.#items.get(id);
    if (step.step_type === 'agent_response') {
      if (!step.text_delta && !previous) return;
      const text = (previous?.kind === 'agent-message' ? previous.text : '') + step.text_delta;
      const item: AgentItem = { kind: 'agent-message', id, text };
      this.#hasResponse = true;
      if (!previous) this.emit({ type: 'item.started', turnId: this.turnId, item: { ...item, text: '' } });
      if (step.text_delta) this.emit({ type: 'item.delta', turnId: this.turnId, itemId: id, channel: 'text', delta: step.text_delta });
      this.#items.set(id, item);
      if (step.state !== 'ACTIVE') this.emit({ type: 'item.completed', turnId: this.turnId, item });
      return;
    }
    if (step.step_type !== 'tool' && step.step_type !== 'subagent') return;
    const info = step.tool_info;
    const parameters = info?.parameters ?? {};
    const name = info?.name || step.tool_name || 'Antigravity';
    const file = parameters.AbsolutePath ?? parameters.TargetFile;
    const fileChange = ['write_to_file', 'replace_file_content', 'multi_replace_file_content'].includes(name);
    const command = name === 'run_command' && typeof parameters.CommandLine === 'string';
    const mcp = name === 'call_mcp_tool';
    const item: ToolItem = {
      kind: 'tool-call', id, tool: command ? 'command' : fileChange ? 'file-change' : mcp ? 'mcp' : name === 'search_web' ? 'web-search' : 'other',
      title: command ? parameters.CommandLine as string : mcp ? `${parameters.ServerName ?? ''}.${parameters.ToolName ?? name}` : name,
      detail: command ? parameters.CommandLine as string : typeof file === 'string' ? file : JSON.stringify(step.subagent_info ?? parameters),
      output: step.state === 'ERROR' ? info?.error?.message ?? String(M.turnFailed()) : fileChange ? null : info?.output ?? null,
      status: step.state === 'ACTIVE' ? 'running' : step.state === 'ERROR' ? 'failed' : 'completed',
      exitCode: null, durationMs: null,
    };
    this.#items.set(id, item);
    this.emit({ type: item.status === 'running' ? 'item.started' : 'item.completed', turnId: this.turnId, item });
  }
  finish(outcome: TurnOutcome, response = ''): void {
    for (const item of this.#items.values()) {
      if (item.kind === 'tool-call' && item.status === 'running') {
        this.emit({ type: 'item.completed', turnId: this.turnId, item: { ...item, status: outcome === 'interrupted' ? 'interrupted' : 'failed' } });
      } else if (item.kind === 'agent-message') this.emit({ type: 'item.completed', turnId: this.turnId, item });
    }
    if (!this.#hasResponse && response) this.emit({ type: 'item.completed', turnId: this.turnId, item: { kind: 'agent-message', id: `${this.turnId}:response`, text: response } });
  }
}
