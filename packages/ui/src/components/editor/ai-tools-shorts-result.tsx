import { useEffect, useMemo, useState, type ComponentType } from 'react';
import type { DocumentRecord, Id, Sequence, SpaceEntry } from '@baocut/protocol';
import { ActionButton, Badge, Button, ProgressCircle, TextField, ToastQueue } from '@react-spectrum/s2';
import ChevronLeft from '@react-spectrum/s2/icons/ChevronLeft';
import ChevronRight from '@react-spectrum/s2/icons/ChevronRight';
import Cut from '@react-spectrum/s2/icons/Cut';
import Export from '@react-spectrum/s2/icons/Export';
import Folder from '@react-spectrum/s2/icons/Folder';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import { Button as RACButton } from 'react-aria-components';
import { untitled } from '../../copy.ts';
import { aiTool } from '../../model/ai-tools.ts';
import { agentRunState } from '../../model/ai-tools-handoff.ts';
import { durationSeconds } from '../../model/editor.ts';
import { formatClock, formatDuration } from '../../model/format.ts';
import { createdVideoIds, entryVideoId, pagerIndex, readDerivation, shortsBatch, type ShortsDerivation } from '../../model/shorts-result.ts';
import { derivedFrom, videoTargetOf } from '../../model/space.ts';
import { useRuntime } from '../../runtime/context.tsx';
import { useShell } from '../../state/shell-store.ts';
import { useSpace } from '../../state/space-store.ts';
import { useTimeline } from '../../state/timeline-store.ts';
import { useVideo } from '../../state/video-store.ts';
import { requestExport } from '../export/export-request.ts';
import { AI_TOOLS_COPY as C } from './ai-tools-copy.ts';
import { setAiToolPage, setPanelLanding, type AiToolPage } from './ai-tools-nav.ts';
import { PanelHead } from './panel-head.tsx';
import { SHORTS_COPY as S } from './shorts-copy.ts';
import { focusShortsRun, latestShortsRun, useShortsRuns } from './shorts-runs.ts';
import { peekShort, renameShort, type ShortFacts } from './shorts-video-ops.ts';

const body = style({ flexGrow: 1, minHeight: 0, overflowY: 'auto', paddingX: 12, paddingTop: 12, paddingBottom: 16 });
const pager = style({ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0, font: 'ui-xs', color: 'gray-700' });
const tabular = { fontVariantNumeric: 'tabular-nums' } as const;
const lead = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 12,
  borderRadius: 'lg',
  backgroundColor: 'gray-75',
  font: 'ui-sm',
  color: 'gray-800',
  lineHeight: '[1.5]',
});
const list = style({ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 });
const card = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 12,
  borderRadius: 'lg',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: { default: 'gray-200', isCurrent: 'blue-800' },
  backgroundColor: { default: 'transparent', isCurrent: 'blue-100' },
});
const cardHead = style({ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 });
const cardN = style({ flexShrink: 0, font: 'code-xs', color: 'gray-600' });
const cardTitle = style({
  flexGrow: 1,
  minWidth: 0,
  padding: 0,
  borderWidth: 0,
  backgroundColor: 'transparent',
  textAlign: 'start',
  font: 'ui',
  fontWeight: 'bold',
  color: 'gray-900',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  cursor: 'text',
  outlineStyle: { default: 'none', isFocusVisible: 'solid' },
  outlineWidth: 2,
  outlineColor: 'focus-ring',
  borderRadius: 'sm',
});
const renameField = style({ flexGrow: 1, minWidth: 0 });
const cardSpan = style({ font: 'ui-xs', color: 'gray-600' });
const cardActs = style({ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'end' });
const status = style({ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, font: 'ui-sm', color: 'gray-700' });
const hint = style({ marginTop: 12, marginBottom: 0, font: 'ui-xs', color: 'gray-600', lineHeight: '[1.5]' });
const secHead = style({ marginTop: 20, marginBottom: 4, font: 'detail', fontWeight: 'bold', color: 'gray-700' });
const tile = style({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  width: 'full',
  boxSizing: 'border-box',
  paddingX: 12,
  paddingY: 8,
  borderRadius: 'lg',
  borderWidth: 0,
  textAlign: 'start',
  font: 'ui-sm',
  color: 'gray-800',
  backgroundColor: { default: 'transparent', isHovered: 'gray-100', isPressed: 'gray-200' },
  cursor: 'pointer',
  outlineStyle: { default: 'none', isFocusVisible: 'solid' },
  outlineWidth: 2,
  outlineColor: 'focus-ring',
  transition: 'default',
});
const tileText = style({ display: 'flex', flexDirection: 'column', gap: '[2px]', flexGrow: 1, minWidth: 0, lineHeight: '[1.4]' });
const tileName = style({ font: 'ui', fontWeight: 'bold', color: 'inherit' });
const tileSub = style({ font: 'ui-xs', color: 'gray-600' });
const tileIcon = style({ display: 'flex', flexShrink: 0, color: 'gray-700' });
const chev = style({ display: 'flex', flexShrink: 0, color: 'gray-500' });

const reasonOf = (error: unknown) => (error instanceof Error ? error.message : String(error));
const fail = (error: unknown) => ToastQueue.negative(S.failed(reasonOf(error)), { timeout: 6000 });

/** 打开另一部视频，右侧面板落在 AI 工具 Tab 的 `page`（结果页或参数页）。 */
function openWithPage(entry: SpaceEntry, page: AiToolPage): void {
  const id = entryVideoId(entry);
  if (!id) return;
  setAiToolPage(id, page);
  setPanelLanding(id, 'aitools');
  useShell.getState().openVideo(videoTargetOf(entry));
}

/** 等编辑器换下这部视频（打开了别的）：移入回收站前先让出来；最多等 `ms`。 */
function released(videoId: Id, ms = 4000): Promise<void> {
  return new Promise((resolve) => {
    if (useVideo.getState().video?.videoId !== videoId) return resolve();
    const timer = setTimeout(done, ms);
    const stop = useVideo.subscribe((s) => {
      if (s.video?.videoId !== videoId) done();
    });
    function done() {
      clearTimeout(timer);
      stop();
      resolve();
    }
  });
}

/**
 * 剪成短视频的结果页（原型 panel-aitools-shorts-result.jsx `ShortsCutResult`，产品设计 §5.10「结果页」）：这一轮会话切出的子视频，
 * 每支一张卡——标题（点一下改名，`renameVideo`）、在原片里的起止与眼下的时长、「正在看」、「打开」「不要这支」。头上「已创建 N 支」
 * 与「第 k/N ‹ ›」逐支翻。「打开」在同一个编辑器里换成那一支，右侧仍是这一页、那张卡亮着；「不要这支」移入回收站，提示里可撤销。
 * 下面「接下来」：再切几支（回参数页，勾上「已经切过的不再找」）、在 Space 里看这几支（按来源筛好）、全部导出…（打开第一支的导出弹层）。
 *
 * 这一页属于那一轮会话、挂在父视频（`host`）上：开着父视频或其中任何一支子视频都画同一份。认这一轮靠本机记下的那次交接
 * （`useShortsRuns`）；没有记录（比如在 Space 里直接打开了一支子视频）时列出这部父视频派生的全部子视频。
 */
export function ShortsResultPage({
  videoId,
  host,
  sequence,
  documents,
}: {
  videoId: Id;
  host: Id;
  sequence: Sequence;
  documents: Record<Id, DocumentRecord>;
}) {
  const runtime = useRuntime();
  const run = useShortsRuns((s) => latestShortsRun(s.runs, host));
  const conversationId = run?.conversationId ?? null;
  useEffect(() => (conversationId ? runtime.watchConversation(conversationId) : undefined), [runtime, conversationId]);
  const items = useTimeline((s) => (conversationId ? s.byConversationId[conversationId]?.items : undefined));
  const entries = useSpace((s) => s.entries);
  const created = useMemo(() => createdVideoIds(items), [items]);
  const batch = useMemo(
    () =>
      run
        ? shortsBatch(entries, { parentVideoId: host, conversationId: run.conversationId, handedAt: run.handedAt, created })
        : shortsBatch(
            entries.filter((e) => derivedFrom(e) === host),
            { parentVideoId: host, conversationId: '', handedAt: '', created: null },
          ),
    [entries, run, host, created],
  );
  const live = useMemo(() => batch.filter((e) => !e.user.trashedAt), [batch]);
  const state = run ? agentRunState({ taskId: run.taskId, handedAt: run.handedAt, items }) : null;
  const working = state?.kind === 'starting' || state?.kind === 'running' || state?.kind === 'waiting';

  const openName = useVideo((s) => s.video?.state?.video?.name ?? null);
  const hostEntry = entries.find((e) => e.kind === 'video' && !e.user.trashedAt && entryVideoId(e) === host) ?? null;
  const hostName = hostEntry?.name ?? (videoId === host ? openName : null) ?? untitled();
  const inChild = videoId !== host;

  const ids = live.map((e) => entryVideoId(e)!);
  const at = pagerIndex(ids, videoId, run?.focus ?? null);

  const resultPage: AiToolPage = { tool: 'shortscut', preset: null, phase: 'result', host };
  const open = (entry: SpaceEntry) => {
    const id = entryVideoId(entry);
    if (!id) return;
    if (run) focusShortsRun(run.conversationId, id);
    if (id !== videoId) openWithPage(entry, resultPage);
  };
  // 「返回」：在父视频里回参数页（设置保留在本机草稿里）；在子视频里回父视频，结果页仍在那里。
  const back = () => {
    if (!inChild) setAiToolPage(videoId, { tool: 'shortscut', preset: null, phase: 'setup' });
    else if (hostEntry) openWithPage(hostEntry, resultPage);
  };
  const more = () => {
    const page: AiToolPage = { tool: 'shortscut', preset: { skipDone: true }, phase: 'setup' };
    if (!inChild) setAiToolPage(videoId, page);
    else if (hostEntry) openWithPage(hostEntry, page);
  };
  const inSpace = () => useShell.getState().go({ tab: 'space', category: 'all', projectId: null, from: host });
  const exportAll = () => {
    const first = live[0];
    const id = first ? entryVideoId(first) : null;
    if (!first || !id) return;
    requestExport(id);
    if (id !== videoId) open(first);
    ToastQueue.neutral(S.exportStarted(first.name, live.length - 1), { timeout: 5000 });
  };
  const discard = (entry: SpaceEntry) => {
    const id = entryVideoId(entry);
    const trash = () =>
      runtime
        .updateSpaceEntry(entry.id, { trashed: true })
        .then(() =>
          ToastQueue.neutral(S.discarded(entry.name), {
            timeout: 5000,
            actionLabel: S.undo,
            onAction: () => void runtime.updateSpaceEntry(entry.id, { trashed: false }).catch(fail),
            shouldCloseOnAction: true,
          }),
        )
        .catch(fail);
    // 正开着这一支：先回父视频（结果页还在那里），让出来再移入回收站。
    if (id === videoId && hostEntry) {
      openWithPage(hostEntry, resultPage);
      void released(videoId).then(trash);
    } else void trash();
  };

  return (
    <>
      <PanelHead title={aiTool('shortscut').name} back={{ label: inChild ? S.backTo(hostName) : C.back, onPress: back }}>
        {batch.length || !working ? (
          <Badge size="S" variant="positive" fillStyle="subtle">
            {S.created(live.length)}
          </Badge>
        ) : null}
        {live.length ? (
          <span className={pager}>
            <span style={tabular}>{S.pager(at + 1, live.length)}</span>
            <ActionButton size="XS" isQuiet aria-label={S.prev} isDisabled={at <= 0} onPress={() => open(live[at - 1]!)}>
              <ChevronLeft />
            </ActionButton>
            <ActionButton size="XS" isQuiet aria-label={S.next} isDisabled={at >= live.length - 1} onPress={() => open(live[at + 1]!)}>
              <ChevronRight />
            </ActionButton>
          </span>
        ) : null}
      </PanelHead>
      <div className={`${body} bc-scroll`}>
        <div className={lead}>
          <span>{S.lead}</span>
        </div>

        {working ? (
          <div className={status} role="status">
            <ProgressCircle size="S" isIndeterminate aria-label={S.working} />
            <span>{S.working}</span>
          </div>
        ) : null}

        <div className={list}>
          {live.map((entry, i) => (
            <ShortCard
              key={entry.id}
              entry={entry}
              n={i + 1}
              current={entryVideoId(entry) === videoId}
              live={entryVideoId(entry) === videoId ? { documents, sequence } : null}
              onOpen={() => open(entry)}
              onDiscard={() => discard(entry)}
            />
          ))}
        </div>
        {!working && !batch.length ? <p className={hint}>{S.none}</p> : null}
        {batch.length && !live.length ? <p className={hint}>{S.allTrashed}</p> : null}

        <h3 className={secHead}>{S.nextHead}</h3>
        <NextRow icon={Cut} title={S.more} sub={S.moreSub} onPress={more} />
        <NextRow icon={Folder} title={S.inSpace} sub={S.inSpaceSub(hostName)} onPress={inSpace} />
        {live.length ? <NextRow icon={Export} title={S.exportAll} sub={S.exportAllSub} onPress={exportAll} /> : null}
        <p className={hint}>{S.hint}</p>
      </div>
    </>
  );
}

function NextRow({ icon: Icon, title, sub, onPress }: { icon: ComponentType; title: string; sub: string; onPress(): void }) {
  return (
    <RACButton className={(state) => tile(state)} onPress={onPress}>
      <span className={tileIcon}>
        <Icon />
      </span>
      <span className={tileText}>
        <span className={tileName}>{title}</span>
        <span className={tileSub}>{sub}</span>
      </span>
      <span className={chev}>
        <ChevronRight />
      </span>
    </RACButton>
  );
}

/** 一支子视频的派生来源与眼下的时长：开着的那一支读编辑器里的快照，其余在后台读一次（`peekShort`）。 */
function useShortFacts(entry: SpaceEntry, live: { documents: Record<Id, DocumentRecord>; sequence: Sequence } | null): ShortFacts {
  const runtime = useRuntime();
  const [peeked, setPeeked] = useState<ShortFacts | null>(null);
  // `entry` 换了对象但 `key` 没变时不用再读：目标按 `key` 记下来。
  const key = `${entry.id}@${entry.lastActivityAt}`;
  const target = useMemo(() => videoTargetOf(entry), [key]); // eslint-disable-line react-hooks/exhaustive-deps
  const isLive = !!live;
  useEffect(() => {
    if (isLive) return;
    let alive = true;
    peekShort(runtime, target, key)
      .then((facts) => alive && setPeeked(facts))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [runtime, target, key, isLive]);
  const documents = live?.documents ?? null;
  const sequence = live?.sequence ?? null;
  const liveFacts = useMemo(
    () => (documents && sequence ? { derivation: readDerivation(documents), seconds: durationSeconds(sequence) } : null),
    [documents, sequence],
  );
  return liveFacts ?? peeked ?? { derivation: null, seconds: entry.media?.durationSec ?? null };
}

function spanText(derivation: ShortsDerivation | null, seconds: number | null): string | null {
  const length = seconds !== null ? formatDuration(seconds * 1000) : null;
  if (derivation && length) return S.span(formatClock(derivation.range.start), formatClock(derivation.range.end), length);
  return length;
}

function ShortCard({
  entry,
  n,
  current,
  live,
  onOpen,
  onDiscard,
}: {
  entry: SpaceEntry;
  n: number;
  current: boolean;
  live: { documents: Record<Id, DocumentRecord>; sequence: Sequence } | null;
  onOpen(): void;
  onDiscard(): void;
}) {
  const runtime = useRuntime();
  const facts = useShortFacts(entry, live);
  const [draft, setDraft] = useState<string | null>(null);
  const span = spanText(facts.derivation, facts.seconds);
  const commit = () => {
    const name = draft?.trim() ?? '';
    setDraft(null);
    const id = entryVideoId(entry);
    if (!id || !name || name === entry.name) return;
    renameShort(runtime, videoTargetOf(entry), id, name).catch(fail);
  };
  return (
    <div className={card({ isCurrent: current })} aria-current={current ? 'true' : undefined}>
      <div className={cardHead}>
        <span className={cardN} style={tabular}>
          {n}
        </span>
        {draft !== null ? (
          <TextField
            aria-label={S.renameLabel}
            size="S"
            autoFocus
            value={draft}
            onChange={setDraft}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commit();
              else if (e.key === 'Escape') setDraft(null);
            }}
            styles={renameField}
          />
        ) : (
          <RACButton className={(state) => cardTitle(state)} aria-label={`${entry.name} · ${S.rename}`} onPress={() => setDraft(entry.name)}>
            <span title={S.rename}>{entry.name}</span>
          </RACButton>
        )}
        {current ? (
          <Badge size="S" variant="informative" fillStyle="subtle">
            {S.watching}
          </Badge>
        ) : null}
      </div>
      {span ? (
        <span className={cardSpan} style={tabular}>
          {span}
        </span>
      ) : null}
      <div className={cardActs}>
        <Button size="S" variant="secondary" fillStyle="outline" onPress={onDiscard}>
          {S.discard}
        </Button>
        {current ? null : (
          <Button size="S" variant="secondary" onPress={onOpen}>
            {S.open}
          </Button>
        )}
      </div>
    </div>
  );
}
