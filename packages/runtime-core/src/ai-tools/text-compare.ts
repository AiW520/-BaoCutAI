/**
 * 编辑辅助共用的字面比较（创作辅助集成设计 §3.7、§3.8）：规范化、字符相似度与数字、否定词、专有名词的提取。只做字面判断，
 * 不依赖语义模型；语义相似只排序与圈候选，这里的检查决定能不能当成「同一个」。
 */

/** 比较用的键：NFKC、小写、去掉标点与空白（文稿原文不改，只在比较时用）。 */
export function compareKey(text: string): string {
  return text
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[\p{P}\p{S}\s]+/gu, '');
}

/** 词的文字拆成前置标点、正文与后置标点（改写时只换正文，标点原样留着）。 */
export function splitPunctuation(text: string): { lead: string; core: string; trail: string } {
  const m = /^([\p{P}\p{S}\s]*)(.*?)([\p{P}\p{S}\s]*)$/su.exec(text)!;
  return { lead: m[1]!, core: m[2]!, trail: m[3]! };
}

/** 编辑距离（按 Unicode 码点）。 */
export function editDistance(a: string, b: string): number {
  const x = [...a];
  const y = [...b];
  if (x.length === 0) return y.length;
  if (y.length === 0) return x.length;
  let prev = Array.from({ length: y.length + 1 }, (_, i) => i);
  for (let i = 1; i <= x.length; i++) {
    const row = [i];
    for (let j = 1; j <= y.length; j++) row[j] = Math.min(prev[j]! + 1, row[j - 1]! + 1, prev[j - 1]! + (x[i - 1] === y[j - 1] ? 0 : 1));
    prev = row;
  }
  return prev[y.length]!;
}

/** 字符相似度 1 − 编辑距离 / 较长的长度（0–1）；两边都空时 1。 */
export function charSimilarity(a: string, b: string): number {
  const longest = Math.max([...a].length, [...b].length);
  return longest === 0 ? 1 : 1 - editDistance(a, b) / longest;
}

/** 没有空格分词的文字（中文、日文、泰文等）：词与词直接连写。 */
const UNSPACED = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Thai}\p{Script=Lao}\p{Script=Khmer}\p{Script=Myanmar}]/u;

export function isUnspaced(text: string): boolean {
  return UNSPACED.test(text);
}

/** 一串词连成文字：没有空格分词的文字之间不加空格。 */
export function joinWords(texts: readonly string[]): string {
  let out = '';
  for (const raw of texts) {
    const text = raw.trim();
    if (!text) continue;
    if (out && !(isUnspaced(out.at(-1)!) && isUnspaced(text[0]!))) out += ' ';
    out += text;
  }
  return out;
}

// ---- 重录的差异检查（§3.8）----

/**
 * 否定词：各语言的词表合在一起用（不知道语言、或一句里夹着几种语言时也成立）。多认出一个否定词只会让两遍被列进
 * 「相似但有差异」，不会被当成重复剪掉，偏向保守。
 */
const NEGATION_WORDS = new Set([
  // en
  'not', 'no', 'never', 'none', 'nothing', 'nobody', 'neither', 'nor', "n't", 'cannot', "can't", "don't", "doesn't", "didn't", "won't", "isn't", "aren't", "wasn't", "weren't", "shouldn't", "wouldn't", "couldn't", "haven't", "hasn't", "hadn't",
  // de nl
  'nicht', 'kein', 'keine', 'keinen', 'nie', 'niemals', 'niet', 'geen', 'nooit',
  // fr es it pt
  'ne', 'pas', 'jamais', 'aucun', 'aucune', 'nunca', 'nada', 'ningún', 'ninguna', 'non', 'mai', 'nessuno', 'não', 'nem', 'nenhum',
  // pl ru tr vi
  'nie', 'żaden', 'не', 'нет', 'ни', 'никогда', 'değil', 'yok', 'hiç', 'không', 'chưa', 'chẳng',
]);
/** 没有空格分词的文字里的否定：按子串数。 */
// i18n-ignore: 比对用的各语言否定词，不是界面文字
const NEGATION_PIECES = ['不', '没', '沒', '别', '別', '未', '无', '無', '非', '勿', '莫', 'ない', 'ません', 'なかった', '안', '못', '않', '없'];

const NUMBER_WORDS = new Set([
  'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety', 'hundred', 'thousand', 'million', 'billion', 'percent',
]);

export interface LiteralFeatures {
  number: string[];
  negation: string[];
  name: string[];
}

/**
 * 一句里的数字（阿拉伯数字、中文数字、英文数词）、否定词与专有名词（拉丁字母里句中大写开头或夹着大写、数字的词；没有大小写的
 * 文字不判断专有名词）。
 */
export function literalFeatures(text: string): LiteralFeatures {
  const normalized = text.normalize('NFKC');
  const number = [...(normalized.match(/\p{Nd}+(?:[.,]\p{Nd}+)*|[零〇一二两兩三四五六七八九十百千万萬亿億]+/gu) ?? [])];
  const negation: string[] = [];
  const name: string[] = [];
  // 拉丁字母（含数字、撇号）的词；没有空格分词的文字里夹着的英文词也单独取出来。
  const runs = [...normalized.matchAll(/[\p{Script=Latin}\p{Nd}][\p{Script=Latin}\p{Nd}'’-]*/gu)];
  runs.forEach((match, index) => {
    const core = match[0].replace(/['’-]+$/u, '');
    if (!core) return;
    const lower = core.toLowerCase().replace(/’/g, "'");
    if (NUMBER_WORDS.has(lower)) number.push(lower);
    if (NEGATION_WORDS.has(lower) || lower.endsWith("n't")) negation.push(lower.endsWith("n't") ? "n't" : lower);
    if (/\p{Lu}/u.test(core)) {
      const inner = /.\p{Lu}|\p{Nd}/u.test(core);
      const before = normalized.slice(0, match.index).trimEnd();
      const sentenceStart = index === 0 || before === '' || /[.!?。！？]$/u.test(before);
      if (inner || !sentenceStart) name.push(core);
    }
  });
  for (const piece of NEGATION_PIECES) {
    let from = 0;
    for (;;) {
      const at = normalized.indexOf(piece, from);
      if (at < 0) break;
      negation.push(piece);
      from = at + piece.length;
    }
  }
  return { number, negation, name };
}

/** 多重集：`a` 里有、`b` 里不够数的值。 */
export function missingFrom(a: readonly string[], b: readonly string[]): string[] {
  const left = new Map<string, number>();
  for (const v of b) left.set(v, (left.get(v) ?? 0) + 1);
  const out: string[] = [];
  for (const v of a) {
    const n = left.get(v) ?? 0;
    if (n > 0) left.set(v, n - 1);
    else out.push(v);
  }
  return out;
}

/** 句末有终止标点（各语言的句号、问号、叹号、省略号不算）。 */
export function endsSentence(text: string): boolean {
  if (/(\.\.\.|…)["'”’）)\]」』]*$/u.test(text.trim())) return false;
  return /[.!?。！？؟।]["'”’）)\]」』]*$/u.test(text.trim());
}
