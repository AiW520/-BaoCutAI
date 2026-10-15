# docs/design/docs/ — 会话里的协作文档

在会话里让智能体写一份协作文档（报告、提案、计划、信件、手册……；界面上叫「协作文档」，与 Space 里的文档类型区分），在功能区用文档编辑器直接编辑、评论，并把评论或写给智能体的请求发回会话。编辑器是移植来的 Claude Docs 前端，服务端（文档存储、door 协议、mux WebSocket）与智能体的连接器由 `packages/docs` 重新实现（[架构设计 §3.5](../../architecture/architecture-design.md#35-工具目录)、[§4.8](../../architecture/architecture-design.md#48-对外服务)）。

| 文件 | 内容与状态 |
| --- | --- |
| [`docs-design.md`](docs-design.md) | **已实现（2026-10-14）**：五项决定（运行时入库、同源托管、智能体只经连接器、不做图表与 widget、评论留在文档里）；文档目录的磁盘格式；运行时的放置与 BaoCut 改动；`packages/docs` 的存储、door 与 mux；Runtime 的 `docs.open` 与路由（网关与 Web 服务）；skill `docs` 与 `docs_*` 工具；线程卡片与 Space；评论与请求发给智能体的流程与协议；要修订的规范与验证 |

实现在 `packages/docs`（存储、正文模型与操作、door 与 mux 服务、智能体连接器、编辑器页面的宿主 shim）、`packages/docs-runtime`（编辑器运行时源码）与 `apps/docs-editor`（编辑器页面的构建），借鉴自 Claude Docs 的实现。
