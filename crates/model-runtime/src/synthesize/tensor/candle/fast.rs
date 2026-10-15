use super::*;
pub enum ScaledDotProductAttentionMask<'a> {
    Array(&'a Array),
    Causal,
}
pub fn rms_norm(x: impl Borrow<Array>, w: impl Borrow<Array>, eps: f32) -> Result<Array> {
    let x = x.borrow();
    let w = w.borrow().0.to_dtype(x.0.dtype())?;
    Ok(Array(candle_nn::ops::rms_norm(&x.0.contiguous()?, &w.contiguous()?, eps)?))
}
pub fn layer_norm(x: impl Borrow<Array>, w: Option<&Array>, b: Option<&Array>, eps: f32) -> Result<Array> {
    let x = x.borrow();
    // CUDA 上一个融合的核（按元素拼要十来个核）。
    #[cfg(feature = "cuda")]
    if x.0.device().is_cuda() && w.is_some() {
        return Ok(Array(crate::backend::candle::cuda_kernels::layer_norm(
            &x.0,
            w.map(|w| &w.0),
            b.map(|b| &b.0),
            eps,
        )?));
    }
    let dtype = x.0.dtype();
    let f = x.0.to_dtype(DType::F32)?;
    let f = f.broadcast_sub(&f.mean_keepdim(candle_core::D::Minus1)?)?;
    let mut out = f
        .broadcast_div(&(f.sqr()?.mean_keepdim(candle_core::D::Minus1)? + eps as f64)?.sqrt()?)?
        .to_dtype(dtype)?;
    if let Some(w) = w {
        out = out.broadcast_mul(&w.0.to_dtype(dtype)?)?
    }
    if let Some(b) = b {
        out = out.broadcast_add(&b.0.to_dtype(dtype)?)?
    }
    Ok(Array(out))
}
pub fn rope(
    x: impl Borrow<Array>,
    dims: i32,
    traditional: bool,
    base: f32,
    scale: f32,
    offset: i32,
    _freqs: Option<&Array>,
) -> Result<Array> {
    let x = x.borrow();
    let n = x.dim(-2) as usize;
    let d = dims as usize;
    if offset < 0 || dims != x.dim(-1) || !d.is_multiple_of(2) {
        bail!("invalid rotary dimensions/offset")
    }
    // Talker/Code Predictor invoke RoPE thousands of times per utterance.
    // Keep the tables resident on the device and take position views.
    if !traditional && scale == 1. {
        type Tables = HashMap<(u32, usize, DType), crate::backend::candle::layers::RopeCache>;
        thread_local! {
            static TABLES: std::cell::RefCell<Tables> = std::cell::RefCell::new(HashMap::new());
        }
        return TABLES.with(|tables| {
            let mut tables = tables.borrow_mut();
            let cache = tables
                .entry((base.to_bits(), d, x.0.dtype()))
                .or_insert_with(|| crate::backend::candle::layers::RopeCache::new(base, d, x.0.dtype(), x.0.device()));
            Ok(Array(cache.apply(&x.0, offset as usize)?))
        });
    }
    let mut cos = Vec::with_capacity(n * d / 2);
    let mut sin = Vec::with_capacity(n * d / 2);
    for p in 0..n {
        for i in 0..d / 2 {
            let angle = (p as f32 + offset as f32) * scale / base.powf((2 * i) as f32 / d as f32);
            cos.push(angle.cos());
            sin.push(angle.sin());
        }
    }
    let c = Tensor::from_vec(cos, (n, d / 2), x.0.device())?.to_dtype(x.0.dtype())?;
    let s = Tensor::from_vec(sin, (n, d / 2), x.0.device())?.to_dtype(x.0.dtype())?;
    let x = x.0.contiguous()?;
    Ok(Array(if traditional {
        candle_nn::rotary_emb::rope_i(&x, &c, &s)?
    } else {
        candle_nn::rotary_emb::rope(&x, &c, &s)?
    }))
}
pub fn scaled_dot_product_attention<'a>(
    q: impl Borrow<Array>,
    k: impl Borrow<Array>,
    v: impl Borrow<Array>,
    scale: f32,
    mask: impl Into<Option<ScaledDotProductAttentionMask<'a>>>,
    _sinks: Option<&Array>,
) -> Result<Array> {
    let q = q.borrow();
    let k = k.borrow();
    let v = v.borrow();
    let mask = match mask.into() {
        Some(ScaledDotProductAttentionMask::Array(m)) => Some(m.0.to_dtype(q.0.dtype())?),
        Some(ScaledDotProductAttentionMask::Causal) => {
            let n = q.dim(2) as usize;
            let t = k.dim(2) as usize;
            let offset = t.saturating_sub(n);
            let values = (0..n)
                .flat_map(|i| (0..t).map(move |j| if j > i + offset { f32::NEG_INFINITY } else { 0. }))
                .collect::<Vec<_>>();
            Some(Tensor::from_vec(values, (1, 1, n, t), q.0.device())?.to_dtype(q.0.dtype())?)
        }
        None => None,
    };
    Ok(Array(crate::backend::candle::layers::scaled_dot_product_attention(
        &q.0.contiguous()?,
        &gemm_ready(&k.0)?,
        &gemm_ready(&v.0)?,
        scale as f64,
        mask.as_ref(),
    )?))
}
/// 矩阵乘直接收的 [b, h, s, d] 布局：每个矩阵行连续，前两维能合成一个批次步长。KV 缓存在序列维上截出的视图就是
/// 这样（只截了序列维），原样交出去，免得每层每步把整个缓存连续化拷一遍；别的布局照旧连续化。
fn gemm_ready(x: &Tensor) -> Result<Tensor> {
    if let [_, heads, _, width] = *x.dims()
        && let [batch_stride, head_stride, row_stride, 1] = *x.stride()
        && row_stride == width
        && batch_stride == head_stride * heads
    {
        return Ok(x.clone());
    }
    Ok(x.contiguous()?)
}
