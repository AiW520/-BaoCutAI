use caption_scene::{Presentation, parse_style};
use render_raster::TextEngine;
use serde_json::{Value, json};
use subtitle_render::scene::{SceneCue, ScenePlan};
fn fixture() -> Value {
    serde_json::from_str(include_str!(
        "../../caption-scene/tests/fixtures/angular-sample-blend.json"
    ))
    .unwrap()
}
fn plan(body: Value) -> ScenePlan {
    ScenePlan::compile(
        parse_style(&body).unwrap(),
        Presentation::default(),
        vec![SceneCue {
            id: "cue".into(),
            document_id: "doc".into(),
            text: "Arc".into(),
            start: 0.0,
            end: 4.0,
            words: vec![],
        }],
        (160, 90),
        TextEngine::with_document_fonts(&[include_bytes!(
            "../../render-raster/assets/fonts/NotoSansSC-Variable.ttf"
        )
        .to_vec()]),
        "angular".into(),
    )
    .unwrap()
}
#[test]
fn angle_samples_are_time_deterministic_and_zero_angle_is_not_identity() {
    let mut p = plan(fixture());
    let first = p.render(0.25).unwrap().rgba;
    let later = p.render(2.0).unwrap().rgba;
    assert_ne!(first, later);
    assert!(first.iter().any(|v| *v > 0));
    assert_eq!(first, p.render(0.25).unwrap().rgba);
    let mut zero = fixture();
    zero["scene"]["value"]["materials"][0]["angle"] = json!({"kind":"constant","value":0});
    let altered = plan(zero.clone()).render(0.25).unwrap().rgba;
    zero["scene"]["value"]["materials"] = json!([]);
    assert_ne!(altered, plan(zero).render(0.25).unwrap().rgba);
}
#[test]
fn invalid_dynamic_aspect_and_angle_fail_without_returning_a_stale_frame() {
    for (field, ty, value) in [("aspect", "scalar", 0.0), ("angle", "angle", 10_001.0)] {
        let mut b = fixture();
        b["scene"]["value"]["materials"][0][field] =
            json!({"kind":"expression","expression":{"op":"literal","type":ty,"value":value}});
        let error = plan(b)
            .render(0.25)
            .err()
            .expect("invalid material must fail");
        assert!(error.to_string().contains("CAPTION_MATERIAL_INVALID"));
    }
}
