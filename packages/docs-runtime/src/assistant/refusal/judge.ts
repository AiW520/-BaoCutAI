import {
  filterPlatformLiveDocumentAndHistoryPayload,
  isPlatformLiveDocumentAndHistoryInsert,
  resolvePlatformLiveDocumentAndHistoryAsking,
  resolvePlatformLiveDocumentAndHistoryPayload3,
} from "../../platform/index";
import { classifyRefusal } from "./classification";
import type {
  RefusalEvent,
  RefusalObserver,
  RefusalObserverEnvironment,
  RefusalObserverState,
  RefusalRequest,
  TelemetryFields,
} from "./contracts";
import {
  faceOf,
  hashRefusalLabel,
  retryCountFields,
  retryInfoOf,
  wireWordPattern,
} from "./format";
import { operationShadowFields } from "./operation-fields";
import { isRecord } from "./reply-facts";
import type { createRetryState } from "./retry-state";
import { shadowRowFromReply } from "./row-index";
import { classifyTransportThrow } from "./transport";
import { transportCode, weatherOf } from "./weather";
import { refusalWireFields } from "./wire-vocabulary";
interface RefusalJudgeContext {
  environment: RefusalObserverEnvironment;
  cap: number;
  retryBook: ReturnType<typeof createRetryState>;
  state: RefusalObserverState;
  isClosed: () => boolean;
  emit: (name: string, fields: TelemetryFields, wire: RefusalEvent["wire"]) => void;
  fields: (context: RefusalRequest) => TelemetryFields;
  consumeThrow: (request: unknown, opId: string | undefined) => unknown;
  onAllow: (context: RefusalRequest, request: unknown) => void;
}
export function createRefusalJudge({
  environment,
  cap,
  retryBook,
  state,
  isClosed,
  emit,
  fields: requestFields,
  consumeThrow,
  onAllow: allow,
}: RefusalJudgeContext): RefusalObserver["judged"] {
  const recordRefusal = retryBook.recordRefusal;
  let capReported = false;
  return (request, reply, action, context) => {
    if (isClosed() || !isRecord(reply)) return;
    const response = reply;
    const thrown = consumeThrow(request, context.opId);
    if (response.verdict === `allow`) return allow(context, request);
    const verb = context.verb;
    const transport =
      thrown !== undefined &&
      response.verdict !== `deny` &&
      response.hung !== true &&
      response.reopens !== true
        ? classifyTransportThrow(thrown, verb)
        : null;
    const effectiveReply = transport?.rep ?? response;
    const classification = classifyRefusal(effectiveReply, {
      road: context.road,
      verb,
      seated: context.seated,
      replayed: context.replayed,
      kStart: context.kStart,
      node: context.node,
      lost: context.lost,
    });
    const tripped = recordRefusal(classification, context, effectiveReply);
    const row =
      classification.source === "default"
        ? undefined
        : shadowRowFromReply(
            classification,
            isRecord(effectiveReply.data) ? effectiveReply.data : {},
          );
    const hasSubreason: boolean = row !== undefined && row.sub !== `*`;
    const unreachable: boolean = effectiveReply.verdict !== `deny`;
    const rowKey =
      transport?.rowKey ??
      row?.key ??
      (unreachable
        ? `verdict | unreachable${effectiveReply.hung === true ? ` hung` : effectiveReply.reopens === true ? ` reopens` : effectiveReply.lost === true ? ` lost` : ``}`
        : `unrowed`);
    const rawReason =
      typeof effectiveReply.reason == `string` ? effectiveReply.reason : ``;
    const retry = retryInfoOf(classification);
    const word =
      row === undefined
        ? unreachable
          ? `unreachable`
          : `unrowed`
        : classification.reason;
    const wire = refusalWireFields(word, rowKey);
    const code = unreachable ? transportCode(transport, effectiveReply) : undefined;
    const weather = weatherOf(context, environment.weather);
    const weathered =
      unreachable && (weather.foul || (context.road === `read` && context.gap === true));
    const fields: TelemetryFields = {
      ...requestFields(context),
      ...weather.fields,
      word,
      ...(code === undefined
        ? {}
        : {
            code,
          }),
      ...(hasSubreason && row !== undefined
        ? {
            sub: row.sub,
          }
        : {}),
      rowKey,
      source: classification.source,
      ...(transport?.relay === undefined
        ? {}
        : {
            relay: transport.relay,
          }),
      ...(transport?.http === undefined
        ? {}
        : {
            http: transport.http,
          }),
      ...(row === undefined && !unreachable
        ? {
            unrowedLen: rawReason.length,
            ...(wireWordPattern.test(rawReason)
              ? {
                  unrowedHash: hashRefusalLabel(rawReason),
                }
              : {}),
          }
        : {}),
      ...(effectiveReply.hung === true
        ? {
            hung: true,
          }
        : {}),
      ...(effectiveReply.reopens === true
        ? {
            reopens: true,
          }
        : {}),
      klass: faceOf(classification),
      k: classification.k,
      scope: classification.scope,
      retry: retry.retry,
      retryMax: retry.retryMax,
      after: retry.after,
      today: row?.today ?? ``,
      action,
      trip: tripped,
      ...(context.opId === undefined
        ? {}
        : retryCountFields(retryBook.countsFor(context.opId))),
      ...operationShadowFields(
        context,
        effectiveReply,
        environment.births,
        filterPlatformLiveDocumentAndHistoryPayload(request),
        effectiveReply.verdict === `deny` && word === `anchors_affected`
          ? resolvePlatformLiveDocumentAndHistoryAsking(
              effectiveReply.data,
              context.road === `write`
                ? resolvePlatformLiveDocumentAndHistoryPayload3(request)
                : undefined,
            )
          : undefined,
      ),
    };
    fields.shadow = state.down === null ? `live` : `down`;
    fields.down = state.down ?? ``;
    fields.trips = state.trips;
    fields.strikes = state.strikes;
    fields.readsUnanswered = state.readsUnanswered;
    fields.createFails = state.createFails;
    fields.pageFace = state.page;
    if (weathered) {
      state.weathered += 1;
      fields.weathered = state.weathered;
    } else if (state.emitted < cap) {
      state.emitted += 1;
      emit(`pages.refusal.shadow`, fields, wire);
      try {
        const value31: string | undefined =
          (context.road === `write` || context.road === `stream`) &&
          typeof fields.component == `string`
            ? isPlatformLiveDocumentAndHistoryInsert(
                filterPlatformLiveDocumentAndHistoryPayload(request),
                environment.browser?.(),
              )
            : undefined;
        if (value31 !== undefined) {
          emit(
            `pages.write.shape`,
            {
              ...requestFields(context),
              component: fields.component,
              road: context.road,
            },
            {
              word: value31,
            },
          );
        }
      } catch {}
    } else if (!capReported) {
      capReported = true;
      emit(
        `pages.refusal.shadow.capped`,
        {
          ...requestFields(context),
          word,
          rowKey,
          cap,
          emitted: state.emitted,
        },
        wire,
      );
    }
    if (tripped && state.trips === 1) {
      emit(`pages.refusal.shadow.down`, fields, wire);
    }
  };
}
