/** BaoCut: operation controller node proposals. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import type { OperationControllerScope } from "./controller-contracts";
import {
  filterEditorExtensionsFilter,
  isEditorExtensionsFrom5,
  resolveEditorExtensionsEntries,
  resolveEditorExtensionsFrom6,
  resolveEditorExtensionsSome3,
} from "../../prose-editor/platform/extensions-3";
import { resolvePlatformKeyboardAndSaveStatusKept } from "../services/keyboard-and-save-status";
import { reportOperationEvent } from "../observability/boot";
import {
  DataOperationControlAtRevCold,
  DataOperationControlAtRevCold2,
  DataOperationControlStyles6,
  DataOperationControlStyles8,
  isDataOperationControlDeny3,
  isDataOperationControlDeny4,
  isDataOperationControlDeny5,
  isDataOperationControlDeny6,
  resolveDataOperationControlAuthor,
} from "../data/operation-control-2";
import {
  collectDataOperationControlContent,
  collectDataOperationControlSome,
  getDataOperationControlSize,
  isPlainRecord,
  resolveDataOperationControlBid,
  resolveDataOperationControlChildren,
  resolveDataOperationControlFrom,
  resolveDataOperationControlParentId,
  resolveDataOperationControlReduce,
  resolveDataOperationControlValue30,
} from "../data/operation-control-4";
export function createOperationNodeProposals(
  operationScope: Pick<
    OperationControllerScope,
    | "enabled"
    | "loadDataOperationControlVerdictHandler28"
    | "life2"
    | "author"
    | "dataOperationControlVerdict"
    | "loadDataOperationControlVerdictHandler"
    | "emit7"
    | "index"
    | "loadDataOperationControlVerdictHandler6"
    | "honourOpsOnFeed"
  >,
): Record<string, Dynamic> {
  const methods: Record<string, Dynamic> & ThisType<Dynamic> = {
    hold(
      opId?: Dynamic,
      items3?: Dynamic,
      context: Dynamic = [],
      dependencies: Dynamic = [],
      ..._extraArguments: unknown[]
    ): undefined {
      if (operationScope.enabled || this.dead || items3.length === 0) return;
      let predicted: Dynamic = collectDataOperationControlSome(items3, context);
      let dataOperationControlVerdictHandler: Dynamic = (0,
      operationScope.loadDataOperationControlVerdictHandler28)();
      for (let loadDataOperationControlVerdictResult22 of predicted.flat() as Dynamic)
        dataOperationControlVerdictHandler.delete(
          loadDataOperationControlVerdictResult22,
        );
      let ops: Dynamic =
        dataOperationControlVerdictHandler.size > 0
          ? getDataOperationControlSize(
              items3,
              dataOperationControlVerdictHandler,
            )
          : items3;
      let homes: Dynamic =
        dataOperationControlVerdictHandler.size > 0
          ? dependencies.map(
              (dependency?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                dataOperationControlVerdictHandler.get(dependency) ??
                dependency,
            )
          : dependencies;
      let record4: Dynamic = {
        opId: opId,
        ops: ops,
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
        held: true,
        life: operationScope.life2,
        ...(this.holds.has(opId)
          ? resolveDataOperationControlAuthor(this.holds.get(opId))
          : (0, operationScope.author)()),
      };
      this.putHold(record4);
    },
    putHold(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let { opId: dataOperationControlVerdict3 }: Dynamic =
        dataOperationControlVerdict2;
      this.holds.set(
        dataOperationControlVerdict3,
        dataOperationControlVerdict2,
      );
      try {
        operationScope.dataOperationControlVerdict.wal.stage?.(
          this.node,
          dataOperationControlVerdict2,
        );
      } catch {}
      this.ready.then((..._extraArguments: unknown[]): Dynamic => {
        if (
          this.holds.get(dataOperationControlVerdict3) !==
          dataOperationControlVerdict2
        )
          return;
        let rewrite: Dynamic = operationScope.dataOperationControlVerdict.wal
          .rewrite
          ? operationScope.dataOperationControlVerdict.wal.rewrite(
              this.node,
              dataOperationControlVerdict2,
            )
          : operationScope.dataOperationControlVerdict.wal
              .trim(this.node, dataOperationControlVerdict3)
              .then(
                (..._extraArguments: unknown[]): Dynamic =>
                  operationScope.dataOperationControlVerdict.wal.append(
                    this.node,
                    dataOperationControlVerdict2,
                  ),
              );
        return Promise.race([
          rewrite.catch(
            (..._extraArguments: unknown[]): undefined => undefined,
          ),
          (0, operationScope.loadDataOperationControlVerdictHandler)(400),
        ]);
      });
    },
    unhold(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (this.holds.delete(dataOperationControlVerdict2)) {
        operationScope.dataOperationControlVerdict.wal
          .trim(this.node, dataOperationControlVerdict2)
          .catch((..._extraArguments: unknown[]): undefined => undefined);
      }
    },
    rekeyHolds(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      let objectValues: Dynamic = Array.from<Dynamic>(this.holds.values());
      for (let loadDataOperationControlVerdictResult22 of objectValues as Dynamic) {
        let ops: Dynamic = collectDataOperationControlContent(
          loadDataOperationControlVerdictResult22.ops,
          dataOperationControlVerdict2,
        );
        if (
          JSON.stringify(ops) !==
          JSON.stringify(loadDataOperationControlVerdictResult22.ops)
        ) {
          this.putHold({
            ...loadDataOperationControlVerdictResult22,
            ops: ops,
            ...(loadDataOperationControlVerdictResult22.predicted
              ? {
                  predicted: collectDataOperationControlContent(
                    loadDataOperationControlVerdictResult22.predicted,
                    dataOperationControlVerdict2,
                  ),
                }
              : {}),
            ...(loadDataOperationControlVerdictResult22.homes
              ? {
                  homes: loadDataOperationControlVerdictResult22.homes.map(
                    dataOperationControlVerdict2,
                  ),
                }
              : {}),
          });
        }
      }
    },
    words(ask?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      if (typeof ask?.bid != `string` || typeof ask.text != `string`) return;
      if (ask.text !== `` && ask.tray !== true) {
        this.heldWordsRefresh();
      }
      let afterId: Dynamic =
        typeof ask.afterId == `string` ? ask.afterId : null;
      if (ask.tray === true && ask.text !== ``) {
        for (let [loadDataOperationControlVerdictResult22, ask2] of this
          .myWords as Dynamic)
          if (ask2.bid === ask.bid) {
            this.myWords.delete(loadDataOperationControlVerdictResult22);
          }
        return this.trayOwn(
          ask.bid,
          afterId,
          ask.text,
          true,
          ask.quiet === true,
          resolvePlatformKeyboardAndSaveStatusKept(ask.cut),
          (0, operationScope.author)(),
        );
      }
      if (ask.owed === true) {
        let leftWord: Dynamic = this.leftWords.find(
          (ask2?: Dynamic, ..._extraArguments: unknown[]) =>
            ask2.bid === ask.bid && (ask2.afterId ?? null) === afterId,
        );
        if (leftWord) {
          [leftWord.parked, leftWord.withEditor] = [true, true];
        }
        if (ask.text !== `` && !leftWord) {
          this.leftWords.push({
            bid: ask.bid,
            afterId: afterId,
            text: ask.text,
            ...(ask.real === true
              ? {
                  real: true,
                }
              : {}),
            parked: true,
            withEditor: true,
          });
          try {
            this.stagePut({
              bid: ask.bid,
              afterId: afterId,
              text: ask.text,
              ...(ask.real === true
                ? {
                    real: true,
                  }
                : {}),
            });
          } catch {}
        }
        return;
      }
      let only = ask.text === `` && ask.only === true;
      if (only) {
        let some: Dynamic = this.leftWords.some(
          (ask3?: Dynamic, ..._extraArguments: unknown[]) =>
            ask3.bid === ask.bid && (ask3.afterId ?? null) === afterId,
        );
        let filteredLeftWords: Dynamic = this.leftWords.filter(
          (ask3?: Dynamic, ..._extraArguments: unknown[]) =>
            ask3.bid === ask.bid,
        );
        let ask2: Dynamic = some
          ? {
              bid: ask.bid,
              afterId: afterId,
            }
          : filteredLeftWords.length === 1
            ? {
                bid: ask.bid,
                afterId: filteredLeftWords[0].afterId ?? null,
              }
            : {
                bid: ask.bid,
                afterId: afterId,
              };
        let some2: Dynamic = this.leftWords.some(
          (ask3?: Dynamic, ..._extraArguments: unknown[]) =>
            ask3.tray === true &&
            ask3.bid === ask2.bid &&
            (ask3.afterId ?? null) === ask2.afterId,
        );
        this.leftWords = this.leftWords.filter(
          (ask3?: Dynamic, ..._extraArguments: unknown[]) =>
            ask3.bid !== ask2.bid || (ask3.afterId ?? null) !== ask2.afterId,
        );
        if (some2) {
          (0, operationScope.emit7)();
        }
        if (ask2.afterId !== afterId)
          try {
            operationScope.dataOperationControlVerdict.wal.stageWords?.(
              this.node,
              {
                bid: ask.bid,
                afterId: ask2.afterId,
                text: ``,
                only: true,
              },
            );
          } catch {}
      }
      let proposedNow: Dynamic = this.proposedNow(false);
      let real =
        !proposedNow.has(ask.bid) &&
        (afterId === null || !proposedNow.has(afterId));
      if (ask.text !== ``) {
        let dataOperationControlValue30 = resolveDataOperationControlValue30(
          ask.bid,
          afterId,
        );
        this.myWords.set(dataOperationControlValue30, {
          bid: ask.bid,
          afterId: afterId,
          text: ask.text,
          ...(real
            ? {
                real: real,
              }
            : {}),
          ...(this.myWords.has(dataOperationControlValue30)
            ? resolveDataOperationControlAuthor(
                this.myWords.get(dataOperationControlValue30),
              )
            : (0, operationScope.author)()),
          since:
            this.myWords.get(dataOperationControlValue30)?.since ??
            ++operationScope.index,
        });
      } else
        for (let [loadDataOperationControlVerdictResult22, ask2] of this
          .myWords as Dynamic)
          if (
            only
              ? loadDataOperationControlVerdictResult22 ===
                resolveDataOperationControlValue30(ask.bid, afterId)
              : ask2.bid === ask.bid
          ) {
            this.myWords.delete(loadDataOperationControlVerdictResult22);
          }
      try {
        this.stagePut({
          bid: ask.bid,
          afterId: afterId,
          text: ask.text,
          ...(only
            ? {
                only: only,
              }
            : {}),
        });
        if (ask.text === `` && !only)
          for (let ask2 of this.leftWords as Dynamic)
            if (ask2.bid === ask.bid) {
              this.stagePut(ask2);
            }
      } catch {}
    },
    proposedNow(
      dataOperationControlVerdict2: Dynamic = true,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let uniqueItems7: Dynamic = new (Set as Dynamic)();
      for (let loadDataOperationControlVerdictResult22 of [
        ...this.handed,
        ...(this.inflight ? [this.inflight] : []),
        ...this.queue,
      ] as Dynamic)
        if (
          dataOperationControlVerdict2 ||
          !loadDataOperationControlVerdictResult22.replayed
        )
          for (let loadDataOperationControlVerdictResult23 of loadDataOperationControlVerdictResult22.predicted as Dynamic)
            for (let loadDataOperationControlVerdictResult24 of loadDataOperationControlVerdictResult23 as Dynamic)
              uniqueItems7.add(loadDataOperationControlVerdictResult24);
      return uniqueItems7;
    },
    refreshFace(..._extraArguments: unknown[]): undefined {
      if (!this.lastFace || operationScope.enabled || this.dead) return;
      let staged: Dynamic = this.leftWords.map(resolveDataOperationControlBid);
      this.emit({
        ...this.lastFace,
        staged: staged,
      });
    },
    stagePut(ask?: Dynamic, ..._extraArguments: unknown[]): undefined {
      if (ask.text === ``)
        return void operationScope.dataOperationControlVerdict.wal.stageWords?.(
          this.node,
          ask,
        );
      let dataOperationControlValue30 = resolveDataOperationControlValue30(
        ask.bid,
        ask.afterId ?? null,
      );
      let leftWord: Dynamic = this.leftWords.find(
        (ask2?: Dynamic, ..._extraArguments: unknown[]) =>
          ask2.bid === ask.bid &&
          (ask2.afterId ?? null) === (ask.afterId ?? null),
      );
      let myWordEntry: Dynamic = this.myWords.get(dataOperationControlValue30);
      let text: Dynamic =
        leftWord || myWordEntry
          ? `${leftWord?.text ?? ``}${myWordEntry?.text ?? ``}`
          : ask.text;
      let real: Dynamic =
        (leftWord?.real ?? false) ||
        (myWordEntry?.real ?? false) ||
        ask.real === true;
      let tray: Dynamic =
        ask.tray === true || ((leftWord?.tray ?? false) && !myWordEntry);
      operationScope.dataOperationControlVerdict.wal.stageWords?.(this.node, {
        bid: ask.bid,
        afterId: ask.afterId ?? null,
        text: text,
        ...(real
          ? {
              real: real,
            }
          : {}),
        ...(tray
          ? {
              tray: tray,
            }
          : {}),
        ...resolveDataOperationControlAuthor(leftWord ?? myWordEntry ?? ask),
      });
    },
    async joinPages(
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      context: Dynamic = false,
      dependencies?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> {
      let Number2: Dynamic = (
        dataOperationControlVerdict3?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        [...dataOperationControlVerdict3, Number(options2.attrs.rev)].find(
          (item?: unknown, ..._extraArguments: unknown[]) =>
            typeof item == `number` && Number.isInteger(item),
        );
      let test3: Dynamic = (
        dataOperationControlVerdict3?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        dataOperationControlVerdict3.complete === false ||
        dataOperationControlVerdict3.complete === 0 ||
        /^<doc\b[^>]*\scomplete="(?:0|false)"/.test(options2);
      let [doc, setDoc, doc2]: Dynamic = [
        dataOperationControlVerdict2,
        options,
        context,
      ];
      let lookup3: Dynamic = new (Map as Dynamic)();
      let loadDataOperationControlVerdictHandler30 = (
        dataOperationControlVerdict3?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined =>
        void (
          dataOperationControlVerdict3 &&
          lookup3.set(
            dataOperationControlVerdict3.parentId ?? ``,
            dataOperationControlVerdict3,
          )
        );
      loadDataOperationControlVerdictHandler30(dependencies);
      let comments: Dynamic;
      let index5 = 0;
      let enabled26 = false;
      let pinned = false;
      let hop: number = 0;
      for (let restarts = 0; ; restarts++) {
        if (!/<gap\b/.test(doc) && !doc2) {
          if (restarts === 0)
            return {
              doc: doc,
              complete: undefined,
            };
          let rev: Dynamic =
            setDoc.find(
              (setDoc2?: unknown, ..._extraArguments: unknown[]) =>
                typeof setDoc2 == `number` && Number.isInteger(setDoc2),
            ) ?? Number(/^<doc\b[^>]*\srev="(\d+)"/.exec(doc)?.[1]);
          return {
            doc: doc,
            complete: true,
            ...(Number.isInteger(rev)
              ? {
                  rev: rev,
                }
              : {}),
            ...(comments
              ? {
                  comments: comments,
                }
              : {}),
          };
        }
        let loadDataOperationControlVerdictResult22: Dynamic;
        try {
          loadDataOperationControlVerdictResult22 =
            filterEditorExtensionsFilter(doc);
        } catch {
          return restarts === 0
            ? {
                doc: doc,
                complete: undefined,
              }
            : {
                halt: DataOperationControlStyles8,
              };
        }
        let atRev: Dynamic = Number2(
          setDoc,
          loadDataOperationControlVerdictResult22,
        );
        let loadDataOperationControlVerdictHandler31: Dynamic = (
          ..._extraArguments: unknown[]
        ): Dynamic =>
          !enabled26 &&
          (0, operationScope.loadDataOperationControlVerdictHandler6)() &&
          atRev !== undefined &&
          atRev >= 1
            ? {
                atRev: atRev,
              }
            : {};
        let behind = -1;
        if (
          !(
            resolveEditorExtensionsFrom6(
              loadDataOperationControlVerdictResult22,
            ).length > 0
          )
        )
          return {
            halt: DataOperationControlStyles6,
            part: doc,
            missing: resolveDataOperationControlReduce(
              loadDataOperationControlVerdictResult22,
            ),
            ...(atRev === undefined
              ? {}
              : {
                  rev: atRev,
                }),
          };
        let enabled27 = false;
        let reduce: Dynamic = (..._extraArguments: unknown[]): Dynamic => ({
          halt: DataOperationControlStyles8,
          part: resolveEditorExtensionsEntries(
            loadDataOperationControlVerdictResult22,
          ),
          missing:
            resolveEditorExtensionsFrom6(
              loadDataOperationControlVerdictResult22,
            ).reduce(
              (
                accumulator?: Dynamic,
                editorExtensionsFrom6?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => accumulator + (editorExtensionsFrom6.blocks ?? 0),
              0,
            ) +
            resolveDataOperationControlReduce(
              loadDataOperationControlVerdictResult22,
            ),
          ...(atRev === undefined
            ? {}
            : {
                rev: atRev,
              }),
        });
        let resolveEditorExtensionsFrom62: Dynamic = (
          ..._extraArguments: unknown[]
        ): Dynamic => {
          let editorExtensionsFrom6Item: Dynamic = resolveEditorExtensionsFrom6(
            loadDataOperationControlVerdictResult22,
          )[0];
          if (editorExtensionsFrom6Item) return editorExtensionsFrom6Item;
          for (let [
            loadDataOperationControlVerdictResult23,
            loadDataOperationControlVerdictResult24,
          ] of lookup3 as Dynamic) {
            let loadDataOperationControlVerdictResult25: Dynamic =
              loadDataOperationControlVerdictResult23 === ``
                ? loadDataOperationControlVerdictResult22
                : resolveDataOperationControlChildren(
                    loadDataOperationControlVerdictResult22,
                    loadDataOperationControlVerdictResult23,
                  );
            if (loadDataOperationControlVerdictResult25) {
              loadDataOperationControlVerdictResult25.children.push({
                name: `gap`,
                attrs: {
                  cap: `1`,
                  from: loadDataOperationControlVerdictResult24.from,
                },
                children: [],
              });
              return resolveEditorExtensionsFrom6(
                loadDataOperationControlVerdictResult22,
              )[0];
            }
          }
        };
        for (
          let editorExtensionsFrom6: Dynamic = resolveEditorExtensionsFrom62();
          editorExtensionsFrom6;
          editorExtensionsFrom6 = resolveEditorExtensionsFrom62()
        ) {
          let lookupEntry: Dynamic = lookup3.get(
            editorExtensionsFrom6.parentId ?? ``,
          );
          if (lookupEntry) {
            lookup3.delete(editorExtensionsFrom6.parentId ?? ``);
          }
          let from: Dynamic = editorExtensionsFrom6.from;
          if (
            lookupEntry &&
            lookupEntry.from !== editorExtensionsFrom6.from &&
            resolveDataOperationControlParentId(
              loadDataOperationControlVerdictResult22,
              lookupEntry,
            )
          ) {
            editorExtensionsFrom6.from = lookupEntry.from;
          }
          let from2: Dynamic = editorExtensionsFrom6.from;
          if (from2 === null) {
            let missing: Dynamic = resolveEditorExtensionsFrom6(
              loadDataOperationControlVerdictResult22,
            ).reduce(
              (
                accumulator?: Dynamic,
                editorExtensionsFrom62?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => accumulator + (editorExtensionsFrom62.blocks ?? 0),
              0,
            );
            return {
              halt: DataOperationControlStyles6,
              part: resolveEditorExtensionsEntries(
                loadDataOperationControlVerdictResult22,
              ),
              missing: missing,
              ...(atRev === undefined
                ? {}
                : {
                    rev: atRev,
                  }),
            };
          }
          if (++index5 > 64) return reduce();
          let loadDataOperationControlVerdictHandler32: Dynamic = (
            from3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => ({
            kind: `view`,
            from: from3,
            ...(editorExtensionsFrom6.parentId === null
              ? {}
              : {
                  parentId: editorExtensionsFrom6.parentId,
                }),
          });
          let pagedRead2: Dynamic = async (
            dataOperationControlVerdict3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Promise<Dynamic> => {
            hop += 1;
            let dataOperationControlVerdictHandler: Dynamic =
              loadDataOperationControlVerdictHandler31();
            let pinned3 = (pinned =
              `atRev` in dataOperationControlVerdictHandler);
            let {
              atRev: dataOperationControlVerdict4,
              atRevCold: dataOperationControlVerdict5,
              ...dataOperationControlVerdict6
            }: Dynamic = dataOperationControlVerdict3;
            let page: Dynamic = await this.pagedRead(
              pinned3
                ? {
                    ...dataOperationControlVerdict6,
                    ...dataOperationControlVerdictHandler,
                    ...DataOperationControlAtRevCold,
                  }
                : dataOperationControlVerdict6,
            );
            if (!page) return null;
            let data2: Dynamic = isPlainRecord(page.data) ? page.data : {};
            try {
              return {
                page: page,
                pd: data2,
                pinned: pinned3,
                cont:
                  page.verdict === `allow` && typeof data2.doc == `string`
                    ? filterEditorExtensionsFilter(data2.doc)
                    : null,
              };
            } catch {
              return {
                page: page,
                pd: data2,
                cont: null,
                pinned: pinned3,
              };
            }
          };
          let record4: Dynamic =
            lookupEntry && lookupEntry.from === from2
              ? {
                  kind: `view`,
                  ...lookupEntry.raw,
                }
              : loadDataOperationControlVerdictHandler32(from2);
          let pagedRead3: Dynamic = await pagedRead2(record4);
          if (!pagedRead3) return null;
          if (
            !pagedRead3.cont &&
            pagedRead3.pinned &&
            isDataOperationControlDeny4(pagedRead3.page)
          ) {
            enabled26 = true;
            reportOperationEvent(`read.join.unpinned`, {
              rev: atRev ?? -1,
              hop: hop,
              reason: String(pagedRead3.page.reason ?? ``),
            });
            if (++index5 > 64) return reduce();
            pagedRead3 = await pagedRead2(record4);
            if (!pagedRead3) return null;
          }
          if (
            !pagedRead3.cont &&
            lookupEntry &&
            lookupEntry.from === from2 &&
            from &&
            from !== from2
          ) {
            if (++index5 > 64) return reduce();
            resolveDataOperationControlParentId(
              loadDataOperationControlVerdictResult22,
              {
                ...lookupEntry,
                from: from,
              },
            );
            editorExtensionsFrom6.from = from;
            pagedRead3 = await pagedRead2(
              loadDataOperationControlVerdictHandler32(from),
            );
            if (!pagedRead3) return null;
          }
          let {
            page: pagedRead4,
            pd: pagedRead5,
            cont: pagedRead6,
          }: Dynamic = pagedRead3;
          let pinned2: Dynamic = pagedRead3.pinned;
          loadDataOperationControlVerdictHandler30(
            resolveDataOperationControlFrom(pagedRead5),
          );
          if (!pagedRead6) {
            if (
              pinned2 &&
              (isDataOperationControlDeny5(pagedRead4) ||
                isDataOperationControlDeny6(pagedRead4) ||
                pagedRead4.hung === true)
            ) {
              reportOperationEvent(`read.join.repin`, {
                rev: atRev ?? -1,
                hop: hop,
                restarts: restarts,
                why: isDataOperationControlDeny5(pagedRead4)
                  ? `range`
                  : isDataOperationControlDeny6(pagedRead4)
                    ? DataOperationControlAtRevCold2
                    : `hung`,
              });
              enabled27 = true;
              break;
            }
            return isDataOperationControlDeny3(pagedRead4)
              ? {
                  halt: DataOperationControlStyles6,
                  part: resolveEditorExtensionsEntries(
                    loadDataOperationControlVerdictResult22,
                  ),
                  missing:
                    resolveEditorExtensionsFrom6(
                      loadDataOperationControlVerdictResult22,
                    ).reduce(
                      (
                        accumulator?: Dynamic,
                        editorExtensionsFrom62?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): Dynamic =>
                        accumulator + (editorExtensionsFrom62.blocks ?? 0),
                      0,
                    ) +
                    resolveDataOperationControlReduce(
                      loadDataOperationControlVerdictResult22,
                    ),
                  ...(atRev === undefined
                    ? {}
                    : {
                        rev: atRev,
                      }),
                }
              : reduce();
          }
          if (Number2([pagedRead4.rev, pagedRead5.rev], pagedRead6) !== atRev) {
            enabled27 = true;
            break;
          }
          let number2 = Number(pagedRead5.latest);
          if (
            atRev !== undefined &&
            Number.isInteger(number2) &&
            number2 > atRev
          ) {
            behind = Math.max(behind, number2);
          }
          let max = Math.max(this.ackedRev, this.heardRev, this.lastRev);
          if (atRev !== undefined && max > atRev) {
            reportOperationEvent(`read.join.floor`, {
              rev: atRev,
              hop: hop,
              behind: behind,
              acked: Math.max(this.ackedRev, this.heardRev),
              lastRev: this.lastRev,
              pending: this.out(),
            });
            if (this.out() > 0)
              return {
                later: true,
              };
            enabled27 = true;
            break;
          }
          if (
            atRev !== undefined &&
            (0, operationScope.honourOpsOnFeed)() &&
            this.gapRev > atRev
          ) {
            reportOperationEvent(`read.join.gap`, {
              rev: atRev,
              hop: hop,
              gapRev: this.gapRev,
              restarts: restarts,
            });
            enabled27 = true;
            break;
          }
          if (
            !isEditorExtensionsFrom5(
              loadDataOperationControlVerdictResult22,
              editorExtensionsFrom6,
              pagedRead6,
            )
          )
            return reduce();
        }
        if (!enabled27)
          return lookup3.size > 0
            ? reduce()
            : resolveEditorExtensionsSome3(
                  loadDataOperationControlVerdictResult22,
                )
              ? {
                  halt: DataOperationControlStyles6,
                  part: resolveEditorExtensionsEntries(
                    loadDataOperationControlVerdictResult22,
                  ),
                  missing: resolveDataOperationControlReduce(
                    loadDataOperationControlVerdictResult22,
                  ),
                  ...(atRev === undefined
                    ? {}
                    : {
                        rev: atRev,
                      }),
                }
              : ((loadDataOperationControlVerdictResult22.attrs.complete = `1`),
                reportOperationEvent(`read.joined`, {
                  rev: atRev ?? -1,
                  hops: hop,
                  restarts: restarts,
                  pinned: pinned,
                  ...(behind > 0
                    ? {
                        behind: behind,
                      }
                    : {}),
                }),
                {
                  doc: resolveEditorExtensionsEntries(
                    loadDataOperationControlVerdictResult22,
                  ),
                  complete: true,
                  ...(atRev === undefined
                    ? {}
                    : {
                        rev: atRev,
                      }),
                  ...(comments
                    ? {
                        comments: comments,
                      }
                    : {}),
                  ...(behind > 0
                    ? {
                        behind: behind,
                      }
                    : {}),
                });
        reportOperationEvent(`read.join.restart`, {
          rev: atRev ?? -1,
          hops: hop,
          restarts: restarts,
          pinned: pinned,
        });
        if (restarts + 1 >= 3) return reduce();
        if (this.out() > 0)
          return {
            later: true,
          };
        let pagedRead: Dynamic = await this.pagedRead({
          kind: `view`,
          ...(this.commentsBarred
            ? {}
            : {
                comments: true,
              }),
        });
        if (!pagedRead) return null;
        if (isDataOperationControlDeny3(pagedRead)) {
          if (this.commentsBarred)
            return {
              halt: DataOperationControlStyles6,
              part: resolveEditorExtensionsEntries(
                loadDataOperationControlVerdictResult22,
              ),
              missing:
                resolveEditorExtensionsFrom6(
                  loadDataOperationControlVerdictResult22,
                ).reduce(
                  (
                    accumulator?: Dynamic,
                    editorExtensionsFrom6?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic =>
                    accumulator + (editorExtensionsFrom6.blocks ?? 0),
                  0,
                ) +
                resolveDataOperationControlReduce(
                  loadDataOperationControlVerdictResult22,
                ),
              ...(atRev === undefined
                ? {}
                : {
                    rev: atRev,
                  }),
            };
          this.commentsTooLarge();
          pagedRead = await this.pagedRead({
            kind: `view`,
          });
          if (!pagedRead) return null;
          if (isDataOperationControlDeny3(pagedRead))
            return {
              halt: DataOperationControlStyles6,
              part: resolveEditorExtensionsEntries(
                loadDataOperationControlVerdictResult22,
              ),
              missing:
                resolveEditorExtensionsFrom6(
                  loadDataOperationControlVerdictResult22,
                ).reduce(
                  (
                    accumulator?: Dynamic,
                    editorExtensionsFrom6?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic =>
                    accumulator + (editorExtensionsFrom6.blocks ?? 0),
                  0,
                ) +
                resolveDataOperationControlReduce(
                  loadDataOperationControlVerdictResult22,
                ),
              ...(atRev === undefined
                ? {}
                : {
                    rev: atRev,
                  }),
            };
        }
        let data: Dynamic = isPlainRecord(pagedRead.data) ? pagedRead.data : {};
        if (pagedRead.verdict !== `allow` || typeof data.doc != `string`)
          return reduce();
        [doc, setDoc, doc2] = [
          data.doc,
          [pagedRead.rev, data.rev],
          test3(data, data.doc),
        ];
        lookup3.clear();
        loadDataOperationControlVerdictHandler30(
          resolveDataOperationControlFrom(data),
        );
        if (Array.isArray(data.comments)) {
          comments = data.comments;
        }
      }
    },
  };
  return methods;
}
