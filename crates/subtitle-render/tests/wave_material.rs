use caption_scene::*;
use render_raster::TextEngine;
use serde_json::{Value, json};
use subtitle_render::scene::*;
fn fixture() -> Value {
    serde_json::from_str(include_str!(
        "../../caption-scene/tests/fixtures/wave-displace.json"
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
            text: "Wave motion".into(),
            start: 0.0,
            end: 4.0,
            words: vec![],
        }],
        (160, 90),
        TextEngine::with_document_fonts(&[include_bytes!(
            "../../render-raster/assets/fonts/NotoSansSC-Variable.ttf"
        )
        .to_vec()]),
        "wave-instance".into(),
    )
    .unwrap()
}
#[test]
fn wave_material_is_animated_seekable_and_zero_amplitude_is_identity() {
    let body = fixture();
    let mut scene = plan(body.clone());
    let first = scene.render(0.0).unwrap();
    let second = scene.render(0.25).unwrap();
    assert_ne!(first.rgba, second.rgba);
    assert!(second.rgba.chunks_exact(4).any(|p| p[3] > 0));
    for time in [0.75, 0.1, 0.25, 0.0] {
        assert_eq!(
            scene.render(time).unwrap().rgba,
            plan(body.clone()).render(time).unwrap().rgba
        );
    }
    let mut zero = body.clone();
    zero["scene"]["value"]["materials"][0]["amplitude"] = json!({"kind":"constant","value":0});
    let mut plain = body;
    plain["scene"]["value"]["materials"] = json!([]);
    assert_eq!(
        plan(zero).render(0.2).unwrap().rgba,
        plan(plain).render(0.2).unwrap().rgba
    );
}
#[test]
fn dynamic_wave_uniform_ranges_are_checked_even_with_zero_amplitude() {
    for (property, ty, value) in [
        ("amplitude", "length", 257.0),
        ("wavelength", "length", 0.5),
    ] {
        let mut body = fixture();
        body["scene"]["value"]["materials"][0]["amplitude"] = json!({"kind":"constant","value":0});
        body["scene"]["value"]["materials"][0][property] =
            json!({"kind":"expression","expression":{"op":"literal","type":ty,"value":value}});
        assert!(
            plan(body)
                .render(0.2)
                .err()
                .unwrap()
                .to_string()
                .contains("CAPTION_MATERIAL_INVALID")
        );
    }
}

#[test]
fn wave_padding_is_independent_of_uniform_representation_and_bounded() {
    let body = fixture();
    let mut dynamic = body.clone();
    dynamic["scene"]["value"]["materials"][0]["amplitude"] =
        json!({"kind":"expression","expression":{"op":"literal","type":"length","value":4.5}});
    assert_eq!(
        plan(body.clone()).render(0.25).unwrap().rgba,
        plan(dynamic).render(0.25).unwrap().rgba
    );
    let mut excessive = body;
    excessive["scene"]["value"]["materials"] = Value::Array(
        (0..8)
            .map(|index| {
                json!({
                    "kind":"wave-displace", "id":format!("wave-{index}"), "axis":"y",
                    "amplitude":{"kind":"constant","value":256},
                    "wavelength":{"kind":"constant","value":32},
                    "phase":{"kind":"constant","value":0}
                })
            })
            .collect(),
    );
    assert!(
        plan(excessive)
            .render(0.25)
            .err()
            .unwrap()
            .to_string()
            .contains("CAPTION_BUDGET_EXCEEDED")
    );
}
