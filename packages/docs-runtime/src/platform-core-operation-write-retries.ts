/** BaoCut: operation controller write retries. */
import type { Dynamic } from "./types";
import type { OperationControllerScope } from "./type-models/platform-core-operation";
import {
  RATE_LIMITED_CAP_MS,
  rateLimitedOf,
} from "./platform-core-platform-session-and-sources-1";
import {
  resolveEditorExtensionsSess,
  resolveEditorExtensionsValue22,
} from "./platform-core-editor-extensions-2";
import { reportOperationEvent } from "./platform-core-observability-boot";
import { resolveDataOperationControlValue17 } from "./platform-core-data-operation-control-1";
import {
  DataOperationControlMessage13,
  DataOperationControlMessage14,
  DataOperationControlMessage2,
  DataOperationControlMessage3,
  DataOperationControlMessage8,
  dataOperationControlValue1000,
  dataOperationControlValue5000,
  dataOperationControlValue8000,
  resolveDataOperationControlAllow,
  resolveDataOperationControlRound2,
  resolveDataOperationControlRound3,
  resolveDataOperationControlValue19,
  resolveDataOperationControlValue26,
  resolveDataOperationControlValue27,
  resolveDataOperationControlVerdict,
} from "./platform-core-data-operation-control-2";
import {
  getDataOperationControlSize,
  isDataOperationControlBatchesDone,
  isPlainRecord,
  resolveDataOperationControlFlat3,
  resolveDataOperationControlFlatMap2,
  resolveDataOperationControlHeader,
  resolveDataOperationControlSome3,
  resolveDataOperationControlStartsWith,
} from "./platform-core-data-operation-control-4";
export function repairWriteSession(
  this: Dynamic,
  operationScope: Pick<
    OperationControllerScope,
    | "judged"
    | "enabled21"
    | "lookup"
    | "loadDataOperationControlVerdictHandler27"
    | "dataOperationControlVerdict"
    | "rekeyHolds3"
    | "rekeyHolds4"
    | "emit8"
    | "loadDataOperationControlVerdictResult18"
  >,
  flyScope: {
    rep2: Dynamic;
    label5: Dynamic;
    matchesWhy: Dynamic;
    matchesVerdict: Dynamic;
    from: Dynamic;
    record5: Dynamic;
    state2: Dynamic;
    dataOperationControlVerdict2: Dynamic;
    loadDataOperationControlVerdictResult24: Dynamic;
    data2: Dynamic;
  },
): boolean {
  if (
    ((flyScope.rep2.verdict === `deny` &&
      /not_your_session|unknown_secret|unknown_session/.test(flyScope.label5) &&
      flyScope.matchesWhy) ||
      flyScope.matchesVerdict ||
      flyScope.from !== undefined) &&
    this.sessRetries < 2
  ) {
    (0, operationScope.judged)(
      flyScope.record5,
      flyScope.rep2,
      `rehandshake`,
      (0, flyScope.state2)(),
    );
    this.sessRetries += 1;
    this.inflight = null;
    this.queue.unshift(flyScope.dataOperationControlVerdict2);
    if (
      (flyScope.dataOperationControlVerdict2.replayed ||
        (flyScope.dataOperationControlVerdict2.verdictLostTries ?? 0) > 0) &&
      flyScope.dataOperationControlVerdict2.sent
    ) {
      flyScope.dataOperationControlVerdict2.namesRefused = true;
    }
    if (
      flyScope.from !== undefined &&
      flyScope.dataOperationControlVerdict2.replayed &&
      operationScope.enabled21
    ) {
      flyScope.dataOperationControlVerdict2.restamped = true;
      let tail: Dynamic = 0;
      for (let loadDataOperationControlVerdictResult25 of operationScope.lookup.values() as Dynamic)
        for (let loadDataOperationControlVerdictResult26 of (loadDataOperationControlVerdictResult25.inflight
          ? [
              loadDataOperationControlVerdictResult25.inflight,
              ...loadDataOperationControlVerdictResult25.queue,
            ]
          : loadDataOperationControlVerdictResult25.queue) as Dynamic)
          if (
            loadDataOperationControlVerdictResult26 !==
              flyScope.dataOperationControlVerdict2 &&
            loadDataOperationControlVerdictResult26.replayed &&
            loadDataOperationControlVerdictResult26.lifeDead === true &&
            (0, operationScope.loadDataOperationControlVerdictHandler27)(
              loadDataOperationControlVerdictResult26,
            ) &&
            resolveDataOperationControlFlat3(
              loadDataOperationControlVerdictResult26,
            ).some(
              (
                dataOperationControlFlat3?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic =>
                flyScope.loadDataOperationControlVerdictResult24.some(
                  (
                    loadDataOperationControlVerdictResult27?: Dynamic,
                    ..._extraArguments: unknown[]
                  ) =>
                    resolveDataOperationControlStartsWith(
                      dataOperationControlFlat3,
                      loadDataOperationControlVerdictResult27,
                    ) >= 0,
                ),
            )
          ) {
            loadDataOperationControlVerdictResult26.namesRefused = true;
            tail += 1;
          }
      reportOperationEvent(`deny.restamp`, {
        opId: flyScope.dataOperationControlVerdict2.opId,
        from: flyScope.loadDataOperationControlVerdictResult24.join(`,`),
        to:
          operationScope.dataOperationControlVerdict.session.get()?.label ?? ``,
        tail: tail,
      });
      for (let loadDataOperationControlVerdictResult25 of flyScope.loadDataOperationControlVerdictResult24 as Dynamic)
        (0, operationScope.rekeyHolds3)(
          loadDataOperationControlVerdictResult25,
        );
      (0, operationScope.rekeyHolds4)();
      (0, operationScope.emit8)();
      operationScope.lookup.forEach(
        (lookup3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          lookup3.pump(),
      );
      return true;
    }
    if (
      flyScope.from !== undefined &&
      !flyScope.dataOperationControlVerdict2.replayed &&
      operationScope.enabled21
    ) {
      reportOperationEvent(`deny.restamp`, {
        opId: flyScope.dataOperationControlVerdict2.opId,
        from: flyScope.from,
        to:
          operationScope.dataOperationControlVerdict.session.get()?.label ?? ``,
        tail: 0,
      });
      (0, operationScope.rekeyHolds3)(flyScope.from);
      (0, operationScope.rekeyHolds4)();
      (0, operationScope.emit8)();
      operationScope.lookup.forEach(
        (lookup3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          lookup3.pump(),
      );
      return true;
    }
    let got2: Dynamic =
      flyScope.matchesVerdict && typeof flyScope.data2.got == `string`
        ? flyScope.data2.got
        : ``;
    (0, operationScope.loadDataOperationControlVerdictResult18)(
      operationScope.dataOperationControlVerdict.session.get()?.label,
      got2.includes(`.`) ? got2.slice(0, got2.lastIndexOf(`.`)) : flyScope.from,
    );
    return true;
  }
  return false;
}
export function retryUnknownWrite(
  this: Dynamic,
  operationScope: Pick<
    OperationControllerScope,
    | "judged"
    | "kind"
    | "loadDataOperationControlVerdictHandler25"
    | "refusalClass"
    | "dataOperationControlVerdict"
    | "enabled"
  >,
  flyScope: {
    filterDataOperationControlDeny2: Dynamic;
    dataOperationControlVerdict2: Dynamic;
    record5: Dynamic;
    rep2: Dynamic;
    state2: Dynamic;
    data2: Dynamic;
    opId: Dynamic;
    loadDataOperationControlVerdictResult22: Dynamic;
  },
): boolean {
  if (
    flyScope.filterDataOperationControlDeny2 !== null &&
    flyScope.dataOperationControlVerdict2.busyOut !== true
  ) {
    let total2: Dynamic =
      (flyScope.dataOperationControlVerdict2.busyTries ?? 0) + 1;
    if (total2 <= 8) {
      (0, operationScope.judged)(
        flyScope.record5,
        flyScope.rep2,
        `retried`,
        (0, flyScope.state2)(),
      );
      flyScope.dataOperationControlVerdict2.busyTries = total2;
      this.slow = true;
      this.emit(
        operationScope.kind === null
          ? {
              t: `state`,
              node: this.node,
              state: `saving`,
              ...(total2 > 2
                ? {
                    words: DataOperationControlMessage8,
                  }
                : {}),
            }
          : (0, operationScope.loadDataOperationControlVerdictHandler25)(
              this.node,
            ),
      );
      flyScope.dataOperationControlVerdict2.parked = true;
      if (
        (0, operationScope.refusalClass)() !== null &&
        this.retryTimer !== null
      ) {
        operationScope.dataOperationControlVerdict.timers.clearTimeout(
          this.retryTimer,
        );
      }
      this.retryTimer =
        operationScope.dataOperationControlVerdict.timers.setTimeout(
          (..._extraArguments: unknown[]): undefined => {
            this.retryTimer = null;
            if (
              !operationScope.enabled &&
              !this.dead &&
              !this.parkIfDown(flyScope.dataOperationControlVerdict2)
            ) {
              this.fly(flyScope.dataOperationControlVerdict2);
            }
          },
          resolveDataOperationControlValue26(
            flyScope.filterDataOperationControlDeny2,
            resolveDataOperationControlValue27(
              total2,
              operationScope.dataOperationControlVerdict.random ??
                ((..._extraArguments: unknown[]) => 1),
            ),
          ),
        );
      return true;
    }
    if (flyScope.rep2.reason !== `conflict` && flyScope.rep2.status !== 409) {
      flyScope.dataOperationControlVerdict2.busyOut = true;
      Object.assign(flyScope.data2, {
        room: `ledger-busy`,
        terminal: true,
        detail: `The document was busy — this change could not be saved after several tries; its text is kept in the tray.`,
      });
    } else {
      reportOperationEvent(`ack.conflictLost`, {
        opId: flyScope.opId,
        ops: flyScope.loadDataOperationControlVerdictResult22.ops.length,
        status:
          typeof flyScope.rep2.status == `number` ? flyScope.rep2.status : -1,
        busyTries: flyScope.dataOperationControlVerdict2.busyTries ?? 0,
      });
      flyScope.rep2 = resolveDataOperationControlVerdict(flyScope.rep2);
    }
  }
  return false;
}
export function retryWriteConflict(
  this: Dynamic,
  operationScope: Pick<
    OperationControllerScope,
    "dataOperationControlVerdict" | "judged" | "enabled"
  >,
  flyScope: {
    pageBusyOf2: Dynamic;
    dataOperationControlSure: Dynamic;
    dataOperationControlVerdict2: Dynamic;
    rep2: Dynamic;
    isDataOperationControlDeny22: Dynamic;
    record5: Dynamic;
    state2: Dynamic;
  },
): boolean {
  if (
    flyScope.pageBusyOf2 !== null &&
    flyScope.dataOperationControlSure === null
  ) {
    let tries: Dynamic =
      (flyScope.dataOperationControlVerdict2.pageBusy ?? 0) + 1;
    flyScope.dataOperationControlVerdict2.pageBusy = tries;
    let rateLimitedOf2: Dynamic = rateLimitedOf(flyScope.rep2);
    let waitMs: Dynamic =
      rateLimitedOf2 === null
        ? resolveDataOperationControlRound3(
            tries,
            flyScope.pageBusyOf2,
            operationScope.dataOperationControlVerdict.random ??
              ((..._extraArguments: unknown[]) => 1),
          )
        : Math.min(
            RATE_LIMITED_CAP_MS,
            Math.max(
              rateLimitedOf2,
              resolveDataOperationControlRound3(
                tries,
                flyScope.pageBusyOf2,
                operationScope.dataOperationControlVerdict.random ??
                  ((..._extraArguments: unknown[]) => 1),
              ),
            ),
          );
    if (rateLimitedOf2 !== null) {
      flyScope.dataOperationControlVerdict2.rateHeld =
        (flyScope.dataOperationControlVerdict2.rateHeld ?? 0) + waitMs;
    }
    let pure = !this.troubled();
    if (resolveDataOperationControlValue19(flyScope.rep2)) {
      if (
        flyScope.isDataOperationControlDeny22 &&
        flyScope.dataOperationControlVerdict2.lost !== true
      ) {
        flyScope.dataOperationControlVerdict2.unknownLost = true;
      } else {
        if (!flyScope.isDataOperationControlDeny22) {
          flyScope.dataOperationControlVerdict2.unknownLost = false;
        }
      }
      flyScope.dataOperationControlVerdict2.lost = true;
    }
    (0, operationScope.judged)(
      flyScope.record5,
      flyScope.rep2,
      `retried`,
      (0, flyScope.state2)(),
    );
    reportOperationEvent(`write.pageBusy`, {
      opId: flyScope.dataOperationControlVerdict2.opId,
      tries: tries,
      waitMs: waitMs,
      askedMs: rateLimitedOf2 ?? flyScope.pageBusyOf2,
      pure: pure,
      ...(flyScope.isDataOperationControlDeny22
        ? {
            unknown: flyScope.dataOperationControlVerdict2.unknownTries,
          }
        : {}),
      ...(rateLimitedOf2 === null
        ? {}
        : {
            rate: true,
          }),
    });
    this.slow = true;
    if (resolveDataOperationControlAllow(flyScope.rep2) !== null) {
      this.unsayBusy();
      this.emit({
        t: `state`,
        node: this.node,
        state: `saving`,
        words: DataOperationControlMessage2,
        storeShed: true,
      });
    } else if (pure) {
      this.busySaid = true;
      this.emit({
        t: `state`,
        node: this.node,
        state: `saving`,
        pageBusy: true,
        ...(flyScope.isDataOperationControlDeny22
          ? {
              unknown: true,
            }
          : tries > 1
            ? {
                words: DataOperationControlMessage3,
              }
            : {}),
      });
    } else {
      let words =
        flyScope.dataOperationControlVerdict2.tries > 0 ||
        flyScope.dataOperationControlVerdict2.lost === true
          ? flyScope.dataOperationControlVerdict2.tries > 2
            ? DataOperationControlMessage14
            : DataOperationControlMessage13
          : (flyScope.dataOperationControlVerdict2.busyTries ?? 0) > 0
            ? (flyScope.dataOperationControlVerdict2.busyTries ?? 0) > 2
              ? DataOperationControlMessage8
              : undefined
            : DataOperationControlMessage13;
      this.unsayBusy();
      this.emit({
        t: `state`,
        node: this.node,
        state: `saving`,
        ...(words === undefined
          ? {}
          : {
              words: words,
            }),
      });
    }
    if (!this.served && this.stuckReplay()) {
      this.read(undefined);
    }
    this.retryTimer =
      operationScope.dataOperationControlVerdict.timers.setTimeout(
        (..._extraArguments: unknown[]): undefined => {
          this.retryTimer = null;
          if (!operationScope.enabled && !this.dead) {
            this.fly(flyScope.dataOperationControlVerdict2);
          }
        },
        waitMs,
      );
    return true;
  }
  return false;
}
export function retryBusyWrite(
  this: Dynamic,
  operationScope: Pick<
    OperationControllerScope,
    | "enabled18"
    | "emit5"
    | "enabled19"
    | "dataOperationControlVerdict"
    | "judged"
    | "kind"
    | "loadDataOperationControlVerdictHandler25"
    | "enabled"
  >,
  flyScope: {
    refusalClass2: Dynamic;
    enabled27: Dynamic;
    rep2: Dynamic;
    number2: Dynamic;
    data2: Dynamic;
    enabled28: Dynamic;
    matchesClassify: Dynamic;
    dataOperationControlVerdict2: Dynamic;
    classify2: Dynamic;
    record5: Dynamic;
    state2: Dynamic;
    batchesDone: Dynamic;
  },
): boolean {
  if (
    (flyScope.refusalClass2 === null
      ? flyScope.enabled27 ||
        flyScope.rep2.verdict === `unreachable` ||
        (flyScope.rep2.verdict !== `allow` &&
          (flyScope.number2 >= 0 ||
            /unavailable|busy|rate[-_ ]?limit/.test(
              String(flyScope.data2.code ?? flyScope.rep2.reason),
            ) ||
            flyScope.data2.transient === true ||
            flyScope.rep2.transient === true))
      : flyScope.enabled27 || flyScope.enabled28 || flyScope.matchesClassify) &&
    flyScope.dataOperationControlVerdict2.busyOut !== true
  ) {
    if (
      flyScope.rep2.verdict === `unreachable` ||
      resolveDataOperationControlValue19(flyScope.rep2)
    ) {
      flyScope.dataOperationControlVerdict2.lost = true;
    }
    flyScope.dataOperationControlVerdict2.unknownLost = false;
    let difference: Dynamic =
      flyScope.dataOperationControlVerdict2.tries -
      (flyScope.dataOperationControlVerdict2.triesBase ?? 0);
    if (
      flyScope.matchesClassify &&
      difference >= (operationScope.enabled18 ? 0 : flyScope.classify2.max)
    ) {
      flyScope.dataOperationControlVerdict2.tries += 1;
      flyScope.dataOperationControlVerdict2.triesBase =
        flyScope.dataOperationControlVerdict2.tries;
      this.inflight = null;
      this.queue.unshift(flyScope.dataOperationControlVerdict2);
      (0, operationScope.emit5)(
        `unreached`,
        `${flyScope.classify2.reason}${flyScope.classify2.sub === undefined ? `` : `/${flyScope.classify2.sub}`} ×${difference}`,
      );
      return true;
    }
    if (
      flyScope.classify2?.k === `transient` &&
      flyScope.classify2.redial &&
      !operationScope.enabled19 &&
      difference + 1 >= flyScope.refusalClass2.REDIAL_AT &&
      operationScope.dataOperationControlVerdict.redial
    ) {
      operationScope.enabled19 = true;
      operationScope.dataOperationControlVerdict.redial();
    }
    if (
      flyScope.rep2.reopens === true &&
      !this.nodeGone &&
      (resolveDataOperationControlSome3(
        flyScope.dataOperationControlVerdict2,
      ) ||
        isDataOperationControlBatchesDone(
          flyScope.dataOperationControlVerdict2,
        ))
    ) {
      (0, operationScope.judged)(
        flyScope.record5,
        flyScope.rep2,
        `moored`,
        (0, flyScope.state2)(),
      );
      flyScope.dataOperationControlVerdict2.tries += 1;
      this.emit(
        operationScope.kind === null
          ? {
              t: `state`,
              node: this.node,
              state: `saving`,
              words:
                flyScope.dataOperationControlVerdict2.tries > 2
                  ? DataOperationControlMessage14
                  : DataOperationControlMessage13,
            }
          : (0, operationScope.loadDataOperationControlVerdictHandler25)(
              this.node,
            ),
      );
      this.moor(flyScope.dataOperationControlVerdict2);
      return true;
    }
    let amount: Dynamic =
      flyScope.rep2.hung === true &&
      flyScope.dataOperationControlVerdict2.late?.b === flyScope.batchesDone
        ? dataOperationControlValue8000 / 2
        : resolveDataOperationControlValue26(
            Math.max(
              flyScope.number2,
              flyScope.enabled28 && flyScope.classify2?.k === `bounded`
                ? flyScope.classify2.floorMs
                : 0,
            ),
            resolveDataOperationControlRound2(
              Math.min(
                dataOperationControlValue5000,
                dataOperationControlValue1000 *
                  2 ** flyScope.dataOperationControlVerdict2.tries,
              ),
              operationScope.dataOperationControlVerdict.random ??
                ((..._extraArguments: unknown[]) => 1),
            ),
          );
    (0, operationScope.judged)(
      flyScope.record5,
      flyScope.rep2,
      `retried`,
      (0, flyScope.state2)(),
    );
    flyScope.dataOperationControlVerdict2.tries += 1;
    this.slow = true;
    let rowsDone: Dynamic = flyScope.data2.rowsDone ?? flyScope.data2.rows_done;
    let rowsTotal: Dynamic =
      flyScope.data2.rowsTotal ?? flyScope.data2.rows_total;
    let matchesCondition =
      typeof rowsTotal == `number` &&
      `Server is loading this document (${String(rowsDone)}/${rowsTotal})\u2026`;
    let matchesDataOperationControlAllow =
      resolveDataOperationControlAllow(flyScope.rep2) !== null;
    let words =
      matchesCondition ||
      (flyScope.dataOperationControlVerdict2.tries > 2
        ? DataOperationControlMessage14
        : matchesDataOperationControlAllow
          ? `Having trouble saving — retrying…`
          : DataOperationControlMessage13);
    this.emit(
      operationScope.kind === null
        ? {
            t: `state`,
            node: this.node,
            state: `saving`,
            words: words,
            ...(matchesDataOperationControlAllow
              ? {
                  storeShed: true,
                }
              : {}),
          }
        : (0, operationScope.loadDataOperationControlVerdictHandler25)(
            this.node,
          ),
    );
    if (!this.served && this.stuckReplay()) {
      this.read(undefined);
    }
    flyScope.dataOperationControlVerdict2.parked = true;
    if (flyScope.classify2 !== null && this.retryTimer !== null) {
      operationScope.dataOperationControlVerdict.timers.clearTimeout(
        this.retryTimer,
      );
    }
    this.retryTimer =
      operationScope.dataOperationControlVerdict.timers.setTimeout(
        (..._extraArguments: unknown[]): undefined => {
          this.retryTimer = null;
          if (
            !operationScope.enabled &&
            !this.dead &&
            !this.parkIfDown(flyScope.dataOperationControlVerdict2)
          ) {
            this.fly(flyScope.dataOperationControlVerdict2);
          }
        },
        amount,
      );
    return true;
  }
  return false;
}
export function remintRequiredWriteIds(
  this: Dynamic,
  operationScope: Pick<
    OperationControllerScope,
    "dataOperationControlVerdict" | "lookup" | "emit8" | "trim" | "judged"
  >,
  flyScope: {
    filteredMinted: Dynamic;
    enabled31: Dynamic;
    dataOperationControlVerdict2: Dynamic;
    data2: Dynamic;
    label6: Dynamic;
    record4: Dynamic;
    loadDataOperationControlVerdictResult22: Dynamic;
    record5: Dynamic;
    rep2: Dynamic;
    state2: Dynamic;
  },
): boolean {
  if (
    flyScope.filteredMinted.length > 0 &&
    flyScope.enabled31 &&
    flyScope.dataOperationControlVerdict2.rewidened !== true
  ) {
    let opIndex5: Dynamic =
      typeof flyScope.data2.opIndex == `number`
        ? flyScope.data2.opIndex
        : Number(/^ops\[(\d+)\]/.exec(flyScope.label6)?.[1] ?? 0);
    let total2: Dynamic =
      flyScope.record4.kStart +
      resolveDataOperationControlValue17(
        flyScope.loadDataOperationControlVerdictResult22.from,
        Number.isInteger(opIndex5) &&
          opIndex5 >= 0 &&
          opIndex5 < flyScope.loadDataOperationControlVerdictResult22.ops.length
          ? opIndex5
          : 0,
      );
    let opItem3: Dynamic = flyScope.dataOperationControlVerdict2.ops[total2];
    let dataOperationControlHeader: Dynamic =
      opItem3 === undefined
        ? null
        : resolveDataOperationControlHeader(opItem3, flyScope.filteredMinted);
    let editorExtensionsSess3: Dynamic =
      dataOperationControlHeader &&
      isPlainRecord(dataOperationControlHeader.ids)
        ? resolveEditorExtensionsSess(
            String(dataOperationControlHeader.ids.from),
          )
        : null;
    let label7: Dynamic =
      operationScope.dataOperationControlVerdict.session.get()?.label;
    if (
      dataOperationControlHeader &&
      editorExtensionsSess3 &&
      label7 !== undefined &&
      editorExtensionsSess3.sess === label7
    ) {
      let difference2 = editorExtensionsSess3.i + Number(opItem3.ids.count) - 1;
      let difference3 =
        editorExtensionsSess3.i +
        Number(dataOperationControlHeader.ids.count) -
        1;
      let lookup3: Dynamic = new (Map as Dynamic)();
      for (let loadDataOperationControlVerdictResult25 of [
        ...flyScope.dataOperationControlVerdict2.predicted
          .slice(total2 + 1)
          .flat(),
        ...flyScope.dataOperationControlVerdict2.ops
          .slice(total2 + 1)
          .flatMap(
            (opsSlice?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              resolveDataOperationControlFlatMap2([
                opsSlice.id,
                isPlainRecord(opsSlice.ids) ? opsSlice.ids.from : opsSlice.ids,
              ]),
          ),
      ] as Dynamic) {
        let dataOperationControlStartsWith: Dynamic =
          resolveDataOperationControlStartsWith(
            loadDataOperationControlVerdictResult25,
            label7,
          );
        if (dataOperationControlStartsWith > difference2) {
          lookup3.set(
            loadDataOperationControlVerdictResult25,
            resolveEditorExtensionsValue22(
              label7,
              dataOperationControlStartsWith + flyScope.filteredMinted.length,
            ),
          );
        }
      }
      if (lookup3.size > 0) {
        flyScope.dataOperationControlVerdict2.editorSaid ??=
          flyScope.dataOperationControlVerdict2.predicted;
      }
      flyScope.dataOperationControlVerdict2.ops = getDataOperationControlSize(
        flyScope.dataOperationControlVerdict2.ops,
        lookup3,
      ).map(
        (
          dataOperationControlSize?: Dynamic,
          index5?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          index5 === total2
            ? dataOperationControlHeader
            : dataOperationControlSize,
      );
      flyScope.dataOperationControlVerdict2.predicted =
        getDataOperationControlSize(
          flyScope.dataOperationControlVerdict2.predicted,
          lookup3,
        );
      flyScope.dataOperationControlVerdict2.homes &&=
        getDataOperationControlSize(
          flyScope.dataOperationControlVerdict2.homes,
          lookup3,
        );
      let hwm = difference3;
      for (let loadDataOperationControlVerdictResult25 of [
        this,
        ...[...operationScope.lookup.values()].filter(
          (item3?: Dynamic, ..._extraArguments: unknown[]) => item3 !== this,
        ),
      ] as Dynamic)
        hwm = Math.max(
          hwm,
          loadDataOperationControlVerdictResult25.bump(label7, hwm),
        );
      let sessionEntry: Dynamic =
        operationScope.dataOperationControlVerdict.session.get();
      if (hwm > sessionEntry.hwm) {
        operationScope.dataOperationControlVerdict.session.set({
          ...sessionEntry,
          hwm: hwm,
        });
      }
      (0, operationScope.emit8)();
      flyScope.dataOperationControlVerdict2.rewidened = true;
      (0, operationScope.trim)(this, flyScope.dataOperationControlVerdict2);
      reportOperationEvent(`deny.required.rewiden`, {
        opId: flyScope.dataOperationControlVerdict2.opId,
        k: total2,
        pads: flyScope.filteredMinted.length,
        from: String(dataOperationControlHeader.ids.from),
        count: Number(dataOperationControlHeader.ids.count),
        shifted: lookup3.size,
      });
      (0, operationScope.judged)(
        flyScope.record5,
        flyScope.rep2,
        `rewiden`,
        (0, flyScope.state2)(),
      );
      this.fly(flyScope.dataOperationControlVerdict2);
      return true;
    }
  }
  return false;
}
