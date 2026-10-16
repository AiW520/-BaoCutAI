//! 语音区间 → 识别段：超过 [`MAX_SPAN`] 的区间在最后 [`CUT_SEARCH`] 秒里能量最低的 60 ms 窗口处切开，
//! 每段至少 [`MIN_PIECE`]；之后两侧各补 [`PAD`]（不越过相邻区间）。

use super::vad_stream::VadConfig;

/// 相对解码起点的语音区间（f64 秒）。
#[derive(Debug, Clone, Copy, PartialEq)]
pub struct SpeechSpan {
    pub start: f64,
    pub end: f64,
}

impl SpeechSpan {
    pub fn duration(self) -> f64 {
        self.end - self.start
    }
}

pub const VAD_CONFIG: VadConfig = VadConfig {
    onset: 0.5,
    offset: 0.35,
    min_speech_duration: 0.25,
    min_silence_duration: 0.5,
    window_duration: 0.032,
    step_ratio: 1.0,
};
pub const MAX_SPAN: f64 = 14.5;
pub const PAD: f64 = 0.15;
pub const MIN_PIECE: f64 = 2.0;
pub const CUT_SEARCH: f64 = 4.0;

pub fn split(spans: &[SpeechSpan], samples: &[f32], sample_rate: f64) -> Vec<SpeechSpan> {
    let mut out = Vec::new();
    for span in spans.iter().copied() {
        if span.duration() <= MAX_SPAN {
            out.push(span);
            continue;
        }
        if samples.is_empty() {
            out.extend(equal_split(span));
            continue;
        }

        let mut start = span.start;
        while span.end - start > MAX_SPAN {
            let hi = (start + MAX_SPAN).min(span.end - MIN_PIECE);
            let lo = (start + MIN_PIECE).max(hi - CUT_SEARCH);
            let cut = quietest_cut(samples, lo, hi, sample_rate);
            out.push(SpeechSpan { start, end: cut });
            start = cut;
        }
        out.push(SpeechSpan { start, end: span.end });
    }
    out
}

pub fn equal_split(span: SpeechSpan) -> Vec<SpeechSpan> {
    let count = (span.duration() / MAX_SPAN).ceil() as usize;
    let step = span.duration() / count as f64;
    (0..count)
        .map(|index| SpeechSpan {
            start: span.start + index as f64 * step,
            end: if index + 1 == count {
                span.end
            } else {
                span.start + (index + 1) as f64 * step
            },
        })
        .collect()
}

pub fn quietest_cut(samples: &[f32], lo: f64, hi: f64, sample_rate: f64) -> f64 {
    let window = (0.06 * sample_rate) as usize;
    let hop = ((0.01 * sample_rate) as usize).max(1);
    let first = ((lo * sample_rate) as usize).min(samples.len());
    let last = ((hi * sample_rate) as usize).min(samples.len());
    if window == 0 || last.saturating_sub(first) <= window {
        return (lo + hi) / 2.0;
    }

    let mut prefix = vec![0.0f64; last - first + 1];
    for index in first..last {
        let value = samples[index] as f64;
        prefix[index - first + 1] = prefix[index - first] + value * value;
    }

    let mut best = f64::INFINITY;
    let mut cut = (lo + hi) / 2.0;
    let mut offset = 0;
    while offset + window <= last - first {
        let energy = prefix[offset + window] - prefix[offset];
        if energy < best {
            best = energy;
            cut = (first + offset + window / 2) as f64 / sample_rate;
        }
        offset += hop;
    }
    cut
}

pub fn padded(spans: &[SpeechSpan], duration: f64) -> Vec<SpeechSpan> {
    spans
        .iter()
        .copied()
        .enumerate()
        .map(|(index, span)| {
            let lo = if index == 0 { 0.0 } else { spans[index - 1].end };
            let hi = if index + 1 == spans.len() {
                duration
            } else {
                spans[index + 1].start
            };
            SpeechSpan {
                start: lo.max(0.0f64.max(span.start - PAD)),
                end: hi.min(duration.min(span.end + PAD)),
            }
        })
        .collect()
}

/// 输出合同要求段不重叠（`spans` 已按起点排好）。与前一段部分重叠的（补边之后的相邻段：前一段的补边上限是后一段
/// 补边前的起点，反之亦然；MOSS 里抢话的下一位）在重叠区的中点分开，中点落在两段补边前的静音之间，不会让任何一段变空。
///
/// 整个落在前一段里的（MOSS 在多人同时说话时给出的插话）从中点分会倒挂：改为按原时长从包住它的那段的尾巴上分出来，
/// 几段插话合起来至多分走那段的一半（超出时按比例缩短），时间上排在那段之后、下一段之前。其余段的分法与没有插话时
/// 相同。返回这样挪过的段的下标。
pub fn resolve_overlaps(spans: &mut [SpeechSpan]) -> Vec<usize> {
    // (包住它的段, 插话)，按起点顺序。
    let mut nested: Vec<(usize, usize)> = Vec::new();
    let mut previous: Option<usize> = None;
    for index in 0..spans.len() {
        let Some(outer) = previous else {
            previous = Some(index);
            continue;
        };
        // 下一段到来之前，前一段的终点还是原来的终点。
        if spans[index].end < spans[outer].end {
            nested.push((outer, index));
            continue;
        }
        if spans[index].start < spans[outer].end {
            let middle = (spans[index].start + spans[outer].end) / 2.0;
            spans[outer].end = middle;
            spans[index].start = middle;
        }
        previous = Some(index);
    }

    for group in nested.chunk_by(|a, b| a.0 == b.0) {
        let outer = group[0].0;
        let slot = spans[outer];
        let total: f64 = group.iter().map(|&(_, index)| spans[index].duration()).sum();
        let room = total.min(slot.duration() / 2.0);
        let scale = if total > 0.0 { room / total } else { 0.0 };
        let mut cursor = slot.end - room;
        spans[outer].end = cursor;
        for (position, &(_, index)) in group.iter().enumerate() {
            let end = match position + 1 == group.len() {
                true => slot.end,
                false => (cursor + spans[index].duration() * scale).min(slot.end),
            };
            spans[index] = SpeechSpan { start: cursor, end };
            cursor = end;
        }
    }
    nested.into_iter().map(|(_, index)| index).collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    fn span(start: f64, end: f64) -> SpeechSpan {
        SpeechSpan { start, end }
    }

    #[test]
    fn vad_config_matches_the_pipeline_tuning() {
        assert_eq!((VAD_CONFIG.onset, VAD_CONFIG.offset), (0.5, 0.35));
        assert_eq!((VAD_CONFIG.min_speech_duration, VAD_CONFIG.min_silence_duration), (0.25, 0.5));
        assert_eq!((MAX_SPAN, MIN_PIECE, PAD, CUT_SEARCH), (14.5, 2.0, 0.15, 4.0));
    }

    #[test]
    fn long_spans_are_cut_at_the_quietest_window() {
        let rate = 16_000.0;
        let mut samples = vec![0.5_f32; (40.0 * rate) as usize];
        // 12.0–12.1 s 是静音：第一刀应当落在这里（搜索区间 [10.5, 14.5]）。
        for sample in &mut samples[(12.0 * rate) as usize..(12.1 * rate) as usize] {
            *sample = 0.0;
        }
        let pieces = split(&[span(0.0, 40.0)], &samples, rate);
        assert!(pieces.len() >= 3);
        assert!((pieces[0].end - 12.05).abs() < 0.03, "{pieces:?}");
        for pair in pieces.windows(2) {
            assert_eq!(pair[0].end, pair[1].start);
        }
        assert!(
            pieces
                .iter()
                .all(|piece| piece.duration() <= MAX_SPAN + 1e-9 && piece.duration() >= MIN_PIECE - 1e-9)
        );
        assert_eq!(pieces.last().unwrap().end, 40.0);
    }

    #[test]
    fn short_spans_pass_through_and_equal_split_without_samples() {
        assert_eq!(split(&[span(1.0, 5.0)], &[], 16_000.0), vec![span(1.0, 5.0)]);
        let equal = split(&[span(0.0, 30.0)], &[], 16_000.0);
        assert_eq!(equal.len(), 3);
        assert!((equal[1].start - 10.0).abs() < 1e-9);
    }

    #[test]
    fn padding_stays_inside_the_media_and_overlaps_are_resolved() {
        let mut padded = padded(&[span(0.05, 1.0), span(1.1, 2.0), span(3.0, 3.95)], 4.0);
        assert_eq!(padded[0].start, 0.0);
        assert_eq!(padded[2].end, 4.0);
        assert!(padded[1].start < padded[0].end, "补边后相邻段重叠：{padded:?}");
        resolve_overlaps(&mut padded);
        for pair in padded.windows(2) {
            assert!(pair[0].end <= pair[1].start);
            assert!(pair[0].start < pair[0].end);
        }
        assert!((padded[0].end - 1.05).abs() < 1e-9);
        assert_eq!(padded[1].end, 2.15);
        assert_eq!(padded[2].start, 2.85);
    }

    fn assert_disjoint(spans: &[SpeechSpan]) {
        for (index, span) in spans.iter().enumerate() {
            assert!(span.start < span.end, "第 {index} 段为空或倒挂：{spans:?}");
        }
        for pair in spans.windows(2) {
            assert!(pair[0].end <= pair[1].start, "相邻段重叠：{spans:?}");
        }
    }

    #[test]
    fn rows_inside_an_earlier_row_go_to_its_tail() {
        // 长的一段里插了两句话（多人会议）。原来只比相邻两段：插话被中点分倒挂、丢掉之后，第三段与第一段仍然重叠。
        let mut spans = [span(100.0, 110.0), span(101.0, 102.0), span(103.0, 104.0)];
        assert_eq!(resolve_overlaps(&mut spans), [1, 2]);
        assert_eq!(spans, [span(100.0, 108.0), span(108.0, 109.0), span(109.0, 110.0)]);

        // 下一位在长段结束前开口：长段与下一段照常在重叠区中点分开，插话从长段剩下的尾巴上分出来。
        let mut spans = [span(0.0, 10.0), span(2.0, 3.0), span(9.5, 15.0)];
        assert_eq!(resolve_overlaps(&mut spans), [1]);
        assert_eq!(spans, [span(0.0, 8.75), span(8.75, 9.75), span(9.75, 15.0)]);
        let mut spans = [span(0.0, 10.0), span(2.0, 3.0), span(5.0, 12.0)];
        assert_eq!(resolve_overlaps(&mut spans), [1]);
        assert_eq!(spans, [span(0.0, 6.5), span(6.5, 7.5), span(7.5, 12.0)]);

        // 插话合起来比那段的一半长：按比例缩短，那段留一半。嵌套的插话都挂在最外面那段上。
        let mut spans = [span(0.0, 20.0), span(1.0, 10.0), span(2.0, 3.0), span(4.0, 25.0)];
        assert_eq!(resolve_overlaps(&mut spans), [1, 2]);
        assert_disjoint(&spans);
        assert_eq!((spans[0], spans[2].end, spans[3]), (span(0.0, 6.0), 12.0, span(12.0, 25.0)));
        assert!((spans[1].duration() - 5.4).abs() < 1e-9 && (spans[2].duration() - 0.6).abs() < 1e-9);
        let mut spans = [span(0.0, 4.0), span(0.5, 3.5)];
        assert_eq!(resolve_overlaps(&mut spans), [1]);
        assert_eq!(spans, [span(0.0, 2.0), span(2.0, 4.0)]);
    }

    #[test]
    fn rows_ending_with_the_row_before_split_at_the_middle() {
        // 起止完全相同的两行（分块边界上重复）不算插话：照常对半分开。
        let mut spans = [span(100.0, 105.0), span(100.0, 105.0), span(106.0, 107.0)];
        assert!(resolve_overlaps(&mut spans).is_empty());
        assert_eq!(spans, [span(100.0, 102.5), span(102.5, 105.0), span(106.0, 107.0)]);
    }
}
