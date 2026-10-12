use caption_scene::*;
use render_raster::{TextEngine, drawop::DrawOp};
use serde_json::{Value, json};
use subtitle_render::scene::*;
fn fixture() -> Value {
    serde_json::from_str(include_str!(
        "../../caption-scene/tests/fixtures/bound-label.json"
    ))
    .unwrap()
}
fn compile(body: Value) -> ScenePlan {
    ScenePlan::compile(
        parse_style(&body).unwrap(),
        Presentation::default(),
        vec![SceneCue {
            id: "cue".into(),
            document_id: "doc".into(),
            text: "One two three four".into(),
            start: 0.0,
            end: 4.0,
            words: ["One", "two", "three", "four"]
                .iter()
                .enumerate()
                .map(|(i, t)| SceneWord {
                    id: format!("w{i}"),
                    text: (*t).into(),
                    start: i as f64,
                    end: i as f64 + 0.8,
                })
                .collect(),
        }],
        (160, 90),
        TextEngine::with_document_fonts(&[
            include_bytes!("../../render-raster/assets/fonts/NotoSansSC-Variable.ttf").to_vec(),
            include_bytes!("../../render-raster/tests/fixtures/fonts/ColrProbe.ttf").to_vec(),
        ]),
        "bound-label".into(),
    )
    .unwrap()
}
fn only_label(mut body: Value) -> Value {
    let scene = &mut body["scene"]["value"];
    scene["nodes"].as_array_mut().unwrap().truncate(2);
    scene["nodes"][0]["properties"] = json!({"opacity":{"kind":"constant","value":0}});
    scene["nodes"][1]["children"][0]["properties"] = json!({});
    scene["nodes"][1]["children"][0]["text"]["text"] = json!("MMMM");
    body
}
fn bounds(pixels: &[u8]) -> (usize, usize, usize, usize, u64) {
    let (mut l, mut t, mut r, mut b, mut a) = (160, 90, 0, 0, 0u64);
    for (y, row) in pixels.chunks_exact(160 * 4).enumerate() {
        for (x, p) in row.chunks_exact(4).enumerate() {
            a += p[3] as u64;
            if p[3] > 0 {
                l = l.min(x);
                t = t.min(y);
                r = r.max(x);
                b = b.max(y);
            }
        }
    }
    (l, t, r, b, a)
}
#[test]
fn inherited_page_clock_restarts_on_later_page_and_seek_has_no_history() {
    let mut body = only_label(fixture());
    body["scene"]["value"]["nodes"][1]["children"][0]["properties"] = json!({"opacity":{"kind":"expression","expression":{"op":"if","condition":{"op":"call","function":"lt","args":[{"op":"read","path":"time.pageElapsedSeconds"},{"op":"literal","type":"time","value":0.5}]},"then":{"op":"literal","type":"scalar","value":1},"else":{"op":"literal","type":"scalar","value":0}}}});
    let mut p = compile(body);
    let first = p.render(0.1).unwrap();
    assert!(bounds(&first.rgba).4 > 0);
    assert_eq!(bounds(&p.render(0.8).unwrap().rgba).4, 0);
    assert!(bounds(&p.render(2.1).unwrap().rgba).4 > 0);
    assert_eq!(first.rgba, p.render(0.1).unwrap().rgba);
    assert_eq!(first.hits.len(), 1, "label does not add caption hits");
}
#[test]
fn label_font_size_uses_bound_word_clock_without_moving_source_layout() {
    let mut body = only_label(fixture());
    let scene = &mut body["scene"]["value"];
    scene["nodes"][1]["selectorId"] = json!("words");
    scene["nodes"][1]["children"][0]["properties"] = json!({"fontSize":{"kind":"expression","expression":{"op":"call","function":"add","args":[{"op":"literal","type":"length","value":8},{"op":"call","function":"mul","args":[{"op":"literal","type":"length","value":16},{"op":"read","path":"time.clampedProgress"}]}]}}});
    let mut p = compile(body);
    let small = bounds(&p.render(0.05).unwrap().rgba);
    let large = bounds(&p.render(0.7).unwrap().rgba);
    assert!(large.2 - large.0 > small.2 - small.0);
    assert!(large.3 - large.1 > small.3 - small.1);
    // Dynamic size must not silently clamp or produce a shape from invalid input.
    let mut body = only_label(fixture());
    body["scene"]["value"]["nodes"][1]["children"][0]["properties"] = json!({"fontSize":{"kind":"expression","expression":{"op":"literal","type":"length","value":0}}});
    assert!(compile(body).render(0.1).is_err());
}
#[test]
fn own_ink_metrics_control_post_size_pose_and_whitespace_reports_no_ink() {
    let mut body = only_label(fixture());
    body["scene"]["value"]["nodes"][1]["children"][0]["properties"] = json!({"transform.x":{"kind":"expression","expression":{"op":"read","path":"layout.labelWidth"}},"opacity":{"kind":"expression","expression":{"op":"if","condition":{"op":"read","path":"unit.labelInkAvailable"},"then":{"op":"literal","type":"scalar","value":1},"else":{"op":"literal","type":"scalar","value":0}}}});
    let shifted = compile(body.clone()).render(0.1).unwrap();
    let mut base = body.clone();
    base["scene"]["value"]["nodes"][1]["children"][0]["properties"]
        .as_object_mut()
        .unwrap()
        .remove("transform.x");
    assert!(bounds(&shifted.rgba).0 > bounds(&compile(base).render(0.1).unwrap().rgba).0);
    body["scene"]["value"]["nodes"][1]["children"][0]["text"]["text"] = json!("  ");
    assert_eq!(bounds(&compile(body).render(0.1).unwrap().rgba).4, 0);
}
#[test]
fn own_color_font_preserves_rgb_and_applies_node_alpha_once() {
    let mut body = only_label(fixture());
    let label = &mut body["scene"]["value"]["nodes"][1]["children"][0];
    label["text"]["text"] = json!("A");
    label["style"] = json!({"fontFamily":"ColrProbe","fontWeight":400,"fontSize":{"value":48,"basis":"absolute"},"fill":"#00FF00"});
    let mut full = compile(body.clone());
    let opaque = full.render(0.1).unwrap();
    assert!(opaque.rgba.chunks_exact(4).any(|p| p[0] > 100 && p[2] < 20));
    assert!(opaque.rgba.chunks_exact(4).any(|p| p[2] > 100 && p[0] < 20));
    assert!(
        full.record(0.1)
            .unwrap()
            .0
            .ops
            .iter()
            .any(|op| matches!(op, DrawOp::DrawBitmap { .. }))
    );
    body["scene"]["value"]["nodes"][1]["children"][0]["properties"] =
        json!({"opacity":{"kind":"constant","value":0.5}});
    let faded = compile(body).render(0.1).unwrap();
    let a = bounds(&opaque.rgba).4 as f64;
    let b = bounds(&faded.rgba).4 as f64;
    assert!((b / a - 0.5).abs() < 0.02, "opacity ratio {}", b / a);
}
#[test]
fn missing_label_font_is_registered_even_before_that_repeat_is_visible() {
    let mut body = only_label(fixture());
    body["scene"]["value"]["nodes"][1]["children"][0]["style"]["fontFamily"] =
        json!("Missing Label Face");
    let mut p = compile(body);
    assert!(
        p.text
            .take_missing_families()
            .iter()
            .any(|f| f == "Missing Label Face")
    );
}
#[test]
fn repeated_label_shaping_is_charged_even_when_the_shape_cache_hits() {
    let mut body = only_label(fixture());
    let scene = &mut body["scene"]["value"];
    scene["nodes"][1]["selectorId"] = json!("words");
    scene["selectors"][1]
        .as_object_mut()
        .unwrap()
        .remove("filter");
    let mut label = scene["nodes"][1]["children"][0].clone();
    label["text"]["text"] = json!("x".repeat(4096));
    label["style"]["fontSize"] = json!({"value":1,"basis":"absolute"});
    scene["nodes"][1]["children"] = json!([]);
    for i in 0..4 {
        let mut child = label.clone();
        child["id"] = json!(format!("label{i}"));
        scene["nodes"][1]["children"]
            .as_array_mut()
            .unwrap()
            .push(child);
    }
    let error = compile(body)
        .render(0.1)
        .err()
        .expect("label work must exceed its shared budget");
    assert!(
        error.to_string().contains("CAPTION_BUDGET_EXCEEDED"),
        "{error}"
    );
}
#[test]
fn label_font_and_source_style_bindings_both_participate_in_preflight_census() {
    let mut body = only_label(fixture());
    let scene = &mut body["scene"]["value"];
    scene["requiredCapabilities"]
        .as_array_mut()
        .unwrap()
        .extend([
            json!("caption-unit-font-style/1"),
            json!("caption-layout-per-sample/1"),
        ]);
    scene["layout"]["layoutEvaluation"] = json!("per-sample");
    scene["layout"]["fontStyleBindings"] = json!([{"id":"future-face","nodeId":"caption","selectorId":"words","style":{"fontFamily":"Future Source Face","fontWeight":800,"italic":true}}]);
    scene["nodes"][1]["children"][0]["style"]["fontFamily"] = json!("Own Label Face");
    let mut p = compile(body);
    let missing = p.text.take_missing_families();
    assert!(missing.iter().any(|f| f == "Future Source Face"));
    assert!(missing.iter().any(|f| f == "Own Label Face"));
}
#[test]
fn label_font_size_animations_follow_base_property_priority_order() {
    let mut body = only_label(fixture());
    let scene = &mut body["scene"]["value"];
    scene["nodes"][1]["children"][0]["properties"] =
        json!({"fontSize":{"kind":"constant","value":8}});
    scene["animations"] = json!([
        {"id":"add","target":{"nodeId":"pageLabel"},"property":"fontSize","priority":2,"composite":"add","value":{"kind":"constant","value":-4}},
        {"id":"replace","target":{"nodeId":"pageLabel"},"property":"fontSize","priority":1,"composite":"replace","value":{"kind":"constant","value":16}}
    ]);
    let actual = compile(body).render(0.1).unwrap();
    let mut expected = only_label(fixture());
    expected["scene"]["value"]["nodes"][1]["children"][0]["style"]["fontSize"] =
        json!({"value":12,"basis":"absolute"});
    assert_eq!(actual.rgba, compile(expected).render(0.1).unwrap().rgba);
}
