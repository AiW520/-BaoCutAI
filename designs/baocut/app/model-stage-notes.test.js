const test = require('node:test');
const assert = require('node:assert/strict');
global.window = {};
require('./model-time.js');
require('./model-stage-notes.js');
const N = window.BC_STAGE_NOTES;

const frame = {w: 800, h: 450};
const note = (over = {}) => ({id: over.id || 'n1', video: over.video || 'p1', revision: 3, timeMs: over.timeMs ?? 42300,
  kind: over.kind || 'pin', region: over.region || {x: 0.8, y: 0.2, w: 0, h: 0}, to: over.to, text: over.text ?? '这里的字太小'});

test('手势换成归一化区域：夹在 0–1，框取两点的矩形，箭头带终点，点只记一个点', () => {
  assert.deepEqual(N.normalize('box', {x: 600, y: 100}, {x: 200, y: 300}, frame), {region: {x: 0.25, y: 0.222, w: 0.5, h: 0.444}});
  assert.deepEqual(N.normalize('arrow', {x: -20, y: 0}, {x: 900, y: 450}, frame), {region: {x: 0, y: 0, w: 0, h: 0}, to: {x: 1, y: 1}});
  assert.deepEqual(N.normalize('pin', {x: 400, y: 225}, null, frame), {region: {x: 0.5, y: 0.5, w: 0, h: 0}});
});

test('位置说成九宫，标签带时码与种类', () => {
  assert.equal(N.place({x: 0.8, y: 0.2, w: 0, h: 0}), '右上');
  assert.equal(N.place({x: 0.45, y: 0.45, w: 0.1, h: 0.1}), '正中');
  assert.equal(N.place({x: 0.05, y: 0.45, w: 0, h: 0}), '左侧');
  assert.equal(N.place({x: 0.5, y: 0.9, w: 0, h: 0}), '下方');
  assert.equal(N.label(note()), '00:42.3 · 编号 · 画面右上');
});

test('添加：去空白、空的与超长的不收、箭头要终点、框要面积、最多 20 条', () => {
  assert.equal(N.add([], note({text: '  '})).error, '先写下批注，再添加到对话');
  assert.equal(N.add([], note({kind: 'arrow'})).error, '箭头要拖到它指的地方');
  assert.equal(N.add([], note({kind: 'box', region: {x: 0.1, y: 0.1, w: 0, h: 0.2}})).error, '框要拖出一块面积');
  const one = N.add([], note({text: ' 字太小 '}));
  assert.equal(one.error, null);
  assert.equal(one.notes[0].text, '字太小');
  assert.equal(one.notes[0].label, '00:42.3 · 编号 · 画面右上');
  const full = Array.from({length: 20}, (_, i) => note({id: 'n' + i}));
  assert.match(N.add(full, note()).error, /最多带 20 条/);
  assert.equal(N.remove(full, 'n3').length, 19);
  assert.equal(N.tokenLabel(full), '视频标注 · 20 条');
});

test('画面上只画播放头附近那一帧的标记，编号是整份草稿里的序号', () => {
  const notes = [note({id: 'a', timeMs: 10000}), note({id: 'b', timeMs: 42300}), note({id: 'c', timeMs: 42600, video: 'p2'}), note({id: 'd', timeMs: 42700})];
  assert.deepEqual(N.pins(notes, 'p1', 42.4).map(n => [n.id, n.n]), [['b', 2], ['d', 4]]);
  assert.equal(N.elsewhere(notes, 'p1', 42.4), 1);
});

test('候选区间：同一视频两条以上才有，取最早与最晚；按视频分开', () => {
  assert.equal(N.candidateBounds([note()]), null);
  const notes = [note({id: 'a', timeMs: 10000}), note({id: 'b', timeMs: 42300}), note({id: 'c', timeMs: 99000, video: 'p2'})];
  assert.deepEqual(N.candidateBounds(notes, 'p1'), {fromMs: 10000, toMs: 42300});
  assert.equal(N.candidateBounds(notes, 'p2'), null);
  assert.deepEqual(N.candidateBounds(notes), {fromMs: 10000, toMs: 99000});
});

test('交给智能体的块：一部视频一块，带 revision、时刻、kind 与区域；两条以上附 candidateBoundsMs', () => {
  const notes = [note({id: 'a', timeMs: 10000, kind: 'box', region: {x: 0.25, y: 0.2, w: 0.5, h: 0.4}, text: '这块字幕挡住了脸'}),
    note({id: 'b', timeMs: 42300, kind: 'arrow', region: {x: 0.1, y: 0.1, w: 0, h: 0}, to: {x: 0.6, y: 0.5}, text: '把 logo 挪到这里'}),
    note({id: 'c', video: 'p2', timeMs: 5000, text: '这里加个标题'})];
  const text = N.promptText(notes, id => ({p1: 'talk/', p2: 'intro/'})[id]);
  assert.equal(text, [
    '<baocut-video-annotations video="talk/" revision="3">',
    '1. 00:10.0 (10000 ms) · box · x=0.25 y=0.2 w=0.5 h=0.4 (25%, 20%, 50% × 40%)',
    '   批注：这块字幕挡住了脸',
    '2. 00:42.3 (42300 ms) · arrow · from (0.1, 0.1) to (0.6, 0.5)',
    '   批注：把 logo 挪到这里',
    'candidateBoundsMs: 10000–42300（候选范围，不是要改的区间）',
    '</baocut-video-annotations>',
    '<baocut-video-annotations video="intro/" revision="3">',
    '1. 00:05.0 (5000 ms) · pin · at (0.8, 0.2)',
    '   批注：这里加个标题',
    '</baocut-video-annotations>',
  ].join('\n'));
  const plan = N.replyPlan(notes.slice(0, 2));
  assert.match(plan.summary, /2 条视频标注/);
  assert.match(plan.summary, /不连成区间/);
  assert.equal(plan.reads.filter(r => r.tool === 'videos_frames').length, 2);
});
