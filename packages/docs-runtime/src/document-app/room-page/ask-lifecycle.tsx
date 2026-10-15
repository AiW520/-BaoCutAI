import { React, mapPreloadDependencies } from "../bootstrap";
import { commentSessionIdentity } from "../comment-session/ask-suggestions-measure";
import { getCommentSessionEnd, resolveCommentSessionHost, resolveCommentSessionHost2, resolveCommentSessionHost4 } from "../comment-session/clear-comment-session-thread-id";
import { DocumentRuntimeAdd, DocumentRuntimeOffered } from "../document-runtime/widget-provenance-gutter";
import { resolveDocumentCommandsClaudeWriting, resolveDocumentCommandsCurrent, resolveDocumentCommandsGetPrototypeOf, resolveDocumentCommandsSimulated } from "../document-commands/create-ask-card-request-pool";
import { flipAskCardRecovery, hasAskCardRecoveryContent, isCommentSessionFeatureDisabled } from "../comment-notifications/create-comment-notice-coordinator";
import { resolveFrameGesturesHasFocus, resolveFrameGesturesKeyboard2, resolveFrameGesturesRoom, updateFrameGesturesVisibilityState } from "../frame/gestures-state-1";

/** BaoCut: room document ask lifecycle; live accessors preserve closure state. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  frameSampleAvailable,
  frameSamplePermission,
  frameViewerOutside,
  isPlatformFrameAndCapabilitiesWindow,
  resolveCommentsStoreLayer,
  resolveCommentsStoreValue23,
  resolveCommentsStoreValue24,
  resolvePlatformAnnouncementsValue,
  resolvePlatformFeatureFlagsEnabled,
  resolvePlatformFeatureFlagsValue5,
  resolvePlatformKeyboardAndSaveStatusValue3,
  updatePlatformAnnouncementsTimers,
} from "../../platform/index";
import { isFrameArtifact } from "../../boot/environment";
import { preloadModule } from "../../boot/preload";
export function runRoomPage31RoutePageRef(roomPageContext: {}): Dynamic {
  return (0, React.useRef)({
    tab: undefined,
    pid: undefined,
    roomNodeId: undefined,
    path: ``,
    pageId: ``
  });
}
export function runRoomPage32EnsureSessionRunsLoaded(roomPageContext: {
  postSessionCarrierRef: Dynamic;
  resummonSessionRef: Dynamic;
  roomPageModuleUrl: Dynamic;
  sessionEndedRef: Dynamic;
  sessionKindRef: Dynamic;
  sessionModRef: Dynamic;
  sessionModulePromiseRef: Dynamic;
  sessionRunsRef: Dynamic;
}): Dynamic {
  return {
    ["ensureSessionRunsLoaded"]: (..._extraArguments: unknown[]): Dynamic => roomPageContext.sessionModulePromiseRef.current ??= preloadModule((..._extraArguments: unknown[]) => import("../../assistant/session-run").then((result?: Dynamic, ..._extraArguments: unknown[]) => (roomPageContext.sessionModRef.current = result, roomPageContext.sessionRunsRef.current = result.makeSessionRuns({
      now: (..._extraArguments: unknown[]) => performance.now(),
      setTimeout: (roomDocumentPage?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => window.setTimeout(roomDocumentPage, options),
      clearTimeout: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]) => window.clearTimeout(roomDocumentPage),
      carrier: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomPageContext.postSessionCarrierRef.current(roomDocumentPage),
      ended: (roomDocumentPage?: Dynamic, options?: Dynamic, context?: Dynamic, dependencies?: Dynamic, argument?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomPageContext.sessionEndedRef.current(roomDocumentPage, options, context, dependencies, argument),
      resummon: (roomDocumentPage?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomPageContext.resummonSessionRef.current(roomDocumentPage, options),
      queued: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]) => commentSessionIdentity(roomDocumentPage) === `queued`,
      kindOf: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomPageContext.sessionKindRef.current(roomDocumentPage),
      said: getCommentSessionEnd,
      saidLate: (roomDocumentPage?: Dynamic, options?: Dynamic, context?: Dynamic, ..._extraArguments: unknown[]) => getCommentSessionEnd(`late_written`, roomDocumentPage, options, context)
    }), true), (..._extraArguments: unknown[]) => (roomPageContext.sessionModulePromiseRef.current = null, false)), [], roomPageContext.roomPageModuleUrl)
  }["ensureSessionRunsLoaded"];
}
export function runRoomPage33MapPreloadDependencies2(roomPageContext: {
  askCardDeskRef: Dynamic;
  AskCardFaceRef: Dynamic;
  askCardModRef: Dynamic;
  askInvitationKinds: Dynamic;
  askKeySequenceRef: Dynamic;
  askModulesPromiseRef: Dynamic;
  askWhyKeysRef: Dynamic;
  askWhyLeaveRef: Dynamic;
  askWhyModuleRef: Dynamic;
  askWhyRef: Dynamic;
  bumpAskModuleTick: Dynamic;
  closeAskRef: Dynamic;
  goneRef: Dynamic;
  idRef: Dynamic;
  iframeRef: Dynamic;
  inlineAskHostLatestRef: Dynamic;
  inlineAskHostRef: Dynamic;
  leavingAskCardRef: Dynamic;
  navigatedRef: Dynamic;
  releaseAskRef: Dynamic;
  roomPageModuleUrl: Dynamic;
  selbarPortRef: Dynamic;
  setAskWhyOffer: Dynamic;
  setLeavingAskCard: Dynamic;
}): Dynamic {
  return {
    ["mapPreloadDependencies2"]: (..._extraArguments: unknown[]): undefined => {
      roomPageContext.askModulesPromiseRef.current ??= Promise.all([preloadModule((..._extraArguments: unknown[]): Dynamic => import("../../assistant/ask-card"), [], roomPageContext.roomPageModuleUrl), preloadModule((..._extraArguments: unknown[]): Dynamic => import("../../assistant/ask-card-face"), mapPreloadDependencies([31, 1, 0, 2, 3, 32, 23]), roomPageContext.roomPageModuleUrl)]).then(([result, result2]: Dynamic, ..._extraArguments: unknown[]): undefined => {
        roomPageContext.askCardModRef.current = result;
        roomPageContext.AskCardFaceRef.current = result2.ClaudeAskCardFace;
        roomPageContext.askCardDeskRef.current = result.makeAskCardDesk({
          now: (..._extraArguments: unknown[]) => performance.now()
        });
        if (!roomPageContext.goneRef.current) {
          (0, roomPageContext.bumpAskModuleTick)((roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomDocumentPage + 1);
        }
        preloadModule((..._extraArguments: unknown[]) => import("../../assistant/ask-why").then((result3?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (!roomPageContext.goneRef.current) {
            roomPageContext.askWhyModuleRef.current = result3;
            roomPageContext.askWhyRef.current = result3.makeAskWhy({
              offered: (..._extraArguments: unknown[]): Dynamic => result3.askWhyOffered({
                served: resolvePlatformFeatureFlagsValue5(`askWhy`),
                marks: resolvePlatformFeatureFlagsValue5(`configMarks`),
                viewerId: roomPageContext.idRef.current,
                outside: frameViewerOutside()
              }),
              storage: (..._extraArguments: unknown[]) => window.localStorage,
              remoteSeen: (..._extraArguments: unknown[]): Dynamic => DocumentRuntimeAdd.remote(`ask_why_asked`),
              remoteStrict: (..._extraArguments: unknown[]): Dynamic => DocumentRuntimeOffered.keeps(`ask_why_asked`),
              keep: (..._extraArguments: unknown[]): undefined => void DocumentRuntimeAdd.add(`ask_why_asked`),
              split: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]) => resolveCommentSessionHost2(`ask_why_asked`, roomDocumentPage),
              show: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (0, roomPageContext.setAskWhyOffer)(roomDocumentPage),
              say: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]) => resolveCommentSessionHost(`why`, roomDocumentPage),
              thank: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]) => resolvePlatformAnnouncementsValue(document, roomDocumentPage, {
                key: `inline-ask`
              }),
              keysOff: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomPageContext.askWhyKeysRef.current?.revoke(roomDocumentPage),
              release: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomPageContext.releaseAskRef.current(roomDocumentPage),
              now: (..._extraArguments: unknown[]) => performance.now(),
              setTimeout: (roomDocumentPage?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => window.setTimeout(roomDocumentPage, options),
              clearTimeout: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]) => window.clearTimeout(roomDocumentPage)
            });
            roomPageContext.askWhyLeaveRef.current = result3.makeAskWhyLeave({
              easeMs: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => result3.ASK_WHY_EASES_OUT && roomPageContext.askInvitationKinds.current.get(roomDocumentPage) === `write` && window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches !== true ? roomPageContext.askCardModRef.current?.ASK_CARD_OUT_MS ?? 0 : 0,
              fold: (nonce4?: Dynamic, ..._extraArguments: unknown[]): undefined => void (!roomPageContext.navigatedRef.current && roomPageContext.selbarPortRef.current?.postMessage({
                type: `inline-ask-fold`,
                nonce: nonce4
              })),
              mark: (roomDocumentPage?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]): undefined => {
                if (options) {
                  roomPageContext.leavingAskCardRef.current = roomDocumentPage;
                } else {
                  if (roomPageContext.leavingAskCardRef.current === roomDocumentPage) {
                    roomPageContext.leavingAskCardRef.current = null;
                  }
                }
                (0, roomPageContext.setLeavingAskCard)((roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => options ? roomDocumentPage : roomDocumentPage2 === roomDocumentPage ? null : roomDocumentPage2);
              },
              cancel: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => void (roomPageContext.inlineAskHostRef.current?.current()?.nonce === roomDocumentPage && roomPageContext.inlineAskHostRef.current.cancel({
                restoreCaret: false
              })),
              focusInCard: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]) => document.activeElement instanceof Element && document.activeElement.closest(`[data-inline-ask="${roomDocumentPage}"]`) !== null,
              toText: (..._extraArguments: unknown[]): Dynamic => roomPageContext.closeAskRef.current(),
              setTimeout: (roomDocumentPage?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => window.setTimeout(roomDocumentPage, options),
              clearTimeout: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]) => window.clearTimeout(roomDocumentPage)
            });
            roomPageContext.askWhyKeysRef.current = result3.makeAskWhyKeys({
              post: (nonce4?: Dynamic, down?: Dynamic, held2?: Dynamic, ..._extraArguments: unknown[]): undefined => void (!roomPageContext.navigatedRef.current && roomPageContext.selbarPortRef.current?.postMessage({
                type: `inline-ask-keys`,
                nonce: nonce4,
                down: down,
                ...(held2 !== undefined && {
                  held: held2
                })
              })),
              doc: (..._extraArguments: unknown[]) => document,
              frame: (..._extraArguments: unknown[]): Dynamic => roomPageContext.iframeRef.current,
              up: (..._extraArguments: unknown[]): Dynamic => roomPageContext.askWhyRef.current?.current() ?? null,
              leaving: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]) => roomPageContext.leavingAskCardRef.current === roomDocumentPage,
              sinceUpMs: (..._extraArguments: unknown[]) => performance.now() - roomPageContext.askKeySequenceRef.current,
              now: (..._extraArguments: unknown[]) => performance.now(),
              heard: (..._extraArguments: unknown[]): Dynamic => roomPageContext.askWhyRef.current?.heard(),
              toText: (..._extraArguments: unknown[]): Dynamic => roomPageContext.closeAskRef.current(),
              typing: (..._extraArguments: unknown[]): Dynamic => roomPageContext.inlineAskHostLatestRef.current(`typing`, false),
              setTimeout: (roomDocumentPage?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => window.setTimeout(roomDocumentPage, options),
              clearTimeout: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]) => window.clearTimeout(roomDocumentPage)
            });
          }
        }, (..._extraArguments: unknown[]): undefined => {}), [], roomPageContext.roomPageModuleUrl);
      }, (..._extraArguments: unknown[]): undefined => {});
    }
  }["mapPreloadDependencies2"];
}
export function runRoomPage34Record2(roomPageContext: {
  askCardDeskRef: Dynamic;
  AskCardFaceRef: Dynamic;
  askModulesPromiseRef: Dynamic;
  bumpAskModuleTick: Dynamic;
  elementRef73: Dynamic;
  frameMessengerRef: Dynamic;
  goneRef: Dynamic;
  iframeRef: Dynamic;
  mapPreloadDependencies2: Dynamic;
  navigatedRef: Dynamic;
  wants: Dynamic;
}): Dynamic {
  return {
    now: (..._extraArguments: unknown[]) => performance.now(),
    wants: roomPageContext.wants,
    staff: resolveCommentsStoreValue24,
    setting: (..._extraArguments: unknown[]): Dynamic => resolvePlatformFeatureFlagsEnabled(`claudeWriting`),
    inFrame: isFrameArtifact,
    owner: resolveCommentsStoreValue23,
    org: (..._extraArguments: unknown[]) => resolvePlatformFeatureFlagsValue5(`claudeWriting`),
    simulation: (..._extraArguments: unknown[]) => resolveDocumentCommandsGetPrototypeOf(window) !== null,
    option: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]) => resolveDocumentCommandsSimulated((0, roomPageContext.wants)(), window, isFrameArtifact(), roomDocumentPage),
    reads: (..._extraArguments: unknown[]): Dynamic => Promise.all([frameSampleAvailable(), frameSamplePermission()]).then(([available, permission]: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
      available: available,
      permission: permission
    })),
    ring: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]) => resolveCommentsStoreLayer(`host`, `claude_writing_probe`, roomDocumentPage),
    loadCard: (..._extraArguments: unknown[]): Dynamic => ((0, roomPageContext.mapPreloadDependencies2)(), roomPageContext.askModulesPromiseRef.current),
    cardReady: (..._extraArguments: unknown[]) => roomPageContext.askCardDeskRef.current !== null && roomPageContext.AskCardFaceRef.current !== null,
    arm: (simulated?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
      return contentWindow && !roomPageContext.navigatedRef.current ? roomPageContext.frameMessengerRef.current.send(contentWindow, {
        type: `claude-writing-arm`,
        simulated: simulated
      }) : `none`;
    },
    changed: (..._extraArguments: unknown[]): undefined => {
      if (!roomPageContext.goneRef.current) {
        roomPageContext.elementRef73.current = null;
        (0, roomPageContext.bumpAskModuleTick)((roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomDocumentPage + 1);
      }
    },
    gone: (..._extraArguments: unknown[]): Dynamic => roomPageContext.goneRef.current
  };
}
export function runRoomPage35Alive(roomPageContext: {
  askCardDeskRef: Dynamic;
  elementRef12: Dynamic;
  inlineAskHostRef: Dynamic;
}): Dynamic {
  return {
    ["alive"]: (..._extraArguments: unknown[]): Dynamic => hasAskCardRecoveryContent({
      card: (roomPageContext.inlineAskHostRef.current?.current() ?? null) !== null,
      sending: roomPageContext.inlineAskHostRef.current?.isSending() === true,
      inHand: (roomPageContext.askCardDeskRef.current?.inHand() ?? null) !== null,
      run: roomPageContext.elementRef12.current?.live() === true,
      kept: roomPageContext.askCardDeskRef.current?.keeps() === true
    })
  }["alive"];
}
export function runRoomPage36FlipAskCardRecovery2(roomPageContext: {
  alive: Dynamic;
  initialAskCardRecoveryStateRef: Dynamic;
  record: Dynamic;
  record2: Dynamic;
}): Dynamic {
  return {
    ["flipAskCardRecovery2"]: (..._extraArguments: unknown[]) => flipAskCardRecovery(roomPageContext.initialAskCardRecoveryStateRef.current, isCommentSessionFeatureDisabled(), {
      record: roomPageContext.record,
      closes: resolveDocumentCommandsCurrent,
      changed: roomPageContext.record2.changed,
      says: resolveCommentSessionHost4,
      alive: roomPageContext.alive
    })
  }["flipAskCardRecovery2"];
}
export function runRoomPage37BumpAskModuleTick2(roomPageContext: {
  askInputDirtyRef: Dynamic;
  askPromptMountedRef: Dynamic;
  bumpAskModuleTick: Dynamic;
  flipAskCardRecovery2: Dynamic;
  record: Dynamic;
  record2: Dynamic;
  wants: Dynamic;
}): Dynamic {
  return {
    ["bumpAskModuleTick2"]: (..._extraArguments: unknown[]): Dynamic => {
      (0, roomPageContext.flipAskCardRecovery2)();
      let documentCommandsClaudeWriting: Dynamic = resolveDocumentCommandsClaudeWriting(roomPageContext.record, roomPageContext.record2);
      roomPageContext.askPromptMountedRef.current = true;
      if (roomPageContext.askInputDirtyRef.current || (0, roomPageContext.wants)()) {
        (0, roomPageContext.bumpAskModuleTick)((roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomDocumentPage + 1);
      }
      roomPageContext.askInputDirtyRef.current = false;
      return documentCommandsClaudeWriting;
    }
  }["bumpAskModuleTick2"];
}
export function runRoomPage38Effect(roomPageContext: {}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {
    updatePlatformAnnouncementsTimers(document, {
      timers: {
        set: (roomDocumentPage?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => setTimeout(roomDocumentPage, options),
        clear: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]) => clearTimeout(roomDocumentPage)
      }
    });
  }, []);
}
export function runRoomPage39Effect(roomPageContext: {
  elementRef6: Dynamic;
  enabledRef7: Dynamic;
  iframeRef: Dynamic;
  primeAuthoritySettledRef: Dynamic;
  responseRef: Dynamic;
  roomRef: Dynamic;
}): Dynamic {
  return (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    let writable: Dynamic = (..._extraArguments: unknown[]) => resolveFrameGesturesRoom({
      readOnly: roomPageContext.enabledRef7.current,
      room: !!roomPageContext.roomRef.current,
      verdict: roomPageContext.responseRef.current.verdict,
      settled: roomPageContext.primeAuthoritySettledRef.current
    });
    let frameGesturesKeyboard2: Dynamic = resolveFrameGesturesKeyboard2((..._extraArguments: unknown[]) => resolveFrameGesturesHasFocus({
      hasFocus: document.hasFocus(),
      activeElement: document.activeElement,
      iframe: roomPageContext.iframeRef.current
    }), writable);
    roomPageContext.elementRef6.current = frameGesturesKeyboard2;
    let updateFrameGesturesVisibilityState2: Dynamic = updateFrameGesturesVisibilityState({
      doc: document,
      swappedIn: isPlatformFrameAndCapabilitiesWindow,
      writable: writable,
      say: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]) => resolvePlatformAnnouncementsValue(document, roomDocumentPage, {
        key: `doc-updated`
      }),
      timers: {
        set: (roomDocumentPage?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => setTimeout(roomDocumentPage, options),
        clear: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]) => clearTimeout(roomDocumentPage)
      },
      now: (..._extraArguments: unknown[]) => Date.now(),
      sinceActivity: resolvePlatformKeyboardAndSaveStatusValue3
    });
    return (..._extraArguments: unknown[]): undefined => {
      updateFrameGesturesVisibilityState2();
      frameGesturesKeyboard2.dispose();
      if (roomPageContext.elementRef6.current === frameGesturesKeyboard2) {
        roomPageContext.elementRef6.current = null;
      }
    };
  }, []);
}
