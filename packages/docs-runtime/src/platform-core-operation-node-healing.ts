/** BaoCut: operation controller node healing. */
import type { Dynamic } from "./types";
import type { OperationControllerScope } from "./type-models/platform-core-operation";
import { resolveEditorExtensionsSess } from "./platform-core-editor-extensions-2";
import {
  resolveDataModelSchemasDepth4,
  resolveDataModelSchemasLaw,
  resolveDataModelSchemasOps,
  resolveDataModelSchemasValue25,
} from "./platform-core-data-model-schemas-4";
import { reportOperationEvent } from "./platform-core-observability-boot";
import { resolveDataOperationControlValue17 } from "./platform-core-data-operation-control-1";
import {
  DataOperationControlMessage7,
  DataOperationControlState9,
  DataOperationControlStyles10,
  DataOperationControlStyles5,
  DataOperationControlStyles6,
  DataOperationControlStyles7,
  dataOperationControlValue100003,
  dataOperationControlValue100005,
  dataOperationControlValue2500,
  dataOperationControlValue3000,
  dataOperationControlValue6000,
  isDataOperationControlDeny3,
  resolveDataOperationControlAuthor,
  resolveDataOperationControlValue22,
} from "./platform-core-data-operation-control-2";
import {
  collectDataOperationControlSome,
  getDataOperationControlSize,
  isPlainRecord,
  resolveDataOperationControlChars4,
  resolveDataOperationControlFlatMap2,
  resolveDataOperationControlFrom,
  resolveDataOperationControlOps2,
  resolveDataOperationControlRevive2,
} from "./platform-core-data-operation-control-4";
export function createOperationNodeHealing(
  operationScope: Pick<
    OperationControllerScope,
    | "dataOperationControlVerdict"
    | "enabled"
    | "author"
    | "loadDataOperationControlVerdictHandler28"
    | "index"
    | "emit7"
    | "kind"
    | "knockHeard2"
    | "loadDataOperationControlVerdictHandler"
    | "reconcile"
    | "loadDataOperationControlVerdictHandler21"
    | "visibility"
    | "dataOperationControlFloor22"
    | "honourOpsOnFeed"
    | "onFaces"
    | "life2"
    | "enabled22"
    | "reopened"
    | "refusalClass"
    | "loadDataOperationControlVerdictHandler26"
    | "loadDataOperationControlVerdictHandler25"
  >,
): Record<string, Dynamic> {
  const methods: Record<string, Dynamic> & ThisType<Dynamic> = {
    joinFailed(..._extraArguments: unknown[]) {
      this.joinTries += 1;
      if (this.joinTries < 6) return this.coolOff();
      this.halted = true;
      this.gaveUp = false;
      this.emit({
        t: `state`,
        node: this.node,
        state: `readonly`,
        words: DataOperationControlStyles5,
        halt: true,
        ...(this.lookRev === null
          ? {}
          : {
              shown: true,
            }),
      });
    },
    commentsTooLarge(..._extraArguments: unknown[]): undefined {
      this.wantComments = false;
      if (!this.commentsBarred) {
        this.commentsBarred = true;
        reportOperationEvent(`read.commentsTooLarge`, {
          served: this.served,
        });
        console.warn(
          `opTransport: the comment thread list is too large for the room to send — the document is read without it from here on; the rail keeps what it has`,
        );
      }
    },
    haltTooLarge(
      whole?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let halted: Dynamic = this.halted;
      this.halted = true;
      this.gaveUp = false;
      this.owed = this.oweWhole = false;
      this.rung = this.rungWhole = false;
      let enabled26 = !this.served && this.lookRev !== null;
      if (!whole) {
        this.sinceHaltedAt = Math.max(
          this.sinceHaltedAt ?? -1,
          options ?? this.since() ?? this.lastRev,
        );
      }
      reportOperationEvent(`read.tooLarge`, {
        whole: whole,
        served: this.served,
        lastRev: this.lastRev,
        ...(this.sinceHaltedAt === null
          ? {}
          : {
              sinceHaltedAt: this.sinceHaltedAt,
            }),
      });
      if (!halted) {
        this.emit({
          t: `state`,
          node: this.node,
          state: `readonly`,
          words: this.served
            ? DataOperationControlStyles7
            : enabled26
              ? DataOperationControlStyles6
              : DataOperationControlStyles10,
          halt: true,
          ...(this.served || enabled26
            ? {
                shown: true,
              }
            : {}),
        });
      }
    },
    coolOff(..._extraArguments: unknown[]): undefined {
      this.cooling = true;
      this.coolTimer ??=
        operationScope.dataOperationControlVerdict.timers.setTimeout(
          (..._extraArguments: unknown[]): undefined => {
            this.coolTimer = null;
            this.cooling = false;
            if (!operationScope.enabled && !this.dead && !this.served) {
              this.read(undefined);
            }
          },
          dataOperationControlValue100003,
        );
    },
    send(
      opId?: Dynamic,
      ops?: Dynamic,
      textFrames?: Dynamic,
      dependencies: Dynamic = [],
      homes: Dynamic = [],
      argument?: Dynamic,
      argument2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let predicted: Dynamic = collectDataOperationControlSome(
        ops,
        dependencies,
      );
      this.heldWordsOff(`ops`);
      let record4: Dynamic = {
        opId: opId,
        ops: ops,
        textFrames: textFrames,
        ...(predicted.length > 0
          ? {
              predicted: predicted,
            }
          : {}),
        ...(homes.length > 0
          ? {
              homes: homes,
            }
          : {}),
        ...(0, operationScope.author)(),
      };
      let dataModelSchemasLaw: Dynamic =
        resolveDataModelSchemasLaw(ops) ??
        (argument2 === true ? null : resolveDataModelSchemasOps(ops));
      if (dataModelSchemasLaw)
        return void this.lawStopped(
          opId,
          ops,
          dataModelSchemasLaw,
          argument === true,
        );
      let lookup3: Dynamic =
        argument === true
          ? new (Map as Dynamic)()
          : (0, operationScope.loadDataOperationControlVerdictHandler28)();
      if (lookup3.size > 0) {
        let uniqueItems7: Dynamic = new (Set as Dynamic)(predicted.flat());
        for (let loadDataOperationControlVerdictResult22 of uniqueItems7 as Dynamic)
          lookup3.delete(loadDataOperationControlVerdictResult22);
        if (lookup3.size > 0) {
          record4.ops = ops = getDataOperationControlSize(ops, lookup3);
          record4.homes &&= homes = homes.map(
            (home?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              lookup3.get(home) ?? home,
          );
        }
      }
      let dataOperationControlOps2: Dynamic = resolveDataOperationControlOps2(
        record4,
        false,
      );
      this.mendHeard(dataOperationControlOps2);
      dataOperationControlOps2.seq = ++operationScope.index;
      if (argument === true) {
        dataOperationControlOps2.assert = true;
      }
      for (let loadDataOperationControlVerdictResult22 of dataOperationControlOps2.predicted as Dynamic)
        for (let loadDataOperationControlVerdictResult23 of loadDataOperationControlVerdictResult22 as Dynamic)
          this.proposedEver.add(loadDataOperationControlVerdictResult23);
      if (this.proposedEver.size > 2e5) {
        this.proposedEver.clear();
      }
      if (
        dataOperationControlOps2.predicted.length > 0 &&
        this.myWords.size > 0
      ) {
        let uniqueItems7: Dynamic = new (Set as Dynamic)();
        for (let loadDataOperationControlVerdictResult22 of dataOperationControlOps2.predicted as Dynamic)
          for (let loadDataOperationControlVerdictResult23 of loadDataOperationControlVerdictResult22 as Dynamic)
            uniqueItems7.add(loadDataOperationControlVerdictResult23);
        for (let [loadDataOperationControlVerdictResult22, ask] of this
          .myWords as Dynamic) {
          if (
            ask.real !== true ||
            !(
              uniqueItems7.has(ask.bid) ||
              (ask.afterId != null && uniqueItems7.has(ask.afterId))
            )
          )
            continue;
          let { real: ask2, ...ask3 }: Dynamic = ask;
          this.myWords.set(loadDataOperationControlVerdictResult22, ask3);
          try {
            operationScope.dataOperationControlVerdict.wal.stageWords?.(
              this.node,
              {
                bid: ask.bid,
                afterId: ask.afterId ?? null,
                text: ask.text,
                ...resolveDataOperationControlAuthor(ask),
              },
            );
          } catch {}
        }
      }
      this.noteSent(opId);
      dataOperationControlOps2.sent = true;
      let logged: Dynamic = this.logged(dataOperationControlOps2);
      try {
        if (logged) {
          operationScope.dataOperationControlVerdict.wal.stage?.(
            this.node,
            logged,
          );
        }
      } catch {}
      this.handed.push(dataOperationControlOps2);
      this.ready.then(
        async (..._extraArguments: unknown[]): Promise<undefined> => {
          this.handed = this.handed.filter(
            (handed?: Dynamic, ..._extraArguments: unknown[]) =>
              handed !== dataOperationControlOps2,
          );
          this.queue.push(dataOperationControlOps2);
          (0, operationScope.emit7)();
          if (operationScope.kind !== null) {
            (0, operationScope.knockHeard2)();
          }
          if (logged) {
            await Promise.race([
              operationScope.dataOperationControlVerdict.wal
                .append(this.node, logged)
                .catch((..._extraArguments: unknown[]): undefined => undefined),
              (0, operationScope.loadDataOperationControlVerdictHandler)(400),
            ]);
          }
          this.pump();
        },
      );
    },
    lawStopped(
      opId?: Dynamic,
      ops?: Dynamic,
      context?: Dynamic,
      dependencies?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      console.error(
        `opTransport: zero_error_fallback — an update broke a law of the document HERE and was not sent (${context.law}: ${context.actual} over ${context.limit}${context.where ? ` at ${context.where}` : ``}); the page keeps it, unsynced`,
        opId,
      );
      this.zeroErrored({
        opId: opId,
        klass: `law_local`,
        reason: `limit`,
        law: context.law,
        ops: ops,
      });
      this.emit({
        t: `deny`,
        node: this.node,
        opId: opId,
        reason: `limit`,
        detail: {
          zero_error: `unsynced`,
          law: context.law,
          limit: context.limit,
          actual: context.actual,
          ...(context.where
            ? {
                where: context.where,
              }
            : {}),
          why: resolveDataModelSchemasDepth4(context),
          words: `${resolveDataModelSchemasValue25(context)[0].toUpperCase()}${resolveDataModelSchemasValue25(context).slice(1)}.`,
          local: true,
          ...(dependencies
            ? {
                assert: true,
              }
            : {}),
        },
      });
    },
    groundTo(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (dataOperationControlVerdict2 > this.groundRev) {
        this.groundRev = dataOperationControlVerdict2;
      }
    },
    roomSeen(
      dataOperationControlVerdict2?: unknown,
      options: Dynamic = false,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        !(
          typeof dataOperationControlVerdict2 != `number` ||
          dataOperationControlVerdict2 <= this.roomRev
        )
      ) {
        this.roomRev = dataOperationControlVerdict2;
        if (dataOperationControlVerdict2 > this.groundRev) {
          this.healArm(dataOperationControlValue6000);
        }
        if (!options) {
          this.orderActivity();
        }
        if (!options) {
          this.pollWake();
        }
      }
    },
    orderActivity(..._extraArguments: unknown[]): undefined {
      this.orderActive = true;
      this.orderArm();
    },
    orderRecadence(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      this.orderCalm = dataOperationControlVerdict2;
      if (this.orderTimer !== null) {
        operationScope.dataOperationControlVerdict.timers.clearTimeout(
          this.orderTimer,
        );
        this.orderTimer = null;
        this.orderArm();
      }
    },
    orderArm(..._extraArguments: unknown[]): undefined {
      if (
        !(
          operationScope.reconcile ||
          operationScope.enabled ||
          this.dead ||
          this.halted ||
          !this.served ||
          (0, operationScope.loadDataOperationControlVerdictHandler21)() ||
          this.healFails >= 3 ||
          this.orderTooLarge ||
          operationScope.visibility.idle()
        )
      ) {
        if (this.orderTimer === null) {
          this.orderTimer =
            operationScope.dataOperationControlVerdict.timers.setTimeout(
              (..._extraArguments: unknown[]): undefined => {
                this.orderTimer = null;
                this.orderCheck();
              },
              operationScope.dataOperationControlFloor22 * 2 ** this.orderCalm,
            );
        }
      }
    },
    orderCheck(..._extraArguments: unknown[]) {
      if (
        !(
          operationScope.reconcile ||
          operationScope.enabled ||
          this.dead ||
          this.halted ||
          !this.served
        ) &&
        !(this.healFails >= 3) &&
        !this.orderTooLarge &&
        !(0, operationScope.honourOpsOnFeed)()
      ) {
        if (this.feedUp !== true) return this.orderArm();
        if (this.orderActive) {
          if (
            this.orderProbing ||
            this.reading ||
            this.owed ||
            this.out() > 0 ||
            this.holed.size > 0 ||
            this.behindGround !== null ||
            this.healCooling ||
            this.healStalledNow()
          )
            return this.orderArm();
          this.orderActive = false;
          this.orderArm();
          this.orderProbe();
        }
      }
    },
    orderProbe(..._extraArguments: unknown[]): undefined {
      this.orderProbing = true;
      reportOperationEvent(`order.probe`, {
        calm: this.orderCalm,
        rev: this.roomRev,
      });
      this.door({
        verb: `read`,
        payload: {
          kind: `view`,
        },
      }).then(
        (response?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          this.orderProbing = false;
          if (operationScope.enabled || this.dead) return;
          if (isDataOperationControlDeny3(response)) {
            this.orderTooLarge = true;
            if (this.orderTimer !== null) {
              operationScope.dataOperationControlVerdict.timers.clearTimeout(
                this.orderTimer,
              );
            }
            this.orderTimer = null;
            reportOperationEvent(`order.tooLarge`, {
              rev: this.roomRev,
            });
            return;
          }
          if (!response || this.halted || response.verdict !== `allow`) return;
          let data: Dynamic = isPlainRecord(response.data) ? response.data : {};
          let doc: Dynamic = data.doc;
          let onFaces2: Dynamic =
            typeof doc == `string` ? (0, operationScope.onFaces)(doc) : null;
          let rev =
            [response.rev, data.rev, onFaces2?.rev].find(
              (item?: unknown, ..._extraArguments: unknown[]) =>
                typeof item == `number`,
            ) ?? -1;
          if (rev >= 0) {
            this.roomSeen(rev);
          }
          if (
            !onFaces2 ||
            (onFaces2.capped?.length ?? 0) > 0 ||
            (onFaces2.folded ?? 0) > 0 ||
            onFaces2.complete === false ||
            data.complete === false ||
            data.complete === 0 ||
            /^<doc\b[^>]*\scomplete="(?:0|false)"/.test(doc) ||
            resolveDataOperationControlFrom(data) !== undefined ||
            rev < 0 ||
            rev !== this.groundRev ||
            this.roomRev !== this.groundRev ||
            this.out() > 0 ||
            this.reading ||
            this.owed ||
            this.holed.size > 0
          )
            return;
          let bids: Dynamic = [];
          for (let ask of onFaces2.blocks as Dynamic)
            if (typeof ask?.bid == `string` && ask.bid) {
              bids.push(ask.bid);
            }
          this.orderAsked += 1;
          this.emit({
            t: `order`,
            node: this.node,
            rev: rev,
            bids: bids,
          });
        },
        (..._extraArguments: unknown[]): undefined =>
          void (this.orderProbing = false),
      );
    },
    healStalledNow(..._extraArguments: unknown[]) {
      if (this.roomRev > this.groundRev || this.orderDiverged) return true;
      for (let loadDataOperationControlVerdictResult22 of this.holed as Dynamic)
        if (this.declinedHoles.has(loadDataOperationControlVerdictResult22))
          return true;
      return false;
    },
    healArm(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        !(
          operationScope.reconcile ||
          !this.served ||
          this.halted ||
          this.dead ||
          operationScope.enabled ||
          (0, operationScope.loadDataOperationControlVerdictHandler21)()
        ) &&
        !(this.healFails >= 3)
      ) {
        if (this.healTimer !== null) {
          if (dataOperationControlVerdict2 >= this.healArmedFor) return;
          operationScope.dataOperationControlVerdict.timers.clearTimeout(
            this.healTimer,
          );
        }
        this.healArmedFor = dataOperationControlVerdict2;
        this.healTimer =
          operationScope.dataOperationControlVerdict.timers.setTimeout(
            (..._extraArguments: unknown[]): undefined => {
              this.healTimer = null;
              this.healCheck();
            },
            dataOperationControlVerdict2,
          );
      }
    },
    healStalled(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      this.healWhy = dataOperationControlVerdict2;
      this.healArm(dataOperationControlValue2500);
    },
    healCheck(..._extraArguments: unknown[]) {
      if (
        !(operationScope.enabled || this.dead || this.halted || !this.served)
      ) {
        if (!this.healStalledNow())
          return void ((this.healFails = 0),
          (this.healDeferrals = 0),
          this.healEpisodeEnd());
        if (this.healEpisode) return this.healReissue();
        if (this.healCooling || this.out() > 0)
          return this.healArm(dataOperationControlValue6000);
        if (this.reading && this.healDeferrals < 2) {
          this.healDeferrals += 1;
          return this.healArm(dataOperationControlValue6000);
        }
        if (!(this.healFails >= 3)) {
          if (this.shedTimer !== null)
            return this.healArm(dataOperationControlValue6000);
          this.healFire();
        }
      }
    },
    healFire(..._extraArguments: unknown[]): undefined {
      this.healDeferrals = 0;
      this.healEpisode = true;
      this.healReissues = 0;
      this.healCooling = true;
      this.healCoolTimer =
        operationScope.dataOperationControlVerdict.timers.setTimeout(
          (..._extraArguments: unknown[]): undefined => {
            this.healCoolTimer = null;
            this.healCooling = false;
          },
          dataOperationControlValue100005,
        );
      let matchesRoomRev = this.roomRev > this.groundRev;
      let reason: Dynamic =
        this.healWhy ||
        (matchesRoomRev
          ? `the picture stayed behind the room`
          : `a declined block print stayed unplaced`);
      this.healWhy = ``;
      reportOperationEvent(`heal.stall`, {
        reason: reason,
        rev: matchesRoomRev ? this.roomRev : this.lastRev,
      });
      console.warn(
        `opTransport: heal.stall — one whole read chases a stalled picture (${reason}; ground ${this.groundRev}, room ${this.roomRev})`,
      );
      let enabled26 = false;
      let shedSeen: Dynamic = this.shedSeen;
      let healEpisodeEnd = (
        dataOperationControlVerdict2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (!(enabled26 || operationScope.enabled || this.dead)) {
          enabled26 = true;
          if (dataOperationControlVerdict2) {
            this.healFails = 0;
          } else {
            if (this.shedSeen === shedSeen) {
              this.healFails += 1;
              this.healArm(dataOperationControlValue6000);
            } else {
              reportOperationEvent(`heal.shed`, {
                fails: this.healFails,
              });
              this.healArm(dataOperationControlValue6000);
            }
          }
          if (dataOperationControlVerdict2 || !this.oweWhole) {
            this.healEpisodeEnd();
          }
        }
      };
      let setTimeout2: Dynamic =
        operationScope.dataOperationControlVerdict.timers.setTimeout(
          (..._extraArguments: unknown[]) => healEpisodeEnd(false),
          DataOperationControlState9,
        );
      this.read(undefined, DataOperationControlMessage7).then(
        (..._extraArguments: unknown[]): undefined => {
          operationScope.dataOperationControlVerdict.timers.clearTimeout(
            setTimeout2,
          );
          healEpisodeEnd(!this.healStalledNow());
        },
        (..._extraArguments: unknown[]): undefined => {
          operationScope.dataOperationControlVerdict.timers.clearTimeout(
            setTimeout2,
          );
          healEpisodeEnd(false);
        },
      );
    },
    healReissue(..._extraArguments: unknown[]): undefined {
      if (
        this.healReissueTimer !== null ||
        operationScope.enabled ||
        this.dead ||
        !this.healEpisode
      )
        return;
      let wait2 = Math.min(
        dataOperationControlValue100005,
        dataOperationControlValue2500 * 2 ** Math.min(this.healReissues, 8),
      );
      let sentCount: Dynamic = this.sentCount;
      this.healReissueTimer =
        operationScope.dataOperationControlVerdict.timers.setTimeout(
          (..._extraArguments: unknown[]) => {
            this.healReissueTimer = null;
            if (!(operationScope.enabled || this.dead || !this.healEpisode)) {
              if (!this.healStalledNow()) return this.healEpisodeEnd();
              if (
                this.sentCount !== sentCount ||
                this.out() > 0 ||
                this.reading
              )
                return this.healReissue();
              this.healReissues += 1;
              reportOperationEvent(`heal.reissue`, {
                n: this.healReissues,
                wait: wait2,
                ground: this.groundRev,
                room: this.roomRev,
              });
              this.owed = this.oweWhole = false;
              this.read(undefined, DataOperationControlMessage7).then(
                (..._extraArguments: unknown[]) => {
                  if (!(operationScope.enabled || this.dead)) {
                    if (!this.healStalledNow())
                      return void ((this.healFails = 0), this.healEpisodeEnd());
                    if (this.oweWhole) return this.healReissue();
                    this.healEpisodeEnd();
                    this.healArm(dataOperationControlValue6000);
                  }
                },
                (..._extraArguments: unknown[]): undefined =>
                  void (this.healEpisodeEnd(),
                  this.healArm(dataOperationControlValue6000)),
              );
            }
          },
          wait2,
        );
    },
    healEpisodeEnd(..._extraArguments: unknown[]): undefined {
      this.healEpisode = false;
      this.healReissues = 0;
      if (this.healReissueTimer !== null) {
        operationScope.dataOperationControlVerdict.timers.clearTimeout(
          this.healReissueTimer,
        );
      }
      this.healReissueTimer = null;
    },
    noWhole(reason?: Dynamic, ..._extraArguments: unknown[]) {
      return operationScope.reconcile ||
        !this.served ||
        (0, operationScope.honourOpsOnFeed)()
        ? false
        : (this.noReseats++,
          console.warn(
            `opTransport: no-reseat — a whole re-read was NOT taken (${reason}); deltas by id go on`,
          ),
          this.zeroErrored({
            opId: ``,
            klass: `no_reseat`,
            reason: reason,
            ops: [],
          }),
          true);
    },
    zeroErrored(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      try {
        operationScope.dataOperationControlVerdict.onZeroError?.({
          node: this.node,
          opId: dataOperationControlVerdict2.opId,
          klass: dataOperationControlVerdict2.klass,
          reason: dataOperationControlVerdict2.reason,
          ...(dataOperationControlVerdict2.room === undefined
            ? {}
            : {
                room: dataOperationControlVerdict2.room,
              }),
          ...(dataOperationControlVerdict2.law === undefined
            ? {}
            : {
                law: dataOperationControlVerdict2.law,
              }),
          ops: dataOperationControlVerdict2.ops.length,
          verbs: dataOperationControlVerdict2.ops.map(
            (operation?: Dynamic, ..._extraArguments: unknown[]) =>
              String(operation.op),
          ),
          ...(dataOperationControlVerdict2.opIndex === undefined
            ? {}
            : {
                opIndex: dataOperationControlVerdict2.opIndex,
              }),
        });
      } catch {}
    },
    reviveShort(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      dependencies?: Dynamic,
      argument?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      options.ops.forEach(
        (
          op2?: Dynamic,
          index5?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (!resolveDataOperationControlRevive2(op2)) return;
          let chars: Dynamic = op2.chars;
          let items3: Dynamic = [];
          let asked: Dynamic = 0;
          for (let loadDataOperationControlVerdictResult22 of (Array.isArray(
            chars?.runs,
          )
            ? chars.runs
            : []) as Dynamic) {
            if (
              !Array.isArray(loadDataOperationControlVerdictResult22) ||
              typeof loadDataOperationControlVerdictResult22[0] != `string` ||
              typeof loadDataOperationControlVerdictResult22[1] != `string`
            )
              continue;
            let [items4, setItems]: Dynamic = [
              resolveEditorExtensionsSess(
                loadDataOperationControlVerdictResult22[0],
              ),
              resolveEditorExtensionsSess(
                loadDataOperationControlVerdictResult22[1],
              ),
            ];
            if (
              items4 &&
              setItems &&
              items4.sess === setItems.sess &&
              setItems.i >= items4.i
            ) {
              items3.push([items4, setItems]);
              asked += setItems.i - items4.i + 1;
            } else {
              asked += 1;
            }
          }
          if (asked === 0) return;
          let resolveEditorExtensionsSess5: Dynamic = (
            dataOperationControlVerdict3?: unknown,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let editorExtensionsSess: Dynamic =
              typeof dataOperationControlVerdict3 == `string`
                ? resolveEditorExtensionsSess(dataOperationControlVerdict3)
                : null;
            return (
              !!editorExtensionsSess &&
              items3.some(
                ([item, item2]: Dynamic, ..._extraArguments: unknown[]) =>
                  item.sess === editorExtensionsSess.sess &&
                  editorExtensionsSess.i >= item.i &&
                  editorExtensionsSess.i <= item2.i,
              )
            );
          };
          let some: Dynamic = argument.some(
            (error?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              (error.code === `unknown_ids` || error.code === `unknown_id`) &&
              (typeof error.opIndex == `number`
                ? resolveDataOperationControlValue17(context, error.opIndex) ===
                  index5
                : Array.isArray(error.ids) &&
                  error.ids.some(resolveEditorExtensionsSess5)),
          );
          let dependencyItem: Dynamic = dependencies[index5];
          let isPlainRecord3: Dynamic =
            isPlainRecord(dependencyItem) &&
            Array.isArray(dependencyItem.revived);
          let dataOperationControlFlatMap2Count: Dynamic = isPlainRecord3
            ? resolveDataOperationControlFlatMap2(dependencyItem.revived).length
            : asked;
          if (!some && dataOperationControlFlatMap2Count >= asked) return;
          let opIndex: Dynamic = options.kStart + index5;
          let enabled26 = !this.shortRevived.has(
            dataOperationControlVerdict2.opId,
          );
          if (enabled26) {
            this.shortGrace.add(dataOperationControlVerdict2.opId);
            let opId: Dynamic = dataOperationControlVerdict2.opId;
            operationScope.dataOperationControlVerdict.timers.setTimeout(
              (..._extraArguments: unknown[]): undefined => {
                if (this.shortGrace.delete(opId)) {
                  (0, operationScope.emit7)();
                }
              },
              dataOperationControlValue3000,
            );
          }
          this.shortRevived.set(dataOperationControlVerdict2.opId, false);
          (dataOperationControlVerdict2.notices ??= []).push({
            code: `revive_short`,
            opIndex: opIndex,
            asked: asked,
            revived: isPlainRecord3 ? dataOperationControlFlatMap2Count : 0,
          });
          if (enabled26) {
            console.warn(
              `opTransport: a revive was answered short — the room brought back ${isPlainRecord3 ? dataOperationControlFlatMap2Count : `?`} of the ${asked} chars an undo named (op ${opIndex} of ${dataOperationControlVerdict2.opId}${some ? `, unknown_ids` : ``}); the page is not saved over them`,
            );
            resolveDataOperationControlValue22(
              `revive_short`,
              dataOperationControlVerdict2.lost === true ||
                dataOperationControlVerdict2.tries > 0,
            );
            this.zeroErrored({
              opId: dataOperationControlVerdict2.opId,
              klass: `revive_short`,
              reason: `revive_short`,
              ops: dataOperationControlVerdict2.ops,
              opIndex: opIndex,
            });
          }
        },
      );
    },
    logged(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return dataOperationControlVerdict2.assert ||
        (!dataOperationControlVerdict2.replayed &&
          dataOperationControlVerdict2.ops.length > 0 &&
          dataOperationControlVerdict2.ops.every(
            (operation?: Dynamic, ..._extraArguments: unknown[]) =>
              operation.op === `delete`,
          ) &&
          dataOperationControlVerdict2.ops.some(
            resolveDataOperationControlChars4,
          ))
        ? null
        : {
            opId: dataOperationControlVerdict2.opId,
            ops: dataOperationControlVerdict2.ops,
            textFrames: dataOperationControlVerdict2.textFrames,
            ...(dataOperationControlVerdict2.predicted.length > 0
              ? {
                  predicted: dataOperationControlVerdict2.predicted,
                }
              : {}),
            ...(dataOperationControlVerdict2.homes
              ? {
                  homes: dataOperationControlVerdict2.homes,
                }
              : {}),
            ...(dataOperationControlVerdict2.sent
              ? {
                  sent: true,
                }
              : {}),
            ...(dataOperationControlVerdict2.rewidened
              ? {
                  rewidened: true,
                }
              : {}),
            life: operationScope.life2,
            ...resolveDataOperationControlAuthor(dataOperationControlVerdict2),
          };
    },
    moor(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        !(
          this.inflight !== dataOperationControlVerdict2 ||
          operationScope.enabled ||
          this.dead
        )
      ) {
        if (this.retryTimer !== null) {
          operationScope.dataOperationControlVerdict.timers.clearTimeout(
            this.retryTimer,
          );
        }
        this.retryTimer = null;
        dataOperationControlVerdict2.parked = false;
        dataOperationControlVerdict2.moored = true;
        this.slow = true;
        if (!this.served && this.stuckReplay()) {
          this.read(undefined);
        }
        if (operationScope.enabled22) {
          (0, operationScope.reopened)();
        }
      }
    },
    unmoor(..._extraArguments: unknown[]) {
      let inflight: Dynamic = this.inflight;
      return inflight?.moored
        ? ((inflight.moored = false),
          (this.inflight = null),
          this.queue.unshift(inflight),
          true)
        : false;
    },
    reclaim(..._extraArguments: unknown[]): undefined {
      let inflight: Dynamic = this.inflight;
      if (
        !(
          !inflight ||
          operationScope.enabled ||
          this.dead ||
          !(inflight.parked === true || inflight.moored === true)
        )
      ) {
        if (inflight.parked === true && this.retryTimer !== null) {
          operationScope.dataOperationControlVerdict.timers.clearTimeout(
            this.retryTimer,
          );
        }
        if (inflight.parked === true) {
          this.retryTimer = null;
        }
        inflight.parked = false;
        inflight.moored = false;
        inflight.triesBase = inflight.tries;
        inflight.boundTries = 0;
        this.inflight = null;
        this.queue.unshift(inflight);
      }
    },
    async knock(..._extraArguments: unknown[]) {
      let door: Dynamic = await this.door({
        verb: `read`,
        payload: {
          kind: `view`,
          sinceRev: Math.max(this.lastRev, 0),
        },
      });
      return !door || (door.verdict !== `allow` && door.verdict !== `deny`)
        ? false
        : this.probeServed(door);
    },
    probeServed(response?: Dynamic, ..._extraArguments: unknown[]) {
      if (response?.verdict === `allow`) return true;
      if (response?.verdict !== `deny`) return false;
      let k10: Dynamic =
        (0, operationScope.refusalClass)()?.classify(response, {
          road: `read`,
          seated: (0,
          operationScope.loadDataOperationControlVerdictHandler26)(),
          node: this.node,
        }).k ?? null;
      return k10 !== `transient` && k10 !== `lost`;
    },
    knockHeard(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      this.probeEar = (
        dataOperationControlVerdict3?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined =>
        void dataOperationControlVerdict3.then(
          (result?: Dynamic, ..._extraArguments: unknown[]): undefined =>
            void (
              !operationScope.enabled &&
              !this.dead &&
              dataOperationControlVerdict2(
                this.probeServed(isPlainRecord(result) ? result : null),
              )
            ),
          (..._extraArguments: unknown[]): undefined => undefined,
        );
      try {
        return this.knock();
      } finally {
        this.probeEar = undefined;
      }
    },
    parkIfDown(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      dataOperationControlVerdict2.parked = false;
      return operationScope.kind === null ||
        this.nodeGone ||
        this.inflight !== dataOperationControlVerdict2
        ? false
        : ((dataOperationControlVerdict2.triesBase =
            dataOperationControlVerdict2.tries),
          (dataOperationControlVerdict2.boundTries = 0),
          (this.inflight = null),
          this.queue.unshift(dataOperationControlVerdict2),
          this.emit(
            (0, operationScope.loadDataOperationControlVerdictHandler25)(
              this.node,
            ),
          ),
          true);
    },
    rearmGap(..._extraArguments: unknown[]): undefined {
      if (this.gapOwed && !operationScope.enabled && !this.dead) {
        this.gapRetry();
      }
    },
  };
  return methods;
}
