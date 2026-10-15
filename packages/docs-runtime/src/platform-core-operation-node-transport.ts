/** BaoCut: operation controller node transport. */
import type { Dynamic } from "./types";
import type { OperationControllerScope } from "./type-models/platform-core-operation";
import { reportOperationEvent } from "./platform-core-observability-boot";
import {
  DataOperationControlARevABellNamedNeverCameInADelta,
  DataOperationControlMessage13,
  DataOperationControlMessage14,
  DataOperationControlMessage2,
  DataOperationControlNodeGone2,
  DataOperationControlState2,
  dataOperationControlValue1000,
  dataOperationControlValue2000,
  isDataOperationControlDeny3,
  isDataOperationControlDeny8,
  resolveDataOperationControlAllow,
  resolveDataOperationControlValue19,
  resolveDataOperationControlValue22,
  resolveDataOperationControlValue26,
} from "./platform-core-data-operation-control-2";
import {
  dataOperationControlIdentifierPattern3,
  dataOperationControlPattern8,
  isDataOperationControlDeny9,
  isPlainRecord,
  resolveDataOperationControlInsert,
  resolveDataOperationControlReplace2,
  resolveDataOperationControlUnavailable,
} from "./platform-core-data-operation-control-4";
export function createOperationNodeTransport(
  operationScope: Pick<
    OperationControllerScope,
    | "enabled"
    | "judged"
    | "loadDataOperationControlVerdictHandler26"
    | "visibility"
    | "refusalClass"
    | "emit7"
    | "dataOperationControlVerdict"
    | "lookup"
    | "enabled18"
    | "emit5"
    | "index3"
    | "kind"
    | "loadDataOperationControlVerdictHandler25"
    | "honourOpsOnFeed"
    | "loadDataOperationControlVerdictHandler21"
    | "reconcile"
    | "race"
    | "loadDataOperationControlVerdictHandler18"
    | "loadDataOperationControlVerdictResult10"
    | "emit3"
    | "loadDataOperationControlVerdictHandler"
  >,
): Record<string, Dynamic> {
  const methods: Record<string, Dynamic> & ThisType<Dynamic> = {
    streamRefused(
      response?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (operationScope.enabled || this.dead) return;
      let filteredOpIds: Dynamic = Array.isArray(response.opIds)
        ? response.opIds.filter(
            (opId?: unknown, ..._extraArguments: unknown[]): Dynamic =>
              typeof opId == `string` && this.provisional.has(opId),
          )
        : [];
      if (filteredOpIds.length === 0) return;
      let ack: Dynamic = isPlainRecord(response.ack) ? response.ack : {};
      let data: Dynamic = isPlainRecord(ack.data) ? ack.data : {};
      let reason: Dynamic =
        typeof ack.reason == `string`
          ? ack.reason
          : typeof response.reason == `string`
            ? response.reason
            : `refused`;
      let ack2: Dynamic = isPlainRecord(response.ack)
        ? response.ack
        : {
            verdict: `deny`,
            reason: reason,
            data: data,
          };
      let matchesDataOperationControlAllow =
        resolveDataOperationControlAllow(ack2) !== null;
      let dataOperationControlValue19: Dynamic =
        resolveDataOperationControlValue19(ack2);
      let number2 = Number(
        data.retryAfterMs ?? ack.retryAfterMs ?? response.retryAfterMs,
      );
      let label5 = `${String(data.code)} ${reason}`;
      let uniqueItems7: Dynamic = new (Set as Dynamic)([
        response.transient,
        ack.transient,
        data.transient,
        isPlainRecord(response.data) ? response.data.transient : undefined,
      ]);
      let test3 = dataOperationControlIdentifierPattern3.test(label5);
      let ack3: Dynamic =
        isPlainRecord(response.ack) && typeof response.ack.verdict == `string`
          ? response.ack
          : {
              verdict: `deny`,
              reason: reason,
              data: data,
            };
      let state2: Dynamic = (
        dataOperationControlVerdict2?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        (0, operationScope.judged)(
          response,
          ack3,
          dataOperationControlVerdict2 ? `burst_resent` : `burst_denied`,
          {
            road: `stream`,
            verb: `update`,
            node: this.node,
            seated: (0,
            operationScope.loadDataOperationControlVerdictHandler26)(),
            opId: filteredOpIds[0],
            burst: filteredOpIds.length,
            stream: true,
            vis: operationScope.visibility.state(),
            feedUp: this.feedUp,
          },
        );
      let refusalClass2: Dynamic = (0, operationScope.refusalClass)();
      if (refusalClass2 === null) {
        let enabled27: Dynamic =
          !uniqueItems7.has(false) &&
          (uniqueItems7.has(true) ||
            number2 >= 0 ||
            dataOperationControlPattern8.test(label5) ||
            (typeof response.status == `number` &&
              response.status !== 200 &&
              !test3));
        state2(enabled27);
        if (enabled27) {
          let filteredItems2: Dynamic = [...this.provisional.values()].filter(
            (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              filteredOpIds.includes(item.opId),
          );
          for (let loadDataOperationControlVerdictResult22 of filteredItems2 as Dynamic) {
            this.provisional.delete(
              loadDataOperationControlVerdictResult22.opId,
            );
            loadDataOperationControlVerdictResult22.provisional = false;
            loadDataOperationControlVerdictResult22.batchesDone = 0;
            loadDataOperationControlVerdictResult22.results = [];
            loadDataOperationControlVerdictResult22.padded =
              loadDataOperationControlVerdictResult22.flown = undefined;
            loadDataOperationControlVerdictResult22.tries += 1;
            if (dataOperationControlValue19) {
              loadDataOperationControlVerdictResult22.lost = true;
            }
          }
          (this.queue.unshift as Dynamic)(...filteredItems2);
          let max: Dynamic = (Math.max as Dynamic)(
            ...filteredItems2.map(
              (
                filteredItem?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => filteredItem.tries,
            ),
          );
          this.slow = true;
          this.unsayBusy();
          this.emit({
            t: `state`,
            node: this.node,
            state: `saving`,
            words:
              max > 2
                ? DataOperationControlMessage14
                : matchesDataOperationControlAllow
                  ? DataOperationControlMessage2
                  : DataOperationControlMessage13,
            ...(matchesDataOperationControlAllow
              ? {
                  storeShed: true,
                }
              : {}),
          });
          (0, operationScope.emit7)();
          console.info(
            `opTransport: stream burst not persisted (transient) — re-sending under the same opIds`,
            filteredOpIds.join(`,`),
            reason,
          );
          resolveDataOperationControlValue22(
            `burst_unpersisted`,
            max > 1,
            filteredItems2.length,
          );
          if (this.retryTimer !== null) return;
          let dataOperationControlValue26: Dynamic =
            resolveDataOperationControlValue26(
              number2,
              dataOperationControlValue1000 * 2 ** (max - 1),
            );
          this.retryTimer =
            operationScope.dataOperationControlVerdict.timers.setTimeout(
              (..._extraArguments: unknown[]): undefined => {
                this.retryTimer = null;
                if (!operationScope.enabled && !this.dead) {
                  this.pump();
                }
              },
              dataOperationControlValue26,
            );
          return;
        }
        for (let opId of filteredOpIds as Dynamic) {
          let rescue: Dynamic = this.orphanedRescue(opId);
          this.provisional.delete(opId);
          operationScope.dataOperationControlVerdict.wal
            .trim(this.node, opId)
            .catch((..._extraArguments: unknown[]): undefined => undefined);
          this.emit({
            t: `deny`,
            node: this.node,
            opId: opId,
            reason: reason,
            detail: {
              ...(isPlainRecord(ack.data) ? ack.data : {}),
              streamed: true,
              ...(rescue.length > 0
                ? {
                    rescue: rescue,
                  }
                : {}),
            },
          });
        }
        this.unsettled = true;
        this.owed = this.oweWhole = true;
        (0, operationScope.emit7)();
        for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
          loadDataOperationControlVerdictResult22.pump();
        return;
      }
      let classify2: Dynamic =
        typeof ack.verdict == `string`
          ? refusalClass2.classify(ack, {
              road: `stream`,
              seated: (0,
              operationScope.loadDataOperationControlVerdictHandler26)(),
              node: this.node,
            })
          : null;
      let filteredItems: Dynamic = [...this.provisional.values()].filter(
        (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          filteredOpIds.includes(item.opId),
      );
      let uniqueItems8: Dynamic = new (Set as Dynamic)(
        classify2?.k === `bounded`
          ? filteredItems
              .filter(
                (filteredItem?: Dynamic, ..._extraArguments: unknown[]) =>
                  (filteredItem.streamBound ?? 0) >= classify2.max,
              )
              .map(
                (
                  filteredFilteredItem?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => filteredFilteredItem.opId,
              )
          : [],
      );
      let enabled26: Dynamic =
        !uniqueItems7.has(false) &&
        (uniqueItems7.has(true) ||
          classify2?.k === `transient` ||
          classify2?.k === `bounded` ||
          dataOperationControlPattern8.test(label5) ||
          (typeof response.status == `number` &&
            response.status !== 200 &&
            !test3));
      let filteredFilteredItems: Dynamic = enabled26
        ? filteredItems.filter(
            (filteredItem?: Dynamic, ..._extraArguments: unknown[]) =>
              !uniqueItems8.has(filteredItem.opId),
          )
        : [];
      state2(filteredFilteredItems.length > 0);
      if (filteredFilteredItems.length > 0) {
        for (let loadDataOperationControlVerdictResult22 of filteredFilteredItems as Dynamic) {
          this.provisional.delete(loadDataOperationControlVerdictResult22.opId);
          loadDataOperationControlVerdictResult22.provisional = false;
          loadDataOperationControlVerdictResult22.batchesDone = 0;
          loadDataOperationControlVerdictResult22.results = [];
          loadDataOperationControlVerdictResult22.padded =
            loadDataOperationControlVerdictResult22.flown = undefined;
          loadDataOperationControlVerdictResult22.tries += 1;
          if (classify2?.k === `bounded`) {
            loadDataOperationControlVerdictResult22.streamBound =
              (loadDataOperationControlVerdictResult22.streamBound ?? 0) + 1;
          }
          if (dataOperationControlValue19) {
            loadDataOperationControlVerdictResult22.lost = true;
          }
        }
        (this.queue.unshift as Dynamic)(...filteredFilteredItems);
        let max: Dynamic = (Math.max as Dynamic)(
          ...filteredFilteredItems.map(
            (
              filteredFilteredItem?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => filteredFilteredItem.tries,
          ),
        );
        if (
          classify2?.k !== `bounded` &&
          (Math.max as Dynamic)(
            ...filteredFilteredItems.map(
              (
                filteredFilteredItem?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic =>
                filteredFilteredItem.tries -
                (filteredFilteredItem.triesBase ?? 0),
            ),
          ) >=
            (operationScope.enabled18 ? 1 : refusalClass2.TRANSIENT_RETRY_MAX)
        ) {
          for (let loadDataOperationControlVerdictResult22 of filteredFilteredItems as Dynamic)
            loadDataOperationControlVerdictResult22.triesBase =
              loadDataOperationControlVerdictResult22.tries;
          (0, operationScope.emit5)(
            `unreached`,
            `stream ${reason} ×${max}`,
            `stream`,
          );
          return;
        }
        if (
          classify2?.k === `bounded` &&
          classify2.reason !== `conflict` &&
          operationScope.enabled18 &&
          operationScope.index3 >= refusalClass2.BREAKER_N
        ) {
          for (let loadDataOperationControlVerdictResult22 of filteredFilteredItems as Dynamic) {
            loadDataOperationControlVerdictResult22.triesBase =
              loadDataOperationControlVerdictResult22.tries;
            loadDataOperationControlVerdictResult22.streamBound = 0;
          }
          (0, operationScope.emit5)(
            `refusing`,
            `stream ${reason} (the probe burst, refused again)`,
            `stream`,
          );
        } else if (
          ((this.slow = true),
          this.unsayBusy(),
          this.emit(
            operationScope.kind === null
              ? {
                  t: `state`,
                  node: this.node,
                  state: `saving`,
                  words:
                    max > 2
                      ? DataOperationControlMessage14
                      : matchesDataOperationControlAllow
                        ? DataOperationControlMessage2
                        : DataOperationControlMessage13,
                  ...(matchesDataOperationControlAllow
                    ? {
                        storeShed: true,
                      }
                    : {}),
                }
              : (0, operationScope.loadDataOperationControlVerdictHandler25)(
                  this.node,
                ),
          ),
          (0, operationScope.emit7)(),
          console.info(
            `opTransport: stream burst not persisted (transient) — re-sending under the same opIds`,
            filteredFilteredItems
              .map(
                (
                  filteredFilteredItem?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => filteredFilteredItem.opId,
              )
              .join(`,`),
            reason,
          ),
          resolveDataOperationControlValue22(
            `burst_unpersisted`,
            max > 1,
            filteredFilteredItems.length,
          ),
          this.streamTimer === null && this.retryTimer === null)
        ) {
          let dataOperationControlValue26: Dynamic =
            resolveDataOperationControlValue26(
              number2,
              dataOperationControlValue1000 * 2 ** (max - 1),
            );
          this.streamTimer =
            operationScope.dataOperationControlVerdict.timers.setTimeout(
              (..._extraArguments: unknown[]): undefined => {
                this.streamTimer = null;
                if (!operationScope.enabled && !this.dead) {
                  this.pump();
                }
              },
              dataOperationControlValue26,
            );
        }
      }
      let filteredFilteredOpIds: Dynamic = enabled26
        ? filteredOpIds.filter(
            (filteredOpId?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              uniqueItems8.has(filteredOpId),
          )
        : filteredOpIds;
      if (filteredFilteredOpIds.length === 0) return;
      for (let opId of filteredFilteredOpIds as Dynamic) {
        let rescue: Dynamic = this.orphanedRescue(opId);
        this.provisional.delete(opId);
        operationScope.dataOperationControlVerdict.wal
          .trim(this.node, opId)
          .catch((..._extraArguments: unknown[]): undefined => undefined);
        let hasOpId: Dynamic = uniqueItems8.has(opId);
        let reason2: Dynamic =
          hasOpId && classify2?.source === "default"
            ? `server_refused`
            : hasOpId && classify2?.reason === `conflict`
              ? `busy`
              : reason;
        this.emit({
          t: `deny`,
          node: this.node,
          opId: opId,
          reason: reason2,
          detail: {
            ...(isPlainRecord(ack.data) ? ack.data : {}),
            streamed: true,
            ...(classify2 === null
              ? {}
              : {
                  klass: classify2.k,
                }),
            ...(hasOpId
              ? {
                  terminal: true,
                  klass: `bounded`,
                }
              : {}),
            ...(reason2 === reason
              ? {}
              : {
                  room_reason: reason,
                }),
            ...(rescue.length > 0
              ? {
                  rescue: rescue,
                }
              : {}),
          },
        });
      }
      let filteredFilteredFilteredOpIdsCount: Dynamic =
        classify2?.k === `bounded` && classify2.reason !== `conflict`
          ? filteredFilteredOpIds.filter(
              (
                filteredFilteredOpId?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => uniqueItems8.has(filteredFilteredOpId),
            ).length
          : 0;
      if (
        filteredFilteredFilteredOpIdsCount > 0 &&
        (operationScope.index3 += filteredFilteredFilteredOpIdsCount) >=
          refusalClass2.BREAKER_N
      ) {
        (0, operationScope.emit5)(
          `refusing`,
          `stream ${reason} ×${operationScope.index3}`,
          `stream`,
        );
      }
      this.unsettled = true;
      this.owed = this.oweWhole = true;
      (0, operationScope.emit7)();
      if (!(filteredFilteredItems.length > 0))
        for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
          loadDataOperationControlVerdictResult22.pump();
    },
    applyRow(row?: Dynamic, ..._extraArguments: unknown[]): undefined {
      if (this.groundRev >= row.revFirst - 1) {
        this.groundTo(row.rev);
      }
      this.lastRev = this.shownRev = row.rev;
      this.met();
      if (this.mine(row))
        return void (this.ackedRev = Math.max(this.ackedRev, row.rev));
      let under: Dynamic = this.out();
      this.emit({
        t: `row`,
        node: this.node,
        row: row,
        ...(under > 0
          ? {
              under: under,
            }
          : {}),
      });
      if (row.ops.some(resolveDataOperationControlInsert)) {
        this.freshen();
      }
    },
    park(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      this.parked.set(
        dataOperationControlVerdict2.revFirst,
        dataOperationControlVerdict2,
      );
      if (this.parked.size > 256) {
        this.parked.delete((Math.min as Dynamic)(...this.parked.keys()));
      }
    },
    drainParked(..._extraArguments: unknown[]): undefined {
      for (; this.served && this.parked.size > 0; ) {
        let max = Math.max(this.lastRev, this.shownRev);
        for (let [
          loadDataOperationControlVerdictResult22,
          loadDataOperationControlVerdictResult23,
        ] of this.parked as Dynamic)
          if (loadDataOperationControlVerdictResult23.rev <= max) {
            this.parked.delete(loadDataOperationControlVerdictResult22);
          }
        let parkedEntry: Dynamic = this.parked.get(max + 1);
        if (!parkedEntry) return;
        this.parked.delete(max + 1);
        this.applyRow(parkedEntry);
      }
    },
    troubled(..._extraArguments: unknown[]) {
      let loadDataOperationControlVerdictHandler30: Dynamic = (
        dataOperationControlVerdict2?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        dataOperationControlVerdict2.tries > 0 ||
        (dataOperationControlVerdict2.lost === true &&
          dataOperationControlVerdict2.unknownLost !== true) ||
        (dataOperationControlVerdict2.busyTries ?? 0) > 0;
      if (
        this.inflight &&
        loadDataOperationControlVerdictHandler30(this.inflight)
      )
        return true;
      for (let loadDataOperationControlVerdictResult22 of this.queue as Dynamic)
        if (
          loadDataOperationControlVerdictHandler30(
            loadDataOperationControlVerdictResult22,
          )
        )
          return true;
      for (let loadDataOperationControlVerdictResult22 of this.provisional.values() as Dynamic)
        if (
          loadDataOperationControlVerdictHandler30(
            loadDataOperationControlVerdictResult22,
          )
        )
          return true;
      return false;
    },
    unsayBusy(..._extraArguments: unknown[]): undefined {
      if (this.busySaid) {
        this.busySaid = false;
        this.emit({
          t: `state`,
          node: this.node,
          state: `saving`,
          pageBusy: false,
        });
      }
    },
    stuckReplay(..._extraArguments: unknown[]): Dynamic {
      let items3: Dynamic = this.inflight
        ? [this.inflight, ...this.queue]
        : this.queue;
      return (
        items3.length > 0 &&
        items3.every(
          (
            rolldownNImport2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => rolldownNImport2.replayed,
        ) &&
        (items3[0].tries > 0 || (items3[0].pageBusy ?? 0) > 0)
      );
    },
    noteSent(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      this.sentCount += 1;
      this.sent.add(dataOperationControlVerdict2);
      if (this.sent.size > 512) {
        this.sent.delete(this.sent.values().next().value);
      }
      if (this.unseenOps.size > 512) {
        this.unseenOps.delete(this.unseenOps.values().next().value);
      }
    },
    mine(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let label5: Dynamic =
        operationScope.dataOperationControlVerdict.session.get()?.label;
      return dataOperationControlVerdict2.opId
        ? this.sentOp(dataOperationControlVerdict2.opId) &&
            (label5 === undefined || dataOperationControlVerdict2.by === label5)
        : dataOperationControlVerdict2.by === label5;
    },
    sentOp(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return this.unseenOp(dataOperationControlVerdict2)
        ? false
        : this.sent.has(dataOperationControlVerdict2) ||
            this.sent.has(
              resolveDataOperationControlReplace2(dataOperationControlVerdict2),
            );
    },
    unseenOp(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return (
        this.unseenOps.has(dataOperationControlVerdict2) ||
        this.unseenOps.has(
          resolveDataOperationControlReplace2(dataOperationControlVerdict2),
        )
      );
    },
    armAtFlip(..._extraArguments: unknown[]): undefined {
      if (!(!this.served || this.lastRev < 0)) {
        this.resetHoleState();
        this.wholePicRev = Math.max(this.wholePicRev, this.lastRev);
      }
    },
    roadMoved(..._extraArguments: unknown[]): undefined {
      if (operationScope.enabled || this.dead) return;
      let toldRoad: Dynamic = this.toldRoad;
      if (
        (this.toldRoad = (0, operationScope.honourOpsOnFeed)()) &&
        !toldRoad
      ) {
        this.armAtFlip();
      }
      if (
        !(
          !(0, operationScope.honourOpsOnFeed)() ||
          this.pollTimer === null ||
          this.feedUp === false
        )
      ) {
        operationScope.dataOperationControlVerdict.timers.clearTimeout(
          this.pollTimer,
        );
        this.pollTimer = null;
      }
    },
    toldPolls(..._extraArguments: unknown[]) {
      return this.feedUp === false;
    },
    armPoll(..._extraArguments: unknown[]): undefined {
      if (
        (0, operationScope.loadDataOperationControlVerdictHandler21)() ||
        ((0, operationScope.honourOpsOnFeed)() && !this.toldPolls())
      )
        return;
      let honourOpsOnFeed2: Dynamic = (..._extraArguments: unknown[]) =>
        !operationScope.reconcile &&
        !(0, operationScope.honourOpsOnFeed)() &&
        this.holed.size > 0;
      this.pollArmedMs = honourOpsOnFeed2()
        ? dataOperationControlValue2000
        : (DataOperationControlState2[this.pollRung] ?? 2e3);
      this.pollTimer =
        operationScope.dataOperationControlVerdict.timers.setTimeout(
          (..._extraArguments: unknown[]): undefined => {
            this.pollTimer = null;
            if (!(operationScope.enabled || this.dead)) {
              if (!honourOpsOnFeed2()) {
                this.pollRung = Math.min(
                  this.pollRung + 1,
                  DataOperationControlState2.length - 1,
                );
              }
              if (this.lastRev >= 0 && this.feedUp !== true) {
                if ((0, operationScope.honourOpsOnFeed)()) {
                  this.probe(false, true);
                } else {
                  this.read(this.since());
                }
              }
              if (honourOpsOnFeed2()) {
                this.holedRead.clear();
                this.mendHoles();
              }
              if (this.pollTimer === null) {
                this.armPoll();
              }
            }
          },
          this.pollArmedMs,
        );
    },
    pollWake(..._extraArguments: unknown[]): undefined {
      this.pollRung = 0;
      if (
        !(
          operationScope.enabled ||
          this.dead ||
          this.pollTimer === null ||
          this.pollArmedMs <= 2e3
        )
      ) {
        operationScope.dataOperationControlVerdict.timers.clearTimeout(
          this.pollTimer,
        );
        this.pollTimer = null;
        this.armPoll();
      }
    },
    async door(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      context: Dynamic = false,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> {
      if (operationScope.enabled || this.dead) return null;
      if (this.nodeGone) return this.nodeGoneReply();
      let probeEar: Dynamic =
        options === undefined && dataOperationControlVerdict2.verb === `read`
          ? this.probeEar
          : undefined;
      if (probeEar !== undefined) {
        this.probeEar = undefined;
      }
      if (
        dataOperationControlVerdict2.verb === `read` &&
        !context &&
        this.shedStands()
      ) {
        reportOperationEvent(`read.shed.gate`, {
          n: this.sheds,
        });
        return this.shedHeldReply();
      }
      if (
        dataOperationControlVerdict2.verb === `read` &&
        this.paceLeft !== null
      ) {
        this.paceLeft = Math.max(-1, this.paceLeft - 1);
        this.paceSpent = true;
      }
      let record4: Dynamic = {
        ...dataOperationControlVerdict2,
        ref: {
          object: `node`,
          id: this.node,
        },
        container: operationScope.dataOperationControlVerdict.container,
      };
      let race5: Dynamic = await (0, operationScope.race)(
        record4,
        options ?? probeEar,
      );
      if (isDataOperationControlDeny9(race5, this.node)) {
        this.markNodeGone();
      }
      if (
        dataOperationControlVerdict2.verb === `read` &&
        !operationScope.enabled &&
        !this.dead &&
        !(
          (0, operationScope.loadDataOperationControlVerdictHandler18)() &&
          isDataOperationControlDeny8(race5)
        )
      ) {
        (0, operationScope.judged)(
          record4,
          race5,
          race5.verdict === `allow`
            ? `landed`
            : operationScope.loadDataOperationControlVerdictResult10 === null
              ? this.nodeGone
                ? `node_gone`
                : race5.verdict === `deny` &&
                    (race5.reason === `gone` ||
                      (isPlainRecord(race5.data) && race5.data.code === `gone`))
                  ? `cleared`
                  : isDataOperationControlDeny3(race5)
                    ? `halted`
                    : `spent`
              : `page_gone`,
          {
            road: `read`,
            verb: `read`,
            node: this.node,
            seated: (0,
            operationScope.loadDataOperationControlVerdictHandler26)(),
            vis: operationScope.visibility.state(),
            feedUp: this.feedUp,
            gap: this.gapOwed,
          },
        );
      }
      if (
        dataOperationControlVerdict2.verb === `read` &&
        !operationScope.enabled &&
        !this.dead &&
        operationScope.loadDataOperationControlVerdictResult10 === null
      ) {
        let isPlainRecord3: Dynamic =
          isPlainRecord(dataOperationControlVerdict2.payload) &&
          typeof dataOperationControlVerdict2.payload.sinceRev == `number`;
        if (isDataOperationControlDeny8(race5)) {
          this.accessRefused = true;
          if (!isPlainRecord3) {
            this.accessRefusedWhole = true;
          }
          (0, operationScope.emit3)();
        } else {
          if (
            isPlainRecord3 &&
            race5.verdict === `allow` &&
            this.accessRefusedWhole
          ) {
            this.knockBlind = true;
          }
        }
      }
      if (
        dataOperationControlVerdict2.verb === `read` &&
        !context &&
        !operationScope.enabled &&
        !this.dead
      ) {
        let dataOperationControlUnavailable: Dynamic =
          resolveDataOperationControlUnavailable(race5);
        if (dataOperationControlUnavailable === null) {
          if (race5.verdict === `allow`) {
            this.shedEase();
          }
        } else {
          if (this.shedStands()) {
            reportOperationEvent(`read.shed.joined`, {
              n: this.sheds,
            });
          } else {
            this.shedArm(dataOperationControlUnavailable, false, false);
          }
        }
      }
      return operationScope.enabled || this.dead ? null : race5;
    },
    orphanStaged(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let [touched, complete]: Dynamic = [
        dataOperationControlVerdict2?.touched,
        dataOperationControlVerdict2?.complete,
      ];
      this.orphanStageSaid =
        typeof touched == `number` &&
        Number.isInteger(touched) &&
        touched >= 0 &&
        typeof complete == `boolean`
          ? {
              touched: touched,
              complete: complete,
            }
          : null;
    },
    orphanStage(..._extraArguments: unknown[]): Dynamic {
      return operationScope.enabled ||
        this.dead ||
        this.orphanStageSaid === null
        ? null
        : {
            ...this.orphanStageSaid,
          };
    },
    nodeGoneReply(..._extraArguments: unknown[]): Dynamic {
      return {
        verdict: `deny`,
        reason: `gone`,
        detail: DataOperationControlNodeGone2,
        data: {
          code: `gone`,
          object: `node`,
          id: this.node,
          layer: `link`,
        },
      };
    },
    markNodeGone(
      dataOperationControlVerdict2: Dynamic = true,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        !(
          operationScope.enabled ||
          this.dead ||
          (this.nodeGone && (dataOperationControlVerdict2 || this.goneSaid))
        )
      ) {
        this.nodeGone = true;
        this.halted = true;
        this.owed = this.oweWhole = false;
        this.rung = this.rungWhole = false;
        if (dataOperationControlVerdict2) {
          console.info(
            `opTransport: the door says this document's node is gone — read-only, nothing more is sent for it`,
            this.node,
          );
        }
        if (!(!dataOperationControlVerdict2 && this.downs.size === 0)) {
          this.goneSaid = this.downs.size > 0;
          this.emit({
            t: `state`,
            node: this.node,
            state: `readonly`,
            halt: true,
            shown: this.served,
            words: DataOperationControlNodeGone2,
            nodeGone: true,
          });
        }
      }
    },
    markGone(..._extraArguments: unknown[]): undefined {
      let enabled26 = !this.nodeGone;
      this.markNodeGone(false);
      if (!(!enabled26 || !this.nodeGone)) {
        if (
          !this.served &&
          !this.leftRead &&
          operationScope.dataOperationControlVerdict.wal.ready !== undefined
        ) {
          Promise.race([
            operationScope.dataOperationControlVerdict.wal.ready,
            (0, operationScope.loadDataOperationControlVerdictHandler)(400),
          ]).then(
            (..._extraArguments: unknown[]): undefined => {
              if (this.takeLeft()) {
                (0, operationScope.emit7)();
              }
              if (this.goneSaid && this.leftWords.length > 0) {
                this.refreshFace();
              }
            },
            (..._extraArguments: unknown[]): undefined => undefined,
          );
        }
        this.pumpBehind();
      }
    },
    pumpBehind(..._extraArguments: unknown[]): undefined {
      queueMicrotask(
        (..._extraArguments: unknown[]): undefined =>
          void (!operationScope.enabled && !this.dead && this.pump()),
      );
    },
    met(..._extraArguments: unknown[]): undefined {
      if (this.wantRev >= 0 && this.lastRev >= this.wantRev) {
        this.stubs = 0;
        this.unwant();
      }
      if (this.wantForeign >= 0 && this.lastRev >= this.wantForeign) {
        this.wantForeign = -1;
      }
    },
    unwant(..._extraArguments: unknown[]): undefined {
      this.wantRev = -1;
      if (this.stubTimer !== null) {
        operationScope.dataOperationControlVerdict.timers.clearTimeout(
          this.stubTimer,
        );
        this.stubTimer = null;
      }
    },
    awaitEcho(..._extraArguments: unknown[]): undefined {
      this.stubTimer ??=
        operationScope.dataOperationControlVerdict.timers.setTimeout(
          (..._extraArguments: unknown[]): undefined => {
            this.stubTimer = null;
            if (
              !operationScope.enabled &&
              !this.dead &&
              this.wantRev > this.lastRev
            ) {
              this.read(this.since());
            }
          },
          250,
        );
    },
    stub(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      if (
        dataOperationControlVerdict2 === undefined ||
        this.wantRev <= this.lastRev
      )
        return false;
      let matchesWantForeign = this.wantForeign > this.lastRev;
      let matchesPending =
        this.pending() > 0 ||
        (!matchesWantForeign && this.wantRev <= this.ackedRev);
      this.stubs += 1;
      return this.stubs >= 3
        ? ((this.stubs = 0),
          matchesPending
            ? false
            : this.noWhole(DataOperationControlARevABellNamedNeverCameInADelta)
              ? (this.healStalled(
                  DataOperationControlARevABellNamedNeverCameInADelta,
                ),
                this.unwant(),
                false)
              : undefined)
        : (this.awaitEcho(), false);
    },
    ownWords(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let changed: Dynamic = Array.isArray(dataOperationControlVerdict2.changed)
        ? dataOperationControlVerdict2.changed
        : null;
      if (
        !changed ||
        (changed.length === 0 && !dataOperationControlVerdict2.gone?.length)
      )
        return false;
      for (; this.wrote.length > 0 && this.wrote[0].hi <= options; )
        this.wrote.shift();
      for (let total2: Dynamic = options + 1; total2 <= context; total2++)
        if (
          !this.wrote.some(
            (wrote?: Dynamic, ..._extraArguments: unknown[]) =>
              total2 >= wrote.lo && total2 <= wrote.hi,
          )
        )
          return false;
      let uniqueItems7: Dynamic = new (Set as Dynamic)(
        changed.map(
          (changed2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            changed2.id,
        ),
      );
      if (
        !dataOperationControlVerdict2.blocks.every(
          (ask?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            uniqueItems7.has(ask.bid),
        )
      )
        return false;
      for (let loadDataOperationControlVerdictResult22 of (dataOperationControlVerdict2.gone ??
        []) as Dynamic)
        if (
          typeof loadDataOperationControlVerdictResult22.id != `string` ||
          !this.deadBids.has(loadDataOperationControlVerdictResult22.id)
        )
          return false;
      return changed.every(
        (changed2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          typeof changed2.id == `string` &&
          typeof changed2.rev == `number` &&
          this.wrote.some(
            (wrote?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              changed2.rev >= wrote.lo &&
              changed2.rev <= wrote.hi &&
              wrote.ids.has(changed2.id),
          ),
      );
    },
  };
  return methods;
}
