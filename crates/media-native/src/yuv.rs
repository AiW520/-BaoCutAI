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
        if visible.x % 2 != 0 || visible.y % 2 != 0 {
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
pub(crate) fn nv12_to_rgba(
    frame: &Nv12<'_>,
    convert: &YuvToRgb,
    rotation: u16,
    out: &mut Vec<u8>,
) -> (usize, usize) {
    debug_assert!(frame.fits());
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
            // 顺时针旋转 `rotation` 度后，源 (x, y) 落到的目标坐标。
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

#[cfg(test)]
mod tests {
    use super::*;

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
