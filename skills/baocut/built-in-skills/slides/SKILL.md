---
name: slides
description: 用户要做幻灯片、演示文稿、讲稿或汇报用的页面时用：在工作目录里写一份 deck（deck.json 加每页一个 HTML 文件），校验通过后线程里出现幻灯片卡片，用户在功能区预览、编辑与标注。也用于按用户的意见或标注改已有的幻灯片。视频画面里的字卡、下横栏与动效不用它（用动效图形）。
version: 1.0.0
---

# 幻灯片

一份幻灯片是工作目录里的一个目录：一个索引文件 `deck.json`，加上每页一个 HTML 文件。你用自己的文件工具直接写这些文件，BaoCut 的幻灯片编辑器读的就是它们。在 BaoCut 的会话里，校验通过后线程里出现幻灯片卡片；用户点「打开」，在功能区预览、改字、拖动元素，也可以圈出某处写下意见发回给你。

你的一轮工作是：**定内容与外观 → 写文件 → 校验到没有问题 → 告诉用户**。

## 1. 目录里有什么

```text
<deck 目录>/
  deck.json          索引：标题、页的顺序、分节、封面、字体
  slides/<id>.html   每页一个文件
  assets/            导入的图片（不要手写）
```

- deck 目录放在工作目录里，按标题起一个简短的名字（例如 `q3-review/`），不以点开头。一个会话里做第二份就另起一个目录，不覆盖已有的。
- 页的 `id` 只用字母、数字、`-` 与 `_`，最长 64 个字符；文件名就是 `<id>.html`，文件里那个 `<section>` 的 `id` 与它相同。按内容起 id（`cover`、`agenda`、`pricing`），不用 `1`、`2` 这种会随插页变乱的编号。
- 新建的 `deck.json`：

```json
{
  "v": 4,
  "lists": "css",
  "title": "第三季度回顾",
  "order": ["cover", "agenda", "growth", "next"],
  "cover": "cover",
  "sections": {
    "intro": { "description": "这一季做成了什么", "start": "cover" },
    "plan": { "description": "下一季的三件事", "start": "next" }
  },
  "faces": {
    "source-sans-3": {
      "family": "Source Sans 3",
      "href": "https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&display=swap"
    }
  },
  "designSystems": []
}
```

  `order` 决定页的先后；`sections` 是提纲，每节一句话、从哪一页开始；`faces` 登记页面里用到的网络字体（规则见 `references/format.md` 的「字体」）。已有的 `deck.json` 只改你要改的键，其余原样保留；`lists` 只在新建时写。

## 2. 新做一份

1. **定内容**。弄清楚给谁看、在什么场合讲、大约几页、用什么语言。语言按顺序取第一个有的：用户指定的；用户这次消息的语言；界面语言；材料的语言。材料只用用户给的文件、会话里能读到的内容（例如视频的文稿）与用户说的话。用户没给的数字、日期、人名、引语不要编：写成 `[待补：去年同期营收]` 这样的占位，交付时列出来。brief 太单薄、又有人可以问时，先问一两个最关键的问题（受众与用途），其余按合理的默认做，并在交付时说明你的假设。
2. **定提纲**。每节一句话写下它要讲的结论，再分到页：一页一个意思。封面、议程（页数多时）、正文、收尾（结论或下一步）。
3. **定外观**。一次定下整份的字体（1–3 种）、配色（一深一浅、一到两个强调色，都写成十六进制）、字号阶梯与几种重复用的版式。用 `skills_read` 读本 skill 的 `references/design.md`，按那里的规则定；版面的高度要按那里的估算方法算过，不能放不下。
4. **准备图片**。用户给的、工作目录里的图片，逐张调用 `slides_import_asset` 放进 deck（参数 `deck` 是 deck 目录，`path` 是图片），把返回的 `src`（`/_blob/<id>`）原样写进 `<img src>`；网上的图片地址、相对路径都不能用。没有合适的图片就不放，不要为了好看去找不相干的图。
5. **写文件**。先写 `deck.json`（完整的 `order`），再按顺序写每一页。页面怎么写见第 4 节，完整的标签与样式表用 `skills_read` 读本 skill 的 `references/format.md`。
6. **校验**。调用 `slides_check` 校验整份 deck（参数 `path` 是 deck 目录），逐条改掉它列出的问题（某页的标签或样式不在格式里、图片找不到、`order` 指向不存在的页等）再校验，直到问题为 0；以「排版」开头的提示说明版面可能放不下或互相压住，也尽量改掉；`orphans` 是 `slides/` 里有、`order` 里没有的文件，要么加进 `order`，要么删掉。问题为 0 时线程里出现这份幻灯片的卡片，用户在卡片上点「打开」就能预览与编辑。
7. **交付**。一两句话说清标题、页数、目录在哪里、怎么打开，列出所有 `[待补：…]` 的占位与你做的假设。不要在回复里贴页面的 HTML。

## 3. 修改已有的幻灯片

- 用户可能在编辑器里亲手改过页面。动手前重新读你要改的文件，在它现在的内容上改；不要凭记忆整页重写，以免冲掉用户的修改。
- 只改用户点名的页与地方；其余页面、页的 `id` 都不动。同一处小改动在很多页重复（例如统一换一个颜色），逐页做同样的替换，不要顺手改别的。
- 加一页：写新文件，把 `id` 插进 `order` 的对应位置。删一页：删掉文件，从 `order` 去掉它；`cover` 或某节的 `start` 指着它时改成下一页。改顺序、改标题、改分节或字体时改 `deck.json`，改之前先重读它。
- 编辑器开着时，你写回的文件会自动载入，不用请用户刷新。
- 改完照样校验到问题为 0，再告诉用户改了哪几页、改了什么。

### 按幻灯片标注修改

用户在编辑器里点一个元素或框一块区域写下的意见，会附在消息最后，每份幻灯片一段：

```text
<baocut-slide-annotations deck="q3-review/">
1. Slide 3 › Heading 2 "新用户比上一季多了一倍"
   定位：Slide 3 #growth: … text "新用户比上一季多了一倍"
   批注：改成一句结论，别再放数字
</baocut-slide-annotations>
```

- `deck` 是 deck 目录，相对工作目录（在工作目录外时是绝对路径）。一条消息可能有好几段，对应好几份幻灯片。
- 编号是这一条消息里所有标注的序号，跨段连续；交付时按这个编号逐条说你改了什么。
- 第一行是给人看的位置：第几页、元素的种类和它原来的文字。框选的区域会写明是哪一页、框住了哪些元素，「定位」以 `Area on slide 5 #…` 开头。「定位」由 BaoCut 生成：`#` 后面是页的 `id`，对应 `slides/<id>.html`。没有「定位」时按第几页在 `order` 里找。
- 先重读那一页的文件，按原来的文字或元素的种类找到它；用户可能在发出标注之后又改过页面，找不到原文时按最接近的元素理解，交付时说明。
- 批注只针对它标的那处；它要求的改动牵连到别处（例如改了标题就要改议程页），一并改，并在交付时说清。没说清楚要怎么改的，按最合理的理解改，交付时说明。
- 改完照样校验到问题为 0。

## 4. 一页怎么写

画布固定是 1920×1080 像素。一页是**恰好一个** `<section>`，所有样式都写在 `style` 属性里，前后不要别的东西（没有 `<html>`、`<head>`、`<style>`、`<link>`、`<script>`）。只认一个封闭的标签与样式子集：格式之外的写法在编辑器读入时被丢掉，或让这一页无法编辑，校验时会逐条列出。

```html
<section id="growth" data-transition="fade" style="background:#f7f5f0;color:#22252b;font-family:'Source Sans 3', Arial, sans-serif;padding:128px 128px 160px;display:flex;flex-direction:column;gap:48px">
  <h2 style="font-size:72px;font-weight:600;line-height:1.1">新用户比上一季多了一倍</h2>
  <div style="display:flex;gap:40px">
    <div style="flex:1;display:flex;flex-direction:column;gap:16px;background:#ffffff;padding:40px;border-radius:16px">
      <p style="font-size:120px;font-weight:700;line-height:1;color:#c2410c">2.1×</p>
      <p style="font-size:32px;line-height:1.3">新注册用户，环比</p>
    </div>
    <div style="flex:1;display:flex;flex-direction:column;gap:16px;background:#ffffff;padding:40px;border-radius:16px">
      <p style="font-size:120px;font-weight:700;line-height:1;color:#c2410c">[待补]</p>
      <p style="font-size:32px;line-height:1.3">付费转化率</p>
    </div>
  </div>
  <p style="position:absolute;left:128px;bottom:64px;font-size:24px;color:#6b6f76">数据来源：[待补]</p>
  <aside>先讲翻倍的原因：渠道换了，再讲转化率还没出来。</aside>
</section>
```

要点（细则在 `references/format.md`）：

- `<section>` 上总要写 `background`、正文的 `font-family` 与 `color`、版式（`display:flex; flex-direction:column` 或 `display:grid`）与 `padding`（四周留白，通常 128px）。
- 子元素按阅读顺序写，在版式里自动排；要钉在固定位置的加 `position:absolute` 与 `left`/`top`/`right`/`bottom`/`width`/`height`，后写的盖在先写的上面，所以整页的背景图写在最前面。
- 文字用 `<h1>`–`<h3>`、`<p>`、`<ul>`/`<ol>`/`<li>`，行内用 `<b>`、`<i>`、`<u>`、`<a href>`、`<span style>`；每个文字元素自己写 `font-size`，正文不小于 24px。容器用 `<div>`。另有图片 `<img>`、表格、内联 `<svg>`、形状 `<x-shape>`、图标 `<x-icon>` 等。
- 长度只用 px，颜色用十六进制或 `rgb()`；不用 `class`、`margin`、`em`、`var()`。
- 讲稿写在最后一个子元素 `<aside>` 里，纯文字。
- 换页效果用 `<section>` 的 `data-transition`，元素逐个出现用钉住的元素上的 `data-build-in`。

## 5. 验收

- 校验的问题为 0；在会话里，线程中出现了这份幻灯片的卡片。
- 每页只讲一件事；标题连起来读就是整份的提纲；按 `references/design.md` 的估算，没有一页的内容超出版心。
- 数字、引语、人名都有出处；没有出处的写成了占位，并在交付时列出。
- 修改时只动了用户点名的地方，用户在编辑器里改过的内容还在。
