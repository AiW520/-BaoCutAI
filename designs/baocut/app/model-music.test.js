const test = require('node:test');
const assert = require('node:assert/strict');
const M = require('./model-music.js');

test('表单字段与 Runtime 的 GenerateMusicRequest 同名；提交体按模式带歌词、按需带种子', () => {
  const f = Object.assign(M.blank('yue2-3b'), {style: ' calm piano ', targetDurationSec: 30});
  assert.deepEqual(Object.keys(M.blank()), ['mode', 'style', 'lyrics', 'targetDurationSec', 'maxDurationSec', 'planning', 'seed', 'model']);
  assert.deepEqual(M.request(f), {mode: 'instrumental', style: 'calm piano', targetDurationSec: 30, maxDurationSec: 36, planning: 'melody', model: 'yue2-3b'});
  const song = Object.assign({}, f, {mode: 'song', lyrics: '一行歌词', seed: '7', maxDurationSec: 40});
  assert.deepEqual(M.request(song).lyrics, '一行歌词');
  assert.equal(M.request(song).seed, 7);
  assert.equal(M.request(song).maxDurationSec, 40);
});

test('时长 → 语义 token 按 25 token / 秒；上限缺省比目标多两成、不超过 300 秒', () => {
  assert.equal(M.clampDuration(206), 210);
  assert.equal(M.clampDuration(205), 205);
  assert.equal(M.clampDuration(3), 10);
  assert.equal(M.clampDuration(4000), 300);
  assert.equal(M.clampDuration(null), 30);
  assert.equal(M.TOKENS_PER_SEC, 25);
  assert.equal(M.tokens(30), 750);
  assert.equal(M.maxOf({targetDurationSec: 30}), 36);
  assert.equal(M.maxOf({targetDurationSec: 300}), 300);
  assert.equal(M.maxOf({targetDurationSec: 30, maxDurationSec: 45}), 45);
  assert.equal(M.truncated(35.5, {targetDurationSec: 30}), true);
  assert.equal(M.truncated(20, {targetDurationSec: 30}), false);
});

test('校验：先模型、再风格；带唱的歌要歌词；时长与上限、种子各一句人话', () => {
  assert.equal(M.validate(M.blank()), '先选一只音乐模型');
  assert.equal(M.validate(M.blank('yue2-3b')), '先写一句风格');
  const f = Object.assign(M.blank('yue2-3b'), {style: 'lo-fi'});
  assert.equal(M.validate(f), null);
  assert.match(M.validate(Object.assign({}, f, {mode: 'song'})), /歌词/);
  assert.match(M.validate(Object.assign({}, f, {targetDurationSec: 5})), /10–300/);
  assert.match(M.validate(Object.assign({}, f, {maxDurationSec: 20})), /上限/);
  assert.match(M.validate(Object.assign({}, f, {seed: 'abc'})), /数字/);
});

test('预计耗时按本机倍数说「大约」；CPU 另说', () => {
  assert.equal(M.etaText(30), '本机大约 3 分钟');
  assert.equal(M.etaText(10), '本机大约 60 秒');
  assert.match(M.etaText(30, {cpu: true}), /^CPU 生成，本机大约 10 分钟$/);
  assert.equal(M.phase(3, {planning: 'full'}), '加载模型');
  assert.equal(M.phase(15, {planning: 'full'}), '编排乐谱');
  assert.equal(M.phase(15, {planning: 'off'}), '生成音乐');
  assert.equal(M.phase(90, {}), '渲染音频');
});

test('文件名取风格头几个字加序号；记录一行写模式、时长、规划、模型、种子', () => {
  assert.equal(M.nameFor({style: 'calm solo piano, slow tempo'}, 3), 'calm solo piano slow tempo-03.wav');
  assert.equal(M.nameFor({style: ''}, 12), 'music-12.wav');
  assert.equal(M.recordMeta({form: Object.assign(M.blank('yue2-3b'), {seed: '7'}), modelName: 'YuE2 3B'}), '纯音乐 · 30 秒 · 先定旋律 · YuE2 3B · 种子 7');
});

test('模型行只列音乐类；预选默认或第一只装好的；目录卡状态行', () => {
  const all = [{id: 'yue2-3b', name: 'YuE2 3B', cat: 'music', size: 4600}, {id: 'x', name: 'X', cat: 'tts'}];
  const none = M.models(all, () => false);
  assert.deepEqual(none.map((m) => m.id), ['yue2-3b']);
  assert.equal(M.preferred(none, null), 'yue2-3b');
  assert.deepEqual(M.toolStatus(none), {text: '1 个音乐模型可下载 · 约 4.5 GB', on: false});
  const on = M.models(all, () => true);
  assert.deepEqual(M.toolStatus(on), {text: '已装 1 / 1 个音乐模型 · 在本机生成', on: true});
  assert.deepEqual(M.toolStatus([]), {text: '还没有音乐模型', on: false});
});

test('试听：固定 10 秒纯音乐、直接生成；换风格就换 key', () => {
  const a = M.quickForm(M.quickDefaults(), 'yue2-3b');
  assert.equal(a.targetDurationSec, 10);
  assert.equal(a.planning, 'off');
  assert.equal(M.validate(a), null);
  const b = M.quickForm({style: 'lofi'}, 'yue2-3b');
  assert.notEqual(M.quickKey(a), M.quickKey(b));
  assert.match(M.quickSummary({style: 'lofi'}, 42), /^Lo-fi 节拍 · 10 秒 · 8 步 · 用了 42 秒$/);
});

test('生成配乐：不超过单次上限按视频预填；超过时预填上限、要循环，横幅写明', () => {
  assert.deepEqual(M.soundtrackFor(206), {targetDurationSec: 210, loop: false, note: null});
  assert.equal(M.loopLayout(M.soundtrackFor(206).targetDurationSec, 206).length, 1, '不超过上限的视频只放一段');
  assert.equal(M.soundtrackFor(298).targetDurationSec, 300);
  assert.deepEqual(M.soundtrackFor(300), {targetDurationSec: 300, loop: false, note: null});
  const long = M.soundtrackFor(742);
  assert.equal(long.targetDurationSec, 300);
  assert.equal(long.loop, true);
  assert.equal(long.note, '视频 742 秒超过单次上限 300 秒，会生成 300 秒并循环铺满，片尾淡出。');
  assert.equal(M.soundtrackFor(null).targetDurationSec, 30);
});

/** 每一刻都有声音：相邻两段重叠正好一个交叉淡化，交替两条轨，最后一段收在视频结尾 */
function assertCovers(layout, total) {
  assert.equal(layout[0].start, 0);
  layout.forEach((s, i) => {
    assert.equal(s.lane, i % 2);
    assert.ok(s.fadeIn <= 5 && s.fadeOut <= 5, '淡入淡出在 AudioMix 的 [0, 5] 秒里');
    if (i) assert.ok(Math.abs(layout[i - 1].start + layout[i - 1].dur - s.start - s.fadeIn) < 1e-6, '接缝重叠一个交叉淡化');
  });
  const last = layout[layout.length - 1];
  assert.ok(Math.abs(last.start + last.dur - total) < 1e-6);
}

test('循环铺满：音乐比视频长只有一段，截到结尾、片尾淡出', () => {
  const l = M.loopLayout(300, 206);
  assert.deepEqual(l, [{start: 0, dur: 206, lane: 0, fadeIn: 0, fadeOut: 3}]);
  assert.equal(M.loopSummary(l, 206), '片尾淡出 3 秒');
});

test('循环铺满：首尾相接、接缝交叉淡化 2 秒、交替两条轨，最后一段片尾淡出', () => {
  const l = M.loopLayout(300, 742);
  assertCovers(l, 742);
  assert.deepEqual(l.map((s) => s.start), [0, 298, 596]);
  assert.deepEqual(l.map((s) => s.dur), [300, 300, 146]);
  assert.deepEqual(l.map((s) => [s.fadeIn, s.fadeOut]), [[0, 2], [2, 2], [2, 3]]);
  assert.equal(M.loopSummary(l, 742), '循环 3 段铺满 742 秒 · 接缝交叉淡化 2 秒 · 片尾淡出 3 秒');
});

test('循环铺满：正好整段数、剩一小截时最后一段仍长过交叉淡化；音乐写长了按实际时长铺', () => {
  const exact = M.loopLayout(300, 598);   // 300 + 298：第二段正好放完
  assertCovers(exact, 598);
  assert.equal(exact.length, 2);
  assert.equal(exact[1].dur, 300);
  const sliver = M.loopLayout(300, 299);  // 只多出 1 秒：前一段收尾时第二段进来
  assertCovers(sliver, 299);
  assert.equal(sliver.length, 1);
  const tiny = M.loopLayout(300, 301);
  assertCovers(tiny, 301);
  assert.equal(tiny.length, 2);
  assert.ok(tiny[1].dur > tiny[1].fadeIn);
  assert.ok(tiny[1].fadeOut <= tiny[1].dur - tiny[1].fadeIn);
  assertCovers(M.loopLayout(360, 3120), 3120);
  assert.deepEqual(M.loopLayout(0, 100), []);
});
