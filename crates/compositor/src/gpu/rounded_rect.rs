use std::collections::HashMap;

use anyhow::{Result, bail};
use timeline_render::RoundedRectNode;

const SHADER: &str = r#"
struct RoundedRectUniforms {
    rect: vec4f,
    color: vec4f,
    transform0: vec4f,
    transform1: vec4f,
    viewport: vec4f,
}

@group(0) @binding(0) var<uniform> uniforms: RoundedRectUniforms;

struct VertexOut {
    @builtin(position) position: vec4f,
    @location(0) local_position: vec2f,
    @location(1) half_size: vec2f,
    @location(2) radius: f32,
    @location(3) color: vec4f,
}

@vertex
fn vertex_main(@builtin(vertex_index) vertex_index: u32) -> VertexOut {
    let corners = array<vec2f, 6>(
        vec2f(0.0, 0.0), vec2f(1.0, 0.0), vec2f(0.0, 1.0),
        vec2f(0.0, 1.0), vec2f(1.0, 0.0), vec2f(1.0, 1.0),
    );
    let corner = corners[vertex_index];
    let size = max(uniforms.rect.zw, vec2f(0.0));
    let half_size = size * 0.5;
    // 给解析 coverage 留出画布像素边缘，不能把 AA 截在 quad 边界内。
    let expansion = vec2f(1.5);
    let canvas_position = uniforms.rect.xy - expansion
        + corner * (size + expansion * 2.0);
    let x = uniforms.transform0.x * canvas_position.x
        + uniforms.transform0.z * canvas_position.y
        + uniforms.transform1.x;
    let y = uniforms.transform0.y * canvas_position.x
        + uniforms.transform0.w * canvas_position.y
        + uniforms.transform1.y;
    var out: VertexOut;
    out.position = vec4f(
        2.0 * x / uniforms.viewport.x - 1.0,
        1.0 - 2.0 * y / uniforms.viewport.y,
        0.0,
        1.0,
    );
    out.local_position = canvas_position - (uniforms.rect.xy + half_size);
    out.half_size = half_size;
    out.radius = clamp(uniforms.transform1.w, 0.0, min(half_size.x, half_size.y));
    out.color = uniforms.color;
    return out;
}

@fragment
fn fragment_main(input: VertexOut) -> @location(0) vec4f {
    let q = abs(input.local_position) - (input.half_size - vec2f(input.radius));
    let distance = length(max(q, vec2f(0.0)))
        + min(max(q.x, q.y), 0.0)
        - input.radius;
    // fwidth 把局部 SDF 的抗锯齿宽度换成最终 target 像素；旋转/缩放时不另造口径。
    let aa = max(fwidth(distance), 0.0001);
    let coverage = 1.0 - smoothstep(-0.5 * aa, 0.5 * aa, distance);
    let alpha = clamp(input.color.a * uniforms.transform1.z * coverage, 0.0, 1.0);
    return vec4f(clamp(input.color.rgb, vec3f(0.0), vec3f(1.0)) * alpha, alpha);
}
"#;

#[repr(C)]
#[derive(Debug, Clone, Copy)]
struct RoundedRectUniforms {
    rect: [f32; 4],
    color: [f32; 4],
    transform0: [f32; 4],
    transform1: [f32; 4],
    viewport: [f32; 4],
}

pub(super) struct RoundedRectRenderer {
    device: wgpu::Device,
    queue: wgpu::Queue,
    bind_layout: wgpu::BindGroupLayout,
    pipelines: HashMap<wgpu::TextureFormat, wgpu::RenderPipeline>,
    slots: Vec<Slot>,
    uniform_writes: u64,
}

struct Slot {
    uniforms: wgpu::Buffer,
    bind_group: wgpu::BindGroup,
}

impl RoundedRectRenderer {
    pub fn new(device: wgpu::Device, queue: wgpu::Queue) -> Self {
        let bind_layout = bind_layout(&device);
        Self {
            device,
            queue,
            bind_layout,
            pipelines: HashMap::new(),
            slots: Vec::new(),
            uniform_writes: 0,
        }
    }

    #[allow(clippy::too_many_arguments)]
    pub fn encode_to_view(
        &mut self,
        slot: usize,
        node: &RoundedRectNode,
        view: &wgpu::TextureView,
        width: u32,
        height: u32,
        format: wgpu::TextureFormat,
        clear: bool,
        presentation_time: Option<f64>,
        encoder: &mut wgpu::CommandEncoder,
    ) -> Result<()> {
        if width == 0 || height == 0 {
            bail!("gpu-rounded-rect-target-invalid: {width}x{height}");
        }
        if !node.rect.into_iter().chain(node.color).all(f32::is_finite)
            || !node.radius.is_finite()
            || node.rect[2] <= 0.0
            || node.rect[3] <= 0.0
        {
            bail!("gpu-rounded-rect-invalid: {node:?}");
        }
        if slot == self.slots.len() {
            self.slots.push(Slot::new(&self.device, &self.bind_layout));
        } else if slot > self.slots.len() {
            bail!("gpu-rounded-rect-slot-invalid: requested {slot}, next is {}", self.slots.len());
        }
        let pose = presentation_time
            .and_then(|time| node.motion.as_ref().map(|motion| motion.sample(time)))
            .unwrap_or(node.pose);
        let uniforms = RoundedRectUniforms {
            rect: node.rect,
            color: node.color,
            transform0: [pose.transform[0], pose.transform[1], pose.transform[2], pose.transform[3]],
            transform1: [
                pose.transform[4],
                pose.transform[5],
                pose.opacity.clamp(0.0, 1.0),
                node.radius.max(0.0),
            ],
            viewport: [width as f32, height as f32, 0.0, 0.0],
        };
        self.queue
            .write_buffer(&self.slots[slot].uniforms, 0, bytes_of(std::slice::from_ref(&uniforms)));
        self.uniform_writes += 1;
        let pipeline = self.pipeline(format);
        let mut pass = encoder.begin_render_pass(&wgpu::RenderPassDescriptor {
            label: Some("bcut.compositor.rounded-rect.pass"),
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
        pass.set_bind_group(0, &self.slots[slot].bind_group, &[]);
        pass.draw(0..6, 0..1);
        Ok(())
    }

    pub fn finish_frame(&mut self, used_slots: usize) {
        self.slots.truncate(used_slots);
    }

    pub fn uniform_writes(&self) -> u64 {
        self.uniform_writes
    }

    fn pipeline(&mut self, format: wgpu::TextureFormat) -> wgpu::RenderPipeline {
        if let Some(pipeline) = self.pipelines.get(&format) {
            return pipeline.clone();
        }
        let module = self.device.create_shader_module(wgpu::ShaderModuleDescriptor {
            label: Some("bcut.compositor.rounded-rect.wgsl"),
            source: wgpu::ShaderSource::Wgsl(SHADER.into()),
        });
        let layout = self.device.create_pipeline_layout(&wgpu::PipelineLayoutDescriptor {
            label: Some("bcut.compositor.rounded-rect.pipeline-layout"),
            bind_group_layouts: &[Some(&self.bind_layout)],
            immediate_size: 0,
        });
        let pipeline = self.device.create_render_pipeline(&wgpu::RenderPipelineDescriptor {
            label: Some("bcut.compositor.rounded-rect.pipeline"),
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

impl Slot {
    fn new(device: &wgpu::Device, bind_layout: &wgpu::BindGroupLayout) -> Self {
        let uniforms = device.create_buffer(&wgpu::BufferDescriptor {
            label: Some("bcut.rounded-rect.uniforms"),
            size: std::mem::size_of::<RoundedRectUniforms>() as u64,
            usage: wgpu::BufferUsages::UNIFORM | wgpu::BufferUsages::COPY_DST,
            mapped_at_creation: false,
        });
        let bind_group = device.create_bind_group(&wgpu::BindGroupDescriptor {
            label: Some("bcut.rounded-rect.bind-group"),
            layout: bind_layout,
            entries: &[wgpu::BindGroupEntry {
                binding: 0,
                resource: uniforms.as_entire_binding(),
            }],
        });
        Self { uniforms, bind_group }
    }
}

fn bind_layout(device: &wgpu::Device) -> wgpu::BindGroupLayout {
    device.create_bind_group_layout(&wgpu::BindGroupLayoutDescriptor {
        label: Some("bcut.rounded-rect.bind-layout"),
        entries: &[wgpu::BindGroupLayoutEntry {
            binding: 0,
            visibility: wgpu::ShaderStages::VERTEX_FRAGMENT,
            ty: wgpu::BindingType::Buffer {
                ty: wgpu::BufferBindingType::Uniform,
                has_dynamic_offset: false,
                min_binding_size: None,
            },
            count: None,
        }],
    })
}

fn bytes_of<T>(values: &[T]) -> &[u8] {
    // SAFETY: `RoundedRectUniforms` 是完全初始化的 repr(C) f32 数组，无引用与 padding。
    unsafe { std::slice::from_raw_parts(values.as_ptr().cast::<u8>(), std::mem::size_of_val(values)) }
}
