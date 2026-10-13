//! QwenImage21Transformer2DModel（单流 DiT，32 层；线性层是 MLX 4/8-bit 量化或原精度 bf16）。
//!
//! `causal_condition=true`：文本 token 严格因果、只用 t=0 的调制；目标图 token 看见全部前缀与
//! 自身。于是文本段与采样步无关——首次前向把每层（norm + RoPE 之后的）文本 K/V 存下，之后每步
//! 只算图像 token，拼上缓存的文本 K/V 做无掩码注意力。这正是参考管线 `kv_cache` 的做法。
//! 文本段不单独跑一遍：第一步逐层先算文本、存 K/V，再算图像。
//!
//! 32 层权重（4-bit ~4 GB、8-bit ~7.4 GB）不常驻：每步重开惰性表，每层分两半流式读入、用完即丢——
//! 算第 i 层的 q/k/v 时预读它的后半（to_out 与 MLP），算后半时预读第 i+1 层的 q/k/v，同时驻留的
//! 约是一层（4-bit ~0.12 GB、8-bit ~0.23 GB）。时间嵌入、调制与 `txt_in` 只在 [`Dit::prepare`] 里
//! 用一次：每一步的调制在那里先算好，这些权重随即丢掉（8-bit 包里它们是不量化的 bf16，约 0.27 GB），
//! 之后常驻的只有 `img_in` 与 `proj_out`。权重文件在 OS 文件缓存里，内存紧时可被回收，代价是那一步
//! 改从磁盘读。
//!
//! 计算精度见 [`Precision`]：缺省按本机实测在 f16 / bf16 里选（[`Precision::probe`]）；
//! 没有原生 bf16 运算的 GPU（M2 上慢约 1.8×）用 f16、残差流存 f32 防溢出，其余用 bf16。

use super::{rope, weights};
use crate::backend::mlx::qwen3::WeightStore;
use anyhow::{Context, Result, bail};
use mlx_rs::fast::ScaledDotProductAttentionMask;
use mlx_rs::ops::indexing::{IndexOp, TryIndexMutOp};
use mlx_rs::{Array, Dtype, fast, nn, ops};
use std::collections::HashMap;
use std::path::PathBuf;
use std::time::Instant;

const DIM: i32 = 4096;
const INTER: i32 = 12288;
const HEADS: i32 = 32;
const HEAD_DIM: i32 = 128;
const LAYERS: usize = 32;
const EPS: f32 = 1e-6;

/// DiT 的计算精度。M2 的 GPU 没有原生 bf16 运算：`--bench 4096` 实测一层 7 个线性层 4-bit
/// bf16 1169 ms、f16 661 ms，注意力 149 → 110 ms；1024² 实跑每步 44.2 → 27.2 s。
///
/// f16 只有 5 位指数（最大 65504），所以 f16 模式下残差流改存 f32，只有线性层与注意力的输入
/// 输出是 f16；bf16 模式与参考管线一致，残差也是 bf16。
#[derive(Clone, Copy, Debug)]
pub struct Precision {
    pub compute: Dtype,
    /// 流式读入的量化层先整层解量化成 `compute` 再按 dense 乘：f16 下线性层快约 12%（整步约
    /// 9%）；一层 dense f16 约 0.44 GB（4-bit 约 0.12 GB），进程峰值因此多约 0.33 GB。
    pub dequant: bool,
}

impl Precision {
    fn resid(self) -> Dtype {
        if self.compute == Dtype::Float16 {
            Dtype::Float32
        } else {
            self.compute
        }
    }

    /// 在本机量一次同形的 4-bit 矩阵乘（1024 个 token × 4096 → 4096，与分块时的一次 `to_q`
    /// 同形，随机权重），f16 与 bf16 交替各跑 5 次（另有 1 轮热身），取各自最短。约 0.2 s。
    pub fn probe() -> Result<Probe> {
        let key = mlx_rs::random::key(0)?;
        let w = mlx_rs::random::normal::<f32>(&[DIM, DIM], None, None, &key)?
            .multiply(&Array::from_f32(0.02))?
            .as_dtype(Dtype::Float16)?;
        let (q, s16, b16) = ops::quantize(&w, 64, 4)?;
        let x16 = mlx_rs::random::normal::<f32>(&[1, 1024, DIM], None, None, &key)?.as_dtype(Dtype::Float16)?;
        let bf = |a: &Array| a.as_dtype(Dtype::Bfloat16);
        let (sb, bb, xb) = (bf(&s16)?, bf(&b16)?, bf(&x16)?);
        mlx_rs::transforms::eval([&q, &s16, &b16, &x16, &sb, &bb, &xb])?;
        drop(w);
        let run = |x: &Array, s: &Array, b: &Array| -> Result<f64> {
            let t = Instant::now();
            ops::quantized_matmul(x, &q, s, b, true, 64, 4)?.eval()?;
            Ok(t.elapsed().as_secs_f64() * 1e3)
        };
        let mut p = Probe {
            f16_ms: f64::INFINITY,
            bf16_ms: f64::INFINITY,
        };
        for round in 0..6 {
            let (f, b) = (run(&x16, &s16, &b16)?, run(&xb, &sb, &bb)?);
            // 第 0 轮是热身：kernel 首次编译、GPU 升频。
            if round > 0 {
                p.f16_ms = p.f16_ms.min(f);
                p.bf16_ms = p.bf16_ms.min(b);
            }
        }
        Ok(p)
    }
}

/// bf16 的 4-bit 矩阵乘不比 f16 慢过这个倍数就选 bf16。M2 实测约 1.77×，原生 bf16 的 GPU
/// 应接近 1×；门槛留得宽，免得测量抖动让同一台机器两次选得不一样（输出会随之不同）。
const BF16_TOLERANCE: f64 = 1.3;

/// [`Precision::probe`] 的实测：同形 4-bit 矩阵乘各自的最短耗时（毫秒）。
#[derive(Clone, Copy, Debug)]
pub struct Probe {
    pub f16_ms: f64,
    pub bf16_ms: f64,
}

impl Probe {
    /// bf16 够快就用 bf16：与参考管线同精度，指数位与 f32 一样宽、不会溢出，残差流也不用另存
    /// f32；否则用 f16。
    pub fn pick(self) -> Dtype {
        if self.bf16_ms <= self.f16_ms * BF16_TOLERANCE {
            Dtype::Bfloat16
        } else {
            Dtype::Float16
        }
    }
}

/// f16 计算溢出（DiT 输出含非有限值）。调用方可以改用 bf16 重跑。
#[derive(Debug)]
pub struct Overflow;

impl std::fmt::Display for Overflow {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("DiT 在 f16 下溢出（输出含非有限值）")
    }
}

impl std::error::Error for Overflow {}

/// 无 bias 的线性层。有 `.scales` 的是 MLX affine 量化，bits 与 group size 由形状反推
/// （打包列数 × 32 = 输入维 × bits，分组数 × group = 输入维），所以 4-bit 包与 8-bit 包共用；
/// 没有 `.scales` 的按原精度直接乘，不在加载时再量化。scales / biases / dense 权重加载时转成
/// 计算精度，输入在乘之前转过去。
pub(super) enum Lin {
    Quant {
        w: Array,
        scales: Array,
        biases: Array,
        group: i32,
        bits: i32,
    },
    Dense(Array),
}

impl Lin {
    /// `dequant` 为真时把量化层解量化成 dense（只对流式读入的 32 层用；层外权重常驻，不值得）。
    pub(super) fn load(s: &mut WeightStore, p: &str, input: i32, dtype: Dtype, dequant: bool) -> Result<Self> {
        let w = s.take(&format!("{p}.weight"))?;
        if !s.contains(&format!("{p}.scales")) {
            if w.dim(1) != input {
                bail!("{p}: 权重输入维 {} ≠ {input}", w.dim(1));
            }
            return Ok(Self::Dense(w.as_dtype(dtype)?));
        }
        let scales = s.take(&format!("{p}.scales"))?.as_dtype(dtype)?;
        let biases = s.take(&format!("{p}.biases"))?.as_dtype(dtype)?;
        let groups = scales.dim(1);
        let packed = w.dim(1) * 32;
        if groups == 0 || input % groups != 0 || packed % input != 0 {
            bail!(
                "{p}: 量化形状对不上输入维 {input}（权重 {:?}，scales {:?}）",
                w.shape(),
                scales.shape()
            );
        }
        let (group, bits) = (input / groups, packed / input);
        if dequant {
            return Ok(Self::Dense(ops::dequantize(&w, &scales, &biases, group, bits)?));
        }
        Ok(Self::Quant {
            w,
            scales,
            biases,
            group,
            bits,
        })
    }

    pub(super) fn forward(&self, x: &Array) -> Result<Array> {
        Ok(match self {
            Self::Quant {
                w,
                scales,
                biases,
                group,
                bits,
            } => ops::quantized_matmul(x.as_dtype(scales.dtype())?, w, scales, biases, true, *group, *bits)?,
            Self::Dense(w) => ops::matmul(x.as_dtype(w.dtype())?, w.t())?,
        })
    }
}

/// 两种包的键名不全一样：mlx-community 4-bit 包把 diffusers 的 `nn.Sequential` 下标与
/// `timestep_embedder` 摊平了（`modulation.0`、`time_text_embed.linear_1`），ddalcu 8-bit 包
/// 保留原名（`modulation.1`、`time_text_embed.timestep_embedder.linear_1`）。取第一个存在的。
fn pick<'a>(s: &WeightStore, names: &[&'a str]) -> Result<&'a str> {
    names
        .iter()
        .copied()
        .find(|n| s.contains(&format!("{n}.weight")))
        .with_context(|| format!("DiT 缺少权重：{}", names.join(" / ")))
}

fn scalar(v: f32, like: &Array) -> Result<Array> {
    Ok(Array::from_f32(v).as_dtype(like.dtype())?)
}

/// 与 torch 的 `.to(torch.bfloat16)` 相同的就近偶数舍入。
pub fn bf16_round(v: f32) -> f32 {
    let bits = v.to_bits();
    let lsb = (bits >> 16) & 1;
    let rounded = bits.wrapping_add(0x7fff + lsb) & 0xffff_0000;
    f32::from_bits(rounded)
}

/// 一层的前半：q/k/v 投影与 per-head RMSNorm。
struct Attn {
    to_q: Lin,
    to_k: Lin,
    to_v: Lin,
    norm_q: Array,
    norm_k: Array,
}

/// 一层的后半：注意力输出投影与 MLP。
struct Ffn {
    to_out: Lin,
    gate: Lin,
    proj: Lin,
    out: Lin,
}

/// 流式读入的单位：一层的哪一半，按 `transformer_blocks.{i}.` 之后的键名分。
#[derive(Clone, Copy)]
enum Half {
    Attn,
    Ffn,
}

impl Half {
    fn keys(self) -> &'static [&'static str] {
        match self {
            Self::Attn => &["attn.to_q.", "attn.to_k.", "attn.to_v.", "attn.norm_q.", "attn.norm_k."],
            Self::Ffn => &["attn.to_out.", "img_mlp."],
        }
    }
}

/// 一组调制参数，已 reshape 成 `[1,1,DIM]` 以便按 token 广播。
struct Mod {
    scale1: Array,
    gate1: Array,
    scale2: Array,
    gate2: Array,
}

/// 一步的调制：各层共用的 [`Mod`]，加上 `norm_out` 的缩放（`[1,1,DIM]`）。
struct StepMod {
    m: Mod,
    out_scale: Array,
}

/// 只在 [`Dit::prepare`] 里用一次的层外权重。
struct Embedders {
    t_lin1: Lin,
    t_lin2: Lin,
    modulation: Lin,
    txt_norm: Array,
    txt_in1: Lin,
    txt_in2: Lin,
    norm_out: Lin,
}

pub struct Dit {
    files: Vec<PathBuf>,
    prec: Precision,
    img_in: Lin,
    proj_out: Lin,
    /// [`Self::prepare`] 取走后为空。
    embed: Option<Embedders>,
}

/// 前缀（文本，改图时还有条件图）的逐层 K/V（`[1,H,P,D]`，已过 norm 与 RoPE）、每一步的调制与目标图的 RoPE 表。
/// 第一步之前 `kv` 为空、`pending` 装着前缀的输入；第一步逐层填满 `kv` 后 `pending` 清空。
pub struct TextCache {
    kv: Vec<(Array, Array)>,
    pending: Option<TextPending>,
    steps: Vec<StepMod>,
    /// 目标图 token 的 RoPE 表（`[N, D/2]`）：它的 frame 位置排在整个前缀之后。
    cos: Array,
    sin: Array,
}

struct TextPending {
    x: Array,
    m: Mod,
    cos: Array,
    sin: Array,
    /// 前缀各段 `[start, end)` 与是否文本：文本段因果，条件图块内全看见、对前面的段因果（`causal_condition`）。
    segments: Vec<(i32, i32, bool)>,
}

/// 改图时前缀里的一张条件图：VAE latent `[1, h·w, 64]`，与它那段视觉 token 在条件编码（丢掉系统前缀之后）里的起始行。
/// 一个视觉 token 覆盖 32×32 像素，正好是 2×2 个 latent token，所以那段有 `h·w/4` 行。
pub struct CondImage<'a> {
    pub latents: &'a Array,
    pub h: usize,
    pub w: usize,
    pub at: usize,
}

/// 注意力的一块 query `[s, e)`：看见前 `keys` 个 key（`None` 是全部），`causal` 时对其中最后 `e - s` 个按下三角
/// （MLX 的因果掩码按 key 末尾对齐）。
#[derive(Clone, Copy)]
struct Span {
    s: i32,
    e: i32,
    keys: Option<i32>,
    causal: bool,
}

/// 一步里按层取权重：惰性表只有文件头，`take` 拿出第 i 层的张量并发起异步读取。
struct BlockStream {
    lazy: HashMap<String, Array>,
    prec: Precision,
}

impl BlockStream {
    fn open(files: &[PathBuf], prec: Precision) -> Result<Self> {
        let lazy = weights::lazy(files, |k| k.starts_with("transformer_blocks.")).context("打开 DiT 层权重")?;
        Ok(Self { lazy, prec })
    }

    /// 取出第 i 层的一半。`prefetch` 为真时立刻在 CPU stream 上开始读（与 GPU 上正在算的部分重叠）。
    fn part(&mut self, i: usize, half: Half, prefetch: bool) -> Result<WeightStore> {
        let prefix = format!("transformer_blocks.{i}.");
        let keys: Vec<String> = self
            .lazy
            .keys()
            .filter(|k| {
                k.strip_prefix(&prefix)
                    .is_some_and(|rest| half.keys().iter().any(|h| rest.starts_with(h)))
            })
            .cloned()
            .collect();
        let part: HashMap<String, Array> = keys.into_iter().filter_map(|k| self.lazy.remove_entry(&k)).collect();
        if prefetch {
            mlx_rs::transforms::async_eval(part.values())?;
        }
        WeightStore::from_arrays(part)
    }

    fn attn(&mut self, i: usize, prefetch: bool) -> Result<Attn> {
        let mut s = self.part(i, Half::Attn, prefetch)?;
        let a = Attn::load(&mut s, i, self.prec)?;
        all_used(&s, i)?;
        Ok(a)
    }

    fn ffn(&mut self, i: usize, prefetch: bool) -> Result<Ffn> {
        let mut s = self.part(i, Half::Ffn, prefetch)?;
        let f = Ffn::load(&mut s, i, self.prec)?;
        all_used(&s, i)?;
        Ok(f)
    }
}

fn all_used(s: &WeightStore, i: usize) -> Result<()> {
    let left = s.remaining();
    if !left.is_empty() {
        bail!("DiT 第 {i} 层有未使用的权重：{:?}", &left[..left.len().min(5)]);
    }
    Ok(())
}

/// 把 `[1,S,H,D]` 的相邻两维当复数，乘以 `cos + i·sin`（`[S, D/2]`）。f32 计算后回到原 dtype。
fn apply_rope(x: &Array, cos: &Array, sin: &Array) -> Result<Array> {
    let s = x.dim(1);
    let dtype = x.dtype();
    let pairs = x.as_dtype(Dtype::Float32)?.reshape(&[1, s, HEADS, HEAD_DIM / 2, 2])?;
    let x0 = pairs.index((.., .., .., .., 0));
    let x1 = pairs.index((.., .., .., .., 1));
    let cos = cos.reshape(&[1, s, 1, HEAD_DIM / 2])?;
    let sin = sin.reshape(&[1, s, 1, HEAD_DIM / 2])?;
    let y0 = x0.multiply(&cos)?.subtract(&x1.multiply(&sin)?)?;
    let y1 = x0.multiply(&sin)?.add(&x1.multiply(&cos)?)?;
    let y = ops::stack_axis(&[y0, y1], -1)?.reshape(&[1, s, HEADS, HEAD_DIM])?;
    Ok(y.as_dtype(dtype)?)
}

fn gelu_tanh_f32(x: &Array) -> Result<Array> {
    let x = x.as_dtype(Dtype::Float32)?;
    let c = Array::from_f32((2.0f32 / std::f32::consts::PI).sqrt());
    let inner = x.add(&x.multiply(&x)?.multiply(&x)?.multiply(&Array::from_f32(0.044715))?)?;
    let t = ops::tanh(&inner.multiply(&c)?)?;
    Ok(x.multiply(&Array::from_f32(0.5))?.multiply(&t.add(&Array::from_f32(1.0))?)?)
}

fn modulate(x: &Array, scale: &Array) -> Result<Array> {
    let n = fast::layer_norm(x, None, None, EPS)?;
    Ok(n.multiply(&scale.add(&scalar(1.0, scale)?)?)?)
}

impl Attn {
    fn load(s: &mut WeightStore, i: usize, prec: Precision) -> Result<Self> {
        let p = format!("transformer_blocks.{i}");
        let (dt, dq) = (prec.compute, prec.dequant);
        // norm 权重也转成计算精度：rms_norm 的输出按 x 与权重的公共类型，f16 × bf16 会升成 f32。
        Ok(Self {
            to_q: Lin::load(s, &format!("{p}.attn.to_q"), DIM, dt, dq)?,
            to_k: Lin::load(s, &format!("{p}.attn.to_k"), DIM, dt, dq)?,
            to_v: Lin::load(s, &format!("{p}.attn.to_v"), DIM, dt, dq)?,
            norm_q: s.take(&format!("{p}.attn.norm_q.weight"))?.as_dtype(dt)?,
            norm_k: s.take(&format!("{p}.attn.norm_k.weight"))?.as_dtype(dt)?,
        })
    }

    /// 返回 (q, k, v)，都是 `[1,H,S,D]`，q/k 已过 per-head RMSNorm 与 RoPE。
    fn qkv(&self, xm: &Array, cos: &Array, sin: &Array) -> Result<(Array, Array, Array)> {
        let s = xm.dim(1);
        let shape = [1, s, HEADS, HEAD_DIM];
        let q = fast::rms_norm(&self.to_q.forward(xm)?.reshape(&shape)?, &self.norm_q, EPS)?;
        let k = fast::rms_norm(&self.to_k.forward(xm)?.reshape(&shape)?, &self.norm_k, EPS)?;
        let v = self.to_v.forward(xm)?.reshape(&shape)?;
        let q = apply_rope(&q, cos, sin)?;
        let k = apply_rope(&k, cos, sin)?;
        let t = [0, 2, 1, 3];
        Ok((q.transpose_axes(&t)?, k.transpose_axes(&t)?, v.transpose_axes(&t)?))
    }
}

impl Ffn {
    fn load(s: &mut WeightStore, i: usize, prec: Precision) -> Result<Self> {
        let p = format!("transformer_blocks.{i}");
        let (dt, dq) = (prec.compute, prec.dequant);
        Ok(Self {
            to_out: Lin::load(s, &format!("{p}.attn.to_out.0"), DIM, dt, dq)?,
            gate: Lin::load(s, &format!("{p}.img_mlp.gate_layer"), DIM, dt, dq)?,
            proj: Lin::load(s, &format!("{p}.img_mlp.proj"), DIM, dt, dq)?,
            out: Lin::load(s, &format!("{p}.img_mlp.out"), INTER, dt, dq)?,
        })
    }

    fn finish(&self, x: &Array, attn: &Array, m: &Mod) -> Result<Array> {
        let s = attn.dim(2);
        let attn = attn.transpose_axes(&[0, 2, 1, 3])?.reshape(&[1, s, DIM])?;
        let attn = self.to_out.forward(&attn)?;
        let x = x.add(&ops::tanh(&m.gate1)?.multiply(&attn)?)?;
        let xm = modulate(&x, &m.scale2)?;
        let h = nn::silu(self.gate.forward(&xm)?)?.multiply(&self.proj.forward(&xm)?)?;
        let h = self.out.forward(&h)?;
        Ok(x.add(&ops::tanh(&m.gate2)?.multiply(&h)?)?)
    }
}

impl Embedders {
    /// 正弦时间嵌入 → MLP，返回 `[1, DIM]`（bf16）。`sigma` 按管线两次转 bf16 的舍入复刻。
    fn temb(&self, sigma: f64) -> Result<Array> {
        let t = bf16_round(bf16_round((sigma * 1000.0) as f32) / 1000.0);
        let half = 128usize;
        let mut emb = vec![0f32; 2 * half];
        for i in 0..half {
            let f = (-(10000f32.ln()) * i as f32 / half as f32).exp();
            let a = 1000.0 * t * f;
            emb[i] = a.cos();
            emb[half + i] = a.sin();
        }
        let x = Array::from_slice(&emb, &[1, 256]).as_dtype(Dtype::Bfloat16)?;
        let h = nn::silu(self.t_lin1.forward(&x)?)?;
        self.t_lin2.forward(&h)
    }

    fn mods(&self, temb: &Array) -> Result<Mod> {
        let m = self.modulation.forward(&nn::silu(temb)?)?;
        let part = |k: i32| -> Result<Array> { Ok(m.index((.., k * DIM..(k + 1) * DIM)).reshape(&[1, 1, DIM])?) };
        Ok(Mod {
            scale1: part(0)?,
            gate1: part(1)?,
            scale2: part(2)?,
            gate2: part(3)?,
        })
    }
}

impl Dit {
    /// 只常驻层外的权重；32 层在这里按键核对一遍（惰性，不读文件），真正读取在每步里。
    /// `files` 是 `transformer/` 下的 safetensors 分片：32 层与层外权重都从这里取。
    pub fn load(files: &[PathBuf], prec: Precision) -> Result<Self> {
        let mut stream = BlockStream::open(files, prec)?;
        for i in 0..LAYERS {
            stream.attn(i, false)?;
            stream.ffn(i, false)?;
        }
        if let Some(k) = stream.lazy.keys().next() {
            bail!("DiT 有多余的层权重：{k}");
        }
        let files = files.to_vec();
        let s = &mut weights::resident(&files, |k| !k.starts_with("transformer_blocks.")).context("加载 DiT 层外权重")?;
        let t1 = pick(s, &["time_text_embed.linear_1", "time_text_embed.timestep_embedder.linear_1"])?;
        let t2 = pick(s, &["time_text_embed.linear_2", "time_text_embed.timestep_embedder.linear_2"])?;
        let modulation = pick(s, &["modulation.0", "modulation.1"])?;
        let dt = prec.compute;
        let me = Self {
            files,
            prec,
            img_in: Lin::load(s, "img_in", 64, dt, false)?,
            proj_out: Lin::load(s, "proj_out", DIM, dt, false)?,
            embed: Some(Embedders {
                t_lin1: Lin::load(s, t1, 256, dt, false)?,
                t_lin2: Lin::load(s, t2, DIM, dt, false)?,
                modulation: Lin::load(s, modulation, DIM, dt, false)?,
                txt_norm: s.take("txt_in.text_norm.weight")?,
                txt_in1: Lin::load(s, "txt_in.in_layer", DIM, dt, false)?,
                txt_in2: Lin::load(s, "txt_in.out_layer", DIM, dt, false)?,
                norm_out: Lin::load(s, "norm_out.linear", DIM, dt, false)?,
            }),
        };
        let left = s.remaining();
        if !left.is_empty() {
            bail!("DiT 有未使用的权重：{:?}", &left[..left.len().min(5)]);
        }
        Ok(me)
    }

    fn tables(cos: &[f32], sin: &[f32], from: usize, to: usize) -> (Array, Array) {
        let half = (HEAD_DIM / 2) as usize;
        let n = (to - from) as i32;
        (
            Array::from_slice(&cos[from * half..to * half], &[n, HEAD_DIM / 2]),
            Array::from_slice(&sin[from * half..to * half], &[n, HEAD_DIM / 2]),
        )
    }

    /// 一组 token 过一层的前半：逐块算 q/k/v，每块求值后才进下一块；K/V 先按整张（`prefix` 的缓存 + 这组 token）分配好，
    /// 逐块就地写进去（MLX 在旧缓冲只剩这一处引用时原地更新），不另拼一份。每个 token 的算子与不分块时完全相同。
    #[allow(clippy::too_many_arguments)]
    fn qkv_chunks(
        a: &Attn,
        prefix: Option<&(Array, Array)>,
        x: &Array,
        m: &Mod,
        cos: &Array,
        sin: &Array,
        spans: &[Span],
    ) -> Result<(Vec<Array>, Array, Array)> {
        let tl = prefix.map_or(0, |(k, _)| k.dim(2));
        let n = spans.last().map_or(0, |r| r.e);
        let dtype = a.norm_k.dtype();
        let full = |t: Option<&Array>| -> Result<Array> {
            let mut a = ops::zeros_dtype(&[1, HEADS, tl + n, HEAD_DIM], t.map_or(dtype, |t| t.dtype()))?;
            if let Some(t) = t {
                a.try_index_mut((.., .., 0..tl, ..), t)?;
            }
            Ok(a)
        };
        let (mut k, mut v) = (full(prefix.map(|p| &p.0))?, full(prefix.map(|p| &p.1))?);
        let mut qs = Vec::with_capacity(spans.len());
        for sp in spans {
            let (s, e) = (sp.s, sp.e);
            let xm = modulate(&x.index((.., s..e, ..)), &m.scale1)?;
            let (q, kc, vc) = a.qkv(&xm, &cos.index((s..e, ..)), &sin.index((s..e, ..)))?;
            k.try_index_mut((.., .., tl + s..tl + e, ..), &kc)?;
            v.try_index_mut((.., .., tl + s..tl + e, ..), &vc)?;
            mlx_rs::transforms::eval([&q, &k, &v])?;
            qs.push(q);
        }
        Ok((qs, k, v))
    }

    /// 一组 token 过一层的后半：逐块做注意力、to_out 与 MLP，每块求值后写回 `x` 的这几行再进下一块。
    /// 一块只读自己那几行的残差（其余 token 只经 K/V 进来），所以就地写回不影响后面的块；`x` 只
    /// 被这里持有，MLX 原地更新，不再另有整张的分块输出与拼接结果。
    fn finish_chunks(f: &Ffn, mut x: Array, m: &Mod, qs: Vec<Array>, k: &Array, v: &Array, spans: &[Span]) -> Result<Array> {
        let scale = (HEAD_DIM as f32).sqrt().recip();
        for (sp, q) in spans.iter().zip(qs) {
            let (s, e) = (sp.s, sp.e);
            let (k, v) = match sp.keys {
                Some(n) if n < k.dim(2) => (k.index((.., .., ..n, ..)), v.index((.., .., ..n, ..))),
                _ => (k.clone(), v.clone()),
            };
            let mask = sp.causal.then_some(ScaledDotProductAttentionMask::Causal);
            let attn = fast::scaled_dot_product_attention(&q, &k, &v, scale, mask, None)?;
            let y = f.finish(&x.index((.., s..e, ..)), &attn, m)?;
            // 先求值：y 的图还引用着 x 的切片，带着它写回 x 就不能原地更新。
            y.eval()?;
            if spans.len() == 1 {
                return Ok(y);
            }
            x.try_index_mut((.., s..e, ..), &y)?;
            x.eval()?;
        }
        Ok(x)
    }

    /// 前缀与每一步的调制：`enc` 是条件编码 `[1,L,4096]`，`images` 是改图的条件图（文生图为空，按在 `enc` 里的位置排序），
    /// `sigmas` 是要走的每一步的 sigma。前缀这里只过 `txt_in` / `img_in`：文本行过 `txt_in`，每张条件图那段视觉 token
    /// 换成它的 `h·w` 个 latent token 过 `img_in`；逐层部分并进第一步。算完即丢掉时间嵌入、调制与 `txt_in` 的权重，
    /// 所以一个 `Dit` 只能 prepare 一次。
    pub fn prepare(&mut self, enc: &Array, images: &[CondImage<'_>], sigmas: &[f64], grid_h: usize, grid_w: usize) -> Result<TextCache> {
        let e = self.embed.take().context("DiT 的时间嵌入与调制权重已经用过")?;
        let rows = enc.dim(1) as usize;
        // ZeroCenterRMSNorm：fp32 下 `x * rsqrt(mean(x²)+eps) * (w+1)`。
        let dtype = enc.dtype();
        let w1 = e.txt_norm.as_dtype(Dtype::Float32)?.add(&Array::from_f32(1.0))?;
        let normed = fast::rms_norm(&enc.as_dtype(Dtype::Float32)?, &w1, EPS)?.as_dtype(dtype)?;
        let h = gelu_tanh_f32(&e.txt_in1.forward(&normed)?)?.as_dtype(dtype)?;
        let text = e.txt_in2.forward(&h)?.as_dtype(self.prec.resid())?;
        let mut layout = Vec::with_capacity(2 * images.len() + 1);
        let mut parts = Vec::with_capacity(2 * images.len() + 1);
        let mut cursor = 0usize;
        for img in images {
            let tokens = img.h * img.w;
            if tokens == 0 || tokens % 4 != 0 || img.latents.dim(1) as usize != tokens {
                bail!("条件图 latent {:?} 与 {}×{} 对不上", img.latents.shape(), img.h, img.w);
            }
            let end = img.at + tokens / 4;
            if img.at < cursor || end > rows {
                bail!("条件图那段视觉 token [{}, {end}) 不在条件编码 [{cursor}, {rows}) 里", img.at);
            }
            if img.at > cursor {
                layout.push(rope::Segment::Text(img.at - cursor));
                parts.push(text.index((.., cursor as i32..img.at as i32, ..)));
            }
            layout.push(rope::Segment::Image { h: img.h, w: img.w });
            parts.push(
                self.img_in
                    .forward(&img.latents.as_dtype(Dtype::Bfloat16)?)?
                    .as_dtype(self.prec.resid())?,
            );
            cursor = end;
        }
        if cursor < rows {
            layout.push(rope::Segment::Text(rows - cursor));
            parts.push(text.index((.., cursor as i32.., ..)));
        }
        let x = ops::concatenate_axis(&parts, 1)?;
        drop(parts);
        let len: usize = layout.iter().map(|s| s.len()).sum();
        let (cos_all, sin_all) = rope::joint_rope_tables(&layout, grid_h, grid_w);
        let (cos, sin) = Self::tables(&cos_all, &sin_all, 0, len);
        let (tcos, tsin) = Self::tables(&cos_all, &sin_all, len, len + grid_h * grid_w);
        let mut segments = Vec::with_capacity(layout.len());
        let mut at = 0i32;
        for seg in &layout {
            let n = seg.len() as i32;
            segments.push((at, at + n, matches!(seg, rope::Segment::Text(_))));
            at += n;
        }
        let m = e.mods(&e.temb(0.0)?)?;
        let steps = sigmas
            .iter()
            .map(|&sigma| {
                let temb = e.temb(sigma)?;
                Ok(StepMod {
                    m: e.mods(&temb)?,
                    out_scale: e.norm_out.forward(&nn::silu(&temb)?)?.reshape(&[1, 1, DIM])?,
                })
            })
            .collect::<Result<Vec<_>>>()?;
        let mut done = vec![&x, &m.scale1, &m.gate1, &m.scale2, &m.gate2];
        for s in &steps {
            done.extend([&s.m.scale1, &s.m.gate1, &s.m.scale2, &s.m.gate2, &s.out_scale]);
        }
        mlx_rs::transforms::eval(done)?;
        drop(e);
        Ok(TextCache {
            kv: Vec::with_capacity(LAYERS),
            pending: Some(TextPending { x, m, cos, sin, segments }),
            steps,
            cos: tcos,
            sin: tsin,
        })
    }

    /// 前缀的分块：文本段因果（每块看见到自己末尾为止的 key），条件图块的每块看见到块尾为止的 key；都按 `chunk` 切。
    fn prefix_spans(segments: &[(i32, i32, bool)], chunk: i32) -> Vec<Span> {
        let mut spans = Vec::new();
        for &(start, end, text) in segments {
            for s in (start..end).step_by(chunk as usize) {
                let e = (s + chunk).min(end);
                spans.push(Span {
                    s,
                    e,
                    keys: Some(if text { e } else { end }),
                    causal: text,
                });
            }
        }
        spans
    }

    /// 第 `index` 步去噪（sigma 是 [`Self::prepare`] 收到的第 `index` 个）：`latents` 是 `[1, N, 64]`
    /// （任意浮点 dtype），返回速度场 `[1, N, 64]`（f32）。每层按 `chunk` 个 token 分块算（K/V 仍是
    /// 整张），把层内临时张量压到 1/⌈N/chunk⌉。层权重按半层流式读入；第一步顺带把前缀的 K/V 填进 `cache`
    /// （前缀 token 用 t=0 的调制，与采样步无关）。
    pub fn step(&self, cache: &mut TextCache, latents: &Array, index: usize, grid_h: usize, grid_w: usize, chunk: usize) -> Result<Array> {
        let n = grid_h * grid_w;
        if latents.dim(1) as usize != n || cache.cos.dim(0) as usize != n {
            bail!("latent token 数 {} ≠ {grid_h}×{grid_w}", latents.dim(1));
        }
        let sm = cache.steps.get(index).with_context(|| format!("没有第 {index} 步的调制"))?;
        let m = &sm.m;
        let mut x = self
            .img_in
            .forward(&latents.as_dtype(Dtype::Bfloat16)?)?
            .as_dtype(self.prec.resid())?;
        let n = n as i32;
        let chunk = chunk.max(1) as i32;
        let spans: Vec<Span> = (0..n)
            .step_by(chunk as usize)
            .map(|s| Span {
                s,
                e: (s + chunk).min(n),
                keys: None,
                causal: false,
            })
            .collect();
        let prefix_spans = cache.pending.as_ref().map(|p| Self::prefix_spans(&p.segments, chunk));
        let mut stream = BlockStream::open(&self.files, self.prec)?;
        let mut next = Some(stream.attn(0, true)?);
        for i in 0..LAYERS {
            let a = next.take().context("DiT 层权重缺失")?;
            let f = stream.ffn(i, true)?;
            let pending = match (cache.pending.as_ref(), prefix_spans.as_deref()) {
                (Some(p), Some(ps)) => {
                    let (qs, k, v) = Self::qkv_chunks(&a, None, &p.x, &p.m, &p.cos, &p.sin, ps)?;
                    cache.kv.push((k, v));
                    Some(qs)
                }
                _ => None,
            };
            let (qs, k, v) = Self::qkv_chunks(&a, Some(&cache.kv[i]), &x, m, &cache.cos, &cache.sin, &spans)?;
            drop(a);
            if i + 1 < LAYERS {
                next = Some(stream.attn(i + 1, true)?);
            }
            if let (Some(p), Some(pqs), Some(ps)) = (cache.pending.as_mut(), pending, prefix_spans.as_deref()) {
                let (pk, pv) = &cache.kv[i];
                let px = std::mem::replace(&mut p.x, Array::from_f32(0.0));
                p.x = Self::finish_chunks(&f, px, &p.m, pqs, pk, pv, ps)?;
            }
            x = Self::finish_chunks(&f, x, m, qs, &k, &v, &spans)?;
        }
        cache.pending = None;
        let x = modulate(&x, &sm.out_scale)?;
        let out = self.proj_out.forward(&x)?.as_dtype(Dtype::Float32)?;
        out.eval()?;
        if self.prec.compute == Dtype::Float16 {
            let finite = out.is_finite()?.all(None)?;
            finite.eval()?;
            if !finite.item::<bool>() {
                return Err(Overflow.into());
            }
        }
        Ok(out)
    }
}

#[cfg(test)]
mod tests {
    use super::{Probe, bf16_round};
    use mlx_rs::Dtype;

    #[test]
    fn probe_picks_bf16_only_when_it_is_not_much_slower() {
        let pick = |f16_ms, bf16_ms| Probe { f16_ms, bf16_ms }.pick();
        // M2 实测（--bench 4096 的 qmm）：bf16 慢约 1.77×
        assert_eq!(pick(661.0, 1169.0), Dtype::Float16);
        assert_eq!(pick(10.0, 10.5), Dtype::Bfloat16);
        assert_eq!(pick(10.0, 9.0), Dtype::Bfloat16);
        assert_eq!(pick(10.0, 13.5), Dtype::Float16);
    }

    #[test]
    fn bf16_rounding_matches_torch() {
        assert_eq!(bf16_round(1.0), 1.0);
        // 987.6 在 bf16 下相邻可表示值是 984 与 988
        assert_eq!(bf16_round(987.6), 988.0);
        assert_eq!(bf16_round(0.1), 0.10009765625);
    }
}
