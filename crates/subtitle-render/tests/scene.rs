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

fn png_resource() -> (Vec<u8>, String) {
    use sha2::{Digest, Sha256};
    let mut png = tiny_skia::Pixmap::new(2, 1).unwrap();
    png.data_mut()
        .copy_from_slice(&[255, 0, 0, 255, 0, 0, 128, 128]);
    let bytes = png.encode_png().unwrap();
    let hash = format!(
        "sha256:{}",
        Sha256::digest(&bytes)
            .iter()
            .map(|b| format!("{b:02x}"))
            .collect::<String>()
    );
    (bytes, hash)
}
fn image_style(hash: &str) -> Value {
    let mut body = fixture();
    body["scene"]["value"]["animations"] = json!([]);
    body["scene"]["value"]["resources"] =
        json!([{"id":"badge","assetRef":{"id":"asset_badge","revision":"r1"},"contentHash":hash}]);
    body["scene"]["value"]["nodes"].as_array_mut().unwrap().push(json!({"id":"icon","type":"image","resourceId":"badge","fit":"cover","properties":{"width":{"kind":"constant","value":24},"height":{"kind":"constant","value":16},"transform.y":{"kind":"constant","value":-20}}}));
    body
}
#[test]
fn frozen_png_images_validate_bytes_and_render_on_random_seek() {
    let (bytes, hash) = png_resource();
    let mut p = plan(
        image_style(&hash),
        "One two",
        vec![],
        Presentation::default(),
    );
    assert!(
        p.render(0.3)
            .err()
            .unwrap()
            .to_string()
            .contains("CAPTION_RESOURCE_MISSING")
    );
    assert!(
        p.load_resources(|_| Some(vec![1, 2, 3]))
            .unwrap_err()
            .to_string()
            .contains("CAPTION_RESOURCE_DIGEST")
    );
    p.load_resources(|_| Some(bytes.clone())).unwrap();
    let frame = p.render(0.3).unwrap();
    assert!(
        frame
            .rgba
            .chunks_exact(4)
            .any(|p| p[0] > 200 && p[1] == 0 && p[2] == 0)
    );
    p.render(2.0).unwrap();
    assert_eq!(frame.rgba, p.render(0.3).unwrap().rgba);
}
#[test]
fn ordered_gradient_and_stroke_keep_native_text_geometry() {
    let mut body = fixture();
    body["scene"]["value"]["animations"] = json!([]);
    body["scene"]["value"]["nodes"][0]["style"]["paints"] = json!([
        {"id":"outline","strokeWidth":2,"paint":{"kind":"solid","color":"#000000"}},
        {"id":"gradient","paint":{"kind":"linear","from":[0,0],"to":[1,0],"stops":[{"at":0,"color":"#FF0000"},{"at":1,"color":"#0000FF"}]}}
    ]);
    let mut p = plan(body, "One two", vec![], Presentation::default());
    let frame = p.render(0.3).unwrap();
    assert!(frame.rgba.chunks_exact(4).any(|p| p[0] > p[2] && p[0] > 40));
    assert!(frame.rgba.chunks_exact(4).any(|p| p[2] > p[0] && p[2] > 40));
    assert_eq!(frame.rgba, p.render(0.3).unwrap().rgba);
}

#[test]
fn png_dimension_overflow_is_rejected_before_decode() {
    use sha2::{Digest, Sha256};
    let (mut bytes, _) = png_resource();
    bytes[16..20].copy_from_slice(&u32::MAX.to_be_bytes());
    bytes[20..24].copy_from_slice(&u32::MAX.to_be_bytes());
    let hash = format!(
        "sha256:{}",
        Sha256::digest(&bytes)
            .iter()
            .map(|b| format!("{b:02x}"))
            .collect::<String>()
    );
    let mut p = plan(image_style(&hash), "One", vec![], Presentation::default());
    assert!(
        p.load_resources(|_| Some(bytes.clone()))
            .unwrap_err()
            .to_string()
            .contains("CAPTION_BUDGET_EXCEEDED")
    );
}

fn sampled_style() -> Value {
    let mut body = fixture();
    let scene = &mut body["scene"]["value"];
    scene["animations"] = json!([]);
    scene["layout"]["layoutEvaluation"] = json!("per-sample");
    scene["layout"]["overflow"] = json!("visible");
    scene["layout"]["bindings"] = json!([
        {"property":"width","value":{"kind":"expression","expression":{"op":"call","function":"mix","args":[{"op":"literal","type":"length","value":120},{"op":"literal","type":"length","value":40},{"op":"read","path":"time.clampedProgress"}]}}},
        {"nodeId":"caption","property":"fontSize","value":{"kind":"expression","expression":{"op":"call","function":"mix","args":[{"op":"literal","type":"length","value":14},{"op":"literal","type":"length","value":24},{"op":"read","path":"time.clampedProgress"}]}}}
    ]);
    body
}
#[test]
fn sampled_layout_reflows_without_reassigning_pages_and_updates_hits() {
    let body = sampled_style();
    let mut p = plan(
        body.clone(),
        "One two three four",
        words(),
        Presentation::default(),
    );
    let early = p.render(0.1).unwrap();
    let later = p.render(2.5).unwrap();
    assert_ne!(early.rgba, later.rgba);
    assert!(later.hits.len() > early.hits.len());
    for t in [2.5, 0.1, 3.3, 1.23, 3.3] {
        let actual = p.render(t).unwrap();
        let expected = plan(
            body.clone(),
            "One two three four",
            words(),
            Presentation::default(),
        )
        .render(t)
        .unwrap();
        assert_eq!(actual.rgba, expected.rgba);
        assert_eq!(actual.fingerprint, expected.fingerprint);
    }
    let last = p.render(3.3).unwrap();
    assert!(!last.hits.is_empty());
    assert!(last.hits.len() < later.hits.len());
}
#[test]
fn sampled_layout_overflow_is_explicit() {
    let mut body = sampled_style();
    body["scene"]["value"]["layout"]["maxLines"] = json!(1);
    body["scene"]["value"]["layout"]["overflow"] = json!("error");
    let mut p = plan(body, "One two three", vec![], Presentation::default());
    assert!(
        p.render(2.5)
            .err()
            .unwrap()
            .to_string()
            .contains("CAPTION_LAYOUT_OVERFLOW")
    );
}
#[test]
fn blur_spreads_alpha_preserves_premultiplication_and_zero_is_identity() {
    let mut body = fixture();
    body["scene"]["value"]["animations"] = json!([]);
    let plain = plan(body.clone(), "One", vec![], Presentation::default())
        .render(1.0)
        .unwrap();
    body["scene"]["value"]["materials"] =
        json!([{"kind":"blur","id":"soft","radius":{"kind":"constant","value":2},"passes":2}]);
    let blurred = plan(body.clone(), "One", vec![], Presentation::default())
        .render(1.0)
        .unwrap();
    let count = |f: &SceneFrame| f.rgba.chunks_exact(4).filter(|p| p[3] > 0).count();
    assert!(count(&blurred) > count(&plain));
    assert!(
        blurred
            .rgba
            .chunks_exact(4)
            .all(|p| p[0] <= p[3] && p[1] <= p[3] && p[2] <= p[3])
    );
    body["scene"]["value"]["materials"][0]["radius"]["value"] = json!(0);
    assert_eq!(
        plain.rgba,
        plan(body, "One", vec![], Presentation::default())
            .render(1.0)
            .unwrap()
            .rgba
    );
}
#[test]
fn feedback_is_bounded_seekable_and_uses_historical_layout() {
    let mut body = sampled_style();
    body["scene"]["value"]["materials"] = json!([
        {"kind":"blur","id":"soft","radius":{"kind":"constant","value":1}},
        {"kind":"feedback","id":"trail","samples":3,"step":{"ticks":100,"timescale":1000},"decay":0.6,"offset":[-6,0]}
    ]);
    let mut p = plan(
        body.clone(),
        "One two three four",
        words(),
        Presentation::default(),
    );
    let a = p.render(2.5).unwrap();
    p.render(0.2).unwrap();
    assert_eq!(a.rgba, p.render(2.5).unwrap().rgba);
    assert_eq!(
        a.rgba,
        plan(
            body.clone(),
            "One two three four",
            words(),
            Presentation::default()
        )
        .render(2.5)
        .unwrap()
        .rgba
    );
    assert!(p.render(4.0).unwrap().rgba.iter().all(|x| *x == 0));
    body["scene"]["value"]["materials"] = json!([]);
    let no_trail = plan(body, "One two three four", words(), Presentation::default())
        .render(2.5)
        .unwrap();
    assert_ne!(a.rgba, no_trail.rgba);
}

#[test]
fn material_order_and_page_boundary_history_are_observable() {
    let mut a = sampled_style();
    let blur = json!({"kind":"blur","id":"soft","radius":{"kind":"expression","expression":{"op":"call","function":"mix","args":[{"op":"literal","type":"length","value":0},{"op":"literal","type":"length","value":8},{"op":"read","path":"time.clampedProgress"}]}}});
    let trail = json!({"kind":"feedback","id":"trail","samples":3,"step":{"ticks":250,"timescale":1000},"decay":0.75,"offset":[-8,0]});
    a["scene"]["value"]["materials"] = json!([blur.clone(), trail.clone()]);
    let mut b = a.clone();
    b["scene"]["value"]["materials"] = json!([trail, blur]);
    let first = plan(
        a.clone(),
        "One two three four",
        words(),
        Presentation::default(),
    )
    .render(3.05)
    .unwrap();
    let second = plan(b, "One two three four", words(), Presentation::default())
        .render(3.05)
        .unwrap();
    assert_ne!(first.rgba, second.rgba);
    let mut reused = plan(
        a.clone(),
        "One two three four",
        words(),
        Presentation::default(),
    );
    for t in [3.05, 1.17, 0.02, 2.99, 3.01] {
        let actual = reused.render(t).unwrap();
        let fresh = plan(
            a.clone(),
            "One two three four",
            words(),
            Presentation::default(),
        )
        .render(t)
        .unwrap();
        assert_eq!(actual.rgba, fresh.rgba);
    }
}
#[test]
fn materials_guard_surface_budget_and_dynamic_uniform_ranges() {
    let mut body = fixture();
    body["scene"]["value"]["materials"] = json!([{"kind":"blur","id":"soft","radius":{"kind":"expression","expression":{"op":"literal","type":"length","value":65}}}]);
    let mut p = plan(body.clone(), "One", vec![], Presentation::default());
    assert!(
        p.render(1.0)
            .err()
            .unwrap()
            .to_string()
            .contains("CAPTION_MATERIAL_INVALID")
    );
    body["scene"]["value"]["materials"] = json!([{"kind":"feedback","id":"trail","samples":16,"step":{"ticks":100,"timescale":1000},"decay":0.5,"offset":[256,256]}]);
    let mut p = plan(body, "One", vec![], Presentation::default());
    assert!(
        p.render(1.0)
            .err()
            .unwrap()
            .to_string()
            .contains("CAPTION_BUDGET_EXCEEDED")
    );
}

#[test]
fn blur_uses_transparent_padding_before_canvas_crop() {
    let mut body = fixture();
    body["scene"]["value"]["animations"] = json!([]);
    body["scene"]["value"]["layout"]["x"]["value"] = json!(0);
    body["scene"]["value"]["materials"] =
        json!([{"kind":"blur","id":"soft","radius":{"kind":"constant","value":2},"passes":2}]);
    let edge = plan(body.clone(), "One", vec![], Presentation::default())
        .render(1.0)
        .unwrap();
    body["scene"]["value"]["layout"]["x"]["value"] = json!(8);
    body["scene"]["value"]["layout"]["y"]["value"] = json!(53);
    let mut larger = ScenePlan::compile(
        parse_style(&body).unwrap(),
        Presentation::default(),
        vec![SceneCue {
            id: "cue".into(),
            document_id: "doc".into(),
            text: "One".into(),
            start: 0.0,
            end: 4.0,
            words: vec![],
        }],
        (176, 106),
        TextEngine::with_document_fonts(&[include_bytes!(
            "../../render-raster/assets/fonts/NotoSansSC-Variable.ttf"
        )
        .to_vec()]),
        "caption|occurrence".into(),
    )
    .unwrap();
    let large = larger.render(1.0).unwrap();
    let mut cropped = Vec::new();
    for y in 8..98 {
        cropped.extend_from_slice(&large.rgba[(y * 176 + 8) * 4..(y * 176 + 168) * 4]);
    }
    assert_eq!(edge.rgba.as_ref(), &cropped);
}
#[test]
fn feedback_never_samples_another_cues_text_or_parameters() {
    let mut body = fixture();
    let s = &mut body["scene"]["value"];
    s["animations"] = json!([]);
    s["nodes"][0]["properties"] =
        json!({"fill":{"kind":"expression","expression":{"op":"read","path":"params.accent"}}});
    s["materials"] = json!([{"kind":"feedback","id":"tail","samples":3,"step":{"ticks":100,"timescale":1000},"decay":0.8,"offset":[-10,0]}]);
    let presentation:Presentation=serde_json::from_value(json!({"cueOverrides":[{"cueId":"first","parameters":{"accent":"#FF0000"}},{"cueId":"second","parameters":{"accent":"#0000FF"}}]})).unwrap();
    let cues = vec![
        SceneCue {
            id: "first".into(),
            document_id: "doc".into(),
            text: "AAAA".into(),
            start: 0.0,
            end: 1.0,
            words: vec![],
        },
        SceneCue {
            id: "second".into(),
            document_id: "doc".into(),
            text: "BBBB".into(),
            start: 1.0,
            end: 2.0,
            words: vec![],
        },
    ];
    let mut p = ScenePlan::compile(
        parse_style(&body).unwrap(),
        presentation,
        cues,
        (160, 90),
        TextEngine::with_document_fonts(&[include_bytes!(
            "../../render-raster/assets/fonts/NotoSansSC-Variable.ttf"
        )
        .to_vec()]),
        "caption|occurrence".into(),
    )
    .unwrap();
    p.render(0.95).unwrap();
    let next = p.render(1.02).unwrap();
    assert!(next.rgba.chunks_exact(4).any(|p| p[2] > 100));
    assert!(next.rgba.chunks_exact(4).all(|p| p[0] == 0));
}
