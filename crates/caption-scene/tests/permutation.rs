use caption_scene::*;
use serde_json::json;
use std::collections::{BTreeMap, BTreeSet};

fn style() -> SceneStyle {
    parse_style(&serde_json::from_str(include_str!("fixtures/permutation.json")).unwrap()).unwrap()
}
fn expression(index: f64, count: f64, seed: f64) -> Expression {
    serde_json::from_value(json!({"op":"call", "function":"shuffle-index", "args":[
        {"op":"literal","type":"scalar","value":index},
        {"op":"literal","type":"scalar","value":count},
        {"op":"literal","type":"scalar","value":seed}
    ]}))
    .unwrap()
}
fn get(index: f64, count: f64, seed: f64, budget: &mut Budget) -> Result<f64> {
    evaluate(&expression(index, count, seed), style().scene(), &Context::default(), budget)?.number()
}

#[test]
fn permutation_matches_fixed_seed_and_unsigned_wrap_vectors() {
    let cases = [
        (0.0, [5, 1, 4, 7, 8, 11, 6, 10, 9, 3, 0, 2]),
        (1.0, [6, 5, 9, 2, 3, 11, 10, 8, 4, 7, 1, 0]),
        (123456.0, [3, 7, 10, 8, 4, 6, 5, 2, 9, 0, 1, 11]),
        (2147483647.0, [1, 4, 6, 7, 10, 5, 9, 8, 3, 11, 2, 0]),
        (2147483648.0, [6, 5, 9, 2, 3, 11, 10, 8, 4, 7, 1, 0]),
        (2147483649.0, [9, 6, 10, 4, 1, 7, 3, 11, 8, 5, 2, 0]),
        (4294967295.0, [6, 5, 9, 2, 3, 11, 10, 8, 4, 7, 1, 0]),
        (4294967296.0, [5, 1, 4, 7, 8, 11, 6, 10, 9, 3, 0, 2]),
        (4294967297.0, [6, 5, 9, 2, 3, 11, 10, 8, 4, 7, 1, 0]),
        (-4294967297.0, [6, 5, 9, 2, 3, 11, 10, 8, 4, 7, 1, 0]),
        (-0.9, [5, 1, 4, 7, 8, 11, 6, 10, 9, 3, 0, 2]),
        (-1.1, [6, 5, 9, 2, 3, 11, 10, 8, 4, 7, 1, 0]),
        (3.75, [1, 8, 9, 6, 5, 11, 7, 10, 3, 2, 4, 0]),
        (-3.75, [10, 7, 0, 8, 1, 6, 5, 3, 4, 2, 9, 11]),
        (1e20, [10, 8, 2, 11, 6, 5, 1, 7, 3, 0, 9, 4]),
        (-1e20, [2, 6, 3, 9, 8, 0, 11, 1, 5, 10, 4, 7]),
    ];
    for (seed, expected) in cases {
        let mut budget = Budget::default();
        for (index, expected) in expected.iter().enumerate() {
            assert_eq!(
                get(index as f64, 12.0, seed, &mut budget).unwrap(),
                f64::from(*expected),
                "seed={seed} index={index}"
            );
        }
    }
}

#[test]
fn permutation_validates_units_ranges_and_nonfinite_input() {
    assert_eq!(
        infer(&expression(0.0, 4.0, 1.0), style().scene(), &BTreeMap::new()).unwrap(),
        ValueType::Scalar
    );
    for (index, count) in [(-1.0, 4.0), (4.0, 4.0), (0.5, 4.0), (0.0, 0.0), (0.0, 4.5), (0.0, 8193.0)] {
        assert_eq!(
            get(index, count, 1.0, &mut Budget::default()).unwrap_err().code,
            "CAPTION_SCENE_INVALID"
        );
    }
    for position in 0..3 {
        let mut invalid = expression(0.0, 4.0, 1.0);
        let Expression::Call { args, .. } = &mut invalid else {
            unreachable!()
        };
        args[position] = Expression::Literal {
            value_type: ValueType::Integer,
            value: json!(1),
        };
        assert!(infer(&invalid, style().scene(), &BTreeMap::new()).is_err());
    }
    for seed in [f64::NAN, f64::INFINITY, f64::NEG_INFINITY] {
        let mut invalid = expression(0.0, 4.0, 1.0);
        let Expression::Call { args, .. } = &mut invalid else {
            unreachable!()
        };
        args[2] = Expression::Read {
            path: "params.seed".into(),
        };
        let mut context = Context::default();
        context
            .fields
            .insert("params.seed".into(), Evaluated::Number(ValueType::Scalar, seed));
        assert!(evaluate(&invalid, style().scene(), &context, &mut Budget::default()).is_err());
    }
}

#[test]
fn permutation_charges_initialization_and_swaps_then_reuses_only_local_budget_cache() {
    let mut too_small = Budget::new(26); // 4 expression nodes + 12 values + 11 swaps needs 27.
    assert_eq!(get(0.0, 12.0, 1.0, &mut too_small).unwrap_err().code, "CAPTION_BUDGET_EXCEEDED");
    let mut exact = Budget::new(31);
    assert_eq!(get(0.0, 12.0, 1.0, &mut exact).unwrap(), 6.0);
    assert_eq!(exact.remaining(), 4);
    assert_eq!(get(1.0, 12.0, 4294967297.0, &mut exact).unwrap(), 5.0);
    assert_eq!(exact.remaining(), 0);
    assert!(
        get(0.0, 12.0, 1.0, &mut Budget::new(4)).is_err(),
        "New budget cannot reuse another frame's cache"
    );
    assert_eq!(get(0.0, 1.0, 1.0, &mut Budget::new(5)).unwrap(), 0.0);
}

#[test]
fn maximum_permutation_is_bijective_and_random_access_is_order_independent() {
    let mut budget = Budget::default();
    let values = (0..8192)
        .map(|i| get(i as f64, 8192.0, -3.75, &mut budget).unwrap() as usize)
        .collect::<Vec<_>>();
    assert_eq!(values.iter().copied().collect::<BTreeSet<_>>(), (0..8192).collect());
    assert_eq!(budget.remaining(), MAX_OPERATIONS - (8192 + 8191) - 4 * 8192);
    for index in [8191, 3, 2048, 0, 8191] {
        assert_eq!(
            get(index as f64, 8192.0, -3.75, &mut Budget::default()).unwrap(),
            values[index] as f64
        );
    }
}

#[test]
fn permutation_cache_has_bounded_key_and_element_counts() {
    let mut budget = Budget::new(1000);
    for seed in 0..17 {
        get(0.0, 2.0, f64::from(seed), &mut budget).unwrap();
    }
    let remaining = budget.remaining();
    get(1.0, 2.0, 16.0, &mut budget).unwrap();
    assert_eq!(budget.remaining(), remaining - 7, "Seventeenth key is computed but not retained");
    let remaining = budget.remaining();
    get(1.0, 2.0, 0.0, &mut budget).unwrap();
    assert_eq!(budget.remaining(), remaining - 4);
    let mut budget = Budget::new(100_000);
    for seed in 0..5 {
        get(0.0, 4096.0, f64::from(seed), &mut budget).unwrap();
    }
    let remaining = budget.remaining();
    get(1.0, 4096.0, 4.0, &mut budget).unwrap();
    assert_eq!(
        budget.remaining(),
        remaining - 8195,
        "Fifth full permutation exceeds 16384 retained indices"
    );
}
