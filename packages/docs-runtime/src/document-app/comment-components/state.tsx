/** BaoCut: comment components from index-CX4IZqzA.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  EditorHostSize,
  EditorHostState34,
  Tooltip,
  askFrameConversationPane,
  clearCommentsActionsAndSelectionBONGOAPIBASE,
  frameConversationPane,
  frameHostChromeWitnessed,
  frameHostWords,
  isEditorExtensionsLocation,
  resolveEditorHostValue23,
  resolvePlatformAnnouncementsValue,
  resolvePlatformAnnouncementsValue2,
  resolvePlatformApiAndAuthUseContext2,
  subscribeFrameConversationPane,
  subscribeFrameHostChromeWitness,
  subscribeFrameHostWords,
  updateDataModelSchemasValue,
  useCommentsActionsAndSelectionPlatform,
} from "../dependencies";
import {
  React,
} from "../bootstrap";
import {
  resolveCommentAnchorsFormat,
} from "../comment-anchors/use-comment-anchors-sheets-component";
import {
  AuthorLoading,
  UseCommentAnchorsRoleComponent,
  UseCommentAnchorsUserComponent,
  resolveCommentAnchorsActor,
  resolveCommentAnchorsParse,
  resolveCommentAnchorsUser,
} from "../comment-anchors/create-comment-mention-search";
import {
  resolveCommentComposerMentionNames,
} from "../comment-composer";
import {
  CommentComponents_Styles2,
  mapCommentComponentsReplace,
} from "./comment-reply-composer";
import {
  resolveCommentComponentsCount2,
  resolveCommentComponentsTarget5,
} from "./comment-reply-sheet";
import type * as ReactComponentTypes from "react";

export const InlineAskNotice: ReactComponentTypes.FC<Dynamic> = ({
  notice: notice,
  quiet = false,
}) => {
  let elementRef: Dynamic = (0, React.useRef)(null);
  let elementRef2: Dynamic = (0, React.useRef)(null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let ownerDocument: Dynamic = elementRef.current?.ownerDocument;
      return (..._extraArguments: unknown[]): undefined => {
        resolvePlatformAnnouncementsValue2(
          ownerDocument,
          CommentComponents_InlineAskNotice,
        );
        elementRef2.current = null;
      };
    },
    [notice],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (!(quiet || elementRef2.current === notice)) {
        resolvePlatformAnnouncementsValue(elementRef.current?.ownerDocument, notice, {
          key: CommentComponents_InlineAskNotice,
        });
        elementRef2.current = notice;
      }
    },
    [notice, quiet],
  );
  return (
    <div
      ref={elementRef}
      className={`text-secondary mb-1.5 text-footnote`}
      data-testid={`inline-ask-notice`}
    >
      {notice}
    </div>
  );
};

var resolveCommentComponentsValue3: (commentComponentsValue3?: Dynamic, ..._extraArguments: unknown[]) => string;

var NodeThreadsCard: Dynamic;

var INLINE_ASK_COMPOSER_LAYOUT: {
    regionLabel: string;
    dismissedHint: string;
    bottom: number;
    clearance: number;
    lane: number;
    maxWidth: number;
    railReserve: number;
    phoneInset: number;
    fieldMaxHeight: number;
};

function resolveCommentComponentsOffered(
  commentComponents?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    commentComponents.offered &&
    commentComponents.ready &&
    commentComponents.blank === true &&
    !commentComponents.chatBeside &&
    !commentComponents.dismissed &&
    !commentComponents.askOpen &&
    !commentComponents.dockedOnce &&
    !commentComponents.phone &&
    commentComponents.writes !== true
  );
}

function resolveCommentComponentsDocked(
  commentComponentsDocked?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    commentComponentsDocked.docked &&
    !commentComponentsDocked.dirty &&
    ((commentComponentsDocked.chatBeside && commentComponentsDocked.settled) ||
      commentComponentsDocked.writes === true)
  );
}

var CommentComponentsState5: Dynamic;

var CommentComponentsState6: Dynamic;

function updateCommentComponentsDismissed(
  updateCommentComponentsDismissed2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  updateCommentComponentsDismissed2.dismissed.getState().set(true);
  return updateCommentComponentsDismissed2.hintShown.getState().value
    ? false
    : (updateCommentComponentsDismissed2.hintShown.getState().set(true),
      updateCommentComponentsDismissed2.toast(
        INLINE_ASK_COMPOSER_LAYOUT.dismissedHint,
      ),
      true);
}

function isCommentComponentsPreventScroll(
  element?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (!element) return false;
  let ownerDocument: Dynamic = element.ownerDocument;
  element.focus({
    preventScroll: true,
  });
  if (ownerDocument.activeElement === element) {
    options({
      type: `caret-focus`,
      resume: true,
    });
    return true;
  }
  let activeElement: Dynamic = ownerDocument.activeElement;
  (ownerDocument.defaultView ?? window).setTimeout(
    (..._extraArguments: unknown[]): undefined => {
      if (
        !(!element.isConnected || ownerDocument.activeElement !== activeElement)
      ) {
        element.focus({
          preventScroll: true,
        });
        if (ownerDocument.activeElement === element) {
          options({
            type: `caret-focus`,
            resume: true,
          });
        }
      }
    },
    0,
  );
  return false;
}

function isCommentComponentsOwnerDocument(
  element?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (!element) return false;
  let ownerDocument: Dynamic = element.ownerDocument;
  if (!ownerDocument.hasFocus()) return false;
  let activeElement: Dynamic = ownerDocument.activeElement;
  return activeElement !== null && activeElement !== ownerDocument.body
    ? false
    : isCommentComponentsPreventScroll(element, options);
}

function resolveCommentComponentsLeft(
  commentComponentsLeft?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (commentComponentsLeft.width > 0 && commentComponentsLeft.width <= 480)
    return {
      left: INLINE_ASK_COMPOSER_LAYOUT.phoneInset,
      right: INLINE_ASK_COMPOSER_LAYOUT.phoneInset,
    };
  let commentComponentsValue4: Dynamic = resolveCommentComponentsValue4(
    commentComponentsLeft.icons,
  );
  let resolveCommentComponentsLeftResult: Dynamic = resolveEditorHostValue23(
    commentComponentsLeft.width,
    commentComponentsLeft.wide === true,
  );
  return {
    left:
      commentComponentsValue4 +
      resolveCommentComponentsWidth(commentComponentsLeft) +
      resolveCommentComponentsLeftResult,
    right:
      (commentComponentsLeft.icons ? 88 : EditorHostSize) +
      resolveCommentComponentsLeftResult,
  };
}

var resolveCommentComponentsValue4: Dynamic;

function resolveCommentComponentsWidth(
  commentComponentsWidth?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return commentComponentsWidth.width !== undefined &&
    commentComponentsWidth.width > 0 &&
    commentComponentsWidth.width <= 767
    ? 0
    : Math.max(
        0,
        (commentComponentsWidth.edgeLeft ?? 0) -
          resolveCommentComponentsValue4(commentComponentsWidth.icons),
      );
}

function resolveCommentComponentsWidth2(
  commentComponentsWidth2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let matchesLayout = commentComponentsWidth2.layout === `left`;
  let commentComponentsWidth = resolveCommentComponentsWidth({
    width: commentComponentsWidth2.width,
    icons: commentComponentsWidth2.icons === true,
    edgeLeft: commentComponentsWidth2.edgeLeft,
  });
  let record = {
    "--measure": `${INLINE_ASK_COMPOSER_LAYOUT.lane}px`,
    "--rail": commentComponentsWidth2.rail
      ? `${INLINE_ASK_COMPOSER_LAYOUT.railReserve}px`
      : `0px`,
  };
  return matchesLayout
    ? {
        ...record,
        "--lane": `max(0px, calc((100% - var(--measure)) / 2))`,
        "--lane-r": `max(0px, calc(100% - var(--measure)), var(--rail))`,
        "--lane-l": `0px`,
      }
    : commentComponentsWidth === 0
      ? {
          ...record,
          "--lane": `max(0px, calc((100% - var(--measure)) / 2))`,
          "--lane-r": `max(var(--lane), var(--rail))`,
          "--lane-l": `max(0px, calc(100% - var(--measure) - var(--lane-r)))`,
        }
      : {
          ...record,
          "--lane": `max(0px, calc((100% + ${commentComponentsWidth}px - var(--measure)) / 2))`,
          "--lane-l": `max(0px, calc(100% - var(--measure) - max(var(--lane), var(--rail))))`,
          "--lane-r": `max(var(--rail), calc(100% - var(--measure) - var(--lane-l)))`,
        };
}

function resolveCommentComponentsWrites(
  commentComponentsWrites?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return commentComponentsWrites.writes === true
    ? `write`
    : commentComponentsWrites.inlineAskOffered
      ? `inline`
      : null;
}

var CommentComponents_CommentsHidden: string;

var CommentComponents_CommentsShown: string;

var CommentComponents_CommentMode: string;

var CommentComponents_Styles4: string;

function resolveCommentComponentsActiveElement(
  document2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return document2.activeElement?.closest(CommentComponents_Styles4) != null;
}

function resolveCommentComponentsIsConnected(
  commentComponentsIsConnected?: Dynamic,
  document2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    commentComponentsIsConnected !== null &&
    !commentComponentsIsConnected.isConnected &&
    (document2.activeElement === null ||
      document2.activeElement === document2.body)
  );
}

function resolveCommentComponentsKey(
  commentComponentsKey?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  resolvePlatformAnnouncementsValue(
    commentComponentsKey,
    options === `shown`
      ? CommentComponents_CommentsShown
      : CommentComponents_CommentsHidden,
    {
      key: CommentComponents_CommentMode,
    },
  );
}

var isCommentComponentsValue: (..._extraArguments: unknown[]) => boolean;

var resolveCommentComponentsValue5: (..._extraArguments: unknown[]) => string;

var resolveCommentComponentsValue6: (..._extraArguments: unknown[]) => null;

var CommentComponentsHostOwnsChrome: Dynamic;

function useCommentComponentsBeside(
  request: Dynamic = CommentComponentsHostOwnsChrome,
  ..._extraArguments: unknown[]
): Dynamic {
  let witnessed: Dynamic = (0, React.useSyncExternalStore)(
    request.subscribeWitness,
    request.witnessed,
    isCommentComponentsValue,
  );
  let pane: Dynamic = (0, React.useSyncExternalStore)(
    request.subscribePane,
    request.pane,
    resolveCommentComponentsValue5,
  );
  let words: Dynamic = (0, React.useSyncExternalStore)(
    request.subscribeWords,
    request.words,
    resolveCommentComponentsValue6,
  );
  let hostChrome: Dynamic = request.hostOwnsChrome();
  let commentComponentsValue7: Dynamic = resolveCommentComponentsValue7(words);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (hostChrome && witnessed && !commentComponentsValue7) {
        request.askPane();
      }
    },
    [request, hostChrome, witnessed, commentComponentsValue7],
  );
  return {
    beside: resolveCommentComponentsWords({
      hostChrome: hostChrome,
      witnessed: witnessed,
      pane: pane,
      words: words,
    }),
    settled: resolveCommentComponentsWords2({
      hostChrome: hostChrome,
      witnessed: witnessed,
      pane: pane,
      words: words,
    }),
  };
}

var resolveCommentComponentsValue7: Dynamic;

var resolveCommentComponentsValue8: Dynamic;

function resolveCommentComponentsWords(
  request?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return resolveCommentComponentsValue7(request.words)
    ? true
    : request.hostChrome && request.witnessed
      ? request.words == null
        ? request.pane !== `no_session`
        : resolveCommentComponentsValue8(request.pane)
      : false;
}

function resolveCommentComponentsWords2(
  request?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return resolveCommentComponentsValue7(request.words) ||
    !(request.hostChrome && request.witnessed)
    ? true
    : !resolveCommentComponentsValue8(request.pane);
}

var CommentComponents_InlineAskNotice: string;

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeCommentComponentsState5Step1(): void {
  (resolveCommentComponentsValue3 = (
    commentComponentsValue3?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `${clearCommentsActionsAndSelectionBONGOAPIBASE()}#thread-${encodeURIComponent(commentComponentsValue3)}`);
  (NodeThreadsCard = (0, React.memo)(function (
    {
      nodeId: nodeId,
      name: name,
      count: count,
      latest: latest,
      flat: flat,
      active: active,
      onOpen: onOpen,
      onReveal: onReveal,
      onNavigate: onNavigate,
      tabStop: tabStop,
    }: Dynamic,
    ..._extraArguments: unknown[]
  ) {
    let nodeThreadsCardResult: Dynamic = resolvePlatformApiAndAuthUseContext2();
    let nodeThreadsCardResult2: Dynamic = useCommentsActionsAndSelectionPlatform(
      latest === null || resolveCommentAnchorsActor(latest) || latest.user === ``
        ? null
        : latest.user,
    );
    let body: Dynamic =
      latest === null
        ? ``
        : mapCommentComponentsReplace(
            latest.body,
            resolveCommentComposerMentionNames,
          );
    let ariaLabel = resolveCommentComponentsCount2({
      count: count,
      name: name,
      latest:
        latest === null
          ? undefined
          : {
              author: resolveCommentAnchorsUser(
                latest,
                nodeThreadsCardResult2?.name,
              ),
              when:
                latest.at === ``
                  ? undefined
                  : resolveCommentAnchorsFormat(
                      latest.at,
                      new Date(nodeThreadsCardResult.now()),
                      nodeThreadsCardResult.locale,
                      nodeThreadsCardResult.timeZone,
                    ),
              body: body,
            },
    });
    return (
      <div
        data-testid={`node-threads-card`}
        data-node-id={nodeId}
        data-active={active || undefined}
        data-comment-stop={``}
        data-stop-id={`node:${nodeId}`}
        role={`article`}
        tabIndex={tabStop === false ? -1 : 0}
        aria-label={ariaLabel}
        onKeyDown={(nodeThreadsCard?: Dynamic, ..._extraArguments: unknown[]) =>
          resolveCommentComponentsTarget5(
            nodeThreadsCard,
            (..._extraArguments: unknown[]): Dynamic => onOpen?.(nodeId),
            onNavigate,
          )
        }
        onClick={
          onOpen
            ? (..._extraArguments: unknown[]): Dynamic => onOpen(nodeId)
            : undefined
        }
        className={`${flat ? `text-primary focus-visible:ring-fill-accent p-3 text-[13px] focus-visible:ring-1 focus-visible:outline-none focus-visible:ring-inset` : `${CommentComponents_Styles2} focus-visible:ring-fill-accent transition-shadow focus-visible:ring-1 focus-visible:outline-none`}${onOpen ? ` cursor-pointer` : ``}`}
      >
      <div className={`flex items-center gap-1.5 text-xs`}>
        <span aria-hidden={true}>{`💬`}</span>
        <span className={`text-secondary`}>
          {count}
          {` on`}
          {` `}
          {onReveal ? (
              <Tooltip content={`Show this block in the document`}>
              <button
                  type={`button`}
                  data-testid={`node-threads-block`}
                  tabIndex={tabStop === undefined ? undefined : -1}
                  onClick={(
                    nodeThreadsCard?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): undefined => {
                    nodeThreadsCard.stopPropagation();
                    onReveal(nodeId);
                  }}
                  className={`text-primary max-w-[180px] cursor-pointer truncate align-bottom font-medium hover:underline`}
                >
                {name}
              </button>
            </Tooltip>
            ) : (
              <span className={`text-primary font-medium`}>{name}</span>
            )}
        </span>
      </div>
      {latest && (
          <div className={`mt-2 pl-3`}>
          <div className={`flex items-center gap-2 text-xs`}>
            {resolveCommentAnchorsActor(latest) ? (
                <UseCommentAnchorsRoleComponent />
              ) : (
                <UseCommentAnchorsUserComponent user={latest.user} />
              )}
            <span className={`flex min-w-0 flex-1 items-center gap-1`}>
              <AuthorLoading
                  r={latest}
                  className={`min-w-0 truncate font-semibold`}
                />
              <span className={`text-muted shrink-0`}>
                {resolveCommentAnchorsParse(
                    latest.at,
                    Date.parse(nodeThreadsCardResult.now()),
                  )}
              </span>
            </span>
          </div>
          <div className={`text-secondary mt-0.5 line-clamp-2 text-[12px]`}>
            {body}
          </div>
        </div>
        )}
    </div>
    );
  }));
  (INLINE_ASK_COMPOSER_LAYOUT = {
    regionLabel: `Ask the agent about this document`,
    dismissedHint: `Type @Agent to talk to the agent`,
    bottom: 16,
    clearance: 8,
    lane: 672,
    maxWidth: 640,
    railReserve: EditorHostState34,
    phoneInset: 12,
    fieldMaxHeight: 128,
  });
  (CommentComponentsState5 = updateDataModelSchemasValue(
    `askDock.dismissed`,
    false,
  ));
  (CommentComponentsState6 = updateDataModelSchemasValue(
    `askDock.hintShown`,
    false,
  ));
  (resolveCommentComponentsValue4 = (
    commentComponentsValue4?: Dynamic,
    ..._extraArguments: unknown[]
  ) => (commentComponentsValue4 ? Math.max(EditorHostSize, 64) : EditorHostSize));
  (CommentComponents_CommentsHidden = `Comments hidden`);
  (CommentComponents_CommentsShown = `Comments shown`);
  (CommentComponents_CommentMode = `comment-mode`);
  (CommentComponents_Styles4 = `[data-testid="ldoc-comments"], [data-testid="ldoc-comment-sheet"], [data-testid="ldoc-comment-draft"]`);
  (isCommentComponentsValue = (..._extraArguments: unknown[]) => false);
  (resolveCommentComponentsValue5 = (..._extraArguments: unknown[]) =>
    `unasked`);
  (resolveCommentComponentsValue6 = (..._extraArguments: unknown[]) => null);
  (CommentComponentsHostOwnsChrome = {
    hostOwnsChrome: (..._extraArguments: unknown[]): Dynamic =>
      isEditorExtensionsLocation(),
    witnessed: frameHostChromeWitnessed,
    subscribeWitness: subscribeFrameHostChromeWitness,
    pane: frameConversationPane,
    subscribePane: subscribeFrameConversationPane,
    askPane: askFrameConversationPane,
    words: frameHostWords,
    subscribeWords: subscribeFrameHostWords,
  });
  (resolveCommentComponentsValue7 = (
    commentComponentsValue7?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => commentComponentsValue7?.includes(`chat_beside`) ?? false);
  (resolveCommentComponentsValue8 = (
    commentComponentsValue8?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    commentComponentsValue8 === undefined ||
    commentComponentsValue8 === `unasked` ||
    commentComponentsValue8 === `pending`);
  (CommentComponents_InlineAskNotice = `inline-ask-notice`);
}

export { CommentComponentsState5, CommentComponentsState6, INLINE_ASK_COMPOSER_LAYOUT, NodeThreadsCard, isCommentComponentsOwnerDocument, isCommentComponentsPreventScroll, resolveCommentComponentsActiveElement, resolveCommentComponentsDocked, resolveCommentComponentsIsConnected, resolveCommentComponentsKey, resolveCommentComponentsLeft, resolveCommentComponentsOffered, resolveCommentComponentsValue3, resolveCommentComponentsWidth2, resolveCommentComponentsWrites, updateCommentComponentsDismissed, useCommentComponentsBeside };
