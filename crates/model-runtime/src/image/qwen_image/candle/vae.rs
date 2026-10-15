//! Qwen-Image-2.1 VAE 的单帧解码器（移植自 v2 `bcut-image-local::candle::vae`）。mlx-community 的包把卷积核存成 MLX 的
//! `[out, kh, kw, in]`、gamma 存成 `[C]`，candle 要 NCHW 与 `[out, in, kh, kw]`；mlx-serve 的包（Turbo）保留 PyTorch 布局
//! （`[out, in, kh, kw]`、gamma `[C,1,1]`），按 `post_quant_conv` 的形状整体判定（与 MLX 路径同一做法）。解码器按需读每个
//! 卷积，高分辨率的尾段按行条带处理，条带上下各留 12 行重叠（与 Metal 实现相同）。
//!
//! CUDA 上卷积直接在 NHWC 上算（[`crate::backend::candle::cuda_kernels::im2col_nhwc_bf16`] 加一次矩阵乘），不转 NCHW；读过的
//! 卷积核留在显存里给后面的条带用，条带的行数按空闲的显存放大（1024² 一两个条带，重叠重算的那部分随之变少）。

use anyhow::{Result, bail};
use candle_core::{DType, Device, Tensor};
use serde::Deserialize;
use std::cell::RefCell;
use std::collections::HashMap;
use std::path::Path;

use super::weights::{Prefetch, ShardedWeights};
use crate::backend::candle::layers::scaled_dot_product_attention;
use crate::backend::candle::{cuda_memory, is_out_of_memory};
use crate::image::Cancelled;

const DECODER_BASE: usize = 144;
const MULT: [usize; 5] = [1, 2, 4, 8, 8];
const TEMPORAL_DOWN: [bool; 4] = [false, true, true, true];
const TAIL_FROM: usize = 2;
const HALO: usize = 12;
const BAND_ELEMS: usize = 64 << 20;
/// CUDA 上一次 im2col 最多展开多少元素（bf16 512 MB）：大卷积按输出行分块，尾段的峰值不随条带变大而多出九倍。
#[cfg(feature = "cuda")]
const IM2COL_ELEMS: usize = 256 << 20;
pub const Z_DIM: usize = 64;

fn attend(q: &Tensor, k: &Tensor, v: &Tensor, channels: usize) -> Result<Tensor> {
    scaled_dot_product_attention(
        &q.contiguous()?,
        &k.contiguous()?,
        &v.contiguous()?,
        (channels as f64).sqrt().recip(),
        None,
    )
}

/// 卷积核统一成 MLX 的 `[out, kh, kw, in]`：PyTorch 布局 `[out, in, kh, kw]` 要转置，MLX 布局原样用。
fn nhwc_kernel(w: Tensor, torch_layout: bool) -> Result<Tensor> {
    if torch_layout {
        Ok(w.permute((0, 2, 3, 1))?.contiguous()?)
    } else {
        Ok(w)
    }
}

/// `w` 是 `[out, kh, kw, in]`（[`nhwc_kernel`]）。1×1 的卷积就是一次矩阵乘；CUDA 上的 bf16 用 NHWC 的 im2col 核加一次
/// 矩阵乘，输出直接是 NHWC；别的转成 NCHW 交给 candle 的 conv2d。
fn conv_nhwc(x: &Tensor, w: &Tensor, pad: usize, stride: usize) -> Result<Tensor> {
    let (batch, height, width, input) = x.dims4()?;
    let (output, kernel_h, kernel_w, kernel_input) = w.dims4()?;
    if input != kernel_input {
        bail!("VAE 卷积输入通道数不匹配");
    }
    if (kernel_h, kernel_w, pad, stride) == (1, 1, 0, 1) {
        let y = x
            .reshape((batch * height * width, input))?
            .matmul(&w.reshape((output, input))?.t()?)?;
        return Ok(y.reshape((batch, height, width, output))?);
    }
    #[cfg(feature = "cuda")]
    if x.device().is_cuda() && x.dtype() == DType::BF16 && batch == 1 && input.is_multiple_of(8) {
        return conv_nhwc_cuda(x, w, pad, stride);
    }
    let nchw = x.permute((0, 3, 1, 2))?.contiguous()?;
    let kernel = w.permute((0, 3, 1, 2))?.contiguous()?;
    Ok(nchw.conv2d(&kernel, pad, stride, 1, 1)?.permute((0, 2, 3, 1))?.contiguous()?)
}

/// CUDA 上的 NHWC 卷积：按输出行分块，每块 im2col（至多 [`IM2COL_ELEMS`] 个元素）加一次矩阵乘，最后按行拼起来。
#[cfg(feature = "cuda")]
fn conv_nhwc_cuda(x: &Tensor, w: &Tensor, pad: usize, stride: usize) -> Result<Tensor> {
    use crate::backend::candle::cuda_kernels::im2col_nhwc_bf16;
    let (_, height, width, input) = x.dims4()?;
    let (output, kernel_h, kernel_w, _) = w.dims4()?;
    if height + 2 * pad < kernel_h || width + 2 * pad < kernel_w {
        bail!("VAE 卷积核比输入大");
    }
    let (out_h, out_w) = (
        (height + 2 * pad - kernel_h) / stride + 1,
        (width + 2 * pad - kernel_w) / stride + 1,
    );
    let kernel = w.reshape((output, kernel_h * kernel_w * input))?;
    let rows = (IM2COL_ELEMS / (out_w * kernel_h * kernel_w * input).max(1)).clamp(1, out_h);
    let mut parts = Vec::with_capacity(out_h.div_ceil(rows));
    for start in (0..out_h).step_by(rows) {
        let end = (start + rows).min(out_h);
        // 这一块输出行读到的输入行；越出上下边界的那几行由核按 0 补。
        let first = (start * stride).saturating_sub(pad);
        let last = ((end - 1) * stride + kernel_h).saturating_sub(pad).min(height);
        let band = x.narrow(1, first, last - first)?;
        let columns = im2col_nhwc_bf16(
            &band,
            (kernel_h, kernel_w),
            stride,
            (pad + first - start * stride, pad),
            (end - start, out_w),
        )?;
        parts.push(columns.matmul(&kernel.t()?)?.reshape((1, end - start, out_w, output))?);
    }
    if parts.len() == 1 {
        return Ok(parts.remove(0));
    }
    Ok(Tensor::cat(&parts.iter().collect::<Vec<_>>(), 1)?)
}

/// 尾段一个条带最多多少元素（尾段最大的张量：全分辨率、288 通道），`width` 是计算精度的字节数。CPU（`free` 为 `None`）上固定
/// [`BAND_ELEMS`]；CUDA 上按空闲的显存放大：im2col 分块后尾段的峰值约是它的 10 倍（块的输入与输出、拼接、偏置、残差与 DupUp
/// 的捷径），另留一块 im2col、还没读的卷积核与 1.5 GiB 余量（cuBLAS 的工作区、碎片与别的进程），至少 [`BAND_ELEMS`]。
fn band_elems(free: Option<usize>, width: usize) -> usize {
    let reserve = (3 << 29) + (256 << 20) * width + (512 << 20);
    free.map_or(BAND_ELEMS, |free| (free.saturating_sub(reserve) / (10 * width)).max(BAND_ELEMS))
}

#[derive(Deserialize)]
struct VaeConfig {
    #[serde(rename = "_class_name")]
    class_name: String,
    decoder_base_dim: usize,
    dim_mult: Vec<usize>,
    out_channels: usize,
    scale_factor_spatial: usize,
    z_dim: usize,
    /// mlx-community 的包写 `true`；mlx-serve 的包不写（PyTorch 布局）。
    #[serde(default)]
    mlx_format: Option<bool>,
    latents_mean: Vec<f32>,
    latents_std: Vec<f32>,
}

pub struct Decoder {
    weights: ShardedWeights,
    /// 卷积核与 gamma 是 PyTorch 布局（不用转置卷积核，gamma 要摊平）。
    torch_layout: bool,
    mean: Tensor,
    std: Tensor,
    device: Device,
    dtype: DType,
    /// CUDA 上读过的卷积核与偏置（尾段每个条带都要再用一遍；整个 VAE 的 bf16 权重不到 0.7 GB）。CPU 上不留，进程内存不变。
    kernels: RefCell<HashMap<String, (Tensor, Tensor)>>,
    /// 后台把解码器的权重先读进文件缓存（冷启动时见效）；解码器丢掉时停下。
    _prefetch: Prefetch,
}

impl Decoder {
    /// `files` 是 `vae/` 下按清单取出的 safetensors，`config` 是 `vae/config.json`。
    pub fn load(files: &[&Path], config: &Path, device: &Device, dtype: DType) -> Result<Self> {
        let config: VaeConfig = serde_json::from_str(&std::fs::read_to_string(config)?)?;
        if config.class_name != "AutoencoderKLQwenImage21"
            || config.decoder_base_dim != DECODER_BASE
            || config.dim_mult.as_slice() != MULT.as_slice()
            || config.out_channels != 4
            || config.scale_factor_spatial != 16
            || config.z_dim != Z_DIM
            || config.mlx_format == Some(false)
        {
            bail!("vae/config.json 与 Qwen-Image-2.1 MLX 解码器不符");
        }
        if config.latents_mean.len() != Z_DIM || config.latents_std.len() != Z_DIM {
            bail!("VAE latents_mean/std 长度必须为 {Z_DIM}");
        }
        let weights = ShardedWeights::open(files)?;
        let shape = weights.metadata("post_quant_conv.weight")?.0;
        let torch_layout = if shape.as_slice() == [Z_DIM, 1, 1, Z_DIM].as_slice() {
            false
        } else if shape.as_slice() == [Z_DIM, Z_DIM, 1, 1].as_slice() {
            true
        } else {
            bail!("post_quant_conv.weight 的形状认不出布局：{shape:?}");
        };
        if torch_layout && config.mlx_format == Some(true) {
            bail!("vae/config.json 声明 MLX 布局，权重却是 PyTorch 布局");
        }
        let mut keys = vec!["post_quant_conv.weight".to_owned(), "post_quant_conv.bias".to_owned()];
        keys.extend(weights.keys_with_prefix("decoder."));
        let prefetch = weights.prefetch(vec![keys], 0);
        Ok(Self {
            weights,
            torch_layout,
            mean: Tensor::from_vec(config.latents_mean, (1, 1, 1, Z_DIM), device)?,
            std: Tensor::from_vec(config.latents_std, (1, 1, 1, Z_DIM), device)?,
            device: device.clone(),
            dtype,
            kernels: RefCell::new(HashMap::new()),
            _prefetch: prefetch,
        })
    }

    /// 卷积核（`[out, kh, kw, in]`）与偏置，按计算精度。
    fn kernel(&self, p: &str) -> Result<(Tensor, Tensor)> {
        if let Some(found) = self.kernels.borrow().get(p) {
            return Ok(found.clone());
        }
        let w = self.weights.load(&format!("{p}.weight"), &self.device)?.to_dtype(self.dtype)?;
        let w = nhwc_kernel(w, self.torch_layout)?;
        let bias = self.weights.load(&format!("{p}.bias"), &self.device)?.to_dtype(self.dtype)?;
        if self.device.is_cuda() {
            self.kernels.borrow_mut().insert(p.to_owned(), (w.clone(), bias.clone()));
        }
        Ok((w, bias))
    }

    fn conv(&self, p: &str, x: &Tensor, pad: usize, stride: usize) -> Result<Tensor> {
        let (w, bias) = self.kernel(p)?;
        let y = conv_nhwc(&x.to_dtype(self.dtype)?, &w, pad, stride)?;
        Ok(y.broadcast_add(&bias)?)
    }

    /// 尾段一个条带最多多少元素（见 [`band_elems`]）：CUDA 上先同步，放掉前段与 DiT 的显存再量空闲。
    fn band_elems(&self) -> Result<usize> {
        if !self.device.is_cuda() {
            return Ok(BAND_ELEMS);
        }
        self.device.synchronize()?;
        Ok(band_elems(
            cuda_memory(&self.device).map(|(free, _)| free),
            self.dtype.size_in_bytes(),
        ))
    }

    fn rms(&self, p: &str, x: &Tensor) -> Result<Tensor> {
        let gamma = self.weights.load(&format!("{p}.gamma"), &self.device)?.to_dtype(self.dtype)?;
        let gamma = if self.torch_layout { gamma.flatten_all()? } else { gamma };
        Ok(candle_nn::ops::rms_norm(
            &x.to_dtype(self.dtype)?.contiguous()?,
            &gamma.contiguous()?,
            1e-12,
        )?)
    }

    fn resnet(&self, p: &str, x: &Tensor, out: usize) -> Result<Tensor> {
        let shortcut = if x.dim(3)? == out {
            x.clone()
        } else {
            self.conv(&format!("{p}.conv_shortcut"), x, 0, 1)?
        };
        let y = self.rms(&format!("{p}.norm1"), x)?;
        let y = self.conv(&format!("{p}.conv1"), &candle_nn::ops::silu(&y)?, 1, 1)?;
        let y = self.rms(&format!("{p}.norm2"), &y)?;
        let y = self.conv(&format!("{p}.conv2"), &candle_nn::ops::silu(&y)?, 1, 1)?;
        Ok((y + shortcut)?)
    }

    fn attention(&self, p: &str, x: &Tensor) -> Result<Tensor> {
        let (_, h, w, c) = x.dims4()?;
        let normalized = self.rms(&format!("{p}.norm"), x)?;
        let qkv = self.conv(&format!("{p}.to_qkv"), &normalized, 0, 1)?.reshape((1, h * w, 3 * c))?;
        let q = qkv.narrow(2, 0, c)?.unsqueeze(1)?;
        let k = qkv.narrow(2, c, c)?.unsqueeze(1)?;
        let v = qkv.narrow(2, 2 * c, c)?.unsqueeze(1)?;
        let o = attend(&q, &k, &v, c)?;
        let o = self.conv(&format!("{p}.proj"), &o.reshape((1, h, w, c))?, 0, 1)?;
        Ok((x + o)?)
    }

    fn upsample2x(x: &Tensor) -> Result<Tensor> {
        let (_, h, w, c) = x.dims4()?;
        Ok(x.reshape((1, h, 1, w, 1, c))?
            .broadcast_as((1, h, 2, w, 2, c))?
            .reshape((1, 2 * h, 2 * w, c))?)
    }

    /// 单帧的 DupUp3D：时间维只取最后一帧对应的通道，再把通道摊到 2×2 的空间块上。
    fn dup_up(x: &Tensor, out: usize, ft: usize) -> Result<Tensor> {
        let (_, h, w, input) = x.dims4()?;
        let repeat = out * ft * 4 / input;
        if repeat == 0 {
            bail!("VAE DupUp3D 通道比例无效");
        }
        let mut indices = Vec::with_capacity(out * 4);
        for b1 in 0..2 {
            for b2 in 0..2 {
                for o in 0..out {
                    indices.push(((o * ft * 4 + (ft - 1) * 4 + b1 * 2 + b2) / repeat) as u32);
                }
            }
        }
        let ids = Tensor::from_vec(indices, out * 4, x.device())?;
        Ok(x.contiguous()?
            .index_select(&ids, 3)?
            .reshape((1, h, w, 2, 2, out))?
            .permute((0, 1, 3, 2, 4, 5))?
            .reshape((1, 2 * h, 2 * w, out))?)
    }

    fn upblock(&self, index: usize, input: &Tensor, cancel: &dyn Fn() -> bool) -> Result<Tensor> {
        let dims = [1152, 1152, 1152, 576, 288, 144];
        let output_dim = dims[index + 1];
        let p = format!("decoder.up_blocks.{index}");
        let mut y = input.clone();
        for j in 0..3 {
            if cancel() {
                return Err(Cancelled.into());
            }
            y = self.resnet(&format!("{p}.resnets.{j}"), &y, output_dim)?;
        }
        if index < 4 {
            let ft = if TEMPORAL_DOWN.iter().rev().copied().collect::<Vec<_>>()[index] {
                2
            } else {
                1
            };
            let shortcut = Self::dup_up(input, output_dim, ft)?;
            let up = Self::upsample2x(&y)?;
            y = (self.conv(&format!("{p}.upsampler.resample.1"), &up, 1, 1)? + shortcut)?;
        }
        Ok(y)
    }

    /// 高分辨率的尾段按相互重叠的行条带重算。12 行的重叠覆盖 up_blocks 2..4 与 conv_out 的全部 3×3 卷积。
    pub fn decode(&self, latents: &Tensor, cancel: &dyn Fn() -> bool) -> Result<Tensor> {
        let (_, gh, gw, channels) = latents.dims4()?;
        if channels != Z_DIM {
            bail!("VAE latent 通道数必须为 {Z_DIM}");
        }
        let z = latents
            .to_dtype(DType::F32)?
            .broadcast_mul(&self.std)?
            .broadcast_add(&self.mean)?
            .to_dtype(self.dtype)?;
        let x = self.conv("post_quant_conv", &z, 0, 1)?;
        let x = self.conv("decoder.conv_in", &x, 1, 1)?;
        if cancel() {
            return Err(Cancelled.into());
        }
        let x = self.resnet("decoder.mid_block.resnets.0", &x, DECODER_BASE * MULT[4])?;
        let x = self.attention("decoder.mid_block.attentions.0", &x)?;
        let x = self.resnet("decoder.mid_block.resnets.1", &x, DECODER_BASE * MULT[4])?;
        let x = self.upblock(0, &x, cancel)?;
        let x = self.upblock(1, &x, cancel)?;
        let (_, h, width, _) = x.dims4()?;
        if h != gh * 4 || width != gw * 4 {
            bail!("VAE 前段尺寸不符");
        }
        // CUDA 上条带按空闲的显存放大；显存被别的进程占去、放不下时把条带缩到四分之一重来，直到 CPU 上的大小。
        let mut band = self.band_elems()?;
        let out = loop {
            match self.tail(&x, band, cancel) {
                Err(error) if band > BAND_ELEMS && is_out_of_memory(&error) => {
                    band = (band / 4).max(BAND_ELEMS);
                    self.device.synchronize()?;
                }
                result => break result?,
            }
        };
        if out.dim(1)? != gh * 16 || out.dim(2)? != gw * 16 || out.dim(3)? != 4 {
            bail!("VAE 解码尺寸与请求不符");
        }
        Ok(out)
    }

    /// 尾段（up_blocks 2..4 与 conv_out）按行条带算，每个条带至多 `band` 个元素（见 [`Self::band_elems`]）。
    fn tail(&self, x: &Tensor, band: usize, cancel: &dyn Fn() -> bool) -> Result<Tensor> {
        let (_, h, width, _) = x.dims4()?;
        let per_row = 16 * width * 288;
        let rows = (band / per_row.max(1)).saturating_sub(2 * HALO).max(HALO);
        let rows = rows.min(h);
        let mut strips = Vec::new();
        for start in (0..h).step_by(rows) {
            if cancel() {
                return Err(Cancelled.into());
            }
            let end = (start + rows).min(h);
            let a = start.saturating_sub(HALO);
            let b = (end + HALO).min(h);
            let mut y = x.narrow(1, a, b - a)?;
            for index in TAIL_FROM..5 {
                y = self.upblock(index, &y, cancel)?;
            }
            let normalized = self.rms("decoder.norm_out", &y)?;
            let y = self.conv("decoder.conv_out", &candle_nn::ops::silu(&normalized)?, 1, 1)?;
            let y = y.narrow(1, (start - a) * 4, (end - start) * 4)?;
            if y.to_dtype(DType::F32)?
                .flatten_all()?
                .to_vec1::<f32>()?
                .iter()
                .any(|value| !value.is_finite())
            {
                bail!("VAE 解码出现非有限像素值");
            }
            strips.push(y.clamp(-1.0, 1.0)?);
        }
        Ok(Tensor::cat(&strips.iter().collect::<Vec<_>>(), 1)?)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[cfg(feature = "cuda")]
    #[test]
    #[ignore = "requires an NVIDIA CUDA device"]
    fn cuda_attention_accepts_narrow_q_channels() {
        let device = Device::new_cuda(0).expect("CUDA device 0 is required");
        let channels = 1152;
        let qkv = Tensor::ones((1, 1024, 3 * channels), DType::BF16, &device).unwrap();
        let q = qkv.narrow(2, 0, channels).unwrap().unsqueeze(1).unwrap();
        let k = qkv.narrow(2, channels, channels).unwrap().unsqueeze(1).unwrap();
        let v = qkv.narrow(2, 2 * channels, channels).unwrap().unsqueeze(1).unwrap();
        assert!(!q.is_contiguous());
        let old = scaled_dot_product_attention(
            &q,
            &k.contiguous().unwrap(),
            &v.contiguous().unwrap(),
            (channels as f64).sqrt().recip(),
            None,
        );
        let old_error = old.expect_err("CUDA matmul must reject the original Q layout");
        assert!(
            old_error.to_string().contains("contiguous"),
            "unexpected old-layout error: {old_error}"
        );
        let output = attend(&q, &k, &v, channels).unwrap();
        assert_eq!(output.dims(), &[1, 1, 1024, channels]);
        let mean = output.to_dtype(DType::F32).unwrap().mean_all().unwrap().to_scalar::<f32>().unwrap();
        assert!((mean - 1.0).abs() < 0.02);
    }

    /// 条带大小：CPU 固定；显存少时不小于 CPU 的大小；12 GB 卡上空出约 10.5 GB 时放大到 1024² 一个条带装得下。
    #[test]
    fn band_size_follows_free_device_memory() {
        assert_eq!(band_elems(None, 2), BAND_ELEMS);
        assert_eq!(band_elems(Some(1 << 30), 2), BAND_ELEMS);
        let large = band_elems(Some(10_500_000_000), 2);
        assert!(large > 5 * BAND_ELEMS, "{large}");
        // 1024²：尾段 256 行、每行 16·256·288 个元素，加上下各 12 行的重叠。
        assert!(large >= (256 + 24) * 16 * 256 * 288, "{large}");
        assert!(band_elems(Some(20_000_000_000), 2) > large);
    }

    #[test]
    fn dup_up_matches_first_frame_channel_shuffle() {
        let x = Tensor::from_vec(vec![10.0_f32, 20.0, 30.0, 40.0], (1, 1, 1, 4), &Device::Cpu).unwrap();
        let out = Decoder::dup_up(&x, 2, 1).unwrap();
        assert_eq!(out.dims(), &[1, 2, 2, 2]);
        assert_eq!(
            out.flatten_all().unwrap().to_vec1::<f32>().unwrap(),
            vec![10.0, 30.0, 10.0, 30.0, 20.0, 40.0, 20.0, 40.0]
        );
    }

    #[test]
    fn mlx_nhwc_kernel_matches_small_convolution() {
        let x = Tensor::from_vec(vec![1.0_f32, 2.0, 3.0, 4.0], (1, 2, 2, 1), &Device::Cpu).unwrap();
        let w = Tensor::from_vec(vec![1.0_f32, 2.0, 3.0, 4.0], (1, 2, 2, 1), &Device::Cpu).unwrap();
        let y = conv_nhwc(&x, &nhwc_kernel(w, false).unwrap(), 0, 1).unwrap();
        assert_eq!(y.dims(), &[1, 1, 1, 1]);
        assert_eq!(y.flatten_all().unwrap().to_vec1::<f32>().unwrap(), vec![30.0]);
    }

    /// 两个输入通道时两种布局的核排列不同：PyTorch `[O,C,kh,kw]` 转置后与同一个 MLX `[O,kh,kw,C]` 核算出同一个结果。
    #[test]
    fn torch_and_mlx_kernels_give_the_same_convolution() {
        // x: 1×1×2×2（NHWC），两个通道。
        let x = Tensor::from_vec(vec![1.0_f32, 10.0, 2.0, 20.0], (1, 1, 2, 2), &Device::Cpu).unwrap();
        // 1×2 的核，输出 1 通道：w[c][kw] = c*2 + kw + 1。
        let torch = Tensor::from_vec(vec![1.0_f32, 2.0, 3.0, 4.0], (1, 2, 1, 2), &Device::Cpu).unwrap();
        let mlx = torch.permute((0, 2, 3, 1)).unwrap().contiguous().unwrap();
        let a = conv_nhwc(&x, &nhwc_kernel(torch, true).unwrap(), 0, 1).unwrap();
        let b = conv_nhwc(&x, &nhwc_kernel(mlx, false).unwrap(), 0, 1).unwrap();
        // 1*1 + 2*2 + 10*3 + 20*4 = 115
        assert_eq!(a.flatten_all().unwrap().to_vec1::<f32>().unwrap(), vec![115.0]);
        assert_eq!(b.flatten_all().unwrap().to_vec1::<f32>().unwrap(), vec![115.0]);
    }
}
