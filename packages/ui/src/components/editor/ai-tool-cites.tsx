import { Fragment, useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import Markdown from 'react-markdown';
import type { CitationAnchor, CitationParagraph, CitationsFile, Id } from '@baocut/protocol';
import { ActionButton, Badge, Link, Menu, MenuItem, MenuTrigger, Text, ToastQueue } from '@react-spectrum/s2';
import CheckmarkCircle from '@react-spectrum/s2/icons/CheckmarkCircle';
import More from '@react-spectrum/s2/icons/More';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import { clockText } from '../../model/speakers-proposal.ts';
import { citeLabel, citeStats, otherVideos } from '../../model/writing-cites.ts';
import { figureFrame, figurePlans, figureTime, nextFigure, type FigureChoice, type FigurePlan } from '../../model/writing-figures.ts';
import { useRuntime } from '../../runtime/context.tsx';
import { useShell } from '../../state/shell-store.ts';
import { useVideo } from '../../state/video-store.ts';
import { remarkPlugins } from '../thread/remark-plugins.ts';
import { useEditorActions } from './editor-context.tsx';
import { WRITING_CITES_COPY as C } from './writing-cites-copy.ts';

/*
 * 写作结果的出处（创作辅助集成设计 §2.1、§2.2、§3.4；原型 panel-aitools-cites.jsx `CitedResult`、`ParaMenu`、`Sources`、
 * `SavedLine`）：每段末尾一排时间码，点了跳到那一句；没有有效出处的正文段标「模型推断」；页首写已保存到 Space。正文段的菜单：
 * 看出处（原句与时间）、重写这一段、换材料重写…，刚重写过的几段另有撤回。重写由页面另起一次 `section` 任务（ai-tool-run.ts）。
 * 写博客勾了插图时（§2.3 的退路，原型 `Figure`）：每两段有出处的正文段后面一帧，按那段第一处出处的时间取（胶片条的小图），
 * 可换一张、去掉；页首写明按时间取帧、未按内容挑选。插图只在这一页上，不进复制与存下的文档。
 */

const stats = style({ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8, font: 'ui-xs', color: 'gray-600' });
const doc = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  padding: 12,
  borderRadius: 'lg',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: 'gray-200',
  backgroundColor: 'gray-25',
  font: 'body-sm',
  color: 'gray-900',
  lineHeight: '[1.6]',
  overflowWrap: 'anywhere',
  userSelect: 'text',
});
const para = style({ display: 'flex', flexDirection: 'column', gap: 4 });
/** 模型推断的段落：虚线左边线（原型 `wcite__p.is-inferred`）。 */
const inferredPara = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  paddingStart: 8,
  borderWidth: 0,
  borderStartWidth: 2,
  borderStyle: 'dashed',
  borderColor: 'notice-900',
});
const chips = style({ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 4 });
const inferredHint = style({ font: 'ui-xs', color: 'gray-600' });
const saved = style({ display: 'flex', alignItems: 'center', gap: 8, font: 'ui-xs', color: 'gray-700' });
const paraRow = style({ display: 'flex', alignItems: 'start', gap: 4 });
const paraMain = style({ display: 'flex', flexDirection: 'column', gap: 4, flexGrow: 1, minWidth: 0 });
/** 看出处：这一段引的原句（原型 `wcite__src`）。 */
const sources = style({ display: 'flex', flexDirection: 'column', gap: 2, padding: 8, borderRadius: 'default', backgroundColor: 'gray-75' });
const sourceRow = style({ display: 'flex', alignItems: 'baseline', gap: 4, minWidth: 0 });
const sourceTime = style({ flexShrink: 0 });
const sourceText = style({ flexGrow: 1, minWidth: 0, font: 'ui-xs', color: 'gray-800', overflowWrap: 'anywhere' });
/** 插图（原型 `wcite__fig`）：胶片条的小图按原大小放，不拉伸。 */
const figure = style({ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 4, margin: 0 });
const figureImage = style({ display: 'block', width: 160, height: 90, objectFit: 'cover', borderRadius: 'default', backgroundColor: 'gray-100' });
const figureCaption = style({ display: 'flex', alignItems: 'center', flexWrap: 'wrap', columnGap: 4, font: 'ui-xs', color: 'gray-600' });

/** 正文段菜单里的重写（DirectResultView 给）：没有时只能看出处。 */
export interface SectionActions {
  /** 刚重写过的几段（`index` 起 `span` 段）：标「重写过」，菜单里能撤回。 */
  rewritten: { index: number; span: number } | null;
  onRewrite(index: number): void;
  onMaterial(paragraph: CitationParagraph): void;
  onUndo(): void;
}

/** 系列里另几部视频的名字（跨视频出处的标签）：出处只来自这部时不查。 */
export function useCiteNames(file: CitationsFile | null, videoId: Id, projectId: Id | null): ReadonlyMap<Id, string> {
  const runtime = useRuntime();
  const others = useMemo(() => (file ? otherVideos(file, videoId) : []), [file, videoId]);
  const [names, setNames] = useState<ReadonlyMap<Id, string>>(new Map());
  useEffect(() => {
    if (!others.length || !projectId) return;
    let live = true;
    runtime.client.request('space.list', { projectId, kind: 'video', limit: 500 }).then(
      ({ entries }) => {
        if (!live) return;
        const out = new Map<Id, string>();
        for (const e of entries) if (e.ref && 'videoId' in e.ref && others.includes(e.ref.videoId)) out.set(e.ref.videoId, e.user.displayName ?? e.name);
        setNames(out);
      },
      // 查不到名字时标签写「另一部视频」，不打扰。
      () => {},
    );
    return () => {
      live = false;
    };
  }, [runtime, projectId, others]);
  return names;
}

export function CitedResult({
  file,
  videoId,
  names,
  section = null,
  figures = false,
}: {
  file: CitationsFile;
  videoId: Id;
  names: ReadonlyMap<Id, string>;
  section?: SectionActions | null;
  /** 写博客勾了「添加关键帧插图」。 */
  figures?: boolean;
}) {
  const actions = useEditorActions();
  const [open, setOpen] = useState<number | null>(null);
  const plans = useMemo(() => (figures ? new Map(figurePlans(file, videoId).map((p) => [p.index, p])) : null), [figures, file, videoId]);
  // 换了一版结果（重写、撤回）时从头配。
  const [choices, setChoices] = useState<Record<number, FigureChoice>>({});
  useEffect(() => setChoices({}), [file]);
  const s = citeStats(file);
  const seek = (a: CitationAnchor) => {
    if (a.videoId === videoId) actions.seek(a.startSec);
    else ToastQueue.info(C.otherVideoNote(names.get(a.videoId) ?? C.otherVideo, clockText(a.startSec)), { timeout: 5000 });
  };
  const line = [C.statsParas(s.paras, s.cited), s.inferred ? C.statsInferred(s.inferred) : null, s.dropped ? C.statsDropped(s.dropped) : null, s.videos > 1 ? C.statsVideos(s.videos) : null]
    .filter(Boolean)
    .join(' · ');
  return (
    <>
      <div className={stats}>
        <span>{line}</span>
        {s.cited ? <span>{C.seekHint}</span> : null}
      </div>
      {plans?.size ? <span className={inferredHint}>{C.figuresNote}</span> : null}
      <div className={doc}>
        {file.paragraphs.map((p) => {
          const plan = plans?.get(p.index);
          const choice = choices[p.index];
          return (
            <Fragment key={p.index}>
              <Paragraph
                p={p}
                label={(a) => citeLabel(a, { videoId, names, other: C.otherVideo })}
                onSeek={seek}
                open={open === p.index}
                onSources={() => setOpen((v) => (v === p.index ? null : p.index))}
                section={section}
              />
              {plan && !choice?.dropped ? (
                <ParagraphFigure
                  plan={plan}
                  choice={choice}
                  onNext={() => setChoices((c) => ({ ...c, [p.index]: nextFigure(c[p.index]) }))}
                  onDrop={() => setChoices((c) => ({ ...c, [p.index]: { pick: 0, dropped: true } }))}
                />
              ) : null}
            </Fragment>
          );
        })}
      </div>
    </>
  );
}

const isRewritten = (p: CitationParagraph, section: SectionActions | null) =>
  !!section?.rewritten && p.index >= section.rewritten.index && p.index < section.rewritten.index + section.rewritten.span;

function Paragraph({
  p,
  label,
  onSeek,
  open,
  onSources,
  section,
}: {
  p: CitationParagraph;
  label(a: CitationAnchor): string;
  onSeek(a: CitationAnchor): void;
  open: boolean;
  onSources(): void;
  section: SectionActions | null;
}) {
  const inferred = p.role === 'body' && (p.inferred || !p.cites.length);
  const rewritten = isRewritten(p, section);
  const body = (
    <div className="bc-md">
      <Markdown remarkPlugins={remarkPlugins}>{p.markdown}</Markdown>
    </div>
  );
  if (p.role === 'heading') return <div className={para}>{body}</div>;
  const act = (key: string | number) => {
    if (key === 'sources') onSources();
    else if (key === 'rewrite') section?.onRewrite(p.index);
    else if (key === 'material') section?.onMaterial(p);
    else if (key === 'undo') section?.onUndo();
  };
  return (
    <div className={paraRow}>
      <div className={paraMain}>
        <div className={inferred ? inferredPara : para}>
          {body}
          <ParagraphChips p={p} inferred={inferred} rewritten={rewritten} label={label} onSeek={onSeek} />
        </div>
        {open ? <Sources p={p} inferred={inferred} label={label} onSeek={onSeek} /> : null}
      </div>
      <MenuTrigger>
        <ActionButton isQuiet size="XS" aria-label={C.paraMenu}>
          <More />
        </ActionButton>
        <Menu aria-label={C.paraMenu} onAction={act}>
          <MenuItem id="sources" textValue={open ? C.paraHideSources : C.paraSources}>
            <Text slot="label">{open ? C.paraHideSources : C.paraSources}</Text>
          </MenuItem>
          {section ? (
            <MenuItem id="rewrite" textValue={C.paraRewrite}>
              <Text slot="label">{C.paraRewrite}</Text>
            </MenuItem>
          ) : null}
          {section ? (
            <MenuItem id="material" textValue={C.paraMaterial}>
              <Text slot="label">{C.paraMaterial}</Text>
            </MenuItem>
          ) : null}
          {rewritten ? (
            <MenuItem id="undo" textValue={C.paraUndo}>
              <Text slot="label">{C.paraUndo}</Text>
            </MenuItem>
          ) : null}
        </Menu>
      </MenuTrigger>
    </div>
  );
}

function ParagraphChips({
  p,
  inferred,
  rewritten,
  label,
  onSeek,
}: {
  p: CitationParagraph;
  inferred: boolean;
  rewritten: boolean;
  label(a: CitationAnchor): string;
  onSeek(a: CitationAnchor): void;
}) {
  const mark = rewritten ? (
    <Badge size="S" variant="neutral" fillStyle="subtle">
      {C.rewritten}
    </Badge>
  ) : null;
  return (
    <>
      {inferred ? (
        <div className={chips}>
          <Badge size="S" variant="notice" fillStyle="subtle">
            {C.inferred}
          </Badge>
          <span className={inferredHint}>{C.inferredHint}</span>
          {mark}
        </div>
      ) : (
        <div className={chips}>
          {p.cites.map((a, i) => {
            const text = label(a);
            return (
              <ActionButton key={i} isQuiet size="XS" aria-label={C.citeAria(text)} onPress={() => onSeek(a)}>
                <Text>{text}</Text>
              </ActionButton>
            );
          })}
          {mark}
        </div>
      )}
    </>
  );
}

/** 一张插图：这一刻的画面（Runtime 取的胶片条小图）、时间，换一张与去掉。落在没有画面的地方时不画。 */
function ParagraphFigure({ plan, choice, onNext, onDrop }: { plan: FigurePlan; choice: FigureChoice | undefined; onNext(): void; onDrop(): void }) {
  const video = useVideo((s) => s.video?.state?.video ?? null);
  const media = useRuntime().videos.media;
  useSyncExternalStore(media.subscribe, media.version);
  const t = figureTime(plan, choice);
  const frame = video ? figureFrame(plan.anchor, t, video) : null;
  if (!frame) return null;
  const url = media.thumbnail(frame.asset, frame.at);
  const caption = C.figureCaption(clockText(t));
  return (
    <figure className={figure}>
      {url ? <img className={figureImage} src={url} alt={caption} /> : <div className={figureImage} role="img" aria-label={caption} />}
      <figcaption className={figureCaption}>
        <span>{caption}</span>
        {plan.candidates.length > 1 ? (
          <ActionButton isQuiet size="XS" onPress={onNext}>
            <Text>{C.figureNext}</Text>
          </ActionButton>
        ) : null}
        <ActionButton isQuiet size="XS" onPress={onDrop}>
          <Text>{C.figureDrop}</Text>
        </ActionButton>
      </figcaption>
    </figure>
  );
}

/** 看出处：这一段引的原句，点时间跳过去；没有出处时说明是模型推断。 */
function Sources({ p, inferred, label, onSeek }: { p: CitationParagraph; inferred: boolean; label(a: CitationAnchor): string; onSeek(a: CitationAnchor): void }) {
  return (
    <div className={sources}>
      {inferred ? (
        <span className={inferredHint}>{C.inferredHint}</span>
      ) : (
        p.cites.map((a, i) => {
          const text = label(a);
          return (
            <div key={i} className={sourceRow}>
              <ActionButton isQuiet size="XS" styles={sourceTime} aria-label={C.citeAria(text)} onPress={() => onSeek(a)}>
                <Text>{text}</Text>
              </ActionButton>
              <span className={sourceText}>{a.text}</span>
            </div>
          );
        })
      )}
    </div>
  );
}

/** 页首那一行：结果已存成 Space 里的一份文档，可去 Space 看。 */
export function SavedLine({ projectId }: { projectId: Id | null }) {
  const go = useShell((s) => s.go);
  return (
    <div className={saved}>
      <CheckmarkCircle />
      <span>{C.saved}</span>
      <Link isStandalone isQuiet onPress={() => go({ tab: 'space', category: 'document', projectId })}>
        {C.showInSpace}
      </Link>
    </div>
  );
}
