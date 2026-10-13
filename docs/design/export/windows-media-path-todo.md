# Windows 导出媒体路径待办

成片导出（`export-worker render`，架构设计 §9.11）在 Windows 上的原生解码、编码与调度优先级还没做过性能整理，也没在 Windows 真机上量过。macOS 一侧已经整理过一轮：解码直接写进轮换的缓冲、合成去掉多余的整帧填充与拷贝、调度优先级、写入器视频轨声明为实时源（结果见验收与测试 §4）。本文列出 Windows 一侧对应的缺口，每条写明位置、做法、像素会不会变、怎么验证，不依赖别的记录就能动手。

涉及的代码：

- 解码：`crates/media-native/src/windows.rs`（Media Foundation Source Reader，输出 RGB32）；
- 编码：`crates/media-native/src/encode_windows.rs`（Media Foundation Sink Writer，H.264）；
- 调度优先级：`crates/export-worker/src/priority.rs` 的 `#[cfg(windows)]` 分支；
- 平台无关的顺序流与缓冲轮换：`crates/media-native/src/frames.rs`（`FrameSource`、`SequentialDecoder`）。

现状：CI 的测试只在 Ubuntu 上跑（`.github/workflows/tests.yml`），Windows 只有打包工作流（`desktop-windows.yml`）。上面这些 `cfg(windows)` 代码最近的改动只在 macOS 上用 `--target x86_64-pc-windows-gnu` 做过类型检查，没有在 Windows 上运行过。

## 待办

| # | 事项 | 像素 | 优先 |
| --- | --- | --- | --- |
| W1 | 解码直接写进调用方的缓冲 | 不变 | 高 |
| W2 | `copy_rows` 去掉逐像素的旋转分支 | 不变 | 高 |
| W3 | 编码输入直接写进 Media Foundation 的缓冲 | 不变 | 中 |
| W4 | 在 Windows 上验证 EcoQoS 的关闭 | 不变 | 高 |
| W5 | 解码走硬件（D3D11） | 会变 | 中 |
| W6 | 编码的节流与低延迟开关 | 码流会变 | 中 |
| W7 | 三家显卡的硬件编码器兼容 | — | 高 |

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

- `priority.rs` 在 Windows 上调用 `SetProcessInformation(ProcessPowerThrottling)`，关掉本进程的执行速度节流。它只做过交叉编译，没在 Windows 上跑过。
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

- `MF_READWRITE_ENABLE_HARDWARE_TRANSFORMS = 1` 时，Sink Writer 选显卡驱动提供的 H.264 编码 MFT（NVIDIA NVENC、AMD AMF、Intel Quick Sync），没有时回落微软的软件编码器。三家的行为没有在本仓库测过。
- 每家各一台机器，导出同一个工程，用 `ffprobe -show_streams -show_frames` 核对：profile 为 High、关键帧间隔等于 `KEYFRAME_INTERVAL_SECONDS` 换算的帧数、BT.709 的 VUI（`encode_windows.rs` 的注释写明尚未在 Windows 上核验）、码率接近设定、faststart 探测的结果与 moov 位置。再核对回落时 `done.video` 报出的后端与原因。
- 驱动缺失或编码 MFT 初始化失败时应能回落，不能让导出失败而不报原因。

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
