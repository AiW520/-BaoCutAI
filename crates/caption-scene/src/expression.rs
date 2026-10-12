use crate::*;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::collections::BTreeMap;

#[derive(Clone, Copy, Debug, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "kebab-case")]
pub enum ValueType {
    Scalar,
    Integer,
    Length,
    Time,
    Angle,
    Bool,
    Color,
}
#[derive(Clone, Debug, PartialEq, Serialize, Deserialize)]
#[serde(tag = "op", rename_all = "camelCase", deny_unknown_fields)]
pub enum Expression {
    Literal {
        #[serde(rename = "type")]
        value_type: ValueType,
        value: Value,
    },
    Read {
        path: String,
    },
    Call {
        function: String,
        args: Vec<Expression>,
    },
    If {
        condition: Box<Expression>,
        then: Box<Expression>,
        #[serde(rename = "else")]
        otherwise: Box<Expression>,
    },
}
#[derive(Clone, Debug, PartialEq)]
pub enum Evaluated {
    Number(ValueType, f64),
    Bool(bool),
    Color([f64; 4]),
}
impl Evaluated {
    pub fn value_type(&self) -> ValueType {
        match self {
            Self::Number(t, _) => *t,
            Self::Bool(_) => ValueType::Bool,
            Self::Color(_) => ValueType::Color,
        }
    }
    pub fn number(&self) -> Result<f64> {
        match self {
            Self::Number(_, v) => Ok(*v),
            _ => Err(invalid("value", "number required")),
        }
    }
    pub fn boolean(&self) -> Result<bool> {
        match self {
            Self::Bool(v) => Ok(*v),
            _ => Err(invalid("value", "boolean required")),
        }
    }
    pub fn finite(self) -> Result<Self> {
        if matches!(&self, Self::Number(_, n) if !n.is_finite()) || matches!(&self, Self::Color(c) if c.iter().any(|n| !n.is_finite())) {
            return Err(invalid("expression", "non-finite result"));
        }
        Ok(self)
    }
}
pub fn color(s: &str) -> Result<[f64; 4]> {
    let h = s.strip_prefix('#').ok_or_else(|| invalid("color", "expected hexadecimal color"))?;
    if !matches!(h.len(), 6 | 8) || !h.is_ascii() {
        return Err(invalid("color", "expected RRGGBB or RRGGBBAA"));
    }
    let mut c = [1.0; 4];
    for (i, v) in c.iter_mut().enumerate().take(h.len() / 2) {
        *v = u8::from_str_radix(&h[i * 2..i * 2 + 2], 16).map_err(|_| invalid("color", "invalid hexadecimal color"))? as f64 / 255.0;
    }
    Ok(c)
}
pub fn typed_value(t: ValueType, value: &Value) -> Result<Evaluated> {
    match t {
        ValueType::Color => Ok(Evaluated::Color(color(
            value.as_str().ok_or_else(|| invalid("value", "color string required"))?,
        )?)),
        ValueType::Bool => value
            .as_bool()
            .map(Evaluated::Bool)
            .ok_or_else(|| invalid("value", "boolean required")),
        _ => {
            let n = value
                .as_f64()
                .filter(|n| n.is_finite())
                .ok_or_else(|| invalid("value", "finite number required"))?;
            if t == ValueType::Integer && (n.fract() != 0.0 || n.abs() > 9_007_199_254_740_991.0) {
                return Err(invalid("value", "safe integer required"));
            }
            Ok(Evaluated::Number(t, n))
        }
    }
}
pub fn context_type(path: &str) -> Option<ValueType> {
    Some(match path {
        "time.elapsedSeconds"
        | "time.seconds"
        | "time.durationSeconds"
        | "time.cueDurationSeconds"
        | "time.pageElapsedSeconds"
        | "time.pageDurationSeconds"
        | "time.lineElapsedSeconds"
        | "time.lineDurationSeconds" => ValueType::Time,
        "unit.textIndex"
        | "unit.textCount"
        | "unit.pageTextIndex"
        | "unit.pageTextCount"
        | "unit.pageIndex"
        | "unit.pageCount"
        | "time.progress"
        | "time.clampedProgress"
        | "unit.index"
        | "unit.count"
        | "unit.selectedIndex"
        | "unit.selectedCount" => ValueType::Scalar,
        "unit.active" | "unit.read" | "unit.unread" => ValueType::Bool,
        "layout.x"
        | "layout.y"
        | "layout.width"
        | "layout.height"
        | "layout.baseline"
        | "layout.inkX"
        | "layout.inkY"
        | "layout.inkWidth"
        | "layout.inkHeight"
        | "layout.lineInkY"
        | "layout.lineInkHeight"
        | "canvas.width"
        | "canvas.height" => ValueType::Length,
        _ => return None,
    })
}
pub fn builtin_type(name: &str, args: &[ValueType]) -> Option<ValueType> {
    use ValueType::*;
    let numeric = |t| matches!(t, Scalar | Integer | Length | Time | Angle);
    match (name, args) {
        ("add" | "sub" | "min" | "max", [a, b]) if a == b && numeric(*a) => Some(*a),
        ("mul", [Scalar, Integer] | [Integer, Scalar]) => Some(Scalar),
        ("div", [Integer, Scalar | Integer]) => Some(Scalar),
        ("mix", [Integer, Integer, Scalar]) => Some(Scalar),
        ("mul", [Scalar | Integer, b]) | ("mul", [b, Scalar | Integer]) if numeric(*b) => Some(*b),
        ("div", [a, Scalar | Integer]) if numeric(*a) => Some(*a),
        ("div", [a, b]) if a == b && numeric(*a) => Some(Scalar),
        ("abs", [a]) if numeric(*a) => Some(*a),
        ("floor" | "ceil", [Scalar]) => Some(Scalar),
        ("sin" | "cos", [Angle]) => Some(Scalar),
        ("phase", [Time, Scalar]) => Some(Angle),
        ("mix", [a, b, Scalar]) if a == b && (numeric(*a) || *a == Color) => Some(*a),
        ("clamp", [a, b, c]) if a == b && b == c && numeric(*a) => Some(*a),
        ("smoothstep" | "sqrt", [Scalar]) => Some(Scalar),
        ("cubic-bezier", [Scalar, Scalar, Scalar, Scalar, Scalar]) => Some(Scalar),
        ("eq", [a, b]) if a == b => Some(Bool),
        ("lt" | "gt", [a, b]) if a == b && numeric(*a) => Some(Bool),
        ("and" | "or", [Bool, Bool]) | ("not", [Bool]) => Some(Bool),
        ("random" | "noise", [Scalar]) => Some(Scalar),
        _ => None,
    }
}
pub fn infer(expr: &Expression, scene: &Scene, arguments: &BTreeMap<String, ValueType>) -> Result<ValueType> {
    fn inner(e: &Expression, s: &Scene, a: &BTreeMap<String, ValueType>, stack: &mut Vec<String>, budget: &mut usize) -> Result<ValueType> {
        if *budget == 0 || stack.len() > 32 {
            return Err(Diagnostic::new("CAPTION_BUDGET_EXCEEDED", "expression", "expression expansion"));
        }
        *budget -= 1;
        match e {
            Expression::Literal { value_type, value } => {
                typed_value(*value_type, value)?;
                Ok(*value_type)
            }
            Expression::Read { path } => {
                let t = if let Some(id) = path.strip_prefix("params.") {
                    s.parameters.iter().find(|p| p.id == id).map(|p| p.value_type)
                } else if let Some(id) = path.strip_prefix("args.") {
                    a.get(id).copied()
                } else {
                    context_type(path)
                };
                t.ok_or_else(|| Diagnostic::new("CAPTION_EXPRESSION_TYPE", path, "unknown context field"))
            }
            Expression::If {
                condition,
                then,
                otherwise,
            } => {
                if inner(condition, s, a, stack, budget)? != ValueType::Bool {
                    return Err(invalid("if", "boolean condition required"));
                }
                let t = inner(then, s, a, stack, budget)?;
                if inner(otherwise, s, a, stack, budget)? != t {
                    return Err(invalid("if", "branch types differ"));
                }
                Ok(t)
            }
            Expression::Call { function, args } => {
                let ts = args.iter().map(|x| inner(x, s, a, stack, budget)).collect::<Result<Vec<_>>>()?;
                if let Some(t) = builtin_type(function, &ts) {
                    return Ok(t);
                }
                let f =
                    s.functions.iter().find(|f| f.id == *function).ok_or_else(|| {
                        Diagnostic::new("CAPTION_EXPRESSION_TYPE", function, "unknown function or invalid argument types")
                    })?;
                if stack.contains(function) {
                    return Err(Diagnostic::new("CAPTION_DEPENDENCY_CYCLE", function, "recursive function"));
                }
                if f.arguments.len() != ts.len() || f.arguments.iter().zip(&ts).any(|(a, t)| a.value_type != *t) {
                    return Err(invalid(function, "argument types differ"));
                }
                stack.push(function.clone());
                let inner_args = f.arguments.iter().map(|a| (a.name.clone(), a.value_type)).collect();
                let t = inner(&f.body, s, &inner_args, stack, budget)?;
                stack.pop();
                if t != f.returns {
                    return Err(invalid(function, "return type differs"));
                }
                Ok(t)
            }
        }
    }
    inner(expr, scene, arguments, &mut Vec::new(), &mut 4096)
}
#[derive(Clone, Debug, Default)]
pub struct Context {
    pub fields: BTreeMap<String, Evaluated>,
    pub spans: BTreeMap<UnitKind, (f64, f64)>,
    pub seed: u64,
    pub stable_key: String,
}
#[derive(Debug)]
pub struct Budget(pub usize);
impl Default for Budget {
    fn default() -> Self {
        Self(MAX_OPERATIONS)
    }
}
impl Budget {
    pub fn spend(&mut self) -> Result<()> {
        if self.0 == 0 {
            return Err(Diagnostic::new("CAPTION_BUDGET_EXCEEDED", "frame", "operation budget"));
        }
        self.0 -= 1;
        Ok(())
    }
}
pub fn evaluate(expr: &Expression, scene: &Scene, ctx: &Context, budget: &mut Budget) -> Result<Evaluated> {
    fn inner(e: &Expression, s: &Scene, c: &Context, a: &BTreeMap<String, Evaluated>, b: &mut Budget, depth: usize) -> Result<Evaluated> {
        b.spend()?;
        if depth > 64 {
            return Err(invalid("expression", "call depth exceeded"));
        }
        let value = match e {
            Expression::Literal { value_type, value } => typed_value(*value_type, value)?,
            Expression::Read { path } => {
                let v = if let Some(id) = path.strip_prefix("args.") {
                    a.get(id)
                } else {
                    c.fields.get(path)
                };
                v.cloned().ok_or_else(|| invalid(path, "context unavailable"))?
            }
            Expression::If {
                condition,
                then,
                otherwise,
            } => {
                let choice = inner(condition, s, c, a, b, depth + 1)?.boolean()?;
                inner(if choice { then } else { otherwise }, s, c, a, b, depth + 1)?
            }
            Expression::Call { function, args } => {
                let values = args.iter().map(|x| inner(x, s, c, a, b, depth + 1)).collect::<Result<Vec<_>>>()?;
                let types = values.iter().map(Evaluated::value_type).collect::<Vec<_>>();
                if let Some(t) = builtin_type(function, &types) {
                    builtin(function, &values, t, c)?
                } else {
                    let f = s
                        .functions
                        .iter()
                        .find(|f| f.id == *function)
                        .ok_or_else(|| invalid(function, "unknown function"))?;
                    let local = f.arguments.iter().zip(values).map(|(a, v)| (a.name.clone(), v)).collect();
                    inner(&f.body, s, c, &local, b, depth + 1)?
                }
            }
        };
        value.finite()
    }
    inner(expr, scene, ctx, &BTreeMap::new(), budget, 0)
}
fn random(seed: u64, key: &str, channel: u64) -> f64 {
    let mut h = seed ^ channel;
    for x in key.bytes() {
        h = (h ^ u64::from(x)).wrapping_mul(0x100000001b3);
    }
    h = h.wrapping_add(0x9e3779b97f4a7c15);
    h = (h ^ (h >> 30)).wrapping_mul(0xbf58476d1ce4e5b9);
    h = (h ^ (h >> 27)).wrapping_mul(0x94d049bb133111eb);
    h ^= h >> 31;
    (h >> 11) as f64 * (1.0 / 9007199254740992.0)
}
fn builtin(name: &str, v: &[Evaluated], t: ValueType, c: &Context) -> Result<Evaluated> {
    use Evaluated::*;
    if name == "eq" {
        return Ok(Bool(v[0] == v[1]));
    }
    if name == "and" {
        return Ok(Bool(v[0].boolean()? && v[1].boolean()?));
    }
    if name == "or" {
        return Ok(Bool(v[0].boolean()? || v[1].boolean()?));
    }
    if name == "not" {
        return Ok(Bool(!v[0].boolean()?));
    }
    if name == "mix" && t == ValueType::Color {
        let (Color(a), Color(b)) = (&v[0], &v[1]) else { unreachable!() };
        let u = v[2].number()?;
        return Ok(Color(std::array::from_fn(|i| a[i] + (b[i] - a[i]) * u)));
    }
    let n = v.iter().map(Evaluated::number).collect::<Result<Vec<_>>>()?;
    if name == "lt" {
        return Ok(Bool(n[0] < n[1]));
    }
    if name == "gt" {
        return Ok(Bool(n[0] > n[1]));
    }
    let x = match name {
        "add" => n[0] + n[1],
        "sub" => n[0] - n[1],
        "mul" => n[0] * n[1],
        "div" => {
            if n[1] == 0.0 {
                return Err(invalid("div", "division by zero"));
            }
            n[0] / n[1]
        }
        "min" => n[0].min(n[1]),
        "max" => n[0].max(n[1]),
        "abs" => n[0].abs(),
        "floor" => libm::floor(n[0]),
        "ceil" => libm::ceil(n[0]),
        "sin" => libm::sin(n[0]),
        "cos" => libm::cos(n[0]),
        "phase" => n[0] * n[1] * std::f64::consts::TAU,
        "mix" => n[0] + (n[1] - n[0]) * n[2],
        "clamp" => {
            if n[1] > n[2] {
                return Err(invalid("clamp", "reversed limits"));
            }
            n[0].clamp(n[1], n[2])
        }
        "sqrt" => {
            if n[0] < 0.0 {
                return Err(invalid("sqrt", "negative argument"));
            }
            libm::sqrt(n[0])
        }
        "smoothstep" => {
            let u = n[0].clamp(0.0, 1.0);
            u * u * (3.0 - 2.0 * u)
        }
        "cubic-bezier" => {
            if !(0.0..=1.0).contains(&n[1]) || !(0.0..=1.0).contains(&n[3]) {
                return Err(invalid("cubic-bezier", "control point x must be in [0, 1]"));
            }
            motion::curve::cubic_bezier(n[1], n[2], n[3], n[4], n[0])
        }
        "random" => random(c.seed, &c.stable_key, n[0].to_bits()),
        "noise" => {
            let lo = libm::floor(n[0]);
            let u = n[0] - lo;
            let u = u * u * (3.0 - 2.0 * u);
            let a = random(c.seed, &c.stable_key, lo.to_bits());
            let z = random(c.seed, &c.stable_key, (lo + 1.0).to_bits());
            a + (z - a) * u
        }
        _ => return Err(invalid(name, "unsupported function")),
    };
    Number(t, x).finite()
}
pub fn sample_value(
    value: &DynamicValue,
    t: ValueType,
    scene: &Scene,
    ctx: &Context,
    seconds: f64,
    budget: &mut Budget,
) -> Result<Option<Evaluated>> {
    budget.spend()?;
    match value {
        DynamicValue::Constant { value } => Ok(Some(typed_value(t, value)?)),
        DynamicValue::Expression { expression } => Ok(Some(evaluate(expression, scene, ctx, budget)?)),
        DynamicValue::Keyframes {
            clock,
            keys,
            interpolation,
            fill,
        } => {
            let &(start, end) = ctx
                .spans
                .get(&clock.unit)
                .ok_or_else(|| invalid("clock", "unit time unavailable"))?;
            let origin = match clock.origin {
                Origin::Start => start,
                Origin::End => end,
            } + clock.offset.seconds()
                + ctx.fields.get("unit.index").map(|v| v.number()).transpose()?.unwrap_or(0.0) * clock.stagger.seconds();
            let duration = match clock.duration {
                Duration::Fixed { ticks, timescale } => ticks as f64 / timescale as f64,
                Duration::UnitSpan => end - start,
            };
            let mut u = if duration == 0.0 {
                if seconds < origin { -1.0 } else { 1.0 }
            } else {
                (seconds - origin) / duration
            };
            let mut repeating = false;
            if let Some(repeat) = clock.repeat {
                if duration <= 0.0 {
                    return Err(invalid("repeat", "positive duration required"));
                }
                if u >= repeat.iterations as f64 {
                    return if fill.after == FillMode::Hold {
                        let key = if repeat.mode == RepeatMode::Yoyo && repeat.iterations % 2 == 0 {
                            &keys[0]
                        } else {
                            keys.last().unwrap()
                        };
                        Ok(Some(typed_value(t, &key.value)?))
                    } else {
                        Ok(None)
                    };
                }
                if u >= 0.0 {
                    let cycle = libm::floor(u) as u32;
                    u -= cycle as f64;
                    if repeat.mode == RepeatMode::Yoyo && cycle % 2 == 1 {
                        u = 1.0 - u;
                    }
                    repeating = true;
                }
            }
            if u < keys[0].at {
                return if fill.before == FillMode::Hold {
                    Ok(Some(typed_value(t, &keys[0].value)?))
                } else {
                    Ok(None)
                };
            }
            if u >= keys.last().unwrap().at {
                return if fill.after == FillMode::Hold || (repeating && u == 1.0) {
                    Ok(Some(typed_value(t, &keys.last().unwrap().value)?))
                } else {
                    Ok(None)
                };
            }
            let i = keys.partition_point(|k| k.at <= u).saturating_sub(1);
            let (a, b) = (&keys[i], &keys[i + 1]);
            let mut p = (u - a.at) / (b.at - a.at);
            p = match interpolation {
                Interpolation::Linear => p,
                Interpolation::Step => 0.0,
                Interpolation::EaseOutQuad => motion::curve::apply_ease_id(motion::curve::EaseId::EaseOutQuad, p),
                Interpolation::CubicBezier { x1, y1, x2, y2 } => motion::curve::cubic_bezier(*x1, *y1, *x2, *y2, p),
            };
            let av = typed_value(t, &a.value)?;
            let bv = typed_value(t, &b.value)?;
            if *interpolation == Interpolation::Step {
                return Ok(Some(av));
            }
            Ok(Some(builtin("mix", &[av, bv, Evaluated::Number(ValueType::Scalar, p)], t, ctx)?))
        }
    }
}
