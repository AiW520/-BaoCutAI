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

test('一个包：缺省就装好、画面开着；老版本存的文字包按整包算，旧包的半截下载丢掉', () => {
  assert.equal(S.DEFAULT.install, 'full');
  assert.equal(S.DEFAULT.visual, true);
  assert.equal(S.fromSearch('?semantic=ready').install, 'full');
  assert.equal(S.normalize({install: 'text'}).install, 'full');
  assert.equal(S.normalize({install: 'none', half: {pkg: 'sem-full', have: ['embedding']}}).half, null);
  assert.deepEqual(S.normalize({}).excluded, []);
});

test('完整性按通道分别写，不是一个百分比（v0.1 §13.2）', () => {
  assert.equal(S.coverageLine({text: {done: 4, total: 4}, visual: {done: 18, total: 30}}), '文字已就绪；画面 18/30 个素材完成');
  assert.equal(S.coverageLine({text: {done: 2, total: 3, pending: 1}}), '文字 2/3 部视频（1 部还在转录）');
  assert.equal(S.coverageLine({text: {done: 0, total: 0}}), '没有文稿，未建立文字索引');
  assert.doesNotMatch(S.coverageLine({text: {done: 2, total: 3, pending: 1}, later: true}), /%/);
  assert.deepEqual(S.sumText([{text: {done: 1, total: 2, pending: 1}}, {text: {done: 3, total: 3}}]), {done: 4, total: 5, pending: 1, none: 0});
});

test('整包有文字与画面通道', () => {
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

test('自动停下（v0.1 §16.1）：用户暂停优先；用电池看设置；过热总是停', () => {
  assert.equal(S.pauseReasonOf({}), null);
  assert.equal(S.pauseReasonOf({power: 'battery'}), 'battery');
  assert.equal(S.pauseReasonOf({power: 'battery', pauseOnBattery: false}), null);
  assert.equal(S.pauseReasonOf({power: 'thermal', pauseOnBattery: false}), 'thermal');
  assert.equal(S.pauseReasonOf({power: 'battery', paused: true}), 'user');
  assert.equal(S.entryNote('search', {power: 'battery'}).text, S.POWER_NOTE.battery);
  assert.equal(S.entryNote('search', {paused: true}).text, S.PAUSED_NOTE);
});

test('还要多久（v0.1 §13.2）：量过的速度、参考速度、没有速度与时长未知各写一句', () => {
  assert.equal(S.etaLine({videos: 0, seconds: 0}), null);
  assert.equal(S.etaLine({videos: 3, seconds: 95, basis: 'measured'}), '还剩 3 部视频，约 2 分钟（按这台电脑的速度）');
  assert.equal(S.etaLine({videos: 2, seconds: 30, basis: 'default'}), '还剩 2 部视频，不到 1 分钟（按参考速度估）');
  assert.equal(S.etaLine({videos: 4, seconds: null, unknownDuration: 1}), '还剩 4 部视频；建完第一部后能估出时间');
  assert.equal(S.etaLine({videos: 4, seconds: 600, basis: 'measured', unknownDuration: 1}), '还剩 4 部视频，约 10 分钟（按这台电脑的速度，1 部时长未知未计入）');
  assert.equal(S.fmtDuration(5400), '约 1.5 小时');
});

test('合并的索引进度（2026-10-14）：一根条按估算时间合，按路写计数，画面排在讲话内容后面', () => {
  // 讲话内容在建、画面一帧没建：条不是 0（讲话内容那一段也算），还要多久含等讲话内容的时间
  const text = {done: 31, total: 212, doneSeconds: 372, estimate: {videos: 181, seconds: 2160, basis: 'measured', unknownDuration: 2}};
  const queued = {done: 0, total: 39730, doneSeconds: 0, estimate: {videos: 206, seconds: 43560, basis: 'default', unknownDuration: 7}};
  const a = S.indexProgress({text, visual: queued}, null);
  assert.equal(a.line, '讲话内容 31/212 部视频 · 画面 0/39,730 帧（讲话内容建完后开始）');
  assert.equal(a.eta, '还要约 12.7 小时（部分按参考速度估，7 部时长未知未计入）');
  assert.ok(a.value > 0 && a.value < 1);
  // 画面已经建了一部分、又有讲话内容要更新：画面接着等
  assert.match(S.indexProgress({text, visual: {...queued, done: 1200, doneSeconds: 1300}}, null).line, /画面 1,200\/39,730 帧（讲话内容建完后接着建）$/);
  // 画面在建：讲话内容已建好
  const b = S.indexProgress({text: {done: 12, total: 12, doneSeconds: 365, estimate: null},
    visual: {done: 312, total: 825, doneSeconds: 281, estimate: {videos: 8, seconds: 462, basis: 'measured'}}}, null);
  assert.equal(b.line, '讲话内容已建好 · 画面 312/825 帧');
  assert.equal(b.eta, '还要约 8 分钟（按这台电脑的速度）');
  assert.equal(Math.round(b.value), 58); // 讲话内容那一段（365 秒）也在条上
  // 停着：写原因，不写时间
  assert.equal(S.indexProgress({text, visual: queued}, 'battery').eta, '已暂停（用电池）');
  // 讲话内容的速度还没量过：条不定量
  const c = S.indexProgress({text: {...text, estimate: {videos: 181, seconds: null}}, visual: queued}, null);
  assert.equal(c.value, null);
  assert.equal(c.eta, '建完第一部视频后能估出还要多久');
  // 画面没开：只有讲话内容一路；都建完了没有进度
  assert.equal(S.indexProgress({text}, null).line, '讲话内容 31/212 部视频');
  assert.equal(S.indexProgress({text: {done: 3, total: 3, doneSeconds: 90}}, null), null);
});

test('讲话内容正在建的那一部写它编到百分之几（2026-10-14）：第一部还没量出速度时也看得出在走', () => {
  const queued = {done: 0, total: 39341, doneSeconds: 0, estimate: {videos: 188, seconds: 43275, basis: 'default'}};
  const first = {done: 0, total: 188, doneSeconds: null, current: {done: 48, total: 137}, estimate: {videos: 188, seconds: null}};
  const a = S.indexProgress({text: first, visual: queued}, null);
  assert.equal(a.line, '讲话内容 0/188 部视频（当前这部 35%） · 画面 0/39,341 帧（讲话内容建完后开始）');
  assert.equal(a.value, null);
  // 还在读内容（要编码的还不知道）、停着：不写
  assert.equal(S.indexProgress({text: {...first, current: {done: 0, total: 0}}}, null).line, '讲话内容 0/188 部视频');
  assert.equal(S.indexProgress({text: first}, 'user').line, '讲话内容 0/188 部视频');
});

test('打开画面之前写开销（v0.1 §13.2）：帧数、首次要多久、向量多大；关键帧缓存另算', () => {
  assert.equal(S.visualCostLine(null), null);
  assert.equal(
    S.visualCostLine({videos: 12, unknownDuration: 0, sourceSeconds: 6600, frames: 825, seconds: 908, basis: 'default', vectorBytes: 1689600}),
    '12 部视频共约 1.8 小时 → 约 825 帧，首次约 15 分钟（CPU 参考速度），向量约 2 MB；关键帧缓存另算，可清理',
  );
  assert.equal(
    S.visualCostLine({videos: 2, unknownDuration: 1, sourceSeconds: 600, frames: 75, seconds: 60, basis: 'measured', vectorBytes: 153600}),
    '2 部视频共约 10 分钟 → 约 75 帧，1 部时长未知未计入，首次约 1 分钟（按这台电脑的速度），向量不到 1 MB；关键帧缓存另算，可清理',
  );
  assert.equal(S.visualCostLine({videos: 1, unknownDuration: 1, sourceSeconds: 0, frames: 0, seconds: 0, basis: 'default', vectorBytes: 0}),
    '1 部视频，时长未知，估不出要多久');
});

test('首页新会话缺省可检索全部视频（不显示标签）；属于项目、在已有视频里继续的不挂', () => {
  assert.equal(S.defaultReadScope({}), 'all');
  assert.equal(S.defaultReadScope({dir: 'd1'}), null);
  assert.equal(S.defaultReadScope({project: 'p1'}), null);
  assert.equal(S.READ_SCOPE.all, undefined);
  assert.equal(S.READ_SCOPE.unfiled, '可检索不属于项目的视频');
});
