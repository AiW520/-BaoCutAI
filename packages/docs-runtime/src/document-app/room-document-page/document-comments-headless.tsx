/** BaoCut: room document page from index-CX4IZqzA.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  React,
  mapPreloadDependencies,
} from "../bootstrap";
import {
  DataModelSchemasFreeze,
  PlatformSyncAndRoutingAssign2,
  api,
  atomChipLabel,
  atomKindOfQuote,
  cellsChipLabel,
  handleCommentStatusLine,
  hiddenResolvedThread,
  preloadModule,
  quoteWords,
  resolvePlatformAnnouncementsValue,
  resolvePlatformApiAndAuthInternal,
  resolvePlatformKeyboardAndSaveStatusRepeat,
  setCommentRoomDoor,
  useCommentStore,
  useThreads,
  useThreadsJoined,
} from "../dependencies";
import {
  ReactDom,
} from "../connection-and-errors/connector-permission-dialog";
import {
  classifyTitleFocusRequest,
} from "../document-display";
import {
  CommentComponents_Message2,
  CommentComponents_Message3,
} from "../comment-components/comment-reply-composer";
import {
  resolveCommentComponentsActiveElement,
  resolveCommentComponentsIsConnected,
  resolveCommentComponentsKey,
} from "../comment-components/state";
import {
  DocumentRuntimeState4,
} from "../document-runtime/widget-provenance-gutter";
import {
  DocumentFrame,
  DocumentSourcePromptState4,
  documentSourcePromptLimit0,
  documentSourcePromptLimit02,
} from "../document-frame";
import {
  assignDocumentSourcePromptState,
} from "../source-prompt-cache";

function isDocumentSourcePromptFsId(
  documentSourcePromptFsId?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let storeState: Dynamic = useCommentStore.getState();
  let { fsId: documentSourcePromptFsId2 }: Dynamic = documentSourcePromptFsId;
  let classifyTitleFocusRequest2 = classifyTitleFocusRequest({
    id: documentSourcePromptFsId.id,
    live: documentSourcePromptFsId.live,
    frameFocused:
      documentSourcePromptFsId.frame !== null &&
      document.hasFocus() &&
      document.activeElement === documentSourcePromptFsId.frame,
    held: (
      documentSourcePromptFsId3?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      !!documentSourcePromptFsId2 &&
      ([
        ...(storeState.byPage[documentSourcePromptFsId2] ?? []),
        ...(storeState.allByPage[documentSourcePromptFsId2] ?? []),
      ].some(
        (item?: Dynamic, ..._extraArguments: unknown[]) =>
          item.id === documentSourcePromptFsId3,
      ) ||
        (!storeState.foldConnected &&
          storeState.resolvedIds.has(documentSourcePromptFsId3))),
    hidden: (
      documentSourcePromptFsId3?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => hiddenResolvedThread(documentSourcePromptFsId3, storeState),
    focusId: storeState.focusId ?? null,
    unsent: storeState.dirtyEditors.size > 0,
    draftFloats: DocumentSourcePromptState4 !== null,
  });
  if (classifyTitleFocusRequest2.act === `ignore`) return;
  if (classifyTitleFocusRequest2.act !== `open`) {
    if (classifyTitleFocusRequest2.act === `refuse-draft`) {
      DocumentSourcePromptState4?.();
    }
    resolvePlatformAnnouncementsValue(
      document,
      classifyTitleFocusRequest2.act === `unavailable`
        ? CommentComponents_Message3
        : CommentComponents_Message2,
      {
        key: `comment-card`,
      },
    );
    return;
  }
  let { id: classifyTitleFocusRequest3 }: Dynamic = classifyTitleFocusRequest2;
  if (storeState.commentMode === `hidden`) {
    storeState.setCommentMode(`margin`);
  }
  let matchesFocusId = storeState.focusId === classifyTitleFocusRequest3;
  storeState.setActive(classifyTitleFocusRequest3);
  storeState.setFocus(classifyTitleFocusRequest3);
  if (storeState.commentMode === `list`) {
    storeState.revealInList(classifyTitleFocusRequest3, matchesFocusId);
  }
  storeState.focusCardByKey(classifyTitleFocusRequest3);
  let cardKeyAsk: Dynamic = useCommentStore.getState().cardKeyAsk;
  let count = 30;
  let focusCardByKey = (..._extraArguments: unknown[]): undefined => {
    if (
      !(
        useCommentStore.getState().cardKeyAsk !== cardKeyAsk ||
        documentSourcePromptLimit02 > 0
      )
    ) {
      if (--count > 0) {
        requestAnimationFrame(focusCardByKey);
        return;
      }
      useCommentStore.getState().focusCardByKey(null);
      resolvePlatformAnnouncementsValue(document, CommentComponents_Message3, {
        key: `comment-card`,
      });
    }
  };
  requestAnimationFrame(focusCardByKey);
}

var DocumentSourcePrompt_WholeDocument: string;

function resolveDocumentSourcePromptTarget(
  event?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let cells: Dynamic = event.target?.cells;
  return cells === undefined
    ? undefined
    : cellsChipLabel(cells, options[event.id]);
}

function resolveDocumentSourcePromptTarget2(
  event?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    options[event.id]?.kind ??
    (event.target?.atomAnchor
      ? (atomKindOfQuote(event.target.quote?.exact) ?? `image`)
      : undefined)
  );
}

function resolveDocumentSourcePromptValue(
  documentSourcePromptValue?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let documentSourcePromptTarget2: Dynamic = resolveDocumentSourcePromptTarget2(
    documentSourcePromptValue,
    options,
  );
  return documentSourcePromptTarget2 === undefined
    ? undefined
    : atomChipLabel(documentSourcePromptTarget2);
}

function resolveDocumentSourcePromptValue2(
  documentSourcePromptValue2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    resolveDocumentSourcePromptTarget(documentSourcePromptValue2, options) ??
    resolveDocumentSourcePromptValue(documentSourcePromptValue2, context)
  );
}

var documentSourcePromptSet: Dynamic;

function resolveDocumentSourcePromptCells(
  event?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (event.target?.cells !== undefined)
    return {
      on: `cells`,
      cells: event.target.cells,
      meta: options[event.id],
    };
  let kind: Dynamic = resolveDocumentSourcePromptTarget2(event, context);
  return kind === undefined
    ? {
        on: `text`,
        quote: event.target?.quote?.exact ?? ``,
      }
    : {
        on: `atom`,
        kind: kind,
      };
}

var isDocumentSourcePromptIsCollapsed: Dynamic;

function resolveDocumentSourcePromptTarget3(
  event?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let exact: Dynamic =
    event.target?.atomAnchor || options[event.id] !== undefined
      ? undefined
      : event.target?.quote?.exact;
  return exact === undefined ? undefined : quoteWords(exact);
}

function DocumentCommentsHeadless(
  {
    container: container,
    version: version,
    fsEntryId: fsEntryId,
    path: path,
    collapsed = false,
    iconLane = true,
    phone = false,
    railSeated = false,
    forceList = false,
    readOnly = false,
    commentOnly = false,
    resolveOwnOnly: resolveOwnOnly,
    covered = false,
    room: room,
    widgetNodes: widgetNodes,
    nodeName: nodeName,
    widgetBlockOf: widgetBlockOf,
    blockKindOf: blockKindOf,
    askOffer: askOffer,
    onOpenNodeLog: onOpenNodeLog,
    onRevealNode: onRevealNode,
    onOverhang: onOverhang,
    onCardSpans: onCardSpans,
    onScrollDoc: onScrollDoc,
    sheetScrollRef: sheetScrollRef,
    onComposeExit: onComposeExit,
    handFocusOut: handFocusOut,
    onStageForClaude: onStageForClaude,
    railSync: railSync,
    railWheelMountedRef: railWheelMountedRef,
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let documentCommentsHeadlessResult: Dynamic = useCommentStore(
    (
      documentCommentsHeadless?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => documentCommentsHeadless.commentMode,
  );
  let documentCommentsHeadlessResult2: Dynamic = useCommentStore(
    (
      documentCommentsHeadless?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => documentCommentsHeadless.draftAnchor,
  );
  let documentCommentsHeadlessResult3: Dynamic = useCommentStore(
    (documentCommentsHeadless?: Dynamic, ..._extraArguments: unknown[]) =>
      documentCommentsHeadless.quietPost !== null ||
      documentCommentsHeadless.surfaceCarrier.length > 0,
  );
  let container2 = `${container}@${version}`;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (room) {
        setCommentRoomDoor(room.pid);
        return (..._extraArguments: unknown[]) => setCommentRoomDoor(null);
      }
    },
    [room?.pid],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!room || !fsEntryId) return;
      let enabled = true;
      let documentCommentsHeadlessResult7: Dynamic;
      let refetch = (..._extraArguments: unknown[]): undefined => {
        let storeState: Dynamic = useCommentStore.getState();
        storeState
          .refetch(container2, fsEntryId)
          .catch((..._extraArguments: unknown[]): undefined => {});
        for (let documentCommentsHeadlessResult8 of (widgetNodes ??
          []) as Dynamic)
          storeState
            .refetch(container2, documentCommentsHeadlessResult8)
            .catch((..._extraArguments: unknown[]): undefined => {});
      };
      let lookup: Dynamic = new (Map as Dynamic)();
      preloadModule(
        async (..._extraArguments: unknown[]): Promise<Dynamic> => {
          let { subscribeProjectFeed: subscribeProjectFeed2 }: Dynamic =
            await import("../../platform/index").then(
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                result.Fg,
            );
          return {
            subscribeProjectFeed: subscribeProjectFeed2,
          };
        },
        mapPreloadDependencies([0, 1, 2, 3]),
        import.meta.url,
      ).then(
        (
          { subscribeProjectFeed: subscribeProjectFeed2 }: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (enabled) {
            documentCommentsHeadlessResult7 = subscribeProjectFeed2(
              room.pid,
              (entry?: Dynamic, ..._extraArguments: unknown[]): undefined => {
                if (entry.kind === `recovered`) {
                  let storeState: Dynamic = useCommentStore.getState();
                  storeState.clearWorkingFor(fsEntryId);
                  for (let documentCommentsHeadlessResult8 of (widgetNodes ??
                    []) as Dynamic)
                    storeState.clearWorkingFor(documentCommentsHeadlessResult8);
                  lookup.clear();
                  refetch();
                  return;
                }
                if (entry.kind === `access-changed`) {
                  refetch();
                  return;
                }
                if (entry.kind === `presence`) {
                  let frame: Dynamic = entry.frame;
                  let body: Dynamic = frame.body ?? {};
                  if (
                    resolvePlatformApiAndAuthInternal(frame.channel) &&
                    frame.agent?.running !== undefined &&
                    typeof body.threadId == `string`
                  ) {
                    if (frame.agent.running) {
                      lookup.set(frame.connId, body.threadId);
                    } else {
                      lookup.delete(frame.connId);
                    }
                    handleCommentStatusLine({
                      rootId: body.threadId,
                      state: frame.agent.running ? `working` : `done`,
                      text: `responding…`,
                    });
                  }
                  return;
                }
                if (entry.kind === `presence-leave`) {
                  let rootId: Dynamic = lookup.get(entry.connId);
                  if (rootId !== undefined) {
                    lookup.delete(entry.connId);
                    handleCommentStatusLine({
                      rootId: rootId,
                      state: `done`,
                    });
                  }
                  return;
                }
                if (
                  entry.kind === `envelope` &&
                  entry.envelope.diff.some(
                    (diff?: Dynamic, ..._extraArguments: unknown[]) =>
                      diff.address?.ref?.object === `utterance`,
                  )
                ) {
                  refetch();
                }
              },
            );
          }
        },
      );
      return (..._extraArguments: unknown[]): undefined => {
        enabled = false;
        documentCommentsHeadlessResult7?.();
      };
    },
    [room?.pid, container2, fsEntryId, widgetNodes],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (!widgetNodes?.length) return;
      let storeState: Dynamic = useCommentStore.getState();
      for (let documentCommentsHeadlessResult7 of widgetNodes as Dynamic)
        storeState
          .fetch(container2, documentCommentsHeadlessResult7)
          .catch((..._extraArguments: unknown[]): undefined => {});
    },
    [container2, widgetNodes],
  );
  let [seeded, setSeeded]: Dynamic = (0, React.useState)(false);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      setSeeded(false);
      if (!fsEntryId) return;
      let enabled = true;
      let setSeeded2 = (..._extraArguments: unknown[]): undefined => {
        if (enabled) {
          setSeeded(true);
        }
      };
      useCommentStore
        .getState()
        .fetch(container2, fsEntryId)
        .then(setSeeded2, setSeeded2);
      return (..._extraArguments: unknown[]): undefined => {
        enabled = false;
      };
    },
    [container2, fsEntryId],
  );
  let items: Dynamic = useThreads(fsEntryId ?? ``);
  let items2: Dynamic = useThreadsJoined(widgetNodes ?? DocumentRuntimeState4);
  let documentCommentsHeadlessResult4: Dynamic = useCommentStore(
    (
      documentCommentsHeadless?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => documentCommentsHeadless.mutGen,
  );
  let documentCommentsHeadlessResult5: Dynamic = useCommentStore(
    (
      documentCommentsHeadless?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => documentCommentsHeadless.foldConnected,
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (documentCommentsHeadlessResult5 || !fsEntryId) return;
      let enabled = true;
      Promise.all([
        api.comments.list(container2, fsEntryId, true),
        ...(widgetNodes ?? []).map(
          (widgetNode?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            api.comments
              .list(container2, widgetNode, true)
              .catch((..._extraArguments: unknown[]): Dynamic => []),
        ),
      ]).then(
        (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (!(!enabled || useCommentStore.getState().foldConnected)) {
            useCommentStore.getState().setResolvedIds(
              result
                .flat()
                .filter(
                  (flat?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                    flat.resolved && !flat.deleted,
                )
                .map(
                  (
                    filteredFlat?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic => ({
                    id: filteredFlat.id,
                    resolveId: filteredFlat.resolveId,
                  }),
                ),
            );
          }
        },
        (..._extraArguments: unknown[]): undefined => {},
      );
      return (..._extraArguments: unknown[]): undefined => {
        enabled = false;
      };
    },
    [
      documentCommentsHeadlessResult5,
      container2,
      fsEntryId,
      documentCommentsHeadlessResult4,
      items,
      widgetNodes,
      items2,
    ],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): undefined => {
        let storeState: Dynamic = useCommentStore.getState();
        storeState.setDraftAnchor(null);
        storeState.setDraftY(null);
        storeState.setPresent(null);
        storeState.setFolded(DataModelSchemasFreeze);
        storeState.setRects({}, []);
        storeState.setDocExtent(null);
        storeState.setDocScrollMax(null);
        if (!storeState.foldConnected) {
          storeState.setResolvedIds([]);
        }
        assignDocumentSourcePromptState(null);
      },
    [],
  );
  let handFocusOutRef: Dynamic = (0, React.useRef)(handFocusOut);
  handFocusOutRef.current = handFocusOut;
  (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    let handFocusOut2 = (
      event?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        !resolvePlatformKeyboardAndSaveStatusRepeat(event) ||
        event.target?.closest(`input, textarea, [contenteditable]`) ||
        PlatformSyncAndRoutingAssign2.getState().preview
      )
        return;
      event.preventDefault();
      let storeState: Dynamic = useCommentStore.getState();
      if (storeState.commentMode === `hidden`) {
        storeState.setCommentMode(`margin`);
        resolveCommentComponentsKey(document, `shown`);
      } else {
        let activeElement = document.activeElement;
        if (resolveCommentComponentsActiveElement(document)) {
          handFocusOutRef.current?.(`tabs`);
        }
        storeState.setDraftAnchor(null);
        storeState.setDraftY(null);
        (0, ReactDom.flushSync)(
          (..._extraArguments: unknown[]): Dynamic =>
            storeState.setCommentMode(`hidden`),
        );
        if (resolveCommentComponentsIsConnected(activeElement, document)) {
          handFocusOutRef.current?.(`tabs`);
        }
        resolveCommentComponentsKey(document, `hidden`);
      }
    };
    window.addEventListener(`keydown`, handFocusOut2);
    return (..._extraArguments: unknown[]) =>
      window.removeEventListener(`keydown`, handFocusOut2);
  }, []);
  if (!fsEntryId) return null;
  let matchesDocumentCommentsHeadlessResult =
    documentCommentsHeadlessResult === `hidden` &&
    !documentCommentsHeadlessResult2;
  if (matchesDocumentCommentsHeadlessResult && !documentCommentsHeadlessResult3)
    return null;
  let mode =
    forceList || documentCommentsHeadlessResult === `list` ? `list` : `margin`;
  if (
    (mode === `margin` ||
      (forceList && documentCommentsHeadlessResult !== `list`)) &&
    items.length + items2.length === 0 &&
    !documentCommentsHeadlessResult2 &&
    documentSourcePromptLimit0 === 0 &&
    !documentCommentsHeadlessResult3
  )
    return null;
  let documentCommentsHeadlessResult6: Dynamic =
    documentCommentsHeadlessResult3 &&
    (matchesDocumentCommentsHeadlessResult ||
      ((mode === `margin` ||
        (forceList && documentCommentsHeadlessResult !== `list`)) &&
        items.length + items2.length === 0 &&
        !documentCommentsHeadlessResult2 &&
        documentSourcePromptLimit0 === 0));
  let jsx = (
    <DocumentFrame
      container={container2}
      fsEntryId={fsEntryId}
      path={path}
      mode={mode}
      peek={mode === `margin` && collapsed && !documentCommentsHeadlessResult2}
      iconLane={iconLane}
      phone={phone}
      composeFloat={
        mode === `margin` &&
        !!documentCommentsHeadlessResult2 &&
        (collapsed || !railSeated)
      }
      railSeated={railSeated}
      forceList={forceList}
      readOnly={readOnly}
      commentOnly={commentOnly}
      resolveOwnOnly={resolveOwnOnly}
      covered={covered}
      seeded={seeded}
      initialFilter={items.length + items2.length === 0 ? `all` : `open`}
      listPopover={mode === `list` && collapsed}
      room={room}
      widgetNodes={widgetNodes}
      nodeName={nodeName}
      widgetBlockOf={widgetBlockOf}
      blockKindOf={blockKindOf}
      askOffer={askOffer}
      onOpenNodeLog={onOpenNodeLog}
      onRevealNode={onRevealNode}
      onOverhang={onOverhang}
      onCardSpans={onCardSpans}
      onScrollDoc={onScrollDoc}
      sheetScrollRef={sheetScrollRef}
      onComposeExit={onComposeExit}
      handFocusOut={handFocusOut}
      onStageForClaude={onStageForClaude}
      railSync={railSync}
      railWheelMountedRef={railWheelMountedRef}
    />
  );
  return documentCommentsHeadlessResult6 ? (
    <div hidden={true} data-testid={`ldoc-comments-headless`}>
      {jsx}
    </div>
  ) : (
    jsx
  );
}

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeRoomDocumentPageDocumentCommentsHeadlessStep1(): void {
  (DocumentSourcePrompt_WholeDocument = `Whole document`);
  (documentSourcePromptSet = new (Set as Dynamic)());
  (isDocumentSourcePromptIsCollapsed = (
    element?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let selection: Dynamic = element?.ownerDocument.getSelection();
    return (
      !!element &&
      !!selection &&
      !selection.isCollapsed &&
      element.contains(selection.anchorNode)
    );
  });
}

export {
  DocumentCommentsHeadless,
  DocumentSourcePrompt_WholeDocument,
  documentSourcePromptSet,
  isDocumentSourcePromptFsId,
  isDocumentSourcePromptIsCollapsed,
  resolveDocumentSourcePromptCells,
  resolveDocumentSourcePromptTarget3,
  resolveDocumentSourcePromptValue2,
};
