//! FlowMatchEulerDiscreteScheduler，按 `scheduler/scheduler_config.json` 的配置复刻
//! （动态 shift、指数型 time shift、`shift_terminal` 拉伸）；蒸馏版（Turbo）改用 `model_index.json` 里固定的
//! `sample_sigmas`（[`Schedule`]）。纯逻辑，全平台编译。

use anyhow::{Context, Result, bail};
use serde::Deserialize;
use std::path::Path;

use crate::protocol::ErrorBody;

/// 一只模型的采样计划。原版按调度器配置与步数现算 sigma；蒸馏版（Qwen-Image-2.1-Turbo）在 `model_index.json` 的
/// `sample_sigmas` 里给出固定的 sigma 表，步数就是表长（diffusers 同样以表为准、不看请求的步数），配置里的 shift 都已关掉。
#[derive(Debug, Clone)]
pub enum Schedule {
    Computed(SchedulerConfig),
    Fixed(Vec<f64>),
}

impl Schedule {
    /// 读调度器配置；`model_index` 带 `sample_sigmas` 时改用固定表。
    pub fn load(scheduler: &Path, model_index: Option<&Path>) -> Result<Self> {
        if let Some(path) = model_index {
            let s = std::fs::read_to_string(path).with_context(|| format!("read {}", path.display()))?;
            let index: serde_json::Value = serde_json::from_str(&s)?;
            if let Some(table) = index.get("sample_sigmas") {
                let sigmas: Vec<f64> = serde_json::from_value(table.clone()).context("sample_sigmas 不是数字数组")?;
                return Self::fixed(sigmas);
            }
        }
        Ok(Self::Computed(SchedulerConfig::load(scheduler)?))
    }

    fn fixed(sigmas: Vec<f64>) -> Result<Self> {
        if sigmas.is_empty() || sigmas.iter().any(|s| !(*s > 0.0 && *s <= 1.0)) || sigmas.windows(2).any(|w| w[0] <= w[1]) {
            bail!("sample_sigmas 必须非空、落在 (0, 1] 且严格递减：{sigmas:?}");
        }
        Ok(Self::Fixed(sigmas))
    }

    /// 请求没给步数时用的步数：固定表是表长。
    pub fn default_steps(&self, computed: u32) -> u32 {
        match self {
            Self::Computed(_) => computed,
            Self::Fixed(s) => s.len() as u32,
        }
    }

    /// 固定表只认表长那么多步；别的步数是 `INVALID_PARAMS`，不悄悄改步数。
    pub fn check_steps(&self, steps: u32) -> Result<(), ErrorBody> {
        match self {
            Self::Fixed(s) if steps as usize != s.len() => {
                Err(ErrorBody::invalid_params(format!("这只模型固定 {} 步去噪，收到 {steps}", s.len())))
            }
            _ => Ok(()),
        }
    }

    /// 返回 N+1 个 sigma（末尾补 0）。
    pub fn sigmas(&self, steps: usize, image_seq_len: usize) -> Vec<f64> {
        match self {
            Self::Computed(c) => c.sigmas(steps, image_seq_len),
            Self::Fixed(s) => s.iter().copied().chain([0.0]).collect(),
        }
    }
}

#[derive(Debug, Clone, Deserialize)]
pub struct SchedulerConfig {
    #[serde(default = "d_base_seq")]
    pub base_image_seq_len: usize,
    #[serde(default = "d_max_seq")]
    pub max_image_seq_len: usize,
    #[serde(default = "d_base_shift")]
    pub base_shift: f64,
    #[serde(default = "d_max_shift")]
    pub max_shift: f64,
    #[serde(default)]
    pub shift_terminal: Option<f64>,
    #[serde(default)]
    pub use_dynamic_shifting: bool,
    #[serde(default)]
    pub time_shift_type: Option<String>,
    #[serde(default = "d_shift")]
    pub shift: f64,
}

fn d_base_seq() -> usize {
    256
}
fn d_max_seq() -> usize {
    4096
}
fn d_base_shift() -> f64 {
    0.5
}
fn d_max_shift() -> f64 {
    1.15
}
fn d_shift() -> f64 {
    1.0
}

impl SchedulerConfig {
    /// 读 `scheduler/scheduler_config.json`（由调用方按清单取出路径）。
    pub fn load(path: &Path) -> Result<Self> {
        let s = std::fs::read_to_string(path).with_context(|| format!("read {}", path.display()))?;
        Ok(serde_json::from_str(&s)?)
    }

    /// 管线的 `calculate_shift`：按图像 token 数线性插值出 mu。
    pub fn mu(&self, image_seq_len: usize) -> f64 {
        let m = (self.max_shift - self.base_shift) / (self.max_image_seq_len as f64 - self.base_image_seq_len as f64);
        let b = self.base_shift - m * self.base_image_seq_len as f64;
        image_seq_len as f64 * m + b
    }

    /// 返回 N+1 个 sigma（末尾补 0）。模型收到的 timestep 就是 sigma（管线里 t/1000）。
    pub fn sigmas(&self, steps: usize, image_seq_len: usize) -> Vec<f64> {
        assert!(steps >= 1);
        // np.linspace(1.0, 1/N, N)
        let n = steps as f64;
        let mut s: Vec<f64> = (0..steps)
            .map(|i| {
                if steps == 1 {
                    1.0
                } else {
                    1.0 + (1.0 / n - 1.0) * i as f64 / (n - 1.0)
                }
            })
            .collect();
        if self.use_dynamic_shifting {
            let mu = self.mu(image_seq_len);
            let exponential = self.time_shift_type.as_deref().unwrap_or("exponential") == "exponential";
            for v in s.iter_mut() {
                *v = if exponential {
                    let e = mu.exp();
                    e / (e + (1.0 / *v - 1.0))
                } else {
                    mu / (mu + (1.0 / *v - 1.0))
                };
            }
        } else {
            for v in s.iter_mut() {
                *v = self.shift * *v / (1.0 + (self.shift - 1.0) * *v);
            }
        }
        // 只有一步时末项就是 1.0，拉伸会 0/0（diffusers 同样得 NaN），此时不拉伸。
        if let Some(term) = self.shift_terminal.filter(|t| *t > 0.0 && steps > 1) {
            let last = 1.0 - *s.last().unwrap();
            let scale = last / (1.0 - term);
            for v in s.iter_mut() {
                *v = 1.0 - (1.0 - *v) / scale;
            }
        }
        s.push(0.0);
        s
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn cfg() -> SchedulerConfig {
        serde_json::from_str(
            r#"{"base_image_seq_len":256,"base_shift":0.5,"max_image_seq_len":8192,"max_shift":0.9,
                "shift":1.0,"shift_terminal":0.02,"time_shift_type":"exponential","use_dynamic_shifting":true}"#,
        )
        .unwrap()
    }

    #[test]
    fn sigmas_start_at_one_and_end_at_terminal() {
        let s = cfg().sigmas(40, 4096);
        assert_eq!(s.len(), 41);
        assert!((s[0] - 1.0).abs() < 1e-9, "{}", s[0]);
        assert!((s[39] - 0.02).abs() < 1e-9, "{}", s[39]);
        assert_eq!(s[40], 0.0);
        assert!(s.windows(2).all(|w| w[0] > w[1]));
    }

    #[test]
    fn single_step_is_finite() {
        assert_eq!(cfg().sigmas(1, 4096), vec![1.0, 0.0]);
    }

    const TURBO: [f64; 8] = [1.0, 0.978453, 0.95418, 0.926626, 0.89508, 0.845148, 0.704534, 0.414568];

    fn write(dir: &Path, name: &str, body: &str) -> std::path::PathBuf {
        let path = dir.join(name);
        std::fs::write(&path, body).unwrap();
        path
    }

    #[test]
    fn sample_sigmas_in_the_model_index_fix_the_schedule() {
        let dir = tempfile::tempdir().unwrap();
        let scheduler = write(dir.path(), "scheduler.json", r#"{"use_dynamic_shifting":false,"shift":1.0}"#);
        let index = write(
            dir.path(),
            "model_index.json",
            &serde_json::json!({ "_class_name": "QwenImage21Pipeline", "sample_sigmas": TURBO }).to_string(),
        );
        let schedule = Schedule::load(&scheduler, Some(&index)).unwrap();
        assert_eq!(schedule.default_steps(20), 8);
        let mut want = TURBO.to_vec();
        want.push(0.0);
        // 与图像大小无关。
        assert_eq!(schedule.sigmas(8, 256), want);
        assert_eq!(schedule.sigmas(8, 4096), want);
        assert!(schedule.check_steps(8).is_ok());
        let error = schedule.check_steps(20).unwrap_err();
        assert_eq!(error.code, crate::protocol::codes::INVALID_PARAMS);
    }

    #[test]
    fn a_model_index_without_sample_sigmas_keeps_the_computed_schedule() {
        let dir = tempfile::tempdir().unwrap();
        let scheduler = write(
            dir.path(),
            "scheduler.json",
            r#"{"base_image_seq_len":256,"base_shift":0.5,"max_image_seq_len":8192,"max_shift":0.9,
                "shift":1.0,"shift_terminal":0.02,"time_shift_type":"exponential","use_dynamic_shifting":true}"#,
        );
        let index = write(dir.path(), "model_index.json", r#"{"_class_name":"QwenImage21Pipeline"}"#);
        for schedule in [
            Schedule::load(&scheduler, Some(&index)).unwrap(),
            Schedule::load(&scheduler, None).unwrap(),
        ] {
            assert_eq!(schedule.default_steps(20), 20);
            assert!(schedule.check_steps(13).is_ok());
            assert_eq!(schedule.sigmas(40, 4096), cfg().sigmas(40, 4096));
        }
    }

    #[test]
    fn malformed_sample_sigmas_are_rejected() {
        for bad in ["[]", "[0.5, 0.9]", "[1.0, 0.0]", "[1.5, 0.5]", r#"["a"]"#] {
            let dir = tempfile::tempdir().unwrap();
            let scheduler = write(dir.path(), "scheduler.json", "{}");
            let index = write(dir.path(), "model_index.json", &format!(r#"{{"sample_sigmas":{bad}}}"#));
            assert!(Schedule::load(&scheduler, Some(&index)).is_err(), "{bad}");
        }
    }
}
