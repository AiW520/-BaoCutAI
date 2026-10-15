/** BaoCut: document runtime from index-CX4IZqzA.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  EditorSelectionAndTablesByFile2,
  Menu,
  NO_PEERS,
  Popover,
  frameSampleGranted,
  frameSampler,
  isEditorExtensionsLocation,
  isEditorExtensionsValue,
  isFrameArtifact,
  isObservabilityTelemetryRemote,
  liveDoor,
  page,
  preloadModule,
  renderMenuItems,
  resolveCommentsStoreLayer,
  resolvePlatformApiAndAuthUseContext2,
  resolvePlatformChunkLoadingEnv,
  resolvePlatformFeatureFlagsValue5,
  resolvePlatformLoadingAndStatusName,
  resolvePlatformSessionAndSourcesNode,
  resolvePlatformSessionAndSourcesTest6,
} from "../dependencies";
import {
  React,
  mapPreloadDependencies,
} from "../bootstrap";
import {
  ReactionPicker,
} from "../ask-cards/document-posture-badge";
import {
  resolveCommentSessionHost2,
} from "../comment-session/clear-comment-session-thread-id";
import {
  createSelectionAskCoordinator,
} from "../document-commands/create-selection-ask-coordinator";
import {
  isDocumentSelectionPrime,
} from "../document-selection/create-heading-normalization-plugin";
import {
  DocumentContextSetTimeout,
} from "../document-context/create-widget-writing-coordinator";
import {
  DocumentRuntimeMemo,
  DocumentRuntimeMemo2,
  WidgetProvenanceTrigger,
  documentRuntimeLimit28,
  documentRuntimeLimit4,
  documentRuntimeLimit42,
  documentRuntimeLimit6,
  documentRuntimeLimit642,
  documentRuntimeLimit8,
  resolveDocumentRuntimeAskClaude,
  resolveDocumentRuntimeElapsedSec,
  resolveDocumentRuntimeElapsedSec2,
} from "./use-document-iframe-focus";

function WidgetProvenanceGutter(
  {
    fetchFor: fetchFor,
    railKey: railKey,
    onOpenDependencies: onOpenDependencies,
    vouch: vouch,
    actions: actions,
    rightKeepout = 0,
    layoutMax: layoutMax,
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let widgetProvenanceGutterResult: Dynamic = EditorSelectionAndTablesByFile2(
    (
      widgetProvenanceGutter?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => widgetProvenanceGutter.byFile[railKey],
  );
  (0, React.useSyncExternalStore)(page.subscribe, page.snapshot, page.snapshot);
  (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    let select = (
      widgetProvenanceGutter?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let data: Dynamic = widgetProvenanceGutter.data;
      if (data?.kind !== `lfile-embed-reveal` || typeof data.ref != `string`)
        return;
      let refSlice: Dynamic =
        resolvePlatformSessionAndSourcesNode(data.ref) ??
        (data.ref.startsWith(`#`) ? data.ref.slice(1) : data.ref);
      if (data.clear === true) {
        page.clear(refSlice);
        return;
      }
      if (typeof data.hover == `boolean`) {
        page.hover(refSlice, data.hover, `wrapper`);
      }
      if (typeof data.select == `boolean`) {
        page.select(refSlice, data.select);
      }
    };
    window.addEventListener(`message`, select);
    return (..._extraArguments: unknown[]) =>
      window.removeEventListener(`message`, select);
  }, []);
  let [widgetProvenanceGutterState, setWidgetProvenanceGutterState]: Dynamic =
    (0, React.useState)(null);
  let [amountState, setAmountState]: Dynamic = (0, React.useState)(1 / 0);
  let [amountState2, setAmountState2]: Dynamic = (0, React.useState)(1 / 0);
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!widgetProvenanceGutterState) return;
      let enabled = false;
      let setAmountState3 = (..._extraArguments: unknown[]): undefined => {
        let clientHeight: Dynamic = widgetProvenanceGutterState.clientHeight;
        if (!(clientHeight <= 0 && !enabled)) {
          enabled = true;
          setAmountState(clientHeight);
          setAmountState2(widgetProvenanceGutterState.clientWidth);
        }
      };
      let resizeObserver = new ResizeObserver(setAmountState3);
      resizeObserver.observe(widgetProvenanceGutterState);
      setAmountState3();
      return (..._extraArguments: unknown[]) => resizeObserver.disconnect();
    },
    [widgetProvenanceGutterState],
  );
  if (!widgetProvenanceGutterResult) return null;
  let widgetProvenanceGutterResultEntries: Dynamic = Object.entries(
    widgetProvenanceGutterResult,
  );
  let filteredWidgetProvenanceGutterResultEntries: Dynamic =
    widgetProvenanceGutterResultEntries.filter(
      (
        [widgetProvenanceGutterResultEntry]: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        !resolvePlatformSessionAndSourcesTest6(
          widgetProvenanceGutterResultEntry,
        ),
    );
  if (
    vouch !== undefined &&
    filteredWidgetProvenanceGutterResultEntries.length > 0
  ) {
    let uniqueItems: Dynamic = new (Set as Dynamic)(
      vouch(
        filteredWidgetProvenanceGutterResultEntries.map(
          (
            [filteredWidgetProvenanceGutterResultEntry]: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => filteredWidgetProvenanceGutterResultEntry,
        ),
      ),
    );
    filteredWidgetProvenanceGutterResultEntries =
      filteredWidgetProvenanceGutterResultEntries.filter(
        (
          [filteredWidgetProvenanceGutterResultEntry]: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          uniqueItems.has(filteredWidgetProvenanceGutterResultEntry),
      );
  }
  let filteredWidgetProvenanceGutterResultEntries2: Dynamic =
    actions === undefined
      ? filteredWidgetProvenanceGutterResultEntries
      : [
          ...filteredWidgetProvenanceGutterResultEntries,
          ...widgetProvenanceGutterResultEntries
            .filter(
              (
                [widgetProvenanceGutterResultEntry]: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic =>
                resolvePlatformSessionAndSourcesTest6(
                  widgetProvenanceGutterResultEntry,
                ),
            )
            .slice(0, documentRuntimeLimit642),
        ];
  return filteredWidgetProvenanceGutterResultEntries2.length === 0 ||
    (fetchFor === undefined && actions === undefined) ? null : (
    <div
      ref={setWidgetProvenanceGutterState}
      className={`pointer-events-none absolute inset-0 z-10 overflow-hidden`}
      data-testid={`widget-provenance-gutter`}
    >
      {filteredWidgetProvenanceGutterResultEntries2.map(
        ([dataWidgetChrome, item]: Dynamic, ..._extraArguments: unknown[]) => {
          let { top: item2, left: item3, width: item4 }: Dynamic = item;
          let matchesItem = item2 >= 0 && item2 < amountState;
          let total: Dynamic = item3 < 0 || item4 < 0 ? -1 : item3 + item4;
          let difference =
            (layoutMax === undefined
              ? amountState2
              : Math.min(amountState2, (amountState2 + layoutMax) / 2)) -
            2 -
            Math.max(0, rightKeepout);
          let matchesTotal =
            total >= 0 &&
            total + documentRuntimeLimit8 + documentRuntimeLimit28 <=
              difference;
          let documentRuntimeLimit43: Dynamic =
            item3 < 0 || item4 < 0
              ? documentRuntimeLimit4
              : matchesTotal
                ? total
                : Math.max(
                    0,
                    Math.min(
                      item3 +
                        item4 -
                        documentRuntimeLimit28 -
                        documentRuntimeLimit6,
                      difference - documentRuntimeLimit28,
                    ),
                  );
          let widgetProvenanceGutterResult2: Dynamic =
            resolvePlatformSessionAndSourcesTest6(dataWidgetChrome);
          let revealed: Dynamic = page.revealed(dataWidgetChrome);
          let onEdit: Dynamic = actions?.onEdit;
          let difference2 =
            item3 < 0 || item4 < 0
              ? undefined
              : matchesTotal
                ? total - documentRuntimeLimit6
                : documentRuntimeLimit43 - documentRuntimeLimit42;
          return (
            <React.Fragment key={dataWidgetChrome}>{onEdit !== undefined && <div className={`pointer-events-auto absolute transition-opacity duration-100`} data-testid={`widget-hover-toolbar-seat`} data-widget-chrome={dataWidgetChrome} style={{
    top: Math.max(0, item2 + documentRuntimeLimit6),
    ...(difference2 === undefined ? {
      left: 36
    } : {
      left: Math.max(0, difference2),
      transform: `translateX(-100%)`
    }),
    visibility: matchesItem ? `visible` : `hidden`,
    opacity: +!!revealed,
    pointerEvents: matchesItem && revealed ? `auto` : `none`
  }} onPointerEnter={(..._extraArguments: unknown[]): Dynamic => page.hover(dataWidgetChrome, true, `toolbar`)} onPointerLeave={(..._extraArguments: unknown[]): Dynamic => page.hover(dataWidgetChrome, false, `toolbar`)} onFocus={(..._extraArguments: unknown[]): Dynamic => page.focus(dataWidgetChrome, true)} onBlur={(widgetProvenanceGutter?: Dynamic, ..._extraArguments: unknown[]) => resolveDocumentRuntimeRelatedTarget(widgetProvenanceGutter, dataWidgetChrome)}>
                        <UseDocumentRuntimeNodeIdComponent nodeId={dataWidgetChrome} />
                        <DocumentRuntimeMemo nodeId={dataWidgetChrome} onEdit={onEdit} onEscape={actions?.onEscape} />
                      </div>}{<div className={`pointer-events-auto absolute flex flex-col items-center gap-1`} data-widget-chrome={dataWidgetChrome} style={{
    top: Math.max(0, item2 + documentRuntimeLimit6),
    left: Math.max(0, documentRuntimeLimit43),
    paddingLeft: matchesTotal ? documentRuntimeLimit8 : undefined,
    visibility: matchesItem && revealed ? `visible` : `hidden`
  }} onPointerEnter={(..._extraArguments: unknown[]): Dynamic => page.hover(dataWidgetChrome, true, `dock`)} onPointerLeave={(..._extraArguments: unknown[]): Dynamic => page.hover(dataWidgetChrome, false, `dock`)} onFocus={(..._extraArguments: unknown[]): Dynamic => page.focus(dataWidgetChrome, true)} onBlur={(widgetProvenanceGutter?: Dynamic, ..._extraArguments: unknown[]) => resolveDocumentRuntimeRelatedTarget(widgetProvenanceGutter, dataWidgetChrome)}>
                      <UseDocumentRuntimeNodeIdComponent nodeId={dataWidgetChrome} />
                      {fetchFor !== undefined && !widgetProvenanceGutterResult2 && <WidgetProvenanceTrigger
                        nodeId={dataWidgetChrome}
                        fetchFor={fetchFor}
                        trigger={`gutter`}
                        onOpenDependencies={onOpenDependencies}
                        anchorHidden={!matchesItem}
                      />}
                      {actions !== undefined && <DocumentRuntimeMemo2
                        nodeId={dataWidgetChrome}
                        loadHandlers={actions.loadHandlers}
                        onRun={actions.onRun}
                        onOpenPanel={actions.onOpenPanel}
                        onViewData={actions.viewDataFor === dataWidgetChrome ? actions.onViewData : undefined}
                        onOpenCode={widgetProvenanceGutterResult2 ? undefined : actions.onOpenCode}
                        onAskClaude={widgetProvenanceGutterResult2 ? undefined : actions.onAskClaude}
                        onComment={widgetProvenanceGutterResult2 ? undefined : actions.onComment}
                        onReact={widgetProvenanceGutterResult2 ? undefined : actions.onReact}
                        onDelete={widgetProvenanceGutterResult2 ? undefined : actions.onDelete}
                        noun={item.noun}
                        onEscape={actions.onEscape}
                        chordTarget={actions.chord === true && onEdit === undefined}
                        anchorHidden={!matchesItem}
                      />}
                    </div>}</React.Fragment>
          );
        },
      )}
    </div>
  );
}

function UseDocumentRuntimeNodeIdComponent(
  { nodeId: nodeId }: Dynamic,
  ..._extraArguments: unknown[]
) {
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): undefined => {
        let activeElement =
          typeof document === "undefined" ? null : document.activeElement;
        if (activeElement) {
          for (let element of document.querySelectorAll(
            `[data-widget-chrome]`,
          ) as Dynamic)
            if (
              element.getAttribute(`data-widget-chrome`) === nodeId &&
              element.contains(activeElement)
            )
              return;
        }
        page.focus(nodeId, false);
      },
    [nodeId],
  );
  return null;
}

function resolveDocumentRuntimeRelatedTarget(
  event?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let relatedTarget: Dynamic = event.relatedTarget;
  if (!(relatedTarget && event.currentTarget.contains(relatedTarget))) {
    if (
      (relatedTarget && typeof relatedTarget.closest == `function`
        ? relatedTarget.closest(`[data-widget-chrome]`)
        : null
      )?.getAttribute(`data-widget-chrome`) !== options
    ) {
      page.focus(options, false);
    }
  }
}

function WidgetBuildQueued(
  { build: build, scheduler = DocumentContextSetTimeout }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let widgetBuildQueuedResult: Dynamic = resolvePlatformApiAndAuthUseContext2();
  let [, setCountState]: Dynamic = (0, React.useState)(0);
  let matchesLocale =
    widgetBuildQueuedResult.locale !== undefined ||
    widgetBuildQueuedResult.timeZone !== undefined;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (matchesLocale) return;
      let setInterval2: Dynamic = scheduler.setInterval(
        (..._extraArguments: unknown[]): undefined => {
          if (!document.hidden) {
            setCountState(
              (
                widgetBuildQueued?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => widgetBuildQueued + 1,
            );
          }
        },
        1e3,
      );
      return (..._extraArguments: unknown[]): Dynamic =>
        scheduler.clearInterval(setInterval2);
    },
    [matchesLocale, scheduler],
  );
  let parse = Date.parse(widgetBuildQueuedResult.now());
  let parse2 =
    (0, React.useRef)((build ?? null)?.status === `pending`).current &&
    build?.createdAt
      ? Date.parse(build.createdAt)
      : NaN;
  let parseRef: Dynamic = (0, React.useRef)(parse);
  let parse3: Dynamic = Number.isFinite(parse2) ? parse2 : parseRef.current;
  let documentRuntimeElapsedSec = resolveDocumentRuntimeElapsedSec({
    build: build,
    queuedForMs: Number.isFinite(parse) ? parse - parse3 : null,
  });
  return (
    <div
      className={`text-secondary text-footnote mt-1.5 truncate`}
      data-testid={`widget-build-queued`}
      data-stalled={documentRuntimeElapsedSec.stalled ? `1` : undefined}
      data-run-row-backed={
        documentRuntimeElapsedSec.runRowBacked ? `1` : undefined
      }
    >
      {resolveDocumentRuntimeElapsedSec2(documentRuntimeElapsedSec)}
    </div>
  );
}

function resolveDocumentRuntimeReadOnly(
  documentRuntimeReadOnly?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let frameCommentable: Dynamic =
    documentRuntimeReadOnly.frameCommentable &&
    !documentRuntimeReadOnly.frameWritable;
  return {
    readOnly:
      !documentRuntimeReadOnly.frameWritable ||
      documentRuntimeReadOnly.hostReadOnly
        ? true
        : undefined,
    commentsReadOnly:
      !documentRuntimeReadOnly.frameCommentable ||
      (documentRuntimeReadOnly.hostReadOnly && !frameCommentable),
    commentOnly: frameCommentable || undefined,
  };
}

function resolveDocumentRuntimeReadOnly2(
  documentRuntimeReadOnly2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    readOnly:
      documentRuntimeReadOnly2.readOnly ||
      !!documentRuntimeReadOnly2.doorViewOnly,
    commentsReadOnly:
      documentRuntimeReadOnly2.commentsReadOnly ||
      (!!documentRuntimeReadOnly2.doorViewOnly &&
        !documentRuntimeReadOnly2.laneCommentOnly),
  };
}

function resolveDocumentRuntimeReadOnly3(
  documentRuntimeReadOnly3?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let {
    readOnly: documentRuntimeReadOnly2,
    commentsReadOnly: documentRuntimeReadOnly22,
  }: Dynamic = resolveDocumentRuntimeReadOnly2(documentRuntimeReadOnly3);
  return {
    tier: documentRuntimeReadOnly2 && !documentRuntimeReadOnly3.room ? 1 : 2,
    readonly: documentRuntimeReadOnly2 || !documentRuntimeReadOnly3.room,
    viewOnly: documentRuntimeReadOnly2 && documentRuntimeReadOnly22,
    commentOnly:
      documentRuntimeReadOnly2 &&
      !documentRuntimeReadOnly22 &&
      !!documentRuntimeReadOnly3.laneCommentOnly,
  };
}

var resolveDocumentRuntimeTier: (documentRuntimeTier?: Dynamic, ..._extraArguments: unknown[]) => string;

function WidgetSegMenuPopup(
  widgetSegMenuPopup?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let {
    x: widgetSegMenuPopup2,
    y: widgetSegMenuPopup3,
    onComment: onComment,
    onViewData: onViewData,
    onSources: onSources,
    onSourceCode: onSourceCode,
    onReact: widgetSegMenuPopup4,
    onDelete: onDelete,
    noun: noun,
    onClose: widgetSegMenuPopup5,
  }: Dynamic = widgetSegMenuPopup;
  let [enabledState, setEnabledState]: Dynamic = (0, React.useState)(false);
  let anchor: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => ({
      getBoundingClientRect: (..._extraArguments: unknown[]): Dynamic =>
        new (DOMRect as Dynamic)(
          widgetSegMenuPopup2,
          widgetSegMenuPopup3,
          1,
          1,
        ),
    }),
    [widgetSegMenuPopup2, widgetSegMenuPopup3],
  );
  let documentRuntimeAskClaude: Dynamic = resolveDocumentRuntimeAskClaude({
    onViewData: onViewData,
    onSources: onSources,
    onSourceCode: onSourceCode,
    onComment: onComment,
    onReact:
      widgetSegMenuPopup4 &&
      ((..._extraArguments: unknown[]): Dynamic => setEnabledState(true)),
    onDelete: onDelete,
    noun: noun,
  });
  let matchesDocumentRuntimeAskClaudeCount =
    documentRuntimeAskClaude.length === 0;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (matchesDocumentRuntimeAskClaudeCount) {
        widgetSegMenuPopup5();
      }
    },
    [matchesDocumentRuntimeAskClaudeCount, widgetSegMenuPopup5],
  );
  return matchesDocumentRuntimeAskClaudeCount ? null : enabledState &&
    widgetSegMenuPopup4 ? (
    <Popover.Root
      open={true}
      onOpenChange={(
        widgetSegMenuPopup6?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (!widgetSegMenuPopup6) {
          widgetSegMenuPopup5();
        }
      }}
    >
      <ReactionPicker
        anchor={anchor}
        side={`bottom`}
        align={`start`}
        finalFocus={false}
        onPick={(
          widgetSegMenuPopup6?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          widgetSegMenuPopup5();
          widgetSegMenuPopup4(widgetSegMenuPopup6);
        }}
      />
    </Popover.Root>
  ) : (
    <Menu.Root
      open={true}
      onOpenChange={(
        widgetSegMenuPopup6?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (!widgetSegMenuPopup6) {
          widgetSegMenuPopup5();
        }
      }}
      modal={false}
    >
      <Menu.Popup
        anchor={anchor}
        side={`bottom`}
        align={`start`}
        finalFocus={false}
        data-testid={`widget-seg-menu-popup`}
      >
        {renderMenuItems(documentRuntimeAskClaude)}
      </Menu.Popup>
    </Menu.Root>
  );
}

var resolveDocumentRuntimeValue9: Dynamic;

var DocumentRuntimePid: {
    pid: null;
};

var DocumentRuntimeOffered: Dynamic;

var DocumentRuntimeDoor: Dynamic;

var DocumentRuntimeAdd: Dynamic;

var DocumentRuntimeGranted: Dynamic;

var DocumentRuntimeState2: Dynamic;

var documentRuntimeState: Dynamic;

var resolveDocumentRuntimeCatch2: Dynamic;

var DocumentRuntimeState3: Dynamic;

var documentRuntimeState2: Dynamic;

var resolveDocumentRuntimeCatch3: Dynamic;

var resolveDocumentRuntimeActiveId: Dynamic;

var resolveDocumentRuntimeFocusId: Dynamic;

var resolveDocumentRuntimeActiveId2: Dynamic;

var DocumentRuntimeState4: Dynamic;

var DocumentRuntimeState5: Dynamic;

var documentRuntimeLimit284: number;

var documentRuntimeLimit300: number;

var documentRuntimeLimit48: number;

var documentRuntimeLimit75: number;

var documentRuntimeLimit180: number;

var documentRuntimeLimit120: number;

var DocumentRuntime_Styles5: string;

var DocumentRuntime_Styles6: string;

function resolveDocumentRuntimeEntries(
  documentRuntimeEntries?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!documentRuntimeEntries || typeof documentRuntimeEntries != `object`)
    return null;
  let resolveDocumentRuntimeEntriesResult: Dynamic = null;
  for (let [
    resolveDocumentRuntimeEntriesResult2,
    resolveDocumentRuntimeEntriesResult3,
  ] of Object.entries(documentRuntimeEntries) as Dynamic) {
    let top: Dynamic = resolveDocumentRuntimeEntriesResult3?.top;
    if (typeof top == `number` && Number.isFinite(top)) {
      (resolveDocumentRuntimeEntriesResult ??= {})[
        resolveDocumentRuntimeEntriesResult2
      ] = top;
    }
  }
  return resolveDocumentRuntimeEntriesResult;
}

var DocumentRuntimeSearch: Dynamic;

var DocumentRuntimeState6: Dynamic;

var documentRuntimeLimit10000: number;

var documentRuntimeLimit2000: number;

var documentRuntimeLimit24: number;

var documentRuntimeLimit40: number;

var documentRuntimeLimit48000: number;

var documentRuntimeSet3: Dynamic;

var DocumentRuntimePrototype: boolean;

var DocumentRuntimeState7: Dynamic;

var documentRuntimeSet4: Dynamic;

function getDocumentRuntimeHoldMs(..._extraArguments: unknown[]): Dynamic {
  let number = Number(new URLSearchParams(location.search).get(`hold`));
  return Number.isFinite(number) && number > 0
    ? {
        holdMs: Math.min(number, 1e4),
      }
    : {};
}

var DocumentRuntimeFreeze: Readonly<{}>;

var DocumentRuntimeState8: Dynamic;

var documentRuntimeSet5: Dynamic;

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeDocumentRuntimeWidgetProvenanceGutterStep1(): void {
  (resolveDocumentRuntimeTier = (
    documentRuntimeTier?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `${documentRuntimeTier.tier}${documentRuntimeTier.readonly ? `r` : `w`}${documentRuntimeTier.viewOnly ? `v` : documentRuntimeTier.commentOnly ? `c` : ``}`);
  (resolveDocumentRuntimeValue9 = (
    ..._extraArguments: unknown[]
  ): Dynamic => isEditorExtensionsValue() && !isEditorExtensionsLocation());
  (DocumentRuntimePid = {
    pid: null,
  });
  (DocumentRuntimeOffered = isDocumentSelectionPrime({
    offered: (..._extraArguments: unknown[]): boolean =>
      isFrameArtifact() &&
      resolvePlatformFeatureFlagsValue5(`configMarks`) === true,
    call: (
      documentRuntime?: Dynamic,
      signal?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      DocumentRuntimePid.pid === null
        ? Promise.reject(Error(`no page`))
        : liveDoor(
            DocumentRuntimePid.pid,
            signal
              ? {
                  signal: signal,
                }
              : {},
          )
            .call(`config`, documentRuntime)
            .then(
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                result.body,
            ),
    names: [`ask_why_asked`],
    now: (..._extraArguments: unknown[]) => performance.now(),
  }));
  (DocumentRuntimeDoor = isObservabilityTelemetryRemote({
    door: DocumentRuntimeOffered,
  }));
  (DocumentRuntimeAdd = {
    ...DocumentRuntimeDoor,
    add: (
      documentRuntimeAdd?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let add: Dynamic =
        DocumentRuntimeDoor.add(documentRuntimeAdd) &&
        DocumentRuntimeOffered.keeps(documentRuntimeAdd);
      if (add) {
        resolveCommentSessionHost2(documentRuntimeAdd, `add`);
      }
      return add;
    },
  });
  (DocumentRuntimeGranted = createSelectionAskCoordinator({
    granted: (..._extraArguments: unknown[]): Dynamic => frameSampleGranted(),
    sampler: (..._extraArguments: unknown[]): Dynamic => frameSampler(),
    trace: (documentRuntimeGranted?: Dynamic, ..._extraArguments: unknown[]) =>
      resolveCommentsStoreLayer(`host`, `ask_suggest`, {
        ...documentRuntimeGranted,
      }),
  }));
  (DocumentRuntimeState2 = resolvePlatformChunkLoadingEnv(
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          import("../../embedded-widgets/display-text-paths"),
        mapPreloadDependencies([29, 0, 1, 2, 3, 10]),
        import.meta.url,
      ),
  ));
  (resolveDocumentRuntimeCatch2 = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    (documentRuntimeState ??= DocumentRuntimeState2().catch(
      (error?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        throw ((documentRuntimeState = undefined), error);
      },
    )));
  (DocumentRuntimeState3 = resolvePlatformChunkLoadingEnv(
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          import("../../host/stamped-addresses"),
        mapPreloadDependencies([30, 0, 1, 2, 3, 10]),
        import.meta.url,
      ),
  ));
  (resolveDocumentRuntimeCatch3 = (
    ..._extraArguments: unknown[]
  ): Dynamic => (
    documentRuntimeState2 === undefined &&
      ((documentRuntimeState2 = DocumentRuntimeState3()),
      documentRuntimeState2.catch(
        (error?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (!resolvePlatformLoadingAndStatusName(error)) throw error;
        },
      )),
    documentRuntimeState2
  ));
  (resolveDocumentRuntimeActiveId = (
    documentRuntimeActiveId?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    documentRuntimeActiveId.activeId ?? documentRuntimeActiveId.focusId);
  (resolveDocumentRuntimeFocusId = (
    documentRuntimeFocusId?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let documentRuntimeActiveId: Dynamic = resolveDocumentRuntimeActiveId(
      documentRuntimeFocusId,
    );
    return (
      documentRuntimeActiveId !== null &&
      documentRuntimeActiveId === documentRuntimeFocusId.focusId
    );
  });
  (resolveDocumentRuntimeActiveId2 = (
    documentRuntimeActiveId2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    documentRuntimeActiveId2.activeId === null
      ? NO_PEERS
      : documentRuntimeActiveId2.activePeers);
  (DocumentRuntimeState4 = []);
  (DocumentRuntimeState5 = []);
  (documentRuntimeLimit284 = 284);
  (documentRuntimeLimit300 = 300);
  (documentRuntimeLimit48 = 48);
  (documentRuntimeLimit75 = 75);
  (documentRuntimeLimit180 = 180);
  (documentRuntimeLimit120 = 120);
  (DocumentRuntime_Styles5 = `:not(*)`);
  (DocumentRuntime_Styles6 = `iframe[data-testid="ldoc-iframe"]`);
  (DocumentRuntimeSearch = typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get(`chrome`) === `embed`);
  (DocumentRuntimeState6 = isFrameArtifact());
  (documentRuntimeLimit10000 = 1e4);
  (documentRuntimeLimit2000 = 2e3);
  (documentRuntimeLimit24 = 24);
  (documentRuntimeLimit40 = 40);
  (documentRuntimeLimit48000 = 48e3);
  (documentRuntimeSet3 = new (Set as Dynamic)());
  (DocumentRuntimePrototype = typeof MessageEvent !== "undefined" &&
    `userActivation` in MessageEvent.prototype);
  (DocumentRuntimeState7 = DocumentRuntimeSearch || DocumentRuntimeState6);
  (documentRuntimeSet4 = new (Set as Dynamic)([
    `fn`,
    `run`,
    `table`,
    `type`,
  ]));
  (DocumentRuntimeFreeze = Object.freeze({}));
  (DocumentRuntimeState8 = []);
  (documentRuntimeSet5 = new (Set as Dynamic)());
}

export {
  DocumentRuntimeAdd,
  DocumentRuntimeFreeze,
  DocumentRuntimeGranted,
  DocumentRuntimeOffered,
  DocumentRuntimePid,
  DocumentRuntimePrototype,
  DocumentRuntimeSearch,
  DocumentRuntimeState4,
  DocumentRuntimeState5,
  DocumentRuntimeState6,
  DocumentRuntimeState7,
  DocumentRuntimeState8,
  DocumentRuntime_Styles5,
  DocumentRuntime_Styles6,
  WidgetBuildQueued,
  WidgetProvenanceGutter,
  WidgetSegMenuPopup,
  documentRuntimeLimit10000,
  documentRuntimeLimit120,
  documentRuntimeLimit180,
  documentRuntimeLimit2000,
  documentRuntimeLimit24,
  documentRuntimeLimit284,
  documentRuntimeLimit300,
  documentRuntimeLimit40,
  documentRuntimeLimit48,
  documentRuntimeLimit48000,
  documentRuntimeLimit75,
  documentRuntimeSet3,
  documentRuntimeSet4,
  documentRuntimeSet5,
  documentRuntimeState2,
  getDocumentRuntimeHoldMs,
  resolveDocumentRuntimeActiveId,
  resolveDocumentRuntimeActiveId2,
  resolveDocumentRuntimeCatch2,
  resolveDocumentRuntimeCatch3,
  resolveDocumentRuntimeEntries,
  resolveDocumentRuntimeFocusId,
  resolveDocumentRuntimeReadOnly,
  resolveDocumentRuntimeReadOnly2,
  resolveDocumentRuntimeReadOnly3,
  resolveDocumentRuntimeTier,
  resolveDocumentRuntimeValue9,
};
