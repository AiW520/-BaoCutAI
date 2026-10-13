/// 会让暂停态画面失效的来源。枚举只服务诊断；调度判据仍是一个 dirty 位加
/// `next_change`，不为每个表面复制状态机。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum DirtyReason {
    Data,
    Style,
    Asset,
    VideoFrame,
    Resize,
    Gesture,
    Seek,
}

/// `next_change` 优先、dirty 兜底的共享调度辅助。没有 dirty、又没到切换点时
/// `should_render` 恒为 false，因此暂停态不会自发形成帧泵。
#[derive(Debug, Clone, Default)]
pub struct FrameScheduler {
    dirty: bool,
    next_change: Option<f64>,
    active_until: Option<f64>,
    last_reason: Option<DirtyReason>,
}

impl FrameScheduler {
    pub fn mark_dirty(&mut self, reason: DirtyReason) {
        self.dirty = true;
        self.last_reason = Some(reason);
    }

    pub fn set_next_change(&mut self, next_change: Option<f64>) {
        self.next_change = next_change.filter(|value| value.is_finite());
    }

    pub fn set_active_until(&mut self, active_until: Option<f64>) {
        self.active_until = active_until.filter(|value| value.is_finite());
    }

    pub fn should_render(&self, time: f64) -> bool {
        self.dirty
            || self.active_until.is_some_and(|end| time.is_finite() && time + 1e-9 < end)
            || self.next_change.is_some_and(|next| time.is_finite() && time + 1e-9 >= next)
    }

    pub fn did_render(&mut self, next_change: Option<f64>) {
        self.did_render_scene(next_change, None);
    }

    pub fn did_render_scene(&mut self, next_change: Option<f64>, active_until: Option<f64>) {
        self.dirty = false;
        self.last_reason = None;
        self.set_next_change(next_change);
        self.set_active_until(active_until);
    }

    pub fn last_reason(&self) -> Option<DirtyReason> {
        self.last_reason
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn paused_static_scene_has_no_self_sustaining_frame_pump() {
        let mut scheduler = FrameScheduler::default();
        assert!(!scheduler.should_render(10.0));
        scheduler.mark_dirty(DirtyReason::Seek);
        assert!(scheduler.should_render(10.0));
        scheduler.did_render(None);
        assert!(!scheduler.should_render(10.0));
        assert!(!scheduler.should_render(20.0));
    }

    #[test]
    fn next_change_wakes_exactly_at_the_scheduled_boundary() {
        let mut scheduler = FrameScheduler::default();
        scheduler.set_next_change(Some(2.5));
        assert!(!scheduler.should_render(2.499));
        assert!(scheduler.should_render(2.5));
        scheduler.did_render(Some(4.0));
        assert!(!scheduler.should_render(3.0));
        assert!(scheduler.should_render(4.0));
    }

    #[test]
    fn active_motion_pumps_only_until_its_scene_boundary() {
        let mut scheduler = FrameScheduler::default();
        scheduler.did_render_scene(Some(1.5), Some(1.5));
        assert!(scheduler.should_render(1.0));
        assert!(scheduler.should_render(1.499));
        assert!(scheduler.should_render(1.5));
        scheduler.did_render_scene(None, None);
        assert!(!scheduler.should_render(1.501));
    }
}
