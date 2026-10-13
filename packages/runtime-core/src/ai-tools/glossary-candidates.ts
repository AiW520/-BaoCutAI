/**
 * 术语候选与术语发现（创作辅助集成设计 §2.5、§3.7）。
 *
 * - **候选**：对视频转写启用的术语表，先按术语表里记下的误听写法（以及只差大小写、空格的规范写法）精确找；装了语义模型时再
 *   找语义相近的写法：字面先复核（字符相似度不低于 `aids.glossaryCharSimilarity`），再用对称编码比相似度（不低于
 *   `thresholds.glossary`）。读音近似没有做（仓库里没有拼音、音素的依赖），字符相似度代替。只给候选，不自动应用：改法是一对一
 *   的 `updateWords`（词数不变，标点原样），换不成一对一的写法不列。
 * - **发现**：拉丁字母写的专有名词（句中大写开头、夹着大写或数字）反复出现且写法不一致，或同一个写法反复出现，提示加入术语表。
 *   没有大小写的文字不判断专有名词，只做候选、不做发现。
 *
 * 阈值都是未校准的默认值（`semantic-thresholds.json`）。
 */

import { createHash } from 'node:crypto';
import type { GlossaryCandidate, GlossaryCandidatesResult, GlossaryDiscovery, GlossaryOccurrence, SemanticReason } from '@baocut/protocol';
import { SEMANTIC_THRESHOLDS } from '../space/semantic/thresholds.ts';
import { reasonOf } from '../space/semantic/errors.ts';
import type { ContextWord } from './ai-tool-prompt.ts';
import { charSimilarity, compareKey, isUnspaced, joinWords, splitPunctuation } from './text-compare.ts';

export interface GlossaryTerm {
  glossaryId: string;
  glossaryName: string;
  canonical: string;
  misheard: readonly string[];
}

export interface GlossaryInput {
  words: readonly ContextWord[];
  terms: readonly GlossaryTerm[];
  /** 对称编码（`role: 'symmetric'`）；没有或抛错时只做精确匹配，原因写进结果。 */
  embed?: (texts: string[], signal?: AbortSignal) => Promise<Float32Array[]>;
  /** 没有 `embed` 时写进结果的原因（例如没装模型）。 */
  unavailable?: SemanticReason;
  signal?: AbortSignal;
}

export type GlossaryOutput = Pick<GlossaryCandidatesResult, 'effectiveMode' | 'reason' | 'candidates' | 'discovered'>;

/** 一个窗口最多几个词。 */
const MAX_WINDOW_WORDS = 6;
/** 发现最多列几条。 */
const MAX_DISCOVERED = 20;

const AIDS = SEMANTIC_THRESHOLDS.aids;
const GLOSSARY_THRESHOLD = SEMANTIC_THRESHOLDS.thresholds.glossary.value;

interface Hit {
  term: GlossaryTerm;
  mode: 'exact' | 'semantic';
  score?: number;
  from: number;
  to: number;
}

function cosine(a: Float32Array, b: Float32Array): number {
  const n = Math.min(a.length, b.length);
  let dot = 0;
  for (let i = 0; i < n; i++) dot += a[i]! * b[i]!;
  return dot;
}

/**
 * 一串词改成规范写法、词数不变：一个词时整个换掉；规范写法按空格分出的段数与词数相同时一一对应；没有空格分词的文字按原来每个词的
 * 字数分（最后一个词拿剩下的）。换不成一对一时 null。前后标点原样留着。
 */
export function rewriteWords(words: readonly ContextWord[], canonical: string): Array<{ id: string; text: string }> | null {
  const parts = words.map((w) => splitPunctuation(w.text));
  const target = canonical.trim();
  if (!target || parts.length === 0) return null;
  let pieces: string[];
  if (parts.length === 1) pieces = [target];
  else {
    const tokens = target.split(/\s+/u);
    if (tokens.length === parts.length) pieces = tokens;
    else if (tokens.length === 1 && isUnspaced(target)) {
      const chars = [...target];
      if (chars.length < parts.length) return null;
      pieces = [];
      let at = 0;
      for (let k = 0; k < parts.length; k++) {
        const left = parts.length - k - 1;
        const size = k === parts.length - 1 ? chars.length - at : Math.max(1, Math.min([...parts[k]!.core].length, chars.length - at - left));
        pieces.push(chars.slice(at, at + size).join(''));
        at += size;
      }
    } else return null;
  }
  const out = parts.map((p, k) => ({ id: words[k]!.id, text: `${p.lead}${pieces[k]}${p.trail}` }));
  if (out.some((w) => w.text.trim() === '')) return null;
  return out;
}

function candidateId(term: GlossaryTerm, from: string): string {
  return `gc-${createHash('sha1').update(`${term.glossaryId}\u0000${term.canonical}\u0000${from}`).digest('hex').slice(0, 12)}`;
}

export async function glossaryCandidates(input: GlossaryInput): Promise<GlossaryOutput> {
  const { words, terms } = input;
  const keys = words.map((w) => compareKey(w.text));
  const cores = words.map((w) => splitPunctuation(w.text).core);
  const covered = new Uint8Array(words.length);
  const hits: Hit[] = [];

  const windowKey = (from: number, to: number) => keys.slice(from, to).join('');
  const windowText = (from: number, to: number) => joinWords(cores.slice(from, to));
  const free = (from: number, to: number) => {
    for (let i = from; i < to; i++) if (covered[i]) return false;
    return true;
  };
  const take = (hit: Hit) => {
    for (let i = hit.from; i < hit.to; i++) covered[i] = 1;
    hits.push(hit);
  };

  // 精确：术语表里记下的误听写法；规范写法本身只差大小写、空格的也算（改成规范写法）。
  const exact = new Map<string, Array<{ term: GlossaryTerm; canonical: boolean }>>();
  const canonicalKeys = new Set<string>();
  const knownKeys = new Set<string>();
  for (const term of terms) {
    const ck = compareKey(term.canonical);
    if (!ck) continue;
    canonicalKeys.add(ck);
    knownKeys.add(ck);
    const add = (key: string, canonical: boolean) => {
      if (!key) return;
      knownKeys.add(key);
      exact.set(key, [...(exact.get(key) ?? []), { term, canonical }]);
    };
    add(ck, true);
    for (const form of term.misheard) if (compareKey(form) !== ck) add(compareKey(form), false);
  }
  for (let from = 0; from < words.length; from++) {
    if (!keys[from]) continue;
    for (let len = Math.min(MAX_WINDOW_WORDS, words.length - from); len >= 1; len--) {
      const to = from + len;
      if (!keys[to - 1] || !free(from, to)) continue;
      const matches = exact.get(windowKey(from, to));
      if (!matches) continue;
      const match = matches.find((m) => !m.canonical || windowText(from, to) !== m.term.canonical.trim()) ?? null;
      if (matches.some((m) => m.canonical && windowText(from, to) === m.term.canonical.trim())) {
        // 已经是规范写法：占住，别的条目不再从这里找。
        for (let i = from; i < to; i++) covered[i] = 1;
        break;
      }
      if (match && rewriteWords(words.slice(from, to), match.term.canonical)) {
        take({ term: match.term, mode: 'exact', from, to });
        break;
      }
    }
  }

  // 语义：字面先复核，再比对称相似度。
  let effectiveMode: GlossaryOutput['effectiveMode'] = 'lexical';
  let reason: SemanticReason | null = input.embed ? null : (input.unavailable ?? 'MODEL_NOT_INSTALLED');
  const embedded = new Map<string, Float32Array>();
  if (input.embed && terms.length > 0) {
    const proposals: Array<{ term: GlossaryTerm; from: number; to: number; text: string; chars: number }> = [];
    for (const term of terms) {
      const ck = compareKey(term.canonical);
      const length = [...ck].length;
      if (length < 2) continue;
      for (let from = 0; from < words.length; from++) {
        if (!keys[from] || covered[from]) continue;
        let key = '';
        for (let to = from + 1; to <= Math.min(words.length, from + MAX_WINDOW_WORDS); to++) {
          if (covered[to - 1]) break;
          key += keys[to - 1];
          const size = [...key].length;
          if (size > length * 1.6) break;
          if (size < Math.max(2, length * 0.6) || !keys[to - 1]) continue;
          if (knownKeys.has(key)) continue;
          const chars = charSimilarity(key, ck);
          if (chars < AIDS.glossaryCharSimilarity.value) continue;
          if (!rewriteWords(words.slice(from, to), term.canonical)) continue;
          proposals.push({ term, from, to, text: windowText(from, to), chars });
        }
      }
    }
    proposals.sort((a, b) => b.chars - a.chars || a.from - b.from);
    const texts = [...new Set(proposals.map((p) => p.text))].slice(0, AIDS.glossaryMaxWindows.value);
    const allowed = new Set(texts);
    const canonicals = [...new Set(terms.map((t) => t.canonical.trim()))];
    try {
      const all = [...canonicals, ...texts];
      const vectors = all.length > canonicals.length ? await input.embed(all, input.signal) : [];
      all.forEach((text, i) => vectors[i] && embedded.set(text, vectors[i]!));
      effectiveMode = 'semantic';
      const scored = proposals
        .filter((p) => allowed.has(p.text) && embedded.has(p.text) && embedded.has(p.term.canonical.trim()))
        .map((p) => ({ ...p, score: cosine(embedded.get(p.text)!, embedded.get(p.term.canonical.trim())!) }))
        .filter((p) => p.score >= GLOSSARY_THRESHOLD)
        .sort((a, b) => b.score - a.score || a.from - b.from);
      for (const p of scored) if (free(p.from, p.to)) take({ term: p.term, mode: 'semantic', score: p.score, from: p.from, to: p.to });
    } catch (error) {
      if (input.signal?.aborted) throw error;
      reason = reasonOf(error);
    }
  }

  // 按（条目、写法）归成候选。
  const grouped = new Map<string, GlossaryCandidate>();
  for (const hit of hits.sort((a, b) => a.from - b.from)) {
    const from = windowText(hit.from, hit.to);
    const id = candidateId(hit.term, from);
    const span = words.slice(hit.from, hit.to);
    const occurrence: GlossaryOccurrence = {
      wordIds: span.map((w) => w.id),
      start: span[0]!.start,
      end: span.at(-1)!.end ?? span.at(-1)!.start,
      words: rewriteWords(span, hit.term.canonical)!,
    };
    const existing = grouped.get(id);
    if (existing) {
      existing.occurrences.push(occurrence);
      if (hit.score !== undefined) existing.score = Math.max(existing.score ?? 0, hit.score);
      continue;
    }
    grouped.set(id, {
      id,
      from,
      to: hit.term.canonical.trim(),
      glossaryId: hit.term.glossaryId,
      glossaryName: hit.term.glossaryName,
      mode: hit.mode,
      ...(hit.score !== undefined ? { score: hit.score } : {}),
      occurrences: [occurrence],
    });
  }
  const candidates = [...grouped.values()].sort(
    (a, b) => (a.mode === b.mode ? 0 : a.mode === 'exact' ? -1 : 1) || b.occurrences.length - a.occurrences.length || a.occurrences[0]!.start - b.occurrences[0]!.start,
  );

  const discovered = await discoverTerms(words, cores, knownKeys, embedded, input, effectiveMode === 'semantic');
  return { effectiveMode, reason, candidates, discovered };
}

/** 像专有名词：拉丁字母，夹着大写或数字，或者句中大写开头。 */
function nameLike(core: string, sentenceStart: boolean): boolean {
  if (!/^[\p{Script=Latin}\p{Nd}][\p{Script=Latin}\p{Nd}'’.-]*$/u.test(core) || !/\p{Script=Latin}/u.test(core)) return false;
  if (/.\p{Lu}/u.test(core) || (/\p{Nd}/u.test(core) && /\p{L}/u.test(core))) return true;
  return /^\p{Lu}/u.test(core) && !sentenceStart;
}

/** 夹着大写或数字（`iPhone`、`GPT4`）：只出现一种写法也值得提示。 */
function distinctive(core: string): boolean {
  return /.\p{Lu}/u.test(core) || (/\p{Nd}/u.test(core) && /\p{L}/u.test(core));
}

async function discoverTerms(
  words: readonly ContextWord[],
  cores: readonly string[],
  knownKeys: ReadonlySet<string>,
  embedded: Map<string, Float32Array>,
  input: GlossaryInput,
  semantic: boolean,
): Promise<GlossaryDiscovery[]> {
  const byKey = new Map<string, Map<string, number>>();
  const add = (text: string) => {
    const key = compareKey(text);
    if ([...key].length < 3 || knownKeys.has(key)) return;
    const forms = byKey.get(key) ?? new Map<string, number>();
    forms.set(text, (forms.get(text) ?? 0) + 1);
    byKey.set(key, forms);
  };
  for (let i = 0; i < words.length; i++) {
    const prev = i > 0 ? words[i - 1]!.text.trim() : '';
    const start = i === 0 || words[i]!.paragraphStart || /[.!?。！？]["'”’)]*$/u.test(prev);
    if (!nameLike(cores[i]!, start)) continue;
    // 两个词连写的名字（`Open AI`）：两个都像名字、中间没有标点。
    const next = cores[i + 1];
    if (next !== undefined && nameLike(next, false) && splitPunctuation(words[i]!.text).trail === '') {
      add(`${cores[i]} ${next}`);
    }
    add(cores[i]!);
  }
  // 两个词连写的与一个词的写法同键时合在一起；字面相近的键（字符相似度）在有语义模型时再比对称相似度后合并。
  const keys = [...byKey.keys()];
  const parent = new Map(keys.map((k) => [k, k]));
  const find = (k: string): string => {
    let r = k;
    while (parent.get(r) !== r) r = parent.get(r)!;
    parent.set(k, r);
    return r;
  };
  const top = (key: string) => [...byKey.get(key)!.entries()].sort((a, b) => b[1] - a[1])[0]![0];
  if (semantic && input.embed) {
    const pairs: Array<[string, string]> = [];
    for (let a = 0; a < keys.length; a++)
      for (let b = a + 1; b < keys.length; b++) {
        if (charSimilarity(keys[a]!, keys[b]!) >= AIDS.discoveryCharSimilarity.value) pairs.push([keys[a]!, keys[b]!]);
      }
    const need = [...new Set(pairs.flat().map(top))].filter((t) => !embedded.has(t)).slice(0, AIDS.glossaryMaxWindows.value);
    try {
      const vectors = need.length ? await input.embed(need, input.signal) : [];
      need.forEach((t, i) => vectors[i] && embedded.set(t, vectors[i]!));
      for (const [a, b] of pairs) {
        const va = embedded.get(top(a));
        const vb = embedded.get(top(b));
        if (va && vb && cosine(va, vb) >= GLOSSARY_THRESHOLD) parent.set(find(b), find(a));
      }
    } catch (error) {
      if (input.signal?.aborted) throw error;
    }
  }
  const groups = new Map<string, Map<string, number>>();
  for (const key of keys) {
    const root = find(key);
    const merged = groups.get(root) ?? new Map<string, number>();
    for (const [text, n] of byKey.get(key)!) merged.set(text, (merged.get(text) ?? 0) + n);
    groups.set(root, merged);
  }
  const out: GlossaryDiscovery[] = [];
  for (const [key, forms] of groups) {
    const list = [...forms.entries()].map(([text, count]) => ({ text, count })).sort((a, b) => b.count - a.count);
    const count = list.reduce((n, f) => n + f.count, 0);
    if (count < AIDS.discoveryMinCount.value) continue;
    if (list.length < 2 && !distinctive(list[0]!.text)) continue;
    out.push({ key, source: list[0]!.text, forms: list, count });
  }
  return out.sort((a, b) => b.forms.length - a.forms.length || b.count - a.count).slice(0, MAX_DISCOVERED);
}
