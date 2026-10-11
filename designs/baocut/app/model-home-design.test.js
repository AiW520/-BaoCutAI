const test = require('node:test');
const assert = require('node:assert/strict');
global.window = {};
require('./model-home-design.js');
const G = window.BC_HOME_DESIGN;

const canvas = {id: 'cv1', boards: [
  {id: 'hero', name: '首屏 · 桌面', file: 'hero.dc.html', x: 0, y: 0, w: 1280, h: 800, parts: [{id: 'title', role: '标题', text: '同一份输入，永远同一帧'}]},
  {id: 'phone', name: '首屏 · 手机', file: 'phone.dc.html', x: 1360, y: 0, w: 390, h: 800, parts: []},
  {id: 'plans', name: '报名卡片', file: 'plans.dc.html', x: 0, y: 900, w: 1750, h: 600,
   parts: [{id: 'cards', role: '卡片', items: [{name: '单讲', price: '¥49'}, {name: '全套', price: '¥299'}]}]},
]};
const part = (board, id) => G.boardOf(canvas, board).parts.find(p => p.id === id);
const note = (over = {}) => ({id: 'n1', canvas: 'cv1', board: 'hero', file: 'hero.dc.html', part: 'title', label: '画板「首屏 · 桌面」 › 标题', x: 0.5, y: 0.4, text: '改短一点', ...over});

test('位置的说法：画板名、元素角色与短引；卡片连起来，区域没有原文', () => {
  assert.equal(G.label(canvas, 'hero', part('hero', 'title')), '画板「首屏 · 桌面」 › 标题 “同一份输入，永远同一帧”');
  assert.equal(G.label(canvas, 'plans', part('plans', 'cards')), '画板「报名卡片」 › 卡片 “单讲 ¥49，全套 ¥299”');
  assert.equal(G.label(canvas, 'phone', null), '画板「首屏 · 手机」 › 一块区域');
  assert.equal(G.label(canvas, 'missing', null), '画板「missing」 › 一块区域');
  assert.equal(G.quote('一二三四五六七八九十一二三四五六七', 16), '一二三四五六七八九十一二三四五六…');
  assert.equal(G.detail(canvas, 'hero', part('hero', 'title')), 'Element in board hero (hero.dc.html) · title · "同一份输入，永远同一帧"');
  assert.equal(G.detail(canvas, 'phone', null), 'Area in board phone (phone.dc.html)');
});

test('加标注：去首尾空白，空的、超长的、超过 20 条的都不收', () => {
  const one = G.add([], note({text: '  改短一点 \n'}));
  assert.equal(one.error, null);
  assert.equal(one.notes[0].text, '改短一点');
  assert.match(G.add([], note({text: '  '})).error, /先写下批注/);
  assert.match(G.add([], note({text: 'x'.repeat(2001)})).error, /2000 字/);
  assert.equal(G.add([], note({text: 'x'.repeat(2000)})).error, null);
  const full = Array.from({length: 20}, (_, i) => note({id: 'n' + i}));
  const over = G.add(full, note({id: 'n20'}));
  assert.match(over.error, /20 条设计稿标注/);
  assert.equal(over.notes, full);
});

test('删标注、引用标签与每块画板的编号标记', () => {
  const notes = [note(), note({id: 'n2', board: 'phone'}), note({id: 'n3', canvas: 'other'}), note({id: 'n4'})];
  assert.equal(G.remove(notes, 'missing'), notes);
  assert.deepEqual(G.remove(notes, 'n2').map(n => n.id), ['n1', 'n3', 'n4']);
  assert.equal(G.tokenLabel(notes), '设计稿标注 · 4 条');
  assert.equal(G.tokenLabel(undefined), '设计稿标注 · 0 条');
  assert.deepEqual(G.pins(notes, 'cv1', 'hero').map(p => [p.id, p.n]), [['n1', 1], ['n4', 4]]);
  assert.deepEqual(G.pins(notes, 'cv1').map(p => p.n), [1, 2, 4]);
  assert.deepEqual(G.countByBoard(notes, 'cv1'), {hero: 2, phone: 1});
});

test('取景：全部画板放进视口居中，聚焦时只按那一块算比例', () => {
  const all = G.camera(canvas, {width: 1814, height: 1588, pad: 32, label: 24});
  assert.equal(all.scale, 1);
  assert.deepEqual(all.boards[0], {id: 'hero', left: 32, top: 56, width: 1280, height: 800});
  assert.deepEqual(all.boards[2], {id: 'plans', left: 32, top: 956, width: 1750, height: 600});
  const focused = G.camera(canvas, {width: 454, height: 488, focus: 'phone', pad: 32, label: 24});
  assert.equal(focused.scale, 0.5);
  assert.deepEqual(focused.boards[1], {id: 'phone', left: 129.5, top: 56, width: 195, height: 400});
  // 其余画板跟着同一个比例摆在视口外，不另算
  assert.equal(focused.boards[0].left, 129.5 - 1360 * 0.5);
  assert.deepEqual(G.camera(canvas, {width: 0, height: 400}), {scale: 0, boards: []});
  assert.deepEqual(G.camera({boards: []}, {width: 400, height: 400}), {scale: 0, boards: []});
});

test('发给智能体的块：一份设计稿一块，带位置、定位与批注，多行批注缩进', () => {
  const notes = [
    note({detail: 'Element in board hero (hero.dc.html) · title'}),
    note({id: 'n2', canvas: 'cv2', board: 'a', label: '画板「海报」 › 一块区域', text: '换成图'}),
    note({id: 'n3', board: 'phone', label: '画板「首屏 · 手机」 › 按钮', text: '第一行\n第二行'}),
  ];
  const paths = {cv1: '设计稿/课程落地页/', cv2: 'poster/'};
  assert.equal(G.promptText(notes, id => paths[id]), [
    '<baocut-design-annotations canvas="设计稿/课程落地页/">',
    '1. 画板「首屏 · 桌面」 › 标题',
    '   定位：Element in board hero (hero.dc.html) · title',
    '   批注：改短一点',
    '2. 画板「首屏 · 手机」 › 按钮',
    '   批注：第一行',
    '        第二行',
    '</baocut-design-annotations>',
    '<baocut-design-annotations canvas="poster/">',
    '1. 画板「海报」 › 一块区域',
    '   批注：换成图',
    '</baocut-design-annotations>',
  ].join('\n'));
  assert.equal(G.promptText([], id => id), '');
});

test('模拟回复：一块画板一步修改，每份设计稿检查一次', () => {
  const plan = G.replyPlan([
    note({path: '设计稿/课程落地页/'}),
    note({id: 'n2', path: '设计稿/课程落地页/'}),
    note({id: 'n3', path: '设计稿/课程落地页/', board: 'phone', file: 'phone.dc.html'}),
  ]);
  assert.equal(plan.write, null);
  assert.match(plan.summary, /3 条设计稿标注/);
  assert.deepEqual(plan.reads.map(r => r.cmd), ['修改 设计稿/课程落地页/hero.dc.html', '修改 设计稿/课程落地页/phone.dc.html', 'design_check 设计稿/课程落地页/']);
  assert.equal(plan.reads[2].tool, 'design_check');
  assert.match(plan.close, /2 块画板/);
  // 没记文件名的旧标注按画板 id 推
  assert.equal(G.replyPlan([note({file: undefined, path: 'x/'})]).reads[0].cmd, '修改 x/hero.dc.html');
});

test('副标题', () => {
  assert.equal(G.meta(canvas), '设计稿 · 3 个画板');
  assert.equal(G.meta({}), '设计稿');
});
