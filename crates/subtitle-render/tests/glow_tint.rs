use caption_scene::{Presentation, parse_style};
use render_raster::TextEngine;
use serde_json::{Value, json};
use subtitle_render::scene::{SceneCue, ScenePlan};

fn fixture() -> Value {
    serde_json::from_str(include_str!(
        "../../caption-scene/tests/fixtures/glow-cascade.json"
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
        "tint".into(),
    )
    .unwrap()
}
fn set_tint(body: &mut Value, value: Value) {
    let capabilities = body["scene"]["value"]["requiredCapabilities"]
        .as_array_mut()
        .unwrap();
    if !capabilities.iter().any(|c| c == "caption-glow-tint/1") {
        capabilities.push(json!("caption-glow-tint/1"));
    }
    body["scene"]["value"]["materials"][0]["glowTint"] = value;
}

#[test]
fn omitted_or_white_rgb_tint_is_unchanged_and_black_retains_original_rgb() {
    let original = fixture();
    let baseline = plan(original.clone()).render(0.2).unwrap().rgba;
    for color in ["#FFFFFFFF", "#FFFFFF00"] {
        let mut white = original.clone();
        set_tint(&mut white, json!({"kind":"constant","value":color}));
        assert_eq!(plan(white).render(0.2).unwrap().rgba, baseline);
    }
    let mut black = original.clone();
    set_tint(&mut black, json!({"kind":"constant","value":"#00000000"}));
    let black = plan(black).render(0.2).unwrap().rgba;
    let mut no_glow = original;
    no_glow["scene"]["value"]["materials"][0]["intensity"] = json!({"kind":"constant","value":0});
    let no_glow = plan(no_glow).render(0.2).unwrap().rgba;
    assert_ne!(black, baseline);
    for ((tinted, white), source) in black
        .chunks_exact(4)
        .zip(baseline.chunks_exact(4))
        .zip(no_glow.chunks_exact(4))
    {
        assert_eq!(
            tinted[3], white[3],
            "glowTint alpha is ignored and aggregated glow alpha is retained"
        );
        assert_eq!(&tinted[..3], &source[..3], "the original RGB is not tinted");
    }
}

#[test]
fn animated_glow_tint_uses_page_context_and_feedback_recomputes_history() {
    let mut body = fixture();
    body["scene"]["value"]["requiredCapabilities"]
        .as_array_mut()
        .unwrap()
        .push(json!("caption-unit-context/1"));
    set_tint(
        &mut body,
        json!({"kind":"expression","expression":{"op":"if","condition":{"op":"call","function":"lt","args":[{"op":"read","path":"time.pageElapsedSeconds"},{"op":"literal","type":"time","value":0.5}]},"then":{"op":"literal","type":"color","value":"#FF000000"},"else":{"op":"literal","type":"color","value":"#0000FFFF"}}}),
    );
    let mut animated = plan(body.clone());
    for (t, color) in [(0.2, "#FF0000"), (0.8, "#0000FF")] {
        let mut fixed = fixture();
        set_tint(&mut fixed, json!({"kind":"constant","value":color}));
        assert_eq!(
            animated.render(t).unwrap().rgba,
            plan(fixed).render(t).unwrap().rgba
        );
    }
    body["scene"]["value"]["materials"].as_array_mut().unwrap().push(json!({"kind":"feedback","id":"history","samples":2,"step":{"ticks":200,"timescale":1000},"decay":0.5}));
    let mut animated = plan(body.clone());
    let expected = animated.render(0.8).unwrap().rgba;
    let _ = animated.render(3.0).unwrap();
    assert_eq!(animated.render(0.8).unwrap().rgba, expected);
    assert_eq!(plan(body).render(0.8).unwrap().rgba, expected);
}

#[test]
fn glow_color_matrix_identity_is_legacy_compatible_and_zero_keeps_the_source() {
    let body = fixture();
    let baseline = plan(body.clone()).render(0.2).unwrap().rgba;
    let mut identity = body.clone();
    identity["scene"]["value"]["requiredCapabilities"]
        .as_array_mut()
        .unwrap()
        .push(json!("caption-glow-color-matrix/1"));
    identity["scene"]["value"]["materials"][0]["glowColorMatrix"] =
        json!([1, 0, 0, 0, 1, 0, 0, 0, 1]);
    assert_eq!(plan(identity.clone()).render(0.2).unwrap().rgba, baseline);
    let mut zero = identity;
    zero["scene"]["value"]["materials"][0]["glowColorMatrix"] = json!([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    let zero = plan(zero).render(0.2).unwrap().rgba;
    let mut original_only = body;
    original_only["scene"]["value"]["materials"][0]["intensity"] =
        json!({"kind":"constant","value":0});
    let original_only = plan(original_only).render(0.2).unwrap().rgba;
    for ((transformed, baseline), source) in zero
        .chunks_exact(4)
        .zip(baseline.chunks_exact(4))
        .zip(original_only.chunks_exact(4))
    {
        assert_eq!(&transformed[..3], &source[..3]);
        assert_eq!(transformed[3], baseline[3]);
    }
}
