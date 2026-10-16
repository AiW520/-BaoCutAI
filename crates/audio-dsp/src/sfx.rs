//! 程序化音效：一组固定配方（[`RECIPES`]），每个是振荡、噪声与滤波按包络拼出来的一小段声音。
//!
//! 与全 crate 同一约定：纯函数、播种随机、`libm` 超越函数，同一份 [`SfxSpec`] 逐位相同。输出是立体声
//! （干声双单声道，加空间时两声道的混响尾不同），峰值归一到 [`PEAK`]。
//!
//! - `pitch` 是半音（−12..12），乘到配方里的所有频率上（含滤波器截止），音色一起变高变低；
//! - `seconds` 改总长：衰减类配方按比例拉长包络，`riser` 拉长爬升；不给用配方自己的长度；
//! - `space` 是 [`crate::reverb::IrSpec::preset`] 的名字（`room` / `hall`），湿声按 [`SPACE_WET`] 叠上。

use crate::biquad::{self, Biquad};
use crate::math::samples;
use crate::noise;
use crate::osc;
use crate::reverb::{IrSpec, convolve_stereo, synth_ir};
use crate::rng::{Rng, derive};
use crate::stereo::{Stereo, fade, peak_normalize, remove_dc};
use crate::tvlp::tv_lowpass;

/// 配方名与缺省长度（秒）。
pub const RECIPES: &[(&str, f64)] = &[
    ("kick", 0.5),
    ("boom", 2.0),
    ("crash", 2.5),
    ("riser", 3.0),
    ("tick", 0.08),
    ("blip", 0.15),
    ("ping", 0.8),
    ("whoosh", 0.9),
    ("stamp", 0.35),
    ("glitch", 0.4),
    ("static", 1.0),
    ("click", 0.03),
];

/// 输出峰值（线性，约 −1 dBFS）。
pub const PEAK: f64 = 0.891;
/// 空间的湿声比例。
pub const SPACE_WET: f64 = 0.35;
/// 长度上限（秒）。
pub const MAX_SECONDS: f64 = 10.0;

#[derive(Debug, Clone, PartialEq)]
pub struct SfxSpec {
    pub recipe: String,
    pub seconds: Option<f64>,
    pub pitch: f64,
    pub seed: u64,
    pub space: Option<String>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum SfxError {
    UnknownRecipe(String),
    UnknownSpace(String),
    InvalidParameter(String),
}

impl std::fmt::Display for SfxError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Self::UnknownRecipe(name) => write!(f, "unknown recipe {name:?}"),
            Self::UnknownSpace(name) => write!(f, "unknown space {name:?}; use room or hall"),
            Self::InvalidParameter(message) => f.write_str(message),
        }
    }
}

/// 配方的缺省长度；没有这个配方时 `None`。
pub fn default_seconds(recipe: &str) -> Option<f64> {
    RECIPES
        .iter()
        .find(|(name, _)| *name == recipe)
        .map(|(_, seconds)| *seconds)
}

/// 合成一段音效。空间只认 `room` / `hall`（更长的厅堂对短音效没有意义）。
pub fn render(spec: &SfxSpec, sr: f64) -> Result<Stereo, SfxError> {
    let base = default_seconds(&spec.recipe)
        .ok_or_else(|| SfxError::UnknownRecipe(spec.recipe.clone()))?;
    let seconds = spec.seconds.unwrap_or(base);
    if !(seconds.is_finite() && seconds > 0.0 && seconds <= MAX_SECONDS) {
        return Err(SfxError::InvalidParameter(format!(
            "seconds must be in (0, {MAX_SECONDS}], got {seconds}"
        )));
    }
    if !(spec.pitch.is_finite() && (-12.0..=12.0).contains(&spec.pitch)) {
        return Err(SfxError::InvalidParameter(format!(
            "pitch must be between -12 and 12 semitones, got {}",
            spec.pitch
        )));
    }
    let space = match spec.space.as_deref() {
        None => None,
        Some(name @ ("room" | "hall")) => Some(IrSpec::preset(name).expect("built-in space")),
        Some(other) => return Err(SfxError::UnknownSpace(other.to_string())),
    };
    let ctx = Ctx {
        sr,
        n: samples(seconds, sr).max(1),
        stretch: seconds / base,
        ratio: libm::pow(2.0, spec.pitch / 12.0),
        rng: Rng::new(derive(spec.seed, 0x5f_78)),
    };
    let mut dry = match spec.recipe.as_str() {
        "kick" => kick(ctx),
        "boom" => boom(ctx),
        "crash" => crash(ctx),
        "riser" => riser(ctx),
        "tick" => tick(ctx),
        "blip" => blip(ctx),
        "ping" => ping(ctx),
        "whoosh" => whoosh(ctx),
        "stamp" => stamp(ctx),
        "glitch" => glitch(ctx),
        "static" => crackle(ctx),
        "click" => click(ctx),
        _ => unreachable!("checked against RECIPES"),
    };
    remove_dc(&mut dry);
    // 尾巴收干净：末 5 ms 淡出，开头不淡（起音要脆）。
    fade(&mut dry, sr, 0.0, 0.005);
    peak_normalize(&mut dry, PEAK);
    let mut out = Stereo::dual_mono(&dry);
    if let Some(ir) = space {
        let ir = synth_ir(
            &IrSpec {
                seed: derive(spec.seed, 0x52_56),
                ..ir
            },
            sr,
        );
        let tail = convolve_stereo(&out, &ir, dry.len() + ir.len());
        out.resize(tail.len());
        out.add_at(&tail, 0, SPACE_WET);
        fade(&mut out.l, sr, 0.0, 0.05);
        fade(&mut out.r, sr, 0.0, 0.05);
        let peak = out.peak();
        out.scale(PEAK / (peak + 1e-12));
    }
    Ok(out)
}

struct Ctx {
    sr: f64,
    n: usize,
    /// 实际长度与缺省长度之比：包络时间常数乘它。
    stretch: f64,
    /// 音高倍数。
    ratio: f64,
    rng: Rng,
}

impl Ctx {
    fn t(&self, i: usize) -> f64 {
        i as f64 / self.sr
    }

    /// 指数衰减包络，时间常数 `tau` 秒（随 `stretch` 拉长）。
    fn decay(&self, tau: f64) -> Vec<f64> {
        let tau = tau * self.stretch;
        (0..self.n).map(|i| libm::exp(-self.t(i) / tau)).collect()
    }

    /// 频率曲线：从 `from` 指数滑到 `to`，时间常数 `tau` 秒；已乘音高。
    fn glide(&self, from: f64, to: f64, tau: f64) -> Vec<f64> {
        let tau = tau * self.stretch;
        (0..self.n)
            .map(|i| (to + (from - to) * libm::exp(-self.t(i) / tau)) * self.ratio)
            .collect()
    }

    fn hz(&self, f: f64) -> f64 {
        (f * self.ratio).min(self.sr * 0.45)
    }
}

fn mul(x: &mut [f32], env: &[f64]) {
    for (sample, gain) in x.iter_mut().zip(env) {
        *sample = (f64::from(*sample) * gain) as f32;
    }
}

fn mix(dst: &mut [f32], src: &[f32], gain: f64) {
    for (a, b) in dst.iter_mut().zip(src) {
        *a = (f64::from(*a) + f64::from(*b) * gain) as f32;
    }
}

/// 底鼓：150 → 45 Hz 的正弦扫频加 2 ms 的高频起音。
fn kick(mut c: Ctx) -> Vec<f32> {
    let mut body = osc::sine(&c.glide(150.0, 45.0, 0.04), c.sr, 0.0);
    mul(&mut body, &c.decay(0.16));
    let mut attack = biquad::highpass(&noise::white(c.n, &mut c.rng), c.sr, c.hz(2500.0), 2);
    let short: Vec<f64> = (0..c.n).map(|i| libm::exp(-c.t(i) / 0.002)).collect();
    mul(&mut attack, &short);
    mix(&mut body, &attack, 0.35);
    body
}

/// 低频轰鸣：55 → 30 Hz 的次低音加低通褐噪声，长衰减。
fn boom(mut c: Ctx) -> Vec<f32> {
    let mut sub = osc::sine(&c.glide(55.0, 30.0, 0.3), c.sr, 0.0);
    mul(&mut sub, &c.decay(0.6));
    let mut rumble = biquad::lowpass(
        &noise::colored(c.n, c.sr, 2.0, &mut c.rng),
        c.sr,
        c.hz(220.0),
        2,
    );
    mul(&mut rumble, &c.decay(0.45));
    mix(&mut sub, &rumble, 0.6);
    sub
}

/// 镲：高通白噪声加一层带通「金属声」，长衰减。
fn crash(mut c: Ctx) -> Vec<f32> {
    let white = noise::white(c.n, &mut c.rng);
    let mut wash = biquad::highpass(&white, c.sr, c.hz(3000.0), 2);
    let shimmer = Biquad::bandpass(c.sr, c.hz(6500.0), 2.0);
    let mut ring = white.clone();
    shimmer.process(&mut ring);
    mix(&mut wash, &ring, 0.8);
    mul(&mut wash, &c.decay(0.55));
    wash
}

/// 上扬：噪声的低通截止 200 → 9000 Hz、锯齿波一个八度半往上滑，音量平方爬升，在末尾到顶。
fn riser(mut c: Ctx) -> Vec<f32> {
    let n = c.n;
    let progress: Vec<f64> = (0..n).map(|i| i as f64 / (n.max(2) - 1) as f64).collect();
    let cutoff: Vec<f32> = progress
        .iter()
        .map(|u| c.hz(200.0 * libm::pow(45.0, *u)) as f32)
        .collect();
    let mut air = tv_lowpass(&noise::colored(n, c.sr, 1.0, &mut c.rng), c.sr, &cutoff);
    let freq: Vec<f64> = progress
        .iter()
        .map(|u| 110.0 * libm::pow(2.0, 2.5 * u) * c.ratio)
        .collect();
    let tone = osc::saw(&freq, c.sr, 0.0);
    mix(&mut air, &tone, 0.25);
    let env: Vec<f64> = progress.iter().map(|u| u * u).collect();
    mul(&mut air, &env);
    air
}

/// 滴答：4 kHz 带通的噪声短促一下。
fn tick(mut c: Ctx) -> Vec<f32> {
    let mut x = biquad::resonator(&noise::white(c.n, &mut c.rng), c.sr, c.hz(4000.0), 6.0);
    mul(&mut x, &c.decay(0.006));
    x
}

/// 提示音：方波 880 → 1320 Hz 上挑，短衰减。
fn blip(c: Ctx) -> Vec<f32> {
    // 前 20 ms 从 880 滑到 1320。
    let freq: Vec<f64> = (0..c.n)
        .map(|i| (880.0 + 440.0 * (1.0 - libm::exp(-c.t(i) / 0.02))) * c.ratio)
        .collect();
    let mut x = biquad::lowpass(&osc::square(&freq, c.sr, 0.0, 0.5), c.sr, c.hz(6000.0), 2);
    mul(&mut x, &c.decay(0.04));
    x
}

/// 叮：1760 Hz 正弦加 2.76 倍的泛音（钟的第二个分音），泛音衰减更快。
fn ping(c: Ctx) -> Vec<f32> {
    let flat = |f: f64| vec![c.hz(f); c.n];
    let mut x = osc::sine(&flat(1760.0), c.sr, 0.0);
    mul(&mut x, &c.decay(0.22));
    let mut partial = osc::sine(&flat(1760.0 * 2.76), c.sr, 0.0);
    mul(&mut partial, &c.decay(0.06));
    mix(&mut x, &partial, 0.4);
    x
}

/// 呼：粉噪声的低通截止先升后降、音量钟形，再高通去闷。
fn whoosh(mut c: Ctx) -> Vec<f32> {
    let n = c.n;
    let bell: Vec<f64> = (0..n)
        .map(|i| {
            let u = i as f64 / (n.max(2) - 1) as f64;
            libm::sin(std::f64::consts::PI * u).powi(2)
        })
        .collect();
    let cutoff: Vec<f32> = bell
        .iter()
        .map(|b| c.hz(300.0 + 5200.0 * b) as f32)
        .collect();
    let air = tv_lowpass(&noise::colored(n, c.sr, 1.0, &mut c.rng), c.sr, &cutoff);
    let mut x = biquad::highpass(&air, c.sr, c.hz(150.0), 2);
    mul(&mut x, &bell);
    x
}

/// 盖章：90 → 50 Hz 的闷击加 2 kHz 以下的噪声拍击。
fn stamp(mut c: Ctx) -> Vec<f32> {
    let mut thump = osc::sine(&c.glide(90.0, 50.0, 0.03), c.sr, 0.0);
    mul(&mut thump, &c.decay(0.07));
    let mut slap = biquad::lowpass(&noise::white(c.n, &mut c.rng), c.sr, c.hz(2000.0), 2);
    mul(&mut slap, &c.decay(0.018));
    mix(&mut thump, &slap, 0.7);
    thump
}

/// 故障：每 20–50 ms 换一段，随机是方波（随机音高）、噪声或静音，段与段之间硬切。
fn glitch(mut c: Ctx) -> Vec<f32> {
    let mut out = vec![0.0_f32; c.n];
    let mut start = 0;
    while start < c.n {
        let len = samples(c.rng.uniform(0.02, 0.05) * c.stretch, c.sr)
            .max(1)
            .min(c.n - start);
        let kind = c.rng.int_range(0, 3);
        let gain = c.rng.uniform(0.4, 1.0);
        let pick = c.rng.uniform(200.0, 2400.0);
        let tone = c.hz(pick);
        let segment: Vec<f32> = match kind {
            0 => osc::square(&vec![tone; len], c.sr, 0.0, 0.5),
            1 => biquad::bandpass(
                &noise::white(len, &mut c.rng),
                c.sr,
                c.hz(800.0),
                c.hz(8000.0),
                1,
            ),
            _ => vec![0.0; len],
        };
        mix(&mut out[start..start + len], &segment, gain);
        start += len;
    }
    out
}

/// 电流噪声：1–6 kHz 的带通噪声，叠上随机的噼啪（短促的冲击）。
fn crackle(mut c: Ctx) -> Vec<f32> {
    let mut x = biquad::bandpass(
        &noise::white(c.n, &mut c.rng),
        c.sr,
        c.hz(1000.0),
        c.hz(6000.0),
        2,
    );
    for sample in x.iter_mut() {
        *sample *= 0.35;
    }
    let pops = (c.n as f64 / c.sr * 40.0) as usize;
    for _ in 0..pops {
        let at = c.rng.int_range(0, c.n as i64 - 1) as usize;
        let gain = c.rng.uniform(0.3, 1.0) as f32;
        for k in 0..samples(0.002, c.sr).min(c.n - at) {
            let sign = if k % 2 == 0 { 1.0 } else { -1.0 };
            x[at + k] += sign * gain * (1.0 - k as f32 / 96.0).max(0.0);
        }
    }
    x
}

/// 咔：1 ms 的冲击，高通掉低频，听起来是鼠标或开关。
fn click(mut c: Ctx) -> Vec<f32> {
    let mut x = noise::white(c.n, &mut c.rng);
    let short: Vec<f64> = (0..c.n)
        .map(|i| libm::exp(-c.t(i) / (0.0008 * c.stretch)))
        .collect();
    mul(&mut x, &short);
    biquad::highpass(&x, c.sr, c.hz(1500.0), 2)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::stereo::rms;

    const SR: f64 = 48_000.0;

    fn spec(recipe: &str) -> SfxSpec {
        SfxSpec {
            recipe: recipe.into(),
            seconds: None,
            pitch: 0.0,
            seed: 7,
            space: None,
        }
    }

    #[test]
    fn every_recipe_renders_at_its_length_and_peak() {
        for (name, seconds) in RECIPES {
            let out = render(&spec(name), SR).unwrap();
            assert_eq!(out.len(), samples(*seconds, SR), "{name}");
            let peak = out.peak();
            assert!((peak - PEAK).abs() < 1e-3, "{name} peak {peak}");
            assert!(out.l.iter().all(|s| s.is_finite()), "{name}");
            assert!(rms(&out.l) > 0.01, "{name} is silent");
        }
    }

    #[test]
    fn same_seed_same_samples_and_seed_changes_noise() {
        let a = render(&spec("whoosh"), SR).unwrap();
        let b = render(&spec("whoosh"), SR).unwrap();
        assert_eq!(a, b);
        let c = render(
            &SfxSpec {
                seed: 8,
                ..spec("whoosh")
            },
            SR,
        )
        .unwrap();
        assert_ne!(a, c);
    }

    #[test]
    fn kick_energy_sits_low_and_decays() {
        let out = render(&spec("kick"), SR).unwrap();
        let low = biquad::lowpass(&out.l, SR, 200.0, 4);
        assert!(rms(&low) > 0.5 * rms(&out.l));
        let quarter = out.len() / 4;
        assert!(rms(&out.l[..quarter]) > 4.0 * rms(&out.l[3 * quarter..]));
    }

    #[test]
    fn riser_grows_toward_the_end() {
        let out = render(
            &SfxSpec {
                seconds: Some(2.0),
                ..spec("riser")
            },
            SR,
        )
        .unwrap();
        assert_eq!(out.len(), 96_000);
        let tenth = out.len() / 10;
        assert!(rms(&out.l[8 * tenth..9 * tenth]) > 5.0 * rms(&out.l[tenth..2 * tenth]));
    }

    #[test]
    fn space_adds_a_tail_and_pitch_is_bounded() {
        let dry = render(&spec("ping"), SR).unwrap();
        let wet = render(
            &SfxSpec {
                space: Some("room".into()),
                ..spec("ping")
            },
            SR,
        )
        .unwrap();
        assert!(wet.len() > dry.len());
        assert_ne!(wet.l, wet.r);
        assert!(matches!(
            render(
                &SfxSpec {
                    space: Some("huge".into()),
                    ..spec("ping")
                },
                SR
            ),
            Err(SfxError::UnknownSpace(_))
        ));
        assert!(matches!(
            render(
                &SfxSpec {
                    pitch: 13.0,
                    ..spec("ping")
                },
                SR
            ),
            Err(SfxError::InvalidParameter(_))
        ));
        assert!(matches!(
            render(&spec("laser"), SR),
            Err(SfxError::UnknownRecipe(_))
        ));
    }
}
