/** BaoCut: ask cards from index-CX4IZqzA.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  Button,
  Collapsible,
  EditorExtensionsAskClaude,
  Menu,
  Popover,
  Tooltip,
  UiDialogsRoot,
  UiOverlaysAndIconsCustomIcon,
  api,
  apiFetcher,
  loadPlatformSessionAndSourcesAckOf,
  preloadModule,
  resolveCommentsActionsAndSelectionBlobId,
  resolveCommentsActionsAndSelectionKind2,
  resolveCommentsActionsAndSelectionKind3,
  resolveCommentsActionsAndSelectionValue4,
  resolveCommentsActionsAndSelectionValue5,
  resolveCommentsStoreNode,
  resolvePlatformApiAndAuthUseContext2,
  resolvePlatformChunkLoadingLazy,
  resolvePlatformSyncAndRoutingCompact,
  updateDataModelSchemasPath,
  usePlatformSyncAndRoutingUseSyncExternalStore,
} from "../dependencies";
import {
  React,
  jsxRuntime,
  mapPreloadDependencies,
} from "../bootstrap";
import {
  ReactDom,
} from "../connection-and-errors/connector-permission-dialog";
import {
  PhoneDialogPopup,
} from "../phone-overlays/export-progress-dialog";
import {
  DESKTOP_HOVER_QUERY,
  ReactionPicker,
  SELECTION_ACTIONS_GAP,
  SELECTION_ACTIONS_INNER_STYLE,
  SELECTION_ACTIONS_PADDING,
  SELECTION_ACTIONS_RADIUS,
  isExternalSelectionTarget,
  selectionActionsPlacement,
} from "./document-posture-badge";
import {
  SourceValuePreview,
  TargetDataRows,
} from "./target-data-rows";

function SelectionActionsBar(
  {
    selection: selection,
    anchor: anchor,
    onClose: onClose,
    onPressOutside: onPressOutside,
    onComment: onComment,
    onReact: onReact,
    onAskClaude: onAskClaude,
    onTrackSource: onTrackSource,
    onViewData: onViewData,
    canShowData: canShowData,
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let anchor2: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      anchor
        ? {
            getBoundingClientRect: (..._extraArguments: unknown[]): Dynamic =>
              new (DOMRect as Dynamic)(
                anchor.x,
                anchor.y,
                anchor.w ?? 1,
                anchor.h ?? 1,
              ),
          }
        : null,
    [anchor],
  );
  let matchesSelection = selection !== null && anchor2 !== null;
  let [selectionActionsBarState, setSelectionActionsBarState]: Dynamic = (0,
  React.useState)(null);
  let open =
    matchesSelection &&
    selectionActionsBarState !== null &&
    selectionActionsBarState === anchor;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!open) return;
      let onClose2: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
        onClose();
      window.addEventListener(`blur`, onClose2);
      return (..._extraArguments: unknown[]) =>
        window.removeEventListener(`blur`, onClose2);
    },
    [open, onClose],
  );
  let matchesOnTrackSource =
    onTrackSource !== undefined &&
    selection !== null &&
    isExternalSelectionTarget(selection);
  let matchesOnViewData =
    onViewData !== undefined && selection !== null && canShowData === true;
  let enabled =
    !matchesOnTrackSource &&
    !matchesOnViewData &&
    onComment === undefined &&
    onReact === undefined &&
    onAskClaude === undefined;
  let matchesOnAskClaude =
    onAskClaude !== undefined ||
    onComment !== undefined ||
    onReact !== undefined;
  let matchesOnTrackSource2 =
    (matchesOnTrackSource || matchesOnViewData) && matchesOnAskClaude;
  let matchesOnViewData2 =
    matchesOnViewData && !matchesOnTrackSource && !matchesOnAskClaude;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (matchesSelection && enabled) {
        onClose();
      }
    },
    [matchesSelection, enabled, onClose],
  );
  let selectionActionsBarResult: Dynamic =
    usePlatformSyncAndRoutingUseSyncExternalStore(DESKTOP_HOVER_QUERY);
  let selectionActionsBarResult2: Dynamic =
    resolvePlatformSyncAndRoutingCompact();
  let initialFocus: Dynamic = (0, React.useRef)(null);
  let elementRef: Dynamic = (0, React.useRef)(null);
  let open2 = matchesSelection && !enabled && !open;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!selectionActionsBarResult || !open2) return;
      let contains = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let initialFocus2: Dynamic = initialFocus.current;
        let closest: Dynamic =
          initialFocus2?.closest(`[data-testid='selection-actions-bar']`) ??
          initialFocus2;
        if (
          !(
            closest == null ||
            (event.target instanceof Node && closest.contains(event.target))
          )
        ) {
          if (event.button === 2) {
            (0, ReactDom.flushSync)(onClose);
          } else {
            if (event.button === 0) {
              onPressOutside?.({
                x: event.clientX,
                y: event.clientY,
              });
            }
          }
        }
      };
      window.addEventListener(`pointerdown`, contains, true);
      return (..._extraArguments: unknown[]) =>
        window.removeEventListener(`pointerdown`, contains, true);
    },
    [selectionActionsBarResult, open2, onClose, onPressOutside],
  );
  let selectionActionsBarHandler: Dynamic = (
    name?: Dynamic,
    ..._extraArguments: unknown[]
  ) => (
    <UiOverlaysAndIconsCustomIcon
      name={name}
      customSize={SELECTION_ACTIONS_PADDING}
    />
  );
  let items: Dynamic = [];
  if (matchesOnTrackSource) {
    items.push({
      key: `track`,
      label: `Track source`,
      icon: selectionActionsBarHandler(`Link`),
      worded: true,
      run: (..._extraArguments: unknown[]): Dynamic =>
        selection && onTrackSource?.(selection),
    });
  }
  if (matchesOnViewData) {
    items.push({
      key: `data`,
      label: `View data`,
      icon: selectionActionsBarHandler(`Table`),
      worded: true,
      ...(matchesOnViewData2
        ? {}
        : {
            quiet: true,
          }),
      run: (..._extraArguments: unknown[]): Dynamic =>
        selection && onViewData?.(selection),
    });
  }
  if (onAskClaude) {
    items.push({
      key: `ask`,
      label: EditorExtensionsAskClaude.askClaude.label,
      icon: null,
      worded: true,
      run: (..._extraArguments: unknown[]): Dynamic =>
        selection && onAskClaude(selection),
    });
  }
  if (onComment) {
    items.push({
      key: `comment`,
      label: EditorExtensionsAskClaude.comment.label,
      icon: selectionActionsBarHandler(`ChatAdd`),
      worded: false,
      run: (..._extraArguments: unknown[]): Dynamic =>
        selection && onComment(selection),
    });
  }
  if (onReact) {
    items.push({
      key: `react`,
      label: EditorExtensionsAskClaude.react.label,
      icon: selectionActionsBarHandler(`SmileyAdd`),
      worded: false,
      run: (..._extraArguments: unknown[]): undefined => {
        elementRef.current =
          initialFocus.current?.getBoundingClientRect() ?? null;
        setSelectionActionsBarState(anchor);
      },
    });
  }
  let onKeyDownCapture = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (event.key === `Escape`) {
      event.preventDefault();
      event.stopPropagation();
      onClose();
    }
  };
  let onKeyDown = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      event.key !== `ArrowRight` &&
      event.key !== `ArrowLeft` &&
      event.key !== `Home` &&
      event.key !== `End`
    )
      return;
    let matchedElements: Dynamic = Array.from<Dynamic>(
      event.currentTarget.querySelectorAll(`button:not([disabled])`),
    );
    if (matchedElements.length === 0) return;
    let matchedElementIndex: Dynamic = matchedElements.indexOf(
      event.currentTarget.ownerDocument.activeElement,
    );
    let count: number =
      event.key === `Home`
        ? 0
        : event.key === `End`
          ? matchedElements.length - 1
          : event.key === `ArrowRight`
            ? (matchedElementIndex + 1) % matchedElements.length
            : matchedElementIndex <= 0
              ? matchedElements.length - 1
              : matchedElementIndex - 1;
    event.preventDefault();
    matchedElements[count]?.focus();
  };
  let selectionActionsPlacement2 = selectionActionsPlacement(anchor);
  let within: Dynamic = anchor?.within;
  let documentElement =
    typeof document === "undefined" ? null : document.documentElement;
  let collisionPadding =
    within && documentElement
      ? {
          top: SELECTION_ACTIONS_GAP,
          left: Math.max(0, within.left),
          right: Math.max(0, documentElement.clientWidth - within.right),
          bottom: SELECTION_ACTIONS_GAP,
        }
      : undefined;
  return (
    <jsxRuntime.Fragment>
      <Menu.Root
        open={
          matchesSelection && !enabled && !open && !selectionActionsBarResult
        }
        onOpenChange={(
          selectionActionsBar?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (!selectionActionsBar) {
            onClose();
          }
        }}
      >
        <Menu.Popup
          anchor={anchor2}
          side={`bottom`}
          align={`start`}
          sideOffset={4}
          finalFocus={open ? false : undefined}
        >
          {matchesOnTrackSource && (
            <Menu.Item
              onClick={(..._extraArguments: unknown[]): undefined => {
                if (selection) {
                  onTrackSource?.(selection);
                }
              }}
            >{`Track source`}</Menu.Item>
          )}
          {matchesOnViewData && (
            <Menu.Item
              onClick={(..._extraArguments: unknown[]): undefined => {
                if (selection) {
                  onViewData?.(selection);
                }
              }}
            >{`View data`}</Menu.Item>
          )}
          {matchesOnTrackSource2 && <Menu.Separator />}
          {onAskClaude && (
            <Menu.Item
              onClick={(..._extraArguments: unknown[]): undefined => {
                if (selection) {
                  onAskClaude(selection);
                }
              }}
            >
              {EditorExtensionsAskClaude.askClaude.label}
            </Menu.Item>
          )}
          {onComment && (
            <Menu.Item
              onClick={(..._extraArguments: unknown[]): undefined => {
                if (selection) {
                  onComment(selection);
                }
              }}
            >
              {EditorExtensionsAskClaude.comment.label}
            </Menu.Item>
          )}
          {onReact && (
            <Menu.Item
              keepOpen={true}
              onClick={(..._extraArguments: unknown[]): Dynamic =>
                setSelectionActionsBarState(anchor)
              }
            >
              {EditorExtensionsAskClaude.react.label}
            </Menu.Item>
          )}
        </Menu.Popup>
      </Menu.Root>
      {selectionActionsBarResult && (
        <Popover.Root
          modal={true}
          open={open2}
          onOpenChange={(
            selectionActionsBar?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (!selectionActionsBar) {
              onClose();
            }
          }}
        >
          <Popover.Popup anchor={anchor2} {...selectionActionsPlacement2} collisionPadding={collisionPadding} padding={`none`} className={`border-strong border shadow-md`} style={{
  borderRadius: SELECTION_ACTIONS_RADIUS
}} initialFocus={initialFocus} aria-label={`Actions for this selection`} data-testid={`selection-actions-bar`} finalFocus={open ? false : undefined}>{<div
  ref={initialFocus}
  tabIndex={-1}
  role={`toolbar`}
  aria-label={`Actions for this selection`}
  aria-orientation={`horizontal`}
  className={`flex items-center p-px outline-none`}
  onKeyDownCapture={onKeyDownCapture}
  onKeyDown={onKeyDown}
>
                  {items.map((event?: Dynamic, index?: Dynamic, ..._extraArguments: unknown[]) => {
      let onClick = (..._extraArguments: unknown[]): undefined => {
        event.run();
        if (event.key !== `react`) {
          onClose();
        }
      };
      let jsx = <span aria-hidden={true} className={`bg-border h-3 w-px flex-none`} />;
      return event.quiet ? <span data-quiet-action={true} className={`flex items-center [&:not(:focus-within)]:sr-only`} key={event.key}>{index > 0 && jsx}{<Button
        variant={`ghost`}
        size={selectionActionsBarResult2(`xs`)}
        icon={event.icon ?? undefined}
        style={SELECTION_ACTIONS_INNER_STYLE}
        data-selection-action={event.key}
        onClick={onClick}
      >
                                  {event.label}
                                </Button>}{index === 0 && items.length > 1 && jsx}</span> : <React.Fragment key={event.key}>{items.slice(0, index).some((itemsSlice?: Dynamic, ..._extraArguments: unknown[]) => !itemsSlice.quiet) && jsx}{event.worded ? <Button
                                  variant={`ghost`}
                                  size={selectionActionsBarResult2(`xs`)}
                                  icon={event.icon ?? undefined}
                                  style={SELECTION_ACTIONS_INNER_STYLE}
                                  data-selection-action={event.key}
                                  onClick={onClick}
                                >
                                    {event.label}
                                  </Button> : <Tooltip content={event.label} side={selectionActionsPlacement2.side} collisionPadding={collisionPadding}>
                                    <Button
                                      variant={`ghost`}
                                      size={selectionActionsBarResult2(`xs`)}
                                      iconOnly={true}
                                      icon={event.icon}
                                      aria-label={event.label}
                                      tooltip={false}
                                      style={SELECTION_ACTIONS_INNER_STYLE}
                                      data-selection-action={event.key}
                                      onClick={onClick}
                                    />
                                  </Tooltip>}</React.Fragment>;
    })}
                </div>}{<Popover.Close className={`sr-only`}>{`Close`}</Popover.Close>}</Popover.Popup>
        </Popover.Root>
      )}
      {onReact && (
        <Popover.Root
          open={open}
          onOpenChange={(
            selectionActionsBar?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (!selectionActionsBar) {
              onClose();
            }
          }}
        >
          <ReactionPicker {...selectionActionsBarResult && elementRef.current !== null ? {
  anchor: {
    getBoundingClientRect: (..._extraArguments: unknown[]): Dynamic => elementRef.current ?? new (DOMRect as Dynamic)()
  },
  side: `bottom`,
  align: `end`,
  sideOffset: -elementRef.current.height,
  collisionPadding: collisionPadding
} : {
  anchor: anchor2,
  side: `bottom`,
  align: `start`,
  sideOffset: 4
}} finalFocus={false} onPick={(selectionActionsBar?: Dynamic, ..._extraArguments: unknown[]): undefined => {
  if (selection) {
    onReact(selection, selectionActionsBar);
  }
}} />
        </Popover.Root>
      )}
    </jsxRuntime.Fragment>
  );
}

var LazyFunctionRunDialog: Dynamic;

function SourcePopoverCloseButton(..._extraArguments: unknown[]) {
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

function sourceCellLabel(
  sourceCellLabel2?: unknown,
  ..._extraArguments: unknown[]
) {
  if (sourceCellLabel2 == null) return ``;
  if (typeof sourceCellLabel2 == `object`)
    try {
      return JSON.stringify(sourceCellLabel2);
    } catch {
      return String(sourceCellLabel2);
    }
  return String(sourceCellLabel2);
}

var MAX_SOURCE_PREVIEW_ROWS: number;

var SOURCE_DATABASE_ID_PATTERN: RegExp;

var SOURCE_UUID_PATTERN: RegExp;

var SOURCE_RUN_PENDING_STATUSES: Dynamic;

var SOURCE_RUN_SUCCESS_STATUSES: Dynamic;

var SOURCE_RUN_FAILURE_STATUSES: Dynamic;

function sourceRunState(
  sourceRunState2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let status: Dynamic = sourceRunState2.toLowerCase();
  return SOURCE_RUN_PENDING_STATUSES.has(status)
    ? {
        kind: `running`,
        ...(options == null
          ? {}
          : {
              at: options,
            }),
      }
    : SOURCE_RUN_SUCCESS_STATUSES.has(status)
      ? options == null
        ? {
            kind: `done`,
          }
        : {
            kind: `settled`,
            at: options,
          }
      : SOURCE_RUN_FAILURE_STATUSES.has(status)
        ? {
            kind: `failed`,
            status: status,
          }
        : {
            kind: `unknown`,
          };
}

function sourceLastRunState(
  sourceLastRunState2?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof sourceLastRunState2 != `object` || !sourceLastRunState2)
    return {
      kind: `unknown`,
    };
  let sourceLastRunState3: Dynamic = sourceLastRunState2;
  if (!(`error` in sourceLastRunState3))
    return typeof sourceLastRunState3.at == `string`
      ? {
          kind: `settled`,
          at: sourceLastRunState3.at,
        }
      : {
          kind: `unknown`,
        };
  let at2: Dynamic =
    typeof sourceLastRunState3.lastRun?.at == `string`
      ? sourceLastRunState3.lastRun.at
      : undefined;
  let status: Dynamic =
    typeof sourceLastRunState3.lastRun?.status == `string`
      ? sourceLastRunState3.lastRun.status
      : undefined;
  return sourceLastRunState3.rule === `run-in-progress`
    ? {
        kind: `running`,
        ...(at2 === undefined
          ? {}
          : {
              at: at2,
            }),
      }
    : sourceLastRunState3.rule === `run-not-ok`
      ? {
          kind: `failed`,
          ...(status === undefined
            ? {}
            : {
                status: status,
              }),
        }
      : {
          kind: `unknown`,
        };
}

function sourceChipBreadcrumbs(
  sourceChipBreadcrumbs2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  if (sourceChipBreadcrumbs2.source !== undefined) {
    items.push(
      sourceChipBreadcrumbs2.source.object +
        `/` +
        sourceChipBreadcrumbs2.source.id,
    );
  }
  if (sourceChipBreadcrumbs2.resolved?.adapter !== undefined) {
    items.push(
      `via ` + String(sourceChipBreadcrumbs2.resolved.adapter.kind ?? `lens`),
    );
  }
  return items;
}

function TargetSourcePopover(
  { open: open, onOpenChange: onOpenChange, pid: pid, target: target }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let targetSourcePopoverResult: Dynamic =
    resolvePlatformSyncAndRoutingCompact();
  let [targetSourcePopoverState, setTargetSourcePopoverState]: Dynamic = (0,
  React.useState)(null);
  let targetSourcePopoverResult2: Dynamic =
    resolvePlatformApiAndAuthUseContext2();
  let resolved: Dynamic = target?.target.resolved;
  let total =
    resolved === undefined ? null : resolved.object + `/` + resolved.id;
  let matchesWarmOnly = target?.warmOnly === true;
  let source: Dynamic = target?.target.source;
  let matchesObject =
    source?.object === `routine` && resolved?.object === `run`;
  let id2: Dynamic = matchesObject ? source.id : null;
  let id3: Dynamic = matchesObject ? resolved.id : null;
  let [def, setDef]: Dynamic = (0, React.useState)(null);
  let [runState, setRunState]: Dynamic = (0, React.useState)({
    kind: `unknown`,
  });
  let id4: Dynamic = source?.object === `file` ? source.id : null;
  let [targetSourcePopoverState2, setTargetSourcePopoverState2]: Dynamic = (0,
  React.useState)(null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (
        !open ||
        id4 === null ||
        pid === `` ||
        (setTargetSourcePopoverState2(null), matchesWarmOnly)
      )
        return;
      let enabled2 = false;
      (async (..._extraArguments: unknown[]): Promise<undefined> => {
        try {
          let response: Dynamic = await loadPlatformSessionAndSourcesAckOf(
            pid,
            {
              verb: `read`,
              engine: `json`,
              ref: {
                object: `file`,
                id: id4,
              },
              container: {
                kind: `project`,
                id: pid,
              },
              payload: {
                engine: `json`,
              },
            },
          );
          let value: Dynamic =
            response.verdict === `allow` ? response.value : undefined;
          if (enabled2) return;
          setTargetSourcePopoverState2(
            value !== undefined &&
              typeof value.birthName == `string` &&
              value.birthName.length > 0
              ? {
                  name: value.birthName,
                }
              : `gone`,
          );
        } catch {
          if (!enabled2) {
            setTargetSourcePopoverState2(`gone`);
          }
        }
      })();
      return (..._extraArguments: unknown[]): undefined => {
        enabled2 = true;
      };
    },
    [open, pid, id4, matchesWarmOnly],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (
        !open ||
        id2 === null ||
        id3 === null ||
        pid === `` ||
        matchesWarmOnly
      )
        return;
      let enabled2 = false;
      setDef(null);
      setRunState({
        kind: `unknown`,
      });
      (async (..._extraArguments: unknown[]): Promise<undefined> => {
        try {
          let object: Dynamic = await api.object(`projects/${pid}`, {
            byId: true,
          });
          if (enabled2) return;
          let response: Dynamic = await apiFetcher(
            `/api/functions/${encodeURIComponent(id2)}?container=${encodeURIComponent(object.name)}`,
          );
          if (!enabled2) {
            if (response.status === 404) {
              setDef({
                kind: `message`,
                message: `This routine isn't available — it may have been deleted, or you may not have access to it.`,
              });
            } else {
              if (response.ok) {
                setDef(sourceDefinition((await response.json()).config));
              } else {
                setDef({
                  kind: `message`,
                  message: `Couldn't read this routine (${response.status}).`,
                });
              }
            }
          }
          let status: Dynamic = target?.status;
          let at2: Dynamic = target?.at;
          let matchesRows =
            target?.rows !== undefined || target?.fed !== undefined;
          if (!enabled2) {
            setRunState(
              status == null
                ? at2 == null
                  ? matchesRows
                    ? {
                        kind: `done`,
                      }
                    : sourceLastRunState(
                        await api.lfile.widgetRunResult(object.name, id3),
                      )
                  : {
                      kind: `settled`,
                      at: at2,
                    }
                : sourceRunState(status, at2),
            );
          }
        } catch {
          if (!enabled2) {
            setDef({
              kind: `message`,
              message: `Couldn't load this routine — check your connection and reopen this link.`,
            });
          }
        }
      })();
      return (..._extraArguments: unknown[]): undefined => {
        enabled2 = true;
      };
    },
    [open, pid, id2, id3, matchesWarmOnly],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!open || target === null) return;
      let enabled2 = false;
      setTargetSourcePopoverState(null);
      let cite: Dynamic = matchesWarmOnly
        ? null
        : resolveCommentsActionsAndSelectionBlobId(target.target.resolved);
      if (cite !== null) {
        setTargetSourcePopoverState({
          kind: `sheet`,
          cite: cite,
          facts: sourceChipBreadcrumbs(target.target),
        });
        return;
      }
      if (target.rows !== undefined) {
        setTargetSourcePopoverState({
          kind: `rows`,
          rows: target.rows,
          facts: sourceChipBreadcrumbs(target.target),
        });
        return;
      }
      if (target.fed !== undefined) {
        setTargetSourcePopoverState({
          kind: `value`,
          value: target.fed,
          facts: sourceChipBreadcrumbs(target.target),
          ...(target.fedPath === undefined
            ? {}
            : {
                path: target.fedPath,
              }),
        });
        return;
      }
      if (pid === ``) return;
      let resolved2: Dynamic = target.target.resolved;
      if (resolved2 === undefined) {
        setTargetSourcePopoverState({
          kind: `message`,
          message: `This pin is on the whole component — it names no source to open.`,
        });
        return;
      }
      if (matchesWarmOnly) {
        setTargetSourcePopoverState({
          kind: `message`,
          message: `This source's rows aren't loaded here — open it from the chart to see them.`,
        });
        return;
      }
      (async (..._extraArguments: unknown[]): Promise<undefined> => {
        try {
          let widgetRunSource: Dynamic =
            resolved2.object === `run`
              ? await loadWidgetRunSource(pid, resolved2.id, resolved2.path)
              : resolved2.object === `database`
                ? await loadDatabaseSource(pid, resolved2.id)
                : resolved2.object === `blob`
                  ? unloadedBlobSourceNotice()
                  : sourceWithoutViewerNotice(resolved2.object);
          if (!enabled2) {
            setTargetSourcePopoverState(widgetRunSource);
          }
        } catch {
          if (!enabled2) {
            setTargetSourcePopoverState({
              kind: `message`,
              message: `Couldn't load this source — check your connection and reopen this link.`,
            });
          }
        }
      })();
      return (..._extraArguments: unknown[]): undefined => {
        enabled2 = true;
      };
    },
    [open, pid, total, matchesWarmOnly],
  );
  let rows: Dynamic =
    targetSourcePopoverState?.kind === `rows`
      ? targetSourcePopoverState.rows
      : null;
  let pin: Dynamic =
    rows === null
      ? null
      : target?.rowsPin === undefined
        ? resolved?.path == null
          ? null
          : resolveCommentsActionsAndSelectionKind3(rows, resolved.path)
        : resolveCommentsActionsAndSelectionKind3(rows, [
            String(target.rowsPin.row),
            target.rowsPin.column,
          ]);
  let record: Dynamic = matchesWarmOnly
    ? null
    : source?.object === `routine`
      ? {
          kind: `routine`,
          ref: source.id,
          name: source.name,
        }
      : source?.object === `database`
        ? {
            kind: `database`,
            ref: source.id,
            name: source.name,
          }
        : source?.object === `file`
          ? {
              kind: `file`,
              ref: source.id,
              name:
                targetSourcePopoverState2 !== null &&
                targetSourcePopoverState2 !== `gone`
                  ? targetSourcePopoverState2.name
                  : source.name,
            }
          : resolved?.object === `database`
            ? {
                kind: `database`,
                ref: resolved.id,
                name: source?.name ?? `Database`,
              }
            : null;
  let matchesKind =
    record?.kind === `routine`
      ? def?.kind === `message`
      : record?.kind === `database`
        ? targetSourcePopoverState?.kind === `message`
        : record?.kind === `file`
          ? targetSourcePopoverState2 === `gone`
          : false;
  let enabled =
    record?.kind === `file` ? true : resolveCommentsActionsAndSelectionValue4();
  let sourceChip =
    record === null ? null : (
      <Button
        variant={`secondary`}
        size={targetSourcePopoverResult(`sm`)}
        icon={
          <UiOverlaysAndIconsCustomIcon
            name={
              record.kind === `routine`
                ? `Lightning`
                : record.kind === `file`
                  ? `Spreadsheet`
                  : `Database`
            }
            size={`auto`}
          />
        }
        disabled={!enabled || matchesKind}
        disabledReason={
          matchesKind
            ? `This source may have been deleted or isn't available.`
            : enabled
              ? undefined
              : `Open the document to view its data sources.`
        }
        data-testid={`target-source-chip`}
        onClick={(..._extraArguments: unknown[]): undefined => {
          onOpenChange(false);
          if (record.kind === `file`) {
            updateDataModelSchemasPath({
              file: `file/${record.ref}`,
            });
          } else {
            resolveCommentsActionsAndSelectionValue5({
              kind: record.kind,
              ref: record.ref,
            });
          }
        }}
      >
        {record.name}
        <span className={`text-muted ml-1 font-normal`}>
          {`· `}
          {record.kind === `routine`
            ? `Routine`
            : record.kind === `file`
              ? `File`
              : `Database`}
        </span>
      </Button>
    );
  let name =
    targetSourcePopoverState?.kind === `sheet` || target?.inline !== undefined
      ? `Spreadsheet`
      : source?.object === `routine` || source?.object === `run`
        ? `Lightning`
        : source?.object === `database`
          ? `Database`
          : source?.object === `file` &&
              /\.(xlsx|csv)$/i.test(
                targetSourcePopoverState2 !== null &&
                  targetSourcePopoverState2 !== `gone`
                  ? targetSourcePopoverState2.name
                  : ``,
              )
            ? `Spreadsheet`
            : `File`;
  let inline: Dynamic = target?.inline;
  let text =
    resolved?.adapter === undefined
      ? null
      : String(resolved.adapter.kind ?? `lens`);
  let label =
    text === `csv`
      ? `uploaded CSV`
      : text === `xlsx-values`
        ? `uploaded spreadsheet`
        : `uploaded file`;
  let label2 = matchesWarmOnly
    ? inline === undefined
      ? source === undefined
        ? null
        : source.object === `database`
          ? `from a database table`
          : resolved?.object === `run`
            ? `from a routine run`
            : resolved?.object === `blob`
              ? `${label}${text === null ? `` : ` · via adapter`}`
              : null
      : `Inline in this widget · ${inline.rows.toLocaleString(targetSourcePopoverResult2.locale)} row${inline.rows === 1 ? `` : `s`}`
    : null;
  let name2: Dynamic =
    target?.target.source === undefined
      ? inline === undefined
        ? null
        : inline.name
      : target.target.source.name;
  let label3 =
    name2 !== null && !(matchesWarmOnly && SOURCE_UUID_PATTERN.test(name2))
      ? `Source · ${name2}`
      : `Source`;
  return (
    <UiDialogsRoot.Root open={open} onOpenChange={onOpenChange}>
      <PhoneDialogPopup
        size={`lg`}
        portalClassName={`z-popover`}
        touchActions={false}
      >
        <div className={`flex items-center justify-between gap-3`}>
          <UiDialogsRoot.Title
            className={`text-primary flex items-center gap-1.5`}
          >
            {(target?.target.source !== undefined ||
              inline !== undefined ||
              targetSourcePopoverState?.kind === `sheet`) && (
              <UiOverlaysAndIconsCustomIcon
                name={name}
                customSize={16}
                className={`text-muted shrink-0`}
              />
            )}
            <span>{label3}</span>
          </UiDialogsRoot.Title>
          <UiDialogsRoot.Close render={SourcePopoverCloseButton()} />
        </div>
        {target !== null && !matchesWarmOnly && (
          <span data-testid={`target-modal-address`} className={`sr-only`}>
            {target.target.source !== undefined &&
              `${target.target.source.object}/${target.target.source.id}`}
            {resolved !== undefined &&
              ` → ${resolved.object}/${resolved.id}` +
                (resolved.pk === undefined
                  ? ``
                  : ` · ${resolved.pk.source}#${resolved.pk.index}`) +
                (resolved.column === undefined ? `` : `.${resolved.column}`) +
                (resolved.adapter === undefined
                  ? ``
                  : ` · via ${resolved.adapter.kind ?? `lens`}`)}
          </span>
        )}
        {record !== null && !matchesObject && (
          <div className={`mt-2`}>{sourceChip}</div>
        )}
        {label2 !== null && (
          <div
            data-testid={`target-provenance`}
            className={`text-secondary text-footnote mt-2`}
          >
            {label2}
          </div>
        )}
        {matchesObject && id2 !== null && !matchesWarmOnly && (
          <SourceDefinitionCard
            sourceChip={sourceChip}
            def={def}
            runState={runState}
            locale={targetSourcePopoverResult2.locale}
            timeZone={targetSourcePopoverResult2.timeZone}
          />
        )}
        {targetSourcePopoverState?.kind === `sheet` ? (
          <div className={`mt-3 flex flex-col gap-2`}>
            {((..._extraArguments: unknown[]) => {
              let targetSourcePopoverResult3: Dynamic =
                target === null
                  ? null
                  : resolveCommentsStoreNode(target.target);
              return targetSourcePopoverResult3 === null ? null : (
                <div className={`text-muted text-footnote`}>
                  {targetSourcePopoverResult3}
                </div>
              );
            })()}
            <React.Suspense
              fallback={
                <div
                  className={`text-muted text-body py-8 text-center`}
                >{`Loading this source…`}</div>
              }
            >
              <LazyFunctionRunDialog
                pid={pid}
                cite={targetSourcePopoverState.cite}
              />
            </React.Suspense>
          </div>
        ) : (
          <div className={`mt-3 max-h-[70vh] overflow-auto`}>
            {targetSourcePopoverState === null ? (
              <div
                className={`text-secondary text-body py-8 text-center`}
              >{`Loading this source…`}</div>
            ) : targetSourcePopoverState.kind === `message` ? (
              <div className={`text-secondary text-body py-8 text-center`}>
                {targetSourcePopoverState.message}
              </div>
            ) : targetSourcePopoverState.kind === `value` ? (
              <SourceValuePreview
                value={targetSourcePopoverState.value}
                path={targetSourcePopoverState.path}
                testimony={target?.target.value}
              />
            ) : (
              <TargetDataRows rows={targetSourcePopoverState.rows} pin={pin} note={targetSourcePopoverState.note} {...target?.inline === undefined ? targetSourcePopoverState.total === undefined ? {} : {
  total: targetSourcePopoverState.total
} : {
  total: target.inline.rows
}} locale={targetSourcePopoverResult2.locale} />
            )}
          </div>
        )}
      </PhoneDialogPopup>
    </UiDialogsRoot.Root>
  );
}

function sourceWithoutViewerNotice(
  source?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return {
    kind: `message`,
    message: `This datum cites a ${source}, which doesn't have a viewer yet — the pin is recorded and the link stays valid.`,
  };
}

async function loadWidgetRunSource(
  widgetRunSource?: Dynamic,
  options?: Dynamic,
  path?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let object: Dynamic = await api.object(`projects/${widgetRunSource}`, {
    byId: true,
  });
  let widgetRunResult: Dynamic = await api.lfile.widgetRunResult(
    object.name,
    options,
  );
  if (`error` in widgetRunResult)
    return {
      kind: `message`,
      message: widgetRunResult.message,
    };
  let facts: Dynamic = [];
  if (widgetRunResult.routine !== null) {
    facts.push(String(widgetRunResult.routine));
  }
  if (widgetRunResult.at !== null) {
    facts.push(`finished ${String(widgetRunResult.at)}`);
  }
  let entry: Dynamic = resolveCommentsActionsAndSelectionKind2(
    widgetRunResult.value,
  );
  return entry.kind === `missing`
    ? {
        kind: `message`,
        message: `This run finished without a stored result — there are no rows to show.`,
      }
    : entry.kind === `too-large`
      ? {
          kind: `message`,
          message: `This run's result is too large to display (${entry.bytes.toLocaleString()} bytes) — the rows were not stored inline, so the pinned row cannot be shown.`,
        }
      : entry.kind === `value`
        ? {
            kind: `value`,
            value: entry.value,
            facts: facts,
            ...(path === undefined
              ? {}
              : {
                  path: path,
                }),
          }
        : {
            kind: `rows`,
            rows: entry.rows,
            facts: facts,
          };
}

function unloadedBlobSourceNotice(..._extraArguments: unknown[]) {
  return {
    kind: `message`,
    message: `This value isn't loaded here — reopen it from the chart to view it. A blob source has no read lane on this plane yet, so its value can only be shown from the click that drew it.`,
  };
}

function sourceDefinition(
  error?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let type: Dynamic = error?.type;
  return type === undefined
    ? {
        kind: `empty`,
      }
    : type === `code`
      ? {
          kind: `code`,
          code: error?.code ?? ``,
        }
      : type === `prompt`
        ? {
            kind: `prompt`,
            prompt: error?.prompt ?? ``,
          }
        : type === `tool_call`
          ? {
              kind: `tool_call`,
              tool: error?.call?.tool ?? ``,
              ...(error?.call?.args === undefined
                ? {}
                : {
                    args: error.call.args,
                  }),
            }
          : {
              kind: `unknown`,
              type: type,
            };
}

async function loadDatabaseSource(
  databaseSource?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  if (!SOURCE_DATABASE_ID_PATTERN.test(options))
    return {
      kind: `message`,
      message: `This link's database address is malformed.`,
    };
  let response: Dynamic = await apiFetcher(
    `/api/v3/project/${encodeURIComponent(databaseSource)}/database/${encodeURIComponent(options)}`,
  );
  if (response.status === 404)
    return {
      kind: `message`,
      message: `This database isn't available — it may have been deleted, or you may not have access to it.`,
    };
  if (!response.ok)
    return {
      kind: `message`,
      message: `Couldn't read this database (${response.status}).`,
    };
  let json: Dynamic = await response.json();
  let facts: Dynamic = [
    json.name,
    `${json.totalRows.toLocaleString()} row${json.totalRows === 1 ? `` : `s`}`,
  ];
  return {
    kind: `rows`,
    rows: json.rows.map(
      (row?: Dynamic, ..._extraArguments: unknown[]): Dynamic => row.cells,
    ),
    facts: facts,
    ...(json.rowsNote === undefined
      ? {}
      : {
          note: json.rowsNote,
        }),
    ...(json.totalRows > json.rows.length
      ? {
          total: json.totalRows,
        }
      : {}),
  };
}

function sourceTimestamp(
  sourceTimestamp2?: Dynamic,
  options?: Dynamic,
  timeZone?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let date = new Date(sourceTimestamp2);
  return Number.isNaN(date.getTime())
    ? sourceTimestamp2
    : date.toLocaleString(options, {
        month: `short`,
        day: `numeric`,
        hour: `numeric`,
        minute: `2-digit`,
        timeZone: timeZone,
        timeZoneName: `short`,
      });
}

function SourceDefinitionText(
  { text: text }: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    <pre
      className={`bg-alpha-1 text-secondary text-footnote max-h-64 overflow-auto rounded border p-2 font-mono whitespace-pre`}
    >
      {text}
    </pre>
  );
}

function SourceDefinition(
  { def: def }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let record: Dynamic =
    def?.kind === `code`
      ? {
          label: `code`,
          text: def.code,
        }
      : def?.kind === `prompt`
        ? {
            label: `prompt`,
            text: def.prompt,
          }
        : def?.kind === `tool_call`
          ? {
              label: `tool call`,
              text: `${def.tool}${
                def.args === undefined
                  ? ``
                  : `
` + JSON.stringify(def.args, null, 2)
              }`,
            }
          : null;
  let matchesRecord =
    record !== null &&
    (record.text.split(`
`).length > 6 ||
      record.text.length > 400);
  let [open, onOpenChange]: Dynamic = (0, React.useState)(true);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => onOpenChange(!matchesRecord),
    [matchesRecord],
  );
  if (def === null)
    return (
      <div className={`text-muted text-footnote`}>{`Loading routine…`}</div>
    );
  if (def.kind === `message`)
    return <div className={`text-secondary text-footnote`}>{def.message}</div>;
  if (def.kind === `empty`)
    return (
      <div
        className={`text-muted text-footnote`}
      >{`This routine has no stored body.`}</div>
    );
  if (def.kind === `unknown`)
    return (
      <div className={`text-muted text-footnote`}>
        {`This routine is a "`}
        {def.type}
        {`" runnable, which this view can't display yet.`}
      </div>
    );
  let { label: record2, text: text }: Dynamic = record;
  return (
    <Collapsible.Root open={open} onOpenChange={onOpenChange}>
      <Collapsible.Trigger
        hideCaret={true}
        className={`text-caption items-center font-medium tracking-wide uppercase`}
      >
        <UiOverlaysAndIconsCustomIcon
          name={`CaretRight`}
          customSize={10}
          className={`transition-transform ${open ? `rotate-90` : ``}`}
        />
        {record2}
      </Collapsible.Trigger>
      <Collapsible.Panel className={`mt-1`}>
        <SourceDefinitionText text={text} />
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}

function SourceDefinitionCard(
  {
    sourceChip: sourceChip,
    def: def,
    runState: runState,
    locale: locale,
    timeZone: timeZone,
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    <div
      className={`border-strong bg-alpha-1 mt-2 flex flex-col gap-1.5 rounded-lg border px-3 py-2`}
    >
      <div className={`flex items-baseline justify-between gap-2`}>
        <div className={`min-w-0`}>{sourceChip}</div>
        <div className={`text-muted text-footnote shrink-0 whitespace-nowrap`}>
          {runState.kind === `settled`
            ? `Ran ${sourceTimestamp(runState.at, locale, timeZone)}`
            : runState.kind === `running`
              ? `Still running`
              : runState.kind === `failed`
                ? `Run ${runState.status ?? `did not finish`}`
                : runState.kind === `done`
                  ? `Ran (completion time unavailable)`
                  : `Completion time unavailable`}
        </div>
      </div>
      <SourceDefinition def={def} />
    </div>
  );
}

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeAskCardsTargetSourcePopoverStep1(): void {
  (LazyFunctionRunDialog = resolvePlatformChunkLoadingLazy(
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          import("../../platform/lazy").then(
            (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              result.spreadsheetPageModule,
          ),
        mapPreloadDependencies([10, 1, 2, 0, 3]),
        import.meta.url,
      ),
  ));
  (MAX_SOURCE_PREVIEW_ROWS = 200);
  (SOURCE_DATABASE_ID_PATTERN = /^[A-Za-z0-9_-]{1,128}$/);
  (SOURCE_UUID_PATTERN = /[0-9a-f]{8}-[0-9a-f]{4}/i);
  (SOURCE_RUN_PENDING_STATUSES = new (Set as Dynamic)([
    `running`,
    `queued`,
    `blocked`,
    `pending`,
  ]));
  (SOURCE_RUN_SUCCESS_STATUSES = new (Set as Dynamic)([
    `ok`,
    `success`,
    `succeeded`,
    `complete`,
    `completed`,
  ]));
  (SOURCE_RUN_FAILURE_STATUSES = new (Set as Dynamic)([
    `error`,
    `failed`,
    `cancelled`,
    `canceled`,
    `timed_out`,
  ]));
}

export { MAX_SOURCE_PREVIEW_ROWS, SelectionActionsBar, TargetSourcePopover, sourceCellLabel };
