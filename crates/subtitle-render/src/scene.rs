//! Declarative caption scenes. Layout, animation and recording are shared by native and WASM.
mod materials;
mod sampled_layout;
use anyhow::{Result, bail};
use caption_scene::*;
use render_raster::drawop::{
    BitmapData, DrawOp, FrameBuilder, GradientStop, PaintData, path_from_skia,
};
use render_raster::fonts::{GlyphRender, ShapedLine};
use render_raster::{FrameMedia, FrameOps, TextEngine, rasterize_with_media};
use scene_primitives::{
    layout::TextMetricsLine,
    text_layout::{Wrap, layout},
};
use sha2::{Digest, Sha256};
use std::{collections::BTreeMap, ops::Range, sync::Arc};
use tiny_skia::{Pixmap, Transform};
use unicode_segmentation::UnicodeSegmentation;

#[derive(Clone, Debug)]
pub struct SceneWord {
    pub id: String,
    pub text: String,
    pub start: f64,
    pub end: f64,
}
#[derive(Clone, Debug)]
pub struct SceneCue {
    pub id: String,
    pub document_id: String,
    pub text: String,
    pub start: f64,
    pub end: f64,
    pub words: Vec<SceneWord>,
}
#[derive(Clone, Debug)]
struct Word {
    id: String,
    bytes: Range<usize>,
    span: Option<(f64, f64)>,
}
#[derive(Clone, Copy, Debug, Default)]
pub struct Bounds {
    pub x: f64,
    pub y: f64,
    pub width: f64,
    pub height: f64,
}
#[derive(Clone)]
struct Line {
    bytes: Range<usize>,
    shape: ShapedLine,
    bounds: Bounds,
    baseline: f64,
    glyph_ink: Vec<Option<Bounds>>,
    ink_bounds: Bounds,
}
impl Line {
    fn new(
        text: &mut TextEngine,
        bytes: Range<usize>,
        shape: ShapedLine,
        bounds: Bounds,
        baseline: f64,
    ) -> Self {
        let glyph_ink = shape
            .glyphs
            .iter()
            .map(|glyph| {
                text.glyph_ink_bounds(glyph.cache_key).map(|ink| Bounds {
                    x: bounds.x + glyph.x + ink.x() as f64,
                    y: baseline + glyph.y + ink.y() as f64,
                    width: ink.width() as f64,
                    height: ink.height() as f64,
                })
            })
            .collect::<Vec<_>>();
        let ink_bounds = if glyph_ink.iter().any(Option::is_some) {
            union(glyph_ink.iter().copied().flatten())
        } else {
            Bounds {
                x: bounds.x,
                y: baseline - shape.ascent,
                width: bounds.width,
                height: shape.ascent + shape.descent.abs(),
            }
        };
        Self {
            bytes,
            shape,
            bounds,
            baseline,
            glyph_ink,
            ink_bounds,
        }
    }
    fn ink_for(&self, range: &Range<usize>, advance: Bounds) -> Bounds {
        let ink = self
            .shape
            .glyphs
            .iter()
            .zip(&self.glyph_ink)
            .filter_map(|(glyph, ink)| {
                range
                    .contains(&(self.bytes.start + glyph.cluster.start))
                    .then_some(*ink)
                    .flatten()
            })
            .collect::<Vec<_>>();
        if ink.is_empty() {
            // Whitespace retains its caret/advance horizontally and inherits the
            // visual line vertically, including trailing unshaped whitespace.
            Bounds {
                x: advance.x,
                width: advance.width,
                y: self.ink_bounds.y,
                height: self.ink_bounds.height,
            }
        } else {
            union(ink.into_iter())
        }
    }
}
#[derive(Clone)]
struct Page {
    source_range: Range<usize>,
    lines: Vec<Line>,
    words: Vec<usize>,
    start: f64,
    end: f64,
    bounds: Bounds,
}
#[derive(Clone)]
struct TextLayout {
    pages: Vec<Page>,
    words: Vec<Word>,
    content: String,
}
#[derive(Clone)]
struct Unit {
    whitespace: bool,
    text_index: usize,
    text_count: usize,
    page_text_index: usize,
    page_text_count: usize,
    page_index: usize,
    page_count: usize,
    kind: UnitKind,
    id: String,
    index: usize,
    count: usize,
    bytes: Range<usize>,
    bounds: Bounds,
    ink_bounds: Bounds,
    line_ink_bounds: Bounds,
    baseline: f64,
    spans: BTreeMap<UnitKind, (f64, f64)>,
    state: WordState,
    tags: Vec<String>,
}
#[derive(Clone, Debug)]
pub struct SceneHit {
    pub cue_id: String,
    pub document_id: String,
    pub bounds: Bounds,
}
pub struct SceneFrame {
    pub rgba: Arc<Vec<u8>>,
    pub hits: Vec<SceneHit>,
    pub fingerprint: u64,
}

pub struct ScenePlan {
    pub text: TextEngine,
    pub diagnostics: Vec<Diagnostic>,
    style: SceneStyle,
    presentation: Presentation,
    cues: Vec<SceneCue>,
    layouts: BTreeMap<(usize, String), TextLayout>,
    pub width: u32,
    pub height: u32,
    instance_id: String,
    images: BTreeMap<String, BitmapData>,
}
impl ScenePlan {
    pub fn compile(
        style: SceneStyle,
        presentation: Presentation,
        cues: Vec<SceneCue>,
        size: (u32, u32),
        text: TextEngine,
        instance_id: String,
    ) -> Result<Self> {
        validate_style(&style)?;
        validate_presentation(&presentation, Some(style.scene()))?;
        if size.0 == 0 || size.1 == 0 || u64::from(size.0) * u64::from(size.1) > 16_777_216 {
            bail!("CAPTION_BUDGET_EXCEEDED: canvas");
        }
        if cues.len() > MAX_UNITS {
            bail!("CAPTION_BUDGET_EXCEEDED: cues");
        }
        let mut p = Self {
            text,
            diagnostics: vec![],
            style,
            presentation,
            cues,
            layouts: BTreeMap::new(),
            width: size.0,
            height: size.1,
            instance_id,
            images: BTreeMap::new(),
        };
        let mut nodes = Vec::new();
        text_nodes(&p.style.scene().nodes, &mut nodes);
        let mut glyph_count = 0usize;
        for i in 0..p.cues.len() {
            let cue = &p.cues[i];
            if !cue.start.is_finite()
                || !cue.end.is_finite()
                || cue.end < cue.start
                || cue.text.len() > 65536
            {
                bail!("CAPTION_SCENE_INVALID: cue span or text");
            }
            if cue.words.is_empty() && p.style.scene().speech_state.timing_policy==TimingPolicy::RequireWordTiming &&
                (nodes.iter().any(|n|!n.state_styles.is_empty()) || p.style.scene().animations.iter().any(|a|matches!(&a.value,DynamicValue::Keyframes{clock,..} if matches!(clock.unit,UnitKind::Word|UnitKind::Grapheme)))) {
                p.diagnostics.push(Diagnostic::new("CAPTION_TIMING_UNAVAILABLE",&cue.id,"word"));
            }
            let params = cue_parameters(&p.style, &p.presentation, cue, &p.instance_id)?;
            for n in &nodes {
                let l = prepare(
                    &mut p.text,
                    cue,
                    n,
                    &p.style.scene().layout,
                    &p.style.scene().speech_state,
                    size,
                    &params,
                )?;
                glyph_count += l
                    .pages
                    .iter()
                    .flat_map(|p| &p.lines)
                    .map(|l| l.shape.glyphs.len())
                    .sum::<usize>();
                if glyph_count > 131072 {
                    bail!("CAPTION_BUDGET_EXCEEDED: prepared glyphs");
                }
                p.layouts.insert((i, n.id.clone()), l);
            }
        }
        Ok(p)
    }
    /// Resolve frozen PNG resources atomically before recording frames.
    pub fn load_resources(
        &mut self,
        mut read: impl FnMut(&ImageResource) -> Option<Vec<u8>>,
    ) -> Result<()> {
        let mut images = BTreeMap::new();
        let mut decoded = 0usize;
        for r in &self.style.scene().resources {
            let bytes =
                read(r).ok_or_else(|| anyhow::anyhow!("CAPTION_RESOURCE_MISSING: {}", r.id))?;
            if bytes.len() > 16 * 1024 * 1024 {
                bail!("CAPTION_BUDGET_EXCEEDED: encoded image");
            }
            if format!(
                "sha256:{}",
                Sha256::digest(&bytes)
                    .iter()
                    .map(|b| format!("{b:02x}"))
                    .collect::<String>()
            ) != r.content_hash
            {
                bail!("CAPTION_RESOURCE_DIGEST: {}", r.id);
            }
            if bytes.len() < 24 || &bytes[..8] != b"\x89PNG\r\n\x1a\n" || &bytes[12..16] != b"IHDR"
            {
                bail!("CAPTION_RESOURCE_FORMAT: {}", r.id);
            }
            let width = u32::from_be_bytes(bytes[16..20].try_into().unwrap());
            let height = u32::from_be_bytes(bytes[20..24].try_into().unwrap());
            let size = u64::from(width)
                .checked_mul(u64::from(height))
                .and_then(|n| n.checked_mul(4))
                .ok_or_else(|| anyhow::anyhow!("CAPTION_BUDGET_EXCEEDED: image dimensions"))?;
            if width == 0
                || height == 0
                || size > 64 * 1024 * 1024
                || decoded as u64 + size > 64 * 1024 * 1024
            {
                bail!("CAPTION_BUDGET_EXCEEDED: decoded images");
            }
            let image = Pixmap::decode_png(&bytes)?;
            decoded += size as usize;
            images.insert(
                r.id.clone(),
                BitmapData {
                    width: image.width(),
                    height: image.height(),
                    rgba: Arc::from(image.data()),
                },
            );
        }
        self.images = images;
        Ok(())
    }
    pub fn into_text_engine(self) -> TextEngine {
        self.text
    }
    pub fn record(&mut self, seconds: f64) -> Result<(FrameOps, Vec<SceneHit>)> {
        let mut budget = Budget::default();
        if self.style.scene().materials.is_empty() {
            self.record_base(seconds, None, &mut budget)
        } else {
            self.record_materials(seconds, &mut budget)
        }
    }
    fn record_base(
        &mut self,
        seconds: f64,
        only_cue: Option<usize>,
        budget: &mut Budget,
    ) -> Result<(FrameOps, Vec<SceneHit>)> {
        if !seconds.is_finite() {
            bail!("CAPTION_SCENE_INVALID: sample time");
        }
        if self.images.len() != self.style.scene().resources.len() {
            bail!("CAPTION_RESOURCE_MISSING: unresolved scene images");
        }
        let mut builder = FrameBuilder::default();
        let mut hits = Vec::new();
        let base_scene = self.style.scene();
        for (ci, cue) in self.cues.iter().enumerate().filter(|(i, c)| {
            only_cue.is_none_or(|id| id == *i) && seconds >= c.start && seconds < c.end
        }) {
            let params = cue_parameters(&self.style, &self.presentation, cue, &self.instance_id)?;
            let context = sampled_layout::early_context(
                cue,
                ci,
                self.cues.len(),
                seconds,
                &params,
                (self.width, self.height),
                &self.instance_id,
                &self.presentation.seed,
            )?;
            let sampled = sampled_layout::sample_scene(base_scene, &context, seconds, budget)?;
            let scene = sampled.as_ref().unwrap_or(base_scene);
            let mut units = BTreeMap::new();
            for ((idx, id), l) in self.layouts.iter().filter(|((idx, _), _)| *idx == ci) {
                let _ = idx;
                if let Some(pi) = l
                    .pages
                    .iter()
                    .position(|p| seconds >= p.start && seconds < p.end)
                {
                    if sampled.is_some() {
                        let node = sampled_layout::find_text(&scene.nodes, id)
                            .expect("validated text node");
                        let mut relayout = l.clone();
                        relayout.pages[pi] = sampled_layout::reflow(
                            &mut self.text,
                            l,
                            &l.pages[pi],
                            node,
                            &scene.layout,
                            (self.width, self.height),
                            &params,
                            budget,
                        )?;
                        units.insert(
                            id.clone(),
                            units_for(
                                cue,
                                &relayout,
                                &relayout.pages[pi],
                                seconds,
                                &scene.speech_state,
                                &self.presentation,
                            ),
                        );
                    } else {
                        units.insert(
                            id.clone(),
                            units_for(
                                cue,
                                l,
                                &l.pages[pi],
                                seconds,
                                &scene.speech_state,
                                &self.presentation,
                            ),
                        );
                    }
                }
            }
            if units.is_empty() {
                continue;
            }
            let context = RenderContext {
                scene,
                units: &units,
                params: &params,
                seconds,
                seed: u64::from_str_radix(&self.presentation.seed, 16)?,
                instance: &self.instance_id,
                cue,
                size: (self.width, self.height),
                images: &self.images,
            };
            draw_nodes(
                &scene.nodes,
                Transform::identity(),
                None,
                &context,
                &mut self.text,
                &mut builder,
                &mut hits,
                budget,
            )?;
        }
        Ok((builder.finish(), hits))
    }
    pub fn render(&mut self, seconds: f64) -> Result<SceneFrame> {
        let (ops, hits) = self.record(seconds)?;
        struct NoMedia;
        impl FrameMedia for NoMedia {
            fn frame(&mut self, _: &str, _: i64) -> Result<Arc<Pixmap>> {
                bail!("CAPTION_RESOURCE_MISSING")
            }
        }
        let image = rasterize_with_media(&ops, self.width, self.height, &mut NoMedia)?;
        Ok(SceneFrame {
            rgba: Arc::new(image.data().to_vec()),
            hits,
            fingerprint: render_raster::fingerprint(&ops),
        })
    }
}
fn cue_parameters(
    style: &SceneStyle,
    presentation: &Presentation,
    cue: &SceneCue,
    instance: &str,
) -> Result<BTreeMap<String, Evaluated>> {
    let mut layers = vec![&style.parameters, &presentation.parameters];
    let overrides = presentation
        .cue_overrides
        .iter()
        .filter(|o| o.occurrence_id.is_none())
        .chain(
            presentation
                .cue_overrides
                .iter()
                .filter(|o| o.occurrence_id.is_some()),
        );
    for o in overrides {
        if o.cue_id == cue.id
            && o.occurrence_id
                .as_ref()
                .is_none_or(|id| instance.split_once('|').map_or(instance, |(_, s)| s) == id)
        {
            layers.push(&o.parameters);
        }
    }
    Ok(parameters(style.scene(), &layers)?)
}

fn text_nodes(nodes: &[Node], out: &mut Vec<Node>) {
    for n in nodes {
        if n.kind == NodeKind::Text {
            out.push(n.clone());
        }
        text_nodes(&n.children, out);
    }
}
fn bind_words(
    cue: &SceneCue,
    content: &str,
    timing: TimingPolicy,
    static_text: bool,
) -> Result<Vec<Word>> {
    let mut words = Vec::new();
    let mut at = 0;
    if !static_text {
        for w in &cue.words {
            if w.text.is_empty() {
                continue;
            }
            let offset = content[at..].find(&w.text).ok_or_else(|| {
                anyhow::anyhow!(
                    "CAPTION_SCENE_INVALID: word {} does not map to cue text",
                    w.id
                )
            })?;
            let a = at + offset;
            let b = a + w.text.len();
            if !w.start.is_finite() || !w.end.is_finite() || w.end < w.start {
                bail!("CAPTION_SCENE_INVALID: word time");
            }
            words.push(Word {
                id: w.id.clone(),
                bytes: a..b,
                span: Some((w.start, w.end)),
            });
            at = b;
        }
    }
    if words.is_empty() {
        for (a, w) in content.unicode_word_indices() {
            words.push(Word {
                id: format!("display-{a}"),
                bytes: a..a + w.len(),
                span: None,
            });
        }
        if words.is_empty() && !content.is_empty() {
            words.push(Word {
                id: "display-0".into(),
                bytes: 0..content.len(),
                span: None,
            });
        }
        if timing == TimingPolicy::Estimated {
            let total = words.len().max(1) as f64;
            for (i, w) in words.iter_mut().enumerate() {
                w.span = Some((
                    cue.start + (cue.end - cue.start) * i as f64 / total,
                    cue.start + (cue.end - cue.start) * (i + 1) as f64 / total,
                ));
            }
        }
    }
    if words.len() > MAX_UNITS {
        bail!("CAPTION_BUDGET_EXCEEDED: words");
    }
    Ok(words)
}
fn prepare(
    text: &mut TextEngine,
    cue: &SceneCue,
    node: &Node,
    cfg: &Layout,
    speech: &SpeechState,
    size: (u32, u32),
    parameters: &BTreeMap<String, Evaluated>,
) -> Result<TextLayout> {
    let content = match &node.text {
        Some(TextBinding::Static { text }) => text.as_str(),
        _ => cue.text.as_str(),
    };
    let words = bind_words(
        cue,
        content,
        speech.timing_policy,
        matches!(node.text, Some(TextBinding::Static { .. })),
    )?;
    let fs = node.style.font_size.resolve(size.0, size.1, parameters)?;
    let width = cfg.width.resolve(size.0, size.1, parameters)?;
    if !(1.0..=4096.0).contains(&fs) || !(1.0..=65536.0).contains(&width) {
        bail!("CAPTION_SCENE_INVALID: resolved font size or width");
    }
    let max = cfg.pagination.max_units_per_page.unwrap_or(MAX_UNITS);
    let mut ranges = Vec::new();
    let mut from = 0;
    for chunk in words.chunks(max) {
        let end = chunk.last().unwrap().bytes.end;
        ranges.push(from..end);
        from = end;
    }
    if let Some(last) = ranges.last_mut() {
        last.end = content.len();
    }
    let mut pages = Vec::new();
    for range in ranges {
        let source = &content[range.clone()];
        let style = &node.style;
        let block = layout(
            source,
            Wrap::Word,
            Some(width),
            fs * style.line_height,
            |r| {
                let sh = text.shape_spaced(
                    &source[r],
                    &style.font_family,
                    fs,
                    style.font_weight,
                    style.italic,
                    style.letter_spacing * fs,
                );
                TextMetricsLine {
                    width: sh.width,
                    ascent: sh.ascent,
                    descent: sh.descent,
                }
            },
        );
        for rowgroup in block.lines.chunks(cfg.max_lines) {
            let x = cfg.x.resolve(size.0, size.1, parameters)?;
            let y = cfg.y.resolve(size.0, size.1, parameters)?;
            let mut lines = Vec::new();
            let height = rowgroup.len() as f64 * fs * style.line_height;
            for (i, line) in rowgroup.iter().enumerate() {
                let bytes = range.start + line.bytes.start..range.start + line.paint_end;
                let sh = text.shape_spaced(
                    &content[bytes.clone()],
                    &style.font_family,
                    fs,
                    style.font_weight,
                    style.italic,
                    style.letter_spacing * fs,
                );
                let lx = match cfg.align {
                    Align::Left => x - width / 2.0,
                    Align::Center => x - sh.width / 2.0,
                    Align::Right => x + width / 2.0 - sh.width,
                };
                let ly = y - height / 2.0 + i as f64 * fs * style.line_height;
                let baseline = ly + sh.ascent;
                let bounds = Bounds {
                    x: lx,
                    y: ly,
                    width: sh.width,
                    height: fs * style.line_height,
                };
                lines.push(Line::new(text, bytes, sh, bounds, baseline));
            }
            let Some(first) = lines.first() else { continue };
            let Some(last) = lines.last() else { continue };
            let member = words
                .iter()
                .enumerate()
                .filter(|(_, w)| w.bytes.start < last.bytes.end && w.bytes.end > first.bytes.start)
                .map(|(i, _)| i)
                .collect::<Vec<_>>();
            let bounds = union(lines.iter().map(|l| l.bounds));
            pages.push(Page {
                source_range: range.start + rowgroup.first().unwrap().bytes.start
                    ..range.start + rowgroup.last().unwrap().bytes.end,
                lines,
                words: member,
                start: cue.start,
                end: cue.end,
                bounds,
            });
        }
    }
    let count = pages.len().max(1) as f64;
    for (i, p) in pages.iter_mut().enumerate() {
        let first = p.words.first().map(|i| &words[*i]);
        p.start = first
            .and_then(|w| {
                w.span.map(|s| {
                    let byte = p
                        .lines
                        .first()
                        .map_or(w.bytes.start, |l| l.bytes.start)
                        .clamp(w.bytes.start, w.bytes.end);
                    let consumed = content[w.bytes.start..byte].graphemes(true).count();
                    let total = content[w.bytes.clone()].graphemes(true).count().max(1);
                    s.0 + (s.1 - s.0) * consumed as f64 / total as f64
                })
            })
            .unwrap_or(cue.start + (cue.end - cue.start) * i as f64 / count)
            .max(cue.start);
    }
    if cfg.leading_gap == LeadingGap::Show {
        if let Some(p) = pages.first_mut() {
            p.start = cue.start;
        }
    }
    for i in 0..pages.len() {
        pages[i].end = pages.get(i + 1).map_or(cue.end, |p| p.start).min(cue.end);
    }
    Ok(TextLayout {
        pages,
        words,
        content: content.into(),
    })
}
fn union(boxes: impl Iterator<Item = Bounds>) -> Bounds {
    let mut b = None;
    for x in boxes {
        b = Some(match b {
            None => x,
            Some(v) => {
                let v: Bounds = v;
                let left = v.x.min(x.x);
                let top = v.y.min(x.y);
                Bounds {
                    x: left,
                    y: top,
                    width: (v.x + v.width).max(x.x + x.width) - left,
                    height: (v.y + v.height).max(x.y + x.height) - top,
                }
            }
        });
    }
    b.unwrap_or_default()
}
fn span(words: &[Word], members: impl Iterator<Item = usize>, fallback: (f64, f64)) -> (f64, f64) {
    let spans = members.filter_map(|i| words[i].span).collect::<Vec<_>>();
    if spans.is_empty() {
        fallback
    } else {
        (
            spans.iter().map(|s| s.0).fold(f64::INFINITY, f64::min),
            spans.iter().map(|s| s.1).fold(f64::NEG_INFINITY, f64::max),
        )
    }
}
fn active_word(words: &[Word], indices: &[usize], t: f64, cfg: &SpeechState) -> Option<usize> {
    let winner = |predicate: &dyn Fn((f64, f64)) -> bool| {
        indices
            .iter()
            .copied()
            .filter(|i| words[*i].span.is_some_and(predicate))
            .max_by(|a, b| {
                words[*a]
                    .span
                    .unwrap()
                    .0
                    .total_cmp(&words[*b].span.unwrap().0)
                    .then(a.cmp(b))
            })
    };
    if let Some(i) = winner(&|s| s.0 <= t && t < s.1) {
        return Some(i);
    }
    let last = indices
        .iter()
        .filter_map(|i| words[*i].span)
        .map(|s| s.1)
        .fold(f64::NEG_INFINITY, f64::max);
    let hold = if t >= last {
        cfg.tail_policy == TailPolicy::HoldLast
    } else {
        cfg.gap_policy == GapPolicy::HoldPrevious
    };
    if hold {
        winner(&|s| s.0 <= t && s.1 > s.0)
    } else {
        None
    }
}
fn units_for(
    cue: &SceneCue,
    layout: &TextLayout,
    page: &Page,
    t: f64,
    cfg: &SpeechState,
    presentation: &Presentation,
) -> Vec<(Unit, Option<Line>)> {
    let mut spans = BTreeMap::from([
        (UnitKind::Cue, (cue.start, cue.end)),
        (UnitKind::Page, (page.start, page.end)),
    ]);
    let page_ink = if page
        .lines
        .iter()
        .any(|l| l.glyph_ink.iter().any(Option::is_some))
    {
        union(
            page.lines
                .iter()
                .filter(|l| l.glyph_ink.iter().any(Option::is_some))
                .map(|l| l.ink_bounds),
        )
    } else {
        union(page.lines.iter().map(|l| l.ink_bounds))
    };
    let page_index = layout
        .pages
        .iter()
        .position(|candidate| candidate.source_range == page.source_range)
        .unwrap_or(0);
    let base = Unit {
        whitespace: false,
        text_index: 0,
        text_count: 0,
        page_text_index: 0,
        page_text_count: 0,
        page_index,
        page_count: layout.pages.len(),
        kind: UnitKind::Cue,
        id: cue.id.clone(),
        index: 0,
        count: 1,
        bytes: 0..layout.content.len(),
        bounds: page.bounds,
        ink_bounds: page_ink,
        line_ink_bounds: page_ink,
        baseline: page.lines.first().map_or(0.0, |l| l.baseline),
        spans: spans.clone(),
        state: WordState::Unread,
        tags: vec![],
    };
    let mut all = vec![(base.clone(), None)];
    let mut p = base.clone();
    p.kind = UnitKind::Page;
    p.index = page_index;
    p.count = layout.pages.len();
    p.id = format!("page-{}", page.lines.first().map_or(0, |l| l.bytes.start));
    all.push((p, None));
    let active = active_word(&layout.words, &page.words, t, cfg);
    for (li, line) in page.lines.iter().enumerate() {
        let members = page
            .words
            .iter()
            .copied()
            .filter(|i| {
                layout.words[*i].bytes.start < line.bytes.end
                    && layout.words[*i].bytes.end > line.bytes.start
            })
            .collect::<Vec<_>>();
        spans.insert(
            UnitKind::Line,
            span(
                &layout.words,
                members.iter().copied(),
                (page.start, page.end),
            ),
        );
        let mut u = base.clone();
        u.kind = UnitKind::Line;
        u.index = li;
        u.count = page.lines.len();
        u.id = format!("line-{}", line.bytes.start);
        u.bytes = line.bytes.clone();
        u.bounds = line.bounds;
        u.ink_bounds = line.ink_bounds;
        u.line_ink_bounds = line.ink_bounds;
        u.baseline = line.baseline;
        u.spans = spans.clone();
        u.state = if active.is_some_and(|word| members.contains(&word)) {
            WordState::Active
        } else if !members.is_empty()
            && members
                .iter()
                .all(|i| layout.words[*i].span.is_some_and(|(_, end)| t >= end))
        {
            WordState::Read
        } else {
            WordState::Unread
        };
        all.push((u.clone(), Some(line.clone())));
        for (wi, i) in members.iter().enumerate() {
            let w = &layout.words[*i];
            let mut u = u.clone();
            u.kind = UnitKind::Word;
            u.id = w.id.clone();
            u.index = wi;
            u.count = members.len();
            u.bytes = w.bytes.clone();
            u.state = if active == Some(*i) {
                WordState::Active
            } else if w.span.is_some_and(|s| t >= s.0) {
                WordState::Read
            } else {
                WordState::Unread
            };
            if let Some(s) = w.span {
                u.spans.insert(UnitKind::Word, s);
            }
            u.tags = presentation
                .word_tags
                .get(&w.id)
                .cloned()
                .unwrap_or_default();
            u.bounds = glyph_bounds(line, &w.bytes);
            u.ink_bounds = line.ink_for(&w.bytes, u.bounds);
            all.push((u.clone(), None));
            let content = &layout.content;
            if w.bytes.end <= content.len()
                && content.is_char_boundary(w.bytes.start)
                && content.is_char_boundary(w.bytes.end)
            {
                let gs = content[w.bytes.clone()]
                    .grapheme_indices(true)
                    .collect::<Vec<_>>();
                for (gi, (at, g)) in gs.iter().enumerate() {
                    let start = w.bytes.start + at;
                    if start < line.bytes.start || start >= line.bytes.end {
                        continue;
                    }
                    let mut gu = u.clone();
                    gu.kind = UnitKind::Grapheme;
                    gu.id = format!("{}:{at}", w.id);
                    gu.index = gi;
                    gu.count = gs.len();
                    gu.bytes = w.bytes.start + at..w.bytes.start + at + g.len();
                    gu.bounds = glyph_bounds(line, &gu.bytes);
                    gu.ink_bounds = line.ink_for(&gu.bytes, gu.bounds);
                    if let Some(s) = w.span {
                        gu.spans.insert(UnitKind::Grapheme, s);
                    }
                    all.push((gu, None));
                }
            }
        }
        // Whitespace has layout/caret geometry but no spoken-word timing.
        // It is opt-in at selection time, preserving existing selector sets.
        let start = if li == 0 {
            page.source_range.start
        } else {
            line.bytes.start
        };
        let end = page
            .lines
            .get(li + 1)
            .map_or(page.source_range.end, |next| next.bytes.start);
        for (offset, grapheme) in layout.content[start..end].grapheme_indices(true) {
            if !grapheme.chars().all(char::is_whitespace) {
                continue;
            }
            let bytes = start + offset..start + offset + grapheme.len();
            let next_word = layout
                .words
                .partition_point(|word| word.bytes.end <= bytes.start);
            if layout
                .words
                .get(next_word)
                .is_some_and(|word| word.bytes.start <= bytes.start && bytes.end <= word.bytes.end)
            {
                continue;
            }
            let mut blank = u.clone();
            blank.kind = UnitKind::Grapheme;
            blank.whitespace = true;
            blank.id = format!("space-{}", bytes.start);
            blank.bytes = bytes;
            blank.index = 0;
            blank.count = 1;
            blank.bounds = glyph_bounds(line, &blank.bytes);
            if blank.bounds.height == 0.0 {
                blank.bounds = Bounds {
                    x: line.bounds.x + line.bounds.width,
                    y: line.bounds.y,
                    width: 0.0,
                    height: line.bounds.height,
                };
            }
            blank.ink_bounds = line.ink_for(&blank.bytes, blank.bounds);
            blank
                .spans
                .insert(UnitKind::Grapheme, spans[&UnitKind::Line]);
            all.push((blank, None));
        }
    }
    let starts = layout
        .content
        .grapheme_indices(true)
        .map(|(at, _)| at)
        .collect::<Vec<_>>();
    let page_start = starts.partition_point(|at| *at < page.source_range.start);
    let page_end = starts.partition_point(|at| *at < page.source_range.end);
    for (unit, _) in &mut all {
        let at = if unit.kind == UnitKind::Page {
            page.source_range.start
        } else {
            unit.bytes.start
        };
        unit.text_index = starts.partition_point(|start| *start < at);
        unit.text_count = starts.len();
        unit.page_text_index = unit.text_index.saturating_sub(page_start);
        unit.page_text_count = page_end - page_start;
    }
    all
}
fn selected(selector: &Selector, unit: &Unit) -> bool {
    unit.kind == selector.unit
        && (!unit.whitespace || selector.include_whitespace)
        && selector.filter.matches(unit.index, unit.state, &unit.tags)
}
fn glyph_bounds(line: &Line, range: &Range<usize>) -> Bounds {
    let mut boxes = Vec::new();
    for g in &line.shape.glyphs {
        let start = line.bytes.start + g.cluster.start;
        if start < range.start || start >= range.end {
            continue;
        }
        let right = line
            .shape
            .glyphs
            .iter()
            .filter(|other| other.x > g.x)
            .map(|other| other.x)
            .fold(line.shape.width, f64::min);
        boxes.push(Bounds {
            x: line.bounds.x + g.x,
            y: line.bounds.y,
            width: (right - g.x).max(0.0),
            height: line.bounds.height,
        });
    }
    union(boxes.into_iter())
}
struct RenderContext<'a> {
    scene: &'a Scene,
    units: &'a BTreeMap<String, Vec<(Unit, Option<Line>)>>,
    params: &'a BTreeMap<String, Evaluated>,
    seconds: f64,
    seed: u64,
    instance: &'a str,
    cue: &'a SceneCue,
    size: (u32, u32),
    images: &'a BTreeMap<String, BitmapData>,
}
fn context(u: &Unit, r: &RenderContext) -> Context {
    let mut fields = r.params.clone();
    let (a, b) = u
        .spans
        .get(&u.kind)
        .copied()
        .unwrap_or((r.cue.start, r.cue.end));
    let progress = if b > a {
        (r.seconds - a) / (b - a)
    } else if r.seconds < a {
        0.0
    } else {
        1.0
    };
    for (k, t, v) in [
        ("time.seconds", ValueType::Time, r.seconds - r.cue.start),
        ("time.elapsedSeconds", ValueType::Time, r.seconds - a),
        ("time.durationSeconds", ValueType::Time, b - a),
        (
            "time.cueDurationSeconds",
            ValueType::Time,
            r.cue.end - r.cue.start,
        ),
        (
            "time.pageElapsedSeconds",
            ValueType::Time,
            r.seconds - u.spans.get(&UnitKind::Page).map_or(r.cue.start, |s| s.0),
        ),
        (
            "time.pageDurationSeconds",
            ValueType::Time,
            u.spans
                .get(&UnitKind::Page)
                .map_or(r.cue.end - r.cue.start, |s| s.1 - s.0),
        ),
        (
            "time.lineElapsedSeconds",
            ValueType::Time,
            r.seconds - u.spans.get(&UnitKind::Line).map_or(a, |s| s.0),
        ),
        (
            "time.lineDurationSeconds",
            ValueType::Time,
            u.spans.get(&UnitKind::Line).map_or(b - a, |s| s.1 - s.0),
        ),
        ("unit.pageIndex", ValueType::Scalar, u.page_index as f64),
        ("unit.pageCount", ValueType::Scalar, u.page_count as f64),
        ("unit.textIndex", ValueType::Scalar, u.text_index as f64),
        ("unit.textCount", ValueType::Scalar, u.text_count as f64),
        (
            "unit.pageTextIndex",
            ValueType::Scalar,
            u.page_text_index as f64,
        ),
        (
            "unit.pageTextCount",
            ValueType::Scalar,
            u.page_text_count as f64,
        ),
        ("time.progress", ValueType::Scalar, progress),
        (
            "time.clampedProgress",
            ValueType::Scalar,
            progress.clamp(0.0, 1.0),
        ),
        ("unit.index", ValueType::Scalar, u.index as f64),
        ("unit.count", ValueType::Scalar, u.count as f64),
        ("unit.selectedIndex", ValueType::Scalar, u.index as f64),
        ("unit.selectedCount", ValueType::Scalar, u.count as f64),
        ("layout.x", ValueType::Length, u.bounds.x),
        ("layout.y", ValueType::Length, u.bounds.y),
        ("layout.width", ValueType::Length, u.bounds.width),
        ("layout.height", ValueType::Length, u.bounds.height),
        ("layout.baseline", ValueType::Length, u.baseline),
        ("layout.inkX", ValueType::Length, u.ink_bounds.x),
        ("layout.inkY", ValueType::Length, u.ink_bounds.y),
        ("layout.inkWidth", ValueType::Length, u.ink_bounds.width),
        ("layout.inkHeight", ValueType::Length, u.ink_bounds.height),
        ("layout.lineInkY", ValueType::Length, u.line_ink_bounds.y),
        (
            "layout.lineInkHeight",
            ValueType::Length,
            u.line_ink_bounds.height,
        ),
        ("canvas.width", ValueType::Length, r.size.0 as f64),
        ("canvas.height", ValueType::Length, r.size.1 as f64),
    ] {
        fields.insert(k.into(), Evaluated::Number(t, v));
    }
    if !u.spans.contains_key(&u.kind) {
        for path in [
            "time.elapsedSeconds",
            "time.durationSeconds",
            "time.progress",
            "time.clampedProgress",
        ] {
            fields.remove(path);
        }
    }
    for (k, s) in [
        ("unit.active", WordState::Active),
        ("unit.read", WordState::Read),
        ("unit.unread", WordState::Unread),
    ] {
        fields.insert(k.into(), Evaluated::Bool(u.state == s));
    }
    Context {
        fields,
        spans: u.spans.clone(),
        seed: r.seed,
        stable_key: format!("{}|{}|{}", r.instance, r.cue.id, u.id),
    }
}
fn pose(
    node: &Node,
    u: &Unit,
    r: &RenderContext,
    budget: &mut Budget,
) -> Result<BTreeMap<String, Evaluated>> {
    let mut c = context(u, r);
    c.stable_key.push_str(&format!("|{}", node.id));
    let mut p = BTreeMap::new();
    if u.kind == UnitKind::Cue || matches!(node.kind, NodeKind::Shape | NodeKind::Image) {
        p.insert("fill".into(), Evaluated::Color(color(&node.style.fill)?));
        for (name, value) in &node.properties {
            if let Some(v) = sample_value(
                value,
                property_type(name).unwrap(),
                r.scene,
                &c,
                r.seconds,
                budget,
            )? {
                p.insert(name.clone(), v);
            }
        }
    }
    if u.kind == UnitKind::Word {
        if let Some(fill) = node.state_styles.get(&u.state) {
            p.insert("fill".into(), Evaluated::Color(color(fill)?));
        }
    }
    let mut tracks = r
        .scene
        .animations
        .iter()
        .filter(|a| a.target.node_id == node.id)
        .collect::<Vec<_>>();
    tracks.sort_by_key(|a| a.priority);
    for a in tracks {
        let matches_target = match &a.target.selector_id {
            None => {
                u.kind == UnitKind::Cue || matches!(node.kind, NodeKind::Shape | NodeKind::Image)
            }
            Some(id) => r
                .scene
                .selectors
                .iter()
                .find(|s| s.id == *id)
                .is_some_and(|s| selected(s, u)),
        };
        if !matches_target {
            continue;
        }
        // Missing real word timing disables spoken tracks; it never manufactures speech times.
        if let DynamicValue::Keyframes { clock, .. } = &a.value {
            if !c.spans.contains_key(&clock.unit) {
                continue;
            }
        }
        if let Some(id) = &a.target.selector_id {
            let sel = r.scene.selectors.iter().find(|s| s.id == *id).unwrap();
            if let Some(units) = r.units.get(&node.id) {
                let selected = units
                    .iter()
                    .filter(|(v, _)| selected(sel, v))
                    .collect::<Vec<_>>();
                let index = selected.iter().position(|(v, _)| v.id == u.id).unwrap_or(0);
                c.fields.insert(
                    "unit.selectedIndex".into(),
                    Evaluated::Number(ValueType::Scalar, index as f64),
                );
                c.fields.insert(
                    "unit.selectedCount".into(),
                    Evaluated::Number(ValueType::Scalar, selected.len() as f64),
                );
            }
        }
        c.stable_key = format!("{}|{}|{}|{}|{}", r.instance, r.cue.id, u.id, node.id, a.id);
        if let Some(v) = sample_value(
            &a.value,
            property_type(&a.property).unwrap(),
            r.scene,
            &c,
            r.seconds,
            budget,
        )? {
            let out = if a.composite == Composite::Replace {
                v
            } else {
                let old = p
                    .get(&a.property)
                    .map(|v| v.number())
                    .transpose()?
                    .unwrap_or_else(|| default_number(&a.property));
                Evaluated::Number(
                    v.value_type(),
                    if a.composite == Composite::Add {
                        old + v.number()?
                    } else {
                        old * v.number()?
                    },
                )
                .finite()?
            };
            p.insert(a.property.clone(), out);
        }
    }
    if p.values()
        .any(|v| matches!(v,Evaluated::Number(_,n) if !n.is_finite() || n.abs()>1_000_000.0))
    {
        bail!("CAPTION_BUDGET_EXCEEDED: geometry range");
    }
    Ok(p)
}
fn default_number(name: &str) -> f64 {
    if name.starts_with("transform.scale") || name == "opacity" {
        1.0
    } else {
        0.0
    }
}
fn number(p: &BTreeMap<String, Evaluated>, name: &str) -> f64 {
    p.get(name)
        .and_then(|v| v.number().ok())
        .unwrap_or_else(|| default_number(name))
}
fn matrix(p: &BTreeMap<String, Evaluated>, b: Bounds) -> Transform {
    let x = b.x + b.width / 2.0;
    let y = b.y + b.height / 2.0;
    let sx = number(p, "transform.scale") * number(p, "transform.scaleX");
    let sy = number(p, "transform.scale") * number(p, "transform.scaleY");
    let a = number(p, "transform.rotation");
    let (sin, cos) = (libm_sin(a), libm_cos(a));
    Transform::from_row(
        (cos * sx) as f32,
        (sin * sx) as f32,
        (-sin * sy) as f32,
        (cos * sy) as f32,
        (x + number(p, "transform.x") - cos * sx * x + sin * sy * y) as f32,
        (y + number(p, "transform.y") - sin * sx * x - cos * sy * y) as f32,
    )
}
fn libm_sin(x: f64) -> f64 {
    libm::sin(x)
}
fn libm_cos(x: f64) -> f64 {
    libm::cos(x)
}
fn tf(t: Transform) -> [f32; 6] {
    [t.sx, t.ky, t.kx, t.sy, t.tx, t.ty]
}
fn draw_nodes(
    nodes: &[Node],
    parent: Transform,
    bound: Option<&Unit>,
    r: &RenderContext,
    text: &mut TextEngine,
    b: &mut FrameBuilder,
    hits: &mut Vec<SceneHit>,
    budget: &mut Budget,
) -> Result<()> {
    let mut nodes = nodes.iter().collect::<Vec<_>>();
    nodes.sort_by_key(|n| n.z_index);
    for n in nodes {
        budget.spend()?;
        if n.kind == NodeKind::Repeat {
            let s = r
                .scene
                .selectors
                .iter()
                .find(|s| Some(&s.id) == n.selector_id.as_ref())
                .unwrap();
            if let Some(units) = r.units.get(&s.node_id) {
                for (u, _) in units.iter().filter(|(u, _)| selected(s, u)) {
                    draw_nodes(&n.children, parent, Some(u), r, text, b, hits, budget)?;
                }
            }
            continue;
        }
        let root = r
            .units
            .get(&n.id)
            .and_then(|u| u.first())
            .or_else(|| r.units.values().next().and_then(|u| u.first()))
            .map(|(u, _)| u)
            .unwrap();
        let u = bound.unwrap_or(root);
        let p = pose(n, u, r, budget)?;
        // Still evaluate all leaf properties (and their diagnostics), but do not
        // allocate an offscreen surface for an invisible decoration.
        if matches!(n.kind, NodeKind::Shape | NodeKind::Image) && number(&p, "opacity") <= 0.0 {
            continue;
        }
        let t = parent.pre_concat(matrix(&p, u.bounds));
        b.push(DrawOp::PushLayer {
            opacity: number(&p, "opacity").clamp(0.0, 1.0) as f32,
            blend: motion::effect::BlendMode::Normal,
        });
        match n.kind {
            NodeKind::Group => draw_nodes(&n.children, t, bound, r, text, b, hits, budget)?,
            NodeKind::Shape => {
                let Evaluated::Color(c) = p["fill"] else {
                    unreachable!()
                };
                b.push(DrawOp::FillRect {
                    x: u.bounds.x as f32,
                    y: u.bounds.y as f32,
                    w: p.get("width")
                        .map_or(u.bounds.width, |v| v.number().unwrap())
                        .max(0.0) as f32,
                    h: p.get("height")
                        .map_or(u.bounds.height, |v| v.number().unwrap())
                        .max(0.0) as f32,
                    radius: number(&p, "radius").max(0.0) as f32,
                    color: c.map(|x| x.clamp(0.0, 1.0) as f32),
                    tf: tf(t),
                });
            }
            NodeKind::Image => {
                let resource = n.resource_id.as_ref().unwrap();
                let image = r
                    .images
                    .get(resource)
                    .ok_or_else(|| anyhow::anyhow!("CAPTION_RESOURCE_MISSING: {resource}"))?;
                let width = p
                    .get("width")
                    .map_or(u.bounds.width, |v| v.number().unwrap())
                    .max(0.0);
                let height = p
                    .get("height")
                    .map_or(u.bounds.height, |v| v.number().unwrap())
                    .max(0.0);
                if width > 0.0 && height > 0.0 {
                    let sx = width / image.width as f64;
                    let sy = height / image.height as f64;
                    let (sx, sy) = match n.fit {
                        ImageFit::Contain => (sx.min(sy), sx.min(sy)),
                        ImageFit::Cover => (sx.max(sy), sx.max(sy)),
                        ImageFit::Stretch => (sx, sy),
                    };
                    let x = u.bounds.x + (width - image.width as f64 * sx) / 2.0;
                    let y = u.bounds.y + (height - image.height as f64 * sy) / 2.0;
                    if n.fit == ImageFit::Cover {
                        let path = render_raster::raster::rounded_rect_path(
                            u.bounds.x, u.bounds.y, width, height, 0.0,
                        )
                        .ok_or_else(|| anyhow::anyhow!("CAPTION_SCENE_INVALID: image bounds"))?;
                        let id = b.path_id(path_from_skia(&path));
                        b.push(DrawOp::ClipPath {
                            path: id,
                            tf: tf(t),
                        });
                    }
                    let bitmap = b.bitmap_id(image.clone());
                    b.push(DrawOp::DrawBitmap {
                        bitmap,
                        opacity: 1.0,
                        tf: tf(t
                            .pre_translate(x as f32, y as f32)
                            .pre_scale(sx as f32, sy as f32)),
                    });
                    if n.fit == ImageFit::Cover {
                        b.push(DrawOp::PopClip);
                    }
                }
            }
            NodeKind::Text => {
                if let Some(units) = r.units.get(&n.id) {
                    let page = units
                        .iter()
                        .find(|(u, _)| u.kind == UnitKind::Page)
                        .unwrap();
                    let pp = pose(n, &page.0, r, budget)?;
                    let t = t.pre_concat(matrix(&pp, page.0.bounds));
                    for (lineunit, line) in units.iter().filter(|(u, _)| u.kind == UnitKind::Line) {
                        let line = line.as_ref().unwrap();
                        let lp = pose(n, lineunit, r, budget)?;
                        let lt = t.pre_concat(matrix(&lp, lineunit.bounds));
                        let mut hit_boxes = Vec::new();
                        for glyph in &line.shape.glyphs {
                            budget.spend()?;
                            let at = line.bytes.start + glyph.cluster.start;
                            let word = units
                                .iter()
                                .find(|(u, _)| u.kind == UnitKind::Word && u.bytes.contains(&at))
                                .map(|(u, _)| u);
                            let grapheme = units
                                .iter()
                                .find(|(u, _)| {
                                    u.kind == UnitKind::Grapheme && u.bytes.contains(&at)
                                })
                                .map(|(u, _)| u);
                            let mut gt = lt;
                            let mut fill = lp
                                .get("fill")
                                .or_else(|| pp.get("fill"))
                                .unwrap_or(&p["fill"])
                                .clone();
                            let mut opacity = number(&lp, "opacity") * number(&pp, "opacity");
                            for unit in [word, grapheme].into_iter().flatten() {
                                let up = pose(n, unit, r, budget)?;
                                gt = gt.pre_concat(matrix(&up, unit.bounds));
                                if let Some(v) = up.get("fill") {
                                    fill = v.clone();
                                }
                                opacity *= number(&up, "opacity");
                            }
                            if opacity > 0.0 && number(&p, "opacity") > 0.0 {
                                let source = glyph_bounds(line, &(at..at + 1));
                                let mut points = [
                                    tiny_skia::Point::from_xy(source.x as f32, source.y as f32),
                                    tiny_skia::Point::from_xy(
                                        (source.x + source.width) as f32,
                                        source.y as f32,
                                    ),
                                    tiny_skia::Point::from_xy(
                                        source.x as f32,
                                        (source.y + source.height) as f32,
                                    ),
                                    tiny_skia::Point::from_xy(
                                        (source.x + source.width) as f32,
                                        (source.y + source.height) as f32,
                                    ),
                                ];
                                gt.map_points(&mut points);
                                let min_x = points
                                    .iter()
                                    .map(|p| p.x as f64)
                                    .fold(f64::INFINITY, f64::min);
                                let min_y = points
                                    .iter()
                                    .map(|p| p.y as f64)
                                    .fold(f64::INFINITY, f64::min);
                                let max_x = points
                                    .iter()
                                    .map(|p| p.x as f64)
                                    .fold(f64::NEG_INFINITY, f64::max);
                                let max_y = points
                                    .iter()
                                    .map(|p| p.y as f64)
                                    .fold(f64::NEG_INFINITY, f64::max);
                                hit_boxes.push(Bounds {
                                    x: min_x,
                                    y: min_y,
                                    width: max_x - min_x,
                                    height: max_y - min_y,
                                });
                            }
                            let Evaluated::Color(mut c) = fill else {
                                unreachable!()
                            };
                            c[3] *= opacity.clamp(0.0, 1.0);
                            let origin = gt.pre_translate(
                                (line.bounds.x + glyph.x) as f32,
                                (line.baseline + glyph.y) as f32,
                            );
                            match text.glyph_render(glyph.cache_key) {
                                GlyphRender::Outline(path) => {
                                    let id = b.path_id(path_from_skia(&path));
                                    if !n.style.paints.is_empty() {
                                        for layer in &n.style.paints {
                                            budget.spend()?;
                                            let paint = scene_paint(
                                                &layer.paint,
                                                line.bounds,
                                                (line.bounds.x + glyph.x, line.baseline + glyph.y),
                                                opacity,
                                            )?;
                                            let paint = b.paint_id(paint);
                                            let transform = origin.pre_translate(
                                                layer.offset[0] as f32,
                                                layer.offset[1] as f32,
                                            );
                                            if layer.stroke_width > 0.0 {
                                                b.push(DrawOp::StrokePathPaint {
                                                    path: id,
                                                    paint,
                                                    width: layer.stroke_width as f32,
                                                    cap: 1,
                                                    join: 1,
                                                    miter: 4.0,
                                                    tf: tf(transform),
                                                });
                                            } else {
                                                b.push(DrawOp::FillPathPaint {
                                                    path: id,
                                                    paint,
                                                    even_odd: false,
                                                    tf: tf(transform),
                                                });
                                            }
                                        }
                                        continue;
                                    }
                                    if let Some(s) = &n.style.stroke {
                                        let mut sc = color(&s.color)?;
                                        sc[3] *= opacity.clamp(0.0, 1.0);
                                        b.push(DrawOp::StrokePath {
                                            path: id,
                                            color: sc.map(|v| v as f32),
                                            width: s.width as f32,
                                            tf: tf(origin),
                                        });
                                    }
                                    b.push(DrawOp::FillPath {
                                        path: id,
                                        color: c.map(|v| v.clamp(0.0, 1.0) as f32),
                                        tf: tf(origin),
                                    });
                                }
                                GlyphRender::ColorBitmap {
                                    width,
                                    height,
                                    rgba,
                                    left,
                                    top,
                                } => {
                                    let id = b.bitmap_id(BitmapData {
                                        width,
                                        height,
                                        rgba,
                                    });
                                    b.push(DrawOp::DrawBitmap {
                                        bitmap: id,
                                        opacity: opacity.clamp(0.0, 1.0) as f32,
                                        tf: tf(origin.pre_translate(left as f32, -top as f32)),
                                    });
                                }
                                GlyphRender::Empty => {}
                            }
                        }
                        hits.push(SceneHit {
                            cue_id: r.cue.id.clone(),
                            document_id: r.cue.document_id.clone(),
                            bounds: union(hit_boxes.into_iter()),
                        });
                    }
                }
            }
            NodeKind::Repeat => unreachable!(),
        }
        b.push(DrawOp::PopLayer);
    }
    Ok(())
}

fn scene_paint(
    paint: &ScenePaint,
    bounds: Bounds,
    origin: (f64, f64),
    opacity: f64,
) -> Result<PaintData> {
    let rgba = |c: &str| -> Result<[f32; 4]> {
        let mut c = color(c)?;
        c[3] *= opacity.clamp(0.0, 1.0);
        Ok(c.map(|c| c as f32))
    };
    Ok(match paint {
        ScenePaint::Solid { color } => PaintData::Solid(rgba(color)?),
        ScenePaint::Linear { from, to, stops } => {
            let point = |v: [f64; 2]| {
                [
                    (bounds.x + v[0] * bounds.width - origin.0) as f32,
                    (bounds.y + v[1] * bounds.height - origin.1) as f32,
                ]
            };
            PaintData::Linear {
                p0: point(*from),
                p1: point(*to),
                stops: stops
                    .iter()
                    .map(|s| {
                        Ok(GradientStop {
                            offset: s.at as f32,
                            color: rgba(&s.color)?,
                        })
                    })
                    .collect::<Result<Vec<_>>>()?,
            }
        }
    })
}

#[cfg(test)]
mod ink_tests {
    use super::*;
    fn input(
        content: &str,
        line_height: f64,
    ) -> (
        TextEngine,
        SceneStyle,
        SceneCue,
        BTreeMap<String, Evaluated>,
    ) {
        let mut body: serde_json::Value = serde_json::from_str(include_str!(
            "../../caption-scene/tests/fixtures/word-pop.json"
        ))
        .unwrap();
        body["scene"]["value"]["nodes"][0]["style"]["fontSize"] =
            serde_json::json!({"value": 24, "basis":"absolute"});
        body["scene"]["value"]["nodes"][0]["style"]["lineHeight"] = serde_json::json!(line_height);
        body["scene"]["value"]["layout"]["pagination"] = serde_json::json!({"maxUnitsPerPage":128});
        let style = parse_style(&body).unwrap();
        let params = parameters(style.scene(), &[]).unwrap();
        let text = TextEngine::with_document_fonts(&[include_bytes!(
            "../../render-raster/assets/fonts/NotoSansSC-Variable.ttf"
        )
        .to_vec()]);
        let cue = SceneCue {
            id: "cue".into(),
            document_id: "doc".into(),
            text: content.into(),
            start: 0.0,
            end: 4.0,
            words: vec![],
        };
        (text, style, cue, params)
    }
    #[test]
    fn ink_line_height_is_independent_of_leading_and_spaces_inherit_it() {
        let measure = |line_height| {
            let (mut text, style, cue, params) = input("Ag e\u{301} ", line_height);
            let scene = style.scene();
            let layout = prepare(
                &mut text,
                &cue,
                &scene.nodes[0],
                &scene.layout,
                &scene.speech_state,
                (160, 90),
                &params,
            )
            .unwrap();
            let page = &layout.pages[0];
            assert_eq!(page.lines.len(), 1);
            let line = &page.lines[0];
            let units = units_for(
                &cue,
                &layout,
                page,
                0.5,
                &scene.speech_state,
                &Presentation::default(),
            );
            let spaces = units
                .iter()
                .filter(|(u, _)| u.whitespace)
                .collect::<Vec<_>>();
            assert_eq!(spaces.len(), 2);
            for (space, _) in spaces {
                assert_eq!(space.ink_bounds.y, line.ink_bounds.y);
                assert_eq!(space.ink_bounds.height, line.ink_bounds.height);
                assert_eq!(space.ink_bounds.x, space.bounds.x);
                assert_eq!(space.ink_bounds.width, space.bounds.width);
            }
            for (unit, _) in &units {
                assert_eq!(unit.line_ink_bounds.y, line.ink_bounds.y);
                assert_eq!(unit.line_ink_bounds.height, line.ink_bounds.height);
            }
            (
                line.ink_bounds.y - line.baseline,
                line.ink_bounds.height,
                line.bounds.height,
            )
        };
        let tight = measure(1.0);
        let loose = measure(3.0);
        assert!((tight.0 - loose.0).abs() < 1e-9);
        assert_eq!(tight.1, loose.1);
        assert_eq!(loose.2, tight.2 * 3.0);
        assert!(loose.1 < loose.2);
    }
    #[test]
    fn whitespace_only_line_uses_font_metrics_not_line_height() {
        let mut text = TextEngine::with_document_fonts(&[]);
        let shape = ShapedLine {
            width: 12.0,
            ascent: 15.0,
            descent: 5.0,
            glyphs: vec![],
        };
        let line = Line::new(
            &mut text,
            0..1,
            shape,
            Bounds {
                x: 10.0,
                y: 20.0,
                width: 12.0,
                height: 100.0,
            },
            35.0,
        );
        assert_eq!(
            (
                line.ink_bounds.x,
                line.ink_bounds.y,
                line.ink_bounds.width,
                line.ink_bounds.height
            ),
            (10.0, 20.0, 12.0, 20.0)
        );
        let space = line.ink_for(&(0..1), line.bounds);
        assert_eq!(space.height, 20.0);
    }
    #[test]
    fn sampled_reflow_refreshes_ink_without_mutating_the_frozen_layout() {
        let (mut text, style, cue, params) = input("Ag", 2.5);
        let scene = style.scene();
        let layout = prepare(
            &mut text,
            &cue,
            &scene.nodes[0],
            &scene.layout,
            &scene.speech_state,
            (160, 90),
            &params,
        )
        .unwrap();
        let before = layout.pages[0].lines[0].ink_bounds.height;
        let mut node = scene.nodes[0].clone();
        node.style.font_size.value *= 2.0;
        let page = sampled_layout::reflow(
            &mut text,
            &layout,
            &layout.pages[0],
            &node,
            &scene.layout,
            (160, 90),
            &params,
            &mut Budget::default(),
        )
        .unwrap();
        assert!((page.lines[0].ink_bounds.height / before - 2.0).abs() < 0.05);
        assert_eq!(layout.pages[0].lines[0].ink_bounds.height, before);
    }

    #[test]
    fn line_state_uses_word_membership_and_respects_gap_tail_and_missing_timing() {
        let (mut text, style, mut cue, params) = input("A\nB", 1.0);
        cue.words = vec![
            SceneWord {
                id: "a".into(),
                text: "A".into(),
                start: 0.0,
                end: 0.5,
            },
            SceneWord {
                id: "b".into(),
                text: "B".into(),
                start: 1.0,
                end: 1.5,
            },
        ];
        let scene = style.scene();
        let layout = prepare(
            &mut text,
            &cue,
            &scene.nodes[0],
            &scene.layout,
            &scene.speech_state,
            (160, 90),
            &params,
        )
        .unwrap();
        let mut cfg = scene.speech_state.clone();
        cfg.gap_policy = GapPolicy::None;
        cfg.tail_policy = TailPolicy::None;
        let states = |t, cfg: &SpeechState| {
            units_for(
                &cue,
                &layout,
                &layout.pages[0],
                t,
                cfg,
                &Presentation::default(),
            )
            .into_iter()
            .filter(|(u, _)| u.kind == UnitKind::Line)
            .map(|(u, _)| u.state)
            .collect::<Vec<_>>()
        };
        assert_eq!(
            states(0.25, &cfg),
            vec![WordState::Active, WordState::Unread]
        );
        assert_eq!(states(0.75, &cfg), vec![WordState::Read, WordState::Unread]);
        cfg.gap_policy = GapPolicy::HoldPrevious;
        assert_eq!(
            states(0.75, &cfg),
            vec![WordState::Active, WordState::Unread]
        );
        assert_eq!(states(1.75, &cfg), vec![WordState::Read, WordState::Read]);
        cfg.tail_policy = TailPolicy::HoldLast;
        assert_eq!(states(1.75, &cfg), vec![WordState::Read, WordState::Active]);
        cue.words.clear();
        let untimed = prepare(
            &mut text,
            &cue,
            &scene.nodes[0],
            &scene.layout,
            &cfg,
            (160, 90),
            &params,
        )
        .unwrap();
        assert!(
            units_for(
                &cue,
                &untimed,
                &untimed.pages[0],
                3.0,
                &cfg,
                &Presentation::default()
            )
            .iter()
            .filter(|(u, _)| u.kind == UnitKind::Line)
            .all(|(u, _)| u.state == WordState::Unread)
        );
    }
    #[test]
    fn stable_page_identity_survives_per_sample_clone_and_is_shared_by_all_units() {
        let (mut text, mut style, cue, params) = input("A B C D", 1.0);
        let SceneSource::Inline { value: scene } = &mut style.scene;
        scene.layout.pagination.max_units_per_page = Some(1);
        let layout = prepare(
            &mut text,
            &cue,
            &scene.nodes[0],
            &scene.layout,
            &scene.speech_state,
            (160, 90),
            &params,
        )
        .unwrap();
        assert_eq!(layout.pages.len(), 4);
        let page = sampled_layout::reflow(
            &mut text,
            &layout,
            &layout.pages[2],
            &scene.nodes[0],
            &scene.layout,
            (160, 90),
            &params,
            &mut Budget::default(),
        )
        .unwrap();
        let units = units_for(
            &cue,
            &layout,
            &page,
            2.5,
            &scene.speech_state,
            &Presentation::default(),
        );
        assert!(
            units
                .iter()
                .all(|(u, _)| u.page_index == 2 && u.page_count == 4)
        );
        assert_eq!(
            units
                .iter()
                .find(|(u, _)| u.kind == UnitKind::Page)
                .unwrap()
                .0
                .index,
            2
        );
    }
    #[test]
    fn line_clock_is_inherited_by_words_and_graphemes_with_explicit_parent_fallback() {
        let (mut text, style, mut cue, params) = input("A\nB", 1.0);
        cue.words = vec![
            SceneWord {
                id: "a".into(),
                text: "A".into(),
                start: 0.0,
                end: 0.5,
            },
            SceneWord {
                id: "b".into(),
                text: "B".into(),
                start: 1.0,
                end: 1.5,
            },
        ];
        let scene = style.scene();
        let layout = prepare(
            &mut text,
            &cue,
            &scene.nodes[0],
            &scene.layout,
            &scene.speech_state,
            (160, 90),
            &params,
        )
        .unwrap();
        let units = units_for(
            &cue,
            &layout,
            &layout.pages[0],
            1.25,
            &scene.speech_state,
            &Presentation::default(),
        );
        let unit_map = BTreeMap::new();
        let images = BTreeMap::new();
        let r = RenderContext {
            scene,
            units: &unit_map,
            params: &params,
            seconds: 1.25,
            seed: 0,
            instance: "test",
            cue: &cue,
            size: (160, 90),
            images: &images,
        };
        for (u, _) in &units {
            let c = context(u, &r);
            let expected = u
                .spans
                .get(&UnitKind::Line)
                .or_else(|| u.spans.get(&u.kind))
                .unwrap();
            assert_eq!(
                c.fields["time.lineElapsedSeconds"].number().unwrap(),
                1.25 - expected.0
            );
            assert_eq!(
                c.fields["time.lineDurationSeconds"].number().unwrap(),
                expected.1 - expected.0
            );
            if matches!(u.kind, UnitKind::Word | UnitKind::Grapheme) && u.bytes.start == 2 {
                assert_eq!(c.fields["time.lineElapsedSeconds"].number().unwrap(), 0.25);
                assert_eq!(c.fields["time.lineDurationSeconds"].number().unwrap(), 0.5);
            }
        }
    }
}
