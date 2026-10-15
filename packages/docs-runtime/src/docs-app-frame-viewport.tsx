/** BaoCut: extracted comment frame viewport expressions; state remains owned by the original closure. */
import type { Dynamic } from "./types";
import type { DocumentFrameContext } from "./docs-app-frame-context";

export function createDocumentFrameEffect62(__documentClosure: Pick<DocumentFrameContext, "listPopover" | "useCommentStore" | "elementRef19" | "isDocumentFrameTarget" | "handFocusOutRef">): Dynamic {
  return ((..._extraArguments: unknown[]): Dynamic => {
      if (!__documentClosure.listPopover) return;
      let setCommentMode: Dynamic = (
        documentFrame?: Dynamic,
        ..._extraArguments: unknown[]
      ) => {
        let storeState11: Dynamic = __documentClosure.useCommentStore.getState();
        return storeState11.draftAnchor || storeState11.dirtyEditors.size > 0
          ? false
          : (documentFrame?.(), storeState11.setCommentMode(`margin`), true);
      };
      let closest = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let target: Dynamic = event.target;
        if (!(!target || __documentClosure.elementRef19.current?.contains(target))) {
          if (target.closest(`#root`)) {
            if (!target.closest(`[data-testid="ldoc-comments-btn"]`)) {
              setCommentMode();
            }
          }
        }
      };
      let closest2 = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (event.key !== `Escape`) return;
        let target: Dynamic = event.target;
        if (
          (target && !target.closest(`#root`)) ||
          (0, __documentClosure.isDocumentFrameTarget)(event) ||
          !setCommentMode(
            (..._extraArguments: unknown[]): Dynamic =>
              __documentClosure.elementRef19.current?.contains(target) &&
              __documentClosure.handFocusOutRef.current?.(`text`),
          )
        )
          return;
        let storeState11: Dynamic = __documentClosure.useCommentStore.getState();
        if (storeState11.focusId) {
          storeState11.setFocus(null);
        }
        if (target?.closest(`[data-testid="ldoc-comments"]`)) {
          event.preventDefault();
        }
      };
      document.addEventListener(`mousedown`, closest, true);
      document.addEventListener(`keydown`, closest2, true);
      return (..._extraArguments: unknown[]): undefined => {
        document.removeEventListener(`mousedown`, closest, true);
        document.removeEventListener(`keydown`, closest2, true);
      };
    });
}

export function createDocumentFrameEffect63(__documentClosure: Pick<DocumentFrameContext, "peek" | "useCommentStore" | "elementRef13" | "isDocumentFrameTarget">): Dynamic {
  return ((..._extraArguments: unknown[]): Dynamic => {
      if (!__documentClosure.peek) return;
      let setFocus: Dynamic = (..._extraArguments: unknown[]) => {
        let storeState11: Dynamic = __documentClosure.useCommentStore.getState();
        return !storeState11.focusId || storeState11.dirtyEditors.size > 0
          ? false
          : (storeState11.setFocus(null), true);
      };
      let closest = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let target: Dynamic = event.target;
        if (!(!target || __documentClosure.elementRef13.current?.contains(target))) {
          if (target.closest(`#root`)) {
            setFocus();
          }
        }
      };
      let closest2 = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (event.key !== `Escape`) return;
        let target: Dynamic = event.target;
        if (
          (target && !target.closest(`#root`)) ||
          (0, __documentClosure.isDocumentFrameTarget)(event)
        )
          return;
        let enabled2 = !!target?.closest(`[data-testid="ldoc-comments"]`);
        if (setFocus() && enabled2) {
          event.preventDefault();
        }
      };
      document.addEventListener(`mousedown`, closest, true);
      document.addEventListener(`keydown`, closest2, true);
      return (..._extraArguments: unknown[]): undefined => {
        document.removeEventListener(`mousedown`, closest, true);
        document.removeEventListener(`keydown`, closest2, true);
      };
    });
}

export function createDocumentFrameEffect64(__documentClosure: Pick<DocumentFrameContext, "draft" | "readOnly" | "elementRef20" | "elementRef3" | "isDocumentFocusedElsewhere" | "documentSourcePromptLimit250">): Dynamic {
  return ((..._extraArguments: unknown[]): Dynamic => {
      if (!__documentClosure.draft || __documentClosure.readOnly) return;
      let querySelector: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
        __documentClosure.elementRef20.current ??
        __documentClosure.elementRef3.current?.querySelector(
          `[data-testid="ldoc-comment-draft"]`,
        ) ??
        null;
      let focus3 = (..._extraArguments: unknown[]): undefined => {
        let matchedElement: Dynamic = querySelector();
        let matchedElement2: Dynamic = matchedElement?.querySelector(
          `[contenteditable="true"]`,
        );
        if (!matchedElement || !matchedElement2) return;
        let activeElement = document.activeElement;
        if (
          !(
            (activeElement !== null &&
              matchedElement.contains(activeElement)) ||
            (0, __documentClosure.isDocumentFocusedElsewhere)(document)
          )
        ) {
          matchedElement2.focus({
            preventScroll: true,
          });
        }
      };
      let enabled2 = false;
      let enabled3 = false;
      let items2: Dynamic = [];
      let documentFrameHandler17 = (..._extraArguments: unknown[]): undefined =>
        void (enabled2 = true);
      let documentFrameHandler18 = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (event.key === `Tab` || event.key === `Escape`) {
          enabled2 = true;
        }
      };
      let contains = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (enabled3 || enabled2) return;
        let matchedElement: Dynamic = querySelector();
        if (
          !matchedElement ||
          !(event.target instanceof Node) ||
          !matchedElement.contains(event.target)
        )
          return;
        let relatedTarget: Dynamic = event.relatedTarget;
        if (
          !(
            relatedTarget instanceof Node &&
            matchedElement.contains(relatedTarget)
          )
        ) {
          enabled3 = true;
          items2.push(requestAnimationFrame(focus3));
        }
      };
      items2.push(
        requestAnimationFrame(
          (..._extraArguments: unknown[]): undefined =>
            void items2.push(requestAnimationFrame(focus3)),
        ),
      );
      window.addEventListener(`pointerdown`, documentFrameHandler17, true);
      window.addEventListener(`keydown`, documentFrameHandler18, true);
      document.addEventListener(`focusout`, contains, true);
      let removeEventListener: Dynamic = (..._extraArguments: unknown[]) =>
        document.removeEventListener(`focusout`, contains, true);
      let setTimeout2 = setTimeout(
        removeEventListener,
        __documentClosure.documentSourcePromptLimit250,
      );
      return (..._extraArguments: unknown[]): undefined => {
        clearTimeout(setTimeout2);
        removeEventListener();
        window.removeEventListener(`pointerdown`, documentFrameHandler17, true);
        window.removeEventListener(`keydown`, documentFrameHandler18, true);
        for (let documentFrameResult36 of items2 as Dynamic)
          cancelAnimationFrame(documentFrameResult36);
      };
    });
}

export function createDocumentFrameEffect65(__documentClosure: Pick<DocumentFrameContext, "composeFloat" | "DocumentSourcePromptState4" | "elementRef20">): Dynamic {
  return ((..._extraArguments: unknown[]): Dynamic => {
      if (__documentClosure.composeFloat) {
        __documentClosure.DocumentSourcePromptState4 = (
          ..._extraArguments: unknown[]
        ): undefined => {
          __documentClosure.elementRef20.current?.animate(
            [
              {
                boxShadow: `0 0 0 3px var(--cds-fill-accent, #2A78D6)`,
              },
              {
                boxShadow: `0 0 0 6px rgba(42,120,214,0)`,
              },
            ],
            {
              duration: 600,
              easing: `ease-out`,
            },
          );
        };
        return (..._extraArguments: unknown[]): undefined => {
          __documentClosure.DocumentSourcePromptState4 = null;
        };
      }
    });
}

export function createDocumentFrameSetDocumentFrameSet2State266(__documentClosure: Pick<DocumentFrameContext, "React" | "setHeights" | "setDocumentFrameSet2State">): Dynamic {
  return ((0, __documentClosure.React.useCallback)(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      (0, __documentClosure.setHeights)(
        (documentFrame2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          let documentFrame3: Dynamic = documentFrame2;
          for (let [
            documentFrameResult36,
            documentFrameResult37,
          ] of documentFrame as Dynamic)
            if (
              documentFrame2[documentFrameResult36] !== documentFrameResult37
            ) {
              if (documentFrame3 === documentFrame2) {
                documentFrame3 = {
                  ...documentFrame2,
                };
              }
              documentFrame3[documentFrameResult36] = documentFrameResult37;
            }
          return documentFrame3;
        },
      );
      (0, __documentClosure.setDocumentFrameSet2State)(
        (documentFrame2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          let documentFrameResult36: Dynamic = null;
          for (let [
            documentFrameResult37,
            ,
            documentFrameResult38,
          ] of documentFrame as Dynamic)
            if (
              documentFrame2.has(documentFrameResult37) !==
              documentFrameResult38
            ) {
              documentFrameResult36 ??= new (Set as Dynamic)(documentFrame2);
              if (documentFrameResult38) {
                documentFrameResult36.add(documentFrameResult37);
              } else {
                documentFrameResult36.delete(documentFrameResult37);
              }
            }
          return documentFrameResult36 ?? documentFrame2;
        },
      );
    },
    [],
  ));
}

export function createDocumentFrameCallback867(__documentClosure: Pick<DocumentFrameContext, "React" | "recordRef2" | "resolveDocumentFrameValue">): Dynamic {
  return ((0, __documentClosure.React.useCallback)(
    (..._extraArguments: unknown[]): Dynamic =>
      Object.entries(__documentClosure.recordRef2.current).map(
        (
          [recordEntry, recordEntry2]: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => [
          recordEntry,
          recordEntry2.offsetHeight,
          (0, __documentClosure.resolveDocumentFrameValue)(recordEntry2),
        ],
      ),
    [],
  ));
}

export function createDocumentFrameUpdateelementRef22_current68(__documentClosure: Pick<DocumentFrameContext, "resolveDocumentFrameValue" | "setDocumentFrameSet2State2">): Dynamic {
  return ((documentFrame?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let items2: Dynamic = [];
      for (let event of documentFrame as Dynamic) {
        let measureKey: Dynamic = event.target.dataset.measureKey;
        if (measureKey) {
          items2.push([
            measureKey,
            Math.round(
              event.borderBoxSize[0]?.blockSize ?? event.contentRect.height,
            ),
            (0, __documentClosure.resolveDocumentFrameValue)(event.target),
          ]);
        }
      }
      (0, __documentClosure.setDocumentFrameSet2State2)(items2);
    });
}

export function createDocumentFrameCallback969(__documentClosure: Pick<DocumentFrameContext, "React" | "recordRef2" | "elementRef22">): Dynamic {
  return ((0, __documentClosure.React.useCallback)(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      (documentFrame2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        if (documentFrame2) {
          documentFrame2.dataset.measureKey = documentFrame;
          __documentClosure.recordRef2.current[documentFrame] = documentFrame2;
          __documentClosure.elementRef22.current?.observe(documentFrame2);
        } else {
          let recordItem: Dynamic = __documentClosure.recordRef2.current[documentFrame];
          if (recordItem) {
            __documentClosure.elementRef22.current?.unobserve(recordItem);
          }
          delete __documentClosure.recordRef2.current[documentFrame];
        }
      },
    [],
  ));
}

export function createDocumentFrameCommentAttachmentState270(__documentClosure: Pick<DocumentFrameContext, "commentAttachmentState" | "documentFrameResult10" | "documentFrameHandler11">): Dynamic {
  return (({ ["commentAttachmentState2"]: ((
    documentFrame?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    (0, __documentClosure.commentAttachmentState)(
      documentFrame,
      __documentClosure.documentFrameResult10,
      __documentClosure.documentFrameHandler11,
    )) })["commentAttachmentState2"]);
}

export function createDocumentFrameIsDetachedResolvedComment271(__documentClosure: Pick<DocumentFrameContext, "isDetachedResolvedComment" | "documentFrameResult10" | "documentFrameHandler11" | "documentSourcePromptSet2">): Dynamic {
  return (({ ["isDetachedResolvedComment2"]: ((
    documentFrame?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    (0, __documentClosure.isDetachedResolvedComment)(
      documentFrame,
      __documentClosure.documentFrameResult10,
      __documentClosure.documentFrameHandler11,
      __documentClosure.documentSourcePromptSet2,
    )) })["isDetachedResolvedComment2"]);
}

export function createDocumentFrameCommentAttachmentState372(__documentClosure: Pick<DocumentFrameContext, "commentAttachmentState2">): Dynamic {
  return (({ ["commentAttachmentState3"]: ((
    documentFrame?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let commentAttachmentState4: Dynamic =
      (0, __documentClosure.commentAttachmentState2)(documentFrame);
    return (
      commentAttachmentState4 === `detached` ||
      commentAttachmentState4 === `pending`
    );
  }) })["commentAttachmentState3"]);
}
