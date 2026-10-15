/** BaoCut: extracted document interaction state expressions; state remains owned by the original closure. */
import type { Dynamic } from "./types";
import type { DocumentInteractionContext } from "./docs-app-interaction-context";

export function createDocumentInteractionWriteIntegrityIn1(__documentClosure: Pick<DocumentInteractionContext, "emitTelemetryEvent" | "createPagesTrayBornEvent" | "createPagesTrayRetiredEvent" | "elementRef17" | "setEnabledState" | "resolvePlatformKeyboardAndSaveStatusRise" | "createPagesReseatLocalAheadEvent" | "createPagesPictureRejectedEvent" | "createPagesComposeReleasedEvent" | "createPagesTypingOrderWasOffEvent" | "setSaveAlarmOwed" | "setEnabledState4" | "setPile">): Dynamic {
  return ((entry?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (entry.kind === `tray_born`)
        return void (0, __documentClosure.emitTelemetryEvent)(
          (0, __documentClosure.createPagesTrayBornEvent)({
            road: entry.road,
            flags: entry.flags,
            chars: Number(entry.chars),
            why: entry.why,
          }),
        );
      if (entry.kind === `tray_retired`)
        return void (0, __documentClosure.emitTelemetryEvent)(
          (0, __documentClosure.createPagesTrayRetiredEvent)({
            why: entry.why,
            road: entry.road,
            stoodS: Number(entry.stoodS),
          }),
        );
      let element: Dynamic = __documentClosure.elementRef17.current;
      if (!element || entry.lid !== element.lid) return;
      let isFinite2: Dynamic = (
        documentInteractionOverlays?: unknown,
        ..._extraArguments: unknown[]
      ) =>
        typeof documentInteractionOverlays == `number` &&
        Number.isFinite(documentInteractionOverlays) &&
        documentInteractionOverlays >= 0
          ? documentInteractionOverlays
          : 0;
      if (entry.kind === `local` && entry.dirty !== true) {
        (0, __documentClosure.setEnabledState)((0, __documentClosure.resolvePlatformKeyboardAndSaveStatusRise)(`clean`));
      }
      if (entry.kind === `local`) {
        element.w.local(
          isFinite2(entry.local),
          entry.dirty === true,
          Date.now(),
          typeof entry.hold == `string` ? entry.hold : undefined,
        );
      } else {
        if (entry.kind === `reseat_local_ahead`) {
          (0, __documentClosure.emitTelemetryEvent)(
            (0, __documentClosure.createPagesReseatLocalAheadEvent)({
              blocks: isFinite2(entry.blocks),
              chars: isFinite2(entry.chars),
              inflight: isFinite2(entry.inflight),
              staleS: Math.round(isFinite2(entry.staleMs) / 1e3),
              trayed: entry.trayed === true,
            }),
          );
        } else {
          if (entry.kind === `picture_rejected`) {
            (0, __documentClosure.emitTelemetryEvent)(
              (0, __documentClosure.createPagesPictureRejectedEvent)({
                asked: entry.asked === true,
                why: typeof entry.why == `string` ? entry.why : `other`,
                run: isFinite2(entry.run),
              }),
            );
          } else {
            if (entry.kind === `compose_released`) {
              (0, __documentClosure.emitTelemetryEvent)(
                (0, __documentClosure.createPagesComposeReleasedEvent)({
                  why: typeof entry.why == `string` ? entry.why : ``,
                  ro: typeof entry.ro == `string` ? entry.ro : ``,
                  seconds: isFinite2(entry.seconds),
                }),
              );
            } else {
              if (entry.kind === `typed_out_of_order`) {
                ((
                  documentInteractionOverlays?: Dynamic,
                  ..._extraArguments: unknown[]
                ) =>
                  documentInteractionOverlays !== null &&
                  (0, __documentClosure.emitTelemetryEvent)(documentInteractionOverlays))(
                  (0, __documentClosure.createPagesTypingOrderWasOffEvent)({
                    who: entry.who,
                    n: isFinite2(entry.n),
                  }),
                );
              }
            }
          }
        }
      }
      if (entry.kind === `local`) {
        element.w.frameSaid(entry.oldest, entry.served, Date.now());
      }
      if (entry.kind === `local`) {
        (0, __documentClosure.setSaveAlarmOwed)(element.w.gapOwed());
      }
      if (entry.kind === `local`) {
        (0, __documentClosure.setEnabledState4)(element.w.answerHeld());
      }
      if (entry.kind === `local`) {
        (0, __documentClosure.setPile)(element.w.pileOwed());
      }
    });
}

export function createDocumentInteractionEffect2(__documentClosure: Pick<DocumentInteractionContext, "pid" | "fileId" | "loadDocumentInteractionsWord" | "loadDataOperationControlKind" | "elementRef2" | "mountGenRef" | "setMountGen" | "elementRef">): Dynamic {
  return ((..._extraArguments: unknown[]): Dynamic => {
      if (!__documentClosure.pid || !__documentClosure.fileId) return;
      let documentInteractionsWord: Dynamic = (0, __documentClosure.loadDocumentInteractionsWord)({
        readHead: async (..._extraArguments: unknown[]): Promise<Dynamic> => {
          let head: Dynamic =
            (await (0, __documentClosure.loadDataOperationControlKind)({
              kind: `project`,
              id: __documentClosure.pid,
            }).read(
              {
                object: `file`,
                id: __documentClosure.fileId,
              },
              `json`,
            )) ?? {};
          return {
            node:
              head.content?.kind === `node` && head.content.id
                ? head.content.id
                : null,
            head: head,
          };
        },
        now: (..._extraArguments: unknown[]) => Date.now(),
        remount: (
          { to: to2 }: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          __documentClosure.elementRef2.current?.decide(to2, __documentClosure.mountGenRef.current);
          (0, __documentClosure.setMountGen)(
            (
              documentInteractionOverlays?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => documentInteractionOverlays + 1,
          );
        },
      });
      __documentClosure.elementRef.current = documentInteractionsWord;
      return (..._extraArguments: unknown[]): undefined => {
        documentInteractionsWord.dispose();
        if (__documentClosure.elementRef.current === documentInteractionsWord) {
          __documentClosure.elementRef.current = null;
        }
      };
    });
}
