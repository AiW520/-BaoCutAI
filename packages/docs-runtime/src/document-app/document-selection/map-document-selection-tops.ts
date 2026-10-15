/** BaoCut: document selection from index-CX4IZqzA.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";


function isDocumentSelectionRandomUUID(
  documentSelectionRandomUUID: Dynamic = (..._extraArguments: unknown[]) =>
    crypto.randomUUID(),
  ..._extraArguments: unknown[]
): Dynamic {
  let isDocumentSelectionRandomUUIDResult: Dynamic = null;
  let enabled = false;
  return {
    mint(..._extraArguments: unknown[]): Dynamic {
      isDocumentSelectionRandomUUIDResult = documentSelectionRandomUUID();
      enabled = false;
      return isDocumentSelectionRandomUUIDResult;
    },
    arm(..._extraArguments: unknown[]): undefined {
      if (isDocumentSelectionRandomUUIDResult !== null) {
        enabled = true;
      }
    },
    accept(request?: unknown, ..._extraArguments: unknown[]) {
      return !enabled ||
        isDocumentSelectionRandomUUIDResult === null ||
        typeof request != `string` ||
        request !== isDocumentSelectionRandomUUIDResult
        ? false
        : ((enabled = false), true);
    },
    reset(..._extraArguments: unknown[]): undefined {
      isDocumentSelectionRandomUUIDResult = null;
      enabled = false;
    },
    get pending() {
      return enabled;
    },
  };
}

function resolveDocumentSelectionValue(
  documentSelectionValue?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return 16 - documentSelectionValue;
}

var resolveDocumentSelectionValue2: Dynamic;

function isDocumentSelectionValue(
  documentSelectionValue?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let max = Math.max(8, documentSelectionValue);
  return !(context > 0) || !(options > 0)
    ? `min(${max}px, calc(100% - 240px))`
    : Math.min(max, context - 240, Math.max(8, context - options - 8));
}

function mapDocumentSelectionTops(
  mapDocumentSelection?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let gap: Dynamic = mapDocumentSelection.gap ?? 8;
  let draftFloor: Dynamic = mapDocumentSelection.draftFloor ?? 0;
  let max = Math.max(0, mapDocumentSelection.floatMax ?? 400);
  let estH: Dynamic = mapDocumentSelection.estH ?? 56;
  let mapDocumentSelectionTopsHandler: Dynamic = (
    mapDocumentSelection2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => mapDocumentSelection.heights[mapDocumentSelection2] ?? estH;
  let toSorted: Dynamic = mapDocumentSelection.slots.toSorted(
    (
      activity?: Dynamic,
      activity2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (activity.y ?? 1e9) - (activity2.y ?? 1e9) ||
      activity.at.localeCompare(activity2.at),
  );
  let order: Dynamic = toSorted.map(
    (event?: Dynamic, ..._extraArguments: unknown[]): Dynamic => event.key,
  );
  let tops: Dynamic = {};
  let mapDocumentSelectionTopsResult: number = -1;
  if (mapDocumentSelection.pivotKey != null) {
    let toSortedIndex: Dynamic = toSorted.findIndex(
      (event?: Dynamic, ..._extraArguments: unknown[]) =>
        event.key === mapDocumentSelection.pivotKey,
    );
    if (
      toSortedIndex >= 0 &&
      (toSorted[toSortedIndex].y !== undefined ||
        toSorted[toSortedIndex].key === `__draft`)
    ) {
      mapDocumentSelectionTopsResult = toSortedIndex;
    }
  }
  let amount: number = -1 / 0;
  if (mapDocumentSelectionTopsResult >= 0) {
    let toSortedItem: Dynamic = toSorted[mapDocumentSelectionTopsResult];
    let max2: Dynamic =
      toSortedItem.key === `__draft`
        ? Math.max(toSortedItem.y ?? 0, draftFloor)
        : toSortedItem.y + (mapDocumentSelection.pivotOffset ?? 0);
    tops[toSortedItem.key] = max2;
    let max3: Dynamic = max2;
    for (
      let difference = mapDocumentSelectionTopsResult - 1;
      difference >= 0;
      difference--
    ) {
      let toSortedItem2: Dynamic = toSorted[difference];
      let min = Math.min(
        max3 - gap,
        (toSortedItem2.y ?? max3) +
          mapDocumentSelectionTopsHandler(toSortedItem2.key),
      );
      tops[toSortedItem2.key] =
        min - mapDocumentSelectionTopsHandler(toSortedItem2.key);
      max3 = tops[toSortedItem2.key];
    }
    amount = max2 + mapDocumentSelectionTopsHandler(toSortedItem.key) + gap;
    for (
      let total: Dynamic = mapDocumentSelectionTopsResult + 1;
      total < toSorted.length;
      total++
    ) {
      let toSortedItem2: Dynamic = toSorted[total];
      tops[toSortedItem2.key] = Math.max(
        amount,
        resolveDocumentSelectionValue2(toSortedItem2, amount, draftFloor),
      );
      amount =
        tops[toSortedItem2.key] +
        mapDocumentSelectionTopsHandler(toSortedItem2.key) +
        gap;
    }
  } else
    for (let event of toSorted as Dynamic) {
      tops[event.key] = Math.max(
        amount,
        resolveDocumentSelectionValue2(event, amount, draftFloor),
      );
      amount =
        tops[event.key] + mapDocumentSelectionTopsHandler(event.key) + gap;
    }
  let band: Dynamic = mapDocumentSelection.band;
  if (band && toSorted.length > 0) {
    let bottom: Dynamic = band.bottom;
    for (
      let difference = toSorted.length - 1;
      difference > mapDocumentSelectionTopsResult;
      difference--
    ) {
      let toSortedItem: Dynamic = toSorted[difference];
      if (toSortedItem.key === `__draft` || toSortedItem.wholePage) {
        bottom = Math.min(bottom, tops[toSortedItem.key] - gap);
        continue;
      }
      if (toSortedItem.y === undefined) continue;
      let topItem: Dynamic = tops[toSortedItem.key];
      let max2 = Math.max(
        Math.min(
          topItem,
          bottom - mapDocumentSelectionTopsHandler(toSortedItem.key),
        ),
        (toSortedItem.y ?? topItem) - max,
      );
      tops[toSortedItem.key] = max2;
      bottom = max2 - gap;
    }
    let top: Dynamic = band.top;
    if (mapDocumentSelectionTopsResult >= 0) {
      let count: number = 0;
      for (let index = 0; index < mapDocumentSelectionTopsResult; index++)
        count += mapDocumentSelectionTopsHandler(toSorted[index].key) + gap;
      top = Math.min(
        top,
        tops[toSorted[mapDocumentSelectionTopsResult].key] - count,
      );
    }
    for (let index = 0; index < toSorted.length; index++) {
      let toSortedItem: Dynamic = toSorted[index];
      let min: Dynamic =
        toSortedItem.wholePage && toSortedItem.y !== undefined
          ? Math.min(top, toSortedItem.y)
          : top;
      if (index !== mapDocumentSelectionTopsResult) {
        tops[toSortedItem.key] = Math.max(tops[toSortedItem.key], min);
      }
      top = Math.max(
        top,
        tops[toSortedItem.key] +
          mapDocumentSelectionTopsHandler(toSortedItem.key) +
          gap,
      );
    }
  }
  let amount2 = -1 / 0;
  for (let event of toSorted as Dynamic)
    amount2 = Math.max(
      amount2,
      tops[event.key] + mapDocumentSelectionTopsHandler(event.key) + gap,
    );
  let overflow = band ? Math.max(0, amount2 - gap - band.bottom) : 0;
  return {
    tops: tops,
    bottom: Math.max(0, amount2),
    order: order,
    overflow: overflow,
  };
}

function isDocumentSelectionSlots(
  documentSelectionSlots?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let slots: Dynamic = documentSelectionSlots.slots.filter(
    (event?: Dynamic, ..._extraArguments: unknown[]) =>
      event.key !== `__draft` && event.y !== undefined,
  );
  if (!documentSelectionSlots.docExtent || slots.length === 0) return false;
  let minHang: Dynamic = documentSelectionSlots.minHang ?? 400;
  let bottom: Dynamic = documentSelectionSlots.docExtent.bottom;
  let mapDocumentSelectionTops2: Dynamic = mapDocumentSelectionTops({
    slots: slots,
    heights: documentSelectionSlots.fullHeights,
    band: null,
    gap: documentSelectionSlots.gap,
    estH: documentSelectionSlots.estH,
  });
  let amount = -1 / 0;
  let estH: Dynamic = documentSelectionSlots.estH ?? 56;
  for (let event of slots as Dynamic)
    amount = Math.max(
      amount,
      mapDocumentSelectionTops2.tops[event.key] +
        (documentSelectionSlots.fullHeights[event.key] ?? estH),
    );
  return amount - bottom > minHang;
}

function resolveDocumentSelectionUnknownPad(
  documentSelectionUnknownPad?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let unknownPad: Dynamic = documentSelectionUnknownPad.unknownPad ?? 120;
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  for (let resolveDocumentSelectionUnknownPadResult2 of documentSelectionUnknownPad.open as Dynamic)
    if (resolveDocumentSelectionUnknownPadResult2 != null) {
      uniqueItems.add(resolveDocumentSelectionUnknownPadResult2);
    }
  let resolveDocumentSelectionUnknownPadResult: Dynamic = null;
  for (let resolveDocumentSelectionUnknownPadResult2 in documentSelectionUnknownPad.heights) {
    if (uniqueItems.has(resolveDocumentSelectionUnknownPadResult2)) continue;
    let heightItem: Dynamic =
      documentSelectionUnknownPad.heights[
        resolveDocumentSelectionUnknownPadResult2
      ];
    let resolveDocumentSelectionUnknownPadResult3: Dynamic;
    if (documentSelectionUnknownPad.compact) {
      if (
        !(
          resolveDocumentSelectionUnknownPadResult2 in
          documentSelectionUnknownPad.full
        ) ||
        !documentSelectionUnknownPad.known.has(
          resolveDocumentSelectionUnknownPadResult2,
        )
      ) {
        resolveDocumentSelectionUnknownPadResult3 = heightItem + unknownPad;
      }
    } else {
      resolveDocumentSelectionUnknownPadResult3 = heightItem;
      documentSelectionUnknownPad.known.add(
        resolveDocumentSelectionUnknownPadResult2,
      );
    }
    if (
      resolveDocumentSelectionUnknownPadResult3 !== undefined &&
      documentSelectionUnknownPad.full[
        resolveDocumentSelectionUnknownPadResult2
      ] !== resolveDocumentSelectionUnknownPadResult3
    ) {
      (resolveDocumentSelectionUnknownPadResult ??= {
        ...documentSelectionUnknownPad.full,
      })[resolveDocumentSelectionUnknownPadResult2] =
        resolveDocumentSelectionUnknownPadResult3;
    }
  }
  return (
    resolveDocumentSelectionUnknownPadResult ?? documentSelectionUnknownPad.full
  );
}

function resolveDocumentSelectionTop(
  documentSelection?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return documentSelection.rectless ||
    documentSelection.peek ||
    documentSelection.bodyH <= 0 ||
    documentSelection.docExtent === null
    ? null
    : {
        top: documentSelection.docExtent.top,
        bottom: documentSelection.docExtent.bottom,
      };
}

function resolveDocumentSelectionMoved(
  documentSelectionMoved?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies: Dynamic = 0.5,
  ..._extraArguments: unknown[]
): Dynamic {
  let seats: Dynamic = {};
  let moved: Dynamic = new (Set as Dynamic)();
  for (let resolveDocumentSelectionMovedResult in options) {
    seats[resolveDocumentSelectionMovedResult] =
      options[resolveDocumentSelectionMovedResult] -
      (context[resolveDocumentSelectionMovedResult] ?? 0);
    if (
      documentSelectionMoved &&
      resolveDocumentSelectionMovedResult in documentSelectionMoved &&
      Math.abs(
        documentSelectionMoved[resolveDocumentSelectionMovedResult] -
          seats[resolveDocumentSelectionMovedResult],
      ) > dependencies
    ) {
      moved.add(resolveDocumentSelectionMovedResult);
    }
  }
  return {
    moved: moved,
    seats: seats,
  };
}

function resolveDocumentSelectionIds(
  documentSelectionIds?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let toSorted: Dynamic = documentSelectionIds.toSorted(
    (
      activity?: Dynamic,
      activity2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      activity.y - activity2.y ||
      (activity.at ?? ``).localeCompare(activity2.at ?? ``),
  );
  let items: Dynamic = [];
  let amount: number = -1 / 0;
  for (let resolveDocumentSelectionIdsResult of toSorted as Dynamic) {
    if (
      items.length > 0 &&
      resolveDocumentSelectionIdsResult.y < amount + 26 + 6
    ) {
      items[items.length - 1].ids.push(resolveDocumentSelectionIdsResult.id);
    } else {
      items.push({
        y: resolveDocumentSelectionIdsResult.y,
        ids: [resolveDocumentSelectionIdsResult.id],
      });
    }
    amount = resolveDocumentSelectionIdsResult.y;
  }
  return items;
}

function isDocumentSelectionJoin(
  items?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (options === null)
    return items.length === 0 ? null : `none:${items.toSorted().join(`,`)}`;
  let filteredItems: Dynamic = items.filter(
    (item?: Dynamic, ..._extraArguments: unknown[]) => !options.has(item),
  );
  return filteredItems.length === 0
    ? null
    : `miss:${filteredItems.toSorted().join(`,`)}`;
}

var documentSelectionPattern: RegExp;

var resolveDocumentSelectionKind2: Dynamic;

var resolveDocumentSelectionKind3: Dynamic;

var resolveDocumentSelectionKind4: Dynamic;

var resolveDocumentSelectionKind5: (documentSelectionKind5?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolveDocumentSelectionTest: Dynamic;

function isDocumentSelectionCaret(
  documentSelectionCaret?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof documentSelectionCaret != `object` || !documentSelectionCaret)
    return null;
  let documentSelectionCaret2: Dynamic = documentSelectionCaret;
  let anchor: Dynamic = documentSelectionCaret2.anchor;
  if (typeof anchor == `object` && anchor) {
    let head =
      documentSelectionCaret2.head === `start`
        ? `start`
        : documentSelectionCaret2.head === `end`
          ? `end`
          : null;
    if (head === null) return null;
    let record: Dynamic =
      documentSelectionCaret2.caret === true
        ? {
            caret: true,
          }
        : {};
    if (anchor.kind === `chars`) {
      let range: Dynamic = anchor.range;
      return !Array.isArray(range) ||
        range.length !== 2 ||
        !resolveDocumentSelectionTest(range[0]) ||
        !resolveDocumentSelectionTest(range[1])
        ? null
        : {
            anchor: resolveDocumentSelectionKind2(range[0], range[1]),
            head: head,
            ...record,
          };
    }
    if (anchor.kind === `blocks` || anchor.kind === `cells`) {
      let ids: Dynamic = anchor.ids;
      return !Array.isArray(ids) ||
        ids.length === 0 ||
        ids.length > 128 ||
        !ids.every(resolveDocumentSelectionTest)
        ? null
        : {
            anchor: resolveDocumentSelectionKind3([...ids]),
            head: head,
            ...record,
          };
    }
    return null;
  }
  return resolveDocumentSelectionTest(documentSelectionCaret2.head)
    ? {
        anchor: resolveDocumentSelectionKind2(documentSelectionCaret2.head),
        head: `start`,
        caret: true,
      }
    : (documentSelectionCaret2.head === null ||
          documentSelectionCaret2.head === undefined) &&
        resolveDocumentSelectionTest(documentSelectionCaret2.block)
      ? {
          anchor: resolveDocumentSelectionKind3([
            documentSelectionCaret2.block,
          ]),
          head: `end`,
          caret: true,
        }
      : null;
}

var documentSelectionLimit64: number;

var DocumentSelection_BongoDocCaret: string;

var documentSelectionMap: Dynamic;

var documentSelectionState: Dynamic;

var DocumentSelectionState5: boolean;

function resolveDocumentSelectionValue3(
  ..._extraArguments: unknown[]
): Dynamic {
  if (!DocumentSelectionState5) {
    DocumentSelectionState5 = true;
    try {
      documentSelectionState ??=
        typeof sessionStorage !== "undefined" ? sessionStorage : undefined;
    } catch {
      documentSelectionState = undefined;
    }
  }
  return documentSelectionState;
}

var DocumentSelectionState6: boolean;

function updateDocumentSelectionParse(
  ..._extraArguments: unknown[]
): undefined {
  if (DocumentSelectionState6) return;
  DocumentSelectionState6 = true;
  let updateDocumentSelectionParseResult: Dynamic = null;
  try {
    updateDocumentSelectionParseResult =
      resolveDocumentSelectionValue3()?.getItem(
        DocumentSelection_BongoDocCaret,
      ) ?? null;
  } catch {
    return;
  }
  if (!updateDocumentSelectionParseResult) return;
  let updateDocumentSelectionParseResult2: Dynamic;
  try {
    updateDocumentSelectionParseResult2 = JSON.parse(
      updateDocumentSelectionParseResult,
    );
  } catch {
    return;
  }
  if (
    !(
      !updateDocumentSelectionParseResult2 ||
      typeof updateDocumentSelectionParseResult2 != `object` ||
      Array.isArray(updateDocumentSelectionParseResult2)
    )
  )
    for (let [
      updateDocumentSelectionParseResult3,
      updateDocumentSelectionParseResult4,
    ] of Object.entries(updateDocumentSelectionParseResult2) as Dynamic) {
      let isDocumentSelectionCaret2: Dynamic = isDocumentSelectionCaret(
        updateDocumentSelectionParseResult4,
      );
      if (
        isDocumentSelectionCaret2 !== null &&
        (documentSelectionMap.set(
          updateDocumentSelectionParseResult3,
          isDocumentSelectionCaret2,
        ),
        documentSelectionMap.size >= documentSelectionLimit64)
      )
        break;
    }
}

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeDocumentSelectionMapDocumentSelectionTopsStep1(): void {
  (resolveDocumentSelectionValue2 = (
    event?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    event.y === undefined
      ? Math.max(options, 0)
      : event.key === `__draft`
        ? Math.max(event.y, context)
        : event.y);
  (documentSelectionPattern = /^[A-Za-z0-9_.:-]{1,48}$/);
  (resolveDocumentSelectionKind2 = (
    documentSelectionKind2?: Dynamic,
    options: Dynamic = documentSelectionKind2,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    kind: `chars`,
    range: [documentSelectionKind2, options],
  }));
  (resolveDocumentSelectionKind3 = (
    ids?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    kind: `blocks`,
    ids: ids,
  }));
  (resolveDocumentSelectionKind4 = (
    entry?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => (entry.kind === `chars` ? [...entry.range] : entry.ids));
  (resolveDocumentSelectionKind5 = (
    documentSelectionKind5?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `${documentSelectionKind5.anchor.kind}:${resolveDocumentSelectionKind4(documentSelectionKind5.anchor).join(`,`)}|${documentSelectionKind5.head}${documentSelectionKind5.caret ? `|caret` : ``}`);
  (resolveDocumentSelectionTest = (
    documentSelectionTest?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof documentSelectionTest == `string` &&
    documentSelectionPattern.test(documentSelectionTest));
  (documentSelectionLimit64 = 64);
  (DocumentSelection_BongoDocCaret = `bongo.doc-caret`);
  (documentSelectionMap = new (Map as Dynamic)());
  (DocumentSelectionState5 = false);
  (DocumentSelectionState6 = false);
}

export {
  DocumentSelection_BongoDocCaret,
  documentSelectionLimit64,
  documentSelectionMap,
  isDocumentSelectionCaret,
  isDocumentSelectionJoin,
  isDocumentSelectionRandomUUID,
  isDocumentSelectionSlots,
  isDocumentSelectionValue,
  mapDocumentSelectionTops,
  resolveDocumentSelectionIds,
  resolveDocumentSelectionKind5,
  resolveDocumentSelectionMoved,
  resolveDocumentSelectionTop,
  resolveDocumentSelectionUnknownPad,
  resolveDocumentSelectionValue,
  resolveDocumentSelectionValue3,
  updateDocumentSelectionParse,
};
