//! Acceptance boundaries for independent surfaces and frozen image sequences.
use caption_scene::parse_style;
use serde_json::{Value, json};
fn c(value: f64) -> Value {
    json!({"kind":"constant","value":value})
}
fn domain() -> Value {
    json!({"x":c(0.0),"y":c(0.0),"width":c(96.0),"height":c(48.0)})
}
fn frame(id: &str) -> Value {
    json!({"id":id,"assetRef":{"id":id,"revision":"1"},"contentHash":format!("sha256:{}","a".repeat(64))})
}
fn fixture() -> Value {
    json!({"schema":"baocut.caption-scene-style/1","scene":{"kind":"inline","value":{
        "schema":"baocut.caption-scene/1","evaluationVersion":1,
        "requiredCapabilities":["caption-render-layers/1","caption-image-sequence/1","caption-noisy-sweep/1"],
        "layout":{"x":{"value":48,"basis":"absolute"},"y":{"value":24,"basis":"absolute"},"width":{"value":90,"basis":"absolute"}},
        "nodes":[{"id":"text","type":"text","style":{"fontFamily":"Noto Sans SC","fontSize":{"value":14,"basis":"absolute"}}}],
        "sequences":[{"id":"frames","frames":[frame("f0"),frame("f1")],"premultiply":"rounded"}],
        "renderLayers":[
            {"id":"sprite","source":{"kind":"image-sequence","contextNodeId":"text","sequenceId":"frames","frame":c(0.0),"domain":domain(),"uvScale":[1,1],"uvOffset":[0,0]},"materials":[],"blend":"screen"},
            {"id":"letters","source":{"kind":"nodes","nodeIds":["text"]},"materials":[{"kind":"noisy-sweep","id":"edge","contextNodeId":"text","domain":domain(),"position":c(0.5),"maskScale":[1,1],"reveal":true,"uvY":"up"}],"blend":"source-over"}
        ]
    }}})
}
#[test]
fn explicit_surface_and_sequence_capabilities_roundtrip_and_allow_shared_root_selection() {
    let original = fixture();
    let parsed = parse_style(&original).unwrap();
    parse_style(&serde_json::to_value(parsed).unwrap()).unwrap();
    let mut body = fixture();
    body["scene"]["value"]["renderLayers"][0]["source"] = json!({"kind":"nodes","nodeIds":["text"]});
    parse_style(&body).unwrap(); // The same root may intentionally feed two separate surfaces.
    for cap in ["caption-render-layers/1", "caption-image-sequence/1", "caption-noisy-sweep/1"] {
        let mut body = fixture();
        body["scene"]["value"]["requiredCapabilities"]
            .as_array_mut()
            .unwrap()
            .retain(|v| v != cap);
        assert!(parse_style(&body).is_err(), "missing {cap} was accepted");
    }
}
#[test]
fn global_materials_and_bad_layer_topology_are_rejected() {
    for case in [
        "global",
        "duplicate-layer",
        "too-many",
        "empty-roots",
        "duplicate-root",
        "unknown-root",
        "non-root",
        "unknown-blend",
        "unknown-source",
        "too-many-materials",
    ] {
        let mut body = fixture();
        let scene = &mut body["scene"]["value"];
        match case {
            "global" => scene["materials"] = json!([{"kind":"blur","id":"global","radius":c(1.0),"passes":1}]),
            "duplicate-layer" => scene["renderLayers"][1]["id"] = json!("sprite"),
            "too-many" => {
                let layer = scene["renderLayers"][0].clone();
                scene["renderLayers"] = Value::Array(
                    (0..9)
                        .map(|i| {
                            let mut l = layer.clone();
                            l["id"] = json!(format!("l{i}"));
                            l
                        })
                        .collect(),
                );
            }
            "empty-roots" => scene["renderLayers"][1]["source"]["nodeIds"] = json!([]),
            "duplicate-root" => scene["renderLayers"][1]["source"]["nodeIds"] = json!(["text", "text"]),
            "unknown-root" => scene["renderLayers"][1]["source"]["nodeIds"] = json!(["absent"]),
            "non-root" => {
                let text = scene["nodes"][0].take();
                scene["nodes"] = json!([{"id":"group","type":"group","children":[text]}]);
            }
            "unknown-blend" => scene["renderLayers"][0]["blend"] = json!("multiply"),
            "unknown-source" => scene["renderLayers"][0]["source"]["kind"] = json!("script"),
            "too-many-materials" => {
                scene["renderLayers"][1]["materials"] = Value::Array(
                    (0..9)
                        .map(|i| json!({"kind":"blur","id":format!("blur{i}"),"radius":c(1.0),"passes":1}))
                        .collect(),
                )
            }
            _ => unreachable!(),
        }
        assert!(parse_style(&body).is_err(), "accepted {case}");
    }
}
#[test]
fn sequence_identity_frame_type_and_sampling_domain_fail_closed() {
    for case in [
        "empty",
        "many-frames",
        "duplicate-sequence",
        "duplicate-frame",
        "bad-hash",
        "bad-ref",
        "premultiply",
        "missing-sequence",
        "missing-context",
        "frame-high",
        "frame-negative",
        "frame-type",
        "domain-zero",
        "uv-zero",
        "uv-offset",
        "mask-zero",
        "position-range",
    ] {
        let mut body = fixture();
        let scene = &mut body["scene"]["value"];
        match case {
            "empty" => scene["sequences"][0]["frames"] = json!([]),
            "many-frames" => scene["sequences"][0]["frames"] = Value::Array((0..257).map(|i| frame(&format!("f{i}"))).collect()),
            "duplicate-sequence" => {
                let q = scene["sequences"][0].clone();
                scene["sequences"].as_array_mut().unwrap().push(q);
            }
            "duplicate-frame" => scene["sequences"][0]["frames"][1]["id"] = json!("f0"),
            "bad-hash" => scene["sequences"][0]["frames"][0]["contentHash"] = json!("sha256:BAD"),
            "bad-ref" => scene["sequences"][0]["frames"][0]["assetRef"]["revision"] = json!(""),
            "premultiply" => scene["sequences"][0]["premultiply"] = json!("automatic"),
            "missing-sequence" => scene["renderLayers"][0]["source"]["sequenceId"] = json!("absent"),
            "missing-context" => scene["renderLayers"][0]["source"]["contextNodeId"] = json!("absent"),
            "frame-high" => scene["renderLayers"][0]["source"]["frame"] = c(2.0),
            "frame-negative" => scene["renderLayers"][0]["source"]["frame"] = c(-1.0),
            "frame-type" => {
                scene["renderLayers"][0]["source"]["frame"] =
                    json!({"kind":"expression","expression":{"op":"literal","type":"time","value":0}})
            }
            "domain-zero" => scene["renderLayers"][0]["source"]["domain"]["width"] = c(0.0),
            "uv-zero" => scene["renderLayers"][0]["source"]["uvScale"] = json!([0, 1]),
            "uv-offset" => scene["renderLayers"][0]["source"]["uvOffset"] = json!([1025, 0]),
            "mask-zero" => scene["renderLayers"][1]["materials"][0]["maskScale"] = json!([1, 0]),
            "position-range" => scene["renderLayers"][1]["materials"][0]["position"] = c(1025.0),
            _ => unreachable!(),
        }
        assert!(parse_style(&body).is_err(), "accepted {case}");
    }
}
#[test]
fn component_context_is_scoped_to_each_layer_not_the_whole_scene() {
    let mut body = fixture();
    let scene = &mut body["scene"]["value"];
    let mut other = scene["nodes"][0].clone();
    other["id"] = json!("other");
    scene["nodes"].as_array_mut().unwrap().push(other);
    let first = scene["renderLayers"][1].clone();
    let mut second = first.clone();
    second["id"] = json!("other-layer");
    second["source"]["nodeIds"] = json!(["other"]);
    second["materials"][0]["id"] = json!("other-mask");
    second["materials"][0]["contextNodeId"] = json!("other");
    scene["renderLayers"] = json!([first, second]);
    parse_style(&body).expect("another layer's Text must not break this layer's single-Text component scope");
    let mut crossing = body.clone();
    crossing["scene"]["value"]["renderLayers"][0]["materials"][0]["contextNodeId"] = json!("other");
    assert!(parse_style(&crossing).is_err(), "cross-layer context must not pass validation");
    let mut mixed = body;
    mixed["scene"]["value"]["renderLayers"][0]["source"]["nodeIds"] = json!(["text", "other"]);
    assert!(
        parse_style(&mixed).is_err(),
        "component single-Text restriction still applies inside a selected surface"
    );
}
#[test]
fn sequence_material_must_use_its_explicit_reference_text_even_with_other_roots_present() {
    let mut body = fixture();
    let scene = &mut body["scene"]["value"];
    let mut other = scene["nodes"][0].clone();
    other["id"] = json!("other");
    scene["nodes"].as_array_mut().unwrap().push(other);
    scene["renderLayers"][0]["materials"] = json!([{"kind":"noisy-sweep","id":"sequence-mask","contextNodeId":"text","domain":domain(),"position":c(0.5),"maskScale":[1,1],"reveal":true,"uvY":"up"}]);
    parse_style(&body).unwrap();
    body["scene"]["value"]["renderLayers"][0]["materials"][0]["contextNodeId"] = json!("other");
    assert!(parse_style(&body).is_err());
}
