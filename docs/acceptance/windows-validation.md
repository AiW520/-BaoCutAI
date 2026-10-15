# Windows 实机验证记录

验证日期：2026-10-15。源码基线：`d5f75af1`，BaoCut 3.6.1。本次仅验证已有实现、更新待办状态，未修改产品代码；未重新打包或发布。同日的后续修复（W8 等）在各自的提交里，修复后的重跑结果补在 §2、§3 对应的行里。

## 目录

- [1. 环境与证据](#1-环境与证据)
- [2. 结果](#2-结果)
- [3. 失败与后续事项](#3-失败与后续事项)
- [4. 复现](#4-复现)
- [5. 未覆盖范围](#5-未覆盖范围)

## 1. 环境与证据

| 项目 | 本次环境 |
| --- | --- |
| 系统 | Windows 11 Home，10.0.26200，x64 |
| CPU / 内存 | Intel Core i7-12700F，12 核 / 20 逻辑处理器，约 32 GiB |
| GPU | NVIDIA GeForce RTX 3060，驱动 32.0.15.9174 |
| 工具链 | Rust 1.97.1，`stable-x86_64-pc-windows-msvc`；VS 2022 Build Tools / MSVC 14.44；Node 22.14.0；FFmpeg / ffprobe 8.1.1 |
| Cargo 产物 | 当前检出的 `target/`；媒体测试与 Worker 为 dev profile，逐帧路径按仓库配置启用 opt-level 3，不能视为发布包性能 |
| 夹具 | 自动生成的三段 RGB 色块 / 渐变、440 Hz 正弦音；导出基准为 1920×1080、30 fps、10 秒 testsrc2 和 4 句双语逐词字幕 |

原始日志、ffprobe JSON、临时验证脚本与结果保存在本机 `C:/Users/lyixu/AppData/Local/Temp/baocut-windows-validation-20261015-b6d11927/`。媒体产物在 `C:/Users/lyixu/AppData/Local/Temp/baocut-export-bench-9Nb0Ru/`。本文保留可判定的实测值，不依赖这些临时文件才能判断状态。

安全存储检查只创建本次合成凭据，使用 `test:credential-helper:<pid>` 或唯一的 `baocut-validation-` 名称；验证完删除测试条目，不读取真实 Provider 密钥。Runtime 使用独立临时 Home、项目和下载目录。

## 2. 结果

| 检查 | 状态 | 实际证据与边界 |
| --- | --- | --- |
| `credential-helper` 协议与 Windows 错误处理 | 通过 | 普通测试 7 项通过；默认忽略的真实存储往返另行执行通过，覆盖不存在、写入、读取、覆盖、删除 |
| v2 Credential Manager 读取与 v3 存储 | 通过（合成凭据） | 按 keyring 的原始 `bcut` 服务写入 UTF-16 JSON，真实助手的 `legacy-get` 经 `readLegacyWindowsCredential` 读回中文内容；经 `KeychainCredentialStore` 写入并读回新版服务；旧条目仍在，结束时两份测试条目均删除。历史用户账户的自动升级未实测 |
| Runtime IPC 正常停止 | 通过（空闲 Runtime） | 从当前源码启动，收到 ready 后发送 `{ type: 'stop' }`，退出码 0，发现文件删除；首次测得 46 ms。同一临时 Home 连续两轮启动 / 停止，分别为 41 / 37 ms，每轮均先确认发现文件存在、结束后消失，第二轮成功说明锁已释放。活动任务与 Electron 退出交互不包含在此结论内 |
| Model Worker Windows 平台分支 | 通过（模块测试） | 直接编译当前 `watchdog.rs` 与 `priority.rs` 的 Windows 分支：较晚创建的进程不能冒充父进程、已退出进程不存活、较早且存活进程有效、调用线程降到 BELOW_NORMAL 而测试线程不变，共 4 项通过。未据此声明整个 Model Worker 或 GPU 推理通过 |
| EcoQoS 关闭（W4） | 部分通过 | 在原生进程中先开启执行速度节流，调用实际导出优先级入口，再用 `GetProcessInformation` 回读，得到 `ControlMask=1`、`StateMask=0`。同一构建的 12 次交替导出未观察到开启后变慢，详见下表；应用最小化 / 切后台尚未覆盖 |
| `export-worker` | 通过（现有测试） | 19 项通过；原生构建成功 |
| `media-native` 单元测试 / DXGI frame server | 通过 | 分别 37 / 3 项；DXGI 用仓库真实视频夹具，实际发布可共享 GPU 帧并检查三槽池行为 |
| 单帧抽取 / 顺序帧流 / MP4 写入 | 未通过 → 已修复（W8） | 首轮分别 3 过 2 败、4 过 2 败、4 过 1 败；同日修复后 5 / 6 / 5 项全部通过，阈值未动，详见 §3 |
| 1080p 双语字幕成片导出 | 通过（冒烟） | cover / contain 均输出 300 帧，解码和编码均报告 `media-foundation`，无编解码回落；合成 4.068 / 4.314 秒，即 73.7 / 69.5 fps；contain / cover = 0.94。各跑一次，不能作为性能回归门槛 |
| H.264 输出合同（W7） | 部分通过，GOP 不符 → 同日修复后通过（NVIDIA） | 修复后重测（10 秒 contain 夹具）：High、BT.709 三项与 tv range、30/1、300 帧、`start_time` 0、关键帧在 0 / 60 / 120 / 180 / 240、无 B 帧、9,647,364 bit/s；`done.video.encoderDevice` 报 `NVIDIA H.264 Encoder MFT`（硬件）。首轮：High profile、1920×1080、30/1、300 帧，BT.709 primaries / transfer / matrix、limited range 正确；实测码率 9,632,737 bit/s。关键帧每 30 帧一次，而代码要求 60 帧。本机 faststart 不支持，stderr 明确回落，`mdat` 在 `moov` 前 |
| Windows 路径、停止监督与凭据迁移 TS 回归 | 未全过 | 5 个文件共 53 项，52 过 1 败；包含 6 项 Windows v2 升级测试。唯一失败为 POSIX 文件权限位断言，详见 §3。路径测试没有实际打开 Explorer 或系统保存窗口 |

### EcoQoS 对比的解释

使用同一个 Worker 和固定输入交替设置 `BAOCUT_EXPORT_PRIORITY=1` / `0`；每种条件各 3 次，先后顺序轮换。输入沿用 contain 夹具，将视频片段截为 150 帧，字幕仍延续到约 10 秒，所以输出仍为 300 帧；这张表只能用于开关对比，不能与完整 10 秒视频的冒烟数字直接比较。另起 24 个忙进程，超过 20 个逻辑处理器。Windows 的 `os.loadavg()` 恒为零，负载以 `os.cpus()` 的时间增量计算 CPU 忙碌率，不能将基准输出里的 `0.0/20` 当作机器空闲。

| 条件 | 实测 CPU 忙碌率 | 开启 / 关闭墙钟中位数 | 开启 / 关闭合成中位数 | 墙钟比值（开启 / 关闭） |
| --- | --- | --- | --- | --- |
| 无人工加压，仍有机器上的其他工作 | 35.4%–46.9% | 3.421 / 3.508 秒 | 2.647 / 2.760 秒 | 0.975 |
| 24 个忙进程 | 约 100% | 30.201 / 33.648 秒 | 23.915 / 24.344 秒 | 0.898 |

本轮未观察到开启后的中位数退化；3 次样本不构成稳定提速的统计结论。所有导出均完成、无编解码回落，未出现 `cannot opt out of power throttling`。W4 仍保留真实应用最小化与前后台切换的验证缺口，测试启动的 24 个忙进程已全部结束。

满载期间还尝试额外启动 Runtime，未在脚本的 45 秒期限内报告 ready，被脚本结束；该次尚未进入 IPC 停止步骤。撤掉人工负载后，同一 Home 两轮重启与停止检查通过。没有据此宣称满载启动时延通过。

## 3. 失败与后续事项

| 失败 | 实测 | 后续验证要求 |
| --- | --- | --- |
| `extract_frame::frames_do_not_bleed_across_a_segment_boundary` | `t=1.0166667s` 应为绿段，实际仍为红段 | 已修复（W8）：MF 不应用视频轨编辑表，时间戳整体晚两帧；扣掉 `elst` 起点后通过 |
| `extract_frame::native_frames_match_the_ffmpeg_fallback_within_the_cross_backend_tolerance` | `t=0.5s` 降采样灰度 SSIM 0.8132，低于 0.95；全分辨率 0.8484 | 已修复（W8）：MF 的 RGB32 转换不看码流标注、按高度猜成 BT.601；改为 NV12 按解码器报的矩阵自行换算后三个时刻降采样 SSIM 0.9907–0.9956，阈值未动 |
| `frame_stream::the_stream_starts_on_the_frame_that_covers_the_requested_time` | 从 0.5 秒开始应剩 75 帧，实际 77 帧 | 已修复（W8）：同单帧边界，时间戳晚两帧；修后从 0、0.5、1.0167 秒起分别 90、75、60 帧，首帧时刻 0、0.5、1.0 |
| `frame_stream::native_frames_match_the_ffmpeg_fallback_within_the_cross_backend_tolerance` | 第 15 帧降采样 SSIM 0.7909，低于 0.95；全分辨率 0.7958 | 已修复（W8）：同单帧的颜色矩阵；8 个探测帧降采样 SSIM 0.9699–0.9864，逐通道最大偏差 2–3 |
| `mp4_writer::ntsc_frame_rates_survive_the_container_timebase` | 29.97 的读回值为 29.97049950832514，未满足现有断言 | 已修复（W8）：编码时序问题。时间戳按「单帧时长 × 帧号」截断累积；MP4 Sink 按 `round(1000 × 帧率)` 定时标（29970，容器存 2997/100）。改为逐帧按有理数取时刻（向下取整加 1 hns）、NTSC 系在媒体类型上声明整数帧率后读回 30000/1001；在 NVIDIA 的 H.264 MFT 上 23.976 / 29.97 / 59.94 / 30 fps 各 1–130 帧逐一读回正确 |
| W7 的 GOP 合同 | `KEYFRAME_INTERVAL_SECONDS=2.0`，30 fps 应为 60 帧；ffprobe 读到 0、1、2…9 秒的 I 帧 | 已修复：选中的是 `NVIDIA H.264 Encoder MFT`（硬件，现由 `done.video.encoderDevice` 报出），它不接受 `MF_MT_MAX_KEYFRAME_SPACING`（720p 起每 30 帧），改由 Sink Writer 的编码器参数给 `CODECAPI_AVEncMPVGOPSize` 后 720p / 1080p 都是每 60 帧；同时给 `CODECAPI_AVEncMPVDefaultBPictureCount=0`，微软软件编码器的 B 帧曾让画面晚一帧开始（`start_time` 0.0333 秒）。AMD / Intel 未测 |
| `keychain-credential-store.test.ts` 的部分迁移测试 | 断言 `stat.mode & 0o777 == 0o600`，Windows 实际为 `0o666` | 这是 Windows 文件权限表达与 POSIX 断言的差异；迁移、保留失败项和真实 Credential Manager 存取分别已测。需要 Windows ACL 验证口径，不能据此宣称权限安全已验收 |

faststart 的实测 MP4 顶层 box 顺序为 `ftyp → uuid → mdat → moov`，`mdat` 偏移 63、`moov` 偏移 12,040,961，与明确回落的日志相符；这项不是静默失败。

## 4. 复现

在 x64 Developer PowerShell 中，从仓库根目录执行。`--no-fail-fast` 保证发现某一测试目标失败后仍覆盖后续目标：

```powershell
cargo test -p media-native -p export-worker -p credential-helper --no-fail-fast -- --nocapture
cargo test -p credential-helper --test protocol -- --ignored real_keychain_round_trip
cargo build -p export-worker -p credential-helper
```

本次因首轮测试在单帧抽取失败后停止，另行运行了 `cargo test -p media-native --test frame_stream --test mp4_writer --no-fail-fast -- --nocapture`。

导出脚本的缺省工具查找依赖 `/usr/bin/env which`；在 Windows 上明确给出带 `/` 的绝对路径，避免把脚本的查找失败误判为缺少 FFmpeg：

```powershell
$env:BAOCUT_FFMPEG = (Get-Command ffmpeg).Source.Replace('\', '/')
$env:BAOCUT_FFPROBE = (Get-Command ffprobe).Source.Replace('\', '/')
node --experimental-strip-types tools/export-bench.ts --worker target/debug/export-worker.exe --seconds 10 --runs 1 --json "$env:TEMP/baocut-windows-export-smoke.json" --keep
# 本次保留的产物；重跑后改用脚本输出的新夹具目录。
ffprobe -v error -select_streams v:0 -show_streams -show_frames -of json "$env:TEMP/baocut-export-bench-9Nb0Ru/out.mp4"
```

Node 22.14 的 TypeScript 子进程需要继承显式类型剥离选项；SWC 的缺省缓存目录在本机因 ACL 校验被拒，使用独立缓存目录后可运行。缺失的 workspace 链接和依赖经安装补齐，安装产生的 lockfile 元数据改写已恢复，未提交依赖变化。

```powershell
$env:NODE_OPTIONS = '--experimental-strip-types'
$env:SWC_NATIVE_BINDING_CACHE = Join-Path $env:USERPROFILE '.codex/tmp/baocut-windows-swc-cache'
npx vitest run apps/desktop/src/main/runtime-supervisor.test.ts apps/desktop/src/main/reveal-path.test.ts apps/desktop/src/main/save-dialog-path.test.ts packages/runtime-storage/src/keychain-credential-store.test.ts packages/runtime-core/src/legacy-upgrade-windows.test.ts --reporter=verbose
```

平台模块的原生检查用临时 Rust 驱动按绝对路径引入实际源码，以 `rustc --edition 2024 --test` 编译，不复制产品实现。EcoQoS、Runtime IPC、合成 v2 凭据与满载对比的临时驱动均随原始证据保留。

## 5. 未覆盖范围

- W1–W3 缓冲与拷贝优化、W5 导出 Source Reader 的 D3D11 硬件解码尚未实现；DXGI 播放帧测试通过不等于 W5 完成。
- W6 编码器节流与低延迟候选没有改动或 A/B；W4 尚未验证真实 Electron 应用最小化和切到后台。
- 只有 RTX 3060 一台设备；`done.video.encoderDevice` 现在报出实际 MFT（本机为 `NVIDIA H.264 Encoder MFT`），只代表这台 NVIDIA 机器。AMD / Intel、无驱动与 MFT 初始化失败回落仍待验证。
- 未重打 CPU / CUDA / Vulkan 安装包，未验证应用内更新、NSIS、打包字体、Whisper CUDA / Vulkan、真实模型推理和 AVX2 发布基线。既有 CI 打包结果与本次源码验证应分别判断。
- 未实际操作 Explorer、系统保存窗口或 Electron UI；没有把路径单元测试记作这些系统交互已通过。
- Model Worker 的整进程孤儿退出、活动任务的取消 / 停止屏障、Windows 内存压力信号与真实历史账户自动迁移仍待相应环境验证。
