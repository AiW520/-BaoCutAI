use caption_scene::{Presentation, parse_style};
use render_raster::TextEngine;
use serde_json::{Value, json};
use subtitle_render::scene::{SceneCue, ScenePlan};
fn body() -> Value {
    serde_json::from_str(include_str!(
        "../../caption-scene/tests/fixtures/noise-palette-mix.json"
    ))
    .unwrap()
}
fn plan(body: Value) -> ScenePlan {
    let mut p = ScenePlan::compile(
        parse_style(&body).unwrap(),
        Presentation::default(),
        vec![SceneCue {
            id: "cue".into(),
            document_id: "doc".into(),
            text: "Light".into(),
            start: 0.0,
            end: 4.0,
            words: vec![],
        }],
        (160, 90),
        TextEngine::with_document_fonts(&[include_bytes!(
            "../../render-raster/assets/fonts/NotoSansSC-Variable.ttf"
        )
        .to_vec()]),
        "palette".into(),
    )
    .unwrap();
    p.load_resources(|_| {
        Some(include_bytes!("../../caption-scene/tests/fixtures/noise-palette.png").to_vec())
    })
    .unwrap();
    p
}
#[test]
fn spatial_palette_filter_changes_rgb_keeps_coverage_and_seeks_deterministically() {
    let mut base = body();
    base["scene"]["value"]["materials"] = json!([]);
    let alpha = plan(base).render(0.5).unwrap().rgba;
    let mut p = plan(body());
    let first = p.render(0.5).unwrap().rgba;
    let later = p.render(2.5).unwrap().rgba;
    assert_ne!(first, later);
    assert_ne!(first, alpha);
    assert_eq!(
        first.chunks_exact(4).map(|p| p[3]).collect::<Vec<_>>(),
        alpha.chunks_exact(4).map(|p| p[3]).collect::<Vec<_>>()
    );
    assert_eq!(first, p.render(0.5).unwrap().rgba);
}
#[test]
fn dynamic_invalid_uniform_or_domain_is_rejected_before_sampling() {
    for (field, ty, value) in [("palettePosition", "scalar", 2.0), ("width", "length", 0.0)] {
        let mut b = body();
        let v = json!({"kind":"expression","expression":{"op":"literal","type":ty,"value":value}});
        if field == "width" {
            b["scene"]["value"]["materials"][0]["domain"][field] = v;
        } else {
            b["scene"]["value"]["materials"][0][field] = v;
        }
        let err = plan(b)
            .render(0.5)
            .err()
            .expect("invalid material must fail");
        assert!(err.to_string().contains("CAPTION_MATERIAL_INVALID"));
    }
}
