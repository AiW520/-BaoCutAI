use caption_scene::*;
use serde_json::{Value, json};
use std::collections::BTreeMap;
fn fixture() -> Value {
    serde_json::from_str(include_str!("fixtures/word-pop.json")).unwrap()
}
fn expr(v: Value) -> Expression {
    serde_json::from_value(v).unwrap()
}
#[test]
fn contract_rejects_unknowns_units_cycles_and_versions() {
    let input = fixture();
    let style = parse_style(&input).unwrap();
    assert_eq!(parse_style(&serde_json::to_value(&style).unwrap()).unwrap(), style);
    for (path, value) in [
        ("/scene/value/evaluationVersion", json!(2)),
        ("/scene/value/nodes/0/type", json!("image")),
        ("/scene/value/animations/0/property", json!("fontSize")),
        ("/scene/value/animations/1/value/keys/1/at", json!(0)),
    ] {
        let mut v = input.clone();
        *v.pointer_mut(path).unwrap() = value;
        assert!(parse_style(&v).is_err(), "{path}");
    }
    let mut v = input.clone();
    v["scene"]["value"]["unexpected"] = json!(true);
    assert!(parse_style(&v).is_err());
    let mut v = input.clone();
    v["scene"]["value"]["functions"] =
        json!([{"id":"recursive","arguments":[],"returns":"scalar","body":{"op":"call","function":"recursive","args":[]}}]);
    assert_eq!(parse_style(&v).unwrap_err().code, "CAPTION_DEPENDENCY_CYCLE");
    let bad = expr(
        json!({"op":"call","function":"add","args":[{"op":"literal","type":"time","value":1},{"op":"literal","type":"length","value":2}]}),
    );
    assert!(infer(&bad, style.scene(), &BTreeMap::new()).is_err());
}
#[test]
fn continuous_function_is_seek_and_frame_rate_independent() {
    let style = parse_style(&fixture()).unwrap();
    let wave = expr(
        json!({"op":"call","function":"sin","args":[{"op":"call","function":"phase","args":[{"op":"read","path":"time.seconds"},{"op":"literal","type":"scalar","value":2}]}]}),
    );
    assert_eq!(infer(&wave, style.scene(), &BTreeMap::new()).unwrap(), ValueType::Scalar);
    let at = |t| {
        let mut c = Context::default();
        c.fields.insert("time.seconds".into(), Evaluated::Number(ValueType::Time, t));
        evaluate(&wave, style.scene(), &c, &mut Budget::default())
            .unwrap()
            .number()
            .unwrap()
    };
    for t in [0.01, 0.1, 0.125, 0.234567, 1.0, 0.01] {
        assert!((at(t) - libm::sin(t * 2.0 * std::f64::consts::TAU)).abs() < 1e-14);
    }
    assert!((at(0.125) - 1.0).abs() < 1e-14);
}
#[test]
fn conditions_are_lazy_and_arithmetic_errors_are_not_zero() {
    let style = parse_style(&fixture()).unwrap();
    let bad = json!({"op":"call","function":"div","args":[{"op":"literal","type":"scalar","value":1},{"op":"literal","type":"scalar","value":0}]});
    assert!(evaluate(&expr(bad.clone()), style.scene(), &Context::default(), &mut Budget::default()).is_err());
    let choose = expr(
        json!({"op":"if","condition":{"op":"literal","type":"bool","value":true},"then":{"op":"literal","type":"scalar","value":7},"else":bad}),
    );
    assert_eq!(
        evaluate(&choose, style.scene(), &Context::default(), &mut Budget::default())
            .unwrap()
            .number()
            .unwrap(),
        7.0
    );
    assert!(evaluate(&choose, style.scene(), &Context::default(), &mut Budget(0)).is_err());
}
#[test]
fn fill_and_word_clock_use_exact_window_not_cue_duration() {
    let style = parse_style(&fixture()).unwrap();
    let v = &style.scene().animations[1].value;
    let mut c = Context::default();
    c.spans.insert(UnitKind::Word, (2.0, 3.5));
    let sample = |t| sample_value(v, ValueType::Scalar, style.scene(), &c, t, &mut Budget::default()).unwrap();
    assert!(sample(1.999).is_none());
    assert_eq!(sample(2.0).unwrap().number().unwrap(), 0.85);
    assert!((sample(2.081).unwrap().number().unwrap() - 1.18).abs() < 1e-12);
    assert!(sample(2.181).is_none());
}
#[test]
fn parameters_are_checked_and_seeded_noise_is_repeatable() {
    let style = parse_style(&fixture()).unwrap();
    assert!(parameters(style.scene(), &[&BTreeMap::from([("absent".into(), json!(3))])]).is_err());
    assert!(validate_presentation(&Presentation::default(), Some(style.scene())).is_ok());
    let e = expr(json!({"op":"call","function":"noise","args":[{"op":"literal","type":"scalar","value":0.32}]}));
    let run = |seed| {
        evaluate(
            &e,
            style.scene(),
            &Context {
                seed,
                stable_key: "cue|word|channel".into(),
                ..Default::default()
            },
            &mut Budget::default(),
        )
        .unwrap()
    };
    assert_eq!(run(2), run(2));
    assert_ne!(run(2), run(3));
}

#[test]
fn yoyo_stagger_and_bezier_share_motion_semantics() {
    let style = parse_style(&fixture()).unwrap();
    let value:DynamicValue=serde_json::from_value(json!({
        "kind":"keyframes","clock":{"unit":"cue","origin":"start","stagger":{"ticks":100,"timescale":1000},"duration":{"kind":"fixed","ticks":1,"timescale":1},"repeat":{"iterations":2,"mode":"yoyo"}},
        "keys":[{"at":0,"value":0},{"at":1,"value":10}],"fill":{"after":"hold"},
        "interpolation":{"cubic-bezier":{"x1":0.25,"y1":0.1,"x2":0.25,"y2":1}}
    })).unwrap();
    let mut c = Context::default();
    c.spans.insert(UnitKind::Cue, (0.0, 4.0));
    c.fields.insert("unit.index".into(), Evaluated::Number(ValueType::Scalar, 2.0));
    let at = |t| sample_value(&value, ValueType::Length, style.scene(), &c, t, &mut Budget::default()).unwrap();
    assert!(at(0.1).is_none());
    assert!((at(0.7).unwrap().number().unwrap() - 10.0 * motion::curve::cubic_bezier(0.25, 0.1, 0.25, 1.0, 0.5)).abs() < 1e-12);
    assert_eq!(at(1.2).unwrap().number().unwrap(), 10.0);
    assert_eq!(at(2.3).unwrap().number().unwrap(), 0.0);
}

#[test]
fn reusable_pure_function_preserves_units() {
    let mut body = fixture();
    body["scene"]["value"]["functions"] = json!([{"id":"double","arguments":[{"name":"x","type":"length"}],"returns":"length","body":{"op":"call","function":"mul","args":[{"op":"read","path":"args.x"},{"op":"literal","type":"scalar","value":2}]}}]);
    let style = parse_style(&body).unwrap();
    let call = expr(json!({"op":"call","function":"double","args":[{"op":"literal","type":"length","value":8}]}));
    assert_eq!(infer(&call, style.scene(), &BTreeMap::new()).unwrap(), ValueType::Length);
    assert_eq!(
        evaluate(&call, style.scene(), &Context::default(), &mut Budget::default()).unwrap(),
        Evaluated::Number(ValueType::Length, 16.0)
    );
    assert_eq!(
        builtin_type("div", &[ValueType::Integer, ValueType::Integer]),
        Some(ValueType::Scalar)
    );
}

#[test]
fn repeated_decoration_inherits_its_word_clock() {
    let mut input = fixture();
    input["scene"]["value"]["nodes"]
        .as_array_mut()
        .unwrap()
        .push(json!({"id":"boxes","type":"repeat","selectorId":"words","children":[{"id":"plate","type":"shape"}]}));
    let mut track = input["scene"]["value"]["animations"][1].clone();
    track["id"] = json!("plate-pop");
    track["target"] = json!({"nodeId":"plate"});
    input["scene"]["value"]["animations"].as_array_mut().unwrap().push(track);
    assert!(parse_style(&input).is_ok());
}

#[test]
fn sampled_layout_rejects_cycles_through_functions_and_page_clocks() {
    let mut body = fixture();
    body["scene"]["value"]["layout"]["layoutEvaluation"] = json!("per-sample");
    body["scene"]["value"]["functions"] =
        json!([{"id":"width","arguments":[],"returns":"length","body":{"op":"read","path":"layout.width"}}]);
    body["scene"]["value"]["layout"]["bindings"] =
        json!([{"property":"width","value":{"kind":"expression","expression":{"op":"call","function":"width","args":[]}}}]);
    assert_eq!(parse_style(&body).unwrap_err().code, "CAPTION_DEPENDENCY_CYCLE");
    body["scene"]["value"]["layout"]["bindings"][0]["value"] = json!({"kind":"keyframes","clock":{"unit":"page","origin":"start","duration":{"kind":"unit-span"}},"keys":[{"at":0,"value":40},{"at":1,"value":120}]});
    assert!(parse_style(&body).is_err());
    body["scene"]["value"]["layout"]["bindings"][0]["value"] = json!({"kind":"constant","value":50});
    assert!(parse_style(&body).is_ok());
    body["scene"]["value"]["layout"]["layoutEvaluation"] = json!("static");
    assert!(parse_style(&body).is_err());
}
#[test]
fn material_validation_limits_nested_history_and_blur() {
    let mut body = fixture();
    let root = &mut body["scene"]["value"];
    root["materials"] = json!([{"kind":"blur","id":"blur","radius":{"kind":"constant","value":65}}]);
    assert!(parse_style(&body).is_err());
    body["scene"]["value"]["materials"] = json!([
        {"kind":"feedback","id":"a","samples":8,"step":{"ticks":100,"timescale":1000},"decay":0.5},
        {"kind":"feedback","id":"b","samples":8,"step":{"ticks":100,"timescale":1000},"decay":0.5}
    ]);
    assert!(parse_style(&body).is_err());
    body["scene"]["value"]["materials"].as_array_mut().unwrap().pop();
    assert!(parse_style(&body).is_ok());
    body["scene"]["value"]["materials"][0]["step"]["ticks"] = json!(0);
    assert!(parse_style(&body).is_err());
}

#[test]
fn bezier_expression_supports_duration_dependent_progress_and_overshoot() {
    let mut input = fixture();
    input["scene"]["value"]["requiredCapabilities"] = json!(["caption-bezier-expression/1"]);
    let style = parse_style(&input).unwrap();
    let curve = expr(json!({"op":"call","function":"cubic-bezier","args":[
        {"op":"call","function":"div","args":[
            {"op":"read","path":"time.elapsedSeconds"},
            {"op":"call","function":"min","args":[
                {"op":"read","path":"time.durationSeconds"},
                {"op":"literal","type":"time","value":0.1}
            ]}
        ]},
        {"op":"literal","type":"scalar","value":0.2},
        {"op":"literal","type":"scalar","value":1.6},
        {"op":"literal","type":"scalar","value":0.4},
        {"op":"literal","type":"scalar","value":1.2}
    ]}));
    assert_eq!(infer(&curve, style.scene(), &BTreeMap::new()).unwrap(), ValueType::Scalar);
    let sample = |elapsed, duration| {
        let mut context = Context::default();
        context
            .fields
            .insert("time.elapsedSeconds".into(), Evaluated::Number(ValueType::Time, elapsed));
        context
            .fields
            .insert("time.durationSeconds".into(), Evaluated::Number(ValueType::Time, duration));
        evaluate(&curve, style.scene(), &context, &mut Budget::default())
            .unwrap()
            .number()
            .unwrap()
    };
    assert_eq!(sample(-0.1, 1.0), 0.0);
    assert_eq!(sample(0.2, 1.0), 1.0);
    assert!(sample(0.06, 1.0) > 1.0);
    assert_eq!(sample(0.025, 0.05), sample(0.05, 1.0));
    for time in [0.001, 0.07, 0.03, 0.099, 0.001] {
        assert_eq!(sample(time, 1.0), motion::curve::cubic_bezier(0.2, 1.6, 0.4, 1.2, time / 0.1));
    }
    let make = |x| {
        expr(json!({"op":"call","function":"cubic-bezier","args":[
            {"op":"literal","type":"scalar","value":0.5},
            {"op":"literal","type":"scalar","value":x},
            {"op":"literal","type":"scalar","value":0},
            {"op":"literal","type":"scalar","value":1},
            {"op":"literal","type":"scalar","value":1}
        ]}))
    };
    assert!(evaluate(&make(-0.1), style.scene(), &Context::default(), &mut Budget::default()).is_err());
    assert!(evaluate(&make(1.1), style.scene(), &Context::default(), &mut Budget::default()).is_err());
    assert!(evaluate(&make(0.2), style.scene(), &Context::default(), &mut Budget(0)).is_err());
    assert!(builtin_type("cubic-bezier", &[ValueType::Time; 5]).is_none());
    input["scene"]["value"]["functions"] =
        json!([{"id":"cubic-bezier","arguments":[],"returns":"scalar","body":{"op":"literal","type":"scalar","value":1}}]);
    assert!(parse_style(&input).is_err());
}

#[test]
fn text_context_types_and_sqrt_reject_invalid_dependencies() {
    let scene = parse_style(&fixture()).unwrap();
    for path in ["time.cueDurationSeconds", "time.pageElapsedSeconds", "time.pageDurationSeconds"] {
        assert_eq!(context_type(path), Some(ValueType::Time));
    }
    for path in ["unit.textIndex", "unit.textCount", "unit.pageTextIndex", "unit.pageTextCount"] {
        assert_eq!(context_type(path), Some(ValueType::Scalar));
    }
    let sample = |value| {
        evaluate(
            &expr(json!({"op":"call","function":"sqrt","args":[{"op":"literal","type":"scalar","value":value}]})),
            scene.scene(),
            &Context::default(),
            &mut Budget::default(),
        )
    };
    assert_eq!(sample(9.0).unwrap().number().unwrap(), 3.0);
    assert!(sample(-1.0).is_err());
    assert!(builtin_type("sqrt", &[ValueType::Time]).is_none());
    let mut body = fixture();
    body["scene"]["value"]["selectors"][0]["includeWhitespace"] = json!(true);
    assert!(parse_style(&body).is_err());
    body = fixture();
    body["scene"]["value"]["layout"]["layoutEvaluation"] = json!("per-sample");
    body["scene"]["value"]["layout"]["bindings"] = json!([{"property":"width","value":{"kind":"expression","expression":{"op":"call","function":"mul","args":[{"op":"literal","type":"length","value":20},{"op":"call","function":"div","args":[{"op":"read","path":"time.pageDurationSeconds"},{"op":"literal","type":"time","value":1}]}]}}}]);
    assert!(parse_style(&body).is_err(), "page clock is unavailable before layout");
}

#[test]
fn ink_context_is_length_typed_and_unavailable_before_layout() {
    let mut body = fixture();
    body["scene"]["value"]["requiredCapabilities"] = json!(["caption-ink-context/1"]);
    let style = parse_style(&body).unwrap();
    for field in ["inkX", "inkY", "inkWidth", "inkHeight", "lineInkY", "lineInkHeight"] {
        let read = expr(json!({"op":"read", "path":format!("layout.{field}")}));
        assert_eq!(infer(&read, style.scene(), &BTreeMap::new()).unwrap(), ValueType::Length);
        let mut early = body.clone();
        early["scene"]["value"]["layout"]["layoutEvaluation"] = json!("per-sample");
        early["scene"]["value"]["layout"]["bindings"] = json!([{
            "property":"width", "value":{"kind":"expression", "expression": read}
        }]);
        assert_eq!(parse_style(&early).unwrap_err().code, "CAPTION_DEPENDENCY_CYCLE");
    }
    parse_style(&serde_json::from_str(include_str!("fixtures/ink-context.json")).unwrap()).unwrap();
}

#[test]
fn unit_context_types_and_pre_layout_restrictions_are_explicit() {
    let mut body = fixture();
    body["scene"]["value"]["requiredCapabilities"] = json!(["caption-unit-context/1"]);
    let style = parse_style(&body).unwrap();
    for (path, ty) in [
        ("unit.pageIndex", ValueType::Scalar),
        ("unit.pageCount", ValueType::Scalar),
        ("time.lineElapsedSeconds", ValueType::Time),
        ("time.lineDurationSeconds", ValueType::Time),
    ] {
        let read = expr(json!({"op":"read", "path":path}));
        assert_eq!(infer(&read, style.scene(), &BTreeMap::new()).unwrap(), ty);
        let scalar = if ty == ValueType::Time {
            json!({"op":"call","function":"div","args":[read,{"op":"literal","type":"time","value":1}]})
        } else {
            json!(read)
        };
        let mut early = body.clone();
        early["scene"]["value"]["layout"]["layoutEvaluation"] = json!("per-sample");
        early["scene"]["value"]["layout"]["bindings"] = json!([{
            "nodeId":"caption", "property":"lineHeight", "value":{"kind":"expression", "expression":scalar}
        }]);
        assert_eq!(parse_style(&early).unwrap_err().code, "CAPTION_DEPENDENCY_CYCLE");
    }
    parse_style(&serde_json::from_str(include_str!("fixtures/unit-context.json")).unwrap()).unwrap();
}
