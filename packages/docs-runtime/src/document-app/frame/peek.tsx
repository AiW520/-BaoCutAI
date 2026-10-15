import { jsx as renderReactJsx } from "react/jsx-runtime";
/** BaoCut: extracted comment frame peek expressions; state remains owned by the original closure. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import type { DocumentFrameContext } from "./context";

export function createDocumentFrameFlatMap2117(__documentClosure: Pick<DocumentFrameContext, "documentFrameState6" | "lookupEntry2" | "documentSelectionId" | "lookup3" | "commentAttachmentState3">): Dynamic {
  return ((
      __documentClosure.documentFrameState6 &&
      __documentClosure.lookupEntry2 &&
      __documentClosure.documentFrameState6.includes(__documentClosure.lookupEntry2.id)
        ? __documentClosure.documentFrameState6
        : (__documentClosure.documentSelectionId?.ids ?? (__documentClosure.lookupEntry2 ? [__documentClosure.lookupEntry2.id] : []))
    ).flatMap(
      (
        documentFrameState10?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let lookupEntry3: Dynamic = __documentClosure.lookup3.get(documentFrameState10);
        return lookupEntry3 && !(0, __documentClosure.commentAttachmentState3)(lookupEntry3)
          ? [
              {
                mt: lookupEntry3,
                open:
                  __documentClosure.lookupEntry2 !== null && lookupEntry3.id === __documentClosure.lookupEntry2.id,
              },
            ]
          : [];
      },
    ));
}

export function createDocumentFrameGetState2118(__documentClosure: Pick<DocumentFrameContext, "useCommentStore">): Dynamic {
  return (({ ["getState2"]: ((
      documentFrame?: Dynamic,
      ..._extraArguments: unknown[]
    ) => {
      let storeState11: Dynamic = __documentClosure.useCommentStore.getState();
      return (
        storeState11.focusId == null ||
        storeState11.focusId === documentFrame ||
        storeState11.dirtyEditors.size === 0
      );
    }) })["getState2"]);
}

export function createDocumentFrameOnExpand2119(__documentClosure: Pick<DocumentFrameContext, "getState2" | "useCommentStore">): Dynamic {
  return (({ ["onExpand2"]: ((
      documentFrame?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let storeState11: Dynamic = (0, __documentClosure.getState2)(documentFrame);
      if (storeState11) {
        __documentClosure.useCommentStore.getState().setFocus(documentFrame);
      }
      return storeState11;
    }) })["onExpand2"]);
}

export function createDocumentFrameGetAttribute120(__documentClosure: Pick<DocumentFrameContext, "getState2" | "scrollTo2">): Dynamic {
  return (({ ["getAttribute"]: ((
      element?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let attribute: Dynamic = element?.getAttribute(`data-stop-id`);
      if (attribute && (0, __documentClosure.getState2)(attribute)) {
        (0, __documentClosure.scrollTo2)(attribute, options ? element : null);
      }
    }) })["getAttribute"]);
}

export function createDocumentFrameIndexOf121(__documentClosure: Pick<DocumentFrameContext, "widgetBridgeValue" | "widgetBridgeValue2" | "onExpand2" | "resolvePlatformAnnouncementsValue" | "CommentComponents_Message2" | "storeState2" | "documentFrameHandler17" | "widgetBridgeFlatMap">): Dynamic {
  return (({ ["indexOf"]: ((
      documentFrame?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let widgetBridgeValue3: Dynamic =
        documentFrame < 0 ? __documentClosure.widgetBridgeValue : __documentClosure.widgetBridgeValue2;
      if (widgetBridgeValue3 !== null) {
        if (!(0, __documentClosure.onExpand2)(widgetBridgeValue3)) {
          (0, __documentClosure.resolvePlatformAnnouncementsValue)(
            document,
            __documentClosure.CommentComponents_Message2,
            {
              key: `comment-card`,
            },
          );
          return;
        }
        (0, __documentClosure.storeState2)(widgetBridgeValue3);
        (0, __documentClosure.resolvePlatformAnnouncementsValue)(
          document,
          (0, __documentClosure.documentFrameHandler17)(
            __documentClosure.widgetBridgeFlatMap.indexOf(widgetBridgeValue3),
          ),
          {
            key: `comment-card`,
          },
        );
      }
    }) })["indexOf"]);
}

export function createDocumentFrameOnClose122(__documentClosure: Pick<DocumentFrameContext, "useCommentStore" | "elementRef18">): Dynamic {
  return (({ ["onClose"]: ((..._extraArguments: unknown[]): undefined => {
      let storeState11: Dynamic = __documentClosure.useCommentStore.getState();
      let element: Dynamic = __documentClosure.elementRef18.current ?? storeState11.focusId;
      __documentClosure.elementRef18.current = null;
      if (storeState11.focusId != null && storeState11.focusId === element) {
        storeState11.setFocus(null);
      }
      if (storeState11.activeId === element) {
        storeState11.setActive(null);
      }
    }) })["onClose"]);
}

export function createDocumentFrameJsxs9123(__documentClosure: Pick<DocumentFrameContext, "useWidgetBridgeCurrent2" | "lookupEntry2" | "covered" | "BottomSheet" | "shouldClose" | "onClose" | "widgetBridgeFlatMapIndex" | "jsxRuntime" | "widgetBridgeFlatMap" | "IconButton" | "UiOverlaysAndIconsCustomIcon" | "widgetBridgeValue" | "resolveUiDesignSystemValue2" | "PHONE_TOUCH_TARGET_CLASS" | "indexOf" | "widgetBridgeValue2" | "PHONE_EDIT_BUTTON_CLASS" | "uniqueItems" | "resolveCommentsEditorReactionOnly" | "WhoReacted" | "resolveCommentsEditorUser" | "ReactionChip" | "isWholeDocumentComment" | "callback6" | "resolveDocumentSourcePromptValue2" | "documentFrameResult6" | "documentFrameResult7" | "DocumentSourcePrompt_WholeDocument" | "hintId2" | "onReact" | "onDelete" | "onUnreactRoot" | "onResolve" | "onReopen" | "readOnly" | "commentOnly2" | "documentFrameHandler10" | "CiteOutcomeChip" | "record" | "onExpand2" | "resolveDocumentSourcePromptTarget3" | "callback5" | "hintId" | "PhoneConfirmationDialog" | "id2" | "setId" | "elementRef18">): Dynamic {
  return (__documentClosure.useWidgetBridgeCurrent2 && __documentClosure.lookupEntry2 && !__documentClosure.covered ? (
        <__documentClosure.BottomSheet
          shouldClose={__documentClosure.shouldClose}
          onClose={__documentClosure.onClose}
          data-testid={`ldoc-comment-sheet`}
          data-mode={`thread`}
          detent={`high`}
          title={
            __documentClosure.widgetBridgeFlatMapIndex >= 0 ? (
              <__documentClosure.jsxRuntime.Fragment>
                <span className={`sr-only`}>{`Comment `}</span>
                {`${__documentClosure.widgetBridgeFlatMapIndex + 1} of ${__documentClosure.widgetBridgeFlatMap.length}`}
              </__documentClosure.jsxRuntime.Fragment>
            ) : (
              `Comment`
            )
          }
          leading={
            <span
              className={`-ml-1 flex items-center gap-1`}
              data-testid={`ldoc-comment-stepper`}
            >
              <__documentClosure.IconButton
                icon={<__documentClosure.UiOverlaysAndIconsCustomIcon name={`CaretLeft`} />}
                aria-label={`Previous comment`}
                aria-disabled={__documentClosure.widgetBridgeValue === null}
                className={(0, __documentClosure.resolveUiDesignSystemValue2)(
                  __documentClosure.PHONE_TOUCH_TARGET_CLASS,
                  __documentClosure.widgetBridgeValue === null && `opacity-40`,
                )}
                size={36}
                onClick={(..._extraArguments: unknown[]) => (0, __documentClosure.indexOf)(-1)}
              />
              <__documentClosure.IconButton
                icon={<__documentClosure.UiOverlaysAndIconsCustomIcon name={`CaretRight`} />}
                aria-label={`Next comment`}
                aria-disabled={__documentClosure.widgetBridgeValue2 === null}
                className={(0, __documentClosure.resolveUiDesignSystemValue2)(
                  __documentClosure.PHONE_TOUCH_TARGET_CLASS,
                  __documentClosure.widgetBridgeValue2 === null && `opacity-40`,
                )}
                size={36}
                onClick={(..._extraArguments: unknown[]) => (0, __documentClosure.indexOf)(1)}
              />
            </span>
          }
          bodyClassName={`flex flex-col overflow-hidden px-0 pb-2 [--cds-comment-card-hover-tint:transparent] ${__documentClosure.PHONE_EDIT_BUTTON_CLASS}`}
        >
          {((..._extraArguments: unknown[]) => {
            let lookupEntry3: Dynamic = __documentClosure.lookupEntry2;
            let hasId: Dynamic = __documentClosure.uniqueItems.has(lookupEntry3.id);
            let onNavigate2 = (
              event?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              if (event.key !== `ArrowDown` && event.key !== `ArrowUp`) return;
              event.preventDefault();
              let closest: Dynamic =
                event.currentTarget.closest(`[data-bottom-sheet]`);
              (0, __documentClosure.indexOf)(event.key === `ArrowDown` ? 1 : -1);
              requestAnimationFrame(
                (..._extraArguments: unknown[]): Dynamic =>
                  closest?.querySelector(`[data-comment-stop]`)?.focus({
                    preventScroll: true,
                  }),
              );
            };
            return (0, __documentClosure.resolveCommentsEditorReactionOnly)(lookupEntry3) ? (
              <div className={`p-lg`} key={(0, __documentClosure.documentFrameHandler10)(lookupEntry3)}>{<__documentClosure.WhoReacted reactions={(0, __documentClosure.resolveCommentsEditorUser)(lookupEntry3)}>
                        <__documentClosure.ReactionChip
                          t={lookupEntry3}
                          active={true}
                          showLabel={hasId || (0, __documentClosure.isWholeDocumentComment)(lookupEntry3)}
                          quote={hasId ? (0, __documentClosure.callback6)(lookupEntry3) : (0, __documentClosure.resolveDocumentSourcePromptValue2)(lookupEntry3, __documentClosure.documentFrameResult6, __documentClosure.documentFrameResult7) ?? ((0, __documentClosure.isWholeDocumentComment)(lookupEntry3) ? __documentClosure.DocumentSourcePrompt_WholeDocument : undefined)}
                          tabStop={true}
                          onNavigate={onNavigate2}
                          hintId={__documentClosure.hintId2}
                          onReact={__documentClosure.onReact}
                          onDelete={__documentClosure.onDelete}
                          onUnreactRoot={__documentClosure.onUnreactRoot}
                          onResolve={__documentClosure.onResolve}
                          onReopen={__documentClosure.onReopen}
                          readOnly={__documentClosure.readOnly}
                          commentOnly={__documentClosure.commentOnly2}
                        />
                      </__documentClosure.WhoReacted>}</div>
            ) : (
              renderReactJsx(__documentClosure.CiteOutcomeChip, {
  t: lookupEntry3,
  ...__documentClosure.record,
  chrome: `cds`,
  onExpand: __documentClosure.onExpand2,
  active: true,
  expanded: true,
  flat: true,
  resolveMotion: `check`,
  quote: hasId ? (0, __documentClosure.callback6)(lookupEntry3) : (0, __documentClosure.resolveDocumentSourcePromptTarget3)(lookupEntry3, __documentClosure.documentFrameResult7),
  chartLine: hasId ? (0, __documentClosure.callback5)(lookupEntry3) : undefined,
  orphan: false,
  wholePage: !hasId && (0, __documentClosure.isWholeDocumentComment)(lookupEntry3),
  anchorLabel: hasId ? undefined : (0, __documentClosure.resolveDocumentSourcePromptValue2)(lookupEntry3, __documentClosure.documentFrameResult6, __documentClosure.documentFrameResult7),
  away: true,
  onNavigate: onNavigate2,
  hintId: __documentClosure.hintId,
  tabStop: true,
  touch: true,
  replyRoad: `sheet`,
  fit: true
}, (0, __documentClosure.documentFrameHandler10)(lookupEntry3))
            );
          })()}
          <__documentClosure.PhoneConfirmationDialog
            open={__documentClosure.id2 !== null && __documentClosure.id2 === __documentClosure.lookupEntry2.id}
            onOpenChange={(
              documentFrame?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => !documentFrame && (0, __documentClosure.setId)(null)}
            title={`Discard changes?`}
            description={`What you have typed in this comment will be lost.`}
            confirmLabel={`Discard`}
            confirmVariant={`danger`}
            initialFocus={`cancel`}
            closeOnConfirm={true}
            onConfirm={(..._extraArguments: unknown[]): undefined => {
              __documentClosure.elementRef18.current = __documentClosure.lookupEntry2.id;
              (0, __documentClosure.onClose)();
            }}
          />
        </__documentClosure.BottomSheet>
      ) : null);
}

export function createDocumentFrameRender124(__documentClosure: Pick<DocumentFrameContext, "observe" | "iconLane2" | "DocumentFrame_Comments" | "covered" | "jsxs" | "EditorHostState33" | "setDocumentFrameState8" | "iconLane" | "documentSelectionIds" | "lookup3" | "uniqueItems" | "isWholeDocumentComment" | "resolveDocumentRuntimeValue10" | "resolveCommentComponentsCount" | "callback5" | "callback6" | "resolveDocumentSourcePromptCells" | "documentFrameResult6" | "documentFrameResult7" | "Tooltip" | "useCommentStore" | "onExpand2" | "resolvePlatformAnnouncementsValue" | "setDocumentFrameState7" | "scrollTo2" | "querySelectorAll2" | "elementRef9" | "predict2" | "documentFrameHandler8" | "UiOverlaysAndIconsCustomIcon" | "useWidgetBridgeCurrent2" | "jsxs9" | "lookupEntry2" | "flatMap2" | "elementRef13" | "top" | "maxHeight" | "observe2" | "onFocus" | "getAttribute" | "documentFrameHandler5" | "resolveCommentsEditorReactionOnly" | "resolveUiTooltipsAndControlsValue3" | "ReactionChip" | "resolveDocumentSourcePromptValue2" | "DocumentSourcePrompt_WholeDocument" | "fsEntryId5" | "onNavigate" | "hintId2" | "onReact" | "onDelete" | "onUnreactRoot" | "onResolve" | "onReopen" | "readOnly" | "commentOnly2" | "documentFrameHandler10" | "CiteOutcomeChip" | "record" | "documentSelectionId" | "resolveDocumentSourcePromptTarget3" | "hintId">): Dynamic {
  return (<div
        ref={__documentClosure.observe}
        role={__documentClosure.iconLane2 ? `region` : undefined}
        aria-label={__documentClosure.iconLane2 ? __documentClosure.DocumentFrame_Comments : undefined}
        className={`pointer-events-none absolute inset-0 ${__documentClosure.covered ? `invisible` : ``}`}
        data-testid={`ldoc-comments`}
        data-mode={`peek`}
      >
        {__documentClosure.jsxs}
        <div
          className={`pointer-events-none absolute inset-y-0 z-[1] overflow-clip`}
          style={{
            width: 64,
            right: __documentClosure.EditorHostState33,
          }}
          data-testid={`ldoc-comment-icons`}
        >
          <div
            ref={__documentClosure.setDocumentFrameState8}
            className={`absolute inset-0`}
            data-testid={`ldoc-rail-layer`}
          >
            {__documentClosure.iconLane &&
              __documentClosure.documentSelectionIds.map(
                (
                  documentSelectionId2?: Dynamic,
                  ..._extraArguments: unknown[]
                ) => {
                  let count: Dynamic = documentSelectionId2.ids.reduce(
                    (
                      accumulator?: Dynamic,
                      id3?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic => {
                      let lookupEntry4: Dynamic = __documentClosure.lookup3.get(id3);
                      return (
                        accumulator +
                        (lookupEntry4 ? 1 + lookupEntry4.replies.length : 0)
                      );
                    },
                    0,
                  );
                  let lookupEntry3: Dynamic = __documentClosure.lookup3.get(
                    documentSelectionId2.ids[0],
                  );
                  let matchesLookupEntry2: Dynamic =
                    lookupEntry3 !== undefined &&
                    __documentClosure.uniqueItems.has(lookupEntry3.id);
                  let matchesLookupEntry3 =
                    lookupEntry3 !== undefined &&
                    !matchesLookupEntry2 &&
                    (0, __documentClosure.isWholeDocumentComment)(lookupEntry3);
                  let documentRuntimeValue10 =
                    (0, __documentClosure.resolveDocumentRuntimeValue10)(count);
                  let content = matchesLookupEntry3
                    ? `${documentRuntimeValue10} on the whole document`
                    : documentRuntimeValue10;
                  let ariaLabel2 = (0, __documentClosure.resolveCommentComponentsCount)({
                    count: count,
                    threads: documentSelectionId2.ids.length,
                    place: lookupEntry3
                      ? matchesLookupEntry2
                        ? {
                            on: `widget`,
                            words:
                              (0, __documentClosure.callback5)(lookupEntry3)?.text ??
                              (0, __documentClosure.callback6)(lookupEntry3, true) ??
                              lookupEntry3.target?.quote?.exact,
                            chart: (0, __documentClosure.callback5)(lookupEntry3) !== undefined,
                          }
                        : matchesLookupEntry3
                          ? {
                              on: `page`,
                            }
                          : (0, __documentClosure.resolveDocumentSourcePromptCells)(
                              lookupEntry3,
                              __documentClosure.documentFrameResult6,
                              __documentClosure.documentFrameResult7,
                            )
                      : undefined,
                  });
                  return (
                    <__documentClosure.Tooltip content={content} side={`left`} key={documentSelectionId2.ids[0]}>{<button type={`button`} data-testid={`comment-icon`} data-whole-page={matchesLookupEntry3 || undefined} aria-label={ariaLabel2} className={`text-secondary hover:text-primary hover:bg-alpha-1 pointer-events-auto absolute left-0 inline-flex items-center gap-1 rounded px-1 transition-colors`} style={{
    top: documentSelectionId2.y,
    height: 26
  }} data-threads={documentSelectionId2.ids.join(` `)} onClick={(documentFrame?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let matchesFocusId = __documentClosure.useCommentStore.getState().focusId === documentSelectionId2.ids[0];
    if (!(0, __documentClosure.onExpand2)(documentSelectionId2.ids[0])) {
      if (documentFrame.detail === 0) {
        (0, __documentClosure.resolvePlatformAnnouncementsValue)(document, `Finish or cancel what you're writing first`, {
          key: `comment-card`
        });
      }
      return;
    }
    (0, __documentClosure.setDocumentFrameState7)(documentSelectionId2.ids.length > 1 ? [...documentSelectionId2.ids] : null);
    (0, __documentClosure.scrollTo2)(documentSelectionId2.ids[0]);
    if (documentFrame.detail === 0) {
      if (matchesFocusId) {
        (0, __documentClosure.querySelectorAll2)(documentSelectionId2.ids[0])?.focus({
          preventScroll: true
        });
      } else {
        __documentClosure.elementRef9.current = documentSelectionId2.ids[0];
      }
    }
  }} onMouseEnter={(..._extraArguments: unknown[]): Dynamic => __documentClosure.useCommentStore.getState().setActive(documentSelectionId2.ids[0], documentSelectionId2.ids.slice(1))} onMouseLeave={(..._extraArguments: unknown[]): Dynamic => __documentClosure.useCommentStore.getState().setActive(null)} onFocus={(event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    __documentClosure.useCommentStore.getState().setActive(documentSelectionId2.ids[0], documentSelectionId2.ids.slice(1));
    (0, __documentClosure.predict2)(event.currentTarget);
  }} onBlur={(0, __documentClosure.documentFrameHandler8)(documentSelectionId2.ids[0])}>
                              <__documentClosure.UiOverlaysAndIconsCustomIcon name={`Chat`} customSize={14} />
                              <span className={`text-caption font-medium`}>
                                {count}
                              </span>
                            </button>}</__documentClosure.Tooltip>
                  );
                },
              )}
          </div>
        </div>
        {__documentClosure.useWidgetBridgeCurrent2
          ? __documentClosure.jsxs9
          : __documentClosure.lookupEntry2 &&
            __documentClosure.flatMap2.length > 0 && (
              <div
                ref={__documentClosure.elementRef13}
                data-testid={`ldoc-peek-card`}
                className={`pointer-events-none absolute z-[11] -mt-3 -mr-2 overflow-y-auto p-6 pl-8`}
                style={{
                  right: __documentClosure.EditorHostState33,
                  top: __documentClosure.top,
                  width: `min(100%, 340px)`,
                  maxHeight: __documentClosure.maxHeight,
                }}
              >
                <div
                  ref={__documentClosure.observe2}
                  role={`presentation`}
                  className={`relative flex flex-col gap-2 *:pointer-events-auto`}
                  onFocus={__documentClosure.onFocus}
                  onClick={(event?: Dynamic, ..._extraArguments: unknown[]) =>
                    (0, __documentClosure.getAttribute)(event.target.closest(`[data-stop-id]`), true)
                  }
                  onKeyDown={(
                    event?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic =>
                    (0, __documentClosure.documentFrameHandler5)((..._extraArguments: unknown[]) =>
                      (0, __documentClosure.getAttribute)(event.target, false),
                    )(event)
                  }
                >
                  {__documentClosure.flatMap2.map(
                    (
                      { mt: mt2, open: open2 }: Dynamic,
                      ..._extraArguments: unknown[]
                    ) => {
                      let hasId: Dynamic = __documentClosure.uniqueItems.has(mt2.id);
                      return (0, __documentClosure.resolveCommentsEditorReactionOnly)(mt2) ? (
                        <div
                          data-testid={`ldoc-peek-reaction-card`}
                          data-active={open2 || undefined}
                          className={`${(0, __documentClosure.resolveUiTooltipsAndControlsValue3)(`panel`)} data-[active]:shadow-panel transition-shadow duration-fast text-primary text-body p-lg`}
                          key={(0, __documentClosure.documentFrameHandler10)(mt2)}
                        >{<__documentClosure.ReactionChip
                          t={mt2}
                          active={open2}
                          showLabel={hasId || (0, __documentClosure.isWholeDocumentComment)(mt2)}
                          quote={hasId ? (0, __documentClosure.callback6)(mt2) : (0, __documentClosure.resolveDocumentSourcePromptValue2)(mt2, __documentClosure.documentFrameResult6, __documentClosure.documentFrameResult7) ?? ((0, __documentClosure.isWholeDocumentComment)(mt2) ? __documentClosure.DocumentSourcePrompt_WholeDocument : undefined)}
                          tabStop={__documentClosure.fsEntryId5 === mt2.id}
                          onNavigate={__documentClosure.onNavigate}
                          hintId={__documentClosure.hintId2}
                          onReact={__documentClosure.onReact}
                          onDelete={__documentClosure.onDelete}
                          onUnreactRoot={__documentClosure.onUnreactRoot}
                          onResolve={__documentClosure.onResolve}
                          onReopen={__documentClosure.onReopen}
                          readOnly={__documentClosure.readOnly}
                          commentOnly={__documentClosure.commentOnly2}
                        />}</div>
                      ) : (
                        renderReactJsx(__documentClosure.CiteOutcomeChip, {
  t: mt2,
  ...__documentClosure.record,
  onExpand: __documentClosure.onExpand2,
  active: open2,
  expanded: open2,
  resolveMotion: `check`,
  quote: hasId ? (0, __documentClosure.callback6)(mt2) : __documentClosure.documentSelectionId ? (0, __documentClosure.resolveDocumentSourcePromptTarget3)(mt2, __documentClosure.documentFrameResult7) : undefined,
  chartLine: hasId ? (0, __documentClosure.callback5)(mt2) : undefined,
  orphan: false,
  wholePage: !hasId && (0, __documentClosure.isWholeDocumentComment)(mt2),
  anchorLabel: hasId ? undefined : (0, __documentClosure.resolveDocumentSourcePromptValue2)(mt2, __documentClosure.documentFrameResult6, __documentClosure.documentFrameResult7),
  away: __documentClosure.flatMap2.length > 1,
  beside: hasId && __documentClosure.flatMap2.length === 1,
  onNavigate: __documentClosure.onNavigate,
  hintId: __documentClosure.hintId,
  tabStop: __documentClosure.fsEntryId5 === mt2.id,
  chrome: `cds`
}, (0, __documentClosure.documentFrameHandler10)(mt2))
                      );
                    },
                  )}
                </div>
              </div>
            )}
      </div>);
}

export function createDocumentFrameShouldClose125(__documentClosure: Pick<DocumentFrameContext, "useCommentStore" | "setId" | "label">): Dynamic {
  return (({ ["shouldClose"]: ((
        documentFrame?: unknown,
        ..._extraArguments: unknown[]
      ) => {
        let storeState11: Dynamic = __documentClosure.useCommentStore.getState();
        return !storeState11.draftAnchor || storeState11.dirtyEditors.size === 0
          ? true
          : ((0, __documentClosure.setId)(__documentClosure.label), false);
      }) })["shouldClose"]);
}

export function createDocumentFrameOnClose126(__documentClosure: Pick<DocumentFrameContext, "useCommentStore" | "DocumentSourcePromptState" | "onCancel" | "setDraftY">): Dynamic {
  return (({ ["onClose"]: ((
        documentFrame?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let draftAnchor: Dynamic = __documentClosure.useCommentStore.getState().draftAnchor;
        if (draftAnchor) {
          (0, __documentClosure.DocumentSourcePromptState)?.(null, draftAnchor.nonce);
          if (documentFrame === `escape` || documentFrame === `close`) {
            (0, __documentClosure.onCancel)();
          } else {
            (0, __documentClosure.setDraftY)();
          }
        }
      }) })["onClose"]);
}

export function createDocumentFrameRender127(__documentClosure: Pick<DocumentFrameContext, "BottomSheet" | "shouldClose" | "onClose" | "ariaLabel" | "claudeRoute" | "UseCommentComponentsRouteComponent" | "key" | "documentFrameState3" | "elementRef20" | "bottomInset" | "jsxs" | "jsxs5" | "PhoneConfirmationDialog" | "id2" | "label" | "setId" | "draft">): Dynamic {
  return (<__documentClosure.BottomSheet
          shouldClose={__documentClosure.shouldClose}
          onClose={__documentClosure.onClose}
          title={__documentClosure.ariaLabel}
          trailing={
            typeof __documentClosure.claudeRoute == `object` ? (
              <__documentClosure.UseCommentComponentsRouteComponent
                route={__documentClosure.claudeRoute}
                named={
                  __documentClosure.key !== null && __documentClosure.documentFrameState3?.key === __documentClosure.key
                    ? __documentClosure.documentFrameState3.named
                    : undefined
                }
              />
            ) : undefined
          }
          initialFocus={(..._extraArguments: unknown[]): Dynamic =>
            __documentClosure.elementRef20.current?.querySelector(`[contenteditable="true"]`) ??
            true
          }
          finalFocus={false}
          data-testid={`ldoc-comment-sheet`}
          data-mode={`compose`}
          bodyClassName={`px-4 pb-1`}
          bottomInset={__documentClosure.bottomInset}
        >
          {__documentClosure.jsxs}
          <div ref={__documentClosure.elementRef20} data-testid={`ldoc-comment-draft`}>
            {(0, __documentClosure.jsxs5)(`sheet`)}
          </div>
          <__documentClosure.PhoneConfirmationDialog
            open={__documentClosure.id2 === __documentClosure.label}
            onOpenChange={(
              documentFrame?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => !documentFrame && (0, __documentClosure.setId)(null)}
            title={__documentClosure.draft.ask ? `Discard message?` : `Discard comment?`}
            description={
              __documentClosure.draft.ask
                ? `What you've typed to Claude will be lost.`
                : `Your unsent comment will be lost.`
            }
            confirmLabel={`Discard`}
            confirmVariant={`danger`}
            initialFocus={`cancel`}
            closeOnConfirm={true}
            onConfirm={(..._extraArguments: unknown[]) => (0, __documentClosure.onClose)(`close`)}
          />
        </__documentClosure.BottomSheet>);
}

export function createDocumentFrameRender128(__documentClosure: Pick<DocumentFrameContext, "covered" | "composeFloat" | "documentRuntimeLimit284" | "EditorHostState33" | "addEventListener3" | "DocumentFrame_Comments" | "jsxs" | "DocumentRuntimeSearch" | "railSeated" | "room" | "Tooltip" | "IconButton" | "UiOverlaysAndIconsCustomIcon" | "onSelect" | "jsxs8">): Dynamic {
  return (<div
        className={`pointer-events-none absolute inset-y-0 z-[11] flex flex-col ${__documentClosure.covered ? `invisible` : ``}`}
        style={{
          width: __documentClosure.composeFloat ? __documentClosure.documentRuntimeLimit284 : 320,
          right: __documentClosure.EditorHostState33,
        }}
        ref={__documentClosure.addEventListener3}
        role={`region`}
        aria-label={__documentClosure.DocumentFrame_Comments}
        data-testid={`ldoc-comments`}
        data-mode={__documentClosure.composeFloat ? `compose-float` : `margin`}
      >
        {__documentClosure.jsxs}
        {__documentClosure.DocumentRuntimeSearch && __documentClosure.railSeated && !__documentClosure.composeFloat && !__documentClosure.room && (
          <div className={`pointer-events-auto absolute top-2 right-3 z-[1]`}>
            <__documentClosure.Tooltip content={`Hide comments`} side={`left`}>
              <__documentClosure.IconButton
                aria-label={`Hide comments`}
                size={24}
                icon={
                  <__documentClosure.UiOverlaysAndIconsCustomIcon name={`X`} customSize={14} />
                }
                onClick={__documentClosure.onSelect}
              />
            </__documentClosure.Tooltip>
          </div>
        )}
        {__documentClosure.jsxs8}
      </div>);
}

export function createDocumentFrameRender129(__documentClosure: Pick<DocumentFrameContext, "BottomSheet" | "useCommentStore" | "setId" | "setDraftY" | "storeState4" | "title" | "jsxs2" | "PHONE_EDIT_BUTTON_CLASS" | "updateElement2" | "jsxs" | "jsxs4" | "PhoneConfirmationDialog" | "id2">): Dynamic {
  return (<__documentClosure.BottomSheet
      detent={`tall`}
      shouldClose={(..._extraArguments: unknown[]) =>
        __documentClosure.useCommentStore.getState().dirtyEditors.size === 0
          ? true
          : ((0, __documentClosure.setId)(`list`), false)
      }
      onClose={(..._extraArguments: unknown[]): undefined => {
        if (__documentClosure.useCommentStore.getState().draftAnchor) {
          (0, __documentClosure.setDraftY)();
        }
        (0, __documentClosure.storeState4)(`margin`);
      }}
      closeLabel={`Close comments`}
      title={__documentClosure.title}
      trailing={
        <span className={`-me-1.5 flex items-center gap-1`}>{__documentClosure.jsxs2}</span>
      }
      data-testid={`ldoc-comment-sheet`}
      data-mode={`list`}
      bodyClassName={`flex flex-col overflow-hidden px-0 bg-surface-panel ${__documentClosure.PHONE_EDIT_BUTTON_CLASS}`}
    >
      <div
        ref={__documentClosure.updateElement2}
        className={`flex min-h-0 flex-1 flex-col`}
        data-testid={`ldoc-comments`}
        data-mode={`list-sheet`}
      >
        {__documentClosure.jsxs}
        {__documentClosure.jsxs4}
      </div>
      <__documentClosure.PhoneConfirmationDialog
        open={__documentClosure.id2 === `list`}
        onOpenChange={(
          documentFrame?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => !documentFrame && (0, __documentClosure.setId)(null)}
        title={`Discard changes?`}
        description={`What you've typed in the list will be lost.`}
        confirmLabel={`Discard`}
        confirmVariant={`danger`}
        initialFocus={`cancel`}
        closeOnConfirm={true}
        onConfirm={(..._extraArguments: unknown[]): undefined => {
          (0, __documentClosure.setDraftY)();
          (0, __documentClosure.storeState4)(`margin`);
        }}
      />
    </__documentClosure.BottomSheet>);
}

export function createDocumentFrameRender130(__documentClosure: Pick<DocumentFrameContext, "updateElement2" | "ariaLabelledby" | "jsxs" | "jsxs3" | "jsxs4">): Dynamic {
  return (<div
      ref={__documentClosure.updateElement2}
      role={`region`}
      aria-labelledby={__documentClosure.ariaLabelledby}
      tabIndex={-1}
      className={`bg-surface-popover shadow-card-active pointer-events-auto absolute top-2 right-4 z-30 flex flex-col overflow-hidden rounded-[10px] focus-ring-fades`}
      style={{
        width: 308,
        maxHeight: `min(70vh, calc(100% - 16px))`,
      }}
      data-testid={`ldoc-comments`}
      data-mode={`list-popover`}
    >
      {__documentClosure.jsxs}
      {__documentClosure.jsxs3}
      {__documentClosure.jsxs4}
    </div>);
}

export function createDocumentFrameRender131(__documentClosure: Pick<DocumentFrameContext, "updateElement" | "ariaLabelledby" | "documentFrameResult28" | "jsxs" | "jsxs3" | "jsxs4" | "PaneResizeHandle">): Dynamic {
  return (<div
      ref={__documentClosure.updateElement}
      role={`region`}
      aria-labelledby={__documentClosure.ariaLabelledby}
      tabIndex={-1}
      className={`bg-surface-panel relative z-30 order-last flex h-full shrink-0 flex-col border-l focus-ring-fades`}
      style={{
        width: __documentClosure.documentFrameResult28.size,
      }}
      data-testid={`ldoc-comments`}
      data-mode={`list`}
    >
      {__documentClosure.jsxs}
      {__documentClosure.jsxs3}
      {__documentClosure.jsxs4}
      <__documentClosure.PaneResizeHandle
        {...__documentClosure.documentFrameResult28.handleProps}
        side={`left`}
        bordered={true}
        label={`Resize comments`}
      />
    </div>);
}
