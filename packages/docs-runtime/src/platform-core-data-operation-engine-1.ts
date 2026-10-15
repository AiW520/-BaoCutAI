/** BaoCut: data operation engine from app-core-BE6n4d7F.js. */
import type { Dynamic } from "./types";
import {
  ContentAny,
  ContentDeleted,
  ContentFormat,
  ContentString,
  ContentType,
  Doc,
  GC,
  Item,
  XmlElement,
  XmlText,
  applyUpdate,
  encodeAny,
  encodeStateAsUpdate,
  encodeStateVector,
  simpleDiffString,
  toBase64,
} from "./platform-core-dependencies";
import {
  dataEnumsAndValidationCreateUpdateReadDeleteValues,
  dataEnumsAndValidationJsonBlobProseIronValues,
} from "./platform-core-data-enums-and-validation";
import {
  collectDataLazyZodText,
  lazyZod,
  resolveDataLazyZodDigest,
} from "./platform-core-data-lazy-zod";
import {
  dataContentAndReferencesDescribeSchema,
  dataContentAndReferencesDescribeSchema2,
  dataContentAndReferencesDescribeSchema5,
  resolveDataContentAndReferencesReason,
  resolveDataContentAndReferencesStart,
  resolveDataContentAndReferencesToUpperCase,
} from "./platform-core-data-content-and-references";
import {
  resolveEditorExtensionsValue27,
} from "./platform-core-editor-extensions-3";

var dataOperationEngineDescribeSchema: Dynamic;

var dataOperationEngineEngineSchema: Dynamic;

var dataOperationEngineEngineSchema2: Dynamic;

var dataOperationEngineEngineSchema3: Dynamic;

var EngineRefuse: Dynamic;

var DataOperationEngineState: Dynamic;

var resolveDataOperationEngineCreate: Dynamic;

var resolveDataOperationEngineValue5: (dataOperationEngineValue5?: Dynamic, ..._extraArguments: unknown[]) => undefined;

var DataOperationEngineActor: Readonly<{
    readonly at: undefined;
    readonly actor: undefined;
    blob: (..._extraArguments: unknown[]) => undefined;
    effects: {
        get: (..._extraArguments: unknown[]) => undefined;
    };
}>;

function resolveDataOperationEngineEntries(
  dataOperationEngineEntries?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  for (let [
    resolveDataOperationEngineEntriesResult,
    resolveDataOperationEngineEntriesResult2,
  ] of Object.entries(
    dataOperationEngineEntries.verbs[options] ?? {},
  ) as Dynamic)
    if (
      resolveDataOperationEngineEntriesResult2.payload.safeParse(context)
        .success
    )
      return resolveDataOperationEngineEntriesResult;
}

var loadDataOperationEngineThen: (dataOperationEngineThen?: Dynamic, options?: Dynamic, context?: Dynamic, ..._extraArguments: unknown[]) => undefined;

function resolveDataOperationEngineVerb(
  dataOperationEngineVerb?: Dynamic,
  options?: Dynamic,
  after?: Dynamic,
  dependencies?: Dynamic,
  argument?: Dynamic,
  argument2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let { verb: dependencies2, payload: dependencies3 }: Dynamic = dependencies;
  if (dependencies2 === `delete`)
    return {
      after: undefined,
    };
  if (dependencies2 !== `create` && dependencies2 !== `update`)
    return {
      after: after,
    };
  let dataOperationEngineEntries: Dynamic = resolveDataOperationEngineEntries(
    dataOperationEngineVerb,
    dependencies2,
    dependencies3,
  );
  if (dataOperationEngineEntries === undefined) {
    if (argument !== undefined) return argument(after, dependencies);
    throw new (EngineRefuse as Dynamic)(`shape`);
  }
  let optionItemItem: Dynamic =
    options[dependencies2]?.[dataOperationEngineEntries];
  if (optionItemItem === undefined)
    throw Error(
      `kind dispatch: ${dataOperationEngineVerb.name}.${dependencies2}.${dataOperationEngineEntries} resolved but binds no methods — registration drift`,
    );
  let admit: Dynamic = optionItemItem.admit(
    after,
    dependencies3,
    DataOperationEngineActor,
  );
  loadDataOperationEngineThen(
    dataOperationEngineVerb,
    `${dependencies2}.${dataOperationEngineEntries} admit`,
    admit,
  );
  if (`deny` in admit) throw new (EngineRefuse as Dynamic)(admit.deny);
  if (admit.stamps !== undefined)
    throw Error(
      `kind dispatch: ${dataOperationEngineVerb.name}.${dependencies2}.${dataOperationEngineEntries} admit returned stamps — stamp recording is not wired`,
    );
  let apply: Dynamic =
    dependencies2 === `create`
      ? optionItemItem.apply(dependencies3, DataOperationEngineActor, argument2)
      : optionItemItem.apply(
          after,
          dependencies3,
          DataOperationEngineActor,
          argument2,
        );
  loadDataOperationEngineThen(
    dataOperationEngineVerb,
    `${dependencies2}.${dataOperationEngineEntries} apply`,
    apply,
  );
  if (apply.effects !== undefined)
    throw Error(
      `kind dispatch: ${dataOperationEngineVerb.name}.${dependencies2}.${dataOperationEngineEntries} returned effects — the effects tape has no recorder (every declared seat is z.never())`,
    );
  return {
    after: apply.state,
    ...(apply.outcome === undefined
      ? {}
      : {
          outcome: apply.outcome,
        }),
  };
}

var dataOperationEngineWeakSet: Dynamic;

function resolveDataOperationEngineValue6(
  dataOperationEngineValue6?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let resolveDataOperationEngineValue6Result: Dynamic;
  let resolveDataOperationEngineVerb4: Dynamic = (
    dataOperationEngineValue62?: Dynamic,
    options?: Dynamic,
    context?: unknown,
    dependencies?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => (
    (resolveDataOperationEngineValue6Result ??= dataOperationEngineValue6()),
    resolveDataOperationEngineVerb(
      resolveDataOperationEngineValue6Result[0],
      resolveDataOperationEngineValue6Result[1],
      dataOperationEngineValue62,
      options,
      resolveDataOperationEngineValue6Result[2],
      dependencies,
    )
  );
  dataOperationEngineWeakSet.add(resolveDataOperationEngineVerb4);
  return resolveDataOperationEngineVerb4;
}

var resolveDataOperationEngineValue7: Dynamic;

var dataOperationEngineJsonBlobTextProseValues: string[];

var DataOperationEngineCustom: Dynamic;

var DataOperationEngineObjectTypes: Dynamic;

var DataOperationEngineRegex: Dynamic;

var DataOperationEngineVerbs: Dynamic;

var dataOperationEngineDescribeSchema2: Dynamic;

var dataOperationEngineParentSchema: Dynamic;

var collectDataOperationEngineKeys: Dynamic;

var resolveDataOperationEngineValue8: Dynamic;

var dataOperationEngineProjectFileNodeRunValues: string[];

var resolveDataOperationEngineIncludes: Dynamic;

var DataOperationEngineProject: Dynamic;

var DataOperationEngineJson: Dynamic;

var DataOperationEngineRecord: Dynamic;

var dataOperationEngineAfterBidSchema: Dynamic;

function getDataOperationEngineValue(
  items?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  for (let index = 0; index < items.length; index++) {
    let itemEntry: Dynamic = items.get(index);
    if (itemEntry instanceof (XmlElement as Dynamic)) {
      options(itemEntry);
      getDataOperationEngineValue(itemEntry, options);
    }
  }
}

function resolveDataOperationEngineValue9(
  dataOperationEngineValue9?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  getDataOperationEngineValue(
    dataOperationEngineValue9,
    (element?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let attribute: Dynamic = element.getAttribute(`bid`);
      if (typeof attribute == `string`) {
        uniqueItems.add(attribute);
      }
    },
  );
  return uniqueItems;
}

function getDataOperationEngineParent(
  parent?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  for (let index = 0; index < parent.length; index++) {
    let parentEntry: Dynamic = parent.get(index);
    if (!(parentEntry instanceof (XmlElement as Dynamic))) continue;
    if (parentEntry.getAttribute(`bid`) === options)
      return {
        parent: parent,
        index: index,
      };
    let dataOperationEngineParent: Dynamic = getDataOperationEngineParent(
      parentEntry,
      options,
    );
    if (dataOperationEngineParent) return dataOperationEngineParent;
  }
  return null;
}

function isDataOperationEngineLen(
  items?: Dynamic,
  node?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (
    items.nodeName !== node.type ||
    node.text !== undefined ||
    node.marks !== undefined
  )
    return false;
  let attrs: Dynamic = node.attrs;
  if (attrs != null && (typeof attrs != `object` || Array.isArray(attrs)))
    return false;
  let attrs2: Dynamic = attrs ?? {};
  let attributes: Dynamic = items.getAttributes();
  let uniqueItems: Dynamic = new (Set as Dynamic)([
    ...Object.keys(attributes),
    ...Object.keys(attrs2),
  ]);
  uniqueItems.delete(`bid`);
  for (let isDataOperationEngineLenResult of uniqueItems as Dynamic) {
    let attrItem: Dynamic = attrs2[isDataOperationEngineLenResult];
    let attributeItem: Dynamic = attributes[isDataOperationEngineLenResult];
    if (JSON.stringify(attributeItem) !== JSON.stringify(attrItem))
      return false;
  }
  if (items.length > 1) return false;
  let itemEntry: Dynamic = items.length === 1 ? items.get(0) : null;
  if (itemEntry !== null && !(itemEntry instanceof (XmlText as Dynamic)))
    return false;
  let label: Dynamic = ``;
  let items2: Dynamic = [];
  if (itemEntry !== null)
    for (let isDataOperationEngineLenResult of itemEntry.toDelta() as Dynamic) {
      if (typeof isDataOperationEngineLenResult.insert != `string`)
        return false;
      let attrs5: Dynamic = isDataOperationEngineLenResult.attributes ?? {};
      for (let isDataOperationEngineLenResult2 of Object.keys(
        attrs5,
      ) as Dynamic)
        if (!context(isDataOperationEngineLenResult2)) return false;
      items2.push({
        len: isDataOperationEngineLenResult.insert.length,
        attrs: attrs5,
      });
      label += isDataOperationEngineLenResult.insert;
    }
  let readAttrs: Dynamic = (
    dataOperationEngineLen?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (dataOperationEngineLen < 0) return {};
    let count: Dynamic = 0;
    for (let isDataOperationEngineLenResult of items2 as Dynamic) {
      if (dataOperationEngineLen < count + isDataOperationEngineLenResult.len)
        return isDataOperationEngineLenResult.attrs;
      count += isDataOperationEngineLenResult.len;
    }
    return {};
  };
  let content: Dynamic = node.content;
  if (content !== undefined && !Array.isArray(content)) return false;
  let label2: Dynamic = ``;
  for (let isDataOperationEngineLenResult of (content ?? []) as Dynamic) {
    if (
      typeof isDataOperationEngineLenResult != `object` ||
      !isDataOperationEngineLenResult
    )
      return false;
    let isDataOperationEngineLenResult2: Dynamic =
      isDataOperationEngineLenResult;
    if (
      isDataOperationEngineLenResult2.type !== `text` ||
      typeof isDataOperationEngineLenResult2.text != `string` ||
      isDataOperationEngineLenResult2.text.length === 0 ||
      isDataOperationEngineLenResult2.attrs !== undefined ||
      isDataOperationEngineLenResult2.content !== undefined ||
      (isDataOperationEngineLenResult2.marks !== undefined &&
        (!Array.isArray(isDataOperationEngineLenResult2.marks) ||
          isDataOperationEngineLenResult2.marks.length > 0))
    )
      return false;
    label2 += isDataOperationEngineLenResult2.text;
  }
  let {
    index: simpleDiffString2,
    remove: simpleDiffString3,
    insert: simpleDiffString4,
  }: Dynamic = simpleDiffString(label, label2);
  if (simpleDiffString3 === 0 && simpleDiffString4.length === 0) return true;
  {
    let total: Dynamic = simpleDiffString2 + simpleDiffString3;
    let lookup: Dynamic = new (Map as Dynamic)();
    let count: Dynamic = 0;
    for (let isDataOperationEngineLenResult of items2 as Dynamic) {
      let count2: Dynamic = count;
      count += isDataOperationEngineLenResult.len;
      for (let [
        isDataOperationEngineLenResult2,
        isDataOperationEngineLenResult3,
      ] of Object.entries(isDataOperationEngineLenResult.attrs) as Dynamic) {
        let stringify = JSON.stringify([
          isDataOperationEngineLenResult2,
          isDataOperationEngineLenResult3,
        ]);
        let lookupEntry: Dynamic = lookup.get(stringify);
        let lookupEntryItem: Dynamic = lookupEntry?.[lookupEntry.length - 1];
        if (lookupEntryItem !== undefined && lookupEntryItem[1] === count2) {
          lookupEntryItem[1] = count;
        } else {
          if (lookupEntry === undefined) {
            lookup.set(stringify, [[count2, count]]);
          } else {
            lookupEntry.push([count2, count]);
          }
        }
      }
    }
    for (let isDataOperationEngineLenResult of lookup.values() as Dynamic) {
      let enabled = false;
      let enabled2 = false;
      for (let [
        isDataOperationEngineLenResult2,
        isDataOperationEngineLenResult3,
      ] of isDataOperationEngineLenResult as Dynamic) {
        if (
          !(
            total <= isDataOperationEngineLenResult2 ||
            simpleDiffString2 >= isDataOperationEngineLenResult3
          ) &&
          !(
            simpleDiffString2 <= isDataOperationEngineLenResult2 &&
            total >= isDataOperationEngineLenResult3
          ) &&
          !(
            simpleDiffString2 > isDataOperationEngineLenResult2 &&
            total < isDataOperationEngineLenResult3
          )
        )
          return false;
        if (isDataOperationEngineLenResult3 === simpleDiffString2) {
          enabled = true;
        }
        if (isDataOperationEngineLenResult2 === total) {
          enabled2 = true;
        }
      }
      if (enabled && enabled2) return false;
    }
  }
  let itemEntry2: Dynamic = itemEntry;
  if (itemEntry2 === null) {
    itemEntry2 = new (XmlText as Dynamic)();
    items.insert(0, [itemEntry2]);
  }
  let attrs3: Dynamic = readAttrs(simpleDiffString2 - 1);
  let attrs4: Dynamic = readAttrs(simpleDiffString2 + simpleDiffString3);
  let record2: Dynamic = {};
  for (let [
    isDataOperationEngineLenResult,
    isDataOperationEngineLenResult2,
  ] of Object.entries(attrs3) as Dynamic)
    if (
      Object.hasOwn(attrs4, isDataOperationEngineLenResult) &&
      JSON.stringify(attrs4[isDataOperationEngineLenResult]) ===
        JSON.stringify(isDataOperationEngineLenResult2)
    ) {
      record2[isDataOperationEngineLenResult] = isDataOperationEngineLenResult2;
    }
  if (simpleDiffString3 > 0) {
    itemEntry2.delete(simpleDiffString2, simpleDiffString3);
  }
  if (simpleDiffString4.length > 0) {
    itemEntry2.insert(simpleDiffString2, simpleDiffString4, record2);
  }
  return true;
}

function resolveDataOperationEngineAttrs(
  node?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (typeof node != `object` || !node) return;
  let attrs: Dynamic = node.attrs;
  if (typeof attrs == `object` && attrs) {
    let bid: Dynamic = attrs.bid;
    if (typeof bid == `string`) {
      options.add(bid);
    }
  }
  let content: Dynamic = node.content;
  if (Array.isArray(content))
    for (let resolveDataOperationEngineAttrsResult of content as Dynamic)
      resolveDataOperationEngineAttrs(
        resolveDataOperationEngineAttrsResult,
        options,
      );
}

var resolveDataOperationEngineShape: Dynamic;

function isDataOperationEngineProseBidConsumed(
  dataOperationEngineProseBidConsumed?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument?: Dynamic,
  argument2: Dynamic = (..._extraArguments: unknown[]) => false,
  ..._extraArguments: unknown[]
): undefined {
  let xmlFragment: Dynamic =
    dataOperationEngineProseBidConsumed.getXmlFragment(options);
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let dataOperationEngineValue9: Dynamic =
    resolveDataOperationEngineValue9(xmlFragment);
  let uniqueItems2: Dynamic = new (Set as Dynamic)();
  for (let ask of context as Dynamic) {
    let afterBid: Dynamic = ask.op === `add` ? ask.after_bid : ask.bid;
    let isDataOperationEngineProseBidConsumedResult: Dynamic = null;
    if (afterBid !== undefined) {
      if (uniqueItems.has(afterBid))
        throw new (EngineRefuse as Dynamic)(`prose-bid-consumed`);
      isDataOperationEngineProseBidConsumedResult =
        getDataOperationEngineParent(xmlFragment, afterBid);
      if (
        isDataOperationEngineProseBidConsumedResult === null &&
        !(ask.op === `add` && uniqueItems2.has(afterBid))
      )
        throw new (EngineRefuse as Dynamic)(`prose-bid-not-found`);
    }
    let items: Dynamic =
      ask.op === `delete` ? [] : resolveDataOperationEngineShape(ask.value);
    if (ask.op !== `delete` && items.length === 0)
      throw new (EngineRefuse as Dynamic)(`prose-op-empty`);
    let matchesOp: Dynamic =
      ask.op === `update` && argument.has(String(items[0].type));
    if (ask.op === `delete` || ask.op === `update`) {
      let parentEntry: Dynamic =
        isDataOperationEngineProseBidConsumedResult.parent.get(
          isDataOperationEngineProseBidConsumedResult.index,
        );
      if (parentEntry instanceof (XmlElement as Dynamic))
        for (let isDataOperationEngineProseBidConsumedResult2 of resolveDataOperationEngineValue9(
          parentEntry,
        ) as Dynamic)
          uniqueItems.add(isDataOperationEngineProseBidConsumedResult2);
      if (matchesOp) {
        uniqueItems.delete(ask.bid);
      } else {
        uniqueItems.add(ask.bid);
      }
    }
    if (ask.op !== `delete`) {
      let uniqueItems3: Dynamic = new (Set as Dynamic)();
      resolveDataOperationEngineAttrs(ask.value, uniqueItems3);
      if (matchesOp) {
        let bid: Dynamic = items[0].attrs?.bid;
        if (typeof bid == `string`) {
          uniqueItems3.delete(bid);
        }
      }
      for (let isDataOperationEngineProseBidConsumedResult2 of uniqueItems3 as Dynamic) {
        if (
          (dataOperationEngineValue9.has(
            isDataOperationEngineProseBidConsumedResult2,
          ) &&
            !uniqueItems.has(isDataOperationEngineProseBidConsumedResult2)) ||
          uniqueItems2.has(isDataOperationEngineProseBidConsumedResult2)
        )
          throw new (EngineRefuse as Dynamic)(`prose-bid-collision`);
        uniqueItems2.add(isDataOperationEngineProseBidConsumedResult2);
      }
    }
  }
  dataOperationEngineProseBidConsumed.transact(
    (..._extraArguments: unknown[]): undefined => {
      for (let ask of context as Dynamic)
        if (ask.op === `add`) {
          let dataOperationEngineParent: Dynamic =
            ask.after_bid === undefined
              ? null
              : getDataOperationEngineParent(xmlFragment, ask.after_bid);
          if (ask.after_bid !== undefined && dataOperationEngineParent === null)
            throw new (EngineRefuse as Dynamic)(`prose-bid-consumed`);
          let parent: Dynamic = dataOperationEngineParent
            ? dataOperationEngineParent.parent
            : xmlFragment;
          let total: Dynamic = dataOperationEngineParent
            ? dataOperationEngineParent.index + 1
            : xmlFragment.length;
          let dependencies2: Dynamic = dependencies(
            resolveDataOperationEngineShape(ask.value),
          );
          if (dependencies2.length) {
            parent.insert(total, dependencies2);
          }
        } else if (ask.op === `update`) {
          let dataOperationEngineParent: Dynamic = getDataOperationEngineParent(
            xmlFragment,
            ask.bid,
          );
          let dataOperationEngineShape: Dynamic =
            resolveDataOperationEngineShape(ask.value);
          let parentEntry: Dynamic = dataOperationEngineParent.parent.get(
            dataOperationEngineParent.index,
          );
          if (
            dataOperationEngineShape.length === 1 &&
            parentEntry instanceof (XmlElement as Dynamic) &&
            argument.has(parentEntry.nodeName) &&
            isDataOperationEngineLen(
              parentEntry,
              dataOperationEngineShape[0],
              argument2,
            )
          )
            continue;
          let dependencies2: Dynamic = dependencies(dataOperationEngineShape);
          let dependencyItem: Dynamic = dependencies2[0];
          if (
            dependencyItem instanceof (XmlElement as Dynamic) &&
            argument.has(dependencyItem.nodeName)
          ) {
            dependencyItem.setAttribute(`bid`, ask.bid);
          }
          dataOperationEngineParent.parent.delete(
            dataOperationEngineParent.index,
            1,
          );
          if (dependencies2.length) {
            dataOperationEngineParent.parent.insert(
              dataOperationEngineParent.index,
              dependencies2,
            );
          }
        } else {
          let dataOperationEngineParent: Dynamic = getDataOperationEngineParent(
            xmlFragment,
            ask.bid,
          );
          dataOperationEngineParent.parent.delete(
            dataOperationEngineParent.index,
            1,
          );
        }
    },
  );
}

var DataOperationEngineRegex2: Dynamic;

var dataOperationEngineNodeSchema: Dynamic;

var dataOperationEngineDescribeSchema3: Dynamic;

var resolveDataOperationEngineRow: Dynamic;

var dataOperationEngineValue1048576: number;

var dataOperationEngineValue16384: number;

var dataOperationEngineSheetIdSchema: Dynamic;

var dataOperationEngineLineSchema: Dynamic;

var dataOperationEngineDescribeSchema4: Dynamic;

var dataOperationEngineDescribeSchema5: Dynamic;

var dataOperationEnginePathSchema: Dynamic;

var dataOperationEngineQuoteSchema: Dynamic;

var DataOperationEngineProsemirror: string;

var DataOperationEngineV3Prose: string;

var resolveDataOperationEngineGuid: Dynamic;

function resolveDataOperationEngineApply(
  items?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let label: Dynamic = ``;
  for (let count: Dynamic = 0; count < items.length; count += 32768)
    label += String.fromCharCode.apply(
      null,
      items.subarray(count, count + 32768),
    );
  return btoa(label);
}

function resolveDataOperationEngineShape2(
  dataOperationEngineShape2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic;
  try {
    items = atob(dataOperationEngineShape2);
  } catch {
    throw new (EngineRefuse as Dynamic)(`shape`);
  }
  let uint8Array: Dynamic = new Uint8Array(items.length);
  for (let index = 0; index < items.length; index++)
    uint8Array[index] = items.charCodeAt(index);
  return uint8Array;
}

var resolveDataOperationEngineValue10: Dynamic;

function resolveDataOperationEngineProseNoYdoc(
  dataOperationEngineProseNoYdoc?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    typeof dataOperationEngineProseNoYdoc.ydoc != `string` ||
    dataOperationEngineProseNoYdoc.ydoc.length === 0
  )
    throw new (EngineRefuse as Dynamic)(`prose-no-ydoc`);
  let dataOperationEngineGuid: Dynamic = resolveDataOperationEngineGuid(2);
  try {
    applyUpdate(
      dataOperationEngineGuid,
      resolveDataOperationEngineShape2(dataOperationEngineProseNoYdoc.ydoc),
    );
  } catch {
    throw new (EngineRefuse as Dynamic)(`prose-no-ydoc`);
  }
  return dataOperationEngineGuid;
}

function resolveDataOperationEngineProsemirror(
  dataOperationEngineProsemirror?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  for (let resolveDataOperationEngineProsemirrorResult of dataOperationEngineProsemirror.share.keys() as Dynamic)
    if (resolveDataOperationEngineProsemirrorResult !== `prosemirror`)
      throw new (EngineRefuse as Dynamic)(`prose-crdt-smuggle`);
}

var resolveDataOperationEngineGetXmlFragment: Dynamic;

var dataOperationEngineSet: Dynamic;

var DataOperationEngineJoin: string;

var resolveDataOperationEngineSlice: (items?: unknown, ..._extraArguments: unknown[]) => string;

var dataOperationEngineSet2: Dynamic;

var dataOperationEngineSet3: Dynamic;

var dataOperationEngineSet4: Dynamic;

var dataOperationEngineValue1024: number;

var dataOperationEngineValue64: number;

var dataOperationEngineValue500: number;

var dataOperationEngineValue8000000: number;

var dataOperationEngineValue80000002: number;

var dataOperationEngineValue8192: number;

var dataOperationEngineValue10485762: number;

var dataOperationEngineValue10242: number;

var DataOperationEngineState2: number;

var DataOperationEngineState3: number[];

var DataOperationEngineState4: number[];

var DataOperationEngineState5: number;

var dataOperationEngineValue65536: number;

var dataOperationEngineValue4096: number;

var dataOperationEngineValue8: number;

var dataOperationEngineKindSchema: Dynamic;

var dataOperationEngineBlobSchema: Dynamic;

var dataOperationEngineValue40962: number;

var isDataOperationEngineCharCodeAt: (items?: Dynamic, ..._extraArguments: unknown[]) => boolean;

var resolveDataOperationEngineTest: Dynamic;

function resolveDataOperationEngineProseDepth(
  items?: unknown,
  options?: Dynamic,
  context?: Dynamic,
  dependencies: Dynamic = 0,
  ..._extraArguments: unknown[]
): undefined {
  if (dependencies > dataOperationEngineValue1024)
    throw new (EngineRefuse as Dynamic)(`prose-depth`);
  if (items === null || typeof items == `boolean`) context.left -= 8;
  else if (typeof items == `number`) {
    if (!Number.isFinite(items) || Object.is(items, -0))
      throw new (EngineRefuse as Dynamic)(`prose-attr-shape`);
    context.left -= 8;
  } else if (typeof items == `string`) {
    if (
      resolveDataOperationEngineTest(items) ||
      items.length > dataOperationEngineValue40962
    )
      throw new (EngineRefuse as Dynamic)(options);
    if (!isDataOperationEngineCharCodeAt(items))
      throw new (EngineRefuse as Dynamic)(`prose-attr-shape`);
    context.left -= Math.max(8, items.length);
  } else if (Array.isArray(items)) {
    context.left -= 8;
    for (let resolveDataOperationEngineProseDepthResult of items as Dynamic)
      resolveDataOperationEngineProseDepth(
        resolveDataOperationEngineProseDepthResult,
        options,
        context,
        dependencies + 1,
      );
  } else if (typeof items == `object`) {
    let prototypeOf: Dynamic = Object.getPrototypeOf(items);
    if (prototypeOf !== Object.prototype && prototypeOf !== null)
      throw new (EngineRefuse as Dynamic)(`prose-attr-shape`);
    context.left -= 8;
    for (let [
      items2,
      resolveDataOperationEngineProseDepthResult,
    ] of Object.entries(items) as Dynamic) {
      if (dataOperationEngineSet4.has(items2))
        throw new (EngineRefuse as Dynamic)(`prose-attr-key`);
      if (
        resolveDataOperationEngineTest(items2) ||
        items2.length > dataOperationEngineValue40962
      )
        throw new (EngineRefuse as Dynamic)(options);
      if (!isDataOperationEngineCharCodeAt(items2))
        throw new (EngineRefuse as Dynamic)(`prose-attr-shape`);
      context.left -= Math.max(8, items2.length);
      resolveDataOperationEngineProseDepth(
        resolveDataOperationEngineProseDepthResult,
        options,
        context,
        dependencies + 1,
      );
    }
  } else throw new (EngineRefuse as Dynamic)(`prose-attr-shape`);
  if (context.left < 0) throw new (EngineRefuse as Dynamic)(options);
}

var resolveDataOperationEngineLeft: Dynamic;

function resolveDataOperationEngineProseDepth2(
  dataOperationEngineProseDepth2?: unknown,
  options: Dynamic = 0,
  ..._extraArguments: unknown[]
): undefined {
  if (options > dataOperationEngineValue1024)
    throw new (EngineRefuse as Dynamic)(`prose-depth`);
  if (Array.isArray(dataOperationEngineProseDepth2)) {
    for (let resolveDataOperationEngineProseDepth2Result of dataOperationEngineProseDepth2 as Dynamic)
      resolveDataOperationEngineProseDepth2(
        resolveDataOperationEngineProseDepth2Result,
        options + 1,
      );
    return;
  }
  if (
    typeof dataOperationEngineProseDepth2 != `object` ||
    !dataOperationEngineProseDepth2
  )
    return;
  let dataOperationEngineProseDepth22: Dynamic = dataOperationEngineProseDepth2;
  for (let resolveDataOperationEngineProseDepth2Result of Object.keys(
    dataOperationEngineProseDepth22,
  ) as Dynamic)
    if (
      dataOperationEngineSet4.has(resolveDataOperationEngineProseDepth2Result)
    )
      throw new (EngineRefuse as Dynamic)(`prose-attr-key`);
  if (
    dataOperationEngineProseDepth22.attrs !== undefined &&
    dataOperationEngineProseDepth22.attrs !== null
  ) {
    resolveDataOperationEngineLeft(
      dataOperationEngineProseDepth22.attrs,
      dataOperationEngineProseDepth22.type === `media`
        ? `media-inline-bytes`
        : `prose-attr-bytes`,
    );
  }
  for (let resolveDataOperationEngineProseDepth2Result of Object.values(
    dataOperationEngineProseDepth22,
  ) as Dynamic)
    resolveDataOperationEngineProseDepth2(
      resolveDataOperationEngineProseDepth2Result,
      options + 1,
    );
}

function resolveDataOperationEngineProseDepth3(
  dataOperationEngineProseDepth3?: unknown,
  options: Dynamic = 0,
  ..._extraArguments: unknown[]
): undefined {
  if (options > dataOperationEngineValue1024)
    throw new (EngineRefuse as Dynamic)(`prose-depth`);
  if (
    typeof dataOperationEngineProseDepth3 != `object` ||
    !dataOperationEngineProseDepth3 ||
    Array.isArray(dataOperationEngineProseDepth3)
  )
    return;
  let dataOperationEngineProseDepth32: Dynamic = dataOperationEngineProseDepth3;
  if (dataOperationEngineProseDepth32.marks !== undefined) {
    if (!Array.isArray(dataOperationEngineProseDepth32.marks))
      throw new (EngineRefuse as Dynamic)(`shape`);
    for (let resolveDataOperationEngineProseDepth3Result of dataOperationEngineProseDepth32.marks as Dynamic) {
      if (
        typeof resolveDataOperationEngineProseDepth3Result != `object` ||
        !resolveDataOperationEngineProseDepth3Result ||
        typeof resolveDataOperationEngineProseDepth3Result.type != `string`
      )
        throw new (EngineRefuse as Dynamic)(`shape`);
      if (
        resolveDataOperationEngineProseDepth3Result.type.length === 0 ||
        dataOperationEngineSet5.has(
          resolveDataOperationEngineProseDepth3Result.type,
        ) ||
        resolveDataOperationEngineProseDepth3Result.type.length >
          dataOperationEngineValue256 ||
        dataOperationEnginePattern2.test(
          resolveDataOperationEngineProseDepth3Result.type,
        ) ||
        !isDataOperationEngineCharCodeAt(
          resolveDataOperationEngineProseDepth3Result.type,
        ) ||
        dataOperationEnginePattern.test(
          resolveDataOperationEngineProseDepth3Result.type,
        )
      )
        throw new (EngineRefuse as Dynamic)(`prose-attr-key`);
    }
  }
  if (
    dataOperationEngineProseDepth32.type === `builtin` &&
    !dataOperationEngineKindSchema.safeParse(
      dataOperationEngineProseDepth32.attrs?.builtin,
    ).success
  )
    throw new (EngineRefuse as Dynamic)(`prose-chip`);
  if (
    dataOperationEngineProseDepth32.type === `media` &&
    (resolveDataOperationEngineLeft(
      dataOperationEngineProseDepth32.attrs ?? {},
      `media-inline-bytes`,
    ),
    !dataOperationEngineBlobSchema.safeParse(
      dataOperationEngineProseDepth32.attrs ?? {},
    ).success)
  )
    throw new (EngineRefuse as Dynamic)(`media-shape`);
  if (Array.isArray(dataOperationEngineProseDepth32.content))
    for (let resolveDataOperationEngineProseDepth3Result of dataOperationEngineProseDepth32.content as Dynamic)
      resolveDataOperationEngineProseDepth3(
        resolveDataOperationEngineProseDepth3Result,
        options + 1,
      );
}

function resolveDataOperationEngineProseDepth4(
  dataOperationEngineProseDepth4?: unknown,
  options: Dynamic = 0,
  ..._extraArguments: unknown[]
): undefined {
  if (options > dataOperationEngineValue1024)
    throw new (EngineRefuse as Dynamic)(`prose-depth`);
  if (
    typeof dataOperationEngineProseDepth4 != `object` ||
    !dataOperationEngineProseDepth4
  )
    throw new (EngineRefuse as Dynamic)(`shape`);
  let dataOperationEngineProseDepth42: Dynamic = dataOperationEngineProseDepth4;
  if (
    typeof dataOperationEngineProseDepth42.type != `string` ||
    !dataOperationEngineSet.has(dataOperationEngineProseDepth42.type)
  )
    throw new (EngineRefuse as Dynamic)(
      `prose-unknown-node: ${resolveDataOperationEngineSlice(dataOperationEngineProseDepth42.type)} is not in the v3 prose vocabulary — accepted node types: ${DataOperationEngineJoin} (marks are free; unknown marks preserve-inert)`,
    );
  if (
    (dataOperationEngineProseDepth42.type === `text` &&
      typeof dataOperationEngineProseDepth42.text != `string`) ||
    (dataOperationEngineProseDepth42.type === `text` &&
      !isDataOperationEngineCharCodeAt(dataOperationEngineProseDepth42.text))
  )
    throw new (EngineRefuse as Dynamic)(`prose-text-shape`);
  if (dataOperationEngineProseDepth42.content !== undefined) {
    if (!Array.isArray(dataOperationEngineProseDepth42.content))
      throw new (EngineRefuse as Dynamic)(`shape`);
    for (let resolveDataOperationEngineProseDepth4Result of dataOperationEngineProseDepth42.content as Dynamic)
      resolveDataOperationEngineProseDepth4(
        resolveDataOperationEngineProseDepth4Result,
        options + 1,
      );
  }
}

var resolveDataOperationEngineSlice2: Dynamic;

var resolveDataOperationEngineValue11: Dynamic;

var resolveDataOperationEngineType: Dynamic;

var resolveDataOperationEngineCommentAnchor: Dynamic;

var updateDataOperationEngineShape: Dynamic;

function collectDataOperationEngineInsert(
  items?: Dynamic,
  options: Dynamic = 0,
  ..._extraArguments: unknown[]
): Dynamic {
  if (options > dataOperationEngineValue1024)
    throw new (EngineRefuse as Dynamic)(`prose-depth`);
  let items2: Dynamic = [];
  let index = 0;
  for (; index < items.length; ) {
    let itemItem: Dynamic = items[index];
    if (
      typeof itemItem != `object` ||
      !itemItem ||
      typeof itemItem.type != `string`
    )
      throw new (EngineRefuse as Dynamic)(`shape`);
    if (itemItem.type === `text`) {
      let items3: Dynamic = [];
      for (; index < items.length && items[index]?.type === `text`; ) {
        let itemItem2: Dynamic = items[index];
        if (
          typeof itemItem2.text != `string` ||
          itemItem2.text.length === 0 ||
          itemItem2.attrs !== undefined ||
          itemItem2.content !== undefined
        )
          throw new (EngineRefuse as Dynamic)(`shape`);
        items3.push(itemItem2);
        index++;
      }
      let xmlText: Dynamic = new (XmlText as Dynamic)();
      xmlText.applyDelta(
        items3.map(
          (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
            insert: item.text,
            attributes: updateDataOperationEngineShape(item.marks),
          }),
        ),
      );
      items2.push(xmlText);
      continue;
    }
    let xmlElement: Dynamic = new (XmlElement as Dynamic)(itemItem.type);
    if (itemItem.text !== undefined)
      throw new (EngineRefuse as Dynamic)(`shape`);
    if (itemItem.attrs !== null && itemItem.attrs !== undefined) {
      if (typeof itemItem.attrs != `object` || Array.isArray(itemItem.attrs))
        throw new (EngineRefuse as Dynamic)(`shape`);
      for (let [
        collectDataOperationEngineInsertResult,
        collectDataOperationEngineInsertResult2,
      ] of Object.entries(itemItem.attrs) as Dynamic) {
        resolveDataOperationEngineProseAttrBytes(
          collectDataOperationEngineInsertResult,
        );
        if (collectDataOperationEngineInsertResult2 !== null) {
          xmlElement.setAttribute(
            collectDataOperationEngineInsertResult,
            collectDataOperationEngineInsertResult2,
          );
        }
      }
    }
    if (itemItem.content !== undefined) {
      if (!Array.isArray(itemItem.content))
        throw new (EngineRefuse as Dynamic)(`shape`);
      let collectDataOperationEngineInsert2: Dynamic =
        collectDataOperationEngineInsert(itemItem.content, options + 1);
      if (collectDataOperationEngineInsert2.length) {
        xmlElement.insert(0, collectDataOperationEngineInsert2);
      }
    }
    items2.push(xmlElement);
    index++;
  }
  return items2;
}

function resolveDataOperationEngineShape3(
  dataOperationEngineShape3?: Dynamic,
  node?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (
    typeof node != `object` ||
    !node ||
    node.type !== `doc` ||
    node.marks !== undefined ||
    node.text !== undefined ||
    (node.attrs !== null &&
      node.attrs !== undefined &&
      (typeof node.attrs != `object` ||
        Array.isArray(node.attrs) ||
        Object.keys(node.attrs).length > 0))
  )
    throw new (EngineRefuse as Dynamic)(`shape`);
  let collectDataOperationEngineInsert2: Dynamic =
    collectDataOperationEngineInsert(node.content ?? []);
  if (collectDataOperationEngineInsert2.length) {
    dataOperationEngineShape3.insert(0, collectDataOperationEngineInsert2);
  }
}

var dataOperationEngineSet5: Dynamic;

var resolveDataOperationEngineMap: Dynamic;

var resolveDataOperationEngineStart: Dynamic;

function resolveDataOperationEngineValue12(
  dataOperationEngineValue12?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  resolveDataOperationEngineProseCrdtSmuggle(dataOperationEngineValue12);
  resolveDataOperationEngineProseDepth5(
    dataOperationEngineValue12,
    0,
    uniqueItems,
  );
  return uniqueItems;
}

function resolveDataOperationEngineProseCrdtSmuggle(
  dataOperationEngineProseCrdtSmuggle?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  for (let [
    ,
    resolveDataOperationEngineProseCrdtSmuggleResult,
  ] of resolveDataOperationEngineMap(
    dataOperationEngineProseCrdtSmuggle,
  ) as Dynamic)
    if (!resolveDataOperationEngineProseCrdtSmuggleResult.deleted)
      throw new (EngineRefuse as Dynamic)(`prose-crdt-smuggle`);
}

var dataOperationEngineValue256: number;

var dataOperationEnginePattern: RegExp;

var resolveDataOperationEngineExec: Dynamic;

var dataOperationEnginePattern2: RegExp;

function resolveDataOperationEngineProseAttrBytes(
  items?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (items.length > dataOperationEngineValue256)
    throw new (EngineRefuse as Dynamic)(`prose-attr-bytes`);
  if (
    dataOperationEnginePattern2.test(items) ||
    !isDataOperationEngineCharCodeAt(items) ||
    dataOperationEngineSet5.has(items)
  )
    throw new (EngineRefuse as Dynamic)(`prose-attr-key`);
}

function resolveDataOperationEngineProseAttrKey(
  dataOperationEngineProse?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  resolveDataOperationEngineProseAttrBytes(dataOperationEngineProse);
  let dataOperationEngineExec: Dynamic = resolveDataOperationEngineExec(
    dataOperationEngineProse,
  );
  if (
    dataOperationEngineExec.length === 0 ||
    dataOperationEngineSet5.has(dataOperationEngineExec) ||
    dataOperationEnginePattern.test(dataOperationEngineExec)
  )
    throw new (EngineRefuse as Dynamic)(`prose-attr-key`);
}

function resolveDataOperationEngineProseDepth5(
  dataOperationEngineProseDepth5?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (options > dataOperationEngineValue1024)
    throw new (EngineRefuse as Dynamic)(`prose-depth`);
  let dataOperationEngineStart: Dynamic = resolveDataOperationEngineStart(
    dataOperationEngineProseDepth5,
  );
  for (; dataOperationEngineStart; ) {
    if (!dataOperationEngineStart.deleted) {
      context.add(dataOperationEngineStart);
      let content: Dynamic = dataOperationEngineStart.content;
      if (!(content instanceof (ContentType as Dynamic)))
        throw new (EngineRefuse as Dynamic)(`prose-crdt-smuggle`);
      let type: Dynamic = content.type;
      if (type instanceof (XmlElement as Dynamic)) {
        let label =
          type.nodeName === `media` ? `media-inline-bytes` : `prose-attr-bytes`;
        for (let [
          resolveDataOperationEngineProseDepth5Result,
          node,
        ] of resolveDataOperationEngineMap(type) as Dynamic) {
          if (node.deleted) continue;
          context.add(node);
          resolveDataOperationEngineProseAttrBytes(
            resolveDataOperationEngineProseDepth5Result,
          );
          if (!(node.content instanceof (ContentAny as Dynamic)))
            throw new (EngineRefuse as Dynamic)(`prose-crdt-smuggle`);
          let content2: Dynamic = node.content.getContent();
          if (content2.length !== 1)
            throw new (EngineRefuse as Dynamic)(`prose-crdt-smuggle`);
          resolveDataOperationEngineLeft(content2[0], label);
        }
        resolveDataOperationEngineProseDepth5(type, options + 1, context);
      } else if (type instanceof (XmlText as Dynamic))
        resolveDataOperationEngineProseFormatCeiling(type, context);
      else throw new (EngineRefuse as Dynamic)(`prose-crdt-smuggle`);
    }
    dataOperationEngineStart = dataOperationEngineStart.right;
  }
}

function resolveDataOperationEngineProseFormatCeiling(
  dataOperationEngineProse?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  resolveDataOperationEngineProseCrdtSmuggle(dataOperationEngineProse);
  let index = 0;
  let index2 = 0;
  let dataOperationEngineStart: Dynamic = resolveDataOperationEngineStart(
    dataOperationEngineProse,
  );
  for (; dataOperationEngineStart; ) {
    if (!dataOperationEngineStart.deleted) {
      options.add(dataOperationEngineStart);
      let content: Dynamic = dataOperationEngineStart.content;
      if (content instanceof (ContentString as Dynamic)) index2++;
      else if (content instanceof (ContentFormat as Dynamic)) {
        if (++index > dataOperationEngineValue10242)
          throw new (EngineRefuse as Dynamic)(`prose-format-ceiling`);
        let content2: Dynamic = content;
        resolveDataOperationEngineProseAttrKey(content2.key);
        if (content2.value !== null) {
          resolveDataOperationEngineLeft(content2.value, `prose-attr-bytes`);
        }
      } else throw new (EngineRefuse as Dynamic)(`prose-crdt-smuggle`);
    }
    dataOperationEngineStart = dataOperationEngineStart.right;
  }
}

function getDataOperationEngineClients(
  dataOperationEngineClients?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let clientEntry: Dynamic =
    dataOperationEngineClients.store.clients.get(options);
  if (!clientEntry || clientEntry.length === 0) return 0;
  let clientEntryItem: Dynamic = clientEntry[clientEntry.length - 1];
  return clientEntryItem.id.clock + clientEntryItem.length;
}

function resolveDataOperationEngineProseCrdtSmuggle2(
  dataOperationEngineProseCrdtSmuggle2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let clients: Dynamic = dataOperationEngineProseCrdtSmuggle2.store.clients;
  let count: Dynamic = 0;
  for (let resolveDataOperationEngineProseCrdtSmuggle2Result of clients.values() as Dynamic)
    for (let resolveDataOperationEngineProseCrdtSmuggle2Result2 of resolveDataOperationEngineProseCrdtSmuggle2Result as Dynamic) {
      if (
        resolveDataOperationEngineProseCrdtSmuggle2Result2 instanceof
        (GC as Dynamic)
      )
        continue;
      if (
        !(
          resolveDataOperationEngineProseCrdtSmuggle2Result2 instanceof
          (Item as Dynamic)
        )
      )
        throw new (EngineRefuse as Dynamic)(`prose-crdt-smuggle`);
      let resolveDataOperationEngineProseCrdtSmuggle2Result3: Dynamic =
        resolveDataOperationEngineProseCrdtSmuggle2Result2;
      if (
        typeof resolveDataOperationEngineProseCrdtSmuggle2Result3.parentSub ==
          `string` &&
        (resolveDataOperationEngineProseAttrBytes(
          resolveDataOperationEngineProseCrdtSmuggle2Result3.parentSub,
        ),
        resolveDataOperationEngineProseCrdtSmuggle2Result3.deleted &&
          ((count +=
            resolveDataOperationEngineProseCrdtSmuggle2Result3.parentSub
              .length),
          count > dataOperationEngineValue65536))
      )
        throw new (EngineRefuse as Dynamic)(`prose-tombstone-mass`);
      if (resolveDataOperationEngineProseCrdtSmuggle2Result3.deleted) {
        if (
          !(
            resolveDataOperationEngineProseCrdtSmuggle2Result3.content instanceof
            (ContentDeleted as Dynamic)
          )
        )
          throw new (EngineRefuse as Dynamic)(`prose-crdt-smuggle`);
      } else if (
        !options.has(resolveDataOperationEngineProseCrdtSmuggle2Result2)
      )
        throw new (EngineRefuse as Dynamic)(`prose-crdt-smuggle`);
    }
}

function resolveDataOperationEngineProseCrdtSmuggle3(
  dataOperationEngineProseCrdtSmuggle3?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  resolveDataOperationEngineProsemirror(dataOperationEngineProseCrdtSmuggle3);
  if (
    dataOperationEngineProseCrdtSmuggle3.subdocs &&
    dataOperationEngineProseCrdtSmuggle3.subdocs.size > 0
  )
    throw new (EngineRefuse as Dynamic)(`prose-crdt-smuggle`);
  let clients: Dynamic = dataOperationEngineProseCrdtSmuggle3.store.clients;
  let index = 0;
  for (let resolveDataOperationEngineProseCrdtSmuggle3Result of clients.keys() as Dynamic)
    if (
      !DataOperationEngineState4.includes(
        resolveDataOperationEngineProseCrdtSmuggle3Result,
      )
    ) {
      index++;
    }
  if (index > dataOperationEngineValue4096)
    throw new (EngineRefuse as Dynamic)(`prose-client-ceiling`);
  for (let resolveDataOperationEngineProseCrdtSmuggle3Result of clients.keys() as Dynamic)
    if (
      getDataOperationEngineClients(
        dataOperationEngineProseCrdtSmuggle3,
        resolveDataOperationEngineProseCrdtSmuggle3Result,
      ) > DataOperationEngineState2
    )
      throw new (EngineRefuse as Dynamic)(`prose-clock`);
  resolveDataOperationEngineProseCrdtSmuggle2(
    dataOperationEngineProseCrdtSmuggle3,
    resolveDataOperationEngineValue12(
      dataOperationEngineProseCrdtSmuggle3.getXmlFragment(
        DataOperationEngineProsemirror,
      ),
    ),
  );
}

function resolveDataOperationEngineYdoc(
  dataOperationEngineYdoc?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let ydoc: Dynamic = resolveDataOperationEngineValue10(
    dataOperationEngineYdoc,
  );
  let dataOperationEngineProseNoYdoc: Dynamic =
    resolveDataOperationEngineProseNoYdoc({
      ydoc: ydoc,
    });
  let store: Dynamic = dataOperationEngineProseNoYdoc.store;
  if (store.pendingStructs !== null || store.pendingDs !== null)
    throw new (EngineRefuse as Dynamic)(`prose-pending`);
  resolveDataOperationEngineProseCrdtSmuggle3(dataOperationEngineProseNoYdoc);
  let doc: Dynamic = resolveDataOperationEngineGetXmlFragment(
    dataOperationEngineProseNoYdoc,
  );
  resolveDataOperationEngineValue13(doc);
  return {
    doc: doc,
    ydoc: ydoc,
  };
}

function resolveDataOperationEngineProseOpSize(
  dataOperationEngineProseOpSize?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  resolveDataOperationEngineProseDepth4(dataOperationEngineProseOpSize);
  resolveDataOperationEngineProseDepth2(dataOperationEngineProseOpSize);
  if (
    JSON.stringify(dataOperationEngineProseOpSize).length >
    dataOperationEngineValue80000002
  )
    throw new (EngineRefuse as Dynamic)(`prose-op-size`);
  resolveDataOperationEngineProseDepth3(dataOperationEngineProseOpSize);
  resolveDataOperationEngineProseDepth6(dataOperationEngineProseOpSize);
}

function resolveDataOperationEngineProseDepth6(
  dataOperationEngineProseDepth6?: unknown,
  options: Dynamic = new (Set as Dynamic)(),
  context: Dynamic = 0,
  ..._extraArguments: unknown[]
): undefined {
  if (context > dataOperationEngineValue1024)
    throw new (EngineRefuse as Dynamic)(`prose-depth`);
  if (
    typeof dataOperationEngineProseDepth6 != `object` ||
    !dataOperationEngineProseDepth6
  )
    return;
  let dataOperationEngineProseDepth62: Dynamic = dataOperationEngineProseDepth6;
  if (
    dataOperationEngineProseDepth62.attrs !== null &&
    typeof dataOperationEngineProseDepth62.attrs == `object`
  ) {
    let bid: Dynamic = dataOperationEngineProseDepth62.attrs.bid;
    if (typeof bid == `string`) {
      if (options.has(bid))
        throw new (EngineRefuse as Dynamic)(`prose-bid-collision`);
      options.add(bid);
    }
  }
  if (Array.isArray(dataOperationEngineProseDepth62.content))
    for (let resolveDataOperationEngineProseDepth6Result of dataOperationEngineProseDepth62.content as Dynamic)
      resolveDataOperationEngineProseDepth6(
        resolveDataOperationEngineProseDepth6Result,
        options,
        context + 1,
      );
}

function resolveDataOperationEngineValue13(
  dataOperationEngineValue13?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  resolveDataOperationEngineProseDepth4(dataOperationEngineValue13);
  resolveDataOperationEngineProseDepth2(dataOperationEngineValue13);
  resolveDataOperationEngineProseDepth3(dataOperationEngineValue13);
}

var resolveDataOperationEngineCode: Dynamic;

var dataOperationEngineDescribeSchema6: Dynamic;

var dataOperationEngineDescribeSchema7: Dynamic;

var dataOperationEngineParagraphSchema: Dynamic;

var dataOperationEngineBidSchema: Dynamic;

var dataOperationEngineRefSchema: Dynamic;

var dataOperationEngineBidSchema2: Dynamic;

var dataOperationEngineDescribeSchema8: Dynamic;

var dataOperationEngineParentSchema2: Dynamic;

function getDataOperationEngineRuns(
  dataOperationEngineRuns?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dataContentAndReferencesReason: Dynamic =
    resolveDataContentAndReferencesReason(options, context);
  if (!dataContentAndReferencesReason.ok) return;
  let {
    runs: dataContentAndReferencesReason2,
    at: dataContentAndReferencesReason3,
  }: Dynamic = dataContentAndReferencesReason;
  let total: Dynamic = dataContentAndReferencesReason3 + context.exact.length;
  let dataContentAndReferencesStart = resolveDataContentAndReferencesStart(
    dataContentAndReferencesReason2,
    dataContentAndReferencesReason3,
  );
  let dataContentAndReferencesStart2 = resolveDataContentAndReferencesStart(
    dataContentAndReferencesReason2,
    total - 1,
  );
  let dataContentAndReferencesReasonItem: Dynamic =
    dataContentAndReferencesReason2[dataContentAndReferencesStart];
  let dataContentAndReferencesReasonItem2: Dynamic =
    dataContentAndReferencesReason2[dataContentAndReferencesStart2];
  if (
    total >
    dataContentAndReferencesReasonItem2.start +
      dataContentAndReferencesReasonItem2.text.length
  )
    return;
  let pathSlice: Dynamic = dataContentAndReferencesReasonItem.path.slice(0, -1);
  if (
    dataContentAndReferencesReasonItem2.path.length !==
      dataContentAndReferencesReasonItem.path.length ||
    dataContentAndReferencesReasonItem2.path
      .slice(0, -1)
      .some(
        (
          pathSlice2?: Dynamic,
          index2?: Dynamic,
          ..._extraArguments: unknown[]
        ) => pathSlice2 !== pathSlice[index2],
      )
  )
    return;
  let options2: Dynamic = options;
  let dataOperationEngineRuns2: Dynamic = dataOperationEngineRuns;
  for (let getDataOperationEngineRunsResult of pathSlice as Dynamic) {
    let content2: Dynamic = options2.content ?? [];
    let index2 = 0;
    let index3 = 0;
    for (; index3 < getDataOperationEngineRunsResult; ) {
      if (content2[index3]?.text !== undefined)
        for (
          ;
          index3 < getDataOperationEngineRunsResult &&
          content2[index3]?.text !== undefined;

        )
          index3++;
      else index3++;
      index2++;
    }
    let dataOperationEngineRunEntry2: Dynamic =
      dataOperationEngineRuns2.get(index2);
    if (!(dataOperationEngineRunEntry2 instanceof (XmlElement as Dynamic)))
      return;
    options2 = content2[getDataOperationEngineRunsResult];
    dataOperationEngineRuns2 = dataOperationEngineRunEntry2;
  }
  let content: Dynamic = options2.content ?? [];
  let pathItem: Dynamic =
    dataContentAndReferencesReasonItem.path[
      dataContentAndReferencesReasonItem.path.length - 1
    ];
  let pathItem2: Dynamic = pathItem;
  for (; pathItem2 > 0 && content[pathItem2 - 1]?.text !== undefined; )
    pathItem2--;
  let pathItem3: Dynamic =
    dataContentAndReferencesReasonItem2.path[
      dataContentAndReferencesReasonItem2.path.length - 1
    ];
  for (let pathItem4: Dynamic = pathItem2; pathItem4 <= pathItem3; pathItem4++)
    if (content[pathItem4]?.text === undefined) return;
  let index = 0;
  {
    let index2 = 0;
    for (; index2 < pathItem2; ) {
      if (content[index2]?.text !== undefined)
        for (; index2 < pathItem2 && content[index2]?.text !== undefined; )
          index2++;
      else index2++;
      index++;
    }
  }
  let dataOperationEngineRunEntry: Dynamic =
    dataOperationEngineRuns2.get(index);
  if (!(dataOperationEngineRunEntry instanceof (XmlText as Dynamic))) return;
  let from: Dynamic = 0;
  for (let pathItem4: Dynamic = pathItem2; pathItem4 < pathItem; pathItem4++)
    from += content[pathItem4].text.length;
  from +=
    dataContentAndReferencesReason3 - dataContentAndReferencesReasonItem.start;
  let len: Dynamic = context.exact.length;
  if (
    dataOperationEngineRunEntry
      .toDelta()
      .reduce(
        (
          accumulator?: Dynamic,
          toDelta?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          accumulator +
          (typeof toDelta.insert == `string` ? toDelta.insert : ``),
        ``,
      )
      .slice(from, from + len) === context.exact
  )
    return {
      yt: dataOperationEngineRunEntry,
      from: from,
      len: len,
    };
}

function resolveDataOperationEngineYdoc2(
  dataOperationEngineYdoc2?: Dynamic,
  ydoc?: Dynamic,
  context?: Dynamic,
  threadId?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let resolveDataOperationEngineYdoc2Result: Dynamic;
  try {
    resolveDataOperationEngineYdoc2Result =
      resolveDataOperationEngineProseNoYdoc({
        ydoc: ydoc,
      });
  } catch {
    return;
  }
  resolveDataOperationEngineYdoc2Result.clientID = 4;
  let encodeStateVector2: Dynamic = encodeStateVector(
    resolveDataOperationEngineYdoc2Result,
  );
  let dataOperationEngineRuns: Dynamic = getDataOperationEngineRuns(
    resolveDataOperationEngineYdoc2Result.getXmlFragment(
      DataOperationEngineProsemirror,
    ),
    dataOperationEngineYdoc2,
    context,
  );
  if (dataOperationEngineRuns === undefined) return;
  let dataOperationEngineType: Dynamic = resolveDataOperationEngineType(
    {
      type: `commentAnchor`,
      attrs: {
        threadId: threadId,
      },
    },
    false,
  );
  dataOperationEngineRuns.yt.format(
    dataOperationEngineRuns.from,
    dataOperationEngineRuns.len,
    {
      [dataOperationEngineType]: {
        threadId: threadId,
      },
    },
  );
  return resolveDataOperationEngineApply(
    encodeStateAsUpdate(
      resolveDataOperationEngineYdoc2Result,
      encodeStateVector2,
    ),
  );
}

function resolveDataOperationEngineCommentAnchor2(
  dataOperationEngineCommentAnchor2?: unknown,
  options: Dynamic = new (Set as Dynamic)(),
  context: Dynamic = 0,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    context > dataOperationEngineValue1024 ||
    typeof dataOperationEngineCommentAnchor2 != `object` ||
    !dataOperationEngineCommentAnchor2
  )
    return options;
  let dataOperationEngineCommentAnchor22: Dynamic =
    dataOperationEngineCommentAnchor2;
  if (Array.isArray(dataOperationEngineCommentAnchor22.marks))
    for (let resolveDataOperationEngineCommentAnchor2Result of dataOperationEngineCommentAnchor22.marks as Dynamic) {
      if (
        resolveDataOperationEngineCommentAnchor2Result?.type !== `commentAnchor`
      )
        continue;
      let threadId: Dynamic =
        resolveDataOperationEngineCommentAnchor2Result.attrs?.threadId;
      if (typeof threadId == `string`) {
        options.add(threadId);
      }
    }
  if (Array.isArray(dataOperationEngineCommentAnchor22.content))
    for (let resolveDataOperationEngineCommentAnchor2Result of dataOperationEngineCommentAnchor22.content as Dynamic)
      resolveDataOperationEngineCommentAnchor2(
        resolveDataOperationEngineCommentAnchor2Result,
        options,
        context + 1,
      );
  return options;
}

var dataOperationEngineProseSchema: Dynamic;

var dataOperationEngineEngineSchema4: Dynamic;

var dataOperationEngineEngineSchema5: Dynamic;

var dataOperationEngineEngineSchema6: Dynamic;

var dataOperationEngineEngineSchema7: Dynamic;

var dataOperationEngineDescribeSchema9: Dynamic;

function resolveDataOperationEngineParent(
  dataOperationEngineParent?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  resolveDataOperationEngineProseOpSize(dataOperationEngineParent.doc);
  let dataOperationEngineGuid: Dynamic = resolveDataOperationEngineGuid(1);
  dataOperationEngineGuid.transact((..._extraArguments: unknown[]) =>
    resolveDataOperationEngineShape3(
      dataOperationEngineGuid.getXmlFragment(DataOperationEngineProsemirror),
      dataOperationEngineParent.doc,
    ),
  );
  let dataOperationEngineYdoc: Dynamic = resolveDataOperationEngineYdoc(
    dataOperationEngineGuid,
  );
  return {
    ...(dataOperationEngineParent.parent === undefined
      ? {}
      : {
          parent: dataOperationEngineParent.parent,
        }),
    ...(dataOperationEngineParent.isDocument === undefined
      ? {}
      : {
          isDocument: dataOperationEngineParent.isDocument,
        }),
    ...(dataOperationEngineParent.localId === undefined
      ? {}
      : {
          localId: dataOperationEngineParent.localId,
        }),
    ...dataOperationEngineYdoc,
  };
}

function resolveDataOperationEngineFatal(
  dataOperationEngineFatal?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let resolveDataOperationEngineFatalResult: Dynamic;
  try {
    resolveDataOperationEngineFatalResult = new TextDecoder(`utf-8`, {
      fatal: true,
    }).decode(dataOperationEngineFatal);
  } catch {
    throw new (EngineRefuse as Dynamic)(`prose-blob-decode`);
  }
  let resolveDataOperationEngineFatalResult2: Dynamic;
  try {
    resolveDataOperationEngineFatalResult2 = JSON.parse(
      resolveDataOperationEngineFatalResult,
    );
  } catch {
    throw new (EngineRefuse as Dynamic)(`prose-blob-decode`);
  }
  if (
    typeof resolveDataOperationEngineFatalResult2 != `object` ||
    !resolveDataOperationEngineFatalResult2 ||
    Array.isArray(resolveDataOperationEngineFatalResult2)
  )
    throw new (EngineRefuse as Dynamic)(`prose-blob-decode`);
  return resolveDataOperationEngineFatalResult2;
}

function resolveDataOperationEngineDoc(
  dataOperationEngineDoc?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return resolveDataOperationEngineParent({
    doc: resolveDataOperationEngineFatal(dataOperationEngineDoc.bytes),
    ...(dataOperationEngineDoc.parent === undefined
      ? {}
      : {
          parent: dataOperationEngineDoc.parent,
        }),
    ...(dataOperationEngineDoc.localId === undefined
      ? {}
      : {
          localId: dataOperationEngineDoc.localId,
        }),
  });
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeDataOperationEngine1Step1(): void {
  lazyZod
    .enum(dataEnumsAndValidationCreateUpdateReadDeleteValues)
    .describe(
      `The four verbs engines speak. Query and access never reach an engine — they are room physics (page 03 rows 12-13).`,
    );
  (dataOperationEngineDescribeSchema = lazyZod
    .enum(dataEnumsAndValidationJsonBlobProseIronValues)
    .describe(
      `Which machinery touches the content — dictates BOTH the update payload and the read shape. json = default lane (plain JSON values/patches), blob = immutable content-addressed byte records, prose = the CRDT lane (PM steps / yjs merge), iron = office-format content (xlsx first; strict op-vocabulary cells, content-addressed value), text = plain text (splice + hash-CAS), widget = the code node's draft/publish FSM. Orthogonal to OpType: the verb says what happened to the object, the engine says how. (The propose lane is RETIRED — proposals are staged-status runs; enums.ts.)`,
    ));
  (dataOperationEngineEngineSchema = lazyZod
    .object({
      engine: dataOperationEngineDescribeSchema.default(`json`),
    })
    .describe(
      `Base create op — the engine dictates the birth payload too. Objects extend this with their own fields.`,
    ));
  (dataOperationEngineEngineSchema2 = lazyZod
    .object({
      engine: dataOperationEngineDescribeSchema.default(`json`),
    })
    .describe(`Base read op — the engine dictates the shape you get back.`));
  (dataOperationEngineEngineSchema3 = lazyZod
    .object({
      engine: dataOperationEngineDescribeSchema.default(`json`),
    })
    .describe(
      `Base update op — the engine names the machinery that applies the edit and the payload arm that comes with it.`,
    ));
  (EngineRefuse = class extends Error {
    [key: string]: Dynamic;
    reason: Dynamic;
    constructor(engineRefuse?: Dynamic, ..._extraArguments: unknown[]) {
      super(engineRefuse);
      this.reason = engineRefuse;
      this.name = `EngineRefuse`;
    }
  });
  (DataOperationEngineState = lazyZod.object({}));
  (resolveDataOperationEngineCreate = (
    dataOperationEngineCreate?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    create: dataOperationEngineEngineSchema.extend({
      engine: lazyZod
        .literal(dataOperationEngineCreate)
        .default(dataOperationEngineCreate),
    }),
    read: dataOperationEngineEngineSchema2.extend({
      engine: lazyZod
        .literal(dataOperationEngineCreate)
        .default(dataOperationEngineCreate),
    }),
    update: dataOperationEngineEngineSchema3.extend({
      engine: lazyZod
        .literal(dataOperationEngineCreate)
        .default(dataOperationEngineCreate),
    }),
    delete: DataOperationEngineState,
    value: lazyZod
      .unknown()
      .describe(
        dataOperationEngineCreate + ` stored-value shape — not yet declared.`,
      ),
    apply: (..._extraArguments: unknown[]): undefined => {
      throw Error(
        dataOperationEngineCreate +
          ` engine: no runtime wired — compose it into the engine set (make…Engine)`,
      );
    },
  }));
  (resolveDataOperationEngineValue5 = (
    dataOperationEngineValue5?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    throw Error(
      `kind dispatch: FoldCtx.${dataOperationEngineValue5} is not threaded — no bound method may consume ctx until the room supplies a real one`,
    );
  });
  (DataOperationEngineActor = Object.freeze({
    get at() {
      return resolveDataOperationEngineValue5(`at`);
    },
    get actor() {
      return resolveDataOperationEngineValue5(`actor`);
    },
    blob: (..._extraArguments: unknown[]) =>
      resolveDataOperationEngineValue5(`blob`),
    effects: {
      get: (..._extraArguments: unknown[]) =>
        resolveDataOperationEngineValue5(`effects`),
    },
  }));
  (loadDataOperationEngineThen = (
    dataOperationEngineThen?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      typeof context == `object` &&
      context &&
      typeof context.then == `function`
    )
      throw Error(
        `kind dispatch: ${dataOperationEngineThen.name} ${options} returned a thenable — async methods are not composed through this dispatcher (the iron exception's whole reason); make the arm sync or bring the composition ruling`,
      );
  });
  (dataOperationEngineWeakSet = new (WeakSet as Dynamic)());
  (resolveDataOperationEngineValue7 = (
    dataOperationEngineValue7?: unknown,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    typeof dataOperationEngineValue7 == `function` &&
    dataOperationEngineWeakSet.has(dataOperationEngineValue7));
  (dataOperationEngineJsonBlobTextProseValues = [
    `json`,
    `blob`,
    `text`,
    `prose`,
    `iron`,
    `widget`,
    `database`,
  ]);
  (DataOperationEngineCustom = lazyZod.custom(
    (dataOperationEngineCustom?: unknown, ..._extraArguments: unknown[]) =>
      !!dataOperationEngineCustom &&
      typeof dataOperationEngineCustom == `object` &&
      `_def` in dataOperationEngineCustom,
  ));
  (DataOperationEngineObjectTypes = lazyZod.strictObject({
    objectTypes: lazyZod.array(lazyZod.string()).min(1),
    payload: DataOperationEngineCustom,
    effects: DataOperationEngineCustom.optional(),
    description: lazyZod.string().min(1),
  }));
  (DataOperationEngineRegex = lazyZod
    .string()
    .regex(/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/));
  (DataOperationEngineVerbs = lazyZod.strictObject({
    name: lazyZod.enum(dataOperationEngineJsonBlobTextProseValues),
    verbs: lazyZod.strictObject({
      create: lazyZod
        .record(DataOperationEngineRegex, DataOperationEngineObjectTypes)
        .optional(),
      update: lazyZod
        .record(DataOperationEngineRegex, DataOperationEngineObjectTypes)
        .optional(),
      read: lazyZod
        .record(DataOperationEngineRegex, DataOperationEngineObjectTypes)
        .optional(),
    }),
    grammars: lazyZod
      .record(
        lazyZod.string(),
        lazyZod.object({
          schema: DataOperationEngineCustom,
          description: lazyZod.string(),
          group: lazyZod.string().min(1).optional(),
        }),
      )
      .optional(),
    familyMeta: lazyZod
      .partialRecord(
        lazyZod.enum([`create`, `update`, `read`]),
        lazyZod.strictObject({
          discriminator: lazyZod.string().min(1),
          legacyDiscriminators: lazyZod.array(lazyZod.string().min(1)).optional(),
        }),
      )
      .optional(),
  }));
  (dataOperationEngineDescribeSchema2 = lazyZod
    .string()
    .regex(/^blob\/[A-Za-z0-9_-]{1,64}$/)
    .describe(
      `A blob object ref (blob/<id>) — the SOURCE bytes' address. Strict charset: a ref can never carry a data: URI, quotes, or markup. The blob is host-testified at blob-noun creation; the seed arm only references it.`,
    ));
  (dataOperationEngineParentSchema = lazyZod
    .strictObject({
      id: dataOperationEngineDescribeSchema2.describe(
        `The SOURCE blob (blob/<id>) whose bytes seed this content, decoded engine-specifically. NOT the new object's id — the room mints that.`,
      ),
      parent: dataContentAndReferencesDescribeSchema5
        .optional()
        .describe(
          `The universal parent edge — the file this content node backs (REQUIRED on node via the engine's valueFor; absent on utterance).`,
        ),
    })
    .describe(
      `The shared create.blob seed arm: birth this engine's content by seeding from the referenced blob's bytes. ONE definition, referenced by both prose.create.blob and iron.create.blob; engine-specific decode only.`,
    ));
  (collectDataOperationEngineKeys = (
    collectDataOperationEngineKeys2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => [
    ...Object.keys(collectDataOperationEngineKeys2.verbs.create ?? {}).map(
      (createKey?: Dynamic, ..._extraArguments: unknown[]) =>
        `${collectDataOperationEngineKeys2.name}.create.${createKey}`,
    ),
    ...Object.keys(collectDataOperationEngineKeys2.verbs.update ?? {}).map(
      (updateKey?: Dynamic, ..._extraArguments: unknown[]) =>
        `${collectDataOperationEngineKeys2.name}.update.${updateKey}`,
    ),
    ...Object.keys(collectDataOperationEngineKeys2.verbs.read ?? {}).map(
      (readKey?: Dynamic, ..._extraArguments: unknown[]) =>
        `${collectDataOperationEngineKeys2.name}.read.${readKey}`,
    ),
  ]);
  (resolveDataOperationEngineValue8 = (
    ..._extraArguments: unknown[]
  ): Dynamic => ({}));
  (dataOperationEngineProjectFileNodeRunValues = [
    `project`,
    `file`,
    `node`,
    `run`,
    `utterance`,
    `routine`,
    `enum`,
    `spec`,
    `suite`,
    `blob`,
    `database`,
  ]);
  (resolveDataOperationEngineIncludes = (
    dataOperationEngineIncludes?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    dataOperationEngineIncludes !== undefined &&
    dataOperationEngineProjectFileNodeRunValues.includes(
      dataOperationEngineIncludes,
    ));
  (DataOperationEngineProject = {
    project: `json`,
    file: `json`,
    node: `json`,
    run: `json`,
    utterance: `json`,
    routine: `json`,
    enum: `json`,
    spec: `json`,
    suite: `json`,
    blob: `blob`,
    database: `database`,
  });
  lazyZod
    .enum([`internal`, `ants`])
    .describe(
      `branch — a release branch a noun exists on: ants = user-facing, internal = machinery. The one live enum (engines/kind.ts BRANCHES); the noun catalog's branches arrays and the door's op-level branch field both reference it. Growth = new enum values through the codeowner gate.`,
    );
  (DataOperationEngineJson = {
    json: 4,
    blob: 0,
    text: 1,
    prose: 0,
    iron: 4,
    widget: 8,
    database: 6,
  });
  (DataOperationEngineRecord = lazyZod.record(
    lazyZod.string(),
    lazyZod.json(),
  ));
  (dataOperationEngineAfterBidSchema = lazyZod.discriminatedUnion(
    `op`,
    [
      lazyZod
        .strictObject({
          op: lazyZod.literal(`add`),
          after_bid: lazyZod
            .string()
            .optional()
            .describe(
              `The bid of the existing block to insert AFTER (same parent, next sibling). Omit to append at the END of the top-level fragment.`,
            ),
          value: DataOperationEngineRecord.describe(
            `PM-JSON of the block(s) to insert. A single block ({type:"paragraph",…}) or a doc-wrapped list ({type:"doc", content:[…]}) — both are flattened.`,
          ),
        })
        .describe(
          "Insert new block(s) after `after_bid`, or append at the fragment end.",
        ),
      lazyZod
        .strictObject({
          op: lazyZod.literal(`update`),
          bid: lazyZod
            .string()
            .describe(
              `The stable bid of the block to replace (attrs.bid from a v3_read).`,
            ),
          value: DataOperationEngineRecord.describe(
            "PM-JSON replacing the addressed block's ENTIRE subtree. A single block or a doc-wrapped list; the FIRST emitted element inherits `bid` IFF its type is one that carries attrs.bid (paragraph/heading/list/table/…); replacing with media/an inline atom CONSUMES the addressed bid, so a later op in this array addressing it refuses prose-bid-consumed.",
          ),
        })
        .describe(`Replace the addressed block's subtree wholesale.`),
      lazyZod
        .strictObject({
          op: lazyZod.literal(`delete`),
          bid: lazyZod
            .string()
            .describe(`The stable bid of the block to remove.`),
        })
        .describe(`Remove the addressed block (and its subtree).`),
    ],
  ));
  (resolveDataOperationEngineShape = (
    node?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let resolveDataOperationEngineShapeResult: Dynamic;
    if (node.type === `doc`) {
      let content: Dynamic = node.content;
      if (content === undefined) resolveDataOperationEngineShapeResult = [];
      else if (Array.isArray(content))
        resolveDataOperationEngineShapeResult = content;
      else throw new (EngineRefuse as Dynamic)(`shape`);
    } else resolveDataOperationEngineShapeResult = [node];
    for (let resolveDataOperationEngineShapeResult2 of resolveDataOperationEngineShapeResult as Dynamic)
      if (
        typeof resolveDataOperationEngineShapeResult2 != `object` ||
        !resolveDataOperationEngineShapeResult2 ||
        resolveDataOperationEngineShapeResult2.type === `text`
      )
        throw new (EngineRefuse as Dynamic)(`shape`);
    return resolveDataOperationEngineShapeResult;
  });
  (DataOperationEngineRegex2 = lazyZod
    .string()
    .regex(/^[A-Za-z0-9_.:-]{1,48}$/));
  (dataOperationEngineNodeSchema = lazyZod
    .object({
      node: lazyZod.string().min(1).max(64),
      anchor: lazyZod.union([
        lazyZod.object({
          kind: lazyZod.literal(`chars`),
          range: lazyZod.tuple([
            DataOperationEngineRegex2,
            DataOperationEngineRegex2,
          ]),
        }),
        lazyZod.object({
          kind: lazyZod.literal(`blocks`),
          ids: lazyZod.array(DataOperationEngineRegex2).min(1).max(128),
        }),
      ]),
      head: lazyZod.enum([`start`, `end`]),
      caret: lazyZod.literal(true).optional(),
    })
    .describe(
      `Where a selection is in a prose node, as an anchor: {node, anchor: {kind:'chars', range:[firstId,lastId]} | {kind:'blocks', ids:[...]}, head: 'start'|'end', caret?: true}. chars = first and last selected char (inclusive); blocks = selected blocks in document order; caret = collapsed (nothing selected, the flag at the head end).`,
    ));
  (dataOperationEngineDescribeSchema3 = lazyZod
    .string()
    .regex(/^[A-Z]{1,3}[1-9][0-9]{0,6}$/)
    .describe(
      `A1-style cell within the sheet, e.g. B3. A coordinate: no edit invalidates it.`,
    ));
  (resolveDataOperationEngineRow = (
    dataOperationEngineRow?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let matchItem: Dynamic = dataOperationEngineRow.match(/^[A-Z]+/)?.[0];
    if (matchItem !== undefined)
      return {
        row: Number(dataOperationEngineRow.slice(matchItem.length)),
        col: resolveDataContentAndReferencesToUpperCase(matchItem),
      };
  });
  (dataOperationEngineValue1048576 = 1048576);
  (dataOperationEngineValue16384 = 16384);
  (dataOperationEngineSheetIdSchema = lazyZod
    .strictObject({
      sheetId: lazyZod
        .number()
        .int()
        .nonnegative()
        .describe(
          `Iron's stable sheet id — NOT the sheet name, which rots on rename.`,
        ),
      cell: dataOperationEngineDescribeSchema3.optional(),
      range: lazyZod
        .strictObject({
          start: dataOperationEngineDescribeSchema3,
          end: dataOperationEngineDescribeSchema3,
        })
        .refine(
          (
            dataOperationEngineSheetIdSchema2?: Dynamic,
            ..._extraArguments: unknown[]
          ) => {
            let dataOperationEngineRow: Dynamic = resolveDataOperationEngineRow(
              dataOperationEngineSheetIdSchema2.start,
            );
            let dataOperationEngineRow2: Dynamic = resolveDataOperationEngineRow(
              dataOperationEngineSheetIdSchema2.end,
            );
            return (
              dataOperationEngineRow !== undefined &&
              dataOperationEngineRow2 !== undefined &&
              dataOperationEngineRow.row <= dataOperationEngineRow2.row &&
              dataOperationEngineRow.col <= dataOperationEngineRow2.col &&
              dataOperationEngineRow2.row <= dataOperationEngineValue1048576 &&
              dataOperationEngineRow2.col <= dataOperationEngineValue16384
            );
          },
          {
            message: `corners must be normalized (start top-left, end bottom-right) and inside the grid`,
          },
        )
        .optional()
        .describe(
          `Selection extent as normalized A1 corners {start: top-left, end: bottom-right}, inside the real grid (max XFD1048576). Absent = collapsed (cursor only).`,
        ),
    })
    .refine(
      (
        dataOperationEngineSheetIdSchema2?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        dataOperationEngineSheetIdSchema2.range === undefined ||
        dataOperationEngineSheetIdSchema2.cell !== undefined,
      {
        message: `range requires cell (sheet-only = neither)`,
      },
    )
    .describe(
      `Where a cursor is in a sheet: {sheetId, cell?, range?}. cell is the active cell; range, when present, is the selection extent; neither = sheet-only (present on this sheet, no caret).`,
    ));
  (dataOperationEngineLineSchema = lazyZod
    .strictObject({
      line: lazyZod.number().int().nonnegative(),
      col: lazyZod.number().int().nonnegative(),
    })
    .describe(
      `Where a cursor is in plain text: {line, col}. Coordinates renumber under concurrent edits (a 10s-lifetime cursor accepts that); a COMMENT must not, which is why text's target quotes instead.`,
    ));
  (dataOperationEngineDescribeSchema4 = lazyZod
    .string()
    .min(1)
    .describe(
      `One step into the value: an OBJECT KEY. The json patch lane walks object spines only — array-index patching is refused (deny patch-path; replace arrays whole via set). __proto__/constructor/prototype are banned as prototype-pollution vectors.`,
    ));
  (dataOperationEngineDescribeSchema5 = lazyZod
    .array(dataOperationEngineDescribeSchema4)
    .min(1)
    .describe(
      `Where the entry lands — key segments from the value's root. At least one segment: replacing the root wholesale is the {value} arm's business.`,
    ));
  (dataOperationEnginePathSchema = lazyZod
    .object({
      path: dataOperationEngineDescribeSchema5.describe(
        `WHERE inside the value — the same key-segment spine {patch} edits land on.`,
      ),
    })
    .describe(
      `WHERE inside a json value a comment anchors: a patch path. The object is the target's ref; anchor ABSENT = the whole object.`,
    ));
  (dataOperationEngineQuoteSchema = lazyZod
    .object({
      quote: lazyZod
        .object({
          prefix: lazyZod
            .string()
            .describe(
              `The text immediately BEFORE the quote — disambiguates a span whose exact occurs more than once (v1 window: ~32 chars). Empty when the quote starts the content.`,
            ),
          exact: lazyZod
            .string()
            .min(1)
            .describe(
              `The quoted text itself, verbatim, as it read when the comment was made. Never empty — an empty quote is a whole-node comment, which is anchor ABSENT.`,
            ),
          suffix: lazyZod
            .string()
            .describe(
              `The text immediately AFTER the quote — the other half of the disambiguation window. Empty when the quote ends the content.`,
            ),
        })
        .describe(
          `A text-quote selector (W3C TextQuoteSelector shape): survives edits where any offset rots.`,
        ),
    })
    .describe(
      `WHERE inside a prose value a comment anchors: a text quote. The node itself is the target's ref; anchor ABSENT = the whole node.`,
    ));
  (DataOperationEngineProsemirror = `prosemirror`);
  (DataOperationEngineV3Prose = `v3-prose`);
  (resolveDataOperationEngineGuid = (
    dataOperationEngineGuid?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let doc: Dynamic = new (Doc as Dynamic)({
      guid: DataOperationEngineV3Prose,
      gc: true,
    });
    doc.clientID = dataOperationEngineGuid;
    return doc;
  });
  (resolveDataOperationEngineValue10 = (
    dataOperationEngineValue10?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    resolveDataOperationEngineApply(
      encodeStateAsUpdate(dataOperationEngineValue10),
    ));
  (resolveDataOperationEngineGetXmlFragment = (
    dataOperationEngineGetXmlFragment?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    collectDataLazyZodText(
      dataOperationEngineGetXmlFragment.getXmlFragment(
        DataOperationEngineProsemirror,
      ),
    ));
  (dataOperationEngineSet = new (Set as Dynamic)([
    `doc`,
    `paragraph`,
    `text`,
    `hardBreak`,
    `heading`,
    `blockquote`,
    `bulletList`,
    `orderedList`,
    `listItem`,
    `codeBlock`,
    `horizontalRule`,
    `table`,
    `tableRow`,
    `tableCell`,
    `tableHeader`,
    `embed`,
    `embedInline`,
    `builtin`,
    `media`,
  ]));
  (DataOperationEngineJoin = [...dataOperationEngineSet].join(`, `));
  (resolveDataOperationEngineSlice = (
    items?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof items == `string`
      ? `node type ${JSON.stringify(items.length > 40 ? `${items.slice(0, 40)}…` : items)}`
      : "a node with no string `type`");
  (dataOperationEngineSet2 = new (Set as Dynamic)([
    `paragraph`,
    `heading`,
    `blockquote`,
    `bulletList`,
    `orderedList`,
    `listItem`,
    `horizontalRule`,
    `codeBlock`,
    `table`,
    `tableRow`,
    `tableHeader`,
    `tableCell`,
    `embed`,
  ]));
  (dataOperationEngineSet3 = new (Set as Dynamic)([
    `suggestion`,
    `commentAnchor`,
  ]));
  (dataOperationEngineSet4 = new (Set as Dynamic)([
    `__proto__`,
    `constructor`,
    `prototype`,
  ]));
  (dataOperationEngineValue1024 = 1024);
  (dataOperationEngineValue64 = 64);
  (dataOperationEngineValue500 = 500);
  (dataOperationEngineValue8000000 = 8e6);
  (dataOperationEngineValue80000002 = 8e6);
  (dataOperationEngineValue8192 = 8192);
  (dataOperationEngineValue10485762 = 1048576);
  (dataOperationEngineValue10242 = 1024);
  (DataOperationEngineState2 = 2 ** 52);
  (DataOperationEngineState3 = [1, 2, 3]);
  (DataOperationEngineState4 = [...DataOperationEngineState3, 4]);
  (DataOperationEngineState5 = 2 ** 23);
  (dataOperationEngineValue65536 = 65536);
  (dataOperationEngineValue4096 = 4096);
  (dataOperationEngineValue8 = 8);
  (dataOperationEngineKindSchema = lazyZod
    .discriminatedUnion(`kind`, [
      lazyZod
        .object({
          kind: lazyZod
            .literal(`checkbox`)
            .describe(`Discriminator: a checkbox chip.`),
          checked: lazyZod.boolean().describe(`Ticked or not.`),
        })
        .describe(`A checkbox chip.`),
      lazyZod
        .object({
          kind: lazyZod.literal(`date`).describe(`Discriminator: a date chip.`),
          ts: lazyZod
            .string()
            .optional()
            .describe(
              `THE DATE LADDER (superseding the earlier day-only rule): one tolerant string, three canonical shapes - YYYY-MM-DD (a calendar day, no timezone concept), YYYY-MM-DDTHH:mm (a wall time with no zone), YYYY-MM-DDTHH:mm[Zone/Id] (RFC 9557: a wall time IN a named IANA zone; the face renders that zone's abbreviation, which a bare offset could not name). Absent = an unset chip (read tolerance only; no UI path writes unset since the illegal-unset ruling). DUAL-READ: legacy full-ISO strings keep rendering as their date part.`,
            ),
        })
        .describe(`A date chip.`),
      lazyZod
        .object({
          kind: lazyZod.literal(`enum`).describe(`Discriminator: an enum chip.`),
          enum: dataContentAndReferencesDescribeSchema.describe(
            `The enum OBJECT's id (ref enum/<id>) this chip draws its options from.`,
          ),
          index: lazyZod
            .number()
            .int()
            .min(0)
            .optional()
            .describe(
              `THE VALUE IS THE INDEX into the enum's options array — indices stay resolvable forever (options are never dropped). ABSENT = the UNSET state (an enum dropdown is by-default empty — an enum with 3 options has 4 states; the face renders the enum's NAME greyed until a pick lands), mirroring the date chip's absent ts.`,
            ),
        })
        .describe(`An enum chip: one option of a shared enum, stored by index.`),
      lazyZod
        .object({
          kind: lazyZod
            .literal(`mention`)
            .describe(`Discriminator: an @-mention chip.`),
          principal:
            dataContentAndReferencesDescribeSchema2.describe(
              `Who is @-mentioned.`,
            ),
        })
        .describe(`An @-mention chip.`),
      lazyZod
        .object({
          kind: lazyZod.literal(`ref`).describe(`Discriminator: a ref chip.`),
          ref: lazyZod
            .string()
            .min(1)
            .max(512)
            .refine(resolveEditorExtensionsValue27, `not a ref address`)
            .describe(
              "The referenced object's CANONICAL v3 ref address (src/room/refAddress.ts — the ONE grammar shared with chat's <claude:...> body tokens): container-relative (`file/<fid>`, `run/<id>`) or global (`project/<pid>`, `project/<pid>/file/<fid>`), optional `#<anchor>`. IDS ONLY, never a display name — faces resolve live through the viewer's ACL-checked lookup, and WHAT the target is (project, file, run, …) is derived by classifying the address, never stored.",
            ),
        })
        .describe(
          `A ref chip: a live, permission-checked reference to another Bongo object — a project, a tab/file inside one, or any addressable noun. People are NOT refs — an @-person is the mention kind.`,
        ),
    ])
    .describe(
      `The builtin-node vocabulary of prose content: checkbox | date | enum | mention | ref (Jul 6; chart/slider/input/pill are dropped).`,
    ));
  (dataOperationEngineBlobSchema = lazyZod
    .strictObject({
      blob: lazyZod
        .string()
        .regex(/^blob\/[A-Za-z0-9_-]{1,64}$/)
        .describe(
          `THE ONLY LEGAL SRC: a blob ref blob/<id> naming a blob OBJECT. Strict charset, so a ref can never carry a data: URI, quotes, or markup.`,
        ),
      mime: lazyZod
        .string()
        .regex(/^[\w.+-]+\/[\w.+-]+$/)
        .max(255)
        .nullish()
        .describe(
          `RFC 6838 media-type shape — selects the rendering element, so it must never smuggle markup. video/* renders <video>, everything else <img>.`,
        ),
      alt: lazyZod
        .string()
        .max(2048)
        .nullish()
        .describe(
          `Claude's eyesight and the accessibility text. HTML-escaped at render; never markup.`,
        ),
      dims: lazyZod
        .strictObject({
          w: lazyZod
            .number()
            .int()
            .min(1)
            .max(1e5)
            .describe(`Display width, px.`),
          h: lazyZod
            .number()
            .int()
            .min(1)
            .max(1e5)
            .describe(`Display height, px.`),
        })
        .nullish()
        .describe(`Optional display dimensions. Absent/null = natural size.`),
      crop: lazyZod
        .strictObject({
          x: lazyZod
            .number()
            .min(0)
            .max(1)
            .describe(`Left edge, fraction of natural width.`),
          y: lazyZod
            .number()
            .min(0)
            .max(1)
            .describe(`Top edge, fraction of natural height.`),
          w: lazyZod
            .number()
            .min(0.01)
            .max(1)
            .describe(`Crop width, fraction of natural width.`),
          h: lazyZod
            .number()
            .min(0.01)
            .max(1)
            .describe(`Crop height, fraction of natural height.`),
        })
        .nullish()
        .describe(
          `Optional NON-DESTRUCTIVE crop rect, normalized to the natural image ([0,1] fractions — resolution-independent, so the stored bytes are never rewritten). Render clips via CSS; a rect whose x+w or y+h exceeds 1 renders uncropped (fail-closed at the bounded reader, not a refuse — the per-field bounds are the schema law). Absent/null = uncropped. When set, dims describes the displayed CROP box, and honest commits derive dims.h from the crop region's aspect.`,
        ),
    })
    .describe(
      `The media node's attrs: {blob, mime?, alt?, dims?, crop?}. Block atom; src is a blob ref ONLY — inline base64/data: URIs refuse (media-inline-bytes).`,
    ));
  (dataOperationEngineValue40962 = 4096);
  (isDataOperationEngineCharCodeAt = (
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    for (let index = 0; index < items.length; index++) {
      let charCodeAt: Dynamic = items.charCodeAt(index);
      if (charCodeAt >= 55296 && charCodeAt <= 56319) {
        let charCodeAt2: Dynamic = items.charCodeAt(index + 1);
        if (!(charCodeAt2 >= 56320 && charCodeAt2 <= 57343)) return false;
        index++;
      } else if (charCodeAt >= 56320 && charCodeAt <= 57343) return false;
    }
    return true;
  });
  (resolveDataOperationEngineTest = (
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    /;base64[,;]/i.test(items) ||
    /;base64$/i.test(items) ||
    (/^data:/i.test(items) && items.length > 256));
  (resolveDataOperationEngineLeft = (
    dataOperationEngineLeft?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    resolveDataOperationEngineProseDepth(dataOperationEngineLeft, options, {
      left: dataOperationEngineValue8192,
    }));
  (resolveDataOperationEngineSlice2 = (
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    for (let count = 6; count < items.length; count++)
      items[count % 6] = items[count % 6] ^ items[count];
    return items.slice(0, 6);
  });
  (resolveDataOperationEngineValue11 = (
    dataOperationEngineValue11?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    toBase64(
      resolveDataOperationEngineSlice2(
        resolveDataLazyZodDigest(encodeAny(dataOperationEngineValue11)),
      ),
    ));
  (resolveDataOperationEngineType = (
    dataOperationEngineType?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (!(options || dataOperationEngineSet3.has(dataOperationEngineType.type)))
      return dataOperationEngineType.type;
    let record2: Dynamic = {
      type: dataOperationEngineType.type,
    };
    if (
      dataOperationEngineType.attrs != null &&
      Object.keys(dataOperationEngineType.attrs).length > 0
    ) {
      record2.attrs = dataOperationEngineType.attrs;
    }
    return (
      dataOperationEngineType.type +
      `--` +
      resolveDataOperationEngineValue11(record2)
    );
  });
  (resolveDataOperationEngineCommentAnchor = (
    dataOperationEngineCommentAnchor?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    dataOperationEngineCommentAnchor === `commentAnchor` ||
    dataOperationEngineCommentAnchor.startsWith(`commentAnchor--`));
  (updateDataOperationEngineShape = (
    updateDataOperationEngineShape2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (
      updateDataOperationEngineShape2 !== undefined &&
      !Array.isArray(updateDataOperationEngineShape2)
    )
      throw new (EngineRefuse as Dynamic)(`shape`);
    let create2: Dynamic = Object.create(null);
    if (!updateDataOperationEngineShape2) return create2;
    let lookup: Dynamic = new (Map as Dynamic)();
    for (let updateDataOperationEngineShapeResult of updateDataOperationEngineShape2 as Dynamic)
      lookup.set(
        updateDataOperationEngineShapeResult.type,
        (lookup.get(updateDataOperationEngineShapeResult.type) ?? 0) + 1,
      );
    for (let updateDataOperationEngineShapeResult of updateDataOperationEngineShape2 as Dynamic) {
      if (
        updateDataOperationEngineShapeResult.type === `ychange` ||
        dataOperationEngineSet4.has(updateDataOperationEngineShapeResult.type) ||
        updateDataOperationEngineShapeResult.type.length >
          dataOperationEngineValue256 ||
        dataOperationEnginePattern2.test(
          updateDataOperationEngineShapeResult.type,
        ) ||
        !isDataOperationEngineCharCodeAt(
          updateDataOperationEngineShapeResult.type,
        ) ||
        updateDataOperationEngineShapeResult.type.length === 0 ||
        dataOperationEnginePattern.test(updateDataOperationEngineShapeResult.type)
      )
        throw new (EngineRefuse as Dynamic)(`prose-attr-key`);
      create2[
        resolveDataOperationEngineType(
          updateDataOperationEngineShapeResult,
          (lookup.get(updateDataOperationEngineShapeResult.type) ?? 0) > 1,
        )
      ] = updateDataOperationEngineShapeResult.attrs ?? {};
    }
    return create2;
  });
  (dataOperationEngineSet5 = new (Set as Dynamic)([
    ...dataOperationEngineSet4,
    `ychange`,
  ]));
  (resolveDataOperationEngineMap = (
    dataOperationEngineMap3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => dataOperationEngineMap3._map);
  (resolveDataOperationEngineStart = (
    dataOperationEngineStart?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => dataOperationEngineStart._start);
  (dataOperationEngineValue256 = 256);
  (dataOperationEnginePattern = /(.*)(--[a-zA-Z0-9+/=]{8})$/);
  (resolveDataOperationEngineExec = (
    dataOperationEngineExec?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let match = dataOperationEnginePattern.exec(dataOperationEngineExec);
    return match ? match[1] : dataOperationEngineExec;
  });
  (dataOperationEnginePattern2 = /[\n\r\u2028\u2029]/);
  (resolveDataOperationEngineCode = (
    dataOperationEngineCode?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    lazyZod
      .object(dataOperationEngineCode)
      .catchall(lazyZod.json())
      .superRefine(
        (
          dataOperationEngineCode2?: unknown,
          options2?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (
            typeof dataOperationEngineCode2 == `object` &&
            dataOperationEngineCode2 &&
            Object.getPrototypeOf(dataOperationEngineCode2) !== Object.prototype
          ) {
            options2.addIssue({
              code: `custom`,
              message: `prototype-polluting attrs refused`,
            });
          }
        },
      )
      .optional()
      .describe(options));
  (dataOperationEngineDescribeSchema6 = lazyZod
    .string()
    .nullable()
    .optional()
    .describe(
      `The stable block id (ops-arm addressing; minted at the api boundary; null/absent on never-stamped blocks).`,
    ));
  (dataOperationEngineDescribeSchema7 = lazyZod
    .object({
      type: lazyZod
        .string()
        .min(1)
        .describe(
          `The mark's type word — open vocabulary (unknown marks preserve-inert); known today: bold, italic, strike, underline, code, link (href/target/rel/class/title attrs), highlight, suggestion (kind/id), commentAnchor (threadId).`,
        ),
      attrs: lazyZod
        .record(lazyZod.string(), lazyZod.json())
        .optional()
        .describe(
          `The mark's attrs — open JSON record (link's href/target/rel, suggestion's kind/id, commentAnchor's threadId ride here; record parse is proto-clean).`,
        ),
    })
    .describe(
      `One mark on a text node — {type, attrs?}; vocabulary open by law, unknown marks preserve-inert.`,
    ));
  (dataOperationEngineParagraphSchema = lazyZod
    .enum([
      `doc`,
      `paragraph`,
      `text`,
      `hardBreak`,
      `heading`,
      `blockquote`,
      `bulletList`,
      `orderedList`,
      `listItem`,
      `codeBlock`,
      `horizontalRule`,
      `table`,
      `tableRow`,
      `tableCell`,
      `tableHeader`,
      `embed`,
      `embedInline`,
      `builtin`,
      `media`,
    ])
    .describe(
      `The v3 prose node-type vocabulary — the ruled set (PROSE_NODE_TYPES; ruling #13a: unknown node types refuse prose-unknown-node at door and fold). Chips are the ONE builtin node; media is the ONE media node; the lfile editor floor's chip/mention/image types are FILE-plane vocabulary, not this grammar's.`,
    ));
  (dataOperationEngineBidSchema = {
    bid: dataOperationEngineDescribeSchema6,
    colspan: lazyZod
      .number()
      .int()
      .nullable()
      .optional()
      .describe(`Column span (default 1).`),
    rowspan: lazyZod
      .number()
      .int()
      .nullable()
      .optional()
      .describe(`Row span (default 1).`),
    colwidth: lazyZod
      .array(lazyZod.number())
      .nullable()
      .optional()
      .describe(`Fixed column widths (px), per spanned column; null = natural.`),
    align: lazyZod
      .string()
      .nullable()
      .optional()
      .describe(`Cell text alignment word.`),
    background: lazyZod
      .string()
      .nullable()
      .optional()
      .describe(`Cell background token/color string.`),
    ref: lazyZod
      .string()
      .nullable()
      .optional()
      .describe(`A cell-level ref seat (embedded source pointer); null = none.`),
    locked: lazyZod
      .boolean()
      .nullable()
      .optional()
      .describe(`Cell locked against edits.`),
  });
  (dataOperationEngineRefSchema = {
    ref: lazyZod
      .string()
      .nullable()
      .optional()
      .describe(
        `What is embedded — '#<nodeId>' for sibling nodes (widgets/media), per the embed ruling.`,
      ),
    width: lazyZod
      .union([lazyZod.number(), lazyZod.string()])
      .nullable()
      .optional()
      .describe(`Display width (px number or CSS string).`),
    align: lazyZod
      .string()
      .nullable()
      .optional()
      .describe(`Block alignment word.`),
    caption: lazyZod.string().nullable().optional().describe(`Caption text.`),
    commentIds: lazyZod
      .array(lazyZod.string())
      .nullable()
      .optional()
      .describe(`Comment thread ids anchored on the embed.`),
  });
  (dataOperationEngineBidSchema2 = lazyZod.lazy(
    (..._extraArguments: unknown[]): Dynamic =>
      lazyZod
        .discriminatedUnion(`type`, [
          lazyZod
            .object({
              type: lazyZod
                .literal(`doc`)
                .describe(`THE ROOT — content is the block sequence.`),
              attrs: resolveDataOperationEngineCode(
                {},
                `doc carries no ruled attrs (open by catchall).`,
              ),
              content: lazyZod
                .array(dataOperationEngineBidSchema2)
                .optional()
                .describe(`The block children; empty/absent = the empty doc.`),
            })
            .describe(`doc — the root node.`),
          lazyZod
            .object({
              type: lazyZod.literal(`paragraph`).describe(`A paragraph block.`),
              attrs: resolveDataOperationEngineCode(
                {
                  bid: dataOperationEngineDescribeSchema6,
                },
                `paragraph attrs: {bid?} + open.`,
              ),
              content: lazyZod
                .array(dataOperationEngineBidSchema2)
                .optional()
                .describe(`Inline children (text, hardBreak, inline atoms).`),
            })
            .describe(`paragraph — the workhorse block; inline* content.`),
          lazyZod
            .object({
              type: lazyZod.literal(`text`).describe(`A text leaf.`),
              text: lazyZod
                .string()
                .describe(
                  `THE text (a string, always — the text-string law; wellformedness is door law).`,
                ),
              marks: lazyZod
                .array(dataOperationEngineDescribeSchema7)
                .optional()
                .describe(
                  `Marks on this run (open vocabulary; unknown marks preserve-inert).`,
                ),
            })
            .describe(`text — the leaf; text REQUIRED, marks optional.`),
          lazyZod
            .object({
              type: lazyZod
                .literal(`hardBreak`)
                .describe(`A hard line break (inline atom).`),
            })
            .describe(`hardBreak — inline atom, no attrs, no content.`),
          lazyZod
            .object({
              type: lazyZod.literal(`heading`).describe(`A heading block.`),
              attrs: resolveDataOperationEngineCode(
                {
                  bid: dataOperationEngineDescribeSchema6,
                  level: lazyZod
                    .number()
                    .int()
                    .nullable()
                    .optional()
                    .describe(`Heading level (1-based; the editor writes 1..6).`),
                },
                `heading attrs: {bid?, level?} + open.`,
              ),
              content: lazyZod
                .array(dataOperationEngineBidSchema2)
                .optional()
                .describe(`Inline children.`),
            })
            .describe(`heading — inline* content with a level attr.`),
          lazyZod
            .object({
              type: lazyZod.literal(`blockquote`).describe(`A quote block.`),
              attrs: resolveDataOperationEngineCode(
                {
                  bid: dataOperationEngineDescribeSchema6,
                },
                `blockquote attrs: {bid?} + open.`,
              ),
              content: lazyZod
                .array(dataOperationEngineBidSchema2)
                .optional()
                .describe(`Block children.`),
            })
            .describe(`blockquote — block+ content.`),
          lazyZod
            .object({
              type: lazyZod.literal(`bulletList`).describe(`An unordered list.`),
              attrs: resolveDataOperationEngineCode(
                {
                  bid: dataOperationEngineDescribeSchema6,
                },
                `bulletList attrs: {bid?} + open.`,
              ),
              content: lazyZod
                .array(dataOperationEngineBidSchema2)
                .optional()
                .describe(`listItem children.`),
            })
            .describe(`bulletList — listItem+ content.`),
          lazyZod
            .object({
              type: lazyZod.literal(`orderedList`).describe(`An ordered list.`),
              attrs: resolveDataOperationEngineCode(
                {
                  bid: dataOperationEngineDescribeSchema6,
                  start: lazyZod
                    .number()
                    .int()
                    .nullable()
                    .optional()
                    .describe(`Starting number (default 1).`),
                  type: lazyZod
                    .string()
                    .nullable()
                    .optional()
                    .describe(
                      `List numbering type word (html ol type); null = default.`,
                    ),
                },
                `orderedList attrs: {bid?, start?, type?} + open.`,
              ),
              content: lazyZod
                .array(dataOperationEngineBidSchema2)
                .optional()
                .describe(`listItem children.`),
            })
            .describe(`orderedList — listItem+ content with start/type.`),
          lazyZod
            .object({
              type: lazyZod.literal(`listItem`).describe(`One list item.`),
              attrs: resolveDataOperationEngineCode(
                {
                  bid: dataOperationEngineDescribeSchema6,
                },
                `listItem attrs: {bid?} + open.`,
              ),
              content: lazyZod
                .array(dataOperationEngineBidSchema2)
                .optional()
                .describe(`paragraph + block children.`),
            })
            .describe(`listItem — paragraph block* content.`),
          lazyZod
            .object({
              type: lazyZod.literal(`codeBlock`).describe(`A code block.`),
              attrs: resolveDataOperationEngineCode(
                {
                  bid: dataOperationEngineDescribeSchema6,
                  language: lazyZod
                    .string()
                    .nullable()
                    .optional()
                    .describe(
                      `The language tag. NEW writes must speak the closed registry enum (lowercase canonical keys — renderable.ts LANGUAGE_KEYS); a write introducing any other tag refuses prose-code-language at the live door (aliases/case variants: fold them before the door). Legacy tags on already-stored docs are tolerated here (replay law) and present as the unset state at render (auto-detect highlight, no live pane). null = auto-detect. LIVE languages render a computed pane the READER SEES above the source: latex (a rendered formula), markdown (rendered rich text), csv (a table), mermaid (a rendered diagram). Use them when the point is the rendered output — a formula in a doc is a latex codeBlock. plain = explicitly no highlighting.`,
                    ),
                },
                `codeBlock attrs: {bid?, language?} + open.`,
              ),
              content: lazyZod
                .array(dataOperationEngineBidSchema2)
                .optional()
                .describe(`text children only (text* content).`),
            })
            .describe(
              `codeBlock — text* content. language selects highlighting AND liveness: latex/markdown/csv/mermaid blocks render a live pane (formula/rich text/table/diagram) the reader sees, with the source collapsible beneath.`,
            ),
          lazyZod
            .object({
              type: lazyZod
                .literal(`horizontalRule`)
                .describe(`A horizontal rule block.`),
              attrs: resolveDataOperationEngineCode(
                {
                  bid: dataOperationEngineDescribeSchema6,
                },
                `horizontalRule attrs: {bid?} + open.`,
              ),
            })
            .describe(`horizontalRule — leaf block.`),
          lazyZod
            .object({
              type: lazyZod.literal(`table`).describe(`A table block.`),
              attrs: resolveDataOperationEngineCode(
                {
                  bid: dataOperationEngineDescribeSchema6,
                },
                `table attrs: {bid?} + open.`,
              ),
              content: lazyZod
                .array(dataOperationEngineBidSchema2)
                .optional()
                .describe(`tableRow children.`),
            })
            .describe(`table — tableRow* content.`),
          lazyZod
            .object({
              type: lazyZod.literal(`tableRow`).describe(`One table row.`),
              attrs: resolveDataOperationEngineCode(
                {
                  bid: dataOperationEngineDescribeSchema6,
                },
                `tableRow attrs: {bid?} + open.`,
              ),
              content: lazyZod
                .array(dataOperationEngineBidSchema2)
                .optional()
                .describe(`tableCell/tableHeader children.`),
            })
            .describe(`tableRow — (tableCell | tableHeader)* content.`),
          lazyZod
            .object({
              type: lazyZod.literal(`tableCell`).describe(`One table cell.`),
              attrs: resolveDataOperationEngineCode(
                dataOperationEngineBidSchema,
                `tableCell attrs: {bid?, colspan?, rowspan?, colwidth?, align?, background?, ref?, locked?} + open.`,
              ),
              content: lazyZod
                .array(dataOperationEngineBidSchema2)
                .optional()
                .describe(`Block children.`),
            })
            .describe(`tableCell — block+ content with span/format attrs.`),
          lazyZod
            .object({
              type: lazyZod.literal(`tableHeader`).describe(`One header cell.`),
              attrs: resolveDataOperationEngineCode(
                dataOperationEngineBidSchema,
                `tableHeader attrs: same seats as tableCell.`,
              ),
              content: lazyZod
                .array(dataOperationEngineBidSchema2)
                .optional()
                .describe(`Block children.`),
            })
            .describe(`tableHeader — block+ content with span/format attrs.`),
          lazyZod
            .object({
              type: lazyZod
                .literal(`embed`)
                .describe(
                  `A BLOCK embed of a sibling node (widget/media) by ref.`,
                ),
              attrs: resolveDataOperationEngineCode(
                {
                  bid: dataOperationEngineDescribeSchema6,
                  ...dataOperationEngineRefSchema,
                },
                `embed attrs: {bid?, ref?, width?, align?, caption?, commentIds?} + open.`,
              ),
            })
            .describe(`embed — block atom referencing '#<nodeId>'.`),
          lazyZod
            .object({
              type: lazyZod
                .literal(`embedInline`)
                .describe(
                  `An INLINE embed (same ref grammar, inline placement).`,
                ),
              attrs: resolveDataOperationEngineCode(
                dataOperationEngineRefSchema,
                `embedInline attrs: {ref?, width?, align?, caption?, commentIds?} + open.`,
              ),
            })
            .describe(`embedInline — inline atom referencing '#<nodeId>'.`),
          lazyZod
            .object({
              type: lazyZod
                .literal(`builtin`)
                .describe(`THE chip node — v3's one interactive-chip spelling.`),
              attrs: resolveDataOperationEngineCode(
                {
                  builtin: dataOperationEngineKindSchema.describe(
                    `The chip itself — checkbox | date | enum | mention (zProseBuiltin; an illegal chip refuses prose-chip at door and fold).`,
                  ),
                },
                `builtin attrs: {builtin} + open.`,
              ),
            })
            .describe(
              `builtin — inline chip atom: {kind: checkbox|date|enum|mention}.`,
            ),
          lazyZod
            .object({
              type: lazyZod
                .literal(`media`)
                .describe(
                  `THE media node — blob-ref src only, never inline bytes.`,
                ),
              attrs: dataOperationEngineBlobSchema
                .optional()
                .describe(
                  `The ruled media attrs (zProseMedia, STRICT — blob ref + metadata; media-shape refuses junk; media-inline-bytes refuses byte smuggling).`,
                ),
            })
            .describe(
              `media — block atom whose src is a blob ref (zProseMedia).`,
            ),
        ])
        .describe(
          `ONE prose node, discriminated by type over the ruled vocabulary (zProseNodeType). Typed attr seats + a JSON catchall per node (unknown attrs preserve-inert — the ruled posture); marks live on text leaves; byte/key/depth laws are DOOR law enforced at apply AND fold, deliberately not re-spelled here.`,
        ),
  ));
  (dataOperationEngineDescribeSchema8 = dataOperationEngineBidSchema2.describe(
      `The committed PM-JSON doc — the root prose node (type 'doc'), recursively typed over the ruled vocabulary. Derived at write time from the ydoc (row 2: doc === materializeProse(ydoc)); history readers never decode CRDT bytes.`,
    ));
  (dataOperationEngineParentSchema2 = lazyZod.object({
    parent: dataContentAndReferencesDescribeSchema5
      .optional()
      .describe(
        `For a node: {object: 'file', id} — the ldoc file it belongs to. Membership is FLAT. Required on nodes (valueFor); absent on utterances.`,
      ),
    isDocument: lazyZod
      .boolean()
      .optional()
      .describe(
        `RETIRED by the content.root ruling (the file's content.root pointer is the authority — derived-or-dies): tolerated on READS for pre-ruling rows; NOT written on new births. Exactly one node per ldoc file was THE DOCUMENT; that fact now lives on the file object.`,
      ),
    localId: lazyZod
      .string()
      .min(1)
      .max(64)
      .optional()
      .describe(
        `The editor-plane LocalId (e.g. 'ln-…') this node renders as, carried as PROVENANCE DATA on the node's own value — never a key in any shared index (the no-side-index ruling; the placement.prose map was retired for exactly this). The boot walk (file → content.root → nodes) reads it to bind frames to room objects; a replayed world treats it as what it is: data the author wrote.`,
      ),
    doc: dataOperationEngineDescribeSchema8.describe(
      `The LEGIBLE half: PM-JSON materialization of ydoc — {type: 'doc', content: [...]} — ALWAYS equal to materializeProse(ydoc) (row 2's invariant; derived, never client-written). History readers never decode CRDT bytes. TYPED by the explicit doc grammar (zProseDoc).`,
    ),
    ydoc: lazyZod
      .string()
      .min(1)
      .describe(
        `The SUBSTRATE half (ruling #16): base64 Y.encodeStateAsUpdate of the yjs doc whose 'prosemirror' fragment materializes to doc. Seeded at birth, merged by {yUpdate}, replaced-through by CAS. Rides the value so checkpoints capture it free.`,
      ),
  }));
  (dataOperationEngineProseSchema = lazyZod
    .literal(`prose`)
    .default(`prose`)
    .describe(
      `Pinned discriminator: this payload belongs to the prose lane (omit to default; anything else is rejected).`,
    ));
  (dataOperationEngineEngineSchema4 = lazyZod
    .strictObject({
      engine: dataOperationEngineProseSchema,
      doc: lazyZod
        .record(lazyZod.string(), lazyZod.unknown())
        .describe(
          `The initial ProseMirror doc as JSON ({type: 'doc', content: [...]}). DELIBERATELY LOOSE AT THE CELL so the engine's raw-lane laws answer with their TEACHING words (prose-unknown-node, prose-chip, media-shape, media-inline-bytes, prose-depth — a strict cell would pre-empt them all with a generic 'shape'). The value slot stays z.unknown() (NOT recursive z.json()): the raw-lane walks (assertRawLane) are depth-capped and JSON-purity-checked, but a recursive cell schema stack-overflows on a depth-bomb attr BEFORE those named laws can answer. The COMMITTED shape is the explicit doc grammar (#proseDoc — zProseDoc), which the value plane enforces at door and fold.`,
        ),
      parent: dataContentAndReferencesDescribeSchema5
        .optional()
        .describe(
          `For nodes: the parent FILE, as {object, id} (REQUIRED on nodes — door law).`,
        ),
      isDocument: lazyZod
        .boolean()
        .optional()
        .describe(
          `RETIRED by the content-collapse ruling (the file's content.id is the authority): tolerated for transition, not written by new clients.`,
        ),
      localId: lazyZod
        .string()
        .min(1)
        .max(64)
        .optional()
        .describe(
          `The editor-plane LocalId carried as PROVENANCE DATA on the birthed value (see zProseValue.localId — the no-side-index ruling).`,
        ),
    })
    .describe(
      `The prose create payload: {doc, parent?, isDocument?} — birth seeds the ydoc deterministically.`,
    ));
  (dataOperationEngineEngineSchema5 = lazyZod
    .strictObject({
      engine: dataOperationEngineProseSchema,
      yUpdate: lazyZod
        .string()
        .min(1)
        .max(dataOperationEngineValue8000000)
        .describe(
          `CRDT ARM — THE BROWSER EDITOR'S LANE (refused prose-yupdate-lane for MCP / agent / service callers: use the OPS ARM or the CAS arm): a base64 yjs update (Y.encodeStateAsUpdate(doc, remoteStateVector) from the writer). The engine merges it into the stored ydoc via Y.applyUpdate, then re-materializes the legible doc — CRDTs commute, so concurrent updates converge regardless of arrival order.`,
        ),
      json: lazyZod
        .json()
        .optional()
        .describe(
          `OPTIONAL LEGIBLE RIDER (client-provided summary of this update's effect — any JSON value — a real type, not a hole: the byte-scanned wire could never carry non-JSON anyway). Byte-scanned at every string depth; rides the ledger row verbatim. History readers who find it absent diff before.doc → after.doc — both are always legible.`,
        ),
    })
    .describe(`CRDT ARM: the live-typing lane (page 18 row 1).`));
  (dataOperationEngineEngineSchema6 = lazyZod
    .strictObject({
      engine: dataOperationEngineProseSchema,
      value: lazyZod
        .record(lazyZod.string(), lazyZod.json())
        .describe(
          `COARSE ARM: the ENTIRE new doc ({type: 'doc', ...}), replacing the current one. RAW LANE laws apply — the cell stays LOOSE so those laws teach their named refusals (prose-unknown-node et al.; a strict cell would pre-empt them with 'shape'); the COMMITTED shape is #proseDoc (zProseDoc), enforced on the value plane at door and fold. The replace goes THROUGH the stored Y.Doc (one transaction under the pinned CAS clientID), so live editors merge it like any other update — CRDT causality is never reset.`,
        ),
      if_match: lazyZod
        .string()
        .min(1)
        .describe(
          `THE PRECONDITION, REQUIRED — there is no unconditional whole-doc write (row 8: no silent clear-and-reseed). The exact ydoc string read from the value this write was computed against; any mismatch denies prose-stale. Chosen over a Y state VECTOR deliberately: delete-only Y transactions advance no clock, so vector equality does NOT imply state equality — the encoded state string is the only engine-local token that does. The door may layer a compact digest later (docs/v3-prose-engine-wiring.md); the engine contract takes the exact string.`,
        ),
    })
    .describe(
      `COARSE CAS ARM: whole-doc compare-and-swap, refuse-on-stale (page 18 row 8 — the agent lane's coarse writes ride this).`,
    ));
  (dataOperationEngineEngineSchema7 = lazyZod
    .strictObject({
      engine: dataOperationEngineProseSchema,
      ops: lazyZod
        .array(dataOperationEngineAfterBidSchema)
        .min(1)
        .max(dataOperationEngineValue64)
        .describe(
          `OPS ARM: bid-addressed block operations, applied in order in one transaction. Each op names a stable \`bid\` (attrs.bid from a v3_read of the node) and the ENGINE converts the ops to a CRDT delta server-side — the ledger row records the model-friendly ops, not opaque bytes. Ops: {op:"add", after_bid?, value} inserts after the named block (or appends at the end if omitted); {op:"update", bid, value} replaces that block's subtree (the addressed bid is preserved on the first emitted element IFF that element's type carries attrs.bid — replacing with media/an atom consumes the bid); {op:"delete", bid} removes it.`,
        ),
      if_match: lazyZod
        .string()
        .optional()
        .describe(
          `OPTIONAL for ops (bid-addressing is id-based and mostly commutes with concurrent edits). When supplied, must equal the exact ydoc string from your last read; a mismatch refuses prose-stale.`,
        ),
      note: lazyZod
        .string()
        .max(dataOperationEngineValue500)
        .optional()
        .describe(
          `RECOMMENDED on every edit that involved a judgment call: ONE short sentence, in your own words, that hands the doc's AUTHOR something to REACT to about THIS edit — always a PRESENTATION choice only the author can make (structure, ordering, what to lead with, scope: what to cut or expand, emphasis, tone, audience, naming): a question about the shape ("Section 6 is thinner than the rest — expand it, or fine as is?"), an assumption about audience or scope they should confirm ("Pitched at patients, not clinicians — right audience?"), or a decision naming the options ("Table here, or would a chart read better?"). NEVER ask the author to confirm, verify, double-check, or source a figure, date, name, citation, or claim — factual accuracy is YOUR job ("is the user going to go Google that?"); if a fact is uncertain, state it in the document text as a caveat, not in the note. It becomes the body of the anchored change-note comment the server leaves on the edited range. NEVER a narration or summary of what you did ("Rewrote the intro", "Added a risks table", "This section covers…") — the doc's History already records the edit, and a comment that restates it is noise. Name the specific you are asking about. Set note to the EMPTY STRING to explicitly skip the comment — do that when there is nothing for the author to react to: a simple, directly-instructed edit the user just watched you make (a plain deletion they asked for, a dictated one-line change, a typo fix). Rides the ledger row verbatim (the CRDT arm's legible-rider precedent); omit it and the server composes a reaction prompt itself from the delta (or stays silent when nothing specific stands out). Never applied to content.`,
        ),
    })
    .describe(
      `OPS ARM: targeted block edits by stable bid — the AGENT edit lane (ported from ldoc-alpha). Server converts to CRDT.`,
    ));
  (dataOperationEngineDescribeSchema9 = lazyZod
    .union([
      dataOperationEngineEngineSchema5,
      dataOperationEngineEngineSchema6,
      dataOperationEngineEngineSchema7,
    ])
    .describe(
      `A prose update is ONE of: {yUpdate, json?} (CRDT — the browser editor's live-typing lane; refused prose-yupdate-lane for MCP / agent / service callers), {value, if_match} (coarse CAS — whole-doc, refuses on staleness), or {ops, if_match?} (targeted bid-addressed block ops — the AGENT edit lane; server converts to CRDT). Carrying keys of more than one arm is a shape error.`,
    ));
}

export {
  DataOperationEngineJson,
  DataOperationEngineProject,
  DataOperationEngineProsemirror,
  DataOperationEngineState3,
  DataOperationEngineState5,
  DataOperationEngineVerbs,
  EngineRefuse,
  collectDataOperationEngineInsert,
  collectDataOperationEngineKeys,
  dataOperationEngineAfterBidSchema,
  dataOperationEngineBidSchema2,
  dataOperationEngineDescribeSchema,
  dataOperationEngineDescribeSchema2,
  dataOperationEngineDescribeSchema5,
  dataOperationEngineDescribeSchema7,
  dataOperationEngineDescribeSchema8,
  dataOperationEngineDescribeSchema9,
  dataOperationEngineEngineSchema4,
  dataOperationEngineEngineSchema5,
  dataOperationEngineEngineSchema6,
  dataOperationEngineEngineSchema7,
  dataOperationEngineLineSchema,
  dataOperationEngineNodeSchema,
  dataOperationEngineParagraphSchema,
  dataOperationEngineParentSchema,
  dataOperationEngineParentSchema2,
  dataOperationEnginePathSchema,
  dataOperationEngineProjectFileNodeRunValues,
  dataOperationEngineQuoteSchema,
  dataOperationEngineSet2,
  dataOperationEngineSheetIdSchema,
  dataOperationEngineValue10485762,
  dataOperationEngineValue8,
  dataOperationEngineValue8000000,
  getDataOperationEngineClients,
  isDataOperationEngineProseBidConsumed,
  resolveDataOperationEngineApply,
  resolveDataOperationEngineCommentAnchor,
  resolveDataOperationEngineCommentAnchor2,
  resolveDataOperationEngineCreate,
  resolveDataOperationEngineDoc,
  resolveDataOperationEngineGetXmlFragment,
  resolveDataOperationEngineIncludes,
  resolveDataOperationEngineParent,
  resolveDataOperationEngineProseCrdtSmuggle3,
  resolveDataOperationEngineProseDepth,
  resolveDataOperationEngineProseNoYdoc,
  resolveDataOperationEngineProseOpSize,
  resolveDataOperationEngineShape2,
  resolveDataOperationEngineShape3,
  resolveDataOperationEngineValue10,
  resolveDataOperationEngineValue6,
  resolveDataOperationEngineValue7,
  resolveDataOperationEngineValue8,
  resolveDataOperationEngineYdoc,
  resolveDataOperationEngineYdoc2,
};
