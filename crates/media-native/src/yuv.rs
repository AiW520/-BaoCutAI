//! 与平台无关的 YUV ↔ RGBA 换算（纯函数，只吃字节切片与步长）。
//!
//! Windows 的 Source Reader 让解码器交 NV12，由这里按码流标注的矩阵与量化范围换成 RGBA：Media Foundation 自带的
//! RGB32 转换不看码流的颜色标注，小于高清的画面一律按 BT.601 换，BT.709 素材的红色因此只剩 0.914 倍（实测与 ffmpeg
//! 的跨后端 SSIM 0.79–0.81）。换算放在这里而不带 `cfg(windows)`，macOS 与 CI 上也跑它的单元测试。

/// YUV → RGB 的矩阵（ITU-R BT.601 / BT.709 / BT.2020 非恒定亮度）。
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub(crate) enum YuvMatrix {
    Bt601,
    Bt709,
    Smpte240m,
    Bt2020,
}

impl YuvMatrix {
    /// 码流没有标注矩阵时的推定：高于 576 行（PAL 标清）按 BT.709，否则 BT.601。与 Media Foundation 视频处理器、
    /// 浏览器和多数播放器对无标注素材的推定相同。
    pub(crate) fn guess(height: u32) -> Self {
        if height > 576 {
            Self::Bt709
        } else {
            Self::Bt601
        }
    }

    /// (Kr, Kb)。
    fn weights(self) -> (f64, f64) {
        match self {
            Self::Bt601 => (0.299, 0.114),
            Self::Bt709 => (0.2126, 0.0722),
            Self::Smpte240m => (0.212, 0.087),
            Self::Bt2020 => (0.2627, 0.0593),
        }
    }
}

/// 定点（16 位小数）的 YUV → RGB 系数，按矩阵与量化范围预先算好。
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub(crate) struct YuvToRgb {
    y_offset: i32,
    y_gain: i32,
    r_from_v: i32,
    g_from_u: i32,
    g_from_v: i32,
    b_from_u: i32,
}

const FRACTION_BITS: u32 = 16;
const ROUNDING: i32 = 1 << (FRACTION_BITS - 1);

impl YuvToRgb {
    /// `full_range`：Y 与 UV 占满 0–255（JPEG / `pc`）；否则是有限范围（Y 16–235、UV 16–240，`tv`，H.264 的缺省）。
    pub(crate) fn new(matrix: YuvMatrix, full_range: bool) -> Self {
        let (kr, kb) = matrix.weights();
        let kg = 1.0 - kr - kb;
        let (y_offset, y_scale, c_scale) = if full_range {
            (0, 1.0, 1.0)
        } else {
            (16, 255.0 / 219.0, 255.0 / 224.0)
        };
        let fixed = |value: f64| (value * f64::from(1_u32 << FRACTION_BITS)).round() as i32;
        Self {
            y_offset,
            y_gain: fixed(y_scale),
            r_from_v: fixed(2.0 * (1.0 - kr) * c_scale),
            g_from_u: fixed(2.0 * kb * (1.0 - kb) / kg * c_scale),
            g_from_v: fixed(2.0 * kr * (1.0 - kr) / kg * c_scale),
            b_from_u: fixed(2.0 * (1.0 - kb) * c_scale),
        }
    }

    /// 一个像素的 RGBA（alpha 恒 255）。
    #[inline]
    pub(crate) fn pixel(&self, y: u8, u: u8, v: u8) -> [u8; 4] {
        let luma = (i32::from(y) - self.y_offset) * self.y_gain + ROUNDING;
        let u = i32::from(u) - 128;
        let v = i32::from(v) - 128;
        let channel = |value: i32| (value >> FRACTION_BITS).clamp(0, 255) as u8;
        [
            channel(luma + self.r_from_v * v),
            channel(luma - self.g_from_u * u - self.g_from_v * v),
            channel(luma + self.b_from_u * u),
            255,
        ]
    }
}

/// 一帧 NV12 的两个平面：Y 平面后是 U、V 交错的半分辨率色度平面。行距可以大于宽度（解码器按 16 或 64 对齐）。
#[derive(Clone, Copy, Debug)]
pub(crate) struct Nv12<'a> {
    pub(crate) luma: &'a [u8],
    pub(crate) luma_pitch: usize,
    pub(crate) chroma: &'a [u8],
    pub(crate) chroma_pitch: usize,
    /// 要换算的可见区域（显示孔径）的宽高，从两个平面的左上角算起。
    pub(crate) width: usize,
    pub(crate) height: usize,
}

/// 画面里的一块矩形（像素）。
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub(crate) struct Area {
    pub(crate) x: usize,
    pub(crate) y: usize,
    pub(crate) width: usize,
    pub(crate) height: usize,
}

impl<'a> Nv12<'a> {
    /// 一块连续的 NV12 缓冲：Y 平面 `plane_rows` 行、行距 `pitch`，色度平面紧跟其后、行距相同；取其中 `visible`
    /// 那一块（解码器的显示孔径，偏移须为偶数）。装不下时 `None`。
    ///
    /// `plane_rows` 是解码器按宏块对齐后的平面高度，可以大于可见高度：1080p 的 H.264 平面是 1088 行，色度平面从第
    /// 1088 行起，按 1080 行去找会错开 8 行亮度。
    pub(crate) fn in_buffer(
        buffer: &'a [u8],
        pitch: usize,
        plane_rows: usize,
        visible: Area,
    ) -> Option<Self> {
        if !visible.x.is_multiple_of(2) || !visible.y.is_multiple_of(2) {
            return None;
        }
        let chroma_start = pitch.checked_mul(plane_rows)?;
        let luma = buffer.get(visible.y * pitch + visible.x..chroma_start)?;
        let chroma = buffer.get(chroma_start + visible.y / 2 * pitch + visible.x..)?;
        let frame = Self {
            luma,
            luma_pitch: pitch,
            chroma,
            chroma_pitch: pitch,
            width: visible.width,
            height: visible.height,
        };
        frame.fits().then_some(frame)
    }

    /// 两个平面装得下 `width × height` 的可见区域。
    pub(crate) fn fits(&self) -> bool {
        let chroma_width = self.width.div_ceil(2) * 2;
        let chroma_rows = self.height.div_ceil(2);
        self.width > 0
            && self.height > 0
            && self.luma_pitch >= self.width
            && self.chroma_pitch >= chroma_width
            && self.luma.len() >= self.luma_pitch * (self.height - 1) + self.width
            && self.chroma.len() >= self.chroma_pitch * (chroma_rows - 1) + chroma_width
    }
}

/// NV12 → 摆正后的 top-down RGBA8，写进 `out`（长度改成一帧），返回输出的宽高。
///
/// 色度按最近邻上采样：每个 UV 样本给 2×2 个像素共用（与 ffmpeg swscale 同尺寸换算的缺省路径、libyuv 相同）。
/// `rotation` 是顺时针摆正的角度（0 / 90 / 180 / 270，其余按 0）。调用前须 [`Nv12::fits`]。
///
/// 逐行换算（[`convert_row`]），旋转的分支在行外：不转的素材（绝大多数）直接写进输出行；转的先换进一行暂存，
/// 再按角度各自一条循环摆到位。逐字节等于逐像素套 [`YuvToRgb::pixel`] 再按旋转落点写（测试对拍）。
pub(crate) fn nv12_to_rgba(
    frame: &Nv12<'_>,
    convert: &YuvToRgb,
    rotation: u16,
    out: &mut Vec<u8>,
) -> (usize, usize) {
    nv12_to_rgba_with(frame, convert, rotation, out, row_converter())
}

/// [`nv12_to_rgba`] 用指定的逐行换算：测试把通用版与 AVX2 版分别对拍。
fn nv12_to_rgba_with(
    frame: &Nv12<'_>,
    convert: &YuvToRgb,
    rotation: u16,
    out: &mut Vec<u8>,
    convert_row: RowConverter,
) -> (usize, usize) {
    debug_assert!(frame.fits());
    let (width, height) = (frame.width, frame.height);
    let (out_width, out_height) = if matches!(rotation, 90 | 270) {
        (height, width)
    } else {
        (width, height)
    };
    out.resize(out_width * out_height * 4, 0);
    let row_bytes = width * 4;
    let source_row = |y: usize| {
        let luma = &frame.luma[y * frame.luma_pitch..y * frame.luma_pitch + width];
        let chroma_start = (y / 2) * frame.chroma_pitch;
        let chroma = &frame.chroma[chroma_start..chroma_start + width.div_ceil(2) * 2];
        (luma, chroma)
    };
    if !matches!(rotation, 90 | 180 | 270) {
        for (y, target) in out.chunks_exact_mut(row_bytes).enumerate() {
            let (luma, chroma) = source_row(y);
            convert_row(luma, chroma, convert, target);
        }
        return (out_width, out_height);
    }
    let mut row = vec![0_u8; row_bytes];
    for y in 0..height {
        let (luma, chroma) = source_row(y);
        convert_row(luma, chroma, convert, &mut row);
        let pixels = row.chunks_exact(4);
        match rotation {
            // 源 (x, y) → 目标 (height-1-y, x)：源的一行落成目标的一列。
            90 => {
                let column = height - 1 - y;
                for (x, pixel) in pixels.enumerate() {
                    let at = (x * out_width + column) * 4;
                    out[at..at + 4].copy_from_slice(pixel);
                }
            }
            // 源 (x, y) → 目标 (width-1-x, height-1-y)：行序与行内都倒过来。
            180 => {
                let target = &mut out[(height - 1 - y) * row_bytes..(height - y) * row_bytes];
                for (pixel, slot) in pixels.zip(target.chunks_exact_mut(4).rev()) {
                    slot.copy_from_slice(pixel);
                }
            }
            // 源 (x, y) → 目标 (y, width-1-x)。
            _ => {
                for (x, pixel) in pixels.enumerate() {
                    let at = ((width - 1 - x) * out_width + y) * 4;
                    out[at..at + 4].copy_from_slice(pixel);
                }
            }
        }
    }
    (out_width, out_height)
}

/// 一行的换算函数：[`row_converter`] 按 CPU 选。
type RowConverter = fn(&[u8], &[u8], &YuvToRgb, &mut [u8]);

/// 本机最快的逐行换算。x86-64 的缺省目标只到 SSE2，32 位整数乘法向量化不了，同一份代码按 AVX2 编一遍再在运行时
/// 选：1080p 一帧从约 4.3 ms 降到约 0.9 ms（i7-12700F）。两份是同一段整数运算，结果逐字节相同（测试两份都对拍）。
fn row_converter() -> RowConverter {
    #[cfg(target_arch = "x86_64")]
    if std::arch::is_x86_feature_detected!("avx2") {
        return convert_row_avx2_entry;
    }
    convert_row
}

#[cfg(target_arch = "x86_64")]
fn convert_row_avx2_entry(luma: &[u8], chroma: &[u8], convert: &YuvToRgb, out: &mut [u8]) {
    // SAFETY: 只有 `row_converter` 在检测到 AVX2 之后才交出这个入口。
    unsafe { convert_row_avx2(luma, chroma, convert, out) }
}

#[cfg(target_arch = "x86_64")]
#[target_feature(enable = "avx2")]
unsafe fn convert_row_avx2(luma: &[u8], chroma: &[u8], convert: &YuvToRgb, out: &mut [u8]) {
    convert_row(luma, chroma, convert, out)
}

/// 一行 NV12 → RGBA：`luma` 是这一行的 `width` 个 Y，`chroma` 是对应的 UV 对（`width` 为奇数时最后一对只用 U、V
/// 给最后一个像素），`out` 是 `width × 4` 字节。每对像素共用一个 UV 样本，色度项每对只算一次；整数运算的次序与
/// [`YuvToRgb::pixel`] 相同，结果逐字节一样。`inline(always)`：AVX2 版靠把它内联进带 `target_feature` 的函数编出来。
#[inline(always)]
fn convert_row(luma: &[u8], chroma: &[u8], convert: &YuvToRgb, out: &mut [u8]) {
    let channel = |value: i32| (value >> FRACTION_BITS).clamp(0, 255) as u8;
    let pairs = luma.len() / 2;
    let (out_pairs, out_tail) = out.split_at_mut(pairs * 8);
    for ((ys, uv), rgba) in luma
        .chunks_exact(2)
        .zip(chroma.chunks_exact(2))
        .zip(out_pairs.chunks_exact_mut(8))
    {
        let u = i32::from(uv[0]) - 128;
        let v = i32::from(uv[1]) - 128;
        let red = convert.r_from_v * v;
        let green = convert.g_from_u * u + convert.g_from_v * v;
        let blue = convert.b_from_u * u;
        for (y, pixel) in ys.iter().zip(rgba.chunks_exact_mut(4)) {
            let luma = (i32::from(*y) - convert.y_offset) * convert.y_gain + ROUNDING;
            pixel[0] = channel(luma + red);
            pixel[1] = channel(luma - green);
            pixel[2] = channel(luma + blue);
            pixel[3] = 255;
        }
    }
    if let (Some(y), Some(uv)) = (luma.get(pairs * 2), chroma.get(pairs * 2..pairs * 2 + 2)) {
        out_tail[..4].copy_from_slice(&convert.pixel(*y, uv[0], uv[1]));
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    /// 对拍用的逐像素实现（W2 之前的 `nv12_to_rgba`）：每个像素套一次 [`YuvToRgb::pixel`]，再按旋转算落点。
    fn reference_nv12_to_rgba(
        frame: &Nv12<'_>,
        convert: &YuvToRgb,
        rotation: u16,
        out: &mut Vec<u8>,
    ) -> (usize, usize) {
        let (width, height) = (frame.width, frame.height);
        let (out_width, out_height) = if matches!(rotation, 90 | 270) {
            (height, width)
        } else {
            (width, height)
        };
        out.resize(out_width * out_height * 4, 0);
        for y in 0..height {
            let luma = &frame.luma[y * frame.luma_pitch..];
            let chroma = &frame.chroma[(y / 2) * frame.chroma_pitch..];
            for x in 0..width {
                let pixel = convert.pixel(luma[x], chroma[x / 2 * 2], chroma[x / 2 * 2 + 1]);
                let (tx, ty) = match rotation {
                    90 => (height - 1 - y, x),
                    180 => (width - 1 - x, height - 1 - y),
                    270 => (y, width - 1 - x),
                    _ => (x, y),
                };
                let at = (ty * out_width + tx) * 4;
                out[at..at + 4].copy_from_slice(&pixel);
            }
        }
        (out_width, out_height)
    }

    /// 确定性的伪随机字节（xorshift64*）：对拍不依赖随机数 crate，失败可复现。
    struct Bytes(u64);

    impl Bytes {
        fn next(&mut self) -> u8 {
            self.0 ^= self.0 >> 12;
            self.0 ^= self.0 << 25;
            self.0 ^= self.0 >> 27;
            (self.0.wrapping_mul(0x2545_f491_4f6c_dd1d) >> 56) as u8
        }

        fn fill(&mut self, len: usize) -> Vec<u8> {
            (0..len).map(|_| self.next()).collect()
        }
    }

    /// 本机能跑的每一种逐行换算：通用版，CPU 支持时再加 AVX2 版。
    fn row_converters() -> Vec<(&'static str, RowConverter)> {
        let mut converters: Vec<(&'static str, RowConverter)> = vec![("generic", convert_row)];
        #[cfg(target_arch = "x86_64")]
        if std::arch::is_x86_feature_detected!("avx2") {
            converters.push(("avx2", convert_row_avx2_entry));
        }
        converters
    }

    /// W2 的逐行实现与逐像素实现逐字节相同：随机平面（含 0 / 255 附近的饱和值）、奇偶宽高、行距大于宽度、四种
    /// 旋转加一个非法角度、全部矩阵与两种量化范围，通用版与 AVX2 版各比一遍；输出缓冲事先装着别的尺寸与内容。
    #[test]
    fn the_row_wise_converter_matches_the_per_pixel_reference_byte_for_byte() {
        let mut bytes = Bytes(0x9e37_79b9_7f4a_7c15);
        let sizes: [(usize, usize); 7] =
            [(1, 1), (2, 2), (3, 5), (7, 4), (16, 9), (33, 17), (64, 36)];
        for (width, height) in sizes {
            let luma_pitch = width + 5;
            let chroma_pitch = width.div_ceil(2) * 2 + 3;
            let luma = bytes.fill(luma_pitch * height);
            let chroma = bytes.fill(chroma_pitch * height.div_ceil(2));
            let frame = Nv12 {
                luma: &luma,
                luma_pitch,
                chroma: &chroma,
                chroma_pitch,
                width,
                height,
            };
            assert!(frame.fits());
            for matrix in [
                YuvMatrix::Bt601,
                YuvMatrix::Bt709,
                YuvMatrix::Smpte240m,
                YuvMatrix::Bt2020,
            ] {
                for full_range in [false, true] {
                    let convert = YuvToRgb::new(matrix, full_range);
                    for rotation in [0_u16, 90, 180, 270, 45] {
                        let mut expected = Vec::new();
                        let expected_size =
                            reference_nv12_to_rgba(&frame, &convert, rotation, &mut expected);
                        for (name, row) in row_converters() {
                            let mut actual = bytes.fill(11);
                            let actual_size =
                                nv12_to_rgba_with(&frame, &convert, rotation, &mut actual, row);
                            assert_eq!(actual_size, expected_size);
                            assert!(
                                actual == expected,
                                "{name} {width}x{height} {matrix:?} full={full_range} \
                                 rotation={rotation}"
                            );
                        }
                    }
                }
            }
        }
    }

    /// 有限范围的黑、白、灰落在 0 / 255 / 中灰，任何矩阵都一样（色度为 128 时矩阵不参与）。
    #[test]
    fn neutral_greys_map_onto_the_full_rgb_range() {
        for matrix in [
            YuvMatrix::Bt601,
            YuvMatrix::Bt709,
            YuvMatrix::Smpte240m,
            YuvMatrix::Bt2020,
        ] {
            let limited = YuvToRgb::new(matrix, false);
            assert_eq!(limited.pixel(16, 128, 128), [0, 0, 0, 255]);
            assert_eq!(limited.pixel(235, 128, 128), [255, 255, 255, 255]);
            assert_eq!(limited.pixel(126, 128, 128), [128, 128, 128, 255]);
            let full = YuvToRgb::new(matrix, true);
            assert_eq!(full.pixel(0, 128, 128), [0, 0, 0, 255]);
            assert_eq!(full.pixel(255, 128, 128), [255, 255, 255, 255]);
        }
    }

    /// BT.709 有限范围的纯红（ffmpeg 编出的 Y=63、U=102、V=240）换回接近 (255, 0, 0)；按 BT.601 换会只剩约 0.91 倍、
    /// 蓝通道漏出一点——那正是 Media Foundation 自带转换在标清 BT.709 素材上的读数。
    #[test]
    fn bt709_red_needs_the_bt709_matrix() {
        let right = YuvToRgb::new(YuvMatrix::Bt709, false).pixel(63, 102, 240);
        assert!(
            right[0] >= 253 && right[1] <= 2 && right[2] <= 2,
            "{right:?}"
        );
        let wrong = YuvToRgb::new(YuvMatrix::Bt601, false).pixel(63, 102, 240);
        assert!(wrong[0] < 240, "{wrong:?}");
    }

    #[test]
    fn the_matrix_guess_follows_the_frame_height() {
        assert_eq!(YuvMatrix::guess(180), YuvMatrix::Bt601);
        assert_eq!(YuvMatrix::guess(576), YuvMatrix::Bt601);
        assert_eq!(YuvMatrix::guess(720), YuvMatrix::Bt709);
        assert_eq!(YuvMatrix::guess(2160), YuvMatrix::Bt709);
    }

    /// 2×2 的 NV12（行距大于宽度）：每个 UV 样本给四个像素共用，旋转后的落点与 `scale::rotate_rgba` 一致。
    #[test]
    fn chroma_is_shared_by_each_two_by_two_block_and_rotation_moves_pixels() {
        let luma = [16, 235, 0, 0, 126, 81, 0, 0];
        let chroma = [128, 128, 0, 0];
        let frame = Nv12 {
            luma: &luma,
            luma_pitch: 4,
            chroma: &chroma,
            chroma_pitch: 4,
            width: 2,
            height: 2,
        };
        assert!(frame.fits());
        let convert = YuvToRgb::new(YuvMatrix::Bt709, false);
        let mut upright = Vec::new();
        assert_eq!(nv12_to_rgba(&frame, &convert, 0, &mut upright), (2, 2));
        let grey = |value: u8| [value, value, value, 255];
        let expected: Vec<u8> = [grey(0), grey(255), grey(128), grey(76)].concat();
        assert_eq!(upright, expected);
        let source = crate::RgbaFrame::new(2, 2, upright).unwrap();
        for rotation in [90_u16, 180, 270] {
            let mut rotated = vec![7; 3];
            nv12_to_rgba(&frame, &convert, rotation, &mut rotated);
            assert_eq!(rotated, crate::scale::rotate_rgba(&source, rotation).data);
        }
    }

    /// 色度平面从对齐后的平面高度起算（不是可见高度），孔径偏移同时移动两个平面。
    #[test]
    fn the_chroma_plane_starts_after_the_padded_luma_plane() {
        // 行距 6、平面 4 行（可见 2 行 + 2 行对齐填充），可见区域从 (2, 2) 起 2×2。
        let mut buffer = vec![0_u8; 6 * 4 * 3 / 2];
        buffer[2 * 6 + 2..2 * 6 + 4].copy_from_slice(&[16, 235]);
        buffer[3 * 6 + 2..3 * 6 + 4].copy_from_slice(&[126, 81]);
        // 色度平面第 1 行（可见区域 y=2 对应色度行 1）、第 2–3 字节（x=2 对应 UV 对 1）。
        let chroma_row = 6 * 4 + 6;
        buffer[chroma_row + 2..chroma_row + 4].copy_from_slice(&[128, 128]);
        let visible = Area {
            x: 2,
            y: 2,
            width: 2,
            height: 2,
        };
        let frame = Nv12::in_buffer(&buffer, 6, 4, visible).expect("装得下");
        let mut out = Vec::new();
        nv12_to_rgba(&frame, &YuvToRgb::new(YuvMatrix::Bt709, false), 0, &mut out);
        let grey = |value: u8| [value, value, value, 255];
        assert_eq!(out, [grey(0), grey(255), grey(128), grey(76)].concat());
        // 平面行数不够放下可见区域、奇数偏移、缓冲太短都拒绝。
        assert!(Nv12::in_buffer(&buffer, 6, 3, visible).is_none());
        assert!(Nv12::in_buffer(&buffer, 6, 4, Area { x: 1, ..visible }).is_none());
        assert!(Nv12::in_buffer(&buffer[..30], 6, 4, visible).is_none());
    }

    #[test]
    fn planes_that_are_too_short_do_not_fit() {
        let luma = [0_u8; 7];
        let chroma = [0_u8; 4];
        let frame = Nv12 {
            luma: &luma,
            luma_pitch: 4,
            chroma: &chroma,
            chroma_pitch: 4,
            width: 4,
            height: 2,
        };
        assert!(!frame.fits());
    }
}
