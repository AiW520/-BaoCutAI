/** BaoCut: observability browser and operation events from app-core-BE6n4d7F.js. */
import type { Dynamic } from "./types";
import {
  Namespace,
  React,
  helloPImport,
  inFrame,
  originalElementProps,
  preloadTImport,
} from "./platform-core-dependencies";
import {
  collectObservabilityTelemetryValue,
  resolveObservabilityTelemetryIsFinite,
  resolveObservabilityTelemetryOrdinal,
  resolveObservabilityTelemetryOrdinal2,
} from "./platform-core-observability-telemetry-1";
import {
  emitTelemetryEvent,
} from "./platform-core-observability-telemetry-3";
import {
  clearPlatformFeatureFlagsDelete,
} from "./platform-core-platform-feature-flags";
import {
  lazyZod,
} from "./platform-core-data-lazy-zod";
import {
  dataContentAndReferencesKindSchema,
  resolveDataContentAndReferencesError2,
} from "./platform-core-data-content-and-references";
import {
  installPlatformSessionAndSourcesReason,
  isPlatformSessionAndSourcesState,
  resolvePlatformSessionAndSourcesHost,
} from "./platform-core-platform-session-and-sources-1";
import {
  installEditorExtensionsHost,
} from "./platform-core-editor-extensions-4";
import {
  clearEditorExtensionsBottomInset,
  clearEditorExtensionsWAe,
  clearEditorExtensionsWords,
  isEditorExtensionsNAe,
  updateEditorExtensionsActions,
} from "./platform-core-editor-extensions-5";
import {
  resolveEditorAnchorsAndMentionsPost,
} from "./platform-core-editor-anchors-and-mentions-2";
import {
  isPlatformFrameAndCapabilitiesWindow,
} from "./platform-core-platform-frame-and-capabilities";
import {
  isPlatformLoadingAndStatusJudged,
  resolvePlatformLoadingAndStatusCatch,
} from "./platform-core-platform-loading-and-status";
import {
  resolvePlatformChunkLoadingEnv,
} from "./platform-core-platform-chunk-loading";
import {
  resolveExportMcpConnectorsRefused,
} from "./platform-core-export-mcp-connectors";
import {
  createPagesHotSwapEvent,
  createPagesSwapTabKeysEvent,
} from "./platform-core-observability-browser-and-operation-events-1";
import {
  isObservabilityBrowserAndOperationEventsJe,
  resolveObservabilityBrowserAndOperationEventsTitle,
  resolveObservabilityBrowserAndOperationEventsTitle2,
} from "./platform-core-observability-browser-and-operation-events-2";
import {
  ObservabilityBrowserAndOperationEventsState6,
  frameBootContainer,
  frameHelloFromEntry,
  resolveObservabilityBrowserAndOperationEventsHost,
  resolveObservabilityBrowserAndOperationEventsValue33,
  resolveObservabilityBrowserAndOperationEventsWarn,
} from "./platform-core-observability-browser-and-operation-events-3";

var observabilityBrowserAndOperationEventsValue_14: Dynamic;

var observabilityBrowserAndOperationEventsValue02: number;

var frameViewerDirty: (frameViewerDirty2?: Dynamic, ..._extraArguments: unknown[]) => undefined;

var frameViewerDirtyNow: Dynamic;

var ObservabilityBrowserAndOperationEventsState12: Dynamic;

var frameViewerSaveWord: Dynamic;

var frameViewerSaveLive: Dynamic;

var frameViewerPortAwaited: Dynamic;

var resolveObservabilityBrowserAndOperationEventsSaved: Dynamic;

var resolveObservabilityBrowserAndOperationEventsSaved2: (..._extraArguments: unknown[]) => "doc" | "port";

var observabilityBrowserAndOperationEventsSet37: Dynamic;

var frameViewerStaged: Dynamic;

var ObservabilityBrowserAndOperationEventsState13: Dynamic;

var resolveObservabilityBrowserAndOperationEventsRead2: Dynamic;

var frameViewerRev: Dynamic;

var frameViewerEdit: Dynamic;

var observabilityBrowserAndOperationEventsValue03: number;

var ObservabilityBrowserAndOperationEventsState14: Dynamic;

var ObservabilityBrowserAndOperationEventsState15: Dynamic;

var frameHotTouched: Dynamic;

var observabilityBrowserAndOperationEventsValues: Dynamic;

var ObservabilityBrowserAndOperationEventsState16: Dynamic;

function frameHotFrom(..._extraArguments: unknown[]): Dynamic {
  if (ObservabilityBrowserAndOperationEventsState16 === null)
    return observabilityBrowserAndOperationEventsValues === null
      ? `boot`
      : null;
  try {
    return ObservabilityBrowserAndOperationEventsState16() ?? `boot`;
  } catch {
    return null;
  }
}

var frameHotActivity: (..._extraArguments: unknown[]) => undefined;

var HOT_EARLY_MAX_MS: number;

var observabilityBrowserAndOperationEventsValue_15: boolean;

var ObservabilityBrowserAndOperationEventsState17: Dynamic;

var ObservabilityBrowserAndOperationEventsState18: Dynamic;

var observabilityBrowserAndOperationEventsValue04: number;

var ObservabilityBrowserAndOperationEventsPagesHotLeftAs: string;

var isObservabilityBrowserAndOperationEventsDeadline: (observabilityBrowserAndOperationEventsDeadline?: Dynamic, ..._extraArguments: unknown[]) => boolean;

var resolveObservabilityBrowserAndOperationEventsHardReload: (observabilityBrowserAndOperationEventsHardReload?: Dynamic, ..._extraArguments: unknown[]) => number;

var resolveObservabilityBrowserAndOperationEventsValue38: Dynamic;

function resolveObservabilityBrowserAndOperationEventsNote(
  post?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  try {
    if (ObservabilityBrowserAndOperationEventsState14 !== null)
      return ObservabilityBrowserAndOperationEventsState14.accept(post);
  } catch {}
  let enabled = !isObservabilityBrowserAndOperationEventsDeadline(post);
  if (enabled)
    try {
      if (typeof post.defer == `function`) {
        post.defer();
      }
    } catch {}
  try {
    if (!enabled) {
      ObservabilityBrowserAndOperationEventsState17 = null;
      try {
        sessionStorage.removeItem(
          ObservabilityBrowserAndOperationEventsPagesHotLeftAs,
        );
      } catch {}
      return post.restart({
        note: `docs.deadline`,
      });
    }
    let now = Date.now();
    let required: Dynamic =
      ObservabilityBrowserAndOperationEventsState17?.required;
    ObservabilityBrowserAndOperationEventsState17 = {
      since: ObservabilityBrowserAndOperationEventsState17?.since ?? now,
      at: now,
      ...(resolveObservabilityBrowserAndOperationEventsHardReload(required) >
        0 && {
        required: required,
      }),
    };
    try {
      ObservabilityBrowserAndOperationEventsState17 = {
        ...ObservabilityBrowserAndOperationEventsState17,
        ver: post.to?.ver,
      };
    } catch {}
    ObservabilityBrowserAndOperationEventsState17 = {
      ...ObservabilityBrowserAndOperationEventsState17,
      required: resolveObservabilityBrowserAndOperationEventsValue38(
        required,
        post.required,
      ),
    };
  } catch {}
  return enabled ? `deferred` : undefined;
}

function frameHotProvide(
  frameHotProvide2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (ObservabilityBrowserAndOperationEventsState14 === null) {
    observabilityBrowserAndOperationEventsValues?.push([
      frameHotProvide2,
      options,
    ]);
  } else {
    ObservabilityBrowserAndOperationEventsState14.provide(
      frameHotProvide2,
      options,
    );
  }
}

function installFrameHot(
  installFrameHot2: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
    preloadTImport(
      (..._extraArguments: unknown[]): Dynamic => import("./shell-hot"),
      [],
      import.meta.url,
    ),
  options: Dynamic = {},
  context: Dynamic = (
    installFrameHot3?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let setTimeout2: Dynamic = setTimeout(installFrameHot3, options2);
    return (..._extraArguments: unknown[]): Dynamic =>
      clearTimeout(setTimeout2);
  },
  ..._extraArguments: unknown[]
): undefined {
  let installFrameHotResult: Dynamic =
    ++observabilityBrowserAndOperationEventsValue04;
  try {
    let hot2: Dynamic =
      inFrame() && typeof window !== "undefined"
        ? (window as Dynamic).claude?.hot
        : undefined;
    if (typeof hot2 != `object` || !hot2) {
      observabilityBrowserAndOperationEventsValues = null;
      return;
    }
    let hot3: Dynamic = hot2;
    observabilityBrowserAndOperationEventsValue_15 =
      typeof hot3.accept == `function` &&
      typeof hot3.snapshot == `function` &&
      typeof hot3.restart == `function`;
    try {
      if (observabilityBrowserAndOperationEventsValue_15) {
        hot3.accept.call(
          hot2,
          resolveObservabilityBrowserAndOperationEventsNote,
        );
      }
      ObservabilityBrowserAndOperationEventsState18?.();
      ObservabilityBrowserAndOperationEventsState18 =
        observabilityBrowserAndOperationEventsValue_15
          ? context(
              (..._extraArguments: unknown[]): Dynamic =>
                resolveObservabilityBrowserAndOperationEventsValue39(
                  installFrameHotResult,
                  false,
                ),
              HOT_EARLY_MAX_MS,
            )
          : null;
    } catch {
      observabilityBrowserAndOperationEventsValue_15 = false;
    }
    resolvePlatformChunkLoadingEnv(installFrameHot2, options)()
      .then((result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        if (
          installFrameHotResult !==
            observabilityBrowserAndOperationEventsValue04 ||
          !result.isShellHotHost(hot2)
        )
          return;
        ObservabilityBrowserAndOperationEventsState16 = (
          ..._extraArguments: unknown[]
        ): Dynamic => result.hotFromWordOf(hot2.from);
        let watchPresence: Dynamic = result.watchPresence(
          document,
          (..._extraArguments: unknown[]): Dynamic => Date.now(),
        );
        ObservabilityBrowserAndOperationEventsState15 = watchPresence;
        clearPlatformFeatureFlagsDelete(
          (
            installFrameHot3?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (installFrameHot3 === `press`) {
              watchPresence.touch();
            }
          },
        );
        if ((document as Dynamic).visibilityState !== `hidden`) {
          watchPresence.touch();
        }
        ObservabilityBrowserAndOperationEventsState14 = result.installShellHot(
          hot2,
          {
            page: (..._extraArguments: unknown[]): Dynamic =>
              frameBootContainer()?.id,
            now: (..._extraArguments: unknown[]): Dynamic => Date.now(),
            schedule: (
              installFrameHot3?: Dynamic,
              options2?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => {
              let setTimeout2: Dynamic = setTimeout(installFrameHot3, options2);
              return (..._extraArguments: unknown[]): Dynamic =>
                clearTimeout(setTimeout2);
            },
            visible: (..._extraArguments: unknown[]) =>
              (document as Dynamic).visibilityState !== `hidden`,
            online: (..._extraArguments: unknown[]) =>
              (navigator as Dynamic).onLine !== false,
            afterPaint: (
              installFrameHot3?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined =>
              void requestAnimationFrame(
                (..._extraArguments: unknown[]): Dynamic =>
                  requestAnimationFrame(installFrameHot3),
              ),
            docActivityAt: (..._extraArguments: unknown[]): Dynamic =>
              observabilityBrowserAndOperationEventsValue02,
            composerActivityAt: (..._extraArguments: unknown[]): Dynamic =>
              observabilityBrowserAndOperationEventsValue03,
            focused: (..._extraArguments: unknown[]): Dynamic =>
              typeof (document as Dynamic).hasFocus != `function` ||
              (document as Dynamic).hasFocus(),
            presenceAt: watchPresence.at,
            store: (..._extraArguments: unknown[]): Dynamic =>
              typeof sessionStorage == `object` && sessionStorage !== null
                ? sessionStorage
                : undefined,
            saveTerm: resolveObservabilityBrowserAndOperationEventsSaved,
            say: (
              installFrameHot3?: Dynamic,
              options2?: Dynamic,
              context2?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              let pagesHotSwapEvent: Dynamic = createPagesHotSwapEvent(
                installFrameHot3,
                resolveObservabilityTelemetryOrdinal(
                  resolveObservabilityTelemetryOrdinal2(),
                ),
                options2,
                context2,
              );
              if (pagesHotSwapEvent !== null) {
                emitTelemetryEvent(pagesHotSwapEvent);
              }
              if (installFrameHot3 === `swapped`) {
                resolveObservabilityBrowserAndOperationEventsTake();
              }
            },
            early: (..._extraArguments: unknown[]): Dynamic =>
              ObservabilityBrowserAndOperationEventsState17,
          },
        );
        (document as Dynamic).addEventListener(
          `visibilitychange`,
          (..._extraArguments: unknown[]): undefined => {
            if ((document as Dynamic).visibilityState !== `hidden`) {
              observabilityBrowserAndOperationEventsValue02 = Date.now();
              watchPresence.touch();
            }
          },
        );
        let record2: Dynamic = {
          collect: (..._extraArguments: unknown[]) => null,
          restore: (..._extraArguments: unknown[]): undefined => {},
          carriedUnsaved: (..._extraArguments: unknown[]) => false,
          hold: (..._extraArguments: unknown[]) =>
            resolveObservabilityBrowserAndOperationEventsSaved() !== `saved`,
        };
        ObservabilityBrowserAndOperationEventsState14.provide(`doc`, {
          ...record2,
          hold: (..._extraArguments: unknown[]): Dynamic =>
            ObservabilityBrowserAndOperationEventsState12.awaiting() ||
            record2.hold(),
          why: resolveObservabilityBrowserAndOperationEventsSaved2,
        });
        ObservabilityBrowserAndOperationEventsState14.provide(`staged`, {
          collect: (..._extraArguments: unknown[]) => null,
          restore: (..._extraArguments: unknown[]): undefined => {},
          carriedUnsaved: (..._extraArguments: unknown[]) => false,
          hold: (
            installFrameHot3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            resolveObservabilityBrowserAndOperationEventsRead2(
              installFrameHot3 ?? `ordinary`,
            ),
          why: (..._extraArguments: unknown[]): Dynamic =>
            ObservabilityBrowserAndOperationEventsState13,
        });
        for (let [
          installFrameHotResult2,
          installFrameHotResult3,
        ] of (observabilityBrowserAndOperationEventsValues ?? []) as Dynamic)
          ObservabilityBrowserAndOperationEventsState14.provide(
            installFrameHotResult2,
            installFrameHotResult3,
          );
      })
      .catch((..._extraArguments: unknown[]): undefined => {})
      .finally((..._extraArguments: unknown[]): undefined => {
        if (
          installFrameHotResult ===
          observabilityBrowserAndOperationEventsValue04
        ) {
          resolveObservabilityBrowserAndOperationEventsValue39(
            installFrameHotResult,
            true,
          );
          observabilityBrowserAndOperationEventsValues = null;
        }
      });
  } catch {
    resolveObservabilityBrowserAndOperationEventsValue39(
      installFrameHotResult,
      true,
    );
    observabilityBrowserAndOperationEventsValues = null;
  }
}

function resolveObservabilityBrowserAndOperationEventsTake(
  ..._extraArguments: unknown[]
): undefined {
  let take: Dynamic = ObservabilityBrowserAndOperationEventsState6.take(
    isPlatformFrameAndCapabilitiesWindow,
  );
  let pagesSwapTabKeysEvent =
    take === null ? null : createPagesSwapTabKeysEvent(take.m, take.t);
  if (pagesSwapTabKeysEvent !== null) {
    emitTelemetryEvent(pagesSwapTabKeysEvent);
  }
}

function resolveObservabilityBrowserAndOperationEventsValue39(
  observabilityBrowserAndOperationEventsValue39?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (
    observabilityBrowserAndOperationEventsValue39 ===
    observabilityBrowserAndOperationEventsValue04
  ) {
    ObservabilityBrowserAndOperationEventsState18?.();
    ObservabilityBrowserAndOperationEventsState18 = null;
    observabilityBrowserAndOperationEventsValue_15 = false;
    if (options) {
      ObservabilityBrowserAndOperationEventsState17 = null;
    }
  }
}

var frameAskClaude: Dynamic;

var observabilityBrowserAndOperationEventsState5: Dynamic;

var observabilityBrowserAndOperationEventsState6: Dynamic;

function installFrameHostChromeWitness(
  ..._extraArguments: unknown[]
): undefined {
  if (observabilityBrowserAndOperationEventsState5 !== undefined) return;
  let helloPImport2: Dynamic = inFrame() ? helloPImport() : null;
  observabilityBrowserAndOperationEventsState5 =
    isEditorExtensionsNAe(helloPImport2);
  observabilityBrowserAndOperationEventsState6 =
    clearEditorExtensionsWords(helloPImport2);
  observabilityBrowserAndOperationEventsState5.hello();
}

var frameHostChromeWitnessed: Dynamic;

var subscribeFrameHostChromeWitness: Dynamic;

var frameHostWords: Dynamic;

var subscribeFrameHostWords: Dynamic;

var hostSays: Dynamic;

var observabilityBrowserAndOperationEventsState7: Dynamic;

function installFrameHostViewport(..._extraArguments: unknown[]): undefined {
  if (observabilityBrowserAndOperationEventsState7 === undefined) {
    observabilityBrowserAndOperationEventsState7 =
      clearEditorExtensionsBottomInset(inFrame() ? helloPImport() : null, {
        ceiling: (..._extraArguments: unknown[]) =>
          typeof window === "undefined" ? 0 : window.innerHeight,
      });
    forwardHostViewport(observabilityBrowserAndOperationEventsState7);
  }
}

function forwardHostViewport(
  forwardHostViewport2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return forwardHostViewport2.subscribe((..._extraArguments: unknown[]) =>
    resolveObservabilityTelemetryIsFinite(forwardHostViewport2.bottomInset()),
  );
}

var observabilityBrowserAndOperationEventsState8: Dynamic;

function installFrameClaudeActivity(..._extraArguments: unknown[]): undefined {
  observabilityBrowserAndOperationEventsState8 ??= clearEditorExtensionsWAe(
    inFrame() ? helloPImport() : null,
  );
}

var frameClaudeWorking: Dynamic;

var subscribeFrameClaudeActivity: Dynamic;

var observabilityBrowserAndOperationEventsState9: Dynamic;

var resolveObservabilityBrowserAndOperationEventsClaude8: Dynamic;

var frameConversationPane: Dynamic;

var subscribeFrameConversationPane: Dynamic;

var askFrameConversationPane: (..._extraArguments: unknown[]) => undefined;

var observabilityBrowserAndOperationEventsState10: Dynamic;

var resolveObservabilityBrowserAndOperationEventsSchedule: Dynamic;

var frameHostChrome: Dynamic;

var observabilityBrowserAndOperationEventsState11: Dynamic;

var frameMentioned: Dynamic;

var frameHostChromeActions: Dynamic;

var frameHostAction: Dynamic;

var frameHostChromeExports: Dynamic;

var frameHostExport: Dynamic;

var frameDeclineExport: Dynamic;

var frameHostChromeDestinations: Dynamic;

var observabilityBrowserAndOperationEventsState12: Dynamic;

var resolveObservabilityBrowserAndOperationEventsHost2: Dynamic;

var frameCurrentAnchor: (frameCurrentAnchor2?: Dynamic, ..._extraArguments: unknown[]) => undefined;

var ObservabilityBrowserAndOperationEventsPagesTitleProposeV1: string;

var ObservabilityBrowserAndOperationEventsGet: Dynamic;

var observabilityBrowserAndOperationEventsState13: Dynamic;

var resolveObservabilityBrowserAndOperationEventsSchedule2: Dynamic;

var frameTitlePropose: (frameTitlePropose2?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => undefined;

var frameTitleFromContent: (frameTitle?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => undefined;

var observabilityBrowserAndOperationEventsSet38: Dynamic;

var observabilityBrowserAndOperationEventsValue_16: boolean;

function onFrameGotoAnchor(
  onFrameGotoAnchor2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return inFrame()
    ? (observabilityBrowserAndOperationEventsValue_16 ||
        ((observabilityBrowserAndOperationEventsValue_16 = true),
        installEditorExtensionsHost(
          {
            host: helloPImport(),
            log: resolveObservabilityBrowserAndOperationEventsWarn,
          },
          (
            onFrameGotoAnchor3?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            let observabilityBrowserAndOperationEventsSet382: Dynamic =
              Array.from<Dynamic>(observabilityBrowserAndOperationEventsSet38);
            for (let onFrameGotoAnchorResult of observabilityBrowserAndOperationEventsSet382 as Dynamic)
              onFrameGotoAnchorResult(onFrameGotoAnchor3);
          },
        )),
      observabilityBrowserAndOperationEventsSet38.add(onFrameGotoAnchor2),
      (..._extraArguments: unknown[]): undefined =>
        void observabilityBrowserAndOperationEventsSet38.delete(
          onFrameGotoAnchor2,
        ))
    : (..._extraArguments: unknown[]): undefined => {};
}

var frameOpenExternal: Dynamic;

var observabilityBrowserAndOperationEventsValue_17: boolean;

function installFrameFetchTripwire(..._extraArguments: unknown[]): undefined {
  if (
    observabilityBrowserAndOperationEventsValue_17 ||
    !inFrame() ||
    typeof window === "undefined"
  )
    return;
  observabilityBrowserAndOperationEventsValue_17 = true;
  let fetch2: Dynamic = window.fetch;
  window.fetch = function (
    this: Dynamic,
    installFrameFetchTripwire2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    try {
      let installFrameFetchTripwire3: Dynamic =
        typeof installFrameFetchTripwire2 == `string`
          ? installFrameFetchTripwire2
          : installFrameFetchTripwire2 instanceof (URL as Dynamic)
            ? installFrameFetchTripwire2.href
            : installFrameFetchTripwire2.url;
      let url: Dynamic = new (URL as Dynamic)(
        installFrameFetchTripwire3,
        location.href,
      );
      if (url.origin === location.origin && /(^|\/)api\//.test(url.pathname)) {
        let toUpperCase: Dynamic = (
          options?.method ??
          (installFrameFetchTripwire2 instanceof (Request as Dynamic)
            ? installFrameFetchTripwire2.method
            : `GET`)
        ).toUpperCase();
        (console as Dynamic).error(
          `[frameShell] ambient bongo fetch in Frame mode (gate it): ${toUpperCase} ${url.pathname}`,
        );
      }
    } catch {}
    return fetch2.call(this, installFrameFetchTripwire2, options);
  };
}

var ObservabilityBrowserAndOperationEventsBytes: Dynamic;

var ObservabilityBrowserAndOperationEventsTarget: Dynamic;

var ObservabilityBrowserAndOperationEventsRunAs: Dynamic;

var ObservabilityBrowserAndOperationEventsVersion: Dynamic;

var ObservabilityBrowserAndOperationEventsSql: Dynamic;

var ObservabilityBrowserAndOperationEventsFiles: Dynamic;

var ObservabilityBrowserAndOperationEventsError: Dynamic;

var ObservabilityBrowserAndOperationEventsUnion: Dynamic;

var ObservabilityBrowserAndOperationEventsLevel: Dynamic;

var ObservabilityBrowserAndOperationEventsPass: Dynamic;

var ObservabilityBrowserAndOperationEventsDefault: Dynamic;

var ObservabilityBrowserAndOperationEventsQuietAfterDays: Dynamic;

var ObservabilityBrowserAndOperationEventsDisplayName: Dynamic;

var ObservabilityBrowserAndOperationEventsRole: Dynamic;

var ObservabilityBrowserAndOperationEventsText: Dynamic;

var ObservabilityBrowserAndOperationEventsMessages: Dynamic;

var ObservabilityBrowserAndOperationEventsFull: Dynamic;

function isObservabilityBrowserAndOperationEventsRelatedTarget(
  event?: Dynamic,
  ..._extraArguments: unknown[]
) {
  try {
    let relatedTarget: Dynamic = event.relatedTarget;
    return (
      !(relatedTarget instanceof Node) ||
      !event.currentTarget.contains(relatedTarget)
    );
  } catch {
    return true;
  }
}

var ObservabilityBrowserAndOperationEventsThen: Dynamic;

var observabilityBrowserAndOperationEventsState14: Dynamic;

var observabilityBrowserAndOperationEventsState15: Dynamic;

function resolveObservabilityBrowserAndOperationEventsThen(
  ..._extraArguments: unknown[]
): Dynamic {
  return observabilityBrowserAndOperationEventsState14 === undefined
    ? ((observabilityBrowserAndOperationEventsState15 ??=
        ObservabilityBrowserAndOperationEventsThen().then(
          (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
            (observabilityBrowserAndOperationEventsState14 = result),
            result
          ),
          (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            throw (
              (observabilityBrowserAndOperationEventsState15 = undefined),
              result
            );
          },
        )),
      observabilityBrowserAndOperationEventsState15)
    : Promise.resolve(observabilityBrowserAndOperationEventsState14);
}

function resolveObservabilityBrowserAndOperationEventsCatch(
  ..._extraArguments: unknown[]
): undefined {
  resolveObservabilityBrowserAndOperationEventsThen().catch(
    (..._extraArguments: unknown[]): undefined => {},
  );
}

var filterObservabilityBrowserAndOperationEventsFilter: Dynamic;

function resolveObservabilityBrowserAndOperationEventsFromEvent(
  observabilityBrowserAndOperationEvents?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (observabilityBrowserAndOperationEventsState14 !== undefined) {
    let observabilityBrowserAndOperationEventsDataTransfer: Dynamic =
      resolveObservabilityBrowserAndOperationEventsDataTransfer(
        observabilityBrowserAndOperationEvents,
      );
    return resolveObservabilityBrowserAndOperationEventsThen2(
      observabilityBrowserAndOperationEventsState14.fromEvent(
        observabilityBrowserAndOperationEvents,
      ),
      observabilityBrowserAndOperationEventsDataTransfer,
    );
  }
  let observabilityBrowserAndOperationEventsEvent: Dynamic =
    resolveObservabilityBrowserAndOperationEventsEvent(
      observabilityBrowserAndOperationEvents,
    );
  return resolveObservabilityBrowserAndOperationEventsThen().then(
    (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      resolveObservabilityBrowserAndOperationEventsThen2(
        result.fromEvent(observabilityBrowserAndOperationEventsEvent.event),
        observabilityBrowserAndOperationEventsEvent.flat,
      ),
    (..._extraArguments: unknown[]): Dynamic =>
      observabilityBrowserAndOperationEventsEvent.flat,
  );
}

function resolveObservabilityBrowserAndOperationEventsThen2(
  observabilityBrowserAndOperationEventsThen2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return observabilityBrowserAndOperationEventsThen2.then(
    filterObservabilityBrowserAndOperationEventsFilter,
    (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
      console.warn(
        `[filedrop] fromEvent:`,
        resolveDataContentAndReferencesError2(result),
      ),
      options
    ),
  );
}

function resolveObservabilityBrowserAndOperationEventsDataTransfer(
  event?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dataTransfer: Dynamic =
    `dataTransfer` in event ? event.dataTransfer : null;
  if (dataTransfer) return Array.from<Dynamic>(dataTransfer.files);
  let files: Dynamic = event.target?.files;
  return files ? Array.from<Dynamic>(files) : [];
}

function resolveObservabilityBrowserAndOperationEventsEvent(
  observabilityBrowserAndOperationEventsEvent?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let files: Dynamic =
    resolveObservabilityBrowserAndOperationEventsDataTransfer(
      observabilityBrowserAndOperationEventsEvent,
    );
  let dataTransfer: Dynamic =
    `dataTransfer` in observabilityBrowserAndOperationEventsEvent
      ? observabilityBrowserAndOperationEventsEvent.dataTransfer
      : null;
  if (!dataTransfer)
    return {
      event: {
        type: observabilityBrowserAndOperationEventsEvent.type,
        target: {
          files: files,
        },
      },
      flat: files,
    };
  let items: Dynamic = Array.from<Dynamic, Dynamic>(
    dataTransfer.items,
    (entry?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      let webkitGetAsEntry: Dynamic =
        entry.kind === `file` ? entry.webkitGetAsEntry() : null;
      let asFile: Dynamic = entry.kind === `file` ? entry.getAsFile() : null;
      return {
        kind: entry.kind,
        type: entry.type,
        webkitGetAsEntry: (..._extraArguments: unknown[]): Dynamic =>
          webkitGetAsEntry,
        getAsFile: (..._extraArguments: unknown[]): Dynamic => asFile,
      };
    },
  );
  return {
    event: {
      type: observabilityBrowserAndOperationEventsEvent.type,
      dataTransfer: {
        items: items,
        files: files,
        types: [...dataTransfer.types],
      },
    },
    flat: files,
  };
}

function resolveObservabilityBrowserAndOperationEventsKeys(
  pattern?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (pattern instanceof RegExp)
    return {
      keys: false,
      pattern: pattern,
    };
  var resolveObservabilityBrowserAndOperationEventsKeysResult: Dynamic;
  var resolveObservabilityBrowserAndOperationEventsKeysResult2: Dynamic;
  var items: Dynamic;
  var resolveObservabilityBrowserAndOperationEventsKeysResult3: Dynamic;
  var keys: Dynamic = [];
  var label: Dynamic = ``;
  var patternParts: Dynamic = pattern.split(`/`);
  for (
    patternParts[0] || patternParts.shift();
    (items = patternParts.shift());

  ) {
    resolveObservabilityBrowserAndOperationEventsKeysResult = items[0];
    if (resolveObservabilityBrowserAndOperationEventsKeysResult === `*`) {
      keys.push(resolveObservabilityBrowserAndOperationEventsKeysResult);
      label += items[1] === `?` ? `(?:/(.*))?` : `/(.*)`;
    } else {
      if (resolveObservabilityBrowserAndOperationEventsKeysResult === `:`) {
        resolveObservabilityBrowserAndOperationEventsKeysResult2 =
          items.indexOf(`?`, 1);
        resolveObservabilityBrowserAndOperationEventsKeysResult3 =
          items.indexOf(`.`, 1);
        keys.push(
          items.substring(
            1,
            ~resolveObservabilityBrowserAndOperationEventsKeysResult2
              ? resolveObservabilityBrowserAndOperationEventsKeysResult2
              : ~resolveObservabilityBrowserAndOperationEventsKeysResult3
                ? resolveObservabilityBrowserAndOperationEventsKeysResult3
                : items.length,
          ),
        );
        label +=
          ~resolveObservabilityBrowserAndOperationEventsKeysResult2 &&
          !~resolveObservabilityBrowserAndOperationEventsKeysResult3
            ? `(?:/([^/]+?))?`
            : `/([^/]+?)`;
        if (~resolveObservabilityBrowserAndOperationEventsKeysResult3) {
          label +=
            (~resolveObservabilityBrowserAndOperationEventsKeysResult2
              ? `?`
              : ``) +
            `\\` +
            items.substring(
              resolveObservabilityBrowserAndOperationEventsKeysResult3,
            );
        }
      } else {
        label += `/` + items;
      }
    }
  }
  return {
    keys: keys,
    pattern: RegExp(`^` + label + (options ? `(?=$|/)` : `/?$`), `i`),
  };
}

var ObservabilityBrowserAndOperationEventsUseInsertionEffect: Dynamic;

var ObservabilityBrowserAndOperationEventsUseLayoutEffect: Dynamic;

var ObservabilityBrowserAndOperationEventsState19: Dynamic;

var useObservabilityBrowserAndOperationEventsCurrent: Dynamic;

var ObservabilityBrowserAndOperationEventsPopstate: string;

var ObservabilityBrowserAndOperationEventsPushState: string;

var ObservabilityBrowserAndOperationEventsReplaceState: string;

var ObservabilityBrowserAndOperationEventsHashchange: string[];

var installObservabilityBrowserAndOperationEventsValue: Dynamic;

var useObservabilityBrowserAndOperationEventsUseSyncExternalStore2: Dynamic;

var resolveObservabilityBrowserAndOperationEventsSearch: Dynamic;

var resolveObservabilityBrowserAndOperationEventsSsrSearch: Dynamic;

var resolveObservabilityBrowserAndOperationEventsPathname: Dynamic;

var resolveObservabilityBrowserAndOperationEventsSsrPath: Dynamic;

var resolveObservabilityBrowserAndOperationEventsReplace3: Dynamic;

var resolveObservabilityBrowserAndOperationEventsValue43: Dynamic;

var ObservabilityBrowserAndOperationEventsState20: Dynamic;

var resolveObservabilityBrowserAndOperationEventsIndexOf: Dynamic;

var resolveObservabilityBrowserAndOperationEventsValue44: Dynamic;

var resolveObservabilityBrowserAndOperationEventsSlice2: Dynamic;

var resolveObservabilityBrowserAndOperationEventsValue45: Dynamic;

var resolveObservabilityBrowserAndOperationEventsSlice3: Dynamic;

var resolveObservabilityBrowserAndOperationEventsValue46: Dynamic;

var resolveObservabilityBrowserAndOperationEventsValue47: Dynamic;

var ObservabilityBrowserAndOperationEventsHook: Dynamic;

var ObservabilityBrowserAndOperationEventsCreateContext: Dynamic;

var resolveObservabilityBrowserAndOperationEventsUseContext: Dynamic;

var ObservabilityBrowserAndOperationEventsState21: Dynamic;

var ObservabilityBrowserAndOperationEventsCreateContext2: Dynamic;

var resolveObservabilityBrowserAndOperationEventsUseContext2: Dynamic;

var resolveObservabilityBrowserAndOperationEventsHook: Dynamic;

var resolveObservabilityBrowserAndOperationEventsValue48: Dynamic;

var resolveObservabilityBrowserAndOperationEventsSearchHook: Dynamic;

var collectObservabilityBrowserAndOperationEventsPattern: Dynamic;

var resolveObservabilityBrowserAndOperationEventsParser: Dynamic;

var UseObservabilityBrowserAndOperationEventsValueComponent: Dynamic;

var resolveObservabilityBrowserAndOperationEventsComponent: Dynamic;

var useObservabilityBrowserAndOperationEventsCurrent2: Dynamic;

var resolveObservabilityBrowserAndOperationEventsPath: Dynamic;

var ObservabilityBrowserAndOperationEventsHref: Dynamic;

var resolveObservabilityBrowserAndOperationEventsFlatMap2: Dynamic;

var resolveObservabilityBrowserAndOperationEventsLocation: Dynamic;

var resolvePlatformApiAndAuthHref: (platformApiAndAuthHref?: Dynamic, ..._extraArguments: unknown[]) => null;

var PlatformApiAndAuthBONGOBASE: Dynamic;

var PlatformApiAndAuthBONGOWSBASE: Dynamic;

var PlatformApiAndAuthBONGOAPIBASE: Dynamic;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeObservabilityBrowserAndOperationEvents4Step1(): void {
  (observabilityBrowserAndOperationEventsValue_14 = false);
  (observabilityBrowserAndOperationEventsValue02 = 0);
  (frameViewerDirty = (
    frameViewerDirty2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    observabilityBrowserAndOperationEventsValue_14 = frameViewerDirty2;
    if (frameViewerDirty2) {
      observabilityBrowserAndOperationEventsValue02 = Date.now();
    }
    resolveObservabilityBrowserAndOperationEventsHost()?.setDirty(
      frameViewerDirty2,
    );
  });
  (frameViewerDirtyNow = (..._extraArguments: unknown[]): Dynamic =>
    observabilityBrowserAndOperationEventsValue_14);
  (ObservabilityBrowserAndOperationEventsState12 = isPlatformLoadingAndStatusJudged((..._extraArguments: unknown[]) =>
      Date.now(),
    ));
  (frameViewerSaveWord = (
    frameViewerSaveWord2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    ObservabilityBrowserAndOperationEventsState12.judged(
      frameViewerSaveWord2,
      options,
    ));
  (frameViewerSaveLive = (
    frameViewerSaveLive2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    ObservabilityBrowserAndOperationEventsState12.live(frameViewerSaveLive2));
  (frameViewerPortAwaited = (
    ..._extraArguments: unknown[]
  ): Dynamic => ObservabilityBrowserAndOperationEventsState12.awaited());
  (resolveObservabilityBrowserAndOperationEventsSaved = (
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let term: Dynamic = ObservabilityBrowserAndOperationEventsState12.term();
    return term === `saved` && observabilityBrowserAndOperationEventsValue_14
      ? `pending`
      : term;
  });
  (resolveObservabilityBrowserAndOperationEventsSaved2 = (
    ..._extraArguments: unknown[]
  ) =>
    ObservabilityBrowserAndOperationEventsState12.awaiting() &&
    !observabilityBrowserAndOperationEventsValue_14 &&
    ObservabilityBrowserAndOperationEventsState12.glance() === `saved`
      ? `port`
      : `doc`);
  (observabilityBrowserAndOperationEventsSet37 = new (Set as Dynamic)());
  (frameViewerStaged = (
    read?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let record2: Dynamic = {
      read: read,
    };
    observabilityBrowserAndOperationEventsSet37.add(record2);
    return (..._extraArguments: unknown[]): undefined =>
      void observabilityBrowserAndOperationEventsSet37.delete(record2);
  });
  (ObservabilityBrowserAndOperationEventsState13 = null);
  (resolveObservabilityBrowserAndOperationEventsRead2 = (
    observabilityBrowserAndOperationEventsRead2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    ObservabilityBrowserAndOperationEventsState13 = null;
    let enabled = false;
    let resolveObservabilityBrowserAndOperationEventsRead2Result: Dynamic = null;
    for (let {
      read: resolveObservabilityBrowserAndOperationEventsRead2Result2,
    } of observabilityBrowserAndOperationEventsSet37 as Dynamic) {
      if (
        resolveObservabilityBrowserAndOperationEventsRead2Result2(
          observabilityBrowserAndOperationEventsRead2,
        ) !== true
      )
        continue;
      enabled = true;
      let resolveObservabilityBrowserAndOperationEventsRead2Result3: Dynamic =
        null;
      try {
        resolveObservabilityBrowserAndOperationEventsRead2Result3 =
          resolveObservabilityBrowserAndOperationEventsRead2Result2.held?.();
      } catch {}
      if (
        resolveObservabilityBrowserAndOperationEventsRead2Result3 === `staged` ||
        (resolveObservabilityBrowserAndOperationEventsRead2Result3 === `viewer` &&
          resolveObservabilityBrowserAndOperationEventsRead2Result === null)
      ) {
        resolveObservabilityBrowserAndOperationEventsRead2Result =
          resolveObservabilityBrowserAndOperationEventsRead2Result3;
      }
    }
    ObservabilityBrowserAndOperationEventsState13 =
      resolveObservabilityBrowserAndOperationEventsRead2Result;
    return enabled;
  });
  (frameViewerRev = (
    frameViewerRev2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveObservabilityBrowserAndOperationEventsHost()?.setRev(
      frameViewerRev2,
      options,
    ));
  (frameViewerEdit = (..._extraArguments: unknown[]): Dynamic =>
    resolveObservabilityBrowserAndOperationEventsHost()?.noteEdit());
  (observabilityBrowserAndOperationEventsValue03 = 0);
  (ObservabilityBrowserAndOperationEventsState14 = null);
  (ObservabilityBrowserAndOperationEventsState15 = null);
  (frameHotTouched = (..._extraArguments: unknown[]): Dynamic =>
    ObservabilityBrowserAndOperationEventsState15?.touch());
  (observabilityBrowserAndOperationEventsValues = []);
  (ObservabilityBrowserAndOperationEventsState16 = null);
  (frameHotActivity = (..._extraArguments: unknown[]): undefined => {
    observabilityBrowserAndOperationEventsValue03 = Date.now();
  });
  (HOT_EARLY_MAX_MS = 6e4);
  (observabilityBrowserAndOperationEventsValue_15 = false);
  (ObservabilityBrowserAndOperationEventsState17 = null);
  (ObservabilityBrowserAndOperationEventsState18 = null);
  (observabilityBrowserAndOperationEventsValue04 = 0);
  (ObservabilityBrowserAndOperationEventsPagesHotLeftAs = `pages.hot.leftAs`);
  (isObservabilityBrowserAndOperationEventsDeadline = (
    observabilityBrowserAndOperationEventsDeadline?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    try {
      return (
        observabilityBrowserAndOperationEventsDeadline.deadline?.now === true
      );
    } catch {
      return false;
    }
  });
  (resolveObservabilityBrowserAndOperationEventsHardReload = (
    observabilityBrowserAndOperationEventsHardReload?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    observabilityBrowserAndOperationEventsHardReload === `hard-reload`
      ? 2
      : +(observabilityBrowserAndOperationEventsHardReload === `hot-restart`));
  (resolveObservabilityBrowserAndOperationEventsValue38 = (
    observabilityBrowserAndOperationEventsValue38?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveObservabilityBrowserAndOperationEventsHardReload(options) >=
    resolveObservabilityBrowserAndOperationEventsHardReload(
      observabilityBrowserAndOperationEventsValue38,
    )
      ? options
      : observabilityBrowserAndOperationEventsValue38);
  (frameAskClaude = (
    frameAskClaude2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    installPlatformSessionAndSourcesReason(helloPImport(), frameAskClaude2, {
      schedule: (
        frameAskClaude3?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let setTimeout2 = setTimeout(frameAskClaude3, options);
        return (..._extraArguments: unknown[]) => clearTimeout(setTimeout2);
      },
      random: (..._extraArguments: unknown[]) => Math.random(),
    }));
  (frameHostChromeWitnessed = (
    ..._extraArguments: unknown[]
  ): Dynamic => observabilityBrowserAndOperationEventsState5?.seen() ?? false);
  (subscribeFrameHostChromeWitness = (
    frameHostChromeWitness?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    observabilityBrowserAndOperationEventsState5?.subscribe(
      frameHostChromeWitness,
    ) ?? ((..._extraArguments: unknown[]): undefined => {}));
  (frameHostWords = (..._extraArguments: unknown[]): Dynamic =>
    observabilityBrowserAndOperationEventsState6?.words() ?? null);
  (subscribeFrameHostWords = (
    frameHostWords2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    observabilityBrowserAndOperationEventsState6?.subscribe(frameHostWords2) ??
    ((..._extraArguments: unknown[]): undefined => {}));
  (hostSays = (
    hostSays2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    observabilityBrowserAndOperationEventsState6?.says(hostSays2) ?? false);
  (frameClaudeWorking = (..._extraArguments: unknown[]): Dynamic =>
    observabilityBrowserAndOperationEventsState8?.working() ?? null);
  (subscribeFrameClaudeActivity = (
    frameClaudeActivity?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    observabilityBrowserAndOperationEventsState8?.subscribe(
      frameClaudeActivity,
    ) ?? ((..._extraArguments: unknown[]): undefined => {}));
  (resolveObservabilityBrowserAndOperationEventsClaude8 = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    (observabilityBrowserAndOperationEventsState9 ??=
      isPlatformSessionAndSourcesState(
        (..._extraArguments: unknown[]): Dynamic =>
          inFrame() && typeof window !== "undefined"
            ? ((window as Dynamic).claude ?? null)
            : null,
        (
          observabilityBrowserAndOperationEventsClaude8?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => {
          let setTimeout2 = setTimeout(
            observabilityBrowserAndOperationEventsClaude8,
            options,
          );
          return (..._extraArguments: unknown[]) => clearTimeout(setTimeout2);
        },
      )));
  (frameConversationPane = (..._extraArguments: unknown[]): Dynamic =>
    resolveObservabilityBrowserAndOperationEventsClaude8().state());
  (subscribeFrameConversationPane = (
    frameConversationPane2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveObservabilityBrowserAndOperationEventsClaude8().subscribe(
      frameConversationPane2,
    ));
  (askFrameConversationPane = (..._extraArguments: unknown[]): undefined =>
    void resolveObservabilityBrowserAndOperationEventsClaude8().ask());
  (resolveObservabilityBrowserAndOperationEventsSchedule = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    (observabilityBrowserAndOperationEventsState10 ??=
      updateEditorExtensionsActions(inFrame() ? helloPImport() : null, {
        schedule: (
          observabilityBrowserAndOperationEventsSchedule?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => {
          let setTimeout2 = setTimeout(
            observabilityBrowserAndOperationEventsSchedule,
            options,
          );
          return (..._extraArguments: unknown[]) => clearTimeout(setTimeout2);
        },
        now: (..._extraArguments: unknown[]) => Date.now(),
      })));
  (frameHostChrome = (
    frameHostChrome2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveObservabilityBrowserAndOperationEventsSchedule().set(frameHostChrome2));
  (frameMentioned = (
    frameMentioned2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    (observabilityBrowserAndOperationEventsState11 ??=
      resolveEditorAnchorsAndMentionsPost(
        inFrame() ? helloPImport() : null,
      )).post(frameMentioned2, options));
  (frameHostChromeActions = (
    frameHostChromeActions2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveObservabilityBrowserAndOperationEventsSchedule().setActions(
      frameHostChromeActions2,
    ));
  (frameHostAction = (
    frameHostAction2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveObservabilityBrowserAndOperationEventsSchedule().onAction(
      frameHostAction2,
      options,
    ));
  (frameHostChromeExports = (
    frameHostChromeExports2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveObservabilityBrowserAndOperationEventsSchedule().setExports(
      frameHostChromeExports2,
    ));
  (frameHostExport = (
    frameHostExport2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveObservabilityBrowserAndOperationEventsSchedule().onExport(
      frameHostExport2,
      options,
    ));
  (frameDeclineExport = (
    frameDeclineExport2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveObservabilityBrowserAndOperationEventsSchedule().declineExport(
      frameDeclineExport2,
      options,
    ));
  (frameHostChromeDestinations = (
    frameHostChromeDestinations2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveObservabilityBrowserAndOperationEventsSchedule().setDestinations(
      frameHostChromeDestinations2,
    ));
  (resolveObservabilityBrowserAndOperationEventsHost2 = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    (observabilityBrowserAndOperationEventsState12 ??=
      resolvePlatformSessionAndSourcesHost({
        host: inFrame() ? helloPImport() : null,
        schedule: (
          observabilityBrowserAndOperationEventsHost2?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => {
          let setTimeout2 = setTimeout(
            observabilityBrowserAndOperationEventsHost2,
            options,
          );
          return (..._extraArguments: unknown[]) => clearTimeout(setTimeout2);
        },
        log: resolveObservabilityBrowserAndOperationEventsWarn,
      })));
  (frameCurrentAnchor = (
    frameCurrentAnchor2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (inFrame()) {
      resolveObservabilityBrowserAndOperationEventsHost2().emit(
        frameCurrentAnchor2,
      );
    }
  });
  (ObservabilityBrowserAndOperationEventsPagesTitleProposeV1 = `pages.titlePropose.v1:`);
  (ObservabilityBrowserAndOperationEventsGet = {
    get: (
      observabilityBrowserAndOperationEventsGet?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (globalThis as Dynamic).localStorage.getItem(
        ObservabilityBrowserAndOperationEventsPagesTitleProposeV1 +
          observabilityBrowserAndOperationEventsGet,
      ),
    set: (
      observabilityBrowserAndOperationEventsGet?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (globalThis as Dynamic).localStorage.setItem(
        ObservabilityBrowserAndOperationEventsPagesTitleProposeV1 +
          observabilityBrowserAndOperationEventsGet,
        options,
      ),
  });
  (resolveObservabilityBrowserAndOperationEventsSchedule2 = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    (observabilityBrowserAndOperationEventsState13 ??=
      isObservabilityBrowserAndOperationEventsJe(
        inFrame() ? helloPImport() : null,
        {
          schedule: (
            observabilityBrowserAndOperationEventsSchedule2?: Dynamic,
            options?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let setTimeout2 = setTimeout(
              observabilityBrowserAndOperationEventsSchedule2,
              options,
            );
            return (..._extraArguments: unknown[]) => clearTimeout(setTimeout2);
          },
          now: (..._extraArguments: unknown[]) => Date.now(),
          log: resolveObservabilityBrowserAndOperationEventsValue33,
          store: ObservabilityBrowserAndOperationEventsGet,
        },
      )));
  (frameTitlePropose = (
    frameTitlePropose2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let observabilityBrowserAndOperationEventsTitle: Dynamic =
      resolveObservabilityBrowserAndOperationEventsTitle({
        ...options,
        inFrame: inFrame(),
      });
    if (observabilityBrowserAndOperationEventsTitle !== null) {
      resolveObservabilityBrowserAndOperationEventsSchedule2().propose(
        frameTitlePropose2,
        observabilityBrowserAndOperationEventsTitle,
      );
    }
  });
  (frameTitleFromContent = (
    frameTitle?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let observabilityBrowserAndOperationEventsTitle2: Dynamic =
      resolveObservabilityBrowserAndOperationEventsTitle2({
        ...options,
        inFrame: inFrame(),
      });
    if (
      !(
        observabilityBrowserAndOperationEventsTitle2 === null ||
        resolveObservabilityBrowserAndOperationEventsSchedule2().proposeFromContent(
          frameTitle,
          observabilityBrowserAndOperationEventsTitle2,
        ) !== `sent`
      )
    ) {
      emitTelemetryEvent({
        name: `pages.title.from_content`,
        fields: {
          component: `first_heading`,
        },
      });
    }
  });
  (observabilityBrowserAndOperationEventsSet38 = new (Set as Dynamic)());
  (observabilityBrowserAndOperationEventsValue_16 = false);
  (frameOpenExternal = (
    frameOpenExternal2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    resolveExportMcpConnectorsRefused(
      inFrame() && typeof document !== "undefined" ? document : null,
      frameOpenExternal2,
    ));
  (observabilityBrowserAndOperationEventsValue_17 = false);
  frameHelloFromEntry();
  (ObservabilityBrowserAndOperationEventsBytes = lazyZod.object({
    name: lazyZod.string(),
    bytes: lazyZod.number(),
    hash: lazyZod.string(),
  }));
  (ObservabilityBrowserAndOperationEventsTarget = lazyZod.object({
    type: lazyZod.enum([`project`, `adhoc`]),
    id: lazyZod.string(),
    target: lazyZod.string(),
    path: lazyZod.string(),
  }));
  (ObservabilityBrowserAndOperationEventsRunAs = lazyZod.object({
    type: lazyZod.enum([`manual`, `agent`, `cron`]),
    by: lazyZod.string(),
    runAs: lazyZod.string().optional(),
    viewer: lazyZod.string().optional(),
    sessionId: lazyZod.string().nullish(),
    _debug: lazyZod.string().optional(),
  }));
  lazyZod
    .object({
      type: lazyZod.enum([`manual`, `agent`]).optional(),
      by: lazyZod.string().optional(),
      sessionId: lazyZod.string().nullish(),
    })
    .strict();
  (ObservabilityBrowserAndOperationEventsVersion = lazyZod.object({
    version: lazyZod.string().optional(),
    workflows: lazyZod.array(
      lazyZod.object({
        name: lazyZod.string(),
        runId: lazyZod.string(),
        ok: lazyZod.boolean(),
        error: lazyZod.string().optional(),
      }),
    ),
    sha0: lazyZod.string(),
    published: lazyZod.boolean(),
  }));
  (ObservabilityBrowserAndOperationEventsSql = lazyZod
    .object({
      sql: lazyZod.string().optional(),
      confidence: lazyZod.enum([`high`, `medium`, `low`]).nullable().optional(),
      governed: lazyZod.boolean().optional(),
      governedProjects: lazyZod.array(lazyZod.string()).optional(),
    })
    .passthrough());
  (ObservabilityBrowserAndOperationEventsFiles = lazyZod
    .object({
      files: lazyZod.array(ObservabilityBrowserAndOperationEventsBytes).catch([]),
      exports: lazyZod.array(lazyZod.string()).optional().catch(undefined),
      summary: lazyZod.string().optional(),
      refresh: ObservabilityBrowserAndOperationEventsVersion.optional(),
      changed: lazyZod.array(lazyZod.string()).optional().catch([]),
      governance:
        ObservabilityBrowserAndOperationEventsSql.optional().catch(undefined),
      inlineValue: lazyZod.unknown().optional(),
      staged: lazyZod.array(lazyZod.string()).optional().catch(undefined),
    })
    .passthrough());
  (ObservabilityBrowserAndOperationEventsError = lazyZod
    .object({
      error: lazyZod.string(),
      files: lazyZod
        .array(ObservabilityBrowserAndOperationEventsBytes)
        .optional()
        .catch([]),
      code: lazyZod.string().optional(),
      slug: lazyZod.string().optional(),
      stack: lazyZod.string().optional(),
      refresh: ObservabilityBrowserAndOperationEventsVersion.optional(),
    })
    .passthrough());
  (ObservabilityBrowserAndOperationEventsUnion = lazyZod.union([
    ObservabilityBrowserAndOperationEventsError,
    ObservabilityBrowserAndOperationEventsFiles,
  ]));
  lazyZod.object({
    id: lazyZod.string(),
    source: ObservabilityBrowserAndOperationEventsTarget,
    runner: lazyZod.object({
      type: lazyZod.enum([
        `integration`,
        `mcp`,
        `refresh`,
        `agent`,
        `dispatcher`,
        `chat`,
        `preview`,
        `fork`,
        `widget-build`,
      ]),
      name: lazyZod.string(),
      hash: lazyZod.string(),
    }),
    timing: lazyZod.object({
      startedAt: lazyZod.string(),
      endedAt: lazyZod.string(),
      durationMs: lazyZod.number(),
    }),
    status: lazyZod.enum([`running`, `ok`, `error`, `cancelled`]),
    trigger: ObservabilityBrowserAndOperationEventsRunAs,
    configuration: lazyZod.record(lazyZod.string(), lazyZod.unknown()),
    result: ObservabilityBrowserAndOperationEventsUnion,
    rootActionId: lazyZod.string().optional(),
    adopted: lazyZod.literal(true).optional(),
    adapter: dataContentAndReferencesKindSchema.optional(),
  });
  lazyZod
    .object({
      files: lazyZod.array(lazyZod.string()).catch([]),
      summary: lazyZod.string().optional(),
      status: lazyZod.enum([`ok`, `error`]).optional(),
    })
    .passthrough();
  (ObservabilityBrowserAndOperationEventsLevel = lazyZod.object({
    ts: lazyZod.number(),
    level: lazyZod.enum([`log`, `warn`, `error`]),
    line: lazyZod.string(),
  }));
  (ObservabilityBrowserAndOperationEventsPass = lazyZod.object({
    id: lazyZod.string(),
    pass: lazyZod.boolean(),
    verdict: lazyZod.string().optional(),
    reasoning: lazyZod.string().optional(),
    kind: lazyZod.string().optional(),
    expected: lazyZod.string().optional(),
    actual: lazyZod.string().optional(),
  }));
  lazyZod.object({
    startedAt: lazyZod.number(),
    endedAt: lazyZod.number(),
    comments: lazyZod.array(
      lazyZod.object({
        ts: lazyZod.number(),
        text: lazyZod.string(),
      }),
    ),
    userEmail: lazyZod.string(),
    env: lazyZod.enum([`dev`, `prod`]).optional(),
    description: lazyZod.string().optional(),
    pathname: lazyZod.string().optional(),
    console: lazyZod
      .array(ObservabilityBrowserAndOperationEventsLevel)
      .optional(),
    slackTs: lazyZod.string().nullish(),
    source: lazyZod.enum([`user`, `eval`]).optional(),
    spec: lazyZod.string().optional(),
    suite: lazyZod.string().optional(),
    pass: lazyZod.boolean().optional(),
    assertions: lazyZod
      .array(ObservabilityBrowserAndOperationEventsPass)
      .optional(),
    trigger: lazyZod.string().optional(),
    sha: lazyZod.string().optional(),
    runDir: lazyZod.string().optional(),
    hasVideo: lazyZod.boolean().optional(),
    screenshotSha: lazyZod.string().optional(),
  });
  (ObservabilityBrowserAndOperationEventsDefault = lazyZod.object({
    id: lazyZod.string(),
    name: lazyZod.string(),
    default: lazyZod.boolean().optional(),
  }));
  (ObservabilityBrowserAndOperationEventsQuietAfterDays = lazyZod
    .object({
      tz: lazyZod.string().optional(),
      quiet_after_days: lazyZod.number().optional(),
      digest_style: lazyZod.string().optional(),
      chatFilter: lazyZod.enum([`all`, `project`, `copy`]).optional(),
      filterToProject: lazyZod.boolean().optional(),
      model: lazyZod.string().optional(),
      webSearch: lazyZod.boolean().optional(),
      connectorTools: lazyZod.boolean().optional(),
      flags: lazyZod.record(lazyZod.string(), lazyZod.boolean()).optional(),
      spellWords: lazyZod.array(lazyZod.string().max(100)).max(500).optional(),
      notifySlack: lazyZod
        .object({
          onAddedToProject: lazyZod.boolean().optional(),
          onMention: lazyZod.boolean().optional(),
          onCommentReply: lazyZod.boolean().optional(),
          sendAsMe: lazyZod.boolean().optional(),
          sendAsMePromptDismissed: lazyZod.boolean().optional(),
        })
        .optional(),
    })
    .passthrough());
  (ObservabilityBrowserAndOperationEventsDisplayName = lazyZod
    .object({
      id: lazyZod.string(),
      name: lazyZod.string(),
      displayName: lazyZod.string(),
      createdBy: lazyZod.string().optional(),
      owner: lazyZod.string().optional(),
      state: lazyZod.enum([
        `private`,
        `unlisted`,
        `shared-view`,
        `shared`,
        `live`,
      ]),
      color: lazyZod.string(),
      meta: lazyZod.string(),
      updated: lazyZod.string(),
      files: lazyZod.array(lazyZod.string()),
      thumb: lazyZod
        .object({
          path: lazyZod.string(),
          sha: lazyZod.string(),
        })
        .optional(),
      fileCount: lazyZod.number(),
      versions: lazyZod.array(lazyZod.string()),
      dirty: lazyZod.number(),
      dev: lazyZod.boolean().optional(),
    })
    .passthrough());
  (ObservabilityBrowserAndOperationEventsRole = lazyZod
    .object({
      ts: lazyZod.number(),
      role: lazyZod.enum([`user`, `assistant`, `system`, `a2a`]),
      text: lazyZod.string(),
      kind: lazyZod.string().optional(),
      id: lazyZod.string().optional(),
      op: lazyZod.string().optional(),
      args: lazyZod.record(lazyZod.string(), lazyZod.unknown()).optional(),
      sessionId: lazyZod.string().optional(),
      deleted: lazyZod.boolean().optional(),
    })
    .passthrough());
  (ObservabilityBrowserAndOperationEventsText = lazyZod
    .object({
      text: lazyZod.string(),
      ts: lazyZod.number(),
      run_id: lazyZod.string().optional(),
      last_proactive_ts: lazyZod.number().optional(),
    })
    .passthrough());
  (ObservabilityBrowserAndOperationEventsMessages = lazyZod.object({
    messages: lazyZod.array(ObservabilityBrowserAndOperationEventsRole),
    status: ObservabilityBrowserAndOperationEventsText,
    statuses: lazyZod
      .record(lazyZod.string(), ObservabilityBrowserAndOperationEventsText)
      .optional(),
    running: lazyZod.boolean(),
  }));
  (ObservabilityBrowserAndOperationEventsFull = ObservabilityBrowserAndOperationEventsMessages.extend({
      full: lazyZod.boolean(),
      hasOlder: lazyZod.boolean().optional(),
      oldestTs: lazyZod.number().optional(),
      rev: lazyZod.string().optional(),
      instance: lazyZod.string().optional(),
      evicted: lazyZod.boolean().optional(),
      minClientVersion: lazyZod.number().optional(),
    }));
  (ObservabilityBrowserAndOperationEventsThen = resolvePlatformLoadingAndStatusCatch(
      (..._extraArguments: unknown[]): Dynamic =>
        preloadTImport(
          (..._extraArguments: unknown[]): Dynamic =>
            import("./file-selector").then(
              (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                result.t,
            ),
          collectObservabilityTelemetryValue([3, 1]),
          import.meta.url,
        ),
    ));
  (filterObservabilityBrowserAndOperationEventsFilter = (
    filterObservabilityBrowserAndOperationEventsFilter2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    filterObservabilityBrowserAndOperationEventsFilter2.filter(
      (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
        rolldownNImport2 instanceof File,
    ));
  (ObservabilityBrowserAndOperationEventsUseInsertionEffect = React.useInsertionEffect);
  (ObservabilityBrowserAndOperationEventsUseLayoutEffect = typeof window !== "undefined" &&
    window.document !== undefined &&
    window.document.createElement !== undefined
      ? React.useLayoutEffect
      : React.useEffect);
  (ObservabilityBrowserAndOperationEventsState19 = ObservabilityBrowserAndOperationEventsUseInsertionEffect ||
    ObservabilityBrowserAndOperationEventsUseLayoutEffect);
  (useObservabilityBrowserAndOperationEventsCurrent = (
    observabilityBrowserAndOperationEventsCurrent?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let items: Dynamic = React.useRef([
      observabilityBrowserAndOperationEventsCurrent,
      (...observabilityBrowserAndOperationEventsCurrent2: Dynamic[]): Dynamic =>
        (items[0] as Dynamic)(...observabilityBrowserAndOperationEventsCurrent2),
    ]).current;
    ObservabilityBrowserAndOperationEventsState19(
      (..._extraArguments: unknown[]): undefined => {
        items[0] = observabilityBrowserAndOperationEventsCurrent;
      },
    );
    return items[1];
  });
  (ObservabilityBrowserAndOperationEventsPopstate = `popstate`);
  (ObservabilityBrowserAndOperationEventsPushState = `pushState`);
  (ObservabilityBrowserAndOperationEventsReplaceState = `replaceState`);
  (ObservabilityBrowserAndOperationEventsHashchange = [
    ObservabilityBrowserAndOperationEventsPopstate,
    ObservabilityBrowserAndOperationEventsPushState,
    ObservabilityBrowserAndOperationEventsReplaceState,
    `hashchange`,
  ]);
  (installObservabilityBrowserAndOperationEventsValue = (
    installObservabilityBrowserAndOperationEventsValue2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    for (let installObservabilityBrowserAndOperationEventsValueResult of ObservabilityBrowserAndOperationEventsHashchange as Dynamic)
      addEventListener(
        installObservabilityBrowserAndOperationEventsValueResult,
        installObservabilityBrowserAndOperationEventsValue2,
      );
    return (..._extraArguments: unknown[]): undefined => {
      for (let installObservabilityBrowserAndOperationEventsValueResult of ObservabilityBrowserAndOperationEventsHashchange as Dynamic)
        removeEventListener(
          installObservabilityBrowserAndOperationEventsValueResult,
          installObservabilityBrowserAndOperationEventsValue2,
        );
    };
  });
  (useObservabilityBrowserAndOperationEventsUseSyncExternalStore2 = (
    observabilityBrowserAndOperationEventsUseSyncExternalStore2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    (0, Namespace.useSyncExternalStore)(
      installObservabilityBrowserAndOperationEventsValue,
      observabilityBrowserAndOperationEventsUseSyncExternalStore2,
      options,
    ));
  (resolveObservabilityBrowserAndOperationEventsSearch = (
    ..._extraArguments: unknown[]
  ) => location.search);
  (resolveObservabilityBrowserAndOperationEventsSsrSearch = (
    { ssrSearch: observabilityBrowserAndOperationEventsSsrSearch }: Dynamic = {},
    ..._extraArguments: unknown[]
  ): Dynamic =>
    useObservabilityBrowserAndOperationEventsUseSyncExternalStore2(
      resolveObservabilityBrowserAndOperationEventsSearch,
      observabilityBrowserAndOperationEventsSsrSearch == null
        ? resolveObservabilityBrowserAndOperationEventsSearch
        : (..._extraArguments: unknown[]): Dynamic =>
            observabilityBrowserAndOperationEventsSsrSearch,
    ));
  (resolveObservabilityBrowserAndOperationEventsPathname = (
    ..._extraArguments: unknown[]
  ) => location.pathname);
  (resolveObservabilityBrowserAndOperationEventsSsrPath = (
    { ssrPath: observabilityBrowserAndOperationEventsSsrPath }: Dynamic = {},
    ..._extraArguments: unknown[]
  ): Dynamic =>
    useObservabilityBrowserAndOperationEventsUseSyncExternalStore2(
      resolveObservabilityBrowserAndOperationEventsPathname,
      observabilityBrowserAndOperationEventsSsrPath == null
        ? resolveObservabilityBrowserAndOperationEventsPathname
        : (..._extraArguments: unknown[]): Dynamic =>
            observabilityBrowserAndOperationEventsSsrPath,
    ));
  (resolveObservabilityBrowserAndOperationEventsReplace3 = (
    observabilityBrowserAndOperationEventsReplace3?: Dynamic,
    { replace: options = false, state: options2 = null }: Dynamic = {},
    ..._extraArguments: unknown[]
  ): Dynamic =>
    (history as Dynamic)[
      options
        ? ObservabilityBrowserAndOperationEventsReplaceState
        : ObservabilityBrowserAndOperationEventsPushState
    ](options2, ``, observabilityBrowserAndOperationEventsReplace3));
  (resolveObservabilityBrowserAndOperationEventsValue43 = (
    observabilityBrowserAndOperationEventsValue43: Dynamic = {},
    ..._extraArguments: unknown[]
  ): Dynamic => [
    resolveObservabilityBrowserAndOperationEventsSsrPath(
      observabilityBrowserAndOperationEventsValue43,
    ),
    resolveObservabilityBrowserAndOperationEventsReplace3,
  ]);
  (ObservabilityBrowserAndOperationEventsState20 = Symbol.for(`wouter_v3`));
  if (
    typeof history !== "undefined" &&
    (window as Dynamic)[ObservabilityBrowserAndOperationEventsState20] ===
      undefined
  ) {
    for (let localResult of [
      ObservabilityBrowserAndOperationEventsPushState,
      ObservabilityBrowserAndOperationEventsReplaceState,
    ] as Dynamic) {
      let historyItem: Dynamic = (history as Dynamic)[localResult];
      (history as Dynamic)[localResult] = function (
        this: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic {
        let apply: Dynamic = historyItem.apply(this, arguments);
        let event: Dynamic = new (Event as Dynamic)(localResult);
        event.arguments = arguments;
        dispatchEvent(event);
        return apply;
      };
    }
    Object.defineProperty(window, ObservabilityBrowserAndOperationEventsState20, {
      value: true,
    });
  }
  (resolveObservabilityBrowserAndOperationEventsIndexOf = (
    items?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    options.toLowerCase().indexOf(items.toLowerCase())
      ? `~` + options
      : options.slice(items.length) || `/`);
  (resolveObservabilityBrowserAndOperationEventsValue44 = (
    observabilityBrowserAndOperationEventsValue44: Dynamic = ``,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    observabilityBrowserAndOperationEventsValue44 === `/`
      ? ``
      : observabilityBrowserAndOperationEventsValue44);
  (resolveObservabilityBrowserAndOperationEventsSlice2 = (
    observabilityBrowserAndOperationEventsSlice2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    observabilityBrowserAndOperationEventsSlice2[0] === `~`
      ? observabilityBrowserAndOperationEventsSlice2.slice(1)
      : resolveObservabilityBrowserAndOperationEventsValue44(options) +
        observabilityBrowserAndOperationEventsSlice2);
  (resolveObservabilityBrowserAndOperationEventsValue45 = (
    observabilityBrowserAndOperationEventsValue45: Dynamic = ``,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveObservabilityBrowserAndOperationEventsIndexOf(
      resolveObservabilityBrowserAndOperationEventsValue46(
        resolveObservabilityBrowserAndOperationEventsValue44(
          observabilityBrowserAndOperationEventsValue45,
        ),
      ),
      resolveObservabilityBrowserAndOperationEventsValue46(options),
    ));
  (resolveObservabilityBrowserAndOperationEventsSlice3 = (
    observabilityBrowserAndOperationEventsSlice3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    observabilityBrowserAndOperationEventsSlice3[0] === `?`
      ? observabilityBrowserAndOperationEventsSlice3.slice(1)
      : observabilityBrowserAndOperationEventsSlice3);
  (resolveObservabilityBrowserAndOperationEventsValue46 = (
    observabilityBrowserAndOperationEventsValue46?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    try {
      return decodeURI(observabilityBrowserAndOperationEventsValue46);
    } catch {
      return observabilityBrowserAndOperationEventsValue46;
    }
  });
  (resolveObservabilityBrowserAndOperationEventsValue47 = (
    observabilityBrowserAndOperationEventsValue47?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveObservabilityBrowserAndOperationEventsValue46(
      resolveObservabilityBrowserAndOperationEventsSlice3(
        observabilityBrowserAndOperationEventsValue47,
      ),
    ));
  (ObservabilityBrowserAndOperationEventsHook = {
    hook: resolveObservabilityBrowserAndOperationEventsValue43,
    searchHook: resolveObservabilityBrowserAndOperationEventsSsrSearch,
    parser: resolveObservabilityBrowserAndOperationEventsKeys,
    base: ``,
    ssrPath: undefined,
    ssrSearch: undefined,
    ssrContext: undefined,
    hrefs: (
      observabilityBrowserAndOperationEventsHook?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => observabilityBrowserAndOperationEventsHook,
    aroundNav: (
      observabilityBrowserAndOperationEventsHook?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => observabilityBrowserAndOperationEventsHook(options, context),
  });
  (ObservabilityBrowserAndOperationEventsCreateContext = (0,
  React.createContext)(ObservabilityBrowserAndOperationEventsHook));
  (resolveObservabilityBrowserAndOperationEventsUseContext = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    (0, React.useContext)(ObservabilityBrowserAndOperationEventsCreateContext));
  (ObservabilityBrowserAndOperationEventsState21 = {});
  (ObservabilityBrowserAndOperationEventsCreateContext2 = (0,
  React.createContext)(ObservabilityBrowserAndOperationEventsState21));
  (resolveObservabilityBrowserAndOperationEventsUseContext2 = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    (0, React.useContext)(ObservabilityBrowserAndOperationEventsCreateContext2));
  (resolveObservabilityBrowserAndOperationEventsHook = (
    observabilityBrowserAndOperationEventsHook?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let [hook, setHook]: Dynamic =
      observabilityBrowserAndOperationEventsHook.hook(
        observabilityBrowserAndOperationEventsHook,
      );
    return [
      resolveObservabilityBrowserAndOperationEventsValue45(
        observabilityBrowserAndOperationEventsHook.base,
        hook,
      ),
      useObservabilityBrowserAndOperationEventsCurrent(
        (
          observabilityBrowserAndOperationEventsHook2?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          observabilityBrowserAndOperationEventsHook.aroundNav(
            setHook,
            resolveObservabilityBrowserAndOperationEventsSlice2(
              observabilityBrowserAndOperationEventsHook2,
              observabilityBrowserAndOperationEventsHook.base,
            ),
            options,
          ),
      ),
    ];
  });
  (resolveObservabilityBrowserAndOperationEventsValue48 = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveObservabilityBrowserAndOperationEventsHook(
      resolveObservabilityBrowserAndOperationEventsUseContext(),
    ));
  (resolveObservabilityBrowserAndOperationEventsSearchHook = (
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let observabilityBrowserAndOperationEventsUseContext: Dynamic =
      resolveObservabilityBrowserAndOperationEventsUseContext();
    return resolveObservabilityBrowserAndOperationEventsValue47(
      observabilityBrowserAndOperationEventsUseContext.searchHook(
        observabilityBrowserAndOperationEventsUseContext,
      ),
    );
  });
  (collectObservabilityBrowserAndOperationEventsPattern = (
    collectObservabilityBrowserAndOperationEventsPattern2?: Dynamic,
    pattern?: Dynamic,
    context?: Dynamic,
    dependencies?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let { pattern: record2, keys: record3 }: Dynamic =
      pattern instanceof RegExp
        ? {
            keys: false,
            pattern: pattern,
          }
        : collectObservabilityBrowserAndOperationEventsPattern2(
            pattern || `*`,
            dependencies,
          );
    let match: Dynamic = record2.exec(context) || [];
    let [match2, ...setMatch]: Dynamic = match;
    return match2 === undefined
      ? [false, null]
      : [
          true,
          ((..._extraArguments: unknown[]): Dynamic => {
            let groups: Dynamic =
              record3 === false
                ? match.groups
                : Object.fromEntries(
                    record3.map(
                      (
                        record5?: Dynamic,
                        index?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): Dynamic => [record5, setMatch[index]],
                    ),
                  );
            let record4: Dynamic = {
              ...setMatch,
            };
            if (groups) {
              Object.assign(record4, groups);
            }
            return record4;
          })(),
          ...(dependencies ? [match2] : []),
        ];
  });
  (resolveObservabilityBrowserAndOperationEventsParser = (
    observabilityBrowserAndOperationEventsParser?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    collectObservabilityBrowserAndOperationEventsPattern(
      resolveObservabilityBrowserAndOperationEventsUseContext().parser,
      observabilityBrowserAndOperationEventsParser,
      resolveObservabilityBrowserAndOperationEventsValue48()[0],
    ));
  (UseObservabilityBrowserAndOperationEventsValueComponent = (
    {
      children: children,
      ...observabilityBrowserAndOperationEventsValue
    }: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let observabilityBrowserAndOperationEventsUseContext: Dynamic =
      resolveObservabilityBrowserAndOperationEventsUseContext();
    let ObservabilityBrowserAndOperationEventsHook2: Dynamic =
      observabilityBrowserAndOperationEventsValue.hook
        ? ObservabilityBrowserAndOperationEventsHook
        : observabilityBrowserAndOperationEventsUseContext;
    let ObservabilityBrowserAndOperationEventsHook3: Dynamic =
      ObservabilityBrowserAndOperationEventsHook2;
    let [
      ssrPathParts,
      setSsrPathParts = observabilityBrowserAndOperationEventsValue.ssrSearch ??
        ``,
    ]: Dynamic =
      observabilityBrowserAndOperationEventsValue.ssrPath?.split(`?`) ?? [];
    if (ssrPathParts) {
      observabilityBrowserAndOperationEventsValue.ssrSearch = setSsrPathParts;
      observabilityBrowserAndOperationEventsValue.ssrPath = ssrPathParts;
    }
    observabilityBrowserAndOperationEventsValue.hrefs =
      observabilityBrowserAndOperationEventsValue.hrefs ??
      observabilityBrowserAndOperationEventsValue.hook?.hrefs;
    observabilityBrowserAndOperationEventsValue.searchHook =
      observabilityBrowserAndOperationEventsValue.searchHook ??
      observabilityBrowserAndOperationEventsValue.hook?.searchHook;
    let recordRef: Dynamic = (0, React.useRef)({});
    let record2: Dynamic = recordRef.current;
    let record3: Dynamic = record2;
    for (let useObservabilityBrowserAndOperationEventsValueResult in ObservabilityBrowserAndOperationEventsHook2) {
      let total: Dynamic =
        useObservabilityBrowserAndOperationEventsValueResult === `base`
          ? ObservabilityBrowserAndOperationEventsHook2[
              useObservabilityBrowserAndOperationEventsValueResult
            ] +
            (observabilityBrowserAndOperationEventsValue[
              useObservabilityBrowserAndOperationEventsValueResult
            ] ?? ``)
          : (observabilityBrowserAndOperationEventsValue[
              useObservabilityBrowserAndOperationEventsValueResult
            ] ??
            ObservabilityBrowserAndOperationEventsHook2[
              useObservabilityBrowserAndOperationEventsValueResult
            ]);
      if (
        record2 === record3 &&
        total !== record3[useObservabilityBrowserAndOperationEventsValueResult]
      ) {
        recordRef.current = record3 = {
          ...record3,
        };
      }
      record3[useObservabilityBrowserAndOperationEventsValueResult] = total;
      if (
        total !==
          ObservabilityBrowserAndOperationEventsHook2[
            useObservabilityBrowserAndOperationEventsValueResult
          ] ||
        total !==
          ObservabilityBrowserAndOperationEventsHook3[
            useObservabilityBrowserAndOperationEventsValueResult
          ]
      ) {
        ObservabilityBrowserAndOperationEventsHook3 = record3;
      }
    }
    return (
      <ObservabilityBrowserAndOperationEventsCreateContext.Provider
        {...originalElementProps({
          value: ObservabilityBrowserAndOperationEventsHook3,
          children: children,
        })}
      />
    );
  });
  (resolveObservabilityBrowserAndOperationEventsComponent = (
    { children: children, component: ComponentComponent }: Dynamic,
    params?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    ComponentComponent ? (
      <ComponentComponent
        {...originalElementProps({
          params: params,
        })}
      />
    ) : typeof children == `function` ? (
      children(params)
    ) : (
      children
    ));
  (useObservabilityBrowserAndOperationEventsCurrent2 = (
    observabilityBrowserAndOperationEventsCurrent2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let ObservabilityBrowserAndOperationEventsState21Ref: Dynamic = (0,
    React.useRef)(ObservabilityBrowserAndOperationEventsState21);
    let ObservabilityBrowserAndOperationEventsState212: Dynamic =
      ObservabilityBrowserAndOperationEventsState21Ref.current;
    return (ObservabilityBrowserAndOperationEventsState21Ref.current =
      Object.keys(observabilityBrowserAndOperationEventsCurrent2).length !==
        Object.keys(ObservabilityBrowserAndOperationEventsState212).length ||
      Object.entries(observabilityBrowserAndOperationEventsCurrent2).some(
        (
          [rolldownNImportEntry, rolldownNImportEntryEntry]: Dynamic,
          ..._extraArguments: unknown[]
        ) =>
          rolldownNImportEntryEntry !==
          ObservabilityBrowserAndOperationEventsState212[rolldownNImportEntry],
      )
        ? observabilityBrowserAndOperationEventsCurrent2
        : ObservabilityBrowserAndOperationEventsState212);
  });
  (resolveObservabilityBrowserAndOperationEventsPath = (
    {
      path: path,
      nest: nest,
      match: match,
      ...observabilityBrowserAndOperationEventsPath
    }: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let observabilityBrowserAndOperationEventsUseContext: Dynamic =
      resolveObservabilityBrowserAndOperationEventsUseContext();
    let [observabilityBrowserAndOperationEventsHook]: Dynamic =
      resolveObservabilityBrowserAndOperationEventsHook(
        observabilityBrowserAndOperationEventsUseContext,
      );
    let [match2, setMatch, base]: Dynamic =
      match ??
      collectObservabilityBrowserAndOperationEventsPattern(
        observabilityBrowserAndOperationEventsUseContext.parser,
        path,
        observabilityBrowserAndOperationEventsHook,
        nest,
      );
    let useObservabilityBrowserAndOperationEventsCurrent22: Dynamic =
      useObservabilityBrowserAndOperationEventsCurrent2({
        ...resolveObservabilityBrowserAndOperationEventsUseContext2(),
        ...setMatch,
      });
    if (!match2) return null;
    let element: Dynamic = base ? (
      <UseObservabilityBrowserAndOperationEventsValueComponent
        {...originalElementProps(
          {
            base: base,
          },
          resolveObservabilityBrowserAndOperationEventsComponent(
            observabilityBrowserAndOperationEventsPath,
            useObservabilityBrowserAndOperationEventsCurrent22,
          ),
        )}
      />
    ) : (
      resolveObservabilityBrowserAndOperationEventsComponent(
        observabilityBrowserAndOperationEventsPath,
        useObservabilityBrowserAndOperationEventsCurrent22,
      )
    );
    return (
      <ObservabilityBrowserAndOperationEventsCreateContext2.Provider
        {...originalElementProps({
          value: useObservabilityBrowserAndOperationEventsCurrent22,
          children: element,
        })}
      />
    );
  });
  (ObservabilityBrowserAndOperationEventsHref = (0, React.forwardRef)(
    (
      observabilityBrowserAndOperationEventsHref?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let observabilityBrowserAndOperationEventsUseContext: Dynamic =
        resolveObservabilityBrowserAndOperationEventsUseContext();
      let [
        observabilityBrowserAndOperationEventsHook,
        setObservabilityBrowserAndOperationEventsHook,
      ]: Dynamic = resolveObservabilityBrowserAndOperationEventsHook(
        observabilityBrowserAndOperationEventsUseContext,
      );
      let {
        to: observabilityBrowserAndOperationEventsHref10 = ``,
        href: observabilityBrowserAndOperationEventsHref11 = observabilityBrowserAndOperationEventsHref10,
        onClick: observabilityBrowserAndOperationEventsHref2,
        asChild: observabilityBrowserAndOperationEventsHref3,
        children: observabilityBrowserAndOperationEventsHref4,
        className: observabilityBrowserAndOperationEventsHref5,
        replace: observabilityBrowserAndOperationEventsHref6,
        state: observabilityBrowserAndOperationEventsHref7,
        transition: observabilityBrowserAndOperationEventsHref8,
        ...observabilityBrowserAndOperationEventsHref9
      }: Dynamic = observabilityBrowserAndOperationEventsHref;
      let onClick: Dynamic = useObservabilityBrowserAndOperationEventsCurrent(
        (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (
            !(
              event.ctrlKey ||
              event.metaKey ||
              event.altKey ||
              event.shiftKey ||
              event.button !== 0
            )
          ) {
            observabilityBrowserAndOperationEventsHref2?.(event);
            if (!event.defaultPrevented) {
              event.preventDefault();
              setObservabilityBrowserAndOperationEventsHook(
                observabilityBrowserAndOperationEventsHref11,
                observabilityBrowserAndOperationEventsHref,
              );
            }
          }
        },
      );
      let href: Dynamic = observabilityBrowserAndOperationEventsUseContext.hrefs(
        observabilityBrowserAndOperationEventsHref11[0] === `~`
          ? observabilityBrowserAndOperationEventsHref11.slice(1)
          : observabilityBrowserAndOperationEventsUseContext.base +
              observabilityBrowserAndOperationEventsHref11,
        observabilityBrowserAndOperationEventsUseContext,
      );
      return observabilityBrowserAndOperationEventsHref3 &&
        (0, React.isValidElement)(observabilityBrowserAndOperationEventsHref4) ? (
        (0, React.cloneElement)(observabilityBrowserAndOperationEventsHref4, {
          onClick: onClick,
          href: href,
        })
      ) : (
        <a
          {...originalElementProps({
            ...observabilityBrowserAndOperationEventsHref9,
            onClick: onClick,
            href: href,
            className: observabilityBrowserAndOperationEventsHref5?.call
              ? observabilityBrowserAndOperationEventsHref5(
                  observabilityBrowserAndOperationEventsHook ===
                    observabilityBrowserAndOperationEventsHref11,
                )
              : observabilityBrowserAndOperationEventsHref5,
            children: observabilityBrowserAndOperationEventsHref4,
            ref: options,
          })}
        />
      );
    },
  ));
  (resolveObservabilityBrowserAndOperationEventsFlatMap2 = (
    observabilityBrowserAndOperationEventsFlatMap2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    Array.isArray(observabilityBrowserAndOperationEventsFlatMap2)
      ? observabilityBrowserAndOperationEventsFlatMap2.flatMap(
          (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            resolveObservabilityBrowserAndOperationEventsFlatMap2(
              rolldownNImport2 && rolldownNImport2.type === React.Fragment
                ? rolldownNImport2.props.children
                : rolldownNImport2,
            ),
        )
      : [observabilityBrowserAndOperationEventsFlatMap2]);
  (resolveObservabilityBrowserAndOperationEventsLocation = (
    { children: children, location: location2 }: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let observabilityBrowserAndOperationEventsUseContext: Dynamic =
      resolveObservabilityBrowserAndOperationEventsUseContext();
    let [observabilityBrowserAndOperationEventsHook]: Dynamic =
      resolveObservabilityBrowserAndOperationEventsHook(
        observabilityBrowserAndOperationEventsUseContext,
      );
    for (let resolveObservabilityBrowserAndOperationEventsLocationResult of resolveObservabilityBrowserAndOperationEventsFlatMap2(
      children,
    ) as Dynamic) {
      let match: Dynamic = 0;
      if (
        (0, React.isValidElement)(
          resolveObservabilityBrowserAndOperationEventsLocationResult,
        ) &&
        (match = collectObservabilityBrowserAndOperationEventsPattern(
          observabilityBrowserAndOperationEventsUseContext.parser,
          resolveObservabilityBrowserAndOperationEventsLocationResult.props.path,
          location2 || observabilityBrowserAndOperationEventsHook,
          resolveObservabilityBrowserAndOperationEventsLocationResult.props.nest,
        ))[0]
      )
        return (0, React.cloneElement)(
          resolveObservabilityBrowserAndOperationEventsLocationResult,
          {
            match: match,
          },
        );
    }
    return null;
  });
  (resolvePlatformApiAndAuthHref = (
    platformApiAndAuthHref?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let {
      to: platformApiAndAuthHref2,
      href: platformApiAndAuthHref3 = platformApiAndAuthHref2,
    }: Dynamic = platformApiAndAuthHref;
    let observabilityBrowserAndOperationEventsUseContext: Dynamic =
      resolveObservabilityBrowserAndOperationEventsUseContext();
    let [, setObservabilityBrowserAndOperationEventsHook]: Dynamic =
      resolveObservabilityBrowserAndOperationEventsHook(
        observabilityBrowserAndOperationEventsUseContext,
      );
    let useObservabilityBrowserAndOperationEventsCurrent3: Dynamic =
      useObservabilityBrowserAndOperationEventsCurrent(
        (..._extraArguments: unknown[]): Dynamic =>
          setObservabilityBrowserAndOperationEventsHook(
            platformApiAndAuthHref2 || platformApiAndAuthHref3,
            platformApiAndAuthHref,
          ),
      );
    let {
      ssrContext: observabilityBrowserAndOperationEventsUseContext2,
    }: Dynamic = observabilityBrowserAndOperationEventsUseContext;
    ObservabilityBrowserAndOperationEventsUseLayoutEffect(
      (..._extraArguments: unknown[]): undefined => {
        useObservabilityBrowserAndOperationEventsCurrent3();
      },
      [],
    );
    if (observabilityBrowserAndOperationEventsUseContext2) {
      observabilityBrowserAndOperationEventsUseContext2.redirectTo =
        platformApiAndAuthHref2;
    }
    return null;
  });
  (PlatformApiAndAuthBONGOBASE = typeof window !== "undefined"
      ? ((window as Dynamic).__BONGO_BASE__ ?? ``)
      : ``);
  (PlatformApiAndAuthBONGOWSBASE = typeof window !== "undefined"
      ? ((window as Dynamic).__BONGO_WS_BASE__ ?? ``)
      : ``);
  (PlatformApiAndAuthBONGOAPIBASE = typeof window !== "undefined"
      ? ((window as Dynamic).__BONGO_API_BASE__ ??
        (window as Dynamic).__BONGO_BASE__ ??
        ``)
      : ``);
}

export {
  HOT_EARLY_MAX_MS,
  ObservabilityBrowserAndOperationEventsDefault,
  ObservabilityBrowserAndOperationEventsDisplayName,
  ObservabilityBrowserAndOperationEventsFull,
  ObservabilityBrowserAndOperationEventsHref,
  ObservabilityBrowserAndOperationEventsMessages,
  ObservabilityBrowserAndOperationEventsQuietAfterDays,
  PlatformApiAndAuthBONGOAPIBASE,
  PlatformApiAndAuthBONGOBASE,
  PlatformApiAndAuthBONGOWSBASE,
  UseObservabilityBrowserAndOperationEventsValueComponent,
  askFrameConversationPane,
  forwardHostViewport,
  frameAskClaude,
  frameClaudeWorking,
  frameConversationPane,
  frameCurrentAnchor,
  frameDeclineExport,
  frameHostAction,
  frameHostChrome,
  frameHostChromeActions,
  frameHostChromeDestinations,
  frameHostChromeExports,
  frameHostChromeWitnessed,
  frameHostExport,
  frameHostWords,
  frameHotActivity,
  frameHotFrom,
  frameHotProvide,
  frameHotTouched,
  frameMentioned,
  frameOpenExternal,
  frameTitleFromContent,
  frameTitlePropose,
  frameViewerDirty,
  frameViewerDirtyNow,
  frameViewerEdit,
  frameViewerPortAwaited,
  frameViewerRev,
  frameViewerSaveLive,
  frameViewerSaveWord,
  frameViewerStaged,
  hostSays,
  installFrameClaudeActivity,
  installFrameFetchTripwire,
  installFrameHostChromeWitness,
  installFrameHostViewport,
  installFrameHot,
  isObservabilityBrowserAndOperationEventsRelatedTarget,
  onFrameGotoAnchor,
  resolveObservabilityBrowserAndOperationEventsCatch,
  resolveObservabilityBrowserAndOperationEventsFromEvent,
  resolveObservabilityBrowserAndOperationEventsLocation,
  resolveObservabilityBrowserAndOperationEventsParser,
  resolveObservabilityBrowserAndOperationEventsPath,
  resolveObservabilityBrowserAndOperationEventsSearchHook,
  resolveObservabilityBrowserAndOperationEventsUseContext2,
  resolveObservabilityBrowserAndOperationEventsValue48,
  resolvePlatformApiAndAuthHref,
  subscribeFrameClaudeActivity,
  subscribeFrameConversationPane,
  subscribeFrameHostChromeWitness,
  subscribeFrameHostWords,
};
