import {
  collectPlatformLiveDocumentAndHistoryAutoLift,
  filterPlatformLiveDocumentAndHistoryPayload,
  isPlatformLiveDocumentAndHistoryInsert,
  resolvePlatformLiveDocumentAndHistoryCell,
  resolvePlatformLiveDocumentAndHistoryNone,
  resolvePlatformLiveDocumentAndHistoryTest4,
  updatePlatformLiveDocumentAndHistoryTake,
} from "../../platform/index";
import type {
  OperationBirth,
  RefusalEvent,
  RefusalEventSink,
  RefusalObserver,
  RefusalObserverEnvironment,
  RefusalObserverOptions,
  RefusalRequest,
  TelemetryFields,
  WriteSampler,
} from "./contracts";
import { refusalRequestFields } from "./event-fields";
import { createRefusalJudge } from "./judge";
import { bookKeyOf, operationSuffixPattern } from "./operation-fields";
import { createRetryState } from "./retry-state";
import { createRefusalThrowCache } from "./throw-cache";
const SHADOW_EVENT_CAP: number = 200;

function openRefusalShadow(
  environment: RefusalObserverEnvironment,
  sink: RefusalEventSink,
  options: RefusalObserverOptions = {},
): RefusalObserver {
  const retryBook = createRetryState();
  const { state, recover } = retryBook;
  const cap = options.cap ?? 200;
  const sampler: WriteSampler = updatePlatformLiveDocumentAndHistoryTake(options.sample);
  const throwCache = createRefusalThrowCache();
  let closed: boolean = false;
  const emit = (
    name: string,
    fields: TelemetryFields,
    wire: RefusalEvent["wire"],
  ): undefined => {
    try {
      sink({
        name,
        fields,
        wire,
      });
    } catch {}
  };
  const requestFields = (context: RefusalRequest) =>
    refusalRequestFields(environment, context, state);
  const consumeThrow = throwCache.consume;
  const sampleWrite = (
    context: RefusalRequest,
    birth: OperationBirth | undefined,
    request: unknown,
  ): undefined => {
    const payload: readonly unknown[] =
      filterPlatformLiveDocumentAndHistoryPayload(request);
    const gesture: string | undefined =
      context.replayed === true || birth === undefined
        ? undefined
        : collectPlatformLiveDocumentAndHistoryAutoLift(payload, birth.g);
    const sample = sampler.take(
      context.replayed === true
        ? {
            g: `replay`,
          }
        : gesture === undefined
          ? birth
          : {
              ...birth,
              g: gesture,
            },
      context.ops,
      environment.now?.() ?? NaN,
    );
    if (sample === undefined) return;
    const fields: TelemetryFields = {
      surface: environment.surface,
      page: environment.page,
      sess: environment.session?.() ?? ``,
      sc: environment.supportCode ?? ``,
      feBuild: environment.feBuild,
      doorBuild: environment.doorBuild?.() ?? ``,
      road: context.road,
      component: sample.component,
      gesture: sample.gesture,
      nOps: sample.ops,
      cellSel: sample.cell,
      crossed: sample.cross,
    };
    let wireWord: string | undefined;
    try {
      wireWord =
        environment.loweringShadow?.() === true
          ? resolvePlatformLiveDocumentAndHistoryNone(sample)
          : undefined;
    } catch {
      wireWord = undefined;
    }
    try {
      wireWord = resolvePlatformLiveDocumentAndHistoryTest4(
        wireWord,
        isPlatformLiveDocumentAndHistoryInsert(payload, environment.browser?.()),
      );
    } catch {}
    sink({
      name: `pages.write.sample`,
      key: sample.why === `nth` ? `nth:${sample.gesture}` : sample.gesture,
      fields,
      ...(wireWord === undefined
        ? {}
        : {
            wire: {
              word: wireWord,
            },
          }),
    });
  };
  const allow = (context: RefusalRequest, request: unknown): undefined => {
    if (context.road === `write` || context.road === `stream`) {
      let value13: OperationBirth | undefined;
      try {
        if (context.opId !== undefined) {
          value13 = resolvePlatformLiveDocumentAndHistoryCell(
            environment.births?.get(bookKeyOf(context.opId)),
          );
        }
      } catch {
        value13 = undefined;
      }
      try {
        if (context.opId !== undefined && !operationSuffixPattern.test(context.opId)) {
          environment.births?.drop(bookKeyOf(context.opId));
        }
      } catch {}
      retryBook.clearCounts();
      state.rows = 0;
      state.strikes = 0;
      if (state.down !== null) {
        recover();
      }
      try {
        sampleWrite(context, value13, request);
      } catch {}
    } else if (context.road === `read`) {
      state.readsUnanswered = 0;
      if (state.down === `unreached` || state.down === `signed_out`) {
        recover();
      }
    } else {
      if (context.road === `mint`) {
        state.createFails = 0;
        if (state.down === `unreached`) {
          recover();
        }
      }
    }
  };
  return {
    threw: (request, error) => {
      if (!closed) throwCache.remember(request, error);
    },
    judged: createRefusalJudge({
      environment,
      cap,
      retryBook,
      state,
      isClosed: () => closed,
      emit,
      fields: requestFields,
      consumeThrow,
      onAllow: allow,
    }),
    state: () => ({
      ...state,
    }),
    close: (): undefined => {
      closed = true;
      retryBook.clearCounts();
      throwCache.clear();
    },
  };
}
export { openRefusalShadow, SHADOW_EVENT_CAP };
