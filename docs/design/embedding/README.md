# docs/design/embedding/ — 本地语义能力（EmbeddingGemma 2）

把 EmbeddingGemma 2 作为本机语义模型接进 BaoCut：先做对检索，再用同一套索引改善写作、章节、润色、翻译、剪口播与智能体取材。机制上复用 Runtime、Space 内容索引（[架构设计 §5.11](../../architecture/architecture-design.md#511-跨视频的内容检索)）、模型管理（[§6.3](../../architecture/architecture-design.md#63-本地模型管理)）、Model Worker 与 Jobs。

| 文件 | 内容与状态 |
| --- | --- |
| [`embedding-retrieval-spec-v0.1.md`](embedding-retrieval-spec-v0.1.md) | **检索集成方案 v0.1（2026-10-12，未实现）**：模型后端与平台矩阵、向量配置与兼容性身份、分片、三种索引语义、派生库、世代与增量、混合检索与融合、`space.searchV2`、锚点定位与编辑安全、补充画面与短视频、测试与 PR 拆分 |
| [`embedding-integration-design.md`](embedding-integration-design.md) | **创作辅助集成设计（2026-10-12，未实现）**：在 v0.1 之上，按用户时刻写的产品设计（找片段、写作选材与出处、关键帧插图、章节、术语、翻译记忆、重录、短视频、智能体取材、Space 与素材、状态与降级、多端），以及技术设计（Runtime 内部 `SemanticContext`、各消费者接入点、写作流水线、匹配与候选算法、降级矩阵、实施批次） |

两份都是方案稿：接口、默认值与指标是待校准的目标合同；用户可见界面在实施前仍须原型先行。
