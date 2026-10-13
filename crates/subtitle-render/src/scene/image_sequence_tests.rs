use super::*;
use caption_scene::ResourceRef;

fn png(color: png::ColorType, pixels: &[u8]) -> Vec<u8> {
    let mut bytes = Vec::new();
    {
        let mut encoder = png::Encoder::new(&mut bytes, 1, 1);
        encoder.set_color(color);
        encoder.set_depth(png::BitDepth::Eight);
        if color == png::ColorType::Indexed {
            encoder.set_palette(vec![201, 127, 3]);
            encoder.set_trns(vec![101]);
        }
        encoder
            .write_header()
            .unwrap()
            .write_image_data(pixels)
            .unwrap();
    }
    bytes
}
fn resource(id: &str, bytes: &[u8]) -> ImageResource {
    ImageResource {
        id: id.into(),
        asset_ref: ResourceRef {
            id: id.into(),
            revision: "1".into(),
        },
        content_hash: format!(
            "sha256:{}",
            Sha256::digest(bytes)
                .iter()
                .map(|byte| format!("{byte:02x}"))
                .collect::<String>()
        ),
    }
}
fn sequence(id: &str, images: &[Vec<u8>], mode: SequencePremultiply) -> ImageSequenceResource {
    ImageSequenceResource {
        id: id.into(),
        frames: images
            .iter()
            .enumerate()
            .map(|(i, bytes)| resource(&format!("{id}-{i}"), bytes))
            .collect(),
        premultiply: mode,
    }
}
fn load(images: &[Vec<u8>], mode: SequencePremultiply) -> ImageSequenceCache {
    ImageSequenceCache::load(&[sequence("s", images, mode)], 0, |r| {
        Some(images[r.id.strip_prefix("s-").unwrap().parse::<usize>().unwrap()].clone())
    })
    .unwrap()
}

#[test]
fn image_sequence_exact_premultiplication_and_raw_expansion() {
    let mut difference_count = 0;
    for alpha in 0..=255u8 {
        for color in 0..=255u8 {
            let shifted = channel(color, alpha, SequencePremultiply::ShiftedByte);
            let rounded = channel(color, alpha, SequencePremultiply::Rounded);
            assert_eq!(shifted as u32, color as u32 * (alpha as u32 + 1) / 256);
            assert_eq!(rounded as u32, (color as u32 * alpha as u32 + 127) / 255);
            difference_count += usize::from(shifted != rounded);
        }
    }
    assert_eq!(difference_count, 18760);
    let cases = [
        (
            png::ColorType::Rgba,
            vec![201, 127, 3, 101],
            [201, 127, 3, 101],
        ),
        (png::ColorType::Rgb, vec![201, 127, 3], [201, 127, 3, 255]),
        (png::ColorType::Grayscale, vec![127], [127, 127, 127, 255]),
        (
            png::ColorType::GrayscaleAlpha,
            vec![127, 101],
            [127, 127, 127, 101],
        ),
        (png::ColorType::Indexed, vec![0], [201, 127, 3, 101]),
        (
            png::ColorType::Rgba,
            vec![255, 130, 71, 0],
            [255, 130, 71, 0],
        ),
    ];
    for mode in [
        SequencePremultiply::Rounded,
        SequencePremultiply::ShiftedByte,
    ] {
        for (color, pixels, expected) in &cases {
            let mut cache = load(&[png(*color, pixels)], mode);
            let bitmap = cache.frame("s", 0).unwrap();
            let [r, g, b, a] = *expected;
            assert_eq!(
                &*bitmap.rgba,
                &[
                    channel(r, a, mode),
                    channel(g, a, mode),
                    channel(b, a, mode),
                    a
                ]
            );
        }
    }
}

#[test]
fn image_sequence_checks_every_manifest_frame_before_sampling() {
    let images = vec![png(png::ColorType::Rgba, &[1, 2, 3, 255]); 3];
    let mut manifest = sequence("s", &images, SequencePremultiply::Rounded);
    manifest.frames[2].content_hash = format!("sha256:{}", "0".repeat(64));
    let error = ImageSequenceCache::load(&[manifest], 0, |_| Some(images[0].clone()))
        .err()
        .unwrap();
    assert!(error.to_string().contains("DIGEST"));
    let manifest = sequence("s", &images, SequencePremultiply::Rounded);
    let error = ImageSequenceCache::load(&[manifest], 0, |r| {
        (r.id != "s-2").then(|| images[0].clone())
    })
    .err()
    .unwrap();
    assert!(error.to_string().contains("MISSING"));
    for offset in [24, 29] {
        let mut invalid = images[0].clone();
        invalid[offset] ^= 24; // A non-eight-bit header or invalid IHDR CRC.
        let manifest = sequence("s", &[invalid.clone()], SequencePremultiply::Rounded);
        let error = ImageSequenceCache::load(&[manifest], 0, |_| Some(invalid.clone()))
            .err()
            .unwrap();
        assert!(error.to_string().contains("FORMAT"));
    }
}

#[test]
fn image_sequence_corrupt_selected_frame_never_returns_previous_frame() {
    let valid = png(png::ColorType::Rgba, &[99, 12, 34, 255]);
    let mut broken = valid.clone();
    let position = broken.windows(4).position(|w| w == b"IDAT").unwrap();
    broken[position + 4] ^= 1; // Valid SHA and header, invalid compressed content/CRC.
    let mut cache = load(&[valid, broken], SequencePremultiply::Rounded);
    let good = cache.frame("s", 0).unwrap();
    for _ in 0..2 {
        assert!(
            cache
                .frame("s", 1)
                .unwrap_err()
                .to_string()
                .contains("FORMAT")
        );
    }
    assert!(Arc::ptr_eq(&good, &cache.frame("s", 0).unwrap()));
    assert!(
        cache
            .frame("s", 2)
            .unwrap_err()
            .to_string()
            .contains("FRAME_INDEX")
    );
    assert!(
        cache
            .frame("missing", 0)
            .unwrap_err()
            .to_string()
            .contains("MISSING")
    );
    assert_eq!(cache.decoded_bytes(), 4);
}

#[test]
fn image_sequence_213_frames_are_lazy_and_reverse_seek_exact() {
    let images: Vec<_> = (0..213)
        .map(|i| png(png::ColorType::Rgba, &[i, 213 - i, 0, 255]))
        .collect();
    let mut cache = load(&images, SequencePremultiply::ShiftedByte);
    assert_eq!(
        cache.encoded_bytes(),
        images.iter().map(|b| b.len() as u64).sum::<u64>()
    );
    assert_eq!(cache.decoded_bytes(), 0);
    for i in (0..213).rev().chain(0..213) {
        let bitmap = cache.frame("s", i).unwrap();
        assert_eq!(&*bitmap.rgba, &[i as u8, 213 - i as u8, 0, 255]);
        assert!(cache.lru.len() <= 4);
        assert!(cache.decoded_bytes() <= 16);
        assert!(cache.peak_decode_bytes() <= MAX_DECODED);
    }
}

#[test]
fn image_sequence_global_lru_tracks_external_pixel_clones() {
    let images: Vec<_> = (0..4)
        .map(|i| png(png::ColorType::Rgba, &[i, 0, 0, 255]))
        .collect();
    let manifests = [
        sequence("a", &images, SequencePremultiply::Rounded),
        sequence("b", &images, SequencePremultiply::Rounded),
    ];
    let mut cache = ImageSequenceCache::load(&manifests, 0, |r| {
        Some(images[r.id[2..].parse::<usize>().unwrap()].clone())
    })
    .unwrap();
    let first = cache.frame("a", 0).unwrap();
    let pixels = first.rgba.clone();
    drop(first);
    for i in 0..4 {
        cache.frame("b", i).unwrap();
    }
    assert_eq!(cache.lru.len(), 4);
    assert_eq!(cache.decoded_bytes(), 20); // Evicted a-0 still belongs to a recorded frame.
    let restored = cache.frame("a", 0).unwrap();
    assert!(Arc::ptr_eq(&pixels, &restored.rgba));
    drop(restored);
    drop(pixels);
    for i in 0..4 {
        cache.frame("b", i).unwrap();
    }
    assert_eq!(cache.decoded_bytes(), 16);
}

#[test]
fn image_sequence_peak_budget_checked_before_decode_and_includes_pinned_pixels() {
    let images = vec![png(png::ColorType::Rgba, &[1, 2, 3, 255]); 2];
    let manifest = sequence("s", &images, SequencePremultiply::Rounded);
    let scratch = decode_peak_bytes(1, 1, 4);
    let mut cache = ImageSequenceCache::load(&[manifest], MAX_DECODED - scratch, |_| {
        Some(images[0].clone())
    })
    .unwrap();
    let pixels = cache.frame("s", 0).unwrap().rgba.clone();
    assert_eq!(cache.peak_decode_bytes(), MAX_DECODED);
    assert!(
        cache
            .frame("s", 1)
            .unwrap_err()
            .to_string()
            .contains("BUDGET")
    );
    assert_eq!(cache.decoded_bytes(), 4);
    drop(pixels);
    assert_eq!(cache.decoded_bytes(), 0);
    assert!(cache.frame("s", 1).is_ok());
}

#[test]
fn image_sequence_encoded_manifest_limit_is_aggregate() {
    let mut bytes = png(png::ColorType::Rgba, &[1, 2, 3, 255]);
    bytes.resize((MAX_ENCODED / 2 + 1) as usize, 0);
    let manifest = sequence(
        "s",
        &[bytes.clone(), bytes.clone()],
        SequencePremultiply::Rounded,
    );
    let error = ImageSequenceCache::load(&[manifest], 0, |_| Some(bytes.clone()))
        .err()
        .unwrap();
    assert!(error.to_string().contains("encoded sequences"));
}

fn packed_png(color: png::ColorType, depth: png::BitDepth, samples: &[u8]) -> Vec<u8> {
    const WIDTH: usize = 5;
    const HEIGHT: usize = 2;
    assert_eq!(samples.len(), WIDTH * HEIGHT);
    let bits = depth as usize;
    let row_bytes = (WIDTH * bits).div_ceil(8);
    let mut packed = vec![0u8; row_bytes * HEIGHT];
    for y in 0..HEIGHT {
        for x in 0..WIDTH {
            packed[y * row_bytes + x * bits / 8] |=
                samples[y * WIDTH + x] << (8 - bits - (x * bits % 8));
        }
    }
    let mut bytes = Vec::new();
    {
        let mut encoder = png::Encoder::new(&mut bytes, WIDTH as u32, HEIGHT as u32);
        encoder.set_color(color);
        encoder.set_depth(depth);
        if color == png::ColorType::Indexed {
            encoder.set_palette(vec![255, 99, 11, 201, 127, 3]);
            encoder.set_trns(vec![0, 101]);
        }
        encoder
            .write_header()
            .unwrap()
            .write_image_data(&packed)
            .unwrap();
    }
    bytes
}

#[test]
fn image_sequence_low_bit_palettes_expand_before_premultiply_across_seeks() {
    let samples = [0, 1, 1, 0, 1, 1, 0, 1, 0, 0];
    let depths = [
        png::BitDepth::One,
        png::BitDepth::Two,
        png::BitDepth::Four,
        png::BitDepth::Eight,
    ];
    let mut images = vec![packed_png(
        png::ColorType::Indexed,
        png::BitDepth::One,
        &[0; 10],
    )];
    images.extend(depths.map(|depth| packed_png(png::ColorType::Indexed, depth, &samples)));
    for mode in [
        SequencePremultiply::Rounded,
        SequencePremultiply::ShiftedByte,
    ] {
        let mut cache = load(&images, mode);
        // Five frames force eviction, including the fully transparent one-bit first frame.
        for index in [0, 1, 2, 3, 4, 0, 4, 2, 1, 3, 0] {
            let bitmap = cache.frame("s", index).unwrap();
            assert_eq!((bitmap.width, bitmap.height), (5, 2));
            for (pixel, sample) in bitmap.rgba.chunks_exact(4).zip(samples) {
                let expected = if index == 0 || sample == 0 {
                    [0, 0, 0, 0]
                } else {
                    [
                        channel(201, 101, mode),
                        channel(127, 101, mode),
                        channel(3, 101, mode),
                        101,
                    ]
                };
                assert_eq!(pixel, expected);
            }
        }
    }
}

#[test]
fn image_sequence_packed_gray_expands_each_row_without_padding_pixels() {
    for depth in [png::BitDepth::One, png::BitDepth::Two, png::BitDepth::Four] {
        let max = ((1u16 << depth as u8) - 1) as u8;
        let samples = [0, max, max / 2, max, 0, max, 0, max / 2, 0, max];
        let mut cache = load(
            &[packed_png(png::ColorType::Grayscale, depth, &samples)],
            SequencePremultiply::ShiftedByte,
        );
        let bitmap = cache.frame("s", 0).unwrap();
        for (pixel, sample) in bitmap.rgba.chunks_exact(4).zip(samples) {
            let gray = sample * (255 / max);
            assert_eq!(pixel, [gray, gray, gray, 255]);
        }
    }
}

#[test]
fn image_sequence_rejects_sixteen_bit_and_illegal_low_bit_color_headers() {
    let original = png(png::ColorType::Rgba, &[1, 2, 3, 255]);
    for (color, depth) in [
        (0, 16),
        (2, 16),
        (3, 16),
        (4, 16),
        (6, 16),
        (2, 1),
        (4, 2),
        (6, 4),
    ] {
        let mut bytes = original.clone();
        bytes[24] = depth;
        bytes[25] = color;
        let crc = crc32(&bytes[12..29]);
        bytes[29..33].copy_from_slice(&crc.to_be_bytes());
        let manifest = sequence("s", &[bytes.clone()], SequencePremultiply::Rounded);
        let error = ImageSequenceCache::load(&[manifest], 0, |_| Some(bytes.clone()))
            .err()
            .unwrap();
        assert!(error.to_string().contains("FORMAT"));
    }
}
