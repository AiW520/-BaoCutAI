/** BaoCut: operation controller write denial. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import type { OperationControllerScope } from "./controller-contracts";
import { resolveEditorExtensionsSess } from "../../prose-editor/platform/extensions-2";
import { reportOperationEvent } from "../observability/boot";
import { resolveDataOperationControlValue17 } from "../data/operation-control-1";
import {
  DataOperationControlIdRefused,
  collectDataOperationControlContent,
  dataOperationControlIdentifierPattern2,
  dataOperationControlSet11,
  dataOperationControlSet17,
  dataOperationControlSet19,
  dataOperationControlSet20,
  dataOperationControlSet21,
  isDataOperationControlRevive,
  isPlainRecord,
  resolveDataOperationControlBlocks3,
  resolveDataOperationControlBlocks4,
  resolveDataOperationControlChars4,
  resolveDataOperationControlInline,
  resolveDataOperationControlSome2,
} from "../data/operation-control-4";
export function classifyWriteDenial(
  this: Dynamic,
  operationScope: Pick<OperationControllerScope, "dataOperationControlVerdict">,
  flyScope: {
    filteredMinted: Dynamic;
    enabled31: Dynamic;
    record4: Dynamic;
    enabled30: Dynamic;
    dataOperationControlVerdict2: Dynamic;
    data2: Dynamic;
    matchesVerdict3: Dynamic;
    enabled26: Dynamic;
    rep2: Dynamic;
    loadDataOperationControlVerdictResult22: Dynamic;
    matchesVerdict2: Dynamic;
    gone: Dynamic;
    classify2: Dynamic;
    why3: Dynamic;
    matchesDataOperationControlSure: Dynamic;
  },
): Dynamic {
  let matchesFilteredMintedCount: Dynamic =
    flyScope.filteredMinted.length > 0 &&
    flyScope.enabled31 &&
    flyScope.record4.ops.some(resolveDataOperationControlInline);
  let enabled32: Dynamic =
    flyScope.enabled30 &&
    !flyScope.dataOperationControlVerdict2.replayed &&
    flyScope.record4.kStart === 0 &&
    ((typeof flyScope.data2.why == `string` &&
      dataOperationControlSet17.has(flyScope.data2.why)) ||
      matchesFilteredMintedCount);
  let editorExtensionsSess: Dynamic =
    typeof flyScope.data2.got == `string`
      ? resolveEditorExtensionsSess(flyScope.data2.got)
      : null;
  let editorExtensionsSess2: Dynamic =
    typeof flyScope.data2.next_free == `string`
      ? resolveEditorExtensionsSess(flyScope.data2.next_free)
      : null;
  let matchesWhy2 =
    flyScope.data2.why === `used` &&
    !!editorExtensionsSess &&
    !!editorExtensionsSess2 &&
    editorExtensionsSess.sess === editorExtensionsSess2.sess &&
    editorExtensionsSess2.i <= editorExtensionsSess.i;
  let enabled33 =
    !flyScope.matchesVerdict3 &&
    ((flyScope.enabled30 &&
      (flyScope.data2.why === `used` || flyScope.data2.why === `gap`) &&
      flyScope.data2.next_free !== undefined &&
      !matchesWhy2 &&
      !flyScope.enabled26) ||
      (flyScope.rep2.reason === `index_gap` &&
        [flyScope.data2.nextIndex, flyScope.rep2.nextIndex].some(
          (item3?: unknown, ..._extraArguments: unknown[]) =>
            typeof item3 == `number`,
        )));
  let enabled34 = enabled33 && !this.recounting;
  this.recounting = enabled33;
  let atItem =
    Array.isArray(flyScope.data2.at) && typeof flyScope.data2.at[2] == `number`
      ? flyScope.data2.at[2]
      : undefined;
  let dataOperationControlValue17: Dynamic =
    atItem === undefined
      ? undefined
      : resolveDataOperationControlValue17(
          flyScope.loadDataOperationControlVerdictResult22.from,
          atItem,
        );
  let matchItem = /^ops\[(\d+)\]/.exec(
    [flyScope.data2.detail, flyScope.rep2.detail].find(
      (item3?: unknown, ..._extraArguments: unknown[]) =>
        typeof item3 == `string`,
    ) ?? ``,
  )?.[1];
  let dataOperationControlValue172: Dynamic =
    matchItem !== undefined &&
    Number(matchItem) <
      flyScope.loadDataOperationControlVerdictResult22.ops.length
      ? resolveDataOperationControlValue17(
          flyScope.loadDataOperationControlVerdictResult22.from,
          Number(matchItem),
        )
      : undefined;
  let dataOperationControlValue173: Dynamic =
    typeof flyScope.data2.opIndex == `number`
      ? resolveDataOperationControlValue17(
          flyScope.loadDataOperationControlVerdictResult22.from,
          flyScope.data2.opIndex,
        )
      : undefined;
  if (dataOperationControlValue173 !== undefined) {
    flyScope.data2.opIndex = dataOperationControlValue173;
  }
  let opIndex: Dynamic =
    flyScope.record4.kStart +
    (dataOperationControlValue173 ??
      dataOperationControlValue17 ??
      dataOperationControlValue172 ??
      0);
  let room = flyScope.matchesVerdict3
    ? `not_applied`
    : flyScope.dataOperationControlVerdict2.busyOut === true
      ? `busy`
      : String(flyScope.rep2.reason ?? `denied`);
  if (flyScope.matchesVerdict3 && flyScope.matchesVerdict2) {
    Object.assign(flyScope.data2, {
      notTaken: true,
      room: String(flyScope.gone?.code ?? `no_op`),
      ...(flyScope.gone
        ? {
            gone: flyScope.gone,
          }
        : {}),
    });
  }
  let enabled35 =
    !flyScope.matchesVerdict3 &&
    (room === `guard_mismatch` ||
      room === `stale` ||
      room === `rev_mismatch` ||
      room === `guard` ||
      flyScope.data2.problem === `missing_guard` ||
      room === `missing_guard`);
  let resolveDataOperationControlBlocks42: Dynamic = (
    dataOperationControlVerdict3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveDataOperationControlChars4(dataOperationControlVerdict3) ||
    resolveDataOperationControlBlocks4(dataOperationControlVerdict3);
  let difference: number = opIndex - flyScope.record4.kStart;
  let opIndex2: Dynamic =
    typeof flyScope.data2.block == `string`
      ? flyScope.record4.ops.findIndex(
          (op2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            resolveDataOperationControlBlocks42(op2) &&
            resolveDataOperationControlBlocks3([op2]).includes(
              flyScope.data2.block,
            ),
        )
      : -1;
  let matchesCondition =
    typeof flyScope.data2.opIndex == `number` ||
    dataOperationControlValue17 !== undefined ||
    dataOperationControlValue172 !== undefined;
  let opItem: Dynamic = matchesCondition
    ? flyScope.record4.ops[difference]
    : undefined;
  let opIndex3: Dynamic = flyScope.record4.ops.findIndex(
    (op2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      resolveDataOperationControlChars4(op2),
  );
  let opIndex4: Dynamic = enabled35
    ? opIndex2 >= 0
      ? opIndex2
      : opItem === undefined
        ? opIndex3 >= 0
          ? opIndex3
          : flyScope.record4.ops.findIndex(
              (op2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                resolveDataOperationControlBlocks4(op2),
            )
        : difference
    : difference;
  let opItem2: Dynamic = flyScope.record4.ops[opIndex4];
  let enabled36: Dynamic =
    enabled35 &&
    opItem2 !== undefined &&
    resolveDataOperationControlBlocks42(opItem2);
  let enabled37 =
    !enabled36 &&
    (room === `unknown_id` || room === `not_minted`) &&
    flyScope.data2.kind === `blob`;
  let matchesBoundOut =
    flyScope.dataOperationControlVerdict2.boundOut === true &&
    flyScope.classify2?.source === "default";
  let reason =
    flyScope.why3 === null
      ? enabled36
        ? `block_changed`
        : enabled37
          ? `blob_unknown`
          : enabled32
            ? DataOperationControlIdRefused
            : flyScope.enabled30
              ? `id_invalid`
              : matchesBoundOut
                ? `server_refused`
                : room
      : `forbidden`;
  if (flyScope.enabled30 && room !== `id_invalid`) {
    Object.assign(flyScope.data2, {
      room: room,
      code: `id_invalid`,
    });
  }
  if (enabled32) {
    Object.assign(flyScope.data2, {
      room: room,
      code: `id_invalid`,
      terminal: true,
    });
    reportOperationEvent(`deny.id_terminal`, {
      opId: flyScope.dataOperationControlVerdict2.opId,
      why: String(flyScope.data2.why),
      room: room,
      verbs: flyScope.record4.ops
        .map((operation?: Dynamic, ..._extraArguments: unknown[]) =>
          String(operation.op),
        )
        .join(`,`),
    });
  }
  let matchesLost =
    flyScope.dataOperationControlVerdict2.lost === true &&
    flyScope.enabled30 &&
    flyScope.data2.why === `shape`;
  let hasRoom: Dynamic =
    dataOperationControlSet11.has(room) ||
    dataOperationControlSet11.has(String(flyScope.data2.code ?? ``));
  let matchesClassify2: Dynamic =
    flyScope.classify2 !== null &&
    flyScope.classify2.k === `op_terminal` &&
    flyScope.classify2.custody === `tray` &&
    (hasRoom || flyScope.classify2.reason === `unavailable`);
  if (matchesClassify2) {
    flyScope.data2.terminal = true;
  }
  let test3: Dynamic =
    dataOperationControlIdentifierPattern2.test(room) ||
    dataOperationControlIdentifierPattern2.test(
      String(flyScope.data2.code ?? ``),
    ) ||
    flyScope.dataOperationControlVerdict2.busyOut === true ||
    flyScope.dataOperationControlVerdict2.boundOut === true ||
    matchesLost ||
    enabled32 ||
    flyScope.matchesDataOperationControlSure ||
    matchesClassify2;
  let enabled38: Dynamic =
    !flyScope.matchesVerdict3 &&
    resolveDataOperationControlSome2(room, flyScope.data2);
  let replayed3: Dynamic =
    flyScope.dataOperationControlVerdict2.replayed ||
    this.remountOut.has(flyScope.dataOperationControlVerdict2.opId);
  let klass =
    test3 || replayed3 || enabled34
      ? undefined
      : flyScope.dataOperationControlVerdict2.assert || hasRoom || enabled38
        ? `unsynced`
        : `assert`;
  if (klass === undefined && !enabled34) {
    this.unsettled = true;
  }
  let enabled39: Dynamic =
    enabled37 &&
    flyScope.record4.ops.some(
      (op2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        let source: Dynamic = isPlainRecord(op2)
          ? (op2.source ?? op2.with)
          : undefined;
        return (
          isPlainRecord(source) &&
          (source.as === `html` || source.as === `markdown`)
        );
      },
    );
  if (enabled37) {
    Object.assign(flyScope.data2, {
      room: `${room}:${String(flyScope.data2.why ?? ``)}`,
    });
    delete flyScope.data2.why;
    if (enabled39) {
      flyScope.data2.why = `paste`;
    }
  }
  let kind2: Dynamic = isPlainRecord(opItem2?.target)
    ? opItem2.target.kind
    : undefined;
  if (enabled36) {
    Object.assign(flyScope.data2, {
      why: kind2 === `chars` ? `erase` : opItem2.op,
      room: room,
    });
  }
  if (
    enabled36 &&
    kind2 === `chars` &&
    Array.isArray(flyScope.data2.foreign) &&
    flyScope.data2.foreign.length > 0
  ) {
    Object.assign(flyScope.data2, {
      need: `foreign`,
    });
  }
  delete flyScope.data2.self;
  if (
    !enabled36 &&
    !enabled37 &&
    !flyScope.dataOperationControlVerdict2.replayed &&
    dataOperationControlSet19.has(reason)
  ) {
    let label7: Dynamic =
      operationScope.dataOperationControlVerdict.session.get()?.label;
    if (label7 !== undefined && flyScope.data2.by === label7) {
      flyScope.data2.self = true;
    }
    let op2: Dynamic =
      typeof flyScope.data2.op == `string` ? flyScope.data2.op : undefined;
    let op3: Dynamic = isPlainRecord(opItem2) ? opItem2.op : undefined;
    if (
      op2 !== undefined &&
      kind2 === `blocks` &&
      dataOperationControlSet20.has(String(op3)) &&
      flyScope.data2.why === undefined
    ) {
      flyScope.data2.why =
        op2 === op3 || (op2 === `remove` && op3 === `delete`)
          ? `already`
          : dataOperationControlSet21.has(op2)
            ? `rearranged`
            : `removed`;
    }
  }
  let words: Dynamic = [
    flyScope.data2.detail,
    flyScope.rep2.detail,
    flyScope.data2.hint,
    flyScope.rep2.hint,
    `An edit was refused (${reason}).`,
  ].find(
    (item3?: unknown, ..._extraArguments: unknown[]) =>
      typeof item3 == `string` && item3 !== ``,
  );
  let record6: Dynamic = {};
  for (let loadDataOperationControlVerdictResult25 of [
    `detail`,
    `hint`,
    `layer`,
    `code`,
    `why`,
    `next_free`,
    `nextIndex`,
  ] as Dynamic)
    if (
      flyScope.rep2[loadDataOperationControlVerdictResult25] !== undefined &&
      flyScope.data2[loadDataOperationControlVerdictResult25] === undefined
    ) {
      record6[loadDataOperationControlVerdictResult25] =
        flyScope.rep2[loadDataOperationControlVerdictResult25];
    }
  if (enabled37) {
    delete record6.why;
  }
  delete flyScope.data2.rescue;
  delete flyScope.data2.given;
  delete flyScope.data2.pointed;
  delete flyScope.data2.recount;
  delete flyScope.data2.landed;
  let rescue: Dynamic = [];
  return {
    enabled32,
    enabled34,
    opIndex,
    room,
    difference,
    matchesCondition,
    opIndex4,
    enabled36,
    enabled37,
    matchesBoundOut,
    reason,
    matchesLost,
    hasRoom,
    matchesClassify2,
    enabled38,
    replayed3,
    klass,
    enabled39,
    words,
    record6,
    rescue,
  };
}
export function describeWriteDenial(
  this: Dynamic,
  operationScope: Pick<OperationControllerScope, "judged">,
  flyScope: {
    reason: Dynamic;
    dataOperationControlVerdict2: Dynamic;
    record4: Dynamic;
    data2: Dynamic;
    difference: Dynamic;
    klass: Dynamic;
    room: Dynamic;
    hasRoom: Dynamic;
    batchesDone: Dynamic;
    opIndex: Dynamic;
    record6: Dynamic;
    matchesVerdict3: Dynamic;
    record5: Dynamic;
    rep2: Dynamic;
    dataOperationControlSure: Dynamic;
    enabled34: Dynamic;
    state2: Dynamic;
  },
): Dynamic {
  let matchesReason =
    flyScope.reason === `unknown_id` &&
    !flyScope.dataOperationControlVerdict2.replayed &&
    ((..._extraArguments: unknown[]) => {
      let items3: Dynamic = [];
      collectDataOperationControlContent(
        flyScope.record4.ops,
        (
          dataOperationControlVerdict3?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => (
          items3.push(dataOperationControlVerdict3),
          dataOperationControlVerdict3
        ),
      );
      return (
        items3.length > 0 &&
        !items3.some(
          (
            rolldownNImport2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            this.proposedEver.has(rolldownNImport2) &&
            !this.grantedEver.has(rolldownNImport2) &&
            !flyScope.dataOperationControlVerdict2.predicted.some(
              (predicted3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                predicted3.includes(rolldownNImport2),
            ),
        )
      );
    })();
  let ids: Dynamic = ((..._extraArguments: unknown[]): Dynamic => {
    if (
      !matchesReason ||
      flyScope.reason !== `unknown_id` ||
      flyScope.data2.why !== `not_minted`
    )
      return [];
    let filteredIds: Dynamic = Array.isArray(flyScope.data2.ids)
      ? flyScope.data2.ids.filter(
          (id?: unknown, ..._extraArguments: unknown[]) =>
            typeof id == `string`,
        )
      : null;
    let filteredItems: Dynamic =
      filteredIds === null
        ? [flyScope.record4.ops[flyScope.difference]].filter(
            (item3?: Dynamic, ..._extraArguments: unknown[]) =>
              item3 !== undefined,
          )
        : flyScope.record4.ops;
    if (
      flyScope.record4.ops.some(
        (event?: Dynamic, ..._extraArguments: unknown[]) =>
          event.op !== `insert` ||
          !isPlainRecord(event.target) ||
          event.target.kind !== `blocks`,
      )
    )
      return [];
    let items3: Dynamic = [];
    for (let event of filteredItems as Dynamic) {
      let target: Dynamic = event.target;
      if (!Array.isArray(target.ids)) return [];
      for (let loadDataOperationControlVerdictResult25 of target.ids as Dynamic)
        if (
          typeof loadDataOperationControlVerdictResult25 == `string` &&
          (filteredIds === null ||
            filteredIds.includes(loadDataOperationControlVerdictResult25))
        ) {
          items3.push(loadDataOperationControlVerdictResult25);
        }
    }
    return items3;
  })();
  if (ids.length > 0) {
    Object.assign(flyScope.data2, {
      gone: {
        code: `block_dead`,
        ids: ids,
      },
    });
  }
  let record7: Dynamic =
    flyScope.dataOperationControlVerdict2.replayed &&
    flyScope.data2.need === undefined
      ? {
          need: `earlier_life`,
        }
      : {};
  let landed: Dynamic =
    flyScope.record4.kStart > 0
      ? {
          count: flyScope.record4.kStart,
          rev: flyScope.dataOperationControlVerdict2.rev,
          results: flyScope.dataOperationControlVerdict2.results.slice(
            0,
            flyScope.record4.kStart,
          ),
          ...((padded?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            padded.length > 0
              ? {
                  padded: padded,
                }
              : {})(
            (flyScope.dataOperationControlVerdict2.padded ?? []).filter(
              (padded?: Dynamic, ..._extraArguments: unknown[]) =>
                padded < flyScope.record4.kStart,
            ),
          ),
          ...((flown?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            flown.length > 0
              ? {
                  flown: flown,
                }
              : {})(
            (flyScope.dataOperationControlVerdict2.flown ?? []).filter(
              ([flown]: Dynamic, ..._extraArguments: unknown[]) =>
                flown < flyScope.record4.kStart,
            ),
          ),
        }
      : undefined;
  if (landed) {
    this.tookMine(flyScope.dataOperationControlVerdict2);
  }
  if (
    landed &&
    isDataOperationControlRevive(
      flyScope.dataOperationControlVerdict2.ops.slice(0, landed.count),
      landed.results,
    )
  ) {
    this.freshen();
  }
  if (flyScope.klass !== undefined) {
    console.error(
      `opTransport: zero_error_fallback — the room refused ${flyScope.dataOperationControlVerdict2.assert ? `an ASSERT` : `an edit`} of this page (${flyScope.room}${flyScope.data2.why === undefined ? `` : `/${String(flyScope.data2.why)}`}${flyScope.hasRoom ? `, a LAW this page should have pre-checked` : ``}${landed ? `; update ${flyScope.batchesDone + 1} of a cut send — the ${landed.count} op(s) of updates 1..${flyScope.batchesDone} LANDED (rev ${landed.rev}) and stay` : ``}); ${ids.length > 0 ? `the block it names ended at the room: the editor follows that, its words going on in a paragraph of their own at its place` : flyScope.klass === `assert` ? `the editor keeps it and asserts its blocks` : `the page keeps its text unsynced`} — no re-read, no re-seat, no sentence`,
      flyScope.dataOperationControlVerdict2.opId,
    );
    this.zeroErrored({
      opId: flyScope.dataOperationControlVerdict2.opId,
      klass: flyScope.klass,
      reason: flyScope.room,
      room: [
        flyScope.data2.why,
        flyScope.data2.problem,
        flyScope.data2.code,
      ].find(
        (item3?: unknown, ..._extraArguments: unknown[]) =>
          typeof item3 == `string`,
      ),
      ...(flyScope.hasRoom
        ? {
            law: String(
              flyScope.data2.limit ?? flyScope.data2.dim ?? flyScope.room,
            ),
          }
        : {}),
      ops: flyScope.record4.ops,
      opIndex: flyScope.opIndex,
    });
  }
  let filteredNotices: Dynamic = (
    flyScope.dataOperationControlVerdict2.notices ?? []
  ).filter(
    (error?: Dynamic, ..._extraArguments: unknown[]) =>
      error.code === `revive_short`,
  );
  let record8: Dynamic = {
    ...flyScope.record6,
    ...flyScope.data2,
    ...record7,
  };
  if (!flyScope.matchesVerdict3) {
    (0, operationScope.judged)(
      flyScope.record5,
      flyScope.rep2,
      flyScope.dataOperationControlSure === null
        ? flyScope.enabled34
          ? `recount`
          : (flyScope.klass ?? `trayed`)
        : `page_gone`,
      (0, flyScope.state2)(),
    );
  }
  this.trayMovedBehind(flyScope.dataOperationControlVerdict2);
  return {
    matchesReason,
    record7,
    landed,
    filteredNotices,
    record8,
  };
}
export function emitWriteDenial(
  this: Dynamic,
  operationScope: Pick<OperationControllerScope, never>,
  flyScope: {
    dataOperationControlVerdict2: Dynamic;
    reason: Dynamic;
    record6: Dynamic;
    data2: Dynamic;
    record7: Dynamic;
    enabled36: Dynamic;
    record4: Dynamic;
    opIndex4: Dynamic;
    opIndex: Dynamic;
    matchesCondition: Dynamic;
    words: Dynamic;
    rescue: Dynamic;
    matchesReason: Dynamic;
    klass: Dynamic;
    room: Dynamic;
    hasRoom: Dynamic;
    enabled38: Dynamic;
    classify2: Dynamic;
    matchesClassify2: Dynamic;
    matchesBoundOut: Dynamic;
    enabled34: Dynamic;
    enabled26: Dynamic;
    landed: Dynamic;
    filteredNotices: Dynamic;
    record8: Dynamic;
  },
): void {
  this.emit({
    t: `deny`,
    node: this.node,
    opId: flyScope.dataOperationControlVerdict2.opId,
    reason: flyScope.reason,
    detail: {
      ...flyScope.record6,
      ...flyScope.data2,
      ...flyScope.record7,
      opIndex: flyScope.enabled36
        ? flyScope.record4.kStart + flyScope.opIndex4
        : flyScope.opIndex,
      ...(flyScope.matchesCondition || flyScope.enabled36
        ? {
            pointed: true,
          }
        : {}),
      words: flyScope.words,
      ...(flyScope.rescue.length > 0
        ? {
            rescue: flyScope.rescue,
          }
        : {}),
      ...(flyScope.matchesReason
        ? {
            given: true,
          }
        : {}),
      ...(flyScope.klass === undefined
        ? {}
        : {
            zero_error: flyScope.klass,
            room_reason: flyScope.room,
          }),
      ...(flyScope.klass !== undefined && flyScope.hasRoom
        ? {
            law: true,
          }
        : {}),
      ...(flyScope.enabled38
        ? {
            orphan_node: true,
          }
        : {}),
      ...(flyScope.classify2 !== null &&
      (flyScope.classify2.source === "default" ||
        flyScope.dataOperationControlVerdict2.boundOut === true ||
        flyScope.matchesClassify2)
        ? {
            klass: flyScope.classify2.k,
            unclassified: flyScope.classify2.source === "default",
          }
        : {}),
      ...(flyScope.matchesBoundOut
        ? {
            room_reason: flyScope.room,
          }
        : {}),
      ...(flyScope.dataOperationControlVerdict2.assert
        ? {
            assert: true,
          }
        : {}),
      ...(flyScope.enabled34
        ? {
            recount: true,
          }
        : {}),
      ...(flyScope.enabled26
        ? {
            unverified: true,
          }
        : {}),
      ...(flyScope.landed
        ? {
            landed: flyScope.landed,
          }
        : {}),
      ...(flyScope.filteredNotices.length > 0 ||
      (Array.isArray(flyScope.record8.notices) &&
        flyScope.record8.notices.length > 0)
        ? {
            notices: [
              ...(Array.isArray(flyScope.record8.notices)
                ? flyScope.record8.notices
                : []),
              ...flyScope.filteredNotices,
            ],
          }
        : {}),
    },
  });
}
