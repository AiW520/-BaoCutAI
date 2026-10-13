const test = require('node:test');
const assert = require('node:assert/strict');
global.window = {};
require('./model-writing-cites.js');
const W = window.BC_WRCITES;

const CUES = [5, 6, 7, 8, 9, 10, 12, 13, 14, 17, 18, 20, 28, 34].map((n) => ({id: `g${n}`, start: n * 3.3, end: n * 3.3 + 3, text: `第 ${n} 句。`}));
const ALL = new Set(CUES.map((c) => c.id).concat(['p10:g28', 'p10:g34']));
const lookup = (v, cue) => CUES.find((c) => c.id === cue) || null;

test('出处标记：同视频 [sN] 与跨视频 [p10:sN] 都认，正文里不留标记', () => {
  const p = W.parseCites('素材是别人的。[s6][p10:s28]');
  assert.equal(p.text, '素材是别人的。');
  assert.deepEqual(p.cites, [{video: null, cue: 'g6'}, {video: 'p10', cue: 'g28'}]);
  assert.equal(W.parseCites('导出只重渲染 [s20]').text, '导出只重渲染');
});

test('出处校验：没发过去的出处丢掉；一条有效出处都没有的段标模型推断，标题不算（§3.4）', () => {
  const bs = W.blocks(W.demo('blog'), ALL, 'p1');
  const last = bs[bs.length - 1];
  assert.equal(last.inferred, true);
  assert.equal(last.dropped, 1);
  assert.equal(bs[0].type, 'h1');
  assert.equal(bs[0].inferred, false);
  const s = W.stats(bs);
  assert.equal(s.inferred, 1);
  assert.equal(s.dropped, 1);
  /* 按主题只发了一部分：引用了没发的句子同样丢掉 */
  const few = W.blocks('只看这句。[s5]\n\n这句没发。[s20]', new Set(['g5']), 'p1');
  assert.deepEqual(few.map((b) => b.inferred), [false, true]);
});

test('锚点：跨视频的标签带视频名，同视频只写时间', () => {
  const a = W.resolve({video: null, cue: 'g6'}, lookup, 'p1', {});
  assert.equal(a.label, W.mmss(6 * 3.3));
  const b = W.resolve({video: 'p10', cue: 'g28'}, lookup, 'p1', {p10: '播客精剪'});
  assert.match(b.label, /^播客精剪 · \d\d:\d\d$/);
  assert.equal(b.video, 'p10');
  assert.equal(W.resolve({video: null, cue: 'g999'}, lookup, 'p1'), null);
});

test('复制：缺省去掉出处；带时间码那版每段挂 baocut 链接、推断段写明（§4.1）', () => {
  assert.equal(W.COPY_DEFAULT, 'strip');
  const bs = W.blocks(W.demo('blog'), ALL, 'p1');
  const strip = W.toMarkdown(bs, 'strip');
  assert.doesNotMatch(strip, /\[s\d+\]|baocut:|模型推断/);
  assert.match(strip, /^# 我们为什么/);
  assert.match(strip, /\n- 渲染要确定.*\n- 字幕/);
  const anchor = (c) => W.resolve(c, lookup, 'p1', {p10: '播客精剪'});
  const tc = W.toMarkdown(bs, 'timecode', anchor);
  assert.match(tc, /\[\d\d:\d\d\]\(baocut:\/\/video\/p1\?t=\d+\.\d\)/);
  assert.match(tc, /\*（模型推断）\*$/);
  assert.doesNotMatch(tc.split('\n')[0], /baocut:/);
});

test('系列写作：多出的段落引用另一部视频', () => {
  const bs = W.blocks(W.demo('blog', {series: true}), ALL, 'p1');
  assert.ok(bs.some((b) => b.cites.some((c) => c.video === 'p10')));
  assert.equal(W.stats(bs).videos, 2);
});

test('段落菜单：重写留上一版可撤回；换材料按勾的句子写、出处就是这几句', () => {
  let bs = W.blocks(W.demo('blog'), ALL, 'p1');
  const b = bs[1];
  bs = W.replaceBlock(bs, b.id, W.demoRewrite(b));
  assert.notEqual(bs[1].text, b.text);
  assert.equal(bs[1].rev, 1);
  bs = W.undoBlock(bs, b.id);
  assert.equal(bs[1].text, b.text);
  const cands = W.materialCands(bs[2], CUES, ALL, 20);
  assert.ok(cands[0].on && cands.some((c) => !c.on));
  const m = W.demoFromMaterial(cands.filter((c) => !c.on).slice(0, 2));
  assert.equal(m.cites.length, 2);
  assert.equal(W.demoFromMaterial([]), null);
  assert.deepEqual(W.PARA_MENU.map((x) => x.label), ['看出处', '重写这一段', '换材料重写…']);
});

test('存成 Space 文档：存带出处的一版', () => {
  const bs = W.blocks(W.demo('summary'), ALL, 'p1');
  const d = W.savedDoc({tool: 'summary', pid: 'p1', dir: 'd1', blocks: bs, title: '科浪', markdown: 'x\ny'});
  assert.equal(d.name, '总结 · 科浪.md');
  assert.equal(d.lines, 2);
  assert.equal(d.movie, 'p1');
});
