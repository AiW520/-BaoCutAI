/** BaoCut: data operation control from app-core-BE6n4d7F.js. */
import type { Dynamic } from "./types";
import {
  resolveEditorExtensionsSess,
  resolveEditorExtensionsValue22,
} from "./platform-core-editor-extensions-2";
import {
  isDataModelSchemasCount,
  resolveDataModelSchemasBlocks,
  resolveDataModelSchemasValue22,
} from "./platform-core-data-model-schemas-4";
import {
  reportOperationEvent,
} from "./platform-core-observability-boot";
import {
  resolveDataOperationControlOps,
} from "./platform-core-data-operation-control-1";
import {
  DataOperationControlCell,
  DataOperationControlState7,
  DataOperationControlState8,
  dataOperationControlSet6,
  dataOperationControlSet7,
  dataOperationControlSet8,
  dataOperationControlValue50003,
  resolveDataOperationControlTest3,
} from "./platform-core-data-operation-control-2";

var dataOperationControlWeakMap: Dynamic;

var dataOperationControlIdentifierPattern2: RegExp;

var resolveDataOperationControlSure: Dynamic;

var isDataOperationControlDeny9: Dynamic;

var dataOperationControlSet11: Dynamic;

var dataOperationControlSet12: Dynamic;

var resolveDataOperationControlSome2: Dynamic;

var dataOperationControlSet13: Dynamic;

var dataOperationControlSet14: Dynamic;

var dataOperationControlSet15: Dynamic;

var dataOperationControlSet16: Dynamic;

var dataOperationControlValue256: number;

var resolveDataOperationControlAnchorGone: Dynamic;

var dataOperationControlPattern8: RegExp;

var dataOperationControlIdentifierPattern3: RegExp;

var dataOperationControlIdentifierPattern4: RegExp;

var dataOperationControlSet17: Dynamic;

var DataOperationControlIdRefused: string;

function resolveDataOperationControlHeader(
  operation?: Dynamic,
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let source: Dynamic = isPlainRecord(operation.source)
    ? operation.source
    : undefined;
  let from: Dynamic =
    source && isPlainRecord(source.from) ? source.from : undefined;
  let content: Dynamic =
    from?.kind === `inline` && Array.isArray(from.content) ? from.content : [];
  let ids: Dynamic =
    isPlainRecord(operation.ids) && typeof operation.ids.from == `string`
      ? operation.ids
      : undefined;
  let number2 = Number(ids?.count);
  if (
    operation.op !== `insert` ||
    source?.as !== `blocks` ||
    !ids ||
    !Number.isInteger(number2) ||
    content.length !== 1 ||
    items.length === 0 ||
    !content.every(
      (node?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        isPlainRecord(node) &&
        node.type === `tableRow` &&
        Array.isArray(node.content) &&
        node.content.length > 0,
    )
  )
    return null;
  let editorExtensionsSess: Dynamic = resolveEditorExtensionsSess(ids.from);
  if (
    !editorExtensionsSess ||
    !items.every(
      (
        rolldownRImport2?: Dynamic,
        index?: Dynamic,
        ..._extraArguments: unknown[]
      ) => {
        let editorExtensionsSess2: Dynamic =
          resolveEditorExtensionsSess(rolldownRImport2);
        return (
          editorExtensionsSess2 !== null &&
          editorExtensionsSess2.sess === editorExtensionsSess.sess &&
          editorExtensionsSess2.i === editorExtensionsSess.i + number2 + index
        );
      },
    )
  )
    return null;
  let length2 = items.length / 2;
  if (!Number.isInteger(length2) || length2 < 1) return null;
  let content2: Dynamic = [];
  for (let node of content as Dynamic) {
    let content3: Dynamic = node.content;
    let contentItem: Dynamic = content3[content3.length - 1];
    let type: Dynamic =
      isPlainRecord(contentItem) && typeof contentItem.type == `string`
        ? contentItem.type
        : DataOperationControlCell;
    let isPlainRecord2: Dynamic =
      isPlainRecord(contentItem) &&
      isPlainRecord(contentItem.attrs) &&
      contentItem.attrs.header === true;
    let resolveDataOperationControlHeaderHandler: Dynamic = (
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      type: type,
      ...(isPlainRecord2
        ? {
            attrs: {
              header: true,
            },
          }
        : {}),
      content: [
        {
          type: `paragraph`,
        },
      ],
    });
    content2.push(
      Object.assign({}, node, {
        content: [
          ...content3,
          ...Array.from<Dynamic, Dynamic>(
            {
              length: length2,
            },
            resolveDataOperationControlHeaderHandler,
          ),
        ],
      }),
    );
  }
  return {
    ...operation,
    source: {
      ...source,
      from: {
        ...from,
        content: content2,
      },
    },
    ids: {
      ...ids,
      count: number2 + items.length,
    },
  };
}

function resolveDataOperationControlInline(
  operation?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let source: Dynamic = isPlainRecord(operation.source)
    ? operation.source
    : undefined;
  let from: Dynamic =
    source && isPlainRecord(source.from) ? source.from : undefined;
  let content: Dynamic =
    from?.kind === `inline` && Array.isArray(from.content) ? from.content : [];
  return (
    operation.op === `insert` &&
    content.length > 0 &&
    content.every(
      (content2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        isPlainRecord(content2) &&
        typeof content2.type == `string` &&
        dataOperationControlSet6.has(content2.type),
    )
  );
}

var DataOperationControlMessage16: string;

var dataOperationControlPattern9: RegExp;

var resolveDataOperationControlReplace2: Dynamic;

var resolveDataOperationControlAsOf: Dynamic;

var resolveDataOperationControlIsInteger2: Dynamic;

var isPlainRecord: Dynamic;

var dataOperationControlSet18: Dynamic;

var dataOperationControlPattern10: RegExp;

var resolveDataOperationControlDeny: Dynamic;

var resolveDataOperationControlUnavailable: Dynamic;

var resolveDataOperationControlFrom: Dynamic;

var resolveDataOperationControlChildren: Dynamic;

var resolveDataOperationControlParentId: Dynamic;

var resolveDataOperationControlReduce: Dynamic;

var resolveDataOperationControlBlocks2: Dynamic;

var resolveDataOperationControlBlocks3: Dynamic;

function updateDataOperationControlBid(
  updateDataOperationControlBid2?: Dynamic,
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let join: Dynamic = (
    node?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    typeof node == `string`
      ? node
      : Array.isArray(node)
        ? node
            .map(join)
            .filter(
              (
                mappedRolldownNImport?: Dynamic,
                ..._extraArguments: unknown[]
              ) => mappedRolldownNImport !== ``,
            )
            .join(
              node.some(
                (
                  rolldownNImport2?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  isPlainRecord(rolldownNImport2) &&
                  typeof rolldownNImport2.type == `string` &&
                  rolldownNImport2.type !== `text`,
              )
                ? `
`
                : ``,
            )
        : isPlainRecord(node)
          ? typeof node.text == `string`
            ? node.text
            : join(node.content)
          : ``;
  let lookup: Dynamic = new (Map as Dynamic)();
  let lookup2: Dynamic = new (Map as Dynamic)();
  for (let updateDataOperationControlBidResult of updateDataOperationControlBid2 as Dynamic) {
    let updateDataOperationControlBidResult2: Dynamic =
      updateDataOperationControlBidResult;
    if (
      updateDataOperationControlBidResult2.op !== `insert` &&
      updateDataOperationControlBidResult2.op !== `replace`
    )
      continue;
    let source: Dynamic = isPlainRecord(
      updateDataOperationControlBidResult2.source,
    )
      ? updateDataOperationControlBidResult2.source
      : isPlainRecord(updateDataOperationControlBidResult2.with)
        ? updateDataOperationControlBidResult2.with
        : null;
    let contentText: Dynamic = join(
      (source && isPlainRecord(source.from) ? source.from : null)?.content,
    );
    if (contentText === ``) continue;
    let target: Dynamic = isPlainRecord(
      updateDataOperationControlBidResult2.target,
    )
      ? updateDataOperationControlBidResult2.target
      : null;
    let itemItem: Dynamic =
      target?.kind === `chars` && items?.length === 1 ? items[0] : null;
    lookup.set(
      itemItem,
      (lookup.get(itemItem) ?? ``) +
        (lookup.has(itemItem) && itemItem === null
          ? `
`
          : ``) +
        contentText,
    );
    if (itemItem !== null && !lookup2.has(itemItem)) {
      let range: Dynamic = Array.isArray(target?.range) ? target.range : [];
      lookup2.set(
        itemItem,
        updateDataOperationControlBidResult2.op === `insert` &&
          updateDataOperationControlBidResult2.side === `after` &&
          typeof range[0] == `string`
          ? range[0]
          : null,
      );
    }
  }
  let items2: Dynamic = [];
  for (let [bid, text] of lookup as Dynamic)
    items2.push(
      bid === null
        ? {
            bid: bid,
            text: text,
          }
        : {
            bid: bid,
            text: text,
            afterId: lookup2.get(bid) ?? null,
          },
    );
  return items2;
}

function resolveDataOperationControlText(
  items?: Dynamic,
  options: Dynamic = [],
  ..._extraArguments: unknown[]
): Dynamic {
  let items2: Dynamic = [];
  for (let index = 0; index < items.length; index++) {
    let itemItem: Dynamic = items[index];
    if (itemItem.op !== `insert` && itemItem.op !== `replace`) continue;
    let source: Dynamic = isPlainRecord(itemItem.source)
      ? itemItem.source
      : isPlainRecord(itemItem.with)
        ? itemItem.with
        : null;
    let from: Dynamic =
      source && isPlainRecord(source.from) ? source.from : null;
    let text: Dynamic = typeof from?.content == `string` ? from.content : null;
    if (text === ``) continue;
    let target: Dynamic = isPlainRecord(itemItem.target)
      ? itemItem.target
      : null;
    let range: Dynamic = Array.isArray(target?.range) ? target.range : [];
    if (
      text === null ||
      itemItem.op !== `insert` ||
      target?.kind !== `chars` ||
      itemItem.side !== `after` ||
      typeof range[0] != `string`
    )
      return null;
    items2.push({
      text: text,
      afterId: range[0],
      ids: options[index] ?? [],
    });
  }
  return items2;
}

function resolveDataOperationControlChars3(
  dataOperationControlChars3?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  for (let event of dataOperationControlChars3 as Dynamic) {
    let target: Dynamic = isPlainRecord(event.target) ? event.target : null;
    let range: Dynamic =
      target?.kind === `chars` && Array.isArray(target.range)
        ? target.range
        : target?.kind === `chars` && Array.isArray(target.runs)
          ? target.runs.flat()
          : [];
    for (let resolveDataOperationControlChars3Result of range as Dynamic)
      if (typeof resolveDataOperationControlChars3Result == `string`) {
        items.push(resolveDataOperationControlChars3Result);
      }
  }
  return [...new (Set as Dynamic)(items)];
}

var dataOperationControlSet19: Dynamic;

var dataOperationControlSet20: Dynamic;

var dataOperationControlSet21: Dynamic;

var resolveDataOperationControlChars4: Dynamic;

var resolveDataOperationControlDelete2: Dynamic;

var dataOperationControlSet22: Dynamic;

var resolveDataOperationControlBlocks4: Dynamic;

var resolveDataOperationControlReplace3: Dynamic;

var filterDataOperationControlContent: Dynamic;

var resolveDataOperationControlInsert: Dynamic;

var isDataOperationControlRevive: Dynamic;

var resolveDataOperationControlRevive: Dynamic;

var resolveDataOperationControlIds: Dynamic;

var isDataOperationControlAfter: Dynamic;

var resolveDataOperationControlSplit: (operation?: Dynamic, ..._extraArguments: unknown[]) => boolean;

var resolveDataOperationControlFormat: (operation?: Dynamic, ..._extraArguments: unknown[]) => boolean;

var resolveDataOperationControlChars5: Dynamic;

var resolveDataOperationControlRemove: Dynamic;

var isDataOperationControlSome: Dynamic;

var resolveDataOperationControlInsert2: Dynamic;

var isDataOperationControlSome2: Dynamic;

var resolveDataOperationControlText2: Dynamic;

var resolveDataOperationControlInsert3: Dynamic;

var isDataOperationControlChars: Dynamic;

function resolveDataOperationControlKStart(
  dataOperationControlKStart?: Dynamic,
  options: Dynamic = (..._extraArguments: unknown[]) => 1,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  let count: Dynamic = 2;
  let count2: Dynamic = 0;
  let enabled: Dynamic = false;
  let items2: Dynamic = [];
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let uniqueItems2: Dynamic = new (Set as Dynamic)();
  dataOperationControlKStart.forEach(
    (
      rolldownNImport2?: Dynamic,
      kStart?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let max = Math.max(1, options(rolldownNImport2));
      let total =
        Math.max(
          resolveDataModelSchemasValue22(rolldownNImport2),
          resolveDataModelSchemasBlocks(rolldownNImport2),
        ) +
        48 * (max - 1) +
        1;
      let at2: Dynamic = items.at(-1);
      let dataOperationControlRevive: Dynamic =
        resolveDataOperationControlRevive(rolldownNImport2);
      if (
        !at2 ||
        dataOperationControlRevive ||
        enabled ||
        count2 + max > DataOperationControlState7 ||
        count + total > DataOperationControlState8 ||
        isDataOperationControlAfter(rolldownNImport2, items2) ||
        (resolveDataOperationControlFormat(rolldownNImport2) &&
          (at2.ops.some(resolveDataOperationControlSplit) ||
            (at2.ops.some(resolveDataOperationControlInsert3) &&
              !isDataOperationControlChars(rolldownNImport2, items2)))) ||
        isDataOperationControlSome(rolldownNImport2, at2.ops, uniqueItems) ||
        isDataOperationControlSome2(rolldownNImport2, at2.ops, uniqueItems2)
      ) {
        items.push({
          kStart: kStart,
          ops: [],
        });
        count = 2;
        count2 = 0;
        items2 = [];
      }
      items.at(-1).ops.push(rolldownNImport2);
      count += total;
      count2 += max;
      enabled = dataOperationControlRevive;
      (items2.push as Dynamic)(
        ...resolveDataOperationControlIds(rolldownNImport2),
      );
      let dataOperationControlRemove: Dynamic =
        resolveDataOperationControlRemove(rolldownNImport2);
      if (dataOperationControlRemove !== null) {
        uniqueItems.add(dataOperationControlRemove);
      }
      for (let resolveDataOperationControlKStartResult of resolveDataOperationControlInsert2(
        rolldownNImport2,
      ) as Dynamic)
        uniqueItems2.add(resolveDataOperationControlKStartResult);
    },
  );
  return items;
}

function resolveDataOperationControlMinted4(
  dataOperationControlMinted4?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let edit: Dynamic = isPlainRecord(dataOperationControlMinted4.edit)
    ? dataOperationControlMinted4.edit
    : dataOperationControlMinted4;
  let rev: Dynamic = typeof edit.rev == `number` ? edit.rev : undefined;
  let isArray: Dynamic =
    Array.isArray(edit.results) &&
    edit.results.some(
      (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        isPlainRecord(result) && result.elided === true,
    );
  if (
    rev === undefined ||
    edit.elided === true ||
    isArray ||
    !Array.isArray(edit.final)
  )
    return null;
  let revFirst: Dynamic =
    [edit.revFirst, edit.rev_first].find(
      (item2?: unknown, ..._extraArguments: unknown[]) =>
        typeof item2 == `number`,
    ) ?? rev;
  let results: Dynamic = Array.isArray(edit.results)
    ? edit.results
    : [
        {
          minted: edit.minted ?? [],
          retired: edit.retired ?? [],
        },
      ];
  let item =
    [edit.by, edit.sess].find(
      (item2?: unknown, ..._extraArguments: unknown[]) =>
        typeof item2 == `string`,
    ) ?? ``;
  let record2: Dynamic = {
    opId: typeof edit.opId == `string` ? edit.opId : ``,
    healed: edit.healed,
    notices: edit.notices,
  };
  return {
    rev: rev,
    revFirst: revFirst,
    by: item,
    ops: edit.final,
    results: results,
    ...record2,
  };
}

var resolveDataOperationControlEdit: Dynamic;

var dataOperationControlSet23: Dynamic;

var resolveDataOperationControlReshaped: Dynamic;

var resolveDataOperationControlBlockDead: Dynamic;

function resolveDataOperationControlFlat(
  dataOperationControlFlat?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dataOperationControlFlat2: Dynamic = dataOperationControlFlat;
  if (typeof dataOperationControlFlat2.id == `string`) return 1;
  if (Array.isArray(dataOperationControlFlat2.ids))
    return dataOperationControlFlat2.ids.flat(2).length;
  if (
    isPlainRecord(dataOperationControlFlat2.ids) &&
    typeof dataOperationControlFlat2.ids.from == `string`
  ) {
    let number2 = Number(dataOperationControlFlat2.ids.count);
    return Number.isInteger(number2) && number2 > 0 ? number2 : 0;
  }
  return 0;
}

var resolveDataOperationControlIsInteger3: Dynamic;

function resolveDataOperationControlFlat2(
  dataOperationControlFlat2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let count: Dynamic = 0;
  let minted: Dynamic = dataOperationControlFlat2?.minted;
  if (minted === undefined) count = resolveDataOperationControlFlat(options);
  else if (Array.isArray(minted))
    for (let resolveDataOperationControlFlat2Result of minted.flat(
      3,
    ) as Dynamic)
      count +=
        typeof resolveDataOperationControlFlat2Result == `string`
          ? 1
          : isPlainRecord(resolveDataOperationControlFlat2Result)
            ? resolveDataOperationControlIsInteger3(
                resolveDataOperationControlFlat2Result.gap ??
                  resolveDataOperationControlFlat2Result.count ??
                  resolveDataOperationControlFlat2Result.len,
              )
            : 1 / 0;
  else if (isPlainRecord(minted))
    count += resolveDataOperationControlIsInteger3(minted.count ?? minted.len);
  else return 1 / 0;
  for (let resolveDataOperationControlFlat2Result of [
    dataOperationControlFlat2?.run,
    dataOperationControlFlat2?.span,
  ] as Dynamic)
    if (resolveDataOperationControlFlat2Result !== undefined) {
      count = Math.max(
        count,
        isPlainRecord(resolveDataOperationControlFlat2Result)
          ? resolveDataOperationControlIsInteger3(
              resolveDataOperationControlFlat2Result.count ??
                resolveDataOperationControlFlat2Result.len,
            )
          : 1 / 0,
      );
    }
  return count;
}

function filterDataOperationControlFilter2(
  filterDataOperationControlFilter22?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let filterDataOperationControlFilter23: Dynamic =
    filterDataOperationControlFilter22;
  if (typeof filterDataOperationControlFilter23.id == `string`)
    return [filterDataOperationControlFilter23.id];
  if (Array.isArray(filterDataOperationControlFilter23.ids))
    return filterDataOperationControlFilter23.ids
      .flat(2)
      .filter(
        (flat?: unknown, ..._extraArguments: unknown[]) =>
          typeof flat == `string`,
      );
  if (
    isPlainRecord(filterDataOperationControlFilter23.ids) &&
    typeof filterDataOperationControlFilter23.ids.from == `string`
  ) {
    let editorExtensionsSess: Dynamic = resolveEditorExtensionsSess(
      filterDataOperationControlFilter23.ids.from,
    );
    let length2 = Number(filterDataOperationControlFilter23.ids.count);
    if (
      editorExtensionsSess &&
      Number.isInteger(length2) &&
      length2 > 0 &&
      length2 <= 2e4
    )
      return Array.from<Dynamic, Dynamic>(
        {
          length: length2,
        },
        (
          filterDataOperationControlFilter24?: unknown,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ) =>
          resolveEditorExtensionsValue22(
            editorExtensionsSess.sess,
            editorExtensionsSess.i + options,
          ),
      );
  }
  return [];
}

var resolveDataOperationControlRev: Dynamic;

var isDataOperationControlFind: Dynamic;

function collectDataOperationControlOps(
  collectDataOperationControlOps2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let options2: Dynamic = isPlainRecord(options) ? options : {};
  let isDataOperationControlFind2: Dynamic = isDataOperationControlFind(
    collectDataOperationControlOps2,
    options,
    context,
  );
  if (!isDataOperationControlFind2) return null;
  let isArray: Dynamic =
    Array.isArray(isDataOperationControlFind2.results) &&
    isDataOperationControlFind2.results.some(
      (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        isPlainRecord(result) && result.elided === true,
    );
  if (isDataOperationControlFind2.elided === true || isArray) return `elided`;
  let item: Dynamic = [
    isDataOperationControlFind2.aimedOps,
    isDataOperationControlFind2.aimed_ops,
    isDataOperationControlFind2.ops,
    isDataOperationControlFind2.final,
  ].find(Array.isArray);
  if (
    !item ||
    item.length === 0 ||
    !item.every(
      (operation?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        isPlainRecord(operation) && typeof operation.op == `string`,
    )
  )
    return null;
  let { ops: ops, from: dataOperationControlOps }: Dynamic =
    resolveDataOperationControlOps(item);
  let actor: Dynamic = isPlainRecord(collectDataOperationControlOps2.actor)
    ? collectDataOperationControlOps2.actor
    : {};
  let rev =
    [
      isDataOperationControlFind2.rev,
      options2.rev,
      collectDataOperationControlOps2.rev,
    ].find(
      (item3?: unknown, ..._extraArguments: unknown[]) =>
        typeof item3 == `number`,
    ) ?? 0;
  let revFirst: Dynamic =
    resolveDataOperationControlRev(isDataOperationControlFind2)?.revFirst ?? 0;
  let item2: Dynamic =
    [
      actor.sess,
      isDataOperationControlFind2.sess,
      isDataOperationControlFind2.by,
    ].find(
      (item3?: unknown, ..._extraArguments: unknown[]) =>
        typeof item3 == `string` && item3 !== ``,
    ) ?? ``;
  let opId: Dynamic =
    [
      collectDataOperationControlOps2.opId,
      isDataOperationControlFind2.opId,
    ].find(
      (item3?: unknown, ..._extraArguments: unknown[]) =>
        typeof item3 == `string` && item3 !== ``,
    ) ?? ``;
  let isArray2 =
    Array.isArray(isDataOperationControlFind2.results) &&
    isDataOperationControlFind2.results.length === item.length;
  let collectDataOperationControlOpsHandler: Dynamic = (
    collectDataOperationControlOps3?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    ops[collectDataOperationControlOps3] !==
      item[dataOperationControlOps[collectDataOperationControlOps3]] &&
    item[dataOperationControlOps[collectDataOperationControlOps3]].op ===
      `text`;
  let collectDataOperationControlOpsHandler2: Dynamic = (
    collectDataOperationControlOps3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let resultItem: Dynamic = isArray2
      ? isDataOperationControlFind2.results[
          dataOperationControlOps[collectDataOperationControlOps3]
        ]
      : undefined;
    if (isPlainRecord(resultItem))
      return collectDataOperationControlOpsHandler(
        collectDataOperationControlOps3,
      )
        ? ops[collectDataOperationControlOps3].op === `delete` &&
          Array.isArray(resultItem.retired)
          ? {
              retired: resultItem.retired,
            }
          : undefined
        : resultItem;
  };
  let count: Dynamic = 0;
  for (let index = 0; index < ops.length && count <= 2e4; index++)
    count += resolveDataOperationControlFlat2(
      collectDataOperationControlOpsHandler2(index),
      ops[index],
    );
  if (count > 2e4) return `elided`;
  let results: Dynamic = ops.map(
    (
      op2?: Dynamic,
      index?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let collectDataOperationControlOpsHandler3: Dynamic =
        collectDataOperationControlOpsHandler2(index);
      return collectDataOperationControlOpsHandler3 &&
        collectDataOperationControlOpsHandler3.minted !== undefined
        ? collectDataOperationControlOpsHandler3
        : {
            ...collectDataOperationControlOpsHandler3,
            minted: filterDataOperationControlFilter2(op2),
          };
    },
  );
  let refolded: Dynamic = resolveDataOperationControlBlockDead(
    isDataOperationControlFind2.notices,
  );
  return {
    rev: rev,
    revFirst: revFirst,
    by: item2,
    opId: opId,
    ops: ops,
    results: results,
    healed: isDataOperationControlFind2.healed,
    notices: isDataOperationControlFind2.notices,
    ...(refolded === undefined
      ? {}
      : {
          refolded: refolded,
        }),
  };
}

function filterDataOperationControlSeq(
  filterDataOperationControlSeq2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  seq?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  let record2: Dynamic =
    typeof seq == `number`
      ? {
          seq: seq,
        }
      : {};
  if (isPlainRecord(filterDataOperationControlSeq2.edit))
    return typeof seq == `number`
      ? {
          ...filterDataOperationControlSeq2,
          seq: seq,
        }
      : filterDataOperationControlSeq2;
  let told: Dynamic = collectDataOperationControlOps(
    filterDataOperationControlSeq2,
    options,
    context,
  );
  let rev: Dynamic =
    isPlainRecord(options) && typeof options.rev == `number`
      ? options.rev
      : told !== null && told !== `elided` && told.rev > 0
        ? told.rev
        : undefined;
  if (rev === undefined && told === null) return;
  let actor: Dynamic = isPlainRecord(filterDataOperationControlSeq2.actor)
    ? filterDataOperationControlSeq2.actor
    : {};
  let opIds: Dynamic = Array.isArray(filterDataOperationControlSeq2.opIds)
    ? filterDataOperationControlSeq2.opIds.filter(
        (opId?: unknown, ..._extraArguments: unknown[]) =>
          typeof opId == `string`,
      )
    : [];
  let view: Dynamic =
    isPlainRecord(options) && isPlainRecord(options.view) ? options.view : null;
  let print: Dynamic =
    view && typeof view.delta == `string` && view.delta.startsWith(`<doc`)
      ? view.delta
      : undefined;
  let span: Dynamic =
    told === `elided`
      ? resolveDataOperationControlRev(
          isDataOperationControlFind(
            filterDataOperationControlSeq2,
            options,
            context,
          ) ?? {},
        )
      : null;
  return {
    ...(rev === undefined
      ? {}
      : {
          rev: rev,
        }),
    ...(typeof filterDataOperationControlSeq2.opId == `string` &&
    filterDataOperationControlSeq2.opId
      ? {
          opId: filterDataOperationControlSeq2.opId,
        }
      : {}),
    ...(opIds.length > 0
      ? {
          opIds: opIds,
        }
      : {}),
    ...(typeof actor.sess == `string` && actor.sess
      ? {
          sess: actor.sess,
        }
      : {}),
    ...(print === undefined
      ? {}
      : {
          print: print,
        }),
    ...(told === null
      ? {}
      : {
          told: told,
        }),
    ...(span
      ? {
          span: span,
        }
      : {}),
    ...record2,
  };
}

var resolveDataOperationControlFlatMap2: Dynamic;

var resolveDataOperationControlLife: (dataOperationControlLife?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolveDataOperationControlStartsWith: Dynamic;

function collectDataOperationControlContent(
  collectDataOperationControlContent2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let collectDataOperationControlContentHandler: Dynamic = (
    collectDataOperationControlContent3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    Array.isArray(collectDataOperationControlContent3)
      ? collectDataOperationControlContent3.map(
          (node?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
            if (!isPlainRecord(node)) return node;
            let record2: Dynamic = {
              ...node,
            };
            if (Array.isArray(node.marks)) {
              record2.marks = node.marks.map(
                (mark?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  isPlainRecord(mark) && typeof mark.id == `string`
                    ? {
                        ...mark,
                        id: options(mark.id),
                      }
                    : mark,
              );
            }
            if (node.content !== undefined) {
              record2.content = collectDataOperationControlContentHandler(
                node.content,
              );
            }
            return record2;
          },
        )
      : collectDataOperationControlContent3;
  let helloCImport3: Dynamic = (
    collectDataOperationControlContent3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (typeof collectDataOperationControlContent3 == `string`)
      return options(collectDataOperationControlContent3);
    if (Array.isArray(collectDataOperationControlContent3))
      return collectDataOperationControlContent3.map(helloCImport3);
    if (!isPlainRecord(collectDataOperationControlContent3))
      return collectDataOperationControlContent3;
    let record2: Dynamic = {};
    for (let [
      collectDataOperationControlContentResult,
      collectDataOperationControlContentResult2,
    ] of Object.entries(collectDataOperationControlContent3) as Dynamic)
      record2[collectDataOperationControlContentResult] =
        collectDataOperationControlContentResult === `content`
          ? collectDataOperationControlContentHandler(
              collectDataOperationControlContentResult2,
            )
          : helloCImport3(collectDataOperationControlContentResult2);
    return record2;
  };
  return helloCImport3(collectDataOperationControlContent2);
}

var getDataOperationControlSize: Dynamic;

var resolveDataOperationControlBid: Dynamic;

var resolveDataOperationControlValue30: (dataOperationControlValue30?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolveDataOperationControlRevive2: (operation?: Dynamic, ..._extraArguments: unknown[]) => boolean;

var collectDataOperationControlSome: Dynamic;

var resolveDataOperationControlOps2: Dynamic;

var updateDataOperationControlEditorSaid: Dynamic;

var dataOperationControlPattern11: RegExp;

var resolveDataOperationControlExec: Dynamic;

var resolveDataOperationControlBatchesDone: Dynamic;

var resolveDataOperationControlFlat3: Dynamic;

var resolveDataOperationControlSome3: Dynamic;

var isDataOperationControlBatchesDone: Dynamic;

function isDataOperationControlLabel(
  dataOperationControlLabel?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let label = `bongo.op-sess:${options}`;
  let isDataOperationControlLabelResult: Dynamic = null;
  let enabled = false;
  let lookup: Dynamic = new (Map as Dynamic)();
  try {
    lookup =
      dataOperationControlWeakMap.get(dataOperationControlLabel) ?? lookup;
    dataOperationControlWeakMap.set(dataOperationControlLabel, lookup);
  } catch {}
  let isDataOperationControlLabelHandler: Dynamic = (
    dataOperationControlLabel2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => (
    dataOperationControlLabel2 !== null &&
      dataOperationControlLabel2.hwm >
        (lookup.get(`${label}|${dataOperationControlLabel2.label}`) ?? -1) &&
      lookup.set(
        `${label}|${dataOperationControlLabel2.label}`,
        dataOperationControlLabel2.hwm,
      ),
    dataOperationControlLabel2
  );
  let getItem: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
    let parse: Dynamic = JSON.parse(
      dataOperationControlLabel.getItem(label) ?? `null`,
    );
    return !isPlainRecord(parse) ||
      typeof parse.label != `string` ||
      typeof parse.secret != `string`
      ? null
      : typeof parse.hwm == `number`
        ? {
            label: parse.label,
            secret: parse.secret,
            hwm: parse.hwm,
          }
        : null;
  };
  return {
    get(..._extraArguments: unknown[]): Dynamic {
      if (enabled) return isDataOperationControlLabelResult;
      try {
        return isDataOperationControlLabelHandler(getItem());
      } catch {
        return isDataOperationControlLabelResult;
      }
    },
    set(
      dataOperationControlLabel2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      isDataOperationControlLabelResult = isDataOperationControlLabelHandler(
        dataOperationControlLabel2,
      );
      enabled = true;
      try {
        if (dataOperationControlLabel2 === null) {
          dataOperationControlLabel.removeItem(label);
        } else {
          dataOperationControlLabel.setItem(
            label,
            JSON.stringify(dataOperationControlLabel2),
          );
        }
      } catch {}
    },
    floor: (
      dataOperationControlLabel2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => lookup.get(`${label}|${dataOperationControlLabel2}`) ?? -1,
  };
}

var DataOperationControlBongoOpWal: string;

var DataOperationControlWal: string;

function filterDataOperationControlBid(
  filterDataOperationControlBid2?: Dynamic,
  ask?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let afterId: Dynamic = ask.afterId ?? null;
  let matchesOnly = ask.only === true;
  let filteredFilterDataOperationControlBid: Dynamic =
    filterDataOperationControlBid2.filter(
      (ask3?: Dynamic, ..._extraArguments: unknown[]) =>
        ask3.bid !== ask.bid ||
        ((ask.text !== `` || matchesOnly) &&
          (ask3.afterId ?? null) !== afterId) ||
        (ask3.tray === true && ask.text === `` && !matchesOnly),
    );
  if (ask.text === ``) return filteredFilterDataOperationControlBid;
  let ask2: Dynamic = {
    bid: ask.bid,
    afterId: afterId,
    text: ask.text,
  };
  if (ask.real === true) {
    ask2.real = true;
  }
  if (ask.tray === true) {
    ask2.tray = true;
  }
  if (ask.cut) {
    ask2.cut = ask.cut;
  }
  if (ask.author !== undefined) {
    ask2.author = ask.author;
  }
  if (typeof ask.by == `string`) {
    ask2.by = ask.by;
  }
  let items: Dynamic = [...filteredFilterDataOperationControlBid, ask2];
  let difference =
    items.reduce(
      (
        accumulator?: Dynamic,
        item?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => accumulator + (item.tray === true ? 0 : 1),
      0,
    ) - 32;
  return difference <= 0
    ? items
    : items.filter(
        (item?: Dynamic, ..._extraArguments: unknown[]) =>
          item.tray === true || difference-- <= 0,
      );
}

var resolveDataOperationControlValue31: (dataOperationControlValue31?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolveDataOperationControlValue32: (dataOperationControlValue32?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolveDataOperationControlAfterId: (ask?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolveDataOperationControlBid2: Dynamic;

function resolveDataOperationControlBid3(
  dataOperationControlBid3?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies: Dynamic = false,
  argument?: Dynamic,
  argument2: Dynamic = false,
  argument3?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  let items2: Dynamic = [];
  try {
    let parse: Dynamic = JSON.parse(
      dataOperationControlBid3.getItem(options) ?? `[]`,
    );
    if (!Array.isArray(parse)) return [];
    let uniqueItems: Dynamic = new (Set as Dynamic)(
      parse.flatMap(
        (ask?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          isPlainRecord(ask) && typeof ask.bid == `string` ? [ask.bid] : [],
      ),
    );
    let index = 0;
    let count: Dynamic = 0;
    for (let ask of parse as Dynamic) {
      if (
        !isPlainRecord(ask) ||
        typeof ask.bid != `string` ||
        typeof ask.text != `string` ||
        ask.text === `` ||
        (ask.tray === true && !dependencies)
      )
        continue;
      let dataOperationControlAfterId = resolveDataOperationControlAfterId({
        bid: ask.bid,
        afterId: typeof ask.afterId == `string` ? ask.afterId : null,
        text: ask.text,
      });
      if (!(argument && !argument.has(dataOperationControlAfterId))) {
        items.push(dataOperationControlAfterId);
        argument3?.push(dataOperationControlAfterId);
        if (!(ask.tray === true && ask.bid.startsWith(`tray:cov:left.`))) {
          let bid = ``;
          do bid = resolveDataOperationControlValue32(context, ++index);
          while (uniqueItems.has(bid));
          Object.assign(ask, {
            ...(argument2 && typeof ask.by == `string` && ask.of === undefined
              ? {
                  of: ask.by,
                  was: {
                    bid: ask.bid,
                    afterId:
                      typeof ask.afterId == `string` ? ask.afterId : null,
                    ...(ask.tray === true
                      ? {
                          tray: true,
                        }
                      : {}),
                  },
                }
              : {}),
            bid: bid,
            afterId: null,
            tray: true,
          });
          count += 1;
        }
        items2.push(
          resolveDataOperationControlAfterId({
            bid: ask.bid,
            afterId: null,
            text: ask.text,
          }),
        );
      }
    }
    try {
      if (count > 0) {
        dataOperationControlBid3.setItem(options, JSON.stringify(parse));
      }
    } catch {
      return items;
    }
    return items2;
  } catch {
    return items;
  }
}

function isDataOperationControlParked(
  dataOperationControlParked?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let items: Dynamic = [];
  let dataOperationControlBid3: Dynamic = resolveDataOperationControlBid3(
    options,
    context,
    dataOperationControlParked.id,
    true,
    undefined,
    true,
    items,
  );
  if (dataOperationControlBid3.length === 0) return;
  let parkedEntry: Dynamic = dataOperationControlParked.parked.get(context);
  (dataOperationControlParked.twinStill === false
    ? dataOperationControlParked.kept
    : dataOperationControlParked.parked
  ).set(context, new (Set as Dynamic)(dataOperationControlBid3));
  if (dataOperationControlParked.twinStill === true) {
    resolveDataOperationControlTwinCbs(
      dataOperationControlParked,
      dataOperationControlBid3.filter(
        (
          dataOperationControlBid32?: Dynamic,
          index?: Dynamic,
          ..._extraArguments: unknown[]
        ) =>
          !parkedEntry?.has(dataOperationControlBid32) &&
          !parkedEntry?.has(items[index]),
      ).length,
    );
  }
}

function resolveDataOperationControlTwinCbs(
  dataOperationControlTwinCbs?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (options > 0)
    for (let resolveDataOperationControlTwinCbsResult of dataOperationControlTwinCbs.twinCbs as Dynamic)
      try {
        resolveDataOperationControlTwinCbsResult(options);
      } catch {}
}

var dataOperationControlMap: Dynamic;

function updateDataOperationControlLeft(
  event?: Dynamic,
  options?: Dynamic,
  context: Dynamic = false,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dataOperationControlValue31 = resolveDataOperationControlValue31(options);
  let dataOperationControlMapEntry: Dynamic = dataOperationControlMap.get(
    dataOperationControlValue31,
  );
  if (!dataOperationControlMapEntry) {
    let updateDataOperationControlLeftResult: Dynamic =
      (dataOperationControlMapEntry = {
        left: `own`,
        settled: null,
        later: [],
        id:
          dependencies && resolveDataOperationControlTest3(dependencies.id)
            ? dependencies.id
            : `1`,
        mark: `1`,
        mineHeld: false,
        said: new (Set as Dynamic)(),
        parked: new (Map as Dynamic)(),
        twinStill: null,
        kept: new (Map as Dynamic)(),
        keptCbs: [],
        twinCbs: [],
        waitOff: null,
        lookTimer: null,
        lookArm: null,
        holders: 0,
        taken: new (Set as Dynamic)(),
      });
    let setItem = (..._extraArguments: unknown[]): undefined => {
      if (
        !(
          !updateDataOperationControlLeftResult.mineHeld ||
          updateDataOperationControlLeftResult.left === null ||
          updateDataOperationControlLeftResult.mark ===
            updateDataOperationControlLeftResult.id ||
          dataOperationControlMap.get(dataOperationControlValue31) !==
            updateDataOperationControlLeftResult
        )
      ) {
        updateDataOperationControlLeftResult.mark =
          updateDataOperationControlLeftResult.id;
        try {
          if (updateDataOperationControlLeftResult.going !== true) {
            event.setItem(
              dataOperationControlValue31,
              updateDataOperationControlLeftResult.mark,
            );
          }
        } catch {}
      }
    };
    let isDataOperationControlParked2: Dynamic = (
      updateDataOperationControlLeft2?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      isDataOperationControlParked(
        updateDataOperationControlLeftResult,
        event,
        updateDataOperationControlLeft2,
      );
    let event2 = (..._extraArguments: unknown[]): undefined => {
      if (
        updateDataOperationControlLeftResult.twinStill === false ||
        dataOperationControlMap.get(dataOperationControlValue31) !==
          updateDataOperationControlLeftResult
      )
        return;
      updateDataOperationControlLeftResult.twinStill = false;
      updateDataOperationControlLeftResult.lookTimer = null;
      for (let [
        updateDataOperationControlLeftResult2,
        updateDataOperationControlLeftResult3,
      ] of updateDataOperationControlLeftResult.parked as Dynamic)
        try {
          updateDataOperationControlLeftResult.kept.set(
            updateDataOperationControlLeftResult2,
            new (Set as Dynamic)(
              resolveDataOperationControlBid3(
                event,
                updateDataOperationControlLeftResult2,
                updateDataOperationControlLeftResult.id,
                true,
                updateDataOperationControlLeftResult3,
                true,
              ),
            ),
          );
        } catch {}
      let matchesParkedCount =
        updateDataOperationControlLeftResult.parked.size > 0;
      updateDataOperationControlLeftResult.parked.clear();
      if (matchesParkedCount)
        for (let updateDataOperationControlLeftResult2 of updateDataOperationControlLeftResult.keptCbs.splice(
          0,
        ) as Dynamic)
          try {
            updateDataOperationControlLeftResult2();
          } catch {}
    };
    let dataOperationControlMapEntry3 = (
      updateDataOperationControlLeft2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let wait: Dynamic = dependencies?.locks?.wait;
      if (
        !wait ||
        updateDataOperationControlLeftResult.twinStill !== true ||
        updateDataOperationControlLeftResult.waitOff !== null
      )
        return;
      let updateDataOperationControlLeftHandler = (
        ..._extraArguments: unknown[]
      ): undefined => undefined;
      let updateDataOperationControlLeftResult2: Dynamic =
        (updateDataOperationControlLeftResult.waitOff = (
          ..._extraArguments: unknown[]
        ) => updateDataOperationControlLeftHandler());
      let updateDataOperationControlLeftHandler2 = (
        ..._extraArguments: unknown[]
      ): undefined => {
        updateDataOperationControlLeftHandler();
        if (
          updateDataOperationControlLeftResult.waitOff ===
          updateDataOperationControlLeftResult2
        ) {
          updateDataOperationControlLeftResult.waitOff = null;
        }
      };
      try {
        wait
          .call(
            dependencies.locks,
            updateDataOperationControlLeft2,
            new (Promise as Dynamic)(
              (resolve?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                (updateDataOperationControlLeftHandler = resolve),
            ),
          )
          .then(
            (result?: Dynamic, ..._extraArguments: unknown[]) => (
              updateDataOperationControlLeftHandler2(),
              result ? event2() : undefined
            ),
            updateDataOperationControlLeftHandler2,
          );
      } catch {
        updateDataOperationControlLeftHandler2();
      }
    };
    let claim = (
      updateDataOperationControlLeft2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let reduce: Dynamic = (
        updateDataOperationControlLeft3?: Dynamic,
        ..._extraArguments: unknown[]
      ) => {
        if (
          !(
            updateDataOperationControlLeftResult.twinStill !== null ||
            dataOperationControlMap.get(dataOperationControlValue31) !==
              updateDataOperationControlLeftResult
          )
        ) {
          if (!updateDataOperationControlLeft3) return event2();
          updateDataOperationControlLeftResult.twinStill = true;
          updateDataOperationControlLeftResult.lookTimer = null;
          updateDataOperationControlLeftResult.lookArm = (
            ..._extraArguments: unknown[]
          ) => dataOperationControlMapEntry3(updateDataOperationControlLeft2);
          if (updateDataOperationControlLeftResult.holders > 0) {
            updateDataOperationControlLeftResult.lookArm();
          }
          resolveDataOperationControlTwinCbs(
            updateDataOperationControlLeftResult,
            [...updateDataOperationControlLeftResult.parked.values()].reduce(
              (
                accumulator?: Dynamic,
                item?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => accumulator + item.size,
              0,
            ),
          );
        }
      };
      try {
        (
          dependencies?.locks?.claim(
            updateDataOperationControlLeft2,
            Promise.resolve(),
          ) ?? Promise.resolve(null)
        ).then(
          (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            reduce(result === false),
          (..._extraArguments: unknown[]): Dynamic => reduce(false),
        );
      } catch {
        reduce(false);
      }
    };
    let startsWith = (
      updateDataOperationControlLeft2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        !(
          updateDataOperationControlLeft2 !== `twin` &&
          updateDataOperationControlLeft2 !== `unproven`
        )
      )
        try {
          if (typeof event.key != `function`) return;
          let label = `${DataOperationControlBongoOpWal}:words:${options}|`;
          let items: Dynamic = [];
          for (let index = 0; index < event.length; index++) {
            let key: Dynamic = event.key(index);
            if (key !== null && key.startsWith(label)) {
              items.push(key);
            }
          }
          for (let updateDataOperationControlLeftResult2 of items as Dynamic)
            if (updateDataOperationControlLeft2 === `twin`) {
              isDataOperationControlParked2(
                updateDataOperationControlLeftResult2,
              );
            } else {
              resolveDataOperationControlBid3(
                event,
                updateDataOperationControlLeftResult2,
                updateDataOperationControlLeftResult.id,
              );
            }
        } catch {}
    };
    let setItem2 = (
      updateDataOperationControlLeft2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        !(
          updateDataOperationControlLeftResult.left !== null &&
          updateDataOperationControlLeftResult.left !== `own`
        )
      ) {
        updateDataOperationControlLeftResult.left =
          updateDataOperationControlLeft2;
        updateDataOperationControlLeftResult.settled = null;
        startsWith(updateDataOperationControlLeft2);
        for (let updateDataOperationControlLeftResult2 of updateDataOperationControlLeftResult.later.splice(
          0,
        ) as Dynamic)
          try {
            updateDataOperationControlLeftResult2();
          } catch {}
        setItem();
      }
    };
    try {
      let item: Dynamic = context
        ? null
        : event.getItem(dataOperationControlValue31);
      if (item !== null) {
        let locks: Dynamic = dependencies?.locks;
        if (!locks || !resolveDataOperationControlTest3(item)) {
          setItem2(`unproven`);
        } else {
          updateDataOperationControlLeftResult.left = null;
          updateDataOperationControlLeftResult.settled =
            new (Promise as Dynamic)(
              (resolve?: Dynamic, ..._extraArguments: unknown[]): undefined => {
                let timers: Dynamic = dependencies?.timers;
                let updateDataOperationControlLeftResult2: Dynamic = null;
                let updateDataOperationControlLeftResult3: Dynamic = null;
                let enabled = false;
                let enabled2 = false;
                let count: Dynamic = 0;
                let enabled3 = false;
                let setItem3 = (
                  updateDataOperationControlLeft2?: Dynamic,
                  ..._extraArguments: unknown[]
                ): undefined => {
                  if (!enabled3) {
                    enabled3 = true;
                    if (updateDataOperationControlLeftResult2 !== null) {
                      timers?.clearTimeout(
                        updateDataOperationControlLeftResult2,
                      );
                    }
                    if (updateDataOperationControlLeftResult3 !== null) {
                      timers?.clearTimeout(
                        updateDataOperationControlLeftResult3,
                      );
                    }
                    updateDataOperationControlLeftResult2 =
                      updateDataOperationControlLeftResult3 = null;
                    setItem2(updateDataOperationControlLeft2);
                    resolve();
                  }
                };
                let setItem4: Dynamic = (..._extraArguments: unknown[]) => {
                  updateDataOperationControlLeftResult2 = null;
                  if (!enabled3) {
                    if (!enabled || (count += 1) >= 2)
                      return setItem3(`unproven`);
                    updateDataOperationControlLeftResult2 = timers.setTimeout(
                      setItem4,
                      50,
                    );
                  }
                };
                let claim2 = (
                  updateDataOperationControlLeft2: Dynamic = false,
                  ..._extraArguments: unknown[]
                ): undefined => {
                  updateDataOperationControlLeftResult3 = null;
                  if (
                    !(
                      enabled3 ||
                      enabled ||
                      (enabled2 && !updateDataOperationControlLeft2)
                    )
                  )
                    try {
                      enabled = true;
                      count = 0;
                      locks.claim(item, Promise.resolve()).then(
                        (result?: Dynamic, ..._extraArguments: unknown[]) => {
                          enabled = false;
                          if (!enabled3) {
                            if (result === true) return setItem3(`dead`);
                            if (result !== false) return setItem3(`unproven`);
                            if (updateDataOperationControlLeft2) {
                              setItem3(`twin`);
                              updateDataOperationControlLeftResult.lookArm = (
                                ..._extraArguments: unknown[]
                              ): undefined => {
                                try {
                                  if (
                                    timers &&
                                    updateDataOperationControlLeftResult.twinStill ===
                                      null &&
                                    updateDataOperationControlLeftResult.lookTimer ===
                                      null
                                  ) {
                                    updateDataOperationControlLeftResult.lookTimer =
                                      timers.setTimeout(
                                        (..._extraArguments: unknown[]) =>
                                          claim(item),
                                        dataOperationControlValue50003,
                                      );
                                  }
                                } catch {}
                              };
                              updateDataOperationControlLeftResult.lookArm();
                              return;
                            }
                            if (enabled2) return claim2(true);
                            if (
                              timers &&
                              updateDataOperationControlLeftResult2 !== null
                            ) {
                              updateDataOperationControlLeftResult3 =
                                timers.setTimeout(
                                  (..._extraArguments: unknown[]) => claim2(),
                                  50,
                                );
                            } else {
                              setItem3(`unproven`);
                            }
                          }
                        },
                        (..._extraArguments: unknown[]) => (
                          (enabled = false),
                          setItem3(`unproven`)
                        ),
                      );
                    } catch {
                      enabled = false;
                      setItem3(`unproven`);
                    }
                };
                try {
                  updateDataOperationControlLeftResult2 =
                    timers?.setTimeout(
                      (..._extraArguments: unknown[]): undefined => {
                        enabled2 = true;
                        count = 0;
                        if (updateDataOperationControlLeftResult3 !== null) {
                          timers.clearTimeout(
                            updateDataOperationControlLeftResult3,
                          );
                        }
                        updateDataOperationControlLeftResult3 = null;
                        updateDataOperationControlLeftResult2 =
                          timers.setTimeout(setItem4, 50);
                        if (!enabled) {
                          claim2(true);
                        }
                      },
                      250,
                    ) ?? null;
                } catch {
                  updateDataOperationControlLeftResult2 = null;
                }
                claim2();
              },
            );
        }
      }
      event.setItem(
        dataOperationControlValue31,
        updateDataOperationControlLeftResult.mark,
      );
      if (
        updateDataOperationControlLeftResult.id !== `1` &&
        dependencies?.locks
      )
        try {
          dependencies.locks
            .claim(
              updateDataOperationControlLeftResult.id,
              dependencies.gone ??
                new (Promise as Dynamic)(
                  (..._extraArguments: unknown[]): undefined => undefined,
                ),
            )
            .then(
              (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
                if (result === true) {
                  updateDataOperationControlLeftResult.mineHeld = true;
                  setItem();
                }
              },
              (..._extraArguments: unknown[]): undefined => undefined,
            );
        } catch {}
      (globalThis as Dynamic).addEventListener?.(
        `pagehide`,
        (..._extraArguments: unknown[]): undefined => {
          let dataOperationControlMapEntry4: Dynamic =
            dataOperationControlMap.get(dataOperationControlValue31);
          if (dataOperationControlMapEntry4) {
            dataOperationControlMapEntry4.going = true;
          }
          try {
            event.removeItem(dataOperationControlValue31);
          } catch {}
        },
      );
      (globalThis as Dynamic).addEventListener?.(
        `pageshow`,
        (
          updateDataOperationControlLeft2?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (
            !(
              !updateDataOperationControlLeft2.persisted ||
              !dataOperationControlMap.has(dataOperationControlValue31)
            )
          ) {
            dataOperationControlMap.get(dataOperationControlValue31).going =
              false;
            try {
              event.setItem(
                dataOperationControlValue31,
                dataOperationControlMap.get(dataOperationControlValue31).mark,
              );
            } catch {}
          }
        },
      );
    } catch {}
    dataOperationControlMap.set(
      dataOperationControlValue31,
      updateDataOperationControlLeftResult,
    );
  }
  dataOperationControlMapEntry.holders += 1;
  if (dataOperationControlMapEntry.holders === 1) {
    dataOperationControlMapEntry.lookArm?.();
  }
  let dataOperationControlMapEntry2: Dynamic = dataOperationControlMapEntry;
  return {
    id: dataOperationControlMapEntry2.id,
    pending: (..._extraArguments: unknown[]) =>
      dataOperationControlMapEntry2.left === null,
    settled: (..._extraArguments: unknown[]): Dynamic =>
      dataOperationControlMapEntry2.settled,
    later: (
      updateDataOperationControlLeft2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined =>
      void dataOperationControlMapEntry2.later.push(
        updateDataOperationControlLeft2,
      ),
    left: (
      updateDataOperationControlLeft2?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (dataOperationControlMapEntry2.left !== `dead` &&
        dataOperationControlMapEntry2.left !== `unproven`) ||
      dataOperationControlMapEntry2.said.has(
        `${options2}|${updateDataOperationControlLeft2}`,
      )
        ? null
        : (dataOperationControlMapEntry2.said.add(
            `${options2}|${updateDataOperationControlLeft2}`,
          ),
          dataOperationControlMapEntry2.left),
    twins: (
      updateDataOperationControlLeft2?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      dataOperationControlMapEntry2.left === `twin` &&
      !dataOperationControlMapEntry2.taken.has(updateDataOperationControlLeft2)
        ? (dataOperationControlMapEntry2.taken.add(
            updateDataOperationControlLeft2,
          ),
          true)
        : false,
    park: (
      updateDataOperationControlLeft2?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      isDataOperationControlParked(
        dataOperationControlMapEntry2,
        event,
        updateDataOperationControlLeft2,
      ),
    keptUnder: (
      updateDataOperationControlLeft2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      dataOperationControlMapEntry2.kept.get(updateDataOperationControlLeft2),
    onKept: (
      updateDataOperationControlLeft2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined =>
      void dataOperationControlMapEntry2.keptCbs.push(
        updateDataOperationControlLeft2,
      ),
    onTwinKept: (
      updateDataOperationControlLeft2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined =>
      void dataOperationControlMapEntry2.twinCbs.push(
        updateDataOperationControlLeft2,
      ),
    parkedUnder: (
      updateDataOperationControlLeft2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      dataOperationControlMapEntry2.parked.get(updateDataOperationControlLeft2),
    unproven: (
      updateDataOperationControlLeft2?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      dataOperationControlMapEntry2.left === `unproven` &&
      !dataOperationControlMapEntry2.taken.has(updateDataOperationControlLeft2)
        ? (dataOperationControlMapEntry2.taken.add(
            updateDataOperationControlLeft2,
          ),
          true)
        : false,
    own: (
      updateDataOperationControlLeft2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined =>
      void dataOperationControlMapEntry2.taken.add(
        updateDataOperationControlLeft2,
      ),
    assert(..._extraArguments: unknown[]): undefined {
      try {
        if (
          dataOperationControlMap.get(dataOperationControlValue31) ===
            dataOperationControlMapEntry2 &&
          dataOperationControlMapEntry2.going !== true &&
          event.getItem(dataOperationControlValue31) === null
        ) {
          event.setItem(
            dataOperationControlValue31,
            dataOperationControlMapEntry2.mark,
          );
        }
      } catch {}
    },
    release(..._extraArguments: unknown[]): undefined {
      if (
        !(
          --dataOperationControlMapEntry2.holders > 0 ||
          dataOperationControlMap.get(dataOperationControlValue31) !==
            dataOperationControlMapEntry2
        )
      ) {
        dataOperationControlMapEntry2.holders = 0;
        if (dataOperationControlMapEntry2.lookTimer !== null) {
          dependencies?.timers?.clearTimeout(
            dataOperationControlMapEntry2.lookTimer,
          );
        }
        dataOperationControlMapEntry2.lookTimer = null;
        dataOperationControlMapEntry2.waitOff?.();
        dataOperationControlMapEntry2.waitOff = null;
      }
    },
  };
}

var resolveDataOperationControlCatch: Dynamic;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeDataOperationControl4Step1(): void {
  (dataOperationControlWeakMap = new (WeakMap as Dynamic)());
  (dataOperationControlIdentifierPattern2 = /^(forbidden|not_allowed|unauthenticated|access|read_only|page_gone|not_your_session|session_collided|unknown_secret|unknown_session|schema_mismatch|engine_mismatch|too_old)/);
  (resolveDataOperationControlSure = (
    response?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (response.verdict !== `deny`) return null;
    let data: Dynamic = isPlainRecord(response.data) ? response.data : {};
    return (response.reason === `gone` || data.code === `gone`) &&
      data.object === `project`
      ? {
          sure: true,
        }
      : data.code !== `page_gone` && response.reason !== `page_gone`
        ? null
        : {
            sure: data.maybe !== `unborn`,
          };
  });
  (isDataOperationControlDeny9 = (
    response?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (response.verdict !== `deny`) return false;
    let data: Dynamic = isPlainRecord(response.data) ? response.data : {};
    return (
      (response.reason === `gone` || data.code === `gone`) &&
      data.object === `node` &&
      (data.id === undefined || data.id === options)
    );
  });
  (dataOperationControlSet11 = new (Set as Dynamic)([
    `doc_ceiling`,
    `doc_too_large`,
    `row_too_large`,
    `too_large`,
    `too_many`,
    `find_too_many`,
  ]));
  (dataOperationControlSet12 = new (Set as Dynamic)([
    `prose_orphan_node`,
  ]));
  (resolveDataOperationControlSome2 = (
    dataOperationControlSome2?: Dynamic,
    error?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    [dataOperationControlSome2, error.problem, error.code, error.why].some(
      (items?: unknown, ..._extraArguments: unknown[]): Dynamic =>
        typeof items == `string` &&
        items.length <= 24 &&
        dataOperationControlSet12.has(items.toLowerCase().replace(/-/g, `_`)),
    ));
  (dataOperationControlSet13 = new (Set as Dynamic)([
    `block_dead`,
    `anchor_dead`,
    `anchor_gone`,
    `already_gone`,
  ]));
  (dataOperationControlSet14 = new (Set as Dynamic)([
    `wrap`,
    `unwrap`,
    `split`,
    `join`,
    `move`,
  ]));
  (dataOperationControlSet15 = new (Set as Dynamic)([
    `unknown_target`,
    `char_gone`,
    `block_gone`,
    `unknown_id`,
    `unknown_block`,
    `not_minted`,
    `target_gone`,
  ]));
  (dataOperationControlSet16 = new (Set as Dynamic)([
    `kept_as_text`,
    `list_merged`,
    `already_live`,
    `no_record`,
    `orphan`,
    `unknown_ids`,
    `mark_skipped`,
    `block_dead`,
    `already_gone`,
    `rehomed`,
    `split_rehomed`,
    `rejoined`,
    `reshaped`,
    `degraded`,
    `not_applicable`,
    `grid_healed`,
    `unknown_target`,
    `unused_id`,
    `anchor_gone`,
  ]));
  (dataOperationControlValue256 = 256);
  (resolveDataOperationControlAnchorGone = (
    error?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    (error.code === `anchor_gone` && error.rehomed === true) ||
    (error.code === `block_dead` && error.rehomed === true) ||
    error.code === `rehomed` ||
    error.code === `split_rehomed`);
  (dataOperationControlPattern8 = /unavailable|busy|substrate_conflict|turn_timeout|timeout|overloaded|unreachable/);
  (dataOperationControlIdentifierPattern3 = /block_gone|unknown_id|unknown_block|frozen|doc_gone|deleted|forbidden|unauthorized|not_your_session|bad_request|bad_op|invalid|too_large|too_many|ceiling|schema/);
  (dataOperationControlIdentifierPattern4 = /^(bad_request|bad_at|bad_find|bad_op|op_id_conflict|guard_required|engine_mismatch|invalid_argument)$/i);
  (dataOperationControlSet17 = new (Set as Dynamic)([
    `count`,
    `order`,
  ]));
  (DataOperationControlIdRefused = `id_refused`);
  (DataOperationControlMessage16 = `~1`);
  (dataOperationControlPattern9 = /~1$/);
  (resolveDataOperationControlReplace2 = (
    dataOperationControlReplace2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    dataOperationControlReplace2
      .replace(/:\d+-\d+$/, ``)
      .replace(dataOperationControlPattern9, ``));
  (resolveDataOperationControlAsOf = (
    dataOperationControlAs?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let asOf: Dynamic = isPlainRecord(dataOperationControlAs)
      ? dataOperationControlAs.asOf
      : undefined;
    let seq: Dynamic = isPlainRecord(asOf) ? asOf.seq : undefined;
    return typeof seq == `number` && Number.isInteger(seq) && seq >= 0
      ? seq
      : undefined;
  });
  (resolveDataOperationControlIsInteger2 = (
    dataOperationControlIsInteger2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let seq: Dynamic = dataOperationControlIsInteger2.seq;
    return typeof seq == `number` && Number.isInteger(seq) && seq >= 0
      ? seq
      : undefined;
  });
  (isPlainRecord = (
    plainRecord?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof plainRecord == `object` &&
    !!plainRecord &&
    !Array.isArray(plainRecord));
  (dataOperationControlSet18 = new (Set as Dynamic)([
    `relay`,
    `http`,
    `link`,
    `lane`,
  ]));
  (dataOperationControlPattern10 = /^(?:unavailable|rate[-_ ]?limit(?:ed)?|busy|block_busy|warming|draining|storage_lagging|room_unavailable|ledger_unavailable|engine[-_]unavailable|overloaded|too[-_ ]?many[-_ ]?requests)$/i);
  (resolveDataOperationControlDeny = (
    response?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (!response || response.verdict !== `deny`) return null;
    let data: Dynamic = isPlainRecord(response.data) ? response.data : {};
    if (
      data.why === `lane` ||
      (typeof data.layer == `string` &&
        dataOperationControlSet18.has(data.layer)) ||
      data.why === `at_rev_cold` ||
      data.retryAt === `head`
    )
      return null;
    let retryAfterMs: Dynamic = data.retryAfterMs ?? response.retryAfterMs;
    let number2 = Number(retryAfterMs);
    let number3 = Number.isFinite(number2) && number2 > 0 ? number2 : 0;
    if (response.reason === `unavailable` && data.why === `busy`) return number3;
    let detail: Dynamic =
      typeof response.detail == `string`
        ? response.detail
        : typeof data.detail == `string`
          ? data.detail
          : ``;
    return dataOperationControlPattern10.test(String(response.reason)) ||
      dataOperationControlPattern10.test(String(data.code)) ||
      (retryAfterMs !== undefined && Number.isFinite(number2)) ||
      /^busy:/i.test(detail)
      ? number3
      : null;
  });
  (resolveDataOperationControlUnavailable = (
    dataOperationControlUnavailable?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let dataOperationControlDeny: Dynamic = resolveDataOperationControlDeny(
      dataOperationControlUnavailable,
    );
    if (
      dataOperationControlDeny === null ||
      !dataOperationControlUnavailable ||
      dataOperationControlUnavailable.reason !== `unavailable`
    )
      return null;
    let data: Dynamic = isPlainRecord(dataOperationControlUnavailable.data)
      ? dataOperationControlUnavailable.data
      : {};
    let detail: Dynamic =
      typeof dataOperationControlUnavailable.detail == `string`
        ? dataOperationControlUnavailable.detail
        : typeof data.detail == `string`
          ? data.detail
          : ``;
    return data.why === `busy` || /^busy:/i.test(detail)
      ? dataOperationControlDeny
      : null;
  });
  (resolveDataOperationControlFrom = (
    dataOperationControl?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let raw: Dynamic = dataOperationControl.next;
    if (!isPlainRecord(raw) || typeof raw.from != `string` || !raw.from) return;
    let parentId: Dynamic =
      typeof raw.parentId == `string` && raw.parentId ? raw.parentId : null;
    return {
      from: raw.from,
      parentId: parentId,
      raw: raw,
    };
  });
  (resolveDataOperationControlChildren = (
    node?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    for (let node2 of node.children as Dynamic) {
      if (typeof node2 == `string`) continue;
      if (node2.attrs.id === options) return node2;
      let dataOperationControlChildren: Dynamic = node2.children.length
        ? resolveDataOperationControlChildren(node2, options)
        : null;
      if (dataOperationControlChildren) return dataOperationControlChildren;
    }
    return null;
  });
  (resolveDataOperationControlParentId = (
    dataOperationControlParentId?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let children: Dynamic = (
      options.parentId === null
        ? dataOperationControlParentId
        : resolveDataOperationControlChildren(
            dataOperationControlParentId,
            options.parentId,
          )
    )?.children.find(
      (
        dataOperationControlParentId2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        typeof dataOperationControlParentId2 != `string` &&
        dataOperationControlParentId2.name === `gap` &&
        dataOperationControlParentId2.attrs.cap !== undefined,
    );
    return children ? ((children.attrs.from = options.from), true) : false;
  });
  (resolveDataOperationControlReduce = (
    node?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    node.children.reduce(
      (
        accumulator?: Dynamic,
        children?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        typeof children == `string`
          ? accumulator
          : accumulator +
            ((children.name === `gap` &&
              children.attrs.cap === undefined &&
              Number(children.attrs.blocks)) ||
              0) +
            resolveDataOperationControlReduce(children),
      0,
    ));
  (resolveDataOperationControlBlocks2 = (
    dataOperationControlBlocks2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    dataOperationControlBlocks2 !== null &&
    dataOperationControlBlocks2.blocks.length === 0 &&
    !dataOperationControlBlocks2.gone?.length &&
    !dataOperationControlBlocks2.anchors?.length &&
    (!isPlainRecord(dataOperationControlBlocks2.docJson) ||
      !Array.isArray(dataOperationControlBlocks2.docJson.content) ||
      dataOperationControlBlocks2.docJson.content.every(
        (node?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          isPlainRecord(node) &&
          typeof node.attrs?.bid != `string` &&
          !Array.isArray(node.content),
      )));
  (resolveDataOperationControlBlocks3 = (
    entry?: Dynamic,
    options: Dynamic = [],
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (Array.isArray(entry))
      entry.forEach(
        (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          resolveDataOperationControlBlocks3(rolldownNImport2, options),
      );
    else if (isPlainRecord(entry)) {
      if (entry.kind === `blocks` && Array.isArray(entry.ids)) {
        (options.push as Dynamic)(
          ...resolveDataOperationControlFlatMap2(entry.ids),
        );
      }
      for (let [
        resolveDataOperationControlBlocks3Result,
        resolveDataOperationControlBlocks3Result2,
      ] of Object.entries(entry) as Dynamic)
        if (
          resolveDataOperationControlBlocks3Result !== `content` &&
          resolveDataOperationControlBlocks3Result !== `ids`
        ) {
          resolveDataOperationControlBlocks3(
            resolveDataOperationControlBlocks3Result2,
            options,
          );
        }
    }
    return options;
  });
  (dataOperationControlSet19 = new (Set as Dynamic)([
    `unknown_id`,
    `char_gone`,
    `block_gone`,
    `not_minted`,
    `unknown_block`,
  ]));
  (dataOperationControlSet20 = new (Set as Dynamic)([
    `set`,
    `wrap`,
    `unwrap`,
    `move`,
    `join`,
    `delete`,
    `remove`,
  ]));
  (dataOperationControlSet21 = new (Set as Dynamic)([
    `join`,
    `unwrap`,
    `flatten`,
  ]));
  (resolveDataOperationControlChars4 = (
    dataOperationControlChars4?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let dataOperationControlChars42: Dynamic = dataOperationControlChars4;
    return (
      isPlainRecord(dataOperationControlChars42.target) &&
      dataOperationControlChars42.target.kind === `chars` &&
      resolveDataOperationControlDelete2(
        dataOperationControlChars42.op,
        dataOperationControlChars42.target.range,
      )
    );
  });
  (resolveDataOperationControlDelete2 = (
    dataOperationControlDelete2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    (dataOperationControlDelete2 === `delete` ||
      dataOperationControlDelete2 === `replace`) &&
    Array.isArray(options) &&
    typeof options[0] == `string` &&
    typeof options[1] == `string` &&
    options[0] !== options[1]);
  (dataOperationControlSet22 = new (Set as Dynamic)([
    `delete`,
    `replace`,
    `join`,
    `wrap`,
    `unwrap`,
    `move`,
  ]));
  (resolveDataOperationControlBlocks4 = (
    dataOperationControlBlocks4?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let dataOperationControlBlocks42: Dynamic = dataOperationControlBlocks4;
    return (
      isPlainRecord(dataOperationControlBlocks42.target) &&
      dataOperationControlBlocks42.target.kind === `blocks` &&
      dataOperationControlSet22.has(String(dataOperationControlBlocks42.op))
    );
  });
  (resolveDataOperationControlReplace3 = (
    dataOperationControlReplace3?: Dynamic,
    activity?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let dataOperationControlReplace32: Dynamic = dataOperationControlReplace3;
    if (
      dataOperationControlReplace32.op !== `replace` &&
      dataOperationControlReplace32.op !== `remove` &&
      dataOperationControlReplace32.op !== `delete`
    )
      return [];
    let at2: Dynamic = activity?.at;
    let dataOperationControlBlocks3: Dynamic = resolveDataOperationControlBlocks3(
      at2 ?? null,
    );
    let dataOperationControlBlocks32: Dynamic =
      dataOperationControlBlocks3.length > 0
        ? dataOperationControlBlocks3
        : resolveDataOperationControlBlocks3(
            dataOperationControlReplace32.target ?? null,
          );
    let retired: Dynamic = activity?.retired;
    return dataOperationControlReplace32.op === `replace` &&
      dataOperationControlBlocks32.length === 1 &&
      Array.isArray(retired)
      ? retired.includes(dataOperationControlBlocks32[0])
        ? dataOperationControlBlocks32
        : []
      : dataOperationControlBlocks32;
  });
  (filterDataOperationControlContent = (
    filterDataOperationControlContent2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let isPlainRecord2: Dynamic = (
      node?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      isPlainRecord(node) && Array.isArray(node.content)
        ? node.content.filter(isPlainRecord)
        : [];
    let helloCImport3: Dynamic = (
      filterDataOperationControlContent3?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      if (
        isPlainRecord(filterDataOperationControlContent3.attrs) &&
        (filterDataOperationControlContent3.attrs.bid === options ||
          filterDataOperationControlContent3.attrs.id === options)
      )
        return filterDataOperationControlContent3;
      for (let filterDataOperationControlContentResult of isPlainRecord2(
        filterDataOperationControlContent3,
      ) as Dynamic) {
        let helloCImport4: Dynamic = helloCImport3(
          filterDataOperationControlContentResult,
        );
        if (helloCImport4) return helloCImport4;
      }
      return null;
    };
    if (!isPlainRecord(filterDataOperationControlContent2)) return null;
    let isPlainRecord3: Dynamic = isPlainRecord2(
      filterDataOperationControlContent2,
    );
    return (
      helloCImport3(filterDataOperationControlContent2) ??
      (isPlainRecord3.length === 1 ? isPlainRecord3[0] : null)
    );
  });
  (resolveDataOperationControlInsert = (
    dataOperationControlInsert?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let dataOperationControlInsert2: Dynamic = dataOperationControlInsert;
    return dataOperationControlInsert2.op === `insert` ||
      dataOperationControlInsert2.op === `split` ||
      dataOperationControlInsert2.op === `set` ||
      dataOperationControlInsert2.op === `format`
      ? false
      : dataOperationControlInsert2.op !== `delete` ||
          dataOperationControlInsert2.target?.kind === `blocks`;
  });
  (isDataOperationControlRevive = (
    dataOperationControlRevive?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    dataOperationControlRevive.some(
      (operation?: Dynamic, index?: Dynamic, ..._extraArguments: unknown[]) => {
        if (operation.op !== `revive`) return false;
        let optionItem: Dynamic = options[index];
        return (
          (Array.isArray(optionItem?.revived) && optionItem.revived.length > 0) ||
          (Array.isArray(optionItem?.revivedAt) &&
            optionItem.revivedAt.length > 0)
        );
      },
    ));
  (resolveDataOperationControlRevive = (
    dataOperationControlRevive?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let dataOperationControlRevive2: Dynamic = dataOperationControlRevive;
    return (
      dataOperationControlRevive2.op === `revive` &&
      (dataOperationControlRevive2.blocks !== undefined ||
        dataOperationControlRevive2.block !== undefined)
    );
  });
  (resolveDataOperationControlIds = (
    dataOperationControlIds?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let {
      op: dataOperationControlIds2,
      ids: dataOperationControlIds3,
      id: dataOperationControlIds4,
    }: Dynamic = dataOperationControlIds;
    let arm: Dynamic = dataOperationControlSet8.has(
      String(dataOperationControlIds2),
    );
    let slice: Dynamic = (
      dataOperationControlIds5?: unknown,
      ..._extraArguments: unknown[]
    ) => {
      if (typeof dataOperationControlIds5 != `string`) return null;
      let lastIndexOf = dataOperationControlIds5.lastIndexOf(`.`);
      let number2 = Number(dataOperationControlIds5.slice(lastIndexOf + 1));
      return lastIndexOf > 0 && Number.isInteger(number2)
        ? {
            sess: dataOperationControlIds5.slice(0, lastIndexOf),
            i: number2,
          }
        : null;
    };
    let slice2: Dynamic = (
      dataOperationControlIds5?: Dynamic,
      count: Dynamic = 1,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      ((
        dataOperationControlIds6?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        dataOperationControlIds6
          ? [
              {
                sess: dataOperationControlIds6.sess,
                from: dataOperationControlIds6.i,
                count: count,
                arm: arm,
              },
            ]
          : [])(slice(dataOperationControlIds5));
    let itemsSlice: Dynamic = slice2(dataOperationControlIds4);
    if (Array.isArray(dataOperationControlIds3)) {
      (itemsSlice.push as Dynamic)(
        ...dataOperationControlIds3.flatMap(
          (
            dataOperationControlId?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => slice2(dataOperationControlId),
        ),
      );
    } else {
      if (
        isPlainRecord(dataOperationControlIds3) &&
        typeof dataOperationControlIds3.count == `number`
      ) {
        (itemsSlice.push as Dynamic)(
          ...slice2(
            dataOperationControlIds3.from,
            dataOperationControlIds3.count,
          ),
        );
      }
    }
    return itemsSlice;
  });
  (isDataOperationControlAfter = (
    dataOperationControlAfter?: Dynamic,
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let dataOperationControlAfter2: Dynamic = dataOperationControlAfter;
    let matchesSide =
      dataOperationControlAfter2.side === `after` ||
      dataOperationControlAfter2.side === `before`;
    let matchesSide2 =
      dataOperationControlAfter2.side === `start` ||
      dataOperationControlAfter2.side === `end`;
    if (
      dataOperationControlAfter2.op !== `insert` ||
      !(matchesSide || matchesSide2) ||
      dataOperationControlAfter2.target?.kind !== `blocks` ||
      dataOperationControlAfter2.source?.as !== `blocks` ||
      items.length === 0
    )
      return false;
    let contentItem: Dynamic = Array.isArray(
      dataOperationControlAfter2.source.from?.content,
    )
      ? dataOperationControlAfter2.source.from.content[0]
      : undefined;
    if (!dataOperationControlSet7.has(String(contentItem?.type))) return false;
    let idItem: Dynamic = dataOperationControlAfter2.target.ids?.[0];
    if (typeof idItem != `string`) return false;
    let lastIndexOf = idItem.lastIndexOf(`.`);
    let [items2, setItems]: Dynamic = [
      idItem.slice(0, lastIndexOf),
      Number(idItem.slice(lastIndexOf + 1)),
    ];
    return items.some(
      (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        (matchesSide || item.arm) &&
        item.sess === items2 &&
        setItems >= item.from &&
        setItems < item.from + item.count,
    );
  });
  (resolveDataOperationControlSplit = (
    operation?: Dynamic,
    ..._extraArguments: unknown[]
  ) => operation.op === `split`);
  (resolveDataOperationControlFormat = (
    operation?: Dynamic,
    ..._extraArguments: unknown[]
  ) => operation.op === `format`);
  (resolveDataOperationControlChars5 = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let target: Dynamic = event.target;
    return target?.kind === `chars` &&
      Array.isArray(target.range) &&
      target.range.length === 2 &&
      typeof target.range[0] == `string` &&
      target.range[0] === target.range[1]
      ? target.range[0]
      : null;
  });
  (resolveDataOperationControlRemove = (
    dataOperationControlRemove?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveDataOperationControlFormat(dataOperationControlRemove) &&
    Array.isArray(dataOperationControlRemove.remove)
      ? resolveDataOperationControlChars5(dataOperationControlRemove)
      : null);
  (isDataOperationControlSome = (
    dataOperationControlSome?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let dataOperationControlChars5: Dynamic =
      resolveDataOperationControlFormat(dataOperationControlSome) &&
      Array.isArray(dataOperationControlSome.add)
        ? resolveDataOperationControlChars5(dataOperationControlSome)
        : null;
    return (
      dataOperationControlChars5 !== null &&
      context.has(dataOperationControlChars5) &&
      options.some(
        (option?: Dynamic, ..._extraArguments: unknown[]) =>
          !resolveDataOperationControlFormat(option),
      )
    );
  });
  (resolveDataOperationControlInsert2 = (
    dataOperationControlInsert2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let dataOperationControlInsert22: Dynamic = dataOperationControlInsert2;
    if (
      dataOperationControlInsert22.op !== `insert` ||
      dataOperationControlInsert22.source?.as !== `inline` ||
      !Array.isArray(dataOperationControlInsert22.source.from?.content)
    )
      return [];
    let slice: Dynamic = (
      dataOperationControlInsert23?: Dynamic,
      ..._extraArguments: unknown[]
    ) => {
      if (Array.isArray(dataOperationControlInsert22.ids))
        return typeof dataOperationControlInsert22.ids[
          dataOperationControlInsert23
        ] == `string`
          ? dataOperationControlInsert22.ids[dataOperationControlInsert23]
          : null;
      let ids: Dynamic =
        isPlainRecord(dataOperationControlInsert22.ids) &&
        typeof dataOperationControlInsert22.ids.from == `string` &&
        typeof dataOperationControlInsert22.ids.count == `number`
          ? dataOperationControlInsert22.ids
          : null;
      let lastIndexOf: Dynamic = ids ? ids.from.lastIndexOf(`.`) : -1;
      return ids && lastIndexOf > 0 && dataOperationControlInsert23 < ids.count
        ? `${ids.from.slice(0, lastIndexOf)}.${Number(ids.from.slice(lastIndexOf + 1)) + dataOperationControlInsert23}`
        : null;
    };
    let items: Dynamic = [];
    let index: Dynamic = 0;
    for (let resolveDataOperationControlInsert2Result of dataOperationControlInsert22
      .source.from.content as Dynamic) {
      if (resolveDataOperationControlInsert2Result?.type === `text`) {
        index += Array.from<Dynamic>(
          typeof resolveDataOperationControlInsert2Result.text == `string`
            ? resolveDataOperationControlInsert2Result.text
            : ``,
        ).length;
        continue;
      }
      let itemsSlice: Dynamic = slice(index++);
      if (itemsSlice !== null) {
        items.push(itemsSlice);
      }
    }
    return items;
  });
  (isDataOperationControlSome2 = (
    dataOperationControlSome2?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let dataOperationControlChars5: Dynamic =
      resolveDataOperationControlFormat(dataOperationControlSome2) &&
      Array.isArray(dataOperationControlSome2.add)
        ? resolveDataOperationControlChars5(dataOperationControlSome2)
        : null;
    return (
      dataOperationControlChars5 !== null &&
      context.has(dataOperationControlChars5) &&
      options.some(
        (option?: Dynamic, ..._extraArguments: unknown[]) =>
          !resolveDataOperationControlFormat(option),
      )
    );
  });
  (resolveDataOperationControlText2 = (
    items?: unknown,
    options: Dynamic = 0,
    ..._extraArguments: unknown[]
  ) =>
    typeof items == `string`
      ? items.length > 0
      : options > 12 || !Array.isArray(items)
        ? false
        : items.some(
            (node?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              isPlainRecord(node) &&
              ((node.type === `text` &&
                typeof node.text == `string` &&
                node.text.length > 0) ||
                resolveDataOperationControlText2(node.content, options + 1)),
          ));
  (resolveDataOperationControlInsert3 = (
    dataOperationControlInsert3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let dataOperationControlInsert32: Dynamic = dataOperationControlInsert3;
    return dataOperationControlInsert32.op !== `insert` ||
      dataOperationControlInsert32.source?.as === undefined ||
      dataOperationControlInsert32.source.as === `text` ||
      !(
        dataOperationControlInsert32.target?.kind === `chars` ||
        (dataOperationControlInsert32.target?.kind === `blocks` &&
          (dataOperationControlInsert32.side === `start` ||
            dataOperationControlInsert32.side === `end`))
      )
      ? false
      : resolveDataOperationControlText2(
          dataOperationControlInsert32.source.from?.content,
        );
  });
  (isDataOperationControlChars = (
    event?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let target: Dynamic = event.target;
    return target?.kind !== `chars` || !Array.isArray(target.range)
      ? false
      : target.range.some(
          (range?: unknown, ..._extraArguments: unknown[]): Dynamic => {
            if (typeof range != `string`) return false;
            let lastIndexOf = range.lastIndexOf(`.`);
            let [items, setItems]: Dynamic = [
              range.slice(0, lastIndexOf),
              Number(range.slice(lastIndexOf + 1)),
            ];
            return (
              lastIndexOf > 0 &&
              options.some(
                (option?: Dynamic, ..._extraArguments: unknown[]) =>
                  option.sess === items &&
                  setItems >= option.from &&
                  setItems < option.from + option.count,
              )
            );
          },
        );
  });
  (resolveDataOperationControlEdit = (
    dataOperationControlEdit?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let rev: Dynamic = isPlainRecord(dataOperationControlEdit.edit)
      ? dataOperationControlEdit.edit.rev
      : dataOperationControlEdit.rev;
    return typeof rev == `number` ? rev : undefined;
  });
  (dataOperationControlSet23 = new (Set as Dynamic)([
    `rehomed`,
    `split_rehomed`,
    `rejoined`,
    `reshaped`,
    `degraded`,
    `grid_healed`,
  ]));
  (resolveDataOperationControlReshaped = (
    error?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    error.code === `reshaped` &&
    error.from === `listItem` &&
    typeof error.after == `string` &&
    error.after !== `` &&
    Array.isArray(error.ids) &&
    typeof error.ids[0] == `string`);
  (resolveDataOperationControlBlockDead = (
    dataOperationControlBlockDead?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (Array.isArray(dataOperationControlBlockDead)) {
      for (let error of dataOperationControlBlockDead as Dynamic)
        if (
          isPlainRecord(error) &&
          !resolveDataOperationControlReshaped(error) &&
          (dataOperationControlSet23.has(String(error.code)) ||
            ((error.code === `block_dead` || error.code === `anchor_gone`) &&
              error.rehomed === true))
        )
          return String(error.code);
    }
  });
  (resolveDataOperationControlIsInteger3 = (
    dataOperationControlIsInteger3?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let number2 = Number(dataOperationControlIsInteger3);
    return Number.isInteger(number2) && number2 >= 0 ? number2 : 1 / 0;
  });
  (resolveDataOperationControlRev = (
    dataOperationControlRev?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let rev: Dynamic = dataOperationControlRev.rev;
    if (typeof rev != `number` || !(rev > 0)) return null;
    let item = [
      dataOperationControlRev.revFirst,
      dataOperationControlRev.rev_first,
    ].find(
      (item2?: unknown, ..._extraArguments: unknown[]) =>
        typeof item2 == `number`,
    );
    return {
      rev: rev,
      revFirst: item !== undefined && item > 0 && item <= rev ? item : rev,
    };
  });
  (isDataOperationControlFind = (
    dataOperationControlFind?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let options2: Dynamic = isPlainRecord(options) ? options : {};
    let item: Dynamic = [
      dataOperationControlFind.applied,
      options2.applied,
      Array.isArray(options2.ops) ? options2 : undefined,
    ].find(isPlainRecord);
    return !item ||
      (typeof item.node == `string` &&
        context !== undefined &&
        item.node !== context)
      ? null
      : item;
  });
  (resolveDataOperationControlFlatMap2 = (
    dataOperationControlFlatMap2?: unknown,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    typeof dataOperationControlFlatMap2 == `string`
      ? [dataOperationControlFlatMap2]
      : Array.isArray(dataOperationControlFlatMap2)
        ? dataOperationControlFlatMap2.flatMap(
            resolveDataOperationControlFlatMap2,
          )
        : []);
  (resolveDataOperationControlLife = (
    dataOperationControlLife?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `${dataOperationControlLife === undefined ? `life` : Math.floor(dataOperationControlLife * 2 ** 52).toString(36)}-${options}`);
  (resolveDataOperationControlStartsWith = (
    dataOperationControlStarts?: Dynamic,
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let number2 = dataOperationControlStarts.startsWith(items + `.`)
      ? Number(dataOperationControlStarts.slice(items.length + 1))
      : NaN;
    return Number.isInteger(number2) ? number2 : -1;
  });
  (getDataOperationControlSize = (
    dataOperationControlSize?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    options.size === 0
      ? dataOperationControlSize
      : collectDataOperationControlContent(
          dataOperationControlSize,
          (
            dataOperationControlSize2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            options.get(dataOperationControlSize2) ?? dataOperationControlSize2,
        ));
  (resolveDataOperationControlBid = (
    ask?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    bid: ask.bid,
    afterId: ask.afterId ?? null,
    text: ask.text,
    ...(ask.tray === true
      ? {
          tray: true,
        }
      : {}),
    ...(ask.cut
      ? {
          cut: ask.cut,
        }
      : {}),
  }));
  (resolveDataOperationControlValue30 = (
    dataOperationControlValue30?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `${dataOperationControlValue30}\u0000${options ?? ``}`);
  (resolveDataOperationControlRevive2 = (
    operation?: Dynamic,
    ..._extraArguments: unknown[]
  ) => operation?.op === `revive`);
  (collectDataOperationControlSome = (
    collectDataOperationControlSome2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    options.some(
      (items?: Dynamic, index?: Dynamic, ..._extraArguments: unknown[]) =>
        items.length > 0 &&
        resolveDataOperationControlRevive2(
          collectDataOperationControlSome2[index],
        ),
    )
      ? options.map(
          (
            rolldownRImport2?: Dynamic,
            index?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            resolveDataOperationControlRevive2(
              collectDataOperationControlSome2[index],
            )
              ? []
              : rolldownRImport2,
        )
      : options);
  (resolveDataOperationControlOps2 = (
    dataOperationControlOps2?: Dynamic,
    replayed?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let isDataModelSchemasCount2: Dynamic = isDataModelSchemasCount(
      dataOperationControlOps2.ops,
      dataOperationControlOps2.predicted ?? [],
    );
    let replayed2: Dynamic = replayed && dataOperationControlOps2.sent === true;
    let isDataModelSchemasCount3: Dynamic =
      isDataModelSchemasCount2 !== null &&
      !isDataModelSchemasCount2.left &&
      !replayed2
        ? isDataModelSchemasCount2
        : null;
    if (isDataModelSchemasCount2 !== null) {
      reportOperationEvent(`law.lone_half`, {
        ops: dataOperationControlOps2.ops.length,
        halves: isDataModelSchemasCount2.halves,
        mended: isDataModelSchemasCount3 !== null,
        replayed: replayed,
      });
    }
    let predicted: Dynamic = collectDataOperationControlSome(
      dataOperationControlOps2.ops,
      dataOperationControlOps2.predicted ?? [],
    );
    return Object.assign(
      {
        results: [],
        batchesDone: 0,
        rev: -1,
        tries: 0,
        replayed: replayed,
      },
      dataOperationControlOps2,
      isDataModelSchemasCount3 === null
        ? {
            predicted: predicted,
          }
        : {
            ops: isDataModelSchemasCount3.ops,
            predicted: collectDataOperationControlSome(
              isDataModelSchemasCount3.ops,
              isDataModelSchemasCount3.predicted,
            ),
            editorSaid:
              dataOperationControlOps2.editorSaid ??
              collectDataOperationControlSome(
                isDataModelSchemasCount3.ops,
                isDataModelSchemasCount3.said,
              ),
          },
    );
  });
  (updateDataOperationControlEditorSaid = (
    updateDataOperationControlEditorSaid2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let lookup: Dynamic = new (Map as Dynamic)();
    updateDataOperationControlEditorSaid2.editorSaid?.forEach(
      (
        updateDataOperationControlEditorSaid3?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        updateDataOperationControlEditorSaid3.forEach(
          (
            rolldownTImport2?: Dynamic,
            index?: Dynamic,
            ..._extraArguments: unknown[]
          ) =>
            ((
              updateDataOperationControlEditorSaid4?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined =>
              void (
                updateDataOperationControlEditorSaid4 !== undefined &&
                updateDataOperationControlEditorSaid4 !== rolldownTImport2 &&
                lookup.set(
                  rolldownTImport2,
                  updateDataOperationControlEditorSaid4,
                )
              ))(
              updateDataOperationControlEditorSaid2.predicted[options]?.[index],
            ),
        ),
    );
    return lookup;
  });
  (dataOperationControlPattern11 = /^([^.\s]+)\.\d+$/);
  (resolveDataOperationControlExec = (
    dataOperationControlExec?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let uniqueItems: Dynamic = new (Set as Dynamic)();
    let exec: Dynamic = (
      dataOperationControlExec2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let matchItem = dataOperationControlPattern11.exec(
        dataOperationControlExec2,
      )?.[1];
      if (matchItem !== undefined && matchItem !== `_` && matchItem !== options) {
        uniqueItems.add(matchItem);
      }
      return dataOperationControlExec2;
    };
    collectDataOperationControlContent(dataOperationControlExec.ops, exec);
    for (let resolveDataOperationControlExecResult of dataOperationControlExec.predicted.flat() as Dynamic)
      exec(resolveDataOperationControlExecResult);
    return uniqueItems;
  });
  (resolveDataOperationControlBatchesDone = (
    dataOperationControlBatchesDone?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    dataOperationControlBatchesDone.batchesDone === 0
      ? dataOperationControlBatchesDone.predicted
      : dataOperationControlBatchesDone.predicted.slice(
          dataOperationControlBatchesDone.cuts?.[
            dataOperationControlBatchesDone.batchesDone
          ] ?? dataOperationControlBatchesDone.predicted.length,
        ));
  (resolveDataOperationControlFlat3 = (
    dataOperationControlFlat3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let uniqueItems: Dynamic = new (Set as Dynamic)(
      resolveDataOperationControlBatchesDone(dataOperationControlFlat3).flat(),
    );
    let count: Dynamic =
      dataOperationControlFlat3.batchesDone === 0
        ? 0
        : (dataOperationControlFlat3.cuts?.[
            dataOperationControlFlat3.batchesDone
          ] ?? dataOperationControlFlat3.ops.length);
    for (let resolveDataOperationControlFlat3Result of dataOperationControlFlat3.ops.slice(
      count,
    ) as Dynamic) {
      if (!isPlainRecord(resolveDataOperationControlFlat3Result)) continue;
      if (
        typeof resolveDataOperationControlFlat3Result.id == `string` &&
        resolveDataOperationControlFlat3Result.id !==
          resolveDataOperationControlFlat3Result.resurrect
      ) {
        uniqueItems.add(resolveDataOperationControlFlat3Result.id);
      }
      let ids: Dynamic = resolveDataOperationControlFlat3Result.ids;
      if (Array.isArray(ids))
        for (let resolveDataOperationControlFlat3Result2 of ids as Dynamic)
          if (typeof resolveDataOperationControlFlat3Result2 == `string`) {
            uniqueItems.add(resolveDataOperationControlFlat3Result2);
          }
      if (
        isPlainRecord(ids) &&
        typeof ids.from == `string` &&
        typeof ids.count == `number`
      ) {
        let lastIndexOf: Dynamic = ids.from.lastIndexOf(`.`);
        let number2 = Number(ids.from.slice(lastIndexOf + 1));
        if (lastIndexOf > 0 && Number.isInteger(number2))
          for (let index = 0; index < ids.count; index++)
            uniqueItems.add(
              `${ids.from.slice(0, lastIndexOf)}.${number2 + index}`,
            );
      }
    }
    return [...uniqueItems];
  });
  (resolveDataOperationControlSome3 = (
    dataOperationControlSome3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveDataOperationControlFlat3(dataOperationControlSome3).some(
      (dataOperationControlFlat3?: Dynamic, ..._extraArguments: unknown[]) => {
        let lastIndexOf: Dynamic = dataOperationControlFlat3.lastIndexOf(`.`);
        return (
          lastIndexOf > 0 &&
          dataOperationControlFlat3.slice(0, lastIndexOf) !== `_`
        );
      },
    ));
  (isDataOperationControlBatchesDone = (
    dataOperationControlBatchesDone?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let count: Dynamic =
      dataOperationControlBatchesDone.batchesDone === 0
        ? 0
        : (dataOperationControlBatchesDone.cuts?.[
            dataOperationControlBatchesDone.batchesDone
          ] ?? dataOperationControlBatchesDone.ops.length);
    return dataOperationControlBatchesDone.ops
      .slice(count)
      .some((opsSlice?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        if (!isPlainRecord(opsSlice)) return false;
        if (typeof opsSlice.id == `string` && opsSlice.id.startsWith(`_.`))
          return true;
        let ids: Dynamic = opsSlice.ids;
        return Array.isArray(ids)
          ? ids.some(
              (id?: unknown, ..._extraArguments: unknown[]) =>
                typeof id == `string` && id.startsWith(`_.`),
            )
          : isPlainRecord(ids) &&
              typeof ids.from == `string` &&
              ids.from.startsWith(`_.`);
      });
  });
  (DataOperationControlBongoOpWal = `bongo.op-wal`);
  (DataOperationControlWal = `wal`);
  (resolveDataOperationControlValue31 = (
    dataOperationControlValue31?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `${DataOperationControlBongoOpWal}:live:${dataOperationControlValue31}`);
  (resolveDataOperationControlValue32 = (
    dataOperationControlValue32?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `tray:cov:left.${dataOperationControlValue32}.${options}`);
  (resolveDataOperationControlAfterId = (
    ask?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `${resolveDataOperationControlValue30(ask.bid, ask.afterId ?? null)}\u0000${ask.text}`);
  (resolveDataOperationControlBid2 = (
    dataOperationControlBid2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (
      options === undefined ||
      options === `1` ||
      dataOperationControlBid2.of !== options ||
      dataOperationControlBid2.was === undefined
    )
      return null;
    let ask: Dynamic = {
      bid: dataOperationControlBid2.was.bid,
      afterId: dataOperationControlBid2.was.afterId,
      text: dataOperationControlBid2.text,
    };
    if (dataOperationControlBid2.real === true) {
      ask.real = true;
    }
    if (dataOperationControlBid2.was.tray === true) {
      ask.tray = true;
    }
    if (dataOperationControlBid2.cut) {
      ask.cut = dataOperationControlBid2.cut;
    }
    if (dataOperationControlBid2.author !== undefined) {
      ask.author = dataOperationControlBid2.author;
    }
    return ask;
  });
  (dataOperationControlMap = new (Map as Dynamic)());
  (resolveDataOperationControlCatch = (
    dataOperationControlCatch?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (!dataOperationControlCatch)
      return (..._extraArguments: unknown[]): undefined => undefined;
    let uniqueItems: Dynamic = new (Set as Dynamic)();
    return (
      dataOperationControlCatch2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (!uniqueItems.has(dataOperationControlCatch2)) {
        uniqueItems.add(dataOperationControlCatch2);
        try {
          let dataOperationControlCatch3: Dynamic = dataOperationControlCatch(
            dataOperationControlCatch2,
          );
          if (dataOperationControlCatch3 instanceof (Promise as Dynamic)) {
            dataOperationControlCatch3.catch(
              (..._extraArguments: unknown[]): undefined => undefined,
            );
          }
        } catch {}
      }
    };
  });
}

export {
  DataOperationControlBongoOpWal,
  DataOperationControlIdRefused,
  DataOperationControlMessage16,
  DataOperationControlWal,
  collectDataOperationControlContent,
  collectDataOperationControlSome,
  dataOperationControlIdentifierPattern2,
  dataOperationControlIdentifierPattern3,
  dataOperationControlIdentifierPattern4,
  dataOperationControlPattern11,
  dataOperationControlPattern8,
  dataOperationControlSet11,
  dataOperationControlSet13,
  dataOperationControlSet14,
  dataOperationControlSet15,
  dataOperationControlSet16,
  dataOperationControlSet17,
  dataOperationControlSet19,
  dataOperationControlSet20,
  dataOperationControlSet21,
  dataOperationControlValue256,
  filterDataOperationControlBid,
  filterDataOperationControlContent,
  filterDataOperationControlSeq,
  getDataOperationControlSize,
  isDataOperationControlBatchesDone,
  isDataOperationControlDeny9,
  isDataOperationControlLabel,
  isDataOperationControlRevive,
  isPlainRecord,
  resolveDataOperationControlAfterId,
  resolveDataOperationControlAnchorGone,
  resolveDataOperationControlAsOf,
  resolveDataOperationControlBatchesDone,
  resolveDataOperationControlBid,
  resolveDataOperationControlBid2,
  resolveDataOperationControlBid3,
  resolveDataOperationControlBlocks2,
  resolveDataOperationControlBlocks3,
  resolveDataOperationControlBlocks4,
  resolveDataOperationControlCatch,
  resolveDataOperationControlChars3,
  resolveDataOperationControlChars4,
  resolveDataOperationControlChildren,
  resolveDataOperationControlDeny,
  resolveDataOperationControlEdit,
  resolveDataOperationControlExec,
  resolveDataOperationControlFlat3,
  resolveDataOperationControlFlatMap2,
  resolveDataOperationControlFrom,
  resolveDataOperationControlHeader,
  resolveDataOperationControlInline,
  resolveDataOperationControlInsert,
  resolveDataOperationControlIsInteger2,
  resolveDataOperationControlKStart,
  resolveDataOperationControlLife,
  resolveDataOperationControlMinted4,
  resolveDataOperationControlOps2,
  resolveDataOperationControlParentId,
  resolveDataOperationControlReduce,
  resolveDataOperationControlReplace2,
  resolveDataOperationControlReplace3,
  resolveDataOperationControlRevive2,
  resolveDataOperationControlSome2,
  resolveDataOperationControlSome3,
  resolveDataOperationControlStartsWith,
  resolveDataOperationControlSure,
  resolveDataOperationControlText,
  resolveDataOperationControlUnavailable,
  resolveDataOperationControlValue30,
  resolveDataOperationControlValue31,
  resolveDataOperationControlValue32,
  updateDataOperationControlBid,
  updateDataOperationControlEditorSaid,
  updateDataOperationControlLeft,
};
