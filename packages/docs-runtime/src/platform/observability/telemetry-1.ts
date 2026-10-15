/** BaoCut: observability telemetry from app-core-BE6n4d7F.js. */
import type {
  TelemetryCode,
  TelemetryValueKind,
  JavaScriptType,
} from "../../interop/recovered-contracts";
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  helloImport,
  helloTImport,
  helloWImport,
  inFrame,
  rolldownNImport,
} from "../dependencies";

const collectObservabilityTelemetryValue: Dynamic = (
  ..._extraArguments: unknown[]
): Dynamic => [];

var observabilityTelemetrySaveOpenRenderEditValues: string[];

var observabilityTelemetrySuccessFailureAbortedValues: string[];

var observabilityTelemetryPattern: RegExp;

var observabilityTelemetryConflictReadOnlyTooLargeInvalidContentValues: string[];

var observabilityTelemetrySet: Dynamic;

var observabilityTelemetrySet2: Dynamic;

var observabilityTelemetryPattern2: RegExp;

var observabilityTelemetryPattern3: RegExp;

var ObservabilityTelemetryMin: {
    min: number;
    max: number;
    default: number;
};

var observabilityTelemetryValue15000: number;

var observabilityTelemetryValue1000: number;

var ObservabilityTelemetryAppifactHealthV2: string;

var ObservabilityTelemetryAppifactHealth: string;

var observabilityTelemetryValue10: number;

var observabilityTelemetryValue10002: number;

var observabilityTelemetryMap: Map<string, TelemetryCode>;

function getObservabilityTelemetryCode(
  error?: unknown,
  ..._extraArguments: unknown[]
): TelemetryCode | "unknown" {
  if (typeof error == `object` && error && `code` in error) {
    let code = error.code;
    if (typeof code == `string`) {
      let observabilityTelemetryMapEntry = observabilityTelemetryMap.get(code);
      if (observabilityTelemetryMapEntry !== undefined)
        return observabilityTelemetryMapEntry;
    }
  }
  return `unknown`;
}

var observabilityTelemetryPattern4: RegExp;

var observabilityTelemetryPattern5: RegExp;

function resolveObservabilityTelemetryTest(
  observabilityTelemetryTest?: unknown,
  ..._extraArguments: unknown[]
): boolean {
  return (
    typeof observabilityTelemetryTest == `string` &&
    observabilityTelemetryPattern5.test(observabilityTelemetryTest)
  );
}

function isObservabilityTelemetryChunkLoadError(
  observabilityTelemetryChunkLoadError?: unknown,
  ..._extraArguments: unknown[]
) {
  if (
    typeof observabilityTelemetryChunkLoadError != `object` ||
    !observabilityTelemetryChunkLoadError
  )
    return false;
  let observabilityTelemetryChunkLoadError2: Dynamic =
    observabilityTelemetryChunkLoadError;
  return (
    observabilityTelemetryChunkLoadError2.name === `ChunkLoadError` ||
    (typeof observabilityTelemetryChunkLoadError2.message == `string` &&
      observabilityTelemetryPattern4.test(
        observabilityTelemetryChunkLoadError2.message,
      ))
  );
}

function resolveObservabilityTelemetryIncludes(
  observabilityTelemetryIncludes?: unknown,
  ..._extraArguments: unknown[]
): boolean {
  return (
    typeof observabilityTelemetryIncludes == `string` &&
    observabilityTelemetrySaveOpenRenderEditValues.includes(
      observabilityTelemetryIncludes,
    )
  );
}

function resolveObservabilityTelemetryIncludes2(
  observabilityTelemetryIncludes2?: unknown,
  ..._extraArguments: unknown[]
): boolean {
  return (
    typeof observabilityTelemetryIncludes2 == `string` &&
    observabilityTelemetrySuccessFailureAbortedValues.includes(
      observabilityTelemetryIncludes2,
    )
  );
}

function resolveObservabilityTelemetryTest2(
  observabilityTelemetryTest2?: unknown,
  ..._extraArguments: unknown[]
) {
  if (
    typeof observabilityTelemetryTest2 != `object` ||
    !observabilityTelemetryTest2
  )
    return `init() takes the parsed artifact.json (an object with key and monitoring)`;
  let observabilityTelemetryTest22: Dynamic = observabilityTelemetryTest2;
  if (
    typeof observabilityTelemetryTest22.key != `string` ||
    !observabilityTelemetryPattern2.test(observabilityTelemetryTest22.key) ||
    observabilityTelemetrySet2.has(observabilityTelemetryTest22.key)
  )
    return `artifact.json key is not a reportable app key`;
  let monitoring: Dynamic = observabilityTelemetryTest22.monitoring;
  return typeof monitoring != `object` || !monitoring
    ? `artifact.json has no monitoring block`
    : typeof monitoring.alertChannel != `string` ||
        !observabilityTelemetryPattern3.test(monitoring.alertChannel) ||
        observabilityTelemetrySet2.has(monitoring.alertChannel)
      ? `monitoring.alertChannel is not a Slack channel name (no "#")`
      : !Array.isArray(monitoring.coreActions) ||
          !monitoring.coreActions.every(resolveObservabilityTelemetryIncludes)
        ? `monitoring.coreActions must list verbs from CORE_ACTIONS`
        : monitoring.readyTimeoutS !== undefined &&
            !(
              Number.isInteger(monitoring.readyTimeoutS) &&
              monitoring.readyTimeoutS >= ObservabilityTelemetryMin.min &&
              monitoring.readyTimeoutS <= ObservabilityTelemetryMin.max
            )
          ? `monitoring.readyTimeoutS must be a whole number from ${ObservabilityTelemetryMin.min} to ${ObservabilityTelemetryMin.max}`
          : null;
}

function resolveObservabilityTelemetryVersion(
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    version: ObservabilityTelemetryAppifactHealthV2,
    ready(..._extraArguments: unknown[]): undefined {},
    report(..._extraArguments: unknown[]): undefined {},
    crash(..._extraArguments: unknown[]): undefined {},
    replay(..._extraArguments: unknown[]): undefined {},
    track: loadObservabilityTelemetryUnknown(
      (..._extraArguments: unknown[]): undefined => {},
    ),
  };
}

function loadObservabilityTelemetryUnknown(
  observabilityTelemetryUnknown?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return async (
    observabilityTelemetryUnknown2?: Dynamic,
    options?: Dynamic,
    context: Dynamic = getObservabilityTelemetryCode,
    ..._extraArguments: unknown[]
  ): Promise<Dynamic> => {
    let loadObservabilityTelemetryUnknownResult: Dynamic;
    try {
      loadObservabilityTelemetryUnknownResult = await options();
    } catch (loadObservabilityTelemetryUnknownResult2: Dynamic) {
      let label: string = `unknown`;
      try {
        label = context(loadObservabilityTelemetryUnknownResult2);
      } catch {}
      throw (
        observabilityTelemetryUnknown(
          observabilityTelemetryUnknown2,
          `failure`,
          label,
        ),
        loadObservabilityTelemetryUnknownResult2
      );
    }
    observabilityTelemetryUnknown(observabilityTelemetryUnknown2, `success`);
    return loadObservabilityTelemetryUnknownResult;
  };
}

function updateObservabilityTelemetryFrameHealth(
  event?: Dynamic,
  timers?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let appKey: Dynamic = event.key;
  let alertChannel: Dynamic = event.monitoring.alertChannel;
  let uniqueItems: Dynamic = new (Set as Dynamic)(event.monitoring.coreActions);
  let amount =
    (event.monitoring.readyTimeoutS ?? ObservabilityTelemetryMin.default) * 1e3;
  let count: number = 0;
  let uniqueItems2: Dynamic = new (Set as Dynamic)();
  let warn = (
    updateObservabilityTelemetryFrameHealth2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      !(
        count >= observabilityTelemetryValue10 ||
        uniqueItems2.has(updateObservabilityTelemetryFrameHealth2)
      )
    ) {
      uniqueItems2.add(updateObservabilityTelemetryFrameHealth2);
      count += 1;
      try {
        timers.warn(options);
      } catch {}
    }
  };
  let lookup: Dynamic = new (Map as Dynamic)();
  let updateObservabilityTelemetryFrameHealthResult: Dynamic = null;
  let post = (
    action?: Dynamic,
    outcome?: Dynamic,
    errorType?: Dynamic,
    replayed?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    try {
      if (action !== `load` && action !== `ready` && action !== `crash`) {
        let lookupEntry: Dynamic = lookup.get(action) ?? 0;
        if (lookupEntry >= 1e3) {
          warn(
            `flood:${action}`,
            `"${action}" was reported more than ${observabilityTelemetryValue1000} times in ${observabilityTelemetryValue15000 / 1e3} s; the rest of this window's "${action}" reports are dropped — report once per user-level operation, not per element or frame`,
          );
          return;
        }
        lookup.set(action, lookupEntry + 1);
        if (updateObservabilityTelemetryFrameHealthResult === null) {
          updateObservabilityTelemetryFrameHealthResult = timers.setTimeout(
            (..._extraArguments: unknown[]): undefined => {
              updateObservabilityTelemetryFrameHealthResult = null;
              lookup = new (Map as Dynamic)();
            },
            observabilityTelemetryValue15000,
          );
        }
      }
      timers.post({
        __frame_health: true,
        report: {
          appKey: appKey,
          alertChannel: alertChannel,
          action: action,
          outcome: outcome,
          ...(errorType !== undefined && {
            errorType: errorType,
          }),
          ...(replayed && {
            replayed: replayed,
          }),
        },
      });
    } catch {}
  };
  let updateObservabilityTelemetryFrameHealthResult2: Dynamic = null;
  let uniqueItems3: Dynamic = new (Set as Dynamic)();
  let updateObservabilityTelemetryFrameHealthResult3: Dynamic = null;
  let amount2 = amount;
  let count2: number = 0;
  let post2 = (
    outcome?: Dynamic,
    errorType?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    updateObservabilityTelemetryFrameHealthResult2 = {
      outcome: outcome,
      ...(errorType !== undefined && {
        errorType: errorType,
      }),
    };
    post(`ready`, outcome, errorType);
  };
  let post3 = (..._extraArguments: unknown[]): undefined => {
    updateObservabilityTelemetryFrameHealthResult3 = null;
    if (updateObservabilityTelemetryFrameHealthResult2 === null) {
      post2(
        `failure`,
        uniqueItems3.size > 0 ? `threw_before_ready` : `timeout`,
      );
    }
  };
  let updateObservabilityTelemetryFrameHealthHandler = (
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      !(
        updateObservabilityTelemetryFrameHealthResult2 !== null ||
        updateObservabilityTelemetryFrameHealthResult3 !== null
      )
    ) {
      count2 = timers.now();
      updateObservabilityTelemetryFrameHealthResult3 = timers.setTimeout(
        post3,
        amount2,
      );
    }
  };
  let updateObservabilityTelemetryFrameHealthHandler2 = (
    ..._extraArguments: unknown[]
  ): undefined => {
    if (updateObservabilityTelemetryFrameHealthResult3 !== null) {
      timers.clearTimeout(updateObservabilityTelemetryFrameHealthResult3);
      updateObservabilityTelemetryFrameHealthResult3 = null;
      amount2 = Math.max(
        observabilityTelemetryValue10002,
        amount2 - (timers.now() - count2),
      );
    }
  };
  try {
    timers.onVisibilityChange((..._extraArguments: unknown[]): undefined => {
      try {
        if (timers.visible()) {
          updateObservabilityTelemetryFrameHealthHandler();
        } else {
          updateObservabilityTelemetryFrameHealthHandler2();
        }
      } catch {}
    });
    if (timers.visible()) {
      updateObservabilityTelemetryFrameHealthHandler();
    }
  } catch {
    try {
      updateObservabilityTelemetryFrameHealthHandler();
    } catch {}
  }
  let report = (
    updateObservabilityTelemetryFrameHealth2?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      !resolveObservabilityTelemetryIncludes(
        updateObservabilityTelemetryFrameHealth2,
      )
    ) {
      warn(
        `action:${String(updateObservabilityTelemetryFrameHealth2).slice(0, 32)}`,
        `report() dropped: "${String(updateObservabilityTelemetryFrameHealth2).slice(0, 32)}" is not one of the generic verbs (${observabilityTelemetrySaveOpenRenderEditValues.join(`, `)})`,
      );
      return;
    }
    if (!uniqueItems.has(updateObservabilityTelemetryFrameHealth2)) {
      warn(
        `undeclared:${updateObservabilityTelemetryFrameHealth2}`,
        `report() dropped: "${updateObservabilityTelemetryFrameHealth2}" is not declared in artifact.json monitoring.coreActions for "${appKey}" — add it there so the schema, this module and the monitors agree`,
      );
      return;
    }
    if (!resolveObservabilityTelemetryIncludes2(options)) {
      warn(
        `outcome:${updateObservabilityTelemetryFrameHealth2}`,
        `report("${updateObservabilityTelemetryFrameHealth2}", …) dropped: outcome must be one of ${observabilityTelemetrySuccessFailureAbortedValues.join(`, `)}`,
      );
      return;
    }
    if (options !== `failure`) {
      post(updateObservabilityTelemetryFrameHealth2, options);
      return;
    }
    let context2: Dynamic = context ?? `unknown`;
    if (
      typeof context2 != `string` ||
      !observabilityTelemetryPattern.test(context2) ||
      observabilityTelemetrySet2.has(context2)
    ) {
      warn(
        `errorType:${updateObservabilityTelemetryFrameHealth2}`,
        `report("${updateObservabilityTelemetryFrameHealth2}", "failure", …): errorType must be a short snake_case token from ERROR_TYPES (never an error message); sent as "unknown"`,
      );
      context2 = `unknown`;
    } else {
      if (context2 === `malformed`) {
        warn(
          `errorType!:${updateObservabilityTelemetryFrameHealth2}`,
          `report("${updateObservabilityTelemetryFrameHealth2}", "failure", "${context2}"): "${context2}" is the viewer shell's own label for an unusable error type, not one an app reports; sent as "unknown"`,
        );
        context2 = `unknown`;
      } else {
        if (!observabilityTelemetrySet.has(context2)) {
          warn(
            `errorType?:${context2}`,
            `report("${updateObservabilityTelemetryFrameHealth2}", "failure", "${context2}"): "${context2}" is not an error type Frame's page-health route knows (choose from ERROR_TYPES: ${observabilityTelemetryConflictReadOnlyTooLargeInvalidContentValues.join(`, `)}); it is sent and counts as a failure, but Frame files it under "invalid" until its list gains it`,
          );
        }
      }
    }
    post(updateObservabilityTelemetryFrameHealth2, `failure`, context2);
  };
  post(`load`, `success`);
  return {
    version: ObservabilityTelemetryAppifactHealthV2,
    ready(..._extraArguments: unknown[]): undefined {
      if (updateObservabilityTelemetryFrameHealthResult2 === null) {
        if (updateObservabilityTelemetryFrameHealthResult3 !== null) {
          try {
            timers.clearTimeout(updateObservabilityTelemetryFrameHealthResult3);
          } catch {}
          updateObservabilityTelemetryFrameHealthResult3 = null;
        }
        post2(`success`);
      }
    },
    report: report,
    track: loadObservabilityTelemetryUnknown(report),
    crash(
      updateObservabilityTelemetryFrameHealth2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (!uniqueItems3.has(updateObservabilityTelemetryFrameHealth2)) {
        uniqueItems3.add(updateObservabilityTelemetryFrameHealth2);
        post(`crash`, `failure`, updateObservabilityTelemetryFrameHealth2);
      }
    },
    replay(..._extraArguments: unknown[]): undefined {
      post(`load`, `success`, undefined, true);
      for (let updateObservabilityTelemetryFrameHealthResult4 of uniqueItems3 as Dynamic)
        post(
          `crash`,
          `failure`,
          updateObservabilityTelemetryFrameHealthResult4,
          true,
        );
      if (updateObservabilityTelemetryFrameHealthResult2 !== null) {
        post(
          `ready`,
          updateObservabilityTelemetryFrameHealthResult2.outcome,
          updateObservabilityTelemetryFrameHealthResult2.errorType,
          true,
        );
      }
    },
  };
}

var ObservabilityTelemetryState: Dynamic;

var ObservabilityTelemetryState2: Dynamic;

var observabilityTelemetryValue_1: boolean;

function resolveObservabilityTelemetryValue(
  observabilityTelemetryValue?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let installObservabilityTelemetryPost2: Dynamic =
    installObservabilityTelemetryPost(observabilityTelemetryValue);
  try {
    (globalThis as Dynamic)[ObservabilityTelemetryAppifactHealth] =
      installObservabilityTelemetryPost2;
  } catch {}
  return installObservabilityTelemetryPost2;
}

function installObservabilityTelemetryPost(
  event?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (ObservabilityTelemetryState !== null) {
    if (
      ObservabilityTelemetryState2 !== event?.key &&
      !observabilityTelemetryValue_1
    ) {
      observabilityTelemetryValue_1 = true;
      resolveObservabilityTelemetryWarn(
        `init() was already called for "${ObservabilityTelemetryState2}"; the call for "${String(event?.key).slice(0, 32)}" returns that first handle`,
      );
    }
    return ObservabilityTelemetryState;
  }
  let observabilityTelemetryTest2 = resolveObservabilityTelemetryTest2(event);
  if (observabilityTelemetryTest2 !== null) {
    resolveObservabilityTelemetryWarn(
      `not reporting — ${observabilityTelemetryTest2}`,
    );
    ObservabilityTelemetryState = resolveObservabilityTelemetryVersion();
    ObservabilityTelemetryState2 =
      typeof event?.key == `string` ? event.key : null;
    return ObservabilityTelemetryState;
  }
  ObservabilityTelemetryState2 = event.key;
  if (!isObservabilityTelemetryParent()) {
    ObservabilityTelemetryState = resolveObservabilityTelemetryVersion();
    return ObservabilityTelemetryState;
  }
  let updateObservabilityTelemetryFrameHealth2: Dynamic =
    updateObservabilityTelemetryFrameHealth(event, {
      post: resolveObservabilityTelemetryPostMessage,
      setTimeout: (
        installObservabilityTelemetryPost2?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ) => window.setTimeout(installObservabilityTelemetryPost2, options),
      clearTimeout: (
        installObservabilityTelemetryPost2?: Dynamic,
        ..._extraArguments: unknown[]
      ) => window.clearTimeout(installObservabilityTelemetryPost2),
      now: (..._extraArguments: unknown[]) => performance.now(),
      visible: (..._extraArguments: unknown[]) =>
        document.visibilityState !== `hidden`,
      onVisibilityChange: (
        installObservabilityTelemetryPost2?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        document.addEventListener(
          `visibilitychange`,
          installObservabilityTelemetryPost2,
        ),
      warn: resolveObservabilityTelemetryWarn,
    });
  installObservabilityTelemetryError(
    (
      installObservabilityTelemetryPost2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      updateObservabilityTelemetryFrameHealth2.crash(
        installObservabilityTelemetryPost2,
      ),
  );
  installObservabilityTelemetryMessage(
    (..._extraArguments: unknown[]): Dynamic =>
      updateObservabilityTelemetryFrameHealth2.replay(),
  );
  ObservabilityTelemetryState = updateObservabilityTelemetryFrameHealth2;
  return ObservabilityTelemetryState;
}

function isObservabilityTelemetryParent(..._extraArguments: unknown[]) {
  try {
    return (
      typeof window !== "undefined" &&
      typeof location !== "undefined" &&
      window.parent !== window &&
      location.protocol === `https:`
    );
  } catch {
    return false;
  }
}

function resolveObservabilityTelemetryPostMessage(
  observabilityTelemetryPostMessage?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  window.parent.postMessage(observabilityTelemetryPostMessage, `*`);
}

function installObservabilityTelemetryMessage(
  installObservabilityTelemetryMessage2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  try {
    window.addEventListener(
      `message`,
      (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        try {
          if (event.source !== window.parent) return;
          let data: Dynamic = event.data;
          if (
            typeof data == `object` &&
            data &&
            data.__frame_health_poke === true
          ) {
            installObservabilityTelemetryMessage2();
          }
        } catch {}
      },
    );
  } catch {}
}

function resolveObservabilityTelemetryWarn(
  observabilityTelemetryWarn?: unknown,
  ..._extraArguments: unknown[]
): void {
  try {
    if (typeof console !== "undefined") {
      console.warn(
        `[${ObservabilityTelemetryAppifactHealthV2}] ${observabilityTelemetryWarn}`,
      );
    }
  } catch {}
}

function installObservabilityTelemetryError(
  installObservabilityTelemetryError2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  try {
    window.addEventListener(
      `error`,
      (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        try {
          if (event instanceof (ErrorEvent as Dynamic)) {
            if (resolveObservabilityTelemetryTest(event.message)) return;
            installObservabilityTelemetryError2(
              isObservabilityTelemetryChunkLoadError(event.error)
                ? `chunk_load`
                : `uncaught_error`,
            );
            return;
          }
          let target: Dynamic = event.target;
          if (
            target instanceof (HTMLScriptElement as Dynamic) ||
            (target instanceof (HTMLLinkElement as Dynamic) &&
              /(^|\s)(stylesheet|modulepreload)(\s|$)/i.test(target.rel))
          ) {
            installObservabilityTelemetryError2(`chunk_load`);
          }
        } catch {}
      },
      true,
    );
    window.addEventListener(
      `unhandledrejection`,
      (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        try {
          installObservabilityTelemetryError2(
            isObservabilityTelemetryChunkLoadError(event.reason)
              ? `chunk_load`
              : `unhandled_rejection`,
          );
        } catch {}
      },
    );
  } catch {}
}

var resolveObservabilityTelemetryValue2: Dynamic;

var ObservabilityTelemetryNull: Dynamic;

var ObservabilityTelemetryBigint: Readonly<
  Partial<Record<JavaScriptType, TelemetryValueKind>>
>;

function resolveObservabilityTelemetryNull(
  observabilityTelemetryNull?: unknown,
  ..._extraArguments: unknown[]
): TelemetryValueKind {
  if (observabilityTelemetryNull === null) return `null`;
  if (observabilityTelemetryNull === undefined) return `undef`;
  let ObservabilityTelemetryBigintItem =
    ObservabilityTelemetryBigint[typeof observabilityTelemetryNull];
  if (ObservabilityTelemetryBigintItem !== undefined)
    return ObservabilityTelemetryBigintItem;
  try {
    let callSlice = Object.prototype.toString
      .call(observabilityTelemetryNull)
      .slice(8, -1);
    if (callSlice === `DOMException`) return `domx`;
    if (callSlice === `Error` || observabilityTelemetryNull instanceof Error)
      return `errsub`;
    if (callSlice === `Response`) return `response`;
    if (callSlice.endsWith(`Event`)) return `event`;
  } catch {}
  return `obj`;
}

var ObservabilityTelemetryNotsupported: Dynamic;

var ObservabilityTelemetryNotSupportedError: Dynamic;

function resolveObservabilityTelemetryUnlisted(
  observabilityTelemetryUnlisted?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  try {
    let name: Dynamic = observabilityTelemetryUnlisted?.name;
    return typeof name == `string` &&
      Object.hasOwn(ObservabilityTelemetryNotSupportedError, name)
      ? ObservabilityTelemetryNotSupportedError[name]
      : `unlisted`;
  } catch {
    return `unlisted`;
  }
}

function resolveObservabilityTelemetryMessage(
  observabilityTelemetryMessage?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  try {
    let {
      message: message,
      filename: filename,
      lineno: lineno,
      colno: colno,
    }: Dynamic = observabilityTelemetryMessage;
    return {
      message: message,
      filename: filename,
      lineno: lineno,
      colno: colno,
    };
  } catch {
    return {};
  }
}

function resolveObservabilityTelemetryMessage2(
  observabilityTelemetryMessage2?: Dynamic,
  error?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    observabilityTelemetryMessage2 == null &&
    (error.message === `Script error.` || error.message === ``) &&
    (typeof error.filename != `string` || error.filename === ``) &&
    error.lineno === 0
  );
}

var ObservabilityTelemetryBlob: Dynamic;

var observabilityTelemetryUrlPattern: RegExp;

function resolveObservabilityTelemetryBlob(
  observabilityTelemetryBlob?: unknown,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (
    typeof observabilityTelemetryBlob != `string` ||
    observabilityTelemetryBlob === ``
  )
    return `nof`;
  let observabilityTelemetryBlobSlice = observabilityTelemetryBlob.slice(
    0,
    2048,
  );
  let normalizedObservabilityTelemetryBlobSliceSlice =
    observabilityTelemetryBlobSlice.slice(0, 32).toLowerCase();
  return normalizedObservabilityTelemetryBlobSliceSlice.startsWith(`blob:`)
    ? `blob`
    : normalizedObservabilityTelemetryBlobSliceSlice.startsWith(`data:`)
      ? `data`
      : observabilityTelemetryUrlPattern.test(
            normalizedObservabilityTelemetryBlobSliceSlice,
          )
        ? `ext`
        : normalizedObservabilityTelemetryBlobSliceSlice.startsWith(`about:`) ||
            (options.doc !== undefined &&
              observabilityTelemetryBlobSlice.split(`#`, 1)[0] === options.doc)
          ? `inl`
          : options.origins.some(
                (origin?: Dynamic, ..._extraArguments: unknown[]) =>
                  origin !== `` &&
                  origin !== `null` &&
                  observabilityTelemetryBlobSlice.startsWith(`${origin}/`),
              )
            ? `bun`
            : `frn`;
}

var ObservabilityTelemetryState3: Dynamic;

var ObservabilityTelemetryState4: Dynamic;

function resolveObservabilityTelemetryThrown(
  observabilityTelemetryThrown?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let thrown = resolveObservabilityTelemetryNull(observabilityTelemetryThrown);
  return {
    thrown: thrown,
    ...(thrown === `domx` && options === `unknown`
      ? {
          dx: resolveObservabilityTelemetryUnlisted(
            observabilityTelemetryThrown,
          ),
        }
      : {}),
    ...(context === undefined
      ? {}
      : {
          opaque: resolveObservabilityTelemetryMessage2(
            observabilityTelemetryThrown,
            context,
          )
            ? `yes`
            : `no`,
          srcKind: resolveObservabilityTelemetryBlob(
            context.filename,
            dependencies,
          ),
        }),
    ...(dependencies.ownerOf
      ? {
          src: dependencies.ownerOf(
            context?.filename,
            observabilityTelemetryThrown,
          ),
        }
      : {}),
  };
}

function resolveObservabilityTelemetryThrown2(
  observabilityTelemetryThrown2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return ObservabilityTelemetryNull(observabilityTelemetryThrown2.thrown)
    ? {
        thrown: observabilityTelemetryThrown2.thrown,
        ...(observabilityTelemetryThrown2.thrown === `domx` &&
        options === `unknown` &&
        ObservabilityTelemetryNotsupported(observabilityTelemetryThrown2.dx)
          ? {
              dx: observabilityTelemetryThrown2.dx,
            }
          : {}),
        ...(observabilityTelemetryThrown2.opaque === `yes` ||
        observabilityTelemetryThrown2.opaque === `no`
          ? {
              opaque: observabilityTelemetryThrown2.opaque,
            }
          : {}),
        ...(ObservabilityTelemetryBlob(observabilityTelemetryThrown2.srcKind)
          ? {
              srcKind: observabilityTelemetryThrown2.srcKind,
            }
          : {}),
        ...(ObservabilityTelemetryState3(observabilityTelemetryThrown2.src)
          ? {
              src: observabilityTelemetryThrown2.src,
            }
          : {}),
      }
    : {};
}

function filterObservabilityTelemetryJoin(
  filterObservabilityTelemetryJoin2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return [
    filterObservabilityTelemetryJoin2,
    options,
    context,
    dependencies.msgKind,
    dependencies.thrown,
    dependencies.opaque === `yes` ? `opq` : undefined,
    dependencies.src,
    dependencies.inflight,
  ]
    .filter(
      (item?: Dynamic, ..._extraArguments: unknown[]) => item !== undefined,
    )
    .join(`:`);
}

var observabilityTelemetryUrlPattern2: RegExp;

var observabilityTelemetryPattern6: RegExp;

function isObservabilityTelemetryStack(
  observabilityTelemetryStack?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  let isObservabilityTelemetryStackResult: Dynamic;
  try {
    isObservabilityTelemetryStackResult =
      typeof observabilityTelemetryStack == `object` &&
      observabilityTelemetryStack
        ? observabilityTelemetryStack.stack
        : undefined;
  } catch {
    return false;
  }
  if (typeof isObservabilityTelemetryStackResult != `string`) return false;
  for (let isObservabilityTelemetryStackResult2 of isObservabilityTelemetryStackResult
    .slice(0, 2e3)
    .split(
      `
`,
      12,
    ) as Dynamic)
    if (
      observabilityTelemetryPattern6.test(isObservabilityTelemetryStackResult2)
    )
      return observabilityTelemetryUrlPattern2.test(
        isObservabilityTelemetryStackResult2,
      );
  return false;
}

var ObservabilityTelemetryOrigins: Dynamic;

function resolveObservabilityTelemetryOpaque(
  observabilityTelemetryOpaque?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return resolveObservabilityTelemetryMessage2(
    observabilityTelemetryOpaque,
    options,
  )
    ? `opaque`
    : resolveObservabilityTelemetryBlob(
          options.filename,
          ObservabilityTelemetryOrigins,
        ) === `ext` ||
        isObservabilityTelemetryStack(observabilityTelemetryOpaque)
      ? `extension`
      : null;
}

function resolveObservabilityTelemetryExtension(
  observabilityTelemetryExtension?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return isObservabilityTelemetryStack(observabilityTelemetryExtension)
    ? `extension`
    : null;
}

var ObservabilityTelemetryState5: symbol;

function installObservabilityTelemetryAttach(
  installObservabilityTelemetry?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let installObservabilityTelemetryAttachResult: Dynamic = null;
  try {
    installObservabilityTelemetry.addEventListener(
      `error`,
      (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        try {
          installObservabilityTelemetryAttachResult =
            `error` in event || `message` in event
              ? resolveObservabilityTelemetryOpaque(
                  event.error,
                  resolveObservabilityTelemetryMessage(event),
                )
              : null;
        } catch {
          installObservabilityTelemetryAttachResult = null;
        }
      },
      true,
    );
    installObservabilityTelemetry.addEventListener(
      `unhandledrejection`,
      (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        try {
          installObservabilityTelemetryAttachResult =
            resolveObservabilityTelemetryExtension(event.reason);
        } catch {
          installObservabilityTelemetryAttachResult = null;
        }
      },
    );
  } catch {}
  return {
    attach(
      installObservabilityTelemetry2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let installObservabilityTelemetry3: Dynamic =
        installObservabilityTelemetry2;
      if (
        !installObservabilityTelemetry3 ||
        typeof installObservabilityTelemetry3.crash != `function` ||
        installObservabilityTelemetry3[ObservabilityTelemetryState5]
      )
        return;
      let bind: Dynamic = installObservabilityTelemetry3.crash.bind(
        installObservabilityTelemetry3,
      );
      try {
        installObservabilityTelemetry3.crash = (
          installObservabilityTelemetry4?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          bind(
            (installObservabilityTelemetry4 === `uncaught_error` ||
              installObservabilityTelemetry4 === `unhandled_rejection`) &&
              installObservabilityTelemetryAttachResult !== null
              ? installObservabilityTelemetryAttachResult
              : installObservabilityTelemetry4,
          );
        installObservabilityTelemetry3[ObservabilityTelemetryState5] = true;
      } catch {}
    },
  };
}

var ObservabilityTelemetryKey: {
    key: string;
    monitoring: {
        alertChannel: string;
        coreActions: string[];
        readyTimeoutS: number;
    };
};

function resolveObservabilityTelemetryReady(
  observabilityTelemetryReady: Dynamic = globalThis,
  ..._extraArguments: unknown[]
): Dynamic {
  let resolveObservabilityTelemetryReadyResult: Dynamic;
  try {
    resolveObservabilityTelemetryReadyResult =
      observabilityTelemetryReady[ObservabilityTelemetryAppifactHealth];
  } catch {
    return null;
  }
  if (
    typeof resolveObservabilityTelemetryReadyResult != `object` ||
    !resolveObservabilityTelemetryReadyResult
  )
    return null;
  let resolveObservabilityTelemetryReadyResult2: Dynamic =
    resolveObservabilityTelemetryReadyResult;
  return typeof resolveObservabilityTelemetryReadyResult2.ready != `function` ||
    typeof resolveObservabilityTelemetryReadyResult2.report != `function` ||
    typeof resolveObservabilityTelemetryReadyResult2.version != `string` ||
    !resolveObservabilityTelemetryReadyResult2.version.startsWith(
      `appifact-health:`,
    )
    ? null
    : resolveObservabilityTelemetryReadyResult;
}

function resolveObservabilityTelemetryValue3(
  observabilityTelemetryValue33: Dynamic = globalThis,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    resolveObservabilityTelemetryReady(observabilityTelemetryValue33) ??
    resolveObservabilityTelemetryValue(ObservabilityTelemetryKey)
  );
}

var ObservabilityTelemetryState6: Dynamic;

var ObservabilityTelemetryState7: Dynamic;

var ObservabilityTelemetryArtifactTypeLfileRuntime35524228Js: string;

var resolveObservabilityTelemetryValue4: Dynamic;

function resolveObservabilityTelemetryMark(
  ..._extraArguments: unknown[]
): undefined {
  try {
    if (
      typeof performance == `object` &&
      performance !== null &&
      typeof performance.mark == `function`
    ) {
      performance.mark(`pages:runtimeAsk`);
    }
  } catch {}
}

var ObservabilityTelemetryKeepalive: {
    keepalive: boolean;
};

async function loadObservabilityTelemetryStatus(
  observabilityTelemetryStatus?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let response = await fetch(observabilityTelemetryStatus, options);
  if (!response.ok)
    throw Error(
      `lfile runtime file ${observabilityTelemetryStatus}: ${response.status}`,
    );
  let uint8Array = new Uint8Array(await response.arrayBuffer());
  if (uint8Array.byteLength === 0)
    throw Error(
      `lfile runtime file ${observabilityTelemetryStatus}: empty body`,
    );
  return uint8Array;
}

function installObservabilityTelemetryEarlyDrainFailed(
  installObservabilityTelemetryEarlyDrainFailed2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return new (Promise as Dynamic)(
    (
      resolve?: Dynamic,
      reject?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let w10: Dynamic = installObservabilityTelemetryEarlyDrainFailed2.w;
      let Error2 = (
        installObservabilityTelemetryEarlyDrainFailed3?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        terminate();
        let data: Dynamic = installObservabilityTelemetryEarlyDrainFailed3.data;
        let b10: Dynamic = typeof data == `object` && data ? data.b : undefined;
        if (b10 instanceof ArrayBuffer && b10.byteLength > 0) {
          resolve(new Uint8Array(b10));
        } else {
          reject(Error(`early drain: no bytes`));
        }
      };
      let Error3 = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        event.preventDefault();
        terminate();
        reject(Error(`early drain failed`));
      };
      let terminate = (..._extraArguments: unknown[]): undefined => {
        w10.removeEventListener(`message`, Error2);
        w10.removeEventListener(`error`, Error3);
        w10.terminate();
      };
      w10.addEventListener(`message`, Error2);
      w10.addEventListener(`error`, Error3);
      try {
        w10.postMessage(new URL(options, document.baseURI).href);
      } catch (installObservabilityTelemetryEarlyDrainFailedResult: Dynamic) {
        terminate();
        reject(
          installObservabilityTelemetryEarlyDrainFailedResult instanceof Error
            ? installObservabilityTelemetryEarlyDrainFailedResult
            : Error(`early drain refused`),
        );
      }
    },
  );
}

var observabilityTelemetryState: Dynamic;

function resolveObservabilityTelemetryCache(
  ..._extraArguments: unknown[]
): Dynamic {
  if (observabilityTelemetryState === undefined) {
    let ObservabilityTelemetryArtifactTypeLfileRuntime35524228Js2 =
      ObservabilityTelemetryArtifactTypeLfileRuntime35524228Js;
    resolveObservabilityTelemetryMark();
    let helloTImport2: Dynamic = helloTImport();
    observabilityTelemetryState = (
      helloTImport2 === null
        ? loadObservabilityTelemetryStatus(
            ObservabilityTelemetryArtifactTypeLfileRuntime35524228Js2,
            ObservabilityTelemetryKeepalive,
          )
        : installObservabilityTelemetryEarlyDrainFailed(
            helloTImport2,
            ObservabilityTelemetryArtifactTypeLfileRuntime35524228Js2,
          )
    )
      .catch((..._extraArguments: unknown[]) =>
        loadObservabilityTelemetryStatus(
          ObservabilityTelemetryArtifactTypeLfileRuntime35524228Js2,
        ),
      )
      .catch((..._extraArguments: unknown[]) =>
        loadObservabilityTelemetryStatus(
          ObservabilityTelemetryArtifactTypeLfileRuntime35524228Js2,
          {
            cache: `reload`,
          },
        ),
      )
      .then(
        (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
          helloImport(`runtimeWarm`, {
            runtimeChars: result.byteLength,
          }),
          result
        ),
      )
      .catch((error?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        throw ((observabilityTelemetryState = undefined), error);
      });
  }
  return observabilityTelemetryState;
}

function isObservabilityTelemetryCatch(..._extraArguments: unknown[]) {
  try {
    return resolveObservabilityTelemetryValue4()
      ? (resolveObservabilityTelemetryCache().catch(
          (..._extraArguments: unknown[]): undefined => {},
        ),
        true)
      : (helloWImport(), false);
  } catch {
    return false;
  }
}

var TELEMETRY_ATTRIBUTE_NAMES: Dynamic;

var ObservabilityTelemetrySENTRYDSNSERVER: Dynamic;

var resolveObservabilityTelemetryValue5: (...observabilityTelemetryValue5: Dynamic[]) => undefined;

var setDdUser: Dynamic;

var ddLog: Dynamic;

var reportBoundaryError: Dynamic;

var ObservabilityTelemetrySetTag: Dynamic;

var setTraceUser: Dynamic;

function withWebSpan(
  withWebSpan2?: unknown,
  options?: unknown,
  context?: Dynamic,
  dependencies?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  return Promise.resolve(context(ObservabilityTelemetrySetTag, undefined));
}

var injectTraceparent: Dynamic;

function routePattern(
  routePattern2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (routePattern2.split(`?`)[0] ?? routePattern2)
    .split(`/`)
    .map(
      (items?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        !items || items === `api` || /^(v\d+|main|live)$/.test(items)
          ? items
          : /^[0-9a-f]{8,}$/i.test(items) || /^\d+$/.test(items)
            ? `:id`
            : /%[0-9a-f]{2}/i.test(items)
              ? `*`
              : /\d/.test(items)
                ? `:id`
                : /^[a-z][a-z_-]*$/i.test(items) && items.length <= 24
                  ? items
                  : `*`,
    )
    .join(`/`);
}

var observabilityTelemetryValue0: number;

var observabilityTelemetrySet3: Dynamic;

function resolveObservabilityTelemetryIsFinite(
  observabilityTelemetryIsFinite?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let round =
    Number.isFinite(observabilityTelemetryIsFinite) &&
    observabilityTelemetryIsFinite > 0
      ? Math.round(observabilityTelemetryIsFinite)
      : 0;
  if (round !== observabilityTelemetryValue0) {
    observabilityTelemetryValue0 = round;
    for (let resolveObservabilityTelemetryIsFiniteResult of Array.from<Dynamic>(
      observabilityTelemetrySet3,
    ) as Dynamic)
      resolveObservabilityTelemetryIsFiniteResult();
  }
}

var resolveObservabilityTelemetryValue6: Dynamic;

function clearObservabilityTelemetryDelete(
  clearObservabilityTelemetryDelete2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  observabilityTelemetrySet3.add(clearObservabilityTelemetryDelete2);
  return (..._extraArguments: unknown[]): undefined =>
    void observabilityTelemetrySet3.delete(clearObservabilityTelemetryDelete2);
}

var ObservabilityTelemetryToldGapClosed: {
    "told.gapClosed": string[];
    "told.gapEpisode": string[];
    "told.gapAbandoned": string[];
    "heal.stall": string[];
    "heal.order": string[];
    "heal.reissue": string[];
    "write.pageBusy": string[];
    "ack.allow": string[];
};

var ObservabilityTelemetryRebaseDropped: {
    "rebase.dropped": string[];
    "rebase.bailed": string[];
    "flush.cutEraseSatisfied": string[];
    "refuse.loud": string[];
    "refuse.quiet": string[];
    "step.threw": string[];
    "wedge.flush": string[];
    "carry.fail": string[];
    "iframe.crash": string[];
    "iframe.crashIdle": string[];
    "iframe.crashBlock": string[];
    "widget.fault": string[];
};

var ObservabilityTelemetryWidgetFault: string;

function resolveObservabilityTelemetryValue7(
  observabilityTelemetryValue7?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return observabilityTelemetryValue7 === `wdg` ||
    observabilityTelemetryValue7 === `mm`
    ? `iframe.crashBlock`
    : options === `ifl`
      ? `iframe.crash`
      : `iframe.crashIdle`;
}

var ObservabilityTelemetryHost: Dynamic;

var ObservabilityTelemetryState8: number;

var resolveObservabilityTelemetryValue8: (observabilityTelemetryValue8?: Dynamic, ..._extraArguments: unknown[]) => string;

function updateObservabilityTelemetryObserve(
  updateObservabilityTelemetryObserve2?: Dynamic,
  options: Dynamic = 20,
  ..._extraArguments: unknown[]
): Dynamic {
  let lookup: Dynamic = new (Map as Dynamic)();
  return {
    observe(
      updateObservabilityTelemetryObserve3?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let ObservabilityTelemetryHostItem: Dynamic =
        ObservabilityTelemetryHost[options2];
      for (let updateObservabilityTelemetryObserveResult of updateObservabilityTelemetryObserve3 as Dynamic) {
        if (
          typeof updateObservabilityTelemetryObserveResult != `object` ||
          !updateObservabilityTelemetryObserveResult
        )
          continue;
        let name: Dynamic = updateObservabilityTelemetryObserveResult.name;
        if (typeof name != `string`) continue;
        let tuple2: Dynamic = ObservabilityTelemetryHostItem[name];
        if (tuple2 === undefined) continue;
        let observabilityTelemetryValue8 =
          resolveObservabilityTelemetryValue8(tuple2);
        let lookupEntry: Dynamic = lookup.get(observabilityTelemetryValue8);
        if (lookupEntry === undefined) {
          lookup.set(observabilityTelemetryValue8, {
            tuple: tuple2,
            n: 1,
          });
        } else {
          lookupEntry.n += 1;
        }
      }
    },
    flush(..._extraArguments: unknown[]): Dynamic {
      if (lookup.size === 0) return null;
      let record2: Dynamic = {};
      for (let [
        updateObservabilityTelemetryObserveResult,
        {
          tuple: updateObservabilityTelemetryObserveResult2,
          n: updateObservabilityTelemetryObserveResult3,
        },
      ] of lookup as Dynamic) {
        let min = Math.min(updateObservabilityTelemetryObserveResult3, options);
        record2[updateObservabilityTelemetryObserveResult] = min;
        for (let index = 0; index < min; index++)
          updateObservabilityTelemetryObserve2(
            updateObservabilityTelemetryObserveResult2[0],
            updateObservabilityTelemetryObserveResult2[1],
            updateObservabilityTelemetryObserveResult2[2],
          );
      }
      lookup = new (Map as Dynamic)();
      return record2;
    },
  };
}

var ObservabilityTelemetryState9: Dynamic;

function installObservabilityTelemetryPagehide(
  installObservabilityTelemetryPagehide2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (!(typeof window === "undefined")) {
    if (ObservabilityTelemetryState9 === null) {
      let updateObservabilityTelemetryObserve2: Dynamic =
        updateObservabilityTelemetryObserve(
          (
            installObservabilityTelemetryPagehide3?: Dynamic,
            options2?: Dynamic,
            context?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            ObservabilityTelemetryState7.report(
              installObservabilityTelemetryPagehide3,
              options2,
              context,
            ),
        );
      ObservabilityTelemetryState9 = updateObservabilityTelemetryObserve2;
      window.setInterval(
        (..._extraArguments: unknown[]): Dynamic =>
          updateObservabilityTelemetryObserve2.flush(),
        ObservabilityTelemetryState8,
      );
      window.addEventListener(
        `pagehide`,
        (..._extraArguments: unknown[]): Dynamic =>
          updateObservabilityTelemetryObserve2.flush(),
      );
    }
    ObservabilityTelemetryState9.observe(
      installObservabilityTelemetryPagehide2,
      options,
    );
  }
}

function resolveObservabilityTelemetryReady2(
  observabilityTelemetryReady2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let weakSet: Dynamic = new (WeakSet as Dynamic)();
  let weakSet2: Dynamic = new (WeakSet as Dynamic)();
  let enabled = false;
  let enabled2 = false;
  return {
    ready(
      observabilityTelemetryReady22?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        !(
          observabilityTelemetryReady22 == null ||
          weakSet.has(observabilityTelemetryReady22)
        )
      ) {
        weakSet.add(observabilityTelemetryReady22);
        observabilityTelemetryReady2.ready();
        observabilityTelemetryReady2.report(`open`, `success`);
        observabilityTelemetryReady2.report(`render`, `success`);
      }
    },
    failed(
      observabilityTelemetryReady22?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        !(
          observabilityTelemetryReady22 == null ||
          weakSet2.has(observabilityTelemetryReady22)
        )
      ) {
        weakSet2.add(observabilityTelemetryReady22);
        observabilityTelemetryReady2.report(`open`, `failure`, `internal`);
      }
    },
    shellUnanswered(..._extraArguments: unknown[]): undefined {
      if (!enabled) {
        enabled = true;
        if (!enabled2) {
          observabilityTelemetryReady2.report(
            `open`,
            `failure`,
            `capability_error`,
          );
        }
      }
    },
    bootGaveUp(
      observabilityTelemetryReady22?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (!enabled2) {
        enabled2 = true;
        if (!enabled) {
          observabilityTelemetryReady2.report(
            `open`,
            `failure`,
            observabilityTelemetryReady22,
          );
        }
      }
    },
  };
}

var ObservabilityTelemetryState10: Dynamic;

function resolveObservabilityTelemetryReady3(
  observabilityTelemetryReady3?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  ObservabilityTelemetryState10.ready(observabilityTelemetryReady3);
}

function resolveObservabilityTelemetryFailed(
  observabilityTelemetryFailed?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  ObservabilityTelemetryState10.failed(observabilityTelemetryFailed);
}

function resolveObservabilityTelemetryShellUnanswered(
  ..._extraArguments: unknown[]
): undefined {
  ObservabilityTelemetryState10.shellUnanswered();
}

function resolveObservabilityTelemetryBootGaveUp(
  observabilityTelemetryBootGaveUp?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  ObservabilityTelemetryState10.bootGaveUp(observabilityTelemetryBootGaveUp);
}

var ObservabilityTelemetry259dc54003a391cffb50b52b94c913ed15d92d1c: string;

function isObservabilityTelemetryValue(
  observabilityTelemetryValue?: Dynamic,
  options: Dynamic = ObservabilityTelemetry259dc54003a391cffb50b52b94c913ed15d92d1c,
  ..._extraArguments: unknown[]
) {
  return (
    !!observabilityTelemetryValue &&
    !!options &&
    observabilityTelemetryValue !== options
  );
}

var ObservabilityTelemetryPagesBootOrdinal: string;

var ObservabilityTelemetryPagesBootSession: string;

var observabilityTelemetryPattern7: RegExp;

var observabilityTelemetryPattern8: RegExp;

function resolveObservabilityTelemetryTest3(
  observabilityTelemetryTest3?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (
    !observabilityTelemetryPattern8.test(observabilityTelemetryTest3) ||
    options === undefined
  )
    return 0;
  let observabilityTelemetryTest3Slice: Dynamic =
    observabilityTelemetryTest3.slice(0, 12);
  try {
    let match = observabilityTelemetryPattern7.exec(
      options.getItem(`pages.boot.ordinal`) ?? ``,
    );
    let min =
      match !== null && match[1] === observabilityTelemetryTest3Slice
        ? Math.min(9, Number(match[2]) + 1)
        : 1;
    options.setItem(
      ObservabilityTelemetryPagesBootOrdinal,
      `${observabilityTelemetryTest3Slice}:${min}`,
    );
    return min;
  } catch {
    return 0;
  }
}

var observabilityTelemetryPattern9: RegExp;

function resolveObservabilityTelemetryGetItem(
  observabilityTelemetryGetItem?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (observabilityTelemetryGetItem === undefined) return 0;
  try {
    let item: Dynamic =
      observabilityTelemetryGetItem.getItem(`pages.boot.session`) ?? ``;
    let min = observabilityTelemetryPattern9.test(item)
      ? Math.min(9, Number(item) + 1)
      : 1;
    observabilityTelemetryGetItem.setItem(
      ObservabilityTelemetryPagesBootSession,
      String(min),
    );
    return min;
  } catch {
    return 0;
  }
}

var observabilityTelemetryPattern10: RegExp;

function isObservabilityTelemetryCache(
  observabilityTelemetryCache?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (observabilityTelemetryCache.deliveryType === `cache`) return true;
  let transferSize: Dynamic = observabilityTelemetryCache.transferSize;
  if (typeof transferSize != `number` || !Number.isFinite(transferSize)) return;
  if (transferSize > 0) return false;
  let decodedBodySize: Dynamic = observabilityTelemetryCache.decodedBodySize;
  return typeof decodedBodySize == `number` && decodedBodySize > 0
    ? true
    : undefined;
}

function resolveObservabilityTelemetryName(
  observabilityTelemetryName?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let index = 0;
  let enabled = false;
  for (let resolveObservabilityTelemetryNameResult of observabilityTelemetryName as Dynamic) {
    if (
      typeof resolveObservabilityTelemetryNameResult.name != `string` ||
      !observabilityTelemetryPattern10.test(
        resolveObservabilityTelemetryNameResult.name,
      )
    )
      continue;
    index++;
    let isObservabilityTelemetryCache2 = isObservabilityTelemetryCache(
      resolveObservabilityTelemetryNameResult,
    );
    if (isObservabilityTelemetryCache2 === false) return 0;
    if (isObservabilityTelemetryCache2 === undefined) {
      enabled = true;
    }
  }
  return index === 0 || enabled ? undefined : 1;
}

var resolveObservabilityTelemetryIsInteger: Dynamic;

function resolveObservabilityTelemetryOrdinal(
  observabilityTelemetryOrdinal?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return `${resolveObservabilityTelemetryIsInteger(observabilityTelemetryOrdinal.ordinal, 9)}${observabilityTelemetryOrdinal.cachedJs === 1 ? `c` : observabilityTelemetryOrdinal.cachedJs === 0 ? `n` : `u`}${resolveObservabilityTelemetryIsInteger(observabilityTelemetryOrdinal.session, 9)}`;
}

function resolveObservabilityTelemetryValue9(..._extraArguments: unknown[]) {
  try {
    return typeof localStorage == `object` && localStorage !== null
      ? localStorage
      : undefined;
  } catch {
    return;
  }
}

function resolveObservabilityTelemetryValue10(..._extraArguments: unknown[]) {
  try {
    return typeof sessionStorage == `object` && sessionStorage !== null
      ? sessionStorage
      : undefined;
  } catch {
    return;
  }
}

function resolveObservabilityTelemetryResource(
  ..._extraArguments: unknown[]
): Dynamic {
  try {
    return typeof performance == `object` &&
      performance !== null &&
      typeof performance.getEntriesByType == `function`
      ? performance.getEntriesByType(`resource`)
      : [];
  } catch {
    return [];
  }
}

var observabilityTelemetryState2: Dynamic;

function resolveObservabilityTelemetryOrdinal2(
  ..._extraArguments: unknown[]
): Dynamic {
  if (observabilityTelemetryState2 !== undefined)
    return observabilityTelemetryState2;
  let cachedJs = resolveObservabilityTelemetryName(
    resolveObservabilityTelemetryResource(),
  );
  observabilityTelemetryState2 = {
    ordinal: resolveObservabilityTelemetryTest3(
      ObservabilityTelemetry259dc54003a391cffb50b52b94c913ed15d92d1c,
      resolveObservabilityTelemetryValue9(),
    ),
    ...(cachedJs === undefined
      ? {}
      : {
          cachedJs: cachedJs,
        }),
    session: resolveObservabilityTelemetryGetItem(
      resolveObservabilityTelemetryValue10(),
    ),
  };
  return observabilityTelemetryState2;
}

var ObservabilityTelemetryPreload: string[][];

function isObservabilityTelemetryValue2(
  observabilityTelemetryValue2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (observabilityTelemetryValue2 === `unl`) return true;
  for (let [
    ,
    isObservabilityTelemetryValue2Result,
  ] of ObservabilityTelemetryPreload as Dynamic)
    if (isObservabilityTelemetryValue2Result === observabilityTelemetryValue2)
      return true;
  return false;
}

var resolveObservabilityTelemetryValue11: Dynamic;

var observabilityTelemetryValue2048: number;

var observabilityTelemetryValue96: number;

var observabilityTelemetryPattern11: RegExp;

var observabilityTelemetryPattern12: RegExp;

function resolveObservabilityTelemetryValue12(
  observabilityTelemetryValue12?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let observabilityTelemetrySlice = resolveObservabilityTelemetrySlice(
    observabilityTelemetryValue12,
  );
  return (
    (observabilityTelemetrySlice === undefined
      ? undefined
      : (resolveObservabilityTelemetryValue11(observabilityTelemetrySlice[0]) ??
        (observabilityTelemetrySlice[1] === undefined
          ? undefined
          : resolveObservabilityTelemetryValue11(
              observabilityTelemetrySlice[1],
            )))) ?? `unl`
  );
}

function resolveObservabilityTelemetrySlice(
  observabilityTelemetrySlice?: unknown,
  ..._extraArguments: unknown[]
) {
  if (typeof observabilityTelemetrySlice != `string`) return;
  let observabilityTelemetrySliceSlice = observabilityTelemetrySlice.slice(
    0,
    observabilityTelemetryValue2048,
  );
  let observabilityTelemetrySliceSliceIndex =
    observabilityTelemetrySliceSlice.indexOf(`#`);
  if (observabilityTelemetrySliceSliceIndex === -1) {
    observabilityTelemetrySliceSliceIndex =
      observabilityTelemetrySliceSlice.length;
  }
  let observabilityTelemetrySliceSliceIndex2 =
    observabilityTelemetrySliceSlice.indexOf(`?`);
  if (
    observabilityTelemetrySliceSliceIndex2 !== -1 &&
    observabilityTelemetrySliceSliceIndex2 <
      observabilityTelemetrySliceSliceIndex
  ) {
    observabilityTelemetrySliceSliceIndex =
      observabilityTelemetrySliceSliceIndex2;
  }
  let observabilityTelemetrySliceSliceSlice =
    observabilityTelemetrySliceSlice.slice(
      observabilityTelemetrySliceSlice.lastIndexOf(
        `/`,
        observabilityTelemetrySliceSliceIndex - 1,
      ) + 1,
      observabilityTelemetrySliceSliceIndex,
    );
  if (
    observabilityTelemetrySliceSliceSlice.length > observabilityTelemetryValue96
  )
    return;
  let observabilityTelemetrySliceSliceSliceSlice =
    observabilityTelemetrySliceSliceSlice.endsWith(`.js`)
      ? observabilityTelemetrySliceSliceSlice.slice(0, -3)
      : observabilityTelemetrySliceSliceSlice.endsWith(`.mjs`)
        ? observabilityTelemetrySliceSliceSlice.slice(0, -4)
        : undefined;
  if (observabilityTelemetrySliceSliceSliceSlice === undefined) return;
  let difference = observabilityTelemetrySliceSliceSliceSlice.length - 9;
  if (difference < 0)
    return [observabilityTelemetrySliceSliceSliceSlice, undefined];
  let observabilityTelemetrySliceSliceSliceSliceSlice =
    observabilityTelemetrySliceSliceSliceSlice.slice(difference + 1);
  return [
    observabilityTelemetrySliceSliceSliceSlice,
    (observabilityTelemetrySliceSliceSliceSlice[difference] === `-` &&
      observabilityTelemetryPattern11.test(
        observabilityTelemetrySliceSliceSliceSliceSlice,
      )) ||
    (observabilityTelemetrySliceSliceSliceSlice[difference] === `.` &&
      observabilityTelemetryPattern12.test(
        observabilityTelemetrySliceSliceSliceSliceSlice,
      ))
      ? observabilityTelemetrySliceSliceSliceSlice.slice(0, difference)
      : undefined,
  ];
}

function isObservabilityTelemetryEndsWith(
  items?: unknown,
  options?: unknown,
  ..._extraArguments: unknown[]
) {
  if (
    typeof items != `string` ||
    !items.endsWith(`/`) ||
    typeof options != `string`
  )
    return false;
  let optionsSlice = options.slice(0, observabilityTelemetryValue2048);
  return (
    optionsSlice.startsWith(items) && !optionsSlice.includes(`/`, items.length)
  );
}

var observabilityTelemetryValue2000000: number;

var observabilityTelemetryValue32000000: number;

var observabilityTelemetryValue10000: number;

var observabilityTelemetryChunkLnColValues: string[];

var ObservabilityTelemetryRowLn: string[][];

var resolveObservabilityTelemetryIsInteger2: Dynamic;

function resolveObservabilityTelemetryRowLn(
  observabilityTelemetryRowLn?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let observabilityTelemetryIsInteger2: Dynamic =
    resolveObservabilityTelemetryIsInteger2(
      observabilityTelemetryRowLn,
      observabilityTelemetryValue2000000,
    );
  let observabilityTelemetryIsInteger22: Dynamic =
    resolveObservabilityTelemetryIsInteger2(
      options,
      observabilityTelemetryValue32000000,
    );
  let record2: Dynamic = {};
  if (observabilityTelemetryIsInteger2 !== undefined) {
    record2.ln = observabilityTelemetryIsInteger2;
    if (observabilityTelemetryIsInteger2 <= 65535) {
      record2.rowLn = observabilityTelemetryIsInteger2;
    } else {
      [record2.rowLh, record2.rowLl] = [
        Math.floor(
          (observabilityTelemetryIsInteger2 - 1) /
            observabilityTelemetryValue10000,
        ),
        ((observabilityTelemetryIsInteger2 - 1) %
          observabilityTelemetryValue10000) +
          1,
      ];
    }
  }
  if (observabilityTelemetryIsInteger22 !== undefined) {
    record2.col = observabilityTelemetryIsInteger22;
    if (observabilityTelemetryIsInteger22 <= 65535) {
      record2.rowCo = observabilityTelemetryIsInteger22;
    } else {
      [record2.rowCh, record2.rowCl] = [
        Math.floor(
          (observabilityTelemetryIsInteger22 - 1) /
            observabilityTelemetryValue10000,
        ),
        ((observabilityTelemetryIsInteger22 - 1) %
          observabilityTelemetryValue10000) +
          1,
      ];
    }
  }
  return record2;
}

function resolveObservabilityTelemetryChunk(
  observabilityTelemetryChunk?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (observabilityTelemetryChunk !== `bun` || options === undefined) return {};
  let chunk: Dynamic = isObservabilityTelemetryEndsWith(
    context,
    options.filename,
  )
    ? resolveObservabilityTelemetryValue12(options.filename)
    : `unl`;
  return chunk === `unl`
    ? {
        chunk: chunk,
      }
    : {
        chunk: chunk,
        ...resolveObservabilityTelemetryRowLn(options.lineno, options.colno),
      };
}

var observabilityTelemetryPattern13: RegExp;

function resolveObservabilityTelemetryTest4(
  observabilityTelemetryTest4?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let observabilityTelemetryValue12: Dynamic =
    resolveObservabilityTelemetryValue12(observabilityTelemetryTest4);
  if (observabilityTelemetryValue12 !== `unl`)
    return observabilityTelemetryValue12;
  let observabilityTelemetrySlice = resolveObservabilityTelemetrySlice(
    observabilityTelemetryTest4,
  );
  let observabilityTelemetrySliceItem =
    observabilityTelemetrySlice?.[1] ?? observabilityTelemetrySlice?.[0];
  if (
    observabilityTelemetrySliceItem === undefined ||
    !observabilityTelemetryPattern13.test(observabilityTelemetrySliceItem)
  )
    return;
  let normalizedObservabilityTelemetrySliceItem: string =
    observabilityTelemetrySliceItem.toLowerCase();
  return isObservabilityTelemetryValue2(
    normalizedObservabilityTelemetrySliceItem,
  )
    ? undefined
    : normalizedObservabilityTelemetrySliceItem;
}

var observabilityTelemetryValue2000: number;

var observabilityTelemetryPattern14: RegExp;

var observabilityTelemetryPattern15: RegExp;

function resolveObservabilityTelemetrySlice2(
  items?: unknown,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof items != `string`) return;
  let itemsSlice =
    items.length > 2e3
      ? items.slice(
          0,
          items.lastIndexOf(
            `
`,
            observabilityTelemetryValue2000,
          ) + 1,
        )
      : items;
  let match = observabilityTelemetryPattern14.exec(itemsSlice);
  let replace =
    match?.[2] === undefined
      ? undefined
      : match[1]?.replace(observabilityTelemetryPattern15, ``);
  return isObservabilityTelemetryEndsWith(options, replace)
    ? resolveObservabilityTelemetryTest4(replace)
    : undefined;
}

var observabilityTelemetrySet4: Dynamic;

function resolveObservabilityTelemetryValue13(
  observabilityTelemetryValue13?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    typeof observabilityTelemetryValue13 == `string` &&
    observabilityTelemetrySet4.has(observabilityTelemetryValue13)
  );
}

var observabilityTelemetryPattern16: RegExp;

var observabilityTelemetryPattern17: RegExp;

var observabilityTelemetryValue160: number;

var observabilityTelemetryPattern18: RegExp;

var observabilityTelemetryPattern19: RegExp;

var ObservabilityTelemetryState11: RegExp[];

function resolveObservabilityTelemetryKind(
  items?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof items != `string` || items === ``)
    return {
      kind: `unparsed`,
    };
  let matchesItemsCount = items.length <= observabilityTelemetryValue160;
  let items2 = matchesItemsCount
    ? items
    : items.slice(0, observabilityTelemetryValue160);
  if (observabilityTelemetryPattern18.test(items2))
    return {
      kind: `tdz`,
    };
  if (!observabilityTelemetryPattern19.test(items2))
    return {
      kind: `unparsed`,
    };
  if (!matchesItemsCount)
    return {
      kind: `nodef`,
    };
  for (let resolveObservabilityTelemetryKindResult of ObservabilityTelemetryState11 as Dynamic) {
    let matchItem: Dynamic =
      resolveObservabilityTelemetryKindResult.exec(items2)?.[1];
    if (matchItem !== undefined)
      return observabilityTelemetryPattern17.test(matchItem)
        ? {
            kind: `nodef`,
            name: matchItem.toLowerCase(),
          }
        : {
            kind: `nodef`,
          };
  }
  return {
    kind: `nodef`,
  };
}

function resolveObservabilityTelemetryKind2(
  error?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (options !== `ReferenceError`) return {};
  let resolveObservabilityTelemetryKind2Result: Dynamic;
  try {
    resolveObservabilityTelemetryKind2Result =
      typeof error == `object` && error ? error.message : undefined;
  } catch {
    resolveObservabilityTelemetryKind2Result = undefined;
  }
  let { kind: msgKind, name: ident }: Dynamic =
    resolveObservabilityTelemetryKind(resolveObservabilityTelemetryKind2Result);
  return ident === undefined
    ? {
        msgKind: msgKind,
      }
    : {
        msgKind: msgKind,
        ident: ident,
      };
}

var observabilityTelemetryPattern20: RegExp;

var observabilityTelemetryValue999: number;

var ObservabilityTelemetryMaximumUpdateDepthExceeded: (string | number)[][];

var ObservabilityTelemetryUndef: string[][];

var ObservabilityTelemetryReact130: string;

var ObservabilityTelemetryJoin: string;

var ObservabilityTelemetryState12: RegExp;

var ObservabilityTelemetryState13: RegExp;

function resolveObservabilityTelemetryArray(
  observabilityTelemetryArray?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let label: Dynamic =
    observabilityTelemetryArray === null
      ? undefined
      : observabilityTelemetryArray[1] === `array`
        ? `object`
        : observabilityTelemetryArray[1];
  let ObservabilityTelemetryUndef2 = ObservabilityTelemetryUndef.find(
    ([ObservabilityTelemetryUndef3]: Dynamic, ..._extraArguments: unknown[]) =>
      ObservabilityTelemetryUndef3 === label,
  );
  return ObservabilityTelemetryUndef2 === undefined
    ? ObservabilityTelemetryReact130
    : `${ObservabilityTelemetryReact130}:${ObservabilityTelemetryUndef2[1]}`;
}

var ObservabilityTelemetryIntendNotReady: string[][];

var ObservabilityTelemetryUnmatched: string;

var observabilityTelemetrySet5: Dynamic;

var observabilityTelemetryPattern21: RegExp;

var observabilityTelemetrySet6: Dynamic;

var observabilityTelemetryPattern22: RegExp;

var observabilityTelemetrySet7: Dynamic;

function resolveObservabilityTelemetryTest5(
  observabilityTelemetryTest5?: unknown,
  ..._extraArguments: unknown[]
) {
  return (
    typeof observabilityTelemetryTest5 == `string` &&
    observabilityTelemetryPattern22.test(observabilityTelemetryTest5) &&
    !observabilityTelemetrySet7.has(observabilityTelemetryTest5) &&
    !observabilityTelemetryPattern23.test(observabilityTelemetryTest5)
  );
}

var observabilityTelemetryPattern23: RegExp;

var observabilityTelemetryValue4: number;

var observabilityTelemetrySet8: Dynamic;

var observabilityTelemetrySet9: Dynamic;

function resolveObservabilityTelemetryWord(
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let total: Dynamic = items.lastIndexOf(`:`) + 1;
  let word: Dynamic = items.slice(0, Math.max(0, total - 1));
  if (
    !observabilityTelemetryPattern21.test(word) &&
    !observabilityTelemetrySet6.has(word)
  )
    return;
  let stand: Dynamic = observabilityTelemetryPattern23.test(items)
    ? items.slice(-4)
    : ``;
  let name: Dynamic = items.slice(total, items.length - stand.length);
  if (
    !(name === ``
      ? stand === ``
      : !resolveObservabilityTelemetryTest5(name) ||
        observabilityTelemetrySet6.has(`${word}:${name}`))
  )
    return {
      word: word,
      name: name,
      stand: stand,
    };
}

function resolveObservabilityTelemetryJoin(
  observabilityTelemetryJoin?: Dynamic,
  options?: Dynamic,
  items: Dynamic = [],
  ..._extraArguments: unknown[]
): Dynamic {
  let label = `${observabilityTelemetryJoin}:${resolveObservabilityTelemetryTest5(options) && resolveObservabilityTelemetryWord(`${observabilityTelemetryJoin}:${options}`) !== undefined ? options : ``}${Array.isArray(items) && items.length === 3 && observabilityTelemetrySet8.has(items[0]) && observabilityTelemetrySet8.has(items[1]) && observabilityTelemetrySet9.has(items[2]) ? `_${items.join(``)}` : ``}`;
  return resolveObservabilityTelemetryWord(label) === undefined
    ? observabilityTelemetryJoin
    : label;
}

function resolveObservabilityTelemetryTest6(
  observabilityTelemetryTest6?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    typeof observabilityTelemetryTest6 == `string` &&
    (observabilityTelemetrySet5.has(observabilityTelemetryTest6) ||
      observabilityTelemetryPattern21.test(observabilityTelemetryTest6) ||
      observabilityTelemetrySet6.has(observabilityTelemetryTest6) ||
      resolveObservabilityTelemetryWord(observabilityTelemetryTest6) !==
        undefined)
  );
}

function resolveObservabilityTelemetryValue14(
  observabilityTelemetryValue14?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let word: Dynamic =
    resolveObservabilityTelemetryWord(observabilityTelemetryValue14)?.word ??
    observabilityTelemetryValue14;
  return observabilityTelemetrySet6.has(word)
    ? ObservabilityTelemetryReact130
    : word;
}

function resolveObservabilityTelemetryWord2(
  observabilityTelemetryWord2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let observabilityTelemetryWord: Dynamic = resolveObservabilityTelemetryWord(
    observabilityTelemetryWord2,
  );
  if (observabilityTelemetryWord === undefined)
    return observabilityTelemetryWord2;
  let difference = options - observabilityTelemetryWord.word.length - 1;
  let stand: Dynamic =
    difference >= observabilityTelemetryValue4
      ? observabilityTelemetryWord.stand
      : ``;
  let nameSlice: Dynamic = observabilityTelemetryWord.name.slice(
    0,
    Math.max(0, difference - stand.length),
  );
  for (let resolveObservabilityTelemetryWord2Result of (nameSlice !==
    observabilityTelemetryWord.name && isObservabilityTelemetryValue2(nameSlice)
    ? [stand]
    : [`${nameSlice}${stand}`, stand]) as Dynamic)
    if (
      resolveObservabilityTelemetryWord(
        `${observabilityTelemetryWord.word}:${resolveObservabilityTelemetryWord2Result}`,
      )?.stand === stand
    )
      return `${observabilityTelemetryWord.word}:${resolveObservabilityTelemetryWord2Result}`;
  return observabilityTelemetryWord.word;
}

var observabilityTelemetryValue1602: number;

function resolveObservabilityTelemetryMessage3(
  error?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic;
  try {
    items = typeof error == `object` && error ? error.message : undefined;
  } catch {
    items = undefined;
  }
  if (typeof items != `string`) return null;
  let matchesItemsCount: boolean =
    items.length > observabilityTelemetryValue1602;
  let itemsSlice: string = matchesItemsCount
    ? items.slice(0, observabilityTelemetryValue1602)
    : items;
  let match: Dynamic = observabilityTelemetryPattern20.exec(itemsSlice);
  let total: Dynamic = match === null ? -1 : match.index + match[0].length;
  let NaN2: number =
    match === null || (matchesItemsCount && total === itemsSlice.length)
      ? NaN
      : Number(match[1]);
  if (
    Number.isInteger(NaN2) &&
    NaN2 >= 1 &&
    NaN2 <= observabilityTelemetryValue999
  )
    return NaN2 === 130
      ? resolveObservabilityTelemetryArray(
          ObservabilityTelemetryState12.exec(itemsSlice.slice(total)),
        )
      : `react:${NaN2}`;
  for (let [
    resolveObservabilityTelemetryMessage3Result,
    resolveObservabilityTelemetryMessage3Result2,
  ] of ObservabilityTelemetryMaximumUpdateDepthExceeded as Dynamic)
    if (itemsSlice.startsWith(resolveObservabilityTelemetryMessage3Result))
      return resolveObservabilityTelemetryMessage3Result2 === 130
        ? resolveObservabilityTelemetryArray(
            ObservabilityTelemetryState13.exec(itemsSlice),
          )
        : `react:${resolveObservabilityTelemetryMessage3Result2}`;
  for (let [
    resolveObservabilityTelemetryMessage3Result,
    resolveObservabilityTelemetryMessage3Result2,
  ] of ObservabilityTelemetryIntendNotReady as Dynamic)
    if (itemsSlice.startsWith(resolveObservabilityTelemetryMessage3Result))
      return resolveObservabilityTelemetryMessage3Result2;
  return ObservabilityTelemetryUnmatched;
}

var ObservabilityTelemetryHtml: string[][];

var observabilityTelemetrySet10: Dynamic;

function resolveObservabilityTelemetryValue15(
  observabilityTelemetryValue15?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    typeof observabilityTelemetryValue15 == `string` &&
    observabilityTelemetrySet10.has(observabilityTelemetryValue15)
  );
}

function resolveObservabilityTelemetryJSON(
  error?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let resolveObservabilityTelemetryJSONResult: Dynamic;
  try {
    resolveObservabilityTelemetryJSONResult =
      typeof error == `object` && error ? error.message : undefined;
  } catch {
    resolveObservabilityTelemetryJSONResult = undefined;
  }
  if (typeof resolveObservabilityTelemetryJSONResult != `string`)
    return ObservabilityTelemetryUnmatched;
  let resolveObservabilityTelemetryJSONResultSlice: string =
    resolveObservabilityTelemetryJSONResult.slice(
      0,
      observabilityTelemetryValue1602,
    );
  if (resolveObservabilityTelemetryJSONResultSlice.includes(`JSON`))
    return ObservabilityTelemetryUnmatched;
  for (let [
    resolveObservabilityTelemetryJSONResult2,
    resolveObservabilityTelemetryJSONResult3,
  ] of ObservabilityTelemetryHtml as Dynamic)
    if (
      resolveObservabilityTelemetryJSONResultSlice.startsWith(
        resolveObservabilityTelemetryJSONResult2,
      )
    )
      return resolveObservabilityTelemetryJSONResult3;
  return ObservabilityTelemetryUnmatched;
}

function resolveObservabilityTelemetryMsgKind(
  observabilityTelemetryMsgKind?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return options === `SyntaxError`
    ? {
        msgKind: resolveObservabilityTelemetryJSON(
          observabilityTelemetryMsgKind,
        ),
      }
    : options === `Error`
      ? {
          msgKind:
            resolveObservabilityTelemetryMessage3(
              observabilityTelemetryMsgKind,
            ) ?? ObservabilityTelemetryUnmatched,
        }
      : {};
}

var ObservabilityTelemetryLocal: {
    name: string;
    local: string;
    word: string;
}[];

var resolveObservabilityTelemetrySome: Dynamic;

var resolveObservabilityTelemetryFind: Dynamic;

function isObservabilityTelemetryRemote(
  observabilityTelemetryRemote: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let filteredItems: Dynamic = [
    observabilityTelemetryRemote.host,
    observabilityTelemetryRemote.door,
  ].filter((item?: Dynamic, ..._extraArguments: unknown[]) => item != null);
  let read: Dynamic = (
    observabilityTelemetryRemote2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    try {
      let options2: Dynamic = observabilityTelemetryRemote2.read(options);
      return options2 === `seen` || options2 === `unseen`
        ? options2
        : `unknown`;
    } catch {
      return `unknown`;
    }
  };
  return {
    remote: (
      observabilityTelemetryRemote2?: Dynamic,
      ..._extraArguments: unknown[]
    ) => {
      if (!resolveObservabilityTelemetrySome(observabilityTelemetryRemote2))
        return `unknown`;
      let label = `unknown`;
      for (let isObservabilityTelemetryRemoteResult of filteredItems as Dynamic) {
        let isObservabilityTelemetryRemoteResult2: Dynamic = read(
          isObservabilityTelemetryRemoteResult,
          observabilityTelemetryRemote2,
        );
        if (isObservabilityTelemetryRemoteResult2 === `seen`) return `seen`;
        if (isObservabilityTelemetryRemoteResult2 === `unseen`) {
          label = `unseen`;
        }
      }
      return label;
    },
    add: (
      observabilityTelemetryRemote2?: Dynamic,
      ..._extraArguments: unknown[]
    ) => {
      if (!resolveObservabilityTelemetrySome(observabilityTelemetryRemote2))
        return false;
      let enabled = false;
      for (let isObservabilityTelemetryRemoteResult of filteredItems as Dynamic)
        try {
          isObservabilityTelemetryRemoteResult.add(
            observabilityTelemetryRemote2,
          );
          enabled = true;
        } catch {}
      return enabled;
    },
    subscribe: (
      observabilityTelemetryRemote2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let items: Dynamic = [];
      for (let isObservabilityTelemetryRemoteResult of filteredItems as Dynamic)
        try {
          let subscribe: Dynamic =
            isObservabilityTelemetryRemoteResult.subscribe?.(
              observabilityTelemetryRemote2,
            );
          if (typeof subscribe == `function`) {
            items.push(subscribe);
          }
        } catch {}
      return (..._extraArguments: unknown[]): undefined => {
        for (let isObservabilityTelemetryRemoteResult of items.splice(
          0,
        ) as Dynamic)
          try {
            isObservabilityTelemetryRemoteResult();
          } catch {}
      };
    },
  };
}

var observabilityTelemetryHostLocalBothFreshValues: string[];

function isObservabilityTelemetryValue3(
  observabilityTelemetryValue33?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!resolveObservabilityTelemetrySome(context))
    return observabilityTelemetryValue33;
  let matchesRemote = (..._extraArguments: unknown[]) => {
    try {
      return options.remote(context) === `seen`;
    } catch {
      return false;
    }
  };
  return {
    getState: (..._extraArguments: unknown[]): Dynamic => ({
      value: observabilityTelemetryValue33.getState().value || matchesRemote(),
      set: (
        observabilityTelemetryValue34?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        observabilityTelemetryValue33
          .getState()
          .set(observabilityTelemetryValue34);
        if (observabilityTelemetryValue34 === true)
          try {
            options.add(context);
          } catch {}
      },
    }),
  };
}

var observabilityTelemetrySet11: Dynamic;

function resolveObservabilityTelemetryValue16(
  observabilityTelemetryValue16?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    typeof observabilityTelemetryValue16 == `string` &&
    observabilityTelemetrySet11.has(observabilityTelemetryValue16)
  );
}

var observabilityTelemetryValue256: number;

var ObservabilityTelemetryFetch: (string | RegExp)[][];

function resolveObservabilityTelemetryUnparsed(
  items?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof items != `string` || items === ``) return `unparsed`;
  let items2 =
    items.length <= observabilityTelemetryValue256
      ? items
      : `${items.slice(0, observabilityTelemetryValue256)}￿${items.slice(-128)}`;
  for (let [
    resolveObservabilityTelemetryUnparsedResult,
    resolveObservabilityTelemetryUnparsedResult2,
  ] of ObservabilityTelemetryFetch as Dynamic)
    if (resolveObservabilityTelemetryUnparsedResult2.test(items2))
      return resolveObservabilityTelemetryUnparsedResult;
  return `unparsed`;
}

function resolveObservabilityTelemetryMsgKind2(
  error?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (options !== `TypeError`) return {};
  let resolveObservabilityTelemetryMsgKind2Result: Dynamic;
  try {
    resolveObservabilityTelemetryMsgKind2Result =
      typeof error == `object` && error ? error.message : undefined;
  } catch {
    resolveObservabilityTelemetryMsgKind2Result = undefined;
  }
  return {
    msgKind: resolveObservabilityTelemetryUnparsed(
      resolveObservabilityTelemetryMsgKind2Result,
    ),
  };
}

var ObservabilityTelemetrySplit: string[];

var observabilityTelemetrySet12: Dynamic;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeObservabilityTelemetry1Step1(): void {
  (observabilityTelemetrySaveOpenRenderEditValues = [
    `save`,
    `open`,
    `render`,
    `edit`,
    `sync`,
    `export`,
    `import`,
    `present`,
    `navigate`,
    `search`,
    `submit`,
    `upload`,
    `download`,
    `generate`,
    `connect`,
  ]);
  (observabilityTelemetrySuccessFailureAbortedValues = [
    `success`,
    `failure`,
    `aborted`,
  ]);
  (observabilityTelemetryPattern = /^[a-z][a-z0-9_]{0,31}$/);
  (observabilityTelemetryConflictReadOnlyTooLargeInvalidContentValues = [
    `conflict`,
    `read_only`,
    `too_large`,
    `invalid_content`,
    `backpressure`,
    `transient`,
    `network`,
    `timeout`,
    `validation`,
    `capability_denied`,
    `capability_error`,
    `render`,
    `internal`,
    `user_error`,
    `unknown`,
  ]);
  (observabilityTelemetrySet = new (Set as Dynamic)([
    `boot_4xx`,
    `boot_5xx`,
    `iframe_timeout`,
    `iframe_error`,
    `kernel_missing`,
    `csp_violation`,
    `cap_load_error`,
    `timeout`,
    `threw_before_ready`,
    `uncaught_error`,
    `unhandled_rejection`,
    `chunk_load`,
    ...observabilityTelemetryConflictReadOnlyTooLargeInvalidContentValues,
    `malformed`,
  ]));
  (observabilityTelemetrySet2 = new (Set as Dynamic)([
    `invalid`,
    `none`,
    `overflow`,
  ]));
  (observabilityTelemetryPattern2 = /^[a-z0-9][a-z0-9-]{0,39}$/);
  (observabilityTelemetryPattern3 = /^[a-z0-9][a-z0-9_-]{0,79}$/);
  (ObservabilityTelemetryMin = {
    min: 5,
    max: 120,
    default: 20,
  });
  (observabilityTelemetryValue15000 = 15e3);
  (observabilityTelemetryValue1000 = 1e3);
  (ObservabilityTelemetryAppifactHealthV2 = `appifact-health:v2`);
  (ObservabilityTelemetryAppifactHealth = `__appifact_health`);
  (observabilityTelemetryValue10 = 10);
  (observabilityTelemetryValue10002 = 1e3);
  (observabilityTelemetryMap = new Map<
    string,
    TelemetryCode
  >([
    [`conflict`, `conflict`],
    [`read-only`, `read_only`],
    [`too-large`, `too_large`],
    [`invalid-content`, `invalid_content`],
    [`backpressure`, `backpressure`],
    [`transient`, `transient`],
  ]));
  (observabilityTelemetryPattern4 = /dynamically imported module|Importing a module script failed|error loading dynamically imported module|Loading (CSS )?chunk|ChunkLoadError|Unable to preload/i);
  (observabilityTelemetryPattern5 = /^ResizeObserver loop (?:limit exceeded|completed with undelivered notifications)/);
  (ObservabilityTelemetryState = null);
  (ObservabilityTelemetryState2 = null);
  (observabilityTelemetryValue_1 = false);
  (resolveObservabilityTelemetryValue2 = (
    observabilityTelemetryValue2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let uniqueItems: Dynamic = new (Set as Dynamic)(observabilityTelemetryValue2);
    return (
      observabilityTelemetryValue22?: unknown,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      typeof observabilityTelemetryValue22 == `string` &&
      uniqueItems.has(observabilityTelemetryValue22);
  });
  (ObservabilityTelemetryNull = resolveObservabilityTelemetryValue2([
    `null`,
    `undef`,
    `str`,
    `num`,
    `bool`,
    `sym`,
    `fn`,
    `event`,
    `response`,
    `domx`,
    `errsub`,
    `obj`,
  ]));
  (ObservabilityTelemetryBigint = {
    string: `str`,
    number: `num`,
    bigint: `num`,
    boolean: `bool`,
    symbol: `sym`,
    function: `fn`,
  });
  (ObservabilityTelemetryNotsupported = resolveObservabilityTelemetryValue2([
      `notsupported`,
      `invalidaccess`,
      `unknownerr`,
      `operation`,
      `notreadable`,
      `indexsize`,
      `hierarchy`,
      `invalidchar`,
      `txinactive`,
      `unlisted`,
    ]));
  (ObservabilityTelemetryNotSupportedError = {
    NotSupportedError: `notsupported`,
    InvalidAccessError: `invalidaccess`,
    UnknownError: `unknownerr`,
    OperationError: `operation`,
    NotReadableError: `notreadable`,
    IndexSizeError: `indexsize`,
    HierarchyRequestError: `hierarchy`,
    InvalidCharacterError: `invalidchar`,
    TransactionInactiveError: `txinactive`,
  });
  (ObservabilityTelemetryBlob = resolveObservabilityTelemetryValue2([
    `bun`,
    `blob`,
    `data`,
    `inl`,
    `ext`,
    `frn`,
    `nof`,
  ]));
  (observabilityTelemetryUrlPattern = /^(?:chrome-extension|moz-extension|safari-web-extension|safari-extension|webkit-masked-url):/);
  (ObservabilityTelemetryState3 = resolveObservabilityTelemetryValue2(
    [`rt`, `wdg`, `mm`, `unk`],
  ));
  (ObservabilityTelemetryState4 = resolveObservabilityTelemetryValue2(
    [`ifl`, `idl`],
  ));
  (observabilityTelemetryUrlPattern2 = /(?:chrome-extension|moz-extension|safari-web-extension|safari-extension|webkit-masked-url):\/\//);
  (observabilityTelemetryPattern6 = /^\s*at\s|@\S*:\d+/);
  (ObservabilityTelemetryOrigins = {
    origins: [],
  });
  (ObservabilityTelemetryState5 = Symbol.for(`pages.foreignCrashSorter`));
  (ObservabilityTelemetryKey = {
    key: `pages`,
    monitoring: {
      alertChannel: `pages-alerts`,
      coreActions: [`edit`, `sync`, `open`, `render`],
      readyTimeoutS: 60,
    },
  });
  (ObservabilityTelemetryState6 = typeof window !== "undefined"
      ? installObservabilityTelemetryAttach(window)
      : null);
  (ObservabilityTelemetryState7 = resolveObservabilityTelemetryValue3());
  ObservabilityTelemetryState6?.attach(ObservabilityTelemetryState7);
  (ObservabilityTelemetryArtifactTypeLfileRuntime35524228Js = `./artifact-type/lfile-runtime.35524228.js`);
  (resolveObservabilityTelemetryValue4 = (
    ..._extraArguments: unknown[]
  ): boolean =>
    ObservabilityTelemetryArtifactTypeLfileRuntime35524228Js !== `` && inFrame());
  (ObservabilityTelemetryKeepalive = {
    keepalive: true,
  });
  isObservabilityTelemetryCatch();
  (TELEMETRY_ATTRIBUTE_NAMES = {
    cwDid: `coworker.did`,
    cwChannel: `coworker.channel`,
    cwClaimRepo: `coworker.claim_repo`,
    httpMethod: `http.method`,
    httpRoute: `http.route`,
    httpStatus: `http.status_code`,
    agentId: `agent.id`,
    agentMode: `agent.mode`,
    agentReason: `agent.reason`,
    agentDepth: `agent.depth`,
    container: `container`,
    fsEntryId: `fs_entry.id`,
    runId: `run.id`,
    sessionId: `session.id`,
    turnTrigger: `turn.trigger`,
    userBucket: `user.bucket`,
    userId: `user.id`,
    toolName: `tool_name`,
    toolOwner: `tool.owner`,
    toolOk: `tool.success`,
    toolMs: `tool.duration_ms`,
    toolErrType: `tool.error_type`,
    toolResultBytes: `tool.result_bytes`,
    llmModel: `llm.model`,
    llmRounds: `llm.rounds`,
    llmInTok: `llm.in_tok`,
    llmOutTok: `llm.out_tok`,
    llmCacheReadTok: `llm.cache_read_tok`,
    llmCacheWriteTok: `llm.cache_write_tok`,
    llmToolCalls: `llm.tool_calls`,
    llmRound: `llm.round`,
    llmTtftMs: `llm.ttft_ms`,
    llmStopReason: `llm.stop_reason`,
    anthropicHttpStatus: `anthropic.http_status`,
    kickKind: `kick.kind`,
    kickProactive: `kick.proactive`,
    kickOutcome: `kick.outcome`,
    wakeMode: `wake.mode`,
    llmErrKind: `llm.err_kind`,
    tickKind: `tick.kind`,
    tickAction: `tick.action`,
    tickTrigger: `tick.trigger`,
    tickFired: `tick.fired`,
    tickOk: `tick.ok`,
    tickFailed: `tick.failed`,
    authProvider: `auth.provider`,
    authOp: `auth.op`,
    authSource: `auth.source`,
    authOk: `auth.ok`,
    authRefreshed: `auth.refreshed`,
    authDropped: `auth.dropped`,
    authHadRefresh: `auth.had_refresh_token`,
    authTtlS: `auth.ttl_remaining_s`,
    authScopeCount: `auth.scope_count`,
    authHttpStatus: `auth.http_status`,
    authErrorType: `auth.error_type`,
    authRefreshReason: `auth.refresh_reason`,
    authProbeStatus: `auth.probe_status`,
    observerHadDeviceToken: `observer.had_device_token`,
    authUpstream: `auth.upstream`,
    authUpstreamTtfbMs: `auth.upstream_ttfb_ms`,
    authUpstreamBodyMs: `auth.upstream_body_ms`,
    oauthFlowId: `oauth.flow_id`,
    mcpSlug: `mcp.slug`,
    mcpMethod: `mcp.method`,
    mcpTool: `mcp.tool`,
    mcpOk: `mcp.ok`,
    mcpErrorLayer: `mcp.error_layer`,
    mcpErrorCode: `mcp.error_code`,
    mcpHttpStatus: `mcp.http_status`,
    mcpDurationMs: `mcp.duration_ms`,
    mcpBodyBytes: `mcp.body_bytes`,
    mcpRssDeltaMb: `mcp.rss_delta_mb`,
    mcpParseMs: `mcp.parse_ms`,
    mcpResultIsError: `mcp.result_is_error`,
    mcpResultErrorKind: `mcp.result_error_kind`,
    mcpAuthKind: `mcp.auth_kind`,
    mcpClientId: `mcp.client_id`,
    mcpIsSa: `mcp.is_sa`,
    mcpAgentType: `mcp.agent_type`,
    mcpAgentInstance: `mcp.agent_instance`,
    mcpSlackChannel: `mcp.slack_channel`,
    mcpClientApp: `mcp.client_app`,
    mcpClientSurface: `mcp.client_surface`,
    mcpQuietReason: `mcp.quiet_reason`,
    mcpCliToken: `mcp.cli_token`,
    peopleCaller: `people.caller`,
    mcpDropReason: `mcp.drop_reason`,
    mcpErrType: `mcp.err_type`,
    vlabelOutcome: `vlabel.outcome`,
    vlabelExt: `vlabel.ext`,
    vlabelDeltaKind: `vlabel.delta_kind`,
    vlabelDeltaChars: `vlabel.delta_chars`,
    vlabelCapped: `vlabel.capped`,
    vlabelLabelChars: `vlabel.label_chars`,
    mcpTurnIdPresent: `mcp.turn_id_present`,
    changeNoteGuard: `change_note.guard`,
    changeNoteSubject: `change_note.subject`,
    sseEvent: `sse.event`,
    sseBytes: `sse.bytes`,
    sseFull: `sse.full`,
    sseCount: `sse.count`,
    uiEvent: `ui.event`,
    turnWatchdog: `turn.watchdog`,
    turnWatchdogMs: `turn.watchdog_ms`,
    sseConnected: `sse.connected`,
    turnActive: `turn.active`,
    turnElapsedMs: `turn.elapsed_ms`,
    roomPath: `room.path`,
    roomState: `room.state`,
    roomLastMsgAgoMs: `room.last_msg_ago_ms`,
    roomBootSlotMs: `room.boot_slot_ms`,
    roomBootActive: `room.boot_active`,
    roomBootQueued: `room.boot_queued`,
    roomBootOverhang: `room.boot_overhang`,
    roomOutcome: `outcome`,
    wsCloseCode: `ws.close_code`,
    wsCloseClean: `ws.close_clean`,
    wsAttempt: `ws.attempt`,
    wsLifeMs: `ws.life_ms`,
    netOnline: `net.online`,
    muxState: `mux.state`,
    muxPending: `mux.pending`,
    wsReadyState: `ws.ready_state`,
    sessionReloadGapMs: `session.reload_gap_ms`,
    sseLastFrameAgoMs: `sse.last_frame_ago_ms`,
    clientRev: `client.rev`,
    sseRev: `sse.rev`,
    lfileBootMs: `lfile.boot_ms`,
    ldocDiffBytes: `ldoc.diff_bytes`,
    ldocYstateBytes: `ldoc.ystate_bytes`,
    svRev: `sv.rev`,
    svInstance: `sv.instance`,
    svLive: `sv.live`,
    wsInstance: `ws.instance`,
    ldocDiffClients: `ldoc.diff_clients`,
    ldocDiffOwn: `ldoc.diff_own`,
    ldocRejoinAction: `ldoc.rejoin_action`,
    ldocResyncReason: `ldoc.resync_reason`,
    ldocStaleReason: `ldoc.stale_reason`,
    ldocAwayMs: `ldoc.away_ms`,
    serverBuild: `server.build`,
    clientBuild: `client.build`,
    ldocSinceJoinMs: `ldoc.since_join_ms`,
    ldocUpdateBytes: `ldoc.update_bytes`,
    ldocUpdateStructs: `ldoc.update_structs`,
    ldocUpdateDeletedLive: `ldoc.update_deleted_live`,
    ldocUpdateInsertLen: `ldoc.update_insert_len`,
    ldocFrameKind: `ldoc.frame_kind`,
    ldocRejoinShape: `ldoc.rejoin_shape`,
    ldocUpdateDeletedLiveSameClient: `ldoc.update_deleted_live_same_client`,
    ldocUpdateDeletedLiveOtherClient: `ldoc.update_deleted_live_other_client`,
    ldocUpdateInsertClients: `ldoc.update_insert_clients`,
    ldocUpdateDeletedParentsTop: `ldoc.update_deleted_parents_top`,
    ldocDocLenBefore: `ldoc.doc_len_before`,
    ldocDocLenAfter: `ldoc.doc_len_after`,
    ldocSenderHash: `ldoc.sender_hash`,
    ldocConnHash: `ldoc.conn_hash`,
    ldocRoomIdHash: `ldoc.room_id_hash`,
    ldocRoomIdLen: `ldoc.room_id_len`,
    ldocRoomIdPct: `ldoc.room_id_pct`,
    ldocStateKey: `ldoc.state_key`,
    ldocStateKeyForm: `ldoc.state_key_form`,
    ldocTabId: `ldoc.tab_id`,
    ldocDupRoomIdHashes: `ldoc.dup_room_id_hashes`,
    ldocDupCount: `ldoc.dup_count`,
    ldocStateKeyPhase: `ldoc.state_key_phase`,
    ldocHealAction: `ldoc.heal_action`,
    ldocForkNewer: `ldoc.fork_newer`,
    ldocForkLineage: `ldoc.fork_lineage`,
    ldocForkOverCap: `ldoc.fork_over_cap`,
    ldocFrozen: `ldoc.frozen`,
    ldocLegacyYstateBytes: `ldoc.legacy_ystate_bytes`,
    ldocMergedYstateBytes: `ldoc.merged_ystate_bytes`,
    docStateSkip: `docstate.skip`,
    memRssMb: `mem.rss_mb`,
    memDeltaRssMb: `mem.delta_rss_mb`,
    markLast: `mark.last`,
    intervalName: `interval.name`,
    fatalKind: `process.fatal_kind`,
    errorType: `error.type`,
    errorErrno: `error.errno`,
    errorCode: `error.code`,
    errorSyscall: `error.syscall`,
  });
  (ObservabilityTelemetrySENTRYDSNSERVER = rolldownNImport({
    SENTRY_DSN_SERVER: (..._extraArguments: unknown[]) => ``,
    SENTRY_DSN_WEB: (..._extraArguments: unknown[]) => ``,
    ddLog: (..._extraArguments: unknown[]): Dynamic => ddLog,
    injectTraceparent: (..._extraArguments: unknown[]): Dynamic =>
      injectTraceparent,
    reportBoundaryError: (..._extraArguments: unknown[]): Dynamic =>
      reportBoundaryError,
    routePattern: (..._extraArguments: unknown[]): Dynamic => routePattern,
    setDdUser: (..._extraArguments: unknown[]): Dynamic => setDdUser,
    setTraceUser: (..._extraArguments: unknown[]): Dynamic => setTraceUser,
    withWebSpan: (..._extraArguments: unknown[]): Dynamic => withWebSpan,
  }));
  (resolveObservabilityTelemetryValue5 = (
    ...observabilityTelemetryValue5: Dynamic[]
  ): undefined => {});
  (setDdUser = resolveObservabilityTelemetryValue5);
  (ddLog = resolveObservabilityTelemetryValue5);
  (reportBoundaryError = resolveObservabilityTelemetryValue5);
  (ObservabilityTelemetrySetTag = {
    setTag(..._extraArguments: unknown[]): undefined {},
  });
  (setTraceUser = resolveObservabilityTelemetryValue5);
  (injectTraceparent = (
    injectTraceparent2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => injectTraceparent2);
  (observabilityTelemetryValue0 = 0);
  (observabilityTelemetrySet3 = new (Set as Dynamic)());
  (resolveObservabilityTelemetryValue6 = (
    ..._extraArguments: unknown[]
  ) => observabilityTelemetryValue0);
  (ObservabilityTelemetryToldGapClosed = {
    "told.gapClosed": [`sync`, `success`],
    "told.gapEpisode": [`sync`, `failure`, `transient`],
    "told.gapAbandoned": [`sync`, `failure`, `timeout`],
    "heal.stall": [`sync`, `failure`, `transient`],
    "heal.order": [`sync`, `failure`, `transient`],
    "heal.reissue": [`sync`, `failure`, `transient`],
    "write.pageBusy": [`sync`, `failure`, `backpressure`],
    "ack.allow": [`edit`, `success`],
  });
  (ObservabilityTelemetryRebaseDropped = {
    "rebase.dropped": [`edit`, `failure`, `conflict`],
    "rebase.bailed": [`edit`, `failure`, `conflict`],
    "flush.cutEraseSatisfied": [`edit`, `failure`, `conflict`],
    "refuse.loud": [`edit`, `failure`, `validation`],
    "refuse.quiet": [`edit`, `failure`, `validation`],
    "step.threw": [`edit`, `failure`, `internal`],
    "wedge.flush": [`edit`, `failure`, `internal`],
    "carry.fail": [`edit`, `failure`, `internal`],
    "iframe.crash": [`edit`, `failure`, `internal`],
    "iframe.crashIdle": [`render`, `failure`, `internal`],
    "iframe.crashBlock": [`render`, `failure`, `invalid_content`],
    "widget.fault": [`render`, `failure`, `invalid_content`],
  });
  (ObservabilityTelemetryWidgetFault = `widget.fault`);
  ({
    ...ObservabilityTelemetryToldGapClosed,
    ...ObservabilityTelemetryRebaseDropped,
  });
  (ObservabilityTelemetryHost = {
    host: ObservabilityTelemetryToldGapClosed,
    iframe: ObservabilityTelemetryRebaseDropped,
  });
  (ObservabilityTelemetryState8 = observabilityTelemetryValue15000);
  (resolveObservabilityTelemetryValue8 = (
    observabilityTelemetryValue8?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    observabilityTelemetryValue8[2] === undefined
      ? `${observabilityTelemetryValue8[0]} ${observabilityTelemetryValue8[1]}`
      : `${observabilityTelemetryValue8[0]} ${observabilityTelemetryValue8[1]} ${observabilityTelemetryValue8[2]}`);
  (ObservabilityTelemetryState9 = null);
  (ObservabilityTelemetryState10 = resolveObservabilityTelemetryReady2(ObservabilityTelemetryState7));
  (ObservabilityTelemetry259dc54003a391cffb50b52b94c913ed15d92d1c = `259dc54003a391cffb50b52b94c913ed15d92d1c`);
  (ObservabilityTelemetryPagesBootOrdinal = `pages.boot.ordinal`);
  (ObservabilityTelemetryPagesBootSession = `pages.boot.session`);
  (observabilityTelemetryPattern7 = /^([0-9a-f]{7,12}):([1-9])$/);
  (observabilityTelemetryPattern8 = /^[0-9a-f]{7,40}$/);
  (observabilityTelemetryPattern9 = /^[1-9]$/);
  (observabilityTelemetryPattern10 = /\/(?:index|app-core)-[A-Za-z0-9_-]+\.js(?:[?#]|$)/);
  (resolveObservabilityTelemetryIsInteger = (
    observabilityTelemetryIsInteger?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    observabilityTelemetryIsInteger !== undefined &&
    Number.isInteger(observabilityTelemetryIsInteger) &&
    observabilityTelemetryIsInteger >= 0 &&
    observabilityTelemetryIsInteger <= options
      ? observabilityTelemetryIsInteger
      : 0);
  (ObservabilityTelemetryPreload = [
    [`preload`, `preld`],
    [`devlop`, `devlop`],
    [`hast`, `hast`],
    [`shiki-langs`, `shlang`],
    [`shiki-themes`, `shthem`],
    [`shiki-core`, `shcore`],
    [`hello-early`, `hello`],
    [`app-core`, `core`],
    [`cds`, `cds`],
    [`react`, `react`],
    [`file-selector`, `fsel`],
    [`ref-chips`, `chips`],
    [`pm-schema`, `pmsch`],
    [`app-lazy`, `lazy`],
    [`chat-markdown`, `chatmd`],
    [`index`, `index`],
    [`rolldown-runtime`, `rolldn`],
    [`AgentRunsModal`, `runs`],
    [`BottomSheet.impl`, `bsheet`],
    [`ClaudeAskCardFace`, `askf`],
    [`claudeAskCard`, `askc`],
    [`claudeSessionRun`, `askrun`],
    [`claudeWritingSample`, `cwsamp`],
    [`claudeWritingSheets`, `cwsht`],
    [`commentOutboxBacking`, `outbox`],
    [`diffWorker`, `diffw`],
    [`displayTextPaths`, `dtext`],
    [`historyGroups`, `hist`],
    [`mermaid.min`, `mmaid`],
    [`PageSkillBulb`, `bulb`],
    [`previewV2`, `prev2`],
    [`refusalShadow`, `shadow`],
    [`renderableKatex`, `katex`],
    [`RightRail`, `rrail`],
    [`shellHot`, `hot`],
    [`VersionPreviewPane`, `vpane`],
    [`WidgetConsolePanel`, `wcons`],
    [`WidgetPanel`, `wpanel`],
    [`virtual-lfile-extras-text`, `xtext`],
    [`virtual-lfile-runtime-text`, `rttext`],
    [`lfile-runtime`, `rtfile`],
  ]);
  (resolveObservabilityTelemetryValue11 = (
    observabilityTelemetryValue11?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    for (let [
      resolveObservabilityTelemetryValue11Result,
      resolveObservabilityTelemetryValue11Result2,
    ] of ObservabilityTelemetryPreload as Dynamic)
      if (
        resolveObservabilityTelemetryValue11Result ===
        observabilityTelemetryValue11
      )
        return resolveObservabilityTelemetryValue11Result2;
  });
  (observabilityTelemetryValue2048 = 2048);
  (observabilityTelemetryValue96 = 96);
  (observabilityTelemetryPattern11 = /^[A-Za-z0-9_-]{8}$/);
  (observabilityTelemetryPattern12 = /^[0-9a-f]{8}$/);
  (observabilityTelemetryValue2000000 = 2e6);
  (observabilityTelemetryValue32000000 = 32e6);
  (observabilityTelemetryValue10000 = 1e4);
  (observabilityTelemetryChunkLnColValues = [`chunk`, `ln`, `col`]);
  (ObservabilityTelemetryRowLn = [
    [`ln`, `rowLn`],
    [`lh`, `rowLh`],
    [`ll`, `rowLl`],
    [`co`, `rowCo`],
    [`ch`, `rowCh`],
    [`cl`, `rowCl`],
  ]);
  (resolveObservabilityTelemetryIsInteger2 = (
    observabilityTelemetryIsInteger2?: unknown,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    typeof observabilityTelemetryIsInteger2 == `number` &&
    Number.isInteger(observabilityTelemetryIsInteger2) &&
    observabilityTelemetryIsInteger2 >= 1 &&
    observabilityTelemetryIsInteger2 <= options
      ? observabilityTelemetryIsInteger2
      : undefined);
  (observabilityTelemetryPattern13 = /^[A-Za-z0-9_]{3,24}$/);
  (observabilityTelemetryValue2000 = 2e3);
  (observabilityTelemetryPattern14 = /(?:^|[\s(@])([A-Za-z][A-Za-z0-9+.-]*:(?![0-9])[^\s)]*)(?:(\)?(?:\n|$))|)/);
  (observabilityTelemetryPattern15 = /(?::\d+){1,2}$/);
  (observabilityTelemetrySet4 = new (Set as Dynamic)([
    `tdz`,
    `nodef`,
    `unparsed`,
  ]));
  (observabilityTelemetryPattern16 = /^[a-z_][a-z0-9_]{2,23}$/);
  (observabilityTelemetryPattern17 = /^[A-Za-z_][A-Za-z0-9_]{2,23}$/);
  (observabilityTelemetryValue160 = 160);
  (observabilityTelemetryPattern18 = /before initialization|uninitialized variable|can't access lexical declaration/i);
  (observabilityTelemetryPattern19 = /is not defined|can't find variable/i);
  (ObservabilityTelemetryState11 = [
    /^(\S{1,64}) is not defined$/,
    /^Can't find variable: (\S{1,64})$/,
  ]);
  (observabilityTelemetryPattern20 = /Minified React error #(\d{1,3})\b/);
  (observabilityTelemetryValue999 = 999);
  (ObservabilityTelemetryMaximumUpdateDepthExceeded = [
    [`Maximum update depth exceeded`, 185],
    [`Objects are not valid as a React child`, 31],
    [`Rendered more hooks than during the previous render`, 310],
    [`Rendered fewer hooks`, 300],
    [`Element type is invalid: expected a string`, 130],
  ]);
  (ObservabilityTelemetryUndef = [
    [`undefined`, `undef`],
    [`object`, `obj`],
    [`null`, `null`],
    [`boolean`, `bool`],
    [`number`, `num`],
    [`bigint`, `bigint`],
    [`symbol`, `sym`],
  ]);
  (ObservabilityTelemetryReact130 = `react:130`);
  (ObservabilityTelemetryJoin = ObservabilityTelemetryUndef.map(
    (
      [ObservabilityTelemetryUndef2]: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ObservabilityTelemetryUndef2,
  ).join(`|`));
  (ObservabilityTelemetryState12 = RegExp(
    `^; visit https://react\\.dev/errors/130\\?args\\[\\]=(${ObservabilityTelemetryJoin})&`,
  ));
  (ObservabilityTelemetryState13 = RegExp(
    `^Element type is invalid: expected a string \\(for built-in components\\) or a class/function \\(for composite components\\) but got: (${ObservabilityTelemetryJoin}|array)\\.`,
  ));
  (ObservabilityTelemetryIntendNotReady = [
    [`intend: door not ready`, `intend_not_ready`],
    [`useIntend: no <IntendProvider>`, `intend_no_provider`],
    [`useIntendReady: no <IntendProvider>`, `intend_no_provider`],
    [`frameShell: lane budget exhausted`, `lane_budget`],
    [`frameShell: mint produced an illegal mount nonce`, `mint_invariant`],
    [`supportCode: mint produced an illegal code`, `mint_invariant`],
    [`frameDoor: mintOpId produced an illegal opId`, `mint_invariant`],
    [`menuGlyphs: no glyph for catalog row`, `menu_glyph`],
  ]);
  (ObservabilityTelemetryUnmatched = `unmatched`);
  (observabilityTelemetrySet5 = new (Set as Dynamic)([
    ...ObservabilityTelemetryIntendNotReady.map(
      (
        [, ObservabilityTelemetryIntendNotReady2]: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => ObservabilityTelemetryIntendNotReady2,
    ),
    ObservabilityTelemetryUnmatched,
  ]));
  (observabilityTelemetryPattern21 = /^react:[1-9][0-9]{0,2}$/);
  (observabilityTelemetrySet6 = new (Set as Dynamic)(
    ObservabilityTelemetryUndef.map(
      (
        [, ObservabilityTelemetryUndef2]: Dynamic,
        ..._extraArguments: unknown[]
      ) => `${ObservabilityTelemetryReact130}:${ObservabilityTelemetryUndef2}`,
    ),
  ));
  (observabilityTelemetryPattern22 = /^[a-z0-9_]{3,24}$/);
  (observabilityTelemetrySet7 = new (Set as Dynamic)([
    `none`,
    `other`,
    `unrowed`,
  ]));
  (observabilityTelemetryPattern23 = /_[pw][pw][vh]$/);
  (observabilityTelemetryValue4 = 4);
  (observabilityTelemetrySet8 = new (Set as Dynamic)([`p`, `w`]));
  (observabilityTelemetrySet9 = new (Set as Dynamic)([`v`, `h`]));
  (observabilityTelemetryValue1602 = 160);
  (ObservabilityTelemetryHtml = [
    [`Unexpected token '<'`, `html`],
    [`Unexpected end of script`, `cut`],
    [`Unexpected EOF`, `cut`],
    [`Multiline comment was not closed properly`, `cut`],
    [`Unexpected end of input`, `cut`],
    [`Invalid character '\\u000`, `bytes`],
    [`Invalid character '\\u001`, `bytes`],
    [`Invalid character '\\ufffd'`, `bytes`],
    [`Invalid character: '\\0'`, `bytes`],
    [`Unexpected identifier '`, `text`],
    [`Invalid regular expression`, `regexp`],
    [`Importing binding name '`, `bind`],
    [`Indirectly exported binding name '`, `bind`],
    [`The requested module '`, `bind`],
  ]);
  (observabilityTelemetrySet10 = new (Set as Dynamic)([
    `html`,
    `cut`,
    `bytes`,
    `text`,
    `regexp`,
    `bind`,
    ObservabilityTelemetryUnmatched,
  ]));
  (ObservabilityTelemetryLocal = [
    {
      name: `ask_why_asked`,
      local: `bongo.ask.whyAsked`,
      word: `why`,
    },
    {
      name: `ask_dock_dismissed`,
      local: `bongo.askDock.dismissed`,
      word: `dock`,
    },
    {
      name: `ask_dock_hint_shown`,
      local: `bongo.askDock.hintShown`,
      word: `hint`,
    },
  ]);
  (resolveObservabilityTelemetrySome = (
    observabilityTelemetrySome?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof observabilityTelemetrySome == `string` &&
    ObservabilityTelemetryLocal.some(
      (ObservabilityTelemetryLocal2?: Dynamic, ..._extraArguments: unknown[]) =>
        ObservabilityTelemetryLocal2.name === observabilityTelemetrySome,
    ));
  (resolveObservabilityTelemetryFind = (
    observabilityTelemetryFind?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    ObservabilityTelemetryLocal.find(
      (ObservabilityTelemetryLocal2?: Dynamic, ..._extraArguments: unknown[]) =>
        ObservabilityTelemetryLocal2.name === observabilityTelemetryFind,
    )?.word ?? null);
  (observabilityTelemetryHostLocalBothFreshValues = [
    `host`,
    `local`,
    `both`,
    `fresh`,
    `blind`,
  ]);
  (observabilityTelemetrySet11 = new (Set as Dynamic)([
    `fetch`,
    `notfn`,
    `undef`,
    `null`,
    `notiter`,
    `notctor`,
    `readonly`,
    `cyclic`,
    `illegal`,
    `deadobj`,
    `unparsed`,
  ]));
  (observabilityTelemetryValue256 = 256);
  (ObservabilityTelemetryFetch = [
    [
      `fetch`,
      /^Failed to fetch|^Load failed$|^NetworkError when attempting to fetch|^network error$|^The network connection was lost\.$|^The Internet connection appears to be offline\.$|^The request timed out\.$|^cancelled$/,
    ],
    [`deadobj`, /^can't access dead object$/],
    [
      `undef`,
      /^Cannot (?:read|set) propert(?:y|ies) of undefined(?![\w\uFFFF])|^undefined is not an object(?![\w\uFFFF])|^can't convert undefined to object$| is undefined, can't access property |(?: is| of) undefined\.?$/,
    ],
    [
      `null`,
      /^Cannot (?:read|set) propert(?:y|ies) of null(?![\w\uFFFF])|^null is not an object(?![\w\uFFFF])|^null has no properties$|^can't convert null to object$| is null, can't access property |(?: is| of) null\.?$/,
    ],
    [`undef`, / has no properties$/],
    [
      `notiter`,
      / is not iterable(?![\w\uFFFF])|requires \.\.\.iterable|^Found non-callable @@iterator|^undefined is not a function \(near '\.\.\./,
    ],
    [`notctor`, / is not a constructor(?![\w\uFFFF])/],
    [`notfn`, / is not a function(?![\w\uFFFF])/],
    [
      `readonly`,
      /read[- ]?only property|" is read-only|Assignment to constant variable|invalid assignment to const |which has only a getter$|^setting getter-only property |, object is not extensible$|^can't define property |^Attempting to define property on object that is not extensible|^Cannot create property |^can't assign to property /,
    ],
    [
      `cyclic`,
      /circular structure|cyclic object value|JSON\.stringify cannot serialize cyclic structures/,
    ],
    [
      `illegal`,
      /Illegal invocation|Illegal constructor|called on an object that does not implement interface | called on incompatible |^Can only call [^\s\uFFFF]+ on instances of |^The [^\s\uFFFF]+ getter can only be used on instances of /,
    ],
  ]);
  (ObservabilityTelemetrySplit = `blank_refused.wait_keys.drift_dead.paste_lines.carried_lost.dead_home.dead_input.stale_gone.stale_shown.reseat_stale.reseat_carry.seat_dead.seat_unsent.seat_blocks.deny_rescue.undo_tail.fuse_struct.fuse_text.deny_breaker.gesture_coarse.peel_noinv.peel_own.peel_stranded.peel_final.flush_paste.flush_nospell.filter_noops.orphan.remount_learn.restage_again.restage_ro.restage_gone.boot_keys.unlabelled`.split(
      `.`,
    ));
  (observabilityTelemetrySet12 = new (Set as Dynamic)(
    ObservabilityTelemetrySplit,
  ));
}

export {
  ObservabilityTelemetry259dc54003a391cffb50b52b94c913ed15d92d1c,
  ObservabilityTelemetryBlob,
  ObservabilityTelemetryLocal,
  ObservabilityTelemetryNotsupported,
  ObservabilityTelemetryNull,
  ObservabilityTelemetryRowLn,
  ObservabilityTelemetrySENTRYDSNSERVER,
  ObservabilityTelemetrySplit,
  ObservabilityTelemetryState3,
  ObservabilityTelemetryState4,
  ObservabilityTelemetryWidgetFault,
  TELEMETRY_ATTRIBUTE_NAMES,
  clearObservabilityTelemetryDelete,
  collectObservabilityTelemetryValue,
  ddLog,
  filterObservabilityTelemetryJoin,
  getObservabilityTelemetryCode,
  injectTraceparent,
  installObservabilityTelemetryPagehide,
  isObservabilityTelemetryRemote,
  isObservabilityTelemetryValue,
  isObservabilityTelemetryValue2,
  isObservabilityTelemetryValue3,
  observabilityTelemetryChunkLnColValues,
  observabilityTelemetryHostLocalBothFreshValues,
  observabilityTelemetryPattern16,
  observabilityTelemetrySet12,
  resolveObservabilityTelemetryBootGaveUp,
  resolveObservabilityTelemetryCache,
  resolveObservabilityTelemetryChunk,
  resolveObservabilityTelemetryFailed,
  resolveObservabilityTelemetryFind,
  resolveObservabilityTelemetryIncludes,
  resolveObservabilityTelemetryIncludes2,
  resolveObservabilityTelemetryIsFinite,
  resolveObservabilityTelemetryJoin,
  resolveObservabilityTelemetryKind2,
  resolveObservabilityTelemetryMessage,
  resolveObservabilityTelemetryMsgKind,
  resolveObservabilityTelemetryMsgKind2,
  resolveObservabilityTelemetryNull,
  resolveObservabilityTelemetryOrdinal,
  resolveObservabilityTelemetryOrdinal2,
  resolveObservabilityTelemetryReady3,
  resolveObservabilityTelemetryRowLn,
  resolveObservabilityTelemetryShellUnanswered,
  resolveObservabilityTelemetrySlice2,
  resolveObservabilityTelemetryTest,
  resolveObservabilityTelemetryTest6,
  resolveObservabilityTelemetryThrown,
  resolveObservabilityTelemetryThrown2,
  resolveObservabilityTelemetryValue13,
  resolveObservabilityTelemetryValue14,
  resolveObservabilityTelemetryValue15,
  resolveObservabilityTelemetryValue16,
  resolveObservabilityTelemetryValue4,
  resolveObservabilityTelemetryValue6,
  resolveObservabilityTelemetryValue7,
  resolveObservabilityTelemetryWarn,
  resolveObservabilityTelemetryWord2,
  routePattern,
  setDdUser,
  setTraceUser,
  withWebSpan,
};
