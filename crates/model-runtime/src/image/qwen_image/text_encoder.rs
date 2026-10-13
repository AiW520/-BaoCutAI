//! 文本编码器：Qwen3-VL 的语言模型部分。文生图只喂文本（M-RoPE 三轴位置相同 = 普通 1D RoPE）；改图另把视觉塔的
//! token 拼进去（[`encode_edit`]）。
//! 条件取末层 decoder 的输出（不过最终 RMSNorm），并丢掉系统提示那段前缀。
//! decoder 本体直接复用 [`crate::backend::mlx::qwen3::TextDecoder`]。
//! 提示词模板与分词在 [`super::prompt`]。v2 只给开发自检用的常驻编码器（`--check-lm` 的贪心续写）没有移植。

use super::vision::VisionFeatures;
use super::{inputs, weights};
use anyhow::{Context, Result, bail};
use mlx_rs::ops::indexing::IndexOp;
use mlx_rs::{Array, ops};
use std::collections::HashMap;
use std::fs::File;
use std::io::Read;
use std::os::unix::fs::FileExt;
use std::path::PathBuf;

use crate::backend::mlx::qwen3::{RopeTable, TextDecoder, TextDecoderConfig, WeightStore};

/// 语言模型权重的键前缀：mlx-community 4-bit 包是 `language_model.model`，ddalcu 8-bit 包
/// 保留 transformers 原名 `model.language_model`。
const PREFIXES: [&str; 2] = ["language_model.model", "model.language_model"];

fn is_lm_key(k: &str) -> bool {
    PREFIXES.iter().any(|p| k.starts_with(p) && k[p.len()..].starts_with('.'))
}

/// 从惰性表（只有文件头）认出前缀，并按第 0 层 q_proj 的形状反推 bits 与 group size：
/// 打包列数 × 32 = 4096 × bits，分组数 × group = 4096。层没量化（没有 `.scales`）时 bits 记 16，
/// 共享解码器就按原精度加载。注意共享解码器会把**没量化的 `embed_tokens`** 在加载时量化成
/// 与层相同的 bits（8-bit 包就是这样：嵌入表 bf16、层 8-bit）；[`encode_streaming`] 只把提示词
/// 用到的那几行交给它，结果不变（量化按行分组）。
fn layout(map: &HashMap<String, Array>) -> Result<(&'static str, TextDecoderConfig)> {
    let prefix = PREFIXES
        .into_iter()
        .find(|p| map.contains_key(&format!("{p}.embed_tokens.weight")))
        .context("文本编码器里找不到 embed_tokens")?;
    let mut c = TextDecoderConfig {
        hidden_size: 4096,
        layers: 36,
        heads: 32,
        kv_heads: 8,
        head_dim: 128,
        intermediate_size: 12288,
        group_size: 64,
        bits: 16,
        rope_theta: 5_000_000.0,
        rms_eps: 1e-6,
        qk_norm: true,
    };
    let q = format!("{prefix}.layers.0.self_attn.q_proj");
    let w = map.get(&format!("{q}.weight")).with_context(|| format!("缺少 {q}.weight"))?;
    if let Some(s) = map.get(&format!("{q}.scales")) {
        let input = c.hidden_size as i32;
        let (groups, packed) = (s.dim(1), w.dim(1) * 32);
        if groups == 0 || input % groups != 0 || packed % input != 0 {
            bail!(
                "{q} 的量化形状对不上 hidden {input}（权重 {:?}，scales {:?}）",
                w.shape(),
                s.shape()
            );
        }
        c.group_size = input / groups;
        c.bits = packed / input;
    }
    Ok((prefix, c))
}

/// 生成用的一次性编码：权重惰性打开，逐层流式读入（算第 i 层时预读第 i+1 层），用完即丢，
/// 常驻只有 embedding 与相邻两层。返回 `[1, L - drop_idx, 4096]` 的 bf16 条件。
///
/// 嵌入表没量化时（8-bit 包的 bf16 `[151936, 4096]`，约 1.24 GB）不整张读入：只从文件里读提示词
/// 用到的行，当成一张 `[L, 4096]` 的小表，token id 换成它的行号。共享解码器照旧把它量化再查表，
/// 而 MLX 的 affine 量化按行内分组，取行与量化可交换，条件逐位不变。
pub fn encode_streaming(files: &[PathBuf], ids: &[u32], drop_idx: usize) -> Result<Array> {
    let mut raw = weights::lazy(files, is_lm_key).context("打开文本编码器权重")?;
    let (prefix, config) = layout(&raw)?;
    let mut ids = ids.to_vec();
    if !raw.contains_key(&format!("{prefix}.embed_tokens.scales")) {
        let key = format!("{prefix}.embed_tokens.weight");
        let rows = embedding_rows(files, &key, &ids, config.hidden_size)?;
        raw.insert(key, rows);
        ids = (0..ids.len() as u32).collect();
    }
    let mut store = WeightStore::from_arrays(raw)?;
    let decoder = TextDecoder::load_with_prefix(&mut store, config, prefix)?;
    let left = store.remaining();
    if !left.is_empty() {
        bail!("文本编码器有未使用的权重：{:?}", &left[..left.len().min(3)]);
    }
    let hidden = decoder.into_hidden_prenorm(&id_array(&ids))?;
    let out = hidden.index((.., drop_idx as i32.., ..));
    out.eval()?;
    Ok(out)
}

/// 改图的条件编码（Qwen3-VL ti2i）。`ids` 是展开后的提示词（[`super::prompt::Prompter::ti2i_ids`]），`features` 与 `grids`
/// 是每张图过视觉塔的结果与合并后的网格，按占位段出现的次序。嵌入里的占位 token 整段换成视觉 token；位置是 M-RoPE
/// （[`inputs::mrope_positions`]）；第 0、1、2 层之后在图像 token 上加对应的 DeepStack 特征；注意力仍是因果的。
/// 与 [`encode_streaming`] 一样取末层输出（不过最终 RMSNorm）、丢掉系统前缀，返回 `[1, L - drop_idx, 4096]`。
pub fn encode_edit(
    files: &[PathBuf],
    ids: &[u32],
    drop_idx: usize,
    image_pad: u32,
    features: &[VisionFeatures],
    grids: &[(usize, usize)],
) -> Result<Array> {
    let runs = pad_runs(ids, image_pad);
    if runs.len() != features.len() || runs.len() != grids.len() {
        bail!("提示词里有 {} 段图像 token，视觉特征 {} 组", runs.len(), features.len());
    }
    for ((&(start, end), f), &(gh, gw)) in runs.iter().zip(features).zip(grids) {
        if f.merged.dim(0) as usize != end - start || gh * gw != end - start {
            bail!(
                "一段图像 token {} 个，视觉 token {} 个（网格 {gh}×{gw}）",
                end - start,
                f.merged.dim(0)
            );
        }
    }
    let mut raw = weights::lazy(files, is_lm_key).context("打开文本编码器权重")?;
    let (prefix, config) = layout(&raw)?;
    let mut table_ids = ids.to_vec();
    if !raw.contains_key(&format!("{prefix}.embed_tokens.scales")) {
        let key = format!("{prefix}.embed_tokens.weight");
        let rows = embedding_rows(files, &key, ids, config.hidden_size)?;
        raw.insert(key, rows);
        table_ids = (0..ids.len() as u32).collect();
    }
    let mut store = WeightStore::from_arrays(raw)?;
    let decoder = TextDecoder::load_with_prefix(&mut store, config, prefix)?;
    let left = store.remaining();
    if !left.is_empty() {
        bail!("文本编码器有未使用的权重：{:?}", &left[..left.len().min(3)]);
    }
    let embedded = decoder.embed(&id_array(&table_ids))?;
    let dtype = embedded.dtype();
    // 文本段取嵌入，图像段换成视觉 token；DeepStack 的三层增量在文本位置上是 0。
    let hidden = config.hidden_size as i32;
    let splice = |image: &dyn Fn(usize) -> Result<Array>, text: &dyn Fn(i32, i32) -> Result<Array>| -> Result<Array> {
        let mut parts = Vec::with_capacity(2 * runs.len() + 1);
        let mut cursor = 0usize;
        for (k, &(start, end)) in runs.iter().enumerate() {
            if start > cursor {
                parts.push(text(cursor as i32, start as i32)?);
            }
            parts.push(image(k)?.as_dtype(dtype)?.reshape(&[1, -1, hidden])?);
            cursor = end;
        }
        if cursor < ids.len() {
            parts.push(text(cursor as i32, ids.len() as i32)?);
        }
        Ok(ops::concatenate_axis(&parts, 1)?)
    };
    let input = splice(&|k| Ok(features[k].merged.clone()), &|a, b| Ok(embedded.index((.., a..b, ..))))?;
    input.eval()?;
    drop(embedded);
    let deepstack = (0..3)
        .map(|j| {
            splice(&|k| Ok(features[k].deepstack[j].clone()), &|a, b| {
                Ok(ops::zeros_dtype(&[1, b - a, hidden], dtype)?)
            })
        })
        .collect::<Result<Vec<_>>>()?;
    let positions = inputs::mrope_positions(ids, image_pad, grids)?;
    let (cos, sin) = inputs::mrope_table(&positions, config.head_dim, f64::from(config.rope_theta), MROPE_SECTION);
    let shape = [ids.len() as i32, config.head_dim as i32];
    let rope = RopeTable {
        cos: Array::from_slice(&cos, &shape).as_dtype(dtype)?,
        sin: Array::from_slice(&sin, &shape).as_dtype(dtype)?,
    };
    let hidden = decoder.into_hidden_prenorm_with(input, &rope, |i, h| match deepstack.get(i) {
        Some(d) => Ok(h.add(d)?),
        None => Ok(h),
    })?;
    let out = hidden.index((.., drop_idx as i32.., ..));
    out.eval()?;
    Ok(out)
}

/// Qwen3-VL 语言模型的交错 M-RoPE 分段（`rope_scaling.mrope_section`）。
const MROPE_SECTION: [usize; 3] = [24, 20, 20];

/// 连续的占位 token 段 `[start, end)`。
pub(super) fn pad_runs(ids: &[u32], pad: u32) -> Vec<(usize, usize)> {
    let mut runs = Vec::new();
    let mut i = 0;
    while i < ids.len() {
        if ids[i] == pad {
            let start = i;
            while i < ids.len() && ids[i] == pad {
                i += 1;
            }
            runs.push((start, i));
        } else {
            i += 1;
        }
    }
    runs
}

/// 从 safetensors 分片里按 `ids` 的顺序读出 bf16 嵌入表 `key` 的这些行（可重复），拼成 `[L, hidden]`。
/// 只读这些行的字节，不碰表的其余部分。
fn embedding_rows(files: &[PathBuf], key: &str, ids: &[u32], hidden: usize) -> Result<Array> {
    #[derive(serde::Deserialize)]
    struct Entry {
        dtype: String,
        shape: Vec<u64>,
        data_offsets: [u64; 2],
    }
    if ids.is_empty() {
        bail!("提示词没有 token");
    }
    for path in files {
        let mut file = File::open(path).with_context(|| format!("打开 {}", path.display()))?;
        let mut len = [0u8; 8];
        file.read_exact(&mut len)?;
        let len = u64::from_le_bytes(len);
        if len > 100 << 20 {
            bail!("{} 的 safetensors 文件头长度不对：{len}", path.display());
        }
        let mut header = vec![0u8; len as usize];
        file.read_exact(&mut header)?;
        let mut header: HashMap<String, serde_json::Value> =
            serde_json::from_slice(&header).with_context(|| format!("解析 {} 的文件头", path.display()))?;
        let Some(entry) = header.remove(key) else { continue };
        let entry: Entry = serde_json::from_value(entry).with_context(|| format!("{key} 的文件头条目"))?;
        let [start, end] = entry.data_offsets;
        let vocab = match entry.shape[..] {
            [vocab, h] if h == hidden as u64 => vocab,
            _ => bail!("{key} 的形状 {:?} 不是 [vocab, {hidden}]", entry.shape),
        };
        if entry.dtype != "BF16" || end.checked_sub(start) != Some(vocab * hidden as u64 * 2) {
            bail!("{key} 不是 bf16 [{vocab}, {hidden}]（{}，{start}..{end}）", entry.dtype);
        }
        let base = 8 + len + start;
        let mut row = vec![0u8; hidden * 2];
        let mut values = Vec::with_capacity(ids.len() * hidden);
        for &id in ids {
            if u64::from(id) >= vocab {
                bail!("token id {id} 超出词表 {vocab}");
            }
            file.read_exact_at(&mut row, base + u64::from(id) * hidden as u64 * 2)?;
            // bf16 是 f32 的高 16 位：扩成 f32 再转回 bf16 逐位不变。
            values.extend(
                row.chunks_exact(2)
                    .map(|b| f32::from_bits(u32::from(u16::from_le_bytes([b[0], b[1]])) << 16)),
            );
        }
        return Ok(Array::from_slice(&values, &[ids.len() as i32, hidden as i32]).as_dtype(mlx_rs::Dtype::Bfloat16)?);
    }
    bail!("文本编码器里找不到 {key}")
}

fn id_array(ids: &[u32]) -> Array {
    Array::from_slice(&ids.iter().map(|&v| v as i32).collect::<Vec<_>>(), &[1, ids.len() as i32])
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::backend::mlx::runtime::MLX_TEST_LOCK;
    use mlx_rs::{Dtype, ops};

    /// 读出的行与整张表取行逐位相同；取行再量化与量化再取行逐位相同（8-bit 包靠这个保证条件不变）。
    #[test]
    fn embedding_rows_match_full_table_gather() -> Result<()> {
        let _lock = MLX_TEST_LOCK.lock().unwrap_or_else(|poison| poison.into_inner());
        let (vocab, hidden) = (40usize, 128usize);
        let table: Vec<f32> = (0..vocab * hidden).map(|i| (i as f32 * 0.37).sin() * 3.0).collect();
        let table = Array::from_slice(&table, &[vocab as i32, hidden as i32]).as_dtype(Dtype::Bfloat16)?;
        let other = Array::from_slice(&[1.0_f32, 2.0], &[2]).as_dtype(Dtype::Bfloat16)?;
        let dir = tempfile::tempdir()?;
        let path = dir.path().join("model.safetensors");
        Array::save_safetensors(
            HashMap::from([("emb.weight".to_owned(), &table), ("a.weight".to_owned(), &other)]),
            None,
            &path,
        )?;

        let files = [path];
        let ids = [7u32, 0, 39, 7, 12];
        let rows = embedding_rows(&files, "emb.weight", &ids, hidden)?;
        let index = id_array(&ids).flatten(None, None)?;
        let gathered = table.index(&index);
        assert_eq!(rows.dtype(), Dtype::Bfloat16);
        assert!(rows.array_eq(&gathered, None)?.item::<bool>());

        for bits in [4, 8] {
            let (w, s, b) = ops::quantize(&table, 64, bits)?;
            let full = ops::dequantize(w.index(&index), s.index(&index), &b.index(&index), 64, bits)?;
            let (w, s, b) = ops::quantize(&rows, 64, bits)?;
            let small = ops::dequantize(&w, &s, &b, 64, bits)?;
            assert!(full.array_eq(&small, None)?.item::<bool>(), "bits {bits}");
        }

        assert!(embedding_rows(&files, "emb.weight", &[40], hidden).is_err());
        assert!(embedding_rows(&files, "emb.weight", &[1], 64).is_err());
        assert!(embedding_rows(&files, "missing.weight", &[1], hidden).is_err());
        Ok(())
    }

    #[test]
    fn pad_runs_are_maximal_and_in_order() {
        assert_eq!(pad_runs(&[1, 9, 9, 2, 9, 3, 9], 9), [(1, 3), (4, 5), (6, 7)]);
        assert!(pad_runs(&[1, 2], 9).is_empty());
    }

    /// 改图的编码路径（M-RoPE 表 + 逐层回调）在没有图时与文生图路径（`fast::rope`）给出同一条件，只差舍入。表按参考实现
    /// 取 bf16（`fast::rope` 在 f32 里转），36 层传下来余弦约 0.9987（改成 f32 表也一样）；旋转的排布错了（交错式）是 0.90。
    ///
    /// ```sh
    /// BAOCUT_QWEN_IMAGE_DIR=/path/to/pack cargo test -p model-runtime --release --lib -- --ignored \
    ///   edit_path_without_images_matches_the_text_path --nocapture
    /// ```
    #[test]
    #[ignore = "需要 BAOCUT_QWEN_IMAGE_DIR 下的 Qwen-Image-2.1 权重包与 Metal"]
    fn edit_path_without_images_matches_the_text_path() -> Result<()> {
        let _lock = MLX_TEST_LOCK.lock().unwrap_or_else(|poison| poison.into_inner());
        let dir = std::path::PathBuf::from(std::env::var("BAOCUT_QWEN_IMAGE_DIR").expect("BAOCUT_QWEN_IMAGE_DIR"));
        let mut files: Vec<PathBuf> = std::fs::read_dir(dir.join("text_encoder"))?
            .map(|e| e.unwrap().path())
            .filter(|p| p.extension().is_some_and(|e| e == "safetensors"))
            .collect();
        files.sort();
        let prompter = super::super::prompt::Prompter::load(&dir.join("processor/tokenizer.json"))?;
        let ids = prompter.t2i_ids("a red apple on a wooden table, studio light");
        let pad = prompter.added_id(super::super::prompt::IMAGE_PAD).unwrap();
        let text = encode_streaming(&files, &ids, prompter.drop_idx())?.as_dtype(Dtype::Float32)?;
        let edit = encode_edit(&files, &ids, prompter.drop_idx(), pad, &[], &[])?.as_dtype(Dtype::Float32)?;
        assert_eq!(text.shape(), edit.shape());
        let diff = text.subtract(&edit)?.abs()?;
        let rel = diff.sum(None)?.divide(&text.abs()?.sum(None)?)?;
        let cos = text
            .multiply(&edit)?
            .sum(None)?
            .divide(&text.square()?.sum(None)?.sqrt()?.multiply(&edit.square()?.sum(None)?.sqrt()?)?)?;
        eprintln!("相对 L1 差 {}，余弦 {}", rel.item::<f32>(), cos.item::<f32>());
        assert!(cos.item::<f32>() > 0.995, "余弦 {}", cos.item::<f32>());
        Ok(())
    }
}
