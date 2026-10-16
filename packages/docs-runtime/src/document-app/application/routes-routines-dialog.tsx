/** BaoCut: application routes from index-CX4IZqzA.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  Button,
  EditorSelectionAndTablesRequested,
  EditorSelectionAndTablesState6,
  EditorSelectionAndTablesState7,
  Menu,
  PAGE_BUSY_TRY_AGAIN,
  PlatformSyncAndRoutingAssign2,
  PlatformSyncAndRoutingState4,
  PlatformSyncAndRoutingState5,
  UiDialogsRoot,
  UiOverlaysAndIconsCustomIcon,
  ackOf,
  apiFetcher,
  liveSupportCode,
  loadPlatformApiAndAuthDescription,
  loadPlatformLiveDocumentAndHistoryContainer2,
  loadPlatformLiveDocumentAndHistoryVerb,
  loadPlatformSessionAndSourcesFrameVersionTable,
  loadPlatformSyncAndRoutingClipboard,
  pageBusyOf,
  resolveCommentsEditorUseContext4,
  resolveDataContentAndReferencesKind,
  resolveDataContentAndReferencesKind2,
  resolveDataContentAndReferencesReplace2,
  resolveEditorHostIsFinite2,
  resolveObservabilityBrowserAndOperationEventsJoin,
  resolveObservabilityBrowserAndOperationEventsReplace2,
  resolvePlatformLiveDocumentAndHistoryEncode,
  resolvePlatformSessionAndSourcesWeekday,
  resolvePlatformSyncAndRoutingCompact,
  resolvePlatformSyncAndRoutingPath4,
  resolvePlatformSyncAndRoutingScheduled,
  resolvePlatformSyncAndRoutingScheduled2,
  resolvePlatformSyncAndRoutingVerb3,
  subscribeProjectFeed,
  toast,
  updateCommentsActionsAndSelectionValue2,
  useCommentStore,
  useCommentsStoreUseSyncExternalStore,
  withBusyRetry,
} from "../dependencies";
import {
  React,
  jsxRuntime,
} from "../bootstrap";
import {
  openDebugReportDialog,
} from "../document-recovery";
import {
  BUG_ICON,
  RunSourceChip,
  SupportReportDialog,
} from "../run-review";
import {
  openKeyboardHelp,
} from "../document-display";
import {
  rememberCommentListReturn,
} from "../ask-cards/document-posture-badge";
import {
  PagebarMenuFit,
} from "../document-tabs/pagebar";
import {
  SessionNavigationPanel,
  SessionNavigationThen4,
} from "../session-navigation/ldoc-comments-btn";
import {
  ApplicationRoutes_Styles,
  RoutineInflightChip,
  resolveApplicationRoutesKind,
  resolveApplicationRoutesRuns,
} from "./routes-filmed-prose-page";
import { DatabaseDetail } from "./databases/detail";
import { ProjectDuplicateDialog } from "./project-duplicate-dialog";
import { RoutineDetail } from "./routines/detail";
import { DisabledMenuItem } from "./disabled-menu-item";
import { DetailMessage } from "./detail-message";
import { loadRoutineList, loadDatabaseList, isDatabaseFeedUpdate } from "./project-data";
import { toggleHistoryRail } from "./history-rail-toggle";

function VersionPicker(
  {
    pid: pid,
    door: door,
    version: version,
    fileId: fileId,
    routineId: routineId,
    navigate: navigate,
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let [versionPickerState, setVersionPickerState]: Dynamic = (0,
  React.useState)(null);
  let [labelState, setLabelState]: Dynamic = (0, React.useState)(``);
  let [enabledState, setEnabledState]: Dynamic = (0, React.useState)(false);
  let countRef: Dynamic = (0, React.useRef)(0);
  let versionPickerResult: Dynamic = resolveCommentsEditorUseContext4();
  let fileIdRef: Dynamic = (0, React.useRef)(fileId);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      fileIdRef.current = fileId;
    },
    [fileId],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      setVersionPickerState(null);
      setEnabledState(false);
      setLabelState(``);
      let versionPickerResult2: number = ++countRef.current;
      loadPlatformSessionAndSourcesFrameVersionTable(pid, apiFetcher).then(
        (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          versionPickerResult2 === countRef.current &&
          setVersionPickerState({
            pid: pid,
            ...result,
          }),
        (..._extraArguments: unknown[]): Dynamic =>
          versionPickerResult2 === countRef.current &&
          setVersionPickerState(`err`),
      );
      return (..._extraArguments: unknown[]): undefined => {
        countRef.current++;
      };
    },
    [pid],
  );
  let versionPickerState2: Dynamic =
    versionPickerState &&
    versionPickerState !== `err` &&
    versionPickerState.pid === pid
      ? versionPickerState
      : undefined;
  let toSorted: Dynamic = versionPickerState2?.lines
    .filter(
      (versionPicker?: Dynamic, ..._extraArguments: unknown[]) =>
        !versionPicker.abandoned &&
        versionPicker.id !== versionPickerState2.defaultVersionId,
    )
    .toSorted(
      (
        versionPicker?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): number => (options.bornAtSeq ?? 0) - (versionPicker.bornAtSeq ?? 0),
    );
  let checked: Dynamic =
    !version ||
    (versionPickerState2 && version === versionPickerState2.defaultVersionId);
  if (checked && toSorted?.length === 0) return null;
  let line: Dynamic = versionPickerState2?.lines.find(
    (versionPicker?: Dynamic, ..._extraArguments: unknown[]) =>
      versionPicker.id === version,
  );
  let label: Dynamic = checked ? `Live` : (line?.name ?? version);
  let navigate2 = (
    version2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let container: Dynamic = {
      kind: `project`,
      id: pid,
      ...(version2
        ? {
            version: version2,
          }
        : {}),
    };
    navigate(
      fileId
        ? resolveDataContentAndReferencesKind({
            container: container,
            ref: {
              noun: `file`,
              id: fileId,
            },
          })
        : routineId
          ? resolveDataContentAndReferencesKind({
              container: container,
              ref: {
                noun: `routine`,
                id: routineId,
              },
            })
          : resolveDataContentAndReferencesKind2(container),
    );
  };
  let setEnabledState2 = async (
    ..._extraArguments: unknown[]
  ): Promise<undefined> => {
    let trimmedLabelState: Dynamic = labelState.trim();
    if (!trimmedLabelState || enabledState || !door) return;
    let pid2: Dynamic = pid;
    let count: Dynamic = countRef.current;
    let uniqueItems: Dynamic = versionPickerState2
      ? new (Set as Dynamic)(
          versionPickerState2.lines.map(
            (line2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              line2.id,
          ),
        )
      : undefined;
    setEnabledState(true);
    try {
      await loadPlatformApiAndAuthDescription(pid2, trimmedLabelState);
    } catch (error: Dynamic) {
      if (countRef.current === count) {
        setEnabledState(false);
      }
      toast.error(
        error instanceof Error ? error.message : `create draft failed`,
      );
      return;
    }
    if (countRef.current === count) {
      setLabelState(``);
      try {
        let versionPickerResult2: Dynamic =
          await loadPlatformSessionAndSourcesFrameVersionTable(
            pid2,
            apiFetcher,
          );
        if (countRef.current !== count) return;
        countRef.current++;
        setVersionPickerState({
          pid: pid2,
          ...versionPickerResult2,
        });
        let uniqueItems2: Dynamic =
          uniqueItems &&
          versionPickerResult2.lines.find(
            (line2?: Dynamic, ..._extraArguments: unknown[]) =>
              !uniqueItems.has(line2.id),
          );
        if (uniqueItems2) {
          let container: Dynamic = {
            kind: `project`,
            id: pid2,
            version: uniqueItems2.id,
          };
          let fileId2: Dynamic = fileIdRef.current;
          navigate(
            fileId2
              ? resolveDataContentAndReferencesKind({
                  container: container,
                  ref: {
                    noun: `file`,
                    id: fileId2,
                  },
                })
              : routineId
                ? resolveDataContentAndReferencesKind({
                    container: container,
                    ref: {
                      noun: `routine`,
                      id: routineId,
                    },
                  })
                : resolveDataContentAndReferencesKind2(container),
          );
        }
      } catch {
      } finally {
        if (countRef.current === count || countRef.current === count + 1) {
          setEnabledState(false);
        }
      }
    }
  };
  return (
    <jsxRuntime.Fragment>
      <span className={`text-muted shrink-0 px-0.5 text-[13px]`}>{`/`}</span>
      <Menu.Root>
        <Menu.Trigger
          openOnHover={true}
          delay={100}
          render={
            <button
              type={`button`}
              data-testid={`version-picker-trigger`}
              aria-label={`Line switcher`}
              className={`${ApplicationRoutes_Styles} max-w-[10rem]`}
            >
              <span className={`truncate`}>{label}</span>
              <UiOverlaysAndIconsCustomIcon
                name={`CaretDown`}
                customSize={12}
              />
            </button>
          }
        />
        <Menu.Popup align={`start`} collisionPadding={8} finalFocus={false}>
          <Menu.Item
            onClick={(..._extraArguments: unknown[]) => navigate2(undefined)}
            checked={checked}
            checkedRole={`radio`}
          >{`Live`}</Menu.Item>
          {toSorted && toSorted.length > 0 && <Menu.Separator />}
          {toSorted && toSorted.length > 0 && (
            <div className={`max-h-[40vh] overflow-y-auto`}>
              {toSorted.map(
                (toSorted2?: Dynamic, ..._extraArguments: unknown[]) => (
                  <Menu.Item
                    onClick={(..._extraArguments: unknown[]) => navigate2(toSorted2.id)}
                    checked={toSorted2.id === version}
                    checkedRole={`radio`}
                    key={toSorted2.id}
                  >{<div className={`flex min-w-0 flex-1 flex-col leading-tight`}>
                            <span className={`truncate`}>
                              {toSorted2.name ?? toSorted2.id}
                            </span>
                            {toSorted2.bornAt && <span className={`text-secondary text-caption truncate`}>
                                {resolvePlatformSessionAndSourcesWeekday(toSorted2.bornAt, versionPickerResult)}
                              </span>}
                          </div>}</Menu.Item>
                ),
              )}
            </div>
          )}
          <Menu.Separator />
          <div className={`px-2 py-1`}>
            <input
              data-testid={`new-draft-name`}
              placeholder={
                door ? `Name new draft` : `Name new draft (no write access)`
              }
              disabled={enabledState || !door}
              value={labelState}
              onChange={(
                event?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => setLabelState(event.target.value)}
              onKeyDown={(
                event?: Dynamic,
                ..._extraArguments: unknown[]
              ): undefined => {
                if (event.key === `Escape`) {
                  setLabelState(``);
                  return;
                }
                event.stopPropagation();
                if (event.key === `Enter`) {
                  setEnabledState2();
                }
              }}
              className={`text-primary placeholder:text-muted w-full border-b bg-transparent text-[13px] outline-none`}
            />
          </div>
        </Menu.Popup>
      </Menu.Root>
    </jsxRuntime.Fragment>
  );
}

var ApplicationRoutes_Styles2: string;

function HeaderPath(
  {
    pid: pid,
    door: door,
    projectName: projectName2,
    fileId: fileId,
    proseSurface: proseSurface,
    routineId: routineId,
    onRenamed: onRenamed,
    version: version,
    navigate: navigate,
    onOpenSources: onOpenSources,
    embed = false,
    historyOffered = true,
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let [enabledState, setEnabledState]: Dynamic = (0, React.useState)(false);
  let enabledRef: Dynamic = (0, React.useRef)(false);
  let setEnabledState2 = (..._extraArguments: unknown[]): undefined => {
    onOpenChange3(false);
    if (!enabledRef.current) {
      enabledRef.current = true;
      setEnabledState(true);
    }
  };
  let setEnabledState3 = (..._extraArguments: unknown[]): undefined => {
    enabledRef.current = false;
    setEnabledState(false);
  };
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      enabledRef.current = false;
      setEnabledState(false);
    },
    [pid],
  );
  let [open, onOpenChange]: Dynamic = (0, React.useState)(false);
  let headerPathResult: Dynamic = useCommentsStoreUseSyncExternalStore();
  let onClick: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): undefined => {
      let headerPathResult5: Dynamic = liveSupportCode();
      loadPlatformSyncAndRoutingClipboard(headerPathResult5).then(
        (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          toast(
            result
              ? `Support code copied: ${headerPathResult5}`
              : `Support code: ${headerPathResult5} (select and copy)`,
            {
              id: `support-code`,
              duration: result ? 4e3 : 15e3,
            },
          ),
      );
    },
    [],
  );
  let [open2, onOpenChange2]: Dynamic = (0, React.useState)(false);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      onOpenChange(false);
      onOpenChange2(false);
    },
    [pid],
  );
  let [headerPathResult2, set]: Dynamic =
    updateCommentsActionsAndSelectionValue2();
  let headerPathResult3: Dynamic = PlatformSyncAndRoutingAssign2(
    (headerPath?: Dynamic, ..._extraArguments: unknown[]) =>
      headerPath.preview?.upto !== undefined,
  );
  let matchesFileId: Dynamic = fileId !== undefined && headerPathResult3;
  let label = `project/${pid}`;
  let hasLabel: Dynamic = headerPathResult2.has(label);
  let checked: Dynamic = EditorSelectionAndTablesState6(
    (headerPath?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      headerPath.value,
  );
  let checked2: Dynamic = EditorSelectionAndTablesState7(
    (headerPath?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      headerPath.value,
  );
  let headerPathResult4 = resolveEditorHostIsFinite2(
    PlatformSyncAndRoutingState5(
      (headerPath?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        headerPath.value,
    ),
  );
  let checked3: Dynamic = PlatformSyncAndRoutingState4(
    (headerPath?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      headerPath.value,
  );
  let [open3, onOpenChange3]: Dynamic = (0, React.useState)(false);
  let elementRef: Dynamic = (0, React.useRef)(null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!open3) return;
      let closest = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let target: Dynamic =
          event.target instanceof Element ? event.target : null;
        if (target) {
          if (target.closest(`[data-base-ui-inert]`)) {
            onOpenChange3(false);
            return;
          }
          if (
            !target.closest(
              `[data-base-ui-portal],[data-testid=project-menu-trigger]`,
            )
          ) {
            onOpenChange3(false);
          }
        }
      };
      document.addEventListener(`pointerdown`, closest, true);
      return (..._extraArguments: unknown[]) =>
        document.removeEventListener(`pointerdown`, closest, true);
    },
    [open3],
  );
  let onRenamed2 = async (
    headerPath?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<undefined> => {
    if (!door) throw Error(`Rename failed`);
    let { verb: headerPathResult5, ...headerPathResult6 }: Dynamic =
      resolvePlatformSyncAndRoutingVerb3(
        pid,
        resolvePlatformSyncAndRoutingPath4(headerPath),
      );
    let response: Dynamic = ackOf(
      await withBusyRetry(door).call(headerPathResult5, headerPathResult6),
    );
    if (response.verdict !== `allow`)
      throw Error(
        pageBusyOf(response) === null
          ? `deny ${response.reason ?? `unknown`}`
          : PAGE_BUSY_TRY_AGAIN,
      );
    onRenamed();
  };
  let trim = (
    headerPath?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (!enabledRef.current) return;
    setEnabledState3();
    let headerPathResult5: Dynamic =
      resolveObservabilityBrowserAndOperationEventsReplace2(
        headerPath,
        projectName2 ?? ``,
      );
    if (
      !(
        !door ||
        headerPathResult5 === null ||
        headerPathResult5 === (projectName2 ?? ``).trim()
      )
    ) {
      onRenamed2(headerPathResult5).catch(
        (error?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          toast.error(error instanceof Error ? error.message : `Rename failed`);
        },
      );
    }
  };
  let embed2: Dynamic = embed && historyOffered;
  let matchesFileId2 = fileId !== undefined && proseSurface === true;
  return (
    <div
      data-testid={`header-path`}
      className={`-ml-1 flex min-w-0 items-center`}
    >
      {enabledState ? (
        <input
          autoFocus={true}
          defaultValue={projectName2}
          onFocus={(event?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            event.currentTarget.select()
          }
          onBlur={(event?: Dynamic, ..._extraArguments: unknown[]) =>
            trim(event.currentTarget.value)
          }
          onKeyDown={(
            event?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (event.key === `Enter`) {
              trim(event.currentTarget.value);
            } else {
              if (event.key === `Escape`) {
                setEnabledState3();
              }
            }
          }}
          className={`text-primary border-accent w-[12rem] border-b bg-transparent text-[13px] outline-none`}
        />
      ) : (
        <Menu.Root open={open3} onOpenChange={onOpenChange3}>
          <Menu.Trigger
            ref={elementRef}
            openOnHover={true}
            delay={100}
            render={
              <button
                type={`button`}
                data-testid={`project-menu-trigger`}
                aria-label={`Project menu`}
                className={`${ApplicationRoutes_Styles2} ${embed ? `max-w-full gap-1 font-semibold` : `max-w-[14rem]`}`}
              >
                {projectName2 === undefined ? (
                  <span
                    className={`bg-alpha-1 inline-block h-4 w-28 animate-pulse rounded`}
                    aria-hidden={true}
                  />
                ) : (
                  <span className={`truncate`}>{projectName2}</span>
                )}
                {embed && (
                  <UiOverlaysAndIconsCustomIcon
                    name={`CaretDown`}
                    customSize={12}
                  />
                )}
              </button>
            }
          />
          <Menu.Popup align={`start`} collisionPadding={8} finalFocus={false}>
            <Menu.Item
              onClick={(..._extraArguments: unknown[]) => setEnabledState2()}
              icon={`Edit`}
              disabled={!door || projectName2 === undefined}
            >{`Rename`}</Menu.Item>
            {!embed && (
              <Menu.Item
                onClick={(..._extraArguments: unknown[]): Dynamic =>
                  onOpenChange2(true)
                }
                icon={`Copy`}
                disabled={!door || projectName2 === undefined}
              >{`Duplicate`}</Menu.Item>
            )}
            {!embed && (
              <Menu.Item
                onClick={(..._extraArguments: unknown[]): Dynamic => set(label)}
                icon={hasLabel ? `StarFilled` : `Star`}
              >
                {hasLabel ? `Unstar` : `Star`}
              </Menu.Item>
            )}
            <Menu.Submenu>
              <Menu.SubmenuTrigger
                icon={`TextAa`}
                data-testid={`menu-spelling`}
              >{`Spelling & grammar`}</Menu.SubmenuTrigger>
              <Menu.Popup>
                <Menu.Item
                  icon={`CheckCircle`}
                  onClick={(..._extraArguments: unknown[]): Dynamic =>
                    fileId &&
                    EditorSelectionAndTablesRequested.getState().request(fileId)
                  }
                >{`Check and resolve errors`}</Menu.Item>
                <Menu.Separator />
                <Menu.Item
                  onClick={(..._extraArguments: unknown[]): Dynamic =>
                    EditorSelectionAndTablesState6.getState().set(!checked)
                  }
                  checked={checked}
                  checkedRole={`radio`}
                >{`Show spelling & grammar errors`}</Menu.Item>
                <Menu.Item
                  onClick={(..._extraArguments: unknown[]): Dynamic =>
                    EditorSelectionAndTablesState7.getState().set(!checked2)
                  }
                  checked={checked2}
                  checkedRole={`radio`}
                >{`Autocorrect`}</Menu.Item>
              </Menu.Popup>
            </Menu.Submenu>
            {matchesFileId2 && (
              <Menu.Submenu>
                <Menu.SubmenuTrigger
                  icon={`Search`}
                  data-testid={`menu-zoom`}
                >{`Zoom`}</Menu.SubmenuTrigger>
                <Menu.Popup>
                  <PagebarMenuFit
                    value={headerPathResult4}
                    onPick={(
                      headerPath?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic =>
                      PlatformSyncAndRoutingState5.getState().set(headerPath)
                    }
                    testid={`menu-zoom`}
                  />
                </Menu.Popup>
              </Menu.Submenu>
            )}
            <Menu.Separator />
            {!embed && (
              <Menu.Item
                data-testid={`more-sources-btn`}
                onClick={(..._extraArguments: unknown[]): Dynamic =>
                  onOpenSources({
                    kind: `sources`,
                  })
                }
                icon={`Database`}
              >{`Data sources`}</Menu.Item>
            )}
            <DisabledMenuItem
              data-testid={`more-comments-btn`}
              disabled={
                matchesFileId || (fileId !== undefined && !proseSurface)
              }
              reason={`Comments aren't available for this view`}
              icon={`Chats`}
              onSelect={(
                headerPath?: Dynamic,
                ..._extraArguments: unknown[]
              ): undefined => {
                if (
                  fileId !== undefined &&
                  useCommentStore.getState().commentMode !== `list`
                ) {
                  rememberCommentListReturn(headerPath.detail === 0);
                }
                useCommentStore.getState().setCommentMode(`list`);
                PlatformSyncAndRoutingState4.getState().set(false);
                SessionNavigationPanel.getState().close();
              }}
            >{`Show all comments`}</DisabledMenuItem>
            {embed2 && (
              <Menu.Item
                data-testid={`menu-history`}
                icon={`History`}
                disabled={!fileId}
                checked={checked3}
                checkedRole={`radio`}
                onClick={toggleHistoryRail}
              >{`Version history`}</Menu.Item>
            )}
            <Menu.Item
              data-testid={`menu-keyboard-shortcuts`}
              icon={`Keyboard`}
              shortcut={`cmd+/`}
              onClick={(..._extraArguments: unknown[]): Dynamic =>
                openKeyboardHelp({
                  returnTo: elementRef.current,
                })
              }
            >{`Keyboard shortcuts`}</Menu.Item>
            <Menu.Item
              data-testid={`menu-support-code`}
              icon={`Copy`}
              onClick={onClick}
            >
              {`Copy support code (`}
              {resolveObservabilityBrowserAndOperationEventsJoin(
                liveSupportCode(),
              )}
              {`)`}
            </Menu.Item>
            {headerPathResult ? (
              <Menu.Item
                data-testid={`menu-debug-report`}
                icon={
                  <UiOverlaysAndIconsCustomIcon
                    customIcon={BUG_ICON}
                    size={`sm`}
                  />
                }
                onClick={openDebugReportDialog}
              >{`Debug report…`}</Menu.Item>
            ) : null}
            <Menu.Separator />
            <Menu.Item
              onClick={(..._extraArguments: unknown[]): Dynamic =>
                onOpenChange(true)
              }
              icon={`Bullhorn`}
            >{`Send feedback`}</Menu.Item>
          </Menu.Popup>
        </Menu.Root>
      )}
      {!embed && (
        <VersionPicker
          pid={pid}
          door={door}
          version={version}
          fileId={fileId}
          routineId={routineId}
          navigate={navigate}
        />
      )}
      <SupportReportDialog
        open={open}
        onOpenChange={onOpenChange}
        source={`workspace`}
        container={`project/${pid}`}
      />
      <ProjectDuplicateDialog
        open={open2}
        onOpenChange={onOpenChange2}
        pid={pid}
        projectName={projectName2 ?? `Untitled`}
      />
    </div>
  );
}

var ApplicationRoutesPrompt: Dynamic;

function useApplicationRoutesAriaLabel(..._extraArguments: unknown[]) {
  return (
    <button
      type={`button`}
      aria-label={`Close`}
      className={`text-muted hover:text-primary hover:bg-alpha-1 flex size-6 shrink-0 items-center justify-center rounded`}
    >
      <UiOverlaysAndIconsCustomIcon name={`X`} customSize={14} />
    </button>
  );
}

function RoutinesDialog(
  {
    open: open,
    onOpenChange: onOpenChange,
    pid: pid,
    version: version,
    drill: drill,
    drillSeq: drillSeq,
    onDrillChange: onDrillChange,
    onVisualize: onVisualize,
  }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let routinesDialogResult: Dynamic = resolvePlatformSyncAndRoutingCompact();
  let [rows, setRows]: Dynamic = (0, React.useState)();
  let [slug, setSlug]: Dynamic = (0, React.useState)();
  let [routinesDialogState, setRoutinesDialogState]: Dynamic = (0,
  React.useState)(null);
  let [routinesDialogState2, setRoutinesDialogState2]: Dynamic = (0,
  React.useState)();
  let [routinesDialogState3, setRoutinesDialogState3]: Dynamic = (0,
  React.useState)(null);
  let [routinesDialogState4, setRoutinesDialogState4]: Dynamic = (0,
  React.useState)(null);
  let [countState, setCountState]: Dynamic = (0, React.useState)(0);
  let nowMs: Dynamic = resolveCommentsEditorUseContext4();
  let [routinesDialogState5, setRoutinesDialogState5]: Dynamic = (0,
  React.useState)();
  let [routinesDialogState6, setRoutinesDialogState6]: Dynamic = (0,
  React.useState)(null);
  let elementRef: Dynamic = (0, React.useRef)(null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!open) {
        elementRef.current = null;
        return;
      }
      let enabled = true;
      let matchesElement = elementRef.current !== pid;
      elementRef.current = pid;
      if (matchesElement) {
        setRows(undefined);
        setRoutinesDialogState(null);
      }
      let enabled2 = !matchesElement;
      let enabled3 = false;
      let enabled4 = false;
      let result = (..._extraArguments: unknown[]): undefined => {
        if (enabled3) {
          enabled4 = true;
          return;
        }
        enabled3 = true;
        loadRoutineList(pid)
          .then(
            (result2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
              if (enabled) {
                enabled2 = true;
                setRows(result2.rows);
                setSlug(result2.slug);
                setRoutinesDialogState(null);
              }
            },
            (error2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              enabled &&
              !enabled2 &&
              setRoutinesDialogState(
                error2 instanceof Error
                  ? error2.message
                  : `routines read failed`,
              ),
          )
          .finally((..._extraArguments: unknown[]): undefined => {
            enabled3 = false;
            if (enabled4 && enabled) {
              enabled4 = false;
              result();
            }
          });
      };
      result();
      let routinesDialogResult2: Dynamic = subscribeProjectFeed(
        pid,
        (
          routinesDialog?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (resolveApplicationRoutesKind(routinesDialog)) {
            result();
          }
        },
      );
      return (..._extraArguments: unknown[]): undefined => {
        enabled = false;
        routinesDialogResult2();
      };
    },
    [open, pid, countState],
  );
  let elementRef2: Dynamic = (0, React.useRef)(null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!open) {
        elementRef2.current = null;
        return;
      }
      let enabled = true;
      let matchesElement = elementRef2.current !== pid;
      elementRef2.current = pid;
      if (matchesElement) {
        setRoutinesDialogState5(undefined);
        setRoutinesDialogState6(null);
      }
      let enabled2 = !matchesElement;
      let enabled3 = false;
      let enabled4 = false;
      let result = (..._extraArguments: unknown[]): undefined => {
        if (enabled3) {
          enabled4 = true;
          return;
        }
        enabled3 = true;
        loadDatabaseList(pid)
          .then(
            (result2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
              if (enabled) {
                enabled2 = true;
                setRoutinesDialogState5(result2);
                setRoutinesDialogState6(null);
              }
            },
            (error2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              enabled &&
              !enabled2 &&
              setRoutinesDialogState6(
                error2 instanceof Error
                  ? error2.message
                  : `databases read failed`,
              ),
          )
          .finally((..._extraArguments: unknown[]): undefined => {
            enabled3 = false;
            if (enabled4 && enabled) {
              enabled4 = false;
              result();
            }
          });
      };
      result();
      let routinesDialogResult2: Dynamic = subscribeProjectFeed(
        pid,
        (
          routinesDialog?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (isDatabaseFeedUpdate(routinesDialog)) {
            result();
          }
        },
      );
      return (..._extraArguments: unknown[]): undefined => {
        enabled = false;
        routinesDialogResult2();
      };
    },
    [open, pid],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!open) return;
      let enabled = true;
      setRoutinesDialogState2(undefined);
      (async (..._extraArguments: unknown[]): Promise<Dynamic> => {
        let response: Dynamic = await apiFetcher(
          `/api/v3/project/${encodeURIComponent(pid)}/staged-runs`,
        );
        if (!response.ok)
          throw Error(`staged-runs read failed (${response.status})`);
        return (await response.json()).rows;
      })().then(
        (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          enabled && setRoutinesDialogState2(result),
        (..._extraArguments: unknown[]): Dynamic =>
          enabled && setRoutinesDialogState2([]),
      );
      return (..._extraArguments: unknown[]): undefined => {
        enabled = false;
      };
    },
    [open, pid, countState],
  );
  let [routinesDialogState7, setRoutinesDialogState7]: Dynamic = (0,
  React.useState)(null);
  let elementRef3: Dynamic = (0, React.useRef)(null);
  let [kind, setKind]: Dynamic = (0, React.useState)(null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (open) {
        if (drill.kind === `routine` || drill.kind === `database`) {
          setRoutinesDialogState7({
            kind: drill.kind,
            ref: drill.ref,
          });
          setKind(null);
        } else {
          setRoutinesDialogState7(null);
          setKind(drill.kind);
        }
      }
    },
    [open, drillSeq],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (!(!open || kind === null))
        if (kind === `routines`) {
          if (rows === undefined && routinesDialogState === null) return;
          setKind(null);
          let rowItem: Dynamic = rows?.[0];
          if (rowItem !== undefined) {
            setRoutinesDialogState7({
              kind: `routine`,
              ref: rowItem.id ?? rowItem.name,
            });
          }
        } else {
          if (
            routinesDialogState5 === undefined &&
            routinesDialogState6 === null
          )
            return;
          setKind(null);
          let routinesDialogStateItem: Dynamic = routinesDialogState5?.[0];
          if (routinesDialogStateItem !== undefined) {
            setRoutinesDialogState7({
              kind: `database`,
              ref: routinesDialogStateItem.id,
            });
          }
        }
    },
    [
      open,
      kind,
      rows,
      routinesDialogState,
      routinesDialogState5,
      routinesDialogState6,
    ],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (open) {
        elementRef3.current?.scrollIntoView({
          block: `nearest`,
        });
      }
    },
    [open, routinesDialogState7, rows, routinesDialogState5],
  );
  let knownNames: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      new (Set as Dynamic)(
        (rows ?? []).map(
          (row2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => row2.name,
        ),
      ),
    [rows],
  );
  let row: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (routinesDialogState7?.kind !== `routine` || rows === undefined)
        return;
      let row2: Dynamic = rows.find(
        (row3?: Dynamic, ..._extraArguments: unknown[]) =>
          row3.id === routinesDialogState7.ref,
      );
      if (row2 !== undefined) return row2;
      let filteredRows: Dynamic = rows.filter(
        (row3?: Dynamic, ..._extraArguments: unknown[]) =>
          row3.name === routinesDialogState7.ref,
      );
      return filteredRows.length === 1 ? filteredRows[0] : undefined;
    },
    [routinesDialogState7, rows],
  );
  let memoized: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (
        !(
          routinesDialogState7?.kind !== `database` ||
          routinesDialogState5 === undefined
        )
      )
        return routinesDialogState5.find(
          (routinesDialogState8?: Dynamic, ..._extraArguments: unknown[]) =>
            routinesDialogState8.id === routinesDialogState7.ref,
        );
    },
    [routinesDialogState7, routinesDialogState5],
  );
  let routinesDialogHandler: Dynamic = (
    routinesDialog?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    ...routinesDialog,
    homeLabel: routinesDialog.routine?.name ?? routinesDialog.home.id,
  });
  let error = async (
    routinesDialog?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<undefined> => {
    setRoutinesDialogState3(routinesDialog.runId + `:` + options);
    try {
      if (options === `approve`) {
        let runClientPlaneHash: Dynamic =
          routinesDialog.pinnedPlane === undefined
            ? routinesDialog.runClientPlaneHash
            : resolvePlatformLiveDocumentAndHistoryEncode(
                routinesDialog.pinnedPlane,
              );
        let identityHash: Dynamic =
          routinesDialog.routine?.connector?.identityHash ?? undefined;
        let parametersHash: Dynamic =
          routinesDialog.routine?.parametersHash ?? undefined;
        await loadPlatformLiveDocumentAndHistoryContainer2(
          {
            home: routinesDialog.home,
            runId: routinesDialog.runId,
          },
          runClientPlaneHash,
          identityHash,
          parametersHash,
        );
        toast.success(
          routinesDialog.trigger === `routine`
            ? `Run approved — executing shortly`
            : `Run approved — queued to execute`,
        );
      } else {
        await loadPlatformLiveDocumentAndHistoryVerb({
          home: routinesDialog.home,
          runId: routinesDialog.runId,
        });
        toast.success(`Run dismissed`);
      }
    } catch (error2: Dynamic) {
      toast.error(
        `${options === `approve` ? `Approve` : `Dismiss`} failed: ${error2.message}`,
      );
    } finally {
      setRoutinesDialogState4(null);
      setCountState(
        (routinesDialog2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          routinesDialog2 + 1,
      );
      setRoutinesDialogState3(null);
    }
  };
  let onOpenChange2 = (
    routinesDialog?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    onOpenChange(routinesDialog);
  };
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (!open) {
        setRoutinesDialogState4(null);
        setRoutinesDialogState7(null);
        setKind(null);
      }
    },
    [open],
  );
  let closeModal: Dynamic = (..._extraArguments: unknown[]) =>
    onOpenChange2(false);
  let routinesDialogHandler2 = (
    routinesDialog?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `flex w-full items-center gap-2 rounded px-2 py-1.5 text-left ${routinesDialog ? `bg-alpha-2` : `hover:bg-alpha-1`}`;
  return (
    <jsxRuntime.Fragment>
      <UiDialogsRoot.Root open={open} onOpenChange={onOpenChange2}>
        <UiDialogsRoot.Popup
          size={`3xl`}
          portalClassName={`z-popover`}
          className={`flex h-[85dvh] !max-w-[1280px] flex-col !p-0`}
        >
          <UiDialogsRoot.Title
            className={`sr-only`}
          >{`Data sources`}</UiDialogsRoot.Title>
          <div className={`relative flex min-h-0 flex-1`}>
            <div className={`absolute top-4 right-4 z-10`}>
              <UiDialogsRoot.Close render={useApplicationRoutesAriaLabel()} />
            </div>
            <aside
              className={`w-72 shrink-0 overflow-y-auto border-r p-2`}
              data-testid={`routines-body`}
            >
              <div
                className={`text-secondary text-caption px-2 pt-1 pb-1 font-medium`}
              >{`Routines`}</div>
              {routinesDialogState === null ? (
                rows === undefined ? (
                  <div
                    className={`text-muted text-footnote px-2 py-1`}
                  >{`loading…`}</div>
                ) : rows.length === 0 ? (
                  <div
                    className={`text-secondary text-footnote px-2 py-1`}
                  >{`No routines yet. Define one in chat.`}</div>
                ) : (
                  rows.map(
                    (
                      row2?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic => {
                      let run: Dynamic = resolveApplicationRoutesRuns(row2);
                      return (
                        <button type={`button`} data-testid={`routine-row`} ref={row !== undefined && row2 === row ? elementRef3 : undefined} onClick={(..._extraArguments: unknown[]): Dynamic => onDrillChange({
  kind: `routine`,
  ref: row2.id ?? row2.name
})} className={routinesDialogHandler2(row !== undefined && row2 === row)} key={row2.id ?? row2.name}>{<UiOverlaysAndIconsCustomIcon
  name={ApplicationRoutesPrompt[row2.type] ?? `Lightning`}
  customSize={14}
  className={`text-secondary shrink-0`}
/>}{<span className={`text-primary text-footnote min-w-0 flex-1 truncate`}>
                                  {resolveDataContentAndReferencesReplace2(row2.label ?? row2.name)}
                                </span>}{run !== undefined && <RoutineInflightChip run={run} />}</button>
                      );
                    },
                  )
                )
              ) : (
                <div className={`text-danger text-footnote px-2 py-2`}>
                  {resolveDataContentAndReferencesReplace2(routinesDialogState)}
                </div>
              )}
              <div
                className={`text-secondary text-caption px-2 pt-4 pb-1 font-medium`}
              >{`Databases`}</div>
              {routinesDialogState6 === null ? (
                routinesDialogState5 === undefined ? (
                  <div
                    className={`text-muted text-footnote px-2 py-1`}
                  >{`loading…`}</div>
                ) : routinesDialogState5.length === 0 ? (
                  <div
                    className={`text-secondary text-footnote px-2 py-1`}
                  >{`No databases yet. Ask in chat to create one.`}</div>
                ) : (
                  routinesDialogState5.map(
                    (
                      routinesDialogState8?: Dynamic,
                      ..._extraArguments: unknown[]
                    ) => (
                      <button type={`button`} data-testid={`database-row`} ref={memoized !== undefined && routinesDialogState8 === memoized ? elementRef3 : undefined} onClick={(..._extraArguments: unknown[]): Dynamic => onDrillChange({
  kind: `database`,
  ref: routinesDialogState8.id
})} className={routinesDialogHandler2(memoized !== undefined && routinesDialogState8 === memoized)} key={routinesDialogState8.id}>{<UiOverlaysAndIconsCustomIcon name={`Database`} customSize={14} className={`text-secondary shrink-0`} />}{<span className={`text-primary text-footnote min-w-0 flex-1 truncate`}>
                                {resolveDataContentAndReferencesReplace2(routinesDialogState8.name)}
                              </span>}{<span className={`text-muted text-caption shrink-0 tabular-nums`}>
                                {routinesDialogState8.totalRows}
                              </span>}</button>
                    ),
                  )
                )
              ) : (
                <div className={`text-danger text-footnote px-2 py-2`}>
                  {resolveDataContentAndReferencesReplace2(
                    routinesDialogState6,
                  )}
                </div>
              )}
            </aside>
            <div className={`flex min-w-0 flex-1 flex-col overflow-y-auto p-4`}>
              {routinesDialogState2 !== undefined &&
                routinesDialogState2.length > 0 && (
                  <div className={`mb-2`} data-testid={`staged-runs-section`}>
                    <div
                      className={`text-secondary px-1 pt-1 pb-1.5 text-[11px] font-medium`}
                    >{`Awaiting review`}</div>
                    {routinesDialogState2.map(
                      (entry?: Dynamic, ..._extraArguments: unknown[]) => {
                        let mappedItem = [
                          entry.pinnedPlane?.prompt,
                          entry.pinnedPlane?.body,
                        ]
                          .map(
                            (item?: unknown, ..._extraArguments: unknown[]) =>
                              typeof item == `string` ? item.trim() : ``,
                          )
                          .find(
                            (
                              mappedItem2?: Dynamic,
                              ..._extraArguments: unknown[]
                            ) => mappedItem2 !== ``,
                          );
                        let runId: Dynamic =
                          entry.routine?.name !== undefined &&
                          entry.routine.name !== null
                            ? resolveDataContentAndReferencesReplace2(
                                entry.routine.name,
                              )
                            : mappedItem === undefined
                              ? entry.runId
                              : resolveDataContentAndReferencesReplace2(
                                  mappedItem,
                                );
                        return (
                          <div
                            data-testid={`staged-run-row`}
                            className={`border-strong flex items-center gap-3 border-b px-1 py-2.5 last:border-0`}
                            key={entry.runId}
                          >{<span className={`bg-alpha-1 text-secondary flex shrink-0 items-center gap-1 rounded px-1.5 py-0.5 text-[10px]`}>
                                    <UiOverlaysAndIconsCustomIcon name={`Lightning`} customSize={10} />
                                    {`staged`}
                                  </span>}{<div className={`min-w-0 flex-1`}>
                                    <div className={`text-primary truncate text-[13px]`}>
                                      {runId}
                                    </div>
                                    <div className={`text-secondary flex items-center gap-1.5 text-[11px]`}>
                                      <span
                                        className={`min-w-0 truncate`}
                                        title={(entry.provenance === undefined ? undefined : resolvePlatformSyncAndRoutingScheduled2(entry.provenance)) || undefined}
                                      >
                                        {entry.kind ?? `run`}
                                        {` · staged by`}
                                        {` `}
                                        {resolveDataContentAndReferencesReplace2(entry.provenance === undefined ? entry.user : resolvePlatformSyncAndRoutingScheduled(entry.provenance))}
                                        {entry.createdAt === `` ? `` : ` · ${resolvePlatformSessionAndSourcesWeekday(entry.createdAt, nowMs)}`}
                                      </span>
                                      {entry.source != null && <RunSourceChip source={entry.source} />}
                                    </div>
                                  </div>}{<span className={`flex shrink-0 gap-1`}>
                                    <Button
                                      size={routinesDialogResult(`xs`)}
                                      variant={`primary`}
                                      data-testid={`staged-run-approve`}
                                      disabled={routinesDialogState3 !== null}
                                      onClick={(..._extraArguments: unknown[]): Dynamic => setRoutinesDialogState4(entry)}
                                    >{`Approve…`}</Button>
                                    <Button
                                      size={routinesDialogResult(`xs`)}
                                      variant={`ghost`}
                                      data-testid={`staged-run-dismiss`}
                                      busy={routinesDialogState3 === entry.runId + `:dismiss`}
                                      disabled={routinesDialogState3 !== null}
                                      onClick={(..._extraArguments: unknown[]): undefined => void error(entry, `dismiss`)}
                                    >{`Dismiss`}</Button>
                                  </span>}</div>
                        );
                      },
                    )}
                  </div>
                )}
              {routinesDialogState7?.kind === `routine` ? (
                rows === undefined ? (
                  <DetailMessage
                    text={
                      routinesDialogState === null
                        ? `loading…`
                        : resolveDataContentAndReferencesReplace2(
                            routinesDialogState,
                          )
                    }
                  />
                ) : row === undefined ? (
                  <DetailMessage
                    text={`That routine isn't available in this project`}
                  />
                ) : (
                  <RoutineDetail pid={pid} version={version} row={row} slug={slug} nowMs={nowMs} knownNames={knownNames} onVisualize={onVisualize} closeModal={closeModal} onSelectRoutine={(routinesDialog?: Dynamic, ..._extraArguments: unknown[]): undefined => {
  let filteredRows: Dynamic = (rows ?? []).filter((row2?: Dynamic, ..._extraArguments: unknown[]) => row2.name === routinesDialog);
  onDrillChange({
    kind: `routine`,
    ref: (filteredRows.length === 1 ? filteredRows[0] : undefined)?.id ?? routinesDialog
  });
}} key={row.id ?? row.name} />
                )
              ) : routinesDialogState7?.kind === `database` ? (
                <DatabaseDetail pid={pid} dbId={routinesDialogState7.ref} key={routinesDialogState7.ref} />
              ) : (
                <DetailMessage
                  text={
                    kind === null
                      ? `Select a routine or data source`
                      : `loading…`
                  }
                />
              )}
            </div>
          </div>
        </UiDialogsRoot.Popup>
      </UiDialogsRoot.Root>
      <React.Suspense fallback={null}>
        <SessionNavigationThen4
          review={
            routinesDialogState4 === null
              ? null
              : routinesDialogHandler(routinesDialogState4)
          }
          busy={
            routinesDialogState4 !== null &&
            routinesDialogState3 === routinesDialogState4.runId + `:approve`
          }
          onClose={(..._extraArguments: unknown[]): Dynamic =>
            setRoutinesDialogState4(null)
          }
          onApprove={(..._extraArguments: unknown[]) =>
            routinesDialogState4 !== null &&
            void error(routinesDialogState4, `approve`)
          }
          portalClassName={`z-popover`}
        />
      </React.Suspense>
    </jsxRuntime.Fragment>
  );
}

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeApplicationRoutesRoutinesDialogStep1(): void {
  (ApplicationRoutes_Styles2 = `hover:bg-alpha-1 data-[popup-open]:bg-alpha-1 text-primary flex min-w-0 cursor-pointer items-center rounded px-1 py-0.5 text-[13px] transition-colors outline-none`);
  (ApplicationRoutesPrompt = {
    prompt: `Chats`,
    tool_call: `Tool`,
    code: `Code`,
  });
}

export { HeaderPath, RoutinesDialog, useApplicationRoutesAriaLabel };
