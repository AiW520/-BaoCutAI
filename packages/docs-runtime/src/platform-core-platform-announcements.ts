/** BaoCut: platform announcements from app-core-BE6n4d7F.js. */
import type { Dynamic } from "./types";
import {
  resolveEditorExtensionsRefusalClass,
} from "./platform-core-editor-extensions-3";
import {
  PlatformApiAndAuthColor,
  resolvePlatformApiAndAuthExternal,
  resolvePlatformApiAndAuthInternal,
} from "./platform-core-platform-api-and-auth-5";
import {
  dataModelSchemasValue2000,
  dataModelSchemasValue90000,
  isDataModelSchemasFlashed,
  resolveDataModelSchemasAnchor,
  resolveDataModelSchemasAnchor2,
  resolveDataModelSchemasLaw2,
  resolveDataModelSchemasValue25,
} from "./platform-core-data-model-schemas-4";
import {
  resolveDataModelSchemasTest9,
} from "./platform-core-data-model-schemas-5";

function resolvePlatformAnnouncementsSelfRev(
  envelope?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let diff: Dynamic = envelope?.diff;
  if (!Array.isArray(diff)) return null;
  let ask: Dynamic = null;
  for (let resolvePlatformAnnouncementsSelfRevResult of diff as Dynamic) {
    let after: Dynamic = resolvePlatformAnnouncementsSelfRevResult?.after;
    let doc: Dynamic = after?.doc;
    if (!doc || typeof doc != `object`) continue;
    let rev: Dynamic = typeof after?.rev == `number` ? after.rev : null;
    for (let [
      bid,
      resolvePlatformAnnouncementsSelfRevResult2,
    ] of Object.entries(doc) as Dynamic) {
      if (
        !resolveDataModelSchemasTest9(bid) ||
        bid === `root` ||
        !resolvePlatformAnnouncementsSelfRevResult2 ||
        typeof resolvePlatformAnnouncementsSelfRevResult2 != `object`
      )
        continue;
      let {
        selfRev: resolvePlatformAnnouncementsSelfRevResult3,
        rev: resolvePlatformAnnouncementsSelfRevResult4,
        createdRev: resolvePlatformAnnouncementsSelfRevResult5,
        content: resolvePlatformAnnouncementsSelfRevResult6,
      }: Dynamic = resolvePlatformAnnouncementsSelfRevResult2;
      if (
        Array.isArray(resolvePlatformAnnouncementsSelfRevResult6) &&
        resolvePlatformAnnouncementsSelfRevResult6.some(
          (entry?: Dynamic, ..._extraArguments: unknown[]) =>
            entry?.kind === `block`,
        )
      )
        continue;
      let selfRev =
        typeof resolvePlatformAnnouncementsSelfRevResult3 == `number`
          ? resolvePlatformAnnouncementsSelfRevResult3
          : typeof resolvePlatformAnnouncementsSelfRevResult4 == `number`
            ? resolvePlatformAnnouncementsSelfRevResult4
            : -1;
      if (rev !== null && selfRev !== rev) continue;
      let createdRev =
        typeof resolvePlatformAnnouncementsSelfRevResult5 == `number`
          ? resolvePlatformAnnouncementsSelfRevResult5
          : -1;
      if (
        ask === null ||
        selfRev > ask.selfRev ||
        (selfRev === ask.selfRev && createdRev > ask.createdRev)
      ) {
        ask = {
          bid: bid,
          selfRev: selfRev,
          createdRev: createdRev,
        };
      }
    }
  }
  return ask?.bid ?? null;
}

function resolvePlatformAnnouncementsKey(
  platformAnnouncementsKey?: Dynamic,
  options?: Dynamic,
  context: Dynamic = null,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    key: `xagent:${platformAnnouncementsKey}`,
    name: PlatformApiAndAuthColor.name,
    color: PlatformApiAndAuthColor.color,
    sel:
      context === null
        ? resolveDataModelSchemasAnchor(options)
        : resolveDataModelSchemasAnchor2(context),
  };
}

function resolvePlatformAnnouncementsFile(
  platformAnnouncementsFile?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let ref: Dynamic = platformAnnouncementsFile.body?.ref;
  return ref && ref.object === `file` && typeof ref.id == `string`
    ? ref.id
    : undefined;
}

function isPlatformAnnouncementsAgent(
  platformAnnouncementsAgent?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return !platformAnnouncementsAgent.agent ||
    platformAnnouncementsAgent.agent.running === false ||
    (!resolvePlatformApiAndAuthExternal(platformAnnouncementsAgent.channel) &&
      !resolvePlatformApiAndAuthInternal(platformAnnouncementsAgent.channel))
    ? false
    : resolvePlatformAnnouncementsFile(platformAnnouncementsAgent) === options;
}

function isPlatformAnnouncementsFileId(
  scheduler?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let firstPending: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
    if (scheduler.pendingBlocks) return scheduler.pendingBlocks();
    let firstPending2: Dynamic = scheduler.firstPending?.() ?? null;
    return firstPending2 === null ? [] : [firstPending2];
  };
  let isPlatformAnnouncementsFileIdResult: Dynamic = null;
  let isPlatformAnnouncementsFileIdResult2: Dynamic = null;
  let isPlatformAnnouncementsFileIdResult3: Dynamic = null;
  let count: Dynamic = 0;
  let isPlatformAnnouncementsFileIdResult4: Dynamic = null;
  let enabled = false;
  let isPlatformAnnouncementsFileIdResult5: Dynamic = null;
  let isPlatformAnnouncementsFileIdResult6: Dynamic = null;
  let count2: Dynamic = 0;
  let isPlatformAnnouncementsFileIdResult7: Dynamic;
  let lastTextblock: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
    let firstPending2: Dynamic = firstPending();
    let firstPendingItem: Dynamic = firstPending2[0] ?? null;
    let matchesIsPlatformAnnouncementsFileIdResult: Dynamic =
      isPlatformAnnouncementsFileIdResult6 !== null &&
      (firstPending2.length !== isPlatformAnnouncementsFileIdResult6.size ||
        firstPending2.some(
          (firstPending3?: Dynamic, ..._extraArguments: unknown[]) =>
            !isPlatformAnnouncementsFileIdResult6.has(firstPending3),
        ));
    if (
      firstPendingItem !== null &&
      (isPlatformAnnouncementsFileIdResult2 === null ||
        matchesIsPlatformAnnouncementsFileIdResult)
    )
      return scheduler.now() >= count2
        ? {
            b: (isPlatformAnnouncementsFileIdResult4 = firstPendingItem),
            at: null,
          }
        : isPlatformAnnouncementsFileIdResult2 === null
          ? null
          : {
              b: isPlatformAnnouncementsFileIdResult2,
              at: isPlatformAnnouncementsFileIdResult3,
            };
    if (isPlatformAnnouncementsFileIdResult2 !== null)
      return {
        b: isPlatformAnnouncementsFileIdResult2,
        at: isPlatformAnnouncementsFileIdResult3,
      };
    if (enabled) return null;
    let isPlatformAnnouncementsFileIdResult10: Dynamic =
      (isPlatformAnnouncementsFileIdResult4 ??= scheduler.lastTextblock());
    return isPlatformAnnouncementsFileIdResult10 === null
      ? null
      : {
          b: isPlatformAnnouncementsFileIdResult10,
          at: null,
        };
  };
  let renew = (..._extraArguments: unknown[]): undefined => {
    if (isPlatformAnnouncementsFileIdResult === null) return;
    let lastTextblock2: Dynamic = lastTextblock();
    if (lastTextblock2 !== null) {
      isPlatformAnnouncementsFileIdResult5 = `${lastTextblock2.b}|${lastTextblock2.at ?? ``}`;
      scheduler.post([
        resolvePlatformAnnouncementsKey(
          isPlatformAnnouncementsFileIdResult,
          lastTextblock2.b,
          lastTextblock2.at,
        ),
      ]);
    }
  };
  let renew2 = (..._extraArguments: unknown[]): undefined => {
    if (isPlatformAnnouncementsFileIdResult === null) return;
    let lastTextblock2: Dynamic = lastTextblock();
    if (
      lastTextblock2 !== null &&
      `${lastTextblock2.b}|${lastTextblock2.at ?? ``}` !==
        isPlatformAnnouncementsFileIdResult5
    ) {
      renew();
    }
  };
  let isPlatformAnnouncementsFileIdResult8: Dynamic = null;
  let count3: Dynamic = 0;
  let count4 = 0;
  let isPlatformAnnouncementsFileIdResult9: Dynamic;
  let live: Dynamic = (..._extraArguments: unknown[]) =>
    scheduler.liveMs !== undefined &&
    isPlatformAnnouncementsFileIdResult !== null &&
    scheduler.now() - count3 < scheduler.liveMs;
  let isDataModelSchemasFlashed2: Dynamic = isDataModelSchemasFlashed({
    fileId: scheduler.fileId,
    renew: renew,
    holdMs: scheduler.liveMs,
    live: live,
    clear: (..._extraArguments: unknown[]): undefined => {
      isPlatformAnnouncementsFileIdResult = null;
      isPlatformAnnouncementsFileIdResult2 = null;
      isPlatformAnnouncementsFileIdResult4 = null;
      isPlatformAnnouncementsFileIdResult3 = null;
      enabled = false;
      isPlatformAnnouncementsFileIdResult5 = null;
      isPlatformAnnouncementsFileIdResult6 = null;
      count = 0;
      isPlatformAnnouncementsFileIdResult8 = null;
      count3 = 0;
      count4 = 0;
      if (isPlatformAnnouncementsFileIdResult9 !== undefined) {
        scheduler.cancel(isPlatformAnnouncementsFileIdResult9);
      }
      isPlatformAnnouncementsFileIdResult9 = undefined;
      count2 = 0;
      if (isPlatformAnnouncementsFileIdResult7 !== undefined) {
        scheduler.cancel(isPlatformAnnouncementsFileIdResult7);
      }
      isPlatformAnnouncementsFileIdResult7 = undefined;
      scheduler.post([]);
    },
    schedule: scheduler.schedule,
    cancel: scheduler.cancel,
  });
  let schedule = (..._extraArguments: unknown[]): undefined => {
    if (scheduler.liveMs !== undefined) {
      if (isPlatformAnnouncementsFileIdResult9 !== undefined) {
        scheduler.cancel(isPlatformAnnouncementsFileIdResult9);
      }
      isPlatformAnnouncementsFileIdResult9 = scheduler.schedule(
        (..._extraArguments: unknown[]): undefined => {
          isPlatformAnnouncementsFileIdResult9 = undefined;
          if (isPlatformAnnouncementsFileIdResult !== null && !live()) {
            isDataModelSchemasFlashed2.rest();
          }
        },
        Math.max(0, count3 + scheduler.liveMs - scheduler.now()),
      );
    }
  };
  let flashed = (..._extraArguments: unknown[]): undefined => {
    if (
      !(
        isPlatformAnnouncementsFileIdResult !== null ||
        isPlatformAnnouncementsFileIdResult8 === null ||
        !isDataModelSchemasFlashed2.vouching(
          isPlatformAnnouncementsFileIdResult8,
        ) ||
        (scheduler.liveMs !== undefined &&
          scheduler.now() - count4 >= scheduler.liveMs)
      )
    ) {
      if (firstPending().length !== 0) {
        isPlatformAnnouncementsFileIdResult =
          isPlatformAnnouncementsFileIdResult8;
        enabled = true;
        count3 = count4;
        schedule();
        isDataModelSchemasFlashed2.flashed(
          isPlatformAnnouncementsFileIdResult8,
          0,
          renew,
        );
      }
    }
  };
  return {
    landed(
      platformAnnouncementsFileId?: Dynamic,
      options?: Dynamic,
      context?: unknown,
      ..._extraArguments: unknown[]
    ): undefined {
      isPlatformAnnouncementsFileIdResult = platformAnnouncementsFileId;
      enabled = false;
      count3 = scheduler.now();
      schedule();
      if (isPlatformAnnouncementsFileIdResult6 === null || count3 >= count2) {
        isPlatformAnnouncementsFileIdResult6 = new (Set as Dynamic)(
          firstPending(),
        );
      }
      count2 = count3 + dataModelSchemasValue2000;
      if (isPlatformAnnouncementsFileIdResult7 !== undefined) {
        scheduler.cancel(isPlatformAnnouncementsFileIdResult7);
      }
      isPlatformAnnouncementsFileIdResult7 = scheduler.schedule(
        (..._extraArguments: unknown[]): undefined => {
          isPlatformAnnouncementsFileIdResult7 = undefined;
          renew2();
        },
        dataModelSchemasValue2000,
      );
      if (typeof context == `string` && resolveDataModelSchemasTest9(context)) {
        isPlatformAnnouncementsFileIdResult3 = context;
      } else {
        if (
          options !== null &&
          options !== isPlatformAnnouncementsFileIdResult2
        ) {
          isPlatformAnnouncementsFileIdResult3 = null;
        }
      }
      if (options !== null) {
        isPlatformAnnouncementsFileIdResult2 = options;
      }
      count = scheduler.now() + 400 * 5;
      isDataModelSchemasFlashed2.flashed(
        platformAnnouncementsFileId,
        400,
        renew,
      );
    },
    delta(
      platformAnnouncementsFileId?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        !(
          isPlatformAnnouncementsFileIdResult === null ||
          scheduler.now() > count ||
          !resolveDataModelSchemasTest9(platformAnnouncementsFileId) ||
          isPlatformAnnouncementsFileIdResult3 !== null
        )
      ) {
        isPlatformAnnouncementsFileIdResult2 = platformAnnouncementsFileId;
        isDataModelSchemasFlashed2.flashed(
          isPlatformAnnouncementsFileIdResult,
          0,
          renew,
        );
      }
    },
    presence(actor?: Dynamic, ..._extraArguments: unknown[]): undefined {
      if (
        !(
          (scheduler.lane === `agent` && actor.channel === `human`) ||
          (actor.channel !== `human` && !actor.agent) ||
          (actor.channel !== `human` &&
            !resolvePlatformApiAndAuthExternal(actor.channel) &&
            !resolvePlatformApiAndAuthInternal(actor.channel))
        )
      ) {
        isDataModelSchemasFlashed2.presence(actor.principal, actor.connId, {
          running: actor.agent?.running,
          fileId: resolvePlatformAnnouncementsFile(actor),
        });
        if (isPlatformAnnouncementsAgent(actor, scheduler.fileId)) {
          isPlatformAnnouncementsFileIdResult8 = actor.principal;
          count4 = Math.max(count4, Math.min(scheduler.now(), actor.at));
          if (
            isPlatformAnnouncementsFileIdResult === actor.principal &&
            count4 > count3
          ) {
            count3 = count4;
            schedule();
          }
          flashed();
        }
      }
    },
    left(
      platformAnnouncementsFileId?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      isDataModelSchemasFlashed2.left(platformAnnouncementsFileId, options);
    },
    learned(..._extraArguments: unknown[]): undefined {
      if (isPlatformAnnouncementsFileIdResult === null) {
        flashed();
        return;
      }
      renew2();
    },
    live: live,
    standing: (..._extraArguments: unknown[]) =>
      isPlatformAnnouncementsFileIdResult !== null,
    dispose(..._extraArguments: unknown[]): undefined {
      if (isPlatformAnnouncementsFileIdResult9 !== undefined) {
        scheduler.cancel(isPlatformAnnouncementsFileIdResult9);
      }
      isPlatformAnnouncementsFileIdResult9 = undefined;
      if (isPlatformAnnouncementsFileIdResult7 !== undefined) {
        scheduler.cancel(isPlatformAnnouncementsFileIdResult7);
      }
      isPlatformAnnouncementsFileIdResult7 = undefined;
      isDataModelSchemasFlashed2.dispose();
    },
  };
}

function resolvePlatformAnnouncementsPrincipal(
  platformAnnouncementsPrincipal?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  for (let [
    resolvePlatformAnnouncementsPrincipalResult,
    resolvePlatformAnnouncementsPrincipalResult2,
  ] of platformAnnouncementsPrincipal as Dynamic) {
    if (
      resolvePlatformAnnouncementsPrincipalResult2.who.kind !== `xagent` &&
      resolvePlatformAnnouncementsPrincipalResult2.who.kind !== `agent`
    )
      continue;
    let resolvePlatformAnnouncementsPrincipalResultIndex: Dynamic =
      resolvePlatformAnnouncementsPrincipalResult.indexOf(`#`);
    if (resolvePlatformAnnouncementsPrincipalResultIndex < 0) continue;
    let matchesFileRef =
      resolvePlatformAnnouncementsPrincipalResult2.fileRef !== undefined &&
      resolvePlatformAnnouncementsPrincipalResult2.placedAt !== undefined;
    let record2: Dynamic = {
      principal: resolvePlatformAnnouncementsPrincipalResult2.who.ownerUid,
      connId: resolvePlatformAnnouncementsPrincipalResult.slice(
        resolvePlatformAnnouncementsPrincipalResultIndex + 1,
      ),
      at: matchesFileRef
        ? resolvePlatformAnnouncementsPrincipalResult2.placedAt
        : resolvePlatformAnnouncementsPrincipalResult2.ts,
      body: matchesFileRef
        ? {
            ref: resolvePlatformAnnouncementsPrincipalResult2.fileRef,
          }
        : {},
    };
    items.push(
      resolvePlatformAnnouncementsPrincipalResult2.who.kind === `xagent`
        ? {
            ...record2,
            channel: `external`,
            agent: {
              name: resolvePlatformAnnouncementsPrincipalResult2.who.agent,
            },
          }
        : {
            ...record2,
            channel: `internal`,
            agent: {
              name: resolvePlatformAnnouncementsPrincipalResult2.who.agent,
              runId: resolvePlatformAnnouncementsPrincipalResult2.who.runId,
              running:
                resolvePlatformAnnouncementsPrincipalResult2.running ?? true,
            },
          },
    );
  }
  return items;
}

function filterPlatformAnnouncementsNoFrame(
  filterPlatformAnnouncementsNoFrame2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies: Dynamic = dataModelSchemasValue90000,
  ..._extraArguments: unknown[]
) {
  let filteredFilterPlatformAnnouncementsNoFrame: Dynamic =
    filterPlatformAnnouncementsNoFrame2.filter(
      (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
        rolldownNImport2.agent !== undefined &&
        rolldownNImport2.agent.running !== false &&
        (resolvePlatformApiAndAuthExternal(rolldownNImport2.channel) ||
          resolvePlatformApiAndAuthInternal(rolldownNImport2.channel)),
    );
  if (filteredFilterPlatformAnnouncementsNoFrame.length === 0)
    return `no_frame`;
  let filteredFilteredFilterPlatformAnnouncementsNoFrame: Dynamic =
    filteredFilterPlatformAnnouncementsNoFrame.filter(
      (
        filteredFilterPlatformAnnouncementsNoFrame2?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        isPlatformAnnouncementsAgent(
          filteredFilterPlatformAnnouncementsNoFrame2,
          options,
        ),
    );
  return filteredFilteredFilterPlatformAnnouncementsNoFrame.length === 0
    ? `no_file`
    : filteredFilteredFilterPlatformAnnouncementsNoFrame.some(
          (activity?: Dynamic, ..._extraArguments: unknown[]) =>
            context - Math.min(context, activity.at) < dependencies,
        )
      ? `frame`
      : `stale`;
}

var platformAnnouncementsValue1500: number;

var platformAnnouncementsValue6000: number;

var PlatformAnnouncementsState: number[];

var resolvePlatformAnnouncementsFind: Dynamic;

function resolvePlatformAnnouncementsPictured(
  scheduler?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  let resolvePlatformAnnouncementsPicturedResult: Dynamic = null;
  let resolvePlatformAnnouncementsPicturedResult2: Dynamic = null;
  let enabled = false;
  let enabled2 = false;
  let resolvePlatformAnnouncementsPicturedResult3: Dynamic;
  let enabled3 = false;
  let items2: Dynamic = [];
  let resolvePlatformAnnouncementsPicturedResult4: Dynamic;
  let resolvePlatformAnnouncementsPicturedHandler = (
    ..._extraArguments: unknown[]
  ): undefined => {
    resolvePlatformAnnouncementsPicturedResult4 = undefined;
    let items3: Dynamic = items2;
    items2 = [];
    for (let [
      resolvePlatformAnnouncementsPicturedResult5,
      resolvePlatformAnnouncementsPicturedResult6,
      resolvePlatformAnnouncementsPicturedResult7,
    ] of items3 as Dynamic)
      scheduler.say(
        resolvePlatformAnnouncementsPicturedResult5,
        resolvePlatformAnnouncementsPicturedResult6,
        resolvePlatformAnnouncementsPicturedResult7,
      );
  };
  let schedule = (
    platformAnnouncementsPictured?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      enabled3 ||
      typeof resolvePlatformAnnouncementsPicturedResult != `number`
    )
      return;
    items2.push(
      options === undefined
        ? [platformAnnouncementsPictured]
        : context === undefined
          ? [platformAnnouncementsPictured, options]
          : [platformAnnouncementsPictured, options, context],
    );
    let difference =
      resolvePlatformAnnouncementsPicturedResult +
      platformAnnouncementsValue6000 -
      scheduler.now();
    if (difference <= 0) {
      resolvePlatformAnnouncementsPicturedHandler();
    } else {
      resolvePlatformAnnouncementsPicturedResult4 ??= scheduler.schedule(
        resolvePlatformAnnouncementsPicturedHandler,
        difference,
      );
    }
  };
  let cancel = (
    platformAnnouncementsPictured?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (!(resolvePlatformAnnouncementsPicturedResult2 !== null || enabled)) {
      resolvePlatformAnnouncementsPicturedResult2 =
        platformAnnouncementsPictured;
      if (resolvePlatformAnnouncementsPicturedResult3 !== undefined) {
        scheduler.cancel(resolvePlatformAnnouncementsPicturedResult3);
      }
      resolvePlatformAnnouncementsPicturedResult3 = undefined;
      schedule(platformAnnouncementsPictured);
    }
  };
  let cancel2 = (
    platformAnnouncementsPictured?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      enabled3 ||
      typeof resolvePlatformAnnouncementsPicturedResult != `number` ||
      enabled
    )
      return;
    let filterPlatformAnnouncementsNoFrame2 =
      filterPlatformAnnouncementsNoFrame(
        items,
        scheduler.fileId,
        scheduler.now(),
      );
    if (resolvePlatformAnnouncementsPicturedResult2 !== null) {
      if (
        filterPlatformAnnouncementsNoFrame2 === `frame` &&
        resolvePlatformAnnouncementsPicturedResult2 !== `frame`
      ) {
        enabled2 = true;
      }
      return;
    }
    if (
      filterPlatformAnnouncementsNoFrame2 === `frame` ||
      platformAnnouncementsPictured
    ) {
      cancel(filterPlatformAnnouncementsNoFrame2);
    }
  };
  return {
    pictured(
      platformAnnouncementsPictured?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (!(enabled3 || resolvePlatformAnnouncementsPicturedResult !== null)) {
        if (platformAnnouncementsPictured < 1) {
          resolvePlatformAnnouncementsPicturedResult = false;
          return;
        }
        resolvePlatformAnnouncementsPicturedResult = scheduler.now();
        cancel2(false);
        if (resolvePlatformAnnouncementsPicturedResult2 === null) {
          resolvePlatformAnnouncementsPicturedResult3 = scheduler.schedule(
            (..._extraArguments: unknown[]): undefined => {
              resolvePlatformAnnouncementsPicturedResult3 = undefined;
              cancel2(true);
            },
            platformAnnouncementsValue1500,
          );
        }
      }
    },
    frames(
      platformAnnouncementsPictured?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      items = platformAnnouncementsPictured;
      cancel2(false);
    },
    landed(..._extraArguments: unknown[]): undefined {
      if (resolvePlatformAnnouncementsPicturedResult === null) {
        resolvePlatformAnnouncementsPicturedResult = false;
      }
      if (
        !(
          enabled3 ||
          typeof resolvePlatformAnnouncementsPicturedResult != `number` ||
          enabled ||
          resolvePlatformAnnouncementsPicturedResult2 === `frame` ||
          resolvePlatformAnnouncementsPicturedResult2 === `inferred` ||
          enabled2
        )
      ) {
        enabled = true;
        if (resolvePlatformAnnouncementsPicturedResult3 !== undefined) {
          scheduler.cancel(resolvePlatformAnnouncementsPicturedResult3);
        }
        resolvePlatformAnnouncementsPicturedResult3 = undefined;
        schedule(
          `late`,
          Math.max(
            0,
            scheduler.now() - resolvePlatformAnnouncementsPicturedResult,
          ),
        );
      }
    },
    inferred(
      platformAnnouncementsPictured?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        enabled3 ||
        typeof resolvePlatformAnnouncementsPicturedResult != `number` ||
        resolvePlatformAnnouncementsPicturedResult2 !== null ||
        enabled
      )
        return;
      let filterPlatformAnnouncementsNoFrame2 =
        filterPlatformAnnouncementsNoFrame(
          items,
          scheduler.fileId,
          scheduler.now(),
        );
      resolvePlatformAnnouncementsPicturedResult2 = `inferred`;
      if (resolvePlatformAnnouncementsPicturedResult3 !== undefined) {
        scheduler.cancel(resolvePlatformAnnouncementsPicturedResult3);
      }
      resolvePlatformAnnouncementsPicturedResult3 = undefined;
      schedule(
        `inferred`,
        platformAnnouncementsPictured,
        filterPlatformAnnouncementsNoFrame2,
      );
    },
    dispose(..._extraArguments: unknown[]): undefined {
      enabled3 = true;
      items2 = [];
      if (resolvePlatformAnnouncementsPicturedResult3 !== undefined) {
        scheduler.cancel(resolvePlatformAnnouncementsPicturedResult3);
      }
      resolvePlatformAnnouncementsPicturedResult3 = undefined;
      if (resolvePlatformAnnouncementsPicturedResult4 !== undefined) {
        scheduler.cancel(resolvePlatformAnnouncementsPicturedResult4);
      }
      resolvePlatformAnnouncementsPicturedResult4 = undefined;
    },
  };
}

var PlatformAnnouncementsPagesPendingFirstSeenV1: string;

function resolvePlatformAnnouncementsFloor(
  platformAnnouncementsFloor?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  try {
    if (platformAnnouncementsFloor == null) return null;
    let total = PlatformAnnouncementsPagesPendingFirstSeenV1 + options;
    let floor = Math.floor(context);
    let item: Dynamic = platformAnnouncementsFloor.getItem(total);
    if (item !== null) {
      let number2 = Number(item);
      if (!Number.isSafeInteger(number2) || number2 <= 0) return null;
      if (!(number2 > floor + 6e4)) return number2;
    }
    return floor > 0
      ? (platformAnnouncementsFloor.setItem(total, String(floor)),
        platformAnnouncementsFloor.getItem(total) === String(floor)
          ? floor
          : null)
      : null;
  } catch {
    return null;
  }
}

function resolvePlatformAnnouncementsPictured2(
  scheduler?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  let resolvePlatformAnnouncementsPictured2Result: Dynamic = null;
  let resolvePlatformAnnouncementsPictured2Result2: Dynamic;
  let cancel = (..._extraArguments: unknown[]): undefined => {
    resolvePlatformAnnouncementsPictured2Result = false;
    if (resolvePlatformAnnouncementsPictured2Result2 !== undefined) {
      scheduler.cancel(resolvePlatformAnnouncementsPictured2Result2);
    }
    resolvePlatformAnnouncementsPictured2Result2 = undefined;
  };
  let filterPlatformAnnouncementsNoFrame2 = (..._extraArguments: unknown[]) =>
    filterPlatformAnnouncementsNoFrame(
      items,
      scheduler.fileId,
      scheduler.now(),
    ) === `frame`;
  let stand = (..._extraArguments: unknown[]): undefined => {
    if (typeof resolvePlatformAnnouncementsPictured2Result != `number`) return;
    let resolvePlatformAnnouncementsPictured2Result3 =
      resolvePlatformAnnouncementsPictured2Result;
    cancel();
    if (filterPlatformAnnouncementsNoFrame2()) return;
    let now: Dynamic = scheduler.now();
    let firstSeenAt: Dynamic = scheduler.firstSeenAt(now);
    if (!(firstSeenAt === null || now - Math.min(now, firstSeenAt) >= 9e4)) {
      if (scheduler.stand(firstSeenAt)) {
        scheduler.say(
          Math.max(
            0,
            scheduler.now() - resolvePlatformAnnouncementsPictured2Result3,
          ),
        );
      }
    }
  };
  return {
    pictured(
      platformAnnouncementsPictured2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (resolvePlatformAnnouncementsPictured2Result === null) {
        if (
          platformAnnouncementsPictured2 < 1 ||
          !scheduler.on() ||
          filterPlatformAnnouncementsNoFrame2()
        ) {
          resolvePlatformAnnouncementsPictured2Result = false;
          return;
        }
        resolvePlatformAnnouncementsPictured2Result = scheduler.now();
        resolvePlatformAnnouncementsPictured2Result2 = scheduler.schedule(
          (..._extraArguments: unknown[]): undefined => {
            resolvePlatformAnnouncementsPictured2Result2 = undefined;
            stand();
          },
          300,
        );
      }
    },
    frames(
      platformAnnouncementsPictured2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      items = platformAnnouncementsPictured2;
      if (
        typeof resolvePlatformAnnouncementsPictured2Result == `number` &&
        filterPlatformAnnouncementsNoFrame2()
      ) {
        cancel();
      }
    },
    landed(..._extraArguments: unknown[]): undefined {
      cancel();
    },
    dispose(..._extraArguments: unknown[]): undefined {
      cancel();
    },
  };
}

function resolvePlatformAnnouncementsSess(
  actor?: Dynamic,
  contributor?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return actor.sess !== null &&
    actor.sess !== `` &&
    actor.sess === contributor.sess
    ? true
    : contributor.viewerId === null
      ? contributor.email === ``
        ? actor.sess === null || actor.sess === ``
          ? actor.opId !== null &&
            actor.opId !== `` &&
            contributor.sentOp(actor.opId)
          : false
        : contributor.sameEmail(actor.principal, contributor.email)
      : actor.principal === contributor.viewerId;
}

var PlatformAnnouncementsLdocSrOnly: string;

var PlatformAnnouncementsStyles: string;

var PlatformAnnouncementsState2: string;

var PlatformAnnouncementsState3: string;

var PlatformAnnouncementsObject: string;

var PlatformAnnouncementsDataLdocAnnouncer: string;

var platformAnnouncementsWeakMap: Dynamic;

function resolvePlatformAnnouncementsTrim(
  platformAnnouncementsTrim?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let trimmedReplace = String(platformAnnouncementsTrim)
    .replace(/\s+/g, ` `)
    .trim();
  let trimmedReplace2: Dynamic = Array.from<Dynamic>(trimmedReplace);
  return trimmedReplace2.length > 120
    ? trimmedReplace2.slice(0, 119).join(``).trimEnd() + `…`
    : trimmedReplace;
}

function updatePlatformAnnouncementsTimers(
  updatePlatformAnnouncementsTimers2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let platformAnnouncementsWeakMapEntry: Dynamic =
    platformAnnouncementsWeakMap.get(updatePlatformAnnouncementsTimers2);
  if (platformAnnouncementsWeakMapEntry) {
    platformAnnouncementsWeakMapEntry.reattach(options.where);
    return platformAnnouncementsWeakMapEntry.announcer;
  }
  let { timers: options2 }: Dynamic = options;
  let where: Dynamic = options.where ?? updatePlatformAnnouncementsTimers2.body;
  let coalesceMs: Dynamic = options.coalesceMs ?? 150;
  let lingerMs: Dynamic = options.lingerMs ?? 5e3;
  let element: Dynamic =
    updatePlatformAnnouncementsTimers2.createElement(`div`);
  element.setAttribute(PlatformAnnouncementsDataLdocAnnouncer, ``);
  element.className = PlatformAnnouncementsLdocSrOnly;
  element.setAttribute(`style`, PlatformAnnouncementsState2);
  let append: Dynamic = (
    updatePlatformAnnouncementsTimers3?: Dynamic,
    options3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let element2: Dynamic =
      updatePlatformAnnouncementsTimers2.createElement(`div`);
    element2.setAttribute(`role`, updatePlatformAnnouncementsTimers3);
    element2.setAttribute(`aria-live`, options3);
    element2.setAttribute(`aria-atomic`, `true`);
    element2.setAttribute(`style`, PlatformAnnouncementsStyles);
    element.append(element2);
    return {
      el: element2,
      queue: [],
      speaking: false,
      timer: undefined,
      linger: undefined,
      lastSet: ``,
    };
  };
  let record2: Dynamic = {
    polite: append(`status`, `polite`),
    assertive: append(`alert`, `assertive`),
  };
  let append2 = (..._extraArguments: unknown[]): undefined => {
    if (!element.isConnected) {
      (where.isConnected
        ? where
        : updatePlatformAnnouncementsTimers2.body
      ).append(element);
    }
  };
  append2();
  let enabled = false;
  let append3 = (
    updatePlatformAnnouncementsTimers3?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (!enabled) {
      if (!updatePlatformAnnouncementsTimers3.queue[0]) {
        updatePlatformAnnouncementsTimers3.speaking = false;
        updatePlatformAnnouncementsTimers3.linger = options2.set(
          (..._extraArguments: unknown[]): undefined => {
            updatePlatformAnnouncementsTimers3.linger = undefined;
            if (!enabled) {
              updatePlatformAnnouncementsTimers3.el.textContent = ``;
            }
          },
          lingerMs,
        );
        return;
      }
      updatePlatformAnnouncementsTimers3.speaking = true;
      append2();
      updatePlatformAnnouncementsTimers3.el.textContent = ``;
      updatePlatformAnnouncementsTimers3.timer = options2.set(
        (..._extraArguments: unknown[]) => {
          let shift: Dynamic = updatePlatformAnnouncementsTimers3.queue.shift();
          if (enabled) return;
          if (!shift) {
            updatePlatformAnnouncementsTimers3.timer = undefined;
            return append3(updatePlatformAnnouncementsTimers3);
          }
          let label: Dynamic =
            shift.text === updatePlatformAnnouncementsTimers3.lastSet
              ? `${shift.text}\u00A0`
              : shift.text;
          updatePlatformAnnouncementsTimers3.lastSet = label;
          updatePlatformAnnouncementsTimers3.el.textContent = label;
          updatePlatformAnnouncementsTimers3.timer = options2.set(
            (..._extraArguments: unknown[]): undefined => {
              updatePlatformAnnouncementsTimers3.timer = undefined;
              append3(updatePlatformAnnouncementsTimers3);
            },
            coalesceMs,
          );
        },
        coalesceMs,
      );
    }
  };
  let append4 = (
    updatePlatformAnnouncementsTimers3?: Dynamic,
    text?: Dynamic,
    key?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (updatePlatformAnnouncementsTimers3.linger !== undefined) {
      options2.clear(updatePlatformAnnouncementsTimers3.linger);
      updatePlatformAnnouncementsTimers3.linger = undefined;
    }
    let queueItem: Dynamic =
      updatePlatformAnnouncementsTimers3.queue[
        updatePlatformAnnouncementsTimers3.queue.length - 1
      ];
    if (queueItem && key !== undefined && queueItem.key === key) {
      queueItem.text = text;
      return;
    }
    if (!(queueItem && queueItem.text === text)) {
      updatePlatformAnnouncementsTimers3.queue.push({
        text: text,
        key: key,
      });
      if (!updatePlatformAnnouncementsTimers3.speaking) {
        append3(updatePlatformAnnouncementsTimers3);
      }
    }
  };
  let announcer: Dynamic = {
    announce(
      updatePlatformAnnouncementsTimers3?: Dynamic,
      event?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (enabled) return;
      let platformAnnouncementsTrim = resolvePlatformAnnouncementsTrim(
        updatePlatformAnnouncementsTimers3,
      );
      if (platformAnnouncementsTrim !== ``) {
        append4(
          event?.assertive ? record2.assertive : record2.polite,
          platformAnnouncementsTrim,
          event?.key,
        );
      }
    },
    cancel(
      updatePlatformAnnouncementsTimers3?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (!enabled)
        for (let updatePlatformAnnouncementsTimersResult of [
          record2.polite,
          record2.assertive,
        ] as Dynamic)
          updatePlatformAnnouncementsTimersResult.queue =
            updatePlatformAnnouncementsTimersResult.queue.filter(
              (event?: Dynamic, ..._extraArguments: unknown[]) =>
                event.key !== updatePlatformAnnouncementsTimers3,
            );
    },
    destroy(..._extraArguments: unknown[]): undefined {
      enabled = true;
      for (let updatePlatformAnnouncementsTimersResult of [
        record2.polite,
        record2.assertive,
      ] as Dynamic) {
        if (updatePlatformAnnouncementsTimersResult.timer !== undefined) {
          options2.clear(updatePlatformAnnouncementsTimersResult.timer);
        }
        if (updatePlatformAnnouncementsTimersResult.linger !== undefined) {
          options2.clear(updatePlatformAnnouncementsTimersResult.linger);
        }
        updatePlatformAnnouncementsTimersResult.queue.length = 0;
      }
      element.remove();
      if (
        platformAnnouncementsWeakMap.get(updatePlatformAnnouncementsTimers2)
          ?.announcer === announcer
      ) {
        platformAnnouncementsWeakMap.delete(updatePlatformAnnouncementsTimers2);
      }
    },
  };
  platformAnnouncementsWeakMap.set(updatePlatformAnnouncementsTimers2, {
    announcer: announcer,
    reattach(
      updatePlatformAnnouncementsTimers3?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (updatePlatformAnnouncementsTimers3) {
        where = updatePlatformAnnouncementsTimers3;
      }
      append2();
    },
  });
  return announcer;
}

var getPlatformAnnouncementsValue: Dynamic;

function resolvePlatformAnnouncementsValue(
  platformAnnouncementsValue?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  getPlatformAnnouncementsValue(platformAnnouncementsValue)?.announce(
    options,
    context,
  );
}

function resolvePlatformAnnouncementsValue2(
  platformAnnouncementsValue2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  getPlatformAnnouncementsValue(platformAnnouncementsValue2)?.cancel(options);
}

var platformAnnouncementsPattern: RegExp;

var PlatformAnnouncementsDataProductWords: string;

var PlatformAnnouncementsMessage: string;

var PlatformAnnouncementsMessage2: string;

var PlatformAnnouncementsCommentPosted: string;

var PlatformAnnouncementsMessage3: string;

var PlatformAnnouncementsLive: Dynamic;

var PlatformAnnouncementsPageBug: Dynamic;

var PlatformAnnouncementsBadRequest: Dynamic;

var PlatformAnnouncementsRateLimit: Dynamic;

var isPlatformAnnouncementsFlatMap: Dynamic;

var PlatformAnnouncementsShapeMismatch: Dynamic;

var resolvePlatformAnnouncementsReplace: Dynamic;

var platformAnnouncementsSet: Dynamic;

var resolvePlatformAnnouncementsValue3: Dynamic;

var resolvePlatformAnnouncementsValue4: Dynamic;

var resolvePlatformAnnouncementsValue5: Dynamic;

var resolvePlatformAnnouncementsIssues: Dynamic;

var PlatformAnnouncementsPasteImagesLeftOut: string;

var resolvePlatformAnnouncementsValue6: (platformAnnouncementsValue6?: Dynamic, ..._extraArguments: unknown[]) => string;

var PlatformAnnouncementsPasteKeptAsText: string;

var resolvePlatformAnnouncementsValue7: Dynamic;

var PlatformAnnouncementsPasteMenusAdded: string;

var resolvePlatformAnnouncementsOneOtherItem: Dynamic;

var PlatformAnnouncementsPasteLandingGone: string;

var resolvePlatformAnnouncementsMenuItNeededWas: Dynamic;

var PlatformAnnouncementsPasteMenuLate: string;

var resolvePlatformAnnouncementsValue8: (..._extraArguments: unknown[]) => string;

var PlatformAnnouncementsPasteMakingMenus: string;

var resolvePlatformAnnouncementsValue9: (..._extraArguments: unknown[]) => string;

var resolvePlatformAnnouncementsTest: Dynamic;

var resolvePlatformAnnouncementsExec: Dynamic;

var resolvePlatformAnnouncementsGone: Dynamic;

var resolvePlatformAnnouncementsToUpperCase: Dynamic;

var platformAnnouncementsSet2: Dynamic;

var platformAnnouncementsSet3: Dynamic;

var isPlatformAnnouncementsValue: Dynamic;

var platformAnnouncementsSet4: Dynamic;

var resolvePlatformAnnouncementsValue10: Dynamic;

var resolvePlatformAnnouncementsRandomUUID: Dynamic;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializePlatformAnnouncementsStep1(): void {
  (platformAnnouncementsValue1500 = 1500);
  (platformAnnouncementsValue6000 = 6e3);
  (PlatformAnnouncementsState = [
    1e3, 2e3, 5e3, 1e4, 15e3, 2e4, 3e4, 45e3, 6e4, 65535,
  ]);
  (resolvePlatformAnnouncementsFind = (
    platformAnnouncementsFind?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    PlatformAnnouncementsState.find(
      (PlatformAnnouncementsState4?: Dynamic, ..._extraArguments: unknown[]) =>
        platformAnnouncementsFind <= PlatformAnnouncementsState4,
    ) ?? 65535);
  (PlatformAnnouncementsPagesPendingFirstSeenV1 = `pages.pendingFirstSeen.v1:`);
  (PlatformAnnouncementsLdocSrOnly = `ldoc-sr-only`);
  (PlatformAnnouncementsStyles = `-webkit-user-select:none;user-select:none`);
  (PlatformAnnouncementsState2 = `position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;overflow:hidden;clip-path:inset(50%);white-space:nowrap;${PlatformAnnouncementsStyles}`);
  (PlatformAnnouncementsState3 = `.${PlatformAnnouncementsLdocSrOnly}{${PlatformAnnouncementsState2}}`);
  (PlatformAnnouncementsObject = `object`);
  (PlatformAnnouncementsDataLdocAnnouncer = `data-ldoc-announcer`);
  (platformAnnouncementsWeakMap = new (WeakMap as Dynamic)());
  (getPlatformAnnouncementsValue = (
    platformAnnouncementsValue?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    (platformAnnouncementsValue &&
      platformAnnouncementsWeakMap.get(platformAnnouncementsValue)?.announcer) ??
    null);
  (platformAnnouncementsPattern = /^[A-Za-z0-9-]{1,35}$/);
  (PlatformAnnouncementsDataProductWords = `data-product-words`);
  (PlatformAnnouncementsMessage = `Posting…`);
  (PlatformAnnouncementsMessage2 = `Posting comment…`);
  (PlatformAnnouncementsCommentPosted = `Comment posted`);
  (PlatformAnnouncementsMessage3 = `Not posted yet — it will post when the connection is back.`);
  (PlatformAnnouncementsLive = {
    live: `Live`,
    door: `Saving over a slow link`,
    saving: `Saving…`,
    saved: `Saved`,
    unsaved: `Some text isn’t saved`,
    readonly: `Read-only`,
  });
  (PlatformAnnouncementsPageBug = {
    page_bug: `this page and the server are out of step; reload the page`,
    session_collided: `this tab fell out of step with another tab of yours; reload it`,
    "not_your_session:unknown_secret": `this tab’s editing session has expired on the server; reload the page and carry on — nothing saved is lost`,
    "not_your_session:other_principal": `this tab’s editing session belongs to another account (did you switch accounts?); reload the page to continue as you`,
    forbidden: `you do not have access to change this document; anything unsent stays on screen so you can copy it`,
    "forbidden:reader": `you do not have access to this document; ask an owner to share it with you`,
    "forbidden:editor": `you can read this document but not edit it; ask an owner for edit access`,
    "forbidden:locked": `this document is locked; nobody can edit it until an owner unlocks it`,
    "forbidden:unauthenticated": `you are signed out; sign in again (another tab is fine) and this page carries on by itself`,
    "forbidden:not_governed": `this document is not linked to the artifact it is shown in, so it is read-only here and nothing more is saved; open it from its own artifact to edit it`,
    "forbidden:cmek": `your organization’s encryption settings do not allow Claude Docs here, so this document is read-only and nothing more is saved`,
    "forbidden:not_thread_starter": `only the person who started this thread can resolve it`,
    "forbidden:not_author": `only the person who wrote this comment can edit or delete it`,
    schema_mismatch: `this page is older than the document’s format; it is read-only until you reload`,
    unknown_id: `the server does not know the place that edit names; the block is reloaded and your text re-sent`,
    "unknown_id:not_minted": `the page named a block the server has not created yet; that paste was not saved — try it again`,
    blob_unknown: `an image in that change is not available in this document, so the change was not saved`,
    "blob_unknown:paste": `an image in what you pasted is not available in this document (it was copied from another document), so nothing was pasted; paste as plain text, or add the image to this document first`,
    "kept_as_text:image": `an image in what you pasted isn't available in this document; it was kept as its description`,
    "unknown_id:not_minted:earlier_life": `a change you made just before the page reloaded could not be applied — the text it went into has since been deleted; nothing else of yours was touched`,
    "unknown_id:not_found:earlier_life": `a change you made just before the page reloaded could not be applied — the text it went into has since been deleted; nothing else of yours was touched`,
    "unknown_id:given": `someone else deleted the text you were adding to a moment ago — whatever you typed that no longer has a place is kept at the top of the page; the rest of your typing is saved where it stands`,
    block_gone: `the paragraph you were typing in was deleted by someone else; nothing you typed there is lost — it goes back in where it still can, and whatever cannot is kept above the document`,
    "block_gone:rearranged": `someone else rearranged that block a moment ago (joined it into another, or changed its list); your change was not made — look again and make it if you still mean to`,
    "block_gone:removed": `someone else removed that block a moment ago; your change to it was not made`,
    "block_gone:already": `someone else made that same change a moment before you; there is nothing more to do`,
    char_gone: `the text you edited was deleted by someone else; nothing you typed there is lost — it goes back in where it still can, and whatever cannot is kept above the document`,
    "char_gone:link": `the text you were adding a link to was deleted by someone else while the link box was open; no link was made`,
    block_gone_typing: `the paragraph you were typing in was removed by someone else; your text continues here`,
    block_gone_caret: `the paragraph your cursor was in was removed by someone else`,
    // BaoCut: 智能体改写了正在打字的段落时的提示称「the agent」，不称 Claude。
    block_swapped_typing: `The agent rewrote the paragraph you were typing in; the words you had typed there are kept in a paragraph of their own beside the agent’s new text`,
    reseat_failed: `this page lost track of part of the document and could not put it right by itself; it is read-only until you reload — everything you typed is kept`,
    "paste_plain:link": `that link is longer than a link can be (2 048 characters), so it was pasted as plain text and not made a link`,
    paste_too_large: `what you pasted is larger than a document can take in one go (over 1 MB), so nothing was pasted; paste it in parts`,
    paste_nothing_for_cell: `a table cell can only hold plain lines and lists; nothing in what you pasted could go into the cell, so nothing was pasted`,
    range_split: `the text you selected has since been split in two by another edit; select it again`,
    not_applied: `the server did not apply that; your text is re-sent from what it has`,
    id_refused: `someone else changed that spot at the same moment, so your change was not made — look again and make it if you still mean to`,
    find_none: `those words are not there any more; select the spot again and retry`,
    find_ambiguous: `those words appear more than once there; select the exact spot and try again`,
    guard_mismatch: `someone else changed that block first; your text is kept and saves again on the current version`,
    shape_mismatch: `that edit does not fit what is at that spot in the document; select it again and retry`,
    "shape_mismatch:blocks": `that edit needs whole blocks but the selection was part of a line; select the whole block and try again`,
    "shape_mismatch:inline": `that spot takes text inside a line, but whole blocks were given; paste them on a line of their own`,
    "shape_mismatch:atom": `that setting applies to a mention, date, dropdown or picture, not to plain text; nothing was changed`,
    "shape_mismatch:wrapper": `only a list or a quote can be lifted; that block is neither`,
    "shape_mismatch:same_type": `only two blocks of the same kind can be joined; change one to match first`,
    "shape_mismatch:check_list": `only an item of a checklist can carry a checkbox; make the list a checklist first (the tick was dropped)`,
    "shape_mismatch:previous_item": `the first item of a list cannot be indented — there is no item above it to hang it under`,
    "shape_mismatch:mark": `that styling cannot go on what is selected there; it was not applied`,
    "shape_mismatch:not_allowed": `a table cell can only hold plain lines and lists; that kind of block was not applied there`,
    "shape_mismatch:cols": `someone else added, removed or merged columns in that table at the same moment, so the column width was not changed; resize it again if you still mean to`,
    "shape_mismatch:not_in_list": `someone else took that line out of its list at the same moment, so the list change was not made`,
    bad_move: `a block cannot be moved inside itself; pick a spot outside it`,
    doc_too_large: `this document is at its size limit; remove something before adding more`,
    paste_unplaced: `that paste could not be placed; it is kept at the top of the page — paste it again`,
    "bad_request:anchor_kind": `comments attach to text or to table cells; select some text, or cells inside one table, and comment again`,
    "bad_at:unknown_kind:cells": `this document service cannot attach comments to table cells yet; comment on text inside a cell instead`,
    anchors_affected: `that change would leave an open comment thread with nothing to hold on to, and this document service would not let the thread go loose; resolve the thread, then make the change again`,
    too_many: `that change touches more at once than the server allows; do it in smaller parts`,
    "too_many:source": `that paste is larger than one edit may carry; paste it in parts`,
    unavailable: `the server could not save just now; your edits are kept and retry on their own`,
    busy: `the document was busy and this change could not be saved after several tries; its text is kept in the tray at the top — copy it back in`,
    server_refused: `the server could not take this change after several tries; its text is kept in the tray at the top — copy it back in, and reload the page if it keeps happening`,
    "unavailable:room": `the document is restarting on the server; your edits are kept and retry on their own`,
    "unavailable:busy": `the server is busy just now; your edits are kept and retry on their own in a moment`,
    "unavailable:rate": `too many edits just now; yours are kept and sent again in a moment`,
    "unavailable:engine": `the server cannot take this kind of content right now, so that change was not saved; its text is kept in the tray at the top — reload the page later and paste it back in`,
    offline: `the server could not be reached; your text is kept here and saves by itself when the connection is back`,
    timeout: `the server did not answer in time; try again`,
    resync: `the page fell behind the document; it was reloaded from the server and your unsent edits re-applied`,
    unsupported_edit: `that kind of edit is not supported in this editor yet; nothing was changed`,
    "unsupported_edit:composition": `that composed text could not be saved as typed; the line was redrawn from the server — check it and retype the last bit`,
    "unsupported_edit:delete_across_blocks": `deleting across paragraphs is not available here yet; delete within one paragraph at a time`,
    "unsupported_edit:unknown_block": `that paragraph is not known to the server yet; it was reloaded — try again in a moment`,
    "unsupported_edit:set": `that block is not known to the server yet, so the change to it (a tick, a heading level, a list style) was not saved; it was reloaded — do it again in a moment`,
    "unsupported_edit:set:atom_id": `that chip is not known to the server yet, so the change to it was not saved; pick it again in a moment`,
    "unsupported_edit:delete": `that deletion crossed text the server has not named yet; the paragraph was reloaded — select it and delete again`,
    "unsupported_edit:delete:kept_children": `that deletion would remove a list, a quote or an item while keeping some of what is inside it (deleting from inside a sub-list into the next item does that) — not supported here yet; nothing was changed: delete within one item, or move the sub-items out first`,
    "unsupported_edit:delete:item_lead": `a list item's first line cannot be removed on its own while the item keeps other lines; clear its text or take the item apart instead — nothing was changed`,
    "unsupported_edit:replace:item_lead": `a list item's first line cannot be replaced by several blocks while the item keeps other lines; paste below the line instead — nothing was changed`,
    "unsupported_edit:move:item_lead": `a list item's first line cannot be moved on its own to that place; move the whole item, or its other lines — nothing was changed`,
    "unsupported_edit:unwrap:item_lead": `a list item's first line cannot be taken out of the item on its own; outdent the whole item instead — nothing was changed`,
    "unsupported_edit:split": `that line break fell in a paragraph the server has not named yet; it was reloaded — press Enter again`,
    "unsupported_edit:insert": `there was no saved text to attach that typing to; the paragraph was reloaded — click into it and type again`,
    "unsupported_edit:mark": `that formatting has no saved form in this document yet; the text stays as it was`,
    "unsupported_edit:format": `that formatting has no saved form in this document yet; the text stays as it was`,
    "unsupported_edit:forward_ref": `that change leaned on a paragraph made in the same breath and not saved yet; it was reloaded — do it again in a moment`,
    "unsupported_edit:structure": `that rearrangement (indenting, outdenting, quoting or listing several blocks at once) could not be saved here yet; the blocks were put back as saved`,
    "unsupported_edit:structure:list_split": `splitting a list around other blocks is not supported here yet; the list was put back as saved`,
    "unsupported_edit:structure:duplicate_ids": `that paste repeated blocks this document already has; nothing was changed — paste it as plain text instead`,
    "unsupported_edit:replacearound": `indenting, outdenting or re-wrapping that block could not be saved here yet; it was put back as saved`,
    "unsupported_edit:no_ops": `that edit could not be put into words for the server; the paragraph was put back as saved — anything you typed is in the tray below`,
    "unsupported_edit:paste_unplaced": `that paste could not be placed among paragraphs the server knows; nothing was changed — click into a paragraph and paste again`,
    "unsupported_edit:handed_back": `the server handed that change back unread; the paragraph was put back as saved — do it again`,
    "unsupported_edit:not_editable": `the document is not open for editing here yet, so nothing was pasted or dropped; do it again once it is`,
    birth_refused: `another change in the same save was refused, so this one did not land either; it goes again with your next edit`,
    undo_blocked: `that cannot be undone any more — someone else has since changed or removed that part`,
    "undo_blocked:spent": `that can’t be undone anymore, so this undo didn’t change anything`,
    undo_refused: `that undo could not be saved, so the page shows the last saved version again — nothing you had typed was lost; anything the undo was bringing back is kept at the top of the page`,
    "undo_refused:redo": `that redo could not be saved, so the page shows the last saved version again — nothing you had typed was lost; anything the redo was bringing back is kept at the top of the page`,
    rescued: `that paragraph was removed while you were typing; your words are kept at the top of the page — copy them`,
    "rescued:own_paste": `what you typed right after pasting could not be placed while the paste was still arriving; the paste is in now and your words are kept at the top of the page — put them back where you want them`,
    "rescued:reload": `the words you typed just before the page reloaded could not be put back — their paragraph is not in the document any more; they are kept at the top of the page — copy them`,
    "rescued:reload_readonly": `this document opened read-only, so what you typed before it reloaded was not put back; it is kept at the top of the page to copy, and a reload while editable puts it back`,
    "rescued:unstaged": `the words you just typed sit in a line this page cannot yet save by place; they are also kept at the top of the page — if a reload loses them from the text, copy them from there`,
    "rescued:preseat_readonly": `this document opened read-only, so what you typed while it was loading was not added; it is kept at the top of the page — copy it`,
    "rescued:preseat_unmount": `this document was still loading when its editor had to restart, so what you typed while it was loading was not added; it is kept at the top of the page to copy`,
    "rescued:reload_end": `the words you typed just before the page reloaded were put back at the END of their paragraph — the exact spot could not be told any more; check them there`,
    not_shown: `this document could not be opened whole here, so that change from before the reload was not made blind — it is kept above the document`,
    block_changed: `someone else changed that block first; it was not deleted — look again and delete it if you still mean to`,
    "block_changed:erase": `someone else typed inside your selection — check it and delete again`,
    "block_changed:erase:foreign": `someone else typed inside your selection since you made it — their words are selected now: check them and delete again if you still mean to`,
    "block_changed:unproven": `that change could not be checked against the latest text yet — it was not made; it is selected again: press the key once more if you still mean to`,
    "block_changed:unproven:unselected": `that change could not be checked against the latest text yet — it was not made; select it and press the key once more if you still mean to`,
    "block_changed:unproven:earlier_life": `your last delete before the page reloaded did not reach the server — nothing was deleted; select it and delete again if you still mean to`,
    "block_changed:replace": `someone else changed that block first; your change was not made — look again and make it if you still mean to`,
    "block_changed:join": `someone else changed that paragraph first; the two were not joined — look again and press the key once more if you still mean to`,
    "block_changed:wrap": `someone else changed that block first; your change was not made — look again and make it if you still mean to`,
    "block_changed:unwrap": `someone else changed that block first; your change was not made — look again and make it if you still mean to`,
    "block_changed:move": `someone else changed that block first; it was not moved — look again and move it if you still mean to`,
    cells_live: `the cells you selected were changed by someone else after you selected them, so nothing was replaced or cleared; select them again to replace what is there now`,
    cell_gone: `that cell moved or was removed while the menu was open; right-click it again`,
    table_refused: `that table change could not be made at that cell; right-click the cell and try again`,
    chip_gone: `that chip was removed or changed while the menu was open, so nothing was done; right-click it again if it is still there`,
    copy_failed: `the browser would not copy from that menu; the chip is selected — press ⌘C (Ctrl+C elsewhere) to copy it`,
    heading_gone: `that heading was removed or emptied while the menu was open, so no link was copied; right-click it again if it is still there`,
    gesture_undone: `that edit could not be made just now and was undone here — nothing else changed; do it again if you still mean to`,
    frozen: `this paragraph could not be saved; it shows the server’s text again and your words are kept at the top of the page — it takes typing once it has caught up`,
    dead_input: `your typing is not landing in the document just now; the page re-read it and anything unsaved is kept at the top — click into the text and try again`,
    "dead_input:readonly": `this document is read-only just now, so typing changes nothing; anything unsent is kept at the top of the page`,
    "dead_input:refocus": `your last few keys landed outside the document; the cursor was put back into the text — check them and retype what is missing`,
    left_unsent: `this tab’s editor closed before your last edits were all sent; the words you typed are kept and are typed back in when the tab opens again, but other unsent changes (formatting, deleted or moved blocks) may not have been saved — look the tab over`,
    "dead_input:leaving": `the tab you picked was still opening — it waits for the one you left to finish saving — so your last few keys were not typed into any document; type them again once it is open`,
    "readonly:no_link": `read-only for now — saving is off on this page`,
    "readonly:viewer": `you can read this document but not edit it`,
    page_gone: `this document has been deleted or is no longer available`,
    "page_gone:unreached": `this document could not be reached, so saving has stopped — reload to try again`,
    "link_down:unreached": `can’t connect, so saving is paused. Anything not saved is only on this page, so keep it open`,
    "link_down:refusing": `the server would not take this page’s changes just now, so saving is paused — everything you type is kept here; reload the page to try again`,
    node_gone: `this tab has been deleted or is no longer available`,
  });
  (PlatformAnnouncementsBadRequest = {
    bad_request: `page_bug`,
    bad_at: `page_bug`,
    bad_find: `page_bug`,
    bad_op: `page_bug`,
    op_id_conflict: `page_bug`,
    guard_required: `page_bug`,
    engine_mismatch: `page_bug`,
    "not_your_session:label_not_secret": `page_bug`,
    not_your_session: `session_collided`,
    id_conflict: `session_collided`,
    verdict_lost: `server_refused`,
    "forbidden:role:reader": `forbidden:reader`,
    "forbidden:role:editor": `forbidden:editor`,
    unauthenticated: `forbidden:unauthenticated`,
    not_thread_starter: `forbidden:not_thread_starter`,
    not_author: `forbidden:not_author`,
    "not_allowed:not_thread_starter": `forbidden:not_thread_starter`,
    "not_allowed:not_author": `forbidden:not_author`,
    not_allowed: `forbidden`,
    "not_allowed:role:reader": `forbidden:reader`,
    "not_allowed:role:editor": `forbidden:editor`,
    "not_allowed:locked": `forbidden:locked`,
    access: `forbidden:editor`,
    read_only: `forbidden:editor`,
    gone: `block_gone`,
    absent: `unknown_id`,
    doc_ceiling: `doc_too_large`,
    id_invalid: `unknown_id`,
    index_gap: `unknown_id`,
    "shape_mismatch:listitem": `shape_mismatch:check_list`,
    bad_mark: `shape_mismatch:mark`,
    "id_invalid:count": `id_refused`,
    "id_invalid:order": `id_refused`,
    "id_refused:count": `id_refused`,
    "id_refused:order": `id_refused`,
    find_too_many: `too_many`,
    row_too_large: `too_many`,
    too_large: `doc_too_large`,
    room_unavailable: `unavailable:room`,
    ledger_unavailable: `unavailable`,
    rate_limited: `unavailable:rate`,
    http: `offline`,
    network: `offline`,
    transport: `offline`,
    unsupported: `unsupported_edit`,
    undo_conflict: `undo_blocked`,
  });
  (PlatformAnnouncementsRateLimit = {
    rate_limit: `unavailable:rate`,
    opening: `unavailable:room`,
    draining: `unavailable:room`,
    internal: `server_refused`,
    unclassified_transport: `server_refused`,
    prose_substrate: `server_refused`,
    exists: `page_bug`,
    intent_shape: `page_bug`,
    batch_shape: `page_bug`,
    value_shape: `page_bug`,
  });
  (isPlatformAnnouncementsFlatMap = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    new (Set as Dynamic)(
      [
        ...Object.keys(PlatformAnnouncementsPageBug),
        ...Object.keys(PlatformAnnouncementsBadRequest),
        ...Object.keys(PlatformAnnouncementsRateLimit),
      ]
        .filter(
          (item?: Dynamic, ..._extraArguments: unknown[]) =>
            !item.startsWith(`undo_blocked:`),
        )
        .flatMap(
          (filteredItem?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            filteredItem.split(`:`).slice(1),
        ),
    ));
  (PlatformAnnouncementsShapeMismatch = {
    shape_mismatch: `need`,
    too_many: `dim`,
    bad_request: `problem`,
  });
  (resolvePlatformAnnouncementsReplace = (
    platformAnnouncementsReplace?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    platformAnnouncementsReplace
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9:]+/g, `_`)
      .replace(/^_+|_+$/g, ``));
  (platformAnnouncementsSet = new (Set as Dynamic)([
    `unavailable:engine`,
    `forbidden:not_governed`,
    `forbidden:cmek`,
  ]));
  (resolvePlatformAnnouncementsValue3 = (
    platformAnnouncementsValue3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    PlatformAnnouncementsBadRequest[platformAnnouncementsValue3] ??
    (resolveEditorExtensionsRefusalClass()
      ? PlatformAnnouncementsRateLimit[platformAnnouncementsValue3]
      : undefined));
  (resolvePlatformAnnouncementsValue4 = (
    platformAnnouncementsValue4?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    platformAnnouncementsValue4 in PlatformAnnouncementsPageBug &&
    (!platformAnnouncementsSet.has(platformAnnouncementsValue4) ||
      resolveEditorExtensionsRefusalClass()));
  (resolvePlatformAnnouncementsValue5 = (
    platformAnnouncementsValue5?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolvePlatformAnnouncementsValue4(platformAnnouncementsValue5)
      ? platformAnnouncementsValue5
      : ((
          platformAnnouncementsValue52?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          platformAnnouncementsValue52 !== undefined &&
          resolvePlatformAnnouncementsValue4(platformAnnouncementsValue52)
            ? platformAnnouncementsValue52
            : undefined)(
          resolvePlatformAnnouncementsValue3(platformAnnouncementsValue5),
        ));
  (resolvePlatformAnnouncementsIssues = (
    platformAnnouncementsIssues?: unknown,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let platformAnnouncementsIssues2: Dynamic =
      typeof platformAnnouncementsIssues == `object` &&
      platformAnnouncementsIssues
        ? platformAnnouncementsIssues
        : undefined;
    let issueItem: Dynamic =
      Array.isArray(platformAnnouncementsIssues2?.issues) &&
      typeof platformAnnouncementsIssues2.issues[0] == `object` &&
      platformAnnouncementsIssues2.issues[0] !== null
        ? platformAnnouncementsIssues2.issues[0]
        : undefined;
    let platformAnnouncementsIssues3: Dynamic =
      typeof platformAnnouncementsIssues == `string`
        ? platformAnnouncementsIssues
        : (platformAnnouncementsIssues2?.[options] ?? issueItem?.[options]);
    return typeof platformAnnouncementsIssues3 == `string`
      ? resolvePlatformAnnouncementsReplace(platformAnnouncementsIssues3)
      : undefined;
  });
  (PlatformAnnouncementsPasteImagesLeftOut = `paste_images_left_out`);
  (resolvePlatformAnnouncementsValue6 = (
    platformAnnouncementsValue6?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    platformAnnouncementsValue6 === 1
      ? `an image in what you pasted could not be brought into this document and was left out — it is marked [image: …] where it had a description; add it from the image file itself`
      : `${platformAnnouncementsValue6} images in what you pasted could not be brought into this document and were left out — each is marked [image: …] where it had a description; add them from the image files themselves`);
  (PlatformAnnouncementsPasteKeptAsText = `paste_kept_as_text`);
  (resolvePlatformAnnouncementsValue7 = (
    platformAnnouncementsValue7?: Dynamic,
    options: Dynamic = 0,
    ..._extraArguments: unknown[]
  ) =>
    (platformAnnouncementsValue7 === 1
      ? `a dropdown, document reference or embed in what you pasted belongs to the document it was copied from, so it was pasted as plain text (or left out, if it showed no text)`
      : `${platformAnnouncementsValue7} dropdowns, document references or embeds in what you pasted belong to the document they were copied from, so they were pasted as plain text (or left out, where they showed no text)`) +
    (options > 0 ? `; and ${resolvePlatformAnnouncementsValue6(options)}` : ``));
  (PlatformAnnouncementsPasteMenusAdded = `paste_menus_added`);
  (resolvePlatformAnnouncementsOneOtherItem = (
    platformAnnouncementsOneOtherItem?: Dynamic,
    options: Dynamic = 0,
    ..._extraArguments: unknown[]
  ) =>
    (platformAnnouncementsOneOtherItem === 1
      ? `a dropdown in what you pasted uses a menu from the document it was copied from; that menu was added to this document so the dropdown keeps working`
      : `dropdowns in what you pasted use ${platformAnnouncementsOneOtherItem} menus from the document they were copied from; those menus were added to this document so the dropdowns keep working`) +
    (options > 0
      ? `; ${options === 1 ? `one other item` : `${options} other items`} from that document could not be brought over and ${options === 1 ? `was` : `were`} pasted as plain text or left out`
      : ``));
  (PlatformAnnouncementsPasteLandingGone = `paste_landing_gone`);
  (resolvePlatformAnnouncementsMenuItNeededWas = (
    platformAnnouncementsMenuItNeededWas: Dynamic = 0,
    ..._extraArguments: unknown[]
  ) =>
    `the spot you pasted into was removed while the paste's dropdown menus were being added, so nothing was pasted — paste again where you want it` +
    (platformAnnouncementsMenuItNeededWas > 0
      ? ` (the ${platformAnnouncementsMenuItNeededWas === 1 ? `menu it needed was` : `${platformAnnouncementsMenuItNeededWas} menus it needed were`} already added to this document)`
      : ``));
  (PlatformAnnouncementsPasteMenuLate = `paste_menu_late`);
  (resolvePlatformAnnouncementsValue8 = (..._extraArguments: unknown[]) =>
    `a dropdown menu from the document you copied from took too long to add, so that paste used plain text; the menu has now been added to this document — paste again to get the dropdown`);
  (PlatformAnnouncementsPasteMakingMenus = `paste_making_menus`);
  (resolvePlatformAnnouncementsValue9 = (..._extraArguments: unknown[]) =>
    `adding the dropdown menus this paste uses to this document…`);
  (resolvePlatformAnnouncementsTest = (
    platformAnnouncementsTest?: Dynamic,
    options?: Dynamic,
    context?: unknown,
    ..._extraArguments: unknown[]
  ) => {
    if (
      resolvePlatformAnnouncementsReplace(options) !== platformAnnouncementsTest
    )
      return null;
    let context2 =
      typeof context == `number`
        ? context
        : typeof context == `string` && /^\d{1,6}$/.test(context)
          ? Number(context)
          : 1;
    return Number.isInteger(context2) && context2 > 0 ? context2 : 1;
  });
  (resolvePlatformAnnouncementsExec = (
    platformAnnouncementsExec?: Dynamic,
    options?: Dynamic,
    context?: unknown,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (
      resolvePlatformAnnouncementsReplace(options) !== platformAnnouncementsExec
    )
      return null;
    let match =
      typeof context == `string`
        ? /^(\d{1,6})(?:\+(\d{1,6}))?$/.exec(context)
        : null;
    return match
      ? [Math.max(1, Number(match[1])), Number(match[2] ?? 0)]
      : [
          resolvePlatformAnnouncementsTest(
            platformAnnouncementsExec,
            options,
            context,
          ) ?? 1,
          0,
        ];
  });
  (resolvePlatformAnnouncementsGone = (
    platformAnnouncementsGone?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let dataModelSchemasLaw2: Dynamic = resolveDataModelSchemasLaw2(
      platformAnnouncementsGone,
      options,
    );
    if (dataModelSchemasLaw2)
      return resolveDataModelSchemasValue25(dataModelSchemasLaw2);
    if (
      resolvePlatformAnnouncementsReplace(platformAnnouncementsGone) === `gone` &&
      resolvePlatformAnnouncementsIssues(options, `object`) === `project`
    )
      return PlatformAnnouncementsPageBug.page_gone;
    let platformAnnouncementsTest: Dynamic = resolvePlatformAnnouncementsTest(
      PlatformAnnouncementsPasteImagesLeftOut,
      platformAnnouncementsGone,
      options,
    );
    if (platformAnnouncementsTest !== null)
      return resolvePlatformAnnouncementsValue6(platformAnnouncementsTest);
    let platformAnnouncementsExec: Dynamic = resolvePlatformAnnouncementsExec(
      PlatformAnnouncementsPasteKeptAsText,
      platformAnnouncementsGone,
      options,
    );
    if (platformAnnouncementsExec !== null)
      return (resolvePlatformAnnouncementsValue7 as Dynamic)(
        ...platformAnnouncementsExec,
      );
    let platformAnnouncementsExec2: Dynamic = resolvePlatformAnnouncementsExec(
      PlatformAnnouncementsPasteMenusAdded,
      platformAnnouncementsGone,
      options,
    );
    if (platformAnnouncementsExec2 !== null)
      return (resolvePlatformAnnouncementsOneOtherItem as Dynamic)(
        ...platformAnnouncementsExec2,
      );
    if (
      resolvePlatformAnnouncementsReplace(platformAnnouncementsGone) ===
      `paste_making_menus`
    )
      return resolvePlatformAnnouncementsValue9();
    if (
      resolvePlatformAnnouncementsReplace(platformAnnouncementsGone) ===
      `paste_menu_late`
    )
      return resolvePlatformAnnouncementsValue8();
    if (
      resolvePlatformAnnouncementsReplace(platformAnnouncementsGone) ===
      `paste_landing_gone`
    )
      return resolvePlatformAnnouncementsMenuItNeededWas(
        (resolvePlatformAnnouncementsTest(
          `paste_landing_gone`,
          platformAnnouncementsGone,
          options,
        ) ?? 1) - +(options === undefined || options === `0`),
      );
    let platformAnnouncementsIssues: Dynamic =
      resolvePlatformAnnouncementsReplace(platformAnnouncementsGone) ===
        `bad_request` && typeof options == `object`
        ? resolvePlatformAnnouncementsIssues(options, `was`)
        : undefined;
    let platformAnnouncementsIssues2: Dynamic =
      platformAnnouncementsIssues !== undefined &&
      resolvePlatformAnnouncementsValue5(platformAnnouncementsIssues) !==
        undefined
        ? platformAnnouncementsIssues
        : resolvePlatformAnnouncementsReplace(platformAnnouncementsGone);
    let [items, setItems]: Dynamic = [
      resolvePlatformAnnouncementsIssues(
        options,
        PlatformAnnouncementsShapeMismatch[platformAnnouncementsIssues2] ?? `why`,
      ),
      resolvePlatformAnnouncementsIssues(options, `need`) ??
        resolvePlatformAnnouncementsIssues(options, `kind`),
    ];
    let split: Dynamic = (
      platformAnnouncementsGone2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      items &&
      ((setItems &&
        resolvePlatformAnnouncementsValue5(
          `${platformAnnouncementsGone2}:${items}:${setItems}`,
        )) ||
        resolvePlatformAnnouncementsValue5(
          `${platformAnnouncementsGone2}:${items}`,
        ) ||
        resolvePlatformAnnouncementsValue5(
          `${platformAnnouncementsGone2}:${items.split(`:`)[0]}`,
        ));
    let textParts: Dynamic =
      split(platformAnnouncementsIssues2) ||
      (resolvePlatformAnnouncementsValue5(platformAnnouncementsIssues2) !==
        undefined &&
        resolvePlatformAnnouncementsValue5(platformAnnouncementsIssues2) !==
          platformAnnouncementsIssues2 &&
        split(
          resolvePlatformAnnouncementsValue5(platformAnnouncementsIssues2),
        )) ||
      resolvePlatformAnnouncementsValue5(platformAnnouncementsIssues2);
    return textParts === undefined &&
      typeof options == `object` &&
      options &&
      options.terminal === true &&
      options.klass === `bounded`
      ? PlatformAnnouncementsPageBug.server_refused
      : textParts === undefined
        ? undefined
        : PlatformAnnouncementsPageBug[textParts];
  });
  (resolvePlatformAnnouncementsToUpperCase = (
    platformAnnouncements?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    ((platformAnnouncements2?: Dynamic, ..._extraArguments: unknown[]) =>
      `${platformAnnouncements2[0].toUpperCase()}${platformAnnouncements2.slice(1)}.`)(
      resolvePlatformAnnouncementsGone(platformAnnouncements, options) ??
        `that did not work; nothing was changed — your text is still on screen`,
    ));
  (platformAnnouncementsSet2 = new (Set as Dynamic)([
    `rescued`,
    `frozen`,
    `char_gone`,
    `content_changed`,
  ]));
  (platformAnnouncementsSet3 = new (Set as Dynamic)([
    `unsupported:no_ops`,
    `unsupported_edit:no_ops`,
    `unknown_id:given`,
  ]));
  (isPlatformAnnouncementsValue = (
    platformAnnouncementsValue?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let platformAnnouncementsReplace: Dynamic =
      resolvePlatformAnnouncementsReplace(platformAnnouncementsValue);
    if (platformAnnouncementsSet2.has(platformAnnouncementsReplace)) return true;
    let options2: Dynamic =
      typeof options == `string`
        ? options
        : resolvePlatformAnnouncementsIssues(
            options,
            PlatformAnnouncementsShapeMismatch[platformAnnouncementsReplace] ??
              `why`,
          );
    return (
      options2 !== undefined &&
      platformAnnouncementsSet3.has(`${platformAnnouncementsReplace}:${options2}`)
    );
  });
  (platformAnnouncementsSet4 = new (Set as Dynamic)([
    `cells_live`,
    `block_swapped_typing`,
    PlatformAnnouncementsPasteImagesLeftOut,
    PlatformAnnouncementsPasteKeptAsText,
    PlatformAnnouncementsPasteMenusAdded,
    PlatformAnnouncementsPasteMakingMenus,
    PlatformAnnouncementsPasteLandingGone,
    PlatformAnnouncementsPasteMenuLate,
    `paste_nothing_for_cell`,
  ]));
  (resolvePlatformAnnouncementsValue10 = (
    platformAnnouncementsValue10?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    platformAnnouncementsSet4.has(
      resolvePlatformAnnouncementsReplace(platformAnnouncementsValue10),
    ));
  (resolvePlatformAnnouncementsRandomUUID = (
    ..._extraArguments: unknown[]
  ) => crypto.randomUUID());
}

export {
  PlatformAnnouncementsCommentPosted,
  PlatformAnnouncementsDataProductWords,
  PlatformAnnouncementsLive,
  PlatformAnnouncementsMessage,
  PlatformAnnouncementsMessage2,
  PlatformAnnouncementsMessage3,
  PlatformAnnouncementsObject,
  PlatformAnnouncementsState2,
  PlatformAnnouncementsState3,
  isPlatformAnnouncementsAgent,
  isPlatformAnnouncementsFileId,
  isPlatformAnnouncementsFlatMap,
  isPlatformAnnouncementsValue,
  platformAnnouncementsPattern,
  resolvePlatformAnnouncementsFind,
  resolvePlatformAnnouncementsFloor,
  resolvePlatformAnnouncementsPictured,
  resolvePlatformAnnouncementsPictured2,
  resolvePlatformAnnouncementsPrincipal,
  resolvePlatformAnnouncementsRandomUUID,
  resolvePlatformAnnouncementsSelfRev,
  resolvePlatformAnnouncementsSess,
  resolvePlatformAnnouncementsToUpperCase,
  resolvePlatformAnnouncementsValue,
  resolvePlatformAnnouncementsValue10,
  resolvePlatformAnnouncementsValue2,
  updatePlatformAnnouncementsTimers,
};
