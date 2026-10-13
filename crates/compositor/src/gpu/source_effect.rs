use std::collections::HashMap;

use anyhow::{Result, bail};
use timeline_render::{TEXTURE_EFFECT_LIMIT, TextureEffect};

const FORMAT: wgpu::TextureFormat = wgpu::TextureFormat::Rgba8Unorm;
const PARAMS_SIZE: u64 = 16 + TEXTURE_EFFECT_LIMIT as u64 * 16;

const COLOR_ADJUST: u32 = 1;
const GRAYSCALE: u32 = 2;
const BRIGHTNESS: u32 = 3;
const CONTRAST: u32 = 4;
const SATURATION: u32 = 5;
const SEPIA: u32 = 6;
const HUE_ROTATE: u32 = 7;
const INVERT: u32 = 8;
const SHARPEN: u32 = 9;
const NOISE: u32 = 10;
const VIGNETTE: u32 = 11;

const SHADER: &str = r#"
const EFFECT_LIMIT: u32 = 24u;
const COLOR_ADJUST: u32 = 1u;
const GRAYSCALE: u32 = 2u;
const BRIGHTNESS: u32 = 3u;
const CONTRAST: u32 = 4u;
const SATURATION: u32 = 5u;
const SEPIA: u32 = 6u;
const HUE_ROTATE: u32 = 7u;
const INVERT: u32 = 8u;
const SHARPEN: u32 = 9u;
const NOISE: u32 = 10u;
const VIGNETTE: u32 = 11u;

struct SourceEffectParams {
    // width, height, effect count, first sharpen index (0 when absent)
    header: vec4u,
    // kind, amount, second amount, reserved
    effects: array<vec4f, 24>,
}

struct U64 {
    lo: u32,
    hi: u32,
}

@group(0) @binding(0) var source: texture_2d<f32>;
@group(0) @binding(1) var<uniform> params: SourceEffectParams;

@vertex
fn vertex_main(@builtin(vertex_index) index: u32) -> @builtin(position) vec4f {
    var positions = array<vec2f, 3>(
        vec2f(-1.0, -1.0),
        vec2f(3.0, -1.0),
        vec2f(-1.0, 3.0),
    );
    return vec4f(positions[index], 0.0, 1.0);
}

fn quantize_premul(color: vec4f) -> vec4f {
    return vec4f(
        round(clamp(color.rgb, vec3f(0.0), vec3f(color.a)) * 255.0) / 255.0,
        color.a,
    );
}

fn from_unpremul(rgb: vec3f, alpha: f32) -> vec4f {
    return quantize_premul(vec4f(clamp(rgb, vec3f(0.0), vec3f(1.0)) * alpha, alpha));
}

fn luma(rgb: vec3f) -> f32 {
    return dot(rgb, vec3f(0.2126, 0.7152, 0.0722));
}

fn xor_shift_right(value: U64, shift: u32) -> U64 {
    return U64(
        value.lo ^ ((value.lo >> shift) | (value.hi << (32u - shift))),
        value.hi ^ (value.hi >> shift),
    );
}

fn byte_at(value: U64, index: u32) -> u32 {
    if index < 4u {
        return (value.lo >> (index * 8u)) & 255u;
    }
    return (value.hi >> ((index - 4u) * 8u)) & 255u;
}

// WGSL/WebGL2 都没有可移植 u64。八个 base-256 limb 的卷积只保留低 64 位，
// 与 Rust wrapping_mul 逐位等价；每个中间和小于 2^20，不依赖溢出行为。
fn mul64(left: U64, right: U64) -> U64 {
    var digits: array<u32, 8>;
    var carry = 0u;
    var column = 0u;
    loop {
        if column >= 8u {
            break;
        }
        var sum = carry;
        var index = 0u;
        loop {
            if index > column {
                break;
            }
            sum += byte_at(left, index) * byte_at(right, column - index);
            index += 1u;
        }
        digits[column] = sum & 255u;
        carry = sum >> 8u;
        column += 1u;
    }
    return U64(
        digits[0] | (digits[1] << 8u) | (digits[2] << 16u) | (digits[3] << 24u),
        digits[4] | (digits[5] << 8u) | (digits[6] << 16u) | (digits[7] << 24u),
    );
}

fn coordinate_noise(position: vec2i) -> f32 {
    var value = U64(u32(position.x), u32(position.y));
    value = xor_shift_right(value, 30u);
    value = mul64(value, U64(0x1ce4e5b9u, 0xbf58476du));
    value = xor_shift_right(value, 27u);
    value = mul64(value, U64(0x133111ebu, 0x94d049bbu));
    value = xor_shift_right(value, 31u);
    return f32(value.lo & 0xffffu) / 65535.0 * 2.0 - 1.0;
}

fn point_effect(effect: vec4f, color: vec4f, position: vec2i) -> vec4f {
    let kind = u32(effect.x + 0.5);
    let amount = effect.y;
    if color.a <= 0.0 {
        return color;
    }
    var rgb = color.rgb / color.a;
    if kind == COLOR_ADJUST {
        let gray = luma(rgb);
        rgb = rgb + (vec3f(gray) - rgb) * amount + vec3f(effect.z);
        return from_unpremul(rgb, color.a);
    }
    if kind == GRAYSCALE {
        let gray = luma(rgb);
        return from_unpremul(rgb + (vec3f(gray) - rgb) * amount, color.a);
    }
    if kind == BRIGHTNESS {
        return from_unpremul(rgb + vec3f(amount), color.a);
    }
    if kind == CONTRAST {
        return from_unpremul((rgb - vec3f(0.5)) * (1.0 + amount) + vec3f(0.5), color.a);
    }
    if kind == SATURATION {
        let gray = luma(rgb);
        return from_unpremul(vec3f(gray) + (rgb - vec3f(gray)) * amount, color.a);
    }
    if kind == SEPIA {
        let sepia = vec3f(
            dot(rgb, vec3f(0.393, 0.769, 0.189)),
            dot(rgb, vec3f(0.349, 0.686, 0.168)),
            dot(rgb, vec3f(0.272, 0.534, 0.131)),
        );
        return from_unpremul(rgb + (sepia - rgb) * amount, color.a);
    }
    if kind == HUE_ROTATE {
        let radians = amount * 0.017453292519943295;
        let hue_sin = sin(radians);
        let hue_cos = cos(radians);
        let rotated = vec3f(
            (0.213 + hue_cos * 0.787 - hue_sin * 0.213) * rgb.r
                + (0.715 - hue_cos * 0.715 - hue_sin * 0.715) * rgb.g
                + (0.072 - hue_cos * 0.072 + hue_sin * 0.928) * rgb.b,
            (0.213 - hue_cos * 0.213 + hue_sin * 0.143) * rgb.r
                + (0.715 + hue_cos * 0.285 + hue_sin * 0.140) * rgb.g
                + (0.072 - hue_cos * 0.072 - hue_sin * 0.283) * rgb.b,
            (0.213 - hue_cos * 0.213 - hue_sin * 0.787) * rgb.r
                + (0.715 - hue_cos * 0.715 + hue_sin * 0.715) * rgb.g
                + (0.072 + hue_cos * 0.928 + hue_sin * 0.072) * rgb.b,
        );
        return from_unpremul(rotated, color.a);
    }
    if kind == INVERT {
        return from_unpremul(rgb + (vec3f(1.0) - 2.0 * rgb) * amount, color.a);
    }
    if kind == NOISE {
        let delta = coordinate_noise(position) * (64.0 / 255.0) * amount * color.a;
        return quantize_premul(vec4f(color.rgb + vec3f(delta), color.a));
    }
    if kind == VIGNETTE {
        let center = (vec2f(params.header.xy) - vec2f(1.0)) * 0.5;
        let radii = max(center, vec2f(1.0));
        let normalized = (vec2f(position) - center) / radii;
        let radius = length(normalized) * 0.7071067811865476;
        let edge = clamp((radius - 0.42) / 0.58, 0.0, 1.0);
        let eased_edge = edge * edge * (3.0 - 2.0 * edge);
        let factor = 1.0 - eased_edge * amount * 0.85;
        return quantize_premul(vec4f(color.rgb * factor, color.a));
    }
    return color;
}

fn sharpen(samples: ptr<function, array<vec4f, 5>>, amount: f32) -> vec4f {
    let center = (*samples)[0];
    let edge = 4.0 * center.rgb
        - (*samples)[1].rgb
        - (*samples)[2].rgb
        - (*samples)[3].rgb
        - (*samples)[4].rgb;
    return quantize_premul(vec4f(center.rgb + edge * amount * 0.35, center.a));
}

@fragment
fn fragment_main(@builtin(position) fragment: vec4f) -> @location(0) vec4f {
    let size = vec2i(params.header.xy);
    let center = clamp(vec2i(fragment.xy), vec2i(0), size - vec2i(1));
    var positions = array<vec2i, 5>(
        center,
        vec2i(max(center.x - 1, 0), center.y),
        vec2i(min(center.x + 1, size.x - 1), center.y),
        vec2i(center.x, max(center.y - 1, 0)),
        vec2i(center.x, min(center.y + 1, size.y - 1)),
    );
    var samples: array<vec4f, 5>;
    var sample_index = 0u;
    loop {
        if sample_index >= 5u {
            break;
        }
        samples[sample_index] = textureLoad(source, positions[sample_index], 0);
        sample_index += 1u;
    }

    var effect_index = 0u;
    loop {
        if effect_index >= min(params.header.z, EFFECT_LIMIT) {
            break;
        }
        let effect = params.effects[effect_index];
        let kind = u32(effect.x + 0.5);
        if kind == SHARPEN {
            samples[0] = sharpen(&samples, effect.y);
        } else {
            samples[0] = point_effect(effect, samples[0], positions[0]);
            if effect_index < params.header.w {
                var neighbor = 1u;
                loop {
                    if neighbor >= 5u {
                        break;
                    }
                    samples[neighbor] = point_effect(effect, samples[neighbor], positions[neighbor]);
                    neighbor += 1u;
                }
            }
        }
        effect_index += 1u;
    }
    return samples[0];
}
"#;

pub(super) struct SourceEffectRenderer {
    device: wgpu::Device,
    queue: wgpu::Queue,
    bind_layout: wgpu::BindGroupLayout,
    pipeline: wgpu::RenderPipeline,
    outputs: Vec<EffectTexture>,
    scratches: HashMap<(u32, u32), EffectTexture>,
    passes: Vec<EffectPassSlot>,
    next_generation: u64,
    binding_rebuilds: u64,
}

struct EffectTexture {
    _texture: wgpu::Texture,
    view: wgpu::TextureView,
    width: u32,
    height: u32,
    generation: u64,
}

struct EffectPassSlot {
    params: wgpu::Buffer,
    source_key: String,
    source_generation: u64,
    bind_group: Option<wgpu::BindGroup>,
}

impl SourceEffectRenderer {
    pub fn new(device: wgpu::Device, queue: wgpu::Queue) -> Self {
        let bind_layout = device.create_bind_group_layout(&wgpu::BindGroupLayoutDescriptor {
            label: Some("bcut.source-effect.bind-layout"),
            entries: &[
                wgpu::BindGroupLayoutEntry {
                    binding: 0,
                    visibility: wgpu::ShaderStages::FRAGMENT,
                    ty: wgpu::BindingType::Texture {
                        sample_type: wgpu::TextureSampleType::Float { filterable: false },
                        view_dimension: wgpu::TextureViewDimension::D2,
                        multisampled: false,
                    },
                    count: None,
                },
                wgpu::BindGroupLayoutEntry {
                    binding: 1,
                    visibility: wgpu::ShaderStages::FRAGMENT,
                    ty: wgpu::BindingType::Buffer {
                        ty: wgpu::BufferBindingType::Uniform,
                        has_dynamic_offset: false,
                        min_binding_size: None,
                    },
                    count: None,
                },
            ],
        });
        let layout = device.create_pipeline_layout(&wgpu::PipelineLayoutDescriptor {
            label: Some("bcut.source-effect.pipeline-layout"),
            bind_group_layouts: &[Some(&bind_layout)],
            immediate_size: 0,
        });
        let module = device.create_shader_module(wgpu::ShaderModuleDescriptor {
            label: Some("bcut.source-effect.wgsl"),
            source: wgpu::ShaderSource::Wgsl(SHADER.into()),
        });
        let pipeline = device.create_render_pipeline(&wgpu::RenderPipelineDescriptor {
            label: Some("bcut.source-effect.pipeline"),
            layout: Some(&layout),
            vertex: wgpu::VertexState {
                module: &module,
                entry_point: Some("vertex_main"),
                compilation_options: Default::default(),
                buffers: &[],
            },
            primitive: wgpu::PrimitiveState {
                topology: wgpu::PrimitiveTopology::TriangleList,
                cull_mode: None,
                ..Default::default()
            },
            depth_stencil: None,
            multisample: wgpu::MultisampleState::default(),
            fragment: Some(wgpu::FragmentState {
                module: &module,
                entry_point: Some("fragment_main"),
                compilation_options: Default::default(),
                targets: &[Some(wgpu::ColorTargetState {
                    format: FORMAT,
                    blend: None,
                    write_mask: wgpu::ColorWrites::ALL,
                })],
            }),
            multiview_mask: None,
            cache: None,
        });
        Self {
            device,
            queue,
            bind_layout,
            pipeline,
            outputs: Vec::new(),
            scratches: HashMap::new(),
            passes: Vec::new(),
            next_generation: 1,
            binding_rebuilds: 0,
        }
    }

    pub fn output_view(&mut self, slot: usize, width: u32, height: u32) -> Result<(wgpu::TextureView, u64)> {
        if width == 0 || height == 0 {
            bail!("gpu-source-effect-size-invalid: {width}x{height}");
        }
        if slot > self.outputs.len() {
            bail!(
                "gpu-source-effect-output-slot-invalid: requested {slot}, next is {}",
                self.outputs.len()
            );
        }
        let replace = slot == self.outputs.len() || self.outputs[slot].width != width || self.outputs[slot].height != height;
        if replace {
            let texture = self.effect_texture(width, height, "bcut.source-effect.output");
            if slot == self.outputs.len() {
                self.outputs.push(texture);
            } else {
                self.outputs[slot] = texture;
            }
        }
        let output = &self.outputs[slot];
        Ok((output.view.clone(), output.generation))
    }

    pub fn scratch_view(&mut self, width: u32, height: u32) -> Result<(wgpu::TextureView, u64)> {
        if width == 0 || height == 0 {
            bail!("gpu-source-effect-size-invalid: {width}x{height}");
        }
        if !self.scratches.contains_key(&(width, height)) {
            let texture = self.effect_texture(width, height, "bcut.source-effect.scratch");
            self.scratches.insert((width, height), texture);
        }
        let scratch = self.scratches.get(&(width, height)).expect("刚插入 source effect scratch");
        Ok((scratch.view.clone(), scratch.generation))
    }

    #[allow(clippy::too_many_arguments)]
    pub fn encode_to_view(
        &mut self,
        pass_slot: usize,
        effects: &[TextureEffect],
        source_key: &str,
        source_generation: u64,
        source: &wgpu::TextureView,
        target: &wgpu::TextureView,
        width: u32,
        height: u32,
        encoder: &mut wgpu::CommandEncoder,
    ) -> Result<()> {
        if effects.is_empty() || effects.len() > TEXTURE_EFFECT_LIMIT {
            bail!("gpu-source-effect-count-invalid: {}", effects.len());
        }
        let mut sharpen_index = None;
        let mut encoded = Vec::with_capacity(effects.len());
        for (index, effect) in effects.iter().enumerate() {
            let values = match *effect {
                TextureEffect::ColorAdjust { grayscale, brightness } => [COLOR_ADJUST as f32, grayscale, brightness, 0.0],
                TextureEffect::Grayscale(amount) => [GRAYSCALE as f32, amount, 0.0, 0.0],
                TextureEffect::Brightness(amount) => [BRIGHTNESS as f32, amount, 0.0, 0.0],
                TextureEffect::Contrast(amount) => [CONTRAST as f32, amount, 0.0, 0.0],
                TextureEffect::Saturation(amount) => [SATURATION as f32, amount, 0.0, 0.0],
                TextureEffect::Sepia(amount) => [SEPIA as f32, amount, 0.0, 0.0],
                TextureEffect::HueRotate(degrees) => [HUE_ROTATE as f32, degrees, 0.0, 0.0],
                TextureEffect::Invert(amount) => [INVERT as f32, amount, 0.0, 0.0],
                TextureEffect::Sharpen(amount) => {
                    if sharpen_index.replace(index).is_some() {
                        bail!("gpu-source-effect-multiple-sharpen");
                    }
                    [SHARPEN as f32, amount, 0.0, 0.0]
                }
                TextureEffect::Noise(amount) => [NOISE as f32, amount, 0.0, 0.0],
                TextureEffect::Vignette(amount) => [VIGNETTE as f32, amount, 0.0, 0.0],
                TextureEffect::Blur(_) => bail!("gpu-source-effect-segment-contains-blur"),
            };
            encoded.push(values);
        }
        self.ensure_pass_slot(pass_slot)?;
        let mut bytes = Vec::with_capacity(PARAMS_SIZE as usize);
        for value in [width, height, effects.len() as u32, sharpen_index.unwrap_or(0) as u32] {
            bytes.extend_from_slice(&value.to_ne_bytes());
        }
        for values in encoded {
            for value in values {
                bytes.extend_from_slice(&value.to_ne_bytes());
            }
        }
        bytes.resize(PARAMS_SIZE as usize, 0);
        self.queue.write_buffer(&self.passes[pass_slot].params, 0, &bytes);
        let needs_bind_group = self.passes[pass_slot].source_key != source_key
            || self.passes[pass_slot].source_generation != source_generation
            || self.passes[pass_slot].bind_group.is_none();
        if needs_bind_group {
            let bind_group = self.device.create_bind_group(&wgpu::BindGroupDescriptor {
                label: Some("bcut.source-effect.bind-group"),
                layout: &self.bind_layout,
                entries: &[
                    wgpu::BindGroupEntry {
                        binding: 0,
                        resource: wgpu::BindingResource::TextureView(source),
                    },
                    wgpu::BindGroupEntry {
                        binding: 1,
                        resource: self.passes[pass_slot].params.as_entire_binding(),
                    },
                ],
            });
            let pass = &mut self.passes[pass_slot];
            source_key.clone_into(&mut pass.source_key);
            pass.source_generation = source_generation;
            pass.bind_group = Some(bind_group);
            self.binding_rebuilds += 1;
        }
        let mut pass = encoder.begin_render_pass(&wgpu::RenderPassDescriptor {
            label: Some("bcut.source-effect.pass"),
            color_attachments: &[Some(wgpu::RenderPassColorAttachment {
                view: target,
                depth_slice: None,
                resolve_target: None,
                ops: wgpu::Operations {
                    load: wgpu::LoadOp::Clear(wgpu::Color::TRANSPARENT),
                    store: wgpu::StoreOp::Store,
                },
            })],
            depth_stencil_attachment: None,
            timestamp_writes: None,
            occlusion_query_set: None,
            multiview_mask: None,
        });
        pass.set_pipeline(&self.pipeline);
        pass.set_bind_group(
            0,
            self.passes[pass_slot].bind_group.as_ref().expect("source effect bind group 已准备"),
            &[],
        );
        pass.draw(0..3, 0..1);
        Ok(())
    }

    pub fn finish_frame(&mut self, used_outputs: usize, used_passes: usize) {
        self.outputs.truncate(used_outputs);
        self.passes.truncate(used_passes);
    }

    pub fn binding_rebuilds(&self) -> u64 {
        self.binding_rebuilds
    }

    fn effect_texture(&mut self, width: u32, height: u32, label: &str) -> EffectTexture {
        let generation = self.next_generation;
        self.next_generation = self.next_generation.wrapping_add(1).max(1);
        let texture = self.device.create_texture(&wgpu::TextureDescriptor {
            label: Some(label),
            size: wgpu::Extent3d {
                width,
                height,
                depth_or_array_layers: 1,
            },
            mip_level_count: 1,
            sample_count: 1,
            dimension: wgpu::TextureDimension::D2,
            format: FORMAT,
            usage: wgpu::TextureUsages::RENDER_ATTACHMENT | wgpu::TextureUsages::TEXTURE_BINDING,
            view_formats: &[],
        });
        let view = texture.create_view(&wgpu::TextureViewDescriptor::default());
        EffectTexture {
            _texture: texture,
            view,
            width,
            height,
            generation,
        }
    }

    fn ensure_pass_slot(&mut self, slot: usize) -> Result<()> {
        if slot > self.passes.len() {
            bail!(
                "gpu-source-effect-param-slot-invalid: requested {slot}, next is {}",
                self.passes.len()
            );
        }
        if slot == self.passes.len() {
            self.passes.push(EffectPassSlot {
                params: self.device.create_buffer(&wgpu::BufferDescriptor {
                    label: Some("bcut.source-effect.params"),
                    size: PARAMS_SIZE,
                    usage: wgpu::BufferUsages::UNIFORM | wgpu::BufferUsages::COPY_DST,
                    mapped_at_creation: false,
                }),
                source_key: String::new(),
                source_generation: 0,
                bind_group: None,
            });
        }
        Ok(())
    }
}

// `render_raster::naga` 只随 `wgsl-validate` 转出，只开 `gpu-webgpu` 时没有。
#[cfg(all(test, any(feature = "gpu", feature = "gpu-webgl")))]
mod tests {
    use super::*;

    #[test]
    fn source_effect_shader_validates_and_translates_to_webgl2() {
        let module = render_raster::validate_wgsl(SHADER).expect("source effect WGSL must validate");
        let info = render_raster::naga::valid::Validator::new(
            render_raster::naga::valid::ValidationFlags::all(),
            render_raster::naga::valid::Capabilities::default(),
        )
        .validate(&module)
        .expect("source effect WGSL must pass naga validation");
        for (stage, entry_point) in [
            (render_raster::naga::ShaderStage::Vertex, "vertex_main"),
            (render_raster::naga::ShaderStage::Fragment, "fragment_main"),
        ] {
            let options = render_raster::naga::back::glsl::Options {
                version: render_raster::naga::back::glsl::Version::Embedded {
                    version: 300,
                    is_webgl: true,
                },
                ..Default::default()
            };
            let pipeline_options = render_raster::naga::back::glsl::PipelineOptions {
                shader_stage: stage,
                entry_point: entry_point.to_owned(),
                multiview: None,
            };
            let mut output = String::new();
            let mut writer = render_raster::naga::back::glsl::Writer::new(
                &mut output,
                &module,
                &info,
                &options,
                &pipeline_options,
                render_raster::naga::proc::BoundsCheckPolicies::default(),
            )
            .expect("source effect shader must create WebGL2 writer");
            writer.write().expect("source effect shader must translate");
            assert!(output.contains("#version 300 es"));
        }
    }
}
