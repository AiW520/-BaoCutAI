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
