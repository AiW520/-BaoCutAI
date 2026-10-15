/** BaoCut: observability telemetry from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  ObservabilityTelemetryPagesRefusalShadow,
  observabilityTelemetryPattern25,
  observabilityTelemetryPattern29,
  observabilityTelemetryPattern33,
  observabilityTelemetryPattern36,
  observabilityTelemetryPattern37,
  observabilityTelemetrySet17,
  observabilityTelemetrySet22,
  observabilityTelemetryValue32,
  resolveObservabilityTelemetryKind3,
  resolveObservabilityTelemetryRound,
  resolveObservabilityTelemetrySurface,
  resolveObservabilityTelemetryUnrowed,
  resolveObservabilityTelemetryWire,
} from "./telemetry-2";

function isObservabilityTelemetryKind(
  observabilityTelemetryKind?: Dynamic,
  options?: Dynamic,
  error?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let ObservabilityTelemetryPagesRefusalShadowItem: Dynamic =
    ObservabilityTelemetryPagesRefusalShadow[observabilityTelemetryKind.name];
  let wireRows: Dynamic =
    ObservabilityTelemetryPagesRefusalShadowItem?.wireRows;
  if (wireRows === undefined || error.component === undefined) return [];
  let event: Dynamic =
    wireRows.wordSuffix === undefined
      ? error.event
      : `${error.event}${wireRows.wordSuffix}`;
  if (
    wireRows.wordSuffix !== undefined &&
    (!observabilityTelemetrySet17.has(event) ||
      !observabilityTelemetryPattern25.test(event))
  )
    return [];
  let optionItem: Dynamic =
    wireRows.behind === undefined ? undefined : options[wireRows.behind];
  if (
    typeof optionItem == `string` &&
    !error.component.endsWith(`:${optionItem}`)
  )
    return [];
  let label = ``;
  if (wireRows.suffix !== undefined) {
    let optionItem2: Dynamic = options[wireRows.suffix];
    if (
      typeof optionItem2 != `string` ||
      optionItem2 === `unrowed` ||
      observabilityTelemetrySet22.has(optionItem2) ||
      !observabilityTelemetryPattern36.test(optionItem2)
    )
      return [];
    label = `:${optionItem2}`;
  }
  let items: Dynamic = [];
  let items2: Dynamic =
    wireRows.tail === undefined
      ? []
      : `field` in wireRows.tail
        ? [wireRows.tail]
        : wireRows.tail;
  let test: Dynamic = (
    observabilityTelemetryKind2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    for (let isObservabilityTelemetryKindResult of items2 as Dynamic) {
      let optionItem2: Dynamic = isObservabilityTelemetryKindResult.on.includes(
        observabilityTelemetryKind2,
      )
        ? options[isObservabilityTelemetryKindResult.field]
        : undefined;
      if (
        typeof optionItem2 == `string` &&
        observabilityTelemetryPattern37.test(optionItem2) &&
        !observabilityTelemetrySet22.has(optionItem2)
      )
        return optionItem2;
    }
  };
  let round = (
    observabilityTelemetryKind2?: Dynamic,
    options2?: Dynamic,
    code?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let label2 = `${error.component}:${observabilityTelemetryKind2}${label}`;
    let test2: Dynamic = test(observabilityTelemetryKind2);
    let label3 = test2 === undefined ? label2 : `${label2}:${test2}`;
    let component = observabilityTelemetryPattern29.test(label3)
      ? label3
      : label2;
    if (
      !(
        !observabilityTelemetryPattern36.test(observabilityTelemetryKind2) ||
        !observabilityTelemetryPattern29.test(component)
      )
    ) {
      items.push({
        kind: error.kind,
        event: event,
        count: Math.min(65535, Math.max(1, Math.round(options2))),
        ts: error.ts,
        ...(error.fe === undefined
          ? {}
          : {
              fe: error.fe,
            }),
        component: component,
        ...(error.release === undefined
          ? {}
          : {
              release: error.release,
            }),
        ...(wireRows.word === true && error.word !== undefined
          ? {
              word: error.word,
            }
          : {}),
        yields: true,
        componentOnly: true,
        ...(code === undefined
          ? {}
          : {
              code: code,
            }),
      });
    }
  };
  let rows: Dynamic =
    wireRows.when !== undefined && options[wireRows.when.field] === false
      ? wireRows.when.rows
      : [];
  let resolveObservabilityTelemetryRound2: Dynamic = (
    observabilityTelemetryKind2?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    !rows.includes(observabilityTelemetryKind2) ||
    resolveObservabilityTelemetryRound(
      ObservabilityTelemetryPagesRefusalShadowItem,
      options2,
    );
  if (
    wireRows.all !== undefined &&
    error.count !== undefined &&
    resolveObservabilityTelemetryRound2(wireRows.all, error.count)
  ) {
    round(wireRows.all, error.count, error.code);
  }
  for (let [
    isObservabilityTelemetryKindResult,
    isObservabilityTelemetryKindResult2,
  ] of wireRows.of as Dynamic) {
    let optionItem2: Dynamic = options[isObservabilityTelemetryKindResult2];
    if (
      typeof optionItem2 == `number` &&
      Number.isFinite(optionItem2) &&
      resolveObservabilityTelemetryRound2(
        isObservabilityTelemetryKindResult,
        optionItem2,
      )
    ) {
      round(isObservabilityTelemetryKindResult, optionItem2, undefined);
    }
  }
  return items;
}

function resolveObservabilityTelemetryName2(
  observabilityTelemetryName2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let ObservabilityTelemetryPagesRefusalShadowItem: Dynamic =
    ObservabilityTelemetryPagesRefusalShadow[observabilityTelemetryName2.name];
  let when: Dynamic =
    ObservabilityTelemetryPagesRefusalShadowItem?.wireRows?.when;
  return ObservabilityTelemetryPagesRefusalShadowItem?.wireWhenFloor ===
    undefined ||
    when === undefined ||
    options[when.field] !== false
    ? true
    : context.count !== undefined &&
        resolveObservabilityTelemetryRound(
          ObservabilityTelemetryPagesRefusalShadowItem,
          context.count,
        );
}

var ObservabilityTelemetryConsole: Dynamic;

var observabilityTelemetryValues: Dynamic;

function resolveObservabilityTelemetryValue18(
  observabilityTelemetryValue18?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  ObservabilityTelemetryConsole = observabilityTelemetryValue18;
}

function resolveObservabilityTelemetryRing(
  ring?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  ObservabilityTelemetryConsole = {
    ...ObservabilityTelemetryConsole,
    ring: ring,
  };
  let observabilityTelemetryValues2: Dynamic = observabilityTelemetryValues;
  observabilityTelemetryValues = [];
  for (let [
    resolveObservabilityTelemetryRingResult,
    resolveObservabilityTelemetryRingResult2,
  ] of observabilityTelemetryValues2 as Dynamic)
    try {
      ring(
        `clientEvent`,
        resolveObservabilityTelemetryRingResult,
        resolveObservabilityTelemetryRingResult2,
      );
    } catch {}
}

var observabilityTelemetryValue02: number;

var observabilityTelemetryValue03: number;

var observabilityTelemetryMap2: Dynamic;

var observabilityTelemetryValue04: number;

var observabilityTelemetryValue05: number;

var observabilityTelemetryMap3: Dynamic;

var observabilityTelemetryMap4: Dynamic;

var observabilityTelemetrySet24: Dynamic;

var observabilityTelemetryMap5: Dynamic;

var observabilityTelemetrySet25: Dynamic;

var observabilityTelemetryMap6: Dynamic;

function updateObservabilityTelemetryName(
  event?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let isObservabilityTelemetryKind2: Dynamic = isObservabilityTelemetryKind(
    event,
    options,
    context,
  );
  let once: Dynamic =
    ObservabilityTelemetryPagesRefusalShadow[event.name]?.wireRows?.once;
  if (once === undefined || isObservabilityTelemetryKind2.length === 0)
    return isObservabilityTelemetryKind2;
  let label = `${event.name}\u0000${event.key ?? ``}\u0000${once.by.map((by2?: Dynamic, ..._extraArguments: unknown[]) => String(options[by2] ?? ``)).join(`:`)}`;
  let observabilityTelemetryMap6Entry: Dynamic =
    observabilityTelemetryMap6.get(event.name) ?? 0;
  return observabilityTelemetrySet25.has(label) ||
    observabilityTelemetryMap6Entry >= once.sets
    ? []
    : (observabilityTelemetrySet25.add(label),
      observabilityTelemetryMap6.set(
        event.name,
        observabilityTelemetryMap6Entry + 1,
      ),
      isObservabilityTelemetryKind2);
}

var ObservabilityTelemetryMisc: string;

var ObservabilityTelemetryPagesCrash: Dynamic;

var observabilityTelemetrySet26: Dynamic;

function resolveObservabilityTelemetryMisc(
  observabilityTelemetryMisc?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return Object.hasOwn(
    ObservabilityTelemetryPagesRefusalShadow,
    observabilityTelemetryMisc,
  )
    ? options !== null && observabilityTelemetrySet26.has(options)
      ? options
      : (ObservabilityTelemetryPagesCrash[observabilityTelemetryMisc] ?? `misc`)
    : ObservabilityTelemetryMisc;
}

var observabilityTelemetryMap7: Dynamic;

var observabilityTelemetrySet27: Dynamic;

function getObservabilityTelemetryValue(
  ..._extraArguments: unknown[]
): number {
  let count: number = observabilityTelemetryValue04 > 600 ? 0 : 1;
  for (let getObservabilityTelemetryValueResult of observabilityTelemetrySet27 as Dynamic)
    count += Math.max(
      0,
      (ObservabilityTelemetryPagesRefusalShadow[
        getObservabilityTelemetryValueResult
      ].cap ?? 0) -
        (observabilityTelemetryMap3.get(getObservabilityTelemetryValueResult) ??
          0),
    );
  return count;
}

function createPagesClientEventCappedEvent(
  ..._extraArguments: unknown[]
): Dynamic {
  let lookup: Dynamic = new (Map as Dynamic)();
  for (let [
    createPagesClientEventCappedEventResult,
    createPagesClientEventCappedEventResult2,
  ] of observabilityTelemetryMap7 as Dynamic) {
    let createPagesClientEventCappedEventResultSlice: Dynamic =
      createPagesClientEventCappedEventResult.slice(
        0,
        createPagesClientEventCappedEventResult.indexOf(`\0`),
      );
    lookup.set(
      createPagesClientEventCappedEventResultSlice,
      (lookup.get(createPagesClientEventCappedEventResultSlice) ?? 0) +
        createPagesClientEventCappedEventResult2,
    );
  }
  let label: string = ``;
  for (let [
    createPagesClientEventCappedEventResult,
    createPagesClientEventCappedEventResult2,
  ] of lookup as Dynamic)
    if (createPagesClientEventCappedEventResult2 > (lookup.get(label) ?? 0)) {
      label = createPagesClientEventCappedEventResult;
    }
  let label2: string = ``;
  for (let [
    createPagesClientEventCappedEventResult,
    createPagesClientEventCappedEventResult2,
  ] of observabilityTelemetryMap7 as Dynamic)
    if (
      createPagesClientEventCappedEventResult.startsWith(`${label}\u0000`) &&
      createPagesClientEventCappedEventResult2 >
        (observabilityTelemetryMap7.get(`${label}\u0000${label2}`) ?? 0)
    ) {
      label2 = createPagesClientEventCappedEventResult.slice(label.length + 1);
    }
  return {
    name: `pages.client_event.capped`,
    fields: {
      cap: 600,
      emitted: 600,
      count: 600,
      component: resolveObservabilityTelemetryMisc(
        label,
        label2 === `` ? null : label2,
      ),
    },
    wire: {
      rowKey: `client_event.capped`,
    },
  };
}

function emitTelemetryEvent(
  event?: Dynamic,
  options: Dynamic = ObservabilityTelemetryConsole,
  context: Dynamic = Date.now(),
  ..._extraArguments: unknown[]
): undefined {
  let ObservabilityTelemetryPagesRefusalShadowItem: Dynamic =
    ObservabilityTelemetryPagesRefusalShadow[event.name];
  if (ObservabilityTelemetryPagesRefusalShadowItem === undefined) return;
  let everyByItem: Dynamic =
    event.key !== undefined &&
    ObservabilityTelemetryPagesRefusalShadowItem.everyBy !== undefined &&
    Object.hasOwn(
      ObservabilityTelemetryPagesRefusalShadowItem.everyBy,
      event.key,
    )
      ? ObservabilityTelemetryPagesRefusalShadowItem.everyBy[event.key]
      : ObservabilityTelemetryPagesRefusalShadowItem.every;
  if (everyByItem > 0) {
    let label = `${event.name}\u0000${event.key ?? ``}`;
    let observabilityTelemetryMap2Entry: Dynamic =
      observabilityTelemetryMap2.get(label);
    if (
      observabilityTelemetryMap2Entry !== undefined &&
      context - observabilityTelemetryMap2Entry < everyByItem
    ) {
      if (observabilityTelemetrySet24.has(event.name)) {
        observabilityTelemetryMap5.set(
          label,
          (observabilityTelemetryMap5.get(label) ?? 0) + 1,
        );
      }
      return;
    }
    observabilityTelemetryMap2.set(label, context);
    let observabilityTelemetryMap5Entry: Dynamic =
      observabilityTelemetryMap5.get(label);
    if (observabilityTelemetryMap5Entry !== undefined) {
      observabilityTelemetryMap5.delete(label);
      if (event.fields.count === undefined) {
        event = {
          ...event,
          fields: {
            ...event.fields,
            count: observabilityTelemetryMap5Entry + 1,
          },
        };
      }
    }
  }
  let keyCapItem: Dynamic =
    event.key === undefined ||
    ObservabilityTelemetryPagesRefusalShadowItem.keyCap === undefined ||
    !Object.hasOwn(
      ObservabilityTelemetryPagesRefusalShadowItem.keyCap,
      event.key,
    )
      ? undefined
      : ObservabilityTelemetryPagesRefusalShadowItem.keyCap[event.key];
  if (keyCapItem !== undefined) {
    let label = `${event.name}\u0000${event.key}`;
    let observabilityTelemetryMap4Entry: Dynamic =
      observabilityTelemetryMap4.get(label) ?? 0;
    if (observabilityTelemetryMap4Entry >= keyCapItem) return;
    observabilityTelemetryMap4.set(label, observabilityTelemetryMap4Entry + 1);
  }
  let matchesPaced =
    event.paced === true &&
    ObservabilityTelemetryPagesRefusalShadowItem.paced === true &&
    observabilityTelemetryValue05 < 240 &&
    observabilityTelemetryValue04 < 500;
  if (matchesPaced) {
    observabilityTelemetryValue05++;
  }
  if (
    ObservabilityTelemetryPagesRefusalShadowItem.cap !== undefined &&
    !matchesPaced
  ) {
    let observabilityTelemetryMap3Entry: Dynamic =
      observabilityTelemetryMap3.get(event.name) ?? 0;
    if (
      observabilityTelemetryMap3Entry >=
      ObservabilityTelemetryPagesRefusalShadowItem.cap
    )
      return;
    observabilityTelemetryMap3.set(
      event.name,
      observabilityTelemetryMap3Entry + 1,
    );
  }
  if (observabilityTelemetryValue04 >= 600) {
    if (observabilityTelemetryValue04 === 600) {
      observabilityTelemetryValue04++;
      observabilityTelemetryValue02++;
      updateObservabilityTelemetryClientEvent(
        createPagesClientEventCappedEvent(),
        options,
        context,
      );
    }
    if (
      ObservabilityTelemetryPagesRefusalShadowItem.reserve !== true ||
      observabilityTelemetryValue02 + getObservabilityTelemetryValue() >= 40
    )
      return;
    observabilityTelemetryValue02++;
  } else observabilityTelemetryValue04++;
  observabilityTelemetryValue03++;
  updateObservabilityTelemetryClientEvent(
    event,
    options,
    context,
    observabilityTelemetryValue04 <= 600,
  );
}

function updateObservabilityTelemetryClientEvent(
  updateObservabilityTelemetryClientEvent2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies: Dynamic = false,
  ..._extraArguments: unknown[]
): undefined {
  let observabilityTelemetryUnrowed: Dynamic =
    resolveObservabilityTelemetryUnrowed({
      ...resolveObservabilityTelemetrySurface(),
      ...updateObservabilityTelemetryClientEvent2.fields,
      ev: updateObservabilityTelemetryClientEvent2.name,
    });
  if (dependencies) {
    let label2 = `${updateObservabilityTelemetryClientEvent2.name}\u0000${resolveObservabilityTelemetryWire(updateObservabilityTelemetryClientEvent2.name, observabilityTelemetryUnrowed) ?? ``}`;
    observabilityTelemetryMap7.set(
      label2,
      (observabilityTelemetryMap7.get(label2) ?? 0) + 1,
    );
  }
  let label = `[client-event] ${updateObservabilityTelemetryClientEvent2.name} ${JSON.stringify(observabilityTelemetryUnrowed)}`;
  let observabilityTelemetryKind3: Dynamic =
    options.door === undefined
      ? null
      : resolveObservabilityTelemetryKind3(
          updateObservabilityTelemetryClientEvent2,
          observabilityTelemetryUnrowed,
          context,
        );
  if (options.ring === undefined && options === ObservabilityTelemetryConsole) {
    observabilityTelemetryValues.push([
      updateObservabilityTelemetryClientEvent2.name,
      observabilityTelemetryUnrowed,
    ]);
    if (observabilityTelemetryValues.length > observabilityTelemetryValue32) {
      observabilityTelemetryValues.shift();
    }
  }
  for (let updateObservabilityTelemetryClientEventResult of [
    (..._extraArguments: unknown[]): Dynamic =>
      options.dd?.(
        updateObservabilityTelemetryClientEvent2.name,
        observabilityTelemetryUnrowed,
      ),
    (..._extraArguments: unknown[]): Dynamic =>
      observabilityTelemetryKind3 === null ||
      !resolveObservabilityTelemetryName2(
        updateObservabilityTelemetryClientEvent2,
        observabilityTelemetryUnrowed,
        observabilityTelemetryKind3,
      )
        ? undefined
        : options.door?.(observabilityTelemetryKind3),
    ...(observabilityTelemetryKind3 === null
      ? []
      : updateObservabilityTelemetryName(
          updateObservabilityTelemetryClientEvent2,
          observabilityTelemetryUnrowed,
          observabilityTelemetryKind3,
        ).map(
          (
            updateObservabilityTelemetryName2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            (..._extraArguments: unknown[]): Dynamic =>
              options.door?.(updateObservabilityTelemetryName2),
        )),
    (..._extraArguments: unknown[]): Dynamic =>
      options.ring?.(
        `clientEvent`,
        updateObservabilityTelemetryClientEvent2.name,
        observabilityTelemetryUnrowed,
      ),
    (..._extraArguments: unknown[]): Dynamic => options.console?.(label),
  ] as Dynamic)
    try {
      updateObservabilityTelemetryClientEventResult();
    } catch {}
}

function resolveObservabilityTelemetryValue19(
  observabilityTelemetryValue19?: Dynamic,
  options: Dynamic = ObservabilityTelemetryConsole,
  context: Dynamic = Date.now(),
  ..._extraArguments: unknown[]
) {
  let observabilityTelemetryValue032 = observabilityTelemetryValue03;
  emitTelemetryEvent(observabilityTelemetryValue19, options, context);
  return observabilityTelemetryValue03 !== observabilityTelemetryValue032;
}

var observabilityTelemetrySet28: Dynamic;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeObservabilityTelemetry3Step1(): void {
  (ObservabilityTelemetryConsole = {
    console: (
      observabilityTelemetryConsole?: Dynamic,
      ..._extraArguments: unknown[]
    ) => console.warn(observabilityTelemetryConsole),
  });
  (observabilityTelemetryValues = []);
  (observabilityTelemetryValue02 = 0);
  (observabilityTelemetryValue03 = 0);
  (observabilityTelemetryMap2 = new (Map as Dynamic)());
  (observabilityTelemetryValue04 = 0);
  (observabilityTelemetryValue05 = 0);
  (observabilityTelemetryMap3 = new (Map as Dynamic)());
  (observabilityTelemetryMap4 = new (Map as Dynamic)());
  (observabilityTelemetrySet24 = new (Set as Dynamic)([
    `pages.crash`,
    `pages.editor.contained`,
    `pages.outbox.dropped`,
  ]));
  (observabilityTelemetryMap5 = new (Map as Dynamic)());
  (observabilityTelemetrySet25 = new (Set as Dynamic)());
  (observabilityTelemetryMap6 = new (Map as Dynamic)());
  (ObservabilityTelemetryMisc = `misc`);
  (ObservabilityTelemetryPagesCrash = {
    "pages.crash": `crash`,
    "pages.widget.fault": `widget_fault`,
    "pages.opport.race": `opport_race`,
    "pages.editor.remount": `editor_remount`,
    "pages.hot.swap": `hot_swap`,
    "pages.comment.confirmed": `comment_confirmed`,
    "pages.comment.withdraw": `comment_withdraw`,
    "pages.reaction.verdict": `reaction_verdict`,
    "pages.widget.relay_dropped": `widget_relay_dropped`,
    "pages.link.road": `link_road`,
    "pages.summon.unavailable": `summon_unavailable`,
    "pages.summon.view_dark": `summon_view_dark`,
    "pages.summon.sent": `summon_sent`,
    "pages.summon.state": `summon_state`,
    "pages.summon.run": `summon_run`,
    "pages.summon.run_untied": `summon_run_untied`,
    "pages.summon.run_late": `summon_run_late`,
    "pages.summon.run_marked": `summon_run_marked`,
    "pages.ask.marked": `ask_marked`,
    "pages.ask.open": `ask_open`,
    "pages.ask.sent": `ask_sent`,
    "pages.ask.closed": `ask_closed`,
    "pages.ask.why": `ask_why`,
    "pages.ask.refused": `ask_refused`,
    "pages.ask.road": `ask_road`,
    "pages.seen.read": `seen_read`,
    "pages.seen.add": `seen_add`,
    "pages.summon.round": `summon_round`,
    "pages.sample.invoked": `sample_invoked`,
    "pages.sample.unbidden": `sample_unbidden`,
    "pages.sample.consent": `sample_consent`,
    "pages.sample.unavailable": `sample_unavailable`,
    "pages.lane.dead": `lane_dead`,
    "pages.door.threw": `door_threw`,
    "pages.door.slow": `door_slow`,
    "pages.net": `net`,
    "pages.face.sync_lost": `face_sync_lost`,
    "pages.face.read_only": `face_read_only`,
    "pages.face.undo": `face_undo`,
    "pages.undo.revive": `undo_revive`,
    "pages.mention.search": `mention_search`,
    "pages.agent.seed": `agent_seed`,
    "pages.display.pick": `display_pick`,
    "pages.display.refused": `display_refused`,
    "pages.heading.fold": `heading_fold`,
  });
  (observabilityTelemetrySet26 = new (Set as Dynamic)(
    Object.values(ObservabilityTelemetryPagesRefusalShadow)
      .flatMap(
        (
          ObservabilityTelemetryPagesRefusalShadowValue?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          Object.values(
            ObservabilityTelemetryPagesRefusalShadowValue.wireBy?.words ?? {},
          ).concat(ObservabilityTelemetryPagesRefusalShadowValue.wire ?? []),
      )
      .filter(
        (
          ObservabilityTelemetryPagesRefusalShadowValue?: Dynamic,
          ..._extraArguments: unknown[]
        ) =>
          ObservabilityTelemetryPagesRefusalShadowValue !==
            `telemetry:pane_row_capped` &&
          observabilityTelemetryPattern29.test(
            ObservabilityTelemetryPagesRefusalShadowValue,
          ) &&
          observabilityTelemetryPattern33.test(
            ObservabilityTelemetryPagesRefusalShadowValue,
          ) &&
          !observabilityTelemetrySet22.has(
            ObservabilityTelemetryPagesRefusalShadowValue,
          ),
      ),
  ));
  new (Set as Dynamic)([
    ...observabilityTelemetrySet26,
    ...Object.values(ObservabilityTelemetryPagesCrash),
    ObservabilityTelemetryMisc,
  ]);
  (observabilityTelemetryMap7 = new (Map as Dynamic)());
  (observabilityTelemetrySet27 = new (Set as Dynamic)([
    `pages.write.integrity_gap`,
    `pages.write.integrity_end`,
  ]));
  39 -
    [...observabilityTelemetrySet27].reduce(
      (
        accumulator?: Dynamic,
        item?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        accumulator + (ObservabilityTelemetryPagesRefusalShadow[item].cap ?? 0),
      0,
    );
  (observabilityTelemetrySet28 = new (Set as Dynamic)());
}

export {
  emitTelemetryEvent,
  observabilityTelemetrySet28,
  resolveObservabilityTelemetryRing,
  resolveObservabilityTelemetryValue18,
  resolveObservabilityTelemetryValue19,
};
