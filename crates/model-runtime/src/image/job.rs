//! `job.run`（capability `image`）的编排（Model Worker 协议规范 §2.5.3）：冻结参数 → [`ImageRequest`] → 引擎生成 →
//! `image.png`（`baocut.image-png/v1`）。
//!
//! 阶段：`encoding-prompt` → `denoising`（`job.progress` 的 `steps`：开始时报 `0/n`，每完成一步报一次）→ `decoding`
//! （VAE 解码与写 PNG）。取消：引擎在步间看取消标志，之后结果是 `outcome: 'cancelled'`，不写输出。
//!
//! 模型做不到的尺寸在开跑前报 `MODEL_UNSUPPORTED`（`details.reason: 'unsupported-size'`）；Runtime 在提交时已经按模型
//! 的描述拒绝过，这里是同一条规则在 Worker 一侧的兜底。输入图同理：模型不收这种用法或张数超了是 `MODEL_UNSUPPORTED`，
//! 读不出、解不开是 `INPUT_UNREADABLE`（`details.input: 'image'`，带序号）。引擎内部的其余失败是 `INFERENCE_FAILED`
//! （细节只写 stderr，消息里不带路径）。

use std::fs::File;
use std::io::Write;
use std::path::Path;
use std::sync::atomic::{AtomicBool, Ordering};
use std::time::Instant;

use serde_json::json;

use super::{Cancelled, ImageEngine, ImageInputs, ImageProgress, ImageRequest, RawImage, png};
use crate::asr_result::sha256_hex;
use crate::protocol::{
    ErrorBody, GeneratedImage, IMAGE_OUTPUT_FILE, ImageMode, ImageOptions, ImageRunParams, ImageRunResult, ImageStats, JobOutcome,
    OutputFile, codes,
};
use crate::transcribe::JobSink;

/// 跑一个文生图任务。返回的错误就是该请求的错误响应。
pub fn run(
    engine: &mut dyn ImageEngine,
    params: &ImageRunParams,
    cancel: &AtomicBool,
    sink: &mut dyn JobSink,
) -> Result<ImageRunResult, ErrorBody> {
    params.validate()?;
    let staging = Path::new(&params.staging);
    if !staging.is_dir() {
        return Err(ErrorBody::invalid_params("staging must be an existing absolute directory"));
    }
    let options = &params.options;
    engine.check_size(options.width, options.height)?;
    check_inputs(engine, options)?;
    let request = ImageRequest {
        prompt: options.prompt.clone(),
        width: options.width,
        height: options.height,
        steps: options.steps.unwrap_or_else(|| engine.default_steps()),
        seed: options.seed,
        inputs: read_inputs(options)?,
    };
    let job_id = params.job_id.as_str();
    let mut stats = ImageStats::default();
    let cancelled = |stats: ImageStats| ImageRunResult {
        outcome: JobOutcome::Cancelled,
        output: None,
        image: None,
        stats,
    };
    if cancel.load(Ordering::SeqCst) {
        return Ok(cancelled(stats));
    }

    let started = Instant::now();
    let generated = {
        let mut on_progress = |progress: ImageProgress| match progress {
            ImageProgress::EncodingPrompt => phase(sink, job_id, "encoding-prompt"),
            ImageProgress::Denoising { done, total } => {
                if done == 0 {
                    phase(sink, job_id, "denoising");
                }
                sink.event(
                    "job.progress",
                    json!({ "jobId": job_id, "phase": "denoising", "done": done, "total": total, "unit": "steps" }),
                );
            }
            ImageProgress::Decoding => phase(sink, job_id, "decoding"),
        };
        let stop = || cancel.load(Ordering::SeqCst);
        engine.generate(&request, &mut on_progress, &stop)
    };
    stats.generation_ms = started.elapsed().as_millis() as u64;
    let image = match generated {
        _ if cancel.load(Ordering::SeqCst) => return Ok(cancelled(stats)),
        Err(error) if error.is::<Cancelled>() => return Ok(cancelled(stats)),
        Ok(image) => image,
        Err(error) => return Err(inference_failed(engine.family(), &error)),
    };
    if (image.width, image.height) != (request.width, request.height) {
        eprintln!(
            "[model-worker] {} produced {}x{} for a {}x{} request",
            engine.family(),
            image.width,
            image.height,
            request.width,
            request.height
        );
        return Err(
            ErrorBody::new(codes::INFERENCE_FAILED, "the model produced an image of the wrong size")
                .with_details(json!({ "family": engine.family(), "reason": "size-mismatch" })),
        );
    }

    let started = Instant::now();
    let bytes = png::encode_rgba(&image).map_err(|error| inference_failed(engine.family(), &error))?;
    let output = write_output(staging, &bytes).map_err(|error| {
        eprintln!("[model-worker] writing {IMAGE_OUTPUT_FILE} failed: {error}");
        ErrorBody::new(codes::INFERENCE_FAILED, format!("could not write {IMAGE_OUTPUT_FILE}"))
            .with_details(json!({ "reason": "write-failed" }))
    })?;
    stats.encode_ms = started.elapsed().as_millis() as u64;
    Ok(ImageRunResult {
        outcome: JobOutcome::Completed,
        output: Some(output),
        image: Some(GeneratedImage {
            width: image.width,
            height: image.height,
            format: "png".into(),
            seed: request.seed,
            steps: request.steps,
        }),
        stats,
    })
}

/// 模型收不收这些输入图：用法不支持、张数超了都是 `MODEL_UNSUPPORTED`（Runtime 在提交时已按模型描述拒绝过，这里兜底）。
fn check_inputs(engine: &dyn ImageEngine, options: &ImageOptions) -> Result<(), ErrorBody> {
    let family = engine.family();
    let unsupported = |reason: &str, max: usize| {
        ErrorBody::new(
            codes::MODEL_UNSUPPORTED,
            format!("{family} cannot take {} input image(s) this way", options.images.len()),
        )
        .with_details(json!({ "family": family, "reason": reason, "count": options.images.len(), "max": max }))
    };
    match options.image_mode {
        None => Ok(()),
        Some(ImageMode::Img2img) if !engine.supports_img2img() => Err(unsupported("img2img-unsupported", 0)),
        Some(ImageMode::Img2img) => Ok(()),
        Some(ImageMode::Ref) => {
            let max = engine.max_edit_images();
            match max {
                0 => Err(unsupported("images-unsupported", 0)),
                _ if options.images.len() > max => Err(unsupported("too-many-images", max)),
                _ => Ok(()),
            }
        }
    }
}

/// 按顺序解开输入图（格式按文件头认，只收 PNG、JPEG、WebP）。读不出或解不开是 `INPUT_UNREADABLE`，消息不带路径。
fn read_inputs(options: &ImageOptions) -> Result<ImageInputs, ErrorBody> {
    let mut images = Vec::with_capacity(options.images.len());
    for (index, input) in options.images.iter().enumerate() {
        images.push(decode_image(Path::new(&input.file)).map_err(|error| {
            eprintln!("[model-worker] input image {} unreadable: {error:#}", index + 1);
            ErrorBody::new(codes::INPUT_UNREADABLE, format!("input image {} could not be read", index + 1))
                .with_details(json!({ "input": "image", "index": index }))
        })?);
    }
    Ok(match (options.image_mode, options.strength) {
        (None, _) => ImageInputs::None,
        (Some(ImageMode::Ref), _) => ImageInputs::Edit(images),
        (Some(ImageMode::Img2img), strength) => ImageInputs::Img2img {
            image: images.remove(0),
            strength: strength.unwrap_or(1.0),
        },
    })
}

/// 解一张图成 8 位 RGBA。
pub fn decode_image(path: &Path) -> anyhow::Result<RawImage> {
    let reader = image::ImageReader::open(path)?.with_guessed_format()?;
    let rgba = reader.decode()?.into_rgba8();
    Ok(RawImage {
        width: rgba.width(),
        height: rgba.height(),
        pixels: rgba.into_raw(),
    })
}

fn inference_failed(family: &str, error: &anyhow::Error) -> ErrorBody {
    if let Some(body) = error.downcast_ref::<ErrorBody>() {
        return body.clone();
    }
    eprintln!("[model-worker] {family} image generation failed: {error:#}");
    ErrorBody::new(codes::INFERENCE_FAILED, format!("{family} image generation failed"))
        .with_details(json!({ "family": family, "reason": "generation-failed" }))
}

/// `image.png`：先写临时文件再重命名。路径是绝对路径（staging 是绝对路径）。
fn write_output(staging: &Path, bytes: &[u8]) -> std::io::Result<OutputFile> {
    let path = staging.join(IMAGE_OUTPUT_FILE);
    let temporary = staging.join(format!("{IMAGE_OUTPUT_FILE}.tmp"));
    {
        let mut file = File::create(&temporary)?;
        file.write_all(bytes)?;
        file.sync_all()?;
    }
    std::fs::rename(&temporary, &path)?;
    Ok(OutputFile {
        path: path.to_string_lossy().into_owned(),
        sha256: sha256_hex(bytes),
        byte_length: bytes.len() as u64,
    })
}

fn phase(sink: &mut dyn JobSink, job_id: &str, phase: &str) {
    sink.event("job.phase", json!({ "jobId": job_id, "phase": phase }));
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::image::{RawImage, unsupported_size};
    use crate::protocol::{Capability, IMAGE_OUTPUT_CONTRACT, ImageInput};
    use anyhow::bail;
    use serde_json::Value;

    /// 假引擎：每步报一次进度，按 seed 填一张渐变；`cancel_after` 步后把取消标志置上。
    struct FakeEngine {
        fail: bool,
        wrong_size: bool,
        no_inputs: bool,
        cancel_after: Option<(u32, &'static AtomicBool)>,
        seen: Option<ImageRequest>,
    }

    impl FakeEngine {
        fn new() -> Self {
            Self {
                fail: false,
                wrong_size: false,
                no_inputs: false,
                cancel_after: None,
                seen: None,
            }
        }
    }

    impl ImageEngine for FakeEngine {
        fn family(&self) -> &'static str {
            "qwen-image"
        }
        fn default_steps(&self) -> u32 {
            3
        }
        fn check_size(&self, width: u32, height: u32) -> Result<(), ErrorBody> {
            if width % 32 != 0 || height % 32 != 0 {
                return Err(unsupported_size("qwen-image", width, height, "multiple-of-32"));
            }
            Ok(())
        }
        fn max_edit_images(&self) -> usize {
            if self.no_inputs { 0 } else { 2 }
        }
        fn supports_img2img(&self) -> bool {
            !self.no_inputs
        }
        fn generate(
            &mut self,
            request: &ImageRequest,
            progress: &mut dyn FnMut(ImageProgress),
            cancel: &dyn Fn() -> bool,
        ) -> anyhow::Result<RawImage> {
            self.seen = Some(request.clone());
            if self.fail {
                bail!("权重坏了：/secret/path/model.safetensors");
            }
            progress(ImageProgress::EncodingPrompt);
            progress(ImageProgress::Denoising {
                done: 0,
                total: request.steps,
            });
            for step in 1..=request.steps {
                if cancel() {
                    return Err(Cancelled.into());
                }
                if let Some((at, flag)) = self.cancel_after
                    && at == step
                {
                    flag.store(true, Ordering::SeqCst);
                }
                progress(ImageProgress::Denoising {
                    done: step,
                    total: request.steps,
                });
            }
            progress(ImageProgress::Decoding);
            let (width, height) = if self.wrong_size {
                (request.width / 2, request.height)
            } else {
                (request.width, request.height)
            };
            let pixels = (0..width * height)
                .flat_map(|i| [(i % 256) as u8, (request.seed % 256) as u8, 0, 255])
                .collect();
            Ok(RawImage { width, height, pixels })
        }
    }

    #[derive(Default)]
    struct Events(Vec<(String, Value)>);

    impl JobSink for Events {
        fn event(&mut self, name: &str, params: Value) {
            self.0.push((name.to_owned(), params));
        }
    }

    impl Events {
        fn phases(&self) -> Vec<&str> {
            self.0
                .iter()
                .filter(|(name, _)| name == "job.phase")
                .map(|(_, params)| params["phase"].as_str().unwrap())
                .collect()
        }
        fn progress(&self) -> Vec<(u64, u64)> {
            self.0
                .iter()
                .filter(|(name, _)| name == "job.progress")
                .map(|(_, params)| {
                    assert_eq!(params["unit"], "steps");
                    assert_eq!(params["phase"], "denoising");
                    (params["done"].as_u64().unwrap(), params["total"].as_u64().unwrap())
                })
                .collect()
        }
    }

    fn params(staging: &Path) -> ImageRunParams {
        ImageRunParams {
            job_id: "job_1".into(),
            run_generation: 1,
            capability: Capability::Image,
            options: ImageOptions {
                prompt: "a red apple on a wooden table".into(),
                width: 64,
                height: 32,
                steps: None,
                seed: 7,
                images: Vec::new(),
                image_mode: None,
                strength: None,
            },
            staging: staging.to_string_lossy().into_owned(),
            output_contract: IMAGE_OUTPUT_CONTRACT.into(),
        }
    }

    #[test]
    fn writes_image_png_with_phases_and_step_progress() {
        let staging = tempfile::tempdir().unwrap();
        let mut engine = FakeEngine::new();
        let mut events = Events::default();
        let result = run(&mut engine, &params(staging.path()), &AtomicBool::new(false), &mut events).unwrap();

        assert_eq!(result.outcome, JobOutcome::Completed);
        assert_eq!(events.phases(), ["encoding-prompt", "denoising", "decoding"]);
        assert_eq!(events.progress(), [(0, 3), (1, 3), (2, 3), (3, 3)]);
        let output = result.output.unwrap();
        let path = staging.path().join(IMAGE_OUTPUT_FILE);
        assert_eq!(output.path, path.to_string_lossy());
        let bytes = std::fs::read(&path).unwrap();
        assert_eq!(output.byte_length, bytes.len() as u64);
        assert_eq!(output.sha256, sha256_hex(&bytes));
        assert!(!staging.path().join("image.png.tmp").exists());
        let (width, height, pixels) = png::decode_rgba(&bytes);
        assert_eq!((width, height, pixels.len()), (64, 32, 64 * 32 * 4));
        assert_eq!(pixels[1], 7, "the seed reaches the engine");
        assert_eq!(
            result.image,
            Some(GeneratedImage {
                width: 64,
                height: 32,
                format: "png".into(),
                seed: 7,
                steps: 3
            })
        );
        let seen = engine.seen.unwrap();
        assert_eq!((seen.steps, seen.seed), (3, 7), "null steps use the model default");

        let mut explicit = params(staging.path());
        explicit.options.steps = Some(2);
        let mut engine = FakeEngine::new();
        run(&mut engine, &explicit, &AtomicBool::new(false), &mut Events::default()).unwrap();
        assert_eq!(engine.seen.unwrap().steps, 2);
    }

    /// 在 `dir` 里写一张 `width × height` 的 PNG，返回绝对路径。
    fn write_png(dir: &Path, name: &str, width: u32, height: u32) -> String {
        let image = RawImage {
            width,
            height,
            pixels: (0..width * height).flat_map(|i| [(i % 251) as u8, 9, 200, 128]).collect(),
        };
        let path = dir.join(name);
        std::fs::write(&path, png::encode_rgba(&image).unwrap()).unwrap();
        path.to_string_lossy().into_owned()
    }

    #[test]
    fn input_images_reach_the_engine_decoded_and_in_order() {
        let staging = tempfile::tempdir().unwrap();
        let base = write_png(staging.path(), "base.png", 5, 3);
        let reference = write_png(staging.path(), "ref.png", 2, 7);
        let mut job = params(staging.path());
        job.options.images = vec![ImageInput { file: base.clone() }, ImageInput { file: reference }];
        job.options.image_mode = Some(ImageMode::Ref);
        let mut engine = FakeEngine::new();
        run(&mut engine, &job, &AtomicBool::new(false), &mut Events::default()).unwrap();
        let ImageInputs::Edit(images) = engine.seen.unwrap().inputs else {
            panic!("edit inputs")
        };
        assert_eq!(images.iter().map(|i| (i.width, i.height)).collect::<Vec<_>>(), [(5, 3), (2, 7)]);
        assert_eq!(&images[0].pixels[..4], &[0, 9, 200, 128]);

        let mut job = params(staging.path());
        job.options.images = vec![ImageInput { file: base }];
        job.options.image_mode = Some(ImageMode::Img2img);
        job.options.strength = Some(0.3);
        let mut engine = FakeEngine::new();
        run(&mut engine, &job, &AtomicBool::new(false), &mut Events::default()).unwrap();
        let ImageInputs::Img2img { image, strength } = engine.seen.unwrap().inputs else {
            panic!("img2img inputs")
        };
        assert_eq!(((image.width, image.height)), (5, 3));
        assert_eq!(strength, 0.3);
    }

    #[test]
    fn input_images_the_model_cannot_take_or_read_fail_before_generating() {
        let staging = tempfile::tempdir().unwrap();
        let base = write_png(staging.path(), "base.png", 4, 4);
        let mut job = params(staging.path());
        job.options.images = vec![ImageInput { file: base.clone() }; 3];
        job.options.image_mode = Some(ImageMode::Ref);
        let mut engine = FakeEngine::new();
        let error = run(&mut engine, &job, &AtomicBool::new(false), &mut Events::default()).unwrap_err();
        assert_eq!(error.code, codes::MODEL_UNSUPPORTED);
        let details = error.details.unwrap();
        assert_eq!(
            (details["reason"].as_str(), details["max"].as_u64()),
            (Some("too-many-images"), Some(2))
        );
        assert!(engine.seen.is_none());

        job.options.images.truncate(1);
        job.options.image_mode = Some(ImageMode::Img2img);
        job.options.strength = Some(0.5);
        let mut engine = FakeEngine::new();
        engine.no_inputs = true;
        let error = run(&mut engine, &job, &AtomicBool::new(false), &mut Events::default()).unwrap_err();
        assert_eq!(error.details.unwrap()["reason"], "img2img-unsupported");

        let garbage = staging.path().join("garbage.png");
        std::fs::write(&garbage, b"not an image").unwrap();
        for file in [
            garbage.to_string_lossy().into_owned(),
            staging.path().join("missing.png").to_string_lossy().into_owned(),
        ] {
            job.options.images = vec![ImageInput { file }];
            let mut engine = FakeEngine::new();
            let error = run(&mut engine, &job, &AtomicBool::new(false), &mut Events::default()).unwrap_err();
            assert_eq!(error.code, codes::INPUT_UNREADABLE);
            assert!(!error.message.contains(&*staging.path().to_string_lossy()), "{}", error.message);
            let details = error.details.unwrap();
            assert_eq!((details["input"].as_str(), details["index"].as_u64()), (Some("image"), Some(0)));
            assert!(engine.seen.is_none());
        }
    }

    #[test]
    fn sizes_the_model_cannot_do_are_unsupported_before_generating() {
        let staging = tempfile::tempdir().unwrap();
        let mut engine = FakeEngine::new();
        let mut job = params(staging.path());
        job.options.width = 500;
        let error = run(&mut engine, &job, &AtomicBool::new(false), &mut Events::default()).unwrap_err();
        assert_eq!(error.code, codes::MODEL_UNSUPPORTED);
        assert_eq!(error.details.unwrap()["reason"], "unsupported-size");
        assert!(engine.seen.is_none());
    }

    #[test]
    fn cancel_between_steps_writes_nothing() {
        static CANCEL: AtomicBool = AtomicBool::new(false);
        let staging = tempfile::tempdir().unwrap();
        let mut engine = FakeEngine::new();
        engine.cancel_after = Some((1, &CANCEL));
        let mut events = Events::default();
        let result = run(&mut engine, &params(staging.path()), &CANCEL, &mut events).unwrap();
        assert_eq!(result.outcome, JobOutcome::Cancelled);
        assert_eq!((result.output, result.image), (None, None));
        assert_eq!(events.phases(), ["encoding-prompt", "denoising"], "no decoding after a cancel");
        assert!(!staging.path().join(IMAGE_OUTPUT_FILE).exists());

        // 开跑前就取消：不碰引擎。
        let mut engine = FakeEngine::new();
        let result = run(&mut engine, &params(staging.path()), &CANCEL, &mut Events::default()).unwrap();
        assert_eq!(result.outcome, JobOutcome::Cancelled);
        assert!(engine.seen.is_none());
    }

    #[test]
    fn engine_failures_are_inference_failed_without_paths() {
        let staging = tempfile::tempdir().unwrap();
        let mut engine = FakeEngine::new();
        engine.fail = true;
        let error = run(
            &mut engine,
            &params(staging.path()),
            &AtomicBool::new(false),
            &mut Events::default(),
        )
        .unwrap_err();
        assert_eq!(error.code, codes::INFERENCE_FAILED);
        assert!(error.retryable);
        assert!(!error.message.contains("/secret"), "{}", error.message);

        let mut engine = FakeEngine::new();
        engine.wrong_size = true;
        let error = run(
            &mut engine,
            &params(staging.path()),
            &AtomicBool::new(false),
            &mut Events::default(),
        )
        .unwrap_err();
        assert_eq!(error.code, codes::INFERENCE_FAILED);
        assert_eq!(error.details.unwrap()["reason"], "size-mismatch");
        assert!(!staging.path().join(IMAGE_OUTPUT_FILE).exists());
    }
}
