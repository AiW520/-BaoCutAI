//! Greedy whole-word rows bounded by an explicit Unicode text-count unit.
use super::*;

fn hard_break(c: char) -> bool {
    matches!(
        c,
        '\n' | '\r' | '\u{000b}' | '\u{000c}' | '\u{0085}' | '\u{2028}' | '\u{2029}'
    )
}
pub(super) fn groups(
    content: &str,
    words: &[Word],
    pattern: &TextLinePattern,
) -> Result<Vec<Vec<Range<usize>>>> {
    let mut cluster_budget =
        scalar_cluster::ClusterBudget::new(scalar_cluster::MAX_CLUSTER_OPERATIONS);
    let mut counts = Vec::with_capacity(words.len());
    let mut breaks = Vec::with_capacity(words.len());
    for (index, word) in words.iter().enumerate() {
        let text = &content[word.bytes.clone()];
        if text.chars().any(hard_break) {
            bail!("CAPTION_LAYOUT_INVALID: explicit line break inside an indivisible word");
        }
        counts.push(match pattern.unit {
            TextCountUnit::UnicodeScalar => text.chars().count(),
            TextCountUnit::Grapheme => text.graphemes(true).count(),
            TextCountUnit::ScalarCluster => scalar_cluster::count(
                text,
                pattern
                    .cluster_rules
                    .as_ref()
                    .expect("validated scalar cluster rules"),
                &mut cluster_budget,
            )?,
        });
        breaks.push(
            index > 0
                && content[words[index - 1].bytes.end..word.bytes.start]
                    .chars()
                    .any(hard_break),
        );
    }
    let mut at = 0;
    let mut pages = Vec::new();
    while at < words.len() {
        let mut rows = Vec::new();
        for limit in &pattern.lines[pages.len() % pattern.lines.len()] {
            if at == words.len() {
                break;
            }
            let start = at;
            let mut used = 0;
            loop {
                if at > start && (breaks[at] || used + counts[at] > *limit) {
                    break;
                }
                // Always consume the first whole word, including an over-limit word.
                used += counts[at];
                at += 1;
                if at == words.len() || used >= *limit {
                    break;
                }
            }
            rows.push(start..at);
        }
        pages.push(rows);
    }
    Ok(pages)
}

#[cfg(test)]
mod tests {
    use super::*;
    fn words(tokens: &[&str], content: &str) -> Vec<Word> {
        let cue = SceneCue {
            id: "cue".into(),
            document_id: "doc".into(),
            text: content.into(),
            start: 0.0,
            end: tokens.len() as f64,
            words: tokens
                .iter()
                .enumerate()
                .map(|(i, token)| SceneWord {
                    id: format!("w{i}"),
                    text: (*token).into(),
                    start: i as f64,
                    end: i as f64 + 0.8,
                })
                .collect(),
        };
        bind_words(&cue, content, TimingPolicy::RequireWordTiming, false).unwrap()
    }
    fn plan(
        tokens: &[&str],
        content: &str,
        unit: TextCountUnit,
        lines: Vec<Vec<usize>>,
    ) -> Vec<Vec<Range<usize>>> {
        groups(
            content,
            &words(tokens, content),
            &TextLinePattern {
                unit,
                lines,
                cluster_rules: None,
            },
        )
        .unwrap()
    }
    #[test]
    fn text_line_greedy_limits_keep_words_whole_and_end_equal_rows() {
        let tokens = ["aa", "bbbb", "c", "ddddddd", "ee", "f"];
        assert_eq!(
            plan(
                &tokens,
                &tokens.join(" "),
                TextCountUnit::UnicodeScalar,
                vec![vec![6, 3]]
            ),
            vec![vec![0..2, 2..3], vec![3..4, 4..6]]
        );
        assert_eq!(
            plan(
                &["aa", "bbb", "c"],
                "aa bbb c",
                TextCountUnit::UnicodeScalar,
                vec![vec![4]]
            ),
            vec![vec![0..1], vec![1..3]]
        );
        assert_eq!(
            plan(
                &["a", "b", "c", "d", "e"],
                "a b c d e",
                TextCountUnit::UnicodeScalar,
                vec![vec![1], vec![2, 1]]
            ),
            vec![vec![0..1], vec![1..3, 3..4], vec![4..5]]
        );
    }
    #[test]
    fn text_line_units_distinguish_scalars_from_extended_graphemes() {
        for token in ["e\u{301}", "👩‍👩‍👧‍👦", "🇺🇸", "👍🏽"] {
            let content = format!("{token} x");
            let tokens = [token, "x"];
            assert_eq!(
                plan(&tokens, &content, TextCountUnit::Grapheme, vec![vec![2]]),
                vec![vec![0..2]]
            );
            assert_eq!(
                plan(
                    &tokens,
                    &content,
                    TextCountUnit::UnicodeScalar,
                    vec![vec![2]]
                ),
                vec![vec![0..1], vec![1..2]]
            );
        }
        assert_eq!(
            plan(
                &["你", "好", "世界"],
                "你好世界",
                TextCountUnit::UnicodeScalar,
                vec![vec![2]]
            ),
            vec![vec![0..2], vec![2..3]]
        );
    }
    #[test]
    fn text_line_separators_do_not_count_but_hard_breaks_force_rows() {
        assert_eq!(
            plan(
                &["aa", "bb"],
                " \taa\t\u{a0}  bb  ",
                TextCountUnit::UnicodeScalar,
                vec![vec![4]]
            ),
            vec![vec![0..2]]
        );
        for separator in ["\n", "\r\n", " \n\n ", "\u{2028}", "\u{2029}"] {
            let content = format!("a{separator}b c");
            assert_eq!(
                plan(
                    &["a", "b", "c"],
                    &content,
                    TextCountUnit::UnicodeScalar,
                    vec![vec![10, 10]]
                ),
                vec![vec![0..1, 1..3]]
            );
        }
        let content = "a\nb";
        let err = groups(
            content,
            &words(&[content], content),
            &TextLinePattern {
                unit: TextCountUnit::UnicodeScalar,
                lines: vec![vec![10]],
                cluster_rules: None,
            },
        )
        .unwrap_err()
        .to_string();
        assert!(err.contains("CAPTION_LAYOUT_INVALID"));
    }
    #[test]
    fn text_line_members_are_exhaustive_and_ordered_with_large_and_tiny_limits() {
        for count in [0, 1, 2, 7, 65, 4096] {
            let tokens = vec!["word"; count];
            let source = tokens.join(" ");
            for limits in [vec![vec![1]], vec![vec![7, 11]], vec![vec![65536]]] {
                let groups = plan(&tokens, &source, TextCountUnit::Grapheme, limits);
                assert_eq!(
                    groups.into_iter().flatten().flatten().collect::<Vec<_>>(),
                    (0..count).collect::<Vec<_>>()
                );
            }
        }
    }

    #[test]
    fn text_line_layout_reuses_frozen_members_time_source_ranges_and_reflow() {
        let content = "aa bbbb\nc ddddddd ee f";
        let tokens = ["aa", "bbbb", "c", "ddddddd", "ee", "f"];
        let cue = SceneCue {
            id: "cue".into(),
            document_id: "doc".into(),
            text: content.into(),
            start: 0.0,
            end: 6.0,
            words: tokens
                .iter()
                .enumerate()
                .map(|(i, w)| SceneWord {
                    id: format!("w{i}"),
                    text: (*w).into(),
                    start: i as f64,
                    end: i as f64 + 0.8,
                })
                .collect(),
        };
        let style: serde_json::Value = serde_json::from_str(include_str!(
            "../../../caption-scene/tests/fixtures/text-line-layout.json"
        ))
        .unwrap();
        let scene = parse_style(&style).unwrap().scene().clone();
        let mut cfg = scene.layout.clone();
        cfg.pagination.text_line_pattern.as_mut().unwrap().lines = vec![vec![6, 3]];
        let mut engine = TextEngine::with_document_fonts(&[include_bytes!(
            "../../../render-raster/assets/fonts/NotoSansSC-Variable.ttf"
        )
        .to_vec()]);
        let params = parameters(&scene, &[]).unwrap();
        let base = super::super::prepare(
            &mut engine,
            &cue,
            &scene.nodes[0],
            &cfg,
            &scene.speech_state,
            (160, 90),
            &params,
        )
        .unwrap();
        assert_eq!(base.content, content);
        assert_eq!(base.pages.len(), 2);
        assert_eq!(base.pages[0].words, vec![0, 1, 2]);
        assert_eq!(base.pages[1].words, vec![3, 4, 5]);
        assert_eq!((base.pages[0].start, base.pages[0].end), (0.0, 3.0));
        assert_eq!((base.pages[1].start, base.pages[1].end), (3.0, 6.0));
        let frozen = base.pages[0]
            .lines
            .iter()
            .map(|line| line.bytes.clone())
            .collect::<Vec<_>>();
        assert_eq!(&content[frozen[0].clone()], "aa bbbb\n");
        assert_eq!(&content[frozen[1].clone()], "c ");
        cfg.width.value = 1.0;
        let now = sampled_layout::reflow(
            &mut engine,
            &base,
            &base.pages[0],
            &scene.nodes[0],
            &cfg,
            (160, 90),
            &params,
            &mut Budget::default(),
        )
        .unwrap();
        assert_eq!(now.words, base.pages[0].words);
        assert_eq!(now.source_range, base.pages[0].source_range);
        assert_eq!(
            now.lines
                .iter()
                .map(|line| line.bytes.clone())
                .collect::<Vec<_>>(),
            frozen
        );
        cfg.overflow = LayoutOverflow::Error;
        assert!(
            sampled_layout::reflow(
                &mut engine,
                &base,
                &base.pages[0],
                &scene.nodes[0],
                &cfg,
                (160, 90),
                &params,
                &mut Budget::default()
            )
            .is_err()
        );
    }
    #[test]
    fn text_line_mode_is_fixed_for_global_line_context_and_sampled_width() {
        let mut body: serde_json::Value = serde_json::from_str(include_str!(
            "../../../caption-scene/tests/fixtures/text-line-layout.json"
        ))
        .unwrap();
        let scene = &mut body["scene"]["value"];
        scene["requiredCapabilities"] =
            serde_json::json!(["caption-text-line-layout/1", "caption-cue-unit-context/1"]);
        scene["layout"]["pagination"] =
            serde_json::json!({"textLinePattern":{"unit":"grapheme","lines":[[4]]}});
        scene["layout"]["layoutEvaluation"] = serde_json::json!("per-sample");
        scene["layout"]["bindings"] = serde_json::json!([{"property":"width","value":{"kind":"keyframes","clock":{"unit":"cue","origin":"start","duration":{"kind":"unit-span"}},"keys":[{"at":0,"value":140},{"at":1,"value":1}]}}]);
        let words = ["aa", "bb", "cc", "dd"]
            .iter()
            .enumerate()
            .map(|(i, w)| SceneWord {
                id: format!("w{i}"),
                text: (*w).into(),
                start: i as f64,
                end: i as f64 + 0.8,
            })
            .collect();
        let mut plan = ScenePlan::compile(
            parse_style(&body).unwrap(),
            Presentation::default(),
            vec![SceneCue {
                id: "cue".into(),
                document_id: "doc".into(),
                text: "aa bb cc dd".into(),
                start: 0.0,
                end: 4.0,
                words,
            }],
            (160, 90),
            TextEngine::with_document_fonts(&[include_bytes!(
                "../../../render-raster/assets/fonts/NotoSansSC-Variable.ttf"
            )
            .to_vec()]),
            "test".into(),
        )
        .unwrap();
        let early = plan.render(0.1).unwrap();
        assert!(early.rgba.iter().any(|v| *v > 0));
        assert_eq!(
            early.rgba,
            plan.render(1.9).unwrap().rgba,
            "sampled width cannot split frozen rows"
        );
        let mut scene = plan.style.scene().clone();
        scene.layout.width.value = 1.0;
        let params = parameters(&scene, &[]).unwrap();
        let resolved = resolved_units(
            &mut plan.text,
            &plan.layouts,
            0,
            &plan.cues[0],
            &scene,
            true,
            2.1,
            &params,
            &plan.presentation,
            &plan.instance_id,
            (160, 90),
            &mut Budget::new(8),
        )
        .unwrap();
        let u = &resolved["caption"]
            .iter()
            .find(|(u, _)| u.kind == UnitKind::Line)
            .unwrap()
            .0;
        let mut context = Context::default();
        cue_unit_context::add_fields(&mut context, u);
        assert_eq!(context.fields["unit.cueLineIndex"].number().unwrap(), 1.0);
        assert_eq!(context.fields["unit.cueLineCount"].number().unwrap(), 2.0);
    }

    #[test]
    fn scalar_cluster_pagination_only_changes_counts_and_uses_one_budget_for_all_words() {
        let rules: ScalarClusterRules = serde_json::from_value(
            serde_json::json!({"attachments":[{"next":[[126,126]]}],"joiners":[43]}),
        )
        .unwrap();
        let pattern = TextLinePattern {
            unit: TextCountUnit::ScalarCluster,
            lines: vec![vec![2]],
            cluster_rules: Some(rules),
        };
        let content = "A~~ B+C D";
        let input = words(&["A~~", "B+C", "D"], content);
        assert_eq!(
            groups(content, &input, &pattern).unwrap(),
            vec![vec![0..2], vec![2..3]]
        );
        assert_eq!(
            &content[input[0].bytes.clone()],
            "A~~",
            "counting must not rewrite source text"
        );
        let expensive = ScalarClusterRules {
            attachments: vec![
                ScalarAttachmentRule {
                    next: vec![[0, 0]; 32],
                    previous: None,
                    head_excluded: None
                };
                8
            ],
            ..ScalarClusterRules::default()
        };
        let pattern = TextLinePattern {
            unit: TextCountUnit::ScalarCluster,
            lines: vec![vec![65536]],
            cluster_rules: Some(expensive),
        };
        let token = "z".repeat(32);
        let tokens = vec![token.as_str(); 128];
        let source = tokens.join(" ");
        let error = groups(&source, &words(&tokens, &source), &pattern)
            .unwrap_err()
            .to_string();
        assert!(error.contains("CAPTION_BUDGET_EXCEEDED"), "{error}");
    }
}
