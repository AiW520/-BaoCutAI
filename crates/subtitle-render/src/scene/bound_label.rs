//! One-line text decorations. Geometry belongs to the label; semantic context
//! and transform pivot belong to its explicitly selected source unit.
use super::*;
use render_raster::fonts::ShapedGlyph;

pub(super) fn register_fonts(nodes: &[Node], text: &mut TextEngine) {
    for node in nodes {
        if node.kind == NodeKind::Label {
            text.note_font_face(
                &node.style.font_family,
                node.style.font_weight,
                node.style.italic,
            );
        }
        register_fonts(&node.children, text);
    }
}

pub(super) fn draw(
    node: &Node,
    unit: &Unit,
    parent: Transform,
    r: &RenderContext,
    text: &mut TextEngine,
    b: &mut FrameBuilder,
    budget: &mut Budget,
) -> Result<()> {
    let TextBinding::Static { text: content } = node.text.as_ref().expect("validated label text")
    else {
        bail!("CAPTION_SCENE_INVALID: label text must be static");
    };
    let size_pose = pose_context(node, unit, r, budget, context(unit, r), Some(true))?;
    let size = number(&size_pose, "fontSize");
    if !size.is_finite() || !(1.0..=4096.0).contains(&size) {
        bail!("CAPTION_LAYOUT_INVALID: label font size must be 1..4096 pixels");
    }
    // Charge even cache hits before cloning/shaping potentially many labels.
    for _ in 0..content.len().max(1) {
        budget.spend()?;
    }
    let style = &node.style;
    let shape = text.shape_spaced(
        content,
        &style.font_family,
        size,
        style.font_weight,
        style.italic,
        style.letter_spacing * size,
    );
    let (ascent, descent) =
        if shape.glyphs.is_empty() && shape.ascent == 0.0 && shape.descent == 0.0 {
            budget.spend()?;
            let metrics = text.shape_spaced(
                " ",
                &style.font_family,
                size,
                style.font_weight,
                style.italic,
                0.0,
            );
            (metrics.ascent, metrics.descent)
        } else {
            (shape.ascent, shape.descent)
        };
    let height = ascent.max(0.0) + descent.abs();
    if !shape.width.is_finite()
        || !height.is_finite()
        || !(0.0..=65536.0).contains(&shape.width)
        || !(0.0..=65536.0).contains(&height)
    {
        bail!("CAPTION_BUDGET_EXCEEDED: label geometry");
    }
    let bounds = Bounds {
        x: unit.bounds.x + (unit.bounds.width - shape.width) * 0.5,
        y: unit.bounds.y + (unit.bounds.height - height) * 0.5,
        width: shape.width,
        height,
    };
    let baseline = bounds.y + ascent.max(0.0);
    let mut max_width = 0.0f64;
    let mut max_height = 0.0f64;
    let mut ink_available = false;
    for glyph in &shape.glyphs {
        budget.spend()?;
        if let Some(ink) = text.glyph_ink_bounds(glyph.cache_key) {
            max_width = max_width.max(ink.width() as f64);
            max_height = max_height.max(ink.height() as f64);
            ink_available = true;
        }
    }
    let mut ctx = context(unit, r);
    for (name, value) in [
        ("layout.labelWidth", shape.width),
        ("layout.labelHeight", height),
        ("layout.labelMaxGlyphInkWidth", max_width),
        ("layout.labelMaxGlyphInkHeight", max_height),
    ] {
        ctx.fields
            .insert(name.into(), Evaluated::Number(ValueType::Length, value));
    }
    ctx.fields.insert(
        "unit.labelInkAvailable".into(),
        Evaluated::Bool(ink_available),
    );
    // Size expressions never see the fields above. Remaining pose properties
    // run exactly once, after size and own shape have been resolved.
    let pose = pose_context(node, unit, r, budget, ctx, Some(false))?;
    if number(&pose, "opacity") <= 0.0 {
        return Ok(());
    }
    let transform = parent.pre_concat(matrix(&pose, unit.bounds));
    b.push(DrawOp::PushLayer {
        opacity: number(&pose, "opacity").clamp(0.0, 1.0) as f32,
        blend: motion::effect::BlendMode::Normal,
    });
    let Evaluated::Color(fill) = pose["fill"] else {
        unreachable!()
    };
    for glyph in &shape.glyphs {
        budget.spend()?;
        let xy = (bounds.x + glyph.x, baseline + glyph.y);
        let origin = transform.pre_translate(xy.0 as f32, xy.1 as f32);
        record_glyph(style, glyph, fill, 1.0, origin, bounds, xy, text, b, budget)?;
    }
    b.push(DrawOp::PopLayer);
    Ok(())
}

/// Shared recording retains the exact outline/paint and intrinsic color bitmap
/// behavior of ordinary text. Node opacity is applied by the caller's layer.
#[allow(clippy::too_many_arguments)]
pub(super) fn record_glyph(
    style: &TextStyle,
    glyph: &ShapedGlyph,
    c: [f64; 4],
    opacity: f64,
    origin: Transform,
    paint_bounds: Bounds,
    paint_origin: (f64, f64),
    text: &mut TextEngine,
    b: &mut FrameBuilder,
    budget: &mut Budget,
) -> Result<()> {
    match text.glyph_render(glyph.cache_key) {
        GlyphRender::Outline(path) => {
            let id = b.path_id(path_from_skia(&path));
            if !style.paints.is_empty() {
                for layer in &style.paints {
                    budget.spend()?;
                    let paint = scene_paint(&layer.paint, paint_bounds, paint_origin, opacity)?;
                    let paint = b.paint_id(paint);
                    let transform =
                        origin.pre_translate(layer.offset[0] as f32, layer.offset[1] as f32);
                    if layer.stroke_width > 0.0 {
                        b.push(DrawOp::StrokePathPaint {
                            path: id,
                            paint,
                            width: layer.stroke_width as f32,
                            cap: 1,
                            join: 1,
                            miter: 4.0,
                            tf: tf(transform),
                        });
                    } else {
                        b.push(DrawOp::FillPathPaint {
                            path: id,
                            paint,
                            even_odd: false,
                            tf: tf(transform),
                        });
                    }
                }
                return Ok(());
            }
            if let Some(s) = &style.stroke {
                let mut sc = color(&s.color)?;
                sc[3] *= opacity.clamp(0.0, 1.0);
                b.push(DrawOp::StrokePath {
                    path: id,
                    color: sc.map(|v| v as f32),
                    width: s.width as f32,
                    tf: tf(origin),
                });
            }
            b.push(DrawOp::FillPath {
                path: id,
                color: c.map(|v| v.clamp(0.0, 1.0) as f32),
                tf: tf(origin),
            });
        }
        GlyphRender::ColorBitmap {
            width,
            height,
            rgba,
            left,
            top,
        } => {
            let id = b.bitmap_id(BitmapData {
                width,
                height,
                rgba,
            });
            b.push(DrawOp::DrawBitmap {
                bitmap: id,
                opacity: opacity.clamp(0.0, 1.0) as f32,
                tf: tf(origin.pre_translate(left as f32, -top as f32)),
            });
        }
        GlyphRender::Empty => {}
    }
    Ok(())
}
