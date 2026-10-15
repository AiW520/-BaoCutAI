// i18n-ignore-file: 拒绝与错误的说明给智能体与运行日志看（编辑器按 code 显示自己的文字）
/**
 * 字符 id：`<会话前缀>.<序号>`，如 `m5j4zwj66w6.505`。块 id 与字符 id 共用同一个计数器；
 * 编辑器经 `create session` 拿到前缀后自己分配，服务端补发时用文档自己的补发会话。
 */
import { randomInt } from 'node:crypto';

export type CharId = string;

export interface ParsedCharId {
  session: string;
  clock: number;
}

/** 会话前缀：字母数字与 `_` `-`，不含 `.`。 */
const SESSION = /^[A-Za-z0-9_-]{1,64}$/;

export function parseCharId(id: CharId): ParsedCharId | undefined {
  const dot = id.lastIndexOf('.');
  if (dot <= 0) return undefined;
  const session = id.slice(0, dot);
  const digits = id.slice(dot + 1);
  if (!SESSION.test(session) || !/^\d{1,15}$/.test(digits)) return undefined;
  return { session, clock: Number(digits) };
}

export function isCharId(id: unknown): id is CharId {
  return typeof id === 'string' && parseCharId(id) !== undefined;
}

export function formatCharId(session: string, clock: number): CharId {
  return `${session}.${clock}`;
}

/** `b` 是否正好是 `a` 的下一个 id（同一会话、序号 +1），用于把逐字 id 压缩成连续文本段。 */
export function isNextCharId(a: CharId, b: CharId): boolean {
  const left = parseCharId(a);
  const right = parseCharId(b);
  return !!left && !!right && left.session === right.session && right.clock === left.clock + 1;
}

/** 从 `first` 开始连续分配 `count` 个 id。 */
export function charIdRange(first: CharId, count: number): CharId[] {
  const parsed = parseCharId(first);
  if (!parsed) throw new Error(`非法字符 id：${first}`);
  return Array.from({ length: count }, (_, offset) => formatCharId(parsed.session, parsed.clock + offset));
}

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789';

/** 新的会话前缀：11 位小写字母数字、字母开头，与原版服务的格式一致。 */
export function newSessionPrefix(): string {
  let prefix = ALPHABET[randomInt(26)]!;
  while (prefix.length < 11) prefix += ALPHABET[randomInt(ALPHABET.length)];
  return prefix;
}
