/** BaoCut: comments store from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  resolvePlatformLoadingAndStatusSize,
} from "../../platform/services/loading-and-status";
import {
  CommentsStoreFrom,
  commentsStoreValue08,
  resolveCommentsStoreValue24,
  resolveCommentsStoreValue28,
} from "./store-4";

var CommentsStoreState14: Dynamic;

var commentsStoreValue09: number;

var CommentsStoreState15: Dynamic;

function resolveCommentsStoreValue25(
  commentsStoreValue25?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  CommentsStoreState15 = commentsStoreValue25;
}

function resolveCommentsStoreValue26(
  commentsStoreValue26?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (CommentsStoreState15 !== null)
    try {
      CommentsStoreState15(commentsStoreValue26, options);
    } catch {}
}

function resolveCommentsStoreLayer(
  layer?: Dynamic,
  name?: Dynamic,
  context?: Dynamic,
  dependencies: Dynamic = Date.now(),
  ..._extraArguments: unknown[]
): undefined {
  let record2: Dynamic = {
    layer: layer,
    name: name,
    ...context,
  };
  resolveCommentsStoreValue28({
    at: dependencies,
    ev: record2,
  });
  resolveCommentsStoreValue26(record2, null);
}

function resolveCommentsStoreValue27(
  commentsStoreValue27?: Dynamic,
  options: Dynamic = Date.now(),
  ..._extraArguments: unknown[]
): undefined {
  for (let resolveCommentsStoreValue27Result of commentsStoreValue27 as Dynamic)
    if (
      !(
        typeof resolveCommentsStoreValue27Result != `object` ||
        !resolveCommentsStoreValue27Result
      )
    ) {
      resolveCommentsStoreValue28({
        at: options,
        ev: resolveCommentsStoreValue27Result,
      });
      resolveCommentsStoreValue26(
        resolveCommentsStoreValue27Result,
        commentsStoreValue27,
      );
    }
}

function resolveCommentsStoreAround(
  commentsStoreAround?: Dynamic,
  options: Dynamic = Date.now(),
  ..._extraArguments: unknown[]
): undefined {
  CommentsStoreState14 = {
    at: options,
    ev: commentsStoreAround,
    around: resolveCommentsStorePush(50),
  };
  commentsStoreValue09 = commentsStoreValue08 + 30;
}

function resolveCommentsStoreValue29(..._extraArguments: unknown[]) {
  return Math.min(commentsStoreValue08, 200);
}

function resolveCommentsStoreValue30(..._extraArguments: unknown[]): Dynamic {
  return resolveCommentsStoreValue24() && resolveCommentsStoreValue29() > 0;
}

function resolveCommentsStorePush(
  commentsStorePush: Dynamic = 200,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  let max = Math.max(
    0,
    commentsStoreValue08 - Math.min(commentsStorePush, 200),
  );
  for (let max2 = max; max2 < commentsStoreValue08; max2++) {
    let CommentsStoreFromItem: Dynamic = CommentsStoreFrom[max2 % 200];
    if (CommentsStoreFromItem) {
      items.push(CommentsStoreFromItem);
    }
  }
  return items;
}

var CommentsStoreState16: Dynamic;

function resolveCommentsStoreValue31(
  commentsStoreValue31?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  CommentsStoreState16 = commentsStoreValue31;
  return (..._extraArguments: unknown[]): undefined => {
    if (CommentsStoreState16 === commentsStoreValue31) {
      CommentsStoreState16 = null;
    }
  };
}

var resolveCommentsStoreValue32: Dynamic;

var CommentsStoreState17: Dynamic;

function resolveCommentsStoreValue33(
  commentsStoreValue33?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  CommentsStoreState17 = commentsStoreValue33;
  return (..._extraArguments: unknown[]): undefined => {
    if (CommentsStoreState17 === commentsStoreValue33) {
      CommentsStoreState17 = null;
    }
  };
}

function resolveCommentsStoreBid(
  commentsStoreBid?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  let readText: Dynamic = (
    node?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (typeof node.text == `string`) return node.text;
    if (!Array.isArray(node.content)) return ``;
    let label: string = ``;
    for (let resolveCommentsStoreBidResult of node.content as Dynamic)
      if (
        typeof resolveCommentsStoreBidResult == `object` &&
        resolveCommentsStoreBidResult
      ) {
        label += readText(resolveCommentsStoreBidResult);
      }
    return label;
  };
  let resolveCommentsStoreBidHandler: Dynamic = (
    node?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    Array.isArray(node.content) &&
    node.content.some(
      (content?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        typeof content == `object` &&
        !!content &&
        (typeof content.attrs?.bid == `string` ||
          resolveCommentsStoreBidHandler(content)),
    );
  let inFrame2 = (
    commentsStoreBid2?: unknown,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (typeof commentsStoreBid2 != `object` || !commentsStoreBid2) return;
    let commentsStoreBid3: Dynamic = commentsStoreBid2;
    let bid: Dynamic = commentsStoreBid3.attrs?.bid;
    if (
      typeof bid == `string` &&
      !resolveCommentsStoreBidHandler(commentsStoreBid3)
    ) {
      items.push({
        bid: bid,
        text: readText(commentsStoreBid3),
      });
      return;
    }
    if (Array.isArray(commentsStoreBid3.content))
      for (let resolveCommentsStoreBidResult of commentsStoreBid3.content as Dynamic)
        inFrame2(resolveCommentsStoreBidResult);
  };
  inFrame2(commentsStoreBid);
  return items;
}

var isCommentsStoreValue3: (..._extraArguments: unknown[]) => boolean;

var resolveCommentsStoreNavigator: Dynamic;

var resolveCommentsStoreEffectiveType: Dynamic;

function resolveCommentsStoreNavigator2(
  ..._extraArguments: unknown[]
): Dynamic {
  let navigator2: Dynamic = (globalThis as Dynamic).navigator;
  return {
    ...(typeof navigator2?.onLine == `boolean`
      ? {
          onLine: navigator2.onLine,
        }
      : {}),
    ...resolveCommentsStoreEffectiveType(navigator2?.connection),
  };
}

var commentsStoreValue_17: boolean;

function installCommentsStoreState(
  activity: Dynamic = {},
  ..._extraArguments: unknown[]
): undefined {
  if (commentsStoreValue_17) return;
  let globalThis2: Dynamic = globalThis;
  let win: Dynamic = activity.win ?? globalThis2.window;
  let doc: Dynamic = activity.doc ?? globalThis2.document;
  let conn: Dynamic = activity.conn ?? resolveCommentsStoreNavigator();
  let at2: Dynamic = activity.at;
  if (!win?.addEventListener) return;
  commentsStoreValue_17 = true;
  let resolveCommentsStoreLayer3: Dynamic = (
    installCommentsStoreState2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    at2
      ? resolveCommentsStoreLayer(
          `net`,
          installCommentsStoreState2,
          options,
          at2(),
        )
      : resolveCommentsStoreLayer(`net`, installCommentsStoreState2, options);
  win.addEventListener(
    `online`,
    (..._extraArguments: unknown[]): Dynamic =>
      resolveCommentsStoreLayer3(`online`),
  );
  win.addEventListener(
    `offline`,
    (..._extraArguments: unknown[]): Dynamic =>
      resolveCommentsStoreLayer3(`offline`),
  );
  doc?.addEventListener(
    `visibilitychange`,
    (..._extraArguments: unknown[]): Dynamic =>
      resolveCommentsStoreLayer3(`visibility`, {
        state: doc.visibilityState,
      }),
  );
  conn?.addEventListener?.(
    `change`,
    (..._extraArguments: unknown[]): Dynamic =>
      resolveCommentsStoreLayer3(
        `connection`,
        resolveCommentsStoreEffectiveType(conn),
      ),
  );
}

var commentsStoreAttemptFastRetriesReadyStateOnlineValues: string[];

var commentsStoreCodeCleanAttemptLifeMsValues: string[];

var resolveCommentsStoreValue34: Dynamic;

function resolveCommentsStoreWhat(
  name?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let nameIndex: Dynamic = name.indexOf(`:`);
  return nameIndex < 0
    ? {
        name: name,
      }
    : {
        name: name.slice(0, nameIndex),
        what: name.slice(nameIndex + 1),
      };
}

var commentsStoreValue_18: boolean;

function resolveCommentsStoreWhat2(
  activity?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (commentsStoreValue_18) return;
  commentsStoreValue_18 = true;
  let at2: Dynamic = activity.at;
  let resolveCommentsStoreLayer3: Dynamic = (
    commentsStoreWhat2?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    at2
      ? resolveCommentsStoreLayer(commentsStoreWhat2, options, context, at2())
      : resolveCommentsStoreLayer(commentsStoreWhat2, options, context);
  activity.onLaneLog?.(
    (
      commentsStoreWhat2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let { name: commentsStoreWhat, what: what }: Dynamic =
        resolveCommentsStoreWhat(commentsStoreWhat2);
      resolveCommentsStoreLayer3(
        `lane`,
        commentsStoreWhat,
        what === undefined
          ? undefined
          : {
              what: what,
            },
      );
    },
  );
  activity.onMuxState?.(
    (state?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      resolveCommentsStoreLayer3(`mux`, `state`, {
        state: state,
        ...resolveCommentsStoreValue34(
          activity.muxStats?.(),
          commentsStoreAttemptFastRetriesReadyStateOnlineValues,
        ),
      }),
  );
  activity.onMuxRow?.(
    (commentsStoreWhat2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      resolveCommentsStoreLayer3(
        `mux`,
        typeof commentsStoreWhat2.ev == `string`
          ? commentsStoreWhat2.ev
          : `row`,
        resolveCommentsStoreValue34(
          commentsStoreWhat2,
          commentsStoreCodeCleanAttemptLifeMsValues,
        ),
      ),
  );
}

var resolveCommentsStoreValue35: Dynamic;

function resolveCommentsStoreVerdict2(
  commentsStoreVerdict2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let commentsStoreValue35: Dynamic = resolveCommentsStoreValue35(
    commentsStoreVerdict2,
  );
  let record2: Dynamic = {};
  if (!commentsStoreValue35) return record2;
  if (typeof commentsStoreValue35.verdict == `string`) {
    record2.verdict = commentsStoreValue35.verdict;
  }
  if (typeof commentsStoreValue35.reason == `string`) {
    record2.reason = commentsStoreValue35.reason;
  }
  if (typeof commentsStoreValue35.status == `number`) {
    record2.status = commentsStoreValue35.status;
  }
  if (commentsStoreValue35.reopens === true) {
    record2.reopens = true;
  }
  if (commentsStoreValue35.lost === true) {
    record2.lost = true;
  }
  if (
    typeof commentsStoreValue35.rev == `number` ||
    typeof commentsStoreValue35.rev == `string`
  ) {
    record2.rev = commentsStoreValue35.rev;
  }
  let commentsStoreValue352: Dynamic = resolveCommentsStoreValue35(
    commentsStoreValue35.data,
  );
  if (typeof commentsStoreValue352?.code == `string`) {
    record2.code = commentsStoreValue352.code;
  }
  if (typeof commentsStoreValue352?.was == `string`) {
    record2.was = commentsStoreValue352.was;
  }
  if (typeof commentsStoreValue352?.layer == `string`) {
    record2.via = commentsStoreValue352.layer;
  }
  if (Array.isArray(commentsStoreValue35.results)) {
    record2.results = commentsStoreValue35.results.length;
  }
  return record2;
}

function resolveCommentsStoreUnreachable(
  response?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    typeof response.verdict == `string` &&
    response.verdict !== `unreachable` &&
    response.via !== `relay`
  );
}

function resolveCommentsStoreErr(
  error?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let record2: Dynamic = {};
  if (!(error instanceof (Error as Dynamic)))
    return {
      err: typeof error,
    };
  record2.err = error.name;
  let code: Dynamic = error.code;
  if (typeof code == `string`) {
    record2.code = code;
  } else {
    if (error instanceof (TypeError as Dynamic)) {
      record2.code = `network`;
    } else {
      if (error.message === `mux door timeout`) {
        record2.code = `mux_timeout`;
      } else {
        if (error.message === `mux closed mid-call`) {
          record2.code = `mux_closed`;
        } else {
          if (error.message === `reset`) {
            record2.code = `reset`;
          }
        }
      }
    }
  }
  let match: Dynamic = /^door(?: batch)? (\d{3})\b/.exec(error.message);
  if (match) {
    record2.status = Number(match[1]);
  }
  return record2;
}

var commentsStoreWeakMap3: Dynamic;

function updateCommentsStoreVisibilitychange(
  updateCommentsStoreVisibilitychange2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let commentsStoreWeakMap3Entry: Dynamic = commentsStoreWeakMap3.get(
    updateCommentsStoreVisibilitychange2,
  );
  if (commentsStoreWeakMap3Entry === undefined) {
    let updateCommentsStoreVisibilitychangeResult =
      (commentsStoreWeakMap3Entry = {
        n: 0,
      });
    commentsStoreWeakMap3.set(
      updateCommentsStoreVisibilitychange2,
      updateCommentsStoreVisibilitychangeResult,
    );
    updateCommentsStoreVisibilitychange2.addEventListener?.(
      `visibilitychange`,
      (..._extraArguments: unknown[]): undefined => {
        if (updateCommentsStoreVisibilitychange2.visibilityState === `hidden`) {
          updateCommentsStoreVisibilitychangeResult.n++;
        }
      },
    );
  }
  return commentsStoreWeakMap3Entry;
}

var commentsStoreValue010: number;

function loadCommentsStoreVerb2(
  commentsStoreVerb2?: Dynamic,
  activity: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let at2: Dynamic =
    activity.at ?? ((..._extraArguments: unknown[]) => Date.now());
  let doc: Dynamic = activity.doc ?? (globalThis as Dynamic).document;
  let updateCommentsStoreVisibilitychange2: Dynamic =
    doc === undefined ? undefined : updateCommentsStoreVisibilitychange(doc);
  let loadCommentsStoreVerb2Handler = (..._extraArguments: unknown[]) =>
    doc?.visibilityState === `hidden`;
  return async (
    commentsStoreVerb22?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<Dynamic> => {
    let commentsStoreValue35: Dynamic =
      resolveCommentsStoreValue35(commentsStoreVerb22) ?? {};
    let commentsStoreValue352: Dynamic = resolveCommentsStoreValue35(
      commentsStoreValue35.payload,
    );
    let seq: number = ++commentsStoreValue010;
    let record2: Dynamic = {
      ...(typeof commentsStoreValue35.verb == `string`
        ? {
            verb: commentsStoreValue35.verb,
          }
        : {}),
      ...(typeof commentsStoreValue35.opId == `string`
        ? {
            opId: commentsStoreValue35.opId,
          }
        : {}),
      seq: seq,
    };
    let at3: Dynamic = at2();
    let commentsStoreVerb2Handler = loadCommentsStoreVerb2Handler();
    let n10: Dynamic = updateCommentsStoreVisibilitychange2?.n ?? 0;
    let loadCommentsStoreVerb2Handler2: Dynamic = (
      ..._extraArguments: unknown[]
    ): Dynamic =>
      commentsStoreVerb2Handler ||
      loadCommentsStoreVerb2Handler() ||
      (updateCommentsStoreVisibilitychange2?.n ?? 0) !== n10
        ? {
            hidden: true,
          }
        : {};
    resolveCommentsStoreLayer(
      `door`,
      `call`,
      {
        ...record2,
        ...(typeof commentsStoreValue35.object == `string`
          ? {
              kind: commentsStoreValue35.object,
            }
          : {}),
        ...(typeof commentsStoreValue352?.kind == `string`
          ? {
              kind: commentsStoreValue352.kind,
            }
          : {}),
        ...(Array.isArray(commentsStoreValue352?.ops)
          ? {
              ops: commentsStoreValue352.ops.length,
            }
          : {}),
        ...(commentsStoreValue352 &&
        commentsStoreValue352.sinceRev !== undefined
          ? {
              since: true,
            }
          : {}),
        ...(commentsStoreValue35.stream === true
          ? {
              stream: true,
            }
          : {}),
      },
      at3,
    );
    try {
      let commentsStoreVerb23: Dynamic =
        await commentsStoreVerb2(commentsStoreVerb22);
      let at4: Dynamic = at2();
      let commentsStoreVerdict2: Dynamic =
        resolveCommentsStoreVerdict2(commentsStoreVerb23);
      if (resolveCommentsStoreUnreachable(commentsStoreVerdict2)) {
        resolvePlatformLoadingAndStatusSize(at4);
      }
      resolveCommentsStoreLayer(
        `door`,
        `reply`,
        {
          ...record2,
          ms: at4 - at3,
          ...loadCommentsStoreVerb2Handler2(),
          ...commentsStoreVerdict2,
        },
        at4,
      );
      return commentsStoreVerb23;
    } catch (loadCommentsStoreVerb2Result: Dynamic) {
      let at4: Dynamic = at2();
      let commentsStoreErr: Dynamic = resolveCommentsStoreErr(
        loadCommentsStoreVerb2Result,
      );
      throw (
        typeof commentsStoreErr.status == `number` &&
          resolvePlatformLoadingAndStatusSize(at4),
        resolveCommentsStoreLayer(
          `door`,
          `threw`,
          {
            ...record2,
            ms: at4 - at3,
            ...loadCommentsStoreVerb2Handler2(),
            ...commentsStoreErr,
          },
          at4,
        ),
        loadCommentsStoreVerb2Result
      );
    }
  };
}

function resolveCommentsStoreBlocks(
  response?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let record2: Dynamic = {};
  if (response.opId !== undefined) {
    record2.opId = response.opId;
  }
  if (response.reason !== undefined) {
    record2.reason = response.reason;
  }
  if (typeof response.rev == `number` || typeof response.rev == `string`) {
    record2.rev = response.rev;
  }
  if (response.partial !== undefined) {
    record2.partial = response.partial === true;
  }
  if (response.halt !== undefined) {
    record2.halt = response.halt === true;
  }
  if (response.retrying !== undefined) {
    record2.retrying = response.retrying === true;
  }
  if (response.landed !== undefined) {
    record2.landed = response.landed === true;
  }
  if (response.ok !== undefined) {
    record2.ok = response.ok === true;
  }
  if (response.why !== undefined) {
    record2.why = response.why;
  }
  if (typeof response.state == `string`) {
    record2.state = response.state;
  }
  if (response.waiting !== undefined) {
    record2.waiting = response.waiting === true;
  }
  if (response.openFailed !== undefined) {
    record2.openFailed = response.openFailed === true;
  }
  if (response.openBusy !== undefined) {
    record2.openBusy = response.openBusy === true;
  }
  if (response.pageBusy !== undefined) {
    record2.pageBusy = response.pageBusy === true;
  }
  if (response.viewOnly !== undefined) {
    record2.viewOnly = response.viewOnly === true;
  }
  if (response.linkDown !== undefined) {
    record2.linkDown = response.linkDown === true;
  }
  if (response.pageGone !== undefined) {
    record2.pageGone = response.pageGone === true;
  }
  for (let resolveCommentsStoreBlocksResult of [
    `ops`,
    `blocks`,
    `results`,
    `staged`,
    `rescue`,
    `padded`,
    `flown`,
  ] as Dynamic)
    if (Array.isArray(response[resolveCommentsStoreBlocksResult])) {
      record2[resolveCommentsStoreBlocksResult] =
        response[resolveCommentsStoreBlocksResult].length;
    }
  return record2;
}

var commentsStoreSet18: Dynamic;

function resolveCommentsStoreValue36(
  commentsStoreValue36?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return resolveCommentsStoreValue37(commentsStoreValue36, 0);
}

var commentsStoreValue4: number;

var collectCommentsStoreValue: Dynamic;

var resolveCommentsStoreValue37: Dynamic;

var resolveCommentsStoreReplaceAll: Dynamic;

var resolveCommentsStoreNull: Dynamic;

var resolveCommentsStoreLayer2: Dynamic;

function resolveCommentsStoreValue38(
  items?: Dynamic,
  ..._extraArguments: unknown[]
) {
  for (let difference = items.length - 1; difference >= 0; difference--) {
    let rev: Dynamic = items[difference].ev.rev;
    if (typeof rev == `number` || typeof rev == `string`) return rev;
  }
  return null;
}

function resolveCommentsStoreJustNow(
  commentsStoreJustNow?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (commentsStoreJustNow < 1e3) return `just now`;
  let round = Math.round(commentsStoreJustNow / 1e3);
  if (round < 90) return `${round}s ago`;
  let round2 = Math.round(round / 60);
  return round2 < 60 ? `${round2}m ago` : `${Math.floor(round2 / 60)}h ago`;
}

function isCommentsStoreUnmasked(
  commentsStoreUnmasked?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let resolveCommentsStoreValue362: Dynamic = (
    commentsStoreUnmasked2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    commentsStoreUnmasked.unmasked
      ? commentsStoreUnmasked2
      : resolveCommentsStoreValue36(commentsStoreUnmasked2);
  let at2: Dynamic =
    commentsStoreUnmasked.trigger?.at ?? commentsStoreUnmasked.now;
  let entriesSlice: Dynamic = Number.isFinite(commentsStoreUnmasked.tail ?? 50)
    ? commentsStoreUnmasked.entries.slice(-(commentsStoreUnmasked.tail ?? 50))
    : commentsStoreUnmasked.entries.slice();
  let items: Dynamic = [];
  items.push(`## Pages op debug report`);
  items.push(`- at: ${new Date(commentsStoreUnmasked.now).toISOString()}`);
  items.push(
    `- build: ${resolveCommentsStoreReplaceAll(commentsStoreUnmasked.build || `dev`, 60)}`,
  );
  let items2: Dynamic = [];
  if (commentsStoreUnmasked.ctx.pid) {
    items2.push(
      `room=${resolveCommentsStoreReplaceAll(commentsStoreUnmasked.ctx.pid, 60)}`,
    );
  }
  if (commentsStoreUnmasked.ctx.fileId) {
    items2.push(
      `file=${resolveCommentsStoreReplaceAll(commentsStoreUnmasked.ctx.fileId, 60)}`,
    );
  }
  if (commentsStoreUnmasked.ctx.node) {
    items2.push(
      `node=${resolveCommentsStoreReplaceAll(commentsStoreUnmasked.ctx.node, 60)}`,
    );
  }
  if (items2.length > 0) {
    items.push(`- doc: ${items2.join(` `)}`);
  }
  let commentsStoreValue38 = resolveCommentsStoreValue38(
    commentsStoreUnmasked.entries,
  );
  if (commentsStoreValue38 !== null) {
    items.push(
      `- rev (last seen): ${resolveCommentsStoreReplaceAll(String(commentsStoreValue38), 40)}`,
    );
  }
  items.push(
    entriesSlice.length >= commentsStoreUnmasked.entries.length
      ? `- ring: ${commentsStoreUnmasked.entries.length} events held, all shown`
      : `- ring: ${commentsStoreUnmasked.entries.length} events held, last ${entriesSlice.length} shown`,
  );
  items.push(``);
  if (commentsStoreUnmasked.net) {
    items.push(`## Network`);
    if (typeof commentsStoreUnmasked.net.onLine == `boolean`) {
      items.push(`- onLine: ${commentsStoreUnmasked.net.onLine}`);
    }
    let items3: Dynamic = [];
    if (commentsStoreUnmasked.net.effectiveType !== undefined) {
      items3.push(
        `effectiveType=${resolveCommentsStoreReplaceAll(commentsStoreUnmasked.net.effectiveType, 24)}`,
      );
    }
    if (commentsStoreUnmasked.net.downlink !== undefined) {
      items3.push(`downlink=${commentsStoreUnmasked.net.downlink}`);
    }
    if (commentsStoreUnmasked.net.rtt !== undefined) {
      items3.push(`rtt=${commentsStoreUnmasked.net.rtt}`);
    }
    if (commentsStoreUnmasked.net.saveData !== undefined) {
      items3.push(`saveData=${commentsStoreUnmasked.net.saveData}`);
    }
    items.push(
      items3.length > 0
        ? `- connection: ${items3.join(` `)}`
        : `- connection: (unavailable)`,
    );
    items.push(``);
  }
  let resolveCommentsStoreLayer22 = (
    commentsStoreUnmasked2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    items.push(`| Δms | layer | event | fields |`);
    items.push(`| ---: | --- | --- | --- |`);
    for (let activity of commentsStoreUnmasked2 as Dynamic) {
      let layer: Dynamic =
        typeof activity.ev.layer == `string` ? activity.ev.layer : `?`;
      let name: Dynamic =
        typeof activity.ev.name == `string` ? activity.ev.name : `?`;
      items.push(
        `| ${activity.at - at2} | ${resolveCommentsStoreReplaceAll(layer, 8)} | ${resolveCommentsStoreReplaceAll(name, 32)} | ${resolveCommentsStoreLayer2(resolveCommentsStoreValue362(activity.ev))} |`,
      );
    }
  };
  if (commentsStoreUnmasked.trigger) {
    items.push(
      `Trigger (refusal ${resolveCommentsStoreJustNow(commentsStoreUnmasked.now - commentsStoreUnmasked.trigger.at)} — the deny that raised the last error surface):`,
    );
    items.push(
      resolveCommentsStoreReplaceAll(
        resolveCommentsStoreNull(
          resolveCommentsStoreValue362(commentsStoreUnmasked.trigger.ev),
        ),
        2e3,
      ),
    );
    items.push(``);
    let uniqueItems: Dynamic = new (Set as Dynamic)(entriesSlice);
    let filteredAround: Dynamic = (
      commentsStoreUnmasked.trigger.around ?? []
    ).filter(
      (around?: Dynamic, ..._extraArguments: unknown[]) =>
        !uniqueItems.has(around),
    );
    if (filteredAround.length > 0) {
      items.push(
        `## Events around the trigger (${filteredAround.length} pinned when it fired — no longer among the ring rows below)`,
      );
      resolveCommentsStoreLayer22(filteredAround);
      items.push(``);
      items.push(`## Ring`);
    }
  }
  resolveCommentsStoreLayer22(entriesSlice);
  if (commentsStoreUnmasked.docText) {
    items.push(``);
    items.push(`## Document text`);
    if (commentsStoreUnmasked.docText.rev !== undefined) {
      items.push(
        `(as of rev ${resolveCommentsStoreReplaceAll(String(commentsStoreUnmasked.docText.rev), 40)})`,
      );
    }
    for (let ask of commentsStoreUnmasked.docText.blocks as Dynamic)
      items.push(
        `[${resolveCommentsStoreReplaceAll(ask.bid, 60)}] ${ask.text.replaceAll("```", `'''`)}`.trimEnd(),
      );
  }
  return items.join(`
`);
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeCommentsStore5Step1(): void {
  (CommentsStoreState14 = null);
  (commentsStoreValue09 = 0);
  (CommentsStoreState15 = null);
  (CommentsStoreState16 = null);
  (resolveCommentsStoreValue32 = (
    ..._extraArguments: unknown[]
  ): Dynamic => CommentsStoreState16?.() ?? {});
  (CommentsStoreState17 = null);
  (isCommentsStoreValue3 = (..._extraArguments: unknown[]) => false);
  (resolveCommentsStoreNavigator = (
    ..._extraArguments: unknown[]
  ): Dynamic => (globalThis as Dynamic).navigator?.connection);
  (resolveCommentsStoreEffectiveType = (
    commentsStoreEffectiveType?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    ...(typeof commentsStoreEffectiveType?.effectiveType == `string`
      ? {
          effectiveType: commentsStoreEffectiveType.effectiveType,
        }
      : {}),
    ...(typeof commentsStoreEffectiveType?.downlink == `number`
      ? {
          downlink: commentsStoreEffectiveType.downlink,
        }
      : {}),
    ...(typeof commentsStoreEffectiveType?.rtt == `number`
      ? {
          rtt: commentsStoreEffectiveType.rtt,
        }
      : {}),
    ...(typeof commentsStoreEffectiveType?.saveData == `boolean`
      ? {
          saveData: commentsStoreEffectiveType.saveData,
        }
      : {}),
  }));
  (commentsStoreValue_17 = false);
  (commentsStoreAttemptFastRetriesReadyStateOnlineValues = [
    `attempt`,
    `fastRetries`,
    `readyState`,
    `online`,
    `pending`,
  ]);
  (commentsStoreCodeCleanAttemptLifeMsValues = [
    `code`,
    `clean`,
    `attempt`,
    `lifeMs`,
    `online`,
  ]);
  (resolveCommentsStoreValue34 = (
    commentsStoreValue34?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let record2: Dynamic = {};
    if (!commentsStoreValue34) return record2;
    for (let resolveCommentsStoreValue34Result of options as Dynamic)
      if (
        typeof commentsStoreValue34[resolveCommentsStoreValue34Result] ==
          `number` ||
        typeof commentsStoreValue34[resolveCommentsStoreValue34Result] ==
          `boolean`
      ) {
        record2[resolveCommentsStoreValue34Result] =
          commentsStoreValue34[resolveCommentsStoreValue34Result];
      }
    return record2;
  });
  (commentsStoreValue_18 = false);
  (resolveCommentsStoreValue35 = (
    commentsStoreValue35?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof commentsStoreValue35 == `object` && commentsStoreValue35
      ? commentsStoreValue35
      : undefined);
  (commentsStoreWeakMap3 = new (WeakMap as Dynamic)());
  (commentsStoreValue010 = 0);
  (commentsStoreSet18 = new (Set as Dynamic)(
    `layer.name.opId.bid.bids.block.node.lid.id.afterId.anchor.rev.revFirst.reason.reason_before.why.phase.editors.need.room.via.road.arm.meta.kind.type.verb.verbs.skipped.waiting.what.root.code.key.inputType.state.verdict.was.word.ev.klass.err.klass.action.road.surface.shadow.down.rowKey.source.after.today.sub.relay.sc.feBuild.doorBuild.page.sess.host.navType.openFlag.plat.boot.s5wait.openRow.hostStartFrom.vis.retry.pageFace.k.scope.cls.where.msgKind.ident.thrown.dx.opaque.srcKind.from.to.gapFrom.gapTo.os.oe.kid0.kid0bid.tables.parent.region.compare.held`.split(
      `.`,
    ),
  ));
  (commentsStoreValue4 = 4);
  (collectCommentsStoreValue = (
    collectCommentsStoreValue2?: Dynamic,
    items?: unknown,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    typeof items == `string`
      ? commentsStoreSet18.has(collectCommentsStoreValue2)
        ? items
        : `«${items.length}»`
      : items === null ||
          typeof items == `number` ||
          typeof items == `boolean` ||
          items === undefined
        ? items
        : context >= commentsStoreValue4
          ? `«…»`
          : Array.isArray(items)
            ? items.map(
                (
                  rolldownRImport2?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  collectCommentsStoreValue(
                    collectCommentsStoreValue2,
                    rolldownRImport2,
                    context + 1,
                  ),
              )
            : typeof items == `object`
              ? resolveCommentsStoreValue37(items, context + 1)
              : `«?»`);
  (resolveCommentsStoreValue37 = (
    commentsStoreValue37?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let record2: Dynamic = {};
    for (let resolveCommentsStoreValue37Result in commentsStoreValue37)
      record2[resolveCommentsStoreValue37Result] = collectCommentsStoreValue(
        resolveCommentsStoreValue37Result,
        commentsStoreValue37[resolveCommentsStoreValue37Result],
        options,
      );
    return record2;
  });
  (resolveCommentsStoreReplaceAll = (
    commentsStoreReplaceAll?: Dynamic,
    options: Dynamic = 80,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let replaceAll: Dynamic = commentsStoreReplaceAll
      .replaceAll("`", `'`)
      .replaceAll(`|`, `\\|`)
      .replaceAll(
        `
`,
        `⏎`,
      );
    return replaceAll.length > options
      ? `${replaceAll.slice(0, options - 1)}…`
      : replaceAll;
  });
  (resolveCommentsStoreNull = (
    commentsStoreNull?: unknown,
    ..._extraArguments: unknown[]
  ) => {
    if (commentsStoreNull === null) return `null`;
    switch (typeof commentsStoreNull) {
      case `string`:
        return commentsStoreNull;
      case `number`:
      case `boolean`:
        return String(commentsStoreNull);
      case `undefined`:
        return ``;
      default:
        try {
          return JSON.stringify(commentsStoreNull) ?? String(commentsStoreNull);
        } catch {
          return `[unserializable]`;
        }
    }
  });
  (resolveCommentsStoreLayer2 = (
    commentsStoreLayer2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let items: Dynamic = [];
    for (let resolveCommentsStoreLayer2Result in commentsStoreLayer2)
      if (
        !(
          resolveCommentsStoreLayer2Result === `layer` ||
          resolveCommentsStoreLayer2Result === `name`
        )
      ) {
        items.push(
          `${resolveCommentsStoreReplaceAll(resolveCommentsStoreLayer2Result, 24)}=${resolveCommentsStoreReplaceAll(resolveCommentsStoreNull(commentsStoreLayer2[resolveCommentsStoreLayer2Result]), 60)}`,
        );
      }
    return items.join(` `);
  });
}

export {
  CommentsStoreState14,
  CommentsStoreState16,
  CommentsStoreState17,
  commentsStoreValue09,
  installCommentsStoreState,
  isCommentsStoreUnmasked,
  isCommentsStoreValue3,
  loadCommentsStoreVerb2,
  resolveCommentsStoreAround,
  resolveCommentsStoreBid,
  resolveCommentsStoreBlocks,
  resolveCommentsStoreLayer,
  resolveCommentsStoreNavigator2,
  resolveCommentsStorePush,
  resolveCommentsStoreValue25,
  resolveCommentsStoreValue27,
  resolveCommentsStoreValue29,
  resolveCommentsStoreValue30,
  resolveCommentsStoreValue31,
  resolveCommentsStoreValue32,
  resolveCommentsStoreValue33,
  resolveCommentsStoreWhat2,
};
