const test = require('node:test');
const assert = require('node:assert/strict');
global.window = {};
require('./model-home-design-system.js');
require('./model-home-design-system-notes.js');
const N = window.BC_HOME_DSYS_NOTES;

const system = {id: 'ds1', kind: 'design-system', name: 'Ember', fileCount: 9, readme: '# Ember',
  colors: [{name: 'accent', tokens: [['accent-background-default', '#3B63FB']]}],
  type: {families: {}, groups: []}, spacing: [], corners: [], shadows: [], extras: [],
  components: [{name: 'Button'}], assets: [{name: 'Icons', files: [['add.svg', 402]]}]};
const at = (anchor, section, name) => N.target(system, {anchor, section, name});

/* 锚点照原版 editor/comment-anchors.ts：干净且不长的名字原样拼上前缀，其余截短加哈希，总长不过 64、只含安全字符、同名同 id */
test('目标 id 与原版 commentTargetId 一致', () => {
  assert.equal(N.targetId('token', 'accent-background-default'), 'token-accent-background-default');
  assert.equal(N.targetId('comp', 'Button'), 'comp-Button');
  assert.equal(N.targetId('asset', 'add.svg'), 'asset-add-svg-' + N.anchorHash('add.svg'));
  assert.equal(N.targetId('page', ''), 'page-' + N.anchorHash(''));
  const long = '👋 ' + 'very long/name '.repeat(12);
  const id = N.targetId('doc', long);
  assert.equal(id.length, 64);
  assert.match(id, /^[A-Za-z0-9_-]+$/);
  assert.equal(id, N.targetId('doc', long));
  assert.equal(N.anchorHash('Button').length, 7);
  assert.deepEqual(N.targetProps('comp', 'Button'), {'data-id': 'comp-Button', 'data-comment-target': '', 'data-ds-name': 'Button'});
  assert.equal(N.prefixOf('asset-add-svg-0abc123'), 'asset');
});

test('位置给人看的是「设计系统 › 章节 › 种类 “名字”」，给模型看的带文件与锚点', () => {
  const token = at('token-accent-background-default', 'colors', 'accent-background-default');
  assert.equal(token.label, '设计系统「Ember」 › Colors › token “accent-background-default”');
  assert.equal(token.file, 'tokens.json');
  assert.equal(token.detail, 'Token "accent-background-default" in section colors (tokens.json) · token-accent-background-default');
  const comp = at('comp-Button', 'components', 'Button');
  assert.equal(comp.label, '设计系统「Ember」 › Components › 组件 “Button”');
  assert.equal(comp.file, 'components/Button/');
  assert.equal(at(N.targetId('asset', 'add.svg'), 'assets', 'add.svg').file, 'assets/Icons/add.svg');
  assert.equal(at(N.targetId('note', 'Button'), 'components', 'Button').file, 'components/Button/README.md');
  assert.equal(at(N.targetId('note', 'add.svg'), 'assets', 'add.svg').file, 'assets/Icons/README.md');
  const page = at('page-colors', 'colors', 'colors');
  assert.equal(page.label, '设计系统「Ember」 › Colors');
  assert.equal(page.detail, 'Section in section colors (tokens.json) · page-colors');
  assert.equal(at('page-readme', 'readme', 'readme').file, 'README.md');
  const cover = at('ds-cover', 'readme', 'cover');
  assert.equal(cover.label, '设计系统「Ember」 › Overview › 封面');
  assert.equal(cover.file, 'components/Cover/preview.html');
  assert.equal(at('style-ui', 'type', 'ui').label, '设计系统「Ember」 › Typography › 文字样式 “ui”');
  assert.equal(N.quote('x'.repeat(50)), 'x'.repeat(40) + '…');
});

test('草稿：空的、超长的、超过 20 条的都不收；编号是整份草稿里的序号', () => {
  const t = at('comp-Button', 'components', 'Button');
  assert.equal(N.add([], {...t, text: '  '}).error, '先写下批注，再添加到对话');
  assert.equal(N.add([], {...t, text: 'x'.repeat(2001)}).error, '一条批注最多 2000 字');
  const full = Array.from({length: 20}, (_, i) => ({id: 'n' + i, system: 'ds1', text: 'a'}));
  assert.match(N.add(full, {...t, text: 'b'}).error, /最多带 20 条设计系统标注/);
  const one = N.add([{id: 'x', system: 'ds2', text: 'other'}], {...t, id: 'a', system: 'ds1', text: '  圆角改小  '});
  assert.equal(one.error, null);
  assert.equal(one.notes[1].text, '圆角改小');
  assert.deepEqual(N.pins(one.notes, 'ds1').map(p => [p.id, p.n]), [['a', 2]]);
  assert.equal(N.tokenLabel(one.notes), '设计系统标注 · 2 条');
  assert.deepEqual(N.remove(one.notes, 'x').map(n => n.id), ['a']);
  assert.equal(N.remove(one.notes, 'nope'), one.notes);
});

test('跳转地址是「章节:锚点」，锚点里的冒号不拆', () => {
  assert.equal(N.jumpTo({section: 'components', anchor: 'comp-Button'}), 'components:comp-Button');
  assert.deepEqual(N.parseJump('colors:token-a:b'), {section: 'colors', anchor: 'token-a:b'});
  assert.equal(N.parseJump(''), null);
  assert.equal(N.parseJump(undefined), null);
});

/* docs/design/canvas §10.6：一套设计系统一块，编号各自从 1 起，批注多行时续行缩进 */
test('发给智能体的块按设计系统分组', () => {
  const a = {...at('comp-Button', 'components', 'Button'), id: 'a', system: 'ds1', text: '第一行\n第二行'};
  const b = {...at('token-x', 'colors', 'x'), id: 'b', system: 'ds2', text: '改深一点'};
  const text = N.promptText([a, b], id => `设计系统/${id}/`);
  assert.equal(text, [
    '<baocut-design-system-annotations system="设计系统/ds1/">',
    '1. 设计系统「Ember」 › Components › 组件 “Button”',
    '   定位：Component "Button" in section components (components/Button/) · comp-Button',
    '   批注：第一行',
    '        第二行',
    '</baocut-design-system-annotations>',
    '<baocut-design-system-annotations system="设计系统/ds2/">',
    '1. 设计系统「Ember」 › Colors › token “x”',
    '   定位：Token "x" in section colors (tokens.json) · token-x',
    '   批注：改深一点',
    '</baocut-design-system-annotations>',
  ].join('\n'));
});

test('模拟回复：一个文件改一步，每套设计系统检查一次', () => {
  const path = '设计系统/Ember/';
  const notes = [
    {...at('token-a', 'colors', 'a'), system: 'ds1', path, text: '1'},
    {...at('token-b', 'colors', 'b'), system: 'ds1', path, text: '2'},
    {...at('comp-Button', 'components', 'Button'), system: 'ds1', path, text: '3'},
  ];
  const plan = N.replyPlan(notes);
  assert.equal(plan.kind, 'design-system');
  assert.deepEqual(plan.reads.map(r => r.cmd), ['修改 设计系统/Ember/tokens.json', '修改 设计系统/Ember/components/Button/', 'design_system_check 设计系统/Ember/']);
  assert.equal(plan.close, '改好了 2 个文件，检查没有问题。哪里还不对，再标注一次。');
});

/* 演示数据（data.js 的 s27 最后一轮）：每条标注的位置与锚点就是模型对 dsys-spectrum2 算出来的 */
test('演示会话里的设计系统标注与模型一致', () => {
  ['substyle', 'pose', 'shape-paths', 'elements', 'textpresets', 'wordanim', 'subanim', 'subpresets', 'motioncaption', 'template', 'cut', 'defaultsub']
    .forEach((m) => require(`./model-${m}.js`));
  require('./data.js');
  const D = window.BC_DATA;
  const s2 = D.spaceOutputs.find(it => it.id === 'dsys-spectrum2');
  const sess = D.agent.sessions.find(s => s.id === 's27');
  const sent = sess.messages.find(m => m.designSystemAnnotations);
  assert.equal(sent.designSystemAnnotations.length, 2);
  for (const n of sent.designSystemAnnotations) {
    assert.equal(n.system, s2.id);
    assert.equal(n.path, s2.file);
    assert.equal(n.anchor, N.targetId(n.prefix, n.name));
    const t = N.target(s2, n);
    assert.deepEqual({label: n.label, detail: n.detail, file: n.file, prefix: n.prefix}, {label: t.label, detail: t.detail, file: t.file, prefix: t.prefix});
  }
  const names = new Set(s2.colors.flatMap(g => g.tokens.map(t => t[0])));
  assert.ok(names.has('notice-background-default'));
  assert.ok(s2.components.some(c => c.name === 'Button'));
});
