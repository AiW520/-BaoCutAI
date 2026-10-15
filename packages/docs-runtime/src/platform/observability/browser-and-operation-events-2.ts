/** BaoCut: observability browser and operation events from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  helloDImport,
  helloLImport,
  helloSImport,
} from "../dependencies";
import {
  observabilityTelemetryHostLocalBothFreshValues,
  resolveObservabilityTelemetryFind,
} from "./telemetry-1";
import {
  ObservabilityTelemetryBusy,
  ObservabilityTelemetrySplit2,
  observabilityTelemetryAvailableIfSummonedNoSessionUnsupportedValues,
  observabilityTelemetryEmptyWordsValues,
  observabilityTelemetryOwnOtherAgentBothValues,
  observabilityTelemetryOwnOtherBothValues,
  observabilityTelemetryPattern29,
  observabilityTelemetryRepliedBothEditedNeitherValues,
  observabilityTelemetryRouteSessionRouteNewRouteOtherCarrierValues,
  observabilityTelemetryShownByHandNotSureLookingValues,
  observabilityTelemetrySpotBookSpotAskSpotNumSpotPosValues,
  observabilityTelemetryTypedMenuHintShortcutValues,
  observabilityTelemetryWriteBlankCommentValues,
  observabilityTelemetryWriteBlankValues,
  observabilityTelemetryWrittenRepliedEndedFailedValues2,
} from "./telemetry-2";
import {
  emitTelemetryEvent,
} from "./telemetry-3";
import {
  PlatformArtifactLinksCodeArtifact,
  resolvePlatformArtifactLinksIncludes2,
  resolvePlatformArtifactLinksTest2,
} from "../services/artifact-links";
import {
  editorExtensionsSet12,
} from "../../prose-editor/platform/extensions-3";
import {
  EditorAnchorsAndMentionsStyles,
} from "../../prose-editor/platform/anchors-and-mentions-1";
import {
  getEditorProofreadingIssues,
  resolveEditorProofreadingExec,
  resolveEditorProofreadingValue2,
} from "../../prose-editor/platform/proofreading";
import {
  observabilityBrowserAndOperationEventsSet12,
  observabilityBrowserAndOperationEventsSet13,
  observabilityBrowserAndOperationEventsSet14,
  observabilityBrowserAndOperationEventsSet15,
  observabilityBrowserAndOperationEventsSet16,
  observabilityBrowserAndOperationEventsSet17,
  observabilityBrowserAndOperationEventsSet18,
  resolveObservabilityBrowserAndOperationEventsIsFinite,
  resolveObservabilityBrowserAndOperationEventsRound,
  resolveObservabilityBrowserAndOperationEventsTest6,
  resolveObservabilityBrowserAndOperationEventsTest7,
  resolveObservabilityBrowserAndOperationEventsValue12,
  sanitizeTelemetryComponent,
} from "./browser-and-operation-events-1";

function resolveObservabilityBrowserAndOperationEventsKey4(
  request?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let hasEnd: Dynamic = observabilityBrowserAndOperationEventsSet13.has(
    request.end,
  );
  let hasEnd2: Dynamic = observabilityBrowserAndOperationEventsSet14.has(
    request.end,
  );
  let hasEnd3: Dynamic = observabilityBrowserAndOperationEventsSet15.has(
    request.end,
  );
  let end: Dynamic =
    hasEnd ||
    hasEnd2 ||
    hasEnd3 ||
    observabilityBrowserAndOperationEventsSet12.has(request.end)
      ? request.end
      : `unrowed`;
  let card: Dynamic =
    request.card !== undefined &&
    observabilityBrowserAndOperationEventsSet16.has(request.card)
      ? request.card
      : undefined;
  let key: Dynamic = resolveObservabilityBrowserAndOperationEventsTest7(
    card === undefined ? [`run`, end] : [`run`, end, card],
    request.host,
    2,
  );
  let plat: Dynamic = resolveObservabilityBrowserAndOperationEventsTest6(
    request.plat,
  );
  let observabilityBrowserAndOperationEventsIsFinite: Dynamic =
    resolveObservabilityBrowserAndOperationEventsIsFinite(request.ms);
  let label =
    observabilityBrowserAndOperationEventsIsFinite === undefined
      ? undefined
      : end === `written` &&
          observabilityBrowserAndOperationEventsSet17.has(request.whose)
        ? `${request.whose}-${observabilityBrowserAndOperationEventsIsFinite}`
        : end === `gone` &&
            observabilityBrowserAndOperationEventsSet18.has(request.road)
          ? `${request.road}-${observabilityBrowserAndOperationEventsIsFinite}`
          : undefined;
  let label2: Dynamic =
    request.host !== undefined &&
    observabilityTelemetryPattern29.test(
      `${key}:${sanitizeTelemetryComponent(request.host)}`,
    )
      ? `${key}:${sanitizeTelemetryComponent(request.host)}`
      : key;
  let dur: Dynamic =
    label !== undefined &&
    observabilityTelemetryPattern29.test(`${label2}:${label}`)
      ? label
      : observabilityBrowserAndOperationEventsIsFinite;
  return {
    name: hasEnd
      ? `pages.summon.run_untied`
      : hasEnd2
        ? `pages.summon.run_late`
        : hasEnd3
          ? `pages.summon.run_marked`
          : `pages.summon.run`,
    key: key,
    fields: {
      end: end,
      ...(card !== undefined && {
        card: card,
      }),
      component: key,
      ...(request.host !== undefined && {
        host: sanitizeTelemetryComponent(request.host),
      }),
      ...(request.ms !== undefined &&
        Number.isFinite(request.ms) &&
        request.ms >= 0 && {
          ms: Math.round(request.ms),
        }),
      ...(dur !== undefined && {
        dur: dur,
      }),
      ...resolveObservabilityBrowserAndOperationEventsValue12(request.ms),
      ...(plat !== undefined && {
        plat: plat,
      }),
    },
    ...(plat !== undefined && {
      wire: {
        word: plat,
      },
    }),
  };
}

var ObservabilityBrowserAndOperationEventsOpen: Dynamic;

function resolveObservabilityBrowserAndOperationEventsField(
  observabilityBrowserAndOperationEventsField?: Dynamic,
  key?: Dynamic,
  context: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let {
    field: ObservabilityBrowserAndOperationEventsOpenItem,
    words: ObservabilityBrowserAndOperationEventsOpenItem2,
  }: Dynamic =
    ObservabilityBrowserAndOperationEventsOpen[
      observabilityBrowserAndOperationEventsField
    ];
  if (!ObservabilityBrowserAndOperationEventsOpenItem2.has(key)) return null;
  let component: Dynamic = resolveObservabilityBrowserAndOperationEventsTest7(
    [`ask`, observabilityBrowserAndOperationEventsField, key],
    context.host,
    3,
  );
  let plat: Dynamic = resolveObservabilityBrowserAndOperationEventsTest6(
    context.plat,
  );
  let observabilityBrowserAndOperationEventsValue16: Dynamic =
    observabilityBrowserAndOperationEventsField === `refused` &&
    observabilityBrowserAndOperationEventsSet19.has(key)
      ? resolveObservabilityBrowserAndOperationEventsValue16(context.who)
      : undefined;
  return {
    name: `pages.ask.${observabilityBrowserAndOperationEventsField}`,
    key: key,
    fields: {
      [ObservabilityBrowserAndOperationEventsOpenItem]: key,
      component: component,
      ...(context.host !== undefined && {
        host: sanitizeTelemetryComponent(context.host),
      }),
      ...(plat !== undefined && {
        plat: plat,
      }),
    },
    ...(plat !== undefined && {
      wire: {
        word:
          observabilityBrowserAndOperationEventsValue16 === undefined
            ? plat
            : `${plat}.${observabilityBrowserAndOperationEventsValue16}`,
      },
    }),
  };
}

var observabilityBrowserAndOperationEventsSet19: Dynamic;

var resolveObservabilityBrowserAndOperationEventsSpotUnk: Dynamic;

var observabilityBrowserAndOperationEventsSet20: Dynamic;

var resolveObservabilityBrowserAndOperationEventsValue16: Dynamic;

var observabilityBrowserAndOperationEventsSet21: Dynamic;

var observabilityBrowserAndOperationEventsSet22: Dynamic;

function createPagesAskLineEvent(
  request?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let count: Dynamic =
    typeof request.count == `number` && Number.isFinite(request.count)
      ? resolveObservabilityBrowserAndOperationEventsRound(request.count)
      : 0;
  if (count < 1) return null;
  let card: Dynamic = observabilityBrowserAndOperationEventsSet21.has(
    request.card,
  )
    ? request.card
    : `unrowed`;
  let key = `ask:line:typed:${card}:${observabilityBrowserAndOperationEventsSet22.has(request.whose) ? request.whose : `unrowed`}`;
  let plat: Dynamic = resolveObservabilityBrowserAndOperationEventsTest6(
    request.plat,
  );
  return {
    name: `pages.ask.line`,
    key: key,
    fields: {
      card: card,
      component: key,
      count: count,
      ...(request.host !== undefined && {
        host: sanitizeTelemetryComponent(request.host),
      }),
      ...(plat !== undefined && {
        plat: plat,
      }),
    },
    ...(plat !== undefined && {
      wire: {
        word: plat,
      },
    }),
  };
}

var observabilityBrowserAndOperationEventsSet23: Dynamic;

function createPagesAskMarkedEvent(
  request?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!observabilityBrowserAndOperationEventsSet23.has(request.end))
    return null;
  let card: Dynamic =
    typeof request.card == `string` &&
    observabilityBrowserAndOperationEventsSet16.has(request.card)
      ? request.card
      : undefined;
  let key: Dynamic = resolveObservabilityBrowserAndOperationEventsTest7(
    card === undefined
      ? [`marked`, request.end]
      : [`marked`, request.end, card],
    request.host,
    2,
  );
  let plat: Dynamic = resolveObservabilityBrowserAndOperationEventsTest6(
    request.plat,
  );
  let observabilityBrowserAndOperationEventsIsFinite: Dynamic =
    resolveObservabilityBrowserAndOperationEventsIsFinite(request.ms);
  let label =
    observabilityBrowserAndOperationEventsIsFinite !== undefined &&
    request.end === `written` &&
    observabilityBrowserAndOperationEventsSet17.has(request.whose)
      ? `${request.whose}-${observabilityBrowserAndOperationEventsIsFinite}`
      : undefined;
  let label2: Dynamic =
    request.host !== undefined &&
    observabilityTelemetryPattern29.test(
      `${key}:${sanitizeTelemetryComponent(request.host)}`,
    )
      ? `${key}:${sanitizeTelemetryComponent(request.host)}`
      : key;
  let dur: Dynamic =
    label !== undefined &&
    observabilityTelemetryPattern29.test(`${label2}:${label}`)
      ? label
      : observabilityBrowserAndOperationEventsIsFinite;
  let count: Dynamic =
    typeof request.standing == `number` &&
    Number.isInteger(request.standing) &&
    request.standing >= 1 &&
    request.standing <= 3
      ? request.standing
      : undefined;
  return {
    name: `pages.ask.marked`,
    key: key,
    fields: {
      end: request.end,
      ...(card !== undefined && {
        card: card,
      }),
      component: key,
      ...(request.host !== undefined && {
        host: sanitizeTelemetryComponent(request.host),
      }),
      ...(request.ms !== undefined &&
        Number.isFinite(request.ms) &&
        request.ms >= 0 && {
          ms: Math.round(request.ms),
        }),
      ...(dur !== undefined && {
        dur: dur,
      }),
      ...(count !== undefined && {
        count: count,
      }),
      ...(plat !== undefined && {
        plat: plat,
      }),
    },
    ...(plat !== undefined && {
      wire: {
        word: plat,
      },
    }),
  };
}

var observabilityBrowserAndOperationEventsSet24: Dynamic;

var observabilityBrowserAndOperationEventsSet25: Dynamic;

var ObservabilityBrowserAndOperationEventsAvailableIfSummoned: Dynamic;

function createPagesAskRoadEvent(
  road?: Dynamic,
  options: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  if (!observabilityBrowserAndOperationEventsSet24.has(road)) return null;
  let ObservabilityBrowserAndOperationEventsAvailableIfSummonedItem: Dynamic =
    options.why === undefined
      ? undefined
      : (ObservabilityBrowserAndOperationEventsAvailableIfSummoned[
          options.why
        ] ?? options.why);
  let why: Dynamic =
    road === `carrier` &&
    ObservabilityBrowserAndOperationEventsAvailableIfSummonedItem !==
      undefined &&
    observabilityBrowserAndOperationEventsSet25.has(
      ObservabilityBrowserAndOperationEventsAvailableIfSummonedItem,
    )
      ? ObservabilityBrowserAndOperationEventsAvailableIfSummonedItem
      : undefined;
  let observabilityBrowserAndOperationEventsTest7: Dynamic =
    resolveObservabilityBrowserAndOperationEventsTest7(
      [`took`, road, ...(why === undefined ? [] : [why])],
      options.host,
      2,
    );
  let key: Dynamic = observabilityTelemetryPattern29.test(
    observabilityBrowserAndOperationEventsTest7,
  )
    ? observabilityBrowserAndOperationEventsTest7
    : `took:${road}`;
  let plat: Dynamic = resolveObservabilityBrowserAndOperationEventsTest6(
    options.plat,
  );
  return {
    name: `pages.ask.road`,
    key: key,
    fields: {
      road: road,
      ...(why !== undefined && {
        why: why,
      }),
      component: key,
      ...(options.host !== undefined && {
        host: sanitizeTelemetryComponent(options.host),
      }),
      ...(plat !== undefined && {
        plat: plat,
      }),
    },
    ...(plat !== undefined && {
      wire: {
        word: plat,
      },
    }),
  };
}

var observabilityBrowserAndOperationEventsSet26: Dynamic;

function createPagesSummonRoundEvent(
  pagesSummonRoundEvent?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let end: Dynamic = observabilityBrowserAndOperationEventsSet26.has(
    pagesSummonRoundEvent.end,
  )
    ? pagesSummonRoundEvent.end
    : `unrowed`;
  let key: Dynamic = resolveObservabilityBrowserAndOperationEventsTest7(
    [
      `round`,
      end,
      pagesSummonRoundEvent.road === `thread_reply` ? `thread` : `comment`,
    ],
    pagesSummonRoundEvent.host,
    2,
  );
  let plat: Dynamic = resolveObservabilityBrowserAndOperationEventsTest6(
    pagesSummonRoundEvent.plat,
  );
  return {
    name: `pages.summon.round`,
    key: key,
    fields: {
      end: end,
      road: pagesSummonRoundEvent.road,
      component: key,
      ...(pagesSummonRoundEvent.host !== undefined && {
        host: sanitizeTelemetryComponent(pagesSummonRoundEvent.host),
      }),
      ...(plat !== undefined && {
        plat: plat,
      }),
    },
    ...(plat !== undefined && {
      wire: {
        word: plat,
      },
    }),
  };
}

var observabilityBrowserAndOperationEventsSet27: Dynamic;

function resolveObservabilityBrowserAndOperationEventsKey5(
  observabilityBrowserAndOperationEventsKey5?: Dynamic,
  options?: Dynamic,
  context: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let key: Dynamic = resolveObservabilityTelemetryFind(
    observabilityBrowserAndOperationEventsKey5,
  );
  if (key === null) return null;
  let matchesOptions = options === `add`;
  if (
    !matchesOptions &&
    !observabilityBrowserAndOperationEventsSet27.has(options)
  )
    return null;
  let component: Dynamic = resolveObservabilityBrowserAndOperationEventsTest7(
    matchesOptions ? [`seen`, `add`, key] : [`seen`, key, options],
    context.host,
    3,
  );
  let plat: Dynamic = resolveObservabilityBrowserAndOperationEventsTest6(
    context.plat,
  );
  return {
    name: matchesOptions ? `pages.seen.add` : `pages.seen.read`,
    key: key,
    fields: {
      component: component,
      ...(context.host !== undefined && {
        host: sanitizeTelemetryComponent(context.host),
      }),
      ...(plat !== undefined && {
        plat: plat,
      }),
    },
    ...(plat !== undefined && {
      wire: {
        word: plat,
      },
    }),
  };
}

var observabilityBrowserAndOperationEventsSet28: Dynamic;

var isObservabilityBrowserAndOperationEventsValue: (observabilityBrowserAndOperationEventsValue?: Dynamic, ..._extraArguments: unknown[]) => boolean;

function resolveObservabilityBrowserAndOperationEventsKey6(
  observabilityBrowserAndOperationEventsKey6?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    name: isObservabilityBrowserAndOperationEventsValue(
      observabilityBrowserAndOperationEventsKey6.trigger,
    )
      ? `pages.sample.unbidden`
      : `pages.sample.invoked`,
    key: `${observabilityBrowserAndOperationEventsKey6.feature}:${observabilityBrowserAndOperationEventsKey6.trigger}:${+!!observabilityBrowserAndOperationEventsKey6.summonLive}`,
    fields: {
      feature: observabilityBrowserAndOperationEventsKey6.feature,
      trigger: observabilityBrowserAndOperationEventsKey6.trigger,
      summonLive: observabilityBrowserAndOperationEventsKey6.summonLive,
    },
  };
}

function createPagesSampleConsentEvent(
  pagesSampleConsentEvent?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    name: `pages.sample.consent`,
    key: `${pagesSampleConsentEvent.outcome}:${pagesSampleConsentEvent.feature}`,
    fields: {
      feature: pagesSampleConsentEvent.feature,
      outcome: pagesSampleConsentEvent.outcome,
    },
  };
}

var observabilityBrowserAndOperationEventsSet29: Dynamic;

function resolveObservabilityBrowserAndOperationEventsCancelled(
  observabilityBrowserAndOperationEventsCancelled?: unknown,
  ..._extraArguments: unknown[]
) {
  return observabilityBrowserAndOperationEventsCancelled === `cancelled`
    ? `aborted`
    : typeof observabilityBrowserAndOperationEventsCancelled == `string` &&
        observabilityBrowserAndOperationEventsSet29.has(
          observabilityBrowserAndOperationEventsCancelled,
        )
      ? observabilityBrowserAndOperationEventsCancelled
      : `other`;
}

function createPagesSampleUnavailableEvent(
  error?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let reason = resolveObservabilityBrowserAndOperationEventsCancelled(
    error.code,
  );
  return {
    name: `pages.sample.unavailable`,
    key: `${error.feature}:${reason}`,
    fields: {
      feature: error.feature,
      trigger: error.trigger,
      reason: reason,
    },
  };
}

var observabilityBrowserAndOperationEventsValue_12: Dynamic;

var resolveObservabilityBrowserAndOperationEventsValue17: Dynamic;

var resolveObservabilityBrowserAndOperationEventsValue18: (observabilityBrowserAndOperationEventsValue18?: Dynamic, ..._extraArguments: unknown[]) => undefined;

var observabilityBrowserAndOperationEventsValue_13: boolean;

var observabilityBrowserAndOperationEventsSet30: Dynamic;

function clearObservabilityBrowserAndOperationEventsDelete(
  clearObservabilityBrowserAndOperationEventsDelete2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  observabilityBrowserAndOperationEventsSet30.add(
    clearObservabilityBrowserAndOperationEventsDelete2,
  );
  return (..._extraArguments: unknown[]): Dynamic =>
    observabilityBrowserAndOperationEventsSet30.delete(
      clearObservabilityBrowserAndOperationEventsDelete2,
    );
}

function resolveObservabilityBrowserAndOperationEventsFeature(
  observabilityBrowserAndOperationEventsFeature?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  emitTelemetryEvent(
    resolveObservabilityBrowserAndOperationEventsKey6({
      feature: observabilityBrowserAndOperationEventsFeature.feature,
      trigger: observabilityBrowserAndOperationEventsFeature.trigger,
      summonLive: resolveObservabilityBrowserAndOperationEventsValue17(),
    }),
  );
}

function resolveObservabilityBrowserAndOperationEventsFeature2(
  observabilityBrowserAndOperationEventsFeature2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (options === `ok`) {
    if (observabilityBrowserAndOperationEventsValue_13) return;
    observabilityBrowserAndOperationEventsValue_13 = true;
    emitTelemetryEvent(
      createPagesSampleConsentEvent({
        feature: observabilityBrowserAndOperationEventsFeature2.feature,
        outcome: `granted`,
      }),
    );
    for (let resolveObservabilityBrowserAndOperationEventsFeature2Result of observabilityBrowserAndOperationEventsSet30 as Dynamic)
      resolveObservabilityBrowserAndOperationEventsFeature2Result();
    return;
  }
  if (options === `not_granted`) {
    emitTelemetryEvent(
      createPagesSampleConsentEvent({
        feature: observabilityBrowserAndOperationEventsFeature2.feature,
        outcome: `declined`,
      }),
    );
  }
  resolveObservabilityBrowserAndOperationEventsFeature3(
    observabilityBrowserAndOperationEventsFeature2,
    options,
  );
}

function resolveObservabilityBrowserAndOperationEventsFeature3(
  observabilityBrowserAndOperationEventsFeature3?: Dynamic,
  code?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  emitTelemetryEvent(
    createPagesSampleUnavailableEvent({
      feature: observabilityBrowserAndOperationEventsFeature3.feature,
      trigger: observabilityBrowserAndOperationEventsFeature3.trigger,
      code: code,
    }),
  );
}

var observabilityBrowserAndOperationEventsSet31: Dynamic;

var observabilityBrowserAndOperationEventsSet32: Dynamic;

var resolveObservabilityBrowserAndOperationEventsValue19: Dynamic;

async function loadObservabilityBrowserAndOperationEventsSample(
  observabilityBrowserAndOperationEventsSample?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  if (
    observabilityBrowserAndOperationEventsSample == null ||
    typeof observabilityBrowserAndOperationEventsSample.use != `function`
  )
    return null;
  try {
    let use: Dynamic =
      await observabilityBrowserAndOperationEventsSample.use(`sample`);
    return typeof use == `function` ? use : null;
  } catch {
    return null;
  }
}

var resolveObservabilityBrowserAndOperationEventsEncode: Dynamic;

async function loadObservabilityBrowserAndOperationEventsModelTier(
  observabilityBrowserAndOperationEventsModelTier?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let record2: Dynamic = {
    ...(options.modelTier
      ? {
          modelTier: options.modelTier,
        }
      : {}),
    ...(options.cache === false
      ? {
          cache: false,
        }
      : {}),
  };
  let loadObservabilityBrowserAndOperationEventsModelTierResult: Dynamic;
  try {
    loadObservabilityBrowserAndOperationEventsModelTierResult =
      await observabilityBrowserAndOperationEventsModelTier(
        options.prompt,
        record2,
      );
  } catch (error: Dynamic) {
    if (
      !(
        resolveObservabilityBrowserAndOperationEventsValue19(error) &&
        error.code === `invalid_request`
      )
    )
      throw error;
    loadObservabilityBrowserAndOperationEventsModelTierResult =
      await observabilityBrowserAndOperationEventsModelTier({
        prompt: options.prompt,
        ...record2,
      });
  }
  if (
    !resolveObservabilityBrowserAndOperationEventsValue19(
      loadObservabilityBrowserAndOperationEventsModelTierResult,
    )
  )
    return null;
  let text: Dynamic =
    typeof loadObservabilityBrowserAndOperationEventsModelTierResult.text ==
    `string`
      ? loadObservabilityBrowserAndOperationEventsModelTierResult.text
      : loadObservabilityBrowserAndOperationEventsModelTierResult.completion;
  return typeof text == `string`
    ? {
        text: text,
        truncated:
          loadObservabilityBrowserAndOperationEventsModelTierResult.truncated ===
          true,
      }
    : null;
}

async function loadObservabilityBrowserAndOperationEventsCode(
  observabilityBrowserAndOperationEventsCode?: unknown,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  if (typeof observabilityBrowserAndOperationEventsCode != `function`)
    return {
      ok: false,
      code: `unavailable`,
    };
  if (typeof options.prompt != `string` || options.prompt.trim() === ``)
    return {
      ok: false,
      code: `invalid_request`,
    };
  if (
    resolveObservabilityBrowserAndOperationEventsEncode(options.prompt) > 65536
  )
    return {
      ok: false,
      code: `prompt_too_large`,
    };
  if (context !== undefined) {
    resolveObservabilityBrowserAndOperationEventsFeature(context);
  }
  try {
    let observabilityBrowserAndOperationEventsModelTier =
      await loadObservabilityBrowserAndOperationEventsModelTier(
        observabilityBrowserAndOperationEventsCode,
        options,
      );
    if (
      observabilityBrowserAndOperationEventsModelTier === null ||
      observabilityBrowserAndOperationEventsModelTier.text === ``
    ) {
      let code =
        observabilityBrowserAndOperationEventsModelTier === null
          ? `malformed`
          : `empty_completion`;
      if (context !== undefined) {
        resolveObservabilityBrowserAndOperationEventsFeature3(context, code);
      }
      return {
        ok: false,
        code: code,
      };
    }
    if (context !== undefined) {
      resolveObservabilityBrowserAndOperationEventsFeature2(context, `ok`);
    }
    return {
      ok: true,
      completion: observabilityBrowserAndOperationEventsModelTier.text,
      truncated: observabilityBrowserAndOperationEventsModelTier.truncated,
    };
  } catch (error: Dynamic) {
    let code: Dynamic =
      resolveObservabilityBrowserAndOperationEventsValue19(error) &&
      typeof error.code == `string`
        ? error.code
        : ``;
    if (context !== undefined) {
      resolveObservabilityBrowserAndOperationEventsFeature2(context, code);
    }
    return {
      ok: false,
      code: observabilityBrowserAndOperationEventsSet31.has(code)
        ? code
        : `upstream_error`,
    };
  }
}

var resolveObservabilityBrowserAndOperationEventsValue20: Dynamic;

async function loadObservabilityBrowserAndOperationEventsSample2(
  observabilityBrowserAndOperationEventsSample2?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  if (observabilityBrowserAndOperationEventsSample2 == null) return null;
  if (typeof observabilityBrowserAndOperationEventsSample2.use == `function`)
    try {
      let use: Dynamic =
        await observabilityBrowserAndOperationEventsSample2.use(`sample`);
      if (typeof use == `function`) return use;
      if (use === null) return null;
    } catch {}
  return typeof observabilityBrowserAndOperationEventsSample2.sample ==
    `function`
    ? observabilityBrowserAndOperationEventsSample2.sample
    : null;
}

async function loadObservabilityBrowserAndOperationEventsValue(
  observabilityBrowserAndOperationEventsValue?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    (await loadObservabilityBrowserAndOperationEventsSample2(
      observabilityBrowserAndOperationEventsValue,
    )) !== null
  );
}

var observabilityBrowserAndOperationEventsSet33: Dynamic;

var ObservabilityBrowserAndOperationEventsIssues: Dynamic;

async function loadObservabilityBrowserAndOperationEventsIssues(
  observabilityBrowserAndOperationEventsIssues?: Dynamic,
  items?: Dynamic,
  context?: Dynamic,
  trigger?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let observabilityBrowserAndOperationEventsSample2: Dynamic =
    await loadObservabilityBrowserAndOperationEventsSample2(
      observabilityBrowserAndOperationEventsIssues,
    );
  if (observabilityBrowserAndOperationEventsSample2 === null)
    return ObservabilityBrowserAndOperationEventsIssues;
  if (items.length === 0)
    return {
      issues: [],
      failed: false,
      unavailable: false,
    };
  let loadObservabilityBrowserAndOperationEventsIssuesResult: Dynamic;
  let record2: Dynamic = {
    feature: `proofread`,
    trigger: trigger,
  };
  resolveObservabilityBrowserAndOperationEventsFeature(record2);
  try {
    let observabilityBrowserAndOperationEventsModelTier =
      await loadObservabilityBrowserAndOperationEventsModelTier(
        observabilityBrowserAndOperationEventsSample2,
        {
          prompt: resolveEditorProofreadingValue2(items, context),
          modelTier: `quick`,
          cache: false,
        },
      );
    loadObservabilityBrowserAndOperationEventsIssuesResult =
      observabilityBrowserAndOperationEventsModelTier?.text ?? ``;
    if (observabilityBrowserAndOperationEventsModelTier !== null) {
      resolveObservabilityBrowserAndOperationEventsFeature2(record2, `ok`);
    }
    if (loadObservabilityBrowserAndOperationEventsIssuesResult === ``) {
      resolveObservabilityBrowserAndOperationEventsFeature3(
        record2,
        observabilityBrowserAndOperationEventsModelTier === null
          ? `malformed`
          : `empty_completion`,
      );
    }
  } catch (error: Dynamic) {
    let code: Dynamic =
      resolveObservabilityBrowserAndOperationEventsValue20(error) &&
      typeof error.code == `string`
        ? error.code
        : ``;
    resolveObservabilityBrowserAndOperationEventsFeature2(record2, code);
    return observabilityBrowserAndOperationEventsSet33.has(code)
      ? ObservabilityBrowserAndOperationEventsIssues
      : {
          issues: [],
          failed: true,
          unavailable: false,
        };
  }
  if (loadObservabilityBrowserAndOperationEventsIssuesResult === ``)
    return {
      issues: [],
      failed: true,
      unavailable: false,
    };
  let editorProofreadingExec: Dynamic = resolveEditorProofreadingExec(
    loadObservabilityBrowserAndOperationEventsIssuesResult,
  );
  return editorProofreadingExec === null
    ? {
        issues: [],
        failed: true,
        unavailable: false,
      }
    : {
        issues: getEditorProofreadingIssues(editorProofreadingExec, items),
        failed: false,
        unavailable: false,
      };
}

var ObservabilityBrowserAndOperationEventsBongoFrameMount: string;

var ObservabilityBrowserAndOperationEventsBongoLastTab: string;

var observabilityBrowserAndOperationEventsValue322: number;

function resolveObservabilityBrowserAndOperationEventsGetItem(
  observabilityBrowserAndOperationEventsGetItem?: Dynamic,
  ..._extraArguments: unknown[]
) {
  try {
    return typeof observabilityBrowserAndOperationEventsGetItem.getItem(
      ObservabilityBrowserAndOperationEventsBongoFrameMount,
    ) == `string`
      ? `m1`
      : `m0`;
  } catch {
    return `mx`;
  }
}

function resolveObservabilityBrowserAndOperationEventsGetItem2(
  observabilityBrowserAndOperationEventsGetItem2?: Dynamic,
  options?: unknown,
  ..._extraArguments: unknown[]
) {
  if (typeof options != `string` || options === ``) return `tx`;
  let resolveObservabilityBrowserAndOperationEventsGetItem2Result: Dynamic;
  try {
    resolveObservabilityBrowserAndOperationEventsGetItem2Result =
      observabilityBrowserAndOperationEventsGetItem2.getItem(
        ObservabilityBrowserAndOperationEventsBongoLastTab,
      );
  } catch {
    return `tx`;
  }
  if (
    typeof resolveObservabilityBrowserAndOperationEventsGetItem2Result !=
      `string` ||
    resolveObservabilityBrowserAndOperationEventsGetItem2Result === ``
  )
    return `t0`;
  try {
    let parse: Dynamic = JSON.parse(
      resolveObservabilityBrowserAndOperationEventsGetItem2Result,
    );
    if (typeof parse != `object` || !parse || Array.isArray(parse)) return `t0`;
    let index = 0;
    for (let [
      resolveObservabilityBrowserAndOperationEventsGetItem2Result2,
      resolveObservabilityBrowserAndOperationEventsGetItem2Result3,
    ] of Object.entries(parse) as Dynamic)
      if (
        !(
          typeof resolveObservabilityBrowserAndOperationEventsGetItem2Result3 !=
            `string` ||
          resolveObservabilityBrowserAndOperationEventsGetItem2Result3 === ``
        )
      ) {
        if (
          resolveObservabilityBrowserAndOperationEventsGetItem2Result2 ===
          options
        )
          return `t1`;
        if (++index >= observabilityBrowserAndOperationEventsValue322) break;
      }
    return `t0`;
  } catch {
    return `t0`;
  }
}

function resolveObservabilityBrowserAndOperationEventsValue21(
  observabilityBrowserAndOperationEventsValue21?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return observabilityBrowserAndOperationEventsValue21 == null
    ? {
        m: `mx`,
        t: `tx`,
      }
    : {
        m: resolveObservabilityBrowserAndOperationEventsGetItem(
          observabilityBrowserAndOperationEventsValue21,
        ),
        t: resolveObservabilityBrowserAndOperationEventsGetItem2(
          observabilityBrowserAndOperationEventsValue21,
          options,
        ),
      };
}

function resolveObservabilityBrowserAndOperationEventsRead(
  ..._extraArguments: unknown[]
): Dynamic {
  let resolveObservabilityBrowserAndOperationEventsReadResult: Dynamic = null;
  let enabled = false;
  let enabled2 = false;
  return {
    read(
      observabilityBrowserAndOperationEventsRead?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (enabled) return;
      enabled = true;
      let resolveObservabilityBrowserAndOperationEventsReadResult2: Dynamic;
      try {
        resolveObservabilityBrowserAndOperationEventsReadResult2 =
          observabilityBrowserAndOperationEventsRead();
      } catch {
        resolveObservabilityBrowserAndOperationEventsReadResult2 = undefined;
      }
      let resolveObservabilityBrowserAndOperationEventsReadResult3: Dynamic;
      try {
        resolveObservabilityBrowserAndOperationEventsReadResult3 = options();
      } catch {
        resolveObservabilityBrowserAndOperationEventsReadResult3 = undefined;
      }
      resolveObservabilityBrowserAndOperationEventsReadResult =
        resolveObservabilityBrowserAndOperationEventsValue21(
          resolveObservabilityBrowserAndOperationEventsReadResult2,
          resolveObservabilityBrowserAndOperationEventsReadResult3,
        );
    },
    take(request?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      if (
        resolveObservabilityBrowserAndOperationEventsReadResult === null ||
        enabled2
      )
        return null;
      try {
        if (request() !== true) return null;
      } catch {
        return null;
      }
      enabled2 = true;
      return resolveObservabilityBrowserAndOperationEventsReadResult;
    },
  };
}

var ObservabilityBrowserAndOperationEventsAvatarUrl: Readonly<{
    id: null;
    name: "";
    avatarUrl: "";
    color: "";
    email: null;
    isOwner: false;
    canEdit: false;
}>;

var resolveObservabilityBrowserAndOperationEventsValue22: Dynamic;

async function loadObservabilityBrowserAndOperationEventsUser(
  observabilityBrowserAndOperationEventsUser?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  if (observabilityBrowserAndOperationEventsUser == null) return null;
  if (typeof observabilityBrowserAndOperationEventsUser.use == `function`)
    try {
      let use: Dynamic =
        await observabilityBrowserAndOperationEventsUser.use(`user`);
      if (resolveObservabilityBrowserAndOperationEventsValue22(use)) return use;
      if (use === null) return null;
    } catch {}
  return resolveObservabilityBrowserAndOperationEventsValue22(
    observabilityBrowserAndOperationEventsUser.user,
  )
    ? observabilityBrowserAndOperationEventsUser.user
    : null;
}

var resolveObservabilityBrowserAndOperationEventsValue23: Dynamic;

var resolveObservabilityBrowserAndOperationEventsValue24: Dynamic;

var resolveObservabilityBrowserAndOperationEventsValue25: (observabilityBrowserAndOperationEventsValue25?: Dynamic, ..._extraArguments: unknown[]) => boolean;

var resolveObservabilityBrowserAndOperationEventsOrigin: Dynamic;

var resolveObservabilityBrowserAndOperationEventsNull: Dynamic;

var resolveObservabilityBrowserAndOperationEventsStartsWith: Dynamic;

var resolveObservabilityBrowserAndOperationEventsAvatarUrl: Dynamic;

function resolveObservabilityBrowserAndOperationEventsAvatarUrl2(
  contributor?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return resolveObservabilityBrowserAndOperationEventsValue22(contributor)
    ? {
        id: options,
        name: resolveObservabilityBrowserAndOperationEventsValue23(
          contributor.name,
        ),
        avatarUrl: resolveObservabilityBrowserAndOperationEventsNull(
          contributor.avatarUrl,
        ),
        color: resolveObservabilityBrowserAndOperationEventsValue23(
          contributor.color,
        ),
        email: resolveObservabilityBrowserAndOperationEventsValue24(
          contributor.email,
        ),
        isMe: resolveObservabilityBrowserAndOperationEventsValue25(
          contributor.isMe,
        ),
      }
    : resolveObservabilityBrowserAndOperationEventsAvatarUrl(options);
}

async function loadObservabilityBrowserAndOperationEventsAvatarUrl(
  observabilityBrowserAndOperationEventsAvatarUrl?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let observabilityBrowserAndOperationEventsUser: Dynamic =
    await loadObservabilityBrowserAndOperationEventsUser(
      observabilityBrowserAndOperationEventsAvatarUrl,
    );
  if (
    observabilityBrowserAndOperationEventsUser === null ||
    typeof observabilityBrowserAndOperationEventsUser.me != `function`
  )
    return ObservabilityBrowserAndOperationEventsAvatarUrl;
  let contributor: Dynamic;
  try {
    contributor = await observabilityBrowserAndOperationEventsUser.me();
  } catch {
    return ObservabilityBrowserAndOperationEventsAvatarUrl;
  }
  return resolveObservabilityBrowserAndOperationEventsValue22(contributor)
    ? {
        id: resolveObservabilityBrowserAndOperationEventsValue24(
          contributor.id,
        ),
        name: resolveObservabilityBrowserAndOperationEventsValue23(
          contributor.name,
        ),
        avatarUrl: resolveObservabilityBrowserAndOperationEventsNull(
          contributor.avatarUrl,
        ),
        color: resolveObservabilityBrowserAndOperationEventsValue23(
          contributor.color,
        ),
        email: resolveObservabilityBrowserAndOperationEventsValue24(
          contributor.email,
        ),
        isOwner: resolveObservabilityBrowserAndOperationEventsValue25(
          contributor.isOwner,
        ),
        canEdit: resolveObservabilityBrowserAndOperationEventsValue25(
          contributor.canEdit,
        ),
      }
    : ObservabilityBrowserAndOperationEventsAvatarUrl;
}

async function loadObservabilityBrowserAndOperationEventsCanEdit(
  observabilityBrowserAndOperationEventsCanEdit?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let observabilityBrowserAndOperationEventsUser: Dynamic =
    await loadObservabilityBrowserAndOperationEventsUser(
      observabilityBrowserAndOperationEventsCanEdit,
    );
  if (
    observabilityBrowserAndOperationEventsUser === null ||
    typeof observabilityBrowserAndOperationEventsUser.me != `function`
  )
    return null;
  let loadObservabilityBrowserAndOperationEventsCanEditResult: Dynamic;
  try {
    loadObservabilityBrowserAndOperationEventsCanEditResult =
      await observabilityBrowserAndOperationEventsUser.me();
  } catch {
    return null;
  }
  return resolveObservabilityBrowserAndOperationEventsValue22(
    loadObservabilityBrowserAndOperationEventsCanEditResult,
  ) &&
    typeof loadObservabilityBrowserAndOperationEventsCanEditResult.canEdit ==
      `boolean`
    ? loadObservabilityBrowserAndOperationEventsCanEditResult.canEdit
    : null;
}

async function loadObservabilityBrowserAndOperationEventsValue2(
  observabilityBrowserAndOperationEventsValue2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let observabilityBrowserAndOperationEventsUser: Dynamic =
    await loadObservabilityBrowserAndOperationEventsUser(
      observabilityBrowserAndOperationEventsValue2,
    );
  if (
    observabilityBrowserAndOperationEventsUser === null ||
    typeof observabilityBrowserAndOperationEventsUser.can != `function`
  )
    return null;
  let loadObservabilityBrowserAndOperationEventsValue2Result: Dynamic;
  try {
    loadObservabilityBrowserAndOperationEventsValue2Result =
      await observabilityBrowserAndOperationEventsUser.can(options);
  } catch {
    return null;
  }
  return typeof loadObservabilityBrowserAndOperationEventsValue2Result ==
    `boolean`
    ? loadObservabilityBrowserAndOperationEventsValue2Result
    : null;
}

var observabilityBrowserAndOperationEventsValue10000: number;

async function loadObservabilityBrowserAndOperationEventsSchedule(
  observabilityBrowserAndOperationEventsSchedule?: Dynamic,
  options?: Dynamic,
  context: Dynamic = {},
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let items: Dynamic = [
    ...new (Set as Dynamic)(
      options.filter(
        (items3?: unknown, ..._extraArguments: unknown[]) =>
          typeof items3 == `string` && items3.length > 0,
      ),
    ),
  ];
  let record2: Dynamic = {};
  for (let loadObservabilityBrowserAndOperationEventsScheduleResult3 of items as Dynamic)
    record2[loadObservabilityBrowserAndOperationEventsScheduleResult3] =
      resolveObservabilityBrowserAndOperationEventsAvatarUrl(
        loadObservabilityBrowserAndOperationEventsScheduleResult3,
      );
  if (items.length === 0) return record2;
  let observabilityBrowserAndOperationEventsUser: Dynamic =
    await loadObservabilityBrowserAndOperationEventsUser(
      observabilityBrowserAndOperationEventsSchedule,
    );
  if (
    observabilityBrowserAndOperationEventsUser === null ||
    typeof observabilityBrowserAndOperationEventsUser.profiles != `function`
  )
    return record2;
  let { schedule: context2 }: Dynamic = context;
  let loadObservabilityBrowserAndOperationEventsScheduleResult: Dynamic;
  let items2: Dynamic =
    context2 === undefined
      ? []
      : [
          new (Promise as Dynamic)(
            (
              resolve?: unknown,
              reject?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              loadObservabilityBrowserAndOperationEventsScheduleResult =
                context2(
                  (..._extraArguments: unknown[]): Dynamic =>
                    reject(Error(`profiles timeout`)),
                  context.timeoutMs ?? 1e4,
                );
            },
          ),
        ];
  let loadObservabilityBrowserAndOperationEventsScheduleResult2: Dynamic;
  try {
    loadObservabilityBrowserAndOperationEventsScheduleResult2 =
      await Promise.race([
        observabilityBrowserAndOperationEventsUser.profiles(items),
        ...items2,
      ]);
  } finally {
    loadObservabilityBrowserAndOperationEventsScheduleResult?.();
  }
  if (
    !resolveObservabilityBrowserAndOperationEventsValue22(
      loadObservabilityBrowserAndOperationEventsScheduleResult2,
    )
  )
    return record2;
  for (let loadObservabilityBrowserAndOperationEventsScheduleResult3 of items as Dynamic)
    if (
      Object.hasOwn(
        loadObservabilityBrowserAndOperationEventsScheduleResult2,
        loadObservabilityBrowserAndOperationEventsScheduleResult3,
      )
    ) {
      record2[loadObservabilityBrowserAndOperationEventsScheduleResult3] =
        resolveObservabilityBrowserAndOperationEventsAvatarUrl2(
          loadObservabilityBrowserAndOperationEventsScheduleResult2[
            loadObservabilityBrowserAndOperationEventsScheduleResult3
          ],
          loadObservabilityBrowserAndOperationEventsScheduleResult3,
        );
    }
  return record2;
}

async function loadObservabilityBrowserAndOperationEventsSearch(
  observabilityBrowserAndOperationEventsSearch?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let observabilityBrowserAndOperationEventsUser: Dynamic =
    await loadObservabilityBrowserAndOperationEventsUser(
      observabilityBrowserAndOperationEventsSearch,
    );
  if (
    observabilityBrowserAndOperationEventsUser === null ||
    typeof observabilityBrowserAndOperationEventsUser.search != `function`
  )
    return [];
  let loadObservabilityBrowserAndOperationEventsSearchResult: Dynamic;
  try {
    loadObservabilityBrowserAndOperationEventsSearchResult =
      await observabilityBrowserAndOperationEventsUser.search(
        options.slice(0, 64),
      );
  } catch {
    return [];
  }
  if (!Array.isArray(loadObservabilityBrowserAndOperationEventsSearchResult))
    return [];
  let items: Dynamic = [];
  for (let loadObservabilityBrowserAndOperationEventsSearchResult2 of loadObservabilityBrowserAndOperationEventsSearchResult as Dynamic) {
    if (
      !resolveObservabilityBrowserAndOperationEventsValue22(
        loadObservabilityBrowserAndOperationEventsSearchResult2,
      ) ||
      typeof loadObservabilityBrowserAndOperationEventsSearchResult2.id !=
        `string` ||
      loadObservabilityBrowserAndOperationEventsSearchResult2.id.length === 0
    )
      continue;
    let observabilityBrowserAndOperationEventsAvatarUrl2: Dynamic =
      resolveObservabilityBrowserAndOperationEventsAvatarUrl2(
        loadObservabilityBrowserAndOperationEventsSearchResult2,
        loadObservabilityBrowserAndOperationEventsSearchResult2.id,
      );
    if (observabilityBrowserAndOperationEventsAvatarUrl2.name.length > 0) {
      items.push(observabilityBrowserAndOperationEventsAvatarUrl2);
    }
    if (items.length >= 8) break;
  }
  return items;
}

var observabilityBrowserAndOperationEventsValue30000: number;

var observabilityBrowserAndOperationEventsValue300000: number;

function loadObservabilityBrowserAndOperationEventsNow(
  fetchNames?: Dynamic,
  fetchFallback?: Dynamic,
  timers?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let { now: timers2, schedule: timers3 }: Dynamic = timers;
  let requestSource: string = `caller`;
  let inflight: Dynamic = new (Map as Dynamic)();
  let entries: Dynamic = new (Map as Dynamic)();
  let retryMetadata: Dynamic = new (Map as Dynamic)();
  let listeners: Dynamic = new (Set as Dynamic)();
  let generation = 0;
  let updateEntry = (
    observabilityBrowserAndOperationEventsNow?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let entryEntry: Dynamic = entries.get(
      observabilityBrowserAndOperationEventsNow.id,
    );
    if (
      !(
        entryEntry !== undefined &&
        (entryEntry.name !== `` ||
          observabilityBrowserAndOperationEventsNow.name === ``)
      )
    ) {
      entries.set(
        observabilityBrowserAndOperationEventsNow.id,
        observabilityBrowserAndOperationEventsNow,
      );
      generation++;
      for (let loadObservabilityBrowserAndOperationEventsNowResult of listeners as Dynamic)
        loadObservabilityBrowserAndOperationEventsNowResult();
    }
  };
  let retryIds: Dynamic = new (Set as Dynamic)();
  let retryTimer: Dynamic = null;
  let retryDelay = observabilityBrowserAndOperationEventsValue30000;
  let scheduleRetry = (..._extraArguments: unknown[]): undefined => {
    if (!(retryTimer !== null || retryIds.size === 0)) {
      retryTimer = timers3((..._extraArguments: unknown[]): undefined => {
        retryTimer = null;
        let items: Dynamic = [...retryIds];
        retryIds.clear();
        loadNames(items);
      }, retryDelay);
      retryDelay = Math.min(
        retryDelay * 2,
        observabilityBrowserAndOperationEventsValue300000,
      );
    }
  };
  let pendingRetries: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
    [...retryMetadata].filter(
      ([item]: Dynamic, ..._extraArguments: unknown[]) =>
        entries.get(item)?.name === `` &&
        !queuedIds.has(item) &&
        !retryIds.has(item),
    );
  let expiryTimer: Dynamic = null;
  let scheduleExpiry = (..._extraArguments: unknown[]): undefined => {
    if (expiryTimer !== null) return;
    let pendingRetries2: Dynamic = pendingRetries();
    if (pendingRetries2.length === 0) return;
    let timers4: Dynamic = timers2();
    expiryTimer = timers3(
      (..._extraArguments: unknown[]): undefined => {
        expiryTimer = null;
        let timers5: Dynamic = timers2();
        let mappedFilteredPendingRetries: Dynamic = pendingRetries()
          .filter(
            ([, activity]: Dynamic, ..._extraArguments: unknown[]) =>
              timers5 - activity.at >= activity.ttl,
          )
          .map(
            (
              [filteredPendingRetry]: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => filteredPendingRetry,
          );
        if (mappedFilteredPendingRetries.length > 0) {
          loadFromSource(`ladder`, mappedFilteredPendingRetries);
        } else {
          scheduleExpiry();
        }
      },
      Math.max(
        0,
        (Math.min as Dynamic)(
          ...pendingRetries2.map(
            ([, activity]: Dynamic, ..._extraArguments: unknown[]): number =>
              activity.at + activity.ttl - timers4,
          ),
        ),
      ),
    );
  };
  let batch: Dynamic = null;
  let batchSource: string = `caller`;
  let queuedIds: Dynamic = new (Set as Dynamic)();
  let flushBatch = (..._extraArguments: unknown[]): undefined => {
    let batch2: Dynamic = batch;
    let trigger: Dynamic = batchSource;
    batch = null;
    if (batch2 === null || batch2.size === 0) return;
    let items: Dynamic = [...batch2.keys()];
    fetchNames(items).then(
      (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        retryDelay = observabilityBrowserAndOperationEventsValue30000;
        let nameless = 0;
        let recovered = 0;
        for (let loadObservabilityBrowserAndOperationEventsNowResult of items as Dynamic) {
          queuedIds.delete(loadObservabilityBrowserAndOperationEventsNowResult);
          let resultItem: Dynamic =
            result[loadObservabilityBrowserAndOperationEventsNowResult] ??
            resolveObservabilityBrowserAndOperationEventsAvatarUrl(
              loadObservabilityBrowserAndOperationEventsNowResult,
            );
          let matchesName =
            entries.get(loadObservabilityBrowserAndOperationEventsNowResult)
              ?.name === ``;
          if (resultItem.name !== ``) {
            if (matchesName) {
              recovered++;
            }
            retryMetadata.delete(
              loadObservabilityBrowserAndOperationEventsNowResult,
            );
            fetchFallback?.(resultItem);
          } else {
            if (
              !matchesName &&
              entries.get(
                loadObservabilityBrowserAndOperationEventsNowResult,
              ) === undefined
            ) {
              nameless++;
            }
            let retryMetadataEntry: Dynamic = retryMetadata.get(
              loadObservabilityBrowserAndOperationEventsNowResult,
            );
            retryMetadata.set(
              loadObservabilityBrowserAndOperationEventsNowResult,
              {
                at: timers2(),
                ttl: retryMetadataEntry
                  ? Math.min(
                      retryMetadataEntry.ttl * 2,
                      observabilityBrowserAndOperationEventsValue300000,
                    )
                  : observabilityBrowserAndOperationEventsValue30000,
              },
            );
          }
          updateEntry(resultItem);
          batch2
            .get(loadObservabilityBrowserAndOperationEventsNowResult)
            .resolve(
              entries.get(
                loadObservabilityBrowserAndOperationEventsNowResult,
              ) ?? resultItem,
            );
        }
        scheduleExpiry();
        if (options !== undefined && (nameless > 0 || recovered > 0)) {
          options({
            nameless: nameless,
            recovered: recovered,
            trigger: trigger,
          });
        }
      },
      (..._extraArguments: unknown[]): undefined => {
        for (let loadObservabilityBrowserAndOperationEventsNowResult of items as Dynamic) {
          queuedIds.delete(loadObservabilityBrowserAndOperationEventsNowResult);
          if (
            inflight.get(
              loadObservabilityBrowserAndOperationEventsNowResult,
            ) ===
            batch2.get(loadObservabilityBrowserAndOperationEventsNowResult)
              .promise
          ) {
            inflight.delete(
              loadObservabilityBrowserAndOperationEventsNowResult,
            );
          }
          retryIds.add(loadObservabilityBrowserAndOperationEventsNowResult);
          batch2
            .get(loadObservabilityBrowserAndOperationEventsNowResult)
            .resolve(
              entries.get(loadObservabilityBrowserAndOperationEventsNowResult),
            );
        }
        scheduleRetry();
      },
    );
  };
  let loadNames: Dynamic = async (
    observabilityBrowserAndOperationEventsNow?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<Dynamic> => {
    let items: Dynamic = [
      ...new (Set as Dynamic)(
        observabilityBrowserAndOperationEventsNow.filter(
          (items3?: unknown, ..._extraArguments: unknown[]) =>
            typeof items3 == `string` && items3.length > 0,
        ),
      ),
    ];
    let record2: Dynamic = {};
    let items2: Dynamic = [];
    for (let loadObservabilityBrowserAndOperationEventsNowResult of items as Dynamic) {
      let promise: Dynamic = inflight.get(
        loadObservabilityBrowserAndOperationEventsNowResult,
      );
      let retryMetadataEntry: Dynamic = retryMetadata.get(
        loadObservabilityBrowserAndOperationEventsNowResult,
      );
      if (
        promise !== undefined &&
        !queuedIds.has(loadObservabilityBrowserAndOperationEventsNowResult) &&
        retryMetadataEntry !== undefined &&
        timers2() - retryMetadataEntry.at >= retryMetadataEntry.ttl
      ) {
        inflight.delete(loadObservabilityBrowserAndOperationEventsNowResult);
        promise = undefined;
      }
      if (promise === undefined) {
        let resolve: Dynamic;
        promise = new (Promise as Dynamic)(
          (resolve2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            resolve = resolve2;
          },
        );
        if (batch === null) {
          batch = new (Map as Dynamic)();
          batchSource = requestSource;
          queueMicrotask(flushBatch);
        }
        batch.set(loadObservabilityBrowserAndOperationEventsNowResult, {
          promise: promise,
          resolve: resolve,
        });
        inflight.set(
          loadObservabilityBrowserAndOperationEventsNowResult,
          promise,
        );
        queuedIds.add(loadObservabilityBrowserAndOperationEventsNowResult);
      }
      items2.push(
        promise.then(
          (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            if (result !== undefined) {
              record2[loadObservabilityBrowserAndOperationEventsNowResult] =
                result;
            }
          },
        ),
      );
    }
    await Promise.all(items2);
    return record2;
  };
  let loadFromSource = (
    observabilityBrowserAndOperationEventsNow?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    requestSource = observabilityBrowserAndOperationEventsNow;
    try {
      loadNames(options2);
    } finally {
      requestSource = `caller`;
    }
  };
  return {
    ask: loadNames,
    peek: (
      observabilityBrowserAndOperationEventsNow?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => entries.get(observabilityBrowserAndOperationEventsNow),
    seed: (
      observabilityBrowserAndOperationEventsNow?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        !(
          observabilityBrowserAndOperationEventsNow.id === `` ||
          observabilityBrowserAndOperationEventsNow.name === `` ||
          entries.get(observabilityBrowserAndOperationEventsNow.id)?.name
        )
      ) {
        inflight.set(
          observabilityBrowserAndOperationEventsNow.id,
          Promise.resolve(observabilityBrowserAndOperationEventsNow),
        );
        retryMetadata.delete(observabilityBrowserAndOperationEventsNow.id);
        retryIds.delete(observabilityBrowserAndOperationEventsNow.id);
        fetchFallback?.(observabilityBrowserAndOperationEventsNow);
        updateEntry(observabilityBrowserAndOperationEventsNow);
      }
    },
    subscribe: (
      observabilityBrowserAndOperationEventsNow?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => (
      listeners.add(observabilityBrowserAndOperationEventsNow),
      (..._extraArguments: unknown[]): undefined =>
        void listeners.delete(observabilityBrowserAndOperationEventsNow)
    ),
    version: (..._extraArguments: unknown[]) => generation,
    refresh: (..._extraArguments: unknown[]): undefined => {
      expiryTimer?.();
      expiryTimer = null;
      let mappedPendingRetries: Dynamic = pendingRetries().map(
        ([pendingRetry]: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          pendingRetry,
      );
      if (mappedPendingRetries.length === 0) {
        scheduleExpiry();
        return;
      }
      for (let loadObservabilityBrowserAndOperationEventsNowResult of mappedPendingRetries as Dynamic) {
        inflight.delete(loadObservabilityBrowserAndOperationEventsNowResult);
        retryMetadata.delete(
          loadObservabilityBrowserAndOperationEventsNowResult,
        );
      }
      loadFromSource(`refocus`, mappedPendingRetries);
    },
  };
}

var ObservabilityBrowserAndOperationEventsFrameT: string;

var ObservabilityBrowserAndOperationEventsTitle: Readonly<{
    title: "Sign in to view this doc";
    body: "This doc is shared with anyone who has the link. Sign in to Claude to open it.";
    cta: "Sign in";
}>;

function isObservabilityBrowserAndOperationEventsValue2(
  items?: unknown,
  ..._extraArguments: unknown[]
) {
  if (typeof items != `string` || items.length === 0) return false;
  try {
    return new URLSearchParams(items).has(
      ObservabilityBrowserAndOperationEventsFrameT,
    );
  } catch {
    return false;
  }
}

function resolveObservabilityBrowserAndOperationEventsNOTENABLED(
  observabilityBrowserAndOperationEventsNOTENABLED?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    observabilityBrowserAndOperationEventsNOTENABLED.deadReason ===
      `NOT_ENABLED` &&
    observabilityBrowserAndOperationEventsNOTENABLED.userCapability === false &&
    !isObservabilityBrowserAndOperationEventsValue2(
      observabilityBrowserAndOperationEventsNOTENABLED.search,
    )
  );
}

function resolveObservabilityBrowserAndOperationEventsValue26(
  observabilityBrowserAndOperationEventsValue26?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let platformArtifactLinksIncludes2: Dynamic =
    resolvePlatformArtifactLinksIncludes2(
      observabilityBrowserAndOperationEventsValue26,
    ) ?? `https://claude.ai`;
  return resolvePlatformArtifactLinksTest2(options)
    ? `${platformArtifactLinksIncludes2}/login?returnTo=${encodeURIComponent(`${PlatformArtifactLinksCodeArtifact}${options}`)}`
    : `${platformArtifactLinksIncludes2}/login`;
}

var resolveObservabilityBrowserAndOperationEventsValue27: Dynamic;

var resolveObservabilityBrowserAndOperationEventsSome: Dynamic;

function isObservabilityBrowserAndOperationEventsIncludes(
  observabilityBrowserAndOperationEventsIncludes?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (observabilityBrowserAndOperationEventsIncludes === ``) return false;
  let split: Dynamic = (
    observabilityBrowserAndOperationEventsIncludes2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    observabilityBrowserAndOperationEventsIncludes2.includes(`\\`) ||
    observabilityBrowserAndOperationEventsIncludes2
      .split(`/`)
      .some(
        (rolldownNImportPart?: Dynamic, ..._extraArguments: unknown[]) =>
          rolldownNImportPart === `` ||
          rolldownNImportPart === `.` ||
          rolldownNImportPart === `..`,
      );
  if (split(observabilityBrowserAndOperationEventsIncludes)) return true;
  let observabilityBrowserAndOperationEventsValue27: Dynamic =
    resolveObservabilityBrowserAndOperationEventsValue27(
      observabilityBrowserAndOperationEventsIncludes,
    );
  return (
    observabilityBrowserAndOperationEventsValue27 !==
      observabilityBrowserAndOperationEventsIncludes &&
    split(observabilityBrowserAndOperationEventsValue27)
  );
}

function isObservabilityBrowserAndOperationEventsIncludes2(
  observabilityBrowserAndOperationEventsIncludes2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (observabilityBrowserAndOperationEventsIncludes2 === ``) return false;
  let isObservabilityBrowserAndOperationEventsIncludes2Handler: Dynamic = (
    observabilityBrowserAndOperationEventsIncludes22?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    observabilityBrowserAndOperationEventsIncludes22.includes(`/`) ||
    observabilityBrowserAndOperationEventsIncludes22.includes(`\\`) ||
    observabilityBrowserAndOperationEventsIncludes22 === `.` ||
    observabilityBrowserAndOperationEventsIncludes22 === `..`;
  if (
    isObservabilityBrowserAndOperationEventsIncludes2Handler(
      observabilityBrowserAndOperationEventsIncludes2,
    )
  )
    return true;
  let observabilityBrowserAndOperationEventsValue27: Dynamic =
    resolveObservabilityBrowserAndOperationEventsValue27(
      observabilityBrowserAndOperationEventsIncludes2,
    );
  return (
    observabilityBrowserAndOperationEventsValue27 !==
      observabilityBrowserAndOperationEventsIncludes2 &&
    isObservabilityBrowserAndOperationEventsIncludes2Handler(
      observabilityBrowserAndOperationEventsValue27,
    )
  );
}

var resolveObservabilityBrowserAndOperationEventsXlsx: (observabilityBrowserAndOperationEventsXlsx?: Dynamic, ..._extraArguments: unknown[]) => "code" | "csv" | "docx" | "file" | "html" | "image" | "ldoc" | "md" | "pdf" | "pptx" | "xlsx";

var resolveObservabilityBrowserAndOperationEventsIncludes5: Dynamic;

function resolveObservabilityBrowserAndOperationEventsLastIndexOf(
  observabilityBrowserAndOperationEventsLastIndex?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let lastIndexOf: Dynamic =
    observabilityBrowserAndOperationEventsLastIndex.lastIndexOf(`.`);
  if (lastIndexOf <= 0)
    return [observabilityBrowserAndOperationEventsLastIndex, ``];
  let observabilityBrowserAndOperationEventsLastIndexSlice: Dynamic =
    observabilityBrowserAndOperationEventsLastIndex.slice(0, lastIndexOf);
  let observabilityBrowserAndOperationEventsLastIndexSlice2: Dynamic =
    observabilityBrowserAndOperationEventsLastIndex.slice(lastIndexOf);
  if (
    observabilityBrowserAndOperationEventsLastIndexSlice
      .toLowerCase()
      .endsWith(`.ldoc`)
  ) {
    observabilityBrowserAndOperationEventsLastIndexSlice2 =
      observabilityBrowserAndOperationEventsLastIndexSlice.slice(-5) +
      observabilityBrowserAndOperationEventsLastIndexSlice2;
    observabilityBrowserAndOperationEventsLastIndexSlice =
      observabilityBrowserAndOperationEventsLastIndexSlice.slice(0, -5);
  }
  return [
    observabilityBrowserAndOperationEventsLastIndexSlice,
    observabilityBrowserAndOperationEventsLastIndexSlice2,
  ];
}

var ObservabilityBrowserAndOperationEventsRoutine: string;

var resolveObservabilityBrowserAndOperationEventsImagePng: (items?: Dynamic, ..._extraArguments: unknown[]) => "image/gif" | "image/jpeg" | "image/png" | "image/webp" | undefined;

var observabilityBrowserAndOperationEventsSet34: Dynamic;

var resolveObservabilityBrowserAndOperationEventsVideoWebm: (items?: Dynamic, ..._extraArguments: unknown[]) => "video/mp4" | "video/webm" | undefined;

var observabilityBrowserAndOperationEventsSet35: Dynamic;

function isObservabilityBrowserAndOperationEventsImage(
  observabilityBrowserAndOperationEventsImage?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (
    observabilityBrowserAndOperationEventsSet35.has(
      resolveObservabilityBrowserAndOperationEventsIncludes5(
        observabilityBrowserAndOperationEventsImage,
      ),
    ) ||
    resolveObservabilityBrowserAndOperationEventsXlsx(
      observabilityBrowserAndOperationEventsImage,
    ) === `image`
  )
    return true;
  let uint8Array: Dynamic = new Uint8Array(
    options,
    0,
    Math.min(12, options.byteLength),
  );
  return resolveObservabilityBrowserAndOperationEventsImagePng(uint8Array)
    ? true
    : (uint8Array[0] === 80 && uint8Array[1] === 75) ||
        (uint8Array[0] === 37 && uint8Array[1] === 80 && uint8Array[2] === 68);
}

var resolveObservabilityBrowserAndOperationEventsToFixed: (observabilityBrowserAndOperationEvents?: Dynamic, ..._extraArguments: unknown[]) => string;

function resolveObservabilityBrowserAndOperationEventsTrim(
  observabilityBrowserAndOperationEventsTrim?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return observabilityBrowserAndOperationEventsTrim
    .replace(/\s*\/+\s*/g, `-`)
    .trim()
    .replace(/^-+|-+$/g, ``)
    .trim();
}

function resolveObservabilityBrowserAndOperationEventsReplace(
  observabilityBrowserAndOperationEventsReplace?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return observabilityBrowserAndOperationEventsReplace
    .replace(/[\u0000-\u001f\u007f-\u009f]/g, ` `)
    .replace(/\s+/g, ` `);
}

var observabilityBrowserAndOperationEventsPattern11: RegExp;

var observabilityBrowserAndOperationEventsPattern12: RegExp;

var observabilityBrowserAndOperationEventsPattern13: RegExp;

var observabilityBrowserAndOperationEventsPattern14: RegExp;

var observabilityBrowserAndOperationEventsPattern15: RegExp;

var ObservabilityBrowserAndOperationEventsGbeng: Dynamic;

var ObservabilityBrowserAndOperationEventsMessage: string;

var observabilityBrowserAndOperationEventsPattern16: RegExp;

var observabilityBrowserAndOperationEventsPattern17: RegExp;

var resolveObservabilityBrowserAndOperationEventsCharCodeAt: Dynamic;

function isObservabilityBrowserAndOperationEventsFilter(
  observabilityBrowserAndOperationEventsFilter?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let filteredItems: Dynamic = [
    ...observabilityBrowserAndOperationEventsFilter,
  ].filter(
    (item?: Dynamic, ..._extraArguments: unknown[]) =>
      !resolveObservabilityBrowserAndOperationEventsCharCodeAt(item),
  );
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  filteredItems.forEach(
    (
      filteredItem?: Dynamic,
      index?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (filteredItem === ObservabilityBrowserAndOperationEventsMessage) {
        ObservabilityBrowserAndOperationEventsGbeng.find(
          (
            ObservabilityBrowserAndOperationEventsGbeng2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            ObservabilityBrowserAndOperationEventsGbeng2.every(
              (
                rolldownNImport2?: Dynamic,
                index2?: Dynamic,
                ..._extraArguments: unknown[]
              ) => filteredItems[index + 1 + index2] === rolldownNImport2,
            ),
        )?.forEach(
          (
            observabilityBrowserAndOperationEventsFilter2?: unknown,
            options?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => uniqueItems.add(index + 1 + options),
        );
      }
    },
  );
  let test: Dynamic = (
    observabilityBrowserAndOperationEventsFilter2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    observabilityBrowserAndOperationEventsFilter2 !== undefined &&
    observabilityBrowserAndOperationEventsFilter2.codePointAt(0) > 127 &&
    !observabilityBrowserAndOperationEventsPattern11.test(
      observabilityBrowserAndOperationEventsFilter2,
    ) &&
    !/[\p{Z}\p{Cc}]/u.test(observabilityBrowserAndOperationEventsFilter2);
  let test2: Dynamic = (
    observabilityBrowserAndOperationEventsFilter2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    test(observabilityBrowserAndOperationEventsFilter2) &&
    observabilityBrowserAndOperationEventsPattern13.test(
      observabilityBrowserAndOperationEventsFilter2,
    );
  let test3: Dynamic = (
    observabilityBrowserAndOperationEventsFilter2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    test(observabilityBrowserAndOperationEventsFilter2) &&
    observabilityBrowserAndOperationEventsPattern14.test(
      observabilityBrowserAndOperationEventsFilter2,
    );
  let test4: Dynamic = (
    observabilityBrowserAndOperationEventsFilter2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    test(observabilityBrowserAndOperationEventsFilter2) &&
    /\p{Script=Mongolian}/u.test(observabilityBrowserAndOperationEventsFilter2);
  let filteredFilteredItems: Dynamic = filteredItems.filter(
    (
      filteredItem?: Dynamic,
      index?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let [items, setItems]: Dynamic = [
        filteredItems[index - 1],
        filteredItems[index + 1],
      ];
      if (uniqueItems.has(index)) return true;
      if (/[\uFE00-\uFE0F]/.test(filteredItem))
        return (
          test(items) ||
          (filteredItem === `️` &&
            /^[0-9#*]$/.test(items ?? ``) &&
            setItems === `⃣`)
        );
      if (/[\u{E0100}-\u{E01EF}]/u.test(filteredItem))
        return test(items) && /\p{Ideographic}/u.test(items);
      if (/[\u180B-\u180D\u180F]/.test(filteredItem)) return test4(items);
      let test6: Dynamic =
        test2(items) &&
        (/\p{M}/u.test(items) ||
          observabilityBrowserAndOperationEventsPattern15.test(items) ||
          test2(setItems));
      return filteredItem === `‍`
        ? test6 ||
            ((items === undefined ||
              (/\s/.test(items) &&
                !observabilityBrowserAndOperationEventsPattern11.test(
                  items,
                ))) &&
              test2(setItems) &&
              observabilityBrowserAndOperationEventsPattern16.test(setItems)) ||
            ((test3(items) ||
              (items === `️` && test3(filteredItems[index - 2]))) &&
              test3(setItems))
        : filteredItem === `‌`
          ? test6
          : filteredItem === `͏`
            ? test2(items) && test(setItems) && /\p{M}/u.test(setItems)
            : filteredItem === `᠎`
              ? test4(items) && test4(setItems)
              : observabilityBrowserAndOperationEventsPattern17.test(
                  filteredItem,
                ) ||
                observabilityBrowserAndOperationEventsPattern12.test(
                  filteredItem,
                ) ||
                !observabilityBrowserAndOperationEventsPattern11.test(
                  filteredItem,
                );
    },
  );
  let test5: Dynamic = (
    observabilityBrowserAndOperationEventsFilter2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    observabilityBrowserAndOperationEventsPattern15.test(
      observabilityBrowserAndOperationEventsFilter2,
    );
  let some: Dynamic = filteredFilteredItems.some(
    (filteredFilteredItem?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      /\p{L}/u.test(filteredFilteredItem) && test5(filteredFilteredItem),
  );
  let isObservabilityBrowserAndOperationEventsFilterResult: Dynamic;
  return filteredFilteredItems
    .filter(
      (
        filteredFilteredItem?: Dynamic,
        index?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        observabilityBrowserAndOperationEventsPattern17.test(
          filteredFilteredItem,
        )
          ? !some ||
            (index > 0 &&
              observabilityBrowserAndOperationEventsPattern17.test(
                filteredFilteredItems[index - 1],
              ))
            ? false
            : isObservabilityBrowserAndOperationEventsFilterResult !==
                undefined &&
              test5(isObservabilityBrowserAndOperationEventsFilterResult) ===
                (filteredFilteredItem !== `‎`)
          : (/\p{L}/u.test(filteredFilteredItem) &&
              (isObservabilityBrowserAndOperationEventsFilterResult =
                filteredFilteredItem),
            true),
    )
    .join(``);
}

var observabilityBrowserAndOperationEventsPattern18: RegExp;

function resolveObservabilityBrowserAndOperationEventsTrim2(
  observabilityBrowserAndOperationEventsTrim2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return isObservabilityBrowserAndOperationEventsFilter(
    observabilityBrowserAndOperationEventsTrim2,
  )
    .replace(observabilityBrowserAndOperationEventsPattern18, ` `)
    .trim();
}

function resolveObservabilityBrowserAndOperationEventsReplace2(
  observabilityBrowserAndOperationEventsReplace2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    observabilityBrowserAndOperationEventsReplace2 === options ||
    observabilityBrowserAndOperationEventsReplace2 ===
      options.replace(/[\r\n]/g, ``)
  )
    return null;
  let observabilityBrowserAndOperationEventsTrim2: Dynamic =
    resolveObservabilityBrowserAndOperationEventsTrim2(
      observabilityBrowserAndOperationEventsReplace2,
    );
  return observabilityBrowserAndOperationEventsTrim2 === ``
    ? null
    : observabilityBrowserAndOperationEventsTrim2;
}

function resolveObservabilityBrowserAndOperationEventsTrim3(
  observabilityBrowserAndOperationEventsTrim3?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let trim: Dynamic = (
    observabilityBrowserAndOperationEventsTrim32?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveObservabilityBrowserAndOperationEventsReplace(
      isObservabilityBrowserAndOperationEventsFilter(
        observabilityBrowserAndOperationEventsTrim32,
      ),
    ).trim();
  return trim(
    [...trim(observabilityBrowserAndOperationEventsTrim3)]
      .slice(0, 200)
      .join(``),
  );
}

var ObservabilityBrowserAndOperationEventsFrameTitlePropose: string;

var ObservabilityBrowserAndOperationEventsFrameTitleFromContent: string;

var observabilityBrowserAndOperationEventsValue20002: number;

var ObservabilityBrowserAndOperationEventsUntitled: string;

var resolveObservabilityBrowserAndOperationEventsValue28: Dynamic;

function resolveObservabilityBrowserAndOperationEventsInFrame(
  observabilityBrowserAndOperationEventsInFrame?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    observabilityBrowserAndOperationEventsInFrame.inFrame &&
    observabilityBrowserAndOperationEventsInFrame.canRename &&
    observabilityBrowserAndOperationEventsInFrame.role !== null &&
    editorExtensionsSet12.has(
      observabilityBrowserAndOperationEventsInFrame.role,
    )
  );
}

function resolveObservabilityBrowserAndOperationEventsTitle(
  observabilityBrowserAndOperationEventsTitle?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    !resolveObservabilityBrowserAndOperationEventsInFrame(
      observabilityBrowserAndOperationEventsTitle,
    ) ||
    !observabilityBrowserAndOperationEventsTitle.firstTab ||
    typeof observabilityBrowserAndOperationEventsTitle.was != `string`
  )
    return null;
  let title: Dynamic = resolveObservabilityBrowserAndOperationEventsTrim3(
    observabilityBrowserAndOperationEventsTitle.title,
  );
  return title === `` ||
    title ===
      (resolveObservabilityBrowserAndOperationEventsTrim3(
        observabilityBrowserAndOperationEventsTitle.was,
      ) || `Untitled`)
    ? null
    : {
        title: title,
      };
}

var observabilityBrowserAndOperationEventsPattern19: RegExp;

var observabilityBrowserAndOperationEventsPattern20: RegExp;

function filterObservabilityBrowserAndOperationEventsCodePointAt(
  filterObservabilityBrowserAndOperationEventsCodePoint?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [
    ...filterObservabilityBrowserAndOperationEventsCodePoint,
  ];
  let test: Dynamic = (
    filterObservabilityBrowserAndOperationEventsCodePoint2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    filterObservabilityBrowserAndOperationEventsCodePoint2 !== undefined &&
    filterObservabilityBrowserAndOperationEventsCodePoint2.codePointAt(0) >
      127 &&
    /[\p{L}\p{N}\p{P}\p{S}\p{M}]/u.test(
      filterObservabilityBrowserAndOperationEventsCodePoint2,
    ) &&
    !observabilityBrowserAndOperationEventsPattern19.test(
      filterObservabilityBrowserAndOperationEventsCodePoint2,
    );
  let test2: Dynamic = (
    filterObservabilityBrowserAndOperationEventsCodePoint2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    filterObservabilityBrowserAndOperationEventsCodePoint2 !== undefined &&
    observabilityBrowserAndOperationEventsPattern20.test(
      filterObservabilityBrowserAndOperationEventsCodePoint2,
    );
  return items
    .filter(
      (
        item?: Dynamic,
        index?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        item === `‌` || item === `‍`
          ? (test(items[index - 1]) ||
              (test2(items[index - 1]) && test(items[index - 2]))) &&
            test(items[index + 1])
          : test2(item)
            ? test(items[index - 1]) ||
              (/^[0-9#*]$/.test(items[index - 1] ?? ``) &&
                items[index + 1] === `⃣`)
            : !observabilityBrowserAndOperationEventsPattern19.test(item),
    )
    .join(``);
}

function resolveObservabilityBrowserAndOperationEventsTitle2(
  observabilityBrowserAndOperationEventsTitle2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    !resolveObservabilityBrowserAndOperationEventsInFrame(
      observabilityBrowserAndOperationEventsTitle2,
    ) ||
    observabilityBrowserAndOperationEventsTitle2.role !== `admin` ||
    !observabilityBrowserAndOperationEventsTitle2.firstTab
  )
    return null;
  let title: Dynamic = filterObservabilityBrowserAndOperationEventsCodePointAt(
    resolveObservabilityBrowserAndOperationEventsTrim3(
      filterObservabilityBrowserAndOperationEventsCodePointAt(
        observabilityBrowserAndOperationEventsTitle2.title,
      ),
    ),
  );
  return title === `` || title === `Untitled`
    ? null
    : {
        title: title,
      };
}

function isObservabilityBrowserAndOperationEventsJe(
  observabilityBrowserAndOperationEventsJe?: Dynamic,
  scheduler?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let helloDImport2: Dynamic = helloDImport(
    observabilityBrowserAndOperationEventsJe,
  );
  let isObservabilityBrowserAndOperationEventsJeResult: Dynamic = null;
  let lookup: Dynamic = new (Map as Dynamic)();
  let amount: number = -1 / 0;
  let index = 0;
  let enabled = false;
  let page: Dynamic = null;
  let isObservabilityBrowserAndOperationEventsJeResult2: Dynamic = null;
  let enabled2 = false;
  let resolveObservabilityBrowserAndOperationEventsValue282: Dynamic = (
    observabilityBrowserAndOperationEventsJe2?: unknown,
    ..._extraArguments: unknown[]
  ) => {
    if (typeof observabilityBrowserAndOperationEventsJe2 != `string`)
      return false;
    let observabilityBrowserAndOperationEventsValue28: Dynamic =
      resolveObservabilityBrowserAndOperationEventsValue28(
        observabilityBrowserAndOperationEventsJe2,
      );
    return (
      observabilityBrowserAndOperationEventsValue28 >= 1 &&
      observabilityBrowserAndOperationEventsValue28 <= 280
    );
  };
  let resolveObservabilityBrowserAndOperationEventsValue283: Dynamic = (
    observabilityBrowserAndOperationEventsJe2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let lookupEntry: Dynamic = lookup.get(
      observabilityBrowserAndOperationEventsJe2,
    );
    if (lookupEntry !== undefined) return lookupEntry;
    let isObservabilityBrowserAndOperationEventsJeResult4: Dynamic = null;
    try {
      isObservabilityBrowserAndOperationEventsJeResult4 =
        scheduler.store?.get(observabilityBrowserAndOperationEventsJe2) ?? null;
    } catch {
      isObservabilityBrowserAndOperationEventsJeResult4 = null;
    }
    return resolveObservabilityBrowserAndOperationEventsValue282(
      isObservabilityBrowserAndOperationEventsJeResult4,
    )
      ? isObservabilityBrowserAndOperationEventsJeResult4
      : null;
  };
  let resolveObservabilityBrowserAndOperationEventsValue284: Dynamic = (
    observabilityBrowserAndOperationEventsJe2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveObservabilityBrowserAndOperationEventsValue283(
      observabilityBrowserAndOperationEventsJe2,
    ) ?? `Untitled`;
  let isObservabilityBrowserAndOperationEventsJeResult3 = (
    ..._extraArguments: unknown[]
  ): undefined => {
    isObservabilityBrowserAndOperationEventsJeResult2?.();
    isObservabilityBrowserAndOperationEventsJeResult2 = null;
    page = null;
  };
  let postMessage = (
    observabilityBrowserAndOperationEventsJe2?: Dynamic,
    title?: Dynamic,
    was?: Dynamic,
    dependencies?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    lookup.set(observabilityBrowserAndOperationEventsJe2, title);
    try {
      scheduler.store?.set(observabilityBrowserAndOperationEventsJe2, title);
    } catch {}
    amount = scheduler.now();
    index++;
    observabilityBrowserAndOperationEventsJe.parent.postMessage(
      {
        [ObservabilityBrowserAndOperationEventsFrameTitlePropose]: true,
        title: title,
        was: was,
      },
      dependencies,
    );
    scheduler.log?.(`titlePropose:sent n=${index}`);
  };
  let postMessage2 = (
    observabilityBrowserAndOperationEventsJe2?: Dynamic,
    title?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    lookup.set(observabilityBrowserAndOperationEventsJe2, title);
    try {
      scheduler.store?.set(observabilityBrowserAndOperationEventsJe2, title);
    } catch {}
    amount = scheduler.now();
    index++;
    observabilityBrowserAndOperationEventsJe.parent.postMessage(
      {
        [ObservabilityBrowserAndOperationEventsFrameTitleFromContent]: true,
        title: title,
        ifUnnamed: ObservabilityBrowserAndOperationEventsUntitled,
      },
      context,
    );
    scheduler.log?.(`titlePropose:fromContent n=${index}`);
  };
  let postMessage3 = (..._extraArguments: unknown[]): undefined => {
    isObservabilityBrowserAndOperationEventsJeResult2 = null;
    let page2: Dynamic = page;
    page = null;
    if (page2 === null || enabled2) return;
    let helloLImport2: Dynamic = helloLImport(
      observabilityBrowserAndOperationEventsJe,
    );
    if (helloLImport2 === null) return;
    let observabilityBrowserAndOperationEventsValue28: Dynamic =
      resolveObservabilityBrowserAndOperationEventsValue284(page2.pid);
    if (page2.title !== observabilityBrowserAndOperationEventsValue28) {
      postMessage(
        page2.pid,
        page2.title,
        observabilityBrowserAndOperationEventsValue28,
        helloLImport2,
      );
    }
  };
  let record2: Dynamic = {
    propose(pid?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) {
      if (
        enabled2 ||
        observabilityBrowserAndOperationEventsJe === null ||
        !helloDImport2 ||
        pid === `` ||
        !resolveObservabilityBrowserAndOperationEventsValue282(options.title)
      )
        return `skipped`;
      let helloLImport2: Dynamic = helloLImport(
        observabilityBrowserAndOperationEventsJe,
      );
      if (helloLImport2 === null) {
        isObservabilityBrowserAndOperationEventsJeResult = {
          pid: pid,
          title: options.title,
        };
        return `held`;
      }
      let observabilityBrowserAndOperationEventsValue28: Dynamic =
        resolveObservabilityBrowserAndOperationEventsValue284(pid);
      if (options.title === observabilityBrowserAndOperationEventsValue28) {
        if (page !== null && page.pid === pid) {
          isObservabilityBrowserAndOperationEventsJeResult3();
        }
        return `skipped`;
      }
      if (index >= 20) {
        if (!enabled) {
          scheduler.log?.(`titlePropose:budget`);
        }
        enabled = true;
        return `skipped`;
      }
      let difference =
        observabilityBrowserAndOperationEventsValue20002 -
        (scheduler.now() - amount);
      return difference <= 0 && page === null
        ? (postMessage(
            pid,
            options.title,
            observabilityBrowserAndOperationEventsValue28,
            helloLImport2,
          ),
          `sent`)
        : ((page = {
            pid: pid,
            title: options.title,
          }),
          isObservabilityBrowserAndOperationEventsJeResult2 === null &&
            (isObservabilityBrowserAndOperationEventsJeResult2 =
              scheduler.schedule(postMessage3, Math.max(difference, 0))),
          `held`);
    },
    proposeFromContent(
      observabilityBrowserAndOperationEventsJe2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      if (
        enabled2 ||
        observabilityBrowserAndOperationEventsJe === null ||
        !helloDImport2 ||
        observabilityBrowserAndOperationEventsJe2 === `` ||
        !resolveObservabilityBrowserAndOperationEventsValue282(options.title) ||
        resolveObservabilityBrowserAndOperationEventsValue283(
          observabilityBrowserAndOperationEventsJe2,
        ) !== null ||
        page !== null ||
        isObservabilityBrowserAndOperationEventsJeResult !== null
      )
        return `skipped`;
      let helloLImport2: Dynamic = helloLImport(
        observabilityBrowserAndOperationEventsJe,
      );
      return helloLImport2 === null ||
        index >= 20 ||
        scheduler.now() - amount < 2e3
        ? `skipped`
        : (postMessage2(
            observabilityBrowserAndOperationEventsJe2,
            options.title,
            helloLImport2,
          ),
          `sent`);
    },
    dispose(..._extraArguments: unknown[]): undefined {
      enabled2 = true;
      isObservabilityBrowserAndOperationEventsJeResult = null;
      helloSImport2();
      isObservabilityBrowserAndOperationEventsJeResult3();
    },
  };
  let helloSImport2: Dynamic = helloSImport(
    observabilityBrowserAndOperationEventsJe,
    (..._extraArguments: unknown[]): undefined => {
      let isObservabilityBrowserAndOperationEventsJeResult4: Dynamic =
        isObservabilityBrowserAndOperationEventsJeResult;
      isObservabilityBrowserAndOperationEventsJeResult = null;
      if (
        isObservabilityBrowserAndOperationEventsJeResult4 !== null &&
        !enabled2
      ) {
        record2.propose(isObservabilityBrowserAndOperationEventsJeResult4.pid, {
          title: isObservabilityBrowserAndOperationEventsJeResult4.title,
        });
      }
    },
  );
  return record2;
}

var observabilityBrowserAndOperationEventsPattern21: RegExp;

var observabilityBrowserAndOperationEventsPattern22: RegExp;

var observabilityBrowserAndOperationEventsValue20003: number;

var observabilityBrowserAndOperationEventsValue999999999: number;

var resolveObservabilityBrowserAndOperationEventsIsSafeInteger: Dynamic;

var observabilityBrowserAndOperationEventsValue9999999: number;

var observabilityBrowserAndOperationEventsPattern23: RegExp;

var resolveObservabilityBrowserAndOperationEventsTest8: Dynamic;

var resolveObservabilityBrowserAndOperationEventsTest9: Dynamic;

function isObservabilityBrowserAndOperationEventsIsInteger(
  observabilityBrowserAndOperationEventsIsInteger?: Dynamic,
  options?: unknown,
  context?: unknown,
  ..._extraArguments: unknown[]
) {
  return !resolveObservabilityBrowserAndOperationEventsTest9(
    observabilityBrowserAndOperationEventsIsInteger,
  ) ||
    typeof options != `number` ||
    typeof context != `number` ||
    !Number.isInteger(options) ||
    !Number.isInteger(context) ||
    options < 0 ||
    context < options ||
    context > 9999999
    ? null
    : `${observabilityBrowserAndOperationEventsIsInteger}:${options}-${context}`;
}

function resolveObservabilityBrowserAndOperationEventsBid(
  observabilityBrowserAndOperationEventsBid?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof observabilityBrowserAndOperationEventsBid != `string`) return null;
  let match = observabilityBrowserAndOperationEventsPattern23.exec(
    observabilityBrowserAndOperationEventsBid,
  );
  if (
    match === null ||
    !resolveObservabilityBrowserAndOperationEventsTest9(match[1])
  )
    return null;
  let start = Number(match[2]);
  let end = Number(match[3]);
  return end >= start
    ? {
        bid: match[1],
        start: start,
        end: end,
      }
    : null;
}

function updateObservabilityBrowserAndOperationEventsSelected(
  updateObservabilityBrowserAndOperationEventsSelected2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let lookup: Dynamic = new (Map as Dynamic)();
  if (Array.isArray(updateObservabilityBrowserAndOperationEventsSelected2))
    for (let updateObservabilityBrowserAndOperationEventsSelectedResult of updateObservabilityBrowserAndOperationEventsSelected2.slice(
      0,
      160,
    ) as Dynamic) {
      if (
        !resolveObservabilityBrowserAndOperationEventsTest9(
          updateObservabilityBrowserAndOperationEventsSelectedResult,
        ) ||
        lookup.has(updateObservabilityBrowserAndOperationEventsSelectedResult)
      )
        continue;
      let contextEntry2: Dynamic = context.get(
        updateObservabilityBrowserAndOperationEventsSelectedResult,
      );
      if (contextEntry2 !== undefined) {
        lookup.set(
          updateObservabilityBrowserAndOperationEventsSelectedResult,
          contextEntry2.rank,
        );
      }
    }
  let selected: Dynamic = [...lookup.keys()]
    .toSorted(
      (
        item?: Dynamic,
        item2?: Dynamic,
        ..._extraArguments: unknown[]
      ): number => lookup.get(item) - lookup.get(item2),
    )
    .slice(0, 20);
  let options2: Dynamic = options;
  if (
    typeof options2 != `object` ||
    !options2 ||
    !resolveObservabilityBrowserAndOperationEventsTest9(options2.bid) ||
    !selected.includes(options2.bid)
  )
    return {
      selected: selected,
      range: null,
    };
  let contextEntry: Dynamic = context.get(options2.bid);
  if (contextEntry === undefined || !contextEntry.text)
    return {
      selected: selected,
      range: null,
    };
  let { start: options3, end: options4 }: Dynamic = options2;
  if (
    typeof options3 != `number` ||
    typeof options4 != `number` ||
    !Number.isInteger(options3) ||
    !Number.isInteger(options4) ||
    options3 < 0 ||
    options4 < options3
  )
    return {
      selected: selected,
      range: null,
    };
  let max = Math.max(
    0,
    Math.min(
      Math.trunc(contextEntry.size),
      observabilityBrowserAndOperationEventsValue9999999,
    ),
  );
  let min = Math.min(options4, max);
  return {
    selected: selected,
    range: isObservabilityBrowserAndOperationEventsIsInteger(
      options2.bid,
      Math.min(options3, min),
      min,
    ),
  };
}

var resolveObservabilityBrowserAndOperationEventsCharCodeAt2: Dynamic;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeObservabilityBrowserAndOperationEvents2Step1(): void {
  (ObservabilityBrowserAndOperationEventsOpen = {
    open: {
      field: `how`,
      words: new (Set as Dynamic)(
        observabilityTelemetryTypedMenuHintShortcutValues,
      ),
    },
    sent: {
      field: `card`,
      words: new (Set as Dynamic)(observabilityTelemetryWriteBlankCommentValues),
    },
    closed: {
      field: `draft`,
      words: new (Set as Dynamic)(observabilityTelemetryEmptyWordsValues),
    },
    why: {
      field: `why`,
      words: new (Set as Dynamic)(
        observabilityTelemetryShownByHandNotSureLookingValues,
      ),
    },
    refused: {
      field: `why`,
      words: new (Set as Dynamic)(ObservabilityTelemetryBusy),
    },
  });
  (observabilityBrowserAndOperationEventsSet19 = new (Set as Dynamic)(
    observabilityTelemetrySpotBookSpotAskSpotNumSpotPosValues,
  ));
  (resolveObservabilityBrowserAndOperationEventsSpotUnk = (
    observabilityBrowserAndOperationEventsSpotUnk?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    observabilityBrowserAndOperationEventsSet19.has(
      observabilityBrowserAndOperationEventsSpotUnk,
    )
      ? observabilityBrowserAndOperationEventsSpotUnk
      : `spot_unk`);
  (observabilityBrowserAndOperationEventsSet20 = new (Set as Dynamic)(
    observabilityTelemetryOwnOtherAgentBothValues,
  ));
  (resolveObservabilityBrowserAndOperationEventsValue16 = (
    observabilityBrowserAndOperationEventsValue16?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    observabilityBrowserAndOperationEventsSet20.has(
      observabilityBrowserAndOperationEventsValue16,
    )
      ? observabilityBrowserAndOperationEventsValue16
      : undefined);
  (observabilityBrowserAndOperationEventsSet21 = new (Set as Dynamic)(
    observabilityTelemetryWriteBlankValues,
  ));
  (observabilityBrowserAndOperationEventsSet22 = new (Set as Dynamic)(
    observabilityTelemetryOwnOtherBothValues,
  ));
  (observabilityBrowserAndOperationEventsSet23 = new (Set as Dynamic)(
    observabilityTelemetryWrittenRepliedEndedFailedValues2,
  ));
  (observabilityBrowserAndOperationEventsSet24 = new (Set as Dynamic)(
    observabilityTelemetryRouteSessionRouteNewRouteOtherCarrierValues,
  ));
  (observabilityBrowserAndOperationEventsSet25 = new (Set as Dynamic)(
    observabilityTelemetryAvailableIfSummonedNoSessionUnsupportedValues,
  ));
  (ObservabilityBrowserAndOperationEventsAvailableIfSummoned = {
    available_if_summoned: `if_summoned`,
    claude_unavailable: `unavailable`,
    invalid_argument: `invalid_arg`,
    upstream_error: `upstream`,
    capability_removed: `cap_removed`,
  });
  (observabilityBrowserAndOperationEventsSet26 = new (Set as Dynamic)(
    observabilityTelemetryRepliedBothEditedNeitherValues,
  ));
  (observabilityBrowserAndOperationEventsSet27 = new (Set as Dynamic)(
    observabilityTelemetryHostLocalBothFreshValues,
  ));
  (observabilityBrowserAndOperationEventsSet28 = new (Set as Dynamic)(
    [`click`, `command`, `granted`],
  ));
  (isObservabilityBrowserAndOperationEventsValue = (
    observabilityBrowserAndOperationEventsValue?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    !observabilityBrowserAndOperationEventsSet28.has(
      observabilityBrowserAndOperationEventsValue,
    ));
  (observabilityBrowserAndOperationEventsSet29 = new (Set as Dynamic)(
    ObservabilityTelemetrySplit2,
  ));
  (observabilityBrowserAndOperationEventsValue_12 = false);
  (resolveObservabilityBrowserAndOperationEventsValue17 = (
    ..._extraArguments: unknown[]
  ): Dynamic => observabilityBrowserAndOperationEventsValue_12);
  (resolveObservabilityBrowserAndOperationEventsValue18 = (
    observabilityBrowserAndOperationEventsValue18?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    observabilityBrowserAndOperationEventsValue_12 =
      observabilityBrowserAndOperationEventsValue18;
  });
  (observabilityBrowserAndOperationEventsValue_13 = false);
  (observabilityBrowserAndOperationEventsSet30 = new (Set as Dynamic)());
  (observabilityBrowserAndOperationEventsSet31 = new (Set as Dynamic)(
    [
      `invalid_request`,
      `prompt_too_large`,
      `images_unavailable`,
      `image_rejected`,
      `not_granted`,
      `session_expired`,
      `sampling_disabled`,
      `not_declared`,
      `rate_limited`,
      `empty_completion`,
      `refused`,
      `upstream_error`,
      `capability_disabled`,
      `capability_removed`,
      `transform_error`,
    ],
  ));
  (observabilityBrowserAndOperationEventsSet32 = new (Set as Dynamic)(
    [
      `not_granted`,
      `sampling_disabled`,
      `not_declared`,
      `capability_disabled`,
      `capability_removed`,
      `images_unavailable`,
      `unavailable`,
    ],
  ));
  (resolveObservabilityBrowserAndOperationEventsValue19 = (
    observabilityBrowserAndOperationEventsValue19?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof observabilityBrowserAndOperationEventsValue19 == `object` &&
    !!observabilityBrowserAndOperationEventsValue19);
  (resolveObservabilityBrowserAndOperationEventsEncode = (
    observabilityBrowserAndOperationEventsEncode?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    new TextEncoder().encode(observabilityBrowserAndOperationEventsEncode).length);
  (resolveObservabilityBrowserAndOperationEventsValue20 = (
    observabilityBrowserAndOperationEventsValue20?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof observabilityBrowserAndOperationEventsValue20 == `object` &&
    !!observabilityBrowserAndOperationEventsValue20);
  (observabilityBrowserAndOperationEventsSet33 = new (Set as Dynamic)(
    [`not_granted`, `sampling_disabled`, `capability_disabled`, `not_declared`],
  ));
  (ObservabilityBrowserAndOperationEventsIssues = {
    issues: [],
    failed: false,
    unavailable: true,
  });
  (ObservabilityBrowserAndOperationEventsBongoFrameMount = `bongo.frame-mount`);
  (ObservabilityBrowserAndOperationEventsBongoLastTab = `bongo.last-tab`);
  (observabilityBrowserAndOperationEventsValue322 = 32);
  (ObservabilityBrowserAndOperationEventsAvatarUrl = Object.freeze({
    id: null,
    name: ``,
    avatarUrl: ``,
    color: ``,
    email: null,
    isOwner: false,
    canEdit: false,
  }));
  (resolveObservabilityBrowserAndOperationEventsValue22 = (
    observabilityBrowserAndOperationEventsValue22?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof observabilityBrowserAndOperationEventsValue22 == `object` &&
    !!observabilityBrowserAndOperationEventsValue22);
  (resolveObservabilityBrowserAndOperationEventsValue23 = (
    observabilityBrowserAndOperationEventsValue23?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof observabilityBrowserAndOperationEventsValue23 == `string`
      ? observabilityBrowserAndOperationEventsValue23
      : ``);
  (resolveObservabilityBrowserAndOperationEventsValue24 = (
    items?: unknown,
    ..._extraArguments: unknown[]
  ) => (typeof items == `string` && items.length > 0 ? items : null));
  (resolveObservabilityBrowserAndOperationEventsValue25 = (
    observabilityBrowserAndOperationEventsValue25?: Dynamic,
    ..._extraArguments: unknown[]
  ) => observabilityBrowserAndOperationEventsValue25 === true);
  (resolveObservabilityBrowserAndOperationEventsOrigin = (
    ..._extraArguments: unknown[]
  ) => (typeof location === "undefined" ? null : location.origin));
  (resolveObservabilityBrowserAndOperationEventsNull = (
    observabilityBrowserAndOperationEventsNull?: unknown,
    options: Dynamic = resolveObservabilityBrowserAndOperationEventsOrigin(),
    ..._extraArguments: unknown[]
  ) => {
    if (typeof observabilityBrowserAndOperationEventsNull != `string`) return ``;
    if (observabilityBrowserAndOperationEventsNull.startsWith(`data:`))
      return observabilityBrowserAndOperationEventsNull;
    if (options === null || options === `null`) return ``;
    let resolveObservabilityBrowserAndOperationEventsNullResult: Dynamic;
    try {
      resolveObservabilityBrowserAndOperationEventsNullResult = new URL(
        observabilityBrowserAndOperationEventsNull,
      );
    } catch {
      return ``;
    }
    return resolveObservabilityBrowserAndOperationEventsNullResult.username !==
      `` ||
      resolveObservabilityBrowserAndOperationEventsNullResult.password !== ``
      ? ``
      : (resolveObservabilityBrowserAndOperationEventsNullResult.protocol ===
            `https:` ||
            resolveObservabilityBrowserAndOperationEventsNullResult.protocol ===
              `http:`) &&
          resolveObservabilityBrowserAndOperationEventsNullResult.origin ===
            options
        ? observabilityBrowserAndOperationEventsNull
        : ``;
  });
  (resolveObservabilityBrowserAndOperationEventsStartsWith = (
    observabilityBrowserAndOperationEventsStarts?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    observabilityBrowserAndOperationEventsStarts === undefined ||
    observabilityBrowserAndOperationEventsStarts === `` ||
    (options &&
      !observabilityBrowserAndOperationEventsStarts.startsWith(
        `data:image/svg+xml`,
      ))
      ? undefined
      : observabilityBrowserAndOperationEventsStarts);
  (resolveObservabilityBrowserAndOperationEventsAvatarUrl = (
    observabilityBrowserAndOperationEventsAvatarUrl?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    id: observabilityBrowserAndOperationEventsAvatarUrl,
    name: ``,
    avatarUrl: ``,
    color: ``,
    email: null,
    isMe: false,
  }));
  (observabilityBrowserAndOperationEventsValue10000 = 1e4);
  (observabilityBrowserAndOperationEventsValue30000 = 3e4);
  (observabilityBrowserAndOperationEventsValue300000 = 3e5);
  (ObservabilityBrowserAndOperationEventsFrameT = `__frame_t`);
  (ObservabilityBrowserAndOperationEventsTitle = Object.freeze({
    title: `Sign in to view this doc`,
    body: `This doc is shared with anyone who has the link. Sign in to Claude to open it.`,
    cta: `Sign in`,
  }));
  (resolveObservabilityBrowserAndOperationEventsValue27 = (
    observabilityBrowserAndOperationEventsValue27?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    try {
      return decodeURIComponent(observabilityBrowserAndOperationEventsValue27);
    } catch {
      return observabilityBrowserAndOperationEventsValue27;
    }
  });
  (resolveObservabilityBrowserAndOperationEventsSome = (
    observabilityBrowserAndOperationEventsSome?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    observabilityBrowserAndOperationEventsSome
      .split(`/`)
      .some(
        (rolldownNImportPart?: Dynamic, ..._extraArguments: unknown[]) =>
          rolldownNImportPart === `.` || rolldownNImportPart === `..`,
      ));
  (resolveObservabilityBrowserAndOperationEventsXlsx = (
    observabilityBrowserAndOperationEventsXlsx?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let normalizedPop: Dynamic =
      observabilityBrowserAndOperationEventsXlsx
        .split(`.`)
        .pop()
        ?.toLowerCase() ?? ``;
    return normalizedPop === `xlsx` || normalizedPop === `xls`
      ? `xlsx`
      : normalizedPop === `docx`
        ? `docx`
        : normalizedPop === `pptx`
          ? `pptx`
          : normalizedPop === `ldoc` || normalizedPop === `lslides`
            ? `ldoc`
            : normalizedPop === `html`
              ? `html`
              : normalizedPop === `csv` || normalizedPop === `tsv`
                ? `csv`
                : normalizedPop === `md` || normalizedPop === `markdown`
                  ? `md`
                  : normalizedPop === `pdf`
                    ? `pdf`
                    : [
                          `png`,
                          `jpg`,
                          `jpeg`,
                          `gif`,
                          `webp`,
                          `svg`,
                          `bmp`,
                          `avif`,
                        ].includes(normalizedPop)
                      ? `image`
                      : [
                            `py`,
                            `ts`,
                            `tsx`,
                            `js`,
                            `json`,
                            `sql`,
                            `ipynb`,
                            `txt`,
                          ].includes(normalizedPop)
                        ? `code`
                        : `file`;
  });
  (resolveObservabilityBrowserAndOperationEventsIncludes5 = (
    observabilityBrowserAndOperationEventsIncludes5?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    observabilityBrowserAndOperationEventsIncludes5.includes(`.`)
      ? observabilityBrowserAndOperationEventsIncludes5
          .slice(
            observabilityBrowserAndOperationEventsIncludes5.lastIndexOf(`.`) + 1,
          )
          .toLowerCase()
      : ``);
  (ObservabilityBrowserAndOperationEventsRoutine = `.routine/`);
  RegExp(`^routines?[:/](${EditorAnchorsAndMentionsStyles})$`);
  RegExp(`^(?:tables?|topics?)[:/](${EditorAnchorsAndMentionsStyles})$`);
  (resolveObservabilityBrowserAndOperationEventsImagePng = (
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (
      items.length >= 4 &&
      items[0] === 137 &&
      items[1] === 80 &&
      items[2] === 78 &&
      items[3] === 71
    )
      return `image/png`;
    if (
      items.length >= 3 &&
      items[0] === 255 &&
      items[1] === 216 &&
      items[2] === 255
    )
      return `image/jpeg`;
    if (
      items.length >= 4 &&
      items[0] === 71 &&
      items[1] === 73 &&
      items[2] === 70 &&
      items[3] === 56
    )
      return `image/gif`;
    if (
      items.length >= 12 &&
      items[0] === 82 &&
      items[1] === 73 &&
      items[2] === 70 &&
      items[3] === 70 &&
      items[8] === 87 &&
      items[9] === 69 &&
      items[10] === 66 &&
      items[11] === 80
    )
      return `image/webp`;
  });
  (observabilityBrowserAndOperationEventsSet34 = new (Set as Dynamic)(
    [
      `avif`,
      `avis`,
      `heic`,
      `heix`,
      `heim`,
      `heis`,
      `hevc`,
      `hevx`,
      `hevm`,
      `hevs`,
      `mif1`,
      `mif2`,
      `msf1`,
      `miaf`,
      `M4A `,
      `M4B `,
      `M4P `,
    ],
  ));
  (resolveObservabilityBrowserAndOperationEventsVideoWebm = (
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (
      items.length >= 12 &&
      items[4] === 102 &&
      items[5] === 116 &&
      items[6] === 121 &&
      items[7] === 112
    )
      return observabilityBrowserAndOperationEventsSet34.has(
        String.fromCharCode(items[8], items[9], items[10], items[11]),
      )
        ? undefined
        : `video/mp4`;
    if (
      items.length >= 4 &&
      items[0] === 26 &&
      items[1] === 69 &&
      items[2] === 223 &&
      items[3] === 163
    )
      return `video/webm`;
  });
  (observabilityBrowserAndOperationEventsSet35 = new (Set as Dynamic)(
    [`docx`, `xlsx`, `xlsm`, `xls`, `pptx`, `pdf`, `zip`],
  ));
  (resolveObservabilityBrowserAndOperationEventsToFixed = (
    observabilityBrowserAndOperationEvents?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    observabilityBrowserAndOperationEvents < 1024
      ? `${observabilityBrowserAndOperationEvents} B`
      : observabilityBrowserAndOperationEvents < 1024 * 1024
        ? `${(observabilityBrowserAndOperationEvents / 1024).toFixed(1)} KB`
        : `${(observabilityBrowserAndOperationEvents / 1024 / 1024).toFixed(1)} MB`);
  (observabilityBrowserAndOperationEventsPattern11 = /[\p{Cf}\p{Default_Ignorable_Code_Point}\u2800]/u);
  (observabilityBrowserAndOperationEventsPattern12 = /[\u0600-\u0605\u06DD\u070F\u0890\u0891\u08E2\u{110BD}\u{110CD}]/u);
  (observabilityBrowserAndOperationEventsPattern13 = /[\p{L}\p{M}]/u);
  (observabilityBrowserAndOperationEventsPattern14 = /[\p{Extended_Pictographic}\p{Emoji_Modifier}]/u);
  (observabilityBrowserAndOperationEventsPattern15 = /[\u0590-\u08FF\uFB1D-\uFDFF\uFE70-\uFEFC\u{10800}-\u{10FFF}\u{1E800}-\u{1EFFF}]/u);
  (ObservabilityBrowserAndOperationEventsGbeng = [
    `gbeng`,
    `gbsct`,
    `gbwls`,
  ].map(
    (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      Array.from<Dynamic, Dynamic>(
        item,
        (
          observabilityBrowserAndOperationEventsGbeng?: Dynamic,
          ..._extraArguments: unknown[]
        ) =>
          String.fromCodePoint(
            917504 + observabilityBrowserAndOperationEventsGbeng.codePointAt(0),
          ),
      ).concat(`󠁿`),
  ));
  (ObservabilityBrowserAndOperationEventsMessage = `🏴`);
  (observabilityBrowserAndOperationEventsPattern16 = /[\p{Script=Arabic}\p{Script=Syriac}\p{Script=Nko}\p{Script=Mandaic}\p{Script=Adlam}]/u);
  (observabilityBrowserAndOperationEventsPattern17 = /[\u200E\u200F\u061C]/);
  (resolveObservabilityBrowserAndOperationEventsCharCodeAt = (
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    items.length === 1 &&
    items.charCodeAt(0) >= 55296 &&
    items.charCodeAt(0) <= 57343);
  (observabilityBrowserAndOperationEventsPattern18 = /[\u0000-\u001f\u007f-\u009f\u2028\u2029]/g);
  (ObservabilityBrowserAndOperationEventsFrameTitlePropose = `__frame_title_propose`);
  (ObservabilityBrowserAndOperationEventsFrameTitleFromContent = `__frame_title_from_content`);
  (observabilityBrowserAndOperationEventsValue20002 = 2e3);
  (ObservabilityBrowserAndOperationEventsUntitled = `Untitled`);
  (resolveObservabilityBrowserAndOperationEventsValue28 = (
    observabilityBrowserAndOperationEventsValue28?: Dynamic,
    ..._extraArguments: unknown[]
  ) => [...observabilityBrowserAndOperationEventsValue28].length);
  (observabilityBrowserAndOperationEventsPattern19 = /[\p{Cf}\p{Cs}\p{Default_Ignorable_Code_Point}\u2800]/u);
  (observabilityBrowserAndOperationEventsPattern20 = /[\uFE00-\uFE0F]/);
  (observabilityBrowserAndOperationEventsPattern21 = /^[A-Za-z0-9_-]{1,48}(?:\.[0-9]{1,9})?$/);
  (observabilityBrowserAndOperationEventsPattern22 = /^(?:[a-z][a-z0-9]{1,11}\.(?:0|[1-9][0-9]{0,15})|bk_[a-z0-9]{6,8}|root)$/);
  (observabilityBrowserAndOperationEventsValue20003 = 2e3);
  (observabilityBrowserAndOperationEventsValue999999999 = 999999999);
  (resolveObservabilityBrowserAndOperationEventsIsSafeInteger = (
    observabilityBrowserAndOperationEventsIsSafeInteger?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof observabilityBrowserAndOperationEventsIsSafeInteger == `number` &&
    Number.isSafeInteger(observabilityBrowserAndOperationEventsIsSafeInteger) &&
    observabilityBrowserAndOperationEventsIsSafeInteger >= 0);
  (observabilityBrowserAndOperationEventsValue9999999 = 9999999);
  (observabilityBrowserAndOperationEventsPattern23 = /^([a-z0-9_.]{4,29}):([0-9]{1,7})-([0-9]{1,7})$/);
  (resolveObservabilityBrowserAndOperationEventsTest8 = (
    observabilityBrowserAndOperationEventsTest8?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof observabilityBrowserAndOperationEventsTest8 == `string` &&
    observabilityBrowserAndOperationEventsPattern21.test(
      observabilityBrowserAndOperationEventsTest8,
    ));
  (resolveObservabilityBrowserAndOperationEventsTest9 = (
    observabilityBrowserAndOperationEventsTest9?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof observabilityBrowserAndOperationEventsTest9 == `string` &&
    observabilityBrowserAndOperationEventsPattern22.test(
      observabilityBrowserAndOperationEventsTest9,
    ));
  (resolveObservabilityBrowserAndOperationEventsCharCodeAt2 = (
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ): number => {
    let count: number = 0;
    for (let index = 0; index < items.length; index++) {
      let charCodeAt: Dynamic = items.charCodeAt(index);
      count +=
        charCodeAt < 128
          ? 1
          : charCodeAt < 2048
            ? 2
            : (charCodeAt & 64512) == 55296
              ? (index++, 4)
              : 3;
    }
    return count;
  });
}

export {
  ObservabilityBrowserAndOperationEventsAvatarUrl,
  ObservabilityBrowserAndOperationEventsRoutine,
  ObservabilityBrowserAndOperationEventsTitle,
  clearObservabilityBrowserAndOperationEventsDelete,
  createPagesAskLineEvent,
  createPagesAskMarkedEvent,
  createPagesAskRoadEvent,
  createPagesSummonRoundEvent,
  isObservabilityBrowserAndOperationEventsImage,
  isObservabilityBrowserAndOperationEventsIncludes,
  isObservabilityBrowserAndOperationEventsIncludes2,
  isObservabilityBrowserAndOperationEventsJe,
  loadObservabilityBrowserAndOperationEventsAvatarUrl,
  loadObservabilityBrowserAndOperationEventsCanEdit,
  loadObservabilityBrowserAndOperationEventsCode,
  loadObservabilityBrowserAndOperationEventsIssues,
  loadObservabilityBrowserAndOperationEventsNow,
  loadObservabilityBrowserAndOperationEventsSample,
  loadObservabilityBrowserAndOperationEventsSchedule,
  loadObservabilityBrowserAndOperationEventsSearch,
  loadObservabilityBrowserAndOperationEventsUser,
  loadObservabilityBrowserAndOperationEventsValue,
  loadObservabilityBrowserAndOperationEventsValue2,
  observabilityBrowserAndOperationEventsPattern22,
  observabilityBrowserAndOperationEventsSet32,
  observabilityBrowserAndOperationEventsValue10000,
  observabilityBrowserAndOperationEventsValue20003,
  observabilityBrowserAndOperationEventsValue999999999,
  resolveObservabilityBrowserAndOperationEventsBid,
  resolveObservabilityBrowserAndOperationEventsCharCodeAt2,
  resolveObservabilityBrowserAndOperationEventsFeature,
  resolveObservabilityBrowserAndOperationEventsFeature2,
  resolveObservabilityBrowserAndOperationEventsFeature3,
  resolveObservabilityBrowserAndOperationEventsField,
  resolveObservabilityBrowserAndOperationEventsImagePng,
  resolveObservabilityBrowserAndOperationEventsIncludes5,
  resolveObservabilityBrowserAndOperationEventsIsSafeInteger,
  resolveObservabilityBrowserAndOperationEventsKey4,
  resolveObservabilityBrowserAndOperationEventsKey5,
  resolveObservabilityBrowserAndOperationEventsLastIndexOf,
  resolveObservabilityBrowserAndOperationEventsNOTENABLED,
  resolveObservabilityBrowserAndOperationEventsRead,
  resolveObservabilityBrowserAndOperationEventsReplace2,
  resolveObservabilityBrowserAndOperationEventsSome,
  resolveObservabilityBrowserAndOperationEventsSpotUnk,
  resolveObservabilityBrowserAndOperationEventsStartsWith,
  resolveObservabilityBrowserAndOperationEventsTest8,
  resolveObservabilityBrowserAndOperationEventsTest9,
  resolveObservabilityBrowserAndOperationEventsTitle,
  resolveObservabilityBrowserAndOperationEventsTitle2,
  resolveObservabilityBrowserAndOperationEventsToFixed,
  resolveObservabilityBrowserAndOperationEventsTrim,
  resolveObservabilityBrowserAndOperationEventsTrim3,
  resolveObservabilityBrowserAndOperationEventsValue16,
  resolveObservabilityBrowserAndOperationEventsValue17,
  resolveObservabilityBrowserAndOperationEventsValue18,
  resolveObservabilityBrowserAndOperationEventsValue26,
  resolveObservabilityBrowserAndOperationEventsVideoWebm,
  resolveObservabilityBrowserAndOperationEventsXlsx,
  updateObservabilityBrowserAndOperationEventsSelected,
};
