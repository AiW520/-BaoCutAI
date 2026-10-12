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
