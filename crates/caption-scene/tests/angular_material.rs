use caption_scene::parse_style;
use serde_json::{Value, json};
fn fixture() -> Value {
    serde_json::from_str(include_str!("fixtures/angular-sample-blend.json")).unwrap()
}
#[test]
fn angular_material_has_strict_context_capability_units_and_bounds() {
    let value = fixture();
    let style = parse_style(&value).unwrap();
    let encoded = serde_json::to_value(&style).unwrap();
    assert_eq!(parse_style(&encoded).unwrap(), style);
    assert_eq!(
        encoded["scene"]["value"]["materials"][0]["domain"],
        value["scene"]["value"]["materials"][0]["domain"]
    );
    let mut missing = value.clone();
    missing["scene"]["value"]["requiredCapabilities"] = json!([]);
    assert_eq!(parse_style(&missing).unwrap_err().code, "CAPTION_CAPABILITY_REQUIRED");
    for (key, n) in [("aspect", 0.0), ("aspect", 10_001.0), ("angle", 10_001.0)] {
        let mut bad = value.clone();
        bad["scene"]["value"]["materials"][0][key] = json!({"kind":"constant","value":n});
        assert!(parse_style(&bad).is_err(), "{key}");
    }
    for key in ["width", "height"] {
        let mut bad = value.clone();
        bad["scene"]["value"]["materials"][0]["domain"][key] = json!({"kind":"constant","value":0});
        assert!(parse_style(&bad).is_err());
    }
    let mut bad = value.clone();
    bad["scene"]["value"]["materials"][0]["angle"] = json!({"kind":"expression","expression":{"op":"literal","type":"scalar","value":0.2}});
    assert!(parse_style(&bad).is_err());
    let mut bad = value.clone();
    bad["scene"]["value"]["materials"][0]["contextNodeId"] = json!("absent");
    assert!(parse_style(&bad).is_err());
    let mut bad = value;
    bad["scene"]["value"]["materials"][0]["samples"] = json!(59);
    assert!(parse_style(&bad).is_err(), "tap count cannot be changed");
}
