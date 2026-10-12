use caption_scene::*;
use render_raster::TextEngine;
use serde_json::{Value, json};
use subtitle_render::scene::*;
fn fixture() -> Value {
    serde_json::from_str(include_str!(
        "../../caption-scene/tests/fixtures/word-pop.json"
    ))
    .unwrap()
}
fn plan(body: Value, text: &str, words: Vec<SceneWord>, p: Presentation) -> ScenePlan {
    ScenePlan::compile(
        parse_style(&body).unwrap(),
        p,
        vec![SceneCue {
            id: "cue".into(),
            document_id: "doc".into(),
            text: text.into(),
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
    )
    .unwrap()
}
fn words() -> Vec<SceneWord> {
    ["One", "two", "three", "four"]
        .iter()
        .enumerate()
        .map(|(i, t)| SceneWord {
            id: format!("w{i}"),
            text: (*t).into(),
            start: i as f64,
            end: i as f64 + 0.7,
        })
        .collect()
}
#[test]
fn real_word_pages_highlight_and_seek_are_shared_pixels() {
    let mut p = plan(
        fixture(),
        "One two three four",
        words(),
        Presentation::default(),
    );
    let a = p.render(0.3).unwrap();
    let b = p.render(1.3).unwrap();
    let last = p.render(3.3).unwrap();
    assert!(
        a.rgba
            .chunks_exact(4)
            .any(|p| p[3] > 0 && p[0] > 100 && p[1] > 70 && p[2] < 20)
    );
    assert_ne!(a.rgba, b.rgba);
    assert_ne!(b.rgba, last.rgba);
    for t in [0.3, 2.4, 1.3, 0.3] {
        let now = p.render(t).unwrap();
        let fresh = plan(
            fixture(),
            "One two three four",
            words(),
            Presentation::default(),
        )
        .render(t)
        .unwrap();
        assert_eq!(now.rgba, fresh.rgba);
        assert_eq!(now.fingerprint, fresh.fingerprint);
    }
    assert!(p.render(4.0).unwrap().rgba.iter().all(|p| *p == 0));
}
#[test]
fn missing_word_times_do_not_create_spoken_highlights() {
    let mut p = plan(fixture(), "One two", vec![], Presentation::default());
    assert!(
        p.diagnostics
            .iter()
            .any(|d| d.code == "CAPTION_TIMING_UNAVAILABLE")
    );
    let frame = p.render(0.4).unwrap();
    assert!(frame.rgba.chunks_exact(4).any(|p| p[3] > 0));
    assert!(
        !frame
            .rgba
            .chunks_exact(4)
            .any(|p| p[3] > 100 && p[0] > 100 && p[1] > 70 && p[2] < 20)
    );
}
#[test]
fn parameter_override_and_continuous_expression_change_actual_frames() {
    let mut body = fixture();
    body["scene"]["value"]["animations"].as_array_mut().unwrap().push(json!({"id":"drift","target":{"nodeId":"caption"},"property":"transform.x","composite":"add","value":{"kind":"expression","expression":{"op":"call","function":"mix","args":[{"op":"literal","type":"length","value":-20},{"op":"literal","type":"length","value":20},{"op":"read","path":"time.clampedProgress"}]}}}));
    let mut p = Presentation::default();
    p.parameters.insert("accent".into(), json!("#00FF00"));
    let mut plan = plan(body, "One two three four", words(), p);
    let a = plan.render(0.3).unwrap();
    assert!(
        a.rgba
            .chunks_exact(4)
            .any(|p| p[3] > 100 && p[1] > 100 && p[0] < 10)
    );
    assert_ne!(a.rgba, plan.render(0.7).unwrap().rgba);
}
#[test]
fn multilingual_clusters_and_repeat_geometry_survive_random_access() {
    let mut body = fixture();
    body["scene"]["value"]["nodes"].as_array_mut().unwrap().insert(0,json!({"id":"boxes","type":"repeat","selectorId":"words","children":[{"id":"plate","type":"shape","properties":{"fill":{"kind":"constant","value":"#123456"},"radius":{"kind":"constant","value":2}}}]}));
    for text in [
        "你好 世界",
        "office e\u{301}",
        "العربية جميلة",
        "हिन्दी भाषा",
        "ภาษาไทย",
    ] {
        let mut p = plan(body.clone(), text, vec![], Presentation::default());
        let a = p.render(0.4).unwrap();
        p.render(3.2).unwrap();
        assert_eq!(a.rgba, p.render(0.4).unwrap().rgba);
        assert!(a.rgba.chunks_exact(4).any(|p| p[3] > 0));
    }
}

#[test]
fn repeated_word_shapes_use_measured_bounds_and_hits_follow_transforms() {
    let mut body = fixture();
    body["scene"]["value"]["nodes"][0]["properties"] =
        json!({"transform.x":{"kind":"constant","value":10}});
    let mut p = plan(body, "One two", vec![], Presentation::default());
    let shifted = p.render(0.3).unwrap();
    let normal = plan(fixture(), "One two", vec![], Presentation::default())
        .render(0.3)
        .unwrap();
    assert!((shifted.hits[0].bounds.x - normal.hits[0].bounds.x - 10.0).abs() < 0.001);
    assert_eq!(shifted.hits[0].bounds.width, normal.hits[0].bounds.width);
}

#[test]
fn state_styles_preserve_whole_source_words_and_zero_time_words() {
    let mut body = fixture();
    body["scene"]["value"]["animations"] = json!([]);
    body["scene"]["value"]["nodes"][0]["stateStyles"] =
        json!({"unit":"word","active":{"fill":"#00FF00"}});
    let words = vec![
        SceneWord {
            id: "first".into(),
            text: "你好".into(),
            start: 0.0,
            end: 1.0,
        },
        SceneWord {
            id: "last".into(),
            text: "世界".into(),
            start: 1.5,
            end: 1.5,
        },
    ];
    let mut p = plan(body, "你好 世界", words, Presentation::default());
    let one = p.render(0.3).unwrap();
    let gap = p.render(1.2).unwrap();
    assert_eq!(one.rgba, gap.rgba); // explicit hold-previous
    assert!(
        one.rgba
            .chunks_exact(4)
            .any(|p| p[1] > 100 && p[0] < 10 && p[3] > 100)
    );
    assert_eq!(p.render(1.5).unwrap().rgba, p.render(1.5).unwrap().rgba);
}

#[test]
fn unsupported_resources_and_invalid_instance_parameters_are_not_silent() {
    let mut body = fixture();
    body["scene"]["value"]["resources"] = json!([{"id":"image"}]);
    assert!(parse_style(&body).is_err());
    let style = parse_style(&fixture()).unwrap();
    let mut p = Presentation::default();
    p.parameters.insert("unknown".into(), json!(3));
    assert!(validate_presentation(&p, Some(style.scene())).is_err());
}

#[test]
fn layout_parameters_are_resolved_before_shaping_with_occurrence_precedence() {
    let mut body = fixture();
    body["scene"]["value"]["parameters"]
        .as_array_mut()
        .unwrap()
        .push(json!({"id":"size","type":"scalar","default":1,"min":0.5,"max":2}));
    body["scene"]["value"]["nodes"][0]["style"]["fontSize"]["parameter"] = json!("size");
    let base = plan(body.clone(), "One two", vec![], Presentation::default())
        .render(0.4)
        .unwrap();
    let mut p = Presentation::default();
    p.cue_overrides = serde_json::from_value(json!([
        {"cueId":"cue","occurrenceId":"occurrence","parameters":{"size":1.5}},
        {"cueId":"cue","parameters":{"size":0.5}}
    ]))
    .unwrap();
    let larger = plan(body, "One two", vec![], p).render(0.4).unwrap();
    assert!(larger.hits[0].bounds.width > base.hits[0].bounds.width * 1.4);
}
