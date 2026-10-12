/* 按原片取景的纯模型（product-design §5.10「画面怎么取景」）：取景点 + 放大倍数 → 画面上的盒，缩放的换算和夹取，
   以及画布上说明它的文案。不碰 DOM、不依赖 React；node --test 直接 require。

   视频在画布上有两种摆法（2026-10-12 定）：
   - 带取景点（元素文档的 `focal: {x, y, zoom}`）的视频按原片取景。剪成短视频时每一段原片都这样摆：`x`、`y` 是剪的时候
     按画面里的人找到的位置（同 CSS object-position 的百分比：0 贴左 / 上，1 贴右 / 下；原片上 `x` 那一点永远落在画面的
     `x` 处），按镜头分段时每段各有一份，用户不改；`zoom`（≥ 1）是在「刚好铺满」之上再放大多少，是用户唯一能调的。
     它不是画面上的一个框：换画幅时按新画幅重算盒，永远铺满、不露背景。所以画布上只能以取景点为中心放大、缩小，
     不能拖动、缩到比画面小、拉伸或旋转。实现里对应视频格式的 `focalPoint` 与它的 `zoom`（相对铺满，video-format-spec §3.5）。
   - 没有取景点的视频像其它素材一样自由摆放：`pose` 按画面的百分比记，可以拖出画面、缩到比画面小露出背景；换画幅时按百分比重排。
   带取景点的视频只能用「改成自由摆放」明确地换成自由摆放。 */
(function () {
  const MAX_ZOOM = 4;
  /* 缩过头、放过头多少倍才弹提示：手上的抖动不该一直弹。 */
  const SLACK = 0.03;

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

  /** 取景点落在画面上的哪一点（画面宽、高的比例）：缩放就以它为中心，画布上画的那个准星也在这里。 */
  function anchorOf(focal) {
    return {x: axisOf(focal && focal.x), y: axisOf(focal && focal.y)};
  }

  /** 缩放：只改放大倍数，取景点不动（于是它在画面上的位置也不动，原片围着它放大）；夹在 [1, MAX_ZOOM]。
      想缩到比铺满还小时 `hit` 为 'min'，超过上限时为 'max'。 */
  function zoomTo(start, zoom) {
    const want = Number.isFinite(zoom) ? zoom : 1;
    const z = Math.max(1, Math.min(MAX_ZOOM, want));
    return {focal: {x: axisOf(start && start.x), y: axisOf(start && start.y), zoom: round(z, 3)},
      hit: want < 1 - SLACK ? 'min' : want > MAX_ZOOM + SLACK ? 'max' : null};
  }

  const sameFocal = (a, b) => !!a && !!b && axisOf(a.x) === axisOf(b.x) && axisOf(a.y) === axisOf(b.y)
    && zoomOf(a) === zoomOf(b);

  const COPY = {
    mode: '按原片取景',
    whyTip: '为什么只能放大',
    whyTitle: '为什么只能放大',
    why: '这一段的位置是剪成短视频时按画面里的人对准的：按镜头分段时每段各对准各的人，换画幅时也会按新画幅重新对准，画面始终铺满。',
    limits: '所以这里只能以取景点为中心放大或缩小，最小刚好铺满；不能拖动，也不能拉伸或旋转。',
    freeHint: '想自己挪位置、缩到比画面小或留边，可以改成自由摆放。之后换画幅时，这一段不再自动对准。',
    free: '改成自由摆放',
    freed: '已改成自由摆放 · 换画幅时这一段不再自动对准',
    cornerTip: '拖角放大或缩小 · 以取景点为中心',
    filled: '已填满画布 · 放大回 100%',
    fitBlocked: '按原片取景最小是铺满，不能留边 · 要留边先改成自由摆放',
    applyAllTip: '把这一段的放大倍数用到这支视频的每一段 · 各段仍对准各自的人',
    appliedAll: (n) => `已把这一段的放大倍数用到全部 ${n} 段`,
    hit: {
      locked: '位置跟着取景点 · 不能拖动，只能放大',
      min: '按原片取景最小是铺满 · 要留边先改成自由摆放',
      max: `最多放大到 ${MAX_ZOOM} 倍`,
    },
  };

  const api = {MAX_ZOOM, SLACK, coverSize, sizeOf, poseFor, anchorOf, zoomTo, sameFocal, COPY};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof window !== 'undefined') window.BC_FRAMING = api;
})();
