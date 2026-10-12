use caption_scene::*;
use serde_json::{Value, json};
fn fixture() -> Value {
    serde_json::from_str(include_str!("fixtures/page-window.json")).unwrap()
}
#[test]
fn page_window_requires_explicit_capability_fixed_lines_hidden_leading_and_real_timing() {
    let body = fixture();
    let style = parse_style(&body).unwrap();
    assert_eq!(style, parse_style(&serde_json::to_value(&style).unwrap()).unwrap());
    for (path, value) in [
        ("/scene/value/requiredCapabilities", json!(["caption-word-line-layout/1"])),
        ("/scene/value/layout/leadingGap", json!("show")),
        ("/scene/value/layout/pagination", json!({"maxUnitsPerPage":3})),
        ("/scene/value/speechState/timingPolicy", json!("estimated")),
        ("/scene/value/layout/pageWindow/gapThreshold/ticks", json!(-1)),
        ("/scene/value/layout/pageWindow/gapThreshold/ticks", json!(9007199254740992i64)),
        ("/scene/value/layout/pageWindow/gapThreshold/timescale", json!(0)),
        ("/scene/value/layout/pageWindow/shortGap/before", json!(-0.1)),
        ("/scene/value/layout/pageWindow/shortGap/after", json!(1.1)),
        ("/scene/value/layout/pageWindow/longGap/before", json!(0.9)),
        ("/scene/value/layout/pageWindow/boundary", json!("both-inclusive")),
    ] {
        let mut bad = body.clone();
        *bad.pointer_mut(path).unwrap() = value;
        assert!(parse_style(&bad).is_err(), "{path}");
    }
}
#[test]
fn omitted_page_window_keeps_legacy_serialized_shape() {
    let body: Value = serde_json::from_str(include_str!("fixtures/word-pop.json")).unwrap();
    let style = parse_style(&body).unwrap();
    assert!(style.scene().layout.page_window.is_none());
    assert!(
        serde_json::to_value(style).unwrap()["scene"]["value"]["layout"]
            .get("pageWindow")
            .is_none()
    );
}
