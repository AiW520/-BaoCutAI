# Compositor

Shared retained GPU executor, ported from BaoCut v2 `bcut-compositor` with its
conformance tests. It consumes `timeline-render::SceneFrame`; layout,
word timing, semantic clocks and animation evaluation remain in `subtitle-render`.
The renderer never parses template recipes or lays text out independently.

- Native: `--features gpu` (wgpu Metal, DX12, Vulkan).
- Browser: `--features gpu-webgpu` or `--features gpu-webgl`.
- No features: scene scheduling and atlas contracts only; CPU WASM does not link wgpu.

The executor draws cached alpha/color glyph atlases, per-glyph transforms and
paints, rounded rectangles, vectors, images, shader quads, grouped box blur and
ordered composition. `ComponentRenderer` additionally executes associated RGBA
Gaussian passes with shared CPU validation/weights, gamma, boundary modes and
resizing; RGB greater than alpha is preserved. It has a per-pass sampling budget
and bounded uniform slots. The host still owns graph-wide surface/work budgets.
Its live APIs encode directly into the host texture/view,
with one submission and no pixel readback. `OfflineCompositor::render_rgba` is an
explicit readback API for tests and hosts that require CPU bytes.

GPU support is not inferred from a template name or the presence of an adapter.
Unsupported scene operations return an error. The host must keep the CPU reference
available, report fallback reasons, and recreate the compositor and resources on a
new device after loss. Software adapters are not selected automatically by the
native executor. Limits are based on baseline WebGL2 requirements plus actual
resolution/alignment limits, without requesting optional device features.

Glyph atlases have fixed capacity and retire unused glyphs under pressure. Idle
render targets have both a per-key count limit and a global 64 MiB cache limit;
this is **not** a total GPU-memory limit. Active material surfaces, external media,
and host swapchain allocations must be budgeted separately by the host.

This initial port executes the existing retained scene contract. Dynamic caption
material stacks (`ScenePlan::record`), their retained-plan adapter, and the preview
page's GPU wiring still require migration. Uploading a CPU-rendered subtitle bitmap
does not count as GPU caption rendering.

Run `cargo test --locked -p compositor --features gpu`. GPU tests may skip when no
adapter is available; acceptance runs set `BAOCUT_REQUIRE_GPU=1` to fail instead.
Native tests do not establish Windows, browser, or another GPU vendor's conformance.
