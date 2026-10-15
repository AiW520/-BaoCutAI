//! Qwen-Image-2.1 单流 DiT 的 candle 流式实现（移植自 v2 `bcut-image-local::candle::dit`）。每个投影在用到时从映射的
//! MLX checkpoint 反量化；主机内存与 CUDA 显存里都不留整个模型的 dense 副本，同一时刻只留一层展开后的矩阵。
//!
//! CUDA 上另把打包的（量化的）权重留在显存里，按 [`Dit::load`] 给的预算从前往后留：第一步读入，之后各步只在显卡上展开，
//! 不再经 PCIe 重搬；超出预算的层每一步照旧从映射的文件搬。`Dit` 丢掉时一起放掉，不跨生成常驻。

use anyhow::{Context, Result, anyhow, bail};
use candle_core::{DType, Device, Tensor};
use std::path::Path;
use std::{
    cell::{Cell, RefCell},
    collections::HashMap,
};

use super::super::rope;
use super::weights::{PackedLinear, ShardedWeights};
use crate::backend::candle::is_out_of_memory;
use crate::backend::candle::layers::softmax_last_dim;
use crate::image::Cancelled;

const DIM: usize = 4096;
const INTER: usize = 12288;
const HEADS: usize = 32;
const HEAD_DIM: usize = 128;
const LAYERS: usize = 32;
const EPS: f64 = 1e-6;
const GIB: usize = 1 << 30;

/// q 先乘 1/√d 再与 k 相乘：比在 [头, q, k] 的分数上乘省一整遍读写；缩放的输出是连续的，CUDA 的矩阵乘不收转置过的 q。
fn attend(q: &Tensor, k: &Tensor, v: &Tensor, mask: Option<&Tensor>) -> Result<Tensor> {
    let q = (q * (HEAD_DIM as f64).sqrt().recip())?;
    let scores = q.matmul(&k.contiguous()?.t()?)?;
    let scores = match mask {
        Some(mask) => scores.broadcast_add(mask)?,
        None => scores,
    };
    Ok(softmax_last_dim(&scores)?.matmul(&v.contiguous()?)?)
}

/// `x` [..., in] 乘 `weight` [out, in] 的转置：摊成二维，转置交给矩阵乘的步长（不另拷一份转置的矩阵）。
fn linear(x: &Tensor, weight: &Tensor, dtype: DType) -> Result<Tensor> {
    let mut dims = x.dims().to_vec();
    let input = *dims.last().context("线性层输入至少一维")?;
    let y = x.to_dtype(dtype)?.reshape((x.elem_count() / input, input))?.matmul(&weight.t()?)?;
    *dims.last_mut().unwrap() = weight.dim(0)?;
    Ok(y.reshape(dims)?)
}

/// 先跑 `attempt`；它因 CUDA 显存不足失败、且 `release` 放掉了东西（返回 true）时再跑一次。别的错误、没东西可放与第二次的
/// 失败都原样返回。
fn retry_after_release<S, T>(
    state: &mut S,
    mut attempt: impl FnMut(&mut S) -> Result<T>,
    release: impl FnOnce(&mut S) -> Result<bool>,
) -> Result<T> {
    match attempt(state) {
        Err(error) if is_out_of_memory(&error) => {
            if release(state)? {
                attempt(state)
            } else {
                Err(error)
            }
        }
        result => result,
    }
}

/// 打包的 DiT 权重最多留在设备上多少字节：空闲的显存减去这一步的工作量（[`working_bytes`]），不够时为 0（全部流式）；
/// 不是 CUDA（`free` 为 `None`）时为 0。
pub fn resident_budget(free: Option<usize>, working: usize) -> usize {
    free.map_or(0, |free| free.saturating_sub(working))
}

/// 这个尺寸下 DiT 一步除常驻权重以外要的显存（字节）的上界估计：残差与各块输出（f32）、整张的 q/k/v 与拼起来的 k/v
/// （计算精度）、一块的注意力分数与 softmax、一层展开后的矩阵，再加 1 GiB 给 cuBLAS 的工作区、分配器的碎片与别的进程。
pub fn working_bytes(image_tokens: usize, text_tokens: usize, chunk: usize, dtype: DType) -> usize {
    let width = dtype.size_in_bytes();
    let residual = 3 * image_tokens * DIM * 4;
    let qkv = 5 * image_tokens * DIM * width;
    let scores = 2 * HEADS * chunk.min(image_tokens) * (image_tokens + text_tokens) * width;
    let layer = (4 * DIM * DIM + 3 * DIM * INTER) * width;
    residual + qkv + scores + layer + GIB
}

fn silu(x: &Tensor) -> Result<Tensor> {
    Ok(candle_nn::ops::silu(x)?)
}

fn tanh(x: &Tensor) -> Result<Tensor> {
    Ok(x.tanh()?)
}

fn norm(x: &Tensor) -> Result<Tensor> {
    let dtype = x.dtype();
    let f = x.to_dtype(DType::F32)?;
    let centered = f.broadcast_sub(&f.mean_keepdim(candle_core::D::Minus1)?)?;
    Ok(centered
        .broadcast_div(&(centered.sqr()?.mean_keepdim(candle_core::D::Minus1)? + EPS)?.sqrt()?)?
        .to_dtype(dtype)?)
}

fn rms(x: &Tensor, gamma: &Tensor) -> Result<Tensor> {
    Ok(candle_nn::ops::rms_norm(
        &x.contiguous()?,
        &gamma.to_dtype(x.dtype())?.contiguous()?,
        EPS as f32,
    )?)
}

fn modulate(x: &Tensor, scale: &Tensor) -> Result<Tensor> {
    Ok(norm(x)?.broadcast_mul(&(scale + 1.0)?)?)
}

/// 相邻两个通道是一对实部、虚部（与 MLX 实现一致），不是半分裂。
/// 输入 [1, seq, 头, d]，输出换成注意力要的 [1, 头, seq, d]（连续）。在 f32 里转（candle 的交错 RoPE 核，一遍读写），
/// 再回到输入的精度。
fn apply_rope(x: &Tensor, cos: &Tensor, sin: &Tensor) -> Result<Tensor> {
    let (batch, _, heads, width) = x.dims4()?;
    if batch != 1 || heads != HEADS || width != HEAD_DIM {
        bail!("DiT RoPE 输入形状不符");
    }
    let dtype = x.dtype();
    let heads_first = x.transpose(1, 2)?.to_dtype(DType::F32)?.contiguous()?;
    Ok(candle_nn::rotary_emb::rope_i(&heads_first, &cos.contiguous()?, &sin.contiguous()?)?.to_dtype(dtype)?)
}

fn gelu_tanh_f32(x: &Tensor) -> Result<Tensor> {
    let f = x.to_dtype(DType::F32)?;
    let cubic = f.sqr()?.broadcast_mul(&f)?;
    let inner = (&f + &(cubic * 0.044715)?)?;
    let t = (inner * (2.0 / std::f64::consts::PI).sqrt())?.tanh()?;
    Ok((f.broadcast_mul(&(t + 1.0)?)? * 0.5)?)
}

#[derive(Clone)]
struct Mod {
    scale1: Tensor,
    gate1: Tensor,
    scale2: Tensor,
    gate2: Tensor,
}

#[derive(Clone)]
struct TextPending {
    x: Tensor,
    mod_: Mod,
    cos: Tensor,
    sin: Tensor,
}

/// 文本流每层的 K、V：文本只在第一步算一遍，之后各步复用。
pub struct TextCache {
    kv: Vec<(Tensor, Tensor)>,
    text_len: usize,
    pending: Option<TextPending>,
}

pub struct Dit {
    weights: ShardedWeights,
    device: Device,
    dtype: DType,
    /// 一层的文本块与图像块都算完之前留着这层反量化出的矩阵；进下一层前清掉，CUDA 显存因此有界。
    layer_matrices: RefCell<HashMap<String, Tensor>>,
    /// 留在设备上的打包权重：按第一次用到的顺序留，直到用完预算。
    resident: RefCell<HashMap<String, PackedLinear>>,
    /// 还能再留多少字节。
    resident_budget: Cell<usize>,
}

impl Dit {
    /// `files` 是 `transformer/` 下按清单取出的 safetensors；`resident_budget` 是打包权重最多留在设备上多少字节
    /// （0 时每一步都从映射的文件重新搬）。
    pub fn load(files: &[&Path], device: &Device, dtype: DType, resident_budget: usize) -> Result<Self> {
        let weights = ShardedWeights::open(files)?;
        for i in 0..LAYERS {
            let key = format!("transformer_blocks.{i}.attn.to_q.weight");
            if !weights.contains(&key) {
                bail!("DiT 缺少第 {i} 层权重：{key}");
            }
        }
        Ok(Self {
            weights,
            device: device.clone(),
            dtype,
            layer_matrices: RefCell::new(HashMap::new()),
            resident: RefCell::new(HashMap::new()),
            resident_budget: Cell::new(resident_budget),
        })
    }

    /// 留在设备上的打包权重（字节）。
    pub fn resident_bytes(&self) -> usize {
        self.resident.borrow().values().map(PackedLinear::bytes).sum()
    }

    /// 展开一个投影的矩阵：留在设备上的直接展开；没留的从映射的文件搬上来，预算够就留下。
    fn dense(&self, prefix: &str, input: usize) -> Result<Tensor> {
        if let Some(packed) = self.resident.borrow().get(prefix) {
            return packed.dense(self.dtype);
        }
        let packed = self.weights.packed(prefix, input, &self.device)?;
        let dense = packed.dense(self.dtype)?;
        let (bytes, budget) = (packed.bytes(), self.resident_budget.get());
        if bytes <= budget {
            self.resident_budget.set(budget - bytes);
            self.resident.borrow_mut().insert(prefix.to_owned(), packed);
        }
        Ok(dense)
    }

    fn pick(&self, names: &[&str]) -> Result<String> {
        names
            .iter()
            .find(|name| self.weights.contains(&format!("{name}.weight")))
            .map(|name| (*name).to_owned())
            .ok_or_else(|| anyhow!("DiT 缺少权重：{}", names.join(" / ")))
    }

    fn proj(&self, prefix: &str, x: &Tensor, input: usize) -> Result<Tensor> {
        let mut matrices = self.layer_matrices.borrow_mut();
        if !matrices.contains_key(prefix) {
            matrices.insert(prefix.to_owned(), self.dense(prefix, input)?);
        }
        linear(x, &matrices[prefix], self.dtype)
    }

    /// 一层里每一块都要用的小向量（q/k 的 RMSNorm 权重）：这层第一次用到时读入、转成计算精度，与这层的矩阵一起清掉。
    fn vector(&self, key: &str) -> Result<Tensor> {
        let mut matrices = self.layer_matrices.borrow_mut();
        if !matrices.contains_key(key) {
            matrices.insert(key.to_owned(), self.weights.load(key, &self.device)?.to_dtype(self.dtype)?);
        }
        Ok(matrices[key].clone())
    }

    fn temb(&self, sigma: f64) -> Result<Tensor> {
        let t = bf16_round(bf16_round((sigma * 1000.0) as f32) / 1000.0);
        let mut emb = vec![0.0_f32; 256];
        for i in 0..128 {
            let f = (-(10000.0_f32.ln()) * i as f32 / 128.0).exp();
            let a = 1000.0 * t * f;
            emb[i] = a.cos();
            emb[128 + i] = a.sin();
        }
        let x = Tensor::from_vec(emb, (1, 256), &self.device)?.to_dtype(self.dtype)?;
        let p1 = self.pick(&["time_text_embed.linear_1", "time_text_embed.timestep_embedder.linear_1"])?;
        let p2 = self.pick(&["time_text_embed.linear_2", "time_text_embed.timestep_embedder.linear_2"])?;
        self.proj(&p2, &silu(&self.proj(&p1, &x, 256)?)?, DIM)
    }

    fn mods(&self, temb: &Tensor) -> Result<Mod> {
        let p = self.pick(&["modulation.0", "modulation.1"])?;
        let m = self.proj(&p, &silu(temb)?, DIM)?;
        let part = |i| Ok::<_, anyhow::Error>(m.narrow(1, i * DIM, DIM)?.reshape((1, 1, DIM))?);
        Ok(Mod {
            scale1: part(0)?,
            gate1: part(1)?,
            scale2: part(2)?,
            gate2: part(3)?,
        })
    }

    fn tables(&self, cos: &[f32], sin: &[f32], from: usize, to: usize) -> Result<(Tensor, Tensor)> {
        let n = to - from;
        Ok((
            Tensor::from_slice(&cos[from * 64..to * 64], (n, 64), &self.device)?,
            Tensor::from_slice(&sin[from * 64..to * 64], (n, 64), &self.device)?,
        ))
    }

    pub fn prepare_text(&self, encoded: &Tensor, gh: usize, gw: usize) -> Result<TextCache> {
        let len = encoded.dim(1)?;
        let (all_cos, all_sin) = rope::dit_rope_tables(len, gh, gw);
        let (cos, sin) = self.tables(&all_cos, &all_sin, 0, len)?;
        let raw_norm = self.weights.load("txt_in.text_norm.weight", &self.device)?.to_dtype(DType::F32)?;
        let gamma = (raw_norm + 1.0)?;
        let normed = rms(&encoded.to_dtype(DType::F32)?, &gamma)?.to_dtype(self.dtype)?;
        let h = gelu_tanh_f32(&self.proj("txt_in.in_layer", &normed, DIM)?)?.to_dtype(self.dtype)?;
        let x = self.proj("txt_in.out_layer", &h, DIM)?.to_dtype(DType::F32)?;
        let mod_ = self.mods(&self.temb(0.0)?)?;
        Ok(TextCache {
            kv: Vec::with_capacity(LAYERS),
            text_len: len,
            pending: Some(TextPending { x, mod_, cos, sin }),
        })
    }

    fn qkv(&self, p: &str, xm: &Tensor, cos: &Tensor, sin: &Tensor) -> Result<(Tensor, Tensor, Tensor)> {
        let seq = xm.dim(1)?;
        let q = self.proj(&format!("{p}.attn.to_q"), xm, DIM)?.reshape((1, seq, HEADS, HEAD_DIM))?;
        let k = self.proj(&format!("{p}.attn.to_k"), xm, DIM)?.reshape((1, seq, HEADS, HEAD_DIM))?;
        let v = self.proj(&format!("{p}.attn.to_v"), xm, DIM)?.reshape((1, seq, HEADS, HEAD_DIM))?;
        let qw = self.vector(&format!("{p}.attn.norm_q.weight"))?;
        let kw = self.vector(&format!("{p}.attn.norm_k.weight"))?;
        let q = apply_rope(&rms(&q, &qw)?, cos, sin)?;
        let k = apply_rope(&rms(&k, &kw)?, cos, sin)?;
        Ok((q, k, v.transpose(1, 2)?))
    }

    fn finish(&self, p: &str, x: &Tensor, attn: &Tensor, m: &Mod) -> Result<Tensor> {
        let seq = attn.dim(2)?;
        let merged = attn.transpose(1, 2)?.reshape((1, seq, DIM))?;
        let a = self.proj(&format!("{p}.attn.to_out.0"), &merged, DIM)?.to_dtype(DType::F32)?;
        let g1 = tanh(&m.gate1.to_dtype(DType::F32)?)?;
        let x = x.broadcast_add(&g1.broadcast_mul(&a)?)?;
        let xm = modulate(&x, &m.scale2.to_dtype(DType::F32)?)?;
        let gate = self.proj(&format!("{p}.img_mlp.gate_layer"), &xm, DIM)?;
        let proj = self.proj(&format!("{p}.img_mlp.proj"), &xm, DIM)?;
        let h = silu(&gate)?.broadcast_mul(&proj)?;
        let h = self.proj(&format!("{p}.img_mlp.out"), &h, INTER)?.to_dtype(DType::F32)?;
        let g2 = tanh(&m.gate2.to_dtype(DType::F32)?)?;
        Ok(x.broadcast_add(&g2.broadcast_mul(&h)?)?)
    }

    fn text_layer(&self, p: &str, pending: &mut TextPending) -> Result<(Tensor, Tensor)> {
        let xm = modulate(&pending.x, &pending.mod_.scale1.to_dtype(DType::F32)?)?;
        let (q, k, v) = self.qkv(p, &xm, &pending.cos, &pending.sin)?;
        let len = q.dim(2)?;
        let mut mask = vec![0.0_f32; len * len];
        for r in 0..len {
            for c in r + 1..len {
                mask[r * len + c] = f32::NEG_INFINITY;
            }
        }
        let mask = Tensor::from_vec(mask, (1, 1, len, len), &self.device)?.to_dtype(self.dtype)?;
        let attended = attend(&q, &k, &v, Some(&mask))?;
        pending.x = self.finish(p, &pending.x, &attended, &pending.mod_)?;
        Ok((k, v))
    }

    /// 一步去噪，返回速度场。图像 token 按 `chunk` 个一块算 q 与输出；每层之前看一次 `cancel`。
    ///
    /// 显存在量过空闲之后被别的进程占去、这一步放不下时：放掉留在设备上的权重、此后不再留，把第一步算到一半的文本缓存
    /// 还原，从这一步开头按流式重来一次。
    #[allow(clippy::too_many_arguments)]
    pub fn step(
        &self,
        cache: &mut TextCache,
        latents: &Tensor,
        sigma: f64,
        gh: usize,
        gw: usize,
        chunk: usize,
        cancel: &dyn Fn() -> bool,
    ) -> Result<Tensor> {
        let (kv, pending) = (cache.kv.len(), cache.pending.clone());
        retry_after_release(
            cache,
            |cache| self.step_once(cache, latents, sigma, gh, gw, chunk, cancel),
            |cache| {
                if self.resident.borrow().is_empty() && self.resident_budget.get() == 0 {
                    return Ok(false);
                }
                self.resident.borrow_mut().clear();
                self.resident_budget.set(0);
                self.layer_matrices.borrow_mut().clear();
                cache.kv.truncate(kv);
                cache.pending = pending;
                self.device.synchronize()?;
                Ok(true)
            },
        )
    }

    #[allow(clippy::too_many_arguments)]
    fn step_once(
        &self,
        cache: &mut TextCache,
        latents: &Tensor,
        sigma: f64,
        gh: usize,
        gw: usize,
        chunk: usize,
        cancel: &dyn Fn() -> bool,
    ) -> Result<Tensor> {
        let n = gh * gw;
        if latents.dim(1)? != n {
            bail!("DiT latent token 数不符");
        }
        let (all_cos, all_sin) = rope::dit_rope_tables(cache.text_len, gh, gw);
        let (cos, sin) = self.tables(&all_cos, &all_sin, cache.text_len, cache.text_len + n)?;
        let temb = self.temb(sigma)?;
        let mod_ = self.mods(&temb)?;
        let mut x = self.proj("img_in", &latents.to_dtype(self.dtype)?, 64)?.to_dtype(DType::F32)?;
        let chunk = chunk.max(1);
        // 第一步每一层都从文件读：后台按层序先读后面两层（冷启动时见效）。之后的步要么留在设备上，要么已在文件缓存里。
        let prefetch = cache.pending.is_some().then(|| {
            let groups = (0..LAYERS)
                .map(|i| self.weights.keys_with_prefix(&format!("transformer_blocks.{i}.")))
                .collect();
            self.weights.prefetch(groups, 2)
        });
        for i in 0..LAYERS {
            if cancel() {
                return Err(Cancelled.into());
            }
            if let Some(prefetch) = &prefetch {
                prefetch.advance(i);
            }
            self.layer_matrices.borrow_mut().clear();
            let p = format!("transformer_blocks.{i}");
            if let Some(pending) = cache.pending.as_mut() {
                cache.kv.push(self.text_layer(&p, pending)?);
            }
            let (tk, tv) = &cache.kv[i];
            let mut q_parts = Vec::new();
            let mut k_parts = vec![tk.clone()];
            let mut v_parts = vec![tv.clone()];
            for start in (0..n).step_by(chunk) {
                let len = chunk.min(n - start);
                let xm = modulate(&x.narrow(1, start, len)?, &mod_.scale1.to_dtype(DType::F32)?)?;
                let (q, k, v) = self.qkv(&p, &xm, &cos.narrow(0, start, len)?, &sin.narrow(0, start, len)?)?;
                q_parts.push(q);
                k_parts.push(k);
                v_parts.push(v);
            }
            let k_refs = k_parts.iter().collect::<Vec<_>>();
            let v_refs = v_parts.iter().collect::<Vec<_>>();
            let k = Tensor::cat(&k_refs, 2)?.contiguous()?;
            let v = Tensor::cat(&v_refs, 2)?.contiguous()?;
            drop((k_parts, v_parts));
            let mut output = Vec::with_capacity(q_parts.len());
            for (part, q) in q_parts.into_iter().enumerate() {
                let start = part * chunk;
                let len = chunk.min(n - start);
                let attended = attend(&q, &k, &v, None)?;
                output.push(self.finish(&p, &x.narrow(1, start, len)?, &attended, &mod_)?);
            }
            x = Tensor::cat(&output.iter().collect::<Vec<_>>(), 1)?;
        }
        cache.pending = None;
        self.layer_matrices.borrow_mut().clear();
        let s = self
            .proj("norm_out.linear", &silu(&temb)?, DIM)?
            .reshape((1, 1, DIM))?
            .to_dtype(DType::F32)?;
        let output = self.proj("proj_out", &modulate(&x, &s)?, DIM)?;
        Ok(output.to_dtype(DType::F32)?)
    }
}

/// f32 舍入到 bf16 的精度（就近、偶数优先），仍以 f32 返回：时间步嵌入要与参考管线的 bf16 时间步逐值一致。
pub fn bf16_round(value: f32) -> f32 {
    let bits = value.to_bits();
    let lsb = (bits >> 16) & 1;
    f32::from_bits(bits.wrapping_add(0x7fff + lsb) & 0xffff_0000)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[cfg(feature = "cuda")]
    #[test]
    #[ignore = "requires an NVIDIA CUDA device"]
    fn cuda_attention_accepts_transposed_q_heads() {
        use crate::backend::candle::layers::scaled_dot_product_attention;
        let device = Device::new_cuda(0).expect("CUDA device 0 is required");
        let qkv = Tensor::ones((1, 25, HEADS, HEAD_DIM), DType::BF16, &device).unwrap();
        let q = qkv.transpose(1, 2).unwrap();
        assert!(!q.is_contiguous());
        let k = q.contiguous().unwrap();
        let old = scaled_dot_product_attention(&q, &k, &k, (HEAD_DIM as f64).sqrt().recip(), None);
        let old_error = old.expect_err("CUDA matmul must reject the original Q layout");
        assert!(
            old_error.to_string().contains("contiguous"),
            "unexpected old-layout error: {old_error}"
        );
        let attended = attend(&q, &k, &k, None).unwrap();
        assert_eq!(attended.dims(), &[1, HEADS, 25, HEAD_DIM]);
        let values = attended
            .to_dtype(DType::F32)
            .unwrap()
            .flatten_all()
            .unwrap()
            .to_vec1::<f32>()
            .unwrap();
        assert!(values.iter().all(|value| (value - 1.0).abs() < 0.02));
    }

    #[test]
    fn residency_budget_is_free_memory_minus_the_working_set() {
        let working = working_bytes(4096, 15, 1024, DType::BF16);
        // 1024² 的工作量：激活、一块的注意力分数与一层展开后的矩阵，加 1 GiB 余量，在 2–3 GiB 之间。
        assert!((2 * GIB..3 * GIB).contains(&working), "{working}");
        assert!(working_bytes(16384, 15, 1024, DType::BF16) > working);
        assert_eq!(resident_budget(None, working), 0);
        assert_eq!(resident_budget(Some(working / 2), working), 0);
        assert_eq!(resident_budget(Some(working + 5 * GIB), working), 5 * GIB);
    }

    fn oom() -> anyhow::Error {
        anyhow!("DriverError(CUDA_ERROR_OUT_OF_MEMORY, \"out of memory\")")
    }

    /// 显存不足时放掉留着的东西再试一次；没东西可放、别的错误、第二次的失败都原样返回。
    #[test]
    fn a_step_is_retried_once_after_releasing_resident_weights() {
        let mut attempts = 0;
        let result = retry_after_release(
            &mut attempts,
            |n| {
                *n += 1;
                if *n == 1 { Err(oom()) } else { Ok(*n) }
            },
            |_| Ok(true),
        );
        assert_eq!(result.unwrap(), 2);

        let mut attempts = 0;
        let result: Result<()> = retry_after_release(
            &mut attempts,
            |n| {
                *n += 1;
                Err(oom())
            },
            |_| Ok(false),
        );
        assert!(result.is_err());
        assert_eq!(attempts, 1);

        let mut attempts = 0;
        let result: Result<()> = retry_after_release(
            &mut attempts,
            |n| {
                *n += 1;
                Err(oom())
            },
            |_| Ok(true),
        );
        assert!(result.is_err());
        assert_eq!(attempts, 2);

        let mut attempts = 0;
        let result: Result<()> = retry_after_release(
            &mut attempts,
            |n| {
                *n += 1;
                Err(anyhow!("shape mismatch"))
            },
            |_| panic!("only out-of-memory errors release resident weights"),
        );
        assert!(result.is_err());
        assert_eq!(attempts, 1);
    }

    /// 打包权重按第一次用到的顺序留在设备上，用完预算就不再留；留下的不再从文件读。
    #[test]
    fn resident_weights_fill_the_budget_in_first_use_order() {
        let dir = tempfile::tempdir().unwrap();
        let body = [1.0_f32, 2.0, 3.0, 4.0].iter().flat_map(|v| v.to_le_bytes()).collect::<Vec<_>>();
        let mut paths = Vec::new();
        for i in 0..LAYERS {
            let path = dir.path().join(format!("{i}.safetensors"));
            let key = format!("transformer_blocks.{i}.attn.to_q.weight");
            super::super::weights::tests::write_tensor(&path, &key, "F32", &[2, 2], &body);
            paths.push(path);
        }
        let files = paths.iter().map(|path| path.as_path()).collect::<Vec<_>>();
        // 每个矩阵 16 字节：40 字节的预算放得下两个。
        let dit = Dit::load(&files, &Device::Cpu, DType::F32, 40).unwrap();
        for i in 0..3 {
            let dense = dit.dense(&format!("transformer_blocks.{i}.attn.to_q"), 2).unwrap();
            assert_eq!(dense.to_vec2::<f32>().unwrap(), vec![vec![1.0, 2.0], vec![3.0, 4.0]]);
        }
        assert_eq!(dit.resident_bytes(), 32);
        assert!(dit.resident.borrow().contains_key("transformer_blocks.1.attn.to_q"));
        assert!(!dit.resident.borrow().contains_key("transformer_blocks.2.attn.to_q"));
        assert_eq!(dit.resident_budget.get(), 8);
    }

    #[test]
    fn rope_rotates_adjacent_real_imaginary_channels() {
        let pairs = [1.0_f32, 2.0].repeat(HEADS * HEAD_DIM / 2);
        let x = Tensor::from_vec(pairs, (1, 1, HEADS, HEAD_DIM), &Device::Cpu).unwrap();
        let cos = Tensor::zeros((1, HEAD_DIM / 2), DType::F32, &Device::Cpu).unwrap();
        let sin = Tensor::ones((1, HEAD_DIM / 2), DType::F32, &Device::Cpu).unwrap();
        let y = apply_rope(&x, &cos, &sin).unwrap();
        let values = y.flatten_all().unwrap().to_vec1::<f32>().unwrap();
        assert!(values.chunks_exact(2).all(|pair| pair == [-2.0, 1.0]));
    }

    #[test]
    fn bf16_rounding_keeps_the_upper_half_and_rounds_to_nearest_even() {
        assert_eq!(bf16_round(1.0), 1.0);
        // 1 + 2^-8 恰在两个 bf16 之间：偶数优先，回到 1.0；再大一点就进位到 1 + 2^-7。
        assert_eq!(bf16_round(1.0 + 2f32.powi(-8)), 1.0);
        assert_eq!(bf16_round(1.0 + 2f32.powi(-8) + 2f32.powi(-12)), 1.0 + 2f32.powi(-7));
        assert_eq!(bf16_round(0.3).to_bits() & 0xffff, 0);
    }
}
