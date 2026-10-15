/** BaoCut: operation controller node completion. */
import type { Dynamic } from "./types";
import type { OperationControllerScope } from "./type-models/platform-core-operation";
import {
  platformKeyboardAndSaveStatusValue1000000,
  resolvePlatformKeyboardAndSaveStatusText,
} from "./platform-core-platform-keyboard-and-save-status";
import { resolveDataOperationControlSess2 } from "./platform-core-data-operation-control-1";
import {
  DataOperationControlMessage15,
  resolveDataOperationControlAuthor,
} from "./platform-core-data-operation-control-2";
import {
  collectDataOperationControlContent,
  getDataOperationControlSize,
  isPlainRecord,
  resolveDataOperationControlBlocks3,
  resolveDataOperationControlFlatMap2,
  resolveDataOperationControlStartsWith,
  updateDataOperationControlBid,
} from "./platform-core-data-operation-control-4";
export function createOperationNodeCompletion(
  operationScope: Pick<
    OperationControllerScope,
    | "reconcile"
    | "dataOperationControlVerdict"
    | "emit7"
    | "honourOpsOnFeed"
    | "enabled"
    | "loadDataOperationControlVerdictHandler"
    | "kind"
    | "state"
    | "loadDataOperationControlVerdictHandler25"
    | "lookup"
    | "enabled21"
    | "enabled24"
    | "loadDataOperationControlVerdictResult17"
    | "uniqueItems6"
    | "count8"
    | "count9"
    | "rekeyHolds3"
    | "slice"
    | "rekeyHolds4"
    | "rekeyHolds"
    | "emit8"
  >,
): Record<string, Dynamic> {
  const methods: Record<string, Dynamic> & ThisType<Dynamic> = {
    held(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      let ids: Dynamic = resolveDataOperationControlBlocks3(
        dataOperationControlVerdict2.ops,
      ).filter(
        (
          dataOperationControlBlocks3?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => this.deadBids.has(dataOperationControlBlocks3),
      );
      if (ids.length === 0) return false;
      if (!operationScope.reconcile && this.served) {
        this.noWhole(`a send names ${ids.length} retired block(s)`);
        for (let loadDataOperationControlVerdictResult22 of ids as Dynamic)
          this.deadBids.delete(loadDataOperationControlVerdictResult22);
        return false;
      }
      let deletedRev: Dynamic = (Math.max as Dynamic)(
        ...ids.map(
          (id?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            this.deadBids.get(id),
        ),
      );
      return this.picRev < deletedRev && !this.halted
        ? (this.reading || this.read(undefined), true)
        : (this.handBack(dataOperationControlVerdict2, `block_gone`, {
            code: `block_gone`,
            why: `replaced`,
            block: ids[0],
            ids: ids,
            deletedRev: deletedRev,
            layer: `page`,
            words: DataOperationControlMessage15,
          }),
          false);
    },
    foldBehind(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      items3?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let filteredLeftWords: Dynamic = this.leftWords.filter(
        (ask?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          ask.bid === dataOperationControlVerdict2 &&
          !ask.tray &&
          !ask.real &&
          typeof ask.afterId == `string` &&
          items3.includes(ask.afterId),
      );
      if (filteredLeftWords.length === 0) return options;
      let matchesItemsCount = items3.length === [...options].length;
      let items4: Dynamic = [...options];
      let indexOf: Dynamic = (
        dataOperationControlVerdict3?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        (matchesItemsCount
          ? items3.indexOf(dataOperationControlVerdict3.afterId) + 1
          : items4.length) || items4.length;
      filteredLeftWords.sort(
        (
          filteredLeftWord?: Dynamic,
          filteredLeftWord2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => indexOf(filteredLeftWord) - indexOf(filteredLeftWord2),
      );
      let label5: Dynamic = ``;
      let count10 = 0;
      for (let ask of filteredLeftWords as Dynamic) {
        let itemIndex: Dynamic = indexOf(ask);
        label5 += items4.slice(count10, itemIndex).join(``) + ask.text;
        count10 = Math.max(count10, itemIndex);
        this.leftWords = this.leftWords.filter(
          (leftWord?: Dynamic, ..._extraArguments: unknown[]) =>
            leftWord !== ask,
        );
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
        } catch {}
      }
      return label5 + items4.slice(count10).join(``);
    },
    keepRescued(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      context: Dynamic = 0,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let uniqueItems7: Dynamic = new (Set as Dynamic)(
        options.predicted.slice(context).flat(),
      );
      let items3: Dynamic = [];
      let enabled26 = true;
      options.ops
        .slice(context)
        .forEach(
          (
            opsSlice?: Dynamic,
            index5?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            let opsSlice2: Dynamic = opsSlice;
            if (!(opsSlice2.op !== `insert` && opsSlice2.op !== `replace`)) {
              if (
                (isPlainRecord(opsSlice2.target) ? opsSlice2.target : null)
                  ?.kind !== `chars`
              )
                return void (enabled26 = false);
              (items3.push as Dynamic)(
                ...(options.predicted[context + index5] ?? []),
              );
            }
          },
        );
      let items4: Dynamic = [];
      dataOperationControlVerdict2.forEach(
        (
          ask?: Dynamic,
          index5?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (ask.text === ``) return;
          let folds: Dynamic = [];
          let text: Dynamic = ask.text;
          if (ask.bid !== null) {
            let filteredLeftWords: Dynamic = this.leftWords.filter(
              (ask2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                ask2.bid === ask.bid &&
                !ask2.tray &&
                !ask2.real &&
                typeof ask2.afterId == `string` &&
                uniqueItems7.has(ask2.afterId),
            );
            let enabled27 = enabled26 && items3.length === ask.text.length;
            let indexOf: Dynamic = (
              dataOperationControlVerdict3?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              (enabled27
                ? items3.indexOf(dataOperationControlVerdict3.afterId) + 1
                : items3.length) || items3.length;
            filteredLeftWords.sort(
              (
                filteredLeftWord?: Dynamic,
                filteredLeftWord2?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic =>
                indexOf(filteredLeftWord) - indexOf(filteredLeftWord2),
            );
            let label5: Dynamic = ``;
            let count10 = 0;
            for (let ask2 of filteredLeftWords as Dynamic) {
              let itemIndex: Dynamic = enabled27
                ? indexOf(ask2)
                : ask.text.length;
              label5 += ask.text.slice(count10, itemIndex) + ask2.text;
              count10 = Math.max(count10, itemIndex);
              folds.push({
                bid: ask2.bid,
                afterId: ask2.afterId ?? null,
              });
              this.leftWords = this.leftWords.filter(
                (leftWord?: Dynamic, ..._extraArguments: unknown[]) =>
                  leftWord !== ask2,
              );
              try {
                operationScope.dataOperationControlVerdict.wal.stageWords?.(
                  this.node,
                  {
                    bid: ask2.bid,
                    afterId: ask2.afterId ?? null,
                    text: ``,
                    only: true,
                  },
                );
              } catch {}
            }
            text = label5 + ask.text.slice(count10);
          }
          if (text.trim() === ``) return;
          let bid = `tray:${options.opId}:${index5}`;
          let cut2: Dynamic = this.trayOwn(
            bid,
            null,
            text,
            false,
            false,
            undefined,
            resolveDataOperationControlAuthor(options),
          );
          items4.push({
            bid: bid,
            text: text,
            afterId: null,
            staged: true,
            ...(folds.length > 0
              ? {
                  folds: folds,
                }
              : {}),
            ...(cut2
              ? {
                  cut: cut2,
                }
              : {}),
          });
        },
      );
      return items4;
    },
    trayOwn(
      bid?: Dynamic,
      afterId?: Dynamic,
      text?: Dynamic,
      dependencies: Dynamic = false,
      argument: Dynamic = false,
      argument2?: Dynamic,
      argument3: Dynamic = {},
      ..._extraArguments: unknown[]
    ): Dynamic {
      let leftWord: Dynamic = this.leftWords.find(
        (ask?: Dynamic, ..._extraArguments: unknown[]) =>
          ask.bid === bid && (ask.afterId ?? null) === afterId,
      );
      let text2: Dynamic =
        dependencies || !leftWord || text.includes(leftWord.text)
          ? text
          : leftWord.text.includes(text)
            ? leftWord.text
            : `${leftWord.text}${text}`;
      let whole: Dynamic =
        dependencies && argument2
          ? argument2.whole
          : leftWord?.cut !== undefined && text2 === leftWord.text
            ? leftWord.cut.whole
            : text2.length;
      let reduce: Dynamic = this.leftWords.reduce(
        (
          accumulator?: Dynamic,
          leftWord3?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          leftWord3 !== leftWord && leftWord3.tray === true
            ? accumulator +
              Math.min(
                leftWord3.text.length,
                leftWord3.cut?.kept ?? leftWord3.text.length,
              )
            : accumulator,
        0,
      );
      let platformKeyboardAndSaveStatusText: Dynamic =
        resolvePlatformKeyboardAndSaveStatusText(
          text2,
          Math.max(0, platformKeyboardAndSaveStatusValue1000000 - reduce),
        );
      if (leftWord) {
        Object.assign(leftWord, {
          text: text2,
          parked: true,
          tray: true,
        });
      } else {
        this.leftWords.push({
          bid: bid,
          afterId: afterId,
          text: text,
          parked: true,
          tray: true,
          ...resolveDataOperationControlAuthor(argument3),
        });
      }
      let leftWord2: Dynamic = leftWord ?? this.leftWords.at(-1);
      if (dependencies) {
        leftWord2.withEditor = argument;
      }
      if (argument) {
        leftWord2.quiet = true;
      } else {
        delete leftWord2.quiet;
      }
      let kept: Dynamic = platformKeyboardAndSaveStatusText.text.length;
      if (kept > 0) {
        let cut2: Dynamic =
          kept < whole
            ? {
                kept: kept,
                whole: whole,
              }
            : undefined;
        try {
          if (
            operationScope.dataOperationControlVerdict.wal.stageWords?.(
              this.node,
              {
                bid: bid,
                afterId: afterId,
                text: platformKeyboardAndSaveStatusText.text,
                tray: true,
                ...(cut2
                  ? {
                      cut: cut2,
                    }
                  : {}),
                ...resolveDataOperationControlAuthor(leftWord2),
              },
            ) === false
          ) {
            kept = 0;
          }
        } catch {
          kept = 0;
        }
      }
      let record4: Dynamic =
        kept < whole
          ? {
              kept: kept,
              whole: whole,
            }
          : undefined;
      if (record4) {
        leftWord2.cut = record4;
      } else {
        delete leftWord2.cut;
      }
      (0, operationScope.emit7)();
      return record4;
    },
    handBack(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      dependencies: Dynamic = false,
      ..._extraArguments: unknown[]
    ): undefined {
      let uniqueItems7: Dynamic = new (Set as Dynamic)(
        dataOperationControlVerdict2.predicted
          .flat()
          .filter(
            (flat?: Dynamic, ..._extraArguments: unknown[]) =>
              !dependencies || !this.grantedEver.has(flat),
          ),
      );
      let items3: Dynamic = dependencies
        ? []
        : [[dataOperationControlVerdict2, options, context]];
      if (!(dependencies && uniqueItems7.size === 0)) {
        for (let loadDataOperationControlVerdictResult22 of this
          .queue as Dynamic) {
          if (
            loadDataOperationControlVerdictResult22 ===
            dataOperationControlVerdict2
          )
            continue;
          let uniqueItems8: Dynamic = new (Set as Dynamic)();
          collectDataOperationControlContent(
            loadDataOperationControlVerdictResult22.ops,
            (
              dataOperationControlVerdict3?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => (
              uniqueItems7.has(dataOperationControlVerdict3) &&
                uniqueItems8.add(dataOperationControlVerdict3),
              dataOperationControlVerdict3
            ),
          );
          if (uniqueItems8.size !== 0) {
            for (let loadDataOperationControlVerdictResult23 of loadDataOperationControlVerdictResult22.predicted.flat() as Dynamic)
              uniqueItems7.add(loadDataOperationControlVerdictResult23);
            items3.push([
              loadDataOperationControlVerdictResult22,
              `unknown_id`,
              {
                code: `unknown_id`,
                why: `not_minted`,
                ids: [...uniqueItems8],
              },
            ]);
          }
        }
        for (let [
          loadDataOperationControlVerdictResult22,
          reason,
          loadDataOperationControlVerdictResult23,
        ] of items3 as Dynamic) {
          this.queue.splice(
            this.queue.indexOf(loadDataOperationControlVerdictResult22),
            1,
          );
          let back: Dynamic = {
            ops: loadDataOperationControlVerdictResult22.ops,
            predicted: loadDataOperationControlVerdictResult22.predicted,
            textFrames: loadDataOperationControlVerdictResult22.textFrames,
            ...(loadDataOperationControlVerdictResult22.homes
              ? {
                  homes: loadDataOperationControlVerdictResult22.homes,
                }
              : {}),
          };
          let rescue: Dynamic = loadDataOperationControlVerdictResult22.replayed
            ? this.keepRescued(
                updateDataOperationControlBid(
                  loadDataOperationControlVerdictResult22.ops,
                  loadDataOperationControlVerdictResult22.homes,
                ),
                loadDataOperationControlVerdictResult22,
              )
            : [];
          let detail: Dynamic = {
            opIndex: 0,
            ...loadDataOperationControlVerdictResult23,
            ...(loadDataOperationControlVerdictResult22.replayed &&
            loadDataOperationControlVerdictResult23.need === undefined
              ? {
                  need: `earlier_life`,
                }
              : {}),
            ...(loadDataOperationControlVerdictResult22 ===
            dataOperationControlVerdict2
              ? {}
              : {
                  layer: `page`,
                  words: DataOperationControlMessage15,
                }),
            back: back,
            ...(rescue.length > 0
              ? {
                  rescue: rescue,
                }
              : {}),
          };
          if (
            this.emit({
              t: `deny`,
              node: this.node,
              opId: loadDataOperationControlVerdictResult22.opId,
              reason: reason,
              detail: detail,
            })
          ) {
            operationScope.dataOperationControlVerdict.wal
              .trim(this.node, loadDataOperationControlVerdictResult22.opId)
              .catch((..._extraArguments: unknown[]): undefined => undefined);
          }
        }
        if (items3.length !== 0) {
          if (!dependencies) {
            this.owed = true;
          }
          (0, operationScope.emit7)();
        }
      }
    },
    tookMine(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      this.ackedRev = Math.max(
        this.ackedRev,
        dataOperationControlVerdict2.mineRev ?? -1,
      );
      this.heardRev = Math.max(
        this.heardRev,
        this.ackedRev,
        dataOperationControlVerdict2.rev,
      );
      this.roomSeen(
        this.heardRev,
        !dataOperationControlVerdict2.headOnly &&
          dataOperationControlVerdict2.mineRev !== undefined &&
          this.heardRev <= dataOperationControlVerdict2.mineRev,
      );
      if ((0, operationScope.honourOpsOnFeed)()) {
        this.bookRev(dataOperationControlVerdict2.rev, false);
      } else {
        if (
          this.served &&
          !dataOperationControlVerdict2.headOnly &&
          !dataOperationControlVerdict2.unseen &&
          dataOperationControlVerdict2.rev === this.lastRev + 1
        ) {
          if (this.groundRev >= this.lastRev) {
            this.groundTo(dataOperationControlVerdict2.rev);
          }
          this.lastRev = dataOperationControlVerdict2.rev;
          this.drainParked();
        } else {
          if (this.served && dataOperationControlVerdict2.rev > this.lastRev) {
            this.wantRev = Math.max(
              this.wantRev,
              dataOperationControlVerdict2.rev,
            );
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
          }
        }
      }
      this.met();
      this.holedRead.clear();
    },
    async settleOne(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<undefined> {
      await Promise.race([
        operationScope.dataOperationControlVerdict.wal
          .trim(this.node, dataOperationControlVerdict2.opId)
          .catch((..._extraArguments: unknown[]): undefined => undefined),
        (0, operationScope.loadDataOperationControlVerdictHandler)(400),
      ]);
      this.remountOut.delete(dataOperationControlVerdict2.opId);
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
    },
    bump(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let options2: Dynamic = options;
      let enabled26 = false;
      for (let loadDataOperationControlVerdictResult22 of this
        .queue as Dynamic) {
        let filteredFlatMap: Dynamic =
          loadDataOperationControlVerdictResult22.predicted
            .flatMap(
              (predicted?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                predicted.map(
                  (
                    rolldownRImport2?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic =>
                    resolveDataOperationControlStartsWith(
                      rolldownRImport2,
                      dataOperationControlVerdict2,
                    ),
                ),
            )
            .filter(
              (flatMap?: Dynamic, ..._extraArguments: unknown[]) =>
                flatMap >= 0,
            );
        if (filteredFlatMap.length === 0) continue;
        let min2: Dynamic = (Math.min as Dynamic)(...filteredFlatMap);
        let difference: Dynamic = min2 <= options2 ? options2 + 1 - min2 : 0;
        if (difference > 0) {
          let lookup3: Dynamic = new (Map as Dynamic)(
            filteredFlatMap.map(
              (filteredFlatMap2?: Dynamic, ..._extraArguments: unknown[]) => [
                `${dataOperationControlVerdict2}.${filteredFlatMap2}`,
                `${dataOperationControlVerdict2}.${filteredFlatMap2 + difference}`,
              ],
            ),
          );
          for (let loadDataOperationControlVerdictResult23 of this
            .queue as Dynamic) {
            loadDataOperationControlVerdictResult23.editorSaid ??=
              loadDataOperationControlVerdictResult23.predicted;
            [
              loadDataOperationControlVerdictResult23.ops,
              loadDataOperationControlVerdictResult23.predicted,
            ] = [
              getDataOperationControlSize(
                loadDataOperationControlVerdictResult23.ops,
                lookup3,
              ),
              getDataOperationControlSize(
                loadDataOperationControlVerdictResult23.predicted,
                lookup3,
              ),
            ];
            loadDataOperationControlVerdictResult23.homes &&=
              getDataOperationControlSize(
                loadDataOperationControlVerdictResult23.homes,
                lookup3,
              );
          }
          enabled26 = true;
        }
        options2 = Math.max(
          options2,
          (Math.max as Dynamic)(...filteredFlatMap) + difference,
        );
      }
      return enabled26 ? options2 : options;
    },
    learn(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      dependencies: Dynamic = new (Set as Dynamic)(),
      ..._extraArguments: unknown[]
    ): Dynamic {
      let lookup3: Dynamic = new (Map as Dynamic)();
      options.forEach(
        (
          rolldownTImport2?: Dynamic,
          index5?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          let dataOperationControlFlatMap2: Dynamic =
            resolveDataOperationControlFlatMap2(rolldownTImport2?.minted);
          let contextItem: Dynamic = context[index5] ?? [];
          if (
            dataOperationControlFlatMap2.length > 0 &&
            dataOperationControlFlatMap2.length < contextItem.length &&
            ((
              dataOperationControlVerdict3?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              dataOperationControlFlatMap2.every(
                (
                  dataOperationControlFlatMap22?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  dataOperationControlVerdict3.has(
                    dataOperationControlFlatMap22,
                  ),
              ))(new (Set as Dynamic)(contextItem))
          ) {
            for (let loadDataOperationControlVerdictResult22 of dataOperationControlFlatMap2 as Dynamic)
              this.grantedEver.add(loadDataOperationControlVerdictResult22);
            return;
          }
          if (
            dataOperationControlFlatMap2.length === 0 ||
            dataOperationControlFlatMap2.length === contextItem.length
          ) {
            contextItem.forEach(
              (
                contextItem2?: Dynamic,
                index6?: Dynamic,
                ..._extraArguments: unknown[]
              ): undefined => {
                if (
                  index6 < dataOperationControlFlatMap2.length &&
                  contextItem2 !== dataOperationControlFlatMap2[index6]
                ) {
                  lookup3.set(
                    contextItem2,
                    dataOperationControlFlatMap2[index6],
                  );
                }
                this.grantedEver.add(contextItem2);
              },
            );
          }
          for (let loadDataOperationControlVerdictResult22 of dataOperationControlFlatMap2 as Dynamic)
            this.grantedEver.add(loadDataOperationControlVerdictResult22);
        },
      );
      for (let loadDataOperationControlVerdictResult22 of this
        .queue as Dynamic) {
        loadDataOperationControlVerdictResult22.ops =
          getDataOperationControlSize(
            loadDataOperationControlVerdictResult22.ops,
            lookup3,
          );
        loadDataOperationControlVerdictResult22.homes &&=
          getDataOperationControlSize(
            loadDataOperationControlVerdictResult22.homes,
            lookup3,
          );
      }
      let sessionEntry: Dynamic = operationScope.enabled21
        ? operationScope.dataOperationControlVerdict.session.get()
        : null;
      if (dataOperationControlVerdict2.replayed === true) {
        if (
          typeof dataOperationControlVerdict2.sess == `string` &&
          sessionEntry &&
          dataOperationControlVerdict2.sess !== sessionEntry.label
        ) {
          console.info(
            `opTransport: a replayed receipt names an earlier life's session — not adopted`,
            dataOperationControlVerdict2.sess,
            sessionEntry.label,
          );
        }
        return lookup3;
      }
      let enabled26 =
        operationScope.enabled24 &&
        sessionEntry !== null &&
        typeof dataOperationControlVerdict2.sess == `string` &&
        dataOperationControlVerdict2.sess !== `` &&
        dataOperationControlVerdict2.sess !== sessionEntry.label &&
        typeof dataOperationControlVerdict2.sessSecret == `string`;
      let sessionEntry2: Dynamic = enabled26 ? null : sessionEntry;
      let sessionEntry3: Dynamic = sessionEntry2 ?? {
        label: String(dataOperationControlVerdict2.sess),
        secret: String(dataOperationControlVerdict2.sessSecret),
        hwm: 0,
      };
      if (
        !sessionEntry2 &&
        (typeof dataOperationControlVerdict2.sess != `string` ||
          typeof dataOperationControlVerdict2.sessSecret != `string`)
      )
        return lookup3;
      let label5: Dynamic = enabled26
        ? sessionEntry.label
        : operationScope.enabled21
          ? null
          : (operationScope.dataOperationControlVerdict.session.get()?.label ??
            operationScope.loadDataOperationControlVerdictResult17);
      if (enabled26) {
        operationScope.uniqueItems6.add(sessionEntry.label);
      }
      operationScope.enabled21 = true;
      operationScope.count8 = 0;
      operationScope.count9 = 0;
      operationScope.loadDataOperationControlVerdictResult17 = undefined;
      if (label5 != null && label5 !== sessionEntry3.label) {
        operationScope.dataOperationControlVerdict.session.set(sessionEntry3);
        (0, operationScope.rekeyHolds3)(label5);
      }
      if ((0, operationScope.slice)().length > 0) {
        if (!operationScope.dataOperationControlVerdict.session.get()) {
          operationScope.dataOperationControlVerdict.session.set(sessionEntry3);
        }
        (0, operationScope.rekeyHolds4)();
      }
      let mappedItems: Dynamic = [
        ...options.flatMap(
          (option?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            resolveDataOperationControlFlatMap2(option?.minted),
        ),
        ...dependencies,
      ].map(
        (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          resolveDataOperationControlStartsWith(item, sessionEntry3.label),
      );
      let data: Dynamic = isPlainRecord(dataOperationControlVerdict2.data)
        ? dataOperationControlVerdict2.data
        : {};
      let mappedFilteredItems = [
        dataOperationControlVerdict2.nextIndex,
        data.nextIndex,
        ...options.map(
          (option?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            option?.nextIndex,
        ),
      ]
        .filter(
          (item?: unknown, ..._extraArguments: unknown[]) =>
            typeof item == `number`,
        )
        .map(
          (filteredItem?: Dynamic, ..._extraArguments: unknown[]) =>
            filteredItem - 1,
        );
      let mappedFlatMap: Dynamic = (
        Array.isArray(data.healed)
          ? data.healed
          : Array.isArray(dataOperationControlVerdict2.healed)
            ? dataOperationControlVerdict2.healed
            : []
      )
        .flatMap(
          (healed?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            isPlainRecord(healed)
              ? resolveDataOperationControlFlatMap2(healed.minted)
              : [],
        )
        .map(
          (flatMap?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            resolveDataOperationControlStartsWith(flatMap, sessionEntry3.label),
        );
      let mappedOptions: Dynamic = options.map(
        (option?: Dynamic, ..._extraArguments: unknown[]) =>
          resolveDataOperationControlSess2(option, sessionEntry3.label),
      );
      let max: Dynamic = (Math.max as Dynamic)(
        -1,
        ...mappedItems,
        ...mappedFilteredItems,
        ...mappedFlatMap,
        ...mappedOptions,
      );
      for (let loadDataOperationControlVerdictResult22 of [
        this,
        ...[...operationScope.lookup.values()].filter(
          (item?: Dynamic, ..._extraArguments: unknown[]) => item !== this,
        ),
      ] as Dynamic)
        max = Math.max(
          max,
          loadDataOperationControlVerdictResult22.bump(
            sessionEntry3.label,
            max,
          ),
        );
      let hwm = Math.max(sessionEntry3.hwm, max);
      operationScope.dataOperationControlVerdict.session.set({
        label: sessionEntry3.label,
        secret: sessionEntry3.secret,
        hwm: hwm,
      });
      if (!sessionEntry2) {
        (0, operationScope.rekeyHolds)(
          sessionEntry3.label,
          mappedItems.length > 0
            ? (Math.min as Dynamic)(...mappedItems) - 1
            : hwm,
        );
      }
      (0, operationScope.emit8)();
      return lookup3;
    },
    close(..._extraArguments: unknown[]): undefined {
      this.dead = true;
      this.heldWordsOff(`close`);
      if (this.mountWait !== null) {
        operationScope.dataOperationControlVerdict.timers.clearTimeout(
          this.mountWait.timer,
        );
      }
      this.mountWait = null;
      this.remountOut.clear();
      for (let loadDataOperationControlVerdictResult22 of [
        this.pollTimer,
        this.retryTimer,
        this.streamTimer,
        this.freshTimer,
        this.stubTimer,
        this.backTimer,
        this.coolTimer,
        this.quietTimer,
        this.blockTimer,
        this.healTimer,
        this.healCoolTimer,
        this.healReissueTimer,
        this.orderTimer,
        this.gapTimer,
        this.shedTimer,
        this.shedPauseTimer,
      ] as Dynamic)
        if (loadDataOperationControlVerdictResult22 !== null) {
          operationScope.dataOperationControlVerdict.timers.clearTimeout(
            loadDataOperationControlVerdictResult22,
          );
        }
      this.resetHoleState();
      this.paceOff();
      this.calmOff();
      this.shedRelease();
      if (this.wordsBehindTimer !== null) {
        operationScope.dataOperationControlVerdict.timers.clearTimeout(
          this.wordsBehindTimer,
        );
      }
      this.wordsBehindTimer = null;
      this.blockQueue.clear();
      this.penBlocks.clear();
      for (let loadDataOperationControlVerdictResult22 of this.blockCool.values() as Dynamic)
        if (loadDataOperationControlVerdictResult22.timer !== null) {
          operationScope.dataOperationControlVerdict.timers.clearTimeout(
            loadDataOperationControlVerdictResult22.timer,
          );
        }
      this.blockCool.clear();
      if (operationScope.lookup.get(this.node) === this) {
        operationScope.lookup.delete(this.node);
      }
    },
  };
  return methods;
}
