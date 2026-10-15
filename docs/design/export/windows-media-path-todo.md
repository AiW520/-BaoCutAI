# Windows 导出媒体路径待办

成片导出（`export-worker render`，架构设计 §9.11）在 Windows 上的原生解码、编码与调度优先级尚有以下缺口。2026-10-15 已在 Windows 11 / RTX 3060 上运行现有测试、1080p 双语字幕导出与 EcoQoS 检查，发现媒体正确性和 GOP 合同未通过，不能把整个 Windows 路径记为完成；环境、失败值与复现命令见 [Windows 实机验证记录](../../acceptance/windows-validation.md)。macOS 一侧的性能整理结果见验收与测试 §4。

涉及的代码：

- 解码：`crates/media-native/src/windows.rs`（Media Foundation Source Reader，输出 RGB32）；
- 编码：`crates/media-native/src/encode_windows.rs`（Media Foundation Sink Writer，H.264）；
- 调度优先级：`crates/export-worker/src/priority.rs` 的 `#[cfg(windows)]` 分支；
- 平台无关的顺序流与缓冲轮换：`crates/media-native/src/frames.rs`（`FrameSource`、`SequentialDecoder`）。

现状：CI 的测试只在 Ubuntu 上跑（`.github/workflows/tests.yml`），Windows 只有打包工作流（`desktop-windows.yml`）。本机已用 MSVC 原生构建并运行这些 `cfg(windows)` 路径；这次没有重打发布包，不能替代 Windows 安装包验收。

## 待办

| # | 事项 | 像素 | 优先 | 状态（2026-10-15） |
| --- | --- | --- | --- | --- |
| W1 | 解码直接写进调用方的缓冲 | 不变 | 高 | 待实现；先解决 W8 的现有正确性失败 |
| W2 | `copy_rows` 去掉逐像素的旋转分支 | 不变 | 高 | 待实现 |
| W3 | 编码输入直接写进 Media Foundation 的缓冲 | 不变 | 中 | 待实现 |
| W4 | 在 Windows 上验证 EcoQoS 的关闭 | 不变 | 高 | 部分通过：原生 API 回读、24 忙进程交替对比通过；真实应用最小化 / 切后台待测 |
| W5 | 解码走硬件（D3D11） | 会变 | 中 | 导出 Source Reader 路径待实现；播放的 DXGI 测试通过不等于此项完成 |
| W6 | 编码的节流与低延迟开关 | 码流会变 | 中 | 待 A/B，未启用候选开关 |
| W7 | 三家显卡的硬件编码器兼容 | — | 高 | 未通过：RTX 3060 主机导出成功、BT.709 / High 正确，但 GOP 为 1 秒而非 2 秒；实际 MFT、AMD / Intel 与回落待测 |
| W8 | 修复原生媒体测试的实机失败 | 待定位 | 高 | 5 个现有测试失败：单帧边界与 SSIM、顺序流起点与 SSIM、NTSC 帧率 |
| W9 | 合成线程的整帧拷贝与分配 | 不变 | 高 | 已实现：Windows 全局分配器（空闲时 1080p 双语字幕 cover 118 → 138 fps、contain 112 → 130 fps）；解出的画面共享给帧光栅、内核画布跨帧复用（空闲时再快 1.08–1.09 倍）；满载都没有一致的方向。这之后分配器反而拖慢 2–5%，待拿掉。合成上 GPU 另有[方案稿](gpu-compositing.md) |

### W1 解码直接写进调用方的缓冲

- 问题：`SourceReaderFrames` 没有覆盖 `FrameSource::next_decoded_into`，走 `frames.rs` 的缺省实现：每帧先在 `copy_rows` 里 `vec![0_u8; w * h * 4]` 新分配一帧（1080p 是 8,294,400 字节），再换进调用方的缓冲。成片导出逐帧都这样分配、清零一遍。
- 做法：照 `macos.rs` 的 `next_decoded_into` 覆盖它。`sample_to_rgba` 与 `copy_rows` 改成写进 `&mut Vec<u8>`（`data.resize(w * h * 4, 0)` 后逐行写），`next_decoded` 保留为对它的薄包装，单帧抽取（`extract_frame_rgba`）不受影响。seek 后早于起点的帧照旧在搬像素之前跳过。
- 验证：同一个源、同一个起点，新旧两条路径解出的前 N 帧逐字节相同（见下文「验证」的等价测试）。

### W2 `copy_rows` 去掉逐像素的旋转分支

- 问题：`copy_rows` 的内层循环对每个像素做一次 `match rotation`、四次单字节写，编译器没法向量化。绝大多数素材不旋转。
- 做法：把旋转分支提到循环外；`rotation == 0` 时按行把 BGRX 换成 RGBA（`chunks_exact(4)` 逐像素换序、alpha 写 255），与 macOS 的 `swizzle_bgra_to_rgba_row` 同一个形状。旋转的三种情况保持逐像素，但各自一条循环。
- 把这段纯函数挪到不带 `cfg(windows)` 的模块里（只吃字节切片、步长和旋转角），macOS 与 CI 上就能跑它的单元测试。

### W3 编码输入直接写进 Media Foundation 的缓冲

- 问题：`SinkWriter::write_frame` 先用 `rgba_to_nv12` 把一帧转进 `staging`，`sample_from_bytes` 再 `MFCreateMemoryBuffer` 新建一块缓冲、把 `staging` 整帧拷进去。每帧多一次分配和一次整帧拷贝（NV12 约 3.1 MB；RGB32 回落时 8.3 MB）。
- 做法：先建缓冲、`Lock`，`rgba_to_nv12`（或 RGB32 的倒行换序）直接写进锁住的内存，`Unlock` 后 `SetCurrentLength`。Sink Writer 可能异步持有 sample，所以缓冲不要跨帧复用，除非改成按 sample 释放回调的缓冲池；每帧新建但直接写入已经省掉那次拷贝。`staging` 字段随之去掉。音频块的 `sample_from_bytes` 用法不变。
- `rgba_to_nv12` 是标量实现。若再要提速可改 SIMD，但必须与现有实现逐字节相同（现有的单元测试只覆盖黑白两色，改之前先补随机图像的对拍测试）。

### W4 在 Windows 上验证 EcoQoS 的关闭

- `priority.rs` 在 Windows 上调用 `SetProcessInformation(ProcessPowerThrottling)`，关掉本进程的执行速度节流。原生实测先开启节流，再调用实际入口，`GetProcessInformation` 回读 `ControlMask=1`、`StateMask=0`，API 关闭行为通过；负载对比见 [Windows 实机验证记录 §2](../../acceptance/windows-validation.md#2-结果)。
- 要确认：调用返回成功（失败时 stderr 有 `cannot opt out of power throttling`）；Worker 在应用最小化、切到后台时导出不降速；同一个构建用 `BAOCUT_EXPORT_PRIORITY=0` 对比，有负载时开着不慢于关着。macOS 上 12 个忙进程时出现过开着反而慢的情况（验收与测试 §4「导出的调度优先级」），Windows 也要在超过核数的负载下量一次。

### W5 解码走硬件（D3D11）

- 问题：Source Reader 只设了 `MF_SOURCE_READER_ENABLE_ADVANCED_VIDEO_PROCESSING`，没有给 `MF_SOURCE_READER_D3D_MANAGER`（`IMFDXGIDeviceManager`），也没设 `MF_READWRITE_ENABLE_HARDWARE_TRANSFORMS`。按 Media Foundation 的文档，这样解码与 YUV→RGB32 转换都在 CPU 上做；在真机上还没确认。
- 做法：建 D3D11 设备与 DXGI 设备管理器交给 Reader，打开硬件转换。输出仍要 CPU 可读：要么让视频处理器输出 RGB32 系统内存样本，要么取 NV12 后自己转 RGBA。建设备或协商格式失败时回落现在的软件路径，并在 `done.video` 里报出后端与回落原因（架构设计 §9.6：硬件路径必须协商并报告）。
- 像素会变（解码器与颜色转换换了实现），合入前要用户确认。跨后端只承诺容差（`frames.rs` 文件头：灰度 SSIM ≥ 0.95），不能用逐字节比对验收。

### W6 编码的节流与低延迟开关

- macOS 上把写入器视频轨声明为实时源后，12 个忙进程时从 59 fps 到 183 fps（验收与测试 §4「视频轨声明为实时源」）：机器忙时编码管线排队，合成线程等编码。
- Windows 上对应的候选：Sink Writer 的 `MF_SINK_WRITER_DISABLE_THROTTLING`，编码器的 `CODECAPI_AVLowLatencyMode`。两者都要在 Windows 满载下 A/B，先确认瓶颈确实在编码排队，再决定开哪个。
- 低延迟模式可能改变编码器的帧类型与码控，输出码流会变；画质合同（码率、GOP、profile）不能悄悄变，开之前用 ffprobe 核对。

### W7 三家显卡的硬件编码器兼容

- `MF_READWRITE_ENABLE_HARDWARE_TRANSFORMS = 1` 允许 Sink Writer 选择显卡驱动提供的 H.264 编码 MFT（NVIDIA NVENC、AMD AMF、Intel Quick Sync），没有时回落微软的软件编码器。RTX 3060 主机的 MF 导出与 ffprobe 已实测：High、BT.709、300 帧和 30 fps 正确，GOP 却为 30 帧而非要求的 60 帧；faststart 明确回落且 `moov` 在 `mdat` 后。当前报告未识别具体 MFT，不能据此认定选到了 NVENC，三家硬件兼容仍未完成。
- 每家各一台机器，导出同一个工程，用 `ffprobe -show_streams -show_frames` 核对：profile 为 High、关键帧间隔等于 `KEYFRAME_INTERVAL_SECONDS` 换算的帧数、BT.709 的 VUI、码率接近设定、faststart 探测的结果与 moov 位置。再核对回落时 `done.video` 报出的后端与原因。
- 驱动缺失或编码 MFT 初始化失败时应能回落，不能让导出失败而不报原因。

### W8 修复原生媒体测试的实机失败

现有单帧、顺序流和写入器测试在 Windows 上分别失败 2、2、1 项；具体测试名、实测值和后续检查见 [Windows 实机验证记录 §3](../../acceptance/windows-validation.md#3-失败与后续事项)。先定位 sample 时间戳、颜色转换、EOF 与容器时基的实际行为，再做 W1–W3 的像素等价优化；不得通过放宽阈值或把失败改成跳过来更新完成状态。W7 的 GOP 差异仍归 W7。

### W9 合成线程的整帧拷贝与分配

- 实测的瓶颈（2026-10-15，RTX 3060 主机，release 的 `export-worker`，`tools/export-bench.ts` 的 1080p30、20 秒双语字幕夹具，临时插桩）：合成线程每帧约 8.3 ms，其中画视频那一层 6.4 ms（`frame-render` 的 `cropped` 在不裁剪时也整帧克隆一次，2.3 ms；内核把它画进一块新分配的 8.3 MB 画布，3.9 ms），叠到帧上 0.95 ms，字幕 0.9 ms；等解码只有 0.2 ms，编码从不让合成线程等。NVENC 确实在用（`nvidia-smi` 的编码器占用平均约 32%、最高 67%），解码器占用为 0（解码在 CPU 上）。所以这台机器上导出卡在 CPU 的合成，GPU 的编码器在等它；这个夹具上解码不是瓶颈，W1 与 W5 不会让它变快。
- 问题：每帧要几块整帧大小的缓冲（解出的画面、实例的源画面、内核画出的层），用完就放、下一帧再要。Windows 的进程堆把这么大的块直接交给 `VirtualAlloc`、释放时还给系统，每一帧拿到的都是新页，写进去先缺页、由系统清零，一块 8 MB 两千多次。不裁剪时实例的源画面也是解出的画面整帧复制来的。
- 做法（三处，像素都不变）：
  - `export-worker` 在 Windows 上装一个全局分配器（`src/frame_alloc.rs`）：释放的 1 MiB 到 64 MiB 的块按大小与对齐精确匹配留着，总量不超过 256 MiB，下一次同样的分配原样拿回去；拿不到锁时不等，直接走系统。glibc 与 macOS 的分配器本来就复用大块，别的平台不装。
  - 解出的画面共享给帧光栅，不复制：`LayerMedia::picture` 交出 `Arc<Pixmap>`，不裁剪、没有效果时 `frame-render` 原样注入内核；内核的恒等直通一路共享到光栅，要改像素（效果、虹膜、遮罩、不透明度）时才 `Arc::make_mut` 复制一份。画完一层就清掉注入表与动态资源表，`Sources` 换帧时 `Arc::try_unwrap` 拿回缓冲还给解码器。
  - 内核的画布跨帧复用：`FrameRenderer::composite` 把用完的那一幅（接管时换下的旧帧，否则是这一层）还给内核（`OverlayRenderPlan::recycle_canvas` → `CpuExecutor::recycle`），下一层经 `rasterize_with_media_into` 画在它上面；旧画布不当作新建时的全零，开头的透明清屏照样写零。
- 结果（交替跑的中位数）：
  - 分配器：空闲时 cover 117.6 → 137.6 fps（1.17 倍）、contain 112.3 → 129.6 fps（1.15 倍）。另起 24 个忙进程（超过 20 个逻辑处理器）时，三批交替的比值在 0.87–1.08 之间，没有一致的方向（7 次一批为 cover 1.03、contain 0.97）。整个导出的峰值工作集 456 → 515 MB。
  - 共享与画布复用（基线是装了分配器的构建；同机另有会话在跑，绝对值比上一行低）：空闲 5 次，cover 120.4 → 129.9 fps（1.08 倍）、contain 118.2 → 128.8 fps（1.09 倍），合成线程每帧 8.30 → 7.70 ms、8.46 → 7.77 ms。24 个忙进程时 7 次的中位数 cover 1.01、contain 1.23，但单次配对的比值在 0.64–1.83 之间，同样的活两种摆法相差 1.5 倍：满载的噪声盖过了差别，没有一致的方向。
  - 分配器还要不要：不要了。同一份新代码装与不装分配器，在确认没有别的负载（没有忙进程、别的 Worker 与编译，CPU 约 4%）时交替跑两批、每批 5 次，两批的先后对调：不装的 cover 149.4 对 143.7 fps、151.7 对 144.1 fps（1.04、1.05 倍），contain 137.0 对 134.3 fps、140.2 对 137.7 fps（1.02、1.02 倍），20 对里 17 对不装的快。合成线程上整帧的分配已经没有了；Windows 的解码仍走 `FrameSource` 缺省的 `next_decoded_into`，每帧新分配一整帧（W1），但它在读帧线程上、不在关键路径上。同机另有基准在跑时量的一次（cover 1.01、contain 1.13，装的快）不作数。满载下的去留没有量。
  - 像素不变：`BAOCUT_EXPORT_NATIVE=0`、`output.crf` 为 1 时新旧构建各 300 帧的 `framemd5` 逐帧相同，覆盖两种摆法与另加的裁剪、画中画加不透明度与效果；分配器那一次原生 Media Foundation 路径（NVENC）的输出也逐帧相同。预览的 WASM 用同一份代码，`packages/ui` 的一致性测试与原生的夹具逐字节相同；`tools/preview-bench.ts` 新旧 WASM 轮流画，1080p 视频加双语字幕每帧 p50 39.1 → 38.3 ms，其余场景持平。
- 余下：拿掉 `export-worker` 的 Windows 全局分配器（`src/frame_alloc.rs` 与 `main.rs` 的装配），按上文的像素核对与空闲、满载对比验证。内核画视频层仍要把解出的画面扫一遍、整帧拷进画布（解出的那一份要留给解码器下一帧可能再用，帧还要叠字幕、交给编码器，这一次省不掉）；旧画布开头的透明清屏还要整幅写零一遍，可以与随后整幅不透明的拷贝合成一步（像素不变）。把合成搬上 GPU 见[导出合成上 GPU（方案稿）](gpu-compositing.md)。

## 验证

- **类型检查**（macOS 上就能做，每次改 Windows 代码都跑）：

  ```bash
  cargo check --target x86_64-pc-windows-gnu -p media-native -p export-worker
  ```

  只证明能编译，不能代替 Windows 上的运行。
- **等价测试**（像素不变的 W1–W3）：把纯函数（行搬运与旋转、`rgba_to_nv12`）放进不带 `cfg(windows)` 的模块，新旧实现对随机图像、四种旋转、奇数宽度逐字节对拍，在 CI 上跑。W1 在 Windows 上另加一条集成测试：同一个源从同一个起点分别用 `next_decoded` 与 `next_decoded_into` 解前 N 帧，逐字节相同。
- **合成像素不变**：改动若碰到合成路径，把 Worker 输入的 `output.crf` 设成 1、加 `BAOCUT_EXPORT_NATIVE=0`（整条走 ffmpeg 与 libx264，相同输入编出相同码流），新旧构建各导出一遍，用 `ffmpeg -f framemd5` 逐帧比对。原生编码器的输出随出帧节奏变，不能拿来逐帧比。
- **性能**：在 Windows 上先把改动前的 `export-worker.exe` 另存，再 `node tools/export-bench.ts --baseline <改动前的 Worker>`；空闲时帧率会顶在硬件编码的吞吐上，要另外在有负载时（起超过核数的忙进程）交替跑，记中位数、比值与负载。
- **打包后的自检**：改动随应用分发，按开发流程 §2「Windows 安装包」那一行在 Windows 上打包并跑 `check-packaged-app.mjs`。
