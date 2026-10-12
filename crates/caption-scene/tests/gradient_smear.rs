use caption_scene::parse_style;
use serde_json::{Value, json};
fn fixture() -> Value {
    serde_json::from_str(include_str!("fixtures/gradient-smear.json")).unwrap()
}
#[test]
fn smear_requires_explicit_capability_context_units_and_finite_settings() {
    let v = fixture();
    let style = parse_style(&v).unwrap();
    assert_eq!(parse_style(&serde_json::to_value(&style).unwrap()).unwrap(), style);
    let mut bad = v.clone();
    bad["scene"]["value"]["requiredCapabilities"] = json!([]);
    assert_eq!(parse_style(&bad).unwrap_err().code, "CAPTION_CAPABILITY_REQUIRED");
    for (pointer, value) in [
        ("/rectScale/0", json!({"kind":"constant","value":0})),
        ("/strength/0", json!({"kind":"constant","value":17})),
        ("/seed", json!({"kind":"constant","value":100001})),
        ("/stretch", json!({"kind":"constant","value":-3})),
        ("/progress", json!({"kind":"constant","value":1.1})),
        ("/noise/complexity", json!(11)),
        ("/noise/subScale", json!(0)),
        ("/noise/scale2/0", json!(0)),
        ("/noise/subImpact", json!(1.1)),
        ("/contextNodeId", json!("absent")),
        ("/uvY", json!("auto")),
        ("/domain/height", json!({"kind":"constant","value":0})),
        (
            "/evolution",
            json!({"kind":"expression","expression":{"op":"literal","type":"time","value":1}}),
        ),
    ] {
        let mut bad = v.clone();
        *bad["scene"]["value"]["materials"][0].pointer_mut(pointer).unwrap() = value;
        assert!(parse_style(&bad).is_err(), "{pointer}");
    }
    let mut bad = v.clone();
    bad["scene"]["value"]["materials"][0]["samples"] = json!(64);
    assert!(parse_style(&bad).is_err(), "tap count is fixed");
    let mut bad = v;
    bad["scene"]["value"]["nodes"]
        .as_array_mut()
        .unwrap()
        .push(json!({"id":"extra","type":"shape"}));
    assert!(parse_style(&bad).is_err(), "requires sole visual text");
}
