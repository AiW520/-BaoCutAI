/** BaoCut: comment loading actions; one context per store instance. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  commentsStoreSet4,
  commentsStoreValues2,
  commentsStoreValue02,
  isCommentsStoreReplies2,
  isCommentsStoreResolved,
  commentsStoreMap4,
  commentsStoreMap6,
  commentsStoreMap5,
  commentsStoreSet6,
  getCommentsStoreValue,
  getCommentsStoreValue2,
  isCommentsStoreReplies,
} from "../store/store-4";
import { CommentsStoreState2 } from "../store/store-2";
import { api } from "../../platform/services/api-and-auth-1";
import {
  updateDataModelSchemasQuote,
  resolveDataModelSchemasStands,
  getDataModelSchemasTmp,
  updateDataModelSchemasOpen,
} from "../../platform/data/model-schemas-3";
import {
  foldStore,
  refIndexAtom,
} from "../../platform/data/operation-engine-4";
import type { CommentStoreContext } from "./store-context";

export function createCommentLoadingActions(
  commentStoreContext: Pick<
    CommentStoreContext,
    | "deleteEpochs"
    | "getStore"
    | "loadViewerId"
    | "mutationGenerations"
    | "mutationStarts"
    | "replyEpochs"
    | "setStore"
    | "shared"
  >,
) {
  return {
    fetch(
      commentStore?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      commentsStoreSet4.add(options);
      (0, commentStoreContext.loadViewerId)();
      if (CommentsStoreState2 !== null) {
        commentStoreContext.deleteEpochs[options] = commentStore;
        (0, commentStoreContext.setStore)(
          (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            commentStore2.byPage[options] === undefined
              ? {
                  byPage: {
                    ...commentStore2.byPage,
                    [options]: commentsStoreValues2,
                  },
                }
              : commentStore2,
        );
        return Promise.resolve();
      }
      let label = `${commentStore}\n${options}`;
      commentStoreContext.deleteEpochs[options] = commentStore;
      let loadingItem: Dynamic = (0, commentStoreContext.getStore)().loading[
        label
      ];
      if (loadingItem) return loadingItem;
      let mutationStartItem: Dynamic =
        commentStoreContext.mutationStarts[options];
      let commentsStoreValue022: Dynamic = commentsStoreValue02;
      let useCommentStoreResult = (async (
        ..._extraArguments: unknown[]
      ): Promise<undefined> => {
        try {
          let list: Dynamic = await api.comments.list(commentStore, options);
          if (
            commentsStoreValue02 !== commentsStoreValue022 ||
            commentStoreContext.deleteEpochs[options] !== commentStore
          )
            return;
          if (
            commentStoreContext.mutationGenerations[options] ||
            commentStoreContext.mutationStarts[options] !== mutationStartItem
          ) {
            commentStoreContext.replyEpochs[options] = commentStore;
            if (!commentStoreContext.mutationGenerations[options]) {
              delete commentStoreContext.replyEpochs[options];
              Promise.resolve().then(
                (..._extraArguments: unknown[]): Dynamic =>
                  (0, commentStoreContext.getStore)().fetch(
                    commentStoreContext.deleteEpochs[options] ?? commentStore,
                    options,
                  ),
              );
            }
            return;
          }
          (0, commentStoreContext.setStore)(
            (
              commentStore2?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => ({
              byPage: {
                ...commentStore2.byPage,
                [options]: isCommentsStoreReplies2(options, list) ?? list,
              },
            }),
          );
        } finally {
          (0, commentStoreContext.setStore)(
            (
              commentStore2?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => {
              let { [label]: loading, ...loading2 }: Dynamic =
                commentStore2.loading;
              return {
                loading: loading2,
              };
            },
          );
        }
      })();
      (0, commentStoreContext.setStore)(
        (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
          loading: {
            ...commentStore2.loading,
            [label]: useCommentStoreResult,
          },
        }),
      );
      return useCommentStoreResult;
    },
    refetch(
      commentStore?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return (0, commentStoreContext.getStore)().fetch(
        commentStoreContext.deleteEpochs[options] ?? commentStore,
        options,
      );
    },
    refetchAll(
      commentStore?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      for (let useCommentStoreResult of Object.keys(
        (0, commentStoreContext.getStore)().byPage,
      ) as Dynamic)
        (0, commentStoreContext.getStore)().fetch(
          commentStoreContext.deleteEpochs[useCommentStoreResult] ??
            commentStore,
          useCommentStoreResult,
        );
    },
    seatDoorList(
      commentStore?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let filteredOptions: Dynamic = options.filter(isCommentsStoreResolved);
      commentsStoreMap4.set(commentStore, filteredOptions);
      let updateDataModelSchemasQuote2: Dynamic =
        updateDataModelSchemasQuote(options);
      commentsStoreMap6.set(commentStore, updateDataModelSchemasQuote2);
      let dataModelSchemasStands: Dynamic = resolveDataModelSchemasStands(
        updateDataModelSchemasQuote2,
      );
      let useCommentStoreHandler: Dynamic = (
        commentStore2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let doorStandingItem: Dynamic =
          commentStore2.doorStanding[commentStore];
        return (doorStandingItem?.size ?? 0) === dataModelSchemasStands.size &&
          [...dataModelSchemasStands].every(
            (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              doorStandingItem.has(item),
          )
          ? {}
          : {
              doorStanding: {
                ...commentStore2.doorStanding,
                [commentStore]: dataModelSchemasStands,
              },
            };
      };
      if (CommentsStoreState2 === null) {
        (0, commentStoreContext.setStore)(
          (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
            let dataModelSchemasTmp: Dynamic = getDataModelSchemasTmp(
              commentStore2.byPage[commentStore] ?? [],
              filteredOptions,
            );
            let dataModelSchemasTmp2: Dynamic = getDataModelSchemasTmp(
              commentStore2.allByPage[commentStore] ?? [],
              options,
            );
            return {
              byPage: {
                ...commentStore2.byPage,
                [commentStore]:
                  isCommentsStoreReplies2(commentStore, dataModelSchemasTmp) ??
                  dataModelSchemasTmp,
              },
              allByPage: {
                ...commentStore2.allByPage,
                [commentStore]:
                  isCommentsStoreReplies2(commentStore, dataModelSchemasTmp2) ??
                  dataModelSchemasTmp2,
              },
              ...useCommentStoreHandler(commentStore2),
            };
          },
        );
        return;
      }
      (0, commentStoreContext.setStore)(
        (commentStore2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          let byPageItem: Dynamic =
            commentStore2.byPage[commentStore] ?? commentsStoreValues2;
          // BaoCut: room 不同步 utterance，本页新建的批注不会进 fold，原版由 fold 接管它的后续回复。
          // 这里让门里列表的同 id 批注顶替本地那份（与门里来的批注同样处理），智能体的回复才能实时出现。
          let foldRefs: Dynamic = foldStore.get(refIndexAtom);
          let commentsStoreMap5Entry: Dynamic = new (Set as Dynamic)([
            ...(commentsStoreMap5.get(commentStore) ?? commentsStoreSet6),
            ...options
              .map(
                (option?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  option.id,
              )
              .filter(
                (id?: Dynamic, ..._extraArguments: unknown[]): boolean =>
                  !foldRefs.has(`utterance/${id}`),
              ),
          ]);
          let filteredAllByPageItem: Dynamic = commentStore2.allByPage[
            commentStore
          ]?.filter(
            (commentStore3?: Dynamic, ..._extraArguments: unknown[]) =>
              !commentsStoreMap5Entry.has(commentStore3.id),
          );
          let {
            open: updateDataModelSchemasOpen2,
            all: updateDataModelSchemasOpen3,
          }: Dynamic = updateDataModelSchemasOpen(
            byPageItem.filter(
              (byPageItem2?: Dynamic, ..._extraArguments: unknown[]) =>
                !commentsStoreMap5Entry.has(byPageItem2.id),
            ),
            filteredAllByPageItem,
            getCommentsStoreValue(commentStore, commentStore2.present),
            undefined,
            getCommentsStoreValue2(commentStore, commentStore2.present),
          );
          let isCommentsStoreReplies3: Dynamic = isCommentsStoreReplies(
            commentStore,
            new (Set as Dynamic)(
              updateDataModelSchemasOpen2.map(
                (
                  updateDataModelSchemasOpen4?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => updateDataModelSchemasOpen4.id,
              ),
            ),
          );
          commentsStoreMap5.set(
            commentStore,
            new (Set as Dynamic)(
              isCommentsStoreReplies3.map(
                (
                  isCommentsStoreReply?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => isCommentsStoreReply.id,
              ),
            ),
          );
          let items: Dynamic = isCommentsStoreReplies3.length
            ? [...updateDataModelSchemasOpen2, ...isCommentsStoreReplies3]
            : updateDataModelSchemasOpen2;
          let isCommentsStoreReplies22: Dynamic =
            isCommentsStoreReplies2(commentStore, items) ?? items;
          let matchesIsCommentsStoreReplies2Count: Dynamic =
            isCommentsStoreReplies22.length === byPageItem.length &&
            isCommentsStoreReplies22.every(
              (
                isCommentsStoreReplies23?: Dynamic,
                index?: Dynamic,
                ..._extraArguments: unknown[]
              ) => isCommentsStoreReplies23 === byPageItem[index],
            );
          if (
            matchesIsCommentsStoreReplies2Count &&
            updateDataModelSchemasOpen3 === filteredAllByPageItem
          ) {
            let useCommentStoreHandler2: Dynamic =
              useCommentStoreHandler(commentStore2);
            return useCommentStoreHandler2.doorStanding === undefined
              ? commentStore2
              : useCommentStoreHandler2;
          }
          return {
            ...useCommentStoreHandler(commentStore2),
            ...(matchesIsCommentsStoreReplies2Count
              ? {}
              : {
                  byPage: {
                    ...commentStore2.byPage,
                    [commentStore]: isCommentsStoreReplies22,
                  },
                }),
            ...(updateDataModelSchemasOpen3 === undefined
              ? {}
              : {
                  allByPage: {
                    ...commentStore2.allByPage,
                    [commentStore]: isCommentsStoreReplies2(commentStore, [
                      ...updateDataModelSchemasOpen3,
                      ...isCommentsStoreReplies3,
                    ]) ?? [
                      ...updateDataModelSchemasOpen3,
                      ...isCommentsStoreReplies3,
                    ],
                  },
                }),
          };
        },
      );
    },
  };
}
