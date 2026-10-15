/** BaoCut: operation controller recovery. */
import type { Dynamic } from "./types";
import type { OperationControllerScope } from "./type-models/platform-core-operation";
export function createOperationRecovery(
  operationScope: Pick<
    OperationControllerScope,
    | "loadDataOperationControlVerdictResult19"
    | "enabled23"
    | "loadDataOperationControlVerdictResult3"
    | "loadDataOperationControlVerdictHandler29"
    | "lookup"
  >,
) {
  return {
    ObservabilityTelemetryState122: (
      ..._extraArguments: unknown[]
    ): undefined => {
      operationScope.loadDataOperationControlVerdictResult19 = null;
      operationScope.enabled23 = false;
      operationScope.loadDataOperationControlVerdictResult3 = null;
      (0, operationScope.loadDataOperationControlVerdictHandler29)().then(
        (..._extraArguments: unknown[]): Dynamic =>
          operationScope.lookup.forEach(
            (lookup3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              lookup3.pump(),
          ),
      );
    },
  };
}
