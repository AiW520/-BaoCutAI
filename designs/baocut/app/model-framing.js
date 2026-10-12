/* 按原片取景的纯模型（product-design §5.10「画面怎么取景」）：取景点 + 放大倍数 → 画面上的盒，拖动与缩放的换算和夹取，
   以及画布上说明它的文案。不碰 DOM、不依赖 React；node --test 直接 require。

   视频在画布上有两种摆法（2026-10-12 定）：
   - 带取景点（元素文档的 `focal: {x, y, zoom}`）的视频按原片取景。剪成短视频时每一段原片都这样摆。它记的是对准原片的哪里
     （`x`、`y` 同 CSS object-position 的百分比：0 贴左 / 上，1 贴右 / 下）和在「刚好铺满」之上再放大多少（`zoom` ≥ 1），
     不是画面上的一个框：换画幅时按新画幅重算盒，永远铺满、不露背景。所以画布上只能在原片范围里拖动、放大，
     不能缩到比画面小、拉伸或旋转。实现里对应视频格式的 `focalPoint` 与 `place.scale`（相对铺满）。
   - 没有取景点的视频像其它素材一样自由摆放：`pose` 按画面的百分比记，可以拖出画面、缩到比画面小；换画幅时按百分比重排。
   带取景点的视频不会因为拖过头自己变成自由摆放，只能用「改成自由摆放」明确地换。 */
(function () {
  const MAX_ZOOM = 4;
  /* 拖过头多少（画面宽或高的比例）才算顶到边：手上的抖动不该一直弹提示。 */
  const SLACK = 0.03;
  const EPS = 1e-6;

  const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
  const round = (v, d) => { const k = Math.pow(10, d); return Math.round(v * k) / k; };
  const axisOf = (v) => (v == null || !Number.isFinite(v) ? 0.5 : clamp01(v));
  const zoomOf = (f) => (f && Number.isFinite(f.zoom) ? Math.max(1, Math.min(MAX_ZOOM, f.zoom)) : 1);

  /** 刚好铺满时原片相对画面的宽、高倍数：铺满方向正好是 1，另一边多出来。 */
  function coverSize(srcRatio, outRatio) {
    const r = srcRatio > 0 ? srcRatio : 16 / 9, o = outRatio > 0 ? outRatio : 9 / 16;
    return r >= o ? {w: r / o, h: 1} : {w: 1, h: o / r};
  }
  /** 按这份取景放大之后，原片相对画面的宽、高倍数。 */
  function sizeOf(focal, srcRatio, outRatio) {
    const c = coverSize(srcRatio, outRatio), z = zoomOf(focal);
    return {w: c.w * z, h: c.h * z};
  }

  /** 取景 → 画面上的盒，单位同元素的 `pose`：中心是画面宽、高的百分比，`w` 是画面宽的百分比，`h` 是画面高的百分比。
      盒就是整幅原片，所以选中框和角柄落在原片的边上，可以超出画面。 */
  function poseFor(focal, srcRatio, outRatio) {
    const s = sizeOf(focal, srcRatio, outRatio);
    const fx = axisOf(focal && focal.x), fy = axisOf(focal && focal.y);
    return {x: round((s.w / 2 - (s.w - 1) * fx) * 100, 2), y: round((s.h / 2 - (s.h - 1) * fy) * 100, 2),
      w: round(s.w * 100, 2), h: round(s.h * 100, 2), scale: 1, rot: 0};
  }

  /** 拖动：`dx`、`dy` 是从起手到现在指针移了画面宽、高的多少（往右、往下为正，画面跟着手走），从起手那份取景算。
      夹在原片范围里；`hit` 为 'edge' 时说明这一下顶到了原片边上，再拖就会露出背景。 */
  function pan(start, dx, dy, srcRatio, outRatio) {
    const s = sizeOf(start, srcRatio, outRatio);
    const axis = (f, d, over) => {
      if (!(over > EPS)) return {v: f, over: Math.abs(d)};
      const want = f - d / over, v = clamp01(want);
      return {v, over: Math.abs(want - v) * over};
    };
    const ax = axis(axisOf(start && start.x), dx || 0, s.w - 1);
    const ay = axis(axisOf(start && start.y), dy || 0, s.h - 1);
    return {focal: {x: round(ax.v, 4), y: round(ay.v, 4), zoom: zoomOf(start)},
      hit: ax.over > SLACK || ay.over > SLACK ? 'edge' : null};
  }

  /** 缩放：放大倍数改成 `zoom`，画面正中对着的那一点原片不动；夹在 [1, MAX_ZOOM]。
      想缩到比铺满还小时 `hit` 为 'min'，超过上限时为 'max'。 */
  function zoomTo(start, zoom, srcRatio, outRatio) {
    const want = Number.isFinite(zoom) ? zoom : 1;
    const z = Math.max(1, Math.min(MAX_ZOOM, want));
    const c = coverSize(srcRatio, outRatio), s0 = sizeOf(start, srcRatio, outRatio);
    const axis = (f, n0, n1) => {
      const p = (0.5 + (n0 - 1) * f) / n0;          // 原片上对着画面正中的那一点
      return n1 - 1 > EPS ? clamp01((p * n1 - 0.5) / (n1 - 1)) : f;
    };
    const fx = axisOf(start && start.x), fy = axisOf(start && start.y);
    return {focal: {x: round(axis(fx, s0.w, c.w * z), 4), y: round(axis(fy, s0.h, c.h * z), 4), zoom: round(z, 3)},
      hit: want < 1 - SLACK ? 'min' : want > MAX_ZOOM + SLACK ? 'max' : null};
  }

  const sameFocal = (a, b) => !!a && !!b && axisOf(a.x) === axisOf(b.x) && axisOf(a.y) === axisOf(b.y)
    && zoomOf(a) === zoomOf(b);

  const COPY = {
    mode: '按原片取景',
    whyTip: '为什么只能拖动和放大',
    whyTitle: '为什么只能拖动和放大',
    why: '这一段记的是对准原片的哪里、放大多少，不是画面上的一个框。换画幅时，它会按新画幅重新对准，画面始终铺满，不露背景。',
    limits: '所以这里只能在原片范围里拖动和放大，不能缩到比画面小，也不能拉伸或旋转。',
    freeHint: '想像其它素材一样随意摆放，可以改成自由摆放。之后换画幅时，这一段不再自动对准。',
    free: '改成自由摆放',
    freed: '已改成自由摆放 · 换画幅时这一段不再自动对准',
    cornerTip: '拖动放大或缩小 · 最小铺满画面',
    filled: '已填满画布 · 放大回 100%',
    fitBlocked: '按原片取景时画面始终铺满，不能留边 · 要留边先改成自由摆放',
    hit: {
      edge: '到原片边上了 · 再拖就会露出背景',
      min: '已经铺满画面 · 再缩小就会露出背景',
      max: `最多放大到 ${MAX_ZOOM} 倍`,
    },
  };

  const api = {MAX_ZOOM, SLACK, coverSize, sizeOf, poseFor, pan, zoomTo, sameFocal, COPY};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof window !== 'undefined') window.BC_FRAMING = api;
})();
