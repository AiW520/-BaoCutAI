//! DiT 的三轴 RoPE（frame / height / width），复刻 `QwenImage21Rope`：
//! 文本 token 三轴共用一个递增位置；每个图块（改图的条件图与最后的目标图）的 frame 轴取走到这里的位置，
//! height / width 以 0 为中心铺网格（负下标就是真实的负位置，不是回绕），之后位置前进 `max(h, w)`。
//!
//! 旋转方式是相邻两维一组的复数乘法（diffusers `use_real=False`），不是 rotate-half。

/// 每个轴的维度（实数维），配置里是 `[16, 56, 56]`，合计 = head_dim 128。
pub const AXES_DIM: [usize; 3] = [16, 56, 56];
const THETA: f64 = 10000.0;

/// DiT 前缀（目标图之前）里的一段：`len` 个文本 token，或一张 `h × w` 个 latent token 的条件图。
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Segment {
    Text(usize),
    Image { h: usize, w: usize },
}

impl Segment {
    pub fn len(self) -> usize {
        match self {
            Self::Text(n) => n,
            Self::Image { h, w } => h * w,
        }
    }
}

/// 返回 `(cos, sin)`，形状都是 `[seq_len, head_dim/2]`，按行主序平铺。
/// 序列布局：`text_len` 个文本 token，接着 `h * w` 个行主序图像 token。
pub fn dit_rope_tables(text_len: usize, h: usize, w: usize) -> (Vec<f32>, Vec<f32>) {
    joint_rope_tables(&[Segment::Text(text_len)], h, w)
}

/// 前缀各段之后接 `h × w` 的目标图：返回整条序列的 `(cos, sin)`，各 `[seq_len, head_dim/2]`。
pub fn joint_rope_tables(prefix: &[Segment], h: usize, w: usize) -> (Vec<f32>, Vec<f32>) {
    let half: usize = AXES_DIM.iter().sum::<usize>() / 2;
    let n = prefix.iter().map(|s| s.len()).sum::<usize>() + h * w;
    let mut cos = Vec::with_capacity(n * half);
    let mut sin = Vec::with_capacity(n * half);
    let inv: Vec<Vec<f64>> = AXES_DIM
        .iter()
        .map(|&d| (0..d / 2).map(|i| 1.0 / THETA.powf((2 * i) as f64 / d as f64)).collect())
        .collect();
    let mut push = |pos: [i64; 3]| {
        for (axis, freqs) in inv.iter().enumerate() {
            for f in freqs {
                let a = pos[axis] as f64 * f;
                cos.push(a.cos() as f32);
                sin.push(a.sin() as f32);
            }
        }
    };
    fn image(position: &mut i64, h: usize, w: usize, push: &mut dyn FnMut([i64; 3])) {
        let h0 = -((h - h / 2) as i64);
        let w0 = -((w - w / 2) as i64);
        for y in 0..h as i64 {
            for x in 0..w as i64 {
                push([*position, h0 + y, w0 + x]);
            }
        }
        *position += h.max(w) as i64;
    }
    let mut position = 0i64;
    for segment in prefix {
        match *segment {
            Segment::Text(len) => {
                for _ in 0..len {
                    push([position; 3]);
                    position += 1;
                }
            }
            Segment::Image { h, w } => image(&mut position, h, w, &mut push),
        }
    }
    image(&mut position, h, w, &mut push);
    (cos, sin)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn grid_is_centered() {
        let (c, s) = dit_rope_tables(3, 4, 2);
        assert_eq!(c.len(), (3 + 8) * 64);
        // 文本第 0 个 token 位置 0：cos=1、sin=0
        assert!(c[..64].iter().all(|v| (*v - 1.0).abs() < 1e-6));
        assert!(s[..64].iter().all(|v| v.abs() < 1e-6));
        // 第一个图像 token：height = -2、width = -1；height 轴首个频率为 1 => sin(-2)
        let row = 3 * 64;
        assert!((s[row + 8] - (-2.0f32).sin()).abs() < 1e-6);
        assert!((s[row + 8 + 28] - (-1.0f32).sin()).abs() < 1e-6);
        // frame 轴冻结在 text_len
        assert!((s[row] - 3.0f32.sin()).abs() < 1e-6);
    }

    /// 改图：条件图块的 frame 是走到它时的位置，之后位置前进 max(h, w)；目标图排在最后。
    #[test]
    fn condition_blocks_advance_the_shared_position() {
        let prefix = [Segment::Text(2), Segment::Image { h: 2, w: 4 }, Segment::Text(1)];
        let (_, s) = joint_rope_tables(&prefix, 2, 2);
        assert_eq!(s.len(), (2 + 8 + 1 + 4) * 64);
        let height = |row: usize| s[row * 64 + 8];
        let width = |row: usize| s[row * 64 + 8 + 28];
        assert!((s[64] - 1.0f32.sin()).abs() < 1e-6);
        // 条件图：frame 2，第一个 token 在 (h, w) = (-1, -2)，最后一个在 (0, 1)
        assert!((s[2 * 64] - 2.0f32.sin()).abs() < 1e-6);
        assert!((height(2) - (-1.0f32).sin()).abs() < 1e-6);
        assert!((width(2) - (-2.0f32).sin()).abs() < 1e-6);
        assert!(height(9).abs() < 1e-6);
        assert!((width(9) - 1.0f32.sin()).abs() < 1e-6);
        // 之后的文本在 2 + max(2, 4) = 6，目标图 frame 7
        assert!((s[10 * 64] - 6.0f32.sin()).abs() < 1e-6);
        assert!((s[11 * 64] - 7.0f32.sin()).abs() < 1e-6);
        // 只有文本时与文生图的表相同
        assert_eq!(joint_rope_tables(&[Segment::Text(3)], 4, 2), dit_rope_tables(3, 4, 2));
    }
}
