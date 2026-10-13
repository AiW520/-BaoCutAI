//! Associated RGBA Gaussian passes. No pixel readback or CPU image filtering.
use anyhow::{Result, ensure};
use render_raster::effects::component_filters::{Axis, Boundary, GaussianPass, Size, gaussian_weights};

const SHADER: &str = include_str!("component.wgsl");
const UNIFORM_BYTES: usize = 48 + 1024 * 4;

/// Executes resolved material parameters; the caller owns the material graph,
/// targets and frame encoder. Each pass within a submission needs a distinct slot.
pub struct ComponentRenderer {
    device: wgpu::Device,
    queue: wgpu::Queue,
    layout: wgpu::BindGroupLayout,
    pipeline: wgpu::RenderPipeline,
    slots: Vec<wgpu::Buffer>,
}
impl ComponentRenderer {
    pub fn new(device: wgpu::Device, queue: wgpu::Queue) -> Self {
        let layout = device.create_bind_group_layout(&wgpu::BindGroupLayoutDescriptor {
            label: Some("baocut.component.layout"),
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
                        min_binding_size: wgpu::BufferSize::new(UNIFORM_BYTES as u64),
                    },
                    count: None,
                },
            ],
        });
        let shader = device.create_shader_module(wgpu::ShaderModuleDescriptor {
            label: Some("baocut.component.shader"),
            source: wgpu::ShaderSource::Wgsl(SHADER.into()),
        });
        let pipeline_layout = device.create_pipeline_layout(&wgpu::PipelineLayoutDescriptor {
            label: Some("baocut.component.pipeline-layout"),
            bind_group_layouts: &[Some(&layout)],
            immediate_size: 0,
        });
        let pipeline = device.create_render_pipeline(&wgpu::RenderPipelineDescriptor {
            label: Some("baocut.component.gaussian"),
            layout: Some(&pipeline_layout),
            vertex: wgpu::VertexState {
                module: &shader,
                entry_point: Some("vertex_main"),
                compilation_options: Default::default(),
                buffers: &[],
            },
            primitive: Default::default(),
            depth_stencil: None,
            multisample: Default::default(),
            fragment: Some(wgpu::FragmentState {
                module: &shader,
                entry_point: Some("gaussian"),
                compilation_options: Default::default(),
                targets: &[Some(wgpu::ColorTargetState {
                    format: wgpu::TextureFormat::Rgba8Unorm,
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
            layout,
            pipeline,
            slots: Vec::new(),
        }
    }

    /// Source/output are linear-suffix-free RGBA8Unorm, single-sampled and distinct.
    /// The host supplies TEXTURE_BINDING / RENDER_ATTACHMENT usages respectively.
    pub fn encode_gaussian(
        &mut self,
        slot: usize,
        source: &wgpu::TextureView,
        input: Size,
        output: &wgpu::TextureView,
        pass: GaussianPass,
        encoder: &mut wgpu::CommandEncoder,
    ) -> Result<()> {
        ensure!(slot < 128, "gpu-component-slot-limit");
        let limit = self.device.limits().max_texture_dimension_2d;
        ensure!(
            input.width > 0
                && input.height > 0
                && input.width <= limit
                && input.height <= limit
                && pass.output.width <= limit
                && pass.output.height <= limit,
            "gpu-component-size-limit"
        );
        let weights = gaussian_weights(pass)?;
        let reads = u64::from(pass.output.width)
            .saturating_mul(u64::from(pass.output.height))
            .saturating_mul(2 * weights.len() as u64 + 1)
            .saturating_mul(4);
        ensure!(reads <= 256 * 1024 * 1024, "gpu-component-work-budget");
        let mut data = vec![0u8; UNIFORM_BYTES];
        for (i, value) in [input.width, input.height, pass.output.width, pass.output.height]
            .into_iter()
            .enumerate()
        {
            data[i * 4..i * 4 + 4].copy_from_slice(&value.to_le_bytes());
        }
        let gamma = if weights.is_empty() { 1.0 } else { pass.gamma.unwrap_or(1.0) };
        for (i, value) in [
            pass.step_pixels,
            gamma,
            if pass.axis == Axis::X { 0.0 } else { 1.0 },
            match pass.boundary {
                Boundary::Normalize => 0.0,
                Boundary::Replicate => 1.0,
                Boundary::Transparent => 2.0,
            },
        ]
        .into_iter()
        .enumerate()
        {
            let value = value as f32;
            ensure!(
                value.is_finite() && (i != 1 || (value > 0.0 && (1.0 / value).is_finite())),
                "gpu-component-f32-range"
            );
            data[16 + i * 4..20 + i * 4].copy_from_slice(&value.to_le_bytes());
        }
        data[32..36].copy_from_slice(&(weights.len() as u32).to_le_bytes());
        for (i, value) in weights.into_iter().enumerate() {
            data[48 + i * 4..52 + i * 4].copy_from_slice(&(value as f32).to_le_bytes());
        }
        while self.slots.len() <= slot {
            self.slots.push(self.device.create_buffer(&wgpu::BufferDescriptor {
                label: Some("baocut.component.params"),
                size: UNIFORM_BYTES as u64,
                usage: wgpu::BufferUsages::UNIFORM | wgpu::BufferUsages::COPY_DST,
                mapped_at_creation: false,
            }));
        }
        self.queue.write_buffer(&self.slots[slot], 0, &data);
        let bindings = self.device.create_bind_group(&wgpu::BindGroupDescriptor {
            label: Some("baocut.component.bindings"),
            layout: &self.layout,
            entries: &[
                wgpu::BindGroupEntry {
                    binding: 0,
                    resource: wgpu::BindingResource::TextureView(source),
                },
                wgpu::BindGroupEntry {
                    binding: 1,
                    resource: self.slots[slot].as_entire_binding(),
                },
            ],
        });
        let mut render = encoder.begin_render_pass(&wgpu::RenderPassDescriptor {
            label: Some("baocut.component.pass"),
            color_attachments: &[Some(wgpu::RenderPassColorAttachment {
                view: output,
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
        render.set_pipeline(&self.pipeline);
        render.set_bind_group(0, &bindings, &[]);
        render.draw(0..3, 0..1);
        Ok(())
    }

    pub fn finish_frame(&mut self, used_slots: usize) {
        self.slots.truncate(used_slots);
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn shader_translates_to_webgl2_without_optional_features() {
        let module = naga::front::wgsl::parse_str(SHADER).unwrap();
        let info = naga::valid::Validator::new(naga::valid::ValidationFlags::all(), naga::valid::Capabilities::empty())
            .validate(&module)
            .unwrap();
        for (shader_stage, entry_point) in [
            (naga::ShaderStage::Vertex, "vertex_main"),
            (naga::ShaderStage::Fragment, "gaussian"),
        ] {
            let mut output = String::new();
            let options = naga::back::glsl::Options {
                version: naga::back::glsl::Version::new_gles(300),
                ..Default::default()
            };
            let pipeline = naga::back::glsl::PipelineOptions {
                shader_stage,
                entry_point: entry_point.into(),
                multiview: None,
            };
            let mut writer = naga::back::glsl::Writer::new(&mut output, &module, &info, &options, &pipeline, Default::default()).unwrap();
            writer.write().unwrap();
            assert!(output.starts_with("#version 300 es"));
        }
    }
}
