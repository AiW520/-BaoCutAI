const test = require('node:test');
const assert = require('node:assert/strict');
global.window = {};
require('./model-space-index.js');
const X = window.BC_SPACE_INDEX;

const usable = {usable: true};
const movie = {id: 'p1', kind: 'movie'};

test('没装模型或不支持时不标；文档、字幕、模板、回收站里的不标', () => {
  assert.equal(X.entryState(movie, {sem: {usable: false}}), null);
  assert.equal(X.entryState({id: 'o2', kind: 'subtitle'}, {sem: usable}), null);
  assert.equal(X.entryState({id: 'o6', kind: 'doc'}, {sem: usable}), null);
  assert.equal(X.entryState({id: 'o12', kind: 'template'}, {sem: usable}), null);
  assert.equal(X.entryState({id: 'p1', kind: 'movie', trashed: true}, {sem: usable}), null);
});

test('成片不需要索引，说是哪部视频；没有导出记录的视频文件照视频素材建', () => {
  const s = X.entryState({id: 'o1', kind: 'final', movie: 'p1'}, {sem: usable, visual: true, movieName: '科浪访谈'});
  assert.equal(s.k, 'notNeeded');
  assert.match(s.why, /「科浪访谈」/);
  assert.equal(s.canReindex, false);
  assert.equal(X.entryState({id: 'v', kind: 'final'}, {sem: usable, visual: true}).k, 'indexed');
});

test('取最需要注意的通道：失败 > 过期 > 在建 > 排队 > 已索引；各通道都写进说明', () => {
  const demo = {p1: {text: 'indexed', visual: 'queued'}, p2: {text: 'stale', visual: 'failed'}, p3: {text: 'indexing', visual: 'queued', pct: 40}};
  const a = X.entryState(movie, {sem: usable, visual: true, demo});
  assert.equal(a.k, 'queued');
  assert.deepEqual(a.lines, ['讲话内容：已索引', '画面：排队中']);
  assert.equal(X.entryState({id: 'p2', kind: 'movie'}, {sem: usable, visual: true, demo}).k, 'failed');
  const c = X.entryState({id: 'p3', kind: 'movie'}, {sem: usable, visual: true, demo});
  assert.equal(c.k, 'indexing');
  assert.equal(c.lines[0], '讲话内容：索引中 40%');
  // 停着时在建的显示成排队
  assert.equal(X.entryState({id: 'p3', kind: 'movie'}, {sem: usable, visual: true, demo, paused: true}).k, 'queued');
  assert.match(X.stateTitle(a), /^语义索引：排队中 · 讲话内容：已索引；画面：排队中$/);
});

test('画面关着：视频只看讲话内容；视频素材与图片没有可建的；还在转录的视频等转完', () => {
  assert.equal(X.entryState(movie, {sem: usable, visual: false}).k, 'indexed');
  const clip = X.entryState({id: 'c1', kind: 'clip'}, {sem: usable, visual: false});
  assert.equal(clip.k, 'empty');
  assert.match(clip.why, /画面索引没开/);
  assert.equal(clip.canReindex, false);
  const w = X.entryState({id: 'p2', kind: 'movie'}, {sem: usable, visual: false, demo: {p2: {text: 'waiting'}}});
  assert.equal(w.k, 'empty');
  assert.match(w.why, /还在转录/);
});

test('重新索引：已有的、过期的、失败的都排到队首', () => {
  const demo = {p1: {text: 'stale', visual: 'failed'}};
  const s = X.entryState(movie, {sem: usable, visual: true, demo, requeued: {p1: true}});
  assert.equal(s.k, 'queued');
  assert.ok(s.canReindex);
});

test('索引文件夹：说清楚会建什么；和项目或已加的文件夹重叠时不能加', () => {
  const f = {counts: {movies: 2, clips: 40, images: 12, exports: 3}};
  assert.equal(X.folderNote(f, true), '2 部 BaoCut 视频按讲话内容与画面建；40 个视频素材、12 张图片按画面建；3 个成片跳过（导出它们的视频已经建过）。');
  assert.match(X.folderNote(f, false), /40 个视频素材、12 张图片要打开画面索引才会建/);
  const taken = [{name: '素材库', path: '~/Movies/素材库'}, {name: '新品发布', path: '~/BaoCut/新品发布/'}];
  assert.equal(X.folderProblem('~/Movies/素材库/2025', taken).code, 'overlap');
  assert.equal(X.folderProblem('~/BaoCut', taken).code, 'overlap');
  assert.equal(X.folderProblem('~/Movies/素材库二', taken), null);
  assert.equal(X.folderProblem(null, taken).code, 'missing');
});

test('索引位置：不存在、不可写、同一处不能选；放不下时不能移过去，只能重新建', () => {
  const mb = 1048576;
  assert.equal(X.locationPlan({exists: false}, 64 * mb).error.code, 'missing');
  assert.equal(X.locationPlan({exists: true, writable: false}, 64 * mb).error.code, 'readonly');
  assert.equal(X.locationPlan({path: '/a', exists: true, writable: true}, 64 * mb, '/a').error.code, 'same');
  const small = X.locationPlan({path: '/b', exists: true, writable: true, freeMB: 10}, 64 * mb, '/a');
  assert.equal(small.kind, 'choose');
  assert.ok(small.move.disabled);
  assert.match(small.move.why, /放不下 64 MB/);
  assert.equal(X.locationPlan({path: '/c', exists: true, writable: true, freeMB: 900}, 64 * mb, '/a').move.disabled, false);
  assert.equal(X.effectiveDir(null).source, 'default');
});
