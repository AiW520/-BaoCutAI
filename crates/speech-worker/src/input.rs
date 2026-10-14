//! 冻结的输入：Runtime 在启动这一步时写进 staging 的 JSON（命令协议规范 §4.5）。

use std::path::Path;

use editor_semantics::MediaTime;
use serde::Deserialize;
use serde_json::Value;
use video_model::speech::SpeechBody;
use video_model::translation::TranslationBody;
use video_model::{Id, VersionRef};

use crate::Failure;

pub const INPUT_SCHEMA: &str = "baocut.speech-worker.translate/1";

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct TranslateInput {
    pub schema: String,
    pub media: Media,
    /// 转写文档头的 `language`；不知道时 null。
    pub source_language: Option<String>,
    pub speech_ref: VersionRef,
    pub sequence_id: Id,
    pub speech: SpeechBody,
    pub target_language: String,
    /// 启动时冻结的术语（调用时给的与视频里启用的，已去重）。
    #[serde(default)]
    pub glossary: Vec<GlossaryTerm>,
    /// 原样写进译文正文的 `glossaryRef`（§5.3）；没有术语表时 null。
    #[serde(default)]
    pub glossary_ref: Option<Value>,
    #[serde(default)]
    pub params: Params,
    /// 就地刷新时的底稿：这门语言已有的译文（`baocut.translation/2`）。与 `sentences` 同给同不给。
    #[serde(default)]
    pub translation: Option<TranslationBody>,
    /// 就地刷新时要重译的句子 ID（字幕与翻译核心的句子）；底稿里别的单元原样写回。
    #[serde(default)]
    pub sentences: Option<Vec<Id>>,
    /// 翻译记忆（创作辅助集成设计 §3.7）：沿用的译句预先填进译文表、不再送翻（照样对齐）；参考附在送翻的提示里。就地刷新时不给。
    #[serde(default)]
    pub memory: Option<Memory>,
}

#[derive(Debug, Default, Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct Memory {
    #[serde(default)]
    pub reuse: Vec<MemoryReuse>,
    #[serde(default)]
    pub references: Vec<MemoryReference>,
}

/// 原文规范化后相同的句子：沿用这句已有的译文。
#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct MemoryReuse {
    pub sentence_id: Id,
    pub text: String,
}

/// 语义相近的已有译句：只作参考。
#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct MemoryReference {
    pub source: String,
    pub target: String,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct Media {
    pub asset_id: Option<Id>,
    #[serde(default)]
    pub path: Option<String>,
    pub content_hash: String,
    pub duration: MediaTime,
    #[serde(default)]
    pub sample_rate: Option<u32>,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct GlossaryTerm {
    pub source: String,
    pub target: String,
    #[serde(default)]
    pub note: Option<String>,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct Params {
    /// 风格提示（`translate` 的 `style`），进核心的显式用户指令。
    #[serde(default)]
    pub instructions: Option<String>,
    /// 退避时长的倍数（默认 1）；测试给 0。
    #[serde(default = "one")]
    pub backoff_scale: f64,
    /// 翻译页顺带交回对齐草稿的载体（默认 `lines`）。
    #[serde(default)]
    pub align_fusion: AlignFusion,
}

impl Default for Params {
    fn default() -> Params {
        Params {
            instructions: None,
            backoff_scale: 1.0,
            align_fusion: AlignFusion::default(),
        }
    }
}

/// 融合草稿的载体（行文本载体设计 §8.16）：`rows` 是 HTML 页、模型按源词序号写显示行；`lines` 是 `lines/1` 行文本、
/// 每块用首尾源词引用标出对应，由核心定位。
#[derive(Debug, Default, Clone, Copy, PartialEq, Eq, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum AlignFusion {
    Rows,
    #[default]
    Lines,
}

impl AlignFusion {
    pub fn as_str(self) -> &'static str {
        match self {
            AlignFusion::Rows => "rows",
            AlignFusion::Lines => "lines",
        }
    }
}

fn one() -> f64 {
    1.0
}

impl TranslateInput {
    pub fn load(path: &Path) -> Result<TranslateInput, Failure> {
        let bytes = std::fs::read(path).map_err(|error| Failure::new("INPUT_UNREADABLE", format!("读不了冻结的输入：{error}")))?;
        let input: TranslateInput =
            serde_json::from_slice(&bytes).map_err(|error| Failure::new("INPUT_UNREADABLE", format!("冻结的输入不合格式：{error}")))?;
        if input.schema != INPUT_SCHEMA {
            return Err(Failure::new("INPUT_UNREADABLE", format!("冻结的输入的 schema 应为 {INPUT_SCHEMA}")));
        }
        let lang = &input.target_language;
        if lang.is_empty() || lang.len() > 35 || !lang.chars().all(|ch| ch.is_ascii_alphanumeric() || ch == '-') {
            return Err(Failure::new("INPUT_UNREADABLE", format!("目标语言不是 BCP 47 标签：{lang}")));
        }
        if !(input.params.backoff_scale >= 0.0 && input.params.backoff_scale.is_finite()) {
            return Err(Failure::new("INPUT_UNREADABLE", "params.backoffScale 应为非负数"));
        }
        match (&input.translation, &input.sentences) {
            (None, None) => {}
            (Some(base), Some(sentences)) => {
                if base.language != input.target_language {
                    return Err(Failure::new(
                        "INPUT_UNREADABLE",
                        format!("底稿译文的语言 {} 与目标语言 {lang} 不同", base.language),
                    ));
                }
                if sentences.is_empty() {
                    return Err(Failure::new("INPUT_UNREADABLE", "就地刷新至少要给一句"));
                }
            }
            _ => return Err(Failure::new("INPUT_UNREADABLE", "translation 与 sentences 要一起给")),
        }
        Ok(input)
    }
}
