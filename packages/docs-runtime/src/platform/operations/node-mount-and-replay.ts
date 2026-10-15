/** BaoCut: operation controller node mount and replay. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import type { OperationControllerScope } from "./controller-contracts";
import {
  reportOperationEvent,
  resolveObservabilityBootNode2,
} from "../observability/boot";
import {
  DataOperationControlState11,
  DataOperationControlStyles4,
  dataOperationControlValue20005,
  dataOperationControlValue30002,
  dataOperationControlValue50004,
  resolveDataOperationControlRound2,
} from "../data/operation-control-2";
import {
  isPlainRecord,
  resolveDataOperationControlBatchesDone,
  resolveDataOperationControlBid,
  resolveDataOperationControlOps2,
  updateDataOperationControlBid,
  updateDataOperationControlEditorSaid,
} from "../data/operation-control-4";
export function createOperationNodeMountAndReplay(
  operationScope: Pick<
    OperationControllerScope,
    | "enabled"
    | "emit7"
    | "dataOperationControlVerdict"
    | "loadDataOperationControlVerdictHandler"
    | "life2"
    | "uniqueItems3"
    | "wait"
    | "uniqueItems2"
    | "claimed"
    | "enabled21"
    | "loadDataOperationControlVerdictResult17"
    | "rekeyHolds2"
    | "enabled23"
    | "rekeyHolds5"
    | "label4"
    | "rekeyHolds3"
    | "rekeyHolds4"
    | "emit8"
    | "matchesReady"
    | "state"
    | "kind"
    | "loadDataOperationControlVerdictHandler25"
    | "index"
    | "honourOpsOnFeed"
    | "enabled16"
  >,
): Record<string, Dynamic> {
  const methods: Record<string, Dynamic> & ThisType<Dynamic> = {
    takeKept(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (operationScope.enabled || this.dead || !this.leftRead) return;
      let items3: Dynamic = [];
      try {
        items3 = dataOperationControlVerdict2(this.node).filter(
          (ask?: Dynamic, ..._extraArguments: unknown[]) =>
            ask.tray === true &&
            !this.leftWords.some(
              (ask2?: Dynamic, ..._extraArguments: unknown[]) =>
                ask2.bid === ask.bid &&
                (ask2.afterId ?? null) === (ask.afterId ?? null),
            ),
        );
      } catch {
        return;
      }
      if (items3.length !== 0) {
        for (let loadDataOperationControlVerdictResult22 of items3 as Dynamic)
          this.leftWords.push({
            ...loadDataOperationControlVerdictResult22,
            ...(this.served
              ? {
                  parked: true,
                }
              : {}),
          });
        if (this.served) {
          this.emit({
            t: `staged`,
            node: this.node,
            staged: items3.map(resolveDataOperationControlBid),
          });
        }
        (0, operationScope.emit7)();
      }
    },
    wordsWaitOver(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (dataOperationControlVerdict2 === undefined) {
        this.wordsBehind.clear();
      } else {
        this.wordsBehind.delete(dataOperationControlVerdict2);
      }
      if (!(this.wordsBehind.size > 0)) {
        if (this.wordsBehindTimer !== null) {
          operationScope.dataOperationControlVerdict.timers.clearTimeout(
            this.wordsBehindTimer,
          );
        }
        this.wordsBehindTimer = null;
        this.handOwedWords();
      }
    },
    inherit(
      life3?: Dynamic,
      options: Dynamic = 0,
      ..._extraArguments: unknown[]
    ): undefined {
      if (operationScope.enabled || this.dead) return;
      let DataOperationControlState11Item =
        DataOperationControlState11[options] ?? 400;
      Promise.race([
        operationScope.dataOperationControlVerdict.wal
          .load(this.node)
          .catch((..._extraArguments: unknown[]) => null),
        (0, operationScope.loadDataOperationControlVerdictHandler)(
          options === 0
            ? DataOperationControlState11Item
            : resolveDataOperationControlRound2(
                DataOperationControlState11Item,
                operationScope.dataOperationControlVerdict.random ??
                  ((..._extraArguments: unknown[]) => 1),
              ),
        ).then((..._extraArguments: unknown[]) => null),
      ]).then(
        (result?: Dynamic, ..._extraArguments: unknown[]) => {
          if (operationScope.enabled || this.dead) return;
          if (result === null)
            return options + 1 < DataOperationControlState11.length
              ? this.inherit(life3, options + 1)
              : (reportOperationEvent(`wal.heir_unread`, {
                  life: life3,
                  reads: options + 1,
                }),
                this.wordsWaitOver(life3));
          let uniqueItems7: Dynamic = new (Set as Dynamic)(
            [this.inflight, ...this.queue].map(
              (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                item?.opId,
            ),
          );
          let filteredResult: Dynamic = result.filter(
            (result2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              isPlainRecord(result2) &&
              result2.life === life3 &&
              !uniqueItems7.has(result2.opId),
          );
          this.wordsBehind.delete(life3);
          if (this.wordsBehind.size === 0 && this.wordsBehindTimer !== null) {
            operationScope.dataOperationControlVerdict.timers.clearTimeout(
              this.wordsBehindTimer,
            );
            this.wordsBehindTimer = null;
          }
          this.replay(
            filteredResult,
            new (Map as Dynamic)([[life3, true]]),
            true,
          );
        },
        (..._extraArguments: unknown[]): undefined => undefined,
      );
    },
    replay(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      context: Dynamic = false,
      ..._extraArguments: unknown[]
    ): undefined {
      let node: Dynamic = this.node;
      let matchesIncludes = (
        dataOperationControlVerdict3?: Dynamic,
        ..._extraArguments: unknown[]
      ) => {
        try {
          return (
            operationScope.dataOperationControlVerdict.wal
              .stagedLives?.(node)
              .includes(dataOperationControlVerdict3) === true
          );
        } catch {
          return false;
        }
      };
      {
        let items3: Dynamic = [
          ...dataOperationControlVerdict2.filter(
            (
              dataOperationControlVerdict3?: Dynamic,
              ..._extraArguments: unknown[]
            ) =>
              !(
                isPlainRecord(dataOperationControlVerdict3) &&
                dataOperationControlVerdict3.held === true
              ),
          ),
          ...dataOperationControlVerdict2.filter(
            (
              dataOperationControlVerdict3?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              isPlainRecord(dataOperationControlVerdict3) &&
              dataOperationControlVerdict3.held === true,
          ),
        ];
        let count10: number = 0;
        for (let loadDataOperationControlVerdictResult22 of items3 as Dynamic) {
          if (
            !isPlainRecord(loadDataOperationControlVerdictResult22) ||
            typeof loadDataOperationControlVerdictResult22.opId != `string` ||
            !Array.isArray(loadDataOperationControlVerdictResult22.ops)
          ) {
            if (
              isPlainRecord(loadDataOperationControlVerdictResult22) &&
              typeof loadDataOperationControlVerdictResult22.opId == `string`
            ) {
              operationScope.dataOperationControlVerdict.wal
                .trim(node, loadDataOperationControlVerdictResult22.opId)
                .catch((..._extraArguments: unknown[]): undefined => undefined);
            }
            continue;
          }
          let optionEntry: Dynamic =
            typeof loadDataOperationControlVerdictResult22.life == `string` &&
            loadDataOperationControlVerdictResult22.life !==
              operationScope.life2
              ? options.get(loadDataOperationControlVerdictResult22.life)
              : undefined;
          if (optionEntry === false) {
            reportOperationEvent(`wal.left_alone`, {
              opId: loadDataOperationControlVerdictResult22.opId,
              life: String(loadDataOperationControlVerdictResult22.life),
            });
            if (
              operationScope.uniqueItems3.has(
                String(loadDataOperationControlVerdictResult22.life),
              )
            )
              continue;
            (0, operationScope.wait)(
              String(loadDataOperationControlVerdictResult22.life),
            );
            if (
              operationScope.uniqueItems2.has(
                String(loadDataOperationControlVerdictResult22.life),
              ) &&
              operationScope.dataOperationControlVerdict.swappedIn?.() ===
                true &&
              matchesIncludes(
                String(loadDataOperationControlVerdictResult22.life),
              )
            ) {
              this.wordsBehind.add(
                String(loadDataOperationControlVerdictResult22.life),
              );
              this.wordsBehindTimer ??=
                operationScope.dataOperationControlVerdict.timers.setTimeout(
                  (..._extraArguments: unknown[]): undefined => {
                    this.wordsBehindTimer = null;
                    if (!operationScope.enabled && !this.dead) {
                      this.wordsWaitOver();
                    }
                  },
                  dataOperationControlValue50004,
                );
            }
            continue;
          }
          let dataOperationControlOps2: Dynamic =
            resolveDataOperationControlOps2(
              loadDataOperationControlVerdictResult22,
              true,
            );
          this.mendHeard(dataOperationControlOps2);
          if (dataOperationControlOps2.held) {
            delete dataOperationControlOps2.held;
            delete dataOperationControlOps2.sent;
            reportOperationEvent(`wal.held_replayed`, {
              opId: loadDataOperationControlVerdictResult22.opId,
              ops: loadDataOperationControlVerdictResult22.ops.length,
            });
          }
          if (optionEntry === true) {
            dataOperationControlOps2.lifeDead = true;
          }
          if (this.served) {
            dataOperationControlOps2.unseen = true;
            this.unseenOps.add(loadDataOperationControlVerdictResult22.opId);
          }
          this.queue.push(dataOperationControlOps2);
          this.noteSent(loadDataOperationControlVerdictResult22.opId);
          if (
            typeof loadDataOperationControlVerdictResult22.life == `string` &&
            loadDataOperationControlVerdictResult22.life !==
              operationScope.life2
          ) {
            count10 += 1;
          }
        }
        if (count10 > 0) {
          (0, operationScope.claimed)(
            `rows`,
            count10,
            context ? undefined : node,
          );
        }
        if (
          !operationScope.enabled21 &&
          operationScope.loadDataOperationControlVerdictResult17 !== undefined
        ) {
          (0, operationScope.rekeyHolds2)(
            operationScope.loadDataOperationControlVerdictResult17,
          );
        }
        if (!operationScope.enabled21 && operationScope.enabled23) {
          (0, operationScope.rekeyHolds5)();
        }
        if (operationScope.enabled21) {
          if (operationScope.label4 !== undefined) {
            (0, operationScope.rekeyHolds3)(operationScope.label4);
          }
          (0, operationScope.rekeyHolds4)();
          (0, operationScope.emit8)();
        }
        (0, operationScope.emit7)();
        this.pump();
      }
    },
    takeLeft(..._extraArguments: unknown[]) {
      try {
        this.strays =
          operationScope.dataOperationControlVerdict.wal.strays?.(this.node) ??
          0;
      } catch {
        this.strays = 0;
      }
      if (
        this.leftRead ||
        (operationScope.dataOperationControlVerdict.wal.ready !== undefined &&
          !operationScope.matchesReady)
      )
        return false;
      this.leftRead = true;
      try {
        this.leftWords =
          operationScope.dataOperationControlVerdict.wal.stagedWords?.(
            this.node,
          ) ?? [];
      } catch {
        this.leftWords = [];
      }
      let filteredLeftWordsCount: Dynamic = this.leftWords.filter(
        (leftWord?: Dynamic, ..._extraArguments: unknown[]) =>
          leftWord.tray === true,
      ).length;
      if (this.leftWords.length > filteredLeftWordsCount) {
        (0, operationScope.claimed)(
          `words`,
          this.leftWords.length - filteredLeftWordsCount,
          this.node,
        );
      }
      if (filteredLeftWordsCount > 0) {
        (0, operationScope.claimed)(`tray`, filteredLeftWordsCount, this.node);
      }
      return this.trayHolds();
    },
    pending(..._extraArguments: unknown[]): Dynamic {
      return this.queue.length + +!!this.inflight + this.provisional.size;
    },
    out(..._extraArguments: unknown[]): Dynamic {
      return this.pending() + this.heldWords;
    },
    heldWordsOff(why?: Dynamic, ..._extraArguments: unknown[]): undefined {
      if (this.heldWords > 0) {
        reportOperationEvent(`held.off`, {
          why: why,
          held: this.heldWords,
        });
      }
      this.heldWords = 0;
      if (this.heldWordsTimer !== null) {
        operationScope.dataOperationControlVerdict.timers.clearTimeout(
          this.heldWordsTimer,
        );
      }
      this.heldWordsTimer = null;
    },
    wordsHeld(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (operationScope.enabled || this.dead) return;
      let held =
        Number.isFinite(dataOperationControlVerdict2) &&
        dataOperationControlVerdict2 > 0
          ? Math.floor(dataOperationControlVerdict2)
          : 0;
      let heldWords: Dynamic = this.heldWords;
      this.heldWords = held;
      if (this.heldWordsTimer !== null) {
        operationScope.dataOperationControlVerdict.timers.clearTimeout(
          this.heldWordsTimer,
        );
      }
      this.heldWordsTimer = null;
      if (held > 0) {
        this.heldWordsTimer =
          operationScope.dataOperationControlVerdict.timers.setTimeout(
            (..._extraArguments: unknown[]): undefined => {
              this.heldWordsTimer = null;
              if (
                !(operationScope.enabled || this.dead || this.heldWords === 0)
              ) {
                reportOperationEvent(`held.expired`, {
                  held: this.heldWords,
                  owed: this.owed,
                  pending: this.pending(),
                });
                this.heldWords = 0;
                this.heldDrained();
              }
            },
            dataOperationControlValue30002,
          );
        if (heldWords === 0) {
          reportOperationEvent(`held.words`, {
            held: held,
            pending: this.pending(),
          });
        }
        return;
      }
      if (heldWords > 0) {
        this.heldDrained();
      }
    },
    heldDrained(..._extraArguments: unknown[]): undefined {
      reportOperationEvent(`held.cleared`, {
        owed: this.owed,
        pending: this.pending(),
      });
      if (this.pending() === 0) {
        this.pump();
      }
    },
    heldWordsRefresh(..._extraArguments: unknown[]): undefined {
      if (this.heldWords > 0) {
        this.wordsHeld(this.heldWords);
      }
    },
    emit(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      if (this.dead) return false;
      if (
        dataOperationControlVerdict2.t === `deny` &&
        this.shortGrace.size > 0
      ) {
        this.shortGrace.clear();
        queueMicrotask(operationScope.emit7);
      }
      if (
        this.nodeGone &&
        dataOperationControlVerdict2.t === `state` &&
        dataOperationControlVerdict2.state !== `readonly`
      ) {
        let dataOperationControlVerdict3: Dynamic =
          dataOperationControlVerdict2;
        return typeof dataOperationControlVerdict3.words == `string` ||
          dataOperationControlVerdict3.pageBusy === true ||
          dataOperationControlVerdict3.unknown === true ||
          dataOperationControlVerdict3.storeShed === true ||
          dataOperationControlVerdict3.openBusy === true ||
          dataOperationControlVerdict3.openFailed === true ||
          dataOperationControlVerdict3.linkDown === true ||
          dataOperationControlVerdict3.retrying === true ||
          dataOperationControlVerdict3.landed === true
          ? false
          : this.emit({
              ...dataOperationControlVerdict2,
              state: `readonly`,
              nodeGone: true,
            });
      }
      if (
        this.nodeGone &&
        dataOperationControlVerdict2.t === `snapshot` &&
        dataOperationControlVerdict2.nodeGone !== true
      )
        return this.emit({
          ...dataOperationControlVerdict2,
          nodeGone: true,
        });
      let matchesT =
        dataOperationControlVerdict2.t === `state` &&
        !this.served &&
        (dataOperationControlVerdict2.halt === true ||
          dataOperationControlVerdict2.retrying === true ||
          dataOperationControlVerdict2.openFailed === true);
      if (dataOperationControlVerdict2.t === `state`) {
        let {
          staged: dataOperationControlVerdict3,
          ...dataOperationControlVerdict4
        }: Dynamic = dataOperationControlVerdict2;
        if (matchesT) {
          this.lastFace = dataOperationControlVerdict4;
        } else {
          if (this.served) {
            this.lastFace = null;
          }
        }
      }
      let record4: Dynamic =
        matchesT && this.leftWords.length > 0
          ? {
              ...dataOperationControlVerdict2,
              staged: this.leftWords.map(resolveDataOperationControlBid),
            }
          : dataOperationControlVerdict2;
      resolveObservabilityBootNode2(record4);
      let matchesDownsCount = this.downs.size > 0;
      for (let loadDataOperationControlVerdictResult22 of this.downs as Dynamic)
        try {
          loadDataOperationControlVerdictResult22(record4);
        } catch {
          matchesDownsCount = false;
        }
      if (
        record4.t === `snapshot` &&
        record4.more !== true &&
        record4.compare !== true &&
        this.remountOwed &&
        (this.mountReadonly || (this.servedSlow && this.unanswered()))
      ) {
        let staged: Dynamic = this.leftWords
          .filter(
            (leftWord?: Dynamic, ..._extraArguments: unknown[]) =>
              !leftWord.parked,
          )
          .map(resolveDataOperationControlBid);
        let state2 = (0, operationScope.state)();
        let dataOperationControlVerdictHandler: Dynamic =
          operationScope.kind !== null &&
          !this.nodeGone &&
          state2 !== `readonly`
            ? (0, operationScope.loadDataOperationControlVerdictHandler25)(
                this.node,
              )
            : {
                t: `state`,
                node: this.node,
                state: this.nodeGone ? `readonly` : state2,
              };
        if (staged.length > 0) {
          this.emit({
            ...dataOperationControlVerdictHandler,
            staged: staged,
          });
        }
      }
      return matchesDownsCount;
    },
    onDown(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      this.downs.add(dataOperationControlVerdict2);
      return (..._extraArguments: unknown[]): Dynamic =>
        this.downs.delete(dataOperationControlVerdict2);
    },
    mendHeard(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let updateDataOperationControlEditorSaid2: Dynamic =
        updateDataOperationControlEditorSaid(dataOperationControlVerdict2);
      if (updateDataOperationControlEditorSaid2.size !== 0) {
        this.rekeyWords(
          (
            dataOperationControlVerdict3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            updateDataOperationControlEditorSaid2.get(
              dataOperationControlVerdict3,
            ) ?? dataOperationControlVerdict3,
        );
        this.rekeyHolds(
          (
            dataOperationControlVerdict3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            updateDataOperationControlEditorSaid2.get(
              dataOperationControlVerdict3,
            ) ?? dataOperationControlVerdict3,
        );
      }
    },
    remounted(..._extraArguments: unknown[]): undefined {
      for (let ask of this.myWords.values() as Dynamic) {
        let leftWord: Dynamic = this.leftWords.find(
          (ask2?: Dynamic, ..._extraArguments: unknown[]) =>
            ask2.tray !== true &&
            ask2.bid === ask.bid &&
            (ask2.afterId ?? null) === (ask.afterId ?? null),
        );
        if (leftWord) {
          leftWord.text = `${leftWord.text}${ask.text}`;
        } else {
          this.leftWords.push({
            ...ask,
            moved: true,
          });
        }
      }
      this.myWords.clear();
      this.servedSlow = false;
      let items3: Dynamic = [...this.holds.values()];
      for (let loadDataOperationControlVerdictResult22 of items3 as Dynamic) {
        let dataOperationControlOps2: Dynamic = resolveDataOperationControlOps2(
          loadDataOperationControlVerdictResult22,
          false,
        );
        this.mendHeard(dataOperationControlOps2);
        delete dataOperationControlOps2.held;
        dataOperationControlOps2.seq = ++operationScope.index;
        this.queue.push(dataOperationControlOps2);
        this.noteSent(loadDataOperationControlVerdictResult22.opId);
        reportOperationEvent(`mount.held_queued`, {
          opId: loadDataOperationControlVerdictResult22.opId,
          ops: loadDataOperationControlVerdictResult22.ops.length,
        });
      }
      this.holds.clear();
      if (items3.length > 0) {
        queueMicrotask(
          (..._extraArguments: unknown[]): undefined =>
            void (
              !operationScope.enabled &&
              !this.dead &&
              ((0, operationScope.emit7)(), this.pump())
            ),
        );
      }
      for (let loadDataOperationControlVerdictResult22 of this
        .ackedRecent as Dynamic)
        if (
          this.leftWords.some(
            (leftWord?: Dynamic, ..._extraArguments: unknown[]) =>
              leftWord.moved === true,
          )
        ) {
          this.dedupeWords(
            loadDataOperationControlVerdictResult22.ops,
            loadDataOperationControlVerdictResult22.results,
            loadDataOperationControlVerdictResult22.predicted,
            loadDataOperationControlVerdictResult22.learned,
            loadDataOperationControlVerdictResult22.homes,
            (
              dataOperationControlVerdict2?: Dynamic,
              ..._extraArguments: unknown[]
            ) =>
              dataOperationControlVerdict2.moved === true &&
              (dataOperationControlVerdict2.since ?? 0) <
                loadDataOperationControlVerdictResult22.seq,
          );
        }
      this.remountOut = new (Set as Dynamic)(
        [
          ...this.handed,
          ...(this.inflight ? [this.inflight] : []),
          ...this.queue,
          ...this.provisional.values(),
        ].map(
          (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => item.opId,
        ),
      );
      for (let loadDataOperationControlVerdictResult22 of this
        .leftWords as Dynamic)
        if (loadDataOperationControlVerdictResult22.withEditor === true) {
          [
            loadDataOperationControlVerdictResult22.parked,
            loadDataOperationControlVerdictResult22.withEditor,
          ] = [false, false];
          delete loadDataOperationControlVerdictResult22.quiet;
        }
      let runs: Dynamic = this.leftWords.filter(
        (leftWord?: Dynamic, ..._extraArguments: unknown[]) => !leftWord.parked,
      ).length;
      if (runs > 0) {
        this.remountOwed = true;
        reportOperationEvent(`mount.owed`, {
          runs: runs,
          pending: this.pending(),
        });
        (0, operationScope.emit7)();
      }
    },
    orphanedRescue(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let provisionalEntry: Dynamic = this.provisional.get(
        dataOperationControlVerdict2,
      );
      if (
        provisionalEntry === undefined ||
        provisionalEntry.replayed ||
        !this.remountOut.has(dataOperationControlVerdict2)
      )
        return [];
      let keepRescued: Dynamic = this.keepRescued(
        updateDataOperationControlBid(
          provisionalEntry.ops,
          provisionalEntry.homes,
        ),
        provisionalEntry,
      );
      this.trayMovedBehind(provisionalEntry);
      return keepRescued;
    },
    trayMovedBehind(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        dataOperationControlVerdict2.replayed ||
        !this.remountOut.has(dataOperationControlVerdict2.opId)
      )
        return;
      let uniqueItems7: Dynamic = new (Set as Dynamic)(
        resolveDataOperationControlBatchesDone(
          dataOperationControlVerdict2,
        ).flat(),
      );
      for (let loadDataOperationControlVerdictResult22 of this
        .leftWords as Dynamic)
        if (
          loadDataOperationControlVerdictResult22.moved === true &&
          loadDataOperationControlVerdictResult22.tray !== true &&
          typeof loadDataOperationControlVerdictResult22.afterId == `string` &&
          uniqueItems7.has(loadDataOperationControlVerdictResult22.afterId)
        ) {
          loadDataOperationControlVerdictResult22.tray = true;
          try {
            this.stagePut(loadDataOperationControlVerdictResult22);
          } catch {}
        }
    },
    deferMount(hint?: Dynamic, ..._extraArguments: unknown[]): undefined {
      if (this.mountWait !== null) return void (this.mountWait.hint = hint);
      reportOperationEvent(`mount.wait`, {
        pending: this.pending(),
      });
      this.mountWait = {
        hint: hint,
        timer: operationScope.dataOperationControlVerdict.timers.setTimeout(
          (..._extraArguments: unknown[]) => this.serveMount(`slow`),
          dataOperationControlValue20005,
        ),
      };
    },
    serveMount(why?: Dynamic, ..._extraArguments: unknown[]): undefined {
      let mountWait: Dynamic = this.mountWait;
      if (!(mountWait === null || (why === `drained` && this.unanswered()))) {
        this.mountWait = null;
        operationScope.dataOperationControlVerdict.timers.clearTimeout(
          mountWait.timer,
        );
        if (!(operationScope.enabled || this.dead)) {
          reportOperationEvent(`mount.serve`, {
            why: why,
            pending: this.pending(),
          });
          this.servedSlow = why === `slow`;
          this.need({
            ...mountWait.hint,
            inst: this.mountInst ?? mountWait.hint.inst,
            readonly: this.mountReadonly,
          });
        }
      }
    },
    need(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      if (!(operationScope.enabled || this.dead)) {
        if (
          dataOperationControlVerdict2 === undefined &&
          this.mountWait !== null
        ) {
          if ((0, operationScope.honourOpsOnFeed)()) {
            this.ringDue = false;
          } else {
            this.wantRev = Math.max(this.wantRev, this.lastRev + 1);
          }
          reportOperationEvent(`mount.wait.ring`);
          return;
        }
        if (dataOperationControlVerdict2?.why === `mount`) {
          this.toldHwm = null;
          if (operationScope.enabled21) {
            (0, operationScope.emit8)();
          }
          this.orphanStageSaid = null;
          this.orphanLatched = false;
          this.heldWordsOff(`mount`);
          let filteredLeftWords: Dynamic = this.leftWords.filter(
            (leftWord?: Dynamic, ..._extraArguments: unknown[]) =>
              leftWord.tray === true &&
              leftWord.parked === true &&
              leftWord.quiet !== true &&
              leftWord.text !== `` &&
              (leftWord.cut === undefined ||
                (leftWord.cut !== null &&
                  typeof leftWord.cut == `object` &&
                  Number.isInteger(leftWord.cut.whole) &&
                  leftWord.cut.whole > 0 &&
                  leftWord.text.length === leftWord.cut.whole)),
          );
          if (filteredLeftWords.length > 0) {
            this.emit({
              t: `staged`,
              node: this.node,
              staged: filteredLeftWords.map(
                (
                  filteredLeftWord?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  Object.assign(
                    resolveDataOperationControlBid(filteredLeftWord),
                    {
                      live: true,
                    },
                  ),
              ),
            });
          }
          this.mountReadonly = dataOperationControlVerdict2.readonly === true;
          let served: Dynamic =
            this.served &&
            typeof dataOperationControlVerdict2.inst == `string` &&
            this.mountInst !== null &&
            dataOperationControlVerdict2.inst !== this.mountInst;
          if (typeof dataOperationControlVerdict2.inst == `string`) {
            this.mountInst = dataOperationControlVerdict2.inst;
          }
          if (served) {
            this.remounted();
            if (this.unanswered() && !operationScope.enabled16)
              return this.deferMount(dataOperationControlVerdict2);
            this.handOwedWords();
          } else if (this.mountWait !== null)
            return this.deferMount(dataOperationControlVerdict2);
        }
        if (operationScope.enabled16) {
          if (!this.served) {
            this.read(undefined, dataOperationControlVerdict2?.why);
          }
          return;
        }
        if (dataOperationControlVerdict2?.why === `comments`)
          return this.freshen();
        if (
          dataOperationControlVerdict2?.why ===
          `ops on the feed: a peer's row this page could not place by id`
        ) {
          if ((0, operationScope.honourOpsOnFeed)()) {
            let seq: Dynamic = this.heardSeq >= 0 ? this.heardSeq : undefined;
            return seq !== undefined && seq <= this.pictureSeq
              ? void reportOperationEvent(`told.inPicture`, {
                  why: dataOperationControlVerdict2.why,
                  seq: seq,
                  pictureSeq: this.pictureSeq,
                })
              : this.wholeRead(
                  dataOperationControlVerdict2.block
                    ? `${dataOperationControlVerdict2.why} [${dataOperationControlVerdict2.block}]`
                    : dataOperationControlVerdict2.why,
                  this.lastRev > 0 ? this.lastRev : undefined,
                  DataOperationControlStyles4,
                  seq,
                );
          }
          if (!dataOperationControlVerdict2.block) return;
        }
        if (
          typeof dataOperationControlVerdict2?.block == `string` &&
          dataOperationControlVerdict2.block &&
          this.served
        )
          return this.readBlock(
            dataOperationControlVerdict2.block,
            false,
            true,
            false,
            dataOperationControlVerdict2.pen === true,
          );
        if ((0, operationScope.honourOpsOnFeed)()) {
          if (dataOperationControlVerdict2 === undefined) {
            this.ringDue = false;
          }
          if (
            dataOperationControlVerdict2?.why === `mount` &&
            !this.served &&
            this.readingWhole
          ) {
            reportOperationEvent(`told.mountUnderRead`, {
              pending: this.pending(),
            });
          } else {
            this.wholeRead(
              dataOperationControlVerdict2?.why ??
                (dataOperationControlVerdict2 === undefined
                  ? `the feed (re)attached or rang with no row`
                  : `the editor asked`),
              dataOperationControlVerdict2?.rev,
              dataOperationControlVerdict2?.why ===
                `re-read what the room made of a paste` ||
                dataOperationControlVerdict2?.why ===
                  `recovering after a contained editor error; re-reading`
                ? dataOperationControlVerdict2.why
                : undefined,
            );
          }
          if (this.pollTimer === null) {
            this.armPoll();
          }
          return;
        }
        if (dataOperationControlVerdict2 === undefined) {
          this.wantRev = Math.max(this.wantRev, this.lastRev + 1);
        } else {
          if (dataOperationControlVerdict2.rev !== undefined) {
            this.wantRev = Math.max(
              this.wantRev,
              dataOperationControlVerdict2.rev,
            );
          }
        }
        if (dataOperationControlVerdict2?.rev !== undefined) {
          this.roomSeen(dataOperationControlVerdict2.rev);
        }
        if (
          dataOperationControlVerdict2?.whole ||
          (dataOperationControlVerdict2 !== undefined &&
            dataOperationControlVerdict2.rev === undefined)
        ) {
          if (
            dataOperationControlVerdict2?.why !==
              `re-read what the room made of a paste` &&
            dataOperationControlVerdict2?.why !== `mount` &&
            dataOperationControlVerdict2?.why !==
              `recovering after a contained editor error; re-reading` &&
            dataOperationControlVerdict2?.why !==
              `a block read by id holds fewer named blocks than this page draws inside it` &&
            this.noWhole(dataOperationControlVerdict2?.why ?? `asked`)
          ) {
            this.read(this.since());
          } else {
            this.read(undefined, dataOperationControlVerdict2?.why);
          }
        } else {
          if (
            dataOperationControlVerdict2?.rev === undefined ||
            dataOperationControlVerdict2.rev > this.lastRev
          ) {
            this.read(this.since());
          }
        }
        if (this.pollTimer === null) {
          this.armPoll();
        }
      }
    },
  };
  return methods;
}
