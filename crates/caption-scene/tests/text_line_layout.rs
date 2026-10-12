use caption_scene::*;
use serde_json::{Value, json};
fn body() -> Value {
    serde_json::from_str(include_str!("fixtures/text-line-layout.json")).unwrap()
}
#[test]
fn text_line_contract_requires_an_explicit_count_unit_and_bounded_exclusive_plan() {
    let style = parse_style(&body()).unwrap();
    assert_eq!(parse_style(&serde_json::to_value(&style).unwrap()).unwrap(), style);
    for unit in ["unicode-scalar", "grapheme"] {
        let mut input = body();
        input["scene"]["value"]["layout"]["pagination"]["textLinePattern"]["unit"] = json!(unit);
        parse_style(&input).unwrap();
    }
    for pattern in [
        json!({"unit":"utf16","lines":[[2]]}),
        json!({"lines":[[2]]}),
        json!({"unit":"grapheme","lines":[]}),
        json!({"unit":"grapheme","lines":[[]]}),
        json!({"unit":"grapheme","lines":[[0]]}),
        json!({"unit":"grapheme","lines":[[65537]]}),
        json!({"unit":"grapheme","lines":[[2,2,2]]}),
        json!({"unit":"grapheme","lines":vec![vec![1];257]}),
    ] {
        let mut input = body();
        input["scene"]["value"]["layout"]["pagination"]["textLinePattern"] = pattern;
        assert!(parse_style(&input).is_err(), "{input}");
    }
    for (field, value) in [
        ("wordLinePattern", json!([[2]])),
        ("maxUnitsPerPage", json!(2)),
        ("lastPageRule", json!({"ifRowCountIs":1,"previousPageLines":[3]})),
    ] {
        let mut input = body();
        input["scene"]["value"]["layout"]["pagination"][field] = value;
        assert!(parse_style(&input).is_err(), "{field}");
    }
    let mut input = body();
    input["scene"]["value"]["requiredCapabilities"] = json!([]);
    assert_eq!(parse_style(&input).unwrap_err().code, "CAPTION_CAPABILITY_UNAVAILABLE");
    let mut input = body();
    input["scene"]["value"]["layout"]["pagination"]["unit"] = json!("grapheme");
    assert!(
        parse_style(&input).is_err(),
        "counting units do not replace semantic word membership"
    );
}
#[test]
fn legacy_word_pagination_does_not_serialize_a_text_pattern() {
    let input: Value = serde_json::from_str(include_str!("fixtures/word-pop.json")).unwrap();
    let output = serde_json::to_value(parse_style(&input).unwrap()).unwrap();
    assert!(output["scene"]["value"]["layout"]["pagination"].get("textLinePattern").is_none());
    assert_eq!(output["scene"]["value"]["layout"]["pagination"]["maxUnitsPerPage"], 3);
}
