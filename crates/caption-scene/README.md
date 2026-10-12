# caption-scene

动态字幕的持久合同、严格验证和确定性表达式求值，包含版本锁定的 PNG 资源与有序文字涂装。纯 Rust，无文件、网络、系统时钟或 UI 依赖；视频模型、共享渲染和 WASM 使用同一实现。

- 生效格式与当前执行能力：[视频格式 §5.6](../../docs/spec/video-format-spec.md#56-layoutprofile样式与导出)。
- 完整目标：[动态字幕格式设计](../../docs/design/subtitle/dynamic-caption-format-design.md)。
- 可运行样式：[word-pop.json](tests/fixtures/word-pop.json)、[image-paint.json](tests/fixtures/image-paint.json)。
- 验证入口：`parse_style`、`validate_presentation`；动态值入口：`infer`、`evaluate`、`sample_value`。
- 渲染入口：`subtitle_render::scene::ScenePlan`；由 `frame-render` 的新样式分支接入预览与导出。

`cargo test --locked -p caption-scene` 验证类型、单位、函数调用、关键帧、循环与数值语义。实际像素测试在 `subtitle-render/tests/scene.rs`，跨 native/WASM 夹具在 `frame-render/tests/fixtures/parity.json`。

离线生成示例帧：

```sh
cargo run --locked -p subtitle-render --no-default-features --features wasm-safe --example caption_scene -- /tmp/baocut-dynamic-caption-frames
```

该命令使用内存字体和共享 CPU 光栅器，在指定目录写六张 PNG；不需要启动编辑器。

在示例命令末尾添加 `--rich`，生成包含按词重复图片、线性渐变和描边的字幕帧。图片字节来自随示例维护的 PNG 夹具，并按场景声明的摘要校验。

`--feedback` 使用 [reflow-feedback.json](tests/fixtures/reflow-feedback.json)，演示逐采样行宽/字号、预乘模糊与有界历史拖尾。基础分页和时间保持固定，所有历史画面在请求时刻重新求值；额外写入深色背景的 preview PNG，便于检查透明边缘。

表达式 `cubic-bezier(progress, x1, y1, x2, y2)` 与关键帧共用 motion 曲线求解器，允许将语义时钟、单元时长和参数组合成连续曲线；能力名为 `caption-bezier-expression/1`。

`caption-text-context/1` 提供整段/分页字素索引、cue/page 时钟和 `sqrt`；grapheme 选择器可显式包含空白，用于连续光标与错开显现。示例见 [text-context.json](tests/fixtures/text-context.json)。

`caption-ink-context/1` 提供单元填充墨迹框 `layout.inkX/inkY/inkWidth/inkHeight` 与所属行的 `layout.lineInkY/lineInkHeight`；光标高度与底框位置可按真实字形求值，旧行框/advance 不变。空白继承行的视觉高度，重排同步更新；不包含描边、材质或动画变换。示例见 [ink-context.json](tests/fixtures/ink-context.json)。

`caption-unit-context/1` 提供稳定的 `unit.pageIndex/pageCount` 与所属行的 `time.lineElapsedSeconds/lineDurationSeconds`；行朗读状态遵循词时间及 gap/tail 策略。页序号在逐采样重排后保持不变，repeat 装饰继承所绑定单元，见 [unit-context.json](tests/fixtures/unit-context.json)。

`caption-wave-displace/1` 提供有界 cue 级正弦波纹位移，幅度/波长/相位支持动态值；以画布像素中心为基准，预乘双线性采样保留透明边界，不依赖播放历史。示例见 [wave-displace.json](tests/fixtures/wave-displace.json)。

`caption-soft-band/1` 提供单文字子树的画布归一化柔边遮罩，参数绑定明确文字节点的当前页上下文；同时提供页末词的输入时间及可用标记。静态/逐采样布局和反馈历史都使用共同的页解析路径。示例见 [soft-band.json](tests/fixtures/soft-band.json)。

`caption-word-line-layout/1` 提供循环词行配额和一次性的末页调整；行、页成员与时间冻结，超宽按 error/visible 处理。显示空白可折叠，源文本字素索引及词字节范围保持不变；逐采样布局重用同一shape映射。示例见 [word-line-layout.json](tests/fixtures/word-line-layout.json)。

`caption-cue-word-context/1` 提供 cue 首两词原始输入边界、真实绑定词标记与跨页下一词开始时间；保留负值、零值和真实 gap，不延长词结束，也不把 estimated 时序冒充输入。所有边界配有可用标记，见 [cue-word-context.json](tests/fixtures/cue-word-context.json)。

`caption-first-page-context/1` 提供固定第一页与当前页的真实首词/末词/下一原词输入边界及可用标记，按文字节点绑定继承，区别真实词结束与延长的页面显示窗口。见 [first-page-context.json](tests/fixtures/first-page-context.json)。

`caption-cue-unit-context/1` 显式启用整段词/行索引，以及由真实 word tags 驱动的静态词选集索引；碎片跨页保持源词身份，per-sample 全局行数按同一时刻重排所有页并计入预算。未绑定有明确 bool 标记，旧局部索引不变，见 [cue-unit-context.json](tests/fixtures/cue-unit-context.json)。

`caption-gaussian-axis/1` 与 `caption-glow-cascade/1` 提供单 Text 上下文的独立 RGBA 分量滤波：高斯采样按输入纹理 UV、多尺度 pass 按原画布有理比例定尺寸，明确边界及逐 pass gamma/量化。级联保留各尺度图，按声明的 screen 或 source-over-glow 合成；允许 RGB > alpha，须按视频格式 §5.6 使用关联输出。有效区域包含零 alpha 发光，采样与内存预算超限会拒绝。示例见 [gaussian-axis.json](tests/fixtures/gaussian-axis.json)、[glow-cascade.json](tests/fixtures/glow-cascade.json)。
