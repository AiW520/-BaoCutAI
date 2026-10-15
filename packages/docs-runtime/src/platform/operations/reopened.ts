/** BaoCut: operation controller reopened. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import type { OperationControllerScope } from "./controller-contracts";
import { reportOperationEvent } from "../observability/boot";
import { dataOperationControlValue300002 } from "../data/operation-control-2";
export function createOperationReopened(
  operationScope: Pick<
    OperationControllerScope,
    | "enabled"
    | "lookup"
    | "readsResume"
    | "kind"
    | "enabled18"
    | "rearmGap"
    | "loadDataOperationControlVerdictResult14"
    | "dataOperationControlVerdict"
    | "emit6"
    | "refusalClass"
    | "loadDataOperationControlVerdictResult3"
    | "enabled22"
    | "enabled21"
    | "loadDataOperationControlVerdictResult18"
    | "enabled23"
    | "loadDataOperationControlVerdictResult19"
    | "loadDataOperationControlVerdictHandler29"
    | "loadDataOperationControlVerdictResult10"
    | "enabled12"
    | "emit2"
    | "loadDataOperationControlVerdictHandler15"
    | "enabled19"
    | "loadDataOperationControlVerdictHandler16"
    | "enabled25"
    | "enabled14"
    | "ObservabilityTelemetryState122"
    | "ObservabilityTelemetryState123"
  >,
) {
  return {
    recovered: (..._extraArguments: unknown[]): undefined => {
      if (!operationScope.enabled) {
        let enabled26 = false;
        for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
          if (loadDataOperationControlVerdictResult22.unmoor()) {
            enabled26 = true;
          }
        if (enabled26) {
          reportOperationEvent(`moor.recovered`, {});
          for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
            loadDataOperationControlVerdictResult22.pump();
        }
      }
      if (!operationScope.enabled)
        for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
          loadDataOperationControlVerdictResult22.catchUpDue();
      if (!operationScope.enabled) {
        (0, operationScope.readsResume)(`the feed's carrier reconnected`);
      }
      if (
        !(
          operationScope.enabled ||
          operationScope.kind === null ||
          operationScope.kind === `refusing`
        )
      ) {
        operationScope.enabled18 = true;
        (0, operationScope.rearmGap)(
          `the feed's carrier reconnected — one held row tries the door (probation)`,
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
      }
    },
    reopened: (..._extraArguments: unknown[]) => {
      if (!operationScope.enabled) {
        (0, operationScope.readsResume)(`the carrier re-opened`);
        if (
          operationScope.kind !== null ||
          operationScope.enabled18 ||
          (0, operationScope.refusalClass)() !== null
        ) {
          (0, operationScope.rearmGap)(`the carrier re-opened`);
        }
        operationScope.loadDataOperationControlVerdictResult3 = null;
        for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
          loadDataOperationControlVerdictResult22.unmoor();
        if (
          [...operationScope.lookup.values()].some(
            (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              item.inflight,
          )
        )
          return void (operationScope.enabled22 = true);
        if (operationScope.enabled21)
          return (0, operationScope.loadDataOperationControlVerdictResult18)(
            operationScope.dataOperationControlVerdict.session.get()?.label,
          );
        operationScope.enabled22 = false;
        if (operationScope.enabled23) {
          operationScope.loadDataOperationControlVerdictResult19 = null;
          operationScope.enabled23 = false;
          (0, operationScope.loadDataOperationControlVerdictHandler29)().then(
            (..._extraArguments: unknown[]): Dynamic =>
              operationScope.lookup.forEach(
                (lookup3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  lookup3.pump(),
              ),
          );
        }
      }
    },
    ObservabilityTelemetryState123: (
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      if (
        !(
          operationScope.enabled ||
          operationScope.loadDataOperationControlVerdictResult10 !== null
        )
      ) {
        if (dataOperationControlVerdict2 === false) {
          operationScope.enabled12 = true;
          (0, operationScope.emit2)(true);
          return (0, operationScope.loadDataOperationControlVerdictHandler15)();
        }
        if (dataOperationControlVerdict2 === true) {
          operationScope.enabled12 = false;
          (0, operationScope.loadDataOperationControlVerdictHandler15)();
        }
        (0, operationScope.readsResume)(`the access moved`, options);
        operationScope.enabled19 = false;
        if (
          operationScope.kind !== null ||
          operationScope.enabled18 ||
          (0, operationScope.refusalClass)() !== null
        ) {
          (0, operationScope.rearmGap)(`the access moved`);
        }
        (0, operationScope.loadDataOperationControlVerdictHandler16)();
        if (!operationScope.enabled23) {
          if (operationScope.loadDataOperationControlVerdictResult19 !== null) {
            operationScope.enabled25 = true;
          }
          return;
        }
        if (operationScope.enabled14) {
          (0, operationScope.ObservabilityTelemetryState122)();
        }
      }
    },
    accessChanged: (
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (0, operationScope.ObservabilityTelemetryState123)(
        dataOperationControlVerdict2,
        false,
      ),
    readsResume2: (
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ) => (0, operationScope.readsResume)(dataOperationControlVerdict2, true),
  };
}
