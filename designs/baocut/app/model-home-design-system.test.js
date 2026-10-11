const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
global.window = {};
require('./model-home-design-system.js');
const G = window.BC_HOME_DESIGN_SYSTEM;

const blank = {id: 'ds0', kind: 'design-system', name: 'Blank', fileCount: 1, readme: '', colors: [], type: {families: {}, groups: []},
  spacing: [], corners: [], shadows: [], extras: [], components: [], assets: []};
const filled = {id: 'ds1', kind: 'design-system', name: 'Filled', fileCount: 80, readme: '# Title\n\nIntro.',
  colors: [{name: '', tokens: [['heading', '{gray-900}']]}, {name: 'gray', tokens: [['gray-900', '#292929', '#DBDBDB']]}],
  type: {families: {sans: '"Adobe Clean", system-ui'}, groups: [{name: 'UI', family: 'sans', styles: [['ui', '14px', '18px', 400]]}]},
  spacing: [['space-4', '4px']], corners: [], shadows: [], extras: [{key: 'borderWidth', title: 'Border width', tokens: [['bw-1', '1px']]}],
  components: [{name: 'Button'}], assets: [{name: 'Icons', files: [['a.svg', 402]]}]};

/* 章节与导航照原版：核心、其他 token 家族、内容章节，尾巴上一行 Files */
test('章节次序照原版，其他 token 家族插在 Shadows 与 Components 之间', () => {
  assert.deepEqual(G.sections(blank).map(s => s.id), ['readme', 'colors', 'type', 'spacing', 'corners', 'shadows', 'components', 'assets']);
  assert.deepEqual(G.sections(blank).map(s => s.label),
    ['Overview', 'Colors', 'Typography', 'Spacing', 'Corner radius', 'Shadows', 'Components', 'Assets']);
  const ids = G.sections(filled).map(s => s.id);
  assert.deepEqual(ids.slice(5, 8), ['shadows', 'family-borderWidth', 'components']);
  assert.equal(G.sections(filled)[6].label, 'Border width');
  assert.equal(G.icon('family-borderWidth'), 'Properties');
  assert.equal(G.icon('colors'), 'Color');
});

test('Files 行带文件数，读屏名是「Files, 80」，其余行没有数', () => {
  assert.deepEqual(G.tail(filled), [{id: 'files', label: 'Files', count: 80, countLabel: '80 files'}]);
  assert.equal(G.tail(blank)[0].countLabel, '1 file');
  assert.equal(G.rowLabel(G.tail(filled)[0]), 'Files, 80');
  assert.equal(G.rowLabel(G.sections(filled)[0]), undefined);
});

test('刚建好的设计系统算空的：每章都没东西', () => {
  assert.equal(G.isEmpty(blank), true);
  assert.equal(G.isEmpty(filled), false);
  assert.equal(G.isSectionEmpty(filled, 'corners'), true);
  assert.equal(G.isSectionEmpty(filled, 'family-borderWidth'), false);
  assert.equal(G.count(filled, 'colors'), 2);
  assert.equal(G.noneYet('family-borderWidth'), 'No tokens yet.');
  assert.match(G.emptyHint('colors'), /^Ask the agent for a palette/);
  assert.deepEqual(G.sectionActions(filled, 'type').map(a => a.label), ['Add', 'Upload font']);
  assert.equal(G.sectionActions(filled, 'family-borderWidth')[0].what, 'Add border width token');
  assert.deepEqual(G.sectionActions(filled, 'components'), []);
});

/* 起步卡片与提示词：说法取移植版，称呼 agent，不出现 Claude；设计系统按目录路径称呼 */
test('起步卡片放进输入框的话指向这套设计系统，只说 the agent', () => {
  assert.deepEqual(G.WELCOME_OPTIONS.map(o => o.title), ['Sync from GitHub', 'Build from connectors', 'Upload brand files']);
  const p = '~/BaoCut/x/设计系统/A/';
  const gh = G.welcomePrompt('github', p);
  assert.ok(gh.startsWith('I want to start this design system from a GitHub repository. Use the design-system skill’s own from-code guide'));
  assert.ok(gh.includes('`~/BaoCut/x/设计系统/A/`'));
  const cn = G.welcomePrompt('connect', p);
  assert.ok(cn.startsWith('I pressed Build from connectors on this empty design system, `~/BaoCut/x/设计系统/A/`'));
  assert.ok(cn.includes('connectors (MCP servers)'));
  assert.equal(G.welcomePrompt('upload', p), null);
  const all = [gh, cn, G.STARTER_README, G.REQUEST_IN_COMPOSER, ...Object.values(G.EMPTY_HINTS), ...G.WELCOME_OPTIONS.map(o => o.text)].join('\n');
  assert.doesNotMatch(all, /Claude/);
  assert.match(G.STARTER_README, /the agent reads it before it designs anything/);
  assert.equal(G.address(''), 'this design system (the one this message was sent from)');
  assert.equal(G.address('a`b'), '`a?b`');
});

test('README 切块：标题、段落、列表、表格与行内的代码、粗体', () => {
  const b = G.markdown('# T\n\nOne\ntwo.\n\n## H\n\n- a\n- b\n\n| A | B |\n| --- | --- |\n| 1 | 2 |\n');
  assert.deepEqual(b.map(x => x.type), ['h1', 'p', 'h2', 'ul', 'table']);
  assert.equal(b[1].text, 'One two.');
  assert.deepEqual(b[3].items, ['a', 'b']);
  assert.deepEqual(b[4], {type: 'table', head: ['A', 'B'], rows: [['1', '2']]});
  assert.deepEqual(G.inline('Use `x` and **y**.'), [{t: 'text', v: 'Use '}, {t: 'code', v: 'x'}, {t: 'text', v: ' and '}, {t: 'bold', v: 'y'}, {t: 'text', v: '.'}]);
});

test('颜色、文字样式与素材的读法照原版', () => {
  assert.deepEqual(G.colorToken(['heading', '{gray-900}', 'Headings.']), {name: 'heading', light: '{gray-900}', dark: '{gray-900}', inherited: true, usage: 'Headings.'});
  assert.deepEqual(G.colorToken(['x', '{gray-25}', '{gray-75}', 'U']), {name: 'x', light: '{gray-25}', dark: '{gray-75}', inherited: false, usage: 'U'});
  assert.equal(G.resolveColor(filled, 'heading', 'dark'), 'gray-900');
  assert.equal(G.resolveColor(filled, 'nope', 'light'), null);
  assert.equal(G.groupName({name: ''}), 'Palette');
  assert.equal(G.typeSpec(['ui-xs', '11px', '14px', 400], 'sans', {sans: 'adobe-clean-spectrum-vf, system-ui'}), 'adobe-clean-spectrum-vf · 11/14px · Regular');
  assert.equal(G.typeSpec(['body', '16px', 1.5, 800], 'sans', {sans: '"Source Serif", serif'}), 'Source Serif · 16/1.5 · Heavy');
  assert.equal(G.fileMeta('S2_Icon_Add_20_N.svg', 402), 'SVG · 402 B');
  assert.equal(G.fileMeta('a.woff2', 2048), 'Font · 2 KB');
});

test('导航里的 Search：按章节列命中，没找到时说一声', () => {
  assert.equal(G.search(filled, '  '), null);
  const r = G.search(filled, 'gray');
  assert.deepEqual(r.groups.map(g => g.section), ['colors']);
  assert.equal(r.groups[0].hits[0].label, 'gray-900');
  assert.deepEqual(G.searchStatus('zzz', G.search(filled, 'zzz')), {visible: true, text: 'No matches for “zzz”'});
  assert.equal(G.searchStatus('gray', r).visible, false);
});

test('滚动亮章：进到上沿以内的最后一章；滚到底亮最后一章', () => {
  const tops = [{id: 'a', top: 0}, {id: 'b', top: 400}, {id: 'c', top: 900}];
  assert.equal(G.activeSection(tops, 0), 'a');
  assert.equal(G.activeSection(tops, 380), 'b');
  assert.equal(G.activeSection(tops, 500, {atEnd: true}), 'c');
  assert.equal(G.activeSection([], 0), null);
});

test('标题栏副标题：空的设计系统不写「0 个组件」', () => {
  assert.equal(G.meta(filled), '设计系统 · 1 个组件');
  assert.equal(G.meta(blank), '设计系统');
});

/* 演示数据（data.js 的 dsys-spectrum2、dsys-new 与会话 s27、s28）：色值与原型 tokens.css 的浅/深两值一致，别名都走得通；
   字号、圆角落在 S2 阶梯上；图标都在 S2 图标包里；s27 里发出去的那段话就是「Sync from GitHub」放进输入框的话 */
test('演示设计系统：Spectrum 2 与一套刚建好的', () => {
  ['substyle', 'pose', 'shape-paths', 'elements', 'textpresets', 'wordanim', 'subanim', 'subpresets', 'motioncaption', 'template', 'cut', 'defaultsub']
    .forEach((m) => require(`./model-${m}.js`));
  require('./data.js');
  const D = window.BC_DATA;
  const s2 = D.spaceOutputs.find(it => it.id === 'dsys-spectrum2');
  const fresh = D.spaceOutputs.find(it => it.id === 'dsys-new');
  assert.ok(s2 && fresh);
  assert.equal(G.isEmpty(fresh), true);
  assert.equal(G.isEmpty(s2), false);
  assert.deepEqual(G.sections(s2).map(s => s.id).filter(id => !G.sections(fresh).some(x => x.id === id)), ['family-borderWidth']);
  assert.equal(G.rowLabel(G.tail(s2)[0]), 'Files, 80');
  assert.equal(s2.components.length, 12);
  assert.equal(s2.assets[0].files.length, 46);

  const css = fs.readFileSync(path.join(__dirname, 'tokens.css'), 'utf8');
  const pair = token => (new RegExp(`--${token}:light-dark\\((#[0-9A-F]{6}),\\s*(#[0-9A-F]{6})\\)`, 'i').exec(css) || []).slice(1).map(v => v.toUpperCase());
  for (const g of s2.colors) for (const row of g.tokens) {
    const t = G.colorToken(row);
    for (const theme of ['light', 'dark']) {
      const v = t[theme];
      if (!G.aliasOf(v)) {
        const [l, d] = pair(t.name);
        assert.ok(l, `${t.name} 不在 tokens.css 里`);
        assert.equal(v.toUpperCase(), theme === 'light' ? l : d, `${t.name} 的${theme === 'light' ? '浅' : '深'}色值与 tokens.css 不一致`);
      }
      assert.ok(G.resolveColor(s2, t.name, theme), `${t.name} 的别名走不通（${theme}）`);
    }
  }
  const geom = require('../_ds/adobe-spectrum-2/components/control-geometry.json');
  for (const g of s2.type.groups) for (const st of g.styles) assert.ok(geom.fontSize.scale.includes(parseInt(st[1], 10)), `${st[0]} 的字号不在 S2 阶梯上`);
  for (const [name, v] of s2.corners) assert.ok(geom.cornerRadius.scale.includes(parseInt(v, 10)) || parseInt(v, 10) >= 999, `${name} 不在圆角阶梯上`);

  const entry = fs.readFileSync(path.join(__dirname, '../vendor/react-spectrum-s2/build/entry.js'), 'utf8');
  const icons = new Set([...entry.slice(entry.indexOf('export const Icons')).matchAll(/^\s+(\w+): I_\w+,/gm)].map(m => m[1]));
  for (const [file] of s2.assets[0].files) {
    const name = /^S2_Icon_(\w+)_20_N\.svg$/.exec(file)[1];
    assert.ok(icons.has(name) || name === 'MoreVertical', `${name} 不在 S2 图标包里`);
  }

  for (const ds of [s2, fresh]) {
    const sess = D.agent.sessions.find(s => s.id === ds.session);
    assert.ok(sess && sess.dir === ds.dir, `${ds.id} 的会话在它的目录里`);
    assert.ok(sess.messages.some(m => (m.artifactIds || []).includes(ds.id)), `${ds.id}：会话里有一条回复挂着它`);
    assert.ok(sess.messages.some(m => m.tool === 'design_system_check'), `${ds.id}：会话里检查过它`);
  }
  const s27 = D.agent.sessions.find(s => s.id === 's27');
  const dir = D.agentProjects.find(d => d.id === s2.dir);
  assert.ok(s27.messages.some(m => m.role === 'user' && m.text === G.githubStarterPrompt(G.systemPath(s2, dir))), 's27 发出去的是「Sync from GitHub」那段话');
  const said = D.agent.sessions.filter(s => s.id === 's27' || s.id === 's28').flatMap(s => s.messages.map(m => m.text || '')).join('\n');
  assert.doesNotMatch(said, /Claude/);
});
