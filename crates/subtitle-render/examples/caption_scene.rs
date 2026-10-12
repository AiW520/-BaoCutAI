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
    let rich = std::env::args().nth(2).as_deref() == Some("--rich");
    let value = serde_json::from_str(if rich {
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
        tiny_skia::Pixmap::from_vec(
            frame.rgba.as_ref().clone(),
            tiny_skia::IntSize::from_wh(160, 90).unwrap(),
        )
        .unwrap()
        .save_png(output.join(format!("frame-{i}.png")))?;
    }
    Ok(())
}
