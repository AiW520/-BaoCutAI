/** BaoCut: extracted comment frame controls expressions; state remains owned by the original closure. */
import type { Dynamic } from "./types";
import type { DocumentFrameContext } from "./docs-app-frame-context";

export function createDocumentFrameTitle99(__documentClosure: Pick<DocumentFrameContext, "jsxRuntime" | "n5" | "request">): Dynamic {
  return (<__documentClosure.jsxRuntime.Fragment>
      {`Comments`}
      {__documentClosure.n5 > 0 && (
        <__documentClosure.jsxRuntime.Fragment>
          {` `}
          <span
            data-testid={`comments-open-count`}
            className={`text-muted ml-0.5 font-normal`}
          >
            {__documentClosure.n5}
            {` `}
            <span className={`sr-only`}>{__documentClosure.request.words}</span>
          </span>
        </__documentClosure.jsxRuntime.Fragment>
      )}
    </__documentClosure.jsxRuntime.Fragment>);
}

export function createDocumentFrameJsxs2100(__documentClosure: Pick<DocumentFrameContext, "jsxRuntime" | "Menu" | "originalJsxsProps" | "documentFrameState8" | "Tooltip" | "IconButton" | "elementRef28" | "returnAddsLine" | "PHONE_TOUCH_TARGET_CLASS" | "UiOverlaysAndIconsCustomIcon" | "elementRef29" | "renderMenuItems" | "mappedItems" | "documentFrameState9" | "elementRef30" | "elementRef31" | "collectPlatformKeyboardAndSaveStatusMods" | "resolvePlatformKeyboardAndSaveStatusFind" | "onSelect">): Dynamic {
  return (<__documentClosure.jsxRuntime.Fragment>
      <__documentClosure.Menu.Root
        {...(0, __documentClosure.originalJsxsProps)({
          modal: false,
          ...__documentClosure.documentFrameState8.root,
          children: [
            <__documentClosure.Tooltip content={`Filter`}>
              <__documentClosure.Menu.Trigger
                render={
                  <__documentClosure.IconButton
                    ref={__documentClosure.elementRef28}
                    aria-label={`Filter comments`}
                    size={__documentClosure.returnAddsLine ? 36 : 24}
                    className={
                      __documentClosure.returnAddsLine ? __documentClosure.PHONE_TOUCH_TARGET_CLASS : undefined
                    }
                    icon={
                      __documentClosure.returnAddsLine ? (
                        <__documentClosure.UiOverlaysAndIconsCustomIcon name={`Filter`} />
                      ) : (
                        <__documentClosure.UiOverlaysAndIconsCustomIcon
                          name={`Filter`}
                          customSize={14}
                        />
                      )
                    }
                  />
                }
              />
            </__documentClosure.Tooltip>,
            <__documentClosure.Menu.Popup
              ref={__documentClosure.elementRef29}
              align={`end`}
              finalFocus={__documentClosure.documentFrameState8.finalFocus}
            >
              {(0, __documentClosure.renderMenuItems)(__documentClosure.mappedItems)}
            </__documentClosure.Menu.Popup>,
          ],
        })}
      />
      <__documentClosure.Menu.Root
        {...(0, __documentClosure.originalJsxsProps)({
          modal: false,
          ...__documentClosure.documentFrameState9.root,
          children: [
            <__documentClosure.Tooltip content={`More`}>
              <__documentClosure.Menu.Trigger
                render={
                  <__documentClosure.IconButton
                    ref={__documentClosure.elementRef30}
                    aria-label={`More`}
                    size={__documentClosure.returnAddsLine ? 36 : 24}
                    className={
                      __documentClosure.returnAddsLine ? __documentClosure.PHONE_TOUCH_TARGET_CLASS : undefined
                    }
                    icon={
                      __documentClosure.returnAddsLine ? (
                        <__documentClosure.UiOverlaysAndIconsCustomIcon name={`DotsHorizontal`} />
                      ) : (
                        <__documentClosure.UiOverlaysAndIconsCustomIcon
                          name={`DotsHorizontal`}
                          customSize={14}
                        />
                      )
                    }
                  />
                }
              />
            </__documentClosure.Tooltip>,
            <__documentClosure.Menu.Popup
              ref={__documentClosure.elementRef31}
              align={`end`}
              finalFocus={__documentClosure.documentFrameState9.finalFocus}
            >
              {(0, __documentClosure.renderMenuItems)([
                {
                  label: `Hide comments`,
                  shortcut: (0, __documentClosure.collectPlatformKeyboardAndSaveStatusMods)(
                    (0, __documentClosure.resolvePlatformKeyboardAndSaveStatusFind)(`hideComments`)
                      .key,
                  ),
                  onSelect: __documentClosure.onSelect,
                },
              ])}
            </__documentClosure.Menu.Popup>,
          ],
        })}
      />
    </__documentClosure.jsxRuntime.Fragment>);
}

export function createDocumentFrameJsxs3101(__documentClosure: Pick<DocumentFrameContext, "ariaLabelledby" | "title" | "jsxs2" | "Tooltip" | "IconButton" | "UiOverlaysAndIconsCustomIcon" | "handFocusOutRef" | "forceList" | "setDraftY" | "storeState4">): Dynamic {
  return (<div className={`flex h-12 shrink-0 items-center gap-1 border-b px-3`}>
      <h2
        id={__documentClosure.ariaLabelledby}
        data-testid={`comments-list-heading`}
        className={`text-primary flex-1 truncate text-[13px] font-semibold`}
      >
        {__documentClosure.title}
      </h2>
      {__documentClosure.jsxs2}
      <__documentClosure.Tooltip content={`Close`}>
        <__documentClosure.IconButton
          aria-label={`Close comments`}
          size={24}
          icon={<__documentClosure.UiOverlaysAndIconsCustomIcon name={`X`} customSize={14} />}
          onClick={(
            documentFrame?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (documentFrame.detail === 0) {
              __documentClosure.handFocusOutRef.current?.(`text`);
            }
            if (__documentClosure.forceList) {
              (0, __documentClosure.setDraftY)();
            }
            (0, __documentClosure.storeState4)(__documentClosure.forceList ? `hidden` : `margin`);
          }}
        />
      </__documentClosure.Tooltip>
    </div>);
}

export function createDocumentFrameDocumentFrameHandler13102(__documentClosure: Pick<DocumentFrameContext, never>): Dynamic {
  return (({ ["documentFrameHandler13"]: ((
    documentFrame?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    documentFrame.g
      ? documentFrame.g.threads.length > 0 &&
        documentFrame.g.threads.every(
          (thread?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            thread.resolved,
        )
        ? 1
        : 0
      : +(documentFrame.t?.resolved === true)) })["documentFrameHandler13"]);
}

export function createDocumentFrameDocumentFrameHandler14103(__documentClosure: Pick<DocumentFrameContext, "filter" | "documentFrameHandler10" | "elementRef33" | "documentFrameResult34" | "documentFrameHandler13">): Dynamic {
  return (({ ["documentFrameHandler14"]: ((
    documentFrame?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (__documentClosure.filter !== `all`) return 0;
    let label: Dynamic = documentFrame.g
      ? `node:${documentFrame.g.nodeId}`
      : documentFrame.t
        ? (0, __documentClosure.documentFrameHandler10)(documentFrame.t)
        : ``;
    let byEntry: Dynamic = __documentClosure.elementRef33.current.by.get(label);
    if (
      byEntry !== undefined &&
      !(
        byEntry === 1 &&
        !__documentClosure.documentFrameResult34 &&
        (0, __documentClosure.documentFrameHandler13)(documentFrame) === 0
      )
    )
      return byEntry;
    let documentFrameHandler17 = (0, __documentClosure.documentFrameHandler13)(documentFrame);
    __documentClosure.elementRef33.current.by.set(label, documentFrameHandler17);
    return documentFrameHandler17;
  }) })["documentFrameHandler14"]);
}

export function createDocumentFrameToSorted104(__documentClosure: Pick<DocumentFrameContext, "memoized3" | "isWholeDocumentComment2" | "callback2" | "readId2" | "memoized2" | "documentFrameHandler" | "documentFrameHandler2" | "documentFrameHandler14">): Dynamic {
  return ([
    ...__documentClosure.memoized3.map(
      (file?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
        y: (0, __documentClosure.isWholeDocumentComment2)(file) ?? 1e9,
        at: file.root?.at ?? ``,
        t: file,
        g: null,
        w: false,
      }),
    ),
    ...__documentClosure.callback2.map(
      (file?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
        y: (0, __documentClosure.readId2)(file) ?? 1e9,
        at: file.root?.at ?? ``,
        t: file,
        g: null,
        w: true,
      }),
    ),
    ...__documentClosure.memoized2.map(
      (memoized6?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
        y: (0, __documentClosure.documentFrameHandler)(memoized6) ?? 1e9,
        at: (0, __documentClosure.documentFrameHandler2)(memoized6),
        t: null,
        g: memoized6,
        w: false,
      }),
    ),
  ].toSorted(
    (
      activity?: Dynamic,
      activity2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (0, __documentClosure.documentFrameHandler14)(activity) - (0, __documentClosure.documentFrameHandler14)(activity2) ||
      activity.y - activity2.y ||
      activity.at.localeCompare(activity2.at),
  ));
}

export function createDocumentFrameDocumentFrameHandler15105(__documentClosure: Pick<DocumentFrameContext, never>): Dynamic {
  return (({ ["documentFrameHandler15"]: ((
    documentFrame?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    documentFrame.t?.id === options ||
    documentFrame.g?.threads.some(
      (documentFrame2?: Dynamic, ..._extraArguments: unknown[]) =>
        documentFrame2.id === options,
    ) === true) })["documentFrameHandler15"]);
}

export function createDocumentFrameDocumentFrameHandler16106(__documentClosure: Pick<DocumentFrameContext, "toSorted" | "documentFrameHandler14" | "documentFrameHandler15">): Dynamic {
  return (({ ["documentFrameHandler16"]: ((
    documentFrame?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    __documentClosure.toSorted.some(
      (toSorted2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        (0, __documentClosure.documentFrameHandler14)(toSorted2) === 1 &&
        (0, __documentClosure.documentFrameHandler15)(toSorted2, documentFrame),
    )) })["documentFrameHandler16"]);
}

export function createDocumentFrameOnOpenChange107(__documentClosure: Pick<DocumentFrameContext, "useCommentStore" | "documentFrameHandler16" | "toSorted" | "documentFrameHandler15" | "documentFrameHandler13">): Dynamic {
  return (({ ["onOpenChange"]: ((
    documentFrame?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let storeState11: Dynamic = __documentClosure.useCommentStore.getState();
    let focusId: Dynamic = storeState11.focusId;
    if (!documentFrame && focusId != null && (0, __documentClosure.documentFrameHandler16)(focusId)) {
      if (storeState11.dirtyEditors.size > 0) return;
      if (
        __documentClosure.toSorted.some(
          (toSorted2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            (0, __documentClosure.documentFrameHandler15)(toSorted2, focusId) &&
            (0, __documentClosure.documentFrameHandler13)(toSorted2) === 1,
        )
      ) {
        storeState11.setFocus(null);
      }
    }
    storeState11.setResolvedFoldOpen(documentFrame);
  }) })["onOpenChange"]);
}

export function createDocumentFrameOnKeyDown108(__documentClosure: Pick<DocumentFrameContext, "enabledRef3" | "predict">): Dynamic {
  return (({ ["onKeyDown"]: ((
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (event.key !== `ArrowDown` && event.key !== `ArrowUp`) return;
    let currentTarget: Dynamic = event.currentTarget;
    let items2: Dynamic = [
      ...(currentTarget
        .closest(`[data-testid="ldoc-comments"]`)
        ?.querySelectorAll(`[data-comment-stop]`) ?? []),
    ];
    let compareDocumentPosition = (
      documentFrame?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      (currentTarget.compareDocumentPosition(documentFrame) &
        Node.DOCUMENT_POSITION_FOLLOWING) !==
      0;
    let item: Dynamic =
      event.key === `ArrowDown`
        ? items2.find(compareDocumentPosition)
        : items2.findLast(
            (item2?: Dynamic, ..._extraArguments: unknown[]) =>
              !compareDocumentPosition(item2),
          );
    event.preventDefault();
    if (item) {
      __documentClosure.enabledRef3.current = true;
      item.focus({
        preventScroll: true,
      });
      if (__documentClosure.enabledRef3.current) {
        __documentClosure.enabledRef3.current = false;
        (0, __documentClosure.predict)(item, true, true);
      }
    }
  }) })["onKeyDown"]);
}

export function createDocumentFrameFsEntryId2109(__documentClosure: Pick<DocumentFrameContext, "documentFrameResult13" | "stopId">): Dynamic {
  return (({ ["fsEntryId2"]: ((
    documentFrame?: Dynamic,
    options: Dynamic = (..._extraArguments: unknown[]) => true,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    (__documentClosure.documentFrameResult13 != null &&
    documentFrame.includes(__documentClosure.documentFrameResult13)
      ? __documentClosure.documentFrameResult13
      : null) ??
    (__documentClosure.stopId != null && documentFrame.includes(__documentClosure.stopId) && options(__documentClosure.stopId)
      ? __documentClosure.stopId
      : null) ??
    documentFrame.find(options) ??
    documentFrame[0] ??
    null) })["fsEntryId2"]);
}

export function createDocumentFrameFsEntryId3110(__documentClosure: Pick<DocumentFrameContext, "fsEntryId2" | "toSorted" | "open" | "documentFrameHandler14">): Dynamic {
  return ((0, __documentClosure.fsEntryId2)(
    __documentClosure.toSorted.flatMap(
      (toSorted2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        !__documentClosure.open && (0, __documentClosure.documentFrameHandler14)(toSorted2) === 1
          ? []
          : toSorted2.g
            ? [`node:${toSorted2.g.nodeId}`]
            : toSorted2.t
              ? [toSorted2.t.id]
              : [],
    ),
  ));
}
