/** BaoCut: operation controller node paint and words. */
import type { Dynamic } from "./types";
import type { OperationControllerScope } from "./type-models/platform-core-operation";
import {
  resolveEditorExtensionsSess,
  resolveEditorExtensionsValue22,
} from "./platform-core-editor-extensions-2";
import {
  resolveDataModelSchemasCharCodeAt2,
  resolveDataModelSchemasCharCodeAt4,
} from "./platform-core-data-model-schemas-4";
import { reportOperationEvent } from "./platform-core-observability-boot";
import {
  DataOperationControlMessage11,
  DataOperationControlMessage12,
  dataOperationControlValue6000,
} from "./platform-core-data-operation-control-2";
import {
  isPlainRecord,
  resolveDataOperationControlBid,
  resolveDataOperationControlFlatMap2,
  resolveDataOperationControlValue30,
} from "./platform-core-data-operation-control-4";
export function createOperationNodePaintAndWords(
  operationScope: Pick<
    OperationControllerScope,
    | "honourOpsOnFeed"
    | "emit7"
    | "reconcile"
    | "dataOperationControlVerdict"
    | "onFaces"
    | "enabled"
  >,
): Record<string, Dynamic> {
  const methods: Record<string, Dynamic> & ThisType<Dynamic> = {
    painted(response?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      if (
        this.orphanLatched &&
        !this.dead &&
        response?.order !== true &&
        response?.ok !== true &&
        typeof response?.block == `string`
      ) {
        this.holed.delete(response.block);
        this.declinedHoles.delete(response.block);
        this.redelivered.delete(response.block);
        this.uncoolBlock(response.block);
        reportOperationEvent(`block.declined.orphan`, {
          block: response.block,
          rev: typeof response.rev == `number` ? response.rev : -1,
          held: response.held === true,
        });
        return;
      }
      if (response?.held) {
        if (
          typeof response.block == `string` &&
          !this.dead &&
          !(0, operationScope.honourOpsOnFeed)()
        ) {
          this.holed.add(response.block);
        }
        return;
      }
      if (
        !(
          (response?.block !== null && typeof response?.block != `string`) ||
          typeof response.rev != `number` ||
          this.dead
        )
      ) {
        if (response.order) {
          if (response.ok) {
            this.orderDiverged = false;
            this.orderRecadence(Math.min(this.orderCalm + 1, 3));
            return;
          }
          if (
            response.rev !== this.groundRev ||
            this.roomRev !== this.groundRev
          )
            return;
          this.orderRecadence(0);
          this.orderMismatches += 1;
          this.orderDiverged = true;
          reportOperationEvent(`heal.order`, {
            probed: this.orderAsked,
            mismatch: this.orderMismatches,
            rev: response.rev,
          });
          console.warn(
            `opTransport: heal.order — the door's block order is not this screen's at the same rev (probe ${this.orderAsked}, mismatch ${this.orderMismatches}; rev ${response.rev}) — the stall healer takes it`,
          );
          this.healStalled(
            `the door's block order diverged from the screen at the same rev`,
          );
          return;
        }
        if (response.compare && response.block !== null) {
          let items3: Dynamic = [
            response.block,
            ...(this.comparing.get(response.block) ?? []),
          ];
          this.comparing.delete(response.block);
          for (let loadDataOperationControlVerdictResult22 of items3 as Dynamic)
            if (response.ok) {
              this.holed.delete(loadDataOperationControlVerdictResult22);
              this.declinedHoles.delete(
                loadDataOperationControlVerdictResult22,
              );
              this.uncoolBlock(loadDataOperationControlVerdictResult22);
            } else {
              this.holed.add(loadDataOperationControlVerdictResult22);
            }
          if (!response.ok) {
            this.owed = true;
          }
          return this.pump();
        }
        if (response.block === null) {
          if (response.ok && !response.row && !response.compare) {
            this.unholeAll();
          }
          return this.pump();
        }
        if (response.ok) {
          this.holed.delete(response.block);
          this.declinedHoles.delete(response.block);
          this.uncoolBlock(response.block);
          return this.pump();
        }
        if ((0, operationScope.honourOpsOnFeed)()) {
          this.wholeRead(`a print this page declined to place`, response.rev);
          (0, operationScope.emit7)();
          return this.pump();
        }
        if (
          !response.held &&
          this.redelivered.get(response.block) === response.rev &&
          this.redelivered.delete(response.block) &&
          this.pending() === 0 &&
          this.declinedHoles.has(response.block)
        ) {
          this.holed.add(response.block);
          let blockCoolEntry: Dynamic = this.blockCool.get(response.block);
          if (blockCoolEntry) {
            blockCoolEntry.stuck = true;
          } else {
            this.blockCool.set(response.block, {
              timer: null,
              ms: 250,
              again: false,
              behind: true,
              fresh: false,
              stuck: true,
            });
          }
          reportOperationEvent(`block.redelivery.stuck`, {
            block: response.block,
            rev: response.rev,
          });
          this.healArm(dataOperationControlValue6000);
          return;
        }
        this.redelivered.delete(response.block);
        this.handedRevs.delete(response.block);
        this.owed = this.oweWhole = true;
        if (this.pending() === 0 && operationScope.reconcile) {
          (0, operationScope.emit7)();
          return this.pump();
        }
        this.holed.add(response.block);
        this.declinedHoles.add(response.block);
        if (this.declinedHoles.size > 256) {
          this.declinedHoles.clear();
        }
        this.healArm(dataOperationControlValue6000);
        (0, operationScope.emit7)();
        if (this.pending() === 0) {
          this.mendHoles();
          this.pump();
        }
      }
    },
    shortInGrace(..._extraArguments: unknown[]) {
      for (let loadDataOperationControlVerdictResult22 of this.shortRevived.keys() as Dynamic)
        if (!this.shortGrace.has(loadDataOperationControlVerdictResult22))
          return false;
      return true;
    },
    trayHolds(..._extraArguments: unknown[]) {
      return this.trayLines() > 0;
    },
    trayLines(..._extraArguments: unknown[]): Dynamic {
      return this.leftWords.filter(
        (leftWord?: Dynamic, ..._extraArguments: unknown[]) =>
          leftWord.tray === true &&
          leftWord.quiet !== true &&
          leftWord.text !== ``,
      ).length;
    },
    rekeyWords(
      dataOperationControlVerdict2?: Dynamic,
      options: Dynamic = false,
      context: Dynamic = true,
      ..._extraArguments: unknown[]
    ): undefined {
      let items3: Dynamic = [];
      let dataOperationControlVerdict3: Dynamic = (
        ask?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        if (ask.real === true) return ask;
        let bid: Dynamic = dataOperationControlVerdict2(ask.bid);
        let afterId: Dynamic =
          ask.afterId === null
            ? null
            : dataOperationControlVerdict2(ask.afterId);
        if (bid === ask.bid && afterId === ask.afterId) return ask;
        let ask2: Dynamic = {
          ...ask,
          bid: bid,
          afterId: afterId,
          ...(options
            ? {
                real: true,
              }
            : {}),
        };
        items3.push([ask, ask2]);
        return ask2;
      };
      this.leftWords = this.leftWords.map(
        (leftWord?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          !context && leftWord.moved === true
            ? leftWord
            : dataOperationControlVerdict3(leftWord),
      );
      let items4: Dynamic = [];
      if (context)
        for (let [
          loadDataOperationControlVerdictResult22,
          loadDataOperationControlVerdictResult23,
        ] of this.myWords as Dynamic) {
          let dataOperationControlVerdict4: Dynamic =
            dataOperationControlVerdict3(
              loadDataOperationControlVerdictResult23,
            );
          if (
            dataOperationControlVerdict4 !==
            loadDataOperationControlVerdictResult23
          ) {
            items4.push([
              loadDataOperationControlVerdictResult22,
              dataOperationControlVerdict4,
            ]);
          }
        }
      for (let [loadDataOperationControlVerdictResult22] of items4 as Dynamic)
        this.myWords.delete(loadDataOperationControlVerdictResult22);
      for (let [, ask] of items4 as Dynamic)
        this.myWords.set(
          resolveDataOperationControlValue30(ask.bid, ask.afterId ?? null),
          ask,
        );
      for (let [
        ask,
        loadDataOperationControlVerdictResult22,
      ] of items3 as Dynamic)
        try {
          operationScope.dataOperationControlVerdict.wal.stageWords?.(
            this.node,
            {
              bid: ask.bid,
              afterId: ask.afterId ?? null,
              text: ``,
              only: true,
            },
          );
          let leftWord: Dynamic =
            this.leftWords.find(
              (ask2?: Dynamic, ..._extraArguments: unknown[]) =>
                ask2.bid === ask.bid &&
                (ask2.afterId ?? null) === (ask.afterId ?? null),
            ) ??
            this.myWords.get(
              resolveDataOperationControlValue30(ask.bid, ask.afterId ?? null),
            );
          if (leftWord) {
            this.stagePut(leftWord);
          }
          this.stagePut(loadDataOperationControlVerdictResult22);
        } catch {}
    },
    dedupeWords(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      dependencies?: Dynamic,
      items3?: Dynamic,
      argument: Dynamic = (
        dataOperationControlVerdict3?: Dynamic,
        ..._extraArguments: unknown[]
      ) => dataOperationControlVerdict3.moved !== true,
      ..._extraArguments: unknown[]
    ): undefined {
      let items4: Dynamic = [];
      dataOperationControlVerdict2.forEach(
        (
          event?: Dynamic,
          index5?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          let target: Dynamic = event.target;
          let side: Dynamic = event.side;
          let loadDataOperationControlVerdictHandler30: Dynamic = (
            dataOperationControlVerdict3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            dependencies.get(dataOperationControlVerdict3) ??
            dataOperationControlVerdict3;
          if (
            event.op === `split` &&
            isPlainRecord(target) &&
            target.kind === `chars` &&
            Array.isArray(target.range) &&
            side === `after`
          ) {
            let dataOperationControlVerdictHandler: Dynamic =
              loadDataOperationControlVerdictHandler30(String(target.range[0]));
            let bid: Dynamic =
              resolveDataOperationControlFlatMap2(options[index5]?.minted)[0] ??
              (typeof event.id == `string`
                ? loadDataOperationControlVerdictHandler30(event.id)
                : context[index5]?.[0] === undefined
                  ? undefined
                  : loadDataOperationControlVerdictHandler30(
                      context[index5][0],
                    ));
            this.leftWords = this.leftWords.flatMap(
              (ask?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
                if (
                  !argument(ask) ||
                  (ask.afterId ?? null) !==
                    dataOperationControlVerdictHandler ||
                  !ask.text.startsWith(DataOperationControlMessage11) ||
                  (items3 && items3.length > 0 && !items3.includes(ask.bid))
                )
                  return [ask];
                let text: Dynamic = ask.text.slice(1);
                let record4: Dynamic =
                  text === ``
                    ? null
                    : bid === undefined
                      ? {
                          ...ask,
                          text: text,
                        }
                      : {
                          ...ask,
                          bid: bid,
                          afterId: null,
                          text: text,
                          real: true,
                        };
                items4.push([ask, record4]);
                return record4 ? [record4] : [];
              },
            );
            return;
          }
          if (
            event.op === `join` &&
            isPlainRecord(target) &&
            target.kind === `blocks` &&
            Array.isArray(target.ids) &&
            target.ids.length >= 2
          ) {
            let [bid, setBid]: Dynamic = [
              loadDataOperationControlVerdictHandler30(String(target.ids[0])),
              loadDataOperationControlVerdictHandler30(
                String(target.ids[target.ids.length - 1]),
              ),
            ];
            let dataOperationControlVerdictSlice: Dynamic =
              dataOperationControlVerdict2
                .slice(index5 + 1)
                .find(
                  (event2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                    event2.op === `insert` &&
                    isPlainRecord(event2.target) &&
                    event2.target.kind === `chars` &&
                    event2.side === `after` &&
                    isPlainRecord(event2.source) &&
                    isPlainRecord(event2.source.from),
                );
            let content2: Dynamic =
              dataOperationControlVerdictSlice &&
              isPlainRecord(dataOperationControlVerdictSlice.source) &&
              isPlainRecord(dataOperationControlVerdictSlice.source.from)
                ? dataOperationControlVerdictSlice.source.from.content
                : undefined;
            let afterId2: Dynamic =
              dataOperationControlVerdictSlice &&
              Array.isArray(dataOperationControlVerdictSlice.target.range)
                ? loadDataOperationControlVerdictHandler30(
                    String(dataOperationControlVerdictSlice.target.range[0]),
                  )
                : null;
            this.leftWords = this.leftWords.flatMap(
              (ask?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
                if (
                  !argument(ask) ||
                  ask.bid !== setBid ||
                  (ask.afterId ?? null) !== null ||
                  !ask.text.startsWith(DataOperationControlMessage12)
                )
                  return [ask];
                let text: Dynamic = ask.text.slice(1);
                let matchesText: Dynamic =
                  text !== `` &&
                  afterId2 !== null &&
                  typeof content2 == `string` &&
                  content2 !== `` &&
                  (text.startsWith(content2) || content2.startsWith(text));
                let ask2: Dynamic =
                  text === ``
                    ? null
                    : matchesText
                      ? {
                          ...ask,
                          bid: bid,
                          afterId: afterId2,
                          text: text,
                          real: true,
                        }
                      : {
                          ...ask,
                          text: text,
                        };
                items4.push([ask, ask2]);
                return ask2 ? [ask2] : [];
              },
            );
            return;
          }
          let from: Dynamic = isPlainRecord(event.source)
            ? event.source.from
            : undefined;
          let content: Dynamic =
            isPlainRecord(from) &&
            from.kind === `inline` &&
            typeof from.content == `string`
              ? from.content
              : null;
          if (
            event.op !== `insert` ||
            !isPlainRecord(target) ||
            content === null ||
            content === ``
          )
            return;
          let loadDataOperationControlVerdictResult22: Dynamic;
          let loadDataOperationControlVerdictResult23: Dynamic;
          if (
            target.kind === `chars` &&
            Array.isArray(target.range) &&
            side === `after`
          )
            loadDataOperationControlVerdictResult22 = String(target.range[0]);
          else if (
            target.kind === `chars` &&
            Array.isArray(target.range) &&
            side === `before` &&
            items3?.length === 1
          )
            [
              loadDataOperationControlVerdictResult22,
              loadDataOperationControlVerdictResult23,
            ] = [null, items3[0]];
          else if (
            target.kind === `blocks` &&
            Array.isArray(target.ids) &&
            side === `start`
          )
            [
              loadDataOperationControlVerdictResult22,
              loadDataOperationControlVerdictResult23,
            ] = [null, String(target.ids[0])];
          else return;
          if (typeof loadDataOperationControlVerdictResult22 == `string`) {
            loadDataOperationControlVerdictResult22 =
              dependencies.get(loadDataOperationControlVerdictResult22) ??
              loadDataOperationControlVerdictResult22;
          }
          if (loadDataOperationControlVerdictResult23 !== undefined) {
            loadDataOperationControlVerdictResult23 =
              dependencies.get(loadDataOperationControlVerdictResult23) ??
              loadDataOperationControlVerdictResult23;
          }
          let dataOperationControlFlatMap2: Dynamic =
            resolveDataOperationControlFlatMap2(options[index5]?.minted);
          let matchesDataOperationControlFlatMap2Count =
            dataOperationControlFlatMap2.length === [...content].length ||
            dataOperationControlFlatMap2.length === content.length;
          let afterId: Dynamic = matchesDataOperationControlFlatMap2Count
            ? dataOperationControlFlatMap2[
                dataOperationControlFlatMap2.length - 1
              ]
            : context[index5]?.length
              ? ((
                  dataOperationControlVerdict3?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  dependencies.get(dataOperationControlVerdict3) ??
                  dataOperationControlVerdict3)(
                  context[index5][context[index5].length - 1],
                )
              : undefined;
          this.leftWords = this.leftWords.flatMap(
            (ask?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
              if (!argument(ask)) return [ask];
              let matchesAfterId: Dynamic =
                (ask.afterId ?? null) ===
                  loadDataOperationControlVerdictResult22 &&
                (loadDataOperationControlVerdictResult23 === undefined ||
                  ask.bid === loadDataOperationControlVerdictResult23) &&
                (!items3 || items3.length === 0 || items3.includes(ask.bid));
              let contentCount: Dynamic = ask.text.startsWith(content)
                ? content.length
                : resolveDataModelSchemasCharCodeAt4(ask.text, content);
              if (
                !matchesAfterId ||
                contentCount < 0 ||
                resolveDataModelSchemasCharCodeAt2(ask.text, contentCount)
              )
                return [ask];
              let text: Dynamic = ask.text.slice(contentCount);
              if (text !== `` && afterId === undefined) return [ask];
              let record4: Dynamic =
                text === ``
                  ? null
                  : {
                      ...ask,
                      afterId: afterId,
                      text: text,
                      ...(matchesDataOperationControlFlatMap2Count
                        ? {
                            real: true,
                          }
                        : {}),
                    };
              items4.push([ask, record4]);
              return record4 ? [record4] : [];
            },
          );
        },
      );
      for (let [
        ask,
        loadDataOperationControlVerdictResult22,
      ] of items4 as Dynamic)
        try {
          operationScope.dataOperationControlVerdict.wal.stageWords?.(
            this.node,
            {
              bid: ask.bid,
              afterId: ask.afterId,
              text: ``,
              only: true,
            },
          );
          let myWordEntry: Dynamic = this.myWords.get(
            resolveDataOperationControlValue30(ask.bid, ask.afterId ?? null),
          );
          if (myWordEntry) {
            this.stagePut(myWordEntry);
          }
          if (loadDataOperationControlVerdictResult22) {
            this.stagePut(loadDataOperationControlVerdictResult22);
          }
        } catch {}
    },
    async idsNow(
      dataOperationControlVerdict2: Dynamic = false,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> {
      let lastBlocks: Dynamic = dataOperationControlVerdict2
        ? null
        : this.lastBlocks;
      if (!lastBlocks) {
        let door: Dynamic = await this.door({
          verb: `read`,
          payload: {
            kind: `view`,
          },
        });
        let data: Dynamic = door && isPlainRecord(door.data) ? door.data : {};
        let onFaces2: Dynamic =
          door?.verdict === `allow` && typeof data.doc == `string`
            ? (0, operationScope.onFaces)(data.doc)
            : null;
        let enabled26: Dynamic =
          !!onFaces2 &&
          ((onFaces2.capped?.length ?? 0) > 0 ||
            (onFaces2.folded ?? 0) > 0 ||
            onFaces2.complete === false ||
            data.complete === false ||
            data.complete === 0 ||
            onFaces2.blocks.some(
              (block?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                block.opaque,
            ));
        lastBlocks = onFaces2 && !enabled26 ? onFaces2.blocks : null;
      }
      if (!lastBlocks) return null;
      let lookup3: Dynamic = new (Map as Dynamic)();
      for (let ask of lastBlocks as Dynamic)
        if (!ask.opaque)
          for (let loadDataOperationControlVerdictResult22 of ask.runs as Dynamic) {
            let editorExtensionsSess: Dynamic = resolveEditorExtensionsSess(
              loadDataOperationControlVerdictResult22.id,
            );
            if (!editorExtensionsSess)
              lookup3.set(loadDataOperationControlVerdictResult22.id, ask.bid);
            else
              for (
                let index5 = 0;
                index5 < loadDataOperationControlVerdictResult22.len;
                index5++
              )
                lookup3.set(
                  resolveEditorExtensionsValue22(
                    editorExtensionsSess.sess,
                    editorExtensionsSess.i + index5,
                  ),
                  ask.bid,
                );
          }
      return lookup3;
    },
    async heldSplitStands(
      event?: Dynamic,
      parentId?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      let target: Dynamic = isPlainRecord(event.target) ? event.target : {};
      let rangeItem =
        target.kind === `chars` &&
        Array.isArray(target.range) &&
        typeof target.range[0] == `string` &&
        target.range[0] === target.range[1]
          ? target.range[0]
          : null;
      if (rangeItem === null) return null;
      let matchesSide = event.side === `before`;
      let door: Dynamic = await this.door({
        verb: `read`,
        payload: matchesSide
          ? {
              kind: `view`,
              parentId: parentId,
            }
          : {
              kind: `view`,
            },
      });
      if (!door) return null;
      let data: Dynamic = isPlainRecord(door.data) ? door.data : {};
      if (door.verdict === `deny`) {
        let label5 = `${String(door.reason)} ${String(data.code)}`;
        return matchesSide &&
          /\b(unknown_block|unknown_id|block_gone|gone|not_found|absent)\b/.test(
            label5,
          )
          ? {
              how: `elsewhere`,
            }
          : null;
      }
      if (door.verdict !== `allow` || typeof data.doc != `string`) return null;
      let loadDataOperationControlVerdictResult22: Dynamic = null;
      try {
        loadDataOperationControlVerdictResult22 = (0, operationScope.onFaces)(
          data.doc,
        );
      } catch {
        loadDataOperationControlVerdictResult22 = null;
      }
      if (!loadDataOperationControlVerdictResult22) return null;
      let rev = [
        door.rev,
        data.rev,
        loadDataOperationControlVerdictResult22.rev,
      ].find(
        (item?: unknown, ..._extraArguments: unknown[]) =>
          typeof item == `number`,
      );
      let blocks: Dynamic = loadDataOperationControlVerdictResult22.blocks;
      let blockIndex: Dynamic = blocks.findIndex(
        (ask?: Dynamic, ..._extraArguments: unknown[]) => ask.bid === parentId,
      );
      let matchesCappedCount =
        (loadDataOperationControlVerdictResult22.capped?.length ?? 0) > 0 ||
        (loadDataOperationControlVerdictResult22.folded ?? 0) > 0 ||
        loadDataOperationControlVerdictResult22.complete === false ||
        data.complete === false ||
        data.complete === 0;
      if (!matchesSide && matchesCappedCount) return null;
      if (blockIndex < 0)
        return {
          how: `elsewhere`,
          rev: rev,
        };
      let blockItem: Dynamic = blocks[blockIndex];
      if (blockItem.opaque) return null;
      if (matchesSide)
        return {
          how: blockItem.runs[0]?.id === rangeItem ? `stands` : `elsewhere`,
          rev: rev,
        };
      let blockItem2: Dynamic =
        blockIndex > 0 ? blocks[blockIndex - 1] : undefined;
      if (blockItem2?.opaque) return null;
      let runItem: Dynamic = blockItem2?.runs[blockItem2.runs.length - 1];
      let editorExtensionsSess: Dynamic = runItem
        ? resolveEditorExtensionsSess(runItem.id)
        : null;
      return {
        how:
          (runItem === undefined
            ? undefined
            : editorExtensionsSess
              ? resolveEditorExtensionsValue22(
                  editorExtensionsSess.sess,
                  editorExtensionsSess.i + runItem.len - 1,
                )
              : runItem.id) === rangeItem
            ? `stands`
            : `elsewhere`,
        rev: rev,
      };
    },
    unanswered(..._extraArguments: unknown[]) {
      return this.pending() > 0 || this.handed.length > 0;
    },
    handOwedWords(..._extraArguments: unknown[]): undefined {
      if (
        !(this.wordsOwed || this.remountOwed) ||
        !this.served ||
        operationScope.enabled ||
        this.dead ||
        (this.wordsOwed &&
          ([this.inflight, ...this.queue].some(
            (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              item?.replayed,
          ) ||
            this.wordsBehind.size > 0)) ||
        (this.remountOwed && (this.unanswered() || this.mountWait !== null)) ||
        (this.remountOwed && this.mountReadonly)
      )
        return;
      this.wordsOwed = false;
      this.remountOwed = false;
      let staged: Dynamic = this.leftWords
        .filter(
          (leftWord?: Dynamic, ..._extraArguments: unknown[]) =>
            !leftWord.parked,
        )
        .map(resolveDataOperationControlBid);
      this.leftWords = this.leftWords.map(
        (leftWord?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          leftWord.parked
            ? leftWord
            : {
                ...leftWord,
                parked: true,
              },
      );
      if (staged.length > 0) {
        this.emit({
          t: `staged`,
          node: this.node,
          staged: staged,
        });
      }
    },
    sinceHalted(
      this: Dynamic,
      dataOperationControlVerdict2: Dynamic = this.since(),
      ..._extraArguments: unknown[]
    ) {
      return (
        this.sinceHaltedAt !== null &&
        dataOperationControlVerdict2 !== undefined &&
        dataOperationControlVerdict2 <= this.sinceHaltedAt
      );
    },
  };
  return methods;
}
