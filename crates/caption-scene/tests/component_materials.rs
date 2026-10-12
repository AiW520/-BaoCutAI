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

#[test]
fn glow_tint_is_optional_color_and_keeps_the_existing_page_context_contract() {
    let old = glow();
    let parsed = parse_style(&old).unwrap();
    let serialized = serde_json::to_value(&parsed).unwrap();
    assert!(serialized["scene"]["value"]["materials"][0].get("glowTint").is_none());
    let mut tinted = old.clone();
    tinted["scene"]["value"]["requiredCapabilities"]
        .as_array_mut()
        .unwrap()
        .push(json!("caption-glow-tint/1"));
    let mut missing = old.clone();
    missing["scene"]["value"]["materials"][0]["glowTint"] = json!({"kind":"constant","value":"#FFFFFF"});
    assert_eq!(parse_style(&missing).unwrap_err().code, "CAPTION_CAPABILITY_REQUIRED");
    for color in ["#FFFFFFFF", "#00FF8000"] {
        let mut body = tinted.clone();
        body["scene"]["value"]["materials"][0]["glowTint"] = json!({"kind":"constant","value":color});
        let parsed = parse_style(&body).unwrap();
        assert_eq!(
            serde_json::to_value(parsed).unwrap()["scene"]["value"]["materials"][0]["glowTint"]["value"],
            color
        );
    }
    for value in [json!(0.5), json!([1, 1, 1, 1]), json!("red"), json!("#GG0000")] {
        let mut body = tinted.clone();
        body["scene"]["value"]["materials"][0]["glowTint"] = json!({"kind":"constant","value":value});
        assert!(parse_style(&body).is_err());
    }
    let mut null = tinted.clone();
    null["scene"]["value"]["materials"][0]["glowTint"] = Value::Null;
    assert!(parse_style(&null).is_err());
    let mut body = tinted;
    body["scene"]["value"]["materials"][0]["glowTint"] =
        json!({"kind":"expression","expression":{"op":"literal","type":"scalar","value":1}});
    assert!(parse_style(&body).is_err());
    body["scene"]["value"]["materials"][0]["glowTint"] = json!({"kind":"expression","expression":{"op":"if","condition":{"op":"call","function":"gt","args":[{"op":"read","path":"layout.lineEnvelopeHeight"},{"op":"literal","type":"length","value":1}]},"then":{"op":"literal","type":"color","value":"#FF0000"},"else":{"op":"literal","type":"color","value":"#00FF00"}}});
    // Legacy ink fields are readable without a separate field gate. The newer
    // envelope fields explicitly require their capability in both infer paths.
    assert_eq!(parse_style(&body).unwrap_err().code, "CAPTION_CAPABILITY_UNAVAILABLE");
    body["scene"]["value"]["requiredCapabilities"]
        .as_array_mut()
        .unwrap()
        .push(json!("caption-glyph-envelope/1"));
    parse_style(&body).unwrap();
    body["scene"]["value"]["materials"][0]["contextNodeId"] = json!("missing");
    assert!(parse_style(&body).is_err());
    body["scene"]["value"]["materials"][0]["contextNodeId"] = json!("caption");
    body["scene"]["value"]["requiredCapabilities"] = json!(["caption-glyph-envelope/1"]);
    assert_eq!(parse_style(&body).unwrap_err().code, "CAPTION_CAPABILITY_REQUIRED");
}

#[test]
fn glow_color_matrix_has_its_own_capability_and_exact_finite_row_major_shape() {
    use caption_scene::{CaptionMaterial, SceneSource, validate_scene};
    let original = glow();
    let old = serde_json::to_value(parse_style(&original).unwrap()).unwrap();
    assert!(old["scene"]["value"]["materials"][0].get("glowColorMatrix").is_none());
    let identity = json!([1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0]);
    let mut body = original;
    body["scene"]["value"]["materials"][0]["glowColorMatrix"] = identity.clone();
    assert_eq!(parse_style(&body).unwrap_err().code, "CAPTION_CAPABILITY_REQUIRED");
    body["scene"]["value"]["requiredCapabilities"]
        .as_array_mut()
        .unwrap()
        .push(json!("caption-glow-color-matrix/1"));
    assert_eq!(
        serde_json::to_value(parse_style(&body).unwrap()).unwrap()["scene"]["value"]["materials"][0]["glowColorMatrix"],
        identity
    );
    for invalid in [
        Value::Null,
        json!([1, 0, 0]),
        json!([1, 0, 0, 0, 1, 0, 0, 0, 1, 0]),
        json!([1, 0, 0, 0, 1, 0, 0, 0, "1"]),
        json!({"kind":"constant","value":[1,0,0,0,1,0,0,0,1]}),
    ] {
        let mut bad = body.clone();
        bad["scene"]["value"]["materials"][0]["glowColorMatrix"] = invalid;
        assert!(parse_style(&bad).is_err());
    }
    let mut typed = parse_style(&body).unwrap();
    let SceneSource::Inline { value: scene } = &mut typed.scene;
    let CaptionMaterial::GlowCascade { glow_color_matrix, .. } = &mut scene.materials[0] else {
        unreachable!()
    };
    *glow_color_matrix = Some([f64::INFINITY; 9]);
    assert!(validate_scene(scene).is_err());
}
