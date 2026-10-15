import type { FileTarget } from './methods.ts';

/**
 * 会话里的文档（docs/design/docs）：文档是会话工作目录或项目目录里的一个目录（`doc.json` 加每个标签页一份 `tabs/<id>.json`、
 * 评论 `comments.json` 与素材 `assets/`），在功能区的文档标签里用文档编辑器打开；智能体只经 `docs_*` 工具读写，不直接改这些文件。
 */

/** 文档的概要（读 `doc.json` 与 `comments.json`）。 */
export interface DocsInfo {
  /** 文档的标题（`doc.json` 的 `name`，去掉首尾空白；没有时用目录名）。 */
  title: string;
  /** 标签页数。 */
  tabCount: number;
  /** 没有解决的评论线程数。 */
  openThreads: number;
}

/** `docs.open` 的结果。 */
export interface DocsOpenResult {
  /**
   * 编辑器页面的地址，以 `/` 结尾：`<网关 HTTP 基址>/docs/<grant>/`；Web 服务里是同源的相对地址 `/docs/<grant>/`。
   * 页面再跳到 `project/<文档 id>`。grant 只在 Runtime 的内存里，Runtime 重启后要重新打开。
   */
  url: string;
  doc: DocsInfo;
  /** 这台机器有没有构建编辑器（`npm run build:docs-editor`）。没有时界面显示不可用的说明，不加载 `url`。 */
  editorAvailable: boolean;
}

/** 文档标注的上限（docs/design/docs §8）：与幻灯片标注相同。 */
export const DOCS_ANNOTATION_LIMITS = { perMessage: 20, text: 4096 } as const;

/**
 * 一条文档标注（docs/design/docs §8）：用户在文档标签里把一条评论「发给智能体」（`comment`），或在空行上写给智能体的请求（`ask`）。
 * 随 `conversations.send` / `steer` 挂在消息上，Runtime 发送时拼成一段文字交给智能体；会话里的用户消息上另带一份。
 * 评论本身已经存在文档里，标注只是指向它；智能体在那个线程里回复（`docs_create` 一条 utterance，`parent` 是线程的第一条）。
 */
export interface DocsAnnotation {
  /** 文档目录，与 `docs.open` 的 target 相同。 */
  doc: FileTarget;
  kind: 'comment' | 'ask';
  /**
   * 文档里的位置，与 Claude Docs 的元素路径同一个写法：`f-<标签页 id>#<正文节点 id>/<块 id>…`；评论另带 `;thread=<线程第一条评论的 id>`。
   * 智能体按它找标签页、块与线程。
   */
  path: string;
  /** 给人看的位置，例如 `计划 › "500 weekly active teams"`。 */
  label: string;
  /** 评论挂着的原文（`comment`）；`ask` 没有。 */
  quote?: string;
  /** 评论正文或请求原话，去掉首尾空白。 */
  text: string;
}

/** `DocsAnnotation.path` 拆开的各段（`parseDocsPath`）。 */
export interface DocsPathParts {
  tab: string;
  node: string;
  /** 块 id；只指到正文节点时没有。 */
  block?: string;
  /** 评论线程第一条的 id。 */
  thread?: string;
}

const ID = /^[A-Za-z0-9_.:-]{1,200}$/;

/** 拆 `f-<tab>#<node>/<block>…;thread=<root>`；不是这个写法时返回 null。`<block>` 之后再有的段（字符位置等）忽略。 */
export function parseDocsPath(path: string): DocsPathParts | null {
  const match = /^f-([^#;/]+)#([^/;]+)(?:\/([^/;@]+)[^;]*)?(?:;thread=([^;]+))?$/.exec(path);
  if (!match) return null;
  const [, tab, node, block, thread] = match;
  if (!tab || !node || !ID.test(tab) || !ID.test(node)) return null;
  if ((block && !ID.test(block)) || (thread && !ID.test(thread))) return null;
  return { tab, node, ...(block ? { block } : {}), ...(thread ? { thread } : {}) };
}
