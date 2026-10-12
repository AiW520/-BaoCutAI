//! 解码与编码线程的调度优先级：新线程跟随创建它的线程（架构设计 §9.11「调度优先级」）。
//!
//! macOS 上 `std::thread::spawn` 起的线程不继承创建者的 QoS，一律从默认档起步。导出把合成线程提到 user-initiated 后，
//! 解码与编码线程若还停在默认档，机器一忙就先被抢走，整条流水线跟着慢。这里在创建者线程上读出它的 QoS，新线程一起来就设成
//! 同一档。其他平台照常创建：Windows 的导出优先级是进程级设置，新线程自然覆盖。

use std::thread::JoinHandle;

/// 起一条线程，macOS 上沿用调用线程的 QoS。
pub(crate) fn spawn<F, T>(body: F) -> JoinHandle<T>
where
    F: FnOnce() -> T + Send + 'static,
    T: Send + 'static,
{
    #[cfg(target_os = "macos")]
    {
        let class = qos::current();
        std::thread::spawn(move || {
            qos::adopt(class);
            body()
        })
    }
    #[cfg(not(target_os = "macos"))]
    std::thread::spawn(body)
}

#[cfg(target_os = "macos")]
mod qos {
    /// `QOS_CLASS_UNSPECIFIED`：调用线程没有 QoS，新线程也不设。
    const UNSPECIFIED: u32 = 0x00;

    unsafe extern "C" {
        fn qos_class_self() -> u32;
        fn pthread_set_qos_class_self_np(class: u32, relative_priority: i32) -> i32;
    }

    /// 调用线程当前的 QoS 类别。
    pub fn current() -> u32 {
        // SAFETY: 只读调用线程自己的 QoS。
        unsafe { qos_class_self() }
    }

    /// 把调用线程设成 `class`。失败只记日志：优先级是尽力而为，不影响解码与编码。
    pub fn adopt(class: u32) {
        if class == UNSPECIFIED {
            return;
        }
        // SAFETY: 只改调用线程自己的 QoS；`class` 是另一条线程刚读出的合法类别，相对优先级 0。
        let code = unsafe { pthread_set_qos_class_self_np(class, 0) };
        if code != 0 {
            eprintln!("[media-core] cannot set the media thread QoS to {class:#x} (error {code})");
        }
    }

    #[cfg(test)]
    mod tests {
        use super::*;

        const USER_INITIATED: u32 = 0x19;
        const UTILITY: u32 = 0x11;

        #[test]
        fn spawned_threads_follow_the_creator_qos() {
            for class in [USER_INITIATED, UTILITY] {
                let inside = std::thread::spawn(move || {
                    adopt(class);
                    crate::thread::spawn(current).join().unwrap()
                })
                .join()
                .unwrap();
                assert_eq!(inside, class);
            }
        }
    }
}
