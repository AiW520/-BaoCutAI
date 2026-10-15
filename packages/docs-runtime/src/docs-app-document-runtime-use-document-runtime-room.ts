/** BaoCut: document runtime from index-CX4IZqzA.js. */
import type { Dynamic } from "./types";
import {
  PlatformApiAndAuthUser,
  handleCommentStatusLine,
  isPlatformApiAndAuthHandoff,
  platformApiAndAuthValue60000,
  resolvePlatformApiAndAuthLocalhost,
  resolvePlatformApiAndAuthValue35,
  resolvePlatformLiveDocumentAndHistoryTest,
  toast,
  useCommentStore,
} from "./docs-app-dependencies";
import {
  React,
} from "./docs-app-bootstrap";

var DocumentRuntimeState10: number;

function useDocumentRuntimeRoom(
  documentRuntimeRoom?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [state, setState]: Dynamic = (0, React.useState)(null);
  let [error, setError]: Dynamic = (0, React.useState)(null);
  let [conn, setConn]: Dynamic = (0, React.useState)(null);
  let contextRef: Dynamic = (0, React.useRef)(context);
  contextRef.current = context;
  let elementRef: Dynamic = (0, React.useRef)(undefined);
  let label: Dynamic =
    PlatformApiAndAuthUser(
      (
        documentRuntimeRoom2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => documentRuntimeRoom2.user?.email,
    ) ?? `anon`;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!documentRuntimeRoom || !options) return;
      setState(null);
      setError(null);
      setConn(null);
      let room = resolvePlatformApiAndAuthValue35(documentRuntimeRoom, options);
      if (elementRef.current?.room !== room) {
        elementRef.current = {
          room: room,
          gen: undefined,
        };
      }
      let useDocumentRuntimeRoomResult = resolvePlatformApiAndAuthLocalhost(
        `/api/room/${encodeURIComponent(room)}?uid=${encodeURIComponent(label)}`,
      );
      let enabled = false;
      let index = 0;
      let useDocumentRuntimeRoomResult2: Dynamic;
      let refetch = (..._extraArguments: unknown[]): undefined =>
        void useCommentStore
          .getState()
          .refetch(documentRuntimeRoom, options)
          .catch((..._extraArguments: unknown[]): undefined => {});
      let useDocumentRuntimeRoomResult3: Dynamic = isPlatformApiAndAuthHandoff(
        useDocumentRuntimeRoomResult,
        (
          documentRuntimeRoom2?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          let documentRuntimeRoom3: Dynamic = documentRuntimeRoom2;
          let matchesT =
            documentRuntimeRoom3.t === `state` ||
            documentRuntimeRoom3.t === `node` ||
            documentRuntimeRoom3.t === `lfile-error`;
          let matchesIndex = index > 0;
          if (matchesT) {
            enabled = true;
            index = 0;
          }
          if (documentRuntimeRoom3.t === `state`) {
            let gen: Dynamic =
              elementRef.current?.room === room
                ? elementRef.current.gen
                : undefined;
            if (gen !== undefined && documentRuntimeRoom3.gen !== gen) {
              contextRef.current();
            }
            if (gen !== undefined || matchesIndex) {
              useCommentStore.getState().clearWorkingFor(options);
              refetch();
            }
            if (elementRef.current?.room === room) {
              elementRef.current = {
                room: room,
                gen: documentRuntimeRoom3.gen,
              };
            }
            setState({
              file: documentRuntimeRoom3.file,
              rev: documentRuntimeRoom3.rev,
              gen: documentRuntimeRoom3.gen,
            });
          } else if (documentRuntimeRoom3.t === `node`) {
            setState(
              (
                documentRuntimeRoom4?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => {
                if (!documentRuntimeRoom4) return documentRuntimeRoom4;
                let nodes: Dynamic = {
                  ...documentRuntimeRoom4.file.nodes,
                };
                if (documentRuntimeRoom3.node) {
                  nodes[documentRuntimeRoom3.id] = documentRuntimeRoom3.node;
                } else {
                  delete nodes[documentRuntimeRoom3.id];
                }
                return {
                  file: {
                    ...documentRuntimeRoom4.file,
                    nodes: nodes,
                  },
                  rev: documentRuntimeRoom3.rev,
                  gen: documentRuntimeRoom4.gen,
                };
              },
            );
          } else {
            if (documentRuntimeRoom3.t === `comment-changed`) {
              refetch();
            } else {
              if (documentRuntimeRoom3.t === `comment-status`) {
                handleCommentStatusLine(documentRuntimeRoom3);
              } else {
                if (documentRuntimeRoom3.t === `lfile-error`) {
                  setError(documentRuntimeRoom3.reason || `boot-failed`);
                  useDocumentRuntimeRoomResult3.close();
                }
              }
            }
          }
        },
        (
          documentRuntimeRoom2?: Dynamic,
          options2?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (
            documentRuntimeRoom2 === `reconnecting` &&
            !enabled &&
            ++index >= 10
          ) {
            setError(`boot-failed`);
            useDocumentRuntimeRoomResult3.close();
          }
          clearTimeout(useDocumentRuntimeRoomResult2);
          useDocumentRuntimeRoomResult2 = undefined;
          if (documentRuntimeRoom2 === `open`) {
            setConn(null);
          } else {
            if (documentRuntimeRoom2 === `draining` && enabled) {
              setConn(`draining`);
            } else {
              if (documentRuntimeRoom2 === `reconnecting` && enabled) {
                if (options2?.handoff) {
                  useDocumentRuntimeRoomResult2 = setTimeout(
                    (..._extraArguments: unknown[]): Dynamic =>
                      setConn(`offline`),
                    5e3,
                  );
                } else {
                  setConn(`offline`);
                }
              }
            }
          }
        },
      );
      return (..._extraArguments: unknown[]): undefined => {
        clearTimeout(useDocumentRuntimeRoomResult2);
        useDocumentRuntimeRoomResult3.close();
      };
    },
    [documentRuntimeRoom, options, label],
  );
  return {
    state: state,
    error: error,
    conn: conn,
  };
}

var resolveDocumentRuntimeTop: Dynamic;

var DocumentRuntime_ThatTabHasBeenDeletedOrIsNoLongerAvailable: string;

var DocumentRuntime_Message: string;

var DocumentRuntime_Message2: string;

var resolveDocumentRuntimeError: Dynamic;

var documentRuntimeLimit250: number;

var documentRuntimeLimit2500: number;

var resolveDocumentRuntimeValue10: (documentRuntimeValue10?: Dynamic, ..._extraArguments: unknown[]) => string;

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeDocumentRuntimeUseDocumentRuntimeRoomStep1(): void {
  (DocumentRuntimeState10 = platformApiAndAuthValue60000);
  (resolveDocumentRuntimeTop = (
    documentRuntime?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (!documentRuntime) return null;
    let documentRuntimeBounds: Dynamic = documentRuntime.getBoundingClientRect();
    return {
      top: documentRuntimeBounds.top,
      left: documentRuntimeBounds.left,
      width: documentRuntimeBounds.width,
      height: documentRuntimeBounds.height,
    };
  });
  (DocumentRuntime_ThatTabHasBeenDeletedOrIsNoLongerAvailable = `That tab has been deleted or is no longer available.`);
  (DocumentRuntime_Message = `The edit didn't reach the server — try again.`);
  (DocumentRuntime_Message2 = `The text didn't save.`);
  (resolveDocumentRuntimeError = (
    documentRuntimeError?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    toast.error(
      documentRuntimeError === DocumentRuntime_Message ||
        documentRuntimeError === DocumentRuntime_Message2
        ? documentRuntimeError
        : `The text didn't save` +
            resolvePlatformLiveDocumentAndHistoryTest(documentRuntimeError),
    ));
  (documentRuntimeLimit250 = 250);
  (documentRuntimeLimit2500 = 2500);
  (resolveDocumentRuntimeValue10 = (
    documentRuntimeValue10?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    documentRuntimeValue10 === 1
      ? `1 comment`
      : `${documentRuntimeValue10} comments`);
}

export {
  DocumentRuntimeState10,
  DocumentRuntime_Message,
  DocumentRuntime_Message2,
  DocumentRuntime_ThatTabHasBeenDeletedOrIsNoLongerAvailable,
  documentRuntimeLimit250,
  documentRuntimeLimit2500,
  resolveDocumentRuntimeError,
  resolveDocumentRuntimeTop,
  resolveDocumentRuntimeValue10,
  useDocumentRuntimeRoom,
};
