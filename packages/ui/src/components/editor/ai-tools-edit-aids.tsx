import { useEffect, useMemo, useState } from 'react';
import type { DocumentRecord, GlossaryCandidatesResult, GlossaryContent, GlossaryDiscovery, Id, RetakeCandidatesResult, RetakeGroup, Sequence } from '@baocut/protocol';
import { EditLabel } from '@baocut/protocol/messages/ui';
import { ActionButton, Button, Checkbox, Menu, MenuItem, MenuTrigger, ProgressCircle, Text, ToastQueue } from '@react-spectrum/s2';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import { checkedPlaces, discoveredTerm, glossaryEdit, keptTake, markPieces, retakeCuts, retakeWordIndexes, takeSeconds } from '../../model/edit-aids.ts';
import { addTranscriptionTerms } from '../../model/library-glossary.ts';
import { M as SEMANTIC_COPY } from '../../model/semantic-copy.ts';
import { readSpeechWords } from '../../model/speech-cues.ts';
import { clockText } from '../../model/speakers-proposal.ts';
import { cutOperations, transcriptWords } from '../../model/transcript-cut.ts';
import { useRuntime } from '../../runtime/context.tsx';
import { getLibraryEntry, putLibraryEntry } from '../../runtime/library-commands.ts';
import { useLibrary } from '../../state/library-store.ts';
import { useSetting } from '../../state/settings-store.ts';
import { useShell } from '../../state/shell-store.ts';
import { useVideo } from '../../state/video-store.ts';
import { SemanticNote } from '../semantic-note.tsx';
import { SectionLink } from '../tools/tool-parts.tsx';
import { useEditorActions } from './editor-context.tsx';
import { EDIT_AIDS_COPY as C } from './edit-aids-copy.ts';
import { applyCut } from './transcript-actions.ts';
import { TRANSCRIPT_COPY } from './transcript-copy.ts';
import { useDocumentBody } from './use-document-body.ts';

/*
 * 润色的术语候选与从文稿发现的术语、找可剪的口的重录（创作辅助集成设计 §2.5、§2.7；原型 panel-aitools-semantic.jsx
 * `TermOption`、`TermCandidates`、`RetakeGroups`，发现的术语并进原型 glossary-tool.jsx `GlossaryHarvest` 的那张清单）。
 *
 * 候选由 Runtime 的只读方法给（`edits.glossaryCandidates`、`edits.retakeCandidates`），这里只画、只在用户勾了或确认了之后提交
 * 一笔普通编辑：术语是一笔 `updateWords`，重录是一笔 `addCuts`，都在提示里给撤销。不预勾，不自动应用。原型把两块放在工具跑完
 * 后的结果页；这里候选不依赖工具那一趟，放在参数页，按视频当前版本现查（改了文稿、剪了口会重查）。只在桌面端（AI 工具页）。
 */

const section = style({ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 });
const head = style({ display: 'flex', alignItems: 'center', gap: 8, font: 'ui', fontWeight: 'bold', color: 'gray-900' });
const hint = style({ margin: 0, font: 'ui-xs', color: 'gray-600', lineHeight: '[1.5]' });
const list = style({ display: 'flex', flexDirection: 'column', gap: 8, margin: 0, padding: 0, listStyleType: 'none' });
const item = style({ display: 'flex', alignItems: 'start', gap: 4 });
const main = style({ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0, flexGrow: 1 });
const lineRow = style({ display: 'flex', alignItems: 'center', flexWrap: 'wrap', columnGap: 8, rowGap: 2, font: 'ui-sm', color: 'gray-800', minWidth: 0 });
const from = style({ color: 'gray-600', textDecoration: 'line-through', overflowWrap: 'anywhere' });
const to = style({ fontWeight: 'bold', color: 'gray-900', overflowWrap: 'anywhere' });
const count = style({ font: 'ui-xs', color: 'gray-600' });
const why = style({ font: 'ui-xs', color: 'gray-600' });
const times = style({ display: 'flex', flexWrap: 'wrap', gap: 2 });
const foot = style({ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8 });
const group = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: 8,
  borderRadius: 'default',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: { default: 'gray-200', isOn: 'blue-800' },
});
const groupHead = style({ display: 'flex', alignItems: 'center', gap: 8, font: 'ui-sm', fontWeight: 'bold', color: 'gray-900' });
const grow = style({ flexGrow: 1, minWidth: 0 });
const take = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  paddingStart: 8,
  borderWidth: 0,
  borderStartWidth: 2,
  borderStyle: 'solid',
  borderColor: { default: 'gray-200', isKeep: 'green-800' },
});
const takeText = style({ font: 'ui-sm', color: 'gray-800', overflowWrap: 'anywhere' });
const mark = style({ backgroundColor: 'notice-subtle', color: 'gray-900', borderRadius: 'sm' });
const kept = style({ font: 'ui-xs', fontWeight: 'bold', color: 'positive-900' });
const differ = style({ font: 'ui-xs', color: 'notice-900' });
const subHead = style({ marginTop: 4, font: 'detail', fontWeight: 'bold', color: 'gray-700' });
const busy = style({ display: 'flex', alignItems: 'center', gap: 8, font: 'ui-xs', color: 'gray-600' });

const message = (err: unknown) => (err instanceof Error ? err.message : String(err));

type Load<T> = { state: 'loading' } | { state: 'ok'; data: T } | { state: 'error'; error: string };

/** 按视频当前版本查一次候选；`enabled` 为 false 时不发请求（设置里关掉的入口一个请求都不发）。 */
function useEditAid<M extends 'edits.glossaryCandidates' | 'edits.retakeCandidates'>(
  method: M,
  videoId: Id,
  documentId: Id,
  enabled: boolean,
): { load: Load<M extends 'edits.glossaryCandidates' ? GlossaryCandidatesResult : RetakeCandidatesResult>; retry(): void } {
  const runtime = useRuntime();
  const revision = useVideo((s) => s.video?.state?.video.revision ?? null);
  const [nonce, setNonce] = useState(0);
  const [load, setLoad] = useState<Load<never>>({ state: 'loading' });
  useEffect(() => {
    if (!enabled) return;
    let live = true;
    setLoad({ state: 'loading' });
    runtime.client.request(method, { videoId, documentId }).then(
      (data) => live && setLoad({ state: 'ok', data } as never),
      (err) => live && setLoad({ state: 'error', error: message(err) }),
    );
    return () => {
      live = false;
    };
  }, [runtime, method, videoId, documentId, enabled, revision, nonce]);
  return { load: load as never, retry: () => setNonce((n) => n + 1) };
}

function Loading({ text }: { text: string }) {
  return (
    <div className={busy} role="status">
      <ProgressCircle size="S" isIndeterminate aria-label={text} />
      {text}
    </div>
  );
}

function Failed({ error, retry }: { error: string; retry(): void }) {
  return (
    <div className={foot}>
      <p className={hint}>{C.failed(error)}</p>
      <SectionLink onPress={retry}>{C.retry}</SectionLink>
    </div>
  );
}

/** 一处出现的时间：点了跳过去。 */
function Times({ starts }: { starts: readonly number[] }) {
  const actions = useEditorActions();
  return (
    <span className={times}>
      {starts.map((at, i) => (
        <ActionButton key={i} isQuiet size="XS" onPress={() => actions.seek(at)}>
          <Text>{clockText(at)}</Text>
        </ActionButton>
      ))}
    </span>
  );
}

// ---- 润色：术语候选 ----

/** 设置 › 语义索引里「术语候选」的开关（默认开）。 */
export function useGlossaryCandidatesSetting(): boolean {
  return useSetting('semantic.glossaryCandidates') ?? true;
}

/**
 * 参数页的勾选项「按术语表找疑似误听」。设置里关掉时置灰、写原因、给去设置的入口（渠道关了也照样露出来，写明为什么）；候选那一节
 * 由调用方在 `allowed && on` 时才画，关掉时一个请求都不发。
 */
export function GlossaryOption({ on, onChange }: { on: boolean; onChange(on: boolean): void }) {
  const allowed = useGlossaryCandidatesSetting();
  const web = useRuntime().host.platform === 'web';
  const go = useShell((s) => s.go);
  return (
    <div className={style({ display: 'flex', flexDirection: 'column', minWidth: 0 })}>
      <Checkbox size="S" isSelected={allowed && on} isDisabled={!allowed} onChange={onChange}>
        {C.termOption}
      </Checkbox>
      <div className={style({ display: 'flex', alignItems: 'center', flexWrap: 'wrap', columnGap: 8, paddingStart: 24 })}>
        <span className={why}>{allowed ? C.termOptionSub : C.termOff}</span>
        {allowed || web ? null : <SectionLink onPress={() => go({ tab: 'settings', section: 'semantic' })}>{SEMANTIC_COPY.note.openSettings}</SectionLink>}
      </div>
    </div>
  );
}

/** 润色参数页的术语候选：设置开着、勾选项勾着才挂上，否则一个请求都不发（设置 › 语义索引的「术语候选」）。 */
export function PolishTermCandidates({ videoId, documentId, on }: { videoId: Id; documentId: Id; on: boolean }) {
  const allowed = useGlossaryCandidatesSetting();
  return allowed && on ? <TermCandidates videoId={videoId} documentId={documentId} /> : null;
}

/** 术语候选与从文稿发现的术语。 */
function TermCandidates({ videoId, documentId }: { videoId: Id; documentId: Id }) {
  const actions = useEditorActions();
  const { load, retry } = useEditAid('edits.glossaryCandidates', videoId, documentId, true);
  const [checked, setChecked] = useState<ReadonlySet<string>>(new Set());
  const [applying, setApplying] = useState(false);
  // 视频变了、候选重查之后，勾选跟着清掉（已经改掉的那些不会再列出来）。
  useEffect(() => setChecked(new Set()), [load]);

  if (load.state === 'loading') return <Loading text={C.termLoading} />;
  if (load.state === 'error') return <Failed error={load.error} retry={retry} />;
  const r = load.data;
  const places = checkedPlaces(r.candidates, checked);
  const apply = async () => {
    const edit = glossaryEdit(r.documentId, r.candidates, checked);
    if (!edit) return;
    setApplying(true);
    try {
      const receipt = await actions.apply(edit.operations, EditLabel.replaceText());
      if (!receipt) return;
      ToastQueue.positive(C.termApplied(edit.places), {
        timeout: 5000,
        actionLabel: TRANSCRIPT_COPY.undo,
        onAction: () => void actions.undo({ transaction: receipt.transactionId }),
        shouldCloseOnAction: true,
      });
    } finally {
      setApplying(false);
    }
  };
  const toggle = (id: string, on: boolean) =>
    setChecked((s) => {
      const next = new Set(s);
      if (on) next.add(id);
      else next.delete(id);
      return next;
    });

  return (
    <>
      <section className={section} aria-label={C.termTitle(r.candidates.length)}>
        <div className={head}>{C.termTitle(r.candidates.length)}</div>
        <p className={hint}>{C.termIntro}</p>
        <SemanticNote entry="terms" reason={r.effectiveMode === 'lexical' ? (r.reason ?? 'MODEL_NOT_INSTALLED') : null} />
        {r.glossaries === 0 ? (
          <p className={hint}>{C.termNoGlossary}</p>
        ) : !r.candidates.length ? (
          <p className={hint}>{C.termNone}</p>
        ) : (
          <>
            <ul className={list}>
              {r.candidates.map((c) => (
                <li key={c.id} className={item}>
                  <Checkbox size="S" aria-label={C.termReplace(c.from, c.to)} isSelected={checked.has(c.id)} onChange={(on) => toggle(c.id, on)} />
                  <div className={main}>
                    <span className={lineRow}>
                      <span className={from}>{c.from}</span>
                      <span aria-hidden="true">→</span>
                      <span className={to}>{c.to}</span>
                      <span className={count}>{C.termPlaces(c.occurrences.length)}</span>
                    </span>
                    <span className={lineRow}>
                      <span className={why}>{c.mode === 'semantic' ? C.termSemantic(c.glossaryName) : C.termExact}</span>
                      <Times starts={c.occurrences.map((o) => o.start)} />
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <div className={foot}>
              <Button size="S" variant="accent" isDisabled={!places} isPending={applying} onPress={() => void apply()}>
                {C.termApply(places)}
              </Button>
            </div>
          </>
        )}
      </section>
      {r.discovered.length ? <Discovered terms={r.discovered} /> : null}
    </>
  );
}

/** 从文稿发现、库里还没有的专名：逐条加进一张识别用术语表（`library.put`，带版本号）。不预先收。 */
function Discovered({ terms }: { terms: readonly GlossaryDiscovery[] }) {
  const runtime = useRuntime();
  const web = runtime.host.platform === 'web';
  const go = useShell((s) => s.go);
  const all = useLibrary((s) => s.glossaries);
  const glossaries = useMemo(() => all.filter((g) => g.kind === 'transcription'), [all]);
  const [added, setAdded] = useState<ReadonlySet<string>>(new Set());
  const add = async (d: GlossaryDiscovery, glossaryId: Id) => {
    const summary = glossaries.find((g) => g.id === glossaryId);
    if (!summary) return;
    try {
      const entry = await getLibraryEntry(runtime, { library: 'glossaries', id: summary.id, version: summary.version });
      const content = entry.content as GlossaryContent;
      if (content.kind !== 'transcription') return;
      const result = addTranscriptionTerms(content.terms, [discoveredTerm(d)]);
      await putLibraryEntry(runtime, { library: 'glossaries', id: entry.id, expectedVersion: entry.version, content: { ...content, terms: result.terms } });
      setAdded((s) => new Set(s).add(d.key));
      ToastQueue.positive(result.added ? C.discoverAdded(d.source, content.name) : C.discoverMerged(d.source, content.name), { timeout: 4000 });
    } catch (err) {
      ToastQueue.negative(C.discoverFailed(message(err)), { timeout: 6000 });
    }
  };
  return (
    <section className={section} aria-label={C.discoverTitle(terms.length)}>
      <div className={head}>{C.discoverTitle(terms.length)}</div>
      <p className={hint}>{C.discoverIntro}</p>
      {glossaries.length ? null : (
        <div className={foot}>
          <p className={hint}>{C.discoverNoGlossary}</p>
          {web ? null : <SectionLink onPress={() => go({ tab: 'settings', section: 'glossary' })}>{C.glossaries}</SectionLink>}
        </div>
      )}
      <ul className={list}>
        {terms.map((d) => (
          <li key={d.key} className={item}>
            <div className={main}>
              <span className={lineRow}>
                <span className={to}>{d.source}</span>
                <span className={count}>{d.forms.map((f) => C.discoverForm(f.text, f.count)).join(' · ')}</span>
              </span>
            </div>
            {glossaries.length ? (
              <MenuTrigger align="end">
                <ActionButton size="XS" isDisabled={added.has(d.key)}>
                  <Text>{C.discoverAdd}</Text>
                </ActionButton>
                <Menu onAction={(key) => void add(d, String(key))}>
                  {glossaries.map((g) => (
                    <MenuItem key={g.id} id={g.id}>
                      {g.name}
                    </MenuItem>
                  ))}
                </Menu>
              </MenuTrigger>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

// ---- 找可剪的口：重录 ----

/** 找可剪的口参数页的勾选项「重录」：只管这一节画不画、查不查，不进交给 Agent 的提示词（重录由本机找）。 */
export function RetakeOption({ on, onChange }: { on: boolean; onChange(on: boolean): void }) {
  return (
    <div className={style({ display: 'flex', flexDirection: 'column', minWidth: 0 })}>
      <Checkbox size="S" isSelected={on} onChange={onChange}>
        {C.retakeOption}
      </Checkbox>
      <span className={style({ paddingStart: 24, font: 'ui-xs', color: 'gray-600' })}>{C.retakeOptionSub}</span>
    </div>
  );
}

const seconds = (s: number) => s.toFixed(1);

export function RetakeGroups({ videoId, speech, sequence }: { videoId: Id; speech: DocumentRecord; sequence: Sequence }) {
  const actions = useEditorActions();
  const assets = useVideo((s) => s.video?.state?.video.assets);
  const body = useDocumentBody(speech);
  const { load, retry } = useEditAid('edits.retakeCandidates', videoId, speech.id, true);
  const [confirmed, setConfirmed] = useState<ReadonlySet<string>>(new Set());
  const [keepOf, setKeepOf] = useState<Record<string, number>>({});
  const [applying, setApplying] = useState(false);
  useEffect(() => {
    setConfirmed(new Set());
    setKeepOf({});
  }, [load]);
  const words = useMemo(() => {
    const assetId = speech.sourceAssetId;
    const read = body === undefined || !assetId ? null : readSpeechWords(body);
    return read && assetId ? transcriptWords(sequence, assetId, read.words) : null;
  }, [body, speech.sourceAssetId, sequence]);

  if (load.state === 'loading') return <Loading text={C.retakeLoading} />;
  if (load.state === 'error') return <Failed error={load.error} retry={retry} />;
  const groups = load.data.groups;
  const same = groups.filter((g) => !g.differ);
  const different = groups.filter((g) => g.differ);
  const cuts = retakeCuts(groups, confirmed, keepOf);
  const total = cuts.reduce((s, t) => s + takeSeconds(t), 0);
  const apply = async () => {
    const assetId = speech.sourceAssetId;
    if (!words || !assets || !assetId || !cuts.length) return;
    setApplying(true);
    try {
      await applyCut(actions, cutOperations(sequence, assets, assetId, words, retakeWordIndexes(cuts, words)), sequence.fps);
    } finally {
      setApplying(false);
    }
  };
  const confirm = (id: string, on: boolean) =>
    setConfirmed((s) => {
      const next = new Set(s);
      if (on) next.add(id);
      else next.delete(id);
      return next;
    });
  const render = (g: RetakeGroup) => (
    <Group
      key={g.id}
      group={g}
      keep={keptTake(g, keepOf)}
      on={confirmed.has(g.id)}
      onKeep={(i) => setKeepOf((k) => ({ ...k, [g.id]: i }))}
      onConfirm={(on) => confirm(g.id, on)}
    />
  );

  return (
    <section className={section} aria-label={C.retakeTitle(same.length)}>
      <div className={head}>{C.retakeTitle(same.length)}</div>
      <p className={hint}>{C.retakeIntro}</p>
      <SemanticNote entry="retakes" reason={load.data.effectiveMode === 'lexical' ? (load.data.reason ?? 'MODEL_NOT_INSTALLED') : null} />
      {groups.length ? null : <p className={hint}>{C.retakeNone}</p>}
      {same.map(render)}
      {different.length ? (
        <>
          <div className={subHead}>{C.retakeDiffer}</div>
          {different.map(render)}
        </>
      ) : null}
      {groups.length ? (
        <div className={foot}>
          <Button size="S" variant="accent" isDisabled={!confirmed.size || !words} isPending={applying} onPress={() => void apply()}>
            {C.retakeApply(confirmed.size)}
          </Button>
          <span className={why}>{cuts.length ? C.retakePending(cuts.length, seconds(total)) : C.retakeNoneConfirmed}</span>
        </div>
      ) : null}
    </section>
  );
}

function Group({
  group: g,
  keep,
  on,
  onKeep,
  onConfirm,
}: {
  group: RetakeGroup;
  keep: number;
  on: boolean;
  onKeep(index: number): void;
  onConfirm(on: boolean): void;
}) {
  const actions = useEditorActions();
  const first = g.takes[0]!;
  return (
    <div className={group({ isOn: on })}>
      <div className={groupHead}>
        <span className={grow}>{C.retakeGroup(clockText(first.start), g.takes.length)}</span>
        <Checkbox size="S" isSelected={on} onChange={onConfirm}>
          {g.differ ? C.retakeConfirmDiffer : C.retakeConfirm}
        </Checkbox>
      </div>
      {g.differ && g.differences.length ? (
        <span className={differ}>{C.retakeDiffers(g.differences.map((d) => C.retakeDifference[d]).join(', '))}</span>
      ) : null}
      {g.takes.map((t, i) => (
        <div key={t.sentenceId} className={take({ isKeep: i === keep })}>
          <span className={lineRow}>
            <ActionButton isQuiet size="XS" onPress={() => actions.seek(t.start)}>
              <Text>{clockText(t.start)}</Text>
            </ActionButton>
            <span className={takeText}>
              {g.differ
                ? markPieces(t.text, t.marks).map((p, k) =>
                    p.hl ? (
                      <mark key={k} className={mark}>
                        {p.text}
                      </mark>
                    ) : (
                      <span key={k}>{p.text}</span>
                    ),
                  )
                : t.text}
            </span>
          </span>
          <span className={lineRow}>
            <span className={why}>{C.retakeMeta(seconds(takeSeconds(t)), t.complete)}</span>
            {i === keep ? (
              <span className={kept}>{C.retakeKept}</span>
            ) : (
              <SectionLink onPress={() => onKeep(i)}>{C.retakeKeep}</SectionLink>
            )}
          </span>
        </div>
      ))}
      <span className={why}>{g.differ ? C.retakeDifferHint : C.retakeSuggest(clockText(g.takes[keep]!.start))}</span>
    </div>
  );
}
