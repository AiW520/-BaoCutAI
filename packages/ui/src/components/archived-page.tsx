import { useEffect, useMemo, useRef, useState } from 'react';
import type { Conversation, Id } from '@baocut/protocol';
import {
  ActionButton,
  AlertDialog,
  Button,
  Content,
  DialogContainer,
  Heading,
  IllustratedMessage,
  Link,
  Picker,
  PickerItem,
  SearchField,
  Text,
  ToastQueue,
  Tooltip,
  TooltipTrigger,
} from '@react-spectrum/s2';
import Chat from '@react-spectrum/s2/icons/Chat';
import Delete from '@react-spectrum/s2/icons/Delete';
import Folder from '@react-spectrum/s2/icons/Folder';
import Revert from '@react-spectrum/s2/icons/Revert';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import { ARCHIVED } from './archived-copy.ts';
import { S } from './shell-copy.ts';
import { untitled } from '../copy.ts';
import { agoLabel, shortenPath } from '../model/format.ts';
import { archivedTime, buildArchived, type ArchivedScope } from '../model/sidebar.ts';
import { useRuntime } from '../runtime/context.tsx';
import { useDirectory } from '../state/directory-store.ts';
import { hrefFor, useShell } from '../state/shell-store.ts';
import { HomeSidebar } from './home-sidebar.tsx';
import { useNarrow } from './use-narrow.ts';
import { useNow } from './use-now.ts';

/** 骨架同 UtilityPage（最宽 1040、内边距 40，窄于 600 收到 24），左边是 Home 的侧栏。 */
const layout = style({ display: 'flex', flexGrow: 1, minHeight: 0, minWidth: 0 });
const content = style({ flexGrow: 1, minWidth: 0, overflowY: 'auto' });
const inner = style({ display: 'flex', flexDirection: 'column', maxWidth: '[1040px]', marginX: 'auto' });
const head = style({ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 });
const heading = style({ font: 'heading', margin: 0, flexGrow: 1, minWidth: 0 });
/** 原型 page-archived.css。 */
const intro = style({ font: 'body-sm', color: 'gray-700', marginTop: 0, marginBottom: 20 });
const bar = style({ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 });
const search = style({ flexGrow: 1, minWidth: 0 });
const picker = style({ flexShrink: 0, width: 200 });
const group = style({ marginTop: { default: 0, isLater: 32 } });
const groupHead = style({ display: 'flex', alignItems: 'center', gap: 8, minHeight: 32, marginBottom: 8, color: 'gray-800' });
const groupTitle = style({ font: 'ui', fontWeight: 'bold', color: 'gray-900', margin: 0, truncate: true });
const groupPath = style({ font: 'ui-xs', color: 'gray-600', minWidth: 0, truncate: true });
const groupCount = style({ font: 'ui-xs', color: 'gray-600', flexShrink: 0, marginStart: 'auto' });
const list = style({
  margin: 0,
  paddingX: 16,
  paddingY: 4,
  listStyleType: 'none',
  borderWidth: 2,
  borderStyle: 'solid',
  borderColor: 'gray-100',
  borderRadius: 'lg',
  backgroundColor: 'gray-25',
});
/** 行与行之间一根 2px 的线；高亮的那行（提示条的「查看归档」带来的）铺浅蓝底，往两边多出 12。 */
const row = style({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  minHeight: 48,
  paddingY: 8,
  paddingX: { default: 0, isFocus: 12 },
  marginX: { default: 0, isFocus: -12 },
  borderRadius: { default: 'none', isFocus: 'default' },
  backgroundColor: { default: 'transparent', isFocus: 'blue-100' },
  borderTopWidth: { default: 2, isFirst: 0 },
  borderTopColor: { default: 'gray-100', isAfterFocus: 'transparent' },
  borderStyle: 'solid',
  borderBottomWidth: 0,
  borderStartWidth: 0,
  borderEndWidth: 0,
});
const rowBody = style({ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1, minWidth: 0 });
const rowTitle = style({ font: 'ui', fontWeight: 'bold', truncate: true });
const rowMeta = style({ font: 'ui-xs', color: 'gray-600' });
const rowActions = style({ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 });

type Pending = { kind: 'one'; conversation: Conversation } | { kind: 'all' } | null;

/**
 * Home ›「已归档会话」（产品设计 §3.1，原型 page-archived.jsx）：搜索 + 项目筛选，按项目分组列出已归档的会话；
 * 每行点标题打开那条会话，行尾恢复与删除，页头全部删除。`focus` 是归档提示条带来的那条，高亮并滚到它。
 */
export function ArchivedPage({ focus }: { focus?: Id }) {
  const runtime = useRuntime();
  const go = useShell((s) => s.go);
  const projects = useDirectory((s) => s.projects);
  const conversations = useDirectory((s) => s.conversations);
  const ready = useDirectory((s) => s.ready);
  const [query, setQuery] = useState('');
  const [scope, setScope] = useState<ArchivedScope>('all');
  const [pending, setPending] = useState<Pending>(null);
  const now = useNow(60_000);
  const scrollRef = useRef<HTMLDivElement>(null);
  const narrow = useNarrow(scrollRef, 600);

  const view = useMemo(() => buildArchived(projects, conversations, { query, scope }), [projects, conversations, query, scope]);
  // 筛的那个项目已经没有已归档会话了（全恢复或删光）：回到全部。
  const scopeGone = scope !== 'all' && !(scope === 'none' ? view.hasLoose : view.projects.some((p) => p.id === scope));
  useEffect(() => {
    if (scopeGone) setScope('all');
  }, [scopeGone]);

  const fail = (format: (message: string) => string) => (error: Error) => ToastQueue.negative(format(error.message), { timeout: 5000 });
  const restore = (conversation: Conversation) => {
    const title = conversation.title || untitled();
    runtime
      .updateConversation(conversation.id, { archived: false })
      .then(() =>
        ToastQueue.positive(ARCHIVED.restored(title), {
          timeout: 5000,
          actionLabel: ARCHIVED.open,
          onAction: () => go({ tab: 'home', conversationId: conversation.id, projectId: null }),
          shouldCloseOnAction: true,
        }),
      )
      .catch(fail(ARCHIVED.restoreFailed));
  };
  const removeOne = async (conversation: Conversation) => {
    try {
      await runtime.deleteConversation(conversation.id);
      ToastQueue.neutral(ARCHIVED.deleted(conversation.title || untitled()), { timeout: 5000 });
    } catch (error) {
      fail(S.conversationHeader.deleteFailed)(error as Error);
    }
  };
  // 没有批量删除的接口：一条条删，删不掉的跳过，最后报个数。
  const removeAll = async () => {
    const ids = useDirectory.getState().conversations.filter((c) => c.archived).map((c) => c.id);
    let done = 0;
    for (const id of ids) {
      try {
        await runtime.deleteConversation(id);
        done += 1;
      } catch {
        // 记在个数里，继续删下一条。
      }
    }
    if (done === ids.length) ToastQueue.neutral(ARCHIVED.deletedAll(done), { timeout: 5000 });
    else ToastQueue.negative(ARCHIVED.deletedSome(done, ids.length), { timeout: 5000 });
  };

  const scopes = [
    { id: 'all', name: ARCHIVED.allProjects },
    ...view.projects.map((p) => ({ id: p.id, name: p.name })),
    ...(view.hasLoose ? [{ id: 'none', name: ARCHIVED.noProject }] : []),
  ];

  return (
    <div className={layout}>
      <HomeSidebar />
      <div ref={scrollRef} className={`${content} bc-scroll`}>
        <div className={inner} style={{ padding: narrow ? 24 : 40 }}>
          <header className={head}>
            <h1 className={heading}>{ARCHIVED.title}</h1>
            {view.total ? (
              <Button variant="secondary" fillStyle="outline" onPress={() => setPending({ kind: 'all' })}>
                <Delete />
                <Text>{ARCHIVED.deleteAll}</Text>
              </Button>
            ) : null}
          </header>
          <p className={intro}>{ARCHIVED.intro}</p>
          {view.total ? (
            <div className={bar}>
              <SearchField aria-label={ARCHIVED.search} placeholder={ARCHIVED.search} value={query} onChange={setQuery} styles={search} />
              <Picker
                aria-label={ARCHIVED.filterLabel}
                items={scopes}
                selectedKey={scopeGone ? 'all' : scope}
                onSelectionChange={(key) => key !== null && setScope(String(key))}
                align="end"
                styles={picker}>
                {(item) => (
                  <PickerItem id={item.id} textValue={item.name}>
                    {item.name}
                  </PickerItem>
                )}
              </Picker>
            </div>
          ) : null}
          {!ready ? null : !view.total ? (
            <IllustratedMessage size="S">
              <Heading>{ARCHIVED.emptyTitle}</Heading>
              <Content>{ARCHIVED.emptyBody}</Content>
            </IllustratedMessage>
          ) : !view.count ? (
            <IllustratedMessage size="S">
              <Heading>{ARCHIVED.noMatchTitle}</Heading>
              <Content>{ARCHIVED.noMatchBody}</Content>
            </IllustratedMessage>
          ) : (
            view.groups.map((g, index) => {
              const name = g.project ? g.project.name : ARCHIVED.noProject;
              const focusAt = g.conversations.findIndex((c) => c.id === focus);
              return (
                <section key={g.key} className={group({ isLater: index > 0 })} aria-label={name}>
                  <header className={groupHead}>
                    {g.project ? <Folder /> : <Chat />}
                    <h2 className={groupTitle}>{name}</h2>
                    {g.project ? <span className={groupPath}>{shortenPath(g.project.path)}</span> : null}
                    <span className={groupCount}>{ARCHIVED.sessionCount(g.conversations.length)}</span>
                  </header>
                  <ul className={list}>
                    {g.conversations.map((c, i) => (
                      <ArchivedRow
                        key={c.id}
                        conversation={c}
                        now={now}
                        isFirst={i === 0}
                        isFocus={i === focusAt}
                        isAfterFocus={focusAt >= 0 && i === focusAt + 1}
                        onRestore={() => restore(c)}
                        onDelete={() => setPending({ kind: 'one', conversation: c })}
                      />
                    ))}
                  </ul>
                </section>
              );
            })
          )}
        </div>
      </div>
      <DialogContainer onDismiss={() => setPending(null)}>
        {pending?.kind === 'one' ? (
          <AlertDialog
            variant="destructive"
            title={S.conversationHeader.deleteTitle}
            primaryActionLabel={S.conversationHeader.deleteConfirm}
            cancelLabel={S.common.cancel}
            onPrimaryAction={() => void removeOne(pending.conversation)}>
            {S.conversationHeader.deleteBody}
          </AlertDialog>
        ) : pending?.kind === 'all' ? (
          <AlertDialog
            variant="destructive"
            title={ARCHIVED.deleteAllTitle(view.total)}
            primaryActionLabel={ARCHIVED.deleteAll}
            cancelLabel={S.common.cancel}
            onPrimaryAction={() => void removeAll()}>
            {ARCHIVED.deleteAllBody}
          </AlertDialog>
        ) : null}
      </DialogContainer>
    </div>
  );
}

function ArchivedRow({
  conversation,
  now,
  isFirst,
  isFocus,
  isAfterFocus,
  onRestore,
  onDelete,
}: {
  conversation: Conversation;
  now: number;
  isFirst: boolean;
  isFocus: boolean;
  isAfterFocus: boolean;
  onRestore: () => void;
  onDelete: () => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const title = conversation.title || untitled();
  useEffect(() => {
    if (isFocus) ref.current?.scrollIntoView({ block: 'center' });
  }, [isFocus]);
  return (
    <li ref={ref} className={row({ isFirst, isFocus, isAfterFocus })} data-archived-row={conversation.id}>
      <div className={rowBody}>
        <Link href={hrefFor({ tab: 'home', conversationId: conversation.id, projectId: null })} isStandalone isQuiet variant="secondary">
          <span className={rowTitle}>{title}</span>
        </Link>
        <span className={rowMeta}>{ARCHIVED.meta(agoLabel(archivedTime(conversation), now), agoLabel(conversation.updatedAt, now))}</span>
      </div>
      <div className={rowActions}>
        <ActionButton size="S" onPress={onRestore} aria-label={ARCHIVED.restoreNamed(title)}>
          <Revert />
          <Text>{ARCHIVED.restore}</Text>
        </ActionButton>
        <TooltipTrigger>
          <ActionButton size="S" isQuiet onPress={onDelete} aria-label={ARCHIVED.deleteNamed(title)}>
            <Delete />
          </ActionButton>
          <Tooltip>{S.conversationHeader.deleteSession}</Tooltip>
        </TooltipTrigger>
      </div>
    </li>
  );
}
