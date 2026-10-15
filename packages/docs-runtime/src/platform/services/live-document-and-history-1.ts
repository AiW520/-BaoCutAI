/** BaoCut: platform live document and history from app-core-BE6n4d7F.js. */
import type { UnknownRecord } from "../../serialization/value-contracts";
import type {
  CutResult,
  RoutineConsent,
  RoutineRunStatus,
  RoutineMechanism,
  RetryStreak,
  RetryAttempt,
  RetryClock,
  RetryScheduler,
  RunPool,
  NodeReader,
  HistoryVersion,
} from "../operations/contracts";
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  ReplaceAroundStep,
  ReplaceStep,
  Slice,
  TextSelection,
  create,
  isMacOS,
  isiOS,
  liftTarget,
  replaceStep,
} from "../dependencies";
import {
  filterDataContentAndReferencesFilter,
} from "../data/content-and-references";
import {
  resolvePlatformSessionAndSourcesTest6,
} from "./session-and-sources-1";
import {
  resolvePlatformSessionAndSourcesUnavailable,
} from "./session-and-sources-2";
import {
  editorAnchorsAndMentionsPattern3,
} from "../../prose-editor/platform/anchors-and-mentions-1";
import {
  api,
} from "./api-and-auth-1";
import {
  PlatformApiAndAuthStyles3,
  liveDoor,
} from "./api-and-auth-2";
import {
  DataOperationControlRoomReadDenied,
  resolveDataOperationControlIsFinite,
} from "../data/operation-control-5";
import {
  ListBehaviorExtension,
  isEditorTableControlsSize,
} from "../../prose-editor/platform/table-controls-1";
import {
  resolvePlatformLiveDocumentAndHistorySinkListItemSameKind,
} from "../../prose-editor/platform/media-2";
import {
  platformLiveDocumentAndHistoryPattern5,
  resolvePlatformLiveDocumentAndHistoryDragMove,
  resolvePlatformLiveDocumentAndHistoryValue13,
  resolvePlatformLiveDocumentAndHistoryValue15,
} from "./live-document-and-history-2";

function resolvePlatformLiveDocumentAndHistoryCut(
  platformLiveDocumentAndHistoryCut: import("prosemirror-model").ResolvedPos,
): CutResult {
  let leavesList = false;
  if (platformLiveDocumentAndHistoryCut.parent.type.spec.isolating)
    return {
      $cut: null,
      leavesList: leavesList,
      walled: true,
    };
  for (
    let difference = platformLiveDocumentAndHistoryCut.depth - 1;
    difference >= 0;
    difference--
  ) {
    let node = platformLiveDocumentAndHistoryCut.node(difference);
    if (
      platformLiveDocumentAndHistoryCut.index(difference) + 1 <
      node.childCount
    )
      return {
        $cut: platformLiveDocumentAndHistoryCut.doc.resolve(
          platformLiveDocumentAndHistoryCut.after(difference + 1),
        ),
        leavesList: leavesList,
        walled: false,
      };
    if (node.type.spec.isolating)
      return {
        $cut: null,
        leavesList: leavesList,
        walled: true,
      };
    if (node.type.name === `list`) {
      leavesList = true;
    }
  }
  return {
    $cut: null,
    leavesList: leavesList,
    walled: false,
  };
}

function isPlatformLiveDocumentAndHistoryListItem(
  platformLiveDocumentAndHistoryListItem?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let parent: Dynamic =
    platformLiveDocumentAndHistoryListItem.doc.resolve(options).parent;
  let tr2: Dynamic = platformLiveDocumentAndHistoryListItem.tr;
  let nodeAfter: Dynamic = context.nodeAfter;
  let pos: Dynamic = context.pos;
  let items: Dynamic = [];
  if (nodeAfter?.type.name === `listItem`) {
    if (nodeAfter.childCount > 1 && nodeAfter.child(1).type.name === `list`)
      return null;
    nodeAfter = nodeAfter.firstChild;
    pos += 1;
  } else
    for (; nodeAfter && !nodeAfter.isTextblock; ) {
      if (nodeAfter.type.spec.isolating || !nodeAfter.firstChild) return null;
      items.push(nodeAfter);
      nodeAfter = nodeAfter.firstChild;
      pos += 1;
    }
  if (
    !nodeAfter?.isTextblock ||
    nodeAfter.type.spec.code ||
    parent.type.spec.code ||
    !parent.type.validContent(nodeAfter.content)
  )
    return null;
  let count: number = 0;
  for (
    let difference = items.length - 1;
    difference >= 0 && items[difference].childCount === 1;
    difference--
  )
    if (items[difference].type.name !== `list`) {
      count += 1;
    }
  if (count > 1) return null;
  for (; items.length && pos > context.pos; ) {
    let blockRange: Dynamic = tr2.doc
      .resolve(pos + 1)
      .blockRange(tr2.doc.resolve(pos + nodeAfter.nodeSize - 1));
    let liftTarget2: Dynamic = blockRange ? liftTarget(blockRange) : null;
    if (!blockRange || liftTarget2 == null || liftTarget2 < context.depth)
      return null;
    tr2.lift(blockRange, liftTarget2);
    pos -= blockRange.depth - liftTarget2;
  }
  let total: Dynamic = pos + 1;
  let replaceStep2: Dynamic = replaceStep(tr2.doc, options, total, Slice.empty);
  return !(
    replaceStep2 instanceof (ReplaceStep as Dynamic) ||
    replaceStep2 instanceof (ReplaceAroundStep as Dynamic)
  ) ||
    replaceStep2.from !== options ||
    (replaceStep2 instanceof (ReplaceStep as Dynamic) &&
      replaceStep2.slice.size >= total - options)
    ? null
    : (tr2.step(replaceStep2),
      tr2
        .setSelection(TextSelection.create(tr2.doc, options))
        .scrollIntoView());
}

var PlatformLiveDocumentAndHistoryAddOptions: Dynamic;

var platformLiveDocumentAndHistoryMap: Dynamic;

var platformLiveDocumentAndHistoryValue0: number;

var PlatformLiveDocumentAndHistoryEntries: Dynamic;

function resolvePlatformLiveDocumentAndHistoryToolCall(
  platformLiveDocumentAndHistory: unknown,
): RoutineMechanism | undefined {
  if (platformLiveDocumentAndHistory === `tool_call`) return `toolCall`;
  if (
    platformLiveDocumentAndHistory === `prompt` ||
    platformLiveDocumentAndHistory === `code`
  )
    return platformLiveDocumentAndHistory;
}

var resolvePlatformLiveDocumentAndHistoryValue: (platformLiveDocumentAndHistoryValue: unknown) => platformLiveDocumentAndHistoryValue is UnknownRecord;

function filterPlatformLiveDocumentAndHistoryStatus(
  filterPlatformLiveDocumentAndHistoryStatus2:
    | RoutineConsent
    | null
    | undefined,
  options: unknown,
): RoutineRunStatus {
  let params;
  if (options == null) params = undefined;
  else if (resolvePlatformLiveDocumentAndHistoryValue(options)) {
    let filteredOptionsEntries = Object.entries(options).filter(
      ([, optionsEntry]) => optionsEntry !== undefined,
    );
    params =
      filteredOptionsEntries.length > 0
        ? Object.fromEntries(filteredOptionsEntries)
        : undefined;
  } else params = options;
  return {
    status:
      filterPlatformLiveDocumentAndHistoryStatus2 != null &&
      (filterPlatformLiveDocumentAndHistoryStatus2.consentLive === true ||
        filterPlatformLiveDocumentAndHistoryStatus2.scheduleApproved ===
          true) &&
      params === undefined &&
      filterPlatformLiveDocumentAndHistoryStatus2?.declaresParams !== true
        ? `pending`
        : `staged`,
    ...(params === undefined
      ? {}
      : {
          params: params,
        }),
  };
}

var platformLiveDocumentAndHistoryValue5000: number;

var platformLiveDocumentAndHistorySet: Set<unknown>;

var resolvePlatformLiveDocumentAndHistoryValue2: (platformLiveDocumentAndHistoryValue2: unknown) => boolean;

var resolvePlatformLiveDocumentAndHistoryReason: Dynamic;

function resolvePlatformLiveDocumentAndHistoryFirst(
  platformLiveDocumentAndHistoryFirst: RetryStreak | null | undefined,
  first: number,
  context: number,
  dependencies?: number,
): RetryAttempt {
  let streak = platformLiveDocumentAndHistoryFirst
    ? {
        first: platformLiveDocumentAndHistoryFirst.first,
        n: platformLiveDocumentAndHistoryFirst.n + 1,
      }
    : {
        first: first,
        n: 1,
      };
  let total =
    300 * 2 ** (streak.n - 1) +
    Math.floor(Math.max(0, Math.min(context, 0.999)) * 300);
  let delayMs = Math.max(
    total,
    dependencies !== undefined && dependencies >= 0 ? dependencies : 0,
  );
  return {
    streak: streak,
    delayMs: delayMs,
    giveUp:
      first + delayMs - streak.first > platformLiveDocumentAndHistoryValue5000,
  };
}

function updatePlatformLiveDocumentAndHistoryShed<Key, Handle>(
  timers: RetryClock<Handle>,
): RetryScheduler<Key> {
  let lookup: Map<Key, RetryStreak> = new Map();
  let lookup2: Map<Key, Handle> = new Map();
  return {
    shed(updatePlatformLiveDocumentAndHistoryShed2, options, context) {
      if (lookup2.has(updatePlatformLiveDocumentAndHistoryShed2))
        return `retrying`;
      let platformLiveDocumentAndHistoryFirst =
        resolvePlatformLiveDocumentAndHistoryFirst(
          lookup.get(updatePlatformLiveDocumentAndHistoryShed2),
          timers.now(),
          timers.random(),
          context,
        );
      return platformLiveDocumentAndHistoryFirst.giveUp
        ? (lookup.delete(updatePlatformLiveDocumentAndHistoryShed2), `gave-up`)
        : (lookup.set(
            updatePlatformLiveDocumentAndHistoryShed2,
            platformLiveDocumentAndHistoryFirst.streak,
          ),
          lookup2.set(
            updatePlatformLiveDocumentAndHistoryShed2,
            timers.setTimeout(() => {
              lookup2.delete(updatePlatformLiveDocumentAndHistoryShed2);
              options();
            }, platformLiveDocumentAndHistoryFirst.delayMs),
          ),
          `retrying`);
    },
    settle(updatePlatformLiveDocumentAndHistoryShed2) {
      lookup.delete(updatePlatformLiveDocumentAndHistoryShed2);
      let lookupEntry = lookup2.get(updatePlatformLiveDocumentAndHistoryShed2);
      if (lookupEntry !== undefined) {
        lookup2.delete(updatePlatformLiveDocumentAndHistoryShed2);
        timers.clearTimeout(lookupEntry);
      }
    },
    dispose() {
      for (let updatePlatformLiveDocumentAndHistoryShedResult of lookup2.values())
        timers.clearTimeout(updatePlatformLiveDocumentAndHistoryShedResult);
      lookup2.clear();
      lookup.clear();
    },
    pending: () => lookup2.size,
  };
}

function loadPlatformLiveDocumentAndHistoryRun(
  platformLiveDocumentAndHistoryRun: number,
): RunPool {
  let index = 0;
  let items: Array<() => void> = [];
  let loadPlatformLiveDocumentAndHistoryRunHandler: () => Promise<void> = () =>
    index < platformLiveDocumentAndHistoryRun
      ? (index++, Promise.resolve())
      : new Promise((resolve) => items.push(resolve));
  let shift = () => {
    let shift2 = items.shift();
    if (shift2) {
      shift2();
    } else {
      index--;
    }
  };
  return {
    async run<Result>(
      platformLiveDocumentAndHistoryRun2: () => Result | PromiseLike<Result>,
    ): Promise<Awaited<Result>> {
      await loadPlatformLiveDocumentAndHistoryRunHandler();
      try {
        return await platformLiveDocumentAndHistoryRun2();
      } finally {
        shift();
      }
    },
    inFlight: () => index,
    waiting: () => items.length,
  };
}

var PlatformLiveDocumentAndHistorySession: Dynamic;

var PlatformLiveDocumentAndHistoryWidgetBundle: Dynamic;

var platformLiveDocumentAndHistorySet2: Dynamic;

function resolvePlatformLiveDocumentAndHistoryNode(
  platformLiveDocumentAndHistoryNode?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let reason: Dynamic =
    typeof options.reason == `string` ? options.reason : undefined;
  if (resolvePlatformLiveDocumentAndHistoryValue2(reason))
    throw new (DataOperationControlRoomReadDenied as Dynamic)(
      {
        object: `node`,
        id: platformLiveDocumentAndHistoryNode,
      },
      reason,
      resolveDataOperationControlIsFinite(options.data),
    );
  return null;
}

var PlatformLiveDocumentAndHistoryState: Dynamic;

async function loadPlatformLiveDocumentAndHistoryStatus(
  platformLiveDocumentAndHistoryStatus?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let { status: call, body: call2 }: Dynamic =
    await platformLiveDocumentAndHistoryStatus.call(`read`, {
      ref: {
        object: `node`,
        id: options,
      },
      payload: {
        kind: `projection`,
      },
    });
  let call3: Dynamic = call2;
  if (typeof call3?.verdict != `string`)
    throw Error(`widget projection: door ${call}`);
  if (call3.verdict !== `allow`)
    return resolvePlatformLiveDocumentAndHistoryNode(options, call3);
  let value: Dynamic = call3.value;
  if (
    typeof value?.kind != `string` ||
    !platformLiveDocumentAndHistorySet2.has(value.kind)
  )
    throw Error(
      `widget projection: allow with no projection (kind ${String(value?.kind)})`,
    );
  return value;
}

async function loadPlatformLiveDocumentAndHistoryStatus2(
  platformLiveDocumentAndHistoryStatus2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let { status: call, body: call2 }: Dynamic =
    await platformLiveDocumentAndHistoryStatus2.call(`read`, {
      ref: {
        object: `node`,
        id: options,
      },
      payload: {
        kind: `build`,
      },
    });
  let call3: Dynamic = call2;
  if (typeof call3?.verdict != `string`)
    throw Error(`widget build: door ${call}`);
  if (call3.verdict !== `allow`)
    return resolvePlatformLiveDocumentAndHistoryNode(options, call3);
  let value: Dynamic = call3.value;
  if (
    typeof value != `object` ||
    !value ||
    !(`run` in value) ||
    !(value.run === null || typeof value.run == `object`) ||
    (value.runs !== undefined && !Array.isArray(value.runs))
  )
    throw Error(`widget build: allow with no build reply`);
  return value;
}

async function loadPlatformLiveDocumentAndHistoryContainer(
  platformLiveDocumentAndHistoryContainer?: Dynamic,
  options?: unknown,
  context?: Dynamic,
  dependencies: Dynamic = {},
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let read: Dynamic =
    dependencies.read ??
    ((..._extraArguments: unknown[]): Dynamic =>
      loadPlatformLiveDocumentAndHistoryStatus(
        dependencies.door ??
          liveDoor(platformLiveDocumentAndHistoryContainer, {
            container: {
              kind: `project`,
              id: platformLiveDocumentAndHistoryContainer,
            },
          }),
        context,
      ));
  let wait: Dynamic =
    dependencies.wait ??
    ((
      platformLiveDocumentAndHistoryContainer2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      new (Promise as Dynamic)(
        (resolve?: Dynamic, ..._extraArguments: unknown[]) =>
          setTimeout(resolve, platformLiveDocumentAndHistoryContainer2),
      ));
  let now: Dynamic =
    dependencies.now ?? ((..._extraArguments: unknown[]) => Date.now());
  let random: Dynamic =
    dependencies.random ?? ((..._extraArguments: unknown[]) => Math.random());
  let items = [400, 1200];
  let index = 0;
  let loadPlatformLiveDocumentAndHistoryContainerResult: Dynamic;
  for (;;) {
    let entry: Dynamic;
    try {
      entry = await PlatformLiveDocumentAndHistoryState.run(read);
    } catch (cause: Dynamic) {
      if (!resolvePlatformLiveDocumentAndHistoryReason(cause)) throw cause;
      let platformLiveDocumentAndHistoryFirst =
        resolvePlatformLiveDocumentAndHistoryFirst(
          loadPlatformLiveDocumentAndHistoryContainerResult,
          now(),
          random(),
          cause.retryAfterMs,
        );
      if (platformLiveDocumentAndHistoryFirst.giveUp)
        throw Error(
          `The server is busy right now — this block loads on its next change, or reload to retry.`,
          {
            cause: cause,
          },
        );
      loadPlatformLiveDocumentAndHistoryContainerResult =
        platformLiveDocumentAndHistoryFirst.streak;
      await wait(platformLiveDocumentAndHistoryFirst.delayMs);
      continue;
    }
    if (entry === null) return null;
    switch (entry.kind) {
      case `bundle`:
        return entry.bundle;
      case `unpublished`:
      case `not-a-widget`:
        return null;
      case `compile-failed`:
        throw Error(
          `This block's published code doesn't compile — open its panel to see the problems.`,
        );
      case `compile-busy`:
        if (index < items.length) {
          await wait(items[index++]);
          continue;
        }
        throw Error(
          `The server is busy preparing this block — edit or reload to retry.`,
        );
      default:
        throw Error(
          `widget projection replied with an unknown kind: ${String(entry.kind)}`,
        );
    }
  }
}

var resolvePlatformLiveDocumentAndHistoryVerb: Dynamic;

var resolvePlatformLiveDocumentAndHistoryKind: Dynamic;

var resolvePlatformLiveDocumentAndHistoryUnavailable: Dynamic;

var PlatformLiveDocumentAndHistoryCreate: Dynamic;

var PlatformLiveDocumentAndHistoryWidgetNoDraft: Dynamic;

var PlatformLiveDocumentAndHistoryAccess: Dynamic;

var resolvePlatformLiveDocumentAndHistoryError: Dynamic;

function loadPlatformLiveDocumentAndHistoryCode(
  platformLiveDocumentAndHistoryCode?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let basePub: number = 0;
  let enabled = false;
  let confirmOrphans: Dynamic;
  let loadPlatformLiveDocumentAndHistoryCodeResult = /confirmOrphans: (\d+)\b/;
  let read: Dynamic = async (
    ..._extraArguments: unknown[]
  ): Promise<Dynamic> => {
    let record2: Dynamic = await platformLiveDocumentAndHistoryCode.read(
      {
        object: `node`,
        id: platformLiveDocumentAndHistoryCode.nodeId,
      },
      `widget`,
    );
    basePub = typeof record2?.pub == `number` ? record2.pub : 0;
    enabled = false;
    return {
      code: typeof record2?.code == `string` ? record2.code : ``,
      draft:
        record2?.draft && typeof record2.draft.code == `string`
          ? {
              code: record2.draft.code,
            }
          : null,
    };
  };
  let read2: Dynamic = async (
    ..._extraArguments: unknown[]
  ): Promise<Dynamic> => {
    try {
      return await read();
    } catch {
      enabled = true;
      return;
    }
  };
  return {
    boot: async (..._extraArguments: unknown[]): Promise<Dynamic> => {
      try {
        return await read();
      } catch (error: Dynamic) {
        enabled = true;
        let message = error instanceof Error ? error.message : ``;
        return {
          error: true,
          rule: `read-failed`,
          message: /allow with NO value/.test(message)
            ? `This block no longer exists in the document — it may have been deleted.`
            : /deny/.test(message)
              ? `You don't have permission to view this block's code.`
              : `The block couldn't be read — try reopening the panel.`,
        };
      }
    },
    draft: async (
      code?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> => {
      if (code.length > 1048576)
        return {
          error: true,
          rule: `too-large`,
          message: `This block is over the 1 MiB limit (currently ${Math.ceil(code.length / 1024)} KiB) — trim it before saving.`,
        };
      if (enabled) {
        await read2();
      }
      let session: Dynamic = await PlatformLiveDocumentAndHistoryCreate.session(
        platformLiveDocumentAndHistoryCode.intend,
        platformLiveDocumentAndHistoryCode.nodeId,
        `draft`,
        {
          code: code,
          basePub: basePub,
          state: `draft`,
        },
      );
      if (session.ok)
        return {
          ok: true,
        };
      let platformLiveDocumentAndHistoryError: Dynamic =
        resolvePlatformLiveDocumentAndHistoryError(session.reason);
      if (platformLiveDocumentAndHistoryError.rule === `widget-draft-stale`) {
        platformLiveDocumentAndHistoryError.head = await read2();
      }
      return platformLiveDocumentAndHistoryError;
    },
    publish: async (
      platformLiveDocumentAndHistoryCode2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> => {
      let session: Dynamic = await PlatformLiveDocumentAndHistoryCreate.session(
        platformLiveDocumentAndHistoryCode.intend,
        platformLiveDocumentAndHistoryCode.nodeId,
        `publish`,
        platformLiveDocumentAndHistoryCode2?.confirmOrphans === true &&
          confirmOrphans !== undefined
          ? {
              confirmOrphans: confirmOrphans,
            }
          : {},
      );
      if (!session.ok) {
        let platformLiveDocumentAndHistoryError: Dynamic =
          resolvePlatformLiveDocumentAndHistoryError(session.reason);
        if (platformLiveDocumentAndHistoryError.rule === `anchor-orphan`) {
          let match = loadPlatformLiveDocumentAndHistoryCodeResult.exec(
            platformLiveDocumentAndHistoryError.message,
          );
          confirmOrphans = match ? Number(match[1]) : undefined;
          await read2();
        }
        return platformLiveDocumentAndHistoryError;
      }
      confirmOrphans = undefined;
      try {
        return {
          ok: true,
          code: (await read()).code,
        };
      } catch {
        enabled = true;
        return {
          error: true,
          rule: `resync-failed`,
          message: `Published — but re-reading the document failed; reopen the panel to see the current state.`,
        };
      }
    },
    revert: async (..._extraArguments: unknown[]): Promise<Dynamic> => {
      let session: Dynamic = await PlatformLiveDocumentAndHistoryCreate.session(
        platformLiveDocumentAndHistoryCode.intend,
        platformLiveDocumentAndHistoryCode.nodeId,
        `revert`,
        {},
      );
      if (!session.ok)
        return resolvePlatformLiveDocumentAndHistoryError(session.reason);
      confirmOrphans = undefined;
      try {
        return {
          ok: true,
          code: (await read()).code,
        };
      } catch {
        enabled = true;
        return {
          error: true,
          rule: `resync-failed`,
          message: `The draft was dropped — but re-reading the document failed; reopen the panel to see the current state.`,
        };
      }
    },
  };
}

async function loadPlatformLiveDocumentAndHistoryNodeId(
  platformLiveDocumentAndHistoryNodeId?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<undefined> {
  let loadPlatformLiveDocumentAndHistoryNodeIdResult: Dynamic;
  let loadPlatformLiveDocumentAndHistoryNodeIdResult2: Dynamic;
  try {
    ({
      nodeId: loadPlatformLiveDocumentAndHistoryNodeIdResult,
      runId: loadPlatformLiveDocumentAndHistoryNodeIdResult2,
    } = await PlatformLiveDocumentAndHistoryCreate.createWithBuild(
      platformLiveDocumentAndHistoryNodeId.intend,
      platformLiveDocumentAndHistoryNodeId.fileId,
      platformLiveDocumentAndHistoryNodeId.prompt,
    ));
  } catch (error: Dynamic) {
    platformLiveDocumentAndHistoryNodeId.fatal(
      error instanceof Error ? error.message : String(error),
    );
    platformLiveDocumentAndHistoryNodeId.done(false);
    return;
  }
  try {
    platformLiveDocumentAndHistoryNodeId.queued?.(
      loadPlatformLiveDocumentAndHistoryNodeIdResult,
      loadPlatformLiveDocumentAndHistoryNodeIdResult2,
    );
  } catch {}
  let PlatformLiveDocumentAndHistoryMessage5 =
    PlatformLiveDocumentAndHistoryMessage;
  try {
    if (
      !platformLiveDocumentAndHistoryNodeId.postChip(
        loadPlatformLiveDocumentAndHistoryNodeIdResult,
      )
    ) {
      platformLiveDocumentAndHistoryNodeId.note(
        PlatformLiveDocumentAndHistoryMessage5,
      );
    }
  } catch {
    platformLiveDocumentAndHistoryNodeId.note(
      PlatformLiveDocumentAndHistoryMessage5,
    );
  }
  try {
    let prompt: Dynamic = await PlatformLiveDocumentAndHistoryCreate.prompt(
      platformLiveDocumentAndHistoryNodeId.intend,
      loadPlatformLiveDocumentAndHistoryNodeIdResult,
      platformLiveDocumentAndHistoryNodeId.prompt,
      loadPlatformLiveDocumentAndHistoryNodeIdResult2,
    );
    if (!prompt.ok) {
      platformLiveDocumentAndHistoryNodeId.note(
        `The widget was created, but your prompt couldn't be saved` +
          resolvePlatformLiveDocumentAndHistoryTest(prompt.reason),
      );
    }
  } catch {
    platformLiveDocumentAndHistoryNodeId.note(
      `The widget was created, but your prompt couldn't be saved — the connection hiccuped; the widget is fine.`,
    );
  }
  platformLiveDocumentAndHistoryNodeId.done(true);
  try {
    platformLiveDocumentAndHistoryNodeId.openPanel(
      loadPlatformLiveDocumentAndHistoryNodeIdResult,
    );
  } catch {}
}

var PlatformLiveDocumentAndHistoryMessage: string;

var resolvePlatformLiveDocumentAndHistoryTest: Dynamic;

var PlatformLiveDocumentAndHistoryVs: string;

var resolvePlatformLiveDocumentAndHistoryTest2: Dynamic;

function resolvePlatformLiveDocumentAndHistoryNodeId(
  platformLiveDocumentAndHistoryNodeId?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    !platformLiveDocumentAndHistoryNodeId.startsWith(
      PlatformLiveDocumentAndHistoryVs,
    )
  )
    return null;
  let platformLiveDocumentAndHistoryNodeIdSlice: Dynamic =
    platformLiveDocumentAndHistoryNodeId.slice(3);
  let platformLiveDocumentAndHistoryNodeIdSliceIndex: Dynamic =
    platformLiveDocumentAndHistoryNodeIdSlice.indexOf(`:`);
  if (platformLiveDocumentAndHistoryNodeIdSliceIndex <= 0) return null;
  let nodeId: Dynamic = platformLiveDocumentAndHistoryNodeIdSlice.slice(
    0,
    platformLiveDocumentAndHistoryNodeIdSliceIndex,
  );
  if (!resolvePlatformSessionAndSourcesTest6(nodeId)) return null;
  let record2: Dynamic = {};
  let index = 0;
  for (let resolvePlatformLiveDocumentAndHistoryNodeIdResult of platformLiveDocumentAndHistoryNodeIdSlice
    .slice(platformLiveDocumentAndHistoryNodeIdSliceIndex + 1)
    .split(`&`) as Dynamic) {
    let resolvePlatformLiveDocumentAndHistoryNodeIdResultIndex: Dynamic =
      resolvePlatformLiveDocumentAndHistoryNodeIdResult.indexOf(`=`);
    if (resolvePlatformLiveDocumentAndHistoryNodeIdResultIndex <= 0) continue;
    let resolvePlatformLiveDocumentAndHistoryNodeIdResultSlice: Dynamic =
      resolvePlatformLiveDocumentAndHistoryNodeIdResult.slice(
        0,
        resolvePlatformLiveDocumentAndHistoryNodeIdResultIndex,
      );
    let resolvePlatformLiveDocumentAndHistoryNodeIdResultSlice2: Dynamic =
      resolvePlatformLiveDocumentAndHistoryNodeIdResult.slice(
        resolvePlatformLiveDocumentAndHistoryNodeIdResultIndex + 1,
      );
    if (
      resolvePlatformLiveDocumentAndHistoryTest2(
        resolvePlatformLiveDocumentAndHistoryNodeIdResultSlice,
        resolvePlatformLiveDocumentAndHistoryNodeIdResultSlice2,
      )
    ) {
      if (
        !Object.hasOwn(
          record2,
          resolvePlatformLiveDocumentAndHistoryNodeIdResultSlice,
        )
      ) {
        if (index >= 32) continue;
        index++;
      }
      record2[resolvePlatformLiveDocumentAndHistoryNodeIdResultSlice] =
        resolvePlatformLiveDocumentAndHistoryNodeIdResultSlice2;
    }
  }
  return {
    nodeId: nodeId,
    vs: record2,
  };
}

function resolvePlatformLiveDocumentAndHistoryEntries(
  platformLiveDocumentAndHistoryEntries?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (
    !resolvePlatformSessionAndSourcesTest6(
      platformLiveDocumentAndHistoryEntries,
    )
  )
    return null;
  let items: Dynamic = [];
  for (let [
    resolvePlatformLiveDocumentAndHistoryEntriesResult,
    resolvePlatformLiveDocumentAndHistoryEntriesResult2,
  ] of Object.entries(options) as Dynamic) {
    if (items.length >= 32) break;
    if (
      resolvePlatformLiveDocumentAndHistoryTest2(
        resolvePlatformLiveDocumentAndHistoryEntriesResult,
        resolvePlatformLiveDocumentAndHistoryEntriesResult2,
      )
    ) {
      items.push(
        `${resolvePlatformLiveDocumentAndHistoryEntriesResult}=${resolvePlatformLiveDocumentAndHistoryEntriesResult2}`,
      );
    }
  }
  return items.length
    ? `${PlatformLiveDocumentAndHistoryVs}${platformLiveDocumentAndHistoryEntries}:${items.join(`&`)}`
    : null;
}

function resolvePlatformLiveDocumentAndHistoryNodeId2(
  platformLiveDocumentAndHistoryNodeId2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let {
    nodeId: nodeId,
    frag: platformLiveDocumentAndHistoryNodeId22,
    fragNow: fragAtQueue,
    base: base,
    pending: pending,
  }: Dynamic = platformLiveDocumentAndHistoryNodeId2;
  let platformLiveDocumentAndHistoryNodeId: Dynamic =
    resolvePlatformLiveDocumentAndHistoryNodeId(fragAtQueue);
  let url: Dynamic =
    platformLiveDocumentAndHistoryNodeId22 &&
    (!fragAtQueue || platformLiveDocumentAndHistoryNodeId) &&
    fragAtQueue !== platformLiveDocumentAndHistoryNodeId22
      ? `#${platformLiveDocumentAndHistoryNodeId22}`
      : !platformLiveDocumentAndHistoryNodeId22 &&
          platformLiveDocumentAndHistoryNodeId?.nodeId === nodeId
        ? base
        : null;
  return url
    ? {
        url: url,
        pending: {
          url: url,
          base: base,
          nodeId: nodeId,
          fragAtQueue: fragAtQueue,
        },
      }
    : pending?.nodeId === nodeId
      ? {
          url: null,
          pending: undefined,
        }
      : {
          url: null,
          pending: pending,
        };
}

function isPlatformLiveDocumentAndHistoryFragAtQueue(
  platformLiveDocumentAndHistoryFrag?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (options && !resolvePlatformLiveDocumentAndHistoryNodeId(options))
    return false;
  if (options !== platformLiveDocumentAndHistoryFrag.fragAtQueue) {
    let platformLiveDocumentAndHistoryNodeId: Dynamic =
      resolvePlatformLiveDocumentAndHistoryNodeId(options);
    if (
      platformLiveDocumentAndHistoryNodeId &&
      platformLiveDocumentAndHistoryNodeId.nodeId !==
        platformLiveDocumentAndHistoryFrag.nodeId
    )
      return false;
  }
  return true;
}

var PlatformLiveDocumentAndHistoryDocReady: Dynamic;

var platformLiveDocumentAndHistoryMap2: Dynamic;

var PlatformLiveDocumentAndHistoryMessage2: Dynamic;

var platformLiveDocumentAndHistorySet3: Dynamic;

var resolvePlatformLiveDocumentAndHistoryValue3: (..._extraArguments: unknown[]) => undefined;

var resolvePlatformLiveDocumentAndHistoryNodeId3: (platformLiveDocumentAndHistoryNodeId3?: Dynamic, ..._extraArguments: unknown[]) => undefined;

function resolvePlatformLiveDocumentAndHistoryValue4(
  platformLiveDocumentAndHistoryValue42?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (platformLiveDocumentAndHistoryValue42 !== undefined) {
    platformLiveDocumentAndHistorySet4.add(
      platformLiveDocumentAndHistoryValue42,
    );
  }
  platformLiveDocumentAndHistorySet4.add(options);
}

function updatePlatformLiveDocumentAndHistoryDelete(
  event?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (PlatformLiveDocumentAndHistoryMessage2 === event.pid) {
    platformLiveDocumentAndHistoryMap2.delete(event.key);
    platformLiveDocumentAndHistoryMap2.set(event.key, event);
    resolvePlatformLiveDocumentAndHistoryNodeId3(event);
    for (let updatePlatformLiveDocumentAndHistoryDeleteResult of platformLiveDocumentAndHistoryMap2.keys() as Dynamic) {
      if (platformLiveDocumentAndHistoryMap2.size <= 8) break;
      platformLiveDocumentAndHistoryMap2.delete(
        updatePlatformLiveDocumentAndHistoryDeleteResult,
      );
    }
    resolvePlatformLiveDocumentAndHistoryValue3();
  }
}

function getPlatformLiveDocumentAndHistoryValue(
  platformLiveDocumentAndHistoryValue?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return platformLiveDocumentAndHistoryMap2.get(
    platformLiveDocumentAndHistoryValue,
  );
}

function clearPlatformLiveDocumentAndHistoryDelete(
  clearPlatformLiveDocumentAndHistoryDelete4?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (
    platformLiveDocumentAndHistoryMap2.delete(
      clearPlatformLiveDocumentAndHistoryDelete4,
    )
  ) {
    resolvePlatformLiveDocumentAndHistoryValue3();
  }
}

function resolvePlatformLiveDocumentAndHistoryClear(
  platformLiveDocumentAndHistoryClear?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  platformLiveDocumentAndHistoryMap2.clear();
  platformLiveDocumentAndHistoryMap5.clear();
  platformLiveDocumentAndHistoryMap4.clear();
  platformLiveDocumentAndHistorySet4.clear();
  platformLiveDocumentAndHistoryMap3.clear();
  PlatformLiveDocumentAndHistoryMessage2 = platformLiveDocumentAndHistoryClear;
  resolvePlatformLiveDocumentAndHistoryValue3();
}

function clearPlatformLiveDocumentAndHistoryDelete2(
  clearPlatformLiveDocumentAndHistoryDelete22?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  platformLiveDocumentAndHistorySet3.add(
    clearPlatformLiveDocumentAndHistoryDelete22,
  );
  return (..._extraArguments: unknown[]): Dynamic =>
    platformLiveDocumentAndHistorySet3.delete(
      clearPlatformLiveDocumentAndHistoryDelete22,
    );
}

var resolvePlatformLiveDocumentAndHistoryUnsaved: (platformLiveDocumentAndHistoryUnsaved: HistoryVersion | undefined) => boolean;

function isPlatformLiveDocumentAndHistoryReadFrom(
  platformLiveDocumentAndHistoryRead?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    !getPlatformLiveDocumentAndHistorySome(
      platformLiveDocumentAndHistoryRead.readFrom,
      [
        platformLiveDocumentAndHistoryRead.nodeId,
        platformLiveDocumentAndHistoryRead.fileId,
      ],
    ) &&
    (options === undefined ||
      options === platformLiveDocumentAndHistoryRead.rev)
  );
}

function resolvePlatformLiveDocumentAndHistoryNode2(
  platformLiveDocumentAndHistoryNode2: NodeReader,
  options: string,
): number | undefined {
  let platformLiveDocumentAndHistoryNode22 =
    platformLiveDocumentAndHistoryNode2({
      object: `node`,
      id: options,
    });
  return typeof platformLiveDocumentAndHistoryNode22?.rev == `number` &&
    Number.isInteger(platformLiveDocumentAndHistoryNode22.rev) &&
    platformLiveDocumentAndHistoryNode22.rev >= 0
    ? platformLiveDocumentAndHistoryNode22.rev
    : undefined;
}

var platformLiveDocumentAndHistoryValue02: number;

var platformLiveDocumentAndHistoryValue03: number;

var platformLiveDocumentAndHistorySet4: Set<string>;

var platformLiveDocumentAndHistoryMap3: Dynamic;

var resolvePlatformLiveDocumentAndHistoryValue5: () => number;

function resolvePlatformLiveDocumentAndHistoryValues(
  platformLiveDocumentAndHistoryValues: unknown,
  options: number,
  context: Set<string>,
): void {
  if (typeof platformLiveDocumentAndHistoryValues == `string`) {
    if (
      platformLiveDocumentAndHistorySet4.has(
        platformLiveDocumentAndHistoryValues,
      )
    ) {
      context.add(platformLiveDocumentAndHistoryValues);
    }
    return;
  }
  if (
    !(
      options === 0 ||
      typeof platformLiveDocumentAndHistoryValues != `object` ||
      !platformLiveDocumentAndHistoryValues
    )
  )
    for (let resolvePlatformLiveDocumentAndHistoryValuesResult of Array.isArray(
      platformLiveDocumentAndHistoryValues,
    )
      ? platformLiveDocumentAndHistoryValues
      : Object.values(platformLiveDocumentAndHistoryValues))
      resolvePlatformLiveDocumentAndHistoryValues(
        resolvePlatformLiveDocumentAndHistoryValuesResult,
        options - 1,
        context,
      );
}

function updatePlatformLiveDocumentAndHistoryEnvelope(
  entry?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  platformLiveDocumentAndHistoryValue02 += 1;
  if (platformLiveDocumentAndHistorySet5.has(entry.kind)) {
    platformLiveDocumentAndHistoryValue03 =
      platformLiveDocumentAndHistoryValue02;
    return;
  }
  if (
    entry.kind !== `envelope` ||
    platformLiveDocumentAndHistorySet4.size === 0
  )
    return;
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  resolvePlatformLiveDocumentAndHistoryValues(
    entry.envelope?.diff,
    5,
    uniqueItems,
  );
  for (let updatePlatformLiveDocumentAndHistoryEnvelopeResult of uniqueItems as Dynamic)
    platformLiveDocumentAndHistoryMap3.set(
      updatePlatformLiveDocumentAndHistoryEnvelopeResult,
      platformLiveDocumentAndHistoryValue02,
    );
}

var platformLiveDocumentAndHistorySet5: Dynamic;

function resolvePlatformLiveDocumentAndHistoryValue6(
  platformLiveDocumentAndHistoryValue6?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  platformLiveDocumentAndHistoryValue02 += 1;
  platformLiveDocumentAndHistoryValue03 = platformLiveDocumentAndHistoryValue02;
  let platformLiveDocumentAndHistoryValue62: Dynamic =
    platformLiveDocumentAndHistoryValue6(
      (
        platformLiveDocumentAndHistoryValue63?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        updatePlatformLiveDocumentAndHistoryEnvelope(
          platformLiveDocumentAndHistoryValue63,
        ),
    );
  return (..._extraArguments: unknown[]): undefined => {
    platformLiveDocumentAndHistoryValue62();
    platformLiveDocumentAndHistoryValue02 += 1;
    platformLiveDocumentAndHistoryValue03 =
      platformLiveDocumentAndHistoryValue02;
  };
}

function getPlatformLiveDocumentAndHistorySome(
  platformLiveDocumentAndHistorySome?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    platformLiveDocumentAndHistoryValue03 >
      platformLiveDocumentAndHistorySome ||
    options.some(
      (rolldownRImport2?: Dynamic, ..._extraArguments: unknown[]) =>
        (platformLiveDocumentAndHistoryMap3.get(rolldownRImport2) ?? 0) >
        platformLiveDocumentAndHistorySome,
    )
  );
}

function resolvePlatformLiveDocumentAndHistoryHeld(
  platformLiveDocumentAndHistoryHeld?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let file: Dynamic = platformLiveDocumentAndHistoryHeld.held?.file;
  return file !== undefined &&
    platformLiveDocumentAndHistoryHeld.fresh &&
    !platformLiveDocumentAndHistoryHeld.refused &&
    platformLiveDocumentAndHistoryHeld.posted === file &&
    platformLiveDocumentAndHistoryHeld.painted === file
    ? file
    : null;
}

var platformLiveDocumentAndHistoryValue3000: number;

var resolvePlatformLiveDocumentAndHistoryPicture: Dynamic;

var platformLiveDocumentAndHistorySet6: Dynamic;

var platformLiveDocumentAndHistoryMap4: Dynamic;

var platformLiveDocumentAndHistoryMap5: Dynamic;

function resolvePlatformLiveDocumentAndHistoryUpdate(
  event?: Dynamic,
  event2?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return event !== null && event.key === event2.key && context
    ? `update`
    : `remount`;
}

function updatePlatformLiveDocumentAndHistoryCommentRail(
  updatePlatformLiveDocumentAndHistoryCommentRail2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (
    updatePlatformLiveDocumentAndHistoryCommentRail2 === null ||
    PlatformLiveDocumentAndHistoryMessage2 === ``
  )
    return;
  if (platformLiveDocumentAndHistorySet6.has(options.type)) {
    platformLiveDocumentAndHistoryMap4.set(options.type, options);
    return;
  }
  if (options.type !== `comment-rail` && options.type !== `rail-overhang`)
    return;
  let platformLiveDocumentAndHistoryMap5Entry: Dynamic =
    platformLiveDocumentAndHistoryMap5.get(
      updatePlatformLiveDocumentAndHistoryCommentRail2,
    );
  if (platformLiveDocumentAndHistoryMap5Entry === undefined) {
    platformLiveDocumentAndHistoryMap5.set(
      updatePlatformLiveDocumentAndHistoryCommentRail2,
      (platformLiveDocumentAndHistoryMap5Entry = new (Map as Dynamic)()),
    );
  }
  if (options.type === `comment-rail` && !options.on) {
    platformLiveDocumentAndHistoryMap5Entry.delete(`rail-overhang`);
  }
  platformLiveDocumentAndHistoryMap5Entry.set(options.type, options);
}

function getPlatformLiveDocumentAndHistoryValues(
  platformLiveDocumentAndHistoryValues?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return [
    ...platformLiveDocumentAndHistoryMap4.values(),
    ...(platformLiveDocumentAndHistoryMap5
      .get(platformLiveDocumentAndHistoryValues)
      ?.values() ?? []),
  ];
}

function resolvePlatformLiveDocumentAndHistorySetTimeout(
  platformLiveDocumentAndHistorySetTimeout?: Dynamic,
  options?: Dynamic,
  timers: Dynamic = {
    setTimeout: (
      platformLiveDocumentAndHistorySetTimeout5?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (globalThis as Dynamic).setTimeout(
        platformLiveDocumentAndHistorySetTimeout5,
        options2,
      ),
    clearTimeout: (
      platformLiveDocumentAndHistorySetTimeout5?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (globalThis as Dynamic).clearTimeout(
        platformLiveDocumentAndHistorySetTimeout5,
      ),
    now: (..._extraArguments: unknown[]) => Date.now(),
  },
  ..._extraArguments: unknown[]
): Dynamic {
  let amount: number = -1 / 0;
  let resolvePlatformLiveDocumentAndHistorySetTimeoutResult: Dynamic = null;
  let resolvePlatformLiveDocumentAndHistorySetTimeoutResult2: Dynamic = null;
  let platformLiveDocumentAndHistorySetTimeout2 = (
    platformLiveDocumentAndHistorySetTimeout5?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    amount = timers.now();
    platformLiveDocumentAndHistorySetTimeout(
      platformLiveDocumentAndHistorySetTimeout5,
    );
  };
  let platformLiveDocumentAndHistorySetTimeout3 = (
    ..._extraArguments: unknown[]
  ): undefined => {
    resolvePlatformLiveDocumentAndHistorySetTimeoutResult = null;
    if (resolvePlatformLiveDocumentAndHistorySetTimeoutResult2 === null) return;
    let {
      arg: resolvePlatformLiveDocumentAndHistorySetTimeoutResult3,
    }: Dynamic = resolvePlatformLiveDocumentAndHistorySetTimeoutResult2;
    resolvePlatformLiveDocumentAndHistorySetTimeoutResult2 = null;
    platformLiveDocumentAndHistorySetTimeout2(
      resolvePlatformLiveDocumentAndHistorySetTimeoutResult3,
    );
  };
  let platformLiveDocumentAndHistorySetTimeout4: Dynamic = (
    arg?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (options <= 0) return platformLiveDocumentAndHistorySetTimeout2(arg);
    let difference: number = timers.now() - amount;
    if (
      resolvePlatformLiveDocumentAndHistorySetTimeoutResult === null &&
      difference >= options
    )
      return platformLiveDocumentAndHistorySetTimeout2(arg);
    resolvePlatformLiveDocumentAndHistorySetTimeoutResult2 = {
      arg: arg,
    };
    if (resolvePlatformLiveDocumentAndHistorySetTimeoutResult === null) {
      resolvePlatformLiveDocumentAndHistorySetTimeoutResult = timers.setTimeout(
        platformLiveDocumentAndHistorySetTimeout3,
        Math.max(0, options - difference),
      );
    }
  };
  platformLiveDocumentAndHistorySetTimeout4.flush = (
    ..._extraArguments: unknown[]
  ): undefined => {
    if (resolvePlatformLiveDocumentAndHistorySetTimeoutResult !== null) {
      timers.clearTimeout(
        resolvePlatformLiveDocumentAndHistorySetTimeoutResult,
      );
      resolvePlatformLiveDocumentAndHistorySetTimeoutResult = null;
    }
    if (resolvePlatformLiveDocumentAndHistorySetTimeoutResult2 !== null) {
      let {
        arg: resolvePlatformLiveDocumentAndHistorySetTimeoutResult3,
      }: Dynamic = resolvePlatformLiveDocumentAndHistorySetTimeoutResult2;
      resolvePlatformLiveDocumentAndHistorySetTimeoutResult2 = null;
      platformLiveDocumentAndHistorySetTimeout2(
        resolvePlatformLiveDocumentAndHistorySetTimeoutResult3,
      );
    }
  };
  platformLiveDocumentAndHistorySetTimeout4.cancel = (
    ..._extraArguments: unknown[]
  ): undefined => {
    if (resolvePlatformLiveDocumentAndHistorySetTimeoutResult !== null) {
      timers.clearTimeout(
        resolvePlatformLiveDocumentAndHistorySetTimeoutResult,
      );
    }
    resolvePlatformLiveDocumentAndHistorySetTimeoutResult = null;
    resolvePlatformLiveDocumentAndHistorySetTimeoutResult2 = null;
  };
  return platformLiveDocumentAndHistorySetTimeout4;
}

function resolvePlatformLiveDocumentAndHistoryCancel(
  platformLiveDocumentAndHistoryCancel?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let platformLiveDocumentAndHistorySetTimeout: Dynamic = dependencies
    ? resolvePlatformLiveDocumentAndHistorySetTimeout(
        platformLiveDocumentAndHistoryCancel,
        options,
        dependencies,
      )
    : resolvePlatformLiveDocumentAndHistorySetTimeout(
        platformLiveDocumentAndHistoryCancel,
        options,
      );
  let cancel: Dynamic = (
    platformLiveDocumentAndHistoryCancel2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (context())
      return platformLiveDocumentAndHistorySetTimeout(
        platformLiveDocumentAndHistoryCancel2,
      );
    platformLiveDocumentAndHistorySetTimeout.cancel();
    platformLiveDocumentAndHistoryCancel(platformLiveDocumentAndHistoryCancel2);
  };
  cancel.flush = (..._extraArguments: unknown[]): Dynamic =>
    platformLiveDocumentAndHistorySetTimeout.flush();
  cancel.cancel = (..._extraArguments: unknown[]): Dynamic =>
    platformLiveDocumentAndHistorySetTimeout.cancel();
  return cancel;
}

var platformLiveDocumentAndHistorySet7: Dynamic;

var resolvePlatformLiveDocumentAndHistoryValue7: Dynamic;

var resolvePlatformLiveDocumentAndHistoryOther: Dynamic;

var resolvePlatformLiveDocumentAndHistoryValue8: (entry?: Dynamic, ..._extraArguments: unknown[]) => 0 | 1 | 2 | 3;

function resolvePlatformLiveDocumentAndHistoryCell(
  platformLiveDocumentAndHistoryCell?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    typeof platformLiveDocumentAndHistoryCell != `object` ||
    !platformLiveDocumentAndHistoryCell
  )
    return;
  let platformLiveDocumentAndHistoryCell2: Dynamic =
    platformLiveDocumentAndHistoryCell;
  if (platformLiveDocumentAndHistoryCell2.g === undefined) return;
  let platformLiveDocumentAndHistoryValue13: Dynamic =
    resolvePlatformLiveDocumentAndHistoryValue13(
      platformLiveDocumentAndHistoryCell2.sh,
    );
  let platformLiveDocumentAndHistoryOther: Dynamic =
    resolvePlatformLiveDocumentAndHistoryOther(
      platformLiveDocumentAndHistoryCell2.g,
    );
  let drag: Dynamic = resolvePlatformLiveDocumentAndHistoryDragMove(
    platformLiveDocumentAndHistoryOther,
    platformLiveDocumentAndHistoryCell2.drag,
  );
  return {
    g: platformLiveDocumentAndHistoryOther,
    ...(platformLiveDocumentAndHistoryCell2.cell === true
      ? {
          cell: true,
        }
      : {}),
    ...(platformLiveDocumentAndHistoryCell2.cross === true
      ? {
          cross: true,
        }
      : {}),
    ...(platformLiveDocumentAndHistoryCell2.cell !== true &&
    (platformLiveDocumentAndHistoryCell2.kind === 2 ||
      platformLiveDocumentAndHistoryCell2.kind === 3)
      ? {
          kind: platformLiveDocumentAndHistoryCell2.kind,
        }
      : {}),
    ...(drag === undefined
      ? {}
      : {
          drag: drag,
        }),
    ...(platformLiveDocumentAndHistoryValue13 === undefined
      ? {}
      : {
          sh: platformLiveDocumentAndHistoryValue13,
        }),
  };
}

var PlatformLiveDocumentAndHistoryUnsaid: string;

var PlatformLiveDocumentAndHistoryOther: string;

var platformLiveDocumentAndHistoryNeedProblemWhyKindValues: string[];

var platformLiveDocumentAndHistoryPattern: RegExp;

var PlatformLiveDocumentAndHistoryLabelNotSecret: Dynamic;

var resolvePlatformLiveDocumentAndHistoryReplace: Dynamic;

var platformLiveDocumentAndHistoryValue512: number;

var resolvePlatformLiveDocumentAndHistoryTrimEnd: Dynamic;

var platformLiveDocumentAndHistoryUnclosedBeginUnmatchedEndDuplicateIdZeroSpanValues: string[];

var PlatformLiveDocumentAndHistoryUnclosedBegin: (string | RegExp)[][];

function resolvePlatformLiveDocumentAndHistoryOther2(
  items?: unknown,
  ..._extraArguments: unknown[]
) {
  return typeof items != `string` ||
    items.length > platformLiveDocumentAndHistoryValue512
    ? PlatformLiveDocumentAndHistoryOther
    : (PlatformLiveDocumentAndHistoryUnclosedBegin.find(
        (
          [PlatformLiveDocumentAndHistoryUnclosedBegin2]: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => PlatformLiveDocumentAndHistoryUnclosedBegin2.test(items),
      )?.[1] ?? `other`);
}

var PlatformLiveDocumentAndHistoryModelBalance: string;

var platformLiveDocumentAndHistorySet8: Dynamic;

var PlatformLiveDocumentAndHistoryPointNotComment: Dynamic;

var platformLiveDocumentAndHistoryDetailWhyHintWhyHintValues: string[];

function resolvePlatformLiveDocumentAndHistoryDetail(
  platformLiveDocumentAndHistoryDetail?: Dynamic,
  detail?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let platformLiveDocumentAndHistoryDetail2: Dynamic =
    typeof platformLiveDocumentAndHistoryDetail == `object` &&
    platformLiveDocumentAndHistoryDetail &&
    !Array.isArray(platformLiveDocumentAndHistoryDetail)
      ? platformLiveDocumentAndHistoryDetail
      : {};
  let replace: Dynamic =
    typeof platformLiveDocumentAndHistoryDetail2.balance == `string` &&
    platformLiveDocumentAndHistoryDetail2.balance.length <= 24
      ? platformLiveDocumentAndHistoryDetail2.balance
          .toLowerCase()
          .replace(/-/g, `_`)
      : ``;
  let replace2: Dynamic =
    platformLiveDocumentAndHistoryUnclosedBeginUnmatchedEndDuplicateIdZeroSpanValues.includes(
      replace,
    )
      ? replace
      : PlatformLiveDocumentAndHistoryOther;
  if (
    replace2 === `other` &&
    platformLiveDocumentAndHistoryDetail2.law ===
      PlatformLiveDocumentAndHistoryModelBalance
  )
    return PlatformLiveDocumentAndHistoryModelBalance;
  for (let resolvePlatformLiveDocumentAndHistoryDetailResult of [
    {
      detail: detail,
    },
    platformLiveDocumentAndHistoryDetail2,
    ...(Array.isArray(platformLiveDocumentAndHistoryDetail2.issues)
      ? platformLiveDocumentAndHistoryDetail2.issues.slice(0, 8)
      : []),
  ] as Dynamic)
    if (
      !(
        typeof resolvePlatformLiveDocumentAndHistoryDetailResult != `object` ||
        !resolvePlatformLiveDocumentAndHistoryDetailResult
      )
    )
      for (let resolvePlatformLiveDocumentAndHistoryDetailResult2 of platformLiveDocumentAndHistoryDetailWhyHintWhyHintValues as Dynamic) {
        let resolvePlatformLiveDocumentAndHistoryDetailResultItem: Dynamic =
          resolvePlatformLiveDocumentAndHistoryDetailResult[
            resolvePlatformLiveDocumentAndHistoryDetailResult2
          ];
        if (
          replace2 === `other` &&
          typeof resolvePlatformLiveDocumentAndHistoryDetailResultItem ==
            `string`
        ) {
          replace2 = resolvePlatformLiveDocumentAndHistoryOther2(
            resolvePlatformLiveDocumentAndHistoryDetailResultItem,
          );
        }
      }
  return replace2 === `other`
    ? undefined
    : (PlatformLiveDocumentAndHistoryPointNotComment[replace2] ?? replace2);
}

function resolvePlatformLiveDocumentAndHistoryValue9(
  platformLiveDocumentAndHistoryValue92?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let platformLiveDocumentAndHistoryRelay: Dynamic =
    resolvePlatformLiveDocumentAndHistoryRelay(
      platformLiveDocumentAndHistoryValue92,
    );
  if (platformLiveDocumentAndHistoryRelay !== undefined)
    return platformLiveDocumentAndHistoryRelay;
  let platformLiveDocumentAndHistoryOther3: Dynamic =
    resolvePlatformLiveDocumentAndHistoryOther3(
      platformLiveDocumentAndHistoryValue92,
      options,
      context,
    );
  return platformLiveDocumentAndHistoryOther3 ===
    PlatformLiveDocumentAndHistoryType
    ? (resolvePlatformLiveDocumentAndHistoryUnknownAttr(
        platformLiveDocumentAndHistoryValue92,
        context,
      ) ?? platformLiveDocumentAndHistoryOther3)
    : platformLiveDocumentAndHistorySet8.has(
          platformLiveDocumentAndHistoryOther3,
        )
      ? (resolvePlatformLiveDocumentAndHistoryDetail(
          platformLiveDocumentAndHistoryValue92,
          context,
        ) ?? platformLiveDocumentAndHistoryOther3)
      : platformLiveDocumentAndHistoryOther3;
}

var PlatformLiveDocumentAndHistoryBADPAYLOAD: Dynamic;

var PlatformLiveDocumentAndHistoryValues: Dynamic;

var resolvePlatformLiveDocumentAndHistoryRelay: Dynamic;

var PlatformLiveDocumentAndHistoryType: string;

var platformLiveDocumentAndHistorySet9: Dynamic;

var PlatformLiveDocumentAndHistoryIfRev: Dynamic;

var PlatformLiveDocumentAndHistoryKind: Dynamic;

var platformLiveDocumentAndHistoryValue256: number;

var platformLiveDocumentAndHistoryPattern2: RegExp;

var resolvePlatformLiveDocumentAndHistoryBlocks: Dynamic;

var resolvePlatformLiveDocumentAndHistorySplit: Dynamic;

var resolvePlatformLiveDocumentAndHistoryTest3: Dynamic;

function resolvePlatformLiveDocumentAndHistoryPayload(
  platformLiveDocumentAndHistoryPayload?: unknown,
  items?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  let platformLiveDocumentAndHistoryPayload2: Dynamic =
    typeof platformLiveDocumentAndHistoryPayload == `object` &&
    platformLiveDocumentAndHistoryPayload &&
    !Array.isArray(platformLiveDocumentAndHistoryPayload)
      ? platformLiveDocumentAndHistoryPayload
      : {};
  let resolvePlatformLiveDocumentAndHistoryPayloadHandler: Dynamic = (
    items2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    items2 !== undefined &&
    items2.length > 0 &&
    items2.length <= 8 &&
    items2.every(
      (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        platformLiveDocumentAndHistorySet9.has(rolldownNImport2),
    )
      ? items2
      : undefined;
  if (
    Array.isArray(platformLiveDocumentAndHistoryPayload2.at) &&
    platformLiveDocumentAndHistoryPayload2.at.length <= 12
  ) {
    let platformLiveDocumentAndHistoryPayloadHandler: Dynamic =
      resolvePlatformLiveDocumentAndHistoryPayloadHandler(
        resolvePlatformLiveDocumentAndHistoryTest3(
          platformLiveDocumentAndHistoryPayload2.at[0] === `payload` &&
            platformLiveDocumentAndHistoryPayload2.at[1] === `ops` &&
            typeof platformLiveDocumentAndHistoryPayload2.at[2] == `number`
            ? platformLiveDocumentAndHistoryPayload2.at.slice(3)
            : platformLiveDocumentAndHistoryPayload2.at[0] === `payload`
              ? platformLiveDocumentAndHistoryPayload2.at.slice(1)
              : [],
        ),
      );
    if (platformLiveDocumentAndHistoryPayloadHandler)
      return platformLiveDocumentAndHistoryPayloadHandler;
  }
  let issueItem: Dynamic = Array.isArray(
    platformLiveDocumentAndHistoryPayload2.issues,
  )
    ? platformLiveDocumentAndHistoryPayload2.issues[0]
    : undefined;
  let path: Dynamic =
    typeof issueItem == `object` && issueItem ? issueItem.path : undefined;
  if (typeof path == `string`) {
    let platformLiveDocumentAndHistoryPayloadHandler: Dynamic =
      resolvePlatformLiveDocumentAndHistoryPayloadHandler(
        resolvePlatformLiveDocumentAndHistorySplit(path),
      );
    if (platformLiveDocumentAndHistoryPayloadHandler)
      return platformLiveDocumentAndHistoryPayloadHandler;
  }
  if (
    typeof items == `string` &&
    items.length <= platformLiveDocumentAndHistoryValue512
  ) {
    let match =
      /^(.{1,256}?) is wrong_type in the FINAL write grammar(?: \(one of [^()]{1,400}\))?$/.exec(
        items.trim(),
      );
    if (match)
      return resolvePlatformLiveDocumentAndHistoryPayloadHandler(
        resolvePlatformLiveDocumentAndHistorySplit(match[1]),
      );
  }
}

var resolvePlatformLiveDocumentAndHistoryUint: (items?: unknown, ..._extraArguments: unknown[]) => "a" | "b" | "h" | "i" | "m" | "n" | "o" | "r" | "s" | "u" | "x" | undefined;

var PlatformLiveDocumentAndHistoryAllowEmpty: Dynamic;

var resolvePlatformLiveDocumentAndHistoryHasOwn: Dynamic;

var resolvePlatformLiveDocumentAndHistoryProvenance: Dynamic;

function resolvePlatformLiveDocumentAndHistoryValue10(
  platformLiveDocumentAndHistoryValue10?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let platformLiveDocumentAndHistoryPayload: Dynamic =
    resolvePlatformLiveDocumentAndHistoryPayload(
      platformLiveDocumentAndHistoryValue10,
      options,
    );
  return platformLiveDocumentAndHistoryPayload
    ? resolvePlatformLiveDocumentAndHistoryProvenance(
        platformLiveDocumentAndHistoryPayload,
      )
    : undefined;
}

var platformLiveDocumentAndHistorySet10: Dynamic;

function resolvePlatformLiveDocumentAndHistoryPayload2(
  activity?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    !Array.isArray(activity.at) ||
    activity.at.length === 0 ||
    activity.at.length > 12
  )
    return;
  let atSlice: Dynamic =
    activity.at[0] === `payload` &&
    activity.at[1] === `ops` &&
    typeof activity.at[2] == `number`
      ? activity.at.slice(3)
      : activity.at[0] === `payload`
        ? activity.at.slice(1)
        : activity.at;
  let items: Dynamic = [];
  for (let resolvePlatformLiveDocumentAndHistoryPayload2Result of atSlice as Dynamic)
    if (
      !(
        typeof resolvePlatformLiveDocumentAndHistoryPayload2Result ==
          `number` ||
        (typeof resolvePlatformLiveDocumentAndHistoryPayload2Result ==
          `string` &&
          platformLiveDocumentAndHistoryPattern2.test(
            resolvePlatformLiveDocumentAndHistoryPayload2Result,
          ))
      )
    ) {
      if (
        typeof resolvePlatformLiveDocumentAndHistoryPayload2Result !=
          `string` ||
        !platformLiveDocumentAndHistorySet10.has(
          resolvePlatformLiveDocumentAndHistoryPayload2Result,
        )
      )
        return;
      items.push(resolvePlatformLiveDocumentAndHistoryPayload2Result);
      if (resolvePlatformLiveDocumentAndHistoryBlocks(items)) break;
    }
  return items;
}

function resolvePlatformLiveDocumentAndHistoryEvery(
  platformLiveDocumentAndHistoryEvery?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let platformLiveDocumentAndHistoryPayload2: Dynamic =
    resolvePlatformLiveDocumentAndHistoryPayload2(
      platformLiveDocumentAndHistoryEvery,
    );
  if (
    !(
      !platformLiveDocumentAndHistoryPayload2 ||
      platformLiveDocumentAndHistoryPayload2.length === 0 ||
      platformLiveDocumentAndHistoryPayload2.length > 8
    )
  )
    return (
      (platformLiveDocumentAndHistoryPayload2.every(
        (
          platformLiveDocumentAndHistoryPayload22?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          platformLiveDocumentAndHistorySet9.has(
            platformLiveDocumentAndHistoryPayload22,
          ),
      )
        ? resolvePlatformLiveDocumentAndHistoryProvenance(
            platformLiveDocumentAndHistoryPayload2,
          )
        : undefined) ??
      (resolvePlatformLiveDocumentAndHistoryBlocks(
        platformLiveDocumentAndHistoryPayload2,
      )
        ? undefined
        : resolvePlatformLiveDocumentAndHistoryHasOwn(
            platformLiveDocumentAndHistoryPayload2[
              platformLiveDocumentAndHistoryPayload2.length - 1
            ],
          ))
    );
}

function resolvePlatformLiveDocumentAndHistoryUnknownAttr(
  platformLiveDocumentAndHistoryUnknown?: unknown,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): string | undefined {
  let platformLiveDocumentAndHistoryUnknown2: Dynamic =
    typeof platformLiveDocumentAndHistoryUnknown == `object` &&
    platformLiveDocumentAndHistoryUnknown &&
    !Array.isArray(platformLiveDocumentAndHistoryUnknown)
      ? platformLiveDocumentAndHistoryUnknown
      : {};
  if (platformLiveDocumentAndHistoryUnknown2.was === `unknown_attr`) return;
  let platformLiveDocumentAndHistoryValue10: Dynamic =
    resolvePlatformLiveDocumentAndHistoryValue10(
      platformLiveDocumentAndHistoryUnknown,
      options,
    ) ??
    resolvePlatformLiveDocumentAndHistoryEvery(
      platformLiveDocumentAndHistoryUnknown2,
    );
  if (platformLiveDocumentAndHistoryValue10 === undefined) return;
  let platformLiveDocumentAndHistoryUint =
    resolvePlatformLiveDocumentAndHistoryUint(
      platformLiveDocumentAndHistoryUnknown2.expected,
    );
  let label =
    platformLiveDocumentAndHistoryUint === undefined
      ? `tn_${platformLiveDocumentAndHistoryValue10}`
      : `t_${platformLiveDocumentAndHistoryValue10}_${platformLiveDocumentAndHistoryUint}`;
  return label.length <= 15 &&
    platformLiveDocumentAndHistoryPattern5.test(label)
    ? label
    : undefined;
}

function resolvePlatformLiveDocumentAndHistoryOther3(
  platformLiveDocumentAndHistoryOther3?: unknown,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let enabled = false;
  if (
    typeof platformLiveDocumentAndHistoryOther3 == `object` &&
    platformLiveDocumentAndHistoryOther3 &&
    !Array.isArray(platformLiveDocumentAndHistoryOther3)
  ) {
    let platformLiveDocumentAndHistoryOther32: Dynamic =
      platformLiveDocumentAndHistoryOther3;
    for (let resolvePlatformLiveDocumentAndHistoryOther3Result of platformLiveDocumentAndHistoryNeedProblemWhyKindValues as Dynamic) {
      let platformLiveDocumentAndHistoryOther3Item: Dynamic =
        platformLiveDocumentAndHistoryOther32[
          resolvePlatformLiveDocumentAndHistoryOther3Result
        ];
      if (typeof platformLiveDocumentAndHistoryOther3Item != `string`) continue;
      enabled = true;
      let platformLiveDocumentAndHistoryReplace: Dynamic =
        resolvePlatformLiveDocumentAndHistoryReplace(
          platformLiveDocumentAndHistoryOther3Item,
          options,
        );
      if (platformLiveDocumentAndHistoryReplace !== undefined)
        return platformLiveDocumentAndHistoryReplace;
    }
  }
  let platformLiveDocumentAndHistoryTrimEnd: Dynamic =
    resolvePlatformLiveDocumentAndHistoryTrimEnd(context);
  return (
    (platformLiveDocumentAndHistoryTrimEnd === undefined
      ? undefined
      : resolvePlatformLiveDocumentAndHistoryReplace(
          platformLiveDocumentAndHistoryTrimEnd,
          options,
        )) ?? (enabled ? `other` : `unsaid`)
  );
}

var PlatformLiveDocumentAndHistoryAnchorsAffected: string;

var PlatformLiveDocumentAndHistoryInsert: Dynamic;

var platformLiveDocumentAndHistoryValue9: number;

var PlatformLiveDocumentAndHistoryOthu: string;

var platformLiveDocumentAndHistoryPattern3: RegExp;

var resolvePlatformLiveDocumentAndHistoryValue11: Dynamic;

var resolvePlatformLiveDocumentAndHistoryHasOwn2: Dynamic;

function resolvePlatformLiveDocumentAndHistoryPayload3(
  platformLiveDocumentAndHistoryPayload3?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return resolvePlatformLiveDocumentAndHistoryValue11(
    (..._extraArguments: unknown[]): Dynamic => {
      let ops: Dynamic =
        resolvePlatformLiveDocumentAndHistoryValue15(
          platformLiveDocumentAndHistoryPayload3,
        ) &&
        resolvePlatformLiveDocumentAndHistoryValue15(
          platformLiveDocumentAndHistoryPayload3.payload,
        )
          ? platformLiveDocumentAndHistoryPayload3.payload.ops
          : undefined;
      return Array.isArray(ops)
        ? Array.from<Dynamic, Dynamic>(
            {
              length: Math.min(ops.length, 10),
            },
            (
              platformLiveDocumentAndHistoryPayload32?: unknown,
              options?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              resolvePlatformLiveDocumentAndHistoryHasOwn2(ops[options]),
          )
        : undefined;
    },
    undefined,
  );
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializePlatformLiveDocumentAndHistory1Step1(): void {
  (PlatformLiveDocumentAndHistoryAddOptions = ListBehaviorExtension.extend({
      addOptions(this: Dynamic, ..._extraArguments: unknown[]): Dynamic {
        return {
          ...this.parent?.(),
          sink: resolvePlatformLiveDocumentAndHistorySinkListItemSameKind,
        };
      },
      addKeyboardShortcuts(
        this: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic {
        let CtrlD: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
          let { state: editor, view: editor2 }: Dynamic = this.editor;
          let {
            $from: selection,
            $to: selection2,
            empty: selection3,
          }: Dynamic = editor.selection;
          if (!selection3) {
            let enabled = false;
            for (
              let depth: Dynamic = selection.depth;
              depth > 0 && !enabled;
              depth--
            )
              enabled = selection.node(depth).type.name === `listItem`;
            return editor.selection instanceof (TextSelection as Dynamic) &&
              enabled &&
              !selection.sameParent(selection2) &&
              !isEditorTableControlsSize(
                editor.doc,
                selection.pos,
                selection2.pos,
              )
              ? this.editor.commands.deleteSelection()
              : false;
          }
          if (
            !selection.parent.isTextblock ||
            selection.parentOffset < selection.parent.content.size
          )
            return false;
          let {
            $cut: platformLiveDocumentAndHistoryCut,
            leavesList: platformLiveDocumentAndHistoryCut2,
            walled: platformLiveDocumentAndHistoryCut3,
          }: Dynamic = resolvePlatformLiveDocumentAndHistoryCut(selection);
          if (!platformLiveDocumentAndHistoryCut)
            return (
              platformLiveDocumentAndHistoryCut3 &&
              platformLiveDocumentAndHistoryCut2
            );
          let nodeAfter: Dynamic = platformLiveDocumentAndHistoryCut.nodeAfter;
          if (platformLiveDocumentAndHistoryCut2) {
            let isPlatformLiveDocumentAndHistoryListItem2: Dynamic =
              isPlatformLiveDocumentAndHistoryListItem(
                editor,
                selection.pos,
                platformLiveDocumentAndHistoryCut,
              );
            return isPlatformLiveDocumentAndHistoryListItem2
              ? (editor2.dispatch(isPlatformLiveDocumentAndHistoryListItem2),
                true)
              : !nodeAfter.isAtom;
          }
          if (selection.parent.content.size === 0) return false;
          let tableRole: Dynamic = nodeAfter.type.spec?.tableRole;
          return nodeAfter.type.name !== `list` && tableRole !== `table`
            ? false
            : this.editor.commands.joinForward() || true;
        };
        let record2: Dynamic =
          isiOS() || isMacOS()
            ? {
                "Ctrl-d": CtrlD,
                "Alt-Delete": CtrlD,
                "Alt-d": CtrlD,
                "Ctrl-Alt-Backspace": CtrlD,
              }
            : {};
        return {
          ...this.parent?.(),
          Delete: CtrlD,
          "Mod-Delete": CtrlD,
          ...record2,
        };
      },
    }));
  (platformLiveDocumentAndHistoryMap = new (Map as Dynamic)());
  (platformLiveDocumentAndHistoryValue0 = 0);
  (PlatformLiveDocumentAndHistoryEntries = create(
    (
      platformLiveDocumentAndHistoryEntries?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      entries: {},
      load: async (
        platformLiveDocumentAndHistoryEntries2?: Dynamic,
        options2?: Dynamic,
        context?: Dynamic,
        ..._extraArguments: unknown[]
      ): Promise<undefined> => {
        let platformLiveDocumentAndHistoryEntriesResult: number =
          ++platformLiveDocumentAndHistoryValue0;
        platformLiveDocumentAndHistoryMap.set(
          platformLiveDocumentAndHistoryEntries2,
          platformLiveDocumentAndHistoryEntriesResult,
        );
        let platformLiveDocumentAndHistoryEntriesHandler = (
          ..._extraArguments: unknown[]
        ) =>
          platformLiveDocumentAndHistoryMap.get(
            platformLiveDocumentAndHistoryEntries2,
          ) === platformLiveDocumentAndHistoryEntriesResult;
        let platformLiveDocumentAndHistoryEntries3: Dynamic = (
          platformLiveDocumentAndHistoryEntries4?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          platformLiveDocumentAndHistoryEntries({
            entries: {
              ...options().entries,
              [platformLiveDocumentAndHistoryEntries2]: {
                ...(options().entries[platformLiveDocumentAndHistoryEntries2] ?? {
                  run: null,
                  fn: null,
                  err: null,
                }),
                ...platformLiveDocumentAndHistoryEntries4,
              },
            },
          });
        platformLiveDocumentAndHistoryEntries3({
          run: null,
          fn: null,
          err: null,
        });
        let run: Dynamic = await api.runs
          .get(context)
          .catch((..._extraArguments: unknown[]) => null);
        if (!platformLiveDocumentAndHistoryEntriesHandler()) return;
        if (!run || run.source?.id !== options2) {
          platformLiveDocumentAndHistoryEntries3({
            err: `not-found`,
          });
          return;
        }
        platformLiveDocumentAndHistoryEntries3({
          run: run,
        });
        let result: Dynamic = await api.functions
          .list(options2)
          .then(
            (result3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              filterDataContentAndReferencesFilter(result3, run.runner.name),
          )
          .catch((..._extraArguments: unknown[]): Dynamic => run.runner.name);
        if (!platformLiveDocumentAndHistoryEntriesHandler()) return;
        if (result === undefined) {
          platformLiveDocumentAndHistoryEntries3({
            fn: null,
          });
          return;
        }
        let result2: Dynamic = await api.functions
          .get(options2, result)
          .catch((..._extraArguments: unknown[]) => null);
        if (platformLiveDocumentAndHistoryEntriesHandler()) {
          platformLiveDocumentAndHistoryEntries3({
            fn: result2,
          });
        }
      },
      release: (
        platformLiveDocumentAndHistoryEntries2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        platformLiveDocumentAndHistoryMap.delete(
          platformLiveDocumentAndHistoryEntries2,
        );
        if (platformLiveDocumentAndHistoryEntries2 in options().entries) {
          let {
            [platformLiveDocumentAndHistoryEntries2]: entries,
            ...entries2
          }: Dynamic = options().entries;
          platformLiveDocumentAndHistoryEntries({
            entries: entries2,
          });
        }
      },
    }),
  ));
  (resolvePlatformLiveDocumentAndHistoryValue = (
    platformLiveDocumentAndHistoryValue: unknown,
  ): platformLiveDocumentAndHistoryValue is UnknownRecord =>
    typeof platformLiveDocumentAndHistoryValue == `object` &&
    !!platformLiveDocumentAndHistoryValue &&
    !Array.isArray(platformLiveDocumentAndHistoryValue));
  (platformLiveDocumentAndHistoryValue5000 = 5e3);
  (platformLiveDocumentAndHistorySet = new Set([
    `rate-limit`,
    `rate_limited`,
    `unavailable`,
    `busy`,
    `block_busy`,
    `warming`,
    `draining`,
    `storage_lagging`,
    `room_unavailable`,
    `ledger_unavailable`,
    `engine-unavailable`,
    `engine_unavailable`,
  ]));
  (resolvePlatformLiveDocumentAndHistoryValue2 = (
    platformLiveDocumentAndHistoryValue2: unknown,
  ): boolean =>
    platformLiveDocumentAndHistoryValue2 !== undefined &&
    platformLiveDocumentAndHistorySet.has(platformLiveDocumentAndHistoryValue2));
  (resolvePlatformLiveDocumentAndHistoryReason = (
    platformLiveDocumentAndHistoryReason?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    platformLiveDocumentAndHistoryReason instanceof
      (DataOperationControlRoomReadDenied as Dynamic) &&
    resolvePlatformLiveDocumentAndHistoryValue2(
      platformLiveDocumentAndHistoryReason.reason,
    ));
  (PlatformLiveDocumentAndHistorySession = {
    session: (
      platformLiveDocumentAndHistorySession?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      api.lfile.widgetSession(
        platformLiveDocumentAndHistorySession,
        options,
        context,
      ),
    create: (
      platformLiveDocumentAndHistorySession?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      api.lfile.widgetCreate(platformLiveDocumentAndHistorySession, options),
    log: (
      platformLiveDocumentAndHistorySession?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      dependencies?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      api.lfile.widgetLog(
        platformLiveDocumentAndHistorySession,
        options,
        context,
        dependencies,
      ),
    invoke: (
      platformLiveDocumentAndHistorySession?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      dependencies?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      api.lfile.widgetInvoke(
        platformLiveDocumentAndHistorySession,
        options,
        context,
        dependencies,
      ),
    ldocRun: async (
      platformLiveDocumentAndHistorySession?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      dependencies?: Dynamic,
      ..._extraArguments: unknown[]
    ) => {
      let match = /^(?:fn|routine):([a-z0-9][a-z0-9_-]{0,63})$/.exec(options);
      if (match === null)
        throw Error(
          `ldoc run: unsupported ref (only routine:<name> / fn:<name> dispatches a routine run)`,
        );
      let dependencies2: Dynamic = await dependencies(match[1]);
      if (dependencies2 === undefined)
        throw Error(
          `ldoc run: routine id unresolved — unknown routine, or this project's routines are not fold-served yet (the serve flip); no name ever rides the id field`,
        );
      let kind = resolvePlatformLiveDocumentAndHistoryToolCall(
        dependencies2.type,
      );
      if (kind === undefined)
        throw Error(
          `ldoc run: the routine's mechanism is unresolved (no served config type) — it may predate the runnable registration`,
        );
      let filterPlatformLiveDocumentAndHistoryStatus2: Dynamic =
        filterPlatformLiveDocumentAndHistoryStatus(
          dependencies2,
          context ?? undefined,
        );
      let platformLiveDocumentAndHistorySession2: Dynamic =
        await platformLiveDocumentAndHistorySession({
          verb: `create`,
          object: `run`,
          payload: {
            engine: `json`,
            value: {
              kind: kind,
              routine: dependencies2.id,
              ...(filterPlatformLiveDocumentAndHistoryStatus2.params === undefined
                ? {}
                : {
                    params: filterPlatformLiveDocumentAndHistoryStatus2.params,
                  }),
              status: filterPlatformLiveDocumentAndHistoryStatus2.status,
            },
          },
        });
      if (platformLiveDocumentAndHistorySession2.verdict === `deny`)
        throw Error(
          `ldoc run: denied — ${platformLiveDocumentAndHistorySession2.reason}`,
        );
      if (platformLiveDocumentAndHistorySession2.minted === undefined)
        throw Error(`ldoc run: allow without minted id — malformed door ack`);
      return {
        runRef: `run:${platformLiveDocumentAndHistorySession2.minted}`,
      };
    },
  });
  (PlatformLiveDocumentAndHistoryWidgetBundle = {
    widgetBundle: (
      platformLiveDocumentAndHistoryWidgetBundle?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      api.lfile.widgetBundle(
        platformLiveDocumentAndHistoryWidgetBundle,
        options,
        context,
      ),
    widgetRoutineRead: (
      platformLiveDocumentAndHistoryWidgetBundle?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      api.lfile.widgetRoutineRead(
        platformLiveDocumentAndHistoryWidgetBundle,
        options,
      ),
    widgetRoutineResult: (
      platformLiveDocumentAndHistoryWidgetBundle?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      api.lfile.widgetRoutineResult(
        platformLiveDocumentAndHistoryWidgetBundle,
        options,
      ),
    widgetRunResult: (
      platformLiveDocumentAndHistoryWidgetBundle?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      api.lfile.widgetRunResult(
        platformLiveDocumentAndHistoryWidgetBundle,
        options,
      ),
    widgetRoutineStamp: (
      platformLiveDocumentAndHistoryWidgetBundle?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      api.lfile.widgetRoutineStamp(
        platformLiveDocumentAndHistoryWidgetBundle,
        options,
      ),
    widgetFileRead: (
      platformLiveDocumentAndHistoryWidgetBundle?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      api.lfile.widgetFileRead(
        platformLiveDocumentAndHistoryWidgetBundle,
        options,
      ),
    runsGet: (
      platformLiveDocumentAndHistoryWidgetBundle?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => api.runs.get(platformLiveDocumentAndHistoryWidgetBundle),
    runsFile: (
      platformLiveDocumentAndHistoryWidgetBundle?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      api.runs.file(platformLiveDocumentAndHistoryWidgetBundle, options),
    functionsGet: (
      platformLiveDocumentAndHistoryWidgetBundle?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      api.functions.get(platformLiveDocumentAndHistoryWidgetBundle, options),
    functionsList: (
      platformLiveDocumentAndHistoryWidgetBundle?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => api.functions.list(platformLiveDocumentAndHistoryWidgetBundle),
  });
  (platformLiveDocumentAndHistorySet2 = new (Set as Dynamic)([
    `bundle`,
    `unpublished`,
    `not-a-widget`,
    `compile-failed`,
    `compile-busy`,
  ]));
  (PlatformLiveDocumentAndHistoryState = loadPlatformLiveDocumentAndHistoryRun(24));
  (resolvePlatformLiveDocumentAndHistoryVerb = (
    platformLiveDocumentAndHistoryVerb?: Dynamic,
    $lid?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    verb: `create`,
    object: `node`,
    engine: `widget`,
    payload: {
      engine: `widget`,
      parent: {
        object: `file`,
        id: platformLiveDocumentAndHistoryVerb,
      },
    },
    ...($lid === undefined
      ? {}
      : {
          $lid: $lid,
        }),
  }));
  (resolvePlatformLiveDocumentAndHistoryKind = (
    node?: Dynamic,
    prompt?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    kind: `prompt`,
    node: node,
    prompt: prompt,
    status: `pending`,
  }));
  (resolvePlatformLiveDocumentAndHistoryUnavailable = (
    platformLiveDocumentAndHistoryUnavailable?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    platformLiveDocumentAndHistoryUnavailable.reason === `unavailable`
      ? resolvePlatformSessionAndSourcesUnavailable(
          platformLiveDocumentAndHistoryUnavailable.reason,
          platformLiveDocumentAndHistoryUnavailable.why,
        )
      : platformLiveDocumentAndHistoryUnavailable.detail
        ? platformLiveDocumentAndHistoryUnavailable.reason +
          `: ` +
          platformLiveDocumentAndHistoryUnavailable.detail
        : platformLiveDocumentAndHistoryUnavailable.reason);
  (PlatformLiveDocumentAndHistoryCreate = {
    create: async (
      platformLiveDocumentAndHistoryCreate?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> => {
      let platformLiveDocumentAndHistoryCreate2: Dynamic =
        await platformLiveDocumentAndHistoryCreate(
          resolvePlatformLiveDocumentAndHistoryVerb(options),
        );
      if (platformLiveDocumentAndHistoryCreate2.verdict !== `allow`)
        throw Error(
          resolvePlatformLiveDocumentAndHistoryUnavailable(
            platformLiveDocumentAndHistoryCreate2,
          ) || `The widget couldn't be created.`,
        );
      if (!platformLiveDocumentAndHistoryCreate2.minted)
        throw Error(
          `The widget couldn't be created — the document didn't return its id.`,
        );
      return {
        nodeId: platformLiveDocumentAndHistoryCreate2.minted,
      };
    },
    createWithBuild: async (
      platformLiveDocumentAndHistoryCreate?: Dynamic,
      options?: Dynamic,
      platformLiveDocumentAndHistoryCreate2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> => {
      let batch: Dynamic = await platformLiveDocumentAndHistoryCreate.batch([
        resolvePlatformLiveDocumentAndHistoryVerb(options, `w`),
        {
          verb: `create`,
          object: `run`,
          payload: {
            engine: `json`,
            value: resolvePlatformLiveDocumentAndHistoryKind(
              PlatformApiAndAuthStyles3 + `w`,
              platformLiveDocumentAndHistoryCreate2,
            ),
          },
        },
      ]);
      if (batch.verdict !== `allow`) {
        let platformLiveDocumentAndHistoryUnavailable: Dynamic =
          resolvePlatformLiveDocumentAndHistoryUnavailable(batch);
        throw Error(
          batch.index === 1
            ? `The widget couldn't be created — its build couldn't be queued` +
                resolvePlatformLiveDocumentAndHistoryTest(
                  platformLiveDocumentAndHistoryUnavailable,
                )
            : platformLiveDocumentAndHistoryUnavailable ||
                `The widget couldn't be created.`,
        );
      }
      let nodeId: Dynamic =
        batch.results[0]?.verdict === `allow`
          ? batch.results[0].minted
          : undefined;
      let runId: Dynamic =
        batch.results[1]?.verdict === `allow`
          ? batch.results[1].minted
          : undefined;
      if (nodeId === undefined || runId === undefined)
        throw Error(
          `The widget couldn't be created — the document didn't return its id.`,
        );
      return {
        nodeId: nodeId,
        runId: runId,
      };
    },
    buildRun: async (
      platformLiveDocumentAndHistoryCreate?: Dynamic,
      options?: Dynamic,
      platformLiveDocumentAndHistoryCreate2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> => {
      let batch: Dynamic = await platformLiveDocumentAndHistoryCreate({
        verb: `create`,
        object: `run`,
        payload: {
          engine: `json`,
          value: resolvePlatformLiveDocumentAndHistoryKind(
            options,
            platformLiveDocumentAndHistoryCreate2,
          ),
        },
      });
      return batch.verdict === `allow`
        ? batch.minted === undefined
          ? {
              ok: false,
              reason: `the document didn't return the run's id`,
            }
          : {
              ok: true,
              runId: batch.minted,
            }
        : {
            ok: false,
            reason: resolvePlatformLiveDocumentAndHistoryUnavailable(batch),
          };
    },
    prompt: async (
      platformLiveDocumentAndHistoryCreate?: Dynamic,
      options?: Dynamic,
      platformLiveDocumentAndHistoryCreate2?: Dynamic,
      batch?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> => {
      let nodeId: Dynamic = await platformLiveDocumentAndHistoryCreate({
        verb: `create`,
        object: `utterance`,
        engine: `json`,
        payload: {
          engine: `json`,
          value: {
            body: platformLiveDocumentAndHistoryCreate2,
            parent: {
              object: `node`,
              id: options,
            },
            ...(batch === undefined
              ? {}
              : {
                  quote: {
                    ref: {
                      object: `run`,
                      id: batch,
                    },
                  },
                }),
          },
        },
      });
      return nodeId.verdict === `allow`
        ? {
            ok: true,
          }
        : {
            ok: false,
            reason: resolvePlatformLiveDocumentAndHistoryUnavailable(nodeId),
          };
    },
    comment: async (
      platformLiveDocumentAndHistoryCreate?: Dynamic,
      options?: Dynamic,
      platformLiveDocumentAndHistoryCreate2?: Dynamic,
      batch?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> => {
      let nodeId: Dynamic = await platformLiveDocumentAndHistoryCreate({
        verb: `create`,
        object: `utterance`,
        engine: `json`,
        payload: {
          engine: `json`,
          value: {
            body: platformLiveDocumentAndHistoryCreate2,
            parent: {
              object: `node`,
              id: options,
              ...(batch === undefined
                ? {}
                : {
                    anchor: {
                      kind: `anchor`,
                      anchor: batch,
                    },
                  }),
            },
          },
        },
      });
      return nodeId.verdict === `allow`
        ? {
            ok: true,
            id: nodeId.minted ?? ``,
          }
        : {
            ok: false,
            reason:
              resolvePlatformLiveDocumentAndHistoryUnavailable(nodeId) ||
              `denied`,
          };
    },
    session: async (
      platformLiveDocumentAndHistoryCreate?: Dynamic,
      options?: Dynamic,
      platformLiveDocumentAndHistoryCreate2?: Dynamic,
      batch?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> => {
      let nodeId: Dynamic = await platformLiveDocumentAndHistoryCreate({
        verb: `update`,
        engine: `widget`,
        ref: {
          object: `node`,
          id: options,
        },
        payload: {
          engine: `widget`,
          kind: platformLiveDocumentAndHistoryCreate2,
          ...(platformLiveDocumentAndHistoryCreate2 === `draft`
            ? {
                state: `draft`,
              }
            : {}),
          ...batch,
        },
      });
      return nodeId.verdict === `allow`
        ? {
            ok: true,
          }
        : {
            ok: false,
            reason: resolvePlatformLiveDocumentAndHistoryUnavailable(nodeId),
          };
    },
  });
  (PlatformLiveDocumentAndHistoryWidgetNoDraft = Object.freeze({
    "widget-no-draft": `no-draft`,
  }));
  (PlatformLiveDocumentAndHistoryAccess = Object.freeze({
    access: `You don't have permission to edit this document — ask its owner for write access.`,
    shape: `The document refused this edit's shape — the content may be too large or malformed.`,
    absent: `This block no longer exists in the document — it may have been deleted.`,
  }));
  (resolvePlatformLiveDocumentAndHistoryError = (
    platformLiveDocumentAndHistoryError?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let platformLiveDocumentAndHistoryError2: Dynamic =
      platformLiveDocumentAndHistoryError || `The document refused this edit.`;
    let matchItem: Dynamic =
      /^([a-z][a-z0-9-]*):/.exec(platformLiveDocumentAndHistoryError2)?.[1] ??
      (/\s/.test(platformLiveDocumentAndHistoryError2)
        ? `denied`
        : platformLiveDocumentAndHistoryError2);
    let message: Dynamic = /\s/.test(platformLiveDocumentAndHistoryError2)
      ? platformLiveDocumentAndHistoryError2
      : (PlatformLiveDocumentAndHistoryAccess[
          platformLiveDocumentAndHistoryError2
        ] ??
        `The document refused this edit (${platformLiveDocumentAndHistoryError2}).`);
    return {
      error: true,
      rule: PlatformLiveDocumentAndHistoryWidgetNoDraft[matchItem] ?? matchItem,
      message: message,
    };
  });
  (PlatformLiveDocumentAndHistoryMessage = `The widget was created, but its chip couldn't be placed — find it in the widget panel.`);
  (resolvePlatformLiveDocumentAndHistoryTest = (
    platformLiveDocumentAndHistoryTest?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    platformLiveDocumentAndHistoryTest &&
    /\s/.test(platformLiveDocumentAndHistoryTest)
      ? `: ` + platformLiveDocumentAndHistoryTest
      : ` — the document refused it` +
        (platformLiveDocumentAndHistoryTest
          ? ` (` + platformLiveDocumentAndHistoryTest + `)`
          : ``) +
        `.`);
  (PlatformLiveDocumentAndHistoryVs = `vs:`);
  (resolvePlatformLiveDocumentAndHistoryTest2 = (
    items?: Dynamic,
    items2?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof items2 == `string` &&
    items2.length <= 256 &&
    items.length <= 64 &&
    items !== `__proto__` &&
    editorAnchorsAndMentionsPattern3.test(items) &&
    (items2 === `` || editorAnchorsAndMentionsPattern3.test(items2)));
  (PlatformLiveDocumentAndHistoryDocReady = create(
    (
      platformLiveDocumentAndHistoryDocReady?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let index = 0;
      return {
        docReady: null,
        request: null,
        registerDoc: (fileId?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          platformLiveDocumentAndHistoryDocReady({
            docReady: {
              fileId: fileId,
            },
          }),
        unregisterDoc: (
          platformLiveDocumentAndHistoryDocReady2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          platformLiveDocumentAndHistoryDocReady(
            (
              platformLiveDocumentAndHistoryDocReady3?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              platformLiveDocumentAndHistoryDocReady3.docReady?.fileId ===
              platformLiveDocumentAndHistoryDocReady2
                ? {
                    docReady: null,
                  }
                : platformLiveDocumentAndHistoryDocReady3,
          ),
        requestInsert: (
          fileId?: Dynamic,
          prompt?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          platformLiveDocumentAndHistoryDocReady(
            (..._extraArguments: unknown[]): Dynamic => ({
              request: {
                fileId: fileId,
                seq: ++index,
                ...(prompt === undefined
                  ? {}
                  : {
                      prompt: prompt,
                    }),
              },
            }),
          ),
        consumed: (
          platformLiveDocumentAndHistoryDocReady2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          platformLiveDocumentAndHistoryDocReady(
            (
              platformLiveDocumentAndHistoryDocReady3?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              platformLiveDocumentAndHistoryDocReady3.request?.seq ===
              platformLiveDocumentAndHistoryDocReady2
                ? {
                    request: null,
                  }
                : platformLiveDocumentAndHistoryDocReady3,
          ),
      };
    },
  ));
  (platformLiveDocumentAndHistoryMap2 = new (Map as Dynamic)());
  (PlatformLiveDocumentAndHistoryMessage2 = ``);
  (platformLiveDocumentAndHistorySet3 = new (Set as Dynamic)());
  (resolvePlatformLiveDocumentAndHistoryValue3 = (
    ..._extraArguments: unknown[]
  ): undefined => {
    for (let resolvePlatformLiveDocumentAndHistoryValue3Result of platformLiveDocumentAndHistorySet3 as Dynamic)
      resolvePlatformLiveDocumentAndHistoryValue3Result();
  });
  (resolvePlatformLiveDocumentAndHistoryNodeId3 = (
    platformLiveDocumentAndHistoryNodeId3?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    platformLiveDocumentAndHistorySet4.add(
      platformLiveDocumentAndHistoryNodeId3.nodeId,
    );
    platformLiveDocumentAndHistorySet4.add(
      platformLiveDocumentAndHistoryNodeId3.fileId,
    );
  });
  (resolvePlatformLiveDocumentAndHistoryUnsaved = (
    platformLiveDocumentAndHistoryUnsaved: HistoryVersion | undefined,
  ): boolean =>
    platformLiveDocumentAndHistoryUnsaved !== undefined &&
    !platformLiveDocumentAndHistoryUnsaved.unsaved);
  (platformLiveDocumentAndHistoryValue02 = 0);
  (platformLiveDocumentAndHistoryValue03 = 0);
  (platformLiveDocumentAndHistorySet4 = new Set());
  (platformLiveDocumentAndHistoryMap3 = new (Map as Dynamic)());
  (resolvePlatformLiveDocumentAndHistoryValue5 = (): number =>
    platformLiveDocumentAndHistoryValue02);
  (platformLiveDocumentAndHistorySet5 = new (Set as Dynamic)([
    `live`,
    `recovered`,
    `down`,
    `moving`,
    `revoked`,
    `access-changed`,
  ]));
  (platformLiveDocumentAndHistoryValue3000 = 3e3);
  (resolvePlatformLiveDocumentAndHistoryPicture = (
    platformLiveDocumentAndHistoryPicture?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    platformLiveDocumentAndHistoryPicture.picture !== null &&
    !platformLiveDocumentAndHistoryPicture.liveShownOnce &&
    !platformLiveDocumentAndHistoryPicture.failed &&
    !platformLiveDocumentAndHistoryPicture.ceilingOver);
  (platformLiveDocumentAndHistorySet6 = new (Set as Dynamic)([
    `edge-min`,
    `bottom-inset`,
    `zoom`,
  ]));
  (platformLiveDocumentAndHistoryMap4 = new (Map as Dynamic)());
  (platformLiveDocumentAndHistoryMap5 = new (Map as Dynamic)());
  (platformLiveDocumentAndHistorySet7 = new (Set as Dynamic)(
    `k_enter.k_bksp.k_del.k_tab.k_wdel.type_over.type.replace.ime.dom_read.paste.cut.drag_move.drag_copy.drop_ext.drop.undo.redo.table_ui.list_tog.tick.slash.ask_write.k_fmt.selbar.menu.appended.auto_lift.relay.repair.replay.restage.other`.split(
      `.`,
    ),
  ));
  (resolvePlatformLiveDocumentAndHistoryValue7 = (
    platformLiveDocumentAndHistoryValue7?: unknown,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    typeof platformLiveDocumentAndHistoryValue7 == `string` &&
    platformLiveDocumentAndHistorySet7.has(platformLiveDocumentAndHistoryValue7));
  (resolvePlatformLiveDocumentAndHistoryOther = (
    platformLiveDocumentAndHistoryOther?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolvePlatformLiveDocumentAndHistoryValue7(
      platformLiveDocumentAndHistoryOther,
    )
      ? platformLiveDocumentAndHistoryOther
      : `other`);
  (resolvePlatformLiveDocumentAndHistoryValue8 = (
    entry?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    entry?.cell === true ? 1 : entry?.kind === 2 ? 2 : entry?.kind === 3 ? 3 : 0);
  (PlatformLiveDocumentAndHistoryUnsaid = `unsaid`);
  (PlatformLiveDocumentAndHistoryOther = `other`);
  (platformLiveDocumentAndHistoryNeedProblemWhyKindValues = [
    `need`,
    `problem`,
    `why`,
    `kind`,
    `dim`,
  ]);
  (platformLiveDocumentAndHistoryPattern = /^[a-z0-9_]{1,24}$/);
  (PlatformLiveDocumentAndHistoryLabelNotSecret = {
    label_not_secret: `label_not_sec`,
    binding_unverified: `binding_unver`,
    not_thread_starter: `not_starter`,
    delete_across_blocks: `del_across`,
    preseat_readonly: `preseat_ro`,
    owner_unreachable: `owner_unreach`,
    lead_delete_takes_item: `lead_del_item`,
    start_outside_ordered: `start_not_ord`,
    inline_outside_leaf: `inline_not_leaf`,
    two_arms_one_leaf: `two_arms_leaf`,
    heading_not_root: `head_not_root`,
    restore_not_alone: `restore_alone`,
    errors_truncated: `errs_truncated`,
    pattern_too_complex: `pattern_complex`,
    unsupported_kind: `unsupp_kind`,
    artifact_store_auth: `artifact_auth`,
    count_unknowable: `cnt_unknowable`,
    prose_orphan_node: `orphan_node`,
  });
  (resolvePlatformLiveDocumentAndHistoryReplace = (
    items?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (items.length > 24) return;
    let replace: Dynamic = items.toLowerCase().replace(/-/g, `_`);
    return platformLiveDocumentAndHistoryPattern.test(replace) &&
      options.has(replace)
      ? (PlatformLiveDocumentAndHistoryLabelNotSecret[replace] ?? replace)
      : undefined;
  });
  (platformLiveDocumentAndHistoryValue512 = 512);
  (resolvePlatformLiveDocumentAndHistoryTrimEnd = (
    items?: unknown,
    ..._extraArguments: unknown[]
  ) => {
    if (
      typeof items != `string` ||
      items.length > platformLiveDocumentAndHistoryValue512
    )
      return;
    let trimmedItems = items.trimEnd();
    let lastIndexOf = trimmedItems.lastIndexOf(`: `);
    return lastIndexOf < 0 ? trimmedItems : trimmedItems.slice(lastIndexOf + 2);
  });
  (platformLiveDocumentAndHistoryUnclosedBeginUnmatchedEndDuplicateIdZeroSpanValues = [
      `unclosed_begin`,
      `unmatched_end`,
      `duplicate_id`,
      `zero_span`,
      `point_not_comment`,
    ]);
  (PlatformLiveDocumentAndHistoryUnclosedBegin = [
    [/\bbegin\b.{0,120}\bnever closed\b/i, `unclosed_begin`],
    [/\bend\b.{0,120}\b(?:closes nothing|never opened)\b/i, `unmatched_end`],
    [
      /\bmark\b.{0,120}\b(?:more than one mark|duplicate mark)\b/i,
      `duplicate_id`,
    ],
    [/\bmark\b.{0,120}\b(?:spans nothing|zero[- ]length)/i, `zero_span`],
    [/\bpoint\b.{0,120}\bnon-comment\b/i, `point_not_comment`],
  ]);
  (PlatformLiveDocumentAndHistoryModelBalance = `model_balance`);
  (platformLiveDocumentAndHistorySet8 = new (Set as Dynamic)([
    PlatformLiveDocumentAndHistoryModelBalance,
    `bad_payload`,
  ]));
  (PlatformLiveDocumentAndHistoryPointNotComment = {
    point_not_comment: `pt_not_comment`,
  });
  (platformLiveDocumentAndHistoryDetailWhyHintWhyHintValues = [
    `detail`,
    `why`,
    `hintWhy`,
    `hint`,
    `message`,
  ]);
  (PlatformLiveDocumentAndHistoryBADPAYLOAD = {
    BAD_PAYLOAD: `relay_payload`,
    TOO_BIG: `relay_too_big`,
    INVALID_ARGUMENT: `relay_invalid`,
    LOCAL: `relay_local`,
  });
  (PlatformLiveDocumentAndHistoryValues = Object.values(
    PlatformLiveDocumentAndHistoryBADPAYLOAD,
  ));
  (resolvePlatformLiveDocumentAndHistoryRelay = (
    platformLiveDocumentAndHistoryRelay?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (
      typeof platformLiveDocumentAndHistoryRelay != `object` ||
      !platformLiveDocumentAndHistoryRelay ||
      Array.isArray(platformLiveDocumentAndHistoryRelay)
    )
      return;
    let platformLiveDocumentAndHistoryRelay2: Dynamic =
      platformLiveDocumentAndHistoryRelay;
    return platformLiveDocumentAndHistoryRelay2.layer === `relay` &&
      typeof platformLiveDocumentAndHistoryRelay2.was == `string` &&
      Object.hasOwn(
        PlatformLiveDocumentAndHistoryBADPAYLOAD,
        platformLiveDocumentAndHistoryRelay2.was,
      )
      ? PlatformLiveDocumentAndHistoryBADPAYLOAD[
          platformLiveDocumentAndHistoryRelay2.was
        ]
      : undefined;
  });
  (PlatformLiveDocumentAndHistoryType = `type`);
  (platformLiveDocumentAndHistorySet9 = new (Set as Dynamic)(
    `op.ifRev.target.kind.ids.range.runs.find.source.with.from.content.id.as.side.each.provenance.reader.name.version.count.to.attrs.type.in.tail.add.remove.rev.allowDetach.ifHash.block.at.into.marks.text.blocksHash.blocks.color.intent.resurrect.table.row.col.parentId.header.item.parent.after.before.dir.on`.split(
      `.`,
    ),
  ));
  (PlatformLiveDocumentAndHistoryIfRev = {
    op: `op`,
    ifRev: `ifrev`,
    side: `side`,
    each: `each`,
    ids: `ids`,
    "ids.from": `ids_from`,
    "ids.count": `ids_count`,
    id: `id`,
    target: `target`,
    "target.kind": `tgt_kind`,
    "target.ids": `tgt_ids`,
    "target.range": `tgt_range`,
    "target.runs": `tgt_runs`,
    "target.find": `tgt_find`,
    source: `source`,
    "source.as": `src_as`,
    "source.from": `src_from`,
    "from.kind": `from_kind`,
    "from.content": `from_cont`,
    "from.id": `from_id`,
    "content.type": `cont_type`,
    "content.text": `cont_text`,
    "content.marks": `cont_marks`,
    "content.content": `cont_cont`,
    "marks.type": `mark_type`,
    "marks.id": `mark_id`,
    with: `with`,
    "with.as": `with_as`,
    "with.from": `with_from`,
    provenance: `prov`,
    "provenance.source": `prov_src`,
    "provenance.reader": `prov_rdr`,
    "reader.name": `rdr_name`,
    "reader.version": `rdr_ver`,
    attrs: `attrs`,
    "attrs.type": `attrs_type`,
    to: `to`,
    "to.target": `to_target`,
    "to.side": `to_side`,
    in: `in`,
    tail: `tail`,
    "tail.type": `tail_type`,
    "tail.attrs": `tail_attrs`,
    rev: `rev`,
    allowDetach: `detach`,
    ifHash: `ifhash`,
    "provenance.blocksHash": `prov_hash`,
    blocksHash: `prov_hash`,
    "source.blocks": `src_blocks`,
    "with.blocks": `with_blks`,
    "marks.color": `mark_color`,
    "add.color": `add_color`,
    color: `color`,
    "content.intent": `intent`,
    intent: `intent`,
    resurrect: `resurrect`,
    "target.table": `tgt_table`,
    "target.row": `tgt_row`,
    "target.col": `tgt_col`,
    "target.parentId": `tgt_parent`,
    "attrs.header": `attrs_hdr`,
    add: `add`,
    remove: `remove`,
    "add.id": `add_id`,
    "remove.id": `remove_id`,
    block: `block`,
    at: `at`,
    into: `into`,
    item: `item`,
    parent: `parent`,
    after: `after`,
    before: `before`,
    dir: `dir`,
    on: `on`,
  });
  (PlatformLiveDocumentAndHistoryKind = {
    content: `prov_cont`,
    id: `prov_id`,
    kind: `prov_kind`,
    as: `prov_as`,
    from: `prov_from`,
    name: `rdr_name`,
    version: `rdr_ver`,
  });
  (platformLiveDocumentAndHistoryValue256 = 256);
  (platformLiveDocumentAndHistoryPattern2 = /^\d{1,4}$/);
  (resolvePlatformLiveDocumentAndHistoryBlocks = (
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    items.length >= 2 &&
    items[items.length - 1] === `blocks` &&
    (items[items.length - 2] === `source` || items[items.length - 2] === `with`));
  (resolvePlatformLiveDocumentAndHistorySplit = (
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (
      items.length === 0 ||
      items.length > platformLiveDocumentAndHistoryValue256
    )
      return;
    let items2: Dynamic = [];
    for (let resolvePlatformLiveDocumentAndHistorySplitResult of items.split(
      `.`,
    ) as Dynamic) {
      if (
        platformLiveDocumentAndHistoryPattern2.test(
          resolvePlatformLiveDocumentAndHistorySplitResult,
        )
      )
        continue;
      let match = /^([A-Za-z]{1,16})((?:\[\d{1,4}\])*)$/.exec(
        resolvePlatformLiveDocumentAndHistorySplitResult,
      );
      if (!match) return;
      if (match[1] !== `ops`) {
        items2.push(match[1]);
      }
      if (resolvePlatformLiveDocumentAndHistoryBlocks(items2)) break;
    }
    return items2;
  });
  (resolvePlatformLiveDocumentAndHistoryTest3 = (
    platformLiveDocumentAndHistoryTest3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let items: Dynamic = [];
    for (let resolvePlatformLiveDocumentAndHistoryTest3Result of platformLiveDocumentAndHistoryTest3 as Dynamic)
      if (typeof resolvePlatformLiveDocumentAndHistoryTest3Result != `number`) {
        if (typeof resolvePlatformLiveDocumentAndHistoryTest3Result != `string`)
          return;
        if (
          !platformLiveDocumentAndHistoryPattern2.test(
            resolvePlatformLiveDocumentAndHistoryTest3Result,
          ) &&
          (items.push(resolvePlatformLiveDocumentAndHistoryTest3Result),
          resolvePlatformLiveDocumentAndHistoryBlocks(items))
        )
          break;
      }
    return items;
  });
  (resolvePlatformLiveDocumentAndHistoryUint = (
    items?: unknown,
    ..._extraArguments: unknown[]
  ) => {
    if (items != null)
      return Array.isArray(items)
        ? `i`
        : typeof items == `object`
          ? `o`
          : typeof items != `string` || items.length > 160
            ? `x`
            : items === `string`
              ? `s`
              : items === `uint`
                ? `u`
                : items === `boolean`
                  ? `b`
                  : items === `object` ||
                      items.startsWith(`object {`) ||
                      items.startsWith(`an S1 node object`) ||
                      items.startsWith(`{from, count}`)
                    ? `o`
                    : items.startsWith(`integer`)
                      ? `u`
                      : items.startsWith(`sha256:`)
                        ? `h`
                        : items === `array` || items.startsWith(`string[]`)
                          ? `a`
                          : items.startsWith(`id string`)
                            ? `i`
                            : items.startsWith(`a block node`)
                              ? `n`
                              : /^\d+\.\.=?\d+( bytes)?$/.test(items)
                                ? `r`
                                : /^<= \d+ /.test(items)
                                  ? `m`
                                  : `x`;
  });
  (PlatformLiveDocumentAndHistoryAllowEmpty = {
    allowEmpty: `allow_emp`,
    allowMultiple: `allow_mult`,
    as: `as`,
    attrs: `attrs`,
    blocks: `blocks`,
    blocksHash: `prov_hash`,
    col: `col`,
    content: `content`,
    count: `count`,
    end: `end`,
    from: `from`,
    id: `id`,
    ids: `ids`,
    isDocument: `is_doc`,
    kind: `kind`,
    localId: `local_id`,
    name: `name`,
    parent: `parent`,
    parentId: `parent_id`,
    range: `range`,
    reader: `reader`,
    row: `row`,
    runs: `runs`,
    start: `start`,
    table: `table`,
    type: `type`,
    verified: `verified`,
    version: `version`,
    within: `within`,
    op: `op`,
    ifRev: `ifrev`,
    target: `target`,
    source: `source`,
    side: `side`,
    provenance: `prov`,
    each: `each`,
    with: `with`,
    allowDetach: `detach`,
    ifHash: `ifhash`,
    to: `to`,
    add: `add`,
    remove: `remove`,
    in: `in`,
    tail: `tail`,
    resurrect: `resurrect`,
    dir: `dir`,
    rev: `rev`,
    blob: `blob`,
    src: `src`,
    mime: `mime`,
    alt: `alt`,
    dims: `dims`,
    crop: `crop`,
    align: `align`,
  });
  (resolvePlatformLiveDocumentAndHistoryHasOwn = (
    platformLiveDocumentAndHistoryHasOwn?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    Object.hasOwn(
      PlatformLiveDocumentAndHistoryAllowEmpty,
      platformLiveDocumentAndHistoryHasOwn,
    )
      ? PlatformLiveDocumentAndHistoryAllowEmpty[
          platformLiveDocumentAndHistoryHasOwn
        ]
      : undefined);
  (resolvePlatformLiveDocumentAndHistoryProvenance = (
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    (items[0] === `provenance` && items.length > 2
      ? PlatformLiveDocumentAndHistoryKind[items[items.length - 1]]
      : undefined) ??
    PlatformLiveDocumentAndHistoryIfRev[items.slice(-2).join(`.`)] ??
    PlatformLiveDocumentAndHistoryIfRev[items[items.length - 1]]);
  (platformLiveDocumentAndHistorySet10 = new (Set as Dynamic)([
    ...platformLiveDocumentAndHistorySet9,
    ...Object.keys(PlatformLiveDocumentAndHistoryAllowEmpty),
    `builtin`,
  ]));
  (PlatformLiveDocumentAndHistoryAnchorsAffected = `anchors_affected`);
  (PlatformLiveDocumentAndHistoryInsert = {
    insert: `ins`,
    delete: `del`,
    replace: `rep`,
    revive: `rev`,
    join: `jon`,
    block_join: `jon`,
    move: `mov`,
    block_move: `mov`,
  });
  (platformLiveDocumentAndHistoryValue9 = 9);
  (PlatformLiveDocumentAndHistoryOthu = `othu`);
  (platformLiveDocumentAndHistoryPattern3 = /^(?:ins|del|rep|rev|jon|mov|oth)[fu]$/);
  (resolvePlatformLiveDocumentAndHistoryValue11 = (
    platformLiveDocumentAndHistoryValue11?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    try {
      return platformLiveDocumentAndHistoryValue11();
    } catch {
      return options;
    }
  });
  (resolvePlatformLiveDocumentAndHistoryHasOwn2 = (
    operation?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolvePlatformLiveDocumentAndHistoryValue11(
      (..._extraArguments: unknown[]): string =>
        resolvePlatformLiveDocumentAndHistoryValue15(operation)
          ? `${typeof operation.op == `string` && Object.hasOwn(PlatformLiveDocumentAndHistoryInsert, operation.op) ? PlatformLiveDocumentAndHistoryInsert[operation.op] : `oth`}${operation.allowDetach === true ? `f` : `u`}`
          : PlatformLiveDocumentAndHistoryOthu,
      PlatformLiveDocumentAndHistoryOthu,
    ));
}

export {
  PlatformLiveDocumentAndHistoryAddOptions,
  PlatformLiveDocumentAndHistoryAnchorsAffected,
  PlatformLiveDocumentAndHistoryCreate,
  PlatformLiveDocumentAndHistoryDocReady,
  PlatformLiveDocumentAndHistoryEntries,
  PlatformLiveDocumentAndHistoryMessage,
  PlatformLiveDocumentAndHistoryOther,
  PlatformLiveDocumentAndHistoryOthu,
  PlatformLiveDocumentAndHistorySession,
  PlatformLiveDocumentAndHistoryUnsaid,
  PlatformLiveDocumentAndHistoryValues,
  PlatformLiveDocumentAndHistoryWidgetBundle,
  clearPlatformLiveDocumentAndHistoryDelete,
  clearPlatformLiveDocumentAndHistoryDelete2,
  filterPlatformLiveDocumentAndHistoryStatus,
  getPlatformLiveDocumentAndHistorySome,
  getPlatformLiveDocumentAndHistoryValue,
  getPlatformLiveDocumentAndHistoryValues,
  isPlatformLiveDocumentAndHistoryFragAtQueue,
  isPlatformLiveDocumentAndHistoryReadFrom,
  loadPlatformLiveDocumentAndHistoryCode,
  loadPlatformLiveDocumentAndHistoryContainer,
  loadPlatformLiveDocumentAndHistoryNodeId,
  loadPlatformLiveDocumentAndHistoryRun,
  loadPlatformLiveDocumentAndHistoryStatus2,
  platformLiveDocumentAndHistoryPattern3,
  platformLiveDocumentAndHistoryValue3000,
  platformLiveDocumentAndHistoryValue9,
  resolvePlatformLiveDocumentAndHistoryCancel,
  resolvePlatformLiveDocumentAndHistoryCell,
  resolvePlatformLiveDocumentAndHistoryClear,
  resolvePlatformLiveDocumentAndHistoryCut,
  resolvePlatformLiveDocumentAndHistoryEntries,
  resolvePlatformLiveDocumentAndHistoryFirst,
  resolvePlatformLiveDocumentAndHistoryHeld,
  resolvePlatformLiveDocumentAndHistoryNode2,
  resolvePlatformLiveDocumentAndHistoryNodeId,
  resolvePlatformLiveDocumentAndHistoryNodeId2,
  resolvePlatformLiveDocumentAndHistoryOther,
  resolvePlatformLiveDocumentAndHistoryPayload3,
  resolvePlatformLiveDocumentAndHistoryPicture,
  resolvePlatformLiveDocumentAndHistoryReason,
  resolvePlatformLiveDocumentAndHistoryTest,
  resolvePlatformLiveDocumentAndHistoryTest2,
  resolvePlatformLiveDocumentAndHistoryToolCall,
  resolvePlatformLiveDocumentAndHistoryUnsaved,
  resolvePlatformLiveDocumentAndHistoryUpdate,
  resolvePlatformLiveDocumentAndHistoryValue,
  resolvePlatformLiveDocumentAndHistoryValue11,
  resolvePlatformLiveDocumentAndHistoryValue2,
  resolvePlatformLiveDocumentAndHistoryValue4,
  resolvePlatformLiveDocumentAndHistoryValue5,
  resolvePlatformLiveDocumentAndHistoryValue6,
  resolvePlatformLiveDocumentAndHistoryValue8,
  resolvePlatformLiveDocumentAndHistoryValue9,
  resolvePlatformLiveDocumentAndHistoryValues,
  updatePlatformLiveDocumentAndHistoryCommentRail,
  updatePlatformLiveDocumentAndHistoryDelete,
  updatePlatformLiveDocumentAndHistoryShed,
};
