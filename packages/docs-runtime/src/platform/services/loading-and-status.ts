/** BaoCut: platform loading and status from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  preloadModule,
} from "../dependencies";

var platformLoadingAndStatusSavedBarLinkUnsyncedValues: string[];

var platformLoadingAndStatusSet: Dynamic;

function isPlatformLoadingAndStatusJudged(
  platformLoadingAndStatusJudged?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let lookup: Dynamic = new (Map as Dynamic)();
  let isPlatformLoadingAndStatusJudgedResult: Dynamic = null;
  let isPlatformLoadingAndStatusJudgedResult2: Dynamic = null;
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let isFinite2: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
    try {
      let platformLoadingAndStatusJudged2: Dynamic =
        platformLoadingAndStatusJudged();
      return Number.isFinite(platformLoadingAndStatusJudged2)
        ? platformLoadingAndStatusJudged2
        : null;
    } catch {
      return null;
    }
  };
  let isFinite3: Dynamic = (..._extraArguments: unknown[]) => {
    let isFinite4: Dynamic = isFinite2();
    for (let [
      isPlatformLoadingAndStatusJudgedResult4,
      isPlatformLoadingAndStatusJudgedResult5,
    ] of lookup as Dynamic)
      if (
        isFinite4 !== null &&
        isPlatformLoadingAndStatusJudgedResult5.savedSince !== null &&
        isFinite4 < isPlatformLoadingAndStatusJudgedResult5.savedSince
      ) {
        isPlatformLoadingAndStatusJudgedResult5.savedSince = isFinite4;
      } else {
        if (
          isFinite4 !== null &&
          isPlatformLoadingAndStatusJudgedResult5.savedSince !== null &&
          isFinite4 - isPlatformLoadingAndStatusJudgedResult5.savedSince >= 2e3
        ) {
          lookup.delete(isPlatformLoadingAndStatusJudgedResult4);
        }
      }
    let uniqueItems2: Dynamic = new (Set as Dynamic)(
      [...lookup.values()].map(
        (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => item.term,
      ),
    );
    return (
      platformLoadingAndStatusSavedBarLinkUnsyncedValues.find(
        (
          platformLoadingAndStatusSavedBarLinkUnsyncedValue?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          platformLoadingAndStatusSavedBarLinkUnsyncedValue !== `saved` &&
          uniqueItems2.has(platformLoadingAndStatusSavedBarLinkUnsyncedValue),
      ) ?? `saved`
    );
  };
  let isPlatformLoadingAndStatusJudgedResult3: Dynamic = (
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (isPlatformLoadingAndStatusJudgedResult === null) return `saved`;
    let isPlatformLoadingAndStatusJudgedResult4: Dynamic;
    try {
      isPlatformLoadingAndStatusJudgedResult4 =
        isPlatformLoadingAndStatusJudgedResult();
    } catch {
      isPlatformLoadingAndStatusJudgedResult4 = undefined;
    }
    return typeof isPlatformLoadingAndStatusJudgedResult4 != `string` ||
      !platformLoadingAndStatusSet.has(isPlatformLoadingAndStatusJudgedResult4)
      ? (isPlatformLoadingAndStatusJudgedResult2 ?? `saved`)
      : (isPlatformLoadingAndStatusJudgedResult4 !== `saved` &&
          (isPlatformLoadingAndStatusJudgedResult2 =
            isPlatformLoadingAndStatusJudgedResult4),
        isPlatformLoadingAndStatusJudgedResult4);
  };
  let term: Dynamic = (..._extraArguments: unknown[]) => {
    let [items, setItems]: Dynamic = [
      isPlatformLoadingAndStatusJudgedResult3(),
      isFinite3(),
    ];
    return (
      platformLoadingAndStatusSavedBarLinkUnsyncedValues.find(
        (
          platformLoadingAndStatusSavedBarLinkUnsyncedValue?: Dynamic,
          ..._extraArguments: unknown[]
        ) =>
          platformLoadingAndStatusSavedBarLinkUnsyncedValue !== `saved` &&
          (platformLoadingAndStatusSavedBarLinkUnsyncedValue === items ||
            platformLoadingAndStatusSavedBarLinkUnsyncedValue === setItems),
      ) ?? `saved`
    );
  };
  return {
    judged(
      term2?: Dynamic,
      options: Dynamic = ``,
      ..._extraArguments: unknown[]
    ): undefined {
      if (platformLoadingAndStatusSet.has(term2)) {
        if (term2 !== `saved`) {
          lookup.set(options, {
            term: term2,
            savedSince: null,
          });
          isPlatformLoadingAndStatusJudgedResult2 = term2;
          return;
        }
        for (let isPlatformLoadingAndStatusJudgedResult4 of [
          lookup.get(options),
          lookup.get(``),
        ] as Dynamic)
          if (isPlatformLoadingAndStatusJudgedResult4 !== undefined) {
            isPlatformLoadingAndStatusJudgedResult4.savedSince ??= isFinite2();
          }
      }
    },
    live(
      platformLoadingAndStatusJudged2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      isPlatformLoadingAndStatusJudgedResult = platformLoadingAndStatusJudged2;
      return (..._extraArguments: unknown[]): undefined => {
        if (
          isPlatformLoadingAndStatusJudgedResult ===
          platformLoadingAndStatusJudged2
        ) {
          isPlatformLoadingAndStatusJudgedResult = null;
        }
      };
    },
    awaited(..._extraArguments: unknown[]): Dynamic {
      let record2: Dynamic = {};
      uniqueItems.add(record2);
      return (..._extraArguments: unknown[]): undefined =>
        void uniqueItems.delete(record2);
    },
    awaiting: (..._extraArguments: unknown[]) => uniqueItems.size > 0,
    term: term,
    glance: (..._extraArguments: unknown[]) => {
      let isFinite4: Dynamic = isFinite2();
      let isPlatformLoadingAndStatusJudgedHandler: Dynamic = (
        platformLoadingAndStatusJudged2?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        isFinite4 !== null &&
        platformLoadingAndStatusJudged2.savedSince !== null &&
        isFinite4 >= platformLoadingAndStatusJudged2.savedSince &&
        isFinite4 - platformLoadingAndStatusJudged2.savedSince >= 2e3;
      let uniqueItems2: Dynamic = new (Set as Dynamic)(
        [...lookup.values()]
          .filter(
            (item?: Dynamic, ..._extraArguments: unknown[]) =>
              !isPlatformLoadingAndStatusJudgedHandler(item),
          )
          .map(
            (filteredItem?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              filteredItem.term,
          ),
      );
      let label: string | undefined = `saved`;
      if (isPlatformLoadingAndStatusJudgedResult !== null) {
        try {
          label = isPlatformLoadingAndStatusJudgedResult();
        } catch {
          label = undefined;
        }
        if (
          typeof label != `string` ||
          !platformLoadingAndStatusSet.has(label)
        ) {
          label = isPlatformLoadingAndStatusJudgedResult2 ?? `saved`;
        }
      }
      return (
        platformLoadingAndStatusSavedBarLinkUnsyncedValues.find(
          (
            platformLoadingAndStatusSavedBarLinkUnsyncedValue?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            platformLoadingAndStatusSavedBarLinkUnsyncedValue !== `saved` &&
            (platformLoadingAndStatusSavedBarLinkUnsyncedValue === label ||
              uniqueItems2.has(
                platformLoadingAndStatusSavedBarLinkUnsyncedValue,
              )),
        ) ?? `saved`
      );
    },
    held: (..._extraArguments: unknown[]) =>
      uniqueItems.size > 0 || term() !== `saved`,
    reset(..._extraArguments: unknown[]): undefined {
      lookup.clear();
      uniqueItems.clear();
      [
        isPlatformLoadingAndStatusJudgedResult,
        isPlatformLoadingAndStatusJudgedResult2,
      ] = [null, null];
    },
  };
}

function isPlatformLoadingAndStatusWokeAt(
  platformLoadingAndStatusWoke?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (options.online === false || options.blinked === true) return true;
  let { wokeAt: options2, doorAnsweredAt: options3 }: Dynamic = options;
  if (options2 === undefined) return false;
  let difference: number = platformLoadingAndStatusWoke - options2;
  return difference < 0 || difference > 1e4
    ? false
    : options3 === undefined || options3 < options2;
}

var platformLoadingAndStatusState: Dynamic;

var platformLoadingAndStatusState2: Dynamic;

var platformLoadingAndStatusSet2: Dynamic;

function resolvePlatformLoadingAndStatusValue(
  platformLoadingAndStatusValue?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  platformLoadingAndStatusState = platformLoadingAndStatusValue;
}

function resolvePlatformLoadingAndStatusSize(
  platformLoadingAndStatusSize?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  platformLoadingAndStatusState2 = platformLoadingAndStatusSize;
  if (platformLoadingAndStatusSet2.size === 0) return;
  let platformLoadingAndStatusSet22: Dynamic = Array.from<Dynamic>(
    platformLoadingAndStatusSet2,
  );
  platformLoadingAndStatusSet2.clear();
  for (let resolvePlatformLoadingAndStatusSizeResult of platformLoadingAndStatusSet22 as Dynamic)
    try {
      resolvePlatformLoadingAndStatusSizeResult();
    } catch {}
}

function clearPlatformLoadingAndStatusDelete(
  clearPlatformLoadingAndStatusDelete2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  platformLoadingAndStatusSet2.add(clearPlatformLoadingAndStatusDelete2);
  return (..._extraArguments: unknown[]): undefined =>
    void platformLoadingAndStatusSet2.delete(
      clearPlatformLoadingAndStatusDelete2,
    );
}

function resolvePlatformLoadingAndStatusOnline(
  platformLoadingAndStatusOnline: Dynamic = (globalThis as Dynamic).navigator,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    online:
      typeof platformLoadingAndStatusOnline?.onLine == `boolean`
        ? platformLoadingAndStatusOnline.onLine
        : undefined,
    wokeAt: platformLoadingAndStatusState,
    doorAnsweredAt: platformLoadingAndStatusState2,
  };
}

function installPlatformLoadingAndStatusVisible(
  installPlatformLoadingAndStatusVisible2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  installPlatformLoadingAndStatusVisible2.vis.subscribe(
    (
      installPlatformLoadingAndStatusVisible3?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (installPlatformLoadingAndStatusVisible3 === `visible`) {
        resolvePlatformLoadingAndStatusValue(
          installPlatformLoadingAndStatusVisible2.now(),
        );
      }
    },
  );
  installPlatformLoadingAndStatusVisible2.win.addEventListener(
    `online`,
    (..._extraArguments: unknown[]) =>
      resolvePlatformLoadingAndStatusValue(
        installPlatformLoadingAndStatusVisible2.now(),
      ),
  );
}

function resolvePlatformLoadingAndStatusCatch(
  platformLoadingAndStatusCatch?: Dynamic,
  options: Dynamic = (
    platformLoadingAndStatusCatch2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    preloadModule(
      (..._extraArguments: unknown[]): Dynamic =>
        import(platformLoadingAndStatusCatch2),
      [],
      import.meta.url,
    ),
  ..._extraArguments: unknown[]
): Dynamic {
  let resolvePlatformLoadingAndStatusCatchResult: Dynamic;
  let index = 0;
  return (..._extraArguments: unknown[]): Dynamic =>
    (resolvePlatformLoadingAndStatusCatchResult === undefined
      ? platformLoadingAndStatusCatch()
      : options(`${resolvePlatformLoadingAndStatusCatchResult}?r=${++index}`)
    ).catch((error?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      throw (
        (resolvePlatformLoadingAndStatusCatchResult ??=
          resolvePlatformLoadingAndStatusExec(error)),
        error
      );
    });
}

function resolvePlatformLoadingAndStatusMod(
  platformLoadingAndStatusMod?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let resolvePlatformLoadingAndStatusModResult: Dynamic;
  return (..._extraArguments: unknown[]): Dynamic =>
    resolvePlatformLoadingAndStatusModResult === undefined
      ? platformLoadingAndStatusMod().then(
          (mod?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
            (resolvePlatformLoadingAndStatusModResult = {
              mod: mod,
            }),
            mod
          ),
        )
      : Promise.resolve(resolvePlatformLoadingAndStatusModResult.mod);
}

function resolvePlatformLoadingAndStatusExec(
  error?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return error instanceof Error
    ? platformLoadingAndStatusUrlPattern.exec(error.message)?.[0]
    : undefined;
}

var platformLoadingAndStatusUrlPattern: RegExp;

function resolvePlatformLoadingAndStatusTest(
  error?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    error instanceof Error &&
    platformLoadingAndStatusPattern.test(error.message)
  );
}

var platformLoadingAndStatusPattern: RegExp;

function resolvePlatformLoadingAndStatusName(
  error?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let label = error instanceof Error ? `${error.name}: ${error.message}` : ``;
  return platformLoadingAndStatusPattern2.test(label);
}

var platformLoadingAndStatusPattern2: RegExp;

var PlatformLoadingAndStatusState: number[];

function resolvePlatformLoadingAndStatusRound(
  platformLoadingAndStatusRound?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return Math.max(
    0,
    Math.round(
      platformLoadingAndStatusRound * (1 + options * (2 * context() - 1)),
    ),
  );
}

var resolvePlatformLoadingAndStatusValue2: Dynamic;

async function loadPlatformLoadingAndStatusDelaysMs(
  platformLoadingAndStatusDelaysMs?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let delaysMs: Dynamic = options.delaysMs ?? PlatformLoadingAndStatusState;
  let jitter: Dynamic = options.jitter ?? 0.3;
  let sleep: Dynamic = options.sleep ?? resolvePlatformLoadingAndStatusValue2;
  let random: Dynamic = options.random ?? Math.random;
  for (let count = 1; ; count++)
    try {
      return await platformLoadingAndStatusDelaysMs(count);
    } catch (loadPlatformLoadingAndStatusDelaysMsResult: Dynamic) {
      if (
        count > delaysMs.length ||
        !options.retryable(loadPlatformLoadingAndStatusDelaysMsResult)
      )
        throw loadPlatformLoadingAndStatusDelaysMsResult;
      try {
        options.onRetry?.(count, loadPlatformLoadingAndStatusDelaysMsResult);
      } catch {}
      await sleep(
        resolvePlatformLoadingAndStatusRound(
          delaysMs[count - 1],
          jitter,
          random,
        ),
      );
    }
}

function resolvePlatformLoadingAndStatusRetryable(
  platformLoadingAndStatusRetryable?: Dynamic,
  options: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let platformLoadingAndStatusCatch: Dynamic =
    resolvePlatformLoadingAndStatusCatch(
      platformLoadingAndStatusRetryable,
      options.reload,
    );
  return (..._extraArguments: unknown[]): Dynamic =>
    loadPlatformLoadingAndStatusDelaysMs(
      (..._extraArguments: unknown[]): Dynamic =>
        platformLoadingAndStatusCatch(),
      {
        ...options,
        retryable: resolvePlatformLoadingAndStatusName,
      },
    ).catch((error?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      throw (
        resolvePlatformLoadingAndStatusName(error) && options.onGiveUp?.(error),
        error
      );
    });
}

var platformLoadingAndStatusState3: Dynamic;

function resolvePlatformLoadingAndStatusResolve(
  platformLoadingAndStatusResolve?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  try {
    return platformLoadingAndStatusState3
      ? Promise.resolve(
          platformLoadingAndStatusState3(
            platformLoadingAndStatusResolve,
            options,
          ),
        )
      : options();
  } catch (resolvePlatformLoadingAndStatusResolveResult: Dynamic) {
    return Promise.reject(
      resolvePlatformLoadingAndStatusResolveResult instanceof Error
        ? resolvePlatformLoadingAndStatusResolveResult
        : Error(String(resolvePlatformLoadingAndStatusResolveResult)),
    );
  }
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializePlatformLoadingAndStatusStep1(): void {
  (platformLoadingAndStatusSavedBarLinkUnsyncedValues = [
    `saved`,
    `bar`,
    `link`,
    `unsynced`,
    `denied`,
    `stale`,
    `pending`,
  ]);
  (platformLoadingAndStatusSet = new (Set as Dynamic)(
    platformLoadingAndStatusSavedBarLinkUnsyncedValues,
  ));
  (platformLoadingAndStatusSet2 = new (Set as Dynamic)());
  (platformLoadingAndStatusUrlPattern = /https?:\/\/[^\s"'()?#]+\.js/);
  (platformLoadingAndStatusPattern = /\.js\?r=\d+(?![\w=&])/);
  (platformLoadingAndStatusPattern2 = /dynamically imported module|Importing a module script failed|Unable to preload|ChunkLoadError/i);
  (PlatformLoadingAndStatusState = [300, 1e3, 3e3]);
  (resolvePlatformLoadingAndStatusValue2 = (
    platformLoadingAndStatusValue2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    new (Promise as Dynamic)((resolve?: Dynamic, ..._extraArguments: unknown[]) =>
      setTimeout(resolve, platformLoadingAndStatusValue2),
    ));
}

export {
  clearPlatformLoadingAndStatusDelete,
  installPlatformLoadingAndStatusVisible,
  isPlatformLoadingAndStatusJudged,
  isPlatformLoadingAndStatusWokeAt,
  loadPlatformLoadingAndStatusDelaysMs,
  resolvePlatformLoadingAndStatusCatch,
  resolvePlatformLoadingAndStatusExec,
  resolvePlatformLoadingAndStatusMod,
  resolvePlatformLoadingAndStatusName,
  resolvePlatformLoadingAndStatusOnline,
  resolvePlatformLoadingAndStatusResolve,
  resolvePlatformLoadingAndStatusRetryable,
  resolvePlatformLoadingAndStatusSize,
  resolvePlatformLoadingAndStatusTest,
};
