/** BaoCut: document context from index-CX4IZqzA.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  React,
} from "../bootstrap";
import {
  DocumentContextSetTimeout,
  DocumentContextState3,
  documentContextLimit10,
  documentContextLimit12,
  documentContextLimit2000,
  documentContextLimit5000,
  documentContextLimit64,
  documentContextSet3,
} from "./create-widget-writing-coordinator";

function useDocumentManifestState(
  timers: Dynamic = DocumentContextSetTimeout,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let lookupRef: Dynamic = (0, React.useRef)(new (Map as Dynamic)());
  let lookupRef2: Dynamic = (0, React.useRef)(new (Map as Dynamic)());
  let lookupRef3: Dynamic = (0, React.useRef)(new (Map as Dynamic)());
  let lookupRef4: Dynamic = (0, React.useRef)(new (Map as Dynamic)());
  let lookupRef5: Dynamic = (0, React.useRef)(new (Map as Dynamic)());
  let lookupRef6: Dynamic = (0, React.useRef)(new (Map as Dynamic)());
  let enabledRef: Dynamic = (0, React.useRef)(false);
  let useDocumentManifestStateHandler = (
    documentManifestState?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (!lookupRef6.current.has(documentManifestState)) {
      lookupRef6.current.set(
        documentManifestState,
        timers.setTimeout((..._extraArguments: unknown[]): undefined => {
          lookupRef6.current.delete(documentManifestState);
          let lookupEntry: Dynamic = lookupRef5.current.get(
            documentManifestState,
          );
          if (lookupEntry)
            for (let useDocumentManifestStateResult of lookupEntry.members as Dynamic) {
              let lookupEntry2: Dynamic = lookupRef4.current.get(
                useDocumentManifestStateResult,
              );
              if (
                !(
                  !lookupEntry2 ||
                  !lookupRef.current.has(useDocumentManifestStateResult)
                )
              ) {
                lookupEntry2.reply({
                  ok: true,
                  value: null,
                });
              }
            }
        }, documentContextLimit10),
      );
    }
  };
  let warn = (
    documentManifestState?: Dynamic,
    tableId?: Dynamic,
    reply?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let lookupEntry: Dynamic = lookupRef5.current.get(tableId);
    if (!lookupEntry) {
      if (lookupRef5.current.size >= documentContextLimit12) {
        if (!enabledRef.current) {
          enabledRef.current = true;
          console.warn(
            `[useBridgeWatches] live table-watch cap reached (${documentContextLimit12} distinct tables per mount); watch("table:${tableId}") will resolve once but not stay live.`,
          );
        }
        return false;
      }
      let leave2: Dynamic = options(tableId, (..._extraArguments: unknown[]) =>
        useDocumentManifestStateHandler(tableId),
      );
      if (leave2 === null) return false;
      lookupEntry = {
        members: new (Set as Dynamic)(),
        leave: leave2,
      };
      lookupRef5.current.set(tableId, lookupEntry);
    }
    lookupEntry.members.add(documentManifestState);
    lookupRef4.current.set(documentManifestState, {
      tableId: tableId,
      reply: reply,
    });
    return true;
  };
  let leave = (
    documentManifestState?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let lookupEntry: Dynamic = lookupRef4.current.get(documentManifestState);
    if (!lookupEntry) return;
    lookupRef4.current.delete(documentManifestState);
    let lookupEntry2: Dynamic = lookupRef5.current.get(lookupEntry.tableId);
    if (
      !lookupEntry2 ||
      (lookupEntry2.members.delete(documentManifestState),
      lookupEntry2.members.size > 0)
    )
      return;
    lookupRef5.current.delete(lookupEntry.tableId);
    let lookupEntry3: Dynamic = lookupRef6.current.get(lookupEntry.tableId);
    if (lookupEntry3 !== undefined) {
      timers.clearTimeout(lookupEntry3);
      lookupRef6.current.delete(lookupEntry.tableId);
    }
    lookupEntry2.leave();
  };
  return (0, React.useRef)({
    startWatch(
      documentManifestState?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let {
        id: documentManifestState2,
        headKind: documentManifestState3,
        headId: documentManifestState4,
        resolve: documentManifestState5,
        reply: documentManifestState6,
        mode: documentManifestState7,
      }: Dynamic = documentManifestState;
      if (lookupRef.current.has(documentManifestState2)) {
        documentManifestState6({
          ok: false,
          error: `watch-dup`,
        });
        return;
      }
      if (
        lookupRef.current.size + lookupRef2.current.size >=
        documentContextLimit64
      ) {
        documentManifestState6({
          ok: false,
          error: `watch-cap`,
        });
        return;
      }
      let total: Dynamic = timers.now() + DocumentContextState3;
      let documentManifestState8 = (
        ..._extraArguments: unknown[]
      ): undefined => {
        documentManifestState5().then(
          (response?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            if (lookupRef.current.has(documentManifestState2)) {
              if (documentManifestState7 === `completion-keyed`) {
                let response2: Dynamic = response;
                let enabled: boolean = !lookupRef3.current.has(
                  documentManifestState2,
                );
                let run: Dynamic =
                  response2 && typeof response2 == `object`
                    ? typeof response2.run == `string` &&
                      documentContextSet3.has(String(response2.status))
                      ? response2.run
                      : `none:` + String(response2.state ?? `?`)
                    : enabled
                      ? `unresolved`
                      : (lookupRef3.current.get(documentManifestState2) ??
                        `unresolved`);
                let matchesRun: boolean =
                  run !==
                  (lookupRef3.current.get(documentManifestState2) ?? ``);
                lookupRef.current.set(
                  documentManifestState2,
                  timers.setTimeout(
                    documentManifestState8,
                    documentContextLimit5000,
                  ),
                );
                if (enabled || matchesRun) {
                  documentManifestState6({
                    ok: true,
                    value: response,
                  });
                  lookupRef3.current.set(documentManifestState2, run);
                }
                return;
              }
              if (
                (documentManifestState3 === `fn` ||
                  documentManifestState3 === `run`) &&
                response &&
                typeof response == `object` &&
                response.status === `running` &&
                timers.now() < total
              ) {
                lookupRef.current.set(
                  documentManifestState2,
                  timers.setTimeout(
                    documentManifestState8,
                    documentContextLimit2000,
                  ),
                );
              } else {
                if (documentManifestState3 === `type`) {
                  lookupRef.current.delete(documentManifestState2);
                  lookupRef2.current.set(
                    documentManifestState2,
                    documentManifestState4,
                  );
                } else {
                  if (
                    !(
                      documentManifestState3 === `table` &&
                      lookupRef4.current.has(documentManifestState2)
                    )
                  ) {
                    lookupRef.current.delete(documentManifestState2);
                  }
                }
              }
              documentManifestState6({
                ok: true,
                value: response,
              });
            }
          },
          (error?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            if (lookupRef.current.has(documentManifestState2)) {
              lookupRef.current.delete(documentManifestState2);
              lookupRef3.current.delete(documentManifestState2);
              leave(documentManifestState2);
              documentManifestState6({
                ok: false,
                error: error?.message || `read-failed`,
              });
            }
          },
        );
      };
      lookupRef.current.set(
        documentManifestState2,
        timers.setTimeout((..._extraArguments: unknown[]): undefined => {}, 0),
      );
      if (
        documentManifestState3 === `table` &&
        options !== undefined &&
        !documentManifestState4.includes(`/`)
      ) {
        warn(
          documentManifestState2,
          documentManifestState4,
          documentManifestState6,
        );
      }
      documentManifestState8();
    },
    addTypeWatch(
      documentManifestState?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      return lookupRef2.current.size + lookupRef.current.size >=
        documentContextLimit64
        ? false
        : (lookupRef2.current.set(documentManifestState, options2), true);
    },
    hasTypeWatch: (
      documentManifestState?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => lookupRef2.current.has(documentManifestState),
    typeWatchEntries: (..._extraArguments: unknown[]): Dynamic => [
      ...lookupRef2.current.entries(),
    ],
    unwatch(
      documentManifestState?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let lookupEntry: Dynamic = lookupRef.current.get(documentManifestState);
      if (lookupEntry) {
        timers.clearTimeout(lookupEntry);
      }
      lookupRef.current.delete(documentManifestState);
      lookupRef2.current.delete(documentManifestState);
      lookupRef3.current.delete(documentManifestState);
      leave(documentManifestState);
    },
    clearAll(..._extraArguments: unknown[]): undefined {
      for (let useDocumentManifestStateResult of lookupRef.current.values() as Dynamic)
        timers.clearTimeout(useDocumentManifestStateResult);
      lookupRef.current.clear();
      lookupRef2.current.clear();
      lookupRef3.current.clear();
      for (let useDocumentManifestStateResult of lookupRef6.current.values() as Dynamic)
        timers.clearTimeout(useDocumentManifestStateResult);
      lookupRef6.current.clear();
      for (let useDocumentManifestStateResult of lookupRef5.current.values() as Dynamic)
        useDocumentManifestStateResult.leave();
      lookupRef5.current.clear();
      lookupRef4.current.clear();
    },
  }).current;
}

export { useDocumentManifestState };
