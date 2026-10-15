/** BaoCut: extracted comment frame draft expressions; state remains owned by the original closure. */
import type { Dynamic } from "./types";
import type { DocumentFrameContext } from "./docs-app-frame-context";

export function createDocumentFrameEffect14(__documentClosure: Pick<DocumentFrameContext, "documentFrameResult18" | "useCommentStore" | "callback2" | "isDatumPinThread" | "widgetAnchorOfThread" | "resolveWidgetBridgeLabel">): Dynamic {
  return ((..._extraArguments: unknown[]): undefined => {
      if (!__documentClosure.documentFrameResult18) return;
      let storeState11: Dynamic = __documentClosure.useCommentStore.getState();
      let mappedFilteredCallback: Dynamic = __documentClosure.callback2
        .filter(
          (event?: Dynamic, ..._extraArguments: unknown[]) =>
            event.id in storeState11.optimisticY &&
            ((0, __documentClosure.isDatumPinThread)(event) || !(0, __documentClosure.widgetAnchorOfThread)(event)) &&
            (0, __documentClosure.resolveWidgetBridgeLabel)(event) === undefined &&
            __documentClosure.documentFrameResult18[event.target?.pageId ?? ``] !== undefined,
        )
        .map(
          (
            filteredCallback?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => filteredCallback.id,
        );
      if (mappedFilteredCallback.length) {
        storeState11.dropOptimisticY(mappedFilteredCallback);
      }
    });
}

export function createDocumentFrameEffect15(__documentClosure: Pick<DocumentFrameContext, "callback2" | "documentFrameResult8" | "resolveWidgetBridgeLabel" | "useCommentStore" | "widgetBridgeLimit10002">): Dynamic {
  return ((..._extraArguments: unknown[]): Dynamic => {
      let mappedFilteredCallback: Dynamic = __documentClosure.callback2
        .filter(
          (callback10?: Dynamic, ..._extraArguments: unknown[]) =>
            callback10.id in __documentClosure.documentFrameResult8 &&
            (0, __documentClosure.resolveWidgetBridgeLabel)(callback10) !== undefined,
        )
        .map(
          (
            filteredCallback?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => filteredCallback.id,
        );
      if (mappedFilteredCallback.length === 0) return;
      let setTimeout2 = setTimeout(
        (..._extraArguments: unknown[]): Dynamic =>
          __documentClosure.useCommentStore.getState().dropOptimisticY(mappedFilteredCallback),
        __documentClosure.widgetBridgeLimit10002,
      );
      return (..._extraArguments: unknown[]) => clearTimeout(setTimeout2);
    });
}

export function createDocumentFrameScrollTo16(__documentClosure: Pick<DocumentFrameContext, "resolveWidgetBridgeLabel" | "focusMoveLosesEdit" | "useCommentStore" | "isDocumentSourcePromptIsCollapsed" | "readId" | "onRevealNode">): Dynamic {
  return ((
      event?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let matchesWidgetBridgeLabel =
        (0, __documentClosure.resolveWidgetBridgeLabel)(event) !== undefined && !event.resolved;
      if (
        matchesWidgetBridgeLabel &&
        ((0, __documentClosure.focusMoveLosesEdit)(__documentClosure.useCommentStore.getState(), event.id) ||
          (0, __documentClosure.isDocumentSourcePromptIsCollapsed)(options))
      )
        return;
      let id3: Dynamic = matchesWidgetBridgeLabel ? event.id : (0, __documentClosure.readId)(event);
      if (id3 === undefined) {
        (0, __documentClosure.onRevealNode)?.(event.target?.pageId ?? ``);
      } else {
        __documentClosure.useCommentStore.getState().scrollTo(id3);
      }
    });
}

export function createDocumentFrameScrollTo217(__documentClosure: Pick<DocumentFrameContext, "callback2" | "resolveWidgetBridgeLabel" | "scrollTo">): Dynamic {
  return (({ ["scrollTo2"]: ((
    documentFrame?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let callback10: Dynamic = documentFrame
      ? __documentClosure.callback2.find(
          (callback11?: Dynamic, ..._extraArguments: unknown[]) =>
            callback11.id === documentFrame,
        )
      : undefined;
    if (
      callback10 &&
      !callback10.resolved &&
      (0, __documentClosure.resolveWidgetBridgeLabel)(callback10) !== undefined
    ) {
      (0, __documentClosure.scrollTo)(callback10, options);
    }
  }) })["scrollTo2"]);
}

export function createDocumentFrameDocumentFrameHandler18(__documentClosure: Pick<DocumentFrameContext, "documentFrameResult5" | "documentFrameResult8">): Dynamic {
  return (({ ["documentFrameHandler"]: ((
    documentFrame?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let documentFrameResult36: Dynamic;
    for (let documentFrameResult37 of documentFrame.threads as Dynamic) {
      let documentFrameResultItem: Dynamic =
        __documentClosure.documentFrameResult5[documentFrameResult37.id] ??
        __documentClosure.documentFrameResult8[documentFrameResult37.id];
      if (
        documentFrameResultItem !== undefined &&
        (documentFrameResult36 === undefined ||
          documentFrameResultItem < documentFrameResult36)
      ) {
        documentFrameResult36 = documentFrameResultItem;
      }
    }
    return documentFrameResult36;
  }) })["documentFrameHandler"]);
}

export function createDocumentFrameMemoized519(__documentClosure: Pick<DocumentFrameContext, "React" | "nodeName" | "memoized2">): Dynamic {
  return ((0, __documentClosure.React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => {
      let nodeName3: Dynamic =
        __documentClosure.nodeName ??
        ((documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          documentFrame);
      return new (Map as Dynamic)(
        __documentClosure.memoized2.map(
          (memoized6?: Dynamic, ..._extraArguments: unknown[]): Dynamic => [
            memoized6.nodeId,
            nodeName3(memoized6.nodeId),
          ],
        ),
      );
    },
    [__documentClosure.memoized2, __documentClosure.nodeName],
  ));
}

export function createDocumentFrameDocumentFrameHandler320(__documentClosure: Pick<DocumentFrameContext, "documentFrameResult15" | "documentFrameResult13">): Dynamic {
  return (({ ["documentFrameHandler3"]: ((
    documentFrame?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    documentFrame.threads.some(
      (thread?: Dynamic, ..._extraArguments: unknown[]) =>
        thread.id === __documentClosure.documentFrameResult15 ||
        thread.id === __documentClosure.documentFrameResult13,
    )) })["documentFrameHandler3"]);
}

export function createDocumentFrameDocumentFrameHandler421(__documentClosure: Pick<DocumentFrameContext, "documentFrameResult5">): Dynamic {
  return (({ ["documentFrameHandler4"]: ((
    documentFrame?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    (
      documentFrame.threads.find(
        (thread?: Dynamic, ..._extraArguments: unknown[]) =>
          __documentClosure.documentFrameResult5[thread.id] !== undefined,
      ) ?? documentFrame.threads[0]
    ).id) })["documentFrameHandler4"]);
}

export function createDocumentFrameFlatMap22(__documentClosure: Pick<DocumentFrameContext, "documentFrameHandler4" | "storeState2">): Dynamic {
  return (({ ["flatMap"]: ((
    documentFrame?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let documentFrameHandler17: Dynamic = (0, __documentClosure.documentFrameHandler4)(documentFrame);
    (0, __documentClosure.storeState2)(
      documentFrameHandler17,
      documentFrame.threads.flatMap(
        (thread?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          thread.id === documentFrameHandler17 ? [] : [thread.id],
      ),
    );
  }) })["flatMap"]);
}

export function createDocumentFrameUpdatelookupRef_current23(__documentClosure: Pick<DocumentFrameContext, never>): Dynamic {
  return ((event?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        let pageId: Dynamic = event.target?.pageId ?? ``;
        return [
          [event.id, pageId],
          [event.root?.id ?? ``, pageId],
          ...event.replies.map(
            (reply?: Dynamic, ..._extraArguments: unknown[]): Dynamic => [
              reply.id,
              pageId,
            ],
          ),
        ];
      });
}

export function createDocumentFrameFocus24(__documentClosure: Pick<DocumentFrameContext, "focusMoveLosesEdit" | "useCommentStore" | "toast" | "COMMENT_DRAFT_BLOCKING_MESSAGE">): Dynamic {
  return ((documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      (0, __documentClosure.focusMoveLosesEdit)(__documentClosure.useCommentStore.getState(), documentFrame)
        ? (__documentClosure.toast.info(__documentClosure.COMMENT_DRAFT_BLOCKING_MESSAGE, {
            id: `edit-in-progress`,
          }),
          (document as Dynamic)
            .querySelector(
              `[data-testid="comment-edit"] [contenteditable="true"]`,
            )
            ?.focus(),
          true)
        : false);
}

export function createDocumentFrameOnExpand25(__documentClosure: Pick<DocumentFrameContext, "focus" | "recordRef" | "railSync" | "useCommentStore" | "resolveDataModelSchemasDocScrollMax" | "lookupRef" | "readOnly" | "documentRuntimeLimit48" | "documentRuntimeLimit75" | "onScrollDocRef" | "elementRef2" | "storeState" | "storeState2">): Dynamic {
  return ((documentFrame?: Dynamic, ..._extraArguments: unknown[]) => {
      if ((0, __documentClosure.focus)(documentFrame)) return false;
      let record4: Dynamic = __documentClosure.recordRef.current;
      let offset: Dynamic = __documentClosure.railSync?.offset() ?? 0;
      __documentClosure.railSync?.flush();
      let storeState11: Dynamic = __documentClosure.useCommentStore.getState();
      let key2: Dynamic =
        storeState11.renderKey[documentFrame] ?? documentFrame;
      let documentFrameHandler17: Dynamic = (
        documentFrame2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        documentFrame2 === undefined ? undefined : documentFrame2 + offset;
      let {
        dy: documentFrameResult36,
        shortfall: documentFrameResult37,
      }: Dynamic = (0, __documentClosure.resolveDataModelSchemasDocScrollMax)({
        live: record4.live,
        widget: __documentClosure.lookupRef.current.has(documentFrame),
        cardTop: documentFrameHandler17(record4.tops[key2]),
        anchorY: documentFrameHandler17(record4.ys[key2]),
        cardH: Math.max(
          record4.heights[key2] ?? 56,
          record4.fullHeights[key2] ?? 0,
        ),
        replyRoom: __documentClosure.readOnly
          ? 0
          : storeState11.frameSummon === null
            ? __documentClosure.documentRuntimeLimit48
            : __documentClosure.documentRuntimeLimit75,
        railH: record4.bodyH,
        docScrollY: __documentClosure.railSync?.docY() ?? storeState11.docScrollY,
        docScrollMax: storeState11.docScrollMax,
      });
      if (
        documentFrameResult36 !== 0 &&
        __documentClosure.onScrollDocRef.current?.(documentFrameResult36)
      ) {
        storeState11.predictDocScroll(documentFrameResult36);
        __documentClosure.railSync?.predict(documentFrameResult36);
      }
      __documentClosure.elementRef2.current = {
        key: key2,
        offset: -documentFrameResult37,
      };
      (0, __documentClosure.storeState)(documentFrame);
      (0, __documentClosure.storeState2)(documentFrame);
    });
}

export function createDocumentFrameEffect26(__documentClosure: Pick<DocumentFrameContext, "elementRef2" | "documentFrameResult13" | "useCommentStore">): Dynamic {
  return ((..._extraArguments: unknown[]): undefined => {
      let element: Dynamic = __documentClosure.elementRef2.current;
      if (
        element &&
        (__documentClosure.documentFrameResult13 === null ||
          (__documentClosure.useCommentStore.getState().renderKey[__documentClosure.documentFrameResult13] ??
            __documentClosure.documentFrameResult13) !== element.key)
      ) {
        __documentClosure.elementRef2.current = null;
      }
    });
}

export function createDocumentFrameOnReply27(__documentClosure: Pick<DocumentFrameContext, "lookupRef" | "widgetBlockOf" | "EditorSelectionAndTablesByFile2" | "fsEntryId" | "mintedThreadId" | "fileThreads" | "useCommentStore" | "canDisplayCommentUnanchored" | "resolveCommentsEditorToClaude" | "api" | "container" | "storeState5" | "callback7" | "CommentQueuedError">): Dynamic {
  return (async (
      documentFrame?: Dynamic,
      body?: Dynamic,
      context?: Dynamic,
      dependencies?: Dynamic,
      argument?: unknown,
      argument2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<undefined> => {
      let lookupEntry: Dynamic = __documentClosure.lookupRef.current.get(documentFrame);
      let bid: Dynamic =
        lookupEntry === undefined ? undefined : (0, __documentClosure.widgetBlockOf)?.(lookupEntry);
      let top: Dynamic =
        lookupEntry === undefined
          ? undefined
          : __documentClosure.EditorSelectionAndTablesByFile2.getState().byFile[__documentClosure.fsEntryId]?.[
              lookupEntry
            ]?.top;
      let documentFrameResult36: Dynamic = (0, __documentClosure.mintedThreadId)(documentFrame);
      let fileThread: Dynamic = __documentClosure.fileThreads.find(
        (fileThread2?: Dynamic, ..._extraArguments: unknown[]) =>
          fileThread2.id === documentFrame ||
          fileThread2.id === documentFrameResult36,
      );
      let storeState11: Dynamic = __documentClosure.useCommentStore.getState();
      let matchesFileThread =
        fileThread !== undefined &&
        lookupEntry === undefined &&
        (0, __documentClosure.canDisplayCommentUnanchored)(
          fileThread,
          storeState11.present,
          (documentFrame2?: Dynamic, ..._extraArguments: unknown[]) =>
            documentFrame2 in storeState11.optimisticY,
        );
      let record4: Dynamic = {
        ...(bid !== undefined && {
          block: {
            bid: bid,
          },
          ...(top !== undefined && {
            y: top,
          }),
        }),
        ...(0, __documentClosure.resolveCommentsEditorToClaude)(argument2),
        ...(matchesFileThread && {
          page: true,
        }),
      };
      let ccMention = (..._extraArguments: unknown[]): undefined => {
        let commentId: Dynamic = (0, __documentClosure.mintedThreadId)(documentFrame);
        let fileThread2: Dynamic = __documentClosure.fileThreads.find(
          (fileThread3?: Dynamic, ..._extraArguments: unknown[]) =>
            fileThread3.id === commentId || fileThread3.id === documentFrame,
        );
        for (let documentFrameResult37 of dependencies as Dynamic)
          __documentClosure.api
            .ccMention({
              sessionId: documentFrameResult37.sessionId,
              sessionName: documentFrameResult37.sessionName,
              container: __documentClosure.container,
              commentId: commentId,
              anchor: undefined,
              thread: fileThread2
                ? [
                    fileThread2.root.body,
                    ...fileThread2.replies.map(
                      (
                        reply?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): Dynamic => reply.body,
                    ),
                  ]
                : [],
              body: body,
            })
            .catch((..._extraArguments: unknown[]): undefined => {});
      };
      try {
        await (0, __documentClosure.storeState5)(
          __documentClosure.container,
          (0, __documentClosure.callback7)(documentFrame),
          documentFrame,
          body,
          context,
          Object.keys(record4).length > 0 ? record4 : undefined,
        );
      } catch (documentFrameResult37: Dynamic) {
        throw (
          documentFrameResult37 instanceof (__documentClosure.CommentQueuedError as Dynamic) &&
            documentFrameResult37.landed.then(
              ccMention,
              (..._extraArguments: unknown[]): undefined => {},
            ),
          documentFrameResult37
        );
      }
      ccMention();
    });
}

export function createDocumentFrameOnEdit28(__documentClosure: Pick<DocumentFrameContext, "storeState6" | "container" | "callback7" | "fileThreads" | "lookupRef" | "widgetBlockOf" | "EditorSelectionAndTablesByFile2" | "fsEntryId" | "useCommentStore" | "canDisplayCommentUnanchored">): Dynamic {
  return ((
      documentFrame?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      if (context?.toClaude !== true)
        return (0, __documentClosure.storeState6)(
          __documentClosure.container,
          (0, __documentClosure.callback7)(documentFrame),
          documentFrame,
          options,
        );
      let fileThread: Dynamic = __documentClosure.fileThreads.find(
        (fileThread2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          fileThread2.id === documentFrame ||
          fileThread2.replies.some(
            (reply?: Dynamic, ..._extraArguments: unknown[]) =>
              reply.id === documentFrame,
          ),
      );
      let id3: Dynamic = fileThread?.id ?? documentFrame;
      let lookupEntry: Dynamic = __documentClosure.lookupRef.current.get(id3);
      let bid: Dynamic =
        lookupEntry === undefined ? undefined : (0, __documentClosure.widgetBlockOf)?.(lookupEntry);
      let top: Dynamic =
        lookupEntry === undefined
          ? undefined
          : __documentClosure.EditorSelectionAndTablesByFile2.getState().byFile[__documentClosure.fsEntryId]?.[
              lookupEntry
            ]?.top;
      let storeState11: Dynamic = __documentClosure.useCommentStore.getState();
      let matchesFileThread =
        fileThread !== undefined &&
        lookupEntry === undefined &&
        (0, __documentClosure.canDisplayCommentUnanchored)(
          fileThread,
          storeState11.present,
          (documentFrame2?: Dynamic, ..._extraArguments: unknown[]) =>
            documentFrame2 in storeState11.optimisticY,
        );
      return (0, __documentClosure.storeState6)(
        __documentClosure.container,
        (0, __documentClosure.callback7)(documentFrame),
        documentFrame,
        options,
        {
          toClaude: true,
          ...(context.pressedAt !== undefined && {
            pressedAt: context.pressedAt,
          }),
          ...(bid !== undefined && {
            block: {
              bid: bid,
            },
            ...(top !== undefined && {
              y: top,
            }),
          }),
          ...(matchesFileThread && {
            page: true,
          }),
        },
      );
    });
}

export function createDocumentFrameOnReact29(__documentClosure: Pick<DocumentFrameContext, "React" | "storeState10" | "container" | "callback7">): Dynamic {
  return ((0, __documentClosure.React.useCallback)(
    (
      documentFrame?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined =>
      void (0, __documentClosure.storeState10)(
        __documentClosure.container,
        (0, __documentClosure.callback7)(documentFrame),
        documentFrame,
        options,
      ).catch((..._extraArguments: unknown[]): undefined => {}),
    [__documentClosure.storeState10, __documentClosure.container, __documentClosure.callback7],
  ));
}

export function createDocumentFrameOnUnreactRoot30(__documentClosure: Pick<DocumentFrameContext, "callback7" | "storeState6" | "container" | "REACTION_NOT_REMOVED_WORDS" | "useCommentStore" | "resolveCommentsEditorAgent" | "storeState10">): Dynamic {
  return (async (
      documentFrame?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<undefined> => {
      let callback10: Dynamic = (0, __documentClosure.callback7)(documentFrame);
      await (0, __documentClosure.storeState6)(
        __documentClosure.container,
        callback10,
        documentFrame,
        options,
        undefined,
        __documentClosure.REACTION_NOT_REMOVED_WORDS,
      );
      let storeState11: Dynamic = __documentClosure.useCommentStore.getState();
      let item: Dynamic = [
        ...(storeState11.byPage[callback10] ?? []),
        ...(storeState11.allByPage[callback10] ?? []),
      ].find(
        (file?: Dynamic, ..._extraArguments: unknown[]) =>
          file.root.id === documentFrame,
      );
      if (
        !(
          item === undefined ||
          item.root.body !== options ||
          !(0, __documentClosure.resolveCommentsEditorAgent)(item, options)
        )
      ) {
        await (0, __documentClosure.storeState10)(__documentClosure.container, callback10, documentFrame, options);
      }
    });
}

export function createDocumentFrameRecord31(__documentClosure: Pick<DocumentFrameContext, "room" | "readOnly" | "commentOnly2" | "onExpand" | "onReply" | "onEdit" | "onDelete" | "onReact" | "onCopyLink" | "onResolve" | "onReopen">): Dynamic {
  return ({
    enableCCSessions: true,
    refPid: __documentClosure.room?.pid,
    keepReplyDraft: true,
    readOnly: __documentClosure.readOnly,
    commentOnly: __documentClosure.commentOnly2,
    onExpand: __documentClosure.onExpand,
    onReply: __documentClosure.onReply,
    onEdit: __documentClosure.onEdit,
    onDelete: __documentClosure.onDelete,
    onReact: __documentClosure.onReact,
    onCopyLink: __documentClosure.onCopyLink,
    onResolve: __documentClosure.onResolve,
    onReopen: __documentClosure.onReopen,
  });
}

export function createDocumentFrameEffect32(__documentClosure: Pick<DocumentFrameContext, "updatePlatformAnnouncementsTimers">): Dynamic {
  return ((..._extraArguments: unknown[]): undefined => {
    (0, __documentClosure.updatePlatformAnnouncementsTimers)(document, {
      timers: {
        set: (
          documentFrame?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ) => setTimeout(documentFrame, options),
        clear: (documentFrame?: Dynamic, ..._extraArguments: unknown[]) =>
          clearTimeout(documentFrame),
      },
    });
  });
}

export function createDocumentFramePredict33(__documentClosure: Pick<DocumentFrameContext, "recordRef" | "railSyncRef" | "resolveDataModelSchemasRailTop" | "documentFrameLimit16" | "useCommentStore" | "onScrollDocRef">): Dynamic {
  return ((
      documentFrame?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let closest: Dynamic = documentFrame.closest(
        `[data-testid="ldoc-comments"]`,
      );
      if (!closest) return;
      if (
        !(
          closest.dataset.mode === `peek` &&
          documentFrame.matches(`[data-testid="comment-icon"]`)
        )
      ) {
        if (
          closest.dataset.mode !== `margin` ||
          closest.querySelector(`[data-rectless]`)
        ) {
          if (context) {
            documentFrame.scrollIntoView?.({
              block: `nearest`,
              inline: `nearest`,
            });
          }
          return;
        }
        if (!__documentClosure.recordRef.current.live) return;
      }
      let documentFrameBounds: Dynamic = documentFrame.getBoundingClientRect();
      let closestBounds: Dynamic = closest.getBoundingClientRect();
      if (
        !options &&
        documentFrameBounds.bottom > closestBounds.top &&
        documentFrameBounds.top < closestBounds.bottom
      )
        return;
      let railSync2: Dynamic = __documentClosure.railSyncRef.current;
      let documentFrameResult36 = (0, __documentClosure.resolveDataModelSchemasRailTop)({
        cardTop: documentFrameBounds.top,
        cardBottom: documentFrameBounds.bottom,
        railTop: closestBounds.top,
        railBottom: closestBounds.bottom,
        pad: __documentClosure.documentFrameLimit16,
        docScrollY: railSync2?.docY() ?? __documentClosure.useCommentStore.getState().docScrollY,
      });
      if (
        documentFrameResult36 !== 0 &&
        __documentClosure.onScrollDocRef.current?.(documentFrameResult36)
      ) {
        railSync2?.flush();
        __documentClosure.useCommentStore.getState().predictDocScroll(documentFrameResult36);
        railSync2?.predict(documentFrameResult36);
      }
    });
}

export function createDocumentFrameOnNavigate34(__documentClosure: Pick<DocumentFrameContext, "React" | "enabledRef3" | "predict">): Dynamic {
  return ((0, __documentClosure.React.useCallback)(
    (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let currentTarget: Dynamic = event.currentTarget;
      let closest: Dynamic = currentTarget.closest(
        `[data-testid="ldoc-comments"]`,
      );
      if (!closest) return;
      let toSorted2: Dynamic = [
        ...closest.querySelectorAll(`[data-comment-stop]`),
      ]
        .map(
          (
            item?: Dynamic,
            index?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => ({
            el: item,
            i: index,
            r: item.getBoundingClientRect(),
          }),
        )
        .toSorted(
          (
            mappedItem?: Dynamic,
            mappedItem2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            mappedItem.r.top - mappedItem2.r.top ||
            mappedItem.r.left - mappedItem2.r.left ||
            mappedItem.i - mappedItem2.i,
        );
      let toSortedIndex: Dynamic = toSorted2.findIndex(
        (toSorted3?: Dynamic, ..._extraArguments: unknown[]) =>
          toSorted3.el === currentTarget,
      );
      if (toSortedIndex < 0) return;
      let difference = toSorted2.length - 1;
      let min: Dynamic =
        event.key === `ArrowDown`
          ? Math.min(toSortedIndex + 1, difference)
          : event.key === `ArrowUp`
            ? Math.max(toSortedIndex - 1, 0)
            : event.key === `Home`
              ? 0
              : event.key === `End`
                ? difference
                : toSortedIndex;
      event.preventDefault();
      if (min !== toSortedIndex) {
        __documentClosure.enabledRef3.current = true;
        toSorted2[min].el.focus({
          preventScroll: true,
        });
        if (__documentClosure.enabledRef3.current) {
          __documentClosure.enabledRef3.current = false;
          (0, __documentClosure.predict)(toSorted2[min].el, true, true);
        }
      }
    },
    [__documentClosure.predict],
  ));
}

export function createDocumentFramePredict235(__documentClosure: Pick<DocumentFrameContext, "enabledRef3" | "enabledRef4" | "predict" | "enabledRef5">): Dynamic {
  return (({ ["predict2"]: ((
    documentFrame?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let enabled2: Dynamic = __documentClosure.enabledRef3.current;
    __documentClosure.enabledRef3.current = false;
    let enabled3: Dynamic = __documentClosure.enabledRef4.current;
    __documentClosure.enabledRef4.current = false;
    if (!enabled3) {
      (0, __documentClosure.predict)(documentFrame, enabled2, enabled2 || __documentClosure.enabledRef5.current);
    }
  }) })["predict2"]);
}

export function createDocumentFrameDocumentFrameHandler536(__documentClosure: Pick<DocumentFrameContext, never>): Dynamic {
  return (({ ["documentFrameHandler5"]: ((documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
    (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (
        !(
          (event.key !== `Enter` && event.key !== ` `) ||
          event.repeat ||
          event.nativeEvent.isComposing ||
          event.altKey ||
          event.ctrlKey ||
          event.metaKey
        )
      ) {
        if (event.target.matches?.(`[data-comment-stop]`)) {
          documentFrame();
        }
      }
    }) })["documentFrameHandler5"]);
}

export function createDocumentFrameDocumentFrameHandler637(__documentClosure: Pick<DocumentFrameContext, "storeState2" | "setStopId" | "predict2">): Dynamic {
  return (({ ["documentFrameHandler6"]: ((
      documentFrame?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
    (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      (0, __documentClosure.storeState2)(documentFrame, options);
      (0, __documentClosure.setStopId)(documentFrame);
      let target: Dynamic = event.target;
      if (target.matches?.(`[data-comment-stop]`)) {
        (0, __documentClosure.predict2)(target);
      }
    }) })["documentFrameHandler6"]);
}

export function createDocumentFrameDocumentFrameHandler738(__documentClosure: Pick<DocumentFrameContext, "flatMap" | "setStopId" | "predict2">): Dynamic {
  return (({ ["documentFrameHandler7"]: ((documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
    (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      (0, __documentClosure.flatMap)(documentFrame);
      (0, __documentClosure.setStopId)(`node:${documentFrame.nodeId}`);
      let target: Dynamic = event.target;
      if (target.matches?.(`[data-comment-stop]`)) {
        (0, __documentClosure.predict2)(target);
      }
    }) })["documentFrameHandler7"]);
}

export function createDocumentFrameOnFocus39(__documentClosure: Pick<DocumentFrameContext, "setStopId" | "predict2">): Dynamic {
  return (({ ["onFocus"]: ((event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let closest: Dynamic = event.target.closest(`[data-comment-stop]`);
    if (closest?.dataset.stopId) {
      (0, __documentClosure.setStopId)(closest.dataset.stopId);
      if (event.target === closest) {
        (0, __documentClosure.predict2)(closest);
      }
    }
  }) })["onFocus"]);
}

export function createDocumentFrameDocumentFrameHandler840(__documentClosure: Pick<DocumentFrameContext, "useCommentStore" | "storeState2">): Dynamic {
  return (({ ["documentFrameHandler8"]: ((documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
    (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        if (__documentClosure.useCommentStore.getState().activeId === documentFrame) {
          (0, __documentClosure.storeState2)(null);
        }
      }
    }) })["documentFrameHandler8"]);
}

export function createDocumentFrameEffect41(__documentClosure: Pick<DocumentFrameContext, "enabledRef5">): Dynamic {
  return ((..._extraArguments: unknown[]): Dynamic => {
    let updateEnabled: Dynamic = (..._extraArguments: unknown[]) =>
      (__documentClosure.enabledRef5.current = true);
    let updateEnabled2: Dynamic = (..._extraArguments: unknown[]) =>
      (__documentClosure.enabledRef5.current = false);
    window.addEventListener(`keydown`, updateEnabled, true);
    window.addEventListener(`pointerdown`, updateEnabled2, true);
    window.addEventListener(`mousedown`, updateEnabled2, true);
    return (..._extraArguments: unknown[]): undefined => {
      window.removeEventListener(`keydown`, updateEnabled, true);
      window.removeEventListener(`pointerdown`, updateEnabled2, true);
      window.removeEventListener(`mousedown`, updateEnabled2, true);
    };
  });
}

export function createDocumentFrameDocumentFrameHandler942(__documentClosure: Pick<DocumentFrameContext, "elementRef3">): Dynamic {
  return (({ ["documentFrameHandler9"]: ((
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let element: Dynamic = __documentClosure.elementRef3.current;
    return element?.isConnected &&
      (element.dataset.mode === `list` ||
        element.dataset.mode === `list-popover`)
      ? element
      : null;
  }) })["documentFrameHandler9"]);
}

export function createDocumentFrameEffect43(__documentClosure: Pick<DocumentFrameContext, "mode" | "takeCommentListReturn" | "documentFrameHandler9">): Dynamic {
  return ((..._extraArguments: unknown[]): undefined => {
      if (__documentClosure.mode !== `list`) return;
      let takeCommentListReturn2: Dynamic = (0, __documentClosure.takeCommentListReturn)();
      let documentFrameHandler17: Dynamic = takeCommentListReturn2
        ? (0, __documentClosure.documentFrameHandler9)()
        : null;
      if (!takeCommentListReturn2 || !documentFrameHandler17) return;
      let removeEventListener = (..._extraArguments: unknown[]): undefined => {
        documentFrameHandler17.removeAttribute(`data-focus-ring-off`);
        documentFrameHandler17.removeEventListener(`blur`, removeEventListener);
        documentFrameHandler17.removeEventListener(
          `keydown`,
          removeEventListener,
        );
      };
      removeEventListener();
      if (
        documentFrameHandler17.ownerDocument.activeElement ===
        documentFrameHandler17
      ) {
        documentFrameHandler17.blur();
      }
      documentFrameHandler17.focus({
        preventScroll: true,
        focusVisible: takeCommentListReturn2.ring,
      });
      if (
        !(
          takeCommentListReturn2.ring ||
          documentFrameHandler17.ownerDocument.activeElement !==
            documentFrameHandler17
        )
      ) {
        documentFrameHandler17.setAttribute(`data-focus-ring-off`, ``);
        documentFrameHandler17.addEventListener(`blur`, removeEventListener);
        documentFrameHandler17.addEventListener(`keydown`, removeEventListener);
      }
    });
}

export function createDocumentFrameEffect44(__documentClosure: Pick<DocumentFrameContext, "elementRef3" | "enabledRef5" | "isDocumentFrameMatches" | "iconLaneRef" | "elementRef4" | "elementRef5">): Dynamic {
  return ((..._extraArguments: unknown[]): Dynamic => {
    let closest = (
      event?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let target: Dynamic = event.target;
      let element: Dynamic = __documentClosure.elementRef3.current;
      if (target)
        if (element?.contains(target)) {
          let enabled2: Dynamic =
            __documentClosure.enabledRef5.current ||
            ((0, __documentClosure.isDocumentFrameMatches)(target) &&
              !target.isContentEditable &&
              !target.matches(`input, textarea`));
          let margin: Dynamic =
            element.dataset.mode === `margin` ||
            (element.dataset.mode === `peek` && __documentClosure.iconLaneRef.current);
          __documentClosure.elementRef4.current = enabled2
            ? {
                el: target,
                margin: margin,
              }
            : null;
          let closest2: Dynamic = target.closest(`[data-comment-stop]`);
          if (closest2) {
            __documentClosure.elementRef5.current = [
              ...element.querySelectorAll(`[data-comment-stop]`),
            ].indexOf(closest2);
          }
        } else if (target.closest(`#root`)) {
          __documentClosure.elementRef4.current = null;
        }
    };
    let updateElement5: Dynamic = (..._extraArguments: unknown[]) =>
      (__documentClosure.elementRef4.current = null);
    document.addEventListener(`focusin`, closest, true);
    document.addEventListener(`pointerdown`, updateElement5, true);
    document.addEventListener(`mousedown`, updateElement5, true);
    return (..._extraArguments: unknown[]): undefined => {
      document.removeEventListener(`focusin`, closest, true);
      document.removeEventListener(`pointerdown`, updateElement5, true);
      document.removeEventListener(`mousedown`, updateElement5, true);
    };
  });
}
