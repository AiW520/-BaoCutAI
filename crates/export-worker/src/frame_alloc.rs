//! Windows 上 Render Worker 的全局分配器：释放的大块（[`MIN_BLOCK`] 到 [`MAX_BLOCK`]）先留着，下一次同样大小、同样对齐的
//! 分配原样拿回去用。
//!
//! 成片导出逐帧都要几块整帧大小的缓冲（1080p 的 RGBA 一帧 8.3 MB：解出的画面、实例的源画面、内核画出的层，编码前的
//! NV12），画完一帧就放掉、下一帧再要。Windows 的进程堆把这么大的块直接交给 `VirtualAlloc`、释放时还给系统，所以每一帧
//! 拿到的都是新页：写进去先要缺页、由系统清零，一块 8 MB 两千多次。留着几块，下一帧不再碰系统。glibc 与 macOS 的
//! 分配器本来就复用大块，所以只在 Windows 上装（`main.rs`）；这里的记账在各平台都编译，单元测试也在各平台跑。
//!
//! 留着的块总共不超过 [`CACHE_BYTES`]，单块超过 [`MAX_BLOCK`] 的照常还给系统；按大小与对齐精确匹配，不切分、不合并。
//! 记录放在一把锁里的定长数组上，锁内不分配；拿不到锁（另一个线程正在取放）时不等，这一次直接走系统，免得机器满载、
//! 持锁的线程被抢占时解码、合成与编码的线程排队等它。进程收尾时留着的块不还（Worker 一次导出一个进程）。

use std::alloc::{GlobalAlloc, Layout, System};
use std::sync::Mutex;

/// 小于它的分配直接走系统的堆（堆自己会复用）。
pub const MIN_BLOCK: usize = 1 << 20;
/// 大于它的块不留（4K 的 RGBA 一帧 33 MB）。
pub const MAX_BLOCK: usize = 64 << 20;
/// 留着的块总共的上限。
pub const CACHE_BYTES: usize = 256 << 20;
const SLOTS: usize = 32;

#[derive(Clone, Copy)]
struct Block {
    address: usize,
    size: usize,
    align: usize,
}

struct Blocks {
    slots: [Option<Block>; SLOTS],
    bytes: usize,
}

/// 留着的大块的记账（不碰内存本身）。
pub struct BlockCache {
    blocks: Mutex<Blocks>,
    limit: usize,
}

impl BlockCache {
    pub const fn new(limit: usize) -> BlockCache {
        BlockCache {
            blocks: Mutex::new(Blocks {
                slots: [None; SLOTS],
                bytes: 0,
            }),
            limit,
        }
    }

    /// 这个大小的块归不归它管。
    pub fn handles(layout: Layout) -> bool {
        (MIN_BLOCK..=MAX_BLOCK).contains(&layout.size())
    }

    /// 取一块大小与对齐都相同的留着的块（锁正被占着时不等，当作没有）。
    fn take(&self, layout: Layout) -> Option<*mut u8> {
        let mut blocks = self.blocks.try_lock().ok()?;
        let index = blocks
            .slots
            .iter()
            .position(|slot| slot.is_some_and(|block| block.size == layout.size() && block.align == layout.align()))?;
        let block = blocks.slots[index].take()?;
        blocks.bytes -= block.size;
        Some(block.address as *mut u8)
    }

    /// 留下这一块；满了（块数或总量）或锁正被占着时返回 `false`，由调用方还给系统。
    fn keep(&self, pointer: *mut u8, layout: Layout) -> bool {
        let Ok(mut blocks) = self.blocks.try_lock() else {
            return false;
        };
        if blocks.bytes + layout.size() > self.limit {
            return false;
        }
        let Some(slot) = blocks.slots.iter_mut().find(|slot| slot.is_none()) else {
            return false;
        };
        *slot = Some(Block {
            address: pointer as usize,
            size: layout.size(),
            align: layout.align(),
        });
        blocks.bytes += layout.size();
        true
    }

    #[cfg(test)]
    fn cached_bytes(&self) -> usize {
        self.blocks.lock().unwrap().bytes
    }
}

impl Drop for BlockCache {
    /// 全局分配器不会析构；测试里的实例析构时把留着的块还给系统。
    fn drop(&mut self) {
        let blocks = self.blocks.get_mut().unwrap_or_else(|poisoned| poisoned.into_inner());
        for block in blocks.slots.iter_mut().filter_map(Option::take) {
            // SAFETY: 留着的块都来自 `System` 按记下的布局分配，已从记录里拿掉。
            unsafe { System.dealloc(block.address as *mut u8, Layout::from_size_align_unchecked(block.size, block.align)) };
        }
    }
}

/// 在系统分配器前面挡一层 [`BlockCache`]。
pub struct FrameAlloc {
    cache: BlockCache,
}

impl Default for FrameAlloc {
    fn default() -> FrameAlloc {
        FrameAlloc::new()
    }
}

impl FrameAlloc {
    pub const fn new() -> FrameAlloc {
        FrameAlloc::with_limit(CACHE_BYTES)
    }

    const fn with_limit(limit: usize) -> FrameAlloc {
        FrameAlloc {
            cache: BlockCache::new(limit),
        }
    }
}

// SAFETY: 留着的块都来自 `System` 按同一个布局的分配，只交给布局完全相同的请求，交出去之前从记录里拿掉，
// 不会同时交给两处；归还时按原布局交回 `System`。
unsafe impl GlobalAlloc for FrameAlloc {
    unsafe fn alloc(&self, layout: Layout) -> *mut u8 {
        if BlockCache::handles(layout)
            && let Some(pointer) = self.cache.take(layout)
        {
            return pointer;
        }
        // SAFETY: 原样转给系统分配器，前提由调用方保证。
        unsafe { System.alloc(layout) }
    }

    unsafe fn alloc_zeroed(&self, layout: Layout) -> *mut u8 {
        if BlockCache::handles(layout)
            && let Some(pointer) = self.cache.take(layout)
        {
            // SAFETY: 这一块有 `layout.size()` 个字节，刚从记录里拿出来，只归这次分配。
            unsafe { std::ptr::write_bytes(pointer, 0, layout.size()) };
            return pointer;
        }
        // SAFETY: 同 `alloc`。
        unsafe { System.alloc_zeroed(layout) }
    }

    unsafe fn dealloc(&self, pointer: *mut u8, layout: Layout) {
        if BlockCache::handles(layout) && self.cache.keep(pointer, layout) {
            return;
        }
        // SAFETY: 不归缓存管的块都来自 `System`（缓存交出去的块布局不变，还回来时同样按原布局）。
        unsafe { System.dealloc(pointer, layout) }
    }

    unsafe fn realloc(&self, pointer: *mut u8, layout: Layout, new_size: usize) -> *mut u8 {
        // SAFETY: `GlobalAlloc::realloc` 的约定保证新大小按原对齐构成合法布局。
        let new_layout = unsafe { Layout::from_size_align_unchecked(new_size, layout.align()) };
        if !BlockCache::handles(layout) && !BlockCache::handles(new_layout) {
            // 两头都不归缓存管：交给系统，保留堆的原地伸缩。
            // SAFETY: 这一块来自 `System`，前提由调用方保证。
            return unsafe { System.realloc(pointer, layout, new_size) };
        }
        // SAFETY: 新块按 `new_layout` 分配；拷贝两者中较短的部分后，旧块按原布局归还。
        unsafe {
            let fresh = self.alloc(new_layout);
            if !fresh.is_null() {
                std::ptr::copy_nonoverlapping(pointer, fresh, layout.size().min(new_size));
                self.dealloc(pointer, layout);
            }
            fresh
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    const FRAME: usize = 1920 * 1080 * 4;

    fn layout(size: usize, align: usize) -> Layout {
        Layout::from_size_align(size, align).unwrap()
    }

    /// 放掉的整帧大小的块下一帧原样拿回来；对齐不同的不给。
    #[test]
    fn a_freed_frame_is_reused_only_for_the_same_layout() {
        let allocator = FrameAlloc::new();
        unsafe {
            let first = allocator.alloc(layout(FRAME, 8));
            assert!(!first.is_null());
            allocator.dealloc(first, layout(FRAME, 8));
            assert_eq!(allocator.cache.cached_bytes(), FRAME);

            let other_alignment = allocator.alloc(layout(FRAME, 64));
            assert_ne!(other_alignment, first);
            let again = allocator.alloc(layout(FRAME, 8));
            assert_eq!(again, first);
            assert_eq!(allocator.cache.cached_bytes(), 0);

            allocator.dealloc(again, layout(FRAME, 8));
            allocator.dealloc(other_alignment, layout(FRAME, 64));
        }
    }

    /// 复用的块按 `alloc_zeroed` 要的清零，不带上一帧的内容。
    #[test]
    fn zeroed_allocations_are_zero_after_reuse() {
        let allocator = FrameAlloc::new();
        unsafe {
            let first = allocator.alloc(layout(FRAME, 8));
            std::ptr::write_bytes(first, 0xab, FRAME);
            allocator.dealloc(first, layout(FRAME, 8));
            let zeroed = allocator.alloc_zeroed(layout(FRAME, 8));
            assert_eq!(zeroed, first);
            assert!(std::slice::from_raw_parts(zeroed, FRAME).iter().all(|&byte| byte == 0));
            allocator.dealloc(zeroed, layout(FRAME, 8));
        }
    }

    /// 总量到上限后不再留，太大与太小的块从不留。
    #[test]
    fn the_cache_keeps_within_its_limit_and_size_range() {
        let allocator = FrameAlloc::with_limit(2 * FRAME);
        unsafe {
            let blocks = [0; 3].map(|_| allocator.alloc(layout(FRAME, 8)));
            for block in blocks {
                allocator.dealloc(block, layout(FRAME, 8));
            }
            assert_eq!(allocator.cache.cached_bytes(), 2 * FRAME);

            let small = allocator.alloc(layout(MIN_BLOCK - 1, 8));
            allocator.dealloc(small, layout(MIN_BLOCK - 1, 8));
            let huge = allocator.alloc(layout(MAX_BLOCK + 1, 8));
            allocator.dealloc(huge, layout(MAX_BLOCK + 1, 8));
            assert_eq!(allocator.cache.cached_bytes(), 2 * FRAME);

            for _ in 0..2 {
                let block = allocator.alloc(layout(FRAME, 8));
                System.dealloc(block, layout(FRAME, 8));
            }
            assert_eq!(allocator.cache.cached_bytes(), 0);
        }
    }

    /// `realloc` 跨过缓存的大小区间（小 → 大 → 小）时内容保留。
    #[test]
    fn realloc_keeps_the_contents_across_the_size_range() {
        let allocator = FrameAlloc::new();
        unsafe {
            let small = allocator.alloc(layout(4096, 8));
            for i in 0..4096 {
                *small.add(i) = i as u8;
            }
            let large = allocator.realloc(small, layout(4096, 8), 2 * MIN_BLOCK);
            assert!((0..4096).all(|i| *large.add(i) == i as u8));
            let shrunk = allocator.realloc(large, layout(2 * MIN_BLOCK, 8), 1024);
            assert!((0..1024).all(|i| *shrunk.add(i) == i as u8));
            let grown = allocator.realloc(shrunk, layout(1024, 8), 8192);
            assert!((0..1024).all(|i| *grown.add(i) == i as u8));
            allocator.dealloc(grown, layout(8192, 8));
        }
    }
}
