use caption_scene::*;
use serde_json::{Value, json};
fn fixture() -> Value {
    serde_json::from_str(include_str!("fixtures/unit-font-size.json")).unwrap()
}
#[test]
fn unit_font_size_contract_roundtrips_and_requires_frozen_sampled_layout() {
    let body = fixture();
    let style = parse_style(&body).unwrap();
    assert_eq!(parse_style(&serde_json::to_value(&style).unwrap()).unwrap(), style);
    for (path, value) in [
        (
            "/scene/value/requiredCapabilities",
            json!(["caption-word-line-layout/1", "caption-glyph-envelope/1"]),
        ),
        ("/scene/value/layout/layoutEvaluation", json!("static")),
        ("/scene/value/layout/pagination", json!({"maxUnitsPerPage":3})),
        ("/scene/value/layout/fontSizeBindings/0/value/value", json!(0)),
        ("/scene/value/layout/fontSizeBindings/0/value/value", json!(4097)),
        ("/scene/value/layout/fontSizeBindings/0/selectorId", json!("absent")),
        ("/scene/value/layout/fontSizeBindings/0/nodeId", json!("absent")),
        ("/scene/value/layout/fontSizeBindings/1/id", json!("page-base")),
        ("/scene/value/selectors/0/unit", json!("grapheme")),
    ] {
        let mut bad = body.clone();
        *bad.pointer_mut(path).unwrap() = value;
        assert!(parse_style(&bad).is_err(), "{path}");
    }
    let mut bad = body;
    let bindings = bad["scene"]["value"]["layout"]["fontSizeBindings"].as_array_mut().unwrap();
    let mut repeated = bindings[0].clone();
    for i in 0..64 {
        repeated["id"] = json!(format!("extra-{i}"));
        bindings.push(repeated.clone());
    }
    assert!(parse_style(&bad).is_err());
}
#[test]
fn sizing_rejects_geometry_and_envelope_availability_even_through_functions() {
    for path in [
        "layout.width",
        "layout.inkHeight",
        "layout.firstInkLeft",
        "unit.lineEnvelopeAvailable",
        "unit.rangeInkAvailable",
    ] {
        let mut body = fixture();
        let read = json!({"op":"read","path":path});
        let body_expr = if path.starts_with("unit.") {
            json!({"op":"if","condition":read,"then":{"op":"literal","type":"length","value":12},"else":{"op":"literal","type":"length","value":20}})
        } else {
            read
        };
        body["scene"]["value"]["functions"] = json!([{"id":"hidden","arguments":[],"returns":"length","body":body_expr}]);
        body["scene"]["value"]["layout"]["fontSizeBindings"][0]["value"] =
            json!({"kind":"expression","expression":{"op":"call","function":"hidden","args":[]}});
        assert_eq!(parse_style(&body).unwrap_err().code, "CAPTION_DEPENDENCY_CYCLE", "{path}");
    }
}
#[test]
fn font_size_bindings_accept_semantic_counts_and_reject_wrong_type_or_finer_clocks() {
    let mut body = fixture();
    body["scene"]["value"]["layout"]["fontSizeBindings"][0]["value"] = json!({"kind":"expression","expression":{"op":"call","function":"mul","args":[{"op":"literal","type":"length","value":12},{"op":"read","path":"unit.selectedCount"}]}});
    parse_style(&body).unwrap();
    body["scene"]["value"]["layout"]["fontSizeBindings"][0]["value"] =
        json!({"kind":"expression","expression":{"op":"literal","type":"scalar","value":12}});
    assert!(parse_style(&body).is_err());
    let mut body = fixture();
    body["scene"]["value"]["layout"]["fontSizeBindings"][2]["value"]["clock"]["unit"] = json!("grapheme");
    assert!(parse_style(&body).is_err());
}
#[test]
fn empty_size_bindings_preserve_legacy_serialized_schema() {
    let body: Value = serde_json::from_str(include_str!("fixtures/word-pop.json")).unwrap();
    let style = parse_style(&body).unwrap();
    assert!(style.scene().layout.font_size_bindings.is_empty());
    assert!(
        serde_json::to_value(&style).unwrap()["scene"]["value"]["layout"]
            .get("fontSizeBindings")
            .is_none()
    );
}
