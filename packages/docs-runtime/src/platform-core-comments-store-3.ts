/** BaoCut: comments store from app-core-BE6n4d7F.js. */
import { createCommentStore } from "./platform-core-comment-store";
import type { Dynamic } from "./types";
import { create, inFrame, preloadTImport } from "./platform-core-dependencies";
import { collectObservabilityTelemetryValue } from "./platform-core-observability-telemetry-1";
import { emitTelemetryEvent } from "./platform-core-observability-telemetry-3";
import { createPagesCommentWithdrawEvent } from "./platform-core-observability-browser-and-operation-events-1";
import { subscribeFrameViewer } from "./platform-core-observability-browser-and-operation-events-3";
import { subscribeProjectFeed } from "./platform-core-platform-api-and-auth-5";
import { resolveDataModelSchemasAgent } from "./platform-core-data-model-schemas-4";
import {
  CommentsStoreMessage3,
  CommentsStoreState8,
  clearCommentsStoreState,
  commentsStoreMap11,
  commentsStoreMap12,
  commentsStoreMap13,
  commentsStoreMap15,
  commentsStoreMap17,
  commentsStoreMap18,
  commentsStoreMap19,
  commentsStoreMap20,
  commentsStoreMap9,
  commentsStoreSet8,
  resolveCommentsStoreSet,
  resolveCommentsStoreValue9,
  resolveCommentsStoreValues,
  updateCommentsStoreBacking,
  updateCommentsStoreBodyKey,
  updateCommentsStoreOpId,
  updateCommentsStoreTimer,
} from "./platform-core-comments-store-4";

var commentsStoreValue0: number;

var CommentsStoreState3: Dynamic;

function _focusMoveWatcher(
  FocusMoveWatcher?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (
    FocusMoveWatcher !== options &&
    CommentsStoreState3 !== null &&
    FocusMoveWatcher === CommentsStoreState3
  ) {
    CommentsStoreState3 = null;
  }
}

var resolveCommentsStoreValue10: (..._extraArguments: unknown[]) => undefined;

var commentsStoreValue_1: boolean;

var commentsStoreState: Dynamic;

var resolveCommentsStoreValue11: (..._extraArguments: unknown[]) => undefined;

var resolveCommentsStoreValue12: (..._extraArguments: unknown[]) => undefined;

var commentsStoreValue_12: boolean;

var CommentsStoreState6: Dynamic;

var CommentsStoreState7: Dynamic;

var commentsStoreState3: Dynamic;

var commentsStoreValue04: boolean;

var commentsStoreValue05: number;

var commentsStoreValue06: number;

var resolveCommentsStoreValue13: (..._extraArguments: unknown[]) => undefined;

var resolveCommentsStoreValue14: (..._extraArguments: unknown[]) => undefined;

var CommentsStoreState9: Dynamic;

function updateCommentsStoreOutbox(
  pid?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let updateCommentsStoreOutboxResult: Dynamic = ++commentsStoreValue06;
  commentsStoreValue04 = true;
  commentsStoreValue_1 = true;
  if (CommentsStoreState6 === pid)
    for (let updateCommentsStoreOutboxResult2 of commentsStoreMap11.values() as Dynamic)
      if (updateCommentsStoreOutboxResult2.timer === undefined) {
        updateCommentsStoreTimer(updateCommentsStoreOutboxResult2);
      }
  if (CommentsStoreState6 !== pid) {
    for (let updateCommentsStoreOutboxResult2 of commentsStoreMap9.values() as Dynamic)
      resolveCommentsStoreSet().clear(updateCommentsStoreOutboxResult2.timer);
    commentsStoreMap9.clear();
    resolveCommentsStoreValues(true);
    if (commentsStoreMap12.size > 0) {
      let items: Dynamic = [...commentsStoreMap12.keys()];
      useCommentStore.setState(
        (
          updateCommentsStoreOutbox2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => {
          if (
            !items.some(
              (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
                Object.hasOwn(
                  updateCommentsStoreOutbox2.outbox,
                  rolldownNImport2,
                ),
            )
          )
            return updateCommentsStoreOutbox2;
          let outbox: Dynamic = {
            ...updateCommentsStoreOutbox2.outbox,
          };
          for (let updateCommentsStoreOutboxResult2 of items as Dynamic)
            delete outbox[updateCommentsStoreOutboxResult2];
          return {
            outbox: outbox,
          };
        },
      );
    }
    CommentsStoreState6 = pid;
    commentsStoreMap12.clear();
    commentsStoreSet8.clear();
    CommentsStoreState9 = null;
    if (!commentsStoreMap20.has(pid)) {
      let updateCommentsStoreOutboxResult2: Dynamic = null;
      let preloadTImport2: Dynamic = preloadTImport(
        (..._extraArguments: unknown[]): Dynamic =>
          import("./comment-outbox-backing").then(
            (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              (updateCommentsStoreOutboxResult2 = result.openScopedOutbox(
                pid,
                CommentsStoreState8,
              )),
            (..._extraArguments: unknown[]) => (
              console.warn(
                `comments: outbox storage did not load — unsent comments are kept in memory only`,
              ),
              null
            ),
          ),
        collectObservabilityTelemetryValue([6, 5]),
        import.meta.url,
      );
      commentsStoreMap20.set(pid, {
        get backing(): Dynamic {
          return updateCommentsStoreOutboxResult2?.backing ?? `pending`;
        },
        load: (..._extraArguments: unknown[]): Dynamic =>
          preloadTImport2.then(
            (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              result?.load() ?? [],
          ),
        put: (
          updateCommentsStoreOutbox2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          preloadTImport2.then(
            (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              result?.put(updateCommentsStoreOutbox2),
          ),
        del: (
          updateCommentsStoreOutbox2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          preloadTImport2.then(
            (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              result?.del(updateCommentsStoreOutbox2),
          ),
        has: (
          updateCommentsStoreOutbox2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          preloadTImport2.then(
            (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              result?.has(updateCommentsStoreOutbox2) ?? true,
          ),
        get: (
          updateCommentsStoreOutbox2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          preloadTImport2.then(
            (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              result?.get(updateCommentsStoreOutbox2) ?? `standing`,
          ),
      });
    }
  }
  commentsStoreMap20
    .get(pid)
    ?.load()
    .then(
      (
        updateCommentsStoreOutbox2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (updateCommentsStoreOutboxResult !== commentsStoreValue06) return;
        let filteredUpdateCommentsStoreOutbox: Dynamic =
          updateCommentsStoreOutbox2.filter(
            (page?: Dynamic, ..._extraArguments: unknown[]) =>
              page.pid === pid &&
              !commentsStoreMap12.has(page.tmpId) &&
              !commentsStoreSet8.has(page.opId),
          );
        if (filteredUpdateCommentsStoreOutbox.length !== 0) {
          for (let updateCommentsStoreOutboxResult2 of filteredUpdateCommentsStoreOutbox as Dynamic) {
            if (updateCommentsStoreOutboxResult2.refused !== undefined) {
              updateCommentsStoreOutboxResult2.refusedCopy =
                updateCommentsStoreOutboxResult2.refused.copy;
            }
            commentsStoreMap12.set(
              updateCommentsStoreOutboxResult2.tmpId,
              updateCommentsStoreOutboxResult2,
            );
          }
          useCommentStore.setState(
            (
              updateCommentsStoreOutbox3?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => {
              let outbox: Dynamic = {
                ...updateCommentsStoreOutbox3.outbox,
              };
              for (let updateCommentsStoreOutboxResult2 of filteredUpdateCommentsStoreOutbox as Dynamic)
                if (updateCommentsStoreOutboxResult2.refused === undefined) {
                  outbox[updateCommentsStoreOutboxResult2.tmpId] ??= {
                    state: commentsStoreValue04 ? `failed` : `queued`,
                  };
                } else {
                  outbox[updateCommentsStoreOutboxResult2.tmpId] = {
                    state: `refused`,
                    copy: updateCommentsStoreOutboxResult2.refused.copy,
                  };
                }
              return {
                outbox: outbox,
              };
            },
          );
          resolveCommentsStoreValue13();
          resolveCommentsStoreValue14();
        }
      },
    );
  let updateCommentsStoreBacking2: Dynamic = updateCommentsStoreBacking(
    pid,
    CommentsStoreMessage3,
  );
  let commentsStoreValue9: Dynamic = resolveCommentsStoreValue9();
  updateCommentsStoreBacking2
    .load()
    .then((result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      for (let page of result as Dynamic) {
        let since = Date.parse(page.createdAt);
        let bodyKey: Dynamic = page.value?.bodyKey;
        let value: Dynamic = page.value;
        if (page.pid !== pid || !(resolveCommentsStoreValue9() - since < 6e5))
          updateCommentsStoreBacking2.del(page.opId);
        else if (
          value?.state === `withdrawing` &&
          typeof value.id == `string`
        ) {
          commentsStoreMap15.delete(page.opId);
          resolveCommentsStoreValue11(
            {
              opId: page.opId,
              pid: pid,
              pageId: page.pageId,
              container: page.container,
            },
            value.id,
            value.road === `answer` || value.road === `replayed`
              ? value.road
              : `feed`,
            {
              since: since,
            },
          );
        } else if (typeof bodyKey != `string`)
          updateCommentsStoreBacking2.del(page.opId);
        else if (!commentsStoreMap15.has(page.opId)) {
          let record2: Dynamic = {
            opId: page.opId,
            pid: pid,
            pageId: page.pageId,
            container: page.container,
            bodyKey: bodyKey,
            at: since,
          };
          updateCommentsStoreBodyKey(record2, false);
          let commentsStoreMap18Entry: Dynamic = commentsStoreMap18.get(
            page.opId,
          );
          if (commentsStoreMap18Entry?.bodyKey !== bodyKey) continue;
          if (commentsStoreMap18Entry.heardAt >= commentsStoreValue9) {
            resolveCommentsStoreValue11(
              record2,
              commentsStoreMap18Entry.id,
              `feed`,
            );
          } else {
            clearCommentsStoreState(page.opId);
            emitTelemetryEvent(
              createPagesCommentWithdrawEvent(`already_posted`, `feed`),
            );
          }
        }
      }
    });
  try {
    commentsStoreState3 = (
      CommentsStoreState8.viewer ??
      (inFrame()
        ? (
            updateCommentsStoreOutbox2?: Dynamic,
            options?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            subscribeFrameViewer(
              `project/${updateCommentsStoreOutbox2}`,
              options,
            )
        : undefined)
    )?.(
      pid,
      (
        updateCommentsStoreOutbox2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined =>
        void (
          updateCommentsStoreOutbox2 &&
          commentsStoreMap13.set(pid, updateCommentsStoreOutbox2)
        ),
    );
  } catch {
    commentsStoreState3 = undefined;
  }
  let feed: Dynamic =
    CommentsStoreState8.feed ??
    ((
      updateCommentsStoreOutbox2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => subscribeProjectFeed(updateCommentsStoreOutbox2, options));
  try {
    CommentsStoreState7 = feed(
      pid,
      (entry?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        if (entry.kind === `envelope`) {
          updateCommentsStoreOpId(entry.envelope, pid);
        } else {
          if (
            (entry.kind === `live` || entry.kind === `recovered`) &&
            commentsStoreMap17.size > 0
          ) {
            resolveCommentsStoreValue12();
          }
        }
        if (updateCommentsStoreOutboxResult === commentsStoreValue06) {
          if (entry.kind === `envelope`) {
            if (resolveDataModelSchemasAgent(entry.envelope) !== null) {
              CommentsStoreState9 = Date.now();
            }
            return;
          }
          if (entry.kind === `live` || entry.kind === `recovered`) {
            commentsStoreValue04 = true;
            commentsStoreValue05++;
            commentsStoreValue_12 = false;
            resolveCommentsStoreValue14();
          } else {
            if (
              entry.kind === `down` ||
              entry.kind === `revoked` ||
              entry.kind === `moving`
            ) {
              commentsStoreValue04 = false;
              resolveCommentsStoreValue10();
              useCommentStore.setState(
                (
                  updateCommentsStoreOutbox2?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => {
                  let enabled = false;
                  let outbox: Dynamic = {
                    ...updateCommentsStoreOutbox2.outbox,
                  };
                  for (let [
                    updateCommentsStoreOutboxResult2,
                    updateCommentsStoreOutboxResult3,
                  ] of Object.entries(outbox) as Dynamic)
                    if (updateCommentsStoreOutboxResult3.state === `failed`) {
                      outbox[updateCommentsStoreOutboxResult2] = {
                        state: `queued`,
                        ...(updateCommentsStoreOutboxResult3.unconfirmed !==
                          undefined && {
                          unconfirmed:
                            updateCommentsStoreOutboxResult3.unconfirmed,
                        }),
                      };
                      enabled = true;
                    }
                  return enabled
                    ? {
                        outbox: outbox,
                      }
                    : updateCommentsStoreOutbox2;
                },
              );
            }
          }
        }
      },
    );
  } catch {
    CommentsStoreState7 = null;
  }
}

function updateCommentsStoreSome(..._extraArguments: unknown[]): undefined {
  commentsStoreValue06++;
  let CommentsStoreState62: Dynamic = CommentsStoreState6;
  if (
    CommentsStoreState7 !== null &&
    CommentsStoreState62 !== null &&
    [...commentsStoreMap15.values(), ...commentsStoreMap17.values()].some(
      (page?: Dynamic, ..._extraArguments: unknown[]) =>
        page.pid === CommentsStoreState62,
    )
  ) {
    commentsStoreMap19.get(CommentsStoreState62)?.();
    commentsStoreMap19.set(CommentsStoreState62, CommentsStoreState7);
  } else {
    CommentsStoreState7?.();
  }
  CommentsStoreState7 = null;
  commentsStoreState3?.();
  commentsStoreState3 = undefined;
  commentsStoreValue_1 = false;
  resolveCommentsStoreValue10();
  resolveCommentsStoreValues();
}

var resolveCommentsStoreValue15: (..._extraArguments: unknown[]) => string;

var useCommentStore: Dynamic;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeCommentsStore3Step1(): void {
  commentsStoreValue0 = 0;
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeCommentsStore3Step2(): void {
  CommentsStoreState3 = null;
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeCommentsStore3Step3(): void {
  resolveCommentsStoreValue10 = (
    ..._extraArguments: unknown[]
  ): undefined => {};
  commentsStoreValue_1 = false;
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeCommentsStore3Step4(): void {
  resolveCommentsStoreValue11 = (
    ..._extraArguments: unknown[]
  ): undefined => {};
  resolveCommentsStoreValue12 = (
    ..._extraArguments: unknown[]
  ): undefined => {};
  commentsStoreValue_12 = false;
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeCommentsStore3Step5(): void {
  CommentsStoreState6 = null;
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeCommentsStore3Step6(): void {
  CommentsStoreState7 = null;
  commentsStoreValue04 = true;
  commentsStoreValue05 = 0;
  commentsStoreValue06 = 0;
  resolveCommentsStoreValue13 = (
    ..._extraArguments: unknown[]
  ): undefined => {};
  resolveCommentsStoreValue14 = (
    ..._extraArguments: unknown[]
  ): undefined => {};
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeCommentsStore3Step7(): void {
  CommentsStoreState9 = null;
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeCommentsStore3Step8(): void {
  resolveCommentsStoreValue15 = (..._extraArguments: unknown[]) => ``;
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeCommentsStore3Step9(): void {
  useCommentStore = create(
    createCommentStore({
      moduleUrl: import.meta.url,
      get commentsStoreState() {
        return commentsStoreState;
      },
      set commentsStoreState(value) {
        commentsStoreState = value;
      },
      get CommentsStoreState3() {
        return CommentsStoreState3;
      },
      set CommentsStoreState3(value) {
        CommentsStoreState3 = value;
      },
      get CommentsStoreState6() {
        return CommentsStoreState6;
      },
      get commentsStoreValue_1() {
        return commentsStoreValue_1;
      },
      get commentsStoreValue_12() {
        return commentsStoreValue_12;
      },
      set commentsStoreValue_12(value) {
        commentsStoreValue_12 = value;
      },
      get commentsStoreValue0() {
        return commentsStoreValue0;
      },
      set commentsStoreValue0(value) {
        commentsStoreValue0 = value;
      },
      get commentsStoreValue04() {
        return commentsStoreValue04;
      },
      get commentsStoreValue05() {
        return commentsStoreValue05;
      },
      get resolveCommentsStoreValue10() {
        return resolveCommentsStoreValue10;
      },
      set resolveCommentsStoreValue10(value) {
        resolveCommentsStoreValue10 = value;
      },
      get resolveCommentsStoreValue11() {
        return resolveCommentsStoreValue11;
      },
      set resolveCommentsStoreValue11(value) {
        resolveCommentsStoreValue11 = value;
      },
      get resolveCommentsStoreValue12() {
        return resolveCommentsStoreValue12;
      },
      set resolveCommentsStoreValue12(value) {
        resolveCommentsStoreValue12 = value;
      },
      get resolveCommentsStoreValue13() {
        return resolveCommentsStoreValue13;
      },
      set resolveCommentsStoreValue13(value) {
        resolveCommentsStoreValue13 = value;
      },
      get resolveCommentsStoreValue14() {
        return resolveCommentsStoreValue14;
      },
      set resolveCommentsStoreValue14(value) {
        resolveCommentsStoreValue14 = value;
      },
      get resolveCommentsStoreValue15() {
        return resolveCommentsStoreValue15;
      },
      set resolveCommentsStoreValue15(value) {
        resolveCommentsStoreValue15 = value;
      },
    }),
  );
}

export {
  CommentsStoreState6,
  CommentsStoreState9,
  _focusMoveWatcher,
  commentsStoreValue0,
  commentsStoreValue_1,
  resolveCommentsStoreValue11,
  resolveCommentsStoreValue15,
  updateCommentsStoreOutbox,
  updateCommentsStoreSome,
  useCommentStore,
};
