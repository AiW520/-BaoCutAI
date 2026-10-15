/** BaoCut: platform session and sources from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  inFrame,
  preloadModule,
} from "../dependencies";
import {
  lazyZod,
} from "../data/lazy-zod";
import {
  PAGE_BUSY_TRY_AGAIN,
  PlatformSessionAndSourcesAddress,
  PlatformSessionAndSourcesONESHOTBUSYCAPMS,
} from "./session-and-sources-1";
import {
  ObservabilityBrowserAndOperationEventsFOREIGNCONTAINER,
} from "../observability/browser-and-operation-events-3";
import {
  PlatformApiAndAuthPAGEGONEDETAIL,
} from "./api-and-auth-2";

var platformSessionAndSourcesVerdictSchema: Dynamic;

var PlatformSessionAndSourcesVerdict: Dynamic;

var zBatchAck: Dynamic;

function resolvePlatformSessionAndSourcesResults(
  platformSessionAndSourcesResults?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let resolvePlatformSessionAndSourcesResultsHandler: Dynamic = (
    platformSessionAndSourcesResults2?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof platformSessionAndSourcesResults2 == `object` &&
    platformSessionAndSourcesResults2 &&
    !Array.isArray(platformSessionAndSourcesResults2)
      ? platformSessionAndSourcesResults2
      : {};
  let platformSessionAndSourcesResultsHandler: Dynamic =
    resolvePlatformSessionAndSourcesResultsHandler(
      platformSessionAndSourcesResults,
    );
  let acks: Dynamic = Array.isArray(
    platformSessionAndSourcesResultsHandler.acks,
  )
    ? platformSessionAndSourcesResultsHandler.acks
    : Array.isArray(platformSessionAndSourcesResultsHandler.results)
      ? platformSessionAndSourcesResultsHandler.results
      : undefined;
  if (acks === undefined) return platformSessionAndSourcesResults;
  let {
    results: platformSessionAndSourcesResultsHandler2,
    acks: platformSessionAndSourcesResultsHandler3,
    ...platformSessionAndSourcesResultsHandler4
  }: Dynamic = platformSessionAndSourcesResultsHandler;
  let acks2: Dynamic = [];
  for (let resolvePlatformSessionAndSourcesResultsResult of acks as Dynamic) {
    let platformSessionAndSourcesResultsHandler5: Dynamic =
      resolvePlatformSessionAndSourcesResultsHandler(
        resolvePlatformSessionAndSourcesResultsResult,
      );
    let minted: Dynamic =
      typeof platformSessionAndSourcesResultsHandler5.minted == `string`
        ? platformSessionAndSourcesResultsHandler5.minted
        : typeof platformSessionAndSourcesResultsHandler5.id == `string`
          ? platformSessionAndSourcesResultsHandler5.id
          : undefined;
    acks2.push(
      platformSessionAndSourcesResultsHandler5.verdict === `allow`
        ? {
            ...platformSessionAndSourcesResultsHandler5,
            diff: Array.isArray(platformSessionAndSourcesResultsHandler5.diff)
              ? platformSessionAndSourcesResultsHandler5.diff
              : [],
            ...(minted === undefined
              ? {}
              : {
                  minted: minted,
                }),
          }
        : resolvePlatformSessionAndSourcesResultsResult,
    );
  }
  return {
    ...platformSessionAndSourcesResultsHandler4,
    acks: acks2,
  };
}

var PlatformSessionAndSourcesActor: Dynamic;

var PlatformSessionAndSourcesRef: Dynamic;

var PlatformSessionAndSourcesRef2: Dynamic;

var PlatformSessionAndSourcesActor2: Dynamic;

var resolvePlatformSessionAndSourcesVerb: Dynamic;

var resolvePlatformSessionAndSourcesVerb2: Dynamic;

var resolvePlatformSessionAndSourcesVerb3: Dynamic;

var resolvePlatformSessionAndSourcesVerb4: Dynamic;

var resolvePlatformSessionAndSourcesVerb5: Dynamic;

var resolvePlatformSessionAndSourcesFrozen: Dynamic;

var resolvePlatformSessionAndSourcesFrozen2: Dynamic;

var resolvePlatformSessionAndSourcesAbandoned: Dynamic;

var resolvePlatformSessionAndSourcesName: Dynamic;

var resolvePlatformSessionAndSourcesValue17: (platformSessionAndSourcesValue17?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolvePlatformSessionAndSourcesValue18: (platformSessionAndSourcesValue18?: Dynamic, ..._extraArguments: unknown[]) => string;

var PlatformSessionAndSourcesPrincipal: Dynamic;

var PlatformSessionAndSourcesPrincipal2: Dynamic;

var resolvePlatformSessionAndSourcesValue19: (platformSessionAndSourcesValue19?: Dynamic, ..._extraArguments: unknown[]) => string;

async function loadPlatformSessionAndSourcesAckOf(
  items?: Dynamic,
  options?: Dynamic,
  fetcher: Dynamic = fetch,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  if (items.length === 0) throw Error(`postIntent: empty project id`);
  let { ackOf: preloadTImport2, liveDoor: preloadTImport3 }: Dynamic =
    await preloadModule(
      async (..._extraArguments: unknown[]): Promise<Dynamic> => {
        let { ackOf: ackOf2, liveDoor: liveDoor2 }: Dynamic =
          await Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic =>
              PlatformApiAndAuthPAGEGONEDETAIL,
          );
        return {
          ackOf: ackOf2,
          liveDoor: liveDoor2,
        };
      },
      undefined,
      import.meta.url,
    );
  let { withBusyRetry: preloadTImport4 }: Dynamic = await preloadModule(
    async (..._extraArguments: unknown[]): Promise<Dynamic> => {
      let { withBusyRetry: withBusyRetry2 }: Dynamic =
        await Promise.resolve().then(
          (..._extraArguments: unknown[]): Dynamic =>
            PlatformSessionAndSourcesONESHOTBUSYCAPMS,
        );
      return {
        withBusyRetry: withBusyRetry2,
      };
    },
    undefined,
    import.meta.url,
  );
  let { verb: options2, ...options3 }: Dynamic = options;
  return preloadTImport2(
    await preloadTImport4(
      preloadTImport3(items, {
        fetcher: fetcher,
      }),
    ).call(options2, {
      ...options3,
    }),
  );
}

async function loadPlatformSessionAndSourcesAckOf2(
  items?: Dynamic,
  options?: Dynamic,
  fetcher: Dynamic = fetch,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  if (items.length === 0) throw Error(`postConfig: empty project id`);
  let { ackOf: preloadTImport2, liveDoor: preloadTImport3 }: Dynamic =
    await preloadModule(
      async (..._extraArguments: unknown[]): Promise<Dynamic> => {
        let { ackOf: ackOf2, liveDoor: liveDoor2 }: Dynamic =
          await Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic =>
              PlatformApiAndAuthPAGEGONEDETAIL,
          );
        return {
          ackOf: ackOf2,
          liveDoor: liveDoor2,
        };
      },
      undefined,
      import.meta.url,
    );
  return preloadTImport2(
    await preloadTImport3(items, {
      fetcher: fetcher,
    }).call(`config`, options),
  );
}

var PlatformSessionAndSourcesHead: Dynamic;

async function loadPlatformSessionAndSourcesFrameVersionTable(
  platformSessionAndSourcesFrameVersionTable?: Dynamic,
  options: Dynamic = fetch,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  if (inFrame())
    return (
      await preloadModule(
        async (..._extraArguments: unknown[]): Promise<Dynamic> => {
          let { frameVersionTable: frameVersionTable2 }: Dynamic =
            await Promise.resolve().then(
              (..._extraArguments: unknown[]): Dynamic =>
                ObservabilityBrowserAndOperationEventsFOREIGNCONTAINER,
            );
          return {
            frameVersionTable: frameVersionTable2,
          };
        },
        undefined,
        import.meta.url,
      )
    ).frameVersionTable(platformSessionAndSourcesFrameVersionTable);
  let options2: Dynamic = await options(
    resolvePlatformSessionAndSourcesValue19(
      platformSessionAndSourcesFrameVersionTable,
    ),
  );
  let text: Dynamic = await options2.text();
  if (!options2.ok)
    throw Error(`versions ${options2.status}: ${text.slice(0, 200)}`);
  let loadPlatformSessionAndSourcesFrameVersionTableResult: Dynamic;
  try {
    loadPlatformSessionAndSourcesFrameVersionTableResult = JSON.parse(text);
  } catch {
    throw Error(`versions: non-JSON 200 body: ${text.slice(0, 200)}`);
  }
  let safeParse: Dynamic = PlatformSessionAndSourcesHead.safeParse(
    loadPlatformSessionAndSourcesFrameVersionTableResult,
  );
  if (!safeParse.success)
    throw Error(`versions: malformed table: ${text.slice(0, 200)}`);
  return safeParse.data;
}

var PlatformSessionAndSourcesEngineUnported: Dynamic;

var PlatformSessionAndSourcesMessage5: string;

var resolvePlatformSessionAndSourcesUnavailable: Dynamic;

var resolvePlatformSessionAndSourcesUnavailable2: Dynamic;

var resolvePlatformSessionAndSourcesData: Dynamic;

var platformSessionAndSourcesStateDownNotOpenGrantExpiredGrantMismatchValues: string[];

var PlatformSessionAndSourcesNOTOPEN: string[][];

function resolvePlatformSessionAndSourcesFind(
  platformSessionAndSourcesFind?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    PlatformSessionAndSourcesNOTOPEN.find(
      (
        [PlatformSessionAndSourcesNOTOPEN2]: Dynamic,
        ..._extraArguments: unknown[]
      ) => PlatformSessionAndSourcesNOTOPEN2 === platformSessionAndSourcesFind,
    )?.[1] ?? null
  );
}

function resolvePlatformSessionAndSourcesCreate(
  items?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return items.some(
    (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
      rolldownNImport2 !== `create`,
  )
    ? `w`
    : items.length > 0
      ? `c`
      : `n`;
}

function resolvePlatformSessionAndSourcesValue20(
  platformSessionAndSourcesValue20?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return `${platformSessionAndSourcesValue20 === true || platformSessionAndSourcesValue20 === `w` ? `w` : platformSessionAndSourcesValue20 === `c` ? `c` : `n`}${options === true ? `h` : `v`}`;
}

function resolvePlatformSessionAndSourcesValue21(
  platformSessionAndSourcesValue21?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return platformSessionAndSourcesValue21 >= 1
    ? platformSessionAndSourcesValue21 < 2
      ? `d1`
      : platformSessionAndSourcesValue21 <= 5
        ? `d2_5`
        : platformSessionAndSourcesValue21 <= 24
          ? `d6_24`
          : `d25p`
    : `d0`;
}

var platformSessionAndSourcesUpdateBatchSessionCommentValues: string[];

function resolvePlatformSessionAndSourcesCreate2(
  platformSessionAndSourcesCreate2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return typeof platformSessionAndSourcesCreate2.verb == `string`
    ? platformSessionAndSourcesCreate2.verb === `create`
      ? platformSessionAndSourcesCreate2.object === `session`
        ? `session`
        : platformSessionAndSourcesCreate2.object === `utterance`
          ? `comment`
          : `create`
      : platformSessionAndSourcesCreate2.verb === `update` ||
          platformSessionAndSourcesCreate2.verb === `delete` ||
          platformSessionAndSourcesCreate2.verb === `access`
        ? platformSessionAndSourcesCreate2.verb
        : `misc`
    : Array.isArray(platformSessionAndSourcesCreate2.batch)
      ? `batch`
      : `misc`;
}

var platformSessionAndSourcesPinnedMintedValues: string[];

var resolvePlatformSessionAndSourcesPinned: (platformSessionAndSourcesPinned?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => string;

function isPlatformSessionAndSourcesSplit(
  platformSessionAndSourcesSplit?: unknown,
  ..._extraArguments: unknown[]
) {
  if (typeof platformSessionAndSourcesSplit != `string`) return false;
  let [
    platformSessionAndSourcesSplitParts,
    setPlatformSessionAndSourcesSplitParts,
    ...platformSessionAndSourcesSplitParts2
  ]: Dynamic = platformSessionAndSourcesSplit.split(`.`);
  return (
    platformSessionAndSourcesSplitParts2.length === 0 &&
    platformSessionAndSourcesUpdateBatchSessionCommentValues.some(
      (
        platformSessionAndSourcesUpdateBatchSessionCommentValue?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        platformSessionAndSourcesUpdateBatchSessionCommentValue ===
        platformSessionAndSourcesSplitParts,
    ) &&
    platformSessionAndSourcesPinnedMintedValues.some(
      (
        platformSessionAndSourcesPinnedMintedValue?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        platformSessionAndSourcesPinnedMintedValue ===
        setPlatformSessionAndSourcesSplitParts,
    )
  );
}

var platformSessionAndSourcesR0R12R39R10pValues: string[];

function resolvePlatformSessionAndSourcesValue22(
  platformSessionAndSourcesValue22?: unknown,
  ..._extraArguments: unknown[]
) {
  return typeof platformSessionAndSourcesValue22 != `number` ||
    !(platformSessionAndSourcesValue22 >= 1)
    ? `r0`
    : platformSessionAndSourcesValue22 <= 2
      ? `r1_2`
      : platformSessionAndSourcesValue22 <= 9
        ? `r3_9`
        : `r10p`;
}

var platformSessionAndSourcesSleptAwakeNaValues: string[];

var resolvePlatformSessionAndSourcesIsFinite2: Dynamic;

function isPlatformSessionAndSourcesAwake(
  platformSessionAndSourcesAwake?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return !resolvePlatformSessionAndSourcesIsFinite2(
    platformSessionAndSourcesAwake,
  ) || !resolvePlatformSessionAndSourcesIsFinite2(options)
    ? `na`
    : platformSessionAndSourcesAwake < 12e4
      ? `awake`
      : options >= 12e4
        ? `slept`
        : `na`;
}

var platformSessionAndSourcesS0S1S5S12Values: string[];

function resolvePlatformSessionAndSourcesValue23(
  platformSessionAndSourcesValue23?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return resolvePlatformSessionAndSourcesIsFinite2(
    platformSessionAndSourcesValue23,
  )
    ? platformSessionAndSourcesValue23 < 6e4
      ? `s0`
      : platformSessionAndSourcesValue23 < 3e5
        ? `s1`
        : platformSessionAndSourcesValue23 < 72e4
          ? `s5`
          : platformSessionAndSourcesValue23 < 12e5
            ? `s12`
            : `s20p`
    : null;
}

var platformSessionAndSourcesVisHidValues: string[];

function resolvePlatformSessionAndSourcesValue24(
  platformSessionAndSourcesValue24?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return platformSessionAndSourcesValue24 === true
    ? `hid`
    : platformSessionAndSourcesValue24 === false
      ? `vis`
      : null;
}

var resolvePlatformSessionAndSourcesValue25: (platformSessionAndSourcesValue25?: Dynamic, options?: Dynamic, context?: Dynamic, dependencies?: Dynamic, ..._extraArguments: unknown[]) => string;

function resolvePlatformSessionAndSourcesSilenceMs(
  platformSessionAndSourcesSilenceMs?: Dynamic,
  ..._extraArguments: unknown[]
): null | string {
  if (
    typeof platformSessionAndSourcesSilenceMs != `object` ||
    !platformSessionAndSourcesSilenceMs
  )
    return null;
  let platformSessionAndSourcesValue23: Dynamic =
    resolvePlatformSessionAndSourcesValue23(
      platformSessionAndSourcesSilenceMs.silenceMs,
    );
  let platformSessionAndSourcesValue24: Dynamic =
    resolvePlatformSessionAndSourcesValue24(
      platformSessionAndSourcesSilenceMs.hidden,
    );
  return platformSessionAndSourcesValue23 === null ||
    platformSessionAndSourcesValue24 === null
    ? null
    : resolvePlatformSessionAndSourcesValue25(
        resolvePlatformSessionAndSourcesValue22(
          platformSessionAndSourcesSilenceMs.readTimeouts,
        ),
        isPlatformSessionAndSourcesAwake(
          platformSessionAndSourcesSilenceMs.gapMs,
          platformSessionAndSourcesSilenceMs.lateMs,
        ),
        platformSessionAndSourcesValue23,
        platformSessionAndSourcesValue24,
      );
}

function isPlatformSessionAndSourcesSplit2(
  platformSessionAndSourcesSplit2?: unknown,
  ..._extraArguments: unknown[]
) {
  if (typeof platformSessionAndSourcesSplit2 != `string`) return false;
  let [
    platformSessionAndSourcesSplit2Parts,
    setPlatformSessionAndSourcesSplit2Parts,
    platformSessionAndSourcesSplit2Parts2,
    platformSessionAndSourcesSplit2Parts3,
    ...platformSessionAndSourcesSplit2Parts4
  ]: Dynamic = platformSessionAndSourcesSplit2.split(`:`);
  return (
    platformSessionAndSourcesSplit2Parts4.length === 0 &&
    platformSessionAndSourcesR0R12R39R10pValues.some(
      (
        platformSessionAndSourcesR0R12R39R10pValue?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        platformSessionAndSourcesR0R12R39R10pValue ===
        platformSessionAndSourcesSplit2Parts,
    ) &&
    platformSessionAndSourcesSleptAwakeNaValues.some(
      (
        platformSessionAndSourcesSleptAwakeNaValue?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        platformSessionAndSourcesSleptAwakeNaValue ===
        setPlatformSessionAndSourcesSplit2Parts,
    ) &&
    platformSessionAndSourcesS0S1S5S12Values.some(
      (
        platformSessionAndSourcesS0S1S5S12Value?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        platformSessionAndSourcesS0S1S5S12Value ===
        platformSessionAndSourcesSplit2Parts2,
    ) &&
    platformSessionAndSourcesVisHidValues.some(
      (
        platformSessionAndSourcesVisHidValue?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        platformSessionAndSourcesVisHidValue ===
        platformSessionAndSourcesSplit2Parts3,
    )
  );
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializePlatformSessionAndSources2Step1(): void {
  (platformSessionAndSourcesVerdictSchema = lazyZod.discriminatedUnion(`verdict`, [
      lazyZod.object({
        verdict: lazyZod.literal(`allow`),
        diff: lazyZod.array(PlatformSessionAndSourcesAddress).default([]),
        minted: lazyZod.string().optional(),
        outcome: lazyZod.string().optional(),
        value: lazyZod.unknown().optional(),
        report: lazyZod.unknown().optional(),
        rows: lazyZod.array(lazyZod.unknown()).optional(),
        truncated: lazyZod.boolean().optional(),
        attribution: lazyZod.unknown().optional(),
        id: lazyZod.string().optional(),
        rev: lazyZod.number().optional(),
        sess: lazyZod.string().optional(),
        sessSecret: lazyZod.string().optional(),
        replayed: lazyZod.boolean().optional(),
        changed: lazyZod.boolean().optional(),
        data: lazyZod.unknown().optional(),
        noop: lazyZod.boolean().optional(),
      }),
      lazyZod.object({
        verdict: lazyZod.literal(`deny`),
        reason: lazyZod.string(),
        detail: lazyZod
          .string()
          .optional()
          .describe(
            `ACK-ONLY actionable hint (paths/codes/closed-vocabulary only — never echoes submitted values).`,
          ),
        data: lazyZod.unknown().optional(),
      }),
    ]));
  (PlatformSessionAndSourcesVerdict = lazyZod.union([
    lazyZod.object({
      verdict: lazyZod.literal(`allow`),
      minted: lazyZod.string(),
    }),
    lazyZod.object({
      verdict: lazyZod.literal(`deny`),
      reason: lazyZod.string(),
    }),
  ]));
  (zBatchAck = lazyZod.discriminatedUnion(`verdict`, [
    lazyZod.object({
      verdict: lazyZod.literal(`allow`),
      acks: lazyZod.array(platformSessionAndSourcesVerdictSchema),
      created: PlatformSessionAndSourcesVerdict.optional(),
      note: lazyZod.string().optional(),
    }),
    lazyZod.object({
      verdict: lazyZod.literal(`deny`),
      index: lazyZod
        .number()
        .int()
        .nonnegative()
        .optional()
        .describe(
          `Which op denied — the batch's teaching. Absent when the envelope's own leg denied.`,
        ),
      reason: lazyZod.string(),
      detail: lazyZod
        .string()
        .optional()
        .describe(
          `ACK-ONLY actionable hint (paths/codes/closed-vocabulary only — never echoes submitted values).`,
        ),
      data: lazyZod
        .record(lazyZod.string(), lazyZod.unknown())
        .optional()
        .describe(
          `The refusal's machine facts as the engine prints them (member, retryAfterMs, why, code, at/expected) — read to word the refusal and to tell a spelling refusal from any other; never shown raw.`,
        ),
      created: PlatformSessionAndSourcesVerdict.optional(),
      note: lazyZod.string().optional(),
    }),
  ]));
  (PlatformSessionAndSourcesActor = lazyZod.object({
    at: lazyZod.string(),
    actor: lazyZod.unknown(),
    diff: lazyZod.array(PlatformSessionAndSourcesAddress),
    outcome: lazyZod.string().optional(),
    op: lazyZod
      .object({
        engine: lazyZod.string(),
        verb: lazyZod.string(),
        payload: lazyZod.unknown(),
      })
      .optional(),
    edit: lazyZod.unknown().optional(),
    applied: lazyZod.unknown().optional(),
    opId: lazyZod.string().optional().catch(undefined),
    opIds: lazyZod.array(lazyZod.string()).optional().catch(undefined),
  }));
  (PlatformSessionAndSourcesRef = lazyZod
    .object({
      ref: lazyZod.object({
        object: lazyZod.string(),
        id: lazyZod.string(),
      }),
      actor: lazyZod.unknown(),
      opId: lazyZod.string(),
      ops: lazyZod.array(lazyZod.unknown()),
      results: lazyZod.array(lazyZod.unknown()),
    })
    .passthrough());
  (PlatformSessionAndSourcesRef2 = lazyZod
    .object({
      ref: lazyZod.object({
        object: lazyZod.string(),
        id: lazyZod.string(),
      }),
      sess: lazyZod.string().optional(),
      opIds: lazyZod.array(lazyZod.string()),
      ack: lazyZod.unknown(),
    })
    .passthrough());
  (PlatformSessionAndSourcesActor2 = lazyZod.object({
    at: lazyZod.string(),
    actor: lazyZod.unknown(),
    ref: lazyZod.object({
      object: lazyZod.string(),
      id: lazyZod.string(),
    }),
    container: lazyZod
      .object({
        kind: lazyZod.string(),
        id: lazyZod.string(),
        version: lazyZod.string().optional(),
      })
      .optional(),
    yUpdate: lazyZod.string(),
  }));
  (resolvePlatformSessionAndSourcesVerb = (
    platformSessionAndSourcesVerb?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (options.name !== undefined && options.name.length === 0)
      throw Error(
        `mintLine: a name, when given, must be non-empty (zVersionValue min(1))`,
      );
    return {
      verb: `create`,
      engine: `json`,
      object: `version`,
      container: {
        kind: `project`,
        id: platformSessionAndSourcesVerb,
      },
      payload: {
        engine: `json`,
        value: {
          parent: options.parent,
          base: options.base,
          ...(options.name !== undefined && {
            name: options.name,
          }),
        },
      },
    };
  });
  (resolvePlatformSessionAndSourcesVerb2 = (
    platformSessionAndSourcesVerb2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    verb: `update`,
    engine: `json`,
    ref: {
      object: `project`,
      id: platformSessionAndSourcesVerb2,
    },
    payload: {
      engine: `json`,
      kind: `patch`,
      patch: [
        {
          op: `set`,
          path: [`defaultVersionId`],
          value: options,
        },
      ],
    },
  }));
  (resolvePlatformSessionAndSourcesVerb3 = (
    platformSessionAndSourcesVerb3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    verb: `update`,
    engine: `json`,
    ref: {
      object: `project`,
      id: platformSessionAndSourcesVerb3,
    },
    payload: {
      engine: `json`,
      kind: `patch`,
      patch: [
        {
          op: `set`,
          path: [`defaultVersionId`],
          value: null,
        },
      ],
    },
  }));
  (resolvePlatformSessionAndSourcesVerb4 = (
    platformSessionAndSourcesVerb4?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    verb: `read`,
    engine: `json`,
    ref: {
      object: `project`,
      id: platformSessionAndSourcesVerb4,
    },
    payload: {},
  }));
  (resolvePlatformSessionAndSourcesVerb5 = (
    platformSessionAndSourcesVerb5?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    dependencies?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    verb: `update`,
    engine: `json`,
    ref: {
      object: `version`,
      id: options,
    },
    container: {
      kind: `project`,
      id: platformSessionAndSourcesVerb5,
    },
    payload: {
      kind: `patch`,
      patch: [
        {
          op: `set`,
          path: [context],
          value: dependencies,
        },
      ],
    },
  }));
  (resolvePlatformSessionAndSourcesFrozen = (
    platformSessionAndSourcesFrozen?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolvePlatformSessionAndSourcesVerb5(
      platformSessionAndSourcesFrozen,
      options,
      `frozen`,
      true,
    ));
  (resolvePlatformSessionAndSourcesFrozen2 = (
    platformSessionAndSourcesFrozen2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolvePlatformSessionAndSourcesVerb5(
      platformSessionAndSourcesFrozen2,
      options,
      `frozen`,
      false,
    ));
  (resolvePlatformSessionAndSourcesAbandoned = (
    platformSessionAndSourcesAbandoned?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolvePlatformSessionAndSourcesVerb5(
      platformSessionAndSourcesAbandoned,
      options,
      `abandoned`,
      true,
    ));
  (resolvePlatformSessionAndSourcesName = (
    platformSessionAndSourcesName?: Dynamic,
    options?: Dynamic,
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (items.length === 0)
      throw Error(`renameLine: name must be non-empty (zVersionValue min(1))`);
    return resolvePlatformSessionAndSourcesVerb5(
      platformSessionAndSourcesName,
      options,
      `name`,
      items,
    );
  });
  (resolvePlatformSessionAndSourcesValue17 = (
    platformSessionAndSourcesValue17?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `/api/v3/door/project/${encodeURIComponent(platformSessionAndSourcesValue17)}/feed`);
  (resolvePlatformSessionAndSourcesValue18 = (
    platformSessionAndSourcesValue18?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `/api/v3/door/project/${encodeURIComponent(platformSessionAndSourcesValue18)}/presence`);
  (PlatformSessionAndSourcesPrincipal = lazyZod.object({
    principal: lazyZod.string(),
    connId: lazyZod.string(),
    at: lazyZod.number(),
    body: lazyZod.unknown(),
    channel: lazyZod.enum([`human`, `internal`, `external`]).default(`human`),
    agent: lazyZod
      .object({
        name: lazyZod.string(),
        runId: lazyZod.string().optional(),
        running: lazyZod.boolean().optional(),
        write: lazyZod.boolean().optional(),
      })
      .optional(),
  }));
  (PlatformSessionAndSourcesPrincipal2 = lazyZod.object({
    principal: lazyZod.string(),
    connId: lazyZod.string(),
  }));
  (resolvePlatformSessionAndSourcesValue19 = (
    platformSessionAndSourcesValue19?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `/api/v3/versions/${encodeURIComponent(platformSessionAndSourcesValue19)}`);
  (PlatformSessionAndSourcesHead = lazyZod.object({
    head: lazyZod.number().int().nonnegative(),
    defaultVersionId: lazyZod.string().nullable(),
    lines: lazyZod.array(
      lazyZod.object({
        id: lazyZod.string(),
        parent: lazyZod.string().nullable(),
        base: lazyZod.number().int().nonnegative(),
        name: lazyZod.string().optional(),
        frozen: lazyZod.boolean().optional(),
        abandoned: lazyZod.boolean().optional(),
        bornAtSeq: lazyZod.number().int().optional(),
        bornAt: lazyZod.string().optional(),
      }),
    ),
  }));
  (PlatformSessionAndSourcesEngineUnported = {
    "engine-unported": `This kind of tab doesn't open inside a Claude artifact — open the project in Bongo.`,
    "transfer-unbridged": `Ownership transfer rides the claim flow for now — the door-side transfer lands with the owner bridge.`,
    "self-grant": `You can't change your own access — ask the owner or an editor.`,
    "self-lockout": `Removing this would remove your own access — confirm the removal to proceed anyway.`,
    "owner-grant": `The owner's access can't be changed — ownership moves only by transfer.`,
    "absent-grant": `That access row isn't on the new plane — reload to see the current list.`,
    "owner-only": `Only the owner can do this.`,
    "publish-target": `That version can't be published to this project.`,
    "publish-abandoned": `That version was abandoned — restore it to a new draft first.`,
    "no-such-parent": `The draft you're branching from no longer exists here.`,
    "future-base": `That point in history doesn't exist yet — try again.`,
    "empty-base": `There's no history to branch from yet.`,
    ancestry: `A draft's origin can't be changed after it's created.`,
    "version-on-line": `Drafts are managed from the project, not from inside a draft.`,
    "version-delete": `Drafts can't be deleted — abandon the draft instead.`,
    frozen: `This draft is frozen — unfreeze it to make changes.`,
    abandoned: `This draft was abandoned and no longer accepts changes.`,
    "wrong-line": `This view is out of date — reload to continue.`,
    "no-such-line": `That draft no longer exists — reload to continue.`,
    "room-plane-on-line": `Project settings are managed from the project, not from inside a draft.`,
    access: `You don't have access to do that here.`,
    forbidden: `You can view this document but not edit it — ask the owner for edit access.`,
    row_too_large: `That is more than the server takes in one piece — try it in smaller parts.`,
    "routine-run": `A routine can only promote a run that exists here and that you can read — promotion references the run's minted id (runId), not a name. Check the id against your own run list.`,
    "routine-run-not-done": `Only a successfully completed run can become a routine's first run — this one isn't (still in flight, or it failed). Wait for it to finish or re-run until it succeeds, then promote the successful run's id.`,
    "run-id-frozen": `A routine's promoted first run (runId) is a birth fact — it can't be added, changed, or removed after create. Re-send the value with runId unchanged; to promote a different run, create a new routine.`,
    "routine-adapter": `An adapter must be one of {kind:"json-rows", rows:"<dotted path>"} | {kind:"json-columnar", rows:"<dotted path>", columns:"<dotted path>"} | {kind:"xml-rows"} | {kind:"csv", hasHeader:true|false} — check the required fields for the kind. A csv adapter in particular must declare hasHeader (true reads the first row as column names; false reads it as data): omitting it is the pre-#4044 spelling and is refused on new authoring so a headerless CSV is never silently mis-shaped.`,
    adapter: `An adapter must be one of {kind:"json-rows", rows:"<dotted path>"} | {kind:"json-columnar", rows:"<dotted path>", columns:"<dotted path>"} | {kind:"xml-rows"} | {kind:"csv", hasHeader:true|false} — check the required fields for the kind. A csv adapter in particular must declare hasHeader; omitting it is the pre-#4044 spelling and is refused on new authoring.`,
    "routine-param-decl": `A routine parameter is declared as {type:"string"} or {type:"string", enum:["…"]} — string is the only parameter type (an enum is a constraint on it, not a second type; a description may ride either form). There are no required flags and no other types: args always arrive as strings, and the routine's body parses what it needs (a code routine doing arithmetic writes Number(...) itself).`,
    "run-args": `A run's args are a flat map of strings — every value arrives exactly as sent, as a string, never coerced (the routine's body parses what it needs; a code routine writes Number(...) itself). Pass every parameter the routine declares and nothing else, and give an enum parameter one of its declared option names (never a position or index) — the routine's served parameters list the declared names.`,
    "routine-params-crondef": `A routine that declares parameters can't carry a schedule yet — scheduled runs of parameterized routines await the schedule-pins-args decision (a scheduled fire carries no arguments, and declared parameters have no defaults to fill them). Remove the crondef, or remove the declared parameters.`,
    "routine-run-params": `Promotion is for parameterless routines today — a routine that declares parameters can't cite an existing run as its first result (runId), because which parameterization that result answers for is undecided. Create the parameterized routine without runId and fire it, or promote the run into a routine without parameters.`,
    "promoted-run-live": `This run is the last successful result backing a routine's data — the routine promoted it, or the routine's promoted first run is already gone and this is its only remaining success. Dismissing it would blank that routine's data. Re-run the routine to a newer success first, or delete the routine itself.`,
    "birth-node-engine": `A widget build can only start at a widget node, and this run's node isn't one here — mint the node with the call-level engine:"widget" param (an engine field inside the payload creates content, not an engine) and start the run at that node.`,
    "routine-params": `The parameters don't match this routine's declared input schema — check the values (and the schema itself, if you authored it) and run again.`,
    "group-grant": `This group's access can't be changed right now — it may not exist, or it can't be verified with the directory. Try again, grant people individually, or remove the group's access.`,
    container: `That change doesn't belong to this project — reload to continue.`,
    absent: `That draft no longer exists here — reload to continue.`,
    "value-shape": `That change isn't valid — check the value and try again.`,
    "emoji-grapheme": `A reaction is a single emoji.`,
    "utterance-author": `Only the author can edit or delete this message.`,
    "reaction-parent": `You can only react to a comment or a reply.`,
    "thread-depth": `Replies go on the top-level comment — threads are one level deep.`,
    "resolve-root": `Only a top-level comment can be resolved.`,
    parent: `That comment is no longer here — reload to catch up.`,
    "stale-approve": `This run changed since you looked — review the fresh version and approve again.`,
    "approve-channel": `Only a person can approve a run — approve it from your own session.`,
    "approve-pin-missing": `This approval didn't carry its review pin — reload and try again.`,
    "approve-pin-misplaced": `Only a staged run can be approved.`,
    "connector-unbound": `This approval didn't carry the connector's identity — review the run from the app (which resolves the connector on your account) and approve again.`,
    "connector-pin-misplaced": `A connector identity pin only belongs on the approval of a run whose routine calls a connector.`,
    "stale-parameters": `This routine's declared parameters changed since you looked — review the fresh version and approve again.`,
    "parameters-pin-misplaced": `A declared-parameters pin only belongs on the approval of a run whose routine declares parameters.`,
    "routine-consent": `This routine needs a fresh review — stage a run and approve it to re-arm it.`,
    "stale-routine": `This routine changed since you looked — review it and approve again.`,
    "defaults-unreviewable": `This routine's defaults can't be displayed faithfully for review — too large, or containing hidden or reordering characters. Fix them to approve.`,
    "body-unreviewable": `This routine's body can't be displayed faithfully for review — too large, or containing hidden or reordering characters. Fix it to approve.`,
    "schedule-unreviewable": `This routine's schedule can't be displayed faithfully for review — too large, or containing hidden or reordering characters. Fix it to approve.`,
    "name-unreviewable": `This routine's name contains hidden or reordering characters and can't be displayed faithfully for review. Rename it to approve.`,
    "outputs-unreviewable": `This routine's declared outputs contain hidden or reordering characters and can't be displayed faithfully for review. Fix them to approve.`,
    "parameters-unreviewable": `This routine's declared parameters can't be displayed faithfully for review — too large, or containing hidden or reordering characters. Under a declared-parameters routine, approval arms every valid-args fire, so the declaration itself must be fully reviewable. Fix the declaration to approve.`,
    "params-unreviewable": `This run's parameters contain hidden or reordering characters and can't be displayed faithfully for review. Re-stage it with clean parameters to approve.`,
    "pub-stamped": `A comment's provenance records the chart's publish generation itself — leave pub out and the door stamps it.`,
    "column-unknown": `One of the row's cells names a column the table doesn't have — check the cell keys against the table's columns.`,
    "column-required": `A required column is missing its value — fill every required cell and try again.`,
    "column-type": `A cell value doesn't match its column's type — check each cell against the table's column types.`,
    "enum-index": `Enum cells are written as the chosen option's NUMBER — its index in the enum's options list — and the index must name an existing, enabled option of an enum in this same container.`,
    last_tab: `A document must keep at least one tab — edit or replace this tab instead of deleting it.`,
  });
  (PlatformSessionAndSourcesMessage5 = `The server could not take that change just now — try again in a moment.`);
  (resolvePlatformSessionAndSourcesUnavailable = (
    platformSessionAndSourcesUnavailable?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    platformSessionAndSourcesUnavailable === `unavailable`
      ? options === `busy`
        ? PAGE_BUSY_TRY_AGAIN
        : PlatformSessionAndSourcesMessage5
      : ((Object.hasOwn(
          PlatformSessionAndSourcesEngineUnported,
          platformSessionAndSourcesUnavailable,
        )
          ? PlatformSessionAndSourcesEngineUnported[
              platformSessionAndSourcesUnavailable
            ]
          : undefined) ??
        `The change was refused (` +
          platformSessionAndSourcesUnavailable +
          `). Reload and try again.`));
  (resolvePlatformSessionAndSourcesUnavailable2 = (
    platformSessionAndSourcesUnavailable2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    platformSessionAndSourcesUnavailable2 === `unavailable` ||
    Object.hasOwn(
      PlatformSessionAndSourcesEngineUnported,
      platformSessionAndSourcesUnavailable2,
    ));
  (resolvePlatformSessionAndSourcesData = (
    platformSessionAndSourcesData?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let why: Dynamic =
      typeof platformSessionAndSourcesData.data == `object` &&
      platformSessionAndSourcesData.data !== null
        ? platformSessionAndSourcesData.data.why
        : undefined;
    return typeof why == `string` ? why : undefined;
  });
  (platformSessionAndSourcesStateDownNotOpenGrantExpiredGrantMismatchValues = [
    `state_down`,
    `not_open`,
    `grant_expired`,
    `grant_mismatch`,
    `reset_reopening`,
    `open_unanswered`,
    `unanswered`,
  ]);
  (PlatformSessionAndSourcesNOTOPEN = [
    [`NOT_OPEN`, `not_open`],
    [`GRANT_EXPIRED`, `grant_expired`],
    [`GRANT_MISMATCH`, `grant_mismatch`],
  ]);
  (platformSessionAndSourcesUpdateBatchSessionCommentValues = [
    `update`,
    `batch`,
    `session`,
    `comment`,
    `create`,
    `delete`,
    `access`,
    `misc`,
  ]);
  (platformSessionAndSourcesPinnedMintedValues = [`pinned`, `minted`]);
  (resolvePlatformSessionAndSourcesPinned = (
    platformSessionAndSourcesPinned?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `${platformSessionAndSourcesPinned}.${options === true ? `pinned` : `minted`}`);
  (platformSessionAndSourcesR0R12R39R10pValues = [
    `r0`,
    `r1_2`,
    `r3_9`,
    `r10p`,
  ]);
  (platformSessionAndSourcesSleptAwakeNaValues = [`slept`, `awake`, `na`]);
  (resolvePlatformSessionAndSourcesIsFinite2 = (
    platformSessionAndSourcesIsFinite2?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof platformSessionAndSourcesIsFinite2 == `number` &&
    Number.isFinite(platformSessionAndSourcesIsFinite2) &&
    platformSessionAndSourcesIsFinite2 >= 0);
  (platformSessionAndSourcesS0S1S5S12Values = [
    `s0`,
    `s1`,
    `s5`,
    `s12`,
    `s20p`,
  ]);
  (platformSessionAndSourcesVisHidValues = [`vis`, `hid`]);
  (resolvePlatformSessionAndSourcesValue25 = (
    platformSessionAndSourcesValue25?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    dependencies?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `${platformSessionAndSourcesValue25}:${options}:${context}:${dependencies}`);
}

export {
  PlatformSessionAndSourcesActor,
  PlatformSessionAndSourcesActor2,
  PlatformSessionAndSourcesPrincipal,
  PlatformSessionAndSourcesPrincipal2,
  PlatformSessionAndSourcesRef,
  PlatformSessionAndSourcesRef2,
  isPlatformSessionAndSourcesSplit,
  isPlatformSessionAndSourcesSplit2,
  loadPlatformSessionAndSourcesAckOf,
  loadPlatformSessionAndSourcesAckOf2,
  loadPlatformSessionAndSourcesFrameVersionTable,
  platformSessionAndSourcesStateDownNotOpenGrantExpiredGrantMismatchValues,
  platformSessionAndSourcesVerdictSchema,
  resolvePlatformSessionAndSourcesAbandoned,
  resolvePlatformSessionAndSourcesCreate,
  resolvePlatformSessionAndSourcesCreate2,
  resolvePlatformSessionAndSourcesData,
  resolvePlatformSessionAndSourcesFind,
  resolvePlatformSessionAndSourcesFrozen,
  resolvePlatformSessionAndSourcesFrozen2,
  resolvePlatformSessionAndSourcesName,
  resolvePlatformSessionAndSourcesPinned,
  resolvePlatformSessionAndSourcesResults,
  resolvePlatformSessionAndSourcesSilenceMs,
  resolvePlatformSessionAndSourcesUnavailable,
  resolvePlatformSessionAndSourcesUnavailable2,
  resolvePlatformSessionAndSourcesValue17,
  resolvePlatformSessionAndSourcesValue18,
  resolvePlatformSessionAndSourcesValue19,
  resolvePlatformSessionAndSourcesValue20,
  resolvePlatformSessionAndSourcesValue21,
  resolvePlatformSessionAndSourcesVerb,
  resolvePlatformSessionAndSourcesVerb2,
  resolvePlatformSessionAndSourcesVerb3,
  resolvePlatformSessionAndSourcesVerb4,
  zBatchAck,
};
