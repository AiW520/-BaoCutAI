/**
 * 官网文案（英文，缺省语言）。译文在同目录的 `site-copy.<语言>.ts`，用 `import type` 标注成 `SiteCopy`，缺键、多键都是类型错误。
 * 能力描述以根目录的 README.md / README.zh-Hans.md 为准；改产品说法时两边一起改，不在这里写 README 没有的承诺。
 * 字段名以 `Html` 结尾的是可信的 HTML 片段（含 `<code>`、`<a>`），其余字段按纯文本转义。
 */

export interface Item {
  title: string;
  body: string;
}

export interface Platform {
  /** 对应 release.ts 的更新源，页面上的版本号按它改写。 */
  feed: 'mac' | 'win' | 'win-cuda' | 'win-vulkan';
  name: string;
  chip: string;
  body: string;
  installer: string;
  portable: string;
}

export interface SiteCopy {
  /** `<html lang>` 与 hreflang。 */
  lang: string;
  /** 页面路径，以 `/` 结尾。 */
  path: string;
  /** 本页语言的自称，用在语言切换里。 */
  languageName: string;
  /** 日期格式化用的 BCP 47 语言。 */
  dateLocale: string;
  meta: { title: string; description: string; ogImageAlt: string };
  nav: {
    skip: string;
    features: string;
    showcase: string;
    howItWorks: string;
    download: string;
    github: string;
    menu: string;
    language: string;
  };
  hero: {
    badge: string;
    badgeLink: string;
    title: [string, string];
    lead: string;
    downloadMac: string;
    downloadWindows: string;
    downloadOther: string;
    github: string;
    platformsLine: string;
    promptLabel: string;
    prompt: string;
    receiptLabel: string;
    receipt: string;
    shotAlt: string;
  };
  agents: { label: string; note: string };
  principles: { kicker: string; title: string; lead: string; items: Item[] };
  /** 一个具体场景：翻译视频并加双语字幕，从一句话到导出。 */
  scene: { kicker: string; title: string; lead: string; prompt: string; steps: Item[]; alt: string };
  capabilities: {
    kicker: string;
    title: string;
    lead: string;
    groups: Array<{ name: string; items: Item[] }>;
  };
  rows: {
    space: { kicker: string; title: string; body: string; points: string[]; alt: string };
    home: { kicker: string; title: string; body: string; points: string[]; alt: string };
    models: { kicker: string; title: string; body: string; localLabel: string; local: string[]; onlineLabel: string; compatible: string; alt: string };
  };
  showcase: {
    kicker: string;
    title: string;
    lead: string;
    play: string;
    close: string;
    scene: string;
    example: string;
    seconds: (n: number) => string;
  };
  how: { kicker: string; title: string; steps: Item[] };
  surfaces: {
    kicker: string;
    title: string;
    lead: string;
    items: Item[];
    terminalTitle: string;
    terminalComments: { skill: string; mcp: string; web: string };
  };
  download: {
    kicker: string;
    title: string;
    latest: string;
    build: string;
    released: string;
    notes: string;
    platforms: Platform[];
    requirementsTitle: string;
    requirementsHtml: string[];
    allReleases: string;
    source: string;
    /** 「从源码构建」指向的 README 章节。 */
    sourceUrl: string;
  };
  faq: { kicker: string; title: string; items: Array<{ q: string; aHtml: string }> };
  cta: { title: string; body: string; download: string; github: string };
  notFound: { title: string; body: string; home: string };
  footer: {
    tagline: string;
    product: string;
    resources: string;
    releases: string;
    issues: string;
    license: string;
    readme: string;
    /** 本语言的 README。 */
    readmeUrl: string;
    copyright: string;
    licenseNote: string;
  };
}

export const en: SiteCopy = {
  lang: 'en',
  path: '/',
  languageName: 'English',
  dateLocale: 'en-US',
  meta: {
    title: 'BaoCut — the AI video agent that keeps your video editable',
    description:
      'BaoCut is an AI video agent built around an editable video, not a one-shot MP4. It transcribes, subtitles, translates, dubs, cuts and animates, and every result lands in a timeline you can keep editing. For macOS and Windows.',
    ogImageAlt: 'The BaoCut editor with bilingual subtitles on the timeline',
  },
  nav: {
    skip: 'Skip to content',
    features: 'Features',
    showcase: 'Templates',
    howItWorks: 'How it works',
    download: 'Download',
    github: 'GitHub',
    menu: 'Menu',
    language: 'Language',
  },
  hero: {
    badge: 'New release',
    badgeLink: 'Release notes',
    title: ['Tell it what you want.', 'Keep editing what it makes.'],
    lead: 'BaoCut is an AI video agent built around an editable video, not a one-shot MP4. It transcribes, subtitles, translates, dubs, cuts and animates, and every result lands in a timeline you can keep editing.',
    downloadMac: 'Download for macOS',
    downloadWindows: 'Download for Windows',
    downloadOther: 'Download BaoCut',
    github: 'View on GitHub',
    platformsLine: 'macOS 14+ on Apple Silicon · Windows x64 (CPU, CUDA, Vulkan)',
    promptLabel: 'You',
    prompt: 'Translate this into Chinese and add bilingual subtitles.',
    receiptLabel: 'Receipt',
    receipt: 'What changed, what was checked, and what still needs your ear.',
    shotAlt: 'The BaoCut video editor: preview with a caption, the subtitles panel with original and translated lines, and the timeline',
  },
  agents: {
    label: 'Bring your own agent engine',
    note: 'Claude Code and Codex CLI are validated end to end. Any Agent Client Protocol agent plugs in through the same driver.',
  },
  principles: {
    kicker: 'Why BaoCut',
    title: 'Most AI video tools render once and hand you a file. BaoCut hands you the video.',
    lead: 'If the second sentence of the translation is wrong, you shouldn’t have to start over. BaoCut keeps every change inside one editable video.',
    items: [
      {
        title: 'The video is the source of truth',
        body: 'Transcripts, translations, subtitle layers, chapters, voice-overs and motion graphics live inside one editable video. SRT, MP4, audio and transcripts are exports of it.',
      },
      {
        title: 'Change only what you asked for',
        body: 'Fix one subtitle line, swap one shot, redo one voice-over sentence. The agent edits that scope and reports a receipt of what changed.',
      },
      {
        title: 'One editor for you and the agent',
        body: 'You drag a clip, the agent rewrites a caption. Both go through the same commands, transactions and undo stack, so you can take over at any point.',
      },
      {
        title: 'Bounded autonomy',
        body: 'The agent works inside an explicit scope, access mode and budget. Destructive actions ask first. Downloaded pages and transcripts are data, never instructions.',
      },
      {
        title: 'Honest delivery',
        body: 'It reports what it measured, what it actually looked at, and what still needs a human ear. A failed check is reported as a failed check.',
      },
    ],
  },
  scene: {
    kicker: 'Scene · Translate and subtitle',
    title: 'One sentence in, bilingual subtitles out. Every line stays editable.',
    lead: 'Drop in a video and ask for a translation. The agent transcribes, translates and lays the subtitles out on the timeline; you review, fix a line, and export.',
    prompt: 'Transcribe this, translate it into Chinese, and add bilingual subtitles.',
    steps: [
      {
        title: 'Transcribe',
        body: 'Word-level timing from a local model or an online API. Segments stream onto the timeline while the job runs.',
      },
      {
        title: 'Translate sentence by sentence',
        body: 'Each translated sentence stays paired with its original, so you can read them side by side.',
      },
      {
        title: 'Bilingual subtitles',
        body: 'Original and translation sit on their own tracks under one style. Flip their order or add another language.',
      },
      {
        title: 'Fix any line',
        body: 'Click a translation to edit it yourself, or ask the agent to redo one sentence. It changes only that line.',
      },
      {
        title: 'Export',
        body: 'MP4 with burned-in subtitles, or SRT and WebVTT files alongside it.',
      },
    ],
    alt: 'The BaoCut editor with English subtitles and a Simplified Chinese translation on two tracks, and the subtitles panel listing both side by side',
  },
  capabilities: {
    kicker: 'What it can do',
    title: 'From raw footage or a one-line brief to a finished, still-editable video',
    lead: 'Ask in plain language. The agent plans the work, runs the tools and puts every result on the timeline.',
    groups: [
      {
        name: 'From existing footage',
        items: [
          {
            title: 'Transcribe',
            body: 'Local models (Whisper large-v3 / v3-turbo, Qwen3-ASR, MOSS with speaker diarization) or online APIs, with word-level timing. Segments stream into the timeline while the job runs.',
          },
          {
            title: 'Subtitle and translate',
            body: 'Original, translated or bilingual subtitles. The agent translates sentence by sentence, and each video keeps its own subtitle style.',
          },
          {
            title: 'Dub into another language',
            body: 'Translate, separate vocals from the background with HTDemucs, synthesize each sentence with a cloned or preset voice, and lay the new track on the timeline.',
          },
          {
            title: 'Cut a talking-head recording',
            body: 'Remove filler words, long pauses, retakes and false starts on the timeline. The original media is never touched.',
          },
          {
            title: 'Chapters, summaries and more',
            body: 'Chapters, summaries, titles, blog posts and shorts written from the timed transcript, with every claim traceable to a timestamp.',
          },
        ],
      },
      {
        name: 'From a brief',
        items: [
          {
            title: 'Make a video from a prompt',
            body: '24 built-in templates for explainers, product launches, trailers, tutorials, data stories, kinetic typography and more.',
          },
          {
            title: 'Narration first',
            body: 'Plan the script, synthesize the voice in one pass, then cut the picture to the narration.',
          },
          {
            title: 'Motion graphics as code',
            body: 'The agent writes self-contained HTML compositions — lower thirds, big numbers, callouts, brand stingers — bakes the frames and places them on the timeline.',
          },
          {
            title: 'Image generation',
            body: 'For shots that need a still: local Qwen-Image or an online provider.',
          },
        ],
      },
      {
        name: 'Delivery',
        items: [
          {
            title: 'Export anything',
            body: 'MP4 with burned-in or sidecar subtitles, SRT and WebVTT, transcripts and audio stems.',
          },
          {
            title: 'Take the project with you',
            body: 'A portable .baocut bundle reopens on another machine with the video, its documents and media versions, ready to keep editing.',
          },
        ],
      },
    ],
  },
  rows: {
    space: {
      kicker: 'Space',
      title: 'Everything your projects produced, in one place',
      body: 'Space is a live view over the videos, assets and outputs in all your projects. Search, filter by project or status, and reopen anything in the editor to keep working on it.',
      points: ['Videos, exports, subtitles and documents side by side', 'Files stay in their own project folders', 'Open any video straight into the editor'],
      alt: 'BaoCut Space showing a grid of videos from several projects',
    },
    home: {
      kicker: 'Home',
      title: 'Start from a sentence, a file or a template',
      body: 'Home is where you work with the agent. Describe the video you want, drop in footage, or pick a template; each session can belong to a project, and its results open in the same editor.',
      points: ['Sessions grouped by project', 'Templates with example briefs to start from', 'Pick the agent engine and access mode per session'],
      alt: 'The BaoCut Home page where you start a conversation with the agent',
    },
    models: {
      kicker: 'Models',
      title: 'Bring your own models, local or online',
      body: 'Capabilities — transcribe, speak, generate images, generate text, separate audio — are decoupled from providers. Run models on your own machine, point a capability at an API, or share one machine’s local models with others on your LAN. A usage ledger tracks cost per job.',
      localLabel: 'Runs locally',
      local: ['MLX and Core ML on Apple Silicon', 'whisper.cpp and candle on Windows, with CUDA and Vulkan builds', 'Whisper, Qwen3-ASR, MOSS, HTDemucs, Qwen-Image'],
      onlineLabel: 'Or connect',
      compatible: 'any OpenAI-compatible endpoint',
      alt: 'BaoCut model settings with local models and online providers',
    },
  },
  showcase: {
    kicker: 'Made with BaoCut',
    title: 'Start from a template. These were made by the agent.',
    lead: 'Each preview was produced by BaoCut’s agent from the template’s own brief and exported from BaoCut. Pick one in Home, fill in the brief, and make it yours.',
    play: 'Play preview',
    close: 'Close',
    scene: 'Scene template',
    example: 'Showcase example',
    seconds: (n) => `${n}s`,
  },
  how: {
    kicker: 'How it works',
    title: 'Three steps to your first edit',
    steps: [
      {
        title: 'Install BaoCut',
        body: 'Download the app for macOS or Windows. It bundles the Runtime and native workers, so you don’t need Node.js, Rust or a compiler.',
      },
      {
        title: 'Connect an agent engine',
        body: 'Sign in to Claude Code or Codex CLI, or pick another supported engine. Install ffmpeg and ffprobe for media analysis and export.',
      },
      {
        title: 'Say what you want',
        body: '“Transcribe this and add bilingual subtitles.” The agent works on the timeline, reports what it did, and you keep editing from there.',
      },
    ],
  },
  surfaces: {
    kicker: 'Four ways in, one Runtime',
    title: 'Use it from the app, a terminal, or your own agent',
    lead: 'Every surface talks to the same local Runtime over the same protocol and edits the same video.',
    items: [
      { title: 'Desktop app', body: 'Home for working with the agent, Space for everything a project produced, and a full timeline editor with preview, undo and live captions.' },
      { title: 'CLI', body: 'A thin client for scripts and terminals. It emits JSON when piped, and exit codes tell you whether a person needs to act.' },
      { title: 'MCP + BaoCut skill', body: 'Your own agent — Claude Code, Codex, Cursor, Gemini CLI and others — drives BaoCut through the same tool catalog.' },
      { title: 'Web client', body: 'Open any video’s editor in the browser with a one-time link, so a remote agent can show you its work.' },
    ],
    terminalTitle: 'Terminal',
    terminalComments: {
      skill: 'teach your agent how to use BaoCut',
      mcp: 'wire BaoCut into your agent over MCP',
      web: 'open a video’s editor in the browser',
    },
  },
  download: {
    kicker: 'Download',
    title: 'Get BaoCut',
    latest: 'Latest verified release',
    build: 'Build',
    released: 'Released',
    notes: 'Release notes',
    platforms: [
      {
        feed: 'mac',
        name: 'macOS',
        chip: 'Apple Silicon · macOS 14+',
        body: 'Developer ID signed and notarized. Open the DMG and drag BaoCut into Applications.',
        installer: 'Download DMG',
        portable: 'ZIP',
      },
      {
        feed: 'win',
        name: 'Windows · CPU',
        chip: 'x64',
        body: 'CPU inference. Works on any x64 PC.',
        installer: 'Download installer',
        portable: 'ZIP',
      },
      {
        feed: 'win-cuda',
        name: 'Windows · CUDA',
        chip: 'NVIDIA',
        body: 'For NVIDIA GPUs supported by CUDA 13, starting with RTX 30 / Ampere.',
        installer: 'Download installer',
        portable: 'ZIP',
      },
      {
        feed: 'win-vulkan',
        name: 'Windows · Vulkan',
        chip: 'AMD · Intel',
        body: 'For Vulkan-capable AMD and Intel GPUs or older NVIDIA GPUs. Whisper uses the GPU; candle uses the CPU.',
        installer: 'Download installer',
        portable: 'ZIP',
      },
    ],
    requirementsTitle: 'Before you start',
    requirementsHtml: [
      'Agent features need a signed-in agent engine such as <strong>Claude Code</strong> or <strong>Codex CLI</strong>. Opening the app doesn’t.',
      'Media analysis, transcription and export need <code>ffmpeg</code> and <code>ffprobe</code> on your PATH. They are not bundled.',
      'On Windows, install the <a href="https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist/" rel="noopener">Microsoft Visual C++ v14 x64 Redistributable</a> first. Windows packages are unsigned; GPU builds need compatible drivers.',
      'The app checks GitHub Releases for updates on its own.',
    ],
    allReleases: 'All releases and checksums',
    source: 'Build from source',
    sourceUrl: 'https://github.com/jimliu/baocut#run-from-source',
  },
  faq: {
    kicker: 'FAQ',
    title: 'Questions, answered',
    items: [
      {
        q: 'What do I need besides the app?',
        aHtml:
          'A signed-in agent engine for agent features — Claude Code and Codex CLI are validated end to end — and <code>ffmpeg</code> / <code>ffprobe</code> for media analysis, transcription and export. Models can run locally or through providers you configure.',
      },
      {
        q: 'Does my footage leave my computer?',
        aHtml:
          'The Runtime and your projects live on your machine. What leaves it depends on your setup: the agent engine you connect (Claude Code, Codex CLI and so on) sends what the agent reads to its model provider, and a capability you point at an online API sends that provider the data the job needs. Local models keep their work on your machine.',
      },
      {
        q: 'Which agents can drive BaoCut?',
        aHtml:
          'Claude Code and Codex CLI are validated end to end. GitHub Copilot CLI, Pi and OpenCode are built in, and any Agent Client Protocol agent (Gemini CLI, Cursor Agent, Grok, Kimi Code, or one you add) plugs in through the same driver. Your own agent can also drive BaoCut over MCP or the CLI.',
      },
      {
        q: 'Is BaoCut open source?',
        aHtml:
          'BaoCut is source-available under the <a href="https://github.com/jimliu/baocut/blob/main/LICENSE">BaoCut Community License</a>. It permits commercial content creation and internal business use; commercializing BaoCut itself or its code needs a separate written license. The license text is authoritative.',
      },
      {
        q: 'Is there a Linux version?',
        aHtml:
          'Not as an installer. Linux works for <a href="https://github.com/jimliu/baocut#run-from-source">source development</a> with candle / whisper.cpp, but Linux packages and native release checks aren’t provided.',
      },
      {
        q: 'Can I keep editing on another machine?',
        aHtml:
          'Yes. Export a portable <code>.baocut</code> bundle; it carries the video snapshot with all document and media versions and reopens on another machine for further editing.',
      },
    ],
  },
  cta: {
    title: 'Make your next video editable.',
    body: 'Download BaoCut, connect the agent you already use, and tell it what you want.',
    download: 'Download BaoCut',
    github: 'Star on GitHub',
  },
  notFound: {
    title: 'Page not found',
    body: 'There’s nothing at this address.',
    home: 'Back to BaoCut',
  },
  footer: {
    tagline: 'The AI video agent built around an editable video.',
    product: 'Product',
    resources: 'Resources',
    releases: 'Releases',
    issues: 'Issues',
    license: 'License',
    readme: 'Documentation',
    readmeUrl: 'https://github.com/jimliu/baocut#readme',
    copyright: '© 2026 Jim Liu and BaoCut contributors.',
    licenseNote: 'Source-available under the BaoCut Community License.',
  },
};
