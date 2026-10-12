use crate::*;
use serde_json::Value;
use std::collections::{BTreeMap, BTreeSet};

pub const CAPABILITIES: &[&str] = &[
    "caption-scene/1",
    "caption-text-context/1",
    "caption-expressions/1",
    "caption-bezier-expression/1",
    "caption-unit-animation/1",
    "caption-image-png/1",
    "caption-paint-stack/1",
    "caption-blur/1",
    "caption-feedback/1",
    "caption-layout-per-sample/1",
];
pub fn property_type(property: &str) -> Option<ValueType> {
    Some(match property {
        "transform.x" | "transform.y" | "width" | "height" | "radius" => ValueType::Length,
        "transform.rotation" => ValueType::Angle,
        "transform.scale" | "transform.scaleX" | "transform.scaleY" | "opacity" => ValueType::Scalar,
        "fill" => ValueType::Color,
        _ => return None,
    })
}
pub fn parse_style(body: &Value) -> Result<SceneStyle> {
    let style: SceneStyle = serde_json::from_value(body.clone()).map_err(|e| invalid("style", e.to_string()))?;
    validate_style(&style)?;
    Ok(style)
}
pub fn validate_style(style: &SceneStyle) -> Result<()> {
    if style.schema != STYLE_SCHEMA {
        return Err(Diagnostic::new("CAPTION_SCENE_SCHEMA_UNSUPPORTED", "schema", &style.schema));
    }
    validate_scene(style.scene())?;
    parameters(style.scene(), &[&style.parameters])?;
    Ok(())
}
pub fn parameters(scene: &Scene, overrides: &[&BTreeMap<String, Value>]) -> Result<BTreeMap<String, Evaluated>> {
    let mut out = BTreeMap::new();
    for p in &scene.parameters {
        out.insert(format!("params.{}", p.id), typed_value(p.value_type, &p.default)?);
    }
    for layer in overrides {
        for (id, value) in *layer {
            let p = scene
                .parameters
                .iter()
                .find(|p| p.id == *id)
                .ok_or_else(|| invalid(format!("parameters.{id}"), "undeclared parameter"))?;
            let v = typed_value(p.value_type, value)?;
            if let Evaluated::Number(_, n) = v {
                if p.min.is_some_and(|v| n < v) || p.max.is_some_and(|v| n > v) {
                    return Err(invalid(id, "parameter out of range"));
                }
            }
            out.insert(format!("params.{id}"), v);
        }
    }
    Ok(out)
}
pub fn validate_presentation(p: &Presentation, scene: Option<&Scene>) -> Result<()> {
    if p.word_tags
        .values()
        .any(|tags| tags.len() > 128 || tags.iter().any(|t| t.len() > 128))
    {
        return Err(invalid("wordTags", "tag budget exceeded"));
    }
    if p.seed.len() != 16 || u64::from_str_radix(&p.seed, 16).is_err() {
        return Err(invalid("presentation.seed", "16 hexadecimal digits required"));
    }
    if p.cue_overrides.len() > MAX_UNITS || p.word_tags.len() > MAX_UNITS {
        return Err(invalid("presentation", "binding budget exceeded"));
    }
    let mut seen = BTreeSet::new();
    for c in &p.cue_overrides {
        if !seen.insert((&c.cue_id, &c.occurrence_id)) {
            return Err(invalid("cueOverrides", "duplicate cue/occurrence"));
        }
    }
    if let Some(s) = scene {
        parameters(s, &[&p.parameters])?;
        for c in &p.cue_overrides {
            parameters(s, &[&c.parameters])?;
        }
    }
    Ok(())
}
fn name(id: &str) -> bool {
    !id.is_empty() && id.len() <= 128 && id.bytes().all(|b| b.is_ascii_alphanumeric() || matches!(b, b'_' | b'-'))
}
fn length(v: &Length, path: &str, scene: &Scene) -> Result<()> {
    if let Some(id) = &v.parameter {
        if !scene
            .parameters
            .iter()
            .any(|p| p.id == *id && matches!(p.value_type, ValueType::Scalar | ValueType::Integer))
        {
            return Err(invalid(path, "layout parameter must be a declared scalar"));
        }
    }
    if !v.value.is_finite() || !v.offset.is_finite() {
        return Err(invalid(path, "finite length required"));
    }
    Ok(())
}
pub fn validate_scene(s: &Scene) -> Result<()> {
    if s.schema != SCENE_SCHEMA || s.evaluation_version != 1 {
        return Err(Diagnostic::new(
            "CAPTION_SCENE_SCHEMA_UNSUPPORTED",
            "scene",
            format!("{} evaluation {}", s.schema, s.evaluation_version),
        ));
    }
    for c in &s.required_capabilities {
        if !CAPABILITIES.contains(&c.as_str()) {
            return Err(Diagnostic::new("CAPTION_CAPABILITY_UNAVAILABLE", "requiredCapabilities", c));
        }
    }
    if s.resources.len() > 64 {
        return Err(invalid("resources", "resource budget exceeded"));
    }
    let mut resources = BTreeSet::new();
    for r in &s.resources {
        let hash = r.content_hash.strip_prefix("sha256:").unwrap_or("");
        if !name(&r.id)
            || !resources.insert(&r.id)
            || r.asset_ref.id.is_empty()
            || r.asset_ref.revision.is_empty()
            || hash.len() != 64
            || !hash.bytes().all(|b| b.is_ascii_digit() || (b'a'..=b'f').contains(&b))
        {
            return Err(invalid("resources", "invalid resource id, revision or digest"));
        }
    }
    if s.layout.pagination.unit != UnitKind::Word {
        return Err(invalid("pagination.unit", "word required"));
    }
    length(&s.layout.width, "layout.width", s)?;
    length(&s.layout.x, "layout.x", s)?;
    length(&s.layout.y, "layout.y", s)?;
    if s.layout.max_lines == 0 || s.layout.max_lines > 32 || s.layout.pagination.max_units_per_page.is_some_and(|n| n == 0 || n > MAX_UNITS)
    {
        return Err(invalid("layout", "invalid page/line limit"));
    }
    if s.parameters.len() > 128 || s.functions.len() > 128 || s.selectors.len() > MAX_NODES || s.animations.len() > 1024 {
        return Err(invalid("scene", "declaration budget exceeded"));
    }
    let mut ids = BTreeSet::new();
    for p in &s.parameters {
        if !name(&p.id) || !ids.insert(&p.id) {
            return Err(invalid("parameters", "invalid or duplicate id"));
        }
        let v = typed_value(p.value_type, &p.default)?;
        if p.min.is_some_and(|n| !n.is_finite())
            || p.max.is_some_and(|n| !n.is_finite())
            || matches!((p.min,p.max),(Some(a),Some(b)) if a>b)
        {
            return Err(invalid(&p.id, "invalid range"));
        }
        if let Evaluated::Number(_, n) = v {
            if p.min.is_some_and(|v| n < v) || p.max.is_some_and(|v| n > v) {
                return Err(invalid(&p.id, "default out of range"));
            }
        }
    }
    let mut functions = BTreeSet::new();
    for f in &s.functions {
        if !name(&f.id)
            || !functions.insert(&f.id)
            || [
                "add",
                "sub",
                "mul",
                "div",
                "sin",
                "cos",
                "mix",
                "clamp",
                "random",
                "noise",
                "phase",
                "eq",
                "lt",
                "gt",
                "and",
                "or",
                "not",
                "abs",
                "min",
                "max",
                "floor",
                "ceil",
                "smoothstep",
                "sqrt",
                "cubic-bezier",
            ]
            .contains(&f.id.as_str())
        {
            return Err(invalid(&f.id, "invalid or reserved function name"));
        }
        let args: BTreeMap<_, _> = f.arguments.iter().map(|a| (a.name.clone(), a.value_type)).collect();
        if args.len() != f.arguments.len() || args.keys().any(|n| !name(n)) {
            return Err(invalid(&f.id, "duplicate or invalid argument"));
        }
        if infer(&f.body, s, &args)? != f.returns {
            return Err(invalid(&f.id, "return type mismatch"));
        }
    }
    fn walk<'a>(nodes: &'a [Node], out: &mut BTreeMap<&'a str, &'a Node>, depth: usize) -> Result<()> {
        if depth > 16 {
            return Err(invalid("nodes", "tree depth exceeded"));
        }
        for n in nodes {
            if !name(&n.id) || out.insert(&n.id, n).is_some() {
                return Err(invalid("nodes", "invalid or duplicate id"));
            }
            if out.len() > MAX_NODES {
                return Err(invalid("nodes", "node budget exceeded"));
            }
            if matches!(n.kind, NodeKind::Text | NodeKind::Shape | NodeKind::Image) && !n.children.is_empty() {
                return Err(invalid(&n.id, "leaf node has children"));
            }
            walk(&n.children, out, depth + 1)?;
        }
        Ok(())
    }
    let mut nodes = BTreeMap::new();
    walk(&s.nodes, &mut nodes, 0)?;
    if !nodes.values().any(|n| n.kind == NodeKind::Text) {
        return Err(invalid("nodes", "text node required"));
    }
    if s.layout.bindings.len() > 64 || (s.layout.layout_evaluation == LayoutEvaluation::Static && !s.layout.bindings.is_empty()) {
        return Err(invalid("layout.bindings", "per-sample mode and at most 64 bindings required"));
    }
    let mut seen_bindings = BTreeSet::new();
    for b in &s.layout.bindings {
        if !seen_bindings.insert((&b.node_id, &b.property)) {
            return Err(invalid("layout.bindings", "duplicate target/property"));
        }
        let ty = match (b.node_id.as_deref(), b.property.as_str()) {
            (None, "width" | "x" | "y") => ValueType::Length,
            (Some(id), "fontSize") if nodes.get(id).is_some_and(|n| n.kind == NodeKind::Text) => ValueType::Length,
            (Some(id), "letterSpacing" | "lineHeight") if nodes.get(id).is_some_and(|n| n.kind == NodeKind::Text) => ValueType::Scalar,
            _ => return Err(invalid("layout.bindings", "unsupported layout target/property")),
        };
        validate_early_value(&b.value, ty, s)?;
    }
    if s.materials.len() > 8 {
        return Err(invalid("materials", "at most 8 materials"));
    }
    let mut names = BTreeSet::new();
    let mut samples = 1u32;
    for material in &s.materials {
        let id = match material {
            CaptionMaterial::Blur { id, radius, passes } => {
                if !(1..=3).contains(passes) {
                    return Err(invalid(id, "blur passes must be 1..3"));
                }
                validate_early_value(radius, ValueType::Length, s)?;
                if let DynamicValue::Constant { value } = radius {
                    let n = typed_value(ValueType::Length, value)?.number()?;
                    if !(0.0..=64.0).contains(&n) {
                        return Err(invalid(id, "blur radius must be 0..64 pixels"));
                    }
                }
                id
            }
            CaptionMaterial::Feedback {
                id,
                samples: n,
                step,
                decay,
                offset,
            } => {
                if *n == 0
                    || *n > 16
                    || step.timescale == 0
                    || step.ticks <= 0
                    || step.ticks.unsigned_abs() > 9_007_199_254_740_991
                    || step.seconds() * f64::from(*n) > 2.0
                    || !decay.is_finite()
                    || !(0.0..=1.0).contains(decay)
                    || offset.iter().any(|x| !x.is_finite() || x.abs() > 256.0)
                {
                    return Err(invalid(
                        id,
                        "feedback needs 1..16 past samples, positive step, window <= 2 seconds, decay 0..1, offset <= 256px",
                    ));
                }
                samples = samples.checked_mul(n + 1).ok_or_else(|| invalid(id, "feedback sample budget"))?;
                if samples > 32 {
                    return Err(invalid(id, "combined feedback sample budget exceeds 32"));
                }
                id
            }
        };
        if !name(id) || !names.insert(id) {
            return Err(invalid("materials", "invalid or duplicate id"));
        }
    }
    let mut sels = BTreeSet::new();
    for sel in &s.selectors {
        if sel.include_whitespace && sel.unit != UnitKind::Grapheme {
            return Err(invalid(&sel.id, "includeWhitespace requires grapheme units"));
        }
        if !name(&sel.id) || !sels.insert(&sel.id) || nodes.get(sel.node_id.as_str()).is_none_or(|n| n.kind != NodeKind::Text) {
            return Err(invalid(&sel.id, "invalid selector target or id"));
        }
        fn filter(f: &Filter, d: usize) -> Result<()> {
            if d > 16 {
                return Err(invalid("filter", "depth exceeded"));
            }
            match f {
                Filter::Range { start, end } if start > end => Err(invalid("filter", "reversed range")),
                Filter::And { filters } | Filter::Or { filters } => {
                    if filters.len() > 128 {
                        return Err(invalid("filter", "budget exceeded"));
                    }
                    for f in filters {
                        filter(f, d + 1)?;
                    }
                    Ok(())
                }
                Filter::Not { filter: f } => filter(f, d + 1),
                _ => Ok(()),
            }
        }
        filter(&sel.filter, 0)?;
    }
    fn bindings(nodes: &[Node], unit: UnitKind, scene: &Scene, out: &mut BTreeMap<String, UnitKind>) {
        for n in nodes {
            out.insert(n.id.clone(), unit);
            let child_unit = if n.kind == NodeKind::Repeat {
                scene
                    .selectors
                    .iter()
                    .find(|s| Some(&s.id) == n.selector_id.as_ref())
                    .map_or(unit, |s| s.unit)
            } else {
                unit
            };
            bindings(&n.children, child_unit, scene, out);
        }
    }
    let mut bound_units = BTreeMap::new();
    bindings(&s.nodes, UnitKind::Cue, s, &mut bound_units);
    for n in nodes.values() {
        if n.kind == NodeKind::Image {
            if !n.resource_id.as_ref().is_some_and(|id| resources.contains(id)) {
                return Err(invalid(&n.id, "image requires a declared resourceId"));
            }
        } else if n.resource_id.is_some() || n.fit != ImageFit::Contain {
            return Err(invalid(&n.id, "image fields on non-image node"));
        }
        if n.style.paints.len() > 16 {
            return Err(invalid(&n.id, "paint budget exceeded"));
        }
        if !n.style.paints.is_empty()
            && (n.style.stroke.is_some()
                || !n.state_styles.is_empty()
                || n.properties.contains_key("fill")
                || s.animations.iter().any(|a| a.target.node_id == n.id && a.property == "fill"))
        {
            return Err(invalid(
                &n.id,
                "paint stack cannot be combined with fill overrides or legacy stroke",
            ));
        }
        let mut paints = BTreeSet::new();
        for layer in &n.style.paints {
            if !name(&layer.id)
                || !paints.insert(&layer.id)
                || !layer.stroke_width.is_finite()
                || !(0.0..=256.0).contains(&layer.stroke_width)
                || layer.offset.iter().any(|x| !x.is_finite() || x.abs() > 4096.0)
            {
                return Err(invalid(&n.id, "invalid paint layer"));
            }
            match &layer.paint {
                ScenePaint::Solid { color: c } => {
                    color(c)?;
                }
                ScenePaint::Linear { from, to, stops } => {
                    if from == to
                        || from.iter().chain(to).any(|n| !n.is_finite() || n.abs() > 16.0)
                        || stops.len() < 2
                        || stops.len() > 32
                        || stops.iter().any(|s| !s.at.is_finite() || !(0.0..=1.0).contains(&s.at))
                        || stops.windows(2).any(|s| s[0].at >= s[1].at)
                    {
                        return Err(invalid(&n.id, "invalid gradient"));
                    }
                    for stop in stops {
                        color(&stop.color)?;
                    }
                }
            }
        }

        if n.kind != NodeKind::Text && (n.text.is_some() || !n.state_styles.is_empty() || n.style != TextStyle::default()) {
            return Err(invalid(&n.id, "text/style fields require a text node"));
        }
        if n.kind == NodeKind::Image && (n.properties.contains_key("fill") || n.properties.contains_key("radius")) {
            return Err(invalid(&n.id, "image does not accept fill/radius"));
        }
        if n.kind == NodeKind::Group && n.properties.contains_key("fill") {
            return Err(invalid(&n.id, "fill is not a group property"));
        }
        if n.kind == NodeKind::Repeat && !n.properties.is_empty() {
            return Err(invalid(&n.id, "repeat properties belong on its children"));
        }
        if matches!(n.kind, NodeKind::Group | NodeKind::Text)
            && n.properties.keys().any(|p| matches!(p.as_str(), "width" | "height" | "radius"))
        {
            return Err(invalid(&n.id, "shape geometry property on non-shape node"));
        }
        color(&n.style.fill)?;
        length(&n.style.font_size, &n.id, s)?;
        if n.style.font_weight == 0
            || n.style.font_weight > 1000
            || !(0.1..=10.0).contains(&n.style.line_height)
            || !n.style.letter_spacing.is_finite()
        {
            return Err(invalid(&n.id, "invalid text style"));
        }
        if let Some(stroke) = &n.style.stroke {
            color(&stroke.color)?;
            if !stroke.width.is_finite() || stroke.width < 0.0 {
                return Err(invalid(&n.id, "invalid stroke width"));
            }
        }
        if n.state_styles.unit != UnitKind::Word {
            return Err(invalid(&n.id, "state styles require word units"));
        }
        for state in [WordState::Active, WordState::Read, WordState::Unread] {
            if let Some(c) = n.state_styles.get(&state) {
                color(c)?;
            }
        }
        if n.kind == NodeKind::Repeat {
            if !n.selector_id.as_ref().is_some_and(|id| sels.contains(id)) {
                return Err(invalid(&n.id, "repeat requires a selector"));
            }
            if n.children.iter().any(|n| !matches!(n.kind, NodeKind::Shape | NodeKind::Image)) {
                return Err(Diagnostic::new(
                    "CAPTION_CAPABILITY_UNAVAILABLE",
                    &n.id,
                    "repeat children must be shapes or images in evaluation version 1",
                ));
            }
        } else if n.selector_id.is_some() {
            return Err(invalid(&n.id, "selectorId belongs to repeat nodes"));
        }
        for (p, v) in &n.properties {
            validate_value(p, v, s, bound_units[n.id.as_str()])?;
        }
    }
    let mut animations = BTreeSet::new();
    for a in &s.animations {
        if !name(&a.id) || !animations.insert(&a.id) || !nodes.contains_key(a.target.node_id.as_str()) {
            return Err(invalid(&a.id, "invalid animation id or target"));
        }
        let unit = if let Some(id) = &a.target.selector_id {
            let sel = s
                .selectors
                .iter()
                .find(|sel| sel.id == *id && sel.node_id == a.target.node_id)
                .ok_or_else(|| invalid(&a.id, "selector belongs to another node"))?;
            sel.unit
        } else {
            bound_units[a.target.node_id.as_str()]
        };
        let node = nodes[a.target.node_id.as_str()];
        if node.kind == NodeKind::Repeat
            || (!matches!(node.kind, NodeKind::Shape | NodeKind::Image) && matches!(a.property.as_str(), "width" | "height" | "radius"))
            || (node.kind == NodeKind::Group && a.property == "fill")
            || (node.kind == NodeKind::Image && matches!(a.property.as_str(), "fill" | "radius"))
        {
            return Err(invalid(&a.id, "property does not apply to this node"));
        }
        let t = validate_value(&a.property, &a.value, s, unit)?;
        if (t == ValueType::Color && a.composite != Composite::Replace) || (a.composite == Composite::Multiply && t != ValueType::Scalar) {
            return Err(invalid(&a.id, "invalid composite for property type"));
        }
    }
    Ok(())
}
fn validate_value(property: &str, v: &DynamicValue, s: &Scene, unit: UnitKind) -> Result<ValueType> {
    let t = property_type(property).ok_or_else(|| Diagnostic::new("CAPTION_PROPERTY_UNSUPPORTED", property, "unknown property"))?;
    match v {
        DynamicValue::Constant { value } => {
            typed_value(t, value)?;
        }
        DynamicValue::Expression { expression } => {
            if infer(expression, s, &BTreeMap::new())? != t {
                return Err(Diagnostic::new("CAPTION_EXPRESSION_TYPE", property, "result type mismatch"));
            }
        }
        DynamicValue::Keyframes {
            clock,
            keys,
            interpolation,
            ..
        } => {
            if keys.len() < 2
                || keys.len() > 1024
                || keys.iter().any(|k| !k.at.is_finite() || !(0.0..=1.0).contains(&k.at))
                || keys.windows(2).any(|k| k[0].at >= k[1].at)
            {
                return Err(invalid(property, "invalid keyframes"));
            }
            if let Interpolation::CubicBezier { x1, y1, x2, y2 } = interpolation {
                if ![x1, y1, x2, y2].iter().all(|n| n.is_finite()) || !(0.0..=1.0).contains(x1) || !(0.0..=1.0).contains(x2) {
                    return Err(invalid(property, "invalid Bezier easing"));
                }
            }
            if clock.stagger.timescale == 0 || clock.stagger.ticks.unsigned_abs() > 9_007_199_254_740_991 {
                return Err(invalid(property, "invalid stagger"));
            }
            if clock.repeat.is_some_and(|r| r.iterations == 0 || r.iterations > 1024) {
                return Err(invalid(property, "invalid repeat count"));
            }
            if clock.offset.timescale == 0 || clock.offset.ticks.unsigned_abs() > 9_007_199_254_740_991 {
                return Err(invalid(property, "zero timescale"));
            }
            if matches!(clock.duration,Duration::Fixed{ticks,timescale} if ticks<0||ticks>9_007_199_254_740_991||timescale==0) {
                return Err(invalid(property, "invalid duration"));
            }
            if clock.unit > unit && clock.unit != UnitKind::Page {
                return Err(invalid(property, "clock is finer than selected unit"));
            }
            if matches!(t, ValueType::Integer | ValueType::Bool) && *interpolation != Interpolation::Step {
                return Err(invalid(property, "discrete type requires step"));
            }
            for k in keys {
                typed_value(t, &k.value)?;
            }
        }
    }
    Ok(t)
}

/// Layout/material inputs may only read the frozen cue context, never the layout they produce.
fn validate_early_value(value: &DynamicValue, ty: ValueType, scene: &Scene) -> Result<()> {
    let property = if ty == ValueType::Length { "width" } else { "opacity" };
    validate_value(property, value, scene, UnitKind::Cue)?;
    fn visit(e: &Expression, s: &Scene, budget: &mut usize) -> Result<()> {
        if *budget == 0 {
            return Err(invalid("expression", "dependency budget"));
        }
        *budget -= 1;
        match e {
            Expression::Read { path } => {
                if !(path.starts_with("params.")
                    || path.starts_with("args.")
                    || matches!(
                        path.as_str(),
                        "time.seconds"
                            | "time.elapsedSeconds"
                            | "time.durationSeconds"
                            | "time.cueDurationSeconds"
                            | "time.progress"
                            | "time.clampedProgress"
                    )
                    || matches!(path.as_str(), "unit.index" | "unit.count" | "canvas.width" | "canvas.height"))
                {
                    return Err(Diagnostic::new(
                        "CAPTION_DEPENDENCY_CYCLE",
                        path,
                        "layout-dependent input is unavailable before layout",
                    ));
                }
            }
            Expression::Call { function, args } => {
                for a in args {
                    visit(a, s, budget)?;
                }
                if let Some(f) = s.functions.iter().find(|f| f.id == *function) {
                    visit(&f.body, s, budget)?;
                }
            }
            Expression::If {
                condition,
                then,
                otherwise,
            } => {
                visit(condition, s, budget)?;
                visit(then, s, budget)?;
                visit(otherwise, s, budget)?;
            }
            _ => {}
        }
        Ok(())
    }
    match value {
        DynamicValue::Expression { expression } => visit(expression, scene, &mut 4096)?,
        DynamicValue::Keyframes { clock, .. } if clock.unit != UnitKind::Cue => {
            return Err(invalid("clock", "pre-layout values require cue clock"));
        }
        _ => {}
    }
    Ok(())
}
