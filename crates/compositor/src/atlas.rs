use std::collections::{HashMap, HashSet};

use anyhow::{Result, bail};
use timeline_render::GlyphKey;

/// atlas 中 mask 的有效像素矩形（不含防采样串色的 padding）。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct AtlasRect {
    pub x: u32,
    pub y: u32,
    pub width: u32,
    pub height: u32,
}

#[derive(Debug, Clone, Copy)]
pub struct GlyphRequest {
    pub key: GlyphKey,
    pub width: u32,
    pub height: u32,
}

/// 一帧 atlas 准备结果。`reset=true` 表示调用方必须先清空纹理；`uploads` 只含
/// 本帧需要 `write_texture` 的 key。`placements` 与请求顺序一一对应。
#[derive(Debug, Clone)]
pub struct AtlasPrepare {
    pub reset: bool,
    pub uploads: Vec<GlyphKey>,
    pub placements: Vec<AtlasRect>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct GlyphAtlasStats {
    pub resident: usize,
    pub rebuilds: u64,
    pub retired: u64,
}

#[derive(Debug, Clone, Copy)]
struct Entry {
    rect: AtlasRect,
}

/// 确定性的单页 shelf allocator。稳定帧只命中既有矩形；压力时在**帧边界**
/// 原子重排当前帧真正使用的字形并退休其余条目，不会在一帧编码到一半改 UV。
/// 单页模型有意保持简单：R2 的 mask 都是小资源，超出固定预算时宿主应回退 CPU，
/// 而不是让 atlas 或纹理页无界增长。
pub struct GlyphAtlas {
    width: u32,
    height: u32,
    padding: u32,
    cursor_x: u32,
    cursor_y: u32,
    row_height: u32,
    rebuilds: u64,
    retired: u64,
    entries: HashMap<GlyphKey, Entry>,
}

impl GlyphAtlas {
    pub fn new(width: u32, height: u32, padding: u32) -> Result<Self> {
        if width == 0 || height == 0 {
            bail!("glyph-atlas-invalid-size: {width}x{height}");
        }
        Ok(Self {
            width,
            height,
            padding,
            cursor_x: 0,
            cursor_y: 0,
            row_height: 0,
            rebuilds: 0,
            retired: 0,
            entries: HashMap::new(),
        })
    }

    pub fn size(&self) -> (u32, u32) {
        (self.width, self.height)
    }

    pub fn stats(&self) -> GlyphAtlasStats {
        GlyphAtlasStats {
            resident: self.entries.len(),
            rebuilds: self.rebuilds,
            retired: self.retired,
        }
    }

    pub fn prepare(&mut self, requests: &[GlyphRequest]) -> Result<AtlasPrepare> {
        validate_requests(requests)?;
        if requests.is_empty() {
            return Ok(AtlasPrepare {
                reset: false,
                uploads: Vec::new(),
                placements: Vec::new(),
            });
        }

        let checkpoint = (self.cursor_x, self.cursor_y, self.row_height);
        let before = self.entries.clone();
        let mut uploads = Vec::new();
        let mut failed = false;
        for request in unique_requests(requests) {
            if let Some(entry) = self.entries.get(&request.key) {
                if entry.rect.width != request.width || entry.rect.height != request.height {
                    bail!(
                        "glyph-atlas-key-conflict: {:?} was {}x{}, requested {}x{}",
                        request.key,
                        entry.rect.width,
                        entry.rect.height,
                        request.width,
                        request.height
                    );
                }
                continue;
            }
            let Some(rect) = self.allocate(request.width, request.height) else {
                failed = true;
                break;
            };
            self.entries.insert(request.key, Entry { rect });
            uploads.push(request.key);
        }

        let reset = if failed {
            self.cursor_x = 0;
            self.cursor_y = 0;
            self.row_height = 0;
            self.entries.clear();
            uploads.clear();
            for request in unique_requests(requests) {
                let Some(rect) = self.allocate(request.width, request.height) else {
                    self.entries = before;
                    (self.cursor_x, self.cursor_y, self.row_height) = checkpoint;
                    bail!(
                        "glyph-atlas-frame-overflow: current frame does not fit {}x{} atlas",
                        self.width,
                        self.height
                    );
                };
                self.entries.insert(request.key, Entry { rect });
                uploads.push(request.key);
            }
            self.rebuilds += 1;
            self.retired += before.keys().filter(|key| !self.entries.contains_key(key)).count() as u64;
            true
        } else {
            false
        };

        let placements = requests
            .iter()
            .map(|request| {
                self.entries
                    .get(&request.key)
                    .map(|entry| entry.rect)
                    .expect("validated request must have an atlas entry")
            })
            .collect();
        Ok(AtlasPrepare {
            reset,
            uploads,
            placements,
        })
    }

    fn allocate(&mut self, width: u32, height: u32) -> Option<AtlasRect> {
        if width == 0 || height == 0 {
            return None;
        }
        let outer_width = width.checked_add(self.padding.checked_mul(2)?)?;
        let outer_height = height.checked_add(self.padding.checked_mul(2)?)?;
        if outer_width > self.width || outer_height > self.height {
            return None;
        }
        if self.cursor_x.checked_add(outer_width)? > self.width {
            self.cursor_x = 0;
            self.cursor_y = self.cursor_y.checked_add(self.row_height)?;
            self.row_height = 0;
        }
        if self.cursor_y.checked_add(outer_height)? > self.height {
            return None;
        }
        let rect = AtlasRect {
            x: self.cursor_x + self.padding,
            y: self.cursor_y + self.padding,
            width,
            height,
        };
        self.cursor_x += outer_width;
        self.row_height = self.row_height.max(outer_height);
        Some(rect)
    }
}

fn validate_requests(requests: &[GlyphRequest]) -> Result<()> {
    let mut sizes = HashMap::new();
    for request in requests {
        if request.width == 0 || request.height == 0 {
            bail!("glyph-atlas-empty-mask: {:?} is {}x{}", request.key, request.width, request.height);
        }
        if let Some((width, height)) = sizes.insert(request.key, (request.width, request.height))
            && (width, height) != (request.width, request.height)
        {
            bail!("glyph-atlas-key-conflict: {:?}", request.key);
        }
    }
    Ok(())
}

fn unique_requests(requests: &[GlyphRequest]) -> impl Iterator<Item = GlyphRequest> + '_ {
    let mut seen = HashSet::new();
    requests.iter().copied().filter(move |request| seen.insert(request.key))
}

#[cfg(test)]
mod tests {
    use super::*;

    fn glyph(id: u64, width: u32, height: u32) -> GlyphRequest {
        GlyphRequest {
            key: GlyphKey([id, 0]),
            width,
            height,
        }
    }

    #[test]
    fn stable_frames_reuse_placements_without_uploads() {
        let mut atlas = GlyphAtlas::new(32, 16, 1).unwrap();
        let first = atlas.prepare(&[glyph(1, 4, 6), glyph(2, 5, 6)]).unwrap();
        assert!(!first.reset);
        assert_eq!(first.uploads, vec![GlyphKey([1, 0]), GlyphKey([2, 0])]);

        let second = atlas.prepare(&[glyph(2, 5, 6), glyph(1, 4, 6)]).unwrap();
        assert!(!second.reset);
        assert!(second.uploads.is_empty());
        assert_eq!(second.placements[0], first.placements[1]);
        assert_eq!(second.placements[1], first.placements[0]);
    }

    #[test]
    fn pressure_rebuilds_atomically_with_only_the_current_frame() {
        let mut atlas = GlyphAtlas::new(16, 8, 1).unwrap();
        atlas.prepare(&[glyph(1, 5, 6), glyph(2, 5, 6)]).unwrap();
        let prepared = atlas.prepare(&[glyph(3, 5, 6), glyph(4, 5, 6)]).unwrap();
        assert!(prepared.reset);
        assert_eq!(prepared.uploads, vec![GlyphKey([3, 0]), GlyphKey([4, 0])]);
        assert_eq!(atlas.stats().resident, 2);
        assert_eq!(atlas.stats().rebuilds, 1);
        assert_eq!(atlas.stats().retired, 2);
    }

    #[test]
    fn a_frame_larger_than_the_fixed_page_fails_instead_of_growing() {
        let mut atlas = GlyphAtlas::new(8, 8, 1).unwrap();
        let error = atlas.prepare(&[glyph(1, 7, 7)]).unwrap_err();
        assert!(error.to_string().contains("glyph-atlas-frame-overflow"));
        assert_eq!(atlas.stats().resident, 0);
    }
}
