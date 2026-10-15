/** BaoCut: application root from index-CX4IZqzA.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  Button,
  Link,
  Menu,
  ObservabilityBrowserAndOperationEventsHref,
  ObservabilityBrowserAndOperationEventsRoutine,
  PlatformSyncAndRoutingAssign2,
  PlatformSyncAndRoutingState4,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  TextInput,
  Tooltip,
  UiDialogsRoot,
  UiOverlaysAndIconsCustomIcon,
  api,
  apiFetcher,
  collectDataContentAndReferencesWEEKLY,
  preloadModule,
  resolveDataContentAndReferencesKind,
  resolveDataContentAndReferencesKind2,
  resolveDataContentAndReferencesKind3,
  resolveDataContentAndReferencesReplace2,
  resolveDataContentAndReferencesTest6,
  resolveDataModelSchemasValue3,
  resolveObservabilityBrowserAndOperationEventsToFixed,
  resolveObservabilityBrowserAndOperationEventsValue48,
  resolvePlatformApiAndAuthUseContext2,
  resolvePlatformApiAndAuthValue,
  resolvePlatformChunkLoadingLazy,
  resolvePlatformLiveDocumentAndHistoryReason4,
  resolvePlatformLiveDocumentAndHistoryReason5,
  resolvePlatformLiveDocumentAndHistoryWsNeverOpened,
  resolvePlatformSessionAndSourcesPush,
  resolvePlatformSessionAndSourcesReplace,
  resolvePlatformSessionAndSourcesWeekday,
  resolvePlatformSyncAndRoutingCompact,
  runFilePath,
  subscribeProjectFeed,
  toast,
  updatePlatformLiveDocumentAndHistoryOpen,
  updatePlatformLiveDocumentAndHistoryOpen2,
  useCommentStore,
} from "../dependencies";
import {
  React,
  jsxRuntime,
  mapPreloadDependencies,
} from "../bootstrap";
import {
  SupportCodeCopyButton,
} from "../connection-and-errors/connector-permission-dialog";
import {
  IconButton,
} from "../run-review";
import {
  UseDocumentPreviewStatusComponent,
} from "../document-preview/use-page-skill-seat";
import {
  resolveDocumentPreviewValue3,
} from "../document-preview/roomview-frame-toolbar";
import {
  SessionNavigationTitle,
} from "../session-navigation/create-file-placement-waiter";
import {
  SessionNavigationPanel,
  SessionNavigationState4,
  SessionNavigationThen5,
} from "../session-navigation/ldoc-comments-btn";
import {
  ApplicationRoutesStaged,
  RoutineInflightChip,
  applicationRoutesSet,
  resolveApplicationRoutesKind,
  resolveApplicationRoutesRuns,
} from "./routes-filmed-prose-page";
import {
  useApplicationRoutesAriaLabel,
} from "./routes-routines-dialog";

function UseApplicationRootTextComponent(
  { text: text }: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    <div className={`flex min-h-0 flex-1 flex-col`}>
      <div className={`flex items-start justify-end`}>
        <UiDialogsRoot.Close render={useApplicationRoutesAriaLabel()} />
      </div>
      <div
        className={`text-muted text-footnote flex flex-1 items-center justify-center`}
      >
        {text}
      </div>
    </div>
  );
}

function RoutineDetail(
  {
    pid: pid,
    version: version,
    row: row,
    slug: slug,
    nowMs: nowMs,
    knownNames: knownNames,
    onVisualize: onVisualize,
    closeModal: closeModal,
    onSelectRoutine: onSelectRoutine,
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let [labelState, setLabelState]: Dynamic = (0, React.useState)(`loading`);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (slug === undefined) {
        setLabelState(`err`);
        return;
      }
      let enabled = true;
      setLabelState(`loading`);
      api.functions.get(`projects/${slug}`, row.id ?? row.name).then(
        (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          enabled && setLabelState(result),
        (..._extraArguments: unknown[]): Dynamic =>
          enabled && setLabelState(`err`),
      );
      return (..._extraArguments: unknown[]): undefined => {
        enabled = false;
      };
    },
    [slug, row.id, row.name],
  );
  let [labelState2, setLabelState2]: Dynamic = (0, React.useState)(
    `instructions`,
  );
  let run: Dynamic = resolveApplicationRoutesRuns(row);
  let endedAt: Dynamic =
    row.lastRun?.timing.endedAt || row.lastRun?.timing.startedAt || ``;
  let href =
    slug === undefined
      ? undefined
      : row.id === undefined
        ? resolvePlatformSessionAndSourcesPush(slug, undefined, {
            path: ObservabilityBrowserAndOperationEventsRoutine + row.name,
          })
        : resolveDataContentAndReferencesKind({
            container: {
              kind: `project`,
              id: pid,
              ...(version
                ? {
                    version: version,
                  }
                : {}),
            },
            ref: {
              noun: `routine`,
              id: row.id,
            },
          });
  let filteredRefs: Dynamic =
    labelState !== `loading` && labelState !== `err`
      ? (labelState.refs ?? []).filter(
          (ref?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            knownNames.has(ref),
        )
      : [];
  return (
    <div
      className={`flex min-h-0 flex-1 flex-col`}
      data-testid={`routine-detail`}
    >
      <div className={`flex items-center gap-1 pr-8`}>
        <div
          className={`text-primary text-heading min-w-0 flex-1 truncate font-medium`}
        >
          {resolveDataContentAndReferencesReplace2(row.label ?? row.name)}
        </div>
        {onVisualize !== undefined && (
          <Tooltip
            content={`Build a live chart of this routine's results — a widget build starts in a tab and you watch it work.`}
            side={`bottom`}
            multiline={true}
          >
            <button
              type={`button`}
              aria-label={`Chart results`}
              data-testid={`routine-chart-results`}
              onClick={(..._extraArguments: unknown[]): undefined => {
                onVisualize(
                  resolveDocumentPreviewValue3(row.id ?? row.name, row.name),
                );
                closeModal();
              }}
              className={`text-muted hover:text-primary hover:bg-alpha-1 flex size-6 shrink-0 items-center justify-center rounded`}
            >
              <UiOverlaysAndIconsCustomIcon name={`Chart`} customSize={14} />
            </button>
          </Tooltip>
        )}
        {href !== undefined && (
          <Tooltip content={`Open in editor`}>
            <ObservabilityBrowserAndOperationEventsHref
              href={href}
              data-testid={`routine-open-editor`}
              aria-label={`Open in editor`}
              onClick={closeModal}
              className={`text-muted hover:text-primary hover:bg-alpha-1 flex size-6 shrink-0 items-center justify-center rounded`}
            >
              <UiOverlaysAndIconsCustomIcon
                name={`ArrowOutSquare`}
                customSize={14}
              />
            </ObservabilityBrowserAndOperationEventsHref>
          </Tooltip>
        )}
      </div>
      {(row.summary ?? ``) !== `` && (
        <div className={`text-secondary text-footnote mt-1`}>
          {resolveDataContentAndReferencesReplace2(row.summary ?? ``)}
        </div>
      )}
      <div
        className={`mt-4 grid grid-cols-[auto_1fr] items-baseline gap-x-8 gap-y-2.5`}
      >
        <span className={`text-muted text-footnote`}>{`Last ran`}</span>
        <span
          className={`text-primary text-footnote flex flex-wrap items-center gap-1.5`}
        >
          {run === undefined ? (
            endedAt === `` ? (
              `Never`
            ) : (
              resolvePlatformSessionAndSourcesWeekday(endedAt, nowMs)
            )
          ) : (
            <RoutineInflightChip run={run} />
          )}
          {row.consentLive === false && (
            <Tooltip
              content={`Runs are staged for review until someone approves one`}
            >
              <span
                data-testid={`routine-needs-approval`}
                className={`bg-alpha-1 text-secondary text-footnote flex items-center gap-1 rounded px-1.5 py-0.5`}
              >
                <UiOverlaysAndIconsCustomIcon name={`Clock`} customSize={11} />
                {`Needs approval`}
              </span>
            </Tooltip>
          )}
          {row.paused === true && (
            <span
              className={`bg-alpha-1 text-secondary text-footnote rounded px-1.5 py-0.5`}
            >{`paused`}</span>
          )}
        </span>
        {filteredRefs.length > 0 && (
          <jsxRuntime.Fragment>
            <span className={`text-muted text-footnote`}>{`Sources`}</span>
            <span className={`flex flex-wrap items-center gap-1.5`}>
              {filteredRefs.map(
                (filteredRef?: Dynamic, ..._extraArguments: unknown[]) => (
                  <button
                    type={`button`}
                    onClick={(..._extraArguments: unknown[]): Dynamic => onSelectRoutine(filteredRef)}
                    className={`bg-alpha-1 text-secondary text-footnote hover:bg-alpha-2 flex items-center gap-1 rounded px-1.5 py-0.5`}
                    key={filteredRef}
                  >{<UiOverlaysAndIconsCustomIcon name={`Lightning`} customSize={11} />}{resolveDataContentAndReferencesReplace2(filteredRef)}</button>
                ),
              )}
            </span>
          </jsxRuntime.Fragment>
        )}
        {row.schedule !== undefined && (
          <jsxRuntime.Fragment>
            <span className={`text-muted text-footnote`}>{`Schedule`}</span>
            <span className={`flex flex-wrap items-center gap-1.5`}>
              <span
                className={`bg-alpha-1 text-secondary text-footnote flex items-center gap-1 rounded px-1.5 py-0.5`}
              >
                <UiOverlaysAndIconsCustomIcon
                  name={`Calendar`}
                  customSize={11}
                />
                {resolvePlatformSessionAndSourcesReplace(
                  collectDataContentAndReferencesWEEKLY(
                    row.schedule.recurrence.rrule,
                    row.schedule.recurrence.tz,
                  ),
                )}
              </span>
            </span>
          </jsxRuntime.Fragment>
        )}
      </div>
      <div className={`border-strong mt-5 flex items-center gap-4 border-b`}>
        {[`instructions`, `output`].map(
          (item?: Dynamic, ..._extraArguments: unknown[]) => (
            <button
              type={`button`}
              data-testid={`routine-tab-${item}`}
              onClick={(..._extraArguments: unknown[]): Dynamic => setLabelState2(item)}
              className={`text-footnote -mb-px border-b-2 pb-1.5 font-medium transition-colors ${labelState2 === item ? `border-accent text-primary` : `text-secondary hover:text-primary border-transparent`}`}
              key={item}
            >{item === `instructions` ? `Instructions` : `Output`}</button>
          ),
        )}
      </div>
      <div className={`pt-3`}>
        {labelState2 === `instructions` ? (
          labelState === `loading` ? (
            <div className={`text-muted text-footnote`}>{`loading…`}</div>
          ) : labelState === `err` ? (
            <div
              className={`text-secondary text-footnote`}
            >{`Couldn't load this routine's definition.`}</div>
          ) : labelState.config.type === `prompt` ? (
            <div className={`text-primary text-footnote whitespace-pre-wrap`}>
              {resolveDataContentAndReferencesReplace2(
                labelState.config.prompt,
              )}
            </div>
          ) : labelState.config.type === `code` ? (
            <pre className={`text-code overflow-x-auto whitespace-pre-wrap`}>
              {resolveDataContentAndReferencesReplace2(labelState.config.code)}
            </pre>
          ) : (
            <pre className={`text-code overflow-x-auto whitespace-pre-wrap`}>
              {resolveDataContentAndReferencesReplace2(
                `${labelState.config.call.tool}(${JSON.stringify(labelState.config.call.args, null, 2)})`,
              )}
            </pre>
          )
        ) : (
          <RoutineRuns runs={row.runs ?? []} />
        )}
      </div>
    </div>
  );
}

async function loadApplicationRootRows(
  applicationRootRows?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let response: Dynamic = await apiFetcher(
    `/api/v3/project/${encodeURIComponent(applicationRootRows)}/routines`,
  );
  if (!response.ok) throw Error(`routines read failed (${response.status})`);
  let rows: Dynamic = await response.json();
  return Array.isArray(rows)
    ? {
        rows: rows,
      }
    : rows;
}

function resolveApplicationRootKind(
  entry?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return entry.kind === `live` ||
    entry.kind === `recovered` ||
    entry.kind === `access-changed`
    ? true
    : entry.kind === `envelope`
      ? entry.envelope.diff.some(
          (diff?: Dynamic, ..._extraArguments: unknown[]) =>
            diff.address?.ref?.object === `routine`,
        )
      : false;
}

async function loadApplicationRootStatus(
  applicationRootStatus?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let response: Dynamic = await apiFetcher(
    `/api/v3/project/${encodeURIComponent(applicationRootStatus)}/databases`,
  );
  if (!response.ok) throw Error(`databases read failed (${response.status})`);
  return (await response.json()).rows;
}

async function loadApplicationRootStatus2(
  applicationRootStatus2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let response: Dynamic = await apiFetcher(
    `/api/v3/project/${encodeURIComponent(applicationRootStatus2)}/database/${encodeURIComponent(options)}`,
  );
  if (response.status === 404) return `missing`;
  if (!response.ok) throw Error(`database read failed (${response.status})`);
  return await response.json();
}

function resolveApplicationRootKind2(
  entry?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return entry.kind === `live` ||
    entry.kind === `recovered` ||
    entry.kind === `access-changed`
    ? true
    : entry.kind === `envelope`
      ? typeof entry.envelope.outcome == `string` &&
        entry.envelope.outcome.startsWith(`row-`)
        ? true
        : entry.envelope.diff.some(
            (diff?: Dynamic, ..._extraArguments: unknown[]) =>
              diff.address?.ref?.object === `database`,
          )
      : false;
}

var ApplicationRootRefDangling: Dynamic;

function useApplicationRootStringify(
  applicationRootStringify?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  return applicationRootStringify == null ? (
    <span className={`text-muted`}>{`—`}</span>
  ) : typeof applicationRootStringify == `number` ? (
    <span className={`tabular-nums`}>{applicationRootStringify}</span>
  ) : typeof applicationRootStringify == `boolean` ? (
    String(applicationRootStringify)
  ) : (
    resolveDataContentAndReferencesReplace2(
      typeof applicationRootStringify == `string`
        ? applicationRootStringify
        : JSON.stringify(applicationRootStringify),
    )
  );
}

function DatabaseDetail(
  { pid: pid, dbId: dbId }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [labelState, setLabelState]: Dynamic = (0, React.useState)(`loading`);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let enabled = true;
      setLabelState(`loading`);
      loadApplicationRootStatus2(pid, dbId).then(
        (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          enabled && setLabelState(result),
        (..._extraArguments: unknown[]): Dynamic =>
          enabled && setLabelState(`err`),
      );
      return (..._extraArguments: unknown[]): undefined => {
        enabled = false;
      };
    },
    [pid, dbId],
  );
  if (labelState === `loading`)
    return <UseApplicationRootTextComponent text={`loading…`} />;
  if (labelState === `missing`)
    return (
      <UseApplicationRootTextComponent
        text={`That database isn't available in this project`}
      />
    );
  if (labelState === `err`)
    return (
      <UseApplicationRootTextComponent text={`Couldn't load this database.`} />
    );
  let databaseDetailHandler: Dynamic = (
    databaseDetail?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    databaseDetail.type.kind === `literal`
      ? databaseDetail.type.type
      : databaseDetail.type.kind;
  return (
    <div
      className={`flex min-h-0 flex-1 flex-col`}
      data-testid={`database-detail`}
    >
      <div className={`flex items-center gap-1 pr-8`}>
        <div
          className={`text-primary text-heading min-w-0 flex-1 truncate font-medium`}
        >
          {resolveDataContentAndReferencesReplace2(labelState.name)}
        </div>
      </div>
      {labelState.columns.length > 0 && (
        <div className={`mt-3 flex flex-wrap items-center gap-1.5`}>
          {labelState.columns.map(
            (event?: Dynamic, ..._extraArguments: unknown[]) => (
              <span className={`bg-alpha-1 text-secondary text-footnote flex items-center gap-1 rounded px-1.5 py-0.5`} key={event.key}>{<span className={`text-primary`}>
                        {resolveDataContentAndReferencesReplace2(event.key)}
                      </span>}{<span className={`text-muted`}>
                        {databaseDetailHandler(event)}
                      </span>}{event.unique === true ? <span className={`text-muted`}>{`· unique`}</span> : event.required === true && <span className={`text-muted`}>{`· required`}</span>}</span>
            ),
          )}
        </div>
      )}
      <div className={`text-muted text-footnote mt-2`}>
        {labelState.totalRows === 0
          ? `No rows yet`
          : labelState.truncated === true
            ? `Showing ${labelState.servedRows ?? labelState.rows.length} of ${labelState.totalRows} rows`
            : `${labelState.totalRows} ${labelState.totalRows === 1 ? `row` : `rows`}`}
      </div>
      {labelState.rowsNote !== undefined && labelState.rowsNote !== `` && (
        <div className={`text-secondary text-footnote mt-1`}>
          {resolveDataContentAndReferencesReplace2(labelState.rowsNote)}
        </div>
      )}
      {labelState.marks.length > 0 && (
        <div
          className={`text-warning text-footnote mt-2 flex flex-col gap-0.5`}
          data-testid={`database-marks`}
        >
          {labelState.marks.map(
            (entry?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
              <div className={`flex items-center gap-1`} key={`${entry.source}:${entry.kind}`}>{<UiOverlaysAndIconsCustomIcon name={`Warning`} customSize={11} className={`shrink-0`} />}{<span>
                        {ApplicationRootRefDangling[entry.kind] ?? entry.kind}
                        {` — `}
                        {entry.count}
                      </span>}</div>
            ),
          )}
        </div>
      )}
      {labelState.rows.length > 0 && (
        <div className={`mt-3 min-h-0 flex-1 overflow-auto`}>
          <Table>
            <TableHead>
              <TableRow hoverable={false}>
                {labelState.columns.map(
                  (event?: Dynamic, ..._extraArguments: unknown[]) => (
                    <TableHeaderCell key={event.key}>{resolveDataContentAndReferencesReplace2(event.key)}</TableHeaderCell>
                  ),
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {labelState.rows.map(
                (row?: Dynamic, ..._extraArguments: unknown[]) => (
                  <TableRow key={`${row.pk.source}:${row.pk.index}`}>{labelState.columns.map((event?: Dynamic, ..._extraArguments: unknown[]) => <TableCell key={event.key}>{useApplicationRootStringify(row.cells[event.key])}</TableCell>)}</TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function RoutinePage(
  {
    pid: pid,
    routineId: routineId,
    version: version,
    chipNav: chipNav,
    onVisualize: onVisualize,
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let [recordState, setRecordState]: Dynamic = (0, React.useState)({
    kind: `loading`,
  });
  let [, set]: Dynamic = resolveObservabilityBrowserAndOperationEventsValue48();
  let itemsRef: Dynamic = (0, React.useRef)([]);
  let elementRef: Dynamic = (0, React.useRef)(
    (..._extraArguments: unknown[]): undefined => {},
  );
  let enabledRef: Dynamic = (0, React.useRef)(true);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => (
      (enabledRef.current = true),
      (..._extraArguments: unknown[]): undefined => {
        enabledRef.current = false;
      }
    ),
    [],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let enabled = true;
      setRecordState({
        kind: `loading`,
      });
      let loadApplicationRootRows2: Dynamic = async (
        ..._extraArguments: unknown[]
      ): Promise<Dynamic> => {
        let { slug: applicationRootRows, rows: applicationRootRows2 }: Dynamic =
          await loadApplicationRootRows(pid);
        itemsRef.current = applicationRootRows2;
        return resolveDataContentAndReferencesKind3(
          applicationRootRows2,
          routineId,
          applicationRootRows,
        );
      };
      let enabled2 = false;
      let enabled3 = false;
      let result = (..._extraArguments: unknown[]): undefined => {
        if (enabled2) {
          enabled3 = true;
          return;
        }
        enabled2 = true;
        loadApplicationRootRows2()
          .then(
            (result2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              enabled && setRecordState(result2),
            (..._extraArguments: unknown[]): Dynamic =>
              enabled &&
              setRecordState(
                (entry?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  entry.kind === `ready`
                    ? entry
                    : {
                        kind: `missing`,
                      },
              ),
          )
          .finally((..._extraArguments: unknown[]): undefined => {
            enabled2 = false;
            if (enabled3 && enabled) {
              enabled3 = false;
              result();
            }
          });
      };
      elementRef.current = result;
      result();
      let routinePageResult: Dynamic = subscribeProjectFeed(
        pid,
        (routinePage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (resolveApplicationRootKind(routinePage)) {
            result();
          }
        },
      );
      return (..._extraArguments: unknown[]): undefined => {
        enabled = false;
        routinePageResult();
      };
    },
    [pid, routineId],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => (
      resolveDataModelSchemasValue3(
        (
          { file: file, hash: hash }: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (file.startsWith(`.routine/`)) {
            let fileSlice: Dynamic = file.slice(
              ObservabilityBrowserAndOperationEventsRoutine.length,
            );
            elementRef.current();
            (async (..._extraArguments: unknown[]): Promise<undefined> => {
              let { rows: result }: Dynamic = await loadApplicationRootRows(
                pid,
              ).catch(
                (..._extraArguments: unknown[]): Dynamic => ({
                  rows: itemsRef.current,
                }),
              );
              if (!enabledRef.current) return;
              let result2: Dynamic = result.find(
                (result3?: Dynamic, ..._extraArguments: unknown[]) =>
                  result3.id === fileSlice,
              );
              let items: Dynamic = result2
                ? [result2]
                : result.filter(
                    (result3?: Dynamic, ..._extraArguments: unknown[]) =>
                      result3.name === fileSlice,
                  );
              let itemItem: Dynamic = items.length === 1 ? items[0] : undefined;
              if (itemItem?.id !== undefined && itemItem.id !== routineId) {
                set(
                  resolveDataContentAndReferencesKind({
                    container: {
                      kind: `project`,
                      id: pid,
                      ...(version
                        ? {
                            version: version,
                          }
                        : {}),
                    },
                    ref: {
                      noun: `routine`,
                      id: itemItem.id,
                    },
                  }),
                );
              }
            })();
            return;
          }
          if (chipNav) {
            chipNav({
              file: file,
              hash: hash,
            });
            return;
          }
          toast.error(`That link isn't available here yet`);
        },
      ),
      (..._extraArguments: unknown[]) => resolveDataModelSchemasValue3(null)
    ),
    [pid, routineId, set, version, chipNav],
  );
  let [selectedRef]: Dynamic = (0, React.useState)(
    (..._extraArguments: unknown[]): Dynamic => {
      let routinePageResult: Dynamic = resolveDataContentAndReferencesTest6(
        location.hash.slice(1) || undefined,
      );
      return routinePageResult?.childId ?? routinePageResult?.engineAnchor;
    },
  );
  let runs: Dynamic = useApplicationRootFinally(pid, routineId);
  return recordState.kind === `loading` ? (
    <div
      className={`text-muted flex h-full flex-col items-center justify-center`}
    >
      <UiOverlaysAndIconsCustomIcon
        name={`Spinner`}
        size={`md`}
        bold={true}
        className={`animate-spin`}
      />
    </div>
  ) : recordState.kind === `missing` ? (
    <div
      className={`text-footnote text-danger p-sm`}
      data-testid={`routine-page-missing`}
    >{`This routine doesn’t exist, or you don’t have access to it.`}</div>
  ) : (
    <div className={`flex h-full min-h-0 flex-col`}>
      <RoutineRunActivity runs={runs} />
      <div className={`min-h-0 flex-1`}>
        <React.Suspense
          fallback={
            <div
              className={`text-muted text-body p-lg`}
            >{`Loading routine…`}</div>
          }
        >
          <SessionNavigationThen5
            container={`projects/${recordState.slug}`}
            name={recordState.address}
            pid={pid}
            readOnly={version !== undefined}
            selectedRef={selectedRef}
            historySlot={<RoutineHistoryIcon runs={runs} routineId={routineId} label={recordState.displayName} onVisualize={onVisualize} />}
            key={`${pid}/${routineId}`}
          />
        </React.Suspense>
      </div>
    </div>
  );
}

function useApplicationRootFinally(
  applicationRootFinally?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [
    useApplicationRootFinallyState,
    setUseApplicationRootFinallyState,
  ]: Dynamic = (0, React.useState)();
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let enabled = true;
      setUseApplicationRootFinallyState(undefined);
      let enabled2 = false;
      let enabled3 = false;
      let result = (..._extraArguments: unknown[]): undefined => {
        if (enabled2) {
          enabled3 = true;
          return;
        }
        enabled2 = true;
        loadApplicationRootRows(applicationRootFinally)
          .then(
            (result2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              enabled &&
              setUseApplicationRootFinallyState(
                result2.rows.find(
                  (row?: Dynamic, ..._extraArguments: unknown[]) =>
                    row.id === options,
                )?.runs ?? [],
              ),
            (..._extraArguments: unknown[]): undefined => undefined,
          )
          .finally((..._extraArguments: unknown[]): undefined => {
            enabled2 = false;
            if (enabled3 && enabled) {
              enabled3 = false;
              result();
            }
          });
      };
      result();
      let useApplicationRootFinallyResult: Dynamic = subscribeProjectFeed(
        applicationRootFinally,
        (
          applicationRootFinally2?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (resolveApplicationRoutesKind(applicationRootFinally2)) {
            result();
          }
        },
      );
      return (..._extraArguments: unknown[]): undefined => {
        enabled = false;
        useApplicationRootFinallyResult();
      };
    },
    [applicationRootFinally, options],
  );
  return useApplicationRootFinallyState;
}

function RoutineRunActivity(
  { runs: runs }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let routineRunActivityResult: Dynamic =
    resolvePlatformApiAndAuthUseContext2();
  if (runs === undefined) return null;
  let parse = Date.parse(routineRunActivityResult.now());
  let routineRunActivityHandler: Dynamic = (
    routineRunActivity?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    resolvePlatformSessionAndSourcesWeekday(
      routineRunActivity,
      parse,
      routineRunActivityResult.locale,
      routineRunActivityResult.timeZone,
    );
  let filteredRuns: Dynamic = runs.filter(
    (response?: Dynamic, ..._extraArguments: unknown[]) =>
      response.status === `pending` || response.status === `running`,
  );
  return filteredRuns.length === 0 ? null : (
    <div
      data-testid={`routine-run-activity`}
      className={`border-strong shrink-0 border-b`}
    >
      <div className={`mx-auto w-full max-w-[720px] px-4 py-3`}>
        <div
          className={`flex flex-col gap-1.5`}
          data-testid={`routine-runs-inflight`}
        >
          {filteredRuns.map(
            (response?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
              <div data-testid={`routine-run-inflight-${response.status}`} key={response.id}>{<div className={`flex items-center gap-2`}>
                        <UseDocumentPreviewStatusComponent running={response.status === `running`} />
                        <span className={`text-primary text-footnote font-medium`}>
                          {ApplicationRoutesStaged[response.status] ?? response.status}
                        </span>
                        {response.startedAt !== `` && <span className={`text-secondary text-caption`}>
                            {`started `}
                            {routineRunActivityHandler(response.startedAt)}
                          </span>}
                      </div>}{response.status === `running` && response.progress !== undefined && response.progress.length > 0 && <div className={`mt-1 ml-4 flex flex-col gap-0.5`} data-testid={`routine-run-progress`}>
                            {response.progress.map((progress?: Dynamic, index?: Dynamic, items?: Dynamic, ..._extraArguments: unknown[]): Dynamic => <div
                              className={`text-caption ${index === items.length - 1 ? `text-secondary` : `text-muted`}`}
                              key={`${progress}#${String(items.slice(0, index).filter((itemsSlice?: Dynamic, ..._extraArguments: unknown[]) => itemsSlice === progress).length)}`}
                            >{progress}</div>)}
                          </div>}</div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

function RoutineHistoryIcon(
  {
    runs: runs,
    routineId: routineId,
    label: label,
    onVisualize: onVisualize,
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let routineHistoryIconResult: Dynamic =
    resolvePlatformSyncAndRoutingCompact();
  return (
    <Popover.Root>
      <Popover.Trigger
        render={(
          routineHistoryIcon?: Dynamic,
          ..._extraArguments: unknown[]
        ) => (
          <Tooltip content={`Run history`}>
            <button
              {...routineHistoryIcon}
              type={`button`}
              aria-label={`Run history`}
              data-testid={`routine-history-icon`}
              className={`text-muted hover:text-primary hover:bg-alpha-1 mt-2 flex size-6 shrink-0 items-center justify-center rounded`}
            >{<UiOverlaysAndIconsCustomIcon name={`History`} customSize={14} />}</button>
          </Tooltip>
        )}
      />
      <Popover.Popup align={`end`} className={`w-96 !max-w-none`}>
        <div className={`mb-1 flex items-center`}>
          <span
            className={`text-secondary text-caption font-medium`}
          >{`Run history`}</span>
          {routineId !== undefined && onVisualize !== undefined && (
            <jsxRuntime.Fragment>
              <span className={`flex-1`} />
              <Tooltip
                content={`Build a live chart of this routine's results — a widget build starts in a tab and you watch it work.`}
                side={`bottom`}
                multiline={true}
              >
                <Button
                  variant={`ghost`}
                  size={routineHistoryIconResult(`sm`)}
                  data-testid={`routine-chart-results`}
                  onClick={(..._extraArguments: unknown[]): Dynamic =>
                    onVisualize(resolveDocumentPreviewValue3(routineId, label))
                  }
                >
                  <UiOverlaysAndIconsCustomIcon
                    name={`Chart`}
                    customSize={12}
                  />
                  {` Chart results`}
                </Button>
              </Tooltip>
            </jsxRuntime.Fragment>
          )}
        </div>
        <div className={`max-h-72 overflow-y-auto`}>
          <RoutineRuns runs={runs} />
        </div>
      </Popover.Popup>
    </Popover.Root>
  );
}

function RoutineRuns(
  { runs: runs }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let routineRunsResult: Dynamic = resolvePlatformApiAndAuthUseContext2();
  let parse = Date.parse(routineRunsResult.now());
  let routineRunsHandler: Dynamic = (
    routineRuns?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    resolvePlatformSessionAndSourcesWeekday(
      routineRuns,
      parse,
      routineRunsResult.locale,
      routineRunsResult.timeZone,
    );
  let filteredRuns: Dynamic = (runs ?? []).filter(
    (response?: Dynamic, ..._extraArguments: unknown[]) =>
      !applicationRoutesSet.has(response.status),
  );
  return runs === undefined ? (
    <div className={`text-muted text-caption`}>{`Loading…`}</div>
  ) : filteredRuns.length === 0 ? (
    <div
      className={`text-muted text-caption`}
      data-testid={`routine-runs-empty`}
    >{`No runs yet.`}</div>
  ) : (
    <div data-testid={`routine-run-history`}>
      {filteredRuns.map(
        (response?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
          <div data-testid={`routine-run-row`} className={`py-1`} key={response.id}>{<div className={`flex items-center gap-2`}>
                    <UseDocumentPreviewStatusComponent status={response.status === `error` ? `error` : response.status === `cancelled` ? `warning` : `ok`} />
                    {response.startedAt !== `` && <span className={`text-secondary text-caption shrink-0`}>
                        {routineRunsHandler(response.startedAt)}
                      </span>}
                    <span className={`text-muted text-caption shrink-0`}>
                      {ApplicationRoutesStaged[response.status] ?? response.status}
                      {response.settledAt !== `` && response.status !== `error` ? ` ${routineRunsHandler(response.settledAt)}` : ``}
                    </span>
                    {(response.error || response.summary) && <span className={`text-caption min-w-0 flex-1 truncate ${response.error === undefined ? `text-secondary` : `text-danger`}`}>
                        {resolveDataContentAndReferencesReplace2(response.error ?? response.summary ?? ``)}
                      </span>}
                  </div>}{response.outputs !== undefined && response.outputs.length > 0 && <div data-testid={`routine-run-outputs`} className={`text-caption mt-0.5 ml-4 flex min-w-0 flex-wrap items-baseline gap-x-2`}>
                        <span className={`text-muted shrink-0`}>{`Outputs:`}</span>
                        {response.outputs.map((entry?: Dynamic, ..._extraArguments: unknown[]): Dynamic => entry.kind === `file` ? <Link
                          href={resolvePlatformApiAndAuthValue(runFilePath(response.id, entry.name))}
                          download={entry.name}
                          className={`max-w-full truncate`}
                          key={entry.name}
                        >{resolveDataContentAndReferencesReplace2(entry.name)}{` (`}{resolveObservabilityBrowserAndOperationEventsToFixed(entry.bytes)}{`)`}</Link> : <span className={`text-secondary max-w-full truncate`} key={entry.name}>{resolveDataContentAndReferencesReplace2(entry.name)}{` (`}{resolveObservabilityBrowserAndOperationEventsToFixed(entry.bytes)}{`)`}</span>)}
                      </div>}</div>
        ),
      )}
    </div>
  );
}

function DuplicateNameInput(
  {
    open: open,
    onOpenChange: onOpenChange,
    pid: pid,
    projectName: projectName2,
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let [, set]: Dynamic = resolveObservabilityBrowserAndOperationEventsValue48();
  let [labelState, setLabelState]: Dynamic = (0, React.useState)(``);
  let [disabled, setDisabled]: Dynamic = (0, React.useState)(false);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (open) {
        setLabelState(`${projectName2} (copy)`);
      }
    },
    [open, projectName2],
  );
  let onClick = (..._extraArguments: unknown[]): undefined => {
    let name: Dynamic = labelState.trim();
    if (!(!name || disabled)) {
      setDisabled(true);
      toast.promise(
        (async (..._extraArguments: unknown[]): Promise<Dynamic> => {
          let response: Dynamic = await apiFetcher(
            `/api/v3/project/${encodeURIComponent(pid)}/duplicate`,
            {
              method: `POST`,
              headers: {
                "content-type": `application/json`,
              },
              body: JSON.stringify({
                name: name,
              }),
            },
          );
          let json: Dynamic = await response.json();
          if (!response.ok || !json.pid)
            throw Error(json.error ?? `duplicate failed (${response.status})`);
          onOpenChange(false);
          set(
            resolveDataContentAndReferencesKind2({
              kind: `project`,
              id: json.pid,
            }),
          );
          return json;
        })().finally(
          (..._extraArguments: unknown[]): Dynamic => setDisabled(false),
        ),
        {
          loading: `Duplicating…`,
          success: (
            duplicateNameInput?: Dynamic,
            ..._extraArguments: unknown[]
          ) =>
            duplicateNameInput.skipped && duplicateNameInput.skipped.length > 0
              ? `Duplicated to "${duplicateNameInput.name}" (${duplicateNameInput.skipped.length} file(s) not copied)`
              : `Duplicated to "${duplicateNameInput.name}"`,
          error: (error?: Dynamic, ..._extraArguments: unknown[]) =>
            error instanceof Error ? error.message : `duplicate failed`,
        },
      );
    }
  };
  return (
    <UiDialogsRoot.Root
      open={open}
      onOpenChange={(
        duplicateNameInput?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => !disabled && onOpenChange(duplicateNameInput)}
    >
      <UiDialogsRoot.Popup size={`sm`}>
        <UiDialogsRoot.Header
          showClose={true}
        >{`Duplicate project`}</UiDialogsRoot.Header>
        <TextInput
          autoFocus={true}
          aria-label={`New project name`}
          data-testid={`duplicate-name-input`}
          value={labelState}
          onChange={(event?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            setLabelState(event.currentTarget.value)
          }
          onFocus={(event?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            event.currentTarget.select()
          }
          onKeyDown={(
            event?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (event.key === `Enter`) {
              onClick();
            }
          }}
        />
        <UiDialogsRoot.Footer align={`end`}>
          <UiDialogsRoot.Close
            render={<Button disabled={disabled}>{`Cancel`}</Button>}
          />
          <Button
            variant={`primary`}
            disabled={disabled || labelState.trim().length === 0}
            data-testid={`duplicate-confirm`}
            onClick={onClick}
          >{`Duplicate`}</Button>
        </UiDialogsRoot.Footer>
      </UiDialogsRoot.Popup>
    </UiDialogsRoot.Root>
  );
}

function UseApplicationRootDisabledComponent(
  {
    disabled: disabled,
    reason: reason,
    onSelect: onSelect,
    icon: icon,
    children: children,
    ...applicationRootDisabled
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let jsx = (
    <Menu.Item {...applicationRootDisabled} disabled={disabled} onClick={onSelect} icon={icon}>{children}</Menu.Item>
  );
  return disabled ? (
    <Tooltip content={reason} side={`right`} delay={300}>
      <span className={`block`}>{jsx}</span>
    </Tooltip>
  ) : (
    jsx
  );
}

function RoomTabUnbound(
  { fileId: fileId }: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    <div
      role={`status`}
      className={`gap-md flex h-full flex-col items-center justify-center px-6`}
      data-testid={`room-tab-unbound`}
    >
      <UiOverlaysAndIconsCustomIcon
        name={`File`}
        size={`lg`}
        className={`text-secondary`}
      />
      <div className={`text-primary text-body font-medium`}>
        {SessionNavigationTitle.title}
      </div>
      <div className={`text-secondary text-footnote max-w-md text-center`}>
        {SessionNavigationTitle.body}
      </div>
      {false}
    </div>
  );
}

// BaoCut: 连不上时的标题不提 Claude Docs。
function RoomviewAuthorityFailed(
  {
    onRetry: onRetry,
    message: message,
    frame = false,
    supportCode: supportCode,
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let roomviewAuthorityFailedResult: Dynamic =
    resolvePlatformSyncAndRoutingCompact();
  let [reasonState]: Dynamic = (0, React.useState)(
    (..._extraArguments: unknown[]): null | string =>
      frame ? resolvePlatformLiveDocumentAndHistoryReason4().reason : null,
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (frame) {
        resolvePlatformLiveDocumentAndHistoryReason5(`card`);
      }
    },
    [frame],
  );
  let roomviewAuthorityFailedResult2 = frame
    ? resolvePlatformLiveDocumentAndHistoryWsNeverOpened(reasonState)
    : null;
  return (
    <div
      role={`alert`}
      className={`gap-md flex h-full flex-col items-center justify-center px-6`}
      data-testid={`roomview-authority-failed`}
    >
      <UiOverlaysAndIconsCustomIcon
        name={`CloudSlash`}
        size={`lg`}
        className={`text-secondary`}
      />
      <div className={`text-primary text-body font-medium`}>
        {frame ? `Couldn’t load this document` : `Can’t reach Docs`}
      </div>
      <div className={`text-secondary text-footnote max-w-md text-center`}>
        {frame
          ? `Something went wrong opening the document. Try again, or reload.`
          : `Check your connection and try again.`}
      </div>
      {roomviewAuthorityFailedResult2 !== null && (
        <div
          className={`text-secondary text-footnote max-w-md text-center`}
          data-testid={`roomview-boot-gave-up-hint`}
          data-reason={reasonState ?? undefined}
        >
          {roomviewAuthorityFailedResult2}
        </div>
      )}
      <Button
        size={roomviewAuthorityFailedResult(`sm`)}
        variant={`secondary`}
        onClick={onRetry}
      >{`Retry`}</Button>
      {supportCode ? <SupportCodeCopyButton code={supportCode} /> : null}
      {false}
    </div>
  );
}

function updateApplicationRootValue(..._extraArguments: unknown[]): undefined {
  let storeState: Dynamic = PlatformSyncAndRoutingState4.getState();
  let enabled = !storeState.value;
  if (enabled) {
    updatePlatformLiveDocumentAndHistoryOpen();
  } else {
    updatePlatformLiveDocumentAndHistoryOpen2();
  }
  storeState.set(enabled);
  if (enabled) {
    let storeState2: Dynamic = useCommentStore.getState();
    if (storeState2.commentMode === `list`) {
      storeState2.setCommentMode(`margin`);
    }
    SessionNavigationPanel.getState().close();
  } else PlatformSyncAndRoutingAssign2.getState().clear();
}

function HistoryRailToggle(
  ..._extraArguments: [Readonly<Record<string, unknown>>?, ...unknown[]]
) {
  return (
    <Tooltip content={`History`}>
      <IconButton
        data-testid={`history-rail-toggle`}
        aria-label={`History`}
        variant={`default`}
        size={28}
        onClick={updateApplicationRootValue}
        icon={<SessionNavigationState4 size={14} />}
      />
    </Tooltip>
  );
}

function UseApplicationRootHasFilesComponent(
  { hasFiles: hasFiles }: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    <div
      className={`text-body text-secondary flex h-full items-center justify-center`}
    >
      {hasFiles
        ? `Open a tab from the tabs menu.`
        : `No tabs yet. Create one from the tabs menu.`}
    </div>
  );
}

var ApplicationRootThen: Dynamic;

var ApplicationRootThen2: Dynamic;

var ApplicationRootDefault: Dynamic;

var ApplicationRootThen3: Dynamic;

var ApplicationRootDefault2: Dynamic;

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeApplicationRootRoutineDetailStep1(): void {
  (ApplicationRootRefDangling = {
    "ref-dangling": `A source reference no longer resolves`,
    "adapter-resolve-failed": `A source couldn't be decoded`,
    "row-keyless": `Rows are missing the unique key`,
    "row-nonconformant": `Rows don't match the columns`,
    "overlay-pk-dangling": `An edit points at a row that's gone`,
  });
  (ApplicationRootThen = resolvePlatformChunkLoadingLazy(
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          import("../../platform/index").then(
            (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              result.PlatformSyncAndRoutingActionsPage,
          ),
        mapPreloadDependencies([0, 1, 2, 3]),
        import.meta.url,
      ),
  ));
  (ApplicationRootThen2 = resolvePlatformChunkLoadingLazy(
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          import("../../platform/index").then(
            (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              result.PlatformSyncAndRoutingActionsPage,
          ),
        mapPreloadDependencies([0, 1, 2, 3]),
        import.meta.url,
      ),
  ));
  (ApplicationRootDefault = resolvePlatformChunkLoadingLazy(
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          import("../../platform/index")
            .then(
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                result.PlatformSyncAndRoutingActionsPage,
            )
            .then(
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
                default: result.TranscriptFoldDebug,
              }),
            ),
        mapPreloadDependencies([0, 1, 2, 3]),
        import.meta.url,
      ),
  ));
  (ApplicationRootThen3 = resolvePlatformChunkLoadingLazy(
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          import("../../platform/index").then(
            (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              result.PlatformSyncAndRoutingActionsPage,
          ),
        mapPreloadDependencies([0, 1, 2, 3]),
        import.meta.url,
      ),
  ));
  (ApplicationRootDefault2 = resolvePlatformChunkLoadingLazy(
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          import("../../platform/index")
            .then(
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                result.PlatformSyncAndRoutingActionsPage,
            )
            .then(
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
                default: result.FilmedMountDebug,
              }),
            ),
        mapPreloadDependencies([0, 1, 2, 3]),
        import.meta.url,
      ),
  ));
}

export {
  ApplicationRootDefault,
  ApplicationRootDefault2,
  ApplicationRootThen,
  ApplicationRootThen2,
  ApplicationRootThen3,
  DatabaseDetail,
  DuplicateNameInput,
  HistoryRailToggle,
  RoomTabUnbound,
  RoomviewAuthorityFailed,
  RoutineDetail,
  RoutinePage,
  UseApplicationRootDisabledComponent,
  UseApplicationRootHasFilesComponent,
  UseApplicationRootTextComponent,
  loadApplicationRootRows,
  loadApplicationRootStatus,
  resolveApplicationRootKind,
  resolveApplicationRootKind2,
  updateApplicationRootValue,
};
