use caption_scene::*;
use serde_json::{Value, json};
use std::collections::BTreeMap;
fn fixture() -> Value {
    serde_json::from_str(include_str!("fixtures/glyph-envelope.json")).unwrap()
}
#[test]
fn glyph_envelope_requires_explicit_capability_and_preserves_typed_reads() {
    let body = fixture();
    let style = parse_style(&body).unwrap();
    for path in [
        "layout.lineEnvelopeY",
        "layout.lineEnvelopeHeight",
        "layout.firstInkLeft",
        "layout.lastInkRight",
        "unit.lineEnvelopeAvailable",
        "unit.rangeInkAvailable",
    ] {
        let read = Expression::Read { path: path.into() };
        let expected = if path.starts_with("unit.") {
            ValueType::Bool
        } else {
            ValueType::Length
        };
        assert_eq!(infer(&read, style.scene(), &BTreeMap::new()).unwrap(), expected);
        for dag in [false, true] {
            let mut scene = style.scene().clone();
            scene.required_capabilities.clear();
            if dag {
                scene.required_capabilities.push("caption-function-dag/1".into());
            }
            assert_eq!(
                infer(&read, &scene, &BTreeMap::new()).unwrap_err().code,
                "CAPTION_CAPABILITY_UNAVAILABLE"
            );
        }
    }
    let mut missing = body;
    missing["scene"]["value"]["requiredCapabilities"] = json!([]);
    assert_eq!(parse_style(&missing).unwrap_err().code, "CAPTION_CAPABILITY_UNAVAILABLE");
}
#[test]
fn glyph_envelope_cannot_feed_pre_layout_bindings() {
    let mut body = fixture();
    let layout = &mut body["scene"]["value"]["layout"];
    layout["layoutEvaluation"] = json!("per-sample");
    layout["bindings"] =
        json!([{"property":"width","value":{"kind":"expression","expression":{"op":"read","path":"layout.firstInkLeft"}}}]);
    assert_eq!(parse_style(&body).unwrap_err().code, "CAPTION_DEPENDENCY_CYCLE");
}
