//! Write sample frames from the shared caption scene renderer (no editor required).
use caption_scene::{Presentation, parse_style};
use render_raster::TextEngine;
use subtitle_render::scene::{SceneCue, ScenePlan, SceneWord};
fn main() -> anyhow::Result<()> {
    let output = std::path::PathBuf::from(
        std::env::args()
            .nth(1)
            .ok_or_else(|| anyhow::anyhow!("output directory required"))?,
    );
    std::fs::create_dir_all(&output)?;
    let mode = std::env::args().nth(2);
    let rich = mode.as_deref() == Some("--rich");
    let value = serde_json::from_str(if mode.as_deref() == Some("--feedback") {
        include_str!("../../caption-scene/tests/fixtures/reflow-feedback.json")
    } else if rich {
        include_str!("../../caption-scene/tests/fixtures/image-paint.json")
    } else {
        include_str!("../../caption-scene/tests/fixtures/word-pop.json")
    })?;
    let words = ["One", "two", "three", "four"]
        .iter()
        .enumerate()
        .map(|(i, w)| SceneWord {
            id: format!("w{i}"),
            text: (*w).into(),
            start: i as f64,
            end: i as f64 + 0.7,
        })
        .collect();
    let mut plan = ScenePlan::compile(
        parse_style(&value)?,
        Presentation::default(),
        vec![SceneCue {
            id: "cue".into(),
            document_id: "doc".into(),
            text: "One two three four".into(),
            start: 0.0,
            end: 4.0,
            words,
        }],
        (160, 90),
        TextEngine::with_document_fonts(&[include_bytes!(
            "../../render-raster/assets/fonts/NotoSansSC-Variable.ttf"
        )
        .to_vec()]),
        "caption|occurrence".into(),
    )?;
    plan.load_resources(|r| {
        (r.id == "badge")
            .then(|| include_bytes!("../../caption-scene/tests/fixtures/badge.png").to_vec())
    })?;
    for (i, t) in [0.0, 0.081, 0.3, 1.3, 2.3, 3.3].iter().enumerate() {
        let frame = plan.render(*t)?;
        let image = tiny_skia::Pixmap::from_vec(
            frame.rgba.as_ref().clone(),
            tiny_skia::IntSize::from_wh(160, 90).unwrap(),
        )
        .unwrap();
        image.save_png(output.join(format!("frame-{i}.png")))?;
        if mode.as_deref() == Some("--feedback") {
            let mut preview = tiny_skia::Pixmap::new(160, 90).unwrap();
            preview.fill(tiny_skia::Color::from_rgba8(20, 24, 32, 255));
            preview.draw_pixmap(
                0,
                0,
                image.as_ref(),
                &tiny_skia::PixmapPaint::default(),
                tiny_skia::Transform::identity(),
                None,
            );
            preview.save_png(output.join(format!("preview-{i}.png")))?;
        }
    }
    Ok(())
}
