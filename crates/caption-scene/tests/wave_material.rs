use caption_scene::parse_style;
use serde_json::{Value, json};
fn fixture() -> Value {
    serde_json::from_str(include_str!("fixtures/wave-displace.json")).unwrap()
}
#[test]
fn wave_material_roundtrips_and_rejects_invalid_constants_and_types() {
    let body = fixture();
    let style = parse_style(&body).unwrap();
    assert_eq!(parse_style(&serde_json::to_value(&style).unwrap()).unwrap(), style);
    for (property, value) in [
        ("amplitude", -257.0),
        ("amplitude", 257.0),
        ("wavelength", 0.0),
        ("wavelength", 0.5),
        ("wavelength", 1_000_001.0),
    ] {
        let mut invalid = body.clone();
        invalid["scene"]["value"]["materials"][0][property] = json!({"kind":"constant", "value":value});
        assert!(parse_style(&invalid).is_err(), "{property}={value}");
    }
    let mut invalid = body.clone();
    invalid["scene"]["value"]["materials"][0]["axis"] = json!("z");
    assert!(parse_style(&invalid).is_err());
    invalid = body;
    invalid["scene"]["value"]["materials"][0]["phase"] =
        json!({"kind":"expression","expression":{"op":"literal","type":"length","value":1}});
    assert!(parse_style(&invalid).is_err());
}
