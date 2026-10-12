use caption_scene::*;
use serde_json::{Value, json};

fn body() -> Value {
    let mut body: Value = serde_json::from_str(include_str!("fixtures/word-pop.json")).unwrap();
    body["scene"]["value"]["layout"]["pagination"] = json!({
        "wordLinePattern":[[2,3]], "lastPageRule":{"ifRowCountIs":1,"previousPageLines":[2,4]}
    });
    body["scene"]["value"]["requiredCapabilities"] = json!(["caption-word-line-layout/1"]);
    body
}
#[test]
fn word_line_contract_roundtrips_and_bounds_declared_groups() {
    let style = parse_style(&body()).unwrap();
    assert_eq!(parse_style(&serde_json::to_value(&style).unwrap()).unwrap(), style);
    for pagination in [
        json!({"wordLinePattern":[]}),
        json!({"wordLinePattern":[[]]}),
        json!({"wordLinePattern":[[0]]}),
        json!({"wordLinePattern":[[4097]]}),
        json!({"wordLinePattern":[[1,1,1]]}),
        json!({"wordLinePattern":[[1]],"maxUnitsPerPage":2}),
        json!({"lastPageRule":{"ifRowCountIs":1,"previousPageLines":[2,4]}}),
        json!({"wordLinePattern":[[2,3]],"lastPageRule":{"ifRowCountIs":0,"previousPageLines":[2,4]}}),
        json!({"wordLinePattern":[[2,3]],"lastPageRule":{"ifRowCountIs":1,"previousPageLines":[2,2]}}),
        json!({"wordLinePattern":vec![vec![1];257]}),
    ] {
        let mut input = body();
        input["scene"]["value"]["layout"]["pagination"] = pagination;
        assert!(parse_style(&input).is_err(), "{input}");
    }
}
#[test]
fn legacy_pagination_stays_absent_in_serialized_optional_pattern_fields() {
    let body: Value = serde_json::from_str(include_str!("fixtures/word-pop.json")).unwrap();
    let parsed = parse_style(&body).unwrap();
    let encoded = serde_json::to_value(parsed).unwrap();
    let pagination = &encoded["scene"]["value"]["layout"]["pagination"];
    assert!(pagination.get("wordLinePattern").is_none());
    assert!(pagination.get("lastPageRule").is_none());
    assert_eq!(pagination["maxUnitsPerPage"], 3);
}
