use anyhow::{Result, bail};
use motion::effect::BlendMode;
use render_raster::drawop::{self, BitmapData, DrawOp, FrameOps};
use render_raster::emissive::{
    composite_associated, has_emissive_components, has_emissive_components_within,
};
use render_raster::plan::{CompositeInput, CpuExecutor, PassExecutor, SurfaceId, SurfacePlan};
use render_raster::raster::{FrameMedia, rasterize_with_media};
use std::sync::Arc;
use tiny_skia::{Mask, Pixmap};
const IDENTITY: [f32; 6] = [1., 0., 0., 1., 0., 0.];
struct Empty;
impl FrameMedia for Empty {
    fn frame(&mut self, _: &str, _: i64) -> Result<Arc<Pixmap>> {
        bail!("unexpected media")
    }
}
fn fixture() -> FrameOps {
    FrameOps {
        bitmaps: vec![BitmapData {
            width: 1,
            height: 1,
            rgba: Arc::from([200, 80, 0, 0]),
        }],
        ops: vec![DrawOp::DrawEmissiveBitmap {
            bitmap: 0,
            opacity: 1.,
            tf: IDENTITY,
        }],
        ..Default::default()
    }
}
fn raster(frame: &FrameOps, w: u32, h: u32) -> Pixmap {
    rasterize_with_media(frame, w, h, &mut Empty).unwrap()
}
fn pixel(p: &Pixmap, x: usize, y: usize) -> &[u8] {
    let i = (y * p.width() as usize + x) * 4;
    &p.data()[i..i + 4]
}

#[test]
fn emissive_op_selects_v6_and_roundtrips_without_changing_ordinary_versions() {
    let frame = fixture();
    assert_eq!(drawop::required_version(&frame), 6);
    let encoded = drawop::encode(&frame);
    let (version, decoded) = drawop::decode(&encoded).unwrap();
    assert_eq!(version, 6);
    assert_eq!(decoded.bitmaps, frame.bitmaps);
    assert_eq!(drawop::encode(&decoded), encoded);
    let mut v5 = encoded.clone();
    v5[4..8].copy_from_slice(&5u32.to_le_bytes());
    assert!(drawop::decode(&v5).is_err());
    let mut ordinary = fixture();
    ordinary.ops = vec![DrawOp::DrawBitmap {
        bitmap: 0,
        opacity: 1.,
        tf: IDENTITY,
    }];
    assert_eq!(drawop::required_version(&ordinary), 5);
    assert_eq!(drawop::required_version(&FrameOps::default()), 3);
    assert!(
        rasterize_with_media(&ordinary, 1, 1, &mut Empty)
            .err()
            .unwrap()
            .to_string()
            .contains("EMISSIVE_BITMAP_OP_REQUIRED")
    );
}
#[test]
fn zero_alpha_emission_survives_opacity_layers_and_opaque_composition() {
    let mut frame = fixture();
    assert_eq!(pixel(&raster(&frame, 1, 1), 0, 0), [200, 80, 0, 0]);
    frame.ops.insert(
        0,
        DrawOp::PushLayer {
            opacity: 0.5,
            blend: BlendMode::Normal,
        },
    );
    frame.ops.push(DrawOp::PopLayer);
    assert_eq!(pixel(&raster(&frame, 1, 1), 0, 0), [100, 40, 0, 0]);
    frame.ops.insert(
        0,
        DrawOp::Clear {
            color: [0., 0., 0., 1.],
        },
    );
    assert_eq!(pixel(&raster(&frame, 1, 1), 0, 0), [100, 40, 0, 255]);
    frame.ops[1] = DrawOp::PushLayer {
        opacity: 0.5,
        blend: BlendMode::Multiply,
    };
    assert!(
        rasterize_with_media(&frame, 1, 1, &mut Empty)
            .err()
            .unwrap()
            .to_string()
            .contains("EMISSIVE_BLEND_UNSUPPORTED")
    );
}
#[test]
fn affine_bilinear_filter_and_clip_preserve_independent_channels() {
    let mut frame = fixture();
    frame.ops = vec![DrawOp::DrawEmissiveBitmap {
        bitmap: 0,
        opacity: 1.,
        tf: [1., 0., 0., 1., 0.5, 0.],
    }];
    let image = raster(&frame, 2, 1);
    assert_eq!(pixel(&image, 0, 0), [100, 40, 0, 0]);
    assert_eq!(pixel(&image, 1, 0), [100, 40, 0, 0]);
    frame.ops = vec![DrawOp::DrawEmissiveBitmap {
        bitmap: 0,
        opacity: 1.,
        tf: [0., 1., -1., 0., 2., 0.],
    }];
    assert_eq!(pixel(&raster(&frame, 3, 2), 1, 0), [200, 80, 0, 0]);
    let source = raster(&fixture(), 1, 1);
    let mut mask = Mask::new(1, 1).unwrap();
    mask.data_mut()[0] = 128;
    let mut out = Pixmap::new(1, 1).unwrap();
    composite_associated(&mut out, source.as_ref(), 0.5, IDENTITY, Some(&mask)).unwrap();
    assert_eq!(out.data(), [50, 20, 0, 0]);
    assert!(has_emissive_components(out.data()));
}
#[test]
fn ordinary_source_over_and_alpha_matte_do_not_erase_existing_emission() {
    let mut frame = fixture();
    frame.ops.push(DrawOp::FillRect {
        x: 0.,
        y: 0.,
        w: 1.,
        h: 1.,
        radius: 0.,
        color: [0., 1., 0., 0.25],
        tf: IDENTITY,
    });
    let out = raster(&frame, 1, 1);
    assert!(
        out.data()[0] > out.data()[3],
        "ordinary over must preserve excess color"
    );
    frame = fixture();
    frame.ops.insert(
        0,
        DrawOp::PushLayer {
            opacity: 1.,
            blend: BlendMode::Normal,
        },
    );
    frame.ops.extend([
        DrawOp::PushMatte,
        DrawOp::FillRect {
            x: 0.,
            y: 0.,
            w: 1.,
            h: 1.,
            radius: 0.,
            color: [0., 0., 0., 0.5],
            tf: IDENTITY,
        },
        DrawOp::PopMatte { mode: 0 },
        DrawOp::PopLayer,
    ]);
    assert_eq!(raster(&frame, 1, 1).data(), [100, 40, 0, 0]);
}
#[test]
fn surface_executor_transforms_and_composites_emission_without_alpha_bounds_loss() {
    let mut cpu = CpuExecutor::default();
    let source = Arc::new(raster(&fixture(), 1, 1));
    let surface = SurfacePlan::canvas(SurfaceId(0), 2, 1);
    let shifted = cpu
        .transform(&surface, &source, &[1., 0., 0., 1., 0.5, 0.])
        .unwrap();
    assert_eq!(shifted.data(), [100, 40, 0, 0, 100, 40, 0, 0]);
    let mut clear = SurfacePlan::canvas(SurfaceId(0), 1, 1);
    clear.clear = Some([0., 0., 0., 1.]);
    assert_eq!(
        cpu.draw(&clear, &fixture(), &mut Empty).unwrap().data(),
        [200, 80, 0, 255]
    );
    let surface = SurfacePlan::canvas(SurfaceId(0), 1, 1);
    let input = CompositeInput {
        surface: SurfaceId(0),
        blend: BlendMode::Normal,
        opacity: 0.5,
        mask: None,
    };
    assert_eq!(
        cpu.composite(&surface, &[(input.clone(), source.clone(), None)])
            .unwrap()
            .data(),
        [100, 40, 0, 0]
    );
    let mut invalid = input;
    invalid.blend = BlendMode::Multiply;
    assert!(
        cpu.composite(&surface, &[(invalid, source, None)])
            .err()
            .unwrap()
            .to_string()
            .contains("EMISSIVE_BLEND_UNSUPPORTED")
    );
}

/// 分块扫描与逐像素的定义逐个对拍：任意长度（含块尾的零头）、任意位置上的一个超出 alpha 的分量都找得到；
/// 只看框内时框外的发光不算数。
#[test]
fn block_scan_matches_the_per_pixel_definition_anywhere_in_the_buffer() {
    let reference = |data: &[u8]| {
        data.chunks_exact(4)
            .any(|p| p[..3].iter().any(|c| *c > p[3]))
    };
    let mut state = 0x9e37_79b9_u32;
    let mut next = || {
        state ^= state << 13;
        state ^= state >> 17;
        state ^= state << 5;
        state
    };
    for _ in 0..2000 {
        let pixels = 1 + (next() % 700) as usize;
        let mut data: Vec<u8> = (0..pixels)
            .flat_map(|_| {
                let a = (next() % 256) as u8;
                [0, 1, 2]
                    .map(|_| (next() % (u32::from(a) + 1)) as u8)
                    .into_iter()
                    .chain([a])
            })
            .collect();
        if next() % 2 == 0 {
            let at = (next() as usize % pixels) * 4;
            data[at + 3] = data[at + 3].min(254);
            data[at + (next() % 3) as usize] = data[at + 3] + 1;
        }
        assert_eq!(has_emissive_components(&data), reference(&data));
    }
    // 4×3 的图，发光像素在 (3, 2)。
    let mut data = vec![0u8; 4 * 3 * 4];
    data[(2 * 4 + 3) * 4] = 9;
    assert!(has_emissive_components_within(&data, 4, (0, 0, 4, 3)));
    assert!(has_emissive_components_within(&data, 4, (3, 2, 9, 9)));
    assert!(!has_emissive_components_within(&data, 4, (0, 0, 3, 3)));
    assert!(!has_emissive_components_within(&data, 4, (0, 0, 4, 2)));
    assert!(!has_emissive_components_within(&data, 4, (4, 0, 4, 3)));
}
