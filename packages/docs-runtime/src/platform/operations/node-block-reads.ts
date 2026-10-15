/** BaoCut: operation controller node block reads. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import type { OperationControllerScope } from "./controller-contracts";
import { filterEditorExtensionsFilter } from "../../prose-editor/platform/extensions-3";
import { reportOperationEvent } from "../observability/boot";
import {
  dataOperationControlValue100004,
  dataOperationControlValue10004,
  dataOperationControlValue20002,
  dataOperationControlValue20003,
  dataOperationControlValue40002,
  dataOperationControlValue80000,
} from "../data/operation-control-2";
import {
  filterDataOperationControlContent,
  isPlainRecord,
  resolveDataOperationControlUnavailable,
} from "../data/operation-control-4";
export function createOperationNodeBlockReads(
  operationScope: Pick<
    OperationControllerScope,
    "enabled" | "dataOperationControlVerdict" | "onFaces"
  >,
): Record<string, Dynamic> {
  const methods: Record<string, Dynamic> & ThisType<Dynamic> = {
    readBlock(
      block?: Dynamic,
      behind: Dynamic = false,
      first: Dynamic = false,
      dependencies: Dynamic = false,
      pen: Dynamic = false,
      ..._extraArguments: unknown[]
    ): undefined {
      if (operationScope.enabled || this.dead || !block) return;
      let blockCoolEntry: Dynamic = this.blockCool.get(block);
      if (blockCoolEntry?.stuck && !first && !dependencies)
        return void reportOperationEvent(`block.read.stuck`, {
          block: block,
        });
      if (
        this.blockReads.has(block) ||
        (blockCoolEntry && blockCoolEntry.timer !== null && !first)
      ) {
        let fresh: Dynamic = dependencies || first;
        if (pen) {
          this.penBlocks.add(block);
        }
        if (blockCoolEntry) {
          blockCoolEntry.again = true;
          blockCoolEntry.behind ||= behind;
          blockCoolEntry.fresh ||= fresh;
          blockCoolEntry.pen ||= pen;
        } else {
          this.blockCool.set(block, {
            timer: null,
            ms: 250,
            again: true,
            behind: behind,
            fresh: fresh,
            pen: pen,
          });
        }
        reportOperationEvent(`block.read.coalesced`, {
          block: block,
          out: this.blockReads.has(block),
          first: first,
          fresh: fresh,
        });
        return;
      }
      let blockQueueEntry: Dynamic =
        (this.blockQueue.get(block) ?? false) || behind;
      if (pen) {
        this.penBlocks.add(block);
      }
      if (pen || (first && !this.blockQueue.has(block))) {
        this.queueAhead(block, blockQueueEntry);
      } else {
        this.blockQueue.set(block, blockQueueEntry);
      }
      this.drainBlockReads();
    },
    penUnmark(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        !this.blockQueue.has(dataOperationControlVerdict2) &&
        !this.blockReads.has(dataOperationControlVerdict2)
      ) {
        this.penBlocks.delete(dataOperationControlVerdict2);
      }
    },
    queueAhead(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let filteredItems: Dynamic = [...this.blockQueue].filter(
        ([item]: Dynamic, ..._extraArguments: unknown[]) =>
          item !== dataOperationControlVerdict2,
      );
      let count10: Dynamic = this.penBlocks.has(dataOperationControlVerdict2)
        ? 0
        : filteredItems.findIndex(
            ([filteredItem]: Dynamic, ..._extraArguments: unknown[]) =>
              !this.penBlocks.has(filteredItem),
          );
      filteredItems.splice(count10 < 0 ? filteredItems.length : count10, 0, [
        dataOperationControlVerdict2,
        options,
      ]);
      this.blockQueue = new (Map as Dynamic)(filteredItems);
    },
    drainBlockReads(
      dataOperationControlVerdict2: Dynamic = false,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        !(operationScope.enabled || this.dead || this.blockTimer !== null) &&
        !this.shedStands()
      )
        for (let [
          loadDataOperationControlVerdictResult22,
          loadDataOperationControlVerdictResult23,
        ] of this.blockQueue as Dynamic) {
          if (
            (dataOperationControlVerdict2 &&
              !this.penBlocks.has(loadDataOperationControlVerdictResult22)) ||
            this.blockReads.size >= 4 ||
            (this.paceLeft !== null && this.paceLeft <= 0)
          )
            break;
          this.blockQueue.delete(loadDataOperationControlVerdictResult22);
          this.readBlockNow(
            loadDataOperationControlVerdictResult22,
            loadDataOperationControlVerdictResult23,
          );
        }
    },
    stood(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let count10: number =
        options === undefined ||
        operationScope.dataOperationControlVerdict.now === undefined
          ? 0
          : operationScope.dataOperationControlVerdict.now() - options;
      return count10 > dataOperationControlVerdict2
        ? count10
        : dataOperationControlVerdict2;
    },
    paceSlower(..._extraArguments: unknown[]): undefined {
      this.paceRefillMs = Math.min(
        dataOperationControlValue40002,
        this.paceRefillMs * 2,
      );
      this.paceCalmMs = Math.min(
        dataOperationControlValue80000,
        this.paceCalmMs * 2,
      );
      reportOperationEvent(`read.pace.slower`, {
        refill: this.paceRefillMs,
        calm: this.paceCalmMs,
      });
      this.paceUpArm();
    },
    paceUpArm(..._extraArguments: unknown[]): undefined {
      if (this.paceUpTimer !== null) {
        operationScope.dataOperationControlVerdict.timers.clearTimeout(
          this.paceUpTimer,
        );
      }
      this.paceUpTimer = null;
      if (!(this.paceRefillMs <= 500 && this.paceCalmMs <= 1e4)) {
        this.paceUpTimer =
          operationScope.dataOperationControlVerdict.timers.setTimeout(
            (..._extraArguments: unknown[]): undefined => {
              this.paceUpTimer = null;
              if (
                !(operationScope.enabled || this.dead || this.paceLeft === null)
              ) {
                if (this.paceRefillMs > 500) {
                  this.paceRefillMs = Math.max(500, this.paceRefillMs / 2);
                } else {
                  this.paceCalmMs = Math.max(
                    dataOperationControlValue100004,
                    this.paceCalmMs / 2,
                  );
                }
                reportOperationEvent(`read.pace.up`, {
                  refill: this.paceRefillMs,
                  calm: this.paceCalmMs,
                });
                this.paceUpArm();
              }
            },
            this.paceCalmMs,
          );
      }
    },
    paceGrant(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let grant = Math.floor(dataOperationControlVerdict2 / this.paceRefillMs);
      let value: Dynamic = this.blockQueue.keys().next().value;
      this.paceLeft = Math.min(grant, (this.paceLeft ?? 0) + grant);
      if (
        this.paceLeft < 1 &&
        value !== undefined &&
        this.penBlocks.has(value)
      ) {
        this.paceLeft = 1;
      }
      this.paceSpent = false;
      reportOperationEvent(`read.pace`, {
        ms: dataOperationControlVerdict2,
        refill: this.paceRefillMs,
        grant: grant,
        left: this.paceLeft,
        queued: this.blockQueue.size,
      });
      this.paceTick();
    },
    paceTick(..._extraArguments: unknown[]): undefined {
      if (this.paceTimer !== null) {
        operationScope.dataOperationControlVerdict.timers.clearTimeout(
          this.paceTimer,
        );
      }
      let now2: Dynamic = operationScope.dataOperationControlVerdict.now?.();
      let max = Math.max(dataOperationControlValue10004, this.paceRefillMs);
      this.paceTimer =
        operationScope.dataOperationControlVerdict.timers.setTimeout(
          (..._extraArguments: unknown[]): undefined => {
            this.paceTimer = null;
            if (!(operationScope.enabled || this.dead)) {
              if (this.shedStands()) return void this.paceTick();
              if (!this.paceSpent && this.blockQueue.size === 0)
                return void this.paceOff();
              this.paceGrant(this.stood(max, now2));
              this.drainBlockReads();
            }
          },
          max,
        );
    },
    paceOff(..._extraArguments: unknown[]): undefined {
      for (let loadDataOperationControlVerdictResult22 of [
        this.paceTimer,
        this.paceUpTimer,
      ] as Dynamic)
        if (loadDataOperationControlVerdictResult22 !== null) {
          operationScope.dataOperationControlVerdict.timers.clearTimeout(
            loadDataOperationControlVerdictResult22,
          );
        }
      this.paceTimer = this.paceUpTimer = null;
      if (this.paceLeft !== null) {
        reportOperationEvent(`read.pace.over`, {});
      }
      this.paceLeft = null;
      this.paceSpent = false;
      this.paceRefillMs = 500;
      this.paceCalmMs = dataOperationControlValue100004;
    },
    throttledMs(response?: Dynamic, ..._extraArguments: unknown[]) {
      if (response.verdict === `allow`) return null;
      let data: Dynamic = isPlainRecord(response.data) ? response.data : {};
      let number2 = Number(data.retryAfterMs ?? response.retryAfterMs);
      let number3 = Number.isFinite(number2) && number2 > 0 ? number2 : 0;
      let label5 = `${String(response.reason)} ${String(data.code)} ${String(data.why)}`;
      return /rate[-_ ]?limit|too[-_ ]?many[-_ ]?requests|throttl/i.test(
        label5,
      ) ||
        (number3 > 0 && /unavailable|busy/i.test(label5))
        ? number3
        : null;
    },
    async readBlockNow(
      parentId?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<undefined> {
      this.blockReads.add(parentId);
      let door: Dynamic = await this.door({
        verb: `read`,
        payload: {
          kind: `view`,
          parentId: parentId,
        },
      });
      this.blockReads.delete(parentId);
      if (!door) return;
      let throttledMs = this.throttledMs(door);
      if (throttledMs !== null) {
        this.queueAhead(
          parentId,
          (this.blockQueue.get(parentId) ?? false) || options,
        );
        if (resolveDataOperationControlUnavailable(door) !== null)
          return void (this.shedStands() || this.drainBlockReads());
        if (this.blockTimer === null) {
          this.blockWaitMs =
            throttledMs > 0
              ? throttledMs
              : this.blockWaitMs > 0
                ? Math.min(dataOperationControlValue20003, this.blockWaitMs * 2)
                : 250;
          this.blockTimer =
            operationScope.dataOperationControlVerdict.timers.setTimeout(
              (..._extraArguments: unknown[]): undefined => {
                this.blockTimer = null;
                this.drainBlockReads();
              },
              this.blockWaitMs,
            );
        }
        return;
      }
      this.blockWaitMs = 0;
      if (this.blockCool.get(parentId)?.pen !== true) {
        this.penBlocks.delete(parentId);
      }
      try {
        this.landBlock(parentId, options, door);
      } finally {
        this.coolBlock(parentId, options);
        this.drainBlockReads();
      }
    },
    coolBlock(
      block?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (operationScope.enabled || this.dead) return;
      let blockCoolEntry: Dynamic = this.blockCool.get(block) ?? {
        timer: null,
        ms: 250,
        again: false,
        behind: false,
        fresh: false,
      };
      if (blockCoolEntry.timer !== null) {
        operationScope.dataOperationControlVerdict.timers.clearTimeout(
          blockCoolEntry.timer,
        );
      }
      blockCoolEntry.behind ||= options;
      blockCoolEntry.fresh &&= blockCoolEntry.again;
      let wait2: Dynamic = blockCoolEntry.ms;
      blockCoolEntry.ms = Math.min(
        dataOperationControlValue20002,
        blockCoolEntry.ms * 2,
      );
      this.blockCool.set(block, blockCoolEntry);
      if (this.blockCool.size > 512) {
        (this.dropCool as Dynamic)(...this.blockCool.entries().next().value);
      }
      blockCoolEntry.timer =
        operationScope.dataOperationControlVerdict.timers.setTimeout(
          (..._extraArguments: unknown[]) => {
            blockCoolEntry.timer = null;
            if (
              operationScope.enabled ||
              this.dead ||
              this.blockCool.get(block) !== blockCoolEntry
            )
              return;
            let wanted: Dynamic =
              blockCoolEntry.again &&
              (blockCoolEntry.fresh ||
                (!blockCoolEntry.stuck &&
                  (this.holed.has(block) || blockCoolEntry.behind)));
            reportOperationEvent(`block.read.cooled`, {
              block: block,
              wait: wait2,
              again: blockCoolEntry.again,
              wanted: wanted,
              stuck: blockCoolEntry.stuck === true,
            });
            let matchesPen = blockCoolEntry.pen === true;
            blockCoolEntry.pen = false;
            if (!wanted) {
              if (matchesPen) {
                this.penUnmark(block);
              }
              blockCoolEntry.again = blockCoolEntry.fresh = false;
              if (!this.holed.has(block)) {
                this.blockCool.delete(block);
              }
              return this.groundBehind();
            }
            blockCoolEntry.again = blockCoolEntry.stuck = false;
            this.readBlock(
              block,
              blockCoolEntry.behind,
              false,
              false,
              matchesPen,
            );
          },
          wait2,
        );
    },
    dropCool(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (options.timer !== null) {
        operationScope.dataOperationControlVerdict.timers.clearTimeout(
          options.timer,
        );
      }
      this.blockCool.delete(dataOperationControlVerdict2);
      if (
        options.again &&
        options.fresh &&
        !operationScope.enabled &&
        !this.dead
      ) {
        if (options.pen) {
          this.queueAhead(
            dataOperationControlVerdict2,
            (this.blockQueue.get(dataOperationControlVerdict2) ?? false) ||
              options.behind,
          );
        } else {
          this.blockQueue.set(
            dataOperationControlVerdict2,
            (this.blockQueue.get(dataOperationControlVerdict2) ?? false) ||
              options.behind,
          );
        }
        this.drainBlockReads();
      } else {
        if (options.pen) {
          this.penUnmark(dataOperationControlVerdict2);
        }
      }
    },
    coolOwed(..._extraArguments: unknown[]) {
      for (let loadDataOperationControlVerdictResult22 of this.blockCool.values() as Dynamic)
        if (loadDataOperationControlVerdictResult22.again) return true;
      return false;
    },
    groundBehind(..._extraArguments: unknown[]): undefined {
      if (
        !(
          this.behindGround === null ||
          operationScope.enabled ||
          this.dead ||
          this.blockReads.size > 0 ||
          this.blockQueue.size > 0 ||
          this.coolOwed() ||
          this.pending() > 0
        )
      ) {
        this.groundTo(this.behindGround.rev);
        this.behindGround = null;
      }
    },
    uncoolBlock(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (!this.declinedHoles.has(dataOperationControlVerdict2)) {
        this.behindPlace.delete(dataOperationControlVerdict2);
      }
      this.redelivered.delete(dataOperationControlVerdict2);
      let blockCoolEntry: Dynamic = this.blockCool.get(
        dataOperationControlVerdict2,
      );
      if (blockCoolEntry) {
        this.dropCool(dataOperationControlVerdict2, blockCoolEntry);
      }
    },
    unholeAll(..._extraArguments: unknown[]): undefined {
      this.holed.clear();
      this.declinedHoles.clear();
      this.behindPlace.clear();
      this.redelivered.clear();
      for (let [
        loadDataOperationControlVerdictResult22,
        loadDataOperationControlVerdictResult23,
      ] of this.blockCool as Dynamic)
        this.dropCool(
          loadDataOperationControlVerdictResult22,
          loadDataOperationControlVerdictResult23,
        );
    },
    landBlock(
      block?: Dynamic,
      options?: Dynamic,
      response?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let behindPlaceEntry: Dynamic = options
        ? this.behindPlace.get(block)
        : undefined;
      if (!this.declinedHoles.has(block)) {
        this.behindPlace.delete(block);
      }
      if (this.behindPlace.size > 256) {
        for (let loadDataOperationControlVerdictResult22 of this.behindPlace.keys() as Dynamic)
          if (
            !this.declinedHoles.has(loadDataOperationControlVerdictResult22)
          ) {
            this.behindPlace.delete(loadDataOperationControlVerdictResult22);
          }
        if (this.behindPlace.size > 256) {
          this.behindPlace.clear();
        }
      }
      let data: Dynamic = isPlainRecord(response.data) ? response.data : {};
      let onFaces2: Dynamic =
        response.verdict === `allow` && typeof data.doc == `string`
          ? (0, operationScope.onFaces)(data.doc)
          : null;
      let docJson: Dynamic = onFaces2
        ? filterDataOperationControlContent(onFaces2.docJson, block)
        : null;
      let rev =
        [response.rev, data.rev, onFaces2?.rev].find(
          (item?: unknown, ..._extraArguments: unknown[]) =>
            typeof item == `number`,
        ) ?? -1;
      if (!onFaces2 || !docJson || rev < 0)
        return void (
          this.noWhole(`block ${block} unreadable`) || this.read(undefined)
        );
      if ((onFaces2.capped?.length ?? 0) > 0) {
        this.holed.delete(block);
        this.declinedHoles.delete(block);
        this.behindPlace.delete(block);
        if (!this.noWhole(`block ${block} capped`)) {
          this.read(undefined);
        }
        return;
      }
      let helloBImport2: Dynamic = (
        node?: Dynamic,
        options2?: Dynamic,
        context?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let id: Dynamic =
          typeof node.attrs.id == `string` &&
          ![`gap`, `gone`, `hit`, `hits`].includes(node.name)
            ? node.attrs.id
            : null;
        if (id === options2) return context;
        for (let loadDataOperationControlVerdictResult22 of node.children as Dynamic) {
          if (typeof loadDataOperationControlVerdictResult22 == `string`)
            continue;
          let helloBImport3: Dynamic = helloBImport2(
            loadDataOperationControlVerdictResult22,
            options2,
            id ?? context,
          );
          if (helloBImport3 !== undefined) return helloBImport3;
        }
      };
      let parent: Dynamic;
      try {
        parent = helloBImport2(
          filterEditorExtensionsFilter(data.doc),
          block,
          null,
        );
      } catch {
        parent = undefined;
      }
      let record4: Dynamic = behindPlaceEntry
        ? {
            ...behindPlaceEntry,
            ...(parent === undefined
              ? {}
              : {
                  parent: parent,
                }),
          }
        : null;
      let under: Dynamic = this.out();
      this.emit({
        t: `snapshot`,
        node: this.node,
        rev: rev,
        partial: true,
        block: block,
        docJson: docJson,
        blocks: onFaces2.blocks,
        docXml: data.doc,
        ...(record4
          ? {
              delta: true,
              whole: false,
              blockRev: rev,
              ...record4,
            }
          : {}),
        ...(under > 0
          ? {
              under: under,
            }
          : {}),
      });
      if (record4 && under === 0 && this.declinedHoles.has(block)) {
        this.redelivered.set(block, rev);
      } else {
        this.redelivered.delete(block);
      }
      if (this.redelivered.size > 256) {
        this.redelivered.clear();
      }
      if (under === 0) {
        this.groundBehind();
      }
    },
  };
  return methods;
}
