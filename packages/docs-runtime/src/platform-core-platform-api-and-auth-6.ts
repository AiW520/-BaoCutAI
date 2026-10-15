/** BaoCut: platform api and auth from app-core-BE6n4d7F.js. */
import type { Dynamic } from "./types";
import {
  create,
  inFrame,
  rolldownNImport,
} from "./platform-core-dependencies";
import {
  setDdUser,
  setTraceUser,
} from "./platform-core-observability-telemetry-1";
import {
  resolvePlatformFeatureFlagsValue2,
} from "./platform-core-platform-feature-flags";
import {
  resolvePlatformSessionAndSourcesMessage,
} from "./platform-core-platform-session-and-sources-1";
import {
  resolvePlatformSessionAndSourcesValue18,
} from "./platform-core-platform-session-and-sources-2";
import {
  resolveObservabilityBrowserAndOperationEventsValue17,
} from "./platform-core-observability-browser-and-operation-events-2";
import {
  api,
  resolvePlatformApiAndAuthLocalhost,
  resolvePlatformApiAndAuthValue,
} from "./platform-core-platform-api-and-auth-1";
import {
  isPlatformApiAndAuthHandoff,
  resolvePlatformApiAndAuthValue3,
} from "./platform-core-platform-api-and-auth-2";
import {
  PlatformApiAndAuthBongoPeoplePicked,
  PlatformApiAndAuthBongoPeopleSeenV2,
  PlatformApiAndAuthColor,
  PlatformApiAndAuthLabel,
  clearPlatformApiAndAuthDelete4,
  ensureStarted,
  filterPlatformApiAndAuthLabel,
  getBytesSync,
  getPlatformApiAndAuthPicked,
  installPlatformApiAndAuthLoad,
  isDeletedSync,
  isPlatformApiAndAuthDelete,
  listLiveSync,
  platformApiAndAuthMap10,
  platformApiAndAuthMap7,
  platformApiAndAuthMap8,
  platformApiAndAuthSet20,
  platformApiAndAuthState16,
  platformApiAndAuthValue09,
  platformApiAndAuthValue150,
  platformApiAndAuthValue200,
  platformApiAndAuthValue502,
  platformApiAndAuthValue60000,
  platformApiAndAuthValue8000,
  reportPresence,
  resolvePlatformApiAndAuthAntspace,
  resolvePlatformApiAndAuthExternal,
  resolvePlatformApiAndAuthHuman3,
  resolvePlatformApiAndAuthInternal,
  resolvePlatformApiAndAuthLabel,
  resolvePlatformApiAndAuthPhotoUrl,
  resolvePlatformApiAndAuthPicked,
  resolvePlatformApiAndAuthPrimeTimeout,
  resolvePlatformApiAndAuthPriming,
  resolvePlatformApiAndAuthPush2,
  resolvePlatformApiAndAuthSetItem,
  resolvePlatformApiAndAuthSplit2,
  resolvePlatformApiAndAuthValue32,
  subscribeProjectFeed,
  updatePlatformApiAndAuthLabel,
} from "./platform-core-platform-api-and-auth-5";
import {
  OpCutoverError,
  _recalcLinked,
  buildOpCtx,
  platformApiAndAuthWeakMap,
} from "./platform-core-platform-api-and-auth-7";
import {
  OT_ACK_TIMEOUT_MS,
  _ackIndex,
  _otOnReconnect,
  clearDataModelSchemasInflight,
  clearDataModelSchemasOps,
  dataModelSchemasMap,
  dataModelSchemasMap2,
  filterDataModelSchemasFilter,
  getDataModelSchemasAckTimeout,
  isDataModelSchemasArgs,
  resolveDataModelSchemasAckTimer,
  resolveDataModelSchemasAlgo,
  updateDataModelSchemasLocalRev,
} from "./platform-core-data-model-schemas-2";
import {
  useWorkbookStore,
} from "./platform-core-data-model-schemas-1";

var PlatformApiAndAuthPriming: Dynamic;

var resolvePlatformApiAndAuthToLowerCase: Dynamic;

var resolvePlatformApiAndAuthValue39: Dynamic;

var resolvePlatformApiAndAuthToLowerCase2: Dynamic;

var resolvePlatformApiAndAuthToLowerCase3: Dynamic;

var PlatformApiAndAuthBase: Dynamic;

var resolvePlatformApiAndAuthStatus2: Dynamic;

var PlatformApiAndAuthUser: Dynamic;

var platformApiAndAuthValue120000: number;

var platformApiAndAuthValue30000: number;

var platformApiAndAuthValue50003: number;

function resolvePlatformApiAndAuthCharCodeAt(
  items?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let count = 0;
  for (let index = 0; index < items.length; index++)
    count = ((count << 5) - count + items.charCodeAt(index)) | 0;
  return `hsl(${Math.abs(count) % 360} 35% 48%)`;
}

var resolvePlatformApiAndAuthAgent: (platformApiAndAuthAgent?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolvePlatformApiAndAuthHuman4: Dynamic;

var isPlatformApiAndAuthAnon: (platformApiAndAuthAnon?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolvePlatformApiAndAuthHuman5: Dynamic;

var resolvePlatformApiAndAuthChannel: Dynamic;

var resolvePlatformApiAndAuthHuman6: Dynamic;

function updatePlatformApiAndAuthWho(
  updatePlatformApiAndAuthWho2?: Dynamic,
  options?: Dynamic,
  context: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let nameOf: Dynamic = context.nameOf ?? resolvePlatformApiAndAuthHuman6;
  let lookup: Dynamic = new (Map as Dynamic)();
  for (let updatePlatformApiAndAuthWhoResult of updatePlatformApiAndAuthWho2.values() as Dynamic) {
    if (
      (updatePlatformApiAndAuthWhoResult.who.kind === `human` &&
        updatePlatformApiAndAuthWhoResult.who.self) ||
      (context.named !== undefined &&
        !context.named(updatePlatformApiAndAuthWhoResult))
    )
      continue;
    let options2: Dynamic = options(updatePlatformApiAndAuthWhoResult);
    if (options2 === undefined) continue;
    let lookupEntry: Dynamic =
      lookup.get(options2) ??
      lookup.set(options2, new (Map as Dynamic)()).get(options2);
    let who: Dynamic = resolvePlatformApiAndAuthHuman4(
      updatePlatformApiAndAuthWhoResult,
    );
    let lookupEntryEntry: Dynamic = lookupEntry.get(who);
    if (lookupEntryEntry) {
      if (
        (updatePlatformApiAndAuthWhoResult.lastWriteTs ?? 0) >
        (lookupEntryEntry.lastWriteTs ?? 0)
      ) {
        lookupEntryEntry.lastWriteTs =
          updatePlatformApiAndAuthWhoResult.lastWriteTs;
      }
      continue;
    }
    lookupEntry.set(who, {
      who: who,
      path: updatePlatformApiAndAuthWhoResult.path,
      color:
        (updatePlatformApiAndAuthWhoResult.who.kind === `human`
          ? context.colorOf?.(updatePlatformApiAndAuthWhoResult)
          : undefined) ?? updatePlatformApiAndAuthWhoResult.color,
      name: nameOf(updatePlatformApiAndAuthWhoResult),
      lastWriteTs: updatePlatformApiAndAuthWhoResult.lastWriteTs,
    });
  }
  let lookup2: Dynamic = new (Map as Dynamic)();
  for (let [
    updatePlatformApiAndAuthWhoResult,
    updatePlatformApiAndAuthWhoResult2,
  ] of lookup as Dynamic)
    lookup2.set(updatePlatformApiAndAuthWhoResult, [
      ...updatePlatformApiAndAuthWhoResult2.values(),
    ]);
  return lookup2;
}

function resolvePlatformApiAndAuthFile2(
  platformApiAndAuthFile2?: Dynamic,
  options: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  return updatePlatformApiAndAuthWho(
    platformApiAndAuthFile2,
    (
      platformApiAndAuthFile22?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      platformApiAndAuthFile22.fileRef?.object === `file`
        ? platformApiAndAuthFile22.fileRef.id
        : undefined,
    options,
  );
}

function isPlatformApiAndAuthColor(
  items?: Dynamic,
  items2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (items === items2) return true;
  if (
    items === undefined ||
    items2 === undefined ||
    items.length !== items2.length
  )
    return false;
  for (let index = 0; index < items.length; index++) {
    let itemItem: Dynamic = items[index];
    let itemItem2: Dynamic = items2[index];
    if (
      itemItem.who !== itemItem2.who ||
      itemItem.color !== itemItem2.color ||
      itemItem.name !== itemItem2.name ||
      itemItem.path !== itemItem2.path ||
      itemItem.lastWriteTs !== itemItem2.lastWriteTs
    )
      return false;
  }
  return true;
}

function updatePlatformApiAndAuthSize(
  updatePlatformApiAndAuthSize2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (updatePlatformApiAndAuthSize2 === undefined) return options;
  let matchesUpdatePlatformApiAndAuthSizeCount =
    updatePlatformApiAndAuthSize2.size === options.size;
  let lookup: Dynamic = new (Map as Dynamic)();
  for (let [
    updatePlatformApiAndAuthSizeResult,
    updatePlatformApiAndAuthSizeResult2,
  ] of options as Dynamic) {
    let updatePlatformApiAndAuthSizeEntry: Dynamic =
      updatePlatformApiAndAuthSize2.get(updatePlatformApiAndAuthSizeResult);
    if (
      isPlatformApiAndAuthColor(
        updatePlatformApiAndAuthSizeEntry,
        updatePlatformApiAndAuthSizeResult2,
      )
    ) {
      lookup.set(
        updatePlatformApiAndAuthSizeResult,
        updatePlatformApiAndAuthSizeEntry,
      );
    } else {
      matchesUpdatePlatformApiAndAuthSizeCount = false;
      lookup.set(
        updatePlatformApiAndAuthSizeResult,
        updatePlatformApiAndAuthSizeResult2,
      );
    }
  }
  return matchesUpdatePlatformApiAndAuthSizeCount
    ? updatePlatformApiAndAuthSize2
    : lookup;
}

var platformApiAndAuthState18: Dynamic;

var platformApiAndAuthState19: Dynamic;

var platformApiAndAuthState20: Dynamic;

var platformApiAndAuthState21: Dynamic;

var PlatformApiAndAuthMessage: Dynamic;

var platformApiAndAuthState22: Dynamic;

var PlatformApiAndAuthMessage2: Dynamic;

var platformApiAndAuthState23: Dynamic;

var resolvePlatformApiAndAuthFile3: Dynamic;

function resolvePlatformApiAndAuthHuman7(
  platformApiAndAuthHuman7?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let amount: Dynamic = -1 / 0;
  for (let activity of platformApiAndAuthHuman7.values() as Dynamic)
    if (
      activity.who.kind === `human` &&
      activity.at !== undefined &&
      activity.at > amount
    ) {
      amount = activity.at;
    }
  return amount;
}

var resolvePlatformApiAndAuthValue40: Dynamic;

function clearPlatformApiAndAuthHuman(
  clearPlatformApiAndAuthHuman2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  let platformApiAndAuthHuman7: Dynamic = resolvePlatformApiAndAuthHuman7(
    clearPlatformApiAndAuthHuman2,
  );
  for (let [
    clearPlatformApiAndAuthHumanResult,
    activity,
  ] of clearPlatformApiAndAuthHuman2 as Dynamic)
    if (
      !(
        activity.who.kind !== `human` ||
        resolvePlatformApiAndAuthHuman5(activity, options.myConnId)
      )
    ) {
      if (
        (options.now - activity.ts > 6e4 ||
          resolvePlatformApiAndAuthValue40(
            activity.at,
            platformApiAndAuthHuman7,
          )) &&
        clearPlatformApiAndAuthHuman2.delete(clearPlatformApiAndAuthHumanResult)
      ) {
        items.push(activity);
      }
    }
  return items;
}

function resolvePlatformApiAndAuthHuman8(
  platformApiAndAuthHuman8?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (platformApiAndAuthHuman8 === null) return null;
  let option: Dynamic = options.find(
    (rolldownRImport2?: Dynamic, ..._extraArguments: unknown[]) =>
      resolvePlatformApiAndAuthAgent(rolldownRImport2) ===
      platformApiAndAuthHuman8,
  );
  return option === undefined || option.who.kind === `human`
    ? platformApiAndAuthHuman8
    : null;
}

function updatePlatformApiAndAuthParticipants(
  updatePlatformApiAndAuthParticipants2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let now: Dynamic =
    updatePlatformApiAndAuthParticipants2.now ??
    ((..._extraArguments: unknown[]) => Date.now());
  let defer: Dynamic =
    updatePlatformApiAndAuthParticipants2.defer ??
    ((
      updatePlatformApiAndAuthParticipants3?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let globalThis2: Dynamic = globalThis;
      let requestAnimationFrame2: Dynamic =
        typeof globalThis2.requestAnimationFrame == `function`
          ? globalThis2.requestAnimationFrame(
              updatePlatformApiAndAuthParticipants3,
            )
          : undefined;
      let setTimeout2 = setTimeout(updatePlatformApiAndAuthParticipants3, 100);
      return (..._extraArguments: unknown[]): undefined => {
        if (requestAnimationFrame2 !== undefined) {
          globalThis2.cancelAnimationFrame?.(requestAnimationFrame2);
        }
        clearTimeout(setTimeout2);
      };
    });
  let updatePlatformApiAndAuthParticipantsResult: Dynamic = null;
  let items: Dynamic = [];
  let updatePlatformApiAndAuthParticipantsResult2: Dynamic = null;
  let flush = (..._extraArguments: unknown[]): undefined => {
    updatePlatformApiAndAuthParticipantsResult2?.();
    updatePlatformApiAndAuthParticipantsResult2 = null;
    if (updatePlatformApiAndAuthParticipantsResult === null) return;
    let participants: Dynamic = updatePlatformApiAndAuthParticipantsResult;
    let items2: Dynamic = items;
    updatePlatformApiAndAuthParticipantsResult = null;
    items = [];
    if (items2.length > 0) {
      updatePlatformApiAndAuthParticipants2.set({
        participants: participants,
        following: resolvePlatformApiAndAuthHuman8(
          updatePlatformApiAndAuthParticipants2.get().following,
          items2,
        ),
      });
    } else {
      updatePlatformApiAndAuthParticipants2.set({
        participants: participants,
      });
    }
  };
  let flush2 = (..._extraArguments: unknown[]): undefined => {
    if ((globalThis as Dynamic).document?.visibilityState === `hidden`) {
      flush();
    }
  };
  let document2: Dynamic = (globalThis as Dynamic).document;
  document2?.addEventListener?.(`visibilitychange`, flush2);
  return {
    onEvent: (actor?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (actor.kind === `live` || actor.kind === `recovered`) {
        updatePlatformApiAndAuthParticipantsResult2?.();
        updatePlatformApiAndAuthParticipantsResult2 =
          updatePlatformApiAndAuthParticipantsResult = null;
        let items2: Dynamic = items;
        items = [];
        let following: Dynamic =
          items2.length > 0
            ? resolvePlatformApiAndAuthHuman8(
                updatePlatformApiAndAuthParticipants2.get().following,
                items2,
              )
            : updatePlatformApiAndAuthParticipants2.get().following;
        updatePlatformApiAndAuthParticipants2.set(
          following === updatePlatformApiAndAuthParticipants2.get().following
            ? {
                participants: new (Map as Dynamic)(),
              }
            : {
                participants: new (Map as Dynamic)(),
                following: following,
              },
        );
        updatePlatformApiAndAuthParticipants2.onAttach();
        return;
      }
      if (actor.kind === `presence`) {
        let updatePlatformApiAndAuthParticipantsResult3: Dynamic =
          updatePlatformApiAndAuthParticipantsResult ??
          new (Map as Dynamic)(
            updatePlatformApiAndAuthParticipants2.get().participants,
          );
        if (
          isPlatformApiAndAuthRunId(
            updatePlatformApiAndAuthParticipantsResult3,
            actor.frame,
            {
              resolve: updatePlatformApiAndAuthParticipants2.resolve(),
              myEmail: updatePlatformApiAndAuthParticipants2.myEmail(),
              myConnId: updatePlatformApiAndAuthParticipants2.myConnId(),
              now: now,
            },
          )
        ) {
          updatePlatformApiAndAuthParticipantsResult =
            updatePlatformApiAndAuthParticipantsResult3;
          if (
            !resolvePlatformApiAndAuthChannel(
              actor.frame,
              updatePlatformApiAndAuthParticipants2.myConnId(),
            )
          ) {
            updatePlatformApiAndAuthParticipantsResult2 ??= defer(flush);
          }
        }
        return;
      }
      if (actor.kind === `presence-leave`) {
        let updatePlatformApiAndAuthParticipantsResult3: Dynamic =
          updatePlatformApiAndAuthParticipantsResult ??
          new (Map as Dynamic)(
            updatePlatformApiAndAuthParticipants2.get().participants,
          );
        let enabled = false;
        for (let updatePlatformApiAndAuthParticipantsResult4 of [
          `human:${actor.principal}#${actor.connId}`,
          `agent:${actor.principal}#${actor.connId}`,
          `xagent:${actor.principal}#${actor.connId}`,
        ] as Dynamic) {
          let updatePlatformApiAndAuthParticipantsResultEntry: Dynamic =
            updatePlatformApiAndAuthParticipantsResult3.get(
              updatePlatformApiAndAuthParticipantsResult4,
            );
          if (
            updatePlatformApiAndAuthParticipantsResultEntry !== undefined &&
            updatePlatformApiAndAuthParticipantsResult3.delete(
              updatePlatformApiAndAuthParticipantsResult4,
            )
          ) {
            items.push(updatePlatformApiAndAuthParticipantsResultEntry);
            enabled = true;
          }
        }
        if (enabled) {
          updatePlatformApiAndAuthParticipantsResult =
            updatePlatformApiAndAuthParticipantsResult3;
          updatePlatformApiAndAuthParticipantsResult2 ??= defer(flush);
        }
        return;
      }
      if (actor.kind === `revoked`) {
        updatePlatformApiAndAuthParticipantsResult2?.();
        updatePlatformApiAndAuthParticipantsResult2 =
          updatePlatformApiAndAuthParticipantsResult = null;
        items = [];
        updatePlatformApiAndAuthParticipants2.set({
          participants: new (Map as Dynamic)(),
          following: null,
        });
      }
    },
    flush: flush,
    dispose: (..._extraArguments: unknown[]): undefined => {
      flush();
      document2?.removeEventListener?.(`visibilitychange`, flush2);
    },
  };
}

function isPlatformApiAndAuthRunId(
  platformApiAndAuthRunId?: Dynamic,
  actor?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let body: Dynamic = actor.body ?? {};
  let ref: Dynamic = body.ref;
  let fileRef: Dynamic =
    ref && typeof ref.object == `string` && typeof ref.id == `string`
      ? {
          object: ref.object,
          id: ref.id,
        }
      : undefined;
  let path: Dynamic = resolvePlatformApiAndAuthFile3(fileRef, context.resolve);
  if (resolvePlatformApiAndAuthInternal(actor.channel)) {
    if (
      !actor.agent ||
      actor.agent.runId === undefined ||
      actor.agent.running === undefined
    )
      return false;
    let record2: Dynamic = {
      ...actor.agent,
      runId: actor.agent.runId,
      running: actor.agent.running,
    };
    let label2 = `agent:${actor.principal}#${actor.connId}`;
    let platformApiAndAuthRunIdEntry: Dynamic =
      platformApiAndAuthRunId.get(label2);
    let matchesKind =
      platformApiAndAuthRunIdEntry?.who.kind === `agent` &&
      platformApiAndAuthRunIdEntry.who.runId === record2.runId;
    let matchesFileRef = fileRef !== undefined && fileRef.object === `file`;
    let matchesWrite =
      record2.write === true && (path !== `` || matchesFileRef);
    platformApiAndAuthRunId.set(label2, {
      who: {
        kind: `agent`,
        ownerUid: actor.principal,
        runId: record2.runId,
        agent: record2.name,
      },
      path:
        path ||
        (matchesWrite || !matchesKind ? `` : platformApiAndAuthRunIdEntry.path),
      fileRef:
        fileRef ??
        (matchesKind ? platformApiAndAuthRunIdEntry.fileRef : undefined),
      cursor:
        fileRef === undefined
          ? matchesKind
            ? platformApiAndAuthRunIdEntry.cursor
            : undefined
          : body.cursor,
      placedAt: matchesFileRef
        ? context.now()
        : fileRef === undefined && matchesKind
          ? platformApiAndAuthRunIdEntry.placedAt
          : undefined,
      running: record2.running,
      lastWriteTs: matchesWrite
        ? context.now()
        : matchesKind
          ? platformApiAndAuthRunIdEntry.lastWriteTs
          : undefined,
      ts: context.now(),
      color: PlatformApiAndAuthColor.color,
    });
    return true;
  }
  if (resolvePlatformApiAndAuthExternal(actor.channel)) {
    if (!actor.agent) return false;
    let agent: Dynamic = actor.agent;
    let label2 = `xagent:${actor.principal}#${actor.connId}`;
    let platformApiAndAuthRunIdEntry: Dynamic =
      platformApiAndAuthRunId.get(label2);
    let matchesFileRef = fileRef !== undefined && fileRef.object === `file`;
    let matchesWrite = agent.write === true && (path !== `` || matchesFileRef);
    platformApiAndAuthRunId.set(label2, {
      who: {
        kind: `xagent`,
        ownerUid: actor.principal,
        agent: agent.name,
      },
      path:
        path ||
        (matchesWrite ? `` : (platformApiAndAuthRunIdEntry?.path ?? ``)),
      fileRef: fileRef ?? platformApiAndAuthRunIdEntry?.fileRef,
      lastWriteTs: matchesWrite
        ? context.now()
        : platformApiAndAuthRunIdEntry?.lastWriteTs,
      placedAt: matchesFileRef
        ? actor.at
        : fileRef === undefined
          ? platformApiAndAuthRunIdEntry?.placedAt
          : undefined,
      ts: actor.at,
      color: PlatformApiAndAuthColor.color,
    });
    return true;
  }
  if (!resolvePlatformApiAndAuthHuman3(actor.channel)) return false;
  let at2: Dynamic = Number.isFinite(actor.at) ? actor.at : undefined;
  if (
    resolvePlatformApiAndAuthValue40(
      at2,
      resolvePlatformApiAndAuthHuman7(platformApiAndAuthRunId),
    )
  )
    return false;
  let email: Dynamic = actor.principal;
  let label = `human:${email}#${actor.connId}`;
  let self =
    actor.connId === context.myConnId ||
    (context.myEmail !== `anon` && email.toLowerCase() === context.myEmail);
  platformApiAndAuthRunId.set(label, {
    who: {
      kind: `human`,
      uid: `${email}#${actor.connId}`,
      connId: actor.connId,
      email: email,
      self: self,
    },
    path: path,
    fileRef: fileRef,
    cursor: body.cursor,
    ts: context.now(),
    at: at2,
    color: resolvePlatformApiAndAuthCharCodeAt(
      isPlatformApiAndAuthAnon(email, actor.connId),
    ),
  });
  return true;
}

var platformApiAndAuthState24: Dynamic;

var platformApiAndAuthState25: Dynamic;

var platformApiAndAuthState26: Dynamic;

var resolvePlatformApiAndAuthRef2: (..._extraArguments: unknown[]) => undefined;

var resolvePlatformApiAndAuthValue41: (..._extraArguments: unknown[]) => undefined;

var resolvePlatformApiAndAuthValue42: (..._extraArguments: unknown[]) => undefined;

var PlatformApiAndAuthBongoPresenceConnId: string;

function resolvePlatformApiAndAuthSlice(..._extraArguments: unknown[]) {
  let randomUUIDSlice = crypto.randomUUID().slice(0, 8);
  try {
    sessionStorage.setItem(
      PlatformApiAndAuthBongoPresenceConnId,
      randomUUIDSlice,
    );
  } catch {}
  return randomUUIDSlice;
}

var PlatformApiAndAuthBongoPresenceConnIdLive: string;

var platformApiAndAuthState27: Dynamic;

function installPlatformApiAndAuthPagehide(
  ..._extraArguments: unknown[]
): Dynamic {
  if (platformApiAndAuthState27 !== undefined) return platformApiAndAuthState27;
  let installPlatformApiAndAuthPagehideResult: Dynamic = null;
  let enabled = false;
  try {
    installPlatformApiAndAuthPagehideResult = sessionStorage.getItem(
      PlatformApiAndAuthBongoPresenceConnId,
    );
    enabled =
      sessionStorage.getItem(PlatformApiAndAuthBongoPresenceConnIdLive) !==
      null;
  } catch {}
  platformApiAndAuthState27 =
    installPlatformApiAndAuthPagehideResult && !enabled
      ? installPlatformApiAndAuthPagehideResult
      : resolvePlatformApiAndAuthSlice();
  try {
    sessionStorage.setItem(PlatformApiAndAuthBongoPresenceConnIdLive, `1`);
    (globalThis as Dynamic).addEventListener?.(
      `pagehide`,
      (..._extraArguments: unknown[]): undefined => {
        try {
          sessionStorage.removeItem(PlatformApiAndAuthBongoPresenceConnIdLive);
        } catch {}
      },
    );
  } catch {}
  return platformApiAndAuthState27;
}

var PlatformApiAndAuthMessage3: Dynamic;

var resolvePlatformApiAndAuthAnon: Dynamic;

function resolvePlatformApiAndAuthEmail2(
  ..._extraArguments: unknown[]
): Dynamic {
  let platformApiAndAuthAntspace: Dynamic = resolvePlatformApiAndAuthAntspace();
  let email: Dynamic = resolvePlatformApiAndAuthAnon();
  let photoUrl: Dynamic =
    email === `anon`
      ? undefined
      : resolvePlatformApiAndAuthToLowerCase(
          PlatformApiAndAuthPriming.getState(),
          email,
        );
  return {
    email: email,
    name:
      platformApiAndAuthAntspace?.firstName ??
      platformApiAndAuthAntspace?.name ??
      email.split(`@`)[0],
    photoUrl: photoUrl,
  };
}

var PlatformApiAndAuthParticipants: Dynamic;

var PlatformApiAndAuthMUTATORS: Dynamic;

var ensureDraftLayer: Dynamic;

var getRawDirty: Dynamic;

var isDeletedPath: Dynamic;

var listRawDirty: Dynamic;

var treeListingExempt: Dynamic;

function resolvePlatformApiAndAuthValue43(
  platformApiAndAuthValue43?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return resolvePlatformApiAndAuthLocalhost(
    `/api/room/${encodeURIComponent(platformApiAndAuthValue43)}?uid=${encodeURIComponent(options)}`,
  );
}

var platformApiAndAuthMap11: Dynamic;

var platformApiAndAuthMap12: Dynamic;

var platformApiAndAuthMap13: Dynamic;

var platformApiAndAuthValue300002: number;

function isPlatformApiAndAuthSha(
  platformApiAndAuthSha?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  options.rawModel.flushSendQueue();
  let context2: Dynamic = context;
  let enabled = false;
  let label: Dynamic = `connecting`;
  let isPlatformApiAndAuthShaResult: Dynamic;
  let email: Dynamic = PlatformApiAndAuthUser.getState().user?.email;
  let installPlatformApiAndAuthPagehide2: Dynamic =
    installPlatformApiAndAuthPagehide();
  let updateDataModelSchemasLocalRev2: Dynamic = updateDataModelSchemasLocalRev(
    platformApiAndAuthSha,
  );
  updateDataModelSchemasLocalRev2.resync = (
    platformApiAndAuthSha2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    console.warn(
      `[room] OT ${platformApiAndAuthSha2} — cycling socket (reopen arm reloads)`,
      platformApiAndAuthSha,
    );
    isPlatformApiAndAuthHandoff2.cycle();
  };
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let enabled2 = false;
  let isPlatformApiAndAuthHandoff2: Dynamic = isPlatformApiAndAuthHandoff(
    resolvePlatformApiAndAuthValue43(
      platformApiAndAuthSha,
      installPlatformApiAndAuthPagehide2,
    ),
    (
      platformApiAndAuthSha2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (platformApiAndAuthSha2.t === `conn`)
        uniqueItems.add(platformApiAndAuthSha2.id);
      else if (platformApiAndAuthSha2.t === `replayed`) {
        if (enabled2) {
          enabled2 = false;
          if (_otOnReconnect(platformApiAndAuthSha)) {
            console.warn(
              `[room] reconnect with unacked ops — reloading`,
              platformApiAndAuthSha,
            );
            dataModelSchemasMap2.delete(platformApiAndAuthSha);
            isPlatformApiAndAuthShaResult?.();
            dependencies.onMismatch(isPlatformApiAndAuthHandoff2.drain());
          }
        }
      } else if (platformApiAndAuthSha2.t === `leave`) {
        options.presences.delete(platformApiAndAuthSha2.id);
        options.presenceNames.delete(platformApiAndAuthSha2.id);
        dependencies.onRemote();
      } else if (platformApiAndAuthSha2.t === `ironOp`) {
        if (typeof platformApiAndAuthSha2.atRev == `number`) {
          let updateDataModelSchemasLocalRev3: Dynamic =
            updateDataModelSchemasLocalRev(platformApiAndAuthSha);
          if (
            updateDataModelSchemasLocalRev3.localRev >= 0 &&
            platformApiAndAuthSha2.atRev >
              updateDataModelSchemasLocalRev3.localRev
          ) {
            console.warn(
              `[room] warm-reconnect rev gap → reload`,
              platformApiAndAuthSha,
              updateDataModelSchemasLocalRev3.localRev,
              platformApiAndAuthSha2.atRev,
            );
            clearDataModelSchemasInflight(platformApiAndAuthSha);
            dataModelSchemasMap2.delete(platformApiAndAuthSha);
            isPlatformApiAndAuthShaResult?.();
            dependencies.onMismatch(isPlatformApiAndAuthHandoff2.drain());
            return;
          }
          if (
            platformApiAndAuthSha2.atRev >
            updateDataModelSchemasLocalRev3.localRev
          ) {
            updateDataModelSchemasLocalRev3.localRev =
              platformApiAndAuthSha2.atRev;
          }
          resolveDataModelSchemasAckTimer(updateDataModelSchemasLocalRev3);
          getDataModelSchemasAckTimeout(platformApiAndAuthSha);
        }
        dependencies.onIronOp(platformApiAndAuthSha2.on);
      } else if (platformApiAndAuthSha2.t === `opApply`) {
        let updateDataModelSchemasLocalRev3: Dynamic =
          updateDataModelSchemasLocalRev(platformApiAndAuthSha);
        if (
          enabled2 &&
          (dataModelSchemasMap.get(platformApiAndAuthSha)?.ops.length ?? 0) > 0
        ) {
          console.warn(
            `[room] opApply with ops parked across a reconnect — reloading`,
            platformApiAndAuthSha,
          );
          enabled2 = false;
          clearDataModelSchemasInflight(platformApiAndAuthSha);
          dataModelSchemasMap2.delete(platformApiAndAuthSha);
          isPlatformApiAndAuthShaResult?.();
          isPlatformApiAndAuthHandoff2.close();
          dependencies.onMismatch([]);
          return;
        }
        let ops: Dynamic = Array.isArray(platformApiAndAuthSha2.ops)
          ? platformApiAndAuthSha2.ops
          : [];
        let tryApply: Dynamic = (
          platformApiAndAuthSha3?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => options.tryApply(platformApiAndAuthSha3);
        let evaluate: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
          !_slowPaths.has(platformApiAndAuthSha) && options.rawModel.evaluate();
        let AckIndex: Dynamic = _ackIndex(
          updateDataModelSchemasLocalRev3.inflight,
          platformApiAndAuthSha2,
          uniqueItems,
        );
        if (platformApiAndAuthSha2.resync && AckIndex >= 0) {
          console.warn(
            `[room] OT resync — baseRev off ring`,
            platformApiAndAuthSha,
          );
          clearDataModelSchemasInflight(platformApiAndAuthSha);
          dataModelSchemasMap2.delete(platformApiAndAuthSha);
          isPlatformApiAndAuthShaResult?.();
          dependencies.onMismatch(isPlatformApiAndAuthHandoff2.drain());
        } else if (AckIndex >= 0) {
          if (enabled2 && AckIndex > 0) {
            console.warn(
              `[room] ack skipped entries across an unreconciled reconnect — reloading`,
              platformApiAndAuthSha,
            );
            enabled2 = false;
            clearDataModelSchemasInflight(platformApiAndAuthSha);
            dataModelSchemasMap2.delete(platformApiAndAuthSha);
            isPlatformApiAndAuthShaResult?.();
            isPlatformApiAndAuthHandoff2.close();
            dependencies.onMismatch([]);
            return;
          }
          let [spliceSlice]: Dynamic = updateDataModelSchemasLocalRev3.inflight
            .splice(0, AckIndex + 1)
            .slice(-1);
          if (typeof platformApiAndAuthSha2.atRev == `number`) {
            updateDataModelSchemasLocalRev3.localRev =
              platformApiAndAuthSha2.atRev;
          }
          if (updateDataModelSchemasLocalRev3.inflight.length === 0) {
            enabled2 = false;
          }
          resolveDataModelSchemasAckTimer(updateDataModelSchemasLocalRev3);
          getDataModelSchemasAckTimeout(platformApiAndAuthSha);
          if (!isDataModelSchemasArgs(ops, spliceSlice.ops)) {
            console.warn(
              `[room] OT ack reconcile (server shifted ops)`,
              platformApiAndAuthSha,
            );
            try {
              for (
                let difference =
                  updateDataModelSchemasLocalRev3.inflight.length - 1;
                difference >= 0;
                difference--
              )
                tryApply(
                  updateDataModelSchemasLocalRev3.inflight[difference].inverse,
                );
              tryApply(spliceSlice.inverse);
              if (ops.length > 0) {
                tryApply(ops);
              }
              for (let isPlatformApiAndAuthShaResult3 of updateDataModelSchemasLocalRev3.inflight as Dynamic) {
                isPlatformApiAndAuthShaResult3.ops =
                  filterDataModelSchemasFilter(
                    isPlatformApiAndAuthShaResult3.ops,
                    ops,
                  );
                isPlatformApiAndAuthShaResult3.inverse = tryApply(
                  isPlatformApiAndAuthShaResult3.ops,
                ).inverse;
              }
              evaluate();
            } catch (isPlatformApiAndAuthShaResult3: Dynamic) {
              console.warn(
                `[room] OT reconcile (ack) failed`,
                platformApiAndAuthSha,
                isPlatformApiAndAuthShaResult3,
              );
            }
            resolvePlatformApiAndAuthRawModel2(options);
            options._onStructureChanged?.();
            dependencies.onRemote();
            dependencies.onData();
          }
        } else if (ops.length > 0) {
          try {
            for (
              let difference =
                updateDataModelSchemasLocalRev3.inflight.length - 1;
              difference >= 0;
              difference--
            )
              tryApply(
                updateDataModelSchemasLocalRev3.inflight[difference].inverse,
              );
            let tryApply2: Dynamic = tryApply(ops);
            if (tryApply2.err) {
              console.warn(
                `[room] remote opApply rejected by local model`,
                platformApiAndAuthSha,
                tryApply2.err,
              );
            }
            for (let isPlatformApiAndAuthShaResult3 of updateDataModelSchemasLocalRev3.inflight as Dynamic) {
              isPlatformApiAndAuthShaResult3.ops = filterDataModelSchemasFilter(
                isPlatformApiAndAuthShaResult3.ops,
                ops,
              );
              isPlatformApiAndAuthShaResult3.inverse = tryApply(
                isPlatformApiAndAuthShaResult3.ops,
              ).inverse;
            }
            evaluate();
          } catch (isPlatformApiAndAuthShaResult3: Dynamic) {
            console.warn(
              `[room] remote opApply failed`,
              platformApiAndAuthSha,
              isPlatformApiAndAuthShaResult3,
            );
          }
          if (typeof platformApiAndAuthSha2.atRev == `number`) {
            updateDataModelSchemasLocalRev3.localRev =
              platformApiAndAuthSha2.atRev;
          }
          let platformApiAndAuthWeakMapEntry: Dynamic =
            platformApiAndAuthWeakMap.get(options);
          if (platformApiAndAuthWeakMapEntry)
            for (let isPlatformApiAndAuthShaResult3 of ops as Dynamic)
              resolveDataModelSchemasAlgo(
                platformApiAndAuthWeakMapEntry,
                isPlatformApiAndAuthShaResult3,
              );
          resolvePlatformApiAndAuthRawModel2(options);
          options._onStructureChanged?.();
          dependencies.onRemote();
          dependencies.onData();
        } else if (typeof platformApiAndAuthSha2.atRev == `number`) {
          updateDataModelSchemasLocalRev3.localRev =
            platformApiAndAuthSha2.atRev;
        }
      } else if (platformApiAndAuthSha2.t === `rebase`) {
        context2 = platformApiAndAuthSha2.sha;
      } else {
        if (platformApiAndAuthSha2.t === `baseline`) {
          if (
            context2 === undefined ||
            platformApiAndAuthSha2.sha === context2
          ) {
            context2 = platformApiAndAuthSha2.sha;
          } else {
            console.warn(
              `[room] baseline mismatch ${platformApiAndAuthSha}: have ${context2} want ${platformApiAndAuthSha2.sha}`,
            );
            clearDataModelSchemasInflight(platformApiAndAuthSha);
            dataModelSchemasMap2.delete(platformApiAndAuthSha);
            isPlatformApiAndAuthShaResult?.();
            dependencies.onMismatch(isPlatformApiAndAuthHandoff2.drain());
          }
        }
      }
    },
    (
      platformApiAndAuthSha2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      label = platformApiAndAuthSha2;
      if (platformApiAndAuthSha2 !== `open`) {
        let dataModelSchemasMap2Entry: Dynamic = dataModelSchemasMap2.get(
          platformApiAndAuthSha,
        );
        if (
          dataModelSchemasMap2Entry &&
          dataModelSchemasMap2Entry === updateDataModelSchemasLocalRev2
        ) {
          resolveDataModelSchemasAckTimer(dataModelSchemasMap2Entry);
        }
      }
      if (platformApiAndAuthSha2 === `open`) {
        let enabled3 = enabled;
        enabled = true;
        enabled2 = false;
        if (enabled3) {
          options.presences.clear();
          options.presenceNames.clear();
          dependencies.onRemote();
        }
        if (
          enabled3 &&
          (dataModelSchemasMap2.get(platformApiAndAuthSha)?.inflight.length ??
            0) > 0
        ) {
          enabled2 = true;
          getDataModelSchemasAckTimeout(platformApiAndAuthSha);
        } else {
          if (dataModelSchemasMap.size) {
            clearDataModelSchemasOps();
          }
        }
      }
      dependencies.onState(platformApiAndAuthSha2);
    },
  );
  let bind: Dynamic = isPlatformApiAndAuthHandoff2.onMessage.bind(
    isPlatformApiAndAuthHandoff2,
  );
  isPlatformApiAndAuthHandoff2.onMessage = (
    platformApiAndAuthSha2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    bind(
      (
        platformApiAndAuthSha3?: unknown,
        ..._extraArguments: unknown[]
      ): undefined => {
        platformApiAndAuthSha2?.(platformApiAndAuthSha3);
        dependencies.onRemote();
        if (typeof platformApiAndAuthSha3 != `string`) {
          dependencies.onData();
        }
      },
    );
  let matchesPlatformApiAndAuthMap12Entry =
    (platformApiAndAuthMap12.get(platformApiAndAuthSha) ?? 0) === 0;
  let isPlatformApiAndAuthShaResult2: Dynamic;
  let bind2: Dynamic = isPlatformApiAndAuthHandoff2.send.bind(
    isPlatformApiAndAuthHandoff2,
  );
  isPlatformApiAndAuthHandoff2.send = (
    platformApiAndAuthSha2?: unknown,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      !(
        typeof platformApiAndAuthSha2 == `string` &&
        ((isPlatformApiAndAuthShaResult2 = platformApiAndAuthSha2),
        matchesPlatformApiAndAuthMap12Entry)
      )
    ) {
      bind2(platformApiAndAuthSha2);
    }
  };
  let emailPartItem: Dynamic = email ? email.split(`@`)[0] : undefined;
  isPlatformApiAndAuthShaResult = options.connect(
    isPlatformApiAndAuthHandoff2,
    installPlatformApiAndAuthPagehide2,
    emailPartItem,
    {
      onRemote: (..._extraArguments: unknown[]): undefined => {
        resolvePlatformApiAndAuthRawModel2(options);
        options._onStructureChanged?.();
      },
    },
  );
  return {
    sha: (..._extraArguments: unknown[]): Dynamic => context2,
    close: (..._extraArguments: unknown[]): undefined => {
      isPlatformApiAndAuthShaResult?.();
      isPlatformApiAndAuthHandoff2.close();
      let dataModelSchemasMap2Entry: Dynamic = dataModelSchemasMap2.get(
        platformApiAndAuthSha,
      );
      if (dataModelSchemasMap2Entry) {
        resolveDataModelSchemasAckTimer(dataModelSchemasMap2Entry);
      }
      dataModelSchemasMap2.delete(platformApiAndAuthSha);
      dataModelSchemasMap.delete(platformApiAndAuthSha);
    },
    send: (
      platformApiAndAuthSha2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => isPlatformApiAndAuthHandoff2.send(platformApiAndAuthSha2),
    sendControl: (
      platformApiAndAuthSha2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => bind2(platformApiAndAuthSha2),
    state: (..._extraArguments: unknown[]): Dynamic => label,
    flushDiffs: (..._extraArguments: unknown[]): Dynamic =>
      isPlatformApiAndAuthShaResult?.flushNow?.(),
    hide: (..._extraArguments: unknown[]): undefined => {
      if (!matchesPlatformApiAndAuthMap12Entry) {
        matchesPlatformApiAndAuthMap12Entry = true;
        bind2(`{"t":"hide"}`);
      }
    },
    show: (..._extraArguments: unknown[]): undefined => {
      if (matchesPlatformApiAndAuthMap12Entry) {
        matchesPlatformApiAndAuthMap12Entry = false;
        if (isPlatformApiAndAuthShaResult2) {
          bind2(isPlatformApiAndAuthShaResult2);
        }
      }
    },
  };
}

function resolvePlatformApiAndAuthSlice2(
  items?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (items == null || typeof items == `number` || typeof items == `boolean`)
    return items;
  if (typeof items == `string`)
    return items.length > 200 ? items.slice(0, 200) + `…` : items;
  try {
    let stringify = JSON.stringify(items);
    return stringify.length > 200 ? stringify.slice(0, 200) + `…` : items;
  } catch {
    return String(items).slice(0, 80);
  }
}

var MUTATORS: string[];

var _dependents: Dynamic;

var _dependsOn: Dynamic;

var updatePlatformApiAndAuthValue: (updatePlatformApiAndAuthValue2?: Dynamic, options?: Dynamic, context?: Dynamic, ..._extraArguments: unknown[]) => undefined;

var _noteDep: (NoteDep?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => undefined;

var _linkedSet: Dynamic;

var _clearOutgoingDeps: (ClearOutgoingDeps?: Dynamic, ..._extraArguments: unknown[]) => undefined;

var _rekeyDeps: (items?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => undefined;

var resolvePlatformApiAndAuthSplit3: Dynamic;

function resolvePlatformApiAndAuthRawModel2(
  platformApiAndAuthRawModel2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let rawModel: Dynamic = platformApiAndAuthRawModel2.rawModel;
  let worksheetsPropertiesCount: Dynamic =
    rawModel.getWorksheetsProperties().length;
  let selectedSheet: Dynamic = rawModel.getSelectedSheet();
  if (
    worksheetsPropertiesCount > 0 &&
    (selectedSheet >= worksheetsPropertiesCount || selectedSheet < 0)
  ) {
    rawModel.setSelectedSheet(0);
  }
}

var _byName: Dynamic;

var _slowPaths: Dynamic;

var _iterativeCount: Dynamic;

var _resolverCallLog: Dynamic;

var _resolveExternal: Dynamic;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializePlatformApiAndAuth6Step1(): void {
  (PlatformApiAndAuthPriming = create(
    (
      platformApiAndAuthPriming?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      ...resolvePlatformApiAndAuthPicked(),
      priming: false,
      photoData: {},
      settled: {},
      search: (
        platformApiAndAuthPriming2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let normalizedPlatformApiAndAuthPriming: Dynamic =
          platformApiAndAuthPriming2.toLowerCase();
        let items =
          (!inFrame() ||
            resolveObservabilityBrowserAndOperationEventsValue17()) &&
          (!normalizedPlatformApiAndAuthPriming ||
            PlatformApiAndAuthLabel.label
              .toLowerCase()
              .startsWith(normalizedPlatformApiAndAuthPriming))
            ? [PlatformApiAndAuthLabel]
            : [];
        if (!normalizedPlatformApiAndAuthPriming) return items;
        let { picked: options2, seen: options3 }: Dynamic = options();
        return resolvePlatformApiAndAuthPush2([
          items,
          options2.filter(
            (option?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              filterPlatformApiAndAuthLabel(
                option,
                normalizedPlatformApiAndAuthPriming,
              ),
          ),
          options3.filter(
            (option?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              filterPlatformApiAndAuthLabel(
                option,
                normalizedPlatformApiAndAuthPriming,
              ),
          ),
        ]).slice(0, 12);
      },
      prime: (
        platformApiAndAuthPriming2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let trimmedPlatformApiAndAuthPriming: Dynamic =
          platformApiAndAuthPriming2.trim();
        if (
          trimmedPlatformApiAndAuthPriming.length < 2 ||
          clearPlatformApiAndAuthDelete4(trimmedPlatformApiAndAuthPriming) ||
          inFrame()
        )
          return false;
        let platformApiAndAuthMap7Entry: Dynamic = platformApiAndAuthMap7.get(
          trimmedPlatformApiAndAuthPriming,
        );
        if (platformApiAndAuthMap7Entry)
          return platformApiAndAuthMap7Entry.promise;
        if (platformApiAndAuthMap7.size >= 6) return false;
        let platformApiAndAuthPrimingResult: Dynamic;
        let promise: Dynamic = new (Promise as Dynamic)(
          (resolve?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            (platformApiAndAuthPrimingResult = resolve),
        );
        let record2: Dynamic = {
          promise: promise,
        };
        record2.timer = setTimeout(
          async (..._extraArguments: unknown[]): Promise<undefined> => {
            record2.timer = undefined;
            let platformApiAndAuthValue092 = platformApiAndAuthValue09;
            try {
              let platformApiAndAuthPrimeTimeout: Dynamic =
                await resolvePlatformApiAndAuthPrimeTimeout(
                  api.people.search(
                    trimmedPlatformApiAndAuthPriming,
                    `prime`,
                    platformApiAndAuthState16,
                    {
                      silent: true,
                    },
                  ),
                  platformApiAndAuthValue8000,
                );
              let normalizedTrimmedPlatformApiAndAuthPriming: Dynamic =
                trimmedPlatformApiAndAuthPriming.toLowerCase();
              let normalizedTrimmedPlatformApiAndAuthPrimingPartItem: Dynamic =
                normalizedTrimmedPlatformApiAndAuthPriming.split(`@`)[0];
              let enabled = normalizedTrimmedPlatformApiAndAuthPriming.includes(
                `@`,
              )
                ? !platformApiAndAuthPrimeTimeout.hits.some(
                    (contributor?: Dynamic, ..._extraArguments: unknown[]) =>
                      contributor.email.toLowerCase() ===
                        normalizedTrimmedPlatformApiAndAuthPriming &&
                      !!contributor.name &&
                      contributor.name.trim().toLowerCase() !==
                        normalizedTrimmedPlatformApiAndAuthPrimingPartItem,
                  )
                : platformApiAndAuthPrimeTimeout.hits.length === 0;
              if (
                platformApiAndAuthValue092 === platformApiAndAuthValue09 &&
                isPlatformApiAndAuthDelete(
                  trimmedPlatformApiAndAuthPriming,
                  platformApiAndAuthPrimeTimeout.degraded,
                  enabled,
                )
              ) {
                platformApiAndAuthPriming(
                  (
                    platformApiAndAuthPriming3?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic => ({
                    settled: {
                      ...platformApiAndAuthPriming3.settled,
                      [trimmedPlatformApiAndAuthPriming]:
                        platformApiAndAuthPrimeTimeout.degraded
                          ? `degraded`
                          : `ok`,
                    },
                  }),
                );
              }
              if (!platformApiAndAuthPrimeTimeout.hits.length) return;
              let seen: Dynamic = updatePlatformApiAndAuthLabel(
                platformApiAndAuthPrimeTimeout.hits.map(
                  resolvePlatformApiAndAuthLabel,
                ),
                options().seen,
              );
              platformApiAndAuthPriming({
                seen: seen,
              });
              resolvePlatformApiAndAuthSetItem(
                PlatformApiAndAuthBongoPeopleSeenV2,
                seen,
                platformApiAndAuthValue200,
              );
              let platformApiAndAuthPicked: Dynamic = getPlatformApiAndAuthPicked(
                options().picked,
                platformApiAndAuthPrimeTimeout.hits,
              );
              if (platformApiAndAuthPicked.changed) {
                platformApiAndAuthPriming({
                  picked: platformApiAndAuthPicked.picked,
                });
                resolvePlatformApiAndAuthSetItem(
                  PlatformApiAndAuthBongoPeoplePicked,
                  platformApiAndAuthPicked.picked,
                  platformApiAndAuthValue502,
                );
              }
            } catch {
              if (
                platformApiAndAuthValue092 === platformApiAndAuthValue09 &&
                isPlatformApiAndAuthDelete(trimmedPlatformApiAndAuthPriming, true)
              ) {
                platformApiAndAuthPriming(
                  (
                    platformApiAndAuthPriming3?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic => ({
                    settled: {
                      ...platformApiAndAuthPriming3.settled,
                      [trimmedPlatformApiAndAuthPriming]: `degraded`,
                    },
                  }),
                );
              }
            } finally {
              platformApiAndAuthMap7.delete(trimmedPlatformApiAndAuthPriming);
              resolvePlatformApiAndAuthPriming(platformApiAndAuthPriming);
              platformApiAndAuthPrimingResult();
            }
          },
          platformApiAndAuthValue150,
        );
        platformApiAndAuthMap7.set(trimmedPlatformApiAndAuthPriming, record2);
        resolvePlatformApiAndAuthPriming(platformApiAndAuthPriming);
        return promise;
      },
      isPriming: (
        platformApiAndAuthPriming2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => platformApiAndAuthMap7.has(platformApiAndAuthPriming2.trim()),
      primePhotos: (
        platformApiAndAuthPriming2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (inFrame()) return;
        let photoData: Dynamic = options().photoData;
        let now = Date.now();
        for (let platformApiAndAuthPrimingResult of platformApiAndAuthPriming2 as Dynamic)
          if (
            !(
              !platformApiAndAuthPrimingResult.photoUrl ||
              photoData[platformApiAndAuthPrimingResult.id] ||
              platformApiAndAuthSet20.has(platformApiAndAuthPrimingResult.id) ||
              (platformApiAndAuthMap10.get(platformApiAndAuthPrimingResult.id) ??
                0) > now ||
              !platformApiAndAuthPrimingResult.photoUrl.startsWith(
                `https://lh3.googleusercontent.com/`,
              )
            )
          ) {
            platformApiAndAuthSet20.add(platformApiAndAuthPrimingResult.id);
            (async (..._extraArguments: unknown[]): Promise<undefined> => {
              try {
                let platformApiAndAuthPrimeTimeout: Dynamic =
                  await resolvePlatformApiAndAuthPrimeTimeout(
                    fetch(platformApiAndAuthPrimingResult.photoUrl, {
                      referrerPolicy: `no-referrer`,
                      redirect: `manual`,
                    }),
                    platformApiAndAuthValue8000,
                  );
                if (
                  platformApiAndAuthPrimeTimeout.type === `opaqueredirect` ||
                  !platformApiAndAuthPrimeTimeout.ok
                ) {
                  platformApiAndAuthMap10.set(
                    platformApiAndAuthPrimingResult.id,
                    Date.now() + platformApiAndAuthValue60000,
                  );
                  return;
                }
                let installPlatformApiAndAuthLoad2: Dynamic =
                  await installPlatformApiAndAuthLoad(
                    await platformApiAndAuthPrimeTimeout.blob(),
                  );
                platformApiAndAuthMap10.delete(
                  platformApiAndAuthPrimingResult.id,
                );
                platformApiAndAuthPriming(
                  (
                    platformApiAndAuthPriming3?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic => {
                    let photoData2: Dynamic = {
                      ...platformApiAndAuthPriming3.photoData,
                      [platformApiAndAuthPrimingResult.id]:
                        installPlatformApiAndAuthLoad2,
                    };
                    let photoDataKeys = Object.keys(photoData2);
                    if (photoDataKeys.length > platformApiAndAuthValue200) {
                      delete photoData2[photoDataKeys[0]];
                    }
                    return {
                      photoData: photoData2,
                    };
                  },
                );
              } catch {
                platformApiAndAuthMap10.set(
                  platformApiAndAuthPrimingResult.id,
                  Date.now() + platformApiAndAuthValue60000,
                );
              } finally {
                platformApiAndAuthSet20.delete(
                  platformApiAndAuthPrimingResult.id,
                );
              }
            })();
          }
      },
      primeExact: (
        platformApiAndAuthPriming2?: Dynamic,
        ..._extraArguments: unknown[]
      ) => {
        if (inFrame()) return Promise.resolve();
        let { picked: options2, seen: options3 }: Dynamic = options();
        let toLowerCase: Dynamic = (
          platformApiAndAuthPriming3?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => {
          let normalizedPlatformApiAndAuthPriming: Dynamic =
            platformApiAndAuthPriming3.toLowerCase();
          return (
            options2.some(
              (contributor?: Dynamic, ..._extraArguments: unknown[]) =>
                contributor.email?.toLowerCase() ===
                normalizedPlatformApiAndAuthPriming,
            ) ||
            options3.some(
              (contributor?: Dynamic, ..._extraArguments: unknown[]) =>
                contributor.email?.toLowerCase() ===
                normalizedPlatformApiAndAuthPriming,
            )
          );
        };
        let toLowerCase2: Dynamic = (
          platformApiAndAuthPriming3?: Dynamic,
          ..._extraArguments: unknown[]
        ) =>
          platformApiAndAuthMap8.get(platformApiAndAuthPriming3) === 1 / 0 &&
          !toLowerCase(platformApiAndAuthPriming3);
        let filteredItems: Dynamic = [
          ...new (Set as Dynamic)(platformApiAndAuthPriming2),
        ].filter(
          (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            item && (!clearPlatformApiAndAuthDelete4(item) || toLowerCase2(item)),
        );
        if (!filteredItems.length) return Promise.resolve();
        let platformApiAndAuthValue092 = platformApiAndAuthValue09;
        return Promise.allSettled(
          filteredItems.map(
            (filteredItem?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              resolvePlatformApiAndAuthPrimeTimeout(
                api.people.search(
                  filteredItem,
                  `primeExact`,
                  platformApiAndAuthState16,
                  {
                    silent: true,
                  },
                ),
                platformApiAndAuthValue8000,
              ),
          ),
        ).then((result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          let items: Dynamic = [];
          let record2: Dynamic = {};
          let isPlatformApiAndAuthDelete2: Dynamic = (
            platformApiAndAuthPriming3?: Dynamic,
            options4?: Dynamic,
            context?: Dynamic,
            ..._extraArguments: unknown[]
          ) =>
            platformApiAndAuthValue092 === platformApiAndAuthValue09 &&
            isPlatformApiAndAuthDelete(
              platformApiAndAuthPriming3,
              options4,
              context,
            );
          for (let [
            platformApiAndAuthPrimingResult,
            response,
          ] of result.entries() as Dynamic) {
            if (response.status !== `fulfilled`) {
              isPlatformApiAndAuthDelete2(
                filteredItems[platformApiAndAuthPrimingResult],
                true,
              );
              continue;
            }
            let normalizedFilteredItemItem: Dynamic =
              filteredItems[platformApiAndAuthPrimingResult].toLowerCase();
            let normalizedFilteredItemItemPartItem: Dynamic =
              normalizedFilteredItemItem.split(`@`)[0];
            let some: Dynamic = response.value.hits.some(
              (contributor?: Dynamic, ..._extraArguments: unknown[]) =>
                contributor.email.toLowerCase() === normalizedFilteredItemItem &&
                !!contributor.name &&
                contributor.name.trim().toLowerCase() !==
                  normalizedFilteredItemItemPartItem,
            );
            if (
              isPlatformApiAndAuthDelete2(
                filteredItems[platformApiAndAuthPrimingResult],
                response.value.degraded,
                !some,
              )
            ) {
              record2[filteredItems[platformApiAndAuthPrimingResult]] = response
                .value.degraded
                ? `degraded`
                : `ok`;
            }
            (items.push as Dynamic)(...response.value.hits);
          }
          if (Object.keys(record2).length) {
            PlatformApiAndAuthPriming.setState(
              (
                platformApiAndAuthPriming3?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => ({
                settled: {
                  ...platformApiAndAuthPriming3.settled,
                  ...record2,
                },
              }),
            );
          }
          if (!items.length) return;
          let seen: Dynamic = updatePlatformApiAndAuthLabel(
            items.map(resolvePlatformApiAndAuthLabel),
            options().seen,
          );
          platformApiAndAuthPriming({
            seen: seen,
          });
          resolvePlatformApiAndAuthSetItem(
            PlatformApiAndAuthBongoPeopleSeenV2,
            seen,
            platformApiAndAuthValue200,
          );
          let platformApiAndAuthPicked: Dynamic = getPlatformApiAndAuthPicked(
            options().picked,
            items,
          );
          if (platformApiAndAuthPicked.changed) {
            platformApiAndAuthPriming({
              picked: platformApiAndAuthPicked.picked,
            });
            resolvePlatformApiAndAuthSetItem(
              PlatformApiAndAuthBongoPeoplePicked,
              platformApiAndAuthPicked.picked,
              platformApiAndAuthValue502,
            );
          }
        });
      },
      note: (contributor?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        if (contributor.id === PlatformApiAndAuthLabel.id) return;
        let contributor2: Dynamic =
          contributor.handle || !contributor.email
            ? contributor
            : {
                ...contributor,
                handle: resolvePlatformApiAndAuthSplit2(contributor.email),
              };
        let picked: Dynamic = [
          contributor2,
          ...options().picked.filter(
            (picked2?: Dynamic, ..._extraArguments: unknown[]) =>
              picked2.id !== contributor2.id,
          ),
        ].slice(0, platformApiAndAuthValue502);
        platformApiAndAuthPriming({
          picked: picked,
        });
        resolvePlatformApiAndAuthSetItem(
          PlatformApiAndAuthBongoPeoplePicked,
          picked,
          platformApiAndAuthValue502,
        );
        if (
          !options().seen.some(
            (seen?: Dynamic, ..._extraArguments: unknown[]) =>
              seen.id === contributor2.id,
          )
        ) {
          let seen: Dynamic = [contributor2, ...options().seen].slice(
            0,
            platformApiAndAuthValue200,
          );
          platformApiAndAuthPriming({
            seen: seen,
          });
          resolvePlatformApiAndAuthSetItem(
            PlatformApiAndAuthBongoPeopleSeenV2,
            seen,
            platformApiAndAuthValue200,
          );
        }
      },
    }),
  ));
  (resolvePlatformApiAndAuthToLowerCase = (
    platformApiAndAuth?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (!options) return;
    let normalizedOptions: Dynamic = options.toLowerCase();
    for (let contributor of platformApiAndAuth.picked as Dynamic)
      if (
        contributor.email?.toLowerCase() === normalizedOptions &&
        contributor.photoUrl
      )
        return contributor.photoUrl;
    for (let contributor of platformApiAndAuth.seen as Dynamic)
      if (
        contributor.email?.toLowerCase() === normalizedOptions &&
        contributor.photoUrl
      )
        return contributor.photoUrl;
  });
  (resolvePlatformApiAndAuthValue39 = (
    platformApiAndAuthValue39?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    PlatformApiAndAuthPriming(
      (
        platformApiAndAuthValue392?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        resolvePlatformApiAndAuthToLowerCase(
          platformApiAndAuthValue392,
          platformApiAndAuthValue39,
        ),
    ));
  (resolvePlatformApiAndAuthToLowerCase2 = (
    platformApiAndAuth?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    PlatformApiAndAuthPriming(
      (platformApiAndAuth2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        if (!platformApiAndAuth) return;
        let normalizedPlatformApiAndAuth: Dynamic =
          platformApiAndAuth.toLowerCase();
        for (let contributor of platformApiAndAuth2.picked as Dynamic)
          if (
            contributor.email?.toLowerCase() === normalizedPlatformApiAndAuth &&
            contributor.dir
          )
            return contributor.dir;
        for (let contributor of platformApiAndAuth2.seen as Dynamic)
          if (
            contributor.email?.toLowerCase() === normalizedPlatformApiAndAuth &&
            contributor.dir
          )
            return contributor.dir;
      },
    ));
  (resolvePlatformApiAndAuthToLowerCase3 = (
    platformApiAndAuth?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    PlatformApiAndAuthPriming(
      (platformApiAndAuth2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        if (!platformApiAndAuth) return;
        let normalizedPlatformApiAndAuth: Dynamic =
          platformApiAndAuth.toLowerCase();
        for (let contributor of platformApiAndAuth2.picked as Dynamic)
          if (
            contributor.email?.toLowerCase() === normalizedPlatformApiAndAuth &&
            contributor.label
          )
            return contributor.label;
        for (let contributor of platformApiAndAuth2.seen as Dynamic)
          if (
            contributor.email?.toLowerCase() === normalizedPlatformApiAndAuth &&
            contributor.label
          )
            return contributor.label;
      },
    ));
  (PlatformApiAndAuthBase = {
    base: 1e3,
    cap: 3e4,
    jitter: 1e3,
    random: (..._extraArguments: unknown[]) => Math.random(),
    schedule: (
      platformApiAndAuthBase?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) => setTimeout(platformApiAndAuthBase, options),
    cancel: (platformApiAndAuthBase?: Dynamic, ..._extraArguments: unknown[]) =>
      clearTimeout(platformApiAndAuthBase),
  });
  (resolvePlatformApiAndAuthStatus2 = (
    response?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let status: Dynamic = response.status;
    return typeof status == `number`
      ? status >= 500 || status === 408 || status === 429
      : true;
  });
  (PlatformApiAndAuthUser = create(
    (
      platformApiAndAuthUser?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let platformApiAndAuthUserResult: Dynamic;
      let index = 0;
      let enabled = false;
      let enabled2 = false;
      let helloDImport2 = async (
        ..._extraArguments: unknown[]
      ): Promise<undefined> => {
        enabled = true;
        enabled2 = false;
        try {
          let user: Dynamic = await api.me(index > 0);
          index = 0;
          setTraceUser(user.id);
          setDdUser(user.id);
          resolvePlatformFeatureFlagsValue2(user.flags);
          platformApiAndAuthUser({
            user: user,
            status: `loaded`,
            error: null,
          });
          resolvePlatformApiAndAuthPhotoUrl(user.email);
        } catch (platformApiAndAuthUserResult2: Dynamic) {
          platformApiAndAuthUser({
            status: `error`,
            error: resolvePlatformSessionAndSourcesMessage(
              platformApiAndAuthUserResult2,
            ),
          });
          if (!resolvePlatformApiAndAuthStatus2(platformApiAndAuthUserResult2))
            return;
          let {
            base: PlatformApiAndAuthBase2,
            cap: PlatformApiAndAuthBase3,
            jitter: PlatformApiAndAuthBase4,
            random: PlatformApiAndAuthBase5,
            schedule: PlatformApiAndAuthBase6,
            cancel: PlatformApiAndAuthBase7,
          }: Dynamic = PlatformApiAndAuthBase;
          let total =
            Math.min(
              PlatformApiAndAuthBase3,
              PlatformApiAndAuthBase2 * 2 ** index,
            ) +
            PlatformApiAndAuthBase5() * PlatformApiAndAuthBase4;
          index++;
          PlatformApiAndAuthBase7(platformApiAndAuthUserResult);
          enabled2 = true;
          platformApiAndAuthUserResult = PlatformApiAndAuthBase6(
            (..._extraArguments: unknown[]): undefined => void helloDImport2(),
            total,
          );
        } finally {
          enabled = false;
        }
      };
      return {
        user: null,
        status: `idle`,
        error: null,
        retryNow: (..._extraArguments: unknown[]): undefined => {
          if (!(options().status !== `error` || !enabled2 || enabled)) {
            PlatformApiAndAuthBase.cancel(platformApiAndAuthUserResult);
            helloDImport2();
          }
        },
        load: async (..._extraArguments: unknown[]): Promise<undefined> => {
          if (
            !(options().status === `loading` || options().status === `loaded`)
          ) {
            if (inFrame()) {
              platformApiAndAuthUser({
                user: null,
                status: `loaded`,
                error: null,
              });
              return;
            }
            PlatformApiAndAuthBase.cancel(platformApiAndAuthUserResult);
            platformApiAndAuthUser({
              status: `loading`,
              error: null,
            });
            await helloDImport2();
          }
        },
      };
    },
  ));
  (platformApiAndAuthValue120000 = 12e4);
  (platformApiAndAuthValue30000 = 3e4);
  (platformApiAndAuthValue50003 = 5e3);
  (resolvePlatformApiAndAuthAgent = (
    platformApiAndAuthAgent?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    platformApiAndAuthAgent.who.kind === `agent`
      ? `agent:${platformApiAndAuthAgent.who.ownerUid}:${platformApiAndAuthAgent.who.agent}`
      : platformApiAndAuthAgent.who.kind === `xagent`
        ? `xagent:${platformApiAndAuthAgent.who.ownerUid}:${platformApiAndAuthAgent.who.agent}`
        : `human:${platformApiAndAuthAgent.who.uid}`);
  (resolvePlatformApiAndAuthHuman4 = (
    platformApiAndAuthHuman4?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    platformApiAndAuthHuman4.who.kind !== `human` ||
    platformApiAndAuthHuman4.who.email === `anon`
      ? resolvePlatformApiAndAuthAgent(platformApiAndAuthHuman4)
      : `human:${platformApiAndAuthHuman4.who.email.toLowerCase()}`);
  (isPlatformApiAndAuthAnon = (
    platformApiAndAuthAnon?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    !platformApiAndAuthAnon || platformApiAndAuthAnon === `anon`
      ? `human:anon#${options}`
      : `human:${platformApiAndAuthAnon.toLowerCase()}`);
  (resolvePlatformApiAndAuthHuman5 = (
    platformApiAndAuthHuman5?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    platformApiAndAuthHuman5.who.kind === `human` &&
    platformApiAndAuthHuman5.who.connId === options);
  (resolvePlatformApiAndAuthChannel = (
    platformApiAndAuthChannel?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    resolvePlatformApiAndAuthHuman3(platformApiAndAuthChannel.channel) &&
    platformApiAndAuthChannel.connId === options);
  (resolvePlatformApiAndAuthHuman6 = (
    platformApiAndAuthHuman6?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    platformApiAndAuthHuman6.who.kind === `human`
      ? platformApiAndAuthHuman6.who.email
      : platformApiAndAuthHuman6.who.agent);
  (PlatformApiAndAuthMessage = ``);
  (PlatformApiAndAuthMessage2 = ``);
  (resolvePlatformApiAndAuthFile3 = (
    platformApiAndAuthFile3?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    platformApiAndAuthFile3 !== undefined &&
    platformApiAndAuthFile3.object === `file`
      ? (options?.(platformApiAndAuthFile3) ?? ``)
      : ``);
  (resolvePlatformApiAndAuthValue40 = (
    platformApiAndAuthValue40?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    platformApiAndAuthValue40 !== undefined &&
    options - platformApiAndAuthValue40 > 6e4);
  (resolvePlatformApiAndAuthRef2 = (
    ..._extraArguments: unknown[]
  ): undefined => {
    if (platformApiAndAuthState19) {
      platformApiAndAuthState19({
        ref: platformApiAndAuthState22 ?? {
          object: `project`,
          id: PlatformApiAndAuthMessage2,
        },
        ...(platformApiAndAuthState25 !== undefined && {
          cursor: platformApiAndAuthState25,
        }),
      });
    }
  });
  (resolvePlatformApiAndAuthValue41 = (
    ..._extraArguments: unknown[]
  ): undefined => {
    if (platformApiAndAuthState26 !== undefined) {
      clearTimeout(platformApiAndAuthState26);
      platformApiAndAuthState26 = undefined;
    }
  });
  (resolvePlatformApiAndAuthValue42 = (
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      !(!platformApiAndAuthState19 || platformApiAndAuthState26 !== undefined)
    ) {
      platformApiAndAuthState26 = setTimeout(
        (..._extraArguments: unknown[]): undefined => {
          platformApiAndAuthState26 = undefined;
          resolvePlatformApiAndAuthRef2();
        },
        150,
      );
    }
  });
  (PlatformApiAndAuthBongoPresenceConnId = `bongo.presence.connId`);
  (PlatformApiAndAuthBongoPresenceConnIdLive = `bongo.presence.connId.live`);
  (PlatformApiAndAuthMessage3 = ``);
  (resolvePlatformApiAndAuthAnon = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    PlatformApiAndAuthUser.getState().user?.email ??
    resolvePlatformApiAndAuthAntspace()?.email ??
    `anon`);
  (PlatformApiAndAuthParticipants = create(
    (set2?: Dynamic, get2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
      participants: new (Map as Dynamic)(),
      following: null,
      connect: (
        platformApiAndAuthParticipants?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        platformApiAndAuthState18?.close();
        set2({
          participants: new (Map as Dynamic)(),
          following: null,
        });
        PlatformApiAndAuthMessage3 = installPlatformApiAndAuthPagehide();
        let platformApiAndAuthLocalhost = resolvePlatformApiAndAuthLocalhost(
          `/api/room/${encodeURIComponent(resolvePlatformApiAndAuthValue32(platformApiAndAuthParticipants, options))}?uid=${encodeURIComponent(PlatformApiAndAuthMessage3)}`,
        );
        let startsWith = (
          platformApiAndAuthParticipants2?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (
            platformApiAndAuthParticipants2.t === `leave` &&
            !platformApiAndAuthParticipants2.id.startsWith(`agent:`)
          ) {
            let participants: Dynamic = new (Map as Dynamic)(get2().participants);
            if (
              participants.delete(`human:${platformApiAndAuthParticipants2.id}`)
            ) {
              set2({
                participants: participants,
              });
            }
          }
        };
        let enabled = false;
        platformApiAndAuthState18 = isPlatformApiAndAuthHandoff(
          platformApiAndAuthLocalhost,
          startsWith,
          (
            platformApiAndAuthParticipants2?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (platformApiAndAuthParticipants2 === `open`) {
              if (enabled) {
                set2({
                  participants: new (Map as Dynamic)(),
                });
                if (PlatformApiAndAuthMessage3) {
                  platformApiAndAuthState18?.send(
                    JSON.stringify({
                      kind: `human`,
                      uid: PlatformApiAndAuthMessage3,
                      ...resolvePlatformApiAndAuthEmail2(),
                      path: PlatformApiAndAuthMessage,
                      scroll: platformApiAndAuthState24,
                    }),
                  );
                }
              }
              enabled = true;
            }
          },
        );
        platformApiAndAuthState18.onMessage(
          (
            platformApiAndAuthParticipants2?: unknown,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (typeof platformApiAndAuthParticipants2 != `string`) return;
            let contributor: Dynamic;
            try {
              contributor = JSON.parse(platformApiAndAuthParticipants2);
            } catch {
              return;
            }
            if (contributor.kind !== `agent` && contributor.kind !== `human`)
              return;
            let now = Date.now();
            let participants: Dynamic = new (Map as Dynamic)(get2().participants);
            if (
              contributor.kind === `agent` &&
              contributor.ownerUid &&
              contributor.runId
            ) {
              // BaoCut: 没报名字的智能体叫 Agent，不叫 Claude。
              let agent: Dynamic = contributor.agent ?? `Agent`;
              let label = `agent:${contributor.ownerUid}:${agent}`;
              let participantEntry: Dynamic = participants.get(label);
              participants.set(label, {
                who: {
                  kind: `agent`,
                  ownerUid: contributor.ownerUid,
                  runId: contributor.runId,
                  agent: agent,
                },
                path: contributor.path ?? participantEntry?.path ?? ``,
                ref:
                  contributor.ref ??
                  (contributor.path === participantEntry?.path
                    ? participantEntry?.ref
                    : undefined),
                running: contributor.running ?? participantEntry?.running ?? true,
                lastWriteTs: contributor.write
                  ? now
                  : participantEntry?.lastWriteTs,
                ts: now,
                color: PlatformApiAndAuthColor.color,
              });
            } else if (contributor.kind === `human` && contributor.uid) {
              let platformApiAndAuthAnon: Dynamic =
                resolvePlatformApiAndAuthAnon();
              let self =
                contributor.uid === PlatformApiAndAuthMessage3 ||
                (platformApiAndAuthAnon !== `anon` &&
                  !!contributor.email &&
                  contributor.email.toLowerCase() ===
                    platformApiAndAuthAnon.toLowerCase());
              let label = `human:${contributor.uid}`;
              participants.set(label, {
                who: {
                  kind: `human`,
                  uid: contributor.uid,
                  connId: contributor.uid,
                  email: contributor.email ?? contributor.uid,
                  name: contributor.name,
                  photoUrl: contributor.photoUrl,
                  self: self,
                },
                path: contributor.path ?? ``,
                scroll: contributor.scroll,
                ts: now,
                color: resolvePlatformApiAndAuthCharCodeAt(contributor.uid),
              });
            }
            set2({
              participants: participants,
            });
          },
        );
        platformApiAndAuthState21 = setInterval(
          (..._extraArguments: unknown[]): undefined => {
            let now = Date.now();
            let participants: Dynamic = get2().participants;
            let enabled2 = false;
            let participants2: Dynamic = new (Map as Dynamic)(participants);
            for (let [
              platformApiAndAuthParticipantsResult,
              platformApiAndAuthParticipantsResult2,
            ] of participants as Dynamic)
              if (
                platformApiAndAuthParticipantsResult2.who.kind === `agent`
                  ? platformApiAndAuthParticipantsResult2.running === false &&
                    now - platformApiAndAuthParticipantsResult2.ts >
                      platformApiAndAuthValue120000
                  : now - platformApiAndAuthParticipantsResult2.ts >
                    platformApiAndAuthValue30000
              ) {
                participants2.delete(platformApiAndAuthParticipantsResult);
                enabled2 = true;
              }
            if (enabled2) {
              set2({
                participants: participants2,
                following:
                  get2().following && participants2.has(get2().following)
                    ? get2().following
                    : null,
              });
            }
          },
          platformApiAndAuthValue50003,
        );
        return (..._extraArguments: unknown[]): undefined => {
          platformApiAndAuthState18?.close();
          platformApiAndAuthState18 = undefined;
          if (platformApiAndAuthState21) {
            clearInterval(platformApiAndAuthState21);
          }
          set2({
            participants: new (Map as Dynamic)(),
            following: null,
          });
        };
      },
      connectV3: (
        platformApiAndAuthParticipants?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        PlatformApiAndAuthMessage2 = platformApiAndAuthParticipants;
        platformApiAndAuthState18?.close();
        platformApiAndAuthState18 = undefined;
        platformApiAndAuthState19?.(null);
        set2({
          participants: new (Map as Dynamic)(),
          following: null,
        });
        PlatformApiAndAuthMessage3 = installPlatformApiAndAuthPagehide();
        let myEmail: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
          resolvePlatformApiAndAuthAnon().toLowerCase();
        let sendBeacon = (
          body?: Dynamic,
          options: Dynamic = false,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (resolvePlatformApiAndAuthValue3()) {
            if (body !== null) {
              reportPresence(platformApiAndAuthParticipants, {
                connId: PlatformApiAndAuthMessage3,
                body: body,
              });
            }
            return;
          }
          if (inFrame()) {
            if (body !== null) {
              reportPresence(platformApiAndAuthParticipants, {
                connId: PlatformApiAndAuthMessage3,
                body: body,
              });
            }
            return;
          }
          let platformApiAndAuthValue: Dynamic = resolvePlatformApiAndAuthValue(
            resolvePlatformSessionAndSourcesValue18(
              platformApiAndAuthParticipants,
            ),
          );
          let body2 = JSON.stringify({
            connId: PlatformApiAndAuthMessage3,
            body: body,
          });
          if (
            options &&
            typeof navigator !== "undefined" &&
            `sendBeacon` in navigator
          ) {
            navigator.sendBeacon(
              platformApiAndAuthValue,
              new Blob([body2], {
                type: `application/json`,
              }),
            );
            return;
          }
          fetch(platformApiAndAuthValue, {
            method: `POST`,
            headers: {
              "content-type": `application/json`,
            },
            body: body2,
            keepalive: body === null,
          }).catch((..._extraArguments: unknown[]): undefined => {});
        };
        platformApiAndAuthState19 = sendBeacon;
        let updatePlatformApiAndAuthParticipants2: Dynamic =
          updatePlatformApiAndAuthParticipants({
            get: get2,
            set: set2,
            myConnId: (..._extraArguments: unknown[]): Dynamic =>
              PlatformApiAndAuthMessage3,
            myEmail: myEmail,
            resolve: (..._extraArguments: unknown[]): Dynamic =>
              platformApiAndAuthState23,
            onAttach: resolvePlatformApiAndAuthRef2,
          });
        platformApiAndAuthState20 = updatePlatformApiAndAuthParticipants2.flush;
        let subscribeProjectFeed2: Dynamic = subscribeProjectFeed(
          platformApiAndAuthParticipants,
          updatePlatformApiAndAuthParticipants2.onEvent,
        );
        if (platformApiAndAuthState21) {
          clearInterval(platformApiAndAuthState21);
        }
        let setInterval2 = setInterval(
          (..._extraArguments: unknown[]): undefined => {
            updatePlatformApiAndAuthParticipants2.flush();
            let participants: Dynamic = new (Map as Dynamic)(get2().participants);
            let clearPlatformApiAndAuthHuman2: Dynamic =
              clearPlatformApiAndAuthHuman(participants, {
                myConnId: PlatformApiAndAuthMessage3,
                now: Date.now(),
              });
            if (clearPlatformApiAndAuthHuman2.length !== 0) {
              set2({
                participants: participants,
                following: resolvePlatformApiAndAuthHuman8(
                  get2().following,
                  clearPlatformApiAndAuthHuman2,
                ),
              });
            }
          },
          platformApiAndAuthValue50003,
        );
        platformApiAndAuthState21 = setInterval2;
        let sendBeacon2: Dynamic = (..._extraArguments: unknown[]) =>
          sendBeacon(null, true);
        window.addEventListener(`pagehide`, sendBeacon2);
        return (..._extraArguments: unknown[]): undefined => {
          window.removeEventListener(`pagehide`, sendBeacon2);
          clearInterval(setInterval2);
          if (platformApiAndAuthState21 === setInterval2) {
            platformApiAndAuthState21 = undefined;
          }
          sendBeacon(null);
          platformApiAndAuthState19 = undefined;
          PlatformApiAndAuthMessage2 = ``;
          platformApiAndAuthState22 = undefined;
          platformApiAndAuthState25 = undefined;
          resolvePlatformApiAndAuthValue41();
          subscribeProjectFeed2();
          updatePlatformApiAndAuthParticipants2.dispose();
          if (
            platformApiAndAuthState20 ===
            updatePlatformApiAndAuthParticipants2.flush
          ) {
            platformApiAndAuthState20 = undefined;
          }
          set2({
            participants: new (Map as Dynamic)(),
            following: null,
          });
        };
      },
      follow: (following?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        set2({
          following: following,
        }),
      registerRefResolver: (
        platformApiAndAuthParticipants?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        platformApiAndAuthState23 = platformApiAndAuthParticipants;
        platformApiAndAuthState20?.();
        let participants: Dynamic = get2().participants;
        let enabled = false;
        let participants2: Dynamic = new (Map as Dynamic)(participants);
        let normalizedPlatformApiAndAuthAnon: Dynamic =
          resolvePlatformApiAndAuthAnon().toLowerCase();
        for (let [
          platformApiAndAuthParticipantsResult,
          platformApiAndAuthParticipantsResult2,
        ] of participants as Dynamic) {
          let path: Dynamic =
            platformApiAndAuthParticipantsResult2.fileRef === undefined
              ? ``
              : resolvePlatformApiAndAuthFile3(
                  platformApiAndAuthParticipantsResult2.fileRef,
                  platformApiAndAuthParticipants,
                );
          let matchesPath =
            path !== `` && path !== platformApiAndAuthParticipantsResult2.path;
          let self =
            platformApiAndAuthParticipantsResult2.who.kind === `human` &&
            (platformApiAndAuthParticipantsResult2.who.connId ===
              PlatformApiAndAuthMessage3 ||
              (normalizedPlatformApiAndAuthAnon !== `anon` &&
                platformApiAndAuthParticipantsResult2.who.email.toLowerCase() ===
                  normalizedPlatformApiAndAuthAnon));
          let matchesKind =
            platformApiAndAuthParticipantsResult2.who.kind === `human` &&
            (platformApiAndAuthParticipantsResult2.who.self ?? false) !== self;
          if (!(!matchesPath && !matchesKind)) {
            participants2.set(platformApiAndAuthParticipantsResult, {
              ...platformApiAndAuthParticipantsResult2,
              ...(matchesPath
                ? {
                    path: path,
                  }
                : {}),
              ...(platformApiAndAuthParticipantsResult2.who.kind === `human`
                ? {
                    who: {
                      ...platformApiAndAuthParticipantsResult2.who,
                      self: self,
                    },
                  }
                : {}),
            });
            enabled = true;
          }
        }
        if (enabled) {
          set2({
            participants: participants2,
          });
        }
      },
      unregisterRefResolver: (
        platformApiAndAuthParticipants?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (platformApiAndAuthState23 === platformApiAndAuthParticipants) {
          platformApiAndAuthState23 = undefined;
        }
      },
      setCursor: (
        platformApiAndAuthParticipants?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (
          !(options !== undefined && platformApiAndAuthState22?.id !== options)
        ) {
          platformApiAndAuthState25 = platformApiAndAuthParticipants;
          resolvePlatformApiAndAuthValue42();
        }
      },
      heartbeat: (
        path?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (path !== PlatformApiAndAuthMessage) {
          platformApiAndAuthState24 = undefined;
        }
        if (options?.id !== platformApiAndAuthState22?.id) {
          platformApiAndAuthState25 = undefined;
          resolvePlatformApiAndAuthValue41();
        }
        PlatformApiAndAuthMessage = path;
        platformApiAndAuthState22 = options;
        if (platformApiAndAuthState19) {
          resolvePlatformApiAndAuthValue41();
          resolvePlatformApiAndAuthRef2();
          return;
        }
        if (!(!platformApiAndAuthState18 || !PlatformApiAndAuthMessage3)) {
          platformApiAndAuthState18.send(
            JSON.stringify({
              kind: `human`,
              uid: PlatformApiAndAuthMessage3,
              ...resolvePlatformApiAndAuthEmail2(),
              path: path,
              scroll: platformApiAndAuthState24,
            }),
          );
        }
      },
      setScroll: (scroll?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        platformApiAndAuthState24 = scroll;
        if (!platformApiAndAuthState19) {
          if (!(!platformApiAndAuthState18 || !PlatformApiAndAuthMessage3)) {
            platformApiAndAuthState18.send(
              JSON.stringify({
                kind: `human`,
                uid: PlatformApiAndAuthMessage3,
                ...resolvePlatformApiAndAuthEmail2(),
                path: PlatformApiAndAuthMessage,
                scroll: scroll,
              }),
            );
          }
        }
      },
      all: (..._extraArguments: unknown[]): Dynamic => [
        ...get2().participants.values(),
      ],
      byPath: (
        platformApiAndAuthParticipants?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        [...get2().participants.values()].filter(
          (item?: Dynamic, ..._extraArguments: unknown[]) =>
            item.path === platformApiAndAuthParticipants,
        ),
    }),
  ));
  (PlatformApiAndAuthMUTATORS = rolldownNImport({
    MUTATORS: (..._extraArguments: unknown[]) => MUTATORS,
    OT_ACK_TIMEOUT_MS: (..._extraArguments: unknown[]) => OT_ACK_TIMEOUT_MS,
    OpCutoverError: (..._extraArguments: unknown[]): Dynamic => OpCutoverError,
    _ackIndex: (..._extraArguments: unknown[]): Dynamic => _ackIndex,
    _byName: (..._extraArguments: unknown[]): Dynamic => _byName,
    _clearOutgoingDeps: (..._extraArguments: unknown[]): Dynamic =>
      _clearOutgoingDeps,
    _dependents: (..._extraArguments: unknown[]): Dynamic => _dependents,
    _dependsOn: (..._extraArguments: unknown[]): Dynamic => _dependsOn,
    _iterativeCount: (..._extraArguments: unknown[]): Dynamic => _iterativeCount,
    _linkedSet: (..._extraArguments: unknown[]): Dynamic => _linkedSet,
    _noteDep: (..._extraArguments: unknown[]): Dynamic => _noteDep,
    _otOnReconnect: (..._extraArguments: unknown[]): Dynamic => _otOnReconnect,
    _recalcLinked: (..._extraArguments: unknown[]): Dynamic => _recalcLinked,
    _rekeyDeps: (..._extraArguments: unknown[]): Dynamic => _rekeyDeps,
    _resolveExternal: (..._extraArguments: unknown[]): Dynamic =>
      _resolveExternal,
    _resolverCallLog: (..._extraArguments: unknown[]): Dynamic =>
      _resolverCallLog,
    _slowPaths: (..._extraArguments: unknown[]): Dynamic => _slowPaths,
    buildOpCtx: (..._extraArguments: unknown[]): Dynamic => buildOpCtx,
    ensureDraftLayer: (..._extraArguments: unknown[]): Dynamic =>
      ensureDraftLayer,
    getRawDirty: (..._extraArguments: unknown[]): Dynamic => getRawDirty,
    isDeletedPath: (..._extraArguments: unknown[]): Dynamic => isDeletedPath,
    listRawDirty: (..._extraArguments: unknown[]): Dynamic => listRawDirty,
    roomsEnabled: (..._extraArguments: unknown[]) => true,
    treeListingExempt: (..._extraArguments: unknown[]): Dynamic =>
      treeListingExempt,
    useWorkbookStore: (..._extraArguments: unknown[]): Dynamic =>
      useWorkbookStore,
  }));
  (ensureDraftLayer = ensureStarted);
  (getRawDirty = getBytesSync);
  (isDeletedPath = isDeletedSync);
  (listRawDirty = listLiveSync);
  (treeListingExempt = (
    treeListingExempt2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let treeListingExemptParts: Dynamic = treeListingExempt2.split(`/`);
    return (
      treeListingExemptParts.some(
        (
          treeListingExemptPart?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => treeListingExemptPart.startsWith(`.`),
      ) ||
      treeListingExemptParts[0] === `versions` ||
      treeListingExemptParts[0] === `manifest.json`
    );
  });
  (platformApiAndAuthMap11 = new (Map as Dynamic)());
  (platformApiAndAuthMap12 = new (Map as Dynamic)());
  (platformApiAndAuthMap13 = new (Map as Dynamic)());
  (platformApiAndAuthValue300002 = 3e4);
  (MUTATORS = `setUserInput.setCellValue.deleteCellContents.setCellRichText.rangeClearContents.rangeClearAll.rangeClearFormatting.replaceAll.removeDuplicates.applyNames.pasteCsvText.pasteFromClipboard.pasteSpecial.onPasteStyles.autoFillRows.autoFillColumns.insertRows.insertColumns.deleteRows.deleteColumns.moveRow.moveColumn.insertCells.deleteCells.newSheet.deleteSheet.renameSheet.moveSheet.duplicateSheet.hideSheet.unhideSheet.setSheetColor.mergeCells.unmergeCells.setFrozenRowsCount.setFrozenColumnsCount.setSplit.setColumnOutlineLevel.setRowOutlineLevel.setColumnsWidth.setRowsHeight.setAutofitColumn.setAutofitRow.applyCellStyle.updateRangeStyle.addCellStyle.deleteCellStyle.setAreaWithBorder.addConditionalFormat.removeConditionalFormat.addDxf.newDefinedName.deleteDefinedName.setDefinedNameComment.setDefinedNameHidden.setCellComment.deleteCellComment.addThreadedComment.deleteThreadedComment.resolveThreadedComment.addTable.deleteTable.addTableColumn.deleteTableColumn.setAutoFilter.clearAutoFilter.applyFilter.clearFilterColumn.setDataValidation.deleteDataValidation.setHyperlink.deleteHyperlink.addNamedSheetView.deleteNamedSheetView.createSheetView.saveCustomView.deleteCustomView.setShowGridLines.setShowHeadings.protectSheet.unprotectSheet.protectWorkbook.unprotectWorkbook.setPageSetup.addPageBreak.removePageBreak.addShapeLive.deleteShapeLive.moveDrawing.insertImageLive.deleteChart.setChartTitle.setChartAxis.setChartLegend.setChartStyle.setChartType.setChartSeries.setChartSeriesColor.setChartDataLabels.setShapeText.addSparklineGroup.deleteSparklineGroup.createPivotTable.deletePivotTable.refreshPivot.refreshAllPivots.pivotAddField.pivotMoveField.pivotRemoveField.pivotAddDataField.pivotSetAggregation.pivotSetDateGrouping.pivotSetPageFilter.pivotAddCalculatedField.setQuery.refreshQuery.deleteQuery.addScenario.deleteScenario.addCustomXmlPart.setCustomXmlPart.deleteCustomXmlPart.setCellLinkedRecord.runVbaMacro.toggleColumnGroup.toggleRowGroup.setVbaModules.sortRange.textToColumns.flashFill.agentApplyEdits.agentRunCommand.versionRestore.cleanExcessFormatting.analysisToolpak.pivotDrillDownToSheet.showScenario.goalSeek.solve.showAllData.updateConditionalFormat.updateDefinedName.setShapeZOrder.setIterativeEnabled.convertTableToRange.resizeTable.pivotSetFieldFilter.pivotSetValueFilter.pivotSetLabelFilter.pivotClearLabelFilter.pivotClearValueFilter.createChartLive.undo.redo`.split(
      `.`,
    ));
  (_dependents = new (Map as Dynamic)());
  (_dependsOn = new (Map as Dynamic)());
  (updatePlatformApiAndAuthValue = (
    updatePlatformApiAndAuthValue2?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let updatePlatformApiAndAuthValueEntry: Dynamic =
      updatePlatformApiAndAuthValue2.get(options);
    if (!updatePlatformApiAndAuthValueEntry) {
      updatePlatformApiAndAuthValue2.set(
        options,
        (updatePlatformApiAndAuthValueEntry = new (Set as Dynamic)()),
      );
    }
    updatePlatformApiAndAuthValueEntry.add(context);
  });
  (_noteDep = (
    NoteDep?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (NoteDep !== options) {
      updatePlatformApiAndAuthValue(_dependents, options, NoteDep);
      updatePlatformApiAndAuthValue(_dependsOn, NoteDep, options);
    }
  });
  (_linkedSet = (
    LinkedSet?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let uniqueItems: Dynamic = new (Set as Dynamic)([LinkedSet]);
    let items: Dynamic = [LinkedSet];
    for (; items.length; ) {
      let shift: Dynamic = items.shift();
      for (let LinkedSetResult of [_dependents, _dependsOn] as Dynamic)
        for (let LinkedSetResult2 of (LinkedSetResult.get(shift) ??
          []) as Dynamic)
          if (!uniqueItems.has(LinkedSetResult2)) {
            uniqueItems.add(LinkedSetResult2);
            items.push(LinkedSetResult2);
          }
    }
    return uniqueItems;
  });
  (_clearOutgoingDeps = (
    ClearOutgoingDeps?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    for (let ClearOutgoingDepsResult of (_dependsOn.get(ClearOutgoingDeps) ??
      []) as Dynamic)
      _dependents.get(ClearOutgoingDepsResult)?.delete(ClearOutgoingDeps);
    _dependsOn.delete(ClearOutgoingDeps);
  });
  (_rekeyDeps = (
    items?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let slice: Dynamic = (
      RekeyDeps?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      RekeyDeps.startsWith(items + `/`)
        ? options + RekeyDeps.slice(items.length)
        : RekeyDeps;
    for (let RekeyDepsResult of [_dependents, _dependsOn] as Dynamic) {
      let lookup: Dynamic = new (Map as Dynamic)();
      for (let [RekeyDepsResult2, RekeyDepsResult3] of RekeyDepsResult as Dynamic)
        lookup.set(
          slice(RekeyDepsResult2),
          new (Set as Dynamic)([...RekeyDepsResult3].map(slice)),
        );
      RekeyDepsResult.clear();
      for (let [RekeyDepsResult2, RekeyDepsResult3] of lookup as Dynamic)
        RekeyDepsResult.set(RekeyDepsResult2, RekeyDepsResult3);
    }
  });
  (resolvePlatformApiAndAuthSplit3 = (
    platformApiAndAuthSplit3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => platformApiAndAuthSplit3.split(`/`).pop());
  (_byName = new (Map as Dynamic)());
  (_slowPaths = new (Set as Dynamic)());
  (_iterativeCount = new (Map as Dynamic)());
  (_resolverCallLog = new (Map as Dynamic)());
  (_resolveExternal = (
    ResolveExternal?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    try {
      let parse: Dynamic = JSON.parse(ResolveExternal);
      let ByNameEntry: Dynamic = _byName.get(parse.book);
      if (!ByNameEntry)
        return JSON.stringify({
          err: `REF`,
        });
      let sheetIndex: Dynamic = ByNameEntry.getSheetIndex(parse.sheet);
      if (sheetIndex < 0)
        return JSON.stringify({
          err: `REF`,
        });
      let ResolveExternalResult: Dynamic;
      let ResolveExternalResult2: Dynamic;
      if (`row` in parse) {
        let cell: Dynamic = ByNameEntry.getCell(sheetIndex, parse.row, parse.col);
        ResolveExternalResult = JSON.stringify(
          cell ?? {
            e: null,
          },
        );
        ResolveExternalResult2 = `${parse.book}|${parse.sheet}|${parse.row}|${parse.col}`;
      } else {
        let rows: Dynamic = [];
        for (let r12: Dynamic = parse.r1; r12 <= parse.r2; r12++) {
          let items: Dynamic = [];
          for (let c12: Dynamic = parse.c1; c12 <= parse.c2; c12++)
            items.push(
              ByNameEntry.getCell(sheetIndex, r12, c12) ?? {
                e: null,
              },
            );
          rows.push(items);
        }
        ResolveExternalResult = JSON.stringify({
          rows: rows,
        });
        ResolveExternalResult2 = `${parse.book}|${parse.sheet}|${parse.r1}|${parse.c1}|${parse.r2}|${parse.c2}`;
      }
      _resolverCallLog.set(ResolveExternalResult2, ResolveExternalResult);
      return ResolveExternalResult;
    } catch {
      return JSON.stringify({
        err: `REF`,
      });
    }
  });
}

export {
  MUTATORS,
  PlatformApiAndAuthMUTATORS,
  PlatformApiAndAuthParticipants,
  PlatformApiAndAuthPriming,
  PlatformApiAndAuthUser,
  _byName,
  _clearOutgoingDeps,
  _dependents,
  _iterativeCount,
  _linkedSet,
  _noteDep,
  _rekeyDeps,
  _resolveExternal,
  _resolverCallLog,
  _slowPaths,
  getRawDirty,
  installPlatformApiAndAuthPagehide,
  isDeletedPath,
  isPlatformApiAndAuthAnon,
  isPlatformApiAndAuthColor,
  isPlatformApiAndAuthSha,
  listRawDirty,
  platformApiAndAuthMap11,
  platformApiAndAuthMap12,
  platformApiAndAuthMap13,
  platformApiAndAuthValue300002,
  resolvePlatformApiAndAuthAgent,
  resolvePlatformApiAndAuthAnon,
  resolvePlatformApiAndAuthCharCodeAt,
  resolvePlatformApiAndAuthFile2,
  resolvePlatformApiAndAuthHuman4,
  resolvePlatformApiAndAuthHuman5,
  resolvePlatformApiAndAuthRawModel2,
  resolvePlatformApiAndAuthSlice2,
  resolvePlatformApiAndAuthSplit3,
  resolvePlatformApiAndAuthToLowerCase,
  resolvePlatformApiAndAuthToLowerCase2,
  resolvePlatformApiAndAuthToLowerCase3,
  resolvePlatformApiAndAuthValue39,
  treeListingExempt,
  updatePlatformApiAndAuthSize,
};
