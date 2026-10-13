import { useEffect, useMemo, useState } from 'react';
import type { Id, SpaceRelevantChunksResult } from '@baocut/protocol';
import { Button, ButtonGroup, Checkbox, Content, Dialog, DialogContainer, Heading, ProgressCircle, SegmentedControl, SegmentedControlItem, TextField } from '@react-spectrum/s2';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import { clockText } from '../../model/speakers-proposal.ts';
import { pickedChunks, SERIES_OTHERS_MAX, seriesVideos, toggleSeries, type SeriesVideo } from '../../model/writing-topic.ts';
import { useRuntime } from '../../runtime/context.tsx';
import { SemanticNote } from '../semantic-note.tsx';
import { S } from '../shell-copy.ts';
import { SectionLink } from '../tools/tool-parts.tsx';
import { Row } from './ai-tools-agent-page.tsx';
import { EDIT_AIDS_COPY } from './edit-aids-copy.ts';
import { WRITING_TOPIC_COPY as C } from './writing-topic-copy.ts';

/*
 * 写作「按主题」选材、系列文章与生成章节的边界（创作辅助集成设计 §2.2、§2.4；原型 panel-aitools-topic.jsx `TopicRows`、
 * `PickedDialog`、`SeriesRow`、`BoundaryRow`）。只在直接调模型时出现：选材由 Runtime 的 `ai-tool` 流程做，交给 Agent 时 Agent
 * 自己用 `speech_relevant`。与原型的出入：意图句写在单独的「主题」框里（预览查的就是这句，开跑时作 `selection.intent` 交回，
 * 保证模型看到的就是预览里勾着的那些）；不写时流程用提示词、不预览。系列只在按主题时可选：整篇时那几部要先打开。
 */

const lineStyle = style({ display: 'flex', alignItems: 'center', flexWrap: 'wrap', columnGap: 8, rowGap: 2, font: 'ui-xs', color: 'gray-600', minWidth: 0 });
const hint = style({ margin: 0, font: 'ui-xs', color: 'gray-600', lineHeight: '[1.5]' });
const field = style({ width: 'full' });
const grow = style({ flexGrow: 1, minWidth: 0, font: 'ui-sm', color: 'gray-800', overflowWrap: 'anywhere' });
const seriesLine = style({ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 });
const busy = style({ display: 'flex', alignItems: 'center', gap: 8, font: 'ui-xs', color: 'gray-600' });
const list = style({ display: 'flex', flexDirection: 'column', gap: 8, margin: 0, padding: 0, listStyleType: 'none' });
const rowLabel = style({ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 });
const meta = style({ display: 'flex', flexWrap: 'wrap', columnGap: 8, font: 'ui-xs', color: 'gray-600' });
const weak = style({ font: 'ui-xs', color: 'notice-900' });
const chunkText = style({ font: 'ui-sm', color: 'gray-800', overflowWrap: 'anywhere' });

const message = (err: unknown) => (err instanceof Error ? err.message : String(err));

type Load<T> = { state: 'idle' } | { state: 'loading' } | { state: 'ok'; data: T } | { state: 'error'; error: string };

/** 主题停下来 0.6 秒后再查（不按键查）。 */
const SETTLE_MS = 600;

/**
 * 「查看挑选的段落」的预览（`space.relevantChunks`，与流程的 `selection` 同一个查询）。没写主题、没开按主题时不查；主题或系列
 * 变了重查，勾掉的清空。
 */
export function useTopicPreview(o: { on: boolean; videoId: Id; series: readonly Id[]; topic: string }): {
  load: Load<SpaceRelevantChunksResult>;
  retry(): void;
} {
  const runtime = useRuntime();
  const intent = o.topic.trim();
  const videos = [o.videoId, ...o.series].join('\u0000');
  const [nonce, setNonce] = useState(0);
  const [load, setLoad] = useState<Load<SpaceRelevantChunksResult>>({ state: 'idle' });
  useEffect(() => {
    if (!o.on || !intent) {
      setLoad({ state: 'idle' });
      return;
    }
    let live = true;
    setLoad({ state: 'loading' });
    const timer = setTimeout(() => {
      runtime.client.request('space.relevantChunks', { intent, videoIds: videos.split('\u0000') }).then(
        (data) => live && setLoad({ state: 'ok', data }),
        (err) => live && setLoad({ state: 'error', error: message(err) }),
      );
    }, SETTLE_MS);
    return () => {
      live = false;
      clearTimeout(timer);
    };
  }, [runtime, o.on, intent, videos, nonce]);
  return { load, retry: () => setNonce((n) => n + 1) };
}

/** 按主题这一项不能用时那一句（置灰的原因与去设置）；能用时按缺省写一句为什么是整篇或按主题。 */
export function TopicScopeNote({ usable, on, long }: { usable: boolean; on: boolean; long: boolean }) {
  if (!usable) return <SemanticNote entry="topic" />;
  if (on && long) return <p className={hint}>{C.topicDefaultLong}</p>;
  if (!on && !long) return <p className={hint}>{C.topicDefaultShort}</p>;
  return null;
}

/** 按主题时范围下面的几行：主题框、挑了几段与「查看挑选的段落」、系列。 */
export function TopicRows({
  videoId,
  videoName,
  projectId,
  topic,
  onTopic,
  load,
  retry,
  excluded,
  onExcluded,
  series,
  onSeries,
}: {
  videoId: Id;
  videoName: string;
  projectId: Id | null;
  topic: string;
  onTopic(topic: string): void;
  load: Load<SpaceRelevantChunksResult>;
  retry(): void;
  excluded: ReadonlySet<string>;
  onExcluded(excluded: Set<string>): void;
  series: readonly Id[];
  onSeries(series: Id[]): void;
}) {
  const [open, setOpen] = useState(false);
  const [videos, setVideos] = useState<SeriesVideo[]>([]);
  return (
    <>
      <Row label={C.topicLabel}>
        <TextField aria-label={C.topicLabel} size="S" styles={field} placeholder={C.topicPlaceholder} value={topic} onChange={onTopic} />
        <p className={hint}>{C.topicHow}</p>
        <Preview load={load} retry={retry} excluded={excluded} onView={() => setOpen(true)} />
      </Row>
      {projectId ? (
        <SeriesRow videoId={videoId} videoName={videoName} projectId={projectId} series={series} onSeries={onSeries} onVideos={setVideos} />
      ) : null}
      {open && load.state === 'ok' ? (
        <PickedDialog
          data={load.data}
          excluded={excluded}
          names={new Map([[videoId, videoName], ...videos.map((v) => [v.videoId, v.name] as const)])}
          multi={series.length > 0}
          onApply={(next) => {
            onExcluded(next);
            setOpen(false);
          }}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </>
  );
}

function Preview({ load, retry, excluded, onView }: { load: Load<SpaceRelevantChunksResult>; retry(): void; excluded: ReadonlySet<string>; onView(): void }) {
  if (load.state === 'idle') return <p className={hint}>{C.topicNeedsTopic}</p>;
  if (load.state === 'loading') {
    return (
      <div className={busy} role="status">
        <ProgressCircle size="S" isIndeterminate aria-label={C.topicLoading} />
        {C.topicLoading}
      </div>
    );
  }
  if (load.state === 'error') {
    return (
      <div className={lineStyle}>
        <span>{C.topicFailed(load.error)}</span>
        <SectionLink onPress={retry}>{EDIT_AIDS_COPY.retry}</SectionLink>
      </div>
    );
  }
  const picked = pickedChunks(load.data.chunks, excluded);
  return (
    <>
      {load.data.chunks.length ? (
        <div className={lineStyle}>
          <span>{C.topicPicked(picked.chunks.length, picked.chapters)}</span>
          <SectionLink onPress={onView}>{C.topicView}</SectionLink>
        </div>
      ) : (
        <p className={hint}>{C.topicNone}</p>
      )}
      <SemanticNote entry="topic" reason={load.data.reason} />
    </>
  );
}

/** 挑中的段落：勾掉不想让模型看到的（原型 `PickedDialog`；这里只列挑中的，勾掉的交回作 `selection.exclude`）。 */
function PickedDialog({
  data,
  excluded,
  names,
  multi,
  onApply,
  onClose,
}: {
  data: SpaceRelevantChunksResult;
  excluded: ReadonlySet<string>;
  names: ReadonlyMap<Id, string>;
  multi: boolean;
  onApply(excluded: Set<string>): void;
  onClose(): void;
}) {
  const [off, setOff] = useState<Set<string>>(() => new Set(excluded));
  const kept = data.chunks.length - data.chunks.filter((c) => off.has(c.chunkId)).length;
  const flip = (id: string, on: boolean) =>
    setOff((s) => {
      const next = new Set(s);
      if (on) next.delete(id);
      else next.add(id);
      return next;
    });
  return (
    <DialogContainer onDismiss={onClose}>
      <Dialog size="L">
        {({ close }) => (
          <>
            <Heading slot="title">{C.topicDialogTitle}</Heading>
            <Content>
              <p className={hint}>{C.topicDialogLead}</p>
              <ul className={list}>
                {data.chunks.map((c) => (
                  <li key={c.chunkId}>
                    <Checkbox size="S" isSelected={!off.has(c.chunkId)} onChange={(on) => flip(c.chunkId, on)} aria-label={c.text}>
                      <span className={rowLabel}>
                        <span className={meta}>
                          <span>{clockText(c.start)}</span>
                          {multi ? <span>{names.get(c.videoId) ?? c.videoId}</span> : null}
                          {c.chapter ? <span>{c.chapter}</span> : null}
                          {c.weak ? <span className={weak}>{C.topicWeak}</span> : null}
                        </span>
                        <span className={chunkText}>{c.text}</span>
                      </span>
                    </Checkbox>
                  </li>
                ))}
              </ul>
            </Content>
            <ButtonGroup>
              <Button variant="secondary" onPress={close}>
                {C.cancel}
              </Button>
              <Button variant="accent" isDisabled={kept === 0} onPress={() => onApply(off)}>
                {C.topicUse(kept)}
              </Button>
            </ButtonGroup>
          </>
        )}
      </Dialog>
    </DialogContainer>
  );
}

/** 系列：同一项目里的另几部视频（`space.list`）；切出的短视频列出但不可选；最多再选 `SERIES_OTHERS_MAX` 部。 */
function SeriesRow({
  videoId,
  videoName,
  projectId,
  series,
  onSeries,
  onVideos,
}: {
  videoId: Id;
  videoName: string;
  projectId: Id;
  series: readonly Id[];
  onSeries(series: Id[]): void;
  onVideos(videos: SeriesVideo[]): void;
}) {
  const runtime = useRuntime();
  const [load, setLoad] = useState<Load<SeriesVideo[]>>({ state: 'loading' });
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let live = true;
    runtime.client.request('space.list', { projectId, kind: 'video', limit: 500 }).then(
      ({ entries }) => {
        if (!live) return;
        const videos = seriesVideos(entries, videoId);
        setLoad({ state: 'ok', data: videos });
        onVideos(videos);
      },
      (err) => live && setLoad({ state: 'error', error: message(err) }),
    );
    return () => {
      live = false;
    };
    // onVideos 是父组件的 setState，不变，不进依赖。
  }, [runtime, projectId, videoId]);
  const videos = load.state === 'ok' ? load.data : [];
  const names = useMemo(() => series.map((id) => videos.find((v) => v.videoId === id)?.name).filter((n): n is string => !!n), [series, videos]);
  if (load.state === 'ok' && !videos.length) return null;
  return (
    <Row label={C.seriesLabel}>
      <div className={seriesLine}>
        <span className={grow}>{names.length ? C.seriesWith(S.list(names)) : C.seriesOnlyThis}</span>
        <SectionLink isDisabled={load.state !== 'ok'} onPress={() => setOpen(true)}>
          {names.length ? C.seriesChange : C.seriesAdd}
        </SectionLink>
      </div>
      {load.state === 'error' ? <p className={hint}>{C.seriesFailed(load.error)}</p> : null}
      {open ? (
        <DialogContainer onDismiss={() => setOpen(false)}>
          <Dialog size="M">
            {({ close }) => (
              <>
                <Heading slot="title">{C.seriesTitle}</Heading>
                <Content>
                  <p className={hint}>{C.seriesLead(SERIES_OTHERS_MAX)}</p>
                  <ul className={list}>
                    <li>
                      <Checkbox size="S" isSelected isDisabled>
                        {C.seriesThis(videoName)}
                      </Checkbox>
                    </li>
                    {videos.map((v) => {
                      const on = series.includes(v.videoId);
                      return (
                        <li key={v.videoId}>
                          <Checkbox
                            size="S"
                            isSelected={on}
                            isDisabled={v.derived || (!on && series.length >= SERIES_OTHERS_MAX)}
                            onChange={(next) => onSeries(toggleSeries(series, v.videoId, next))}>
                            {v.name}
                          </Checkbox>
                          {v.derived ? <p className={hint}>{C.seriesDerived}</p> : null}
                        </li>
                      );
                    })}
                  </ul>
                </Content>
                <ButtonGroup>
                  <Button variant="accent" onPress={close}>
                    {C.seriesDone}
                  </Button>
                </ButtonGroup>
              </>
            )}
          </Dialog>
        </DialogContainer>
      ) : null}
    </Row>
  );
}

/** 生成章节的边界（§2.4）：按话题自动检测 / 由模型决定；没有本机语义时只能由模型决定。 */
export function BoundaryRow({ value, usable, onChange }: { value: 'topic' | 'model'; usable: boolean; onChange(value: 'topic' | 'model'): void }) {
  const current = usable ? value : 'model';
  return (
    <Row label={C.boundaryLabel}>
      <SegmentedControl aria-label={C.boundaryLabel} selectedKey={current} onSelectionChange={(key) => onChange(key === 'topic' ? 'topic' : 'model')}>
        <SegmentedControlItem id="topic" isDisabled={!usable}>
          {C.boundaryTopic}
        </SegmentedControlItem>
        <SegmentedControlItem id="model">{C.boundaryModel}</SegmentedControlItem>
      </SegmentedControl>
      <p className={hint}>{!usable ? C.boundaryOff : current === 'topic' ? C.boundaryTopicSub : C.boundaryModelSub}</p>
    </Row>
  );
}
