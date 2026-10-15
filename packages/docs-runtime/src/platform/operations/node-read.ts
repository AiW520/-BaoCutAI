/** BaoCut: operation controller node read. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import type { OperationControllerScope } from "./controller-contracts";
import { recordFramePhase } from "../dependencies";
import {
  reportOperationEvent,
  resolveObservabilityBootNode,
} from "../observability/boot";
import {
  DataOperationControlState10,
  DataOperationControlStyles4,
  DataOperationControlStyles5,
  DataOperationControlStyles6,
  DataOperationControlStyles7,
  DataOperationControlStyles8,
  DataOperationControlStyles9,
  DataOperationControlThisDocumentServiceIsTooOldForThisEditor,
  dataOperationControlValue6000,
  dataOperationControlValue8,
  isDataOperationControlDeny3,
  isDataOperationControlDeny8,
  resolveDataOperationControlValue28,
} from "../data/operation-control-2";
import {
  isPlainRecord,
  resolveDataOperationControlAsOf,
  resolveDataOperationControlBid,
  resolveDataOperationControlBlocks2,
  resolveDataOperationControlDeny,
  resolveDataOperationControlFrom,
  resolveDataOperationControlSure,
} from "../data/operation-control-4";
export function createOperationNodeRead(
  operationScope: Pick<
    OperationControllerScope,
    | "enabled"
    | "loadDataOperationControlVerdictResult10"
    | "enabled16"
    | "state"
    | "honourOpsOnFeed"
    | "dataOperationControlVerdict"
    | "matchesReady"
    | "loadDataOperationControlVerdictHandler"
    | "emit7"
    | "reconcile"
    | "refusalClass"
    | "loadDataOperationControlVerdictHandler26"
    | "pageStopped"
    | "emit3"
    | "onFaces"
  >,
): Record<string, Dynamic> {
  const methods: Record<string, Dynamic> & ThisType<Dynamic> = {
    landPrint(doc?: Dynamic, rev?: Dynamic, ..._extraArguments: unknown[]) {
      if (
        !this.served ||
        this.reading ||
        this.lastRev < 0 ||
        rev !== this.lastRev + 1 ||
        this.dead ||
        operationScope.enabled
      )
        return false;
      let match = /^<doc\b[^>]*\ssinceRev="(\d+)"/.exec(doc);
      return !match || Number(match[1]) !== this.lastRev
        ? false
        : ((this.wantRev = Math.max(this.wantRev, rev)),
          this.read(this.lastRev, undefined, {
            verdict: `allow`,
            rev: rev,
            data: {
              doc: doc,
              rev: rev,
              complete: 1,
            },
          }),
          true);
    },
    async read(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<undefined> {
      if (
        operationScope.loadDataOperationControlVerdictResult10 !== null &&
        this.served
      )
        return;
      if (operationScope.enabled16) {
        if (!this.served) {
          this.emit({
            t: `state`,
            node: this.node,
            state: (0, operationScope.state)(),
            openFailed: true,
          });
        }
        return;
      }
      if ((0, operationScope.honourOpsOnFeed)() && !this.halted) {
        dataOperationControlVerdict2 = undefined;
        context = undefined;
        options ??= DataOperationControlStyles4;
      }
      if (
        (dataOperationControlVerdict2 === undefined &&
          (this.halted || (this.cooling && !this.served))) ||
        (dataOperationControlVerdict2 !== undefined &&
          this.sinceHalted(dataOperationControlVerdict2)) ||
        (context === undefined &&
          this.shedHolds(dataOperationControlVerdict2, options))
      )
        return;
      if (
        dataOperationControlVerdict2 === undefined &&
        (options === `re-read what the room made of a paste` ||
          options === `the stall healer's one whole read (BGO-1280 interim)` ||
          options ===
            `ops on the feed: one whole read (a gap the told rows cannot close)` ||
          options === `mount` ||
          options === `recovering after a contained editor error; re-reading` ||
          options ===
            `a block read by id holds fewer named blocks than this page draws inside it`)
      )
        this.namedWhole = options;
      else if (
        dataOperationControlVerdict2 === undefined &&
        this.noWhole(options ?? `a whole read past the first picture`)
      ) {
        let since2: Dynamic = this.since();
        if (since2 === undefined) return;
        dataOperationControlVerdict2 = since2;
      }
      if (this.reading) {
        this.rung = true;
        if (dataOperationControlVerdict2 === undefined && this.lastRev >= 0) {
          this.rungWhole = true;
        }
        return;
      }
      this.reading = true;
      this.readingWhole = dataOperationControlVerdict2 === undefined;
      if (this.readingWhole) {
        this.gapBlind = this.gapBlindUnloc = false;
      }
      if (
        !this.served &&
        operationScope.dataOperationControlVerdict.wal.ready !== undefined &&
        !operationScope.matchesReady
      ) {
        await Promise.race([
          operationScope.dataOperationControlVerdict.wal.ready,
          (0, operationScope.loadDataOperationControlVerdictHandler)(400),
        ]).catch((..._extraArguments: unknown[]): undefined => undefined);
        if (this.takeLeft()) {
          (0, operationScope.emit7)();
        }
      }
      if (!this.served && this.leftWords.length > 0) {
        await this.ready;
      }
      for (
        let dataOperationControlVerdict3: Dynamic =
          dataOperationControlVerdict2;
        dataOperationControlVerdict3 !== false &&
        (dataOperationControlVerdict3 === undefined &&
          ([this.readingNamed, this.namedWhole] = [this.namedWhole, false]),
        (dataOperationControlVerdict3 = await this.readOnce(
          dataOperationControlVerdict3,
          context,
        )),
        (context = undefined),
        !(
          (dataOperationControlVerdict3 === undefined &&
            (this.halted || (this.cooling && !this.served))) ||
          (dataOperationControlVerdict3 === undefined &&
            this.noWhole(`the whole view behind a delta`))
        ));

      );
      this.reading = this.readingWhole = false;
      if (
        (0, operationScope.honourOpsOnFeed)() &&
        this.served &&
        (this.toldHeld.length > 0 || this.toldOverflow)
      ) {
        this.drainTold(this.picRev);
      }
      if (
        (0, operationScope.honourOpsOnFeed)() &&
        this.gapOwed &&
        !this.rung &&
        !(this.owed && this.out() === 0)
      ) {
        this.gapRetry();
      }
      let rung: Dynamic =
        this.rung || (this.owed && this.out() === 0) || this.namedWhole;
      let rungWhole: Dynamic = this.rungWhole || this.namedWhole;
      this.rung = this.rungWhole = false;
      if (this.out() === 0) {
        this.owed = false;
      }
      let since: Dynamic = rungWhole ? undefined : this.since();
      let matchesSince: Dynamic =
        since === undefined && (this.halted || (this.cooling && !this.served));
      if (rung && !matchesSince && !operationScope.enabled && !this.dead) {
        this.read(since, this.namedWhole || undefined);
      } else {
        this.pump();
      }
    },
    async readOnce(
      sinceRev?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> {
      let matchesSinceRev = sinceRev === undefined;
      let enabled26: Dynamic =
        !this.commentsBarred &&
        this.wantComments &&
        (matchesSinceRev || (!operationScope.reconcile && this.served));
      let commentsAsk: Dynamic = this.commentsAsk;
      let payload: Dynamic = {
        kind: `view`,
        ...(matchesSinceRev
          ? {}
          : {
              sinceRev: sinceRev,
            }),
        ...(enabled26
          ? {
              comments: true,
            }
          : {}),
      };
      let matchesOptions =
        options !== undefined && !matchesSinceRev && !enabled26;
      if (
        !matchesOptions &&
        this.shedTimer !== null &&
        this.shedHolds(
          sinceRev,
          (matchesSinceRev && this.readingNamed) || undefined,
        )
      )
        return false;
      let options2: Dynamic = matchesOptions
        ? options
        : await this.door(
            {
              verb: `read`,
              payload: payload,
            },
            undefined,
            true,
          );
      if (!options2) return false;
      if (!matchesOptions && options2.verdict === `allow`) {
        this.accessAllowed(matchesSinceRev);
      }
      this.readsUnanswered =
        options2.verdict === `allow` || options2.verdict === `deny`
          ? 0
          : this.readsUnanswered + 1;
      this.lastReadWhy =
        options2.verdict === `allow`
          ? `below`
          : options2.verdict === `deny`
            ? `refused`
            : options2.hung === true
              ? `hung`
              : `unanswered`;
      let record4: Dynamic = isPlainRecord(options2.data)
        ? {
            ...options2.data,
          }
        : {};
      let matchesVerdict =
        options2.verdict === `deny` &&
        /\Wkind\W/.test(
          JSON.stringify([record4.detail, record4.at, options2.detail]),
        );
      if (matchesVerdict) {
        this.emit({
          t: `state`,
          node: this.node,
          state: `readonly`,
          words: DataOperationControlThisDocumentServiceIsTooOldForThisEditor,
        });
      }
      let enabled27: Dynamic = !this.served && matchesSinceRev && this.gaveUp;
      if (options2.verdict !== `allow`) {
        let classify2: Dynamic =
          options2.verdict === `deny`
            ? ((0, operationScope.refusalClass)()?.classify(options2, {
                road: `read`,
                verb: `read`,
                seated: (0,
                operationScope.loadDataOperationControlVerdictHandler26)(),
                node: this.node,
              }) ?? null)
            : null;
        if (
          classify2?.k === `page_terminal` &&
          classify2.source !== `relay` &&
          classify2.source !== `http` &&
          (classify2.face === `not_governed` || classify2.face === `cmek`)
        ) {
          (0, operationScope.pageStopped)(classify2.face);
        }
        if (
          operationScope.loadDataOperationControlVerdictResult10 === null &&
          isDataOperationControlDeny8(options2)
        ) {
          if (
            !this.served &&
            matchesSinceRev &&
            !matchesVerdict &&
            !enabled27
          ) {
            this.emit({
              t: `state`,
              node: this.node,
              state: `readonly`,
              openFailed: true,
            });
          }
          (0, operationScope.emit3)();
          this.owed = this.oweWhole = false;
          this.rung = this.rungWhole = false;
          return false;
        }
        if (
          options2.verdict === `deny` &&
          (options2.reason === `gone` ||
            record4.code === `gone` ||
            resolveDataOperationControlSure(options2) !== null ||
            classify2?.k === `page_terminal` ||
            classify2?.k === `link_terminal`)
        ) {
          this.owed = this.oweWhole = false;
          this.rung = this.rungWhole = false;
          return false;
        }
        if (isDataOperationControlDeny3(options2))
          return enabled26
            ? (this.commentsTooLarge(),
              matchesSinceRev ? this.readOnce(undefined) : sinceRev)
            : (this.haltTooLarge(matchesSinceRev, sinceRev), false);
        let dataOperationControlDeny: Dynamic =
          resolveDataOperationControlDeny(options2);
        return dataOperationControlDeny === null
          ? enabled27
            ? (this.joinFailed(), false)
            : (!this.served &&
                matchesSinceRev &&
                !matchesVerdict &&
                this.emit({
                  t: `state`,
                  node: this.node,
                  state: (0, operationScope.state)(),
                  openFailed: true,
                }),
              false)
          : ((this.rung = this.rungWhole = false),
            this.shedArm(
              dataOperationControlDeny,
              matchesSinceRev,
              matchesSinceRev ? this.readingNamed : false,
            ),
            false);
      }
      let record5: Dynamic =
        matchesSinceRev && this.sheds > 0
          ? {
              n: this.sheds,
              asked: this.shedAskedMs,
              waited: this.shedWaitedMs,
              since: this.openShedAt,
            }
          : null;
      this.shedClear();
      if (!matchesSinceRev && enabled26) {
        let matchesCommentsAsk = this.commentsAsk === commentsAsk;
        if (matchesCommentsAsk) {
          this.wantComments = false;
        }
        if (matchesCommentsAsk && Array.isArray(record4.comments)) {
          this.emit({
            t: `comments`,
            node: this.node,
            comments: record4.comments,
          });
        }
        delete record4.comments;
      }
      let docJson: Dynamic = record4.doc;
      let loadDataOperationControlVerdictResult22: Dynamic;
      let loadDataOperationControlVerdictResult23: Dynamic;
      let item = [options2.rev, record4.rev].find(
        (item2?: unknown, ..._extraArguments: unknown[]) =>
          typeof item2 == `number`,
      );
      let matchesItem =
        item !== undefined &&
        item >= 0 &&
        item < Math.max(this.lastRev, this.ackedRev, this.heardRev);
      if (matchesSinceRev && typeof docJson == `string` && !matchesItem) {
        let matchesComplete2 =
          record4.complete === false ||
          record4.complete === 0 ||
          /^<doc\b[^>]*\scomplete="(?:0|false)"/.test(docJson);
        let joinPages: Dynamic = await this.joinPages(
          docJson,
          [options2.rev, record4.rev],
          matchesComplete2,
          resolveDataOperationControlFrom(record4),
        );
        if (joinPages === null) return false;
        if (`later` in joinPages) {
          this.owed = this.oweWhole = true;
          return false;
        }
        if (`halt` in joinPages) {
          if (
            joinPages.halt === DataOperationControlStyles8 &&
            !this.served &&
            this.joinTries + 1 >= 6
          ) {
            joinPages.halt = DataOperationControlStyles5;
          }
          let halt = joinPages.halt !== DataOperationControlStyles8;
          if (halt) {
            this.halted = true;
          } else {
            this.joinTries += 1;
            this.coolOff();
          }
          let state2 =
            halt || !this.served ? `readonly` : (0, operationScope.state)();
          this.gaveUp = !halt;
          let count10 = 0;
          if (!this.served && joinPages.part !== undefined) {
            let onFaces3: Dynamic = (0, operationScope.onFaces)(joinPages.part);
            let rev2 =
              [joinPages.rev, onFaces3?.rev].find(
                (item2?: unknown, ..._extraArguments: unknown[]) =>
                  typeof item2 == `number`,
              ) ?? -1;
            if (
              onFaces3 &&
              rev2 >= 0 &&
              !resolveDataOperationControlBlocks2(onFaces3) &&
              (halt || this.lookRev !== rev2)
            ) {
              this.lookRev = rev2;
              count10 = Math.max(1, onFaces3.blocks.length);
              this.emit({
                t: `snapshot`,
                node: this.node,
                rev: rev2,
                blocks: onFaces3.blocks,
                docJson: onFaces3.docJson,
                docXml: joinPages.part,
                incomplete: Math.max(1, joinPages.missing ?? 0),
                ...(Array.isArray(record4.comments)
                  ? {
                      comments: record4.comments,
                    }
                  : {}),
                ...(onFaces3.anchors
                  ? {
                      anchors: onFaces3.anchors,
                    }
                  : {}),
              });
            }
          }
          let enabled30 = !halt && !this.served && this.lookRev !== null;
          let halt2: Dynamic = halt && this.served;
          this.emit({
            t: `state`,
            node: this.node,
            state: state2,
            words: halt2
              ? DataOperationControlStyles7
              : halt && joinPages.halt === DataOperationControlStyles6
                ? count10 > 0
                  ? joinPages.missing
                    ? resolveDataOperationControlValue28(
                        joinPages.missing,
                        count10,
                      )
                    : DataOperationControlState10
                  : joinPages.halt
                : enabled30 && !halt
                  ? DataOperationControlStyles9
                  : joinPages.halt,
            ...(halt
              ? {
                  halt: halt,
                }
              : {}),
            ...(!halt && !this.served
              ? {
                  retrying: true,
                }
              : {}),
            ...(count10 > 0 ||
            enabled30 ||
            halt2 ||
            (halt && !this.served && this.lookRev !== null)
              ? {
                  shown: true,
                }
              : {}),
          });
          return false;
        }
        [
          docJson,
          loadDataOperationControlVerdictResult22,
          loadDataOperationControlVerdictResult23,
        ] = [joinPages.doc, joinPages.complete, joinPages.behind];
        if (joinPages.rev !== undefined) {
          options2.rev = joinPages.rev;
        }
        if (joinPages.comments) {
          record4.comments = joinPages.comments;
        }
      }
      let onFaces2: Dynamic =
        typeof docJson == `string`
          ? (0, operationScope.onFaces)(docJson)
          : isPlainRecord(docJson)
            ? {
                docJson: docJson,
                blocks: [],
              }
            : null;
      let rev =
        [options2.rev, record4.rev, onFaces2?.rev].find(
          (item2?: unknown, ..._extraArguments: unknown[]) =>
            typeof item2 == `number`,
        ) ?? -1;
      if (rev >= 0) {
        this.roomSeen(rev);
      }
      if (rev < 0 || (typeof docJson != `string` && !isPlainRecord(docJson))) {
        if (enabled27) {
          this.joinFailed();
        }
        return false;
      }
      let matchesRev = rev < this.readTop;
      this.readTop = Math.max(this.readTop, rev);
      if (!matchesRev) this.backs = 0;
      else if (++this.backs < 3)
        return matchesSinceRev
          ? ((this.backTimer ??=
              operationScope.dataOperationControlVerdict.timers.setTimeout(
                (..._extraArguments: unknown[]): undefined => {
                  this.backTimer = null;
                  if (
                    !operationScope.enabled &&
                    !this.dead &&
                    !this.noWhole(`a read answered below an earlier one`)
                  ) {
                    this.read(undefined);
                  }
                },
                250,
              )),
            false)
          : undefined;
      else if (matchesSinceRev) {
        this.lastRev =
          this.shownRev =
          this.picRev =
          this.ackedRev =
          this.heardRev =
          this.wantForeign =
            -1;
        this.unwant();
        this.readTop = rev;
        this.stubs = this.backs = 0;
        this.roomRev = this.groundRev = -1;
        this.orderDiverged = false;
        this.orderTooLarge = false;
        this.orderRecadence(0);
        this.behindGround = null;
        this.deadBids.clear();
        this.handedRevs.clear();
        this.bornBehind.clear();
        this.parked.clear();
        this.toldHeld = [];
        this.toldOverflow = false;
        this.resetHoleState(true);
        this.wholePicRev = -1;
        this.gapRev = -1;
        this.gapSeq = this.gapRevUnloc = this.pictureSeq = this.heardSeq = -1;
        this.comparing.clear();
        this.comparedRevs.clear();
        this.wrote = [];
      } else return;
      let matchesCappedCount = (onFaces2?.capped?.length ?? 0) > 0;
      let matchesFolded = (onFaces2?.folded ?? 0) > 0;
      if (
        sinceRev !== undefined &&
        rev > this.lastRev &&
        onFaces2 &&
        !matchesCappedCount &&
        (resolveDataOperationControlBlocks2(onFaces2)
          ? matchesFolded
          : this.ownWords(onFaces2, sinceRev, rev))
      ) {
        this.lastRev = rev;
        this.shownRev = Math.max(this.shownRev, rev);
        if (this.behindGround === null && this.holed.size === 0) {
          this.groundTo(rev);
        }
        if (rev >= this.wantRev) {
          this.unwant();
        }
        this.stubs = 0;
        this.drainParked();
        return false;
      }
      if (sinceRev !== undefined && rev > this.lastRev) {
        this.pollWake();
      }
      let floor2 = Math.max(
        this.lastRev,
        this.ackedRev,
        this.heardRev,
        (0, operationScope.honourOpsOnFeed)() && matchesSinceRev
          ? this.gapRev
          : -1,
      );
      if (rev < floor2 || (sinceRev !== undefined && rev === this.lastRev)) {
        if (
          sinceRev !== undefined &&
          rev === this.lastRev &&
          this.pending() === 0 &&
          this.behindGround === null &&
          this.holed.size === 0
        ) {
          this.groundTo(rev);
        }
        return enabled27
          ? (this.joinFailed(), false)
          : (sinceRev === undefined &&
              record5 !== null &&
              this.sheds === 0 &&
              ([
                this.sheds,
                this.shedAskedMs,
                this.shedWaitedMs,
                this.openShedAt,
              ] = [record5.n, record5.asked, record5.waited, record5.since]),
            sinceRev === undefined && (0, operationScope.honourOpsOnFeed)()
              ? ((this.gapOwed = true),
                this.gapGaveUp && this.gapStand(rev, floor2))
              : sinceRev === undefined &&
                !this.served &&
                (this.backTimer ??=
                  operationScope.dataOperationControlVerdict.timers.setTimeout(
                    (..._extraArguments: unknown[]): undefined => {
                      this.backTimer = null;
                      if (
                        !operationScope.enabled &&
                        !this.dead &&
                        (!this.served || (0, operationScope.honourOpsOnFeed)())
                      ) {
                        this.read(undefined);
                      }
                    },
                    250,
                  )),
            (0, operationScope.honourOpsOnFeed)() &&
              reportOperationEvent(`told.stale`, {
                rev: rev,
                floor: floor2,
              }),
            this.stub(sinceRev));
      }
      this.stubs = 0;
      let under: Dynamic = this.out();
      if (under > 0) {
        this.owed = true;
      }
      let matchesSinceRev2 = sinceRev !== undefined && rev <= this.shownRev;
      if (
        under > 0 &&
        ((!this.served && !this.stuckReplay()) || matchesSinceRev2)
      )
        return false;
      if ((0, operationScope.honourOpsOnFeed)() && under > 0 && this.served) {
        this.oweWhole = true;
        return false;
      }
      if (
        matchesSinceRev &&
        under > 0 &&
        this.served &&
        this.readingNamed ===
          `the stall healer's one whole read (BGO-1280 interim)`
      ) {
        reportOperationEvent(`heal.under_keys`, {
          rev: rev,
          under: under,
          episode: this.healEpisode,
        });
        this.oweWhole = true;
        if (!this.healEpisode) {
          this.healEpisode = true;
          this.healReissues = 0;
        }
        this.healArm(dataOperationControlValue6000);
        return false;
      }
      let matchesCondition =
        typeof docJson == `string` && /^<doc\b[^>]*\ssinceRev=/.test(docJson);
      let matchesCondition2 =
        matchesCondition ||
        (typeof docJson == `string` &&
          /<gap\b(?![^>]*\bcap=)[^>]*\/>/.test(docJson));
      let matchesFolded2 = matchesFolded || matchesCondition2;
      let matchesComplete =
        record4.complete === false ||
        record4.complete === 0 ||
        onFaces2?.complete === false;
      let partial =
        sinceRev !== undefined &&
        (matchesFolded2 || matchesCappedCount || matchesComplete);
      if (
        partial &&
        (matchesCappedCount ||
          !(
            operationScope.dataOperationControlVerdict.deltaFeed &&
            onFaces2?.blocks.length
          ))
      ) {
        if (!matchesCappedCount && this.served && typeof docJson == `string`)
          if (this.pending() > 0) this.deltaBlocks(docJson, rev, under);
          else {
            let matchesCondition3 =
              matchesCondition &&
              !this.unsettled &&
              !this.owed &&
              !onFaces2?.anchors?.length;
            if (
              matchesCondition3 ||
              (!operationScope.reconcile && matchesCondition)
            ) {
              let sinceRev2: Dynamic = sinceRev ?? this.lastRev;
              let deltaBlocks: Dynamic = this.deltaBlocks(docJson, rev, 0);
              if (!deltaBlocks.leftBehind && this.behindGround === null) {
                this.groundTo(rev);
              }
              if (matchesCondition3 && !deltaBlocks.leftBehind) return false;
              if (!operationScope.reconcile) {
                let itemsSlice: Dynamic = [...deltaBlocks.behind].slice(
                  0,
                  dataOperationControlValue8,
                );
                if (deltaBlocks.leftBehind) {
                  let label5 =
                    itemsSlice.length > 0
                      ? `a delta left ${deltaBlocks.behind.size} block(s) it could not place; read by id`
                      : `a delta this page could not place`;
                  this.noWhole(label5);
                  this.healStalled(label5);
                  this.behindGround = {
                    since: Math.min(
                      sinceRev2,
                      this.behindGround?.since ?? sinceRev2,
                    ),
                    rev: Math.max(rev, this.behindGround?.rev ?? rev),
                  };
                }
                for (let loadDataOperationControlVerdictResult24 of itemsSlice as Dynamic)
                  this.readBlock(
                    loadDataOperationControlVerdictResult24,
                    true,
                    false,
                    true,
                  );
                this.lastRev = Math.max(this.lastRev, rev);
                this.shownRev = Math.max(this.shownRev, rev);
                if (rev >= this.wantRev) {
                  this.unwant();
                }
                this.drainParked();
                return false;
              }
            }
          }
        return under === 0 && this.served && !operationScope.reconcile
          ? (this.noWhole(
              matchesCappedCount
                ? `a since-read the engine cut at its ceiling`
                : `a delta this page cannot land by block`,
            ),
            matchesCappedCount
              ? this.groundTo(rev)
              : this.healStalled(`a delta this page cannot land by block`),
            (this.lastRev = Math.max(this.lastRev, rev)),
            (this.shownRev = Math.max(this.shownRev, rev)),
            rev >= this.wantRev && this.unwant(),
            this.drainParked(),
            false)
          : under > 0
            ? false
            : undefined;
      }
      if (
        !partial &&
        !(
          loadDataOperationControlVerdictResult22 ??
          !(matchesCappedCount || matchesFolded2 || matchesComplete)
        )
      ) {
        this.emit({
          t: `state`,
          node: this.node,
          state: `readonly`,
          words: DataOperationControlStyles5,
        });
        return false;
      }
      if (under === 0) {
        this.lastRev = Math.max(this.lastRev, rev);
      }
      if (under === 0 && !partial && this.queue.length === 0) {
        this.unsettled = false;
      }
      if (under === 0 || !this.served) {
        if (!partial) {
          this.unholeAll();
        }
        this.comparing.clear();
      }
      this.shownRev = Math.max(this.shownRev, rev);
      let enabled28 =
        !this.served &&
        this.leftWords.length > 0 &&
        ([this.inflight, ...this.queue].some(
          (item2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            item2?.replayed,
        ) ||
          this.wordsBehind.size > 0);
      if (enabled28) {
        this.wordsOwed = true;
      }
      let filteredLeftWords: Dynamic =
        !this.served && !enabled28
          ? this.leftWords.filter(
              (leftWord?: Dynamic, ..._extraArguments: unknown[]) =>
                !leftWord.parked,
            )
          : [];
      let staged: Dynamic =
        filteredLeftWords.length > 0
          ? filteredLeftWords.map(resolveDataOperationControlBid)
          : undefined;
      if (filteredLeftWords.length > 0) {
        this.wordsOwed = false;
      }
      if (!enabled28 && !this.wordsOwed && !this.remountOwed) {
        this.leftWords = this.leftWords.map(
          (leftWord?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            leftWord.parked
              ? leftWord
              : {
                  ...leftWord,
                  parked: true,
                },
        );
      }
      this.served = true;
      if (!partial) {
        this.lastBlocks =
          matchesCappedCount ||
          matchesFolded2 ||
          matchesComplete ||
          (onFaces2?.blocks ?? []).some(
            (block?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              block.opaque,
          )
            ? null
            : (onFaces2?.blocks ?? null);
      }
      this.lastFace = null;
      this.picRev = Math.max(this.picRev, rev);
      let dataOperationControlAsOf: Dynamic =
        matchesSinceRev && !partial
          ? resolveDataOperationControlAsOf(options2)
          : undefined;
      if (dataOperationControlAsOf !== undefined) {
        this.pictureSeq = Math.max(this.pictureSeq, dataOperationControlAsOf);
      }
      if (enabled26 && this.commentsAsk === commentsAsk) {
        this.wantComments = false;
      }
      if (this.gaveUp) {
        this.emit({
          t: `state`,
          node: this.node,
          state: (0, operationScope.state)(),
          landed: true,
        });
      }
      this.gaveUp = false;
      this.lookRev = null;
      this.joinTries = 0;
      if (
        loadDataOperationControlVerdictResult23 !== undefined &&
        loadDataOperationControlVerdictResult23 > rev
      ) {
        if (!this.commentsBarred) {
          this.wantComments = true;
          this.commentsAsk += 1;
        }
        if ((0, operationScope.honourOpsOnFeed)()) {
          this.freshen();
        } else {
          this.rung = true;
        }
      }
      if (sinceRev === undefined || rev >= this.wantRev) {
        this.unwant();
      }
      if (sinceRev === undefined || rev >= this.wantForeign) {
        this.wantForeign = -1;
      }
      let honourOpsOnFeed2: Dynamic =
        (0, operationScope.honourOpsOnFeed)() && this.gapOwed;
      let enabled29 =
        !(0, operationScope.honourOpsOnFeed)() ||
        this.gapClosedBy(rev, dataOperationControlAsOf);
      if (matchesSinceRev && !partial && under === 0 && enabled29) {
        this.groundTo(rev);
        this.behindGround = null;
        this.orderDiverged = false;
      }
      if (
        !partial &&
        recordFramePhase(`picture`, {
          blocks: onFaces2?.blocks.length ?? 0,
          ...(typeof docJson == `string`
            ? {
                bodyChars: docJson.length,
              }
            : {}),
        })
      ) {
        resolveObservabilityBootNode(
          this.node,
          resolveDataOperationControlBlocks2(onFaces2),
        );
      }
      this.emit({
        t: `snapshot`,
        node: this.node,
        rev: rev,
        blocks: onFaces2?.blocks ?? [],
        docJson: onFaces2?.docJson ?? null,
        ...(typeof docJson == `string`
          ? {
              docXml: docJson,
            }
          : {}),
        ...(Array.isArray(record4.comments)
          ? {
              comments: record4.comments,
            }
          : {}),
        ...(onFaces2?.anchors
          ? {
              anchors: onFaces2.anchors,
            }
          : partial || Array.isArray(record4.comments)
            ? {}
            : {
                anchors: [],
              }),
        ...(under > 0
          ? {
              under: under,
            }
          : {}),
        ...(partial
          ? {
              partial: partial,
            }
          : {}),
        ...(honourOpsOnFeed2 && matchesSinceRev && !partial
          ? {
              gap: true,
            }
          : {}),
        ...(staged
          ? {
              staged: staged,
            }
          : {}),
      });
      if (!partial) {
        this.handedRevs.clear();
        if (under === 0) {
          this.bornBehind.clear();
        }
      }
      if ((0, operationScope.honourOpsOnFeed)()) {
        if (enabled29 && rev >= this.roomRev) {
          this.rung = this.rungWhole = false;
        }
        this.readingWhole = false;
        if (!partial) {
          this.wholePicRev = Math.max(this.wholePicRev, rev);
        }
        this.drainTold(rev);
      } else {
        this.drainParked();
      }
      return false;
    },
  };
  return methods;
}
