const test = require('node:test');
const assert = require('node:assert/strict');
global.window = {};
require('./model-home-slides.js');
const S = window.BC_HOME_SLIDES;

const deck = {id: 'deck1', slides: [
  {id: 's01', parts: [{id: 'title', role: '标题', text: '同一份输入，永远同一帧'}]},
  {id: 's02', parts: [{id: 'list', role: '列表', items: ['浮点误差', '字体回退']}]},
  {id: 's03', parts: [{id: 'stats', role: '数据', items: [{value: '0', label: '像素差异'}]}]},
]};
const part = (slide, id) => deck.slides.find(s => s.id === slide).parts.find(p => p.id === id);
const note = (over = {}) => ({id: 'n1', deck: 'deck1', slide: 's01', part: 'title', label: '第 1 页 › 标题', x: 0.5, y: 0.4, text: '改短一点', ...over});

test('页号与翻页停在两端', () => {
  assert.equal(S.pageOf(deck, 's02'), 2);
  assert.equal(S.pageOf(deck, 'missing'), 0);
  assert.equal(S.step(deck, 's01', -1), 's01');
  assert.equal(S.step(deck, 's01', 1), 's02');
  assert.equal(S.step(deck, 's03', 1), 's03');
  assert.equal(S.step({slides: []}, 's01', 1), null);
});

test('位置的说法：页号、元素角色与短引；列表连起来，区域没有原文', () => {
  assert.equal(S.label(deck, 's01', part('s01', 'title')), '第 1 页 › 标题 “同一份输入，永远同一帧”');
  assert.equal(S.label(deck, 's02', part('s02', 'list')), '第 2 页 › 列表 “浮点误差，字体回退”');
  assert.equal(S.label(deck, 's03', part('s03', 'stats')), '第 3 页 › 数据 “0 像素差异”');
  assert.equal(S.label(deck, 's02', null), '第 2 页 › 一块区域');
  assert.equal(S.quote('一二三四五六七八九十一二三四五六七', 16), '一二三四五六七八九十一二三四五六…');
  assert.equal(S.quote('  a \n b  '), 'a b');
  assert.equal(S.detail(deck, 's01', part('s01', 'title')), 'Element on slide 1 (s01) · title · "同一份输入，永远同一帧"');
  assert.equal(S.detail(deck, 's02', null), 'Area on slide 2 (s02)');
});

test('加标注：去首尾空白，空的、超长的、超过 20 条的都不收', () => {
  const one = S.add([], note({text: '  改短一点 \n'}));
  assert.equal(one.error, null);
  assert.equal(one.notes[0].text, '改短一点');
  assert.match(S.add([], note({text: '  '})).error, /先写下批注/);
  assert.match(S.add([], note({text: 'x'.repeat(2001)})).error, /2000 字/);
  assert.equal(S.add([], note({text: 'x'.repeat(2000)})).error, null);
  const full = Array.from({length: 20}, (_, i) => note({id: 'n' + i}));
  const over = S.add(full, note({id: 'n20'}));
  assert.match(over.error, /20 条/);
  assert.equal(over.notes, full);
});

test('删标注、引用标签与每页的编号标记', () => {
  const notes = [note(), note({id: 'n2', slide: 's02'}), note({id: 'n3', deck: 'other'}), note({id: 'n4'})];
  assert.equal(S.remove(notes, 'missing'), notes);
  assert.deepEqual(S.remove(notes, 'n2').map(n => n.id), ['n1', 'n3', 'n4']);
  assert.equal(S.tokenLabel(notes), '幻灯片标注 · 4 条');
  assert.equal(S.tokenLabel(undefined), '幻灯片标注 · 0 条');
  // 编号按整份草稿的序号，跳过的那条不重排
  assert.deepEqual(S.pins(notes, 'deck1', 's01').map(p => [p.id, p.n]), [['n1', 1], ['n4', 4]]);
  assert.deepEqual(S.pins(notes, 'deck1').map(p => p.n), [1, 2, 4]);
  assert.deepEqual(S.countBySlide(notes, 'deck1'), {s01: 2, s02: 1});
});

test('发给智能体的块：一份 deck 一块，带位置、定位与批注，多行批注缩进', () => {
  const notes = [
    note({detail: 'Element on slide 1 (s01) · title'}),
    note({id: 'n2', deck: 'deck2', slide: 's09', label: '第 9 页 › 一块区域', text: '换成图'}),
    note({id: 'n3', slide: 's02', label: '第 2 页 › 列表', text: '第一行\n第二行'}),
  ];
  const paths = {deck1: '幻灯片/第1讲/', deck2: 'talk/'};
  assert.equal(S.promptText(notes, id => paths[id]), [
    '<baocut-slide-annotations deck="幻灯片/第1讲/">',
    '1. 第 1 页 › 标题',
    '   定位：Element on slide 1 (s01) · title',
    '   批注：改短一点',
    '2. 第 2 页 › 列表',
    '   批注：第一行',
    '        第二行',
    '</baocut-slide-annotations>',
    '<baocut-slide-annotations deck="talk/">',
    '1. 第 9 页 › 一块区域',
    '   批注：换成图',
    '</baocut-slide-annotations>',
  ].join('\n'));
  assert.equal(S.promptText([], id => id), '');
});

test('模拟回复：一页一步修改，每份 deck 检查一次', () => {
  const plan = S.replyPlan([
    note({path: '幻灯片/第1讲/'}),
    note({id: 'n2', path: '幻灯片/第1讲/'}),
    note({id: 'n3', path: '幻灯片/第1讲/', slide: 's03'}),
  ]);
  assert.equal(plan.write, null);
  assert.match(plan.summary, /3 条/);
  assert.deepEqual(plan.reads.map(r => r.cmd), ['修改 幻灯片/第1讲/slides/s01.html', '修改 幻灯片/第1讲/slides/s03.html', 'slides_check 幻灯片/第1讲/']);
  assert.equal(plan.reads[2].tool, 'slides_check');
  assert.match(plan.close, /2 页/);
});

test('副标题', () => {
  assert.equal(S.meta(deck), '幻灯片 · 3 页 · 16:9');
  assert.equal(S.meta({slides: [], ratio: '4:3'}), '幻灯片 · 0 页 · 4:3');
});
