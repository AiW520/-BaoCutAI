/** BaoCut: comment drafts actions; one context per store instance. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  isSelbarDraft,
  commentsStoreValue80,
  NO_PEERS,
} from "../store/store-4";
import { resolveEditorAnchorsAndMentionsTest } from "../../prose-editor/platform/anchors-and-mentions-1";
import type { CommentStoreContext } from "./store-context";

export function createCommentDraftsActions(
  commentStoreContext: Pick<
    CommentStoreContext,
    "getStore" | "setStore" | "shared"
  >,
) {
  return {
    setFocus: (
      focusId?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let peekDrop: Dynamic = (0, commentStoreContext.getStore)().peekDrop;
      (0, commentStoreContext.setStore)({
        focusId: focusId,
        peekDrop:
          focusId === null || options === undefined || options <= 0
            ? null
            : peekDrop !== null &&
                peekDrop.id === focusId &&
                peekDrop.dy === options
              ? peekDrop
              : {
                  id: focusId,
                  dy: options,
                },
      });
    },
    setDraftY: (
      draftY?: Dynamic,
      draftH: Dynamic = null,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (0, commentStoreContext.setStore)({
        draftY: draftY,
        draftH: draftH,
        draftFollows: false,
      }),
    followDraft: (
      { blockTop: blockTop, widgetTop: widgetTop }: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (0, commentStoreContext.setStore)(
        (commentStore?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          let draftAnchor: Dynamic = commentStore.draftAnchor;
          let draftY: Dynamic = isSelbarDraft(draftAnchor)
            ? blockTop
            : draftAnchor !== null &&
                draftAnchor.boxDy !== undefined &&
                widgetTop !== undefined
              ? widgetTop + draftAnchor.boxDy
              : undefined;
          let draftFollows = draftY !== undefined;
          return draftY === undefined || commentStore.draftY === draftY
            ? commentStore.draftFollows === draftFollows
              ? commentStore
              : {
                  draftFollows: draftFollows,
                }
            : {
                draftY: draftY,
                draftFollows: draftFollows,
              };
        },
      ),
    setEditorDirty: (
      commentStore?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (0, commentStoreContext.setStore)(
        (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          if (commentStore2.dirtyEditors.has(commentStore) === options)
            return commentStore2;
          let dirtyEditors: Dynamic = new (Set as Dynamic)(
            commentStore2.dirtyEditors,
          );
          if (options) {
            dirtyEditors.add(commentStore);
          } else {
            dirtyEditors.delete(commentStore);
          }
          return {
            dirtyEditors: dirtyEditors,
          };
        },
      ),
    learnMentionNames: (
      commentStore?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (0, commentStoreContext.setStore)(
        (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          let mentionNames: Dynamic = null;
          for (let [
            useCommentStoreResult,
            useCommentStoreResult2,
          ] of Object.entries(commentStore) as Dynamic) {
            if (
              !resolveEditorAnchorsAndMentionsTest(useCommentStoreResult) ||
              typeof useCommentStoreResult2 != `string`
            )
              continue;
            let trimmedUseCommentStoreResultSlice = useCommentStoreResult2
              .trim()
              .slice(0, commentsStoreValue80);
            if (
              !(
                trimmedUseCommentStoreResultSlice === `` ||
                commentStore2.mentionNames[useCommentStoreResult] ===
                  trimmedUseCommentStoreResultSlice
              )
            ) {
              (mentionNames ??= {
                ...commentStore2.mentionNames,
              })[useCommentStoreResult] = trimmedUseCommentStoreResultSlice;
            }
          }
          return mentionNames === null
            ? commentStore2
            : {
                mentionNames: mentionNames,
              };
        },
      ),
    stashReplyDraft: (
      commentStore?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (0, commentStoreContext.setStore)(
        (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          let replyDraftItem: Dynamic = commentStore2.replyDrafts[commentStore];
          if (options === null) {
            if (replyDraftItem === undefined) return commentStore2;
            let { [commentStore]: replyDrafts, ...replyDrafts2 }: Dynamic =
              commentStore2.replyDrafts;
            return {
              replyDrafts: replyDrafts2,
            };
          }
          if (replyDraftItem === undefined)
            return {
              replyDrafts: {
                ...commentStore2.replyDrafts,
                [commentStore]: options,
              },
            };
          let [items, setItems]: Dynamic = context
            ? [options.json, replyDraftItem.json]
            : [replyDraftItem.json, options.json];
          let json2: Dynamic = {
            ...items,
            content: [...(items.content ?? []), ...(setItems.content ?? [])],
          };
          return {
            replyDrafts: {
              ...commentStore2.replyDrafts,
              [commentStore]: {
                ...replyDraftItem,
                json: json2,
              },
            },
          };
        },
      ),
    markReplyDraftTold: (
      commentStore?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (0, commentStoreContext.setStore)(
        (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          let replyDraftItem: Dynamic = commentStore2.replyDrafts[commentStore];
          return replyDraftItem === undefined || replyDraftItem.told
            ? commentStore2
            : {
                replyDrafts: {
                  ...commentStore2.replyDrafts,
                  [commentStore]: {
                    ...replyDraftItem,
                    told: true,
                  },
                },
              };
        },
      ),
    setDraftAnchor: (
      draftAnchor?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (0, commentStoreContext.setStore)({
        draftAnchor: draftAnchor,
      }),
    setQuietPost: (
      quietPost?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (0, commentStoreContext.setStore)({
        quietPost: quietPost,
        quietPostY: quietPost === null ? null : (options ?? null),
      }),
    setSurfaceCarrier: (
      commentStore?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (0, commentStoreContext.setStore)(
        (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
          surfaceCarrier:
            commentStore === null
              ? []
              : commentStore2.surfaceCarrier.includes(commentStore)
                ? commentStore2.surfaceCarrier
                : [...commentStore2.surfaceCarrier, commentStore],
        }),
      ),
    setPinWords: (
      commentStore: Dynamic,
      options: Dynamic,
      { chart: chart, byId: byId }: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (0, commentStoreContext.setStore)(
        (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          let label = `${commentStore}|${options}`;
          let record2: Dynamic = {
            ...(chart === undefined
              ? {}
              : {
                  chart: chart,
                }),
            byId: byId,
          };
          return JSON.stringify(commentStore2.pinWords[label]) ===
            JSON.stringify(record2)
            ? commentStore2
            : {
                pinWords: {
                  ...commentStore2.pinWords,
                  [label]: record2,
                },
              };
        },
      ),
    setDraftTarget: (
      draftTarget?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (0, commentStoreContext.setStore)({
        draftTarget: draftTarget,
      }),
    setActive: (
      activeId?: Dynamic,
      items?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (0, commentStoreContext.setStore)(
        (commentStore?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          let activePeers: Dynamic =
            activeId !== null && items?.length ? items : NO_PEERS;
          let matchesActivePeersCount: Dynamic =
            activePeers.length === commentStore.activePeers.length &&
            activePeers.every(
              (
                activePeer?: Dynamic,
                index?: Dynamic,
                ..._extraArguments: unknown[]
              ) => activePeer === commentStore.activePeers[index],
            );
          return commentStore.activeId === activeId && matchesActivePeersCount
            ? commentStore
            : {
                activeId: activeId,
                activePeers: activePeers,
              };
        },
      ),
    scrollTo: (scrollToId?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      (0, commentStoreContext.setStore)({
        scrollToId: scrollToId,
      }),
    revealInList: (
      commentStore?: Dynamic,
      again: Dynamic = false,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (0, commentStoreContext.setStore)({
        listRevealAsk:
          commentStore === null
            ? null
            : {
                id: commentStore,
                again: again,
              },
      }),
    focusCardByKey: (
      commentStore?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (0, commentStoreContext.setStore)({
        cardKeyAsk:
          commentStore === null
            ? null
            : {
                id: commentStore,
              },
      }),
  };
}
