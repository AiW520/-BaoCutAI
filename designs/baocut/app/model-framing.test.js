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

test('pan：从起手那份取景算，画面跟着手走；夹在原片里，顶到边时说 edge', () => {
  const start = {x: 0.5, y: 0.5, zoom: 1};
  /* 原片比画面宽 2.16 倍：往左拖 0.216 个画面宽，取景点往右挪 0.1 */
  const r = F.pan(start, -0.216, 0, WIDE, TALL);
  assert.equal(r.focal.x, 0.5 + 0.1);
  assert.equal(r.hit, null);
  assert.equal(r.focal.zoom, 1);
  const far = F.pan(start, -5, 0, WIDE, TALL);
  assert.equal(far.focal.x, 1);
  assert.equal(far.hit, 'edge');
  /* 铺满的那一边没有余量：上下拖不动，小抖动不算顶到边，拖远了才说 */
  assert.equal(F.pan(start, 0, 0.02, WIDE, TALL).hit, null);
  const up = F.pan(start, 0, 0.2, WIDE, TALL);
  assert.equal(up.focal.y, 0.5);
  assert.equal(up.hit, 'edge');
});

test('zoomTo：画面正中对着的那一点不动；最小铺满、最大 MAX_ZOOM，越界时说 min / max', () => {
  const start = {x: 0.3, y: 0.5, zoom: 1};
  const before = F.poseFor(start, WIDE, TALL);
  const r = F.zoomTo(start, 2, WIDE, TALL);
  assert.equal(r.hit, null);
  assert.equal(r.focal.zoom, 2);
  const after = F.poseFor(r.focal, WIDE, TALL);
  /* 原片上对着画面正中（50%）的那一点：(50 - 盒左边) / 盒宽 */
  const at = (p) => (50 - (p.x - p.w / 2)) / p.w;
  assert.ok(Math.abs(at(before) - at(after)) < 1e-3);
  assert.ok(after.h > 100, '放大后上下也多出来了');
  const small = F.zoomTo(r.focal, 0.5, WIDE, TALL);
  assert.equal(small.focal.zoom, 1);
  assert.equal(small.hit, 'min');
  assert.equal(F.zoomTo(start, 0.99, WIDE, TALL).hit, null, '差一点点不弹提示');
  const big = F.zoomTo(start, 9, WIDE, TALL);
  assert.equal(big.focal.zoom, F.MAX_ZOOM);
  assert.equal(big.hit, 'max');
});

test('zoomTo：放大后的取景点仍在 [0, 1]，靠边的那一点放大后还贴着边', () => {
  const r = F.zoomTo({x: 0, y: 0.5, zoom: 1}, 1.6, WIDE, TALL);
  assert.ok(r.focal.x >= 0 && r.focal.x <= 1);
  assert.equal(r.focal.y, 0.5);
  const p = F.poseFor(r.focal, WIDE, TALL);
  assert.ok(p.x - p.w / 2 <= 0 + 1e-6, '原片左边不进画面');
});

test('sameFocal 与文案', () => {
  assert.ok(F.sameFocal({x: 0.3, y: 0.5, zoom: 1}, {x: 0.3}));
  assert.ok(!F.sameFocal({x: 0.3, y: 0.5, zoom: 1}, {x: 0.3, y: 0.5, zoom: 1.2}));
  assert.ok(!F.sameFocal(null, {x: 0.5}));
  assert.equal(F.COPY.hit.max, '最多放大到 4 倍');
  assert.equal(F.COPY.mode, '按原片取景');
});
