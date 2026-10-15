/** BaoCut: extracted comment frame surfaces expressions; state remains owned by the original closure. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import type { DocumentFrameContext } from "./context";

export function createDocumentFrameJsxs4111(__documentClosure: Pick<DocumentFrameContext, "elementRef7" | "draft" | "readOnly" | "memoized3" | "memoized2" | "callback2" | "UseDocumentSourcePromptDraftComponent" | "LdocCommentDraftClamped" | "CommentReplyComposer" | "originalJsxProps" | "placeholder" | "ariaLabel" | "claudeRoute" | "suggestions" | "returnAddsLine" | "room" | "sendHeld" | "documentFrameState" | "onPost" | "onCancel" | "resolveDocumentFrameNodeId" | "documentFrameHandler14" | "toSorted" | "open" | "React" | "controlId" | "Collapsible" | "onOpenChange" | "onKeyDown" | "CommentAnchors_Resolved" | "onOpen" | "flatMap" | "storeState2" | "documentFrameHandler7" | "documentFrameHandler8" | "documentFrameHandler4" | "NodeThreadsCard" | "memoized5" | "documentFrameHandler3" | "onRevealNode" | "onNavigate" | "fsEntryId3" | "isDetachedResolvedComment2" | "forceList" | "commentAttachmentState3" | "readId2" | "isWholeDocumentComment2" | "focus" | "useCommentStore" | "storeState" | "storeState4" | "scrollTo" | "storeState3" | "documentFrameResult15" | "documentFrameResult13" | "documentFrameHandler6" | "isDocumentFrameCurrentTarget" | "elementRef32" | "resolveDocumentFrameTarget" | "documentFrameHandler5" | "resolveCommentsEditorReactionOnly" | "ReactionChip" | "callback6" | "resolveDocumentSourcePromptValue2" | "documentFrameResult6" | "documentFrameResult7" | "isWholeDocumentComment" | "DocumentSourcePrompt_WholeDocument" | "quoteWords" | "onReact" | "onDelete" | "onUnreactRoot" | "onResolve" | "onReopen" | "commentOnly2" | "hintId2" | "CiteOutcomeChip" | "record" | "resolveDocumentSourcePromptTarget3" | "callback5" | "hintId" | "documentFrameHandler10">): Dynamic {
  return (<div
      ref={__documentClosure.elementRef7}
      role={
        (__documentClosure.draft && !__documentClosure.readOnly) ||
        __documentClosure.memoized3.length > 0 ||
        __documentClosure.memoized2.length > 0 ||
        __documentClosure.callback2.length > 0
          ? `list`
          : undefined
      }
      className={`min-h-0 flex-1 divide-y overflow-y-auto overscroll-contain [--comment-fade-stop:var(--cds-surface-panel)] [--cds-comment-card-bg:var(--comment-fade-stop)]`}
    >
      {__documentClosure.draft && !__documentClosure.readOnly && (
        <div
          role={`listitem`}
          className={`bg-alpha-1 p-3`}
          data-testid={`ldoc-comment-draft`}
        >
          <__documentClosure.UseDocumentSourcePromptDraftComponent draft={__documentClosure.draft} />
          {__documentClosure.draft.clamped && <__documentClosure.LdocCommentDraftClamped />}
          <__documentClosure.CommentReplyComposer
            {...(0, __documentClosure.originalJsxProps)(
              {
                placeholder: __documentClosure.placeholder,
                layout: `composer`,
                ariaLabel: __documentClosure.ariaLabel,
                claudeRoute: __documentClosure.claudeRoute,
                addressClaude: __documentClosure.draft.ask === true,
                suggestions: __documentClosure.suggestions,
                composerChrome: `flush`,
                returnAddsLine: __documentClosure.returnAddsLine,
                autoFocus: true,
                enableCCSessions: true,
                refPid: __documentClosure.room?.pid,
                boxId: `__compose`,
                sendHeld: __documentClosure.sendHeld,
                initial:
                  __documentClosure.documentFrameState?.nonce === __documentClosure.draft.nonce
                    ? __documentClosure.documentFrameState.body
                    : undefined,
                onPost: __documentClosure.onPost,
                onCancel: __documentClosure.onCancel,
              },
              (0, __documentClosure.resolveDocumentFrameNodeId)(__documentClosure.draft),
            )}
          />
        </div>
      )}
      {__documentClosure.memoized3.length === 0 &&
        __documentClosure.memoized2.length === 0 &&
        __documentClosure.callback2.length === 0 &&
        !__documentClosure.draft && (
          <div
            className={`text-muted py-6 text-center text-xs`}
          >{`No comments`}</div>
        )}
      {((documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        let filteredDocumentFrame: Dynamic = documentFrame.filter(
          (item?: unknown, index?: Dynamic, ..._extraArguments: unknown[]) =>
            (0, __documentClosure.documentFrameHandler14)(__documentClosure.toSorted[index]) === 0,
        );
        let filteredDocumentFrame2: Dynamic = documentFrame.filter(
          (item?: unknown, index?: Dynamic, ..._extraArguments: unknown[]) =>
            (0, __documentClosure.documentFrameHandler14)(__documentClosure.toSorted[index]) === 1,
        );
        if (filteredDocumentFrame2.length === 0) return filteredDocumentFrame;
        let mappedFilteredDocumentFrame: Dynamic = __documentClosure.open
          ? filteredDocumentFrame2.map(
              (event?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                (0, __documentClosure.React.cloneElement)(event, {
                  id: `${__documentClosure.controlId}-${String(event.key)}`,
                }),
            )
          : [];
        return [
          ...filteredDocumentFrame,
          <div
            {...(0, __documentClosure.originalJsxProps)(
              {
                role: `listitem`,
                "data-testid": `ldoc-comments-resolved`,
                className: `border-b-0`,
                children: (
                  <__documentClosure.Collapsible.Root open={__documentClosure.open} onOpenChange={__documentClosure.onOpenChange}>
                    <__documentClosure.Collapsible.Trigger
                      caretPosition={`end`}
                      aria-controls={
                        __documentClosure.open
                          ? mappedFilteredDocumentFrame
                              .map(
                                (
                                  mappedFilteredDocumentFrame2?: Dynamic,
                                  ..._extraArguments: unknown[]
                                ): Dynamic =>
                                  mappedFilteredDocumentFrame2.props.id,
                              )
                              .join(` `)
                          : undefined
                      }
                      data-testid={`ldoc-comments-resolved-fold`}
                      onKeyDown={__documentClosure.onKeyDown}
                      className={`w-full px-lg py-md text-body font-medium text-primary`}
                    >{`${__documentClosure.CommentAnchors_Resolved} (${filteredDocumentFrame2.length})`}</__documentClosure.Collapsible.Trigger>
                  </__documentClosure.Collapsible.Root>
                ),
              },
              `resolved-section`,
            )}
          />,
          ...mappedFilteredDocumentFrame,
        ];
      })(
        __documentClosure.toSorted.map((toSorted2?: Dynamic, ..._extraArguments: unknown[]) => {
          if (toSorted2.g) {
            let g5: Dynamic = toSorted2.g;
            return (
              <div
                {...(0, __documentClosure.originalJsxProps)(
                  {
                    role: `listitem`,
                    className: `py-md hover:bg-alpha-1${__documentClosure.onOpen ? ` cursor-pointer` : ``}`,
                    onClick: (
                      event?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): undefined => {
                      if (event.target === event.currentTarget) {
                        (0, __documentClosure.onOpen)?.(g5.nodeId);
                      }
                    },
                    onMouseEnter: (..._extraArguments: unknown[]) =>
                      (0, __documentClosure.flatMap)(g5),
                    onMouseLeave: (..._extraArguments: unknown[]): Dynamic =>
                      (0, __documentClosure.storeState2)(null),
                    onFocus: (0, __documentClosure.documentFrameHandler7)(g5),
                    onBlur: (0, __documentClosure.documentFrameHandler8)((0, __documentClosure.documentFrameHandler4)(g5)),
                    children: (
                      <__documentClosure.NodeThreadsCard
                        flat={true}
                        nodeId={g5.nodeId}
                        name={__documentClosure.memoized5.get(g5.nodeId) ?? g5.nodeId}
                        count={g5.count}
                        latest={g5.latest}
                        active={(0, __documentClosure.documentFrameHandler3)(g5)}
                        onOpen={__documentClosure.onOpen}
                        onReveal={__documentClosure.onRevealNode}
                        onNavigate={__documentClosure.onNavigate}
                        tabStop={__documentClosure.fsEntryId3 === `node:${g5.nodeId}`}
                      />
                    ),
                  },
                  `node:${g5.nodeId}`,
                )}
              />
            );
          }
          let t5: Dynamic = toSorted2.t;
          let orphan: Dynamic = !toSorted2.w && (0, __documentClosure.isDetachedResolvedComment2)(t5);
          let returnAddsLine2: Dynamic =
            __documentClosure.returnAddsLine &&
            !__documentClosure.forceList &&
            !t5.resolved &&
            !(0, __documentClosure.commentAttachmentState3)(t5) &&
            (toSorted2.w
              ? !(0, __documentClosure.isDetachedResolvedComment2)(t5) && (0, __documentClosure.readId2)(t5) !== undefined
              : (0, __documentClosure.isWholeDocumentComment2)(t5) !== undefined);
          let getState2 = (..._extraArguments: unknown[]): undefined => {
            if ((0, __documentClosure.focus)(t5.id)) return;
            let storeState11: Dynamic = __documentClosure.useCommentStore.getState();
            let returnAddsLine3: Dynamic =
              returnAddsLine2 &&
              !storeState11.draftAnchor &&
              storeState11.dirtyEditors.size === 0;
            (0, __documentClosure.storeState)(t5.id);
            (0, __documentClosure.storeState2)(t5.id);
            if (returnAddsLine3) {
              (0, __documentClosure.storeState4)(`margin`);
              return;
            }
            if (toSorted2.w) {
              (0, __documentClosure.scrollTo)(t5);
            } else {
              (0, __documentClosure.storeState3)(t5.id);
            }
          };
          return (
            <div
              {...(0, __documentClosure.originalJsxProps)(
                {
                  role: `listitem`,
                  "data-thread-id": t5.id,
                  "data-detached": orphan || undefined,
                  "data-lit":
                    (__documentClosure.documentFrameResult15 === t5.id &&
                      __documentClosure.documentFrameResult13 !== t5.id) ||
                    undefined,
                  onMouseEnter: (..._extraArguments: unknown[]): Dynamic =>
                    (0, __documentClosure.storeState2)(t5.id),
                  onMouseLeave: (..._extraArguments: unknown[]): Dynamic =>
                    (0, __documentClosure.storeState2)(null),
                  onFocus: (0, __documentClosure.documentFrameHandler6)(t5.id),
                  onBlur: (0, __documentClosure.documentFrameHandler8)(t5.id),
                  onMouseDown: (
                    event?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): undefined => {
                    let isDocumentFrameCurrentTarget2: Dynamic =
                      (0, __documentClosure.isDocumentFrameCurrentTarget)(
                        event,
                        __documentClosure.documentFrameResult13 === t5.id,
                      );
                    __documentClosure.elementRef32.current = isDocumentFrameCurrentTarget2
                      ? t5.id
                      : null;
                    if (isDocumentFrameCurrentTarget2) {
                      event.preventDefault();
                      isDocumentFrameCurrentTarget2.focus();
                    }
                  },
                  onClick: (
                    documentFrame?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): undefined => {
                    let documentFrameTarget: Dynamic =
                      (0, __documentClosure.resolveDocumentFrameTarget)(documentFrame) &&
                      __documentClosure.elementRef32.current === t5.id;
                    __documentClosure.elementRef32.current = null;
                    if (
                      !documentFrameTarget &&
                      !(0, __documentClosure.isDocumentFrameCurrentTarget)(
                        documentFrame,
                        __documentClosure.documentFrameResult13 === t5.id,
                      )
                    ) {
                      getState2();
                    }
                  },
                  onKeyDown: (0, __documentClosure.documentFrameHandler5)(getState2),
                  className: (0, __documentClosure.resolveCommentsEditorReactionOnly)(t5)
                    ? `py-md hover:bg-alpha-1 hover:[--comment-hover-tint:var(--cds-alpha-1)] [@media(hover:hover)]:not-focus-within:data-[lit]:bg-alpha-1 [@media(hover:hover)]:not-focus-within:data-[lit]:[--comment-hover-tint:var(--cds-alpha-1)] has-[[data-expanded]]:bg-alpha-2 has-[[data-expanded]]:[--comment-hover-tint:var(--cds-alpha-2)] cursor-pointer ${t5.resolved ? `opacity-70` : ``}`
                    : `[@media(not_(hover:hover))]:[--cds-comment-card-hover-tint:transparent] [&:focus-within:not(:hover):not(:has([data-expanded]))]:[--cds-comment-card-hover-tint:transparent] has-[[data-expanded]]:[--cds-comment-card-hover-tint:var(--cds-alpha-2)] cursor-pointer ${t5.resolved ? `opacity-70` : ``}`,
                  children: (0, __documentClosure.resolveCommentsEditorReactionOnly)(t5) ? (
                    <div className={`p-3`}>
                      <__documentClosure.ReactionChip
                        t={t5}
                        active={__documentClosure.documentFrameResult15 === t5.id}
                        showLabel={true}
                        quote={
                          toSorted2.w
                            ? (0, __documentClosure.callback6)(t5)
                            : ((0, __documentClosure.resolveDocumentSourcePromptValue2)(
                                t5,
                                __documentClosure.documentFrameResult6,
                                __documentClosure.documentFrameResult7,
                              ) ??
                              ((0, __documentClosure.isWholeDocumentComment)(t5)
                                ? __documentClosure.DocumentSourcePrompt_WholeDocument
                                : (0, __documentClosure.quoteWords)(t5.target.quote?.exact)))
                        }
                        onReact={__documentClosure.onReact}
                        onDelete={__documentClosure.onDelete}
                        onUnreactRoot={__documentClosure.onUnreactRoot}
                        onResolve={__documentClosure.onResolve}
                        onReopen={__documentClosure.onReopen}
                        readOnly={__documentClosure.readOnly}
                        commentOnly={__documentClosure.commentOnly2}
                        tabStop={__documentClosure.fsEntryId3 === t5.id}
                        onNavigate={__documentClosure.onNavigate}
                        hintId={__documentClosure.hintId2}
                      />
                    </div>
                  ) : (
                    <__documentClosure.CiteOutcomeChip
                      {...(0, __documentClosure.originalJsxProps)({
                        t: t5,
                        ...__documentClosure.record,
                        flat: true,
                        tuckReplies: true,
                        chrome: `cds`,
                        touch: __documentClosure.returnAddsLine,
                        replyRoad: __documentClosure.returnAddsLine ? `sheet` : `box`,
                        active: __documentClosure.documentFrameResult15 === t5.id,
                        expanded: __documentClosure.documentFrameResult13 === t5.id,
                        quote: toSorted2.w
                          ? (0, __documentClosure.callback6)(t5)
                          : (0, __documentClosure.resolveDocumentSourcePromptTarget3)(
                              t5,
                              __documentClosure.documentFrameResult7,
                            ),
                        chartLine: toSorted2.w ? (0, __documentClosure.callback5)(t5) : undefined,
                        orphan: orphan,
                        wholePage: !toSorted2.w && (0, __documentClosure.isWholeDocumentComment)(t5),
                        anchorLabel:
                          toSorted2.w || orphan
                            ? undefined
                            : (0, __documentClosure.resolveDocumentSourcePromptValue2)(
                                t5,
                                __documentClosure.documentFrameResult6,
                                __documentClosure.documentFrameResult7,
                              ),
                        away: true,
                        onNavigate: __documentClosure.onNavigate,
                        hintId: __documentClosure.hintId,
                        tabStop: __documentClosure.fsEntryId3 === t5.id,
                      })}
                    />
                  ),
                },
                (0, __documentClosure.documentFrameHandler10)(t5),
              )}
            />
          );
        }),
      )}
    </div>);
}

export function createDocumentFrameJsxs5112(__documentClosure: Pick<DocumentFrameContext, "draft" | "readOnly" | "jsxRuntime" | "UseDocumentSourcePromptDraftComponent" | "LdocCommentDraftClamped" | "CommentReplyComposer" | "originalJsxProps" | "placeholder" | "ariaLabel" | "claudeRoute" | "suggestions" | "setDocumentFrameState4" | "room" | "sendHeld" | "documentFrameState" | "onPost" | "onCancel" | "resolveDocumentFrameNodeId">): Dynamic {
  return (({ ["jsxs5"]: ((
    documentFrame?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    __documentClosure.draft &&
    !__documentClosure.readOnly && (
      <__documentClosure.jsxRuntime.Fragment>
        <__documentClosure.UseDocumentSourcePromptDraftComponent draft={__documentClosure.draft} />
        {__documentClosure.draft.clamped && <__documentClosure.LdocCommentDraftClamped />}
        <__documentClosure.CommentReplyComposer
          {...(0, __documentClosure.originalJsxProps)(
            {
              placeholder: __documentClosure.placeholder,
              layout: `composer`,
              ariaLabel: __documentClosure.ariaLabel,
              claudeRoute: __documentClosure.claudeRoute,
              addressClaude: __documentClosure.draft.ask === true,
              suggestions: __documentClosure.suggestions,
              composerChrome: documentFrame === `sheet` ? `cds` : documentFrame,
              checkboxSeat: documentFrame === `sheet` ? `header` : undefined,
              onDraftNames:
                documentFrame === `sheet` ? __documentClosure.setDocumentFrameState4 : undefined,
              autoFocus: true,
              enableCCSessions: true,
              refPid: __documentClosure.room?.pid,
              boxId: `__compose`,
              sendHeld: __documentClosure.sendHeld,
              initial:
                __documentClosure.documentFrameState?.nonce === __documentClosure.draft.nonce
                  ? __documentClosure.documentFrameState.body
                  : undefined,
              onPost: __documentClosure.onPost,
              onCancel: __documentClosure.onCancel,
            },
            (0, __documentClosure.resolveDocumentFrameNodeId)(__documentClosure.draft),
          )}
        />
      </__documentClosure.jsxRuntime.Fragment>
    )) })["jsxs5"]);
}

export function createDocumentFrameJsxs7113(__documentClosure: Pick<DocumentFrameContext, "jsxs6" | "matchesCds" | "elementRef21" | "Surface" | "elementRef20" | "jsxs5">): Dynamic {
  return (__documentClosure.jsxs6 &&
    (__documentClosure.matchesCds ? (
      __documentClosure.elementRef21.current?.framed === true ? (
        <__documentClosure.Surface ref={__documentClosure.elementRef20} elevation={`panel`} className={`p-lg`}>
          {(0, __documentClosure.jsxs5)(`cds`)}
        </__documentClosure.Surface>
      ) : (
        <div ref={__documentClosure.elementRef20} className={`rounded-card`}>
          {(0, __documentClosure.jsxs5)(`cds`)}
        </div>
      )
    ) : (
      <div
        ref={__documentClosure.elementRef20}
        className={`bg-surface-1 shadow-card-active rounded-[10px] p-3`}
      >
        {__documentClosure.jsxs6}
      </div>
    )));
}

export function createDocumentFrameLookup114(__documentClosure: Pick<DocumentFrameContext, "rail2" | "callback2" | "documentFrameHandler10" | "memoized2" | "icons">): Dynamic {
  return (new (Map as Dynamic)([
    ...[...__documentClosure.rail2, ...__documentClosure.callback2].map(
      (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => [
        (0, __documentClosure.documentFrameHandler10)(item),
        item.id,
      ],
    ),
    ...__documentClosure.memoized2.map((memoized6?: Dynamic, ..._extraArguments: unknown[]) => [
      `node:${memoized6.nodeId}`,
      `node:${memoized6.nodeId}`,
    ]),
    ...__documentClosure.icons.map((icon?: Dynamic, ..._extraArguments: unknown[]) => [
      `folded:${icon.heading}`,
      `folded:${icon.heading}`,
    ]),
  ]));
}

export function createDocumentFrameFsEntryId4115(__documentClosure: Pick<DocumentFrameContext, "fsEntryId2" | "mapDocumentSelectionTops2" | "lookup" | "rectless" | "lookup2" | "resolveDataModelSchemasValue11" | "tops" | "bodyH" | "documentFrameLimit16">): Dynamic {
  return ((0, __documentClosure.fsEntryId2)(
    __documentClosure.mapDocumentSelectionTops2.order.flatMap(
      (order2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        __documentClosure.lookup.has(order2) ? [__documentClosure.lookup.get(order2)] : [],
    ),
    __documentClosure.rectless
      ? undefined
      : (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          let lookupEntry: Dynamic = __documentClosure.lookup2.get(documentFrame);
          return (0, __documentClosure.resolveDataModelSchemasValue11)(
            lookupEntry === undefined ? undefined : __documentClosure.tops[lookupEntry],
            __documentClosure.bodyH,
            __documentClosure.documentFrameLimit16,
            lookupEntry?.startsWith(`folded:`) ? 26 : 48,
          );
        },
  ));
}

export function createDocumentFrameJsxs8116(__documentClosure: Pick<DocumentFrameContext, "observe3" | "rectless" | "composeFloat" | "height" | "setDocumentFrameState8" | "draft" | "readOnly" | "callback9" | "isDocumentSelectionValue" | "documentFrameResult4" | "heights" | "bodyH" | "tops" | "jsxs7" | "icons" | "rail" | "resolveDataModelSchemasReduce" | "originalJsxProps" | "useDocumentFrameKey2" | "useDocumentFrameKey3" | "Tooltip" | "resolveDocumentRuntimeValue10" | "resolveCommentComponentsCount" | "resolveDocumentSourcePromptCells" | "documentFrameResult6" | "documentFrameResult7" | "fsEntryId4" | "onNavigate" | "onExpand" | "elementRef9" | "setStopId" | "predict2" | "UiOverlaysAndIconsCustomIcon" | "memoized2" | "flatMap" | "storeState2" | "documentFrameHandler7" | "documentFrameHandler8" | "documentFrameHandler4" | "NodeThreadsCard" | "memoized5" | "documentFrameHandler3" | "onOpen" | "onRevealNode" | "memoized3" | "commentAttachmentState3" | "documentFrameHandler12" | "documentFrameHandler10" | "documentFrameResult13" | "documentFrameHandler6" | "resolveCommentsEditorReactionOnly" | "ReactionChip" | "documentFrameResult15" | "isWholeDocumentComment" | "resolveDocumentSourcePromptValue2" | "DocumentSourcePrompt_WholeDocument" | "hintId2" | "onReact" | "onDelete" | "onUnreactRoot" | "onResolve" | "onReopen" | "commentOnly2" | "CiteOutcomeChip" | "record" | "hintId" | "compact" | "callback2" | "scrollTo" | "documentFrameHandler5" | "callback6" | "callback5">): Dynamic {
  return (<div
      ref={__documentClosure.observe3}
      data-rectless={__documentClosure.rectless || undefined}
      className={`relative isolate -ml-6 min-h-0 flex-1 pl-6 ${__documentClosure.rectless ? `pointer-events-auto overflow-y-auto` : `overflow-clip`}`}
    >
      {!__documentClosure.composeFloat && __documentClosure.rectless && (
        <div
          style={{
            height: __documentClosure.height,
          }}
          aria-hidden={true}
        />
      )}
      <div
        ref={__documentClosure.setDocumentFrameState8}
        className={`absolute inset-0`}
        data-testid={`ldoc-rail-layer`}
      >
        {__documentClosure.draft && !__documentClosure.readOnly && (
          <div
            ref={(0, __documentClosure.callback9)(`__draft`)}
            className={
              __documentClosure.composeFloat
                ? `pointer-events-auto absolute right-3 left-6`
                : `pointer-events-auto absolute right-6 left-9`
            }
            style={
              __documentClosure.composeFloat
                ? {
                    top: (0, __documentClosure.isDocumentSelectionValue)(
                      __documentClosure.documentFrameResult4 ?? 80,
                      __documentClosure.heights.__draft ?? 0,
                      __documentClosure.bodyH,
                    ),
                  }
                : {
                    top: __documentClosure.tops.__draft ?? Math.max(0, __documentClosure.documentFrameResult4 ?? 0),
                  }
            }
            data-testid={`ldoc-comment-draft`}
          >
            {__documentClosure.jsxs7}
          </div>
        )}
        {!__documentClosure.composeFloat &&
          __documentClosure.icons.map((icon?: Dynamic, ..._extraArguments: unknown[]) => {
            let dataStopId = `folded:${icon.heading}`;
            let flatMap2: Dynamic = icon.ids.flatMap(
              (id3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                __documentClosure.rail.filter(
                  (rail3?: Dynamic, ..._extraArguments: unknown[]) =>
                    rail3.id === id3,
                ),
            );
            let count: Dynamic = (0, __documentClosure.resolveDataModelSchemasReduce)(flatMap2);
            let flatMapItem: Dynamic = flatMap2[0];
            return flatMapItem ? (
              <div
                {...(0, __documentClosure.originalJsxProps)(
                  {
                    ref: (0, __documentClosure.callback9)(dataStopId),
                    className: `pointer-events-auto absolute left-9 ${(0, __documentClosure.useDocumentFrameKey2)(dataStopId)}`,
                    style: {
                      top: __documentClosure.tops[dataStopId] ?? icon.y,
                      ...(0, __documentClosure.useDocumentFrameKey3)(dataStopId),
                    },
                    children: (
                      <__documentClosure.Tooltip
                        content={(0, __documentClosure.resolveDocumentRuntimeValue10)(count)}
                        side={`left`}
                      >
                        <button
                          type={`button`}
                          data-testid={`comment-icon-folded`}
                          data-threads={icon.ids.join(` `)}
                          data-heading={icon.heading}
                          aria-label={(0, __documentClosure.resolveCommentComponentsCount)({
                            count: count,
                            threads: flatMap2.length,
                            place: (0, __documentClosure.resolveDocumentSourcePromptCells)(
                              flatMapItem,
                              __documentClosure.documentFrameResult6,
                              __documentClosure.documentFrameResult7,
                            ),
                          })}
                          className={`text-secondary hover:text-primary hover:bg-alpha-1 inline-flex items-center gap-1 rounded px-1 transition-colors`}
                          style={{
                            height: 26,
                          }}
                          data-comment-stop={``}
                          data-stop-id={dataStopId}
                          tabIndex={__documentClosure.fsEntryId4 === dataStopId ? 0 : -1}
                          onKeyDown={(
                            event?: Dynamic,
                            ..._extraArguments: unknown[]
                          ): undefined => {
                            if (
                              !(
                                event.altKey ||
                                event.ctrlKey ||
                                event.metaKey ||
                                event.shiftKey
                              )
                            ) {
                              if (
                                event.key === `ArrowDown` ||
                                event.key === `ArrowUp` ||
                                event.key === `Home` ||
                                event.key === `End`
                              ) {
                                (0, __documentClosure.onNavigate)(event);
                              }
                            }
                          }}
                          onClick={(
                            documentFrame?: Dynamic,
                            ..._extraArguments: unknown[]
                          ): undefined => {
                            if (
                              (0, __documentClosure.onExpand)(flatMapItem.id) !== false &&
                              documentFrame.detail === 0
                            ) {
                              __documentClosure.elementRef9.current = flatMapItem.id;
                            }
                          }}
                          onFocus={(
                            event?: Dynamic,
                            ..._extraArguments: unknown[]
                          ): undefined => {
                            (0, __documentClosure.setStopId)(dataStopId);
                            (0, __documentClosure.predict2)(event.currentTarget);
                          }}
                        >
                          <__documentClosure.UiOverlaysAndIconsCustomIcon
                            name={`Chat`}
                            customSize={14}
                          />
                          <span className={`text-caption font-medium`}>
                            {count}
                          </span>
                        </button>
                      </__documentClosure.Tooltip>
                    ),
                  },
                  dataStopId,
                )}
              />
            ) : null;
          })}
        {!__documentClosure.composeFloat &&
          __documentClosure.memoized2.map(
            (memoized6?: Dynamic, ..._extraArguments: unknown[]) => {
              let label = `node:${memoized6.nodeId}`;
              return (
                <div
                  {...(0, __documentClosure.originalJsxProps)(
                    {
                      ref: (0, __documentClosure.callback9)(label),
                      onMouseEnter: (..._extraArguments: unknown[]) =>
                        (0, __documentClosure.flatMap)(memoized6),
                      onMouseLeave: (..._extraArguments: unknown[]): Dynamic =>
                        (0, __documentClosure.storeState2)(null),
                      onFocus: (0, __documentClosure.documentFrameHandler7)(memoized6),
                      onBlur: (0, __documentClosure.documentFrameHandler8)(
                        (0, __documentClosure.documentFrameHandler4)(memoized6),
                      ),
                      className: `pointer-events-auto absolute right-6 left-9 ${(0, __documentClosure.useDocumentFrameKey2)(label)}`,
                      style: {
                        top: __documentClosure.tops[label],
                        ...(0, __documentClosure.useDocumentFrameKey3)(label),
                      },
                      children: (
                        <__documentClosure.NodeThreadsCard
                          nodeId={memoized6.nodeId}
                          name={
                            __documentClosure.memoized5.get(memoized6.nodeId) ?? memoized6.nodeId
                          }
                          count={memoized6.count}
                          latest={memoized6.latest}
                          active={(0, __documentClosure.documentFrameHandler3)(memoized6)}
                          onOpen={__documentClosure.onOpen}
                          onReveal={__documentClosure.onRevealNode}
                          onNavigate={__documentClosure.onNavigate}
                          tabStop={__documentClosure.fsEntryId4 === `node:${memoized6.nodeId}`}
                        />
                      ),
                    },
                    label,
                  )}
                />
              );
            },
          )}
        {!__documentClosure.composeFloat &&
          __documentClosure.memoized3.map(
            (memoized6?: Dynamic, ..._extraArguments: unknown[]) => {
              if (
                (0, __documentClosure.commentAttachmentState3)(memoized6) ||
                (0, __documentClosure.documentFrameHandler12)(memoized6)
              )
                return null;
              let documentFrameHandler17: Dynamic =
                (0, __documentClosure.documentFrameHandler10)(memoized6);
              let top: Dynamic = __documentClosure.tops[documentFrameHandler17];
              let expanded = __documentClosure.documentFrameResult13 === memoized6.id;
              return (
                <div
                  {...(0, __documentClosure.originalJsxProps)(
                    {
                      ref: (0, __documentClosure.callback9)(documentFrameHandler17),
                      "data-thread-id": memoized6.id,
                      onMouseEnter: (..._extraArguments: unknown[]): Dynamic =>
                        (0, __documentClosure.storeState2)(memoized6.id),
                      onMouseLeave: (..._extraArguments: unknown[]): Dynamic =>
                        (0, __documentClosure.storeState2)(null),
                      onFocus: (0, __documentClosure.documentFrameHandler6)(memoized6.id),
                      onBlur: (0, __documentClosure.documentFrameHandler8)(memoized6.id),
                      className: `pointer-events-auto absolute right-6 left-9 ${(0, __documentClosure.useDocumentFrameKey2)(documentFrameHandler17)} ${expanded ? `z-[1]` : ``} ${memoized6.resolved ? `opacity-70` : ``}`,
                      style: {
                        top: top,
                        ...(0, __documentClosure.useDocumentFrameKey3)(documentFrameHandler17),
                      },
                      children: (0, __documentClosure.resolveCommentsEditorReactionOnly)(memoized6) ? (
                        <__documentClosure.ReactionChip
                          t={memoized6}
                          active={__documentClosure.documentFrameResult15 === memoized6.id}
                          showLabel={(0, __documentClosure.isWholeDocumentComment)(memoized6)}
                          quote={
                            (0, __documentClosure.resolveDocumentSourcePromptValue2)(
                              memoized6,
                              __documentClosure.documentFrameResult6,
                              __documentClosure.documentFrameResult7,
                            ) ??
                            ((0, __documentClosure.isWholeDocumentComment)(memoized6)
                              ? __documentClosure.DocumentSourcePrompt_WholeDocument
                              : undefined)
                          }
                          tabStop={__documentClosure.fsEntryId4 === memoized6.id}
                          onNavigate={__documentClosure.onNavigate}
                          hintId={__documentClosure.hintId2}
                          onReact={__documentClosure.onReact}
                          onDelete={__documentClosure.onDelete}
                          onUnreactRoot={__documentClosure.onUnreactRoot}
                          onResolve={__documentClosure.onResolve}
                          onReopen={__documentClosure.onReopen}
                          readOnly={__documentClosure.readOnly}
                          commentOnly={__documentClosure.commentOnly2}
                        />
                      ) : (
                        <__documentClosure.CiteOutcomeChip
                          {...(0, __documentClosure.originalJsxProps)({
                            t: memoized6,
                            ...__documentClosure.record,
                            active: __documentClosure.documentFrameResult15 === memoized6.id,
                            expanded: expanded,
                            resolveMotion: __documentClosure.rectless ? `check` : `card`,
                            orphan: false,
                            wholePage: (0, __documentClosure.isWholeDocumentComment)(memoized6),
                            anchorLabel: (0, __documentClosure.resolveDocumentSourcePromptValue2)(
                              memoized6,
                              __documentClosure.documentFrameResult6,
                              __documentClosure.documentFrameResult7,
                            ),
                            onNavigate: __documentClosure.onNavigate,
                            hintId: __documentClosure.hintId,
                            tabStop: __documentClosure.fsEntryId4 === memoized6.id,
                            compact: __documentClosure.compact,
                            chrome: `cds`,
                          })}
                        />
                      ),
                    },
                    documentFrameHandler17,
                  )}
                />
              );
            },
          )}
        {!__documentClosure.composeFloat &&
          __documentClosure.callback2.map(
            (callback10?: Dynamic, ..._extraArguments: unknown[]) => {
              let documentFrameHandler17: Dynamic =
                (0, __documentClosure.documentFrameHandler10)(callback10);
              let top: Dynamic = __documentClosure.tops[documentFrameHandler17];
              let expanded = __documentClosure.documentFrameResult13 === callback10.id;
              return (
                <div
                  {...(0, __documentClosure.originalJsxProps)(
                    {
                      ref: (0, __documentClosure.callback9)(documentFrameHandler17),
                      role: `presentation`,
                      onMouseEnter: (..._extraArguments: unknown[]): Dynamic =>
                        (0, __documentClosure.storeState2)(callback10.id),
                      onMouseLeave: (..._extraArguments: unknown[]): Dynamic =>
                        (0, __documentClosure.storeState2)(null),
                      onFocus: (0, __documentClosure.documentFrameHandler6)(callback10.id),
                      onBlur: (0, __documentClosure.documentFrameHandler8)(callback10.id),
                      onClick: (
                        event?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): Dynamic => (0, __documentClosure.scrollTo)(callback10, event.currentTarget),
                      onKeyDown: (0, __documentClosure.documentFrameHandler5)(
                        (..._extraArguments: unknown[]): Dynamic =>
                          (0, __documentClosure.scrollTo)(callback10),
                      ),
                      className: `pointer-events-auto absolute right-6 left-9 ${(0, __documentClosure.useDocumentFrameKey2)(documentFrameHandler17)} ${expanded ? `z-[1]` : ``} ${callback10.resolved ? `opacity-70` : ``}`,
                      style: {
                        top: top,
                        ...(0, __documentClosure.useDocumentFrameKey3)(documentFrameHandler17),
                      },
                      children: (0, __documentClosure.resolveCommentsEditorReactionOnly)(
                        callback10,
                      ) ? (
                        <__documentClosure.ReactionChip
                          t={callback10}
                          active={__documentClosure.documentFrameResult15 === callback10.id}
                          showLabel={true}
                          quote={(0, __documentClosure.callback6)(callback10)}
                          onReact={__documentClosure.onReact}
                          onDelete={__documentClosure.onDelete}
                          onUnreactRoot={__documentClosure.onUnreactRoot}
                          onResolve={__documentClosure.onResolve}
                          onReopen={__documentClosure.onReopen}
                          readOnly={__documentClosure.readOnly}
                          commentOnly={__documentClosure.commentOnly2}
                          tabStop={__documentClosure.fsEntryId4 === callback10.id}
                          onNavigate={__documentClosure.onNavigate}
                          hintId={__documentClosure.hintId2}
                        />
                      ) : (
                        <__documentClosure.CiteOutcomeChip
                          {...(0, __documentClosure.originalJsxProps)({
                            t: callback10,
                            ...__documentClosure.record,
                            active: __documentClosure.documentFrameResult15 === callback10.id,
                            expanded: expanded,
                            resolveMotion: __documentClosure.rectless ? `check` : `card`,
                            quote: (0, __documentClosure.callback6)(callback10),
                            chartLine: (0, __documentClosure.callback5)(callback10),
                            beside: true,
                            orphan: false,
                            onNavigate: __documentClosure.onNavigate,
                            hintId: __documentClosure.hintId,
                            tabStop: __documentClosure.fsEntryId4 === callback10.id,
                            compact: __documentClosure.compact,
                            chrome: `cds`,
                          })}
                        />
                      ),
                    },
                    documentFrameHandler17,
                  )}
                />
              );
            },
          )}
      </div>
    </div>);
}
