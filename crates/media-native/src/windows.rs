//! Windows 原生解码：Media Foundation `IMFSourceReader` 解出 NV12，本 crate 换成 RGBA。
//! 单帧抽取与顺序帧流共用同一个 [`VideoReader`]（reader 搭建、时间戳换算、像素换算），区别只在读法。
//!
//! ## 已知坑：`SetCurrentPosition` 只到关键帧
//!
//! MF 的 seek 语义是「定位到不晚于目标的那个关键帧」，长 GOP 素材上能落在目标
//! 前好几秒。**seek 之后必须循环 `ReadSample` 比对时间戳推进到目标帧**，否则
//! filmstrip 会出现一长串完全相同的格子。这是与 macOS `AVAssetImageGenerator`
//! （容差置零就精确）最大的实现差异，也是本模块存在的主要复杂度。
//!
//! ## 已知坑：MP4 视频轨的编辑表不生效
//!
//! MF 的 MPEG-4 源不应用 `elst`：带 B 帧的 H.264（libx264 缺省两级 B 帧）首帧报的是组合时间 0.0667 秒，整条流按
//! 时间戳取帧都晚两帧——段边界取到上一段、从 0.5 秒起多出两帧（Windows 11 实测）。打开时用
//! [`media_probe::video_edit_start`] 读出偏移，交出的时间戳与 seek 目标都换到 ffmpeg / AVFoundation 的呈现时间轴。
//!
//! ## 颜色换算自己做
//!
//! 让 reader 直接交 RGB32 时，MF 的视频处理器不看码流标注的矩阵，按画面大小猜（576 行及以下 BT.601，以上
//! BT.709）：标清的 BT.709 素材红色只剩 0.914 倍，与 ffmpeg 的跨后端 SSIM 掉到 0.79。解码器自己的输出类型在第一个
//! 样本（`MF_SOURCE_READERF_CURRENTMEDIATYPECHANGED`）之后带着码流的矩阵、量化范围、对齐后的平面高度与显示孔径，
//! 所以这里请求 NV12，按它报的布局与颜色在 CPU 上换成 RGBA（[`crate::yuv`]）。码流没标矩阵时沿用 MF 的按大小推定
//! （[`YuvMatrix::guess`]），无标注素材的颜色与改动前一致。
//!
//! ## 缩放在 CPU 上做
//!
//! 理论上可以给 reader 设一个目标尺寸的输出媒体类型，让 advanced video
//! processing 顺手缩放。实践上这条路对格式协商很挑剔（不同解码器接受的目标
//! 尺寸集合不同），失败方式还是安静的——协商不成时它会给回原尺寸。缩略图一次
//! 只解一帧，CPU 上做一次盒式下采样（[`crate::resize_rgba`]）的成本可以忽略，
//! 换来的是"尺寸契约永远成立"。顺序帧流根本不缩放：渲染管线要的就是源尺寸。
//!
//! ## 旋转
//!
//! MF 不会自动摆正：旋转角从原生媒体类型的 `MF_MT_VIDEO_ROTATION` 读出，在
//! 像素换算时应用（与 `apps/cli` 的 MF 导出后端同一条规矩）。

use std::os::windows::ffi::OsStrExt;
use std::path::Path;

use anyhow::{Context, Result, anyhow, bail};
use windows::Win32::Foundation::HMODULE;
use windows::Win32::Graphics::Direct3D::D3D_DRIVER_TYPE_HARDWARE;
use windows::Win32::Graphics::Direct3D10::ID3D10Multithread;
use windows::Win32::Graphics::Direct3D11::{
    D3D11_CPU_ACCESS_READ, D3D11_CREATE_DEVICE_VIDEO_SUPPORT, D3D11_MAP_READ,
    D3D11_MAPPED_SUBRESOURCE, D3D11_SDK_VERSION, D3D11_TEXTURE2D_DESC, D3D11_USAGE_STAGING,
    D3D11CreateDevice, ID3D11Device, ID3D11DeviceContext, ID3D11Texture2D,
};
use windows::Win32::Graphics::Dxgi::Common::{DXGI_FORMAT_NV12, DXGI_SAMPLE_DESC};
use windows::Win32::Media::MediaFoundation::*;
use windows::Win32::System::Com::StructuredStorage::PROPVARIANT;
use windows::Win32::System::Com::{COINIT_MULTITHREADED, CoInitializeEx, CoUninitialize};
use windows::core::{GUID, Interface, PCWSTR};

use crate::yuv::{Area, Nv12, YuvMatrix, YuvToRgb, nv12_to_rgba};
use crate::{RgbaFrame, scale};

const HNS_PER_SECOND: f64 = 10_000_000.0;
const VIDEO_STREAM: u32 = MF_SOURCE_READER_FIRST_VIDEO_STREAM.0 as u32;
const ALL_STREAMS: u32 = MF_SOURCE_READER_ALL_STREAMS.0 as u32;

/// 一次原生媒体操作（抽帧、顺序流、MP4 写入）期间的 COM + Media Foundation
/// 生命周期。解码与编码共用同一份：两边都要 `CoInitializeEx` + `MFStartup`，
/// 各写一份只会让 `MFShutdown` 的配对更难看清。
pub(crate) struct Runtime;

impl Runtime {
    pub(crate) fn start() -> Result<Self> {
        unsafe {
            CoInitializeEx(None, COINIT_MULTITHREADED)
                .ok()
                .map_err(|error| media_feature_error("初始化 COM", error))?;
            if let Err(error) = MFStartup(MF_VERSION, MFSTARTUP_FULL) {
                CoUninitialize();
                return Err(media_feature_error("启动 Media Foundation", error));
            }
        }
        Ok(Self)
    }
}

impl Drop for Runtime {
    fn drop(&mut self) {
        unsafe {
            let _ = MFShutdown();
            CoUninitialize();
        }
    }
}

pub(crate) fn media_feature_error(context: &str, error: windows::core::Error) -> anyhow::Error {
    anyhow!(
        "{context}失败：{error}。如果使用 Windows N/KN，请在‘可选功能’中安装 Media Feature Pack"
    )
}

/// `\\?\` 前缀的路径 MF 的 URL 解析器不认（会当成网络地址），与导出后端同一条
/// 规范化规则。
pub(crate) fn wide_path(path: &Path) -> Vec<u16> {
    let wide: Vec<u16> = path.as_os_str().encode_wide().collect();
    let verbatim = [b'\\' as u16, b'\\' as u16, b'?' as u16, b'\\' as u16];
    let unc = [b'U' as u16, b'N' as u16, b'C' as u16, b'\\' as u16];
    let mut normalized =
        if wide.starts_with(&verbatim) && wide.get(4..8).is_some_and(|value| value == unc) {
            [b'\\' as u16, b'\\' as u16]
                .into_iter()
                .chain(wide[8..].iter().copied())
                .collect()
        } else if wide.starts_with(&verbatim)
            && wide.get(5) == Some(&(b':' as u16))
            && wide.get(6) == Some(&(b'\\' as u16))
        {
            wide[4..].to_vec()
        } else {
            wide
        };
    normalized.push(0);
    normalized
}

pub(crate) fn pack_ratio(numerator: u32, denominator: u32) -> u64 {
    (u64::from(numerator) << 32) | u64::from(denominator)
}

fn unpack_ratio(value: u64) -> (u32, u32) {
    ((value >> 32) as u32, value as u32)
}

pub(crate) fn extract_frame_rgba(
    path: &Path,
    time_seconds: f64,
    target_width: u32,
) -> Result<RgbaFrame> {
    if !path.is_file() {
        bail!("媒体文件不存在：{}", path.display());
    }
    let _runtime = Runtime::start()?;
    unsafe { extract_inner(path, time_seconds, target_width) }
}

unsafe fn extract_inner(path: &Path, time_seconds: f64, target_width: u32) -> Result<RgbaFrame> {
    // 缩略图一次只解一帧：建 D3D11 设备的价不值得，走软件解码。
    let mut video = unsafe { VideoReader::open(path, false)? };
    let target_hns = (time_seconds * HNS_PER_SECOND) as i64;
    unsafe { video.seek(target_hns, time_seconds)? };

    // seek 只保证落在目标之前的关键帧上；这里逐帧推进到「覆盖 t 的那一帧」，
    // 也就是最后一个时间戳 ≤ t 的帧。第一帧就晚于 t（seek 过头 / t 在首帧之前）
    // 时用它本身，不然会交出一个空帧。
    let mut held: Option<IMFSample> = None;
    while let Some(decoded) = unsafe { video.next_sample()? } {
        if decoded.timestamp > target_hns {
            if held.is_none() {
                held = Some(decoded.sample);
            }
            break;
        }
        held = Some(decoded.sample);
    }
    let sample = held.with_context(|| {
        format!(
            "Media Foundation 在 {time_seconds:.3}s 处没有解出任何帧（{}）",
            path.display()
        )
    })?;

    let mut data = Vec::new();
    let (width, height) = unsafe { video.sample_to_rgba(&sample, &mut data)? };
    let decoded = RgbaFrame {
        width,
        height,
        data,
    };
    let height = scale::scaled_height(decoded.width, decoded.height, target_width);
    Ok(scale::resize_rgba(&decoded, target_width, height))
}

/// 一个视频样本与它在呈现时间轴上的时刻（hns）。
struct ReadVideoSample {
    timestamp: i64,
    /// 样本自带的时长（hns），没有或不为正时 `None`。
    duration: Option<i64>,
    sample: IMFSample,
}

/// 解码器当前交的 NV12 布局与颜色换算。第一个样本到达时解码器才解析完序列头，随
/// `MF_SOURCE_READERF_CURRENTMEDIATYPECHANGED` 更新。
struct Nv12Layout {
    /// 平面高度（解码器按宏块对齐后的编码高度，如 1080 → 1088）：色度平面从 `行距 × plane_rows` 起。
    plane_rows: usize,
    /// 缺省行距：拿不到 2D 缓冲、只能按连续缓冲读时用。
    stride: usize,
    /// 显示孔径：要换算的那一块。
    visible: Area,
    convert: YuvToRgb,
}

/// 显卡解码用的 D3D11 设备与交给 Source Reader 的 DXGI 设备管理器（W5）。
///
/// Reader 拿到设备管理器后，解码 MFT 走 DXVA（NVIDIA 上即 NVDEC），交出的样本是显存里的 NV12 纹理；
/// `IMF2DBuffer2::Lock2DSize` 时 Media Foundation 把它拷到暂存纹理里读回。NV12 之后的换算与软件路径是同一个函数。
struct HardwareDecode {
    manager: IMFDXGIDeviceManager,
    context: ID3D11DeviceContext,
    /// 读回用的暂存纹理，按解码纹理的尺寸与格式建一次，尺寸变了再重建。
    staging: std::cell::RefCell<Option<(ID3D11Texture2D, D3D11_TEXTURE2D_DESC)>>,
    device: ID3D11Device,
}

impl HardwareDecode {
    /// 与解码纹理同尺寸、同格式的 CPU 可读暂存纹理（单层、无 mip）。
    unsafe fn staging_for(&self, source: &D3D11_TEXTURE2D_DESC) -> Result<ID3D11Texture2D> {
        let mut cached = self.staging.borrow_mut();
        if let Some((texture, desc)) = cached.as_ref()
            && (desc.Width, desc.Height, desc.Format)
                == (source.Width, source.Height, source.Format)
        {
            return Ok(texture.clone());
        }
        let desc = D3D11_TEXTURE2D_DESC {
            Width: source.Width,
            Height: source.Height,
            MipLevels: 1,
            ArraySize: 1,
            Format: source.Format,
            SampleDesc: DXGI_SAMPLE_DESC {
                Count: 1,
                Quality: 0,
            },
            Usage: D3D11_USAGE_STAGING,
            BindFlags: 0,
            CPUAccessFlags: D3D11_CPU_ACCESS_READ.0 as u32,
            MiscFlags: 0,
        };
        let mut texture = None;
        unsafe {
            self.device
                .CreateTexture2D(&desc, None, Some(&mut texture))?
        };
        let texture = texture.context("D3D11 返回空暂存纹理")?;
        *cached = Some((texture.clone(), desc));
        Ok(texture)
    }
}

/// 建显卡解码设备。只要真显卡（不退 WARP：软件光栅器上没有 DXVA，不如直接走软件解码）。
unsafe fn hardware_decode() -> Result<HardwareDecode> {
    let mut device = None;
    unsafe {
        D3D11CreateDevice(
            None,
            D3D_DRIVER_TYPE_HARDWARE,
            HMODULE::default(),
            D3D11_CREATE_DEVICE_VIDEO_SUPPORT,
            None,
            D3D11_SDK_VERSION,
            Some(&mut device),
            None,
            None,
        )
    }
    .map_err(|error| anyhow!("d3d11-device: 建不了支持视频的 D3D11 设备（{error}）"))?;
    let device: ID3D11Device = device.context("d3d11-device: D3D11 返回空设备")?;
    // Media Foundation 的解码线程与读回会从别的线程用同一个设备。
    let multithread: ID3D10Multithread = device
        .cast()
        .context("d3d11-device: D3D11 设备不支持多线程保护")?;
    let _ = unsafe { multithread.SetMultithreadProtected(true) };
    let mut reset_token = 0_u32;
    let mut manager = None;
    unsafe { MFCreateDXGIDeviceManager(&mut reset_token, &mut manager) }
        .map_err(|error| anyhow!("dxgi-manager: 建不了 DXGI 设备管理器（{error}）"))?;
    let manager: IMFDXGIDeviceManager =
        manager.context("dxgi-manager: Media Foundation 返回空 DXGI 设备管理器")?;
    unsafe { manager.ResetDevice(&device, reset_token) }
        .map_err(|error| anyhow!("dxgi-manager: 绑定 D3D11 设备失败（{error}）"))?;
    let context = unsafe { device.GetImmediateContext()? };
    Ok(HardwareDecode {
        manager,
        context,
        staging: std::cell::RefCell::new(None),
        device,
    })
}

/// Source Reader 链上的视频解码 MFT 的名字。硬件 MFT 有友好名；微软的解码器不带友好名，有 CLSID 时按 CLSID 认，
/// 都没有时按编码报（`Media Foundation H264 decoder`）。
unsafe fn video_decoder_name(reader: &IMFSourceReader, codec: &str) -> String {
    let fallback = || format!("Media Foundation {codec} decoder");
    let Ok(reader) = reader.cast::<IMFSourceReaderEx>() else {
        return fallback();
    };
    for index in 0..8 {
        let mut category = GUID::zeroed();
        let mut transform = None;
        if unsafe {
            reader.GetTransformForStream(VIDEO_STREAM, index, Some(&mut category), &mut transform)
        }
        .is_err()
        {
            break;
        }
        if category != MFT_CATEGORY_VIDEO_DECODER {
            continue;
        }
        let Some(attributes) =
            transform.and_then(|transform| unsafe { transform.GetAttributes() }.ok())
        else {
            break;
        };
        if let Ok(length) = unsafe { attributes.GetStringLength(&MFT_FRIENDLY_NAME_Attribute) } {
            let mut buffer = vec![0_u16; length as usize + 1];
            if unsafe { attributes.GetString(&MFT_FRIENDLY_NAME_Attribute, &mut buffer, None) }
                .is_ok()
            {
                buffer.truncate(length as usize);
                return String::from_utf16_lossy(&buffer);
            }
        }
        match unsafe { attributes.GetGUID(&MFT_TRANSFORM_CLSID_Attribute) } {
            Ok(clsid) if clsid == CLSID_MSH264DecoderMFT => {
                return "Microsoft H264 Video Decoder MFT".to_string();
            }
            Ok(clsid) if clsid == CLSID_MSH265DecoderMFT => {
                return "Microsoft HEVC Video Decoder MFT".to_string();
            }
            Ok(clsid) => return format!("{clsid:?}"),
            Err(_) => break,
        }
    }
    fallback()
}

/// 媒体子类型的 FourCC（`H264`、`HEVC`、`AV01`…）；不是 FourCC 形式的 GUID 时 `video`。
fn subtype_fourcc(subtype: &GUID) -> String {
    let bytes = subtype.data1.to_le_bytes();
    if bytes.iter().all(|byte| byte.is_ascii_alphanumeric()) {
        String::from_utf8_lossy(&bytes).into_owned()
    } else {
        "video".to_string()
    }
}

/// 只读视频轨、输出 NV12 的 source reader，连同时间戳与像素的换算。
struct VideoReader {
    reader: IMFSourceReader,
    /// 显卡解码的设备（没请求或没建成时 `None`）。写在 `reader` 后面：先放掉 reader 再放设备。
    hardware: Option<HardwareDecode>,
    /// 实际在用的解码器；硬件路径在第一帧解出来之后才定（`hardware` 字段为真表示样本确实在显存里）。
    device: Option<crate::frames::DecoderDevice>,
    /// 请求了显卡解码却没走成的原因。
    hardware_fallback: Option<String>,
    /// 源的视频编码（原生媒体类型子类型的 FourCC），解码器报不出名字时用它描述。
    codec: String,
    /// 源的显示尺寸（摆正前）。
    encoded_width: u32,
    encoded_height: u32,
    rotation: u16,
    /// 轨道级帧长（秒）：样本自带的 duration 无效时用它判片尾（macOS 那边同样的坑，
    /// 见 `frames::DecodedFrame::duration_seconds`）。
    track_frame_duration: Option<f64>,
    /// MF 时间戳减去它才是呈现时刻（hns）：视频轨编辑表的起点，MF 自己不扣（见模块文档）。
    edit_offset_hns: i64,
    layout: Nv12Layout,
}

impl VideoReader {
    /// `try_hardware`：先试显卡解码（W5），建设备、交管理器或协商 NV12 不成就回落软件解码，原因记进
    /// `hardware_fallback`。
    unsafe fn open(path: &Path, try_hardware: bool) -> Result<Self> {
        if !try_hardware {
            return unsafe { Self::open_with(path, None) };
        }
        let fallback = match unsafe { hardware_decode() } {
            Ok(hardware) => match unsafe { Self::open_with(path, Some(hardware)) } {
                Ok(reader) => return Ok(reader),
                Err(error) => format!("{error:#}"),
            },
            Err(error) => format!("{error:#}"),
        };
        let mut reader = unsafe { Self::open_with(path, None)? };
        reader.hardware_fallback = Some(fallback);
        Ok(reader)
    }

    unsafe fn open_with(path: &Path, hardware: Option<HardwareDecode>) -> Result<Self> {
        let attributes = unsafe {
            let mut value = None;
            MFCreateAttributes(&mut value, 3)
                .map_err(|error| media_feature_error("创建 Media Foundation 属性", error))?;
            let value = value.context("Media Foundation 返回空属性对象")?;
            // 解码器原生交 NV12 时不插任何转换；P010（10 位 HEVC）、YUY2 之类由视频处理器换成 NV12。
            value.SetUINT32(&MF_SOURCE_READER_ENABLE_ADVANCED_VIDEO_PROCESSING, 1)?;
            if let Some(hardware) = &hardware {
                value.SetUnknown(&MF_SOURCE_READER_D3D_MANAGER, &hardware.manager)?;
                value.SetUINT32(&MF_READWRITE_ENABLE_HARDWARE_TRANSFORMS, 1)?;
            }
            value
        };
        let wide = wide_path(path);
        let reader = unsafe { MFCreateSourceReaderFromURL(PCWSTR(wide.as_ptr()), &attributes) }
            .map_err(|error| media_feature_error("打开源媒体", error))?;

        let native = unsafe { reader.GetNativeMediaType(VIDEO_STREAM, 0) }
            .context("unsupported: 源媒体没有视频流")?;
        let (encoded_width, encoded_height) = unpack_ratio(
            unsafe { native.GetUINT64(&MF_MT_FRAME_SIZE) }.context("读取视频尺寸失败")?,
        );
        if encoded_width == 0 || encoded_height == 0 {
            bail!("unsupported: 源媒体没有有效的视频尺寸");
        }
        let codec = unsafe { native.GetGUID(&MF_MT_SUBTYPE) }
            .map(|subtype| subtype_fourcc(&subtype))
            .unwrap_or_else(|_| "video".to_string());
        let rotation = unsafe { native.GetUINT32(&MF_MT_VIDEO_ROTATION) }
            .unwrap_or(0)
            .rem_euclid(360) as u16;
        let track_frame_duration = unsafe { native.GetUINT64(&MF_MT_FRAME_RATE) }
            .ok()
            .map(unpack_ratio)
            .filter(|(numerator, denominator)| *numerator > 0 && *denominator > 0)
            .map(|(numerator, denominator)| f64::from(denominator) / f64::from(numerator));

        // 只解视频轨：音频轨一起解只是白花时间。
        unsafe {
            reader.SetStreamSelection(ALL_STREAMS, false)?;
            reader.SetStreamSelection(VIDEO_STREAM, true)?;
        }
        let nv12 = unsafe {
            let media_type = MFCreateMediaType()?;
            media_type.SetGUID(&MF_MT_MAJOR_TYPE, &MFMediaType_Video)?;
            media_type.SetGUID(&MF_MT_SUBTYPE, &MFVideoFormat_NV12)?;
            media_type
        };
        unsafe { reader.SetCurrentMediaType(VIDEO_STREAM, None, &nv12) }.map_err(|error| {
            anyhow!("unsupported: Media Foundation 无法把该视频解成 NV12（{error}）")
        })?;
        let layout = unsafe { current_layout(&reader, (encoded_width, encoded_height))? };
        // MF 把媒体时标换成 hns 时向下取整，偏移也向下取整：首帧落在 0 而不是 -1 hns。
        let edit_offset_hns = media_probe::video_edit_start(path)
            .map(|start| {
                (u128::from(start.media_time) * 10_000_000 / u128::from(start.timescale)) as i64
            })
            .unwrap_or(0);
        Ok(Self {
            reader,
            hardware,
            device: None,
            hardware_fallback: None,
            codec,
            encoded_width,
            encoded_height,
            rotation,
            track_frame_duration,
            edit_offset_hns,
            layout,
        })
    }

    /// 定位到不晚于呈现时刻 `target_hns` 的关键帧；`target_hns ≤ 0` 时不动（从头读）。
    unsafe fn seek(&self, target_hns: i64, seconds: f64) -> Result<()> {
        if target_hns <= 0 {
            return Ok(());
        }
        let position = PROPVARIANT::from(target_hns + self.edit_offset_hns);
        unsafe { self.reader.SetCurrentPosition(&GUID::zeroed(), &position) }
            .map_err(|error| anyhow!("Media Foundation 无法定位到 {seconds:.3}s（{error}）"))
    }

    /// 解码顺序上的下一个视频样本；`None` = 片源解完。流间隙、格式变更通知这类不带样本的读数在这里吃掉。
    unsafe fn next_sample(&mut self) -> Result<Option<ReadVideoSample>> {
        loop {
            let mut flags = 0_u32;
            let mut timestamp = 0_i64;
            let mut sample = None;
            unsafe {
                self.reader.ReadSample(
                    VIDEO_STREAM,
                    0,
                    None,
                    Some(&mut flags),
                    Some(&mut timestamp),
                    Some(&mut sample),
                )?;
            }
            if flags & MF_SOURCE_READERF_CURRENTMEDIATYPECHANGED.0 as u32 != 0 {
                self.layout = unsafe {
                    current_layout(&self.reader, (self.encoded_width, self.encoded_height))?
                };
            }
            if flags & MF_SOURCE_READERF_ENDOFSTREAM.0 as u32 != 0 {
                return Ok(None);
            }
            let Some(sample) = sample else {
                continue;
            };
            if self.device.is_none() {
                self.device = Some(unsafe { self.describe_decoder(&sample) });
            }
            let duration = unsafe { sample.GetSampleDuration() }
                .ok()
                .filter(|value| *value > 0);
            return Ok(Some(ReadVideoSample {
                timestamp: timestamp - self.edit_offset_hns,
                duration,
                sample,
            }));
        }
    }

    /// 按第一个样本判定解码实际走了哪条路：样本在显存里（`IMFDXGIBuffer`）就是显卡解码。
    unsafe fn describe_decoder(&self, sample: &IMFSample) -> crate::frames::DecoderDevice {
        let in_video_memory = unsafe { sample.GetBufferByIndex(0) }
            .ok()
            .is_some_and(|buffer| buffer.cast::<IMFDXGIBuffer>().is_ok());
        let fallback = self.hardware_fallback.clone().or_else(|| {
            (self.hardware.is_some() && !in_video_memory).then(|| {
                "decoder-in-system-memory: 解码器拿到了 D3D11 设备却交出内存里的帧".to_string()
            })
        });
        crate::frames::DecoderDevice {
            name: unsafe { video_decoder_name(&self.reader, &self.codec) },
            hardware: in_video_memory,
            fallback,
        }
    }

    /// 摆正后的输出尺寸。
    fn size(&self) -> (u32, u32) {
        if matches!(self.rotation, 90 | 270) {
            (self.encoded_height, self.encoded_width)
        } else {
            (self.encoded_width, self.encoded_height)
        }
    }

    /// NV12 样本 → 摆正后的 top-down RGBA8，写进 `out`（长度改成一帧），返回宽高。
    ///
    /// `IMF2DBuffer2::Lock2DSize` 是行距与缓冲长度的权威；拿不到 2D 缓冲才退回连续缓冲，按媒体类型的缺省行距读。
    unsafe fn sample_to_rgba(&self, sample: &IMFSample, out: &mut Vec<u8>) -> Result<(u32, u32)> {
        if let Some(hardware) = &self.hardware
            && let Some(size) = unsafe { self.read_back(hardware, sample, out)? }
        {
            return Ok(size);
        }
        let two_dimensional = unsafe { sample.GetBufferByIndex(0) }
            .ok()
            .and_then(|buffer| buffer.cast::<IMF2DBuffer2>().ok());
        if let Some(buffer) = two_dimensional {
            let mut scanline0: *mut u8 = std::ptr::null_mut();
            let mut pitch = 0_i32;
            let mut start: *mut u8 = std::ptr::null_mut();
            let mut length = 0_u32;
            unsafe {
                buffer.Lock2DSize(
                    MF2DBuffer_LockFlags_Read,
                    &mut scanline0,
                    &mut pitch,
                    &mut start,
                    &mut length,
                )?
            };
            // Lock2DSize 与 Unlock2D 之间不用 `?`：结果先落进 `outcome`，解锁无条件执行。
            let outcome = if scanline0.is_null() || start.is_null() || pitch <= 0 {
                Err(anyhow!("Media Foundation 返回了不完整的 NV12 视频帧"))
            } else {
                let skipped = (scanline0 as usize).wrapping_sub(start as usize);
                let bytes = unsafe {
                    std::slice::from_raw_parts(scanline0, (length as usize).saturating_sub(skipped))
                };
                self.convert(bytes, pitch as usize, out)
            };
            let unlocked = unsafe { buffer.Unlock2D() };
            let size = outcome?;
            unlocked?;
            return Ok(size);
        }
        let buffer = unsafe { sample.ConvertToContiguousBuffer()? };
        let mut pointer = std::ptr::null_mut();
        let mut current = 0_u32;
        unsafe { buffer.Lock(&mut pointer, None, Some(&mut current))? };
        let outcome = if pointer.is_null() {
            Err(anyhow!("Media Foundation 返回了不完整的 NV12 视频帧"))
        } else {
            let bytes = unsafe { std::slice::from_raw_parts(pointer, current as usize) };
            self.convert(bytes, self.layout.stride, out)
        };
        let unlocked = unsafe { buffer.Unlock() };
        let size = outcome?;
        unlocked?;
        Ok(size)
    }

    /// 显存里的 NV12 样本自己读回：拷进常驻的暂存纹理、`Map` 后直接换算。`Ok(None)` = 样本不在显存里或不是
    /// NV12（如 P010），调用方改走 `Lock2DSize`。
    ///
    /// 不用 Media Foundation 的 `Lock2DSize`：它在 DXGI 缓冲上每帧另建暂存再拷一遍，1080p 的顺序解码被压在约
    /// 100 fps（软件解码约 270 fps）。
    unsafe fn read_back(
        &self,
        hardware: &HardwareDecode,
        sample: &IMFSample,
        out: &mut Vec<u8>,
    ) -> Result<Option<(u32, u32)>> {
        let Ok(buffer) = (unsafe { sample.GetBufferByIndex(0) }) else {
            return Ok(None);
        };
        let Ok(dxgi) = buffer.cast::<IMFDXGIBuffer>() else {
            return Ok(None);
        };
        let mut texture: Option<ID3D11Texture2D> = None;
        unsafe {
            dxgi.GetResource(
                &ID3D11Texture2D::IID,
                (&mut texture as *mut Option<ID3D11Texture2D>).cast(),
            )?
        };
        let texture = texture.context("DXGI 缓冲没有纹理")?;
        let subresource = unsafe { dxgi.GetSubresourceIndex()? };
        let mut desc = D3D11_TEXTURE2D_DESC::default();
        unsafe { texture.GetDesc(&mut desc) };
        if desc.Format != DXGI_FORMAT_NV12 {
            return Ok(None);
        }
        let staging = unsafe { hardware.staging_for(&desc)? };
        let context = &hardware.context;
        unsafe {
            context.CopySubresourceRegion(&staging, 0, 0, 0, 0, &texture, subresource, None);
        }
        let mut mapped = D3D11_MAPPED_SUBRESOURCE::default();
        unsafe { context.Map(&staging, 0, D3D11_MAP_READ, 0, Some(&mut mapped))? };
        // Map 与 Unmap 之间不用 `?`：结果先落进 `outcome`，解锁无条件执行。
        let pitch = mapped.RowPitch as usize;
        let outcome = if mapped.pData.is_null() || pitch == 0 {
            Err(anyhow!("D3D11 暂存纹理映射出空指针"))
        } else {
            let length = pitch * desc.Height as usize * 3 / 2;
            let bytes = unsafe { std::slice::from_raw_parts(mapped.pData.cast::<u8>(), length) };
            self.convert(bytes, pitch, out)
        };
        unsafe { context.Unmap(&staging, 0) };
        outcome.map(Some)
    }

    /// 一块 NV12 缓冲（从第一行起）按当前布局换成 RGBA。
    fn convert(&self, bytes: &[u8], pitch: usize, out: &mut Vec<u8>) -> Result<(u32, u32)> {
        let layout = &self.layout;
        // 平面高度以缓冲长度为准（恰好是 `行距 × 行数 × 1.5` 时），否则用媒体类型报的编码高度。
        let rows_in_buffer = (bytes.len() * 2)
            .checked_div(pitch * 3)
            .filter(|rows| rows * pitch * 3 == bytes.len() * 2);
        let plane_rows = rows_in_buffer.unwrap_or(layout.plane_rows);
        let frame =
            Nv12::in_buffer(bytes, pitch, plane_rows, layout.visible).with_context(|| {
                format!(
                    "Media Foundation 返回的 NV12 缓冲装不下 {}x{} 的画面（行距 {pitch}、{} 字节）",
                    layout.visible.width,
                    layout.visible.height,
                    bytes.len()
                )
            })?;
        let (width, height) = nv12_to_rgba(&frame, &layout.convert, self.rotation, out);
        Ok((width as u32, height as u32))
    }
}

/// reader 当前输出类型的 NV12 布局与颜色。`display` 是源的显示尺寸：类型里没有孔径时用它。
unsafe fn current_layout(reader: &IMFSourceReader, display: (u32, u32)) -> Result<Nv12Layout> {
    let media_type = unsafe { reader.GetCurrentMediaType(VIDEO_STREAM)? };
    let (width, height) = unsafe { media_type.GetUINT64(&MF_MT_FRAME_SIZE) }
        .map(unpack_ratio)
        .unwrap_or(display);
    let stride = unsafe { media_type.GetUINT32(&MF_MT_DEFAULT_STRIDE) }
        .ok()
        .map(|value| (value as i32).unsigned_abs() as usize)
        .filter(|value| *value >= width as usize)
        .unwrap_or(width as usize);
    let visible = unsafe { display_aperture(&media_type) }.unwrap_or(Area {
        x: 0,
        y: 0,
        width: display.0.min(width) as usize,
        height: display.1.min(height) as usize,
    });
    let matrix = match unsafe { media_type.GetUINT32(&MF_MT_YUV_MATRIX) }.map(|value| value as i32)
    {
        Ok(value) if value == MFVideoTransferMatrix_BT709.0 => YuvMatrix::Bt709,
        Ok(value) if value == MFVideoTransferMatrix_BT601.0 => YuvMatrix::Bt601,
        Ok(value) if value == MFVideoTransferMatrix_SMPTE240M.0 => YuvMatrix::Smpte240m,
        Ok(value)
            if value == MFVideoTransferMatrix_BT2020_10.0
                || value == MFVideoTransferMatrix_BT2020_12.0 =>
        {
            YuvMatrix::Bt2020
        }
        _ => YuvMatrix::guess(visible.height as u32),
    };
    let full_range = unsafe { media_type.GetUINT32(&MF_MT_VIDEO_NOMINAL_RANGE) }
        .is_ok_and(|value| value as i32 == MFNominalRange_0_255.0);
    Ok(Nv12Layout {
        plane_rows: height as usize,
        stride,
        visible,
        convert: YuvToRgb::new(matrix, full_range),
    })
}

/// `MF_MT_MINIMUM_DISPLAY_APERTURE`：解码器按序列头的裁剪报的可见区域。
unsafe fn display_aperture(media_type: &IMFMediaType) -> Option<Area> {
    let mut area = MFVideoArea::default();
    let bytes = unsafe {
        std::slice::from_raw_parts_mut(
            (&mut area as *mut MFVideoArea).cast::<u8>(),
            std::mem::size_of::<MFVideoArea>(),
        )
    };
    unsafe { media_type.GetBlob(&MF_MT_MINIMUM_DISPLAY_APERTURE, bytes, None) }.ok()?;
    let x = usize::try_from(area.OffsetX.value).ok()?;
    let y = usize::try_from(area.OffsetY.value).ok()?;
    let width = usize::try_from(area.Area.cx)
        .ok()
        .filter(|value| *value > 0)?;
    let height = usize::try_from(area.Area.cy)
        .ok()
        .filter(|value| *value > 0)?;
    Some(Area {
        x,
        y,
        width,
        height,
    })
}

// ── 顺序帧流（WP6a）
//
// 与单帧抽取共用 [`VideoReader`]，区别只有两点：
//
// 1. **不缩放**：渲染管线要的是源尺寸原样。
// 2. **不在这里挑帧**：`FrameStream` 按时间戳做帧率重采样与起点对齐，本模块
//    只负责"按解码顺序交出下一帧 + 它的时间戳与时长"。唯一的例外是 seek 之后
//    那批**完全早于起点**的帧——MF 的 `SetCurrentPosition` 只保证落到不晚于
//    目标的关键帧，长 GOP 上能多出几十帧。它们注定会被丢掉，在这里按时间戳
//    跳过就省掉了同样多次 NV12 → RGBA 换算。

pub(crate) fn open_frame_source(
    path: &Path,
    from_seconds: f64,
    try_hardware: bool,
) -> Result<Box<dyn crate::frames::FrameSource>> {
    if !path.is_file() {
        bail!("媒体文件不存在：{}", path.display());
    }
    let runtime = Runtime::start()?;
    unsafe { open_inner(runtime, path, from_seconds, try_hardware) }
}

unsafe fn open_inner(
    runtime: Runtime,
    path: &Path,
    from_seconds: f64,
    try_hardware: bool,
) -> Result<Box<dyn crate::frames::FrameSource>> {
    let video = unsafe { VideoReader::open(path, try_hardware)? };
    let from_hns = (from_seconds * HNS_PER_SECOND) as i64;
    unsafe { video.seek(from_hns, from_seconds)? };
    Ok(Box::new(SourceReaderFrames {
        video,
        from_hns,
        finished: false,
        _runtime: runtime,
    }))
}

struct SourceReaderFrames {
    video: VideoReader,
    /// 流的起始呈现时刻（hns）。完全早于它的帧在换算像素之前就跳过。
    from_hns: i64,
    finished: bool,
    /// COM + Media Foundation 的生命周期跟着流走（`Drop` 里 `MFShutdown` +
    /// `CoUninitialize`）。
    ///
    /// **必须是最后一个字段**：Rust 按声明顺序析构字段，放在 `video` 前面
    /// 就会先 `MFShutdown` 再 Release 源读取器，等于在 MF 关停之后回调已经
    /// 卸载的解码器 MFT——实测 `bcut export` 收尾必崩 `0xC0000005`
    /// （`msmpeg2vdec.dll_unloaded`，调用方 `mfreadwrite.dll`），MP4 已经写
    /// 完整但退出码是访问违例。同理见 `encode_windows.rs` 的 `SinkWriter`。
    _runtime: Runtime,
}

impl crate::frames::FrameSource for SourceReaderFrames {
    fn size(&self) -> (u32, u32) {
        self.video.size()
    }

    fn decoder_device(&self) -> Option<crate::frames::DecoderDevice> {
        self.video.device.clone()
    }

    fn next_decoded(&mut self) -> Result<Option<crate::frames::DecodedFrame>> {
        let mut data = Vec::new();
        Ok(self
            .next_decoded_into(&mut data)?
            .map(|decoded| crate::frames::DecodedFrame {
                pts_seconds: decoded.pts_seconds,
                duration_seconds: decoded.duration_seconds,
                frame: RgbaFrame {
                    width: decoded.width,
                    height: decoded.height,
                    data,
                },
            }))
    }

    /// 像素直接换算进调用方的缓冲：成片导出逐帧轮换同一批缓冲，不逐帧分配、清零一整帧。
    fn next_decoded_into(
        &mut self,
        data: &mut Vec<u8>,
    ) -> Result<Option<crate::frames::DecodedInto>> {
        if self.finished {
            return Ok(None);
        }
        loop {
            let Some(decoded) = (unsafe { self.video.next_sample()? }) else {
                self.finished = true;
                return Ok(None);
            };
            // seek 落点到起点之间那批注定被丢掉的帧：整帧**完全早于**起点才跳，
            // 覆盖起点的那一帧（ts ≤ from < ts + dur）必须留下。
            if let Some(duration) = decoded.duration
                && decoded.timestamp + duration <= self.from_hns
            {
                continue;
            }
            let (width, height) = unsafe { self.video.sample_to_rgba(&decoded.sample, data)? };
            return Ok(Some(crate::frames::DecodedInto {
                pts_seconds: decoded.timestamp as f64 / HNS_PER_SECOND,
                duration_seconds: decoded
                    .duration
                    .map(|value| value as f64 / HNS_PER_SECOND)
                    .or(self.video.track_frame_duration),
                width,
                height,
            }));
        }
    }
}

#[cfg(test)]
mod tests {
    /// Media Foundation 的关停必须晚于它发出的每一个 COM 接口：`Runtime` 的
    /// `Drop` 会 `MFShutdown` + `CoUninitialize`，而 Rust 按**声明顺序**析构
    /// 字段，所以持有它的结构体必须把它写在最后一个字段。
    ///
    /// 曾经 `SourceReaderFrames` 把 `_runtime` 放在 `reader` 前面：MF 先关停，
    /// 随后才 Release 源读取器，`mfreadwrite.dll` 回调到已卸载的解码器 MFT，
    /// `bcut export` 每次收尾都以 `0xC0000005` 退出（MP4 其实已经写完整，只是
    /// 退出码是访问违例，调用方一律当成导出失败）。字段顺序没有类型能表达，
    /// 只能扫源码钉住。
    #[test]
    fn every_media_foundation_runtime_is_declared_as_the_last_droppable_field() {
        for file in ["windows.rs", "encode_windows.rs", "playback_windows.rs"] {
            let source = std::fs::read_to_string(
                std::path::Path::new(env!("CARGO_MANIFEST_DIR"))
                    .join("src")
                    .join(file),
            )
            .expect("读取平台源码");
            for (index, line) in source.lines().enumerate() {
                if line.trim() != "_runtime: Runtime," {
                    continue;
                }
                // 后面只允许再出现没有析构行为的字段（当前只有 PhantomData），
                // 然后就必须是结构体的收尾 `}`。
                let rest = source
                    .lines()
                    .skip(index + 1)
                    .map(str::trim)
                    .filter(|line| !line.is_empty() && !line.starts_with("///"));
                for following in rest {
                    if following == "}" {
                        break;
                    }
                    assert!(
                        following.contains("PhantomData"),
                        "{file}:{} 的 Runtime 后面还有会析构的字段 `{following}`",
                        index + 1
                    );
                }
            }
        }
    }

    /// 显卡解码（W5）与软件解码交出的 RGBA 逐字节相同：H.264 解码按标准逐位确定，NV12 之后是同一个换算函数。
    /// 本机没有能用的显卡解码时（建不了设备、协商不成）只核对回落记了原因、像素照样对得上。
    #[test]
    fn hardware_decoding_matches_software_decoding_byte_for_byte() {
        let dir = std::env::temp_dir().join(format!("bcut-hw-decode-{}", std::process::id()));
        std::fs::create_dir_all(&dir).expect("建临时目录");
        let media = dir.join("hw.mp4");
        // 带 B 帧（缺省两级）、640×360 不是 16 的倍数的高度（360 → 368 的对齐平面）、标注 BT.709。
        let made = std::process::Command::new("ffmpeg")
            .args(["-y", "-loglevel", "error", "-f", "lavfi", "-i"])
            .arg("testsrc2=s=640x360:r=30:d=2")
            .args([
                "-pix_fmt",
                "yuv420p",
                "-c:v",
                "libx264",
                "-colorspace",
                "bt709",
            ])
            .arg(&media)
            .status()
            .is_ok_and(|status| status.success());
        if !made {
            return;
        }
        let mut software = super::open_frame_source(&media, 0.5, false).expect("软件解码");
        let mut hardware = super::open_frame_source(&media, 0.5, true).expect("显卡解码或回落");
        let (mut a, mut b) = (Vec::new(), Vec::new());
        let mut frames = 0;
        loop {
            let x = software.next_decoded_into(&mut a).expect("软件解码");
            let y = hardware.next_decoded_into(&mut b).expect("显卡解码");
            let (x, y) = match (x, y) {
                (Some(x), Some(y)) => (x, y),
                (None, None) => break,
                _ => panic!("第 {frames} 帧起两边帧数不同"),
            };
            assert_eq!(
                (x.pts_seconds, x.width, x.height),
                (y.pts_seconds, y.width, y.height)
            );
            assert!(a == b, "第 {frames} 帧两条路径的像素不同");
            frames += 1;
        }
        assert_eq!(frames, 45, "从 0.5 秒起 2 秒的片子剩 45 帧");
        let software = software.decoder_device().expect("解出帧后报解码器");
        assert!(!software.hardware && software.fallback.is_none());
        let hardware = hardware.decoder_device().expect("解出帧后报解码器");
        assert!(
            hardware.hardware || hardware.fallback.is_some(),
            "没走显卡就得说原因：{hardware:?}"
        );
        let _ = std::fs::remove_dir_all(&dir);
    }
}
