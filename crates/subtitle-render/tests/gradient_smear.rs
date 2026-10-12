use caption_scene::{Presentation, parse_style};
use render_raster::TextEngine;
use serde_json::{Value, json};
use subtitle_render::scene::{SceneCue, ScenePlan};
fn fixture() -> Value {
    serde_json::from_str(include_str!(
        "../../caption-scene/tests/fixtures/gradient-smear.json"
    ))
    .unwrap()
}
fn plan(value: Value) -> ScenePlan {
    ScenePlan::compile(
        parse_style(&value).unwrap(),
        Presentation::default(),
        vec![SceneCue {
            id: "cue".into(),
            document_id: "doc".into(),
            text: "Motion".into(),
            start: 0.0,
            end: 4.0,
            words: vec![],
        }],
        (160, 90),
        TextEngine::with_document_fonts(&[include_bytes!(
            "../../render-raster/assets/fonts/NotoSansSC-Variable.ttf"
        )
        .to_vec()]),
        "smear".into(),
    )
    .unwrap()
}
#[test]
fn noise_changes_real_rgba_and_random_seek_is_deterministic() {
    let mut p = plan(fixture());
    let first = p.render(0.2).unwrap().rgba;
    let later = p.render(0.8).unwrap().rgba;
    assert!(first.iter().any(|x| *x > 0));
    assert_ne!(first, later);
    assert_eq!(first, p.render(0.2).unwrap().rgba);
    let mut down = fixture();
    down["scene"]["value"]["materials"][0]["uvY"] = json!("down");
    assert_ne!(first, plan(down).render(0.2).unwrap().rgba);
    assert!(p.render(4.1).unwrap().rgba.iter().all(|x| *x == 0));
}
#[test]
fn zero_strength_keeps_the_full_domain_image_without_a_fake_fade() {
    let mut v = fixture();
    v["scene"]["value"]["materials"][0]["strength"] =
        json!([{"kind":"constant","value":0},{"kind":"constant","value":0}]);
    let image = plan(v.clone()).render(0.2).unwrap().rgba;
    v["scene"]["value"]["materials"] = json!([]);
    assert_eq!(image, plan(v).render(0.2).unwrap().rgba);
}
#[test]
fn invalid_dynamic_uniforms_fail_without_reusing_a_frame() {
    for (field, ty, n) in [
        ("progress", "scalar", 2.),
        ("evolution", "scalar", 100001.),
        ("stretch", "scalar", 3.),
    ] {
        let mut v = fixture();
        v["scene"]["value"]["materials"][0][field] =
            json!({"kind":"expression","expression":{"op":"literal","type":ty,"value":n}});
        assert!(
            plan(v)
                .render(0.2)
                .err()
                .expect("invalid material must fail")
                .to_string()
                .contains("CAPTION_MATERIAL_INVALID")
        );
    }
    let mut v = fixture();
    v["scene"]["value"]["materials"][0]["domain"]["width"] =
        json!({"kind":"expression","expression":{"op":"literal","type":"length","value":0}});
    assert!(
        plan(v)
            .render(0.2)
            .err()
            .expect("invalid material must fail")
            .to_string()
            .contains("CAPTION_MATERIAL_INVALID")
    );
}
