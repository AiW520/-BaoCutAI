const test = require('node:test');
const assert = require('node:assert/strict');
global.window = {};
const F = require('./model-framing.js');

const WIDE = 16 / 9, TALL = 9 / 16;

test('poseFor：16:9 原片在 9:16 画面里铺满，盒就是整幅原片，取景点决定左右哪一段落在画面里', () => {
  const center = F.poseFor({x: 0.5, y: 0.5, zoom: 1}, WIDE, TALL);
  assert.equal(center.w, 316.05);
  assert.equal(center.h, 100);
  assert.deepEqual([center.x, center.y, center.scale, center.rot], [50, 50, 1, 0]);
  /* 贴左：原片左边对齐画面左边，盒中心在 w / 2 */
  assert.equal(F.poseFor({x: 0, y: 0.5}, WIDE, TALL).x, 158.02);
  assert.equal(F.poseFor({x: 1, y: 0.5}, WIDE, TALL).x, -58.02);
  /* 没写 zoom 按 1，没写取景点按居中 */
  assert.deepEqual(F.poseFor(null, WIDE, TALL), center);
});

test('poseFor：同一份取景换画幅自动重新对准；回到原片画幅、不放大时就是整幅原片', () => {
  const f = {x: 0.3, y: 0.5, zoom: 1};
  assert.deepEqual(F.poseFor(f, WIDE, WIDE), {x: 50, y: 50, w: 100, h: 100, scale: 1, rot: 0});
  const square = F.poseFor(f, WIDE, 1);
  assert.equal(square.h, 100, '方画幅仍按高铺满');
  assert.ok(square.x > 50, '取景点偏左时原片往右挪');
  /* 放大之后回到 16:9：保留特写，上下也有多出来的部分 */
  const close = F.poseFor({x: 0.3, y: 0.2, zoom: 1.5}, WIDE, WIDE);
  assert.deepEqual([close.w, close.h], [150, 150]);
  assert.equal(close.y, 65);
});

test('anchorOf：取景点在原片上的那一点落在画面同一比例处，放大前后都不动', () => {
  const f = {x: 0.3, y: 0.5, zoom: 1};
  assert.deepEqual(F.anchorOf(f), {x: 0.3, y: 0.5});
  assert.deepEqual(F.anchorOf(null), {x: 0.5, y: 0.5});
  /* 原片上 x = 0.3 的那一点在画面上的位置：盒左边 + 0.3 × 盒宽 */
  const at = (p) => (p.x - p.w / 2) + 0.3 * p.w;
  for (const zoom of [1, 1.7, 4]) assert.ok(Math.abs(at(F.poseFor({x: 0.3, y: 0.5, zoom}, WIDE, TALL)) - 30) < 0.02);
});

test('zoomTo：只改放大倍数，取景点不动；最小铺满、最大 MAX_ZOOM，越界时说 min / max', () => {
  const start = {x: 0.3, y: 0.5, zoom: 1};
  const r = F.zoomTo(start, 2);
  assert.deepEqual(r, {focal: {x: 0.3, y: 0.5, zoom: 2}, hit: null});
  assert.ok(F.poseFor(r.focal, WIDE, TALL).h > 100, '放大后上下也多出来了');
  const small = F.zoomTo(r.focal, 0.5);
  assert.deepEqual(small.focal, start);
  assert.equal(small.hit, 'min');
  assert.equal(F.zoomTo(start, 0.99).hit, null, '差一点点不弹提示');
  const big = F.zoomTo(start, 9);
  assert.equal(big.focal.zoom, F.MAX_ZOOM);
  assert.equal(big.hit, 'max');
  /* 贴边的取景点放大后原片那条边仍贴着画面边，不会露出背景 */
  const edge = F.poseFor(F.zoomTo({x: 0, y: 0.5}, 1.6).focal, WIDE, TALL);
  assert.ok(Math.abs(edge.x - edge.w / 2) < 1e-6);
});

test('sameFocal 与文案', () => {
  assert.ok(F.sameFocal({x: 0.3, y: 0.5, zoom: 1}, {x: 0.3}));
  assert.ok(!F.sameFocal({x: 0.3, y: 0.5, zoom: 1}, {x: 0.3, y: 0.5, zoom: 1.2}));
  assert.ok(!F.sameFocal(null, {x: 0.5}));
  assert.equal(F.COPY.hit.max, '最多放大到 4 倍');
  assert.equal(F.COPY.mode, '按原片取景');
  assert.equal(F.COPY.whyTitle, '为什么只能放大');
  assert.equal(F.COPY.appliedAll(3), '已把这一段的放大倍数用到全部 3 段');
});
