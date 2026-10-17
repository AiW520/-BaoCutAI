//! Canvas 文字 → 字形轮廓路径。
//!
//! 录制端已经把 `fillText` / `strokeText` 归一成「左对齐 + alphabetic 基线」，并记下 Chromium 量出的宽度。
//! 这里用 rustybuzz 按文字体系分段整形（与 Blink 一样，标点、数字、空格并入相邻的段），把字形轮廓拼成
//! 一条用户空间的路径；整形宽度与 Chromium 的宽度对不上、缺字形、彩色字形时判为不支持，由调用方整段回退。
//!
//! 合成斜体按 Skia 的做法还原成 −1/4 的水平错切。合成粗体（请求 ≥ 600，而 `@font-face` 声明的范围与字体
//! 文件自己的粗细都 < 600）判为不支持：Chromium 的加粗量随平台的字体栈而变（macOS 实测 68px 约为 Skia
//! 通用公式的一半、20px 几乎不加粗），没有一份跨平台一致的做法可以对齐。

use super::path::Seg;
use rustybuzz::ttf_parser::{GlyphId, OutlineBuilder};
use rustybuzz::{Direction, Face, Script, UnicodeBuffer, script};
use std::collections::HashMap;
use std::sync::{Arc, RwLock};

pub struct Font {
    face: Face<'static>,
    upem: f64,
    /// `@font-face` 声明的粗细范围上限与样式（CSS 匹配用的描述，不是字体文件自己的）。
    declared_weight_max: f64,
    declared_italic: bool,
    outlines: RwLock<HashMap<u16, Arc<Vec<Seg>>>>,
}

#[derive(Default)]
struct Outline(Vec<Seg>);

impl OutlineBuilder for Outline {
    fn move_to(&mut self, x: f32, y: f32) {
        self.0.push(Seg::Move(x.into(), y.into()));
    }
    fn line_to(&mut self, x: f32, y: f32) {
        self.0.push(Seg::Line(x.into(), y.into()));
    }
    fn quad_to(&mut self, x1: f32, y1: f32, x: f32, y: f32) {
        self.0
            .push(Seg::Quad(x1.into(), y1.into(), x.into(), y.into()));
    }
    fn curve_to(&mut self, x1: f32, y1: f32, x2: f32, y2: f32, x: f32, y: f32) {
        self.0.push(Seg::Cubic(
            x1.into(),
            y1.into(),
            x2.into(),
            y2.into(),
            x.into(),
            y.into(),
        ));
    }
    fn close(&mut self) {
        self.0.push(Seg::Close);
    }
}

/// 字符的文字体系：`None` = Common（并入相邻的段），`Err` = 不支持的体系。
fn script_of(c: char) -> Result<Option<Script>, ()> {
    if !c.is_alphabetic() {
        return Ok(None);
    }
    Ok(Some(match c as u32 {
        0x0041..=0x024F
        | 0x1E00..=0x1EFF
        | 0x2C60..=0x2C7F
        | 0xA720..=0xA7FF
        | 0xFF21..=0xFF3A
        | 0xFF41..=0xFF5A => script::LATIN,
        0x0370..=0x03FF | 0x1F00..=0x1FFF => script::GREEK,
        0x0400..=0x052F => script::CYRILLIC,
        0x3040..=0x309F => script::HIRAGANA,
        0x30A0..=0x30FF | 0x31F0..=0x31FF | 0xFF66..=0xFF9F => script::KATAKANA,
        0x1100..=0x11FF | 0x3130..=0x318F | 0xAC00..=0xD7AF => script::HANGUL,
        0x2E80..=0x2FDF
        | 0x3005..=0x3007
        | 0x3021..=0x3029
        | 0x3038..=0x303B
        | 0x3400..=0x4DBF
        | 0x4E00..=0x9FFF
        | 0xF900..=0xFAFF
        | 0x20000..=0x3FFFF => script::HAN,
        _ => return Err(()),
    }))
}

/// 按文字体系切段：`(段文字, 体系)`。
fn runs(text: &str) -> Result<Vec<(String, Script)>, String> {
    let mut out: Vec<(String, Option<Script>)> = Vec::new();
    for c in text.chars() {
        let kind = script_of(c).map_err(|_| format!("text-script: U+{:04X}", c as u32))?;
        match (out.last_mut(), kind) {
            (Some((run, _)), None) => run.push(c),
            (Some((run, current @ None)), Some(s)) => {
                run.push(c);
                *current = Some(s);
            }
            (Some((run, Some(current))), Some(s)) if *current == s => run.push(c),
            _ => out.push((c.to_string(), kind)),
        }
    }
    Ok(out
        .into_iter()
        .map(|(run, s)| (run, s.unwrap_or(script::COMMON)))
        .collect())
}

impl Font {
    /// `bytes` 是字体文件；`declared` 是 `@font-face` 的粗细范围与样式。
    pub fn load(
        bytes: Vec<u8>,
        declared_weight: [f64; 2],
        declared_style: &str,
    ) -> Result<Font, String> {
        let data: &'static [u8] = Box::leak(bytes.into_boxed_slice());
        let face = Face::from_slice(data, 0).ok_or("font-parse")?;
        let upem = f64::from(face.units_per_em());
        Ok(Font {
            face,
            upem,
            declared_weight_max: declared_weight[1],
            declared_italic: declared_style != "normal",
            outlines: RwLock::new(HashMap::new()),
        })
    }

    fn outline(&self, glyph: u16) -> Arc<Vec<Seg>> {
        if let Some(hit) = self
            .outlines
            .read()
            .unwrap_or_else(|p| p.into_inner())
            .get(&glyph)
        {
            return hit.clone();
        }
        let mut outline = Outline::default();
        self.face.outline_glyph(GlyphId(glyph), &mut outline);
        let outline = Arc::new(outline.0);
        self.outlines
            .write()
            .unwrap_or_else(|p| p.into_inner())
            .insert(glyph, outline.clone());
        outline
    }

    /// 一次 `fillText` / `strokeText` 的字形路径。`Err` 是不支持的原因。
    #[allow(clippy::too_many_arguments)]
    pub fn layout(
        &self,
        text: &str,
        size: f64,
        weight: f64,
        style: &str,
        left: f64,
        baseline: f64,
        chromium_width: f64,
        scale_x: f64,
    ) -> Result<Vec<Seg>, String> {
        let weight_class = f64::from(self.face.weight().to_number());
        if weight >= 600.0 && self.declared_weight_max < 600.0 && weight_class < 600.0 {
            return Err(format!("text-synthetic-bold: {weight}"));
        }
        // 请求斜体而声明的与字体文件本身都不是斜体时，Blink 让 Skia 做 −1/4 的错切。
        let skew = if style != "normal"
            && !self.declared_italic
            && !self.face.is_italic()
            && !self.face.is_oblique()
        {
            0.25
        } else {
            0.0
        };
        let scale = size / self.upem;
        let mut pen = 0.0f64;
        let mut segs = Vec::new();
        for (run, run_script) in runs(text)? {
            let mut buffer = UnicodeBuffer::new();
            buffer.push_str(&run);
            buffer.set_direction(Direction::LeftToRight);
            buffer.set_script(run_script);
            let shaped = rustybuzz::shape(&self.face, &[], buffer);
            for (info, pos) in shaped.glyph_infos().iter().zip(shaped.glyph_positions()) {
                let glyph = info.glyph_id as u16;
                let source = run[info.cluster as usize..].chars().next().unwrap_or(' ');
                if glyph == 0 && !source.is_whitespace() {
                    return Err(format!("text-missing-glyph: U+{:04X}", source as u32));
                }
                let id = GlyphId(glyph);
                if self.face.is_color_glyph(id)
                    || self.face.glyph_svg_image(id).is_some()
                    || self.face.glyph_raster_image(id, u16::MAX).is_some()
                {
                    return Err(format!("text-color-glyph: U+{:04X}", source as u32));
                }
                let ox = left + (pen + f64::from(pos.x_offset)) * scale * scale_x;
                let oy = baseline - f64::from(pos.y_offset) * scale;
                let sx = scale * scale_x;
                let place = |x: f64, y: f64| (ox + x * sx + y * scale * skew, oy - y * scale);
                for seg in self.outline(glyph).iter() {
                    segs.push(match *seg {
                        Seg::Move(x, y) => {
                            let (x, y) = place(x, y);
                            Seg::Move(x, y)
                        }
                        Seg::Line(x, y) => {
                            let (x, y) = place(x, y);
                            Seg::Line(x, y)
                        }
                        Seg::Quad(a, b, x, y) => {
                            let (a, b) = place(a, b);
                            let (x, y) = place(x, y);
                            Seg::Quad(a, b, x, y)
                        }
                        Seg::Cubic(a, b, c, d, x, y) => {
                            let (a, b) = place(a, b);
                            let (c, d) = place(c, d);
                            let (x, y) = place(x, y);
                            Seg::Cubic(a, b, c, d, x, y)
                        }
                        Seg::Close => Seg::Close,
                    });
                }
                pen += f64::from(pos.x_advance);
            }
        }
        let width = pen * scale;
        let tolerance = 0.5f64.max(chromium_width * 0.002);
        if (width - chromium_width).abs() > tolerance {
            return Err(format!(
                "text-width-mismatch: {width:.3} vs {chromium_width:.3}"
            ));
        }
        Ok(segs)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn common_characters_join_their_neighbours() {
        let r = runs("12程序员abc？").unwrap();
        let names: Vec<_> = r.iter().map(|(t, s)| (t.as_str(), *s)).collect();
        assert_eq!(names, [("12程序员", script::HAN), ("abc？", script::LATIN)]);
        assert!(runs("مرحبا").is_err());
    }
}
