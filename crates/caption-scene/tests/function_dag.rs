use caption_scene::*;
use serde_json::json;
use std::collections::BTreeMap;

fn scene(dag: bool) -> Scene {
    let style = parse_style(&serde_json::from_str(include_str!("fixtures/word-pop.json")).unwrap()).unwrap();
    let mut scene = style.scene().clone();
    if dag {
        scene.required_capabilities.push("caption-function-dag/1".into());
    }
    scene
}
fn literal(value: f64) -> Expression {
    Expression::Literal {
        value_type: ValueType::Scalar,
        value: json!(value),
    }
}
fn call(name: &str, args: Vec<Expression>) -> Expression {
    Expression::Call {
        function: name.into(),
        args,
    }
}
fn function(id: &str, body: Expression) -> PureFunction {
    PureFunction {
        id: id.into(),
        arguments: vec![],
        returns: ValueType::Scalar,
        body,
    }
}
fn balanced(leaves: usize) -> Expression {
    if leaves == 1 {
        literal(1.0)
    } else {
        call("add", vec![balanced(leaves / 2), balanced(leaves - leaves / 2)])
    }
}
fn joined(names: &[String]) -> Expression {
    if names.len() == 1 {
        call(&names[0], vec![])
    } else {
        call("add", vec![joined(&names[..names.len() / 2]), joined(&names[names.len() / 2..])])
    }
}
fn infer_root(expr: &Expression, scene: &Scene) -> Result<ValueType> {
    infer(expr, scene, &BTreeMap::new())
}
fn unary(mut expr: Expression, levels: usize) -> Expression {
    for _ in 0..levels {
        expr = call("abs", vec![expr]);
    }
    expr
}

#[test]
fn shared_diamond_counts_unique_bodies_only_and_preserves_legacy_and_execution_budgets() {
    let mut scene = scene(true);
    scene.functions.push(function("leaf", balanced(2048))); // 4095 physical nodes.
    scene
        .functions
        .push(function("left", call("add", vec![call("leaf", vec![]), call("leaf", vec![])])));
    scene
        .functions
        .push(function("right", call("add", vec![call("leaf", vec![]), call("leaf", vec![])])));
    let root = joined(
        &(0..32)
            .map(|i| if i % 2 == 0 { "left".into() } else { "right".into() })
            .collect::<Vec<_>>(),
    );
    assert_eq!(infer_root(&root, &scene).unwrap(), ValueType::Scalar);
    validate_scene(&scene).unwrap();
    assert_eq!(
        evaluate(&root, &scene, &Context::default(), &mut Budget::default())
            .unwrap_err()
            .code,
        "CAPTION_BUDGET_EXCEEDED"
    );
    scene
        .required_capabilities
        .retain(|capability| capability != "caption-function-dag/1");
    assert_eq!(infer_root(&root, &scene).unwrap_err().code, "CAPTION_BUDGET_EXCEEDED");
}

#[test]
fn each_physical_root_and_function_body_is_limited_to_4096_nodes() {
    let mut scene = scene(true);
    let exact = unary(balanced(2048), 1);
    assert_eq!(infer_root(&exact, &scene).unwrap(), ValueType::Scalar);
    let oversized = unary(exact, 1);
    assert_eq!(infer_root(&oversized, &scene).unwrap_err().code, "CAPTION_BUDGET_EXCEEDED");
    scene.functions.push(function("oversized", oversized));
    assert_eq!(validate_scene(&scene).unwrap_err().code, "CAPTION_BUDGET_EXCEEDED");
}

#[test]
fn unique_dependency_graph_has_a_separate_16384_node_bound() {
    let mut scene = scene(true);
    for index in 0..4 {
        scene.functions.push(function(&format!("branch-{index}"), balanced(2048)));
    }
    let names = (0..4).map(|i| format!("branch-{i}")).collect::<Vec<_>>();
    assert_eq!(infer_root(&joined(&names[..3]), &scene).unwrap(), ValueType::Scalar);
    assert_eq!(infer_root(&joined(&names), &scene).unwrap_err().code, "CAPTION_BUDGET_EXCEEDED");
}

#[test]
fn dag_checks_types_at_every_cached_call_and_checks_unused_functions() {
    let mut scene = scene(true);
    scene.functions.push(PureFunction {
        id: "identity".into(),
        arguments: vec![Argument {
            name: "x".into(),
            value_type: ValueType::Scalar,
        }],
        returns: ValueType::Scalar,
        body: Expression::Read { path: "args.x".into() },
    });
    let invalid = call(
        "add",
        vec![
            call("identity", vec![literal(1.0)]),
            call(
                "identity",
                vec![Expression::Literal {
                    value_type: ValueType::Length,
                    value: json!(2),
                }],
            ),
        ],
    );
    assert!(infer_root(&invalid, &scene).is_err());
    let wrong_arity = call("add", vec![call("identity", vec![literal(1.0)]), call("identity", vec![])]);
    assert!(infer_root(&wrong_arity, &scene).is_err());
    scene.functions.push(function(
        "unused-invalid",
        Expression::Literal {
            value_type: ValueType::Bool,
            value: json!(true),
        },
    ));
    assert!(validate_scene(&scene).is_err());
    scene.functions.pop();
    scene.functions.push(function("unused-cycle-a", call("unused-cycle-b", vec![])));
    scene.functions.push(function("unused-cycle-b", call("unused-cycle-a", vec![])));
    assert_eq!(validate_scene(&scene).unwrap_err().code, "CAPTION_DEPENDENCY_CYCLE");
}

#[test]
fn depth_guard_accounts_for_full_chain_and_cached_body_height() {
    let mut scene = scene(true);
    for index in 0..64 {
        scene.functions.push(function(
            &format!("chain-{index}"),
            if index == 63 {
                literal(1.0)
            } else {
                call(&format!("chain-{}", index + 1), vec![])
            },
        ));
    }
    assert_eq!(infer_root(&call("chain-0", vec![]), &scene).unwrap(), ValueType::Scalar);
    scene.functions[63].body = call("chain-64", vec![]);
    scene.functions.push(function("chain-64", literal(1.0)));
    assert_eq!(
        infer_root(&call("chain-0", vec![]), &scene).unwrap_err().code,
        "CAPTION_BUDGET_EXCEEDED"
    );
    scene.functions = vec![function("deep", unary(literal(1.0), 60))];
    let root = call("add", vec![call("deep", vec![]), unary(call("deep", vec![]), 10)]);
    assert_eq!(infer_root(&root, &scene).unwrap_err().code, "CAPTION_BUDGET_EXCEEDED");
}

#[test]
fn early_dependency_scan_visits_shared_functions_once_but_still_rejects_layout_reads() {
    let mut scene = scene(true);
    scene.functions.push(function("large", balanced(1536)));
    scene.functions.push(function("left", call("large", vec![])));
    scene.functions.push(function("right", call("large", vec![])));
    let root = call(
        "mul",
        vec![
            call("add", vec![call("left", vec![]), call("right", vec![])]),
            Expression::Literal {
                value_type: ValueType::Length,
                value: json!(0.001),
            },
        ],
    );
    scene.materials = vec![CaptionMaterial::Blur {
        id: "test".into(),
        radius: DynamicValue::Expression { expression: root },
        passes: 1,
    }];
    validate_scene(&scene).unwrap();
    scene.functions[0].body = call(
        "div",
        vec![
            Expression::Read {
                path: "layout.width".into(),
            },
            Expression::Literal {
                value_type: ValueType::Length,
                value: json!(1),
            },
        ],
    );
    assert_eq!(validate_scene(&scene).unwrap_err().code, "CAPTION_DEPENDENCY_CYCLE");
}

#[test]
fn builtin_permutation_name_cannot_be_shadowed() {
    let mut scene = scene(true);
    scene.functions.push(function("shuffle-index", literal(0.0)));
    assert!(validate_scene(&scene).is_err());
}
