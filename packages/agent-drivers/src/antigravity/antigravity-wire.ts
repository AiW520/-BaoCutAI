/*
 * 部分机制移植自 paseo（Apache-2.0，Copyright (c) 2025-present Mohamed Boudra），modified：
 * plugins/antigravity-provider/server/internal/wire.ts 的 stream-json 帧与输入格式。
 * 改用显式字段校验与 BaoCut 的本地化错误，不引入 Paseo 的 Provider ABI 或 zod 依赖。
 */
import { DriversAntigravity as M } from '@baocut/protocol/messages/agent-drivers';
import { LocalizedError } from '../driver-text.ts';

export interface AntigravityStep {
  conversation_id: string;
  step_index: number;
  state: 'ACTIVE' | 'DONE' | 'ERROR';
  step_type: string;
  text_delta: string;
  tool_name: string;
  tool_info: { name: string; parameters: Record<string, unknown>; output: string; error: { message: string } | null } | null;
  subagent_info: unknown;
}
export type AntigravityFrame =
  | { event: 'init'; conversation_id: string; init: { model: string | null } }
  | { event: 'step_update'; step_update: AntigravityStep }
  | { event: 'result'; result: { conversation_id: string; status: 'SUCCESS' | 'ERROR'; response: string; error: string; denied_actions: { action: string; display_name: string }[] } };

function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new LocalizedError(M.invalidOutput());
  return value as Record<string, unknown>;
}
function string(value: unknown, fallback?: string): string {
  if (value === undefined && fallback !== undefined) return fallback;
  if (typeof value !== 'string') throw new LocalizedError(M.invalidOutput());
  return value;
}
export function decodeAntigravityFrame(line: string): AntigravityFrame {
  let raw: Record<string, unknown>;
  try { raw = record(JSON.parse(line)); } catch { throw new LocalizedError(M.invalidOutput()); }
  if (raw.event === 'init') {
    const id = string(raw.conversation_id);
    if (!id) throw new LocalizedError(M.invalidOutput());
    const init = record(raw.init);
    return { event: 'init', conversation_id: id, init: { model: init.model == null ? null : string(init.model) } };
  }
  if (raw.event === 'result') {
    const r = record(raw.result);
    if (r.status !== 'SUCCESS' && r.status !== 'ERROR') throw new LocalizedError(M.invalidOutput());
    const denied = r.denied_actions ?? [];
    if (!Array.isArray(denied)) throw new LocalizedError(M.invalidOutput());
    return { event: 'result', result: {
      conversation_id: string(r.conversation_id), status: r.status,
      response: string(r.response, ''), error: string(r.error, ''),
      denied_actions: denied.map((action) => { const a = record(action); return { action: string(a.action), display_name: string(a.display_name) }; }),
    } };
  }
  if (raw.event !== 'step_update') throw new LocalizedError(M.invalidOutput());
  const s = record(raw.step_update);
  if (typeof s.step_index !== 'number' || !Number.isSafeInteger(s.step_index) || s.step_index < 0 || !['ACTIVE', 'DONE', 'ERROR'].includes(String(s.state))) {
    throw new LocalizedError(M.invalidOutput());
  }
  const info = s.tool_info == null ? null : record(s.tool_info);
  const error = info?.error == null ? null : record(info.error);
  return { event: 'step_update', step_update: {
    conversation_id: string(s.conversation_id), step_index: s.step_index, state: s.state as AntigravityStep['state'],
    step_type: string(s.step_type), text_delta: string(s.text_delta, ''), tool_name: string(s.tool_name, ''), subagent_info: s.subagent_info ?? null,
    tool_info: info ? { name: string(info.name), parameters: record(info.parameters ?? {}), output: string(info.output, ''), error: error ? { message: string(error.message) } : null } : null,
  } };
}
export function encodeAntigravityPrompt(text: string): string {
  return `${JSON.stringify({ event: 'user', message: { content: text } })}\n`;
}
