use caption_scene::*;
use serde_json::{Value, json};
fn fixture() -> Value {
    serde_json::from_str(include_str!("fixtures/bound-label.json")).unwrap()
}
#[test]
fn label_requires_explicit_capability_static_single_line_and_direct_repeat_parent() {
    parse_style(&fixture()).unwrap();
    for mutation in [
        "cap", "root", "cue", "newline", "child", "state", "geometry", "size", "selector", "resource", "bytes",
    ] {
        let mut body = fixture();
        let scene = &mut body["scene"]["value"];
        match mutation {
            "cap" => scene["requiredCapabilities"]
                .as_array_mut()
                .unwrap()
                .retain(|v| v != "caption-bound-label/1"),
            "root" => {
                let label = scene["nodes"][1]["children"][0].take();
                scene["nodes"].as_array_mut().unwrap().push(label);
            }
            "cue" => scene["nodes"][1]["children"][0]["text"] = json!({"source":"cue"}),
            "newline" => scene["nodes"][1]["children"][0]["text"]["text"] = json!("one\u{2028}two"),
            "child" => scene["nodes"][1]["children"][0]["children"] = json!([{"id":"nested","type":"shape"}]),
            "state" => scene["nodes"][1]["children"][0]["stateStyles"] = json!({"active":{"fill":"#FFFFFF"}}),
            "geometry" => scene["nodes"][1]["children"][0]["properties"]["width"] = json!({"kind":"constant","value":12}),
            "size" => scene["nodes"][0]["properties"] = json!({"fontSize":{"kind":"constant","value":12}}),
            "selector" => scene["selectors"][0]["nodeId"] = json!("pageLabel"),
            "resource" => scene["nodes"][1]["children"][0]["resourceId"] = json!("asset"),
            "bytes" => scene["nodes"][1]["children"][0]["text"]["text"] = json!("x".repeat(4097)),
            _ => unreachable!(),
        }
        assert!(parse_style(&body).is_err(), "accepted {mutation}");
    }
}
#[test]
fn own_label_metrics_are_post_size_and_never_escape_through_function_calls() {
    for path in [
        "layout.labelWidth",
        "layout.labelHeight",
        "layout.labelMaxGlyphInkWidth",
        "layout.labelMaxGlyphInkHeight",
        "unit.labelInkAvailable",
    ] {
        for target in ["size", "text", "layout"] {
            let mut body = fixture();
            let scene = &mut body["scene"]["value"];
            let value = if path.starts_with("unit") {
                json!({"op":"if","condition":{"op":"read","path":path},"then":{"op":"literal","type":"length","value":10},"else":{"op":"literal","type":"length","value":12}})
            } else {
                json!({"op":"read","path":path})
            };
            scene["functions"] = json!([{"id":"ownMetric","arguments":[],"returns":"length","body":value}]);
            let dynamic = json!({"kind":"expression","expression":{"op":"call","function":"ownMetric","args":[]}});
            match target {
                "size" => scene["nodes"][1]["children"][0]["properties"]["fontSize"] = dynamic,
                "text" => scene["nodes"][0]["properties"] = json!({"transform.x":dynamic}),
                "layout" => {
                    scene["layout"]["layoutEvaluation"] = json!("per-sample");
                    scene["requiredCapabilities"]
                        .as_array_mut()
                        .unwrap()
                        .push(json!("caption-layout-per-sample/1"));
                    scene["layout"]["bindings"] = json!([{"property":"x","value":dynamic}]);
                }
                _ => unreachable!(),
            }
            assert!(parse_style(&body).is_err(), "accepted {path} on {target}");
        }
    }
    for value in [0.0, -1.0, 4097.0] {
        let mut body = fixture();
        body["scene"]["value"]["nodes"][1]["children"][0]["properties"]["fontSize"] = json!({"kind":"constant","value":value});
        assert!(parse_style(&body).is_err());
    }
}
