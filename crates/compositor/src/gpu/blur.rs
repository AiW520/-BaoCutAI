use std::collections::HashMap;

use anyhow::{Result, bail};
use timeline_render::{SCENE_BLUR_RADIUS_LIMIT, SceneCompositeMode};

const INTERMEDIATE_FORMAT: wgpu::TextureFormat = wgpu::TextureFormat::Rgba8Unorm;

const SHADER: &str = r#"
struct BlurParams {
    width: u32,
    height: u32,
    radius: u32,
    reveal: f32,
}

@group(0) @binding(0) var source: texture_2d<f32>;
@group(0) @binding(1) var<uniform> params: BlurParams;

@vertex
fn vertex_main(@builtin(vertex_index) index: u32) -> @builtin(position) vec4f {
    var positions = array<vec2f, 3>(
        vec2f(-1.0, -1.0),
        vec2f(3.0, -1.0),
        vec2f(-1.0, 3.0),
    );
    return vec4f(positions[index], 0.0, 1.0);
}

fn box_sample(position: vec2i, horizontal: bool) -> vec4f {
    var sum = vec4f(0.0);
    var count = 0u;
    let radius = i32(params.radius);
    var offset = -radius;
    loop {
        if offset > radius {
            break;
        }
        var sample_position = position;
        if horizontal {
            sample_position.x += offset;
        } else {
            sample_position.y += offset;
        }
        if sample_position.x >= 0 && sample_position.y >= 0
            && sample_position.x < i32(params.width)
            && sample_position.y < i32(params.height) {
            sum += textureLoad(source, sample_position, 0);
            count += 1u;
        }
        offset += 1;
    }
    return sum / f32(max(count, 1u));
}

@fragment
fn horizontal_main(@builtin(position) position: vec4f) -> @location(0) vec4f {
    return box_sample(vec2i(position.xy), true);
}

fn reveal_coverage(position: vec4f) -> f32 {
    // Fragment position is at the pixel center. CPU mask.progress@1 uses the
    // integer pixel x, so floor restores the same sub-pixel boundary rule.
    let x = floor(position.x);
    return clamp(params.reveal * f32(params.width) - x, 0.0, 1.0);
}

@fragment
fn vertical_main(@builtin(position) position: vec4f) -> @location(0) vec4f {
    return box_sample(vec2i(position.xy), false) * reveal_coverage(position);
}

@fragment
fn copy_main(@builtin(position) position: vec4f) -> @location(0) vec4f {
    return textureLoad(source, vec2i(position.xy), 0) * reveal_coverage(position);
}
"#;

pub(super) struct BlurRenderer {
    device: wgpu::Device,
    queue: wgpu::Queue,
    bind_layout: wgpu::BindGroupLayout,
    pipeline_layout: wgpu::PipelineLayout,
    module: wgpu::ShaderModule,
    horizontal_pipeline: wgpu::RenderPipeline,
    vertical_pipelines: HashMap<(wgpu::TextureFormat, SceneCompositeMode), wgpu::RenderPipeline>,
    copy_pipelines: HashMap<(wgpu::TextureFormat, SceneCompositeMode), wgpu::RenderPipeline>,
    slots: Vec<BlurSlot>,
    next_generation: u64,
    binding_rebuilds: u64,
}

struct BlurSlot {
    width: u32,
    height: u32,
    _source: wgpu::Texture,
    source_view: wgpu::TextureView,
    _horizontal: wgpu::Texture,
    horizontal_view: wgpu::TextureView,
    _result: wgpu::Texture,
    result_view: wgpu::TextureView,
    generation: u64,
    params: wgpu::Buffer,
    source_bind_group: wgpu::BindGroup,
    horizontal_bind_group: wgpu::BindGroup,
    external_source_key: String,
    external_source_generation: u64,
    external_source_bind_group: Option<wgpu::BindGroup>,
}

impl BlurRenderer {
    pub fn new(device: wgpu::Device, queue: wgpu::Queue) -> Self {
        let bind_layout = device.create_bind_group_layout(&wgpu::BindGroupLayoutDescriptor {
            label: Some("bcut.blur.bind-layout"),
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
        let pipeline_layout = device.create_pipeline_layout(&wgpu::PipelineLayoutDescriptor {
            label: Some("bcut.blur.pipeline-layout"),
            bind_group_layouts: &[Some(&bind_layout)],
            immediate_size: 0,
        });
        let module = device.create_shader_module(wgpu::ShaderModuleDescriptor {
            label: Some("bcut.blur.wgsl"),
            source: wgpu::ShaderSource::Wgsl(SHADER.into()),
        });
        let horizontal_pipeline = pipeline(&device, &pipeline_layout, &module, "horizontal_main", INTERMEDIATE_FORMAT, None);
        Self {
            device,
            queue,
            bind_layout,
            pipeline_layout,
            module,
            horizontal_pipeline,
            vertical_pipelines: HashMap::new(),
            copy_pipelines: HashMap::new(),
            slots: Vec::new(),
            next_generation: 1,
            binding_rebuilds: 0,
        }
    }

    pub fn layer_view(&mut self, slot: usize, width: u32, height: u32) -> Result<wgpu::TextureView> {
        Ok(self.layer_view_with_generation(slot, width, height)?.0)
    }

    /// 返回可写的透明中间层及其稳定 generation。contain 模糊留边先在这里
    /// 合成 cover 背景与清晰 contain 前景，再把同一 view 当作最终 texture
    /// source；尺寸不变时 generation 不变，下游 bind group 可跨帧复用。
    pub fn layer_view_with_generation(&mut self, slot: usize, width: u32, height: u32) -> Result<(wgpu::TextureView, u64)> {
        self.ensure_slot(slot, width, height)?;
        let blur = &self.slots[slot];
        Ok((blur.source_view.clone(), blur.generation))
    }

    /// 同一 blur slot 的垂直 pass 输出。source blur 用它把媒体天然尺寸的预处理
    /// 结果留在 GPU，再交给最终 texture pass 采样；generation 只在纹理重建时变，
    /// 让下游 bind group 能跨帧稳定复用。
    pub fn result_view(&mut self, slot: usize, width: u32, height: u32) -> Result<(wgpu::TextureView, u64)> {
        self.ensure_slot(slot, width, height)?;
        let blur = &self.slots[slot];
        Ok((blur.result_view.clone(), blur.generation))
    }

    #[allow(clippy::too_many_arguments)]
    pub fn encode_to_view(
        &mut self,
        slot: usize,
        radius: u32,
        view: &wgpu::TextureView,
        width: u32,
        height: u32,
        format: wgpu::TextureFormat,
        clear: bool,
        composite: SceneCompositeMode,
        encoder: &mut wgpu::CommandEncoder,
    ) -> Result<()> {
        self.encode_to_view_with_reveal(slot, radius, 1.0, view, width, height, format, clear, composite, encoder)
    }

    /// 对任意 compositor 中间纹理执行两趟 box blur。source effect 链用它在
    /// preset blur 与显式 blur 之间保持原始顺序，不必先复制到 `layer_view`。
    #[allow(clippy::too_many_arguments)]
    pub fn encode_source_to_view(
        &mut self,
        slot: usize,
        radius: u32,
        source_key: &str,
        source_generation: u64,
        source_view: &wgpu::TextureView,
        view: &wgpu::TextureView,
        width: u32,
        height: u32,
        encoder: &mut wgpu::CommandEncoder,
    ) -> Result<()> {
        self.ensure_slot(slot, width, height)?;
        let radius = radius.min(SCENE_BLUR_RADIUS_LIMIT);
        let mut bytes = Vec::with_capacity(16);
        for value in [width, height, radius] {
            bytes.extend_from_slice(&value.to_ne_bytes());
        }
        bytes.extend_from_slice(&1.0f32.to_ne_bytes());
        self.queue.write_buffer(&self.slots[slot].params, 0, &bytes);
        let needs_bind_group = self.slots[slot].external_source_key != source_key
            || self.slots[slot].external_source_generation != source_generation
            || self.slots[slot].external_source_bind_group.is_none();
        if needs_bind_group {
            let source_bind_group = bind_group(
                &self.device,
                &self.bind_layout,
                source_view,
                &self.slots[slot].params,
                "external-source",
            );
            let blur = &mut self.slots[slot];
            source_key.clone_into(&mut blur.external_source_key);
            blur.external_source_generation = source_generation;
            blur.external_source_bind_group = Some(source_bind_group);
            self.binding_rebuilds += 1;
        }
        let vertical_pipeline = self.vertical_pipeline(INTERMEDIATE_FORMAT, SceneCompositeMode::Normal);
        let blur = &self.slots[slot];
        {
            let mut pass = encoder.begin_render_pass(&wgpu::RenderPassDescriptor {
                label: Some("bcut.blur.external-horizontal.pass"),
                color_attachments: &[Some(wgpu::RenderPassColorAttachment {
                    view: &blur.horizontal_view,
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
            pass.set_pipeline(&self.horizontal_pipeline);
            pass.set_bind_group(
                0,
                blur.external_source_bind_group
                    .as_ref()
                    .expect("external blur source bind group 已准备"),
                &[],
            );
            pass.draw(0..3, 0..1);
        }
        {
            let mut pass = encoder.begin_render_pass(&wgpu::RenderPassDescriptor {
                label: Some("bcut.blur.external-vertical.pass"),
                color_attachments: &[Some(wgpu::RenderPassColorAttachment {
                    view,
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
            pass.set_pipeline(&vertical_pipeline);
            pass.set_bind_group(0, &blur.horizontal_bind_group, &[]);
            pass.draw(0..3, 0..1);
        }
        Ok(())
    }

    #[allow(clippy::too_many_arguments)]
    pub fn encode_to_view_with_reveal(
        &mut self,
        slot: usize,
        radius: u32,
        reveal: f32,
        view: &wgpu::TextureView,
        width: u32,
        height: u32,
        format: wgpu::TextureFormat,
        clear: bool,
        composite: SceneCompositeMode,
        encoder: &mut wgpu::CommandEncoder,
    ) -> Result<()> {
        self.ensure_slot(slot, width, height)?;
        let radius = radius.min(SCENE_BLUR_RADIUS_LIMIT);
        let mut bytes = Vec::with_capacity(16);
        for value in [width, height, radius] {
            bytes.extend_from_slice(&value.to_ne_bytes());
        }
        bytes.extend_from_slice(&reveal.clamp(0.0, 1.0).to_ne_bytes());
        self.queue.write_buffer(&self.slots[slot].params, 0, &bytes);
        let vertical_pipeline = self.vertical_pipeline(format, composite);
        let blur = &self.slots[slot];
        {
            let mut pass = encoder.begin_render_pass(&wgpu::RenderPassDescriptor {
                label: Some("bcut.blur.horizontal.pass"),
                color_attachments: &[Some(wgpu::RenderPassColorAttachment {
                    view: &blur.horizontal_view,
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
            pass.set_pipeline(&self.horizontal_pipeline);
            pass.set_bind_group(0, &blur.source_bind_group, &[]);
            pass.draw(0..3, 0..1);
        }
        {
            let mut pass = encoder.begin_render_pass(&wgpu::RenderPassDescriptor {
                label: Some("bcut.blur.vertical-composite.pass"),
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
            pass.set_pipeline(&vertical_pipeline);
            pass.set_bind_group(0, &blur.horizontal_bind_group, &[]);
            pass.draw(0..3, 0..1);
        }
        Ok(())
    }

    /// 把已在 `layer_view` 中按 Normal 画好的完整层一次性合入真实 target。
    /// Screen 只改变固定函数 blend，不读取或复制 target。
    #[allow(clippy::too_many_arguments)]
    pub fn encode_layer_to_view_with_reveal(
        &mut self,
        slot: usize,
        reveal: f32,
        view: &wgpu::TextureView,
        width: u32,
        height: u32,
        format: wgpu::TextureFormat,
        clear: bool,
        composite: SceneCompositeMode,
        encoder: &mut wgpu::CommandEncoder,
    ) -> Result<()> {
        self.ensure_slot(slot, width, height)?;
        let mut bytes = Vec::with_capacity(16);
        for value in [width, height, 0] {
            bytes.extend_from_slice(&value.to_ne_bytes());
        }
        bytes.extend_from_slice(&reveal.clamp(0.0, 1.0).to_ne_bytes());
        self.queue.write_buffer(&self.slots[slot].params, 0, &bytes);
        let pipeline = self.copy_pipeline(format, composite);
        let blur = &self.slots[slot];
        let mut pass = encoder.begin_render_pass(&wgpu::RenderPassDescriptor {
            label: Some("bcut.composite-group.pass"),
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
        pass.set_bind_group(0, &blur.source_bind_group, &[]);
        pass.draw(0..3, 0..1);
        Ok(())
    }

    pub fn finish_frame(&mut self, used_slots: usize) {
        self.slots.truncate(used_slots);
    }

    pub fn binding_rebuilds(&self) -> u64 {
        self.binding_rebuilds
    }

    fn ensure_slot(&mut self, slot: usize, width: u32, height: u32) -> Result<()> {
        if width == 0 || height == 0 {
            bail!("gpu-blur-size-invalid: {width}x{height}");
        }
        if slot == self.slots.len() {
            let generation = self.take_generation();
            self.slots
                .push(BlurSlot::new(&self.device, &self.bind_layout, width, height, generation));
            self.binding_rebuilds += 1;
        } else if slot > self.slots.len() {
            bail!("gpu-blur-slot-invalid: requested {slot}, next is {}", self.slots.len());
        } else if self.slots[slot].width != width || self.slots[slot].height != height {
            let generation = self.take_generation();
            self.slots[slot] = BlurSlot::new(&self.device, &self.bind_layout, width, height, generation);
            self.binding_rebuilds += 1;
        }
        Ok(())
    }

    fn take_generation(&mut self) -> u64 {
        let generation = self.next_generation;
        self.next_generation = self.next_generation.wrapping_add(1).max(1);
        generation
    }

    fn vertical_pipeline(&mut self, format: wgpu::TextureFormat, composite: SceneCompositeMode) -> wgpu::RenderPipeline {
        let key = (format, composite);
        if let Some(pipeline) = self.vertical_pipelines.get(&key) {
            return pipeline.clone();
        }
        let pipeline = pipeline(
            &self.device,
            &self.pipeline_layout,
            &self.module,
            "vertical_main",
            format,
            Some(super::scene_blend_state(composite)),
        );
        self.vertical_pipelines.insert(key, pipeline.clone());
        pipeline
    }

    fn copy_pipeline(&mut self, format: wgpu::TextureFormat, composite: SceneCompositeMode) -> wgpu::RenderPipeline {
        let key = (format, composite);
        if let Some(pipeline) = self.copy_pipelines.get(&key) {
            return pipeline.clone();
        }
        let pipeline = pipeline(
            &self.device,
            &self.pipeline_layout,
            &self.module,
            "copy_main",
            format,
            Some(super::scene_blend_state(composite)),
        );
        self.copy_pipelines.insert(key, pipeline.clone());
        pipeline
    }
}

impl BlurSlot {
    fn new(device: &wgpu::Device, layout: &wgpu::BindGroupLayout, width: u32, height: u32, generation: u64) -> Self {
        let source = texture(device, width, height, "bcut.blur.source");
        let source_view = source.create_view(&wgpu::TextureViewDescriptor::default());
        let horizontal = texture(device, width, height, "bcut.blur.horizontal");
        let horizontal_view = horizontal.create_view(&wgpu::TextureViewDescriptor::default());
        let result = texture(device, width, height, "bcut.blur.result");
        let result_view = result.create_view(&wgpu::TextureViewDescriptor::default());
        let params = device.create_buffer(&wgpu::BufferDescriptor {
            label: Some("bcut.blur.params"),
            size: 16,
            usage: wgpu::BufferUsages::UNIFORM | wgpu::BufferUsages::COPY_DST,
            mapped_at_creation: false,
        });
        let source_bind_group = bind_group(device, layout, &source_view, &params, "source");
        let horizontal_bind_group = bind_group(device, layout, &horizontal_view, &params, "horizontal");
        Self {
            width,
            height,
            _source: source,
            source_view,
            _horizontal: horizontal,
            horizontal_view,
            _result: result,
            result_view,
            generation,
            params,
            source_bind_group,
            horizontal_bind_group,
            external_source_key: String::new(),
            external_source_generation: 0,
            external_source_bind_group: None,
        }
    }
}

fn texture(device: &wgpu::Device, width: u32, height: u32, label: &str) -> wgpu::Texture {
    device.create_texture(&wgpu::TextureDescriptor {
        label: Some(label),
        size: wgpu::Extent3d {
            width,
            height,
            depth_or_array_layers: 1,
        },
        mip_level_count: 1,
        sample_count: 1,
        dimension: wgpu::TextureDimension::D2,
        format: INTERMEDIATE_FORMAT,
        usage: wgpu::TextureUsages::RENDER_ATTACHMENT | wgpu::TextureUsages::TEXTURE_BINDING,
        view_formats: &[],
    })
}

fn bind_group(
    device: &wgpu::Device,
    layout: &wgpu::BindGroupLayout,
    view: &wgpu::TextureView,
    params: &wgpu::Buffer,
    label: &str,
) -> wgpu::BindGroup {
    device.create_bind_group(&wgpu::BindGroupDescriptor {
        label: Some(&format!("bcut.blur.{label}.bind-group")),
        layout,
        entries: &[
            wgpu::BindGroupEntry {
                binding: 0,
                resource: wgpu::BindingResource::TextureView(view),
            },
            wgpu::BindGroupEntry {
                binding: 1,
                resource: params.as_entire_binding(),
            },
        ],
    })
}

fn pipeline(
    device: &wgpu::Device,
    layout: &wgpu::PipelineLayout,
    module: &wgpu::ShaderModule,
    fragment_entry: &str,
    format: wgpu::TextureFormat,
    blend: Option<wgpu::BlendState>,
) -> wgpu::RenderPipeline {
    device.create_render_pipeline(&wgpu::RenderPipelineDescriptor {
        label: Some("bcut.blur.pipeline"),
        layout: Some(layout),
        vertex: wgpu::VertexState {
            module,
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
            module,
            entry_point: Some(fragment_entry),
            compilation_options: Default::default(),
            targets: &[Some(wgpu::ColorTargetState {
                format,
                blend,
                write_mask: wgpu::ColorWrites::ALL,
            })],
        }),
        multiview_mask: None,
        cache: None,
    })
}

#[cfg(test)]
mod tests {
    use super::SHADER;

    #[test]
    fn blur_shader_keeps_shrinking_edge_divisors_and_no_sampler() {
        assert!(SHADER.contains("count += 1u"));
        assert!(SHADER.contains("sum / f32(max(count, 1u))"));
        assert!(SHADER.contains("textureLoad(source"));
        assert!(SHADER.contains("fn copy_main"));
        assert!(SHADER.contains("params.reveal * f32(params.width)"));
        assert!(SHADER.contains("floor(position.x)"));
        assert!(SHADER.contains("* reveal_coverage(position)"));
        assert!(!SHADER.contains("sampler"));
    }
}
