/**
 * 测试用：Speech Worker（字幕与翻译核心）发给文本模型的请求的假答案。请求走文件契约：要改写的载体包在
 * `<BEGIN INPUT name="<kind>.src.<ext>">` 里，翻译页是 `<section>` 里一句一个 `<p id="<句子 ID>">`。
 * 翻译页按句回一个答案（带对齐分组的按组写行；行文本载体 `lines/1` 的页按 `¦` 分片、每片一块首尾源词引用），别的请求
 * （译向简报等）回一个不合格的答案，让核心走自己的降级。
 */

interface Tag {
  open: string;
  inner: string;
}

function tags(html: string, name: string): Tag[] {
  const out: Tag[] = [];
  let rest = html;
  for (;;) {
    const start = rest.indexOf(`<${name} `);
    if (start < 0) return out;
    const after = rest.slice(start);
    const openEnd = after.indexOf('>');
    const close = after.indexOf(`</${name}>`);
    out.push({ open: after.slice(0, openEnd), inner: after.slice(openEnd + 1, close) });
    rest = after.slice(close + name.length + 3);
  }
}

function attr(open: string, name: string): string | null {
  const match = new RegExp(` ${name}="([^"]*)"`).exec(open);
  return match ? match[1]!.replaceAll('&quot;', '"').replaceAll('&amp;', '&') : null;
}

/** 请求的种类（`translate`、`brief`……）；不是文件契约的请求时 null。 */
export function speechRequestKind(user: string): string | null {
  return /<BEGIN INPUT name="([a-z-]+)\.src\./.exec(user)?.[1] ?? null;
}

/** 翻译页里要翻译的句子 ID（可编辑的 `<p>`）；`lines/1` 的页没有句子 ID，是空的。 */
export function requestedSentences(user: string): string[] {
  return tags(user, 'section')
    .flatMap((section) => tags(section.inner, 'p'))
    .filter((p) => attr(p.open, 'data-editable') !== 'false')
    .map((p) => attr(p.open, 'id')!);
}

/**
 * 一句（带对齐分组时是第 `group` 组，`lines/1` 的页是第 `group` 片）的译文。`lines/1` 的页没有句子 ID，`sentenceId`
 * 是 null，按 `source`（这一句的原文，去掉了转义、提示与片标）认句子。
 */
export type FakeSpeechLine = (sentenceId: string | null, group: number, source: string) => string;

/**
 * 假答案。`line` 给出每句的译文；不给时按目标语言写一句各不相同的话（核心的质量门会退回整页都一样的短译文与语言不对的译文）。
 */
export function fakeSpeechAnswer(user: string, line?: FakeSpeechLine): string {
  if (speechRequestKind(user) === 'translate-lines') return fakeLinesAnswer(user, line);
  if (speechRequestKind(user) !== 'translate') return '<article></article>';
  const chinese = /data-target="(zh|ja)/.test(user);
  let ordinal = 0;
  const text = (id: string, group: number, source: string) => {
    if (line) return line(id, group, source);
    ordinal++;
    return chinese ? `好的，第${ordinal}句。` : `This is line ${ordinal}.`;
  };
  let out = '<article>';
  for (const section of tags(user, 'section')) {
    out += `<section id="${attr(section.open, 'id')}">`;
    for (const p of tags(section.inner, 'p')) {
      if (attr(p.open, 'data-editable') === 'false') continue;
      const id = attr(p.open, 'id')!;
      const source = p.inner.replace(/<[^>]*>/g, '').trim();
      out += `<p id="${id}">`;
      const groups = attr(p.open, 'data-align-groups');
      const words = attr(p.open, 'data-align-words');
      if (groups)
        out += groups
          .split(';')
          .map((group, i) => `<span data-src="${group.split('@')[0]}">${text(id, i, source)}</span>`)
          .join('');
      else if (words) out += `<span data-src="1-${words.split('[').length - 1}">${text(id, 0, source)}</span>`;
      else out += text(id, 0, source);
      out += '</p>';
    }
    out += '</section>';
  }
  return `${out}</article>`;
}

/** 引用里的一个原词：页里的转义先去掉，再按引用的规矩转义（`Yes.` 写成 `Yes\.`，不然 `|Yes...Yes.|` 读成省略号）。 */
function quoted(word: string): string {
  return word.replace(/\\(.)/g, '$1').replace(/[\\|⏸¦.∅?]/g, '\\$&');
}

/** `lines/1` 的页：每个编号行一行答案，按 `¦` 分片，每片一块 `|首词..尾词|译文`（一个词的片是 `|词|`）。 */
function fakeLinesAnswer(user: string, line?: FakeSpeechLine): string {
  const chinese = /^! format=lines\/1 .*target=(zh|ja)/m.test(user);
  const out: string[] = [];
  for (const row of user.split('\n')) {
    const match = /^(\d+) (.*)$/.exec(row);
    if (!match) continue;
    const n = Number(match[1]);
    const source = match[2]!
      .split(/\s+/)
      .filter((token) => token && !token.startsWith('≤') && !token.startsWith('≥') && token !== '⏸')
      .join(' ');
    const plain = source.replace(/ ?¦ ?/g, ' ').replace(/\\(.)/g, '$1').trim();
    const chunks = source.split('¦').flatMap((piece, i) => {
      const words = piece.trim().split(/\s+/).filter(Boolean);
      if (words.length === 0) return [];
      const fallback = i === 0 ? (chinese ? `好的，第${n}句` : `This is line ${n}`) : chinese ? `第${i + 1}段` : `part ${i + 1}`;
      const text = line ? line(null, i, plain) : fallback;
      const quote = words.length === 1 ? quoted(words[0]!) : `${quoted(words[0]!)}..${quoted(words.at(-1)!)}`;
      return [`|${quote}|${text}`];
    });
    out.push(`${n} ${chunks.join('')}${line ? '' : chinese ? '。' : '.'}`);
  }
  return out.join('\n');
}
