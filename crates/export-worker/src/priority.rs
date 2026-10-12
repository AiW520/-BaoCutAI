//! 导出的调度优先级（架构设计 §9.11「调度优先级」）：导出是用户看着进度条在等的事，机器忙（编译、批处理）时
//! 不该跟后台任务平分 CPU，也不该抢界面。`main` 一开头调用一次；尽力而为，失败只记日志，导出照常跑。
//!
//! - macOS：Runtime 拉起的子进程没有任务角色（`TASK_UNSPECIFIED`，角色不从父进程继承），内核把这种进程的线程 QoS 一律压在
//!   默认档的调度优先级（31），只设线程 QoS 不起作用。先把进程声明为普通应用（`TASK_DEFAULT_APPLICATION`），再把调用线程
//!   （合成在主线程）设为 user-initiated（优先级 37）：高于默认档的编译与批处理，低于界面线程（user-interactive）。解码、编码
//!   线程由 `media-core` 跟随创建者的 QoS；ffmpeg 兜底的子进程不受影响。
//! - Windows：关掉本进程的执行速度节流（EcoQoS）。系统按窗口可见与前台状态给进程降 QoS，没有窗口的 Worker 可能被排到能效核、
//!   降频运行；关掉后按正常 QoS 调度。进程级设置，覆盖全部线程（含 Media Foundation 的线程），与显卡厂商无关；不提高优先级类，
//!   不跟前台抢。
//! - 其他平台不做（保守实现）。
//!
//! 环境变量 `BAOCUT_EXPORT_PRIORITY=0` 不做这些调整（排查与对比用）。

/// 关掉调度优先级调整的环境变量（值为 `0` 时关）。
pub const PRIORITY_ENV: &str = "BAOCUT_EXPORT_PRIORITY";

fn enabled_by(value: Option<&str>) -> bool {
    value.is_none_or(|v| v.trim() != "0")
}

/// 把导出进程提到用户在等的优先级。
pub fn raise_for_export() {
    if enabled_by(std::env::var(PRIORITY_ENV).ok().as_deref()) {
        platform::raise();
    }
}

#[cfg(target_os = "macos")]
mod platform {
    /// `TASK_CATEGORY_POLICY` 与 `TASK_DEFAULT_APPLICATION`（`<mach/task_policy.h>`）。
    const TASK_CATEGORY_POLICY: u32 = 1;
    pub(super) const TASK_DEFAULT_APPLICATION: i32 = 7;
    /// `QOS_CLASS_USER_INITIATED`（`<sys/qos.h>`）。
    pub(super) const QOS_CLASS_USER_INITIATED: u32 = 0x19;

    unsafe extern "C" {
        fn mach_task_self() -> u32;
        fn task_policy_set(task: u32, flavor: u32, info: *const i32, count: u32) -> i32;
        fn pthread_set_qos_class_self_np(class: u32, relative_priority: i32) -> i32;
        #[cfg(test)]
        pub(super) fn task_policy_get(task: u32, flavor: u32, info: *mut i32, count: *mut u32, get_default: *mut i32) -> i32;
        #[cfg(test)]
        pub(super) fn qos_class_self() -> u32;
    }

    pub fn raise() {
        let role = TASK_DEFAULT_APPLICATION;
        // SAFETY: 只改本进程的任务角色；`task_category_policy` 是一个 i32，个数 1。
        let code = unsafe { task_policy_set(mach_task_self(), TASK_CATEGORY_POLICY, &role, 1) };
        if code != 0 {
            eprintln!("[export-worker] cannot set the task role to default application (kern_return {code})");
        }
        // SAFETY: 只改调用线程自己的 QoS，参数是合法的类别与相对优先级 0。
        let code = unsafe { pthread_set_qos_class_self_np(QOS_CLASS_USER_INITIATED, 0) };
        if code != 0 {
            eprintln!("[export-worker] cannot set the render thread QoS to user-initiated (error {code})");
        }
    }

    #[cfg(test)]
    pub(super) fn role() -> i32 {
        let (mut role, mut count, mut get_default) = (-1, 1, 0);
        // SAFETY: 查询本进程的任务角色；输出指针都指向有效的局部变量。
        let code = unsafe { task_policy_get(mach_task_self(), TASK_CATEGORY_POLICY, &mut role, &mut count, &mut get_default) };
        assert_eq!(code, 0);
        role
    }
}

#[cfg(windows)]
mod platform {
    use std::ffi::c_void;

    /// `PROCESS_INFORMATION_CLASS::ProcessPowerThrottling`。
    const PROCESS_POWER_THROTTLING: i32 = 4;
    const PROCESS_POWER_THROTTLING_CURRENT_VERSION: u32 = 1;
    const PROCESS_POWER_THROTTLING_EXECUTION_SPEED: u32 = 0x1;

    /// `PROCESS_POWER_THROTTLING_STATE`。
    #[repr(C)]
    struct PowerThrottlingState {
        version: u32,
        control_mask: u32,
        state_mask: u32,
    }

    #[link(name = "kernel32")]
    unsafe extern "system" {
        fn GetCurrentProcess() -> *mut c_void;
        fn SetProcessInformation(process: *mut c_void, class: i32, information: *const c_void, size: u32) -> i32;
    }

    pub fn raise() {
        // 选中执行速度这一项（ControlMask），状态清零（StateMask）：本进程不做执行速度节流。
        let state = PowerThrottlingState {
            version: PROCESS_POWER_THROTTLING_CURRENT_VERSION,
            control_mask: PROCESS_POWER_THROTTLING_EXECUTION_SPEED,
            state_mask: 0,
        };
        // SAFETY: GetCurrentProcess 返回本进程的伪句柄（不需要关闭）；`state` 在调用期间有效，大小与结构一致。
        let done = unsafe {
            SetProcessInformation(
                GetCurrentProcess(),
                PROCESS_POWER_THROTTLING,
                (&state as *const PowerThrottlingState).cast(),
                std::mem::size_of::<PowerThrottlingState>() as u32,
            )
        };
        if done == 0 {
            let error = std::io::Error::last_os_error();
            eprintln!("[export-worker] cannot opt out of power throttling ({error})");
        }
    }
}

#[cfg(not(any(target_os = "macos", windows)))]
mod platform {
    pub fn raise() {}
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn only_zero_turns_the_adjustment_off() {
        assert!(enabled_by(None));
        assert!(enabled_by(Some("1")));
        assert!(enabled_by(Some("")));
        assert!(!enabled_by(Some("0")));
        assert!(!enabled_by(Some(" 0 ")));
    }

    #[cfg(target_os = "macos")]
    #[test]
    fn declares_an_application_role_and_raises_the_calling_thread() {
        use super::platform::*;

        let class = std::thread::spawn(|| {
            raise();
            // SAFETY: 只读调用线程自己的 QoS。
            unsafe { qos_class_self() }
        })
        .join()
        .unwrap();
        assert_eq!(class, QOS_CLASS_USER_INITIATED);
        assert_eq!(role(), TASK_DEFAULT_APPLICATION);
    }
}
