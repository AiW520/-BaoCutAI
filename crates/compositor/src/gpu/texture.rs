use std::collections::HashMap;

use anyhow::{Result, bail};
use timeline_render::{TextureBackground, TextureFit, TextureMaskShape, TextureNode};

const SOURCE_FORMAT: wgpu::TextureFormat = wgpu::TextureFormat::Rgba8Unorm;
const TEXTURE_PARAMS_SIZE: u64 = 128;

const SHADER: &str = r#"
struct TextureParams {
    matrix: vec4f,
    translate_rect: vec4f,
    sizes: vec4f,
    source: vec4f,
    flags: vec4f,
    color_adjust: vec4f,
    advanced_color: vec4f,
    // contain 留边的不透明底色（预乘 RGBA）。`flags.y > 0.5` 时生效；黑底
    // 恒为 (0, 0, 0, 1)，与加入这一槽之前逐位相同。
    background_color: vec4f,
}

@group(0) @binding(0) var source_texture: texture_2d<f32>;
@group(0) @binding(1) var source_sampler: sampler;
@group(0) @binding(2) var<uniform> params: TextureParams;

struct VertexOut {
    @builtin(position) position: vec4f,
    @location(0) local: vec2f,
}

@vertex
fn vertex_main(@builtin(vertex_index) index: u32) -> VertexOut {
    var corners = array<vec2f, 6>(
        vec2f(0.0, 0.0), vec2f(1.0, 0.0), vec2f(0.0, 1.0),
        vec2f(0.0, 1.0), vec2f(1.0, 0.0), vec2f(1.0, 1.0),
    );
    let local = corners[index];
    let pixel = params.translate_rect.zw + local * params.sizes.xy;
    let canvas = vec2f(
        params.matrix.x * pixel.x + params.matrix.z * pixel.y + params.translate_rect.x,
        params.matrix.y * pixel.x + params.matrix.w * pixel.y + params.translate_rect.y,
    );
    var out: VertexOut;
    out.position = vec4f(
        canvas.x / params.sizes.z * 2.0 - 1.0,
        1.0 - canvas.y / params.sizes.w * 2.0,
        0.0,
        1.0,
    );
    out.local = local;
    return out;
}

fn mask_coverage(local: vec2f) -> f32 {
    let radius = min(params.source.w, min(params.sizes.x, params.sizes.y) * 0.5);
    let ellipse = params.flags.z > 0.5;
    if radius <= 0.0 && !ellipse {
        return 1.0;
    }
    let point = local * params.sizes.xy;
    let half_size = params.sizes.xy * 0.5;
    var distance: f32;
    if ellipse {
        let radii = max(half_size, vec2f(0.5));
        distance = (length((point - half_size) / radii) - 1.0) * min(radii.x, radii.y);
    } else {
        let q = abs(point - half_size) - (half_size - vec2f(radius));
        distance = length(max(q, vec2f(0.0))) + min(max(q.x, q.y), 0.0) - radius;
    }
    // `mask.shape@1` CPU reference: softness = 1 + feather（局部像素），
    // coverage = clamp(0.5 - signedDistance / softness, 0, 1)。遮罩先于仿射，
    // 因此不能用屏幕导数重解释羽化宽度。
    let softness = max(1.0 + params.flags.w, 1.0);
    return clamp(0.5 - distance / softness, 0.0, 1.0);
}

fn reveal_coverage(local: vec2f) -> f32 {
    // `mask.progress@1` CPU reference：boundary = reveal × localWidth，
    // coverage = clamp(boundary - integerPixelX, 0, 1)。用局部坐标求值，
    // 保证擦除先于元素仿射，旋转/缩放不会改变 reveal 的方向与宽度口径。
    let pixel_x = floor(local.x * params.sizes.x);
    let horizontal = clamp(params.color_adjust.z * params.sizes.x - pixel_x, 0.0, 1.0);
    let half_size = params.sizes.xy * 0.5;
    let distance = length(local * params.sizes.xy - half_size);
    let circular = clamp(length(half_size) * params.color_adjust.w - distance + 0.5, 0.0, 1.0);
    return horizontal * circular;
}

fn quantize_unpremultiplied(rgb: vec3f, alpha: f32) -> vec3f {
    // CPU reference 每个 filter 都把结果重新预乘、round 到 RGBA8；下一个 filter
    // 再反预乘。把这个边界留在 shader 里，串联颜色效果不会因只在最终 target
    // 量化而累计出平台差异。
    let scale = alpha * 255.0;
    return round(clamp(rgb, vec3f(0.0), vec3f(1.0)) * scale) / scale;
}

fn adjusted_color(color: vec4f) -> vec4f {
    if color.a <= 0.0 {
        return color;
    }
    var rgb = color.rgb / color.a;
    let gray = dot(rgb, vec3f(0.2126, 0.7152, 0.0722));
    rgb = clamp(
        rgb + (vec3f(gray) - rgb) * params.color_adjust.x + vec3f(params.color_adjust.y),
        vec3f(0.0),
        vec3f(1.0),
    );
    if params.color_adjust.x > 0.0 || params.color_adjust.y != 0.0 {
        rgb = quantize_unpremultiplied(rgb, color.a);
    }
    // 与 Timeline `lower_element_effects` / CPU reference 保持固定顺序：
    // exposure brightness → contrast → saturation → hueRotate。每步 clamp 模拟
    // CPU 每个 filter 的 u8 边界；GPU 保留浮点精度，只在目标写出时量化。
    rgb = clamp(rgb + vec3f(params.advanced_color.x), vec3f(0.0), vec3f(1.0));
    if params.advanced_color.x != 0.0 {
        rgb = quantize_unpremultiplied(rgb, color.a);
    }
    rgb = clamp(
        (rgb - vec3f(0.5)) * (1.0 + params.advanced_color.y) + vec3f(0.5),
        vec3f(0.0),
        vec3f(1.0),
    );
    if params.advanced_color.y != 0.0 {
        rgb = quantize_unpremultiplied(rgb, color.a);
    }
    let saturation_gray = dot(rgb, vec3f(0.2126, 0.7152, 0.0722));
    rgb = clamp(
        vec3f(saturation_gray) + (rgb - vec3f(saturation_gray)) * params.advanced_color.z,
        vec3f(0.0),
        vec3f(1.0),
    );
    if params.advanced_color.z != 1.0 {
        rgb = quantize_unpremultiplied(rgb, color.a);
    }
    let radians = params.advanced_color.w * 0.017453292519943295;
    let hue_sin = sin(radians);
    let hue_cos = cos(radians);
    let hue_rgb = vec3f(
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
    rgb = clamp(hue_rgb, vec3f(0.0), vec3f(1.0));
    if params.advanced_color.w != 0.0 {
        rgb = quantize_unpremultiplied(rgb, color.a);
    }
    return vec4f(rgb * color.a, color.a);
}

@fragment
fn fragment_main(input: VertexOut) -> @location(0) vec4f {
    let source_aspect = params.source.x / params.source.y;
    let destination_aspect = params.sizes.x / params.sizes.y;
    var uv = input.local;
    var inside = true;
    if params.flags.x < 0.5 {
        // cover：裁源，不改元素盒。
        if source_aspect > destination_aspect {
            let visible = destination_aspect / source_aspect;
            uv.x = 0.5 + (uv.x - 0.5) * visible;
        } else {
            let visible = source_aspect / destination_aspect;
            uv.y = 0.5 + (uv.y - 0.5) * visible;
        }
    } else {
        // contain：完整源图落在元素盒中心，盒外按冻结的 background 处理。
        if source_aspect > destination_aspect {
            let content = destination_aspect / source_aspect;
            inside = uv.y >= (1.0 - content) * 0.5 && uv.y <= (1.0 + content) * 0.5;
            uv.y = 0.5 + (uv.y - 0.5) / content;
        } else {
            let content = source_aspect / destination_aspect;
            inside = uv.x >= (1.0 - content) * 0.5 && uv.x <= (1.0 + content) * 0.5;
            uv.x = 0.5 + (uv.x - 0.5) / content;
        }
    }
    // WebGPU 的 implicit-derivative sampler 必须处在 uniform control flow。
    // contain 留边也先采一次（clamp-to-edge），再在普通分支里丢弃结果；否则
    // Chrome 会拒绝整份 shader module，而 native Metal 不一定提前报这条。
    var color = adjusted_color(textureSample(source_texture, source_sampler, uv));
    if !inside {
        color = select(vec4f(0.0), params.background_color, params.flags.y > 0.5);
    }
    // copyExternalImageToTexture / write_texture 都按预乘字节注入；整体 opacity
    // 必须同时乘 RGB 与 A，之后交 PREMULTIPLIED_ALPHA_BLENDING。
    return color * (
        params.source.z * mask_coverage(input.local) * reveal_coverage(input.local)
    );
}
"#;

pub(super) struct TextureRenderer {
    device: wgpu::Device,
    queue: wgpu::Queue,
    bind_layout: wgpu::BindGroupLayout,
    pipeline_layout: wgpu::PipelineLayout,
    module: wgpu::ShaderModule,
    sampler: wgpu::Sampler,
    pipelines: HashMap<wgpu::TextureFormat, wgpu::RenderPipeline>,
    sources: HashMap<String, TextureSource>,
    slots: Vec<TextureSlot>,
    next_generation: u64,
    binding_rebuilds: u64,
}

struct TextureSource {
    texture: wgpu::Texture,
    view: wgpu::TextureView,
    width: u32,
    height: u32,
    generation: u64,
}

struct TextureSlot {
    key: String,
    generation: u64,
    params: wgpu::Buffer,
    bind_group: wgpu::BindGroup,
}

impl TextureRenderer {
    pub fn new(device: wgpu::Device, queue: wgpu::Queue) -> Self {
        let bind_layout = device.create_bind_group_layout(&wgpu::BindGroupLayoutDescriptor {
            label: Some("bcut.texture.bind-layout"),
            entries: &[
                wgpu::BindGroupLayoutEntry {
                    binding: 0,
                    visibility: wgpu::ShaderStages::FRAGMENT,
                    ty: wgpu::BindingType::Texture {
                        sample_type: wgpu::TextureSampleType::Float { filterable: true },
                        view_dimension: wgpu::TextureViewDimension::D2,
                        multisampled: false,
                    },
                    count: None,
                },
                wgpu::BindGroupLayoutEntry {
                    binding: 1,
                    visibility: wgpu::ShaderStages::FRAGMENT,
                    ty: wgpu::BindingType::Sampler(wgpu::SamplerBindingType::Filtering),
                    count: None,
                },
                wgpu::BindGroupLayoutEntry {
                    binding: 2,
                    visibility: wgpu::ShaderStages::VERTEX_FRAGMENT,
                    ty: wgpu::BindingType::Buffer {
                        ty: wgpu::BufferBindingType::Uniform,
                        has_dynamic_offset: false,
                        min_binding_size: None,
                    },
                    count: None,
                },
            ],
        });
        let pipeline_layout = device.create_pipeline_layout(&wgpu::PipelineLayoutDescriptor {
            label: Some("bcut.texture.pipeline-layout"),
            bind_group_layouts: &[Some(&bind_layout)],
            immediate_size: 0,
        });
        let module = device.create_shader_module(wgpu::ShaderModuleDescriptor {
            label: Some("bcut.texture.wgsl"),
            source: wgpu::ShaderSource::Wgsl(SHADER.into()),
        });
        let sampler = device.create_sampler(&wgpu::SamplerDescriptor {
            label: Some("bcut.texture.sampler"),
            address_mode_u: wgpu::AddressMode::ClampToEdge,
            address_mode_v: wgpu::AddressMode::ClampToEdge,
            mag_filter: wgpu::FilterMode::Linear,
            min_filter: wgpu::FilterMode::Linear,
            ..Default::default()
        });
        Self {
            device,
            queue,
            bind_layout,
            pipeline_layout,
            module,
            sampler,
            pipelines: HashMap::new(),
            sources: HashMap::new(),
            slots: Vec::new(),
            next_generation: 1,
            binding_rebuilds: 0,
        }
    }

    pub fn target(&mut self, key: &str, width: u32, height: u32) -> Result<&wgpu::Texture> {
        if key.is_empty() || width == 0 || height == 0 {
            bail!("gpu-texture-source-invalid: {key:?} {width}x{height}");
        }
        let replace = self
            .sources
            .get(key)
            .is_none_or(|source| source.width != width || source.height != height);
        if replace {
            let generation = self.next_generation;
            self.next_generation = self.next_generation.wrapping_add(1).max(1);
            let texture = self.device.create_texture(&wgpu::TextureDescriptor {
                label: Some("bcut.texture.external"),
                size: wgpu::Extent3d {
                    width,
                    height,
                    depth_or_array_layers: 1,
                },
                mip_level_count: 1,
                sample_count: 1,
                dimension: wgpu::TextureDimension::D2,
                format: SOURCE_FORMAT,
                // WebGPU/WebGL 的 external-image copy 都要求目标同时声明
                // `COPY_DST | RENDER_ATTACHMENT`；后者虽不被本 renderer 直接当
                // attachment 使用，缺席时浏览器会让整次 command submission 无效。
                usage: wgpu::TextureUsages::COPY_DST | wgpu::TextureUsages::RENDER_ATTACHMENT | wgpu::TextureUsages::TEXTURE_BINDING,
                view_formats: &[],
            });
            let view = texture.create_view(&wgpu::TextureViewDescriptor::default());
            self.sources.insert(
                key.to_owned(),
                TextureSource {
                    texture,
                    view,
                    width,
                    height,
                    generation,
                },
            );
        }
        Ok(&self.sources.get(key).expect("刚插入纹理源").texture)
    }

    pub fn install(&mut self, key: &str, texture: wgpu::Texture, descriptor: super::ExternalTextureDescriptor) -> Result<()> {
        if key.is_empty() || descriptor.width == 0 || descriptor.height == 0 {
            bail!("gpu-external-texture-invalid: {key:?} {}x{}", descriptor.width, descriptor.height);
        }
        if !descriptor.usage.contains(wgpu::TextureUsages::TEXTURE_BINDING) {
            bail!("gpu-external-texture-not-sampleable: {key:?}");
        }
        if texture.width() != descriptor.width
            || texture.height() != descriptor.height
            || texture.format() != descriptor.format
            || texture.usage() != descriptor.usage
        {
            bail!(
                "gpu-external-texture-descriptor-mismatch: {key:?} expected={}x{} {:?} {:?} actual={}x{} {:?} {:?}",
                descriptor.width,
                descriptor.height,
                descriptor.format,
                descriptor.usage,
                texture.width(),
                texture.height(),
                texture.format(),
                texture.usage()
            );
        }
        let generation = self.next_generation;
        self.next_generation = self.next_generation.wrapping_add(1).max(1);
        let view = texture.create_view(&wgpu::TextureViewDescriptor::default());
        self.sources.insert(
            key.to_owned(),
            TextureSource {
                texture,
                view,
                width: descriptor.width,
                height: descriptor.height,
                generation,
            },
        );
        Ok(())
    }

    pub fn remove(&mut self, key: &str) {
        self.sources.remove(key);
        // 对应 slot 的 bind group 仍持有旧 texture view；下一帧按实际节点数截断，
        // 同 key 再注册时 generation 不同，也会在复用前重建。
    }

    pub fn source_view(&self, node: &TextureNode) -> Result<(String, u64, wgpu::TextureView)> {
        let source = self
            .sources
            .get(&node.texture)
            .ok_or_else(|| anyhow::anyhow!("gpu-texture-source-missing: {}", node.texture))?;
        if source.width != node.source_width || source.height != node.source_height {
            bail!(
                "gpu-texture-source-size-mismatch: {} scene={}x{} uploaded={}x{}",
                node.texture,
                node.source_width,
                node.source_height,
                source.width,
                source.height
            );
        }
        Ok((node.texture.clone(), source.generation, source.view.clone()))
    }

    #[allow(clippy::too_many_arguments)]
    pub fn encode_to_view(
        &mut self,
        slot: usize,
        node: &TextureNode,
        sample_brightness: f32,
        view: &wgpu::TextureView,
        width: u32,
        height: u32,
        format: wgpu::TextureFormat,
        clear: bool,
        encoder: &mut wgpu::CommandEncoder,
    ) -> Result<()> {
        let (_, source_generation, source_view) = self.source_view(node)?;
        self.encode_texture_view_to_view(
            slot,
            node,
            &node.texture,
            source_generation,
            &source_view,
            sample_brightness,
            view,
            width,
            height,
            format,
            clear,
            encoder,
        )
    }

    /// 采样 compositor 自己产出的中间纹理。source blur 的垂直 pass 直接把
    /// 结果 view 交到这里，既不注册成宿主资源，也不经过 CPU 回读。
    #[allow(clippy::too_many_arguments)]
    pub fn encode_texture_view_to_view(
        &mut self,
        slot: usize,
        node: &TextureNode,
        source_key: &str,
        source_generation: u64,
        source_view: &wgpu::TextureView,
        sample_brightness: f32,
        view: &wgpu::TextureView,
        width: u32,
        height: u32,
        format: wgpu::TextureFormat,
        clear: bool,
        encoder: &mut wgpu::CommandEncoder,
    ) -> Result<()> {
        if node.background == TextureBackground::Blur {
            bail!("gpu-texture-blur-background-unprepared");
        }
        self.ensure_slot(slot, source_key, source_generation, source_view)?;
        let background_rgba = match node.background {
            TextureBackground::Color([r, g, b]) => [f32::from(r) / 255.0, f32::from(g) / 255.0, f32::from(b) / 255.0, 1.0],
            _ => [0.0, 0.0, 0.0, 1.0],
        };
        let mut bytes = Vec::with_capacity(TEXTURE_PARAMS_SIZE as usize);
        let [a, b, c, d, tx, ty] = node.transform;
        for value in [
            a,
            b,
            c,
            d,
            tx,
            ty,
            node.rect[0],
            node.rect[1],
            node.rect[2],
            node.rect[3],
            width as f32,
            height as f32,
            node.source_width as f32,
            node.source_height as f32,
            node.opacity,
            node.radius,
            match node.fit {
                TextureFit::Cover => 0.0,
                TextureFit::Contain => 1.0,
            },
            match node.background {
                TextureBackground::Transparent => 0.0,
                TextureBackground::Black | TextureBackground::Color(_) => 1.0,
                TextureBackground::Blur => unreachable!("blur background is prepared above"),
            },
            match node.mask_shape {
                TextureMaskShape::RoundedRect => 0.0,
                TextureMaskShape::Ellipse => 1.0,
            },
            node.mask_feather,
            0.0,
            sample_brightness,
            node.reveal,
            node.iris,
            0.0,
            0.0,
            1.0,
            0.0,
            background_rgba[0],
            background_rgba[1],
            background_rgba[2],
            background_rgba[3],
        ] {
            bytes.extend_from_slice(&value.to_ne_bytes());
        }
        debug_assert_eq!(bytes.len(), TEXTURE_PARAMS_SIZE as usize);
        self.queue.write_buffer(&self.slots[slot].params, 0, &bytes);
        let pipeline = self.pipeline(format);
        let texture_slot = &self.slots[slot];
        let mut pass = encoder.begin_render_pass(&wgpu::RenderPassDescriptor {
            label: Some("bcut.texture.pass"),
            color_attachments: &[Some(wgpu::RenderPassColorAttachment {
                view,
                depth_slice: None,
                resolve_target: None,
                ops: wgpu::Operations {
                    load: if clear {
                        wgpu::LoadOp::Clear(wgpu::Color::TRANSPARENT)
                    } else {
                        wgpu::LoadOp::Load
                    },
                    store: wgpu::StoreOp::Store,
                },
            })],
            depth_stencil_attachment: None,
            timestamp_writes: None,
            occlusion_query_set: None,
            multiview_mask: None,
        });
        pass.set_pipeline(&pipeline);
        pass.set_bind_group(0, &texture_slot.bind_group, &[]);
        pass.draw(0..6, 0..1);
        Ok(())
    }

    pub fn finish_frame(&mut self, used_slots: usize) {
        self.slots.truncate(used_slots);
    }

    pub fn binding_rebuilds(&self) -> u64 {
        self.binding_rebuilds
    }

    fn ensure_slot(&mut self, slot: usize, key: &str, generation: u64, source_view: &wgpu::TextureView) -> Result<()> {
        if slot > self.slots.len() {
            bail!("gpu-texture-slot-invalid: requested {slot}, next is {}", self.slots.len());
        }
        let rebuild = slot == self.slots.len() || self.slots[slot].key != key || self.slots[slot].generation != generation;
        if !rebuild {
            return Ok(());
        }
        let params = if slot < self.slots.len() {
            self.slots[slot].params.clone()
        } else {
            self.device.create_buffer(&wgpu::BufferDescriptor {
                label: Some("bcut.texture.params"),
                size: TEXTURE_PARAMS_SIZE,
                usage: wgpu::BufferUsages::UNIFORM | wgpu::BufferUsages::COPY_DST,
                mapped_at_creation: false,
            })
        };
        let bind_group = self.device.create_bind_group(&wgpu::BindGroupDescriptor {
            label: Some("bcut.texture.bind-group"),
            layout: &self.bind_layout,
            entries: &[
                wgpu::BindGroupEntry {
                    binding: 0,
                    resource: wgpu::BindingResource::TextureView(source_view),
                },
                wgpu::BindGroupEntry {
                    binding: 1,
                    resource: wgpu::BindingResource::Sampler(&self.sampler),
                },
                wgpu::BindGroupEntry {
                    binding: 2,
                    resource: params.as_entire_binding(),
                },
            ],
        });
        let next = TextureSlot {
            key: key.to_owned(),
            generation,
            params,
            bind_group,
        };
        if slot == self.slots.len() {
            self.slots.push(next);
        } else {
            self.slots[slot] = next;
        }
        self.binding_rebuilds += 1;
        Ok(())
    }

    fn pipeline(&mut self, format: wgpu::TextureFormat) -> wgpu::RenderPipeline {
        if let Some(pipeline) = self.pipelines.get(&format) {
            return pipeline.clone();
        }
        let pipeline = self.device.create_render_pipeline(&wgpu::RenderPipelineDescriptor {
            label: Some("bcut.texture.pipeline"),
            layout: Some(&self.pipeline_layout),
            vertex: wgpu::VertexState {
                module: &self.module,
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
                module: &self.module,
                entry_point: Some("fragment_main"),
                compilation_options: Default::default(),
                targets: &[Some(wgpu::ColorTargetState {
                    format,
                    blend: Some(wgpu::BlendState::PREMULTIPLIED_ALPHA_BLENDING),
                    write_mask: wgpu::ColorWrites::ALL,
                })],
            }),
            multiview_mask: None,
            cache: None,
        });
        self.pipelines.insert(format, pipeline.clone());
        pipeline
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn shader_keeps_fit_mask_and_premultiplied_blending_explicit() {
        assert!(SHADER.contains("copyExternalImageToTexture"));
        assert!(SHADER.contains("source_aspect > destination_aspect"));
        assert!(SHADER.contains("mask_coverage"));
        assert!(SHADER.contains("let ellipse = params.flags.z > 0.5"));
        assert!(SHADER.contains("1.0 + params.flags.w"));
        assert!(SHADER.contains("dot(rgb, vec3f(0.2126, 0.7152, 0.0722))"));
        assert!(SHADER.contains("params.color_adjust.y"));
        assert!(SHADER.contains("params.advanced_color.x"));
        assert!(SHADER.contains("params.advanced_color.y"));
        assert!(SHADER.contains("params.advanced_color.z"));
        assert!(SHADER.contains("params.advanced_color.w"));
        assert!(SHADER.contains("params.color_adjust.z * params.sizes.x"));
        assert!(SHADER.contains("params.source.z * mask_coverage(input.local) * reveal_coverage(input.local)"));
        assert!(
            SHADER.find("textureSample").unwrap() < SHADER.find("if !inside").unwrap(),
            "implicit-derivative sampling must stay outside non-uniform contain control flow"
        );
    }

    // `render_raster::naga` 只随 `wgsl-validate` 转出，只开 `gpu-webgpu` 时没有。
    #[cfg(any(feature = "gpu", feature = "gpu-webgl"))]
    #[test]
    fn texture_shader_translates_to_webgl2_glsl_es_300() {
        let module = render_raster::validate_wgsl(SHADER).expect("texture WGSL must validate");
        let info = render_raster::naga::valid::Validator::new(
            render_raster::naga::valid::ValidationFlags::all(),
            render_raster::naga::valid::Capabilities::default(),
        )
        .validate(&module)
        .expect("texture WGSL must pass naga validation");

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
            .expect("texture shader must create a WebGL2 GLSL writer");
            writer.write().expect("texture shader must translate to WebGL2 GLSL ES 300");
            assert!(output.contains("#version 300 es"));
        }
    }
}
