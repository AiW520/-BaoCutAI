use caption_scene::parse_style;
use serde_json::{Value, json};

fn gaussian() -> Value {
    serde_json::from_str(include_str!("fixtures/gaussian-axis.json")).unwrap()
}
fn glow() -> Value {
    serde_json::from_str(include_str!("fixtures/glow-cascade.json")).unwrap()
}
#[test]
fn component_material_capabilities_and_finite_uniform_contracts_are_explicit() {
    for body in [gaussian(), glow()] {
        parse_style(&body).unwrap();
        let mut bad = body;
        bad["scene"]["value"]["requiredCapabilities"] = json!([]);
        assert_eq!(parse_style(&bad).unwrap_err().code, "CAPTION_CAPABILITY_REQUIRED");
    }
    for (field, value) in [("samples", 1025.), ("samples", -1.), ("stepUv", 1.1), ("sigmaUv", -1.)] {
        let mut bad = gaussian();
        bad["scene"]["value"]["materials"][0][field] = json!({"kind":"constant","value":value});
        assert!(parse_style(&bad).is_err(), "{field}");
    }
    for gamma in [0.0, 8.01] {
        let mut bad = gaussian();
        bad["scene"]["value"]["materials"][0]["gamma"] = json!(gamma);
        assert!(parse_style(&bad).is_err());
    }
    let mut bad = gaussian();
    bad["scene"]["value"]["materials"][0]["samples"] = json!({"kind":"constant","value":1});
    bad["scene"]["value"]["materials"][0]["sigmaUv"] = json!({"kind":"constant","value":0});
    assert!(parse_style(&bad).is_err());
    bad["scene"]["value"]["materials"][0]["samples"] = json!({"kind":"constant","value":0});
    parse_style(&bad).unwrap();
}
#[test]
fn cascade_limits_reject_unbounded_surfaces_and_unrelated_visual_content() {
    for scale in [
        json!({"num":0,"den":1}),
        json!({"num":1,"den":0}),
        json!({"num":2,"den":1}),
        json!({"num":1,"den":4097}),
    ] {
        let mut bad = glow();
        bad["scene"]["value"]["materials"][0]["levels"][0]["horizontal"]["scale"] = scale;
        assert!(parse_style(&bad).is_err());
    }
    for count in [0, 8] {
        let mut bad = glow();
        let level = bad["scene"]["value"]["materials"][0]["levels"][0].clone();
        bad["scene"]["value"]["materials"][0]["levels"] = Value::Array(vec![level; count]);
        assert!(parse_style(&bad).is_err());
    }
    let mut bad = glow();
    bad["scene"]["value"]["nodes"]
        .as_array_mut()
        .unwrap()
        .push(json!({"id":"other","type":"text"}));
    assert!(parse_style(&bad).is_err());
    let mut bad = gaussian();
    bad["scene"]["value"]["materials"][0]["contextNodeId"] = json!("missing");
    assert!(parse_style(&bad).is_err());
}
