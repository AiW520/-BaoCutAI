//! Cue-isolated, bounded prefix evaluation. Feedback never reads a prior rendered frame.
use super::*;
use render_raster::effects::filters::blur::box_blur_premul_u8;

const MAX_WORK_PIXELS: u64 = 256 * 1024 * 1024;
const MAX_SURFACE_BYTES: u64 = 256 * 1024 * 1024;
struct Work {
    pixels: u64,
}
impl Work {
    fn spend(&mut self, w: u32, h: u32) -> Result<()> {
        self.pixels = self
            .pixels
            .checked_add(u64::from(w) * u64::from(h))
            .ok_or_else(|| anyhow::anyhow!("CAPTION_BUDGET_EXCEEDED: material pixels"))?;
        if self.pixels > MAX_WORK_PIXELS {
            bail!("CAPTION_BUDGET_EXCEEDED: material pixels");
        }
        Ok(())
    }
}
struct EmptyMedia;
impl FrameMedia for EmptyMedia {
    fn frame(&mut self, _: &str, _: i64) -> Result<Arc<Pixmap>> {
        bail!("CAPTION_RESOURCE_MISSING")
    }
}
fn padding(materials: &[CaptionMaterial]) -> u32 {
    materials
        .iter()
        .map(|m| match m {
            CaptionMaterial::Blur { radius, passes, .. } => {
                let max = match radius {
                    DynamicValue::Constant { value } => value.as_f64().unwrap_or(64.0),
                    _ => 64.0,
                };
                libm::ceil(max) as u32 * passes
            }
            CaptionMaterial::WaveDisplace { amplitude, .. } => {
                let max = match amplitude {
                    DynamicValue::Constant { value } => value.as_f64().unwrap_or(256.0).abs(),
                    _ => 256.0,
                };
                libm::ceil(max) as u32
            }
            CaptionMaterial::Feedback {
                samples, offset, ..
            } => libm::ceil(offset[0].abs().max(offset[1].abs()) * f64::from(*samples)) as u32,
        })
        .sum()
}
fn raster_depth(nodes: &[Node]) -> u64 {
    nodes
        .iter()
        .map(|n| u64::from(n.kind != NodeKind::Repeat) + raster_depth(&n.children))
        .max()
        .unwrap_or(0)
}
fn translated(frame: &mut FrameOps, pad: u32) {
    for op in &mut frame.ops {
        let matrix = match op {
            DrawOp::FillRect { tf, .. }
            | DrawOp::FillPath { tf, .. }
            | DrawOp::StrokePath { tf, .. }
            | DrawOp::DrawMedia { tf, .. }
            | DrawOp::ClipPath { tf, .. }
            | DrawOp::FillPathPaint { tf, .. }
            | DrawOp::StrokePathPaint { tf, .. }
            | DrawOp::DrawBitmap { tf, .. } => Some(tf),
            _ => None,
        };
        if let Some(m) = matrix {
            m[4] += pad as f32;
            m[5] += pad as f32;
        }
    }
}
impl ScenePlan {
    pub(super) fn record_materials(
        &mut self,
        t: f64,
        budget: &mut Budget,
    ) -> Result<(FrameOps, Vec<SceneHit>)> {
        if !t.is_finite() {
            bail!("CAPTION_SCENE_INVALID: sample time");
        }
        let materials = self.style.scene().materials.clone();
        if materials.iter().all(|m| match m {
            CaptionMaterial::Blur {
                radius: DynamicValue::Constant { value },
                ..
            } => value.as_f64() == Some(0.0),
            CaptionMaterial::Feedback { decay, .. } => *decay == 0.0,
            _ => false,
        }) {
            return self.record_base(t, None, budget);
        }
        let pad = padding(&materials);
        let width = self
            .width
            .checked_add(pad * 2)
            .ok_or_else(|| anyhow::anyhow!("CAPTION_BUDGET_EXCEEDED: padding"))?;
        let height = self
            .height
            .checked_add(pad * 2)
            .ok_or_else(|| anyhow::anyhow!("CAPTION_BUDGET_EXCEEDED: padding"))?;
        let bytes = u64::from(width) * u64::from(height) * 4;
        let surface_count =
            materials.len() as u64 * 2 + 4 + raster_depth(&self.style.scene().nodes);
        if bytes * surface_count > MAX_SURFACE_BYTES {
            bail!("CAPTION_BUDGET_EXCEEDED: material surfaces");
        }
        let indices = self
            .cues
            .iter()
            .enumerate()
            .filter(|(_, c)| t >= c.start && t < c.end)
            .map(|(i, _)| i)
            .collect::<Vec<_>>();
        if bytes * surface_count
            + u64::from(self.width) * u64::from(self.height) * 4 * indices.len() as u64
            > MAX_SURFACE_BYTES
        {
            bail!("CAPTION_BUDGET_EXCEEDED: material outputs");
        }
        let mut builder = FrameBuilder::default();
        let mut hits = Vec::new();
        let mut work = Work { pixels: 0 };
        for ci in indices {
            let (image, current_hits) = self.material_prefix(
                ci,
                t,
                &materials,
                materials.len(),
                pad,
                (width, height),
                budget,
                &mut work,
            )?;
            hits.extend(current_hits);
            let mut cropped = Vec::with_capacity(self.width as usize * self.height as usize * 4);
            for y in pad..pad + self.height {
                let start = (y as usize * width as usize + pad as usize) * 4;
                cropped.extend_from_slice(&image.data()[start..start + self.width as usize * 4]);
            }
            let id = builder.bitmap_id(BitmapData {
                width: self.width,
                height: self.height,
                rgba: Arc::from(cropped),
            });
            builder.push(DrawOp::DrawBitmap {
                bitmap: id,
                opacity: 1.0,
                tf: [1.0, 0.0, 0.0, 1.0, 0.0, 0.0],
            });
        }
        Ok((builder.finish(), hits))
    }
    fn material_prefix(
        &mut self,
        ci: usize,
        t: f64,
        materials: &[CaptionMaterial],
        prefix: usize,
        pad: u32,
        size: (u32, u32),
        budget: &mut Budget,
        work: &mut Work,
    ) -> Result<(Pixmap, Vec<SceneHit>)> {
        budget.spend()?;
        if t < self.cues[ci].start || t >= self.cues[ci].end {
            return Ok((
                Pixmap::new(size.0, size.1)
                    .ok_or_else(|| anyhow::anyhow!("CAPTION_BUDGET_EXCEEDED: surface"))?,
                vec![],
            ));
        }
        if prefix == 0 {
            let (mut ops, hits) = self.record_base(t, Some(ci), budget)?;
            translated(&mut ops, pad);
            work.spend(size.0, size.1)?;
            return Ok((
                rasterize_with_media(&ops, size.0, size.1, &mut EmptyMedia)?,
                hits,
            ));
        }
        match &materials[prefix - 1] {
            CaptionMaterial::Blur { id, radius, passes } => {
                let (mut source, hits) =
                    self.material_prefix(ci, t, materials, prefix - 1, pad, size, budget, work)?;
                let cue = &self.cues[ci];
                let params =
                    cue_parameters(&self.style, &self.presentation, cue, &self.instance_id)?;
                let mut context = sampled_layout::early_context(
                    cue,
                    ci,
                    self.cues.len(),
                    t,
                    &params,
                    (self.width, self.height),
                    &self.instance_id,
                    &self.presentation.seed,
                )?;
                context.stable_key.push_str(&format!("|material|{id}"));
                let amount = sample_value(
                    radius,
                    ValueType::Length,
                    self.style.scene(),
                    &context,
                    t,
                    budget,
                )?
                .map(|v| v.number())
                .transpose()?
                .unwrap_or(0.0);
                if !(0.0..=64.0).contains(&amount) {
                    bail!("CAPTION_MATERIAL_INVALID: blur radius");
                }
                let radius = libm::floor(amount + 0.5) as usize;
                if radius > 0 {
                    for _ in 0..*passes {
                        work.spend(size.0, size.1)?;
                        box_blur_premul_u8(source.data_mut(), size.0, size.1, radius);
                    }
                }
                Ok((source, hits))
            }
            CaptionMaterial::WaveDisplace {
                id,
                amplitude,
                wavelength,
                phase,
                axis,
            } => {
                let (source, hits) =
                    self.material_prefix(ci, t, materials, prefix - 1, pad, size, budget, work)?;
                let cue = &self.cues[ci];
                let params =
                    cue_parameters(&self.style, &self.presentation, cue, &self.instance_id)?;
                let mut context = sampled_layout::early_context(
                    cue,
                    ci,
                    self.cues.len(),
                    t,
                    &params,
                    (self.width, self.height),
                    &self.instance_id,
                    &self.presentation.seed,
                )?;
                context.stable_key.push_str(&format!("|material|{id}"));
                let mut sample = |value: &DynamicValue, ty, fallback| -> Result<f64> {
                    Ok(
                        sample_value(value, ty, self.style.scene(), &context, t, budget)?
                            .map(|v| v.number())
                            .transpose()?
                            .unwrap_or(fallback),
                    )
                };
                let amplitude = sample(amplitude, ValueType::Length, 0.0)?;
                let wavelength = sample(wavelength, ValueType::Length, 1.0)?;
                let phase = sample(phase, ValueType::Angle, 0.0)?;
                if !amplitude.is_finite()
                    || !(-256.0..=256.0).contains(&amplitude)
                    || !wavelength.is_finite()
                    || !(1.0..=1_000_000.0).contains(&wavelength)
                    || !phase.is_finite()
                {
                    bail!("CAPTION_MATERIAL_INVALID: wave displacement uniforms");
                }
                if amplitude == 0.0 {
                    return Ok((source, hits));
                }
                // Four source texels per bilinear destination sample.
                for _ in 0..4 {
                    work.spend(size.0, size.1)?;
                }
                Ok((
                    wave_displace(&source, pad, amplitude, wavelength, phase, *axis)?,
                    hits,
                ))
            }
            CaptionMaterial::Feedback {
                samples,
                step,
                decay,
                offset,
                ..
            } => {
                let mut out = Pixmap::new(size.0, size.1)
                    .ok_or_else(|| anyhow::anyhow!("CAPTION_BUDGET_EXCEEDED: surface"))?;
                let mut hits = Vec::new();
                for i in (0..=*samples).rev() {
                    let past = t - step.seconds() * f64::from(i);
                    if past < self.cues[ci].start || past >= self.cues[ci].end {
                        continue;
                    }
                    let mut alpha = 1.0;
                    for _ in 0..i {
                        alpha *= decay;
                    }
                    if alpha == 0.0 {
                        continue;
                    }
                    let (source, current_hits) = self.material_prefix(
                        ci,
                        past,
                        materials,
                        prefix - 1,
                        pad,
                        size,
                        budget,
                        work,
                    )?;
                    if i == 0 {
                        hits = current_hits;
                    }
                    work.spend(size.0, size.1)?;
                    out.draw_pixmap(
                        0,
                        0,
                        source.as_ref(),
                        &tiny_skia::PixmapPaint {
                            opacity: alpha as f32,
                            ..Default::default()
                        },
                        Transform::from_translate(
                            (offset[0] * f64::from(i)) as f32,
                            (offset[1] * f64::from(i)) as f32,
                        ),
                        None,
                    );
                }
                Ok((out, hits))
            }
        }
    }
}

/// Pixel centers use canvas coordinates, independent of temporary material padding.
/// The inverse map reads y + A*sin(tau*x/L + phase) for Y, and swaps axes for X.
fn wave_displace(
    source: &Pixmap,
    pad: u32,
    amplitude: f64,
    wavelength: f64,
    phase: f64,
    axis: WaveAxis,
) -> Result<Pixmap> {
    let width = source.width();
    let height = source.height();
    let mut out = Pixmap::new(width, height)
        .ok_or_else(|| anyhow::anyhow!("CAPTION_BUDGET_EXCEEDED: wave surface"))?;
    let phase = libm::fmod(phase, std::f64::consts::TAU);
    let count = if axis == WaveAxis::Y { width } else { height };
    let displacement = (0..count)
        .map(|coordinate| {
            let position = f64::from(coordinate) + 0.5 - f64::from(pad);
            amplitude * libm::sin(std::f64::consts::TAU * position / wavelength + phase)
        })
        .collect::<Vec<_>>();
    for y in 0..height {
        for x in 0..width {
            let (sx, sy) = match axis {
                WaveAxis::Y => (f64::from(x), f64::from(y) + displacement[x as usize]),
                WaveAxis::X => (f64::from(x) + displacement[y as usize], f64::from(y)),
            };
            let color = bilinear_transparent(source, sx, sy);
            let index = (y as usize * width as usize + x as usize) * 4;
            out.data_mut()[index..index + 4].copy_from_slice(&color);
        }
    }
    Ok(out)
}

/// Coordinates here index texel centers (integer zero is the first center).
fn bilinear_transparent(source: &Pixmap, x: f64, y: f64) -> [u8; 4] {
    let left = libm::floor(x) as i64;
    let top = libm::floor(y) as i64;
    let dx = x - left as f64;
    let dy = y - top as f64;
    let mut values = [0.0; 4];
    for (tx, ty, weight) in [
        (left, top, (1.0 - dx) * (1.0 - dy)),
        (left + 1, top, dx * (1.0 - dy)),
        (left, top + 1, (1.0 - dx) * dy),
        (left + 1, top + 1, dx * dy),
    ] {
        if tx < 0 || ty < 0 || tx >= i64::from(source.width()) || ty >= i64::from(source.height()) {
            continue;
        }
        let index = (ty as usize * source.width() as usize + tx as usize) * 4;
        for channel in 0..4 {
            values[channel] += f64::from(source.data()[index + channel]) * weight;
        }
    }
    values.map(|value| libm::floor(value + 0.5).clamp(0.0, 255.0) as u8)
}

#[cfg(test)]
mod wave_tests {
    use super::*;

    fn dot(width: u32, height: u32, x: usize, y: usize) -> Pixmap {
        let mut image = Pixmap::new(width, height).unwrap();
        let index = (y * width as usize + x) * 4;
        image.data_mut()[index..index + 4].copy_from_slice(&[128, 64, 0, 128]);
        image
    }
    fn pixel(image: &Pixmap, x: usize, y: usize) -> [u8; 4] {
        let index = (y * image.width() as usize + x) * 4;
        image.data()[index..index + 4].try_into().unwrap()
    }
    #[test]
    fn bilinear_samples_premultiplied_channels_and_transparent_edges() {
        let image = dot(2, 2, 0, 0);
        assert_eq!(bilinear_transparent(&image, 0.0, 0.0), [128, 64, 0, 128]);
        assert_eq!(bilinear_transparent(&image, -0.5, 0.0), [64, 32, 0, 64]);
        assert_eq!(bilinear_transparent(&image, 0.5, 0.5), [32, 16, 0, 32]);
        assert_eq!(bilinear_transparent(&image, -1.0, 0.0), [0; 4]);
        assert_eq!(bilinear_transparent(&image, 2.0, 0.0), [0; 4]);
    }
    #[test]
    fn inverse_wave_uses_pixel_centers_signed_amplitude_and_selected_axis() {
        let phase = -std::f64::consts::FRAC_PI_4;
        let source = dot(8, 8, 1, 3);
        let up = wave_displace(&source, 0, 2.0, 4.0, phase, WaveAxis::Y).unwrap();
        let down = wave_displace(&source, 0, -2.0, 4.0, phase, WaveAxis::Y).unwrap();
        assert_eq!(pixel(&up, 1, 1), [128, 64, 0, 128]);
        assert_eq!(pixel(&down, 1, 5), [128, 64, 0, 128]);
        assert_eq!(pixel(&up, 1, 3), [0; 4]);
        let source = dot(8, 8, 3, 1);
        let left = wave_displace(&source, 0, 2.0, 4.0, phase, WaveAxis::X).unwrap();
        assert_eq!(pixel(&left, 1, 1), [128, 64, 0, 128]);
    }
    #[test]
    fn padding_does_not_change_canvas_phase_or_premultiplied_colors() {
        let original = dot(8, 8, 2, 3);
        let padded = dot(18, 18, 7, 8);
        let a = wave_displace(&original, 0, 1.2, 5.7, 0.8, WaveAxis::Y).unwrap();
        let b = wave_displace(&padded, 5, 1.2, 5.7, 0.8, WaveAxis::Y).unwrap();
        for y in 0..8 {
            for x in 0..8 {
                assert_eq!(pixel(&a, x, y), pixel(&b, x + 5, y + 5));
            }
        }
        assert!(
            b.data()
                .chunks_exact(4)
                .all(|p| p[..3].iter().all(|c| *c <= p[3]))
        );
        let repeated = wave_displace(
            &original,
            0,
            1.2,
            5.7,
            0.8 + std::f64::consts::TAU * 12.0,
            WaveAxis::Y,
        )
        .unwrap();
        assert_eq!(a.data(), repeated.data());
    }
}
