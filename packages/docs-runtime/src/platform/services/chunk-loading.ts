/** BaoCut: platform chunk loading from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  React,
} from "../dependencies";
import {
  emitTelemetryEvent,
} from "../observability/telemetry-3";
import {
  isPlatformLoadingAndStatusWokeAt,
  resolvePlatformLoadingAndStatusExec,
  resolvePlatformLoadingAndStatusName,
  resolvePlatformLoadingAndStatusRetryable,
  resolvePlatformLoadingAndStatusTest,
} from "./loading-and-status";
import {
  UiToastsNow,
  _onToastBridgeReady,
  toast,
} from "../ui/toasts";

function createPagesBootChunkFailedEvent(
  pagesBootChunkFailedEvent: Dynamic = UiToastsNow,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let key = resolvePlatformChunkLoadingBlinked(
    pagesBootChunkFailedEvent,
    options,
  );
  return {
    name: `pages.boot.chunk_failed`,
    key: key,
    fields: {
      component: key,
    },
  };
}

var platformChunkLoadingSet: Dynamic;

function resolvePlatformChunkLoadingBlinked(
  platformChunkLoadingBlinked?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let platformLoadingAndStatusExec =
    resolvePlatformLoadingAndStatusExec(options);
  let facts: Dynamic = platformChunkLoadingBlinked.facts();
  let isPlatformLoadingAndStatusWokeAt2 = isPlatformLoadingAndStatusWokeAt(
    platformChunkLoadingBlinked.now(),
    {
      ...facts,
      blinked:
        facts.blinked === true ||
        (platformLoadingAndStatusExec !== undefined &&
          platformChunkLoadingSet.has(platformLoadingAndStatusExec)),
    },
  );
  if (
    isPlatformLoadingAndStatusWokeAt2 &&
    platformLoadingAndStatusExec !== undefined
  ) {
    platformChunkLoadingSet.add(platformLoadingAndStatusExec);
  }
  return isPlatformLoadingAndStatusWokeAt2 ? `net` : `stale`;
}

var PlatformChunkLoadingPagesHotStaleAt: string;

function resolvePlatformChunkLoadingValue(..._extraArguments: unknown[]) {
  try {
    return typeof sessionStorage == `object` && sessionStorage !== null
      ? sessionStorage
      : undefined;
  } catch {
    return;
  }
}

function resolvePlatformChunkLoadingFloor(
  platformChunkLoadingFloor: Dynamic = UiToastsNow,
  ..._extraArguments: unknown[]
): undefined {
  try {
    let floor = Math.floor(platformChunkLoadingFloor.now());
    let text = String(floor);
    if (!(floor > 0) || !/^[0-9]{1,16}$/.test(text)) return;
    (platformChunkLoadingFloor.store === undefined
      ? resolvePlatformChunkLoadingValue()
      : platformChunkLoadingFloor.store()
    )?.setItem(PlatformChunkLoadingPagesHotStaleAt, text);
  } catch {}
}

function resolvePlatformChunkLoadingStale(
  platformChunkLoadingStale?: Dynamic,
  options: Dynamic = UiToastsNow,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let pagesBootChunkFailedEvent = createPagesBootChunkFailedEvent(
    options,
    context,
  );
  if (pagesBootChunkFailedEvent.fields.component === `stale`) {
    resolvePlatformChunkLoadingFloor(options);
  }
  platformChunkLoadingStale(pagesBootChunkFailedEvent);
}

var platformChunkLoadingValue_1: boolean;

var PlatformChunkLoadingNewVersionAvailable: string;

var PlatformChunkLoadingMessage: string;

var PlatformChunkLoadingMessage2: string;

var platformChunkLoadingValue_12: boolean;

var platformChunkLoadingState: Dynamic;

function installPlatformChunkLoadingAddEventListener(
  ..._extraArguments: unknown[]
): Dynamic {
  let globalThis2: Dynamic = globalThis;
  return typeof globalThis2.addEventListener == `function` &&
    typeof globalThis2.removeEventListener == `function`
    ? globalThis2
    : undefined;
}

function resolvePlatformChunkLoadingDescription(
  ..._extraArguments: unknown[]
): undefined {
  if (!platformChunkLoadingValue_12) {
    platformChunkLoadingValue_12 = true;
    platformChunkLoadingState?.();
    _onToastBridgeReady(
      (..._extraArguments: unknown[]): Dynamic =>
        toast(PlatformChunkLoadingMessage, {
          id: `chunk-net`,
          description: PlatformChunkLoadingMessage2,
          duration: 0,
          action: {
            label: `Refresh`,
            onClick: (..._extraArguments: unknown[]) => location.reload(),
          },
        }),
    );
  }
}

function installPlatformChunkLoadingOnline(
  installPlatformChunkLoadingOnline2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (platformChunkLoadingValue_12) return;
  if (installPlatformChunkLoadingOnline2.facts().online !== false)
    return resolvePlatformChunkLoadingDescription();
  if (platformChunkLoadingState !== undefined) return;
  let win: Dynamic =
    installPlatformChunkLoadingOnline2.win ??
    installPlatformChunkLoadingAddEventListener();
  if (win === undefined) return;
  let resolvePlatformChunkLoadingDescription3: Dynamic = (
    ..._extraArguments: unknown[]
  ) => resolvePlatformChunkLoadingDescription();
  win.addEventListener(`online`, resolvePlatformChunkLoadingDescription3);
  platformChunkLoadingState = (..._extraArguments: unknown[]): undefined => {
    platformChunkLoadingState = undefined;
    win.removeEventListener(`online`, resolvePlatformChunkLoadingDescription3);
  };
}

function resolvePlatformChunkLoadingDescription2(
  platformChunkLoadingDescription2?: Dynamic,
  options: Dynamic = UiToastsNow,
  ..._extraArguments: unknown[]
) {
  let pagesBootChunkFailedEvent = createPagesBootChunkFailedEvent(
    options,
    platformChunkLoadingDescription2,
  );
  if (pagesBootChunkFailedEvent.fields.component === `net`) {
    emitTelemetryEvent(pagesBootChunkFailedEvent);
    return installPlatformChunkLoadingOnline(options);
  }
  resolvePlatformChunkLoadingFloor(options);
  if (!platformChunkLoadingValue_1) {
    platformChunkLoadingValue_1 = true;
    emitTelemetryEvent(pagesBootChunkFailedEvent);
    _onToastBridgeReady(
      (..._extraArguments: unknown[]): Dynamic =>
        toast(PlatformChunkLoadingNewVersionAvailable, {
          id: `stale-client`,
          description: `This tab is running an older build. Refresh to load the latest version.`,
          duration: 0,
          action: {
            label: `Refresh`,
            onClick: (..._extraArguments: unknown[]) => location.reload(),
          },
        }),
    );
  }
}

function createPagesBootChunkRetryEvent(
  pagesBootChunkRetryEvent?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let key = String(Math.max(1, Math.floor(pagesBootChunkRetryEvent)));
  return {
    name: `pages.boot.chunk_retry`,
    key: key,
    fields: {
      component: key,
    },
  };
}

function resolvePlatformChunkLoadingEnv(
  platformChunkLoadingEnv?: Dynamic,
  options: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let {
    env: options5 = UiToastsNow,
    onRetry: options2,
    onGiveUp: options3,
    ...options4
  }: Dynamic = options;
  return resolvePlatformLoadingAndStatusRetryable(platformChunkLoadingEnv, {
    ...options4,
    onRetry: (
      platformChunkLoadingEnv2?: Dynamic,
      options6?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      resolvePlatformChunkLoadingValue2(options6);
      if (options2 !== undefined)
        return options2(platformChunkLoadingEnv2, options6);
      emitTelemetryEvent(
        createPagesBootChunkRetryEvent(platformChunkLoadingEnv2),
      );
    },
    onGiveUp: (
      platformChunkLoadingEnv2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      resolvePlatformChunkLoadingValue2(platformChunkLoadingEnv2);
      if (options3 !== undefined) return options3(platformChunkLoadingEnv2);
      resolvePlatformChunkLoadingDescription2(
        platformChunkLoadingEnv2,
        options5,
      );
    },
  });
}

var platformChunkLoadingWeakSet: Dynamic;

function resolvePlatformChunkLoadingValue2(
  platformChunkLoadingValue2?: unknown,
  ..._extraArguments: unknown[]
): undefined {
  if (
    typeof platformChunkLoadingValue2 == `object` &&
    platformChunkLoadingValue2
  ) {
    platformChunkLoadingWeakSet.add(platformChunkLoadingValue2);
  }
}

function resolvePlatformChunkLoadingValue3(
  platformChunkLoadingValue3?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    typeof platformChunkLoadingValue3 == `object` &&
    !!platformChunkLoadingValue3 &&
    platformChunkLoadingWeakSet.has(platformChunkLoadingValue3)
  );
}

function installPlatformChunkLoadingAddEventListener2(
  installPlatformChunkLoadingAddEventListener22?: Dynamic,
  options: Dynamic = (
    installPlatformChunkLoadingAddEventListener23?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined =>
    void setTimeout(installPlatformChunkLoadingAddEventListener23, 0),
  ..._extraArguments: unknown[]
): undefined {
  installPlatformChunkLoadingAddEventListener22.addEventListener(
    `vite:preloadError`,
    (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let payload: Dynamic = event.payload;
      if (!resolvePlatformLoadingAndStatusTest(payload)) {
        options((..._extraArguments: unknown[]): undefined => {
          if (!resolvePlatformChunkLoadingValue3(payload)) {
            resolvePlatformChunkLoadingDescription2(payload);
          }
        });
      }
    },
  );
}

function resolvePlatformChunkLoadingValue4(..._extraArguments: unknown[]) {
  return null;
}

function resolvePlatformChunkLoadingLazy(
  platformChunkLoadingLazy?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (0, React.lazy)(
    (..._extraArguments: unknown[]): Dynamic =>
      resolvePlatformChunkLoadingDefault(
        platformChunkLoadingLazy(),
        resolvePlatformChunkLoadingValue4,
      ),
  );
}

function resolvePlatformChunkLoadingDefault(
  platformChunkLoadingDefault?: Dynamic,
  result?: Dynamic,
  context: Dynamic = resolvePlatformChunkLoadingDescription2,
  ..._extraArguments: unknown[]
): Dynamic {
  return platformChunkLoadingDefault.catch(
    (error?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      if (!resolvePlatformLoadingAndStatusName(error)) throw error;
      context(error);
      return {
        default: result,
      };
    },
  );
}

function resolvePlatformChunkLoadingLazy2(
  platformChunkLoadingLazy2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (0, React.lazy)(
    (..._extraArguments: unknown[]): Dynamic =>
      resolvePlatformChunkLoadingDefault(platformChunkLoadingLazy2(), options),
  );
}

function resolvePlatformChunkLoadingDefault2(
  platformChunkLoadingDefault2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let platformChunkLoadingEnv: Dynamic = resolvePlatformChunkLoadingEnv(
    platformChunkLoadingDefault2,
    dependencies,
  );
  return (..._extraArguments: unknown[]): Dynamic =>
    resolvePlatformChunkLoadingDefault(
      platformChunkLoadingEnv().then(
        (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
          default: options(result),
        }),
      ),
      context,
      (..._extraArguments: unknown[]): undefined => {},
    );
}

function resolvePlatformChunkLoadingLazy3(
  platformChunkLoadingLazy3?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  return (0, React.lazy)(
    resolvePlatformChunkLoadingDefault2(
      platformChunkLoadingLazy3,
      options,
      context ?? resolvePlatformChunkLoadingValue4,
      dependencies,
    ),
  );
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializePlatformChunkLoadingStep1(): void {
  (platformChunkLoadingSet = new (Set as Dynamic)());
  (PlatformChunkLoadingPagesHotStaleAt = `pages.hot.staleAt`);
  (platformChunkLoadingValue_1 = false);
  (PlatformChunkLoadingNewVersionAvailable = `New version available`);
  (PlatformChunkLoadingMessage = `Couldn’t load part of this page`);
  (PlatformChunkLoadingMessage2 = `Check your connection, then refresh.`);
  (platformChunkLoadingValue_12 = false);
  (platformChunkLoadingWeakSet = new (WeakSet as Dynamic)());
}

export {
  createPagesBootChunkRetryEvent,
  installPlatformChunkLoadingAddEventListener2,
  resolvePlatformChunkLoadingDescription2,
  resolvePlatformChunkLoadingEnv,
  resolvePlatformChunkLoadingLazy,
  resolvePlatformChunkLoadingLazy2,
  resolvePlatformChunkLoadingLazy3,
  resolvePlatformChunkLoadingStale,
};
