//! 音频的两件事：逐帧特征与节拍（[`audio_analysis`]），程序化音效（[`sfx_render`]）。
//!
//! 这两个入口的输入或输出是二进制，不走 JSON 进出：
//!
//! - `bc_audio_analysis`：输入是 `[u32 LE 选项长度][选项 JSON][f32 LE 单声道 PCM…]`，选项是
//!   `{ sampleRate, fps, beats?, beatsPerBar? }`；结果 JSON 见 [`AnalysisOutput`]；
//! - `bc_sfx_render`：输入 JSON `{ recipe, seconds?, pitch?, seed?, space?, sampleRate? }`，结果是 16 位立体声 WAV 字节；
//! - `bc_sfx_recipes`：配方名与缺省长度（JSON）。

use audio_dsp::sfx::{self, SfxError, SfxSpec};
use serde::{Deserialize, Serialize};
use waveform::beats::{self, BeatOptions};

use crate::{EntryError, invalid_input};

/// PCM 的长度上限：48 kHz 下 30 分钟（宿主先按时长裁好，这里兜底）。
const MAX_SAMPLES: usize = 48_000 * 60 * 30;

#[derive(Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
struct AnalysisOptions {
    sample_rate: u32,
    fps: f64,
    #[serde(default = "yes")]
    beats: bool,
    #[serde(default)]
    beats_per_bar: Option<usize>,
}

fn yes() -> bool {
    true
}

/// 分析结果。数值保留三位小数（时间是秒）。
#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct AnalysisOutput {
    fps: f64,
    duration: f64,
    frame_count: usize,
    frames: FramesOutput,
    onsets: Vec<OnsetOutput>,
    /// 节拍：没要或找不到稳定的拍时为 null，后者在 `beatsError` 里说原因（讲话、环境声通常没有拍）。
    beats: Option<BeatsOutput>,
    #[serde(skip_serializing_if = "Option::is_none")]
    beats_error: Option<String>,
}

#[derive(Serialize)]
struct FramesOutput {
    level: Vec<f64>,
    bass: Vec<f64>,
    mid: Vec<f64>,
    treble: Vec<f64>,
    onset: Vec<f64>,
}

#[derive(Serialize)]
struct OnsetOutput {
    t: f64,
    strength: f64,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct BeatsOutput {
    tempo: f64,
    confidence: f64,
    /// 拍相对恒速网格的均方根残差（秒）：近零是电子乐那种恒速，大了是现场或变速。
    residual: f64,
    beats_per_bar: usize,
    downbeat: f64,
    times: Vec<f64>,
    bars: Vec<SpanOutput>,
    sections: Vec<SpanOutput>,
}

#[derive(Serialize)]
struct SpanOutput {
    start: f64,
    end: f64,
    energy: f64,
}

fn round3(value: f64) -> f64 {
    (value * 1000.0).round() / 1000.0
}

fn rounded(values: &[f32]) -> Vec<f64> {
    values.iter().map(|value| round3(f64::from(*value))).collect()
}

fn invalid(message: impl Into<String>) -> EntryError {
    EntryError {
        code: "INVALID_INPUT",
        message: message.into(),
    }
}

/// 逐帧特征、起音与节拍（JSON）。
pub fn audio_analysis(input: &[u8]) -> Result<String, EntryError> {
    let header = input.get(..4).ok_or_else(|| invalid("input is shorter than its 4-byte header"))?;
    let json_len = u32::from_le_bytes(header.try_into().expect("4 bytes")) as usize;
    let json = input
        .get(4..4 + json_len)
        .ok_or_else(|| invalid("options are longer than the input"))?;
    let options: AnalysisOptions = serde_json::from_slice(json).map_err(invalid_input)?;
    let body = &input[4 + json_len..];
    if !body.len().is_multiple_of(4) {
        return Err(invalid("PCM byte length is not a multiple of 4"));
    }
    // 线性内存里的缓冲只按字节对齐，逐个拷出来，不把切片当 &[f32] 用。
    let pcm: Vec<f32> = body
        .chunks_exact(4)
        .map(|bytes| f32::from_le_bytes(bytes.try_into().expect("4 bytes")))
        .collect();
    if pcm.is_empty() {
        return Err(EntryError {
            code: "AUDIO_EMPTY",
            message: "no audio samples to analyze".into(),
        });
    }
    if pcm.len() > MAX_SAMPLES {
        return Err(EntryError {
            code: "AUDIO_TOO_LONG",
            message: format!("{} samples is over the limit of {MAX_SAMPLES}; analyze a shorter range", pcm.len()),
        });
    }
    let features = beats::features(&pcm, options.sample_rate, options.fps).map_err(|error| invalid(error.to_string()))?;
    let (beats, beats_error) = if options.beats {
        let beat_options = BeatOptions {
            beats_per_bar: options.beats_per_bar.unwrap_or(4),
            ..BeatOptions::default()
        };
        match beats::analyze(&pcm, options.sample_rate, &beat_options) {
            Ok(analysis) => {
                let span = |start: f64, end: f64, energy: f64| SpanOutput {
                    start: round3(start),
                    end: round3(end),
                    energy: round3(energy),
                };
                (
                    Some(BeatsOutput {
                        tempo: round3(analysis.tempo),
                        confidence: round3(analysis.confidence),
                        residual: round3(analysis.residual),
                        beats_per_bar: analysis.beats_per_bar,
                        downbeat: round3(analysis.downbeat),
                        times: analysis.beats.iter().copied().map(round3).collect(),
                        bars: analysis.bars.iter().map(|bar| span(bar.start, bar.end, bar.energy)).collect(),
                        sections: analysis
                            .sections
                            .iter()
                            .map(|section| span(section.start, section.end, section.energy))
                            .collect(),
                    }),
                    None,
                )
            }
            Err(error) => (None, Some(error.to_string())),
        }
    } else {
        (None, None)
    };
    let output = AnalysisOutput {
        fps: features.fps,
        duration: round3(features.duration),
        frame_count: features.level.len(),
        frames: FramesOutput {
            level: rounded(&features.level),
            bass: rounded(&features.bass),
            mid: rounded(&features.mid),
            treble: rounded(&features.treble),
            onset: rounded(&features.onset),
        },
        onsets: features
            .onsets
            .iter()
            .map(|(t, strength)| OnsetOutput {
                t: round3(*t),
                strength: round3(f64::from(*strength)),
            })
            .collect(),
        beats,
        beats_error,
    };
    Ok(serde_json::to_string(&output).expect("analysis always serializes"))
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
struct SfxInput {
    recipe: String,
    #[serde(default)]
    seconds: Option<f64>,
    #[serde(default)]
    pitch: f64,
    #[serde(default)]
    seed: u64,
    #[serde(default)]
    space: Option<String>,
    #[serde(default = "default_rate")]
    sample_rate: u32,
}

fn default_rate() -> u32 {
    48_000
}

/// 合成音效，返回 16 位立体声 WAV。
pub fn sfx_render(input: &[u8]) -> Result<Vec<u8>, EntryError> {
    let input: SfxInput = serde_json::from_slice(input).map_err(invalid_input)?;
    if !(8_000..=192_000).contains(&input.sample_rate) {
        return Err(invalid(format!(
            "sampleRate must be between 8000 and 192000, got {}",
            input.sample_rate
        )));
    }
    let spec = SfxSpec {
        recipe: input.recipe,
        seconds: input.seconds,
        pitch: input.pitch,
        seed: input.seed,
        space: input.space,
    };
    let audio = sfx::render(&spec, f64::from(input.sample_rate)).map_err(|error| EntryError {
        code: match error {
            SfxError::UnknownRecipe(_) => "SFX_UNKNOWN_RECIPE",
            SfxError::UnknownSpace(_) | SfxError::InvalidParameter(_) => "INVALID_INPUT",
        },
        message: error.to_string(),
    })?;
    Ok(wav16(&audio.interleaved(), 2, input.sample_rate))
}

#[derive(Serialize)]
struct Recipe {
    name: &'static str,
    seconds: f64,
}

/// 配方名与缺省长度。
pub fn sfx_recipes(_input: &[u8]) -> Result<String, EntryError> {
    let recipes: Vec<Recipe> = sfx::RECIPES
        .iter()
        .map(|(name, seconds)| Recipe { name, seconds: *seconds })
        .collect();
    Ok(serde_json::to_string(&recipes).expect("recipes always serialize"))
}

/// 交错的 f32 → 16 位 PCM WAV（就近取整、夹到 ±32767，不加抖动：同一输入逐位相同）。
fn wav16(interleaved: &[f32], channels: u16, sample_rate: u32) -> Vec<u8> {
    let data_len = (interleaved.len() * 2) as u32;
    let mut out = Vec::with_capacity(44 + data_len as usize);
    out.extend_from_slice(b"RIFF");
    out.extend_from_slice(&(36 + data_len).to_le_bytes());
    out.extend_from_slice(b"WAVEfmt ");
    out.extend_from_slice(&16u32.to_le_bytes());
    out.extend_from_slice(&1u16.to_le_bytes());
    out.extend_from_slice(&channels.to_le_bytes());
    out.extend_from_slice(&sample_rate.to_le_bytes());
    out.extend_from_slice(&(sample_rate * u32::from(channels) * 2).to_le_bytes());
    out.extend_from_slice(&(channels * 2).to_le_bytes());
    out.extend_from_slice(&16u16.to_le_bytes());
    out.extend_from_slice(b"data");
    out.extend_from_slice(&data_len.to_le_bytes());
    for sample in interleaved {
        let value = (f64::from(*sample) * 32767.0).round().clamp(-32767.0, 32767.0) as i16;
        out.extend_from_slice(&value.to_le_bytes());
    }
    out
}

#[cfg(test)]
mod tests {
    use super::*;

    fn analysis_input(options: &str, pcm: &[f32]) -> Vec<u8> {
        let mut input = (options.len() as u32).to_le_bytes().to_vec();
        input.extend_from_slice(options.as_bytes());
        for sample in pcm {
            input.extend_from_slice(&sample.to_le_bytes());
        }
        input
    }

    #[test]
    fn analysis_reads_the_binary_layout() {
        let rate = 16_000;
        let mut pcm = vec![0.0_f32; rate * 9 / 2];
        for beat in 0..8 {
            let start = rate / 4 + beat * rate / 2;
            for i in 0..800 {
                let t = i as f32 / rate as f32;
                pcm[start + i] = (-t * 60.0).exp() * (t * 2.0 * std::f32::consts::PI * 1000.0).sin();
            }
        }
        let json = audio_analysis(&analysis_input(r#"{"sampleRate":16000,"fps":30,"beats":false}"#, &pcm)).unwrap();
        let value: serde_json::Value = serde_json::from_str(&json).unwrap();
        assert_eq!(value["frameCount"], 135);
        assert_eq!(value["onsets"].as_array().unwrap().len(), 8);
        assert!(value["beats"].is_null());
        assert!(value.get("beatsError").is_none());
    }

    #[test]
    fn analysis_reports_missing_beats_and_bad_input() {
        let silence = vec![0.0_f32; 16_000];
        let json = audio_analysis(&analysis_input(r#"{"sampleRate":16000,"fps":25}"#, &silence)).unwrap();
        let value: serde_json::Value = serde_json::from_str(&json).unwrap();
        assert!(value["beats"].is_null());
        assert!(value["beatsError"].is_string());
        assert_eq!(audio_analysis(&[1, 0]).unwrap_err().code, "INVALID_INPUT");
        assert_eq!(
            audio_analysis(&analysis_input(r#"{"sampleRate":16000,"fps":25}"#, &[]))
                .unwrap_err()
                .code,
            "AUDIO_EMPTY"
        );
    }

    #[test]
    fn sfx_is_a_wav_with_the_recipe_length() {
        let wav = sfx_render(br#"{"recipe":"tick","seed":3}"#).unwrap();
        assert_eq!(&wav[..4], b"RIFF");
        assert_eq!(wav.len(), 44 + (0.08 * 48_000.0) as usize * 4);
        assert_eq!(wav, sfx_render(br#"{"recipe":"tick","seed":3}"#).unwrap());
        assert_eq!(sfx_render(br#"{"recipe":"laser"}"#).unwrap_err().code, "SFX_UNKNOWN_RECIPE");
        let recipes: serde_json::Value = serde_json::from_str(&sfx_recipes(b"").unwrap()).unwrap();
        assert_eq!(recipes.as_array().unwrap().len(), sfx::RECIPES.len());
    }
}
