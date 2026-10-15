/** BaoCut: operation controller node feed. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import type { OperationControllerScope } from "./controller-contracts";
import { emitTelemetryEvent } from "../observability/telemetry-3";
import { createPagesSyncSerialHoleEvent } from "../observability/browser-and-operation-events-1";
import { reportOperationEvent } from "../observability/boot";
import {
  DataOperationControlARowPastRevsThisPageNeverHeard,
  DataOperationControlStyles4,
  dataOperationControlValue150002,
  dataOperationControlValue20007,
} from "../data/operation-control-2";
import {
  isDataOperationControlRevive,
  isPlainRecord,
  resolveDataOperationControlEdit,
  resolveDataOperationControlInsert,
  resolveDataOperationControlIsInteger2,
  resolveDataOperationControlMinted4,
} from "../data/operation-control-4";
export function createOperationNodeFeed(
  operationScope: Pick<
    OperationControllerScope,
    | "enabled"
    | "visibility"
    | "dataOperationControlVerdict"
    | "honourOpsOnFeed"
    | "reconcile"
    | "index3"
    | "index4"
    | "kind"
    | "emit6"
    | "rearmGap"
    | "emit7"
    | "state"
    | "loadDataOperationControlVerdictHandler25"
    | "lookup"
    | "loadDataOperationControlVerdictHandler21"
    | "dataOperationControlFloor2"
    | "dataOperationControlFloor"
    | "loadDataOperationControlVerdictResult10"
    | "enabled16"
  >,
): Record<string, Dynamic> {
  const methods: Record<string, Dynamic> & ThisType<Dynamic> = {
    freshen(..._extraArguments: unknown[]): undefined {
      if (!(this.freshTimer !== null || operationScope.enabled || this.dead)) {
        if (this.served && operationScope.visibility.state() !== `visible`)
          return void (this.freshOwed = true);
        this.freshTimer =
          operationScope.dataOperationControlVerdict.timers.setTimeout(
            (..._extraArguments: unknown[]): undefined => {
              this.freshTimer = null;
              this.wantComments = !this.commentsBarred;
              this.commentsAsk += 1;
              if (!(operationScope.enabled || this.dead)) {
                if ((0, operationScope.honourOpsOnFeed)() && this.served)
                  return void this.readComments();
                if (!operationScope.reconcile && this.served) {
                  let since: Dynamic = this.since();
                  if (since !== undefined) {
                    this.read(since);
                  }
                  return;
                }
                this.read(undefined);
              }
            },
            150,
          );
      }
    },
    ownFrame(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      if (options) return this.mine(options);
      if (
        Array.isArray(dataOperationControlVerdict2.opIds) &&
        dataOperationControlVerdict2.opIds.some(
          (opId2?: unknown, ..._extraArguments: unknown[]): Dynamic =>
            typeof opId2 == `string` &&
            (this.provisional.has(opId2) || this.sentOp(opId2)),
        )
      )
        return true;
      let edit: Dynamic = isPlainRecord(dataOperationControlVerdict2.edit)
        ? dataOperationControlVerdict2.edit
        : dataOperationControlVerdict2;
      let opId: Dynamic = typeof edit.opId == `string` ? edit.opId : ``;
      let item =
        [edit.by, edit.sess].find(
          (item2?: unknown, ..._extraArguments: unknown[]) =>
            typeof item2 == `string`,
        ) ?? ``;
      return opId
        ? this.mine({
            opId: opId,
            by: item,
          }) ||
            (!item && this.sentOp(opId))
        : item !== `` &&
            item ===
              operationScope.dataOperationControlVerdict.session.get()?.label;
    },
    row(dataOperationControlVerdict2?: Dynamic, ..._extraArguments: unknown[]) {
      this.heard();
      if ((0, operationScope.honourOpsOnFeed)())
        return this.told(dataOperationControlVerdict2);
      let dataOperationControlMinted4: Dynamic =
        resolveDataOperationControlMinted4(dataOperationControlVerdict2);
      let rev: Dynamic = resolveDataOperationControlEdit(
        dataOperationControlVerdict2,
      );
      let ownFrame: Dynamic = this.ownFrame(
        dataOperationControlVerdict2,
        dataOperationControlMinted4,
      );
      this.roomSeen(
        dataOperationControlMinted4 ? dataOperationControlMinted4.rev : rev,
        ownFrame,
      );
      if (!ownFrame) {
        this.orderActivity();
      }
      this.holedRead.clear();
      if (
        rev !== undefined &&
        Array.isArray(dataOperationControlVerdict2.opIds)
      ) {
        let filteredOpIds: Dynamic = dataOperationControlVerdict2.opIds.filter(
          (opId?: unknown, ..._extraArguments: unknown[]): Dynamic =>
            typeof opId == `string` && this.provisional.has(opId),
        );
        if (filteredOpIds.length > 0) return this.durable(filteredOpIds, rev);
      }
      if (
        !dataOperationControlMinted4 &&
        rev !== undefined &&
        rev > this.lastRev &&
        this.served
      ) {
        let edit: Dynamic = isPlainRecord(dataOperationControlVerdict2.edit)
          ? dataOperationControlVerdict2.edit
          : dataOperationControlVerdict2;
        let opId: Dynamic = typeof edit.opId == `string` ? edit.opId : ``;
        let item =
          [edit.by, edit.sess].find(
            (item2?: unknown, ..._extraArguments: unknown[]) =>
              typeof item2 == `string`,
          ) ?? ``;
        let mine: Dynamic = opId
          ? this.mine({
              opId: opId,
              by: item,
            }) ||
            (!item && this.sentOp(opId))
          : !item ||
            this.mine({
              opId: opId,
              by: item,
            });
        if (!mine) {
          this.wantForeign = Math.max(this.wantForeign, rev);
        }
        if (mine && this.pending() > 0) {
          this.wantRev = Math.max(this.wantRev, rev);
          if (this.pollTimer === null) {
            this.armPoll();
          }
          return this.awaitEcho();
        }
      }
      if (
        !dataOperationControlMinted4 &&
        rev !== undefined &&
        typeof dataOperationControlVerdict2.print == `string` &&
        this.landPrint(dataOperationControlVerdict2.print, rev)
      )
        return;
      if (!dataOperationControlMinted4)
        return this.need(
          rev === undefined
            ? undefined
            : {
                rev: rev,
              },
        );
      let max = Math.max(this.lastRev, this.shownRev);
      if (!(this.dead || dataOperationControlMinted4.rev <= max)) {
        if (!this.served || dataOperationControlMinted4.revFirst !== max + 1) {
          if (dataOperationControlMinted4.revFirst > max + 1) {
            this.park(dataOperationControlMinted4);
          }
          if (!this.mine(dataOperationControlMinted4)) {
            this.wantForeign = Math.max(
              this.wantForeign,
              dataOperationControlMinted4.rev,
            );
          }
          return dataOperationControlMinted4.rev <= this.ackedRev
            ? undefined
            : this.need({
                rev: dataOperationControlMinted4.rev,
              });
        }
        this.applyRow(dataOperationControlMinted4);
        this.drainParked();
      }
    },
    durable(
      dataOperationControlVerdict2?: Dynamic,
      rev?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      operationScope.index3 = 0;
      operationScope.index4 = 0;
      if (operationScope.kind === null) {
        (0, operationScope.emit6)();
      } else {
        (0, operationScope.rearmGap)(`a write landed (the stream burst's row)`);
      }
      let enabled26 = false;
      for (let opId of dataOperationControlVerdict2 as Dynamic) {
        let provisionalEntry: Dynamic = this.provisional.get(opId);
        if (provisionalEntry) {
          if (provisionalEntry.unseen) {
            enabled26 = true;
          }
          this.provisional.delete(opId);
          operationScope.dataOperationControlVerdict.wal
            .trim(this.node, opId)
            .catch((..._extraArguments: unknown[]): undefined => undefined);
          this.emit({
            t: `ack`,
            node: this.node,
            opId: opId,
            results: provisionalEntry.results,
            rev: rev,
            ...(provisionalEntry.padded?.length
              ? {
                  padded: provisionalEntry.padded,
                }
              : {}),
            ...(provisionalEntry.flown?.length
              ? {
                  flown: provisionalEntry.flown,
                }
              : {}),
          });
          reportOperationEvent(`ack.allow`, {
            rev: rev,
          });
          if (
            isDataOperationControlRevive(
              provisionalEntry.ops,
              provisionalEntry.results,
            )
          ) {
            this.freshen();
          }
        }
      }
      this.ackedRev = Math.max(this.ackedRev, rev);
      this.heardRev = Math.max(this.heardRev, rev);
      if ((0, operationScope.honourOpsOnFeed)()) {
        let serialHole = context
          ? this.serialHole(context)
          : (this.heardMine(rev), false);
        this.bookRev(
          rev,
          !serialHole && !this.gapOwed && rev <= this.frontier(),
        );
      } else if (this.served && !enabled26 && rev === this.lastRev + 1) {
        if (this.groundRev >= this.lastRev) {
          this.groundTo(rev);
        }
        this.lastRev = rev;
        this.drainParked();
      } else {
        if (this.served && rev > this.lastRev) {
          this.wantRev = Math.max(this.wantRev, rev);
          if (this.pollTimer === null) {
            this.armPoll();
          }
          this.awaitEcho();
        }
      }
      this.met();
      (0, operationScope.emit7)();
      if (this.slow && this.pending() === 0) {
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
      if (this.provisional.size === 0)
        for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
          loadDataOperationControlVerdictResult22.pump();
    },
    stream(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (operationScope.enabled || this.dead || !this.served) return;
      let actor: Dynamic = isPlainRecord(dataOperationControlVerdict2.actor)
        ? dataOperationControlVerdict2.actor
        : {};
      let sess: Dynamic = typeof actor.sess == `string` ? actor.sess : ``;
      let opId: Dynamic =
        typeof dataOperationControlVerdict2.opId == `string`
          ? dataOperationControlVerdict2.opId
          : ``;
      let label5: Dynamic =
        operationScope.dataOperationControlVerdict.session.get()?.label;
      if (
        (!(opId !== `` && this.unseenOp(opId)) &&
          ((label5 !== undefined && sess === label5) ||
            (opId !== `` && this.sentOp(opId)))) ||
        !Array.isArray(dataOperationControlVerdict2.ops) ||
        !Array.isArray(dataOperationControlVerdict2.results) ||
        dataOperationControlVerdict2.ops.length === 0
      )
        return;
      let row: Dynamic = {
        rev: 0,
        revFirst: 0,
        by: sess,
        ops: dataOperationControlVerdict2.ops,
        results: dataOperationControlVerdict2.results,
        opId: opId,
      };
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
    },
    heard(..._extraArguments: unknown[]): undefined {
      if (this.quietTimer !== null) {
        operationScope.dataOperationControlVerdict.timers.clearTimeout(
          this.quietTimer,
        );
      }
      this.quietTimer = null;
      if (
        !(
          operationScope.enabled ||
          this.dead ||
          this.feedUp !== true ||
          (0, operationScope.loadDataOperationControlVerdictHandler21)()
        )
      ) {
        this.quietTimer =
          operationScope.dataOperationControlVerdict.timers.setTimeout(
            (..._extraArguments: unknown[]): undefined => {
              this.quietTimer = null;
              this.liveness();
            },
            operationScope.visibility.idle()
              ? operationScope.dataOperationControlFloor2
              : operationScope.dataOperationControlFloor,
          );
      }
    },
    liveness(..._extraArguments: unknown[]): undefined {
      if (
        !(
          operationScope.enabled ||
          this.dead ||
          this.feedUp !== true ||
          (0, operationScope.loadDataOperationControlVerdictHandler21)()
        )
      ) {
        if ((0, operationScope.honourOpsOnFeed)()) {
          this.probe(false);
        } else {
          if (this.lastRev >= 0) {
            this.read(this.since());
          }
        }
        this.heard();
      }
    },
    visibilityChanged(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        operationScope.enabled ||
        this.dead ||
        (0, operationScope.loadDataOperationControlVerdictHandler21)()
      )
        return;
      if (dataOperationControlVerdict2 === `idle`) {
        if (this.quietTimer !== null) {
          this.heard();
        }
        if (this.orderTimer !== null) {
          operationScope.dataOperationControlVerdict.timers.clearTimeout(
            this.orderTimer,
          );
        }
        this.orderTimer = null;
        return;
      }
      if (dataOperationControlVerdict2 === `visible` && this.freshOwed) {
        this.freshOwed = false;
        if (
          (0, operationScope.honourOpsOnFeed)() &&
          this.served &&
          ((this.gapOwed &&
            ((this.gapTimer !== null && this.gapSlow) || this.stoodAt >= 0)) ||
            (options && this.feedUp === true))
        ) {
          this.wantComments = !this.commentsBarred;
          this.commentsAsk += 1;
        } else {
          this.freshen();
        }
      }
      let enabled26 = false;
      if (
        dataOperationControlVerdict2 === `visible` &&
        this.served &&
        this.gapOwed &&
        ((this.gapTimer !== null && this.gapSlow) || this.stoodAt >= 0)
      ) {
        if (this.gapTimer !== null) {
          operationScope.dataOperationControlVerdict.timers.clearTimeout(
            this.gapTimer,
          );
        }
        this.gapTimer = null;
        this.gapSlow = false;
        this.stoodAt = -1;
        enabled26 = true;
        this.gapRead();
      }
      if (!(dataOperationControlVerdict2 !== `visible` || !options)) {
        if (enabled26) {
          this.heard();
        } else {
          if (this.feedUp === true) {
            this.liveness();
          } else {
            if (!(0, operationScope.honourOpsOnFeed)() && this.lastRev >= 0) {
              this.read(this.since());
            }
          }
        }
        this.pollWake();
        if (this.orderActive) {
          this.orderArm();
        }
      }
    },
    feed(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        !(
          operationScope.enabled ||
          this.dead ||
          this.feedUp === dataOperationControlVerdict2
        )
      ) {
        this.feedUp = dataOperationControlVerdict2;
        if (!dataOperationControlVerdict2) {
          this.ringDue = false;
        }
        console.info(
          dataOperationControlVerdict2
            ? `opTransport: room feed attached — since-read poll off (liveness only)`
            : `opTransport: room feed not attached — since-read poll on until it is`,
        );
        this.heard();
        this.pollWake();
        if (dataOperationControlVerdict2) {
          this.roadMoved();
        }
        if (this.pollTimer === null) {
          this.armPoll();
        }
      }
    },
    frontier(..._extraArguments: unknown[]) {
      let max: number = Math.max(this.toldRev, this.wholePicRev);
      for (let enabled26: boolean = true; enabled26; ) {
        enabled26 = false;
        for (let loadDataOperationControlVerdictResult22 of this
          .toldSpans as Dynamic)
          if (
            loadDataOperationControlVerdictResult22.lo <= max + 1 &&
            loadDataOperationControlVerdictResult22.hi > max
          ) {
            [max, enabled26] = [
              loadDataOperationControlVerdictResult22.hi,
              true,
            ];
          }
      }
      this.toldSpans = this.toldSpans.filter(
        (toldSpan?: Dynamic, ..._extraArguments: unknown[]) =>
          toldSpan.hi > max,
      );
      return (this.toldRev = Math.max(this.toldRev, max));
    },
    delivered(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        !(dataOperationControlVerdict2 > 0) ||
        options < dataOperationControlVerdict2
      )
        return;
      let toldSpan: Dynamic = this.toldSpans.find(
        (toldSpan2?: Dynamic, ..._extraArguments: unknown[]) =>
          dataOperationControlVerdict2 <= toldSpan2.hi + 1 &&
          options >= toldSpan2.lo - 1,
      );
      if (toldSpan) {
        [toldSpan.lo, toldSpan.hi] = [
          Math.min(toldSpan.lo, dataOperationControlVerdict2),
          Math.max(toldSpan.hi, options),
        ];
      } else {
        this.toldSpans.push({
          lo: dataOperationControlVerdict2,
          hi: options,
        });
      }
      if (this.toldSpans.length > 64) {
        this.toldSpans.shift();
      }
      if (this.cands.length > 0) {
        this.candsCovered();
      }
    },
    candsCovered(..._extraArguments: unknown[]): undefined {
      let max = Math.max(this.frontier(), this.wholePicRev);
      let filteredCands: Dynamic = this.cands.filter(
        (cand?: Dynamic, ..._extraArguments: unknown[]) => cand.upTo <= max,
      );
      if (filteredCands.length !== 0) {
        for (let loadDataOperationControlVerdictResult22 of filteredCands as Dynamic)
          operationScope.dataOperationControlVerdict.timers.clearTimeout(
            loadDataOperationControlVerdictResult22.timer,
          );
        this.cands = this.cands.filter(
          (cand?: Dynamic, ..._extraArguments: unknown[]) => cand.upTo > max,
        );
        reportOperationEvent(`told.holeCovered`, {
          upTo: (Math.max as Dynamic)(
            ...filteredCands.map(
              (
                filteredCand?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => filteredCand.upTo,
            ),
          ),
        });
        this.candsGround();
      }
    },
    candsGround(..._extraArguments: unknown[]): undefined {
      if (this.cands.length > 0 || this.candGround < 0) return;
      let candGround: Dynamic = this.candGround;
      this.candGround = -1;
      this.bookRev(candGround, !this.gapOwed);
    },
    catchUpDue(..._extraArguments: unknown[]): undefined {
      if (
        (0, operationScope.honourOpsOnFeed)() &&
        !operationScope.enabled &&
        !this.dead
      ) {
        this.ringDue = true;
      }
    },
    told(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      let told: Dynamic = dataOperationControlVerdict2.told;
      let dataOperationControlMinted4: Dynamic =
        told === undefined
          ? resolveDataOperationControlMinted4(dataOperationControlVerdict2)
          : null;
      let told2: Dynamic =
        told !== undefined && told !== `elided`
          ? told
          : dataOperationControlMinted4;
      let rev: Dynamic =
        told2 && told2.rev > 0
          ? told2.rev
          : resolveDataOperationControlEdit(dataOperationControlVerdict2);
      let dataOperationControlIsInteger2: Dynamic =
        resolveDataOperationControlIsInteger2(dataOperationControlVerdict2);
      if (dataOperationControlIsInteger2 !== undefined) {
        this.heardSeq = Math.max(this.heardSeq, dataOperationControlIsInteger2);
      }
      let matchesDataOperationControlIsInteger2 =
        dataOperationControlIsInteger2 !== undefined &&
        dataOperationControlIsInteger2 <= this.pictureSeq &&
        !(rev !== undefined && rev > this.wholePicRev);
      let span: Dynamic =
        told === `elided` && isPlainRecord(dataOperationControlVerdict2.span)
          ? dataOperationControlVerdict2.span
          : null;
      let record4: Dynamic =
        span && typeof span.rev == `number` && typeof span.revFirst == `number`
          ? {
              rev: span.rev,
              revFirst: span.revFirst,
            }
          : null;
      if (
        rev !== undefined &&
        Array.isArray(dataOperationControlVerdict2.opIds)
      ) {
        let filteredOpIds: Dynamic = dataOperationControlVerdict2.opIds.filter(
          (opId?: unknown, ..._extraArguments: unknown[]): Dynamic =>
            typeof opId == `string` && this.provisional.has(opId),
        );
        if (
          filteredOpIds.length > 0 &&
          (this.durable(filteredOpIds, rev, told2 ?? record4 ?? undefined),
          !told2 || this.mine(told2))
        )
          return;
      }
      if (!told2) {
        let edit: Dynamic = isPlainRecord(dataOperationControlVerdict2.edit)
          ? dataOperationControlVerdict2.edit
          : dataOperationControlVerdict2;
        let opId: Dynamic = typeof edit.opId == `string` ? edit.opId : ``;
        let item =
          [edit.sess, edit.by].find(
            (item2?: unknown, ..._extraArguments: unknown[]) =>
              typeof item2 == `string`,
          ) ?? ``;
        let mine: Dynamic = opId
          ? this.mine({
              opId: opId,
              by: item,
            }) ||
            (!item && this.sentOp(opId))
          : item !== `` &&
            item ===
              operationScope.dataOperationControlVerdict.session.get()?.label;
        if (mine && record4) {
          this.serialHole(record4);
        } else {
          if (mine && rev !== undefined) {
            this.heardMine(rev);
          }
        }
        return mine
          ? void (rev !== undefined && this.bookRev(rev, false))
          : (reportOperationEvent(`told.bell`, {
              rev: rev ?? -1,
              seq: dataOperationControlIsInteger2 ?? -1,
              elided: told === `elided`,
              opId: opId,
              by: item,
              ...(matchesDataOperationControlIsInteger2
                ? {
                    pictureSeq: this.pictureSeq,
                  }
                : {}),
            }),
            record4 && this.delivered(record4.revFirst, record4.rev),
            matchesDataOperationControlIsInteger2
              ? void (rev !== undefined && this.bookRev(rev, !this.gapOwed))
              : this.wholeRead(
                  told === `elided`
                    ? `a feed frame whose ops the door elided`
                    : `a feed frame carried no ops to apply`,
                  rev,
                  DataOperationControlStyles4,
                  dataOperationControlIsInteger2,
                ));
      }
      if (!this.dead) {
        if (this.mine(told2)) {
          this.ackedRev = Math.max(this.ackedRev, told2.rev);
          let serialHole = this.serialHole(told2);
          return this.bookRev(told2.rev, !serialHole && !this.gapOwed);
        }
        if (told2.refolded !== undefined) {
          reportOperationEvent(`told.refolded`, {
            rev: told2.rev,
            seq: dataOperationControlIsInteger2 ?? -1,
            by: told2.by,
            opId: told2.opId,
            code: told2.refolded,
            verbs: told2.ops
              .map((operation?: Dynamic, ..._extraArguments: unknown[]) =>
                String(operation.op),
              )
              .join(`,`),
            ...(matchesDataOperationControlIsInteger2
              ? {
                  pictureSeq: this.pictureSeq,
                }
              : {}),
          });
          return matchesDataOperationControlIsInteger2
            ? this.bookRev(told2.rev, !this.gapOwed)
            : this.wholeRead(
                `a row the door applied other than as sent (${told2.refolded})`,
                told2.rev > 0 ? told2.rev : undefined,
                DataOperationControlStyles4,
                dataOperationControlIsInteger2,
              );
        }
        if (
          !this.served ||
          this.readingWhole ||
          this.toldHeld.length > 0 ||
          this.toldOverflow
        )
          return this.holdTold(told2);
        if (this.straddles(told2, this.wholePicRev)) {
          reportOperationEvent(`told.straddled`, {
            rev: told2.rev,
            revFirst: told2.revFirst,
            picRev: this.wholePicRev,
          });
          this.holdTold(told2);
          return this.wholeRead(
            `a staged row the picture holds only the first stages of`,
            told2.rev,
          );
        }
        this.applyTold(told2);
      }
    },
    straddles(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      return (
        dataOperationControlVerdict2.rev > options &&
        dataOperationControlVerdict2.revFirst > 0 &&
        dataOperationControlVerdict2.revFirst <= options
      );
    },
    holdTold(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (!this.toldOverflow) {
        this.toldHeld.push(dataOperationControlVerdict2);
        if (!(this.toldHeld.length <= 256)) {
          this.toldHeld = [];
          this.toldOverflow = true;
        }
      }
    },
    drainTold(picRev?: Dynamic, ..._extraArguments: unknown[]): undefined {
      let splice: Dynamic = this.toldHeld.splice(0);
      let overflow: Dynamic = this.toldOverflow;
      this.toldOverflow = false;
      let applied: number = 0;
      let loadDataOperationControlVerdictResult22: Dynamic = null;
      for (let loadDataOperationControlVerdictResult23 of splice as Dynamic)
        if (
          !(
            loadDataOperationControlVerdictResult23.rev > 0 &&
            loadDataOperationControlVerdictResult23.rev <= picRev
          )
        ) {
          if (
            loadDataOperationControlVerdictResult22 ||
            this.straddles(loadDataOperationControlVerdictResult23, picRev)
          ) {
            loadDataOperationControlVerdictResult22 ??=
              loadDataOperationControlVerdictResult23;
            this.toldHeld.push(loadDataOperationControlVerdictResult23);
            continue;
          }
          this.applyTold(loadDataOperationControlVerdictResult23);
          applied += 1;
        }
      if (splice.length > 0 || overflow) {
        reportOperationEvent(`told.drain`, {
          picRev: picRev,
          held: splice.length,
          applied: applied,
          overflow: overflow,
          ...(loadDataOperationControlVerdictResult22
            ? {
                straddled: [
                  loadDataOperationControlVerdictResult22.revFirst,
                  loadDataOperationControlVerdictResult22.rev,
                ],
                reheld: this.toldHeld.length,
              }
            : {}),
        });
      }
      if (
        loadDataOperationControlVerdictResult22 &&
        !(
          this.gapOwed &&
          this.gapRev >= loadDataOperationControlVerdictResult22.rev
        )
      ) {
        this.wholeRead(
          `a staged row the picture holds only the first stages of`,
          loadDataOperationControlVerdictResult22.rev,
        );
      } else {
        if (overflow) {
          this.wholeRead(`more rows arrived under a whole read than are held`);
        }
      }
    },
    applyTold(row?: Dynamic, ..._extraArguments: unknown[]): undefined {
      this.delivered(row.revFirst, row.rev);
      this.bookRev(row.rev, !this.gapOwed);
      this.holedRead.clear();
      let under: Dynamic = this.out();
      reportOperationEvent(`told.apply`, {
        rev: row.rev,
        by: row.by,
        opId: row.opId,
        ops: row.ops.length,
        verbs: row.ops
          .map((operation?: Dynamic, ..._extraArguments: unknown[]) =>
            String(operation.op),
          )
          .join(`,`),
        under: under,
      });
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
    serialHole(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      if (
        !(dataOperationControlVerdict2.revFirst > 0) ||
        operationScope.enabled ||
        this.dead
      )
        return false;
      let frontier = this.frontier();
      this.delivered(
        dataOperationControlVerdict2.revFirst,
        dataOperationControlVerdict2.rev,
      );
      if (
        dataOperationControlVerdict2.revFirst <= frontier + 1 ||
        this.wholePicRev < 0 ||
        this.halted
      )
        return false;
      let max: number = Math.max(frontier, this.cands.at(-1)?.upTo ?? -1);
      for (let enabled26: boolean = true; enabled26; ) {
        enabled26 = false;
        for (let loadDataOperationControlVerdictResult22 of this
          .toldSpans as Dynamic)
          if (
            loadDataOperationControlVerdictResult22.lo <= max + 1 &&
            loadDataOperationControlVerdictResult22.hi > max
          ) {
            [max, enabled26] = [
              loadDataOperationControlVerdictResult22.hi,
              true,
            ];
          }
      }
      if (max < dataOperationControlVerdict2.revFirst - 1) {
        let record4 = {
          upTo: dataOperationControlVerdict2.revFirst - 1,
          timer: null,
        };
        record4.timer =
          operationScope.dataOperationControlVerdict.timers.setTimeout(
            (..._extraArguments: unknown[]) => this.graceOver(record4),
            dataOperationControlValue20007,
          );
        this.cands.push(record4);
        reportOperationEvent(`told.holeCandidate`, {
          upTo: record4.upTo,
          at: frontier,
        });
      }
      this.candGround = Math.max(
        this.candGround,
        dataOperationControlVerdict2.rev,
      );
      return true;
    },
    graceOver(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        operationScope.enabled ||
        this.dead ||
        !this.cands.includes(dataOperationControlVerdict2)
      )
        return;
      if ((this.gapOwed && this.stoodAt < 0) || this.readingWhole)
        return void (dataOperationControlVerdict2.timer =
          operationScope.dataOperationControlVerdict.timers.setTimeout(
            (..._extraArguments: unknown[]) =>
              this.graceOver(dataOperationControlVerdict2),
            dataOperationControlValue20007,
          ));
      this.candsCovered();
      if (!this.cands.includes(dataOperationControlVerdict2)) return;
      for (let loadDataOperationControlVerdictResult22 of this.cands as Dynamic)
        if (
          loadDataOperationControlVerdictResult22.upTo <=
            dataOperationControlVerdict2.upTo &&
          loadDataOperationControlVerdictResult22 !==
            dataOperationControlVerdict2
        ) {
          operationScope.dataOperationControlVerdict.timers.clearTimeout(
            loadDataOperationControlVerdictResult22.timer,
          );
        }
      this.cands = this.cands.filter(
        (cand?: Dynamic, ..._extraArguments: unknown[]) =>
          cand.upTo > dataOperationControlVerdict2.upTo,
      );
      let frontier = this.frontier();
      let missed =
        (Math.min as Dynamic)(
          dataOperationControlVerdict2.upTo + 1,
          ...this.toldSpans.map(
            (toldSpan?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              toldSpan.lo,
          ),
        ) -
        frontier -
        1;
      this.toldRev = Math.max(this.toldRev, dataOperationControlVerdict2.upTo);
      let rev = this.frontier();
      let ringDue: Dynamic = this.ringDue || this.holeTimer !== null;
      if (
        this.gapOwed ||
        operationScope.loadDataOperationControlVerdictResult10 !== null ||
        operationScope.enabled16
      ) {
        reportOperationEvent(`told.holeCovered`, {
          upTo: dataOperationControlVerdict2.upTo,
          owed: true,
        });
      } else {
        reportOperationEvent(`told.serialHole`, {
          missed: missed,
          rev: rev,
          at: frontier,
          upTo: dataOperationControlVerdict2.upTo,
          ...(ringDue
            ? {
                owed: this.ringDue ? `ring` : `window`,
              }
            : {}),
        });
        if (!this.ringDue) {
          emitTelemetryEvent(createPagesSyncSerialHoleEvent(`mine`, missed));
        }
        if (ringDue) {
          this.holeRev = Math.max(this.holeRev, rev);
        } else {
          this.wholeRead(
            DataOperationControlARowPastRevsThisPageNeverHeard,
            rev,
          );
          this.holeTimer =
            operationScope.dataOperationControlVerdict.timers.setTimeout(
              (..._extraArguments: unknown[]) => this.holeWindow(),
              dataOperationControlValue150002,
            );
        }
      }
      this.candsGround();
    },
    resetHoleState(
      dataOperationControlVerdict2: Dynamic = false,
      ..._extraArguments: unknown[]
    ): undefined {
      for (let loadDataOperationControlVerdictResult22 of [
        ...this.cands.map(
          (cand?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            cand.timer,
        ),
        this.holeTimer,
      ] as Dynamic)
        if (loadDataOperationControlVerdictResult22 !== null) {
          operationScope.dataOperationControlVerdict.timers.clearTimeout(
            loadDataOperationControlVerdictResult22,
          );
        }
      if (dataOperationControlVerdict2 && this.cands.length > 0) {
        reportOperationEvent(`told.holeCovered`, {
          upTo: (Math.max as Dynamic)(
            ...this.cands.map(
              (cand?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                cand.upTo,
            ),
          ),
          restarted: true,
        });
      }
      [
        this.cands,
        this.candGround,
        this.holeTimer,
        this.holeRev,
        this.toldRev,
        this.toldSpans,
      ] = [[], -1, null, -1, -1, []];
    },
    holeWindow(..._extraArguments: unknown[]): undefined {
      this.holeTimer = null;
      let holeRev: Dynamic = this.holeRev;
      this.holeRev = -1;
      if (
        !(
          operationScope.enabled ||
          this.dead ||
          operationScope.loadDataOperationControlVerdictResult10 !== null ||
          holeRev <= this.wholePicRev
        )
      ) {
        this.wholeRead(
          DataOperationControlARowPastRevsThisPageNeverHeard,
          holeRev,
        );
        this.holeTimer =
          operationScope.dataOperationControlVerdict.timers.setTimeout(
            (..._extraArguments: unknown[]) => this.holeWindow(),
            dataOperationControlValue150002,
          );
      }
    },
    heardMine(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (dataOperationControlVerdict2 === this.frontier() + 1) {
        this.toldRev = dataOperationControlVerdict2;
      }
    },
    bookRev(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (dataOperationControlVerdict2 > 0) {
        this.lastRev = Math.max(this.lastRev, dataOperationControlVerdict2);
        this.shownRev = Math.max(this.shownRev, dataOperationControlVerdict2);
        this.heardRev = Math.max(this.heardRev, dataOperationControlVerdict2);
        if (options && this.cands.length > 0) {
          this.candGround = Math.max(
            this.candGround,
            dataOperationControlVerdict2,
          );
        } else {
          if (options && !(this.holeRev > this.wholePicRev)) {
            this.groundTo(dataOperationControlVerdict2);
          }
        }
        this.roomSeen(dataOperationControlVerdict2);
        if (this.stoodAt >= 0 && dataOperationControlVerdict2 > this.stoodAt) {
          this.stoodAt = -1;
          this.gapRetry();
        }
      }
    },
  };
  return methods;
}
