/** BaoCut: comment geometry actions; one context per store instance. */
import type { Dynamic } from "./types";
import {
  isCommentsStoreKeys2,
  commentsStoreSet13,
  isCommentsStoreKeys,
  resolveCommentsStoreLeft,
  resolveCommentsStoreLeft2,
  getCommentsStoreByPage,
} from "./platform-core-comments-store-4";
import { CommentsStoreState2 } from "./platform-core-comments-store-2";
import { isDataModelSchemasKeys } from "./platform-core-data-model-schemas-3";
import { resolveDataModelSchemasValue12 } from "./platform-core-data-model-schemas-4";
import type { CommentStoreContext } from "./platform-core-comment-store-context";

export function createCommentGeometryActions(
  commentStoreContext: Pick<CommentStoreContext, "setStore" | "shared">,
) {
  return {
    setSummonOpen: (
      commentStore?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (0, commentStoreContext.setStore)(
        (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          let summonOpenItem: Dynamic = Object.hasOwn(
            commentStore2.summonOpen,
            commentStore,
          )
            ? commentStore2.summonOpen[commentStore]
            : undefined;
          if ((options ?? undefined) === summonOpenItem) return commentStore2;
          let { [commentStore]: summonOpen, ...summonOpen2 }: Dynamic =
            commentStore2.summonOpen;
          return {
            summonOpen:
              options === null
                ? summonOpen2
                : {
                    ...summonOpen2,
                    [commentStore]: options,
                  },
          };
        },
      ),
    setSummonNote: (
      commentStore?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (0, commentStoreContext.setStore)(
        (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          let summonNoteItem: Dynamic = Object.hasOwn(
            commentStore2.summonNotes,
            commentStore,
          )
            ? commentStore2.summonNotes[commentStore]
            : undefined;
          let matchesOptions = options !== null && context?.handoff === true;
          let hasOwn = Object.hasOwn(commentStore2.summonHandoff, commentStore);
          if (
            (options ?? undefined) === summonNoteItem &&
            matchesOptions === hasOwn
          )
            return commentStore2;
          let { [commentStore]: summonNotes, ...summonNotes2 }: Dynamic =
            commentStore2.summonNotes;
          let { [commentStore]: summonHandoff, ...summonHandoff2 }: Dynamic =
            commentStore2.summonHandoff;
          return {
            summonNotes:
              options === null
                ? summonNotes2
                : {
                    ...summonNotes2,
                    [commentStore]: options,
                  },
            ...(matchesOptions !== hasOwn && {
              summonHandoff: matchesOptions
                ? {
                    ...summonHandoff2,
                    [commentStore]: true,
                  }
                : summonHandoff2,
            }),
          };
        },
      ),
    dropOptimisticY: (
      commentStore?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (0, commentStoreContext.setStore)(
        (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          let optimisticY: Dynamic = null;
          for (let useCommentStoreResult of commentStore as Dynamic)
            if (useCommentStoreResult in commentStore2.optimisticY) {
              if (optimisticY === null) {
                optimisticY = {
                  ...commentStore2.optimisticY,
                };
              }
              delete optimisticY[useCommentStoreResult];
            }
          return optimisticY === null
            ? commentStore2
            : {
                optimisticY: optimisticY,
              };
        },
      ),
    setRects: (
      rects?: Dynamic,
      items?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (0, commentStoreContext.setStore)(
        (commentStore?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          let isCommentsStoreKeys22 = isCommentsStoreKeys2(
            commentStore.rects,
            rects,
          );
          let matchesHiddenCount: Dynamic =
            commentStore.hidden.size === items.length &&
            items.every(
              (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                commentStore.hidden.has(item),
            );
          let optimisticY: Dynamic = commentStore.optimisticY;
          for (let useCommentStoreResult in commentStore.optimisticY)
            if (useCommentStoreResult in rects) {
              if (optimisticY === commentStore.optimisticY) {
                let { ...optimisticY2 }: Dynamic = commentStore.optimisticY;
                optimisticY = optimisticY2;
              }
              delete optimisticY[useCommentStoreResult];
            }
          return isCommentsStoreKeys22 &&
            matchesHiddenCount &&
            optimisticY === commentStore.optimisticY
            ? commentStore
            : {
                ...(isCommentsStoreKeys22
                  ? {}
                  : {
                      rects: rects,
                    }),
                ...(matchesHiddenCount
                  ? {}
                  : {
                      hidden: items.length
                        ? new (Set as Dynamic)(items)
                        : commentsStoreSet13,
                    }),
                ...(optimisticY !== commentStore.optimisticY && {
                  optimisticY: optimisticY,
                }),
              };
        },
      ),
    setCellsMeta: (
      cellsMeta?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (0, commentStoreContext.setStore)(
        (commentStore?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          isCommentsStoreKeys(
            commentStore.cellsMeta,
            cellsMeta,
            (
              entry?: Dynamic,
              entry2?: Dynamic,
              ..._extraArguments: unknown[]
            ) =>
              entry.kind === entry2.kind &&
              entry.n === entry2.n &&
              entry.header === entry2.header,
          )
            ? commentStore
            : {
                cellsMeta: cellsMeta,
              },
      ),
    setMediaMeta: (
      mediaMeta?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (0, commentStoreContext.setStore)(
        (commentStore?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          isCommentsStoreKeys(
            commentStore.mediaMeta,
            mediaMeta,
            (
              entry?: Dynamic,
              entry2?: Dynamic,
              ..._extraArguments: unknown[]
            ) => entry.kind === entry2.kind,
          )
            ? commentStore
            : {
                mediaMeta: mediaMeta,
              },
      ),
    setBlockGeometry: (
      anchors?: Dynamic,
      blockBoxes?: Dynamic,
      frameBox?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (0, commentStoreContext.setStore)(
        (commentStore?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          let isCommentsStoreKeys3 = isCommentsStoreKeys(
            commentStore.anchors,
            anchors,
            resolveCommentsStoreLeft,
          );
          let isCommentsStoreKeys4 = isCommentsStoreKeys(
            commentStore.blockBoxes,
            blockBoxes,
            resolveCommentsStoreLeft2,
          );
          let matchesFrameBox: Dynamic =
            commentStore.frameBox === frameBox ||
            (commentStore.frameBox !== null &&
              frameBox !== null &&
              resolveCommentsStoreLeft2(commentStore.frameBox, frameBox));
          return isCommentsStoreKeys3 && isCommentsStoreKeys4 && matchesFrameBox
            ? commentStore
            : {
                ...(isCommentsStoreKeys3
                  ? {}
                  : {
                      anchors: anchors,
                    }),
                ...(isCommentsStoreKeys4
                  ? {}
                  : {
                      blockBoxes: blockBoxes,
                    }),
                ...(matchesFrameBox
                  ? {}
                  : {
                      frameBox: frameBox,
                    }),
              };
        },
      ),
    setPresent: (items?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      (0, commentStoreContext.setStore)(
        (commentStore?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          if (
            items === null
              ? commentStore.present === null
              : commentStore.present?.size === items.length &&
                items.every(
                  (
                    rolldownRImport2?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic => commentStore.present.has(rolldownRImport2),
                )
          )
            return commentStore;
          let present: Dynamic =
            items === null ? null : new (Set as Dynamic)(items);
          return {
            present: present,
            ...(CommentsStoreState2 === null
              ? {}
              : getCommentsStoreByPage(commentStore, present)),
          };
        },
      ),
    setFolded: (folded?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      (0, commentStoreContext.setStore)(
        (commentStore?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          isDataModelSchemasKeys(commentStore.folded, folded)
            ? commentStore
            : {
                folded: folded,
              },
      ),
    setDocScrollY: (
      docScrollY?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (0, commentStoreContext.setStore)(
        (commentStore?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          commentStore.docScrollY === docScrollY
            ? commentStore
            : {
                docScrollY: docScrollY,
              },
      ),
    setDocScrollMax: (
      docScrollMax?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (0, commentStoreContext.setStore)(
        (commentStore?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          commentStore.docScrollMax === docScrollMax
            ? commentStore
            : {
                docScrollMax: docScrollMax,
              },
      ),
    setDocExtent: (
      docExtent?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (0, commentStoreContext.setStore)(
        (commentStore?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          (
            commentStore.docExtent === null
              ? docExtent === null
              : docExtent !== null &&
                commentStore.docExtent.top === docExtent.top &&
                commentStore.docExtent.bottom === docExtent.bottom
          )
            ? commentStore
            : {
                docExtent: docExtent,
              },
      ),
    predictDocScroll: (
      commentStore?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (0, commentStoreContext.setStore)(
        (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          !Number.isFinite(commentStore) || commentStore === 0
            ? commentStore2
            : {
                rects: resolveDataModelSchemasValue12(
                  commentStore2.rects,
                  commentStore,
                ),
                optimisticY: resolveDataModelSchemasValue12(
                  commentStore2.optimisticY,
                  commentStore,
                ),
                docScrollY: commentStore2.docScrollY + commentStore,
                docExtent: commentStore2.docExtent && {
                  top: commentStore2.docExtent.top - commentStore,
                  bottom: commentStore2.docExtent.bottom - commentStore,
                },
              },
      ),
  };
}
