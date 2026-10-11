import type { SiteCopy } from './site-copy.ts';

export const zhHans: SiteCopy = {
  lang: 'zh-Hans',
  path: '/zh-hans/',
  languageName: '简体中文',
  dateLocale: 'zh-CN',
  meta: {
    title: 'BaoCut — 以可编辑视频为中心的 AI 视频智能体',
    description:
      'BaoCut 是以可编辑视频为中心的 AI 视频智能体。告诉它你想做什么，它会转录、制作字幕、翻译、配音、剪辑和制作动画；结果都在时间线里，你可以继续修改。支持 macOS 与 Windows。',
    ogImageAlt: 'BaoCut 编辑器，时间线上是双语字幕',
  },
  nav: {
    skip: '跳到正文',
    features: '功能',
    showcase: '模板',
    howItWorks: '使用方法',
    download: '下载',
    github: 'GitHub',
    menu: '菜单',
    language: '语言',
  },
  hero: {
    badge: '新版本',
    badgeLink: '更新说明',
    title: ['说出你想要的视频，', '结果还能接着改。'],
    lead: 'BaoCut 是以可编辑视频为中心的 AI 视频智能体，交给你的不是一次性的 MP4。它会转录、制作字幕、翻译、配音、剪辑和制作动画，每一步结果都保存在时间线里，你可以继续修改。',
    downloadMac: '下载 macOS 版',
    downloadWindows: '下载 Windows 版',
    downloadOther: '下载 BaoCut',
    github: '在 GitHub 查看',
    platformsLine: 'macOS 14+（Apple Silicon）· Windows x64（CPU、CUDA、Vulkan）',
    promptLabel: '你',
    prompt: '把这个视频翻译成中文，加上双语字幕。',
    receiptLabel: '变更回执',
    receipt: '改了什么、检查了什么，哪些地方还需要你亲耳听一遍。',
    shotAlt: 'BaoCut 视频编辑器：预览画面上有字幕，字幕面板里是原文与译文，下方是时间线',
  },
  agents: {
    label: '使用你自己的智能体引擎',
    note: 'Claude Code 与 Codex CLI 已有端到端验证；支持 Agent Client Protocol 的智能体通过统一驱动接入。',
  },
  principles: {
    kicker: '为什么选择 BaoCut',
    title: '多数 AI 视频工具渲染一次就交给你一个文件。BaoCut 交给你的是视频本身。',
    lead: '译文第二句不准、某个镜头要换、配音语气还要调——这些修改都不该从头再来。BaoCut 把每一次修改保留在同一个可编辑视频里。',
    items: [
      {
        title: '视频是权威的编辑对象',
        body: '文稿、译文、字幕层、章节、配音和动态图形都属于同一个视频。SRT、MP4、音频和文稿文件是它的导出结果。',
      },
      {
        title: '只改你指定的内容',
        body: '改一条字幕、换一个镜头，或重做一句配音，智能体按指定范围编辑，并返回变更回执。',
      },
      {
        title: '你与智能体用同一个编辑器',
        body: '你拖动片段，智能体改写字幕，双方都通过同一套命令、事务与撤销机制提交修改。你随时可以接手。',
      },
      {
        title: '自主执行有明确边界',
        body: '智能体在指定范围、访问模式和预算内工作，破坏性操作先征得同意。下载的网页、转录文稿等外部材料只作为数据处理。',
      },
      {
        title: '如实交付',
        body: '智能体说明测量了什么、实际查看了哪些内容，以及哪些部分还需要人工试听。检查失败会明确报告。',
      },
    ],
  },
  scene: {
    kicker: '场景 · 翻译字幕',
    title: '一句话，得到双语字幕，每一句都还能接着改',
    lead: '把视频交给智能体，说要翻译。它会转录、翻译，再把字幕排进时间线；你检查、改一句，然后导出。',
    prompt: '把这个视频转录出来，翻译成中文，加上双语字幕。',
    steps: [
      { title: '转录', body: '用本地模型或在线 API，时间精确到词。任务还在跑，片段就陆续出现在时间线上。' },
      { title: '逐句翻译', body: '每句译文都和原文一一对应，可以对照着看。' },
      { title: '双语字幕', body: '原文与译文各占一条轨道，共用一套样式；可以调换上下顺序，也可以再加一种语言。' },
      { title: '改任意一句', body: '点译文直接改，或者让智能体重做某一句，它只改那一句。' },
      { title: '导出', body: '把字幕烧进 MP4，或者另存 SRT、WebVTT 字幕文件。' },
    ],
    alt: 'BaoCut 编辑器：英文字幕与简体中文译文分两条轨道，字幕面板逐句对照显示原文与译文',
  },
  capabilities: {
    kicker: '能做什么',
    title: '从已有素材或一句话简报，到一部仍然可以继续修改的成片',
    lead: '用日常语言提出要求。智能体规划步骤、调用工具，把每一步结果放到时间线上。',
    groups: [
      {
        name: '处理已有素材',
        items: [
          {
            title: '转录',
            body: '使用本地模型（Whisper large-v3 / v3-turbo、Qwen3-ASR、支持说话人区分的 MOSS）或在线 API，支持逐词时间信息；转录片段在任务进行时逐步进入时间线。',
          },
          {
            title: '字幕与翻译',
            body: '原文字幕、译文字幕或双语字幕。智能体逐句翻译，每个视频保存自己的字幕样式。',
          },
          {
            title: '跨语言配音',
            body: '翻译后用 HTDemucs 分离人声与背景声，再用克隆音色或预设音色逐句合成，把新音轨放进时间线。',
          },
          {
            title: '剪辑口播',
            body: '在时间线上去掉口头语、长停顿、重录和说到一半重来的内容，原始媒体文件保持完整。',
          },
          {
            title: '章节、摘要与衍生内容',
            body: '根据带时间信息的文稿制作章节、摘要、标题、博客文章和短视频，每个说法都能用时间戳找到出处。',
          },
        ],
      },
      {
        name: '从创作简报开始',
        items: [
          {
            title: '从提示词制作视频',
            body: '内置 24 个创作模板，涵盖知识讲解、产品发布、预告片、教程、数据故事、文字动画等。',
          },
          {
            title: '先配音，再剪画面',
            body: '规划脚本，一次合成旁白，再按旁白安排画面与节奏。',
          },
          {
            title: '用代码制作动态图形',
            body: '智能体编写自包含的 HTML 合成——下三分之一字幕条、醒目数字、标注、品牌短动画——烘焙成帧后放到时间线上。',
          },
          {
            title: '生成图片',
            body: '需要静态画面时，可使用本地 Qwen-Image 或在线服务。',
          },
        ],
      },
      {
        name: '交付结果',
        items: [
          {
            title: '导出各种格式',
            body: 'MP4 成片（可烧录字幕或另附字幕文件）、SRT / WebVTT、文稿与音频分轨。',
          },
          {
            title: '带着项目走',
            body: '导出便携的 .baocut 包，在另一台机器上打开，视频连同全部文档版本与素材版本都在，可以继续编辑。',
          },
        ],
      },
    ],
  },
  rows: {
    space: {
      kicker: 'Space',
      title: '所有项目做出来的东西，集中在一处',
      body: 'Space 是跨所有项目的视图，汇集视频、素材与产物。可以搜索、按项目或状态筛选，任何视频都能直接打开继续编辑。',
      points: ['视频、成片、字幕与文档并排浏览', '文件仍保存在各自的项目目录里', '一键打开视频进入编辑器'],
      alt: 'BaoCut 的 Space，网格里是来自多个项目的视频',
    },
    home: {
      kicker: 'Home',
      title: '从一句话、一个文件或一个模板开始',
      body: 'Home 是你和智能体协作的地方。描述想要的视频、拖入素材，或挑一个模板；会话可以归属到项目，产出的结果在同一个编辑器里打开。',
      points: ['会话按项目归类', '模板附带示例简报，可直接上手', '每个会话可选择智能体引擎与访问模式'],
      alt: 'BaoCut 的 Home，在这里与智能体开始会话',
    },
    models: {
      kicker: '模型',
      title: '选择自己的模型，本地或在线都行',
      body: '转录、语音合成、图片生成、文本生成、音频分离等能力与服务提供方解耦：可以在本机运行模型，也可以把某项能力指向在线 API，还能把一台机器的本地模型共享给局域网里的其他机器。用量账本记录每个任务的消耗。',
      localLabel: '本地运行',
      local: ['Apple Silicon 上使用 MLX 与 Core ML', 'Windows 上使用 whisper.cpp 与 candle，提供 CUDA 与 Vulkan 版本', 'Whisper、Qwen3-ASR、MOSS、HTDemucs、Qwen-Image'],
      onlineLabel: '或接入',
      compatible: '任何 OpenAI 兼容接口',
      alt: 'BaoCut 的模型设置，列出本地模型与在线服务',
    },
  },
  showcase: {
    kicker: '用 BaoCut 制作',
    title: '从模板开始。下面这些都是智能体做的。',
    lead: '每段预览都由 BaoCut 的智能体按模板自带的简报制作，并从 BaoCut 导出。在 Home 选一个模板，填好简报，就能做出你自己的版本。',
    play: '播放预览',
    close: '关闭',
    scene: '场景模板',
    example: '作品示例',
    seconds: (n) => `${n} 秒`,
  },
  how: {
    kicker: '使用方法',
    title: '三步开始第一次剪辑',
    steps: [
      {
        title: '安装 BaoCut',
        body: '下载 macOS 或 Windows 版。安装包已包含 Runtime 和原生 Worker，无需安装 Node.js、Rust 或编译器。',
      },
      {
        title: '连接智能体引擎',
        body: '登录 Claude Code 或 Codex CLI，或选择其他支持的引擎。媒体分析与导出还需要安装 ffmpeg 和 ffprobe。',
      },
      {
        title: '说出你的需求',
        body: '“转录这个视频，加上双语字幕。”智能体在时间线上完成工作、说明做了什么，你接着改就行。',
      },
    ],
  },
  surfaces: {
    kicker: '四种入口，共用一个 Runtime',
    title: '在应用里、终端里，或通过你自己的智能体使用',
    lead: '各个入口通过同一套协议连接本地 Runtime，编辑同一个视频。',
    items: [
      { title: '桌面应用', body: '在 Home 与智能体协作，在 Space 浏览项目产物，在时间线编辑器里预览、修改、撤销和查看字幕。' },
      { title: 'CLI', body: '面向脚本与终端的轻量客户端。输出被管道接收时使用 JSON，退出码说明是否需要人来处理。' },
      { title: 'MCP + BaoCut skill', body: '让你自己的智能体（Claude Code、Codex、Cursor、Gemini CLI 等）通过同一份工具目录操作 BaoCut。' },
      { title: 'Web 客户端', body: '用一次性链接在浏览器里打开视频的编辑器，查看远端智能体的工作结果。' },
    ],
    terminalTitle: '终端',
    terminalComments: {
      skill: '教你的智能体怎么用 BaoCut',
      mcp: '通过 MCP 把 BaoCut 接入你的智能体',
      web: '在浏览器里打开视频的编辑器',
    },
  },
  download: {
    kicker: '下载',
    title: '下载 BaoCut',
    latest: '最新已验证版本',
    build: 'Build',
    released: '发布于',
    notes: '更新说明',
    platforms: [
      {
        feed: 'mac',
        name: 'macOS',
        chip: 'Apple Silicon · macOS 14+',
        body: '已通过 Developer ID 签名与 Apple 公证。打开 DMG，把 BaoCut 拖入“应用程序”。',
        installer: '下载 DMG',
        portable: 'ZIP',
      },
      {
        feed: 'win',
        name: 'Windows · CPU',
        chip: 'x64',
        body: '使用 CPU 推理，适用于所有 x64 电脑。',
        installer: '下载安装程序',
        portable: 'ZIP',
      },
      {
        feed: 'win-cuda',
        name: 'Windows · CUDA',
        chip: 'NVIDIA',
        body: '适用于 CUDA 13 支持的 NVIDIA 显卡，从 RTX 30 / Ampere 起。',
        installer: '下载安装程序',
        portable: 'ZIP',
      },
      {
        feed: 'win-vulkan',
        name: 'Windows · Vulkan',
        chip: 'AMD · Intel',
        body: '适用于支持 Vulkan 的 AMD / Intel 显卡或较旧的 NVIDIA 显卡；Whisper 使用 GPU，candle 使用 CPU。',
        installer: '下载安装程序',
        portable: 'ZIP',
      },
    ],
    requirementsTitle: '开始之前',
    requirementsHtml: [
      '智能体功能需要已登录的智能体引擎，例如 <strong>Claude Code</strong> 或 <strong>Codex CLI</strong>；只打开应用不需要。',
      '媒体分析、转录与导出需要 PATH 中可用的 <code>ffmpeg</code> 和 <code>ffprobe</code>，安装包不包含它们。',
      'Windows 请先安装 <a href="https://learn.microsoft.com/zh-cn/cpp/windows/latest-supported-vc-redist/" rel="noopener">Microsoft Visual C++ v14 x64 Redistributable</a>。Windows 包未签名，GPU 版需要兼容的显卡驱动。',
      '应用会自动从 GitHub Releases 检查更新。',
    ],
    allReleases: '全部版本与校验文件',
    source: '从源码构建',
    sourceUrl: 'https://github.com/jimliu/baocut/blob/main/README.zh-Hans.md#从源码运行',
  },
  faq: {
    kicker: '常见问题',
    title: '你可能想问',
    items: [
      {
        q: '除了应用本身，还需要准备什么？',
        aHtml:
          '智能体功能需要一个已登录的智能体引擎（Claude Code 与 Codex CLI 已有端到端验证）；媒体分析、转录与导出需要 <code>ffmpeg</code> / <code>ffprobe</code>。模型可以在本地运行，也可以使用你配置的在线服务。',
      },
      {
        q: '我的素材会离开电脑吗？',
        aHtml:
          'Runtime 和项目都在你自己的电脑上。哪些数据会上网取决于你的配置：你接入的智能体引擎（Claude Code、Codex CLI 等）会把智能体读到的内容发给它的模型服务；把某项能力指向在线 API 时，任务所需的数据会发给该服务。本地模型的处理留在本机。',
      },
      {
        q: '哪些智能体可以驱动 BaoCut？',
        aHtml:
          'Claude Code 与 Codex CLI 已有端到端验证；GitHub Copilot CLI、Pi 和 OpenCode 已内置接入；支持 Agent Client Protocol 的智能体（Gemini CLI、Cursor Agent、Grok、Kimi Code，或你自己添加的引擎）通过统一驱动接入。你自己的智能体也可以通过 MCP 或 CLI 操作 BaoCut。',
      },
      {
        q: 'BaoCut 开源吗？',
        aHtml:
          'BaoCut 以 <a href="https://github.com/jimliu/baocut/blob/main/LICENSE">BaoCut Community License</a> 公开源码（source-available）。允许用它进行商业内容创作和企业内部使用；把 BaoCut 本身或其代码商业化需要另行取得书面授权。条款以许可证英文原文为准。',
      },
      {
        q: '有 Linux 版吗？',
        aHtml:
          '暂无安装包。Linux 可以<a href="https://github.com/jimliu/baocut/blob/main/README.zh-Hans.md#从源码运行">从源码开发运行</a>（使用 candle / whisper.cpp），但不提供 Linux 安装包和原生发布验证。',
      },
      {
        q: '能换一台电脑继续编辑吗？',
        aHtml:
          '可以。导出便携的 <code>.baocut</code> 包，它包含视频快照以及全部文档版本与素材版本，在另一台机器上打开即可继续编辑。',
      },
    ],
  },
  cta: {
    title: '让下一部视频一直可以改。',
    body: '下载 BaoCut，接上你常用的智能体，告诉它你想要什么。',
    download: '下载 BaoCut',
    github: '在 GitHub 点亮 Star',
  },
  notFound: {
    title: '页面不存在',
    body: '这个地址没有内容。',
    home: '回到 BaoCut 首页',
  },
  footer: {
    tagline: '以可编辑视频为中心的 AI 视频智能体。',
    product: '产品',
    resources: '资源',
    releases: '版本发布',
    issues: '问题反馈',
    license: '许可证',
    readme: '文档',
    readmeUrl: 'https://github.com/jimliu/baocut/blob/main/README.zh-Hans.md',
    copyright: '© 2026 Jim Liu 与 BaoCut 贡献者。',
    licenseNote: '以 BaoCut Community License 公开源码。',
  },
};
