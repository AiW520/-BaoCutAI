/** BaoCut: operation controller status. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import type { OperationControllerScope } from "./controller-contracts";
import { emitTelemetryEvent } from "../observability/telemetry-3";
import { reportOperationEvent } from "../observability/boot";
import {
  DataOperationControlAccess,
  DataOperationControlMessage10,
  DataOperationControlPageGone,
  DataOperationControlWhy2,
  resolveDataOperationControlWhy,
} from "../data/operation-control-2";
export function createOperationStatus(
  operationScope: Pick<
    OperationControllerScope,
    | "enabled"
    | "loadDataOperationControlVerdictHandler2"
    | "dataOperationControlVerdict"
    | "record3"
    | "honourOpsOnFeed"
    | "enabled3"
    | "capsSettled3"
    | "label"
    | "label2"
    | "enabled5"
    | "late"
    | "life"
    | "asks"
    | "answerMs"
    | "lookup"
    | "loadDataOperationControlVerdictHandler4"
    | "capsSettled"
    | "enabled4"
    | "enabled11"
    | "enabled13"
    | "loadDataOperationControlVerdictHandler15"
    | "state"
    | "emit7"
    | "loadDataOperationControlVerdictResult10"
    | "enabled14"
    | "loadDataOperationControlVerdictHandler17"
    | "enabled12"
    | "resolveDataOperationControlWhy2"
    | "resolveDataOperationControlWhy3"
    | "loadDataOperationControlVerdictResult11"
    | "loadDataOperationControlVerdictHandler12"
    | "loadDataOperationControlVerdictResult12"
  >,
) {
  return {
    info: (..._extraArguments: unknown[]): undefined => {
      if (operationScope.enabled) return;
      let dataOperationControlVerdictHandler: Dynamic =
        (0, operationScope.loadDataOperationControlVerdictHandler2)(
          operationScope.dataOperationControlVerdict.caps?.opsOnFeed,
        ) ||
        (0, operationScope.loadDataOperationControlVerdictHandler2)(
          operationScope.record3.opsOnFeed,
        );
      let honour =
        operationScope.dataOperationControlVerdict.honourOpsOnFeed === undefined
          ? `absent`
          : operationScope.dataOperationControlVerdict.honourOpsOnFeed() ===
              false
            ? `false`
            : `true`;
      let road = (0, operationScope.honourOpsOnFeed)() ? `ops` : `legacy`;
      let why: Dynamic = dataOperationControlVerdictHandler
        ? honour === `false`
          ? `flag_killed`
          : `caps`
        : operationScope.enabled3
          ? `interlock`
          : (0, operationScope.capsSettled3)()
            ? `caps_absent`
            : operationScope.label;
      let key = `${road}|${why}`;
      if (key === operationScope.label2) return;
      operationScope.label2 = key;
      let record4: Dynamic = {
        road: road,
        why: why,
        capsSeen:
          Object.keys(operationScope.record3).length > 0
            ? `sess`
            : operationScope.dataOperationControlVerdict.capsSettled?.() ===
                true
              ? `env`
              : `none`,
        flagsSeen: operationScope.enabled5 ? `sess` : `none`,
        honour: honour,
        late: operationScope.late,
        life: operationScope.life,
        asks: operationScope.asks,
        answerMs: operationScope.answerMs,
        node: operationScope.lookup.keys().next().value ?? ``,
        links: operationScope.lookup.size,
      };
      console.info(
        `opTransport: feed road = ${road} (${why}) — caps ${record4.capsSeen}, flags ${record4.flagsSeen}, honour ${honour}${operationScope.late ? `, late answer` : ``}, life ${operationScope.life}, asks ${operationScope.asks}, answer ${operationScope.answerMs} ms`,
      );
      for (let loadDataOperationControlVerdictResult22 of [
        (..._extraArguments: unknown[]): Dynamic =>
          operationScope.dataOperationControlVerdict.onRoad?.(record4),
        (..._extraArguments: unknown[]) =>
          emitTelemetryEvent({
            name: `pages.link.road`,
            key: key,
            fields: {
              feedRoad: road,
              why: why,
              capsSeen: record4.capsSeen,
              flagsSeen: record4.flagsSeen,
              honour: honour,
              late: operationScope.late,
              life: operationScope.life,
              asks: operationScope.asks,
              answerMs: operationScope.answerMs,
              node: record4.node,
              links: record4.links,
            },
          }),
      ] as Dynamic)
        try {
          loadDataOperationControlVerdictResult22();
        } catch {}
    },
    capsSettled6: (..._extraArguments: unknown[]) =>
      !(0, operationScope.loadDataOperationControlVerdictHandler4)() &&
      !(0, operationScope.capsSettled)() &&
      operationScope.dataOperationControlVerdict.capsSettled !== undefined &&
      operationScope.dataOperationControlVerdict.capsSettled() === null,
    emit: (..._extraArguments: unknown[]): undefined => {
      let waiting: Dynamic = (0, operationScope.capsSettled)();
      if (waiting !== operationScope.enabled4) {
        operationScope.enabled4 = waiting;
        operationScope.enabled11 = false;
        operationScope.enabled13 = false;
        (0, operationScope.loadDataOperationControlVerdictHandler15)();
        console.info(
          waiting
            ? `opTransport: the door reached does not speak one order — read-only, nothing is sent until it does`
            : `opTransport: the door speaks one order — editing resumes`,
        );
        for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
          loadDataOperationControlVerdictResult22.emit({
            t: `state`,
            node: loadDataOperationControlVerdictResult22.node,
            state:
              waiting || !loadDataOperationControlVerdictResult22.served
                ? `readonly`
                : (0, operationScope.state)(),
            words: waiting ? DataOperationControlMessage10 : undefined,
            waiting: waiting,
          });
        (0, operationScope.emit7)();
      }
    },
    loadDataOperationControlVerdictHandler17: (
      node?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      t: `state`,
      node: node,
      state: `readonly`,
      words: DataOperationControlAccess,
      viewOnly: true,
    }),
    emit2: (
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        !(
          dataOperationControlVerdict2 &&
          operationScope.loadDataOperationControlVerdictResult10 !== null
        )
      ) {
        if (dataOperationControlVerdict2 === operationScope.enabled14) {
          if (dataOperationControlVerdict2)
            for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
              loadDataOperationControlVerdictResult22.emit(
                (0, operationScope.loadDataOperationControlVerdictHandler17)(
                  loadDataOperationControlVerdictResult22.node,
                ),
              );
          return;
        }
        operationScope.enabled14 = dataOperationControlVerdict2;
        if (!dataOperationControlVerdict2) {
          operationScope.enabled12 = false;
        }
        (0, operationScope.loadDataOperationControlVerdictHandler15)();
        console.info(
          dataOperationControlVerdict2
            ? `opTransport: the door refused this viewer a session for access — the document is shown read-only`
            : `opTransport: a session was granted — editing resumes`,
        );
        for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
          loadDataOperationControlVerdictResult22.emit(
            dataOperationControlVerdict2
              ? (0, operationScope.loadDataOperationControlVerdictHandler17)(
                  loadDataOperationControlVerdictResult22.node,
                )
              : {
                  t: `state`,
                  node: loadDataOperationControlVerdictResult22.node,
                  state: (0, operationScope.state)(),
                },
          );
        (0, operationScope.emit7)();
      }
    },
    resolveDataOperationControlWhy2: (
      ..._extraArguments: unknown[]
    ): Dynamic =>
      operationScope.loadDataOperationControlVerdictResult10 === `unreached`
        ? DataOperationControlWhy2
        : operationScope.loadDataOperationControlVerdictResult10 ===
              `not_governed` ||
            operationScope.loadDataOperationControlVerdictResult10 === `cmek`
          ? resolveDataOperationControlWhy(
              operationScope.loadDataOperationControlVerdictResult10,
            )
          : DataOperationControlPageGone,
    resolveDataOperationControlWhy3: (
      node?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      t: `state`,
      node: node,
      state: `readonly`,
      words: (0, operationScope.resolveDataOperationControlWhy2)(),
      pageGone: true,
    }),
    resolveDataOperationControlWhy4: (
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      verdict: `deny`,
      reason: `page_gone`,
      status: 410,
      detail: (0, operationScope.resolveDataOperationControlWhy2)(),
      data: {
        code: `page_gone`,
        why:
          operationScope.loadDataOperationControlVerdictResult10 ?? `deleted`,
        layer: `link`,
      },
    }),
    pageStopped: (
      kind2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        !(
          operationScope.loadDataOperationControlVerdictResult10 !== null ||
          operationScope.enabled
        )
      ) {
        operationScope.loadDataOperationControlVerdictResult10 = kind2;
        console.info(
          kind2 === `deleted`
            ? `opTransport: the door holds no such page for a write of a page this tab had open — it was deleted; read-only, nothing more is sent`
            : kind2 === `unreached`
              ? `opTransport: the page never answered in 10 sends — read-only, nothing more is sent`
              : `opTransport: the door refused this page for the document it is shown in (forbidden/${kind2}) — read-only, nothing more is sent`,
        );
        for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
          loadDataOperationControlVerdictResult22.emit(
            (0, operationScope.resolveDataOperationControlWhy3)(
              loadDataOperationControlVerdictResult22.node,
            ),
          );
        if (operationScope.loadDataOperationControlVerdictResult11 !== null) {
          operationScope.dataOperationControlVerdict.timers.clearTimeout(
            operationScope.loadDataOperationControlVerdictResult11,
          );
        }
        operationScope.loadDataOperationControlVerdictResult11 = null;
        (0, operationScope.loadDataOperationControlVerdictHandler12)();
        operationScope.loadDataOperationControlVerdictResult12 = null;
        for (let loadDataOperationControlVerdictResult22 of operationScope.lookup.values() as Dynamic)
          loadDataOperationControlVerdictResult22.pageStopped();
        reportOperationEvent(`link.stopped`, {
          why: `page_gone`,
          kind: kind2,
          links: operationScope.lookup.size,
        });
        (0, operationScope.emit7)();
      }
    },
  };
}
