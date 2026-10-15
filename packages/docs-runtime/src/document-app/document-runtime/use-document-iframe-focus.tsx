/** BaoCut: document runtime from index-CX4IZqzA.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  Button,
  EditorExtensionsAskClaude,
  EditorExtensionsMoreActions,
  EditorHostGlyph,
  EditorHostTell,
  Menu,
  Popover,
  Tooltip,
  UiOverlaysAndIconsCustomIcon,
  UserReferenceChip,
  collectPlatformKeyboardAndSaveStatusJoin,
  collectPlatformKeyboardAndSaveStatusMods,
  editorExtensionsAskClaudeCommentReactValues,
  page,
  preloadModule,
  renderMenuItems,
  resolveEditorExtensionsDelete,
  resolvePlatformApiAndAuthHuman2,
  resolvePlatformApiAndAuthSafeParse,
  resolvePlatformApiAndAuthUseContext2,
  resolvePlatformKeyboardAndSaveStatusFind,
  resolvePlatformKeyboardAndSaveStatusShiftKey,
  resolvePlatformSessionAndSourcesWeekday,
  resolvePlatformSyncAndRoutingClaude,
  resolvePlatformSyncAndRoutingCompact,
  resolvePlatformSyncAndRoutingIndexOf,
  toast,
} from "../dependencies";
import {
  React,
  jsxRuntime,
  mapPreloadDependencies,
} from "../bootstrap";
import {
  isDocumentFocusedElsewhere,
} from "../phone-overlays/export-progress-dialog";
import {
  IconButton,
} from "../run-review";
import {
  ReactionPicker,
} from "../ask-cards/document-posture-badge";
import {
  DocumentRuntime_Styles2,
  DocumentRuntime_Styles4,
  DocumentRuntime_TopStackAsked,
  documentRuntimeSet2,
  isDocumentRuntimeFocusWas,
  isDocumentRuntimeKind,
  resolveDocumentRuntimeClosest2,
  resolveDocumentRuntimeMatches,
  resolveDocumentRuntimeParentElement,
  resolveDocumentRuntimeRange,
  resolveDocumentRuntimeRange2,
} from "./use-document-runtime-subscribe-project-feed";

function useDocumentIframeFocus(
  {
    iframeRef: iframeRef,
    readOnly: readOnly,
    seated: seated,
    mayFocus: mayFocus,
  }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let recordRef: Dynamic = (0, React.useRef)({
    readOnly: readOnly,
    seated: seated,
    mayFocus: mayFocus,
  });
  recordRef.current = {
    readOnly: readOnly,
    seated: seated,
    mayFocus: mayFocus,
  };
  let elementRef: Dynamic = (0, React.useRef)(null);
  let countRef: Dynamic = (0, React.useRef)(0);
  let enabledRef: Dynamic = (0, React.useRef)(false);
  let elementRef2: Dynamic = (0, React.useRef)(null);
  let elementRef3: Dynamic = (0, React.useRef)(null);
  let useDocumentIframeFocusHandler = (..._extraArguments: unknown[]) =>
    elementRef3.current?.mark.isConnected === true;
  let enabledRef2: Dynamic = (0, React.useRef)(true);
  let uniqueItemsRef: Dynamic = (0, React.useRef)(new (Set as Dynamic)());
  let callback: Dynamic = (0, React.useCallback)(
    (
      documentIframeFocus?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (documentIframeFocus !== null) {
        uniqueItemsRef.current.add(documentIframeFocus);
      }
    },
    [],
  );
  let contains: Dynamic = (0, React.useCallback)(
    (
      documentIframeFocus?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) => {
      if (
        documentIframeFocus === null ||
        documentIframeFocus === options.body ||
        documentIframeFocus === options.documentElement ||
        documentIframeFocus.hasAttribute(`data-copy-scratch`)
      )
        return `nowhere`;
      if (documentIframeFocus === iframeRef.current) return `editor`;
      for (let useDocumentIframeFocusResult of uniqueItemsRef.current as Dynamic)
        if (!useDocumentIframeFocusResult.isConnected)
          uniqueItemsRef.current.delete(useDocumentIframeFocusResult);
        else if (useDocumentIframeFocusResult.contains(documentIframeFocus))
          return `stack`;
      return `elsewhere`;
    },
    [iframeRef],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let ownerDocument: Dynamic =
        iframeRef.current?.ownerDocument ??
        (typeof document === "undefined" ? null : document);
      if (ownerDocument === null) return;
      let matches = (
        documentIframeFocus?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined =>
        void (
          documentIframeFocus !== null &&
          documentIframeFocus !== elementRef2.current &&
          documentIframeFocus.matches(DocumentRuntime_Styles4) &&
          contains(documentIframeFocus, ownerDocument) === `elsewhere` &&
          (elementRef2.current = documentIframeFocus)
        );
      let updateElement = (..._extraArguments: unknown[]): undefined =>
        void (
          iframeRef.current !== null &&
          ownerDocument.activeElement === iframeRef.current &&
          (elementRef2.current = iframeRef.current)
        );
      let focus = (
        documentIframeFocus?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (isDocumentFocusedElsewhere(ownerDocument)) return;
        let activeElement: Dynamic = ownerDocument.activeElement;
        let contains3: Dynamic = contains(activeElement, ownerDocument);
        if (
          contains3 === `editor` ||
          (contains3 === `elsewhere` &&
            !documentIframeFocus.contains(activeElement))
        )
          return;
        let element: Dynamic = elementRef2.current;
        if (
          element !== null &&
          element !== iframeRef.current &&
          (element.focus({
            preventScroll: true,
          }),
          ownerDocument.activeElement === element)
        )
          return;
        let {
          readOnly: record,
          seated: record2,
          mayFocus: record3,
        }: Dynamic = recordRef.current;
        if (!(record || !record2 || record3?.() === false)) {
          iframeRef.current?.focus({
            preventScroll: true,
          });
          enabledRef.current = isDocumentRuntimeKind(enabledRef.current, {
            kind: `handed-back`,
          });
        }
      };
      let observe = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let documentRuntimeClosest2: Dynamic = resolveDocumentRuntimeClosest2(
          event.target,
        );
        let mark: Dynamic = resolveDocumentRuntimeClosest2(event.detail);
        let MutationObserver2: Dynamic =
          ownerDocument.defaultView?.MutationObserver;
        if (
          documentRuntimeClosest2 === null ||
          mark === null ||
          !mark.isConnected ||
          mark === elementRef3.current?.mark ||
          MutationObserver2 === undefined ||
          ![...uniqueItemsRef.current].some(
            (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              item.isConnected && item.contains(documentRuntimeClosest2),
          )
        )
          return;
        elementRef3.current?.seen.disconnect();
        let leaving: Dynamic = resolveDocumentRuntimeParentElement(mark);
        let seen: Dynamic = new (MutationObserver2 as Dynamic)(
          (..._extraArguments: unknown[]): undefined => {
            if (!mark.isConnected) {
              seen.disconnect();
              if (elementRef3.current?.mark === mark) {
                elementRef3.current = null;
              }
              setTimeout(
                (..._extraArguments: unknown[]): undefined =>
                  void (enabledRef2.current && focus(leaving)),
                0,
              );
            }
          },
        );
        seen.observe(leaving, {
          childList: true,
          subtree: true,
        });
        seen.observe(ownerDocument.body, {
          childList: true,
        });
        elementRef3.current = {
          mark: mark,
          leaving: leaving,
          seen: seen,
        };
      };
      let useDocumentIframeFocusHandler2 = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        countRef.current++;
        updateElement();
        if (
          !(
            contains(
              resolveDocumentRuntimeClosest2(event.target),
              ownerDocument,
            ) === `stack` || useDocumentIframeFocusHandler()
          )
        ) {
          elementRef.current = null;
          enabledRef.current = false;
        }
      };
      let updateElement2 = (..._extraArguments: unknown[]): undefined =>
        void (elementRef.current = null);
      let useDocumentIframeFocusHandler3 = (
        ..._extraArguments: unknown[]
      ): undefined => {
        let no2: Dynamic = elementRef.current?.no;
        if (no2 !== undefined) {
          setTimeout(
            (..._extraArguments: unknown[]): undefined =>
              void (
                elementRef.current?.no === no2 && (elementRef.current = null)
              ),
            0,
          );
        }
      };
      let updateElement3 = (..._extraArguments: unknown[]): undefined =>
        void (elementRef.current = null);
      let updateElement4 = (..._extraArguments: unknown[]): undefined => {
        updateElement();
        setTimeout(updateElement, 0);
      };
      let updateElement5 = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined =>
        void (
          iframeRef.current !== null &&
          event.target === iframeRef.current &&
          (elementRef2.current = iframeRef.current)
        );
      let contains2 = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let activeElement: Dynamic = ownerDocument.activeElement;
        let documentRuntimeClosest2: Dynamic = resolveDocumentRuntimeClosest2(
          event.target,
        );
        if (
          activeElement !== null &&
          documentRuntimeClosest2 !== null &&
          activeElement.contains(documentRuntimeClosest2)
        ) {
          matches(activeElement);
        }
      };
      let matches2 = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined =>
        void (
          documentRuntimeSet2.has(event.key) ||
          matches(ownerDocument.activeElement)
        );
      let matches3: Dynamic = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ) => matches(resolveDocumentRuntimeClosest2(event.target));
      let defaultView: Dynamic = ownerDocument.defaultView;
      ownerDocument.addEventListener(
        `pointerdown`,
        useDocumentIframeFocusHandler2,
        true,
      );
      ownerDocument.addEventListener(`mouseup`, updateElement2);
      ownerDocument.addEventListener(
        `pointerup`,
        useDocumentIframeFocusHandler3,
      );
      ownerDocument.addEventListener(`pointercancel`, updateElement3, true);
      ownerDocument.addEventListener(`focusin`, updateElement5, true);
      ownerDocument.addEventListener(`click`, contains2, true);
      ownerDocument.addEventListener(`keydown`, matches2, true);
      ownerDocument.addEventListener(`input`, matches3, true);
      ownerDocument.addEventListener(DocumentRuntime_TopStackAsked, observe);
      defaultView?.addEventListener(`blur`, updateElement4);
      return (..._extraArguments: unknown[]): undefined => {
        ownerDocument.removeEventListener(
          `pointerdown`,
          useDocumentIframeFocusHandler2,
          true,
        );
        ownerDocument.removeEventListener(`mouseup`, updateElement2);
        ownerDocument.removeEventListener(
          `pointerup`,
          useDocumentIframeFocusHandler3,
        );
        ownerDocument.removeEventListener(
          `pointercancel`,
          updateElement3,
          true,
        );
        ownerDocument.removeEventListener(`focusin`, updateElement5, true);
        ownerDocument.removeEventListener(`click`, contains2, true);
        ownerDocument.removeEventListener(`keydown`, matches2, true);
        ownerDocument.removeEventListener(`input`, matches3, true);
        ownerDocument.removeEventListener(
          DocumentRuntime_TopStackAsked,
          observe,
        );
        defaultView?.removeEventListener(`blur`, updateElement4);
      };
    },
    [iframeRef, contains],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => (
      (enabledRef2.current = true),
      (..._extraArguments: unknown[]): undefined => {
        enabledRef2.current = false;
        elementRef3.current?.seen.disconnect();
        elementRef3.current = null;
      }
    ),
    [],
  );
  return {
    ref: callback,
    onPointerDownCapture: (
      event?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let ownerDocument: Dynamic = event.currentTarget.ownerDocument;
      let focusWas: Dynamic = contains(
        ownerDocument.activeElement,
        ownerDocument,
      );
      elementRef.current = {
        no: countRef.current,
        target: resolveDocumentRuntimeClosest2(event.target),
        focusWas: focusWas,
        fromEditor: enabledRef.current,
        selection: resolveDocumentRuntimeRange(
          ownerDocument.defaultView?.getSelection(),
        ),
        button: event.button,
        modified:
          event.ctrlKey || event.metaKey || event.altKey || event.shiftKey,
      };
      enabledRef.current = isDocumentRuntimeKind(enabledRef.current, {
        kind: `press`,
        focusWas: focusWas,
      });
    },
    onMouseUp: (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let element: Dynamic = elementRef.current;
      elementRef.current = null;
      if (element === null || element.no !== countRef.current) return;
      let ownerDocument: Dynamic = event.currentTarget.ownerDocument;
      if (useDocumentIframeFocusHandler()) return;
      let documentRuntimeRange: Dynamic = resolveDocumentRuntimeRange(
        ownerDocument.defaultView?.getSelection(),
      );
      if (
        !(
          !isDocumentRuntimeFocusWas({
            downTarget: element.target,
            upTarget: resolveDocumentRuntimeClosest2(event.target),
            focusWas: element.focusWas,
            fromEditor: element.fromEditor,
            selectionChangedToRange:
              documentRuntimeRange.range &&
              !resolveDocumentRuntimeRange2(
                documentRuntimeRange,
                element.selection,
              ),
            composing: resolveDocumentRuntimeMatches(
              ownerDocument.activeElement,
            ),
            button: element.button === 0 ? event.button : element.button,
            modified:
              element.modified ||
              event.ctrlKey ||
              event.metaKey ||
              event.altKey ||
              event.shiftKey,
            readOnly: readOnly,
            seated: seated,
          }) || mayFocus?.() === false
        )
      ) {
        iframeRef.current?.focus({
          preventScroll: true,
        });
        enabledRef.current = isDocumentRuntimeKind(enabledRef.current, {
          kind: `handed-back`,
        });
      }
    },
    onFocusCapture: (
      event?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      enabledRef.current = isDocumentRuntimeKind(enabledRef.current, {
        kind: `focusin`,
        from: contains(
          resolveDocumentRuntimeClosest2(event.relatedTarget),
          event.currentTarget.ownerDocument,
        ),
      });
    },
    onBlurCapture: (
      event?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      enabledRef.current = isDocumentRuntimeKind(enabledRef.current, {
        kind: `focusout`,
        to: contains(
          resolveDocumentRuntimeClosest2(event.relatedTarget),
          event.currentTarget.ownerDocument,
        ),
      });
    },
    onClick: (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let closest: Dynamic =
        resolveDocumentRuntimeClosest2(event.target)?.closest(
          DocumentRuntime_Styles2,
        ) ?? null;
      if (
        closest === null ||
        (useDocumentIframeFocusHandler() &&
          elementRef3.current?.leaving.contains(closest) === true) ||
        !enabledRef.current
      )
        return;
      let ownerDocument: Dynamic = event.currentTarget.ownerDocument;
      let count = 3;
      let focus = (..._extraArguments: unknown[]): undefined => {
        if (!enabledRef.current) return;
        let activeElement: Dynamic = ownerDocument.activeElement;
        if (
          activeElement !== null &&
          activeElement !== ownerDocument.body &&
          activeElement !== ownerDocument.documentElement &&
          activeElement !== closest
        )
          return;
        if (closest.isConnected)
          return void (--count > 0 && setTimeout(focus, 16));
        let {
          readOnly: record,
          seated: record2,
          mayFocus: record3,
        }: Dynamic = recordRef.current;
        if (!(record || !record2 || record3?.() === false)) {
          iframeRef.current?.focus({
            preventScroll: true,
          });
          enabledRef.current = isDocumentRuntimeKind(enabledRef.current, {
            kind: `handed-back`,
          });
        }
      };
      setTimeout(focus, 0);
    },
  };
}

var resolveDocumentRuntimeValue7: (documentRuntimeValue7?: Dynamic, ..._extraArguments: unknown[]) => string;

var documentRuntimeLimit64: number;

function resolveDocumentRuntimeGetItem(
  documentRuntimeGetItem?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  try {
    let item = localStorage.getItem(
      resolveDocumentRuntimeValue7(documentRuntimeGetItem),
    );
    let parse: Dynamic = item ? JSON.parse(item) : null;
    return parse && typeof parse == `object` && !Array.isArray(parse)
      ? parse
      : {};
  } catch {
    return {};
  }
}

function resolveDocumentRuntimeSetItem(
  documentRuntimeSetItem?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  try {
    localStorage.setItem(
      resolveDocumentRuntimeValue7(documentRuntimeSetItem),
      JSON.stringify(options),
    );
  } catch {}
}

function resolveDocumentRuntimeKeys(
  documentRuntimeKeys?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (context && Object.keys(context).length) {
    documentRuntimeKeys[options] = context;
  } else {
    delete documentRuntimeKeys[options];
  }
  let documentRuntimeKeysKeys = Object.keys(documentRuntimeKeys);
  if (documentRuntimeKeysKeys.length > documentRuntimeLimit64)
    for (let resolveDocumentRuntimeKeysResult of documentRuntimeKeysKeys.slice(
      0,
      documentRuntimeKeysKeys.length - documentRuntimeLimit64,
    ) as Dynamic)
      delete documentRuntimeKeys[resolveDocumentRuntimeKeysResult];
}

var DocumentRuntimeLoad: Dynamic;

var DocumentRuntimeLoad2: Dynamic;

function resolveDocumentRuntimeBuild(
  documentRuntimeBuild?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let build: Dynamic = documentRuntimeBuild.build ?? null;
  let matchesStatus =
    build?.status === `done` ||
    build?.status === `error` ||
    build?.status === `staged`;
  let dispatched: Dynamic =
    documentRuntimeBuild.dispatched ||
    documentRuntimeBuild.queuedLocal ||
    (build !== null && !matchesStatus);
  let matchesDraftBroken =
    documentRuntimeBuild.draftBroken === true && !dispatched;
  let resolveDocumentRuntimeBuildHandler = (..._extraArguments: unknown[]) =>
    matchesDraftBroken ? `draft-errors` : `draft-ready`;
  return build?.status === `error`
    ? documentRuntimeBuild.draftPresent
      ? resolveDocumentRuntimeBuildHandler()
      : `error`
    : documentRuntimeBuild.failed
      ? `error`
      : documentRuntimeBuild.blocked || build?.status === `staged`
        ? `blocked`
        : build?.status === `done`
          ? documentRuntimeBuild.draftPresent
            ? resolveDocumentRuntimeBuildHandler()
            : null
          : documentRuntimeBuild.draftPresent && matchesDraftBroken
            ? `draft-errors`
            : documentRuntimeBuild.draftPresent &&
                !dispatched &&
                documentRuntimeBuild.draftStatusUnknowable === true
              ? `draft`
              : documentRuntimeBuild.draftPresent ||
                  documentRuntimeBuild.dispatched ||
                  build?.status === `running`
                ? `building`
                : build?.status === `pending` ||
                    documentRuntimeBuild.queuedLocal
                  ? `queued`
                  : null;
}

function resolveDocumentRuntimeElapsedSec(
  documentRuntimeElapsedSec?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let queuedForMs: Dynamic = documentRuntimeElapsedSec.queuedForMs;
  let matchesQueuedForMs =
    queuedForMs !== null && Number.isFinite(queuedForMs) && queuedForMs >= 0;
  return {
    elapsedSec:
      matchesQueuedForMs && queuedForMs >= 5e3
        ? Math.floor(queuedForMs / 1e3)
        : null,
    stalled: matchesQueuedForMs && queuedForMs >= 9e4,
    runRowBacked:
      (documentRuntimeElapsedSec.build ?? null)?.status === `pending`,
    readAnswered: documentRuntimeElapsedSec.build !== undefined,
  };
}

function resolveDocumentRuntimeFloor(
  documentRuntimeFloor?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (documentRuntimeFloor < 60) return `${documentRuntimeFloor}s`;
  let floor = Math.floor(documentRuntimeFloor / 60);
  let amount = documentRuntimeFloor % 60;
  if (floor < 60) return amount ? `${floor}m ${amount}s` : `${floor}m`;
  let floor2 = Math.floor(floor / 60);
  let amount2 = floor % 60;
  return amount2 ? `${floor2}h ${amount2}m` : `${floor2}h`;
}

function resolveDocumentRuntimeElapsedSec2(
  documentRuntimeElapsedSec2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let documentRuntimeFloor =
    documentRuntimeElapsedSec2.elapsedSec === null
      ? null
      : resolveDocumentRuntimeFloor(documentRuntimeElapsedSec2.elapsedSec);
  let readAnswered: Dynamic =
    documentRuntimeElapsedSec2.readAnswered &&
    !documentRuntimeElapsedSec2.runRowBacked;
  if (!documentRuntimeElapsedSec2.stalled)
    return readAnswered && documentRuntimeFloor
      ? `Build queued — no pending build run is visible yet (${documentRuntimeFloor})`
      : documentRuntimeFloor
        ? `Build queued — waiting for a builder (${documentRuntimeFloor})`
        : `Build queued — waiting for a builder`;
  let label = documentRuntimeFloor ? ` for ${documentRuntimeFloor}` : ``;
  return documentRuntimeElapsedSec2.runRowBacked
    ? `Build queued${label} — no builder picked it up; re-create the widget`
    : documentRuntimeElapsedSec2.readAnswered
      ? `Build queued${label} — no pending build run is visible; re-create the widget`
      : `Build queued${label} — build status unreadable; reload to re-check`;
}

function isWidgetBuildRunning(
  widgetBuildRunning?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (widgetBuildRunning ?? null)?.status === `running`;
}

var DocumentRuntime_Edit: string;

function resolveDocumentRuntimeTarget(
  event?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let target: Dynamic = event.target;
  if (resolvePlatformKeyboardAndSaveStatusShiftKey(event)) {
    event.stopPropagation();
    event.preventDefault();
    return;
  }
  if (
    event.key === `Escape` &&
    target.getAttribute(`aria-expanded`) !== `true`
  ) {
    event.stopPropagation();
    event.preventDefault();
    if (!context?.(options)) {
      page.clear(options);
      target.blur?.();
    }
  }
}

function WidgetHoverToolbar(
  widgetHover?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let {
    nodeId: dataNodeId,
    onEdit: widgetHover2,
    onEscape: widgetHover3,
  }: Dynamic = widgetHover;
  let widgetHoverToolbarResult: Dynamic =
    resolvePlatformSyncAndRoutingCompact();
  return (
    <div
      role={`toolbar`}
      aria-label={`Widget`}
      data-testid={`widget-hover-toolbar`}
      data-node-id={dataNodeId}
      className={`flex items-center gap-1`}
      aria-keyshortcuts={collectPlatformKeyboardAndSaveStatusJoin(
        `formatToolbar`,
      )}
      onKeyDown={(widgetHover4?: Dynamic, ..._extraArguments: unknown[]) =>
        resolveDocumentRuntimeTarget(widgetHover4, dataNodeId, widgetHover3)
      }
    >
      <Button
        variant={`secondary`}
        size={widgetHoverToolbarResult(`sm`)}
        icon={`Edit`}
        onClick={(..._extraArguments: unknown[]): Dynamic =>
          widgetHover2(dataNodeId)
        }
        data-testid={`widget-hover-edit`}
      >
        {DocumentRuntime_Edit}
      </Button>
    </div>
  );
}

var DocumentRuntimeMemo: Dynamic;

function resolveDocumentRuntimePreventScroll(
  element?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let escape2: Dynamic =
    typeof CSS !== "undefined" && CSS.escape
      ? CSS.escape(options)
      : options.replace(/["\\]/g, `\\$&`);
  let matchedElement: Dynamic =
    element.querySelector(
      `[data-testid="widget-hover-toolbar"][data-node-id="${escape2}"] button:not([disabled])`,
    ) ??
    element.querySelector(
      `[data-testid="widget-action-menu"][data-node-id="${escape2}"]:not([disabled])`,
    );
  return matchedElement
    ? (matchedElement.focus({
        preventScroll: true,
        focusVisible: true,
      }),
      matchedElement.ownerDocument.activeElement === matchedElement)
    : false;
}

function resolveDocumentRuntimeAskClaude(
  documentRuntimeAskClaude?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let record: Dynamic = {
    askClaude: documentRuntimeAskClaude.onAskClaude,
    comment: documentRuntimeAskClaude.onComment,
    react: documentRuntimeAskClaude.onReact,
  };
  let items: Dynamic = [
    [...(documentRuntimeAskClaude.run ?? [])],
    [
      ...(documentRuntimeAskClaude.onViewData
        ? [
            {
              label: `View data`,
              onSelect: documentRuntimeAskClaude.onViewData,
            },
          ]
        : []),
      ...(documentRuntimeAskClaude.onSources
        ? [
            {
              label: `Sources`,
              onSelect: documentRuntimeAskClaude.onSources,
            },
          ]
        : []),
      ...(documentRuntimeAskClaude.onSourceCode
        ? [
            {
              label: `Source code`,
              onSelect: documentRuntimeAskClaude.onSourceCode,
            },
          ]
        : []),
    ],
    editorExtensionsAskClaudeCommentReactValues.flatMap(
      (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        let onSelect: Dynamic = record[item];
        return onSelect
          ? [
              {
                label: EditorExtensionsAskClaude[item].label,
                onSelect: onSelect,
                ...(item === `react`
                  ? {
                      keepOpen: true,
                    }
                  : {}),
              },
            ]
          : [];
      },
    ),
    documentRuntimeAskClaude.onDelete
      ? [
          {
            label: resolveEditorExtensionsDelete(
              documentRuntimeAskClaude.noun ?? `widget`,
            ),
            variant: `danger`,
            onSelect: documentRuntimeAskClaude.onDelete,
          },
        ]
      : [],
  ];
  let items2: Dynamic = [];
  for (let resolveDocumentRuntimeAskClaudeResult of items as Dynamic)
    resolveDocumentRuntimeAskClaudeResult.forEach(
      (
        item?: Dynamic,
        index?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        items2.push(
          index === 0 && items2.length > 0
            ? {
                ...item,
                separatorBefore: true,
              }
            : item,
        ),
    );
  return items2;
}

var DocumentRuntimeAlso: string;

var DocumentRuntimeState: boolean;

function resolveDocumentRuntimeCatch(..._extraArguments: unknown[]): undefined {
  if (!DocumentRuntimeState) {
    DocumentRuntimeState = true;
    preloadModule(
      (..._extraArguments: unknown[]): Dynamic =>
        import("../../embedded-widgets/console-panel"),
      mapPreloadDependencies([27, 1, 6, 2, 0, 3, 28, 9, 10]),
      import.meta.url,
    ).catch((..._extraArguments: unknown[]): undefined => {
      DocumentRuntimeState = false;
    });
  }
}

function WidgetActionMenu(
  widgetActionMenu?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let {
    nodeId: dataNodeId,
    loadHandlers: widgetActionMenu2,
    onRun: widgetActionMenu3,
    onOpenPanel: widgetActionMenu4,
    onViewData: widgetActionMenu5,
    onComment: widgetActionMenu6,
    onReact: widgetActionMenu7,
    onOpenCode: widgetActionMenu8,
    onAskClaude: widgetActionMenu9,
    onDelete: widgetActionMenu10,
    noun = `widget`,
    onEscape: widgetActionMenu11,
    chordTarget: widgetActionMenu12 = false,
    anchorHidden: widgetActionMenu13 = false,
  }: Dynamic = widgetActionMenu;
  let [open, setOpen]: Dynamic = (0, React.useState)(false);
  let [open2, setOpen2]: Dynamic = (0, React.useState)(false);
  let anchor: Dynamic = (0, React.useRef)(null);
  let elementRef: Dynamic = (0, React.useRef)(null);
  let labelRef: Dynamic = (0, React.useRef)(`none`);
  let [itemsState, setItemsState]: Dynamic = (0, React.useState)([]);
  if (open && widgetActionMenu13) {
    setOpen(false);
  }
  if (open2 && widgetActionMenu13) {
    setOpen2(false);
  }
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!open && !open2) return;
      let setOpen3 = (..._extraArguments: unknown[]): undefined => {
        setOpen(false);
        setOpen2(false);
      };
      window.addEventListener(`blur`, setOpen3);
      return (..._extraArguments: unknown[]) =>
        window.removeEventListener(`blur`, setOpen3);
    },
    [open, open2],
  );
  let labelRef2: Dynamic = (0, React.useRef)(`none`);
  let elementRef2: Dynamic = (0, React.useRef)(null);
  let finalFocus: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): Dynamic => {
      let label: Dynamic = labelRef2.current;
      if (label !== `escape-key` && label !== `outside-press`) return false;
      let activeElement = document.activeElement;
      return (
        activeElement === null ||
        activeElement === document.body ||
        (elementRef2.current?.contains(activeElement) ?? false)
      );
    },
    [],
  );
  let finalFocus2: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): Dynamic => {
      let label: Dynamic = labelRef.current;
      if (label !== `escape-key` && label !== `outside-press`) return false;
      let activeElement = document.activeElement;
      return activeElement === null ||
        activeElement === document.body ||
        (elementRef.current?.contains(activeElement) ?? false)
        ? (anchor.current ?? false)
        : false;
    },
    [],
  );
  let countRef: Dynamic = (0, React.useRef)(0);
  let onOpenChange = (
    widgetActionMenu15?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    labelRef2.current = widgetActionMenu15
      ? `none`
      : (options?.reason ?? `none`);
    setOpen(widgetActionMenu15);
    if (!widgetActionMenu15) return;
    let widgetActionMenuResult: number = ++countRef.current;
    widgetActionMenu2(dataNodeId).then(
      (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        if (countRef.current === widgetActionMenuResult) {
          setItemsState(result);
        }
      },
      (..._extraArguments: unknown[]): undefined => {
        if (countRef.current === widgetActionMenuResult) {
          setItemsState([]);
        }
      },
    );
  };
  let onOpenChangeRef: Dynamic = (0, React.useRef)(onOpenChange);
  onOpenChangeRef.current = onOpenChange;
  let widgetActionMenuRef: Dynamic = (0, React.useRef)(widgetActionMenu13);
  widgetActionMenuRef.current = widgetActionMenu13;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      EditorHostTell.subscribe(
        (
          widgetActionMenu15?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          let anchor2: Dynamic = anchor.current;
          if (
            widgetActionMenu15.nodeId !== dataNodeId ||
            anchor2 === null ||
            widgetActionMenuRef.current
          )
            return;
          let anchorBounds: Dynamic = anchor2.getBoundingClientRect();
          if (
            !(
              widgetActionMenu15.x < anchorBounds.left ||
              widgetActionMenu15.x > anchorBounds.right ||
              widgetActionMenu15.y < anchorBounds.top ||
              widgetActionMenu15.y > anchorBounds.bottom
            )
          ) {
            anchor2.focus({
              preventScroll: true,
            });
            onOpenChangeRef.current(true);
          }
        },
      ),
    [dataNodeId],
  );
  let run: Dynamic = itemsState.map(
    (itemsState2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
      label: `Run ${itemsState2.label ?? itemsState2.routine.split(`/`).pop() ?? itemsState2.routine}`,
      onSelect: (..._extraArguments: unknown[]): undefined => {
        (async (..._extraArguments: unknown[]): Promise<undefined> => {
          try {
            let widgetActionMenu15: Dynamic = await widgetActionMenu3(
              dataNodeId,
              itemsState2.routine,
            );
            if (`error` in widgetActionMenu15) {
              toast.error(
                widgetActionMenu15.message ||
                  `The routine couldn't be started.`,
              );
            } else {
              toast.success(`Run started`);
            }
          } catch {
            toast.error(`The routine couldn't be started — try again.`);
          }
        })();
      },
    }),
  );
  let widgetActionMenu14: Dynamic =
    widgetActionMenu8 ??
    (widgetActionMenu4 &&
      ((widgetActionMenu15?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        widgetActionMenu4(widgetActionMenu15, `code`)));
  let documentRuntimeAskClaude: Dynamic = resolveDocumentRuntimeAskClaude({
    run: run,
    onViewData:
      widgetActionMenu5 &&
      ((..._extraArguments: unknown[]): Dynamic =>
        widgetActionMenu5(dataNodeId)),
    onSources:
      widgetActionMenu4 &&
      ((..._extraArguments: unknown[]): Dynamic =>
        widgetActionMenu4(dataNodeId, `dependencies`)),
    onSourceCode:
      widgetActionMenu14 &&
      ((..._extraArguments: unknown[]): Dynamic =>
        widgetActionMenu14(dataNodeId)),
    onAskClaude:
      widgetActionMenu9 &&
      ((..._extraArguments: unknown[]): Dynamic =>
        widgetActionMenu9(dataNodeId)),
    onComment:
      widgetActionMenu6 &&
      ((..._extraArguments: unknown[]): Dynamic =>
        widgetActionMenu6(dataNodeId)),
    onReact:
      widgetActionMenu7 &&
      ((..._extraArguments: unknown[]): undefined => {
        labelRef2.current = `none`;
        setOpen(false);
        labelRef.current = `none`;
        setOpen2(true);
      }),
    onDelete:
      widgetActionMenu10 &&
      ((..._extraArguments: unknown[]): Dynamic =>
        widgetActionMenu10(dataNodeId)),
    noun: noun,
  });
  return documentRuntimeAskClaude.length === 0 ? null : (
    <jsxRuntime.Fragment>
      <Menu.Root open={open} onOpenChange={onOpenChange} modal={false}>
        <Tooltip
          content={open || open2 ? undefined : EditorExtensionsMoreActions}
          shortcut={
            widgetActionMenu12
              ? collectPlatformKeyboardAndSaveStatusMods(DocumentRuntimeAlso)
              : undefined
          }
          hoverable={false}
        >
          <Menu.Trigger
            render={
              <IconButton
                ref={anchor}
                variant={`default`}
                size={EditorHostGlyph.size}
                icon={
                  <UiOverlaysAndIconsCustomIcon
                    name={`DotsHorizontal`}
                    customSize={EditorHostGlyph.glyph}
                  />
                }
                aria-label={EditorExtensionsMoreActions}
                aria-keyshortcuts={
                  widgetActionMenu12
                    ? collectPlatformKeyboardAndSaveStatusJoin(`formatToolbar`)
                    : undefined
                }
                data-testid={`widget-action-menu`}
                data-node-id={dataNodeId}
                onMouseEnter={
                  widgetActionMenu4 ? resolveDocumentRuntimeCatch : undefined
                }
                onFocus={
                  widgetActionMenu4 ? resolveDocumentRuntimeCatch : undefined
                }
                onKeyDown={(
                  widgetActionMenu15?: Dynamic,
                  ..._extraArguments: unknown[]
                ) =>
                  resolveDocumentRuntimeTarget(
                    widgetActionMenu15,
                    dataNodeId,
                    widgetActionMenu11,
                  )
                }
              />
            }
          />
        </Tooltip>
        <Menu.Popup
          ref={elementRef2}
          align={`end`}
          finalFocus={finalFocus}
          data-testid={`widget-action-menu-popup`}
        >
          {renderMenuItems(documentRuntimeAskClaude)}
        </Menu.Popup>
      </Menu.Root>
      {widgetActionMenu7 !== undefined && (
        <Popover.Root
          open={open2}
          onOpenChange={(
            widgetActionMenu15?: Dynamic,
            options?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            labelRef.current = widgetActionMenu15
              ? `none`
              : (options?.reason ?? `none`);
            setOpen2(widgetActionMenu15);
          }}
        >
          <ReactionPicker
            ref={elementRef}
            anchor={anchor}
            side={`bottom`}
            align={`end`}
            finalFocus={finalFocus2}
            onPick={(
              widgetActionMenu15?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              labelRef.current = `none`;
              setOpen2(false);
              widgetActionMenu7(dataNodeId, widgetActionMenu15);
            }}
          />
        </Popover.Root>
      )}
    </jsxRuntime.Fragment>
  );
}

var DocumentRuntimeMemo2: Dynamic;

function resolveDocumentRuntimeLabel(
  documentRuntimeLabel?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let actor: Dynamic =
    documentRuntimeLabel === null
      ? undefined
      : resolvePlatformApiAndAuthSafeParse(documentRuntimeLabel);
  return actor === undefined
    ? {
        label: `unknown`,
      }
    : {
        label: resolvePlatformSyncAndRoutingClaude(actor),
        person: resolvePlatformApiAndAuthHuman2(actor)
          ? actor.principal
          : undefined,
      };
}

function widgetProvenanceAuthors(
  widgetProvenanceAuthors2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return widgetProvenanceAuthors2.authors &&
    widgetProvenanceAuthors2.authors.length > 0
    ? {
        label: widgetProvenanceAuthors2.authors
          .map(resolvePlatformSyncAndRoutingIndexOf)
          .join(`, `),
      }
    : resolveDocumentRuntimeLabel(widgetProvenanceAuthors2.actor);
}

function useProvenanceTimeFormat(..._extraArguments: unknown[]): Dynamic {
  let useProvenanceTimeFormatResult: Dynamic =
    resolvePlatformApiAndAuthUseContext2();
  let parse = Date.parse(useProvenanceTimeFormatResult.now());
  return {
    rel: (provenanceTime?: Dynamic, ..._extraArguments: unknown[]) =>
      provenanceTime
        ? resolvePlatformSessionAndSourcesWeekday(
            provenanceTime,
            parse,
            useProvenanceTimeFormatResult.locale,
            useProvenanceTimeFormatResult.timeZone,
          )
        : `—`,
    abs: (provenanceTime?: Dynamic, ..._extraArguments: unknown[]) => {
      let parse2 = Date.parse(provenanceTime);
      return Number.isNaN(parse2)
        ? `—`
        : new Date(parse2).toLocaleString(
            useProvenanceTimeFormatResult.locale,
            {
              timeZone: useProvenanceTimeFormatResult.timeZone,
              dateStyle: `short`,
              timeStyle: `short`,
            },
          );
    },
  };
}

var WidgetProvenanceTrigger: Dynamic;

function WidgetProvenanceFacts(
  {
    p: p5,
    rel: rel,
    onNavigate: onNavigate,
    onOpenDependencies: onOpenDependencies,
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let widgetProvenanceFactsResult: Dynamic =
    resolvePlatformSyncAndRoutingCompact();
  let lastTouched: Dynamic = p5.lastTouched;
  let widgetProvenanceAuthors2: Dynamic =
    lastTouched !== undefined &&
    (lastTouched.action === `publish` || lastTouched.landed === `live`)
      ? widgetProvenanceAuthors(lastTouched)
      : undefined;
  let widgetProvenanceAuthors3: Dynamic =
    widgetProvenanceAuthors2 !== undefined &&
    widgetProvenanceAuthors2.label !== `unknown`
      ? widgetProvenanceAuthors2
      : undefined;
  let sourcesSlice: Dynamic = p5.sources.slice(0, 3);
  let difference: number = p5.sources.length - sourcesSlice.length;
  return (
    <div
      className={`flex flex-col gap-1.5`}
      data-testid={`widget-provenance-facts`}
    >
      {p5.published && p5.published.at !== `` && (
        <div
          className={`text-primary text-footnote font-medium`}
          data-testid={`widget-provenance-published`}
        >
          {`Published `}
          {rel(p5.published.at)}
          {widgetProvenanceAuthors3 && (
            <span className={`text-secondary font-normal`}>
              {` `}
              {`by `}
              {widgetProvenanceAuthors3.person === undefined ? (
                widgetProvenanceAuthors3.label
              ) : (
                <UserReferenceChip who={widgetProvenanceAuthors3.person} />
              )}
            </span>
          )}
        </div>
      )}
      <div
        className={`text-muted text-footnote`}
        data-testid={`widget-provenance-sources`}
      >
        {p5.sourcesUnavailable ? (
          <span
            data-testid={`widget-provenance-sources-unavail`}
          >{`Sources unavailable`}</span>
        ) : p5.sources.length === 0 ? (
          `No sources`
        ) : (
          <jsxRuntime.Fragment>
            {p5.sources.length}
            {` `}
            {p5.sources.length === 1 ? `source` : `sources`}
            {`:`}
            {` `}
            {sourcesSlice.map(
              (
                entry?: Dynamic,
                index?: Dynamic,
                ..._extraArguments: unknown[]
              ) => (
                <Tooltip
                  content={entry.kind === `inline` ? `${entry.ref} — inline sample rows typed in the widget code` : entry.ref}
                  multiline={true}
                  className={`wrap-anywhere`}
                  key={entry.ref}
                >{<span className={`text-code`} data-testid={`widget-provenance-source`}>
                          {index > 0 && `, `}
                          {entry.ref}
                          {entry.kind === `inline` && ` · inline`}
                        </span>}</Tooltip>
              ),
            )}
            {difference > 0 && `, +${difference} more`}
          </jsxRuntime.Fragment>
        )}
      </div>
      {onOpenDependencies && (
        <Button
          size={widgetProvenanceFactsResult(`sm`)}
          variant={`ghost`}
          onClick={(..._extraArguments: unknown[]): undefined => {
            onNavigate?.();
            onOpenDependencies();
          }}
          data-testid={`widget-provenance-deps-link`}
          className={`mt-0.5 self-start`}
        >{`Details →`}</Button>
      )}
    </div>
  );
}

var documentRuntimeLimit6: number;

var documentRuntimeLimit28: number;

var documentRuntimeLimit8: number;

var documentRuntimeLimit4: number;

var documentRuntimeLimit42: number;

var documentRuntimeLimit642: number;

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeDocumentRuntimeUseDocumentIframeFocusStep1(): void {
  (resolveDocumentRuntimeValue7 = (
    documentRuntimeValue7?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `bongo.widgetVs.${documentRuntimeValue7}`);
  (documentRuntimeLimit64 = 64);
  (DocumentRuntimeLoad = {
    load: (
      documentRuntimeLoad?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      resolveDocumentRuntimeGetItem(documentRuntimeLoad)[options] ?? {},
    save: (
      documentRuntimeLoad?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let documentRuntimeGetItem: Dynamic =
        resolveDocumentRuntimeGetItem(documentRuntimeLoad);
      resolveDocumentRuntimeKeys(documentRuntimeGetItem, options, context);
      resolveDocumentRuntimeSetItem(documentRuntimeLoad, documentRuntimeGetItem);
    },
  });
  (DocumentRuntimeLoad2 = {
    load: (
      documentRuntimeLoad2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => DocumentRuntimeLoad.load(documentRuntimeLoad2, options),
    save: (
      documentRuntimeLoad2?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      DocumentRuntimeLoad.save(documentRuntimeLoad2, options, context),
  });
  (DocumentRuntime_Edit = `Edit`);
  (DocumentRuntimeMemo = (0, React.memo)(WidgetHoverToolbar));
  (DocumentRuntimeAlso = resolvePlatformKeyboardAndSaveStatusFind(`formatToolbar`).also?.find(
      (documentRuntimeAlso?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        documentRuntimeAlso.startsWith(`Mod-`),
    ) ?? resolvePlatformKeyboardAndSaveStatusFind(`formatToolbar`).key);
  (DocumentRuntimeState = false);
  (DocumentRuntimeMemo2 = (0, React.memo)(WidgetActionMenu));
  (WidgetProvenanceTrigger = (0, React.memo)(function (
    {
      nodeId: nodeId,
      fetchFor: fetchFor,
      trigger: trigger,
      onOpenDependencies: onOpenDependencies,
      anchorHidden = false,
    }: Dynamic,
    ..._extraArguments: unknown[]
  ) {
    let { rel: rel }: Dynamic = useProvenanceTimeFormat();
    let [open, setOpen]: Dynamic = (0, React.useState)(false);
    let [recordState, setRecordState]: Dynamic = (0, React.useState)({
      s: `loading`,
    });
    if (open && anchorHidden) {
      setOpen(false);
    }
    (0, React.useEffect)(
      (..._extraArguments: unknown[]): Dynamic => {
        if (!open) return;
        let setOpen2: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
          setOpen(false);
        window.addEventListener(`blur`, setOpen2);
        return (..._extraArguments: unknown[]) =>
          window.removeEventListener(`blur`, setOpen2);
      },
      [open],
    );
    let setRecordState2 = async (
      ..._extraArguments: unknown[]
    ): Promise<undefined> => {
      setRecordState(
        (
          widgetProvenanceTrigger?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          widgetProvenanceTrigger.s === `ok`
            ? widgetProvenanceTrigger
            : {
                s: `loading`,
              },
      );
      try {
        let fetchFor2: Dynamic = await fetchFor(nodeId);
        if (fetchFor2.kind === `not-a-widget`) {
          setRecordState({
            s: `msg`,
            text: `Not a widget node.`,
          });
        } else {
          setRecordState({
            s: `ok`,
            p: fetchFor2,
          });
        }
      } catch {
        setRecordState(
          (
            widgetProvenanceTrigger?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            widgetProvenanceTrigger.s === `ok`
              ? widgetProvenanceTrigger
              : {
                  s: `msg`,
                  text: `Provenance isn't available.`,
                },
        );
      }
    };
    let matchesTrigger = trigger === `header`;
    let render = matchesTrigger ? (
      <button
        type={`button`}
        aria-label={`Widget sources`}
        data-testid={`widget-provenance-trigger`}
        className={`text-secondary hover:text-primary cursor-pointer p-1`}
      >
      <UiOverlaysAndIconsCustomIcon name={`Database`} customSize={13} />
    </button>
    ) : (
      <IconButton
        variant={`default`}
        size={EditorHostGlyph.size}
        icon={
          <UiOverlaysAndIconsCustomIcon
            name={`Database`}
            customSize={EditorHostGlyph.glyph}
          />
        }
        aria-label={`Widget sources`}
        data-testid={`widget-provenance-gutter-chip`}
      />
    );
    return (
      <Popover.Root
        open={open}
        onOpenChange={(
          widgetProvenanceTrigger?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          setOpen(widgetProvenanceTrigger);
          if (widgetProvenanceTrigger) {
            setRecordState2();
          }
        }}
      >
      <Tooltip
          content={open ? undefined : `See where this came from`}
          side={matchesTrigger ? undefined : `left`}
        >
        <Popover.Trigger render={render} />
      </Tooltip>
      <Popover.Popup
          align={`end`}
          className={`max-h-[min(60vh,var(--available-height))] w-80`}
          data-testid={`widget-provenance-popup`}
        >
        <div
            className={`text-secondary text-caption mb-2 font-semibold uppercase`}
          >{`Sources`}</div>
        {recordState.s === `loading` && (
            <div className={`text-muted text-footnote`}>{`Loading…`}</div>
          )}
        {recordState.s === `msg` && (
            <div className={`text-muted text-footnote`}>{recordState.text}</div>
          )}
        {recordState.s === `ok` && (
            <WidgetProvenanceFacts
              p={recordState.p}
              rel={rel}
              onNavigate={(..._extraArguments: unknown[]): Dynamic =>
                setOpen(false)
              }
              onOpenDependencies={
                onOpenDependencies === undefined
                  ? undefined
                  : (..._extraArguments: unknown[]): Dynamic =>
                      onOpenDependencies(nodeId)
              }
            />
          )}
      </Popover.Popup>
    </Popover.Root>
    );
  }));
  (documentRuntimeLimit6 = 6);
  (documentRuntimeLimit28 = 28);
  (documentRuntimeLimit8 = 8);
  (documentRuntimeLimit4 = 4);
  (documentRuntimeLimit42 = 4);
  (documentRuntimeLimit642 = 64);
}

export {
  DocumentRuntimeLoad2,
  DocumentRuntimeMemo,
  DocumentRuntimeMemo2,
  WidgetProvenanceTrigger,
  documentRuntimeLimit28,
  documentRuntimeLimit4,
  documentRuntimeLimit42,
  documentRuntimeLimit6,
  documentRuntimeLimit642,
  documentRuntimeLimit8,
  isWidgetBuildRunning,
  resolveDocumentRuntimeAskClaude,
  resolveDocumentRuntimeBuild,
  resolveDocumentRuntimeElapsedSec,
  resolveDocumentRuntimeElapsedSec2,
  resolveDocumentRuntimePreventScroll,
  useDocumentIframeFocus,
  useProvenanceTimeFormat,
  widgetProvenanceAuthors,
};
