/** BaoCut: platform feature flags from app-core-BE6n4d7F.js. */
import type { Dynamic } from "./types";
import {
  React,
} from "./platform-core-dependencies";
import {
  observabilityTelemetrySet28,
} from "./platform-core-observability-telemetry-3";

function resolvePlatformFeatureFlagsValue(
  platformFeatureFlagsValue?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  for (let resolvePlatformFeatureFlagsValueResult of observabilityTelemetrySet28 as Dynamic)
    resolvePlatformFeatureFlagsValueResult(platformFeatureFlagsValue);
}

function clearPlatformFeatureFlagsDelete(
  clearPlatformFeatureFlagsDelete3?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  observabilityTelemetrySet28.add(clearPlatformFeatureFlagsDelete3);
  return (..._extraArguments: unknown[]): undefined => {
    observabilityTelemetrySet28.delete(clearPlatformFeatureFlagsDelete3);
  };
}

function usePlatformFeatureFlagsPress(
  platformFeatureFlagsPress?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!platformFeatureFlagsPress) return;
      let options2: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
        options(false);
      let clearPlatformFeatureFlagsDelete3: Dynamic =
        clearPlatformFeatureFlagsDelete(
          (
            platformFeatureFlagsPress2?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (platformFeatureFlagsPress2 === `press`) {
              options2();
            }
          },
        );
      window.addEventListener(`blur`, options2);
      return (..._extraArguments: unknown[]): undefined => {
        clearPlatformFeatureFlagsDelete3();
        window.removeEventListener(`blur`, options2);
      };
    },
    [platformFeatureFlagsPress, options],
  );
}

function resolvePlatformFeatureFlagsHasFocus(
  platformFeatureFlagsHasFocus?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (..._extraArguments: unknown[]): Dynamic =>
    document.hasFocus() && platformFeatureFlagsHasFocus();
}

var PlatformFeatureFlagsServerPersisted: ({
    name: string;
    serverPersisted: boolean;
    hidden?: undefined;
    serverOnly?: undefined;
    gbKey?: undefined;
    default?: undefined;
} | {
    serverPersisted?: undefined;
    name: string;
    hidden: boolean;
    gbKey: string;
    serverOnly?: undefined;
    default?: undefined;
} | {
    serverPersisted?: undefined;
    name: string;
    hidden: boolean;
    default: boolean;
    serverOnly?: undefined;
    gbKey?: undefined;
} | {
    serverPersisted?: undefined;
    name: string;
    gbKey: string;
    default: boolean;
    hidden?: undefined;
    serverOnly?: undefined;
} | {
    serverPersisted?: undefined;
    name: string;
    hidden: boolean;
    serverOnly?: undefined;
    gbKey?: undefined;
    default?: undefined;
} | {
    serverPersisted?: undefined;
    name: string;
    hidden: boolean;
    gbKey: string;
    default: boolean;
    serverOnly?: undefined;
} | {
    serverPersisted?: undefined;
    name: string;
    hidden: boolean;
    serverOnly: boolean;
    gbKey: string;
    default: boolean;
})[];

var PlatformFeatureFlagsBongoFlags: string;

function resolvePlatformFeatureFlagsGetItem(
  ..._extraArguments: unknown[]
): Dynamic {
  try {
    let item = localStorage.getItem(PlatformFeatureFlagsBongoFlags);
    let parse: Dynamic = item ? JSON.parse(item) : null;
    return parse && typeof parse == `object` && !Array.isArray(parse)
      ? parse
      : {};
  } catch {
    return {};
  }
}

var PlatformFeatureFlagsState: Dynamic;

var PlatformFeatureFlagsState2: ({
    name: string;
    serverPersisted: boolean;
    hidden?: undefined;
    serverOnly?: undefined;
    gbKey?: undefined;
    default?: undefined;
} | {
    serverPersisted?: undefined;
    name: string;
    hidden: boolean;
    gbKey: string;
    serverOnly?: undefined;
    default?: undefined;
} | {
    serverPersisted?: undefined;
    name: string;
    hidden: boolean;
    default: boolean;
    serverOnly?: undefined;
    gbKey?: undefined;
} | {
    serverPersisted?: undefined;
    name: string;
    gbKey: string;
    default: boolean;
    hidden?: undefined;
    serverOnly?: undefined;
} | {
    serverPersisted?: undefined;
    name: string;
    hidden: boolean;
    serverOnly?: undefined;
    gbKey?: undefined;
    default?: undefined;
} | {
    serverPersisted?: undefined;
    name: string;
    hidden: boolean;
    gbKey: string;
    default: boolean;
    serverOnly?: undefined;
} | {
    serverPersisted?: undefined;
    name: string;
    hidden: boolean;
    serverOnly: boolean;
    gbKey: string;
    default: boolean;
})[];

var PlatformFeatureFlagsState3: Dynamic;

var PlatformFeatureFlagsProduction: string;

function resolvePlatformFeatureFlagsValue2(
  platformFeatureFlagsValue2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  PlatformFeatureFlagsState = platformFeatureFlagsValue2 ?? null;
  resolvePlatformFeatureFlagsValue6();
}

function resolvePlatformFeatureFlagsName(
  platformFeatureFlagsName?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (!platformFeatureFlagsName) {
    PlatformFeatureFlagsState3 = null;
    resolvePlatformFeatureFlagsValue6();
    return;
  }
  let record2: Dynamic = {};
  for (let resolvePlatformFeatureFlagsNameResult of [
    (
      platformFeatureFlagsName2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) => platformFeatureFlagsName2.name === options,
    (
      platformFeatureFlagsName2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) => platformFeatureFlagsName2.gbKey === options,
  ] as Dynamic)
    for (let [
      resolvePlatformFeatureFlagsNameResult2,
      resolvePlatformFeatureFlagsNameResult3,
    ] of Object.entries(platformFeatureFlagsName) as Dynamic) {
      if (typeof resolvePlatformFeatureFlagsNameResult3 != `boolean`) continue;
      let PlatformFeatureFlagsState22 = PlatformFeatureFlagsState2.find(
        (
          PlatformFeatureFlagsState23?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          PlatformFeatureFlagsState23.gbKey &&
          resolvePlatformFeatureFlagsNameResult(
            PlatformFeatureFlagsState23,
            resolvePlatformFeatureFlagsNameResult2,
          ),
      );
      if (PlatformFeatureFlagsState22) {
        record2[PlatformFeatureFlagsState22.name] =
          resolvePlatformFeatureFlagsNameResult3;
      }
    }
  PlatformFeatureFlagsState3 = record2;
  resolvePlatformFeatureFlagsValue6();
}

function resolvePlatformFeatureFlagsValue3(
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    PlatformFeatureFlagsState?.environment ??
    (PlatformFeatureFlagsState3 ? PlatformFeatureFlagsProduction : undefined)
  );
}

function resolvePlatformFeatureFlagsFind(
  platformFeatureFlagsFind?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (
    (!PlatformFeatureFlagsState && !PlatformFeatureFlagsState3) ||
    !PlatformFeatureFlagsState2.find(
      (PlatformFeatureFlagsState22?: Dynamic, ..._extraArguments: unknown[]) =>
        PlatformFeatureFlagsState22.name === platformFeatureFlagsFind,
    )?.gbKey
  )
    return;
  let PlatformFeatureFlagsState3Item: Dynamic =
    PlatformFeatureFlagsState3?.[platformFeatureFlagsFind];
  if (typeof PlatformFeatureFlagsState3Item == `boolean`)
    return PlatformFeatureFlagsState3Item;
  let valueItem: Dynamic =
    PlatformFeatureFlagsState?.values[platformFeatureFlagsFind];
  return typeof valueItem == `boolean` ? valueItem : undefined;
}

var isPlatformFeatureFlagsValue: (..._extraArguments: unknown[]) => boolean;

function resolvePlatformFeatureFlagsValue4(..._extraArguments: unknown[]) {
  return isPlatformFeatureFlagsValue();
}

function resolvePlatformFeatureFlagsValue5(
  platformFeatureFlagsValue5?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return resolvePlatformFeatureFlagsFind(platformFeatureFlagsValue5);
}

var PlatformFeatureFlagsEnabled: Readonly<{
    enabled(platformFeatureFlagsEnabled?: Dynamic, ..._extraArguments: unknown[]): Dynamic;
}>;

var PlatformFeatureFlagsState4: Readonly<{
    enabled(platformFeatureFlagsEnabled?: Dynamic, ..._extraArguments: unknown[]): Dynamic;
}>;

function resolvePlatformFeatureFlagsEnabled(
  platformFeatureFlagsEnabled?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (PlatformFeatureFlagsState4 !== PlatformFeatureFlagsEnabled)
    return PlatformFeatureFlagsState4.enabled(platformFeatureFlagsEnabled);
  let platformFeatureFlagsGetItemItem: Dynamic =
    resolvePlatformFeatureFlagsGetItem()[platformFeatureFlagsEnabled];
  return platformFeatureFlagsGetItemItem === true ||
    platformFeatureFlagsGetItemItem === false
    ? platformFeatureFlagsGetItemItem
    : undefined;
}

function resolvePlatformFeatureFlagsEnabled2(
  platformFeatureFlagsEnabled2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return PlatformFeatureFlagsState4.enabled(platformFeatureFlagsEnabled2);
}

var platformFeatureFlagsSet: Dynamic;

var resolvePlatformFeatureFlagsValue6: (..._extraArguments: unknown[]) => undefined;

var clearPlatformFeatureFlagsDelete2: Dynamic;

var PlatformFeatureFlagsState5: Dynamic;

function usePlatformFeatureFlagsUseSyncExternalStore(
  platformFeatureFlagsUseSyncExternalStore?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (0, React.useSyncExternalStore)(
    clearPlatformFeatureFlagsDelete2,
    (..._extraArguments: unknown[]): Dynamic =>
      resolvePlatformFeatureFlagsEnabled2(
        platformFeatureFlagsUseSyncExternalStore,
      ),
  );
}

function usePlatformFeatureFlagsUseSyncExternalStore2(
  platformFeatureFlagsUseSyncExternalStore2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (0, React.useSyncExternalStore)(
    clearPlatformFeatureFlagsDelete2,
    (..._extraArguments: unknown[]) =>
      resolvePlatformFeatureFlagsValue5(
        platformFeatureFlagsUseSyncExternalStore2,
      ),
  );
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializePlatformFeatureFlagsStep1(): void {
  (PlatformFeatureFlagsServerPersisted = [
    {
      name: `officeDocs`,
      serverPersisted: true,
    },
    {
      name: `ldocAlpha`,
      serverPersisted: true,
    },
    {
      name: `docObservers`,
      hidden: true,
      gbKey: `bongo_doc_observers`,
    },
    {
      name: `docObserversSpawn`,
      hidden: true,
      gbKey: `bongo_doc_observers_spawn`,
    },
    {
      name: `coworkerObservers`,
      hidden: true,
      gbKey: `bongo_coworker_observers`,
    },
    {
      name: `foldCore`,
      hidden: true,
      default: true,
    },
    {
      name: `createV3Project`,
      gbKey: `bongo_create_v3_project`,
      default: true,
    },
    {
      name: `widgetNodes`,
      serverPersisted: true,
    },
    {
      name: `widgetProvenance`,
      hidden: true,
    },
    {
      name: `widgetLiveCode`,
      serverPersisted: true,
    },
    {
      name: `agentSweep`,
      hidden: true,
      default: true,
    },
    {
      name: `opsOnFeed`,
      hidden: true,
      gbKey: `pages_cedar_tarn`,
      default: true,
    },
    {
      name: `refusalClass`,
      hidden: true,
      gbKey: `pages_refusal_class`,
      default: false,
    },
    {
      name: `laneChurnGuard`,
      hidden: true,
      gbKey: `pages_fe_lane_churn_guard`,
      default: false,
    },
    {
      name: `untieLateRows`,
      hidden: true,
      gbKey: `pages_tern_moraine`,
      default: true,
    },
    {
      name: `widgetGuard`,
      hidden: true,
      gbKey: `pages_fe_widget_guard`,
      default: true,
    },
    {
      name: `swimming`,
      hidden: true,
      gbKey: `bongo_swimming`,
      default: false,
    },
    {
      name: `docFonts`,
      hidden: true,
      serverOnly: true,
      gbKey: `pages_dunlin_beck`,
      default: false,
    },
    {
      name: `docLanguage`,
      hidden: true,
      serverOnly: true,
      gbKey: `pages_wren_corrie`,
      default: false,
    },
    {
      name: `claudeWriting`,
      hidden: true,
      gbKey: `pages_osprey_ghyll`,
      default: false,
    },
    {
      name: `proofreadClaude`,
      hidden: true,
      gbKey: `pages_proofread_enabled`,
      default: true,
    },
    {
      name: `askViaSession`,
      hidden: true,
      gbKey: `pages_ask_via_session`,
      default: false,
    },
    {
      name: `askNoCommentSend`,
      hidden: true,
      gbKey: `pages_ask_no_comment_send`,
      default: false,
    },
    {
      name: `askWaitingMarks`,
      hidden: true,
      gbKey: `pages_ask_waiting_marks`,
      default: false,
    },
    {
      name: `petrelSchist`,
      hidden: true,
      serverOnly: true,
      gbKey: `pages_petrel_schist`,
      default: false,
    },
    {
      name: `askWhy`,
      hidden: true,
      gbKey: `pages_ask_why`,
      default: false,
    },
    {
      name: `configMarks`,
      hidden: true,
      serverOnly: true,
      gbKey: `pages_config_marks`,
      default: false,
    },
    {
      name: `peerCaretThrottle`,
      hidden: true,
      gbKey: `pages_plover_fell`,
      default: true,
    },
    {
      name: `firstPaintFromSnapshot`,
      hidden: true,
      default: false,
    },
    {
      name: `pendingCaretInfer`,
      hidden: true,
      default: true,
    },
    {
      name: `versionHistoryV2`,
      hidden: true,
      serverOnly: true,
      gbKey: `pages_heron_scree`,
      default: false,
    },
    {
      name: `versionRedlineLegacy`,
      hidden: true,
      default: false,
    },
    {
      name: `artifactLinkChips`,
      hidden: true,
      gbKey: `pages_plover_rill`,
      default: false,
    },
    {
      name: `attributionPanel`,
      hidden: true,
      gbKey: `pages_fe_attribution_panel`,
      default: false,
    },
  ]);
  new (Set as Dynamic)(
    PlatformFeatureFlagsServerPersisted.filter(
      (
        PlatformFeatureFlagsServerPersisted2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => PlatformFeatureFlagsServerPersisted2.serverPersisted,
    ).map(
      (
        filteredPlatformFeatureFlagsServerPersisted?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => filteredPlatformFeatureFlagsServerPersisted.name,
    ),
  );
  (PlatformFeatureFlagsBongoFlags = `bongo:flags`);
  (PlatformFeatureFlagsState = null);
  (PlatformFeatureFlagsState2 = PlatformFeatureFlagsServerPersisted);
  (PlatformFeatureFlagsState3 = null);
  (PlatformFeatureFlagsProduction = `production`);
  (isPlatformFeatureFlagsValue = (..._extraArguments: unknown[]) => false);
  (PlatformFeatureFlagsEnabled = Object.freeze({
    enabled(
      platformFeatureFlagsEnabled?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let PlatformFeatureFlagsState22: Dynamic = PlatformFeatureFlagsState2.find(
        (PlatformFeatureFlagsState23?: Dynamic, ..._extraArguments: unknown[]) =>
          PlatformFeatureFlagsState23.name === platformFeatureFlagsEnabled,
      );
      if (PlatformFeatureFlagsState22?.retired)
        return PlatformFeatureFlagsState22.retired === `on`;
      let platformFeatureFlagsFind = resolvePlatformFeatureFlagsFind(
        platformFeatureFlagsEnabled,
      );
      if (
        platformFeatureFlagsFind !== undefined &&
        resolvePlatformFeatureFlagsValue3() === `production`
      )
        return platformFeatureFlagsFind;
      if (
        PlatformFeatureFlagsState22?.serverOnly &&
        (platformFeatureFlagsFind !== undefined ||
          !resolvePlatformFeatureFlagsValue4())
      )
        return (
          platformFeatureFlagsFind ?? PlatformFeatureFlagsState22.default ?? false
        );
      let platformFeatureFlagsGetItemItem: Dynamic =
        resolvePlatformFeatureFlagsGetItem()[platformFeatureFlagsEnabled];
      return platformFeatureFlagsGetItemItem === true
        ? true
        : platformFeatureFlagsGetItemItem === false
          ? false
          : (platformFeatureFlagsFind ??
            PlatformFeatureFlagsState22?.default ??
            false);
    },
  }));
  (PlatformFeatureFlagsState4 = PlatformFeatureFlagsEnabled);
  (platformFeatureFlagsSet = new (Set as Dynamic)());
  (resolvePlatformFeatureFlagsValue6 = (
    ..._extraArguments: unknown[]
  ): undefined => {
    for (let resolvePlatformFeatureFlagsValue6Result of platformFeatureFlagsSet as Dynamic)
      resolvePlatformFeatureFlagsValue6Result();
  });
  (clearPlatformFeatureFlagsDelete2 = (
    clearPlatformFeatureFlagsDelete22?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => (
    platformFeatureFlagsSet.add(clearPlatformFeatureFlagsDelete22),
    (..._extraArguments: unknown[]): undefined => {
      platformFeatureFlagsSet.delete(clearPlatformFeatureFlagsDelete22);
    }
  ));
  (PlatformFeatureFlagsState5 = clearPlatformFeatureFlagsDelete2);
  if (typeof window !== "undefined") {
    window.addEventListener(
      `storage`,
      (event?: Dynamic, ..._extraArguments: unknown[]) =>
        event.key === PlatformFeatureFlagsBongoFlags &&
        resolvePlatformFeatureFlagsValue6(),
    );
  }
}

export {
  PlatformFeatureFlagsState5,
  clearPlatformFeatureFlagsDelete,
  resolvePlatformFeatureFlagsEnabled,
  resolvePlatformFeatureFlagsEnabled2,
  resolvePlatformFeatureFlagsHasFocus,
  resolvePlatformFeatureFlagsName,
  resolvePlatformFeatureFlagsValue,
  resolvePlatformFeatureFlagsValue2,
  resolvePlatformFeatureFlagsValue5,
  usePlatformFeatureFlagsPress,
  usePlatformFeatureFlagsUseSyncExternalStore,
  usePlatformFeatureFlagsUseSyncExternalStore2,
};
