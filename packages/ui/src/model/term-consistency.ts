import { termMatch, termOccurs, termReplace, type Id } from '@baocut/protocol';
import { glossaryFits, type GlossaryCandidate } from './translate-setup.ts';
import { unitText, type PairRow, type TranslationBody } from './translation-doc.ts';

/*
 * 术语一致（创作辅助集成设计 §2.6、§3.7；原型 subtitle-tm.jsx `TmConflicts`）：同一份译文里，原句出现了术语表里的术语、
 * 译句却没用术语表的译法的位置。按当前译文实时算，撤销统一后会重新出现。只列知道译成了什么（`got`）的两种，精确匹配：
 *
 * - 译句里还是翻译时术语表的旧译法（`glossaryRef.terms` 记下的，与现在的不同）；
 * - 译句里原样留着原文写法（没翻）。
 *
 * 别的写法（译成了近义词、屈折变化）不列：不知道换哪几个字，统一不了。只看译文新鲜（`ok`）的句子：过期的会重译，
 * 统一它们也会悄悄去掉过期标记。
 */

export interface ConsistencyTerm {
  source: string;
  target: string;
}

const keyOf = (source: string) => source.trim().toLowerCase();

/**
 * 视频启用的翻译用术语表里的术语：按启用的次序，跳过没读出来的与方向对不上的（Runtime 翻译时同样跳过）；同一个原文写法
 * （不分大小写）只取第一条，同翻译时的去重。
 */
export function consistencyTerms(
  candidates: readonly GlossaryCandidate[],
  enabled: readonly Id[],
  source: string | null,
  target: string,
): ConsistencyTerm[] {
  const byId = new Map(candidates.map((c) => [c.id, c]));
  const seen = new Set<string>();
  const out: ConsistencyTerm[] = [];
  for (const id of enabled) {
    const content = byId.get(id)?.content;
    if (!content || !glossaryFits(content, source, target)) continue;
    for (const term of content.terms) {
      const key = keyOf(term.source);
      const want = term.target.trim();
      if (key === '' || want === '' || seen.has(key)) continue;
      seen.add(key);
      out.push({ source: term.source.trim(), target: want });
    }
  }
  return out;
}

/**
 * 翻译时记下的术语（`glossaryRef.terms`）当作要核对的术语：读不到用户库时（浏览器页面）用它。同一个原文写法只取第一条。
 * 拿它核对时只会找出没翻的原文：旧译法就是它自己。
 */
export function recordedTerms(body: TranslationBody): ConsistencyTerm[] {
  const seen = new Set<string>();
  const out: ConsistencyTerm[] = [];
  for (const t of recordedList(body)) {
    const key = keyOf(t.source);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ source: t.source.trim(), target: t.target });
  }
  return out;
}

function recordedList(body: TranslationBody): Array<{ source: string; target: string }> {
  const terms = (body.glossaryRef as { terms?: unknown } | undefined)?.terms;
  if (!Array.isArray(terms)) return [];
  return (terms as Array<{ source?: unknown; target?: unknown }>).flatMap((t) =>
    typeof t?.source === 'string' && typeof t.target === 'string' && t.source.trim() && t.target.trim() ? [{ source: t.source, target: t.target.trim() }] : [],
  );
}

/** 翻译时记下的术语译法（`glossaryRef.terms`，视频格式规范 §5.3）：原文写法（小写）→ 译法。认不出的形状当作没有。 */
function recordedTargets(body: TranslationBody): Map<string, string[]> {
  const out = new Map<string, string[]>();
  for (const t of recordedList(body)) out.set(keyOf(t.source), [...(out.get(keyOf(t.source)) ?? []), t.target]);
  return out;
}

export interface TermSpot {
  row: PairRow;
  /** 术语的原文写法。 */
  term: string;
  /** 译句里现在的写法（旧译法或没翻的原文，大小写照译句）。 */
  got: string;
  /** 术语表的译法。 */
  want: string;
}

export function termSpots(rows: readonly PairRow[], body: TranslationBody, terms: readonly ConsistencyTerm[]): TermSpot[] {
  if (!terms.length) return [];
  const recorded = recordedTargets(body);
  const out: TermSpot[] = [];
  for (const row of rows) {
    if (row.state !== 'ok' || !row.unit || !row.sentence) continue;
    const text = unitText(row.unit);
    if (!text) continue;
    for (const term of terms) {
      if (!termOccurs(term.source, row.sentence.text) || termOccurs(term.target, text)) continue;
      const old = (recorded.get(keyOf(term.source)) ?? []).find((t) => t !== term.target && termOccurs(t, text));
      const left = !old && keyOf(term.target) !== keyOf(term.source) ? termMatch(term.source, text) : null;
      if (old) out.push({ row, term: term.source, got: termMatch(old, text) ?? old, want: term.target });
      else if (left) out.push({ row, term: term.source, got: left, want: term.target });
    }
  }
  return out;
}

/** 统一之后每一句的译文：同一句的几处依次替换。 */
export function unifiedTexts(spots: readonly TermSpot[]): Array<{ row: PairRow; text: string }> {
  const byRow = new Map<string, { row: PairRow; text: string }>();
  for (const spot of spots) {
    const entry = byRow.get(spot.row.key) ?? { row: spot.row, text: unitText(spot.row.unit!) };
    entry.text = termReplace(spot.got, entry.text, spot.want);
    byRow.set(spot.row.key, entry);
  }
  return [...byRow.values()];
}
