use caption_scene::*;
use serde_json::{Value, json};
fn body() -> Value {
    serde_json::from_str(include_str!("fixtures/scalar-cluster-layout.json")).unwrap()
}
#[test]
fn scalar_cluster_contract_requires_rules_and_both_capabilities() {
    let style = parse_style(&body()).unwrap();
    assert_eq!(parse_style(&serde_json::to_value(&style).unwrap()).unwrap(), style);
    let mut empty = body();
    empty["scene"]["value"]["layout"]["pagination"]["textLinePattern"]["clusterRules"] = json!({});
    parse_style(&empty).unwrap();
    for unit in ["unicode-scalar", "grapheme"] {
        let mut input = body();
        input["scene"]["value"]["layout"]["pagination"]["textLinePattern"]["unit"] = json!(unit);
        assert!(parse_style(&input).is_err());
    }
    let mut input = body();
    input["scene"]["value"]["layout"]["pagination"]["textLinePattern"]
        .as_object_mut()
        .unwrap()
        .remove("clusterRules");
    assert!(parse_style(&input).is_err());
    for absent in ["caption-text-line-layout/1", "caption-scalar-cluster-layout/1"] {
        let mut input = body();
        input["scene"]["value"]["requiredCapabilities"]
            .as_array_mut()
            .unwrap()
            .retain(|v| v != absent);
        assert_eq!(parse_style(&input).unwrap_err().code, "CAPTION_CAPABILITY_UNAVAILABLE");
    }
}
#[test]
fn scalar_cluster_ranges_reject_surrogates_invalid_bounds_and_unbounded_tables() {
    for rules in [
        json!({"attachments":[{"next":[]}]}),
        json!({"attachments":[{"next":[[2,1]]}]}),
        json!({"attachments":[{"next":[[0xd800,0xd800]]}]}),
        json!({"attachments":[{"next":[[0xd7ff,0xe000]]}]}),
        json!({"consumeFollowingAfter":[[0x110000,0x110000]]}),
        json!({"joiners":[0xdfff]}),
        json!({"joiners":[0x110000]}),
        json!({"joiners":vec![43;33]}),
        json!({"attachments":vec![json!({"next":[[33,33]]});33]}),
        json!({"attachments":[{"next":vec![[33,33];33]}]}),
        json!({"attachments":vec![json!({"next":vec![[33,33];32]});9]}),
    ] {
        let mut input = body();
        input["scene"]["value"]["layout"]["pagination"]["textLinePattern"]["clusterRules"] = rules;
        assert!(parse_style(&input).is_err(), "{input}");
    }
    let mut input = body();
    input["scene"]["value"]["layout"]["pagination"]["textLinePattern"]["clusterRules"] =
        json!({"attachments":[{"next":[[0x10ffff,0x10ffff],[33,33],[33,34]],"previous":[],"headExcluded":[]}],"joiners":[0,0x10ffff]});
    parse_style(&input).unwrap(); // Overlap/order and explicitly empty optional sets are preserved.
}
