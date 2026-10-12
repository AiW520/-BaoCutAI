//! Fixed angular texture sampling with independent RGBA averaging.
use anyhow::{Result, ensure};
use tiny_skia::Pixmap;

const TAPS: usize = 60;

fn rotations(angle: f64) -> [[f32; 2]; TAPS] {
    std::array::from_fn(|i| {
        let theta = angle as f32 * (3.5 - 2.0 * (i as f32 / 59.0));
        [libm::cosf(theta), libm::sinf(theta)]
    })
}
fn target(uv: [f32; 2], aspect: f32, rotation: [f32; 2]) -> [f32; 2] {
    let x = uv[0] - 0.5;
    let y = (uv[1] - 0.5) * aspect;
    let [cos, sin] = rotation;
    [0.5 + cos * x + sin * y, 0.5 + (-sin * x + cos * y) / aspect]
}
fn texel(
    image: &Pixmap,
    x: i64,
    y: i64,
    spend: &mut impl FnMut(u64) -> Result<()>,
) -> Result<[f32; 4]> {
    if x < 0 || y < 0 || x >= i64::from(image.width()) || y >= i64::from(image.height()) {
        return Ok([0.0; 4]);
    }
    spend(1)?;
    let offset = (y as usize * image.width() as usize + x as usize) * 4;
    Ok(std::array::from_fn(|c| {
        f32::from(image.data()[offset + c]) / 255.0
    }))
}
fn sample(
    image: &Pixmap,
    uv: [f32; 2],
    domain: [f64; 4],
    spend: &mut impl FnMut(u64) -> Result<()>,
) -> Result<[f32; 4]> {
    // Reject a sample, not its weight: the caller always divides by 60.
    if uv
        .iter()
        .any(|v| !v.is_finite() || !(0.0..=1.0).contains(v))
    {
        return Ok([0.0; 4]);
    }
    let mut position = [0.0; 2];
    for axis in 0..2 {
        let center = domain[axis] + domain[axis + 2] * 0.5 - 0.5;
        let half = (domain[axis + 2] - 1.0).max(0.0) * 0.5;
        position[axis] = (domain[axis] + f64::from(uv[axis]) * domain[axis + 2] - 0.5)
            .clamp(center - half, center + half);
    }
    let x = libm::floor(position[0]) as i64;
    let y = libm::floor(position[1]) as i64;
    let fx = (position[0] - x as f64) as f32;
    let fy = (position[1] - y as f64) as f32;
    let mut result = [0.0; 4];
    for (dy, wy) in [(0, 1.0 - fy), (1, fy)] {
        if wy == 0.0 {
            continue;
        }
        for (dx, wx) in [(0, 1.0 - fx), (1, fx)] {
            if wx == 0.0 {
                continue;
            }
            let pixel = texel(image, x + dx, y + dy, spend)?;
            for c in 0..4 {
                result[c] += pixel[c] * wx * wy;
            }
        }
    }
    Ok(result)
}

pub(super) fn apply(
    input: &Pixmap,
    pad: u32,
    mut domain: [f64; 4],
    aspect: f64,
    angle: f64,
    mut spend: impl FnMut(u64) -> Result<()>,
) -> Result<Pixmap> {
    ensure!(
        domain
            .iter()
            .all(|v| v.is_finite() && v.abs() <= 1_000_000.0)
            && domain[2] >= 0.001
            && domain[3] >= 0.001
            && aspect.is_finite()
            && (0.0001..=10_000.0).contains(&aspect)
            && angle.is_finite()
            && (-10_000.0..=10_000.0).contains(&angle),
        "CAPTION_MATERIAL_INVALID: angular sample uniforms"
    );
    let mut output = Pixmap::new(input.width(), input.height())
        .ok_or_else(|| anyhow::anyhow!("CAPTION_BUDGET_EXCEEDED: angular surface"))?;
    domain[0] += f64::from(pad);
    domain[1] += f64::from(pad);
    let edge = |value: f64, max: u32| libm::ceil(value - 0.5).clamp(0.0, f64::from(max)) as u32;
    let left = edge(domain[0], input.width());
    let right = edge(domain[0] + domain[2], input.width());
    let top = edge(domain[1], input.height());
    let bottom = edge(domain[1] + domain[3], input.height());
    let rotations = rotations(angle);
    for y in top..bottom {
        for x in left..right {
            let uv = [
                ((f64::from(x) + 0.5 - domain[0]) / domain[2]) as f32,
                ((f64::from(y) + 0.5 - domain[1]) / domain[3]) as f32,
            ];
            let original = sample(input, uv, domain, &mut spend)?;
            let mut average = [0.0_f32; 4];
            for &rotation in &rotations {
                // Transform work is bounded even when every lookup falls outside.
                spend(1)?;
                let q = target(uv, aspect as f32, rotation);
                let value = sample(input, q, domain, &mut spend)?;
                for c in 0..4 {
                    average[c] += value[c];
                }
            }
            for c in &mut average {
                *c /= TAPS as f32;
            }
            let offset = (y as usize * input.width() as usize + x as usize) * 4;
            for c in 0..4 {
                let value = 0.6 * original[c] * (1.0 - average[3]) + average[c] * average[3];
                output.data_mut()[offset + c] =
                    libm::floorf(value.clamp(0.0, 1.0) * 255.0 + 0.5) as u8;
            }
        }
    }
    Ok(output)
}

#[cfg(test)]
mod tests {
    use super::*;
    fn image(w: u32, h: u32, pixel: [u8; 4]) -> Pixmap {
        let mut result = Pixmap::new(w, h).unwrap();
        for p in result.data_mut().chunks_exact_mut(4) {
            p.copy_from_slice(&pixel);
        }
        result
    }
    #[test]
    fn zero_angle_retains_all_taps_but_is_not_identity() {
        let input = image(1, 1, [100, 80, 40, 128]);
        let mut spent = 0;
        let result = apply(&input, 0, [0.0, 0.0, 1.0, 1.0], 1.0, 0.0, |n| {
            spent += n;
            Ok(())
        })
        .unwrap();
        assert_eq!(result.data(), &[80, 64, 32, 103]);
        assert_eq!(spent, 121); // One original +60 transforms +60 coincident reads.
    }
    #[test]
    fn zero_alpha_emission_is_not_discarded_or_clamped_to_coverage() {
        let input = image(1, 1, [255, 100, 0, 0]);
        let result = apply(&input, 0, [0.0, 0.0, 1.0, 1.0], 1.0, 0.4, |_| Ok(())).unwrap();
        assert_eq!(result.data(), &[153, 60, 0, 0]);
    }
    #[test]
    fn rejected_lookups_keep_the_fixed_denominator_and_aspect_is_independent() {
        let input = image(5, 5, [255; 4]);
        let angle = 0.25;
        let aspect = 0.4;
        let result = apply(&input, 0, [0.0, 0.0, 5.0, 5.0], aspect, angle, |_| Ok(())).unwrap();
        // Independent polar-coordinate oracle for the top-left pixel of an
        // opaque constant image; only the valid lookup count affects the mean.
        let radius = libm::sqrt(0.4_f64.powi(2) + (0.4 * aspect).powi(2));
        let initial = libm::atan2(-0.4 * aspect, -0.4);
        let count = (0..60)
            .filter(|i| {
                let phase = initial - angle * (3.5 - 2.0 * (*i as f64) / 59.0);
                let x = 0.5 + radius * libm::cos(phase);
                let y = 0.5 + radius * libm::sin(phase) / aspect;
                (0.0..=1.0).contains(&x) && (0.0..=1.0).contains(&y)
            })
            .count();
        assert!(count > 0 && count < 60);
        let a = count as f64 / 60.0;
        let expected = libm::floor((0.6 * (1.0 - a) + a * a) * 255.0 + 0.5) as u8;
        assert_eq!(&result.data()[..4], &[expected; 4]);
        let square = apply(&input, 0, [0.0, 0.0, 5.0, 5.0], 1.0, angle, |_| Ok(())).unwrap();
        assert_ne!(square.data(), result.data());
    }
    #[test]
    fn local_bounds_padding_and_budget_rejection_are_explicit() {
        let input = image(5, 5, [200; 4]);
        let result = apply(&input, 1, [0.0, 0.0, 2.0, 2.0], 1.0, 0.0, |_| Ok(())).unwrap();
        assert_eq!(&result.data()[..4], &[0; 4]);
        assert!(result.data()[(1 * 5 + 1) * 4] > 0);
        let mut count = 0;
        let error = apply(&input, 0, [0.0, 0.0, 5.0, 5.0], 1.0, 0.5, |n| {
            count += n;
            ensure!(count <= 50, "CAPTION_BUDGET_EXCEEDED");
            Ok(())
        })
        .unwrap_err();
        assert!(error.to_string().contains("CAPTION_BUDGET_EXCEEDED"));
        assert!(apply(&input, 0, [0.0, 0.0, 0.0, 1.0], 1.0, 0.0, |_| Ok(())).is_err());
        assert!(apply(&input, 0, [0.0, 0.0, 1.0, 1.0], 0.0, 0.0, |_| Ok(())).is_err());
    }
}
