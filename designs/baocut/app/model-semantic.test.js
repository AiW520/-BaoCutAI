const test = require('node:test');
const assert = require('node:assert/strict');
global.window = {};
require('./model-semantic.js');
const S = window.BC_SEMANTIC;

test('状态：没装 / 不支持时退回字面，索引过期不阻塞（§2.11、v0.1 §11.5）', () => {
  assert.deepEqual(S.status({}).reason, null);
  assert.equal(S.status({install: 'none'}).reason, 'MODEL_NOT_INSTALLED');
  assert.equal(S.status({platform: 'unsupported'}).reason, 'UNSUPPORTED');
  assert.equal(S.status({install: 'none'}).mode, 'lexical');
  const st = S.status({index: 'stale'});
  assert.ok(st.usable && st.stale);
  assert.equal(S.entryNote('topic', {index: 'stale'}).text, '索引更新中，结果可能不含最近的修改');
  assert.equal(S.entryNote('topic', {index: 'stale'}).blocking, false);
  assert.equal(S.entryNote('topic', {}), null);
});

test('每个入口自己说明状态：按主题置灰并给设置入口；不支持的平台不给安装入口', () => {
  const n = S.entryNote('topic', {install: 'none'});
  assert.equal(n.text, '需要本机语义模型');
  assert.equal(n.link, '去设置');
  assert.ok(n.blocking);
  assert.match(S.entryNote('terms', {install: 'none'}).text, /只做了精确匹配/);
  assert.match(S.entryNote('frames', {install: 'none'}).text, /按时间取帧，未按内容挑选/);
  assert.equal(S.entryNote('search', {platform: 'unsupported'}).link, null);
});

test('URL 演示开关只认已知值', () => {
  assert.equal(S.fromSearch('?semantic=none').install, 'none');
  assert.equal(S.fromSearch('?a=1&semantic=stale').index, 'stale');
  assert.equal(S.fromSearch('?semantic=bogus'), null);
  assert.equal(S.fromSearch(''), null);
});

test('完整性按通道分别写，不是一个百分比（v0.1 §13.2）', () => {
  assert.equal(S.coverageLine({text: {done: 4, total: 4}, visual: {done: 18, total: 30}}), '文字已就绪；画面 18/30 个素材完成');
  assert.equal(S.coverageLine({text: {done: 2, total: 3, pending: 1}}), '文字 2/3 部视频（1 部还在转录）');
  assert.equal(S.coverageLine({text: {done: 0, total: 0}}), '没有文稿，未建立文字索引');
  assert.doesNotMatch(S.coverageLine({text: {done: 2, total: 3, pending: 1}, later: true}), /%/);
  assert.deepEqual(S.sumText([{text: {done: 1, total: 2, pending: 1}}, {text: {done: 3, total: 3}}]), {done: 4, total: 5, pending: 1, none: 0});
});

test('多模态包包含文字通道', () => {
  assert.deepEqual(S.channelsOf('full'), ['text', 'visual', 'audio']);
  assert.deepEqual(S.channelsOf('text'), ['text']);
  assert.deepEqual(S.channelsOf('none'), []);
  assert.equal(S.fmtBytes(327155712), '312 MB');
});

test('翻译记忆：沿用标记、改为重译、术语不一致计数（§2.6）', () => {
  const tm = {reused: {x2: '第 41 期'}, refs: 14, conflicts: [{term: '渲染', spots: [{}, {}]}]};
  assert.equal(S.reusedFrom(tm, 'x2'), '第 41 期');
  assert.equal(S.reusedFrom(tm, 'x2', {x2: true}), null);
  assert.equal(S.conflicts(tm).n, 2);
  assert.equal(S.conflicts(tm, {渲染: true}).n, 0);
  assert.match(S.tmLine(tm, {}), /参考了 14 句已有译文/);
  assert.match(S.tmLine(tm, {install: 'none'}), /精确匹配/);
  const byLang = {...tm, refsByLang: {en: 14, ko: 0}};
  assert.match(S.tmLine(byLang, {}, 'en'), /参考了 14 句/);
  assert.match(S.tmLine(byLang, {}, 'ko'), /没有找到可参考的已有译文/);
});
