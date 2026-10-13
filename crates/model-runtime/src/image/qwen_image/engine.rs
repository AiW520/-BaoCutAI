//! Qwen-Image-2.1 的 MLX 引擎：加载（只核对清单、读分词表与调度器配置，不读权重）与一次生成的三段编排。
//!
//! MLX 是进程级单例，生成唯一动到的进程级状态是缓存上限，由 [`CacheLimit`] 进门设、出门还原；引擎析构后活跃内存回落到
//! [`UNLOADED_ACTIVE_MAX`] 以下（真跑测试核对）。与 v2 不同：权重文件经 [`VerifiedFiles`] 按清单取出；开发自检用的
//! 混搭精度选项（另给文本编码器 / DiT 目录）没有移植。

use std::path::PathBuf;
use std::time::Instant;

use anyhow::{Result, anyhow};
use mlx_rs::{Array, Dtype, memory, ops, random};

use super::dit::{CondImage, Dit, Overflow, Precision};
use super::prompt::{IMAGE_PAD, Prompter};
use super::scheduler::Schedule;
use super::vision::VisionTower;
use super::{inputs, text_encoder, vae};
use crate::backend::mlx::runtime::{clear_memory_cache, ensure_metal_device, memory_snapshot};
use crate::bundle::{FAMILY_QWEN_IMAGE, VerifiedFiles};
use crate::image::{Cancelled, ImageEngine, ImageInputs, ImageProgress, ImageRequest, RawImage};
use crate::protocol::{ErrorBody, codes};

/// DiT 阶段（含文本编码）的 MLX 空闲缓冲上限。footprint = 活跃 + 缓存，运行时缺省（物理内存 / 8，16 GB 机器上 2 GB）
/// 会让 footprint 比活跃内存高出整整 2 GB；每层权重与激活的尺寸逐层重复，256 MB 足够让分配器复用。
pub const DIT_CACHE_LIMIT: usize = 256 << 20;

/// VAE 阶段不留空闲缓冲：各块、各条带的张量尺寸都不同，缓存几乎复用不上，只会把 footprint 顶高（v2 实测 512²
/// 0.99 → 0.71 GB，解码耗时不变）。DiT 不用 0：它每步会慢约 5%，而 footprint 峰值并不在 DiT 阶段。
pub const VAE_CACHE_LIMIT: usize = 0;

#[cfg(test)]
/// 引擎析构之后 MLX 活跃内存的上限：三段权重、条件与 latent 都已析构，只剩 MLX 自己的小常驻；门槛留到 64 MB 容抖动。
pub const UNLOADED_ACTIVE_MAX: usize = 64 << 20;

/// 缓存上限的 RAII：进门记下进程当前上限并换成本阶段的，出门（正常返回、`?` 提前返回、panic 展开都算）先等 GPU
/// 做完已提交的工作，再还原原上限、清空缓存。还原是必须的：同一 Worker 之后的任务不能继承 VAE 阶段的 0。
pub struct CacheLimit {
    previous: usize,
}

impl CacheLimit {
    pub fn enter(limit: usize) -> Self {
        let previous = memory::set_cache_limit(limit);
        Self { previous }
    }

    /// 换阶段：设新上限并把旧阶段留下的空闲缓冲还给系统。
    pub fn phase(&self, limit: usize) -> Result<()> {
        memory::set_cache_limit(limit);
        clear_memory_cache()
    }

    /// 进门前的上限（出门时还原成它）。
    #[cfg(test)]
    pub fn previous(&self) -> usize {
        self.previous
    }
}

impl Drop for CacheLimit {
    fn drop(&mut self) {
        synchronize();
        memory::set_cache_limit(self.previous);
        let _ = clear_memory_cache();
    }
}

/// 等缺省 stream 上已提交的工作做完：eval 提交的命令可能仍持有数组，不等的话它们会在 clear 之后才回到缓存。
fn synchronize() {
    let stream = mlx_rs::Stream::task_local_or_default();
    // SAFETY: stream 在本调用期间存活；只等待该 stream 上已提交的工作。
    unsafe {
        let _ = mlx_sys::mlx_synchronize(stream.as_ptr());
    }
}

/// 进程当前与生命周期最大的 phys_footprint（活动监视器里「内存」一栏的口径，含 Metal 缓冲）。
pub fn footprint() -> (u64, u64) {
    // SAFETY: rusage_info_v4 是纯数据结构，零初始化合法；proc_pid_rusage 按 flavor 写满它。
    unsafe {
        let mut info: libc::rusage_info_v4 = std::mem::zeroed();
        let rc = libc::proc_pid_rusage(
            libc::getpid(),
            libc::RUSAGE_INFO_V4,
            (&mut info as *mut libc::rusage_info_v4).cast(),
        );
        if rc != 0 {
            return (0, 0);
        }
        (info.ri_phys_footprint, info.ri_lifetime_max_phys_footprint)
    }
}

/// 新阶段开始：MLX 峰值从这里重新计，[`mem`] 报的 peak 就是本阶段的。
fn phase_start() {
    memory::reset_peak_memory();
}

/// 计时开关打开时打一行内存快照。
fn mem(tag: &str) {
    if !super::timing() {
        return;
    }
    let (active, cache, peak) = memory_snapshot();
    let (fp, fp_max) = footprint();
    let gb = |v: u64| v as f64 / 1e9;
    eprintln!(
        "[mem] {tag}: active {:.2} GB, cache {:.2} GB, 阶段峰值 {:.2} GB｜footprint {:.2} GB，进程最大 {:.2} GB",
        gb(active as u64),
        gb(cache as u64),
        gb(peak as u64),
        gb(fp),
        gb(fp_max)
    );
}

/// `[1,H,W,4]`、范围 [-1,1] 的 VAE 输出 → 8 位 RGBA。
fn to_rgba(x: &Array) -> Result<RawImage> {
    if x.ndim() != 4 || x.dim(3) != 4 {
        return Err(anyhow!("VAE 输出形状不是 [1,H,W,4]：{:?}", x.shape()));
    }
    let (h, w) = (x.dim(1) as u32, x.dim(2) as u32);
    let y = x
        .as_dtype(Dtype::Float32)?
        .add(&Array::from_f32(1.0))?
        .multiply(&Array::from_f32(127.5))?;
    let y = ops::clip(&y, (0.0f32, 255.0f32))?.round(None)?;
    y.eval()?;
    let pixels: Vec<u8> = y.as_slice::<f32>().iter().map(|&v| v as u8).collect();
    Ok(RawImage {
        width: w,
        height: h,
        pixels,
    })
}

/// 生产配置（v2 `QwenOptions` 的缺省值；开发自检的对照项没有移植）。
#[derive(Debug, Clone)]
struct Options {
    /// `None` = auto：按本机实测在 f16 / bf16 里选（[`Precision::probe`]，每只引擎量一次）。
    dit_dtype: Option<Dtype>,
    /// 量化层整层解量化后按 dense 乘。缺省关。
    dit_dequant: bool,
    /// DiT 每层按多少个图像 token 分块算。块内的临时张量（调制、RoPE 的 f32 中间量、MLP 的
    /// 12288 维激活）随块大小线性涨：1024² 实测 1024 → 256 让 DiT 那段 MLX 峰值从约 0.66 降到
    /// 0.49 GB，每步耗时不变。
    dit_chunk: usize,
    /// 往返 PSNR 与 f32 一致，比 bf16 快（M2 没有原生 bf16 运算）；f16 解码出现非有限值时自动改 bf16 重解。
    vae_dtype: Dtype,
    /// VAE 尾段每条带的行数，`None` 自动选。
    vae_tail_rows: Option<usize>,
}

impl Default for Options {
    fn default() -> Self {
        Self {
            dit_dtype: None,
            dit_dequant: false,
            dit_chunk: 256,
            vae_dtype: Dtype::Float16,
            vae_tail_rows: None,
        }
    }
}

/// 按清单取出的文件。
struct Files {
    text_encoder: Vec<PathBuf>,
    transformer: Vec<PathBuf>,
    vae: Vec<PathBuf>,
    vae_config: PathBuf,
}

/// 改图的一张条件图：归一化 latent `[1, h·w, 64]` 与它那段视觉 token 在条件编码里的起始行。
struct Cond {
    latents: Array,
    h: usize,
    w: usize,
    at: usize,
}

/// 改图一次最多几张条件图（实测见 `packages/models/src/image-bundles.ts` 的 `inputs.max`，宿主先按那里拦）。
const MAX_EDIT_IMAGES: usize = 3;

/// Qwen-Image-2.1 引擎。加载时不读权重：三段权重在每次生成里按阶段打开、用完即丢。
pub struct QwenImage {
    options: Options,
    files: Files,
    prompter: Prompter,
    scheduler: Schedule,
    /// auto 精度的探测结果；同一只引擎只量一次。
    picked: Option<Dtype>,
}

fn check(cancel: &dyn Fn() -> bool) -> Result<()> {
    if cancel() {
        return Err(Cancelled.into());
    }
    Ok(())
}

fn owned(files: Vec<&std::path::Path>) -> Vec<PathBuf> {
    files.into_iter().map(PathBuf::from).collect()
}

impl QwenImage {
    /// 先核对清单（缺文件是 `MODEL_NOT_INSTALLED`），再确认 Metal 设备，最后读分词表与调度器配置。
    pub fn load(files: &VerifiedFiles) -> Result<Self> {
        let tokenizer = files.require("processor/tokenizer.json")?.to_path_buf();
        let scheduler = files.require("scheduler/scheduler_config.json")?.to_path_buf();
        let model_index = files.path("model_index.json").map(PathBuf::from);
        let files = Files {
            text_encoder: owned(files.require_extension_in("text_encoder", "safetensors")?),
            transformer: owned(files.require_extension_in("transformer", "safetensors")?),
            vae: owned(files.require_extension_in("vae", "safetensors")?),
            vae_config: files.require("vae/config.json")?.to_path_buf(),
        };
        ensure_metal_device()?;
        let corrupt = |what: &str, e: anyhow::Error| {
            ErrorBody::new(codes::MODEL_NOT_INSTALLED, format!("{what} 读不出来：{e:#}"))
                .with_details(serde_json::json!({ "component": "image", "reason": "unreadable" }))
        };
        let prompter = Prompter::load(&tokenizer).map_err(|e| corrupt("processor/tokenizer.json", e))?;
        let scheduler = Schedule::load(&scheduler, model_index.as_deref())
            .map_err(|e| corrupt("scheduler/scheduler_config.json / model_index.json", e))?;
        Ok(Self {
            options: Options::default(),
            files,
            prompter,
            scheduler,
            picked: None,
        })
    }

    fn compute_dtype(&mut self) -> Result<Dtype> {
        if let Some(d) = self.options.dit_dtype.or(self.picked) {
            return Ok(d);
        }
        let t = Instant::now();
        let p = Precision::probe()?;
        let d = p.pick();
        trace!(
            "[dit] 精度探测 {:.2}s：4-bit 矩阵乘 f16 {:.1} ms、bf16 {:.1} ms → {d:?}",
            t.elapsed().as_secs_f64(),
            p.f16_ms,
            p.bf16_ms
        );
        clear_memory_cache()?;
        self.picked = Some(d);
        Ok(d)
    }

    fn run(&mut self, request: &ImageRequest, progress: &mut dyn FnMut(ImageProgress), cancel: &dyn Fn() -> bool) -> Result<RawImage> {
        let total = Instant::now();
        let (w, h, steps) = (request.width as usize, request.height as usize, request.steps as usize);
        let (gh, gw) = (h / 16, w / 16);
        let guard = CacheLimit::enter(DIT_CACHE_LIMIT);
        check(cancel)?;
        let compute = self.compute_dtype()?;

        // 1. 条件编码（改图时还有视觉塔与条件图的 VAE 编码）
        progress(ImageProgress::EncodingPrompt);
        let t0 = Instant::now();
        phase_start();
        let (cond, conds) = match &request.inputs {
            ImageInputs::Edit(images) => self.encode_edit(&request.prompt, images, cancel)?,
            _ => {
                let ids = self.prompter.t2i_ids(&request.prompt);
                let cond = text_encoder::encode_streaming(&self.files.text_encoder, &ids, self.prompter.drop_idx())?;
                trace!("[text] {} tokens（丢弃系统前缀 {}）", ids.len(), self.prompter.drop_idx());
                (cond, Vec::new())
            }
        };
        clear_memory_cache()?;
        trace!("[text] 条件 {:?}，{:.1}s", cond.shape(), t0.elapsed().as_secs_f64());
        mem("after text");
        check(cancel)?;

        // 以图为底重画：源图盖满输出尺寸后 VAE 编码，去噪从 `start` 步、按该步的 σ 混入噪声开始。
        let init = match &request.inputs {
            ImageInputs::Img2img { image, strength } => {
                let t = Instant::now();
                phase_start();
                let source = inputs::cover(image, request.width, request.height);
                let latents = self.encode_image(&source)?;
                let start = inputs::img2img_start(steps, *strength);
                trace!(
                    "[vae] 编码源图 {w}x{h} {:.1}s，strength {strength} → 从第 {start} 步开始",
                    t.elapsed().as_secs_f64()
                );
                mem("after vae encode");
                check(cancel)?;
                Some((latents, start))
            }
            _ => None,
        };

        // 2. DiT 去噪
        phase_start();
        let sigmas = self.scheduler.sigmas(steps, gh * gw);
        let prec = Precision {
            compute,
            dequant: self.options.dit_dequant,
        };
        let init = init.as_ref().map(|(l, s)| (l, *s));
        let images: Vec<CondImage<'_>> = conds
            .iter()
            .map(|c| CondImage {
                latents: &c.latents,
                h: c.h,
                w: c.w,
                at: c.at,
            })
            .collect();
        let latents = match self.denoise(&cond, &images, &sigmas, init, prec, request, progress, cancel) {
            // f16 只有 5 位指数；万一溢出就用与参考管线相同的 bf16 从头重跑（同一 seed）。
            Err(e) if e.downcast_ref::<Overflow>().is_some() => {
                trace!("[dit] {e}，改用 bf16 重跑");
                clear_memory_cache()?;
                let prec = Precision {
                    compute: Dtype::Bfloat16,
                    ..prec
                };
                self.denoise(&cond, &images, &sigmas, init, prec, request, progress, cancel)?
            }
            r => r?,
        };
        drop(images);
        drop(conds);
        drop(cond);
        check(cancel)?;
        guard.phase(VAE_CACHE_LIMIT)?;

        // 3. VAE 解码
        progress(ImageProgress::Decoding);
        let t2 = Instant::now();
        phase_start();
        let lat = latents.reshape(&[1, gh as i32, gw as i32, vae::Z_DIM])?;
        drop(latents);
        let tail_rows = self.options.vae_tail_rows;
        let decode = |dtype| -> Result<RawImage> {
            let dec = vae::Decoder::load(&self.files.vae, &self.files.vae_config, dtype)?;
            to_rgba(&dec.decode_normalized(&lat, tail_rows)?)
        };
        let vae_dtype = self.options.vae_dtype;
        let image = match decode(vae_dtype) {
            // f16 只有 5 位指数；万一上溢就用与 f32 同指数范围的 bf16 重解。
            Err(e) if vae_dtype == Dtype::Float16 => {
                trace!("[vae] {e:#}，改用 bf16 重解");
                clear_memory_cache()?;
                decode(Dtype::Bfloat16)?
            }
            r => r?,
        };
        trace!("[vae] 解码 {:.1}s", t2.elapsed().as_secs_f64());
        mem("vae done");
        drop(lat);
        drop(guard);
        trace!(
            "{w}x{h} {steps} steps seed {}（总计 {:.1}s）",
            request.seed,
            total.elapsed().as_secs_f64()
        );
        Ok(image)
    }

    /// 一张图（已缩放到目标尺寸）→ 归一化 latent `[1, h/16·w/16, 64]`。f16 上溢时改 bf16 重编。
    fn encode_image(&self, image: &inputs::Planes) -> Result<Array> {
        let (h, w) = (image.height as i32, image.width as i32);
        let pixels = Array::from_slice(&image.vae_rgba(), &[1, h, w, 4]);
        let encode =
            |dtype| -> Result<Array> { vae::Encoder::load(&self.files.vae, &self.files.vae_config, dtype)?.encode_normalized(&pixels) };
        let vae_dtype = self.options.vae_dtype;
        let z = match encode(vae_dtype) {
            Err(e) if vae_dtype == Dtype::Float16 => {
                trace!("[vae] {e:#}，改用 bf16 重编");
                clear_memory_cache()?;
                encode(Dtype::Bfloat16)?
            }
            r => r?,
        };
        let z = z.reshape(&[1, (h / 16) * (w / 16), vae::Z_DIM])?;
        z.eval()?;
        clear_memory_cache()?;
        Ok(z)
    }

    /// 改图的条件：每张图按 `calculate_dimensions(1024², 宽高比)` 缩放一次，同一份像素给视觉塔（alpha 合成到白底）与 VAE
    /// （保留 alpha）。视觉塔逐张跑完即释放，再流式跑语言模型，最后逐张 VAE 编码。返回条件编码与各条件图在其中的位置。
    fn encode_edit(&self, prompt: &str, images: &[RawImage], cancel: &dyn Fn() -> bool) -> Result<(Array, Vec<Cond>)> {
        let planes: Vec<inputs::Planes> = images
            .iter()
            .map(|image| {
                let (w, h) = inputs::condition_size(image);
                inputs::resize(image, w, h)
            })
            .collect();
        let t = Instant::now();
        let tower = VisionTower::load(&self.files.text_encoder)?;
        let mut features = Vec::with_capacity(planes.len());
        for p in &planes {
            check(cancel)?;
            features.push(tower.forward(p)?);
        }
        drop(tower);
        clear_memory_cache()?;
        trace!(
            "[vision] {} 张（{}）{:.1}s",
            planes.len(),
            planes
                .iter()
                .map(|p| format!("{}x{}", p.width, p.height))
                .collect::<Vec<_>>()
                .join("、"),
            t.elapsed().as_secs_f64()
        );
        mem("after vision");
        check(cancel)?;
        let pads: Vec<usize> = planes.iter().map(|p| inputs::vision_tokens(p.width, p.height)).collect();
        let grids: Vec<(usize, usize)> = planes
            .iter()
            .map(|p| {
                let (gh, gw) = inputs::vision_grid(p.width, p.height);
                (gh / inputs::MERGE, gw / inputs::MERGE)
            })
            .collect();
        let ids = self.prompter.ti2i_ids(prompt, &pads)?;
        let pad = self
            .prompter
            .added_id(IMAGE_PAD)
            .ok_or_else(|| anyhow!("分词表里没有 {IMAGE_PAD}"))?;
        let drop_idx = self.prompter.drop_idx();
        let runs = text_encoder::pad_runs(&ids, pad);
        if runs.iter().any(|&(start, _)| start < drop_idx) {
            return Err(anyhow!("图像 token 落在系统前缀里"));
        }
        let cond = text_encoder::encode_edit(&self.files.text_encoder, &ids, drop_idx, pad, &features, &grids)?;
        drop(features);
        clear_memory_cache()?;
        trace!(
            "[text] {} tokens（其中视觉 {}，丢弃系统前缀 {drop_idx}）",
            ids.len(),
            pads.iter().sum::<usize>()
        );
        mem("after text");
        let mut conds = Vec::with_capacity(planes.len());
        for (p, &(start, _)) in planes.iter().zip(&runs) {
            check(cancel)?;
            conds.push(Cond {
                latents: self.encode_image(p)?,
                h: p.height as usize / 16,
                w: p.width as usize / 16,
                at: start - drop_idx,
            });
        }
        mem("after vae encode");
        Ok((cond, conds))
    }

    /// `init` 是以图为底重画的起点：源图 latent 与从第几步开始。进度的总数是实际要跑的步数。
    #[allow(clippy::too_many_arguments)]
    fn denoise(
        &self,
        cond: &Array,
        images: &[CondImage<'_>],
        sigmas: &[f64],
        init: Option<(&Array, usize)>,
        prec: Precision,
        request: &ImageRequest,
        progress: &mut dyn FnMut(ImageProgress),
        cancel: &dyn Fn() -> bool,
    ) -> Result<Array> {
        let (gh, gw) = (request.height as usize / 16, request.width as usize / 16);
        let t1 = Instant::now();
        let mut dit = Dit::load(&self.files.transformer, prec)?;
        trace!(
            "[dit] 加载 {:.1}s（{:?}{}）",
            t1.elapsed().as_secs_f64(),
            prec.compute,
            if prec.dequant { "，整层解量化" } else { "" }
        );
        mem("dit loaded");
        let mut cache = dit.prepare(cond, images, &sigmas[..request.steps as usize], gh, gw)?;
        let key = random::key(request.seed)?;
        let noise = random::normal::<f32>(&[1, (gh * gw) as i32, vae::Z_DIM], None, None, &key)?;
        let (mut x, start) = match init {
            // 流匹配的前向过程：x_σ = (1 − σ)·x₀ + σ·ε。
            Some((source, start)) => {
                let sigma = sigmas[start] as f32;
                let x = source
                    .multiply(&Array::from_f32(1.0 - sigma))?
                    .add(&noise.multiply(&Array::from_f32(sigma))?)?;
                (x, start)
            }
            None => (noise, 0),
        };
        x.eval()?;
        let steps = request.steps as usize;
        let total = (steps - start) as u32;
        progress(ImageProgress::Denoising { done: 0, total });
        for i in start..steps {
            check(cancel)?;
            let ts = Instant::now();
            let v = dit.step(&mut cache, &x, i, gh, gw, self.options.dit_chunk)?;
            let dt = (sigmas[i + 1] - sigmas[i]) as f32;
            x = x.add(&v.multiply(&Array::from_f32(dt))?)?;
            x.eval()?;
            trace!(
                "[dit] step {}/{steps} sigma {:.4} {:.2}s",
                i + 1,
                sigmas[i],
                ts.elapsed().as_secs_f64()
            );
            progress(ImageProgress::Denoising {
                done: (i + 1 - start) as u32,
                total,
            });
        }
        mem("dit done");
        Ok(x)
    }
}

impl ImageEngine for QwenImage {
    fn family(&self) -> &'static str {
        FAMILY_QWEN_IMAGE
    }

    fn default_steps(&self) -> u32 {
        self.scheduler.default_steps(super::DEFAULT_STEPS)
    }

    fn check_size(&self, width: u32, height: u32) -> Result<(), ErrorBody> {
        super::check_size(width, height)
    }

    fn supports_img2img(&self) -> bool {
        true
    }

    fn max_edit_images(&self) -> usize {
        MAX_EDIT_IMAGES
    }

    fn generate(&mut self, request: &ImageRequest, progress: &mut dyn FnMut(ImageProgress), cancel: &dyn Fn() -> bool) -> Result<RawImage> {
        super::check_size(request.width, request.height)?;
        if request.steps == 0 {
            return Err(ErrorBody::invalid_params("steps 至少 1").into());
        }
        self.scheduler.check_steps(request.steps)?;
        let image = self.run(request, progress, cancel)?;
        if (image.width, image.height) != (request.width, request.height) {
            return Err(anyhow!(
                "解码尺寸 {}x{} 与请求 {}x{} 不符",
                image.width,
                image.height,
                request.width,
                request.height
            ));
        }
        Ok(image)
    }
}

impl Drop for QwenImage {
    fn drop(&mut self) {
        synchronize();
        let _ = clear_memory_cache();
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::backend::mlx::runtime::MLX_TEST_LOCK;
    use crate::bundle::{FileEntry, ModelFiles};

    fn lock() -> std::sync::MutexGuard<'static, ()> {
        MLX_TEST_LOCK.lock().unwrap_or_else(|e| e.into_inner())
    }

    #[test]
    fn cache_limit_guard_restores_the_previous_limit_even_on_panic() {
        let _lock = lock();
        if ensure_metal_device().is_err() {
            return;
        }
        let base = memory::set_cache_limit(123 << 20);
        {
            let g = CacheLimit::enter(DIT_CACHE_LIMIT);
            assert_eq!(g.previous(), 123 << 20);
            g.phase(VAE_CACHE_LIMIT).unwrap();
        }
        assert_eq!(memory::set_cache_limit(123 << 20), 123 << 20);
        let r = std::panic::catch_unwind(|| {
            let _g = CacheLimit::enter(0);
            panic!("boom");
        });
        assert!(r.is_err());
        assert_eq!(memory::set_cache_limit(base), 123 << 20);
    }

    #[test]
    fn load_reports_files_missing_from_the_manifest_as_not_installed() {
        let dir = tempfile::tempdir().unwrap();
        std::fs::create_dir_all(dir.path().join("processor")).unwrap();
        std::fs::write(dir.path().join("processor/tokenizer.json"), b"{}").unwrap();
        let files = ModelFiles {
            family: FAMILY_QWEN_IMAGE.into(),
            revision: "r".into(),
            dir: dir.path().to_string_lossy().into_owned(),
            files: vec![FileEntry {
                path: "processor/tokenizer.json".into(),
                sha256: "0".repeat(64),
                byte_length: 2,
            }],
        }
        .verify("image")
        .unwrap();
        let error = match QwenImage::load(&files) {
            Ok(_) => panic!("不该加载成功"),
            Err(error) => error.downcast_ref::<ErrorBody>().expect("ErrorBody").clone(),
        };
        assert_eq!(error.code, codes::MODEL_NOT_INSTALLED);
        assert!(error.message.contains("scheduler/scheduler_config.json"), "{}", error.message);
    }

    /// 按 `.bcut-manifest.json` 拼 `image` 组件（只读；不写安装记录）。
    fn installed(root: &std::path::Path) -> VerifiedFiles {
        let dir = root.join("mlx-community/Qwen-Image-2.1-MLX-4bit");
        let manifest: serde_json::Value =
            serde_json::from_slice(&std::fs::read(dir.join(".bcut-manifest.json")).expect("read .bcut-manifest.json")).unwrap();
        let files = manifest["files"]
            .as_array()
            .unwrap()
            .iter()
            .map(|file| FileEntry {
                path: file["path"].as_str().unwrap().into(),
                sha256: file["sha256"].as_str().unwrap_or_default().into(),
                byte_length: file["size"].as_u64().unwrap(),
            })
            .collect();
        ModelFiles {
            family: FAMILY_QWEN_IMAGE.into(),
            revision: manifest["revision"].as_str().unwrap().into(),
            dir: dir.to_string_lossy().into_owned(),
            files,
        }
        .verify("image")
        .unwrap()
    }

    /// 真跑（要装好的权重，约 1 分钟）：256² 2 步生成一张，核对尺寸、阶段、缓存上限已还原、引擎析构后活跃内存回落。
    ///
    /// ```sh
    /// BAOCUT_TEST_MODELS_DIR=/path/to/models cargo test -p model-runtime --lib -- --ignored \
    ///   engine_releases_memory_and_restores_the_cache_limit --test-threads=1 --nocapture
    /// ```
    #[test]
    #[ignore = "需要 BAOCUT_TEST_MODELS_DIR 下装好的 Qwen-Image-2.1 与 Metal"]
    fn engine_releases_memory_and_restores_the_cache_limit() {
        let _lock = lock();
        let root = std::env::var("BAOCUT_TEST_MODELS_DIR").expect("BAOCUT_TEST_MODELS_DIR");
        let files = installed(std::path::Path::new(&root));
        // 量峰值时可以换尺寸：`BAOCUT_TEST_IMAGE_EDGE=1024`（正方形，2 步；峰值与步数无关）。
        let edge: u32 = std::env::var("BAOCUT_TEST_IMAGE_EDGE")
            .ok()
            .and_then(|v| v.parse().ok())
            .unwrap_or(256);
        let before = memory::set_cache_limit(77 << 20);
        let mut engine = QwenImage::load(&files).unwrap();
        let request = ImageRequest {
            prompt: "a red apple on a wooden table".into(),
            width: edge,
            height: edge,
            steps: 2,
            seed: 7,
            inputs: crate::image::ImageInputs::None,
        };
        let mut phases = Vec::new();
        let image = engine.generate(&request, &mut |p| phases.push(p), &|| false).unwrap();
        assert_eq!((image.width, image.height), (edge, edge));
        assert_eq!(image.pixels.len(), (edge * edge * 4) as usize);
        assert_eq!(phases.first(), Some(&ImageProgress::EncodingPrompt));
        assert_eq!(phases.last(), Some(&ImageProgress::Decoding));
        assert!(phases.contains(&ImageProgress::Denoising { done: 0, total: 2 }));
        assert!(phases.contains(&ImageProgress::Denoising { done: 2, total: 2 }));
        drop(engine);
        let (active, cache, peak) = memory_snapshot();
        let (_, footprint_max) = footprint();
        eprintln!("析构后 MLX active {active} B、cache {cache} B、峰值 {peak} B；进程 footprint 最大 {footprint_max} B");
        assert!(active < UNLOADED_ACTIVE_MAX, "析构后活跃内存 {active} B");
        assert_eq!(cache, 0, "析构后缓存应已清空");
        assert_eq!(memory::set_cache_limit(before), 77 << 20, "缓存上限没还原");
    }

    /// 任意目录（不要求 `.bcut-manifest.json`）下的全部文件拼成 `image` 组件，供对比别的权重包。
    fn directory(dir: &std::path::Path) -> VerifiedFiles {
        fn walk(root: &std::path::Path, dir: &std::path::Path, out: &mut Vec<FileEntry>) {
            for entry in std::fs::read_dir(dir).unwrap() {
                let path = entry.unwrap().path();
                if path.is_dir() {
                    walk(root, &path, out);
                } else if !path.file_name().unwrap().to_string_lossy().starts_with('.') {
                    out.push(FileEntry {
                        path: path.strip_prefix(root).unwrap().to_string_lossy().into_owned(),
                        sha256: String::new(),
                        byte_length: path.metadata().unwrap().len(),
                    });
                }
            }
        }
        let mut files = Vec::new();
        walk(dir, dir, &mut files);
        ModelFiles {
            family: FAMILY_QWEN_IMAGE.into(),
            revision: "local".into(),
            dir: dir.to_string_lossy().into_owned(),
            files,
        }
        .verify("image")
        .unwrap()
    }

    /// 样张与计时：按 JSON 清单（`[{id, prompt, width, height, seed}]`）逐张生成，写 `<id>.png` 与 `timing.jsonl`
    /// （文本编码、每步去噪、VAE 解码与总耗时，秒）。`BAOCUT_BENCH_STEPS` 不给时用模型的默认步数。
    ///
    /// ```sh
    /// BAOCUT_BENCH_MODEL_DIR=/path/to/pack BAOCUT_BENCH_PROMPTS=prompts.json BAOCUT_BENCH_OUT=out \
    ///   cargo test -p model-runtime --release --lib -- --ignored bench_samples --nocapture
    /// ```
    #[test]
    #[ignore = "需要 BAOCUT_BENCH_MODEL_DIR 下的 Qwen-Image 权重包与 Metal"]
    fn bench_samples() {
        // 每条可带 `images`（路径）、`mode`（`ref` | `img2img`）与 `strength`。
        fn bench_inputs(item: &serde_json::Value) -> crate::image::ImageInputs {
            let Some(paths) = item["images"].as_array() else {
                return crate::image::ImageInputs::None;
            };
            let mut images: Vec<RawImage> = paths
                .iter()
                .map(|p| crate::image::job::decode_image(std::path::Path::new(p.as_str().unwrap())).unwrap())
                .collect();
            match item["mode"].as_str() {
                Some("img2img") => crate::image::ImageInputs::Img2img {
                    image: images.remove(0),
                    strength: item["strength"].as_f64().unwrap(),
                },
                _ => crate::image::ImageInputs::Edit(images),
            }
        }
        let _lock = lock();
        let env = |name: &str| std::env::var(name).unwrap_or_else(|_| panic!("{name}"));
        let files = directory(std::path::Path::new(&env("BAOCUT_BENCH_MODEL_DIR")));
        let prompts: Vec<serde_json::Value> = serde_json::from_slice(&std::fs::read(env("BAOCUT_BENCH_PROMPTS")).unwrap()).unwrap();
        let out = PathBuf::from(env("BAOCUT_BENCH_OUT"));
        std::fs::create_dir_all(&out).unwrap();
        let mut engine = QwenImage::load(&files).unwrap();
        let steps = std::env::var("BAOCUT_BENCH_STEPS")
            .ok()
            .and_then(|v| v.parse().ok())
            .unwrap_or_else(|| engine.default_steps());
        for item in prompts {
            let id = item["id"].as_str().unwrap().to_owned();
            let request = ImageRequest {
                prompt: item["prompt"].as_str().unwrap().into(),
                width: item["width"].as_u64().unwrap() as u32,
                height: item["height"].as_u64().unwrap() as u32,
                steps,
                seed: item["seed"].as_u64().unwrap(),
                inputs: bench_inputs(&item),
            };
            let start = Instant::now();
            let mut marks: Vec<(ImageProgress, f64)> = Vec::new();
            let image = engine
                .generate(&request, &mut |p| marks.push((p, start.elapsed().as_secs_f64())), &|| false)
                .unwrap();
            let total = start.elapsed().as_secs_f64();
            std::fs::write(out.join(format!("{id}.png")), crate::image::png::encode_rgba(&image).unwrap()).unwrap();
            let at = |want: ImageProgress| marks.iter().find(|(p, _)| *p == want).map(|(_, t)| *t).unwrap();
            // 以图为底重画只跑后面几步：进度的总数是实际步数。
            let run = marks
                .iter()
                .find_map(|(p, _)| match p {
                    ImageProgress::Denoising { total, .. } => Some(*total),
                    _ => None,
                })
                .unwrap();
            let denoise_start = at(ImageProgress::Denoising { done: 0, total: run });
            let decode_start = at(ImageProgress::Decoding);
            let mut step_times = Vec::new();
            let mut last = denoise_start;
            for done in 1..=run {
                let t = at(ImageProgress::Denoising { done, total: run });
                step_times.push(((t - last) * 100.0).round() / 100.0);
                last = t;
            }
            let line = serde_json::json!({
                "id": id, "width": request.width, "height": request.height, "steps": steps, "ran": run, "seed": request.seed,
                "text": denoise_start, "denoise": decode_start - denoise_start, "decode": total - decode_start,
                "total": total, "stepSeconds": step_times,
            });
            eprintln!("{line}");
            let mut log = std::fs::OpenOptions::new()
                .create(true)
                .append(true)
                .open(out.join("timing.jsonl"))
                .unwrap();
            std::io::Write::write_all(&mut log, format!("{line}\n").as_bytes()).unwrap();
        }
    }
}
