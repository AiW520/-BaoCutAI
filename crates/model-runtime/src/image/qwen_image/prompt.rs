//! 文本编码器的输入：文生图提示词模板与分词。纯逻辑，全平台编译。
//!
//! 分词：v2 用 HF `tokenizers` crate 读 `processor/tokenizer.json`；这里用纯 Rust 的 Qwen2 BPE
//! （[`super::tokenizer::Tokenizer`]：added token 先切出、NFC、Qwen2 预切分正则、byte-level BPE，不加 BOS / EOS），
//! 不为它再引一个分词库。

use anyhow::{Context, Result, bail};
use std::path::Path;

use super::tokenizer::Tokenizer;

/// 管线的系统提示；编码器输出里这一段（[`Prompter::drop_idx`] 个 token）被丢掉。
pub const SYSTEM: &str = "<|im_start|>system\nComprehend and analyze the provided prompt.<|im_end|>\n";

pub struct Prompter {
    tokenizer: Tokenizer,
    drop_idx: usize,
}

impl Prompter {
    /// `tokenizer` 是 `processor/tokenizer.json`。
    pub fn load(tokenizer: &Path) -> Result<Self> {
        let tokenizer = Tokenizer::load(tokenizer)?;
        let drop_idx = tokenizer.encode(SYSTEM).len();
        Ok(Self { tokenizer, drop_idx })
    }

    pub fn drop_idx(&self) -> usize {
        self.drop_idx
    }

    /// 文生图模板（管线的 `prompt_template_t2i`）。空提示按管线换成一个空格。
    pub fn t2i_ids(&self, prompt: &str) -> Vec<u32> {
        let prompt = if prompt.is_empty() { " " } else { prompt };
        let text = format!("{SYSTEM}<|im_start|>user\n{prompt}<|im_end|>\n<|im_start|>assistant\n");
        self.tokenizer.encode(&text)
    }

    /// 改图模板（管线的 `prompt_template_ti2i`）：第 k 张图是 `<imagek><|vision_start|><|image_pad|><|vision_end|>`，第二张起
    /// 前面隔一个空格，提示词紧跟在最后一个 `<|vision_end|>` 之后。每个 `<|image_pad|>` 展开成 `pads[k]` 个（这张图合并后的
    /// 视觉 token 数，图像处理器的占位展开）。
    pub fn ti2i_ids(&self, prompt: &str, pads: &[usize]) -> Result<Vec<u32>> {
        let pad = self.added_id(IMAGE_PAD).with_context(|| format!("分词表里没有 {IMAGE_PAD}"))?;
        let prompt = if prompt.is_empty() { " " } else { prompt };
        let images: Vec<String> = (1..=pads.len())
            .map(|k| format!("<image{k}><|vision_start|>{IMAGE_PAD}<|vision_end|>"))
            .collect();
        let text = format!(
            "{SYSTEM}<|im_start|>user\n{}{prompt}<|im_end|>\n<|im_start|>assistant\n",
            images.join(" ")
        );
        expand_pads(&self.tokenizer.encode(&text), pad, pads)
    }

    pub fn added_id(&self, token: &str) -> Option<u32> {
        self.tokenizer.added_id(token)
    }
}

/// 视觉 token 的占位符。
pub const IMAGE_PAD: &str = "<|image_pad|>";

/// 把第 k 个 `pad` 展开成 `counts[k]` 个。占位符个数必须与图数相同：两边一个来自模板、一个来自视觉塔的网格，对不上是前处理的错。
fn expand_pads(ids: &[u32], pad: u32, counts: &[usize]) -> Result<Vec<u32>> {
    let found = ids.iter().filter(|&&id| id == pad).count();
    if found != counts.len() {
        bail!("提示词里有 {found} 个 {IMAGE_PAD}，图有 {} 张", counts.len());
    }
    let mut counts = counts.iter();
    let mut out = Vec::with_capacity(ids.len() + counts.clone().sum::<usize>());
    for &id in ids {
        if id == pad {
            let n = *counts.next().expect("个数已核对");
            out.extend(std::iter::repeat_n(pad, n));
        } else {
            out.push(id);
        }
    }
    Ok(out)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn image_pads_expand_in_order_and_must_match_the_image_count() {
        let ids = [11, 9, 22, 9, 33];
        assert_eq!(expand_pads(&ids, 9, &[2, 3]).unwrap(), [11, 9, 9, 22, 9, 9, 9, 33]);
        assert!(expand_pads(&ids, 9, &[2]).is_err());
        assert!(expand_pads(&ids, 9, &[2, 3, 4]).is_err());
    }

    /// 需要真实权重：`BAOCUT_TEST_MODELS_DIR` 下的 `mlx-community/Qwen-Image-2.1-MLX-4bit`。
    #[test]
    #[ignore = "需要 BAOCUT_TEST_MODELS_DIR 下的 mlx-community/Qwen-Image-2.1-MLX-4bit"]
    fn template_tokens_are_single_ids_and_the_system_prefix_is_dropped() {
        let root = std::env::var("BAOCUT_TEST_MODELS_DIR").expect("BAOCUT_TEST_MODELS_DIR");
        let path = Path::new(&root).join("mlx-community/Qwen-Image-2.1-MLX-4bit/processor/tokenizer.json");
        let prompter = Prompter::load(&path).unwrap();
        let start = prompter.added_id("<|im_start|>").expect("<|im_start|>");
        let end = prompter.added_id("<|im_end|>").expect("<|im_end|>");
        let ids = prompter.t2i_ids("a red apple on a wooden table");
        assert_eq!(ids[0], start);
        assert_eq!(ids.iter().filter(|&&id| id == start).count(), 3);
        assert_eq!(ids.iter().filter(|&&id| id == end).count(), 2);
        // 系统前缀的 token 正好是模板的开头：丢掉 drop_idx 个之后从 user 轮开始。
        let system = prompter.t2i_ids("x")[..prompter.drop_idx()].to_vec();
        assert_eq!(&ids[..prompter.drop_idx()], &system[..]);
        assert_eq!(ids[prompter.drop_idx()], start);
        assert_eq!(*system.last().unwrap(), Tokenizer::load(&path).unwrap().encode("\n")[0]);
        // 空提示按管线换成一个空格，不会少掉 user 轮。
        assert_eq!(prompter.t2i_ids("").len(), prompter.t2i_ids(" ").len());
        // 改图模板：系统前缀相同（丢掉的 token 数一样），占位符按图展开。
        let pad = prompter.added_id(IMAGE_PAD).unwrap();
        let edit = prompter.ti2i_ids("make it red", &[4, 6]).unwrap();
        assert_eq!(&edit[..prompter.drop_idx()], &system[..]);
        assert_eq!(edit.iter().filter(|&&id| id == pad).count(), 10);
        let vision_start = prompter.added_id("<|vision_start|>").unwrap();
        assert_eq!(edit.iter().filter(|&&id| id == vision_start).count(), 2);
    }
}
