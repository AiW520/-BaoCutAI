import type { EditOperation, GlossaryCandidate, GlossaryDiscovery, Id, RetakeGroup, RetakeTake } from '@baocut/protocol';
import type { TranscriptionTerm } from './library-glossary.ts';

/*
 * 编辑辅助的纯逻辑（创作辅助集成设计 §2.5、§2.7；原型 model-tool-semantic.js `applyTerms`、`applyRetakes`）：Runtime 的
 * `edits.glossaryCandidates` / `edits.retakeCandidates` 只给候选，用户勾了、确认了才在这里拼成一笔普通编辑。不自动应用，不预勾。
 */

/** 勾了的术语候选 → 一笔 `updateWords`（一对一的改法，词数不变）。`places` 是改了几处，`kinds` 是几个写法；没勾时为 null。 */
export function glossaryEdit(
  documentId: Id,
  candidates: readonly GlossaryCandidate[],
  checked: ReadonlySet<string>,
): { operations: EditOperation[]; places: number; kinds: number } | null {
  const picked = candidates.filter((c) => checked.has(c.id));
  if (!picked.length) return null;
  const words = new Map<Id, string>();
  let places = 0;
  for (const c of picked) {
    for (const o of c.occurrences) {
      places++;
      for (const w of o.words) words.set(w.id, w.text);
    }
  }
  return {
    operations: [{ type: 'updateWords', documentId, words: [...words].map(([id, text]) => ({ id, text })) }],
    places,
    kinds: picked.length,
  };
}

/** 勾了的候选一共几处（按钮上的数）。 */
export function checkedPlaces(candidates: readonly GlossaryCandidate[], checked: ReadonlySet<string>): number {
  return candidates.reduce((n, c) => n + (checked.has(c.id) ? c.occurrences.length : 0), 0);
}

/** 从文稿发现的术语 → 转录术语表的一条：出现最多的写法作规范写法，其余写法记成误听。 */
export function discoveredTerm(d: GlossaryDiscovery): TranscriptionTerm {
  return { canonical: d.source, misheard: d.forms.map((f) => f.text).filter((t) => t !== d.source) };
}

/** 一组里保留哪一遍：用户改过的为准，否则用建议的（越界时取最后一遍）。 */
export function keptTake(group: RetakeGroup, keepOf: Readonly<Record<string, number>>): number {
  const pick = keepOf[group.id] ?? group.keep;
  return pick >= 0 && pick < group.takes.length ? pick : group.takes.length - 1;
}

/** 确认了的组里，保留那遍之外的各遍（按时间）。 */
export function retakeCuts(groups: readonly RetakeGroup[], confirmed: ReadonlySet<string>, keepOf: Readonly<Record<string, number>>): RetakeTake[] {
  const out: RetakeTake[] = [];
  for (const g of groups) {
    if (!confirmed.has(g.id)) continue;
    const keep = keptTake(g, keepOf);
    g.takes.forEach((t, i) => {
      if (i !== keep) out.push(t);
    });
  }
  return out.sort((a, b) => a.start - b.start);
}

/** 要剪的各遍 → 文稿里词的下标（给 `cutOperations`，一笔 `addCuts`）。认不出的词 ID 跳过。 */
export function retakeWordIndexes(takes: readonly RetakeTake[], words: readonly { id: Id; index: number }[]): Set<number> {
  const byId = new Map(words.map((w) => [w.id, w.index]));
  const out = new Set<number>();
  for (const t of takes) {
    for (const id of t.wordIds) {
      const index = byId.get(id);
      if (index !== undefined) out.add(index);
    }
  }
  return out;
}

/** 一遍的长度（秒）。 */
export function takeSeconds(take: Pick<RetakeTake, 'start' | 'end'>): number {
  return Math.max(0, take.end - take.start);
}

/** 一遍的原文按这一遍独有的数字、否定词、专有名词切开，`hl` 的那几段高亮（「相似但有差异」）。 */
export function markPieces(text: string, marks: readonly string[]): Array<{ text: string; hl: boolean }> {
  const ranges: Array<[number, number]> = [];
  for (const m of marks) {
    if (!m) continue;
    let at = text.indexOf(m);
    while (at >= 0) {
      if (!ranges.some(([a, b]) => at < b && at + m.length > a)) ranges.push([at, at + m.length]);
      at = text.indexOf(m, at + m.length);
    }
  }
  ranges.sort((a, b) => a[0] - b[0]);
  const out: Array<{ text: string; hl: boolean }> = [];
  let at = 0;
  for (const [a, b] of ranges) {
    if (a > at) out.push({ text: text.slice(at, a), hl: false });
    out.push({ text: text.slice(a, b), hl: true });
    at = b;
  }
  if (at < text.length) out.push({ text: text.slice(at), hl: false });
  return out;
}
