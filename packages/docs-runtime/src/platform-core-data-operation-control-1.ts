/** BaoCut: data operation control from app-core-BE6n4d7F.js. */
import type { Dynamic } from "./types";
import {
  Extension,
} from "./platform-core-dependencies";
import {
  ObservabilityTelemetryDisplayAutoTabsPlaceLeft,
  ObservabilityTelemetryDisplayLit,
  ObservabilityTelemetryFlatMap2,
  observabilityTelemetryE1E23E49E10pValues,
  observabilityTelemetryReseatFailedSchemaMismatchOrphanNodeNodeGoneValues,
} from "./platform-core-observability-telemetry-2";
import {
  emitTelemetryEvent,
} from "./platform-core-observability-telemetry-3";
import {
  platformSessionAndSourcesPattern12,
  platformSessionAndSourcesPattern19,
  platformSessionAndSourcesPattern20,
  resolvePlatformSessionAndSourcesTest12,
} from "./platform-core-platform-session-and-sources-1";
import {
  resolveEditorExtensionsSess,
  resolveEditorExtensionsValue21,
} from "./platform-core-editor-extensions-2";
import {
  isPlatformKeyboardAndSaveStatusCharCodeAt,
  resolvePlatformKeyboardAndSaveStatusTest,
  resolvePlatformKeyboardAndSaveStatusValue8,
} from "./platform-core-platform-keyboard-and-save-status";
import {
  resolveObservabilityBrowserAndOperationEventsTest,
  resolveObservabilityBrowserAndOperationEventsValue3,
} from "./platform-core-observability-browser-and-operation-events-1";
import {
  resolvePlatformAnnouncementsToUpperCase,
} from "./platform-core-platform-announcements";
import {
  PlatformSyncAndRoutingRoot,
  getPlatformSyncAndRoutingValue,
  resolvePlatformSyncAndRoutingEndsWith,
  resolvePlatformSyncAndRoutingOrder,
  resolvePlatformSyncAndRoutingPath3,
  resolvePlatformSyncAndRoutingUntitled,
  resolvePlatformSyncAndRoutingValue28,
  resolvePlatformSyncAndRoutingValue29,
  updatePlatformSyncAndRoutingEntry,
  updatePlatformSyncAndRoutingKeys,
} from "./platform-core-platform-sync-and-routing-2";

function updateDataOperationControlChildren(
  items?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let itemItem: Dynamic =
    items.length === 1 && items[0].children.length === 0 ? items[0] : undefined;
  let trimmedOptions: Dynamic = (options ?? ``).trim();
  if (
    itemItem !== undefined &&
    trimmedOptions !== `` &&
    (itemItem.entry.name ?? ``).trim() === trimmedOptions
  )
    return new (Map as Dynamic)([[itemItem.id, `Tab 1`]]);
  let lookup: Dynamic = new (Map as Dynamic)();
  let count: Dynamic = 0;
  let helloImport2 = (
    updateDataOperationControlChildren2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    for (let node of updateDataOperationControlChildren2 as Dynamic) {
      count += 1;
      lookup.set(
        node.id,
        resolvePlatformSyncAndRoutingUntitled(node.entry.name)
          ? `Tab ${count}`
          : node.entry.name,
      );
      helloImport2(node.children);
    }
  };
  helloImport2(items);
  return lookup;
}

var dataOperationControlPattern: RegExp;

var dataOperationControlPattern2: RegExp;

function getDataOperationControlKeys(
  dataOperationControlKeys?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  for (let getDataOperationControlKeysResult of dataOperationControlKeys.keys() as Dynamic) {
    if (
      getPlatformSyncAndRoutingValue(
        getDataOperationControlKeysResult,
        dataOperationControlKeys,
      ) !== options
    )
      continue;
    let order: Dynamic = dataOperationControlKeys.get(
      getDataOperationControlKeysResult,
    )?.order;
    if (order !== undefined && dataOperationControlPattern.test(order)) {
      items.push(order);
    }
  }
  return resolvePlatformSyncAndRoutingValue28(items);
}

function updateDataOperationControlEntry(
  updateDataOperationControlEntry2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let mappedUpdatePlatformSyncAndRoutingKeyEntry: Dynamic = (
    updatePlatformSyncAndRoutingKeys(updateDataOperationControlEntry2).get(
      options ?? PlatformSyncAndRoutingRoot,
    ) ?? []
  ).map(
    (
      updatePlatformSyncAndRoutingKeyEntry?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      id: updatePlatformSyncAndRoutingKeyEntry,
      entry: updateDataOperationControlEntry2.get(
        updatePlatformSyncAndRoutingKeyEntry,
      ),
      children: [],
    }),
  );
  let filteredMappedUpdatePlatformSyncAndRoutingKeyEntry: Dynamic =
    mappedUpdatePlatformSyncAndRoutingKeyEntry.filter(
      (
        mappedUpdatePlatformSyncAndRoutingKeyEntry2?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        mappedUpdatePlatformSyncAndRoutingKeyEntry2.entry.order === undefined,
    );
  if (filteredMappedUpdatePlatformSyncAndRoutingKeyEntry.length === 0)
    return null;
  filteredMappedUpdatePlatformSyncAndRoutingKeyEntry.sort(
    resolvePlatformSyncAndRoutingOrder,
  );
  let items: Dynamic = [];
  for (let updateDataOperationControlEntryResult of mappedUpdatePlatformSyncAndRoutingKeyEntry as Dynamic) {
    let order2: Dynamic = updateDataOperationControlEntryResult.entry.order;
    if (order2 !== undefined && dataOperationControlPattern2.test(order2)) {
      items.push(order2);
    }
  }
  let patch: Dynamic = [];
  let view: Dynamic = new (Map as Dynamic)(updateDataOperationControlEntry2);
  let order: Dynamic = resolvePlatformSyncAndRoutingValue28(items);
  for (let updateDataOperationControlEntryResult of filteredMappedUpdatePlatformSyncAndRoutingKeyEntry as Dynamic) {
    let record2: Dynamic = {
      ...updateDataOperationControlEntryResult.entry,
      order: order,
    };
    (patch.push as Dynamic)(
      ...resolvePlatformSyncAndRoutingPath3(
        updateDataOperationControlEntryResult.id,
        record2,
      ),
    );
    view.set(updateDataOperationControlEntryResult.id, record2);
    order = resolvePlatformSyncAndRoutingEndsWith(order, null);
  }
  return {
    patch: patch,
    view: view,
  };
}

function getDataOperationControlPatch(
  dataOperationControlPatch?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let updatePlatformSyncAndRoutingKeys2: Dynamic =
    updatePlatformSyncAndRoutingKeys(options);
  let getDataOperationControlPatchHandler: Dynamic = (
    dataOperationControlPatch2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    updatePlatformSyncAndRoutingKeys2.get(dataOperationControlPatch2) ?? [];
  if (context) {
    let platformSyncAndRoutingValue: Dynamic = getPlatformSyncAndRoutingValue(
      dataOperationControlPatch,
      options,
    );
    let patch: Dynamic = [];
    for (let getDataOperationControlPatchResult of getDataOperationControlPatchHandler(
      dataOperationControlPatch,
    ) as Dynamic) {
      let optionEntry: Dynamic =
        options.get(getDataOperationControlPatchResult) ?? {};
      let record2: Dynamic = {};
      if (optionEntry.name !== undefined) {
        record2.name = optionEntry.name;
      }
      if (optionEntry.order !== undefined) {
        record2.order = optionEntry.order;
      }
      if (platformSyncAndRoutingValue !== undefined) {
        record2.subtabOf = platformSyncAndRoutingValue;
      }
      (patch.push as Dynamic)(
        ...resolvePlatformSyncAndRoutingPath3(
          getDataOperationControlPatchResult,
          record2,
        ),
      );
    }
    (patch.push as Dynamic)(
      ...resolvePlatformSyncAndRoutingValue29(dataOperationControlPatch),
    );
    return {
      patch: patch,
      deleteFileIds: [dataOperationControlPatch],
    };
  }
  let deleteFileIds: Dynamic = [dataOperationControlPatch];
  let uniqueItems: Dynamic = new (Set as Dynamic)([dataOperationControlPatch]);
  for (let count: Dynamic = 0; count < deleteFileIds.length; count += 1)
    for (let getDataOperationControlPatchResult of getDataOperationControlPatchHandler(
      deleteFileIds[count],
    ) as Dynamic)
      if (!uniqueItems.has(getDataOperationControlPatchResult)) {
        uniqueItems.add(getDataOperationControlPatchResult);
        deleteFileIds.push(getDataOperationControlPatchResult);
      }
  return {
    patch: deleteFileIds.flatMap(resolvePlatformSyncAndRoutingValue29),
    deleteFileIds: deleteFileIds,
  };
}

function updateDataOperationControlTabs(
  updateDataOperationControlTabs2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let lookup: Dynamic = new (Map as Dynamic)(updateDataOperationControlTabs2);
  for (let operation of options as Dynamic)
    if (
      !(operation.path[0] !== `tabs` || typeof operation.path[1] != `string`)
    ) {
      if (operation.op === `delete`) {
        lookup.delete(operation.path[1]);
      } else {
        lookup.set(operation.path[1], operation.value);
      }
    }
  return lookup;
}

var resolveDataOperationControlSize: Dynamic;

var DataOperationControlMessage: string;

function getDataOperationControlEntry(
  dataOperationControlEntry?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dataOperationControlEntryEntry: Dynamic =
    dataOperationControlEntry.get(options);
  if (dataOperationControlEntryEntry === undefined) return null;
  let platformSyncAndRoutingValue: Dynamic = getPlatformSyncAndRoutingValue(
    options,
    dataOperationControlEntry,
  );
  let mappedUpdatePlatformSyncAndRoutingKeyEntry: Dynamic = (
    updatePlatformSyncAndRoutingKeys(dataOperationControlEntry).get(
      platformSyncAndRoutingValue ?? PlatformSyncAndRoutingRoot,
    ) ?? []
  ).map(
    (
      updatePlatformSyncAndRoutingKeyEntry?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      id: updatePlatformSyncAndRoutingKeyEntry,
      entry: dataOperationControlEntry.get(
        updatePlatformSyncAndRoutingKeyEntry,
      ),
      children: [],
    }),
  );
  mappedUpdatePlatformSyncAndRoutingKeyEntry.sort(
    resolvePlatformSyncAndRoutingOrder,
  );
  let mappedUpdatePlatformSyncAndRoutingKeyEntryIndex: Dynamic =
    mappedUpdatePlatformSyncAndRoutingKeyEntry.findIndex(
      (
        mappedUpdatePlatformSyncAndRoutingKeyEntry2?: Dynamic,
        ..._extraArguments: unknown[]
      ) => mappedUpdatePlatformSyncAndRoutingKeyEntry2.id === options,
    );
  let test: Dynamic = (
    dataOperationControlEntry2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let order: Dynamic =
      mappedUpdatePlatformSyncAndRoutingKeyEntry[dataOperationControlEntry2]
        ?.entry.order;
    return order !== undefined && dataOperationControlPattern.test(order)
      ? order
      : null;
  };
  let getDataOperationControlEntryResult: Dynamic = null;
  for (
    let mappedUpdatePlatformSyncAndRoutingKeyEntryIndex2: Dynamic =
      mappedUpdatePlatformSyncAndRoutingKeyEntryIndex;
    mappedUpdatePlatformSyncAndRoutingKeyEntryIndex2 >= 0 &&
    getDataOperationControlEntryResult === null;
    --mappedUpdatePlatformSyncAndRoutingKeyEntryIndex2
  )
    getDataOperationControlEntryResult = test(
      mappedUpdatePlatformSyncAndRoutingKeyEntryIndex2,
    );
  let getDataOperationControlEntryResult2: Dynamic = null;
  for (
    let total: Dynamic = mappedUpdatePlatformSyncAndRoutingKeyEntryIndex + 1;
    total < mappedUpdatePlatformSyncAndRoutingKeyEntry.length &&
    getDataOperationControlEntryResult2 === null;
    total += 1
  )
    getDataOperationControlEntryResult2 = test(total);
  if (
    getDataOperationControlEntryResult !== null &&
    getDataOperationControlEntryResult2 !== null &&
    getDataOperationControlEntryResult >= getDataOperationControlEntryResult2
  ) {
    getDataOperationControlEntryResult2 = null;
  }
  let record2: Dynamic = {
    name:
      (resolvePlatformSyncAndRoutingUntitled(
        dataOperationControlEntryEntry.name,
      )
        ? updateDataOperationControlChildren(
            updatePlatformSyncAndRoutingEntry(dataOperationControlEntry),
          ).get(options)
        : dataOperationControlEntryEntry.name) + DataOperationControlMessage,
    order: resolvePlatformSyncAndRoutingEndsWith(
      getDataOperationControlEntryResult,
      getDataOperationControlEntryResult2,
    ),
  };
  if (platformSyncAndRoutingValue !== undefined) {
    record2.subtabOf = platformSyncAndRoutingValue;
  }
  return record2;
}

function getDataOperationControlEntry2(
  dataOperationControlEntry2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let entry: Dynamic = dataOperationControlEntry2.get(options);
  if (entry === undefined || context === options || dependencies === options)
    return null;
  let updatePlatformSyncAndRoutingKeys2: Dynamic =
    updatePlatformSyncAndRoutingKeys(dataOperationControlEntry2);
  if (context !== undefined) {
    if (!dataOperationControlEntry2.has(context)) return null;
    let items: Dynamic = [options];
    let uniqueItems: Dynamic = new (Set as Dynamic)([options]);
    for (; items.length > 0; ) {
      let pop: Dynamic = items.pop();
      for (let getDataOperationControlEntry2Result3 of (updatePlatformSyncAndRoutingKeys2.get(
        pop,
      ) ?? []) as Dynamic) {
        if (getDataOperationControlEntry2Result3 === context) return null;
        if (!uniqueItems.has(getDataOperationControlEntry2Result3)) {
          uniqueItems.add(getDataOperationControlEntry2Result3);
          items.push(getDataOperationControlEntry2Result3);
        }
      }
    }
  }
  let mappedFilteredUpdatePlatformSyncAndRoutingKeyEntry: Dynamic = (
    updatePlatformSyncAndRoutingKeys2.get(
      context ?? PlatformSyncAndRoutingRoot,
    ) ?? []
  )
    .filter(
      (
        updatePlatformSyncAndRoutingKeyEntry?: Dynamic,
        ..._extraArguments: unknown[]
      ) => updatePlatformSyncAndRoutingKeyEntry !== options,
    )
    .map(
      (
        filteredUpdatePlatformSyncAndRoutingKeyEntry?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => ({
        id: filteredUpdatePlatformSyncAndRoutingKeyEntry,
        entry: dataOperationControlEntry2.get(
          filteredUpdatePlatformSyncAndRoutingKeyEntry,
        ),
        children: [],
      }),
    );
  mappedFilteredUpdatePlatformSyncAndRoutingKeyEntry.sort(
    resolvePlatformSyncAndRoutingOrder,
  );
  let mappedFilteredUpdatePlatformSyncAndRoutingKeyEntryCount: Dynamic =
    mappedFilteredUpdatePlatformSyncAndRoutingKeyEntry.length;
  if (dependencies !== undefined) {
    let mappedFilteredUpdatePlatformSyncAndRoutingKeyEntryIndex: Dynamic =
      mappedFilteredUpdatePlatformSyncAndRoutingKeyEntry.findIndex(
        (
          mappedFilteredUpdatePlatformSyncAndRoutingKeyEntry2?: Dynamic,
          ..._extraArguments: unknown[]
        ) =>
          mappedFilteredUpdatePlatformSyncAndRoutingKeyEntry2.id ===
          dependencies,
      );
    if (mappedFilteredUpdatePlatformSyncAndRoutingKeyEntryIndex >= 0) {
      mappedFilteredUpdatePlatformSyncAndRoutingKeyEntryCount =
        mappedFilteredUpdatePlatformSyncAndRoutingKeyEntryIndex;
    }
  }
  if (
    getPlatformSyncAndRoutingValue(options, dataOperationControlEntry2) ===
    context
  ) {
    let items: Dynamic = [
      {
        id: options,
        entry: entry,
        children: [],
      },
      ...mappedFilteredUpdatePlatformSyncAndRoutingKeyEntry,
    ];
    items.sort(resolvePlatformSyncAndRoutingOrder);
    let itemIndex: Dynamic = items.findIndex(
      (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
        rolldownNImport2.id === options,
    );
    if (
      (itemIndex + 1 < items.length ? items[itemIndex + 1].id : undefined) ===
      (mappedFilteredUpdatePlatformSyncAndRoutingKeyEntryCount <
      mappedFilteredUpdatePlatformSyncAndRoutingKeyEntry.length
        ? mappedFilteredUpdatePlatformSyncAndRoutingKeyEntry[
            mappedFilteredUpdatePlatformSyncAndRoutingKeyEntryCount
          ].id
        : undefined)
    )
      return null;
  }
  let updateDataOperationControlEntry2: Dynamic =
    updateDataOperationControlEntry(dataOperationControlEntry2, context);
  let dataOperationControlEntry22: Dynamic =
    updateDataOperationControlEntry2 === null
      ? dataOperationControlEntry2
      : updateDataOperationControlEntry2.view;
  let test: Dynamic = (
    dataOperationControlEntry23?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let id: Dynamic =
      mappedFilteredUpdatePlatformSyncAndRoutingKeyEntry[
        dataOperationControlEntry23
      ]?.id;
    let order: Dynamic =
      id === undefined ? undefined : dataOperationControlEntry22.get(id)?.order;
    return order !== undefined && dataOperationControlPattern.test(order)
      ? order
      : null;
  };
  let getDataOperationControlEntry2Result: Dynamic = null;
  for (
    let difference =
      mappedFilteredUpdatePlatformSyncAndRoutingKeyEntryCount - 1;
    difference >= 0 && getDataOperationControlEntry2Result === null;
    --difference
  )
    getDataOperationControlEntry2Result = test(difference);
  let getDataOperationControlEntry2Result2: Dynamic = null;
  for (
    let mappedFilteredUpdatePlatformSyncAndRoutingKeyEntryCount2: Dynamic =
      mappedFilteredUpdatePlatformSyncAndRoutingKeyEntryCount;
    mappedFilteredUpdatePlatformSyncAndRoutingKeyEntryCount2 <
      mappedFilteredUpdatePlatformSyncAndRoutingKeyEntry.length &&
    getDataOperationControlEntry2Result2 === null;
    mappedFilteredUpdatePlatformSyncAndRoutingKeyEntryCount2 += 1
  )
    getDataOperationControlEntry2Result2 = test(
      mappedFilteredUpdatePlatformSyncAndRoutingKeyEntryCount2,
    );
  if (
    getDataOperationControlEntry2Result !== null &&
    getDataOperationControlEntry2Result2 !== null &&
    getDataOperationControlEntry2Result >= getDataOperationControlEntry2Result2
  ) {
    getDataOperationControlEntry2Result2 = null;
  }
  let record2: Dynamic = {};
  if (entry.name !== undefined) {
    record2.name = entry.name;
  }
  if (context !== undefined) {
    record2.subtabOf = context;
  }
  record2.order = resolvePlatformSyncAndRoutingEndsWith(
    getDataOperationControlEntry2Result,
    getDataOperationControlEntry2Result2,
  );
  return [
    ...(updateDataOperationControlEntry2 === null
      ? []
      : updateDataOperationControlEntry2.patch.filter(
          (patch?: Dynamic, ..._extraArguments: unknown[]) =>
            patch.path[1] !== options,
        )),
    ...resolvePlatformSyncAndRoutingPath3(options, record2),
  ];
}

var resolveDataOperationControlValue: Dynamic;

function resolveDataOperationControlFields(
  dataOperationControlFields?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let plat: Dynamic =
    resolveObservabilityBrowserAndOperationEventsTest(options);
  return plat === undefined
    ? dataOperationControlFields
    : {
        ...dataOperationControlFields,
        fields: {
          ...dataOperationControlFields.fields,
          plat: plat,
        },
        wire: {
          word: plat,
        },
      };
}

function resolveDataOperationControlValue2(
  dataOperationControlValue2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  try {
    let dataOperationControlValue22: Dynamic = dataOperationControlValue2();
    if (dataOperationControlValue22 !== null) {
      emitTelemetryEvent(
        resolveDataOperationControlFields(
          dataOperationControlValue22,
          resolveObservabilityBrowserAndOperationEventsValue3(),
        ),
      );
    }
  } catch {}
}

function resolveDataOperationControlFields2(
  dataOperationControlFields2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let component = `display:pick:${dataOperationControlFields2}`;
  if (!Object.hasOwn(ObservabilityTelemetryFlatMap2, component)) return null;
  if (options === `allowed`)
    return {
      name: `pages.display.pick`,
      fields: {
        component: component,
      },
    };
  let label =
    options === `refused`
      ? `refused`
      : options === `notSent`
        ? `not_sent`
        : null;
  return label === null
    ? null
    : {
        name: `pages.display.refused`,
        fields: {
          component: `display:refused:${label}`,
        },
      };
}

var resolveDataOperationControlValue3: Dynamic;

function createPagesDisplayAutoEvent(
  pagesDisplayAutoEvent?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return `display:auto:${pagesDisplayAutoEvent}` !=
    `display:auto:tabs_place:left` || options !== `allowed`
    ? null
    : {
        name: `pages.display.auto`,
        fields: {
          component: ObservabilityTelemetryDisplayAutoTabsPlaceLeft,
        },
      };
}

var resolveDataOperationControlValue4: Dynamic;

var resolveDataOperationControlFields3: Dynamic;

function createPagesTocJumpEvent(
  pages: Dynamic = (..._extraArguments: unknown[]) => performance.now(),
  ..._extraArguments: unknown[]
): Dynamic {
  let activity: Dynamic = null;
  return (
    pages2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let NaN2: Dynamic = NaN;
    try {
      NaN2 = pages();
    } catch {}
    if (!options || activity?.id !== pages2 || NaN2 - activity.at >= 1e4) {
      resolveDataOperationControlValue2((..._extraArguments: unknown[]) => ({
        name: `pages.toc.jump`,
        fields: {
          component: `toc:jump`,
        },
      }));
    }
    activity = options
      ? null
      : {
          id: pages2,
          at: NaN2,
        };
  };
}

function createPagesHeadingFoldEvent(
  pagesHeadingFoldEvent?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let label = options.some(
    (rolldownRImport2?: Dynamic, ..._extraArguments: unknown[]) =>
      !pagesHeadingFoldEvent.includes(rolldownRImport2),
  )
    ? `fold`
    : pagesHeadingFoldEvent.some(
          (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
            !options.includes(rolldownNImport2),
        )
      ? `unfold`
      : null;
  return label === null
    ? null
    : {
        name: `pages.heading.fold`,
        fields: {
          component: `heading:${label}`,
        },
      };
}

var resolveDataOperationControlValue5: Dynamic;

var resolveDataOperationControlTest: Dynamic;

var resolveDataOperationControlSlug: Dynamic;

var resolveDataOperationControlSlug2: Dynamic;

var collectDataOperationControlTitle: Dynamic;

function resolveDataOperationControlValue6(
  dataOperationControlValue6?: unknown,
  ..._extraArguments: unknown[]
) {
  return (
    typeof dataOperationControlValue6 == `object` &&
    !!dataOperationControlValue6 &&
    !Array.isArray(dataOperationControlValue6)
  );
}

var dataOperationControlValue2048: number;

var resolveDataOperationControlValue7: Dynamic;

var dataOperationControlPattern3: RegExp;

var resolveDataOperationControlReplace: Dynamic;

var dataOperationControlPattern4: RegExp;

var resolveDataOperationControlJoin: Dynamic;

function resolveDataOperationControlLevel(
  dataOperationControlLevel?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    !resolveDataOperationControlValue6(dataOperationControlLevel) ||
    !Array.isArray(dataOperationControlLevel.headings) ||
    dataOperationControlLevel.headings.length > 200
  )
    return null;
  let headings: Dynamic = [];
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let enabled = false;
  for (let [
    resolveDataOperationControlLevelResult,
    resolveDataOperationControlLevelResult2,
  ] of dataOperationControlLevel.headings.entries() as Dynamic) {
    if (
      !resolveDataOperationControlValue6(
        resolveDataOperationControlLevelResult2,
      )
    )
      return null;
    let {
      level: level,
      text: resolveDataOperationControlLevelResult3,
      slug: slug,
      bid: bid,
    }: Dynamic = resolveDataOperationControlLevelResult2;
    if (
      typeof level != `number` ||
      !Number.isInteger(level) ||
      level < 1 ||
      level > 6 ||
      typeof resolveDataOperationControlLevelResult3 != `string` ||
      typeof slug != `string` ||
      !resolveDataOperationControlTest(slug)
    )
      return null;
    let replace = resolveDataOperationControlLevelResult3
      .slice(0, dataOperationControlValue2048)
      .replace(/[\uD800-\uDBFF]$/, ``);
    if (
      replace.trim() === `` ||
      (bid !== undefined &&
        (typeof bid != `string` ||
          !platformSessionAndSourcesPattern20.test(bid)))
    )
      return null;
    let text: Dynamic = resolveDataOperationControlJoin(
      resolveDataOperationControlReplace(
        resolveDataOperationControlValue7(replace),
      )
        .replace(platformSessionAndSourcesPattern12, ``)
        .trim(),
      120,
    );
    if (!dataOperationControlPattern4.test(text)) continue;
    let record2: Dynamic = {
      level: level,
      text: text,
      slug: slug,
      ...(bid !== undefined && {
        bid: bid,
      }),
    };
    if (!uniqueItems.has(resolveDataOperationControlSlug(record2))) {
      uniqueItems.add(resolveDataOperationControlSlug(record2));
      headings.push(record2);
      if (resolveDataOperationControlLevelResult === 0) {
        enabled = true;
      }
    }
  }
  return {
    headings: headings,
    title: dataOperationControlLevel.title === true && enabled,
  };
}

function resolveDataOperationControlTest2(
  dataOperationControlTest2?: unknown,
  ..._extraArguments: unknown[]
) {
  if (dataOperationControlTest2 == null) return null;
  if (typeof dataOperationControlTest2 == `string`)
    return platformSessionAndSourcesPattern20.test(dataOperationControlTest2) ||
      (dataOperationControlTest2.startsWith(`~`) &&
        resolveDataOperationControlTest(dataOperationControlTest2.slice(1)))
      ? dataOperationControlTest2
      : undefined;
}

function resolveDataOperationControlOutline(
  dataOperationControlOutline?: Dynamic,
  activity?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!dataOperationControlOutline) return null;
  if (activity.type === `outline`) {
    let outline: Dynamic = resolveDataOperationControlLevel(activity);
    return outline === null
      ? null
      : {
          outline: outline,
        };
  }
  let dataOperationControlTest2 = resolveDataOperationControlTest2(activity.at);
  return dataOperationControlTest2 === undefined
    ? null
    : {
        at: dataOperationControlTest2,
        byPerson: activity.user === true,
      };
}

function isDataOperationControlIndent(
  dataOperationControlIndent?: Dynamic,
  options: Dynamic = 3,
  ..._extraArguments: unknown[]
): Dynamic {
  let filteredHeadings: Dynamic = dataOperationControlIndent.headings.filter(
    (heading?: Dynamic, index?: Dynamic, ..._extraArguments: unknown[]) =>
      !(dataOperationControlIndent.title && index === 0) &&
      heading.level <= options,
  );
  let reduce: Dynamic = filteredHeadings.reduce(
    (
      accumulator?: Dynamic,
      filteredHeading?: Dynamic,
      ..._extraArguments: unknown[]
    ) => Math.min(accumulator, filteredHeading.level),
    6,
  );
  let mappedFilteredHeadings: Dynamic = filteredHeadings.map(
    (filteredHeading?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
      h: filteredHeading,
      id: resolveDataOperationControlSlug(filteredHeading),
      indent: filteredHeading.level - reduce,
      title: false,
    }),
  );
  let headingItem: Dynamic = dataOperationControlIndent.headings[0];
  if (dataOperationControlIndent.title && headingItem) {
    mappedFilteredHeadings.unshift({
      h: headingItem,
      id: resolveDataOperationControlSlug(headingItem),
      indent: 0,
      title: true,
    });
  }
  return mappedFilteredHeadings;
}

function collectDataOperationControlFindIndex(
  collectDataOperationControlFindIndex2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (context === null) return null;
  let uniqueItems: Dynamic = new (Set as Dynamic)(
    collectDataOperationControlFindIndex2.map(
      (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        rolldownNImport2.id,
    ),
  );
  let headingIndex: Dynamic = options.headings.findIndex(
    (heading?: Dynamic, ..._extraArguments: unknown[]) =>
      resolveDataOperationControlSlug(heading) === context,
  );
  for (
    let headingIndex2: Dynamic = headingIndex;
    headingIndex2 >= 0;
    headingIndex2--
  ) {
    let dataOperationControlSlug: Dynamic = resolveDataOperationControlSlug(
      options.headings[headingIndex2],
    );
    if (uniqueItems.has(dataOperationControlSlug))
      return dataOperationControlSlug;
  }
  return null;
}

var resolveDataOperationControlValue8: Dynamic;

function collectDataOperationControlPos(
  collectDataOperationControlPos2?: Dynamic,
  options: Dynamic = 0,
  ..._extraArguments: unknown[]
): Dynamic {
  let mappedCollectDataOperationControlPos: Dynamic =
    collectDataOperationControlPos2.map(
      (
        collectDataOperationControlPo?: Dynamic,
        index?: Dynamic,
        ..._extraArguments: unknown[]
      ) => {
        for (let difference = index - 1; difference >= 0; difference--)
          if (
            collectDataOperationControlPos2[difference].indent <
            collectDataOperationControlPo.indent
          )
            return difference;
        return -1;
      },
    );
  return collectDataOperationControlPos2.map(
    (
      collectDataOperationControlPo?: Dynamic,
      index?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let flatMap: Dynamic = collectDataOperationControlPos2.flatMap(
        (
          rolldownNImport2?: Dynamic,
          index2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          mappedCollectDataOperationControlPos[index2] ===
            mappedCollectDataOperationControlPos[index] &&
          rolldownNImport2.indent === collectDataOperationControlPo.indent
            ? [index2]
            : [],
      );
      let matchesMappedCollectDataOperationControlPoItem =
        mappedCollectDataOperationControlPos[index] === -1 &&
        collectDataOperationControlPo.indent === 0;
      return {
        size:
          flatMap.length +
          (matchesMappedCollectDataOperationControlPoItem ? options : 0),
        pos: flatMap.indexOf(index) + 1,
      };
    },
  );
}

var resolveDataOperationControlGetRandomValues: Dynamic;

var collectDataOperationControlJoin: Dynamic;

var dataOperationControlParagraphBlockquoteListListItemValues: string[];

var dataOperationControlSet: Dynamic;

var BlockIdExtension: Dynamic;

function resolveDataOperationControlSess(
  dataOperationControlSess?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dataOperationControlSess2: Dynamic = dataOperationControlSess;
  if (
    typeof dataOperationControlSess2 != `object` ||
    !dataOperationControlSess2
  )
    return null;
  let id: Dynamic =
    typeof dataOperationControlSess2.id == `string`
      ? dataOperationControlSess2.id
      : typeof dataOperationControlSess2.atom?.id == `string`
        ? dataOperationControlSess2.atom.id
        : null;
  let editorExtensionsSess: Dynamic =
    id === null ? null : resolveEditorExtensionsSess(id);
  if (!editorExtensionsSess) return null;
  let editorExtensionsValue21 =
    typeof dataOperationControlSess2.text == `string`
      ? resolveEditorExtensionsValue21(dataOperationControlSess2.text)
      : 0;
  return {
    sess: editorExtensionsSess.sess,
    i: editorExtensionsSess.i,
    len: dataOperationControlSess2.atom
      ? 1
      : typeof dataOperationControlSess2.text == `string` &&
          dataOperationControlSess2.more !== true
        ? editorExtensionsValue21
        : null,
    shown: dataOperationControlSess2.atom
      ? 1
      : Math.max(1, editorExtensionsValue21),
  };
}

function resolveDataOperationControlSess2(
  dataOperationControlSess2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let blocks: Dynamic = dataOperationControlSess2?.blocks;
  if (options === `` || !Array.isArray(blocks)) return -1;
  let resolveDataOperationControlSess2Result = -1;
  for (let resolveDataOperationControlSess2Result2 of blocks as Dynamic) {
    if (
      typeof resolveDataOperationControlSess2Result2 != `object` ||
      !resolveDataOperationControlSess2Result2
    )
      continue;
    let editorExtensionsSess: Dynamic =
      typeof resolveDataOperationControlSess2Result2.id == `string`
        ? resolveEditorExtensionsSess(
            resolveDataOperationControlSess2Result2.id,
          )
        : null;
    if (editorExtensionsSess && editorExtensionsSess.sess === options) {
      resolveDataOperationControlSess2Result = Math.max(
        resolveDataOperationControlSess2Result,
        editorExtensionsSess.i,
      );
    }
    if (Array.isArray(resolveDataOperationControlSess2Result2.runs))
      for (let resolveDataOperationControlSess2Result3 of resolveDataOperationControlSess2Result2.runs as Dynamic) {
        let dataOperationControlSess: Dynamic = resolveDataOperationControlSess(
          resolveDataOperationControlSess2Result3,
        );
        if (
          dataOperationControlSess &&
          dataOperationControlSess.sess === options
        ) {
          resolveDataOperationControlSess2Result = Math.max(
            resolveDataOperationControlSess2Result,
            dataOperationControlSess.i + dataOperationControlSess.shown - 1,
          );
        }
      }
  }
  return resolveDataOperationControlSess2Result;
}

var DataOperationControlUnclassed: string;

var dataOperationControlSet2: Dynamic;

var resolveDataOperationControlValue9: Dynamic;

var dataOperationControlSet3: Dynamic;

var DataOperationControlReseatFailed: Dynamic;

var resolveDataOperationControlHasOwn: Dynamic;

var DataOperationControlNodeGone: Dynamic;

var DataOperationControlStyles: string;

function resolveDataOperationControlState(
  dataOperationControlState?: unknown,
  ..._extraArguments: unknown[]
) {
  if (
    typeof dataOperationControlState != `object` ||
    !dataOperationControlState
  )
    return null;
  let dataOperationControlState2: Dynamic = dataOperationControlState;
  return dataOperationControlState2.t !== `state` ||
    dataOperationControlState2.state !== `readonly` ||
    dataOperationControlState2.openFailed === true ||
    dataOperationControlState2.retrying === true ||
    dataOperationControlState2.openBusy === true
    ? null
    : dataOperationControlState2.pageGone === true
      ? `page_gone`
      : dataOperationControlState2.viewOnly === true
        ? null
        : dataOperationControlState2.readsRefused === true
          ? `reads_refused`
          : dataOperationControlState2.waiting === true
            ? `one_order`
            : dataOperationControlState2.halt === true
              ? dataOperationControlState2.words ===
                DataOperationControlNodeGone
                ? `node_gone`
                : `too_large`
              : typeof dataOperationControlState2.words != `string` ||
                  !dataOperationControlState2.words.includes(` `)
                ? null
                : dataOperationControlState2.words ===
                    DataOperationControlStyles
                  ? `too_large`
                  : DataOperationControlUnclassed;
}

function createPagesFaceReadOnlyEvent(
  pagesFaceReadOnlyEvent?: Dynamic,
  options?: unknown,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let key: Dynamic = resolveDataOperationControlValue9(pagesFaceReadOnlyEvent);
  let editors =
    typeof options == `string` && dataOperationControlSet3.has(options)
      ? options
      : undefined;
  let plat: Dynamic =
    resolveObservabilityBrowserAndOperationEventsTest(context);
  return {
    name: `pages.face.read_only`,
    key: key,
    fields: {
      why: key,
      component: `read_only:${key}`,
      ...(editors !== undefined && {
        editors: editors,
      }),
      ...(plat !== undefined && {
        plat: plat,
      }),
    },
    ...(plat !== undefined && {
      wire: {
        word: plat,
      },
    }),
  };
}

function resolveDataOperationControlValue10(
  dataOperationControlValue10?: Dynamic,
  options: Dynamic = Date.now(),
  ..._extraArguments: unknown[]
): undefined {
  try {
    emitTelemetryEvent(
      createPagesFaceReadOnlyEvent(
        dataOperationControlValue10,
        resolvePlatformKeyboardAndSaveStatusValue8(),
        resolveObservabilityBrowserAndOperationEventsValue3(),
      ),
      undefined,
      options,
    );
  } catch {}
}

function resolveDataOperationControlValue11(
  dataOperationControlValue11?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let dataOperationControlHasOwn: Dynamic = resolveDataOperationControlHasOwn(
    dataOperationControlValue11,
  );
  if (dataOperationControlHasOwn !== null) {
    resolveDataOperationControlValue10(dataOperationControlHasOwn, options);
  }
}

function resolveDataOperationControlValue12(
  dataOperationControlValue12?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let dataOperationControlState = resolveDataOperationControlState(
    dataOperationControlValue12,
  );
  if (dataOperationControlState !== null) {
    resolveDataOperationControlValue10(dataOperationControlState, options);
  }
}

var DataOperationControlProse: string;

var isOperationRecord: Dynamic;

var dataOperationControlIfRevIfHashValues: string[];

var dataOperationControlPattern5: RegExp;

var resolveDataOperationControlDelete: Dynamic;

var DataOperationControlAllowDetach: string;

var dataOperationControlSet4: Dynamic;

var resolveDataOperationControlValue14: Dynamic;

function resolveDataOperationControlAllowDetach(
  dataOperationControlAllowDetach?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return resolveDataOperationControlValue14(dataOperationControlAllowDetach) &&
    dataOperationControlAllowDetach.allowDetach !== true
    ? {
        ...dataOperationControlAllowDetach,
        [DataOperationControlAllowDetach]: true,
      }
    : dataOperationControlAllowDetach;
}

var dataOperationControlAddBlockDelBlockMoveAttrValues: string[];

var DataOperationControlEditorOpError: Dynamic;

var resolveDataOperationControlTarget: Dynamic;

var filterDataOperationControlTarget: Dynamic;

var resolveDataOperationControlTarget2: Dynamic;

var resolveDataOperationControlSource: Dynamic;

var DataOperationControlState: Dynamic;

var resolveDataOperationControlValue15: Dynamic;

var resolveDataOperationControlType: Dynamic;

var resolveDataOperationControlRange: Dynamic;

var resolveDataOperationControlItem: Dynamic;

var filterDataOperationControlFilter: Dynamic;

var collectDataOperationControlBlock: Dynamic;

var resolveDataOperationControlBlock: Dynamic;

var resolveDataOperationControlBlock2: Dynamic;

var DataOperationControlStyles2: string;

var DataOperationControlStyles3: string;

var DataOperationControlFamily: Dynamic;

var DataOperationControlFamily2: Dynamic;

var DataOperationControlFamily3: Dynamic;

function resolveDataOperationControlWrapFinal(
  dataOperationControlWrapFinal?: Dynamic,
  options: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let dataOperationControlWrapFinal2: Dynamic = dataOperationControlWrapFinal;
  return options.wrapFinal &&
    DataOperationControlFamily3.is(dataOperationControlWrapFinal2)
    ? DataOperationControlFamily3
    : (DataOperationControlFamily.find(
        (
          DataOperationControlFamily4?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          DataOperationControlFamily4.is(dataOperationControlWrapFinal2),
      ) ?? DataOperationControlFamily2);
}

var resolveDataOperationControlValue16: Dynamic;

var resolveDataOperationControlBlocks: Dynamic;

var resolveDataOperationControlChars: Dynamic;

var resolveDataOperationControlKind: Dynamic;

var resolveDataOperationControlKind2: Dynamic;

var resolveDataOperationControlAllowDetach2: Dynamic;

var isDataOperationControlTarget: Dynamic;

function isDataOperationControlTarget2(
  post?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  switch (post.op) {
    case `block_split`: {
      if (!resolveDataOperationControlValue16(post.at)) return post;
      let ids: Dynamic = [post.item, post.id].filter(
        resolveDataOperationControlValue16,
      );
      return {
        op: `split`,
        target: resolveDataOperationControlKind2(post.at, post.at),
        side: post.side === `before` ? `before` : `after`,
        ...(ids.length > 0
          ? {
              ids: ids,
            }
          : {}),
        ...(post.tail === undefined
          ? {}
          : {
              tail: post.tail,
            }),
      };
    }
    case `block_join`: {
      let block: Dynamic =
        Array.isArray(post.block) &&
        post.block.every(resolveDataOperationControlValue16)
          ? post.block
          : resolveDataOperationControlBlocks(post.block);
      return !block || block.length !== 2
        ? post
        : resolveDataOperationControlAllowDetach2(post, {
            op: `join`,
            target: resolveDataOperationControlKind(block),
            ...(post.dir === `forward` || post.dir === `backward`
              ? {
                  dir: post.dir,
                }
              : {}),
          });
    }
    case `block_move`: {
      let dataOperationControlBlocks: Dynamic =
        resolveDataOperationControlBlocks(post.block);
      if (!dataOperationControlBlocks) return post;
      let resolveDataOperationControlKind4: Dynamic = (
        dataOperationControlTarget2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        dataOperationControlTarget2 === `root`
          ? {
              kind: `root`,
            }
          : resolveDataOperationControlKind([dataOperationControlTarget2]);
      let record2: Dynamic =
        resolveDataOperationControlValue16(post.parent) &&
        (post.after === `head` ||
          post.after === undefined ||
          post.after === `end`) &&
        post.before === undefined
          ? {
              target: resolveDataOperationControlKind4(post.parent),
              side: post.after === `head` ? `start` : `end`,
            }
          : resolveDataOperationControlValue16(post.after) &&
              post.after !== `head` &&
              post.after !== `end`
            ? {
                target: resolveDataOperationControlKind4(post.after),
                side: `after`,
              }
            : resolveDataOperationControlValue16(post.before)
              ? {
                  target: resolveDataOperationControlKind4(post.before),
                  side: `before`,
                }
              : null;
      return record2
        ? resolveDataOperationControlAllowDetach2(post, {
            op: `move`,
            target: resolveDataOperationControlKind(dataOperationControlBlocks),
            to: record2,
            ...(resolveDataOperationControlValue16(post.id)
              ? {
                  ids: [post.id],
                }
              : {}),
          })
        : post;
    }
    case `wrap`: {
      if (
        !isDataOperationControlTarget(post) ||
        !isOperationRecord(post.in) ||
        (post.members !== undefined &&
          !(
            Array.isArray(post.members) &&
            post.members.every(resolveDataOperationControlValue16) &&
            post.members.length > 0
          ))
      )
        return post;
      let matchesMembers =
        post.members === undefined && post.block === undefined;
      if (matchesMembers && !resolveDataOperationControlValue16(post.to))
        return post;
      let members: Dynamic = Array.isArray(post.members)
        ? post.members
        : resolveDataOperationControlBlocks(
            matchesMembers ? post.from : post.block,
          );
      if (!members) return post;
      let thru: Dynamic =
        matchesMembers && post.to !== members[0] ? post.to : undefined;
      let ids: Dynamic = Array.isArray(post.ids)
        ? post.ids.filter(resolveDataOperationControlValue16)
        : [];
      return {
        op: `wrap`,
        target: resolveDataOperationControlKind(members),
        ...(thru === undefined
          ? {}
          : {
              thru: thru,
            }),
        in: post.in,
        ...(ids.length > 0
          ? {
              ids: ids,
            }
          : {}),
      };
    }
    case `unwrap`: {
      if (!isDataOperationControlTarget(post)) return post;
      let dataOperationControlBlocks: Dynamic =
        resolveDataOperationControlBlocks(post.block);
      return dataOperationControlBlocks
        ? resolveDataOperationControlAllowDetach2(post, {
            op: `unwrap`,
            target: resolveDataOperationControlKind(dataOperationControlBlocks),
            ...(resolveDataOperationControlValue16(post.id)
              ? {
                  ids: [post.id],
                }
              : {}),
          })
        : post;
    }
    case `mark`: {
      let dataOperationControlChars: Dynamic = resolveDataOperationControlChars(
        post.range,
      );
      if (
        !dataOperationControlChars ||
        !resolveDataOperationControlValue16(post.style) ||
        typeof post.on != `boolean`
      )
        return post;
      let record2: Dynamic = {
        type: post.style,
        ...(isOperationRecord(post.attrs) && Object.keys(post.attrs).length > 0
          ? {
              attrs: post.attrs,
            }
          : {}),
      };
      return {
        op: `format`,
        target: resolveDataOperationControlKind2(
          dataOperationControlChars[0],
          dataOperationControlChars[1],
        ),
        [post.on ? `add` : `remove`]: [record2],
      };
    }
    case `attr`: {
      if (!isOperationRecord(post.set)) return post;
      let target: Dynamic = resolveDataOperationControlValue16(post.at)
        ? resolveDataOperationControlKind2(post.at, post.at)
        : ((..._extraArguments: unknown[]): Dynamic => {
            let dataOperationControlBlocks: Dynamic =
              resolveDataOperationControlBlocks(post.block);
            return dataOperationControlBlocks
              ? resolveDataOperationControlKind(dataOperationControlBlocks)
              : null;
          })();
      return target
        ? resolveDataOperationControlAllowDetach2(post, {
            op: `set`,
            target: target,
            attrs: post.set,
          })
        : post;
    }
    case `block_del`: {
      let dataOperationControlBlocks: Dynamic =
        resolveDataOperationControlBlocks(post.block);
      return dataOperationControlBlocks
        ? resolveDataOperationControlAllowDetach2(post, {
            op: `delete`,
            target: resolveDataOperationControlKind(dataOperationControlBlocks),
          })
        : post;
    }
    default:
      return post;
  }
}

var dataOperationControlPattern6: RegExp;

function isDataOperationControlFrom(
  dataOperationControl?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let isDataOperationControlFromResult: Dynamic;
  let isDataOperationControlFromResult2: Dynamic;
  let isDataOperationControlFromResult3: Dynamic;
  let isDataOperationControlFromResult4: Dynamic;
  if (isOperationRecord(dataOperationControl)) {
    let match = resolveDataOperationControlValue16(dataOperationControl.from)
      ? dataOperationControlPattern6.exec(dataOperationControl.from)
      : null;
    let number2 = Number(dataOperationControl.len);
    if (
      !match ||
      match[3] !== undefined ||
      !Number.isInteger(number2) ||
      number2 < 1
    )
      return null;
    [
      isDataOperationControlFromResult,
      isDataOperationControlFromResult2,
      isDataOperationControlFromResult3,
      isDataOperationControlFromResult4,
    ] = [match[1], Number(match[2]), 0, number2 - 1];
  } else {
    let match = resolveDataOperationControlValue16(dataOperationControl)
      ? dataOperationControlPattern6.exec(dataOperationControl)
      : null;
    if (!match) return null;
    [isDataOperationControlFromResult, isDataOperationControlFromResult2] = [
      match[1],
      Number(match[2]),
    ];
    isDataOperationControlFromResult3 =
      match[3] === undefined ? 0 : Number(match[3]);
    isDataOperationControlFromResult4 =
      match[4] === undefined
        ? isDataOperationControlFromResult3
        : Number(match[4]);
  }
  return !Number.isSafeInteger(
    isDataOperationControlFromResult2 + isDataOperationControlFromResult4,
  ) ||
    isDataOperationControlFromResult4 < isDataOperationControlFromResult3 ||
    isDataOperationControlFromResult4 - isDataOperationControlFromResult3 + 1 >
      4096
    ? null
    : [
        `${isDataOperationControlFromResult}.${isDataOperationControlFromResult2 + isDataOperationControlFromResult3}`,
        `${isDataOperationControlFromResult}.${isDataOperationControlFromResult2 + isDataOperationControlFromResult4}`,
      ];
}

function resolveDataOperationControlTarget3(
  operation?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    operation.op !== `text` ||
    !resolveDataOperationControlValue16(operation.block) ||
    (operation.alg !== undefined && operation.alg !== `seq1`) ||
    !Array.isArray(operation.text) ||
    operation.text.length === 0
  )
    return null;
  let items: Dynamic = [];
  for (let resolveDataOperationControlTarget3Result of operation.text as Dynamic) {
    if (!isOperationRecord(resolveDataOperationControlTarget3Result))
      return null;
    if (resolveDataOperationControlTarget3Result.del !== undefined) {
      if (
        !Array.isArray(resolveDataOperationControlTarget3Result.del) ||
        resolveDataOperationControlTarget3Result.del.length === 0
      )
        return null;
      let runs: Dynamic = [];
      for (let resolveDataOperationControlTarget3Result2 of resolveDataOperationControlTarget3Result.del as Dynamic) {
        let isDataOperationControlFrom2 = isDataOperationControlFrom(
          resolveDataOperationControlTarget3Result2,
        );
        if (!isDataOperationControlFrom2) return null;
        runs.push(isDataOperationControlFrom2);
      }
      items.push(
        resolveDataOperationControlAllowDetach2(operation, {
          op: `delete`,
          target: {
            kind: `chars`,
            runs: runs,
          },
        }),
      );
      continue;
    }
    if (
      !resolveDataOperationControlValue16(
        resolveDataOperationControlTarget3Result.id,
      ) ||
      typeof resolveDataOperationControlTarget3Result.ins != `string` ||
      resolveDataOperationControlTarget3Result.ins.length === 0
    )
      return null;
    let match = dataOperationControlPattern6.exec(
      resolveDataOperationControlTarget3Result.id,
    );
    if (!match || match[3] !== undefined) return null;
    let count = [...resolveDataOperationControlTarget3Result.ins].length;
    let [target, side]: Dynamic = resolveDataOperationControlValue16(
      resolveDataOperationControlTarget3Result.after,
    )
      ? [
          resolveDataOperationControlKind2(
            resolveDataOperationControlTarget3Result.after,
            resolveDataOperationControlTarget3Result.after,
          ),
          `after`,
        ]
      : resolveDataOperationControlValue16(
            resolveDataOperationControlTarget3Result.before,
          )
        ? [
            resolveDataOperationControlKind2(
              resolveDataOperationControlTarget3Result.before,
              resolveDataOperationControlTarget3Result.before,
            ),
            `before`,
          ]
        : [resolveDataOperationControlKind([operation.block]), `start`];
    items.push({
      op: `insert`,
      target: target,
      side: side,
      source: {
        from: {
          kind: `inline`,
          content: resolveDataOperationControlTarget3Result.ins,
        },
        as: `text`,
      },
      ids: {
        from: resolveDataOperationControlTarget3Result.id,
        count: count,
      },
    });
  }
  return items;
}

function resolveDataOperationControlOps(
  dataOperationControlOps?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let ops: Dynamic = [];
  let from: Dynamic = [];
  dataOperationControlOps.forEach(
    (
      rolldownNImport2?: Dynamic,
      index?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let dataOperationControlTarget3: Dynamic = isOperationRecord(
        rolldownNImport2,
      )
        ? resolveDataOperationControlTarget3(rolldownNImport2)
        : null;
      for (let resolveDataOperationControlOpsResult of (dataOperationControlTarget3 ?? [
        isOperationRecord(rolldownNImport2)
          ? isDataOperationControlTarget2(rolldownNImport2)
          : rolldownNImport2,
      ]) as Dynamic) {
        ops.push(resolveDataOperationControlOpsResult);
        from.push(index);
      }
    },
  );
  return {
    ops: ops,
    from: from,
  };
}

function resolveDataOperationControlFind(
  event?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (isOperationRecord(event.target) && event.target.kind === `find`)
    throw new (DataOperationControlEditorOpError as Dynamic)(
      `find_target`,
      options,
      `target`,
    );
  let to: Dynamic = isOperationRecord(event.to) ? event.to : undefined;
  if (to && isOperationRecord(to.target) && to.target.kind === `find`)
    throw new (DataOperationControlEditorOpError as Dynamic)(
      `find_target`,
      options,
      `to.target`,
    );
}

function resolveDataOperationControlIfHash(
  dataOperationControlIfHash?: Dynamic,
  options: Dynamic = 0,
  ..._extraArguments: unknown[]
): Dynamic {
  let dataOperationControlIfHash2: Dynamic = dataOperationControlIfHash;
  resolveDataOperationControlFind(dataOperationControlIfHash2, options);
  if (
    !dataOperationControlIfRevIfHashValues.some(
      (
        dataOperationControlIfRevIfHashValue?: Dynamic,
        ..._extraArguments: unknown[]
      ) => dataOperationControlIfRevIfHashValue in dataOperationControlIfHash2,
    )
  )
    return dataOperationControlIfHash2;
  let label = resolveDataOperationControlDelete(dataOperationControlIfHash2)
    ? `ifHash`
    : null;
  if (
    label !== null &&
    dataOperationControlIfRevIfHashValues.every(
      (
        dataOperationControlIfRevIfHashValue?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        dataOperationControlIfRevIfHashValue === label ||
        !(dataOperationControlIfRevIfHashValue in dataOperationControlIfHash2),
    )
  )
    return dataOperationControlIfHash2;
  let record2: Dynamic = {};
  for (let [
    resolveDataOperationControlIfHashResult,
    resolveDataOperationControlIfHashResult2,
  ] of Object.entries(dataOperationControlIfHash2) as Dynamic)
    if (
      resolveDataOperationControlIfHashResult === label ||
      !dataOperationControlIfRevIfHashValues.includes(
        resolveDataOperationControlIfHashResult,
      )
    ) {
      record2[resolveDataOperationControlIfHashResult] =
        resolveDataOperationControlIfHashResult2;
    }
  return record2;
}

var dataOperationControlPattern7: RegExp;

function filterDataOperationControlOps(
  filterDataOperationControlOps2?: Dynamic,
  options: Dynamic = [],
  context: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let record2: Dynamic = {
    ops: [],
    from: [],
    row: [],
  };
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let isOperationRecord2: Dynamic = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let range: Dynamic =
      isOperationRecord(event.target) &&
      event.target.kind === `chars` &&
      Array.isArray(event.target.range)
        ? event.target.range
        : [];
    return (
      event.op === `format` &&
      range.some(
        (range2?: unknown, ..._extraArguments: unknown[]): Dynamic =>
          typeof range2 == `string` && uniqueItems.has(range2),
      )
    );
  };
  filterDataOperationControlOps2.forEach(
    (
      rolldownNImport2?: Dynamic,
      index?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let dataOperationControlAllowDetach: Dynamic =
        resolveDataOperationControlAllowDetach(
          resolveDataOperationControlIfHash(rolldownNImport2, index),
        );
      let dataOperationControlWrapFinal: Dynamic =
        resolveDataOperationControlWrapFinal(
          dataOperationControlAllowDetach,
          context,
        );
      let filteredOptionItem: Dynamic = (options[index] ?? []).filter(
        (optionItem?: unknown, ..._extraArguments: unknown[]) =>
          typeof optionItem == `string` &&
          !dataOperationControlPattern7.test(optionItem),
      );
      let items: Dynamic =
        dataOperationControlWrapFinal.family === `format` &&
        isOperationRecord2(dataOperationControlAllowDetach)
          ? [dataOperationControlAllowDetach]
          : dataOperationControlWrapFinal.spell(
              dataOperationControlAllowDetach,
              filteredOptionItem,
            );
      if (dataOperationControlAllowDetach.op !== `format`) {
        for (let filterDataOperationControlOpsResult of filteredOptionItem as Dynamic)
          uniqueItems.add(filterDataOperationControlOpsResult);
        let ids: Dynamic = dataOperationControlAllowDetach.ids;
        if (Array.isArray(ids)) {
          for (let filterDataOperationControlOpsResult of ids as Dynamic)
            if (typeof filterDataOperationControlOpsResult == `string`) {
              uniqueItems.add(filterDataOperationControlOpsResult);
            }
        } else if (
          isOperationRecord(ids) &&
          typeof ids.from == `string` &&
          typeof ids.count == `number`
        ) {
          let lastIndexOf: Dynamic = ids.from.lastIndexOf(`.`);
          let number2 = Number(ids.from.slice(lastIndexOf + 1));
          if (lastIndexOf > 0 && Number.isInteger(number2))
            for (let index2 = 0; index2 < Math.min(ids.count, 4096); index2++)
              uniqueItems.add(
                `${ids.from.slice(0, lastIndexOf)}.${number2 + index2}`,
              );
        }
      }
      let matchesSpelling =
        dataOperationControlWrapFinal.spelling === `row` &&
        !(items.length === 1 && items[0] === dataOperationControlAllowDetach);
      for (let filterDataOperationControlOpsResult of items as Dynamic) {
        record2.ops.push(filterDataOperationControlOpsResult);
        record2.from.push(index);
        record2.row.push(matchesSpelling);
      }
    },
  );
  return record2;
}

function resolveDataOperationControlSpell(
  dataOperationControlSpell?: Dynamic,
  ..._extraArguments: unknown[]
) {
  try {
    let dataOperationControlIfHash: Dynamic = resolveDataOperationControlIfHash(
      dataOperationControlSpell,
      0,
    );
    return Math.max(
      1,
      resolveDataOperationControlWrapFinal(dataOperationControlIfHash).spell(
        dataOperationControlIfHash,
        [],
      ).length,
    );
  } catch {
    return 1;
  }
}

function isDataOperationControlOps(
  dataOperationControlOps?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    ops: dataOperationControlOps.map(
      (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        resolveDataOperationControlAllowDetach(rolldownNImport2),
    ),
    from: dataOperationControlOps.map(
      (
        rolldownNImport2?: unknown,
        index?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => index,
    ),
    row: dataOperationControlOps.map((..._extraArguments: unknown[]) => false),
  };
}

var resolveDataOperationControlFlatMap: Dynamic;

var resolveDataOperationControlSome: Dynamic;

var resolveDataOperationControlLastIndexOf: Dynamic;

var resolveDataOperationControlIsInteger: Dynamic;

function resolveDataOperationControlMinted(
  dataOperationControlMinted?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    !isOperationRecord(dataOperationControlMinted) ||
    dataOperationControlMinted.minted === undefined
  )
    return [];
  if (!Array.isArray(dataOperationControlMinted.minted)) return null;
  let flat: Dynamic = dataOperationControlMinted.minted.flat(3);
  if (
    flat.every(
      (flat2?: unknown, ..._extraArguments: unknown[]) =>
        typeof flat2 == `string`,
    )
  )
    return flat;
  if (
    !flat.every(
      (flat2?: unknown, ..._extraArguments: unknown[]) =>
        typeof flat2 == `string` ||
        resolveDataOperationControlIsInteger(flat2) !== null,
    )
  )
    return null;
  let reduce: Dynamic = flat.reduce(
    (
      accumulator?: Dynamic,
      rolldownRImport2?: unknown,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      accumulator +
      (typeof rolldownRImport2 == `string`
        ? 1
        : resolveDataOperationControlIsInteger(rolldownRImport2)),
    0,
  );
  if (reduce > 2e4) return null;
  let dataOperationControlLastIndexOf: Dynamic = isOperationRecord(
    dataOperationControlMinted.run,
  )
    ? resolveDataOperationControlLastIndexOf(
        dataOperationControlMinted.run.from,
      )
    : null;
  let length2 = isOperationRecord(dataOperationControlMinted.run)
    ? Number(dataOperationControlMinted.run.count)
    : NaN;
  if (dataOperationControlLastIndexOf && length2 === reduce) {
    let record2: Dynamic = Array.from<Dynamic, Dynamic>(
      {
        length: length2,
      },
      (
        dataOperationControlMinted2?: unknown,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        `${dataOperationControlLastIndexOf[0]}.${dataOperationControlLastIndexOf[1] + options}`,
    );
    let index: Dynamic = 0;
    let enabled: Dynamic = true;
    for (let resolveDataOperationControlMintedResult of flat as Dynamic)
      if (typeof resolveDataOperationControlMintedResult == `string`) {
        enabled &&=
          record2[index++] === resolveDataOperationControlMintedResult;
      } else {
        index += resolveDataOperationControlIsInteger(
          resolveDataOperationControlMintedResult,
        );
      }
    if (enabled) return record2;
  }
  let items: Dynamic = [];
  for (let index = 0; index < flat.length; index++) {
    let flatItem: Dynamic = flat[index];
    if (typeof flatItem == `string`) {
      items.push(flatItem);
      continue;
    }
    let dataOperationControlIsInteger: Dynamic =
      resolveDataOperationControlIsInteger(flatItem);
    let [items2, setItems]: Dynamic = [
      resolveDataOperationControlLastIndexOf(flat[index - 1]),
      resolveDataOperationControlLastIndexOf(flat[index + 1]),
    ];
    if (
      !items2 ||
      !setItems ||
      items2[0] !== setItems[0] ||
      setItems[1] - items2[1] - 1 !== dataOperationControlIsInteger
    )
      return null;
    for (let total: Dynamic = items2[1] + 1; total < setItems[1]; total++)
      items.push(`${items2[0]}.${total}`);
  }
  return items;
}

var resolveDataOperationControlMinted2: Dynamic;

function resolveDataOperationControlEvery(
  dataOperationControlEvery?: Dynamic,
  items?: Dynamic,
  length2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    items.every(
      (
        rolldownRImport2?: Dynamic,
        index?: Dynamic,
        ..._extraArguments: unknown[]
      ) => rolldownRImport2 === index,
    ) &&
    items.length === length2
  )
    return dataOperationControlEvery.slice(0, length2);
  let record2: Dynamic = Array.from<Dynamic, Dynamic>(
    {
      length: length2,
    },
    (..._extraArguments: unknown[]): Dynamic => ({}),
  );
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  items.forEach(
    (
      rolldownRImport2?: Dynamic,
      index?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let dataOperationControlEveryItem: Dynamic =
        dataOperationControlEvery[index];
      if (
        !isOperationRecord(dataOperationControlEveryItem) ||
        rolldownRImport2 >= length2
      )
        return;
      let recordItem: Dynamic = record2[rolldownRImport2];
      if (!uniqueItems.has(rolldownRImport2)) {
        uniqueItems.add(rolldownRImport2);
        Object.assign(recordItem, dataOperationControlEveryItem);
        if (dataOperationControlEveryItem.minted !== undefined) {
          recordItem.minted = resolveDataOperationControlSome(
            dataOperationControlEveryItem.minted,
          );
        }
        if (dataOperationControlEveryItem.retired !== undefined) {
          recordItem.retired = resolveDataOperationControlSome(
            dataOperationControlEveryItem.retired,
          );
        }
        return;
      }
      if (dataOperationControlEveryItem.minted !== undefined) {
        recordItem.minted = [
          ...resolveDataOperationControlSome(recordItem.minted),
          ...resolveDataOperationControlSome(
            dataOperationControlEveryItem.minted,
          ),
        ];
      }
      if (dataOperationControlEveryItem.retired !== undefined) {
        recordItem.retired = [
          ...resolveDataOperationControlSome(recordItem.retired),
          ...resolveDataOperationControlSome(
            dataOperationControlEveryItem.retired,
          ),
        ];
      }
      if (dataOperationControlEveryItem.changed === true) {
        recordItem.changed = true;
      } else {
        if (
          dataOperationControlEveryItem.changed === false &&
          recordItem.changed === undefined
        ) {
          recordItem.changed = false;
        }
      }
      if (Array.isArray(dataOperationControlEveryItem.notices)) {
        recordItem.notices = [
          ...(Array.isArray(recordItem.notices) ? recordItem.notices : []),
          ...dataOperationControlEveryItem.notices,
        ];
      }
    },
  );
  return record2;
}

function resolveDataOperationControlForEach(
  dataOperationControl?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  options.forEach(
    (
      rolldownRImport2?: Dynamic,
      index?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined =>
      void (
        isOperationRecord(dataOperationControl[index]) &&
        rolldownRImport2 < context &&
        uniqueItems.add(rolldownRImport2)
      ),
  );
  let items: Dynamic = [];
  for (let index = 0; index < context; index++)
    if (!uniqueItems.has(index)) {
      items.push(index);
    }
  return items;
}

function collectDataOperationControlValue(
  collectDataOperationControlValue2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return collectDataOperationControlValue2.map(
    resolveDataOperationControlMinted2,
  );
}

var resolveDataOperationControlValue17: Dynamic;

function filterDataOperationControlData(
  filterDataOperationControlData2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!isOperationRecord(filterDataOperationControlData2))
    return filterDataOperationControlData2;
  let filterDataOperationControlData3: Dynamic =
    filterDataOperationControlData2;
  let results: Dynamic =
    isOperationRecord(filterDataOperationControlData3.data) &&
    Array.isArray(filterDataOperationControlData3.data.results)
      ? filterDataOperationControlData3.data.results
      : filterDataOperationControlData3.results;
  let isArray =
    Array.isArray(results) &&
    results.some(
      (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        isOperationRecord(result) &&
        (result.changed !== undefined || result.notices !== undefined),
    );
  if (
    ![`results`, `changed`, `notices`].some(
      (item?: Dynamic, ..._extraArguments: unknown[]) =>
        filterDataOperationControlData3[item] !== undefined,
    ) &&
    !isArray
  )
    return filterDataOperationControlData2;
  let record2: Dynamic = isOperationRecord(filterDataOperationControlData3.data)
    ? {
        ...filterDataOperationControlData3.data,
      }
    : {};
  if (
    Array.isArray(filterDataOperationControlData3.results) &&
    !Array.isArray(record2.results)
  ) {
    record2.results = filterDataOperationControlData3.results;
  }
  if (
    typeof filterDataOperationControlData3.changed == `boolean` &&
    record2.changed === undefined
  ) {
    record2.changed = filterDataOperationControlData3.changed;
  }
  if (
    Array.isArray(filterDataOperationControlData3.notices) &&
    record2.notices === undefined
  ) {
    record2.notices = filterDataOperationControlData3.notices;
  }
  let filteredResults: Dynamic = Array.isArray(record2.results)
    ? record2.results.filter(isOperationRecord)
    : [];
  let flatMap: Dynamic = filteredResults.flatMap(
    (filteredResult?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      Array.isArray(filteredResult.notices) ? filteredResult.notices : [],
  );
  if (flatMap.length > 0) {
    record2.notices = [
      ...(Array.isArray(record2.notices) ? record2.notices : []),
      ...flatMap,
    ];
  }
  if (record2.changed === undefined && filteredResults.length > 0) {
    if (
      filteredResults.every(
        (filteredResult?: Dynamic, ..._extraArguments: unknown[]) =>
          filteredResult.changed === false,
      )
    ) {
      record2.changed = false;
    } else {
      if (
        filteredResults.some(
          (filteredResult?: Dynamic, ..._extraArguments: unknown[]) =>
            filteredResult.changed === true,
        )
      ) {
        record2.changed = true;
      }
    }
  }
  return {
    ...filterDataOperationControlData3,
    data: record2,
  };
}

function resolveDataOperationControlMinted3(
  dataOperationControlMinted3?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    isOperationRecord(dataOperationControlMinted3) &&
    (resolveDataOperationControlFlatMap(dataOperationControlMinted3.minted)
      .length > 0 ||
      resolveDataOperationControlFlatMap(dataOperationControlMinted3.retired)
        .length > 0 ||
      resolveDataOperationControlFlatMap(dataOperationControlMinted3.revived)
        .length > 0 ||
      dataOperationControlMinted3.changed === true)
  );
}

function resolveDataOperationControlIdInvalid(
  dataOperationControlIdInvalid?: Dynamic,
  error: Dynamic = isOperationRecord(dataOperationControlIdInvalid.data)
    ? dataOperationControlIdInvalid.data
    : {},
  ..._extraArguments: unknown[]
) {
  return (
    dataOperationControlIdInvalid.reason === `id_invalid` ||
    error.code === `id_invalid` ||
    error.was === `id_invalid` ||
    /\bproposed ids: [a-z_]+/.test(
      `${String(error.detail)} ${String(dataOperationControlIdInvalid.detail)}`,
    )
  );
}

var dataOperationControlSet5: Dynamic;

function isDataOperationControlGot(
  response?: Dynamic,
  error?: Dynamic,
  items?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    response.verdict !== `deny` ||
    (response.reason !== `id_conflict` && error.code !== `id_conflict`) ||
    resolveDataOperationControlIdInvalid(response, error) ||
    items === undefined ||
    items === `` ||
    typeof error.problem != `string` ||
    !dataOperationControlSet5.has(error.problem)
  )
    return null;
  let number2 =
    typeof error.id == `string` && error.id.startsWith(`${items}.`)
      ? Number(error.id.slice(items.length + 1))
      : NaN;
  let nearest: Dynamic = isOperationRecord(error.nearest)
    ? error.nearest
    : null;
  return !Number.isSafeInteger(number2) ||
    number2 < 0 ||
    !nearest ||
    nearest.sess !== items ||
    typeof nearest.i != `number` ||
    !Number.isSafeInteger(nearest.i) ||
    nearest.i <= number2 ||
    !dependencies.some(
      (dependency?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        dependency.includes(error.id),
    )
    ? null
    : {
        got: error.id,
        next_free: `${items}.${nearest.i}`,
      };
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeDataOperationControl1Step1(): void {
  (dataOperationControlPattern = /^[0-9A-Za-z]{0,127}[1-9A-Za-z]$/);
  (dataOperationControlPattern2 = /^[0-9A-Za-z]{1,127}$/);
  (resolveDataOperationControlSize = (
    dataOperationControlSize?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    dataOperationControlSize.size > 0 &&
    updateDataOperationControlTabs(dataOperationControlSize, options.patch)
      .size === 0);
  (DataOperationControlMessage = ` (copy)`);
  (resolveDataOperationControlValue = (
    dataOperationControlValue?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let ref: Dynamic = dataOperationControlValue?.ref;
    return typeof ref?.object == `string` && typeof ref?.id == `string`
      ? ref.object + `/` + ref.id
      : null;
  });
  (resolveDataOperationControlValue3 = (
    dataOperationControlValue3?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    resolveDataOperationControlValue2((..._extraArguments: unknown[]) =>
      resolveDataOperationControlFields2(dataOperationControlValue3, options),
    ));
  (resolveDataOperationControlValue4 = (
    dataOperationControlValue4?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    resolveDataOperationControlValue2((..._extraArguments: unknown[]) =>
      createPagesDisplayAutoEvent(dataOperationControlValue4, options),
    ));
  (resolveDataOperationControlFields3 = (
    ..._extraArguments: unknown[]
  ) =>
    resolveDataOperationControlValue2((..._extraArguments: unknown[]) => ({
      name: `pages.display.lit`,
      fields: {
        component: ObservabilityTelemetryDisplayLit,
      },
    })));
  (resolveDataOperationControlValue5 = (
    dataOperationControlValue5?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    resolveDataOperationControlValue2((..._extraArguments: unknown[]) =>
      createPagesHeadingFoldEvent(dataOperationControlValue5, options),
    ));
  (resolveDataOperationControlTest = (
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    items.length <= 256 &&
    !isPlatformKeyboardAndSaveStatusCharCodeAt(items) &&
    platformSessionAndSourcesPattern19.test(items));
  (resolveDataOperationControlSlug = (
    ask?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ask.bid ?? `~${ask.slug}`);
  (resolveDataOperationControlSlug2 = (
    ask?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolvePlatformSessionAndSourcesTest12(ask.bid, ask.slug) ?? ask.slug);
  (collectDataOperationControlTitle = (
    collectDataOperationControlTitle2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    JSON.stringify([
      collectDataOperationControlTitle2.title,
      collectDataOperationControlTitle2.headings.map(
        (ask?: Dynamic, ..._extraArguments: unknown[]): Dynamic => [
          ask.level,
          ask.text,
          ask.slug,
          ask.bid ?? ``,
        ],
      ),
    ]));
  (dataOperationControlValue2048 = 2048);
  (resolveDataOperationControlValue7 = (
    dataOperationControlValue7?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolvePlatformKeyboardAndSaveStatusTest(dataOperationControlValue7));
  (dataOperationControlPattern3 = /(?![\u0600-\u0605\u06DD\u070F\u0890\u0891\u08E2\u{110BD}\u{110CD}]|\p{Variation_Selector})[\p{Cf}\p{Cs}\p{Default_Ignorable_Code_Point}\u2028\u2029]/gu);
  (resolveDataOperationControlReplace = (
    dataOperationControlReplace?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    dataOperationControlReplace.replace(dataOperationControlPattern3, ``));
  (dataOperationControlPattern4 = /[^\p{Default_Ignorable_Code_Point}\p{White_Space}\p{Co}\p{Noncharacter_Code_Point}\u2800\uFFFC\u{16FE4}\u{1D159}\u{13440}-\u{13455}]/u);
  (resolveDataOperationControlJoin = (
    items?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    items.length <= options
      ? items
      : Array.from<Dynamic>(items.slice(0, options * 2))
          .slice(0, options)
          .join(``));
  (resolveDataOperationControlValue8 = (
    dataOperationControlValue82?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    dataOperationControlValue82 !== null &&
    isDataOperationControlIndent(dataOperationControlValue82).length >= 2);
  (resolveDataOperationControlGetRandomValues = (
    dataOperationControlGetRandomValues?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    crypto.getRandomValues(new Uint8Array(dataOperationControlGetRandomValues)));
  (collectDataOperationControlJoin = (
    collectDataOperationControlJoin2?: Dynamic,
    options: Dynamic = resolveDataOperationControlGetRandomValues,
    ..._extraArguments: unknown[]
  ) => {
    for (let index = 0; index < 32; index++) {
      let options2: Dynamic = options(3);
      if (options2.length !== 3)
        throw Error(`mkBid: rand returned ${options2.length} bytes, need 3`);
      let label = `bk_${[...options2].map((item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => item.toString(16).padStart(2, `0`)).join(``)}`;
      if (!collectDataOperationControlJoin2?.has(label)) return label;
    }
    throw Error(`mkBid: collision-guard exhausted`);
  });
  (dataOperationControlParagraphBlockquoteListListItemValues = [
    `paragraph`,
    `blockquote`,
    `list`,
    `listItem`,
    `horizontalRule`,
    `codeBlock`,
    `table`,
    `tableRow`,
    `cell`,
    `embed`,
    `pending`,
    `heading`,
    `bulletList`,
    `orderedList`,
    `tableHeader`,
    `tableCell`,
  ]);
  (dataOperationControlSet = new (Set as Dynamic)(
    dataOperationControlParagraphBlockquoteListListItemValues,
  ));
  (BlockIdExtension = Extension.create({
    name: `blockId`,
    addOptions(..._extraArguments: unknown[]) {
      return {
        rand: undefined,
      };
    },
    addGlobalAttributes(..._extraArguments: unknown[]): Dynamic {
      return [
        {
          types: [...dataOperationControlParagraphBlockquoteListListItemValues],
          attributes: {
            bid: {
              default: null,
              keepOnSplit: false,
              renderHTML: (
                ask?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic =>
                typeof ask.bid == `string` && ask.bid !== ``
                  ? {
                      "data-bid": ask.bid,
                    }
                  : {},
              parseHTML: (..._extraArguments: unknown[]) => null,
            },
          },
        },
      ];
    },
    addProseMirrorPlugins(..._extraArguments: unknown[]): Dynamic {
      return [];
    },
  }));
  (DataOperationControlUnclassed = `unclassed`);
  (dataOperationControlSet2 = new (Set as Dynamic)(
    observabilityTelemetryReseatFailedSchemaMismatchOrphanNodeNodeGoneValues,
  ));
  (resolveDataOperationControlValue9 = (
    dataOperationControlValue9?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof dataOperationControlValue9 == `string` &&
    dataOperationControlSet2.has(dataOperationControlValue9)
      ? dataOperationControlValue9
      : DataOperationControlUnclassed);
  (dataOperationControlSet3 = new (Set as Dynamic)(
    observabilityTelemetryE1E23E49E10pValues,
  ));
  (DataOperationControlReseatFailed = {
    reseat_failed: `reseat_failed`,
    schema_mismatch: `schema_mismatch`,
  });
  (resolveDataOperationControlHasOwn = (
    dataOperationControlHasOwn?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    typeof dataOperationControlHasOwn == `string` &&
    Object.hasOwn(DataOperationControlReseatFailed, dataOperationControlHasOwn)
      ? DataOperationControlReseatFailed[dataOperationControlHasOwn]
      : null);
  (DataOperationControlNodeGone = resolvePlatformAnnouncementsToUpperCase(`node_gone`));
  (DataOperationControlStyles = `This document is too long to open whole here yet. Its first part is shown read-only; nothing is lost.`);
  (DataOperationControlProse = `prose`);
  (isOperationRecord = (
    operationRecord?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof operationRecord == `object` &&
    !!operationRecord &&
    !Array.isArray(operationRecord));
  (dataOperationControlIfRevIfHashValues = [`ifRev`, `ifHash`]);
  (dataOperationControlPattern5 = /^[0-9a-f]{8,64}$/);
  (resolveDataOperationControlDelete = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    event.op === `delete` &&
    typeof event.ifHash == `string` &&
    dataOperationControlPattern5.test(event.ifHash) &&
    isOperationRecord(event.target) &&
    event.target.kind === `blocks` &&
    Array.isArray(event.target.ids) &&
    event.target.ids.length === 1 &&
    typeof event.target.ids[0] == `string`);
  (DataOperationControlAllowDetach = `allowDetach`);
  (dataOperationControlSet4 = new (Set as Dynamic)([
    `delete`,
    `replace`,
    `unwrap`,
    `restore`,
    `set`,
    `move`,
  ]));
  (resolveDataOperationControlValue14 = (
    operation?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    typeof operation.op == `string` && dataOperationControlSet4.has(operation.op));
  (dataOperationControlAddBlockDelBlockMoveAttrValues = [
    `add`,
    `block_del`,
    `block_move`,
    `attr`,
    `block_split`,
    `block_join`,
    `wrap`,
    `unwrap`,
    `mark`,
    `revive`,
    `text`,
    `anchor`,
    `ins`,
    `del`,
    `block_ins`,
  ]);
  (DataOperationControlEditorOpError = class extends Error {
    [key: string]: Dynamic;
    why: Dynamic;
    k: Dynamic;
    path: Dynamic;
    constructor(
      dataOperationControlEditorOpError?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      super(
        `editor arm: ops[${options}].${context} is ${dataOperationControlEditorOpError}`,
      );
      this.why = dataOperationControlEditorOpError;
      this.k = options;
      this.path = context;
      this.name = `EditorOpError`;
    }
  });
  (resolveDataOperationControlTarget = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => (isOperationRecord(event.target) ? event.target.kind : undefined));
  (filterDataOperationControlTarget = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    isOperationRecord(event.target) && Array.isArray(event.target.ids)
      ? event.target.ids.filter(
          (id?: unknown, ..._extraArguments: unknown[]) => typeof id == `string`,
        )
      : []);
  (resolveDataOperationControlTarget2 = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let range: Dynamic =
      isOperationRecord(event.target) && Array.isArray(event.target.range)
        ? event.target.range
        : [];
    return typeof range[0] == `string` && typeof range[1] == `string`
      ? [range[0], range[1]]
      : null;
  });
  (resolveDataOperationControlSource = (
    dataOperationControlSource?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    (isOperationRecord(dataOperationControlSource.source)
      ? dataOperationControlSource.source
      : isOperationRecord(dataOperationControlSource.with)
        ? dataOperationControlSource.with
        : undefined
    )?.as);
  (DataOperationControlState = {
    [DataOperationControlAllowDetach]: true,
  });
  (resolveDataOperationControlValue15 = (
    dataOperationControlValue15?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => [dataOperationControlValue15]);
  (resolveDataOperationControlType = (
    dataOperationControlType?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let record2: Dynamic = isOperationRecord(dataOperationControlType.attrs)
      ? {
          ...dataOperationControlType,
          ...dataOperationControlType.attrs,
        }
      : dataOperationControlType;
    let record3: Dynamic = {};
    for (let [
      resolveDataOperationControlTypeResult,
      resolveDataOperationControlTypeResult2,
    ] of Object.entries(record2) as Dynamic)
      if (
        resolveDataOperationControlTypeResult !== `type` &&
        resolveDataOperationControlTypeResult !== `attrs` &&
        resolveDataOperationControlTypeResult2 != null
      ) {
        record3[resolveDataOperationControlTypeResult] =
          resolveDataOperationControlTypeResult2;
      }
    return record3;
  });
  (resolveDataOperationControlRange = (
    dataOperationControlRange?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let dataOperationControlTarget2: Dynamic = resolveDataOperationControlTarget2(
      dataOperationControlRange,
    );
    if (!dataOperationControlTarget2) return [dataOperationControlRange];
    let ids: Dynamic = Array.isArray(dataOperationControlRange.ids)
      ? dataOperationControlRange.ids
      : [];
    let flatMap: Dynamic = (
      dataOperationControlRange2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (Array.isArray(dataOperationControlRange2)
        ? dataOperationControlRange2
        : []
      ).flatMap(
        (
          rolldownNImport2?: Dynamic,
          index?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => {
          if (
            !isOperationRecord(rolldownNImport2) ||
            typeof rolldownNImport2.type != `string`
          )
            return [];
          let attrs: Dynamic = resolveDataOperationControlType(rolldownNImport2);
          let idItem: Dynamic = options ? ids[index] : undefined;
          return [
            {
              op: `mark`,
              style: rolldownNImport2.type,
              on: options,
              ...(Object.keys(attrs).length > 0
                ? {
                    attrs: attrs,
                  }
                : {}),
              range: [
                dataOperationControlTarget2[0],
                dataOperationControlTarget2[1],
              ],
              ...(typeof idItem == `string`
                ? {
                    id: idItem,
                  }
                : {}),
            },
          ];
        },
      );
    let items: Dynamic = [
      ...flatMap(dataOperationControlRange.remove, false),
      ...flatMap(dataOperationControlRange.add, true),
    ];
    return items.length > 0 ? items : [dataOperationControlRange];
  });
  (resolveDataOperationControlItem = (
    dataOperationControlItem?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let dataOperationControlTarget2: Dynamic = resolveDataOperationControlTarget2(
      dataOperationControlItem,
    );
    if (
      !dataOperationControlTarget2 ||
      dataOperationControlTarget2[0] !== dataOperationControlTarget2[1]
    )
      return [dataOperationControlItem];
    let side = dataOperationControlItem.side === `before` ? `before` : `after`;
    let items: Dynamic =
      typeof dataOperationControlItem.id == `string`
        ? [dataOperationControlItem.id]
        : filterDataOperationControlFilter(dataOperationControlItem, options);
    let record2: Dynamic =
      items.length >= 2
        ? {
            item: items[0],
            id: items[1],
          }
        : items.length === 1
          ? {
              id: items[0],
            }
          : {};
    let record3: Dynamic =
      typeof dataOperationControlItem.resurrect == `string`
        ? {
            resurrect: dataOperationControlItem.resurrect,
          }
        : {};
    return [
      {
        op: `block_split`,
        at: dataOperationControlTarget2[0],
        side: side,
        ...record2,
        ...record3,
      },
    ];
  });
  (filterDataOperationControlFilter = (
    filterDataOperationControlFilter3?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    Array.isArray(filterDataOperationControlFilter3.ids)
      ? filterDataOperationControlFilter3.ids.filter(
          (id?: unknown, ..._extraArguments: unknown[]) => typeof id == `string`,
        )
      : [...options]);
  (collectDataOperationControlBlock = (
    post?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let filterDataOperationControlTarget2: Dynamic =
      filterDataOperationControlTarget(post);
    let to: Dynamic = isOperationRecord(post.to) ? post.to : undefined;
    let target: Dynamic =
      to && isOperationRecord(to.target) ? to.target : undefined;
    if (
      filterDataOperationControlTarget2.length === 0 ||
      filterDataOperationControlTarget2.length > 48 ||
      !to ||
      !target
    )
      return [post];
    let parent =
      target.kind === `root`
        ? `root`
        : target.kind === `blocks` &&
            Array.isArray(target.ids) &&
            typeof target.ids[0] == `string`
          ? target.ids[0]
          : undefined;
    if (parent === undefined) return [post];
    let collectDataOperationControlBlockResult: Dynamic;
    if ((to.side === `after` || to.side === `before`) && parent !== `root`)
      collectDataOperationControlBlockResult = {
        op: `block_move`,
        block: filterDataOperationControlTarget2[0],
        [to.side]: parent,
        ...DataOperationControlState,
      };
    else if (to.side === `start`)
      collectDataOperationControlBlockResult = {
        op: `block_move`,
        block: filterDataOperationControlTarget2[0],
        parent: parent,
        after: `head`,
        ...DataOperationControlState,
      };
    else if (to.side === `end`)
      collectDataOperationControlBlockResult = {
        op: `block_move`,
        block: filterDataOperationControlTarget2[0],
        parent: parent,
        ...DataOperationControlState,
      };
    else return [post];
    let filterDataOperationControlFilterItem: Dynamic =
      filterDataOperationControlFilter(post, options)[0];
    if (filterDataOperationControlFilterItem !== undefined) {
      collectDataOperationControlBlockResult.id =
        filterDataOperationControlFilterItem;
    }
    return [
      collectDataOperationControlBlockResult,
      ...filterDataOperationControlTarget2.slice(1).map(
        (
          block?: Dynamic,
          index?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => ({
          op: `block_move`,
          block: block,
          after: filterDataOperationControlTarget2[index],
          [DataOperationControlAllowDetach]: true,
        }),
      ),
    ];
  });
  (resolveDataOperationControlBlock = (
    dataOperationControlBlock?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let filterDataOperationControlTarget2: Dynamic =
      filterDataOperationControlTarget(dataOperationControlBlock);
    if (
      filterDataOperationControlTarget2.length === 0 ||
      !isOperationRecord(dataOperationControlBlock.in)
    )
      return [dataOperationControlBlock];
    let record2: Dynamic =
      filterDataOperationControlTarget2.length === 1
        ? {
            block: filterDataOperationControlTarget2[0],
          }
        : {
            from: filterDataOperationControlTarget2[0],
            to: filterDataOperationControlTarget2.at(-1),
          };
    let ids: Dynamic = filterDataOperationControlFilter(
      dataOperationControlBlock,
      options,
    );
    return [
      {
        op: `wrap`,
        ...record2,
        in: dataOperationControlBlock.in,
        ...(ids.length > 0
          ? {
              ids: ids,
            }
          : {}),
      },
    ];
  });
  (resolveDataOperationControlBlock2 = (
    dataOperationControlBlock2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let filterDataOperationControlFilterItem: Dynamic =
      filterDataOperationControlFilter(dataOperationControlBlock2, options)[0];
    return [
      {
        op: `unwrap`,
        block: filterDataOperationControlTarget(dataOperationControlBlock2)[0],
        ...DataOperationControlState,
        ...(filterDataOperationControlFilterItem === undefined
          ? {}
          : {
              id: filterDataOperationControlFilterItem,
            }),
      },
    ];
  });
  (DataOperationControlStyles2 = "the page's erase names the ids it takes (`target.runs`, ERASE-RUNS — read off the run table in the iframe); a range-spelt one (an agent's, an older log's) names its two ENDS, not the chars between them; either flies FINAL, bare");
  (DataOperationControlStyles3 = "S1 JSON content: `add` with writer ids is the destination; tonight the FINAL word (births keep `insert as:blocks` + ids)");
  (DataOperationControlFamily = [
    {
      family: `pasteParsed`,
      spelling: `final`,
      spell: resolveDataOperationControlValue15,
      is: (operation?: Dynamic, ..._extraArguments: unknown[]) =>
        (operation.op === `insert` || operation.op === `replace`) &&
        (resolveDataOperationControlSource(operation) === `html` ||
          resolveDataOperationControlSource(operation) === `markdown`),
      gap: "ruled OFF the arm (a source the door parses): paste-s1 sends `insert as:blocks` + ids; until then the FINAL word rides and the arm's door may refuse it",
    },
    {
      family: `type`,
      spelling: `final`,
      spell: resolveDataOperationControlValue15,
      is: (operation?: Dynamic, ..._extraArguments: unknown[]) =>
        operation.op === `insert` &&
        resolveDataOperationControlSource(operation) === `text`,
      gap: "the `text` arm (seq1 members with both origins) needs the leaf's tag and the right neighbour — the page's, later; FINAL `insert` tonight",
    },
    {
      family: `typeMarked`,
      spelling: `final`,
      spell: resolveDataOperationControlValue15,
      is: (operation?: Dynamic, ..._extraArguments: unknown[]) =>
        operation.op === `insert` &&
        resolveDataOperationControlSource(operation) === `inline`,
      gap: "marked text / chips / images are S1 inline content: FINAL `insert as:inline` (chips and marks by id are open gaps G1/G7/G8)",
    },
    {
      family: `insertBlocks`,
      spelling: `final`,
      spell: resolveDataOperationControlValue15,
      is: (operation?: Dynamic, ..._extraArguments: unknown[]) =>
        operation.op === `insert` &&
        resolveDataOperationControlSource(operation) === `blocks`,
      gap: DataOperationControlStyles3,
    },
    {
      family: `erase`,
      spelling: `final`,
      spell: resolveDataOperationControlValue15,
      is: (operation?: Dynamic, ..._extraArguments: unknown[]) =>
        operation.op === `delete` &&
        resolveDataOperationControlTarget(operation) === `chars`,
      gap: DataOperationControlStyles2,
    },
    {
      family: `revive`,
      spelling: `row`,
      spell: resolveDataOperationControlValue15,
      is: (operation?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        operation.op === `revive` && isOperationRecord(operation.chars),
    },
    {
      family: `typeOver`,
      spelling: `final`,
      spell: resolveDataOperationControlValue15,
      is: (operation?: Dynamic, ..._extraArguments: unknown[]) =>
        operation.op === `replace` &&
        resolveDataOperationControlTarget(operation) === `chars`,
      gap: DataOperationControlStyles2,
    },
    {
      family: `deleteBlocks`,
      spelling: `final`,
      spell: resolveDataOperationControlValue15,
      is: (operation?: Dynamic, ..._extraArguments: unknown[]) =>
        operation.op === `delete` &&
        resolveDataOperationControlTarget(operation) === `blocks`,
      gap: "`block_del` has no seat for the person's standing consent (`allowDetach`): the FINAL `delete blocks` carries it, one word, atomic — N × block_del returns when the word seats the key",
    },
    {
      family: `replaceBlocks`,
      spelling: `final`,
      spell: resolveDataOperationControlValue15,
      is: (operation?: Dynamic, ..._extraArguments: unknown[]) =>
        operation.op === `replace` &&
        resolveDataOperationControlTarget(operation) === `blocks`,
      gap: DataOperationControlStyles3,
    },
    {
      family: `split`,
      spelling: `row`,
      spell: resolveDataOperationControlItem,
      is: (operation?: Dynamic, ..._extraArguments: unknown[]) =>
        operation.op === `split` &&
        resolveDataOperationControlTarget(operation) === `chars`,
    },
    {
      family: `join`,
      spelling: `row`,
      spell: (operation?: Dynamic, ..._extraArguments: unknown[]): Dynamic => [
        {
          op: `block_join`,
          block: filterDataOperationControlTarget(operation).slice(0, 2),
          ...DataOperationControlState,
          ...(operation.dir === `forward` || operation.dir === `backward`
            ? {
                dir: operation.dir,
              }
            : {}),
        },
      ],
      is: (operation?: Dynamic, ..._extraArguments: unknown[]) =>
        operation.op === `join` &&
        filterDataOperationControlTarget(operation).length === 2,
    },
    {
      family: `format`,
      spelling: `row`,
      spell: resolveDataOperationControlRange,
      is: (operation?: Dynamic, ..._extraArguments: unknown[]) =>
        operation.op === `format` &&
        resolveDataOperationControlTarget(operation) === `chars`,
    },
    {
      family: `set`,
      spelling: `final`,
      spell: resolveDataOperationControlValue15,
      is: (operation?: Dynamic, ..._extraArguments: unknown[]) =>
        operation.op === `set`,
      gap: "`attr` wants stored keys (set minus `type` but for a codeBlock retype; cell header → type; atom date value→ts, mention user→principal…) — document knowledge: the FINAL `set` rides (the spec's 'or keep FINAL')",
    },
    {
      family: `wrap`,
      spelling: `row`,
      spell: resolveDataOperationControlBlock,
      is: (operation?: Dynamic, ..._extraArguments: unknown[]) =>
        operation.op === `wrap` &&
        resolveDataOperationControlTarget(operation) === `blocks`,
    },
    {
      family: `unwrap`,
      spelling: `row`,
      spell: resolveDataOperationControlBlock2,
      is: (operation?: Dynamic, ..._extraArguments: unknown[]) =>
        operation.op === `unwrap` &&
        filterDataOperationControlTarget(operation).length === 1,
    },
    {
      family: `move`,
      spelling: `row`,
      spell: collectDataOperationControlBlock,
      is: (operation?: Dynamic, ..._extraArguments: unknown[]) =>
        operation.op === `move` &&
        resolveDataOperationControlTarget(operation) === `blocks`,
    },
    {
      family: `restore`,
      spelling: `final`,
      spell: resolveDataOperationControlValue15,
      is: (operation?: Dynamic, ..._extraArguments: unknown[]) =>
        operation.op === `restore`,
      gap: `not an edit of the arm: stays a FINAL word`,
    },
  ]);
  (DataOperationControlFamily2 = {
    family: `other`,
    spelling: `final`,
    spell: resolveDataOperationControlValue15,
    is: (..._extraArguments: unknown[]) => true,
    gap: `a spelling this table does not know: carried as it is`,
  });
  (DataOperationControlFamily3 = {
    family: `wrap`,
    spelling: `final`,
    spell: (
      dataOperationControlFamily3?: Dynamic,
      items?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      dataOperationControlFamily3.ids === undefined && items.length > 0
        ? [
            {
              ...dataOperationControlFamily3,
              ids: [...items],
            },
          ]
        : [dataOperationControlFamily3],
    is: (dataOperationControlFamily3?: Dynamic, ..._extraArguments: unknown[]) =>
      dataOperationControlFamily3.op === `wrap` &&
      resolveDataOperationControlTarget(dataOperationControlFamily3) === `blocks`,
  });
  (resolveDataOperationControlValue16 = (
    dataOperationControlValue16?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof dataOperationControlValue16 == `string` &&
    dataOperationControlValue16 !== ``);
  (resolveDataOperationControlBlocks = (
    entry?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveDataOperationControlValue16(entry)
      ? [entry]
      : isOperationRecord(entry) &&
          entry.kind === `blocks` &&
          Array.isArray(entry.ids) &&
          entry.ids.every(resolveDataOperationControlValue16) &&
          entry.ids.length > 0
        ? entry.ids
        : null);
  (resolveDataOperationControlChars = (
    entry?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let entry2: Dynamic = Array.isArray(entry)
      ? entry
      : isOperationRecord(entry) &&
          entry.kind === `chars` &&
          Array.isArray(entry.range)
        ? entry.range
        : null;
    return entry2 &&
      resolveDataOperationControlValue16(entry2[0]) &&
      resolveDataOperationControlValue16(entry2[1]) &&
      entry2.length === 2
      ? [entry2[0], entry2[1]]
      : null;
  });
  (resolveDataOperationControlKind = (
    ids?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    kind: `blocks`,
    ids: ids,
  }));
  (resolveDataOperationControlKind2 = (
    dataOperationControlKind2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    kind: `chars`,
    range: [dataOperationControlKind2, options],
  }));
  (resolveDataOperationControlAllowDetach2 = (
    dataOperationControlAllowDetach2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    dataOperationControlAllowDetach2.allowDetach === true
      ? {
          ...options,
          [DataOperationControlAllowDetach]: true,
        }
      : options);
  (isDataOperationControlTarget = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    !isOperationRecord(event.target) &&
    (event.block !== undefined ||
      event.from !== undefined ||
      Array.isArray(event.members)));
  (dataOperationControlPattern6 = /^([^.+\s]+)\.(\d+)(?:\+(\d+)(?:\.\.(\d+))?)?$/);
  (dataOperationControlPattern7 = /^_\./);
  (resolveDataOperationControlFlatMap = (
    dataOperationControlFlatMap?: unknown,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    typeof dataOperationControlFlatMap == `string`
      ? [dataOperationControlFlatMap]
      : Array.isArray(dataOperationControlFlatMap)
        ? dataOperationControlFlatMap.flatMap(resolveDataOperationControlFlatMap)
        : []);
  (resolveDataOperationControlSome = (
    dataOperationControlSome?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    Array.isArray(dataOperationControlSome) &&
    dataOperationControlSome
      .flat(3)
      .some(
        (flat?: Dynamic, ..._extraArguments: unknown[]) =>
          resolveDataOperationControlIsInteger(flat) !== null,
      )
      ? dataOperationControlSome
      : resolveDataOperationControlFlatMap(dataOperationControlSome));
  (resolveDataOperationControlLastIndexOf = (
    dataOperationControlLastIndex?: unknown,
    ..._extraArguments: unknown[]
  ) => {
    if (typeof dataOperationControlLastIndex != `string`) return null;
    let lastIndexOf = dataOperationControlLastIndex.lastIndexOf(`.`);
    let number2 =
      lastIndexOf > 0
        ? Number(dataOperationControlLastIndex.slice(lastIndexOf + 1))
        : NaN;
    return Number.isInteger(number2) && number2 >= 0
      ? [dataOperationControlLastIndex.slice(0, lastIndexOf), number2]
      : null;
  });
  (resolveDataOperationControlIsInteger = (
    dataOperationControlIsInteger?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    isOperationRecord(dataOperationControlIsInteger) &&
    typeof dataOperationControlIsInteger.gap == `number` &&
    Number.isInteger(dataOperationControlIsInteger.gap) &&
    dataOperationControlIsInteger.gap >= 0
      ? dataOperationControlIsInteger.gap
      : null);
  (resolveDataOperationControlMinted2 = (
    dataOperationControlMinted2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (
      !isOperationRecord(dataOperationControlMinted2) ||
      !Array.isArray(dataOperationControlMinted2.minted) ||
      dataOperationControlMinted2.minted.every(
        (minted2?: Dynamic, ..._extraArguments: unknown[]) =>
          resolveDataOperationControlIsInteger(minted2) === null,
      )
    )
      return dataOperationControlMinted2;
    let minted: Dynamic = resolveDataOperationControlMinted(
      dataOperationControlMinted2,
    );
    return minted === null
      ? dataOperationControlMinted2
      : {
          ...dataOperationControlMinted2,
          minted: minted,
        };
  });
  (resolveDataOperationControlValue17 = (
    dataOperationControlValue17?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => dataOperationControlValue17[options] ?? options);
  (dataOperationControlSet5 = new (Set as Dynamic)([
    `char`,
    `mark`,
    `used`,
    `block`,
  ]));
}

export {
  BlockIdExtension,
  DataOperationControlEditorOpError,
  DataOperationControlMessage,
  DataOperationControlProse,
  collectDataOperationControlFindIndex,
  collectDataOperationControlJoin,
  collectDataOperationControlPos,
  collectDataOperationControlTitle,
  collectDataOperationControlValue,
  createPagesTocJumpEvent,
  dataOperationControlAddBlockDelBlockMoveAttrValues,
  dataOperationControlSet,
  filterDataOperationControlData,
  filterDataOperationControlOps,
  getDataOperationControlEntry,
  getDataOperationControlEntry2,
  getDataOperationControlKeys,
  getDataOperationControlPatch,
  isDataOperationControlGot,
  isDataOperationControlIndent,
  isDataOperationControlOps,
  isOperationRecord,
  resolveDataOperationControlEvery,
  resolveDataOperationControlFields3,
  resolveDataOperationControlForEach,
  resolveDataOperationControlIdInvalid,
  resolveDataOperationControlMinted,
  resolveDataOperationControlMinted3,
  resolveDataOperationControlOps,
  resolveDataOperationControlOutline,
  resolveDataOperationControlSess2,
  resolveDataOperationControlSize,
  resolveDataOperationControlSlug,
  resolveDataOperationControlSlug2,
  resolveDataOperationControlSpell,
  resolveDataOperationControlValue,
  resolveDataOperationControlValue10,
  resolveDataOperationControlValue11,
  resolveDataOperationControlValue12,
  resolveDataOperationControlValue17,
  resolveDataOperationControlValue3,
  resolveDataOperationControlValue4,
  resolveDataOperationControlValue5,
  resolveDataOperationControlValue8,
  updateDataOperationControlChildren,
  updateDataOperationControlEntry,
  updateDataOperationControlTabs,
};
