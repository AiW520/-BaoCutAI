/** BaoCut: document host state from index-CX4IZqzA.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  api,
  createPagesStoreFoundEvent,
  createPagesStoreFoundEvent2,
  createPagesStoreFoundEvent3,
  dataOperationEngineNodeSchema,
  emitTelemetryEvent,
  latestRunSay,
  resolveObservabilityBrowserAndOperationEventsValue11,
  resolveObservabilityBrowserAndOperationEventsValue3,
  resolveObservabilityTelemetryOrdinal,
  resolveObservabilityTelemetryOrdinal2,
  resolvePlatformApiAndAuthHuman5,
} from "../dependencies";
import {
  React,
} from "../bootstrap";
import {
  isDocumentSelectionCaret,
} from "../document-selection/map-document-selection-tops";
import {
  DocumentContextSetTimeout,
} from "../document-context/create-widget-writing-coordinator";

function useDocumentHostStateJoin(
  documentHostStateJoin?: Dynamic,
  ref?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument?: Dynamic,
  argument2: Dynamic = DocumentContextSetTimeout,
  ..._extraArguments: unknown[]
): Dynamic {
  let [recordState, setRecordState]: Dynamic = (0, React.useState)({});
  let join: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]) =>
      Object.entries(context)
        .filter(
          (
            [objectEntry, objectEntry2]: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            !dependencies[objectEntry]?.failed &&
            !dependencies[objectEntry]?.blocked &&
            (objectEntry2.draft ||
              !!(
                documentHostStateJoin &&
                argument[`${documentHostStateJoin}#${objectEntry}`]
              )),
        )
        .map(
          (
            [filteredContextEntry]: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => filteredContextEntry,
        )
        .toSorted()
        .join(`,`),
    [context, argument, dependencies, documentHostStateJoin],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!join || !documentHostStateJoin) {
        setRecordState(
          (
            documentHostStateJoin2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            Object.keys(documentHostStateJoin2).length
              ? {}
              : documentHostStateJoin2,
        );
        return;
      }
      let joinParts: Dynamic = join.split(`,`);
      let enabled = false;
      let index = 0;
      let list = async (..._extraArguments: unknown[]): Promise<undefined> => {
        let useDocumentHostStateJoinResult: number = ++index;
        try {
          let list2: Dynamic = await api.comments.list(
            ref.current,
            documentHostStateJoin,
            true,
          );
          if (enabled || useDocumentHostStateJoinResult !== index) return;
          let record: Dynamic = {};
          for (let useDocumentHostStateJoinResult2 of joinParts as Dynamic) {
            let useDocumentHostStateJoinResult3: Dynamic = latestRunSay(
              list2,
              useDocumentHostStateJoinResult2,
            );
            if (useDocumentHostStateJoinResult3) {
              record[useDocumentHostStateJoinResult2] =
                useDocumentHostStateJoinResult3;
            }
          }
          setRecordState(
            (
              documentHostStateJoin2?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              JSON.stringify(documentHostStateJoin2) === JSON.stringify(record)
                ? documentHostStateJoin2
                : record,
          );
        } catch {}
      };
      list();
      let setInterval2: Dynamic = argument2.setInterval(
        (..._extraArguments: unknown[]): undefined => {
          if (!document.hidden) {
            list();
          }
        },
        7e3,
      );
      return (..._extraArguments: unknown[]): undefined => {
        enabled = true;
        argument2.clearInterval(setInterval2);
      };
    },
    [join, documentHostStateJoin, ref, argument2],
  );
  return recordState;
}

function resolveDocumentHostStateNode(
  documentHostStateNode?: Dynamic,
  node?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let isDocumentSelectionCaret2: Dynamic = isDocumentSelectionCaret(
    documentHostStateNode,
  );
  return isDocumentSelectionCaret2 === null
    ? null
    : {
        node: node,
        anchor: isDocumentSelectionCaret2.anchor,
        head: isDocumentSelectionCaret2.head,
        ...(isDocumentSelectionCaret2.caret
          ? {
              caret: true,
            }
          : {}),
      };
}

function resolveDocumentHostStateKey(
  documentHostStateKey?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  for (let resolveDocumentHostStateKeyResult of documentHostStateKey as Dynamic) {
    if (
      resolveDocumentHostStateKeyResult.who.kind !== `human` ||
      resolvePlatformApiAndAuthHuman5(
        resolveDocumentHostStateKeyResult,
        options.myConnId,
      ) ||
      resolveDocumentHostStateKeyResult.fileRef?.object !== `file` ||
      resolveDocumentHostStateKeyResult.fileRef.id !== options.fileId ||
      resolveDocumentHostStateKeyResult.cursor === undefined ||
      resolveDocumentHostStateKeyResult.cursor === null
    )
      continue;
    let safeParse: Dynamic = dataOperationEngineNodeSchema.safeParse(
      resolveDocumentHostStateKeyResult.cursor,
    );
    if (!(!safeParse.success || safeParse.data.node !== options.nodeId)) {
      items.push({
        key: `human:${resolveDocumentHostStateKeyResult.who.email}#${resolveDocumentHostStateKeyResult.who.connId}`,
        name: options.label(resolveDocumentHostStateKeyResult.who.email),
        color:
          options.shellColor(resolveDocumentHostStateKeyResult.who.email) ??
          resolveDocumentHostStateKeyResult.color,
        sel: {
          anchor:
            safeParse.data.anchor.kind === `chars`
              ? {
                  kind: `chars`,
                  range: [
                    safeParse.data.anchor.range[0],
                    safeParse.data.anchor.range[1],
                  ],
                }
              : {
                  kind: `blocks`,
                  ids: [...safeParse.data.anchor.ids],
                },
          head: safeParse.data.head,
          ...(safeParse.data.caret
            ? {
                caret: true,
              }
            : {}),
        },
      });
    }
  }
  return items.toSorted(
    (event?: Dynamic, event2?: Dynamic, ..._extraArguments: unknown[]) =>
      event.key < event2.key ? -1 : +(event.key > event2.key),
  );
}

var mapDocumentHostStateJoin: Dynamic;

var documentHostStateLimit2000: number;

var documentHostStateLimit60000: number;

var DocumentHostStateState: number;

var DocumentHostStateHere: Dynamic;

var resolveDocumentHostStateLast: Dynamic;

var resolveDocumentHostStateLast2: Dynamic;

var resolveDocumentHostStateStartsWith: Dynamic;

var resolveDocumentHostStateIncludes: Dynamic;

var DocumentHostState_Member: string;

var resolveDocumentHostStateKnown: Dynamic;

var resolveDocumentHostStateFeedUp: Dynamic;

var resolveDocumentHostStateValue: Dynamic;

var documentHostStateLimit5000: number;

var documentHostStateLimit20002: number;

var documentHostStateLimit30000: number;

var documentHostStateLimit600002: number;

var documentHostStateLimit75000: number;

var documentHostStateLimit15000: number;

var documentHostStateLimit1000: number;

var DocumentHostStateState2: Dynamic;

var resolveDocumentHostStateSeen: Dynamic;

function createDocumentHostCoordinator(
  scheduler?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let uniqueItems2: Dynamic = new (Set as Dynamic)();
  let uniqueItems3: Dynamic = new (Set as Dynamic)();
  let lookup: Dynamic = new (Map as Dynamic)();
  let lookup2: Dynamic = new (Map as Dynamic)();
  let lookup3: Dynamic = new (Map as Dynamic)();
  let lookup4: Dynamic = new (Map as Dynamic)();
  let lookup5: Dynamic = new (Map as Dynamic)();
  let uniqueItems4: Dynamic = new (Set as Dynamic)();
  let uniqueItems5: Dynamic = new (Set as Dynamic)();
  let lookup6: Dynamic = new (Map as Dynamic)();
  let uniqueItems6: Dynamic = new (Set as Dynamic)();
  let lookup7: Dynamic = new (Map as Dynamic)();
  let activity: Dynamic = null;
  let activity2: Dynamic = null;
  let createDocumentHostCoordinatorResult: Dynamic = null;
  let createDocumentHostCoordinatorResult2: Dynamic = null;
  let createDocumentHostCoordinatorResult3: Dynamic = null;
  let enabled = false;
  let enabled2: boolean = true;
  let createDocumentHostCoordinatorResult4: Dynamic = null;
  let items: Dynamic = [];
  let last: Dynamic = scheduler.memory.last;
  if (
    last !== null &&
    last.tab === scheduler.tab &&
    Math.abs(scheduler.now() - last.at) <= 1e4
  ) {
    for (let createDocumentHostCoordinatorResult5 of last.said as Dynamic) {
      uniqueItems.add(createDocumentHostCoordinatorResult5);
      uniqueItems3.add(createDocumentHostCoordinatorResult5);
    }
    for (let [
      createDocumentHostCoordinatorResult5,
      createDocumentHostCoordinatorResult6,
    ] of last.letGo as Dynamic)
      if (!uniqueItems.has(createDocumentHostCoordinatorResult5)) {
        lookup.set(createDocumentHostCoordinatorResult5, {
          at: createDocumentHostCoordinatorResult6,
          since: scheduler.now(),
        });
      }
  }
  let createDocumentHostCoordinatorHandler = (
    documentHostCoordinator?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    uniqueItems.delete(documentHostCoordinator);
    uniqueItems2.delete(documentHostCoordinator);
    uniqueItems3.delete(documentHostCoordinator);
    lookup2.delete(documentHostCoordinator);
    lookup6.delete(documentHostCoordinator);
    uniqueItems6.delete(documentHostCoordinator);
    lookup7.delete(documentHostCoordinator);
  };
  let cancel = (
    documentHostCoordinator?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    createDocumentHostCoordinatorHandler(documentHostCoordinator);
    lookup.delete(documentHostCoordinator);
    lookup3.delete(documentHostCoordinator);
    lookup5.delete(documentHostCoordinator);
    let lookupEntry: Dynamic = lookup4.get(documentHostCoordinator);
    if (lookupEntry !== undefined) {
      scheduler.cancel(lookupEntry);
    }
    lookup4.delete(documentHostCoordinator);
  };
  let here = (..._extraArguments: unknown[]): undefined => {
    createDocumentHostCoordinatorResult = null;
    if (enabled) return;
    let enabled3 = false;
    for (let createDocumentHostCoordinatorResult5 of lookup3.keys() as Dynamic)
      if (scheduler.isSelf(createDocumentHostCoordinatorResult5)) {
        cancel(createDocumentHostCoordinatorResult5);
        enabled3 = true;
      }
    if (lookup3.size === 0) return;
    if (!scheduler.identityKnown()) {
      createDocumentHostCoordinatorResult3 ??= scheduler.now();
      let matchesDifference =
        scheduler.now() - createDocumentHostCoordinatorResult3 >=
        documentHostStateLimit600002;
      createDocumentHostCoordinatorResult = scheduler.schedule(
        here,
        matchesDifference
          ? documentHostStateLimit30000
          : documentHostStateLimit20002,
      );
      return;
    }
    createDocumentHostCoordinatorResult3 = null;
    let total: Dynamic =
      (Math.min as Dynamic)(...lookup3.values()) + documentHostStateLimit2000;
    if (enabled3 && total > scheduler.now()) {
      createDocumentHostCoordinatorResult = scheduler.schedule(
        here,
        total - scheduler.now(),
      );
      return;
    }
    let people: Dynamic = [...lookup3.keys()];
    let index = 0;
    for (let createDocumentHostCoordinatorResult5 of new (Set as Dynamic)([
      ...uniqueItems,
      ...people,
    ]) as Dynamic)
      if (!scheduler.isSelf(createDocumentHostCoordinatorResult5)) {
        index++;
      }
    scheduler.say(DocumentHostStateHere.here(index), `here`);
    for (let createDocumentHostCoordinatorResult5 of people as Dynamic)
      uniqueItems.add(createDocumentHostCoordinatorResult5);
    lookup3.clear();
    activity = {
      at: scheduler.now(),
      people: people,
    };
  };
  let isSelf = (..._extraArguments: unknown[]): undefined => {
    createDocumentHostCoordinatorResult2 = null;
    if (enabled) return;
    if (!scheduler.linkUp()) {
      for (let createDocumentHostCoordinatorResult5 of lookup5.keys() as Dynamic)
        lookup4.set(
          createDocumentHostCoordinatorResult5,
          scheduler.schedule(
            (..._extraArguments: unknown[]) =>
              schedule3(createDocumentHostCoordinatorResult5),
            documentHostStateLimit5000,
          ),
        );
      lookup5.clear();
      return;
    }
    let people: Dynamic = [...lookup5.keys()].filter(
      (item?: Dynamic, ..._extraArguments: unknown[]) =>
        !uniqueItems2.has(item) && !scheduler.isSelf(item),
    );
    if (people.length > 0) {
      scheduler.say(DocumentHostStateHere.left(people.length), `left`);
    }
    for (let createDocumentHostCoordinatorResult5 of lookup5.keys() as Dynamic)
      if (
        uniqueItems2.has(createDocumentHostCoordinatorResult5) &&
        !scheduler.isSelf(createDocumentHostCoordinatorResult5)
      ) {
        lookup.set(createDocumentHostCoordinatorResult5, {
          at: scheduler.now(),
          since: scheduler.now(),
        });
      }
    for (let createDocumentHostCoordinatorResult5 of lookup5.keys() as Dynamic)
      createDocumentHostCoordinatorHandler(
        createDocumentHostCoordinatorResult5,
      );
    lookup5.clear();
    if (people.length > 0) {
      activity2 = {
        at: scheduler.now(),
        people: people,
      };
    }
  };
  let createDocumentHostCoordinatorHandler2: Dynamic = (
    documentHostCoordinator?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let lookupEntry: Dynamic = lookup6.get(documentHostCoordinator);
    if (lookupEntry === undefined) return;
    let difference: number = options - lookupEntry;
    return difference >= 0 && difference <= documentHostStateLimit75000
      ? lookupEntry
      : undefined;
  };
  let createDocumentHostCoordinatorHandler3: Dynamic = (
    documentHostCoordinator?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    createDocumentHostCoordinatorHandler2(
      documentHostCoordinator,
      lookup2.get(documentHostCoordinator)?.at ?? scheduler.now(),
    ) === undefined
      ? DocumentHostStateState
      : documentHostStateLimit60000;
  let schedule = (..._extraArguments: unknown[]): undefined => {
    if (createDocumentHostCoordinatorResult2 !== null) {
      scheduler.cancel(createDocumentHostCoordinatorResult2);
    }
    createDocumentHostCoordinatorResult2 = null;
    if (lookup5.size > 0) {
      let total: Dynamic =
        (Math.min as Dynamic)(...lookup5.values()) + documentHostStateLimit2000;
      createDocumentHostCoordinatorResult2 = scheduler.schedule(
        isSelf,
        Math.min(
          documentHostStateLimit2000,
          Math.max(0, total - scheduler.now()),
        ),
      );
    }
  };
  let createDocumentHostCoordinatorHandler4 = (
    documentHostCoordinator?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    lookup6.delete(documentHostCoordinator);
    uniqueItems5.delete(documentHostCoordinator);
    uniqueItems6.add(documentHostCoordinator);
  };
  let createDocumentHostCoordinatorHandler5: Dynamic = (
    documentHostCoordinator?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let lookupEntry: Dynamic = lookup.get(documentHostCoordinator);
    return lookupEntry !== undefined && scheduler.now() - lookupEntry.at <= 3e5;
  };
  let schedule2 = (
    documentHostCoordinator?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    lookup4.delete(documentHostCoordinator);
    if (!enabled) {
      lookup5.set(documentHostCoordinator, scheduler.now());
      createDocumentHostCoordinatorResult2 ??= scheduler.schedule(
        isSelf,
        documentHostStateLimit2000,
      );
    }
  };
  let schedule3 = (
    documentHostCoordinator?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    lookup4.delete(documentHostCoordinator);
    if (!enabled) {
      lookup4.set(
        documentHostCoordinator,
        scheduler.linkUp()
          ? scheduler.schedule(
              (..._extraArguments: unknown[]) =>
                schedule2(documentHostCoordinator),
              createDocumentHostCoordinatorHandler3(documentHostCoordinator),
            )
          : scheduler.schedule(
              (..._extraArguments: unknown[]) =>
                schedule3(documentHostCoordinator),
              documentHostStateLimit5000,
            ),
      );
    }
  };
  let schedule4 = (
    documentHostCoordinator?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    items = documentHostCoordinator;
    let uniqueItems7: Dynamic = new (Set as Dynamic)();
    let uniqueItems8: Dynamic = new (Set as Dynamic)();
    for (let {
      key: createDocumentHostCoordinatorResult5,
    } of documentHostCoordinator as Dynamic) {
      let documentHostStateStartsWith: Dynamic =
        resolveDocumentHostStateStartsWith(
          createDocumentHostCoordinatorResult5,
        );
      if (documentHostStateStartsWith !== ``) {
        uniqueItems7.add(documentHostStateStartsWith);
        if (createDocumentHostCoordinatorResult5.includes(`#`)) {
          uniqueItems8.add(documentHostStateStartsWith);
        }
      }
    }
    let enabled3 = false;
    let enabled4 = false;
    for (let createDocumentHostCoordinatorResult5 of [
      ...uniqueItems7,
      ...uniqueItems,
      ...lookup3.keys(),
    ] as Dynamic)
      if (scheduler.isSelf(createDocumentHostCoordinatorResult5)) {
        if (lookup3.has(createDocumentHostCoordinatorResult5)) {
          enabled3 = true;
        }
        if (lookup5.has(createDocumentHostCoordinatorResult5)) {
          enabled4 = true;
        }
        uniqueItems7.delete(createDocumentHostCoordinatorResult5);
        cancel(createDocumentHostCoordinatorResult5);
      }
    uniqueItems4 = uniqueItems7;
    let options2: Dynamic = options && enabled2;
    for (let createDocumentHostCoordinatorResult5 of uniqueItems5 as Dynamic)
      if (
        !uniqueItems8.has(createDocumentHostCoordinatorResult5) &&
        (uniqueItems4.has(createDocumentHostCoordinatorResult5) ||
          uniqueItems.has(createDocumentHostCoordinatorResult5) ||
          lookup3.has(createDocumentHostCoordinatorResult5))
      ) {
        lookup6.set(createDocumentHostCoordinatorResult5, scheduler.now());
      }
    uniqueItems5 = new (Set as Dynamic)(
      [...uniqueItems8].filter(
        (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          uniqueItems4.has(item) && (options2 || !uniqueItems6.has(item)),
      ),
    );
    if (options2)
      for (let createDocumentHostCoordinatorResult5 of uniqueItems8 as Dynamic)
        uniqueItems6.delete(createDocumentHostCoordinatorResult5);
    for (let createDocumentHostCoordinatorResult5 of uniqueItems4 as Dynamic) {
      if (options && uniqueItems8.has(createDocumentHostCoordinatorResult5)) {
        uniqueItems2.delete(createDocumentHostCoordinatorResult5);
      }
      lookup2.delete(createDocumentHostCoordinatorResult5);
      let lookupEntry: Dynamic = lookup4.get(
        createDocumentHostCoordinatorResult5,
      );
      if (lookupEntry !== undefined) {
        scheduler.cancel(lookupEntry);
        lookup4.delete(createDocumentHostCoordinatorResult5);
      } else if (lookup5.delete(createDocumentHostCoordinatorResult5))
        enabled4 = true;
      else if (
        createDocumentHostCoordinatorHandler5(
          createDocumentHostCoordinatorResult5,
        )
      ) {
        let since: Dynamic =
          lookup.get(createDocumentHostCoordinatorResult5)?.since ?? 0;
        lookup.delete(createDocumentHostCoordinatorResult5);
        uniqueItems.add(createDocumentHostCoordinatorResult5);
        let lookupEntry2: Dynamic = lookup7.get(
          createDocumentHostCoordinatorResult5,
        );
        if (
          !(
            options && uniqueItems8.has(createDocumentHostCoordinatorResult5)
          ) &&
          !(
            lookupEntry2 !== undefined &&
            lookupEntry2 >= since &&
            lookupEntry2 <= scheduler.now()
          )
        ) {
          uniqueItems2.add(createDocumentHostCoordinatorResult5);
        }
      } else if (
        !uniqueItems.has(createDocumentHostCoordinatorResult5) &&
        !lookup3.has(createDocumentHostCoordinatorResult5)
      ) {
        lookup.delete(createDocumentHostCoordinatorResult5);
        lookup3.set(createDocumentHostCoordinatorResult5, scheduler.now());
      }
    }
    for (let createDocumentHostCoordinatorResult5 of lookup3.keys() as Dynamic)
      if (!uniqueItems4.has(createDocumentHostCoordinatorResult5)) {
        lookup3.delete(createDocumentHostCoordinatorResult5);
        lookup6.delete(createDocumentHostCoordinatorResult5);
        uniqueItems6.delete(createDocumentHostCoordinatorResult5);
        enabled3 = true;
      }
    if (enabled3 && createDocumentHostCoordinatorResult !== null) {
      scheduler.cancel(createDocumentHostCoordinatorResult);
      createDocumentHostCoordinatorResult = null;
    }
    if (lookup3.size > 0 && createDocumentHostCoordinatorResult === null) {
      let total: Dynamic =
        (Math.min as Dynamic)(...lookup3.values()) + documentHostStateLimit2000;
      createDocumentHostCoordinatorResult = scheduler.schedule(
        here,
        Math.max(0, total - scheduler.now()),
      );
    }
    if (enabled4 || createDocumentHostCoordinatorResult2 === null) {
      schedule();
    }
    for (let createDocumentHostCoordinatorResult5 of uniqueItems as Dynamic)
      if (
        !uniqueItems4.has(createDocumentHostCoordinatorResult5) &&
        !lookup4.has(createDocumentHostCoordinatorResult5) &&
        !lookup5.has(createDocumentHostCoordinatorResult5)
      ) {
        let createDocumentHostCoordinatorResult6: Dynamic;
        if (!lookup2.has(createDocumentHostCoordinatorResult5)) {
          let documentHostCoordinatorHandler: Dynamic =
            createDocumentHostCoordinatorHandler2(
              createDocumentHostCoordinatorResult5,
              scheduler.now(),
            );
          createDocumentHostCoordinatorResult6 =
            documentHostCoordinatorHandler === undefined
              ? DocumentHostStateState
              : Math.max(
                  documentHostStateLimit15000,
                  documentHostCoordinatorHandler +
                    documentHostStateLimit60000 -
                    scheduler.now(),
                );
          lookup2.set(createDocumentHostCoordinatorResult5, {
            at: documentHostCoordinatorHandler ?? scheduler.now(),
            linkUp: enabled2 && scheduler.linkUp(),
          });
        }
        if (!enabled2) continue;
        lookup4.set(
          createDocumentHostCoordinatorResult5,
          scheduler.schedule(
            (..._extraArguments: unknown[]) =>
              schedule2(createDocumentHostCoordinatorResult5),
            createDocumentHostCoordinatorResult6 ??
              createDocumentHostCoordinatorHandler3(
                createDocumentHostCoordinatorResult5,
              ),
          ),
        );
      }
  };
  if (uniqueItems.size > 0) {
    schedule4([], false);
  }
  return {
    seen(
      documentHostCoordinator?: Dynamic,
      options: Dynamic = true,
      ..._extraArguments: unknown[]
    ): undefined {
      if (!enabled) {
        schedule4(documentHostCoordinator, options);
      }
    },
    wrote(
      documentHostCoordinator?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (enabled) return;
      let documentHostStateStartsWith: Dynamic =
        resolveDocumentHostStateStartsWith(`human:${documentHostCoordinator}`);
      if (
        documentHostStateStartsWith === `` ||
        (lookup7.set(documentHostStateStartsWith, scheduler.now()),
        !uniqueItems.has(documentHostStateStartsWith) &&
          !lookup3.has(documentHostStateStartsWith))
      )
        return;
      let result: Dynamic = uniqueItems2.delete(documentHostStateStartsWith);
      let lookupEntry: Dynamic = lookup6.get(documentHostStateStartsWith);
      let difference: number =
        lookupEntry === undefined ? -1 : scheduler.now() - lookupEntry;
      if (
        (enabled2 && !result && difference >= 0 && difference < 5e3) ||
        ((result ||
          !enabled2 ||
          !uniqueItems5.has(documentHostStateStartsWith)) &&
          createDocumentHostCoordinatorHandler4(documentHostStateStartsWith),
        !uniqueItems.has(documentHostStateStartsWith) ||
          uniqueItems4.has(documentHostStateStartsWith))
      )
        return;
      let lookupEntry2: Dynamic = lookup4.get(documentHostStateStartsWith);
      if (lookupEntry2 !== undefined) {
        scheduler.cancel(lookupEntry2);
      }
      lookup4.delete(documentHostStateStartsWith);
      let result2: Dynamic = lookup5.delete(documentHostStateStartsWith);
      lookup2.set(documentHostStateStartsWith, {
        at: scheduler.now(),
        linkUp: enabled2 && scheduler.linkUp(),
      });
      if (enabled2) {
        lookup4.set(
          documentHostStateStartsWith,
          scheduler.schedule(
            (..._extraArguments: unknown[]) =>
              schedule2(documentHostStateStartsWith),
            DocumentHostStateState,
          ),
        );
      }
      if (result2) {
        schedule();
      }
    },
    connected(
      documentHostCoordinator?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (enabled) return;
      let now: Dynamic = enabled2
        ? scheduler.now()
        : (createDocumentHostCoordinatorResult4 ?? scheduler.now());
      if (!documentHostCoordinator && enabled2) {
        createDocumentHostCoordinatorResult4 = scheduler.now();
      }
      enabled2 = documentHostCoordinator;
      for (let createDocumentHostCoordinatorResult5 of lookup4.values() as Dynamic)
        scheduler.cancel(createDocumentHostCoordinatorResult5);
      lookup4.clear();
      if (createDocumentHostCoordinatorResult2 !== null) {
        scheduler.cancel(createDocumentHostCoordinatorResult2);
      }
      createDocumentHostCoordinatorResult2 = null;
      lookup5.clear();
      if (documentHostCoordinator) {
        for (let createDocumentHostCoordinatorResult5 of uniqueItems as Dynamic) {
          let lookupEntry: Dynamic = lookup2.get(
            createDocumentHostCoordinatorResult5,
          );
          let matchesLookupEntry: Dynamic =
            lookupEntry !== undefined &&
            lookupEntry.linkUp &&
            now - lookupEntry.at >= 35e3;
          let lookupEntry2: Dynamic = lookup7.get(
            createDocumentHostCoordinatorResult5,
          );
          let matchesLookupEntry2 =
            lookupEntry2 !== undefined &&
            lookupEntry2 >= now &&
            lookupEntry2 <= scheduler.now();
          if (
            !matchesLookupEntry &&
            !matchesLookupEntry2 &&
            !uniqueItems3.has(createDocumentHostCoordinatorResult5)
          ) {
            uniqueItems2.add(createDocumentHostCoordinatorResult5);
          }
        }
        uniqueItems3.clear();
        for (let createDocumentHostCoordinatorResult5 of lookup.values() as Dynamic)
          if (createDocumentHostCoordinatorResult5.since < now) {
            createDocumentHostCoordinatorResult5.since = now;
          }
        schedule4(items, false);
      }
    },
    close(..._extraArguments: unknown[]): undefined {
      if (enabled) return;
      enabled = true;
      let uniqueItems7: Dynamic = new (Set as Dynamic)(uniqueItems);
      if (
        activity !== null &&
        scheduler.now() - activity.at < documentHostStateLimit1000
      )
        for (let createDocumentHostCoordinatorResult5 of activity.people as Dynamic)
          uniqueItems7.delete(createDocumentHostCoordinatorResult5);
      if (
        activity2 !== null &&
        scheduler.now() - activity2.at < documentHostStateLimit1000
      )
        for (let createDocumentHostCoordinatorResult5 of activity2.people as Dynamic)
          uniqueItems7.add(createDocumentHostCoordinatorResult5);
      let record: Dynamic = {
        tab: scheduler.tab,
        at: scheduler.now(),
        said: [...uniqueItems7],
        letGo: [...lookup]
          .filter(
            ([item]: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              !uniqueItems7.has(item) &&
              createDocumentHostCoordinatorHandler5(item),
          )
          .map(
            (
              [filteredItem, activity3]: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => [filteredItem, activity3.at],
          ),
      };
      scheduler.memory.last = record;
      for (let createDocumentHostCoordinatorResult5 of lookup4.values() as Dynamic)
        scheduler.cancel(createDocumentHostCoordinatorResult5);
      if (createDocumentHostCoordinatorResult !== null) {
        scheduler.cancel(createDocumentHostCoordinatorResult);
      }
      if (createDocumentHostCoordinatorResult2 !== null) {
        scheduler.cancel(createDocumentHostCoordinatorResult2);
      }
      createDocumentHostCoordinatorResult =
        createDocumentHostCoordinatorResult2 = null;
      lookup4.clear();
      lookup3.clear();
      lookup5.clear();
      uniqueItems.clear();
      scheduler.unsay();
      scheduler.schedule(
        resolveDocumentHostStateLast2(scheduler.memory, record),
        11e3,
      );
    },
  };
}

function resolveDocumentHostStateValue2(
  ..._extraArguments: unknown[]
): Dynamic {
  let resolveDocumentHostStateValue2Result: Dynamic = null;
  let enabled = false;
  return {
    issued(
      documentHostStateValue2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      resolveDocumentHostStateValue2Result = documentHostStateValue2;
    },
    bell(documentHostStateValue2?: Dynamic, ..._extraArguments: unknown[]) {
      if (
        resolveDocumentHostStateValue2Result !== null &&
        documentHostStateValue2 !== resolveDocumentHostStateValue2Result
      ) {
        enabled = true;
      }
      return enabled;
    },
    spend(..._extraArguments: unknown[]) {
      let enabled2 = enabled;
      enabled = false;
      resolveDocumentHostStateValue2Result = null;
      return enabled2;
    },
  };
}

function installDocumentHostStateVisibilityState(
  installDocumentHostStateVisibilityState2?: Dynamic,
  options: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let win: Dynamic =
    options.win ?? (typeof window === "undefined" ? undefined : window);
  let doc: Dynamic =
    options.doc ?? (typeof document === "undefined" ? undefined : document);
  if (!win || !doc)
    return (..._extraArguments: unknown[]): undefined => undefined;
  let installDocumentHostStateVisibilityState3 = (
    ..._extraArguments: unknown[]
  ): undefined =>
    void (
      (doc.visibilityState ?? `visible`) === `visible` &&
      installDocumentHostStateVisibilityState2()
    );
  doc.addEventListener(
    `visibilitychange`,
    installDocumentHostStateVisibilityState3,
  );
  win.addEventListener(`focus`, installDocumentHostStateVisibilityState2);
  win.addEventListener(`online`, installDocumentHostStateVisibilityState2);
  return (..._extraArguments: unknown[]): undefined => {
    doc.removeEventListener(
      `visibilitychange`,
      installDocumentHostStateVisibilityState3,
    );
    win.removeEventListener(`focus`, installDocumentHostStateVisibilityState2);
    win.removeEventListener(`online`, installDocumentHostStateVisibilityState2);
  };
}

var DocumentHostStateState3: string[];

var DocumentHostStateState4: string[];

var documentHostStateSet: Dynamic;

var documentHostStateLimit10000: number;

var documentHostStateLimit128: number;

var resolveDocumentHostStateStaged: Dynamic;

var isDocumentHostStateIncomplete: Dynamic;

function collectDocumentSourceEvidence(
  collectDocumentSourceEvidence2?: Dynamic,
  options: Dynamic = new (Map as Dynamic)(),
  ..._extraArguments: unknown[]
): Dynamic {
  let collectDocumentSourceEvidenceHandler: Dynamic = (
    items?: unknown,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (
      typeof items != `string` ||
      items === `` ||
      items.length > documentHostStateLimit128
    )
      return;
    let optionEntry: Dynamic = options.get(items);
    if (optionEntry === undefined && options.size < 256) {
      options.set(
        items,
        (optionEntry = {
          found: {},
          pictured: false,
          closed: false,
          said: false,
          waiting: false,
          told: false,
          owed: false,
        }),
      );
    }
    return optionEntry;
  };
  let collectDocumentSourceEvidence3: Dynamic = (
    collectDocumentSourceEvidence4?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    try {
      return collectDocumentSourceEvidence4();
    } catch {
      return;
    }
  };
  let emit = (
    collectDocumentSourceEvidence4?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      collectDocumentSourceEvidence4.said ||
      !collectDocumentSourceEvidence4.pictured
    )
      return;
    let DocumentHostStateState32 = DocumentHostStateState3.find(
      (DocumentHostStateState33?: Dynamic, ..._extraArguments: unknown[]) =>
        collectDocumentSourceEvidence4.found[DocumentHostStateState33] !==
        undefined,
    );
    if (
      DocumentHostStateState32 === undefined &&
      collectDocumentSourceEvidence4.unread === undefined
    )
      return;
    collectDocumentSourceEvidence4.said = true;
    let {
      found: collectDocumentSourceEvidence5,
      unread: collectDocumentSourceEvidence6,
    }: Dynamic = collectDocumentSourceEvidence4;
    collectDocumentSourceEvidence4.found = {};
    delete collectDocumentSourceEvidence4.unread;
    let collectDocumentSourceEvidenceResult2: Dynamic =
      DocumentHostStateState32 === undefined
        ? createPagesStoreFoundEvent3(
            `found:unread`,
            collectDocumentSourceEvidence6,
            1,
            collectDocumentSourceEvidence3(collectDocumentSourceEvidence2.boot),
            collectDocumentSourceEvidence3(collectDocumentSourceEvidence2.plat),
          )
        : createPagesStoreFoundEvent3(
            `found:unsent`,
            DocumentHostStateState32,
            collectDocumentSourceEvidence5[DocumentHostStateState32],
            collectDocumentSourceEvidence3(collectDocumentSourceEvidence2.boot),
            collectDocumentSourceEvidence3(collectDocumentSourceEvidence2.plat),
          );
    if (collectDocumentSourceEvidenceResult2 !== null) {
      collectDocumentSourceEvidence2.emit(collectDocumentSourceEvidenceResult2);
    }
  };
  let collectDocumentSourceEvidenceHandler2: Dynamic =
    (
      collectDocumentSourceEvidence4?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
    (...collectDocumentSourceEvidence5: Dynamic[]): undefined => {
      try {
        (collectDocumentSourceEvidence4 as Dynamic)(
          ...collectDocumentSourceEvidence5,
        );
      } catch {}
    };
  let collectDocumentSourceEvidenceResult: Dynamic;
  let random: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
    collectDocumentSourceEvidenceResult === undefined
      ? ((collectDocumentSourceEvidenceResult = false),
        (collectDocumentSourceEvidenceResult =
          resolveObservabilityBrowserAndOperationEventsValue11(
            collectDocumentSourceEvidence2.random(),
          )),
        collectDocumentSourceEvidenceResult)
      : collectDocumentSourceEvidenceResult;
  let indexOf = (
    collectDocumentSourceEvidence4?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let collectDocumentSourceEvidenceHandler3: Dynamic =
      collectDocumentSourceEvidenceHandler(collectDocumentSourceEvidence4);
    if (
      !(
        collectDocumentSourceEvidenceHandler3 === undefined ||
        collectDocumentSourceEvidenceHandler3.told
      )
    ) {
      if (
        collectDocumentSourceEvidenceHandler3.look === undefined ||
        DocumentHostStateState4.indexOf(options2) <
          DocumentHostStateState4.indexOf(
            collectDocumentSourceEvidenceHandler3.look,
          )
      ) {
        collectDocumentSourceEvidenceHandler3.look = options2;
      }
    }
  };
  let emit2 = (
    collectDocumentSourceEvidence4?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (!collectDocumentSourceEvidence4.owed) return;
    let collectDocumentSourceEvidenceResult2: Dynamic =
      createPagesStoreFoundEvent2(
        `found:${collectDocumentSourceEvidence4.outcome ?? `waits`}`,
        collectDocumentSourceEvidence3(collectDocumentSourceEvidence2.boot),
        collectDocumentSourceEvidence3(collectDocumentSourceEvidence2.plat),
      );
    if (collectDocumentSourceEvidenceResult2 !== null) {
      collectDocumentSourceEvidence2.emit(collectDocumentSourceEvidenceResult2);
    }
  };
  let emit3 = (
    collectDocumentSourceEvidence4?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let collectDocumentSourceEvidenceHandler3: Dynamic =
      collectDocumentSourceEvidenceHandler(collectDocumentSourceEvidence4);
    if (
      !(
        collectDocumentSourceEvidenceHandler3 === undefined ||
        !collectDocumentSourceEvidenceHandler3.owed ||
        collectDocumentSourceEvidenceHandler3.outcome === `handed`
      )
    ) {
      collectDocumentSourceEvidenceHandler3.outcome = options2;
      if (collectDocumentSourceEvidenceHandler3.told && options2 === `handed`) {
        emit2(collectDocumentSourceEvidenceHandler3);
      }
    }
  };
  let emit4 = (
    collectDocumentSourceEvidence4?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (collectDocumentSourceEvidence4.told) return;
    collectDocumentSourceEvidence4.told = true;
    let look: Dynamic = collectDocumentSourceEvidence4.look;
    delete collectDocumentSourceEvidence4.look;
    if (collectDocumentSourceEvidence4.said)
      return void emit2(collectDocumentSourceEvidence4);
    if (look === undefined || (look === `none` && !random())) return;
    let collectDocumentSourceEvidenceResult2: Dynamic =
      createPagesStoreFoundEvent(
        `found:${look}`,
        collectDocumentSourceEvidence3(collectDocumentSourceEvidence2.boot),
        collectDocumentSourceEvidence3(collectDocumentSourceEvidence2.plat),
      );
    if (collectDocumentSourceEvidenceResult2 !== null) {
      collectDocumentSourceEvidence2.emit(collectDocumentSourceEvidenceResult2);
    }
  };
  return {
    claimed: collectDocumentSourceEvidenceHandler2(
      (
        collectDocumentSourceEvidence4?: Dynamic,
        options2?: Dynamic,
        context?: unknown,
        dependencies?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let collectDocumentSourceEvidenceHandler3: Dynamic =
          collectDocumentSourceEvidenceHandler(collectDocumentSourceEvidence4);
        if (
          collectDocumentSourceEvidenceHandler3 === undefined ||
          collectDocumentSourceEvidenceHandler3.closed ||
          collectDocumentSourceEvidenceHandler3.said ||
          !DocumentHostStateState3.includes(options2) ||
          typeof context != `number` ||
          !Number.isFinite(context) ||
          context < 1
        )
          return;
        let options3: Dynamic = options2;
        if (
          !(
            options3 !== `rows` &&
            collectDocumentSourceEvidenceHandler3.pictured
          )
        ) {
          if (options3 === `words`) {
            collectDocumentSourceEvidenceHandler3.owed = true;
          }
          if (dependencies === `unproven`) {
            collectDocumentSourceEvidenceHandler3.unread ??= options3;
          } else {
            collectDocumentSourceEvidenceHandler3.found[options3] = Math.max(
              collectDocumentSourceEvidenceHandler3.found[options3] ?? 0,
              Math.floor(context),
            );
          }
          emit(collectDocumentSourceEvidenceHandler3);
        }
      },
    ),
    looked: collectDocumentSourceEvidenceHandler2(
      (
        collectDocumentSourceEvidence4?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (options2 === `none` || options2 === `late` || options2 === `fail`) {
          indexOf(collectDocumentSourceEvidence4, options2);
        }
      },
    ),
    faulted: collectDocumentSourceEvidenceHandler2(
      (
        collectDocumentSourceEvidence4?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (documentHostStateSet.has(options2)) {
          indexOf(collectDocumentSourceEvidence4, `fail`);
        }
      },
    ),
    unscoped: collectDocumentSourceEvidenceHandler2(
      (
        collectDocumentSourceEvidence4?: Dynamic,
        ..._extraArguments: unknown[]
      ) => indexOf(collectDocumentSourceEvidence4, `noscope`),
    ),
    handed: collectDocumentSourceEvidenceHandler2(
      (
        collectDocumentSourceEvidence4?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (resolveDocumentHostStateStaged(options2)) {
          emit3(collectDocumentSourceEvidence4, `handed`);
        }
      },
    ),
    lines: collectDocumentSourceEvidenceHandler2(
      (
        collectDocumentSourceEvidence4?: Dynamic,
        ..._extraArguments: unknown[]
      ) => emit3(collectDocumentSourceEvidence4, `lines`),
    ),
    pictured: collectDocumentSourceEvidenceHandler2(
      (
        collectDocumentSourceEvidence4?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let collectDocumentSourceEvidenceHandler3: Dynamic =
          collectDocumentSourceEvidenceHandler(collectDocumentSourceEvidence4);
        if (collectDocumentSourceEvidenceHandler3 !== undefined) {
          collectDocumentSourceEvidenceHandler3.pictured = true;
          if (
            collectDocumentSourceEvidenceHandler3.outcome === `lines` &&
            isDocumentHostStateIncomplete(options2)
          ) {
            delete collectDocumentSourceEvidenceHandler3.outcome;
          }
          emit(collectDocumentSourceEvidenceHandler3);
          if (!collectDocumentSourceEvidenceHandler3.waiting) {
            collectDocumentSourceEvidenceHandler3.waiting = true;
            collectDocumentSourceEvidence2.later(
              collectDocumentSourceEvidenceHandler2(
                (..._extraArguments: unknown[]) =>
                  emit4(collectDocumentSourceEvidenceHandler3),
              ),
              documentHostStateLimit10000,
            );
          }
        }
      },
    ),
    closed: collectDocumentSourceEvidenceHandler2(
      (
        collectDocumentSourceEvidence4?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let collectDocumentSourceEvidenceHandler3: Dynamic =
          collectDocumentSourceEvidenceHandler(collectDocumentSourceEvidence4);
        if (collectDocumentSourceEvidenceHandler3 !== undefined) {
          collectDocumentSourceEvidenceHandler3.closed = true;
        }
      },
    ),
  };
}

var DocumentHostStateEmit: Dynamic;

var DocumentHostStateClaimed: Dynamic;

var DocumentHostStateClosed: Dynamic;

var DocumentHostStateFaulted: Dynamic;

var DocumentHostStateHanded: Dynamic;

var DocumentHostStateLines: Dynamic;

var DocumentHostStateLooked: Dynamic;

var DocumentHostStatePictured: Dynamic;

var DocumentHostStateUnscoped: Dynamic;

var documentHostStateLimit300002: number;

var DocumentHostStateState5: number[];

var filterDocumentHostStateFilter: Dynamic;

var documentHostStateLimit20003: number;

var documentHostStateLimit4096: number;

var DocumentHostStateState6: string[];

var DocumentHostStateState7: string[];

var DocumentHostStateState8: string[];

var DocumentHostStateState9: string[];

function resolveDocumentHostStateNotice(
  documentHostStateNotice?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return documentHostStateNotice.bar ||
    documentHostStateNotice.notice ||
    DocumentHostStateState9.includes(documentHostStateNotice.word ?? ``)
    ? `warned`
    : `silent`;
}

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeDocumentHostStateCreateDocumentHostCoordinatorStep1(): void {
  (mapDocumentHostStateJoin = (
    mapDocumentHostStateJoin2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    mapDocumentHostStateJoin2.map(
      (event?: Dynamic, ..._extraArguments: unknown[]) =>
        `${event.key}|${event.name}|${event.color}|${event.sel.anchor.kind}:${event.sel.anchor.kind === `chars` ? event.sel.anchor.range.join(`,`) : event.sel.anchor.ids.join(`,`)}|${event.sel.head}${event.sel.caret ? `|c` : ``}`,
    ).join(`
`));
  (documentHostStateLimit2000 = 2e3);
  (documentHostStateLimit60000 = 6e4);
  (DocumentHostStateState = 5 * 6e4);
  (DocumentHostStateHere = {
    here: (documentHostStateHere?: Dynamic, ..._extraArguments: unknown[]) =>
      documentHostStateHere === 1
        ? `Someone is in this document`
        : `${documentHostStateHere} other people are in this document`,
    left: (documentHostStateHere?: Dynamic, ..._extraArguments: unknown[]) =>
      documentHostStateHere === 1
        ? `Someone left`
        : `${documentHostStateHere} people have left`,
  });
  (resolveDocumentHostStateLast = (
    ..._extraArguments: unknown[]
  ) => ({
    last: null,
  }));
  (resolveDocumentHostStateLast2 = (
      documentHostStateLast2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
    (..._extraArguments: unknown[]): undefined => {
      if (documentHostStateLast2.last === options) {
        documentHostStateLast2.last = null;
      }
    });
  (resolveDocumentHostStateStartsWith = (
    documentHostStateStarts?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    documentHostStateStarts.startsWith(`human:`)
      ? resolveDocumentHostStateIncludes(
          documentHostStateStarts.slice(6).split(`#`)[0],
        )
      : ``);
  (resolveDocumentHostStateIncludes = (
    documentHostStateIncludes?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    documentHostStateIncludes.includes(`@`)
      ? documentHostStateIncludes.toLowerCase()
      : documentHostStateIncludes);
  (DocumentHostState_Member = `member`);
  (resolveDocumentHostStateKnown = (
    contributor?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let toLowerCase: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
      contributor.email()?.toLowerCase() ?? null;
    let fenceAuthor: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
      let fenceAuthor2: Dynamic = contributor.fenceAuthor();
      return fenceAuthor2 === null || fenceAuthor2 === DocumentHostState_Member
        ? null
        : resolveDocumentHostStateIncludes(fenceAuthor2);
    };
    let viewerId2: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
      let viewerId3: Dynamic = contributor.viewerId();
      return viewerId3 === null
        ? null
        : resolveDocumentHostStateIncludes(viewerId3);
    };
    return {
      known: (..._extraArguments: unknown[]) =>
        contributor.inFrame
          ? contributor.fenceAuthor() !== null
          : toLowerCase() !== null,
      isSelf: (
        documentHostStateKnown?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        contributor.inFrame
          ? documentHostStateKnown === fenceAuthor() ||
            documentHostStateKnown === viewerId2()
          : documentHostStateKnown === toLowerCase(),
    };
  });
  (resolveDocumentHostStateFeedUp = (
    documentHostStateFeedUp?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    documentHostStateFeedUp.feedUp === true &&
    (documentHostStateFeedUp.lane === undefined ||
      (documentHostStateFeedUp.lane.state === `live` &&
        !documentHostStateFeedUp.lane.connecting)) &&
    (documentHostStateFeedUp.ownEchoAt === null ||
      documentHostStateFeedUp.now - documentHostStateFeedUp.ownEchoAt < 35e3));
  (resolveDocumentHostStateValue = (
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let label: string | null = ``;
    return {
      changed(documentHostStateValue?: Dynamic, ..._extraArguments: unknown[]) {
        let mapDocumentHostStateJoin2: Dynamic = mapDocumentHostStateJoin(
          documentHostStateValue,
        );
        return mapDocumentHostStateJoin2 === label
          ? false
          : ((label = mapDocumentHostStateJoin2), true);
      },
      afterReturn(..._extraArguments: unknown[]): undefined {
        label = null;
      },
    };
  });
  (documentHostStateLimit5000 = 5e3);
  (documentHostStateLimit20002 = 2e3);
  (documentHostStateLimit30000 = 3e4);
  (documentHostStateLimit600002 = 6e4);
  (documentHostStateLimit75000 = 75e3);
  (documentHostStateLimit15000 = 15e3);
  (documentHostStateLimit1000 = 1e3);
  (DocumentHostStateState2 = {
    seen(..._extraArguments: unknown[]): undefined {},
    wrote(..._extraArguments: unknown[]): undefined {},
    connected(..._extraArguments: unknown[]): undefined {},
    close(..._extraArguments: unknown[]): undefined {},
  });
  (resolveDocumentHostStateSeen = (
    documentHostStateSeen?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let DocumentHostStateState22: Dynamic = DocumentHostStateState2;
    try {
      DocumentHostStateState22 = documentHostStateSeen();
    } catch {}
    return {
      seen(
        documentHostStateSeen2?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined {
        try {
          DocumentHostStateState22.seen(documentHostStateSeen2, options);
        } catch {}
      },
      wrote(
        documentHostStateSeen2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined {
        try {
          DocumentHostStateState22.wrote(documentHostStateSeen2);
        } catch {}
      },
      connected(
        documentHostStateSeen2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined {
        try {
          DocumentHostStateState22.connected(documentHostStateSeen2);
        } catch {}
      },
      close(..._extraArguments: unknown[]): undefined {
        try {
          DocumentHostStateState22.close();
        } catch {}
      },
    };
  });
  (DocumentHostStateState3 = [`words`, `rows`, `tray`]);
  (DocumentHostStateState4 = [`noscope`, `late`, `fail`, `none`]);
  (documentHostStateSet = new (Set as Dynamic)([
    `idb_open`,
    `idb_blocked`,
    `load`,
  ]));
  (documentHostStateLimit10000 = 1e4);
  (documentHostStateLimit128 = 128);
  (resolveDocumentHostStateStaged = (
    documentHostStateStaged?: Dynamic,
    ..._extraArguments: unknown[]
  ): boolean => {
    let staged: Dynamic =
      typeof documentHostStateStaged == `object` && documentHostStateStaged
        ? documentHostStateStaged.staged
        : undefined;
    return Array.isArray(staged) && staged.length > 0;
  });
  (isDocumentHostStateIncomplete = (
    documentHostStateIncomplete?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    try {
      let documentHostStateIncomplete2: Dynamic =
        documentHostStateIncomplete ?? {};
      return (
        documentHostStateIncomplete2.t === `snapshot` &&
        !documentHostStateIncomplete2.incomplete &&
        documentHostStateIncomplete2.compare !== true
      );
    } catch {
      return false;
    }
  });
  (DocumentHostStateEmit = collectDocumentSourceEvidence({
    emit: (documentHostStateEmit?: Dynamic, ..._extraArguments: unknown[]) =>
      emitTelemetryEvent(documentHostStateEmit),
    boot: (..._extraArguments: unknown[]) =>
      resolveObservabilityTelemetryOrdinal(
        resolveObservabilityTelemetryOrdinal2(),
      ),
    plat: (..._extraArguments: unknown[]): Dynamic =>
      resolveObservabilityBrowserAndOperationEventsValue3(),
    later: (
      documentHostStateEmit?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => void setTimeout(documentHostStateEmit, options),
    random: (..._extraArguments: unknown[]) => Math.random(),
  }));
  (DocumentHostStateClaimed = DocumentHostStateEmit.claimed);
  (DocumentHostStateClosed = DocumentHostStateEmit.closed);
  (DocumentHostStateFaulted = DocumentHostStateEmit.faulted);
  (DocumentHostStateHanded = DocumentHostStateEmit.handed);
  (DocumentHostStateLines = DocumentHostStateEmit.lines);
  (DocumentHostStateLooked = DocumentHostStateEmit.looked);
  (DocumentHostStatePictured = DocumentHostStateEmit.pictured);
  (DocumentHostStateUnscoped = DocumentHostStateEmit.unscoped);
  (documentHostStateLimit300002 = 3e4);
  (DocumentHostStateState5 = [120, 300, 900, 3600]);
  (filterDocumentHostStateFilter = (
    filterDocumentHostStateFilter2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    DocumentHostStateState5.filter(
      (DocumentHostStateState52?: Dynamic, ..._extraArguments: unknown[]) =>
        DocumentHostStateState52 * 1e3 < filterDocumentHostStateFilter2,
    ).length);
  (documentHostStateLimit20003 = 2e3);
  (documentHostStateLimit4096 = 4096);
  (DocumentHostStateState6 = [
    `none`,
    `flight`,
    `ime`,
    `floor`,
    `needing`,
    `drift`,
    `label`,
    `orphan`,
  ]);
  (DocumentHostStateState7 = [`taken`, `untaken`]);
  (DocumentHostStateState8 = [`none`, `some`]);
  (DocumentHostStateState9 = [`unsaved`, `trayed`, `waiting`, `busy`]);
}

export {
  DocumentHostStateClaimed,
  DocumentHostStateClosed,
  DocumentHostStateFaulted,
  DocumentHostStateHanded,
  DocumentHostStateLines,
  DocumentHostStateLooked,
  DocumentHostStatePictured,
  DocumentHostStateState5,
  DocumentHostStateState6,
  DocumentHostStateState7,
  DocumentHostStateState8,
  DocumentHostStateUnscoped,
  createDocumentHostCoordinator,
  documentHostStateLimit20003,
  documentHostStateLimit300002,
  documentHostStateLimit4096,
  filterDocumentHostStateFilter,
  installDocumentHostStateVisibilityState,
  resolveDocumentHostStateFeedUp,
  resolveDocumentHostStateKey,
  resolveDocumentHostStateKnown,
  resolveDocumentHostStateLast,
  resolveDocumentHostStateNode,
  resolveDocumentHostStateNotice,
  resolveDocumentHostStateSeen,
  resolveDocumentHostStateValue,
  resolveDocumentHostStateValue2,
  useDocumentHostStateJoin,
};
