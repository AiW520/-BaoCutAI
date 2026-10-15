/** BaoCut: operation controller node gap. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import type { OperationControllerScope } from "./controller-contracts";
import { reportOperationEvent } from "../observability/boot";
import {
  DataOperationControlStyles4,
  dataOperationControlValue10003,
  dataOperationControlValue20006,
  dataOperationControlValue300003,
  dataOperationControlValue4000,
  dataOperationControlValue5000,
  isDataOperationControlDeny3,
  isDataOperationControlDeny8,
  resolveDataOperationControlRound4,
  resolveDataOperationControlWords,
} from "../data/operation-control-2";
import {
  isPlainRecord,
  resolveDataOperationControlDeny,
} from "../data/operation-control-4";
export function createOperationNodeGap(
  operationScope: Pick<
    OperationControllerScope,
    | "enabled"
    | "loadDataOperationControlVerdictResult10"
    | "enabled16"
    | "dataOperationControlVerdict"
    | "kind"
    | "refusalClass"
    | "emit5"
    | "visibility"
    | "loadDataOperationControlVerdictHandler21"
    | "enabled15"
    | "ObservabilityTelemetryUnmatched3"
    | "state"
    | "honourOpsOnFeed"
  >,
): Record<string, Dynamic> {
  const methods: Record<string, Dynamic> & ThisType<Dynamic> = {
    gapStand(
      rev?: Dynamic,
      floor2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      this.gapGaveUp = false;
      this.stoodAt = floor2;
      reportOperationEvent(`told.gapStood`, {
        rev: rev,
        floor: floor2,
      });
    },
    wholeRead(
      why?: Dynamic,
      options?: unknown,
      context: Dynamic = DataOperationControlStyles4,
      dependencies?: unknown,
      ..._extraArguments: unknown[]
    ): undefined {
      if (!(operationScope.enabled || this.dead)) {
        if (operationScope.loadDataOperationControlVerdictResult10 !== null)
          return void reportOperationEvent(`told.whole.gone`, {
            why: why,
          });
        if (operationScope.enabled16)
          return void reportOperationEvent(`told.whole.refused`, {
            why: why,
          });
        this.gapOwed = true;
        if (
          this.stoodAt >= 0 &&
          typeof options == `number` &&
          options > this.stoodAt
        ) {
          this.stoodAt = -1;
        }
        if (typeof options == `number`) {
          this.gapRev = Math.max(this.gapRev, options);
        }
        if (typeof dependencies == `number`) {
          this.gapSeq = Math.max(this.gapSeq, dependencies);
        } else {
          if (typeof options == `number`) {
            this.gapRevUnloc = Math.max(this.gapRevUnloc, options);
          }
        }
        this.roomSeen(options);
        reportOperationEvent(`told.whole`, {
          why: why,
          rev: options ?? -1,
          seq: dependencies ?? -1,
          pending: this.pending(),
          ...(this.heldWords > 0
            ? {
                held: this.heldWords,
              }
            : {}),
          reading: this.reading,
          halted: this.halted,
        });
        if (this.halted)
          return void (this.lastRev >= 0 && this.read(this.since()));
        if (this.out() > 0) return void (this.owed = this.oweWhole = true);
        if (this.reading) {
          if (typeof options != `number`) {
            this.gapBlind = true;
            if (typeof dependencies != `number`) {
              this.gapBlindUnloc = true;
            }
          }
          this.rung = this.rungWhole = true;
          return;
        }
        this.read(undefined, context);
      }
    },
    gapClosedBy(
      rev?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      if (!this.gapOwed) return true;
      let matchesOptions =
        options !== undefined && this.gapSeq >= 0
          ? options >= this.gapSeq
          : undefined;
      let closes =
        matchesOptions === undefined
          ? !this.gapBlind && rev >= this.gapRev
          : matchesOptions && !this.gapBlindUnloc && rev >= this.gapRevUnloc;
      reportOperationEvent(`told.gapClosedBy`, {
        rev: rev,
        seq: options ?? -1,
        gapRev: this.gapRev,
        gapSeq: this.gapSeq,
        gapRevUnloc: this.gapRevUnloc,
        blind: this.gapBlind,
        blindUnloc: this.gapBlindUnloc,
        closes: closes,
      });
      return closes
        ? (reportOperationEvent(`told.gapClosed`, {
            rev: rev,
            seq: options ?? -1,
            fails: this.gapFails,
          }),
          (this.gapOwed = false),
          (this.gapRev = this.gapSeq = this.gapRevUnloc = -1),
          (this.gapBlindUnloc = false),
          (this.gapFails = 0),
          (this.gapEpisode = false),
          (this.gapWaitedMs = 0),
          (this.gapGaveUp = false),
          (this.stoodAt = -1),
          this.gapTimer !== null &&
            operationScope.dataOperationControlVerdict.timers.clearTimeout(
              this.gapTimer,
            ),
          (this.gapTimer = null),
          true)
        : false;
    },
    gapWhy(..._extraArguments: unknown[]): Dynamic {
      return this.sheds > 0 ? `shed` : this.lastReadWhy;
    },
    gapRetry(..._extraArguments: unknown[]) {
      if (operationScope.loadDataOperationControlVerdictResult10 !== null)
        return void this.pageStopped();
      if (operationScope.enabled16) return void this.pageStopped(false);
      if (
        !this.gapOwed ||
        this.gapTimer !== null ||
        operationScope.enabled ||
        this.dead ||
        this.halted ||
        operationScope.kind === `unreached` ||
        this.stoodAt >= 0
      )
        return;
      let refusalClass2: Dynamic = (0, operationScope.refusalClass)();
      if (
        refusalClass2 !== null &&
        this.readsUnanswered >= refusalClass2.TRANSIENT_RETRY_MAX
      ) {
        this.readsUnanswered = 0;
        this.gapFails = 0;
        (0, operationScope.emit5)(
          `unreached`,
          `gap read ×${refusalClass2.TRANSIENT_RETRY_MAX}`,
          `read`,
        );
        return;
      }
      if (this.gapFails >= 24 || this.gapWaitedMs >= 12e4)
        return this.gapAbandon();
      let served: Dynamic =
        this.served && operationScope.visibility.state() !== `visible`;
      let dataOperationControlValue50005 = served
        ? dataOperationControlValue5000
        : Math.min(
            dataOperationControlValue5000,
            250 * 2 ** Math.min(this.gapFails, 6),
          );
      let wait2 =
        this.sheds > 0
          ? Math.max(
              dataOperationControlValue50005,
              resolveDataOperationControlRound4(
                1,
                this.shedAskedMs,
                dataOperationControlValue20006,
                operationScope.dataOperationControlVerdict.random ??
                  ((..._extraArguments: unknown[]) => 0),
              ),
            )
          : dataOperationControlValue50005;
      this.gapFails += 1;
      this.gapWaitedMs += wait2;
      this.gapGaveUp = false;
      this.gapSlow = served;
      let why: Dynamic = this.gapWhy();
      reportOperationEvent(`told.gapRetry`, {
        fails: this.gapFails,
        wait: wait2,
        gapRev: this.gapRev,
        gapSeq: this.gapSeq,
        shed: this.sheds > 0,
        why: why,
        vis: operationScope.visibility.state(),
      });
      if (!this.gapEpisode) {
        this.gapEpisode = true;
        reportOperationEvent(`told.gapEpisode`, {
          gapRev: this.gapRev,
          gapSeq: this.gapSeq,
          why: why,
          vis: operationScope.visibility.state(),
        });
      }
      this.gapTimer =
        operationScope.dataOperationControlVerdict.timers.setTimeout(
          (..._extraArguments: unknown[]): undefined => {
            this.gapTimer = null;
            this.gapSlow = false;
            this.gapRead();
          },
          wait2,
        );
    },
    gapRead(..._extraArguments: unknown[]): undefined {
      if (
        !(
          !this.gapOwed ||
          operationScope.enabled ||
          this.dead ||
          (0, operationScope.loadDataOperationControlVerdictHandler21)()
        )
      ) {
        if (this.out() > 0) return void (this.owed = this.oweWhole = true);
        if (this.reading) return void (this.rung = this.rungWhole = true);
        this.read(undefined, DataOperationControlStyles4);
      }
    },
    pageStopped(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      let matchesDataOperationControlVerdict =
        dataOperationControlVerdict2 !== undefined;
      let enabled26 = false;
      if (
        this.gapOwed &&
        this.gapEpisode &&
        (matchesDataOperationControlVerdict
          ? dataOperationControlVerdict2
          : !operationScope.enabled15) &&
        !operationScope.enabled &&
        !this.dead
      ) {
        if (!matchesDataOperationControlVerdict) {
          operationScope.enabled15 = true;
        }
        enabled26 = true;
        reportOperationEvent(`told.gapAbandoned`, {
          fails: this.gapFails,
          waitedMs: this.gapWaitedMs,
          gapRev: this.gapRev,
          gapSeq: this.gapSeq,
          gapRevUnloc: this.gapRevUnloc,
          blind: this.gapBlind,
          blindUnloc: this.gapBlindUnloc,
          pictureSeq: this.pictureSeq,
          why: `refused`,
          vis: operationScope.visibility.state(),
          ...(matchesDataOperationControlVerdict
            ? {
                access: true,
              }
            : {
                gone: true,
              }),
        });
      }
      this.gapOwed = false;
      this.gapRev = this.gapSeq = this.gapRevUnloc = -1;
      this.gapBlind = this.gapBlindUnloc = false;
      this.gapFails = 0;
      this.gapEpisode = false;
      this.gapWaitedMs = 0;
      this.gapGaveUp = false;
      this.stoodAt = -1;
      this.owed = this.oweWhole = false;
      this.rung = this.rungWhole = false;
      this.shedHeld = null;
      for (let loadDataOperationControlVerdictResult22 of [
        this.gapTimer,
        this.pollTimer,
        this.quietTimer,
        this.healTimer,
        this.healReissueTimer,
        this.orderTimer,
        this.shedTimer,
        this.stubTimer,
        this.freshTimer,
      ] as Dynamic)
        if (loadDataOperationControlVerdictResult22 !== null) {
          operationScope.dataOperationControlVerdict.timers.clearTimeout(
            loadDataOperationControlVerdictResult22,
          );
        }
      this.gapTimer =
        this.pollTimer =
        this.quietTimer =
        this.healTimer =
        this.healReissueTimer =
        this.orderTimer =
        this.shedTimer =
        this.stubTimer =
        this.freshTimer =
          null;
      this.resetHoleState();
      this.probeHeld = null;
      this.freshOwed = false;
      this.shedRelease();
      this.paceOff();
      this.calmOff();
      return enabled26;
    },
    readsResume(..._extraArguments: unknown[]): undefined {
      if (!(operationScope.enabled || this.dead || this.nodeGone)) {
        if (this.served) {
          this.need();
        } else {
          this.read(undefined);
        }
        this.heard();
        if (this.pollTimer === null) {
          this.armPoll();
        }
      }
    },
    accessAllowed(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (!(!dataOperationControlVerdict2 && this.accessRefusedWhole)) {
        this.accessRefused = this.accessRefusedWhole = this.knockBlind = false;
        (0, operationScope.ObservabilityTelemetryUnmatched3)(this);
      }
    },
    async accessKnock(..._extraArguments: unknown[]) {
      let door: Dynamic = await this.door({
        verb: `read`,
        payload: {
          kind: `view`,
          sinceRev: Math.max(this.lastRev, 0),
        },
      });
      return door
        ? door.verdict === `allow`
          ? `allowed`
          : isDataOperationControlDeny8(door)
            ? `refused`
            : `none`
        : `none`;
    },
    gapAbandon(..._extraArguments: unknown[]): undefined {
      reportOperationEvent(`told.gapAbandoned`, {
        fails: this.gapFails,
        waitedMs: this.gapWaitedMs,
        gapRev: this.gapRev,
        gapSeq: this.gapSeq,
        gapRevUnloc: this.gapRevUnloc,
        blind: this.gapBlind,
        blindUnloc: this.gapBlindUnloc,
        pictureSeq: this.pictureSeq,
        why: this.gapWhy(),
        vis: operationScope.visibility.state(),
      });
      this.gapRev = this.gapSeq = this.gapRevUnloc = -1;
      this.gapBlind = this.gapBlindUnloc = false;
      this.pictureSeq = this.heardSeq = -1;
      this.gapFails = 0;
      this.gapEpisode = false;
      this.gapWaitedMs = 0;
      this.gapGaveUp = true;
      this.gapRead();
    },
    shedNote(
      asked?: Dynamic,
      whole?: Dynamic,
      page: Dynamic = false,
      ..._extraArguments: unknown[]
    ): Dynamic {
      this.calmOff();
      if (this.paceLeft !== null) {
        this.paceSlower();
      }
      this.sheds += 1;
      this.shedSeen += 1;
      this.shedAskedMs = asked;
      let wait2: Dynamic = resolveDataOperationControlRound4(
        this.sheds,
        asked,
        dataOperationControlValue10003,
        operationScope.dataOperationControlVerdict.random ??
          ((..._extraArguments: unknown[]) => 0),
        this.served
          ? dataOperationControlValue300003
          : dataOperationControlValue4000,
      );
      reportOperationEvent(`read.shed`, {
        n: this.sheds,
        wait: wait2,
        asked: asked,
        served: this.served,
        whole: whole,
        page: page,
      });
      if (!this.served) {
        let now2: Dynamic = operationScope.dataOperationControlVerdict.now?.();
        if (now2 !== undefined && this.openShedAt === null) {
          this.openShedAt = now2;
        }
        let dataOperationControlWords: Dynamic =
          resolveDataOperationControlWords(
            now2 !== undefined && this.openShedAt !== null
              ? now2 - this.openShedAt
              : this.shedWaitedMs,
          );
        this.shedWaitedMs += wait2;
        this.emit({
          t: `state`,
          node: this.node,
          state: (0, operationScope.state)(),
          openBusy: true,
          words: dataOperationControlWords.words,
          stage: dataOperationControlWords.stage,
        });
      }
      return wait2;
    },
    shedPause(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let shedNote: Dynamic = this.shedNote(
        dataOperationControlVerdict2,
        true,
        true,
      );
      this.shedWaitMs = shedNote;
      let now2: Dynamic = operationScope.dataOperationControlVerdict.now?.();
      return new (Promise as Dynamic)(
        (resolve?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          this.shedPauseTimer =
            operationScope.dataOperationControlVerdict.timers.setTimeout(
              (..._extraArguments: unknown[]): undefined => {
                this.shedPauseTimer = null;
                this.shedEnded(this.stood(shedNote, now2));
                resolve();
                this.shedOver(true);
              },
              shedNote,
            );
        },
      );
    },
    async pagedRead(
      payload?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> {
      for (;;) {
        for (; this.shedTimer !== null; )
          if ((await this.shedWaitOut(), operationScope.enabled || this.dead))
            return null;
        let door: Dynamic = await this.door(
          {
            verb: `read`,
            payload: payload,
          },
          undefined,
          true,
        );
        if (!door) return null;
        let dataOperationControlDeny: Dynamic =
          resolveDataOperationControlDeny(door);
        if (dataOperationControlDeny === null) {
          if (door.verdict === `allow`) {
            this.shedClear();
          }
          return door;
        }
        await this.shedPause(dataOperationControlDeny);
        if (operationScope.enabled || this.dead) return null;
      }
    },
    shedArm(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (operationScope.enabled || this.dead) return;
      let shedNote: Dynamic = this.shedNote(
        dataOperationControlVerdict2,
        options,
      );
      this.shedWaitMs = shedNote;
      if (this.shedTimer !== null) {
        operationScope.dataOperationControlVerdict.timers.clearTimeout(
          this.shedTimer,
        );
      }
      if (!this.served && options) {
        this.shedHeld = {
          whole: true,
          named: context || this.shedHeld?.named,
        };
      }
      let now2: Dynamic = operationScope.dataOperationControlVerdict.now?.();
      this.shedTimer =
        operationScope.dataOperationControlVerdict.timers.setTimeout(
          (..._extraArguments: unknown[]): undefined => {
            this.shedTimer = null;
            this.shedEnded(this.stood(shedNote, now2));
            this.shedRelease();
            if (operationScope.enabled || this.dead) return;
            let shedHeld: Dynamic = this.shedHeld;
            this.shedHeld = null;
            if (shedHeld === null) {
              if (
                !(0, operationScope.honourOpsOnFeed)() &&
                this.wantRev > this.lastRev &&
                this.lastRev >= 0
              ) {
                this.read(this.since());
              }
            } else {
              this.read(
                shedHeld.whole ? undefined : this.since(),
                shedHeld.named,
              );
            }
            this.shedOver(shedHeld?.whole === true);
          },
          shedNote,
        );
    },
    shedClear(..._extraArguments: unknown[]): undefined {
      this.sheds = 0;
      this.shedAskedMs = 0;
      this.shedWaitedMs = 0;
      this.openShedAt = null;
      this.calmOff();
    },
    shedEnded(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (!(operationScope.enabled || this.dead)) {
        this.paceGrant(dataOperationControlVerdict2);
        this.calmArm();
        this.drainBlockReads(true);
      }
    },
    calmOff(..._extraArguments: unknown[]): undefined {
      this.shedCalm = 0;
      if (this.calmTimer !== null) {
        operationScope.dataOperationControlVerdict.timers.clearTimeout(
          this.calmTimer,
        );
      }
      this.calmTimer = null;
    },
    calmArm(..._extraArguments: unknown[]): undefined {
      if (!(this.calmTimer !== null || this.shedCalm >= this.sheds)) {
        this.calmTimer =
          operationScope.dataOperationControlVerdict.timers.setTimeout(
            (..._extraArguments: unknown[]): undefined => {
              this.calmTimer = null;
              if (!(operationScope.enabled || this.dead || this.shedStands())) {
                this.shedCalm += 1;
                this.calmArm();
              }
            },
            Math.max(this.shedWaitMs, dataOperationControlValue10003),
          );
      }
    },
    shedEase(..._extraArguments: unknown[]): undefined {
      if (this.shedCalm !== 0) {
        this.sheds = Math.max(0, this.sheds - this.shedCalm);
        this.shedCalm = 0;
        if (this.sheds === 0) {
          this.shedClear();
        } else {
          this.calmArm();
        }
      }
    },
    shedStands(..._extraArguments: unknown[]) {
      return this.shedTimer !== null || this.shedPauseTimer !== null;
    },
    shedWaitOut(..._extraArguments: unknown[]): Dynamic {
      return new (Promise as Dynamic)(
        (resolve?: Dynamic, ..._extraArguments: unknown[]): undefined =>
          void this.shedWaiters.push(resolve),
      );
    },
    shedRelease(..._extraArguments: unknown[]): undefined {
      for (let loadDataOperationControlVerdictResult22 of this.shedWaiters.splice(
        0,
      ) as Dynamic)
        loadDataOperationControlVerdictResult22();
    },
    shedHeldReply(..._extraArguments: unknown[]) {
      return {
        verdict: `deny`,
        reason: `unavailable`,
        detail: `busy: the door shed a read of this document a moment ago; held for its wait, nothing sent`,
        data: {
          why: `busy`,
          scope: `read`,
          retryAfterMs: Math.max(
            this.shedWaitMs,
            dataOperationControlValue10003,
          ),
          held: true,
        },
      };
    },
    shedOver(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (operationScope.enabled || this.dead || this.shedStands()) return;
      let probeHeld: Dynamic = this.probeHeld;
      this.probeHeld = null;
      let wantComments: Dynamic = this.wantComments && !this.commentsBarred;
      if (
        probeHeld !== null &&
        !dataOperationControlVerdict2 &&
        (probeHeld.catchUp || wantComments)
      ) {
        if (
          !probeHeld.catchUp &&
          operationScope.visibility.state() !== `visible`
        ) {
          this.freshOwed = true;
        } else {
          this.probe(false, probeHeld.catchUp);
        }
      }
      this.drainBlockReads();
    },
    shedHolds(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      if (this.shedTimer === null) return false;
      if (
        this.served &&
        dataOperationControlVerdict2 === undefined &&
        (options ===
          `ops on the feed: one whole read (a gap the told rows cannot close)` ||
          options === `the stall healer's one whole read (BGO-1280 interim)`)
      ) {
        if (
          options ===
          `ops on the feed: one whole read (a gap the told rows cannot close)`
        ) {
          this.gapRetry();
        }
        reportOperationEvent(`read.shed.held`, {
          whole: true,
          n: this.sheds,
          ladder:
            options ===
            `ops on the feed: one whole read (a gap the told rows cannot close)`
              ? `gap`
              : `heal`,
        });
        return true;
      }
      let shedHeld: Dynamic = this.shedHeld;
      let whole: Dynamic =
        (shedHeld?.whole ?? false) ||
        dataOperationControlVerdict2 === undefined;
      this.shedHeld = {
        whole: whole,
        named:
          (dataOperationControlVerdict2 === undefined ? options : undefined) ??
          shedHeld?.named,
      };
      reportOperationEvent(`read.shed.held`, {
        whole: whole,
        n: this.sheds,
      });
      return true;
    },
    probe(
      dataOperationControlVerdict2?: Dynamic,
      catchUp: Dynamic = false,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        operationScope.enabled ||
        this.dead ||
        !this.served ||
        (0, operationScope.loadDataOperationControlVerdictHandler21)() ||
        this.sinceHalted(Math.max(this.lastRev, this.picRev, 0)) ||
        (dataOperationControlVerdict2 &&
          !this.commentsBarred &&
          ((this.wantComments = true), (this.commentsAsk += 1)),
        this.probing)
      )
        return;
      if (this.shedStands())
        return void (this.probeHeld = {
          catchUp: catchUp || this.probeHeld?.catchUp === true,
        });
      let comments: Dynamic = !this.commentsBarred && this.wantComments;
      let commentsAsk: Dynamic = this.commentsAsk;
      this.probing = true;
      let sinceRev = Math.max(this.lastRev, this.picRev, 0);
      this.door({
        verb: `read`,
        payload: {
          kind: `view`,
          sinceRev: sinceRev,
          ...(comments
            ? {
                comments: true,
              }
            : {}),
        },
      }).then(
        (response?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          this.probing = false;
          if (response && isDataOperationControlDeny3(response)) {
            if (comments) {
              this.commentsTooLarge();
              this.probe(false);
            } else {
              this.haltTooLarge(false, sinceRev);
            }
            return;
          }
          if (
            response &&
            this.shedStands() &&
            resolveDataOperationControlDeny(response) !== null &&
            (catchUp || this.wantComments)
          ) {
            this.probeHeld = {
              catchUp: catchUp || this.probeHeld?.catchUp === true,
            };
          }
          if (!response || response.verdict !== `allow`) return;
          let data: Dynamic = isPlainRecord(response.data) ? response.data : {};
          let item = [response.rev, data.rev].find(
            (item2?: unknown, ..._extraArguments: unknown[]) =>
              typeof item2 == `number`,
          );
          if (comments) {
            if (this.commentsAsk === commentsAsk) {
              this.wantComments = false;
            }
            if (Array.isArray(data.comments)) {
              this.emit({
                t: `comments`,
                node: this.node,
                comments: data.comments,
              });
            }
          }
          reportOperationEvent(`told.probe`, {
            top: sinceRev,
            rev: item ?? -1,
            comments: comments,
            again: this.wantComments,
            catchUp: catchUp,
          });
          if (
            catchUp &&
            typeof item == `number` &&
            item > Math.max(this.lastRev, this.shownRev, this.heardRev)
          ) {
            this.wholeRead(
              `the no-feed poll: the room is past this page and no row can come`,
              item,
            );
          } else {
            this.roomSeen(item);
          }
          if (this.wantComments && !this.commentsBarred) {
            this.probe(true);
          }
        },
        (..._extraArguments: unknown[]): undefined =>
          void (this.probing = false),
      );
    },
    readComments(..._extraArguments: unknown[]): undefined {
      this.probe(true);
    },
  };
  return methods;
}
