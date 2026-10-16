/** BaoCut: session navigation from index-CX4IZqzA.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  Button,
  ContextMenu,
  Menu,
  ObservabilityBrowserAndOperationEventsHref,
  ObservabilityBrowserAndOperationEventsTitle,
  PlatformApiAndAuthUser,
  PlatformSyncAndRoutingUntitled,
  ResolvePlatformRuntimeAndChatPathComponent,
  ResolvePlatformSyncAndRoutingValue19Component,
  Tooltip,
  UiOverlaysAndIconsCustomIcon,
  apiFetcher,
  loadPlatformSessionAndSourcesAckOf,
  preloadModule,
  resolveDataContentAndReferencesError2,
  resolveDataOperationEngineLdoc,
  resolveObservabilityBrowserAndOperationEventsLastIndexOf,
  resolveObservabilityBrowserAndOperationEventsTrim,
  resolveObservabilityBrowserAndOperationEventsTrim3,
  resolvePlatformAnnouncementsValue,
  resolvePlatformChunkLoadingLazy,
  resolvePlatformLiveDocumentAndHistoryReason5,
  resolvePlatformRuntimeAndChatSplit,
  resolvePlatformSessionAndSourcesVerb4,
  resolvePlatformSyncAndRoutingCompact,
  resolvePlatformSyncAndRoutingName,
  resolvePlatformSyncAndRoutingPath3,
  resolvePlatformSyncAndRoutingPath4,
  resolvePlatformSyncAndRoutingTest2,
  resolvePlatformSyncAndRoutingVerb3,
  updatePlatformSyncAndRoutingDirectory,
  usePlatformLiveDocumentAndHistoryPid,
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
  RecoveryTextPanel,
} from "../document-recovery";
import type * as ReactComponentTypes from "react";

export const RoomDeniedScreen: ReactComponentTypes.FC<Dynamic> = ({
  goHome: roomDeniedScreen2 = true,
  frame: roomDeniedScreen3 = false,
  gone: roomDeniedScreen4 = false,
  tooLarge: roomDeniedScreen5 = false,
  pid: roomDeniedScreen,
} = {}) => {
  let roomDeniedScreenResult: Dynamic = PlatformApiAndAuthUser(
    (roomDeniedScreen6?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      roomDeniedScreen6.user?.email,
  );
  let { lines: items, dismiss: onDismiss }: Dynamic =
    usePlatformLiveDocumentAndHistoryPid(roomDeniedScreen, roomDeniedScreen4);
  let label = roomDeniedScreen3 ? `document` : `project`;
  let title = roomDeniedScreen4
    ? `This ${label} has been deleted or is no longer available.`
    : roomDeniedScreen5
      ? `This ${label} is too long to open here.`
      : roomDeniedScreen3
        ? `This document isn’t available`
        : `This project isn’t available`;
  let line = roomDeniedScreen4
    ? null
    : roomDeniedScreen5
      ? `Nothing is lost; it is just more than this view can load at once.`
      : roomDeniedScreen3
        ? `It may have been deleted, or you may no longer have access.`
        : `It may have been moved, or you may no longer have access.`;
  return (
    <div
      data-testid={`room-denied-screen`}
      data-gone={roomDeniedScreen4 ? `true` : undefined}
      data-too-large={roomDeniedScreen5 ? `true` : undefined}
      className={`bg-surface-0 flex h-full flex-col overflow-y-auto px-6`}
    >
      <div className={`my-auto flex flex-col items-center gap-3 py-6`}>
        <RoomDeniedMessage title={title} line={line} key={`${title}|${line}`} />
        {items.length > 0 && (
          <div
            className={`flex w-full max-w-xl flex-col gap-2`}
            data-testid={`room-denied-kept`}
          >
            <div
              className={`text-secondary text-center text-sm`}
            >{`Your unsaved changes are kept below.`}</div>
            <RecoveryTextPanel items={items} onDismiss={onDismiss} />
          </div>
        )}
        {roomDeniedScreenResult && (
          <div className={`text-secondary text-xs`}>
            {`Signed in as`}
            {` `}
            <span className={`text-primary font-medium`}>{roomDeniedScreenResult}</span>
          </div>
        )}
        {roomDeniedScreen2 && (
          <ObservabilityBrowserAndOperationEventsHref
            href={`/`}
            className={`bg-fill-primary hover:bg-fill-primary-hover text-on-primary mt-2 rounded-md px-4 py-1.5 text-sm`}
          >{`Go home`}</ObservabilityBrowserAndOperationEventsHref>
        )}
      </div>
    </div>
  );
};

export const RoomSigninFace: ReactComponentTypes.FC<Dynamic> = ({
  signInHref: signInHref,
  supportCode: supportCode,
}) => {
  let roomSigninFaceResult: Dynamic = resolvePlatformSyncAndRoutingCompact();
  (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    resolvePlatformLiveDocumentAndHistoryReason5(`signin`);
  }, []);
  return (
    <div
      role={`status`}
      className={`gap-md flex h-full flex-col items-center justify-center px-6`}
      data-testid={`room-signin-face`}
    >
      <UiOverlaysAndIconsCustomIcon
        name={`Lock`}
        size={`lg`}
        className={`text-secondary`}
      />
      <div className={`text-primary text-body font-medium`}>
        {ObservabilityBrowserAndOperationEventsTitle.title}
      </div>
      <div className={`text-secondary text-footnote max-w-md text-center`}>
        {ObservabilityBrowserAndOperationEventsTitle.body}
      </div>
      <Button
        size={roomSigninFaceResult(`sm`)}
        variant={`primary`}
        href={signInHref}
        target={`_top`}
        rel={`noopener noreferrer`}
        data-testid={`room-signin-link`}
      >
        {ObservabilityBrowserAndOperationEventsTitle.cta}
      </Button>
      {supportCode ? (
        <div className={`text-disabled mt-6`}>
          <SupportCodeCopyButton code={supportCode} />
        </div>
      ) : null}
    </div>
  );
};

export const FileTabNavigation: ReactComponentTypes.FC<Dynamic> = ({
  lead: lead,
  tabs: tabs,
  active: active,
  entries: entries,
  onSelect: onSelect,
  onClose: onClose,
  onCloseOthers: onCloseOthers,
  onDownloadFile: onDownloadFile,
  onSelectFilesDashboard: onSelectFilesDashboard,
  onDeleteFile: onDeleteFile,
  onRenameFile: onRenameFile,
  topicNames: topicNames,
  functions: functions,
  onRenameFolder: onRenameFolder,
  onDeleteFolder: onDeleteFolder,
  onTreeNewFolder: onTreeNewFolder,
  onTreeNewFile: onTreeNewFile,
  pendingFolder: pendingFolder,
  onCommitFolder: onCommitFolder,
  onCancelFolder: onCancelFolder,
  onMove: onMove,
  status: status,
  presence: presence,
  pinnedPaths: pinnedPaths,
  onTogglePin: onTogglePin,
  actions: actions,
  onReorder: onReorder,
  tray: tray,
  elevated: elevated,
  cosMember: cosMember,
}) => {
  let [fileTabNavigationState, setFileTabNavigationState]: Dynamic = (0, React.useState)(
    null,
  );
  let elementRef: Dynamic = (0, React.useRef)(null);
  let [fileTabNavigationState2, setFileTabNavigationState2]: Dynamic = (0,
  React.useState)(null);
  let setFileTabNavigationState3 = (
    fileTabNavigation?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    elementRef.current = fileTabNavigation;
    setFileTabNavigationState2(fileTabNavigation);
  };
  let onDragEnd = (..._extraArguments: unknown[]): undefined => {
    let fileTabNavigationState3: Dynamic = fileTabNavigationState;
    let element: Dynamic = elementRef.current;
    setFileTabNavigationState(null);
    setFileTabNavigationState3(null);
    if (fileTabNavigationState3 === null || !element || !onReorder) return;
    let total: Dynamic = element.idx + +!element.before;
    if (total > fileTabNavigationState3) {
      --total;
    }
    if (total === fileTabNavigationState3) return;
    let tabsSlice: Dynamic = tabs.slice();
    let [splice]: Dynamic = tabsSlice.splice(fileTabNavigationState3, 1);
    if (splice !== undefined) {
      tabsSlice.splice(total, 0, splice);
      onReorder(tabsSlice);
    }
  };
  return (
    <div
      className={`relative flex h-10 shrink-0 items-center gap-0.5 px-2 ${elevated ? `` : `border-strong border-b`}`}
    >
      {lead}
      {tray ? (
        <jsxRuntime.Fragment>
          {tray.leading === undefined ? (
            <div
              className={`grid shrink-0 transition-[grid-template-columns] duration-200 ease-in-out ${tray.collapsed ? `grid-cols-[1fr]` : `grid-cols-[0fr]`}`}
            >
              <div className={`overflow-hidden`}>
                <div className={cosMember ? `w-23` : `w-16`} />
              </div>
            </div>
          ) : (
            tray.leading
          )}
          {tray.path}
          <div className={`min-w-0 flex-1`} />
          {tray.trailing}
        </jsxRuntime.Fragment>
      ) : (
        <jsxRuntime.Fragment>
          <ResolvePlatformSyncAndRoutingValue19Component
            entries={entries}
            activePath={active}
            onPick={onSelect}
            active={!active}
            onClick={onSelectFilesDashboard}
            onDeleteFile={onDeleteFile}
            onRenameFile={onRenameFile}
            onDownload={onDownloadFile}
            onRenameFolder={onRenameFolder}
            onDeleteFolder={onDeleteFolder}
            onNewFolder={onTreeNewFolder}
            onNewFile={onTreeNewFile}
            pendingFolder={pendingFolder}
            onCommitFolder={onCommitFolder}
            onCancelFolder={onCancelFolder}
            onMove={onMove}
            status={status}
            presence={presence}
            pinnedPaths={pinnedPaths}
            onTogglePin={onTogglePin}
            topicNames={topicNames}
            functions={functions}
          />
          <div
            role={`tablist`}
            aria-label={`Open files`}
            className={`no-scrollbar flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto`}
          >
            {tabs.map((path?: Dynamic, idx?: Dynamic, ..._extraArguments: unknown[]) => (
              <FileTabNavigationItem
                path={path}
                active={path === active}
                onSelect={(..._extraArguments: unknown[]): Dynamic => onSelect(path)}
                onClose={(..._extraArguments: unknown[]): Dynamic => onClose(path)}
                onCloseOthers={
                  tabs.length > 1
                    ? (..._extraArguments: unknown[]): Dynamic => onCloseOthers?.(path)
                    : undefined
                }
                onRename={onRenameFile}
                onDownload={
                  onDownloadFile
                    ? (..._extraArguments: unknown[]): Dynamic => onDownloadFile(path)
                    : undefined
                }
                onDelete={
                  onDeleteFile
                    ? (..._extraArguments: unknown[]): Dynamic => onDeleteFile(path)
                    : undefined
                }
                dnd={
                  onReorder
                    ? {
                        dragging: fileTabNavigationState === idx,
                        drop:
                          fileTabNavigationState2?.idx === idx &&
                          fileTabNavigationState !== null
                            ? fileTabNavigationState2.before
                              ? `before`
                              : `after`
                            : null,
                        onDragStart: (
                          fileTabNavigation?: Dynamic,
                          ..._extraArguments: unknown[]
                        ): undefined => {
                          fileTabNavigation.dataTransfer.setData(`text/plain`, path);
                          fileTabNavigation.dataTransfer.effectAllowed = `move`;
                          setFileTabNavigationState(idx);
                        },
                        onDragOver: (
                          event?: Dynamic,
                          ..._extraArguments: unknown[]
                        ): undefined => {
                          if (fileTabNavigationState === null) return;
                          event.preventDefault();
                          event.dataTransfer.dropEffect = `move`;
                          let currentTargetBounds: Dynamic =
                            event.currentTarget.getBoundingClientRect();
                          let before =
                            event.clientX <
                            currentTargetBounds.left + currentTargetBounds.width / 2;
                          let element: Dynamic = elementRef.current;
                          if (
                            !element ||
                            element.idx !== idx ||
                            element.before !== before
                          ) {
                            setFileTabNavigationState3({
                              idx: idx,
                              before: before,
                            });
                          }
                        },
                        onDragEnd: onDragEnd,
                      }
                    : undefined
                }
                key={path}
              />
            ))}
          </div>
        </jsxRuntime.Fragment>
      )}
      {actions && (
        <div className={`ml-auto flex shrink-0 items-center gap-2.5 pl-2`}>{actions}</div>
      )}
    </div>
  );
};

export const FileTabNavigationItem: ReactComponentTypes.FC<Dynamic> = ({
  path: path,
  active: active,
  onSelect: onSelect,
  onClose: onClose,
  onCloseOthers: onCloseOthers,
  onRename: onRename,
  onDownload: onDownload,
  onDelete: onDelete,
  dnd: dnd,
}) => {
  let [enabledState, setEnabledState]: Dynamic = (0, React.useState)(false);
  let [enabledState2, setEnabledState2]: Dynamic = (0, React.useState)(false);
  let elementRef: Dynamic = (0, React.useRef)(null);
  let pop: Dynamic = path.split(`/`).pop() || path;
  let pathSlice: Dynamic = path.slice(0, path.length - pop.length);
  let defaultValue: Dynamic = resolvePlatformRuntimeAndChatSplit(pop);
  let Item: Dynamic = resolveObservabilityBrowserAndOperationEventsLastIndexOf(pop)[1];
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (active) {
        elementRef.current?.scrollIntoView({
          inline: `nearest`,
          block: `nearest`,
        });
      }
    },
    [active],
  );
  let onRename2 = (
    fileTabNavigationItem?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    setEnabledState2(false);
    let fileTabNavigationItemResult: Dynamic =
      resolveObservabilityBrowserAndOperationEventsTrim(fileTabNavigationItem);
    if (!(!fileTabNavigationItemResult || fileTabNavigationItemResult === defaultValue)) {
      onRename?.(path, pathSlice + fileTabNavigationItemResult + Item);
    }
  };
  let drop: Dynamic = dnd?.drop;
  let render = (
    <div
      ref={elementRef}
      role={`tab`}
      tabIndex={0}
      aria-selected={active}
      draggable={!!dnd && !enabledState2}
      onDragStart={dnd && !enabledState2 ? dnd.onDragStart : undefined}
      onDragOver={dnd?.onDragOver}
      onDragEnd={dnd?.onDragEnd}
      onClick={enabledState2 ? undefined : onSelect}
      onDoubleClick={
        onRename
          ? (..._extraArguments: unknown[]): Dynamic => setEnabledState2(true)
          : undefined
      }
      onKeyDown={(event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        if (!(enabledState2 || event.target !== event.currentTarget)) {
          if (event.key === `Enter` || event.key === ` `) {
            event.preventDefault();
            onSelect();
          }
        }
      }}
      onMouseEnter={(..._extraArguments: unknown[]): Dynamic => setEnabledState(true)}
      onMouseLeave={(..._extraArguments: unknown[]): Dynamic => setEnabledState(false)}
      data-path={path}
      className={`group flex h-7 max-w-[180px] shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-2.5 text-[12.5px] transition-colors ${active ? `bg-surface-1 text-primary font-semibold` : `text-secondary hover:bg-alpha-1 hover:text-primary font-normal`} ${dnd?.dragging ? `opacity-40` : ``}`}
      style={
        drop
          ? {
              boxShadow: `${drop === `before` ? `-2px` : `2px`} 0 0 0 var(--cds-fill-brand)`,
            }
          : undefined
      }
    >
      <ResolvePlatformRuntimeAndChatPathComponent path={path} size={12} />
      {enabledState2 ? (
        <input
          autoFocus={true}
          defaultValue={defaultValue}
          onFocus={(event?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            event.currentTarget.select()
          }
          onClick={(
            fileTabNavigationItem?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => fileTabNavigationItem.stopPropagation()}
          onBlur={(event?: Dynamic, ..._extraArguments: unknown[]) =>
            onRename2(event.currentTarget.value)
          }
          onKeyDown={(event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            if (event.key === `Enter`) {
              onRename2(event.currentTarget.value);
            } else {
              if (event.key === `Escape`) {
                setEnabledState2(false);
              }
            }
          }}
          className={`text-primary min-w-0 flex-1 bg-transparent outline-none`}
        />
      ) : (
        <Tooltip content={path} multiline={true}>
          <span className={`truncate`}>{defaultValue}</span>
        </Tooltip>
      )}
      <button
        type={`button`}
        aria-label={`Close ${defaultValue}`}
        onClick={(
          fileTabNavigationItem?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          fileTabNavigationItem.stopPropagation();
          onClose();
        }}
        className={`hover:bg-alpha-2 focus-visible:ring-strong -mr-1 ml-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded focus-visible:opacity-100 focus-visible:ring-2 focus-visible:outline-none ${enabledState || active ? `opacity-50 hover:opacity-100` : `opacity-0`} transition-opacity`}
      >
        <UiOverlaysAndIconsCustomIcon name={`X`} customSize={10} />
      </button>
    </div>
  );
  return !onRename && !onDownload && !onDelete && !onCloseOthers ? (
    render
  ) : (
    <ContextMenu.Root>
      <ContextMenu.Trigger render={render} />
      <ContextMenu.Popup finalFocus={false}>
        {onRename && (
          <UseSessionNavigationItemComponent
            onSelect={(..._extraArguments: unknown[]) =>
              requestAnimationFrame(
                (..._extraArguments: unknown[]): Dynamic => setEnabledState2(true),
              )
            }
          >{`Rename`}</UseSessionNavigationItemComponent>
        )}
        {onDownload && (
          <UseSessionNavigationItemComponent
            onSelect={onDownload}
          >{`Download`}</UseSessionNavigationItemComponent>
        )}
        {onDelete && (
          <UseSessionNavigationItemComponent
            onSelect={onDelete}
          >{`Delete`}</UseSessionNavigationItemComponent>
        )}
        <ContextMenu.Separator />
        <UseSessionNavigationItemComponent
          onSelect={onClose}
        >{`Close`}</UseSessionNavigationItemComponent>
        {onCloseOthers && (
          <UseSessionNavigationItemComponent
            onSelect={onCloseOthers}
          >{`Close others`}</UseSessionNavigationItemComponent>
        )}
      </ContextMenu.Popup>
    </ContextMenu.Root>
  );
};

export const RoomDeniedMessage: ReactComponentTypes.FC<Dynamic> = ({
  title: title,
  line: line,
}) => {
  let ariaLabelledby: Dynamic = (0, React.useId)();
  let controlId: Dynamic = (0, React.useId)();
  return (
    <div
      ref={useSessionNavigationPreventScroll(
        line === null ? title : `${title}${/[.!?]$/.test(title) ? `` : `.`} ${line}`,
      )}
      role={`group`}
      aria-labelledby={ariaLabelledby}
      aria-describedby={line === null ? undefined : controlId}
      tabIndex={-1}
      data-testid={`room-denied-message`}
      className={`focus-ring-fades -m-2 flex flex-col items-center gap-3 rounded-md p-2`}
    >
      <h1 id={ariaLabelledby} className={`text-primary text-lg font-medium`}>
        {title}
      </h1>
      {line !== null && (
        <div id={controlId} className={`text-secondary max-w-md text-center text-sm`}>
          {line}
        </div>
      )}
    </div>
  );
};

export const UseSessionNavigationItemComponent: ReactComponentTypes.FC<Dynamic> = (
  node,
) => {
  return <Menu.Item onClick={node.onSelect}>{node.children}</Menu.Item>;
};

var SessionNavigation_BongoLastTab: string;

var sessionNavigationLimit32: number;

var sessionNavigationMap: Dynamic;

var sessionNavigationState: Dynamic;

var SessionNavigationState: boolean;

function resolveSessionNavigationValue(..._extraArguments: unknown[]): Dynamic {
  if (!SessionNavigationState) {
    SessionNavigationState = true;
    try {
      sessionNavigationState ??=
        typeof sessionStorage !== "undefined" ? sessionStorage : undefined;
    } catch {
      sessionNavigationState = undefined;
    }
  }
  return sessionNavigationState;
}

var SessionNavigationState2: boolean;

function updateSessionNavigationParse(
  ..._extraArguments: unknown[]
): undefined {
  if (SessionNavigationState2) return;
  SessionNavigationState2 = true;
  let updateSessionNavigationParseResult: Dynamic = null;
  try {
    updateSessionNavigationParseResult =
      resolveSessionNavigationValue()?.getItem(
        SessionNavigation_BongoLastTab,
      ) ?? null;
  } catch {
    return;
  }
  if (!updateSessionNavigationParseResult) return;
  let updateSessionNavigationParseResult2: Dynamic;
  try {
    updateSessionNavigationParseResult2 = JSON.parse(
      updateSessionNavigationParseResult,
    );
  } catch {
    return;
  }
  if (
    !(
      !updateSessionNavigationParseResult2 ||
      typeof updateSessionNavigationParseResult2 != `object` ||
      Array.isArray(updateSessionNavigationParseResult2)
    )
  ) {
    for (let [
      updateSessionNavigationParseResult3,
      updateSessionNavigationParseResult4,
    ] of Object.entries(updateSessionNavigationParseResult2) as Dynamic)
      if (
        !(
          typeof updateSessionNavigationParseResult4 != `string` ||
          updateSessionNavigationParseResult4 === ``
        ) &&
        (sessionNavigationMap.set(
          updateSessionNavigationParseResult3,
          updateSessionNavigationParseResult4,
        ),
        sessionNavigationMap.size >= sessionNavigationLimit32)
      )
        break;
  }
}

function resolveSessionNavigationSize(
  ..._extraArguments: unknown[]
): undefined {
  let sessionNavigationValue: Dynamic = resolveSessionNavigationValue();
  if (sessionNavigationValue)
    try {
      if (sessionNavigationMap.size === 0) {
        sessionNavigationValue.removeItem(SessionNavigation_BongoLastTab);
      } else {
        sessionNavigationValue.setItem(
          SessionNavigation_BongoLastTab,
          JSON.stringify(Object.fromEntries(sessionNavigationMap)),
        );
      }
    } catch {}
}

function updateSessionNavigationDelete(
  updateSessionNavigationDelete2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (!updateSessionNavigationDelete2 || !options) return;
  updateSessionNavigationParse();
  let sessionNavigationMapEntry: Dynamic = sessionNavigationMap.get(
    updateSessionNavigationDelete2,
  );
  sessionNavigationMap.delete(updateSessionNavigationDelete2);
  sessionNavigationMap.set(updateSessionNavigationDelete2, options);
  if (sessionNavigationMap.size > sessionNavigationLimit32) {
    let value: Dynamic = sessionNavigationMap.keys().next().value;
    if (value !== undefined) {
      sessionNavigationMap.delete(value);
    }
  }
  if (sessionNavigationMapEntry !== options) {
    resolveSessionNavigationSize();
  }
}

function getSessionNavigationValue(
  sessionNavigationValue?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  updateSessionNavigationParse();
  return sessionNavigationMap.get(sessionNavigationValue);
}

var SessionNavigationState3: string[];

function resolveSessionNavigationTrim(
  sessionNavigationTrim?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let trimmedSessionNavigationTrim: Dynamic = (
    sessionNavigationTrim ?? ``
  ).trim();
  return (
    trimmedSessionNavigationTrim === `` ||
    SessionNavigationState3.includes(trimmedSessionNavigationTrim)
  );
}

function getSessionNavigationFileId(
  sessionNavigationFileId?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    sessionNavigationFileId.fileId === undefined ||
    sessionNavigationFileId.placement.size !== 1
  )
    return;
  let placementEntry: Dynamic = sessionNavigationFileId.placement.get(
    sessionNavigationFileId.fileId,
  );
  return placementEntry !== undefined &&
    resolveSessionNavigationTrim(placementEntry.name)
    ? sessionNavigationFileId.fileId
    : undefined;
}

function resolveSessionNavigationProjectName(
  sessionNavigationProjectName?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return resolveSessionNavigationTrim(sessionNavigationProjectName.projectName);
}

function getSessionNavigationHalf(
  sessionNavigationHalf?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!sessionNavigationHalf.canRename) return null;
  let name: Dynamic = resolveObservabilityBrowserAndOperationEventsTrim3(
    sessionNavigationHalf.title,
  );
  if (name === `` || resolveSessionNavigationTrim(name)) return null;
  let writes: Dynamic = [];
  let tabId: Dynamic = getSessionNavigationFileId(sessionNavigationHalf);
  if (tabId !== undefined) {
    let placementEntry: Dynamic =
      sessionNavigationHalf.placement.get(tabId) ?? {};
    writes.push({
      half: `tab`,
      patch: resolvePlatformSyncAndRoutingPath3(
        tabId,
        resolvePlatformSyncAndRoutingName(placementEntry, name),
      ),
    });
  }
  let doc = resolveSessionNavigationProjectName(sessionNavigationHalf);
  if (doc) {
    writes.push({
      half: `doc`,
      patch: resolvePlatformSyncAndRoutingPath4(name),
    });
  }
  return writes.length === 0
    ? null
    : {
        name: name,
        tabId: tabId,
        doc: doc,
        writes: writes,
      };
}

function isSessionNavigationTabId(
  sessionNavigationTabId?: Dynamic,
  options: Dynamic = new (Set as Dynamic)(),
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    !sessionNavigationTabId.canRename ||
    sessionNavigationTabId.fileId === undefined ||
    sessionNavigationTabId.was === undefined ||
    sessionNavigationTabId.placement.size < 2
  )
    return null;
  let placementEntry: Dynamic = sessionNavigationTabId.placement.get(
    sessionNavigationTabId.fileId,
  );
  if (placementEntry === undefined) return null;
  let name: Dynamic = resolveObservabilityBrowserAndOperationEventsTrim3(
    sessionNavigationTabId.title,
  );
  if (
    name === `` ||
    resolveSessionNavigationTrim(name) ||
    name ===
      resolveObservabilityBrowserAndOperationEventsTrim3(
        sessionNavigationTabId.was,
      )
  )
    return null;
  let from: Dynamic = resolveObservabilityBrowserAndOperationEventsTrim3(
    placementEntry.name ?? ``,
  );
  if (name === from) return null;
  let matchesWas: Dynamic =
    sessionNavigationTabId.was === `` &&
    resolvePlatformSyncAndRoutingTest2(placementEntry.name);
  let hasFrom: Dynamic = options.has(from);
  return !matchesWas && !hasFrom
    ? null
    : {
        tabId: sessionNavigationTabId.fileId,
        name: name,
        from: from,
        patch: resolvePlatformSyncAndRoutingPath3(
          sessionNavigationTabId.fileId,
          resolvePlatformSyncAndRoutingName(placementEntry, name),
        ),
      };
}

var sessionNavigationLimit2000: number;

var loadSessionNavigationVerdict: Dynamic;

var resolveSessionNavigationValue2: Dynamic;

var sessionNavigationSet: Dynamic;

function isSessionNavigationVerdict(
  response?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (response.verdict === `allow`) return false;
  if (response.reason !== `unavailable`) return true;
  let data: Dynamic = response.data;
  let why: Dynamic = typeof data == `object` && data ? data.why : undefined;
  return typeof why == `string` && sessionNavigationSet.has(why);
}

function createFilePlacementWaiter(
  filePlacementWaiter?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let readPlacement: Dynamic =
    filePlacementWaiter.readPlacement ?? loadSessionNavigationVerdict;
  let now: Dynamic = filePlacementWaiter.now ?? Date.now;
  let sleep: Dynamic =
    filePlacementWaiter.sleep ??
    ((filePlacementWaiter2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      new (Promise as Dynamic)(
        (resolve?: Dynamic, ..._extraArguments: unknown[]) =>
          setTimeout(resolve, filePlacementWaiter2),
      ));
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let createFilePlacementWaiterHandler = (
    filePlacementWaiter2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `${options} ${filePlacementWaiter2}`;
  let warn: Dynamic = async (
    filePlacementWaiter2?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    try {
      let post: Dynamic = await filePlacementWaiter.post(
        filePlacementWaiter2,
        context,
      );
      return post.verdict === `allow`
        ? `allow`
        : (console.warn(
            `[name-from-title] ${options} not named:`,
            post.reason ?? `deny`,
          ),
          isSessionNavigationVerdict(post) ? `ruling` : `moment`);
    } catch (createFilePlacementWaiterResult: Dynamic) {
      console.warn(
        `[name-from-title] ${options} not named:`,
        resolveDataContentAndReferencesError2(createFilePlacementWaiterResult),
      );
      return `lost`;
    }
  };
  let createFilePlacementWaiterHandler2 = async (
    filePlacementWaiter2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let warn2: Dynamic = await warn(
      filePlacementWaiter2,
      options.half,
      options.patch,
    );
    if (warn2 === `moment` || warn2 === `lost`) {
      uniqueItems.delete(
        createFilePlacementWaiterHandler(filePlacementWaiter2, options.half),
      );
    }
    return warn2 === `allow`;
  };
  let lookup: Dynamic = new (Map as Dynamic)();
  let createFilePlacementWaiterHandler3: Dynamic = (
    filePlacementWaiter2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    filePlacementWaiter2.was !== undefined &&
    resolveObservabilityBrowserAndOperationEventsTrim3(
      filePlacementWaiter2.was,
    ) === resolveObservabilityBrowserAndOperationEventsTrim3(options.title)
      ? {
          ...filePlacementWaiter2,
          was: options.was,
        }
      : filePlacementWaiter2;
  let slice = (
    filePlacementWaiter2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    filePlacementWaiter2.last = options;
    filePlacementWaiter2.recent = [
      ...filePlacementWaiter2.recent.filter(
        (recent?: Dynamic, ..._extraArguments: unknown[]) =>
          recent !== options.name && recent !== options.from,
      ),
      options.from,
      options.name,
    ].slice(-6);
  };
  let lookup2: Dynamic = new (Map as Dynamic)();
  let updateLast = (
    filePlacementWaiter2?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (context.last === null) return;
    let lookupEntryEntry: Dynamic = lookup2
      .get(filePlacementWaiter2)
      ?.get(options);
    if (
      lookupEntryEntry !== undefined &&
      !context.recent.includes(
        resolveObservabilityBrowserAndOperationEventsTrim3(
          lookupEntryEntry.name ?? ``,
        ),
      )
    ) {
      context.last = null;
    }
  };
  let createFilePlacementWaiterHandler4: Dynamic = (
    filePlacementWaiter2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let label = `${filePlacementWaiter2} ${options}`;
    let lookupEntry: Dynamic = lookup.get(label);
    if (lookupEntry === undefined) {
      lookupEntry = {
        busy: false,
        queued: null,
        carried: null,
        last: null,
        recent: [],
        lastAt: -1 / 0,
        tries: 0,
        stopped: false,
      };
      lookup.set(label, lookupEntry);
    }
    return lookupEntry;
  };
  let createFilePlacementWaiterHandler5: Dynamic = (
    filePlacementWaiter2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let uniqueItems2: Dynamic = new (Set as Dynamic)();
    if (filePlacementWaiter2.last !== null) {
      uniqueItems2.add(filePlacementWaiter2.last.name);
      if (!filePlacementWaiter2.last.landed) {
        uniqueItems2.add(filePlacementWaiter2.last.from);
      }
    }
    return uniqueItems2;
  };
  let updateLast2 = (
    filePlacementWaiter2?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      !(
        options === undefined ||
        filePlacementWaiter2.last === null ||
        context.has(
          resolveObservabilityBrowserAndOperationEventsTrim3(
            options.name ?? ``,
          ),
        )
      )
    ) {
      filePlacementWaiter2.last = null;
    }
  };
  let updateLast3: Dynamic = async (
    filePlacementWaiter2?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (options.fileId === undefined) return `skipped`;
    let filePlacementWaiterHandler: Dynamic = createFilePlacementWaiterHandler4(
      filePlacementWaiter2,
      options.fileId,
    );
    if (filePlacementWaiterHandler.stopped) return `skipped`;
    if (filePlacementWaiterHandler.busy) {
      filePlacementWaiterHandler.queued = options;
      return `skipped`;
    }
    filePlacementWaiterHandler.busy = true;
    let label = `skipped`;
    let createFilePlacementWaiterHandler6: Dynamic = (
      filePlacementWaiter3?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let queued: Dynamic = filePlacementWaiterHandler.queued;
      filePlacementWaiterHandler.queued = null;
      return queued === null
        ? null
        : filePlacementWaiter3
          ? queued
          : createFilePlacementWaiterHandler3(queued, options2);
    };
    try {
      let options2: Dynamic =
        filePlacementWaiterHandler.carried === null
          ? options
          : createFilePlacementWaiterHandler3(
              options,
              filePlacementWaiterHandler.carried,
            );
      filePlacementWaiterHandler.carried = null;
      await context;
      if (filePlacementWaiterHandler.queued !== null) {
        options2 = createFilePlacementWaiterHandler6(false, options2);
      }
      let createFilePlacementWaiterResult: Dynamic = null;
      for (; options2 !== null && !filePlacementWaiterHandler.stopped; ) {
        let options3: Dynamic = options2;
        let createFilePlacementWaiterHandler7: Dynamic = (
          filePlacementWaiter3?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          createFilePlacementWaiterHandler6(filePlacementWaiter3, options3);
        let createFilePlacementWaiterResult2: Dynamic =
          resolveObservabilityBrowserAndOperationEventsTrim3(options3.title);
        if (
          !options3.canRename ||
          options3.was === undefined ||
          createFilePlacementWaiterResult2 === `` ||
          resolveSessionNavigationTrim(createFilePlacementWaiterResult2)
        ) {
          options2 = createFilePlacementWaiterHandler7(false);
          continue;
        }
        let uniqueItems2: Dynamic =
          filePlacementWaiterHandler.last === null
            ? new (Set as Dynamic)()
            : new (Set as Dynamic)([
                filePlacementWaiterHandler.last.name,
                filePlacementWaiterHandler.last.from,
              ]);
        let placement: Dynamic =
          createFilePlacementWaiterResult ?? options3.placement;
        let placementEntry: Dynamic = placement.get(options3.fileId);
        let createFilePlacementWaiterResult3: Dynamic =
          placementEntry === undefined
            ? null
            : resolveObservabilityBrowserAndOperationEventsTrim3(
                placementEntry.name ?? ``,
              );
        if (
          !(placementEntry === undefined
            ? options3.was === `` || filePlacementWaiterHandler.last !== null
            : !(placement.size < 2) &&
              (isSessionNavigationTabId(
                {
                  ...options3,
                  placement: placement,
                },
                uniqueItems2,
              ) !== null ||
                (filePlacementWaiterHandler.last !== null &&
                  ((filePlacementWaiterHandler.last.landed &&
                    createFilePlacementWaiterResult2 !==
                      filePlacementWaiterHandler.last.name) ||
                    !uniqueItems2.has(createFilePlacementWaiterResult3)))))
        ) {
          options2 = createFilePlacementWaiterHandler7(false);
          continue;
        }
        let difference: number =
          filePlacementWaiterHandler.lastAt +
          sessionNavigationLimit2000 -
          now();
        if (
          difference > 0 &&
          (await sleep(difference), filePlacementWaiterHandler.queued !== null)
        ) {
          options2 = createFilePlacementWaiterHandler7(false);
          continue;
        }
        filePlacementWaiterHandler.lastAt = now();
        filePlacementWaiterHandler.tries += 1;
        if (filePlacementWaiterHandler.tries >= 20) {
          filePlacementWaiterHandler.stopped = true;
        }
        let placement2: Dynamic = null;
        try {
          placement2 = await readPlacement(filePlacementWaiter2);
        } catch (createFilePlacementWaiterResult4: Dynamic) {
          console.warn(
            `[name-from-title] tab not renamed from its title, could not read the page's tabs:`,
            resolveDataContentAndReferencesError2(
              createFilePlacementWaiterResult4,
            ),
          );
        }
        if (placement2 === null) {
          if (filePlacementWaiterHandler.queued === null) {
            filePlacementWaiterHandler.carried = options3;
          }
          options2 = createFilePlacementWaiterHandler7(false);
          continue;
        }
        createFilePlacementWaiterResult = placement2;
        updateLast2(
          filePlacementWaiterHandler,
          placement2.get(options3.fileId),
          createFilePlacementWaiterHandler5(filePlacementWaiterHandler),
        );
        let isSessionNavigationTabId2: Dynamic = isSessionNavigationTabId(
          {
            ...options3,
            placement: placement2,
          },
          createFilePlacementWaiterHandler5(filePlacementWaiterHandler),
        );
        if (isSessionNavigationTabId2 !== null) {
          let warn2: Dynamic = await warn(
            filePlacementWaiter2,
            `tab (following its title)`,
            isSessionNavigationTabId2.patch,
          );
          if (warn2 === `ruling`) {
            filePlacementWaiterHandler.stopped = true;
          }
          let landed =
            warn2 === `allow` ||
            (warn2 === `lost` &&
              !resolvePlatformSyncAndRoutingTest2(
                isSessionNavigationTabId2.from,
              ));
          if (warn2 === `ruling`) {
            filePlacementWaiterHandler.last = null;
          } else {
            if (warn2 === `moment`) {
              slice(filePlacementWaiterHandler, {
                name: isSessionNavigationTabId2.from,
                from: isSessionNavigationTabId2.from,
                landed: true,
              });
            } else {
              slice(filePlacementWaiterHandler, {
                name: isSessionNavigationTabId2.name,
                from: isSessionNavigationTabId2.from,
                landed: landed,
              });
            }
          }
          if (warn2 === `allow`) {
            label = `named`;
          } else {
            if (label === `skipped`) {
              label = `failed`;
            }
          }
        }
        options2 = createFilePlacementWaiterHandler7(
          isSessionNavigationTabId2 !== null,
        );
      }
    } finally {
      filePlacementWaiterHandler.busy = false;
      filePlacementWaiterHandler.queued = null;
      updateLast(
        filePlacementWaiter2,
        options.fileId,
        filePlacementWaiterHandler,
      );
    }
    return label;
  };
  return Object.assign(
    async (
      items?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) => {
      if (items.length === 0) return `skipped`;
      let sessionNavigationHalf: Dynamic = getSessionNavigationHalf(options);
      let items2: Dynamic =
        sessionNavigationHalf === null
          ? []
          : sessionNavigationHalf.writes.filter(
              (write?: Dynamic, ..._extraArguments: unknown[]) =>
                !uniqueItems.has(
                  createFilePlacementWaiterHandler(items, write.half),
                ),
            );
      for (let createFilePlacementWaiterResult3 of items2 as Dynamic)
        uniqueItems.add(
          createFilePlacementWaiterHandler(
            items,
            createFilePlacementWaiterResult3.half,
          ),
        );
      let createFilePlacementWaiterResult: Dynamic = (async (
        ..._extraArguments: unknown[]
      ): Promise<Dynamic> => {
        let enabled: boolean = false;
        for (let createFilePlacementWaiterResult3 of items2 as Dynamic) {
          let filePlacementWaiterHandler =
            await createFilePlacementWaiterHandler2(
              items,
              createFilePlacementWaiterResult3,
            );
          if (
            filePlacementWaiterHandler &&
            createFilePlacementWaiterResult3.half === `tab` &&
            sessionNavigationHalf.tabId !== undefined
          ) {
            let from: Dynamic =
              resolveObservabilityBrowserAndOperationEventsTrim3(
                options.placement.get(sessionNavigationHalf.tabId)?.name ?? ``,
              );
            slice(
              createFilePlacementWaiterHandler4(
                items,
                sessionNavigationHalf.tabId,
              ),
              {
                name: sessionNavigationHalf.name,
                from: from,
                landed: true,
              },
            );
          }
          enabled = filePlacementWaiterHandler || enabled;
        }
        return enabled;
      })();
      let updateLast4: Dynamic = await updateLast3(
        items,
        options,
        createFilePlacementWaiterResult,
      );
      let createFilePlacementWaiterResult2: Dynamic =
        (await createFilePlacementWaiterResult) || updateLast4 === `named`;
      return items2.length === 0 && updateLast4 === `skipped`
        ? `skipped`
        : createFilePlacementWaiterResult2
          ? (filePlacementWaiter.onNamed?.(items), `named`)
          : `failed`;
    },
    {
      observe: (
        items?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        lookup2.set(items, options);
        for (let [
          createFilePlacementWaiterResult,
          createFilePlacementWaiterResult2,
        ] of lookup as Dynamic)
          if (createFilePlacementWaiterResult.startsWith(items + ` `)) {
            updateLast(
              items,
              createFilePlacementWaiterResult.slice(items.length + 1),
              createFilePlacementWaiterResult2,
            );
          }
      },
    },
  );
}

function useSessionNavigationPreventScroll(
  sessionNavigationPreventScroll?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let elementRef: Dynamic = (0, React.useRef)(null);
  let elementRef2: Dynamic = (0, React.useRef)(undefined);
  if (elementRef2.current === undefined) {
    elementRef2.current =
      typeof document !== "undefined" && document.hasFocus()
        ? document.activeElement
        : null;
  }
  let sessionNavigationPreventScrollRef: Dynamic = (0, React.useRef)(
    sessionNavigationPreventScroll,
  );
  let enabledRef: Dynamic = (0, React.useRef)(false);
  (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    if (enabledRef.current) return;
    enabledRef.current = true;
    let element: Dynamic = elementRef2.current ?? null;
    elementRef2.current = null;
    let element2: Dynamic = elementRef.current;
    let activeElement = document.activeElement;
    if (
      !(
        element2 !== null &&
        element !== null &&
        !element.isConnected &&
        (activeElement === null || activeElement === document.body) &&
        (element2.focus({
          preventScroll: true,
          focusVisible: true,
        }),
        document.activeElement === element2)
      )
    ) {
      resolvePlatformAnnouncementsValue(
        document,
        sessionNavigationPreventScrollRef.current,
        {
          assertive: true,
          key: `room-denied`,
        },
      );
    }
  }, []);
  return elementRef;
}

function resolveSessionNavigationBirthName(
  sessionNavigationBirthName?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let sessionNavigationBirthName2: Dynamic = sessionNavigationBirthName;
  let birthName: Dynamic = sessionNavigationBirthName2?.birthName ?? ``;
  let content: Dynamic = sessionNavigationBirthName2?.content;
  return {
    birthName: birthName,
    content: content,
    ...(content?.kind === undefined &&
    resolveDataOperationEngineLdoc(birthName) !== `iron`
      ? {
          unbound: true,
        }
      : {}),
  };
}

function resolveSessionNavigationContent(
  node?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (node !== undefined) {
    if (node.content?.kind === `blob`) return `blob`;
    if (resolveDataOperationEngineLdoc(node.birthName) === `iron`)
      return `sheet`;
    if (node.content?.kind === `text`) return `text`;
    if (!node.unbound) return `prose`;
  }
}

function resolveSessionNavigationFilmed(
  sessionNavigationFilmed?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    resolveSessionNavigationContent(sessionNavigationFilmed) === `prose` &&
    !options.filmed &&
    !(options.frame && sessionNavigationFilmed?.unported === true)
  );
}

function resolveSessionNavigationValue3(
  ..._extraArguments: unknown[]
): Dynamic {
  let index = 0;
  let count: number = 0;
  return {
    issue(
      sessionNavigationValue3: Dynamic = false,
      ..._extraArguments: unknown[]
    ): number {
      let resolveSessionNavigationValue3Result: number = ++index;
      if (sessionNavigationValue3) {
        count = resolveSessionNavigationValue3Result - 1;
      }
      return resolveSessionNavigationValue3Result;
    },
    land(sessionNavigationValue3?: Dynamic, ..._extraArguments: unknown[]) {
      return sessionNavigationValue3 <= count
        ? false
        : ((count = sessionNavigationValue3), true);
    },
  };
}

// BaoCut: 空标签页的提示称「the agent」，不称 Claude。
var SessionNavigationTitle: {
    title: string;
    body: string;
};

var sessionNavigationLimit3000: number;

function isSessionNavigationKind(
  entry?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  switch (entry.kind) {
    case `envelope`:
      return entry.envelope.diff.some(
        (diff?: Dynamic, ..._extraArguments: unknown[]) =>
          resolveSessionNavigationAddress(diff, `file`, options),
      );
    case `live`:
    case `recovered`:
      return true;
    default:
      return false;
  }
}

function resolveSessionNavigationAddress(
  sessionNavigationAddress?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let ref: Dynamic = sessionNavigationAddress.address?.ref;
  return ref?.object === options && ref.id === context;
}

function resolveSessionNavigationFrame(
  sessionNavigationFrame?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return sessionNavigationFrame.frame
    ? sessionNavigationFrame.snapshotReady
      ? sessionNavigationFrame.snapshotHead === undefined
        ? `door`
        : `snapshot`
      : `wait`
    : `door`;
}

var resolveSessionNavigationThen: Dynamic;

var resolveSessionNavigationThen2: Dynamic;

var resolveSessionNavigationThen3: Dynamic;

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeSessionNavigationCreateFilePlacementWaiterStep1(): void {
  (SessionNavigation_BongoLastTab = `bongo.last-tab`);
  (sessionNavigationLimit32 = 32);
  (sessionNavigationMap = new (Map as Dynamic)());
  (SessionNavigationState = false);
  (SessionNavigationState2 = false);
  (SessionNavigationState3 = [
    PlatformSyncAndRoutingUntitled,
    `Untitled document`,
  ]);
  (sessionNavigationLimit2000 = 2e3);
  (loadSessionNavigationVerdict = async (
    sessionNavigationVerdict?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<Dynamic> => {
    let response: Dynamic = await loadPlatformSessionAndSourcesAckOf(
      sessionNavigationVerdict,
      resolvePlatformSessionAndSourcesVerb4(sessionNavigationVerdict),
      apiFetcher,
    );
    return response.verdict === `allow` && response.value !== undefined
      ? updatePlatformSyncAndRoutingDirectory(response.value)
      : null;
  });
  (resolveSessionNavigationValue2 = (
    sessionNavigationValue2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    loadPlatformSessionAndSourcesAckOf(
      sessionNavigationValue2,
      resolvePlatformSyncAndRoutingVerb3(sessionNavigationValue2, options),
      apiFetcher,
    ));
  (sessionNavigationSet = new (Set as Dynamic)([
    `engine`,
    `artifact_road`,
  ]));
  (SessionNavigationTitle = {
    title: `This tab doesn’t have any content yet`,
    body: `If the agent is still setting up this document, the tab’s contents will appear here when they’re ready.`,
  });
  (sessionNavigationLimit3000 = 3e3);
  (resolveSessionNavigationThen = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    preloadModule(
      (..._extraArguments: unknown[]): Dynamic =>
        import("../../platform/index").then(
          (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => result.PlatformApiAndAuthCodeModal,
        ),
      mapPreloadDependencies([0, 1, 2, 3]),
      import.meta.url,
    ));
  resolvePlatformChunkLoadingLazy(
    (..._extraArguments: unknown[]): Dynamic =>
      resolveSessionNavigationThen().then(
        (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
          default: result.SheetEditor,
        }),
      ),
  );
  (resolveSessionNavigationThen2 = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    preloadModule(
      (..._extraArguments: unknown[]): Dynamic =>
        import("../../platform/index").then(
          (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => result.PlatformApiAndAuthCodeModal,
        ),
      mapPreloadDependencies([0, 1, 2, 3]),
      import.meta.url,
    ));
  resolvePlatformChunkLoadingLazy(
    (..._extraArguments: unknown[]): Dynamic =>
      resolveSessionNavigationThen2().then(
        (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
          default: result.DocxEditor,
        }),
      ),
  );
  (resolveSessionNavigationThen3 = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    preloadModule(
      (..._extraArguments: unknown[]): Dynamic =>
        import("../../platform/index").then(
          (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => result.PlatformApiAndAuthCodeModal,
        ),
      mapPreloadDependencies([0, 1, 2, 3]),
      import.meta.url,
    ));
}

export { SessionNavigationTitle, createFilePlacementWaiter, getSessionNavigationValue, isSessionNavigationKind, resolveSessionNavigationBirthName, resolveSessionNavigationContent, resolveSessionNavigationFilmed, resolveSessionNavigationFrame, resolveSessionNavigationThen3, resolveSessionNavigationValue2, resolveSessionNavigationValue3, sessionNavigationLimit3000, updateSessionNavigationDelete };
