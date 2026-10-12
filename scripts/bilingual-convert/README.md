# 一键生成双语字幕

通过 BaoCut **公开 CLI** 下载／导入、使用当前默认模型转录、建立字幕并导出；通过已登录的 **Codex CLI** 自动校对和翻译为简体中文。视频保留在 BaoCut 内，可继续编辑。脚本不直接读取或修改视频数据库。

## 目录

- [运行](#运行)
- [输出与续跑](#输出与续跑)
- [环境与边界](#环境与边界)
- [验证](#验证)

## 运行

本机双击桌面的 `BaoCut双语字幕.command`，输入链接或本机媒体路径，再回答画面是否已带英文字幕。脚本入口是本目录的 [launch.command](launch.command)。

命令行转换本次 YouTube 视频（原片已带英文字幕）：

```sh
./scripts/bilingual-convert/launch.command \
  'https://www.youtube.com/watch?v=uRGHx-1CqBQ' \
  --source-has-captions --clash-dns-workaround
```

普通视频／本机文件没有已烧录的字幕时，省略 `--source-has-captions`，BaoCut 会生成原文和中文两层字幕。它不能自动判断画面里是否有字幕，需要如实选择。

复用之前已转录的 BaoCut 视频，避免重新下载和转录：

```sh
./scripts/bilingual-convert/launch.command \
  --video video_3789125e65e8419a --source-has-captions \
  --output "$HOME/Downloads/BaoCut-auto-existing"
```

已有视频保留原文及已有字幕样式；已有简体中文译文与源文稿匹配时复用，否则停止并提示先在 BaoCut 中更新。新导入的视频会先进行保守的原文校对，只改已有词的文字，不改变词 ID、顺序或时间。

## 输出与续跑

默认输出为 `~/Downloads/BaoCut-auto/<输入标识>/`，也可通过 `--output` 指定目录：

| 文件 | 用途 |
| --- | --- |
| `bilingual.srt` | 原文＋简体中文，播放器外挂双语字幕 |
| `bilingual.mp4` | 画面已带字幕的成片 |
| `bilingual.baocut` | 包含素材和文档的可编辑便携包 |
| `conversion-state.json` | 已提交的任务与导出记录，供断点续跑 |

只需字幕和便携包时，增加 `--no-video-export`。再次运行同一条命令会等待之前的任务，复用文稿和译文，并校验输入文件与已导出文件的 SHA-256。不要删除状态文件后在同一目录重新提交；修改视频、换输入或需要全新输出时，用新的 `--output` 目录。正在运行的转换不能与另一条转换共用输出目录。CLI 每次等待 45 秒，超时后脚本继续等，不代表任务失败。

对于新建字幕且原片带英文字幕的输入，脚本停用新生成的原文字幕层，把中文放到画面上方，避免重复英文。SRT 仍包含双语；播放器使用已有英文画面的 MP4 时，无需再加载这个 SRT。通用位置不能保证每个镜头都避开人物，应在 BaoCut 内检查并调整。

## 环境与边界

- 本机入口优先使用 `/opt/miniconda3/bin/python`，其次使用 `python3`；需要 Python 3.11+，仅用标准库，无额外 Python 依赖。
- 需要已安装的 BaoCut、可用的默认转录模型，以及 BaoCut 所需的 ffmpeg／yt-dlp。本机使用已下载的 Whisper Metal 模型；脚本跟随 BaoCut 当前设置，不强制切换模型或 GPU。
- `codex login status` 应显示已登录；无需额外 API Key。转录在当前 BaoCut 服务上执行，校对和翻译把文稿发送给已登录的 Codex 服务，因此翻译需要网络，并受账号额度限制。媒体中的文字只当数据处理；Codex 使用只读沙箱和结构化输出。
- 优先读取 `BAOCUT_CLI` 或 PATH 上的 `baocut`；本仓库本机入口可回退到 Node 直接执行 `apps/cli/src/main.ts`，需要支持 `--experimental-strip-types` 的 Node 版本及仓库依赖。移动仓库后需重新建立桌面快捷方式。
- 双击入口是 macOS 的 zsh `.command`；输出目录锁使用 POSIX `fcntl`。Windows 不适用这个启动器，Web 也不能执行本机脚本；未修改任何 Electron、Web 或原型界面。
- 这个独立 Python 脚本的文案放在 [messages.py](messages.py)，支持英文和简体中文，其余语言回退英文。双击入口默认简体中文，`BAOCUT_LOCALE=en` 可切换英文；不改应用的语言设置。
- `--clash-dns-workaround` 仅在 macOS、YouTube 主机解析为 Clash Fake-IP 时临时使用现有 `PROXY` 组做真实 DNS；结束或正常中断时恢复服务原配置，不修改配置文件，也不关闭 BaoCut 地址安全校验。它要求本机 Clash Verge 服务路径和 `PROXY` 组存在，相关命令见 [Mihomo API](https://wiki.metacubex.one/api/)。进程被强制杀死或系统断电时，需在 Clash 中重新加载配置。
- 自动校对和翻译不能替代人工听审；尤其需要核对专名、数字和否定。当前脚本一次处理整份文稿，尚未验证长视频或超出 Codex 上下文的输入。

本目录是独立的本机辅助脚本，不进入 workspace、产品依赖或发布物。`tsconfig.json` 仅保留脚本归档目录约定；实现与验证均为 Python，不运行 TypeScript 检查。

## 验证

在仓库根目录运行：

```sh
PYTHONDONTWRITEBYTECODE=1 /opt/miniconda3/bin/python scripts/bilingual-convert/convert.test.py
zsh -n scripts/bilingual-convert/launch.command
./scripts/bilingual-convert/launch.command --help
```

合同测试覆盖译文缺失／乱序、词时间保留、任务等待与续跑、状态加载及文件改动检测。实际运行还需用短媒体验证本机转录、Codex 结构化返回、字幕与成片导出；这些检查不等价于全文听审或其他平台通过。
