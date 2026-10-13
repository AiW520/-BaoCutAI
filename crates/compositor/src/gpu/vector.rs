//! DrawOp 的 R1 矢量子集 → GPU triangle list。
//!
//! shape 只会发 `FillRect` / `FillPath` / `StrokePath`；其它 DrawOp 明确拒绝并
//! 交宿主回退 CPU，绝不静默漏画。曲线在 CPU 只做 tessellation（几何求值），
//! 光栅、抗锯齿与 alpha-over 均留在 GPU。

use std::collections::HashMap;
use std::sync::Arc;

use anyhow::{Context, Result, bail};
use lyon_path::Path;
use lyon_path::math::point;
use lyon_tessellation::geometry_builder::{BuffersBuilder, VertexBuffers};
use lyon_tessellation::{
    FillOptions, FillRule, FillTessellator, FillVertex, LineCap, LineJoin, StrokeOptions, StrokeTessellator, StrokeVertex,
};
use render_raster::drawop::{Color4, DrawOp, FrameOps, Mat6, PathData};

use crate::ScenePose;

const SHADER: &str = r#"
struct VertexOut {
    @builtin(position) position: vec4f,
    @location(0) color: vec4f,
}

struct VectorUniforms {
    transform0: vec4f,
    transform1: vec4f,
    viewport: vec4f,
}

@group(0) @binding(0) var<uniform> uniforms: VectorUniforms;

@vertex
fn vertex_main(@location(0) position: vec2f, @location(1) color: vec4f) -> VertexOut {
    let x = uniforms.transform0.x * position.x
        + uniforms.transform0.z * position.y
        + uniforms.transform1.x;
    let y = uniforms.transform0.y * position.x
        + uniforms.transform0.w * position.y
        + uniforms.transform1.y;
    var out: VertexOut;
    out.position = vec4f(
        2.0 * x / uniforms.viewport.x - 1.0,
        1.0 - 2.0 * y / uniforms.viewport.y,
        0.0,
        1.0,
    );
    out.color = color * uniforms.transform1.z;
    return out;
}

@fragment
fn fragment_main(input: VertexOut) -> @location(0) vec4f {
    return input.color;
}
"#;

#[repr(C)]
#[derive(Debug, Clone, Copy)]
struct Vertex {
    position: [f32; 2],
    color: [f32; 4],
}

#[repr(C)]
#[derive(Debug, Clone, Copy)]
struct VectorUniforms {
    transform0: [f32; 4],
    transform1: [f32; 4],
    viewport: [f32; 4],
}

pub(super) struct VectorRenderer {
    device: wgpu::Device,
    queue: wgpu::Queue,
    bind_layout: wgpu::BindGroupLayout,
    pipelines: HashMap<wgpu::TextureFormat, wgpu::RenderPipeline>,
    meshes: Vec<MeshBuffers>,
    geometry_writes: u64,
    uniform_writes: u64,
}

struct MeshBuffers {
    vertices: wgpu::Buffer,
    vertex_capacity: u64,
    indices: wgpu::Buffer,
    index_capacity: u64,
    index_count: u32,
    uniforms: wgpu::Buffer,
    uniform_bind_group: wgpu::BindGroup,
    geometry: Option<Arc<FrameOps>>,
}

impl VectorRenderer {
    pub fn new(device: wgpu::Device, queue: wgpu::Queue) -> Self {
        let bind_layout = bind_layout(&device);
        Self {
            device,
            queue,
            bind_layout,
            pipelines: HashMap::new(),
            meshes: Vec::new(),
            geometry_writes: 0,
            uniform_writes: 0,
        }
    }

    #[allow(clippy::too_many_arguments)]
    pub fn encode_to_view(
        &mut self,
        slot: usize,
        frame: &Arc<FrameOps>,
        view: &wgpu::TextureView,
        width: u32,
        height: u32,
        format: wgpu::TextureFormat,
        clear: bool,
        pose: ScenePose,
        encoder: &mut wgpu::CommandEncoder,
    ) -> Result<()> {
        let geometry_is_current = self
            .meshes
            .get(slot)
            .is_some_and(|mesh| mesh.geometry.as_ref().is_some_and(|cached| Arc::ptr_eq(cached, frame)));
        let mesh = (!geometry_is_current).then(|| tessellate(frame)).transpose()?;
        let vertex_bytes = mesh.as_ref().map(|mesh| bytes_of_slice(&mesh.vertices)).unwrap_or_default();
        let index_bytes = mesh.as_ref().map(|mesh| bytes_of_slice(&mesh.indices)).unwrap_or_default();
        self.ensure_buffers(slot, vertex_bytes.len() as u64, index_bytes.len() as u64)?;
        let uniforms = VectorUniforms {
            transform0: [pose.transform[0], pose.transform[1], pose.transform[2], pose.transform[3]],
            transform1: [pose.transform[4], pose.transform[5], pose.opacity.clamp(0.0, 1.0), 0.0],
            viewport: [width.max(1) as f32, height.max(1) as f32, 0.0, 0.0],
        };
        self.queue
            .write_buffer(&self.meshes[slot].uniforms, 0, bytes_of_slice(std::slice::from_ref(&uniforms)));
        self.uniform_writes += 1;
        if let Some(mesh) = mesh.as_ref() {
            if !vertex_bytes.is_empty() {
                let buffers = &self.meshes[slot];
                self.queue.write_buffer(&buffers.vertices, 0, vertex_bytes);
                self.queue.write_buffer(&buffers.indices, 0, index_bytes);
            }
            let buffers = &mut self.meshes[slot];
            buffers.index_count = mesh.indices.len() as u32;
            buffers.geometry = Some(Arc::clone(frame));
            self.geometry_writes += 1;
        }
        let pipeline = self.pipeline(format);
        let buffers = &self.meshes[slot];
        {
            let mut pass = encoder.begin_render_pass(&wgpu::RenderPassDescriptor {
                label: Some("bcut.compositor.vector.pass"),
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
            if buffers.index_count > 0 {
                pass.set_pipeline(&pipeline);
                pass.set_bind_group(0, &buffers.uniform_bind_group, &[]);
                pass.set_vertex_buffer(0, buffers.vertices.slice(..));
                pass.set_index_buffer(buffers.indices.slice(..), wgpu::IndexFormat::Uint32);
                pass.draw_indexed(0..buffers.index_count, 0, 0..1);
            }
        }
        Ok(())
    }

    /// 稳定场景的每个矢量节点拥有自己的上传缓冲。整帧只在最后 submit，若所有
    /// pass 共用一对 buffer，后一个节点的 `queue.write_buffer` 会在 GPU 执行前
    /// 覆盖前一个节点的数据。
    fn ensure_buffers(&mut self, slot: usize, vertex_bytes: u64, index_bytes: u64) -> Result<()> {
        if slot == self.meshes.len() {
            self.meshes.push(MeshBuffers::new(&self.device, &self.bind_layout));
        } else if slot > self.meshes.len() {
            bail!("gpu-vector-slot-invalid: requested {slot}, next is {}", self.meshes.len());
        }
        let buffers = &mut self.meshes[slot];
        if vertex_bytes > buffers.vertex_capacity {
            buffers.vertex_capacity = vertex_bytes.next_power_of_two();
            buffers.vertices = buffer(
                &self.device,
                "bcut.vector.vertices",
                buffers.vertex_capacity,
                wgpu::BufferUsages::VERTEX,
            );
        }
        if index_bytes > buffers.index_capacity {
            buffers.index_capacity = index_bytes.next_power_of_two();
            buffers.indices = buffer(
                &self.device,
                "bcut.vector.indices",
                buffers.index_capacity,
                wgpu::BufferUsages::INDEX,
            );
        }
        Ok(())
    }

    pub fn finish_frame(&mut self, used_slots: usize) {
        self.meshes.truncate(used_slots);
    }

    pub fn geometry_writes(&self) -> u64 {
        self.geometry_writes
    }

    pub fn uniform_writes(&self) -> u64 {
        self.uniform_writes
    }

    fn pipeline(&mut self, format: wgpu::TextureFormat) -> wgpu::RenderPipeline {
        if let Some(pipeline) = self.pipelines.get(&format) {
            return pipeline.clone();
        }
        let module = self.device.create_shader_module(wgpu::ShaderModuleDescriptor {
            label: Some("bcut.compositor.vector.wgsl"),
            source: wgpu::ShaderSource::Wgsl(SHADER.into()),
        });
        let layout = self.device.create_pipeline_layout(&wgpu::PipelineLayoutDescriptor {
            label: Some("bcut.compositor.vector.pipeline-layout"),
            bind_group_layouts: &[Some(&self.bind_layout)],
            immediate_size: 0,
        });
        let pipeline = self.device.create_render_pipeline(&wgpu::RenderPipelineDescriptor {
            label: Some("bcut.compositor.vector.pipeline"),
            layout: Some(&layout),
            vertex: wgpu::VertexState {
                module: &module,
                entry_point: Some("vertex_main"),
                compilation_options: Default::default(),
                buffers: &[Some(wgpu::VertexBufferLayout {
                    array_stride: std::mem::size_of::<Vertex>() as u64,
                    step_mode: wgpu::VertexStepMode::Vertex,
                    attributes: &[
                        wgpu::VertexAttribute {
                            format: wgpu::VertexFormat::Float32x2,
                            offset: 0,
                            shader_location: 0,
                        },
                        wgpu::VertexAttribute {
                            format: wgpu::VertexFormat::Float32x4,
                            offset: 8,
                            shader_location: 1,
                        },
                    ],
                })],
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

impl MeshBuffers {
    fn new(device: &wgpu::Device, bind_layout: &wgpu::BindGroupLayout) -> Self {
        let uniforms = buffer(
            device,
            "bcut.vector.uniforms",
            std::mem::size_of::<VectorUniforms>() as u64,
            wgpu::BufferUsages::UNIFORM,
        );
        let uniform_bind_group = device.create_bind_group(&wgpu::BindGroupDescriptor {
            label: Some("bcut.vector.uniform-bind-group"),
            layout: bind_layout,
            entries: &[wgpu::BindGroupEntry {
                binding: 0,
                resource: uniforms.as_entire_binding(),
            }],
        });
        Self {
            vertices: buffer(device, "bcut.vector.vertices", 4, wgpu::BufferUsages::VERTEX),
            vertex_capacity: 4,
            indices: buffer(device, "bcut.vector.indices", 4, wgpu::BufferUsages::INDEX),
            index_capacity: 4,
            index_count: 0,
            uniforms,
            uniform_bind_group,
            geometry: None,
        }
    }
}

fn bind_layout(device: &wgpu::Device) -> wgpu::BindGroupLayout {
    device.create_bind_group_layout(&wgpu::BindGroupLayoutDescriptor {
        label: Some("bcut.vector.uniform-layout"),
        entries: &[wgpu::BindGroupLayoutEntry {
            binding: 0,
            visibility: wgpu::ShaderStages::VERTEX,
            ty: wgpu::BindingType::Buffer {
                ty: wgpu::BufferBindingType::Uniform,
                has_dynamic_offset: false,
                min_binding_size: None,
            },
            count: None,
        }],
    })
}

fn buffer(device: &wgpu::Device, label: &str, size: u64, usage: wgpu::BufferUsages) -> wgpu::Buffer {
    device.create_buffer(&wgpu::BufferDescriptor {
        label: Some(label),
        size: size.max(4),
        usage: usage | wgpu::BufferUsages::COPY_DST,
        mapped_at_creation: false,
    })
}

fn tessellate(frame: &FrameOps) -> Result<VertexBuffers<Vertex, u32>> {
    let mut out = VertexBuffers::new();
    for op in &frame.ops {
        match op {
            DrawOp::FillRect {
                x,
                y,
                w,
                h,
                radius,
                color,
                tf,
            } => {
                let path = rounded_rect(*x, *y, *w, *h, *radius);
                fill(&path, *color, *tf, &mut out)?;
            }
            DrawOp::FillPath { path, color, tf } => {
                let path = frame
                    .paths
                    .get(*path as usize)
                    .with_context(|| format!("vector FillPath 引用未知 path {path}"))?;
                fill(&to_lyon(path)?, *color, *tf, &mut out)?;
            }
            DrawOp::StrokePath {
                path,
                color,
                width: stroke_width,
                tf,
            } => {
                let path = frame
                    .paths
                    .get(*path as usize)
                    .with_context(|| format!("vector StrokePath 引用未知 path {path}"))?;
                stroke(&to_lyon(path)?, *color, *tf, *stroke_width, &mut out)?;
            }
            unsupported => {
                bail!("compositor-vector-op-unsupported: shape R1 不接受 {unsupported:?}；回退 CPU")
            }
        }
    }
    Ok(out)
}

fn fill(path: &Path, color: Color4, tf: Mat6, out: &mut VertexBuffers<Vertex, u32>) -> Result<()> {
    FillTessellator::new()
        .tessellate_path(
            path,
            // DrawOp::FillPath 的冻结契约是 nonzero；lyon 默认是 EvenOdd。
            // 同向嵌套子路径或自交路径会因此从 CPU 的实心变成 GPU 挖洞。
            &FillOptions::default().with_fill_rule(FillRule::NonZero),
            &mut BuffersBuilder::new(out, |vertex: FillVertex<'_>| vertex_of(vertex.position(), color, tf)),
        )
        .map_err(|error| anyhow::anyhow!("shape fill tessellation failed: {error:?}"))
}

#[allow(clippy::too_many_arguments)]
fn stroke(path: &Path, color: Color4, tf: Mat6, stroke_width: f32, out: &mut VertexBuffers<Vertex, u32>) -> Result<()> {
    StrokeTessellator::new()
        .tessellate_path(
            path,
            &StrokeOptions::default()
                .with_line_width(stroke_width.max(0.0))
                .with_line_cap(LineCap::Round)
                .with_line_join(LineJoin::Round),
            &mut BuffersBuilder::new(out, |vertex: StrokeVertex<'_, '_>| vertex_of(vertex.position(), color, tf)),
        )
        .map_err(|error| anyhow::anyhow!("shape stroke tessellation failed: {error:?}"))
}

fn vertex_of(position: lyon_path::math::Point, color: Color4, tf: Mat6) -> Vertex {
    let x = tf[0] * position.x + tf[2] * position.y + tf[4];
    let y = tf[1] * position.x + tf[3] * position.y + tf[5];
    let alpha = color[3].clamp(0.0, 1.0);
    Vertex {
        position: [x, y],
        color: [
            color[0].clamp(0.0, 1.0) * alpha,
            color[1].clamp(0.0, 1.0) * alpha,
            color[2].clamp(0.0, 1.0) * alpha,
            alpha,
        ],
    }
}

fn to_lyon(data: &PathData) -> Result<Path> {
    let mut builder = Path::builder();
    let mut open = false;
    for segment in &data.0 {
        match segment.verb {
            0 => {
                if open {
                    builder.end(false);
                }
                builder.begin(point(segment.pts[0], segment.pts[1]));
                open = true;
            }
            1 if open => {
                builder.line_to(point(segment.pts[0], segment.pts[1]));
            }
            2 if open => {
                builder.quadratic_bezier_to(point(segment.pts[0], segment.pts[1]), point(segment.pts[2], segment.pts[3]));
            }
            3 if open => {
                builder.cubic_bezier_to(
                    point(segment.pts[0], segment.pts[1]),
                    point(segment.pts[2], segment.pts[3]),
                    point(segment.pts[4], segment.pts[5]),
                );
            }
            4 if open => {
                builder.close();
                open = false;
            }
            verb => bail!("compositor-vector-path-invalid: verb={verb} open={open}"),
        };
    }
    if open {
        builder.end(false);
    }
    Ok(builder.build())
}

fn rounded_rect(x: f32, y: f32, width: f32, height: f32, radius: f32) -> Path {
    let radius = radius.max(0.0).min(width.abs() / 2.0).min(height.abs() / 2.0);
    let right = x + width;
    let bottom = y + height;
    let mut builder = Path::builder();
    if radius <= f32::EPSILON {
        builder.begin(point(x, y));
        builder.line_to(point(right, y));
        builder.line_to(point(right, bottom));
        builder.line_to(point(x, bottom));
        builder.close();
        return builder.build();
    }
    // 与 tiny-skia 的 rounded rect 同一条 kappa 圆弧近似。
    const KAPPA: f32 = 0.552_284_8;
    let control = radius * KAPPA;
    builder.begin(point(x + radius, y));
    builder.line_to(point(right - radius, y));
    builder.cubic_bezier_to(
        point(right - radius + control, y),
        point(right, y + radius - control),
        point(right, y + radius),
    );
    builder.line_to(point(right, bottom - radius));
    builder.cubic_bezier_to(
        point(right, bottom - radius + control),
        point(right - radius + control, bottom),
        point(right - radius, bottom),
    );
    builder.line_to(point(x + radius, bottom));
    builder.cubic_bezier_to(
        point(x + radius - control, bottom),
        point(x, bottom - radius + control),
        point(x, bottom - radius),
    );
    builder.line_to(point(x, y + radius));
    builder.cubic_bezier_to(point(x, y + radius - control), point(x + radius - control, y), point(x + radius, y));
    builder.close();
    builder.build()
}

fn bytes_of_slice<T>(values: &[T]) -> &[u8] {
    // SAFETY: callers pass `Vertex` / `VectorUniforms` (`repr(C)` of f32 arrays) or `u32`;
    // all are initialized plain data without references or padding bytes.
    unsafe { std::slice::from_raw_parts(values.as_ptr().cast::<u8>(), std::mem::size_of_val(values)) }
}

#[cfg(test)]
mod tests {
    use render_raster::drawop::{BitmapData, DrawOp, FrameBuilder};

    use super::tessellate;

    /// BCF 彩色字形（`DrawBitmap`，BCOP v5）不在 R1 矢量子集里：必须明确拒绝，
    /// 交宿主整幅回退 CPU，而不是把 emoji 静默漏画。
    #[test]
    fn colour_glyph_bitmaps_are_refused_so_the_host_falls_back_to_cpu() {
        let mut builder = FrameBuilder::default();
        let bitmap = builder.bitmap_id(BitmapData {
            width: 1,
            height: 1,
            rgba: vec![255, 0, 0, 255].into(),
        });
        builder.push(DrawOp::DrawBitmap {
            bitmap,
            opacity: 1.0,
            tf: [1.0, 0.0, 0.0, 1.0, 0.0, 0.0],
        });
        let error = tessellate(&builder.finish()).unwrap_err();
        assert!(error.to_string().starts_with("compositor-vector-op-unsupported"), "{error:#}");
    }
}
