/** BaoCut: operation controller connectivity. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import type { OperationControllerScope } from "./controller-contracts";
import { emitTelemetryEvent } from "../observability/telemetry-3";
import { createPagesLinkLateLiftEvent } from "../observability/browser-and-operation-events-1";
import { reportOperationEvent } from "../observability/boot";
import {
  DataOperationControlState3,
  DataOperationControlState4,
  DataOperationControlWhy3,
  DataOperationControlWhy4,
  DataOperationControlWhy5,
  dataOperationControlIdentifierPattern,
  dataOperationControlValue300002,
  dataOperationControlValue60000,
  resolveDataOperationControlRound2,
  resolveDataOperationControlValue23,
} from "../data/operation-control-2";
export function createOperationConnectivity(
  operationScope: Pick<
    OperationControllerScope,
    | "count6"
    | "kind"
    | "enabled"
    | "loadDataOperationControlVerdictResult10"
    | "label3"
    | "loadDataOperationControlVerdictResult14"
    | "dataOperationControlVerdict"
    | "refusalClass"
    | "lookup"
    | "loadDataOperationControlVerdictHandler25"
    | "emit7"
    | "index4"
    | "resolveDataOperationControlValue232"
    | "enabled18"
    | "state"
    | "enabled20"
    | "rearmGap"
    | "emit6"
    | "loadDataOperationControlVerdictHandler23"
    | "loadDataOperationControlVerdictHandler24"
    | "round"
    | "loadDataOperationControlVerdictResult13"
    | "knockHeard"
    | "loadDataOperationControlVerdictResult15"
    | "loadDataOperationControlVerdictResult16"
    | "index3"
    | "count8"
    | "enabled2"
    | "enabled24"
    | "emit"
    | "enabled4"
    | "capsSettled6"
    | "capsSettled7"
  >,
) {
  return {
    loadDataOperationControlVerdictHandler23: (
      ..._extraArguments: unknown[]
    ): Dynamic => operationScope.count6 + +(operationScope.kind === null),
    loadDataOperationControlVerdictHandler24: (
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      !operationScope.enabled &&
      operationScope.kind !== null &&
      operationScope.count6 === dataOperationControlVerdict2,
    loadDataOperationControlVerdictHandler25: (
      node?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      t: `state`,
      node: node,
      state: `saving`,
      words:
        operationScope.kind === `refusing`
          ? DataOperationControlWhy4
          : operationScope.kind === `signed_out`
            ? DataOperationControlWhy5
            : DataOperationControlWhy3,
      linkDown: true,
    }),
    emit5: (
      kind2?: Dynamic,
      why?: Dynamic,
      road: Dynamic = `write`,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        !(
          operationScope.kind !== null ||
          operationScope.loadDataOperationControlVerdictResult10 !== null ||
          operationScope.enabled
        )
      ) {
        operationScope.kind = kind2;
        operationScope.count6 += 1;
        operationScope.label3 = road;
        if (operationScope.loadDataOperationControlVerdictResult14 !== null) {
          operationScope.dataOperationControlVerdict.timers.clearTimeout(
            operationScope.loadDataOperationControlVerdictResult14,
          );
        }
        operationScope.loadDataOperationControlVerdictResult14 = null;
        reportOperationEvent(`link.down`, {
          kind: kind2,
          why: why,
          road: road,
        });
        console.info(
          kind2 === `unreached`
            ? `opTransport: the door could not be reached (${why}) — saving is paused: the rows are held, nothing is sent until a probe read is answered or the carrier re-opens`
            : kind2 === `signed_out`
              ? `opTransport: signed out (${why}) — saving is paused: the rows are held, nothing is sent until a probe read is answered again`
              : `opTransport: the door refused ${(0, operationScope.refusalClass)()?.BREAKER_N ?? 3} rows running with no road for the word (${why}) — saving is paused: the rows are held, nothing is sent until the carrier re-opens or the access moves`,
        );
        for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic) {
          loadDataOperationControlVerdictResult22.reclaim();
          if (loadDataOperationControlVerdictResult22.nodeGone) {
            loadDataOperationControlVerdictResult22.pumpBehind();
          } else {
            loadDataOperationControlVerdictResult22.emit(
              (0, operationScope.loadDataOperationControlVerdictHandler25)(
                loadDataOperationControlVerdictResult22.node,
              ),
            );
          }
        }
        (0, operationScope.emit7)();
        if (operationScope.index4 < 3) {
          operationScope.index4 = 3;
        }
        (0, operationScope.resolveDataOperationControlValue232)();
        if (operationScope.enabled18) {
          reportOperationEvent(`link.down.probation`, {
            why: why,
            road: road,
          });
        }
      }
    },
    emit6: (..._extraArguments: unknown[]): undefined => {
      let enabled26 = operationScope.enabled18;
      operationScope.enabled18 = false;
      if (operationScope.loadDataOperationControlVerdictResult14 !== null) {
        operationScope.dataOperationControlVerdict.timers.clearTimeout(
          operationScope.loadDataOperationControlVerdictResult14,
        );
      }
      operationScope.loadDataOperationControlVerdictResult14 = null;
      if (enabled26 && operationScope.kind === null && !operationScope.enabled)
        for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
          if (!loadDataOperationControlVerdictResult22.nodeGone) {
            loadDataOperationControlVerdictResult22.emit({
              t: `state`,
              node: loadDataOperationControlVerdictResult22.node,
              state: (0, operationScope.state)(),
              linkDown: false,
            });
          }
    },
    knockHeard: (
      dataOperationControlVerdict2: Dynamic = false,
      ..._extraArguments: unknown[]
    ) => {
      if (
        operationScope.enabled20 ||
        operationScope.kind === null ||
        operationScope.enabled
      )
        return;
      if (operationScope.kind === `refusing`) {
        if (
          ![...operationScope.lookup.values()].some(
            (item2?: Dynamic, ..._extraArguments: unknown[]) =>
              !item2.dead &&
              !item2.nodeGone &&
              (item2.queue.length > 0 || item2.inflight !== null),
          )
        )
          return (0, operationScope.resolveDataOperationControlValue232)();
        operationScope.enabled18 = true;
        (0, operationScope.rearmGap)(
          dataOperationControlVerdict2
            ? `the tab woke: one held row tries the refusing door`
            : `one held row tries the refusing door (probe)`,
          true,
        );
        if (operationScope.loadDataOperationControlVerdictResult14 !== null) {
          operationScope.dataOperationControlVerdict.timers.clearTimeout(
            operationScope.loadDataOperationControlVerdictResult14,
          );
        }
        operationScope.loadDataOperationControlVerdictResult14 =
          operationScope.dataOperationControlVerdict.timers.setTimeout(
            operationScope.emit6,
            dataOperationControlValue300002,
          );
        return;
      }
      let item: Dynamic = [...operationScope.lookup.values()].find(
        (item2?: Dynamic, ..._extraArguments: unknown[]) =>
          !item2.dead && !item2.nodeGone,
      );
      if (!item)
        return (0, operationScope.resolveDataOperationControlValue232)();
      operationScope.enabled20 = true;
      let [items3, setItems]: Dynamic = [
        (0, operationScope.loadDataOperationControlVerdictHandler23)(),
        operationScope.dataOperationControlVerdict.now?.(),
      ];
      item
        .knockHeard(
          (
            dataOperationControlVerdict3?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined =>
            void (
              dataOperationControlVerdict3 &&
              (0, operationScope.loadDataOperationControlVerdictHandler24)(
                items3,
              ) &&
              operationScope.kind !== `refusing` &&
              (0, operationScope.round)(
                `knock`,
                setItems,
                operationScope.label3 === `write` ||
                  operationScope.label3 === `stream`,
              )
            ),
        )
        .then(
          (result?: Dynamic, ..._extraArguments: unknown[]) => {
            operationScope.enabled20 = false;
            if (operationScope.kind === null) return;
            if (operationScope.kind === `refusing` || !result)
              return (0, operationScope.resolveDataOperationControlValue232)();
            let matchesLabel =
              operationScope.label3 === `write` ||
              operationScope.label3 === `stream`;
            if (matchesLabel) {
              operationScope.enabled18 = true;
            }
            (0, operationScope.rearmGap)(
              dataOperationControlVerdict2
                ? `the tab woke and the door answered a probe read`
                : `the door answered a probe read`,
              matchesLabel,
            );
            if (matchesLabel) {
              if (
                operationScope.loadDataOperationControlVerdictResult14 !== null
              ) {
                operationScope.dataOperationControlVerdict.timers.clearTimeout(
                  operationScope.loadDataOperationControlVerdictResult14,
                );
              }
              operationScope.loadDataOperationControlVerdictResult14 =
                operationScope.dataOperationControlVerdict.timers.setTimeout(
                  operationScope.emit6,
                  dataOperationControlValue300002,
                );
            }
          },
          (..._extraArguments: unknown[]): undefined => {
            operationScope.enabled20 = false;
            (0, operationScope.resolveDataOperationControlValue232)();
          },
        );
    },
    resolveDataOperationControlValue232: (
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        operationScope.loadDataOperationControlVerdictResult13 !== null ||
        operationScope.enabled20 ||
        operationScope.kind === null ||
        operationScope.enabled
      )
        return;
      let loadDataOperationControlVerdictResult22: number =
        ++operationScope.index4;
      operationScope.loadDataOperationControlVerdictResult13 =
        operationScope.dataOperationControlVerdict.timers.setTimeout(
          (..._extraArguments: unknown[]): undefined => {
            operationScope.loadDataOperationControlVerdictResult13 = null;
            (0, operationScope.knockHeard)();
          },
          operationScope.kind === `refusing`
            ? resolveDataOperationControlRound2(
                Math.min(
                  dataOperationControlValue60000,
                  500 * 2 ** (loadDataOperationControlVerdictResult22 - 1),
                ),
                operationScope.dataOperationControlVerdict.random ??
                  ((..._extraArguments: unknown[]) => 1),
              )
            : resolveDataOperationControlValue23(
                loadDataOperationControlVerdictResult22,
                operationScope.dataOperationControlVerdict.random ??
                  ((..._extraArguments: unknown[]) => 1),
              ),
        );
    },
    woke: (..._extraArguments: unknown[]): undefined => {
      if (
        !(
          operationScope.enabled ||
          operationScope.loadDataOperationControlVerdictResult15 !== null ||
          operationScope.enabled20 ||
          operationScope.kind === null
        )
      ) {
        operationScope.loadDataOperationControlVerdictResult15 =
          operationScope.dataOperationControlVerdict.timers.setTimeout(
            (..._extraArguments: unknown[]): undefined =>
              void (operationScope.loadDataOperationControlVerdictResult15 =
                null),
            DataOperationControlState3,
          );
        if (operationScope.loadDataOperationControlVerdictResult13 !== null) {
          operationScope.dataOperationControlVerdict.timers.clearTimeout(
            operationScope.loadDataOperationControlVerdictResult13,
          );
        }
        operationScope.loadDataOperationControlVerdictResult13 = null;
        (0, operationScope.knockHeard)(true);
      }
    },
    knockHeard2: (..._extraArguments: unknown[]): undefined => {
      if (
        !(
          operationScope.enabled ||
          operationScope.kind === null ||
          operationScope.loadDataOperationControlVerdictResult16 !== null ||
          operationScope.enabled20
        )
      ) {
        operationScope.loadDataOperationControlVerdictResult16 =
          operationScope.dataOperationControlVerdict.timers.setTimeout(
            (..._extraArguments: unknown[]): undefined =>
              void (operationScope.loadDataOperationControlVerdictResult16 =
                null),
            DataOperationControlState4,
          );
        if (operationScope.loadDataOperationControlVerdictResult13 !== null) {
          operationScope.dataOperationControlVerdict.timers.clearTimeout(
            operationScope.loadDataOperationControlVerdictResult13,
          );
        }
        operationScope.loadDataOperationControlVerdictResult13 = null;
        reportOperationEvent(`link.down.kick`, {
          kind: operationScope.kind,
        });
        (0, operationScope.knockHeard)();
      }
    },
    rearmGap: (
      why?: Dynamic,
      options: Dynamic = false,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (!options) {
        operationScope.index3 = 0;
      }
      operationScope.count8 = 0;
      for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
        loadDataOperationControlVerdictResult22.readsUnanswered = 0;
      if (!options) {
        (0, operationScope.emit6)();
        operationScope.index4 = 0;
      }
      if (operationScope.loadDataOperationControlVerdictResult13 !== null) {
        operationScope.dataOperationControlVerdict.timers.clearTimeout(
          operationScope.loadDataOperationControlVerdictResult13,
        );
      }
      operationScope.loadDataOperationControlVerdictResult13 = null;
      if (operationScope.kind !== null) {
        reportOperationEvent(`link.up`, {
          kind: operationScope.kind,
          why: why,
        });
        console.info(`opTransport: ${why} — the held rows fly again`);
        operationScope.kind = null;
        for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
          if (!loadDataOperationControlVerdictResult22.nodeGone) {
            loadDataOperationControlVerdictResult22.emit({
              t: `state`,
              node: loadDataOperationControlVerdictResult22.node,
              state: (0, operationScope.state)(),
              ...(options
                ? {}
                : {
                    linkDown: false,
                  }),
            });
          }
        (0, operationScope.emit7)();
        for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic) {
          loadDataOperationControlVerdictResult22.pump();
          loadDataOperationControlVerdictResult22.rearmGap();
        }
      }
    },
    round: (
      what?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let max =
        options === undefined ||
        operationScope.dataOperationControlVerdict.now === undefined
          ? undefined
          : Math.max(
              0,
              operationScope.dataOperationControlVerdict.now() - options,
            );
      reportOperationEvent(`link.up.late`, {
        what: what,
        ...(max === undefined
          ? {}
          : {
              lateMs: Math.round(max),
            }),
      });
      if (max !== undefined) {
        emitTelemetryEvent(createPagesLinkLateLiftEvent(what, max));
      }
      if (context) {
        operationScope.enabled18 = true;
        if (operationScope.loadDataOperationControlVerdictResult14 !== null) {
          operationScope.dataOperationControlVerdict.timers.clearTimeout(
            operationScope.loadDataOperationControlVerdictResult14,
          );
        }
        operationScope.loadDataOperationControlVerdictResult14 =
          operationScope.dataOperationControlVerdict.timers.setTimeout(
            operationScope.emit6,
            dataOperationControlValue300002,
          );
      }
      (0, operationScope.rearmGap)(
        what === `knock`
          ? `the door answered a probe read, late`
          : `the door took the held row, heard late`,
        context,
      );
    },
    loadDataOperationControlVerdictHandler26: (..._extraArguments: unknown[]) =>
      operationScope.enabled2 ||
      operationScope.enabled24 ||
      [...operationScope.lookup.values()].some(
        (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          item.served || item.lastRev >= 0,
      ),
    test: (response?: Dynamic, ..._extraArguments: unknown[]) =>
      response.verdict === `deny` &&
      dataOperationControlIdentifierPattern.test(String(response.reason ?? ``)),
    capsSettled7: (..._extraArguments: unknown[]): Dynamic => (
      (0, operationScope.emit)(),
      operationScope.enabled4 ||
        (0, operationScope.capsSettled6)() ||
        operationScope.kind !== null
    ),
    pump2: (..._extraArguments: unknown[]): undefined => {
      let capsSettled8: Dynamic = (0, operationScope.capsSettled7)();
      for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
        if (capsSettled8) {
          if (loadDataOperationControlVerdictResult22.nodeGone) {
            loadDataOperationControlVerdictResult22.pumpBehind();
          }
        } else {
          loadDataOperationControlVerdictResult22.pump();
        }
    },
  };
}
