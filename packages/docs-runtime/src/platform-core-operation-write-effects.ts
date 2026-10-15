/** BaoCut: operation controller write effects. */
import type { Dynamic } from "./types";
import type { OperationControllerScope } from "./type-models/platform-core-operation";
import { resolveEditorExtensionsTrim } from "./platform-core-editor-extensions-2";
import {
  collectDataOperationControlValue,
  resolveDataOperationControlEvery,
  resolveDataOperationControlForEach,
  resolveDataOperationControlMinted3,
  resolveDataOperationControlValue17,
} from "./platform-core-data-operation-control-1";
import {
  dataOperationControlSet13,
  dataOperationControlSet14,
  dataOperationControlSet15,
  dataOperationControlSet16,
  dataOperationControlValue256,
  isPlainRecord,
  resolveDataOperationControlAnchorGone,
  resolveDataOperationControlFlatMap2,
} from "./platform-core-data-operation-control-4";
export function deriveWriteEffects(
  this: Dynamic,
  operationScope: Pick<OperationControllerScope, "judged">,
  flyScope: {
    data2: Dynamic;
    loadDataOperationControlVerdictResult22: Dynamic;
    record4: Dynamic;
    rep2: Dynamic;
    dataOperationControlVerdict2: Dynamic;
    predicted: Dynamic;
    record5: Dynamic;
    state2: Dynamic;
  },
): Dynamic {
  let dataOperationControlEvery: Dynamic = resolveDataOperationControlEvery(
    collectDataOperationControlValue(
      Array.isArray(flyScope.data2.results) ? flyScope.data2.results : [],
    ),
    flyScope.loadDataOperationControlVerdictResult22.from,
    flyScope.record4.ops.length,
  );
  let uniqueItems7: Dynamic = new (Set as Dynamic)(
    flyScope.rep2.verdict === `allow`
      ? resolveDataOperationControlForEach(
          Array.isArray(flyScope.data2.results) ? flyScope.data2.results : [],
          flyScope.loadDataOperationControlVerdictResult22.from,
          flyScope.record4.ops.length,
        )
      : [],
  );
  let mappedDataOperationControlEvery: Dynamic = dataOperationControlEvery.map(
    (
      dataOperationControlEvery2?: Dynamic,
      index5?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      if (
        flyScope.rep2.verdict !== `allow` ||
        !flyScope.dataOperationControlVerdict2.editorSaid ||
        uniqueItems7.has(index5) ||
        (isPlainRecord(dataOperationControlEvery2) &&
          dataOperationControlEvery2.changed === false)
      )
        return dataOperationControlEvery2;
      let [minted, setMinted]: Dynamic = [
        flyScope.predicted[index5] ?? [],
        flyScope.dataOperationControlVerdict2.editorSaid[
          flyScope.record4.kStart + index5
        ] ?? [],
      ];
      return minted.length === 0 ||
        resolveDataOperationControlFlatMap2(dataOperationControlEvery2?.minted)
          .length > 0 ||
        (minted.length === setMinted.length &&
          minted.every(
            (
              minted2?: Dynamic,
              index6?: Dynamic,
              ..._extraArguments: unknown[]
            ) => minted2 === setMinted[index6],
          ))
        ? dataOperationControlEvery2
        : Object.assign(
            {},
            isPlainRecord(dataOperationControlEvery2)
              ? dataOperationControlEvery2
              : {},
            {
              minted: minted,
            },
          );
    },
  );
  let filteredFlat: Dynamic = [
    flyScope.rep2.notes,
    flyScope.data2.notes,
    flyScope.rep2.notices,
    flyScope.data2.notices,
  ]
    .flat()
    .filter(isPlainRecord);
  let resolveDataOperationControlMinted32: Dynamic = (
    dataOperationControlVerdict3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    isPlainRecord(flyScope.record4.ops[dataOperationControlVerdict3]) &&
    flyScope.record4.ops[dataOperationControlVerdict3].each === true &&
    resolveDataOperationControlMinted3(
      dataOperationControlEvery[dataOperationControlVerdict3],
    );
  let uniqueItems8: Dynamic = new (Set as Dynamic)(
    filteredFlat.flatMap(
      (error?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        if (
          !(
            dataOperationControlSet13.has(String(error.code)) &&
            error.rehomed !== true &&
            typeof error.opIndex == `number` &&
            error.opIndex >= 0 &&
            error.opIndex <
              flyScope.loadDataOperationControlVerdictResult22.from.length
          )
        )
          return [];
        let dataOperationControlValue17: Dynamic =
          resolveDataOperationControlValue17(
            flyScope.loadDataOperationControlVerdictResult22.from,
            error.opIndex,
          );
        return resolveDataOperationControlMinted32(dataOperationControlValue17)
          ? []
          : [dataOperationControlValue17];
      },
    ),
  );
  let some: Dynamic = dataOperationControlEvery.some(
    (
      dataOperationControlEvery2?: Dynamic,
      index5?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      !uniqueItems8.has(index5) &&
      resolveDataOperationControlMinted3(dataOperationControlEvery2),
  );
  let some2: Dynamic = mappedDataOperationControlEvery.some(
    (
      mappedDataOperationControlEvery3?: Dynamic,
      index5?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      !uniqueItems8.has(index5) &&
      resolveDataOperationControlMinted3(mappedDataOperationControlEvery3),
  );
  let uniqueItems9: Dynamic = new (Set as Dynamic)();
  let flatMap: Dynamic = filteredFlat.flatMap(
    (error?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      if (!dataOperationControlSet16.has(String(error.code))) return [];
      let stringify = JSON.stringify(error);
      return uniqueItems9.has(stringify)
        ? []
        : (uniqueItems9.add(stringify),
          typeof error.opIndex == `number` &&
          error.opIndex >= 0 &&
          error.opIndex <
            flyScope.loadDataOperationControlVerdictResult22.from.length
            ? [
                {
                  ...error,
                  opIndex:
                    flyScope.record4.kStart +
                    resolveDataOperationControlValue17(
                      flyScope.loadDataOperationControlVerdictResult22.from,
                      error.opIndex,
                    ),
                },
              ]
            : [error]);
    },
  );
  for (let error of filteredFlat as Dynamic)
    if (
      (error.code === `anchor_gone` || error.code === `anchor_dead`) &&
      error.rehomed !== true &&
      typeof error.opIndex == `number` &&
      error.opIndex >= 0 &&
      error.opIndex <
        flyScope.loadDataOperationControlVerdictResult22.from.length &&
      uniqueItems8.has(
        resolveDataOperationControlValue17(
          flyScope.loadDataOperationControlVerdictResult22.from,
          error.opIndex,
        ),
      )
    ) {
      flatMap.push({
        code: `block_dead`,
        ids: error.ids,
        opIndex:
          flyScope.record4.kStart +
          resolveDataOperationControlValue17(
            flyScope.loadDataOperationControlVerdictResult22.from,
            error.opIndex,
          ),
        buried: true,
      });
    }
  if (flatMap.length > 0) {
    ((flyScope.dataOperationControlVerdict2.notices ??= []).push as Dynamic)(
      ...flatMap,
    );
  }
  if (flyScope.rep2.verdict === `allow`)
    for (let operation of (Array.isArray(flyScope.data2.filled)
      ? flyScope.data2.filled
      : Array.isArray(flyScope.rep2.filled)
        ? flyScope.rep2.filled
        : []
    ).slice(0, dataOperationControlValue256) as Dynamic) {
      let label6 =
        isPlainRecord(operation) &&
        typeof operation.ref == `string` &&
        operation.ref !== ``
          ? resolveEditorExtensionsTrim(operation.label)
          : null;
      if (
        label6 !== null &&
        isPlainRecord(operation) &&
        typeof operation.op == `number` &&
        Number.isInteger(operation.op) &&
        operation.op >= 0 &&
        operation.op <
          flyScope.loadDataOperationControlVerdictResult22.from.length
      ) {
        (flyScope.dataOperationControlVerdict2.filled ??= []).push({
          op:
            flyScope.record4.kStart +
            resolveDataOperationControlValue17(
              flyScope.loadDataOperationControlVerdictResult22.from,
              operation.op,
            ),
          ref: operation.ref,
          label: label6,
        });
      }
    }
  let some3: Dynamic = flyScope.record4.ops.some(
    (operation?: Dynamic, ..._extraArguments: unknown[]) =>
      operation.op === `insert` || operation.op === `replace`,
  );
  let resolveDataOperationControlAnchorGone2: Dynamic = (
    error?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    (error.code === `block_dead` || error.code === `already_gone`) &&
    !resolveDataOperationControlAnchorGone(error) &&
    Array.isArray(error.ids);
  let gone: Dynamic = filteredFlat.find(
    (error?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      dataOperationControlSet15.has(String(error.code)) ||
      ((error.code === `anchor_gone` || error.code === `anchor_dead`) &&
        error.rehomed !== true) ||
      resolveDataOperationControlAnchorGone2(error),
  );
  let some4: Dynamic = filteredFlat.some(resolveDataOperationControlAnchorGone);
  let replayed2: Dynamic =
    flyScope.dataOperationControlVerdict2.replayed ||
    flyScope.dataOperationControlVerdict2.lost === true ||
    flyScope.dataOperationControlVerdict2.tries > 0;
  let resolveDataOperationControlMinted33: Dynamic = (
    dataOperationControlVerdict3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    typeof dataOperationControlVerdict3.opIndex == `number` &&
    dataOperationControlVerdict3.opIndex >= 0 &&
    dataOperationControlVerdict3.opIndex <
      flyScope.loadDataOperationControlVerdictResult22.from.length &&
    resolveDataOperationControlMinted32(
      resolveDataOperationControlValue17(
        flyScope.loadDataOperationControlVerdictResult22.from,
        dataOperationControlVerdict3.opIndex,
      ),
    );
  let matchesChanged: Dynamic =
    flyScope.data2.changed === false ||
    flyScope.rep2.changed === false ||
    filteredFlat.some(
      (error?: Dynamic, ..._extraArguments: unknown[]) =>
        error.code === `no_op` && !resolveDataOperationControlMinted33(error),
    );
  let some5: Dynamic = dataOperationControlEvery.some(
    (
      dataOperationControlEvery2?: Dynamic,
      index5?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      isPlainRecord(dataOperationControlEvery2) &&
      dataOperationControlEvery2.changed === false &&
      [`insert`, `replace`].includes(String(flyScope.record4.ops[index5]?.op)),
  );
  let matchesVerdict2: Dynamic =
    flyScope.rep2.verdict === `allow` &&
    flyScope.rep2.replayed !== true &&
    some3 &&
    !some &&
    !some4 &&
    (gone !== undefined || some5 || (matchesChanged && !replayed2));
  let enabled29: Dynamic =
    (!some2 && !some4) ||
    filteredFlat.some(
      (error?: Dynamic, ..._extraArguments: unknown[]) =>
        error.code === `unchanged`,
    );
  let matchesChanged2: Dynamic = matchesChanged && !matchesVerdict2;
  let matchesChanged3: Dynamic =
    matchesChanged2 &&
    flyScope.rep2.verdict === `allow` &&
    flyScope.rep2.replayed !== true &&
    !replayed2 &&
    !some3 &&
    !some &&
    !some4 &&
    flyScope.record4.ops.length > 0 &&
    flyScope.record4.ops.every(
      (operation?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        dataOperationControlSet14.has(String(operation.op)),
    );
  let matchesVerdict3: Dynamic =
    flyScope.rep2.verdict === `allow` &&
    flyScope.rep2.replayed !== true &&
    !matchesChanged2 &&
    ((enabled29 && flyScope.predicted.flat().length > 0) || matchesVerdict2);
  if (flyScope.rep2.verdict === `allow` && !matchesVerdict3) {
    (0, operationScope.judged)(
      flyScope.record5,
      flyScope.rep2,
      `landed`,
      (0, flyScope.state2)(),
    );
  }
  return {
    dataOperationControlEvery,
    uniqueItems7,
    mappedDataOperationControlEvery,
    filteredFlat,
    uniqueItems8,
    gone,
    matchesVerdict2,
    matchesChanged2,
    matchesChanged3,
    matchesVerdict3,
  };
}
