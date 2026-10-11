import { useEffect, useRef, useState } from 'react';
import { getLocale, SLIDE_ANNOTATION_LIMITS, type FileTarget, type Id, type Locale, type SlidesOpenResult } from '@baocut/protocol';
import { EDITOR_LOCALE_PARAM, readEditorMessage, type EditorPoint, type EditorThread, type EditorToHostMessage, type HostToEditorMessage } from '@baocut/slides/editor-messages';
import { ActionButton, Button, Popover, ProgressCircle, Text, TextArea, ToastQueue, ToggleButton, Tooltip, TooltipTrigger } from '@react-spectrum/s2';
import AlertTriangle from '@react-spectrum/s2/icons/AlertTriangle';
import Comment from '@react-spectrum/s2/icons/Comment';
import Layout from '@react-spectrum/s2/icons/Layout';
import OpenIn from '@react-spectrum/s2/icons/OpenIn';
import { iconStyle, style } from '@react-spectrum/s2/style' with { type: 'macro' };
import { WORKSPACE_COPY } from '../../copy.ts';
import { mergeDraft } from '../../model/ai-tools-handoff.ts';
import { markdownAbsolutePath } from '../../model/markdown-file-link.ts';
import { deckThreads, slideIdOfDetail, type SlideAnnotationError } from '../../model/slide-annotations.ts';
import { SLIDES } from '../../model/slides-copy.ts';
import { entryPath, KIND_LABEL } from '../../model/space.ts';
import { entryOfTarget, targetKey, workspaceTitle } from '../../model/workspace.ts';
import { useRuntime } from '../../runtime/context.tsx';
import { useConnection } from '../../state/connection-store.ts';
import { useDirectory } from '../../state/directory-store.ts';
import { useDraftSlideAnnotationList, useDraftSlideAnnotations } from '../../state/draft-slide-annotations-store.ts';
import { useShell } from '../../state/shell-store.ts';
import { registerSlidesFlush, useSlidesReveal } from '../../state/slides-editor-bridge.ts';
import { useSpace } from '../../state/space-store.ts';

const pane = style({ display: 'flex', flexDirection: 'column', flexGrow: 1, minWidth: 0, minHeight: 0 });
/** 头部与单文件标签同一个样子（原型 home-workspace.css `.home-resource__bar`）。 */
const bar = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 8,
  flexShrink: 0,
  minHeight: 56,
  boxSizing: 'border-box',
  paddingX: 16,
  paddingY: 12,
  borderBottomWidth: 2,
  borderTopWidth: 0,
  borderStartWidth: 0,
  borderEndWidth: 0,
  borderStyle: 'solid',
  borderColor: 'gray-100',
});
const headIcon = iconStyle({ size: 'M' });
const headText = style({ display: 'flex', flexDirection: 'column', gap: 4, flexGrow: 1, minWidth: 0 });
const name = style({ font: 'ui', fontWeight: 'bold', color: 'gray-900', overflowWrap: 'anywhere' });
const meta = style({ font: 'ui-sm', color: 'gray-600' });
/** 编辑器自带页面列表、画布与工具栏，铺满标签的内容区；批注框的锚点按 iframe 视口坐标叠在上面。 */
const stage = style({ position: 'relative', display: 'flex', flexGrow: 1, minHeight: 0, minWidth: 0 });
const frame = style({ display: 'block', flexGrow: 1, minHeight: 0, width: 'full', borderWidth: 0, backgroundColor: 'gray-25' });
const anchor = style({ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' });
/** 批注框（原型 home-slides.css `.home-slides__form`）。 */
const form = style({ display: 'flex', flexDirection: 'column', gap: 12, width: 320, maxWidth: 'full' });
const formLabel = style({ font: 'ui-sm', color: 'gray-700', margin: 0, overflowWrap: 'anywhere' });
const formField = style({ width: 'full' });
const formButtons = style({ display: 'flex', justifyContent: 'end', gap: 8 });
const centered = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 12,
  flexGrow: 1,
  padding: 24,
  font: 'ui',
  color: 'gray-600',
  textAlign: 'center',
});
const notice = style({ font: 'ui', fontWeight: 'bold', color: 'gray-900' });
const footer = style({
  flexShrink: 0,
  paddingX: 16,
  paddingY: 8,
  font: 'ui-xs',
  color: 'gray-600',
  overflowWrap: 'anywhere',
  borderTopWidth: 1,
  borderBottomWidth: 0,
  borderStartWidth: 0,
  borderEndWidth: 0,
  borderStyle: 'solid',
  borderColor: 'gray-100',
});

type Opened = { key: string; result: SlidesOpenResult } | { key: string; error: string };

/** 编辑器载入后报的状态；`url` 对不上当前地址的是上一次载入的，作废。 */
interface EditorState {
  url: string;
  canEdit: boolean;
  /** 标注模式开着没有（以编辑器报的为准）。 */
  mode: boolean;
}

/** 编辑器请父窗口弹出的批注框。 */
interface Compose {
  requestId: string;
  anchor: string;
  point: EditorPoint;
  label: string;
  detail?: string;
  area?: boolean;
}

/** 发送前等编辑器保存完的上限；过了算没保存成（发送照常，由调用方提示）。 */
const FLUSH_TIMEOUT_MS = 10_000;
/** 跳到已发送的一条前，编辑器收下临时那条标注要的时间（运行时下一次渲染后才认得它）。 */
const REVEAL_DELAY_MS = 200;

/** 编辑器地址带上界面语言（`?lang=`）：编辑器按它写标注位置标签。 */
function editorUrl(address: string, locale: Locale): string {
  const url = new URL(address, window.location.href);
  url.searchParams.set(EDITOR_LOCALE_PARAM, locale);
  return url.href;
}

const ERROR_TEXT: Record<SlideAnnotationError, () => string> = {
  empty: () => SLIDES.empty,
  'too-long': () => SLIDES.tooLong(SLIDE_ANNOTATION_LIMITS.text),
  'too-many': () => SLIDES.tooMany(SLIDE_ANNOTATION_LIMITS.perMessage),
};

/**
 * 功能区的幻灯片标签（docs/design/slides §8.1）：头部是图标、标题与页数，「标注」开关、「在 Space 中显示」与「在文件夹中显示」；
 * 内容是 Slides 编辑器的 iframe，地址来自 `slides.open`。地址里的 grant 只在 Runtime 的内存里，所以每次挂上都重新打开，
 * 每次连上（`connectionId` 变了，含没收到断开信号就重连上的）也重新打开（Runtime 重启后地址会变，iframe 跟着重新载入；
 * 没重启时还是同一个地址，不重载）。
 * 这台机器没有构建编辑器时说明不可用，不加载地址。地址上带打开时的界面语言（`?lang=`），编辑器按它写标注位置标签。
 *
 * 标注（§8.2）经 postMessage 与编辑器往来（`@baocut/slides/editor-messages`）：编辑器里点一个元素或框一块区域，
 * 这里在那个位置弹出批注框，「添加到对话」进这个会话的草稿；草稿里属于这份 deck 的交回编辑器画编号标记。
 * 编辑器里「让智能体修好这页」的提示经 `slides:suggest-prompt` 放进这个会话的输入框。
 * 发送消息前经 `registerSlidesFlush` 让编辑器保存完；已发送消息里点一条，经 `useSlidesReveal` 跳到那一页。
 */
export function SlidesPane({ target, conversationId, active }: { target: FileTarget; conversationId: Id | null; active: boolean }) {
  const runtime = useRuntime();
  // 每次连上（含断开后很快重连、界面没来得及显示断开的）都重新打开：Runtime 重启后 grant 与地址都换了
  const connectionId = useConnection((s) => (s.state.status === 'connected' ? s.state.connectionId : null));
  const go = useShell((s) => s.go);
  const entries = useSpace((s) => s.entries);
  const projects = useDirectory((s) => s.projects);
  const conversations = useDirectory((s) => s.conversations);
  const key = targetKey(target);
  const [opened, setOpened] = useState<Opened | null>(null);

  useEffect(() => {
    if (!connectionId) return;
    let live = true;
    runtime.client.request('slides.open', target).then(
      (result) => live && setOpened({ key, result }),
      (error: unknown) => live && setOpened({ key, error: error instanceof Error ? error.message : String(error) }),
    );
    return () => {
      live = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- target 按 key 比较：同一个 deck 换了对象不重开
  }, [runtime, key, connectionId]);

  const current = opened?.key === key ? opened : null;
  const result = current && 'result' in current ? current.result : null;
  const entry = entryOfTarget(entries, target);
  const title = result?.deck.title || entry?.name || workspaceTitle({ kind: 'slides', target });
  const slideCount = result?.deck.slideCount ?? entry?.deck?.slideCount ?? null;
  const metadata = [KIND_LABEL.slides, slideCount === null ? null : SLIDES.pages(slideCount)].filter(Boolean).join(' · ');
  const conversation = 'conversationId' in target ? conversations.find((c) => c.id === target.conversationId) : undefined;
  const projectId = 'projectId' in target ? target.projectId : (entry?.source.projectId ?? conversation?.projectId ?? null);
  const root = 'projectId' in target ? projects.find((p) => p.id === target.projectId)?.path : conversation?.cwd;
  const absolute = entry ? entryPath(entry, { projects, conversations }) : 'path' in target ? markdownAbsolutePath(target.path, root ?? null) : null;

  // —— 与编辑器的往来（§8.2）——
  // 地址带上打开时的界面语言，标注位置标签按它写；之后换语言不重新载入（会丢掉还没保存的改动），下次打开时跟上。
  const [locale] = useState(getLocale);
  const url = result?.editorAvailable ? editorUrl(result.url, locale) : null;
  const origin = url ? new URL(url, window.location.href).origin : null;
  const frameRef = useRef<HTMLIFrameElement>(null);
  const anchorRef = useRef<HTMLSpanElement>(null);
  const [editor, setEditor] = useState<EditorState | null>(null);
  const ready = !!url && editor?.url === url;
  const [compose, setCompose] = useState<(Compose & { url: string }) | null>(null);
  const composing = ready && compose?.url === url ? compose : null;
  const notes = useDraftSlideAnnotationList(conversationId);
  const threads = deckThreads(notes, target);
  const threadsKey = threads.map((t) => `${t.id}@${t.n}`).join(' ');
  const reveal = useSlidesReveal((s) => s.reveals[key]);
  /** 等编辑器回 `slides:flushed` 的那几次。 */
  const flushes = useRef(new Map<string, (saved: boolean) => void>());
  /** 跳到已发送的那条时临时交给编辑器的一条：`n` 为 0，编辑器不画它的标记。 */
  const extra = useRef<EditorThread | null>(null);

  const post = (message: HostToEditorMessage) => {
    if (origin) frameRef.current?.contentWindow?.postMessage(message, origin);
  };
  const postThreads = (list: EditorThread[]) => post({ type: 'slides:threads', threads: extra.current ? [...list, extra.current] : list });
  const closeCompose = () => {
    if (!compose) return;
    setCompose(null);
    post({ type: 'slides:composer-closed', requestId: compose.requestId });
  };

  /** 收到编辑器的一条消息；每次渲染换成最新的，监听只挂一次。 */
  const receive = useRef<(message: EditorToHostMessage) => void>(() => {});
  receive.current = (message) => {
    if (!url) return;
    switch (message.type) {
      case 'slides:ready':
        setEditor({ url, canEdit: message.canEdit, mode: false });
        setCompose(null);
        return;
      case 'slides:mode':
        setEditor((e) => (e?.url === url ? { ...e, mode: message.on } : e));
        if (!message.on) closeCompose();
        return;
      case 'slides:compose': {
        const { requestId, anchor: at, point, label, detail, area } = message;
        if (!conversationId || !active) {
          if (!conversationId) ToastQueue.negative(SLIDES.noConversation, { timeout: 5000 });
          post({ type: 'slides:compose-result', requestId, opened: false });
          return;
        }
        // 同一时间只开一个批注框：上一个当作关了
        if (compose) post({ type: 'slides:composer-closed', requestId: compose.requestId });
        setCompose({ url, requestId, anchor: at, point, label, ...(detail ? { detail } : {}), ...(area ? { area } : {}) });
        post({ type: 'slides:compose-result', requestId, opened: true });
        return;
      }
      case 'slides:flushed':
        flushes.current.get(message.requestId)?.(message.saved);
        return;
      case 'slides:external-change':
        // 编辑器自己重新载入，这里不用管
        return;
      case 'slides:suggest-prompt': {
        // 「让智能体修好这页」等（§4）：提示放进这个会话的输入框，接在已有的话后面，由用户自己发送。
        // 标签页不属于会话时回 false，编辑器改为把提示复制到剪贴板。
        if (conversationId) {
          const shell = useShell.getState();
          shell.setDraft(conversationId, mergeDraft(shell.drafts[conversationId], message.prompt));
        }
        post({ type: 'slides:suggest-prompt-result', requestId: message.requestId, ok: !!conversationId });
        return;
      }
    }
  };

  useEffect(() => {
    if (!url) return;
    const handle = (event: MessageEvent) => {
      const frame = frameRef.current;
      if (!frame || event.source !== frame.contentWindow) return;
      const message = readEditorMessage(event.data);
      if (message) receive.current(message);
    };
    window.addEventListener('message', handle);
    return () => window.removeEventListener('message', handle);
  }, [url]);

  // 草稿里属于这份 deck 的标注交给编辑器画编号标记；编辑器每次载入后都要重新给
  const latestThreads = useRef(threads);
  latestThreads.current = threads;
  useEffect(() => {
    if (ready) postThreads(latestThreads.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- 按编号与 id 比较，草稿里别的会话、别的 deck 变了不重发
  }, [ready, editor, threadsKey]);

  // 发送消息前让编辑器把改动保存完（只读的编辑器没有要保存的）；没保存成时提示里写这份幻灯片的名字
  const canEdit = ready && editor.canEdit;
  const latestTitle = useRef(title);
  latestTitle.current = title;
  useEffect(() => {
    if (!canEdit) return;
    const pending = flushes.current;
    const unregister = registerSlidesFlush(key, {
      flush: () =>
        new Promise<boolean>((resolve) => {
          const requestId = crypto.randomUUID();
          const settle = (saved: boolean) => {
            window.clearTimeout(timer);
            pending.delete(requestId);
            resolve(saved);
          };
          const timer = window.setTimeout(() => settle(false), FLUSH_TIMEOUT_MS);
          pending.set(requestId, settle);
          post({ type: 'slides:flush', requestId });
        }),
      name: () => latestTitle.current,
    });
    return () => {
      unregister();
      for (const settle of [...pending.values()]) settle(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- post 只随地址变
  }, [canEdit, key, url]);

  // 已发送消息里点了一条：编辑器只认得手上的标注，不在草稿里的先临时交给它，下一次渲染后再跳
  useEffect(() => {
    if (!ready || !reveal) return;
    useSlidesReveal.getState().take(key, reveal.seq);
    const known = latestThreads.current.some((t) => t.id === reveal.id);
    extra.current = known ? null : { id: reveal.id, anchor: reveal.anchor, n: 0 };
    postThreads(latestThreads.current);
    // 不在清理里取消：`take` 之后 reveal 变了会触发清理；标签卸下时 iframe 没了，post 自然落空
    window.setTimeout(() => {
      post({ type: 'slides:reveal', id: reveal.id });
      if (extra.current?.id !== reveal.id) return;
      extra.current = null;
      postThreads(latestThreads.current);
    }, REVEAL_DELAY_MS);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- 只在要求来了、编辑器载入后跳一次
  }, [ready, reveal]);

  // 标签切走时关掉批注框
  useEffect(() => {
    if (!active) closeCompose();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- 只看切走
  }, [active]);

  const add = (text: string) => {
    if (!composing || !conversationId) return;
    const slideId = slideIdOfDetail(composing.detail);
    const error = useDraftSlideAnnotations.getState().add(conversationId, {
      id: crypto.randomUUID(),
      deck: target,
      anchor: composing.anchor,
      ...(slideId ? { slideId } : {}),
      label: composing.label,
      ...(composing.detail ? { detail: composing.detail } : {}),
      ...(composing.area ? { area: true } : {}),
      text,
    });
    if (error) {
      ToastQueue.negative(ERROR_TEXT[error](), { timeout: 5000 });
      return;
    }
    closeCompose();
    const count = useDraftSlideAnnotations.getState().annotations[conversationId]?.length ?? 0;
    ToastQueue.positive(SLIDES.added(SLIDES.token(count)), { timeout: 4000 });
  };

  return (
    <section className={pane} aria-label={SLIDES.paneLabel(title)}>
      <header className={bar}>
        <Layout styles={headIcon} />
        <div className={headText}>
          <strong className={name}>{title}</strong>
          <span className={meta}>{metadata}</span>
        </div>
        {ready ? (
          <ToggleButton isSelected={editor.mode} onChange={(on) => post({ type: 'slides:set-mode', on })}>
            <Comment />
            <Text>{SLIDES.annotate}</Text>
          </ToggleButton>
        ) : null}
        <ActionButton isQuiet onPress={() => go({ tab: 'space', category: 'all', projectId })}>
          {WORKSPACE_COPY.showInSpace}
        </ActionButton>
        {absolute ? (
          <TooltipTrigger>
            <ActionButton isQuiet aria-label={WORKSPACE_COPY.reveal} onPress={() => void runtime.host.revealPath(absolute)}>
              <OpenIn />
            </ActionButton>
            <Tooltip>{WORKSPACE_COPY.reveal}</Tooltip>
          </TooltipTrigger>
        ) : null}
      </header>
      {!current ? (
        <div className={centered}>
          <ProgressCircle isIndeterminate aria-label={SLIDES.opening} />
          <span>{SLIDES.opening}</span>
        </div>
      ) : 'error' in current ? (
        <div className={centered} role="alert">
          <AlertTriangle />
          <span>{SLIDES.openFailed(current.error)}</span>
        </div>
      ) : !current.result.editorAvailable ? (
        <div className={centered}>
          <span className={notice}>{SLIDES.unavailableTitle}</span>
          <span>{SLIDES.unavailableBody}</span>
        </div>
      ) : (
        <div className={stage}>
          <iframe
            ref={frameRef}
            className={frame}
            src={url ?? undefined}
            title={SLIDES.frameTitle(title)}
            allow="fullscreen; clipboard-read; clipboard-write"
          />
          <span
            ref={anchorRef}
            className={anchor}
            style={{ left: Math.max(0, composing?.point.x ?? 0), top: Math.max(0, composing?.point.y ?? 0) }}
          />
          <Popover
            triggerRef={anchorRef}
            isOpen={!!composing}
            onOpenChange={(open) => {
              if (!open) closeCompose();
            }}
            placement="bottom"
            padding="default"
            aria-label={SLIDES.noteLabel}>
            {composing ? <SlideNoteForm key={composing.requestId} label={composing.label} onAdd={add} onCancel={closeCompose} /> : null}
          </Popover>
        </div>
      )}
      <footer className={footer}>{absolute ?? ('path' in target ? target.path : '')}</footer>
    </section>
  );
}

/** 批注框（§8.2 第 3 步，移植自原型 home-slides.jsx `SlideNoteForm`）：上面是位置，一个输入框，「取消」与「添加到对话」；⌘/Ctrl+Enter 添加。 */
function SlideNoteForm({ label, onAdd, onCancel }: { label: string; onAdd: (text: string) => void; onCancel: () => void }) {
  const [text, setText] = useState('');
  const over = text.trim().length > SLIDE_ANNOTATION_LIMITS.text;
  const submit = () => {
    if (text.trim() && !over) onAdd(text);
  };
  return (
    <div
      className={form}
      onKeyDown={(event) => {
        if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          submit();
        }
      }}>
      <p className={formLabel}>{label}</p>
      <TextArea
        aria-label={SLIDES.noteLabel}
        placeholder={SLIDES.notePlaceholder}
        value={text}
        onChange={setText}
        autoFocus
        isInvalid={over}
        errorMessage={SLIDES.tooLong(SLIDE_ANNOTATION_LIMITS.text)}
        styles={formField}
      />
      <div className={formButtons}>
        <Button variant="secondary" onPress={onCancel}>
          {SLIDES.cancel}
        </Button>
        <Button variant="accent" isDisabled={!text.trim() || over} onPress={submit}>
          {SLIDES.addToChat}
        </Button>
      </div>
    </div>
  );
}
