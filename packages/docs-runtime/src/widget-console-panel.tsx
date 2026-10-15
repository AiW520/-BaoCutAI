/** widget-console-panel: restored from WidgetConsolePanel-C_yYMqA_.js. */
import { originalJsxProps } from "./jsx-runtime";
import type { Dynamic } from "./types";
import { r as toModuleNamespace } from "./rolldown-runtime";
import {
  HM as loadReact,
  Ja as resolveCommentsActionsAndSelectionValue5,
  Mn as loadPlatformLiveDocumentAndHistoryContainer,
  UE as loadJsxRuntime,
  go as useDataOperationControlRawStart,
  hC as Button,
  ho as PaneResizeHandle,
  iE as UiOverlaysAndIconsCustomIcon,
  kS as UiDialogsRoot,
  pl as resolvePlatformSyncAndRoutingCompact,
  qa as resolveCommentsActionsAndSelectionValue4,
  xC as Tooltip,
} from "./platform-core";
import { E as Badge } from "./cds";
import {
  A as extractNamedReadSources,
  M as mergePreviewSources,
  j as previewSourcesEmptyMessage,
  k as extractVisualizeSources,
} from "./platform-lazy";
import { CodeTab, RoomLogTab, consoleReads } from "./widget-panel";
var React: Dynamic = toModuleNamespace(loadReact(), 1);
var jsxRuntime: Dynamic = loadJsxRuntime();
function normalizeConsoleTab(
  consoleTab?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return consoleTab === `comments`
    ? `comments`
    : consoleTab === `sources` ||
        consoleTab === `origins` ||
        consoleTab === `overview` ||
        consoleTab === `dependencies`
      ? `sources`
      : consoleTab === `code`
        ? `code`
        : consoleTab === `provenance`
          ? `provenance`
          : consoleTab === `log` ||
              consoleTab === `chat` ||
              consoleTab === `debug`
            ? `log`
            : consoleTab === `inspector`
              ? `inspector`
              : null;
}
function modalUrlForRef(modalUrl?: Dynamic, ..._extraArguments: unknown[]) {
  let modalUrlPartItem: Dynamic = modalUrl.split(`/`, 1)[0];
  return modalUrlPartItem === `database` || modalUrlPartItem === `routine`
    ? `?modal=data-sources&modal-ref=${encodeURIComponent(modalUrl)}`
    : null;
}
function sourceIcon(source?: Dynamic, ..._extraArguments: unknown[]) {
  if (source.kind === `data`) return `CodeBrackets`;
  if (source.kind === `node`) return `File`;
  if (source.pinnedRun) return `Pin`;
  let referenceKind: Dynamic = source.parsed?.kind;
  return referenceKind === `table` || referenceKind === `database`
    ? `Database`
    : referenceKind === `routine`
      ? `Lightning`
      : referenceKind === `run`
        ? `Pin`
        : referenceKind === `file`
          ? `File`
          : referenceKind === `blob`
            ? `CodeBrackets`
            : `Database`;
}
function buildDbDirectory(
  rows?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let nameCounts: Dynamic = new (Map as Dynamic)();
  for (let buildDbDirectoryResult of rows as Dynamic)
    nameCounts.set(
      buildDbDirectoryResult.name,
      (nameCounts.get(buildDbDirectoryResult.name) ?? 0) + 1,
    );
  let directory: Dynamic = new (Map as Dynamic)();
  for (let buildDbDirectoryResult of rows as Dynamic)
    directory.set(buildDbDirectoryResult.id, {
      name: buildDbDirectoryResult.name,
      dup: (nameCounts.get(buildDbDirectoryResult.name) ?? 0) > 1,
    });
  return directory;
}
var shortSourceId: Dynamic = (
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => (items.length > 10 ? items.slice(0, 8) : items);
var OPEN_DOCUMENT_SOURCES_COPY: Dynamic = `Open the document to view its data sources.`;
var SOURCE_UNAVAILABLE_COPY: Dynamic = `This database may have been deleted or isn't available.`;
var looksLikeUuid: Dynamic = (
  looksLikeUuid2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => /^[0-9a-f]{8}-[0-9a-f]{4}/i.test(looksLikeUuid2);
function sourceChipView(
  source?: Dynamic,
  dbDirectory?: Dynamic,
  routineDirectory?: Dynamic,
  solo?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let referenceKind: Dynamic = source.parsed?.kind;
  let referenceId: Dynamic = source.parsed?.id;
  if (referenceKind === `database` && referenceId !== undefined) {
    let label: Dynamic =
      source.label ?? (source.name === referenceId ? `Database` : source.name);
    if (dbDirectory.state === `ready`) {
      let byIdEntry: Dynamic = dbDirectory.byId.get(referenceId);
      return byIdEntry === undefined
        ? {
            label: label,
            nav: {
              via: `none`,
            },
            disabledReason: SOURCE_UNAVAILABLE_COPY,
          }
        : {
            label: byIdEntry.dup
              ? `${byIdEntry.name} · ${shortSourceId(referenceId)}`
              : byIdEntry.name,
            nav: {
              via: `dataSource`,
              target: {
                kind: `database`,
                ref: referenceId,
              },
            },
            disabledReason: routineDirectory
              ? null
              : OPEN_DOCUMENT_SOURCES_COPY,
          };
    }
    return {
      label: label,
      nav: {
        via: `dataSource`,
        target: {
          kind: `database`,
          ref: referenceId,
        },
      },
      disabledReason: routineDirectory ? null : OPEN_DOCUMENT_SOURCES_COPY,
    };
  }
  if (referenceKind === `routine` && referenceId !== undefined) {
    let record: Dynamic = {
      kind: `routine`,
      ref: referenceId,
    };
    let OPENDOCUMENTSOURCESCOPY: Dynamic = routineDirectory
      ? null
      : OPEN_DOCUMENT_SOURCES_COPY;
    let label: Dynamic = looksLikeUuid(referenceId)
      ? (source.label ??
        (source.name === referenceId ? `Routine` : source.name))
      : (source.label ?? referenceId);
    if (solo?.state === `ready`) {
      let byIdEntry: Dynamic = solo.byId.get(referenceId);
      if (byIdEntry !== undefined)
        return {
          label: byIdEntry.dup
            ? `${byIdEntry.name} · ${shortSourceId(referenceId)}`
            : byIdEntry.name,
          nav: {
            via: `dataSource`,
            target: record,
          },
          disabledReason: OPENDOCUMENTSOURCESCOPY,
        };
    }
    return {
      label: label,
      nav: {
        via: `dataSource`,
        target: record,
      },
      disabledReason: OPENDOCUMENTSOURCESCOPY,
    };
  }
  return referenceKind === `file` && source.ref !== undefined
    ? {
        label:
          source.label ?? (source.name === referenceId ? `File` : source.name),
        nav: {
          via: `ref`,
          ref: source.ref,
        },
        disabledReason: null,
      }
    : {
        label:
          source.label ??
          (source.name !== undefined && source.name !== referenceId
            ? source.name
            : referenceKind === `run`
              ? `pinned run`
              : referenceId === undefined
                ? (source.ref ?? source.name)
                : `${referenceKind ?? `source`} ${shortSourceId(referenceId)}`),
        nav: {
          via: `none`,
        },
        disabledReason: null,
      };
}
function SourceChip(
  {
    s: source,
    dbDir: dbDirectory,
    routineDir: routineDirectory,
    onOpenRef: onOpenRef,
    solo: solo,
  }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let mode: Dynamic = resolvePlatformSyncAndRoutingCompact();
  let icon: Dynamic = sourceIcon(source);
  if (source.kind === `data`) {
    let label: Dynamic = source.label ?? source.name;
    return (
      <Tooltip
        content={`inline literal ("${label}") — not a live source`}
        multiline={true}
        className={`wrap-anywhere`}
      >
        <span
          data-testid={`console-source-chip-inline`}
          className={`text-muted border-strong text-caption inline-flex max-w-full cursor-default items-center gap-1 rounded-full border border-dashed px-2 py-0.5`}
        >
          <UiOverlaysAndIconsCustomIcon
            name={icon}
            customSize={12}
            className={`shrink-0`}
          />
          <span className={`truncate`}>
            {solo ? `inline data` : `${label} · inline`}
          </span>
        </span>
      </Tooltip>
    );
  }
  let sourceChipView2: Dynamic = sourceChipView(
    source,
    dbDirectory,
    resolveCommentsActionsAndSelectionValue4(),
    routineDirectory,
  );
  let sourceChipResult: Dynamic;
  if (sourceChipView2.disabledReason === null) {
    let nav: Dynamic = sourceChipView2.nav;
    if (nav.via === `dataSource`) {
      sourceChipResult = (..._extraArguments: unknown[]): Dynamic =>
        resolveCommentsActionsAndSelectionValue5(nav.target);
    } else {
      if (nav.via === `ref` && onOpenRef !== undefined) {
        sourceChipResult = (..._extraArguments: unknown[]): Dynamic =>
          onOpenRef(nav.ref);
      }
    }
  }
  let jsxs: Dynamic = (
    <jsxRuntime.Fragment>
      <span className={`truncate`}>{sourceChipView2.label}</span>
      {source.pinnedRun && (
        <span className={`text-muted ml-1 shrink-0`}>{`· pinned`}</span>
      )}
    </jsxRuntime.Fragment>
  );
  return sourceChipResult !== undefined ||
    sourceChipView2.disabledReason !== null ? (
    <Tooltip
      content={sourceChipView2.disabledReason === null ? source.ref : undefined}
      multiline={true}
      className={`wrap-anywhere`}
    >
      <Button
        size={mode(`xs`)}
        variant={`secondary`}
        icon={icon}
        disabled={sourceChipView2.disabledReason !== null}
        disabledReason={sourceChipView2.disabledReason ?? undefined}
        data-testid={`console-source-chip`}
        onClick={sourceChipResult}
        className={`max-w-full`}
      >
        {jsxs}
      </Button>
    </Tooltip>
  ) : (
    <Tooltip content={source.ref} multiline={true} className={`wrap-anywhere`}>
      <Badge
        variant={`neutral`}
        truncate={true}
        data-testid={`console-source-chip`}
        className={`max-w-full`}
      >
        <UiOverlaysAndIconsCustomIcon
          name={icon}
          customSize={12}
          className={`text-secondary mr-1 shrink-0`}
        />
        {jsxs}
      </Badge>
    </Tooltip>
  );
}
function useNarrowConsole(
  element?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [narrow, setNarrow]: Dynamic = (0, React.useState)(false);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let parentElement: Dynamic = element?.parentElement;
      if (!parentElement || typeof ResizeObserver === "undefined") return;
      let useNarrowConsoleHandler: Dynamic = (
        ..._extraArguments: unknown[]
      ): Dynamic => setNarrow(parentElement.clientWidth < 640);
      let resizeObserver: Dynamic = new (ResizeObserver as Dynamic)(
        useNarrowConsoleHandler,
      );
      resizeObserver.observe(parentElement);
      useNarrowConsoleHandler();
      return (..._extraArguments: unknown[]): Dynamic =>
        resizeObserver.disconnect();
    },
    [element],
  );
  return narrow;
}
function useSourceDirectory(
  loadDirectory?: Dynamic,
  container?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [directory, setDirectory]: Dynamic = (0, React.useState)({
    state: `loading`,
  });
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let enabled: Dynamic = false;
      setDirectory({
        state: `loading`,
      });
      loadDirectory(container).then(
        (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          !enabled &&
          setDirectory({
            state: `ready`,
            byId: buildDbDirectory(result.rows),
          }),
        (..._extraArguments: unknown[]): Dynamic =>
          !enabled &&
          setDirectory({
            state: `failed`,
          }),
      );
      return (..._extraArguments: unknown[]): undefined => {
        enabled = true;
      };
    },
    [loadDirectory, container],
  );
  return directory;
}
function ComponentSourceRow(
  {
    c: component,
    dbDir: dbDirectory,
    routineDir: routineDirectory,
    onOpenRef: onOpenRef,
    sourcesLabel: sourcesLabel,
  }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let label: Dynamic = component.label ?? component.id ?? `component`;
  return (
    <div
      className={`flex items-baseline gap-2 px-3 py-1`}
      data-testid={`console-component-line`}
      data-component={component.id ?? undefined}
    >
      {sourcesLabel ? (
        <span
          className={`text-muted text-footnote shrink-0`}
        >{`Data sources`}</span>
      ) : (
        <Tooltip content={component.id ?? label}>
          <span
            className={`text-secondary text-footnote max-w-[10rem] shrink-0 truncate font-medium`}
          >
            {label}
          </span>
        </Tooltip>
      )}
      <div className={`flex min-w-0 flex-wrap items-center gap-1`}>
        {component.sources.length > 0 ? (
          component.sources.map(
            (source?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
              <SourceChip
                {...originalJsxProps(
                  {
                    s: source,
                    dbDir: dbDirectory,
                    routineDir: routineDirectory,
                    onOpenRef: onOpenRef,
                    solo: component.sources.length === 1,
                  },
                  `${source.name}/${source.ref ?? ``}`,
                )}
              />
            ),
          )
        ) : (
          <span className={`text-muted text-caption`}>
            {previewSourcesEmptyMessage(false)}
          </span>
        )}
      </div>
    </div>
  );
}
function CodeModal(
  {
    container: container,
    dir: directory,
    fsEntryId: fsEntryId,
    nodeId: nodeId,
    widgetName: widgetName,
    room: room,
    onClose: onClose,
  }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [error, setError]: Dynamic = (0, React.useState)(null);
  let codeRef: Dynamic = `f-${fsEntryId}#${nodeId}`;
  let title: Dynamic =
    widgetName && widgetName !== nodeId ? widgetName : `Widget code`;
  return (
    <UiDialogsRoot.Root
      open={true}
      onOpenChange={(
        codeModal?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => !codeModal && onClose()}
    >
      <UiDialogsRoot.Popup size={`lg`} className={`flex flex-col`}>
        <UiDialogsRoot.Header showClose={true}>{title}</UiDialogsRoot.Header>
        <div
          ref={setError}
          data-testid={`console-code-actions`}
          className={`flex shrink-0 flex-wrap items-center justify-end gap-1.5 border-b px-4 pb-2 empty:hidden`}
        />
        <div className={`flex min-h-0 flex-1 overflow-hidden`}>
          <CodeTab
            container={container}
            dir={directory}
            fsEntryId={fsEntryId}
            nodeId={nodeId}
            room={room}
            onClose={onClose}
            sessionRef={codeRef}
            actionsEl={error}
          />
        </div>
      </UiDialogsRoot.Popup>
    </UiDialogsRoot.Root>
  );
}
function WidgetConsolePanel(
  widgetConsolePanel?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let widgetConsolePanelResult: Dynamic =
    resolvePlatformSyncAndRoutingCompact();
  let {
    room: widgetConsolePanel2,
    onOpenRef: widgetConsolePanel3,
    widgetName: widgetConsolePanel4,
    onOpenCode: widgetConsolePanel5,
  }: Dynamic = widgetConsolePanel;
  let nodeId: Dynamic = widgetConsolePanel.nodeId;
  let widgetConsolePanelResult2: Dynamic = useDataOperationControlRawStart({
    key: `widgetConsole`,
    initial: 360,
    min: 300,
    max: 720,
    edge: `left`,
  });
  let [enabledState, setEnabledState]: Dynamic = (0, React.useState)(false);
  let elementRef: Dynamic = (0, React.useRef)(null);
  let [labelState, setLabelState]: Dynamic = (0, React.useState)(`loading`);
  let [enabledState2, setEnabledState2]: Dynamic = (0, React.useState)(false);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let enabled: Dynamic = false;
      setLabelState(`loading`);
      setEnabledState2(false);
      loadPlatformLiveDocumentAndHistoryContainer(
        widgetConsolePanel2.pid,
        widgetConsolePanel2.fileId,
        nodeId,
      )
        .then(
          (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            !enabled && setLabelState(result),
        )
        .catch((..._extraArguments: unknown[]): undefined => {
          if (!enabled) {
            setLabelState(null);
            setEnabledState2(true);
          }
        });
      return (..._extraArguments: unknown[]): undefined => {
        enabled = true;
      };
    },
    [widgetConsolePanel2, nodeId],
  );
  let memoized: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      labelState !== `loading` && labelState !== null
        ? extractVisualizeSources(labelState.effects)
        : [],
    [labelState],
  );
  let memoized2: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      mergePreviewSources(
        memoized,
        labelState !== `loading` && labelState !== null
          ? labelState.deps.sources
          : [],
        labelState !== `loading` && labelState !== null
          ? extractNamedReadSources(labelState.effects)
          : undefined,
      ),
    [memoized, labelState],
  );
  let useSourceDirectory2: Dynamic = useSourceDirectory(
    consoleReads.databases,
    widgetConsolePanel2.pid,
  );
  let useSourceDirectory3: Dynamic = useSourceDirectory(
    consoleReads.routines,
    widgetConsolePanel2.pid,
  );
  let filteredMappedMemoized: Dynamic = memoized
    .map(
      (memoized3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        memoized3.label ?? memoized3.id,
    )
    .filter(
      (items?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        items !== null && items.length > 0,
    );
  let filteredMappedMemoizedItem: Dynamic =
    filteredMappedMemoized.length === 1
      ? filteredMappedMemoized[0]
      : filteredMappedMemoized.length > 1
        ? `${filteredMappedMemoized[0]} +${filteredMappedMemoized.length - 1}`
        : `Widget`;
  let widgetConsolePanel6: Dynamic =
    widgetConsolePanel4 && widgetConsolePanel4 !== nodeId
      ? widgetConsolePanel4
      : filteredMappedMemoizedItem;
  let [widgetConsolePanelState, setWidgetConsolePanelState]: Dynamic = (0,
  React.useState)(null);
  let useNarrowConsole2: Dynamic = useNarrowConsole(widgetConsolePanelState);
  return (
    <div
      ref={setWidgetConsolePanelState}
      className={`bg-surface-panel flex h-full shrink-0 flex-col border-l ${useNarrowConsole2 ? `absolute inset-y-0 right-0 z-20 shadow-xl` : `relative`}`}
      style={{
        width: widgetConsolePanelResult2.width,
        maxWidth: useNarrowConsole2
          ? `calc(100% - 48px)`
          : `calc(100% - 340px)`,
      }}
      data-testid={`widget-console-panel`}
    >
      <PaneResizeHandle
        {...originalJsxProps({
          ...widgetConsolePanelResult2.handleProps,
          side: `left`,
          bordered: true,
          label: `Resize console`,
        })}
      />
      <div className={`flex h-12 shrink-0 items-center gap-1.5 border-b px-3`}>
        <Tooltip content={`Open source code`}>
          <Button
            variant={`ghost`}
            size={widgetConsolePanelResult(`sm`)}
            data-testid={`console-open-code`}
            aria-label={`Open source code`}
            onClick={(..._extraArguments: unknown[]): Dynamic =>
              widgetConsolePanel5?.(nodeId)
            }
          >
            <UiOverlaysAndIconsCustomIcon name={`Code`} customSize={14} />
          </Button>
        </Tooltip>
        <Tooltip content={nodeId}>
          <span
            className={`text-primary text-body min-w-0 flex-1 truncate font-semibold`}
            data-testid={`console-header-title`}
          >
            {widgetConsolePanel6}
          </span>
        </Tooltip>
        <Tooltip content={`Close`}>
          <Button
            variant={`ghost`}
            size={widgetConsolePanelResult(`sm`)}
            onClick={widgetConsolePanel.onClose}
            aria-label={`Close widget panel`}
          >
            <UiOverlaysAndIconsCustomIcon name={`X`} customSize={12} />
          </Button>
        </Tooltip>
      </div>
      <div
        className={`max-h-[55%] min-h-0 shrink-0 overflow-y-auto py-1`}
        data-testid={`console-components`}
      >
        {labelState === `loading` ? (
          <div className={`text-muted text-footnote p-3`}>{`Loading…`}</div>
        ) : memoized.length > 0 ? (
          <jsxRuntime.Fragment>
            {memoized.length > 1 && (
              <div
                className={`text-muted text-caption px-3 pt-1 font-medium tracking-wide uppercase`}
              >{`Data sources`}</div>
            )}
            {memoized.map(
              (event?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
                <ComponentSourceRow
                  {...originalJsxProps(
                    {
                      c: event,
                      dbDir: useSourceDirectory2,
                      routineDir: useSourceDirectory3,
                      onOpenRef: widgetConsolePanel3,
                      sourcesLabel:
                        memoized.length === 1 &&
                        (event.label ?? event.id ?? `component`) ===
                          widgetConsolePanel6,
                    },
                    event.key,
                  )}
                />
              ),
            )}
          </jsxRuntime.Fragment>
        ) : memoized2.length > 0 ? (
          <div className={`flex items-baseline gap-2 px-3 py-1`}>
            <span
              className={`text-muted text-footnote shrink-0 italic`}
            >{`component-less widget`}</span>
            <div className={`flex min-w-0 flex-wrap items-center gap-1`}>
              {memoized2.map(
                (
                  memoized3?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => (
                  <SourceChip
                    {...originalJsxProps(
                      {
                        s: memoized3,
                        dbDir: useSourceDirectory2,
                        routineDir: useSourceDirectory3,
                        onOpenRef: widgetConsolePanel3,
                        solo: memoized2.length === 1,
                      },
                      `${memoized3.name}/${memoized3.ref ?? ``}`,
                    )}
                  />
                ),
              )}
            </div>
          </div>
        ) : (
          <div className={`text-muted text-footnote p-3`}>
            {previewSourcesEmptyMessage(enabledState2)}
          </div>
        )}
      </div>
      <div
        className={`flex min-h-0 flex-1 flex-col border-t`}
        data-testid={`console-log-dock`}
      >
        <RoomLogTab
          room={widgetConsolePanel2}
          nodeId={nodeId}
          fsEntryId={widgetConsolePanel.fsEntryId}
          codeOpen={enabledState}
          setCodeOpen={setEnabledState}
          codeDismissedRunRef={elementRef}
        />
      </div>
    </div>
  );
}
export {
  CodeModal,
  SourceChip,
  WidgetConsolePanel,
  buildDbDirectory,
  modalUrlForRef,
  normalizeConsoleTab,
  sourceChipView,
};
