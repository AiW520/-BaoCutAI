import { useEffect, useState } from 'react';
import {
  AI_TOOL_SECTION_CHUNKS,
  AI_TOOL_SECTION_CITE_PREFIX,
  SEMANTIC_QUERY_MAX_CHARS,
  type CitationParagraph,
  type CitationsFile,
  type Id,
  type SpaceRelevantChunksResult,
} from '@baocut/protocol';
import { Button, ButtonGroup, Checkbox, Content, Dialog, DialogContainer, Heading, ProgressCircle } from '@react-spectrum/s2';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import { clockText } from '../../model/speakers-proposal.ts';
import { useRuntime } from '../../runtime/context.tsx';
import { SemanticNote } from '../semantic-note.tsx';
import { SectionLink } from '../tools/tool-parts.tsx';
import { WRITING_CITES_COPY as C } from './writing-cites-copy.ts';

/*
 * 换材料重写一段（创作辅助集成设计 §2.2「这段不对」；原型 panel-aitools-cites.jsx `MaterialDialog`）：列这一段原来的出处（默认勾上）
 * 与按这一段文字重新找到的句群（`space.relevantChunks`，与 Runtime 重写时同一个查询，默认不勾），勾掉的交回作
 * `AiToolSection.exclude`。与原型的出入：候选不限于这次发给模型的句子，而是 Runtime 重写时真正会用的那些。
 */

const hint = style({ margin: 0, font: 'ui-xs', color: 'gray-600', lineHeight: '[1.5]' });
const group = style({ marginTop: 8, marginBottom: 4, marginX: 0, font: 'ui-sm', fontWeight: 'bold', color: 'gray-800' });
const list = style({ display: 'flex', flexDirection: 'column', gap: 8, margin: 0, padding: 0, listStyleType: 'none' });
const rowLabel = style({ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 });
const meta = style({ display: 'flex', flexWrap: 'wrap', columnGap: 8, font: 'ui-xs', color: 'gray-600' });
const rowText = style({ font: 'ui-sm', color: 'gray-800', overflowWrap: 'anywhere' });
const busy = style({ display: 'flex', alignItems: 'center', gap: 8, font: 'ui-xs', color: 'gray-600' });
const line = style({ display: 'flex', alignItems: 'center', flexWrap: 'wrap', columnGap: 8, font: 'ui-xs', color: 'gray-600' });

type Load = { state: 'loading' } | { state: 'ok'; data: SpaceRelevantChunksResult } | { state: 'error'; error: string };

export interface MaterialRow {
  id: string;
  videoId: Id;
  start: number;
  text: string;
  chapter: string | null;
}

/** 原来的出处：编号是 `cite:<第几处>`（`AiToolSection.exclude` 的写法）。 */
export function citedRows(p: CitationParagraph): MaterialRow[] {
  return p.cites.map((a, i) => ({ id: `${AI_TOOL_SECTION_CITE_PREFIX}${i}`, videoId: a.videoId, start: a.startSec, text: a.text, chapter: null }));
}

/** 重新找到的句群：Runtime 只用时间线上的讲话，源时间的不列。 */
export function foundRows(data: SpaceRelevantChunksResult): MaterialRow[] {
  return data.chunks.filter((c) => c.clock === 'sequence').map((c) => ({ id: c.chunkId, videoId: c.videoId, start: c.start, text: c.text, chapter: c.chapter }));
}

/** 勾掉的：原来的出处与找到的句群里没勾的；找到的句群默认不勾。 */
export function materialExclude(rows: readonly MaterialRow[], on: ReadonlySet<string>): string[] {
  return rows.filter((r) => !on.has(r.id)).map((r) => r.id);
}

/** 与 Runtime 重写时同一个意图（这一段原文），按接口上限截断。 */
export const sectionIntent = (p: CitationParagraph): string => p.markdown.slice(0, SEMANTIC_QUERY_MAX_CHARS * 4);

export function SectionMaterialDialog({
  file,
  paragraph,
  names,
  onApply,
  onClose,
}: {
  file: CitationsFile;
  paragraph: CitationParagraph;
  names: ReadonlyMap<Id, string>;
  onApply(exclude: string[]): void;
  onClose(): void;
}) {
  const runtime = useRuntime();
  const cited = citedRows(paragraph);
  const [on, setOn] = useState<Set<string>>(() => new Set(cited.map((r) => r.id)));
  const [load, setLoad] = useState<Load>({ state: 'loading' });
  const [nonce, setNonce] = useState(0);
  const videoIds = file.videoIds.length ? file.videoIds : [];
  useEffect(() => {
    if (!videoIds.length) {
      setLoad({ state: 'ok', data: { effectiveMode: 'none', reason: null, coverage: { chapters: [], stale: false }, chunks: [] } });
      return;
    }
    let live = true;
    setLoad({ state: 'loading' });
    runtime.client.request('space.relevantChunks', { intent: sectionIntent(paragraph), videoIds, limit: AI_TOOL_SECTION_CHUNKS }).then(
      (data) => live && setLoad({ state: 'ok', data }),
      (err) => live && setLoad({ state: 'error', error: err instanceof Error ? err.message : String(err) }),
    );
    return () => {
      live = false;
    };
    // 这一段与视频不变，只在重试时重查。
  }, [runtime, nonce]);
  const found = load.state === 'ok' ? foundRows(load.data) : [];
  const rows = [...cited, ...found];
  const picked = rows.filter((r) => on.has(r.id)).length;
  const multi = videoIds.length > 1;
  const flip = (id: string, next: boolean) =>
    setOn((s) => {
      const out = new Set(s);
      if (next) out.add(id);
      else out.delete(id);
      return out;
    });
  const row = (r: MaterialRow) => (
    <li key={r.id}>
      <Checkbox size="S" isSelected={on.has(r.id)} onChange={(next) => flip(r.id, next)} aria-label={r.text}>
        <span className={rowLabel}>
          <span className={meta}>
            <span>{clockText(r.start)}</span>
            {multi ? <span>{names.get(r.videoId) ?? C.otherVideo}</span> : null}
            {r.chapter ? <span>{r.chapter}</span> : null}
          </span>
          <span className={rowText}>{r.text}</span>
        </span>
      </Checkbox>
    </li>
  );
  return (
    <DialogContainer onDismiss={onClose}>
      <Dialog size="L">
        {({ close }) => (
          <>
            <Heading slot="title">{C.materialTitle}</Heading>
            <Content>
              <p className={hint}>{C.materialLead}</p>
              {cited.length ? (
                <>
                  <h4 className={group}>{C.materialCited}</h4>
                  <ul className={list}>{cited.map(row)}</ul>
                </>
              ) : null}
              <h4 className={group}>{C.materialFound}</h4>
              {load.state === 'loading' ? (
                <div className={busy} role="status">
                  <ProgressCircle size="S" isIndeterminate aria-label={C.materialLoading} />
                  {C.materialLoading}
                </div>
              ) : load.state === 'error' ? (
                <div className={line}>
                  <span>{C.materialFailed(load.error)}</span>
                  <SectionLink onPress={() => setNonce((n) => n + 1)}>{C.retry}</SectionLink>
                </div>
              ) : found.length ? (
                <ul className={list}>{found.map(row)}</ul>
              ) : (
                <>
                  <p className={hint}>{C.materialNone}</p>
                  {/* 没装语义模型时说清楚为什么找不到；别的退回原因（整篇、章节）对重写一段不适用，不写。 */}
                  {load.data.reason === 'MODEL_NOT_INSTALLED' ? <SemanticNote entry="topic" reason={load.data.reason} /> : null}
                </>
              )}
            </Content>
            <ButtonGroup>
              <Button variant="secondary" onPress={close}>
                {C.cancel}
              </Button>
              {/* 句群还没查回来时不能开跑：Runtime 会用到这些，没列出来就没法勾掉。 */}
              <Button variant="accent" isDisabled={picked === 0 || load.state === 'loading'} onPress={() => onApply(materialExclude(rows, on))}>
                {C.materialUse(picked)}
              </Button>
            </ButtonGroup>
          </>
        )}
      </Dialog>
    </DialogContainer>
  );
}
