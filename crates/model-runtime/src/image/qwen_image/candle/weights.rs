//! 从映射的 MLX safetensors 分片里一次只读一个张量（移植自 v2 `bcut-image-local::candle::weights`）。
//!
//! candle 普通的 `safetensors::load` 会把每个张量一次性搬到设备上；图像模型的权重比一般显卡的显存大得多，所以映射与
//! 张量搬运的生命周期刻意分开。与 v2 唯一的不同：v2 按目录扫 `*.safetensors`，这里读调用方按清单取出的文件
//! （[`crate::bundle::VerifiedFiles::require_extension_in`]）。
//!
//! 冷启动（权重不在系统的文件缓存里）时，从映射里读是按页缺页、一次只读几十 KB，机械硬盘上比顺序的大块读慢好几倍。
//! [`ShardedWeights::prefetch`] 在后台线程里按用到的顺序把后面几层用大块读一遍，读进的页与映射共用同一份文件缓存。

use anyhow::{Context, Result, anyhow, bail};
use candle_core::safetensors::Load;
use candle_core::{DType, Device, Tensor};
use memmap2::{Mmap, MmapOptions};
use safetensors::SafeTensors;
use safetensors::tensor::TensorView;
use std::collections::HashMap;
use std::fs::File;
use std::io::{Read, Seek, SeekFrom};
use std::path::{Path, PathBuf};
use std::sync::Arc;
use std::sync::atomic::{AtomicBool, AtomicUsize, Ordering};
use std::thread::JoinHandle;

use crate::backend::candle::weights::{dequantize_affine, dequantize_affine_to};

struct Shard {
    path: PathBuf,
    data: Mmap,
}

/// 一个张量在哪个分片、文件里的哪段字节（打开时从 safetensors 头读出，之后不再解析头）。
struct Entry {
    shard: usize,
    dtype: safetensors::Dtype,
    shape: Vec<usize>,
    start: usize,
    end: usize,
}

/// safetensors 分片一直映射在主机的虚拟内存里。只有请求的张量会拷到目标设备上；层算完后丢掉返回的张量，
/// 那份设备内存就放掉了。
pub struct ShardedWeights {
    shards: Vec<Shard>,
    index: HashMap<String, Entry>,
}

/// 后台的预读：按组（一组是一层的张量）的顺序读，至多领先 [`Prefetch::advance`] 报的那组 `ahead` 组。丢掉时停下并等线程退出。
pub struct Prefetch {
    stop: Arc<AtomicBool>,
    consumed: Arc<AtomicUsize>,
    worker: Option<JoinHandle<()>>,
}

impl Prefetch {
    /// 主线程开始用第 `group` 组了。
    pub fn advance(&self, group: usize) {
        self.consumed.store(group, Ordering::Release);
    }
}

impl Drop for Prefetch {
    fn drop(&mut self) {
        self.stop.store(true, Ordering::Release);
        if let Some(worker) = self.worker.take() {
            let _ = worker.join();
        }
    }
}

/// 一个线性层留在设备上的原始权重：MLX 仿射量化的打包 u32 加每组的 scales 与 biases（8-bit 约为展开后 bf16 的一半大，
/// 4-bit 约四分之一），或不量化的浮点矩阵。
pub struct PackedLinear {
    weight: Tensor,
    quantized: Option<Quantized>,
}

struct Quantized {
    scales: Tensor,
    biases: Tensor,
    group: usize,
    bits: usize,
}

impl PackedLinear {
    /// 占用的设备内存（字节）。
    pub fn bytes(&self) -> usize {
        let size = |t: &Tensor| t.elem_count() * t.dtype().size_in_bytes();
        size(&self.weight) + self.quantized.as_ref().map_or(0, |q| size(&q.scales) + size(&q.biases))
    }

    /// 展开成 `dtype` 的 [out, in] 矩阵，与权重在同一设备上。
    pub fn dense(&self, dtype: DType) -> Result<Tensor> {
        match &self.quantized {
            None => Ok(self.weight.to_dtype(dtype)?),
            Some(q) => dequantize_affine_to(&self.weight, &q.scales, &q.biases, q.group, q.bits, dtype),
        }
    }
}

impl ShardedWeights {
    /// 打开给定的分片（按路径排序后建索引）。
    pub fn open(files: &[&Path]) -> Result<Self> {
        let mut paths = files.iter().map(|path| path.to_path_buf()).collect::<Vec<_>>();
        paths.sort();
        if paths.is_empty() {
            bail!("没有 safetensors 权重");
        }
        let mut shards = Vec::with_capacity(paths.len());
        let mut index = HashMap::new();
        for path in paths {
            let file = File::open(&path).with_context(|| format!("打开 {}", path.display()))?;
            // SAFETY: 映射只读，建映射时文件一直开着，BaoCut 的代码不改模型权重。
            let data = unsafe { MmapOptions::new().map(&file) }.with_context(|| format!("映射 {}", path.display()))?;
            let (header, metadata) = SafeTensors::read_metadata(&data).with_context(|| format!("解析 {}", path.display()))?;
            let base = 8 + header;
            for (key, info) in metadata.tensors() {
                let (start, end) = (base + info.data_offsets.0, base + info.data_offsets.1);
                if end > data.len() {
                    bail!("{} 里 {key} 的数据越过文件末尾", path.display());
                }
                let entry = Entry {
                    shard: shards.len(),
                    dtype: info.dtype,
                    shape: info.shape.clone(),
                    start,
                    end,
                };
                if index.insert(key.clone(), entry).is_some() {
                    bail!("重复权重键：{key}");
                }
            }
            shards.push(Shard { path, data });
        }
        Ok(Self { shards, index })
    }

    pub fn contains(&self, key: &str) -> bool {
        self.index.contains_key(key)
    }

    /// 以 `prefix` 开头的键（一层的张量），按在文件里的位置排。
    pub fn keys_with_prefix(&self, prefix: &str) -> Vec<String> {
        let mut keys = self
            .index
            .iter()
            .filter(|(key, _)| key.starts_with(prefix))
            .map(|(key, entry)| (entry.shard, entry.start, key.clone()))
            .collect::<Vec<_>>();
        keys.sort_unstable();
        keys.into_iter().map(|(_, _, key)| key).collect()
    }

    fn entry(&self, key: &str) -> Result<(&Entry, &Shard)> {
        let entry = self.index.get(key).ok_or_else(|| anyhow!("缺少权重：{key}"))?;
        Ok((entry, self.shards.get(entry.shard).context("权重分片索引越界")?))
    }

    fn view(&self, key: &str) -> Result<(TensorView<'_>, &Path)> {
        let (entry, shard) = self.entry(key)?;
        let view = TensorView::new(entry.dtype, entry.shape.clone(), &shard.data[entry.start..entry.end])
            .with_context(|| format!("{key} 的形状与数据长度不符（{}）", shard.path.display()))?;
        Ok((view, &shard.path))
    }

    /// 只看形状与类型，不分配设备张量。
    pub fn metadata(&self, key: &str) -> Result<(Vec<usize>, safetensors::Dtype)> {
        let (entry, _) = self.entry(key)?;
        Ok((entry.shape.clone(), entry.dtype))
    }

    pub fn load(&self, key: &str, device: &Device) -> Result<Tensor> {
        let (view, path) = self.view(key)?;
        view.load(device).with_context(|| format!("读取权重 {key} ({})", path.display()))
    }

    /// 在后台线程里按 `groups` 的顺序把每组张量在文件里的字节用大块读一遍（读进系统的文件缓存，不留副本），至多领先
    /// [`Prefetch::advance`] 报的那组 `ahead` 组。读不了的就跳过：预读只影响快慢。
    pub fn prefetch(&self, groups: Vec<Vec<String>>, ahead: usize) -> Prefetch {
        let ranges = groups
            .iter()
            .map(|keys| {
                let mut ranges = keys
                    .iter()
                    .filter_map(|key| self.index.get(key))
                    .map(|entry| (entry.shard, entry.start, entry.end))
                    .collect::<Vec<_>>();
                ranges.sort_unstable();
                ranges
            })
            .collect::<Vec<_>>();
        let paths = self.shards.iter().map(|shard| shard.path.clone()).collect::<Vec<_>>();
        let stop = Arc::new(AtomicBool::new(false));
        let consumed = Arc::new(AtomicUsize::new(0));
        let worker = {
            let (stop, consumed) = (stop.clone(), consumed.clone());
            std::thread::Builder::new()
                .name("weights-prefetch".into())
                .spawn(move || read_ahead(&paths, &ranges, ahead, &stop, &consumed))
                .ok()
        };
        Prefetch { stop, consumed, worker }
    }

    /// 二维张量只按 `ids` 读出那几行（行在文件里连续）：不把整张表搬进内存。
    fn rows(&self, key: &str, ids: &[u32]) -> Result<Tensor> {
        let (view, _) = self.view(key)?;
        let &[count, width] = view.shape() else {
            bail!("{key} 不是二维张量");
        };
        let row_bits = width * view.dtype().bitsize();
        if !row_bits.is_multiple_of(8) {
            bail!("{key} 的一行不是整字节");
        }
        let row_bytes = row_bits / 8;
        let data = view.data();
        if data.len() != count * row_bytes {
            bail!("{key} 的数据长度与形状不符");
        }
        let mut selected = Vec::with_capacity(ids.len() * row_bytes);
        for &id in ids {
            let id = id as usize;
            if id >= count {
                bail!("{key} 的行号 {id} 越过行数 {count}");
            }
            selected.extend_from_slice(&data[id * row_bytes..(id + 1) * row_bytes]);
        }
        TensorView::new(view.dtype(), vec![ids.len(), width], &selected)?
            .load(&Device::Cpu)
            .with_context(|| format!("读取权重 {key} 的行"))
    }

    /// 读出并展开一个线性层的 [out, in] 矩阵（`dtype`，放在 `device` 上）；临时分配在返回时就放掉。
    pub fn linear(&self, prefix: &str, input: usize, device: &Device, dtype: DType) -> Result<Tensor> {
        self.packed(prefix, input, device)?.dense(dtype)
    }

    /// 一个线性层的原始权重，原样从映射的文件搬到 `device` 上（不展开）。MLX 仿射量化的矩阵是打包的 u32 加每组的
    /// scales 与 biases，[`PackedLinear::dense`] 时才展开：CPU 上在主机内存里展开；CUDA 上只经 PCIe 搬打包的权重、
    /// 在显卡上展开，两者的 bf16 逐位相同。
    pub fn packed(&self, prefix: &str, input: usize, device: &Device) -> Result<PackedLinear> {
        let weight = self.load(&format!("{prefix}.weight"), device)?;
        if !self.contains(&format!("{prefix}.scales")) {
            return Ok(PackedLinear { weight, quantized: None });
        }
        let scales = self.load(&format!("{prefix}.scales"), device)?;
        let biases = self.load(&format!("{prefix}.biases"), device)?;
        let (rows, columns) = weight.dims2()?;
        let (scale_rows, groups) = scales.dims2()?;
        if groups == 0 || rows != scale_rows || !input.is_multiple_of(groups) {
            bail!("{prefix} 的量化分组形状与输入维 {input} 不符");
        }
        let packed_bits = columns.checked_mul(32).context("量化维度溢出")?;
        if !packed_bits.is_multiple_of(input) {
            bail!("{prefix} 的打包列数与输入维 {input} 不符");
        }
        let bits = packed_bits / input;
        if !matches!(bits, 4 | 8) {
            bail!("{prefix} 的量化位宽 {bits} 不受支持");
        }
        Ok(PackedLinear {
            weight,
            quantized: Some(Quantized {
                scales,
                biases,
                group: input / groups,
                bits,
            }),
        })
    }

    /// 词嵌入先按提示词的 token 从映射的文件里只读那几行、再反量化：Qwen3-VL 的整张词表展开会在主机内存里占好几 GB，
    /// 不量化的 bf16 词表（mlx-serve 的包）整张读入也要 1.2 GB，而一句提示词只用到几十行。
    pub fn embedding_rows(&self, prefix: &str, ids: &[u32], width: usize, device: &Device, dtype: DType) -> Result<Tensor> {
        let rows = self.metadata(&format!("{prefix}.weight"))?.0.first().copied().unwrap_or(0);
        if ids.iter().any(|&id| id as usize >= rows) {
            bail!("{prefix} 的 token ID 越过词表大小 {rows}");
        }
        let selected = self.rows(&format!("{prefix}.weight"), ids)?;
        if !self.contains(&format!("{prefix}.scales")) {
            if selected.dim(1)? != width {
                bail!("{prefix} 的词向量维度不符");
            }
            return Ok(selected.to_dtype(dtype)?.to_device(device)?);
        }
        let scales = self.rows(&format!("{prefix}.scales"), ids)?;
        let biases = self.rows(&format!("{prefix}.biases"), ids)?;
        let packed_bits = selected.dim(1)?.checked_mul(32).context("词嵌入维度溢出")?;
        if !packed_bits.is_multiple_of(width) {
            bail!("{prefix} 的打包词向量维度不符");
        }
        let bits = packed_bits / width;
        if !matches!(bits, 4 | 8) || scales.dim(1)? == 0 || !width.is_multiple_of(scales.dim(1)?) {
            bail!("{prefix} 的词嵌入量化配置不受支持");
        }
        let dense = dequantize_affine(&selected, &scales, &biases, width / scales.dim(1)?, bits)?;
        Ok(dense.to_dtype(dtype)?.to_device(device)?)
    }
}

/// [`ShardedWeights::prefetch`] 的线程体：相邻的字节段合成一段，每次读 8 MiB。
fn read_ahead(paths: &[PathBuf], groups: &[Vec<(usize, usize, usize)>], ahead: usize, stop: &AtomicBool, consumed: &AtomicUsize) {
    const CHUNK: usize = 8 << 20;
    let mut files = paths.iter().map(|path| File::open(path).ok()).collect::<Vec<_>>();
    let mut buffer = vec![0_u8; CHUNK];
    for (group, ranges) in groups.iter().enumerate() {
        while group > consumed.load(Ordering::Acquire) + ahead {
            if stop.load(Ordering::Acquire) {
                return;
            }
            std::thread::sleep(std::time::Duration::from_millis(2));
        }
        let mut merged: Vec<(usize, usize, usize)> = Vec::new();
        for &(shard, start, end) in ranges {
            match merged.last_mut() {
                Some(last) if last.0 == shard && start <= last.2 + CHUNK => last.2 = last.2.max(end),
                _ => merged.push((shard, start, end)),
            }
        }
        for (shard, start, end) in merged {
            let Some(Some(file)) = files.get_mut(shard) else {
                continue;
            };
            if file.seek(SeekFrom::Start(start as u64)).is_err() {
                continue;
            }
            let mut at = start;
            while at < end {
                if stop.load(Ordering::Acquire) {
                    return;
                }
                let take = CHUNK.min(end - at);
                match file.read(&mut buffer[..take]) {
                    Ok(0) | Err(_) => break,
                    Ok(read) => at += read,
                }
            }
        }
    }
}

#[cfg(test)]
pub(super) mod tests {
    use super::*;

    /// 写一个只有一个张量的 safetensors 文件（别的模块的测试也用）。
    pub(crate) fn write_tensor(path: &Path, key: &str, dtype: &str, shape: &[usize], body: &[u8]) {
        let mut header = format!(
            "{{\"{key}\":{{\"dtype\":\"{dtype}\",\"shape\":{shape:?},\"data_offsets\":[0,{}]}}}}",
            body.len()
        );
        while !header.len().is_multiple_of(8) {
            header.push(' ');
        }
        let mut bytes = (header.len() as u64).to_le_bytes().to_vec();
        bytes.extend_from_slice(header.as_bytes());
        bytes.extend_from_slice(body);
        std::fs::write(path, bytes).unwrap();
    }

    fn open(dir: &Path, names: &[&str]) -> Result<ShardedWeights> {
        let paths = names.iter().map(|name| dir.join(name)).collect::<Vec<_>>();
        ShardedWeights::open(&paths.iter().map(PathBuf::as_path).collect::<Vec<_>>())
    }

    #[test]
    fn reads_only_requested_tensor_from_mapped_shards() {
        let dir = tempfile::tempdir().unwrap();
        write_tensor(
            &dir.path().join("model.safetensors"),
            "test.weight",
            "F32",
            &[1, 2],
            &[0, 0, 128, 63, 0, 0, 0, 64],
        );
        let weights = open(dir.path(), &["model.safetensors"]).unwrap();
        assert!(weights.contains("test.weight"));
        assert!(!weights.contains("other.weight"));
        assert_eq!(weights.metadata("test.weight").unwrap().0, vec![1, 2]);
        assert_eq!(
            weights.load("test.weight", &Device::Cpu).unwrap().to_vec2::<f32>().unwrap(),
            vec![vec![1.0, 2.0]]
        );
    }

    #[test]
    fn expands_mlx_four_bit_affine_matrix_on_cpu() {
        let dir = tempfile::tempdir().unwrap();
        // 8 个低位在前的 4 位值（0..7），一组 8 个。
        let packed = (0..8_u32).fold(0_u32, |word, q| word | (q << (4 * q)));
        write_tensor(
            &dir.path().join("a.safetensors"),
            "layer.weight",
            "U32",
            &[1, 1],
            &packed.to_le_bytes(),
        );
        write_tensor(
            &dir.path().join("b.safetensors"),
            "layer.scales",
            "F32",
            &[1, 1],
            &0.5_f32.to_le_bytes(),
        );
        write_tensor(
            &dir.path().join("c.safetensors"),
            "layer.biases",
            "F32",
            &[1, 1],
            &1.0_f32.to_le_bytes(),
        );
        let weights = open(dir.path(), &["a.safetensors", "b.safetensors", "c.safetensors"]).unwrap();
        let dense = weights.linear("layer", 8, &Device::Cpu, DType::F32).unwrap();
        assert_eq!(
            dense.to_vec2::<f32>().unwrap(),
            vec![(0..8).map(|n| 1.0 + n as f32 * 0.5).collect::<Vec<_>>()]
        );
    }

    #[test]
    fn selects_quantized_embedding_rows_before_expansion() {
        let dir = tempfile::tempdir().unwrap();
        let words = [0x7654_3210_u32, 0x7777_7777];
        let packed = words.iter().flat_map(|word| word.to_le_bytes()).collect::<Vec<_>>();
        write_tensor(&dir.path().join("a.safetensors"), "embed.weight", "U32", &[2, 1], &packed);
        write_tensor(
            &dir.path().join("b.safetensors"),
            "embed.scales",
            "F32",
            &[2, 1],
            &[0.5_f32.to_le_bytes(), 0.5_f32.to_le_bytes()].concat(),
        );
        write_tensor(
            &dir.path().join("c.safetensors"),
            "embed.biases",
            "F32",
            &[2, 1],
            &[1.0_f32.to_le_bytes(), 1.0_f32.to_le_bytes()].concat(),
        );
        let weights = open(dir.path(), &["a.safetensors", "b.safetensors", "c.safetensors"]).unwrap();
        let selected = weights
            .embedding_rows("embed", &[1, 0, 1], 8, &Device::Cpu, DType::F32)
            .unwrap()
            .to_vec2::<f32>()
            .unwrap();
        assert_eq!(selected[0], vec![4.5; 8]);
        assert_eq!(selected[1], (0..8).map(|n| 1.0 + n as f32 * 0.5).collect::<Vec<_>>());
        assert_eq!(selected[2], selected[0]);
        assert!(weights.embedding_rows("embed", &[2], 8, &Device::Cpu, DType::F32).is_err());
    }

    /// 不量化的词表（mlx-serve 的 bf16）：只读挑中的行，换成计算精度。
    #[test]
    fn selects_unquantized_bf16_embedding_rows() {
        let dir = tempfile::tempdir().unwrap();
        // 三行两列的 bf16：第 r 行是 [r+1, -(r+1)]（bf16 是 f32 的高 16 位）。
        let body = (1..=3)
            .flat_map(|r| [r as f32, -(r as f32)])
            .flat_map(|v| ((v.to_bits() >> 16) as u16).to_le_bytes())
            .collect::<Vec<_>>();
        write_tensor(&dir.path().join("a.safetensors"), "embed.weight", "BF16", &[3, 2], &body);
        let weights = open(dir.path(), &["a.safetensors"]).unwrap();
        let selected = weights
            .embedding_rows("embed", &[2, 0, 2], 2, &Device::Cpu, DType::F32)
            .unwrap()
            .to_vec2::<f32>()
            .unwrap();
        assert_eq!(selected, vec![vec![3.0, -3.0], vec![1.0, -1.0], vec![3.0, -3.0]]);
        assert!(weights.embedding_rows("embed", &[3], 2, &Device::Cpu, DType::F32).is_err());
        assert!(weights.embedding_rows("embed", &[0], 4, &Device::Cpu, DType::F32).is_err());
    }

    /// 按前缀列出一层的键；预读线程在主线程没跟上时等着，丢掉句柄就停下（不卡住）。
    #[test]
    fn prefetch_waits_for_the_consumer_and_stops_when_dropped() {
        let dir = tempfile::tempdir().unwrap();
        write_tensor(&dir.path().join("a.safetensors"), "layers.0.w", "F32", &[1], &1.0_f32.to_le_bytes());
        write_tensor(&dir.path().join("b.safetensors"), "layers.1.w", "F32", &[1], &2.0_f32.to_le_bytes());
        let weights = open(dir.path(), &["a.safetensors", "b.safetensors"]).unwrap();
        assert_eq!(weights.keys_with_prefix("layers.1."), vec!["layers.1.w".to_owned()]);
        assert!(weights.keys_with_prefix("layers.2.").is_empty());
        let groups = vec![weights.keys_with_prefix("layers.0."), weights.keys_with_prefix("layers.1."), vec![]];
        let prefetch = weights.prefetch(groups, 0);
        std::thread::sleep(std::time::Duration::from_millis(20));
        let started = std::time::Instant::now();
        drop(prefetch);
        assert!(started.elapsed() < std::time::Duration::from_secs(1));
        assert_eq!(
            weights.load("layers.1.w", &Device::Cpu).unwrap().to_vec1::<f32>().unwrap(),
            vec![2.0]
        );
    }

    #[test]
    fn rejects_duplicate_tensor_keys_across_shards() {
        let dir = tempfile::tempdir().unwrap();
        for name in ["a.safetensors", "b.safetensors"] {
            write_tensor(&dir.path().join(name), "same.weight", "F32", &[1], &1.0_f32.to_le_bytes());
        }
        let error = open(dir.path(), &["a.safetensors", "b.safetensors"]).err().unwrap();
        assert!(error.to_string().contains("重复权重键"), "{error}");
        assert!(ShardedWeights::open(&[]).is_err());
    }
}
