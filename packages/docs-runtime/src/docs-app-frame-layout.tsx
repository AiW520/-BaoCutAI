/** BaoCut: extracted comment frame layout expressions; state remains owned by the original closure. */
import type { Dynamic } from "./types";
import type { DocumentFrameContext } from "./docs-app-frame-context";

export function createDocumentFrameIsWholeDocumentComment273(__documentClosure: Pick<DocumentFrameContext, "documentFrameResult5" | "documentFrameResult8" | "isWholeDocumentComment" | "documentSelectionValue">): Dynamic {
  return (({ ["isWholeDocumentComment2"]: ((
    documentFrame?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    __documentClosure.documentFrameResult5[documentFrame.id] ??
    __documentClosure.documentFrameResult8[documentFrame.id] ??
    ((0, __documentClosure.isWholeDocumentComment)(documentFrame)
      ? __documentClosure.documentSelectionValue
      : undefined)) })["isWholeDocumentComment2"]);
}

export function createDocumentFrameRecord274(__documentClosure: Pick<DocumentFrameContext, "peek" | "rail" | "isDataModelSchemasHeading" | "resolveDataModelSchemasHasOwn3" | "documentFrameResult11" | "documentFrameResult13" | "isWholeDocumentComment" | "isElementAttachedComment" | "documentFrameResult8" | "documentFrameResult10" | "documentFrameResult5">): Dynamic {
  return (__documentClosure.peek
    ? {
        icons: [],
        hidden: new (Set as Dynamic)(),
        rail: __documentClosure.rail,
      }
    : (0, __documentClosure.isDataModelSchemasHeading)(
        __documentClosure.rail,
        (0, __documentClosure.resolveDataModelSchemasHasOwn3)(
          __documentClosure.documentFrameResult11,
          __documentClosure.documentFrameResult13,
        ),
        (documentFrame?: Dynamic, ..._extraArguments: unknown[]) =>
          !(0, __documentClosure.isWholeDocumentComment)(documentFrame) &&
          !(0, __documentClosure.isElementAttachedComment)(documentFrame) &&
          !(documentFrame.id in __documentClosure.documentFrameResult8) &&
          __documentClosure.documentFrameResult10?.has(documentFrame.id) === true,
        (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          __documentClosure.documentFrameResult5[documentFrame],
      ));
}

export function createDocumentFrameDocumentSelectionIds75(__documentClosure: Pick<DocumentFrameContext, "peek" | "resolveDocumentSelectionIds" | "rail" | "isWholeDocumentComment2" | "callback2" | "isDetachedResolvedComment2" | "readId2">): Dynamic {
  return (__documentClosure.peek
    ? (0, __documentClosure.resolveDocumentSelectionIds)([
        ...__documentClosure.rail.flatMap(
          (file?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
            let isWholeDocumentComment3: Dynamic =
              (0, __documentClosure.isWholeDocumentComment2)(file);
            return isWholeDocumentComment3 === undefined
              ? []
              : [
                  {
                    id: file.id,
                    y: isWholeDocumentComment3,
                    at: file.root?.at ?? ``,
                  },
                ];
          },
        ),
        ...__documentClosure.callback2.flatMap(
          (file?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
            if ((0, __documentClosure.isDetachedResolvedComment2)(file)) return [];
            let id3: Dynamic = (0, __documentClosure.readId2)(file);
            return id3 === undefined
              ? []
              : [
                  {
                    id: file.id,
                    y: id3,
                    at: file.root?.at ?? ``,
                  },
                ];
          },
        ),
      ])
    : []);
}

export function createDocumentFrameUpdateElement376(__documentClosure: Pick<DocumentFrameContext, "elementRef24">): Dynamic {
  return (({ ["updateElement3"]: ((
    documentFrame?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let element: Dynamic = __documentClosure.elementRef24.current;
    if (
      element?.ownScroll &&
      options !== element.fromScrollY &&
      Math.abs(documentFrame - element.docPos) <= 1
    ) {
      __documentClosure.elementRef24.current = {
        id: element.id,
        docPos: element.docPos,
      };
    }
  }) })["updateElement3"]);
}

export function createDocumentFrameReadId377(__documentClosure: Pick<DocumentFrameContext, "memoized3" | "callback2" | "isWholeDocumentComment2" | "readId2" | "readId" | "documentFrameResult8">): Dynamic {
  return (({ ["readId3"]: ((
    documentFrame?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let memoized6: Dynamic = __documentClosure.memoized3.find(
      (memoized7?: Dynamic, ..._extraArguments: unknown[]) =>
        memoized7.id === documentFrame,
    );
    let callback10: Dynamic = memoized6
      ? undefined
      : __documentClosure.callback2.find(
          (callback11?: Dynamic, ..._extraArguments: unknown[]) =>
            callback11.id === documentFrame,
        );
    let isWholeDocumentComment3: Dynamic = memoized6
      ? (0, __documentClosure.isWholeDocumentComment2)(memoized6)
      : callback10
        ? (0, __documentClosure.readId2)(callback10)
        : undefined;
    if (isWholeDocumentComment3 !== undefined)
      return {
        y: isWholeDocumentComment3,
        box:
          callback10 !== undefined &&
          (0, __documentClosure.readId)(callback10) === undefined &&
          __documentClosure.documentFrameResult8[documentFrame] === undefined,
      };
  }) })["readId3"]);
}

export function createDocumentFrameUpdateelementRef23_current78(__documentClosure: Pick<DocumentFrameContext, "readId3" | "elementRef24" | "fromScrollY" | "railSyncRef" | "useCommentStore" | "resolveWidgetBridgeSlack" | "onScrollDocRef">): Dynamic {
  return ((
    documentFrame?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let id3: Dynamic = (0, __documentClosure.readId3)(documentFrame);
    if (id3 === undefined) return;
    let { y: id4 }: Dynamic = id3;
    __documentClosure.elementRef24.current = {
      id: documentFrame,
      docPos: id4 + __documentClosure.fromScrollY,
    };
    let railSync2: Dynamic = __documentClosure.railSyncRef.current;
    let offset: Dynamic = railSync2?.offset() ?? 0;
    railSync2?.flush();
    let storeState11: Dynamic = __documentClosure.useCommentStore.getState();
    let ownScroll = (0, __documentClosure.resolveWidgetBridgeSlack)({
      anchorY: id4 + offset,
      docScrollY: railSync2?.docY() ?? storeState11.docScrollY,
    });
    if (ownScroll !== 0 && __documentClosure.onScrollDocRef.current?.(ownScroll)) {
      storeState11.predictDocScroll(ownScroll);
      railSync2?.predict(ownScroll);
      if (id3.box) {
        __documentClosure.elementRef24.current = {
          id: documentFrame,
          docPos: id4 + __documentClosure.fromScrollY,
          ownScroll: ownScroll,
          fromScrollY: __documentClosure.fromScrollY,
        };
      }
    }
  });
}

export function createDocumentFrameUpdateElement479(__documentClosure: Pick<DocumentFrameContext, "React" | "elementRef25">): Dynamic {
  return ((0, __documentClosure.React.useCallback)(
    (..._extraArguments: unknown[]): undefined => {
      let element: Dynamic = __documentClosure.elementRef25.current;
      if (element) {
        clearTimeout(element.end);
        clearTimeout(element.settle);
        clearTimeout(element.ceiling);
      }
      __documentClosure.elementRef25.current = null;
    },
    [],
  ));
}

export function createDocumentFrameGetState80(__documentClosure: Pick<DocumentFrameContext, "heldThreads" | "useCommentStore" | "isDatumPinThread" | "widgetAnchorOfThread" | "EditorSelectionAndTablesByFile2" | "fsEntryId">): Dynamic {
  return ((documentFrame?: Dynamic, ..._extraArguments: unknown[]) => {
      for (let event of (0, __documentClosure.heldThreads)(__documentClosure.useCommentStore.getState()) as Dynamic)
        if (event.id === documentFrame)
          return (0, __documentClosure.isDatumPinThread)(event) || !(0, __documentClosure.widgetAnchorOfThread)(event)
            ? __documentClosure.EditorSelectionAndTablesByFile2.getState().byFile[__documentClosure.fsEntryId]?.[
                event.target?.pageId ?? ``
              ] !== undefined
            : false;
      return false;
    });
}

export function createDocumentFrameUpdateCeiling81(__documentClosure: Pick<DocumentFrameContext, "React" | "elementRef25" | "updateElement4" | "elementRef23" | "widgetBridgeLimit1000">): Dynamic {
  return ((0, __documentClosure.React.useCallback)(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let element = (..._extraArguments: unknown[]): undefined => {
        if (__documentClosure.elementRef25.current === documentFrame) {
          clearTimeout(documentFrame.settle);
          clearTimeout(documentFrame.ceiling);
          documentFrame.settle = documentFrame.ceiling = undefined;
          if (--documentFrame.left < 0) {
            (0, __documentClosure.updateElement4)();
          } else {
            __documentClosure.elementRef23.current(documentFrame.id);
          }
        }
      };
      clearTimeout(documentFrame.settle);
      documentFrame.settle = setTimeout(element, 150);
      documentFrame.ceiling ??= setTimeout(element, __documentClosure.widgetBridgeLimit1000);
    },
    [__documentClosure.updateElement4],
  ));
}

export function createDocumentFrameEffect82(__documentClosure: Pick<DocumentFrameContext, "sheetScrollRef" | "useCommentStore" | "peekRef" | "getState" | "updateElement4" | "widgetBridgeLimit10000" | "elementRef25" | "elementRef24" | "readIdRef" | "isWidgetBridgeLastDocPos" | "updateCeiling" | "updateElement3">): Dynamic {
  return ((..._extraArguments: unknown[]): Dynamic => {
      if (__documentClosure.sheetScrollRef) {
        __documentClosure.sheetScrollRef.current = (
          documentFrame?: Dynamic,
          ..._extraArguments: unknown[]
        ) => {
          let storeState11: Dynamic = __documentClosure.useCommentStore.getState();
          if (
            !__documentClosure.peekRef.current ||
            storeState11.focusId !== documentFrame ||
            (!Object.hasOwn(storeState11.rects, documentFrame) &&
              !(0, __documentClosure.getState)(documentFrame))
          )
            return false;
          (0, __documentClosure.updateElement4)();
          let record4: Dynamic = {
            id: documentFrame,
            left: 8,
            end: setTimeout(__documentClosure.updateElement4, __documentClosure.widgetBridgeLimit10000),
          };
          __documentClosure.elementRef25.current = record4;
          let element: Dynamic = __documentClosure.elementRef24.current;
          let y7: Dynamic = __documentClosure.readIdRef.current(documentFrame)?.y;
          let element2: Dynamic =
            element?.id === documentFrame ? element : null;
          if (
            y7 !== undefined &&
            (0, __documentClosure.isWidgetBridgeLastDocPos)({
              docPos: y7 + storeState11.docScrollY,
              lastDocPos: element2?.docPos ?? null,
              ownScroll: element2?.ownScroll,
            })
          ) {
            (0, __documentClosure.updateCeiling)(record4);
          } else {
            if (y7 !== undefined && element2) {
              (0, __documentClosure.updateElement3)(
                y7 + storeState11.docScrollY,
                storeState11.docScrollY,
              );
            }
          }
          return true;
        };
        return (..._extraArguments: unknown[]): undefined => {
          __documentClosure.sheetScrollRef.current = null;
          (0, __documentClosure.updateElement4)();
        };
      }
    });
}

export function createDocumentFrameEffect83(__documentClosure: Pick<DocumentFrameContext, "elementRef25" | "documentFrameResult29" | "updateElement4" | "docPos" | "elementRef24" | "isWidgetBridgeLastDocPos" | "updateCeiling" | "updateElement3" | "fromScrollYRef">): Dynamic {
  return ((..._extraArguments: unknown[]): undefined => {
      let element: Dynamic = __documentClosure.elementRef25.current;
      if (!element) return;
      if (__documentClosure.documentFrameResult29 !== element.id) {
        (0, __documentClosure.updateElement4)();
        return;
      }
      if (__documentClosure.docPos === undefined) return;
      let element2: Dynamic =
        __documentClosure.elementRef24.current?.id === element.id ? __documentClosure.elementRef24.current : null;
      if (
        (0, __documentClosure.isWidgetBridgeLastDocPos)({
          docPos: __documentClosure.docPos,
          lastDocPos: element2?.docPos ?? null,
          ownScroll: element2?.ownScroll,
        })
      ) {
        (0, __documentClosure.updateCeiling)(element);
      } else {
        clearTimeout(element.settle);
        clearTimeout(element.ceiling);
        element.settle = element.ceiling = undefined;
        if (element2) {
          (0, __documentClosure.updateElement3)(__documentClosure.docPos, __documentClosure.fromScrollYRef.current);
        }
      }
    });
}

export function createDocumentFrameSlots84(__documentClosure: Pick<DocumentFrameContext, "peek" | "rail2" | "documentFrameHandler10" | "isWholeDocumentComment2" | "isWholeDocumentComment">): Dynamic {
  return (__documentClosure.peek
    ? []
    : __documentClosure.rail2.map(
        (file?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
          key: (0, __documentClosure.documentFrameHandler10)(file),
          y: (0, __documentClosure.isWholeDocumentComment2)(file),
          at: file.root?.at ?? ``,
          ...((0, __documentClosure.isWholeDocumentComment)(file)
            ? {
                wholePage: true,
              }
            : {}),
        }),
      ));
}

export function createDocumentFrameObserve385(__documentClosure: Pick<DocumentFrameContext, "React" | "elementRef26" | "setBodyH">): Dynamic {
  return ((0, __documentClosure.React.useCallback)(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      __documentClosure.elementRef26.current?.disconnect();
      __documentClosure.elementRef26.current = null;
      if (!documentFrame) {
        (0, __documentClosure.setBodyH)(0);
        return;
      }
      let resizeObserver = new ResizeObserver(
        (
          [documentFrame2]: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          let round = Math.round(
            documentFrame2?.borderBoxSize?.[0]?.blockSize ??
              documentFrame.offsetHeight,
          );
          (0, __documentClosure.setBodyH)(
            (
              documentFrame3?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => (documentFrame3 === round ? documentFrame3 : round),
          );
        },
      );
      resizeObserver.observe(documentFrame);
      __documentClosure.elementRef26.current = resizeObserver;
    },
    [],
  ));
}

export function createDocumentFrameMapDocumentSelectionTops286(__documentClosure: Pick<DocumentFrameContext, "mapDocumentSelectionTops" | "slots" | "heights" | "pivotKey" | "elementRef2" | "band">): Dynamic {
  return ((0, __documentClosure.mapDocumentSelectionTops)({
    slots: __documentClosure.slots,
    heights: __documentClosure.heights,
    pivotKey: __documentClosure.pivotKey,
    pivotOffset:
      __documentClosure.pivotKey !== null && __documentClosure.elementRef2.current?.key === __documentClosure.pivotKey
        ? __documentClosure.elementRef2.current.offset
        : 0,
    band: __documentClosure.band,
    floatMax: 400,
    gap: 8,
    estH: 56,
  }));
}

export function createDocumentFrameEffect87(__documentClosure: Pick<DocumentFrameContext, "railSync" | "draft" | "composeFloat" | "peek" | "documentFrameResult13">): Dynamic {
  return ((..._extraArguments: unknown[]): Dynamic => {
      if (__documentClosure.railSync) {
        __documentClosure.railSync.deferrable =
          !__documentClosure.draft && !__documentClosure.composeFloat && !(__documentClosure.peek && __documentClosure.documentFrameResult13 != null);
        if (!__documentClosure.railSync.deferrable) {
          __documentClosure.railSync.flush();
        }
        return (..._extraArguments: unknown[]): undefined => {
          __documentClosure.railSync.deferrable = true;
        };
      }
    });
}

export function createDocumentFrameEffect88(__documentClosure: Pick<DocumentFrameContext, "onOverhang" | "max" | "ceil2" | "labelRef">): Dynamic {
  return ((..._extraArguments: unknown[]): undefined => {
      if (!__documentClosure.onOverhang) return;
      let label = `${__documentClosure.max}|${__documentClosure.ceil2}`;
      if (__documentClosure.labelRef.current !== label) {
        __documentClosure.labelRef.current = label;
        (0, __documentClosure.onOverhang)(__documentClosure.max, __documentClosure.ceil2);
      }
    });
}

export function createDocumentFrameOnSelect89(__documentClosure: Pick<DocumentFrameContext, "enabledRef5" | "handFocusOut" | "setDraftY" | "ReactDom" | "storeState4" | "resolveCommentComponentsIsConnected" | "resolveCommentComponentsKey">): Dynamic {
  return (({ ["onSelect"]: ((..._extraArguments: unknown[]): undefined => {
    let enabled2: Dynamic = __documentClosure.enabledRef5.current;
    let activeElement = document.activeElement;
    if (enabled2) {
      (0, __documentClosure.handFocusOut)?.(`tabs`);
    }
    (0, __documentClosure.setDraftY)();
    (0, __documentClosure.ReactDom.flushSync)(
      (..._extraArguments: unknown[]): Dynamic => (0, __documentClosure.storeState4)(`hidden`),
    );
    if (
      enabled2 &&
      (0, __documentClosure.resolveCommentComponentsIsConnected)(activeElement, document)
    ) {
      (0, __documentClosure.handFocusOut)?.(`tabs`);
    }
    (0, __documentClosure.resolveCommentComponentsKey)(document, `hidden`);
  }) })["onSelect"]);
}

export function createDocumentFrameSetDraftY90(__documentClosure: Pick<DocumentFrameContext, "useCommentStore" | "documentFrameState" | "setDocumentFrameState">): Dynamic {
  return (({ ["setDraftY"]: ((..._extraArguments: unknown[]): undefined => {
    let storeState11: Dynamic = __documentClosure.useCommentStore.getState();
    storeState11.setDraftAnchor(null);
    storeState11.setDraftY(null);
    if (__documentClosure.documentFrameState !== null) {
      (0, __documentClosure.setDocumentFrameState)(null);
    }
  }) })["setDraftY"]);
}

export function createDocumentFrameEffect91(__documentClosure: Pick<DocumentFrameContext, "documentFrameResult13" | "draft" | "useCommentStore" | "onCancel" | "setDraftY" | "BOTTOM_SHEET_SCRIM_CLASS">): Dynamic {
  return ((..._extraArguments: unknown[]): Dynamic => {
      if (!__documentClosure.documentFrameResult13 && !__documentClosure.draft) return;
      let setFocus: Dynamic = (
        documentFrame?: Dynamic,
        ..._extraArguments: unknown[]
      ) => {
        let storeState11: Dynamic = __documentClosure.useCommentStore.getState();
        if (storeState11.dirtyEditors.size > 0) return false;
        let enabled3 = !!storeState11.focusId || !!storeState11.draftAnchor;
        if (storeState11.focusId) {
          storeState11.setFocus(null);
        }
        if (storeState11.draftAnchor) {
          if (documentFrame === `key`) {
            (0, __documentClosure.onCancel)();
          } else {
            (0, __documentClosure.setDraftY)();
          }
        }
        return enabled3;
      };
      let label = `[role="menu"], [role="dialog"], [role="alertdialog"], [role="listbox"], [role="tooltip"], .${__documentClosure.BOTTOM_SHEET_SCRIM_CLASS}`;
      let enabled2: Dynamic = false;
      let querySelector = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let target: Dynamic = event.target;
        let parentElement: Dynamic = target?.parentElement;
        enabled2 =
          !!target &&
          !!parentElement &&
          parentElement.hasAttribute(`data-cds-portal`) &&
          target.childElementCount === 0 &&
          target.style.position === `fixed` &&
          parentElement.querySelector(`[role="menu"]`) !== null;
      };
      let closest = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (event.button !== 0) return;
        let target: Dynamic = event.target;
        if (
          !(
            enabled2 ||
            target?.closest?.(`[data-testid="ldoc-comments"], ${label}`)
          )
        ) {
          setFocus(`pointer`);
        }
      };
      let closest2 = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (event.key !== `Escape` || event.defaultPrevented) return;
        let activeElement = document.activeElement;
        if (activeElement?.closest?.(label)) return;
        let enabled3 = !!activeElement?.closest?.(
          `[data-testid="ldoc-comments"], [data-testid="ldoc-comment-draft"]`,
        );
        let setFocus2: Dynamic = setFocus(`key`);
        if (
          enabled3 &&
          (setFocus2 ||
            activeElement?.closest?.(
              `[data-testid="ldoc-comment-draft"], [data-comment-stop][data-expanded]`,
            ))
        ) {
          event.preventDefault();
        }
      };
      window.addEventListener(`mousedown`, querySelector, true);
      window.addEventListener(`mousedown`, closest);
      window.addEventListener(`keydown`, closest2);
      return (..._extraArguments: unknown[]): undefined => {
        window.removeEventListener(`mousedown`, querySelector, true);
        window.removeEventListener(`mousedown`, closest);
        window.removeEventListener(`keydown`, closest2);
      };
    });
}

export function createDocumentFrameOnPost92(__documentClosure: Pick<DocumentFrameContext, "setDraftY2" | "draft">): Dynamic {
  return (({ ["onPost"]: (async (
    documentFrame?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    dependencies?: unknown,
    argument?: Dynamic,
    ..._extraArguments: unknown[]
  ) => (0, __documentClosure.setDraftY2)(__documentClosure.draft, documentFrame, options, context, argument)) })["onPost"]);
}
