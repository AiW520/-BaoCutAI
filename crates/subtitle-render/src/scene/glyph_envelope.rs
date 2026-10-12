//! Post-layout envelopes over the existing unpainted glyph ink and line metrics.
//! These are neither advance boxes nor source-specific font measurement claims.
use super::*;

#[derive(Clone, Copy, Debug, Default)]
pub(super) struct Metrics {
    pub line_y: f64,
    pub line_height: f64,
    pub first_left: f64,
    pub last_right: f64,
    pub line_available: bool,
    pub range_available: bool,
}
struct PreparedLine {
    y: f64,
    height: f64,
    // Logical cluster order, with original glyph order as the stable tie-breaker.
    ink: Vec<(usize, usize, Bounds)>,
}
impl PreparedLine {
    fn geometry(
        ascent: f64,
        descent: f64,
        baseline: f64,
        mut ink: Vec<(usize, usize, Bounds)>,
    ) -> Self {
        let up = ink
            .iter()
            .map(|(_, _, bounds)| baseline - bounds.y)
            .fold(ascent.max(0.0), f64::max);
        let down = ink
            .iter()
            .map(|(_, _, bounds)| bounds.y + bounds.height - baseline)
            .fold(descent.abs(), f64::max);
        ink.sort_unstable_by_key(|(cluster, order, _)| (*cluster, *order));
        Self {
            y: baseline - up,
            height: up + down,
            ink,
        }
    }
    fn metrics(&self, range: &Range<usize>) -> Metrics {
        let first = self
            .ink
            .partition_point(|(cluster, _, _)| *cluster < range.start);
        let end = self
            .ink
            .partition_point(|(cluster, _, _)| *cluster < range.end);
        let mut metrics = Metrics {
            line_y: self.y,
            line_height: self.height,
            line_available: true,
            ..Default::default()
        };
        if first < end {
            metrics.first_left = self.ink[first].2.x;
            let last = self.ink[end - 1].2;
            metrics.last_right = last.x + last.width;
            metrics.range_available = true;
        }
        metrics
    }
}
pub(super) fn enabled(scene: &Scene) -> bool {
    scene
        .required_capabilities
        .iter()
        .any(|c| c == "caption-glyph-envelope/1")
}
pub(super) fn bind(
    units: &mut [(Unit, Option<Line>)],
    page: &Page,
    budget: &mut Budget,
) -> Result<()> {
    let mut lines = Vec::with_capacity(page.lines.len());
    for line in &page.lines {
        let mut ink = Vec::new();
        for (order, (glyph, bounds)) in line.shape.glyphs.iter().zip(&line.glyph_ink).enumerate() {
            budget.spend()?;
            if let Some(bounds) = bounds {
                ink.push((line.bytes.start + glyph.cluster.start, order, *bounds));
            }
        }
        lines.push(PreparedLine::geometry(
            line.shape.ascent,
            line.shape.descent,
            line.baseline,
            ink,
        ));
    }
    for (unit, _) in units {
        budget.spend()?;
        // Cue/Page carry no unique line binding, even when only one line is visible.
        unit.envelope = unit
            .line_position
            .and_then(|index| lines.get(index))
            .map(|line| Arc::new(line.metrics(&unit.bytes)));
    }
    Ok(())
}
pub(super) fn add_fields(context: &mut Context, unit: &Unit) {
    let metrics = unit.envelope.as_deref().copied().unwrap_or_default();
    for (path, value) in [
        ("layout.lineEnvelopeY", metrics.line_y),
        ("layout.lineEnvelopeHeight", metrics.line_height),
        ("layout.firstInkLeft", metrics.first_left),
        ("layout.lastInkRight", metrics.last_right),
    ] {
        context
            .fields
            .insert(path.into(), Evaluated::Number(ValueType::Length, value));
    }
    for (path, value) in [
        ("unit.lineEnvelopeAvailable", metrics.line_available),
        ("unit.rangeInkAvailable", metrics.range_available),
    ] {
        context.fields.insert(path.into(), Evaluated::Bool(value));
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    fn bounds(x: f64, y: f64, width: f64, height: f64) -> Bounds {
        Bounds {
            x,
            y,
            width,
            height,
        }
    }
    #[test]
    fn envelope_unions_font_metrics_and_ink_without_leading_or_middle_horizontal_overhang() {
        let line = PreparedLine::geometry(
            10.,
            3.,
            20.,
            vec![
                (0, 0, bounds(2., 8., 5., 15.)),
                (1, 1, bounds(-20., 6., 90., 20.)),
                (2, 2, bounds(15., 10., 4., 10.)),
            ],
        );
        let metrics = line.metrics(&(0..3));
        assert_eq!((metrics.line_y, metrics.line_height), (6., 20.));
        assert_eq!((metrics.first_left, metrics.last_right), (2., 19.));
        let empty = PreparedLine::geometry(10., 3., 20., vec![]).metrics(&(0..1));
        assert_eq!((empty.line_y, empty.line_height), (10., 13.));
        assert!(empty.line_available);
        assert!(!empty.range_available);
        assert_eq!((empty.first_left, empty.last_right), (0., 0.));
    }
    #[test]
    fn endpoints_follow_logical_clusters_and_preserve_reverse_rtl_order() {
        let line = PreparedLine::geometry(
            10.,
            3.,
            20.,
            vec![
                (4, 0, bounds(2., 10., 4., 13.)),
                (2, 1, bounds(10., 10., 4., 13.)),
                (0, 2, bounds(20., 10., 4., 13.)),
            ],
        );
        let metrics = line.metrics(&(0..6));
        assert_eq!((metrics.first_left, metrics.last_right), (20., 6.));
        assert!(metrics.range_available);
    }
    #[test]
    fn multiple_glyphs_in_one_cluster_have_stable_order_and_are_not_split_into_graphemes() {
        let line = PreparedLine::geometry(
            10.,
            3.,
            20.,
            vec![
                (0, 1, bounds(4., 6., 2., 3.)),
                (0, 0, bounds(2., 10., 5., 10.)),
            ],
        );
        let owned = line.metrics(&(0..1));
        assert_eq!((owned.first_left, owned.last_right), (2., 6.));
        assert!(
            !line.metrics(&(1..2)).range_available,
            "later grapheme cannot borrow a cluster owned by the first"
        );
    }
}

#[cfg(test)]
mod integration_tests {
    use super::*;
    use serde_json::{Value, json};
    fn fixture() -> Value {
        serde_json::from_str(include_str!(
            "../../../caption-scene/tests/fixtures/glyph-envelope.json"
        ))
        .unwrap()
    }
    fn plan(mut body: Value, content: &str, line_height: f64) -> ScenePlan {
        body["scene"]["value"]["nodes"][0]["style"]["lineHeight"] = json!(line_height);
        ScenePlan::compile(
            parse_style(&body).unwrap(),
            Presentation::default(),
            vec![SceneCue {
                id: "cue".into(),
                document_id: "doc".into(),
                text: content.into(),
                start: 0.,
                end: 4.,
                words: vec![],
            }],
            (160, 90),
            TextEngine::with_document_fonts(&[include_bytes!(
                "../../../render-raster/assets/fonts/NotoSansSC-Variable.ttf"
            )
            .to_vec()]),
            "envelope-instance".into(),
        )
        .unwrap()
    }
    fn units_at(plan: &mut ScenePlan, time: f64) -> Vec<(Unit, Option<Line>)> {
        let cue = &plan.cues[0];
        let params =
            cue_parameters(&plan.style, &plan.presentation, cue, &plan.instance_id).unwrap();
        let mut budget = Budget::default();
        let early = sampled_layout::early_context(
            cue,
            0,
            1,
            time,
            &params,
            (160, 90),
            &plan.instance_id,
            &plan.presentation.seed,
        )
        .unwrap();
        let sampled =
            sampled_layout::sample_scene(plan.style.scene(), &early, time, &mut budget).unwrap();
        let scene = sampled.as_ref().unwrap_or(plan.style.scene());
        resolved_units(
            &mut plan.text,
            &plan.layouts,
            0,
            cue,
            scene,
            sampled.is_some(),
            time,
            &params,
            &plan.presentation,
            (160, 90),
            &mut budget,
        )
        .unwrap()
        .remove("caption")
        .unwrap()
    }
    #[test]
    fn line_envelope_ignores_leading_and_blank_ranges_keep_line_height_only() {
        let mut tight = plan(fixture(), "Ag e\u{301} ", 1.0);
        let mut loose = plan(fixture(), "Ag e\u{301} ", 2.6);
        let a = units_at(&mut tight, 0.3);
        let b = units_at(&mut loose, 0.3);
        for (left, _) in &a {
            let right = &b
                .iter()
                .find(|(unit, _)| unit.id == left.id && unit.kind == left.kind)
                .unwrap()
                .0;
            if matches!(left.kind, UnitKind::Cue | UnitKind::Page) {
                assert!(left.envelope.is_none());
                continue;
            }
            let lm = left.envelope.as_ref().unwrap();
            let rm = right.envelope.as_ref().unwrap();
            assert!(lm.line_available && rm.line_available);
            assert!((lm.line_height - rm.line_height).abs() < 1e-8);
            assert!(((lm.line_y - left.baseline) - (rm.line_y - right.baseline)).abs() < 1e-8);
            if left.whitespace {
                assert!(!lm.range_available);
                assert_eq!((lm.first_left, lm.last_right), (0., 0.));
            }
        }
        assert!(a.iter().any(|(unit, _)| unit.whitespace));
    }
    #[test]
    fn envelope_repeat_and_sampled_layout_are_seekable_without_changing_legacy_pixels() {
        let decorated = plan(fixture(), "Ag", 2.6).render(0.3).unwrap();
        assert!(
            decorated
                .rgba
                .chunks_exact(4)
                .any(|p| p[2] > p[0] && p[3] > 0),
            "repeat inherits available envelope geometry"
        );
        let mut body = fixture();
        body["scene"]["value"]["layout"]["layoutEvaluation"] = json!("per-sample");
        body["scene"]["value"]["layout"]["bindings"] = json!([{"nodeId":"caption","property":"fontSize","value":{"kind":"expression","expression":{"op":"call","function":"mix","args":[{"op":"literal","type":"length","value":12},{"op":"literal","type":"length","value":20},{"op":"read","path":"time.clampedProgress"}]}}}]);
        let mut changing = plan(body.clone(), "Ag", 2.6);
        let before = units_at(&mut changing, 0.1);
        let after = units_at(&mut changing, 2.5);
        let height = |units: &[(Unit, Option<Line>)]| {
            units
                .iter()
                .find(|(unit, _)| unit.kind == UnitKind::Word)
                .unwrap()
                .0
                .envelope
                .as_ref()
                .unwrap()
                .line_height
        };
        assert!(height(&after) > height(&before));
        body["scene"]["value"]["materials"] = json!([{"kind":"feedback","id":"trail","samples":2,"step":{"ticks":100,"timescale":1000},"decay":0.5,"offset":[-2,0]}]);
        let mut persistent = plan(body.clone(), "Ag", 2.6);
        for time in [0.1, 2.5, 0.7, 0.1] {
            assert_eq!(
                persistent.render(time).unwrap().rgba,
                plan(body.clone(), "Ag", 2.6).render(time).unwrap().rgba
            );
        }
        let mut old: Value = serde_json::from_str(include_str!(
            "../../../caption-scene/tests/fixtures/word-pop.json"
        ))
        .unwrap();
        let original = plan(old.clone(), "Ag", 2.6).render(0.3).unwrap().rgba;
        old["scene"]["value"]["requiredCapabilities"]
            .as_array_mut()
            .unwrap()
            .push(json!("caption-glyph-envelope/1"));
        assert_eq!(original, plan(old, "Ag", 2.6).render(0.3).unwrap().rgba);
    }
}
