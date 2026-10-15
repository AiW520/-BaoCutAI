/** BaoCut: extracted comment frame focus expressions; state remains owned by the original closure. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import type { DocumentFrameContext } from "./context";

export function createDocumentFrameQuerySelectorAll45(__documentClosure: Pick<DocumentFrameContext, "elementRef5">): Dynamic {
  return (({ ["querySelectorAll"]: ((
    documentFrame?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (
      !documentFrame.dataset.mode?.startsWith(`list`) ||
      __documentClosure.elementRef5.current < 0
    )
      return null;
    let matchedElements: Dynamic =
      documentFrame.querySelectorAll(`[data-comment-stop]`);
    return matchedElements.length === 0
      ? null
      : matchedElements[
          Math.min(__documentClosure.elementRef5.current, matchedElements.length - 1)
        ];
  }) })["querySelectorAll"]);
}

export function createDocumentFrameFocus246(__documentClosure: Pick<DocumentFrameContext, "elementRef4" | "elementRef3" | "elementRef5" | "handFocusOutRef" | "useCommentStore" | "resolvePlatformAnnouncementsValue" | "listFilterSaid" | "elementRef10" | "elementRef11" | "documentFrameHandler9" | "querySelectorAll" | "enabledRef4" | "filter">): Dynamic {
  return (({ ["focus2"]: ((..._extraArguments: unknown[]): undefined => {
    let element: Dynamic = __documentClosure.elementRef4.current;
    if (!element) return;
    let element2: Dynamic = __documentClosure.elementRef3.current;
    if (element.el.isConnected) {
      let closest: Dynamic = element.el.closest(`[data-comment-stop]`);
      if (closest && element2) {
        __documentClosure.elementRef5.current = [
          ...element2.querySelectorAll(`[data-comment-stop]`),
        ].indexOf(closest);
      }
      return;
    }
    __documentClosure.elementRef4.current = null;
    let activeElement = document.activeElement;
    if (
      (activeElement !== null && activeElement !== document.body) ||
      !document.hasFocus()
    )
      return;
    if (!element2?.isConnected) {
      if (
        element.margin &&
        __documentClosure.handFocusOutRef.current?.(`text`) &&
        __documentClosure.useCommentStore.getState().commentMode !== `hidden`
      ) {
        (0, __documentClosure.resolvePlatformAnnouncementsValue)(document, (0, __documentClosure.listFilterSaid)(`open`, 0), {
          key: `comment-list`,
        });
      }
      return;
    }
    if (
      __documentClosure.elementRef10.current !== null &&
      __documentClosure.elementRef11.current?.contains(element.el) &&
      __documentClosure.handFocusOutRef.current?.(`text`)
    )
      return;
    let documentFrameHandler17: Dynamic = (0, __documentClosure.documentFrameHandler9)();
    let matchedElements: Dynamic =
      (0, __documentClosure.querySelectorAll)(element2) ??
      element2.querySelector(`[data-comment-stop]:not([tabindex="-1"])`) ??
      documentFrameHandler17;
    if (matchedElements) {
      __documentClosure.enabledRef4.current = true;
      try {
        matchedElements.focus({
          preventScroll: true,
          focusVisible: true,
        });
      } finally {
        __documentClosure.enabledRef4.current = false;
      }
    }
    if (
      matchedElements !== null &&
      matchedElements === documentFrameHandler17
    ) {
      (0, __documentClosure.resolvePlatformAnnouncementsValue)(document, (0, __documentClosure.listFilterSaid)(__documentClosure.filter, 0), {
        key: `comment-list`,
      });
    }
  }) })["focus2"]);
}

export function createDocumentFrameEffect47(__documentClosure: Pick<DocumentFrameContext, "elementRef3" | "elementRef6" | "elementRef4" | "elementRef5" | "focusRef">): Dynamic {
  return ((..._extraArguments: unknown[]): undefined => {
    let root: Dynamic = __documentClosure.elementRef3.current;
    if (
      __documentClosure.elementRef6.current?.root === root ||
      (__documentClosure.elementRef6.current?.mo.disconnect(),
      (__documentClosure.elementRef6.current = null),
      __documentClosure.elementRef4.current === null && (__documentClosure.elementRef5.current = -1),
      queueMicrotask(
        (..._extraArguments: unknown[]): Dynamic => __documentClosure.focusRef.current(),
      ),
      !root || typeof MutationObserver === "undefined")
    )
      return;
    let mutationObserver = new MutationObserver(
      (..._extraArguments: unknown[]): Dynamic => __documentClosure.focusRef.current(),
    );
    mutationObserver.observe(root, {
      childList: true,
      subtree: true,
    });
    __documentClosure.elementRef6.current = {
      root: root,
      mo: mutationObserver,
    };
  });
}

export function createDocumentFrameEffect48(__documentClosure: Pick<DocumentFrameContext, "elementRef6" | "focusRef">): Dynamic {
  return ((..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): undefined => {
        __documentClosure.elementRef6.current?.mo.disconnect();
        __documentClosure.elementRef6.current = null;
        queueMicrotask(
          (..._extraArguments: unknown[]): Dynamic => __documentClosure.focusRef.current(),
        );
      });
}

export function createDocumentFrameQuerySelectorAll249(__documentClosure: Pick<DocumentFrameContext, "elementRef3">): Dynamic {
  return (({ ["querySelectorAll2"]: ((
    documentFrame?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    [
      ...(__documentClosure.elementRef3.current?.querySelectorAll(`[data-comment-stop]`) ?? []),
    ].find(
      (item?: Dynamic, ..._extraArguments: unknown[]) =>
        item.dataset.stopId === documentFrame,
    ) ?? null) })["querySelectorAll2"]);
}

export function createDocumentFrameQuerySelectorAll350(__documentClosure: Pick<DocumentFrameContext, "elementRef3">): Dynamic {
  return (({ ["querySelectorAll3"]: ((
    documentFrame?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    [
      ...(__documentClosure.elementRef3.current?.querySelectorAll(
        `[data-testid="comment-icon"], [data-testid="comment-icon-folded"]`,
      ) ?? []),
    ].find(
      (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        (item.dataset.threads ?? ``).split(` `).includes(documentFrame),
    ) ?? null) })["querySelectorAll3"]);
}

export function createDocumentFrameEffect51(__documentClosure: Pick<DocumentFrameContext, "documentFrameResult25" | "useCommentStore" | "mode" | "draft" | "fileThreads" | "documentFrameResult16" | "items" | "documentFrameResult22" | "filter" | "enabledRef" | "elementRef8" | "setFilter" | "setDocumentFrameState5">): Dynamic {
  return ((..._extraArguments: unknown[]) => {
      if (__documentClosure.documentFrameResult25 === null) return;
      let { id: documentFrameResult36 }: Dynamic = __documentClosure.documentFrameResult25;
      let revealInList = (..._extraArguments: unknown[]): undefined => {
        if (
          __documentClosure.useCommentStore.getState().listRevealAsk === __documentClosure.documentFrameResult25
        ) {
          __documentClosure.useCommentStore.getState().revealInList(null);
        }
      };
      if (__documentClosure.mode !== `list` || __documentClosure.draft) return revealInList();
      if (
        !__documentClosure.fileThreads.some(
          (fileThread?: Dynamic, ..._extraArguments: unknown[]) =>
            fileThread.id === documentFrameResult36,
        )
      ) {
        let some = [
          ...__documentClosure.documentFrameResult16,
          ...__documentClosure.items,
          ...(__documentClosure.documentFrameResult22 ?? []),
        ].some(
          (item?: Dynamic, ..._extraArguments: unknown[]) =>
            item.id === documentFrameResult36,
        );
        if (__documentClosure.filter === `all` || !some) return revealInList();
        __documentClosure.enabledRef.current = true;
        __documentClosure.elementRef8.current = __documentClosure.documentFrameResult25;
        (0, __documentClosure.setFilter)(`all`);
        return;
      }
      revealInList();
      (0, __documentClosure.setDocumentFrameState5)(
        __documentClosure.elementRef8.current === __documentClosure.documentFrameResult25
          ? {
              id: documentFrameResult36,
              again: false,
            }
          : __documentClosure.documentFrameResult25,
      );
      __documentClosure.elementRef8.current = null;
    });
}

export function createDocumentFrameEffect52(__documentClosure: Pick<DocumentFrameContext, "documentFrameState4" | "setDocumentFrameState5" | "elementRef7" | "memoized2" | "resolveDataModelSchemasCardTop2">): Dynamic {
  return ((..._extraArguments: unknown[]): undefined => {
      if (__documentClosure.documentFrameState4 === null) return;
      (0, __documentClosure.setDocumentFrameState5)(
        (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          documentFrame === __documentClosure.documentFrameState4 ? null : documentFrame,
      );
      let element: Dynamic = __documentClosure.elementRef7.current;
      if (!element) return;
      let memoized6: Dynamic = __documentClosure.memoized2.find(
        (memoized7?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          memoized7.threads.some(
            (thread?: Dynamic, ..._extraArguments: unknown[]) =>
              thread.id === __documentClosure.documentFrameState4.id,
          ),
      );
      let closest: Dynamic = memoized6
        ? [...element.querySelectorAll(`[data-comment-stop]`)]
            .find(
              (item?: Dynamic, ..._extraArguments: unknown[]) =>
                item.dataset.stopId === `node:${memoized6.nodeId}`,
            )
            ?.closest(`[role="listitem"]`)
        : [...element.querySelectorAll(`[data-thread-id]`)].find(
            (item?: Dynamic, ..._extraArguments: unknown[]) =>
              item.dataset.threadId === __documentClosure.documentFrameState4.id,
          );
      if (!closest) return;
      let closestBounds: Dynamic = closest.getBoundingClientRect();
      let elementBounds: Dynamic = element.getBoundingClientRect();
      let top = (0, __documentClosure.resolveDataModelSchemasCardTop2)({
        rowTop: closestBounds.top,
        rowBottom: closestBounds.bottom,
        listTop: elementBounds.top,
        listBottom: elementBounds.bottom,
        listScrollTop: element.scrollTop,
        again: __documentClosure.documentFrameState4.again,
      });
      if (top === 0) return;
      let matches = window.matchMedia?.(
        `(prefers-reduced-motion: reduce)`,
      ).matches;
      element.scrollBy?.({
        top: top,
        behavior: matches ? `auto` : `smooth`,
      });
    });
}

export function createDocumentFrameEffect53(__documentClosure: Pick<DocumentFrameContext, "documentFrameResult26" | "useCommentStore" | "DocumentRuntime_Styles6" | "memoizedRef" | "querySelectorAll2" | "resolvePlatformAnnouncementsValue" | "CommentComponents_Message3" | "elementRef10" | "elementRef11" | "enabledRef5">): Dynamic {
  return ((..._extraArguments: unknown[]): Dynamic => {
      if (__documentClosure.documentFrameResult26 === null) return;
      let { id: documentFrameResult36 }: Dynamic = __documentClosure.documentFrameResult26;
      let focusCardByKey = (..._extraArguments: unknown[]): undefined => {
        if (__documentClosure.useCommentStore.getState().cardKeyAsk === __documentClosure.documentFrameResult26) {
          __documentClosure.useCommentStore.getState().focusCardByKey(null);
        }
      };
      let count = 30;
      let count2 = 0;
      let focus3: Dynamic = (..._extraArguments: unknown[]) => {
        let storeState11: Dynamic = __documentClosure.useCommentStore.getState();
        if (storeState11.cardKeyAsk !== __documentClosure.documentFrameResult26) return;
        if (
          storeState11.focusId !== documentFrameResult36 ||
          !document.hasFocus() ||
          !document.activeElement?.matches(__documentClosure.DocumentRuntime_Styles6)
        )
          return focusCardByKey();
        let memoized6: Dynamic = __documentClosure.memoizedRef.current.find(
          (memoized7?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            memoized7.threads.some(
              (thread?: Dynamic, ..._extraArguments: unknown[]) =>
                thread.id === documentFrameResult36,
            ),
        );
        let matchedElements: Dynamic =
          (0, __documentClosure.querySelectorAll2)(documentFrameResult36) ??
          (memoized6 ? (0, __documentClosure.querySelectorAll2)(`node:${memoized6.nodeId}`) : null);
        if (!matchedElements) {
          if (--count > 0) {
            count2 = requestAnimationFrame(focus3);
          } else {
            focusCardByKey();
            (0, __documentClosure.resolvePlatformAnnouncementsValue)(
              document,
              __documentClosure.CommentComponents_Message3,
              {
                key: `comment-card`,
              },
            );
          }
          return;
        }
        focusCardByKey();
        __documentClosure.elementRef10.current = documentFrameResult36;
        __documentClosure.elementRef11.current = matchedElements;
        __documentClosure.enabledRef5.current = true;
        matchedElements.focus({
          preventScroll: true,
          focusVisible: true,
        });
      };
      focus3();
      return (..._extraArguments: unknown[]) => cancelAnimationFrame(count2);
    });
}

export function createDocumentFrameEffect54(__documentClosure: Pick<DocumentFrameContext, "elementRef10" | "elementRef11" | "isPlatformKeyboardAndSaveStatusKeyCode" | "resolvePlatformAnnouncementsValue" | "CommentComponents_FirstPressEscapeToGoBackToTheText">): Dynamic {
  return ((..._extraArguments: unknown[]): Dynamic => {
    let documentFrameHandler17 = (
      event?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        __documentClosure.elementRef10.current === null ||
        event.target !== __documentClosure.elementRef11.current
      )
        return;
      let documentFrameResult36 = (0, __documentClosure.isPlatformKeyboardAndSaveStatusKeyCode)(event);
      if (
        !(
          documentFrameResult36 === null ||
          (!event.metaKey && documentFrameResult36 !== `m`)
        )
      ) {
        event.preventDefault();
        event.stopPropagation();
        (0, __documentClosure.resolvePlatformAnnouncementsValue)(
          document,
          __documentClosure.CommentComponents_FirstPressEscapeToGoBackToTheText,
          {
            key: `comment-card`,
          },
        );
      }
    };
    document.addEventListener(`keydown`, documentFrameHandler17, true);
    return (..._extraArguments: unknown[]) =>
      document.removeEventListener(`keydown`, documentFrameHandler17, true);
  });
}

export function createDocumentFrameEffect55(__documentClosure: Pick<DocumentFrameContext, "documentSourcePromptLimit02" | "useCommentStore">): Dynamic {
  return ((..._extraArguments: unknown[]): Dynamic => (
      __documentClosure.documentSourcePromptLimit02++,
      (..._extraArguments: unknown[]): undefined => {
        __documentClosure.documentSourcePromptLimit02--;
        queueMicrotask((..._extraArguments: unknown[]): undefined => {
          if (__documentClosure.documentSourcePromptLimit02 === 0) {
            __documentClosure.useCommentStore.getState().focusCardByKey(null);
          }
        });
      }
    ));
}

export function createDocumentFrameEffect56(__documentClosure: Pick<DocumentFrameContext, "elementRef12" | "documentFrameResult13" | "elementRef9" | "enabledRef6" | "elementRef10" | "elementRef11" | "querySelectorAll2" | "enabledRef5" | "documentFrameHandler9" | "isDocumentFocusedElsewhere" | "handFocusOutRef" | "documentFrameResult16" | "items" | "querySelectorAll3" | "iconLane" | "elementRef3" | "querySelectorAll" | "enabledRef4" | "resolvePlatformAnnouncementsValue" | "CommentComponents_CommentCollapsed">): Dynamic {
  return ((..._extraArguments: unknown[]): undefined => {
      let element: Dynamic = __documentClosure.elementRef12.current;
      __documentClosure.elementRef12.current = __documentClosure.documentFrameResult13;
      let element2: Dynamic = __documentClosure.elementRef9.current;
      __documentClosure.elementRef9.current = null;
      let enabled2: Dynamic = __documentClosure.enabledRef6.current;
      __documentClosure.enabledRef6.current = false;
      let matchesElement = element !== null && __documentClosure.elementRef10.current === element;
      let element3: Dynamic = matchesElement ? __documentClosure.elementRef11.current : null;
      if (
        __documentClosure.elementRef10.current !== null &&
        __documentClosure.elementRef10.current !== __documentClosure.documentFrameResult13
      ) {
        __documentClosure.elementRef10.current = null;
        __documentClosure.elementRef11.current = null;
      }
      if (__documentClosure.documentFrameResult13 !== null) {
        if (element2 === __documentClosure.documentFrameResult13 || enabled2) {
          (0, __documentClosure.querySelectorAll2)(__documentClosure.documentFrameResult13)?.focus({
            preventScroll: true,
          });
        }
        return;
      }
      if (element === null || !__documentClosure.enabledRef5.current) return;
      let activeElement = document.activeElement;
      let matchedElements: Dynamic =
        (0, __documentClosure.querySelectorAll2)(element) ?? (element3?.isConnected ? element3 : null);
      let enabled3: Dynamic =
        !!activeElement &&
        !!matchedElements &&
        matchedElements.contains(activeElement);
      let enabled4 =
        !activeElement ||
        activeElement === document.body ||
        activeElement === (0, __documentClosure.documentFrameHandler9)();
      if (!enabled3 && !enabled4) return;
      let isDocumentFocusedElsewhere2: Dynamic =
        (0, __documentClosure.isDocumentFocusedElsewhere)(document);
      if (
        matchesElement &&
        (isDocumentFocusedElsewhere2 || __documentClosure.handFocusOutRef.current?.(`text`))
      )
        return;
      let some: Dynamic =
        __documentClosure.documentFrameResult16.some(
          (documentFrameResult36?: Dynamic, ..._extraArguments: unknown[]) =>
            documentFrameResult36.id === element,
        ) ||
        __documentClosure.items.some(
          (item?: Dynamic, ..._extraArguments: unknown[]) =>
            item.id === element,
        );
      let matchedElements2: Dynamic = (0, __documentClosure.querySelectorAll3)(element);
      let enabled5 = !matchedElements && (__documentClosure.iconLane ? !matchedElements2 : !some);
      let matchedElements3: Dynamic =
        matchedElements ??
        matchedElements2 ??
        (__documentClosure.elementRef3.current ? (0, __documentClosure.querySelectorAll)(__documentClosure.elementRef3.current) : null) ??
        __documentClosure.elementRef3.current?.querySelector(
          `[data-comment-stop]:not([tabindex="-1"])`,
        ) ??
        __documentClosure.elementRef3.current?.querySelector(`[data-testid="comment-icon"]`) ??
        null;
      if (
        matchedElements3 &&
        matchedElements3 !== activeElement &&
        !isDocumentFocusedElsewhere2
      ) {
        __documentClosure.enabledRef4.current =
          matchedElements3 !== matchedElements &&
          matchedElements3 !== matchedElements2;
        matchedElements3.focus({
          preventScroll: true,
        });
        __documentClosure.enabledRef4.current = false;
      }
      if (
        !enabled5 &&
        (!matchedElements || matchedElements.getAttribute(`role`) === `article`)
      ) {
        (0, __documentClosure.resolvePlatformAnnouncementsValue)(
          document,
          __documentClosure.CommentComponents_CommentCollapsed,
          {
            key: `comment-card`,
          },
        );
      }
    });
}

export function createDocumentFrameAddEventListener257(__documentClosure: Pick<DocumentFrameContext, "elementRef14" | "railWheelMountedRef" | "onScrollDocRef" | "resolveDataModelSchemasTarget" | "DocumentRuntime_Styles6" | "railSyncRef" | "useCommentStore">): Dynamic {
  return ((documentFrame?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      __documentClosure.elementRef14.current?.();
      __documentClosure.elementRef14.current = null;
      let parentElement: Dynamic = documentFrame?.parentElement;
      if (!documentFrame || !parentElement) return;
      let railWheelMountedRef2: Dynamic = __documentClosure.railWheelMountedRef;
      let getState2 = (
        documentFrame2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let onScrollDoc2: Dynamic = __documentClosure.onScrollDocRef.current;
        if (onScrollDoc2) {
          (0, __documentClosure.resolveDataModelSchemasTarget)(
            documentFrame2,
            documentFrame,
            parentElement,
            __documentClosure.DocumentRuntime_Styles6,
            __documentClosure.railSyncRef.current?.docY() ??
              __documentClosure.useCommentStore.getState().docScrollY,
            onScrollDoc2,
          );
        }
      };
      parentElement.addEventListener(`wheel`, getState2, {
        passive: false,
      });
      if (railWheelMountedRef2) {
        railWheelMountedRef2.current = true;
      }
      __documentClosure.elementRef14.current = (..._extraArguments: unknown[]): undefined => {
        parentElement.removeEventListener(`wheel`, getState2);
        if (railWheelMountedRef2) {
          railWheelMountedRef2.current = false;
        }
      };
    });
}

export function createDocumentFrameObserve58(__documentClosure: Pick<DocumentFrameContext, "React" | "addEventListener2" | "elementRef3" | "elementRef15" | "setRailH">): Dynamic {
  return ((0, __documentClosure.React.useCallback)(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      (0, __documentClosure.addEventListener2)(documentFrame);
      __documentClosure.elementRef3.current = documentFrame;
      __documentClosure.elementRef15.current?.disconnect();
      __documentClosure.elementRef15.current = null;
      if (!documentFrame) return;
      let setRailH2 = (..._extraArguments: unknown[]): undefined => {
        let clientHeight: Dynamic = documentFrame.clientHeight;
        (0, __documentClosure.setRailH)(
          (documentFrame2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            documentFrame2 === clientHeight ? documentFrame2 : clientHeight,
        );
      };
      setRailH2();
      let resizeObserver = new ResizeObserver(setRailH2);
      resizeObserver.observe(documentFrame);
      __documentClosure.elementRef15.current = resizeObserver;
    },
    [__documentClosure.addEventListener2],
  ));
}

export function createDocumentFrameCeil59(__documentClosure: Pick<DocumentFrameContext, "React" | "elementRef17" | "setDocumentFrameState6">): Dynamic {
  return ((0, __documentClosure.React.useCallback)(
    (..._extraArguments: unknown[]): undefined => {
      let element: Dynamic = __documentClosure.elementRef17.current;
      if (!element) return;
      let parentElement: Dynamic = element.parentElement;
      let computedStyle = parentElement
        ? getComputedStyle(parentElement)
        : null;
      let total = computedStyle
        ? parseFloat(computedStyle.paddingTop) +
          parseFloat(computedStyle.paddingBottom)
        : 0;
      let ceil3 = Math.ceil(element.getBoundingClientRect().height + total);
      (0, __documentClosure.setDocumentFrameState6)(
        (documentFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          documentFrame === ceil3 ? documentFrame : ceil3,
      );
    },
    [],
  ));
}

export function createDocumentFrameObserve260(__documentClosure: Pick<DocumentFrameContext, "React" | "elementRef16" | "elementRef17" | "setDocumentFrameState6" | "ceil">): Dynamic {
  return ((0, __documentClosure.React.useCallback)(
    (documentFrame?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      __documentClosure.elementRef16.current?.disconnect();
      __documentClosure.elementRef16.current = null;
      __documentClosure.elementRef17.current = documentFrame;
      if (!documentFrame) {
        (0, __documentClosure.setDocumentFrameState6)(null);
        return;
      }
      (0, __documentClosure.ceil)();
      let resizeObserver = new ResizeObserver(__documentClosure.ceil);
      resizeObserver.observe(documentFrame);
      __documentClosure.elementRef16.current = resizeObserver;
    },
    [__documentClosure.ceil],
  ));
}

export function createDocumentFrameEffect61(__documentClosure: Pick<DocumentFrameContext, "documentFrameState6" | "documentFrameResult13" | "setDocumentFrameState7">): Dynamic {
  return ((..._extraArguments: unknown[]): undefined => {
      if (
        __documentClosure.documentFrameState6 &&
        (!__documentClosure.documentFrameResult13 ||
          !__documentClosure.documentFrameState6.includes(__documentClosure.documentFrameResult13))
      ) {
        (0, __documentClosure.setDocumentFrameState7)(null);
      }
    });
}
