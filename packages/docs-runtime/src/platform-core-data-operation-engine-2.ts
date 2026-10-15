/** BaoCut: data operation engine from app-core-BE6n4d7F.js. */
import type { Dynamic } from "./types";
import {
  applyUpdate,
  mergeUpdates,
} from "./platform-core-dependencies";
import {
  DataEnumsAndValidationMessage,
} from "./platform-core-data-enums-and-validation";
import {
  lazyZod,
  unwrapLazyZodSchema,
} from "./platform-core-data-lazy-zod";
import {
  DataContentAndReferencesHasHeader,
  dataContentAndReferencesDescribeSchema,
  dataContentAndReferencesDescribeSchema2,
  dataContentAndReferencesDescribeSchema5,
  dataContentAndReferencesKindSchema,
  resolveDataContentAndReferencesExact2,
  resolveDataContentAndReferencesPrefix,
} from "./platform-core-data-content-and-references";
import {
  editorExtensionsKindSchema4,
} from "./platform-core-editor-extensions-3";
import {
  DataOperationEngineProsemirror,
  DataOperationEngineState3,
  DataOperationEngineState5,
  EngineRefuse,
  collectDataOperationEngineInsert,
  dataOperationEngineAfterBidSchema,
  dataOperationEngineBidSchema2,
  dataOperationEngineDescribeSchema2,
  dataOperationEngineDescribeSchema5,
  dataOperationEngineDescribeSchema7,
  dataOperationEngineDescribeSchema8,
  dataOperationEngineDescribeSchema9,
  dataOperationEngineEngineSchema4,
  dataOperationEngineEngineSchema5,
  dataOperationEngineEngineSchema6,
  dataOperationEngineEngineSchema7,
  dataOperationEngineNodeSchema,
  dataOperationEngineParagraphSchema,
  dataOperationEngineParentSchema,
  dataOperationEngineParentSchema2,
  dataOperationEnginePathSchema,
  dataOperationEngineQuoteSchema,
  dataOperationEngineSet2,
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
  resolveDataOperationEngineParent,
  resolveDataOperationEngineProseCrdtSmuggle3,
  resolveDataOperationEngineProseDepth,
  resolveDataOperationEngineProseNoYdoc,
  resolveDataOperationEngineProseOpSize,
  resolveDataOperationEngineShape2,
  resolveDataOperationEngineShape3,
  resolveDataOperationEngineValue10,
  resolveDataOperationEngineValue6,
  resolveDataOperationEngineYdoc,
  resolveDataOperationEngineYdoc2,
} from "./platform-core-data-operation-engine-1";
import {
  DataOperationEngineCreate2,
  DataOperationEngineVerbs3,
} from "./platform-core-data-operation-engine-3";

function updateDataOperationEngineLeft(
  updateDataOperationEngineLeft2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (options.json !== undefined) {
    resolveDataOperationEngineProseDepth(options.json, `prose-attr-bytes`, {
      left: dataOperationEngineValue10485762,
    });
  }
  if (options.yUpdate.length > dataOperationEngineValue8000000)
    throw new (EngineRefuse as Dynamic)(`prose-op-size`);
  let dataOperationEngineProseNoYdoc: Dynamic =
    resolveDataOperationEngineProseNoYdoc(updateDataOperationEngineLeft2);
  let lookup: Dynamic = new (Map as Dynamic)();
  {
    let clients: Dynamic = dataOperationEngineProseNoYdoc.store.clients;
    for (let updateDataOperationEngineLeftResult of clients.keys() as Dynamic)
      lookup.set(
        updateDataOperationEngineLeftResult,
        getDataOperationEngineClients(
          dataOperationEngineProseNoYdoc,
          updateDataOperationEngineLeftResult,
        ),
      );
  }
  let mappedDataOperationEngineState3: Dynamic = DataOperationEngineState3.map(
    (
      DataOperationEngineState32?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      getDataOperationEngineClients(
        dataOperationEngineProseNoYdoc,
        DataOperationEngineState32,
      ),
  );
  try {
    applyUpdate(
      dataOperationEngineProseNoYdoc,
      resolveDataOperationEngineShape2(options.yUpdate),
    );
  } catch (updateDataOperationEngineLeftResult: Dynamic) {
    throw updateDataOperationEngineLeftResult instanceof
      (EngineRefuse as Dynamic)
      ? updateDataOperationEngineLeftResult
      : new (EngineRefuse as Dynamic)(`shape`);
  }
  DataOperationEngineState3.forEach(
    (
      DataOperationEngineState32?: Dynamic,
      index?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        getDataOperationEngineClients(
          dataOperationEngineProseNoYdoc,
          DataOperationEngineState32,
        ) > mappedDataOperationEngineState3[index]
      )
        throw new (EngineRefuse as Dynamic)(`prose-reserved-client`);
    },
  );
  {
    let clients: Dynamic = dataOperationEngineProseNoYdoc.store.clients;
    let index = 0;
    for (let updateDataOperationEngineLeftResult of clients.keys() as Dynamic) {
      let lookupEntry: Dynamic = lookup.get(
        updateDataOperationEngineLeftResult,
      );
      if (lookupEntry === undefined) {
        index++;
      }
      if (
        getDataOperationEngineClients(
          dataOperationEngineProseNoYdoc,
          updateDataOperationEngineLeftResult,
        ) -
          (lookupEntry ?? 0) >
        DataOperationEngineState5
      )
        throw new (EngineRefuse as Dynamic)(`prose-clock-jump`);
    }
    if (index > dataOperationEngineValue8)
      throw new (EngineRefuse as Dynamic)(`prose-client-flood`);
  }
  let store: Dynamic = dataOperationEngineProseNoYdoc.store;
  if (store.pendingStructs !== null || store.pendingDs !== null)
    throw new (EngineRefuse as Dynamic)(`prose-pending`);
  let dataOperationEngineYdoc: Dynamic = resolveDataOperationEngineYdoc(
    dataOperationEngineProseNoYdoc,
  );
  if (dataOperationEngineYdoc.ydoc === updateDataOperationEngineLeft2.ydoc)
    throw new (EngineRefuse as Dynamic)(`prose-noop`);
  return {
    ...updateDataOperationEngineLeft2,
    ...dataOperationEngineYdoc,
  };
}

function clearDataOperationEngineProseNoYdoc(
  clearDataOperationEngineProseNoYdoc2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    typeof clearDataOperationEngineProseNoYdoc2.ydoc != `string` ||
    clearDataOperationEngineProseNoYdoc2.ydoc.length === 0
  )
    throw new (EngineRefuse as Dynamic)(`prose-no-ydoc`);
  if (options.if_match !== clearDataOperationEngineProseNoYdoc2.ydoc)
    throw new (EngineRefuse as Dynamic)(`prose-stale`);
  resolveDataOperationEngineProseOpSize(options.value);
  let dataOperationEngineProseNoYdoc: Dynamic =
    resolveDataOperationEngineProseNoYdoc(clearDataOperationEngineProseNoYdoc2);
  resolveDataOperationEngineProseCrdtSmuggle3(dataOperationEngineProseNoYdoc);
  dataOperationEngineProseNoYdoc.clientID = 3;
  let xmlFragment: Dynamic = dataOperationEngineProseNoYdoc.getXmlFragment(
    DataOperationEngineProsemirror,
  );
  dataOperationEngineProseNoYdoc.transact(
    (..._extraArguments: unknown[]): undefined => {
      xmlFragment.delete(0, xmlFragment.length);
      resolveDataOperationEngineShape3(xmlFragment, options.value);
    },
  );
  return {
    ...clearDataOperationEngineProseNoYdoc2,
    ...resolveDataOperationEngineYdoc(dataOperationEngineProseNoYdoc),
  };
}

function resolveDataOperationEngineProseNoYdoc2(
  dataOperationEngineProseNoYdoc2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    typeof dataOperationEngineProseNoYdoc2.ydoc != `string` ||
    dataOperationEngineProseNoYdoc2.ydoc.length === 0
  )
    throw new (EngineRefuse as Dynamic)(`prose-no-ydoc`);
  if (
    options.if_match !== undefined &&
    options.if_match !== dataOperationEngineProseNoYdoc2.ydoc
  )
    throw new (EngineRefuse as Dynamic)(`prose-stale`);
  for (let operation of options.ops as Dynamic)
    if (operation.op !== `delete`) {
      resolveDataOperationEngineProseOpSize(
        operation.value?.type === `doc`
          ? operation.value
          : {
              type: `doc`,
              content: [operation.value],
            },
      );
    }
  let dataOperationEngineProseNoYdoc: Dynamic =
    resolveDataOperationEngineProseNoYdoc(dataOperationEngineProseNoYdoc2);
  resolveDataOperationEngineProseCrdtSmuggle3(dataOperationEngineProseNoYdoc);
  dataOperationEngineProseNoYdoc.clientID = 3;
  isDataOperationEngineProseBidConsumed(
    dataOperationEngineProseNoYdoc,
    DataOperationEngineProsemirror,
    options.ops,
    (
      dataOperationEngineProseNoYdoc22?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      collectDataOperationEngineInsert(dataOperationEngineProseNoYdoc22),
    dataOperationEngineSet2,
    resolveDataOperationEngineCommentAnchor,
  );
  return {
    ...dataOperationEngineProseNoYdoc2,
    ...resolveDataOperationEngineYdoc(dataOperationEngineProseNoYdoc),
  };
}

function resolveDataOperationEngineCreate2(
  dataOperationEngineCreate2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (dataOperationEngineCreate2 !== `create`) return [];
  let id: Dynamic = options?.id;
  return typeof id == `string` ? [id] : [];
}

var DataOperationEngineValue: Dynamic;

var DataOperationEngineVerbs2: Dynamic;

var resolveDataOperationEngineDeny: Dynamic;

var resolveDataOperationEngineDeny2: Dynamic;

var DataOperationEngineCreate: Dynamic;

var dataOperationEngineSurfaceSchema: Dynamic;

var dataOperationEngineViewerSchema: Dynamic;

var dataOperationEngineDescribeSchema10: Dynamic;

var resolveDataOperationEngineStartsWith: Dynamic;

var dataOperationEngineSet6: Dynamic;

var dataOperationEngineIllegalGranteeSchema: Dynamic;

var dataOperationEngineRoleSchema: Dynamic;

var dataOperationEngineOwnerSchema: Dynamic;

var dataOperationEngineColorSchema: Dynamic;

var dataOperationEngineOptionsSchema: Dynamic;

var dataOperationEngineMessageSchema: Dynamic;

function resolveDataOperationEngineTrim(
  dataOperationEngineTrim?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let resolveDataOperationEngineTrimHandler: Dynamic = (
    dataOperationEngineTrim2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    dataOperationEngineTrim2 === `` ||
    dataOperationEngineTrim2 === `.` ||
    dataOperationEngineTrim2 === `..`
      ? undefined
      : dataOperationEngineTrim2;
  let trimmedReplace: Dynamic = dataOperationEngineTrim
    .replace(/[/\p{Cc}\p{Cf}\p{Zl}\p{Zp}]/gu, ` `)
    .trim();
  if (resolveDataOperationEngineTrimHandler(trimmedReplace) === undefined)
    return options;
  if (trimmedReplace.length <= 255) return trimmedReplace;
  let lastIndexOf: Dynamic = trimmedReplace.lastIndexOf(`.`);
  if (lastIndexOf <= 0)
    return (
      resolveDataOperationEngineTrimHandler(
        trimmedReplace.slice(0, 255).trim(),
      ) ?? options
    );
  let trimmedReplaceSlice: Dynamic = trimmedReplace.slice(lastIndexOf);
  return trimmedReplaceSlice.length >= 255
    ? (resolveDataOperationEngineTrimHandler(
        trimmedReplace.slice(0, 255).trim(),
      ) ?? options)
    : (resolveDataOperationEngineTrimHandler(
        (trimmedReplace.slice(0, 255 - trimmedReplaceSlice.length).trim() ||
          options.replace(/\..*$/, ``)) + trimmedReplaceSlice,
      ) ?? options);
}

var dataOperationEngineNoteSchema: Dynamic;

var dataOperationEngineKindSchema2: Dynamic;

var DataOperationEngineApplicationVndClaudePage: Dynamic;

var dataOperationEngineMimeSchema: Dynamic;

var dataOperationEngineSet7: Dynamic;

function resolveDataOperationEngineLdoc(
  dataOperationEngineLdoc?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let dataOperationEngineLastIndexOf: Dynamic =
    resolveDataOperationEngineLastIndexOf(dataOperationEngineLdoc);
  return dataOperationEngineLastIndexOf === `ldoc`
    ? `json`
    : dataOperationEngineSet7.has(dataOperationEngineLastIndexOf)
      ? `iron`
      : `text`;
}

var DataOperationEngineMarkdown: Dynamic;

function resolveDataOperationEngineLastIndexOf(
  dataOperationEngineLastIndex?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let lastIndexOf: Dynamic = dataOperationEngineLastIndex.lastIndexOf(`.`);
  return lastIndexOf <= 0
    ? ``
    : dataOperationEngineLastIndex.slice(lastIndexOf + 1).toLowerCase();
}

function resolveDataOperationEngineApplicationOctetStream(
  dataOperationEngineApplicationOctetStream?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dataOperationEngineLastIndexOf: Dynamic =
    resolveDataOperationEngineLastIndexOf(
      dataOperationEngineApplicationOctetStream,
    );
  return Object.hasOwn(
    DataOperationEngineMarkdown,
    dataOperationEngineLastIndexOf,
  )
    ? DataOperationEngineMarkdown[dataOperationEngineLastIndexOf]
    : `application/octet-stream`;
}

var dataOperationEngineDescribeSchema11: Dynamic;

var dataOperationEngineMessageSchema2: Dynamic;

var dataOperationEngineSubtabOfSchema: Dynamic;

var dataOperationEngineAutoRespondSchema: Dynamic;

var dataOperationEngineSourceSchema: Dynamic;

var dataOperationEngineEnumSchema: Dynamic;

var dataOperationEngineMessageSchema3: Dynamic;

var dataOperationEngineDescribeSchema12: Dynamic;

var dataOperationEngineKindSchema3: Dynamic;

var dataOperationEngineConnectorSchema: Dynamic;

var dataOperationEngineKindSchema4: Dynamic;

var dataOperationEngineKindSchema5: Dynamic;

var dataOperationEngineKindSchema6: Dynamic;

var resolveDataOperationEngineMessage: Dynamic;

var dataOperationEngineKindSchema7: Dynamic;

var dataOperationEngineSourceSchema2: Dynamic;

var dataOperationEngineMessageSchema4: Dynamic;

var dataOperationEngineKindSchema8: Dynamic;

var dataOperationEngineColumnsSchema: Dynamic;

var dataOperationEngineParentSchema3: Dynamic;

var dataOperationEngineCcrMessagesValues: string[];

var resolveDataOperationEngineSize: (items?: Dynamic, ..._extraArguments: unknown[]) => boolean;

var resolveDataOperationEngineReplace: Dynamic;

var DataOperationEngineStyles: string;

var DataOperationEngineState6: RegExp;

var DataOperationEnginePath: Dynamic;

var DataOperationEnginePath2: Dynamic;

var dataOperationEngineMap: Dynamic;

var getDataOperationEngineValue2: Dynamic;

var dataOperationEngineDescribeSchema13: Dynamic;

var dataOperationEngineDescribeSchema14: Dynamic;

var dataOperationEnginePathSchema2: Dynamic;

var dataOperationEngineKindSchema9: Dynamic;

var dataOperationEngineNumRolloutsSchema: Dynamic;

var dataOperationEngineCodeSchema: Dynamic;

var dataOperationEngineStagedPendingRunningDoneValues: string[];

var dataOperationEngineCancelledValues: string[];

var DataOperationEngineState7: string[];

var dataOperationEngineDescribeSchema15: Dynamic;

var dataOperationEngineDescribeSchema16: Dynamic;

var dataOperationEngineDescribeSchema17: Dynamic;

var dataOperationEngineDescribeSchema18: Dynamic;

var dataOperationEngineDescribeSchema19: Dynamic;

var dataOperationEngineMessageSchema5: Dynamic;

var dataOperationEngineDescribeSchema20: Dynamic;

var dataOperationEngineDescribeSchema21: Dynamic;

var dataOperationEngineDescribeSchema22: Dynamic;

var dataOperationEngineStatusSchema: Dynamic;

var dataOperationEngineKindSchema10: Dynamic;

var dataOperationEnginePromptSchema: Dynamic;

var dataOperationEnginePromptSchema2: Dynamic;

var dataOperationEngineDescribeSchema23: Dynamic;

var dataOperationEngineDescribeSchema24: Dynamic;

var dataOperationEngineDescribeSchema25: Dynamic;

var dataOperationEngineKindSchema11: Dynamic;

var dataOperationEngineDescribeSchema26: Dynamic;

var dataOperationEngineDescribeSchema27: Dynamic;

var dataOperationEngineStatusSchema2: Dynamic;

var dataOperationEngineRunSchema: Dynamic;

var DataOperationEngineProject2: Dynamic;

var dataOperationEngineSet8: Dynamic;

var dataOperationEngineSet9: Dynamic;

var dataOperationEngineSet10: Dynamic;

function isDataOperationEngineSome(
  dataOperationEngineSome?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (Array.isArray(dataOperationEngineSome))
    return dataOperationEngineSome.some(isDataOperationEngineSome);
  if (typeof dataOperationEngineSome != `object` || !dataOperationEngineSome)
    return false;
  for (let isDataOperationEngineSomeResult of Object.keys(
    dataOperationEngineSome,
  ) as Dynamic)
    if (
      dataOperationEngineSet10.has(isDataOperationEngineSomeResult) ||
      isDataOperationEngineSome(
        dataOperationEngineSome[isDataOperationEngineSomeResult],
      )
    )
      return true;
  return false;
}

var isDataOperationEngineGetPrototypeOf: Dynamic;

function collectDataOperationEngineValue(
  collectDataOperationEngineValue2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (Array.isArray(collectDataOperationEngineValue2))
    return collectDataOperationEngineValue2.map(
      collectDataOperationEngineValue,
    );
  if (!isDataOperationEngineGetPrototypeOf(collectDataOperationEngineValue2))
    return collectDataOperationEngineValue2;
  let record2: Dynamic = {};
  for (let collectDataOperationEngineValueResult of Object.keys(
    collectDataOperationEngineValue2,
  ) as Dynamic)
    if (!dataOperationEngineSet10.has(collectDataOperationEngineValueResult)) {
      Object.defineProperty(record2, collectDataOperationEngineValueResult, {
        value: collectDataOperationEngineValue(
          collectDataOperationEngineValue2[
            collectDataOperationEngineValueResult
          ],
        ),
        writable: true,
        enumerable: true,
        configurable: true,
      });
    }
  return record2;
}

function isDataOperationEnginePatch(
  dataOperationEnginePatch?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let collectDataOperationEngineValue2: Dynamic =
    collectDataOperationEngineValue(dataOperationEnginePatch);
  if (
    isDataOperationEngineGetPrototypeOf(collectDataOperationEngineValue2) &&
    Array.isArray(collectDataOperationEngineValue2.patch)
  ) {
    collectDataOperationEngineValue2.patch =
      collectDataOperationEngineValue2.patch.filter(
        (patch?: Dynamic, ..._extraArguments: unknown[]) => {
          let path: Dynamic = patch?.path;
          return !(
            Array.isArray(path) &&
            path.some(
              (path2?: unknown, ..._extraArguments: unknown[]): Dynamic =>
                typeof path2 == `string` && dataOperationEngineSet10.has(path2),
            )
          );
        },
      );
  }
  return collectDataOperationEngineValue2;
}

function resolveDataOperationEngineHostTestimony(
  dataOperationEngineHostTestimony?: unknown,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (isDataOperationEngineSome(options)) return `host-testimony`;
  let patch: Dynamic = options?.patch;
  if (Array.isArray(patch))
    for (let resolveDataOperationEngineHostTestimonyResult of patch as Dynamic) {
      let path: Dynamic = resolveDataOperationEngineHostTestimonyResult?.path;
      if (
        Array.isArray(path) &&
        path.some(
          (path2?: unknown, ..._extraArguments: unknown[]): Dynamic =>
            typeof path2 == `string` && dataOperationEngineSet10.has(path2),
        )
      )
        return `host-testimony`;
    }
}

var dataOperationEnginePathSchema3: Dynamic;

var dataOperationEngineJsonSchema: Dynamic;

var dataOperationEngineDescribeSchema28: Dynamic;

var dataOperationEngineKindSchema12: Dynamic;

var dataOperationEngineEngineSchema8: Dynamic;

var dataOperationEngineEngineSchema9: Dynamic;

var dataOperationEngineEngineSchema10: Dynamic;

var dataOperationEngineKindSchema13: Dynamic;

var resolveDataOperationEngineValue14: Dynamic;

function resolveDataOperationEnginePatchPath(
  dataOperationEnginePatchPath?: Dynamic,
  items?: Dynamic,
  operation?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let itemItem: Dynamic = items[0];
  if (dataOperationEngineSet8.has(itemItem))
    throw new (EngineRefuse as Dynamic)(`patch-path`);
  if (dataOperationEngineSet9.has(itemItem))
    throw new (EngineRefuse as Dynamic)(`reserved-key`);
  let matchesItemsCount = items.length === 1;
  if (operation.op === `set`) {
    let record2: Dynamic =
      dataOperationEnginePatchPath === undefined
        ? {}
        : dataOperationEnginePatchPath;
    if (!resolveDataOperationEngineValue14(record2))
      throw new (EngineRefuse as Dynamic)(`patch-path`);
    let value: Dynamic = matchesItemsCount
      ? operation.value
      : resolveDataOperationEnginePatchPath(
          Object.hasOwn(record2, itemItem) ? record2[itemItem] : undefined,
          items.slice(1),
          operation,
        );
    return {
      ...record2,
      [itemItem]: value,
    };
  }
  if (dataOperationEnginePatchPath === undefined)
    return dataOperationEnginePatchPath;
  if (!resolveDataOperationEngineValue14(dataOperationEnginePatchPath))
    throw new (EngineRefuse as Dynamic)(`patch-path`);
  if (!Object.hasOwn(dataOperationEnginePatchPath, itemItem))
    return dataOperationEnginePatchPath;
  if (matchesItemsCount) {
    let record2: Dynamic = {
      ...dataOperationEnginePatchPath,
    };
    delete record2[itemItem];
    return record2;
  }
  return {
    ...dataOperationEnginePatchPath,
    [itemItem]: resolveDataOperationEnginePatchPath(
      dataOperationEnginePatchPath[itemItem],
      items.slice(1),
      operation,
    ),
  };
}

function resolveDataOperationEngineShape4(
  dataOperationEngineShape4?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let safeParse: Dynamic =
    dataOperationEngineDescribeSchema28.safeParse(options);
  if (!safeParse.success) throw new (EngineRefuse as Dynamic)(`shape`);
  let dataOperationEngineShape42: Dynamic = dataOperationEngineShape4;
  for (let resolveDataOperationEngineShape4Result of safeParse.data as Dynamic)
    dataOperationEngineShape42 = resolveDataOperationEnginePatchPath(
      dataOperationEngineShape42,
      resolveDataOperationEngineShape4Result.path,
      resolveDataOperationEngineShape4Result,
    );
  return dataOperationEngineShape42;
}

var isDataOperationEngineValue: (items?: Dynamic, items2?: Dynamic, ..._extraArguments: unknown[]) => boolean;

function resolveDataOperationEnginePatch(
  dataOperationEnginePatch?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dataOperationEnginePatch2: Dynamic = dataOperationEnginePatch;
  if (!Array.isArray(dataOperationEnginePatch2?.patch))
    throw Error(`json rebase: only {patch} payloads commute`);
  for (let resolveDataOperationEnginePatchResult of options as Dynamic) {
    let patch: Dynamic = resolveDataOperationEnginePatchResult?.patch;
    if (!Array.isArray(patch))
      throw Error(`json rebase: interleaved whole-value write`);
    for (let resolveDataOperationEnginePatchResult2 of dataOperationEnginePatch2.patch as Dynamic)
      for (let resolveDataOperationEnginePatchResult3 of patch as Dynamic)
        if (
          isDataOperationEngineValue(
            resolveDataOperationEnginePatchResult2.path,
            resolveDataOperationEnginePatchResult3.path,
          )
        )
          throw Error(`json rebase: overlapping paths`);
  }
  return dataOperationEnginePatch;
}

var dataOperationEngineSet11: Dynamic;

var dataOperationEngineEngineSchema11: Dynamic;

function resolveDataOperationEnginePatch2(
  dataOperationEnginePatch2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (`patch` in options || `objectType` in options)
    throw new (EngineRefuse as Dynamic)(`shape`);
  return `value` in options ? options.value : dataOperationEnginePatch2;
}

function resolveDataOperationEngineValue15(
  dataOperationEngineValue15?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (`value` in options || `objectType` in options)
    throw new (EngineRefuse as Dynamic)(`shape`);
  return resolveDataOperationEngineShape4(
    dataOperationEngineValue15,
    options.patch,
  );
}

function resolveDataOperationEngineValue16(
  dataOperationEngineValue16?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (`value` in options || `patch` in options || `objectType` in options)
    throw new (EngineRefuse as Dynamic)(`shape`);
  return dataOperationEngineValue16;
}

var resolveDataOperationEngineValue17: Dynamic;

var dataOperationEngineCreateSchema: Dynamic;

function resolveDataOperationEngineAfter(
  dataOperationEngineAfter?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let payload: Dynamic = options.payload;
  if (typeof payload == `object` && payload && `kind` in payload) {
    let kind: Dynamic = payload.kind;
    let payload2: Dynamic = payload;
    if (kind === `patch`)
      return {
        after: resolveDataOperationEngineValue15(
          dataOperationEngineAfter,
          payload2,
        ),
      };
    if (kind === `take`)
      return {
        after: resolveDataOperationEngineValue16(
          dataOperationEngineAfter,
          payload2,
        ),
      };
    if (kind !== `value`) throw new (EngineRefuse as Dynamic)(`shape`);
    return {
      after: resolveDataOperationEnginePatch2(
        dataOperationEngineAfter,
        payload2,
      ),
    };
  }
  return typeof payload == `object` && payload && `patch` in payload
    ? {
        after: resolveDataOperationEngineValue15(
          dataOperationEngineAfter,
          payload,
        ),
      }
    : {
        after: resolveDataOperationEnginePatch2(
          dataOperationEngineAfter,
          typeof payload == `object` && payload ? payload : {},
        ),
      };
}

var dataOperationEngineProjectFileNodeRunValues2: string[];

var dataOperationEngineDescribeSchema29: Dynamic;

var resolveDataOperationEngineNoun: Dynamic;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeDataOperationEngine2Step1(): void {
  (DataOperationEngineValue = {
    ...resolveDataOperationEngineCreate(`prose`),
    value: dataOperationEngineParentSchema2,
    target: dataOperationEngineQuoteSchema,
    materialize: (
      dataOperationEngineValue?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ) => {
      let dataOperationEngineValue2: Dynamic = dataOperationEngineValue;
      let options2: Dynamic = options;
      if (
        dataOperationEngineValue2?.doc === undefined ||
        typeof dataOperationEngineValue2.ydoc != `string` ||
        options2?.quote?.exact === undefined
      )
        return;
      let yUpdate = resolveDataOperationEngineYdoc2(
        dataOperationEngineValue2.doc,
        dataOperationEngineValue2.ydoc,
        options2.quote,
        context,
      );
      if (yUpdate !== undefined)
        return {
          engine: `prose`,
          yUpdate: yUpdate,
        };
    },
    deriveAnchor: (
      dataOperationEngineValue?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let context: Dynamic = dataOperationEngineValue;
      if (context?.doc === undefined) return;
      let dataOperationEngineValue2: Dynamic =
        dataOperationEngineQuoteSchema.safeParse(options);
      if (!dataOperationEngineValue2.success) return;
      let options2: Dynamic = resolveDataContentAndReferencesPrefix(
        context.doc,
        dataOperationEngineValue2.data.quote,
      );
      if (options2 === undefined) return;
      let yUpdate: Dynamic = options;
      let quote: Dynamic = yUpdate.quote;
      return {
        ...yUpdate,
        quote: {
          ...quote,
          prefix: options2.prefix,
          suffix: options2.suffix,
        },
      };
    },
    anchorOutcome: (
      dataOperationEngineValue?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) => {
      let context: Dynamic = dataOperationEngineValue;
      if (context?.doc === undefined) return;
      let dataOperationEngineValue2: Dynamic =
        dataOperationEngineQuoteSchema.safeParse(options);
      if (dataOperationEngineValue2.success)
        return resolveDataContentAndReferencesExact2(
          context.doc,
          dataOperationEngineValue2.data.quote,
        );
    },
    reanchor: (
      dataOperationEngineValue?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let dataOperationEngineValue2: Dynamic = options;
      if (
        dataOperationEngineValue2?.doc === undefined ||
        typeof dataOperationEngineValue2.ydoc != `string`
      )
        return [];
      let options2: Dynamic = dataOperationEngineValue;
      let yUpdate: Dynamic =
        options2?.doc === undefined
          ? undefined
          : resolveDataOperationEngineCommentAnchor2(options2.doc);
      let quote: Dynamic = resolveDataOperationEngineCommentAnchor2(
        dataOperationEngineValue2.doc,
      );
      let items: Dynamic = [];
      let doc: Dynamic = dataOperationEngineValue2.doc;
      let ydoc: Dynamic = dataOperationEngineValue2.ydoc;
      for (let {
        threadId: threadId,
        anchor: dataOperationEngineValueResult,
      } of context as Dynamic) {
        if (
          quote.has(threadId) ||
          (yUpdate !== undefined && !yUpdate.has(threadId))
        )
          continue;
        let safeParse: Dynamic = dataOperationEngineQuoteSchema.safeParse(
          dataOperationEngineValueResult,
        );
        if (!safeParse.success) continue;
        let outcome = resolveDataContentAndReferencesExact2(
          doc,
          safeParse.data.quote,
        );
        if (outcome !== `hit_ctx` && outcome !== `hit_exact_fallback`) {
          items.push({
            threadId: threadId,
            outcome: outcome,
          });
          continue;
        }
        let yUpdate2 = resolveDataOperationEngineYdoc2(
          doc,
          ydoc,
          safeParse.data.quote,
          threadId,
        );
        if (yUpdate2 === undefined) {
          items.push({
            threadId: threadId,
            outcome: outcome,
          });
          continue;
        }
        items.push({
          threadId: threadId,
          outcome: outcome,
          payload: {
            engine: `prose`,
            yUpdate: yUpdate2,
          },
        });
        try {
          let dataOperationEngineProseNoYdoc: Dynamic =
            resolveDataOperationEngineProseNoYdoc({
              ydoc: ydoc,
            });
          applyUpdate(
            dataOperationEngineProseNoYdoc,
            resolveDataOperationEngineShape2(yUpdate2),
          );
          ydoc = resolveDataOperationEngineValue10(
            dataOperationEngineProseNoYdoc,
          );
          doc = resolveDataOperationEngineGetXmlFragment(
            dataOperationEngineProseNoYdoc,
          );
          quote.add(threadId);
        } catch {}
      }
      return items;
    },
    cursor: dataOperationEngineNodeSchema,
    valueFor: (
      dataOperationEngineValue?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      dataOperationEngineValue === `node`
        ? dataOperationEngineParentSchema2.extend({
            parent: dataContentAndReferencesDescribeSchema5,
          })
        : dataOperationEngineParentSchema2,
    sourceBlobs: resolveDataOperationEngineCreate2,
    create: lazyZod.union([
      dataOperationEngineEngineSchema4,
      dataOperationEngineParentSchema,
    ]),
    update: dataOperationEngineDescribeSchema9,
    apply: resolveDataOperationEngineValue6(
      (..._extraArguments: unknown[]): Dynamic => [
        DataOperationEngineVerbs2,
        DataOperationEngineCreate,
      ],
    ),
    rebase: (
      dataOperationEngineValue?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      if (typeof dataOperationEngineValue?.yUpdate != `string`)
        throw Error(
          `prose rebase: a held coarse CAS is stale by definition — revise the hold`,
        );
      for (let dataOperationEngineValueResult of options as Dynamic)
        if (typeof dataOperationEngineValueResult?.yUpdate != `string`)
          throw Error(
            `prose rebase: cannot rebase a held yUpdate across a coarse write — revise the hold`,
          );
      return dataOperationEngineValue;
    },
    coalesce: {
      admits: (
        dataOperationEngineValue?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        dataOperationEngineValue === `update` &&
        typeof options?.yUpdate == `string`,
      fold: (
        dataOperationEngineValue?: Dynamic,
        ..._extraArguments: unknown[]
      ) => ({
        engine: `prose`,
        yUpdate: resolveDataOperationEngineApply(
          mergeUpdates(
            dataOperationEngineValue.map(
              (
                rolldownNImport2?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic =>
                resolveDataOperationEngineShape2(rolldownNImport2.yUpdate),
            ),
          ),
        ),
      }),
      wouldExceed: (
        dataOperationEngineValue?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ) => {
        let context: Dynamic = options.yUpdate.length;
        for (let dataOperationEngineValueResult of dataOperationEngineValue as Dynamic)
          context += dataOperationEngineValueResult.yUpdate.length;
        return context > dataOperationEngineValue8000000 / 2;
      },
      debounceMs: 2e3,
      maxWaitMs: 5e3,
    },
  });
  (DataOperationEngineVerbs2 = {
    name: `prose`,
    verbs: {
      create: {
        doc: {
          objectTypes: [`node`, `utterance`],
          payload: dataOperationEngineEngineSchema4,
          description: `Birth a PM-JSON doc; deterministic seed (same doc → identical ydoc bytes). parent REQUIRED on node, absent on utterance.`,
        },
        blob: {
          objectTypes: [`node`, `utterance`],
          payload: dataOperationEngineParentSchema,
          description: `Birth prose by seeding from a blob's bytes (id: blob/<id> — spilled PM-JSON; an id naming no in-room blob refuses prose-blob-unowned), decoded engine-specifically; folds byte-identical to the same doc born inline (create.doc).`,
        },
      },
      update: {
        crdt: {
          objectTypes: [`node`, `utterance`],
          payload: dataOperationEngineEngineSchema5,
          description: `Live typing: a yjs update. Two writers, different laws: door (one author) and flushCoalesced (N authors merged, ROOM_ACTOR + op.authors[]).`,
        },
        cas: {
          objectTypes: [`node`, `utterance`],
          payload: dataOperationEngineEngineSchema6,
          description: `Whole-doc compare-and-set: if_match hash or the write denies stale.`,
        },
        ops: {
          objectTypes: [`node`, `utterance`],
          payload: dataOperationEngineEngineSchema7,
          description: `Block operations, 1..64 per row, fold-atomic.`,
        },
      },
      read: {
        value: {
          objectTypes: [`node`, `utterance`],
          payload: dataOperationEngineParentSchema2,
          description: `The committed doc + meta (what reads return / checkpoints snapshot); parent narrows REQUIRED on node exactly as valueFor does.`,
        },
      },
    },
    grammars: {
      proseAnchor: {
        schema: dataOperationEngineQuoteSchema,
        description: `Anchor/pin grammar (quote prefix/exact/suffix + block pins).`,
      },
      proseBlockOp: {
        schema: dataOperationEngineAfterBidSchema,
        description: `The block-op vocabulary ops-arm rows carry.`,
      },
      proseNodeType: {
        schema: dataOperationEngineParagraphSchema,
        description: `The ruled prose node-type vocabulary (PROSE_NODE_TYPES as the manifest's enum — drift-pinned).`,
      },
      proseMark: {
        schema: dataOperationEngineDescribeSchema7,
        description: `One mark instance — {type, attrs?}; vocabulary open by law (unknown marks preserve-inert).`,
      },
      proseNode: {
        schema: dataOperationEngineBidSchema2,
        description: `ONE prose node — the explicit recursive doc grammar, every member titled with its attr seats.`,
      },
      proseDoc: {
        schema: dataOperationEngineDescribeSchema8,
        description: `The committed PM-JSON doc — the root prose node; what zProseValue.doc, the create doc seat and the CAS value seat all carry.`,
      },
      blobSeed: {
        schema: dataOperationEngineParentSchema,
        group: `Values`,
        description: `The shared create.blob seed arm: {id: blob/<id>, parent?} — birth content by seeding from a blob's bytes, decoded engine-specifically. ONE definition, referenced by prose.create.blob and iron.create.blob (kind.ts).`,
      },
    },
  });
  (resolveDataOperationEngineDeny = (
    dataOperationEngineDeny?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    dataOperationEngineDeny === undefined
      ? {}
      : {
          deny: `prose-exists`,
        });
  (resolveDataOperationEngineDeny2 = (
    dataOperationEngineDeny2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    dataOperationEngineDeny2 === undefined
      ? {
          deny: `prose-absent`,
        }
      : {});
  (DataOperationEngineCreate = {
    create: {
      doc: {
        admit: resolveDataOperationEngineDeny,
        apply: (
          dataOperationEngineCreate?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => ({
          state: resolveDataOperationEngineParent(dataOperationEngineCreate),
        }),
      },
      blob: {
        admit: resolveDataOperationEngineDeny,
        apply: (
          dataOperationEngineCreate?: Dynamic,
          options?: unknown,
          context?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => {
          let blobEntry: Dynamic = context?.blobs.get(
            dataOperationEngineCreate.id,
          );
          if (blobEntry === undefined)
            throw new (EngineRefuse as Dynamic)(`prose-blob-unwired`);
          return {
            state: resolveDataOperationEngineDoc({
              bytes: blobEntry.bytes,
              ...(dataOperationEngineCreate.parent === undefined
                ? {}
                : {
                    parent: dataOperationEngineCreate.parent,
                  }),
            }),
          };
        },
      },
    },
    update: {
      crdt: {
        admit: resolveDataOperationEngineDeny2,
        apply: (
          dataOperationEngineCreate?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => ({
          state: updateDataOperationEngineLeft(
            dataOperationEngineCreate,
            options,
          ),
        }),
      },
      cas: {
        admit: resolveDataOperationEngineDeny2,
        apply: (
          dataOperationEngineCreate?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => ({
          state: clearDataOperationEngineProseNoYdoc(
            dataOperationEngineCreate,
            options,
          ),
        }),
      },
      ops: {
        admit: resolveDataOperationEngineDeny2,
        apply: (
          dataOperationEngineCreate?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => ({
          state: resolveDataOperationEngineProseNoYdoc2(
            dataOperationEngineCreate,
            options,
          ),
        }),
      },
    },
    read: {
      value: {
        serve: (
          dataOperationEngineCreate?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => dataOperationEngineCreate,
      },
    },
  });
  (dataOperationEngineSurfaceSchema = lazyZod.strictObject({
    surface: lazyZod
      .string()
      .min(1)
      .max(64)
      .regex(
        /^[a-z0-9][a-z0-9._-]*$/,
        `surface must be a lowercase namespace token (a-z, 0-9, '.', '_', '-')`,
      )
      .describe(
        `The id's NAMESPACE word ("slack", "claude-ai", "claude-code", …) — a lowercase token (the KNOWN_AGENT_TYPES discipline: record the raw namespace word), NOT the agent brand ("coworker"): backlink resolution is per-namespace. Token grammar by law: display fallbacks render this string, so glyphs that could mimic the attested checkmark refuse at the shape.`,
      ),
    id: lazyZod
      .string()
      .min(1)
      .max(256)
      .regex(/\S/, `id must carry a non-whitespace character`)
      .describe(
        `Per-surface conversation coordinates — Slack: "<channel>:<thread-ts>" for thread sessions, "<channel>" alone for channel sessions. Max 256: source's OWN budget (deliberately NOT the 64-char attribution logSafe cap), sized to admit URI-shaped ids without a schema change.`,
      ),
    attested: lazyZod
      .boolean()
      .describe(
        `The trust grade: true = the SERVER derived these coordinates from the verified ingress headers (gateway-trust grade, the workbook §2c's ceiling); false = the client reported them (testimony). Display only — never authority.`,
      ),
  }));
  (dataOperationEngineViewerSchema = lazyZod
    .enum([`viewer`, `editor`])
    .describe(
      `What a grant confers — an EXTENSIBLE enum: editor writes content, viewer reads. Capabilities derive from ONE role→capability table (ROLE_CAPABILITIES below) — a later role (admin, ruling ②) is one enum arm + one table column.`,
    ));
  (dataOperationEngineDescribeSchema10 = lazyZod
    .string()
    .regex(/^group:[A-Za-z0-9_.-]{1,64}$/)
    .describe(
      `A GROUP grant key — group:<claude.ai-native id>. Resolution happens through the GroupResolver seam, NEVER on the check path; roleOf consults the cached membership snapshot.`,
    ));
  (resolveDataOperationEngineStartsWith = (
    dataOperationEngineStarts?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => dataOperationEngineStarts.startsWith(`group:`));
  (dataOperationEngineSet6 = new (Set as Dynamic)([
    `__proto__`,
    `constructor`,
    `prototype`,
  ]));
  (dataOperationEngineIllegalGranteeSchema = lazyZod
    .union([
      dataOperationEngineDescribeSchema10,
      dataContentAndReferencesDescribeSchema2.refine(
        (
          dataOperationEngineIllegalGranteeSchema2?: Dynamic,
          ..._extraArguments: unknown[]
        ) =>
          !resolveDataOperationEngineStartsWith(
            dataOperationEngineIllegalGranteeSchema2,
          ),
        `the group: prefix belongs to the group-ref arm`,
      ),
    ])
    .refine(
      (
        dataOperationEngineIllegalGranteeSchema2?: Dynamic,
        ..._extraArguments: unknown[]
      ) => !dataOperationEngineSet6.has(dataOperationEngineIllegalGranteeSchema2),
      `illegal grantee`,
    )
    .describe(
      `Who a grant names: a principal (real | synthetic | legacy token) or a group:<id> ref. Its own type, distinct from the actor grammar — the group namespace cannot be squatted by a legacy token.`,
    ));
  (dataOperationEngineRoleSchema = lazyZod
    .object({
      role: dataOperationEngineViewerSchema,
      expires_at: lazyZod.iso
        .datetime({
          offset: true,
        })
        .optional()
        .describe(
          `Grant expiry — a DAY-ONE field (cheap now, unretrofittable later; claude.ai prior art). An expired grant confers nothing: roleOf compares against the caller-supplied now. Absent = no expiry.`,
        ),
      members: lazyZod
        .array(dataContentAndReferencesDescribeSchema2)
        .optional()
        .describe(
          `GROUP GRANTS ONLY — the member set FROZEN at grant time (the ruled mechanism, decision (c)): resolved by the room from the membership view when the grant lands, granter excluded (unless the granter is the owner — transfer-safe), entries validated through the principal grammar with the group: namespace and forbidden keys carved out, recorded as room testimony on the row. roleOf consults THIS set, not live membership — later group additions confer nothing (closes add-yourself-later laundering); later removals keep access until the grant is revoked (auditable-and-stable; group-removal is not a revocation lever, revoke is).`,
        ),
      source: dataOperationEngineSurfaceSchema
        .optional()
        .describe(
          `WHICH CONVERSATION MADE THIS GRANT — the shared source fragment (objects/source.ts: {surface, id, attested}), testimony only (zero authority: roleOf/hasCapability NEVER read it — the read rule: actor = who, vouched, feeds permissions; source = where-from, claimed, feeds nothing). Rides the grant ACT (zAccessPayload) and is copied onto the row by replayAccessRow; attested:true is server-minted only — the access lane's own attest arm (room.ts) admits it under the in-process attestation grant or byte-held from the existing row, exactly the sourceAttestDeny posture. Display only: the share dialog's origin chip.`,
        ),
    })
    .describe(
      `One grant: the role conferred, optional expiry, and — for groups — the frozen member set.`,
    ));
  (dataOperationEngineOwnerSchema = lazyZod
    .object({
      owner: dataContentAndReferencesDescribeSchema2.describe(
        `The container's owner — a container-value fact, not a grant: exactly one, cannot be revoked, moves only via the access verb's owner-only transfer arm. Stamped by the room at create (room testimony, never a wire claim).`,
      ),
      grants: lazyZod
        .record(
          dataOperationEngineIllegalGranteeSchema,
          dataOperationEngineRoleSchema,
        )
        .describe(
          `grantee → grant. Mutated ONLY by the room's access-verb lane (grant upsert / revoke remove / transfer swap-owner), so every change is a ledgered row with an actor — engines may read this field and never write it (sharing-protected, doorGuard). Revoking an absent grant is refused — a no-op revoke is a bug, not history. ORG-VISIBILITY NOTE (open seam, routed): under decision (c) a group grant freezes today's roster, so an org-wide group row means share-with-today's-org, not track-the-org; when the org adapter lands, designated live groups can ride the member-less fallback arm in roleOf (a row without members resolves live) — that designation is the adapter unit's to wire.`,
        ),
    })
    .describe(
      `THE access field — sharing on the container value, one shape across all container kinds: {owner, grants}. ONE widening mechanism, deliberately: org visibility rides a GROUP ROW naming the org-wide group, NOT a separate org-floor field; this makes the v1 private→shared flip a LEDGERED grant like any other (D7), where v1's state flip was unaudited. Changes via the access VERB only; the field never vanishes (no delete; a container always has an owner).`,
    ));
  lazyZod.discriminatedUnion(`act`, [
    lazyZod.object({
      act: lazyZod.literal(`grant`),
      grantee: dataOperationEngineIllegalGranteeSchema,
      role: dataOperationEngineViewerSchema,
      expires_at: lazyZod.iso
        .datetime({
          offset: true,
        })
        .optional(),
      members: lazyZod.array(dataContentAndReferencesDescribeSchema2).optional(),
      source: dataOperationEngineSurfaceSchema.optional(),
    }),
    lazyZod.object({
      act: lazyZod.literal(`revoke`),
      grantee: dataOperationEngineIllegalGranteeSchema,
      acknowledge: lazyZod.literal(`self-lockout`).optional(),
    }),
    lazyZod.object({
      act: lazyZod.literal(`transfer`),
      to: dataContentAndReferencesDescribeSchema2
        .refine(
          (callback?: Dynamic, ..._extraArguments: unknown[]) =>
            !resolveDataOperationEngineStartsWith(callback),
          `the group: namespace cannot own`,
        )
        .refine(
          (callback?: Dynamic, ..._extraArguments: unknown[]) =>
            !dataOperationEngineSet6.has(callback),
          `illegal owner`,
        ),
    }),
  ]);
  (dataOperationEngineColorSchema = lazyZod
    .strictObject({
      name: lazyZod
        .string()
        .describe(
          `The option's label. RENAMEABLE (display only; the INDEX is the stored identity, so a rename never moves history). Options are never dropped — soft-delete by disabling.`,
        ),
      color: lazyZod
        .string()
        .max(24)
        .optional()
        .describe(
          `Optional display hue — a palette NAME the renderers map (bounded token, never a raw style). Absent = the client's default color wheel by index (optional color selection; the default wheel applies only when nothing is picked).`,
        ),
      order: lazyZod
        .number()
        .describe(
          `Explicit display position — options sort by this number, so display order can change WITHOUT mutating the options array's indices (indices are the stored values; order is presentation).`,
        ),
      disabled: lazyZod
        .boolean()
        .optional()
        .describe(
          `True = retired: the option stays (its index keeps resolving in old rows and chips) but new writes may not use it. Disabling is the ONLY way to remove an option from use. OPTIONAL — absent = enabled.`,
        ),
    })
    .describe(
      `One enum option. Options are addressed BY INDEX into the options array — that is what rows and prose chips store.`,
    ));
  (dataOperationEngineOptionsSchema = lazyZod
    .strictObject({
      name: lazyZod
        .string()
        .describe(`Human handle for the enum (e.g. priority, status).`),
      options: lazyZod
        .array(dataOperationEngineColorSchema)
        .describe(
          `NEVER-SHRINK (the door refuses drops, reason append-only): an update may append options, rename existing ones (2026-08-06 — display only; indices are the stored identity), and flip order/disabled — but may NEVER drop an entry: stored values are INDICES into this array, so history stays resolvable forever. Soft-delete = disabled.`,
        ),
    })
    .describe(
      `A named, append-only option list. Table columns ({kind: 'enum'}) and prose enum chips store the INDEX of the chosen option; the index must exist and must not be disabled at write time (enum-index). Deleting options is impossible by design — disable instead.`,
    ));
  lazyZod
    .string()
    .regex(/^[a-z0-9][\w.+-]*\/[\w.+-]+$/i, `a MIME type: type/subtype`)
    .describe(
      `A MIME string: type/subtype (RFC 6838). NO LONGER STORED ON THE FILE (the birthName re-ruling: the extension carries the type; surfaces that speak MIME compute it via mimeForName at emit). This grammar remains the door for the lanes that still SPEAK mime — blob byte metadata, media nodes, and the computed emits.`,
    );
  (dataOperationEngineMessageSchema = lazyZod
    .string()
    .min(1)
    .max(255)
    .regex(
      /^[^/\p{Cc}\p{Cf}\p{Zl}\p{Zp}]+$/u,
      `a file NAME: no slash, no control or invisible/format characters`,
    )
    .refine(
      (
        dataOperationEngineMessageSchema7?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        dataOperationEngineMessageSchema7.trim() ===
          dataOperationEngineMessageSchema7 &&
        dataOperationEngineMessageSchema7 !== `.` &&
        dataOperationEngineMessageSchema7 !== `..`,
      {
        message: `a file NAME: no edge whitespace, not a dot-path`,
      },
    )
    .describe(
      `The file's NAME AT BIRTH, extension included ('Tab 1.ldoc', 'model.xlsx', 'notes.md') — IMMUTABLE post-birth (the door law is room.ts's birth-name arm). The EXTENSION is the type authority (routeForName, mimeForName) — the one job this name has beyond display fallback. It is a NAME, not a path (no slash — serving-path rel resolution stays on PLACEMENT names, one authority per job), and not the display name (tabs[id].name overrides; this is the fallback, shown extension-stripped). Extensionless names and dotfiles are admitted (they route text and emit octet-stream).`,
    ));
  (dataOperationEngineNoteSchema = lazyZod
    .strictObject({
      by: dataContentAndReferencesDescribeSchema2.describe(
        `Who locked it (claim; the lock row's actor is the testimony).`,
      ),
      at: lazyZod
        .string()
        .describe(`When, ISO string (claim; the row's at is the testimony).`),
      note: lazyZod.string().optional().describe(`Why — one-liner.`),
    })
    .describe(`The lock audit — who/when/why, never a bare bool.`));
  (dataOperationEngineKindSchema2 = lazyZod
    .discriminatedUnion(`kind`, [
      lazyZod
        .strictObject({
          kind: lazyZod
            .literal(`text`)
            .describe(`The discriminant: inline content.`),
          text: lazyZod.string().describe(`The source text.`),
        })
        .describe(`Inline.`),
      lazyZod
        .strictObject({
          kind: lazyZod
            .literal(`blob`)
            .describe(`The discriminant: spilled content.`),
          blob: lazyZod
            .string()
            .regex(/^blob\/[A-Za-z0-9_-]{1,64}$/)
            .describe(`A blob/<id> ref — the spilled content's address.`),
        })
        .describe(`Spilled.`),
      lazyZod
        .strictObject({
          kind: lazyZod
            .literal(`node`)
            .describe(`The discriminant: engine-typed child-node content.`),
          id: lazyZod
            .string()
            .min(1)
            .describe(
              `THE ROOT NODE's room-minted id (the content-collapse ruling: the v3 file object absorbs v1's document node — a single pointer DOWN, a value not a map; no document node type exists). Door law: this id must name a node whose parent is THIS file (the DAG-from-root invariant carried from v1). The pointer is AUTHORITATIVE — the prose isDocument flag is derived-or-dies. Multi-node ordering lives UNDER the root node, never on the file.`,
            ),
        })
        .describe(`Node-rooted (ldoc/office lanes — the room IS the structure).`),
    ])
    .describe(
      `Inline {kind:'text'} under the spill threshold, spilled {kind:'blob'} above — an explicit kind discriminant on strict arms; the spill is a ref in the payload, the envelope is unchanged.`,
    ));
  (DataOperationEngineApplicationVndClaudePage = {
    "application/vnd.claude.page": `Doc.ldoc`,
    "text/markdown": `doc.md`,
    "text/plain": `doc.txt`,
    "text/csv": `data.csv`,
    "application/json": `data.json`,
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": `Book.xlsx`,
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": `Doc.docx`,
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": `Deck.pptx`,
    "application/vnd.openxmlformats-officedocument.spreadsheetml.template": `Book.xltx`,
    "application/vnd.openxmlformats-officedocument.wordprocessingml.template": `Doc.dotx`,
    "application/vnd.openxmlformats-officedocument.presentationml.template": `Deck.potx`,
  });
  (dataOperationEngineMimeSchema = lazyZod.preprocess(
    (
      dataOperationEngineMimeSchema2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      if (
        typeof dataOperationEngineMimeSchema2 == `object` &&
        dataOperationEngineMimeSchema2 &&
        !(`birthName` in dataOperationEngineMimeSchema2) &&
        `mime` in dataOperationEngineMimeSchema2 &&
        typeof dataOperationEngineMimeSchema2.mime == `string`
      ) {
        let {
          mime: dataOperationEngineMimeSchema3,
          ...dataOperationEngineMimeSchema4
        }: Dynamic = dataOperationEngineMimeSchema2;
        return {
          ...dataOperationEngineMimeSchema4,
          birthName:
            DataOperationEngineApplicationVndClaudePage[
              dataOperationEngineMimeSchema3
            ] ?? `file.bin`,
        };
      }
      return dataOperationEngineMimeSchema2;
    },
    lazyZod
      .strictObject({
        birthName: dataOperationEngineMessageSchema.describe(
          `The name at birth — REQUIRED: a file without a name is not a file.`,
        ),
        content: dataOperationEngineKindSchema2
          .optional()
          .describe(
            `Text-lane content ({kind:'text'} inline | {kind:'blob'} spilled). Absent for files whose content lives in engine-typed child nodes (ldoc, office lanes — F3's routing).`,
          ),
        locked: dataOperationEngineNoteSchema
          .optional()
          .describe(
            `Present = LOCKED: only ["locked"]-path patches pass at the door (set = lock, delete = unlock); everything else incl. delete refuses. Reads, placement, and proposals stay free. Door law lands with its own page-09 row.`,
          ),
        styleSheet: lazyZod
          .string()
          .max(65536)
          .optional()
          .describe(
            `Per-doc CSS carried alongside the ldoc's prose (v1 .html shell <style> block, extracted at migration). Injected into the ldoc iframe's <head> after the base sheet so doc rules win on source order. Doc-level (not per-node): CSS is a whole-doc concern. Bounded at 64KB — a shell block over that is a Q2 loss recorded at migration, not a store refuse. Network surface: the ldoc iframe's CSP is default-src 'none' (style-src 'unsafe-inline' only), so url()/import in this string cannot reach an external host — same-or-tighter than v1's shell iframe, which had no CSP meta.`,
          ),
      })
      .describe(
        `A file: birthName (+ optional content, optional lock, optional styleSheet) — NOTHING else. birthName is the IMMUTABLE name-at-birth (extension = type authority; display fallback when the placement entry is nameless) — the DISPLAY name still lives on the project's placement maps, and so do placement, ordering, and directory-ness. STRICT: unknown keys refuse at the value gate.`,
      )
      .refine(
        (
          dataOperationEngineMimeSchema2?: Dynamic,
          ..._extraArguments: unknown[]
        ) =>
          !(
            resolveDataOperationEngineLdoc(
              dataOperationEngineMimeSchema2.birthName,
            ) === `iron` &&
            dataOperationEngineMimeSchema2.content?.kind === `text`
          ),
        {
          message: `office-named file with inline text content bypasses iron routing (D2: use {kind:'blob'})`,
        },
      ),
  ));
  (dataOperationEngineSet7 = new (Set as Dynamic)(
    `xlsx.xltx.docx.dotx.pptx.potx.ppsx.sldx.xlsm.xltm.xlsb.xlam.docm.dotm.pptm.potm.ppsm.ppam.sldm.xls.xlt.xla.xlm.xlc.xlw.doc.dot.ppt.pot.pps.ppa`.split(
      `.`,
    ),
  ));
  (DataOperationEngineMarkdown = {
    md: `text/markdown`,
    markdown: `text/markdown`,
    txt: `text/plain`,
    json: `application/json`,
    csv: `text/csv`,
    html: `text/html`,
    htm: `text/html`,
    py: `text/x-python`,
    ts: `text/x-typescript`,
    tsx: `text/x-typescript`,
    js: `text/javascript`,
    sql: `application/sql`,
    yaml: `application/yaml`,
    yml: `application/yaml`,
    toml: `application/toml`,
    css: `text/css`,
    sh: `text/plain`,
    keep: `text/plain`,
    pdf: `application/pdf`,
    png: `image/png`,
    jpg: `image/jpeg`,
    jpeg: `image/jpeg`,
    gif: `image/gif`,
    ldoc: `application/vnd.claude.page`,
    xlsx: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`,
    xltx: `application/vnd.openxmlformats-officedocument.spreadsheetml.template`,
    docx: `application/vnd.openxmlformats-officedocument.wordprocessingml.document`,
    dotx: `application/vnd.openxmlformats-officedocument.wordprocessingml.template`,
    pptx: `application/vnd.openxmlformats-officedocument.presentationml.presentation`,
    potx: `application/vnd.openxmlformats-officedocument.presentationml.template`,
    ppsx: `application/vnd.openxmlformats-officedocument.presentationml.slideshow`,
    sldx: `application/vnd.openxmlformats-officedocument.presentationml.slide`,
    xlsm: `application/vnd.ms-excel.sheet.macroEnabled.12`,
    xltm: `application/vnd.ms-excel.template.macroEnabled.12`,
    xlsb: `application/vnd.ms-excel.sheet.binary.macroEnabled.12`,
    xlam: `application/vnd.ms-excel.addin.macroEnabled.12`,
    docm: `application/vnd.ms-word.document.macroEnabled.12`,
    dotm: `application/vnd.ms-word.template.macroEnabled.12`,
    pptm: `application/vnd.ms-powerpoint.presentation.macroEnabled.12`,
    potm: `application/vnd.ms-powerpoint.template.macroEnabled.12`,
    ppsm: `application/vnd.ms-powerpoint.slideshow.macroEnabled.12`,
    ppam: `application/vnd.ms-powerpoint.addin.macroEnabled.12`,
    sldm: `application/vnd.ms-powerpoint.slide.macroEnabled.12`,
    xls: `application/vnd.ms-excel`,
    xlt: `application/vnd.ms-excel`,
    xla: `application/vnd.ms-excel`,
    xlm: `application/vnd.ms-excel`,
    xlc: `application/vnd.ms-excel`,
    xlw: `application/vnd.ms-excel`,
    doc: `application/msword`,
    dot: `application/msword`,
    ppt: `application/vnd.ms-powerpoint`,
    pot: `application/vnd.ms-powerpoint`,
    pps: `application/vnd.ms-powerpoint`,
    ppa: `application/vnd.ms-powerpoint`,
  });
  (dataOperationEngineDescribeSchema11 = lazyZod
    .json()
    .describe(
      `A json data node's value: ANY JSON, unwrapped — free-form by design (load-bearing for the batch lane's injection defense; see objects/node.ts). May carry parent: {object, id} (the batch lane's one id-bearing position); parent-edge integrity is not a shape concern. Prose/iron/widget nodes ride their OWN engines' value shapes — this is the json lane's only.`,
    ));
  (dataOperationEngineMessageSchema2 = lazyZod
    .string()
    .min(1)
    .refine(
      (
        dataOperationEngineMessageSchema22?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        dataOperationEngineMessageSchema22 !== `__proto__` &&
        dataOperationEngineMessageSchema22 !== `constructor` &&
        dataOperationEngineMessageSchema22 !== `prototype` &&
        dataOperationEngineMessageSchema22 !== `uploadUrl`,
      {
        message: `reserved or prototype-polluting key`,
      },
    )
    .describe(
      `A placement-map key (a minted file id or directory id) — never a prototype-polluting or door-reserved name.`,
    ));
  (dataOperationEngineSubtabOfSchema = lazyZod
    .strictObject({
      name: lazyZod
        .string()
        .min(1)
        .optional()
        .describe(
          'The DISPLAY NAME — a name, never a filename (ruled): no extension, mime carries type ("readme", not "readme.md"). OPTIONAL (file names live on the project object\'s JSON; by default, files have no names): a file is born placed-but-nameless (`{}`); the header shows the project name until the user names it. When present, refuses only emptiness; vocabulary law lives in review culture and the composing surfaces.',
        ),
      subtabOf: dataOperationEngineMessageSchema2
        .optional()
        .describe(
          "The parent FILE — a key into the same tabs map (the Jul 2026 unification: folders are just files with children; this respells the retired `dir`; a zPlacementKey — inherits its prototype-polluting-key refine, r3604864075). Absent = a root. Dangling keys are a DOOR/consumer concern (cross-entry existence is not schema law — the jsonShapes self-knowledge rule).",
        ),
      dir: dataOperationEngineMessageSchema2
        .optional()
        .describe(
          "RETIRED SPELLING of subtabOf. Stored rows keep it forever (the ledger is never rewritten); it still validates when present, reads fold it to subtabOf (projectPlacementOf, entry-level subtabOf-wins) — it resolves only when it names a live tabs/`directory` entry (the dead folder map is never read) — and NO live writer emits it.",
        ),
      order: lazyZod
        .string()
        .min(1)
        .optional()
        .describe(
          `Sibling sort position — a FRACTIONAL-INDEX STRING (minted via keyBetween/keyAfterAll, src/lib/fracIndex.ts), compared lexicographically. NOT a number — the bughunter round's codebase trace: every producer, and the v1 file-table migration these maps succeed, writes base-62 index strings so inserts between any two positions never renumber siblings. The format itself is deliberately unvalidated (the v1 column wasn't either; brittle regexes on an opaque index are how migrations break). Absent = surface default (name sort).`,
        ),
    })
    .describe(
      `One placement: {name?, subtabOf?, order?} (+ the retired dir spelling on stored rows) — where something sits and (optionally) what it is called.`,
    ));
  (dataOperationEngineAutoRespondSchema = lazyZod
    .strictObject({
      autoRespond: lazyZod
        .enum([`all`, `mention-only`, `off`])
        .optional()
        .describe(
          `When a human COMMENT wakes Claude: "all" (default — @claude, re-engaged threads, un-addressed roots on agent-touched docs), "mention-only" (only an explicit @claude), "off" (never; an external agent may own replies). Container chat is unaffected.`,
        ),
    })
    .describe(
      `Per-project assistant settings — a strict, ruled sub-object (unknown keys refuse).`,
    ));
  (dataOperationEngineSourceSchema = lazyZod
    .object({
      source: dataOperationEngineSurfaceSchema
        .optional()
        .describe(
          "WHICH CONVERSATION BIRTHED THIS PROJECT — the shared source fragment (objects/source.ts: {surface, id, attested}), testimony only (zero authority; no law consults it). CREATION-ONLY like the routine's (sourceBirthFreezeDeny: post-birth adds/re-labels refuse; byte-held round-trips ride; dropping is legal), admitted at the lobby birth whitelist for project births and stamped attested by the MCP door's verified ingress (mcpVerbs.ts). attested:true is server-minted only (sourceAttestDeny). NOTE — a ruled key on a historically loose value: a pre-existing junk-valued `source` (loose passthrough admitted arbitrary keys) refuses live edits until fixed in the same write, the conforming-edit road this file's header documents; no such population is expected (the key is new vocabulary).",
        ),
      deleted: lazyZod
        .literal(true)
        .optional()
        .describe(
          `The container soft-delete lifecycle flag (restore/purge PR) — EXACT true, door-written once that PR's arms land (its doorGuard verb-gates the key on container values). Admitted here per that PR's forward-shape constraint; junk values refuse.`,
        ),
      tabs: lazyZod
        .record(
          dataOperationEngineMessageSchema2,
          dataOperationEngineSubtabOfSchema,
        )
        .optional()
        .describe(
          `THE ONE placement map (the Jul 2026 tabs/folders unification): fileId → {name?, subtabOf?, order?}, nesting via subtabOf — folders are just files with children. THE home of every file's name/position (file values carry none by law). Key = a file's minted id, period — every entry is an ordinary file backed by a real file object; there is no placement-only entry. Writers emit THIS key; reads fold the retired spellings via projectPlacementOf.`,
        ),
      directory: lazyZod
        .record(
          dataOperationEngineMessageSchema2,
          dataOperationEngineSubtabOfSchema,
        )
        .optional()
        .describe(
          `RETIRED SPELLING of the tabs map (the Jul 2026 noun rename). Stored rows are never rewritten, so pre-rename projects carry placements here forever; it still validates when present, reads fold it through projectTabsOf (per-key, current key wins), and NO live writer emits it. The ONE sanctioned touch is the anti-strand paired DELETE riding a current-key write of the same id (RoomView's setFilePlacement/dropFilePlacement precedent — 'ensure absent', same id space); nothing ever sets it.`,
        ),
      defaultVersionId: lazyZod
        .string()
        .nullable()
        .optional()
        .describe(
          `The publish pointer (page 16 row 2) — a version id, null/absent = unpublished. Pointer HONESTY (containment + lifecycle) is the live door's publish-pointer law, not schema law.`,
        ),
      thumbnails: lazyZod
        .partialRecord(
          lazyZod.enum([`light`, `dark`]),
          dataOperationEngineDescribeSchema2,
        )
        .optional()
        .describe(
          "The lobby-card thumbnails, id-addressed (bongo#4193): a partial map of theme → blob-noun ref (`blob/<id>`). ABSENT / empty = the card renders its gradient placeholder (zero-migration: projects written before this reshape carry no key and read as {}, regenerating forward on the next content write / on serve). HOST-WRITTEN by src/api/routes/v3thumb.ts — generateThumb captures the primary file to a PNG, POSTs the bytes (POST /api/blob → sha), MINTS an ACL-gated blob noun in this project, and patches `blob/<id>` into this map. SERVED via the project-read-gated /api/v3/project/:id/thumb route (roomCanRead → resolveBlobBytes), never sha-as-capability. `dark` falls back to `light` when absent (a mode-agnostic primary, or a pre-dark-variant capture). Values validate against zBlobRef so a malformed ref refuses at the live door rather than becoming a broken <img>.",
        ),
      assistant: dataOperationEngineAutoRespondSchema
        .optional()
        .describe(
          'Per-project settings for the in-app assistant. Today one key: autoRespond — WHEN a human comment wakes Claude (src/api/routes/v3commentWake.ts kickCommentTurn, the one funnel every wake arm passes through). ABSENT = "all" (the shipped behaviour: @claude, re-engaged threads, and un-addressed roots on agent-touched docs all wake). STRICT sub-object: unknown keys refuse, so the MCP path-scope on `assistant` (lattice.ts McpExposure.project.update) opens exactly the ruled vocabulary and nothing wider. FOLD NOTE (jsonShapes FOLD WARNING — project is fold-strict): NEW vocabulary with no committed population — no writer ever emitted the key and both exposure lanes denied it (mcp-exposure) until this registration — the same posture `thumbnails` landed under (bongo#4193); growing the sub-object later is a widening (fold-safe).',
        ),
    })
    .catchall(lazyZod.json())
    .superRefine(
      (
        dataOperationEngineSourceSchema4?: unknown,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (
          typeof dataOperationEngineSourceSchema4 == `object` &&
          dataOperationEngineSourceSchema4 &&
          Object.getPrototypeOf(dataOperationEngineSourceSchema4) !==
            Object.prototype
        ) {
          options.addIssue({
            code: `custom`,
            message: `prototype-polluting key refused (own __proto__ at the value root)`,
          });
        }
      },
    )
    .describe(
      `A project value: the ruled placement maps + the room-plane fields, LOOSE over everything else (lifecycle-flag preservation + the committed population — see the header). Ruled keys validate; unknown keys pass through (cataloged as JSON via the catchall — the wire's whole domain); an own __proto__ at the root refuses (proto-safety refine).`,
    ));
  (dataOperationEngineEnumSchema = lazyZod
    .strictObject({
      type: lazyZod
        .enum([`string`, `number`, `bool`, `json`])
        .describe(
          `The parameter's declared type word. LIVE LAW (the args gavel — room.ts routineParamDeclDeny): "string" is the ONLY type a changed declaration may spell — a routine parameter is {type:"string"} or {type:"string", enum:[...]}, and args always arrive as strings (the body parses what it needs). The legacy words (number, bool, json) stay in the SHAPE so stored rows keep folding; writing one refuses at the live door with the two-form teach.`,
        ),
      enum: lazyZod
        .array(lazyZod.string())
        .optional()
        .describe(
          `The string constraint's option NAMES — the second (and last) legal declaration form, {type:"string", enum:[...]}: an enum CONSTRAINS the one string type, it is not a second type. Non-empty (the live law refuses an empty list — it admits nothing). Values canonicalize as the NAME, never a position/index (fail-to-absent over silently-re-point — src/lib/routineArgs.ts rule 7).`,
        ),
      required: lazyZod
        .boolean()
        .optional()
        .describe(
          `LEGACY island field — dead vocabulary under the no-defaults/no-optional posture (every declared parameter is required and caller-supplied). Stored rows keep folding; a CHANGED declaration carrying it refuses at the live door (routineParamDeclDeny).`,
        ),
      description: lazyZod
        .string()
        .optional()
        .describe(`What the argument means — shown to callers and models.`),
    })
    .describe(`One declared parameter.`));
  (dataOperationEngineMessageSchema3 = lazyZod
    .string()
    .min(1)
    .refine(
      (
        dataOperationEngineMessageSchema32?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        dataOperationEngineMessageSchema32 !== `__proto__` &&
        dataOperationEngineMessageSchema32 !== `constructor` &&
        dataOperationEngineMessageSchema32 !== `prototype` &&
        dataOperationEngineMessageSchema32 !== `uploadUrl`,
      {
        message: `reserved or prototype-polluting key`,
      },
    )
    .describe(
      `A parameter's name — what defaults and fire-time args are keyed by. Never a prototype-polluting name, and never the door-wide reserved credential key uploadUrl.`,
    ));
  (dataOperationEngineDescribeSchema12 = lazyZod
    .record(dataOperationEngineMessageSchema3, dataOperationEngineEnumSchema)
    .optional()
    .describe(
      `Declared parameters, keyed by name — a fire's args are validated against these (room.ts runArgsDeny: args are a flat Record<string,string>, strict — non-strings refuse at the boundary, never coerce; src/lib/routineArgs.ts is the one judgment). Absent = takes no args (string args pass through — the stated default).`,
    ));
  (dataOperationEngineKindSchema3 = lazyZod
    .strictObject({
      kind: lazyZod
        .literal(`prompt`)
        .describe(`Instructions the executor's resident follows.`),
      body: lazyZod
        .string()
        .describe(
          `Plain-language instructions, executed under the resident's OWN restricted tool set — steps about the project's files and runnables, never tool names.`,
        ),
      params: dataOperationEngineDescribeSchema12,
    })
    .describe(
      `A prompt runnable. Its runs get a terminal respond tool (the respond contract rides the run unit).`,
    ));
  (dataOperationEngineConnectorSchema = lazyZod
    .strictObject({
      connector: lazyZod
        .string()
        .optional()
        .describe(
          "The connector ref the tool lives on (e.g. `connector/<id>`); absent OR empty = a house tool (the r2 loader-parity ruling: connectorToolCallRef treats '' as no connector on every seat — deliberately NOT min(1); a length floor here would refuse the routine road's ruled house spelling).",
        ),
      tool: lazyZod
        .string()
        .describe(
          `The tool to invoke, by name. NO length floor HERE: this schema is embedded in zRoutineValue, which is fold-strict (jsonShapes.ts — valueFor re-judges durable rows at boot), so a floor added here would retroactively refuse historical routine rows and brick their rooms. The run noun tightens tool to min(1) on ITS sub-arm (objects/run.ts) — homed there when run was fold-tolerant (the door-consistency half of the bughunter 🟡); run is fold-strict since the Aug-2 reshape (verified-empty population), so the split's surviving rationale is ROUTINE's real committed population alone.`,
        ),
    })
    .describe(
      `Which tool — {connector?, tool}. The call's arguments ride the consumer's own args word, never this body.`,
    ));
  (dataOperationEngineKindSchema4 = lazyZod
    .strictObject({
      kind: lazyZod.literal(`toolCall`).describe(`One tool invocation.`),
      body: dataOperationEngineConnectorSchema.describe(
        "Which tool. The CALL's arguments are not stored here — they arrive as args (fire-time) over `defaults` (routine-time), validated against `params`.",
      ),
      params: dataOperationEngineDescribeSchema12,
      binding: lazyZod
        .string()
        .regex(/^[0-9a-f]{64}$/, `binding is a lowercase sha-256 hex digest`)
        .optional()
        .describe(
          `THE CONNECTOR IDENTITY BINDING, routine-kept half — the DIRECT road's run.binding doctrine verbatim (objects/run.ts): connectorIdentityHash({id, url, curated}) of the resolved connector registration, stamped by the birth ingress (the MCP door resolves the ref on the CREATOR's own credentials at routine creation — mcpVerbs stampRoutineConnectorBinding) or supplied by the caller — SELF-ATTESTED either way, and safe that way: the birth-road consent (routineConsent.ts applyConsentDiffs) folds it as the establishment's connectorIdentity, and fires re-resolve the consented ref on the credential principal's own token and require hash equality BEFORE any call (routineExec/bind.ts, the identity wall) — a wrong or forged value can only REFUSE, never redirect. ABSENT = no birth-road consent for a connector toolCall (fail closed; the routine stages + approves exactly as before — the approve dialog resolves identity itself). Consent-PLANE by position (inside runnable): any edit voids standing consent, exactly as a re-bound counterparty should.`,
        ),
    })
    .describe(`A toolCall runnable: one fixed tool, argued at fire time.`));
  (dataOperationEngineKindSchema5 = lazyZod
    .strictObject({
      kind: lazyZod.literal(`code`).describe(`Source for the sandboxed runner.`),
      body: lazyZod
        .string()
        .describe(
          `The code to run (sandboxed by the runner — the credential boundary is the runner's, never the room's).`,
        ),
      params: dataOperationEngineDescribeSchema12,
    })
    .describe(`A code runnable.`));
  lazyZod
    .discriminatedUnion(`kind`, [
      dataOperationEngineKindSchema3,
      dataOperationEngineKindSchema4,
      dataOperationEngineKindSchema5,
    ])
    .describe(
      "WHAT to run — the FULL list: prompt (instructions) | toolCall ({connector?, tool}) | code (source), each with declared `params`. THE one discriminator for runnable behavior (routine keeps one; a run performs one). House arms (suite, fileOp) are a future seam — they join HERE, direct-birth-only.",
    );
  (dataOperationEngineKindSchema6 = lazyZod
    .discriminatedUnion(`kind`, [
      dataOperationEngineKindSchema3,
      dataOperationEngineKindSchema4,
      dataOperationEngineKindSchema5,
    ])
    .describe(
      `The ROUTINABLE subset of runnables (ROUTINABLE_KINDS: prompt | toolCall | code) — what a routine may keep. House kinds (suite, fileOp) are direct-birth-only unless ruled into the list; a routine carrying one refuses value-shape.`,
    ));
  (resolveDataOperationEngineMessage = (
    dataOperationEngineMessage?: Dynamic,
    ..._extraArguments: unknown[]
  ) => ({
    message: `${dataOperationEngineMessage} must not contain the reserved '${DataEnumsAndValidationMessage}' separator (display grammar — outputTargetLabel's injectivity)`,
  }));
  (dataOperationEngineKindSchema7 = lazyZod
    .discriminatedUnion(`kind`, [
      lazyZod
        .strictObject({
          kind: lazyZod
            .literal(`file`)
            .describe(`The routine writes a project file.`),
          path: lazyZod
            .string()
            .min(1)
            .regex(/\S/, `path must carry a non-whitespace character`)
            .describe("The file's project path (e.g. `pages/fish-facts.md`)."),
        })
        .describe(`A declared FILE output — path-addressed.`),
      lazyZod
        .strictObject({
          kind: lazyZod
            .literal(`table`)
            .describe(
              `RETIRED SPELLING (database-node, Jul 23) — stays parseable for routines that declared it historically (fold-strict value: deleting the arm bricks those rooms); NEW declarations refuse at the door (routineOutputsDeny) with the teach naming the database arm.`,
            ),
          table: lazyZod
            .string()
            .min(1)
            .regex(/\S/, `table must carry a non-whitespace character`)
            .describe(`The table's name (historical rows only).`),
        })
        .describe(
          `A RETIRED table output — parse law for history; the door refuses new declarations.`,
        ),
      lazyZod
        .strictObject({
          kind: lazyZod
            .literal(`database`)
            .describe(`The routine feeds a database (database-node §2, Jul 23).`),
          id: lazyZod
            .string()
            .min(1)
            .regex(/\S/, `id must carry a non-whitespace character`)
            .describe(
              `The database's MINTED id (⚖️7a — id-addressed, never a name; the id-only gavel). Joins LID_POSITIONS so a routine and its database are birthable in ONE batch. The run-settle insert targets this database by-ref when the run's explicit result op fires.`,
            ),
        })
        .describe(
          `A declared DATABASE output — id-addressed (⚖️7a). Settle inserts by-ref; keyless targets draw an ack WARNING (append-forever). NOTE the routing model: unlike file/tool effects (matched per-target by outputTargetKey), database outputs are BY-SOURCE-WHOLE-RESULT — every declared database receives the run's whole decoded result (there is no per-target adapter seat; the lens is the op's/run's, identical across targets).`,
        ),
      lazyZod
        .strictObject({
          kind: lazyZod
            .literal(`tool`)
            .describe(`The routine executes (or stages) a tool call.`),
          connector: lazyZod
            .string()
            .min(1)
            .regex(/\S/, `connector must carry a non-whitespace character`)
            .refine(
              (
                dataOperationEngineKindSchema72?: Dynamic,
                ..._extraArguments: unknown[]
              ) =>
                !dataOperationEngineKindSchema72.includes(
                  DataEnumsAndValidationMessage,
                ),
              resolveDataOperationEngineMessage(`connector`),
            )
            .optional()
            .describe(
              "The connector ref the tool lives on (the toolCall body's own spelling — `connector/<id>`); absent = a house tool. Present ⇒ non-blank: an EMPTY connector is not a third address between present and absent.",
            ),
          tool: lazyZod
            .string()
            .min(1)
            .regex(/\S/, `tool must carry a non-whitespace character`)
            .refine(
              (
                dataOperationEngineKindSchema72?: Dynamic,
                ..._extraArguments: unknown[]
              ) =>
                !dataOperationEngineKindSchema72.includes(
                  DataEnumsAndValidationMessage,
                ),
              resolveDataOperationEngineMessage(`tool`),
            )
            .describe(`The tool, by name.`),
        })
        .describe(
          `A declared TOOL output — {connector?, tool}, the toolCall body's address grammar.`,
        ),
    ])
    .describe(
      `One declared output target: {kind:'file', path} | {kind:'table', table} | {kind:'tool', connector?, tool} — an ADDRESS the routine's runs write to, matched against run-result op entries by target (outputTargetKey), never by index.`,
    ));
  (dataOperationEngineSourceSchema2 = lazyZod
    .strictObject({
      source: dataOperationEngineSurfaceSchema
        .optional()
        .describe(
          `WHICH CONVERSATION DEFINED THIS ROUTINE — the shared source fragment (objects/source.ts: {surface, id, attested}), testimony only (the read rule: actor = who, vouched, feeds permissions; source = where-from, claimed, feeds nothing — zero authority, no law consults it). CREATION-ONLY: routines have no staged phase, so origin is a birth fact — sourceBirthFreezeDeny (runLaw.ts) refuses any post-birth write that adds or re-labels it (byte-held round-trips ride; dropping the field is legal, the immutable-or-removable posture). attested:true is server-minted only (sourceAttestDeny). The consent surfaces render it — the approve dialog's routine-origin chip is the payoff: the approver sees WHERE the routine she is arming was defined. ROLLBACK NOTE, stated honestly (routine is fold-STRICT in jsonShapes, unlike the other carriers): a routine row committed WITH this key cannot fold under the pre-adoption deploy's strictObject — rolling the binary back across this widening bricks that room's boot. Same class as every additive routine field (summary's own precedent); the codebase's posture is roll-FORWARD across fold-schema widenings.`,
        ),
      name: lazyZod
        .string()
        .describe(
          `The routine's handle — what lists and runs display. UNIQUE per container across data sources (database + routine), compared case- and whitespace-insensitively (name-taken — door law, room.ts dataSourceNameDeny: names are unique across every data source): a create or rename onto a name a sibling data source already uses refuses, so a human is shown ONE chip per name and clicks the right one. STILL DISPLAY-ONLY, NOT a v3 resolution key — uniqueness is for CLICKING, not looking up (not used for any reference, only for clicking): the id-only gavel stands, everything resolves by minted id, and no name→id lane is added here. THE ONE EXISTING NAME LOOKUP is the v1 wire's :name address — a pre-existing v1-PARITY legacy path, NOT this rule promoting the v3 name to a key; uniqueness makes that legacy address unambiguous but does not widen it, and no NEW name→id path may be added (tests/database-name-uniqueness.test.ts pins the absence).`,
        ),
      runId: dataContentAndReferencesDescribeSchema
        .optional()
        .describe(
          `THE PROMOTED FIRST RUN (W9 — ad-hoc run → routine promotion: the explore-until-right → keep-it loop): the ROOM-MINTED id of an EXISTING run that IS this routine's first run — displayed in its run list, served as latest-successful (so a widget created beside this routine has data at birth), and NEVER re-executed (promotion never touches the run's row — road (b): the serve seam is collectLinkedRuns/v3serveRoutines.ts — and a terminal row is unclaimable by construction: the poller selects status 'pending' only). CREATE-ONLY, FULLY FROZEN: the promotion birth law (room.ts routinePromotionDeny) refuses a birth whose run is missing-or-unreadable ('routine-run' — ONE word, indistinguishable by anti-oracle design), readable-but-not-successfully-terminal ('routine-run-not-done'), or born on a routine that DECLARES params ('routine-run-params': promotion is for PARAMETERLESS routines today; a parameterless routine has exactly one result key by construction, so its promoted run is always reachable and the keying question cannot arise); post-birth adds, CHANGES, and DROPS all refuse 'run-id-frozen' (runLaw.ts runIdBirthFreezeDeny — stricter than source's immutable-or-removable posture because this field FEEDS SERVING: a dropped runId would silently blank the routine's first run from every serve surface; the editor lane never trips it — patchRoutineThroughDoor merges over the fresh fold, so untouched fields ride byte-held). CONSENT-PLANE-EXTERNAL (tripwire pin in tests/routine-outputs.test.ts): serving-only testimony of which existing, already-caller-readable result displays first — it never feeds execution (fires are governed by runnable/crondef/defaults; membership moves only by ruling). SINGLE-PROMOTION IS NOT ENFORCED (two routines may cite one run). NOT a $lid position, deliberately: a run born in the same batch cannot be terminal-done, so promoting it would always refuse — the explore loop's run pre-exists by definition. A DANGLING pointer (the run deleted later) serves nothing — the run list and latest-successful simply no longer include it (fail-safe, disclosed). THE ID-ON-THE-VALUE RESIDUAL (security-bughunter 🛡️ r2 — disclosed, deliberately not redacted): the routine VALUE carries this minted id verbatim, and values serve WHOLE on the door read-ack and room broadcasts — so a project-admitted reader denied on a stricter suite can learn a promoted suite-born run's id, existence, and done-ness from the routine row, though never its content (every run read/metadata/byte route stays independently ACL'd, and the serve projections mask the run itself per reader — this is an opaque-id existence bit, not data access). Redaction is the worse horn: per-reader field-stripping on value-whole surfaces would make a read→edit→re-send round-trip DROP the field and trip 'run-id-frozen' for exactly the readers it redacts (the whole-value editor contract), and the bit is spent by the PROMOTER's own choice to cite a stricter-container run on a wider-visible routine — the same class as pasting that id into a project file. The road for promoters who need the run invisible: birth the routine in the same stricter container (routines CAN be suite-born — the dismiss guard's per-routine birth-container tests pin it). ROLLBACK NOTE (the source field's class — routine is fold-strict in jsonShapes): a routine row committed WITH this key cannot fold under a pre-adoption deploy's strictObject — roll-forward posture.`,
        ),
      summary: lazyZod
        .string()
        .optional()
        .describe(`One-line description for lists (v3 addition — v1's summary).`),
      runnable: dataOperationEngineKindSchema6,
      adapter: DataContentAndReferencesHasHeader.optional().describe(
        `HOW TO READ THIS ROUTINE'S ANSWERS — a SIBLING of the runnable, never a field inside it: the adapter is KIND-AGNOSTIC, a lens over the stored answer whatever produced it, so a code routine returning an envelope and a toolCall routine returning XML declare it at the SAME position in the same vocabulary. THE LAWS it carries: verbatim RAW is always stored (the run result IS the original — the lens never replaces the record, which is exactly why correcting a mis-declared adapter costs NO re-execution); loud-on-miss (a lens that finds nothing FAILS, naming the offending path, rather than falling back to a heuristic or a silently empty table). ABSENT = the answer is consumed as it stands (the array law — a resolved source value must already BE an array of row objects). This field is what DELETED the magic {rows:[…]} envelope unwrap and the connector-slug decode branches: {kind:'json-rows', rows:'rows'} says explicitly what the unwrap used to guess, and {kind:'xml-rows'} reads ANY <row><field name=…> document — BigQuery included — with no connector-specific code left anywhere. CONSENT-PLANE-EXTERNAL (tripwire above); ROUTINE_EDIT_PLANE member (editor-visible content — a concurrent adapter edit must 409 a stale save); PROMOTION-CARRIED (create routine {runId, adapter?} — the runnable derives from the run, the promoter supplies only overrides). ROLLBACK NOTE (the source/runId class — routine is fold-strict in jsonShapes): a routine row committed WITH this key cannot fold under a pre-adoption deploy's strictObject — roll-forward posture.`,
      ),
      outputs: lazyZod
        .array(dataOperationEngineKindSchema7)
        .min(1)
        .optional()
        .describe(
          `THE DECLARED OUTPUTS (the take-2 law): the list of targets this routine's runs write to — {kind:'file', path} | {kind:'table', table} | {kind:'tool', connector?, tool} (the target vocabulary). CONSENT-PLANE MEMBER by the gavel's own words ('Editing a routine's runnable, outputs, or schedule re-requires consent') — routineConsent.ROUTINE_CONSENT_PLANE carries it, so any edit here voids standing consent, and the approve surfaces render the declared list (the approver sees WHAT the routine writes before arming it). Correspondence to run-result op entries is BY TARGET (outputTargetKey), never by index. ARRAY ORDER IS MEANING (deliberate): the declaration is an ORDERED list — canonical() preserves array order, so REORDERING the same targets IS a consent-plane change and VOIDS standing consent, and reordering back is a second change that stays void (the shadow-flip family: byte-identical-to-original never re-arms). Order is what the approver reviewed and what the surfaces render; a declaration is not a set. ABSENT = declares nothing (the pre-gavel population and declaration-free routines); EMPTY REFUSES at the shape (min(1) — the ids-field discipline: an empty declaration is a spelling error, not a declaration of nothing). ROLLBACK NOTE (the source field's class, routine is fold-strict): rows committed with this key cannot fold under a pre-adoption deploy — roll-forward posture.`,
        ),
      outputSchema: lazyZod
        .record(lazyZod.string(), lazyZod.json())
        .optional()
        .describe(
          "OPTIONAL output schema (a JSON Schema object — MCP's outputSchema is the model): validates the run result's payload `object` entries, including rejecting a prompt run's output call that doesn't conform; platform-emitted op entries are EXEMPT (the gaveled take-2 exemption). Patterned on `summary`: CONSENT-PLANE-EXTERNAL with the tripwire rider above (Jul 13 ruling) — it describes output for readers and never feeds execution. Enforcement is the routine-executor unit's (deferred, named in the PR body); storing it here is the declaration seat.",
        ),
      inputSchema: lazyZod
        .record(lazyZod.string(), lazyZod.json())
        .optional()
        .describe(
          "OPTIONAL input schema (a JSON Schema object over a run's params — v1's `fn.parameters`, the declaration seat): a run birth referencing this routine whose EFFECTIVE params ({...defaults, ...params} — what the executor runs; absent/`{}` params judge the defaults themselves) fail it REFUSES at the door before staging (deny word 'routine-params' — room.ts routineInputSchemaDeny; the v1 validateFnParams parity). Absent = no validation. `pattern`/`patternProperties` keywords are REFUSED at validation (v1's ReDoS screen, routineParams.ts — use minLength/enum/type instead), and so is ANY `$ref` (no rewrite exists on this plane — inline the types). CONSENT-PLANE-EXTERNAL with the tripwire rider above — a narrowing birth filter, never execution semantics; the run-with-parameters form renders its top-level properties (string/number/enum/boolean, v1-style).",
        ),
      crondef: lazyZod
        .strictObject({
          rrule: lazyZod
            .string()
            .describe(
              "RFC 5545 RRULE string (e.g. `FREQ=DAILY;BYHOUR=6;BYMINUTE=0`) — when the routine fires. The LIVE door refuses a CHANGED rule outside the scheduler's supported subset (the routine-crondef commit-stage law, room.ts — deliberately NOT enforced here: this shape also judges the fold, and stored pre-law rules must keep loading). A grandfathered stored rule fails CLOSED at fire time: skipped + logged, never a guessed fire time.",
            ),
        })
        .optional()
        .describe(
          "THE TRIGGER. Present = the host scheduler maintains nextRunTs and fires the routine; absent = on-demand only. (Supersedes the v1 `schedule` spelling — the serve fold projects that wire shape from here.)",
        ),
      defaults: lazyZod
        .record(dataOperationEngineMessageSchema3, lazyZod.json())
        .optional()
        .describe(
          `Default args, keyed by the runnable's declared params — a fire's args land OVER these (fire wins per key).`,
        ),
      nextRunTs: lazyZod
        .string()
        .regex(
          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z$/,
          `nextRunTs must be a UTC ISO instant (Z-suffixed)`,
        )
        .optional()
        .describe(
          `SANCTIONED MATERIALIZATION: the scheduler's index — derivable from crondef + last fire, materialized for the where-nextRunTs<=now query. HOST-MAINTAINED, never client truth: initialized when crondef is present, advanced ATOMICALLY with each fire (one batch: create run + patch this); downtime policy is skip-missed (the advance op is testimony of the decision). Absent = not yet initialized (crondef present) or on-demand (crondef absent).`,
        ),
      paused: lazyZod
        .literal(true)
        .optional()
        .describe(
          "Explicit pause: true = the scheduler neither initializes nor fires this routine. ABSENCE is the only not-paused spelling (no `paused: false`) — so nextRunTs absence stays unambiguous (= awaiting initialization, never = paused).",
        ),
    })
    .describe(
      "A routine: a NAMED, KEPT runnable + schedule — {source?, name, runId?, summary?, runnable, adapter?, outputs?, outputSchema?, inputSchema?, crondef?, defaults?, nextRunTs?, paused?}. WHAT runs is discriminated on the RUNNABLE (src/room/runnable.ts), never on the routine (the kind-on-routine union is dead by ruling, zero backcompat). `runnable` speaks the ROUTINABLE subset (ROUTINABLE_KINDS); house kinds are direct-birth-only and refuse value-shape here. Approval/consent state is STAGE-lane truth, never a field here. Supersedes v1 `define_function` (deprecated Jul 6).",
    ));
  (dataOperationEngineMessageSchema4 = lazyZod
    .string()
    .min(1)
    .refine(
      (
        dataOperationEngineMessageSchema42?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        dataOperationEngineMessageSchema42 !== `__proto__` &&
        dataOperationEngineMessageSchema42 !== `constructor` &&
        dataOperationEngineMessageSchema42 !== `prototype` &&
        dataOperationEngineMessageSchema42 !== `uploadUrl`,
      {
        message: `reserved or prototype-polluting key`,
      },
    )
    .describe(
      `A column's key — what row cells are keyed by. Unique within the table (enforced by the columns array's uniqueness refine). Never a prototype-polluting name, and never the door-wide reserved credential key uploadUrl (its cells would be redact-stripped before any gate).`,
    ));
  (dataOperationEngineKindSchema8 = lazyZod
    .discriminatedUnion(`kind`, [
      lazyZod
        .strictObject({
          kind: lazyZod.literal(`literal`),
          type: lazyZod
            .enum([`string`, `number`, `bool`, `date`])
            .describe(
              `The cell's primitive: string/number/bool are the JSON primitives; date is a CALENDAR DATE string, canonical YYYY-MM-DD (the date-unification ruling — a date is a day, not a moment; genuine timestamps are string cells or a room-stamped instant, never this type). NEW authored writes (the by-rows door) must be YYYY-MM-DD (isCanonicalDateCell); the fold and by-source CSV fitting stay tolerant of a legacy full ISO datetime (isValidDateCell) so committed history and imports keep parsing — rules tighten at the write door, not at replay.`,
            ),
        })
        .describe(`A plain typed cell.`),
      lazyZod
        .strictObject({
          kind: lazyZod.literal(`enum`),
          enum: lazyZod
            .string()
            .describe(
              `The enum OBJECT's id (ref enum/<id>) this column draws its options from. The cell VALUE is the INDEX into that enum's options array — the door refuses an index that doesn't exist or is disabled (enum-index). The enum object must exist by the time rows are written.`,
            ),
        })
        .describe(
          `A cell constrained to one of a shared enum's options, stored as the option INDEX — one list feeds both planes (page 15 D8: table cells and prose chips store the same index).`,
        ),
    ])
    .describe(
      `What a column holds — literal primitive or enum index. (The utterance COLUMN TYPE is REMOVED; corpus-verified zero committed columns before removal; it returns through the gate if needed. The generic json kind is tracker row 2, P2 — absent until its unit lands.)`,
    ));
  lazyZod
    .strictObject({
      body: lazyZod.string().describe(`The comment text.`),
      mentions: lazyZod
        .array(lazyZod.string())
        .optional()
        .describe(
          `Principals @-mentioned in the body — structural, so mentions are queryable and notifiable without parsing prose (the v1 regex-extraction pathology has no v3 existence).`,
        ),
    })
    .describe(`A rich comment-ish cell value: text plus structural @-mentions.`);
  (dataOperationEngineColumnsSchema = lazyZod
    .strictObject({
      name: lazyZod
        .string()
        .describe(
          `Human handle for the table. FROZEN while rows exist (the name is frozen too — the door's columns-append-only law, tracker row 7).`,
        ),
      columns: lazyZod
        .array(
          lazyZod.strictObject({
            key: dataOperationEngineMessageSchema4,
            type: dataOperationEngineKindSchema8,
            required: lazyZod
              .boolean()
              .describe(
                `True = every row must carry this cell (door-enforced, column-required).`,
              ),
          }),
        )
        .superRefine(
          (
            dataOperationEngineColumnsSchema3?: Dynamic,
            options?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            let uniqueItems: Dynamic = new (Set as Dynamic)();
            for (let event of dataOperationEngineColumnsSchema3 as Dynamic) {
              if (uniqueItems.has(event.key)) {
                options.addIssue({
                  code: `custom`,
                  message: `duplicate column key: ` + event.key,
                });
              }
              uniqueItems.add(event.key);
            }
          },
        )
        .describe(
          `The row schema: rows are door-validated against exactly these columns — unknown keys refused (column-unknown), required enforced (column-required), literal types checked (column-type), enum indices resolved and non-disabled (enum-index). APPEND-ONLY while rows exist (columns-append-only, tracker row 7).`,
        ),
    })
    .describe(
      `A table: a name and the typed column schema its rows must satisfy. The schema FOR its rows (page 15 D1); containment-only — no parent edge (row 3). Rows home in the table via the row value's parent edge; table deletion is refused while rows exist (rows-exist, row 5).`,
    ));
  (dataOperationEngineParentSchema3 = lazyZod
    .strictObject({
      parent: lazyZod
        .strictObject({
          object: lazyZod
            .literal(`table`)
            .describe(`A row homes in a TABLE — never any other noun.`),
          id: dataContentAndReferencesDescribeSchema,
        })
        .describe(
          `The HOME table — the universal parent edge (row → table). Must exist at write time (door reason parent); must be born in the row's own container (the blob-parent containment precedent); a table with surviving rows cannot be deleted (rows-exist).`,
        ),
      cells: lazyZod
        .record(dataOperationEngineMessageSchema4, lazyZod.json())
        .describe(
          `Column key → cell value, validated AT THE DOOR against the home table's columns: unknown keys refused (column-unknown), required columns enforced (column-required), literal types checked (column-type), and an enum column's value is the INDEX into its enum's options array — it must exist and must not be disabled (enum-index). Cell-key hygiene, mechanism by name: a constructor/prototype cell key is refused by zColumnKey (value-shape, fold included); an own __proto__ cell key never reaches the key schema — zod's record parser drops it (stripped, never committed); an uploadUrl cell key never reaches it either — the door's redact sweep deep-strips that reserved key from every intent payload before any gate (which is exactly why DECLARING an uploadUrl column is refused at the table shape: its cells could only ever vanish silently). Nothing polluting or reserved commits, by three different doors.`,
        ),
    })
    .describe(
      `One table row: its home table plus the cells. The row's true schema is its TABLE's columns — enforced at the door, not here (this zod can't see the table; page 15 D5).`,
    ));
  (dataOperationEngineCcrMessagesValues = [`ccr`, `messages`]);
  (resolveDataOperationEngineSize = (
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ) => new (Set as Dynamic)(items).size === items.length);
  (resolveDataOperationEngineReplace = (
    dataOperationEngineReplace?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    dataOperationEngineReplace
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, `-`)
      .replace(/^-+|-+$/g, ``));
  (DataOperationEngineStyles = `[a-z0-9][a-z0-9-]{0,63}`);
  (DataOperationEngineState6 = RegExp(`^${DataOperationEngineStyles}$`));
  (DataOperationEnginePath = [
    {
      path: `/model`,
      tag: `m`,
      values: lazyZod.string().min(1),
      slug: (
        dataOperationEnginePath?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => resolveDataOperationEngineReplace(dataOperationEnginePath),
      pinnedDefault: `first-declared`,
      supersedes: [`models`, `model`],
      legacyKind: `model`,
    },
    {
      path: `/harness`,
      tag: `h`,
      values: lazyZod.enum(dataOperationEngineCcrMessagesValues),
      slug: (
        dataOperationEnginePath?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => dataOperationEnginePath,
      pinnedDefault: `messages`,
      supersedes: [`harness`],
      legacyKind: `harness`,
      legacyCoordRead: ``,
    },
  ]);
  (DataOperationEnginePath2 = DataOperationEnginePath.map(
    (
      DataOperationEnginePath7?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => DataOperationEnginePath7.path,
  ));
  (dataOperationEngineMap = new (Map as Dynamic)(
    DataOperationEnginePath.map(
      (
        DataOperationEnginePath7?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => [DataOperationEnginePath7.path, DataOperationEnginePath7],
    ),
  ));
  new (Map as Dynamic)(
    DataOperationEnginePath.map(
      (
        DataOperationEnginePath7?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => [DataOperationEnginePath7.tag, DataOperationEnginePath7],
    ),
  );
  new (Map as Dynamic)(
    DataOperationEnginePath.filter(
      (DataOperationEnginePath7?: Dynamic, ..._extraArguments: unknown[]) =>
        DataOperationEnginePath7.legacyKind !== undefined,
    ).map(
      (
        filteredDataOperationEnginePath?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => [
        filteredDataOperationEnginePath.legacyKind,
        filteredDataOperationEnginePath,
      ],
    ),
  );
  (getDataOperationEngineValue2 = (
    dataOperationEngineValue2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => dataOperationEngineMap.get(dataOperationEngineValue2));
  RegExp(
    `^~(${DataOperationEngineStyles})~(${dataOperationEngineCcrMessagesValues.join(`|`)})~r([1-9])$`,
  );
  (dataOperationEngineDescribeSchema13 = lazyZod
    .number()
    .int()
    .min(1)
    .max(5)
    .describe(
      "How many times each (spec × combo) cell runs — an integer 1..5; DEFAULT 1 when absent. Each child stamps its 1-based `rollout` ordinal.",
    ));
  (dataOperationEngineDescribeSchema14 = lazyZod
    .number()
    .int()
    .min(1)
    .max(3)
    .describe(
      `How many REPLACEMENT runs a red session cell may get after its first attempt — retries count RE-runs, never attempts (total attempts = maxRetries + 1); an integer 1..3, DEFAULT 2 when absent. SUITE-LEVEL orchestration, never a run property (a spec run is always a single try — a settled run is never re-run; a retry is ANOTHER run of the same cell). Applies to session-cell recording/execution reds: instrument reds retry then stand as gaps; test-fail reds retry then commit the last red take; the FIRST green take ends the cell early. Expected-fail fixtures are exempt from retry-to-green (their inverted gate already defines success as a faithful red). A SCALAR, never an axis: multiplies nothing, joins no cell coordinate, never surfaces in a film name.`,
    ));
  (dataOperationEnginePathSchema2 = lazyZod
    .strictObject({
      path: lazyZod
        .string()
        .min(2)
        .max(200)
        .describe(
          `A JSON pointer into the spec-run value — THE axis identity (rail label, coordinate key, refusal vocabulary, sanction-table key). Must be on the sanction table.`,
        ),
      values: lazyZod
        .array(lazyZod.string().min(1))
        .min(1)
        .max(16)
        .refine(resolveDataOperationEngineSize, {
          message: `parameter values must be unique`,
        })
        .describe(
          "The axis values, patched over the base run value at `path` — one child per value per combo per rollout (a scalar-class path carries exactly one). Narrowed per sanction-table entry.",
        ),
    })
    .describe(
      `One generalized axis: {path, values} (the legacy {kind, values} spelling parses as sugar for the /model and /harness paths).`,
    ));
  (dataOperationEngineKindSchema9 = lazyZod
    .array(
      lazyZod.union([
        lazyZod.strictObject({
          kind: lazyZod
            .literal(`model`)
            .describe(
              `The MODEL axis — one child per value per spec per harness per rollout.`,
            ),
          values: lazyZod
            .array(lazyZod.string().min(1))
            .min(1)
            .max(16)
            .refine(resolveDataOperationEngineSize, {
              message: `parameter values must be unique`,
            })
            .superRefine(
              (
                dataOperationEngineKindSchema92?: Dynamic,
                options?: Dynamic,
                ..._extraArguments: unknown[]
              ): undefined => {
                let lookup: Dynamic = new (Map as Dynamic)();
                for (let dataOperationEngineKindSchema9Result of dataOperationEngineKindSchema92 as Dynamic) {
                  let dataOperationEngineReplace: Dynamic =
                    resolveDataOperationEngineReplace(
                      dataOperationEngineKindSchema9Result,
                    );
                  if (
                    dataOperationEngineReplace.length === 0 ||
                    dataOperationEngineReplace.length > 64
                  ) {
                    options.addIssue({
                      code: `custom`,
                      message: `model value ${JSON.stringify(dataOperationEngineKindSchema9Result)} slugs to ${dataOperationEngineReplace.length === 0 ? `an empty string` : `${String(dataOperationEngineReplace.length)} chars`} — the film-address grammar admits 1..64 (modelSlug: lowercase, non-[a-z0-9] runs collapse to '-')`,
                    });
                    continue;
                  }
                  let lookupEntry: Dynamic = lookup.get(
                    dataOperationEngineReplace,
                  );
                  if (lookupEntry === undefined) {
                    lookup.set(
                      dataOperationEngineReplace,
                      dataOperationEngineKindSchema9Result,
                    );
                  } else {
                    options.addIssue({
                      code: `custom`,
                      message: `model values ${JSON.stringify(lookupEntry)} and ${JSON.stringify(dataOperationEngineKindSchema9Result)} collide as the slug "${dataOperationEngineReplace}" — modelSlug is lossy (lowercase, non-[a-z0-9] runs → '-') and a film address must stay injective (derived values round-trip)`,
                    });
                  }
                }
              },
            )
            .describe(
              `Model id strings, free-form (the models field's own vocabulary) — non-empty, unique, ≤16 (the fire-time model list's cap), and SLUG-DISTINCT: each value's modelSlug (the film-address derivation, this module) must be 1..64 chars and pairwise distinct, or the films of two cells would overwrite each other. When present this axis SUPERSEDES the parent's models/model fields for expansion (one axis, one winner — precedence in the module header).`,
            ),
        }),
        lazyZod.strictObject({
          kind: lazyZod
            .literal(`harness`)
            .describe(
              `The HARNESS axis — one child per value per spec per model per rollout.`,
            ),
          values: lazyZod
            .array(lazyZod.enum(dataOperationEngineCcrMessagesValues))
            .min(1)
            .refine(resolveDataOperationEngineSize, {
              message: `parameter values must be unique`,
            })
            .describe(
              "Harness words from the CLOSED parameter vocabulary ('ccr' | 'messages' — FANOUT_HARNESS_VALUES; a fan-out multiplies a typo, so this axis is enum-walled where the run's own harness field stays free-form). Each child stamps its combo's value as its OWN `harness`; absent this axis, children inherit the parent's harness as today (FANOUT_INHERITED_FIELDS).",
            ),
        }),
        dataOperationEnginePathSchema2,
      ]),
    )
    .min(1)
    .max(DataOperationEnginePath.length)
    .superRefine(
      (
        dataOperationEngineKindSchema92?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let lookup: Dynamic = new (Set as Dynamic)();
        for (
          let index = 0;
          index < dataOperationEngineKindSchema92.length;
          index++
        ) {
          let dataOperationEngineKindSchema9Item: Dynamic =
            dataOperationEngineKindSchema92[index];
          let enabled = !(`path` in dataOperationEngineKindSchema9Item);
          let path: Dynamic = enabled
            ? DataOperationEnginePath.find(
                (
                  DataOperationEnginePath7?: Dynamic,
                  ..._extraArguments: unknown[]
                ) =>
                  DataOperationEnginePath7.legacyKind ===
                  dataOperationEngineKindSchema9Item.kind,
              ).path
            : dataOperationEngineKindSchema9Item.path;
          if (lookup.has(path)) {
            options.addIssue({
              code: `custom`,
              path: [index],
              message: `at most one parameter per axis — ${path} is declared more than once (the {kind} sugar and the path spelling name the same axis)`,
            });
            continue;
          }
          lookup.add(path);
          if (enabled) continue;
          let dataOperationEngineValue2: Dynamic =
            getDataOperationEngineValue2(path);
          if (dataOperationEngineValue2 === undefined) {
            options.addIssue({
              code: `custom`,
              path: [index, `path`],
              message: `axis ${path} is not in the sanction table — sanctioned paths: ${DataOperationEnginePath2.join(`, `)} (growing the table is the sanction decision, never code surgery elsewhere)`,
            });
            continue;
          }
          let values: Dynamic = dataOperationEngineKindSchema9Item.values;
          if (dataOperationEngineValue2.scalar === true && values.length > 1) {
            options.addIssue({
              code: `custom`,
              path: [index, `values`],
              message: `axis ${path} is scalar-class — a single value, never a multiplier`,
            });
          }
          let lookup2: Dynamic = new (Map as Dynamic)();
          for (let dataOperationEngineKindSchema9Result of values as Dynamic) {
            let safeParse: Dynamic = dataOperationEngineValue2.values.safeParse(
              dataOperationEngineKindSchema9Result,
            );
            if (!safeParse.success) {
              options.addIssue({
                code: `custom`,
                path: [index, `values`],
                message: `axis ${path} value ${JSON.stringify(dataOperationEngineKindSchema9Result)} — ${safeParse.error.issues.map((error?: Dynamic, ..._extraArguments: unknown[]): Dynamic => error.message).join(`; `)}`,
              });
              continue;
            }
            let slug: Dynamic = dataOperationEngineValue2.slug(
              dataOperationEngineKindSchema9Result,
            );
            if (!DataOperationEngineState6.test(slug)) {
              options.addIssue({
                code: `custom`,
                path: [index, `values`],
                message: `axis ${path} value ${JSON.stringify(dataOperationEngineKindSchema9Result)} slugs to ${slug.length === 0 ? `an empty string` : `"${slug}"`} — the film-address grammar admits ${DataOperationEngineStyles}`,
              });
              continue;
            }
            let lookupEntry: Dynamic = lookup2.get(slug);
            if (lookupEntry === undefined) {
              lookup2.set(slug, dataOperationEngineKindSchema9Result);
            } else {
              options.addIssue({
                code: `custom`,
                path: [index, `values`],
                message: `axis ${path} values ${JSON.stringify(lookupEntry)} and ${JSON.stringify(dataOperationEngineKindSchema9Result)} collide as the slug "${slug}" — a film address must stay injective (derived values round-trip)`,
              });
            }
          }
        }
      },
    )
    .describe(
      `The parameterized-suite COMBO axes (the {path, values} shape): expansion births one spec child per (spec × combo × rollout), a combo being one value per declared axis (cartesian product; the base run value patched at each path). At most ONE parameter per axis — a duplicate refuses at the door (value-shape), across spellings: the legacy {kind: model|harness, values} form parses as SUGAR for the path spelling and keeps writing legacy film stems. Paths are walled by the SANCTION TABLE (FANOUT_SANCTION_TABLE — a declared path off the table refuses; growing the table is the sanction decision). An empty array is a spelling error (absence is the unparameterized spelling — the ids discipline). PIN-PLANE + EXEC-DETERMINING on the run arm (RUN_PIN_PLANE / RUN_EXEC_DETERMINING_FIELDS — the models/ids class): the axes decide what the multiplex executes.`,
    ));
  (dataOperationEngineNumRolloutsSchema = lazyZod
    .strictObject({
      numRollouts: dataOperationEngineDescribeSchema13.optional(),
      parameters: dataOperationEngineKindSchema9.optional(),
      maxRetries: dataOperationEngineDescribeSchema14.optional(),
    })
    .describe(
      `A suite-level parameterization declaration: how firing this suite fans out when the fire itself doesn't say (precedence: fire-explicit > suite-declared > defaults {1, no axes}). ABSENT = a mechanical/deterministic suite (single run per spec, no fanout axes).`,
    ));
  (dataOperationEngineCodeSchema = lazyZod
    .strictObject({
      name: lazyZod
        .string()
        .optional()
        .describe(
          `Display name — optional; what a spec is CALLED lives lightly here, not as identity.`,
        ),
      code: lazyZod
        .string()
        .describe(
          `The spec body — the import-free dialect (page 08 T1). REQUIRED: a spec IS its code.`,
        ),
      description: lazyZod
        .string()
        .optional()
        .describe(
          "Human-facing description — a couple of sentences saying what the spec tests, for people reading rosters and replays. DISPLAY ONLY: it is parsed from the spec file's `// describe:` header block by the prebuilt loader, never executed, and NEVER shown to the model driving a session run (the run interior's zRunSpecValue strips it from RunInput — src/spec/bind.ts). In a comparison view it renders once per spec, never per cell.",
        ),
      graderModel: lazyZod
        .string()
        .min(1)
        .optional()
        .describe(
          `THE SPEC-LEVEL GRADER (relocated off the run declaration and both run arms, which refuse the key now): which model this spec's model("grade") calls judge with. Authored as the spec file's \`// graderModel: <model-id>\` header line and parsed by the prebuilt loader (src/spec/prebuilt.ts parseSpecGraderModel — the one validated writer, mirroring description's landing); rides RunInput.spec into the interior, where the binding threads it to RuntimeSeams.graderModel (src/spec/bind.ts). Resolution: spec-declared > FANOUT_DEFAULT_GRADER_MODEL (lib/fanoutParams.ts) — the grade lane is never modelless. A SCALAR knob, never a fanout axis: it multiplies no cells and joins no film name; a film's birth row carries it via value.spec.`,
        ),
    })
    .describe(
      `One spec: {name?, code, description?, graderModel?} — the page-08 ruled value, strict; description is the human display field, graderModel the spec-level grade knob (both 2026-08-04).`,
    ));
  (dataOperationEngineStagedPendingRunningDoneValues = [
    `staged`,
    `pending`,
    `running`,
    `done`,
    `error`,
  ]);
  (dataOperationEngineCancelledValues = [`cancelled`]);
  (DataOperationEngineState7 = [
    ...dataOperationEngineStagedPendingRunningDoneValues,
    ...dataOperationEngineCancelledValues,
  ]);
  (dataOperationEngineDescribeSchema15 = lazyZod
    .enum(dataOperationEngineStagedPendingRunningDoneValues)
    .describe(
      `The lifecycle word — a CLOSED vocabulary: 'staged' (staged unification: there is NO hold object and NO staged flag — staging IS a run status; UNCLAIMABLE BY CONSTRUCTION because the claims worker dequeues only 'pending', so a staged run cannot execute until approved staged→pending; DISMISS = soft-DELETE the run — cancelled is no longer a status — a dismissal is the run's removal, not a transition), then the executor's live writes (birth pending; worker running → verdict; terminal done|error — 'cancelled' RETIRED to the banned set by the five-status ruling: dismissal deletes). Closed by construction: nothing outside this list commits — the banned-status law with no ban list to maintain.`,
    ));
  (dataOperationEngineDescribeSchema16 = lazyZod
    .string()
    .optional()
    .describe(
      `The worker's failure testimony — set alongside status 'error' (expiry, crash).`,
    ));
  (dataOperationEngineDescribeSchema17 = lazyZod
    .json()
    .describe(
      `The run's settled result payload — worker-written with its terminal verdict; opaque JSON TODAY, typed as what actually commits (the eval-lib lane owns its grammar; id-addressed blob pointers {kind:'blob', id:'blob/<id>'} ride inside alongside inline verbatim items and suite journals — the worker settle mints an ACL-gated blob noun per artifact, bongo#4193). Served via resultOfRun; the transport predicate lives at the serve/lift seams, never here. The old raw-sha redaction wall retired with the id-addressing (a blob/<id> is ACL-gated on read, not a transferable sha capability). result is also slated to leave the noun catalog (run output, not a noun).`,
    ));
  (dataOperationEngineDescribeSchema18 = dataOperationEngineDescribeSchema17
      .optional()
      .describe(
        "The run's settled result payload — written by the worker with its terminal verdict; opaque JSON here (the eval-lib lane owns its grammar — zRunResultSeat is the exported seat). OWN-REF PROMOTION (client-fold worklist item 6, the worker flip — LANDED): result/<runId> is its own ref with a fail-closed transport predicate; the worker still RECORDS this inline seat (deploy-ordering compat — old pods' zEnvelope parse doesn't know object:'result') and room.ts liftOwnRefs splits it at applyStage (live AND fold) — readers consult resultOfRun; `run.result` in memory is always undefined in a booted room. Blob pointers inside are id-addressed (blob/<id>, ACL-gated — bongo#4193).",
      ));
  (dataOperationEngineDescribeSchema19 = dataOperationEngineSurfaceSchema
      .optional()
      .describe(
        `WHICH CONVERSATION BIRTHED THIS RUN — testimony, commitUnderTest's class. actor = who, vouched, feeds permissions; source = where-from, claimed, feeds nothing. Client-writable on every arm at birth and staged-phase edits only (the transition table freezes it once the run leaves staged — origin is a birth fact); joins RUN_PIN_PLANE per the growth law; NOT exec-determining; deliberately CARVED from the ops-coherence deny (runLaw.ts — ask 1 ruled: carve) so conversation-born staged proposals keep their provenance. Chained runs never copy it — fanout/spec children walk parent links (claims/expansion.ts FANOUT_WALKS_PARENT_FIELDS classifies source, metadata and name as walk-the-parent; children inherit only the execution-environment testimony — harness, commitUnderTest — per FANOUT_INHERITED_FIELDS).`,
      ));
  (dataOperationEngineMessageSchema5 = lazyZod
    .record(lazyZod.string().min(1).max(40), lazyZod.string().max(500))
    .refine(
      (
        dataOperationEngineMessageSchema52?: Dynamic,
        ..._extraArguments: unknown[]
      ) => Object.keys(dataOperationEngineMessageSchema52).length <= 50,
      {
        message: `metadata carries at most 50 keys`,
      },
    )
    .optional()
    .describe(
      `Integration-owned creation-time data the server never interprets — client-chosen string keys and values, Stripe-style caps in-schema (50 keys, 40-char keys, 500-char values) so the bag can't grow unbounded. Zero authority, laws never read it; renders as TEXT ONLY.`,
    ));
  (dataOperationEngineDescribeSchema20 = lazyZod
    .array(lazyZod.string().min(1).max(200))
    .max(16)
    .optional()
    .describe(
      "The executor's mid-run progress trail — short bounded step lines (tool verb + target), written by the run machinery while the run is `running` (the progress-lane gate + the transition table's running self-edge carve). Display testimony only: zero authority, never client-writable, never pinned; renders as TEXT ONLY.",
    ));
  (dataOperationEngineDescribeSchema21 = lazyZod
    .number()
    .int()
    .min(1)
    .max(1e6)
    .optional()
    .describe(
      `ATTEMPT TESTIMONY — the claim-generation ordinal (ClaimCredential.epoch) of the LAST generation that reached the pending→running flip. attempt < a live credential's epoch ⇔ a prior generation's interior was about to run / ran (the interrupted fence's truth key); absent ⇔ no generation ever reached the flip (re-drive is safe — at-least-once restored for grants that died pre-interior). Worker-lane lifecycle field (transition-law licensed, monotone); never client-authored.`,
    ));
  (dataOperationEngineDescribeSchema22 = lazyZod
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?(Z|[+-]\d{2}:\d{2})$/,
      `attemptAt must be an ISO-8601 timestamp`,
    )
    .max(35)
    .optional()
    .describe(
      "WHEN the stamping generation reached the flip — ISO timestamp from the executor edge's INJECTED clock (never an ambient read in fenced code; the virtualization invariant). Diagnostic testimony beside `attempt`; changes only beside an attempt change (transition law).",
    ));
  (dataOperationEngineStatusSchema = {
    status: dataOperationEngineDescribeSchema15,
    progress: dataOperationEngineDescribeSchema20,
    attempt: dataOperationEngineDescribeSchema21,
    attemptAt: dataOperationEngineDescribeSchema22,
    source: dataOperationEngineDescribeSchema19,
    metadata: dataOperationEngineMessageSchema5,
    name: lazyZod
      .string()
      .min(1)
      .max(200)
      .regex(/\S/, `name must carry a non-whitespace character`)
      .optional()
      .describe(
        `The run's DISPLAY NAME — presentation metadata for humans (the eval-debugger header's run slot). Client-writable on every arm; joins RUN_PIN_PLANE per the growth law (client-writable ⇒ pinned: a rename between review and approve flips the review pin — the reviewer blessed a LABELED run). Deliberately NOT exec-determining (it names the run; it never picks what executes — see RUN_EXEC_DETERMINING_FIELDS' derivation). min(1): an empty name is a spelling error, not an unnamed run — absence is the unnamed spelling (the ids-field discipline). World-derived at every consumer: renders as TEXT ONLY (the camera's standing rule).`,
      ),
    commitUnderTest: lazyZod
      .string()
      .min(1)
      .max(120)
      .regex(/\S/, `commitUnderTest must carry a non-whitespace character`)
      .optional()
      .describe(
        `The COMMIT UNDER TEST — which code revision this run exercised (the header's commit label; 'repo@short-sha' by convention, e.g. 'bongo@e91c2a4' — free-form because provenance spellings differ). TESTIMONY, not instruction: nothing checks this commit out — the executor runs whatever is deployed; this records what the firing client SAYS that was (hence NOT exec-determining — same criterion as name). Client-writable on every arm; joins RUN_PIN_PLANE per the growth law. Renders as TEXT ONLY.`,
      ),
    harness: lazyZod
      .string()
      .min(1)
      .max(120)
      .regex(/\S/, `harness must carry a non-whitespace character`)
      .optional()
      .describe(
        "WHICH HARNESS RAN THIS — the run's executing harness identity, as claimed by the firing client (milestone 1's session attach: a spec run is attached to its session by HARNESS and MODEL PARAMS). A SCALAR by ruling, deliberately NOT an object: the model params already live on the arms' own `model`/`models` fields, and a second place a model could live would force a which-wins rule — the duplicated-policy defect. SINGULAR, not plural, because grading is per-run: a check() verdict scores ONE execution; comparison across harnesses happens ACROSS runs, the way the fanout matrix already does it. Client-writable on every arm; joins RUN_PIN_PLANE per the growth law (a harness swap between review and approve flips the pin — the reviewer blessed a run THAT SAID it ran under that harness). EXEC-DETERMINING: the spec interior reads it to choose which harness engine drives move(\"session\") (RuntimeSeams.sessionHarness → the session seam's dispatch key — src/api/specSession.ts), so it joined RUN_EXEC_DETERMINING_FIELDS in the change that first made a dispatcher read it, and the plane already covered it. THE SPELLING, named not enforced: the harness lane already mints canonical labels — harnessLabel (harness-testing/fold.ts) emits 'ccr/<product>' | 'messages' | 'cma', and matrix.ts's row labels are the same grammar. Writers should emit THAT, so a group-by-harness across runs buckets one harness once; the shape stays a bounded free-form string rather than a z.enum because closing the vocabulary in the ROOM would make every new harness a schema ruling, and the room layer cannot import the harness lane. Fanout expansion COPIES this to each child (claims/expansion.ts FANOUT_INHERITED_FIELDS — the execution-environment class): a multiplex cell inherits the harness the parent's approval pin covered, and once born it is the child's own frozen fact (run-params-frozen). ONE GAP, named so nobody reads coverage into this: no reader renders it yet — the run viewer's display walk (lib/runShellMeta.ts) derives name/commitUnderTest only, so today the value surfaces to a human only in the approve dialog's pinnedPlane. When a reader lands it renders as TEXT ONLY (the camera's standing rule).",
      ),
    ops: lazyZod
      .json()
      .optional()
      .describe(
        `The staging gesture's cargo (the Run shape accommodates SINGLE OP and BATCH OPS): a staged run carries the op — one intent object — or the op LIST it proposes; absent on ordinary runs. SHAPE-LOOSE HERE by design (the vessel/grammar split — this zod stays a pure validator even now that run is fold-strict, so the door can evolve the cargo grammar without a fold re-judgment); the LAW lives at the live door — zEmbeddedOp + embeddedOpDeny (stageLane.ts) prove every entry on every ops-bearing write, and ops-beside-coordinates refuses (the six-status transition unit's tightening; the door is the grammar, this field is the vessel).`,
      ),
    error: dataOperationEngineDescribeSchema16,
    result: dataOperationEngineDescribeSchema18,
  });
  lazyZod.strictObject({
    status: lazyZod
      .enum(dataOperationEngineStagedPendingRunningDoneValues)
      .optional(),
    error: dataOperationEngineDescribeSchema16,
    result: dataOperationEngineDescribeSchema18,
    attempt: dataOperationEngineDescribeSchema21,
    attemptAt: dataOperationEngineDescribeSchema22,
  });
  (dataOperationEngineKindSchema10 = lazyZod
    .union([
      lazyZod
        .strictObject({
          kind: lazyZod
            .literal(`fanout`)
            .describe(
              "A FANOUT RUN — the multiplex parent (the retired word: 'suite'). ITS KIND IS ITS MECHANISM: it ORCHESTRATES — expansion births one spec child per (spec × model) cell — and never executes a spec itself. Parentless by construction (strictObject — nothing multiplexes a multiplex). KIND IS TRIGGER SEMANTICS, not container kind (the project-runs ruling: runs may home in projects too — the CONTAINER is the birth row's business). SCHEDULED-FANOUT SEAM (named, not built): a future scheduled suite adds a `routine` reference field to THIS arm — triggerOf's routine rung then classes it consent-first (the ladder's ROUTINE WINS doctrine), and its admission rides the consent plane, re-adjudicated at that change.",
            ),
          suite: dataContentAndReferencesDescribeSchema
            .optional()
            .describe(
              `The fired suite — the LANDED page-06 F2 field (room.ts's provenance law consumes value.suite and consistency-checks it against the claim when present; its comment pins the name through the reshape). OPTIONAL per the law's own typeof guard — birth testimony carries the containment truth; this is the value-plane copy the law polices and the executor projects. Lane-2's contract spelling (suiteId) respells to this at their tightening.`,
            ),
          ids: lazyZod
            .array(dataContentAndReferencesDescribeSchema)
            .min(1)
            .optional()
            .describe(
              `The PARTIAL-SUITE selection: spec IDS — references ride ids, never names (the routine arm's own discipline; specName was the anomaly, removed by the same ruling). ABSENT = the whole suite; EMPTY REFUSES at the shape (min(1) — an empty selection is a spelling error, not a no-op run); an unknown id error-settles at fanout expansion NAMING the id (the executor's arm).`,
            ),
          failedSpecs: lazyZod
            .array(lazyZod.string())
            .optional()
            .describe(
              `THE ROLL-UP'S STRUCTURED FAILURE DETAIL (the run-viewer lane's read; the parent pointer on child rows is its other read): the dedup'd, sorted spec ids of the children that did not settle done — written by the executor's roll-up beside the error settle, byte-consistent with the settle string's own list. Lifecycle-class like error/result (worker-written; NOT exec-determining, NOT pin-plane).`,
            ),
          ...dataOperationEngineStatusSchema,
          model: lazyZod
            .string()
            .optional()
            .describe(
              `Model override for the whole fanout run — the NO-LIST FALLBACK since the models field landed: expansion reads models first; absent models, a present model is the one-model set. Kept (not retired) deliberately: additive evolution — retirement would make stored conforming rows prior-shape-failing and shrink the pin plane for zero gain (no production caller fires it today; door tests do).`,
            ),
          models: lazyZod
            .array(lazyZod.string().min(1))
            .min(1)
            .max(16)
            .optional()
            .describe(
              `The FIRE-TIME MODEL LIST (a suite run is passed its model list): the multiplex rows, parallel to ids' columns. Expansion births one spec child per (spec ∈ ids-or-all) × (model ∈ models). ABSENT = fall back to the singular model, then the executor's injected default; EMPTY REFUSES at the shape (min(1) — the ids law's own discipline: an empty selection is a spelling error, not a no-op). Entries are model id strings, non-empty; AT MOST 16 (a model list, not a sweep — the fan-out grid is single-tick work and an unbounded list is a tick-wedging lever; the security verifier's cap). PIN-PLANE MEMBER (the growth law): exec-determining and client-writable, registered in RUN_PIN_PLANE in this same change. A parameters entry of kind 'model' SUPERSEDES this list for expansion (lib/fanoutParams.ts — one axis, one winner).`,
            ),
          numRollouts: dataOperationEngineDescribeSchema13
            .optional()
            .describe(
              "PARAMETERIZED SUITE RUNS (lib/fanoutParams.ts is the shared spelling): how many times each (spec × combo) cell runs — integer 1..5, DEFAULT 1 when absent; each child stamps its 1-based `rollout` ordinal. ABSENT here inherits the SUITE OBJECT's `run.numRollouts` declaration at expansion time (fire-explicit > suite-declared > 1). PIN-PLANE + EXEC-DETERMINING member (the growth law: a rollout-count swap past approval swaps how much the multiplex executes).",
            ),
          parameters: dataOperationEngineKindSchema9
            .optional()
            .describe(
              "PARAMETERIZED SUITE RUNS (the {path, values} shape, lib/fanoutParams.ts): the COMBO axes — {path: <json-pointer>, values} entries walled by the SANCTION TABLE, with the legacy {kind: model|harness, values} spelling parsing as sugar; at most one parameter per AXIS across spellings; expansion births one spec child per (spec × combo × rollout), each cell the base run value with each axis's value patched at its path. An axis absent from parameters keeps the parent's own field as today; ABSENT entirely inherits the SUITE OBJECT's `run.parameters` declaration (fire-explicit > suite-declared > no axes). THE ALIAS CONTRACT rides the live door (runLaw.ts, fanoutParamsDoorDeny): a base carrying a spelling an axis supersedes (`models`/`model` beside /model; the fire's own `harness` pin beside /harness) refuses at birth naming both — one grammar per concept, never resolved by ladder. PIN-PLANE + EXEC-DETERMINING member (the growth law: the axes decide what the multiplex executes).",
            ),
          maxRetries: dataOperationEngineDescribeSchema14
            .optional()
            .describe(
              `PARAMETERIZED SUITE RUNS (lib/fanoutParams.ts is the shared spelling): the fire-explicit rung of the maxRetries ladder (fire > suite-declared > the default 2) — how many REPLACEMENT runs a red session cell may get after its first attempt (retries count RE-runs: total attempts = maxRetries + 1; integer 1..3). SUITE-LEVEL ORCHESTRATION, never a run property (a spec run is always a single try): a settled run is never re-run or mutated — honoring the budget means birthing replacement children, one run per attempt, which is why the field lives on THIS arm and not the spec child's. NAMED FOLLOW-UP: the DB executor does not honor it yet (the declaration carries the value; today the repo recorder — scripts/emit-run-films.ts — is the consumer). A SCALAR, never a combo axis: multiplies nothing, joins no cell coordinate, never surfaces in a film name. PIN-PLANE member (client-writable ⇒ pinned, the growth law) but NOT exec-determining — like rollout, a retry repeats IDENTICAL inputs; the budget names how many repetitions a red may get, never what runs.`,
            ),
          resolvedAxes: lazyZod
            .strictObject({
              parameters: lazyZod
                .array(
                  lazyZod.strictObject({
                    path: lazyZod.string().min(2).max(200),
                    values: lazyZod.array(lazyZod.string().min(1)).min(1).max(16),
                  }),
                )
                .max(8),
              numRollouts: dataOperationEngineDescribeSchema13,
            })
            .optional()
            .describe(
              `THE FROZEN-AXES STAMP (generalized run parameters — the resume-rekey correction): the resolved {path → values} axis list (sanction-table canonical order, lib/fanoutParams.ts) + numRollouts, stamped ONCE by fanout EXPANSION onto the still-pending parent before any child births. WHY: expansion resolves axes off the fresh fold (fire-explicit > suite-declared), so a crash + resume after a SUITE-DECLARATION edit would re-key every coordinate and re-birth a whole second grid beside living children — resume/complement reconcile against THIS stamp, never the fresh declaration or table. ROOM-GOVERNED lifecycle class like failedSpecs/attempt (worker-lane write only: the transition table licenses it on the pending self-edge alone, WRITE-ONCE, refused pre-seeded at birth and on staged edits — runLaw.ts; the via-keyed lane wall restricts the writer to via === 'executor' — room.ts runProgressLaneDeny's resolved-axes arm). NOT pin-plane (never client-authored), NOT in RUN_EXEC_DETERMINING_FIELDS (that list enumerates CLIENT-writable exec inputs; this is machinery testimony of what the fire's own pinned fields resolved to).`,
            ),
        })
        .describe(
          `The fanout arm — the multiplex parent (was the suite-run arm; fields carried verbatim, kind respelled).`,
        ),
      lazyZod
        .strictObject({
          kind: lazyZod
            .literal(`spec`)
            .describe(
              `A SPEC RUN, by reference — one cell of the multiplex (the retired word: 'take'), or the directly-fired lane (spec named, no parent).`,
            ),
          spec: dataContentAndReferencesDescribeSchema.describe(
            `WHICH spec this run executes — the multiplex column, BY REFERENCE (a room-minted id; the inline arm below carries the object instead — the field's TYPE is the sub-arm discriminant).`,
          ),
          model: lazyZod
            .string()
            .describe(`WHICH model this run rides — the multiplex row.`),
          parent: dataContentAndReferencesDescribeSchema
            .optional()
            .describe(
              `The fanout run this cell multiplexes from — the universal parent edge rides the room's edge law; this is the COORDINATE copy for the worker's own reads. THE MACHINE BIRTH PERMIT (the direct arm's parent physics, generalized by the collapse): a machine-principal birth REQUIRES it (directBirthDeny's spec arm — machine execution chains or it does not birth) and a user-principal birth REFUSES it (parent-present ⟺ machine-born; a directly-fired spec run has no parent). Edge truth (same-container, fold-live fanout-kind, pending-only) is runParentDeny's.`,
            ),
          rollout: lazyZod
            .number()
            .int()
            .min(1)
            .max(5)
            .optional()
            .describe(
              `THE ROLLOUT ORDINAL (parameterized suite runs): WHICH repetition of this (spec, model, harness) coordinate the child is, 1-based, bounded by the parent's numRollouts (≤5 — lib/fanoutParams.ts FANOUT_MAX_ROLLOUTS). Stamped by fanout expansion on every child it births (1 when the parent declares no rollouts); ABSENT on directly-fired spec runs and pre-feature history. Birth-only, immutable after birth by the transition table's own physics (pending is frozen — run-params-frozen). PIN-PLANE member (client-writable ⇒ pinned, the growth law) but NOT exec-determining — two rollouts of one coordinate execute IDENTICAL inputs; the ordinal names WHICH repetition, never what runs (the parent-field class; RUN_EXEC_DETERMINING_FIELDS' derivation carries the exclusion).`,
            ),
          ...dataOperationEngineStatusSchema,
        })
        .describe(
          `The spec-by-reference arm — the only arm where the multiplex coordinates are legal (was the take-run arm; fields carried verbatim, kind respelled).`,
        ),
      lazyZod
        .strictObject({
          kind: lazyZod
            .literal(`spec`)
            .describe(
              `A SPEC RUN carrying its OWN spec inline (the executor RunInput shape — execute.ts:105-112; the retired word: 'adhoc'). Parentless by construction (strictObject): the inline lane is a user's one-shot — creating one kicks it off, via the principal rule (user births pending; a machine principal has no inline lane — no parent field exists on this sub-arm to permit one).`,
            ),
          spec: dataOperationEngineCodeSchema,
          model: lazyZod.string().optional(),
          ...dataOperationEngineStatusSchema,
        })
        .describe(
          `The spec-inline arm — the executor birth contract + the arm-agnostic lifecycle fields (was the adhoc arm; fields carried verbatim, kind respelled).`,
        ),
    ])
    .describe(
      `The spec family, COLLAPSED: fanout | spec — kind names the mechanism (fanout orchestrates; spec executes one spec); the spec arm's sub-shapes disambiguate on the spec FIELD'S TYPE (reference string vs inline object); parent marks the machine-born multiplex cell. A plain z.union like the structural family (two arms share kind 'spec'); at most one sub-arm admits any value. The retired words suite/take/adhoc no longer parse — the CLEAN FLIP: stored old-word rows are prior-shape-failing and live out their lifecycle under the grandfathering carve-out; no grandfather arm here.`,
    ));
  (dataOperationEnginePromptSchema = lazyZod
    .enum([`prompt`, `toolCall`, `code`])
    .describe(
      `The MECHANISM: which machine executes — testimony of the fired routine's runnable.kind (the consent birth law holds consent-born spellings to it; the executor dispatches off the routine itself).`,
    ));
  (dataOperationEnginePromptSchema2 = lazyZod
    .enum([`prompt`, `code`])
    .describe(
      `The MECHANISM of the direct class's STRING-BODY sub-arm: prompt (instructions the executor's resident follows) | code (source for the sandboxed runner). toolCall is the sibling OBJECT-BODY sub-arm's own literal (the Jul 21 2026 admission) — a toolCall spelled with a string body matches NO arm (refuses value-shape).`,
    ));
  (dataOperationEngineDescribeSchema23 = lazyZod
    .json()
    .optional()
    .describe(
      `The fire's argument payload — opaque here (the executor driver owns its grammar); the runnable vocabulary's fire-time word (args land over declared params — src/room/runnable.ts). On the toolCall sub-arm these are the CALL's arguments (the body names only the tool). PIN-PLANE member (exec-determining).`,
    ));
  (dataOperationEngineDescribeSchema24 = dataContentAndReferencesKindSchema
      .optional()
      .describe(
        "HOW TO READ THIS RUN'S ANSWER — the routine value's `adapter` at its mirror position: a sibling of the MECHANISM, kind-agnostic, applied at CONSUMPTION over an answer stored verbatim. ABSENT = the answer is consumed as it stands. Loud-on-miss: a lens that finds nothing fails naming the offending path, never a heuristic and never a silently empty table. RUN_PIN_PLANE member (client-writable, reviewed content) but NOT exec-determining — no adapter can change what executes.",
      ));
  (dataOperationEngineDescribeSchema25 = dataContentAndReferencesDescribeSchema
      .optional()
      .describe(
        `THE MACHINE CHAIN PERMIT (the principal rule + the derivability ruling: parent-present ⟺ machine-born): the live run this one chains from. REQUIRED for first-party machine-principal births and EXCLUSIVE to them — a user-principal birth carrying it refuses (directBirthDeny, 'birth-lineage'), because the field IS the machine-born classification, never idle testimony. Edge truth (same-container, fold-live, non-self) is the parent containment law's (runParentDeny's direct arm). Pin-plane member already (the spec arm's parent). NOT exec-determining (lineage metadata, the spec-arm precedent).`,
      ));
  (dataOperationEngineKindSchema11 = lazyZod
    .union([
      lazyZod
        .strictObject({
          kind: dataOperationEnginePromptSchema,
          routine: dataContentAndReferencesDescribeSchema.describe(
            `THE ARM'S TARGET FIELD — its presence IS the trigger class (routine-fired; the derivability ruling). The firing routine's ROOM-MINTED id — references ride ids, never display names (the id-mint/provenance class: names are mutable, ids are birth facts). PIN-PLANE member (the growth law): exec-determining.`,
          ),
          params: lazyZod
            .json()
            .optional()
            .describe(
              `The firing's parameter payload — opaque here; the routine's runnable owns its grammar. PIN-PLANE member (exec-determining).`,
            ),
          parent: dataContentAndReferencesDescribeSchema
            .optional()
            .describe(
              `THE CHAIN EDGE (routines calling routines — the direct arm's machine chain permit, extended to the routine arm): the routine-fired run whose EXECUTION fired this one. parent-present ⟺ chain-born (a user-principal birth carrying it refuses — directBirthDeny's routine arm; a machine-principal birth MAY carry it and then births pending only). ABSENT on the scheduler's fires and on click/consent births — the machine parentless lane stays open because the consented crondef IS the scheduled fire's authority (routineConsentDeny gates every non-staged birth either way; consent is NEVER inherited across the edge — the child answers its OWN routine's standing consent). Edge truth (same-container, fold-live, non-self, parent routine-fired and RUNNING, birth-only) is runParentDeny's routine arm; depth cap + cycle refusal are routineChainDeny's ('chain'). Pin-plane member already (the spec arm's parent). NOT exec-determining (lineage metadata — the spec-arm precedent).`,
            ),
          ...dataOperationEngineStatusSchema,
        })
        .describe(
          "The ROUTINE-FIRED arm (structural: `routine` present, node/body forbidden; `parent` optional — the chain edge). Consent: the standing-approval model (routineConsentDeny — born pending only under live consent, spelled kind matching the consented runnable; the review road births staged). Chain births (parent present) additionally answer the routine arms of directBirthDeny (machine-only, pending-only), runParentDeny (edge truth), and routineChainDeny (depth/cycle).",
        ),
      lazyZod
        .strictObject({
          kind: lazyZod
            .literal(`prompt`)
            .describe(
              "The MECHANISM — a widget build is prompt-mechanism by construction (an agent steered by the build text in `prompt`).",
            ),
          node: dataContentAndReferencesDescribeSchema.describe(
            `THE ARM'S TARGET FIELD — its presence IS the trigger class (widget build; the derivability ruling; v1 precedent: PG runner.type 'widget-build', src/api/lfileWidgetRun.ts — the earlier kind:'widget' arm folded into this structural spelling, closing the decision-log entry's open node-attachment question: builds are prompt-mechanism runs attached by this field). The widget node this build edits — the /widget gesture's ROOM-MINTED node id. EXEC-DETERMINING (WHICH widget the build agent rewrites) and client-writable — RUN_PIN_PLANE member (the growth law).`,
          ),
          prompt: lazyZod
            .string()
            .min(1)
            .max(8e3)
            .regex(/\S/, `prompt must carry a non-whitespace character`)
            .describe(
              "The human's build/steer text — WHAT the build is asked to do (v1's dispatch `message`; the 8000 cap mirrors the v1 create route's MAX_PROMPT and the ghost input's maxLength). EXEC-DETERMINING and client-writable — pin-plane member. min(1) + non-whitespace: an empty prompt is a spelling error, not an unprompted build. World-derived at every consumer: renders as TEXT ONLY (the camera's standing rule).",
            ),
          ...dataOperationEngineStatusSchema,
        })
        .describe(
          "The WIDGET-BUILD arm (structural: `node` present, routine/body forbidden) — the queued build; born-pending is a USER principal's word on the human/host channels (widgetBirthDeny — the /widget click IS the consent; machine principals stage — the review road; the exposure lanes — MCP and the chat agent — refuse 'widget-prompt-farmed': their road is code-at-birth on the widget node itself); the widget BUILD AGENT is its executor arm (poller-admitted like the direct arm; flood control is the mint ingress plus the executor's work-phase cap and fair cross-room dispatch — the per-room admission budget was deleted by the PR-B recut).",
        ),
      lazyZod
        .strictObject({
          kind: dataOperationEnginePromptSchema2,
          body: lazyZod
            .string()
            .min(1)
            .regex(/\S/, `body must carry a non-whitespace character`)
            .describe(
              "THE ARM'S TARGET FIELD — its presence IS the trigger class (direct one-shot; the derivability ruling: no reference, no node — the run carries WHAT runs inline). The typed body: instruction text (kind 'prompt') or source (kind 'code'); the runnable vocabulary's own `body` word (src/room/runnable.ts), uncapped like a routine's body. EXEC-DETERMINING (the body IS the execution target) and client-writable — RUN_PIN_PLANE member (the growth law). min(1) + non-whitespace: an empty body is a spelling error, not an empty run.",
            ),
          args: dataOperationEngineDescribeSchema23,
          adapter: dataOperationEngineDescribeSchema24,
          parent: dataOperationEngineDescribeSchema25,
          ...dataOperationEngineStatusSchema,
        })
        .describe(
          "The DIRECT arm's STRING-BODY sub-arm (structural: `body` present and required — a bare mechanism kind with no target matches NO arm; routine/node forbidden; the toolCall sub-arm beside it carries the object body): the human-typed unsaved one-shot. CONSENT MODEL (the principal rule): a direct run is the MOMENT of a user's intent, so any USER principal births it pending on ANY channel — human click, external/MCP riding the user's delegated creds, host chat-agent (her words: MCPs on user creds keep running adhoc runs; routines differ because they RECUR). A FIRST-PARTY MACHINE principal births one only WITH the parent chain permit. Her execute condition is met by the PR-2 driver: born-pending and approved direct runs execute (the poller admits the arm), with the driver's claim-time re-checks — the chain permit's execute-time semantics, the single-author (coAuthored) invariant, and the pre-deploy backlog cutoff — layered over the birth facts.",
        ),
      lazyZod
        .strictObject({
          kind: lazyZod
            .literal(`toolCall`)
            .describe(
              `The MECHANISM — one tool invocation (the runnable vocabulary's own kind word), admitted to the direct class.`,
            ),
          body: dataOperationEngineConnectorSchema
            .extend({
              tool: lazyZod
                .string()
                .min(1)
                .describe(
                  `The tool to invoke, by name. min(1): an empty name is a spelling error, not an empty call (the string sub-arm's own discipline).`,
                ),
            })
            .describe(
              "THE ARM'S TARGET FIELD — its presence IS the trigger class (direct one-shot; the derivability ruling), spelled as the runnable vocabulary's OWN toolCall body ({connector?, tool} — src/room/runnable.ts zToolCallBody, one schema shared so ad-hoc→routine promotion is a verbatim field carry). The call's ARGUMENTS ride `args`, never this body. EXEC-DETERMINING (the body IS the call target) and client-writable — RUN_PIN_PLANE member (the growth law).",
            ),
          binding: lazyZod
            .string()
            .regex(
              /^[0-9a-f]{64}$/,
              `binding must be a 64-hex connector identity hash`,
            )
            .optional()
            .describe(
              `THE CONNECTOR IDENTITY BINDING — the routine road's consent-carried connectorIdentityHash ({id, url, curated} — room/routineConsent.ts), carried in the form the direct road permits: ON THE RUN ITSELF. Names the exact resolved registration this call is bound to fire against; stamped by the birth ingress (the MCP door resolves the ref on the caller's OWN credentials) or supplied by the caller — self-attested either way, and safe that way: the toolCall runtime refuses when the claim-time resolution hashes differently, and equality can only REFUSE, never redirect (the call target is always resolve(ref) on the caller's own token — the routine identity wall's own property). This closes the birth→claim swap window (minutes-class under executor backlog, and attacker-widenable by queue-stuffing — the window a routine's approve-time binding closes on ITS road). ABSENT = unbound: connector toolCalls refuse at claim, fail closed (the routine road's absent-arms-nothing discipline — a non-stamping birth surface teaches rather than rides unbound); house toolCalls (no connector) carry none. EXEC-DETERMINING (WHICH registration may be fired) and client-writable — RUN_PIN_PLANE member (the growth law): the approver's reviewed bytes include the registration identity itself, the exec pin freezes it past staged, and the single-author invariant poisons cross-principal edits of it.`,
            ),
          args: dataOperationEngineDescribeSchema23,
          adapter: dataOperationEngineDescribeSchema24,
          parent: dataOperationEngineDescribeSchema25,
          ...dataOperationEngineStatusSchema,
        })
        .describe(
          "The DIRECT arm's TOOLCALL sub-arm (structural: OBJECT `body` + kind 'toolCall'; routine/node forbidden): the caller's own ad-hoc connector call. SAME consent model as the string-body sub-arm (the principal rule): any USER principal births it pending on any channel; a first-party machine principal births only with the parent chain permit — and the same claim-time re-checks (single-author invariant, approve pin, chain semantics) apply. The EXECUTION walls are the direct toolCall runtime's (directExec/bind.ts): the caller's own identity is the one credential principal (never a stored routine's approver, never the ambient executor), machine-born rows refuse connector authority, and the v1 requestMcp floor applies (the curated tool allowlist + the sensitive-scope deny — not a read-only floor: bigquery_query is write-capable raw SQL and rides it, the admission's own point) — the routine road's unattended walls are deliberately its own (routineExec/bind.ts).",
        ),
    ])
    .describe(
      `The STRUCTURAL family (the final Jul 15 shape): kind = MECHANISM (prompt | toolCall | code — the only stored enum); the trigger class is FIELD STRUCTURE (routine ⟺ routine-fired, node ⟺ widget, body ⟺ direct, parent ⟺ machine-born chain) — derived by triggerOf(), never stored.`,
    ));
  (dataOperationEngineDescribeSchema26 = lazyZod
    .union([dataOperationEngineKindSchema10, dataOperationEngineKindSchema11])
    .describe(
      `One run: the SPEC FAMILY (fanout | spec — the collapse's spellings: fanout orchestrates the multiplex, spec executes one spec by reference or inline; parent marks the machine-born cell) ∪ the STRUCTURAL family (routine-fired | widget | direct — kind is the mechanism, the class is field structure; the interim dual-key trigger enum was cut as derivable). strictObject keeps every arm disjoint. Status a plain enum inside each arm — lifecycle patches never arm-flip; coordinates only where legal (the spec-by-reference arm).`,
    ));
  (dataOperationEngineDescribeSchema27 = lazyZod
    .enum(DataOperationEngineState7)
    .describe(
      `The READ/FOLD status vocabulary — the live five words PLUS the retired set ('cancelled', the five-status ruling): retired words are HELD by pre-retirement history, never re-entered (the transition table has no arm into them and zRunLifecycleRead's write enum refuses receiving one).`,
    ));
  (dataOperationEngineStatusSchema2 = lazyZod
    .union(
      dataOperationEngineDescribeSchema26.options
        .flatMap(
          (option?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            `options` in option ? option.options : [option],
        )
        .map(
          (option?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            option.extend({
              status: unwrapLazyZodSchema(dataOperationEngineDescribeSchema27),
            }),
        ),
    )
    .describe(
      `zRunValue's arms with the READ status vocabulary (RUN_STATUSES_READ — live ∪ retired) — what committed run history can truthfully hold (the fold contract; jsonShapes.run). Everything else about each arm is the LIVE def by derivation (strictness, seats, refines). Live writes speak zRunValue only.`,
    ));
  (dataOperationEngineRunSchema = lazyZod
    .strictObject({
      name: lazyZod
        .string()
        .max(256)
        .optional()
        .describe(
          `Display name — the lobby birth whitelist's one caller key ({name} ≤ 256, empty string legal, passed verbatim); the prebuilt seeder always sets it (the suite dirname).`,
        ),
      run: dataOperationEngineNumRolloutsSchema
        .optional()
        .describe(
          "THE SUITE'S PARAMETERIZATION DECLARATION (lib/fanoutParams.ts, the shared spelling with the fanout run arm and suites.json): how firing this suite fans out when the fire itself does not declare — a fanout-parent CREATE that omits numRollouts/parameters inherits this at expansion time (fire-explicit > suite-declared > defaults {1, no axes}; the DB lane reads THIS OBJECT, never any repo file — 'DB cannot fire repo runs'). ABSENT = a mechanical suite (single run per spec, no axes). Enters the DB at seed time (suiteLoader mints the value with it; the repo's suites.json `run` key is its source there) or by an ordinary post-birth suite edit; NOT on the lobby birth whitelist (lobby births stay {name}-only — declare by editing the suite, the adhoc-marker road).",
        ),
      adhoc: lazyZod
        .literal(true)
        .optional()
        .describe(
          `The ad-hoc marker — set by the ad-hoc suite lane's post-birth patch (specComposer.ensureAdhocSuite): this suite was minted as a home for a one-off spec run, not authored. Exact true; junk values refuse value-shape (fold-strict since the Aug-2 reshape).`,
        ),
      access: lazyZod
        .json()
        .optional()
        .describe(
          `THE PRE-LIFT SEAT of the birth-stamp — every committed suite CREATE row carries the ROOM-AUTHORED {owner, grants:{}} inline (grammar permanence), and the fold's value gate runs before liftOwnRefs splits it to access/<id>; in a booted room's memory this key is always absent (lifted). ⚠️ SLATED FOR REMOVAL (the Aug-2 access-kill gavel: ACL is physics-lane truth, never embedded content) — BLOCKED tonight, verified empirically: zSuiteValue is strict, so dropping this seat while room.ts still stamps inline refuses EVERY suite birth at the door (probed). The kill lands with the stamp's own write-path change (liftOwnRefs' recorded 'own-ref births via its own sibling row' mechanism) — room.ts's lane, not this shape's.`,
        ),
    })
    .describe(
      "A suite value: {name?, run?, adhoc?} plus the pre-lift access stamp on create rows — STRICT (the Aug-2 reshape ruling: verified-empty prod population; unknown keys refuse value-shape). The eval system's container noun; `run` is the parameterized-suite declaration (lib/fanoutParams.ts).",
    ));
  (DataOperationEngineProject2 = {
    project: dataOperationEngineSourceSchema,
    file: dataOperationEngineMimeSchema,
    utterance: editorExtensionsKindSchema4,
    table: dataOperationEngineColumnsSchema,
    row: dataOperationEngineParentSchema3,
    enum: dataOperationEngineOptionsSchema,
    routine: dataOperationEngineSourceSchema2,
    run: dataOperationEngineStatusSchema2,
    spec: dataOperationEngineCodeSchema,
    suite: dataOperationEngineRunSchema,
    access: dataOperationEngineOwnerSchema,
    result: dataOperationEngineDescribeSchema17,
    node: dataOperationEngineDescribeSchema11,
  });
  (dataOperationEngineSet8 = new (Set as Dynamic)([
    `__proto__`,
    `constructor`,
    `prototype`,
  ]));
  (dataOperationEngineSet9 = new (Set as Dynamic)([`uploadUrl`]));
  (dataOperationEngineSet10 = new (Set as Dynamic)([
    `b64`,
    `changeNote`,
  ]));
  (isDataOperationEngineGetPrototypeOf = (
    dataOperationEngineGetPrototype?: unknown,
    ..._extraArguments: unknown[]
  ) => {
    if (
      typeof dataOperationEngineGetPrototype != `object` ||
      !dataOperationEngineGetPrototype ||
      Array.isArray(dataOperationEngineGetPrototype)
    )
      return false;
    let prototypeOf: Dynamic = Object.getPrototypeOf(
      dataOperationEngineGetPrototype,
    );
    return prototypeOf === Object.prototype || prototypeOf === null;
  });
  (dataOperationEnginePathSchema3 = lazyZod
    .discriminatedUnion(`op`, [
      lazyZod
        .strictObject({
          op: lazyZod
            .literal(`set`)
            .describe(
              `Write value at path. MISSING intermediate objects are auto-created; an intermediate that EXISTS but is not a plain object refuses patch-path.`,
            ),
          path: dataOperationEngineDescribeSchema5,
          value: lazyZod
            .json()
            .describe(
              `The value written at path — any JSON. REQUIRED structurally (z.json() has no undefined arm; use delete for absence). The patched WHOLE must still satisfy the object's shape (valueFor) — an illegal result denies value-shape.`,
            ),
        })
        .describe(`Set one path to a value.`),
      lazyZod
        .strictObject({
          op: lazyZod
            .literal(`delete`)
            .describe(
              `Remove the key at path. A missing key or missing spine is a NO-OP — delete means 'ensure absent', so concurrent deletes commute; a spine THROUGH a non-object refuses patch-path.`,
            ),
          path: dataOperationEngineDescribeSchema5,
        })
        .describe(`Delete one path.`),
    ])
    .describe(`One patch entry — set writes a path, delete removes it.`));
  (dataOperationEngineJsonSchema = lazyZod
    .literal(`json`)
    .default(`json`)
    .describe(
      `Pinned discriminator: this payload belongs to the json lane (omit to default; anything else is rejected).`,
    ));
  (dataOperationEngineDescribeSchema28 = lazyZod
    .array(dataOperationEnginePathSchema3)
    .min(1)
    .describe(
      `The patch entries, applied IN ORDER to the current folded value — ATOMIC: every entry applies or the op denies and nothing lands.`,
    ));
  (dataOperationEngineKindSchema12 = lazyZod
    .object({
      kind: lazyZod
        .string()
        .min(1)
        .describe(
          `The row-kind word (the frozen contract vocabulary — takeFold's fold kinds plus the gated contract kinds).`,
        ),
      step: lazyZod
        .number()
        .int()
        .nonnegative()
        .describe(
          `The marker-spine window (row contract §2) — 0-based; ops before the first marker ride window 0.`,
        ),
    })
    .catchall(lazyZod.json())
    .describe(
      `One run-interior row — (kind, step) spine required, remaining fields the encoder's respelled payload (any JSON; the vocabulary is takeFold's contract, never this shape's).`,
    ));
  (dataOperationEngineEngineSchema8 = lazyZod
    .strictObject({
      engine: dataOperationEngineJsonSchema,
      kind: lazyZod
        .literal(`value`)
        .describe(`Whole-value LWW arm — named, never inferred.`),
      value: lazyZod
        .unknown()
        .optional()
        .describe(
          `Whole-value LWW arm: the object's ENTIRE new value. An update omitting value parses and is a recorded no-op.`,
        ),
    })
    .describe(`Whole-value update — last-write-wins on the whole value.`));
  (dataOperationEngineEngineSchema9 = lazyZod
    .strictObject({
      engine: dataOperationEngineJsonSchema,
      kind: lazyZod
        .literal(`patch`)
        .describe(`Path-patch arm — named, never inferred.`),
      patch: dataOperationEngineDescribeSchema28,
    })
    .describe(
      `Path-patch update: edit paths INSIDE the value without restating the rest, so concurrent updates to different paths both survive.`,
    ));
  (dataOperationEngineEngineSchema10 = lazyZod
    .strictObject({
      engine: dataOperationEngineJsonSchema,
      kind: lazyZod
        .literal(`take`)
        .describe(
          `Take-lane arm — named, never inferred (the executor's run-interior testimony; room.ts's take-lane gate is the writer wall).`,
        ),
      row: dataOperationEngineKindSchema12,
    })
    .describe(
      `Take-lane update: the ledger records the run-interior row; the folded value NEVER moves (apply is a no-op by law — testimony, not state).`,
    ));
  (dataOperationEngineKindSchema13 = lazyZod
    .discriminatedUnion(`kind`, [
      dataOperationEngineEngineSchema8,
      dataOperationEngineEngineSchema9,
      dataOperationEngineEngineSchema10,
    ])
    .describe(
      `The json update payload — {kind: 'value'|'patch'} names the arm explicitly (amendment train car 1: the arm is DECLARED, never inferred from key presence — the old presence-keyed union left a fold-timing ambiguity for rows whose optional value was absent). kind vocabulary pinned by tests/kind-vocabulary.test.ts.`,
    ));
  (resolveDataOperationEngineValue14 = (
    dataOperationEngineValue14?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof dataOperationEngineValue14 == `object` &&
    !!dataOperationEngineValue14 &&
    !Array.isArray(dataOperationEngineValue14));
  (isDataOperationEngineValue = (
    items?: Dynamic,
    items2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let min = Math.min(items.length, items2.length);
    for (let index = 0; index < min; index++)
      if (items[index] !== items2[index]) return false;
    return true;
  });
  (dataOperationEngineSet11 = new (Set as Dynamic)([`blob`]));
  (dataOperationEngineEngineSchema11 = lazyZod
    .strictObject({
      engine: dataOperationEngineJsonSchema,
      value: lazyZod
        .unknown()
        .optional()
        .describe(
          `The object's birth value — whole-value, like the update's LWW arm. Omitting it denies value-shape downstream (an object must be born as something). The value's per-noun shape is enforced by valueFor against the ADDRESSED noun (jsonShapes), never by a payload-side type tag.`,
        ),
    })
    .describe(
      `The json create payload: {engine, value} — the birth value. The noun is the addressed object (birth-defines-type); it is never re-declared in the payload, so a payload carrying its own objectType refuses at parse (strict cell, unknown key).`,
    ));
  (resolveDataOperationEngineValue17 = (
    dataOperationEngineValue17?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveDataOperationEnginePatch2(undefined, dataOperationEngineValue17));
  (dataOperationEngineCreateSchema = {
    ...resolveDataOperationEngineCreate(`json`),
    create: dataOperationEngineEngineSchema11,
    update: dataOperationEngineKindSchema13,
    rebase: resolveDataOperationEnginePatch,
    target: dataOperationEnginePathSchema,
    testimony: resolveDataOperationEngineHostTestimony,
    scrubTestimony: isDataOperationEnginePatch,
    value: lazyZod
      .unknown()
      .describe(
        `The object's plain JSON value — narrowed per object by valueFor (jsonShapes).`,
      ),
    valueFor: (
      dataOperationEngineCreateSchema3?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      dataOperationEngineSet11.has(dataOperationEngineCreateSchema3)
        ? lazyZod
            .never()
            .describe(
              dataOperationEngineCreateSchema3 + ` does not speak the json lane`,
            )
        : (DataOperationEngineProject2[dataOperationEngineCreateSchema3] ??
          lazyZod
            .unknown()
            .describe(
              dataOperationEngineCreateSchema3 +
                ` value shape not yet declared — see jsonShapes.ts for the registry law`,
            )),
    apply: resolveDataOperationEngineValue6(
      (..._extraArguments: unknown[]): Dynamic => [
        DataOperationEngineVerbs3,
        DataOperationEngineCreate2,
        resolveDataOperationEngineAfter,
      ],
    ),
  });
  (dataOperationEngineProjectFileNodeRunValues2 = [
    `project`,
    `file`,
    `node`,
    `run`,
    `utterance`,
    `routine`,
    `enum`,
    `spec`,
    `suite`,
  ]);
  (dataOperationEngineDescribeSchema29 = lazyZod
    .never()
    .describe(
      `effects — captured non-determinism for total replay (NEVER credentials). TYPED FROM GROUND TRUTH (Aug 1 census, gap-close lane): NO writer exists — every appendRow lane omits the seat (room.ts single door, batch, coalesce, heal, checkpoint), the take/executor lanes contain no effects code, the WIRE cannot spell the key (zIntendOp strict; pinned by tests/intend-vocabulary.test.ts), the PG column is null on every row (0 of 63k dev rows), and the FoldCtx tape is types-only. z.never() is exact over that population: nothing is admitted, an accidental writer refuses loudly instead of recording UNTYPED REPLAY INPUT (the least-safe unknown class — the tape feeds apply at fold), and the FIRST real recording lane replaces this seat with its recorded shape in the same commit that lands the writer (widening from never re-judges nothing).`,
    ));
  new (Set as Dynamic)(Object.keys(DataOperationEngineProject2));
  (resolveDataOperationEngineNoun = (
    dataOperationEngineNoun?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    lazyZod
      .strictObject({
        noun: lazyZod.literal(dataOperationEngineNoun),
        value: options,
      })
      .describe(context));
}

export {
  DataOperationEngineCreate,
  DataOperationEngineValue,
  DataOperationEngineVerbs2,
  dataOperationEngineCodeSchema,
  dataOperationEngineCreateSchema,
  dataOperationEngineDescribeSchema11,
  dataOperationEngineDescribeSchema17,
  dataOperationEngineDescribeSchema29,
  dataOperationEngineEngineSchema10,
  dataOperationEngineEngineSchema11,
  dataOperationEngineEngineSchema8,
  dataOperationEngineEngineSchema9,
  dataOperationEngineKindSchema12,
  dataOperationEngineKindSchema2,
  dataOperationEngineKindSchema6,
  dataOperationEngineKindSchema8,
  dataOperationEngineMessageSchema,
  dataOperationEngineMessageSchema4,
  dataOperationEngineMimeSchema,
  dataOperationEngineOptionsSchema,
  dataOperationEngineOwnerSchema,
  dataOperationEnginePathSchema3,
  dataOperationEngineProjectFileNodeRunValues2,
  dataOperationEngineRunSchema,
  dataOperationEngineSourceSchema,
  dataOperationEngineSourceSchema2,
  dataOperationEngineStatusSchema2,
  resolveDataOperationEngineApplicationOctetStream,
  resolveDataOperationEngineLdoc,
  resolveDataOperationEngineNoun,
  resolveDataOperationEnginePatch2,
  resolveDataOperationEngineTrim,
  resolveDataOperationEngineValue15,
  resolveDataOperationEngineValue16,
  resolveDataOperationEngineValue17,
};
