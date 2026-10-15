/** widget-panel: restored from WidgetPanel-3Iw60EMJ.js. */
import { originalJsxProps, originalJsxsProps } from "./jsx-runtime";
import type { Dynamic } from "./types";
import * as npmDependency5 from "@codemirror/lang-javascript";
const javascript: Dynamic = (npmDependency5 as Dynamic).javascript;
import * as npmDependency4 from "@codemirror/commands";
const history: Dynamic = (npmDependency4 as Dynamic).history;
const historyKeymap: Dynamic = (npmDependency4 as Dynamic).historyKeymap;
const defaultKeymap: Dynamic = (npmDependency4 as Dynamic).defaultKeymap;
import * as npmDependency3 from "@codemirror/language";
const HighlightStyle: Dynamic = (npmDependency3 as Dynamic).HighlightStyle;
const syntaxHighlighting: Dynamic = (npmDependency3 as Dynamic)
  .syntaxHighlighting;
import * as npmDependency2 from "@lezer/highlight";
const tags: Dynamic = (npmDependency2 as Dynamic).tags;
import * as npmDependency1 from "@codemirror/view";
const Decoration: Dynamic = (npmDependency1 as Dynamic).Decoration;
const EditorView: Dynamic = (npmDependency1 as Dynamic).EditorView;
const keymap: Dynamic = (npmDependency1 as Dynamic).keymap;
const lineNumbers: Dynamic = (npmDependency1 as Dynamic).lineNumbers;
import * as npmDependency0 from "@codemirror/state";
const StateField: Dynamic = (npmDependency0 as Dynamic).StateField;
const Compartment: Dynamic = (npmDependency0 as Dynamic).Compartment;
const StateEffect: Dynamic = (npmDependency0 as Dynamic).StateEffect;
const Transaction: Dynamic = (npmDependency0 as Dynamic).Transaction;
const EditorState: Dynamic = (npmDependency0 as Dynamic).EditorState;
const __vite__mapDeps: Dynamic = (..._extraArguments: unknown[]): Dynamic => [];
import { r as toModuleNamespace } from "./rolldown-runtime";
import {
  Aj as resolvePlatformSessionAndSourcesWeekday,
  CO as resolveEditorAnchorsAndMentionsRoutines,
  Ch as threadRefOf,
  Ct as resolvePlatformLiveDocumentAndHistoryWidgetRunMessage,
  DO as resolveEditorAnchorsAndMentionsReads,
  EO as resolveEditorAnchorsAndMentionsSplit,
  Fc as resolvePlatformSyncAndRoutingScheduled3,
  Fn as PlatformLiveDocumentAndHistoryCreate,
  Gf as useCommentStore,
  Gr as resolveEditorSelectionAndTablesValue12,
  HM as loadReact,
  IM as usePlatformFeatureFlagsUseSyncExternalStore,
  Jr as EditorSelectionAndTablesByKey2,
  Kr as updateEditorSelectionAndTablesPublished,
  Mn as loadPlatformLiveDocumentAndHistoryContainer,
  Nn as loadPlatformLiveDocumentAndHistoryStatus2,
  Qg as resolvePlatformApiAndAuthUseContext2,
  Qr as resolveEditorSelectionAndTablesValue11,
  St as resolvePlatformLiveDocumentAndHistoryWidgetNodeState,
  TO as resolveEditorAnchorsAndMentionsValue7,
  Tm as updateDataModelSchemasValue,
  UE as loadJsxRuntime,
  Xr as EditorSelectionAndTablesByKey,
  Zr as EditorSelectionAndTablesState3,
  _O as editorAnchorsAndMentionsPattern2,
  _h as isRunProgress,
  ai as resolveEditorSelectionAndTablesPref,
  bO as resolveEditorAnchorsAndMentionsIncludes,
  bT as loadReactDom,
  bt as resolvePlatformLiveDocumentAndHistoryWidgetBundle,
  cO as resolveEditorAnchorsAndMentionsRef3,
  fA as baseKeyNames,
  hC as Button,
  hh as isNodeThread,
  iE as UiOverlaysAndIconsCustomIcon,
  i_ as liveDoor,
  ii as resolveEditorSelectionAndTablesPref2,
  jn as loadPlatformLiveDocumentAndHistoryCode,
  mA as shiftedKeyNames,
  m_ as api,
  pA as keyName,
  ph as isBuildConversation,
  pl as resolvePlatformSyncAndRoutingCompact,
  qf as useThreads,
  t_ as apiFetcher,
  wh as widgetAnchorOfThread,
  wt as resolvePlatformLiveDocumentAndHistoryWidgetSession,
  xC as Tooltip,
  xO as resolveEditorAnchorsAndMentionsMetadata,
  xt as resolvePlatformLiveDocumentAndHistoryWidgetNodeLog,
  yC as DisabledReasonTooltip,
  yO as resolveEditorAnchorsAndMentionsNames,
} from "./platform-core";
import { t as preloadModule } from "./preload";
import { B as Collapsible, O as TextArea } from "./cds";
import {
  a as UserReferenceChip,
  n as DrillReferenceChip,
  r as ArtifactReferenceChip,
} from "./ref-chips";
import {
  d as useProvenanceTimeFormat,
  f as isWidgetBuildRunning,
  l as WidgetProvenanceTrigger,
  p as useNodeEngineNames,
  u as widgetProvenanceAuthors,
} from "./docs-app";
import {
  D as EMPTY_PREVIEW_COMMENTS,
  E as censusTotal,
  O as usePreviewCommentsStore,
  T as censusWarnings,
  w as useCensusStore,
} from "./platform-lazy";
var ReactDOM: Dynamic = toModuleNamespace(loadReactDom(), 1);
var React: Dynamic = toModuleNamespace(loadReact(), 1);
var jsxRuntime: Dynamic = loadJsxRuntime();
function ReferenceText(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [value, value2]: Dynamic = (0, React.useState)(null);
  let value3: Dynamic = resolveEditorAnchorsAndMentionsRef3(input.text);
  let index: Dynamic = 0;
  return (
    <jsxRuntime.Fragment>
      {value3
        .map((input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          let value4: Dynamic = `@${index}`;
          index +=
            input2.type === `text`
              ? input2.text.length
              : input2.ref.length + (input2.label?.length ?? 0);
          return {
            t: input2,
            key: value4,
          };
        })
        .map(
          (
            { t: entry, key: input2 }: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            entry.type === `text` ? (
              <React.Fragment
                {...originalJsxProps(
                  {
                    children: entry.text,
                  },
                  input2,
                )}
              />
            ) : (
              <ArtifactReferenceChip
                {...originalJsxProps(
                  {
                    refStr: entry.ref,
                    label: entry.label,
                    kind: entry.kind,
                    container: input.container,
                    onDrillRun: (
                      input3?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic =>
                      value2(
                        (
                          input4?: Dynamic,
                          ..._extraArguments: unknown[]
                        ): Dynamic => (input4 === input3 ? null : input3),
                      ),
                  },
                  input2,
                )}
              />
            ),
        )}
      {value && (
        <div className={`border-strong/40 mt-1 border-l pl-2`}>
          <DrillReferenceChip container={input.container} refStr={value} />
        </div>
      )}
    </jsxRuntime.Fragment>
  );
}
function StampedAddressesForNode(
  { nodeKey: input }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    <StampedAddressesSection
      census={useCensusStore(
        (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          input2.byKey.get(input),
      )}
    />
  );
}
function StampedAddressesSection(
  { census: input }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [value, value2]: Dynamic = (0, React.useState)(false);
  let value3: Dynamic = censusWarnings(input);
  if (value3.length === 0) return null;
  let match: Dynamic = value3.find(
    (input2?: Dynamic, ..._extraArguments: unknown[]) =>
      input2.key === `misses`,
  );
  return (
    <Collapsible.Root
      open={value}
      onOpenChange={value2}
      className={`shrink-0 border-t`}
      data-testid={`widget-stamped-addresses`}
    >
      <Collapsible.Trigger
        className={`text-muted text-caption w-full items-center gap-1.5 px-3 py-1.5 text-left font-semibold tracking-wide uppercase`}
        data-testid={`widget-stamped-addresses-toggle`}
      >
        {`Addresses on the page (`}
        {censusTotal(input)}
        {`)`}
      </Collapsible.Trigger>
      {!value && match !== undefined && (
        <div
          className={`text-secondary text-caption px-3 pb-1.5`}
          data-testid={`widget-stamped-addresses-misses`}
        >
          {match.label}
        </div>
      )}
      <Collapsible.Panel>
        <div className={`pb-1.5`}>
          <StampedAddressLines lines={value3} />
        </div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}
function StampedAddressLines(
  { lines: input }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    <div
      className={`text-caption max-h-[10lh] overflow-y-auto px-3`}
      data-testid={`widget-stamped-addresses-list`}
    >
      {input.map(
        (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
          <div
            {...originalJsxsProps(
              {
                children: [
                  <div
                    className={
                      input2.key === `misses`
                        ? `text-secondary`
                        : `text-primary`
                    }
                  >
                    {input2.label}
                  </div>,
                  input2.items.length > 0 && (
                    <div
                      className={`text-muted font-mono break-all whitespace-pre-wrap`}
                    >
                      {input2.items.join(`
`)}
                    </div>
                  ),
                ],
              },
              input2.key,
            )}
          />
        ),
      )}
    </div>
  );
}
function useRoomLogRows(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [value, value2]: Dynamic = (0, React.useState)(undefined);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!input || !options || !context) {
        value2(undefined);
        return;
      }
      let value3: Dynamic = liveDoor(input, {
        container: {
          kind: `project`,
          id: input,
        },
      });
      let value4: Dynamic = false;
      let value5: Dynamic = false;
      let value6: Dynamic = false;
      let value7 = async (
        ..._extraArguments: unknown[]
      ): Promise<undefined> => {
        if (value5) {
          value6 = true;
          return;
        }
        value5 = true;
        try {
          let value10: Dynamic =
            await loadPlatformLiveDocumentAndHistoryStatus2(value3, context);
          if (value4) return;
          let value11: Dynamic =
            value10 === null
              ? []
              : (value10.runs ?? (value10.run ? [value10.run] : []));
          value2(
            (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              JSON.stringify(input2) === JSON.stringify(value11)
                ? input2
                : value11,
          );
        } catch {
        } finally {
          value5 = false;
          if (value6 && !value4) {
            value6 = false;
            value7();
          }
        }
      };
      value7();
      let value8: Dynamic;
      let value9: Dynamic = true;
      preloadModule(
        async (..._extraArguments: unknown[]): Promise<Dynamic> => {
          let { subscribeProjectFeed: value10 }: Dynamic = await import(
            "./platform-core"
          ).then(
            (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              input2.Fg,
          );
          return {
            subscribeProjectFeed: value10,
          };
        },
        __vite__mapDeps([0, 1, 2, 3]),
        import.meta.url,
      )
        .then(
          (
            { subscribeProjectFeed: input2 }: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (value9)
              try {
                value8 = input2(
                  input,
                  (
                    entry?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): undefined => {
                    if (entry.kind === `live` || entry.kind === `recovered`)
                      return void value7();
                    if (
                      entry.kind === `envelope` &&
                      entry.envelope.diff.some(
                        (input3?: Dynamic, ..._extraArguments: unknown[]) =>
                          input3.address?.ref?.object === `run`,
                      )
                    ) {
                      value7();
                    }
                  },
                );
              } catch {}
          },
        )
        .catch((..._extraArguments: unknown[]): undefined => {});
      return (..._extraArguments: unknown[]): undefined => {
        value4 = true;
        value9 = false;
        value8?.();
      };
    },
    [input, options, context],
  );
  return value;
}
function useWidgetObject(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  value?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [value2, value3]: Dynamic = (0, React.useState)(undefined);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!value || !input || !options) {
        value3(undefined);
        return;
      }
      let value4: Dynamic = false;
      let value5: Dynamic = false;
      let value6: Dynamic = false;
      let value7 = async (
        ..._extraArguments: unknown[]
      ): Promise<undefined> => {
        if (value5) {
          value6 = true;
          return;
        }
        value5 = true;
        try {
          let value10: Dynamic = await options(
            {
              object: `node`,
              id: context,
            },
            `widget`,
          );
          if (value4 || value10 == null) return;
          let value11: Dynamic =
            typeof value10?.code == `string` ? value10.code : ``;
          let value12: Dynamic =
            value10?.draft && typeof value10.draft.code == `string`
              ? value10.draft.code
              : null;
          value3(
            (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              input2 && input2.code === value11 && input2.draft === value12
                ? input2
                : {
                    code: value11,
                    draft: value12,
                  },
          );
        } catch {
        } finally {
          value5 = false;
          if (value6 && !value4) {
            value6 = false;
            value7();
          }
        }
      };
      value7();
      let value8: Dynamic;
      let value9: Dynamic = true;
      preloadModule(
        async (..._extraArguments: unknown[]): Promise<Dynamic> => {
          let { subscribeProjectFeed: value10 }: Dynamic = await import(
            "./platform-core"
          ).then(
            (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              input2.Fg,
          );
          return {
            subscribeProjectFeed: value10,
          };
        },
        __vite__mapDeps([0, 1, 2, 3]),
        import.meta.url,
      )
        .then(
          (
            { subscribeProjectFeed: input2 }: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (value9)
              try {
                value8 = input2(
                  input,
                  (
                    entry?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): undefined => {
                    if (entry.kind === `live` || entry.kind === `recovered`)
                      return void value7();
                    if (
                      entry.kind === `envelope` &&
                      entry.envelope.diff.some(
                        (
                          input3?: Dynamic,
                          ..._extraArguments: unknown[]
                        ): Dynamic => {
                          let address: Dynamic = input3.address;
                          return (
                            address?.ref?.object === `node` &&
                            address.ref.id === context
                          );
                        },
                      )
                    ) {
                      value7();
                    }
                  },
                );
              } catch {}
          },
        )
        .catch((..._extraArguments: unknown[]): undefined => {});
      return (..._extraArguments: unknown[]): undefined => {
        value4 = true;
        value9 = false;
        value8?.();
      };
    },
    [input, options, context, value],
  );
  return value2;
}
var consoleReads: Dynamic = {
  trail: api.v3WidgetTrail,
  provenance: api.v3WidgetProvenance,
  routineStamp: api.v3RoutineStamp,
  databases: api.v3Databases,
  routines: async (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<Dynamic> => {
    let value: Dynamic = await apiFetcher(
      `/api/v3/project/${encodeURIComponent(input)}/routines`,
    );
    if (!value.ok) throw Error(`routines read failed (${value.status})`);
    let value2: Dynamic = await value.json();
    return {
      rows: (Array.isArray(value2) ? value2 : value2.rows).filter(
        (input2?: Dynamic, ..._extraArguments: unknown[]) =>
          typeof input2.id == `string`,
      ),
    };
  },
};
var ROOM_TABS: Dynamic = [`code`, `comments`, `log`, `dependencies`];
var PROJECT_TABS: Dynamic = ROOM_TABS.filter(
  (input?: Dynamic, ..._extraArguments: unknown[]) => input !== `comments`,
);
var widgetTabPreference: Dynamic = updateDataModelSchemasValue(
  `widgetPanel.tab`,
  `code`,
);
function resolveWidgetTab(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return input === `chat`
    ? `log`
    : ((options ? ROOM_TABS : PROJECT_TABS).find(
        (input2?: Dynamic, ..._extraArguments: unknown[]) => input2 === input,
      ) ?? null);
}
var LOG_FILTER_KEYS: Dynamic = [
  `chats`,
  `edits`,
  `publishes`,
  `warnings`,
  `runs`,
  `invocations`,
];
var widgetLogFilters: Dynamic = updateDataModelSchemasValue(
  `widgetPanel.logFilters`,
  {
    chats: true,
    edits: true,
    publishes: true,
    warnings: true,
    runs: true,
    invocations: true,
  },
);
var diagnosticMessages: Dynamic = {
  syntax: `There's a syntax error here.`,
  "claude-usage": `claude can only be used as a component tag (<claude.Visualize>, <claude.Embed>) — not aliased or called.`,
  "unknown-method": `That isn't one of claude's methods.`,
  "ref-literal": `The ref has to be a literal string the compiler can read.`,
  "ref-grammar": `That ref isn't spelled right.`,
  charset: `Only letters, digits, dashes and underscores are allowed here.`,
  "segment-literal": `data-claude-anchor needs a string or template literal.`,
  "embed-literal": `<claude-embed> needs a literal ref string.`,
  "embed-children": `<claude-embed> can't wrap content — it hosts a node.`,
  "embed-writable-bare": `writable is a bare attribute — no value.`,
  "unknown-claude-attr": `The addressing attributes are data-claude-anchor and data-claude-text-id.`,
  "eval-family": `eval-style code isn't allowed in a widget.`,
  "reserved-name": `That name is reserved by the runtime wrapper.`,
  "no-imports": `Widgets can't use import/export — React, <claude.Visualize>, and <claude.Embed> are the whole world.`,
  "default-export": `Export exactly one default component.`,
  "internal-error": `The compiler hit an internal error on this code.`,
  "widget-hard-cap": `This block's source is too big.`,
};
var diagnosticMessage: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => diagnosticMessages[input.rule] ?? input.message;
var setDiagnosticLines: Dynamic = StateEffect.define();
var diagnosticLineDecoration: Dynamic = Decoration.line({
  class: `cm-diag-line`,
});
var diagnosticDecorations: Dynamic = StateField.define({
  create: (..._extraArguments: unknown[]): Dynamic => Decoration.none,
  update(
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    input = input.map(options.changes);
    for (let value of options.effects as Dynamic)
      if (value.is(setDiagnosticLines)) {
        let items: Dynamic = [];
        for (let value2 of value.value as Dynamic)
          if (!(value2 < 1 || value2 > options.state.doc.lines)) {
            items.push({
              from: options.state.doc.line(value2).from,
            });
          }
        input = Decoration.set(
          items.map(
            (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              diagnosticLineDecoration.range(input2.from),
          ),
        );
      }
    return input;
  },
  provide: (input?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
    EditorView.decorations.from(input),
});
var editorAccessExtensions: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => [EditorView.editable.of(input), EditorState.readOnly.of(!input)];
var widgetEditorTheme: Dynamic = EditorView.theme({
  "&": {
    fontSize: `var(--cds-font-size-code, 12px)`,
    height: `100%`,
  },
  ".cm-scroller": {
    fontFamily: `var(--font-mono, ui-monospace, monospace)`,
  },
  ".cm-gutters": {
    backgroundColor: `var(--cds-surface-1, #f7f6f2)`,
    color: `var(--cds-text-muted, #8a8882)`,
    border: `none`,
  },
  ".cm-content": {
    caretColor: `var(--cds-text-primary, #1f1e1b)`,
  },
  ".cm-diag-line": {
    backgroundColor: `color-mix(in srgb, var(--cds-text-danger, #e05252) 9%, transparent)`,
  },
});
var widgetSyntaxHighlight: Dynamic = HighlightStyle.define([
  {
    tag: tags.comment,
    color: `var(--cds-text-muted, #8a8882)`,
  },
  {
    tag: tags.keyword,
    color: `var(--cds-text-accent, #2a78d6)`,
  },
  {
    tag: [tags.string, tags.special(tags.string), tags.regexp],
    color: `var(--cds-text-success, #3e7d4c)`,
  },
  {
    tag: [tags.number, tags.bool, tags.null, tags.atom],
    color: `var(--cds-text-warning, #9a6b00)`,
  },
  {
    tag: [tags.typeName, tags.tagName, tags.className],
    color: `var(--cds-text-git-removed, #b0356f)`,
  },
  {
    tag: [tags.propertyName, tags.function(tags.variableName)],
    color: `var(--cds-text-secondary, #55534e)`,
  },
  {
    tag: tags.invalid,
    color: `var(--cds-text-danger, #e05252)`,
  },
]);
function WidgetPanel(input?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
  let value: Dynamic = resolvePlatformSyncAndRoutingCompact();
  let [value2, value3]: Dynamic = (0, React.useState)(
    resolveWidgetTab(input.initialTab, !!input.room) ??
      (input.room
        ? `code`
        : resolveWidgetTab(widgetTabPreference.getState().value, false)) ??
      `code`,
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      let value15: Dynamic = resolveWidgetTab(input.initialTab, !!input.room);
      if (value15) {
        value3(value15);
      }
    },
    [input.initialTab],
  );
  let value4 = (input2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    value3(input2);
    widgetTabPreference.getState().set(input2);
    input.onTabChange?.(input2);
  };
  let value5: Dynamic = `f-${input.fsEntryId}#${input.nodeId}`;
  let [value6, value7]: Dynamic = (0, React.useState)(null);
  let value8: Dynamic = resolveEditorSelectionAndTablesPref(
    usePlatformFeatureFlagsUseSyncExternalStore(`widgetProvenance`),
  );
  let value9: Dynamic = input.room?.pid;
  let value10: Dynamic = input.room?.fileId;
  let value11: Dynamic = (0, React.useCallback)(
    (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      api.v3WidgetProvenance(value9 ?? ``, value10 ?? ``, input2),
    [value9, value10],
  );
  let [value12, value13]: Dynamic = (0, React.useState)(false);
  let value14: Dynamic = (0, React.useRef)(null);
  return (
    <div className={`bg-surface-0 flex h-full min-h-0 flex-col`}>
      <div className={`flex shrink-0 items-center gap-1 border-b px-2 py-1`}>
        {input.subjectFile && input.onOpenSubjectFile ? (
          <span
            className={`text-muted text-caption flex min-w-0 items-baseline px-1 font-mono`}
          >
            <Tooltip content={`Back to ${input.subjectFile}`}>
              <button
                type={`button`}
                data-testid={`panel-subject-file`}
                onClick={input.onOpenSubjectFile}
                className={`text-secondary hover:text-primary max-w-48 cursor-pointer truncate hover:underline`}
              >
                {input.subjectFile.split(`/`).pop()}
              </button>
            </Tooltip>
            <span className={`px-1`}>{`›`}</span>
            <span className={`shrink-0 whitespace-nowrap`}>{input.nodeId}</span>
          </span>
        ) : (
          <span
            className={`text-muted text-caption px-1 font-mono whitespace-nowrap`}
          >
            {input.nodeId}
          </span>
        )}
        {(input.room ? ROOM_TABS : PROJECT_TABS).map(
          (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
            <Button
              {...originalJsxProps(
                {
                  size: value(`sm`),
                  variant: value2 === input2 ? `secondary` : `ghost`,
                  onClick: (..._extraArguments: unknown[]): Dynamic =>
                    value4(input2),
                  children: input2,
                },
                input2,
              )}
            />
          ),
        )}
        <div className={`flex-1`} />
        <div
          ref={value7}
          data-testid={`widget-panel-actions`}
          className={`flex items-center gap-1.5`}
        />
        {input.room && value8 && (
          <WidgetProvenanceTrigger
            nodeId={input.nodeId}
            fetchFor={value11}
            trigger={`header`}
            onOpenDependencies={(..._extraArguments: unknown[]): Dynamic =>
              value4(`dependencies`)
            }
          />
        )}
        <Tooltip content={`Close panel`}>
          <Button
            variant={`ghost`}
            size={value(`sm`)}
            onClick={input.onClose}
            aria-label={`Close widget panel`}
          >
            <UiOverlaysAndIconsCustomIcon name={`X`} customSize={12} />
          </Button>
        </Tooltip>
      </div>
      <div className={`flex min-h-0 flex-1 overflow-hidden`}>
        {value2 === `code` && (
          <CodeTab
            {...originalJsxProps({
              ...input,
              sessionRef: value5,
              actionsEl: value6,
            })}
          />
        )}
        {value2 === `comments` && input.room && (
          <WidgetCommentsTab
            {...originalJsxProps({
              ...input,
            })}
          />
        )}
        {value2 === `log` &&
          (input.room ? (
            <RoomLogTab
              room={input.room}
              nodeId={input.nodeId}
              fsEntryId={input.fsEntryId}
              codeOpen={value12}
              setCodeOpen={value13}
              codeDismissedRunRef={value14}
            />
          ) : (
            <WidgetLogTab
              {...originalJsxProps({
                ...input,
                sessionRef: value5,
              })}
            />
          ))}
        {value2 === `dependencies` && (
          <WidgetDependenciesTab
            {...originalJsxProps({
              ...input,
            })}
          />
        )}
      </div>
    </div>
  );
}
function RoomLogTab(
  {
    room: page,
    nodeId: input,
    fsEntryId: input2,
    codeOpen: input3,
    setCodeOpen: input4,
    codeDismissedRunRef: input5,
  }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = resolvePlatformSyncAndRoutingCompact();
  let value2: Dynamic = useRoomLogRows(page.pid, page.fileId, input);
  let [value3, value4]: Dynamic = (0, React.useState)(``);
  let [value5, value6]: Dynamic = (0, React.useState)(false);
  let [value7, value8]: Dynamic = (0, React.useState)(null);
  let value9: Dynamic = (0, React.useRef)(null);
  let value10: Dynamic = value2?.at(-1);
  let value11: Dynamic = (
    input6?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    value21?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => (
    <div
      {...originalJsxsProps(
        {
          className: `text-caption flex items-baseline gap-2 px-3 py-1 font-mono`,
          children: [
            <span className={`shrink-0 ${value21 ?? `text-secondary`}`}>
              {options}
            </span>,
            <span
              className={`text-primary min-w-0 break-words whitespace-pre-wrap`}
            >
              {context}
            </span>,
          ],
        },
        input6,
      )}
    />
  );
  let items: Dynamic = [];
  (value2 ?? []).forEach(
    (
      state?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let runId: Dynamic = state.runId;
      if (state.prompt) {
        items.push(
          value11(
            `${runId}-prompt`,
            options === 0 ? `initial prompt` : `prompt`,
            state.prompt,
          ),
        );
      }
      items.push(
        value11(
          `${runId}-queued`,
          `queued`,
          `build run/${state.runId}${state.createdAt ? ` · ${resolvePlatformSessionAndSourcesWeekday(state.createdAt)}` : ``}`,
          `text-accent`,
        ),
      );
      if (state.status === `staged`) {
        items.push(
          value11(
            `${runId}-staged`,
            `waiting`,
            `needs your approval before it can run`,
            `text-warning`,
          ),
        );
      }
      if (state.status === `running`) {
        items.push(
          value11(
            `${runId}-running`,
            `running`,
            `the builder is working${state.at ? ` · ${resolvePlatformSessionAndSourcesWeekday(state.at)}` : ``}`,
            `text-accent`,
          ),
        );
      }
      if (state.status === `done`) {
        items.push(
          value11(
            `${runId}-done`,
            `finished`,
            `${state.summary ?? `build finished — review the draft in the code tab`}${state.at ? ` · ${resolvePlatformSessionAndSourcesWeekday(state.at)}` : ``}`,
            `text-success`,
          ),
        );
      }
      if (state.status === `error`) {
        items.push(
          value11(
            `${runId}-error`,
            `failed`,
            state.error ?? `the build failed`,
            `text-danger`,
          ),
        );
      }
    },
  );
  let value12: Dynamic =
    value2?.some(
      (state?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        state.status === `pending` ||
        state.status === `running` ||
        state.status === `staged`,
    ) ?? false;
  let value13: Dynamic = resolveEditorSelectionAndTablesPref2(
    usePlatformFeatureFlagsUseSyncExternalStore(`widgetLiveCode`),
  );
  let value14: Dynamic = useWidgetObject(page.pid, page.read, input, value13);
  let value15: Dynamic =
    value14 === undefined ? undefined : (value14.draft ?? null);
  let value16: Dynamic = value2?.find(
    (input6?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      isWidgetBuildRunning(input6),
  )?.runId;
  let value17: Dynamic = value16 !== undefined;
  let value18: Dynamic = (0, React.useRef)(null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (value16 !== undefined) {
        value18.current = value16;
        if (input5.current !== value16) {
          input4(true);
        }
      }
    },
    [value16, input5, input4],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (value15 === null && !value17 && value10?.status === `pending`) {
        input4(false);
      }
    },
    [value15, value17, value10?.status, input4],
  );
  let value19: Dynamic = value13 && (value12 || value15 != null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      let current: Dynamic = value9.current;
      if (current) {
        current.scrollTop = current.scrollHeight;
      }
    },
    [value2?.length, value10?.status],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (!input3) return;
      let current: Dynamic = value9.current;
      if (current) {
        current.scrollTop = current.scrollHeight;
      }
    },
    [input3, value19],
  );
  let value20 = async (..._extraArguments: unknown[]): Promise<undefined> => {
    let value21: Dynamic = value3.trim();
    if (!(!value21 || value5 || value12)) {
      value6(true);
      value8(null);
      try {
        let value22: Dynamic =
          await PlatformLiveDocumentAndHistoryCreate.buildRun(
            page.intend,
            input,
            value21,
          );
        if (!value22.ok) {
          value8(value22.reason || `The build couldn't be queued.`);
          return;
        }
        value4(``);
        EditorSelectionAndTablesByKey.getState().mark(`${input2}#${input}`);
      } catch {
        value8(`The message didn't reach the server — try again.`);
      } finally {
        value6(false);
      }
    }
  };
  return (
    <div
      className={`flex min-h-0 min-w-0 flex-1 flex-col`}
      data-testid={`widget-room-log`}
    >
      <div ref={value9} className={`min-h-12 flex-1 overflow-auto py-2`}>
        {value2 === undefined ? (
          <div
            className={`text-muted text-footnote px-3 py-1`}
          >{`Loading…`}</div>
        ) : value2.length === 0 ? (
          <div
            className={`text-muted text-footnote px-3 py-1`}
            data-testid={`widget-room-log-empty`}
          >{`No build run for this widget yet — describe a change below to start one, or edit the code tab directly.`}</div>
        ) : (
          items
        )}
      </div>
      {value19 && (
        <details
          className={`min-h-0 shrink overflow-hidden border-t`}
          data-testid={`widget-room-log-code`}
          open={input3}
          onToggle={(
            input6?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            let open: Dynamic = input6.currentTarget.open;
            if (open === input3) return;
            input4(open);
            let value21: Dynamic = value16 ?? value18.current;
            if (!open && value21 != null) {
              input5.current = value21;
            }
          }}
        >
          <summary
            className={`text-caption text-secondary cursor-pointer px-3 py-1.5 select-none`}
          >
            {value17
              ? `Code Claude is writing (updates live)`
              : `Current draft code`}
          </summary>
          <pre
            className={`text-caption text-primary max-h-[min(16rem,25vh)] overflow-auto px-3 pb-2 font-mono whitespace-pre-wrap`}
            data-testid={`widget-room-log-code-body`}
          >
            {value15 === undefined
              ? `// loading draft code…`
              : (value15 ?? `// no draft yet — the builder hasn't staged code`)}
          </pre>
        </details>
      )}
      <div
        className={`shrink-0 border-t px-3 py-2`}
        data-testid={`widget-room-log-composer`}
      >
        {value7 && (
          <div
            className={`text-danger text-caption pb-1`}
            data-testid={`widget-room-send-error`}
          >
            {value7}
          </div>
        )}
        <div className={`flex items-end gap-2`}>
          <TextArea
            value={value3}
            onChange={(
              event?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => value4(event.target.value)}
            onKeyDown={(
              event?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              if (
                event.key === `Enter` &&
                !event.shiftKey &&
                !event.nativeEvent.isComposing
              ) {
                event.preventDefault();
                value20();
              }
            }}
            autosize={true}
            rows={value2?.length ? 1 : 3}
            placeholder={`Describe a change`}
            aria-label={`Describe a change`}
            disabled={value12 || value5}
            data-testid={`widget-room-log-input`}
            className={`text-footnote max-h-32 min-w-0 flex-1 ${value2?.length ? `` : `min-h-22`}`}
          />
          <Button
            size={value(`sm`)}
            variant={`primary`}
            disabled={!value3.trim() || value5 || value12}
            onClick={(..._extraArguments: unknown[]): undefined =>
              void value20()
            }
            data-testid={`widget-room-log-send`}
          >{`Send`}</Button>
        </div>
      </div>
    </div>
  );
}
function CodeTab(input?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
  let value: Dynamic = resolvePlatformSyncAndRoutingCompact();
  let value2: Dynamic = (0, React.useRef)(null);
  let value3: Dynamic = (0, React.useRef)(null);
  let [value4, value5]: Dynamic = (0, React.useState)(false);
  let [value6, value7]: Dynamic = (0, React.useState)(``);
  let [value8, value9]: Dynamic = (0, React.useState)(false);
  let [value10, value11]: Dynamic = (0, React.useState)(false);
  let [value12]: Dynamic = (0, React.useState)(
    (..._extraArguments: unknown[]): Dynamic => new (Compartment as Dynamic)(),
  );
  let value13: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => [input.nodeId],
    [input.nodeId],
  );
  let value14: Dynamic = useNodeEngineNames(
    input.room?.pid,
    input.room?.fileId,
    value13,
  )[input.nodeId];
  let value15: Dynamic =
    input.room != null &&
    (value14 === undefined || isWidgetBuildRunning(value14));
  let value16: Dynamic = (0, React.useRef)(value15);
  value16.current = value15;
  let value17: Dynamic = (0, React.useRef)(value14);
  value17.current = value14;
  let value18: Dynamic = (0, React.useRef)(false);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (isWidgetBuildRunning(value14)) {
        value18.current = false;
        return;
      }
      if (value14 !== undefined && value18.current) {
        value18.current = false;
        value19(true);
      }
    },
    [value14],
  );
  let value19: Dynamic = (0, React.useCallback)(
    (input2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (!(input2 && value16.current)) {
        value11(input2);
        value3.current?.dispatch({
          effects: value12.reconfigure(editorAccessExtensions(input2)),
        });
        if (input2) {
          value3.current?.focus();
        }
      }
    },
    [value12],
  );
  let [value20, value21]: Dynamic = (0, React.useState)([]);
  let [value22, value23]: Dynamic = (0, React.useState)(null);
  let [value24, value25]: Dynamic = (0, React.useState)(false);
  let [value26, value27]: Dynamic = (0, React.useState)(null);
  let value28: Dynamic = resolveEditorSelectionAndTablesValue11(
    input.fsEntryId,
    input.nodeId,
  );
  let value29: Dynamic = EditorSelectionAndTablesState3(
    (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      input2.value[value28] ?? `published`,
  );
  let value30: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): undefined => {
      value33.current++;
      value25(false);
      value21([]);
      value23(null);
      value3.current?.dispatch({
        effects: setDiagnosticLines.of([]),
      });
      value9(false);
      updateEditorSelectionAndTablesPublished(value28, `published`);
      value19(false);
    },
    [value28, value19],
  );
  let value31: Dynamic = (0, React.useRef)(null);
  let value32: Dynamic = (0, React.useRef)(null);
  let value33: Dynamic = (0, React.useRef)(0);
  let value34: Dynamic = (0, React.useRef)(false);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => (
      (value34.current = false),
      (..._extraArguments: unknown[]): undefined => {
        value34.current = true;
        value33.current++;
      }
    ),
    [],
  );
  let value35: Dynamic = (0, React.useRef)(Promise.resolve());
  let value36: Dynamic = (0, React.useRef)(null);
  let value37: Dynamic = (0, React.useRef)(null);
  let value38: Dynamic = (0, React.useRef)(null);
  let value39: Dynamic = (0, React.useRef)(false);
  let value40 = (
    input2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let current: Dynamic = value3.current;
    if (!(!current || current.state.doc.toString() === input2)) {
      value39.current = true;
      try {
        current.dispatch({
          changes: {
            from: 0,
            to: current.state.doc.length,
            insert: input2,
          },
          annotations: Transaction.addToHistory.of(false),
        });
      } finally {
        value39.current = false;
      }
    }
  };
  let value41: Dynamic = input.room?.intend;
  let value42: Dynamic = input.room?.read;
  let value43: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      value41 && value42
        ? loadPlatformLiveDocumentAndHistoryCode({
            intend: value41,
            read: value42,
            nodeId: input.nodeId,
          })
        : null,
    [value41, value42, input.nodeId],
  );
  let value44: Dynamic = resolveEditorSelectionAndTablesPref2(
    usePlatformFeatureFlagsUseSyncExternalStore(`widgetLiveCode`),
  );
  let value45: Dynamic =
    input.room != null && value44 && isWidgetBuildRunning(value14);
  let value46: Dynamic = useWidgetObject(
    input.room?.pid,
    value42,
    input.nodeId,
    value45,
  );
  let value47: Dynamic = (0, React.useCallback)(
    async (
      input2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<undefined> => {
      if (value43) {
        let value67: Dynamic = input.room?.pid;
        let value68: Dynamic = input.room?.fileId;
        if (!value67 || !value68) return;
        let value69: Dynamic = ++value33.current;
        value25(true);
        try {
          await value35.current;
          if (value69 !== value33.current) return;
          let value70: Dynamic = await api.v3WidgetDraftProjection(
            value67,
            value68,
            input.nodeId,
          );
          for (let value71 of [800, 2e3] as Dynamic) {
            if (value70.kind !== `compile-busy`) break;
            await new (Promise as Dynamic)(
              (input3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                setTimeout(input3, value71),
            );
            if (value69 !== value33.current) return;
            value70 = await api.v3WidgetDraftProjection(
              value67,
              value68,
              input.nodeId,
            );
          }
          if (value69 !== value33.current) return;
          if (value70.kind === `bundle`) {
            value21([]);
            let bundle: Dynamic = value70.bundle;
            value23({
              ok: true,
              artifact: bundle.artifact,
              anchors: bundle.anchors,
              effects: bundle.effects,
              texts: bundle.texts,
              deps: bundle.deps,
            });
            value3.current?.dispatch({
              effects: setDiagnosticLines.of([]),
            });
          } else if (value70.kind === `compile-failed`) {
            let violations: Dynamic = value70.violations;
            value21(violations);
            value3.current?.dispatch({
              effects: setDiagnosticLines.of(
                violations.map(
                  (input3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                    input3.line,
                ),
              ),
            });
          } else if (value70.kind === `no-draft`) {
            value21([]);
            value23(null);
            value3.current?.dispatch({
              effects: setDiagnosticLines.of([]),
            });
          }
        } catch {
          if (value69 === value33.current) {
            value27({
              tone: `warn`,
              text: `The compile service didn't answer — diagnostics are stale.`,
            });
          }
        } finally {
          if (value69 === value33.current) {
            value25(false);
          }
        }
        return;
      }
      let value66: Dynamic = ++value33.current;
      value25(true);
      try {
        let value67: Dynamic =
          await resolvePlatformLiveDocumentAndHistoryWidgetSession(
            input.dir,
            `compile`,
            {
              code: input2,
            },
          );
        if (value66 !== value33.current) return;
        if (`error` in value67) {
          value27({
            tone: `danger`,
            text: value67.message ?? `compile failed`,
          });
          return;
        }
        let value68: Dynamic = value67;
        if (value68.ok) {
          value21([]);
          value23(value68);
          value3.current?.dispatch({
            effects: setDiagnosticLines.of([]),
          });
        } else {
          value21(value68.violations);
          value3.current?.dispatch({
            effects: setDiagnosticLines.of(
              value68.violations.map(
                (input3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  input3.line,
              ),
            ),
          });
        }
      } catch {
        if (value66 === value33.current) {
          value27({
            tone: `warn`,
            text: `The compile service didn't answer — diagnostics are stale.`,
          });
        }
      } finally {
        if (value66 === value33.current) {
          value25(false);
        }
      }
    },
    [input.dir, value43, input.room?.pid, input.room?.fileId, input.nodeId],
  );
  let value48: Dynamic = (0, React.useCallback)(
    (input2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (value36.current !== input2) {
        value36.current = input2;
        value35.current = value35.current.then(
          async (..._extraArguments: unknown[]): Promise<undefined> => {
            let value66: Dynamic = value43
              ? await value43.draft(input2)
              : await resolvePlatformLiveDocumentAndHistoryWidgetSession(
                  input.dir,
                  `draft`,
                  {
                    ref: input.sessionRef,
                    code: input2,
                  },
                );
            if (!value34.current)
              if (`error` in value66) {
                if (value36.current === input2) {
                  value36.current = null;
                }
                let value67: Dynamic = value66;
                value38.current = value43 ? (value67.rule ?? `error`) : null;
                if (value67.rule === `widget-draft-stale`) {
                  let value68: Dynamic = value67.head
                    ? value67.head.draft != null
                    : true;
                  if (value67.head) {
                    value7(value67.head.code);
                    value9(value68);
                  }
                  value27({
                    tone: `warn`,
                    text: value68
                      ? `This block's published version moved ahead of your editing session — your own text edit in the document, or another writer publishing. Your text is still here: keep typing (or publish) to stage it over the current version, or close the panel to start from it.`
                      : `This block's published version moved ahead of your editing session — your own text edit in the document, or another writer publishing. Your text is still here: keep typing to stage it over the current version, or close the panel to start from it.`,
                  });
                } else
                  value27({
                    tone: `danger`,
                    text: value66.message ?? `draft write failed`,
                  });
              } else {
                value38.current = null;
                value37.current = input2;
                value9(true);
                let warn: Dynamic = value66.warn;
                if (warn) {
                  value27({
                    tone: `warn`,
                    text: `Heads up: this block is ${warn.bytes} bytes (soft cap ${warn.cap}).`,
                  });
                }
              }
          },
        );
        value35.current = value35.current.catch(
          (..._extraArguments: unknown[]): undefined => {
            if (!value34.current) {
              if (value36.current === input2) {
                value36.current = null;
              }
              value38.current = value43 ? `network` : null;
              value27({
                tone: `danger`,
                text: `draft save failed (network) — edits not yet saved`,
              });
            }
          },
        );
      }
    },
    [input.dir, input.sessionRef, value43],
  );
  let value49: Dynamic = (0, React.useCallback)(
    (input2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (!value39.current) {
        value27(
          (input3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            input3?.action ? null : input3,
        );
        value9(true);
        if (value32.current) {
          clearTimeout(value32.current);
        }
        value32.current = setTimeout(
          (..._extraArguments: unknown[]): undefined => {
            value48(input2);
            value47(input2);
          },
          500,
        );
      }
    },
    [value48, value47],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let value66: Dynamic = false;
      (async (..._extraArguments: unknown[]): Promise<undefined> => {
        let value67: Dynamic = value43
          ? await value43.boot()
          : await resolvePlatformLiveDocumentAndHistoryWidgetNodeState(
              input.container,
              input.fsEntryId,
              input.nodeId,
            );
        if (value66) return;
        if (`error` in value67) {
          value27({
            tone: `danger`,
            text: value67.message,
          });
          value5(true);
          return;
        }
        value7(value67.code);
        value9(value67.draft != null);
        {
          let value69: Dynamic = value67.draft != null;
          if (value69 && value17.current === undefined) {
            value18.current = true;
          }
          value11(value69 && !value16.current);
        }
        if (value67.draft == null) {
          updateEditorSelectionAndTablesPublished(value28, `published`);
        } else {
          if (value43) {
            updateEditorSelectionAndTablesPublished(value28, `draft`);
          }
        }
        let value68: Dynamic = value67.draft?.code ?? value67.code;
        value36.current = value68;
        value37.current = value68;
        let current: Dynamic = value2.current;
        if (current) {
          value3.current?.destroy();
          value3.current = new (EditorView as Dynamic)({
            parent: current,
            state: EditorState.create({
              doc: value68,
              extensions: [
                lineNumbers(),
                history(),
                keymap.of([...defaultKeymap, ...historyKeymap]),
                javascript({
                  jsx: true,
                  typescript: true,
                }),
                syntaxHighlighting(widgetSyntaxHighlight),
                diagnosticDecorations,
                widgetEditorTheme,
                value12.of(
                  editorAccessExtensions(
                    value67.draft != null && !value16.current,
                  ),
                ),
                EditorView.updateListener.of(
                  (
                    input2?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): undefined => {
                    if (input2.docChanged) {
                      value49(input2.state.doc.toString());
                    }
                  },
                ),
              ],
            }),
          });
          value5(true);
          if (value68.trim()) {
            value47(value68);
          }
        }
      })();
      return (..._extraArguments: unknown[]): undefined => {
        value66 = true;
        if (value32.current) {
          clearTimeout(value32.current);
        }
        value3.current?.destroy();
        value3.current = null;
      };
    },
    [input.container, input.fsEntryId, input.nodeId, value43],
  );
  let value50: Dynamic = (0, React.useRef)(false);
  let [value51, value52]: Dynamic = (0, React.useState)(false);
  let value53: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
    value50.current ? false : ((value50.current = true), value52(true), true);
  let value54 = (..._extraArguments: unknown[]): undefined => {
    value50.current = false;
    value52(false);
  };
  let value55 = (..._extraArguments: unknown[]): undefined => {
    value32.current &&= (clearTimeout(value32.current), null);
    value3.current?.dispatch({
      effects: value12.reconfigure(editorAccessExtensions(false)),
    });
  };
  let value56 = (..._extraArguments: unknown[]): undefined => {
    if (!value16.current) {
      value3.current?.dispatch({
        effects: value12.reconfigure(editorAccessExtensions(true)),
      });
    }
  };
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (value15 && value10) {
        value11(false);
        value55();
      }
    },
    [value15, value10],
  );
  let value57: Dynamic = (0, React.useRef)(0);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (!value45 || value46 === undefined) return;
      let value66: Dynamic = ++value57.current;
      (async (..._extraArguments: unknown[]): Promise<undefined> => {
        await value35.current;
        if (value66 !== value57.current || !value16.current) return;
        let current: Dynamic = value3.current;
        if (!current) return;
        let value67: Dynamic = value46.draft ?? value46.code;
        let value68: Dynamic = current.state.doc.toString();
        let value69: Dynamic = value68 !== value67;
        if (value69) {
          if (value37.current !== value68) return;
          value40(value67);
        }
        value36.current = value67;
        value37.current = value67;
        value7(value46.code);
        value9(value46.draft != null);
        if (value69) {
          value33.current++;
          value25(false);
          value21([]);
          value3.current?.dispatch({
            effects: setDiagnosticLines.of([]),
          });
          if (value67.trim()) {
            value47(value67);
          } else {
            value23(null);
          }
        }
      })();
    },
    [value45, value46],
  );
  let value58: Dynamic = (0, React.useRef)(false);
  let value59: Dynamic = (0, React.useRef)(0);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      let value66: Dynamic =
        input.room != null && isWidgetBuildRunning(value14);
      let value67: Dynamic = (value14 ?? null)?.status;
      let value68: Dynamic =
        value58.current &&
        !value66 &&
        (value67 === `done` || value67 === `error`);
      if (value14 != null) {
        value58.current = value66;
      }
      if (!value68 || !value43 || value50.current) return;
      let value69: Dynamic = ++value59.current;
      (async (..._extraArguments: unknown[]): Promise<undefined> => {
        await value35.current;
        if (value69 !== value59.current) return;
        let value70: Dynamic = await value43.boot();
        if (
          value69 !== value59.current ||
          `error` in value70 ||
          value16.current ||
          value50.current
        )
          return;
        let current: Dynamic = value3.current;
        if (!current) return;
        let value71: Dynamic = current.state.doc.toString();
        if (value37.current !== value71) {
          value27({
            tone: `warn`,
            text: `The build finished, but you have unsaved edits here — they were kept. Reopen the panel to load what the build staged.`,
          });
          return;
        }
        value33.current++;
        value25(false);
        value21([]);
        value23(null);
        current.dispatch({
          effects: setDiagnosticLines.of([]),
        });
        let value72: Dynamic = value70.draft?.code ?? value70.code;
        value40(value72);
        value36.current = value72;
        value37.current = value72;
        value7(value70.code);
        let value73: Dynamic = value70.draft != null;
        value9(value73);
        updateEditorSelectionAndTablesPublished(
          value28,
          value73 ? `draft` : `published`,
        );
        value11(value73);
        current.dispatch({
          effects: value12.reconfigure(editorAccessExtensions(value73)),
        });
        if (value72.trim()) {
          value47(value72);
        }
      })();
    },
    [value14, input.room, value43],
  );
  let value60 = async (
    input2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<undefined> => {
    if (value53())
      try {
        value27(null);
        value55();
        let value66: Dynamic = value3.current?.state.doc.toString();
        if (value66 !== undefined && value36.current !== value66) {
          value48(value66);
          value47(value66);
        }
        await value35.current;
        let value67: Dynamic = value3.current?.state.doc.toString();
        if (value67 === undefined) return;
        if (value36.current !== value67) {
          value56();
          value38.current ??
            value27({
              tone: `danger`,
              text: `Couldn't save your latest edits — fix that before publishing.`,
            });
          return;
        }
        let value68: Dynamic = value43
          ? await value43.publish(input2)
          : await resolvePlatformLiveDocumentAndHistoryWidgetSession(
              input.dir,
              `publish`,
              {
                ref: input.sessionRef,
              },
            );
        if (`error` in value68) {
          let value70: Dynamic = value68;
          if (value43 && value70.rule === `no-draft`) {
            let value71: Dynamic = await value43.boot();
            let value72: Dynamic = !(`error` in value71);
            if (value72) {
              let code: Dynamic = value71.code;
              value7(code);
              if (
                value3.current &&
                value3.current.state.doc.toString() !== code
              ) {
                value39.current = true;
                try {
                  value3.current.dispatch({
                    changes: {
                      from: 0,
                      to: value3.current.state.doc.length,
                      insert: code,
                    },
                  });
                } finally {
                  value39.current = false;
                }
              }
            }
            value36.current = null;
            value37.current = value3.current?.state.doc.toString() ?? null;
            value30();
            value27(
              value72
                ? {
                    tone: `warn`,
                    text: `Nothing left to publish — the draft was already published (likely by another writer); showing the current version.`,
                  }
                : {
                    tone: `warn`,
                    text: `Nothing left to publish — the draft was already published, but re-reading the current version failed; reopen the panel to see it.`,
                  },
            );
            return;
          }
          if (value70.rule === `resync-failed`) {
            value30();
            value27({
              tone: `warn`,
              text:
                value70.message ??
                `Published — re-read failed; reopen the panel to confirm.`,
            });
            return;
          }
          if (value70.rule === `anchor-orphan`) {
            value56();
            let value71: Dynamic = (value70.message ?? ``).replace(
              /^anchor-orphan:\s*/,
              ``,
            );
            value27({
              tone: `warn`,
              text: value71
                ? value71.charAt(0).toUpperCase() + value71.slice(1)
                : `Publishing removes named spots that have live comments.`,
              action: {
                label: `Publish anyway (orphans those comments)`,
                run: (..._extraArguments: unknown[]): undefined =>
                  void value60({
                    confirmOrphans: true,
                  }),
              },
            });
            return;
          }
          value56();
          value27({
            tone: `danger`,
            text:
              value70.rule === `publish-conflict`
                ? `Someone published a newer version since this draft forked — copy your changes, revert, and re-draft from the current source.`
                : value70.rule === `compile-rejected`
                  ? `The draft doesn't compile — fix the problems below, then publish.`
                  : value70.rule === `no-draft`
                    ? `Nothing to publish — this block has no draft.`
                    : (value70.message ?? `Publish failed.`),
          });
          return;
        }
        let value69: Dynamic = value68;
        value7(value69.code);
        if (
          value43 &&
          value3.current &&
          value3.current.state.doc.toString() !== value69.code
        ) {
          value39.current = true;
          try {
            value3.current.dispatch({
              changes: {
                from: 0,
                to: value3.current.state.doc.length,
                insert: value69.code,
              },
            });
          } finally {
            value39.current = false;
          }
          value36.current = null;
          value37.current = value69.code;
        }
        value30();
        value27(
          value69.advisories?.length
            ? {
                tone: `warn`,
                text: `Published, with a warning: ${value69.advisories.join(`; `)}.`,
              }
            : {
                tone: `ok`,
                text: `Published — the document now shows this render.`,
              },
        );
      } catch {
        value56();
        value27({
          tone: `danger`,
          text: `Publish didn't reach the server — try again.`,
        });
      } finally {
        value54();
      }
  };
  let value61 = async (..._extraArguments: unknown[]): Promise<undefined> => {
    if (value53())
      try {
        value27(null);
        value55();
        await value35.current;
        let value66: Dynamic = value43
          ? await value43.revert()
          : await resolvePlatformLiveDocumentAndHistoryWidgetSession(
              input.dir,
              `revert`,
              {
                ref: input.sessionRef,
              },
            );
        if (`error` in value66) {
          let value68: Dynamic = value66;
          if (value43 && value68.rule === `no-draft`) {
            let value69: Dynamic = await value43.boot();
            let value70: Dynamic = !(`error` in value69);
            let value71: Dynamic = value70 ? value69.code : value6;
            if (value70) {
              value7(value71);
            }
            value39.current = true;
            try {
              value3.current?.dispatch({
                changes: {
                  from: 0,
                  to: value3.current.state.doc.length,
                  insert: value71,
                },
              });
            } finally {
              value39.current = false;
            }
            value36.current = null;
            value37.current = value71;
            value30();
            value27(
              value70
                ? {
                    tone: `ok`,
                    text: `Nothing left to revert — the draft was already gone; showing the current published source.`,
                  }
                : {
                    tone: `warn`,
                    text: `Nothing left to revert — the draft was already gone, but re-reading the current version failed; reopen the panel to see it.`,
                  },
            );
            return;
          }
          if (value68.rule === `resync-failed`) {
            value39.current = true;
            try {
              value3.current?.dispatch({
                changes: {
                  from: 0,
                  to: value3.current.state.doc.length,
                  insert: value6,
                },
              });
            } finally {
              value39.current = false;
            }
            value36.current = null;
            value37.current = value6;
            value30();
            value27({
              tone: `warn`,
              text:
                value68.message ??
                `Draft dropped — re-read failed; reopen the panel to confirm.`,
            });
            return;
          }
          value56();
          value27({
            tone: `danger`,
            text: value68.message ?? `Revert failed.`,
          });
          return;
        }
        let value67: Dynamic = value43 ? value66.code : value6;
        if (value43 && value67 !== value6) {
          value7(value67);
        }
        value39.current = true;
        try {
          value3.current?.dispatch({
            changes: {
              from: 0,
              to: value3.current.state.doc.length,
              insert: value67,
            },
          });
        } finally {
          value39.current = false;
        }
        value36.current = null;
        value37.current = value67;
        value30();
        value27({
          tone: `ok`,
          text: `Draft dropped — back to the published source.`,
        });
        if (value67.trim()) {
          value47(value67);
        }
      } catch {
        value56();
        value27({
          tone: `danger`,
          text: `Revert didn't reach the server — try again.`,
        });
      } finally {
        value54();
      }
  };
  let value62: Dynamic = value8
    ? value20.length
      ? `${value20.length} problem${value20.length === 1 ? `` : `s`} to fix first`
      : null
    : `No draft to publish`;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      let set: Dynamic = EditorSelectionAndTablesByKey2.getState().set;
      if (value29 === `draft` && value8 && value22) {
        let value66: Dynamic =
          Object.keys(value22.texts ?? {}).length > 0 ? value22.texts : null;
        let value67: Dynamic = JSON.stringify(value66);
        let current: Dynamic = value31.current;
        if (
          current &&
          current.artifact === value22.artifact &&
          current.textsJson === value67
        )
          return;
        value31.current = {
          artifact: value22.artifact,
          textsJson: value67,
        };
        set(value28, {
          artifact: value22.artifact,
          effects: value22.effects,
          texts: value66,
          embeds: value22.deps.embeds,
          nonce: resolveEditorSelectionAndTablesValue12(),
        });
      } else {
        value31.current = null;
        set(value28, null);
      }
    },
    [value29, value8, value22, value28],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): Dynamic =>
        EditorSelectionAndTablesByKey2.getState().set(value28, null),
    [value28],
  );
  let value63: Dynamic = value6.trim() !== ``;
  let value64: Dynamic =
    value45 &&
    !value10 &&
    value3.current != null &&
    value37.current === value3.current.state.doc.toString();
  let value65: Dynamic = value10 ? (
    <jsxRuntime.Fragment>
      {value24 && (
        <span className={`text-muted text-caption`}>{`compiling…`}</span>
      )}
      {value8 && (
        <span
          className={`flex items-center gap-1`}
          data-testid={`widget-view-toggle`}
        >
          {[`draft`, `published`].map(
            (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
              <Button
                {...originalJsxProps(
                  {
                    size: value(`sm`),
                    variant: value29 === input2 ? `secondary` : `ghost`,
                    disabled: value51,
                    onClick: (..._extraArguments: unknown[]): Dynamic =>
                      updateEditorSelectionAndTablesPublished(value28, input2),
                    children: input2,
                  },
                  input2,
                )}
              />
            ),
          )}
        </span>
      )}
      {value8 ? (
        <Button
          size={value(`sm`)}
          variant={`ghost`}
          disabled={value51}
          onClick={(..._extraArguments: unknown[]): undefined => void value61()}
        >
          {value63 ? `Revert` : `Discard draft`}
        </Button>
      ) : (
        <Button
          size={value(`sm`)}
          variant={`ghost`}
          disabled={value51}
          onClick={(..._extraArguments: unknown[]): Dynamic => value19(false)}
        >{`Done`}</Button>
      )}
      <DisabledReasonTooltip reason={value62 ?? undefined}>
        <Button
          size={value(`sm`)}
          variant={`primary`}
          disabled={!!value62 || value51}
          onClick={(..._extraArguments: unknown[]): undefined => void value60()}
        >{`Publish`}</Button>
      </DisabledReasonTooltip>
    </jsxRuntime.Fragment>
  ) : (
    <span className={`flex items-center gap-2`}>
      {value15 && (
        <span
          className={`text-muted text-caption`}
          data-testid={`widget-build-lock-hint`}
        >
          {value14 === undefined
            ? `checking build status…`
            : value45 && value64
              ? `build in progress — the code below follows Claude's draft live`
              : value45
                ? `build in progress — your unsaved edits are kept; the build's code isn't shown here`
                : `build in progress — editing unlocks when it settles`}
        </span>
      )}
      <Button
        size={value(`sm`)}
        variant={`secondary`}
        data-testid={`widget-edit-btn`}
        disabled={value15}
        onClick={(..._extraArguments: unknown[]): Dynamic => value19(true)}
      >{`Edit`}</Button>
    </span>
  );
  return (
    <div className={`flex min-h-0 min-w-0 flex-1`}>
      <div className={`flex min-h-0 min-w-0 flex-1 flex-col`}>
        {input.actionsEl &&
          value4 &&
          (0, ReactDOM.createPortal)(value65, input.actionsEl)}
        {value26 && (
          <div
            className={`text-footnote shrink-0 border-b px-3 py-1.5 ${value26.tone === `danger` ? `text-danger` : value26.tone === `warn` ? `text-secondary` : `text-success`}`}
          >
            {value26.text}
            {value26.action && (
              <Button
                size={value(`sm`)}
                variant={`secondary`}
                className={`ml-2`}
                disabled={value51}
                data-testid={`widget-banner-action`}
                onClick={value26.action.run}
              >
                {value26.action.label}
              </Button>
            )}
            <Button
              size={value(`sm`)}
              variant={`ghost`}
              className={`ml-2`}
              onClick={(..._extraArguments: unknown[]): Dynamic =>
                value27(null)
              }
            >{`dismiss`}</Button>
          </div>
        )}
        <div
          ref={value2}
          className={`min-h-0 flex-1 overflow-auto`}
          data-testid={`widget-panel-editor`}
        />
        {!value4 && (
          <div className={`text-muted text-footnote p-3`}>{`Loading…`}</div>
        )}
        {value43 && value10 && value8 && value29 === `draft` && value22 && (
          <div
            className={`text-muted text-footnote shrink-0 border-t px-3 py-1.5`}
            data-testid={`widget-room-preview-note`}
          >{`The document shows this draft’s live render while you review — the draft/published toggle above compares; Publish ships exactly what you see.`}</div>
        )}
        {value20.length > 0 && (
          <div className={`max-h-[30%] shrink-0 overflow-auto border-t`}>
            <div
              className={`text-muted text-caption px-3 pt-1.5 font-semibold tracking-wide uppercase`}
            >
              {`Problems (`}
              {value20.length}
              {`)`}
            </div>
            {value20.map(
              (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
                <div
                  {...originalJsxsProps(
                    {
                      className: `text-footnote px-3 py-1`,
                      children: [
                        <div className={`text-danger`}>
                          {diagnosticMessage(input2)}
                        </div>,
                        <details
                          className={`text-muted text-caption font-mono`}
                        >
                          <summary className={`cursor-pointer select-none`}>
                            {input2.rule}
                            {` · line `}
                            {input2.line}
                            {`:`}
                            {input2.col}
                          </summary>
                          <div className={`whitespace-pre-wrap`}>
                            {input2.message}
                          </div>
                        </details>,
                      ],
                    },
                    `${input2.rule}:${input2.line}:${input2.col}`,
                  )}
                />
              ),
            )}
          </div>
        )}
        <StampedAddressesForNode nodeKey={value28} />
      </div>
    </div>
  );
}
var elementAnchorSuffix: Dynamic = RegExp(
  `~el:(${editorAnchorsAndMentionsPattern2.source.slice(1, -1)})$`,
);
function mergeStreamRows(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let entries: Dynamic = new (Map as Dynamic)();
  for (let value of options as Dynamic)
    if (isNodeThread(value, context)) {
      entries.set(value.id, value);
    }
  for (let value of input as Dynamic)
    if (isNodeThread(value, context)) {
      entries.set(value.id, value);
    }
  return [...entries.values()];
}
function useWidgetStream(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = useThreads(options);
  let value2: Dynamic = (0, React.useId)();
  let value3: Dynamic = usePreviewCommentsStore(
    (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      input2.entries[value2] ?? EMPTY_PREVIEW_COMMENTS,
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => (
      usePreviewCommentsStore.getState().mount(value2, input, options),
      (..._extraArguments: unknown[]): Dynamic =>
        usePreviewCommentsStore.getState().stop(value2)
    ),
    [value2, input, options],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): Dynamic =>
        usePreviewCommentsStore.getState().release(value2),
    [value2],
  );
  return (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      mergeStreamRows(value, value3, context),
    [value, value3, context],
  );
}
var toolLogCategory: Dynamic = {
  "widget:draft": `edits`,
  "widget:publish": `publishes`,
  "widget:revert": `publishes`,
  "widget:softcap-warn": `warnings`,
  "widget:run": `runs`,
  "widget:run-check": `runs`,
  "widget:invoke": `invocations`,
  "widget:invoke-result": `invocations`,
  "widget:define": `invocations`,
  "widget:define-result": `invocations`,
};
var toolLogColor: Dynamic = {
  "widget:draft": `text-secondary`,
  "widget:publish": `text-success`,
  "widget:revert": `text-success`,
  "widget:softcap-warn": `text-warning`,
  "widget:run": `text-accent`,
  "widget:run-check": `text-accent`,
  "widget:invoke": `text-aqua-600`,
  "widget:invoke-result": `text-aqua-600`,
  "widget:define": `text-pro`,
  "widget:define-result": `text-pro`,
};
var toolColor: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => toolLogColor[input.tool] ?? `text-primary`;
var isFailureStatus: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => /error|fail|denied|reject/i.test(input);
var eventParamsCache: Dynamic = new (WeakMap as Dynamic)();
function parseEventParams(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!input.params || input.params === `{}`) return null;
  if (eventParamsCache.has(input)) return eventParamsCache.get(input) ?? null;
  let value: Dynamic = null;
  try {
    let value2: Dynamic = JSON.parse(input.params);
    value = value2 && typeof value2 == `object` ? value2 : null;
  } catch {
    value = null;
  }
  eventParamsCache.set(input, value);
  return value;
}
var formatByteCount = (input?: Dynamic, ..._extraArguments: unknown[]) =>
  typeof input == `number`
    ? input >= 1024 * 1024
      ? `${(input / (1024 * 1024)).toFixed(1)}MB`
      : input >= 1024
        ? `${(input / 1024).toFixed(1)}KB`
        : `${input}B`
    : null;
var truncateText: Dynamic = (
  input?: Dynamic,
  options: Dynamic = 40,
  ..._extraArguments: unknown[]
): Dynamic =>
  typeof input == `string`
    ? input.length > options
      ? `${input.slice(0, options)}…`
      : input
    : ``;
function agentIdFromActor(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return input?.startsWith(`agent:`) ? input.slice(6) : null;
}
var shortenId: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => (input.length > 14 ? `${input.slice(0, 14)}…` : input);
function describeToolEvent(
  state?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = parseEventParams(state) ?? {};
  let text: Dynamic = value.text;
  let value2 = (input?: Dynamic, ..._extraArguments: unknown[]) => {
    if (!input || (input.from === undefined && input.to === undefined))
      return null;
    let value3: Dynamic = (
      input2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      truncateText(typeof input2 == `string` ? input2.trim() : input2);
    return `text edit: “${value3(input.from)}” → “${value3(input.to)}”`;
  };
  switch (state.tool) {
    case `widget:run`:
      return state.status === `dispatched`
        ? {
            text: `run started · run/${value.runId ?? `?`}`,
          }
        : state.status === `error`
          ? {
              text: `run failed: ${value.error ?? `unknown error`}`,
              danger: true,
            }
          : state.status === `cancelled`
            ? {
                text: `run cancelled`,
                danger: true,
              }
            : {
                text: `run finished`,
              };
    case `widget:draft`:
      if (value.mode === `text`)
        return {
          text: value2(text) ?? `text edit · ${value.id ?? `?`}`,
        };
      if (value.mode === `edits`) {
        let value3: Dynamic = Array.isArray(value.edits)
          ? value.edits.length
          : null;
        return {
          text: [
            `${value3 ?? `?`} edit${value3 === 1 ? `` : `s`}`,
            formatByteCount(value.bytes),
          ]
            .filter(Boolean)
            .join(` · `),
        };
      }
      return {
        text: [`whole rewrite`, formatByteCount(value.bytes)]
          .filter(Boolean)
          .join(` · `),
      };
    case `widget:publish`:
      return value.via === `text-edit`
        ? {
            text: value2(text) ?? `text edit · ${value.id ?? `?`}`,
          }
        : {
            text: [`published`, formatByteCount(value.bytes)]
              .filter(Boolean)
              .join(` · `),
          };
    case `widget:revert`:
      return {
        text: `reverted to last publish`,
      };
    case `widget:softcap-warn`:
      return {
        text: `soft cap: ${formatByteCount(value.bytes) ?? `?`} of ${formatByteCount(value.cap) ?? `?`}`,
        danger: false,
      };
    case `widget:invoke`:
      return typeof value.routine == `string`
        ? {
            text: `→ ${value.routine}`,
          }
        : null;
    case `widget:invoke-result`:
      return {
        text: [value.runId ? `run/${value.runId}` : null, value.status ?? null]
          .filter(Boolean)
          .join(` · `),
        danger:
          typeof value.status == `string` && isFailureStatus(value.status),
      };
    case `widget:define`:
      return typeof value.routine == `string`
        ? {
            text: `defined ${value.routine}${value.type ? ` (${value.type})` : ``}`,
          }
        : null;
    case `widget:define-result`:
      return typeof value.routine == `string`
        ? {
            text: `${value.routine} ready`,
          }
        : null;
    case `widget:run-check`:
      return value.ok
        ? {
            text: `check ✓${value.as ? ` (${value.as})` : ``}`,
          }
        : {
            text: `check ✕${value.as ? ` (${value.as})` : ``}${typeof value.violations == `number` ? ` · ${value.violations} violation${value.violations === 1 ? `` : `s`}` : ``}`,
            danger: true,
          };
    default:
      return null;
  }
}
function ToolEventDetails(
  { e: input }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!input.params || input.params === `{}`) return null;
  let value: Dynamic = parseEventParams(input);
  return (
    <details className={`text-muted font-mono`}>
      <summary className={`cursor-pointer select-none`}>{`details`}</summary>
      {value === null ? (
        <pre className={`text-caption break-all whitespace-pre-wrap`}>
          {input.params}
        </pre>
      ) : (
        <div className={`text-caption mt-0.5 flex flex-col gap-0.5 pl-3`}>
          {Array.isArray(value.edits) &&
            value.edits.map(
              (
                input2?: Dynamic,
                options?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => {
                let value2: Dynamic = input2.quote?.exact;
                return (
                  <div
                    {...originalJsxsProps(
                      {
                        className: `flex flex-col`,
                        children: [
                          <span className={`text-danger/80 truncate`}>
                            {`− “`}
                            {truncateText(value2, 80)}
                            {`”`}
                          </span>,
                          <span className={`text-success/90 truncate`}>
                            {`+`}
                            {` `}
                            {typeof input2.with == `string`
                              ? `“${truncateText(input2.with, 80)}”`
                              : `${formatByteCount(input2.withBytes) ?? `?`} (truncated)`}
                          </span>,
                        ],
                      },
                      options,
                    )}
                  />
                );
              },
            )}
          {value.text != null && typeof value.text == `object` && (
            <div className={`flex flex-col`}>
              <span className={`text-danger/80 truncate`}>
                {`− “`}
                {truncateText(value.text.from, 80)}
                {`”`}
              </span>
              <span className={`text-success/90 truncate`}>
                {`+ “`}
                {truncateText(value.text.to, 80)}
                {`”`}
              </span>
            </div>
          )}
          <dl className={`grid grid-cols-[72px_1fr] gap-x-2`}>
            {Object.entries(value)
              .filter(
                (
                  [input2, input3]: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  input2 !== `edits` &&
                  input2 !== `text` &&
                  (typeof input3 != `object` || !input3),
              )
              .map(
                (
                  [input2, input3]: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => (
                  <React.Fragment
                    {...originalJsxsProps(
                      {
                        children: [
                          <dt className={`text-muted truncate`}>{input2}</dt>,
                          <dd className={`truncate`}>
                            {truncateText(String(input3), 120)}
                          </dd>,
                        ],
                      },
                      input2,
                    )}
                  />
                ),
              )}
          </dl>
          {input.truncated && (
            <span
              className={`text-muted italic`}
            >{`payload truncated server-side`}</span>
          )}
        </div>
      )}
    </details>
  );
}
function ToolEventRow(
  { e: state }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = resolvePlatformApiAndAuthUseContext2();
  let value2: Dynamic = describeToolEvent(state);
  let value3: Dynamic = isFailureStatus(state.status);
  let value4: Dynamic =
    value2?.danger || value3 ? `text-danger` : toolColor(state);
  let value5: Dynamic = state.tool === `widget:run`;
  let value6: Dynamic = agentIdFromActor(state.actor);
  return (
    <div data-testid={`widget-stream-event`} className={`text-caption py-1`}>
      <div className={`flex items-baseline gap-2`}>
        <span
          className={`w-3 shrink-0 text-center font-mono ${value4}`}
        >{`·`}</span>
        <span className={`min-w-0 flex-1 truncate font-mono`}>
          {!value5 && <span className={value4}>{state.tool}</span>}
          {(value3 || !value2) && (
            <span className={value3 ? `text-danger` : `text-muted`}>
              {` `}
              {state.status}
            </span>
          )}
          {value2 && (
            <span className={value2.danger ? `text-danger` : `text-primary`}>
              {value5 ? `` : ` `}
              {value2.text}
            </span>
          )}
        </span>
        <span className={`text-muted shrink-0`}>
          {value6
            ? `claude · ${shortenId(value6)}`
            : (state.actor ?? state.user)}
          {(state.actor ?? state.user) && ` · `}
          {state.at &&
            resolvePlatformSessionAndSourcesWeekday(
              state.at,
              Date.parse(value.now()),
              value.locale,
              value.timeZone,
            )}
        </span>
      </div>
      {!value5 && (
        <div className={`pl-5`}>
          <ToolEventDetails e={state} />
        </div>
      )}
    </div>
  );
}
var MIN_GROUP_LENGTH: Dynamic = 3;
var runIdFromEvent: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  input.tool === `widget:run` ? (parseEventParams(input)?.runId ?? null) : null;
var isGroupableToolRow: Dynamic = (
  entry?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  entry.kind !== `message` &&
  entry.row.tool !== `widget:run` &&
  entry.row.tool !== `widget:softcap-warn`;
function eventOrigin(input?: Dynamic, ..._extraArguments: unknown[]) {
  let value: Dynamic = parseEventParams(input)?.origin;
  return value === `human`
    ? `human`
    : typeof value == `string` && value !== ``
      ? `machinery`
      : null;
}
var isMachineryEvent = (input?: Dynamic, ..._extraArguments: unknown[]) => {
  if (
    !isGroupableToolRow(input) ||
    isFailureStatus(input.row.status) ||
    describeToolEvent(input.row)?.danger
  )
    return false;
  let value: Dynamic = eventOrigin(input.row);
  return value === `human`
    ? false
    : value === `machinery`
      ? true
      : agentIdFromActor(input.row.actor) != null;
};
var isInvocationResultPair: Dynamic = (
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => {
  if (
    input.tool !== `widget:invoke` ||
    options.tool !== `widget:invoke-result` ||
    eventOrigin(options) !== `machinery`
  )
    return false;
  let value: Dynamic = parseEventParams(options);
  return !value ||
    (value.invocationId != null && value.invocationId !== input.id)
    ? false
    : value.status == null || value.status === `ok`;
};
function groupToolEvents(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let entries: Dynamic = new (Map as Dynamic)();
  for (let value4 of input as Dynamic) {
    if (value4.kind === `message`) continue;
    let value5: Dynamic = runIdFromEvent(value4.row);
    if (!value5) continue;
    let entry: Dynamic = entries.get(value5);
    if (!entry) {
      entry = {
        kind: `run-section`,
        runId: value5,
        at: value4.at,
        header: null,
        footer: null,
        rows: [],
      };
      entries.set(value5, entry);
    }
    if (value4.row.status === `dispatched`) {
      entry.header = value4.row;
      entry.at = value4.at;
    } else {
      entry.footer = value4.row;
    }
  }
  let items: Dynamic = [];
  let values: Dynamic = new (Set as Dynamic)();
  let value: Dynamic = null;
  let value2 = (..._extraArguments: unknown[]): undefined => {
    if (!value) return;
    let items2: Dynamic = [];
    let items3: Dynamic = [];
    let value4 = (..._extraArguments: unknown[]): undefined => {
      if (items3.length) {
        if (items3.length >= MIN_GROUP_LENGTH)
          items2.push({
            kind: `group`,
            groupKind: toolLogCategory[items3[0].tool] ?? `edits`,
            at: items3[0].at ?? value.at,
            rows: items3,
          });
        else
          for (let value5 of items3 as Dynamic)
            items2.push({
              kind: toolLogCategory[value5.tool] ?? `edits`,
              at: value5.at ?? ``,
              row: value5,
            });
        items3 = [];
      }
    };
    let rows: Dynamic = value.rows;
    for (let index: Dynamic = 0; index < rows.length; index++) {
      let value5: Dynamic = rows[index];
      let value6: Dynamic = index + 1 < rows.length ? rows[index + 1] : null;
      if (
        value6 &&
        eventOrigin(value5) === `machinery` &&
        isInvocationResultPair(value5, value6)
      ) {
        value4();
        let value7: Dynamic = parseEventParams(value5);
        let value8: Dynamic =
          typeof value7?.routine == `string` ? value7.routine : `routine`;
        let value9: Dynamic = items2.at(-1);
        if (value9?.kind === `cycles` && value9.routine === value8) {
          value9.pairs.push({
            invoke: value5,
            result: value6,
          });
        } else {
          items2.push({
            kind: `cycles`,
            routine: value8,
            at: value5.at ?? value.at,
            pairs: [
              {
                invoke: value5,
                result: value6,
              },
            ],
          });
        }
        index++;
        continue;
      }
      items3.push(value5);
    }
    value4();
    (items.push as Dynamic)(...items2);
    value = null;
  };
  let value3 = (input2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    if (!values.has(input2)) {
      values.add(input2);
      items.push(entries.get(input2));
    }
  };
  for (let value4 of input as Dynamic) {
    if (value4.kind === `message`) {
      value2();
      items.push(value4);
      continue;
    }
    let value5: Dynamic = runIdFromEvent(value4.row);
    if (value5) {
      value2();
      value3(value5);
      continue;
    }
    let value6: Dynamic = agentIdFromActor(value4.row.actor);
    if (value6 && entries.has(value6) && isGroupableToolRow(value4)) {
      value2();
      entries.get(value6).rows.push(value4.row);
      value3(value6);
      continue;
    }
    if (isMachineryEvent(value4)) {
      let value7: Dynamic =
        value != null &&
        (value.lastSidx == null ||
          value4.sidx == null ||
          value4.sidx === value.lastSidx + 1);
      if (value && value7 && value.actor === (value4.row.actor ?? ``)) {
        value.rows.push(value4.row);
        value.lastSidx = value4.sidx;
      } else {
        value2();
        value = {
          at: value4.at,
          actor: value4.row.actor ?? ``,
          rows: [value4.row],
          lastSidx: value4.sidx,
        };
      }
      continue;
    }
    value2();
    items.push(value4);
  }
  value2();
  return items;
}
function RunLogSection(
  { s: input }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = resolvePlatformApiAndAuthUseContext2();
  let value2: Dynamic = input.footer?.status ?? `running`;
  let value3: Dynamic =
    value2 === `error` ||
    value2 === `cancelled` ||
    input.rows.some(
      (state?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        isFailureStatus(state.status),
    );
  let value4: Dynamic =
    input.header?.at && input.footer?.at
      ? Math.max(
          0,
          new (Date as Dynamic)(input.footer.at).getTime() -
            new (Date as Dynamic)(input.header.at).getTime(),
        )
      : null;
  let value5: Dynamic =
    value4 === null
      ? null
      : value4 >= 6e4
        ? `${Math.floor(value4 / 6e4)}m ${Math.round((value4 % 6e4) / 1e3)}s`
        : `${Math.round(value4 / 1e3)}s`;
  let text: Dynamic = input.rows
    .map(
      (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        describeToolEvent(input2)?.text ?? input2.tool.replace(/^code:/, ``),
    )
    .join(` → `);
  let value6: Dynamic = input.footer ? describeToolEvent(input.footer) : null;
  let value7: Dynamic = value2 === `ok` ? `✓` : value3 ? `✕` : `…`;
  let value8: Dynamic = value3
    ? (value6?.text ?? `run ${value2}`)
    : [`run ${value2 === `ok` ? `✓` : value2}`, text || null, value5]
        .filter(Boolean)
        .join(` · `);
  let value9: Dynamic = input.footer?.at ?? input.header?.at ?? null;
  return (
    <details data-testid={`run-section`} open={value3 || undefined}>
      <summary
        className={`text-caption flex cursor-pointer list-none items-baseline gap-2 py-1 select-none`}
      >
        <span
          className={`w-3 shrink-0 text-center font-mono ${value3 ? `text-danger` : `text-accent`}`}
        >
          {value7}
        </span>
        <span
          className={`min-w-0 flex-1 truncate font-mono ${value3 ? `text-danger` : `text-secondary`}`}
        >
          {value8}
          <span className={`text-muted`}>{` ▸`}</span>
        </span>
        <span className={`text-muted shrink-0`}>
          {`claude · `}
          {shortenId(input.runId)}
          {` ·`}
          {` `}
          {value9 &&
            resolvePlatformSessionAndSourcesWeekday(
              value9,
              Date.parse(value.now()),
              value.locale,
              value.timeZone,
            )}
        </span>
      </summary>
      <div className={`border-strong/40 ml-1.5 border-l pl-3`}>
        {input.header && <ToolEventRow e={input.header} />}
        {input.rows.map(
          (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
            <ToolEventRow
              {...originalJsxProps(
                {
                  e: input2,
                },
                input2.id,
              )}
            />
          ),
        )}
        {input.footer && <ToolEventRow e={input.footer} />}
      </div>
    </details>
  );
}
function InvocationCycle(
  { c: input }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = resolvePlatformApiAndAuthUseContext2();
  let value2: Dynamic = input.pairs[input.pairs.length - 1];
  let value3: Dynamic = parseEventParams(value2.result) ?? {};
  let value4: Dynamic =
    typeof value3.status == `string` ? value3.status : value2.result.status;
  let value5: Dynamic = typeof value3.runId == `string` ? value3.runId : null;
  let value6: Dynamic = agentIdFromActor(value2.invoke.actor);
  let value7: Dynamic = value2.result.at ?? value2.invoke.at;
  return (
    <details data-testid={`widget-stream-cycle`}>
      <summary
        className={`text-caption flex cursor-pointer list-none items-baseline gap-2 py-1 select-none`}
      >
        <span
          className={`text-aqua-600 w-3 shrink-0 text-center font-mono`}
        >{`↻`}</span>
        <span className={`min-w-0 flex-1 truncate font-mono`}>
          <span className={`text-secondary`}>
            {input.routine}
            {` · `}
            {value4}
            {value5 ? ` · run/${shortenId(value5)}` : ``}
          </span>
          <span className={`text-muted`}>
            {input.pairs.length > 1 ? ` ×${input.pairs.length}` : ``}
            {` ▸`}
          </span>
        </span>
        <span className={`text-muted shrink-0`}>
          {value6
            ? `claude · ${shortenId(value6)}`
            : (value2.invoke.actor ?? value2.invoke.user)}
          {(value2.invoke.actor ?? value2.invoke.user) && ` · `}
          {value7 &&
            resolvePlatformSessionAndSourcesWeekday(
              value7,
              Date.parse(value.now()),
              value.locale,
              value.timeZone,
            )}
        </span>
      </summary>
      <div className={`pl-3`}>
        {input.pairs.map(
          (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
            <React.Fragment
              {...originalJsxsProps(
                {
                  children: [
                    <ToolEventRow e={input2.invoke} />,
                    <ToolEventRow e={input2.result} />,
                  ],
                },
                input2.invoke.id,
              )}
            />
          ),
        )}
      </div>
    </details>
  );
}
function ToolEventGroup(
  { g: input }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = resolvePlatformApiAndAuthUseContext2();
  let value2: Dynamic = input.rows[input.rows.length - 1];
  let text: Dynamic = input.rows
    .map(
      (state?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        describeToolEvent(state)?.text ??
        `${state.tool.replace(/^code:/, ``)} ${state.status}`,
    )
    .join(` → `);
  let value3: Dynamic = agentIdFromActor(input.rows[0].actor);
  return (
    <details data-testid={`widget-stream-group`}>
      <summary
        className={`text-caption flex cursor-pointer list-none items-baseline gap-2 py-1 select-none`}
      >
        <span
          className={`text-secondary w-3 shrink-0 text-center font-mono`}
        >{`·`}</span>
        <span className={`min-w-0 flex-1 truncate font-mono`}>
          <span className={`text-secondary`}>{text}</span>
          <span className={`text-muted`}>
            {` ×`}
            {input.rows.length}
            {` ▸`}
          </span>
        </span>
        <span className={`text-muted shrink-0`}>
          {value3
            ? `claude · ${shortenId(value3)}`
            : (input.rows[0].actor ?? input.rows[0].user)}
          {(input.rows[0].actor ?? input.rows[0].user) && ` · `}
          {value2.at &&
            resolvePlatformSessionAndSourcesWeekday(
              value2.at,
              Date.parse(value.now()),
              value.locale,
              value.timeZone,
            )}
        </span>
      </summary>
      <div className={`pl-3`}>
        {input.rows.map(
          (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
            <ToolEventRow
              {...originalJsxProps(
                {
                  e: input2,
                },
                input2.id,
              )}
            />
          ),
        )}
      </div>
    </details>
  );
}
function WidgetLogTab(input?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
  let value: Dynamic = resolvePlatformSyncAndRoutingCompact();
  let value2: Dynamic = resolvePlatformApiAndAuthUseContext2();
  let value3: Dynamic = useWidgetStream(
    input.container,
    input.fsEntryId,
    input.nodeId,
  );
  let [value4, value5]: Dynamic = (0, React.useState)(``);
  let [value6, value7]: Dynamic = (0, React.useState)(input.anchor ?? null);
  let [value8, value9]: Dynamic = (0, React.useState)(false);
  let [value10, value11]: Dynamic = (0, React.useState)(null);
  let [value12, value13]: Dynamic = (0, React.useState)(null);
  let [value14, value15]: Dynamic = (0, React.useState)(null);
  let [value16, value17]: Dynamic = (0, React.useState)(false);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let value33: Dynamic = false;
      let index: Dynamic = 0;
      let value34 = async (
        input2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Promise<undefined> => {
        if (!input2 && (document as Dynamic).hidden) return;
        let value36: Dynamic = ++index;
        try {
          let value37: Dynamic =
            await resolvePlatformLiveDocumentAndHistoryWidgetNodeLog(
              input.container,
              input.fsEntryId,
              input.nodeId,
            );
          if (value33 || value36 !== index) return;
          value17(false);
          let value38: Dynamic = JSON.stringify(value37.items);
          value15(
            (input3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              input3 && JSON.stringify(input3) === value38
                ? input3
                : value37.items,
          );
        } catch {
          if (!value33) {
            value17(true);
          }
        }
      };
      value34(true);
      let value35: Dynamic = setInterval(
        (..._extraArguments: unknown[]): undefined => void value34(false),
        7e3,
      );
      return (..._extraArguments: unknown[]): undefined => {
        value33 = true;
        clearInterval(value35);
      };
    },
    [input.container, input.fsEntryId, input.nodeId],
  );
  let value18: Dynamic = widgetLogFilters(
    (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => input2.value,
  );
  let value19: Dynamic = widgetLogFilters(
    (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => input2.set,
  );
  let value20: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => {
      let mapped: Dynamic = value3.map(
        (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
          kind: `message`,
          at: input2.root?.at || `￿`,
          thread: input2,
        }),
      );
      for (let value33 of (value14 ?? []) as Dynamic) {
        let value34: Dynamic = toolLogCategory[value33.tool];
        if (value34) {
          mapped.push({
            kind: value34,
            at: value33.at || `￿`,
            row: value33,
          });
        }
      }
      return mapped.toSorted(
        (
          input2?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => input2.at.localeCompare(options.at),
      );
    },
    [value3, value14],
  );
  let {
    visible: value21,
    display: value22,
    initialThreadId: value23,
  }: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => {
      let filtered: Dynamic = value20
        .map(
          (
            input2?: Dynamic,
            options?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => ({
            ...input2,
            sidx: options,
          }),
        )
        .filter((entry?: Dynamic, ..._extraArguments: unknown[]) =>
          entry.kind === `message`
            ? value18.chats !== false
            : value18[entry.kind] !== false,
        );
      let match: Dynamic = value20.find(
        (entry?: Dynamic, ..._extraArguments: unknown[]) =>
          entry.kind === `message`,
      );
      return {
        visible: filtered,
        display: groupToolEvents(filtered),
        initialThreadId: match?.kind === `message` ? match.thread.id : null,
      };
    },
    [value20, value18],
  );
  let value24: Dynamic = (0, React.useRef)(null);
  let [value25, value26]: Dynamic = (0, React.useState)(true);
  let value27: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): undefined => {
      let current: Dynamic = value24.current;
      if (current) {
        current.scrollTop = current.scrollHeight;
      }
      value26(true);
    },
    [],
  );
  let value28: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): undefined => {
      let current: Dynamic = value24.current;
      if (current) {
        value26(
          current.scrollHeight - current.scrollTop - current.clientHeight < 40,
        );
      }
    },
    [],
  );
  let value29: Dynamic = value21.at(-1);
  let value30: Dynamic =
    value29 == null
      ? ``
      : value29.kind === `message`
        ? value29.thread.id
        : value29.row.id;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (value25) {
        value27();
      }
    },
    [value21.length, value30, value25, value27],
  );
  let value31 = async (
    input2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<undefined> => {
    let value33: Dynamic =
      await resolvePlatformLiveDocumentAndHistoryWidgetRunMessage(input.dir, {
        ref: input2,
        text: options,
      });
    if (`error` in value33) {
      value11(value33.message ?? `Send failed.`);
      return;
    }
    EditorSelectionAndTablesByKey.getState().mark(
      resolveEditorSelectionAndTablesValue11(input.fsEntryId, input.nodeId),
    );
    value5(``);
    if (value33.steered) {
      value11(`Delivered to the live run.`);
      value13({
        ref: input2,
        text: options,
      });
    } else {
      value11(`A run picked this up.`);
      value13(null);
    }
  };
  let value32 = async (..._extraArguments: unknown[]): Promise<undefined> => {
    let value33: Dynamic = value4.trim();
    if (!(!value33 || value8)) {
      value9(true);
      value11(null);
      try {
        await value31(
          value6
            ? `${input.sessionRef}~el:${value6.segment}`
            : input.sessionRef,
          value33,
        );
      } catch {
        value11(`Send failed — try again.`);
      } finally {
        value9(false);
      }
    }
  };
  return (
    <div className={`flex min-h-0 min-w-0 flex-1 flex-col`}>
      <div className={`flex shrink-0 items-center gap-1 border-b px-2 py-1`}>
        {LOG_FILTER_KEYS.map(
          (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
            <Button
              {...originalJsxProps(
                {
                  size: value(`sm`),
                  variant: value18[input2] === false ? `ghost` : `secondary`,
                  onClick: (..._extraArguments: unknown[]): Dynamic =>
                    value19({
                      ...value18,
                      [input2]: value18[input2] === false,
                    }),
                  children: (
                    <span
                      className={`font-mono ${value18[input2] === false ? `text-muted line-through` : ``}`}
                    >
                      {input2}
                    </span>
                  ),
                },
                input2,
              )}
            />
          ),
        )}
        <span className={`text-muted text-caption ml-auto`}>
          {value21.length}
          {`/`}
          {value20.length}
          {` rows`}
        </span>
      </div>
      <div className={`relative min-h-0 flex-1`}>
        <div
          ref={value24}
          onScroll={value28}
          data-testid={`widget-log-stream`}
          className={`h-full overflow-auto px-3 py-2`}
        >
          {value14 === null && !value16 && value3.length === 0 && (
            <div className={`text-muted text-footnote`}>{`Loading…`}</div>
          )}
          {value14 === null && value16 && (
            <div
              className={`text-muted text-footnote`}
            >{`The event log couldn't be loaded — messages still work.`}</div>
          )}
          {value14 !== null && value21.length === 0 && (
            <div
              className={`text-muted text-footnote`}
            >{`Nothing on this block yet (row kinds can be hidden by the chips above).`}</div>
          )}
          {value22.map(
            (entry?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
              if (entry.kind === `run-section`)
                return (
                  <RunLogSection
                    {...originalJsxProps(
                      {
                        s: entry,
                      },
                      entry.runId,
                    )}
                  />
                );
              if (entry.kind === `cycles`)
                return (
                  <InvocationCycle
                    {...originalJsxProps(
                      {
                        c: entry,
                      },
                      entry.pairs[0].invoke.id,
                    )}
                  />
                );
              if (entry.kind === `group`)
                return (
                  <ToolEventGroup
                    {...originalJsxProps(
                      {
                        g: entry,
                      },
                      entry.rows[0].id,
                    )}
                  />
                );
              if (entry.kind !== `message`)
                return (
                  <ToolEventRow
                    {...originalJsxProps(
                      {
                        e: entry.row,
                      },
                      entry.row.id,
                    )}
                  />
                );
              let thread: Dynamic = entry.thread;
              let value33: Dynamic = threadRefOf(thread);
              let value34: Dynamic = elementAnchorSuffix.exec(value33)?.[1];
              let value35: Dynamic = thread.target?.vs;
              let value36: Dynamic = isRunProgress(thread);
              let value37: Dynamic = agentIdFromActor(thread.root?.actor);
              return (
                <div
                  {...originalJsxsProps(
                    {
                      "data-testid": value36 ? `run-progress-row` : undefined,
                      className: `flex items-baseline gap-2 py-1`,
                      children: [
                        <span
                          className={`text-muted w-3 shrink-0 text-center font-mono`}
                        >{`›`}</span>,
                        <div className={`min-w-0 flex-1`}>
                          <div
                            className={`text-muted text-caption flex items-baseline gap-2`}
                          >
                            <span
                              className={`${value36 || value37 ? `text-muted` : `text-primary`} font-medium`}
                            >
                              {value36
                                ? `run`
                                : value37
                                  ? `claude`
                                  : thread.root?.user}
                            </span>
                            {!value36 && value37 && (
                              <span className={`font-mono`}>
                                {shortenId(value37)}
                              </span>
                            )}
                            {thread.id === value23 && (
                              <span
                                data-testid={`initial-prompt-tag`}
                                className={`bg-alpha-1 text-muted text-caption rounded px-1`}
                              >{`initial prompt`}</span>
                            )}
                            {value34 && (
                              <Tooltip
                                content={`Attach this element to your next message`}
                              >
                                <button
                                  type={`button`}
                                  className={`bg-alpha-1 hover:bg-alpha-2 rounded px-1 font-mono`}
                                  onClick={(
                                    ..._extraArguments: unknown[]
                                  ): Dynamic =>
                                    value7({
                                      segment: value34,
                                      vs: value35,
                                    })
                                  }
                                >
                                  {`#`}
                                  {input.nodeId}
                                  {`/`}
                                  {value34}
                                </button>
                              </Tooltip>
                            )}
                            {value35 &&
                              Object.entries(value35).map(
                                (
                                  [input2, input3]: Dynamic,
                                  ..._extraArguments: unknown[]
                                ): Dynamic => (
                                  <span
                                    {...originalJsxsProps(
                                      {
                                        className: `bg-alpha-1 rounded px-1 font-mono`,
                                        children: [input2, `: `, input3],
                                      },
                                      input2,
                                    )}
                                  />
                                ),
                              )}
                            {thread.resolved && <span>{`resolved`}</span>}
                          </div>
                          <div
                            className={`${value36 ? `text-secondary italic` : `text-primary`} text-footnote whitespace-pre-wrap`}
                          >
                            <ReferenceText
                              text={thread.root?.body ?? ``}
                              container={input.container}
                            />
                          </div>
                          {thread.replies.map(
                            (
                              input2?: Dynamic,
                              ..._extraArguments: unknown[]
                            ): Dynamic => {
                              let value38: Dynamic = agentIdFromActor(
                                input2.actor,
                              );
                              return (
                                <div
                                  {...originalJsxsProps(
                                    {
                                      className: `mt-1 pl-3`,
                                      children: [
                                        <div
                                          className={`text-muted text-caption`}
                                        >
                                          <span
                                            className={`${value38 ? `text-muted` : `text-primary`} font-medium`}
                                          >
                                            {value38 ? `claude` : input2.user}
                                          </span>
                                          {value38 && (
                                            <span className={`font-mono`}>
                                              {` `}
                                              {shortenId(value38)}
                                            </span>
                                          )}
                                          {` `}
                                          {input2.at &&
                                            resolvePlatformSessionAndSourcesWeekday(
                                              input2.at,
                                              Date.parse(value2.now()),
                                              value2.locale,
                                              value2.timeZone,
                                            )}
                                        </div>,
                                        <div
                                          className={`text-secondary text-footnote whitespace-pre-wrap`}
                                        >
                                          <ReferenceText
                                            text={input2.body}
                                            container={input.container}
                                          />
                                        </div>,
                                      ],
                                    },
                                    input2.id,
                                  )}
                                />
                              );
                            },
                          )}
                        </div>,
                        <span className={`text-muted text-caption shrink-0`}>
                          {thread.root?.at &&
                            resolvePlatformSessionAndSourcesWeekday(
                              thread.root.at,
                              Date.parse(value2.now()),
                              value2.locale,
                              value2.timeZone,
                            )}
                        </span>,
                      ],
                    },
                    thread.id,
                  )}
                />
              );
            },
          )}
        </div>
        {!value25 && (
          <Button
            size={value(`sm`)}
            variant={`secondary`}
            className={`bottom-2 left-1/2 -translate-x-1/2`}
            onClick={value27}
          >{`Jump to latest`}</Button>
        )}
      </div>
      <div className={`shrink-0 border-t p-2`}>
        {value6 && (
          <div className={`mb-1 flex items-center gap-1`}>
            <span
              className={`bg-alpha-1 text-secondary text-caption rounded px-1.5 py-0.5 font-mono`}
            >
              {`re: `}
              {value6.segment}
            </span>
            <button
              type={`button`}
              className={`text-muted text-caption hover:underline`}
              onClick={(..._extraArguments: unknown[]): Dynamic => value7(null)}
            >{`remove`}</button>
          </div>
        )}
        {value10 && (
          <div
            className={`text-muted text-caption mb-1 flex items-center gap-2`}
          >
            {value10}
            {value12 && (
              <Button
                size={value(`sm`)}
                variant={`ghost`}
                disabled={value8}
                onClick={(..._extraArguments: unknown[]): undefined => {
                  value9(true);
                  value11(null);
                  value31(value12.ref, value12.text)
                    .catch(
                      (..._extraArguments: unknown[]): Dynamic =>
                        value11(`Send failed — try again.`),
                    )
                    .finally(
                      (..._extraArguments: unknown[]): Dynamic => value9(false),
                    );
                }}
              >{`Not picked up? Send to a fresh run`}</Button>
            )}
          </div>
        )}
        <div className={`flex gap-2`}>
          <textarea
            value={value4}
            onChange={(
              event?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => value5(event.target.value)}
            onKeyDown={(
              event?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              if (event.key === `Enter` && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                value32();
              }
            }}
            rows={2}
            placeholder={`Message this block — ⌘↵ to send`}
            className={`bg-surface-0 text-footnote min-w-0 flex-1 resize-none rounded border px-2 py-1`}
          />
          <Button
            size={value(`sm`)}
            variant={`primary`}
            disabled={value8 || !value4.trim()}
            onClick={(..._extraArguments: unknown[]): undefined =>
              void value32()
            }
          >{`Send`}</Button>
        </div>
      </div>
    </div>
  );
}
function WidgetMessageRow(
  { row: input }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    <div>
      <div className={`text-muted text-caption flex items-baseline gap-2`}>
        <span className={`truncate`}>
          {agentIdFromActor(input.actor) === null
            ? input.user || input.actor || `unknown`
            : `Claude`}
        </span>
        {input.at && (
          <span className={`shrink-0`}>
            {resolvePlatformSessionAndSourcesWeekday(input.at)}
          </span>
        )}
      </div>
      <div className={`text-primary text-footnote whitespace-pre-wrap`}>
        {input.body}
      </div>
    </div>
  );
}
function WidgetCommentsTab(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = resolvePlatformSyncAndRoutingCompact();
  let room: Dynamic = input.room;
  let nodeId: Dynamic = input.nodeId;
  let value2: Dynamic = useThreads(nodeId);
  let value3: Dynamic = (0, React.useRef)(null);
  let value4: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): Dynamic => (
      (value3.current ??= api
        .object(`projects/${room.pid}`, {
          byId: true,
        })
        .then(
          (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            input2.name,
          (..._extraArguments: unknown[]): Dynamic => (
            (value3.current = null),
            null
          ),
        )),
      value3.current
    ),
    [room.pid],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let value20: Dynamic = false;
      value4().then(
        (input2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (!value20 && input2 !== null) {
            useCommentStore.getState().fetch(input2, nodeId);
          }
        },
      );
      return (..._extraArguments: unknown[]): undefined => {
        value20 = true;
      };
    },
    [value4, nodeId],
  );
  let [value5, value6]: Dynamic = (0, React.useState)(null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let value20: Dynamic = false;
      value6(null);
      loadPlatformLiveDocumentAndHistoryContainer(
        room.pid,
        room.fileId,
        input.nodeId,
      )
        .then((input2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (!value20) {
            value6(resolveEditorAnchorsAndMentionsNames(input2?.anchors));
          }
        })
        .catch((..._extraArguments: unknown[]): undefined => {});
      return (..._extraArguments: unknown[]): undefined => {
        value20 = true;
      };
    },
    [room, input.nodeId],
  );
  let value7: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      value2.filter(
        (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          isNodeThread(input2, input.nodeId) &&
          !isRunProgress(input2) &&
          !isBuildConversation(input2),
      ),
    [value2, input.nodeId],
  );
  let value8: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => {
      let entries: Dynamic = new (Map as Dynamic)();
      for (let value20 of value7 as Dynamic) {
        let value21: Dynamic = widgetAnchorOfThread(value20)?.element ?? ``;
        let entry: Dynamic = entries.get(value21);
        if (entry) {
          entry.push(value20);
        } else {
          entries.set(value21, [value20]);
        }
      }
      return entries;
    },
    [value7],
  );
  let [value9, value10]: Dynamic = (0, React.useState)(``);
  let [value11, value12]: Dynamic = (0, React.useState)(``);
  let [value13, value14]: Dynamic = (0, React.useState)(false);
  let [value15, value16]: Dynamic = (0, React.useState)(null);
  let value17: Dynamic = (0, React.useCallback)(
    (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      input2 !== `` &&
      value5 !== null &&
      !resolveEditorAnchorsAndMentionsIncludes(value5, input2),
    [value5],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (value17(value9)) {
        value10(``);
      }
    },
    [value17, value9],
  );
  let value18 = async (..._extraArguments: unknown[]): Promise<undefined> => {
    let value20: Dynamic = value11.trim();
    if (!(!value20 || value13)) {
      value14(true);
      value16(null);
      try {
        let value21: Dynamic =
          await PlatformLiveDocumentAndHistoryCreate.comment(
            room.intend,
            input.nodeId,
            value20,
            value9 || undefined,
          );
        if (!value21.ok) {
          value16(value21.reason);
          return;
        }
        value12(``);
        let value22: Dynamic = await value4();
        if (value22 !== null) {
          await useCommentStore.getState().refetch(value22, nodeId);
        }
      } catch {
        value16(`The comment didn't reach the server — try again.`);
      } finally {
        value14(false);
      }
    }
  };
  let value19: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      [...value8.entries()].toSorted(
        (
          [input2]: Dynamic,
          [options]: Dynamic,
          ..._extraArguments: unknown[]
        ) => (input2 === `` ? -1 : +(options === ``)),
      ),
    [value8],
  );
  return (
    <div className={`flex min-h-0 min-w-0 flex-1 flex-col`}>
      <div
        className={`min-h-0 flex-1 overflow-auto px-3 py-2`}
        data-testid={`widget-comments-list`}
      >
        {value7.length === 0 && (
          <div className={`text-muted text-footnote`}>{`No comments yet`}</div>
        )}
        {value19.map(
          (
            [input2, input3]: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => (
            <div
              {...originalJsxsProps(
                {
                  className: `mb-3`,
                  "data-testid": `widget-comment-group`,
                  "data-anchor": input2,
                  children: [
                    <div
                      className={`text-muted text-caption flex items-baseline gap-2 font-semibold tracking-wide uppercase`}
                    >
                      {input2 === `` ? `Whole widget` : `re: ${input2}`}
                      {value17(input2) && (
                        <Tooltip
                          content={`The published code no longer carries this claude-anchor name. The comment keeps pointing at the name it was written against — it is never re-guessed onto other content.`}
                          multiline={true}
                        >
                          <span
                            className={`text-warning normal-case`}
                            data-testid={`widget-anchor-orphan-badge`}
                          >
                            {`was on: `}
                            {input2}
                            {` — no longer in this widget`}
                          </span>
                        </Tooltip>
                      )}
                    </div>,
                    input3.map(
                      (
                        input4?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): Dynamic => (
                        <div
                          {...originalJsxsProps(
                            {
                              className: `mt-1 rounded border px-2 py-1.5`,
                              "data-testid": `widget-comment-thread`,
                              children: [
                                <WidgetMessageRow row={input4.root} />,
                                input4.replies.map(
                                  (
                                    input5?: Dynamic,
                                    ..._extraArguments: unknown[]
                                  ): Dynamic => (
                                    <div
                                      {...originalJsxProps(
                                        {
                                          className: `border-strong mt-1 border-l pl-2`,
                                          children: (
                                            <WidgetMessageRow row={input5} />
                                          ),
                                        },
                                        input5.id,
                                      )}
                                    />
                                  ),
                                ),
                              ],
                            },
                            input4.id,
                          )}
                        />
                      ),
                    ),
                  ],
                },
                input2 || `(whole)`,
              )}
            />
          ),
        )}
      </div>
      <div className={`shrink-0 border-t px-3 py-2`}>
        <div
          className={`flex flex-wrap items-center gap-1`}
          data-testid={`widget-comment-spots`}
        >
          <span className={`text-muted text-caption`}>{`Attach to:`}</span>
          <Button
            size={value(`sm`)}
            variant={value9 === `` ? `secondary` : `ghost`}
            onClick={(..._extraArguments: unknown[]): Dynamic => value10(``)}
          >{`Whole widget`}</Button>
          {(value5?.names ?? []).map(
            (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
              <Button
                {...originalJsxProps(
                  {
                    size: value(`sm`),
                    variant: value9 === input2 ? `secondary` : `ghost`,
                    "data-testid": `widget-comment-spot`,
                    onClick: (..._extraArguments: unknown[]): Dynamic =>
                      value10(input2),
                    children: input2,
                  },
                  input2,
                )}
              />
            ),
          )}
          {(value5?.prefixes ?? []).length > 0 && (
            <span className={`text-muted text-caption font-mono`}>
              {value5.prefixes
                .map(
                  (input2?: Dynamic, ..._extraArguments: unknown[]) =>
                    `${input2}…`,
                )
                .join(` · `)}
              {` (named by the data)`}
            </span>
          )}
        </div>
        {value15 && (
          <div className={`text-danger text-footnote mt-1`}>{value15}</div>
        )}
        <div className={`mt-1.5 flex items-end gap-2`}>
          <textarea
            value={value11}
            onChange={(
              event?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => value12(event.target.value)}
            onKeyDown={(
              event?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              if (event.key === `Enter` && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                value18();
              }
            }}
            rows={2}
            placeholder={
              value9 === ``
                ? `Comment on this widget — ⌘↵ to post`
                : `Comment re: ${value9} — ⌘↵ to post`
            }
            className={`bg-surface-0 text-footnote min-w-0 flex-1 resize-none rounded border px-2 py-1`}
            data-testid={`widget-comment-input`}
          />
          <Button
            size={value(`sm`)}
            variant={`primary`}
            disabled={value13 || !value11.trim()}
            data-testid={`widget-comment-post`}
            onClick={(..._extraArguments: unknown[]): undefined =>
              void value18()
            }
          >{`Post`}</Button>
        </div>
      </div>
    </div>
  );
}
var trailActionLabels: Dynamic = {
  create: `Created`,
  draft: `Revised`,
  text: `Revised`,
  "text-draft": `Revised`,
  "chart-title": `Revised`,
  "chart-title-draft": `Revised`,
  "spec-patch": `Revised`,
  "draft-edit": `Revised`,
  publish: `Published`,
  revert: `Reverted`,
  delete: `Deleted`,
};
function trailEventLabel(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  switch (input.action) {
    case `create`:
      return input.bytes === undefined
        ? `Widget created`
        : `Widget created (${input.bytes} bytes)`;
    case `draft`:
      return input.bytes === undefined
        ? `Draft written`
        : `Code replaced (${input.bytes} bytes)`;
    case `publish`:
      return `Draft promoted to published`;
    case `revert`:
      return `Draft discarded`;
    case `text`:
      return `Text edited in published code`;
    case `text-draft`:
      return `Text edited in draft`;
    case `draft-edit`:
      return `Quoted text replaced in draft`;
    case `spec-patch`:
      return `Spec patched in published code`;
    case `delete`:
      return `Widget deleted`;
    default:
      return input.action;
  }
}
function WidgetEditHistory(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = resolvePlatformSyncAndRoutingCompact();
  let { rel: value2, abs: value3 }: Dynamic = useProvenanceTimeFormat();
  let [value4, value5]: Dynamic = (0, React.useState)([]);
  let [value6, value7]: Dynamic = (0, React.useState)(undefined);
  let [value8, value9]: Dynamic = (0, React.useState)(`loading`);
  let [value10, value11]: Dynamic = (0, React.useState)(false);
  let [value12, value13]: Dynamic = (0, React.useState)(undefined);
  let { pid: room, fileId: room2 }: Dynamic = input.room;
  let nodeId: Dynamic = input.nodeId;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let value19: Dynamic = false;
      value5([]);
      value7(undefined);
      value9(`loading`);
      value13(undefined);
      (async (..._extraArguments: unknown[]): Promise<undefined> => {
        try {
          let value20: Dynamic = await api.v3WidgetTrail(room, room2, nodeId);
          if (value19) return;
          if (value20.kind !== `ok`) {
            value9(`unavailable`);
            return;
          }
          value5(value20.groups);
          value7(value20.nextBefore);
          value9(`ready`);
        } catch {
          if (!value19) {
            value9(`unavailable`);
          }
        }
      })();
      (async (..._extraArguments: unknown[]): Promise<undefined> => {
        try {
          let value20: Dynamic = await api.v3WidgetProvenance(
            room,
            room2,
            nodeId,
          );
          if (!value19 && value20.kind === `ok`) {
            value13(value20);
          }
        } catch {}
      })();
      return (..._extraArguments: unknown[]): undefined => {
        value19 = true;
      };
    },
    [room, room2, nodeId],
  );
  let value14 = async (..._extraArguments: unknown[]): Promise<undefined> => {
    if (!(value6 === undefined || value10)) {
      value11(true);
      try {
        let value19: Dynamic = await api.v3WidgetTrail(
          room,
          room2,
          nodeId,
          value6,
        );
        if (value19.kind === `ok`) {
          value5(
            (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => [
              ...input2,
              ...value19.groups,
            ],
          );
          value7(value19.nextBefore);
        }
      } catch {}
      value11(false);
    }
  };
  let value15: Dynamic = value12?.sources ?? [];
  let value16: Dynamic = value12?.published?.at || undefined;
  let value17: Dynamic = value12?.published?.editsSince ?? 0;
  let items: Dynamic = [];
  for (let value19 of value4 as Dynamic) {
    let value20: Dynamic = widgetProvenanceAuthors(value19);
    if (
      !items.some(
        (input2?: Dynamic, ..._extraArguments: unknown[]) =>
          (input2.person ?? input2.label) === (value20.person ?? value20.label),
      )
    ) {
      items.push(value20);
    }
  }
  let value18: Dynamic =
    value16 === undefined
      ? input.hasBundle === true
        ? `Published`
        : input.hasBundle === false
          ? `Not published yet`
          : undefined
      : `Published ${value2(value16)}`;
  return (
    <div className={`mb-3 max-w-xl`} data-testid={`widget-trail-section`}>
      <div
        className={`text-muted text-caption font-semibold tracking-wide uppercase`}
      >{`Data origins`}</div>
      {value18 !== undefined && (
        <div
          className={`text-footnote mt-1 font-medium`}
          data-testid={`widget-trail-published`}
        >
          {value18}
        </div>
      )}
      {value12 !== undefined && (
        <div
          className={`text-secondary text-footnote mt-0.5`}
          data-testid={`widget-trail-summary`}
        >
          {value12.sourcesUnavailable ? (
            <jsxRuntime.Fragment>{`Data sources unavailable — try again.`}</jsxRuntime.Fragment>
          ) : value15.length > 0 ? (
            <jsxRuntime.Fragment>
              {`Live numbers from`}
              {` `}
              {value15.map(
                (
                  entry?: Dynamic,
                  options?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => (
                  <span
                    {...originalJsxsProps(
                      {
                        children: [
                          options > 0 && `, `,
                          <span className={`text-code break-all`}>
                            {entry.ref}
                          </span>,
                          entry.kind === `inline` && (
                            <span>{` (inline sample rows)`}</span>
                          ),
                        ],
                      },
                      entry.ref,
                    )}
                  />
                ),
              )}
              {value15.every(
                (entry?: Dynamic, ..._extraArguments: unknown[]) =>
                  entry.kind !== `inline`,
              ) ? (
                <jsxRuntime.Fragment>{` — nothing here is hand-typed.`}</jsxRuntime.Fragment>
              ) : (
                <jsxRuntime.Fragment>
                  {` `}
                  {`— inline entries are sample rows typed in the code; point them at a real table to go live.`}
                </jsxRuntime.Fragment>
              )}
            </jsxRuntime.Fragment>
          ) : (
            <jsxRuntime.Fragment>{`No data sources declared — values live in the code.`}</jsxRuntime.Fragment>
          )}
          {value17 > 0 && (
            <jsxRuntime.Fragment>
              {` `}
              {`Hand-tuned `}
              {value17}
              {` time`}
              {value17 === 1 ? `` : `s`}
              {` since — exact figures may reflect judgment, not just data.`}
            </jsxRuntime.Fragment>
          )}
        </div>
      )}
      <div
        className={`text-muted text-caption mt-2 font-semibold`}
      >{`Activity`}</div>
      {value8 === `loading` && (
        <div className={`text-muted text-footnote mt-1`}>{`Loading…`}</div>
      )}
      {value8 === `unavailable` && (
        <div
          className={`text-muted text-footnote mt-1`}
        >{`History isn't available.`}</div>
      )}
      {value8 === `ready` && (
        <div className={`mt-0.5`}>
          {value4.map(
            (
              input2?: Dynamic,
              options?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => (
              <WidgetTrailGroup
                {...originalJsxProps(
                  {
                    g: input2,
                    rel: value2,
                    abs: value3,
                    continues:
                      options === value4.length - 1 && value6 !== undefined,
                  },
                  input2.rev,
                )}
              />
            ),
          )}
          {value4.length === 0 && (
            <div
              className={`text-muted text-footnote`}
            >{`No edits recorded.`}</div>
          )}
          {value6 !== undefined && (
            <Button
              size={value(`sm`)}
              variant={`ghost`}
              onClick={(..._extraArguments: unknown[]): undefined =>
                void value14()
              }
              disabled={value10}
              data-testid={`widget-trail-more`}
              className={`mt-0.5`}
            >
              {value10 ? `Loading…` : `Show more`}
            </Button>
          )}
          {value12?.lastBuild && (
            <div className={`mt-1.5`} data-testid={`widget-trail-build`}>
              <div className={`text-muted text-caption`}>
                {`Last build · `}
                {resolvePlatformSyncAndRoutingScheduled3(
                  value12.lastBuild.provenance,
                )}
                {` ·`}
                {` `}
                {value2(value12.lastBuild.at)}
              </div>
              {resolveEditorAnchorsAndMentionsRoutines(
                `run/${value12.lastBuild.runId}`,
              ) === null ? (
                <span className={`text-muted text-caption font-mono`}>
                  {`run/`}
                  {value12.lastBuild.runId}
                </span>
              ) : (
                <DrillReferenceChip
                  container={input.container}
                  refStr={`run:${value12.lastBuild.runId}`}
                  label={`run/${value12.lastBuild.runId}`}
                />
              )}
            </div>
          )}
        </div>
      )}
      {items.length > 0 && (
        <jsxRuntime.Fragment>
          <div
            className={`text-muted text-caption mt-2 font-semibold`}
          >{`People`}</div>
          <div
            className={`text-footnote mt-0.5 flex flex-wrap gap-1.5`}
            data-testid={`widget-trail-people`}
          >
            {items.map(
              (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                input2.person === undefined ? (
                  <span
                    {...originalJsxProps(
                      {
                        className: `text-secondary`,
                        children: input2.label,
                      },
                      input2.person ?? input2.label,
                    )}
                  />
                ) : (
                  <UserReferenceChip
                    {...originalJsxProps(
                      {
                        who: input2.person,
                      },
                      input2.person ?? input2.label,
                    )}
                  />
                ),
            )}
          </div>
        </jsxRuntime.Fragment>
      )}
    </div>
  );
}
function WidgetTrailGroup(
  { g: input, rel: input2, abs: input3, continues: input4 }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = widgetProvenanceAuthors(input);
  return (
    <jsxRuntime.Fragment>
      {input.events.map(
        (input5?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
          <details
            {...originalJsxsProps(
              {
                className: `group py-0.5`,
                "data-testid": `widget-trail-event`,
                children: [
                  <summary
                    className={`flex cursor-pointer list-none items-baseline gap-1.5 select-none`}
                  >
                    <span className={`text-footnote min-w-0 flex-1 truncate`}>
                      {trailActionLabels[input5.action] ?? input5.action}
                      {` by`}
                      {` `}
                      {value.person === undefined ? (
                        value.label
                      ) : (
                        <UserReferenceChip who={value.person} />
                      )}
                    </span>
                    <span className={`text-secondary text-caption shrink-0`}>
                      {input2(input5.at)}
                    </span>
                    <UiOverlaysAndIconsCustomIcon
                      name={`CaretRight`}
                      customSize={10}
                      className={`text-muted shrink-0 self-center transition-transform group-open:rotate-90`}
                    />
                  </summary>,
                  <div
                    className={`text-caption border-strong mt-0.5 mb-1 ml-1 border-l pl-2`}
                  >
                    <div className={`text-secondary`}>
                      {input3(input5.at)}
                      {` · `}
                      {value.person ?? value.label}
                    </div>
                    <div className={`text-muted font-mono`}>
                      {trailEventLabel(input5)}
                    </div>
                  </div>,
                ],
              },
              input5.rev,
            )}
          />
        ),
      )}
      {input.open === true && input4 && (
        <div
          className={`text-muted text-caption py-0.5`}
          data-testid={`widget-trail-continues`}
        >{`…this run of edits continues below`}</div>
      )}
    </jsxRuntime.Fragment>
  );
}
function WidgetDependenciesTab(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [value, value2]: Dynamic = (0, React.useState)(`loading`);
  let [value3, value4]: Dynamic = (0, React.useState)(false);
  let [value5, value6]: Dynamic = (0, React.useState)(null);
  let room: Dynamic = input.room;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let value10: Dynamic = false;
      value6(null);
      value4(false);
      (room
        ? loadPlatformLiveDocumentAndHistoryContainer(
            room.pid,
            room.fileId,
            input.nodeId,
          )
        : resolvePlatformLiveDocumentAndHistoryWidgetBundle(
            input.container,
            input.fsEntryId,
            input.nodeId,
          )
      )
        .then(
          (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            !value10 && value2(input2),
        )
        .catch((input2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (!value10) {
            value2(null);
            value4(true);
            if (
              room &&
              input2 instanceof (Error as Dynamic) &&
              input2.message &&
              !input2.logged
            ) {
              value6(input2.message);
            }
          }
        });
      return (..._extraArguments: unknown[]): undefined => {
        value10 = true;
      };
    },
    [input.container, input.fsEntryId, input.nodeId, room],
  );
  let value7: Dynamic = resolveEditorSelectionAndTablesPref(
    usePlatformFeatureFlagsUseSyncExternalStore(`widgetProvenance`),
  );
  let value8: Dynamic =
    room && value7 ? (
      <WidgetEditHistory
        room={room}
        nodeId={input.nodeId}
        container={input.container}
        hasBundle={value === `loading` || value3 ? undefined : value !== null}
      />
    ) : null;
  if (value === `loading`)
    return (
      <div className={`min-h-0 min-w-0 flex-1 overflow-auto px-3 py-2`}>
        {value8}
        <div className={`text-muted text-footnote`}>{`Loading…`}</div>
      </div>
    );
  if (!value)
    return (
      <div className={`min-h-0 min-w-0 flex-1 overflow-auto px-3 py-2`}>
        {value8}
        <div className={`text-muted text-footnote`}>
          {value5 ??
            `Never published — dependencies appear once this block publishes (the manifest is derived at publish).`}
        </div>
      </div>
    );
  let value9: Dynamic = resolveEditorAnchorsAndMentionsValue7(value.effects);
  let writes: Dynamic = resolveEditorAnchorsAndMentionsReads(
    value.effects,
  ).writes;
  let mapped: Dynamic = resolveEditorAnchorsAndMentionsMetadata(
    value.effects,
  ).map(
    (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
      id: input2.id,
      title:
        typeof input2.metadata.title == `string` ? input2.metadata.title : null,
      version:
        typeof input2.metadata.version == `number`
          ? input2.metadata.version
          : null,
    }),
  );
  let mapped2: Dynamic = value.deps.sources.map(
    (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
      s: input2,
      drill: resolveEditorAnchorsAndMentionsRoutines(input2),
      pinned: resolveEditorAnchorsAndMentionsSplit(input2),
    }),
  );
  return (
    <div className={`min-h-0 min-w-0 flex-1 overflow-auto px-3 py-2`}>
      {value8}
      <div
        className={`text-muted text-caption font-semibold tracking-wide uppercase`}
      >{`Live provenance — what feeds the current render`}</div>
      <div className={`mt-1 mb-3`}>
        {mapped2.length === 0 && (
          <div
            className={`text-muted text-footnote`}
          >{`No data sources declared — nothing feeds this render.`}</div>
        )}
        {mapped2.map(
          (
            { s: input2, drill: input3, pinned: input4 }: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            input3 && input4 ? (
              <div
                {...originalJsxsProps(
                  {
                    className: `flex items-center gap-1.5`,
                    "data-testid": `pinned-source`,
                    children: [
                      <div className={`min-w-0 flex-1`}>
                        <DrillReferenceChip
                          container={input.container}
                          refStr={input3}
                          label={input2}
                        />
                      </div>,
                      <span
                        className={`text-secondary bg-surface-2 border-strong text-caption shrink-0 rounded-full border px-1.5`}
                      >{`pinned`}</span>,
                    ],
                  },
                  input2,
                )}
              />
            ) : input3 ? (
              <DrillReferenceChip
                {...originalJsxProps(
                  {
                    container: input.container,
                    refStr: input3,
                    label: input2,
                  },
                  input2,
                )}
              />
            ) : (
              <div
                {...originalJsxsProps(
                  {
                    "data-testid": `drill-frame`,
                    "data-ref": input2,
                    className: `text-muted text-caption flex items-baseline gap-1.5 px-1 py-0.5 font-mono`,
                    children: [
                      <span className={`w-3 shrink-0`}>{`·`}</span>,
                      <span className={`truncate`}>{input2}</span>,
                      <span
                        className={`shrink-0`}
                      >{`no lineage view for this ref kind yet`}</span>,
                    ],
                  },
                  input2,
                )}
              />
            ),
        )}
      </div>
      {mapped.length > 0 && (
        <div className={`mb-3`} data-testid={`deps-charts`}>
          <div
            className={`text-muted text-caption font-semibold tracking-wide uppercase`}
          >{`Charts — declared by this block`}</div>
          <div className={`mt-1`}>
            {mapped.map(
              (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
                <div
                  {...originalJsxsProps(
                    {
                      "data-testid": `chart-census-row`,
                      "data-chart-id": input2.id,
                      className: `text-caption flex items-baseline gap-1.5 px-1 py-0.5 font-mono`,
                      children: [
                        <span
                          className={`text-muted w-3 shrink-0`}
                        >{`▤`}</span>,
                        <span className={`truncate`}>{input2.id}</span>,
                        input2.title && (
                          <span className={`text-muted truncate`}>
                            {`“`}
                            {input2.title}
                            {`”`}
                          </span>
                        ),
                        input2.version !== null && (
                          <span className={`text-muted shrink-0`}>
                            {`v`}
                            {input2.version}
                          </span>
                        ),
                      ],
                    },
                    input2.id,
                  )}
                />
              ),
            )}
          </div>
        </div>
      )}
      <details data-testid={`deps-manifest`}>
        <summary
          className={`text-muted hover:text-primary text-caption cursor-pointer font-semibold tracking-wide uppercase select-none`}
        >{`Published manifest`}</summary>
        <dl
          className={`text-caption mt-1 grid grid-cols-[90px_1fr] gap-x-3 gap-y-1 font-mono`}
        >
          <dt className={`text-muted`}>{`reads`}</dt>
          <dd>
            {value.deps.sources
              .map(
                (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  resolveEditorAnchorsAndMentionsSplit(input2)
                    ? `${input2} (pinned)`
                    : input2,
              )
              .join(` · `) || `—`}
          </dd>
          <dt className={`text-muted`}>{`writes`}</dt>
          <dd>{writes.join(` · `) || `—`}</dd>
          <dt className={`text-muted`}>{`can run`}</dt>
          <dd>
            {value9.length
              ? value9
                  .map(
                    (
                      input2?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic =>
                      input2.label
                        ? `${input2.routine} (“${input2.label}”)`
                        : input2.routine,
                  )
                  .join(` · `)
              : `—`}
          </dd>
          <dt className={`text-muted`}>{`libraries`}</dt>
          <dd>{value.deps.libs.join(` · `) || `—`}</dd>
          <dt className={`text-muted`}>{`embeds`}</dt>
          <dd>
            {value.deps.embeds?.length
              ? value.deps.embeds
                  .map(
                    (input2?: Dynamic, ..._extraArguments: unknown[]) =>
                      `${input2.ref}${input2.writable ? ` (writable — pending)` : ``}`,
                  )
                  .join(` · `)
              : `—`}
          </dd>
        </dl>
      </details>
    </div>
  );
}
export { CodeTab, RoomLogTab, WidgetPanel, consoleReads };
