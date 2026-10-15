/** BaoCut: operation controller node delta. */
import type { Dynamic } from "./types";
import type { OperationControllerScope } from "./type-models/platform-core-operation";
import {
  resolveEditorExtensionsBlock,
  resolveEditorExtensionsSess,
} from "./platform-core-editor-extensions-2";
import {
  filterEditorExtensionsFilter,
  filterEditorExtensionsGap,
  resolveEditorExtensionsBlocks,
  resolveEditorExtensionsFrom6,
  resolveEditorExtensionsSome3,
} from "./platform-core-editor-extensions-3";
import { reportOperationEvent } from "./platform-core-observability-boot";
export function createOperationNodeDelta(
  operationScope: Pick<OperationControllerScope, "dataOperationControlVerdict">,
): Record<string, Dynamic> {
  const methods: Record<string, Dynamic> & ThisType<Dynamic> = {
    deltaBlocks(
      dataOperationControlVerdict2?: Dynamic,
      rev?: Dynamic,
      under?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let loadDataOperationControlVerdictResult22: Dynamic;
      let behind: Dynamic = new (Set as Dynamic)();
      try {
        loadDataOperationControlVerdictResult22 = filterEditorExtensionsFilter(
          dataOperationControlVerdict2,
        );
      } catch {
        return {
          handed: 0,
          leftBehind: true,
          behind: behind,
        };
      }
      let loadDataOperationControlVerdictHandler30 = (
        dataOperationControlVerdict3?: unknown,
        ..._extraArguments: unknown[]
      ) => typeof dataOperationControlVerdict3 != `string`;
      let uniqueItems7: Dynamic = new (Set as Dynamic)([
        `gap`,
        `gone`,
        `hit`,
        `hits`,
      ]);
      let uniqueItems8: Dynamic = new (Set as Dynamic)([
        `ul`,
        `ol`,
        `list`,
        `bulletList`,
        `orderedList`,
        `taskList`,
      ]);
      let uniqueItems9: Dynamic = new (Set as Dynamic)();
      for (let loadDataOperationControlVerdictResult23 of (this.inflight
        ? [this.inflight, ...this.queue]
        : this.queue) as Dynamic)
        for (let loadDataOperationControlVerdictResult24 of (loadDataOperationControlVerdictResult23.homes ??
          []) as Dynamic)
          uniqueItems9.add(loadDataOperationControlVerdictResult24);
      let helloDImport2: Dynamic = (
        node?: Dynamic,
        options: Dynamic = new (Set as Dynamic)(),
        ..._extraArguments: unknown[]
      ): Dynamic => {
        if (node.attrs.id) {
          options.add(node.attrs.id);
        }
        for (let loadDataOperationControlVerdictResult23 of node.children as Dynamic)
          if (
            loadDataOperationControlVerdictHandler30(
              loadDataOperationControlVerdictResult23,
            ) &&
            !uniqueItems7.has(loadDataOperationControlVerdictResult23.name)
          ) {
            helloDImport2(loadDataOperationControlVerdictResult23, options);
          }
        return options;
      };
      let loadDataOperationControlVerdictHandler31: Dynamic = (
        node?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        node.children.some(
          (children?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            loadDataOperationControlVerdictHandler30(children) &&
            (resolveEditorExtensionsBlock(children) === `block` ||
              loadDataOperationControlVerdictHandler31(children)),
        );
      let loadDataOperationControlVerdictHandler32: Dynamic = (
        dataOperationControlVerdict3?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        this.wrote.some(
          (wrote?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            wrote.ids.has(dataOperationControlVerdict3) &&
            wrote.lo <= options &&
            options <= wrote.hi,
        );
      let handed: Dynamic = 0;
      let leftBehind = false;
      let since = Number(
        loadDataOperationControlVerdictResult22.attrs.sinceRev,
      );
      let items3: Dynamic = [];
      let isFinite4 = (
        dataOperationControlVerdict3?: Dynamic,
        options?: Dynamic,
        context: Dynamic = items3.length,
        ..._extraArguments: unknown[]
      ): undefined => {
        let editorExtensionsBlocks: Dynamic = dataOperationControlVerdict3
          ? resolveEditorExtensionsBlocks({
              name: loadDataOperationControlVerdictResult22.name,
              attrs: {
                ...loadDataOperationControlVerdictResult22.attrs,
                complete: `1`,
              },
              children: [dataOperationControlVerdict3],
            })
          : null;
        handed += 1;
        items3.splice(context, 0, {
          t: `snapshot`,
          node: this.node,
          rev: rev,
          blocks: editorExtensionsBlocks?.blocks ?? [],
          docJson: editorExtensionsBlocks
            ? editorExtensionsBlocks.docJson
            : null,
          partial: true,
          delta: true,
          whole: false,
          ...(Number.isFinite(since)
            ? {
                since: since,
              }
            : {}),
          ...(under > 0
            ? {
                under: under,
              }
            : {}),
          ...options,
        });
      };
      let uniqueItems10: Dynamic = new (Set as Dynamic)();
      let uniqueItems11: Dynamic = new (Set as Dynamic)();
      let helloRImport2 = (
        node?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        for (let loadDataOperationControlVerdictResult23 of node.children as Dynamic)
          if (
            loadDataOperationControlVerdictHandler30(
              loadDataOperationControlVerdictResult23,
            )
          ) {
            if (loadDataOperationControlVerdictResult23.name === `gone`) {
              if (loadDataOperationControlVerdictResult23.attrs.id) {
                uniqueItems11.add(
                  loadDataOperationControlVerdictResult23.attrs.id,
                );
              }
            } else {
              if (
                !uniqueItems7.has(loadDataOperationControlVerdictResult23.name)
              ) {
                if (loadDataOperationControlVerdictResult23.attrs.id) {
                  uniqueItems10.add(
                    loadDataOperationControlVerdictResult23.attrs.id,
                  );
                }
                helloRImport2(loadDataOperationControlVerdictResult23);
              }
            }
          }
      };
      helloRImport2(loadDataOperationControlVerdictResult22);
      let uniqueItems12: Dynamic = new (Set as Dynamic)(
        [...uniqueItems11].filter(
          (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            uniqueItems10.has(item),
        ),
      );
      let uniqueItems13: Dynamic = new (Set as Dynamic)(
        [...uniqueItems11].filter(
          (item?: Dynamic, ..._extraArguments: unknown[]) =>
            !uniqueItems10.has(item),
        ),
      );
      let matchesUniqueItemsCount = uniqueItems13.size > 0;
      let lookup3: Dynamic = new (Map as Dynamic)();
      let helloXImport2: Dynamic = (
        node?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let count10: Dynamic = 0;
        for (let loadDataOperationControlVerdictResult23 of node.children as Dynamic)
          if (
            loadDataOperationControlVerdictHandler30(
              loadDataOperationControlVerdictResult23,
            )
          ) {
            if (loadDataOperationControlVerdictResult23.name === `gone`) {
              count10 +=
                loadDataOperationControlVerdictResult23.attrs.id &&
                uniqueItems13.has(
                  loadDataOperationControlVerdictResult23.attrs.id,
                )
                  ? 1
                  : 0;
            } else {
              if (
                !uniqueItems7.has(loadDataOperationControlVerdictResult23.name)
              ) {
                count10 += helloXImport2(
                  loadDataOperationControlVerdictResult23,
                );
              }
            }
          }
        if (node.attrs.id) {
          lookup3.set(node.attrs.id, count10);
        }
        return count10;
      };
      if (matchesUniqueItemsCount) {
        helloXImport2(loadDataOperationControlVerdictResult22);
      }
      let findLastIndex = (..._extraArguments: unknown[]): undefined => {
        let findLastIndex2: Dynamic = items3.findLastIndex(
          (
            dataOperationControlVerdict3?: Dynamic,
            ..._extraArguments: unknown[]
          ) =>
            dataOperationControlVerdict3.t === `snapshot` &&
            !dataOperationControlVerdict3.compare,
        );
        items3.forEach(
          (
            item?: Dynamic,
            index5?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            this.emit(
              item.t === `snapshot` && index5 < findLastIndex2
                ? {
                    ...item,
                    more: true,
                  }
                : item,
            ),
        );
      };
      let lookup4: Dynamic = new (Map as Dynamic)();
      let lookup5: Dynamic = new (Map as Dynamic)();
      let lookup6: Dynamic = new (Map as Dynamic)();
      let isFinite5: Dynamic = (
        node?: Dynamic,
        parent?: Dynamic,
        ..._extraArguments: unknown[]
      ) => {
        let enabled26 = false;
        let after: Dynamic = null;
        let index5: Dynamic = 0;
        let enabled27 = true;
        let items4: Dynamic = [];
        for (let node2 of node.children as Dynamic) {
          if (!loadDataOperationControlVerdictHandler30(node2)) continue;
          if (node2.name === `gone`) {
            let block2: Dynamic = node2.attrs.id;
            if (block2 && uniqueItems12.has(block2)) {
              enabled26 = true;
              continue;
            }
            if (block2 && !uniqueItems9.has(block2)) {
              isFinite4(null, {
                block: block2,
                gone: true,
                blockRev: rev,
                parent: parent,
              });
              items4.push(items3[items3.length - 1]);
            } else {
              if (block2) {
                leftBehind = true;
                behind.add(block2);
              }
            }
            if (block2) {
              enabled26 = true;
            }
            continue;
          }
          if (node2.name === `gap`) {
            let last: Dynamic = node2.attrs.last;
            after =
              typeof last == `string` && last !== `` && !last.startsWith(`.`)
                ? last
                : undefined;
            let number2 = Number(node2.attrs.blocks);
            if (Number.isFinite(number2)) {
              index5 += number2;
            } else {
              enabled27 = false;
            }
            continue;
          }
          if (uniqueItems7.has(node2.name)) continue;
          let block: Dynamic = node2.attrs.id ?? null;
          let record4: Dynamic =
            after === undefined
              ? enabled27
                ? {
                    index: index5,
                    parent: parent,
                  }
                : {}
              : {
                  after: after,
                  parent: parent,
                };
          index5 += 1;
          if (block !== null && !resolveEditorExtensionsSome3(node2)) {
            let number2 = Number(node2.attrs.rev);
            let blockRev: Dynamic = Number.isFinite(number2) ? number2 : rev;
            let helloDImport3: Dynamic = helloDImport2(node2);
            if (
              [...helloDImport3].some(
                (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  uniqueItems9.has(item),
              )
            ) {
              if (!loadDataOperationControlVerdictHandler32(block, blockRev)) {
                leftBehind = true;
              }
              if ((this.comparedRevs.get(block) ?? -1) < blockRev) {
                this.comparedRevs.set(block, blockRev);
                if (this.comparedRevs.size > 512) {
                  this.comparedRevs.delete(
                    this.comparedRevs.keys().next().value,
                  );
                }
                this.comparing.set(
                  block,
                  [...helloDImport3].filter(
                    (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                      item !== block && uniqueItems9.has(item),
                  ),
                );
                isFinite4(node2, {
                  block: block,
                  blockRev: blockRev,
                  compare: true,
                });
              }
            } else if (
              !((this.handedRevs.get(block) ?? -1) >= blockRev) &&
              !(
                under > 0 &&
                this.heldWords === 0 &&
                loadDataOperationControlVerdictHandler32(block, blockRev) &&
                this.handedRevs.get(block) === undefined &&
                blockRev <= this.ackedRev
              )
            ) {
              let record5: Dynamic = uniqueItems12.has(block)
                ? {
                    ...record4,
                    moved: true,
                  }
                : record4;
              if (!(`after` in record4) && !(`index` in record4)) {
                leftBehind = true;
                behind.add(block);
              } else {
                this.behindPlace.set(block, record5);
                let blockCoolEntry: Dynamic = this.blockCool.get(block);
                if (blockCoolEntry?.stuck) {
                  blockCoolEntry.stuck = false;
                }
              }
              isFinite4(node2, {
                block: block,
                blockRev: blockRev,
                ...record5,
              });
              this.handedRevs.set(block, blockRev);
              if (this.handedRevs.size > 512) {
                this.handedRevs.delete(this.handedRevs.keys().next().value);
              }
              if (
                !loadDataOperationControlVerdictHandler31(node2) &&
                Number.isFinite(number2) &&
                resolveEditorExtensionsSess(block)?.sess !==
                  operationScope.dataOperationControlVerdict.session.get()
                    ?.label
              ) {
                this.bornBehind.set(block, number2);
                if (this.bornBehind.size > 512) {
                  this.bornBehind.delete(this.bornBehind.keys().next().value);
                }
              }
            }
            enabled26 = true;
            after = block;
            continue;
          }
          if (block === null) leftBehind = true;
          else {
            let itemsCount: Dynamic = items3.length;
            lookup6.set(node2, node);
            let isFinite6: Dynamic = isFinite5(node2, block);
            let amount = `after` in record4 || `index` in record4;
            let hasBlock: Dynamic = uniqueItems12.has(block);
            let enabled28 =
              !hasBlock &&
              matchesUniqueItemsCount &&
              uniqueItems13.size > (lookup3.get(block) ?? 0);
            let enabled29: Dynamic =
              !hasBlock &&
              !enabled28 &&
              uniqueItems11.size > 0 &&
              node2.children.some(
                (children?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  loadDataOperationControlVerdictHandler30(children) &&
                  !uniqueItems7.has(children.name) &&
                  !!children.attrs.id &&
                  uniqueItems12.has(children.attrs.id),
              );
            if (amount && (hasBlock || enabled28 || enabled29)) {
              isFinite4(
                null,
                {
                  block: block,
                  moved: true,
                  ...(hasBlock
                    ? {}
                    : {
                        orphan: true,
                      }),
                  shell: filterEditorExtensionsGap(
                    node2,
                    uniqueItems8.has(node.name) ? node : null,
                  ),
                  blockRev: rev,
                  ...record4,
                },
                itemsCount,
              );
            }
            if (amount) {
              this.behindPlace.set(
                block,
                hasBlock
                  ? {
                      ...record4,
                      moved: true,
                    }
                  : record4,
              );
            }
            let number2 = Number(node2.attrs.rev);
            if (
              isFinite6 ||
              (hasBlock && amount) ||
              (enabled28 &&
                amount &&
                !(
                  Number.isFinite(number2) &&
                  (!Number.isFinite(since) || number2 > since)
                ))
            ) {
              enabled26 = true;
            } else {
              leftBehind = true;
              behind.add(block);
            }
          }
          after = block ?? undefined;
        }
        if (enabled27)
          for (let loadDataOperationControlVerdictResult23 of items4 as Dynamic)
            loadDataOperationControlVerdictResult23.siblings = index5;
        if (enabled27) {
          lookup4.set(node, index5);
        }
        if (items4.length > 0) {
          lookup5.set(node, items4);
        }
        return enabled26;
      };
      isFinite5(loadDataOperationControlVerdictResult22, null);
      if (
        Number.isFinite(since) &&
        resolveEditorExtensionsFrom6(loadDataOperationControlVerdictResult22)
          .length === 0
      ) {
        for (let [block, rev2] of this.bornBehind as Dynamic)
          if (
            (rev2 <= since && this.bornBehind.delete(block),
            !(
              rev2 <= since ||
              rev2 > rev ||
              uniqueItems10.has(block) ||
              uniqueItems11.has(block)
            ))
          ) {
            if (uniqueItems9.has(block)) {
              leftBehind = true;
              behind.add(block);
              continue;
            }
            reportOperationEvent(`delta.died_behind`, {
              block: block,
              rev: rev2,
              since: since,
              at: rev,
            });
            isFinite4(null, {
              block: block,
              gone: true,
              blockRev: rev,
            });
            this.bornBehind.delete(block);
            this.handedRevs.delete(block);
            this.holed.delete(block);
            this.declinedHoles.delete(block);
            this.uncoolBlock(block);
          }
      }
      for (let [
        loadDataOperationControlVerdictResult23,
        loadDataOperationControlVerdictResult24,
      ] of lookup5 as Dynamic) {
        let lookupEntry: Dynamic = lookup6.get(
          loadDataOperationControlVerdictResult23,
        );
        if (!(!lookupEntry || !lookup4.has(lookupEntry)))
          for (let loadDataOperationControlVerdictResult25 of loadDataOperationControlVerdictResult24 as Dynamic)
            Object.assign(loadDataOperationControlVerdictResult25, {
              upParent:
                lookupEntry === loadDataOperationControlVerdictResult22
                  ? null
                  : (lookupEntry.attrs.id ?? null),
              upSiblings: lookup4.get(lookupEntry),
            });
      }
      findLastIndex();
      if (!leftBehind) {
        this.lastRev = Math.max(this.lastRev, rev);
        this.shownRev = Math.max(this.shownRev, rev);
        this.drainParked();
      }
      return {
        handed: handed,
        leftBehind: leftBehind,
        behind: behind,
      };
    },
  };
  return methods;
}
