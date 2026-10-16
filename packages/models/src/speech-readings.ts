/**
 * TTS 合成前的读音注记 `<表面|读音>`（架构设计 §6.1「读音标注」）：解析、去注记、原样拼回，以及按模型包的 `readings`
 * 把注记渲染成引擎要的文字。移植自原 Model Worker 的 `synthesize/readings/syntax.rs`；词组表、按同音字或行内拼音改写的
 * 渲染随旧引擎删掉了，现在只有两种：`annotated`（IndexTTS 2.5，原样交给 audio.cpp）与 `unsupported`（按表面文字合成，
 * 注记如实报成没念）。
 *
 * 读音是拼音，一个注记可以盖一个字或一个词，多字读音用空格分（`<银行|yin2 hang2>`），读音数必须等于表面字数。
 * 每个音节两种写法都收，可以在同一个注记里混用（`<银行|yín hang2>`）：
 *
 * - 声调数字：ASCII 字母 + `1`–`5`（`hang2`，轻声 `5`），ü 写 `v` 或 `ü`；
 * - 带调拼音：声调标在元音上（`háng`、`lǜ`），不标调就是轻声（`le` → `le5`），ü 可以不带调（`nü` → `nv5`）。
 *   只认预组合字符（`á`、`ǘ`，以及 `ń ň ǹ ḿ`），不认组合附加符；一个音节两个调号、调号与声调数字同时出现都不合法。
 *
 * 解析时一律规范成声调数字的写法：大小写不分（统一成小写），`ü` 折成 `v`，j / q / x / y 后的 `v` 折成 `u`
 * （与 pypinyin `Style.TONE3` 同形）。音节只按形状判断（去调后 1–6 个字母、含元音或是 `m n ng hm hng`），不对照拼音音节表。
 *
 * 只有表面含汉字、读音只由 ASCII 字母数字、空格、`ü` 与带调元音组成的尖括号才可能是拼音注记：
 * 读音里有声调数字或调号的，读音不合法时整条按字面留在表面文字里并记进 `malformed`；既没有数字也没有调号的（`<了|le>`）
 * 只在整条合法时才是注记，否则（`<中文|Chinese>`）按字面保留、不报。别的尖括号（英文 ARPAbet、日文假名、不成对的 `<`）
 * 一律按字面保留、不报。偏移一律按 Unicode 码点算。
 */

import type { SpeechReadings } from '@baocut/protocol';

/** 注记的来源：手写的都是 `user`；其余几种来自上游的自动注音（词组表、字典默认、LLM），这里原样转报。 */
export type ReadingOrigin = 'user' | 'phrase' | 'dict' | 'llm';

/** 一条注记：表面文字 `[start, end)`（码点偏移）读作 `reading`。 */
export interface SpeechReading {
  start: number;
  end: number;
  /** 规范化后的读音，多字用单个空格分（`yin2 hang2`）；畸形注记是原文读音。 */
  reading: string;
  origin: ReadingOrigin;
}

/** 一条没念出来的读音注记：去注记后的文字里 `[start, end)` 原本要读作 `reading`。 */
export type DroppedReading = SpeechReading;

/** 解析结果：去注记后的表面文字与落在它上面的注记。 */
export interface AnnotatedText {
  surface: string;
  /** 按 `start` 升序、互不重叠。 */
  readings: SpeechReading[];
  /** 看得出是拼音注记但读音不合法的，按字面留在 `surface` 里；偏移指向其中的表面文字。 */
  malformed: SpeechReading[];
}

/** 渲染给引擎的文字与没能按注记念的部分（按 `start` 升序）。 */
export interface RenderedReadings {
  text: string;
  dropped: DroppedReading[];
}

/** 解析 `<表面|读音>` 注记；手写的一律记 `user`。 */
export function parseReadings(text: string): AnnotatedText {
  const out: AnnotatedText = { surface: '', readings: [], malformed: [] };
  if (!text.includes('<')) {
    out.surface = text;
    return out;
  }
  const chars = Array.from(text);
  let surface = '';
  let surfaceLen = 0;
  let i = 0;
  while (i < chars.length) {
    const found = chars[i] === '<' ? bracket(chars, i) : null;
    if (found) {
      const [bar, close] = found;
      const face = chars.slice(i + 1, bar);
      const raw = chars.slice(bar + 1, close).join('');
      if (isPinyinAttempt(face, raw)) {
        const reading = normalize(raw, face.length);
        if (reading === null && !hasTone(raw)) {
          // 不带声调的读音（`<中文|Chinese>`）不合法时不像拼音注记：字面、不报。
          surface += chars[i];
          surfaceLen += 1;
          i += 1;
          continue;
        }
        if (reading !== null) {
          out.readings.push({ start: surfaceLen, end: surfaceLen + face.length, reading, origin: 'user' });
          surface += face.join('');
          surfaceLen += face.length;
        } else {
          out.malformed.push({ start: surfaceLen + 1, end: surfaceLen + 1 + face.length, reading: raw, origin: 'user' });
          surface += chars.slice(i, close + 1).join('');
          surfaceLen += close + 1 - i;
        }
        i = close + 1;
        continue;
      }
    }
    surface += chars[i];
    surfaceLen += 1;
    i += 1;
  }
  out.surface = surface;
  return out;
}

/** 去掉注记，只留表面文字（`<行|xing2>` → `行`）。 */
export function stripReadings(text: string): string {
  return text.includes('<') ? parseReadings(text).surface : text;
}

/** 把注记原样拼回 `<表面|读音>`（IndexTTS 2.5 直接吃这个语法）；`parseReadings(readingsToText(a))` 与 `a` 相等。 */
export function readingsToText(annotated: AnnotatedText): string {
  const chars = Array.from(annotated.surface);
  let out = '';
  let index = 0;
  for (const reading of annotated.readings) {
    out += chars.slice(index, reading.start).join('');
    out += `<${chars.slice(reading.start, reading.end).join('')}|${reading.reading}>`;
    index = reading.end;
  }
  return out + chars.slice(index).join('');
}

/**
 * 按模型包的读音能力把文字渲染成引擎要的写法。没有注记时原样返回；畸形注记一律报成没念。
 * - `annotated`：注记原样拼回（畸形注记按字面留在文字里，与原来一致）；
 * - 其余：表面文字，畸形注记只留表面那几个字（括号与读音不送给引擎），注记整条报成没念。
 */
export function renderReadings(text: string, support: SpeechReadings): RenderedReadings {
  if (!text.includes('<')) return { text, dropped: [] };
  const annotated = parseReadings(text);
  if (annotated.readings.length === 0 && annotated.malformed.length === 0) return { text, dropped: [] };
  const dropped = [...annotated.malformed];
  let rendered: string;
  if (support === 'annotated') {
    rendered = readingsToText(annotated);
  } else {
    rendered = surfaceWithoutMalformed(annotated);
    dropped.push(...annotated.readings);
  }
  dropped.sort((a, b) => a.start - b.start);
  return { text: rendered, dropped };
}

/** 表面文字去掉畸形注记的字面括号与读音（`<`、`|读音>`），只留表面那几个字。 */
function surfaceWithoutMalformed(annotated: AnnotatedText): string {
  const chars = Array.from(annotated.surface);
  const skip = new Array<boolean>(chars.length).fill(false);
  for (const m of annotated.malformed) {
    const tail = m.end + 2 + Array.from(m.reading).length;
    if (m.start >= 1 && tail <= chars.length) {
      skip[m.start - 1] = true;
      skip.fill(true, m.end, tail);
    }
  }
  return chars.filter((_, index) => !skip[index]).join('');
}

const STOP = new Set(['<', '>', '|', '\n']);

/** `chars[open] === '<'` 起的 `<表面|读音>`：返回 `|` 与 `>` 的下标。两段都非空、不含 `< > | 换行`。 */
function bracket(chars: readonly string[], open: number): [number, number] | null {
  let bar = open + 1;
  while (bar < chars.length && !STOP.has(chars[bar]!)) bar += 1;
  if (bar >= chars.length || chars[bar] !== '|' || bar === open + 1) return null;
  let close = bar + 1;
  while (close < chars.length && !STOP.has(chars[close]!)) close += 1;
  if (close >= chars.length || chars[close] !== '>' || close === bar + 1) return null;
  return [bar, close];
}

function isHan(c: string): boolean {
  const code = c.codePointAt(0)!;
  return (code >= 0x3400 && code <= 0x9fff) || (code >= 0x20000 && code <= 0x2ffff);
}

const MARKED: ReadonlyArray<readonly [string, readonly string[]]> = [
  ['a', ['ā', 'á', 'ǎ', 'à']],
  ['e', ['ē', 'é', 'ě', 'è']],
  ['i', ['ī', 'í', 'ǐ', 'ì']],
  ['o', ['ō', 'ó', 'ǒ', 'ò']],
  ['u', ['ū', 'ú', 'ǔ', 'ù']],
  ['v', ['ǖ', 'ǘ', 'ǚ', 'ǜ']],
  ['n', ['', 'ń', 'ň', 'ǹ']],
  ['m', ['', 'ḿ', '', '']],
];

/** 带调字母（已转小写）→ 去调的 ASCII 字母与声调（`ü` 不带调，声调为 0）。 */
function foldMarked(c: string): readonly [string, number] | null {
  if (c === 'ü') return ['v', 0];
  for (const [base, marks] of MARKED) {
    const tone = marks.indexOf(c);
    if (tone >= 0 && marks[tone] !== '') return [base, tone + 1];
  }
  return null;
}

/** 读音里的一个字符转小写（拉丁大写字母只有一个小写形式）。 */
function lower(c: string): string {
  const folded = c.toLowerCase();
  return Array.from(folded).length === 1 ? folded : c;
}

function isAsciiAlnum(c: string): boolean {
  return /^[A-Za-z0-9]$/.test(c);
}

function isPinyinChar(c: string): boolean {
  return isAsciiAlnum(c) || c === ' ' || foldMarked(lower(c)) !== null;
}

/** 读音带声调数字或调号：看得出是在写拼音注记（不合法时报 malformed）。 */
function hasTone(raw: string): boolean {
  return Array.from(raw).some((c) => /^[0-9]$/.test(c) || (foldMarked(lower(c))?.[1] ?? 0) > 0);
}

function isPinyinAttempt(face: readonly string[], raw: string): boolean {
  return face.some(isHan) && Array.from(raw).every(isPinyinChar);
}

/** 一个音节 → `hang2` 这样的规范写法；须是 1–6 个字母、含元音（或是成音节的 `m n ng hm hng`），声调来自末尾的数字 1–5、唯一的调号或轻声。 */
function normalizeSyllable(raw: string): string | null {
  let body = '';
  let mark: number | null = null;
  let digit: number | null = null;
  for (const original of raw) {
    if (digit !== null) return null;
    const c = lower(original);
    if (c >= 'a' && c <= 'z' && c.length === 1) {
      body += c;
    } else if (c >= '1' && c <= '5' && c.length === 1) {
      digit = Number(c);
    } else {
      const folded = foldMarked(c);
      if (!folded) return null;
      body += folded[0];
      if (folded[1] > 0) {
        if (mark !== null) return null;
        mark = folded[1];
      }
    }
  }
  if (digit !== null && mark !== null) return null;
  const tone = digit ?? mark ?? 5;
  const voiced = /[aeiouv]/.test(body) || ['m', 'n', 'ng', 'hm', 'hng'].includes(body);
  if (body.length < 1 || body.length > 6 || !voiced) return null;
  if ('jqxy'.includes(body[0]!)) body = body.replaceAll('v', 'u');
  return `${body}${tone}`;
}

/** 规范化读音；每个音节见 `normalizeSyllable`，个数等于表面字数。 */
function normalize(raw: string, count: number): string | null {
  const syllables = raw.split(/\s+/).filter((s) => s.length > 0);
  const normalized: string[] = [];
  for (const syllable of syllables) {
    const one = normalizeSyllable(syllable);
    if (one === null) return null;
    normalized.push(one);
  }
  return normalized.length === count ? normalized.join(' ') : null;
}
