/** BaoCut: operation controller node write. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import type { OperationControllerScope } from "./controller-contracts";
import {
  RATE_LIMITED_CAP_MS,
  pageBusyOf,
} from "../services/session-and-sources-1";
import { reportOperationEvent } from "../observability/boot";
import {
  DataOperationControlEditorOpError,
  DataOperationControlProse,
  filterDataOperationControlData,
  filterDataOperationControlOps,
  isDataOperationControlGot,
  isDataOperationControlOps,
  resolveDataOperationControlIdInvalid,
  resolveDataOperationControlSpell,
  resolveDataOperationControlValue10,
  resolveDataOperationControlValue17,
} from "../data/operation-control-1";
import {
  DataOperationControlAnswerTooLarge,
  DataOperationControlAnswerUnmaskable,
  DataOperationControlMessage3,
  DataOperationControlMessage8,
  DataOperationControlPageGone,
  DataOperationControlVerdictLost,
  DataOperationControlWhy2,
  dataOperationControlValue20005,
  dataOperationControlValue64,
  filterDataOperationControlDeny,
  isDataOperationControlAllow,
  isDataOperationControlDeny2,
  isDataOperationControlDeny7,
  isDataOperationControlUnreachable,
  resolveDataOperationControlAuthor,
  resolveDataOperationControlEvery3,
  resolveDataOperationControlValue22,
  resolveDataOperationControlVerdict,
} from "../data/operation-control-2";
import {
  DataOperationControlMessage16,
  dataOperationControlIdentifierPattern4,
  dataOperationControlPattern11,
  dataOperationControlSet17,
  dataOperationControlSet19,
  getDataOperationControlSize,
  isDataOperationControlRevive,
  isPlainRecord,
  resolveDataOperationControlAnchorGone,
  resolveDataOperationControlChars3,
  resolveDataOperationControlExec,
  resolveDataOperationControlFlat3,
  resolveDataOperationControlFlatMap2,
  resolveDataOperationControlKStart,
  resolveDataOperationControlReplace3,
  resolveDataOperationControlStartsWith,
  resolveDataOperationControlSure,
  resolveDataOperationControlText,
  updateDataOperationControlBid,
} from "../data/operation-control-4";
import {
  repairWriteSession,
  retryUnknownWrite,
  retryWriteConflict,
  retryBusyWrite,
  remintRequiredWriteIds,
} from "./write-retries";
import { deriveWriteEffects } from "./write-effects";
import {
  classifyWriteDenial,
  describeWriteDenial,
  emitWriteDenial,
} from "./write-denial";
export function createOperationNodeWrite(
  operationScope: Pick<
    OperationControllerScope,
    | "editorArm"
    | "dataOperationControlVerdict"
    | "enabled"
    | "kind"
    | "loadDataOperationControlVerdictHandler25"
    | "loadDataOperationControlVerdictHandler3"
    | "capsSettled2"
    | "loadDataOperationControlVerdictHandler23"
    | "loadDataOperationControlVerdictHandler24"
    | "round"
    | "reconcile"
    | "loadDataOperationControlVerdictHandler26"
    | "visibility"
    | "test2"
    | "judged"
    | "enabled3"
    | "record3"
    | "info"
    | "pump2"
    | "emit7"
    | "lookup"
    | "trim"
    | "uniqueItems6"
    | "loadDataOperationControlVerdictResult10"
    | "pageStopped"
    | "resolveDataOperationControlWhy2"
    | "refusalClass"
    | "enabled18"
    | "index3"
    | "emit5"
    | "uniqueItems4"
    | "enabled19"
    | "emit6"
    | "index4"
    | "rearmGap"
    | "emit2"
    | "readsResume"
    | "enabled2"
    | "count4"
    | "state"
    | "enabled21"
    | "loadDataOperationControlVerdictHandler27"
    | "rekeyHolds3"
    | "rekeyHolds4"
    | "emit8"
    | "loadDataOperationControlVerdictResult18"
  >,
): Record<string, Dynamic> {
  const methods: Record<string, Dynamic> & ThisType<Dynamic> = {
    async fly(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<undefined> {
      if (
        !dataOperationControlVerdict2.assert &&
        !dataOperationControlVerdict2.replayed
      )
        for (let loadDataOperationControlVerdictResult22 of dataOperationControlVerdict2.predicted as Dynamic)
          for (let loadDataOperationControlVerdictResult23 of loadDataOperationControlVerdictResult22 as Dynamic)
            this.proposedEver.add(loadDataOperationControlVerdictResult23);
      dataOperationControlVerdict2.cuts ??= resolveDataOperationControlKStart(
        dataOperationControlVerdict2.ops,
        operationScope.editorArm ? resolveDataOperationControlSpell : undefined,
      ).map(
        (
          dataOperationControlKStart?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => dataOperationControlKStart.kStart,
      );
      let cuts: Dynamic = dataOperationControlVerdict2.cuts;
      for (
        let batchesDone: Dynamic = dataOperationControlVerdict2.batchesDone;
        batchesDone < cuts.length;
        batchesDone++
      ) {
        let [kStart, setKStart]: Dynamic = [
          cuts[batchesDone],
          cuts[batchesDone + 1] ?? dataOperationControlVerdict2.ops.length,
        ];
        if (
          batchesDone > 0 &&
          (dataOperationControlVerdict2.ratePace ?? 0) > 0 &&
          dataOperationControlVerdict2.pacedFor !== batchesDone
        ) {
          let waitMs: Dynamic = dataOperationControlVerdict2.ratePace;
          dataOperationControlVerdict2.pacedFor = batchesDone;
          dataOperationControlVerdict2.rateHeld =
            (dataOperationControlVerdict2.rateHeld ?? 0) + waitMs;
          reportOperationEvent(`write.ratePace`, {
            opId: dataOperationControlVerdict2.opId,
            update: batchesDone + 1,
            of: cuts.length,
            waitMs: waitMs,
          });
          this.slow = true;
          if (!this.troubled()) {
            this.busySaid = true;
            this.emit({
              t: `state`,
              node: this.node,
              state: `saving`,
              pageBusy: true,
              words: DataOperationControlMessage3,
            });
          }
          this.retryTimer =
            operationScope.dataOperationControlVerdict.timers.setTimeout(
              (..._extraArguments: unknown[]): undefined => {
                this.retryTimer = null;
                if (!operationScope.enabled && !this.dead) {
                  this.fly(dataOperationControlVerdict2);
                }
              },
              waitMs,
            );
          return;
        }
        let record4: Dynamic = {
          kStart: kStart,
          ops: dataOperationControlVerdict2.ops.slice(kStart, setKStart),
        };
        let opId = `${dataOperationControlVerdict2.opId}${dataOperationControlVerdict2.rewidened ? DataOperationControlMessage16 : ``}${cuts.length === 1 ? `` : `:${kStart}-${setKStart - 1}`}`;
        let setTimeout2: Dynamic =
          operationScope.dataOperationControlVerdict.timers.setTimeout(
            (..._extraArguments: unknown[]): undefined => {
              this.slow = true;
              this.emit(
                operationScope.kind === null
                  ? {
                      t: `state`,
                      node: this.node,
                      state: `saving`,
                      words: DataOperationControlMessage8,
                    }
                  : (0,
                    operationScope.loadDataOperationControlVerdictHandler25)(
                      this.node,
                    ),
              );
            },
            dataOperationControlValue20005,
          );
        let late2: Dynamic =
          dataOperationControlVerdict2.late?.b === batchesDone
            ? dataOperationControlVerdict2.late
            : undefined;
        let rep: Dynamic =
          dataOperationControlVerdict2.late?.b === batchesDone
            ? dataOperationControlVerdict2.late.rep
            : undefined;
        if (dataOperationControlVerdict2.late?.b === batchesDone) {
          dataOperationControlVerdict2.late = undefined;
        }
        let predicted: Dynamic = dataOperationControlVerdict2.predicted.slice(
          record4.kStart,
          setKStart,
        );
        let loadDataOperationControlVerdictResult22: Dynamic;
        try {
          loadDataOperationControlVerdictResult22 = operationScope.editorArm
            ? filterDataOperationControlOps(record4.ops, predicted, {
                wrapFinal: (0,
                operationScope.loadDataOperationControlVerdictHandler3)(
                  `wrapFinal`,
                ),
              })
            : isDataOperationControlOps(record4.ops);
        } catch (loadDataOperationControlVerdictResult25: Dynamic) {
          operationScope.dataOperationControlVerdict.timers.clearTimeout(
            setTimeout2,
          );
          if (
            !(
              loadDataOperationControlVerdictResult25 instanceof
              (DataOperationControlEditorOpError as Dynamic)
            )
          )
            throw loadDataOperationControlVerdictResult25;
          this.emit({
            t: `deny`,
            node: this.node,
            opId: dataOperationControlVerdict2.opId,
            reason: `unsupported_edit`,
            detail: {
              code: `unsupported_edit`,
              why: loadDataOperationControlVerdictResult25.why,
              layer: `page`,
              opIndex: kStart + loadDataOperationControlVerdictResult25.k,
              pointed: true,
              words: `That edit cannot be sent from this page (it addresses text by search).`,
            },
          });
          this.owed = this.oweWhole = true;
          await this.settleOne(dataOperationControlVerdict2);
          return;
        }
        let record5: Dynamic = {
          verb: `update`,
          opId: opId,
          payload: operationScope.editorArm
            ? {
                engine: DataOperationControlProse,
                ops: loadDataOperationControlVerdictResult22.ops,
              }
            : {
                ops: loadDataOperationControlVerdictResult22.ops,
              },
        };
        if (
          resolveDataOperationControlEvery3(
            loadDataOperationControlVerdictResult22.ops,
          ) &&
          (0, operationScope.capsSettled2)()
        ) {
          record5.stream = true;
        }
        let now2: Dynamic = operationScope.dataOperationControlVerdict.now?.();
        let rep2: Dynamic =
          rep ??
          (await this.door(
            record5,
            (
              dataOperationControlVerdict3?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              dataOperationControlVerdict2.late = {
                b: batchesDone,
              };
              let dataOperationControlVerdictHandler: Dynamic = (0,
              operationScope.loadDataOperationControlVerdictHandler23)();
              dataOperationControlVerdict3.then(
                (
                  result?: Dynamic,
                  ..._extraArguments: unknown[]
                ): undefined => {
                  let filterDataOperationControlData2: Dynamic =
                    operationScope.editorArm
                      ? filterDataOperationControlData(result)
                      : result;
                  if (
                    dataOperationControlVerdict2.late?.b === batchesDone &&
                    !this.nodeGone &&
                    isPlainRecord(filterDataOperationControlData2) &&
                    filterDataOperationControlData2.verdict === `unreachable` &&
                    filterDataOperationControlData2.reopens === true
                  )
                    return void this.moor(dataOperationControlVerdict2);
                  if (
                    !(
                      dataOperationControlVerdict2.late?.b !== batchesDone ||
                      !isPlainRecord(filterDataOperationControlData2) ||
                      (filterDataOperationControlData2.verdict !== `allow` &&
                        filterDataOperationControlData2.verdict !== `deny`)
                    )
                  ) {
                    dataOperationControlVerdict2.late.rep =
                      filterDataOperationControlData2;
                    if (
                      this.retryTimer !== null &&
                      this.inflight === dataOperationControlVerdict2 &&
                      !operationScope.enabled &&
                      !this.dead
                    ) {
                      operationScope.dataOperationControlVerdict.timers.clearTimeout(
                        this.retryTimer,
                      );
                      this.retryTimer = null;
                      dataOperationControlVerdict2.parked = false;
                      this.fly(dataOperationControlVerdict2);
                    } else {
                      if (
                        filterDataOperationControlData2.verdict === `allow` &&
                        !this.dead &&
                        this.inflight === null &&
                        this.queue[0] === dataOperationControlVerdict2 &&
                        (0,
                        operationScope.loadDataOperationControlVerdictHandler24)(
                          dataOperationControlVerdictHandler,
                        ) &&
                        operationScope.kind !== `refusing`
                      ) {
                        (0, operationScope.round)(`head`, now2, true);
                      }
                    }
                  }
                },
                (..._extraArguments: unknown[]): undefined => undefined,
              );
            },
          ));
        operationScope.dataOperationControlVerdict.timers.clearTimeout(
          setTimeout2,
        );
        if (!rep2) return;
        if (operationScope.editorArm) {
          rep2 = filterDataOperationControlData(rep2);
        }
        if (
          late2 !== undefined &&
          late2.rep === undefined &&
          dataOperationControlVerdict2.late === undefined &&
          rep2.verdict === `unreachable` &&
          rep2.hung !== true &&
          rep2.reopens !== true
        ) {
          dataOperationControlVerdict2.late = late2;
        }
        let matchesVerdictLostTries =
          (dataOperationControlVerdict2.verdictLostTries ?? 0) > 0;
        if (isDataOperationControlUnreachable(rep2)) {
          let total2: Dynamic =
            (dataOperationControlVerdict2.verdictLostTries ?? 0) + 1;
          dataOperationControlVerdict2.verdictLostTries = total2;
          let was =
            rep2.reason === `answer-unmaskable` || rep2.status === 422
              ? DataOperationControlAnswerUnmaskable
              : DataOperationControlAnswerTooLarge;
          reportOperationEvent(`ack.verdictLost`, {
            opId: opId,
            ops: loadDataOperationControlVerdictResult22.ops.length,
            status: typeof rep2.status == `number` ? rep2.status : -1,
            n: total2,
            ...(total2 > 1
              ? {
                  terminal: true,
                }
              : {}),
          });
          if (total2 > 1) {
            dataOperationControlVerdict2.boundOut = true;
            rep2 = {
              verdict: `deny`,
              reason: DataOperationControlVerdictLost,
              ...(typeof rep2.status == `number`
                ? {
                    status: rep2.status,
                  }
                : {}),
              detail: `the server refused this change; its answer could not be carried`,
              data: {
                terminal: true,
                was: was,
                code: DataOperationControlVerdictLost,
                maybeLanded: true,
              },
            };
          } else {
            rep2 = {
              verdict: `unreachable`,
              lost: true,
              verdictLost: true,
              ...(typeof rep2.status == `number`
                ? {
                    status: rep2.status,
                  }
                : {}),
            };
          }
        } else if (
          (rep2.verdict === `allow` || rep2.verdict === `deny`) &&
          filterDataOperationControlDeny(rep2) === null &&
          pageBusyOf(rep2) === null &&
          !isDataOperationControlDeny2(rep2) &&
          !isDataOperationControlDeny7(rep2)
        ) {
          dataOperationControlVerdict2.verdictLostTries = 0;
        }
        if (
          matchesVerdictLostTries &&
          rep2.verdict === `allow` &&
          rep2.replayed === true &&
          !Array.isArray((isPlainRecord(rep2.data) ? rep2.data : {}).results)
        ) {
          rep2 = {
            ...rep2,
            ackTooLarge: true,
          };
        }
        if (isDataOperationControlDeny7(rep2)) {
          reportOperationEvent(`ack.conflictLost`, {
            opId: opId,
            ops: loadDataOperationControlVerdictResult22.ops.length,
            status: typeof rep2.status == `number` ? rep2.status : -1,
            now: true,
          });
          rep2 = resolveDataOperationControlVerdict(rep2);
        }
        if (isDataOperationControlAllow(rep2)) {
          let data3: Dynamic = isPlainRecord(rep2.data) ? rep2.data : {};
          let isArray2 =
            Array.isArray(data3.results) &&
            data3.results.length > 0 &&
            !(
              Array.isArray(data3.dropped) && data3.dropped.includes(`results`)
            );
          rep2 = {
            ...rep2,
            verdict: `allow`,
            reason: undefined,
            changed: true,
            ackTooLarge: true,
            data: {
              ...data3,
              changed: true,
              ...(isArray2
                ? {}
                : {
                    results: loadDataOperationControlVerdictResult22.ops.map(
                      (..._extraArguments: unknown[]) => ({
                        changed: true,
                      }),
                    ),
                  }),
            },
          };
          this.owed = true;
          if (operationScope.reconcile) {
            this.oweWhole = true;
          }
          reportOperationEvent(`ack.tooLarge`, {
            opId: opId,
            ops: loadDataOperationControlVerdictResult22.ops.length,
            status: typeof rep2.status == `number` ? rep2.status : -1,
            replayed: rep2.replayed === true,
          });
          console.info(
            `opTransport: an update landed but its answer was too large to carry (${opId}, ${loadDataOperationControlVerdictResult22.ops.length} op${loadDataOperationControlVerdictResult22.ops.length === 1 ? `` : `s`}) — taken as saved; the document is read back for what the answer could not say`,
          );
        }
        let state2: Dynamic = (..._extraArguments: unknown[]): Dynamic => ({
          road: `write`,
          verb: `update`,
          node: this.node,
          seated: (0,
          operationScope.loadDataOperationControlVerdictHandler26)(),
          opId: opId,
          replayed: dataOperationControlVerdict2.replayed === true,
          kStart: kStart,
          lost: dataOperationControlVerdict2.lost === true,
          tries: dataOperationControlVerdict2.tries,
          stream: record5.stream === true,
          ops: loadDataOperationControlVerdictResult22.ops.length,
          vis: operationScope.visibility.state(),
          feedUp: this.feedUp,
        });
        if (
          (0, operationScope.test2)(
            rep2,
            operationScope.editorArm
              ? loadDataOperationControlVerdictResult22
              : undefined,
          )
        ) {
          (0, operationScope.judged)(record5, rep2, `stalled`, state2());
          operationScope.enabled3 = true;
          operationScope.record3 = {};
          this.inflight = null;
          this.queue.unshift(dataOperationControlVerdict2);
          (0, operationScope.info)();
          console.warn(
            `opTransport: interlock — the door refused a write by SHAPE (it does not speak one order); kept queued and logged, nothing more is sent until it does`,
            dataOperationControlVerdict2.opId,
            String(rep2.reason),
          );
          resolveDataOperationControlValue22(
            `shape_queued`,
            dataOperationControlVerdict2.lost === true ||
              dataOperationControlVerdict2.tries > 0,
          );
          (0, operationScope.pump2)();
          (0, operationScope.emit7)();
          return;
        }
        let matchesReplayed =
          rep2.verdict === `allow`
            ? rep2.replayed === true
            : rep2.verdict === `deny` &&
              /op_id_conflict/.test(
                `${String(rep2.reason)} ${String((isPlainRecord(rep2.data) ? rep2.data : {}).code)}`,
              );
        let data: Dynamic = isPlainRecord(rep2.data) ? rep2.data : {};
        let isArray =
          Array.isArray(data.results) ||
          [data.rev, data.firstRev, rep2.rev].some(
            (item3?: unknown, ..._extraArguments: unknown[]) =>
              typeof item3 == `number`,
          );
        let matchesTries =
          (dataOperationControlVerdict2.tries > 0 ||
            (dataOperationControlVerdict2.busyTries ?? 0) > 0 ||
            (dataOperationControlVerdict2.pageBusy ?? 0) > 0) &&
          !dataOperationControlVerdict2.replayed &&
          !dataOperationControlVerdict2.loggedAs &&
          (rep2.verdict === `allow` || isArray);
        let replayed: Dynamic =
          dataOperationControlVerdict2.replayed &&
          !dataOperationControlVerdict2.loggedAs &&
          dataOperationControlVerdict2.sent === true;
        if (
          rep2.verdict === `deny` &&
          isPlainRecord(rep2.data) &&
          !dataOperationControlVerdict2.replayed
        ) {
          let sessionEntry: Dynamic =
            operationScope.dataOperationControlVerdict.session.get();
          let isDataOperationControlGot2: Dynamic = isDataOperationControlGot(
            rep2,
            rep2.data,
            sessionEntry?.label,
            dataOperationControlVerdict2.predicted,
          );
          if (isDataOperationControlGot2) {
            reportOperationEvent(`deny.id_conflict.recount`, {
              opId: dataOperationControlVerdict2.opId,
              problem: String(rep2.data.problem),
              k: typeof rep2.data.opIndex == `number` ? rep2.data.opIndex : -1,
              got: resolveDataOperationControlStartsWith(
                isDataOperationControlGot2.got,
                sessionEntry.label,
              ),
              hwm: sessionEntry.hwm,
              nearest: resolveDataOperationControlStartsWith(
                isDataOperationControlGot2.next_free,
                sessionEntry.label,
              ),
              again: this.recounting,
            });
            Object.assign(rep2.data, {
              was: `id_invalid`,
              why: `used`,
              got: isDataOperationControlGot2.got,
              next_free: isDataOperationControlGot2.next_free,
            });
          }
        }
        let loadDataOperationControlVerdictResult23: Dynamic = null;
        let enabled26 = false;
        if (rep2.verdict === `deny`) {
          let data3: Dynamic = isPlainRecord(rep2.data) ? rep2.data : {};
          if (
            (typeof data3.why == `string`
              ? data3.why
              : /\bproposed ids: ([a-z_]+)/.exec(
                  `${String(data3.detail)} ${String(rep2.detail)}`,
                )?.[1]) === `used` &&
            typeof data3.got == `string` &&
            resolveDataOperationControlIdInvalid(rep2, data3)
          ) {
            let opIndex: Dynamic =
              typeof data3.opIndex == `number`
                ? data3.opIndex
                : Number(
                    /^ops\[(\d+)\]/.exec(
                      `${String(data3.detail ?? rep2.detail ?? ``)}`,
                    )?.[1] ?? 0,
                  );
            let dataOperationControlValue17: Dynamic =
              resolveDataOperationControlValue17(
                loadDataOperationControlVerdictResult22.from,
                Number.isInteger(opIndex) &&
                  opIndex >= 0 &&
                  opIndex < loadDataOperationControlVerdictResult22.ops.length
                  ? opIndex
                  : 0,
              );
            let opItem: Dynamic = record4.ops[dataOperationControlValue17];
            let items3: Dynamic =
              opItem?.op === `split`
                ? typeof opItem.id == `string`
                  ? [opItem.id]
                  : Array.isArray(opItem.ids)
                    ? opItem.ids.filter(
                        (id?: unknown, ..._extraArguments: unknown[]) =>
                          typeof id == `string`,
                      )
                    : (predicted[dataOperationControlValue17] ?? [])
                : [];
            if (
              opItem &&
              items3.includes(data3.got) &&
              opItem.resurrect !== data3.got
            ) {
              let heldSplitStands = await this.heldSplitStands(
                opItem,
                items3[items3.length - 1],
              );
              let alone: Dynamic = record4.ops.every(
                (
                  op2?: unknown,
                  index5?: Dynamic,
                  ..._extraArguments: unknown[]
                ) =>
                  index5 === dataOperationControlValue17 ||
                  (predicted[index5] ?? []).length === 0,
              );
              if (heldSplitStands?.how === `stands` && alone) {
                loadDataOperationControlVerdictResult23 = {
                  rev: heldSplitStands.rev,
                };
              } else {
                if (heldSplitStands?.how !== `elsewhere`) {
                  enabled26 = true;
                }
              }
              reportOperationEvent(`deny.used.split`, {
                opId: dataOperationControlVerdict2.opId,
                k: record4.kStart + dataOperationControlValue17,
                how: heldSplitStands?.how ?? `unknown`,
                alone: alone,
                named: items3.length,
              });
            }
          }
        }
        if (
          loadDataOperationControlVerdictResult23 ||
          (matchesReplayed &&
            (((dataOperationControlVerdict2.replayed ||
              dataOperationControlVerdict2.lost) &&
              dataOperationControlVerdict2.loggedAs) ||
              matchesTries ||
              replayed))
        ) {
          let data3: Dynamic = isPlainRecord(rep2.data) ? rep2.data : {};
          let lookup3: Dynamic = new (Map as Dynamic)();
          let [items3, setItems]: Dynamic = [
            dataOperationControlVerdict2.predicted.flat(),
            dataOperationControlVerdict2.loggedAs?.predicted.flat() ?? [],
          ];
          items3.forEach(
            (
              item3?: Dynamic,
              index5?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined =>
              void (
                setItems[index5] !== undefined &&
                setItems[index5] !== item3 &&
                lookup3.set(item3, setItems[index5])
              ),
          );
          if (dataOperationControlVerdict2.loggedAs && lookup3.size > 0) {
            for (let loadDataOperationControlVerdictResult25 of operationScope.lookup.values() as Dynamic) {
              for (let loadDataOperationControlVerdictResult26 of (loadDataOperationControlVerdictResult25.inflight &&
              loadDataOperationControlVerdictResult25.inflight !==
                dataOperationControlVerdict2
                ? [
                    loadDataOperationControlVerdictResult25.inflight,
                    ...loadDataOperationControlVerdictResult25.queue,
                  ]
                : loadDataOperationControlVerdictResult25.queue) as Dynamic) {
                if (
                  loadDataOperationControlVerdictResult26 ===
                  dataOperationControlVerdict2
                )
                  continue;
                let ops: Dynamic = loadDataOperationControlVerdictResult26.ops;
                [
                  loadDataOperationControlVerdictResult26.ops,
                  loadDataOperationControlVerdictResult26.predicted,
                ] = [
                  getDataOperationControlSize(
                    loadDataOperationControlVerdictResult26.ops,
                    lookup3,
                  ),
                  getDataOperationControlSize(
                    loadDataOperationControlVerdictResult26.predicted,
                    lookup3,
                  ),
                ];
                loadDataOperationControlVerdictResult26.homes &&=
                  getDataOperationControlSize(
                    loadDataOperationControlVerdictResult26.homes,
                    lookup3,
                  );
                if (loadDataOperationControlVerdictResult26.ops !== ops) {
                  (0, operationScope.trim)(
                    loadDataOperationControlVerdictResult25,
                    loadDataOperationControlVerdictResult26,
                  );
                }
              }
              loadDataOperationControlVerdictResult25.rekeyWords(
                (
                  dataOperationControlVerdict3?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  lookup3.get(dataOperationControlVerdict3) ??
                  dataOperationControlVerdict3,
              );
              loadDataOperationControlVerdictResult25.rekeyHolds(
                (
                  dataOperationControlVerdict3?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  lookup3.get(dataOperationControlVerdict3) ??
                  dataOperationControlVerdict3,
              );
            }
            [
              dataOperationControlVerdict2.ops,
              dataOperationControlVerdict2.predicted,
            ] = [
              dataOperationControlVerdict2.loggedAs.ops,
              dataOperationControlVerdict2.loggedAs.predicted,
            ];
            if (dataOperationControlVerdict2.loggedAs.homes) {
              dataOperationControlVerdict2.homes =
                dataOperationControlVerdict2.loggedAs.homes;
            }
            record4.ops = dataOperationControlVerdict2.ops.slice(
              kStart,
              setKStart,
            );
            predicted = dataOperationControlVerdict2.predicted.slice(
              kStart,
              setKStart,
            );
          }
          let number3 = Number(
            loadDataOperationControlVerdictResult23
              ? loadDataOperationControlVerdictResult23.rev
              : (data3.firstRev ?? rep2.firstRev ?? data3.rev ?? rep2.rev),
          );
          rep2 =
            rep2.verdict === `allow`
              ? rep2
              : {
                  verdict: `allow`,
                  replayed: true,
                  rev: Number.isFinite(number3)
                    ? number3
                    : Math.max(this.lastRev, 0),
                  ...(loadDataOperationControlVerdictResult23
                    ? {
                        changed: false,
                      }
                    : {}),
                  data: {
                    results:
                      matchesTries && Array.isArray(data3.results)
                        ? data3.results
                        : [],
                    ...(loadDataOperationControlVerdictResult23
                      ? {
                          changed: false,
                        }
                      : {}),
                  },
                };
        }
        let data2: Dynamic = isPlainRecord(rep2.data) ? rep2.data : {};
        let isDataOperationControlDeny22: Dynamic =
          isDataOperationControlDeny2(rep2);
        if (isDataOperationControlDeny22) {
          dataOperationControlVerdict2.unknownTries =
            (dataOperationControlVerdict2.unknownTries ?? 0) + 1;
        } else {
          dataOperationControlVerdict2.unknownTries = 0;
        }
        let isDataOperationControlDeny23: Dynamic =
          isDataOperationControlDeny22 &&
          (dataOperationControlVerdict2.unknownTries ?? 0) > 3;
        let pageBusyOf2: Dynamic =
          dataOperationControlVerdict2.busyOut !== true &&
          !isDataOperationControlDeny23
            ? pageBusyOf(rep2)
            : null;
        if (pageBusyOf2 === null) {
          dataOperationControlVerdict2.pageBusy = 0;
          if (
            !(
              rep2.verdict === `allow` &&
              (dataOperationControlVerdict2.rateHeld ?? 0) > 0 &&
              batchesDone + 1 < cuts.length
            )
          ) {
            this.unsayBusy();
          }
        }
        let label5 = `${String(rep2.reason)} ${String(data2.code)} ${String(data2.why)} ${String(rep2.why)}`;
        let why: Dynamic = data2.why ?? rep2.why;
        let matchesWhy =
          why == null || why === `unknown_secret` || why === `unknown_session`;
        let why2: Dynamic =
          data2.was === `id_invalid` ||
          data2.code === `id_invalid` ||
          rep2.reason === `id_invalid`
            ? data2.why
            : undefined;
        let matchesVerdict: Dynamic =
          rep2.verdict === `deny` &&
          !(typeof why2 == `string` && dataOperationControlSet17.has(why2)) &&
          ((why2 === `prefix` && typeof data2.want_prefix == `string`) ||
            (why2 === `shape` &&
              typeof data2.got == `string` &&
              data2.got.startsWith(`_.`)) ||
            /proposed ids: prefix/.test(
              `${String(data2.detail)} ${String(data2.message)} ${String(rep2.reason)} ${String(rep2.detail)}`,
            ));
        let loadDataOperationControlVerdictResult24: Dynamic = ((
          ..._extraArguments: unknown[]
        ): Dynamic => {
          if (rep2.verdict !== `deny` || !/not_your_session/.test(label5))
            return [];
          let label6: Dynamic =
            operationScope.dataOperationControlVerdict.session.get()?.label;
          let asked: Dynamic =
            data2.asked ??
            data2.newBid ??
            (data2.field === `ids` ? data2.start : undefined) ??
            rep2.asked;
          let asked2 =
            typeof asked == `string`
              ? asked
              : isPlainRecord(asked) && typeof asked.sess == `string`
                ? `${asked.sess}.0`
                : ``;
          let matchItem = dataOperationControlPattern11.exec(asked2)?.[1];
          return asked !== undefined &&
            (matchItem === undefined ||
              matchItem === `_` ||
              matchItem === label6)
            ? []
            : dataOperationControlVerdict2.replayed
              ? dataOperationControlVerdict2.lifeDead !== true ||
                dataOperationControlVerdict2.restamped
                ? []
                : matchItem === undefined
                  ? why == null
                    ? [
                        ...resolveDataOperationControlExec(
                          dataOperationControlVerdict2,
                          label6,
                        ),
                      ]
                    : []
                  : resolveDataOperationControlExec(
                        dataOperationControlVerdict2,
                        label6,
                      ).has(matchItem) ||
                      resolveDataOperationControlFlat3(
                        dataOperationControlVerdict2,
                      ).some(
                        (
                          dataOperationControlFlat3?: Dynamic,
                          ..._extraArguments: unknown[]
                        ) =>
                          resolveDataOperationControlStartsWith(
                            dataOperationControlFlat3,
                            matchItem,
                          ) >= 0,
                      )
                    ? [matchItem]
                    : []
              : matchItem !== undefined &&
                  operationScope.uniqueItems6.has(matchItem)
                ? [matchItem]
                : [];
        })();
        let from: Dynamic = loadDataOperationControlVerdictResult24[0];
        if (
          repairWriteSession.call(this, operationScope, {
            get rep2() {
              return rep2;
            },
            set rep2(operationValue: Dynamic) {
              rep2 = operationValue;
            },
            label5,
            matchesWhy,
            matchesVerdict,
            from,
            record5,
            state2,
            dataOperationControlVerdict2,
            loadDataOperationControlVerdictResult24,
            data2,
          })
        )
          return;
        let filterDataOperationControlDeny2: Dynamic =
          filterDataOperationControlDeny(rep2);
        if (
          retryUnknownWrite.call(this, operationScope, {
            filterDataOperationControlDeny2,
            dataOperationControlVerdict2,
            record5,
            get rep2() {
              return rep2;
            },
            set rep2(operationValue: Dynamic) {
              rep2 = operationValue;
            },
            state2,
            data2,
            opId,
            get loadDataOperationControlVerdictResult22() {
              return loadDataOperationControlVerdictResult22;
            },
            set loadDataOperationControlVerdictResult22(
              operationValue: Dynamic,
            ) {
              loadDataOperationControlVerdictResult22 = operationValue;
            },
          })
        )
          return;
        let dataOperationControlSure: Dynamic =
          resolveDataOperationControlSure(rep2);
        let enabled27 = false;
        let matchesDataOperationControlSure =
          dataOperationControlSure === null &&
          rep2.verdict === `deny` &&
          (rep2.reason === `gone` || data2.code === `gone`) &&
          typeof data2.object == `string`;
        if (matchesDataOperationControlSure) {
          data2.terminal = true;
        }
        let why3: Dynamic = null;
        if (dataOperationControlSure !== null) {
          let matchesLoadDataOperationControlVerdictResult =
            operationScope.loadDataOperationControlVerdictResult10 === null &&
            !dataOperationControlSure.sure &&
            !(0, operationScope.loadDataOperationControlVerdictHandler26)();
          if (
            matchesLoadDataOperationControlVerdictResult &&
            (dataOperationControlVerdict2.unbornTries =
              (dataOperationControlVerdict2.unbornTries ?? 0) + 1) < 10
          ) {
            enabled27 = true;
          } else {
            (0, operationScope.pageStopped)(
              matchesLoadDataOperationControlVerdictResult
                ? `unreached`
                : `deleted`,
            );
            why3 =
              operationScope.loadDataOperationControlVerdictResult10 ===
                `not_governed` ||
              operationScope.loadDataOperationControlVerdictResult10 === `cmek`
                ? operationScope.loadDataOperationControlVerdictResult10
                : null;
            Object.assign(
              data2,
              {
                code: `page_gone`,
                was:
                  data2.was ??
                  (rep2.reason === `page_gone` ? data2.code : rep2.reason),
              },
              operationScope.loadDataOperationControlVerdictResult10 ===
                `unreached`
                ? {
                    terminal: true,
                    why: `unreached`,
                    detail: DataOperationControlWhy2,
                  }
                : why3 === null
                  ? {
                      terminal: true,
                      why: `deleted`,
                      detail: DataOperationControlPageGone,
                    }
                  : {
                      terminal: true,
                      why: why3,
                      detail: (0,
                      operationScope.resolveDataOperationControlWhy2)(),
                    },
            );
            if (rep2.reason !== `page_gone`) {
              rep2 = {
                ...rep2,
                reason: `page_gone`,
                data: data2,
              };
            }
          }
        }
        if (
          retryWriteConflict.call(this, operationScope, {
            pageBusyOf2,
            dataOperationControlSure,
            dataOperationControlVerdict2,
            get rep2() {
              return rep2;
            },
            set rep2(operationValue: Dynamic) {
              rep2 = operationValue;
            },
            isDataOperationControlDeny22,
            record5,
            state2,
          })
        )
          return;
        let number2 = Number(data2.retryAfterMs ?? rep2.retryAfterMs);
        let refusalClass2: Dynamic = (0, operationScope.refusalClass)();
        let classify2: Dynamic =
          refusalClass2 === null || rep2.verdict === `allow`
            ? null
            : refusalClass2.classify(rep2, {
                road: `write`,
                verb: `update`,
                seated: (0,
                operationScope.loadDataOperationControlVerdictHandler26)(),
                replayed: dataOperationControlVerdict2.replayed,
                kStart: record4.kStart,
                node: this.node,
                lost: dataOperationControlVerdict2.lost === true,
              });
        let matchesClassify =
          classify2 !== null &&
          (classify2.k === `transient` || classify2.k === `lost`);
        if (
          classify2?.k === `page_terminal` &&
          classify2.source !== `relay` &&
          classify2.source !== `http` &&
          (classify2.face === `not_governed` || classify2.face === `cmek`)
        ) {
          (0, operationScope.pageStopped)(classify2.face);
          Object.assign(data2, {
            terminal: true,
            detail: (0, operationScope.resolveDataOperationControlWhy2)(),
          });
        }
        let matchesK =
          classify2?.k === `rehandshake` && classify2.reason === `forbidden`;
        let enabled28 = false;
        if (
          ((classify2?.k === `bounded` &&
            classify2.reason !== `conflict` &&
            classify2.reason !== `page_gone`) ||
            matchesK) &&
          dataOperationControlVerdict2.boundOut !== true
        ) {
          if (
            !matchesK &&
            operationScope.enabled18 &&
            operationScope.index3 >= refusalClass2.BREAKER_N
          ) {
            dataOperationControlVerdict2.tries += 1;
            dataOperationControlVerdict2.triesBase =
              dataOperationControlVerdict2.tries;
            dataOperationControlVerdict2.boundTries = 0;
            this.inflight = null;
            this.queue.unshift(dataOperationControlVerdict2);
            (0, operationScope.emit5)(
              `refusing`,
              `${String(data2.was ?? classify2.sub ?? classify2.reason)} (the probe row, refused again)`,
            );
            return;
          }
          let total2: Dynamic =
            (dataOperationControlVerdict2.boundTries ?? 0) + 1;
          if (
            total2 <= (matchesK && operationScope.enabled18 ? 0 : classify2.max)
          ) {
            dataOperationControlVerdict2.boundTries = total2;
            enabled28 = true;
          } else if (matchesK) {
            dataOperationControlVerdict2.boundTries = 0;
            this.inflight = null;
            this.queue.unshift(dataOperationControlVerdict2);
            (0, operationScope.emit5)(
              `signed_out`,
              `${String(data2.was ?? classify2.sub ?? classify2.reason)} ×${total2}`,
            );
            return;
          } else {
            dataOperationControlVerdict2.boundOut = true;
            data2.terminal = true;
          }
        }
        if (
          retryBusyWrite.call(this, operationScope, {
            refusalClass2,
            get enabled27() {
              return enabled27;
            },
            set enabled27(operationValue: Dynamic) {
              enabled27 = operationValue;
            },
            get rep2() {
              return rep2;
            },
            set rep2(operationValue: Dynamic) {
              rep2 = operationValue;
            },
            number2,
            data2,
            get enabled28() {
              return enabled28;
            },
            set enabled28(operationValue: Dynamic) {
              enabled28 = operationValue;
            },
            matchesClassify,
            dataOperationControlVerdict2,
            classify2,
            record5,
            state2,
            get batchesDone() {
              return batchesDone;
            },
            set batchesDone(operationValue: Dynamic) {
              batchesDone = operationValue;
            },
          })
        )
          return;
        let {
          dataOperationControlEvery,
          uniqueItems7,
          mappedDataOperationControlEvery,
          filteredFlat,
          uniqueItems8,
          gone,
          matchesVerdict2,
          matchesChanged2,
          matchesChanged3,
          matchesVerdict3,
        } = deriveWriteEffects.call(this, operationScope, {
          data2,
          get loadDataOperationControlVerdictResult22() {
            return loadDataOperationControlVerdictResult22;
          },
          set loadDataOperationControlVerdictResult22(operationValue: Dynamic) {
            loadDataOperationControlVerdictResult22 = operationValue;
          },
          record4,
          get rep2() {
            return rep2;
          },
          set rep2(operationValue: Dynamic) {
            rep2 = operationValue;
          },
          dataOperationControlVerdict2,
          get predicted() {
            return predicted;
          },
          set predicted(operationValue: Dynamic) {
            predicted = operationValue;
          },
          record5,
          state2,
        });
        if (rep2.verdict !== `allow` || matchesVerdict3) {
          let label6 = `${String(data2.detail)} ${String(rep2.detail)}`;
          let enabled30 =
            !matchesVerdict3 &&
            resolveDataOperationControlIdInvalid(rep2, data2);
          if (enabled30 && typeof data2.why != `string`) {
            let matchItem2 = /\bproposed ids: ([a-z_]+)/.exec(label6)?.[1];
            if (matchItem2 !== undefined) {
              data2.why = matchItem2;
            }
          }
          if (
            enabled30 &&
            data2.next_free === undefined &&
            rep2.next_free !== undefined
          ) {
            data2.next_free = rep2.next_free;
          }
          let filteredMinted: Dynamic =
            enabled30 && data2.why === `required` && Array.isArray(data2.minted)
              ? data2.minted.filter(
                  (minted?: unknown, ..._extraArguments: unknown[]) =>
                    typeof minted == `string`,
                )
              : [];
          let enabled31 =
            !dataOperationControlVerdict2.replayed &&
            record4.kStart === 0 &&
            !matchesVerdict3;
          if (
            remintRequiredWriteIds.call(this, operationScope, {
              filteredMinted,
              enabled31,
              dataOperationControlVerdict2,
              data2,
              label6,
              record4,
              get loadDataOperationControlVerdictResult22() {
                return loadDataOperationControlVerdictResult22;
              },
              set loadDataOperationControlVerdictResult22(
                operationValue: Dynamic,
              ) {
                loadDataOperationControlVerdictResult22 = operationValue;
              },
              record5,
              get rep2() {
                return rep2;
              },
              set rep2(operationValue: Dynamic) {
                rep2 = operationValue;
              },
              state2,
            })
          )
            return;
          let {
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
          } = classifyWriteDenial.call(this, operationScope, {
            filteredMinted,
            enabled31,
            record4,
            enabled30,
            dataOperationControlVerdict2,
            data2,
            matchesVerdict3,
            get enabled26() {
              return enabled26;
            },
            set enabled26(operationValue: Dynamic) {
              enabled26 = operationValue;
            },
            get rep2() {
              return rep2;
            },
            set rep2(operationValue: Dynamic) {
              rep2 = operationValue;
            },
            get loadDataOperationControlVerdictResult22() {
              return loadDataOperationControlVerdictResult22;
            },
            set loadDataOperationControlVerdictResult22(
              operationValue: Dynamic,
            ) {
              loadDataOperationControlVerdictResult22 = operationValue;
            },
            matchesVerdict2,
            gone,
            classify2,
            get why3() {
              return why3;
            },
            set why3(operationValue: Dynamic) {
              why3 = operationValue;
            },
            matchesDataOperationControlSure,
          });
          if (replayed3) {
            let opsSlice: Dynamic = dataOperationControlVerdict2.ops.slice(
              record4.kStart,
            );
            let dataOperationControlText: Dynamic =
              dataOperationControlSet19.has(reason) ||
              dataOperationControlSet19.has(String(data2.why ?? ``))
                ? resolveDataOperationControlText(
                    opsSlice,
                    dataOperationControlVerdict2.predicted.slice(
                      record4.kStart,
                    ),
                  )
                : null;
            let dataOperationControlChars3: Dynamic = dataOperationControlText
              ? resolveDataOperationControlChars3(opsSlice)
              : [];
            let idsNow: Dynamic =
              dataOperationControlText && dataOperationControlChars3.length > 1
                ? await this.idsNow()
                : null;
            if (
              idsNow &&
              dataOperationControlChars3.every(
                (
                  dataOperationControlChars32?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => idsNow.has(dataOperationControlChars32),
              )
            ) {
              idsNow = await this.idsNow(true);
            }
            let filteredDataOperationControlText: Dynamic =
              idsNow && dataOperationControlText
                ? dataOperationControlText.filter(
                    (
                      dataOperationControlText2?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic => idsNow.has(dataOperationControlText2.afterId),
                  )
                : [];
            let enabled40: Dynamic =
              !!idsNow &&
              dataOperationControlChars3.some(
                (
                  dataOperationControlChars32?: Dynamic,
                  ..._extraArguments: unknown[]
                ) => !idsNow.has(dataOperationControlChars32),
              );
            if (
              idsNow &&
              dataOperationControlText &&
              filteredDataOperationControlText.length > 0 &&
              enabled40
            ) {
              for (let loadDataOperationControlVerdictResult25 of filteredDataOperationControlText as Dynamic) {
                let bid: Dynamic = idsNow.get(
                  loadDataOperationControlVerdictResult25.afterId,
                );
                let ask: Dynamic = {
                  bid: bid,
                  afterId: loadDataOperationControlVerdictResult25.afterId,
                  text: this.foldBehind(
                    bid,
                    loadDataOperationControlVerdictResult25.text,
                    loadDataOperationControlVerdictResult25.ids,
                  ),
                  ...resolveDataOperationControlAuthor(
                    dataOperationControlVerdict2,
                  ),
                };
                this.leftWords.push({
                  ...ask,
                });
                try {
                  operationScope.dataOperationControlVerdict.wal.stageWords?.(
                    this.node,
                    ask,
                  );
                } catch {}
              }
              this.wordsOwed = true;
              rescue = this.keepRescued(
                dataOperationControlText
                  .filter(
                    (
                      dataOperationControlText2?: Dynamic,
                      ..._extraArguments: unknown[]
                    ) => !idsNow.has(dataOperationControlText2.afterId),
                  )
                  .map(
                    (
                      filteredDataOperationControlText2?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic => ({
                      bid: null,
                      text: filteredDataOperationControlText2.text,
                    }),
                  ),
                dataOperationControlVerdict2,
                record4.kStart,
              );
            } else if (!(enabled37 && enabled39)) {
              rescue = this.keepRescued(
                updateDataOperationControlBid(
                  opsSlice,
                  dataOperationControlVerdict2.homes,
                ),
                dataOperationControlVerdict2,
                record4.kStart,
              );
            }
          } else if (
            !enabled34 &&
            klass === undefined &&
            !enabled32 &&
            (dataOperationControlIdentifierPattern4.test(room) ||
              dataOperationControlIdentifierPattern4.test(
                String(data2.code ?? ``),
              ) ||
              matchesLost)
          ) {
            rescue = this.keepRescued(
              updateDataOperationControlBid(
                dataOperationControlVerdict2.ops.slice(record4.kStart),
                dataOperationControlVerdict2.homes,
              ),
              dataOperationControlVerdict2,
              record4.kStart,
            );
          }
          let { matchesReason, record7, landed, filteredNotices, record8 } =
            describeWriteDenial.call(this, operationScope, {
              reason,
              dataOperationControlVerdict2,
              record4,
              data2,
              difference,
              klass,
              room,
              hasRoom,
              get batchesDone() {
                return batchesDone;
              },
              set batchesDone(operationValue: Dynamic) {
                batchesDone = operationValue;
              },
              opIndex,
              record6,
              matchesVerdict3,
              record5,
              get rep2() {
                return rep2;
              },
              set rep2(operationValue: Dynamic) {
                rep2 = operationValue;
              },
              dataOperationControlSure,
              enabled34,
              state2,
            });
          emitWriteDenial.call(this, operationScope, {
            dataOperationControlVerdict2,
            reason,
            record6,
            data2,
            record7,
            enabled36,
            record4,
            opIndex4,
            opIndex,
            matchesCondition,
            words,
            get rescue() {
              return rescue;
            },
            set rescue(operationValue: Dynamic) {
              rescue = operationValue;
            },
            matchesReason,
            klass,
            room,
            hasRoom,
            enabled38,
            classify2,
            matchesClassify2,
            matchesBoundOut,
            enabled34,
            get enabled26() {
              return enabled26;
            },
            set enabled26(operationValue: Dynamic) {
              enabled26 = operationValue;
            },
            landed,
            filteredNotices,
            record8,
          });
          if (
            klass === undefined &&
            !enabled34 &&
            operationScope.loadDataOperationControlVerdictResult10 === null &&
            !this.nodeGone
          ) {
            this.owed = this.oweWhole = true;
          }
          if (enabled38) {
            this.orphanLatched = true;
          }
          if (enabled38 && !this.orphanSaid) {
            this.orphanSaid = true;
            reportOperationEvent(`orphan.said`, {
              opId: dataOperationControlVerdict2.opId,
              replayed: dataOperationControlVerdict2.replayed === true,
            });
            resolveDataOperationControlValue10(`orphan_node`);
            try {
              operationScope.dataOperationControlVerdict.onOrphanNode?.({
                node: this.node,
              });
            } catch {
              reportOperationEvent(`orphan.said.threw`, {
                opId: dataOperationControlVerdict2.opId,
              });
            }
          }
          if (classify2 !== null) {
            reportOperationEvent(`deny.class`, {
              reason: classify2.reason,
              sub: classify2.sub ?? ``,
              klass: classify2.k,
              source: classify2.source,
              road: `write`,
              opId: dataOperationControlVerdict2.opId,
            });
            if (
              classify2.source === "default" &&
              !operationScope.uniqueItems4.has(classify2.reason)
            ) {
              operationScope.uniqueItems4.add(classify2.reason);
              console.error(
                `opTransport: deny.class source=default — the door refused with a word this page has no row for ("${classify2.reason}"); bounded ${classify2.k === `bounded` ? classify2.max : 0}× then refused. Add it to refusals.contract.json.`,
              );
            }
          }
          if (
            refusalClass2 !== null &&
            (dataOperationControlVerdict2.boundOut === true ||
              classify2?.source === "default") &&
            ++operationScope.index3 >= refusalClass2.BREAKER_N
          ) {
            (0, operationScope.emit5)(
              `refusing`,
              `${room} ×${operationScope.index3}`,
            );
          }
          if (!enabled34) {
            this.handBack(dataOperationControlVerdict2, reason, {}, true);
          }
          await this.settleOne(dataOperationControlVerdict2);
          return;
        }
        dataOperationControlVerdict2.batchesDone = batchesDone + 1;
        if ((dataOperationControlVerdict2.rateHeld ?? 0) > 0) {
          [
            dataOperationControlVerdict2.ratePace,
            dataOperationControlVerdict2.rateHeld,
          ] = [
            batchesDone + 1 < cuts.length
              ? Math.min(
                  RATE_LIMITED_CAP_MS,
                  dataOperationControlVerdict2.rateHeld,
                )
              : 0,
            0,
          ];
        }
        this.sessRetries = 0;
        operationScope.enabled19 = false;
        let matchesProvisional2 = rep2.provisional !== true;
        if (matchesProvisional2) {
          operationScope.index3 = 0;
          (0, operationScope.emit6)();
          operationScope.index4 = 0;
        }
        if (
          operationScope.kind !== null &&
          (matchesProvisional2 || operationScope.kind !== `refusing`)
        ) {
          (0, operationScope.rearmGap)(
            matchesProvisional2 ? `a write was taken` : `a burst was relayed`,
            !matchesProvisional2,
          );
        }
        dataOperationControlVerdict2.busyTries = 0;
        dataOperationControlVerdict2.boundTries = 0;
        dataOperationControlVerdict2.busyOut = false;
        if (rep2.provisional === true && typeof rep2.rev != `number`) {
          dataOperationControlVerdict2.provisional = true;
        }
        this.recounting = false;
        for (let [
          loadDataOperationControlVerdictResult25,
          loadDataOperationControlVerdictResult26,
        ] of this.shortRevived as Dynamic)
          if (
            loadDataOperationControlVerdictResult26 &&
            loadDataOperationControlVerdictResult25 !==
              dataOperationControlVerdict2.opId
          ) {
            this.shortRevived.delete(loadDataOperationControlVerdictResult25);
            this.shortGrace.delete(loadDataOperationControlVerdictResult25);
          }
        this.reviveShort(
          dataOperationControlVerdict2,
          record4,
          loadDataOperationControlVerdictResult22.from,
          dataOperationControlEvery,
          filteredFlat,
        );
        (dataOperationControlVerdict2.results.push as Dynamic)(
          ...mappedDataOperationControlEvery,
        );
        for (
          let mappedDataOperationControlEveryCount: Dynamic =
            mappedDataOperationControlEvery.length;
          mappedDataOperationControlEveryCount < record4.ops.length;
          mappedDataOperationControlEveryCount++
        )
          dataOperationControlVerdict2.results.push({});
        if (rep2.verdict === `allow`) {
          for (let index5 = 0; index5 < record4.ops.length; index5++) {
            if (
              !(
                uniqueItems7.has(index5) ||
                index5 >= mappedDataOperationControlEvery.length
              )
            )
              continue;
            (dataOperationControlVerdict2.padded ??= []).push(
              record4.kStart + index5,
            );
            let [items3, setItems]: Dynamic = [
              predicted[index5] ?? [],
              dataOperationControlVerdict2.editorSaid?.[
                record4.kStart + index5
              ],
            ];
            if (
              setItems !== undefined &&
              items3.length > 0 &&
              !(
                items3.length === setItems.length &&
                items3.every(
                  (
                    rolldownRImport2?: Dynamic,
                    index6?: Dynamic,
                    ..._extraArguments: unknown[]
                  ) => rolldownRImport2 === setItems[index6],
                )
              )
            ) {
              (dataOperationControlVerdict2.flown ??= []).push([
                record4.kStart + index5,
                [...items3],
              ]);
            }
          }
          let filteredPaddedCount: Dynamic = (
            dataOperationControlVerdict2.padded ?? []
          ).filter(
            (padded?: Dynamic, ..._extraArguments: unknown[]) =>
              padded >= record4.kStart &&
              padded < record4.kStart + record4.ops.length,
          ).length;
          if (filteredPaddedCount > 0) {
            console.warn(
              `opTransport: padded_ack — an allowed update's answer spoke for ${record4.ops.length - filteredPaddedCount} of its ${record4.ops.length} ops (${filteredPaddedCount} padded${dataOperationControlVerdict2.lost === true || dataOperationControlVerdict2.tries > 0 ? `, a re-send` : ``}${dataOperationControlVerdict2.replayed ? `, replayed` : ``}); op=${dataOperationControlVerdict2.opId} verbs=${record4.ops.map((operation?: Dynamic, ..._extraArguments: unknown[]) => String(operation.op)).join(`,`)}`,
            );
          }
          if (filteredPaddedCount > 0) {
            resolveDataOperationControlValue22(
              `padded_ack`,
              dataOperationControlVerdict2.lost === true ||
                dataOperationControlVerdict2.tries > 0,
              filteredPaddedCount,
            );
          }
        }
        if (typeof rep2.rev == `number`) {
          dataOperationControlVerdict2.rev = rep2.rev;
        }
        dataOperationControlVerdict2.headOnly ||= matchesChanged2;
        if (matchesChanged3) {
          dataOperationControlVerdict2.undone = [
            ...(dataOperationControlVerdict2.undone ?? []),
            ...record4.ops.map(
              (
                op2?: unknown,
                index5?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => record4.kStart + index5,
            ),
          ];
        }
        let item = [
          rep2.rev_first,
          rep2.revFirst,
          data2.rev_first,
          data2.revFirst,
        ].find(
          (item3?: unknown, ..._extraArguments: unknown[]) =>
            typeof item3 == `number`,
        );
        let item2: Dynamic = matchesChanged2
          ? item
          : typeof rep2.rev == `number`
            ? rep2.rev
            : undefined;
        for (
          item2 !== undefined &&
            (dataOperationControlVerdict2.mineRev = Math.max(
              dataOperationControlVerdict2.mineRev ?? -1,
              item2,
            )),
            record4.ops.forEach(
              (
                op2?: Dynamic,
                index5?: Dynamic,
                ..._extraArguments: unknown[]
              ): undefined => {
                for (let loadDataOperationControlVerdictResult25 of resolveDataOperationControlReplace3(
                  op2,
                  mappedDataOperationControlEvery[index5],
                ) as Dynamic)
                  this.deadBids.set(
                    loadDataOperationControlVerdictResult25,
                    dataOperationControlVerdict2.rev,
                  );
                for (let loadDataOperationControlVerdictResult25 of resolveDataOperationControlFlatMap2(
                  mappedDataOperationControlEvery[index5]?.revived,
                ) as Dynamic)
                  this.deadBids.delete(loadDataOperationControlVerdictResult25);
              },
            );
          this.deadBids.size > 256;

        )
          this.deadBids.delete(this.deadBids.keys().next().value);
        let uniqueItems10: Dynamic = new (Set as Dynamic)(
          filteredFlat
            .filter(resolveDataOperationControlAnchorGone)
            .map(
              (
                filteredFilteredFlat?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => filteredFilteredFlat.into,
            )
            .filter(
              (items3?: unknown, ..._extraArguments: unknown[]) =>
                typeof items3 == `string` && items3.length > 0,
            ),
        );
        let loadDataOperationControlVerdictHandler30: Dynamic = (
          dataOperationControlVerdict3?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          Array.isArray(dataOperationControlVerdict3)
            ? dataOperationControlVerdict3
                .filter(
                  (rolldownNImport2?: unknown, ..._extraArguments: unknown[]) =>
                    !(
                      typeof rolldownNImport2 == `string` &&
                      uniqueItems10.has(rolldownNImport2)
                    ),
                )
                .map(loadDataOperationControlVerdictHandler30)
            : dataOperationControlVerdict3;
        let mappedDataOperationControlEvery2: Dynamic =
          uniqueItems10.size === 0 && uniqueItems8.size === 0
            ? mappedDataOperationControlEvery
            : mappedDataOperationControlEvery.map(
                (
                  mappedDataOperationControlEvery3?: Dynamic,
                  index5?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  uniqueItems8.has(index5)
                    ? {
                        ...(isPlainRecord(mappedDataOperationControlEvery3)
                          ? mappedDataOperationControlEvery3
                          : {}),
                        minted: [],
                        changed: false,
                      }
                    : isPlainRecord(mappedDataOperationControlEvery3) &&
                        Array.isArray(mappedDataOperationControlEvery3.minted)
                      ? {
                          ...mappedDataOperationControlEvery3,
                          minted: loadDataOperationControlVerdictHandler30(
                            mappedDataOperationControlEvery3.minted,
                          ),
                        }
                      : mappedDataOperationControlEvery3,
              );
        let predicted2: Dynamic =
          uniqueItems8.size === 0 && uniqueItems7.size === 0
            ? predicted
            : predicted.map(
                (
                  predicted3?: Dynamic,
                  index5?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  uniqueItems8.has(index5) || uniqueItems7.has(index5)
                    ? []
                    : predicted3,
              );
        (0, operationScope.emit2)(false);
        (0, operationScope.readsResume)(
          `the room took a write: the access moved`,
        );
        let learned: Dynamic = this.learn(
          rep2,
          mappedDataOperationControlEvery2,
          predicted2,
          uniqueItems10,
        );
        dataOperationControlVerdict2.ops = getDataOperationControlSize(
          dataOperationControlVerdict2.ops,
          learned,
        );
        dataOperationControlVerdict2.homes &&= getDataOperationControlSize(
          dataOperationControlVerdict2.homes,
          learned,
        );
        if (
          learned.size > 0 &&
          (this.leftWords.length > 0 ||
            (!dataOperationControlVerdict2.replayed && this.myWords.size > 0))
        ) {
          this.rekeyWords(
            (
              dataOperationControlVerdict3?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              learned.get(dataOperationControlVerdict3) ??
              dataOperationControlVerdict3,
            true,
            !dataOperationControlVerdict2.replayed,
          );
        }
        if (learned.size > 0 && this.holds.size > 0) {
          this.rekeyHolds(
            (
              dataOperationControlVerdict3?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              learned.get(dataOperationControlVerdict3) ??
              dataOperationControlVerdict3,
          );
        }
        if (
          dataOperationControlVerdict2.replayed &&
          this.leftWords.length > 0
        ) {
          this.dedupeWords(
            record4.ops,
            dataOperationControlVerdict2.results.slice(-record4.ops.length),
            predicted,
            learned,
            dataOperationControlVerdict2.homes,
          );
        }
        if (!dataOperationControlVerdict2.replayed) {
          let record6: Dynamic = {
            ops: record4.ops,
            results: dataOperationControlVerdict2.results.slice(
              -record4.ops.length,
            ),
            predicted: predicted,
            learned: learned,
            homes: dataOperationControlVerdict2.homes,
            seq: dataOperationControlVerdict2.seq ?? 0,
          };
          if (
            this.remountOut.has(dataOperationControlVerdict2.opId) &&
            this.leftWords.some(
              (leftWord?: Dynamic, ..._extraArguments: unknown[]) =>
                leftWord.moved === true,
            )
          ) {
            this.dedupeWords(
              record6.ops,
              record6.results,
              record6.predicted,
              record6.learned,
              record6.homes,
              (
                dataOperationControlVerdict3?: Dynamic,
                ..._extraArguments: unknown[]
              ) =>
                dataOperationControlVerdict3.moved === true &&
                (dataOperationControlVerdict3.since ?? 0) < record6.seq,
            );
          }
          this.ackedRecent.push(record6);
          if (this.ackedRecent.length > dataOperationControlValue64) {
            this.ackedRecent.shift();
          }
        }
        if (
          (learned.size > 0 || dataOperationControlVerdict2.replayed) &&
          !this.served &&
          this.lastFace
        ) {
          this.refreshFace();
        }
        if (
          !matchesChanged2 &&
          typeof rep2.rev == `number` &&
          !dataOperationControlVerdict2.unseen
        ) {
          let item3 = item;
          let ids: Dynamic = new (Set as Dynamic)(
            dataOperationControlVerdict2.homes ?? [],
          );
          record4.ops.forEach(
            (
              op2?: Dynamic,
              index5?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              let op3: Dynamic = op2;
              if (typeof op3.id == `string`) {
                ids.add(op3.id);
              }
              if (op3.op !== `insert` || op3.source?.as !== `text`)
                for (let loadDataOperationControlVerdictResult25 of resolveDataOperationControlFlatMap2(
                  mappedDataOperationControlEvery[index5]?.minted,
                ) as Dynamic)
                  ids.add(loadDataOperationControlVerdictResult25);
            },
          );
          this.wrote.push({
            lo: Math.min(item3 ?? rep2.rev, rep2.rev),
            hi: rep2.rev,
            ids: ids,
          });
          if (this.wrote.length > 512) {
            this.wrote.shift();
          }
        }
      }
      operationScope.enabled2 = true;
      operationScope.count4 = 0;
      this.tookMine(dataOperationControlVerdict2);
      if (this.shortRevived.has(dataOperationControlVerdict2.opId)) {
        this.shortRevived.set(dataOperationControlVerdict2.opId, true);
      }
      let matchesProvisional =
        dataOperationControlVerdict2.provisional === true &&
        dataOperationControlVerdict2.rev < 0;
      this.emit({
        t: `ack`,
        node: this.node,
        opId: dataOperationControlVerdict2.opId,
        results: dataOperationControlVerdict2.results,
        rev: dataOperationControlVerdict2.rev,
        ...(matchesProvisional
          ? {
              provisional: true,
            }
          : {}),
        ...(dataOperationControlVerdict2.notices?.length
          ? {
              notices: dataOperationControlVerdict2.notices,
            }
          : {}),
        ...(dataOperationControlVerdict2.undone?.length
          ? {
              undone: dataOperationControlVerdict2.undone,
            }
          : {}),
        ...(dataOperationControlVerdict2.filled?.length
          ? {
              filled: dataOperationControlVerdict2.filled,
            }
          : {}),
        ...(dataOperationControlVerdict2.padded?.length
          ? {
              padded: dataOperationControlVerdict2.padded,
            }
          : {}),
        ...(dataOperationControlVerdict2.flown?.length
          ? {
              flown: dataOperationControlVerdict2.flown,
            }
          : {}),
      });
      if (!matchesProvisional) {
        reportOperationEvent(`ack.allow`, {
          rev: dataOperationControlVerdict2.rev,
        });
      }
      if (
        !matchesProvisional &&
        isDataOperationControlRevive(
          dataOperationControlVerdict2.ops,
          dataOperationControlVerdict2.results,
        )
      ) {
        this.freshen();
      }
      if (matchesProvisional) {
        this.provisional.set(
          dataOperationControlVerdict2.opId,
          dataOperationControlVerdict2,
        );
        this.inflight = null;
        (0, operationScope.emit7)();
        if (this.slow) {
          this.emit(
            operationScope.kind === null
              ? {
                  t: `state`,
                  node: this.node,
                  state: (0, operationScope.state)(),
                }
              : (0, operationScope.loadDataOperationControlVerdictHandler25)(
                  this.node,
                ),
          );
        }
        this.slow = false;
        for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
          loadDataOperationControlVerdictResult22.pump();
        return;
      }
      await this.settleOne(dataOperationControlVerdict2);
    },
  };
  return methods;
}
