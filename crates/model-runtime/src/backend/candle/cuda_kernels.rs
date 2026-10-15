//! candle 的 CUDA 自定义核（`cuda` feature）。核的源码在运行期用 NVRTC 编译一次（CUDA 版随包带 nvrtc），PTX 按模块名
//! 缓存在设备上。
//!
//! - MLX 仿射量化的反量化：每个线程展开一个打包的 u32（8-bit 四个值、4-bit 八个值），只把打包的权重搬上显卡、在显存里直接
//!   写出 bf16，主机内存里不展开。先乘后加、各自按就近舍入（不收缩成 FMA），再就近偶数舍入到 bf16，与主机上的
//!   [`super::weights::dequantize_affine`] 再转 bf16 逐位相同。
//! - bf16 的末维 softmax：一行一个 256 线程的块，在 f32 里求最大值与指数和（三遍读同一行，后两遍多半命中缓存），写回 bf16。
//!   candle 自带的核一行只给一个 warp，DiT 注意力那样几千列的分数上占用率低，慢四五倍。
//! - NHWC 的 im2col：每个线程搬 16 字节（同一像素相邻的通道），读写都合并；输出的每行按 (ky, kx, c) 排，与 MLX 布局的
//!   卷积核 [O, kh, kw, C] 摊平后一致，一次矩阵乘就得到 NHWC 的输出。candle 的 conv2d 要 NCHW，它的 im2col 按通道跨步读，
//!   前后还要各转一次布局。

use std::sync::OnceLock;

use anyhow::{Result, bail};
use candle_core::backend::BackendStorage;
use candle_core::cuda_backend::cudarc::driver::{LaunchConfig, PushKernelArg};
use candle_core::cuda_backend::{CudaStorageSlice, WrapErr};
use candle_core::{CpuStorage, CudaStorage, CustomOp1, CustomOp3, DType, Layout, Shape, Tensor};

const MODULE: &str = "baocut_kernels";
const THREADS: u32 = 256;

const SOURCE: &str = r#"
__device__ __forceinline__ float bf16_to_f32(unsigned short v) { return __uint_as_float(((unsigned int)v) << 16); }

__device__ __forceinline__ unsigned int f32_to_bf16(float v) {
    const unsigned int u = __float_as_uint(v);
    return (u + 0x7fffu + ((u >> 16) & 1u)) >> 16;
}

extern "C" __global__ void mlx_affine_dequantize_bf16(
    const unsigned int* __restrict__ packed,
    const float* __restrict__ scales,
    const float* __restrict__ biases,
    unsigned int* __restrict__ out,
    const unsigned long long words,
    const unsigned int packed_columns,
    const unsigned int bits,
    const unsigned int group_size)
{
    const unsigned long long index = (unsigned long long)blockIdx.x * blockDim.x + threadIdx.x;
    if (index >= words) return;
    const unsigned int per_word = 32u / bits;
    const unsigned int mask = (1u << bits) - 1u;
    const unsigned long long row = index / packed_columns;
    const unsigned int column = (unsigned int)(index % packed_columns) * per_word;
    const unsigned long long group = row * (packed_columns * per_word / group_size) + column / group_size;
    const float scale = scales[group];
    const float bias = biases[group];
    const unsigned int word = packed[index];
    unsigned int pairs[4];
    for (unsigned int k = 0; k < per_word; ++k) {
        const float value = __fadd_rn(__fmul_rn((float)((word >> (k * bits)) & mask), scale), bias);
        const unsigned int u = f32_to_bf16(value);
        if (k & 1u) pairs[k >> 1] |= u << 16; else pairs[k >> 1] = u;
    }
    if (per_word == 8u) {
        reinterpret_cast<uint4*>(out)[index] = make_uint4(pairs[0], pairs[1], pairs[2], pairs[3]);
    } else {
        reinterpret_cast<uint2*>(out)[index] = make_uint2(pairs[0], pairs[1]);
    }
}

// 块内归约（blockDim.x 是 32 的倍数、至多 1024）。
__device__ __forceinline__ float block_reduce(float v, const bool take_max, float* shared) {
    for (int o = 16; o > 0; o >>= 1) {
        const float w = __shfl_xor_sync(0xffffffffu, v, o);
        v = take_max ? fmaxf(v, w) : v + w;
    }
    const unsigned int warp = threadIdx.x >> 5, lane = threadIdx.x & 31u;
    if (lane == 0) shared[warp] = v;
    __syncthreads();
    v = lane < (blockDim.x >> 5) ? shared[lane] : (take_max ? __int_as_float(0xff800000) : 0.f);
    for (int o = 16; o > 0; o >>= 1) {
        const float w = __shfl_xor_sync(0xffffffffu, v, o);
        v = take_max ? fmaxf(v, w) : v + w;
    }
    __syncthreads();
    return v;
}

extern "C" __global__ void softmax_last_dim_bf16(
    const unsigned short* __restrict__ x,
    unsigned short* __restrict__ y,
    const unsigned int columns)
{
    __shared__ float shared[32];
    const unsigned long long base = (unsigned long long)blockIdx.x * columns;
    const unsigned short* row = x + base;
    unsigned short* out = y + base;
    float m = __int_as_float(0xff800000);
    for (unsigned int c = threadIdx.x; c < columns; c += blockDim.x) m = fmaxf(m, bf16_to_f32(row[c]));
    m = block_reduce(m, true, shared);
    float sum = 0.f;
    for (unsigned int c = threadIdx.x; c < columns; c += blockDim.x) sum += expf(bf16_to_f32(row[c]) - m);
    const float inv = 1.f / block_reduce(sum, false, shared);
    for (unsigned int c = threadIdx.x; c < columns; c += blockDim.x) {
        out[c] = (unsigned short)f32_to_bf16(expf(bf16_to_f32(row[c]) - m) * inv);
    }
}

extern "C" __global__ void im2col_nhwc_16b(
    const uint4* __restrict__ src,
    uint4* __restrict__ dst,
    const unsigned int height,
    const unsigned int width,
    const unsigned int chunks,
    const unsigned int out_height,
    const unsigned int out_width,
    const unsigned int kernel_h,
    const unsigned int kernel_w,
    const unsigned int pad_top,
    const unsigned int pad_left,
    const unsigned int stride,
    const unsigned long long total)
{
    const unsigned long long index = (unsigned long long)blockIdx.x * blockDim.x + threadIdx.x;
    if (index >= total) return;
    unsigned long long t = index / chunks;
    const unsigned int c = (unsigned int)(index - t * chunks);
    const unsigned int kx = (unsigned int)(t % kernel_w);
    t /= kernel_w;
    const unsigned int ky = (unsigned int)(t % kernel_h);
    t /= kernel_h;
    const unsigned int ox = (unsigned int)(t % out_width);
    const unsigned int oy = (unsigned int)(t / out_width);
    const int iy = (int)(oy * stride + ky) - (int)pad_top;
    const int ix = (int)(ox * stride + kx) - (int)pad_left;
    uint4 v = make_uint4(0u, 0u, 0u, 0u);
    if (iy >= 0 && iy < (int)height && ix >= 0 && ix < (int)width) {
        v = src[((unsigned long long)iy * width + (unsigned int)ix) * chunks + c];
    }
    dst[index] = v;
}
"#;

fn ptx() -> candle_core::Result<&'static str> {
    static PTX: OnceLock<Result<String, String>> = OnceLock::new();
    PTX.get_or_init(|| {
        candle_core::cuda_backend::cudarc::nvrtc::compile_ptx(SOURCE)
            .map(|ptx| ptx.to_src())
            .map_err(|error| error.to_string())
    })
    .as_deref()
    .map_err(|error| candle_core::Error::Msg(format!("NVRTC 编译 CUDA 核失败：{error}")))
}

struct AffineDequantize {
    group_size: usize,
    bits: usize,
}

fn contiguous(layout: &Layout, what: &str) -> candle_core::Result<(usize, usize)> {
    layout
        .contiguous_offsets()
        .ok_or_else(|| candle_core::Error::Msg(format!("{what} 必须是连续张量")))
}

impl CustomOp3 for AffineDequantize {
    fn name(&self) -> &'static str {
        "mlx-affine-dequantize-bf16"
    }

    fn cpu_fwd(
        &self,
        _: &CpuStorage,
        _: &Layout,
        _: &CpuStorage,
        _: &Layout,
        _: &CpuStorage,
        _: &Layout,
    ) -> candle_core::Result<(CpuStorage, Shape)> {
        candle_core::bail!("{} 只在 CUDA 上实现", self.name())
    }

    fn cuda_fwd(
        &self,
        packed: &CudaStorage,
        packed_layout: &Layout,
        scales: &CudaStorage,
        scales_layout: &Layout,
        biases: &CudaStorage,
        biases_layout: &Layout,
    ) -> candle_core::Result<(CudaStorage, Shape)> {
        let (rows, packed_columns) = packed_layout.shape().dims2()?;
        let per_word = 32 / self.bits;
        let columns = packed_columns * per_word;
        let groups = columns / self.group_size;
        if scales_layout.shape().elem_count() != rows * groups || biases_layout.shape().elem_count() != rows * groups {
            candle_core::bail!("scales/biases 与打包权重 {rows}×{columns}（每组 {}）的形状不符", self.group_size);
        }
        let device = packed.device().clone();
        let (p0, p1) = contiguous(packed_layout, "打包权重")?;
        let (s0, s1) = contiguous(scales_layout, "scales")?;
        let (b0, b1) = contiguous(biases_layout, "biases")?;
        let (CudaStorageSlice::U32(packed), CudaStorageSlice::F32(scales), CudaStorageSlice::F32(biases)) =
            (&packed.slice, &scales.slice, &biases.slice)
        else {
            candle_core::bail!("反量化核要 u32 的打包权重与 f32 的 scales/biases");
        };
        let (packed, scales, biases) = (packed.slice(p0..p1), scales.slice(s0..s1), biases.slice(b0..b1));
        let func = device.get_or_load_custom_func("mlx_affine_dequantize_bf16", MODULE, ptx()?)?;
        let words = rows * packed_columns;
        // SAFETY: 核写满每一个元素（每个线程写自己那个字展开的 `per_word` 个 bf16）。
        let out = unsafe { device.alloc(words * per_word)? };
        let config = LaunchConfig {
            grid_dim: (words.div_ceil(THREADS as usize) as u32, 1, 1),
            block_dim: (THREADS, 1, 1),
            shared_mem_bytes: 0,
        };
        let mut builder = func.builder();
        builder.arg(&packed);
        builder.arg(&scales);
        builder.arg(&biases);
        builder.arg(&out);
        candle_core::builder_arg!(
            builder,
            words as u64,
            packed_columns as u32,
            self.bits as u32,
            self.group_size as u32
        );
        // SAFETY: 参数的类型与个数和核的签名一一对应，越界由 `index >= words` 挡住。
        unsafe { builder.launch(config) }.w()?;
        Ok((
            CudaStorage {
                slice: CudaStorageSlice::BF16(out),
                device,
            },
            Shape::from((rows, columns)),
        ))
    }
}

/// 在显卡上把 MLX 仿射量化的矩阵展开成 bf16。`packed` 是 CUDA 上 [rows, cols·bits/32] 的 u32，`scales`/`biases`
/// 是同一设备上 [rows, cols/group_size] 的任意浮点精度。
pub fn dequantize_affine_bf16(packed: &Tensor, scales: &Tensor, biases: &Tensor, group_size: usize, bits: usize) -> Result<Tensor> {
    if !matches!(bits, 4 | 8) {
        bail!("unsupported quantization width: {bits} bits");
    }
    if packed.dtype() != DType::U32 || packed.rank() != 2 {
        bail!("quantized weights must be a two-dimensional uint32 tensor");
    }
    if group_size == 0 || !group_size.is_multiple_of(32 / bits) || !(packed.dim(1)? * (32 / bits)).is_multiple_of(group_size) {
        bail!("quantized column count is not a multiple of the group size {group_size}");
    }
    let scales = scales.to_dtype(DType::F32)?.contiguous()?;
    let biases = biases.to_dtype(DType::F32)?.contiguous()?;
    Ok(packed
        .contiguous()?
        .apply_op3_no_bwd(&scales, &biases, &AffineDequantize { group_size, bits })?)
}

struct SoftmaxLastDim;

impl CustomOp1 for SoftmaxLastDim {
    fn name(&self) -> &'static str {
        "softmax-last-dim-bf16"
    }

    fn cpu_fwd(&self, _: &CpuStorage, _: &Layout) -> candle_core::Result<(CpuStorage, Shape)> {
        candle_core::bail!("{} 只在 CUDA 上实现", self.name())
    }

    fn cuda_fwd(&self, storage: &CudaStorage, layout: &Layout) -> candle_core::Result<(CudaStorage, Shape)> {
        let device = storage.device().clone();
        let (o0, o1) = contiguous(layout, "softmax 的输入")?;
        let CudaStorageSlice::BF16(x) = &storage.slice else {
            candle_core::bail!("softmax 核只收 bf16");
        };
        let x = x.slice(o0..o1);
        let elements = layout.shape().elem_count();
        let columns = layout.dims().last().copied().unwrap_or(1).max(1);
        let rows = elements / columns;
        let func = device.get_or_load_custom_func("softmax_last_dim_bf16", MODULE, ptx()?)?;
        // SAFETY: 每一行由一个块写满。
        let out = unsafe { device.alloc(elements)? };
        let config = LaunchConfig {
            grid_dim: (rows as u32, 1, 1),
            block_dim: (THREADS, 1, 1),
            shared_mem_bytes: 0,
        };
        let mut builder = func.builder();
        builder.arg(&x);
        builder.arg(&out);
        candle_core::builder_arg!(builder, columns as u32);
        // SAFETY: 参数与核的签名一一对应。
        unsafe { builder.launch(config) }.w()?;
        Ok((
            CudaStorage {
                slice: CudaStorageSlice::BF16(out),
                device,
            },
            layout.shape().clone(),
        ))
    }
}

/// CUDA 上 bf16 张量的末维 softmax（在 f32 里算）。
pub fn softmax_last_dim_bf16(x: &Tensor) -> Result<Tensor> {
    if x.dtype() != DType::BF16 || x.rank() == 0 {
        bail!("softmax 核只收至少一维的 bf16 张量");
    }
    let columns = x.dim(x.rank() - 1)?;
    if columns == 0 || x.elem_count() / columns > i32::MAX as usize {
        bail!("softmax 的形状超出核的范围：{:?}", x.dims());
    }
    Ok(x.contiguous()?.apply_op1_no_bwd(&SoftmaxLastDim)?)
}

struct Im2ColNhwc {
    kernel: (usize, usize),
    stride: usize,
    pad: (usize, usize),
    output: (usize, usize),
}

impl CustomOp1 for Im2ColNhwc {
    fn name(&self) -> &'static str {
        "im2col-nhwc-bf16"
    }

    fn cpu_fwd(&self, _: &CpuStorage, _: &Layout) -> candle_core::Result<(CpuStorage, Shape)> {
        candle_core::bail!("{} 只在 CUDA 上实现", self.name())
    }

    fn cuda_fwd(&self, storage: &CudaStorage, layout: &Layout) -> candle_core::Result<(CudaStorage, Shape)> {
        let device = storage.device().clone();
        let (_, height, width, channels) = layout.shape().dims4()?;
        let (o0, o1) = contiguous(layout, "im2col 的输入")?;
        let CudaStorageSlice::BF16(x) = &storage.slice else {
            candle_core::bail!("im2col 核只收 bf16");
        };
        if !o0.is_multiple_of(8) {
            candle_core::bail!("im2col 的输入没有按 16 字节对齐");
        }
        let x = x.slice(o0..o1);
        let (out_height, out_width) = self.output;
        let (kernel_h, kernel_w) = self.kernel;
        let chunks = channels / 8;
        let total = out_height * out_width * kernel_h * kernel_w * chunks;
        let func = device.get_or_load_custom_func("im2col_nhwc_16b", MODULE, ptx()?)?;
        // SAFETY: 每个 16 字节的块由一个线程写（越界的位置写 0）。
        let out = unsafe { device.alloc(total * 8)? };
        let config = LaunchConfig {
            grid_dim: (total.div_ceil(THREADS as usize) as u32, 1, 1),
            block_dim: (THREADS, 1, 1),
            shared_mem_bytes: 0,
        };
        let mut builder = func.builder();
        builder.arg(&x);
        builder.arg(&out);
        candle_core::builder_arg!(
            builder,
            height as u32,
            width as u32,
            chunks as u32,
            out_height as u32,
            out_width as u32,
            kernel_h as u32,
            kernel_w as u32,
            self.pad.0 as u32,
            self.pad.1 as u32,
            self.stride as u32,
            total as u64
        );
        // SAFETY: 参数与核的签名一一对应，越界由 `index >= total` 挡住。
        unsafe { builder.launch(config) }.w()?;
        Ok((
            CudaStorage {
                slice: CudaStorageSlice::BF16(out),
                device,
            },
            Shape::from((out_height * out_width, kernel_h * kernel_w * channels)),
        ))
    }
}

/// NHWC（batch 1）bf16 的 im2col：输出 [out_h·out_w, kh·kw·C]，每行按 (ky, kx, c) 排。通道数要是 8 的倍数（16 字节一块）。
/// `pad` 是（上，左）：输出第 (oy, ox) 个位置读输入的 (oy·stride + ky − 上, ox·stride + kx − 左)，越出输入的读 0；分块算一张大图
/// 时，中间那几块的上边是真实的行，上边距按这一块的起始行给。
pub fn im2col_nhwc_bf16(x: &Tensor, kernel: (usize, usize), stride: usize, pad: (usize, usize), output: (usize, usize)) -> Result<Tensor> {
    let (batch, _, _, channels) = x.dims4()?;
    if x.dtype() != DType::BF16 || batch != 1 || !channels.is_multiple_of(8) {
        bail!("im2col 核只收 batch 1、通道数为 8 的倍数的 bf16 NHWC 张量");
    }
    let ((kernel_h, kernel_w), (out_height, out_width)) = (kernel, output);
    if stride == 0 || kernel_h == 0 || kernel_w == 0 || out_height == 0 || out_width == 0 {
        bail!("im2col 的卷积核 {kernel_h}×{kernel_w}（stride {stride}）或输出 {out_height}×{out_width} 无效");
    }
    if (out_height * out_width * kernel_h * kernel_w * channels / 8).div_ceil(THREADS as usize) > u32::MAX as usize {
        bail!("im2col 的输出太大");
    }
    let op = Im2ColNhwc {
        kernel,
        stride,
        pad,
        output,
    };
    Ok(x.contiguous()?.apply_op1_no_bwd(&op)?)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::backend::candle::weights::dequantize_affine;
    use candle_core::Device;

    /// 真卡上与主机的展开逐位比较（4 与 8 位，含跨组与奇数行）。
    #[test]
    #[ignore = "requires an NVIDIA CUDA device"]
    fn cuda_dequantization_matches_the_host_bit_for_bit() {
        let device = Device::new_cuda(0).expect("CUDA device 0 is required");
        for bits in [4_usize, 8] {
            let (rows, columns, group) = (7_usize, 256_usize, 64_usize);
            let words = (0..rows * columns * bits / 32)
                .map(|i| (i as u32).wrapping_mul(2_654_435_761).rotate_left(i as u32 % 31))
                .collect::<Vec<_>>();
            let packed = Tensor::from_vec(words, (rows, columns * bits / 32), &Device::Cpu).unwrap();
            let scales = (0..rows * columns / group)
                .map(|i| 0.013_f32 * (i as f32 + 1.0))
                .collect::<Vec<_>>();
            let biases = (0..rows * columns / group)
                .map(|i| -0.37_f32 + 0.021 * i as f32)
                .collect::<Vec<_>>();
            let scales = Tensor::from_vec(scales, (rows, columns / group), &Device::Cpu)
                .unwrap()
                .to_dtype(DType::BF16)
                .unwrap();
            let biases = Tensor::from_vec(biases, (rows, columns / group), &Device::Cpu)
                .unwrap()
                .to_dtype(DType::BF16)
                .unwrap();
            let host = dequantize_affine(&packed, &scales, &biases, group, bits)
                .unwrap()
                .to_dtype(DType::BF16)
                .unwrap();
            let on = |t: &Tensor| t.to_device(&device).unwrap();
            let gpu = dequantize_affine_bf16(&on(&packed), &on(&scales), &on(&biases), group, bits).unwrap();
            assert_eq!(gpu.dims(), host.dims());
            let bits_of = |t: &Tensor| {
                t.to_device(&Device::Cpu)
                    .unwrap()
                    .to_dtype(DType::F32)
                    .unwrap()
                    .flatten_all()
                    .unwrap()
                    .to_vec1::<f32>()
                    .unwrap()
                    .into_iter()
                    .map(f32::to_bits)
                    .collect::<Vec<_>>()
            };
            assert_eq!(bits_of(&gpu), bits_of(&host), "{bits}-bit");
        }
    }

    /// 与 candle（NCHW）的 conv2d 比较：3×3、pad 1 与 stride 2 的 im2col 加矩阵乘。
    #[test]
    #[ignore = "requires an NVIDIA CUDA device"]
    fn cuda_im2col_matches_candle_conv() {
        let device = Device::new_cuda(0).expect("CUDA device 0 is required");
        let (height, width, channels, output) = (9_usize, 13_usize, 16_usize, 24_usize);
        let x = Tensor::randn(0f32, 1.0, (1, height, width, channels), &device).unwrap();
        let w = Tensor::randn(0f32, 0.2, (output, 3, 3, channels), &device).unwrap();
        for (pad, stride) in [(1_usize, 1_usize), (1, 2), (0, 1)] {
            let out = ((height + 2 * pad - 3) / stride + 1, (width + 2 * pad - 3) / stride + 1);
            let columns = im2col_nhwc_bf16(&x.to_dtype(DType::BF16).unwrap(), (3, 3), stride, (pad, pad), out).unwrap();
            let ours = columns
                .to_dtype(DType::F32)
                .unwrap()
                .matmul(&w.reshape((output, 9 * channels)).unwrap().t().unwrap())
                .unwrap();
            let reference = x
                .to_dtype(DType::BF16)
                .unwrap()
                .to_dtype(DType::F32)
                .unwrap()
                .permute((0, 3, 1, 2))
                .unwrap()
                .contiguous()
                .unwrap()
                .conv2d(&w.permute((0, 3, 1, 2)).unwrap().contiguous().unwrap(), pad, stride, 1, 1)
                .unwrap()
                .permute((0, 2, 3, 1))
                .unwrap()
                .flatten_to(2)
                .unwrap();
            let reference = reference.reshape(ours.shape()).unwrap();
            let difference = (ours - reference)
                .unwrap()
                .abs()
                .unwrap()
                .flatten_all()
                .unwrap()
                .max(0)
                .unwrap()
                .to_scalar::<f32>()
                .unwrap();
            assert!(difference < 1e-3, "pad {pad} stride {stride}: max difference {difference}");
        }
    }

    /// 与 candle 的 softmax 比较（宽行、窄行、带 -inf 掩码的行）。
    #[test]
    #[ignore = "requires an NVIDIA CUDA device"]
    fn cuda_softmax_matches_candle() {
        let device = Device::new_cuda(0).expect("CUDA device 0 is required");
        for columns in [7_usize, 300, 4111] {
            let mut values = (0..3 * columns).map(|i| ((i * 37 % 101) as f32 - 50.0) * 0.21).collect::<Vec<_>>();
            values[columns + 1] = f32::NEG_INFINITY;
            let x = Tensor::from_vec(values, (3, columns), &device)
                .unwrap()
                .to_dtype(DType::BF16)
                .unwrap();
            let ours = softmax_last_dim_bf16(&x).unwrap().to_dtype(DType::F32).unwrap();
            let reference = candle_nn::ops::softmax_last_dim(&x.to_dtype(DType::F32).unwrap()).unwrap();
            let difference = (ours - reference)
                .unwrap()
                .abs()
                .unwrap()
                .flatten_all()
                .unwrap()
                .max(0)
                .unwrap()
                .to_scalar::<f32>()
                .unwrap();
            assert!(difference < 4e-3, "{columns} columns: max difference {difference}");
        }
    }
}
