# caption-scene

动态字幕的持久合同、严格验证和确定性表达式求值。纯 Rust，无文件、网络、系统时钟或 UI 依赖；视频模型、共享渲染和 WASM 使用同一实现。

- 生效格式与当前执行能力：[视频格式 §5.6](../../docs/spec/video-format-spec.md#56-layoutprofile样式与导出)。
- 完整目标：[动态字幕格式设计](../../docs/design/subtitle/dynamic-caption-format-design.md)。
- 可运行样式：[word-pop.json](tests/fixtures/word-pop.json)。
- 验证入口：`parse_style`、`validate_presentation`；动态值入口：`infer`、`evaluate`、`sample_value`。
- 渲染入口：`subtitle_render::scene::ScenePlan`；由 `frame-render` 的新样式分支接入预览与导出。

`cargo test --locked -p caption-scene` 验证类型、单位、函数调用、关键帧、循环与数值语义。实际像素测试在 `subtitle-render/tests/scene.rs`，跨 native/WASM 夹具在 `frame-render/tests/fixtures/parity.json`。

离线生成示例帧：

```sh
cargo run --locked -p subtitle-render --no-default-features --features wasm-safe --example caption_scene -- /tmp/baocut-dynamic-caption-frames
```

该命令使用内存字体和共享 CPU 光栅器，在指定目录写六张 PNG；不需要启动编辑器。
