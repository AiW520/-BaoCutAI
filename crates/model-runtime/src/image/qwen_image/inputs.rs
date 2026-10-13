//! 输入图的预处理与位置表（纯逻辑，MLX 与 candle 共用）。
//!
//! 改图（diffusers `QwenImage21Pipeline` 带 `image`）：每张输入图按自己的宽高比缩到约 1024² 的面积、宽高取 32 的倍数
//! （[`condition_size`]），只缩放一次（Lanczos3，按预乘 alpha 算，与 PIL 对 RGBA 的做法相同），同一份像素喂给两处：
//! 视觉塔那份把 alpha 合成到白底（[`Planes::vision_rgb`]），VAE 那份保留四个通道（[`Planes::vae_rgba`]）。
//! 以图为底重画：底图按输出尺寸等比放大到盖满再居中裁切（[`cover`]），只经 VAE。
//!
//! 视觉塔（Qwen3-VL）按 16×16 的 patch 读图，2×2 个 patch 合成一个语言模型 token；patch 的次序是「合并块」次序
//! （先按 2×2 块行主序，块内再行主序），位置嵌入与 2D 旋转位置都按这个次序排（[`patchify`]、[`vision_pos_taps`]、
//! [`vision_rotary_positions`]）。语言模型的 3 轴 M-RoPE 位置在 [`mrope_positions`]。

use crate::image::RawImage;

/// 条件图的目标面积（diffusers 的 `output_resolution²`）。
pub const CONDITION_AREA: f64 = 1024.0 * 1024.0;
/// 视觉塔的 patch 边长与合并边长：一个语言模型 token 覆盖 32×32 像素。
pub const PATCH: usize = 16;
pub const MERGE: usize = 2;
/// 视觉塔的时间维：静止图把同一帧重复两次。
pub const TEMPORAL: usize = 2;
/// 一个 patch 展平后的长度：`C(3) × T(2) × 16 × 16`。
pub const PATCH_DIM: usize = 3 * TEMPORAL * PATCH * PATCH;
/// 视觉塔位置嵌入表的边长（48×48 = 2304）。
pub const POS_SIDE: usize = 48;

/// Python 的 `round`（银行家舍入），diffusers 的 `calculate_dimensions` 用的就是它。
fn round_half_even(x: f64) -> f64 {
    let r = x.round();
    if (x - x.trunc()).abs() == 0.5 && r % 2.0 != 0.0 {
        r - x.signum()
    } else {
        r
    }
}

/// diffusers 的 `calculate_dimensions(area, w/h)`：`w = sqrt(area·r)`、`h = w/r`，各自舍入到 32 的倍数（至少 32）。
pub fn calculate_dimensions(area: f64, width: u32, height: u32) -> (u32, u32) {
    let ratio = width as f64 / height as f64;
    let w = (area * ratio).sqrt();
    let h = w / ratio;
    let snap = |v: f64| ((round_half_even(v / 32.0) as u32) * 32).max(32);
    (snap(w), snap(h))
}

/// 改图时一张条件图缩到的尺寸。
pub fn condition_size(image: &RawImage) -> (u32, u32) {
    calculate_dimensions(CONDITION_AREA, image.width, image.height)
}

/// 缩放后的一张图：RGBA，范围 [0,1]，非预乘，行主序 HWC。
#[derive(Debug, Clone, PartialEq)]
pub struct Planes {
    pub width: u32,
    pub height: u32,
    pub rgba: Vec<f32>,
}

impl Planes {
    /// VAE 的输入：四个通道，`x·2 − 1`，HWC。
    pub fn vae_rgba(&self) -> Vec<f32> {
        self.rgba.iter().map(|v| v * 2.0 - 1.0).collect()
    }

    /// 视觉塔的输入：alpha 合成到白底后的 RGB，按处理器的 `(x − 0.5) / 0.5` 归一化，HWC。
    pub fn vision_rgb(&self) -> Vec<f32> {
        self.rgba
            .chunks_exact(4)
            .flat_map(|p| {
                let a = p[3];
                [0, 1, 2].map(|c| (p[c] * a + (1.0 - a)) * 2.0 - 1.0)
            })
            .collect()
    }
}

/// Lanczos3 缩放到 `width × height`。按预乘 alpha 缩放、再还原（PIL 缩放 RGBA 的做法），透明像素的颜色不会渗进来。
pub fn resize(image: &RawImage, width: u32, height: u32) -> Planes {
    let premultiplied: Vec<f32> = image
        .pixels
        .chunks_exact(4)
        .flat_map(|p| {
            let a = p[3] as f32 / 255.0;
            [p[0] as f32 / 255.0 * a, p[1] as f32 / 255.0 * a, p[2] as f32 / 255.0 * a, a]
        })
        .collect();
    let source = image::Rgba32FImage::from_raw(image.width, image.height, premultiplied).expect("RGBA 长度与宽高一致");
    let scaled = if (image.width, image.height) == (width, height) {
        source
    } else {
        image::imageops::resize(&source, width, height, image::imageops::FilterType::Lanczos3)
    };
    let rgba = scaled
        .into_raw()
        .chunks_exact(4)
        .flat_map(|p| {
            let a = p[3].clamp(0.0, 1.0);
            let un = |c: f32| if a > 0.0 { (c / a).clamp(0.0, 1.0) } else { 0.0 };
            [un(p[0]), un(p[1]), un(p[2]), a]
        })
        .collect();
    Planes { width, height, rgba }
}

/// 以图为底重画：等比缩放到刚好盖满 `width × height`，再居中裁切。
pub fn cover(image: &RawImage, width: u32, height: u32) -> Planes {
    let scale = (width as f64 / image.width as f64).max(height as f64 / image.height as f64);
    let sw = ((image.width as f64 * scale).round() as u32).max(width);
    let sh = ((image.height as f64 * scale).round() as u32).max(height);
    let scaled = resize(image, sw, sh);
    let (x0, y0) = ((sw - width) / 2, (sh - height) / 2);
    let mut rgba = Vec::with_capacity((width * height * 4) as usize);
    for y in 0..height {
        let row = ((y + y0) * sw + x0) as usize * 4;
        rgba.extend_from_slice(&scaled.rgba[row..row + width as usize * 4]);
    }
    Planes { width, height, rgba }
}

/// 视觉塔的 patch 网格（`H/16 × W/16`）。宽高都是 32 的倍数，所以两边都是偶数。
pub fn vision_grid(width: u32, height: u32) -> (usize, usize) {
    (height as usize / PATCH, width as usize / PATCH)
}

/// 一张图的视觉 token 数（合并后，也是提示词里 `<|image_pad|>` 展开的个数）。
pub fn vision_tokens(width: u32, height: u32) -> usize {
    let (gh, gw) = vision_grid(width, height);
    gh * gw / (MERGE * MERGE)
}

/// 合并块次序的第 `i` 个 patch 落在网格的哪一行、哪一列。
fn merged_order(i: usize, gw: usize) -> (usize, usize) {
    let blocks_w = gw / MERGE;
    let (in_col, in_row) = (i % MERGE, (i / MERGE) % MERGE);
    let block = i / (MERGE * MERGE);
    ((block / blocks_w) * MERGE + in_row, (block % blocks_w) * MERGE + in_col)
}

/// `vision_rgb`（HWC，`width × height × 3`）→ `[gh·gw, 1536]` 的 patch 行，合并块次序；每行按 `[C, T, 16, 16]` 展平，
/// 时间维的两帧相同（Qwen 的图像处理器对静止图就是这样做的）。
pub fn patchify(rgb: &[f32], width: u32, height: u32) -> Vec<f32> {
    let (gh, gw) = vision_grid(width, height);
    let w = width as usize;
    let mut out = Vec::with_capacity(gh * gw * PATCH_DIM);
    for i in 0..gh * gw {
        let (r, c) = merged_order(i, gw);
        for ch in 0..3 {
            for _t in 0..TEMPORAL {
                for py in 0..PATCH {
                    let y = r * PATCH + py;
                    for px in 0..PATCH {
                        let x = c * PATCH + px;
                        out.push(rgb[(y * w + x) * 3 + ch]);
                    }
                }
            }
        }
    }
    out
}

/// 位置嵌入的双线性插值（`align_corners=True`，从 48×48 表到 `gh × gw`）：每个 patch（合并块次序）4 个表行号与权重。
pub fn vision_pos_taps(gh: usize, gw: usize) -> (Vec<i32>, Vec<f32>) {
    let axis = |index: usize, size: usize| -> ([usize; 2], [f32; 2]) {
        let src = index as f32 * (POS_SIDE - 1) as f32 / (size.max(2) - 1) as f32;
        let floor = src.floor();
        let taps = [floor as usize, (floor as usize + 1).min(POS_SIDE - 1)];
        let frac = src - floor;
        (taps, [1.0 - frac, frac])
    };
    let mut indices = Vec::with_capacity(gh * gw * 4);
    let mut weights = Vec::with_capacity(gh * gw * 4);
    for i in 0..gh * gw {
        let (r, c) = merged_order(i, gw);
        let (ht, hw) = axis(r, gh);
        let (wt, ww) = axis(c, gw);
        for a in 0..2 {
            for b in 0..2 {
                indices.push((ht[a] * POS_SIDE + wt[b]) as i32);
                weights.push(hw[a] * ww[b]);
            }
        }
    }
    (indices, weights)
}

/// 视觉塔 2D 旋转位置：每个 patch（合并块次序）的 `(行, 列)`。
pub fn vision_rotary_positions(gh: usize, gw: usize) -> Vec<(usize, usize)> {
    (0..gh * gw).map(|i| merged_order(i, gw)).collect()
}

/// 视觉塔的 2D RoPE 表：`head_dim` 72，`inv_freq = 1/10000^(arange(0,36,2)/36)`（18 个），每个 patch 的角度是
/// `cat(行·inv_freq, 列·inv_freq)`（36 个）再整体重复一遍到 72，按 rotate-half 用。返回 `(cos, sin)`，各 `[n, 72]`。
pub fn vision_rope_table(gh: usize, gw: usize, head_dim: usize) -> (Vec<f32>, Vec<f32>) {
    let spatial = head_dim / 2;
    let inv: Vec<f64> = (0..spatial / 2)
        .map(|k| 1.0 / 10000f64.powf((2 * k) as f64 / spatial as f64))
        .collect();
    let mut cos = Vec::with_capacity(gh * gw * head_dim);
    let mut sin = Vec::with_capacity(gh * gw * head_dim);
    for (r, c) in vision_rotary_positions(gh, gw) {
        let half: Vec<f64> = inv.iter().map(|f| r as f64 * f).chain(inv.iter().map(|f| c as f64 * f)).collect();
        for _ in 0..2 {
            cos.extend(half.iter().map(|a| a.cos() as f32));
            sin.extend(half.iter().map(|a| a.sin() as f32));
        }
    }
    (cos, sin)
}

/// 语言模型的 3 轴位置（Qwen3-VL `get_rope_index`）。`ids` 是展开后的提示词，`grids` 是每张图合并后的
/// `(行, 列)`，按 `<|image_pad|>` 段出现的次序。文本 token 三轴同为顺序位置；一段图像 token 的 `t` 是段首位置，
/// `h`、`w` 是段首位置加上合并网格的行、列；图像段之后位置前进 `max(行, 列)`。返回 `[t, h, w]` 三条，各 `ids.len()` 长。
pub fn mrope_positions(ids: &[u32], image_pad: u32, grids: &[(usize, usize)]) -> anyhow::Result<[Vec<i32>; 3]> {
    let mut out: [Vec<i32>; 3] = std::array::from_fn(|_| Vec::with_capacity(ids.len()));
    let mut grids = grids.iter();
    let mut pos = 0i32;
    let mut i = 0;
    while i < ids.len() {
        if ids[i] != image_pad {
            for axis in &mut out {
                axis.push(pos);
            }
            pos += 1;
            i += 1;
            continue;
        }
        let &(rows, cols) = grids.next().ok_or_else(|| anyhow::anyhow!("图像 token 段比图多"))?;
        let run = ids[i..].iter().take_while(|&&t| t == image_pad).count();
        if run != rows * cols {
            anyhow::bail!("图像 token 段长 {run}，网格 {rows}×{cols}");
        }
        for r in 0..rows {
            for c in 0..cols {
                out[0].push(pos);
                out[1].push(pos + r as i32);
                out[2].push(pos + c as i32);
            }
        }
        pos += rows.max(cols) as i32;
        i += run;
    }
    if grids.next().is_some() {
        anyhow::bail!("图比图像 token 段多");
    }
    Ok(out)
}

/// 交错 M-RoPE（`mrope_section` [24, 20, 20]，`mrope_interleaved`）：64 个频率里下标 `j % 3 == 1 && j < 60` 取 h 轴，
/// `j % 3 == 2 && j < 60` 取 w 轴，其余取 t 轴；角度表再整体重复一遍到 128，按 rotate-half 用。
/// 返回 `(cos, sin)`，各 `[L, head_dim]`。
pub fn mrope_table(positions: &[Vec<i32>; 3], head_dim: usize, theta: f64, section: [usize; 3]) -> (Vec<f32>, Vec<f32>) {
    let half = head_dim / 2;
    let inv: Vec<f64> = (0..half).map(|k| 1.0 / theta.powf((2 * k) as f64 / head_dim as f64)).collect();
    let axis_of = |j: usize| {
        if j % 3 == 1 && j < section[1] * 3 {
            1
        } else if j % 3 == 2 && j < section[2] * 3 {
            2
        } else {
            0
        }
    };
    let len = positions[0].len();
    let mut cos = Vec::with_capacity(len * head_dim);
    let mut sin = Vec::with_capacity(len * head_dim);
    for p in 0..len {
        let angles: Vec<f64> = (0..half).map(|j| positions[axis_of(j)][p] as f64 * inv[j]).collect();
        for _ in 0..2 {
            cos.extend(angles.iter().map(|a| a.cos() as f32));
            sin.extend(angles.iter().map(|a| a.sin() as f32));
        }
    }
    (cos, sin)
}

/// 以图为底重画从第几步开始去噪：`steps − round(steps·strength)`，夹在 `[0, steps − 1]`（至少跑一步）。
pub fn img2img_start(steps: usize, strength: f64) -> usize {
    let run = (steps as f64 * strength.clamp(0.0, 1.0)).round() as usize;
    steps.saturating_sub(run).min(steps.saturating_sub(1))
}

#[cfg(test)]
mod tests {
    use super::*;

    fn solid(width: u32, height: u32, rgba: [u8; 4]) -> RawImage {
        RawImage {
            width,
            height,
            pixels: (0..width * height).flat_map(|_| rgba).collect(),
        }
    }

    #[test]
    fn condition_sizes_follow_calculate_dimensions() {
        assert_eq!(calculate_dimensions(CONDITION_AREA, 1024, 1024), (1024, 1024));
        // 16:9 → sqrt(1024²·16/9) = 1365.3 → 1376；768 → 768。
        assert_eq!(calculate_dimensions(CONDITION_AREA, 1920, 1080), (1376, 768));
        assert_eq!(calculate_dimensions(CONDITION_AREA, 1080, 1920), (768, 1376));
        // Python 的 round(2.5) == 2：x.5 舍入到偶数。
        assert_eq!(round_half_even(2.5), 2.0);
        assert_eq!(round_half_even(3.5), 4.0);
        assert_eq!(round_half_even(-2.5), -2.0);
        // 极端比例也至少 32。
        assert_eq!(calculate_dimensions(CONDITION_AREA, 10_000, 1).1, 32);
    }

    #[test]
    fn vision_copy_composites_alpha_over_white_and_vae_copy_keeps_it() {
        let planes = resize(&solid(4, 4, [255, 0, 0, 0]), 4, 4);
        assert_eq!(&planes.vision_rgb()[..3], &[1.0, 1.0, 1.0], "fully transparent reads as white");
        assert_eq!(
            &planes.vae_rgba()[..4],
            &[-1.0, -1.0, -1.0, -1.0],
            "colour of a transparent pixel is dropped"
        );
        let planes = resize(&solid(6, 2, [255, 0, 0, 255]), 3, 1);
        assert_eq!((planes.width, planes.height, planes.rgba.len()), (3, 1, 12));
        for p in planes.vision_rgb().chunks_exact(3) {
            assert!((p[0] - 1.0).abs() < 1e-5 && (p[1] + 1.0).abs() < 1e-5, "{p:?}");
        }
    }

    #[test]
    fn cover_fills_the_target_and_crops_the_centre() {
        // 左半黑、右半白的 8×2，盖满 2×2：放大到 2 行要 8 列，取中间两列（一黑一白附近）。
        let pixels = (0..16)
            .flat_map(|i| if i % 8 < 4 { [0, 0, 0, 255] } else { [255, 255, 255, 255] })
            .collect();
        let planes = cover(
            &RawImage {
                width: 8,
                height: 2,
                pixels,
            },
            2,
            2,
        );
        assert_eq!((planes.width, planes.height, planes.rgba.len()), (2, 2, 16));
        assert!(planes.rgba[0] < 0.2 && planes.rgba[4] > 0.8, "{:?}", planes.rgba);
        let planes = cover(&solid(3, 9, [10, 20, 30, 255]), 64, 32);
        assert_eq!((planes.width, planes.height), (64, 32));
    }

    #[test]
    fn patches_are_in_merge_block_order_with_the_frame_repeated() {
        // 64×32 → 网格 2×4：合并块次序是 (0,0) (0,1) (1,0) (1,1) (0,2) (0,3) (1,2) (1,3)。
        let (w, h) = (64u32, 32u32);
        let rgb: Vec<f32> = (0..(w * h) as usize)
            .flat_map(|i| {
                let (y, x) = (i / w as usize, i % w as usize);
                [(y / 16) as f32, (x / 16) as f32, 0.5]
            })
            .collect();
        let patches = patchify(&rgb, w, h);
        assert_eq!(patches.len(), 8 * PATCH_DIM);
        let at = |i: usize| (patches[i * PATCH_DIM], patches[i * PATCH_DIM + 512]);
        let order: Vec<(f32, f32)> = (0..8).map(at).collect();
        let want = [(0, 0), (0, 1), (1, 0), (1, 1), (0, 2), (0, 3), (1, 2), (1, 3)];
        assert_eq!(order, want.map(|(r, c)| (r as f32, c as f32)));
        // 两帧相同、通道是最外层。
        let p = &patches[3 * PATCH_DIM..4 * PATCH_DIM];
        assert_eq!(&p[..256], &p[256..512]);
        assert!(p[1024..].iter().all(|&v| v == 0.5));
        assert_eq!(vision_tokens(w, h), 2);
    }

    #[test]
    fn pos_taps_interpolate_the_48_grid_with_aligned_corners() {
        let (idx, wts) = vision_pos_taps(4, 4);
        assert_eq!((idx.len(), wts.len()), (64, 64));
        // 第一个 patch 是 (0,0)：全部权重在表的 (0,0)。
        let w0: f32 = (0..4).filter(|&k| idx[k] == 0).map(|k| wts[k]).sum();
        assert!((w0 - 1.0).abs() < 1e-6);
        // 第四个 patch（合并块次序）是 (1,1)：src = 47/3 = 15.67，在 15、16 之间。
        let taps = &idx[12..16];
        assert_eq!(taps, &[15 * 48 + 15, 15 * 48 + 16, 16 * 48 + 15, 16 * 48 + 16]);
        for chunk in wts.chunks_exact(4) {
            assert!((chunk.iter().sum::<f32>() - 1.0).abs() < 1e-5);
        }
        // 最后一行、最后一列落在表的角上。
        let last = vision_rotary_positions(4, 4).iter().position(|&p| p == (3, 3)).unwrap();
        let w_corner: f32 = (0..4)
            .filter(|&k| idx[last * 4 + k] == 47 * 48 + 47)
            .map(|k| wts[last * 4 + k])
            .sum();
        assert!((w_corner - 1.0).abs() < 1e-5);
    }

    #[test]
    fn mrope_positions_follow_get_rope_index() {
        const PAD: u32 = 9;
        // 3 个文本、一张 2×3 的图、2 个文本。
        let ids = [1, 2, 3, PAD, PAD, PAD, PAD, PAD, PAD, 4, 5];
        let [t, h, w] = mrope_positions(&ids, PAD, &[(2, 3)]).unwrap();
        assert_eq!(t, [0, 1, 2, 3, 3, 3, 3, 3, 3, 6, 7]);
        assert_eq!(h, [0, 1, 2, 3, 3, 3, 4, 4, 4, 6, 7]);
        assert_eq!(w, [0, 1, 2, 3, 4, 5, 3, 4, 5, 6, 7]);
        assert!(mrope_positions(&ids, PAD, &[]).is_err());
        assert!(mrope_positions(&ids, PAD, &[(2, 3), (1, 1)]).is_err());
        assert!(mrope_positions(&ids, PAD, &[(1, 3)]).is_err());

        // 三轴相同的位置下，交错表就是普通 1D RoPE。
        let same = [vec![0, 5], vec![0, 5], vec![0, 5]];
        let (cos, sin) = mrope_table(&same, 8, 10000.0, [2, 1, 1]);
        for j in 0..4 {
            let a = 5.0 / 10000f64.powf((2 * j) as f64 / 8.0);
            assert!((cos[8 + j] as f64 - a.cos()).abs() < 1e-6);
            assert!((sin[8 + 4 + j] as f64 - a.sin()).abs() < 1e-6);
        }
        // 不同时：下标 1 取 h，下标 2 取 w，下标 0、3 取 t（section [2,1,1]：h 只到 j<3，w 只到 j<3）。
        let split = [vec![1], vec![10], vec![100]];
        let (cos, _) = mrope_table(&split, 8, 1.0, [2, 1, 1]);
        assert!((cos[0] - 1f32.cos()).abs() < 1e-6);
        assert!((cos[1] - 10f32.cos()).abs() < 1e-6);
        assert!((cos[2] - 100f32.cos()).abs() < 1e-5);
        assert!((cos[3] - 1f32.cos()).abs() < 1e-6);
    }

    #[test]
    fn vision_rope_table_concatenates_row_and_column_angles() {
        let (cos, sin) = vision_rope_table(2, 2, 72);
        assert_eq!(cos.len(), 4 * 72);
        // 第二个 patch 是 (0,1)：行角度全 0（cos 1），列角度第一项是 1·inv_freq[0] = 1。
        let p = &cos[72..144];
        assert!(p[..18].iter().all(|&v| v == 1.0));
        assert!((p[18] - 1f32.cos()).abs() < 1e-6);
        assert_eq!(&p[..36], &p[36..]);
        assert!((sin[72 + 18] - 1f32.sin()).abs() < 1e-6);
    }

    #[test]
    fn img2img_start_maps_strength_onto_the_schedule() {
        assert_eq!(img2img_start(8, 0.3), 6);
        assert_eq!(img2img_start(8, 0.8), 2);
        assert_eq!(img2img_start(8, 0.6), 3);
        assert_eq!(img2img_start(8, 1.0), 0);
        assert_eq!(img2img_start(8, 0.0), 7, "at least one step");
        assert_eq!(img2img_start(20, 0.5), 10);
        assert_eq!(img2img_start(1, 0.5), 0);
    }
}
