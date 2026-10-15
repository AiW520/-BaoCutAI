/** BaoCut: editor extensions from app-core-BE6n4d7F.js. */
import type { Dynamic } from "./types";
import {
  helloDImport,
  helloFImport,
  helloImport,
  helloLImport,
  helloRImport,
} from "./platform-core-dependencies";
import {
  platformSessionAndSourcesPattern22,
} from "./platform-core-platform-session-and-sources-1";
import {
  PlatformSessionAndSourcesActor,
  PlatformSessionAndSourcesPrincipal,
  PlatformSessionAndSourcesPrincipal2,
  resolvePlatformSessionAndSourcesCreate,
  resolvePlatformSessionAndSourcesCreate2,
  resolvePlatformSessionAndSourcesFind,
  resolvePlatformSessionAndSourcesPinned,
  resolvePlatformSessionAndSourcesSilenceMs,
} from "./platform-core-platform-session-and-sources-2";
import {
  EditorExtensionsFrameSendError,
  EditorExtensionsNORESULTRELAY,
  EditorExtensionsState8,
  EditorExtensionsWITHDRAWN,
  INSTANCE_CHURN,
  RESET_STORM,
  editorExtensionsSet12,
  editorExtensionsSet13,
  editorExtensionsSet14,
  editorExtensionsSet15,
  editorExtensionsSet16,
  editorExtensionsSet17,
  editorExtensionsSet18,
  editorExtensionsSet21,
  editorExtensionsSet22,
  editorExtensionsSet23,
  editorExtensionsValue10000,
  editorExtensionsValue10003,
  editorExtensionsValue1500,
  editorExtensionsValue15002,
  editorExtensionsValue2000,
  editorExtensionsValue20000,
  editorExtensionsValue30000,
  editorExtensionsValue300002,
  editorExtensionsValue60000,
  editorExtensionsValue80002,
  filterEditorExtensionsFilter,
  isEditorExtensionsSeq,
  resolveEditorExtensionsCode,
  resolveEditorExtensionsEntries,
  resolveEditorExtensionsKind3,
  resolveEditorExtensionsNode2,
  resolveEditorExtensionsParent,
  resolveEditorExtensionsRefusalClass,
  resolveEditorExtensionsSeq,
  resolveEditorExtensionsUtterance,
  resolveEditorExtensionsUtterance2,
  resolveEditorExtensionsValue29,
  resolveEditorExtensionsValue31,
  resolveEditorExtensionsValue32,
  resolveEditorExtensionsValue33,
  updateEditorExtensionsByKey,
  updateEditorExtensionsThread,
} from "./platform-core-editor-extensions-3";

var resolveEditorExtensionsRead: (editorExtensionsRead?: Dynamic, ..._extraArguments: unknown[]) => "presence" | "query" | "read" | "write";

var resolveEditorExtensionsRead2: Dynamic;

var resolveEditorExtensionsValue34: Dynamic;

function resolveEditorExtensionsVerdict(
  editorExtensionsVerdict?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (editorExtensionsVerdict.t === `op`) {
    let body: Dynamic = {
      verdict: `allow`,
      diff: [],
    };
    for (let resolveEditorExtensionsVerdictResult of [
      `minted`,
      `id`,
      `sess`,
    ] as Dynamic) {
      let editorExtensionsValue34: Dynamic = resolveEditorExtensionsValue34(
        editorExtensionsVerdict[resolveEditorExtensionsVerdictResult],
      );
      if (editorExtensionsValue34 !== undefined) {
        body[resolveEditorExtensionsVerdictResult] = editorExtensionsValue34;
      }
    }
    if (typeof editorExtensionsVerdict.rev == `number`) {
      body.rev = editorExtensionsVerdict.rev;
    }
    for (let resolveEditorExtensionsVerdictResult of [
      `replayed`,
      `changed`,
    ] as Dynamic)
      if (
        typeof editorExtensionsVerdict[resolveEditorExtensionsVerdictResult] ==
        `boolean`
      ) {
        body[resolveEditorExtensionsVerdictResult] =
          editorExtensionsVerdict[resolveEditorExtensionsVerdictResult];
      }
    if (editorExtensionsVerdict.noop === true) {
      body.noop = true;
    }
    if (resolveEditorExtensionsValue31(editorExtensionsVerdict.data)) {
      body.data = editorExtensionsVerdict.data;
    }
    if (Array.isArray(editorExtensionsVerdict.results)) {
      body.results = editorExtensionsVerdict.results;
    }
    return {
      status: 200,
      body: body,
    };
  }
  if (editorExtensionsVerdict.t === `nack`) {
    let body: Dynamic = {
      verdict: `deny`,
      reason:
        resolveEditorExtensionsValue34(editorExtensionsVerdict.reason) ??
        `unknown`,
    };
    let editorExtensionsValue34: Dynamic = resolveEditorExtensionsValue34(
      editorExtensionsVerdict.detail,
    );
    if (editorExtensionsValue34 !== undefined) {
      body.detail = editorExtensionsValue34;
    }
    if (resolveEditorExtensionsValue31(editorExtensionsVerdict.data)) {
      body.data = editorExtensionsVerdict.data;
      if (typeof editorExtensionsVerdict.data.index == `number`) {
        body.index = editorExtensionsVerdict.data.index;
      }
    }
    return {
      status: 200,
      body: body,
    };
  }
  return null;
}

function resolveEditorExtensionsStatus(
  editorExtensionsStatus?: Dynamic,
  options?: Dynamic,
  context: Dynamic = [],
  ..._extraArguments: unknown[]
): Dynamic {
  let resolveEditorExtensionsStatusHandler: Dynamic = (
    body?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    status: 200,
    body: body,
  });
  let resolveEditorExtensionsStatusHandler2: Dynamic = (
    detail?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveEditorExtensionsStatusHandler({
      verdict: `deny`,
      reason: `unavailable`,
      detail: detail,
      data: {
        code: `unavailable`,
        why: `lane`,
      },
    });
  let payload: Dynamic = editorExtensionsStatus.payload;
  let kind: Dynamic =
    resolveEditorExtensionsValue31(payload) && typeof payload.kind == `string`
      ? payload.kind
      : null;
  if (kind !== null && kind !== `view`)
    return resolveEditorExtensionsStatusHandler2(
      `a read {kind:"${kind}"} is served by the room, not the lane cache`,
    );
  if (options === undefined)
    return resolveEditorExtensionsView(editorExtensionsStatus)
      ? resolveEditorExtensionsStatusHandler2(
          `the lane cache does not hold this node`,
        )
      : resolveEditorExtensionsStatusHandler({
          verdict: `allow`,
          diff: [],
        });
  if (
    kind === `view` &&
    resolveEditorExtensionsValue31(options) &&
    resolveEditorExtensionsValue31(options.view)
  ) {
    if (
      resolveEditorExtensionsValue31(payload) &&
      (payload.parentId !== undefined || payload.from !== undefined)
    )
      return resolveEditorExtensionsStatusHandler2(
        `the pushed view is the whole document: a scoped or continued read has no lane road`,
      );
    let view: Dynamic = options.view;
    let rev: Dynamic =
      typeof view.rev == `number`
        ? view.rev
        : typeof options.rev == `number`
          ? options.rev
          : undefined;
    let doc: Dynamic = resolveEditorExtensionsValue36(view.doc, context);
    return resolveEditorExtensionsStatusHandler({
      verdict: `allow`,
      diff: [],
      ...(rev === undefined
        ? {}
        : {
            rev: rev,
          }),
      data:
        doc === undefined
          ? view
          : {
              ...view,
              doc: doc,
            },
      value: options,
    });
  }
  return resolveEditorExtensionsView2(editorExtensionsStatus, options)
    ? resolveEditorExtensionsStatusHandler2(
        `the pushed value carries no body (a bodies:"rev" stream): a prose body read is served by the room, not the lane cache`,
      )
    : resolveEditorExtensionsStatusHandler({
        verdict: `allow`,
        diff: [],
        value: options,
      });
}

function resolveEditorExtensionsView(
  editorExtensionsView?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let payload: Dynamic = resolveEditorExtensionsValue31(
    editorExtensionsView.payload,
  )
    ? editorExtensionsView.payload
    : {};
  return payload.kind === `view`
    ? true
    : payload.kind === undefined &&
        (payload.engine === `prose` || editorExtensionsView.engine === `prose`);
}

function resolveEditorExtensionsView2(
  editorExtensionsView2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    resolveEditorExtensionsView(editorExtensionsView2) &&
    resolveEditorExtensionsValue31(options) &&
    !resolveEditorExtensionsValue31(options.view) &&
    !(`doc` in options)
  );
}

function resolveEditorExtensionsValue35(
  editorExtensionsValue35?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return resolveEditorExtensionsValue31(editorExtensionsValue35) &&
    typeof editorExtensionsValue35.rev == `number`
    ? editorExtensionsValue35.rev
    : null;
}

function resolveEditorExtensionsValue36(
  editorExtensionsValue36?: unknown,
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (items.length === 0 || typeof editorExtensionsValue36 != `string`) return;
  let resolveEditorExtensionsValue36Result: Dynamic;
  try {
    resolveEditorExtensionsValue36Result = filterEditorExtensionsFilter(
      editorExtensionsValue36,
    );
  } catch {
    return;
  }
  let updateEditorExtensionsThread2: Dynamic = updateEditorExtensionsThread(
    resolveEditorExtensionsValue36Result,
    items,
  );
  return updateEditorExtensionsThread2 === resolveEditorExtensionsValue36Result
    ? undefined
    : resolveEditorExtensionsEntries(updateEditorExtensionsThread2);
}

var EditorExtensionsReadTimeouts: Dynamic;

var editorExtensionsPattern13: RegExp;

function resolveEditorExtensionsOpId(
  editorExtensionsOpId?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let opId: Dynamic =
    typeof editorExtensionsOpId.opId == `string`
      ? editorExtensionsOpId.opId
      : editorExtensionsOpId.op_id;
  return typeof opId == `string` && editorExtensionsPattern13.test(opId)
    ? opId
    : undefined;
}

function resolveEditorExtensionsOpId2(
  editorExtensionsOpId2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let opId = resolveEditorExtensionsOpId(editorExtensionsOpId2);
  if (opId !== undefined) {
    if (
      editorExtensionsOpId2.opId === opId &&
      !(`op_id` in editorExtensionsOpId2)
    )
      return editorExtensionsOpId2;
    let { op_id: editorExtensionsOpId22, ...editorExtensionsOpId23 }: Dynamic =
      editorExtensionsOpId2;
    return {
      ...editorExtensionsOpId23,
      opId: opId,
    };
  }
  let opId2: Dynamic = options.mintOpId();
  if (!editorExtensionsPattern13.test(opId2))
    throw Error(`frameDoor: mintOpId produced an illegal opId`);
  return {
    ...editorExtensionsOpId2,
    opId: opId2,
  };
}

function resolveEditorExtensionsVerb(
  verb?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (verb !== `batch`)
    return {
      ...options,
      verb: verb,
    };
  if (!Array.isArray(options.batch))
    throw Error(`frameDoor: batch call has no batch[]`);
  let { verb: options2, ...options3 }: Dynamic = options;
  return options3;
}

var editorExtensionsSet24: Dynamic;

var resolveEditorExtensionsDeadReason: Dynamic;

var resolveEditorExtensionsStatus2: Dynamic;

var FOREIGN_CONTAINER: string;

function resolveEditorExtensionsOwnContainer(
  editorExtensionsOwnContainer?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let ownContainer: Dynamic = options.ownContainer?.() ?? null;
  return ownContainer !== null && editorExtensionsOwnContainer !== ownContainer;
}

var editorExtensionsWeakMap2: Dynamic;

function updateEditorExtensionsSize(
  updateEditorExtensionsSize2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let editorExtensionsWeakMap2Entry: Dynamic =
    editorExtensionsWeakMap2.get(options);
  if (editorExtensionsWeakMap2Entry === undefined) {
    editorExtensionsWeakMap2.set(
      options,
      (editorExtensionsWeakMap2Entry = new (Set as Dynamic)()),
    );
  }
  if (!editorExtensionsWeakMap2Entry.has(updateEditorExtensionsSize2)) {
    if (editorExtensionsWeakMap2Entry.size >= 64) {
      editorExtensionsWeakMap2Entry.clear();
    }
    editorExtensionsWeakMap2Entry.add(updateEditorExtensionsSize2);
    options.log?.(`door:foreign-container`);
  }
}

function loadEditorExtensionsCall(
  items?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (items.length === 0) throw Error(`frameDoorAt: empty address`);
  return {
    call: async (
      editorExtensionsCall?: Dynamic,
      options2: Dynamic = {},
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> => {
      if (resolveEditorExtensionsOwnContainer(items, options))
        throw (
          updateEditorExtensionsSize(items, options),
          new (EditorExtensionsFrameSendError as Dynamic)(FOREIGN_CONTAINER)
        );
      let updateEditorExtensionsByKey2: Dynamic = updateEditorExtensionsByKey(
        items,
        options,
      );
      if (resolveEditorExtensionsDeadReason(updateEditorExtensionsByKey2))
        return resolveEditorExtensionsStatus2();
      try {
        let editorExtensionsVerb: Dynamic = resolveEditorExtensionsVerb(
          editorExtensionsCall,
          options2,
        );
        return await updateEditorExtensionsByKey2.call(
          resolveEditorExtensionsOpId2(editorExtensionsVerb, options),
          context,
          resolveEditorExtensionsOpId(editorExtensionsVerb) !== undefined,
        );
      } catch (loadEditorExtensionsCallResult: Dynamic) {
        if (resolveEditorExtensionsDeadReason(updateEditorExtensionsByKey2))
          return resolveEditorExtensionsStatus2();
        throw loadEditorExtensionsCallResult;
      }
    },
  };
}

var EditorExtensionsGotoAnchorRefused: string;

function resolveEditorExtensionsFragment(
  editorExtensionsFragment?: unknown,
  ..._extraArguments: unknown[]
) {
  if (typeof editorExtensionsFragment != `object` || !editorExtensionsFragment)
    return null;
  let editorExtensionsFragment2: Dynamic = editorExtensionsFragment;
  if (
    !Object.hasOwn(editorExtensionsFragment2, `type`) ||
    editorExtensionsFragment2.type !== `goto_anchor`
  )
    return null;
  let fragment: Dynamic = Object.hasOwn(editorExtensionsFragment2, `fragment`)
    ? editorExtensionsFragment2.fragment
    : undefined;
  return typeof fragment == `string` &&
    platformSessionAndSourcesPattern22.test(fragment)
    ? {
        fragment: fragment,
      }
    : {
        refused: true,
      };
}

function installEditorExtensionsHost(
  installEditorExtensionsHost2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let { host: installEditorExtensionsHost3 }: Dynamic =
    installEditorExtensionsHost2;
  if (
    installEditorExtensionsHost3 === null ||
    !helloDImport(installEditorExtensionsHost3)
  )
    return (..._extraArguments: unknown[]): undefined => {};
  let options2 = (
    installEditorExtensionsHost4?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let helloLImport2: Dynamic = helloLImport(installEditorExtensionsHost3);
    if (
      helloLImport2 === null ||
      installEditorExtensionsHost4.source !==
        installEditorExtensionsHost3.parent ||
      installEditorExtensionsHost4.origin !== helloLImport2
    )
      return;
    let editorExtensionsFragment = resolveEditorExtensionsFragment(
      installEditorExtensionsHost4.data,
    );
    if (editorExtensionsFragment !== null) {
      if (`refused` in editorExtensionsFragment) {
        installEditorExtensionsHost2.log?.(EditorExtensionsGotoAnchorRefused);
        return;
      }
      options(editorExtensionsFragment.fragment);
    }
  };
  installEditorExtensionsHost3.self.addEventListener(`message`, options2);
  return (..._extraArguments: unknown[]): Dynamic =>
    installEditorExtensionsHost3.self.removeEventListener(`message`, options2);
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeEditorExtensions4Step1(): void {
  (resolveEditorExtensionsRead = (
    editorExtensionsRead?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    editorExtensionsRead.verb === `read`
      ? `read`
      : editorExtensionsRead.verb === `query` ||
          editorExtensionsRead.verb === `config`
        ? `query`
        : editorExtensionsRead.verb === `presence` ||
            editorExtensionsRead.verb === `client_event`
          ? `presence`
          : `write`);
  (resolveEditorExtensionsRead2 = (
    editorExtensionsRead2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    editorExtensionsRead2.payload.verb === `read` ||
    editorExtensionsRead2.payload.verb === `update`);
  (resolveEditorExtensionsValue34 = (
    editorExtensionsValue34?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof editorExtensionsValue34 == `string`
      ? editorExtensionsValue34
      : undefined);
  (EditorExtensionsReadTimeouts = class {
    [key: string]: Dynamic;
    key: Dynamic;
    stream: Dynamic;
    state: Dynamic = `opening`;
    get regranting(): Dynamic {
      return this.state !== `dead` && this.s.grantBlip.has(this.key);
    }
    get connecting() {
      return this.state !== `dead` && !this.streamOpen;
    }
    get hasOpened(): Dynamic {
      return this.everOpened;
    }
    since: Dynamic = null;
    head: Dynamic = 0;
    viewer: Dynamic = null;
    viewerRole: Dynamic = null;
    viewerClass: Dynamic = null;
    s: Dynamic;
    cache: Dynamic = new (Map as Dynamic)();
    index: Dynamic = new (Map as Dynamic)();
    subs: Dynamic = new (Set as Dynamic)();
    seeded: Dynamic = false;
    chunks: Dynamic = 0;
    seededResolve: Dynamic;
    seededReject: Dynamic;
    seededP: Dynamic;
    cycleSince: Dynamic = null;
    cycleSawSnapshot: Dynamic = false;
    cycleResumed: Dynamic = false;
    protocolRetried: Dynamic = false;
    voidRetried: Dynamic = false;
    backoffMs: Dynamic = 500;
    cancelReopen: Dynamic;
    lastEchoed: Dynamic = null;
    deadReason: Dynamic = null;
    progress: Dynamic = 0;
    answered: Dynamic = 0;
    strikes: Dynamic = 0;
    grantResets: Dynamic = 0;
    strikeHead: Dynamic = null;
    shedHint: Dynamic = null;
    cancelResumed: Dynamic;
    lastEndExempt: Dynamic = false;
    lastEndStormExempt: Dynamic = false;
    stormSince: Dynamic = undefined;
    stormOpens: Dynamic = 0;
    stormFirstAt: Dynamic = 0;
    stormLastAt: Dynamic = 0;
    storming: Dynamic = false;
    stormNow(..._extraArguments: unknown[]): Dynamic {
      return typeof this.s.deps.now == `function` ? this.s.deps.now() : 0;
    }
    retiredSaid: Dynamic = null;
    parkedAt: Dynamic = null;
    parkedWhy: Dynamic = null;
    silentSince: Dynamic = null;
    silentSeq: Dynamic = 0;
    hiddenSeenAt: Dynamic = null;
    sawHidden(
      editorExtensionsReadTimeouts?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (this.isHidden()) {
        this.hiddenSeenAt = editorExtensionsReadTimeouts;
      }
    }
    heard(
      editorExtensionsReadTimeouts?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        this.silentSince === null ||
        editorExtensionsReadTimeouts < this.silentSeq
      )
        return;
      let editorExtensionsReadTimeoutsResult: Dynamic = null;
      for (let editorExtensionsReadTimeoutsResult2 of this.outbox as Dynamic)
        if (
          editorExtensionsReadTimeoutsResult2.seq !== null &&
          !editorExtensionsReadTimeoutsResult2.acked &&
          editorExtensionsReadTimeoutsResult2.postedAt !== undefined &&
          editorExtensionsReadTimeoutsResult2.payload.verb !== `client_event` &&
          (editorExtensionsReadTimeoutsResult === null ||
            editorExtensionsReadTimeoutsResult2.seq <
              editorExtensionsReadTimeoutsResult.seq)
        ) {
          editorExtensionsReadTimeoutsResult =
            editorExtensionsReadTimeoutsResult2;
        }
      this.silentSince =
        editorExtensionsReadTimeoutsResult === null
          ? null
          : editorExtensionsReadTimeoutsResult.postedAt;
      this.silentSeq =
        editorExtensionsReadTimeoutsResult === null
          ? 0
          : editorExtensionsReadTimeoutsResult.seq;
    }
    parkNow(..._extraArguments: unknown[]) {
      try {
        let stormNow: Dynamic = this.stormNow();
        return typeof stormNow == `number` ? stormNow : NaN;
      } catch {
        return NaN;
      }
    }
    isHidden(..._extraArguments: unknown[]) {
      try {
        return this.s.deps.hidden?.() === true;
      } catch {
        return false;
      }
    }
    park(
      editorExtensionsReadTimeouts?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        !(this.parkedAt !== null || !this.everOpened || this.state === `dead`)
      ) {
        this.parkedAt = this.parkNow();
        this.parkedWhy = editorExtensionsReadTimeouts;
        this.sawHidden(this.parkedAt);
      }
    }
    clearParked(..._extraArguments: unknown[]): undefined {
      this.parkedAt = null;
      this.parkedWhy = null;
    }
    takeParked(..._extraArguments: unknown[]) {
      let editorExtensionsReadTimeouts: Dynamic = this.parkedAt;
      let editorExtensionsReadTimeoutsResult: Dynamic = this.parkedWhy;
      let silentSince: Dynamic = this.silentSince;
      this.clearParked();
      this.silentSince = null;
      this.silentSeq = 0;
      if (
        silentSince !== null &&
        (editorExtensionsReadTimeouts === null ||
          editorExtensionsReadTimeoutsResult === null ||
          editorExtensionsReadTimeouts - silentSince >= 5e3)
      ) {
        editorExtensionsReadTimeouts = silentSince;
        editorExtensionsReadTimeoutsResult = `unanswered`;
      }
      if (
        editorExtensionsReadTimeouts === null ||
        editorExtensionsReadTimeoutsResult === null
      )
        return null;
      let difference: Dynamic = this.parkNow() - editorExtensionsReadTimeouts;
      if (!(difference >= 5e3)) return null;
      let min = Math.min(65535, Math.floor(difference / 1e3));
      let matchesHiddenSeenAt =
        this.hiddenSeenAt !== null &&
        this.hiddenSeenAt >= editorExtensionsReadTimeouts;
      let platformSessionAndSourcesCreate =
        resolvePlatformSessionAndSourcesCreate(
          this.outbox
            .filter(
              (entry?: Dynamic, ..._extraArguments: unknown[]) =>
                entry.kind === `write`,
            )
            .map(
              (
                filteredOutbox?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => filteredOutbox.payload.verb,
            ),
        );
      return `parked why=${editorExtensionsReadTimeoutsResult} s=${min} depth=${Math.min(65535, this.outbox.length)} write=${platformSessionAndSourcesCreate === `w` ? 1 : platformSessionAndSourcesCreate === `c` ? `c` : 0} hidden=${+!!matchesHiddenSeenAt}`;
    }
    get parkedNow(): Dynamic {
      return this.parkedWhy;
    }
    silAt: Dynamic = NaN;
    silReads: Dynamic = 0;
    silBeatAt: Dynamic = NaN;
    silGap: Dynamic = 0;
    silLate: Dynamic = 0;
    silNow(..._extraArguments: unknown[]) {
      try {
        let now: Dynamic =
          typeof this.s.deps.now == `function` ? this.s.deps.now() : NaN;
        return typeof now == `number` ? now : NaN;
      } catch {
        return NaN;
      }
    }
    silHeard(..._extraArguments: unknown[]): undefined {
      try {
        let silNow = this.silNow();
        this.silAt = silNow;
        this.silBeatAt = silNow;
        this.silReads = 0;
        this.silGap = 0;
        this.silLate = 0;
      } catch {}
    }
    silBeat(..._extraArguments: unknown[]): undefined {
      try {
        let silNow = this.silNow();
        let difference: Dynamic = silNow - this.silBeatAt;
        this.silGap = Math.max(this.silGap, difference < 0 ? NaN : difference);
        this.silBeatAt = silNow;
      } catch {}
    }
    silDeadline(
      editorExtensionsReadTimeouts?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      try {
        let difference =
          this.silNow() -
          Math.max(
            editorExtensionsReadTimeouts.armedAt + editorExtensionsValue20000,
            this.silAt,
          );
        this.silLate = Math.max(this.silLate, difference < 0 ? 0 : difference);
        this.silBeat();
      } catch {}
    }
    silSettled(
      editorExtensionsReadTimeouts?: Dynamic,
      editorExtensionsReadTimeoutsResult?: Dynamic,
      silentSince?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      try {
        if (
          editorExtensionsReadTimeoutsResult === `TIMEOUT` &&
          !silentSince &&
          editorExtensionsReadTimeouts.kind === `read`
        ) {
          this.silReads = Math.min(65535, this.silReads + 1);
        }
      } catch {}
    }
    hiddenKnown(..._extraArguments: unknown[]) {
      try {
        let hidden: Dynamic = this.s.deps.hidden?.();
        return typeof hidden == `boolean` ? hidden : null;
      } catch {
        return null;
      }
    }
    silenceTail(..._extraArguments: unknown[]) {
      try {
        let silNow = this.silNow();
        let difference: Dynamic = silNow - this.silBeatAt;
        let lateMs: Dynamic = this.silLate;
        for (let editorExtensionsReadTimeoutsResult of this.outbox as Dynamic)
          if (editorExtensionsReadTimeoutsResult.cancelDeadline !== undefined) {
            lateMs = Math.max(
              lateMs,
              Math.max(
                0,
                silNow -
                  Math.max(
                    editorExtensionsReadTimeoutsResult.armedAt +
                      editorExtensionsValue20000,
                    this.silAt,
                  ),
              ),
            );
          }
        let platformSessionAndSourcesSilenceMs: Dynamic =
          resolvePlatformSessionAndSourcesSilenceMs({
            readTimeouts: this.silReads,
            gapMs: Math.max(this.silGap, difference < 0 ? NaN : difference),
            lateMs: lateMs,
            silenceMs: silNow - this.silAt,
            hidden: this.hiddenKnown(),
          });
        return platformSessionAndSourcesSilenceMs === null
          ? ``
          : ` sil=${platformSessionAndSourcesSilenceMs}`;
      } catch {
        return ``;
      }
    }
    get guarded() {
      return this.s.deps.churnGuard?.() === true;
    }
    streamOpen: Dynamic = false;
    nextSeq: Dynamic = 1;
    outbox: Dynamic = [];
    byOpId: Dynamic = new (Map as Dynamic)();
    sendPaused: Dynamic = false;
    cancelResume: Dynamic;
    sendBackoffMs: Dynamic = 500;
    reopenCause: Dynamic = null;
    refusedWrite: Dynamic = false;
    deniedWrite: Dynamic = false;
    deniedComment: Dynamic = false;
    leanBodies: Dynamic;
    viewBodies: Dynamic;
    sendMount: Dynamic;
    sendSc: Dynamic;
    everOpened: Dynamic = false;
    preOpenWeathered: Dynamic = false;
    preOpenSpecWaitMs: Dynamic = 0;
    refill: Dynamic = null;
    recoldAt: Dynamic = new (Map as Dynamic)();
    recoldCooling: Dynamic = false;
    cancelRecoldCooling: Dynamic;
    recoldTrailing: Dynamic = null;
    lastWritable: Dynamic;
    lastCommentable: Dynamic;
    constructor(
      editorExtensionsReadTimeouts?: Dynamic,
      editorExtensionsReadTimeoutsResult?: Dynamic,
      silentSince?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      this.s = editorExtensionsReadTimeouts;
      this.key = editorExtensionsReadTimeoutsResult;
      this.stream = silentSince;
      this.seededP = new (Promise as Dynamic)(
        (
          resolve?: Dynamic,
          reject?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          this.seededResolve = resolve;
          this.seededReject = reject;
        },
      );
      this.seededP.catch((..._extraArguments: unknown[]): undefined => {});
      this.leanBodies = !editorExtensionsReadTimeouts.relaySilent;
      this.viewBodies =
        this.leanBodies &&
        editorExtensionsReadTimeouts.deps.viewFirstPaint?.() === true;
      this.sendMount =
        typeof editorExtensionsReadTimeouts.deps.mount == `string` &&
        editorExtensionsReadTimeouts.deps.mount !== ``;
      this.sendSc =
        typeof editorExtensionsReadTimeouts.deps.sc == `string` &&
        editorExtensionsReadTimeouts.deps.sc !== ``;
      this.lastWritable = this.writable;
      this.lastCommentable = this.commentable;
    }
    get sendable(): Dynamic {
      return !this.refusedWrite && (this.s.joinedSendable ?? true);
    }
    get writable(): Dynamic {
      return (
        this.sendable &&
        resolveEditorExtensionsValue29(this.viewerRole) &&
        !this.deniedWrite &&
        this.s.shellCanEdit !== false
      );
    }
    get commentable(): Dynamic {
      if (this.writable) return true;
      let editorExtensionsReadTimeouts: Dynamic = this.viewerRole;
      return (
        this.sendable &&
        !this.deniedComment &&
        editorExtensionsReadTimeouts !== null &&
        editorExtensionsSet13.has(editorExtensionsReadTimeouts) &&
        !editorExtensionsSet12.has(editorExtensionsReadTimeouts)
      );
    }
    get writableKnown(): Dynamic {
      return (
        this.refusedWrite ||
        this.deniedWrite ||
        this.s.shellCanEdit !== null ||
        this.s.joinedSendable === false ||
        (this.s.joinedSendable === true && this.seeded)
      );
    }
    onShellVerdict(..._extraArguments: unknown[]): undefined {
      this.emitWritableIfChanged();
    }
    log(
      editorExtensionsReadTimeouts?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      this.s.deps.log?.(`lane:${editorExtensionsReadTimeouts}`);
    }
    emit(
      editorExtensionsReadTimeouts?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      for (let editorExtensionsReadTimeoutsResult of [...this.subs] as Dynamic)
        try {
          editorExtensionsReadTimeoutsResult.fn(editorExtensionsReadTimeouts);
        } catch {
          this.log(`listener-error`);
        }
    }
    emitWritableIfChanged(..._extraArguments: unknown[]): undefined {
      let editorExtensionsReadTimeouts: Dynamic = this.writable;
      if (editorExtensionsReadTimeouts !== this.lastWritable) {
        this.lastWritable = editorExtensionsReadTimeouts;
        this.log(`writable:${editorExtensionsReadTimeouts}`);
        this.emit({
          kind: `writable`,
          writable: editorExtensionsReadTimeouts,
        });
      }
      let editorExtensionsReadTimeoutsResult: Dynamic = this.commentable;
      if (editorExtensionsReadTimeoutsResult !== this.lastCommentable) {
        this.lastCommentable = editorExtensionsReadTimeoutsResult;
        this.log(`commentable:${editorExtensionsReadTimeoutsResult}`);
        this.emit({
          kind: `commentable`,
          commentable: editorExtensionsReadTimeoutsResult,
        });
      }
    }
    liftWriteWall(
      editorExtensionsReadTimeouts?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (this.deniedWrite) {
        this.deniedWrite = false;
        this.log(`write-wall:lifted:${editorExtensionsReadTimeouts}`);
        this.emitWritableIfChanged();
      }
    }
    liftCommentWall(
      editorExtensionsReadTimeouts?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (this.deniedComment) {
        this.deniedComment = false;
        this.log(`comment-wall:lifted:${editorExtensionsReadTimeouts}`);
        this.emitWritableIfChanged();
      }
    }
    begin(..._extraArguments: unknown[]): undefined {
      if (this.s.port.shellOrigin === null && !this.s.port.pending) {
        this.die(helloRImport.toUpperCase());
        return;
      }
      if (this.s.helloTerminal !== null) {
        this.die(this.s.helloTerminal);
        return;
      }
      if (this.s.helloAnswered) {
        this.postOpen();
      } else {
        this.state = `waiting`;
      }
    }
    onHelloAnswered(..._extraArguments: unknown[]): undefined {
      if (this.state === `waiting` || this.state === `backoff`) {
        this.postOpen();
      }
    }
    onRestart(
      editorExtensionsReadTimeouts?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (this.state !== `dead`) {
        this.cancelReopen?.();
        this.cancelReopen = undefined;
        this.cancelResume?.();
        this.cancelResume = undefined;
        this.sendPaused = false;
        this.streamOpen = false;
        this.reopenCause = editorExtensionsReadTimeouts;
        this.state = `waiting`;
        this.nextCycle();
        this.emit({
          kind: `down`,
          reason: editorExtensionsReadTimeouts,
          terminal: false,
        });
      }
    }
    onTerminal(
      editorExtensionsReadTimeouts?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      this.die(editorExtensionsReadTimeouts);
    }
    postOpen(
      editorExtensionsReadTimeouts: Dynamic = false,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        this.storming &&
        this.guarded &&
        !editorExtensionsReadTimeouts &&
        this.refill === null
      ) {
        this.log(`storm-paced`);
        this.scheduleReopen();
        return;
      }
      this.cancelReopen?.();
      this.cancelReopen = undefined;
      this.state = `opening`;
      this.streamOpen = false;
      if (this.refill !== null) {
        this.since = null;
        this.lastEchoed = null;
        this.refill.opened = false;
      }
      this.nextCycle();
      let editorExtensionsReadTimeoutsResult: Dynamic = {
        container: this.key,
        ...(this.leanBodies
          ? {
              bodies: this.viewBodies ? `view` : `rev`,
            }
          : {}),
        ...(this.sendMount
          ? {
              mount: this.s.deps.mount,
            }
          : {}),
        ...(this.sendSc
          ? {
              sc: this.s.deps.sc,
            }
          : {}),
      };
      if (
        !this.s.port.open(
          this.stream,
          editorExtensionsReadTimeoutsResult,
          this.since,
        )
      ) {
        this.die(`BAD_OPEN`);
        return;
      }
      this.park(`open_unanswered`);
      helloImport(`open`);
    }
    scheduleRegrant(
      editorExtensionsReadTimeouts?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      this.cancelReopen?.();
      this.state = `backoff`;
      this.cancelReopen = this.s.deps.schedule(
        (..._extraArguments: unknown[]): undefined => {
          this.cancelReopen = undefined;
          if (this.state === `backoff`) {
            this.postOpen(true);
          }
        },
        editorExtensionsReadTimeouts,
      );
    }
    scheduleReopen(
      editorExtensionsReadTimeouts?: Dynamic,
      editorExtensionsReadTimeoutsResult: Dynamic = 0,
      ..._extraArguments: unknown[]
    ) {
      this.cancelReopen?.();
      this.state = `backoff`;
      let silentSince = Math.max(
        editorExtensionsReadTimeouts !== undefined &&
          editorExtensionsSet18.has(editorExtensionsReadTimeouts)
          ? editorExtensionsValue10003
          : 0,
        editorExtensionsReadTimeoutsResult,
      );
      let difference: Dynamic = this.storming && this.guarded;
      let min = difference
        ? Math.max(
            silentSince,
            this.backoffMs / 2 + this.s.deps.random() * (this.backoffMs / 2),
          )
        : silentSince + this.s.deps.random() * this.backoffMs;
      this.backoffMs = Math.min(
        this.backoffMs * 2,
        difference ? editorExtensionsValue60000 : editorExtensionsValue30000,
      );
      this.cancelReopen = this.s.deps.schedule(
        (..._extraArguments: unknown[]): undefined => {
          this.cancelReopen = undefined;
          if (this.state === `backoff`) {
            this.postOpen(true);
          }
        },
        min,
      );
      return min;
    }
    die(
      editorExtensionsReadTimeouts?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (this.state !== `dead`) {
        this.cancelReopen?.();
        this.cancelReopen = undefined;
        this.cancelResume?.();
        this.cancelResume = undefined;
        this.sayResumed();
        this.state = `dead`;
        this.streamOpen = false;
        this.clearParked();
        this.silentSince = null;
        this.hiddenSeenAt = null;
        this.deadReason = editorExtensionsReadTimeouts;
        this.log(
          `dead:${editorExtensionsReadTimeouts}${this.sendSc ? ` sc=${this.s.deps.sc}` : ``}`,
        );
        if (!this.seeded) {
          this.seededReject(
            Error(
              `frameShell: lane ${this.key} unavailable (${editorExtensionsReadTimeouts})`,
            ),
          );
        }
        for (let editorExtensionsReadTimeoutsResult of [
          ...this.outbox,
        ] as Dynamic)
          this.settleReject(
            editorExtensionsReadTimeoutsResult,
            `DEAD:${editorExtensionsReadTimeouts}`,
          );
        this.refill?.done();
        this.refill = null;
        this.cancelRecoldCooling?.();
        this.cancelRecoldCooling = undefined;
        this.recoldTrailing = null;
        this.emit({
          kind: `down`,
          reason: editorExtensionsReadTimeouts,
          terminal: true,
        });
      }
    }
    onState(..._extraArguments: unknown[]): undefined {
      if (this.s.connected) {
        if (this.s.joinedSendable === true) {
          this.refusedWrite = false;
        }
        if (this.storming && this.guarded) {
          this.backoffMs = editorExtensionsValue2000;
        }
      } else {
        this.streamOpen = false;
        if (this.state !== `dead`) {
          this.nextCycle();
        }
        this.park(`state_down`);
      }
      if (!this.sendable) {
        this.readsOffCache();
      }
      this.emitWritableIfChanged();
    }
    onMsg(
      editorExtensionsReadTimeouts?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (this.state !== `dead`)
        switch (
          (editorExtensionsReadTimeouts.op === `ack` ||
          editorExtensionsReadTimeouts.op === `result` ||
          editorExtensionsReadTimeouts.op === `refused`
            ? (this.progress++,
              (editorExtensionsReadTimeouts.op === `refused` &&
                editorExtensionsSet15.has(editorExtensionsReadTimeouts.reason)) ||
                this.answered++)
            : editorExtensionsReadTimeouts.op !== `reset` &&
              this.strikes === 0 &&
              !(
                editorExtensionsReadTimeouts.op === `frame` &&
                editorExtensionsReadTimeouts.payload.phase === `shed`
              ) &&
              this.progress++,
          editorExtensionsReadTimeouts.op)
        ) {
          case `opened`:
            this.onOpened();
            return;
          case `frame`:
            this.silHeard();
            this.onEnvelope(editorExtensionsReadTimeouts.payload);
            return;
          case `reset`:
            this.onReset(
              editorExtensionsReadTimeouts.reason,
              editorExtensionsReadTimeouts.reopening,
            );
            return;
          case `ack`:
            this.onAck(editorExtensionsReadTimeouts.ack);
            return;
          case `refused`:
            this.onRefused(
              editorExtensionsReadTimeouts.seq,
              editorExtensionsReadTimeouts.reason,
              editorExtensionsReadTimeouts.expected,
              editorExtensionsReadTimeouts.retryAfterMs,
            );
            return;
          case `result`:
            this.onResult(
              editorExtensionsReadTimeouts.seq,
              editorExtensionsReadTimeouts.status,
              editorExtensionsReadTimeouts.result,
            );
            return;
          default:
            return;
        }
    }
    onOpened(..._extraArguments: unknown[]): undefined {
      helloImport(`opened`);
      let editorExtensionsReadTimeouts = this.state === `opening`;
      this.state = `snapshot`;
      this.everOpened = true;
      this.liftWriteWall(`opened`);
      this.liftCommentWall(`opened`);
      if (this.refill !== null) {
        this.refill.opened = true;
        this.nextCycle(null);
      }
      this.streamOpen = true;
      this.nextSeq = 1;
      this.sendPaused = false;
      this.cancelResume?.();
      this.cancelResume = undefined;
      let editorExtensionsReadTimeoutsResult: Dynamic = this.reopenCause;
      this.reopenCause = null;
      let silentSince: Dynamic = this.lastEndExempt;
      let difference: Dynamic = this.lastEndStormExempt;
      this.lastEndExempt = false;
      this.lastEndStormExempt = false;
      let min = this.guarded;
      let matchesHiddenSeenAt = difference ? null : this.noteOpened();
      let takeParked = this.takeParked();
      let silenceTail = this.silenceTail();
      this.retiredSaid = [];
      for (let entry of [...this.outbox] as Dynamic) {
        if (min && entry.tailVerdict !== undefined) {
          this.log(`send:settled-from-tail`);
          this.settleResolve(entry, entry.tailVerdict);
          continue;
        }
        if (
          min &&
          !silentSince &&
          resolveEditorExtensionsRead2(entry) &&
          entry.posted &&
          entry.seq !== null &&
          !entry.acked &&
          (entry.lostInstances++, entry.lostInstances > 3)
        ) {
          this.log(
            `send:instance-churn kind=${entry.kind} lost=${entry.lostInstances}`,
          );
          this.settleReject(entry, INSTANCE_CHURN);
          continue;
        }
        if (entry.kind === `presence` && entry.posted && entry.seq !== null) {
          this.log(
            entry.acked ? `send:ephemeral-acked` : `send:ephemeral-unacked`,
          );
          this.settleResolve(entry, {
            status: 202,
            body: {},
          });
          continue;
        }
        if (editorExtensionsReadTimeoutsResult === `PROTOCOL` && entry.posted) {
          if (entry.protocolResent) {
            this.log(`send:poison`);
            this.settleReject(entry, `PROTOCOL`);
            continue;
          }
          entry.protocolResent = true;
        }
        entry.seq = null;
        entry.acked = false;
      }
      this.pump();
      if (this.seeded && this.cycleSince !== null && this.refill === null) {
        this.log(
          `${editorExtensionsReadTimeouts ? `opened:resumed` : `opened:resumed:shell`}${silenceTail}`,
        );
        this.cycleResumed = true;
        this.streamBack(null);
        this.oweResumed();
      }
      if (matchesHiddenSeenAt !== null) {
        this.log(matchesHiddenSeenAt);
      }
      let retiredSaid: Dynamic = this.retiredSaid;
      this.retiredSaid = null;
      if (takeParked !== null) {
        retiredSaid.push(takeParked);
      }
      for (let editorExtensionsReadTimeoutsResult2 of retiredSaid as Dynamic)
        this.log(editorExtensionsReadTimeoutsResult2);
    }
    oweResumed(..._extraArguments: unknown[]): undefined {
      this.cancelResumed?.();
      this.cancelResumed = this.s.deps.schedule(
        (..._extraArguments: unknown[]) => this.sayResumed(),
        50,
      );
    }
    sayResumed(..._extraArguments: unknown[]): undefined {
      if (this.cancelResumed !== undefined) {
        this.dropResumed();
        if (this.state !== `dead`) {
          this.emit({
            kind: `recovered`,
          });
        }
      }
    }
    dropResumed(..._extraArguments: unknown[]): undefined {
      this.cancelResumed?.();
      this.cancelResumed = undefined;
    }
    nextCycle(
      editorExtensionsReadTimeouts: Dynamic = this.since,
      ..._extraArguments: unknown[]
    ): undefined {
      this.sayResumed();
      this.shedHint = null;
      this.cycleSince = editorExtensionsReadTimeouts;
      this.cycleSawSnapshot = false;
      this.cycleResumed = false;
    }
    streamBack(
      editorExtensionsReadTimeouts?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      this.state = `live`;
      if (!(this.storming && this.guarded)) {
        this.protocolRetried = false;
        this.voidRetried = false;
        if (this.strikes === 0) {
          this.backoffMs = 500;
        }
      }
      this.grantResets = 0;
      this.s.grantBlip.delete(this.key);
      this.s.restarts = 0;
      if (editorExtensionsReadTimeouts !== null) {
        this.emit({
          kind: editorExtensionsReadTimeouts,
        });
      }
    }
    noteOpened(..._extraArguments: unknown[]) {
      let editorExtensionsReadTimeouts: Dynamic = this.cycleSince;
      let editorExtensionsReadTimeoutsResult: Dynamic = this.stormNow();
      let silentSince = typeof this.s.deps.now == `function`;
      if (
        this.storming &&
        silentSince &&
        editorExtensionsReadTimeoutsResult - this.stormLastAt > 3e5
      ) {
        this.log(`reopen-storm:lapsed`);
        this.storming = false;
        this.stormSince = undefined;
        this.stormOpens = 0;
      }
      this.stormLastAt = editorExtensionsReadTimeoutsResult;
      if (
        !(
          this.stormSince !== undefined &&
          this.stormSince === editorExtensionsReadTimeouts &&
          (!silentSince ||
            editorExtensionsReadTimeoutsResult - this.stormFirstAt <= 6e4)
        )
      ) {
        this.stormSince = editorExtensionsReadTimeouts;
        this.stormOpens = 1;
        this.stormFirstAt = editorExtensionsReadTimeoutsResult;
        return null;
      }
      this.stormOpens++;
      if (!this.storming && this.stormOpens >= 4) {
        this.storming = true;
        if (this.guarded) {
          this.backoffMs = Math.max(this.backoffMs, editorExtensionsValue2000);
        }
        let amount = silentSince
          ? (editorExtensionsReadTimeoutsResult - this.stormFirstAt) /
            (this.stormOpens - 1)
          : -1;
        let label =
          amount < 0
            ? `none`
            : amount < 2e3
              ? `lt2s`
              : amount < 5e3
                ? `lt5s`
                : amount < 15e3
                  ? `lt15s`
                  : `lt60s`;
        return `reopen-storm n=${this.stormOpens} resumed=${editorExtensionsReadTimeouts !== null} cadence=${label}`;
      }
      return null;
    }
    instanceProved(..._extraArguments: unknown[]): undefined {
      if (this.stormOpens === 0 && !this.storming) return;
      let editorExtensionsReadTimeouts: Dynamic = this.storming;
      this.stormSince = undefined;
      this.stormOpens = 0;
      this.storming = false;
      if (editorExtensionsReadTimeouts) {
        this.log(`reopen-storm:cleared`);
        if (this.state === `live` && this.guarded) {
          this.protocolRetried = false;
          this.voidRetried = false;
          if (this.strikes === 0) {
            this.backoffMs = 500;
          }
        }
      }
    }
    get reopenStorming(): Dynamic {
      return this.storming;
    }
    onReset(
      editorExtensionsReadTimeouts?: Dynamic,
      editorExtensionsReadTimeoutsResult?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let silentSince: Dynamic = this.streamOpen;
      this.streamOpen = false;
      this.reopenCause = editorExtensionsReadTimeouts;
      let difference: Dynamic = this.shedHint;
      this.shedHint = null;
      if (silentSince) {
        this.lastEndExempt = true;
        this.lastEndStormExempt =
          difference !== null ||
          editorExtensionsSet17.has(editorExtensionsReadTimeouts);
      }
      if (difference === null) {
        this.sayResumed();
        if (editorExtensionsSet17.has(editorExtensionsReadTimeouts)) {
          this.strike(editorExtensionsReadTimeouts, silentSince);
        }
      }
      if (editorExtensionsSet22.has(editorExtensionsReadTimeouts)) {
        this.since = null;
        this.lastEchoed = null;
      }
      if (editorExtensionsReadTimeoutsResult) {
        if (difference === null) {
          this.log(`reopen:shell:${editorExtensionsReadTimeouts}`);
        } else {
          this.log(`reopen:shell:SHED:${difference.cause}`);
        }
        this.cancelReopen?.();
        this.cancelReopen = undefined;
        this.state = `waiting`;
        this.nextCycle();
        this.park(`reset_reopening`);
        return;
      }
      if (editorExtensionsReadTimeouts === `GRANT`) {
        let grantBlipEntry: Dynamic = this.s.grantBlip.get(this.key) ?? 0;
        if (grantBlipEntry >= 6e4 || ++this.grantResets > 6) {
          this.log(`dead:GRANT after ${grantBlipEntry} ms of re-grants`);
          this.die(editorExtensionsReadTimeouts);
          return;
        }
        let EditorExtensionsState8Item =
          EditorExtensionsState8[
            Math.min(this.grantResets - 1, EditorExtensionsState8.length - 1)
          ];
        let round = Math.round(
          EditorExtensionsState8Item * (1 + 0.2 * this.s.deps.random()),
        );
        this.s.grantBlip.set(this.key, grantBlipEntry + round);
        this.log(
          `down:GRANT n=${this.grantResets} waited=${grantBlipEntry} next=${round}`,
        );
        this.emit({
          kind: `down`,
          reason: editorExtensionsReadTimeouts,
          terminal: false,
        });
        this.scheduleRegrant(round);
        return;
      }
      let min =
        editorExtensionsReadTimeouts === `BAD_SPEC` ||
        editorExtensionsReadTimeouts === `UNAVAILABLE`;
      let matchesHiddenSeenAt: Dynamic = min || this.preOpenWeathered;
      if (
        !this.everOpened &&
        matchesHiddenSeenAt &&
        (editorExtensionsReadTimeouts === `BAD_SPEC` ||
          !editorExtensionsSet21.has(editorExtensionsReadTimeouts))
      ) {
        if (this.leanBodies && this.viewBodies) {
          this.viewBodies = false;
          this.log(`reopen:rev-bodies`);
          this.postOpen();
          return;
        }
        if (this.sendSc) {
          this.sendSc = false;
          this.log(`reopen:no-sc`);
          this.postOpen();
          return;
        }
        if (this.sendMount) {
          this.sendMount = false;
          this.log(`reopen:no-mount`);
          this.postOpen();
          return;
        }
        if (this.leanBodies && editorExtensionsReadTimeouts === `BAD_SPEC`) {
          this.leanBodies = false;
          this.log(`reopen:full-bodies`);
          this.postOpen();
          return;
        }
      }
      if (
        !this.everOpened &&
        min &&
        (editorExtensionsReadTimeouts === `BAD_SPEC` ||
          this.preOpenSpecWaitMs >= 6e4)
      ) {
        this.log(
          `dead:${editorExtensionsReadTimeouts}:pre-open waited=${Math.round(this.preOpenSpecWaitMs)} sc=${this.s.deps.sc ?? `-`}`,
        );
        this.die(editorExtensionsReadTimeouts);
        return;
      }
      if (editorExtensionsSet21.has(editorExtensionsReadTimeouts)) {
        this.die(editorExtensionsReadTimeouts);
        return;
      }
      if (
        editorExtensionsSet22.has(editorExtensionsReadTimeouts) &&
        !this.voidRetried
      ) {
        this.voidRetried = true;
        this.log(`reopen:cold:${editorExtensionsReadTimeouts}`);
        this.postOpen();
        return;
      }
      if (editorExtensionsReadTimeouts === `PROTOCOL` && !this.protocolRetried) {
        this.protocolRetried = true;
        this.log(`reopen:PROTOCOL`);
        this.postOpen();
        return;
      }
      if (!this.everOpened) {
        this.preOpenWeathered = true;
      }
      this.log(`down:${editorExtensionsReadTimeouts}`);
      this.emit({
        kind: `down`,
        reason: editorExtensionsReadTimeouts,
        terminal: false,
      });
      let platformSessionAndSourcesCreate = this.scheduleReopen(
        editorExtensionsReadTimeouts,
        difference?.retryAfterMs ?? 0,
      );
      if (!this.everOpened && min) {
        this.preOpenSpecWaitMs += platformSessionAndSourcesCreate;
      }
    }
    onEnvelope(
      editorExtensionsReadTimeouts?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (editorExtensionsReadTimeouts.phase === `shed`) {
        let data: Dynamic = resolveEditorExtensionsValue31(
          editorExtensionsReadTimeouts.data,
        )
          ? editorExtensionsReadTimeouts.data
          : {};
        let retryAfterMs: Dynamic =
          typeof data.retryAfterMs == `number` &&
          Number.isFinite(data.retryAfterMs)
            ? data.retryAfterMs
            : 0;
        let cause: Dynamic =
          typeof data.cause == `string` && /^[a-z_]{1,24}$/.test(data.cause)
            ? data.cause
            : `unknown`;
        this.shedHint = {
          retryAfterMs: Math.min(
            Math.max(0, Math.round(retryAfterMs)),
            editorExtensionsValue300002,
          ),
          cause: cause,
        };
        this.log(`shed:${cause} retryAfterMs=${this.shedHint.retryAfterMs}`);
        this.lastEndExempt = true;
        this.lastEndStormExempt = true;
        this.dropResumed();
        return;
      }
      this.sayResumed();
      if (typeof editorExtensionsReadTimeouts.t == `string`) {
        this.onTailVerdict(editorExtensionsReadTimeouts);
        return;
      }
      switch (editorExtensionsReadTimeouts.phase) {
        case `snapshot`: {
          this.chunks++;
          helloImport(`snap0`);
          if (!this.cycleSawSnapshot) {
            this.cycleSawSnapshot = true;
            if (this.cycleSince === null && this.refill === null) {
              this.cache.clear();
              this.index.clear();
              this.head = 0;
            }
          }
          let values: Dynamic = editorExtensionsReadTimeouts.values;
          if (resolveEditorExtensionsValue31(values))
            for (let [
              editorExtensionsReadTimeoutsResult,
              editorExtensionsReadTimeoutsResult2,
            ] of Object.entries(values) as Dynamic)
              this.cache.set(
                editorExtensionsReadTimeoutsResult,
                editorExtensionsReadTimeoutsResult2,
              );
          if (Array.isArray(editorExtensionsReadTimeouts.refs))
            for (let editorExtensionsReadTimeoutsResult of editorExtensionsReadTimeouts.refs as Dynamic)
              this.indexSnapshotRef(editorExtensionsReadTimeoutsResult);
          if (
            typeof editorExtensionsReadTimeouts.head == `number` &&
            editorExtensionsReadTimeouts.head > this.head
          ) {
            this.head = editorExtensionsReadTimeouts.head;
          }
          this.state = `snapshot`;
          return;
        }
        case `fence`: {
          this.instanceProved();
          if (this.refill !== null) {
            if (!this.refill.opened) {
              this.log(`fence:superseded`);
              return;
            }
            let { done: refill }: Dynamic = this.refill;
            this.refill = null;
            refill();
          }
          if (typeof editorExtensionsReadTimeouts.pos == `string`) {
            this.advance(editorExtensionsReadTimeouts.pos);
          }
          let viewer: Dynamic = resolveEditorExtensionsValue31(
            editorExtensionsReadTimeouts.viewer,
          )
            ? editorExtensionsReadTimeouts.viewer
            : {};
          let principal: Dynamic =
            typeof viewer.principal == `string` && viewer.principal.length > 0
              ? viewer.principal
              : null;
          let role: Dynamic =
            typeof viewer.role == `string` && viewer.role.length > 0
              ? viewer.role
              : null;
          let cls: Dynamic =
            typeof viewer.class == `string` && viewer.class.length > 0
              ? viewer.class
              : principal !== null && principal !== this.viewer
                ? null
                : this.viewerClass;
          this.log(
            principal === null ? `fence:viewer:nobody` : `fence:viewer:named`,
          );
          if (role !== null && editorExtensionsSet12.has(role)) {
            this.liftWriteWall(`fence`);
          }
          if (role !== null && editorExtensionsSet13.has(role)) {
            this.liftCommentWall(`fence`);
          }
          if (
            principal !== this.viewer ||
            role !== this.viewerRole ||
            cls !== this.viewerClass
          ) {
            this.viewer = principal;
            this.viewerRole = role;
            this.viewerClass = cls;
            this.emit({
              kind: `viewer`,
              principal: principal,
              role: role,
              cls: cls,
            });
            this.emitWritableIfChanged();
          }
          if (this.seeded) {
            if (this.cycleResumed && !this.cycleSawSnapshot) {
              this.log(`fence:resumed`);
              this.streamBack(null);
            } else {
              this.streamBack(`recovered`);
            }
          } else {
            helloImport(`fence`, {
              snapChunks: this.chunks,
              snapRefs: this.index.size,
              snapValues: this.cache.size,
            });
            this.seeded = true;
            this.seededResolve();
            this.streamBack(`live`);
          }
          return;
        }
        case `tail`: {
          this.instanceProved();
          let safeParse: Dynamic = PlatformSessionAndSourcesActor.safeParse(
            editorExtensionsReadTimeouts,
          );
          if (!safeParse.success) {
            this.log(`tail:malformed`);
            return;
          }
          let seq: Dynamic =
            typeof editorExtensionsReadTimeouts.seq == `number`
              ? editorExtensionsReadTimeouts.seq
              : null;
          let opId: Dynamic =
            typeof editorExtensionsReadTimeouts.opId == `string`
              ? editorExtensionsReadTimeouts.opId
              : typeof editorExtensionsReadTimeouts.op_id == `string`
                ? editorExtensionsReadTimeouts.op_id
                : null;
          if (seq !== null && seq > this.head) {
            this.head = seq;
          }
          this.applyDiff(safeParse.data, seq);
          if (typeof editorExtensionsReadTimeouts.pos == `string`) {
            this.advance(editorExtensionsReadTimeouts.pos);
          }
          this.emit({
            kind: `envelope`,
            envelope: safeParse.data,
            seq: seq,
            opId: opId,
          });
          return;
        }
        case `access`:
          this.liftWriteWall(`access`);
          this.liftCommentWall(`access`);
          this.emit({
            kind: `access-changed`,
          });
          return;
        case `presence`: {
          let safeParse: Dynamic = PlatformSessionAndSourcesPrincipal.safeParse(
            editorExtensionsReadTimeouts,
          );
          if (!safeParse.success) {
            this.log(`presence:malformed`);
            return;
          }
          this.emit({
            kind: `presence`,
            frame: safeParse.data,
          });
          return;
        }
        case `presenceLeave`: {
          let safeParse: Dynamic = PlatformSessionAndSourcesPrincipal2.safeParse(
            editorExtensionsReadTimeouts,
          );
          if (!safeParse.success) {
            this.log(`presence:malformed`);
            return;
          }
          this.emit({
            kind: `presence-leave`,
            principal: safeParse.data.principal,
            connId: safeParse.data.connId,
          });
          return;
        }
        case `verdict`:
          return;
        default:
          this.log(`phase:unknown`);
      }
    }
    onResult(
      editorExtensionsReadTimeouts?: Dynamic,
      editorExtensionsReadTimeoutsResult?: Dynamic,
      silentSince?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      this.instanceProved();
      let difference: Dynamic = this.entryFor(
        editorExtensionsReadTimeouts,
        silentSince,
      );
      if (difference === undefined) {
        this.log(`result:unmatched`);
        return;
      }
      let min: Dynamic = difference.seq;
      if (
        (editorExtensionsReadTimeoutsResult === `ACCEPTED` ||
          (editorExtensionsReadTimeoutsResult === null &&
            typeof silentSince.status == `number` &&
            typeof silentSince.code != `string`)) &&
        typeof silentSince.status == `number`
      ) {
        if (typeof silentSince.pos == `string` && silentSince.pos.length > 0) {
          this.advance(silentSince.pos);
        }
        let record2: Dynamic =
          silentSince.status < 200 || silentSince.status >= 300
            ? {
                ...(typeof silentSince.pos == `string` &&
                silentSince.pos.length > 0 &&
                silentSince.pos.length <= 512
                  ? {
                      pos: silentSince.pos,
                    }
                  : {}),
                ...(silentSince.duplicate === true
                  ? {
                      duplicate: true,
                    }
                  : {}),
              }
            : {};
        this.settleResolve(difference, {
          status: silentSince.status,
          body: silentSince.body,
          ...record2,
        });
      } else if (editorExtensionsReadTimeoutsResult === `ACCEPTED`) {
        this.log(`result:malformed`);
        this.settleReject(difference, `MALFORMED_RESULT`);
      } else {
        let editorExtensionsCode: Dynamic =
          resolveEditorExtensionsCode(silentSince);
        if (
          editorExtensionsCode === `PERMISSION_DENIED` &&
          difference.kind === `write`
        ) {
          if (
            resolveEditorExtensionsUtterance2(difference.payload) &&
            !this.deniedComment
          ) {
            this.deniedComment = true;
            this.log(`comment-wall`);
          }
          if (!this.deniedWrite) {
            this.deniedWrite = true;
            this.log(`write-wall`);
          }
          this.settleReject(difference, editorExtensionsCode);
          this.emitWritableIfChanged();
        } else {
          this.settleReject(difference, editorExtensionsCode);
        }
      }
      if (min !== null) {
        this.heard(min);
      }
      this.pump();
    }
    entryFor(
      editorExtensionsReadTimeouts?: Dynamic,
      editorExtensionsReadTimeoutsResult?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let silentSince: Dynamic =
        typeof editorExtensionsReadTimeoutsResult.opId == `string`
          ? editorExtensionsReadTimeoutsResult.opId
          : typeof editorExtensionsReadTimeoutsResult.op_id == `string`
            ? editorExtensionsReadTimeoutsResult.op_id
            : null;
      let difference: Dynamic =
        silentSince === null ? undefined : this.byOpId.get(silentSince);
      let min: Dynamic =
        editorExtensionsReadTimeouts === null
          ? undefined
          : this.outbox.find(
              (outbox?: Dynamic, ..._extraArguments: unknown[]) =>
                outbox.seq === editorExtensionsReadTimeouts,
            );
      return min !== undefined && silentSince !== null && min.opId !== silentSince
        ? (this.log(`result:opid-mismatch`), difference)
        : (min ?? difference);
    }
    advance(
      editorExtensionsReadTimeouts?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (this.refill === null) {
        if (!helloFImport(editorExtensionsReadTimeouts)) {
          this.log(`since:refused`);
          return;
        }
        this.since = editorExtensionsReadTimeouts;
        if (
          editorExtensionsReadTimeouts !== this.lastEchoed &&
          this.s.port.since(this.stream, editorExtensionsReadTimeouts)
        ) {
          this.lastEchoed = editorExtensionsReadTimeouts;
        }
      }
    }
    indexSnapshotRef(
      editorExtensionsReadTimeouts?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let editorExtensionsReadTimeoutsResult: Dynamic =
        resolveEditorExtensionsValue33(editorExtensionsReadTimeouts);
      if (
        editorExtensionsReadTimeoutsResult === undefined ||
        !resolveEditorExtensionsValue31(editorExtensionsReadTimeouts) ||
        typeof editorExtensionsReadTimeouts.engine != `string`
      ) {
        this.log(`snapshot:ref-malformed`);
        return;
      }
      let silentSince: Dynamic = resolveEditorExtensionsValue33(
        editorExtensionsReadTimeouts.parent,
      );
      let difference: Dynamic = editorExtensionsSet23.has(
        editorExtensionsReadTimeoutsResult.object,
      )
        ? resolveEditorExtensionsSeq(editorExtensionsReadTimeouts.born)
        : undefined;
      this.index.set(
        resolveEditorExtensionsValue32(editorExtensionsReadTimeoutsResult),
        {
          engine: editorExtensionsReadTimeouts.engine,
          ...(silentSince
            ? {
                parent: silentSince,
              }
            : {}),
          ...(difference
            ? {
                born: difference,
              }
            : {}),
        },
      );
    }
    applyDiff(
      editorExtensionsReadTimeouts?: Dynamic,
      editorExtensionsReadTimeoutsResult?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      for (let editorExtensionsReadTimeoutsResult2 of editorExtensionsReadTimeouts.diff as Dynamic) {
        if (
          !resolveEditorExtensionsValue31(
            editorExtensionsReadTimeoutsResult2.address,
          )
        )
          continue;
        let editorExtensionsValue33: Dynamic = resolveEditorExtensionsValue33(
          editorExtensionsReadTimeoutsResult2.address.ref,
        );
        if (editorExtensionsValue33 === undefined) continue;
        let container: Dynamic = resolveEditorExtensionsKind3(
          editorExtensionsReadTimeoutsResult2.address.container,
        );
        if (
          container !== undefined &&
          `${container.kind}/${container.id}` !== this.key
        )
          continue;
        let editorExtensionsValue32 = resolveEditorExtensionsValue32(
          editorExtensionsValue33,
        );
        if (editorExtensionsReadTimeoutsResult2.after === undefined) {
          this.cache.delete(editorExtensionsValue32);
          this.index.delete(editorExtensionsValue32);
          continue;
        }
        this.cache.set(
          editorExtensionsValue32,
          editorExtensionsReadTimeoutsResult2.after,
        );
        let indexEntry: Dynamic = this.index.get(editorExtensionsValue32);
        let parent: Dynamic = resolveEditorExtensionsParent(
          editorExtensionsReadTimeoutsResult2.after,
        );
        if (indexEntry !== undefined) {
          this.index.set(editorExtensionsValue32, {
            engine: indexEntry.engine,
            ...(parent
              ? {
                  parent: parent,
                }
              : {}),
            ...(indexEntry.born
              ? {
                  born: indexEntry.born,
                }
              : {}),
          });
          continue;
        }
        let born: Dynamic =
          editorExtensionsSet23.has(editorExtensionsValue33.object) &&
          editorExtensionsReadTimeoutsResult !== null
            ? {
                seq: editorExtensionsReadTimeoutsResult,
                at: editorExtensionsReadTimeouts.at,
                actor: editorExtensionsReadTimeouts.actor,
                ...(container
                  ? {
                      container: container,
                    }
                  : {}),
              }
            : undefined;
        this.index.set(editorExtensionsValue32, {
          engine: resolveEditorExtensionsNode2(
            editorExtensionsValue33.object,
            editorExtensionsReadTimeoutsResult2.after,
            editorExtensionsReadTimeouts.op?.engine,
          ),
          ...(parent
            ? {
                parent: parent,
              }
            : {}),
          ...(born
            ? {
                born: born,
              }
            : {}),
        });
      }
    }
    canPost(..._extraArguments: unknown[]): Dynamic {
      return (
        this.state !== `dead` &&
        this.streamOpen &&
        this.s.connected &&
        !this.sendPaused
      );
    }
    inWindow(..._extraArguments: unknown[]) {
      let editorExtensionsReadTimeouts = 0;
      for (let editorExtensionsReadTimeoutsResult of this.outbox as Dynamic)
        if (
          editorExtensionsReadTimeoutsResult.seq !== null &&
          !editorExtensionsReadTimeoutsResult.acked
        ) {
          editorExtensionsReadTimeouts++;
        }
      return editorExtensionsReadTimeouts;
    }
    pump(
      editorExtensionsReadTimeouts: Dynamic = true,
      ..._extraArguments: unknown[]
    ): undefined {
      if (this.silentSince !== null || this.parkedAt !== null) {
        this.sawHidden(this.parkNow());
      }
      if (!this.canPost()) return;
      let editorExtensionsReadTimeoutsResult = 24 - this.inWindow();
      for (let entry of [...this.outbox] as Dynamic) {
        if (!this.canPost() || editorExtensionsReadTimeoutsResult <= 0) return;
        if (
          entry.seq !== null ||
          entry.cacheOnly === true ||
          entry.snapHeld === true
        )
          continue;
        if (!this.sendable) {
          if (entry.kind === `read`) {
            this.readOffCache(entry);
          } else {
            this.settleReject(entry, `NOT_SENDABLE`);
          }
          continue;
        }
        let nextSeq: Dynamic = this.nextSeq;
        if (!this.s.port.send(this.stream, nextSeq, entry.payload)) {
          this.settleReject(entry, `LOCAL`);
          continue;
        }
        this.nextSeq = nextSeq + 1;
        entry.seq = nextSeq;
        entry.posted = true;
        entry.postedAt = this.parkNow();
        if (
          this.silentSince === null &&
          entry.payload.verb !== `client_event` &&
          Number.isFinite(entry.postedAt)
        ) {
          this.silentSince = entry.postedAt;
          this.silentSeq = nextSeq;
          this.sawHidden(entry.postedAt);
        }
        editorExtensionsReadTimeoutsResult--;
        if (editorExtensionsReadTimeouts && this.strikes === 0) {
          entry.ownPosts++;
        }
      }
    }
    strike(
      editorExtensionsReadTimeouts?: Dynamic,
      editorExtensionsReadTimeoutsResult?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (!editorExtensionsReadTimeoutsResult) return;
      let silentSince: Dynamic = this.outbox[0];
      if (silentSince === undefined || !silentSince.posted || silentSince.acked) {
        this.clearStrikes();
        return;
      }
      if (silentSince.opId !== this.strikeHead) {
        this.strikeHead = silentSince.opId;
        this.strikes = 0;
      }
      this.strikes++;
      this.log(
        `strike:${editorExtensionsReadTimeouts} head=${silentSince.opId} n=${this.strikes}/3`,
      );
      if (!(this.strikes < 3)) {
        if (silentSince.kind === `read`) {
          if (this.strikes === 3) {
            this.log(`send:reset-storm:read-rides-on`);
          }
          return;
        }
        this.log(`send:reset-storm`);
        this.settleReject(silentSince, RESET_STORM);
      }
    }
    clearStrikes(..._extraArguments: unknown[]): undefined {
      this.strikes = 0;
      this.strikeHead = null;
    }
    unpostFrom(
      editorExtensionsReadTimeouts?: Dynamic,
      editorExtensionsReadTimeoutsResult: Dynamic = true,
      ..._extraArguments: unknown[]
    ): undefined {
      for (let editorExtensionsReadTimeoutsResult2 of this.outbox as Dynamic)
        if (
          editorExtensionsReadTimeoutsResult2.seq !== null &&
          !editorExtensionsReadTimeoutsResult2.acked &&
          editorExtensionsReadTimeoutsResult2.seq >= editorExtensionsReadTimeouts
        ) {
          editorExtensionsReadTimeoutsResult2.seq = null;
        }
      this.nextSeq = Math.min(this.nextSeq, editorExtensionsReadTimeouts);
      if (
        editorExtensionsReadTimeoutsResult &&
        this.silentSeq >= editorExtensionsReadTimeouts
      ) {
        this.heard(this.silentSeq);
      }
    }
    onAck(
      editorExtensionsReadTimeouts?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      this.instanceProved();
      for (let editorExtensionsReadTimeoutsResult of [...this.outbox] as Dynamic)
        if (
          !(
            editorExtensionsReadTimeoutsResult.seq === null ||
            editorExtensionsReadTimeoutsResult.seq >
              editorExtensionsReadTimeouts ||
            editorExtensionsReadTimeoutsResult.acked
          )
        ) {
          editorExtensionsReadTimeoutsResult.acked = true;
          editorExtensionsReadTimeoutsResult.lostInstances = 0;
          this.afterAck(editorExtensionsReadTimeoutsResult);
        }
      this.heard(editorExtensionsReadTimeouts);
      this.sendBackoffMs = 500;
      if (this.outbox[0]?.acked) {
        this.clearStrikes();
      }
      this.pump();
    }
    onTailVerdict(
      editorExtensionsReadTimeouts?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let editorExtensionsReadTimeoutsResult: Dynamic =
        resolveEditorExtensionsValue34(editorExtensionsReadTimeouts.opId) ??
        resolveEditorExtensionsValue34(editorExtensionsReadTimeouts.op_id);
      if (editorExtensionsReadTimeoutsResult === undefined) return;
      let silentSince: Dynamic = this.byOpId.get(
        editorExtensionsReadTimeoutsResult,
      );
      if (silentSince === undefined) return;
      let difference: Dynamic = resolveEditorExtensionsVerdict(
        editorExtensionsReadTimeouts,
      );
      if (difference === null) return;
      silentSince.tailVerdict = difference;
      if (!silentSince.fellBack) {
        this.awaitResultThenTail(silentSince);
        return;
      }
      let min: Dynamic = resolveEditorExtensionsValue34(
        editorExtensionsReadTimeouts.pos,
      );
      if (min !== undefined && min.length > 0) {
        this.advance(min);
      }
      this.settleResolve(silentSince, difference);
    }
    awaitResultThenTail(
      editorExtensionsReadTimeouts?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        !(
          !this.s.resultsSeen ||
          editorExtensionsReadTimeouts.fellBack ||
          editorExtensionsReadTimeouts.kind !== `write` ||
          !editorExtensionsReadTimeouts.acked ||
          editorExtensionsReadTimeouts.tailVerdict === undefined
        )
      ) {
        editorExtensionsReadTimeouts.cancelGrace?.();
        editorExtensionsReadTimeouts.cancelGrace = this.s.deps.schedule(
          (..._extraArguments: unknown[]): undefined => {
            editorExtensionsReadTimeouts.cancelGrace = undefined;
            if (
              !this.outbox.includes(editorExtensionsReadTimeouts) ||
              !editorExtensionsReadTimeouts.acked ||
              editorExtensionsReadTimeouts.tailVerdict === undefined
            )
              return;
            let label =
              editorExtensionsReadTimeouts.tailVerdict.body.verdict === `deny`
                ? `deny`
                : `allow`;
            this.settleResolve(
              editorExtensionsReadTimeouts,
              editorExtensionsReadTimeouts.tailVerdict,
            );
            this.log(`send:result-lost:${label}`);
          },
          editorExtensionsValue15002,
        );
      }
    }
    afterAck(
      editorExtensionsReadTimeouts?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (this.s.resultsSeen || editorExtensionsReadTimeouts.fellBack) {
        this.awaitResultThenTail(editorExtensionsReadTimeouts);
        return;
      }
      if (this.s.relaySilent) {
        this.fallBack(editorExtensionsReadTimeouts);
        return;
      }
      editorExtensionsReadTimeouts.cancelGrace?.();
      editorExtensionsReadTimeouts.cancelGrace = this.s.deps.schedule(
        (..._extraArguments: unknown[]) => {
          editorExtensionsReadTimeouts.cancelGrace = undefined;
          if (this.outbox.includes(editorExtensionsReadTimeouts)) {
            if (this.s.resultsSeen)
              return this.awaitResultThenTail(editorExtensionsReadTimeouts);
            if (!this.s.relaySilent) {
              this.s.relaySilent = true;
              this.log(`relay:silent`);
            }
            for (let editorExtensionsReadTimeoutsResult of [
              ...this.outbox,
            ] as Dynamic)
              if (
                editorExtensionsReadTimeoutsResult.acked &&
                !editorExtensionsReadTimeoutsResult.fellBack
              ) {
                this.fallBack(editorExtensionsReadTimeoutsResult);
              }
          }
        },
        editorExtensionsValue15002,
      );
    }
    fallBack(
      editorExtensionsReadTimeouts?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      editorExtensionsReadTimeouts.fellBack = true;
      editorExtensionsReadTimeouts.cancelGrace?.();
      editorExtensionsReadTimeouts.cancelGrace = undefined;
      if (editorExtensionsReadTimeouts.tailVerdict !== undefined) {
        this.settleResolve(
          editorExtensionsReadTimeouts,
          editorExtensionsReadTimeouts.tailVerdict,
        );
        return;
      }
      switch (editorExtensionsReadTimeouts.kind) {
        case `read`:
          this.answerReadFromCache(editorExtensionsReadTimeouts);
          return;
        case `query`:
          this.settleReject(
            editorExtensionsReadTimeouts,
            EditorExtensionsNORESULTRELAY,
          );
          return;
        case `presence`:
          this.settleResolve(editorExtensionsReadTimeouts, {
            status: 202,
            body: {},
          });
          return;
        case `write`:
          editorExtensionsReadTimeouts.cancelGrace = this.s.deps.schedule(
            (..._extraArguments: unknown[]): undefined => {
              editorExtensionsReadTimeouts.cancelGrace = undefined;
              if (this.outbox.includes(editorExtensionsReadTimeouts)) {
                this.settleReject(
                  editorExtensionsReadTimeouts,
                  EditorExtensionsNORESULTRELAY,
                );
              }
            },
            editorExtensionsValue80002,
          );
          return;
      }
    }
    async answerReadFromCache(
      editorExtensionsReadTimeouts?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<undefined> {
      try {
        await this.seededP;
      } catch {
        return;
      }
      if (!this.outbox.includes(editorExtensionsReadTimeouts)) return;
      let editorExtensionsReadTimeoutsResult: Dynamic =
        resolveEditorExtensionsValue33(editorExtensionsReadTimeouts.payload.ref);
      if (editorExtensionsReadTimeoutsResult === undefined) {
        this.settleResolve(editorExtensionsReadTimeouts, {
          status: 200,
          body: {
            verdict: `deny`,
            reason: `intent-shape`,
          },
        });
        return;
      }
      let silentSince = resolveEditorExtensionsValue32(
        editorExtensionsReadTimeoutsResult,
      );
      let difference: Dynamic = this.cache.get(silentSince);
      if (
        resolveEditorExtensionsView2(
          editorExtensionsReadTimeouts.payload,
          difference,
        )
      ) {
        if (this.leanBodies) {
          this.refillWholeBodies(silentSince, difference);
        } else {
          this.recold(silentSince, difference);
        }
      }
      if (
        this.refill !== null &&
        (await this.refill.p, !this.outbox.includes(editorExtensionsReadTimeouts))
      )
        return;
      let min: Dynamic =
        editorExtensionsReadTimeoutsResult.object === `node`
          ? isEditorExtensionsSeq(this, editorExtensionsReadTimeoutsResult.id)
          : [];
      this.settleResolve(
        editorExtensionsReadTimeouts,
        resolveEditorExtensionsStatus(
          editorExtensionsReadTimeouts.payload,
          this.read(editorExtensionsReadTimeoutsResult),
          min,
        ),
      );
    }
    refillWholeBodies(
      editorExtensionsReadTimeouts?: Dynamic,
      editorExtensionsReadTimeoutsResult?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (!(!this.leanBodies || this.state === `dead`)) {
        this.leanBodies = false;
        this.recoldAt.set(
          editorExtensionsReadTimeouts,
          resolveEditorExtensionsValue35(editorExtensionsReadTimeoutsResult),
        );
        this.oweBodies(`reopen:full-bodies:silent-relay`);
      }
    }
    recold(
      editorExtensionsReadTimeouts?: Dynamic,
      editorExtensionsReadTimeoutsResult?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      if (
        this.leanBodies ||
        this.state === `dead` ||
        this.refill !== null ||
        !resolveEditorExtensionsValue31(editorExtensionsReadTimeoutsResult) ||
        editorExtensionsReadTimeoutsResult.bodyless !== true
      )
        return false;
      let silentSince: Dynamic = resolveEditorExtensionsValue35(
        editorExtensionsReadTimeoutsResult,
      );
      return this.recoldAt.has(editorExtensionsReadTimeouts) &&
        this.recoldAt.get(editorExtensionsReadTimeouts) === silentSince
        ? (this.log(`recold:same-rev`), false)
        : this.recoldCooling
          ? (this.log(`recold:cooling`),
            (this.recoldTrailing = editorExtensionsReadTimeouts),
            false)
          : (this.recoldAt.set(editorExtensionsReadTimeouts, silentSince),
            (this.recoldTrailing = null),
            (this.recoldCooling = true),
            (this.cancelRecoldCooling = this.s.deps.schedule(
              (..._extraArguments: unknown[]): undefined => {
                this.cancelRecoldCooling = undefined;
                this.recoldCooling = false;
                let recoldTrailing: Dynamic = this.recoldTrailing;
                this.recoldTrailing = null;
                if (
                  !(recoldTrailing === null || this.state === `dead`) &&
                  this.recold(recoldTrailing, this.cache.get(recoldTrailing))
                ) {
                  this.log(`recold:trailing`);
                }
              },
              editorExtensionsValue10000,
            )),
            this.oweBodies(`reopen:recold:silent-relay`),
            true);
    }
    oweBodies(
      editorExtensionsReadTimeouts?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let editorExtensionsReadTimeoutsResult: Dynamic;
      let silentSince: Dynamic = new (Promise as Dynamic)(
        (resolve?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          editorExtensionsReadTimeoutsResult = resolve;
        },
      );
      this.refill = {
        p: silentSince,
        done: editorExtensionsReadTimeoutsResult,
        opened: false,
      };
      this.log(editorExtensionsReadTimeouts);
      if (this.s.helloAnswered) {
        this.postOpen();
      }
    }
    onRefused(
      editorExtensionsReadTimeouts?: Dynamic,
      editorExtensionsReadTimeoutsResult?: Dynamic,
      silentSince: Dynamic = null,
      difference: Dynamic = null,
      ..._extraArguments: unknown[]
    ): undefined {
      this.log(`refused:${editorExtensionsReadTimeoutsResult}`);
      if (!editorExtensionsSet15.has(editorExtensionsReadTimeoutsResult)) {
        this.instanceProved();
      }
      if (editorExtensionsReadTimeoutsResult === `RESEND_FROM`) {
        let silentSince2: Dynamic = silentSince ?? editorExtensionsReadTimeouts;
        if (silentSince2 === null || silentSince2 < 1) return;
        this.unpostFrom(silentSince2);
        this.pump();
        return;
      }
      if (editorExtensionsSet14.has(editorExtensionsReadTimeoutsResult)) {
        this.refusedWrite = true;
        this.readsOffCache();
        for (let editorExtensionsReadTimeoutsResult2 of [
          ...this.outbox,
        ] as Dynamic)
          if (
            (!editorExtensionsReadTimeoutsResult2.acked ||
              editorExtensionsReadTimeoutsResult2.seq ===
                editorExtensionsReadTimeouts) &&
            editorExtensionsReadTimeoutsResult2.cacheOnly !== true
          ) {
            this.settleReject(
              editorExtensionsReadTimeoutsResult2,
              editorExtensionsReadTimeoutsResult,
            );
          }
        if (editorExtensionsReadTimeouts !== null) {
          this.nextSeq = Math.min(this.nextSeq, editorExtensionsReadTimeouts);
        }
        this.heard(this.silentSeq);
        this.emitWritableIfChanged();
        return;
      }
      if (editorExtensionsSet15.has(editorExtensionsReadTimeoutsResult)) {
        this.streamOpen = false;
        if (editorExtensionsReadTimeouts !== null) {
          this.unpostFrom(editorExtensionsReadTimeouts, false);
        }
        this.nextCycle();
        this.park(
          resolvePlatformSessionAndSourcesFind(
            editorExtensionsReadTimeoutsResult,
          ) ?? `not_open`,
        );
        return;
      }
      if (
        editorExtensionsReadTimeoutsResult === `RATE_LIMITED` ||
        editorExtensionsReadTimeoutsResult === `WINDOW_FULL` ||
        (editorExtensionsReadTimeoutsResult === `UNKNOWN` &&
          this.unknownRidesAgain(editorExtensionsReadTimeouts))
      ) {
        if (editorExtensionsReadTimeouts !== null) {
          this.unpostFrom(editorExtensionsReadTimeouts);
        }
        this.sendPaused = true;
        this.cancelResume?.();
        let max = Math.max(
          difference ?? 0,
          editorExtensionsReadTimeoutsResult === `UNKNOWN` ? 500 : 0,
          this.s.deps.random() * this.sendBackoffMs,
        );
        this.sendBackoffMs = Math.min(
          this.sendBackoffMs * 2,
          editorExtensionsValue30000,
        );
        this.cancelResume = this.s.deps.schedule(
          (..._extraArguments: unknown[]): undefined => {
            this.cancelResume = undefined;
            this.sendPaused = false;
            this.pump();
          },
          max,
        );
        return;
      }
      if (editorExtensionsReadTimeouts === null) return;
      let min: Dynamic = this.outbox.find(
        (outbox?: Dynamic, ..._extraArguments: unknown[]) =>
          outbox.seq === editorExtensionsReadTimeouts,
      );
      if (min !== undefined) {
        this.settleReject(min, editorExtensionsReadTimeoutsResult);
      }
      this.unpostFrom(editorExtensionsReadTimeouts);
      this.pump();
    }
    unknownRidesAgain(
      editorExtensionsReadTimeouts?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      let editorExtensionsReadTimeoutsResult: Dynamic =
        editorExtensionsReadTimeouts === null
          ? undefined
          : this.outbox.find(
              (outbox?: Dynamic, ..._extraArguments: unknown[]) =>
                outbox.seq === editorExtensionsReadTimeouts && !outbox.acked,
            );
      return editorExtensionsReadTimeoutsResult === undefined
        ? false
        : (editorExtensionsReadTimeoutsResult.unknownRefusals++,
          this.log(
            `refused:unknown n=${editorExtensionsReadTimeoutsResult.unknownRefusals}/3`,
          ),
          editorExtensionsReadTimeoutsResult.unknownRefusals <= 3);
    }
    unsettledAuthors(..._extraArguments: unknown[]): Dynamic {
      return this.outbox.map(
        (outbox?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
          opId: outbox.opId,
          author: outbox.author,
        }),
      );
    }
    detach(
      editorExtensionsReadTimeouts?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      editorExtensionsReadTimeouts.cancelDeadline?.();
      editorExtensionsReadTimeouts.cancelDeadline = undefined;
      editorExtensionsReadTimeouts.cancelGrace?.();
      editorExtensionsReadTimeouts.cancelGrace = undefined;
      let editorExtensionsReadTimeoutsResult: Dynamic = this.outbox.indexOf(
        editorExtensionsReadTimeouts,
      );
      if (editorExtensionsReadTimeoutsResult >= 0) {
        this.outbox.splice(editorExtensionsReadTimeoutsResult, 1);
      }
      if (
        this.byOpId.get(editorExtensionsReadTimeouts.opId) ===
        editorExtensionsReadTimeouts
      ) {
        this.byOpId.delete(editorExtensionsReadTimeouts.opId);
      }
      if (editorExtensionsReadTimeouts.opId === this.strikeHead) {
        this.clearStrikes();
      }
    }
    settleResolve(
      editorExtensionsReadTimeouts?: Dynamic,
      editorExtensionsReadTimeoutsResult?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      this.detach(editorExtensionsReadTimeouts);
      editorExtensionsReadTimeouts.resolve(editorExtensionsReadTimeoutsResult);
    }
    settleReject(
      editorExtensionsReadTimeouts?: Dynamic,
      editorExtensionsReadTimeoutsResult?: Dynamic,
      silentSince: Dynamic = false,
      ..._extraArguments: unknown[]
    ): undefined {
      this.silSettled(
        editorExtensionsReadTimeouts,
        editorExtensionsReadTimeoutsResult,
        silentSince,
      );
      let difference: Dynamic =
        editorExtensionsReadTimeoutsResult === `DEAD` ||
        editorExtensionsReadTimeoutsResult.startsWith(`DEAD:`)
          ? `DEAD`
          : editorExtensionsReadTimeoutsResult;
      if (
        !silentSince &&
        editorExtensionsReadTimeouts.posted &&
        !editorExtensionsReadTimeouts.acked &&
        editorExtensionsReadTimeouts.kind === `write` &&
        editorExtensionsSet16.has(difference)
      ) {
        let label =
          editorExtensionsReadTimeouts.ownOpId === undefined
            ? `outbox:retired-unacked:${difference}`
            : `outbox:retired-unacked:${difference} kind=${resolvePlatformSessionAndSourcesPinned(resolvePlatformSessionAndSourcesCreate2(editorExtensionsReadTimeouts.payload), editorExtensionsReadTimeouts.ownOpId)}`;
        if (this.retiredSaid === null) {
          this.log(label);
        } else {
          this.retiredSaid.push(label);
        }
      }
      this.detach(editorExtensionsReadTimeouts);
      editorExtensionsReadTimeouts.reject(
        new (EditorExtensionsFrameSendError as Dynamic)(
          editorExtensionsReadTimeoutsResult,
        ),
      );
    }
    subscribe(
      editorExtensionsReadTimeouts?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let editorExtensionsReadTimeoutsResult: Dynamic = {
        fn: editorExtensionsReadTimeouts,
      };
      this.subs.add(editorExtensionsReadTimeoutsResult);
      let silentSince: Dynamic = this.deadReason;
      if (silentSince !== null)
        queueMicrotask((..._extraArguments: unknown[]): undefined => {
          if (this.subs.has(editorExtensionsReadTimeoutsResult)) {
            editorExtensionsReadTimeouts({
              kind: `down`,
              reason: silentSince,
              terminal: true,
            });
          }
        });
      else {
        let seeded: Dynamic = this.seeded;
        let writable: Dynamic = this.writable;
        let commentable: Dynamic = this.commentable;
        if (seeded || !writable || !commentable) {
          queueMicrotask((..._extraArguments: unknown[]): undefined => {
            if (this.subs.has(editorExtensionsReadTimeoutsResult)) {
              if (!writable && !this.writable) {
                editorExtensionsReadTimeouts({
                  kind: `writable`,
                  writable: false,
                });
              }
              if (!commentable && !this.commentable) {
                editorExtensionsReadTimeouts({
                  kind: `commentable`,
                  commentable: false,
                });
              }
              if (seeded) {
                editorExtensionsReadTimeouts({
                  kind: `live`,
                });
              }
            }
          });
        }
      }
      return (..._extraArguments: unknown[]): undefined => {
        this.subs.delete(editorExtensionsReadTimeoutsResult);
      };
    }
    read(
      editorExtensionsReadTimeouts?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let editorExtensionsReadTimeoutsResult: Dynamic = this.cache.get(
        resolveEditorExtensionsValue32(editorExtensionsReadTimeouts),
      );
      return editorExtensionsReadTimeoutsResult === undefined
        ? undefined
        : structuredClone(editorExtensionsReadTimeoutsResult);
    }
    refs(..._extraArguments: unknown[]): Dynamic {
      return this.index;
    }
    whenSeeded(..._extraArguments: unknown[]): Dynamic {
      return this.seededP;
    }
    call(
      editorExtensionsReadTimeouts?: Dynamic,
      editorExtensionsReadTimeoutsResult?: Dynamic,
      silentSince?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      this.silBeat();
      let difference: Dynamic = editorExtensionsReadTimeouts.opId;
      if (editorExtensionsReadTimeoutsResult?.aborted === true)
        return Promise.reject(
          new (EditorExtensionsFrameSendError as Dynamic)(
            EditorExtensionsWITHDRAWN,
          ),
        );
      if (this.state === `dead`)
        return Promise.reject(
          new (EditorExtensionsFrameSendError as Dynamic)(
            `DEAD:${this.deadReason ?? `UNKNOWN`}`,
          ),
        );
      let min: Dynamic =
        typeof difference == `string` ? this.byOpId.get(difference) : undefined;
      let matchesHiddenSeenAt: Dynamic =
        min !== undefined &&
        min.posted &&
        min.kind !== `read` &&
        min.cacheOnly !== true &&
        resolveEditorExtensionsRefusalClass();
      if (matchesHiddenSeenAt) {
        this.log(`call:superseded`);
        this.settleReject(min, `TIMEOUT`, true);
      } else if (typeof difference != `string` || this.byOpId.has(difference))
        return Promise.reject(
          new (EditorExtensionsFrameSendError as Dynamic)(`DUP_OP_ID`),
        );
      return !this.sendable &&
        resolveEditorExtensionsRead(editorExtensionsReadTimeouts) !== `read`
        ? Promise.reject(
            new (EditorExtensionsFrameSendError as Dynamic)(`NOT_SENDABLE`),
          )
        : editorExtensionsReadTimeouts.verb === `update` &&
            this.deniedWrite &&
            !resolveEditorExtensionsUtterance(editorExtensionsReadTimeouts.ref)
          ? Promise.reject(
              new (EditorExtensionsFrameSendError as Dynamic)(
                `PERMISSION_DENIED`,
              ),
            )
          : new (Promise as Dynamic)(
              (
                resolve?: Dynamic,
                reject?: Dynamic,
                ..._extraArguments: unknown[]
              ): undefined => {
                let record2: Dynamic = {
                  opId: difference,
                  payload: editorExtensionsReadTimeouts,
                  kind: resolveEditorExtensionsRead(editorExtensionsReadTimeouts),
                  author: this.viewer,
                  ...(silentSince === undefined
                    ? {}
                    : {
                        ownOpId: silentSince,
                      }),
                  seq: null,
                  posted: false,
                  acked: false,
                  protocolResent: false,
                  lostInstances: 0,
                  unknownRefusals: 0,
                  ownPosts: 0,
                  fellBack: false,
                  resolve: resolve,
                  reject: reject,
                };
                this.outbox.push(record2);
                this.byOpId.set(difference, record2);
                this.armDeadline(record2);
                editorExtensionsReadTimeoutsResult?.addEventListener(
                  `abort`,
                  (..._extraArguments: unknown[]): undefined => {
                    if (this.outbox.includes(record2)) {
                      this.log(`call:withdrawn`);
                      this.settleReject(record2, EditorExtensionsWITHDRAWN);
                      this.pump(false);
                    }
                  },
                  {
                    once: true,
                  },
                );
                if (!this.sendable && record2.kind === `read`) {
                  this.readOffCache(record2);
                } else {
                  if (this.viewFirstRead(record2)) {
                    this.readOffSnapshotView(record2);
                  } else {
                    this.pump(!matchesHiddenSeenAt);
                  }
                }
              },
            );
    }
    viewFirstRead(
      editorExtensionsReadTimeouts?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      if (
        !this.viewBodies ||
        editorExtensionsReadTimeouts.kind !== `read` ||
        editorExtensionsReadTimeouts.payload.verb !== `read`
      )
        return false;
      let editorExtensionsReadTimeoutsResult: Dynamic =
        resolveEditorExtensionsValue33(editorExtensionsReadTimeouts.payload.ref);
      if (
        editorExtensionsReadTimeoutsResult === undefined ||
        editorExtensionsReadTimeoutsResult.object !== `node`
      )
        return false;
      let silentSince: Dynamic = editorExtensionsReadTimeouts.payload.payload;
      return resolveEditorExtensionsValue31(silentSince)
        ? Object.keys(silentSince).length === 2 &&
            silentSince.kind === `view` &&
            silentSince.comments === true
        : false;
    }
    readOffSnapshotView(
      editorExtensionsReadTimeouts?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      let editorExtensionsReadTimeoutsResult: Dynamic =
        resolveEditorExtensionsValue33(editorExtensionsReadTimeouts.payload.ref);
      let silentSince: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
        this.cache.get(
          resolveEditorExtensionsValue32(editorExtensionsReadTimeoutsResult),
        );
      let difference: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
        let silentSince2: Dynamic = silentSince();
        return (
          resolveEditorExtensionsValue31(silentSince2) &&
          resolveEditorExtensionsValue31(silentSince2.view)
        );
      };
      let min = (
        editorExtensionsReadTimeouts2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        editorExtensionsReadTimeouts.snapHeld = false;
        if (
          !(
            !this.outbox.includes(editorExtensionsReadTimeouts) ||
            editorExtensionsReadTimeouts.seq !== null ||
            editorExtensionsReadTimeouts.cacheOnly === true
          )
        ) {
          this.log(`call:first-paint:${editorExtensionsReadTimeouts2}`);
          this.pump(true);
        }
      };
      let matchesHiddenSeenAt = (..._extraArguments: unknown[]): undefined => {
        editorExtensionsReadTimeouts.snapHeld = false;
        if (!this.outbox.includes(editorExtensionsReadTimeouts)) return;
        editorExtensionsReadTimeouts.cacheOnly = true;
        let isEditorExtensionsSeq2: Dynamic = isEditorExtensionsSeq(
          this,
          editorExtensionsReadTimeoutsResult.id,
        );
        this.log(`call:first-paint:snapshot`);
        this.settleResolve(
          editorExtensionsReadTimeouts,
          resolveEditorExtensionsStatus(
            editorExtensionsReadTimeouts.payload,
            silentSince(),
            isEditorExtensionsSeq2,
          ),
        );
      };
      if (this.seeded)
        return difference() ? matchesHiddenSeenAt() : min(`no-view`);
      editorExtensionsReadTimeouts.snapHeld = true;
      let platformSessionAndSourcesCreate = false;
      let takeParked: Dynamic = this.s.deps.schedule(
        (..._extraArguments: unknown[]): undefined => {
          if (!platformSessionAndSourcesCreate) {
            platformSessionAndSourcesCreate = true;
            min(`waited`);
          }
        },
        editorExtensionsValue1500,
      );
      this.seededP.then(
        (..._extraArguments: unknown[]): undefined => {
          if (!platformSessionAndSourcesCreate) {
            platformSessionAndSourcesCreate = true;
            takeParked();
            if (difference()) {
              matchesHiddenSeenAt();
            } else {
              min(`no-view`);
            }
          }
        },
        (..._extraArguments: unknown[]): undefined => {
          if (!platformSessionAndSourcesCreate) {
            platformSessionAndSourcesCreate = true;
            takeParked();
            min(`unseeded`);
          }
        },
      );
    }
    readOffCache(
      editorExtensionsReadTimeouts?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        editorExtensionsReadTimeouts.cacheOnly === true ||
        editorExtensionsReadTimeouts.kind !== `read` ||
        !this.outbox.includes(editorExtensionsReadTimeouts)
      )
        return;
      editorExtensionsReadTimeouts.cacheOnly = true;
      editorExtensionsReadTimeouts.fellBack = true;
      let editorExtensionsReadTimeoutsResult: Dynamic =
        editorExtensionsReadTimeouts.seq;
      editorExtensionsReadTimeouts.seq = null;
      if (
        editorExtensionsReadTimeoutsResult !== null &&
        editorExtensionsReadTimeoutsResult === this.silentSeq
      ) {
        this.heard(editorExtensionsReadTimeoutsResult);
      }
      this.log(`call:cache-only-read`);
      this.answerReadFromCache(editorExtensionsReadTimeouts);
    }
    readsOffCache(..._extraArguments: unknown[]): undefined {
      for (let entry of [...this.outbox] as Dynamic)
        if (entry.kind === `read` && !entry.acked) {
          this.readOffCache(entry);
        }
    }
    armDeadline(
      editorExtensionsReadTimeouts?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let editorExtensionsReadTimeoutsResult: Dynamic = (
        ..._extraArguments: unknown[]
      ): Dynamic => this.progress + editorExtensionsReadTimeouts.ownPosts;
      let silentSince: Dynamic = editorExtensionsReadTimeoutsResult();
      let difference: Dynamic = this.answered;
      let min = 0;
      let matchesHiddenSeenAt = (..._extraArguments: unknown[]): undefined => {
        editorExtensionsReadTimeouts.armedAt = this.silNow();
        editorExtensionsReadTimeouts.cancelDeadline = this.s.deps.schedule(
          (..._extraArguments: unknown[]): undefined => {
            editorExtensionsReadTimeouts.cancelDeadline = undefined;
            this.silDeadline(editorExtensionsReadTimeouts);
            if (!this.outbox.includes(editorExtensionsReadTimeouts)) return;
            let editorExtensionsReadTimeoutsResult2: Dynamic =
              editorExtensionsReadTimeoutsResult();
            if (editorExtensionsReadTimeoutsResult2 !== silentSince) {
              if (
                this.answered !== difference ||
                !this.guarded ||
                !resolveEditorExtensionsRead2(editorExtensionsReadTimeouts)
              )
                min = 0;
              else if (++min >= 6) {
                this.log(`call:timeout:lifetime`);
                this.settleReject(editorExtensionsReadTimeouts, `TIMEOUT`);
                this.pump(false);
                return;
              }
              silentSince = editorExtensionsReadTimeoutsResult2;
              difference = this.answered;
              matchesHiddenSeenAt();
              return;
            }
            this.log(`call:timeout`);
            this.settleReject(editorExtensionsReadTimeouts, `TIMEOUT`);
            this.pump(false);
          },
          editorExtensionsValue20000,
        );
      };
      matchesHiddenSeenAt();
    }
  });
  (editorExtensionsPattern13 = /^[A-Za-z0-9_.:-]{1,64}$/);
  (editorExtensionsSet24 = new (Set as Dynamic)([
    `REVOKED`,
    `DENIED`,
  ]));
  (resolveEditorExtensionsDeadReason = (
    editorExtensionsDeadReason?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    editorExtensionsDeadReason.deadReason !== null &&
    editorExtensionsSet24.has(editorExtensionsDeadReason.deadReason));
  (resolveEditorExtensionsStatus2 = (
    ..._extraArguments: unknown[]
  ) => ({
    status: 200,
    body: {
      verdict: `deny`,
      reason: `forbidden`,
      detail: `this page's access was withdrawn (the relay's lane was revoked)`,
      data: {
        code: `forbidden`,
        why: `lane`,
      },
    },
  }));
  (FOREIGN_CONTAINER = `FOREIGN_CONTAINER`);
  (editorExtensionsWeakMap2 = new (WeakMap as Dynamic)());
  (EditorExtensionsGotoAnchorRefused = `gotoAnchor:refused`);
}

export {
  EditorExtensionsReadTimeouts,
  FOREIGN_CONTAINER,
  installEditorExtensionsHost,
  loadEditorExtensionsCall,
};
