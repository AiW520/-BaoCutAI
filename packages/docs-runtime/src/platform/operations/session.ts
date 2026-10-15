/** BaoCut: operation controller session. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import type { OperationControllerScope } from "./controller-contracts";
import {
  DataOperationControlMessage9,
  isDataOperationControlDeny,
} from "../data/operation-control-2";
import {
  collectDataOperationControlContent,
  getDataOperationControlSize,
  isPlainRecord,
  resolveDataOperationControlFlat3,
  resolveDataOperationControlStartsWith,
} from "../data/operation-control-4";
export function createOperationSession(
  operationScope: Pick<
    OperationControllerScope,
    | "uniqueItems5"
    | "enabled4"
    | "enabled14"
    | "loadDataOperationControlVerdictResult10"
    | "loadDataOperationControlVerdictHandler18"
    | "lookup"
    | "enabled2"
    | "state"
    | "loadDataOperationControlVerdictResult2"
    | "uniqueItems"
    | "kind"
    | "loadDataOperationControlVerdictHandler25"
    | "record3"
    | "dataOperationControlVerdict"
    | "items2"
    | "loadDataOperationControlVerdictHandler2"
    | "isPlainRecord2"
    | "items"
    | "caps"
    | "trim"
    | "uniqueItems6"
    | "enabled21"
    | "loadDataOperationControlVerdictResult19"
    | "enabled23"
    | "loadDataOperationControlVerdictResult3"
    | "rekeyHolds2"
    | "loadDataOperationControlVerdictHandler27"
    | "slice"
    | "rekeyHolds3"
    | "enabled22"
    | "resolveObservabilityTelemetryChunk2"
    | "loadDataOperationControlVerdictHandler29"
    | "rekeyHolds4"
    | "count7"
    | "enabled"
  >,
) {
  return {
    test2: (
      response?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) => {
      if (response.verdict !== `deny`) return false;
      if (isDataOperationControlDeny(response, options)) return true;
      let data: Dynamic = isPlainRecord(response.data) ? response.data : {};
      let label5 = `${String(response.reason)} ${String(response.detail)} ${String(data.detail)} ${String(data.message)}`;
      return data.problem === `unknown_key` || /unknown[_ ]key/.test(label5)
        ? (Array.isArray(data.at)
            ? data.at
            : Array.isArray(data.path)
              ? data.path
              : []
          ).some(
            (at2?: unknown, ..._extraArguments: unknown[]): Dynamic =>
              typeof at2 == `string` && operationScope.uniqueItems5.has(at2),
          )
          ? true
          : /(?:^|[\s[\].:])(stream|provenance|ids|opId)(?:: unknown key| is unknown_key)/.test(
              label5,
            )
        : false;
    },
    state: (..._extraArguments: unknown[]) => {
      if (
        operationScope.enabled4 ||
        operationScope.enabled14 ||
        operationScope.loadDataOperationControlVerdictResult10 !== null ||
        (0, operationScope.loadDataOperationControlVerdictHandler18)()
      )
        return `readonly`;
      for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
        if (loadDataOperationControlVerdictResult22.pending() > 0)
          return `saving`;
      for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
        if (loadDataOperationControlVerdictResult22.trayHolds())
          return `unsaved`;
      let enabled26 = false;
      for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
        if (loadDataOperationControlVerdictResult22.shortRevived.size > 0) {
          if (!loadDataOperationControlVerdictResult22.shortInGrace())
            return `unsaved`;
          enabled26 = true;
        }
      if (enabled26) return `saving`;
      for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
        if (loadDataOperationControlVerdictResult22.strays > 0) return `saving`;
      return operationScope.enabled2 ? `saved` : `door`;
    },
    emit7: (..._extraArguments: unknown[]): undefined => {
      let state2 = (0, operationScope.state)();
      if (state2 !== operationScope.loadDataOperationControlVerdictResult2) {
        operationScope.loadDataOperationControlVerdictResult2 = state2;
        for (let loadDataOperationControlVerdictResult22 of operationScope.uniqueItems as Dynamic)
          loadDataOperationControlVerdictResult22(state2);
        for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
          loadDataOperationControlVerdictResult22.emit(
            operationScope.kind !== null &&
              !loadDataOperationControlVerdictResult22.nodeGone &&
              state2 !== `readonly`
              ? (0, operationScope.loadDataOperationControlVerdictHandler25)(
                  loadDataOperationControlVerdictResult22.node,
                )
              : {
                  t: `state`,
                  node: loadDataOperationControlVerdictResult22.node,
                  state: loadDataOperationControlVerdictResult22.nodeGone
                    ? `readonly`
                    : state2,
                  ...(state2 === `saving` &&
                  loadDataOperationControlVerdictResult22.strays > 0 &&
                  loadDataOperationControlVerdictResult22.pending() === 0 &&
                  !loadDataOperationControlVerdictResult22.trayHolds()
                    ? {
                        words: DataOperationControlMessage9,
                      }
                    : {}),
                },
          );
      }
    },
    isPlainRecord2: (..._extraArguments: unknown[]): Dynamic => {
      let doc: Dynamic = isPlainRecord(operationScope.record3.doc)
        ? operationScope.record3.doc
        : null;
      if (doc === null) return {};
      let loadDataOperationControlVerdictHandler30: Dynamic = (
        dataOperationControlVerdict2?: unknown,
        options?: unknown,
        ..._extraArguments: unknown[]
      ) =>
        typeof dataOperationControlVerdict2 == `number`
          ? typeof options == `number`
            ? Math.min(dataOperationControlVerdict2, options)
            : dataOperationControlVerdict2
          : undefined;
      let depthMax: Dynamic = loadDataOperationControlVerdictHandler30(
        doc.depth,
        operationScope.dataOperationControlVerdict.caps?.depthMax,
      );
      let listLevelsMax: Dynamic = loadDataOperationControlVerdictHandler30(
        doc.listLevels ?? doc.list_levels,
        operationScope.dataOperationControlVerdict.caps?.listLevelsMax,
      );
      return {
        ...(depthMax === undefined
          ? {}
          : {
              depthMax: depthMax,
            }),
        ...(listLevelsMax === undefined
          ? {}
          : {
              listLevelsMax: listLevelsMax,
            }),
      };
    },
    join: (..._extraArguments: unknown[]) =>
      `${operationScope.items2.filter((item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (0, operationScope.loadDataOperationControlVerdictHandler2)(operationScope.record3[item])).join(`,`)}|${JSON.stringify((0, operationScope.isPlainRecord2)())}`,
    caps: (..._extraArguments: unknown[]): Dynamic => {
      let filteredItems = operationScope.items2.filter(
        (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          (0, operationScope.loadDataOperationControlVerdictHandler2)(
            operationScope.record3[item],
          ) && operationScope.dataOperationControlVerdict.caps?.[item] !== true,
      );
      let isPlainRecord3: Dynamic = (0, operationScope.isPlainRecord2)();
      return operationScope.items.length === 0 &&
        filteredItems.length === 0 &&
        Object.keys(isPlainRecord3).length === 0
        ? operationScope.dataOperationControlVerdict.caps
        : {
            ...operationScope.dataOperationControlVerdict.caps,
            ...(operationScope.items.length > 0
              ? {
                  accepts: [
                    ...new (Set as Dynamic)([
                      ...(operationScope.dataOperationControlVerdict.caps
                        ?.accepts ?? []),
                      ...operationScope.items,
                    ]),
                  ],
                }
              : {}),
            ...Object.fromEntries(
              filteredItems.map(
                (
                  filteredItem?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => [filteredItem, true],
              ),
            ),
            ...isPlainRecord3,
          };
    },
    emit8: (..._extraArguments: unknown[]): undefined => {
      let sessionEntry: Dynamic =
        operationScope.dataOperationControlVerdict.session.get();
      if (sessionEntry)
        for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic) {
          if (
            loadDataOperationControlVerdictResult22.toldHwm !== null &&
            loadDataOperationControlVerdictResult22.toldHwm >= sessionEntry.hwm
          )
            continue;
          loadDataOperationControlVerdictResult22.toldHwm = sessionEntry.hwm;
          let caps2: Dynamic = (0, operationScope.caps)();
          let record4: Dynamic = caps2
            ? {
                caps: caps2,
              }
            : {};
          loadDataOperationControlVerdictResult22.emit({
            t: `session`,
            node: loadDataOperationControlVerdictResult22.node,
            sess: sessionEntry.label,
            hwm: sessionEntry.hwm,
            ...record4,
          });
        }
    },
    trim: (
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let logged: Dynamic = dataOperationControlVerdict2.logged(options);
      if (logged) {
        (operationScope.dataOperationControlVerdict.wal.rewrite
          ? operationScope.dataOperationControlVerdict.wal.rewrite(
              dataOperationControlVerdict2.node,
              logged,
            )
          : operationScope.dataOperationControlVerdict.wal
              .trim(dataOperationControlVerdict2.node, options.opId)
              .then(
                (..._extraArguments: unknown[]): Dynamic =>
                  operationScope.dataOperationControlVerdict.wal.append(
                    dataOperationControlVerdict2.node,
                    logged,
                  ),
              )
        ).catch((..._extraArguments: unknown[]): undefined => undefined);
      }
    },
    rekeyHolds: (
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let hwm = -1;
      let isInteger: Dynamic = (
        dataOperationControlVerdict3?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        if (!dataOperationControlVerdict3.startsWith(`_.`))
          return dataOperationControlVerdict3;
        let total2: Dynamic =
          options + 1 + Number(dataOperationControlVerdict3.slice(2));
        if (Number.isInteger(total2)) {
          hwm = Math.max(hwm, total2);
        }
        return `${dataOperationControlVerdict2}.${total2}`;
      };
      for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic) {
        for (let loadDataOperationControlVerdictResult23 of loadDataOperationControlVerdictResult22.queue as Dynamic) {
          loadDataOperationControlVerdictResult23.ops =
            collectDataOperationControlContent(
              loadDataOperationControlVerdictResult23.ops,
              isInteger,
            );
          loadDataOperationControlVerdictResult23.editorSaid ??=
            loadDataOperationControlVerdictResult23.predicted;
          loadDataOperationControlVerdictResult23.predicted =
            loadDataOperationControlVerdictResult23.predicted.map(
              (predicted?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                predicted.map(isInteger),
            );
          loadDataOperationControlVerdictResult23.homes &&=
            loadDataOperationControlVerdictResult23.homes.map(isInteger);
          (0, operationScope.trim)(
            loadDataOperationControlVerdictResult22,
            loadDataOperationControlVerdictResult23,
          );
        }
        loadDataOperationControlVerdictResult22.rekeyWords(isInteger);
        loadDataOperationControlVerdictResult22.rekeyHolds(isInteger);
      }
      let sessionEntry: Dynamic =
        operationScope.dataOperationControlVerdict.session.get();
      if (
        sessionEntry &&
        sessionEntry.label === dataOperationControlVerdict2 &&
        hwm > sessionEntry.hwm
      ) {
        operationScope.dataOperationControlVerdict.session.set({
          ...sessionEntry,
          hwm: hwm,
        });
      }
    },
    resolveObservabilityTelemetryChunk2: (
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        dataOperationControlVerdict2 !== undefined &&
        dataOperationControlVerdict2 !== `_`
      ) {
        operationScope.uniqueItems6.add(dataOperationControlVerdict2);
      }
      operationScope.dataOperationControlVerdict.session.set(null);
      operationScope.enabled21 = false;
      operationScope.loadDataOperationControlVerdictResult19 = null;
      operationScope.enabled23 = false;
      operationScope.loadDataOperationControlVerdictResult3 = null;
      (0, operationScope.rekeyHolds2)(dataOperationControlVerdict2);
    },
    rekeyHolds2: (
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        dataOperationControlVerdict2 === undefined ||
        dataOperationControlVerdict2 === `_`
      )
        return;
      let lookup3: Dynamic = new (Map as Dynamic)();
      let count10 = 0;
      for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
        for (let loadDataOperationControlVerdictResult23 of (loadDataOperationControlVerdictResult22.inflight
          ? [
              loadDataOperationControlVerdictResult22.inflight,
              ...loadDataOperationControlVerdictResult22.queue,
            ]
          : loadDataOperationControlVerdictResult22.queue) as Dynamic)
          for (let loadDataOperationControlVerdictResult24 of resolveDataOperationControlFlat3(
            loadDataOperationControlVerdictResult23,
          ) as Dynamic)
            if (loadDataOperationControlVerdictResult24.startsWith(`_.`)) {
              count10 = Math.max(
                count10,
                Number(loadDataOperationControlVerdictResult24.slice(2)) + 1 ||
                  0,
              );
            }
      for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
        for (let loadDataOperationControlVerdictResult23 of (loadDataOperationControlVerdictResult22.inflight
          ? [
              loadDataOperationControlVerdictResult22.inflight,
              ...loadDataOperationControlVerdictResult22.queue,
            ]
          : loadDataOperationControlVerdictResult22.queue) as Dynamic)
          if (
            !(0, operationScope.loadDataOperationControlVerdictHandler27)(
              loadDataOperationControlVerdictResult23,
            )
          )
            for (let loadDataOperationControlVerdictResult24 of resolveDataOperationControlFlat3(
              loadDataOperationControlVerdictResult23,
            ) as Dynamic)
              if (
                resolveDataOperationControlStartsWith(
                  loadDataOperationControlVerdictResult24,
                  dataOperationControlVerdict2,
                ) >= 0 &&
                !lookup3.has(loadDataOperationControlVerdictResult24)
              ) {
                lookup3.set(
                  loadDataOperationControlVerdictResult24,
                  `_.${count10 + lookup3.size}`,
                );
              }
      if (lookup3.size !== 0)
        for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic) {
          loadDataOperationControlVerdictResult22.toldHwm = null;
          for (let loadDataOperationControlVerdictResult23 of (loadDataOperationControlVerdictResult22.inflight
            ? [
                loadDataOperationControlVerdictResult22.inflight,
                ...loadDataOperationControlVerdictResult22.queue,
              ]
            : loadDataOperationControlVerdictResult22.queue) as Dynamic) {
            if (
              (loadDataOperationControlVerdictResult23.replayed ||
                loadDataOperationControlVerdictResult23.lost) &&
              !loadDataOperationControlVerdictResult23.loggedAs
            ) {
              loadDataOperationControlVerdictResult23.loggedAs = {
                ops: loadDataOperationControlVerdictResult23.ops,
                predicted: loadDataOperationControlVerdictResult23.predicted,
                ...(loadDataOperationControlVerdictResult23.homes
                  ? {
                      homes: loadDataOperationControlVerdictResult23.homes,
                    }
                  : {}),
              };
            }
            loadDataOperationControlVerdictResult23.editorSaid ??=
              loadDataOperationControlVerdictResult23.predicted;
            [
              loadDataOperationControlVerdictResult23.ops,
              loadDataOperationControlVerdictResult23.predicted,
            ] = [
              getDataOperationControlSize(
                loadDataOperationControlVerdictResult23.ops,
                lookup3,
              ),
              getDataOperationControlSize(
                loadDataOperationControlVerdictResult23.predicted,
                lookup3,
              ),
            ];
            loadDataOperationControlVerdictResult23.homes &&=
              getDataOperationControlSize(
                loadDataOperationControlVerdictResult23.homes,
                lookup3,
              );
          }
          loadDataOperationControlVerdictResult22.rekeyWords(
            (
              dataOperationControlVerdict3?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              lookup3.get(dataOperationControlVerdict3) ??
              dataOperationControlVerdict3,
          );
          loadDataOperationControlVerdictResult22.rekeyHolds(
            (
              dataOperationControlVerdict3?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              lookup3.get(dataOperationControlVerdict3) ??
              dataOperationControlVerdict3,
          );
        }
    },
    loadDataOperationControlVerdictHandler27: (
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      dataOperationControlVerdict2.sent === true &&
      (dataOperationControlVerdict2.replayed === true ||
        (dataOperationControlVerdict2.verdictLostTries ?? 0) > 0) &&
      !dataOperationControlVerdict2.namesRefused,
    rekeyHolds3: (
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let sessionEntry: Dynamic =
        operationScope.dataOperationControlVerdict.session.get();
      if (!sessionEntry || sessionEntry.label === dataOperationControlVerdict2)
        return;
      let items3: Dynamic = [];
      for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
        (items3.push as Dynamic)(
          ...(loadDataOperationControlVerdictResult22.inflight
            ? [loadDataOperationControlVerdictResult22.inflight]
            : []),
          ...loadDataOperationControlVerdictResult22.queue,
        );
      let hwm: Dynamic = sessionEntry.hwm;
      for (let loadDataOperationControlVerdictResult22 of items3 as Dynamic)
        for (let loadDataOperationControlVerdictResult23 of [
          ...loadDataOperationControlVerdictResult22.predicted.flat(),
          ...resolveDataOperationControlFlat3(
            loadDataOperationControlVerdictResult22,
          ),
        ] as Dynamic)
          hwm = Math.max(
            hwm,
            resolveDataOperationControlStartsWith(
              loadDataOperationControlVerdictResult23,
              sessionEntry.label,
            ),
          );
      let lookup3: Dynamic = new (Map as Dynamic)();
      for (let loadDataOperationControlVerdictResult22 of items3 as Dynamic)
        if (
          !(0, operationScope.loadDataOperationControlVerdictHandler27)(
            loadDataOperationControlVerdictResult22,
          )
        )
          for (let loadDataOperationControlVerdictResult23 of resolveDataOperationControlFlat3(
            loadDataOperationControlVerdictResult22,
          ) as Dynamic)
            if (
              resolveDataOperationControlStartsWith(
                loadDataOperationControlVerdictResult23,
                dataOperationControlVerdict2,
              ) >= 0 &&
              !lookup3.has(loadDataOperationControlVerdictResult23)
            ) {
              lookup3.set(
                loadDataOperationControlVerdictResult23,
                `${sessionEntry.label}.${hwm + 1 + lookup3.size}`,
              );
            }
      if (lookup3.size !== 0) {
        for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic) {
          loadDataOperationControlVerdictResult22.toldHwm = null;
          for (let loadDataOperationControlVerdictResult23 of (loadDataOperationControlVerdictResult22.inflight
            ? [
                loadDataOperationControlVerdictResult22.inflight,
                ...loadDataOperationControlVerdictResult22.queue,
              ]
            : loadDataOperationControlVerdictResult22.queue) as Dynamic) {
            let ops: Dynamic = loadDataOperationControlVerdictResult23.ops;
            if (
              (loadDataOperationControlVerdictResult23.replayed ||
                loadDataOperationControlVerdictResult23.lost) &&
              !loadDataOperationControlVerdictResult23.loggedAs
            ) {
              loadDataOperationControlVerdictResult23.loggedAs = {
                ops: loadDataOperationControlVerdictResult23.ops,
                predicted: loadDataOperationControlVerdictResult23.predicted,
                ...(loadDataOperationControlVerdictResult23.homes
                  ? {
                      homes: loadDataOperationControlVerdictResult23.homes,
                    }
                  : {}),
              };
            }
            loadDataOperationControlVerdictResult23.editorSaid ??=
              loadDataOperationControlVerdictResult23.predicted;
            [
              loadDataOperationControlVerdictResult23.ops,
              loadDataOperationControlVerdictResult23.predicted,
            ] = [
              getDataOperationControlSize(
                loadDataOperationControlVerdictResult23.ops,
                lookup3,
              ),
              getDataOperationControlSize(
                loadDataOperationControlVerdictResult23.predicted,
                lookup3,
              ),
            ];
            loadDataOperationControlVerdictResult23.homes &&=
              getDataOperationControlSize(
                loadDataOperationControlVerdictResult23.homes,
                lookup3,
              );
            if (loadDataOperationControlVerdictResult23.ops !== ops) {
              (0, operationScope.trim)(
                loadDataOperationControlVerdictResult22,
                loadDataOperationControlVerdictResult23,
              );
            }
          }
          loadDataOperationControlVerdictResult22.rekeyWords(
            (
              dataOperationControlVerdict3?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              lookup3.get(dataOperationControlVerdict3) ??
              dataOperationControlVerdict3,
          );
          loadDataOperationControlVerdictResult22.rekeyHolds(
            (
              dataOperationControlVerdict3?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              lookup3.get(dataOperationControlVerdict3) ??
              dataOperationControlVerdict3,
          );
        }
        operationScope.dataOperationControlVerdict.session.set({
          ...sessionEntry,
          hwm: hwm + lookup3.size,
        });
      }
    },
    loadDataOperationControlVerdictHandler28: (
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let lookup3: Dynamic = new (Map as Dynamic)();
      for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
        for (let loadDataOperationControlVerdictResult23 of [
          ...(loadDataOperationControlVerdictResult22.inflight
            ? [loadDataOperationControlVerdictResult22.inflight]
            : []),
          ...loadDataOperationControlVerdictResult22.queue,
          ...loadDataOperationControlVerdictResult22.handed,
        ] as Dynamic)
          if (loadDataOperationControlVerdictResult23.editorSaid) {
            loadDataOperationControlVerdictResult23.editorSaid.forEach(
              (
                editorSaid?: Dynamic,
                index5?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic =>
                editorSaid.forEach(
                  (
                    rolldownRImport2?: Dynamic,
                    index6?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): undefined => {
                    let predictedItemItem: Dynamic =
                      loadDataOperationControlVerdictResult23.predicted[
                        index5
                      ]?.[index6];
                    if (
                      predictedItemItem !== undefined &&
                      predictedItemItem !== rolldownRImport2
                    ) {
                      lookup3.set(rolldownRImport2, predictedItemItem);
                    }
                  },
                ),
            );
          }
      return lookup3;
    },
    slice: (..._extraArguments: unknown[]): Dynamic => {
      let label5: Dynamic =
        operationScope.dataOperationControlVerdict.session.get()?.label;
      let uniqueItems7: Dynamic = new (Set as Dynamic)();
      for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
        for (let loadDataOperationControlVerdictResult23 of (loadDataOperationControlVerdictResult22.inflight
          ? [
              loadDataOperationControlVerdictResult22.inflight,
              ...loadDataOperationControlVerdictResult22.queue,
            ]
          : loadDataOperationControlVerdictResult22.queue) as Dynamic)
          if (
            !loadDataOperationControlVerdictResult23.assert &&
            !(0, operationScope.loadDataOperationControlVerdictHandler27)(
              loadDataOperationControlVerdictResult23,
            )
          )
            for (let loadDataOperationControlVerdictResult24 of resolveDataOperationControlFlat3(
              loadDataOperationControlVerdictResult23,
            ) as Dynamic) {
              let lastIndexOf: Dynamic =
                loadDataOperationControlVerdictResult24.lastIndexOf(`.`);
              let loadDataOperationControlVerdictResultSlice: Dynamic =
                lastIndexOf > 0
                  ? loadDataOperationControlVerdictResult24.slice(
                      0,
                      lastIndexOf,
                    )
                  : ``;
              if (
                loadDataOperationControlVerdictResultSlice !== `` &&
                loadDataOperationControlVerdictResultSlice !== `_` &&
                loadDataOperationControlVerdictResultSlice !== label5
              ) {
                uniqueItems7.add(loadDataOperationControlVerdictResultSlice);
              }
            }
      return [...uniqueItems7];
    },
    rekeyHolds4: (..._extraArguments: unknown[]): undefined => {
      for (let loadDataOperationControlVerdictResult22 of (0,
      operationScope.slice)() as Dynamic)
        (0, operationScope.rekeyHolds3)(
          loadDataOperationControlVerdictResult22,
        );
    },
    rekeyHolds5: (..._extraArguments: unknown[]): undefined => {
      for (let loadDataOperationControlVerdictResult22 of (0,
      operationScope.slice)() as Dynamic)
        (0, operationScope.rekeyHolds2)(
          loadDataOperationControlVerdictResult22,
        );
    },
    loadDataOperationControlVerdictResult18: (
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      operationScope.enabled22 = false;
      if (options !== undefined && options !== `_`) {
        operationScope.uniqueItems6.add(options);
      }
      (0, operationScope.resolveObservabilityTelemetryChunk2)(
        dataOperationControlVerdict2,
      );
      for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
        loadDataOperationControlVerdictResult22.toldHwm = null;
      let loadDataOperationControlVerdictHandler30 = (
        ..._extraArguments: unknown[]
      ): undefined =>
        void (0,
        operationScope.loadDataOperationControlVerdictHandler29)().then(
          (..._extraArguments: unknown[]): undefined => {
            for (let loadDataOperationControlVerdictResult22 of new (Set as Dynamic)(
              [dataOperationControlVerdict2, options],
            ) as Dynamic)
              if (loadDataOperationControlVerdictResult22 !== undefined) {
                (0, operationScope.rekeyHolds3)(
                  loadDataOperationControlVerdictResult22,
                );
              }
            if (operationScope.enabled21) {
              (0, operationScope.rekeyHolds4)();
            }
            operationScope.lookup.forEach(
              (lookup3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                lookup3.pump(),
            );
          },
        );
      let count10 =
        operationScope.count7 < 2
          ? 0
          : Math.min(3e4, 250 * 2 ** (operationScope.count7 - 1));
      operationScope.count7 += 1;
      if (count10 === 0) {
        loadDataOperationControlVerdictHandler30();
      } else {
        operationScope.dataOperationControlVerdict.timers.setTimeout(
          (..._extraArguments: unknown[]): undefined => {
            if (!operationScope.enabled) {
              loadDataOperationControlVerdictHandler30();
            }
          },
          count10,
        );
      }
    },
  };
}
