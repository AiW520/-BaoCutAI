const test = require('node:test');
const assert = require('node:assert/strict');
global.window = {};
require('./model-home-docs.js');
const D = window.BC_HOME_DOCS;

const doc = {id: 'docs-x', file: '协作文档/发布计划/', tabs: [
  {id: 'overview', name: '概览', node: 'n-overview', blocks: [
    {id: 'b1', type: 'h1', text: '发布计划'},
    {id: 'b2', type: 'p', text: '八讲视频课，先上前两讲。'}]},
  {id: 'plan', name: '计划', node: 'n-plan', blocks: [
    {id: 'b1', type: 'h2', text: '目标'},
    {id: 'b2', type: 'p', text: '首月 500 名付费学员，退款率低于 5%。'},
    {id: 'b3', type: 'table', head: ['周', '内容'], rows: [['第 1 周', '试听']]},
    {id: 'b4', type: 'list', items: ['邮件', '社群']},
    {id: 'b5', type: 'ask', text: '  把这张表补到第 4 周  '}]},
], threads: [
  {id: 'c9', tab: 'plan', block: 'b4', quote: '社群', comments: [{id: 'c9', author: '林舟', text: '哪些社群？'}]},
  {id: 'c1', tab: 'plan', block: 'b2', quote: '首月 500 名付费学员', comments: [
    {id: 'c1', author: '林舟', text: ' 500 是怎么估的？ '}, {id: 'c2', author: '我', text: '按试听转化 4% 算的'}]},
]};

/* 与 packages/protocol 的 parseDocsPath 一字不差（那边是 TypeScript，这里抄一份对拍） */
const ID = /^[A-Za-z0-9_.:-]{1,200}$/;
function protocolParse(path) {
  const match = /^f-([^#;/]+)#([^/;]+)(?:\/([^/;]+)[^;]*)?(?:;thread=([^;]+))?$/.exec(path);
  if (!match) return null;
  const [, tab, node, block, thread] = match;
  if (!tab || !node || !ID.test(tab) || !ID.test(node)) return null;
  if ((block && !ID.test(block)) || (thread && !ID.test(thread))) return null;
  return {tab, node, ...(block ? {block} : {}), ...(thread ? {thread} : {})};
}

test('元素路径：拼出来的协议拆得回去；不是这个写法的拆不开', () => {
  const p = D.path({tab: 'plan', node: 'n-plan', block: 'b2', thread: 'c1'});
  assert.equal(p, 'f-plan#n-plan/b2;thread=c1');
  assert.deepEqual(D.parsePath(p), {tab: 'plan', node: 'n-plan', block: 'b2', thread: 'c1'});
  assert.deepEqual(protocolParse(p), D.parsePath(p));
  assert.equal(D.path({tab: 'plan', node: 'n-plan'}), 'f-plan#n-plan');
  for (const x of ['f-plan#n-plan', 'f-plan#n-plan/b2', 'f-a#b/c.16:3;thread=u-1', 'somewhere', 'f-#x', 'f-a b#c', ''])
    assert.deepEqual(D.parsePath(x), protocolParse(x), x);
});

test('评论线程的标注：原文是线程挂着的那段，正文是第一条评论；位置带线程', () => {
  const n = D.threadNote(doc, 'c1');
  assert.deepEqual(n, {doc: 'docs-x', docPath: '协作文档/发布计划/', kind: 'comment', path: 'f-plan#n-plan/b2;thread=c1',
    label: '计划 › "首月 500 名付费学员"', quote: '首月 500 名付费学员', text: '500 是怎么估的？'});
  assert.equal(D.threadNote(doc, 'nope'), null);
  assert.equal(D.label({name: '计划'}, 'comment', '一二三四五六七八九十一二三四五六七八九十一二三四五'), '计划 › "一二三四五六七八九十一二三四五六七八九十一二三四…"');
});

test('请求的标注：位置只到块，没有原文；不是请求的块不收', () => {
  assert.deepEqual(D.askNote(doc, 'plan', 'b5'), {doc: 'docs-x', docPath: '协作文档/发布计划/', kind: 'ask',
    path: 'f-plan#n-plan/b5', label: '计划 › 空行', text: '把这张表补到第 4 周'});
  assert.equal(D.askNote(doc, 'plan', 'b2'), null);
  assert.equal(D.askNote(doc, 'missing', 'b5'), null);
});

test('线程按块的先后排；块的原文把列表与表格连起来', () => {
  assert.deepEqual(D.threadsIn(doc, 'plan').map(t => t.id), ['c1', 'c9']);
  assert.deepEqual(D.threadsIn(doc, 'overview'), []);
  assert.equal(D.blockText(D.blockOf(D.tabOf(doc, 'plan'), 'b3')), '周，内容，第 1 周，试听');
  assert.equal(D.blockText(D.blockOf(D.tabOf(doc, 'plan'), 'b4')), '邮件，社群');
  assert.equal(D.meta(doc), '协作文档 · 2 个标签页');
  assert.equal(D.meta(null), '协作文档');
});

test('加标注：空的、超长的、超过 20 条的不收；同一个位置再发一次换成新的，id 不变', () => {
  const c = {id: 'n1', ...D.threadNote(doc, 'c1')};
  const one = D.add([], c);
  assert.equal(one.error, null);
  assert.equal(one.notes.length, 1);
  assert.match(D.add([], {...c, text: '  '}).error, /评论是空的/);
  assert.match(D.add([], {...D.askNote(doc, 'plan', 'b5'), id: 'a', text: ''}).error, /请求是空的/);
  assert.match(D.add([], {...c, text: 'x'.repeat(4097)}).error, /4096 字/);
  assert.equal(D.add([], {...c, text: 'x'.repeat(4096)}).error, null);
  const again = D.add(one.notes, {...c, id: 'n2', text: '改成 400'});
  assert.equal(again.notes.length, 1);
  assert.deepEqual([again.notes[0].id, again.notes[0].text], ['n1', '改成 400']);
  assert.ok(D.has(again.notes, 'docs-x', 'comment', c.path));
  assert.ok(!D.has(again.notes, 'docs-x', 'ask', c.path));
  const full = Array.from({length: 20}, (_, i) => ({...c, id: 'n' + i, path: `f-plan#n-plan/b${i}`}));
  const over = D.add(full, {...c, id: 'n20', path: 'f-plan#n-plan/b99'});
  assert.match(over.error, /20 条协作文档标注/);
  assert.equal(over.notes, full);
  assert.equal(D.add(full, {...full[3], text: '换掉'}).error, null);
});

test('删标注、引用标签与分类计数', () => {
  const notes = [{id: 'a', kind: 'comment'}, {id: 'b', kind: 'ask'}, {id: 'c', kind: 'comment'}];
  assert.deepEqual(D.remove(notes, 'b').map(n => n.id), ['a', 'c']);
  assert.equal(D.remove(notes, 'x'), notes);
  assert.equal(D.tokenLabel(notes), '协作文档标注 · 3 条');
  assert.deepEqual(D.counts(notes), {comment: 2, ask: 1});
  assert.equal(D.fallbackText(), '请处理这些协作文档里的评论和请求。');
});

test('点标注回到文档：标签页必须在；线程、块找得到哪个给哪个', () => {
  assert.deepEqual(D.reveal(doc, 'f-plan#n-plan/b2;thread=c1'), {tab: 'plan', thread: 'c1', block: 'b2'});
  assert.deepEqual(D.reveal(doc, 'f-plan#n-plan/b99;thread=gone'), {tab: 'plan'});
  assert.deepEqual(D.reveal(doc, 'f-overview#n-overview'), {tab: 'overview'});
  assert.equal(D.reveal(doc, 'f-gone#n'), null);
  assert.equal(D.reveal(doc, 'nonsense'), null);
});

test('拼给智能体的文字：每份文档一段，编号是整条消息里的序号；与 Harness 的写法一致', () => {
  const notes = [
    {...D.threadNote(doc, 'c1'), text: '改成 750'},
    {doc: 'other', docPath: '/abs/other/', kind: 'ask', path: 'f-t#n/b40', label: '风险 › 空行', text: '补一张风险表\n按影响排序'},
    {...D.askNote(doc, 'plan', 'b5'), path: 'f-plan#n-plan', label: '末尾'},
    {doc: 'docs-x', docPath: '协作文档/发布计划/', kind: 'comment', path: 'somewhere', label: '计划', text: '数据来源？'},
  ];
  assert.equal(D.promptText(notes), [
    '<baocut-docs-annotations doc="协作文档/发布计划/">',
    '1. 评论 · 计划 › "首月 500 名付费学员"',
    '   位置：f-plan#n-plan/b2;thread=c1',
    '   原文：首月 500 名付费学员',
    '   评论：改成 750',
    '   回复：在线程 c1 里回复（docs_create utterance，parent 是这个 id）',
    '3. 请求 · 末尾',
    '   位置：f-plan#n-plan',
    '   请求：把这张表补到第 4 周',
    '   写到：正文 n-plan 的末尾',
    '4. 评论 · 计划',
    '   位置：somewhere',
    '   评论：数据来源？',
    '</baocut-docs-annotations>',
    '<baocut-docs-annotations doc="/abs/other/">',
    '2. 请求 · 风险 › 空行',
    '   位置：f-t#n/b40',
    '   请求：补一张风险表',
    '        按影响排序',
    '   写到：正文 n 的块 b40（还空着就替换它，否则写在它后面）',
    '</baocut-docs-annotations>',
  ].join('\n'));
  assert.equal(D.promptText(notes.slice(0, 1), id => 'docs/' + id).split('\n')[0], '<baocut-docs-annotations doc="docs/docs-x">');
  assert.equal(D.promptText([]), '');
});

test('模拟回复：每份文档读一遍，评论在线程里回复，请求写进文档', () => {
  const plan = D.replyPlan([D.threadNote(doc, 'c1'), D.askNote(doc, 'plan', 'b5'), D.threadNote(doc, 'c9')]);
  assert.equal(plan.kind, 'docs');
  assert.equal(plan.write, null);
  assert.equal(plan.summary, '收到 2 条评论、1 条请求。先读一遍协作文档，再逐条处理。');
  assert.deepEqual(plan.reads.map(r => r.tool), ['docs_read', 'docs_create', 'docs_update', 'docs_create']);
  assert.deepEqual(plan.reads[1].args, {path: '协作文档/发布计划/', object: 'utterance', parent: 'c1'});
  assert.deepEqual(plan.reads[2].args, {path: '协作文档/发布计划/', block: 'b5'});
  assert.equal(plan.close, '在线程里回复了 2 条评论，按 1 条请求改好了文档。还有要改的，在文档里再评论，发给我就行。');
  assert.equal(D.replyPlan([D.askNote(doc, 'plan', 'b5')]).summary, '收到 1 条请求。先读一遍协作文档，再逐条处理。');
});
