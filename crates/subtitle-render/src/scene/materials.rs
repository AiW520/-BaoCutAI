//! Cue-isolated, bounded prefix evaluation. Feedback never reads a prior rendered frame.
use super::component_filters as filters;
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
    fn samples(&mut self, count: u64) -> Result<()> {
        self.pixels = self
            .pixels
            .checked_add(count)
            .ok_or_else(|| anyhow::anyhow!("CAPTION_BUDGET_EXCEEDED: angular sample work"))?;
        if self.pixels > MAX_WORK_PIXELS {
            bail!("CAPTION_BUDGET_EXCEEDED: angular sample work");
        }
        Ok(())
    }
    fn components(&mut self, estimate: filters::WorkEstimate) -> Result<()> {
        for count in [
            estimate.texel_reads,
            estimate.support_scan_pixels,
            estimate.output_pixels,
        ] {
            self.pixels = self
                .pixels
                .checked_add(count)
                .ok_or_else(|| anyhow::anyhow!("CAPTION_BUDGET_EXCEEDED: material work"))?;
        }
        if self.pixels > MAX_WORK_PIXELS {
            bail!("CAPTION_BUDGET_EXCEEDED: material work");
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
            CaptionMaterial::SoftBand { .. }
            | CaptionMaterial::AngularSampleBlend { .. }
            | CaptionMaterial::NoisePaletteMix { .. }
            | CaptionMaterial::GaussianAxis { .. }
            | CaptionMaterial::GlowCascade { .. } => 0,
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
            | DrawOp::DrawBitmap { tf, .. }
            | DrawOp::DrawEmissiveBitmap { tf, .. } => Some(tf),
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
        let surface_count = materials
            .iter()
            .map(|material| match material {
                CaptionMaterial::GlowCascade { levels, .. } => levels.len() as u64 + 4,
                CaptionMaterial::GaussianAxis { .. } => 4,
                _ => 2,
            })
            .sum::<u64>()
            + 4
            + raster_depth(&self.style.scene().nodes);
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
            if component_stack(&materials) {
                builder.push(DrawOp::DrawEmissiveBitmap {
                    bitmap: id,
                    opacity: 1.0,
                    tf: [1.0, 0.0, 0.0, 1.0, 0.0, 0.0],
                });
            } else {
                builder.push(DrawOp::DrawBitmap {
                    bitmap: id,
                    opacity: 1.0,
                    tf: [1.0, 0.0, 0.0, 1.0, 0.0, 0.0],
                });
            }
        }
        Ok((builder.finish(), hits))
    }
    fn material_page_context(
        &mut self,
        ci: usize,
        t: f64,
        node_id: &str,
        budget: &mut Budget,
    ) -> Result<Option<Context>> {
        let cue = &self.cues[ci];
        let params = cue_parameters(&self.style, &self.presentation, cue, &self.instance_id)?;
        let early = sampled_layout::early_context(
            cue,
            ci,
            self.cues.len(),
            t,
            &params,
            (self.width, self.height),
            &self.instance_id,
            &self.presentation.seed,
        )?;
        let sampled = sampled_layout::sample_scene(self.style.scene(), &early, t, budget)?;
        let scene = sampled.as_ref().unwrap_or(self.style.scene());
        let units = resolved_units(
            &mut self.text,
            &self.layouts,
            ci,
            cue,
            scene,
            sampled.is_some(),
            t,
            &params,
            &self.presentation,
            &self.instance_id,
            (self.width, self.height),
            budget,
        )?;
        let Some((unit, _)) = units
            .get(node_id)
            .and_then(|v| v.iter().find(|(u, _)| u.kind == UnitKind::Page))
        else {
            return Ok(None);
        };
        let render = RenderContext {
            scene,
            units: &units,
            params: &params,
            seconds: t,
            seed: u64::from_str_radix(&self.presentation.seed, 16)?,
            instance: &self.instance_id,
            cue,
            size: (self.width, self.height),
            images: &self.images,
        };
        Ok(Some(context(unit, &render)))
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
            CaptionMaterial::SoftBand {
                id,
                context_node_id,
                axis,
                center,
                half_width,
                feather,
                amount,
                opacity,
            } => {
                let (mut source, hits) =
                    self.material_prefix(ci, t, materials, prefix - 1, pad, size, budget, work)?;
                let Some(mut context) =
                    self.material_page_context(ci, t, context_node_id, budget)?
                else {
                    source.data_mut().fill(0);
                    return Ok((source, vec![]));
                };
                context.stable_key.push_str(&format!("|material|{id}"));
                let mut sample = |value: &DynamicValue, fallback: f64| -> Result<f64> {
                    Ok(sample_value(
                        value,
                        ValueType::Scalar,
                        self.style.scene(),
                        &context,
                        t,
                        budget,
                    )?
                    .map(|v| v.number())
                    .transpose()?
                    .unwrap_or(fallback))
                };
                let center = sample(center, 0.5)?;
                let half_width = sample(half_width, 0.5)?;
                let feather = sample(feather, 0.0)?;
                let amount = sample(amount, 0.0)?;
                let opacity = sample(opacity, 1.0)?;
                if !(-4.0..=4.0).contains(&center)
                    || !(0.0..=4.0).contains(&half_width)
                    || !(0.0..=4.0).contains(&feather)
                    || !(0.0..=1.0).contains(&amount)
                    || !(0.0..=1.0).contains(&opacity)
                {
                    bail!("CAPTION_MATERIAL_INVALID: soft-band uniforms");
                }
                if amount != 0.0 || opacity != 1.0 {
                    work.spend(size.0, size.1)?;
                    soft_band(
                        &mut source,
                        pad,
                        (self.width, self.height),
                        *axis,
                        center,
                        half_width,
                        feather,
                        amount,
                        opacity,
                    );
                }
                Ok((source, hits))
            }
            CaptionMaterial::NoisePaletteMix {
                id,
                context_node_id,
                palette_resource_id,
                palette_position,
                phase,
                domain,
            } => {
                let (mut source, hits) =
                    self.material_prefix(ci, t, materials, prefix - 1, pad, size, budget, work)?;
                let Some(mut context) =
                    self.material_page_context(ci, t, context_node_id, budget)?
                else {
                    source.data_mut().fill(0);
                    return Ok((source, vec![]));
                };
                context.stable_key.push_str(&format!("|material|{id}"));
                let scene = self.style.scene();
                let phase = component_uniform(
                    phase,
                    scene,
                    &context,
                    t,
                    budget,
                    0.0,
                    -1_000_000.0,
                    1_000_000.0,
                )?;
                let position =
                    component_uniform(palette_position, scene, &context, t, budget, 0.0, 0.0, 1.0)?;
                let mut rect = [0.0; 4];
                for (index, value) in [&domain.x, &domain.y, &domain.width, &domain.height]
                    .into_iter()
                    .enumerate()
                {
                    let Some(value) =
                        sample_value(value, ValueType::Length, scene, &context, t, budget)?
                    else {
                        source.data_mut().fill(0);
                        return Ok((source, vec![]));
                    };
                    rect[index] = value.number()?;
                }
                let palette = self.images.get(palette_resource_id).ok_or_else(|| {
                    anyhow::anyhow!("CAPTION_RESOURCE_MISSING: {palette_resource_id}")
                })?;
                // Fixed-cost six-corner noise and color arithmetic per destination.
                // Charge the full surface before evaluating any pixels.
                for _ in 0..32 {
                    work.spend(size.0, size.1)?;
                }
                super::noise_palette::apply(
                    source.data_mut(),
                    size,
                    pad,
                    rect,
                    phase,
                    palette,
                    position,
                )?;
                Ok((source, hits))
            }
            CaptionMaterial::AngularSampleBlend {
                id,
                context_node_id,
                domain,
                aspect,
                angle,
            } => {
                let (mut source, hits) =
                    self.material_prefix(ci, t, materials, prefix - 1, pad, size, budget, work)?;
                let Some(mut context) =
                    self.material_page_context(ci, t, context_node_id, budget)?
                else {
                    source.data_mut().fill(0);
                    return Ok((source, vec![]));
                };
                context.stable_key.push_str(&format!("|material|{id}"));
                let scene = self.style.scene();
                let aspect =
                    component_uniform(aspect, scene, &context, t, budget, 1.0, 0.0001, 10_000.0)?;
                let angle = sample_value(angle, ValueType::Angle, scene, &context, t, budget)?
                    .map(|v| v.number())
                    .transpose()?
                    .unwrap_or(0.0);
                let mut rect = [0.0; 4];
                for (i, value) in [&domain.x, &domain.y, &domain.width, &domain.height]
                    .into_iter()
                    .enumerate()
                {
                    let Some(value) =
                        sample_value(value, ValueType::Length, scene, &context, t, budget)?
                    else {
                        source.data_mut().fill(0);
                        return Ok((source, vec![]));
                    };
                    rect[i] = value.number()?;
                }
                // Clear/write the output once; the kernel charges actual 1/2/4
                // texel reads before each read and all 60 sample transforms.
                work.spend(size.0, size.1)?;
                let image =
                    super::angular_samples::apply(&source, pad, rect, aspect, angle, |count| {
                        work.samples(count)
                    })?;
                Ok((image, hits))
            }
            CaptionMaterial::GaussianAxis {
                id,
                context_node_id,
                axis,
                samples,
                step_uv,
                sigma_uv,
                gamma,
                boundary,
            } => {
                let (mut source, hits) =
                    self.material_prefix(ci, t, materials, prefix - 1, pad, size, budget, work)?;
                let Some(mut context) =
                    self.material_page_context(ci, t, context_node_id, budget)?
                else {
                    source.data_mut().fill(0);
                    return Ok((source, vec![]));
                };
                context.stable_key.push_str(&format!("|material|{id}"));
                work.spend(self.width, self.height)?;
                let input = component_crop(&source, pad, (self.width, self.height))?;
                let scene = self.style.scene();
                let sample_count =
                    component_uniform(samples, scene, &context, t, budget, 0.0, 0.0, 1024.0)?;
                let step = component_uniform(step_uv, scene, &context, t, budget, 0.0, 0.0, 1.0)?;
                let sigma =
                    component_uniform(sigma_uv, scene, &context, t, budget, 0.0, 0.0, 1024.0)?;
                let dimension = f64::from(if *axis == WaveAxis::X {
                    input.width()
                } else {
                    input.height()
                });
                let pass = filters::GaussianPass {
                    axis: if *axis == WaveAxis::X {
                        filters::Axis::X
                    } else {
                        filters::Axis::Y
                    },
                    sample_count,
                    step_pixels: step * dimension,
                    sigma_pixels: sigma * dimension,
                    gamma: (*gamma != 1.0).then_some(*gamma),
                    boundary: match boundary {
                        ComponentBoundary::Normalize => filters::Boundary::Normalize,
                        ComponentBoundary::Replicate => filters::Boundary::Replicate,
                        ComponentBoundary::Transparent => filters::Boundary::Transparent,
                    },
                    output: input.size(),
                };
                work.components(filters::estimate_gaussian_reads(&input, pass)?)?;
                let image = filters::gaussian(&input, pass)?;
                work.spend(size.0, size.1)?;
                Ok((component_surface(image, pad, size)?, hits))
            }
            CaptionMaterial::GlowCascade {
                id,
                context_node_id,
                levels,
                gamma,
                intensity,
                original_opacity,
                glow_tint,
                glow_color_matrix,
                composite,
            } => {
                let (mut source, hits) =
                    self.material_prefix(ci, t, materials, prefix - 1, pad, size, budget, work)?;
                let Some(mut context) =
                    self.material_page_context(ci, t, context_node_id, budget)?
                else {
                    source.data_mut().fill(0);
                    return Ok((source, vec![]));
                };
                context.stable_key.push_str(&format!("|material|{id}"));
                work.spend(self.width, self.height)?;
                let input = component_crop(&source, pad, (self.width, self.height))?;
                let scene = self.style.scene();
                let mut converted = Vec::with_capacity(levels.len());
                let mut input_size = input.size();
                for level in levels {
                    let x = component_stage(
                        &level.horizontal,
                        filters::Axis::X,
                        input_size,
                        input.size(),
                        *gamma,
                        scene,
                        &context,
                        t,
                        budget,
                    )?;
                    let y = component_stage(
                        &level.vertical,
                        filters::Axis::Y,
                        x.output,
                        input.size(),
                        *gamma,
                        scene,
                        &context,
                        t,
                        budget,
                    )?;
                    input_size = y.output;
                    converted.push(filters::GlowLevel { x, y });
                }
                let config = filters::GlowConfig {
                    levels: converted,
                    gamma: *gamma,
                    intensity: component_uniform(
                        intensity, scene, &context, t, budget, 0.0, 0.0, 16.0,
                    )?,
                    original_opacity: component_uniform(
                        original_opacity,
                        scene,
                        &context,
                        t,
                        budget,
                        1.0,
                        0.0,
                        1.0,
                    )?,
                    glow_tint: component_glow_tint(glow_tint.as_ref(), scene, &context, t, budget)?,
                    glow_color_matrix: glow_color_matrix.unwrap_or(filters::IDENTITY_GLOW_MATRIX),
                    composite: match composite {
                        GlowComposite::Screen => filters::GlowComposite::Screen,
                        GlowComposite::SourceOverGlow => filters::GlowComposite::SourceOverGlow,
                    },
                    output: input.size(),
                };
                if filters::estimate_glow_peak_bytes(input.size(), &config)? > MAX_SURFACE_BYTES {
                    bail!("CAPTION_BUDGET_EXCEEDED: component surfaces");
                }
                work.components(filters::estimate_glow_reads(&input, &config)?)?;
                let image = filters::cascade_glow(&input, &config)?.image;
                work.spend(size.0, size.1)?;
                Ok((component_surface(image, pad, size)?, hits))
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
                    if component_stack(&materials[..prefix - 1]) {
                        render_raster::emissive::composite_associated(
                            &mut out,
                            source.as_ref(),
                            alpha as f32,
                            [
                                1.0,
                                0.0,
                                0.0,
                                1.0,
                                (offset[0] * f64::from(i)) as f32,
                                (offset[1] * f64::from(i)) as f32,
                            ],
                            None,
                        )?;
                    } else {
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
                }
                Ok((out, hits))
            }
        }
    }
}

fn component_stack(materials: &[CaptionMaterial]) -> bool {
    materials.iter().any(|material| {
        matches!(
            material,
            CaptionMaterial::AngularSampleBlend { .. }
                | CaptionMaterial::NoisePaletteMix { .. }
                | CaptionMaterial::GaussianAxis { .. }
                | CaptionMaterial::GlowCascade { .. }
        )
    })
}

fn component_uniform(
    value: &DynamicValue,
    scene: &Scene,
    context: &Context,
    t: f64,
    budget: &mut Budget,
    fallback: f64,
    low: f64,
    high: f64,
) -> Result<f64> {
    let value = sample_value(value, ValueType::Scalar, scene, context, t, budget)?
        .map(|v| v.number())
        .transpose()?
        .unwrap_or(fallback);
    if !value.is_finite() || !(low..=high).contains(&value) {
        bail!("CAPTION_MATERIAL_INVALID: component uniform");
    }
    Ok(value)
}
fn component_glow_tint(
    value: Option<&DynamicValue>,
    scene: &Scene,
    context: &Context,
    t: f64,
    budget: &mut Budget,
) -> Result<[f64; 3]> {
    // Omitted tint retains the old evaluation budget and exact white behavior.
    let Some(value) = value else {
        return Ok([1.0; 3]);
    };
    let color = match sample_value(value, ValueType::Color, scene, context, t, budget)? {
        Some(Evaluated::Color(color)) => color,
        None => [1.0; 4],
        _ => bail!("CAPTION_MATERIAL_INVALID: glow tint color"),
    };
    if color
        .iter()
        .any(|c| !c.is_finite() || !(0.0..=1.0).contains(c))
    {
        bail!("CAPTION_MATERIAL_INVALID: glow tint color");
    }
    // The alpha channel is validated as color data but is never a glow gain.
    Ok([color[0], color[1], color[2]])
}

fn component_stage(
    stage: &GaussianStage,
    axis: filters::Axis,
    input: filters::Size,
    canvas: filters::Size,
    gamma: f64,
    scene: &Scene,
    context: &Context,
    t: f64,
    budget: &mut Budget,
) -> Result<filters::GaussianPass> {
    if stage.scale.num == 0 || stage.scale.num > stage.scale.den || stage.scale.den > 4096 {
        bail!("CAPTION_MATERIAL_INVALID: surface scale");
    }
    let scale = |dimension: u32| {
        ((u64::from(dimension) * u64::from(stage.scale.num) / u64::from(stage.scale.den)).max(1))
            as u32
    };
    let dimension = f64::from(if axis == filters::Axis::X {
        input.width
    } else {
        input.height
    });
    Ok(filters::GaussianPass {
        axis,
        sample_count: component_uniform(
            &stage.samples,
            scene,
            context,
            t,
            budget,
            0.0,
            0.0,
            1024.0,
        )?,
        step_pixels: component_uniform(&stage.step_uv, scene, context, t, budget, 0.0, 0.0, 1.0)?
            * dimension,
        sigma_pixels: component_uniform(
            &stage.sigma_uv,
            scene,
            context,
            t,
            budget,
            0.0,
            0.0,
            1024.0,
        )? * dimension,
        gamma: (gamma != 1.0).then_some(gamma),
        boundary: filters::Boundary::Replicate,
        output: filters::Size {
            width: scale(canvas.width),
            height: scale(canvas.height),
        },
    })
}
fn component_crop(source: &Pixmap, pad: u32, size: (u32, u32)) -> Result<filters::ComponentImage> {
    let mut data = Vec::with_capacity(size.0 as usize * size.1 as usize * 4);
    for y in pad..pad + size.1 {
        let start = (y as usize * source.width() as usize + pad as usize) * 4;
        data.extend_from_slice(&source.data()[start..start + size.0 as usize * 4]);
    }
    filters::ComponentImage::new(size.0, size.1, data)
}
fn component_surface(image: filters::ComponentImage, pad: u32, size: (u32, u32)) -> Result<Pixmap> {
    if image.width() + pad * 2 != size.0 || image.height() + pad * 2 != size.1 {
        bail!("CAPTION_MATERIAL_INVALID: component output dimensions");
    }
    let mut output = Pixmap::new(size.0, size.1)
        .ok_or_else(|| anyhow::anyhow!("CAPTION_BUDGET_EXCEEDED: component output"))?;
    let row = image.width() as usize * 4;
    for y in 0..image.height() as usize {
        let start = ((y + pad as usize) * size.0 as usize + pad as usize) * 4;
        output.data_mut()[start..start + row]
            .copy_from_slice(&image.data()[y * row..(y + 1) * row]);
    }
    Ok(output)
}

/// Closed lower edge and open upper edge when feather is zero, matching step.
fn band_smoothstep(low: f64, high: f64, u: f64) -> f64 {
    if high == low {
        return if u < low { 0.0 } else { 1.0 };
    }
    let t = ((u - low) / (high - low)).clamp(0.0, 1.0);
    t * t * (3.0 - 2.0 * t)
}
fn soft_band(
    source: &mut Pixmap,
    pad: u32,
    canvas: (u32, u32),
    axis: WaveAxis,
    center: f64,
    half_width: f64,
    feather: f64,
    amount: f64,
    opacity: f64,
) {
    let width = source.width() as usize;
    let dimension = f64::from(if axis == WaveAxis::X {
        canvas.0
    } else {
        canvas.1
    });
    for (i, pixel) in source.data_mut().chunks_exact_mut(4).enumerate() {
        let coordinate = if axis == WaveAxis::X {
            i % width
        } else {
            i / width
        };
        let u = (coordinate as f64 + 0.5 - f64::from(pad)) / dimension;
        let band = band_smoothstep(center - half_width - feather, center - half_width, u)
            * (1.0 - band_smoothstep(center + half_width, center + half_width + feather, u));
        let factor = ((1.0 - amount) + amount * band) * opacity;
        for channel in pixel {
            *channel = libm::floor(f64::from(*channel) * factor + 0.5) as u8;
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

#[cfg(test)]
mod soft_band_tests {
    use super::*;
    fn solid(w: u32, h: u32) -> Pixmap {
        let mut image = Pixmap::new(w, h).unwrap();
        for pixel in image.data_mut().chunks_exact_mut(4) {
            pixel.copy_from_slice(&[128, 64, 32, 128]);
        }
        image
    }
    #[test]
    fn soft_band_equals_its_two_smoothstep_formula_including_outside_centers() {
        let smooth = |low: f64, high: f64, u: f64| {
            let t = ((u - low) / (high - low)).clamp(0.0, 1.0);
            t * t * (3.0 - 2.0 * t)
        };
        for center in [-2.0, -0.3, 0.0, 0.5, 1.0, 1.7, 4.0] {
            let mut image = solid(101, 1);
            soft_band(
                &mut image,
                0,
                (101, 1),
                WaveAxis::X,
                center,
                0.2,
                0.3,
                1.0,
                1.0,
            );
            for (x, pixel) in image.data().chunks_exact(4).enumerate() {
                let u = (x as f64 + 0.5) / 101.0;
                let alpha = smooth(center - 0.5, center - 0.2, u)
                    * smooth(0.5 - center, 0.8 - center, 1.0 - u);
                let expected =
                    [128.0, 64.0, 32.0, 128.0].map(|c| libm::floor(c * alpha + 0.5) as u8);
                assert_eq!(pixel, expected, "center={center}, x={x}");
            }
        }
    }
    #[test]
    fn soft_band_zero_feather_step_amount_and_opacity_are_exact() {
        let original = solid(4, 1);
        let mut no_op = original.clone();
        soft_band(&mut no_op, 0, (4, 1), WaveAxis::X, 4.0, 0.0, 0.0, 0.0, 1.0);
        assert_eq!(no_op.data(), original.data());
        let mut image = original.clone();
        soft_band(&mut image, 0, (4, 1), WaveAxis::X, 0.5, 0.25, 0.0, 1.0, 1.0);
        assert_eq!(
            image
                .data()
                .chunks_exact(4)
                .map(|p| p[3])
                .collect::<Vec<_>>(),
            vec![0, 128, 128, 0]
        );
        soft_band(&mut image, 0, (4, 1), WaveAxis::X, 0.5, 0.25, 0.0, 0.0, 0.5);
        assert_eq!(
            image
                .data()
                .chunks_exact(4)
                .map(|p| p[3])
                .collect::<Vec<_>>(),
            vec![0, 64, 64, 0]
        );
        soft_band(&mut image, 0, (4, 1), WaveAxis::X, 0.5, 0.25, 0.0, 1.0, 0.0);
        assert!(image.data().iter().all(|v| *v == 0));
        assert_eq!(band_smoothstep(0.5, 0.5, 0.5), 1.0);
        assert_eq!(band_smoothstep(0.5, 0.5, 0.49), 0.0);
    }
    #[test]
    fn soft_band_uses_original_canvas_uv_for_both_axes_with_padding() {
        for axis in [WaveAxis::X, WaveAxis::Y] {
            let mut a = solid(8, 6);
            let mut b = solid(18, 16);
            soft_band(&mut a, 0, (8, 6), axis, 0.37, 0.13, 0.31, 0.82, 0.73);
            soft_band(&mut b, 5, (8, 6), axis, 0.37, 0.13, 0.31, 0.82, 0.73);
            for y in 0..6 {
                for x in 0..8 {
                    let ai = (y * 8 + x) * 4;
                    let bi = ((y + 5) * 18 + x + 5) * 4;
                    assert_eq!(&a.data()[ai..ai + 4], &b.data()[bi..bi + 4]);
                }
            }
            assert!(
                b.data()
                    .chunks_exact(4)
                    .all(|p| p[..3].iter().all(|c| *c <= p[3]))
            );
        }
    }

    fn fixture() -> serde_json::Value {
        serde_json::from_str(include_str!(
            "../../../caption-scene/tests/fixtures/soft-band.json"
        ))
        .unwrap()
    }
    fn cue(id: &str, start: f64, end: f64) -> SceneCue {
        SceneCue {
            id: id.into(),
            document_id: "doc".into(),
            text: "A B C D".into(),
            start,
            end,
            words: ["A", "B", "C", "D"]
                .iter()
                .enumerate()
                .map(|(i, text)| SceneWord {
                    id: format!("{id}-{i}"),
                    text: (*text).into(),
                    start: start + i as f64 * (end - start) / 4.0,
                    end: start + (i as f64 + 0.8) * (end - start) / 4.0,
                })
                .collect(),
        }
    }
    fn plan(body: serde_json::Value, cues: Vec<SceneCue>) -> ScenePlan {
        ScenePlan::compile(
            parse_style(&body).unwrap(),
            Presentation::default(),
            cues,
            (160, 90),
            TextEngine::with_document_fonts(&[include_bytes!(
                "../../../render-raster/assets/fonts/NotoSansSC-Variable.ttf"
            )
            .to_vec()]),
            "instance".into(),
        )
        .unwrap()
    }
    #[test]
    fn soft_band_neutral_parameters_preserve_rendered_rgba() {
        let mut body = fixture();
        body["scene"]["value"]["materials"][0]["amount"] =
            serde_json::json!({"kind":"constant","value":0});
        body["scene"]["value"]["materials"][0]["opacity"] =
            serde_json::json!({"kind":"constant","value":1});
        let mut masked = plan(body.clone(), vec![cue("same", 0.0, 4.0)]);
        body["scene"]["value"]["materials"] = serde_json::json!([]);
        let mut plain = plan(body, vec![cue("same", 0.0, 4.0)]);
        for t in [0.2, 1.4, 2.2, 3.5] {
            assert_eq!(
                masked.render(t).unwrap().rgba,
                plain.render(t).unwrap().rgba
            );
        }
    }
    #[test]
    fn soft_band_context_uses_its_resolved_page_and_input_last_word_timing() {
        let mut p = plan(fixture(), vec![cue("first", 0.0, 4.0)]);
        for (t, page, last_start) in [(0.5, 0.0, 1.0), (2.5, 1.0, 3.0), (0.5, 0.0, 1.0)] {
            let c = p
                .material_page_context(0, t, "caption", &mut Budget::default())
                .unwrap()
                .unwrap();
            assert_eq!(c.fields["unit.pageIndex"].number().unwrap(), page);
            assert_eq!(c.fields["unit.pageCount"].number().unwrap(), 2.0);
            assert!(c.fields["unit.pageLastWordTimed"].boolean().unwrap());
            assert!(
                (c.fields["time.pageLastWordElapsedSeconds"]
                    .number()
                    .unwrap()
                    - (t - last_start))
                    .abs()
                    < 1e-12
            );
            assert!(
                (c.fields["time.pageLastWordDurationSeconds"]
                    .number()
                    .unwrap()
                    - 0.8)
                    .abs()
                    < 1e-12
            );
            assert!(c.fields["layout.inkHeight"].number().unwrap() > 0.0);
        }
        assert!(
            p.material_page_context(0, 0.5, "missing", &mut Budget::default())
                .unwrap()
                .is_none()
        );
        let mut body = fixture();
        body["scene"]["value"]["speechState"]["timingPolicy"] = serde_json::json!("estimated");
        let mut untimed = cue("untimed", 0.0, 4.0);
        untimed.words.clear();
        let mut p = plan(body.clone(), vec![untimed]);
        let c = p
            .material_page_context(0, 2.5, "caption", &mut Budget::default())
            .unwrap()
            .unwrap();
        assert!(!c.fields["unit.pageLastWordTimed"].boolean().unwrap());
        assert_eq!(
            c.fields["time.pageLastWordElapsedSeconds"]
                .number()
                .unwrap(),
            0.0
        );
        assert_eq!(
            c.fields["time.pageLastWordDurationSeconds"]
                .number()
                .unwrap(),
            0.0
        );
        // Static text is display content, even when it happens to equal a timed cue.
        body["scene"]["value"]["nodes"][0]["text"] =
            serde_json::json!({"source":"static","text":"A B C D"});
        let mut p = plan(body, vec![cue("timed", 0.0, 4.0)]);
        assert!(
            !p.material_page_context(0, 0.5, "caption", &mut Budget::default())
                .unwrap()
                .unwrap()
                .fields["unit.pageLastWordTimed"]
                .boolean()
                .unwrap()
        );
    }
    #[test]
    fn soft_band_missing_page_and_invalid_sampled_uniforms_are_explicit() {
        let mut body = fixture();
        body["scene"]["value"]["layout"]["leadingGap"] = serde_json::json!("hide");
        let mut delayed = cue("delayed", 0.0, 4.0);
        for w in &mut delayed.words {
            w.start += 0.5;
            w.end += 0.5;
        }
        let mut p = plan(body, vec![delayed]);
        assert!(
            p.material_page_context(0, 0.1, "caption", &mut Budget::default())
                .unwrap()
                .is_none()
        );
        assert!(p.render(0.1).unwrap().rgba.iter().all(|v| *v == 0));
        let mut body = fixture();
        body["scene"]["value"]["materials"][0]["amount"] = serde_json::json!({"kind":"expression","expression":{"op":"literal","type":"scalar","value":2}});
        let error = plan(body, vec![cue("invalid", 0.0, 4.0)])
            .render(0.5)
            .err()
            .unwrap()
            .to_string();
        assert!(error.contains("CAPTION_MATERIAL_INVALID"), "{error}");
    }
    #[test]
    fn soft_band_feedback_recomputes_each_history_page_and_cannot_cross_cues() {
        let mut body = fixture();
        body["scene"]["value"]["materials"].as_array_mut().unwrap().push(serde_json::json!({"kind":"feedback","id":"tail","samples":2,"step":{"ticks":150,"timescale":1000},"decay":0.6,"offset":[1,0]}));
        let mut p = plan(
            body.clone(),
            vec![cue("first", 0.0, 4.0), cue("second", 4.0, 8.0)],
        );
        for t in [1.75, 2.05, 3.2, 4.02, 1.75] {
            let now = p.render(t).unwrap();
            let fresh = plan(
                body.clone(),
                vec![cue("first", 0.0, 4.0), cue("second", 4.0, 8.0)],
            )
            .render(t)
            .unwrap();
            assert_eq!(now.rgba, fresh.rgba);
            assert_eq!(now.fingerprint, fresh.fingerprint);
        }
        assert!(p.render(3.72).unwrap().rgba.iter().any(|v| *v > 0));
        let isolated = plan(body, vec![cue("second", 4.0, 8.0)])
            .render(4.02)
            .unwrap();
        assert_eq!(p.render(4.02).unwrap().rgba, isolated.rgba);
    }
    #[test]
    fn page_envelope_material_context_tracks_real_size_runs_and_feedback_samples() {
        let body: serde_json::Value = serde_json::from_str(include_str!(
            "../../../caption-scene/tests/fixtures/page-envelope.json"
        ))
        .unwrap();
        let mut p = plan(body.clone(), vec![cue("first", 0.0, 4.0)]);
        let initial = p
            .material_page_context(0, 0.0, "caption", &mut Budget::default())
            .unwrap()
            .unwrap();
        let peak = p
            .material_page_context(0, 0.28, "caption", &mut Budget::default())
            .unwrap()
            .unwrap();
        assert!(
            initial.fields["unit.pageEnvelopeAvailable"]
                .boolean()
                .unwrap()
        );
        assert_eq!(initial.fields["unit.pageLineCount"].number().unwrap(), 2.0);
        assert_eq!(
            initial.fields["layout.pageMaxFontSize"].number().unwrap(),
            20.0
        );
        assert!((peak.fields["layout.pageMaxFontSize"].number().unwrap() - 26.0).abs() < 1e-8);
        assert!(
            peak.fields["layout.pageEnvelopeHeight"].number().unwrap()
                > initial.fields["layout.pageEnvelopeHeight"]
                    .number()
                    .unwrap()
        );
        let next = p
            .material_page_context(0, 3.1, "caption", &mut Budget::default())
            .unwrap()
            .unwrap();
        assert_eq!(next.fields["unit.pageLineCount"].number().unwrap(), 1.0);
        assert!(next.fields["layout.pageMaxFontSize"].number().unwrap() < 26.0);
        assert_eq!(
            initial.fields,
            p.material_page_context(0, 0.0, "caption", &mut Budget::default())
                .unwrap()
                .unwrap()
                .fields
        );

        let mut feedback = body;
        feedback["scene"]["value"]["requiredCapabilities"]
            .as_array_mut()
            .unwrap()
            .push(serde_json::json!("caption-feedback/1"));
        feedback["scene"]["value"]["materials"] = serde_json::json!([{"kind":"feedback","id":"trail","samples":2,"step":{"ticks":150,"timescale":1000},"decay":0.6,"offset":[1,0]}]);
        let mut reused = plan(feedback.clone(), vec![cue("first", 0.0, 4.0)]);
        for time in [0.28, 3.1, 1.5, 0.28] {
            let frame = reused.render(time).unwrap();
            let fresh = plan(feedback.clone(), vec![cue("first", 0.0, 4.0)])
                .render(time)
                .unwrap();
            assert_eq!(frame.rgba, fresh.rgba);
            assert_eq!(frame.fingerprint, fresh.fingerprint);
        }
    }
}

#[cfg(test)]
mod glow_tint_tests {
    use super::*;
    use serde_json::json;

    #[test]
    fn glow_tint_uses_shared_budget_color_type_and_white_keyframe_fallback() {
        let body = serde_json::from_str(include_str!(
            "../../../caption-scene/tests/fixtures/glow-cascade.json"
        ))
        .unwrap();
        let style = caption_scene::parse_style(&body).unwrap();
        let mut context = Context::default();
        context.spans.insert(UnitKind::Page, (1.0, 2.0));
        let mut none_budget = Budget::new(0);
        assert_eq!(
            component_glow_tint(None, style.scene(), &context, 0.0, &mut none_budget).unwrap(),
            [1.0; 3]
        );
        assert_eq!(none_budget.remaining(), 0);
        let value: DynamicValue =
            serde_json::from_value(json!({"kind":"constant","value":"#FFFFFF00"})).unwrap();
        assert!(
            component_glow_tint(
                Some(&value),
                style.scene(),
                &context,
                0.0,
                &mut Budget::new(0)
            )
            .unwrap_err()
            .to_string()
            .contains("CAPTION_BUDGET_EXCEEDED")
        );
        assert_eq!(
            component_glow_tint(
                Some(&value),
                style.scene(),
                &context,
                0.0,
                &mut Budget::new(1)
            )
            .unwrap(),
            [1.0; 3]
        );
        let keys: DynamicValue = serde_json::from_value(json!({"kind":"keyframes","clock":{"unit":"page","origin":"start","duration":{"kind":"unit-span"}},"keys":[{"at":0,"value":"#FF0000"},{"at":1,"value":"#0000FF"}]})).unwrap();
        assert_eq!(
            component_glow_tint(
                Some(&keys),
                style.scene(),
                &context,
                0.0,
                &mut Budget::default()
            )
            .unwrap(),
            [1.0; 3]
        );
        assert_eq!(
            component_glow_tint(
                Some(&keys),
                style.scene(),
                &context,
                1.0,
                &mut Budget::default()
            )
            .unwrap(),
            [1.0, 0.0, 0.0]
        );
        let invalid: DynamicValue = serde_json::from_value(json!({"kind":"expression","expression":{"op":"call","function":"mix","args":[{"op":"literal","type":"color","value":"#000000"},{"op":"literal","type":"color","value":"#FFFFFF"},{"op":"literal","type":"scalar","value":2}]}})).unwrap();
        assert!(
            component_glow_tint(
                Some(&invalid),
                style.scene(),
                &context,
                0.0,
                &mut Budget::default()
            )
            .unwrap_err()
            .to_string()
            .contains("CAPTION_MATERIAL_INVALID")
        );
    }
}
