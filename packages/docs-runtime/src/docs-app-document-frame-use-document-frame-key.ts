/** BaoCut: document frame from index-CX4IZqzA.js. */
import type { Dynamic } from "./types";
import {
  resolvePlatformLiveDocumentAndHistoryNodeId,
  resolvePlatformSessionAndSourcesToLowerCase,
} from "./docs-app-dependencies";
import {
  React,
} from "./docs-app-bootstrap";
import {
  resolveDocumentSelectionMoved,
} from "./docs-app-document-selection-map-document-selection-tops";
import {
  documentRuntimeLimit180,
} from "./docs-app-document-runtime-widget-provenance-gutter";

var documentFrameSet: Dynamic;

function useDocumentFrameKey(
  key?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let recordRef: Dynamic = (0, React.useRef)({
    key: key,
    until: 0,
  });
  let now = Date.now();
  if (recordRef.current.key !== key) {
    recordRef.current = {
      key: key,
      until: now + documentRuntimeLimit180 + 60,
    };
  }
  let matchesNow = now < recordRef.current.until;
  let [, setCountState]: Dynamic = (0, React.useState)(0);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!matchesNow) return;
      let setTimeout2 = window.setTimeout(
        (..._extraArguments: unknown[]): Dynamic =>
          setCountState(
            (
              documentFrameKey?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => documentFrameKey + 1,
          ),
        recordRef.current.until - Date.now() + 1,
      );
      return (..._extraArguments: unknown[]) =>
        window.clearTimeout(setTimeout2);
    },
    [matchesNow, key],
  );
  let elementRef: Dynamic = (0, React.useRef)(null);
  let documentSelectionMoved: Dynamic = resolveDocumentSelectionMoved(
    elementRef.current,
    options,
    context,
  );
  elementRef.current = documentSelectionMoved.seats;
  let documentFrameSetRef: Dynamic = (0, React.useRef)(documentFrameSet);
  if (!matchesNow) documentFrameSetRef.current = documentFrameSet;
  else {
    if (
      documentFrameSetRef.current === documentFrameSet &&
      documentSelectionMoved.moved.size > 0
    ) {
      documentFrameSetRef.current = new (Set as Dynamic)();
    }
    for (let useDocumentFrameKeyResult of documentSelectionMoved.moved as Dynamic)
      documentFrameSetRef.current.add(useDocumentFrameKeyResult);
  }
  let useDocumentFrameKeyHandler: Dynamic = (
    documentFrameKey?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => matchesNow && documentFrameSetRef.current.has(documentFrameKey);
  return {
    slideClsOf: (documentFrameKey?: Dynamic, ..._extraArguments: unknown[]) =>
      useDocumentFrameKeyHandler(documentFrameKey)
        ? `transition-[top] ease-out motion-reduce:transition-none`
        : ``,
    slideStyleOf: (
      documentFrameKey?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      useDocumentFrameKeyHandler(documentFrameKey)
        ? {
            transitionDuration: `${documentRuntimeLimit180}ms`,
          }
        : undefined,
  };
}

var documentFrameSet2: Dynamic;

var isDocumentFrameQuerySelectorAll: (documentFrameQuerySelectorAll?: Dynamic, ..._extraArguments: unknown[]) => boolean;

var resolveDocumentFrameValue: Dynamic;

var DocumentFrame_Message: string;

var DocumentFrame_Message2: string;

var DocumentFrame_Comments: string;

function isDocumentFrameMatches(
  documentFrameMatches?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  try {
    return documentFrameMatches.matches(`:focus-visible`);
  } catch {
    return false;
  }
}

var documentFrameLimit16: number;

var resolveDocumentFrameNodeId: (documentFrameNodeId?: Dynamic, ..._extraArguments: unknown[]) => string;

var isDocumentFrameTarget: Dynamic;

var resolveDocumentFrameTarget: Dynamic;

function isDocumentFrameCurrentTarget(
  event?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!options || !resolveDocumentFrameTarget(event)) return null;
  let matchedElement: Dynamic =
    event.currentTarget.querySelector(`[data-comment-reply]`);
  return !matchedElement ||
    getComputedStyle(matchedElement).display === `none` ||
    event.clientY < matchedElement.getBoundingClientRect().bottom
    ? null
    : matchedElement.querySelector(`[contenteditable="true"]`);
}

function isDocumentFrameValue(
  documentFrameValue?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    !!documentFrameValue &&
    !resolvePlatformSessionAndSourcesToLowerCase(documentFrameValue) &&
    !resolvePlatformLiveDocumentAndHistoryNodeId(documentFrameValue)
  );
}

var DocumentFrameFrag: Dynamic;

var DocumentLinks_ThatSectionNoLongerExistsInThisDocument: string;

var DocumentLinks_Message: string;

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeDocumentFrameUseDocumentFrameKeyStep1(): void {
  (documentFrameSet = new (Set as Dynamic)());
  (documentFrameSet2 = new (Set as Dynamic)());
  (isDocumentFrameQuerySelectorAll = (
    documentFrameQuerySelectorAll?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    for (let isDocumentFrameQuerySelectorAllResult of documentFrameQuerySelectorAll.querySelectorAll(
      `[data-cds="CommentCard"] [data-cds-part="body"] > div[id]`,
    ) as Dynamic) {
      if (
        isDocumentFrameQuerySelectorAllResult.hasAttribute(`data-clamped`) ||
        isDocumentFrameQuerySelectorAllResult.nextElementSibling?.getAttribute(
          `aria-controls`,
        ) === isDocumentFrameQuerySelectorAllResult.id
      )
        continue;
      let firstElementChild: Dynamic =
        isDocumentFrameQuerySelectorAllResult.firstElementChild;
      if (!(firstElementChild instanceof HTMLElement)) continue;
      let number = Number.parseFloat(
        getComputedStyle(firstElementChild).lineHeight,
      );
      if (
        firstElementChild.offsetHeight >
        (Number.isFinite(number) ? number : 20) * 16
      )
        return true;
    }
    return false;
  });
  (resolveDocumentFrameValue = (
    element?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    element.querySelector(`[data-nonresting]`) !== null ||
    element.querySelector(
      `[data-cds="CommentCard"] button[aria-expanded="true"][aria-controls]:not([aria-haspopup])`,
    ) !== null ||
    isDocumentFrameQuerySelectorAll(element));
  (DocumentFrame_Message = `Enter opens a comment (press it again to reply) and Escape closes it. The Up and Down arrows move between comments.`);
  (DocumentFrame_Message2 = `Enter moves to the reaction buttons and Escape comes back. The Up and Down arrows move between comments.`);
  (DocumentFrame_Comments = `Comments`);
  (documentFrameLimit16 = 16);
  (resolveDocumentFrameNodeId = (
    documentFrameNodeId?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `${documentFrameNodeId.nodeId}|${documentFrameNodeId.quote}|${documentFrameNodeId.nonce}|${documentFrameNodeId.segment ?? ``}`);
  (isDocumentFrameTarget = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let target: Dynamic = event.target;
    return (
      !!target?.closest?.(`[data-testid="reaction-chip"][data-comment-stop]`) &&
      !target.matches(`[data-comment-stop]`)
    );
  });
  (resolveDocumentFrameTarget = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    event.target === event.currentTarget ||
    (event.target instanceof Element &&
      event.target.parentElement === event.currentTarget &&
      event.target.matches(`[data-comment-stop]`)));
  (DocumentFrameFrag = ((..._extraArguments: unknown[]): Dynamic => {
    let label = ``;
    return {
      jumpFor(
        frag?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic {
        return {
          type: `jump-to`,
          frag: frag,
          ...(options && label === frag
            ? {
                quiet: true,
              }
            : {}),
        };
      },
      judged(items?: unknown, ..._extraArguments: unknown[]): undefined {
        if (typeof items == `string` && items.length <= 512) {
          label = items;
        }
      },
      reset(..._extraArguments: unknown[]): undefined {
        label = ``;
      },
    };
  })());
  (DocumentLinks_ThatSectionNoLongerExistsInThisDocument = `That section no longer exists in this document`);
  (DocumentLinks_Message = `That tab or section can't be opened from here`);
}

export {
  DocumentFrameFrag,
  DocumentFrame_Comments,
  DocumentFrame_Message,
  DocumentFrame_Message2,
  DocumentLinks_Message,
  DocumentLinks_ThatSectionNoLongerExistsInThisDocument,
  documentFrameLimit16,
  documentFrameSet2,
  isDocumentFrameCurrentTarget,
  isDocumentFrameMatches,
  isDocumentFrameTarget,
  isDocumentFrameValue,
  resolveDocumentFrameNodeId,
  resolveDocumentFrameTarget,
  resolveDocumentFrameValue,
  useDocumentFrameKey,
};
