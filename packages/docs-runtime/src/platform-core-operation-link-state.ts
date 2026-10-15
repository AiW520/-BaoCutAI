/** BaoCut: operation controller link state. */
import type { Dynamic } from "./types";
import type { OperationControllerScope } from "./type-models/platform-core-operation";
import { resolveDataOperationControlValue24 } from "./platform-core-data-operation-control-2";
import {
  isPlainRecord,
  resolveDataOperationControlSure,
} from "./platform-core-data-operation-control-4";
export function createOperationLinkState(
  operationScope: Pick<
    OperationControllerScope,
    | "label"
    | "dataOperationControlVerdict"
    | "record3"
    | "capsSettled3"
    | "enabled6"
    | "enabled"
    | "count2"
    | "late"
    | "now"
    | "answerMs"
    | "join"
    | "loadDataOperationControlVerdictHandler2"
    | "enabled3"
    | "pump2"
    | "lookup"
    | "emit8"
    | "enabled5"
    | "loadDataOperationControlVerdictResult4"
    | "enabled7"
    | "loadDataOperationControlVerdictResult10"
    | "capsSettled4"
    | "count3"
    | "loadDataOperationControlVerdictResult19"
    | "enabled23"
    | "enabled10"
    | "capsSettled5"
    | "resolveDataOperationControlValue242"
    | "asks"
    | "race2"
    | "TELEMETRYATTRIBUTENAMES2"
    | "TELEMETRYATTRIBUTENAMES"
    | "count"
    | "roadMoved"
    | "loadDataOperationControlVerdictHandler10"
    | "enabled24"
    | "emit2"
    | "pump"
    | "enabled21"
    | "test"
    | "info"
  >,
) {
  return {
    loadDataOperationControlVerdictHandler10: (
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        !(
          dataOperationControlVerdict2 === `no_answer` &&
          (operationScope.label === `refused` ||
            operationScope.label === `caps_absent`)
        )
      ) {
        operationScope.label = dataOperationControlVerdict2;
      }
    },
    capsSettled3: (..._extraArguments: unknown[]) =>
      operationScope.dataOperationControlVerdict.capsSettled?.() === true ||
      Object.keys(operationScope.record3).length > 0,
    capsSettled4: (..._extraArguments: unknown[]) =>
      !(0, operationScope.capsSettled3)() &&
      !operationScope.enabled6 &&
      operationScope.dataOperationControlVerdict.capsSettled?.() === false,
    roadMoved: (
      response?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ) => {
      if (
        operationScope.enabled ||
        ((response.verdict === `allow` || response.verdict === `deny`) &&
          (operationScope.enabled6 = true),
        options < operationScope.count2 || !isPlainRecord(response.data))
      )
        return false;
      let caps2: Dynamic = isPlainRecord(response.data.caps)
        ? response.data.caps
        : null;
      let flags: Dynamic = isPlainRecord(response.data.flags)
        ? response.data.flags
        : null;
      if (caps2 === null && flags === null) return false;
      operationScope.count2 = options;
      operationScope.late = context;
      if (
        operationScope.dataOperationControlVerdict.now &&
        operationScope.now !== undefined
      ) {
        operationScope.answerMs = Math.max(
          0,
          Math.round(
            operationScope.dataOperationControlVerdict.now() -
              operationScope.now,
          ),
        );
      }
      if (caps2 !== null) {
        let contentText = (0, operationScope.join)();
        operationScope.record3 = caps2;
        if (
          (0, operationScope.loadDataOperationControlVerdictHandler2)(
            operationScope.record3.oneOrder,
          )
        ) {
          operationScope.enabled3 = false;
        }
        (0, operationScope.pump2)();
        operationScope.dataOperationControlVerdict.onLawFacts?.(caps2);
        if ((0, operationScope.join)() !== contentText) {
          for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
            loadDataOperationControlVerdictResult22.toldHwm = null;
          (0, operationScope.emit8)();
        }
      }
      if (flags !== null) {
        operationScope.enabled5 = true;
        operationScope.dataOperationControlVerdict.onServerFlags?.(
          Object.fromEntries(
            Object.entries(flags).filter(
              (flagsEntry?: Dynamic, ..._extraArguments: unknown[]) =>
                typeof flagsEntry[1] == `boolean`,
            ),
          ),
        );
      }
      if (caps2 !== null)
        for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
          loadDataOperationControlVerdictResult22.roadMoved();
      return true;
    },
    resolveDataOperationControlValue242: (
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        !(
          operationScope.loadDataOperationControlVerdictResult4 !== null ||
          operationScope.enabled7 ||
          operationScope.enabled ||
          operationScope.loadDataOperationControlVerdictResult10 !== null ||
          !(0, operationScope.capsSettled4)()
        )
      ) {
        operationScope.count3 += 1;
        operationScope.loadDataOperationControlVerdictResult4 =
          operationScope.dataOperationControlVerdict.timers.setTimeout(
            (..._extraArguments: unknown[]): undefined => {
              operationScope.loadDataOperationControlVerdictResult4 = null;
              if (
                operationScope.enabled ||
                operationScope.loadDataOperationControlVerdictResult10 !==
                  null ||
                !(0, operationScope.capsSettled4)()
              )
                return;
              if (
                (operationScope.loadDataOperationControlVerdictResult19 !==
                  null &&
                  !operationScope.enabled23) ||
                operationScope.enabled10 ||
                (0, operationScope.capsSettled5)()
              )
                return void (0,
                operationScope.resolveDataOperationControlValue242)();
              operationScope.enabled7 = true;
              let loadDataOperationControlVerdictResult22: Dynamic =
                ++operationScope.asks;
              (0, operationScope.race2)(
                (
                  dataOperationControlVerdict2?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  (0, operationScope.TELEMETRYATTRIBUTENAMES2)(
                    dataOperationControlVerdict2,
                    loadDataOperationControlVerdictResult22,
                  ),
              ).rep.then(
                (
                  response?: Dynamic,
                  ..._extraArguments: unknown[]
                ): undefined => {
                  operationScope.enabled7 = false;
                  (0, operationScope.TELEMETRYATTRIBUTENAMES)(
                    response,
                    loadDataOperationControlVerdictResult22,
                    false,
                  );
                  if (
                    !operationScope.enabled &&
                    response.verdict === `unreachable` &&
                    resolveDataOperationControlSure(response) === null
                  ) {
                    (0, operationScope.resolveDataOperationControlValue242)();
                  }
                },
                (..._extraArguments: unknown[]): undefined =>
                  void (operationScope.enabled7 = false),
              );
            },
            Math.max(
              operationScope.count,
              resolveDataOperationControlValue24(
                operationScope.count3,
                operationScope.dataOperationControlVerdict.random ??
                  ((..._extraArguments: unknown[]) => 1),
              ),
            ),
          );
      }
    },
    TELEMETRYATTRIBUTENAMES: (
      response?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (!operationScope.enabled) {
        (0, operationScope.roadMoved)(response, options, context);
        if (!(options < operationScope.count2)) {
          if (response.verdict === `unreachable`) {
            (0, operationScope.loadDataOperationControlVerdictHandler10)(
              `no_answer`,
            );
          } else {
            if (resolveDataOperationControlSure(response) === null) {
              if (response.verdict === `allow`) {
                (0, operationScope.loadDataOperationControlVerdictHandler10)(
                  `caps_absent`,
                );
                operationScope.enabled24 = true;
                (0, operationScope.emit2)(false);
                (0, operationScope.pump)(response);
              } else {
                (0, operationScope.loadDataOperationControlVerdictHandler10)(
                  `refused`,
                );
                if (
                  !operationScope.enabled21 &&
                  (0, operationScope.test)(response)
                ) {
                  (0, operationScope.emit2)(true);
                }
              }
            } else {
              (0, operationScope.loadDataOperationControlVerdictHandler10)(
                `no_answer`,
              );
            }
          }
          (0, operationScope.info)();
        }
      }
    },
    TELEMETRYATTRIBUTENAMES2: (
      dataOperationControlVerdict2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      (0, operationScope.TELEMETRYATTRIBUTENAMES)(
        dataOperationControlVerdict2,
        options,
        true,
      ),
  };
}
