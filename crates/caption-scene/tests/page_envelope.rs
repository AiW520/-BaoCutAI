use caption_scene::*;
use serde_json::{Value, json};
use std::collections::BTreeMap;

fn fixture() -> Value {
    serde_json::from_str(include_str!("fixtures/page-envelope.json")).unwrap()
}
#[test]
fn page_envelope_reads_are_typed_and_require_explicit_capability() {
    let body = fixture();
    let style = parse_style(&body).unwrap();
    assert_eq!(parse_style(&serde_json::to_value(&style).unwrap()).unwrap(), style);
    for (path, ty) in [
        ("layout.pageEnvelopeY", ValueType::Length),
        ("layout.pageEnvelopeHeight", ValueType::Length),
        ("layout.pageMaxFontSize", ValueType::Length),
        ("unit.pageLineCount", ValueType::Scalar),
        ("unit.pageEnvelopeAvailable", ValueType::Bool),
    ] {
        let read = Expression::Read { path: path.into() };
        assert_eq!(infer(&read, style.scene(), &BTreeMap::new()).unwrap(), ty);
        let mut scene = style.scene().clone();
        scene.required_capabilities.retain(|c| c != "caption-page-envelope/1");
        assert_eq!(
            infer(&read, &scene, &BTreeMap::new()).unwrap_err().code,
            "CAPTION_CAPABILITY_UNAVAILABLE"
        );
    }
}
#[test]
fn page_envelope_cannot_feed_layout_or_font_sizing_even_through_functions() {
    for path in [
        "layout.pageEnvelopeY",
        "layout.pageEnvelopeHeight",
        "layout.pageMaxFontSize",
        "unit.pageLineCount",
        "unit.pageEnvelopeAvailable",
    ] {
        for sizing in [false, true] {
            let mut body: Value = serde_json::from_str(include_str!("fixtures/unit-font-size.json")).unwrap();
            body["scene"]["value"]["requiredCapabilities"]
                .as_array_mut()
                .unwrap()
                .push(json!("caption-page-envelope/1"));
            let read = json!({"op":"read","path":path});
            let expr = if path == "unit.pageEnvelopeAvailable" {
                json!({"op":"if","condition":read,"then":{"op":"literal","type":"length","value":10},"else":{"op":"literal","type":"length","value":20}})
            } else if path == "unit.pageLineCount" {
                json!({"op":"call","function":"mul","args":[read,{"op":"literal","type":"length","value":10}]})
            } else {
                read
            };
            body["scene"]["value"]["functions"] = json!([{"id":"hidden","arguments":[],"returns":"length","body":expr}]);
            let value = json!({"kind":"expression","expression":{"op":"call","function":"hidden","args":[]}});
            if sizing {
                body["scene"]["value"]["layout"]["fontSizeBindings"][0]["value"] = value;
            } else {
                body["scene"]["value"]["layout"]["bindings"] = json!([{"property":"width","value":value}]);
            }
            assert_eq!(
                parse_style(&body).unwrap_err().code,
                "CAPTION_DEPENDENCY_CYCLE",
                "{path}, sizing={sizing}"
            );
        }
    }
}
