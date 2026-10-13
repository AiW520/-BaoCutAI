//! Frozen PNG sequences with one bounded decoded-frame cache across all sequences.
use anyhow::{Context, Result, bail};
use caption_scene::{ImageResource, ImageSequenceResource, SequencePremultiply};
use render_raster::drawop::BitmapData;
use sha2::{Digest, Sha256};
use std::{
    collections::{BTreeMap, VecDeque},
    io::Cursor,
    sync::{Arc, Weak},
};

const MAX_ENCODED: u64 = 32 * 1024 * 1024;
const MAX_DECODED: u64 = 64 * 1024 * 1024;
const CACHE_FRAMES: usize = 4;
// Decoder-controlled allocations are limited separately from its fixed inflate state.
const DECODER_LIMIT: usize = 4 * 1024 * 1024;
const DECODER_FIXED_ALLOWANCE: u64 = 1024 * 1024;
type FrameKey = (usize, usize);

struct EncodedFrame {
    bytes: Vec<u8>,
    width: u32,
    height: u32,
}
struct Sequence {
    frames: Vec<EncodedFrame>,
    premultiply: SequencePremultiply,
}
struct Resident {
    pixels: Weak<[u8]>,
    bytes: u64,
}

#[derive(Default)]
pub(super) struct ImageSequenceCache {
    sequences: Vec<Sequence>,
    ids: BTreeMap<String, usize>,
    lru: VecDeque<(FrameKey, Arc<BitmapData>)>,
    // A recorded DrawOp may retain rgba after its BitmapData wrapper is evicted.
    residents: BTreeMap<FrameKey, Resident>,
    regular_bytes: u64,
    encoded_bytes: u64,
    peak_decode_bytes: u64,
}

impl ImageSequenceCache {
    pub(super) fn load(
        resources: &[ImageSequenceResource],
        regular_decoded_bytes: u64,
        mut read: impl FnMut(&ImageResource) -> Option<Vec<u8>>,
    ) -> Result<Self> {
        if resources.len() > 64 || regular_decoded_bytes > MAX_DECODED {
            bail!("CAPTION_BUDGET_EXCEEDED: image sequences");
        }
        let mut cache = Self {
            regular_bytes: regular_decoded_bytes,
            ..Self::default()
        };
        for resource in resources {
            if resource.id.is_empty()
                || cache.ids.contains_key(&resource.id)
                || resource.frames.is_empty()
                || resource.frames.len() > 256
            {
                bail!("CAPTION_RESOURCE_FORMAT: invalid sequence {}", resource.id);
            }
            let mut frames = Vec::with_capacity(resource.frames.len());
            for frame in &resource.frames {
                let bytes = read(frame)
                    .ok_or_else(|| anyhow::anyhow!("CAPTION_RESOURCE_MISSING: {}", frame.id))?;
                cache.encoded_bytes = cache
                    .encoded_bytes
                    .checked_add(bytes.len() as u64)
                    .filter(|n| *n <= MAX_ENCODED)
                    .ok_or_else(|| anyhow::anyhow!("CAPTION_BUDGET_EXCEEDED: encoded sequences"))?;
                if format!(
                    "sha256:{}",
                    Sha256::digest(&bytes)
                        .iter()
                        .map(|byte| format!("{byte:02x}"))
                        .collect::<String>()
                ) != frame.content_hash
                {
                    bail!("CAPTION_RESOURCE_DIGEST: {}", frame.id);
                }
                let (width, height) = png_header(&bytes)
                    .with_context(|| format!("CAPTION_RESOURCE_FORMAT: {}", frame.id))?;
                let size = rgba_bytes(width, height)?;
                if size + regular_decoded_bytes > MAX_DECODED {
                    bail!("CAPTION_BUDGET_EXCEEDED: sequence dimensions");
                }
                frames.push(EncodedFrame {
                    bytes,
                    width,
                    height,
                });
            }
            cache.ids.insert(resource.id.clone(), cache.sequences.len());
            cache.sequences.push(Sequence {
                frames,
                premultiply: resource.premultiply,
            });
        }
        Ok(cache)
    }

    /// Bytes retained for the complete compressed manifest, not just the active frame.
    #[cfg(test)]
    pub(super) fn encoded_bytes(&self) -> u64 {
        self.encoded_bytes
    }
    /// Live sequence pixel storage, including frames still retained by recorded DrawOps.
    pub(super) fn decoded_bytes(&self) -> u64 {
        self.residents
            .values()
            .filter(|r| r.pixels.strong_count() != 0)
            .map(|r| r.bytes)
            .sum()
    }
    /// Largest reserved peak including regular images, existing pixels and decoding scratch.
    #[cfg(test)]
    pub(super) fn peak_decode_bytes(&self) -> u64 {
        self.peak_decode_bytes
    }

    pub(super) fn frame(&mut self, id: &str, index: usize) -> Result<Arc<BitmapData>> {
        let sequence = *self
            .ids
            .get(id)
            .ok_or_else(|| anyhow::anyhow!("CAPTION_RESOURCE_MISSING: sequence {id}"))?;
        let frame = self.sequences[sequence]
            .frames
            .get(index)
            .ok_or_else(|| anyhow::anyhow!("CAPTION_RESOURCE_FRAME_INDEX: {id}[{index}]"))?;
        let (width, height) = (frame.width, frame.height);
        let key = (sequence, index);
        if let Some(position) = self.lru.iter().position(|(k, _)| *k == key) {
            let entry = self.lru.remove(position).unwrap();
            let result = entry.1.clone();
            self.lru.push_back(entry);
            return Ok(result);
        }
        self.residents.retain(|_, r| r.pixels.strong_count() != 0);
        if let Some(pixels) = self.residents.get(&key).and_then(|r| r.pixels.upgrade()) {
            let bitmap = Arc::new(BitmapData {
                width,
                height,
                rgba: pixels,
            });
            self.insert(key, bitmap.clone());
            return Ok(bitmap);
        }
        let size = rgba_bytes(width, height)?;
        // Reader is dropped before Vec -> Arc copies its allocation. Expansion is in-place.
        let scratch = decode_peak_bytes(width, height, size);
        loop {
            let peak = self.regular_bytes + self.decoded_bytes() + scratch;
            if peak <= MAX_DECODED && self.lru.len() < CACHE_FRAMES {
                self.peak_decode_bytes = self.peak_decode_bytes.max(peak);
                break;
            }
            if self.lru.pop_front().is_none() {
                bail!("CAPTION_BUDGET_EXCEEDED: sequence decode peak or retained frames");
            }
        }
        let frame = &self.sequences[sequence].frames[index];
        let bitmap = Arc::new(
            decode(frame, self.sequences[sequence].premultiply)
                .with_context(|| format!("CAPTION_RESOURCE_FORMAT: {id}[{index}]"))?,
        );
        self.residents.insert(
            key,
            Resident {
                pixels: Arc::downgrade(&bitmap.rgba),
                bytes: size,
            },
        );
        self.insert(key, bitmap.clone());
        Ok(bitmap)
    }

    fn insert(&mut self, key: FrameKey, bitmap: Arc<BitmapData>) {
        if self.lru.len() == CACHE_FRAMES {
            self.lru.pop_front();
        }
        self.lru.push_back((key, bitmap));
    }
}

// png 0.18 Limits covers chunk/row allocations, but not UnfilteringBuffer.
// Bound its full filtered stream (Adam7 has <= 7 * height filter bytes),
// geometrically grown Vec plus its old allocation during realloc, two row
// scratch buffers and 128 KiB initial/growth slack. Twice Limits also covers
// a decoder-controlled Vec's old allocation while it grows. This is deliberately
// conservative; a large frame may be refused even if its final bitmap would fit.
fn decode_peak_bytes(width: u32, height: u32, rgba: u64) -> u64 {
    let filtered = rgba + 7 * u64::from(height);
    let unfilter = 3 * (filtered + 128 * 1024) + 8 * u64::from(width);
    let decoder = 2 * DECODER_LIMIT as u64 + DECODER_FIXED_ALLOWANCE + unfilter;
    rgba + rgba.max(decoder)
}

fn rgba_bytes(width: u32, height: u32) -> Result<u64> {
    u64::from(width)
        .checked_mul(u64::from(height))
        .and_then(|n| n.checked_mul(4))
        .filter(|n| *n > 0 && *n <= MAX_DECODED)
        .ok_or_else(|| anyhow::anyhow!("CAPTION_BUDGET_EXCEEDED: PNG dimensions"))
}

fn png_header(bytes: &[u8]) -> Result<(u32, u32)> {
    if bytes.len() < 33
        || &bytes[..8] != b"\x89PNG\r\n\x1a\n"
        || bytes[8..12] != 13u32.to_be_bytes()
        || &bytes[12..16] != b"IHDR"
        || !matches!(
            (bytes[25], bytes[24]),
            (0 | 3, 1 | 2 | 4 | 8) | (2 | 4 | 6, 8)
        )
        || bytes[26] != 0
        || bytes[27] != 0
        || bytes[28] > 1
        || crc32(&bytes[12..29]) != u32::from_be_bytes(bytes[29..33].try_into().unwrap())
    {
        bail!("sequence requires a valid PNG IHDR expandable to eight-bit channels");
    }
    let width = u32::from_be_bytes(bytes[16..20].try_into().unwrap());
    let height = u32::from_be_bytes(bytes[20..24].try_into().unwrap());
    rgba_bytes(width, height)?;
    Ok((width, height))
}

fn crc32(bytes: &[u8]) -> u32 {
    let mut crc = u32::MAX;
    for byte in bytes {
        crc ^= u32::from(*byte);
        for _ in 0..8 {
            crc = (crc >> 1) ^ (0xedb88320 & (0u32.wrapping_sub(crc & 1)));
        }
    }
    !crc
}

fn decode(frame: &EncodedFrame, premultiply: SequencePremultiply) -> Result<BitmapData> {
    let size = usize::try_from(rgba_bytes(frame.width, frame.height)?)?;
    let mut rgba = vec![0; size];
    let color = {
        let mut decoder = png::Decoder::new_with_limits(
            Cursor::new(&frame.bytes),
            png::Limits {
                bytes: DECODER_LIMIT,
            },
        );
        decoder.set_transformations(png::Transformations::EXPAND);
        decoder.set_ignore_text_chunk(true);
        decoder.set_ignore_iccp_chunk(true);
        decoder.ignore_checksums(false);
        let mut reader = decoder.read_info()?;
        if reader.info().animation_control.is_some() {
            bail!("animated PNG is not an independent sequence frame");
        }
        if reader.output_buffer_size().is_none_or(|n| n > size) {
            bail!("unexpected PNG output size");
        }
        let info = reader.next_frame(&mut rgba)?;
        if info.width != frame.width
            || info.height != frame.height
            || info.bit_depth != png::BitDepth::Eight
        {
            bail!("PNG output differs from frozen header");
        }
        reader.finish()?;
        info.color_type
    };
    let channels = match color {
        png::ColorType::Grayscale => 1,
        png::ColorType::GrayscaleAlpha => 2,
        png::ColorType::Rgb => 3,
        png::ColorType::Rgba => 4,
        png::ColorType::Indexed => bail!("PNG palette was not expanded"),
    };
    for pixel in (0..size / 4).rev() {
        let offset = pixel * channels;
        let (r, g, b, a) = match channels {
            1 => (rgba[offset], rgba[offset], rgba[offset], 255),
            2 => (rgba[offset], rgba[offset], rgba[offset], rgba[offset + 1]),
            3 => (rgba[offset], rgba[offset + 1], rgba[offset + 2], 255),
            _ => (
                rgba[offset],
                rgba[offset + 1],
                rgba[offset + 2],
                rgba[offset + 3],
            ),
        };
        rgba[pixel * 4..pixel * 4 + 4].copy_from_slice(&[
            channel(r, a, premultiply),
            channel(g, a, premultiply),
            channel(b, a, premultiply),
            a,
        ]);
    }
    Ok(BitmapData {
        width: frame.width,
        height: frame.height,
        rgba: Arc::from(rgba),
    })
}

fn channel(color: u8, alpha: u8, mode: SequencePremultiply) -> u8 {
    let (c, a) = (u16::from(color), u16::from(alpha));
    match mode {
        SequencePremultiply::Rounded => ((c * a + 127) / 255) as u8,
        SequencePremultiply::ShiftedByte => ((c * (a + 1)) >> 8) as u8,
    }
}

#[cfg(test)]
#[path = "image_sequence_tests.rs"]
mod tests;
