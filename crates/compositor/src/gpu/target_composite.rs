use std::collections::HashMap;

use anyhow::{Result, bail};
use timeline_render::SceneCompositeMode;

const SHADER: &str = r#"
@group(0) @binding(0) var backdrop: texture_2d<f32>;
@group(0) @binding(1) var source: texture_2d<f32>;

@vertex
fn vertex_main(@builtin(vertex_index) index: u32) -> @builtin(position) vec4f {
    var positions = array<vec2f, 3>(
        vec2f(-1.0, -1.0),
        vec2f(3.0, -1.0),
        vec2f(-1.0, 3.0),
    );
    return vec4f(positions[index], 0.0, 1.0);
}

fn straight(rgb: vec3f, alpha: f32) -> vec3f {
    if alpha > 0.0 {
        return rgb / alpha;
    }
    return vec3f(0.0);
}

fn composite(position: vec2i, exclusion: bool) -> vec4f {
    let backdrop_pixel = textureLoad(backdrop, position, 0);
    let source_pixel = textureLoad(source, position, 0);
    let backdrop_color = straight(backdrop_pixel.rgb, backdrop_pixel.a);
    let source_color = straight(source_pixel.rgb, source_pixel.a);
    var blended = abs(backdrop_color - source_color);
    if exclusion {
        blended = backdrop_color + source_color - 2.0 * backdrop_color * source_color;
    }
    let output_rgb = source_pixel.rgb * (1.0 - backdrop_pixel.a)
        + backdrop_pixel.rgb * (1.0 - source_pixel.a)
        + blended * source_pixel.a * backdrop_pixel.a;
    let output_alpha = source_pixel.a + backdrop_pixel.a
        - source_pixel.a * backdrop_pixel.a;
    return vec4f(output_rgb, output_alpha);
}

@fragment
fn difference_main(@builtin(position) position: vec4f) -> @location(0) vec4f {
    return composite(vec2i(position.xy), false);
}

@fragment
fn exclusion_main(@builtin(position) position: vec4f) -> @location(0) vec4f {
    return composite(vec2i(position.xy), true);
}
"#;

/// 需要真实 backdrop 的 group 合成器。每个稳定 scene 槽持有一张 backdrop
/// 快照和一个 bind group；每帧只在同一个 command encoder 里做 target copy +
/// fullscreen pass，不回读 CPU，也不为稳定尺寸重复创建资源。
pub(super) struct TargetCompositeRenderer {
    device: wgpu::Device,
    bind_layout: wgpu::BindGroupLayout,
    pipeline_layout: wgpu::PipelineLayout,
    module: wgpu::ShaderModule,
    pipelines: HashMap<(wgpu::TextureFormat, SceneCompositeMode), wgpu::RenderPipeline>,
    slots: Vec<TargetCompositeSlot>,
    binding_rebuilds: u64,
}

struct TargetCompositeSlot {
    width: u32,
    height: u32,
    format: wgpu::TextureFormat,
    backdrop: wgpu::Texture,
    _backdrop_view: wgpu::TextureView,
    source_key: (u64, bool),
    bind_group: wgpu::BindGroup,
}

impl TargetCompositeRenderer {
    pub fn new(device: wgpu::Device) -> Self {
        let bind_layout = device.create_bind_group_layout(&wgpu::BindGroupLayoutDescriptor {
            label: Some("bcut.target-composite.bind-layout"),
            entries: &[texture_entry(0), texture_entry(1)],
        });
        let pipeline_layout = device.create_pipeline_layout(&wgpu::PipelineLayoutDescriptor {
            label: Some("bcut.target-composite.pipeline-layout"),
            bind_group_layouts: &[Some(&bind_layout)],
            immediate_size: 0,
        });
        let module = device.create_shader_module(wgpu::ShaderModuleDescriptor {
            label: Some("bcut.target-composite.wgsl"),
            source: wgpu::ShaderSource::Wgsl(SHADER.into()),
        });
        Self {
            device,
            bind_layout,
            pipeline_layout,
            module,
            pipelines: HashMap::new(),
            slots: Vec::new(),
            binding_rebuilds: 0,
        }
    }

    #[allow(clippy::too_many_arguments)]
    pub fn encode(
        &mut self,
        slot: usize,
        mode: SceneCompositeMode,
        target: &wgpu::Texture,
        target_view: &wgpu::TextureView,
        source_view: &wgpu::TextureView,
        source_generation: u64,
        source_is_blurred: bool,
        width: u32,
        height: u32,
        format: wgpu::TextureFormat,
        encoder: &mut wgpu::CommandEncoder,
    ) -> Result<()> {
        if !matches!(mode, SceneCompositeMode::Difference | SceneCompositeMode::Exclusion) {
            bail!("gpu-target-composite-mode-invalid: {mode:?}");
        }
        if !matches!(format, wgpu::TextureFormat::Rgba8Unorm | wgpu::TextureFormat::Bgra8Unorm) {
            bail!("gpu-target-composite-format-unsupported: {format:?}");
        }
        self.ensure_slot(slot, width, height, format, source_view, (source_generation, source_is_blurred))?;
        let pipeline = self.pipeline(format, mode);
        let target_slot = &self.slots[slot];
        encoder.copy_texture_to_texture(
            wgpu::TexelCopyTextureInfo {
                texture: target,
                mip_level: 0,
                origin: wgpu::Origin3d::ZERO,
                aspect: wgpu::TextureAspect::All,
            },
            wgpu::TexelCopyTextureInfo {
                texture: &target_slot.backdrop,
                mip_level: 0,
                origin: wgpu::Origin3d::ZERO,
                aspect: wgpu::TextureAspect::All,
            },
            wgpu::Extent3d {
                width,
                height,
                depth_or_array_layers: 1,
            },
        );
        let mut pass = encoder.begin_render_pass(&wgpu::RenderPassDescriptor {
            label: Some("bcut.target-composite.pass"),
            color_attachments: &[Some(wgpu::RenderPassColorAttachment {
                view: target_view,
                depth_slice: None,
                resolve_target: None,
                ops: wgpu::Operations {
                    load: wgpu::LoadOp::Load,
                    store: wgpu::StoreOp::Store,
                },
            })],
            depth_stencil_attachment: None,
            timestamp_writes: None,
            occlusion_query_set: None,
            multiview_mask: None,
        });
        pass.set_pipeline(&pipeline);
        pass.set_bind_group(0, &target_slot.bind_group, &[]);
        pass.draw(0..3, 0..1);
        Ok(())
    }

    pub fn finish_frame(&mut self, used_slots: usize) {
        self.slots.truncate(used_slots);
    }

    pub fn binding_rebuilds(&self) -> u64 {
        self.binding_rebuilds
    }

    #[allow(clippy::too_many_arguments)]
    fn ensure_slot(
        &mut self,
        slot: usize,
        width: u32,
        height: u32,
        format: wgpu::TextureFormat,
        source_view: &wgpu::TextureView,
        source_key: (u64, bool),
    ) -> Result<()> {
        if width == 0 || height == 0 {
            bail!("gpu-target-composite-size-invalid: {width}x{height}");
        }
        if slot > self.slots.len() {
            bail!("gpu-target-composite-slot-invalid: requested {slot}, next is {}", self.slots.len());
        }
        let replace = self
            .slots
            .get(slot)
            .is_none_or(|entry| entry.width != width || entry.height != height || entry.format != format);
        if replace {
            let backdrop = self.device.create_texture(&wgpu::TextureDescriptor {
                label: Some("bcut.target-composite.backdrop"),
                size: wgpu::Extent3d {
                    width,
                    height,
                    depth_or_array_layers: 1,
                },
                mip_level_count: 1,
                sample_count: 1,
                dimension: wgpu::TextureDimension::D2,
                format,
                usage: wgpu::TextureUsages::COPY_DST | wgpu::TextureUsages::TEXTURE_BINDING,
                view_formats: &[],
            });
            let backdrop_view = backdrop.create_view(&wgpu::TextureViewDescriptor::default());
            let bind_group = bind_group(&self.device, &self.bind_layout, &backdrop_view, source_view);
            let entry = TargetCompositeSlot {
                width,
                height,
                format,
                backdrop,
                _backdrop_view: backdrop_view,
                source_key,
                bind_group,
            };
            if slot == self.slots.len() {
                self.slots.push(entry);
            } else {
                self.slots[slot] = entry;
            }
            self.binding_rebuilds += 1;
        } else if self.slots[slot].source_key != source_key {
            let entry = &mut self.slots[slot];
            entry.bind_group = bind_group(&self.device, &self.bind_layout, &entry._backdrop_view, source_view);
            entry.source_key = source_key;
            self.binding_rebuilds += 1;
        }
        Ok(())
    }

    fn pipeline(&mut self, format: wgpu::TextureFormat, mode: SceneCompositeMode) -> wgpu::RenderPipeline {
        let key = (format, mode);
        if let Some(pipeline) = self.pipelines.get(&key) {
            return pipeline.clone();
        }
        let fragment_entry = match mode {
            SceneCompositeMode::Difference => "difference_main",
            SceneCompositeMode::Exclusion => "exclusion_main",
            SceneCompositeMode::Normal | SceneCompositeMode::Screen => {
                unreachable!("fixed-function composite 不进入 target sampling pipeline")
            }
        };
        let pipeline = self.device.create_render_pipeline(&wgpu::RenderPipelineDescriptor {
            label: Some("bcut.target-composite.pipeline"),
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
                entry_point: Some(fragment_entry),
                compilation_options: Default::default(),
                targets: &[Some(wgpu::ColorTargetState {
                    format,
                    blend: None,
                    write_mask: wgpu::ColorWrites::ALL,
                })],
            }),
            multiview_mask: None,
            cache: None,
        });
        self.pipelines.insert(key, pipeline.clone());
        pipeline
    }
}

fn texture_entry(binding: u32) -> wgpu::BindGroupLayoutEntry {
    wgpu::BindGroupLayoutEntry {
        binding,
        visibility: wgpu::ShaderStages::FRAGMENT,
        ty: wgpu::BindingType::Texture {
            sample_type: wgpu::TextureSampleType::Float { filterable: false },
            view_dimension: wgpu::TextureViewDimension::D2,
            multisampled: false,
        },
        count: None,
    }
}

fn bind_group(
    device: &wgpu::Device,
    layout: &wgpu::BindGroupLayout,
    backdrop: &wgpu::TextureView,
    source: &wgpu::TextureView,
) -> wgpu::BindGroup {
    device.create_bind_group(&wgpu::BindGroupDescriptor {
        label: Some("bcut.target-composite.bind-group"),
        layout,
        entries: &[
            wgpu::BindGroupEntry {
                binding: 0,
                resource: wgpu::BindingResource::TextureView(backdrop),
            },
            wgpu::BindGroupEntry {
                binding: 1,
                resource: wgpu::BindingResource::TextureView(source),
            },
        ],
    })
}

// `render_raster::naga` 只随 `wgsl-validate` 转出，只开 `gpu-webgpu` 时没有。
#[cfg(all(test, any(feature = "gpu", feature = "gpu-webgl")))]
mod tests {
    use super::SHADER;

    #[test]
    fn target_composite_shader_translates_to_webgl2() {
        let module = render_raster::naga::front::wgsl::parse_str(SHADER).expect("target composite WGSL must parse");
        let info = render_raster::naga::valid::Validator::new(
            render_raster::naga::valid::ValidationFlags::all(),
            render_raster::naga::valid::Capabilities::default(),
        )
        .validate(&module)
        .expect("target composite WGSL must validate");
        for (stage, entry_point) in [
            (render_raster::naga::ShaderStage::Vertex, "vertex_main"),
            (render_raster::naga::ShaderStage::Fragment, "difference_main"),
            (render_raster::naga::ShaderStage::Fragment, "exclusion_main"),
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
            .expect("WebGL2 writer must initialize");
            writer.write().expect("WGSL must translate to GLSL ES 300");
            assert!(output.contains("#version 300 es"));
        }
    }
}
