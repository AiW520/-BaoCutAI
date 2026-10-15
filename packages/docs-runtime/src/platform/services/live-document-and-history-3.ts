/** BaoCut: platform live document and history from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  React,
  create,
  inFrame,
} from "../dependencies";
import {
  resolveObservabilityTelemetryBootGaveUp,
} from "../observability/telemetry-1";
import {
  emitTelemetryEvent,
} from "../observability/telemetry-3";
import {
  withBusyRetry,
} from "./session-and-sources-1";
import {
  resolvePlatformSessionAndSourcesUnavailable,
} from "./session-and-sources-2";
import {
  frameDownloadsAvailable,
  frameDriveRoad,
  frameLane,
  frameNavigatorOnline,
  frameNotionRoad,
  framePagesExportRoad,
  frameSinceNavigationMs,
  frameTransportFacts,
  liveLaneDeps,
} from "../observability/browser-and-operation-events-3";
import {
  api,
} from "./api-and-auth-1";
import {
  ackOf,
  collectPlatformApiAndAuthVerb,
  liveDoor,
  liveDoorAt,
} from "./api-and-auth-2";
import {
  resolveDataModelSchemasFrame,
} from "../data/model-schemas-3";
import {
  updateDataModelSchemasValue,
} from "../data/model-schemas-4";
import {
  resolveDataOperationEngineMsg,
} from "../data/operation-engine-3";
import {
  clearPlatformSyncAndRoutingDispose,
  createPagesBootGaveUpEvent,
} from "./sync-and-routing-1";
import {
  resolvePlatformSyncAndRoutingValue23,
} from "./sync-and-routing-2";
import {
  PlatformLiveDocumentAndHistoryDeclare3,
  resolvePlatformLiveDocumentAndHistoryValue24,
  updatePlatformLiveDocumentAndHistoryRev,
} from "./live-document-and-history-2";
import {
  resolvePlatformLiveDocumentAndHistoryFileId3,
  updatePlatformLiveDocumentAndHistoryReady,
} from "./live-document-and-history-4";

function usePlatformLiveDocumentAndHistoryFormat(
  platformLiveDocumentAndHistory?: Dynamic,
  options?: Dynamic,
  context: Dynamic = PlatformLiveDocumentAndHistoryDeclare3,
  ..._extraArguments: unknown[]
): undefined {
  let optionsRef: Dynamic = (0, React.useRef)(options);
  optionsRef.current = options;
  let mappedOptionsText: Dynamic = options
    .map(
      (option?: Dynamic, ..._extraArguments: unknown[]) =>
        `${option.format}${option.disabled ? `!` : ``}${option.interactive ? `?` : ``}`,
    )
    .join(`,`);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (platformLiveDocumentAndHistory) {
        context.declare(
          optionsRef.current.length === 0
            ? null
            : optionsRef.current.map(
                (
                  {
                    format: format,
                    disabled: disabled,
                    interactive: interactive,
                  }: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => {
                  let record2: Dynamic = disabled
                    ? {
                        format: format,
                        disabled: disabled,
                      }
                    : {
                        format: format,
                      };
                  if (interactive) {
                    record2.interactive = true;
                  }
                  return record2;
                },
              ),
        );
      }
    },
    [platformLiveDocumentAndHistory, mappedOptionsText, context],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!platformLiveDocumentAndHistory) return;
      let mappedOptions: Dynamic = optionsRef.current.map(
        (option?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          context.onExport(
            option.format,
            (
              platformLiveDocumentAndHistory2?: Dynamic,
              options2?: Dynamic,
              context2?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              let option2: Dynamic = optionsRef.current.find(
                (option3?: Dynamic, ..._extraArguments: unknown[]) =>
                  option3.format === platformLiveDocumentAndHistory2,
              );
              if (option2 && !option2.disabled) {
                option2.run(options2, context2);
              } else {
                context.decline(options2);
              }
            },
          ),
      );
      return (..._extraArguments: unknown[]): Dynamic =>
        mappedOptions.forEach(
          (mappedOption?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            mappedOption(),
        );
    },
    [platformLiveDocumentAndHistory, mappedOptionsText, context],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (platformLiveDocumentAndHistory)
        return (..._extraArguments: unknown[]): Dynamic =>
          context.declare(null);
    },
    [platformLiveDocumentAndHistory, context],
  );
}

var PlatformLiveDocumentAndHistoryDownloads: Dynamic;

var platformLiveDocumentAndHistoryValue4: number;

var platformLiveDocumentAndHistoryValue8000: number;

function usePlatformLiveDocumentAndHistoryDownloadsOk(
  platformLiveDocumentAndHistoryDownloadsOk: Dynamic = PlatformLiveDocumentAndHistoryDownloads,
  options: Dynamic = platformLiveDocumentAndHistoryValue8000,
  ..._extraArguments: unknown[]
): Dynamic {
  let [downloadsOk, setDownloadsOk]: Dynamic = (0, React.useState)(false);
  let [drive, setDrive]: Dynamic = (0, React.useState)(`ok`);
  let [doorExport, setDoorExport]: Dynamic = (0, React.useState)(`ok`);
  let [notion, setNotion]: Dynamic = (0, React.useState)(`ok`);
  let [countState, setCountState]: Dynamic = (0, React.useState)(0);
  let [inFlight, setInFlight]: Dynamic = (0, React.useState)(null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let enabled = true;
      let usePlatformLiveDocumentAndHistoryDownloadsOkHandler: Dynamic =
        (
          platformLiveDocumentAndHistoryDownloadsOk2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
        (
          platformLiveDocumentAndHistoryDownloadsOk3?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (enabled) {
            platformLiveDocumentAndHistoryDownloadsOk2(
              platformLiveDocumentAndHistoryDownloadsOk3,
            );
            setCountState(
              (
                platformLiveDocumentAndHistoryDownloadsOk4?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => platformLiveDocumentAndHistoryDownloadsOk4 + 1,
            );
          }
        };
      platformLiveDocumentAndHistoryDownloadsOk
        .downloads()
        .then(
          usePlatformLiveDocumentAndHistoryDownloadsOkHandler(setDownloadsOk),
        );
      platformLiveDocumentAndHistoryDownloadsOk
        .drive()
        .then(usePlatformLiveDocumentAndHistoryDownloadsOkHandler(setDrive));
      platformLiveDocumentAndHistoryDownloadsOk
        .doorExport()
        .then(
          usePlatformLiveDocumentAndHistoryDownloadsOkHandler(setDoorExport),
        );
      platformLiveDocumentAndHistoryDownloadsOk
        .notion()
        .then(usePlatformLiveDocumentAndHistoryDownloadsOkHandler(setNotion));
      let setTimeout2 = setTimeout(
        (..._extraArguments: unknown[]): Dynamic =>
          setCountState(platformLiveDocumentAndHistoryValue4),
        options,
      );
      return (..._extraArguments: unknown[]): undefined => {
        enabled = false;
        clearTimeout(setTimeout2);
      };
    },
    [platformLiveDocumentAndHistoryDownloadsOk, options],
  );
  let roads: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => ({
      downloadsOk: downloadsOk,
      drive: drive,
      doorExport: doorExport,
      notion: notion,
    }),
    [downloadsOk, drive, doorExport, notion],
  );
  let roadsPending = countState < platformLiveDocumentAndHistoryValue4;
  return (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => ({
      roads: roads,
      roadsPending: roadsPending,
      inFlight: inFlight,
      setInFlight: setInFlight,
    }),
    [roads, roadsPending, inFlight],
  );
}

var platformLiveDocumentAndHistoryValue20002: number;

function resolvePlatformLiveDocumentAndHistoryRound(
  platformLiveDocumentAndHistoryRound?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    platformLiveDocumentAndHistoryRound +
    Math.round(
      (2 *
        (Number.isFinite(options) ? Math.min(1, Math.max(0, options)) : 0.5) -
        1) *
        platformLiveDocumentAndHistoryValue20002,
    )
  );
}

function subscribePlatformLiveDocumentAndHistoryIdle(
  platformLiveDocumentAndHistoryIdle?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let beatMs: Dynamic = platformLiveDocumentAndHistoryIdle.beatMs ?? 15e3;
  let random: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
    platformLiveDocumentAndHistoryIdle.random === undefined
      ? beatMs
      : resolvePlatformLiveDocumentAndHistoryRound(
          beatMs,
          platformLiveDocumentAndHistoryIdle.random(),
        );
  let subscribePlatformLiveDocumentAndHistoryIdleResult: Dynamic = null;
  let subscribePlatformLiveDocumentAndHistoryIdleHandler = (
    ..._extraArguments: unknown[]
  ): undefined => {
    if (subscribePlatformLiveDocumentAndHistoryIdleResult !== null) {
      platformLiveDocumentAndHistoryIdle.timers.clearTimeout(
        subscribePlatformLiveDocumentAndHistoryIdleResult,
      );
    }
    subscribePlatformLiveDocumentAndHistoryIdleResult = null;
  };
  let random2 = (..._extraArguments: unknown[]): undefined => {
    subscribePlatformLiveDocumentAndHistoryIdleResult =
      platformLiveDocumentAndHistoryIdle.timers.setTimeout(
        (..._extraArguments: unknown[]): undefined => {
          subscribePlatformLiveDocumentAndHistoryIdleResult = null;
          platformLiveDocumentAndHistoryIdle.beat();
          random2();
        },
        random(),
      );
  };
  let beat = (..._extraArguments: unknown[]): undefined => {
    subscribePlatformLiveDocumentAndHistoryIdleHandler();
    platformLiveDocumentAndHistoryIdle.beat();
    random2();
  };
  if (!platformLiveDocumentAndHistoryIdle.visibility.idle()) {
    beat();
  }
  let subscribe: Dynamic =
    platformLiveDocumentAndHistoryIdle.visibility.subscribe(
      (
        platformLiveDocumentAndHistoryIdle2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (platformLiveDocumentAndHistoryIdle2 === `idle`) {
          subscribePlatformLiveDocumentAndHistoryIdleHandler();
        } else {
          if (
            platformLiveDocumentAndHistoryIdle2 === `visible` &&
            subscribePlatformLiveDocumentAndHistoryIdleResult === null
          ) {
            beat();
          }
        }
      },
    );
  return (..._extraArguments: unknown[]): undefined => {
    subscribe();
    subscribePlatformLiveDocumentAndHistoryIdleHandler();
  };
}

var PlatformLiveDocumentAndHistorySetTimeout: Dynamic;

var resolvePlatformLiveDocumentAndHistoryRandom: Dynamic;

function usePlatformLiveDocumentAndHistoryBeat(
  beat?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let elementRef: Dynamic = (0, React.useRef)(null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): undefined => {
        elementRef.current?.dispose();
        elementRef.current = null;
      },
    [],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => (
      (elementRef.current ??= clearPlatformSyncAndRoutingDispose(
        typeof document === "undefined" ? undefined : document,
        PlatformLiveDocumentAndHistorySetTimeout,
      )),
      subscribePlatformLiveDocumentAndHistoryIdle({
        beat: beat,
        visibility: elementRef.current,
        timers: PlatformLiveDocumentAndHistorySetTimeout,
        random: resolvePlatformLiveDocumentAndHistoryRandom,
      })
    ),
    [beat],
  );
}

var PlatformLiveDocumentAndHistoryKind2: Readonly<{
    kind: "live";
}>;

function isPlatformLiveDocumentAndHistoryKind(
  platformLiveDocumentAndHistoryKind?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return !options ||
    !platformLiveDocumentAndHistoryKind ||
    platformLiveDocumentAndHistoryKind.upto === undefined
    ? PlatformLiveDocumentAndHistoryKind2
    : {
        kind: `pinned`,
        upto: platformLiveDocumentAndHistoryKind.upto,
      };
}

var PlatformLiveDocumentAndHistoryNOSHELLORIGIN: string;

var platformLiveDocumentAndHistoryPattern12: RegExp;

function resolvePlatformLiveDocumentAndHistoryReason2(
  platformLiveDocumentAndHistoryReason2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (platformLiveDocumentAndHistoryReason2 === null)
    return {
      reason: `unknown`,
      dead: null,
    };
  let deadReason: Dynamic = platformLiveDocumentAndHistoryReason2.deadReason;
  if (deadReason !== null) {
    let deadReason2: Dynamic = platformLiveDocumentAndHistoryPattern12.test(
      deadReason,
    )
      ? deadReason
      : `UNKNOWN`;
    return deadReason2 === PlatformLiveDocumentAndHistoryNOSHELLORIGIN
      ? {
          reason: `no_shell`,
          dead: `no_shell_origin`,
        }
      : {
          reason: `lane_refused`,
          dead: deadReason2.toLowerCase(),
        };
  }
  return platformLiveDocumentAndHistoryReason2.helloAnswered
    ? platformLiveDocumentAndHistoryReason2.everConnected
      ? platformLiveDocumentAndHistoryReason2.everOpened
        ? platformLiveDocumentAndHistoryReason2.connectedNow
          ? {
              reason: `door_unanswered`,
              dead: null,
            }
          : {
              reason: `ws_opened_then_lost`,
              dead: null,
            }
        : {
            reason: `lane_never_opened`,
            dead: null,
          }
      : {
          reason: `ws_never_opened`,
          dead: null,
        }
    : {
        reason: `shell_unanswered`,
        dead: null,
      };
}

function resolvePlatformLiveDocumentAndHistoryReason3(
  platformLiveDocumentAndHistoryReason3?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    reason: `signed_out`,
    dead: resolvePlatformLiveDocumentAndHistoryReason2(
      platformLiveDocumentAndHistoryReason3,
    ).dead,
  };
}

var PlatformLiveDocumentAndHistoryNoShell: Dynamic;

function resolvePlatformLiveDocumentAndHistoryValue26(
  platformLiveDocumentAndHistoryValue26?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return PlatformLiveDocumentAndHistoryNoShell[
    platformLiveDocumentAndHistoryValue26
  ];
}

var PlatformLiveDocumentAndHistoryMessage3: string;

function resolvePlatformLiveDocumentAndHistoryWsNeverOpened(
  platformLiveDocumentAndHistoryWsNeverOpened?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return platformLiveDocumentAndHistoryWsNeverOpened === `ws_never_opened`
    ? PlatformLiveDocumentAndHistoryMessage3
    : null;
}

function isPlatformLiveDocumentAndHistoryIsFinite(
  platformLiveDocumentAndHistoryIsFinite?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return !Number.isFinite(platformLiveDocumentAndHistoryIsFinite) ||
    platformLiveDocumentAndHistoryIsFinite < 1e3
    ? 1
    : Math.min(65535, Math.floor(platformLiveDocumentAndHistoryIsFinite / 1e3));
}

var PlatformLiveDocumentAndHistoryFacts: Dynamic;

var platformLiveDocumentAndHistoryValue06: Dynamic;

var platformLiveDocumentAndHistoryValue_1: boolean;

function resolvePlatformLiveDocumentAndHistoryReason4(
  platformLiveDocumentAndHistoryReason4: Dynamic = PlatformLiveDocumentAndHistoryFacts,
  ..._extraArguments: unknown[]
): Dynamic {
  try {
    return resolvePlatformLiveDocumentAndHistoryReason2(
      platformLiveDocumentAndHistoryReason4.facts(),
    );
  } catch {
    return {
      reason: `unknown`,
      dead: null,
    };
  }
}

function resolvePlatformLiveDocumentAndHistoryReason5(
  platformLiveDocumentAndHistoryReason5: Dynamic = `card`,
  options: Dynamic = PlatformLiveDocumentAndHistoryFacts,
  ..._extraArguments: unknown[]
): Dynamic {
  let record2: Dynamic = {
    reason:
      platformLiveDocumentAndHistoryReason5 === `signin`
        ? `signed_out`
        : `unknown`,
    dead: null,
  };
  try {
    if (platformLiveDocumentAndHistoryReason5 === `signin`) {
      if (platformLiveDocumentAndHistoryValue_1) return record2.reason;
      platformLiveDocumentAndHistoryValue_1 = true;
    }
    let facts: Dynamic = options.facts();
    record2 =
      platformLiveDocumentAndHistoryReason5 === `signin`
        ? resolvePlatformLiveDocumentAndHistoryReason3(facts)
        : resolvePlatformLiveDocumentAndHistoryReason2(facts);
    platformLiveDocumentAndHistoryValue06 += 1;
    try {
      options.health(
        resolvePlatformLiveDocumentAndHistoryValue26(record2.reason),
      );
    } catch {}
    options.say(
      createPagesBootGaveUpEvent({
        reason: record2.reason,
        dead: record2.dead,
        online: options.online(),
        helloAnswered: facts?.helloAnswered === true,
        everConnected: facts?.everConnected === true,
        everOpened: facts?.everOpened === true,
        afterS: isPlatformLiveDocumentAndHistoryIsFinite(
          options.sinceNavigationMs(),
        ),
        tries: platformLiveDocumentAndHistoryValue06,
      }),
    );
  } catch {}
  return record2.reason;
}

var platformLiveDocumentAndHistoryDataSourcesValues: string[];

var platformLiveDocumentAndHistoryModalModalRefValues: string[];

function isPlatformLiveDocumentAndHistorySurface(
  platformLiveDocumentAndHistorySurface?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let platformLiveDocumentAndHistorySurfaceEntry: Dynamic =
    platformLiveDocumentAndHistorySurface.get(`modal`);
  let platformLiveDocumentAndHistorySurfaceEntry2: Dynamic =
    platformLiveDocumentAndHistorySurface.get(`modal-ref`);
  if (
    platformLiveDocumentAndHistorySurfaceEntry === null ||
    platformLiveDocumentAndHistorySurfaceEntry2 === null ||
    !platformLiveDocumentAndHistoryDataSourcesValues.includes(
      platformLiveDocumentAndHistorySurfaceEntry,
    )
  )
    return null;
  let dataOperationEngineMsg: Dynamic = resolveDataOperationEngineMsg(
    platformLiveDocumentAndHistorySurfaceEntry2,
  );
  return !dataOperationEngineMsg.ok ||
    dataOperationEngineMsg.lidAlias !== undefined ||
    (dataOperationEngineMsg.noun !== `database` &&
      dataOperationEngineMsg.noun !== `routine`)
    ? null
    : {
        surface: `data-sources`,
        noun: dataOperationEngineMsg.noun,
        ref: dataOperationEngineMsg.canonical,
      };
}

function resolvePlatformLiveDocumentAndHistoryModal(
  platformLiveDocumentAndHistoryModal?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    modal: platformLiveDocumentAndHistoryModal.surface,
    "modal-ref": platformLiveDocumentAndHistoryModal.ref,
  };
}

function isPlatformLiveDocumentAndHistoryDelete(
  platformLiveDocumentAndHistoryDelete?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  for (let isPlatformLiveDocumentAndHistoryDeleteResult of platformLiveDocumentAndHistoryModalModalRefValues as Dynamic)
    platformLiveDocumentAndHistoryDelete.delete(
      isPlatformLiveDocumentAndHistoryDeleteResult,
    );
  if (options === null) return true;
  for (let [
    isPlatformLiveDocumentAndHistoryDeleteResult,
    isPlatformLiveDocumentAndHistoryDeleteResult2,
  ] of Object.entries(
    resolvePlatformLiveDocumentAndHistoryModal(options),
  ) as Dynamic)
    platformLiveDocumentAndHistoryDelete.set(
      isPlatformLiveDocumentAndHistoryDeleteResult,
      isPlatformLiveDocumentAndHistoryDeleteResult2,
    );
  return true;
}

var platformLiveDocumentAndHistoryValue50: number;

var PlatformLiveDocumentAndHistoryState2: Dynamic;

var resolvePlatformLiveDocumentAndHistoryValue27: Dynamic;

var resolvePlatformLiveDocumentAndHistoryValue28: Dynamic;

var filterPlatformLiveDocumentAndHistoryShown: Dynamic;

var resolvePlatformLiveDocumentAndHistoryValue29: Dynamic;

var resolvePlatformLiveDocumentAndHistoryFolded: Dynamic;

function updatePlatformLiveDocumentAndHistoryValue(
  updatePlatformLiveDocumentAndHistoryValue2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let platformLiveDocumentAndHistoryValue28: Dynamic =
    resolvePlatformLiveDocumentAndHistoryValue28(
      PlatformLiveDocumentAndHistoryState2.getState().value,
    );
  let {
    [updatePlatformLiveDocumentAndHistoryValue2]:
      platformLiveDocumentAndHistoryValue282,
    ...platformLiveDocumentAndHistoryValue283
  }: Dynamic = platformLiveDocumentAndHistoryValue28;
  let filterPlatformLiveDocumentAndHistoryShown2: Dynamic =
    filterPlatformLiveDocumentAndHistoryShown(
      platformLiveDocumentAndHistoryValue28,
      updatePlatformLiveDocumentAndHistoryValue2,
    );
  if (context === null) {
    delete filterPlatformLiveDocumentAndHistoryShown2[options];
  } else {
    filterPlatformLiveDocumentAndHistoryShown2[options] = context;
  }
  let record2: Dynamic =
    Object.keys(filterPlatformLiveDocumentAndHistoryShown2).length > 0
      ? {
          ...platformLiveDocumentAndHistoryValue283,
          [updatePlatformLiveDocumentAndHistoryValue2]:
            filterPlatformLiveDocumentAndHistoryShown2,
        }
      : platformLiveDocumentAndHistoryValue283;
  let recordKeys = Object.keys(record2);
  for (let updatePlatformLiveDocumentAndHistoryValueResult of recordKeys.slice(
    0,
    Math.max(0, recordKeys.length - platformLiveDocumentAndHistoryValue50),
  ) as Dynamic)
    delete record2[updatePlatformLiveDocumentAndHistoryValueResult];
  PlatformLiveDocumentAndHistoryState2.getState().set(record2);
}

var resolvePlatformLiveDocumentAndHistoryGet: Dynamic;

var resolvePlatformLiveDocumentAndHistoryShown: Dynamic;

var resolvePlatformLiveDocumentAndHistoryDrew: Dynamic;

var resolvePlatformLiveDocumentAndHistoryGet2: Dynamic;

var resolvePlatformLiveDocumentAndHistoryKind2: (entry?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolvePlatformLiveDocumentAndHistoryHome: (platformLiveDocumentAndHistoryHome?: Dynamic, ..._extraArguments: unknown[]) => undefined;

var resolvePlatformLiveDocumentAndHistoryKind3: Dynamic;

var resolvePlatformLiveDocumentAndHistoryDeny: (response?: Dynamic, ..._extraArguments: unknown[]) => undefined;

var loadPlatformLiveDocumentAndHistoryContainer2: (platformLiveDocumentAndHistoryContainer2?: Dynamic, reviewedParams?: Dynamic, connectorIdentity?: Dynamic, declaredParams?: Dynamic, ..._extraArguments: unknown[]) => Promise<undefined>;

var loadPlatformLiveDocumentAndHistoryVerb: (platformLiveDocumentAndHistoryVerb?: Dynamic, ..._extraArguments: unknown[]) => Promise<undefined>;

var platformLiveDocumentAndHistoryPattern13: RegExp;

function resolvePlatformLiveDocumentAndHistoryKind4(
  platformLiveDocumentAndHistoryKind4?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (platformLiveDocumentAndHistoryKind4 === null) return null;
  let match = platformLiveDocumentAndHistoryPattern13.exec(
    platformLiveDocumentAndHistoryKind4,
  );
  return match === null
    ? null
    : {
        kind: match[1],
        ref: match[2],
      };
}

function collectPlatformLiveDocumentAndHistoryKind(
  entry?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return `${entry.kind}/${entry.ref
    .split(`/`)
    .map((refPart?: Dynamic, ..._extraArguments: unknown[]) =>
      encodeURIComponent(refPart),
    )
    .join(`/`)}`;
}

var platformLiveDocumentAndHistoryValue15000: number;

var PlatformLiveDocumentAndHistoryTIMEOUT: Dynamic;

var PlatformLiveDocumentAndHistoryDENIED: Dynamic;

var PlatformLiveDocumentAndHistoryForbidden: string;

function resolvePlatformLiveDocumentAndHistoryWritable(
  platformLiveDocumentAndHistoryWritable?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    platformLiveDocumentAndHistoryWritable === undefined ||
    platformLiveDocumentAndHistoryWritable.writable
  );
}

function resolvePlatformLiveDocumentAndHistoryLocal(
  platformLiveDocumentAndHistoryLocal?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (
    !resolvePlatformLiveDocumentAndHistoryWritable(
      platformLiveDocumentAndHistoryLocal.lane,
    )
  )
    throw new (PlatformLiveDocumentAndHistoryDENIED as Dynamic)(
      options,
      PlatformLiveDocumentAndHistoryForbidden,
      undefined,
      {
        local: true,
      },
    );
}

var PlatformLiveDocumentAndHistoryMALFORMED: Dynamic;

var resolvePlatformLiveDocumentAndHistoryValue30: Dynamic;

var PlatformLiveDocumentAndHistoryRoom: string;

var PlatformLiveDocumentAndHistoryCurrent: string;

function resolvePlatformLiveDocumentAndHistoryParams(
  platformLiveDocumentAndHistoryParams?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let cause: Dynamic = resolvePlatformLiveDocumentAndHistoryValue30(
    platformLiveDocumentAndHistoryParams.params,
  )
    ? platformLiveDocumentAndHistoryParams.params.cause
    : undefined;
  return typeof cause == `string` && cause.length > 0 ? cause : null;
}

var platformLiveDocumentAndHistoryPattern14: RegExp;

var resolvePlatformLiveDocumentAndHistoryBoundary: Dynamic;

var resolvePlatformLiveDocumentAndHistoryPrincipal: Dynamic;

function resolvePlatformLiveDocumentAndHistoryPrincipal2(
  event?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    !resolvePlatformLiveDocumentAndHistoryValue30(event) ||
    typeof event.seq != `number` ||
    typeof event.at != `string`
  )
    return;
  let actor: Dynamic = resolvePlatformLiveDocumentAndHistoryPrincipal(
    event.actor,
  ) ?? {
    principal: PlatformLiveDocumentAndHistoryRoom,
    channel: `internal`,
  };
  let contributors: Dynamic = Array.isArray(event.contributors)
    ? event.contributors.flatMap(
        (contributor?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          let actor2: Dynamic = resolvePlatformLiveDocumentAndHistoryPrincipal(
            resolvePlatformLiveDocumentAndHistoryValue30(contributor) &&
              `actor` in contributor
              ? contributor.actor
              : contributor,
          );
          return actor2
            ? [
                {
                  actor: actor2,
                },
              ]
            : [];
        },
      )
    : [];
  let checkpoint: Dynamic = resolvePlatformLiveDocumentAndHistoryBoundary(
    event.checkpoint,
  );
  return {
    seq: event.seq,
    ...(checkpoint
      ? {
          checkpoint: checkpoint,
        }
      : {}),
    ...(typeof event.headSeq == `number`
      ? {
          headSeq: event.headSeq,
        }
      : {}),
    ...(typeof event.rev == `number`
      ? {
          rev: event.rev,
        }
      : {}),
    ...(typeof event.baseRev == `number`
      ? {
          baseRev: event.baseRev,
        }
      : {}),
    ...(typeof event.restoredFrom == `number`
      ? {
          restoredFrom: event.restoredFrom,
        }
      : {}),
    ...(typeof event.cause == `string` &&
    platformLiveDocumentAndHistoryPattern14.test(event.cause)
      ? {
          cause: event.cause,
        }
      : {}),
    at: event.at,
    ...(typeof event.key == `string`
      ? {
          key: event.key,
        }
      : {}),
    actor: actor,
    contributors: contributors,
  };
}

function resolvePlatformLiveDocumentAndHistoryUser(
  actor?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return actor.principal === PlatformLiveDocumentAndHistoryRoom
    ? {
        user: PlatformLiveDocumentAndHistoryRoom,
        actor: PlatformLiveDocumentAndHistoryRoom,
      }
    : actor.channel === `human` || resolveDataModelSchemasFrame(actor.via)
      ? {
          user: actor.principal,
          actor: actor.principal,
        }
      : {
          user: actor.principal,
          actor: `agent:unknown`,
        };
}

function collectPlatformLiveDocumentAndHistoryOriginalId(
  collectPlatformLiveDocumentAndHistoryOriginalId2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let container = `project/${collectPlatformLiveDocumentAndHistoryOriginalId2}`;
  return context.map(
    (event?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      let platformLiveDocumentAndHistoryUser: Dynamic =
        resolvePlatformLiveDocumentAndHistoryUser(event.actor);
      let originalId = `v3:${collectPlatformLiveDocumentAndHistoryOriginalId2}:${event.seq}`;
      return {
        id: originalId,
        originalId: originalId,
        v: 1,
        parentId: null,
        container: container,
        versionId: null,
        user: platformLiveDocumentAndHistoryUser.user,
        actor: platformLiveDocumentAndHistoryUser.actor,
        tool: `v3.checkpoint`,
        ns: `v3`,
        params: {
          key: event.key ?? `node/${options}`,
          upto: event.seq,
          ...(event.headSeq === undefined
            ? {}
            : {
                headSeq: event.headSeq,
              }),
          ...(event.rev === undefined
            ? {}
            : {
                rev: event.rev,
              }),
          ...(event.baseRev === undefined
            ? {}
            : {
                baseRev: event.baseRev,
              }),
          ...(event.restoredFrom === undefined
            ? {}
            : {
                restoredFrom: event.restoredFrom,
              }),
          ...(event.checkpoint === undefined
            ? {}
            : {
                checkpoint: event.checkpoint,
              }),
          ...(event.cause === undefined
            ? {}
            : {
                cause: event.cause,
              }),
          contributors: event.contributors.map(
            (contributor?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              resolvePlatformLiveDocumentAndHistoryUser(contributor.actor),
          ),
        },
        paramHash: ``,
        status: `done`,
        at: event.at,
        startedAt: null,
        endedAt: null,
        result: null,
        artifacts: null,
        anchor: null,
        meta: {},
      };
    },
  );
}

var resolvePlatformLiveDocumentAndHistoryParams2: Dynamic;

function resolvePlatformLiveDocumentAndHistorySchedule(
  scheduler?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return new (Promise as Dynamic)(
    (
      resolve?: Dynamic,
      reject?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let enabled = false;
      let schedule: Dynamic = scheduler.schedule(
        (..._extraArguments: unknown[]): undefined => {
          if (!enabled) {
            enabled = true;
            reject(
              new (PlatformLiveDocumentAndHistoryTIMEOUT as Dynamic)(options),
            );
          }
        },
        scheduler.timeoutMs ?? 15e3,
      );
      context.then(
        (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (!enabled) {
            enabled = true;
            schedule();
            resolve(result);
          }
        },
        (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (!enabled) {
            enabled = true;
            schedule();
            reject(result);
          }
        },
      );
    },
  );
}

var resolvePlatformLiveDocumentAndHistoryNode4: Dynamic;

function resolvePlatformLiveDocumentAndHistoryAllow(
  platformLiveDocumentAndHistoryAllow?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let response: Dynamic;
  try {
    response = ackOf(options);
  } catch {
    throw new (PlatformLiveDocumentAndHistoryMALFORMED as Dynamic)(
      platformLiveDocumentAndHistoryAllow,
    );
  }
  if (response.verdict !== `allow`)
    throw new (PlatformLiveDocumentAndHistoryDENIED as Dynamic)(
      platformLiveDocumentAndHistoryAllow,
      response.reason,
      response.data,
    );
  return resolvePlatformLiveDocumentAndHistoryValue30(options.body)
    ? options.body
    : {};
}

var platformLiveDocumentAndHistoryMap10: Dynamic;

var resolvePlatformLiveDocumentAndHistoryFileId: (page?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolvePlatformLiveDocumentAndHistoryContent: Dynamic;

async function loadPlatformLiveDocumentAndHistoryRef(
  platformLiveDocumentAndHistoryRef?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let platformLiveDocumentAndHistoryMap10Entry: Dynamic =
    platformLiveDocumentAndHistoryMap10.get(
      resolvePlatformLiveDocumentAndHistoryFileId(
        platformLiveDocumentAndHistoryRef,
      ),
    );
  if (platformLiveDocumentAndHistoryMap10Entry !== undefined)
    return platformLiveDocumentAndHistoryMap10Entry;
  let platformLiveDocumentAndHistoryContent: Dynamic =
    platformLiveDocumentAndHistoryRef.lane
      ? resolvePlatformLiveDocumentAndHistoryContent(
          platformLiveDocumentAndHistoryRef.lane.read({
            object: `file`,
            id: platformLiveDocumentAndHistoryRef.fileId,
          }),
        )
      : undefined;
  if (platformLiveDocumentAndHistoryContent !== undefined) {
    platformLiveDocumentAndHistoryMap10.set(
      resolvePlatformLiveDocumentAndHistoryFileId(
        platformLiveDocumentAndHistoryRef,
      ),
      platformLiveDocumentAndHistoryContent,
    );
    return platformLiveDocumentAndHistoryContent;
  }
  let platformLiveDocumentAndHistoryContent2: Dynamic =
    resolvePlatformLiveDocumentAndHistoryContent(
      resolvePlatformLiveDocumentAndHistoryAllow(
        `file`,
        await resolvePlatformLiveDocumentAndHistorySchedule(
          platformLiveDocumentAndHistoryRef,
          `file`,
          platformLiveDocumentAndHistoryRef.door.call(`read`, {
            ref: {
              object: `file`,
              id: platformLiveDocumentAndHistoryRef.fileId,
            },
            engine: `json`,
            payload: {
              engine: `json`,
            },
          }),
        ),
      ).value,
    );
  if (platformLiveDocumentAndHistoryContent2 === undefined)
    throw new (PlatformLiveDocumentAndHistoryMALFORMED as Dynamic)(
      `file has no prose node`,
    );
  platformLiveDocumentAndHistoryMap10.set(
    resolvePlatformLiveDocumentAndHistoryFileId(
      platformLiveDocumentAndHistoryRef,
    ),
    platformLiveDocumentAndHistoryContent2,
  );
  return platformLiveDocumentAndHistoryContent2;
}

var getPlatformLiveDocumentAndHistoryValue2: Dynamic;

function getPlatformLiveDocumentAndHistoryFile(
  platformLiveDocumentAndHistoryFile?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    platformLiveDocumentAndHistoryMap10.get(
      resolvePlatformLiveDocumentAndHistoryFileId(
        platformLiveDocumentAndHistoryFile,
      ),
    ) ??
    (platformLiveDocumentAndHistoryFile.lane
      ? resolvePlatformLiveDocumentAndHistoryContent(
          platformLiveDocumentAndHistoryFile.lane.read({
            object: `file`,
            id: platformLiveDocumentAndHistoryFile.fileId,
          }),
        )
      : undefined)
  );
}

function resolvePlatformLiveDocumentAndHistoryNode5(
  platformLiveDocumentAndHistoryNode5?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let platformLiveDocumentAndHistoryFile: Dynamic =
    getPlatformLiveDocumentAndHistoryFile(platformLiveDocumentAndHistoryNode5);
  if (
    platformLiveDocumentAndHistoryFile === undefined ||
    !platformLiveDocumentAndHistoryNode5.lane
  )
    return;
  let record2: Dynamic = platformLiveDocumentAndHistoryNode5.lane.read({
    object: `node`,
    id: platformLiveDocumentAndHistoryFile,
  });
  if (!(typeof record2 != `object` || !record2))
    return [record2.rev, record2.view?.rev].find(
      (item?: unknown, ..._extraArguments: unknown[]) =>
        typeof item == `number`,
    );
}

async function loadPlatformLiveDocumentAndHistoryRef2(
  platformLiveDocumentAndHistoryRef2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let platformLiveDocumentAndHistoryAllow: Dynamic =
    resolvePlatformLiveDocumentAndHistoryAllow(
      `head`,
      await resolvePlatformLiveDocumentAndHistorySchedule(
        platformLiveDocumentAndHistoryRef2,
        `head`,
        platformLiveDocumentAndHistoryRef2.door.call(`read`, {
          ref: resolvePlatformLiveDocumentAndHistoryNode4(options),
          payload: {
            kind: `view`,
          },
        }),
      ),
    );
  let data: Dynamic = resolvePlatformLiveDocumentAndHistoryValue30(
    platformLiveDocumentAndHistoryAllow.data,
  )
    ? platformLiveDocumentAndHistoryAllow.data
    : {};
  let item = [platformLiveDocumentAndHistoryAllow.rev, data.rev].find(
    (item2?: unknown, ..._extraArguments: unknown[]) =>
      typeof item2 == `number`,
  );
  if (item === undefined)
    throw new (PlatformLiveDocumentAndHistoryMALFORMED as Dynamic)(`head rev`);
  return item;
}

function resolvePlatformLiveDocumentAndHistoryExpected(
  platformLiveDocumentAndHistoryExpected?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (
    !resolvePlatformLiveDocumentAndHistoryValue30(
      platformLiveDocumentAndHistoryExpected,
    )
  )
    return;
  let expected: Dynamic = resolvePlatformLiveDocumentAndHistoryValue30(
    platformLiveDocumentAndHistoryExpected.expected,
  )
    ? platformLiveDocumentAndHistoryExpected.expected
    : undefined;
  return [
    platformLiveDocumentAndHistoryExpected.rev,
    platformLiveDocumentAndHistoryExpected.latest,
    expected?.latest,
  ].find(
    (item?: unknown, ..._extraArguments: unknown[]) => typeof item == `number`,
  );
}

async function loadPlatformLiveDocumentAndHistoryKind(
  page?: Dynamic,
  options: Dynamic = {},
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  resolvePlatformLiveDocumentAndHistoryLocal(page, `history`);
  let platformLiveDocumentAndHistoryRef: Dynamic =
    await loadPlatformLiveDocumentAndHistoryRef(page);
  let payload: Dynamic = {
    kind: `history`,
    limit: Math.max(1, Math.min(200, options.limit ?? 200)),
  };
  if (options.before !== undefined) {
    payload.before = options.before;
  }
  let platformLiveDocumentAndHistoryAllow: Dynamic =
    resolvePlatformLiveDocumentAndHistoryAllow(
      `history`,
      await resolvePlatformLiveDocumentAndHistorySchedule(
        page,
        `history`,
        page.door.call(`read`, {
          ref: resolvePlatformLiveDocumentAndHistoryNode4(
            platformLiveDocumentAndHistoryRef,
          ),
          payload: payload,
        }),
      ),
    );
  if (!Array.isArray(platformLiveDocumentAndHistoryAllow.rows))
    throw new (PlatformLiveDocumentAndHistoryMALFORMED as Dynamic)(
      `history rows`,
    );
  let flatMap: Dynamic = platformLiveDocumentAndHistoryAllow.rows.flatMap(
    (row?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      let platformLiveDocumentAndHistoryPrincipal2: Dynamic =
        resolvePlatformLiveDocumentAndHistoryPrincipal2(row);
      return platformLiveDocumentAndHistoryPrincipal2
        ? [platformLiveDocumentAndHistoryPrincipal2]
        : [];
    },
  );
  let truncated: boolean =
    platformLiveDocumentAndHistoryAllow.truncated === true;
  return {
    actions: collectPlatformLiveDocumentAndHistoryOriginalId(
      page.pid,
      platformLiveDocumentAndHistoryRef,
      flatMap,
    ),
    truncated: truncated,
  };
}

async function loadPlatformLiveDocumentAndHistoryRef3(
  platformLiveDocumentAndHistoryRef3?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  resolvePlatformLiveDocumentAndHistoryLocal(
    platformLiveDocumentAndHistoryRef3,
    `view`,
  );
  let platformLiveDocumentAndHistoryRef: Dynamic =
    await loadPlatformLiveDocumentAndHistoryRef(
      platformLiveDocumentAndHistoryRef3,
    );
  let resolvePlatformLiveDocumentAndHistoryValue302: Dynamic = async (
    atRev?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<Dynamic> => {
    let platformLiveDocumentAndHistoryAllow: Dynamic =
      resolvePlatformLiveDocumentAndHistoryAllow(
        `view`,
        await resolvePlatformLiveDocumentAndHistorySchedule(
          platformLiveDocumentAndHistoryRef3,
          `view@${atRev}`,
          platformLiveDocumentAndHistoryRef3.door.call(`read`, {
            ref: resolvePlatformLiveDocumentAndHistoryNode4(
              platformLiveDocumentAndHistoryRef,
            ),
            payload: {
              kind: `view`,
              atRev: atRev,
              face: `html`,
            },
          }),
        ),
      );
    let data: Dynamic = resolvePlatformLiveDocumentAndHistoryValue30(
      platformLiveDocumentAndHistoryAllow.data,
    )
      ? platformLiveDocumentAndHistoryAllow.data
      : undefined;
    if (data === undefined || typeof data.html != `string`)
      throw new (PlatformLiveDocumentAndHistoryMALFORMED as Dynamic)(
        `view html`,
      );
    return {
      html: data.html,
      ...(typeof data.latest == `number`
        ? {
            latest: data.latest,
          }
        : {}),
    };
  };
  let [all, setAll]: Dynamic = await Promise.all([
    resolvePlatformLiveDocumentAndHistoryValue302(options.rev),
    options.prevRev === undefined
      ? Promise.resolve(null)
      : resolvePlatformLiveDocumentAndHistoryValue302(options.prevRev),
  ]);
  return {
    html: all.html,
    prevHtml: setAll === null ? null : setAll.html,
    ...(all.latest === undefined
      ? {}
      : {
          latest: all.latest,
        }),
  };
}

function resolvePlatformLiveDocumentAndHistoryRef(
  platformLiveDocumentAndHistoryRef?: Dynamic,
  rev?: Dynamic,
  ifRev?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    ref: resolvePlatformLiveDocumentAndHistoryNode4(
      platformLiveDocumentAndHistoryRef,
    ),
    engine: `prose`,
    payload: {
      engine: `prose`,
      ops: [
        {
          op: `restore`,
          rev: rev,
          allowDetach: true,
        },
      ],
      ifRev: ifRev,
    },
  };
}

async function loadPlatformLiveDocumentAndHistoryRev(
  platformLiveDocumentAndHistoryRev?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  resolvePlatformLiveDocumentAndHistoryLocal(
    platformLiveDocumentAndHistoryRev,
    `restore`,
  );
  let platformLiveDocumentAndHistoryRef: Dynamic =
    await loadPlatformLiveDocumentAndHistoryRef(
      platformLiveDocumentAndHistoryRev,
    );
  let ifRev: Dynamic =
    options.ifRev ??
    (await loadPlatformLiveDocumentAndHistoryRef2(
      platformLiveDocumentAndHistoryRev,
      platformLiveDocumentAndHistoryRef,
    ));
  let withBusyRetry2: Dynamic = withBusyRetry(
    platformLiveDocumentAndHistoryRev.door,
  );
  let resolvePlatformLiveDocumentAndHistoryAllow2: Dynamic = async (
    platformLiveDocumentAndHistoryRev2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<Dynamic> => {
    let platformLiveDocumentAndHistoryAllow: Dynamic =
      resolvePlatformLiveDocumentAndHistoryAllow(
        `restore`,
        await resolvePlatformLiveDocumentAndHistorySchedule(
          platformLiveDocumentAndHistoryRev,
          `restore`,
          withBusyRetry2.call(
            `update`,
            resolvePlatformLiveDocumentAndHistoryRef(
              platformLiveDocumentAndHistoryRef,
              options.rev,
              platformLiveDocumentAndHistoryRev2,
            ),
          ),
        ),
      );
    return {
      rev:
        typeof platformLiveDocumentAndHistoryAllow.rev == `number`
          ? platformLiveDocumentAndHistoryAllow.rev
          : undefined,
      changed: platformLiveDocumentAndHistoryAllow.changed !== false,
    };
  };
  try {
    return await resolvePlatformLiveDocumentAndHistoryAllow2(ifRev);
  } catch (loadPlatformLiveDocumentAndHistoryRevResult: Dynamic) {
    if (
      !(
        loadPlatformLiveDocumentAndHistoryRevResult instanceof
        (PlatformLiveDocumentAndHistoryDENIED as Dynamic)
      ) ||
      loadPlatformLiveDocumentAndHistoryRevResult.reason !== `guard_mismatch`
    )
      throw loadPlatformLiveDocumentAndHistoryRevResult;
    let platformLiveDocumentAndHistoryExpected =
      resolvePlatformLiveDocumentAndHistoryExpected(
        loadPlatformLiveDocumentAndHistoryRevResult.data,
      );
    if (
      platformLiveDocumentAndHistoryExpected === undefined ||
      platformLiveDocumentAndHistoryExpected === ifRev
    )
      throw loadPlatformLiveDocumentAndHistoryRevResult;
    return await resolvePlatformLiveDocumentAndHistoryAllow2(
      platformLiveDocumentAndHistoryExpected,
    );
  }
}

var platformLiveDocumentAndHistoryPattern15: RegExp;

var platformLiveDocumentAndHistoryMap11: Dynamic;

var platformLiveDocumentAndHistoryValue07: number;

var isPlatformLiveDocumentAndHistoryFilter: Dynamic;

function isPlatformLiveDocumentAndHistoryCurrent(
  platformLiveDocumentAndHistoryCurrent?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let platformLiveDocumentAndHistoryParams2: Dynamic =
    resolvePlatformLiveDocumentAndHistoryParams2(
      platformLiveDocumentAndHistoryCurrent,
    );
  if (platformLiveDocumentAndHistoryParams2 === undefined) return false;
  for (let isPlatformLiveDocumentAndHistoryCurrentResult of options as Dynamic) {
    if (
      resolvePlatformLiveDocumentAndHistoryParams(
        isPlatformLiveDocumentAndHistoryCurrentResult,
      ) === `current`
    )
      return false;
    let platformLiveDocumentAndHistoryParams22: Dynamic =
      resolvePlatformLiveDocumentAndHistoryParams2(
        isPlatformLiveDocumentAndHistoryCurrentResult,
      );
    if (
      platformLiveDocumentAndHistoryParams22 === undefined ||
      platformLiveDocumentAndHistoryParams22 >=
        platformLiveDocumentAndHistoryParams2
    )
      return false;
  }
  return true;
}

function filterPlatformLiveDocumentAndHistoryCurrent(
  filterPlatformLiveDocumentAndHistoryCurrent2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let filterPlatformLiveDocumentAndHistoryCurrentResult: Dynamic;
  for (let filterPlatformLiveDocumentAndHistoryCurrentResult2 of filterPlatformLiveDocumentAndHistoryCurrent2 as Dynamic)
    if (
      resolvePlatformLiveDocumentAndHistoryParams(
        filterPlatformLiveDocumentAndHistoryCurrentResult2,
      ) === `current` &&
      (filterPlatformLiveDocumentAndHistoryCurrentResult === undefined ||
        (resolvePlatformLiveDocumentAndHistoryParams2(
          filterPlatformLiveDocumentAndHistoryCurrentResult2,
        ) ?? -1) >
          (resolvePlatformLiveDocumentAndHistoryParams2(
            filterPlatformLiveDocumentAndHistoryCurrentResult,
          ) ?? -1))
    ) {
      filterPlatformLiveDocumentAndHistoryCurrentResult =
        filterPlatformLiveDocumentAndHistoryCurrentResult2;
    }
  if (
    filterPlatformLiveDocumentAndHistoryCurrentResult !== undefined &&
    !isPlatformLiveDocumentAndHistoryCurrent(
      filterPlatformLiveDocumentAndHistoryCurrentResult,
      options,
    )
  ) {
    filterPlatformLiveDocumentAndHistoryCurrentResult = undefined;
  }
  return filterPlatformLiveDocumentAndHistoryCurrent2.filter(
    (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
      resolvePlatformLiveDocumentAndHistoryParams(rolldownNImport2) !==
        `current` ||
      rolldownNImport2 === filterPlatformLiveDocumentAndHistoryCurrentResult,
  );
}

var platformLiveDocumentAndHistoryMap12: Dynamic;

var platformLiveDocumentAndHistoryMap13: Dynamic;

var platformLiveDocumentAndHistoryMap14: Dynamic;

var platformLiveDocumentAndHistorySet19: Dynamic;

var resolvePlatformLiveDocumentAndHistoryVersion: Dynamic;

function resolvePlatformLiveDocumentAndHistoryOldest(
  platformLiveDocumentAndHistoryOldest?: Dynamic,
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (items.length === 0)
    return {
      oldest: platformLiveDocumentAndHistoryOldest?.oldest ?? ``,
      full: false,
    };
  let at2: Dynamic = items[0].at;
  for (let activity of items as Dynamic)
    if (activity.at < at2) {
      at2 = activity.at;
    }
  let matchesPlatformLiveDocumentAndHistoryOldest =
    platformLiveDocumentAndHistoryOldest === undefined ||
    at2 < platformLiveDocumentAndHistoryOldest.oldest;
  return {
    oldest:
      platformLiveDocumentAndHistoryOldest !== undefined &&
      platformLiveDocumentAndHistoryOldest.oldest < at2
        ? platformLiveDocumentAndHistoryOldest.oldest
        : at2,
    full: items.length >= 200 && matchesPlatformLiveDocumentAndHistoryOldest,
  };
}

var resolvePlatformLiveDocumentAndHistorySome: Dynamic;

async function loadPlatformLiveDocumentAndHistoryCtr(
  { ctr: ctr, version: version, path: path, pageId: pageId }: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let replace: Dynamic = ctr.replace(/@[^@]*$/, ``);
  let label = path ? `${replace}/versions/${version}/${path}` : null;
  let [all, setAll]: Dynamic = await Promise.all([
    label
      ? api.pageAliases(label).catch(
          (..._extraArguments: unknown[]): Dynamic => ({
            paths: [path],
          }),
        )
      : Promise.resolve({
          paths: [],
        }),
    path
      ? api.actions.list({
          container: ctr,
          tool: `file:rename`,
          limit: 200,
        })
      : Promise.resolve([]),
  ]);
  let uniqueItems: Dynamic = new (Set as Dynamic)(all.paths);
  if (path) {
    uniqueItems.add(path);
  }
  let path2: Dynamic = path;
  for (let index = 0; path2 && index < 8; index++) {
    let from: Dynamic = setAll
      .filter((setAll2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        let params: Dynamic = setAll2.params;
        return (
          params.to === path2 && params.from && !uniqueItems.has(params.from)
        );
      })
      .toSorted(
        (
          activity?: Dynamic,
          activity2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => activity2.at.localeCompare(activity.at),
      )[0]?.params?.from;
    if (!from) break;
    uniqueItems.add(from);
    path2 = from;
  }
  let items: Dynamic = [
    ...[...uniqueItems].map(
      (anchor?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
        key: `path:${anchor}`,
        run: (before?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          api.actions.list({
            container: ctr,
            anchor: anchor,
            ns: `file`,
            tool: `file:write,file:delete`,
            limit: 200,
            ...(before
              ? {
                  before: before,
                }
              : {}),
          }),
      }),
    ),
    ...(pageId && path && platformLiveDocumentAndHistoryPattern15.test(path)
      ? [
          {
            key: `ckpt`,
            run: (before?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              api.actions.list({
                container: ctr,
                anchor: `f-${pageId}`,
                tool: `lfile.checkpoint`,
                limit: 200,
                ...(before
                  ? {
                      before: before,
                    }
                  : {}),
              }),
          },
        ]
      : []),
  ];
  let filteredItems: Dynamic = options
    ? items.filter(
        (event?: Dynamic, ..._extraArguments: unknown[]) =>
          options.get(event.key)?.full !== false,
      )
    : items;
  let toISOString: Dynamic = (
    platformLiveDocumentAndHistoryCtr?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    platformLiveDocumentAndHistoryCtr === undefined
      ? undefined
      : new Date(
          Date.parse(platformLiveDocumentAndHistoryCtr.oldest) + 1,
        ).toISOString();
  let all2: Dynamic = await Promise.all(
    filteredItems.map(
      async (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): Promise<Dynamic> => ({
        key: event.key,
        rows: await event.run(toISOString(options?.get(event.key))),
      }),
    ),
  );
  let states: Dynamic = new (Map as Dynamic)(options ?? []);
  let uniqueItems2: Dynamic = new (Set as Dynamic)();
  let rows: Dynamic = [];
  for (let event of all2 as Dynamic) {
    states.set(
      event.key,
      resolvePlatformLiveDocumentAndHistoryOldest(
        options?.get(event.key),
        event.rows,
      ),
    );
    for (let loadPlatformLiveDocumentAndHistoryCtrResult of event.rows as Dynamic)
      if (!uniqueItems2.has(loadPlatformLiveDocumentAndHistoryCtrResult.id)) {
        uniqueItems2.add(loadPlatformLiveDocumentAndHistoryCtrResult.id);
        rows.push(loadPlatformLiveDocumentAndHistoryCtrResult);
      }
  }
  return {
    rows: rows,
    states: states,
  };
}

function resolvePlatformLiveDocumentAndHistoryTool(
  platformLiveDocumentAndHistory?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let resolvePlatformLiveDocumentAndHistoryToolResult: Dynamic;
  for (let resolvePlatformLiveDocumentAndHistoryToolResult2 of platformLiveDocumentAndHistory as Dynamic) {
    if (
      resolvePlatformLiveDocumentAndHistoryToolResult2.tool !== `v3.checkpoint`
    )
      continue;
    let upto: Dynamic =
      resolvePlatformLiveDocumentAndHistoryToolResult2.params.upto;
    if (
      typeof upto == `number` &&
      (resolvePlatformLiveDocumentAndHistoryToolResult === undefined ||
        upto < resolvePlatformLiveDocumentAndHistoryToolResult)
    ) {
      resolvePlatformLiveDocumentAndHistoryToolResult = upto;
    }
  }
  return resolvePlatformLiveDocumentAndHistoryToolResult;
}

var PlatformLiveDocumentAndHistoryEntries2: Dynamic;

var resolvePlatformLiveDocumentAndHistoryPid2: Dynamic;

var platformLiveDocumentAndHistoryMap15: Dynamic;

function updatePlatformLiveDocumentAndHistoryFinally(
  updatePlatformLiveDocumentAndHistoryFinally3?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let platformLiveDocumentAndHistoryMap15Entry: Dynamic =
    platformLiveDocumentAndHistoryMap15.get(
      updatePlatformLiveDocumentAndHistoryFinally3,
    );
  if (platformLiveDocumentAndHistoryMap15Entry !== undefined)
    return platformLiveDocumentAndHistoryMap15Entry;
  let result: Dynamic = options().finally(
    (..._extraArguments: unknown[]): undefined => {
      if (
        platformLiveDocumentAndHistoryMap15.get(
          updatePlatformLiveDocumentAndHistoryFinally3,
        ) === result
      ) {
        platformLiveDocumentAndHistoryMap15.delete(
          updatePlatformLiveDocumentAndHistoryFinally3,
        );
      }
    },
  );
  platformLiveDocumentAndHistoryMap15.set(
    updatePlatformLiveDocumentAndHistoryFinally3,
    result,
  );
  return result;
}

function updatePlatformLiveDocumentAndHistoryFinally2(
  updatePlatformLiveDocumentAndHistoryFinally22?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let result: Dynamic = options().finally(
    (..._extraArguments: unknown[]): undefined => {
      if (
        platformLiveDocumentAndHistoryMap15.get(
          updatePlatformLiveDocumentAndHistoryFinally22,
        ) === result
      ) {
        platformLiveDocumentAndHistoryMap15.delete(
          updatePlatformLiveDocumentAndHistoryFinally22,
        );
      }
    },
  );
  platformLiveDocumentAndHistoryMap15.set(
    updatePlatformLiveDocumentAndHistoryFinally22,
    result,
  );
  return result;
}

var platformLiveDocumentAndHistorySet20: Dynamic;

function resolvePlatformLiveDocumentAndHistoryValue31(
  platformLiveDocumentAndHistoryValue31?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  platformLiveDocumentAndHistorySet20.add(
    resolvePlatformLiveDocumentAndHistoryFileId3(
      platformLiveDocumentAndHistoryValue31,
    ),
  );
}

var resolvePlatformLiveDocumentAndHistoryFileId2: (page?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => string;

function clearPlatformLiveDocumentAndHistoryDelete3(
  clearPlatformLiveDocumentAndHistoryDelete32?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  platformLiveDocumentAndHistoryMap15.delete(
    resolvePlatformLiveDocumentAndHistoryFileId2(
      clearPlatformLiveDocumentAndHistoryDelete32,
    ),
  );
}

async function loadPlatformLiveDocumentAndHistoryRows(
  page?: Dynamic,
  options: Dynamic = {},
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  if (inFrame()) {
    let matchesBefore: Dynamic =
      options.before === undefined &&
      platformLiveDocumentAndHistorySet20.delete(
        resolvePlatformLiveDocumentAndHistoryFileId3(page),
      );
    let loadPlatformLiveDocumentAndHistoryKind2: Dynamic = (
      ..._extraArguments: unknown[]
    ): Dynamic =>
      loadPlatformLiveDocumentAndHistoryKind(
        resolvePlatformLiveDocumentAndHistoryPid2(page),
        options,
      );
    let platformLiveDocumentAndHistoryFileId2 =
      resolvePlatformLiveDocumentAndHistoryFileId2(page, options.before);
    let updatePlatformLiveDocumentAndHistoryFinally22: Dynamic =
      await (matchesBefore
        ? updatePlatformLiveDocumentAndHistoryFinally2(
            platformLiveDocumentAndHistoryFileId2,
            loadPlatformLiveDocumentAndHistoryKind2,
          )
        : updatePlatformLiveDocumentAndHistoryFinally(
            platformLiveDocumentAndHistoryFileId2,
            loadPlatformLiveDocumentAndHistoryKind2,
          ));
    updatePlatformLiveDocumentAndHistoryReady(page);
    return {
      rows: updatePlatformLiveDocumentAndHistoryFinally22.actions,
      more: updatePlatformLiveDocumentAndHistoryFinally22.truncated,
    };
  }
  let rows: Dynamic = await api.v3FileHistory(page.pid, page.fileId, options);
  return {
    rows: rows,
    more: rows.length >= 200,
  };
}

function resolvePlatformLiveDocumentAndHistoryValues2(
  platformLiveDocumentAndHistoryValues2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let label = `v3:${platformLiveDocumentAndHistoryValues2}:`;
  let platformLiveDocumentAndHistoryValue2: Dynamic =
    getPlatformLiveDocumentAndHistoryValue2(
      platformLiveDocumentAndHistoryValues2,
      options,
    );
  let label2 =
    platformLiveDocumentAndHistoryValue2 === undefined
      ? undefined
      : `node/${platformLiveDocumentAndHistoryValue2}`;
  let items: Dynamic = [];
  for (let resolvePlatformLiveDocumentAndHistoryValues2Result of Object.values(
    PlatformLiveDocumentAndHistoryEntries2.getState().entries,
  ) as Dynamic)
    if (Array.isArray(resolvePlatformLiveDocumentAndHistoryValues2Result))
      for (let resolvePlatformLiveDocumentAndHistoryValues2Result2 of resolvePlatformLiveDocumentAndHistoryValues2Result as Dynamic)
        if (
          resolvePlatformLiveDocumentAndHistoryValues2Result2.id.startsWith(
            label,
          ) &&
          (label2 === undefined ||
            resolvePlatformLiveDocumentAndHistoryValues2Result2.params.key ===
              label2)
        ) {
          items.push(resolvePlatformLiveDocumentAndHistoryValues2Result2);
        }
  return items;
}

var resolvePlatformLiveDocumentAndHistoryValue32: Dynamic;

var resolvePlatformLiveDocumentAndHistoryValue33: Dynamic;

function resolvePlatformLiveDocumentAndHistoryRev(
  platformLiveDocumentAndHistoryRev?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let platformLiveDocumentAndHistoryValues2: Dynamic =
    resolvePlatformLiveDocumentAndHistoryValues2(
      platformLiveDocumentAndHistoryRev,
      options,
    );
  let resolvePlatformLiveDocumentAndHistoryRevHandler: Dynamic = (
    platformLiveDocumentAndHistoryRev2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => platformLiveDocumentAndHistoryRev2.params.upto;
  let platformLiveDocumentAndHistoryValues22: Dynamic =
    platformLiveDocumentAndHistoryValues2.find(
      (
        platformLiveDocumentAndHistoryValues23?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        resolvePlatformLiveDocumentAndHistoryRevHandler(
          platformLiveDocumentAndHistoryValues23,
        ) === context,
    );
  if (platformLiveDocumentAndHistoryValues22 === undefined) return {};
  let prevRev: Dynamic = platformLiveDocumentAndHistoryValues22.params.baseRev;
  if (typeof prevRev == `number`)
    return {
      rev: resolvePlatformLiveDocumentAndHistoryParams2(
        platformLiveDocumentAndHistoryValues22,
      ),
      prevRev: prevRev,
    };
  let resolvePlatformLiveDocumentAndHistoryRevResult: Dynamic;
  for (let resolvePlatformLiveDocumentAndHistoryRevResult2 of platformLiveDocumentAndHistoryValues2 as Dynamic) {
    let platformLiveDocumentAndHistoryRevHandler: Dynamic =
      resolvePlatformLiveDocumentAndHistoryRevHandler(
        resolvePlatformLiveDocumentAndHistoryRevResult2,
      );
    if (
      !(
        typeof platformLiveDocumentAndHistoryRevHandler != `number` ||
        platformLiveDocumentAndHistoryRevHandler >= context
      )
    ) {
      if (
        resolvePlatformLiveDocumentAndHistoryRevResult === undefined ||
        platformLiveDocumentAndHistoryRevHandler >
          resolvePlatformLiveDocumentAndHistoryRevHandler(
            resolvePlatformLiveDocumentAndHistoryRevResult,
          )
      ) {
        resolvePlatformLiveDocumentAndHistoryRevResult =
          resolvePlatformLiveDocumentAndHistoryRevResult2;
      }
    }
  }
  return {
    rev: resolvePlatformLiveDocumentAndHistoryParams2(
      platformLiveDocumentAndHistoryValues22,
    ),
    ...(resolvePlatformLiveDocumentAndHistoryRevResult
      ? {
          prevRev: resolvePlatformLiveDocumentAndHistoryParams2(
            resolvePlatformLiveDocumentAndHistoryRevResult,
          ),
        }
      : {}),
  };
}

var PlatformLiveDocumentAndHistoryDETAILSUNAVAILABLE: Dynamic;

async function loadPlatformLiveDocumentAndHistoryHtml(
  pid?: Dynamic,
  fileId?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  if (!inFrame()) {
    let v3FileAt: Dynamic = await api.v3FileAt(pid, fileId, context);
    return {
      html: v3FileAt.html,
      prevHtml: v3FileAt.prevHtml,
    };
  }
  let { rev: rev, prevRev: prevRev }: Dynamic =
    dependencies ??
    resolvePlatformLiveDocumentAndHistoryRev(pid, fileId, context);
  if (rev === undefined)
    throw new (PlatformLiveDocumentAndHistoryDETAILSUNAVAILABLE as Dynamic)(
      `shown`,
    );
  return updatePlatformLiveDocumentAndHistoryFinally(
    `view ${pid}/${fileId} ${rev} ${prevRev ?? ``}`,
    (..._extraArguments: unknown[]): Dynamic =>
      loadPlatformLiveDocumentAndHistoryRef3(
        resolvePlatformLiveDocumentAndHistoryPid2({
          pid: pid,
          fileId: fileId,
        }),
        {
          rev: rev,
          prevRev: prevRev,
        },
      ),
  );
}

var PlatformLiveDocumentAndHistoryThisIsAlreadyTheCurrentVersion: string;

var platformLiveDocumentAndHistoryValue2500: number;

function resolvePlatformLiveDocumentAndHistoryRestored(
  platformLiveDocumentAndHistoryRestored?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let platformSyncAndRoutingValue23: Dynamic =
    resolvePlatformSyncAndRoutingValue23();
  if (platformSyncAndRoutingValue23 && options) {
    context.dropHead();
    clearPlatformLiveDocumentAndHistoryDelete3(
      platformLiveDocumentAndHistoryRestored,
    );
  }
  context.touch();
  if (!platformSyncAndRoutingValue23) {
    context.toast(`Restored`);
    return;
  }
  if (!options) {
    context.toast(PlatformLiveDocumentAndHistoryThisIsAlreadyTheCurrentVersion);
    return;
  }
  context.toast(`Restored`);
  context.later((..._extraArguments: unknown[]): undefined => {
    resolvePlatformLiveDocumentAndHistoryValue31(
      platformLiveDocumentAndHistoryRestored,
    );
    context.touch();
  }, platformLiveDocumentAndHistoryValue2500);
}

function isPlatformLiveDocumentAndHistoryChanged(
  page?: Dynamic,
  options?: Dynamic,
  context: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  return !resolvePlatformSyncAndRoutingValue23() ||
    !inFrame() ||
    !options.changed ||
    options.rev === undefined
    ? null
    : (context.catchUp ?? updatePlatformLiveDocumentAndHistoryRev)(
        resolvePlatformLiveDocumentAndHistoryValue24(page.pid, page.fileId),
        options.rev,
      ).catch((..._extraArguments: unknown[]) => null);
}

function isPlatformLiveDocumentAndHistoryHasFocus(
  document2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return !options ||
    !document2.hasFocus() ||
    (document2.activeElement !== null &&
      document2.activeElement !== document2.body)
    ? false
    : (options(), true);
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializePlatformLiveDocumentAndHistory3Step1(): void {
  (PlatformLiveDocumentAndHistoryDownloads = {
    downloads: frameDownloadsAvailable,
    drive: frameDriveRoad,
    doorExport: framePagesExportRoad,
    notion: frameNotionRoad,
  });
  (platformLiveDocumentAndHistoryValue4 = 4);
  (platformLiveDocumentAndHistoryValue8000 = 8e3);
  (platformLiveDocumentAndHistoryValue20002 = 2e3);
  (PlatformLiveDocumentAndHistorySetTimeout = {
    setTimeout: (
      platformLiveDocumentAndHistorySetTimeout?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) => setTimeout(platformLiveDocumentAndHistorySetTimeout, options),
    clearTimeout: (
      platformLiveDocumentAndHistorySetTimeout?: Dynamic,
      ..._extraArguments: unknown[]
    ) => clearTimeout(platformLiveDocumentAndHistorySetTimeout),
  });
  (resolvePlatformLiveDocumentAndHistoryRandom = (
    ..._extraArguments: unknown[]
  ) => Math.random());
  (PlatformLiveDocumentAndHistoryKind2 = Object.freeze({
    kind: `live`,
  }));
  (PlatformLiveDocumentAndHistoryNOSHELLORIGIN = `NO_SHELL_ORIGIN`);
  (platformLiveDocumentAndHistoryPattern12 = /^[A-Z_]{2,32}$/);
  (PlatformLiveDocumentAndHistoryNoShell = {
    no_shell: `capability_error`,
    lane_refused: `capability_denied`,
    shell_unanswered: `capability_error`,
    ws_never_opened: `network`,
    lane_never_opened: `capability_error`,
    ws_opened_then_lost: `transient`,
    door_unanswered: `timeout`,
    signed_out: `user_error`,
    unknown: `unknown`,
  });
  (PlatformLiveDocumentAndHistoryMessage3 = `Your network may be blocking the live connection (a VPN, proxy, or browser extension). Try another network or a private window.`);
  (PlatformLiveDocumentAndHistoryFacts = {
    facts: frameTransportFacts,
    sinceNavigationMs: frameSinceNavigationMs,
    online: frameNavigatorOnline,
    health: resolveObservabilityTelemetryBootGaveUp,
    say: emitTelemetryEvent,
  });
  (platformLiveDocumentAndHistoryValue06 = 0);
  (platformLiveDocumentAndHistoryValue_1 = false);
  (platformLiveDocumentAndHistoryDataSourcesValues = [`data-sources`]);
  (platformLiveDocumentAndHistoryModalModalRefValues = [`modal`, `modal-ref`]);
  (platformLiveDocumentAndHistoryValue50 = 50);
  (PlatformLiveDocumentAndHistoryState2 = updateDataModelSchemasValue(
    `tabsLeft.headings`,
    {},
  ));
  (resolvePlatformLiveDocumentAndHistoryValue27 = (
    platformLiveDocumentAndHistoryValue27?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof platformLiveDocumentAndHistoryValue27 == `object` &&
    !!platformLiveDocumentAndHistoryValue27 &&
    !Array.isArray(platformLiveDocumentAndHistoryValue27));
  (resolvePlatformLiveDocumentAndHistoryValue28 = (
    platformLiveDocumentAndHistoryValue28?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolvePlatformLiveDocumentAndHistoryValue27(
      platformLiveDocumentAndHistoryValue28,
    )
      ? platformLiveDocumentAndHistoryValue28
      : {});
  (filterPlatformLiveDocumentAndHistoryShown = (
    filterPlatformLiveDocumentAndHistoryShown2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let filterPlatformLiveDocumentAndHistoryShownItem: Dynamic =
      filterPlatformLiveDocumentAndHistoryShown2[options];
    if (
      !resolvePlatformLiveDocumentAndHistoryValue27(
        filterPlatformLiveDocumentAndHistoryShownItem,
      )
    )
      return {};
    let folded: Dynamic = Array.isArray(
      filterPlatformLiveDocumentAndHistoryShownItem.folded,
    )
      ? filterPlatformLiveDocumentAndHistoryShownItem.folded.filter(
          (folded2?: unknown, ..._extraArguments: unknown[]) =>
            typeof folded2 == `string`,
        )
      : [];
    return {
      ...(typeof filterPlatformLiveDocumentAndHistoryShownItem.shown ==
        `string` && {
        shown: filterPlatformLiveDocumentAndHistoryShownItem.shown,
      }),
      ...(typeof filterPlatformLiveDocumentAndHistoryShownItem.drew ==
        `string` && {
        drew: filterPlatformLiveDocumentAndHistoryShownItem.drew,
      }),
      ...(folded.length > 0 && {
        folded: folded,
      }),
    };
  });
  (resolvePlatformLiveDocumentAndHistoryValue29 = (
    platformLiveDocumentAndHistoryValue29?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    filterPlatformLiveDocumentAndHistoryShown(
      resolvePlatformLiveDocumentAndHistoryValue28(
        platformLiveDocumentAndHistoryValue29,
      ),
      options,
    )[context] ?? null);
  (resolvePlatformLiveDocumentAndHistoryFolded = (
    platformLiveDocumentAndHistoryFolded?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    filterPlatformLiveDocumentAndHistoryShown(
      resolvePlatformLiveDocumentAndHistoryValue28(
        platformLiveDocumentAndHistoryFolded,
      ),
      options,
    ).folded ?? []);
  (resolvePlatformLiveDocumentAndHistoryGet = (
    platformLiveDocumentAndHistoryGet?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let get2: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
      resolvePlatformLiveDocumentAndHistoryValue29(
        PlatformLiveDocumentAndHistoryState2.getState().value,
        platformLiveDocumentAndHistoryGet,
        options,
      );
    return {
      get: get2,
      set: (
        platformLiveDocumentAndHistoryGet2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (platformLiveDocumentAndHistoryGet2 !== get2()) {
          updatePlatformLiveDocumentAndHistoryValue(
            platformLiveDocumentAndHistoryGet,
            options,
            platformLiveDocumentAndHistoryGet2,
          );
        }
      },
      use: (..._extraArguments: unknown[]): Dynamic =>
        PlatformLiveDocumentAndHistoryState2(
          (
            platformLiveDocumentAndHistoryGet2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            resolvePlatformLiveDocumentAndHistoryValue29(
              platformLiveDocumentAndHistoryGet2.value,
              platformLiveDocumentAndHistoryGet,
              options,
            ),
        ),
    };
  });
  (resolvePlatformLiveDocumentAndHistoryShown = (
    platformLiveDocumentAndHistoryShown?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolvePlatformLiveDocumentAndHistoryGet(
      platformLiveDocumentAndHistoryShown,
      `shown`,
    ));
  (resolvePlatformLiveDocumentAndHistoryDrew = (
    platformLiveDocumentAndHistoryDrew?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolvePlatformLiveDocumentAndHistoryGet(
      platformLiveDocumentAndHistoryDrew,
      `drew`,
    ));
  (resolvePlatformLiveDocumentAndHistoryGet2 = (
    platformLiveDocumentAndHistoryGet2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    get: (..._extraArguments: unknown[]): Dynamic =>
      new (Set as Dynamic)(
        resolvePlatformLiveDocumentAndHistoryFolded(
          PlatformLiveDocumentAndHistoryState2.getState().value,
          platformLiveDocumentAndHistoryGet2,
        ),
      ),
    set: (
      platformLiveDocumentAndHistoryGet22?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      updatePlatformLiveDocumentAndHistoryValue(
        platformLiveDocumentAndHistoryGet2,
        `folded`,
        platformLiveDocumentAndHistoryGet22.size > 0
          ? [...platformLiveDocumentAndHistoryGet22]
          : null,
      ),
    use: (..._extraArguments: unknown[]): Dynamic => {
      let PlatformLiveDocumentAndHistoryState22: Dynamic =
        PlatformLiveDocumentAndHistoryState2(
          (
            platformLiveDocumentAndHistoryGet22?: Dynamic,
            ..._extraArguments: unknown[]
          ) =>
            JSON.stringify(
              resolvePlatformLiveDocumentAndHistoryFolded(
                platformLiveDocumentAndHistoryGet22.value,
                platformLiveDocumentAndHistoryGet2,
              ),
            ),
        );
      return (0, React.useMemo)(
        (..._extraArguments: unknown[]): Dynamic =>
          new (Set as Dynamic)(JSON.parse(PlatformLiveDocumentAndHistoryState22)),
        [PlatformLiveDocumentAndHistoryState22],
      );
    },
  }));
  (resolvePlatformLiveDocumentAndHistoryKind2 = (
    entry?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `${entry.kind}/${entry.id}`);
  (resolvePlatformLiveDocumentAndHistoryHome = (
    platformLiveDocumentAndHistoryHome?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      !platformLiveDocumentAndHistoryHome.home?.id ||
      !platformLiveDocumentAndHistoryHome.runId
    )
      throw Error(
        `This run has no v3 row id/home yet — the runs read flip hasn't landed here.`,
      );
  });
  (resolvePlatformLiveDocumentAndHistoryKind3 = (
    entry?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    collectPlatformApiAndAuthVerb(
      liveDoorAt(resolvePlatformLiveDocumentAndHistoryKind2(entry)),
      {
        kind: entry.kind,
        id: entry.id,
      },
    ));
  (resolvePlatformLiveDocumentAndHistoryDeny = (
    response?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (response.verdict === `deny`)
      throw Error(
        resolvePlatformSessionAndSourcesUnavailable(
          response.reason ?? `refused`,
          response.why,
        ),
      );
  });
  (loadPlatformLiveDocumentAndHistoryContainer2 = async (
    platformLiveDocumentAndHistoryContainer2?: Dynamic,
    reviewedParams?: Dynamic,
    connectorIdentity?: Dynamic,
    declaredParams?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<undefined> => {
    resolvePlatformLiveDocumentAndHistoryHome(
      platformLiveDocumentAndHistoryContainer2,
    );
    if (!/^[0-9a-f]{64}$/.test(reviewedParams))
      throw Error(
        `approveRun: reviewedParams must be the 64-hex sha-256 the review surface echoed.`,
      );
    if (
      connectorIdentity !== undefined &&
      !/^[0-9a-f]{64}$/.test(connectorIdentity)
    )
      throw Error(
        `approveRun: connectorIdentity must be the 64-hex sha-256 the staged-runs serve provided.`,
      );
    if (declaredParams !== undefined && !/^[0-9a-f]{64}$/.test(declaredParams))
      throw Error(
        `approveRun: declaredParams must be the 64-hex sha-256 the staged-runs serve provided.`,
      );
    resolvePlatformLiveDocumentAndHistoryDeny(
      ackOf(
        await liveDoorAt(
          resolvePlatformLiveDocumentAndHistoryKind2(
            platformLiveDocumentAndHistoryContainer2.home,
          ),
        ).call(`update`, {
          container: {
            kind: platformLiveDocumentAndHistoryContainer2.home.kind,
            id: platformLiveDocumentAndHistoryContainer2.home.id,
          },
          ref: {
            object: `run`,
            id: platformLiveDocumentAndHistoryContainer2.runId,
          },
          engine: `json`,
          payload: {
            kind: `patch`,
            patch: [
              {
                op: `set`,
                path: [`status`],
                value: `pending`,
              },
            ],
          },
          reviewedParams: reviewedParams,
          ...(connectorIdentity === undefined
            ? {}
            : {
                connectorIdentity: connectorIdentity,
              }),
          ...(declaredParams === undefined
            ? {}
            : {
                declaredParams: declaredParams,
              }),
        }),
      ),
    );
  });
  (loadPlatformLiveDocumentAndHistoryVerb = async (
    platformLiveDocumentAndHistoryVerb?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<undefined> => {
    resolvePlatformLiveDocumentAndHistoryHome(platformLiveDocumentAndHistoryVerb);
    resolvePlatformLiveDocumentAndHistoryDeny(
      await resolvePlatformLiveDocumentAndHistoryKind3(
        platformLiveDocumentAndHistoryVerb.home,
      )({
        verb: `delete`,
        ref: {
          object: `run`,
          id: platformLiveDocumentAndHistoryVerb.runId,
        },
      }),
    );
  });
  (platformLiveDocumentAndHistoryPattern13 = /^(routine|database)\/(.+)$/s);
  (platformLiveDocumentAndHistoryValue15000 = 15e3);
  (PlatformLiveDocumentAndHistoryTIMEOUT = class extends Error {
    [key: string]: Dynamic;
    code: Dynamic = `TIMEOUT`;
    constructor(
      platformLiveDocumentAndHistoryTIMEOUT?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      super(
        `version history: no answer (${platformLiveDocumentAndHistoryTIMEOUT})`,
      );
      this.name = `FrameHistoryTimeout`;
    }
  });
  (PlatformLiveDocumentAndHistoryDENIED = class extends Error {
    [key: string]: Dynamic;
    code: Dynamic = `DENIED`;
    reason: Dynamic;
    data: Dynamic;
    local: Dynamic;
    constructor(
      platformLiveDocumentAndHistoryDENIED?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      dependencies?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      super(
        `version history: ${platformLiveDocumentAndHistoryDENIED} refused (${options})`,
      );
      this.name = `FrameHistoryDenied`;
      this.reason = options;
      this.data = context;
      this.local = dependencies?.local === true;
    }
  });
  (PlatformLiveDocumentAndHistoryForbidden = `forbidden`);
  (PlatformLiveDocumentAndHistoryMALFORMED = class extends Error {
    [key: string]: Dynamic;
    code: Dynamic = `MALFORMED`;
    constructor(
      platformLiveDocumentAndHistoryMALFORMED?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      super(
        `version history: malformed answer (${platformLiveDocumentAndHistoryMALFORMED})`,
      );
      this.name = `FrameHistoryMalformed`;
    }
  });
  (resolvePlatformLiveDocumentAndHistoryValue30 = (
    platformLiveDocumentAndHistoryValue30?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof platformLiveDocumentAndHistoryValue30 == `object` &&
    !!platformLiveDocumentAndHistoryValue30 &&
    !Array.isArray(platformLiveDocumentAndHistoryValue30));
  (PlatformLiveDocumentAndHistoryRoom = `room`);
  (PlatformLiveDocumentAndHistoryCurrent = `current`);
  (platformLiveDocumentAndHistoryPattern14 = /^[a-z][a-z0-9_]{0,31}$/);
  (resolvePlatformLiveDocumentAndHistoryBoundary = (
    platformLiveDocumentAndHistoryBoundary?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (
      !resolvePlatformLiveDocumentAndHistoryValue30(
        platformLiveDocumentAndHistoryBoundary,
      )
    )
      return;
    let record2: Dynamic = {
      ...(typeof platformLiveDocumentAndHistoryBoundary.boundary == `string` &&
      platformLiveDocumentAndHistoryBoundary.boundary.length > 0
        ? {
            boundary: platformLiveDocumentAndHistoryBoundary.boundary,
          }
        : {}),
      ...(platformLiveDocumentAndHistoryBoundary.stored === true
        ? {
            stored: true,
          }
        : {}),
      ...(typeof platformLiveDocumentAndHistoryBoundary.name == `string` &&
      platformLiveDocumentAndHistoryBoundary.name.trim() !== ``
        ? {
            name: platformLiveDocumentAndHistoryBoundary.name.trim(),
          }
        : {}),
    };
    return Object.keys(record2).length > 0 ? record2 : undefined;
  });
  (resolvePlatformLiveDocumentAndHistoryPrincipal = (
    actor?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (typeof actor == `string`)
      return actor === PlatformLiveDocumentAndHistoryRoom
        ? {
            principal: PlatformLiveDocumentAndHistoryRoom,
            channel: `internal`,
          }
        : undefined;
    if (
      !(
        !resolvePlatformLiveDocumentAndHistoryValue30(actor) ||
        typeof actor.principal != `string`
      )
    )
      return {
        principal: actor.principal,
        channel: typeof actor.channel == `string` ? actor.channel : `human`,
        ...(typeof actor.via == `string`
          ? {
              via: actor.via,
            }
          : {}),
      };
  });
  (resolvePlatformLiveDocumentAndHistoryParams2 = (
    platformLiveDocumentAndHistoryParams2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let rev: Dynamic = platformLiveDocumentAndHistoryParams2.params.rev;
    return typeof rev == `number` ? rev : undefined;
  });
  (resolvePlatformLiveDocumentAndHistoryNode4 = (
    platformLiveDocumentAndHistoryNode4?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    object: `node`,
    id: platformLiveDocumentAndHistoryNode4,
  }));
  (platformLiveDocumentAndHistoryMap10 = new (Map as Dynamic)());
  (resolvePlatformLiveDocumentAndHistoryFileId = (
    page?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `${page.pid}/${page.fileId}`);
  (resolvePlatformLiveDocumentAndHistoryContent = (
    node?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (
      !(
        !resolvePlatformLiveDocumentAndHistoryValue30(node) ||
        !resolvePlatformLiveDocumentAndHistoryValue30(node.content)
      )
    )
      return typeof node.content.id == `string` && node.content.id.length > 0
        ? node.content.id
        : undefined;
  });
  (getPlatformLiveDocumentAndHistoryValue2 = (
    platformLiveDocumentAndHistoryValue2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    platformLiveDocumentAndHistoryMap10.get(
      `${platformLiveDocumentAndHistoryValue2}/${options}`,
    ));
  (platformLiveDocumentAndHistoryPattern15 = /\.ldoc$/i);
  (platformLiveDocumentAndHistoryMap11 = new (Map as Dynamic)());
  (platformLiveDocumentAndHistoryValue07 = 0);
  (isPlatformLiveDocumentAndHistoryFilter = (
    platformLiveDocumentAndHistoryFilter?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let uniqueItems: Dynamic = new (Set as Dynamic)(
      platformLiveDocumentAndHistoryFilter.map(
        (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          rolldownNImport2.id,
      ),
    );
    return [
      ...platformLiveDocumentAndHistoryFilter,
      ...options.filter(
        (option?: Dynamic, ..._extraArguments: unknown[]) =>
          !uniqueItems.has(option.id),
      ),
    ];
  });
  (platformLiveDocumentAndHistoryMap12 = new (Map as Dynamic)());
  (platformLiveDocumentAndHistoryMap13 = new (Map as Dynamic)());
  (platformLiveDocumentAndHistoryMap14 = new (Map as Dynamic)());
  (platformLiveDocumentAndHistorySet19 = new (Set as Dynamic)());
  (resolvePlatformLiveDocumentAndHistoryVersion = (
    platformLiveDocumentAndHistoryVersion?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    JSON.stringify([
      platformLiveDocumentAndHistoryVersion.ctr,
      platformLiveDocumentAndHistoryVersion.version,
      platformLiveDocumentAndHistoryVersion.path ?? null,
      platformLiveDocumentAndHistoryVersion.pageId ?? null,
      platformLiveDocumentAndHistoryVersion.roomFile?.pid ?? null,
      platformLiveDocumentAndHistoryVersion.roomFile?.fileId ?? null,
    ]));
  (resolvePlatformLiveDocumentAndHistorySome = (
    platformLiveDocumentAndHistorySome?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    platformLiveDocumentAndHistorySome !== undefined &&
    [...platformLiveDocumentAndHistorySome.values()].some(
      (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => item.full,
    ));
  (PlatformLiveDocumentAndHistoryEntries2 = create(
    (
      platformLiveDocumentAndHistoryEntries2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let platformLiveDocumentAndHistoryEntries22: Dynamic = (
        platformLiveDocumentAndHistoryEntries24?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        platformLiveDocumentAndHistoryEntries2({
          entries: {
            ...options().entries,
            [platformLiveDocumentAndHistoryEntries24]: options2,
          },
        });
      let platformLiveDocumentAndHistoryEntries23: Dynamic = (
        platformLiveDocumentAndHistoryEntries24?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        platformLiveDocumentAndHistoryEntries2({
          more: {
            ...options().more,
            [platformLiveDocumentAndHistoryEntries24]: options2,
          },
        });
      return {
        entries: {},
        more: {},
        load: async (
          platformLiveDocumentAndHistoryEntries24?: Dynamic,
          options2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Promise<undefined> => {
          let platformLiveDocumentAndHistoryEntries2Result: number =
            ++platformLiveDocumentAndHistoryValue07;
          platformLiveDocumentAndHistoryMap11.set(
            platformLiveDocumentAndHistoryEntries24,
            platformLiveDocumentAndHistoryEntries2Result,
          );
          let platformLiveDocumentAndHistoryEntries2Handler = (
            ..._extraArguments: unknown[]
          ) =>
            platformLiveDocumentAndHistoryMap11.get(
              platformLiveDocumentAndHistoryEntries24,
            ) === platformLiveDocumentAndHistoryEntries2Result;
          let platformLiveDocumentAndHistoryVersion: Dynamic =
            resolvePlatformLiveDocumentAndHistoryVersion(options2);
          let matchesPlatformLiveDocumentAndHistoryMap13Entry =
            platformLiveDocumentAndHistoryMap13.get(
              platformLiveDocumentAndHistoryEntries24,
            ) !== platformLiveDocumentAndHistoryVersion;
          platformLiveDocumentAndHistoryMap14.set(
            platformLiveDocumentAndHistoryEntries24,
            platformLiveDocumentAndHistoryVersion,
          );
          let platformLiveDocumentAndHistoryEntries2Handler2 = (
            ..._extraArguments: unknown[]
          ): undefined => {
            if (
              platformLiveDocumentAndHistoryMap11.get(
                platformLiveDocumentAndHistoryEntries24,
              ) === platformLiveDocumentAndHistoryEntries2Result
            ) {
              platformLiveDocumentAndHistoryMap14.delete(
                platformLiveDocumentAndHistoryEntries24,
              );
            }
          };
          let platformLiveDocumentAndHistoryEntries2Handler3 = (
            ..._extraArguments: unknown[]
          ): undefined => {
            if (matchesPlatformLiveDocumentAndHistoryMap13Entry) {
              platformLiveDocumentAndHistoryMap12.delete(
                platformLiveDocumentAndHistoryEntries24,
              );
              platformLiveDocumentAndHistoryMap13.set(
                platformLiveDocumentAndHistoryEntries24,
                platformLiveDocumentAndHistoryVersion,
              );
            }
          };
          try {
            if (options2.roomFile) {
              let {
                rows: platformLiveDocumentAndHistoryRows,
                more: platformLiveDocumentAndHistoryRows2,
              }: Dynamic = await loadPlatformLiveDocumentAndHistoryRows(
                options2.roomFile,
              );
              if (!platformLiveDocumentAndHistoryEntries2Handler()) return;
              let entryItem2: Dynamic =
                options().entries[platformLiveDocumentAndHistoryEntries24];
              if (
                !matchesPlatformLiveDocumentAndHistoryMap13Entry &&
                Array.isArray(entryItem2)
              ) {
                let uniqueItems: Dynamic = new (Set as Dynamic)(
                  entryItem2.map(
                    (
                      entryItem3?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic => entryItem3.id,
                  ),
                );
                if (
                  platformLiveDocumentAndHistoryRows2 &&
                  !platformLiveDocumentAndHistoryRows.some(
                    (
                      platformLiveDocumentAndHistoryRow?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic =>
                      uniqueItems.has(platformLiveDocumentAndHistoryRow.id),
                  )
                ) {
                  platformLiveDocumentAndHistoryEntries22(
                    platformLiveDocumentAndHistoryEntries24,
                    platformLiveDocumentAndHistoryRows,
                  );
                  platformLiveDocumentAndHistoryEntries23(
                    platformLiveDocumentAndHistoryEntries24,
                    true,
                  );
                } else {
                  platformLiveDocumentAndHistoryEntries22(
                    platformLiveDocumentAndHistoryEntries24,
                    isPlatformLiveDocumentAndHistoryFilter(
                      platformLiveDocumentAndHistoryRows,
                      filterPlatformLiveDocumentAndHistoryCurrent(
                        entryItem2,
                        platformLiveDocumentAndHistoryRows,
                      ),
                    ),
                  );
                }
              } else {
                platformLiveDocumentAndHistoryEntries22(
                  platformLiveDocumentAndHistoryEntries24,
                  platformLiveDocumentAndHistoryRows,
                );
                platformLiveDocumentAndHistoryEntries23(
                  platformLiveDocumentAndHistoryEntries24,
                  platformLiveDocumentAndHistoryRows2,
                );
                platformLiveDocumentAndHistoryEntries2Handler3();
              }
              platformLiveDocumentAndHistoryEntries2Handler2();
              return;
            }
            let {
              rows: platformLiveDocumentAndHistoryCtr,
              states: platformLiveDocumentAndHistoryCtr2,
            }: Dynamic = await loadPlatformLiveDocumentAndHistoryCtr(options2);
            if (!platformLiveDocumentAndHistoryEntries2Handler()) return;
            let entryItem: Dynamic =
              options().entries[platformLiveDocumentAndHistoryEntries24];
            if (
              !matchesPlatformLiveDocumentAndHistoryMap13Entry &&
              Array.isArray(entryItem)
            ) {
              let uniqueItems: Dynamic = new (Set as Dynamic)(
                entryItem.map(
                  (
                    entryItem2?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic => entryItem2.id,
                ),
              );
              let platformLiveDocumentAndHistoryMap12Entry: Dynamic =
                platformLiveDocumentAndHistoryMap12.get(
                  platformLiveDocumentAndHistoryEntries24,
                );
              if (
                platformLiveDocumentAndHistoryMap12Entry !== undefined &&
                [...platformLiveDocumentAndHistoryCtr2.values()].some(
                  (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                    item.full,
                ) &&
                !platformLiveDocumentAndHistoryCtr.some(
                  (
                    platformLiveDocumentAndHistoryCtr3?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic =>
                    uniqueItems.has(platformLiveDocumentAndHistoryCtr3.id),
                )
              ) {
                platformLiveDocumentAndHistoryEntries22(
                  platformLiveDocumentAndHistoryEntries24,
                  platformLiveDocumentAndHistoryCtr,
                );
                platformLiveDocumentAndHistoryMap12.set(
                  platformLiveDocumentAndHistoryEntries24,
                  platformLiveDocumentAndHistoryCtr2,
                );
                platformLiveDocumentAndHistoryEntries23(
                  platformLiveDocumentAndHistoryEntries24,
                  resolvePlatformLiveDocumentAndHistorySome(
                    platformLiveDocumentAndHistoryCtr2,
                  ),
                );
              } else {
                platformLiveDocumentAndHistoryEntries22(
                  platformLiveDocumentAndHistoryEntries24,
                  isPlatformLiveDocumentAndHistoryFilter(
                    platformLiveDocumentAndHistoryCtr,
                    entryItem,
                  ),
                );
                if (platformLiveDocumentAndHistoryMap12Entry === undefined)
                  platformLiveDocumentAndHistoryMap12.set(
                    platformLiveDocumentAndHistoryEntries24,
                    platformLiveDocumentAndHistoryCtr2,
                  );
                else
                  for (let [
                    platformLiveDocumentAndHistoryEntries2Result2,
                    platformLiveDocumentAndHistoryEntries2Result3,
                  ] of platformLiveDocumentAndHistoryCtr2 as Dynamic)
                    if (
                      !platformLiveDocumentAndHistoryMap12Entry.has(
                        platformLiveDocumentAndHistoryEntries2Result2,
                      )
                    ) {
                      platformLiveDocumentAndHistoryMap12Entry.set(
                        platformLiveDocumentAndHistoryEntries2Result2,
                        platformLiveDocumentAndHistoryEntries2Result3,
                      );
                    }
                platformLiveDocumentAndHistoryEntries23(
                  platformLiveDocumentAndHistoryEntries24,
                  resolvePlatformLiveDocumentAndHistorySome(
                    platformLiveDocumentAndHistoryMap12.get(
                      platformLiveDocumentAndHistoryEntries24,
                    ),
                  ),
                );
              }
            } else {
              platformLiveDocumentAndHistoryEntries22(
                platformLiveDocumentAndHistoryEntries24,
                platformLiveDocumentAndHistoryCtr,
              );
              platformLiveDocumentAndHistoryEntries2Handler3();
              platformLiveDocumentAndHistoryMap12.set(
                platformLiveDocumentAndHistoryEntries24,
                platformLiveDocumentAndHistoryCtr2,
              );
              platformLiveDocumentAndHistoryEntries23(
                platformLiveDocumentAndHistoryEntries24,
                resolvePlatformLiveDocumentAndHistorySome(
                  platformLiveDocumentAndHistoryCtr2,
                ),
              );
            }
            platformLiveDocumentAndHistoryEntries2Handler2();
          } catch (platformLiveDocumentAndHistoryEntries2Result2: Dynamic) {
            if (!platformLiveDocumentAndHistoryEntries2Handler()) return;
            platformLiveDocumentAndHistoryEntries2Handler2();
            let entryItem: Dynamic =
              options().entries[platformLiveDocumentAndHistoryEntries24];
            if (
              !matchesPlatformLiveDocumentAndHistoryMap13Entry &&
              Array.isArray(entryItem) &&
              entryItem.length > 0
            )
              return;
            platformLiveDocumentAndHistoryEntries22(
              platformLiveDocumentAndHistoryEntries24,
              platformLiveDocumentAndHistoryEntries2Result2,
            );
            platformLiveDocumentAndHistoryEntries2Handler3();
          }
        },
        loadOlder: async (
          platformLiveDocumentAndHistoryEntries24?: Dynamic,
          options2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Promise<undefined> => {
          let entryItem: Dynamic =
            options().entries[platformLiveDocumentAndHistoryEntries24];
          if (!Array.isArray(entryItem) || entryItem.length === 0) return;
          let platformLiveDocumentAndHistoryVersion: Dynamic =
            resolvePlatformLiveDocumentAndHistoryVersion(options2);
          if (
            platformLiveDocumentAndHistoryMap13.get(
              platformLiveDocumentAndHistoryEntries24,
            ) !== platformLiveDocumentAndHistoryVersion
          )
            return;
          let platformLiveDocumentAndHistoryMap14Entry: Dynamic =
            platformLiveDocumentAndHistoryMap14.get(
              platformLiveDocumentAndHistoryEntries24,
            );
          if (
            (platformLiveDocumentAndHistoryMap14Entry !== undefined &&
              platformLiveDocumentAndHistoryMap14Entry !==
                platformLiveDocumentAndHistoryVersion) ||
            platformLiveDocumentAndHistorySet19.has(
              platformLiveDocumentAndHistoryEntries24,
            )
          )
            return;
          platformLiveDocumentAndHistorySet19.add(
            platformLiveDocumentAndHistoryEntries24,
          );
          let id: Dynamic = entryItem.reduce(
            (
              activity?: Dynamic,
              activity2?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => (activity2.at < activity.at ? activity2 : activity),
            entryItem[0],
          ).id;
          let options3: Dynamic = (..._extraArguments: unknown[]) => {
            if (
              platformLiveDocumentAndHistoryMap13.get(
                platformLiveDocumentAndHistoryEntries24,
              ) !== platformLiveDocumentAndHistoryVersion ||
              (platformLiveDocumentAndHistoryMap14.get(
                platformLiveDocumentAndHistoryEntries24,
              ) ?? platformLiveDocumentAndHistoryVersion) !==
                platformLiveDocumentAndHistoryVersion
            )
              return false;
            let entryItem2: Dynamic =
              options().entries[platformLiveDocumentAndHistoryEntries24];
            return (
              Array.isArray(entryItem2) &&
              entryItem2.some(
                (entryItem3?: Dynamic, ..._extraArguments: unknown[]) =>
                  entryItem3.id === id,
              )
            );
          };
          try {
            if (options2.roomFile) {
              let before: Dynamic =
                resolvePlatformLiveDocumentAndHistoryTool(entryItem);
              if (before === undefined) {
                platformLiveDocumentAndHistoryEntries23(
                  platformLiveDocumentAndHistoryEntries24,
                  false,
                );
                return;
              }
              let {
                rows: platformLiveDocumentAndHistoryRows,
                more: platformLiveDocumentAndHistoryRows2,
              }: Dynamic = await loadPlatformLiveDocumentAndHistoryRows(
                options2.roomFile,
                {
                  before: before,
                },
              );
              if (!options3()) return;
              let entryItem3: Dynamic =
                options().entries[platformLiveDocumentAndHistoryEntries24];
              let isPlatformLiveDocumentAndHistoryFilter2: Dynamic =
                isPlatformLiveDocumentAndHistoryFilter(
                  platformLiveDocumentAndHistoryRows,
                  entryItem3,
                );
              platformLiveDocumentAndHistoryEntries22(
                platformLiveDocumentAndHistoryEntries24,
                isPlatformLiveDocumentAndHistoryFilter2,
              );
              platformLiveDocumentAndHistoryEntries23(
                platformLiveDocumentAndHistoryEntries24,
                platformLiveDocumentAndHistoryRows2 &&
                  isPlatformLiveDocumentAndHistoryFilter2.length >
                    entryItem3.length,
              );
              return;
            }
            let platformLiveDocumentAndHistoryMap12Entry: Dynamic =
              platformLiveDocumentAndHistoryMap12.get(
                platformLiveDocumentAndHistoryEntries24,
              );
            if (
              !resolvePlatformLiveDocumentAndHistorySome(
                platformLiveDocumentAndHistoryMap12Entry,
              )
            ) {
              platformLiveDocumentAndHistoryEntries23(
                platformLiveDocumentAndHistoryEntries24,
                false,
              );
              return;
            }
            let {
              rows: platformLiveDocumentAndHistoryCtr,
              states: platformLiveDocumentAndHistoryCtr2,
            }: Dynamic = await loadPlatformLiveDocumentAndHistoryCtr(
              options2,
              platformLiveDocumentAndHistoryMap12Entry,
            );
            if (!options3()) return;
            let entryItem2: Dynamic =
              options().entries[platformLiveDocumentAndHistoryEntries24];
            platformLiveDocumentAndHistoryEntries22(
              platformLiveDocumentAndHistoryEntries24,
              isPlatformLiveDocumentAndHistoryFilter(
                platformLiveDocumentAndHistoryCtr,
                entryItem2,
              ),
            );
            let platformLiveDocumentAndHistoryMap12Entry2: Dynamic =
              platformLiveDocumentAndHistoryMap12.get(
                platformLiveDocumentAndHistoryEntries24,
              );
            if (platformLiveDocumentAndHistoryMap12Entry2 === undefined)
              platformLiveDocumentAndHistoryMap12.set(
                platformLiveDocumentAndHistoryEntries24,
                platformLiveDocumentAndHistoryCtr2,
              );
            else
              for (let [
                platformLiveDocumentAndHistoryEntries2Result,
                platformLiveDocumentAndHistoryEntries2Result2,
              ] of platformLiveDocumentAndHistoryCtr2 as Dynamic)
                platformLiveDocumentAndHistoryMap12Entry2.set(
                  platformLiveDocumentAndHistoryEntries2Result,
                  platformLiveDocumentAndHistoryEntries2Result2,
                );
            platformLiveDocumentAndHistoryEntries23(
              platformLiveDocumentAndHistoryEntries24,
              resolvePlatformLiveDocumentAndHistorySome(
                platformLiveDocumentAndHistoryMap12.get(
                  platformLiveDocumentAndHistoryEntries24,
                ),
              ),
            );
          } catch {
            console.warn(
              `[fileHistoryStore] loadOlder failed — held rows kept; the button retries`,
            );
          } finally {
            platformLiveDocumentAndHistorySet19.delete(
              platformLiveDocumentAndHistoryEntries24,
            );
          }
        },
        dropOpenHead: (
          { pid: pid, fileId: fileId }: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          let platformLiveDocumentAndHistoryEntries2Handler: Dynamic = (
            platformLiveDocumentAndHistoryEntries24?: Dynamic,
            ..._extraArguments: unknown[]
          ) => {
            if (platformLiveDocumentAndHistoryEntries24 === undefined)
              return false;
            let parse: Dynamic = JSON.parse(
              platformLiveDocumentAndHistoryEntries24,
            );
            return parse[4] === pid && parse[5] === fileId;
          };
          for (let platformLiveDocumentAndHistoryEntries2Result of new (Set as Dynamic)(
            [
              ...platformLiveDocumentAndHistoryMap13.keys(),
              ...platformLiveDocumentAndHistoryMap14.keys(),
            ],
          ) as Dynamic) {
            if (
              !platformLiveDocumentAndHistoryEntries2Handler(
                platformLiveDocumentAndHistoryMap13.get(
                  platformLiveDocumentAndHistoryEntries2Result,
                ),
              ) &&
              !platformLiveDocumentAndHistoryEntries2Handler(
                platformLiveDocumentAndHistoryMap14.get(
                  platformLiveDocumentAndHistoryEntries2Result,
                ),
              )
            )
              continue;
            platformLiveDocumentAndHistoryMap11.set(
              platformLiveDocumentAndHistoryEntries2Result,
              ++platformLiveDocumentAndHistoryValue07,
            );
            let entryItem: Dynamic =
              options().entries[platformLiveDocumentAndHistoryEntries2Result];
            if (
              Array.isArray(entryItem) &&
              entryItem.some(
                (entryItem2?: Dynamic, ..._extraArguments: unknown[]) =>
                  resolvePlatformLiveDocumentAndHistoryParams(entryItem2) ===
                  `current`,
              )
            ) {
              platformLiveDocumentAndHistoryEntries22(
                platformLiveDocumentAndHistoryEntries2Result,
                entryItem.filter(
                  (entryItem2?: Dynamic, ..._extraArguments: unknown[]) =>
                    resolvePlatformLiveDocumentAndHistoryParams(entryItem2) !==
                    PlatformLiveDocumentAndHistoryCurrent,
                ),
              );
            }
          }
        },
        release: (
          platformLiveDocumentAndHistoryEntries24?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          platformLiveDocumentAndHistoryMap11.delete(
            platformLiveDocumentAndHistoryEntries24,
          );
          platformLiveDocumentAndHistoryMap12.delete(
            platformLiveDocumentAndHistoryEntries24,
          );
          platformLiveDocumentAndHistoryMap13.delete(
            platformLiveDocumentAndHistoryEntries24,
          );
          platformLiveDocumentAndHistoryMap14.delete(
            platformLiveDocumentAndHistoryEntries24,
          );
          platformLiveDocumentAndHistorySet19.delete(
            platformLiveDocumentAndHistoryEntries24,
          );
          let { entries: options2, more: options3 }: Dynamic = options();
          if (
            platformLiveDocumentAndHistoryEntries24 in options2 ||
            platformLiveDocumentAndHistoryEntries24 in options3
          ) {
            let {
              [platformLiveDocumentAndHistoryEntries24]: options4,
              ...entries
            }: Dynamic = options2;
            let {
              [platformLiveDocumentAndHistoryEntries24]: options5,
              ...more
            }: Dynamic = options3;
            platformLiveDocumentAndHistoryEntries2({
              entries: entries,
              more: more,
            });
          }
        },
      };
    },
  ));
  (resolvePlatformLiveDocumentAndHistoryPid2 = (
    { pid: pid, fileId: fileId }: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let liveLaneDeps2: Dynamic = liveLaneDeps();
    if (liveLaneDeps2 === null)
      throw Error(`versionHistoryRoad: not inside a Frame shell`);
    let label = `project/${pid}`;
    return {
      pid: pid,
      fileId: fileId,
      door: liveDoor(pid, {
        container: {
          kind: `project`,
          id: pid,
        },
      }),
      lane: frameLane(label),
      schedule: liveLaneDeps2.schedule,
    };
  });
  (platformLiveDocumentAndHistoryMap15 = new (Map as Dynamic)());
  (platformLiveDocumentAndHistorySet20 = new (Set as Dynamic)());
  (resolvePlatformLiveDocumentAndHistoryFileId2 = (
    page?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `history ${page.pid}/${page.fileId} ${options ?? ``}`);
  (resolvePlatformLiveDocumentAndHistoryValue32 = (
    platformLiveDocumentAndHistoryValue32?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolvePlatformLiveDocumentAndHistoryValues2(
      platformLiveDocumentAndHistoryValue32,
      options,
    ));
  (resolvePlatformLiveDocumentAndHistoryValue33 = (
    platformLiveDocumentAndHistoryValue33?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolvePlatformLiveDocumentAndHistoryPid2(
      platformLiveDocumentAndHistoryValue33,
    ));
  (PlatformLiveDocumentAndHistoryDETAILSUNAVAILABLE = class extends Error {
    [key: string]: Dynamic;
    code: Dynamic = `DETAILS_UNAVAILABLE`;
    constructor(
      platformLiveDocumentAndHistoryDETAILSUNAVAILABLE?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      super(
        `version history: version details unavailable (cannot be ${platformLiveDocumentAndHistoryDETAILSUNAVAILABLE})`,
      );
      this.name = `VersionDetailsUnavailable`;
    }
  });
  (PlatformLiveDocumentAndHistoryThisIsAlreadyTheCurrentVersion = `This is already the current version`);
  (platformLiveDocumentAndHistoryValue2500 = 2500);
}

export {
  PlatformLiveDocumentAndHistoryCurrent,
  PlatformLiveDocumentAndHistoryDENIED,
  PlatformLiveDocumentAndHistoryDETAILSUNAVAILABLE,
  PlatformLiveDocumentAndHistoryEntries2,
  PlatformLiveDocumentAndHistoryMALFORMED,
  PlatformLiveDocumentAndHistoryTIMEOUT,
  collectPlatformLiveDocumentAndHistoryKind,
  isPlatformLiveDocumentAndHistoryChanged,
  isPlatformLiveDocumentAndHistoryDelete,
  isPlatformLiveDocumentAndHistoryHasFocus,
  isPlatformLiveDocumentAndHistoryKind,
  isPlatformLiveDocumentAndHistorySurface,
  loadPlatformLiveDocumentAndHistoryContainer2,
  loadPlatformLiveDocumentAndHistoryHtml,
  loadPlatformLiveDocumentAndHistoryKind,
  loadPlatformLiveDocumentAndHistoryRef,
  loadPlatformLiveDocumentAndHistoryRev,
  loadPlatformLiveDocumentAndHistoryVerb,
  platformLiveDocumentAndHistoryModalModalRefValues,
  platformLiveDocumentAndHistoryValue15000,
  resolvePlatformLiveDocumentAndHistoryAllow,
  resolvePlatformLiveDocumentAndHistoryDrew,
  resolvePlatformLiveDocumentAndHistoryGet2,
  resolvePlatformLiveDocumentAndHistoryKind4,
  resolvePlatformLiveDocumentAndHistoryLocal,
  resolvePlatformLiveDocumentAndHistoryNode4,
  resolvePlatformLiveDocumentAndHistoryNode5,
  resolvePlatformLiveDocumentAndHistoryParams,
  resolvePlatformLiveDocumentAndHistoryParams2,
  resolvePlatformLiveDocumentAndHistoryPid2,
  resolvePlatformLiveDocumentAndHistoryReason4,
  resolvePlatformLiveDocumentAndHistoryReason5,
  resolvePlatformLiveDocumentAndHistoryRestored,
  resolvePlatformLiveDocumentAndHistoryRev,
  resolvePlatformLiveDocumentAndHistorySchedule,
  resolvePlatformLiveDocumentAndHistoryShown,
  resolvePlatformLiveDocumentAndHistoryValue32,
  resolvePlatformLiveDocumentAndHistoryValue33,
  resolvePlatformLiveDocumentAndHistoryWritable,
  resolvePlatformLiveDocumentAndHistoryWsNeverOpened,
  updatePlatformLiveDocumentAndHistoryFinally,
  usePlatformLiveDocumentAndHistoryBeat,
  usePlatformLiveDocumentAndHistoryDownloadsOk,
  usePlatformLiveDocumentAndHistoryFormat,
};
