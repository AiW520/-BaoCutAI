//! Qwen3-VL 的视觉塔（改图时把条件图读成语言模型的视觉 token）：patch 嵌入（Conv3d 等价于对 `[C,T,16,16]` 展平行的
//! 线性层）+ 48×48 位置表的双线性插值 + 27 层 ViT（2D RoPE、整图全注意力）+ 合并器（2×2 patch → 一个 4096 维 token）；
//! 第 8、16、24 层之后各有一个 DeepStack 合并器，输出加到语言模型第 0、1、2 层之后的图像 token 上。
//!
//! 一张图单独跑一遍（参考实现把多张图拼成一条、用 `cu_seqlens` 隔开，各图之间不互相看见，结果相同），注意力不用掩码。
//! 头维 72 不在 MLX 融合注意力支持的 64 / 80 / 128 里：q/k/v 末维补零到 80（点积与加权和都不变），缩放仍按 72，
//! 免得退回物化整张分数矩阵（1024² 一张图 16 头 × 4096² 的 f32 就是 1 GB）。
//!
//! 两种包的写法不同：mlx-community 4-bit 包是 `vision_tower.*`、位置表也 4-bit 量化；ddalcu 8-bit 包保留 transformers 原名
//! `model.visual.*`、位置表 bf16。几何按 `text_encoder/config.json` 的 `vision_config` 是写死的（两个包相同），加载时按形状核对。
//! 计算用 bf16（参考实现的精度）；塔只有约 0.4B 参数，1024² 一张图在 M2 上几秒。

use super::dit::Lin;
use super::inputs::{self, Planes};
use super::weights;
use crate::backend::mlx::qwen3::WeightStore;
use anyhow::{Context, Result, bail};
use mlx_rs::fast::ScaledDotProductAttentionMask;
use mlx_rs::ops::indexing::IndexOp;
use mlx_rs::{Array, Dtype, fast, nn, ops};
use std::path::PathBuf;

const HIDDEN: i32 = 1152;
const HEADS: i32 = 16;
const HEAD_DIM: i32 = 72;
/// 融合注意力支持的最近头维。
const PADDED_HEAD_DIM: i32 = 80;
const INTER: i32 = 4304;
const DEPTH: usize = 27;
/// 合并后的 token 维度（= 语言模型 hidden）。
const OUT: i32 = 4096;
/// 合并器的输入：2×2 个 patch 拼成一行。
const MERGED: i32 = HIDDEN * 4;
/// 这几层之后接 DeepStack 合并器（`deepstack_visual_indexes`）。
const DEEPSTACK_AT: [usize; 3] = [8, 16, 24];
const EPS: f32 = 1e-6;
const DTYPE: Dtype = Dtype::Bfloat16;
const PREFIXES: [&str; 2] = ["vision_tower", "model.visual"];

/// 带 bias 的线性层（权重可能量化，bias 不量化）。
struct Linear {
    lin: Lin,
    bias: Array,
}

impl Linear {
    fn load(s: &mut WeightStore, p: &str, input: i32) -> Result<Self> {
        Ok(Self {
            lin: Lin::load(s, p, input, DTYPE, false)?,
            bias: s.take(&format!("{p}.bias"))?.as_dtype(DTYPE)?,
        })
    }

    fn forward(&self, x: &Array) -> Result<Array> {
        Ok(self.lin.forward(x)?.add(&self.bias)?)
    }
}

struct Norm {
    weight: Array,
    bias: Array,
}

impl Norm {
    fn load(s: &mut WeightStore, p: &str) -> Result<Self> {
        Ok(Self {
            weight: s.take(&format!("{p}.weight"))?.as_dtype(DTYPE)?,
            bias: s.take(&format!("{p}.bias"))?.as_dtype(DTYPE)?,
        })
    }

    fn forward(&self, x: &Array) -> Result<Array> {
        Ok(fast::layer_norm(x, Some(&self.weight), Some(&self.bias), EPS)?)
    }
}

struct Block {
    norm1: Norm,
    qkv: Linear,
    proj: Linear,
    norm2: Norm,
    fc1: Linear,
    fc2: Linear,
}

/// 2×2 合并器：主合并器先在 1152 维上归一化再拼行，DeepStack 的先拼行再在 4608 维上归一化（`use_postshuffle_norm`）。
/// 两层 MLP 之间是精确 GELU（塔内 MLP 用的是 tanh 近似）。
struct Merger {
    norm: Norm,
    post_shuffle: bool,
    fc1: Linear,
    fc2: Linear,
}

impl Merger {
    fn load(s: &mut WeightStore, p: &str, post_shuffle: bool) -> Result<Self> {
        Ok(Self {
            norm: Norm::load(s, &format!("{p}.norm"))?,
            post_shuffle,
            fc1: Linear::load(s, &format!("{p}.linear_fc1"), MERGED)?,
            fc2: Linear::load(s, &format!("{p}.linear_fc2"), MERGED)?,
        })
    }

    /// `[1, n, 1152]` → `[n/4, 4096]`。
    fn forward(&self, x: &Array) -> Result<Array> {
        let x = if self.post_shuffle {
            self.norm.forward(&x.reshape(&[-1, MERGED])?)?
        } else {
            self.norm.forward(x)?.reshape(&[-1, MERGED])?
        };
        self.fc2.forward(&nn::gelu(self.fc1.forward(&x)?)?)
    }
}

/// 一张图过塔的结果：合并后的视觉 token 与三组 DeepStack 特征，都是 `[n/4, 4096]`（bf16）。
pub struct VisionFeatures {
    pub merged: Array,
    pub deepstack: [Array; 3],
}

pub struct VisionTower {
    patch_w: Array,
    patch_b: Array,
    /// `[2304, 1152]`：量化的位置表加载时解量化（它只被按行取、不做矩阵乘）。
    pos: Array,
    blocks: Vec<Block>,
    merger: Merger,
    deepstack: Vec<Merger>,
}

/// 按 `[1,S,H,72]` 做 rotate-half 旋转（f32 计算，回到原 dtype）；`cos`/`sin` 是 `[S, 72]`。
fn rotate(x: &Array, cos: &Array, sin: &Array) -> Result<Array> {
    let dtype = x.dtype();
    let x = x.as_dtype(Dtype::Float32)?;
    let half = HEAD_DIM / 2;
    let rotated = ops::concatenate_axis(&[x.index((.., .., .., half..)).negative()?, x.index((.., .., .., ..half))], -1)?;
    let s = x.dim(1);
    let cos = cos.reshape(&[1, s, 1, HEAD_DIM])?;
    let sin = sin.reshape(&[1, s, 1, HEAD_DIM])?;
    Ok(x.multiply(&cos)?.add(&rotated.multiply(&sin)?)?.as_dtype(dtype)?)
}

/// `[1,S,H,72]` → `[1,H,S,80]`（末维补零）。
fn padded_heads(x: &Array) -> Result<Array> {
    let x = x.transpose_axes(&[0, 2, 1, 3])?;
    let pad = ops::zeros_dtype(&[1, HEADS, x.dim(2), PADDED_HEAD_DIM - HEAD_DIM], x.dtype())?;
    Ok(ops::concatenate_axis(&[x, pad], -1)?)
}

impl Block {
    fn load(s: &mut WeightStore, p: &str) -> Result<Self> {
        Ok(Self {
            norm1: Norm::load(s, &format!("{p}.norm1"))?,
            qkv: Linear::load(s, &format!("{p}.attn.qkv"), HIDDEN)?,
            proj: Linear::load(s, &format!("{p}.attn.proj"), HIDDEN)?,
            norm2: Norm::load(s, &format!("{p}.norm2"))?,
            fc1: Linear::load(s, &format!("{p}.mlp.linear_fc1"), HIDDEN)?,
            fc2: Linear::load(s, &format!("{p}.mlp.linear_fc2"), INTER)?,
        })
    }

    fn forward(&self, x: &Array, cos: &Array, sin: &Array) -> Result<Array> {
        let n = x.dim(1);
        let qkv = self.qkv.forward(&self.norm1.forward(x)?)?.reshape(&[1, n, 3, HEADS, HEAD_DIM])?;
        let q = rotate(&qkv.index((.., .., 0, .., ..)), cos, sin)?;
        let k = rotate(&qkv.index((.., .., 1, .., ..)), cos, sin)?;
        let v = qkv.index((.., .., 2, .., ..));
        let scale = (HEAD_DIM as f32).sqrt().recip();
        let attn = fast::scaled_dot_product_attention(
            padded_heads(&q)?,
            padded_heads(&k)?,
            padded_heads(&v)?,
            scale,
            None::<ScaledDotProductAttentionMask<'_>>,
            None,
        )?;
        let attn = attn
            .index((.., .., .., ..HEAD_DIM))
            .transpose_axes(&[0, 2, 1, 3])?
            .reshape(&[1, n, HIDDEN])?;
        let x = x.add(&self.proj.forward(&attn)?)?;
        let h = nn::gelu_approximate(self.fc1.forward(&self.norm2.forward(&x)?)?)?;
        Ok(x.add(&self.fc2.forward(&h)?)?)
    }
}

impl VisionTower {
    /// 从文本编码器的分片里取视觉塔权重并常驻（4-bit 约 0.3 GB、8-bit 约 0.5 GB）。包里没有视觉塔时报错。
    pub fn load(files: &[PathBuf]) -> Result<Self> {
        let map = weights::lazy(files, |k| {
            PREFIXES.iter().any(|p| k.strip_prefix(p).is_some_and(|r| r.starts_with('.')))
        })
        .context("打开视觉塔权重")?;
        let prefix = PREFIXES
            .into_iter()
            .find(|p| map.contains_key(&format!("{p}.patch_embed.proj.weight")))
            .context("文本编码器里没有视觉塔（patch_embed）")?;
        let s = &mut weights::into_resident(map)?;
        let patch = s.take(&format!("{prefix}.patch_embed.proj.weight"))?;
        if patch.shape() != [HIDDEN, 3, inputs::TEMPORAL as i32, inputs::PATCH as i32, inputs::PATCH as i32] {
            bail!("视觉塔 patch_embed 的形状 {:?} 不对", patch.shape());
        }
        let patch_w = patch.reshape(&[HIDDEN, inputs::PATCH_DIM as i32])?.as_dtype(DTYPE)?;
        let patch_b = s.take(&format!("{prefix}.patch_embed.proj.bias"))?.as_dtype(DTYPE)?;
        let pos_key = format!("{prefix}.pos_embed");
        let pos = match s.take_optional(&format!("{pos_key}.scales")) {
            Some(scales) => {
                let w = s.take(&format!("{pos_key}.weight"))?;
                let biases = s.take(&format!("{pos_key}.biases"))?;
                let (groups, packed) = (scales.dim(1), w.dim(1) * 32);
                if groups == 0 || HIDDEN % groups != 0 || packed % HIDDEN != 0 {
                    bail!("视觉塔位置表的量化形状 {:?} / {:?} 不对", w.shape(), scales.shape());
                }
                ops::dequantize(&w, &scales, &biases, HIDDEN / groups, packed / HIDDEN)?
            }
            None => s.take(&format!("{pos_key}.weight"))?,
        }
        .as_dtype(DTYPE)?;
        let side = inputs::POS_SIDE as i32;
        if pos.shape() != [side * side, HIDDEN] {
            bail!("视觉塔位置表的形状 {:?} 不对", pos.shape());
        }
        let blocks = (0..DEPTH)
            .map(|i| Block::load(s, &format!("{prefix}.blocks.{i}")))
            .collect::<Result<Vec<_>>>()?;
        let merger = Merger::load(s, &format!("{prefix}.merger"), false)?;
        let deepstack = (0..DEEPSTACK_AT.len())
            .map(|i| Merger::load(s, &format!("{prefix}.deepstack_merger_list.{i}"), true))
            .collect::<Result<Vec<_>>>()?;
        let left = s.remaining();
        if !left.is_empty() {
            bail!("视觉塔有未使用的权重：{:?}", &left[..left.len().min(5)]);
        }
        Ok(Self {
            patch_w,
            patch_b,
            pos,
            blocks,
            merger,
            deepstack,
        })
    }

    /// 一张已缩放的图（宽高都是 32 的倍数）→ 合并后的视觉 token 与 DeepStack 特征。
    pub fn forward(&self, image: &Planes) -> Result<VisionFeatures> {
        let (gh, gw) = inputs::vision_grid(image.width, image.height);
        let n = (gh * gw) as i32;
        let patches = Array::from_slice(
            &inputs::patchify(&image.vision_rgb(), image.width, image.height),
            &[n, inputs::PATCH_DIM as i32],
        );
        let x = ops::matmul(patches.as_dtype(DTYPE)?, self.patch_w.t())?.add(&self.patch_b)?;
        let (taps, weights) = inputs::vision_pos_taps(gh, gw);
        let rows = self
            .pos
            .take_axis(Array::from_slice(&taps, &[n * 4]), 0)?
            .reshape(&[n, 4, HIDDEN])?;
        let weights = Array::from_slice(&weights, &[n, 4, 1]).as_dtype(DTYPE)?;
        let pos = rows.multiply(&weights)?.sum_axis(1, None)?;
        let mut x = x.add(&pos)?.reshape(&[1, n, HIDDEN])?;
        let (cos, sin) = inputs::vision_rope_table(gh, gw, HEAD_DIM as usize);
        let cos = Array::from_slice(&cos, &[n, HEAD_DIM]);
        let sin = Array::from_slice(&sin, &[n, HEAD_DIM]);
        let mut deepstack = Vec::with_capacity(DEEPSTACK_AT.len());
        for (i, block) in self.blocks.iter().enumerate() {
            x = block.forward(&x, &cos, &sin)?;
            if let Some(k) = DEEPSTACK_AT.iter().position(|&at| at == i) {
                let d = self.deepstack[k].forward(&x)?;
                mlx_rs::transforms::eval([&x, &d])?;
                deepstack.push(d);
            } else {
                x.eval()?;
            }
        }
        let merged = self.merger.forward(&x)?;
        merged.eval()?;
        if merged.shape() != [n / 4, OUT] {
            bail!("视觉塔输出形状 {:?} 不是 [{}, {OUT}]", merged.shape(), n / 4);
        }
        let finite = merged.is_finite()?.all(None)?;
        finite.eval()?;
        if !finite.item::<bool>() {
            bail!("视觉塔输出了非有限值");
        }
        let [a, b, c]: [Array; 3] = deepstack.try_into().map_err(|_| anyhow::anyhow!("DeepStack 层数不对"))?;
        Ok(VisionFeatures {
            merged,
            deepstack: [a, b, c],
        })
    }
}
