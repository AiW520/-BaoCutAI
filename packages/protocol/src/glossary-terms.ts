/*
 * 翻译用术语表的写法比较（架构设计 §7.9；创作辅助集成设计 §3.7「术语一致」）：写译文的 Worker、核对译文的 Runtime 与
 * 界面用同一份实现，判断「出现」与「替换」的边界一致。
 */

/**
 * BCP 47 标签是否相配：相同，或一个是另一个在子标签边界上的前缀（`en` 与 `en-US` 相配，`zh-Hans` 与 `zh-Hant` 不配）。
 */
export function languageMatches(a: string, b: string): boolean {
  const x = a.toLowerCase();
  const y = b.toLowerCase();
  return x === y || x.startsWith(`${y}-`) || y.startsWith(`${x}-`);
}

const LATIN_TERM = /^[\p{Script=Latin}\d][\p{Script=Latin}\d .'’&+-]*$/u;

/** 写法的匹配规则：拉丁写法落在词边界上、不分大小写；其他按子串、不分大小写。空写法 null。 */
function termPattern(term: string, flags: string): RegExp | null {
  const needle = term.trim();
  if (needle === '') return null;
  const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if (LATIN_TERM.test(needle)) return new RegExp(`(?<![\\p{Script=Latin}\\d])${escaped}(?![\\p{Script=Latin}\\d])`, `iu${flags}`);
  return new RegExp(escaped, `iu${flags}`);
}

/**
 * 写法是否出现在文本里：不分大小写；只由拉丁字母、数字与常见连接符组成的写法要落在词边界上（`AI` 不匹配 `said`），
 * 其他（中文等）按子串。
 */
export function termOccurs(term: string, text: string): boolean {
  return termPattern(term, '')?.test(text) ?? false;
}

/** 文本里第一处出现的写法的原样（大小写照文本）；没有时 null。 */
export function termMatch(term: string, text: string): string | null {
  return termPattern(term, '')?.exec(text)?.[0] ?? null;
}

/** 把文本里出现的写法（按 `termOccurs` 的规则）全部换成 `replacement`。 */
export function termReplace(term: string, text: string, replacement: string): string {
  const pattern = termPattern(term, 'g');
  return pattern ? text.replace(pattern, () => replacement) : text;
}
