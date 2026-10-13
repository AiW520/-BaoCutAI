import type { Id } from '@baocut/protocol';
import type { NumberedSentence } from './ai-tool-citations.ts';

/**
 * 智能体路径的句子编号（创作辅助集成设计 §3.4「智能体路径」、§3.9）：`speech_sentences` 与 `speech_relevant` 交给智能体的每一句
 * 都带一个短编号，同一会话（或终端连接、外部客户端）里不重复；智能体写作时在段落末尾回引 `[sN]`，交付（`downloads_save`）时
 * 按这里登记过的编号校验，与直接调模型的路径同一个 `checkCitations`。
 *
 * 编号只在内存里：Runtime 重启后旧编号作废，校验时当作无效编号丢弃（段落标为推断），不会指错句子。
 */
export interface CitationRegistry {
  /** 给一批句子发编号（同一句在同一个键下再次发出时沿用原编号）。 */
  issue(key: string, sentences: readonly Omit<NumberedSentence, 'ref'>[]): NumberedSentence[];
  /** 这个键下发过的全部句子。 */
  issued(key: string): readonly NumberedSentence[];
}

/** 每个键最多记这么多句：长会话里早先发的编号失效（校验时丢弃），内存有上限。 */
const MAX_PER_KEY = 20_000;
/** 最多同时记这么多个键（会话、连接）：最久没用的先丢。 */
const MAX_KEYS = 256;

interface KeyState {
  next: number;
  byRef: Map<string, NumberedSentence>;
  /** `videoId \0 documentId \0 sentenceId \0 start` → 编号：同一处原句再次发出时沿用。 */
  bySpot: Map<string, string>;
}

export class MemoryCitationRegistry implements CitationRegistry {
  readonly #keys = new Map<string, KeyState>();

  issue(key: string, sentences: readonly Omit<NumberedSentence, 'ref'>[]): NumberedSentence[] {
    const state = this.#state(key);
    return sentences.map((sentence) => {
      const spot = spotOf(sentence.videoId, sentence.documentId, sentence.sentenceId, sentence.start);
      const known = state.bySpot.get(spot);
      const existing = known ? state.byRef.get(known) : undefined;
      if (existing) return existing;
      const numbered: NumberedSentence = { ...sentence, ref: `s${state.next++}` };
      state.byRef.set(numbered.ref, numbered);
      state.bySpot.set(spot, numbered.ref);
      if (state.byRef.size > MAX_PER_KEY) {
        const [oldest] = state.byRef.keys();
        const dropped = state.byRef.get(oldest!)!;
        state.byRef.delete(oldest!);
        state.bySpot.delete(spotOf(dropped.videoId, dropped.documentId, dropped.sentenceId, dropped.start));
      }
      return numbered;
    });
  }

  issued(key: string): readonly NumberedSentence[] {
    const state = this.#keys.get(key);
    return state ? [...state.byRef.values()] : [];
  }

  #state(key: string): KeyState {
    let state = this.#keys.get(key);
    if (state) {
      // 最近用过的排到最后。
      this.#keys.delete(key);
      this.#keys.set(key, state);
      return state;
    }
    state = { next: 1, byRef: new Map(), bySpot: new Map() };
    this.#keys.set(key, state);
    if (this.#keys.size > MAX_KEYS) {
      const [oldest] = this.#keys.keys();
      this.#keys.delete(oldest!);
    }
    return state;
  }
}

function spotOf(videoId: Id, documentId: Id, sentenceId: string, start: number): string {
  return `${videoId}\0${documentId}\0${sentenceId}\0${start.toFixed(3)}`;
}

/** 工具调用者对应的登记键：会话里的智能体按会话，终端按连接，外部服务按客户端。 */
export function citationKeyOf(principal: { kind: string; conversationId?: string; connectionId?: string; serviceId?: string; clientId?: string }): string {
  if (principal.kind === 'agent' && principal.conversationId) return `conversation:${principal.conversationId}`;
  if (principal.kind === 'local' && principal.connectionId) return `connection:${principal.connectionId}`;
  if (principal.kind === 'service') return `service:${principal.serviceId ?? ''}:${principal.clientId ?? ''}`;
  return `principal:${principal.kind}`;
}
