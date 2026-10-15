/** BaoCut: operation controller capabilities. */
import type { Dynamic } from "./types";
import type { OperationControllerScope } from "./type-models/platform-core-operation";
export function createOperationCapabilities(
  operationScope: Pick<
    OperationControllerScope,
    | "loadDataOperationControlVerdictHandler2"
    | "dataOperationControlVerdict"
    | "record3"
    | "enabled3"
    | "loadDataOperationControlVerdictHandler4"
    | "honourOpsOnFeed"
    | "loadDataOperationControlVerdictHandler5"
  >,
) {
  return {
    loadDataOperationControlVerdictHandler2: (
      dataOperationControlVerdict2?: unknown,
      ..._extraArguments: unknown[]
    ) =>
      dataOperationControlVerdict2 === true ||
      (typeof dataOperationControlVerdict2 == `number` &&
        dataOperationControlVerdict2 >= 1) ||
      dataOperationControlVerdict2 === `1`,
    loadDataOperationControlVerdictHandler3: (
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (0, operationScope.loadDataOperationControlVerdictHandler2)(
        operationScope.dataOperationControlVerdict.caps?.[
          dataOperationControlVerdict2
        ],
      ) ||
      (0, operationScope.loadDataOperationControlVerdictHandler2)(
        operationScope.record3[dataOperationControlVerdict2],
      ),
    loadDataOperationControlVerdictHandler4: (
      ..._extraArguments: unknown[]
    ): Dynamic =>
      !operationScope.enabled3 &&
      ((0, operationScope.loadDataOperationControlVerdictHandler2)(
        operationScope.dataOperationControlVerdict.caps?.oneOrder,
      ) ||
        (0, operationScope.loadDataOperationControlVerdictHandler2)(
          operationScope.record3.oneOrder,
        )),
    capsSettled: (..._extraArguments: unknown[]) =>
      operationScope.enabled3 ||
      (!(0, operationScope.loadDataOperationControlVerdictHandler4)() &&
        operationScope.dataOperationControlVerdict.capsSettled?.() === true),
    capsSettled2: (..._extraArguments: unknown[]): Dynamic =>
      (0, operationScope.loadDataOperationControlVerdictHandler2)(
        operationScope.dataOperationControlVerdict.caps?.stream,
      ) ||
      (0, operationScope.loadDataOperationControlVerdictHandler2)(
        operationScope.record3.stream,
      ) ||
      !(
        operationScope.dataOperationControlVerdict.capsSettled?.() === true ||
        Object.keys(operationScope.record3).length > 0
      ),
    honourOpsOnFeed: (..._extraArguments: unknown[]): Dynamic =>
      operationScope.dataOperationControlVerdict.honourOpsOnFeed?.() !==
        false &&
      ((0, operationScope.loadDataOperationControlVerdictHandler2)(
        operationScope.dataOperationControlVerdict.caps?.opsOnFeed,
      ) ||
        (0, operationScope.loadDataOperationControlVerdictHandler2)(
          operationScope.record3.opsOnFeed,
        )),
    loadDataOperationControlVerdictHandler5: (
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let filteredMappedItems = [
        operationScope.dataOperationControlVerdict.caps?.[
          dataOperationControlVerdict2
        ],
        operationScope.record3[dataOperationControlVerdict2],
      ]
        .map((item?: Dynamic, ..._extraArguments: unknown[]) =>
          item === true ? 1 : Number(item),
        )
        .filter((mappedItem?: Dynamic, ..._extraArguments: unknown[]) =>
          Number.isFinite(mappedItem),
        );
      return filteredMappedItems.length > 0
        ? (Math.max as Dynamic)(...filteredMappedItems)
        : 0;
    },
    loadDataOperationControlVerdictHandler6: (
      ..._extraArguments: unknown[]
    ): Dynamic =>
      (0, operationScope.honourOpsOnFeed)() &&
      (0, operationScope.loadDataOperationControlVerdictHandler5)(
        `atRevPaging`,
      ) >= 2,
  };
}
