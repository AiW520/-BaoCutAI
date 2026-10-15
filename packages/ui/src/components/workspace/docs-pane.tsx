import { DOCS_ANNOTATION_LIMITS, type FileTarget, type Id } from '@baocut/protocol';
import TextParagraph from '@react-spectrum/s2/icons/TextParagraph';
import { iconStyle } from '@react-spectrum/s2/style' with { type: 'macro' };
import { docsRevealId, type DocsAnnotationError } from '../../model/docs-annotations.ts';
import { DOCS } from '../../model/docs-copy.ts';
import { useDraftDocsAnnotations } from '../../state/draft-docs-annotations-store.ts';
import { EditorPane, type EditorPaneKind } from './editor-pane.tsx';

const headIcon = iconStyle({ size: 'M' });

const ERROR_TEXT: Record<DocsAnnotationError, () => string> = {
  empty: () => DOCS.empty,
  'too-long': () => DOCS.tooLong(DOCS_ANNOTATION_LIMITS.text),
  'too-many': () => DOCS.tooMany(DOCS_ANNOTATION_LIMITS.perMessage),
};

/**
 * 协作文档标签的那几样（docs/design/docs）：`docs.open`、「N 个标签页」、编辑器直接交来的评论与请求（§8）。
 * 编辑器与幻灯片一样同源加载（Web 端 `docs.open` 给的是相对地址 `/docs/<grant>/`，带着 Web 会话的 cookie），不换回环主机名；
 * 没有标注开关与批注框，也不交编号标记。
 */
const DOCS_PANE: EditorPaneKind = {
  kind: 'docs',
  icon: <TextParagraph styles={headIcon} />,
  copy: DOCS,
  open: async (runtime, target) => {
    const result = await runtime.client.request('docs.open', target);
    return { url: result.url, editorAvailable: result.editorAvailable, title: result.doc.title, count: result.doc.tabCount };
  },
  entryCount: (entry) => entry.doc?.tabCount ?? null,
  countText: (n) => DOCS.tabs(n),
  direct: {
    copy: DOCS,
    add: (conversationId, doc, note) => {
      const error = useDraftDocsAnnotations.getState().add(conversationId, { id: crypto.randomUUID(), doc, ...note });
      return error ? ERROR_TEXT[error]() : null;
    },
    draftCount: (conversationId) => useDraftDocsAnnotations.getState().annotations[conversationId]?.length ?? 0,
    revealId: docsRevealId,
  },
};

/**
 * 功能区的协作文档标签（docs/design/docs）：文档编辑器的 iframe，编辑器自己经 WebSocket 保存；智能体经 `docs_*` 工具改的内容实时出现。
 * 标签的通用部分（打开、消息往来、发送前保存、跳转）在 `EditorPane`。
 */
export function DocsPane({ target, conversationId, active }: { target: FileTarget; conversationId: Id | null; active: boolean }) {
  return <EditorPane spec={DOCS_PANE} target={target} conversationId={conversationId} active={active} />;
}
