/** BaoCut: data model schemas from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  observabilityBrowserAndOperationEventsPattern22,
} from "../observability/browser-and-operation-events-2";
import {
  PlatformApiAndAuthColor,
} from "../services/api-and-auth-5";
import {
  DataModelSchemasPromise,
  dataModelSchemasValue5000,
  dataModelSchemasValue90000,
  resolveDataModelSchemasBlocks2,
  resolveDataModelSchemasChars,
  resolveDataModelSchemasKey,
  updateDataModelSchemasBid,
} from "./model-schemas-4";
import {
  isPlatformAnnouncementsAgent,
  isPlatformAnnouncementsFileId,
  resolvePlatformAnnouncementsSelfRev,
} from "../services/announcements";

function isDataModelSchemasColor(
  scheduler?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let lookup: Dynamic = new (Map as Dynamic)();
  let updateDataModelSchemasRang2: Dynamic = updateDataModelSchemasRang(
    scheduler.now,
  );
  let lookup2: Dynamic = new (Map as Dynamic)();
  let items: Dynamic = [];
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let split: Dynamic = (
    dataModelSchemasColor?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    dataModelSchemasColor.startsWith(`human:`)
      ? dataModelSchemasColor.slice(6).split(`#`)[0]
      : ``;
  let shellColor: Dynamic = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (!event.key.startsWith(`human:`)) return event;
    let textParts: Dynamic = split(event.key);
    let name: Dynamic = scheduler.label(textParts);
    let color: Dynamic = scheduler.shellColor(textParts) ?? event.color;
    return name === event.name && color === event.color
      ? event
      : {
          ...event,
          name: name,
          color: color,
        };
  };
  let isDataModelSchemasColorHandler = (
    dataModelSchemasColor?: Dynamic,
    ..._extraArguments: unknown[]
  ) => dataModelSchemasColor.name !== ``;
  let label = `agent:${DataModelSchemasPromise}`;
  let enabled = false;
  let enabled2: boolean = false;
  let enabled3 = false;
  let isDataModelSchemasColorResult: Dynamic;
  let cancel = (..._extraArguments: unknown[]): undefined => {
    if (isDataModelSchemasColorResult !== undefined) {
      scheduler.cancel(isDataModelSchemasColorResult);
    }
    isDataModelSchemasColorResult = undefined;
  };
  let isSelf = (
    dataModelSchemasColor?: Dynamic,
    ref?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    !enabled3 ||
    dataModelSchemasColor === label ||
    ref.current === null ||
    !ref.current.key.startsWith(`xagent:`)
      ? false
      : scheduler.isSelf?.(ref.current.key.slice(7)) === true;
  let startsWith = (..._extraArguments: unknown[]) => {
    for (let [isDataModelSchemasColorResult2, ref] of lookup as Dynamic)
      if (
        isDataModelSchemasColorResult2.startsWith(`agent:`) &&
        isDataModelSchemasColorResult2 !== label &&
        ref.current !== null
      )
        return true;
    return false;
  };
  let post = (..._extraArguments: unknown[]): undefined => {
    let lookupEntry: Dynamic = lookup.get(label);
    if (lookupEntry !== undefined && startsWith()) {
      lookupEntry.caret.dispose();
      lookup.delete(label);
      enabled = true;
    }
    let filteredItems: Dynamic = items.filter(isDataModelSchemasColorHandler);
    let enabled4 = false;
    let enabled5 = false;
    for (let [isDataModelSchemasColorResult2, ref] of lookup as Dynamic) {
      if (isSelf(isDataModelSchemasColorResult2, ref)) {
        enabled5 = true;
        continue;
      }
      if (
        ref.current &&
        isDataModelSchemasColorHandler(ref.current) &&
        !(
          isDataModelSchemasColorResult2.startsWith(`human:`) &&
          uniqueItems.has(split(isDataModelSchemasColorResult2))
        )
      ) {
        filteredItems.push(ref.current);
      }
      if (
        isDataModelSchemasColorResult2.startsWith(`agent:`) &&
        ref.current !== null &&
        ref.caret.live()
      ) {
        enabled4 = true;
      }
    }
    enabled3 = enabled5;
    scheduler.post(filteredItems, enabled4);
  };
  let presence: Dynamic = (
    actor?: Dynamic,
    options: Dynamic = true,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let label2: string = `${actor.kind}:${actor.principal}`;
    let lookupEntry: Dynamic = lookup.get(label2);
    if (lookupEntry) return lookupEntry;
    let record2: Dynamic = {
      caret: undefined,
      current: null,
    };
    record2.caret = isPlatformAnnouncementsFileId({
      ...scheduler,
      lastTextblock:
        actor.kind === `agent`
          ? scheduler.lastTextblock
          : (..._extraArguments: unknown[]) => null,
      firstPending: actor.kind === `agent` ? scheduler.firstPending : undefined,
      pendingBlocks:
        actor.kind === `agent` ? scheduler.pendingBlocks : undefined,
      lane: actor.kind,
      liveMs: actor.kind === `agent` ? dataModelSchemasValue90000 : undefined,
      post: (
        dataModelSchemasColor?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let dataModelSchemasColorItem: Dynamic =
          dataModelSchemasColor[0] ?? null;
        record2.current =
          dataModelSchemasColorItem === null
            ? null
            : actor.kind === `agent`
              ? dataModelSchemasColorItem
              : resolveDataModelSchemasChars(dataModelSchemasColorItem.sel) ===
                  null
                ? null
                : resolveDataModelSchemasKey(
                    actor.principal,
                    scheduler.label(actor.principal),
                    resolveDataModelSchemasBlocks2(
                      dataModelSchemasColorItem.sel,
                    ) ?? ``,
                    resolveDataModelSchemasChars(dataModelSchemasColorItem.sel),
                    scheduler.shellColor(actor.principal),
                  );
        post();
      },
    });
    lookup.set(label2, record2);
    if (options)
      for (let isDataModelSchemasColorResult2 of lookup2.values() as Dynamic)
        record2.caret.presence(isDataModelSchemasColorResult2);
    return record2;
  };
  let isDataModelSchemasColorHandler2: Dynamic = function* (
    ..._extraArguments: unknown[]
  ): Generator<Dynamic, Dynamic, Dynamic> {
    for (let [
      isDataModelSchemasColorResult2,
      isDataModelSchemasColorResult3,
    ] of lookup as Dynamic)
      if (isDataModelSchemasColorResult2 !== label) {
        yield isDataModelSchemasColorResult3;
      }
  };
  return {
    landed: (
      actor?: Dynamic,
      options?: Dynamic,
      context?: unknown,
      dependencies?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (typeof context == `number`) {
        if (actor.kind === `agent`) {
          updateDataModelSchemasRang2.rang(context);
        } else {
          updateDataModelSchemasRang2.foreign(context);
        }
      }
      let matchesKind =
        actor.kind === `agent` && scheduler.isSelf?.(actor.principal) === true;
      let matchesKind2 = matchesKind && enabled3;
      if (matchesKind) {
        cancel();
        enabled3 = false;
      }
      presence(actor).caret.landed(actor.principal, options, dependencies);
      if (matchesKind2) {
        post();
      }
    },
    foreign: (
      dataModelSchemasColor?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => updateDataModelSchemasRang2.foreign(dataModelSchemasColor),
    gap: (..._extraArguments: unknown[]): Dynamic =>
      updateDataModelSchemasRang2.gap(),
    heard: (
      dataModelSchemasColor?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => updateDataModelSchemasRang2.heard(dataModelSchemasColor),
    reveals: (
      dataModelSchemasColor?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => updateDataModelSchemasRang2.reveals(dataModelSchemasColor),
    revealsRow: (
      dataModelSchemasColor?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => updateDataModelSchemasRang2.revealsRow(dataModelSchemasColor),
    refresh: (..._extraArguments: unknown[]): undefined => {
      let enabled4 = false;
      for (let ref of lookup.values() as Dynamic) {
        if (!ref.current) continue;
        let shellColor2: Dynamic = shellColor(ref.current);
        if (shellColor2 !== ref.current) {
          ref.current = shellColor2;
          enabled4 = true;
        }
      }
      let mappedItems: Dynamic = items.map(shellColor);
      if (
        mappedItems.some(
          (
            mappedItem?: Dynamic,
            index?: Dynamic,
            ..._extraArguments: unknown[]
          ) => mappedItem !== items[index],
        )
      ) {
        enabled4 = true;
      }
      items = mappedItems;
      if (enabled4) {
        post();
      }
    },
    reported: (
      dataModelSchemasColor?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      items = dataModelSchemasColor.map(shellColor);
      uniqueItems = new (Set as Dynamic)(
        items
          .map(
            (event?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              split(event.key),
          )
          .filter(
            (mappedItem?: Dynamic, ..._extraArguments: unknown[]) =>
              mappedItem !== ``,
          ),
      );
      post();
    },
    delta: (
      dataModelSchemasColor?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      for (let isDataModelSchemasColorResult2 of isDataModelSchemasColorHandler2() as Dynamic)
        isDataModelSchemasColorResult2.caret.delta(dataModelSchemasColor);
    },
    presence: (actor?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      lookup2.set(`${actor.principal}#${actor.connId}`, actor);
      for (let isDataModelSchemasColorResult2 of isDataModelSchemasColorHandler2() as Dynamic)
        isDataModelSchemasColorResult2.caret.presence(actor);
      if (
        isPlatformAnnouncementsAgent(actor, scheduler.fileId) &&
        !lookup.has(`agent:${actor.principal}`)
      ) {
        presence({
          kind: `agent`,
          principal: actor.principal,
        });
      }
    },
    left: (
      dataModelSchemasColor?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      lookup2.delete(`${dataModelSchemasColor}#${options}`);
      for (let isDataModelSchemasColorResult2 of isDataModelSchemasColorHandler2() as Dynamic)
        isDataModelSchemasColorResult2.caret.left(
          dataModelSchemasColor,
          options,
        );
    },
    learned: (..._extraArguments: unknown[]): undefined => {
      for (let isDataModelSchemasColorResult2 of lookup.values() as Dynamic)
        isDataModelSchemasColorResult2.caret.learned();
    },
    promised: (
      dataModelSchemasColor?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      if (enabled || startsWith()) return false;
      let presence2: Dynamic = presence(
        {
          kind: `agent`,
          principal: DataModelSchemasPromise,
        },
        false,
      );
      presence2.caret.presence({
        principal: DataModelSchemasPromise,
        connId: `xagent:Claude`,
        at: dataModelSchemasColor,
        body: {
          ref: {
            object: `file`,
            id: scheduler.fileId,
          },
        },
        channel: `external`,
        agent: {
          name: PlatformApiAndAuthColor.name,
        },
      });
      return presence2.caret.standing();
    },
    working: (
      dataModelSchemasColor?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (dataModelSchemasColor !== enabled2) {
        enabled2 = dataModelSchemasColor;
        cancel();
        if (!dataModelSchemasColor) {
          isDataModelSchemasColorResult = scheduler.schedule(
            (..._extraArguments: unknown[]) => {
              isDataModelSchemasColorResult = undefined;
              if (!((scheduler.pendingBlocks?.() ?? []).length > 0)) {
                enabled3 = true;
                for (let [
                  isDataModelSchemasColorResult2,
                  isDataModelSchemasColorResult3,
                ] of lookup as Dynamic)
                  if (
                    isSelf(
                      isDataModelSchemasColorResult2,
                      isDataModelSchemasColorResult3,
                    )
                  )
                    return post();
                enabled3 = false;
              }
            },
            dataModelSchemasValue5000,
          );
        }
      }
    },
    dispose: (..._extraArguments: unknown[]): undefined => {
      cancel();
      for (let isDataModelSchemasColorResult2 of lookup.values() as Dynamic)
        isDataModelSchemasColorResult2.caret.dispose();
      lookup.clear();
      lookup2.clear();
      items = [];
      uniqueItems = new (Set as Dynamic)();
      enabled = true;
    },
  };
}

function subscribeDataModelSchemasWorking(
  dataModelSchemasWorking?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let working: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
    dataModelSchemasWorking.working(options.working() === true);
  working();
  return options.subscribe(working);
}

var dataModelSchemasValue64: number;

function updateDataModelSchemasRang(
  updateDataModelSchemasRang2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let lookup: Dynamic = new (Map as Dynamic)();
  let amount = -1 / 0;
  let amount2 = -1 / 0;
  let enabled = false;
  let updateDataModelSchemasRangResult: Dynamic = null;
  let heard = (
    updateDataModelSchemasRang3?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (enabled && updateDataModelSchemasRangResult === null) {
      updateDataModelSchemasRangResult = updateDataModelSchemasRang3;
    }
  };
  let next = (
    updateDataModelSchemasRang3?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    for (let [
      updateDataModelSchemasRangResult2,
      updateDataModelSchemasRangResult3,
    ] of lookup as Dynamic)
      if (
        updateDataModelSchemasRang3 - updateDataModelSchemasRangResult3 >
        3e4
      ) {
        lookup.delete(updateDataModelSchemasRangResult2);
      }
    for (; lookup.size > dataModelSchemasValue64; )
      lookup.delete(lookup.keys().next().value);
  };
  let shows: Dynamic = (
    updateDataModelSchemasRang3?: unknown,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    typeof updateDataModelSchemasRang3 == `number`
      ? (next(updateDataModelSchemasRang2()),
        lookup.has(updateDataModelSchemasRang3))
      : false;
  return {
    rang(
      updateDataModelSchemasRang3?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      heard(updateDataModelSchemasRang3);
      let updateDataModelSchemasRang4: Dynamic = updateDataModelSchemasRang2();
      lookup.delete(updateDataModelSchemasRang3);
      lookup.set(updateDataModelSchemasRang3, updateDataModelSchemasRang4);
      next(updateDataModelSchemasRang4);
    },
    heard: heard,
    foreign(
      updateDataModelSchemasRang3?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      heard(updateDataModelSchemasRang3);
      amount = Math.max(amount, updateDataModelSchemasRang3);
      lookup.delete(updateDataModelSchemasRang3);
    },
    gap(..._extraArguments: unknown[]): undefined {
      enabled = true;
      updateDataModelSchemasRangResult = null;
    },
    shows: shows,
    reveals(
      updateDataModelSchemasRang3?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let matchesDelta = updateDataModelSchemasRang3.delta === true;
      let enabled2 =
        !matchesDelta && updateDataModelSchemasRang3.partial !== true;
      let since: Dynamic =
        matchesDelta && typeof updateDataModelSchemasRang3.since == `number`
          ? updateDataModelSchemasRang3.since
          : -1 / 0;
      let max = Math.max(amount2, since);
      if (
        enabled &&
        updateDataModelSchemasRangResult !== null &&
        max >= updateDataModelSchemasRangResult - 1
      ) {
        enabled = false;
      }
      let enabled3: Dynamic =
        !enabled &&
        shows(
          matchesDelta
            ? updateDataModelSchemasRang3.blockRev
            : updateDataModelSchemasRang3.rev,
        ) &&
        amount <= max;
      if (matchesDelta) {
        amount2 = max;
      }
      if (enabled2 && typeof updateDataModelSchemasRang3.rev == `number`) {
        amount2 = Math.max(amount2, updateDataModelSchemasRang3.rev);
        if (
          enabled &&
          updateDataModelSchemasRangResult !== null &&
          updateDataModelSchemasRang3.rev >=
            updateDataModelSchemasRangResult - 1
        ) {
          enabled = false;
        }
      }
      return enabled3;
    },
    revealsRow: (
      updateDataModelSchemasRang3?: unknown,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      typeof updateDataModelSchemasRang3 == `number` &&
      updateDataModelSchemasRang3 > 0 &&
      shows(updateDataModelSchemasRang3),
  };
}

var resolveDataModelSchemasTest9: Dynamic;

function resolveDataModelSchemasBlock(
  dataModelSchemasBlock?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!resolveDataModelSchemasTest9(dataModelSchemasBlock.block)) return null;
  let updateDataModelSchemasBid2: Dynamic = updateDataModelSchemasBid(
    dataModelSchemasBlock.docJson,
    dataModelSchemasBlock.blocks,
  );
  let updateDataModelSchemasBid3: Dynamic = updateDataModelSchemasBid2.find(
    (ask?: Dynamic, ..._extraArguments: unknown[]) =>
      ask.bid === dataModelSchemasBlock.block,
  );
  if (!updateDataModelSchemasBid3 || updateDataModelSchemasBid3.text)
    return dataModelSchemasBlock.block;
  for (
    let difference = updateDataModelSchemasBid2.length - 1;
    difference >= 0;
    difference--
  )
    if (
      updateDataModelSchemasBid2[difference].text &&
      resolveDataModelSchemasTest9(updateDataModelSchemasBid2[difference].bid)
    )
      return updateDataModelSchemasBid2[difference].bid;
  return null;
}

function resolveDataModelSchemasBlock2(
  dataModelSchemasBlock2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let block: Dynamic = resolveDataModelSchemasFlat(
    dataModelSchemasBlock2,
    options,
  );
  let results: Dynamic = resolveDataModelSchemasResults(
    dataModelSchemasBlock2,
    options,
  )?.results;
  if (Array.isArray(results))
    for (let difference = results.length - 1; difference >= 0; difference--) {
      let minted: Dynamic = results[difference]?.minted;
      let flat: Dynamic = Array.isArray(minted) ? minted.flat(3) : [];
      for (let difference2 = flat.length - 1; difference2 >= 0; difference2--)
        if (resolveDataModelSchemasTest9(flat[difference2]))
          return {
            block: block,
            after: flat[difference2],
          };
    }
  return {
    block: block,
    after: null,
  };
}

function resolveDataModelSchemasResults(
  dataModelSchemasResults?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let edit: Dynamic = dataModelSchemasResults?.edit;
  return edit && typeof edit == `object`
    ? edit
    : options && typeof options == `object` && Array.isArray(options.results)
      ? options
      : null;
}

function resolveDataModelSchemasFlat(
  dataModelSchemasFlat?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dataModelSchemasResults: Dynamic = resolveDataModelSchemasResults(
    dataModelSchemasFlat,
    options,
  );
  if (!dataModelSchemasResults)
    return resolvePlatformAnnouncementsSelfRev(dataModelSchemasFlat);
  let dataModelSchemasResults2: Dynamic = dataModelSchemasResults;
  let readOptionItem: Dynamic = (
    dataModelSchemasFlat2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let flat: Dynamic = Array.isArray(dataModelSchemasFlat2)
      ? dataModelSchemasFlat2.flat(3)
      : [dataModelSchemasFlat2];
    for (let difference = flat.length - 1; difference >= 0; difference--)
      if (resolveDataModelSchemasTest9(flat[difference]))
        return flat[difference];
    return null;
  };
  if (Array.isArray(dataModelSchemasResults2.results))
    for (
      let difference = dataModelSchemasResults2.results.length - 1;
      difference >= 0;
      difference--
    ) {
      let resultItem: Dynamic = dataModelSchemasResults2.results[difference];
      let optionItem2: Dynamic =
        readOptionItem(resultItem?.touched) ??
        readOptionItem(resultItem?.minted) ??
        readOptionItem(resultItem?.at?.bid);
      if (optionItem2 !== null) return optionItem2;
    }
  let optionItem: Dynamic =
    readOptionItem(dataModelSchemasResults2.touched) ??
    readOptionItem(dataModelSchemasResults2.minted);
  if (optionItem !== null) return optionItem;
  let final: Dynamic = Array.isArray(dataModelSchemasResults2.final)
    ? dataModelSchemasResults2.final
    : Array.isArray(dataModelSchemasResults2.ops)
      ? dataModelSchemasResults2.ops
      : [];
  for (let difference = final.length - 1; difference >= 0; difference--) {
    let finalItem: Dynamic = final[difference];
    let at2: Dynamic = finalItem?.at;
    let optionItem2: Dynamic =
      readOptionItem(typeof at2 == `string` ? at2 : at2?.bid) ??
      readOptionItem(finalItem?.bid) ??
      readOptionItem(finalItem?.after?.bid);
    if (optionItem2 !== null) return optionItem2;
  }
  return resolvePlatformAnnouncementsSelfRev(dataModelSchemasFlat);
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeDataModelSchemas5Step1(): void {
  (dataModelSchemasValue64 = 64);
  (resolveDataModelSchemasTest9 = (
    dataModelSchemasTest9?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof dataModelSchemasTest9 == `string` &&
    observabilityBrowserAndOperationEventsPattern22.test(dataModelSchemasTest9));
}

export {
  isDataModelSchemasColor,
  resolveDataModelSchemasBlock,
  resolveDataModelSchemasBlock2,
  resolveDataModelSchemasResults,
  resolveDataModelSchemasTest9,
  subscribeDataModelSchemasWorking,
};
