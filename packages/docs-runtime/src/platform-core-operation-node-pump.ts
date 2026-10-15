/** BaoCut: operation controller node pump. */
import type { Dynamic } from "./types";
import type { OperationControllerScope } from "./type-models/platform-core-operation";
import { isDataOperationControlBatchesDone } from "./platform-core-data-operation-control-4";
export function createOperationNodePump(
  operationScope: Pick<
    OperationControllerScope,
    | "enabled"
    | "enabled22"
    | "lookup"
    | "reopened"
    | "enabled21"
    | "dataOperationControlVerdict"
    | "enabled23"
    | "loadDataOperationControlVerdictHandler29"
    | "count9"
    | "loadDataOperationControlVerdictResult19"
    | "uniqueItems6"
    | "slice"
    | "rekeyHolds3"
    | "emit8"
    | "capsSettled7"
    | "kind"
    | "trim"
    | "honourOpsOnFeed"
    | "reconcile"
  >,
): Record<string, Dynamic> {
  const methods: Record<string, Dynamic> & ThisType<Dynamic> = {
    pump(..._extraArguments: unknown[]): Dynamic {
      this.serveMount(`drained`);
      this.handOwedWords();
      if (operationScope.enabled || this.dead || this.inflight) return;
      if (
        operationScope.enabled22 &&
        ![...operationScope.lookup.values()].some(
          (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            item.inflight,
        )
      )
        return (0, operationScope.reopened)();
      if (
        !this.nodeGone &&
        (!operationScope.enabled21 ||
          !operationScope.dataOperationControlVerdict.session.get()) &&
        this.queue.length > 0
      ) {
        if (!operationScope.enabled23)
          return void (0,
          operationScope.loadDataOperationControlVerdictHandler29)().then(
            (..._extraArguments: unknown[]): Dynamic =>
              operationScope.lookup.forEach(
                (lookup3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  lookup3.pump(),
              ),
          );
        if (!operationScope.dataOperationControlVerdict.session.get()) {
          for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
            if (loadDataOperationControlVerdictResult22.inflight) return;
        }
        if (
          !operationScope.dataOperationControlVerdict.session.get() &&
          isDataOperationControlBatchesDone(this.queue[0])
        ) {
          operationScope.count9 = Math.min(operationScope.count9 + 1, 16);
          operationScope.loadDataOperationControlVerdictResult19 = null;
          operationScope.enabled23 = false;
          (0, operationScope.loadDataOperationControlVerdictHandler29)().then(
            (..._extraArguments: unknown[]): Dynamic =>
              operationScope.lookup.forEach(
                (lookup3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  lookup3.pump(),
              ),
          );
          return;
        }
      }
      if (
        operationScope.enabled21 &&
        operationScope.dataOperationControlVerdict.session.get() &&
        this.queue.length > 0 &&
        operationScope.uniqueItems6.size > 0
      ) {
        let filteredItemsSlice: Dynamic = (0, operationScope.slice)().filter(
          (itemsSlice?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            operationScope.uniqueItems6.has(itemsSlice),
        );
        if (filteredItemsSlice.length > 0) {
          for (let loadDataOperationControlVerdictResult22 of filteredItemsSlice as Dynamic)
            (0, operationScope.rekeyHolds3)(
              loadDataOperationControlVerdictResult22,
            );
          (0, operationScope.emit8)();
        }
      }
      let capsSettled8: Dynamic =
        (0, operationScope.capsSettled7)() && !this.nodeGone;
      for (
        let queueItem: Dynamic = capsSettled8 ? undefined : this.queue[0];
        queueItem;
        queueItem = this.queue[0]
      ) {
        if (this.held(queueItem)) return;
        if (this.queue[0] === queueItem) break;
      }
      this.inflight = capsSettled8 ? null : (this.queue.shift() ?? null);
      let matchesProvisionalCount =
        this.provisional.size === 0 && this.heldWords === 0;
      let matchesKind: Dynamic =
        operationScope.kind !== null && capsSettled8 && this.queue.length > 0;
      if (
        this.oweWhole &&
        !this.inflight &&
        !matchesKind &&
        this.owed &&
        !this.reading &&
        matchesProvisionalCount &&
        !this.healEpisode &&
        this.noWhole(`a picture owed at drain`)
      ) {
        this.oweWhole = false;
      }
      let enabled26: Dynamic =
        !this.inflight &&
        !matchesKind &&
        this.owed &&
        !this.reading &&
        this.oweWhole &&
        matchesProvisionalCount;
      if (this.inflight && this.inflight.sent !== true) {
        this.inflight.sent = true;
        (0, operationScope.trim)(this, this.inflight);
      }
      if (this.inflight) {
        this.fly(this.inflight);
      } else {
        if (enabled26 && this.healEpisode) {
          this.healReissue();
        } else {
          if (
            !matchesKind &&
            this.owed &&
            !this.reading &&
            matchesProvisionalCount &&
            !(this.owed = false)
          ) {
            this.read(
              this.oweWhole && !(this.oweWhole = false)
                ? undefined
                : this.since(),
            );
          }
        }
      }
      if (
        !this.inflight &&
        !enabled26 &&
        !(0, operationScope.honourOpsOnFeed)()
      ) {
        this.mendHoles();
      }
    },
    mendHoles(..._extraArguments: unknown[]): undefined {
      if (
        this.holed.size === 0 ||
        this.inflight ||
        this.queue.length > 0 ||
        this.provisional.size > 0 ||
        !this.served ||
        this.halted ||
        operationScope.enabled ||
        this.dead
      )
        return;
      let index5 = 0;
      for (let loadDataOperationControlVerdictResult22 of this.holed as Dynamic)
        if (!this.holedRead.has(loadDataOperationControlVerdictResult22)) {
          if (index5++ >= 4 && (operationScope.reconcile || !this.served)) {
            this.owed = this.oweWhole = true;
            break;
          }
          this.holedRead.add(loadDataOperationControlVerdictResult22);
          this.readBlock(
            loadDataOperationControlVerdictResult22,
            this.declinedHoles.has(loadDataOperationControlVerdictResult22),
          );
        }
    },
  };
  return methods;
}
