//! 离屏导出适配器。
//!
//! 实时 [`crate::Compositor::render`] 的契约仍是直接写宿主 target、零回读；只有
//! 文件导出在不能直接包装平台编码 surface 时，必须把 GPU 结果交给 CPU 可见的原生
//! 编码器，因此把 `COPY_SRC` / `MAP_READ` 明确隔离在这个模块。目标纹理、回读缓冲与
//! 行展开内存跨帧复用；支持互操作的 host 可改用
//! [`OfflineCompositor::render_over_texture_at`]。

use anyhow::{Context, Result, anyhow, bail};
use render_raster::GpuExecutor;

use crate::{Compositor, RenderStats, RenderTarget, RenderTextureTarget, SceneFrame};

/// 持久离屏 target + readback buffer。面向 MP4/PNG 导出，不得用于实时预览。
pub struct OfflineCompositor {
    compositor: Compositor,
    target: wgpu::Texture,
    view: wgpu::TextureView,
    readback: wgpu::Buffer,
    rgba: Vec<u8>,
    width: u32,
    height: u32,
    padded_bytes_per_row: u32,
    backend: String,
    adapter_name: String,
    /// 上一次 `render_over_bgra` 的分段耗时（纳秒）。只给导出侧的
    /// `BCUT_EXPORT_PROFILE` 读，常规路径不看。
    pub last_timings: OfflineTimings,
}

/// `render_over_bgra` 一帧内部的四段耗时（纳秒）。
#[derive(Debug, Clone, Copy, Default)]
pub struct OfflineTimings {
    /// 底图 BGRA→RGBA swizzle ＋ `write_texture` 上传。
    pub upload_ns: u64,
    /// scene 编码与提交。
    pub render_ns: u64,
    /// `copy_texture_to_buffer` ＋ map ＋ 等 GPU ＋ 从 mapped range 拷出。
    pub readback_ns: u64,
    /// 回读三分：提交 / 等 GPU 映射 / 从 mapped range 拷出。
    pub readback_submit_ns: u64,
    pub readback_wait_ns: u64,
    pub readback_copy_ns: u64,
    /// 回读结果 RGBA→BGRA swizzle 写回调用方缓冲。
    pub writeback_ns: u64,
}

impl OfflineCompositor {
    /// 在高性能 native adapter 上创建离屏合成器。Metal 优先，其次 Vulkan / DX12。
    pub fn new(width: u32, height: u32) -> Result<Self> {
        if width == 0 || height == 0 {
            bail!("compositor-offline-target-invalid: {width}x{height}");
        }
        let executor = GpuExecutor::new()?;
        let device = executor.device().clone();
        let max_dimension = device.limits().max_texture_dimension_2d;
        if width > max_dimension || height > max_dimension {
            bail!("compositor-offline-size-limit: {width}x{height} > {max_dimension}");
        }
        let queue = executor.queue().clone();
        let backend = executor.backend().to_owned();
        let adapter_name = executor.adapter_name().to_owned();
        drop(executor);

        let target = device.create_texture(&wgpu::TextureDescriptor {
            label: Some("bcut.compositor.offline.target"),
            size: wgpu::Extent3d {
                width,
                height,
                depth_or_array_layers: 1,
            },
            mip_level_count: 1,
            sample_count: 1,
            dimension: wgpu::TextureDimension::D2,
            format: wgpu::TextureFormat::Rgba8Unorm,
            usage: wgpu::TextureUsages::RENDER_ATTACHMENT | wgpu::TextureUsages::COPY_SRC | wgpu::TextureUsages::COPY_DST,
            view_formats: &[],
        });
        let view = target.create_view(&wgpu::TextureViewDescriptor::default());
        let row_bytes = width.checked_mul(4).context("compositor-offline-target-too-wide")?;
        let alignment = wgpu::COPY_BYTES_PER_ROW_ALIGNMENT;
        let padded_bytes_per_row = row_bytes.div_ceil(alignment) * alignment;
        let readback_size = u64::from(padded_bytes_per_row)
            .checked_mul(u64::from(height))
            .context("compositor-offline-target-too-large")?;
        let readback = device.create_buffer(&wgpu::BufferDescriptor {
            label: Some("bcut.compositor.offline.readback"),
            size: readback_size,
            usage: wgpu::BufferUsages::COPY_DST | wgpu::BufferUsages::MAP_READ,
            mapped_at_creation: false,
        });
        let rgba_len = usize::try_from(u64::from(row_bytes) * u64::from(height)).context("compositor-offline-target-too-large")?;
        let compositor = Compositor::from_device(device, queue, backend.clone(), adapter_name.clone());
        Ok(Self {
            compositor,
            target,
            view,
            readback,
            rgba: vec![0; rgba_len],
            width,
            height,
            padded_bytes_per_row,
            backend,
            adapter_name,
            last_timings: OfflineTimings::default(),
        })
    }

    pub fn backend(&self) -> &str {
        &self.backend
    }

    pub fn adapter_name(&self) -> &str {
        &self.adapter_name
    }

    /// 平台导出宿主用同一个 device 包装 CoreVideo / DXGI 编码 surface。外部
    /// target 若来自别的 device，wgpu 会拒绝或触发未定义行为，因此不提供替换入口。
    pub fn device(&self) -> &wgpu::Device {
        self.compositor.device()
    }

    /// 平台导出宿主在同一 device 上包装外部编码 surface 后，用这条 queue 上传
    /// 已完成旋转/缩放的主画面。上传与随后的 compositor submit 保持严格有序，
    /// 不需要另建跨 API fence。
    pub fn queue(&self) -> &wgpu::Queue {
        self.compositor.queue()
    }

    /// 直接把不需要 target sampling 的 scene source-over 到宿主已经填好的编码
    /// surface。与 [`Self::render_rgba`] 不同，这里不使用内部 target、staging buffer
    /// 或回读；Difference / Exclusion 必须改用 [`Self::render_over_texture_at`]。
    pub fn render_over_at(&mut self, scene: &SceneFrame, target: RenderTarget<'_>, presentation_time: f64) -> Result<RenderStats> {
        self.compositor.render_over_at(scene, target, presentation_time)
    }

    /// 直接写宿主的可采样编码 surface；这是 Difference / Exclusion 读取真实视频
    /// backdrop 的原生零回读入口。
    pub fn render_over_texture_at(
        &mut self,
        scene: &SceneFrame,
        target: RenderTextureTarget<'_>,
        presentation_time: f64,
    ) -> Result<RenderStats> {
        self.compositor.render_over_texture_at(scene, target, presentation_time)
    }

    /// 编码器取得平台 surface 前必须等本帧提交完成。等待发生在导出边界，不改变
    /// 实时 compositor 的异步提交契约。
    pub fn wait_for_gpu(&self) -> Result<()> {
        self.compositor
            .device()
            .poll(wgpu::PollType::wait_indefinitely())
            .map_err(|error| anyhow!("等待编码 surface GPU 合成失败：{error:?}"))?;
        Ok(())
    }

    /// 注册这一帧 scene 引用的 host 解码纹理。像素必须是 premultiplied RGBA8；
    /// 尺寸与随后提交的 `TextureNode` 不同会由实时 compositor 再次拒绝。
    pub fn upload_external_rgba(&mut self, key: &str, width: u32, height: u32, rgba: &[u8]) -> Result<()> {
        self.compositor.upload_external_rgba(key, width, height, rgba)
    }

    /// 以导出时间重采样 scene motion，回读 premultiplied RGBA8。
    pub fn render_rgba(&mut self, scene: &SceneFrame, presentation_time: f64) -> Result<(&[u8], RenderStats)> {
        let stats = self.compositor.render_texture_at(
            scene,
            RenderTextureTarget {
                texture: &self.target,
                view: &self.view,
                width: self.width,
                height: self.height,
                format: wgpu::TextureFormat::Rgba8Unorm,
            },
            presentation_time,
        )?;

        self.readback_target()?;
        Ok((&self.rgba, stats))
    }

    /// 与 [`Self::render_over_bgra`] 同一条通路，但底图**已知是一张不透明纯黑**
    /// （主画面层 `place.opacity == 0` ＋ 黑底，见
    /// `OverlayRenderPlan::base_frame_is_uniform_black`）。
    ///
    /// 于是那张黑底不必再由 CPU 铺出来、swizzle 成 RGBA、再上传一次
    /// width×height×4：直接用一次 clear 让 GPU 自己把目标刷掉。720p 实测省下
    /// 0.9 ms/帧（铺黑 0.18 ＋ swizzle 与上传 0.70）。
    ///
    /// 输出与旧路**逐像素相同**：premultiplied source-over 到 (0,0,0,α) 的结果
    /// 与 α 无关，而 alpha 通道由下面的写回统一钉成 255——正是旧路
    /// `apply_main_transform_bgra` 填黑时写的值。
    pub fn render_over_black(
        &mut self,
        scene: &SceneFrame,
        presentation_time: f64,
        pixels: &mut [u8],
        stride: usize,
    ) -> Result<RenderStats> {
        let row_bytes = self.width as usize * 4;
        if stride < row_bytes || pixels.len() < stride.saturating_mul(self.height as usize) {
            bail!("compositor-offline-bgra-target-invalid");
        }
        self.last_timings.upload_ns = 0;

        let mark = std::time::Instant::now();
        let stats = self.compositor.render_texture_at(
            scene,
            RenderTextureTarget {
                texture: &self.target,
                view: &self.view,
                width: self.width,
                height: self.height,
                format: wgpu::TextureFormat::Rgba8Unorm,
            },
            presentation_time,
        )?;
        self.last_timings.render_ns = mark.elapsed().as_nanos() as u64;

        let mark = std::time::Instant::now();
        self.readback_target()?;
        self.last_timings.readback_ns = mark.elapsed().as_nanos() as u64;

        let mark = std::time::Instant::now();
        for row in 0..self.height as usize {
            let input = &self.rgba[row * row_bytes..(row + 1) * row_bytes];
            let output = &mut pixels[row * stride..row * stride + row_bytes];
            for (rgba, bgra) in input.chunks_exact(4).zip(output.chunks_exact_mut(4)) {
                bgra.copy_from_slice(&[rgba[2], rgba[1], rgba[0], 255]);
            }
        }
        self.last_timings.writeback_ns = mark.elapsed().as_nanos() as u64;
        Ok(stats)
    }

    /// 没有平台纹理互操作时，把 CPU 可见的 BGRA 视频帧上传到持久 target，在 GPU
    /// 上执行完整 scene composite，再回读同一缓冲。回读只存在于离线导出边界。
    pub fn render_over_bgra(
        &mut self,
        scene: &SceneFrame,
        presentation_time: f64,
        pixels: &mut [u8],
        stride: usize,
    ) -> Result<RenderStats> {
        let row_bytes = self.width as usize * 4;
        if stride < row_bytes || pixels.len() < stride.saturating_mul(self.height as usize) {
            bail!("compositor-offline-bgra-target-invalid");
        }
        let mark = std::time::Instant::now();
        for row in 0..self.height as usize {
            let input = &pixels[row * stride..row * stride + row_bytes];
            let output = &mut self.rgba[row * row_bytes..(row + 1) * row_bytes];
            for (bgra, rgba) in input.chunks_exact(4).zip(output.chunks_exact_mut(4)) {
                rgba.copy_from_slice(&[bgra[2], bgra[1], bgra[0], bgra[3]]);
            }
        }
        self.compositor.queue().write_texture(
            wgpu::TexelCopyTextureInfo {
                texture: &self.target,
                mip_level: 0,
                origin: wgpu::Origin3d::ZERO,
                aspect: wgpu::TextureAspect::All,
            },
            &self.rgba,
            wgpu::TexelCopyBufferLayout {
                offset: 0,
                bytes_per_row: Some(self.width * 4),
                rows_per_image: Some(self.height),
            },
            wgpu::Extent3d {
                width: self.width,
                height: self.height,
                depth_or_array_layers: 1,
            },
        );
        self.last_timings.upload_ns = mark.elapsed().as_nanos() as u64;

        let mark = std::time::Instant::now();
        let stats = self.compositor.render_over_texture_at(
            scene,
            RenderTextureTarget {
                texture: &self.target,
                view: &self.view,
                width: self.width,
                height: self.height,
                format: wgpu::TextureFormat::Rgba8Unorm,
            },
            presentation_time,
        )?;
        self.last_timings.render_ns = mark.elapsed().as_nanos() as u64;

        let mark = std::time::Instant::now();
        self.readback_target()?;
        self.last_timings.readback_ns = mark.elapsed().as_nanos() as u64;

        let mark = std::time::Instant::now();
        for row in 0..self.height as usize {
            let input = &self.rgba[row * row_bytes..(row + 1) * row_bytes];
            let output = &mut pixels[row * stride..row * stride + row_bytes];
            for (rgba, bgra) in input.chunks_exact(4).zip(output.chunks_exact_mut(4)) {
                bgra.copy_from_slice(&[rgba[2], rgba[1], rgba[0], rgba[3]]);
            }
        }
        self.last_timings.writeback_ns = mark.elapsed().as_nanos() as u64;
        Ok(stats)
    }

    fn readback_target(&mut self) -> Result<()> {
        let mark = std::time::Instant::now();
        let device = self.compositor.device();
        let queue = self.compositor.queue();
        let mut encoder = device.create_command_encoder(&wgpu::CommandEncoderDescriptor {
            label: Some("bcut.compositor.offline.copy"),
        });
        encoder.copy_texture_to_buffer(
            wgpu::TexelCopyTextureInfo {
                texture: &self.target,
                mip_level: 0,
                origin: wgpu::Origin3d::ZERO,
                aspect: wgpu::TextureAspect::All,
            },
            wgpu::TexelCopyBufferInfo {
                buffer: &self.readback,
                layout: wgpu::TexelCopyBufferLayout {
                    offset: 0,
                    bytes_per_row: Some(self.padded_bytes_per_row),
                    rows_per_image: Some(self.height),
                },
            },
            wgpu::Extent3d {
                width: self.width,
                height: self.height,
                depth_or_array_layers: 1,
            },
        );
        queue.submit(Some(encoder.finish()));
        let submit_ns = mark.elapsed().as_nanos() as u64;

        let mark = std::time::Instant::now();
        let slice = self.readback.slice(..);
        let (sender, receiver) = std::sync::mpsc::channel();
        slice.map_async(wgpu::MapMode::Read, move |result| {
            let _ = sender.send(result);
        });
        device
            .poll(wgpu::PollType::wait_indefinitely())
            .map_err(|error| anyhow!("等待离屏 GPU 回读失败：{error:?}"))?;
        receiver
            .recv()
            .context("离屏 GPU 回读通道断开")?
            .map_err(|error| anyhow!("映射离屏 GPU 缓冲失败：{error}"))?;
        let wait_ns = mark.elapsed().as_nanos() as u64;
        let mark = std::time::Instant::now();
        {
            let mapped = slice
                .get_mapped_range()
                .map_err(|error| anyhow!("读取离屏 GPU 缓冲失败：{error}"))?;
            let row_bytes = self.width as usize * 4;
            let padded = self.padded_bytes_per_row as usize;
            for row in 0..self.height as usize {
                self.rgba[row * row_bytes..(row + 1) * row_bytes].copy_from_slice(&mapped[row * padded..row * padded + row_bytes]);
            }
        }
        self.readback.unmap();
        self.last_timings.readback_submit_ns = submit_ns;
        self.last_timings.readback_wait_ns = wait_ns;
        self.last_timings.readback_copy_ns = mark.elapsed().as_nanos() as u64;
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use render_raster::drawop::{DrawOp, FrameBuilder};
    use std::sync::Arc;

    #[test]
    fn rejects_zero_sized_targets_before_gpu_initialization() {
        let error = OfflineCompositor::new(0, 8).err().unwrap().to_string();
        assert!(error.contains("target-invalid"), "{error}");
    }

    #[test]
    fn empty_scene_readback_is_transparent() {
        let Ok(mut compositor) = OfflineCompositor::new(8, 4) else {
            eprintln!("skip: native GPU adapter unavailable");
            return;
        };
        let scene = SceneFrame::default();
        let (rgba, stats) = compositor.render_rgba(&scene, 0.0).unwrap();
        assert_eq!(rgba.len(), 8 * 4 * 4);
        assert!(rgba.iter().all(|byte| *byte == 0));
        assert_eq!(stats.submissions, 1, "scene render 仍是单次 submit");
    }

    #[test]
    fn uploaded_host_rgba_is_sampled_by_the_offline_scene() {
        let Ok(mut compositor) = OfflineCompositor::new(8, 4) else {
            eprintln!("skip: native GPU adapter unavailable");
            return;
        };
        let red = [255, 0, 0, 255].repeat(4);
        compositor.upload_external_rgba("host-frame", 2, 2, &red).unwrap();
        let scene = SceneFrame {
            nodes: vec![crate::SceneNode::Texture(std::sync::Arc::new(timeline_render::TextureNode {
                texture: "host-frame".to_owned(),
                media_ms: -1,
                source_width: 2,
                source_height: 2,
                rect: [0.0, 0.0, 8.0, 4.0],
                transform: [1.0, 0.0, 0.0, 1.0, 0.0, 0.0],
                opacity: 1.0,
                radius: 0.0,
                mask_shape: timeline_render::TextureMaskShape::RoundedRect,
                mask_feather: 0.0,
                source_effects: std::sync::Arc::from([]),
                reveal: 1.0,
                iris: 1.0,
                fit: timeline_render::TextureFit::Cover,
                background: timeline_render::TextureBackground::Transparent,
            }))],
            ..SceneFrame::default()
        };
        let (rgba, _) = compositor.render_rgba(&scene, 0.0).unwrap();
        assert!(
            rgba.chunks_exact(4).all(|pixel| pixel == [255, 0, 0, 255]),
            "上传的 host RGBA 应填满离屏 target"
        );
    }

    #[test]
    fn bgra_fallback_composites_target_sampling_modes_on_the_gpu() {
        let Ok(mut compositor) = OfflineCompositor::new(8, 4) else {
            eprintln!("skip: native GPU adapter unavailable");
            return;
        };
        let mut frame = FrameBuilder::default();
        frame.push(DrawOp::FillRect {
            x: 0.0,
            y: 0.0,
            w: 8.0,
            h: 4.0,
            radius: 0.0,
            color: [0.8, 0.2, 0.6, 0.5],
            tf: [1.0, 0.0, 0.0, 1.0, 0.0, 0.0],
        });
        let scene = SceneFrame {
            nodes: vec![crate::SceneNode::BlurredGroup(Arc::new(crate::BlurredGroup {
                nodes: vec![crate::SceneNode::Vectors(Arc::new(frame.finish()))],
                radius: 0.0,
                motion: None,
                reveal: None,
                composite: crate::SceneCompositeMode::Difference,
            }))],
            ..SceneFrame::default()
        };
        let backdrop = [31, 97, 173, 255];
        let mut pixels = backdrop.repeat(8 * 4);
        let stats = compositor.render_over_bgra(&scene, 0.0, &mut pixels, 8 * 4).unwrap();
        assert_eq!(stats.submissions, 1);
        let mut expected_pixel = backdrop;
        subtitle_render::composite_caption_pixel_bgra(
            &mut expected_pixel,
            &[102, 26, 77, 128],
            subtitle_render::CaptionCompositeMode::Difference,
        );
        for pixel in pixels.chunks_exact(4) {
            for (actual, expected) in pixel.iter().zip(expected_pixel) {
                assert!(actual.abs_diff(expected) <= 2, "{pixel:?} != {expected_pixel:?}");
            }
        }
    }
}
