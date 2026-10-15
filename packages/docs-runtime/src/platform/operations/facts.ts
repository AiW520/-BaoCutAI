/** BaoCut: operation controller facts. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import type { OperationControllerScope } from "./controller-contracts";
import { reportOperationEvent } from "../observability/boot";
import {
  DataOperationControlState6,
  dataOperationControlSet10,
  dataOperationControlValue600002,
  resolveDataOperationControlRound,
} from "../data/operation-control-2";
import {
  isPlainRecord,
  resolveDataOperationControlSure,
} from "../data/operation-control-4";
export function createOperationFacts(
  operationScope: Pick<
    OperationControllerScope,
    | "enabled4"
    | "enabled"
    | "loadDataOperationControlVerdictResult10"
    | "enabled14"
    | "enabled12"
    | "dataOperationControlVerdict"
    | "loadDataOperationControlVerdictHandler26"
    | "refusalClass"
    | "loadDataOperationControlVerdictResult5"
    | "loadDataOperationControlVerdictResult8"
    | "enabled8"
    | "enabled9"
    | "loadDataOperationControlVerdictHandler11"
    | "loadDataOperationControlVerdictResult6"
    | "loadDataOperationControlVerdictResult7"
    | "enabled13"
    | "enabled10"
    | "enabled7"
    | "loadDataOperationControlVerdictResult19"
    | "enabled23"
    | "TELEMETRYATTRIBUTENAMES"
    | "asks"
    | "classify"
    | "enabled11"
    | "loadDataOperationControlVerdictHandler15"
    | "loadDataOperationControlVerdictHandler16"
    | "capsSettled5"
    | "loadDataOperationControlVerdictHandler13"
    | "race3"
    | "race4"
    | "count4"
    | "loadDataOperationControlVerdictHandler14"
    | "loadDataOperationControlVerdictResult3"
    | "loadObservabilityTelemetryStatus2"
    | "race2"
    | "resolveDataOperationControlRound5"
    | "count"
    | "total"
    | "loadDataOperationControlVerdictResult9"
    | "enabled21"
    | "items"
    | "loadDataOperationControlVerdictResult17"
    | "count8"
    | "count9"
    | "floor"
    | "rekeyHolds"
    | "rekeyHolds3"
    | "rekeyHolds4"
    | "lookup"
    | "emit8"
    | "late"
    | "emit7"
  >,
) {
  return {
    capsSettled5: (..._extraArguments: unknown[]): Dynamic =>
      operationScope.enabled4 &&
      !operationScope.enabled &&
      operationScope.loadDataOperationControlVerdictResult10 === null &&
      !(operationScope.enabled14 && operationScope.enabled12) &&
      operationScope.dataOperationControlVerdict.capsSettled?.() === false,
    classify: (response?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      if (response.verdict !== `deny`) return false;
      let dataOperationControlSure: Dynamic =
        resolveDataOperationControlSure(response);
      if (dataOperationControlSure !== null)
        return (
          dataOperationControlSure.sure ||
          (0, operationScope.loadDataOperationControlVerdictHandler26)()
        );
      let data: Dynamic = isPlainRecord(response.data) ? response.data : {};
      if (
        [response.reason, data.code].some(
          (item?: unknown, ..._extraArguments: unknown[]): Dynamic =>
            typeof item == `string` && dataOperationControlSet10.has(item),
        )
      )
        return true;
      let k10: Dynamic = (0, operationScope.refusalClass)()?.classify(
        response,
        {
          road: `mint`,
          verb: `create`,
          seated: (0,
          operationScope.loadDataOperationControlVerdictHandler26)(),
        },
      ).k;
      return k10 === `page_terminal` || k10 === `link_terminal`;
    },
    loadDataOperationControlVerdictHandler11: (
      ..._extraArguments: unknown[]
    ): undefined => {
      for (let loadDataOperationControlVerdictResult22 of [
        operationScope.loadDataOperationControlVerdictResult5,
        operationScope.loadDataOperationControlVerdictResult8,
      ] as Dynamic)
        if (loadDataOperationControlVerdictResult22 !== null) {
          operationScope.dataOperationControlVerdict.timers.clearTimeout(
            loadDataOperationControlVerdictResult22,
          );
        }
      operationScope.loadDataOperationControlVerdictResult5 = null;
      operationScope.loadDataOperationControlVerdictResult8 = null;
      operationScope.enabled8 = false;
      operationScope.enabled9 = false;
    },
    loadDataOperationControlVerdictHandler12: (
      ..._extraArguments: unknown[]
    ): undefined => {
      (0, operationScope.loadDataOperationControlVerdictHandler11)();
      for (let loadDataOperationControlVerdictResult22 of [
        operationScope.loadDataOperationControlVerdictResult6,
        operationScope.loadDataOperationControlVerdictResult7,
      ] as Dynamic)
        if (loadDataOperationControlVerdictResult22 !== null) {
          operationScope.dataOperationControlVerdict.timers.clearTimeout(
            loadDataOperationControlVerdictResult22,
          );
        }
      operationScope.loadDataOperationControlVerdictResult6 = null;
      operationScope.loadDataOperationControlVerdictResult7 = null;
      operationScope.enabled13 = false;
    },
    loadDataOperationControlVerdictHandler13: (..._extraArguments: unknown[]) =>
      operationScope.enabled10 ||
      operationScope.enabled7 ||
      (operationScope.loadDataOperationControlVerdictResult19 !== null &&
        !operationScope.enabled23),
    loadObservabilityTelemetryStatus2: (
      response?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      try {
        (0, operationScope.TELEMETRYATTRIBUTENAMES)(response, options, context);
        if (
          operationScope.enabled ||
          !operationScope.enabled4 ||
          options !== operationScope.asks
        )
          return;
        let matchesVerdict: Dynamic =
          response.verdict !== `allow` &&
          (0, operationScope.classify)(response);
        if (
          matchesVerdict !== operationScope.enabled11 &&
          (matchesVerdict || response.verdict === `allow`)
        ) {
          operationScope.enabled11 = matchesVerdict;
          (0, operationScope.loadDataOperationControlVerdictHandler11)();
        }
        if (response.verdict === `allow`) {
          operationScope.enabled13 = false;
        }
      } catch {
      } finally {
        (0, operationScope.loadDataOperationControlVerdictHandler15)();
        if (operationScope.enabled13 && operationScope.enabled11) {
          (0, operationScope.loadDataOperationControlVerdictHandler16)();
        }
      }
    },
    loadDataOperationControlVerdictHandler14: (
      ..._extraArguments: unknown[]
    ): undefined => {
      if (operationScope.loadDataOperationControlVerdictResult6 !== null) {
        operationScope.dataOperationControlVerdict.timers.clearTimeout(
          operationScope.loadDataOperationControlVerdictResult6,
        );
      }
      operationScope.loadDataOperationControlVerdictResult6 =
        operationScope.dataOperationControlVerdict.timers.setTimeout(
          (..._extraArguments: unknown[]): Dynamic => {
            operationScope.loadDataOperationControlVerdictResult6 = null;
            let enabled26 = operationScope.enabled9;
            let enabled27 = operationScope.enabled8;
            operationScope.enabled9 = false;
            operationScope.enabled8 = false;
            if (enabled26)
              return (0, operationScope.capsSettled5)() &&
                !(0, operationScope.loadDataOperationControlVerdictHandler13)()
                ? (0, operationScope.race3)(true)
                : (0,
                  operationScope.loadDataOperationControlVerdictHandler15)();
            if (enabled27) {
              (0, operationScope.race4)();
            }
          },
          DataOperationControlState6,
        );
    },
    race3: (
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      operationScope.enabled10 = true;
      if (dataOperationControlVerdict2) {
        operationScope.count4 += 1;
      }
      operationScope.enabled8 = false;
      operationScope.enabled9 = false;
      (0, operationScope.loadDataOperationControlVerdictHandler14)();
      operationScope.loadDataOperationControlVerdictResult3 = null;
      let loadDataOperationControlVerdictResult22: number =
        ++operationScope.asks;
      let loadObservabilityTelemetryStatus3 = (
        dataOperationControlVerdict3?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        operationScope.enabled10 = false;
        if (dataOperationControlVerdict3 === null) {
          (0, operationScope.loadDataOperationControlVerdictHandler15)();
        } else {
          (0, operationScope.loadObservabilityTelemetryStatus2)(
            dataOperationControlVerdict3,
            loadDataOperationControlVerdictResult22,
            false,
          );
        }
      };
      (0, operationScope.race2)(
        (
          dataOperationControlVerdict3?: Dynamic,
          ..._extraArguments: unknown[]
        ) =>
          (0, operationScope.loadObservabilityTelemetryStatus2)(
            dataOperationControlVerdict3,
            loadDataOperationControlVerdictResult22,
            true,
          ),
      ).rep.then(
        loadObservabilityTelemetryStatus3,
        (..._extraArguments: unknown[]) =>
          loadObservabilityTelemetryStatus3(null),
      );
    },
    resolveDataOperationControlRound5: (
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        !(
          operationScope.loadDataOperationControlVerdictResult5 !== null ||
          operationScope.enabled9 ||
          operationScope.enabled10 ||
          !(0, operationScope.capsSettled5)()
        )
      ) {
        operationScope.loadDataOperationControlVerdictResult5 =
          operationScope.dataOperationControlVerdict.timers.setTimeout(
            (..._extraArguments: unknown[]) => {
              operationScope.loadDataOperationControlVerdictResult5 = null;
              if ((0, operationScope.capsSettled5)()) {
                if (
                  (0, operationScope.loadDataOperationControlVerdictHandler13)()
                )
                  return (0,
                  operationScope.resolveDataOperationControlRound5)();
                if (
                  operationScope.loadDataOperationControlVerdictResult6 !== null
                )
                  return void (operationScope.enabled9 = true);
                (0, operationScope.race3)(true);
              }
            },
            Math.max(
              operationScope.count,
              resolveDataOperationControlRound(
                operationScope.enabled11
                  ? operationScope.total
                  : operationScope.count4 + 1,
                operationScope.dataOperationControlVerdict.random ??
                  ((..._extraArguments: unknown[]) => 1),
              ),
            ),
          );
      }
    },
    loadDataOperationControlVerdictHandler15: (
      ..._extraArguments: unknown[]
    ) =>
      (0, operationScope.capsSettled5)()
        ? (0, operationScope.resolveDataOperationControlRound5)()
        : (0, operationScope.loadDataOperationControlVerdictHandler11)(),
    race4: (..._extraArguments: unknown[]) => {
      if (!(!(0, operationScope.capsSettled5)() || operationScope.enabled11)) {
        if (operationScope.loadDataOperationControlVerdictResult6 !== null)
          return void (operationScope.enabled8 = true);
        if (
          !(
            (0, operationScope.loadDataOperationControlVerdictHandler13)() ||
            operationScope.loadDataOperationControlVerdictResult8 !== null
          )
        ) {
          if (operationScope.count <= 0)
            return (0, operationScope.race3)(false);
          operationScope.loadDataOperationControlVerdictResult8 =
            operationScope.dataOperationControlVerdict.timers.setTimeout(
              (..._extraArguments: unknown[]): undefined => {
                operationScope.loadDataOperationControlVerdictResult8 = null;
                if (
                  !(
                    !(0, operationScope.capsSettled5)() ||
                    operationScope.enabled11
                  )
                ) {
                  if (
                    operationScope.loadDataOperationControlVerdictResult6 !==
                    null
                  )
                    return void (operationScope.enabled8 = true);
                  if (
                    !(0,
                    operationScope.loadDataOperationControlVerdictHandler13)()
                  ) {
                    (0, operationScope.race3)(false);
                  }
                }
              },
              Math.max(operationScope.count, DataOperationControlState6),
            );
        }
      }
    },
    askFacts: (..._extraArguments: unknown[]): Dynamic =>
      (0, operationScope.race4)(),
    loadDataOperationControlVerdictHandler16: (
      ..._extraArguments: unknown[]
    ): undefined => {
      if (operationScope.enabled)
        return void (operationScope.enabled13 = false);
      if (operationScope.enabled10)
        return void (operationScope.enabled13 = true);
      if (operationScope.enabled11) {
        if (operationScope.loadDataOperationControlVerdictResult7 !== null)
          return void (operationScope.enabled13 = true);
        operationScope.enabled13 = false;
        operationScope.enabled11 = false;
        (0, operationScope.loadDataOperationControlVerdictHandler11)();
        operationScope.count4 = 0;
        operationScope.loadDataOperationControlVerdictResult7 =
          operationScope.dataOperationControlVerdict.timers.setTimeout(
            (..._extraArguments: unknown[]): undefined => {
              operationScope.loadDataOperationControlVerdictResult7 = null;
              if (operationScope.enabled13) {
                (0, operationScope.loadDataOperationControlVerdictHandler16)();
              }
            },
            dataOperationControlValue600002,
          );
        if (operationScope.enabled14) {
          (0, operationScope.loadDataOperationControlVerdictHandler14)();
        } else {
          (0, operationScope.race4)();
        }
        (0, operationScope.loadDataOperationControlVerdictHandler15)();
      }
    },
    floor: (
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      Math.max(
        options - 1,
        operationScope.loadDataOperationControlVerdictResult9 !== null &&
          operationScope.loadDataOperationControlVerdictResult9.label ===
            dataOperationControlVerdict2
          ? operationScope.loadDataOperationControlVerdictResult9.hwm
          : -1,
        operationScope.dataOperationControlVerdict.session.floor?.(
          dataOperationControlVerdict2,
        ) ?? -1,
      ),
    pump: (
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        operationScope.enabled21 ||
        operationScope.enabled ||
        typeof dataOperationControlVerdict2.sess != `string` ||
        dataOperationControlVerdict2.sess === `` ||
        typeof dataOperationControlVerdict2.sessSecret != `string`
      )
        return;
      let next: Dynamic =
        isPlainRecord(dataOperationControlVerdict2.data) &&
        typeof dataOperationControlVerdict2.data.next == `number`
          ? dataOperationControlVerdict2.data.next
          : 0;
      if (
        isPlainRecord(dataOperationControlVerdict2.data) &&
        Array.isArray(dataOperationControlVerdict2.data.accepts)
      ) {
        operationScope.items = dataOperationControlVerdict2.data.accepts.filter(
          (accept?: unknown, ..._extraArguments: unknown[]) =>
            typeof accept == `string`,
        );
      }
      let label5: Dynamic =
        operationScope.dataOperationControlVerdict.session.get()?.label ??
        operationScope.loadDataOperationControlVerdictResult17;
      operationScope.enabled21 = true;
      operationScope.count8 = 0;
      operationScope.count9 = 0;
      operationScope.loadDataOperationControlVerdictResult17 = undefined;
      let hwm: Dynamic = (0, operationScope.floor)(
        dataOperationControlVerdict2.sess,
        next,
      );
      operationScope.dataOperationControlVerdict.session.set({
        label: dataOperationControlVerdict2.sess,
        secret: dataOperationControlVerdict2.sessSecret,
        hwm: hwm,
      });
      (0, operationScope.rekeyHolds)(dataOperationControlVerdict2.sess, hwm);
      if (
        label5 !== undefined &&
        label5 !== dataOperationControlVerdict2.sess
      ) {
        (0, operationScope.rekeyHolds3)(label5);
      }
      (0, operationScope.rekeyHolds4)();
      for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
        loadDataOperationControlVerdictResult22.toldHwm = null;
      (0, operationScope.emit8)();
      reportOperationEvent(`session.late`, {
        late: operationScope.late,
        next: next,
      });
      (0, operationScope.emit7)();
      for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
        loadDataOperationControlVerdictResult22.pump();
    },
  };
}
