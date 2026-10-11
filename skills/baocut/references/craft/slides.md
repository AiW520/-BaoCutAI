<!-- 由 tools/sync-agent-skill.ts 从 skills/baocut/built-in-skills/slides/ 生成，不要手改：改源文件后运行 npm run build:agent-skill -->

# 幻灯片

> 用户要做幻灯片、演示文稿、讲稿或汇报用的页面时用：在工作目录里写一份 deck（deck.json 加每页一个 HTML 文件），校验通过后线程里出现幻灯片卡片，用户在功能区预览、编辑与标注。也用于按用户的意见或标注改已有的幻灯片。视频画面里的字卡、下横栏与动效不用它（用动效图形）。

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

  `order` 决定页的先后；`sections` 是提纲，每节一句话、从哪一页开始；`faces` 登记页面里用到的网络字体（规则见 附录「幻灯片的格式」 的「字体」）。已有的 `deck.json` 只改你要改的键，其余原样保留；`lists` 只在新建时写。

## 2. 新做一份

1. **定内容**。弄清楚给谁看、在什么场合讲、大约几页、用什么语言。语言按顺序取第一个有的：用户指定的；用户这次消息的语言；界面语言；材料的语言。材料只用用户给的文件、会话里能读到的内容（例如视频的文稿）与用户说的话。用户没给的数字、日期、人名、引语不要编：写成 `[待补：去年同期营收]` 这样的占位，交付时列出来。brief 太单薄、又有人可以问时，先问一两个最关键的问题（受众与用途），其余按合理的默认做，并在交付时说明你的假设。
2. **定提纲**。每节一句话写下它要讲的结论，再分到页：一页一个意思。封面、议程（页数多时）、正文、收尾（结论或下一步）。
3. **定外观**。一次定下整份的字体（1–3 种）、配色（一深一浅、一到两个强调色，都写成十六进制）、字号阶梯与几种重复用的版式。读本页的附录「幻灯片的设计」，按那里的规则定；版面的高度要按那里的估算方法算过，不能放不下。
4. **准备图片**。用户给的、工作目录里的图片，终端里没有把图片导入 deck 的命令：页面先不放图片，交付时说明哪几页该配什么图。
5. **写文件**。先写 `deck.json`（完整的 `order`），再按顺序写每一页。页面怎么写见第 4 节，完整的标签与样式表读本页的附录「幻灯片的格式」。
6. **校验**。终端里没有校验命令：按 附录「幻灯片的格式」 逐页自查标签、样式与图片地址，按 附录「幻灯片的设计」 的估算确认放得下，再核对 `deck.json` 的 `order`、`sections`、`cover` 都指向存在的页，`slides/` 里没有 `order` 之外的文件。
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

要点（细则在 附录「幻灯片的格式」）：

- `<section>` 上总要写 `background`、正文的 `font-family` 与 `color`、版式（`display:flex; flex-direction:column` 或 `display:grid`）与 `padding`（四周留白，通常 128px）。
- 子元素按阅读顺序写，在版式里自动排；要钉在固定位置的加 `position:absolute` 与 `left`/`top`/`right`/`bottom`/`width`/`height`，后写的盖在先写的上面，所以整页的背景图写在最前面。
- 文字用 `<h1>`–`<h3>`、`<p>`、`<ul>`/`<ol>`/`<li>`，行内用 `<b>`、`<i>`、`<u>`、`<a href>`、`<span style>`；每个文字元素自己写 `font-size`，正文不小于 24px。容器用 `<div>`。另有图片 `<img>`、表格、内联 `<svg>`、形状 `<x-shape>`、图标 `<x-icon>` 等。
- 长度只用 px，颜色用十六进制或 `rgb()`；不用 `class`、`margin`、`em`、`var()`。
- 讲稿写在最后一个子元素 `<aside>` 里，纯文字。
- 换页效果用 `<section>` 的 `data-transition`，元素逐个出现用钉住的元素上的 `data-build-in`。

## 5. 验收

- 校验的问题为 0；在会话里，线程中出现了这份幻灯片的卡片。
- 每页只讲一件事；标题连起来读就是整份的提纲；按 附录「幻灯片的设计」 的估算，没有一页的内容超出版心。
- 数字、引语、人名都有出处；没有出处的写成了占位，并在交付时列出。
- 修改时只动了用户点名的地方，用户在编辑器里改过的内容还在。

## 附录：幻灯片的设计

这一页讲怎么让一份幻灯片好讲、好看、放得下。格式本身（哪些标签与样式能用）在 附录「幻灯片的格式」。

### 1. 先定方向

动笔前一次定下，整份不变：

- **场合与受众**。内部周会、对外路演、课堂、发布会，信息密度与语气都不同：讲给熟人听的可以密一点，讲给陌生人听的一页只放一个结论。
- **讲的人与读的人**。有人在台上讲，页面是提示与佐证，字少、图大；没人讲、发出去自己读，页面要能自己说清楚，句子可以完整一些，但仍然一页一件事。
- **视觉方向**。从内容里找一个方向：财报偏克制（浅底、一种强调色、数字大），产品发布偏醒目（深底、大图、强对比），教学偏清楚（浅底、图解多、层级明显）。方向决定版式、字体与配色，不按心情每页换。

### 2. 配色

- 一深一浅两个底色，加一到两个强调色，全部写成十六进制。整份只用这几个颜色与它们的少量深浅变化。
- 不用纯白 `#ffffff` 与纯黑 `#000000` 做大面积底色，略带色调的白与黑（如 `#f7f5f0`、`#1c1d21`）更耐看；卡片可以比底色亮一档。
- 正文与背景的对比度至少 4.5:1，44px 以上的大字至少 3:1。浅底上的灰字最容易不够，宁可深一点。
- 要区分的颜色（图表里的两条线、两种状态）同时拉开明暗，不只靠色相；避免只用红与绿区分，蓝与橙更稳。
- 每页都写 `background`。整份用两种底色交替出节奏，偶尔用强调色整页铺底做一页「金句」或章节页。
- 用户给了品牌色或明确的配色要求时照用，上面的比例让位于用户的要求。

### 3. 字体与字号

- 一到三种字体：标题一种、正文一种，最多再加一种等宽或装饰用。中日韩文字的页面，`font-family` 里要有能显示这些字的字体（网络字体或系统字体），并以通用族收尾。
- 每个用到的网络字体都要在 `deck.json` 的 `faces` 里登记（写法见 附录「幻灯片的格式」「字体」）；字体栈里同时写一个常见的系统字体（Arial、Georgia、Courier New 这类），导出到别的软件时有退路。
- 一套四到五级的字号阶梯，整份照用，例如：标题 72、小标题 44、正文 32、注释 24，大数字另给 120–200。强调用粗细、斜体或颜色，不另造一个字号。
- 正文不小于 24px；投影在会议室里，28px 以上更稳。注释、来源这类小字也不小于 24px。
- 行高：标题 1.1 左右，正文 1.3–1.5。

### 4. 每页一件事

- 一页只讲一个结论。标题直接写结论（「新用户翻了一倍」），不写话题（「用户增长情况」）；全部标题用同一种句式，连起来读就是整份的提纲。
- 能不用要点列表就不用：并列的几项改成卡片一排、表格或几个大数字；一句话说得清的就只放一句话，配一张图。
- 一定要列要点时不超过 5 条，每条一行，句式一致。
- 数字要有出处：在页脚写来源，或在讲稿里写清楚。没有出处的数字写成 `[待补：…]`。
- 不写「不是 A，而是 B」这类故作反转的句子，也不堆形容词。

### 5. 版面与留白

- 版心：四周留 128px，内容区是 1664×824。页脚（页码、来源、标志）只放一行 24px 的字，钉在 `bottom:64px`，这一页的底部留白改成 160px（`padding:128px 128px 160px`），其余内容不要越过 y=920。
- 同一类页面用同一套结构：标题永远在左上的同一个位置，不跟内容一起居中，翻页时不跳。
- 内容大约占满版心的七成。内容少时用 `justify-content:space-between` 把标题与结论撑开，或放一个 `flex:1` 的空 `<div>` 当弹簧；不要把小块内容孤零零地放在中间。
- 相邻的方框要么共用一条边（后面的去掉 `border-top`），要么留出间距，不要两条线叠在一起。
- 对齐：同一页的元素左边缘对齐到同一条线；卡片一排时等宽等高。

#### 估算高度，确认放得下

放不下时，编辑器会把框里的字自动缩小（最多缩到六成，再放不下就溢出），缩出来的字号不在阶梯上，各页大小不一。写之前按下面估一遍，超了就删字或拆成两页，不要靠缩字号；校验给出的「排版」提示也会指出哪些框放不下：

- 一行字的高度 ≈ 字号 × 行高。标题 72px、行高 1.1、两行 ≈ 160px。
- 每行能放的字：中日韩文字 ≈ 宽度 ÷ 字号；拉丁字母 ≈ 宽度 ÷ (0.55 × 字号)。版心 1664px、正文 32px：一行约 52 个汉字或 95 个字母。
- 卡片高度 = 行数 × 字号 × 行高 + 上下内边距；不要给卡片写死一个比这更小的 `height`，不写高度让它随内容。
- 表格一行 ≈ 2.1 × 字号 × 文字行数。
- 拉丁文字只在空格处换行：一个长单词比框还宽时会被截断，框的宽度至少要放下最长的那个词。
- 把各块高度与它们之间的 `gap` 加起来，与 824px（有页脚时是 792px）比。

### 6. 图片与图表

- 只用用户给的图片与工作目录里的图片（先导入 deck，见「新做一份」第 4 步），不用来路不明的网图。
- 照片用 `object-fit:cover` 铺满给定的框；截图、示意图用 `object-fit:contain`，放在与它反差明显的底色上。
- 整页铺底的照片写在 `<section>` 的第一个子元素，钉满全页（`position:absolute;left:0;top:0;width:1920px;height:1080px`），后面的文字压在上面；文字下面加一层半透明的色块保证对比度。
- 简单的数据图（几根柱子、一条趋势）可以用 `<div>` 画柱、用内联 `<svg>` 画线；数据点多、要精确时用表格，不要手画近似的图。图上标出单位与来源。
- 流程与关系用 `<x-shape>` 与 `<x-connector>` 画，节点不超过七八个；更复杂的拆成几页逐步展开。

### 7. 节奏与动效

- 封面、章节页、金句页用深底或强调色，内容页用浅底，翻页时有起伏。
- 换页效果整份用同一种（`fade` 最稳），章节页可以换一种。
- 元素逐个出现（`data-build-in`）只用在讲的时候要一步步揭开的地方，一页不超过三四步；发出去自己读的幻灯片不用。
- 讲稿（`<aside>`）写讲的人要说而页面上没写的话：过渡句、数字背后的原因、要强调的一点。

## 附录：幻灯片的格式

这一页是页面文件的完整写法：哪些标签、属性与样式能用，各有什么上限。不在这里的写法，编辑器读入时会丢掉或报错，校验会逐条列出；报错的那一页在编辑器里只能看、不能改。

### 1. 页面文件

- `slides/<id>.html` 里恰好一个 `<section>`，前后没有别的内容：不写 `<!doctype>`、`<html>`、`<head>`、`<body>`，也不写 `<title>`、`<link>`、`<style>`、`<meta>`、`<script>`。
- 画布固定 1920×1080 像素，坐标与尺寸都按它算。
- `<section>` 上能写的属性：
  - `id`：与文件名相同（字母、数字、`-`、`_`，最长 64 个字符）。
  - `style`：只管四类——背景（`background`，纯色或 `linear-gradient(…)`）；全页文字的默认值（`font-family`、`font-size`、`font-weight`、`font-style`、`line-height`、`letter-spacing`、`text-align`、`text-transform`、`white-space`、`color`）；版式（`display:flex` 或 `display:grid`，以及 `flex-direction`、`gap`、`align-items`、`justify-content`、`grid-template-columns`）；`padding`。边框、圆角、阴影、透明度、变形、宽高与定位都不能写在 `<section>` 上。
  - `data-transition`：进入这一页时的换页效果，`fade`、`push` 或 `magic`。
  - `hidden`：放映时跳过这一页。
- 其余属性会被丢掉。分节写在 `deck.json` 的 `sections` 里，不写在页面上。

### 2. 流式与钉住

- 没写 `position:absolute` 的子元素是**流式**的：按 `<section>` 的版式与留白依次排开，自己不用算坐标。
- 写了 `position:absolute` 的是**钉住**的：用 `left`、`top`、`right`、`bottom`、`width`、`height` 按画布坐标摆放。坐标不能是负数；同一方向写了两条边（如 `left` 与 `right`）就不要再写这个方向的尺寸。
- 叠放次序就是源码顺序，后写的盖住先写的，没有 `z-index`。整页的背景图写成第一个子元素。
- `position:relative` 的 `<div>` 里，钉住的子元素按这个 `<div>` 定位。
- `id`、`data-build-in`、`data-build-out` 只对直接钉在 `<section>` 下的元素有效，写在流式元素上会被丢掉。

```html
<section id="quote" data-transition="fade" style="background:#1c1d21;color:#f4f1ea;font-family:'Source Sans 3', Arial, sans-serif;padding:128px;display:flex;flex-direction:column;justify-content:center">
  <p style="font-size:64px;font-weight:600;line-height:1.2">剪辑的一半时间花在找素材上。</p>
  <p id="source" data-build-in="fade 1" style="position:absolute;left:128px;bottom:96px;width:900px;font-size:28px;color:#a8a39a">— 来自 30 位剪辑师的访谈</p>
</section>
```

### 3. 标签

| 标签 | 用途与规则 |
| --- | --- |
| `<h1>` `<h2>` `<h3>` | 标题。没有 `<h4>`–`<h6>`，更小的标题用加粗的 `<p>`。 |
| `<p>` | 段落。 |
| `<ul>` `<ol>` `<li>` | 列表，只有一层（嵌套的会被摊平）。`<li>` 里只放文字与行内标签；样式写在 `<ul>`、`<ol>` 上，`<li>` 上的 `style` 会被丢掉；项目符号的缩进用 `padding-left`。 |
| `<b>` `<i>` `<u>` `<a href>` `<span style>` `<br>` | 行内：加粗、斜体、下划线、链接、局部样式、换行。 |
| `<div>` | 容器，用 flex 或 grid 排子元素，最多嵌套 15 层。没有内容、没有底色的空 `<div>` 会被去掉；要当弹簧就写 `flex:1`。 |
| `<img>` | 图片，见第 5 节。 |
| `<svg>` | 内联矢量图，见第 5 节。 |
| `<table>` `<tr>` `<th>` `<td>` | 表格，见第 6 节。 |
| `<hr>` | 一条线：`border-top:2px solid #…`，或用 `background` 加 `height`（1–32px）当线宽；不支持虚线。 |
| `<x-shape kind="…">` | 形状，见第 7 节。 |
| `<x-icon name="…">` | 内置图标，见第 7 节。 |
| `<x-connector>` | 连线与箭头，见第 7 节。 |
| `<aside>` | 讲稿：`<section>` 的直接子元素，纯文字（上面的 `style` 无效），最多 4000 字，习惯写在最后。 |

- 其余标签（`<h4>`–`<h6>`、`<blockquote>`、`<figure>`、`<pre>`、`<header>`、`<footer>`、`<nav>`、`<main>`、`<article>` 等）都是错误。格式里另有 `<video>` 与 `<x-embed>`，在 BaoCut 里不用。
- 元素上的 `class`、`title`、`role`、`aria-*`、`lang` 以及上面没提到的 `data-*` 都会被丢掉。

### 4. 样式

- 只写在 `style` 属性里，每个文字元素自己写 `font-size`（8–400px）。
- 长度用 px。`%` 只在钉住的元素、单元格宽度与 flex 方向上的份额里有意义；不用 `em`、`rem`、`vw`、`calc()`、`var()`。
- 颜色写十六进制、`rgb()`、`rgba()`、`hsl()` 或颜色名都行；整份统一写十六进制最好管理。
- 间距用父元素的 `gap` 与 `padding`，不用 `margin`（`margin:0` 除外）；要把一块推到底部，用 `justify-content` 或一个 `flex:1` 的空 `<div>`。
- 可用的装饰：`border`（包括单边，如 `border-left`）、`border-radius`、`box-shadow`、`opacity`、`text-shadow`、`linear-gradient(…)` 底色、钉住元素的 `transform:rotate(…)`。
- 文字：`font-family`、`font-size`、`font-weight`、`font-style`、`line-height`（倍数或 px）、`letter-spacing`、`text-align`、`text-transform`、`text-decoration`、`white-space`、`color`。
- 不支持：`float`、`z-index`、`object-position`、`background-image:url(…)`（背景图用钉满全页的 `<img>`）、`border-collapse`。
- `<h1>`–`<h3>`、`<p>`、`<ul>`、`<ol>`、`<table>` 上可以写 `data-fit`：不写就是 `shrink`，放不下时把字缩小，最多缩到六成；`none` 是不缩，放不下就溢出。

### 5. 图片与矢量图

- `<img src>` 只认两种地址：导入 deck 后得到的 `/_blob/<id>`；或 70 KB 以内的 png、jpeg、gif、webp、avif、svg `data:` 地址（只适合很小的标志，SVG 里的 `#` 写成 `%23`）。网上的地址、相对路径、绝对路径都是错误。
- 写 `alt`（最多 500 字），宽高用 px。
- `object-fit:cover`（默认，裁掉多出的部分铺满框）或 `contain`（完整显示）。cover 的图可以用 `data-crop="倍数 X% Y%"` 放大并选焦点，倍数 1–50，例如 `data-crop="1.5 50% 30%"`。
- `<svg>` 直接写在页面里：恰好一个 `<svg>` 根元素，源码不超过约 70 KB；写 `width` 与 `height`（只写 `viewBox` 时按 400px 宽算）；不能有 `<script>`、`<foreignObject>`、`onclick` 这类事件属性、指向外部的 `href` 或 `url(…)`。`aria-label` 当替代文字。SVG 整体当作一张图，里面的 `<text>` 在编辑器里改不了字，要让用户改的文字放在 SVG 外面。

```html
<img src="/_blob/0f3a…" alt="新版时间线截图" style="position:absolute;left:0;top:0;width:1920px;height:1080px;object-fit:cover" data-crop="1.2 50% 40%">
```

### 6. 表格

- `<table>` 里直接写 `<tr>`（套 `<thead>`、`<tbody>` 也可以），每行的单元格一样多；不支持 `colspan`、`rowspan`，要合并就拆表或重复文字。
- 单元格里只放文字与行内标签，不放图片（会被删掉）。
- 字号、颜色、宽度写在 `<table>` 上；`<th>`、`<td>` 上只认 `text-align`、`width`、`color`、`padding`，`<th>` 另可写 `font-weight`。单元格不能有底色和边框，表格自己画细线；要强调一格就换颜色或加粗。
- 一页最多 4000 个单元格，整份 40000 个；数据多时拆页，或只留结论。

```html
<table style="font-size:28px;color:#22252b;width:1200px">
  <tr><th style="text-align:left">渠道</th><th style="text-align:right">新用户</th><th style="text-align:right">环比</th></tr>
  <tr><td>搜索</td><td style="text-align:right">12,400</td><td style="text-align:right;color:#15803d">+38%</td></tr>
  <tr><td>社交</td><td style="text-align:right">8,900</td><td style="text-align:right;color:#b91c1c">−6%</td></tr>
</table>
```

### 7. 形状、图标与连线

- `<x-shape kind="…">`：`rect`、`rounded`（圆角矩形）、`ellipse`、`diamond`、`arrow-right`、`arrow-left`、`arrow-up`、`arrow-down`、`line`。里面不放内容；`background` 是填充（只能纯色），`border` 是描边；钉住时写全 `width` 与 `height`；`transform` 只认 `rotate(…)`。要在形状上写字，另放一个钉在同一位置的 `<p>`。
- `<x-icon name="…">`：内置图标，名字不分大小写——Activity、Book、Chart、Chat、Check、CheckCircle、Clock、Cloud、Code、Database、Globe、GraduationCap、Home、Key、Lightbulb、Lightning、Link、Lock、PaperPlane、Play、Search、Settings、Star、ThumbsUp、Tool、Trust、Users、Verified、Warning、Wrench。`width`、`height` 用 px（只写一个就是正方形），`color` 上色。名字不在表里的会显示成一段文字。
- `<x-connector>`：直线、折线与箭头。钉在画布上时写全 `x1`、`y1`、`x2`、`y2`（px 数字；在 `position:relative` 的 `<div>` 里也可以写百分比）。
  - `head`：`end`（终点有箭头，默认）、`both`、`none`；也可以分别写 `head-start`、`head-end`：`none`、`open`、`filled`。
  - `route`：`straight`、`elbow`、`hv`（先横后竖）、`vh`（先竖后横）。
  - 线的粗细、虚实与颜色用 `border`（`solid`、`dashed`、`dotted`）。

```html
<x-shape kind="rounded" style="position:absolute;left:160px;top:420px;width:360px;height:160px;background:#ffffff;border:2px solid #22252b"></x-shape>
<p style="position:absolute;left:160px;top:470px;width:360px;font-size:32px;text-align:center">导入素材</p>
<x-connector x1="540" y1="500" x2="760" y2="500" head="end" style="border:3px solid #c2410c"></x-connector>
<x-icon name="lightbulb" style="position:absolute;left:800px;top:452px;width:96px;color:#c2410c"></x-icon>
```

### 8. 动效

- 换页：`<section data-transition="fade">`，见第 1 节。
- 元素逐个出现：钉住的元素上写 `data-build-in="效果 次序"`，离开用 `data-build-out`。效果有 `fade`、`rise`、`drop`、`left`、`right`、`scale`、`pop`；次序是 1–50 的整数，不写就按源码顺序；末尾加 `auto` 的一步不等点击，紧接着上一步出现。

### 9. 字体

- 页面里用到的网络字体，都要在 `deck.json` 的 `faces` 里登记：键是自己起的短名，值是 `{ "family": "…", "href": "…" }`。
- `family` 以英文字母开头，只含字母、数字、空格、`-`、`_`，最长 40 个字符，与 `font-family` 里写的完全一致。
- `href` 只能是 Google Fonts 的 css2 地址（`https://fonts.googleapis.com/css2?family=…`），最长 1024 个字符，用到的字重都写进去。
- 一份最多登记 4 个网络字体。系统字体（Arial、Georgia、Courier New、PingFang SC、Microsoft YaHei 这类）不用登记，写在字体栈后面当退路，最后以 `sans-serif` 或 `serif` 收尾。
- 中文可以用 `Noto Sans SC`、`Noto Serif SC`；日文、韩文各有对应的 Noto 字体。

### 10. 上限

- 一页最多 200 个元素（每个标签都算），超出的部分会被丢掉。
- 一个文字元素最多 20000 字、100 处行内样式。
- 整份最多 500 页。
