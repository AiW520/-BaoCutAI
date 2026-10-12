use caption_scene::parse_style;
use serde_json::{Value, json};
fn body() -> Value {
    serde_json::from_str(include_str!("fixtures/noise-palette-mix.json")).unwrap()
}
#[test]
fn palette_filter_requires_capabilities_resource_and_explicit_finite_domain() {
    let good = body();
    let style = parse_style(&good).unwrap();
    let serialized = serde_json::to_value(style).unwrap();
    assert_eq!(serialized["scene"]["value"]["materials"], good["scene"]["value"]["materials"]);
    for cap in ["caption-noise-palette-mix/1", "caption-image-png/1"] {
        let mut bad = good.clone();
        bad["scene"]["value"]["requiredCapabilities"]
            .as_array_mut()
            .unwrap()
            .retain(|v| v != cap);
        assert_eq!(parse_style(&bad).unwrap_err().code, "CAPTION_CAPABILITY_REQUIRED");
    }
    for (field, value) in [
        ("paletteResourceId", json!("absent")),
        ("contextNodeId", json!("absent")),
        ("palettePosition", json!({"kind":"constant","value":1.01})),
    ] {
        let mut bad = good.clone();
        bad["scene"]["value"]["materials"][0][field] = value;
        assert!(parse_style(&bad).is_err(), "{field}");
    }
    for (field, n) in [("width", 0.0), ("height", -1.0), ("x", 1_000_001.0)] {
        let mut bad = good.clone();
        bad["scene"]["value"]["materials"][0]["domain"][field] = json!({"kind":"constant","value":n});
        assert!(parse_style(&bad).is_err());
    }
    let mut bad = good;
    bad["scene"]["value"]["materials"][0]["domain"]["width"] =
        json!({"kind":"expression","expression":{"op":"literal","type":"scalar","value":100}});
    assert!(parse_style(&bad).is_err());
}
