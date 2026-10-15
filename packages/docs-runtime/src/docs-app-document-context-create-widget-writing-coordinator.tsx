/** BaoCut: document context from index-CX4IZqzA.js. */
import type { Dynamic } from "./types";
import {
  EditorHostDataLfileFrame,
  EditorHostRest5,
  EditorHostSans,
  EditorHostSize,
  EditorHostState25,
  EditorHostState3,
  EditorHostStyles13,
  EditorSelectionAndTablesDataPagesPrintSurface,
  ackOf,
  clearEditorHostDelete,
  isDoorUnreachable,
  loadObservabilityBrowserAndOperationEventsCode,
  observabilityBrowserAndOperationEventsSet32,
  originalJsxProps,
  platformAnnouncementsPattern,
  preloadModule,
  resolveDataOperationControlAbsent,
  resolveEditorHostHandoff,
  resolveEditorHostIsFinite3,
  resolveEditorHostReplace,
  resolveEditorHostTaken,
  resolveEditorHostValue11,
  resolveEditorHostValue9,
  resolvePlatformLiveDocumentAndHistoryTest,
  resolvePlatformSessionAndSourcesData,
  resolvePlatformSessionAndSourcesUnavailable,
  resolvePlatformSyncAndRoutingTaken,
} from "./docs-app-dependencies";
import {
  React,
  mapPreloadDependencies,
} from "./docs-app-bootstrap";
import {
  DocumentContext_Message,
  DocumentContext_Styles,
  WidgetBridgeJoin,
  WidgetBridge_Message,
  WidgetBridge_Message2,
  WidgetBridge_Message3,
  WidgetBridge_Message4,
  WidgetBridge_Message5,
  WidgetBridge_Message6,
  resolveDocumentContextEncode,
  resolveDocumentContextReplace,
  widgetBridgeLimit16000,
  widgetBridgeLimit6144,
  widgetBridgeLimit8000,
} from "./docs-app-widget-bridge-state-2";

function filterDocumentContextSlice(
  filterDocumentContextSlice2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let documentContextReplace: Dynamic = resolveDocumentContextReplace(
    filterDocumentContextSlice2.request.trim().slice(0, widgetBridgeLimit8000),
  );
  let documentContextReplace2: Dynamic = filterDocumentContextSlice2.retryNote
    ? resolveDocumentContextReplace(
        filterDocumentContextSlice2.retryNote
          .trim()
          .slice(0, widgetBridgeLimit6144),
      )
    : ``;
  let documentContextReplace3: Dynamic =
    documentContextReplace2 && filterDocumentContextSlice2.previousSource
      ? resolveDocumentContextReplace(
          filterDocumentContextSlice2.previousSource
            .trim()
            .slice(0, widgetBridgeLimit16000),
        )
      : ``;
  let filterDocumentContextSliceHandler: Dynamic = (
    filterDocumentContextSlice3?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    documentContextReplace2
      ? `${WidgetBridge_Message5}\n` +
        (filterDocumentContextSlice3
          ? `The previous component (NOT inserted — correct it, do not repeat it):\n${filterDocumentContextSlice3}\n\n`
          : ``) +
        `${documentContextReplace2}\n${WidgetBridge_Message6}`
      : ``;
  let join: Dynamic = (
    filterDocumentContextSlice3?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    [
      DocumentContext_Styles,
      WidgetBridgeJoin,
      DocumentContext_Message,
      `${WidgetBridge_Message3}\n${documentContextReplace}\n${WidgetBridge_Message4}`,
      filterDocumentContextSliceHandler(filterDocumentContextSlice3),
    ].filter(Boolean).join(`

`);
  let label = `
…[the rest of this source was cut for length]`;
  let documentContextReplace4: Dynamic = documentContextReplace3;
  for (
    ;
    documentContextReplace3 &&
    resolveDocumentContextEncode(join(documentContextReplace3 + label)) > 49152;

  )
    documentContextReplace3 =
      documentContextReplace3.length > 512
        ? documentContextReplace3.slice(
            0,
            Math.floor(documentContextReplace3.length / 2),
          )
        : ``;
  if (documentContextReplace3 !== documentContextReplace4) {
    documentContextReplace3 = documentContextReplace3
      ? documentContextReplace3 + label
      : ``;
  }
  let contentText: Dynamic = join(documentContextReplace3);
  let documentContextReplace5: Dynamic = resolveDocumentContextReplace(
    (filterDocumentContextSlice2.context ?? ``).trim(),
  );
  let filterDocumentContextSliceHandler2: Dynamic = (
    filterDocumentContextSlice3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    filterDocumentContextSlice3
      ? `${contentText}\n\n${WidgetBridge_Message} (the doc's text before the insertion point, oldest first)\n${filterDocumentContextSlice3}\n${WidgetBridge_Message2}`
      : contentText;
  for (
    ;
    documentContextReplace5 &&
    resolveDocumentContextEncode(
      filterDocumentContextSliceHandler2(documentContextReplace5),
    ) > 49152;

  ) {
    let documentContextReplaceIndex: Dynamic = documentContextReplace5.indexOf(`
`);
    documentContextReplace5 =
      documentContextReplaceIndex >= 0 &&
      documentContextReplaceIndex < documentContextReplace5.length - 1
        ? documentContextReplace5.slice(documentContextReplaceIndex + 1)
        : documentContextReplace5.slice(
            Math.ceil(documentContextReplace5.length / 4),
          );
  }
  return filterDocumentContextSliceHandler2(documentContextReplace5);
}

function isDocumentContextExec(
  documentContextExec?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let match =
    /```(?:tsx|jsx|typescript|ts|javascript|js)?[ \t]*\r?\n([\s\S]*?)\r?\n```/.exec(
      documentContextExec,
    );
  let trimmedMatchItem: Dynamic = (
    match ? match[1] : documentContextExec
  ).trim();
  return !trimmedMatchItem ||
    !/\bexport\s+default\b/.test(trimmedMatchItem) ||
    documentContextPattern.test(trimmedMatchItem)
    ? null
    : trimmedMatchItem;
}

var documentContextPattern: RegExp;

async function loadDocumentContextRequest(
  documentContextRequest?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let prompt: Dynamic = filterDocumentContextSlice({
    request: documentContextRequest.request,
    context: (documentContextRequest.context ?? ``).slice(-12e3),
    retryNote: documentContextRequest.retryNote,
    previousSource: documentContextRequest.previousSource,
  });
  let response: Dynamic = await loadObservabilityBrowserAndOperationEventsCode(
    documentContextRequest.sampler,
    {
      prompt: prompt,
      modelTier: `default`,
      ...(documentContextRequest.fresh
        ? {
            cache: false,
          }
        : {}),
    },
    {
      feature: `widget`,
      trigger: documentContextRequest.trigger ?? `command`,
    },
  );
  if (!response.ok)
    return {
      ok: false,
      code: response.code,
      permanent: observabilityBrowserAndOperationEventsSet32.has(response.code),
    };
  let source: Dynamic = isDocumentContextExec(response.completion);
  return source === null
    ? {
        ok: false,
        code: `no_source`,
        permanent: false,
      }
    : {
        ok: true,
        source: source,
        truncated: response.truncated,
      };
}

var resolveDocumentContextIsArray: Dynamic;

function resolveDocumentContextDiagnostics(
  documentContextDiagnostics?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    !resolveDocumentContextIsArray(documentContextDiagnostics) ||
    !Array.isArray(documentContextDiagnostics.diagnostics)
  )
    return {
      diagnostics: [],
      omitted: 0,
    };
  let diagnostics: Dynamic = [];
  for (let error of documentContextDiagnostics.diagnostics as Dynamic)
    if (
      !(
        !resolveDocumentContextIsArray(error) ||
        typeof error.message != `string`
      )
    ) {
      if (error.class !== `hint`) {
        diagnostics.push({
          rule:
            typeof error.rule == `string` && error.rule
              ? error.rule
              : typeof error.class == `string`
                ? error.class
                : `invalid`,
          message: error.message,
          ...(typeof error.line == `number`
            ? {
                line: error.line,
              }
            : {}),
          ...(typeof error.col == `number`
            ? {
                col: error.col,
              }
            : {}),
          ...(typeof error.fix == `string` && error.fix
            ? {
                fix: error.fix,
              }
            : {}),
        });
      }
    }
  return {
    diagnostics: diagnostics,
    omitted:
      typeof documentContextDiagnostics.diagnosticsOmitted == `number`
        ? documentContextDiagnostics.diagnosticsOmitted
        : 0,
  };
}

function resolveDocumentContextValue(
  documentContextValue?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return documentContextValue === `published`
    ? `published`
    : documentContextValue === `staged-with-errors` ||
        documentContextValue === `staged`
      ? `draft`
      : null;
}

async function loadDocumentContextDiagnostics(
  documentContextDiagnostics?: Dynamic,
  nodeId?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let landed =
    resolveDocumentContextValue(documentContextDiagnostics.outcome) ??
    `unknown`;
  if (landed === `unknown` && context)
    try {
      let context2: Dynamic = await context(nodeId);
      if (context2 && typeof context2.pub == `number`) {
        landed = context2.pub > 0 ? `published` : `draft`;
      }
    } catch {}
  let { diagnostics: diagnostics, omitted: diagnosticsOmitted }: Dynamic =
    landed === `draft`
      ? resolveDocumentContextDiagnostics(documentContextDiagnostics.report)
      : {
          diagnostics: [],
          omitted: 0,
        };
  return {
    ok: true,
    nodeId: nodeId,
    landed: landed,
    diagnostics: diagnostics,
    diagnosticsOmitted: diagnosticsOmitted,
  };
}

var resolveDocumentContextTrim: Dynamic;

var resolveDocumentContextMessage: Dynamic;

var resolveDocumentContextReason: Dynamic;

var resolveDocumentContextReason2: Dynamic;

async function loadDocumentContextObject(
  documentContextObject?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let response: Dynamic;
  try {
    response = ackOf(
      await documentContextObject.door.call(`create`, {
        object: `node`,
        engine: `widget`,
        payload: {
          engine: `widget`,
          parent: {
            object: `file`,
            id: documentContextObject.fileId,
          },
          code: documentContextObject.source,
        },
      }),
    );
  } catch (loadDocumentContextObjectResult: Dynamic) {
    return resolveDocumentContextReason(loadDocumentContextObjectResult);
  }
  return response.verdict === `allow`
    ? response.minted
      ? loadDocumentContextDiagnostics(
          response,
          response.minted,
          documentContextObject.readNode,
        )
      : {
          ok: false,
          reason: `the document didn't return the widget's id`,
        }
    : resolveDocumentContextReason2(response);
}

async function loadDocumentContextRef(
  documentContextRef?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let response: Dynamic;
  try {
    response = ackOf(
      await documentContextRef.door.call(`update`, {
        ref: {
          object: `node`,
          id: documentContextRef.nodeId,
        },
        engine: `widget`,
        payload: {
          engine: `widget`,
          kind: `draft`,
          code: documentContextRef.source,
          basePub: documentContextRef.basePub ?? 0,
        },
      }),
    );
  } catch (loadDocumentContextRefResult: Dynamic) {
    return resolveDocumentContextReason(loadDocumentContextRefResult);
  }
  return response.verdict === `allow`
    ? loadDocumentContextDiagnostics(
        response,
        documentContextRef.nodeId,
        documentContextRef.readNode,
      )
    : resolveDocumentContextReason2(response);
}

async function loadDocumentContextRef2(
  documentContextRef2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  try {
    return (
      ackOf(
        await documentContextRef2.door.call(`delete`, {
          ref: {
            object: `node`,
            id: documentContextRef2.nodeId,
          },
          payload: {},
        }),
      ).verdict === `allow`
    );
  } catch {
    return false;
  }
}

function mapDocumentContextRule(
  items?: Dynamic,
  options: Dynamic = 0,
  ..._extraArguments: unknown[]
): Dynamic {
  let slice: Dynamic = (error?: Dynamic, ..._extraArguments: unknown[]) =>
    `- ` +
    error.rule +
    (error.line === undefined
      ? ``
      : ` at ` + error.line + `:` + (error.col ?? 0)) +
    ` — ` +
    error.message.slice(0, 300) +
    (error.fix ? ` — fix: ` + error.fix.slice(0, 200) : ``);
  let join: Dynamic = (
    items2?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `The previous component (quoted above when available) FAILS the document's widget validator — the same gate every insert runs — so it was not shown to anyone. The findings, by rule and line:col in that source, are below; the person wants the same widget with EVERY one of them fixed, so reply with the full corrected component, following every rule:
` +
    (items2.length
      ? items2.join(`
`)
      : `- (the document listed no individual findings)`) +
    (options2 > 0
      ? `
(+` +
        options2 +
        ` more)`
      : ``);
  let mappedItemsSlice: Dynamic = items.slice(0, 12).map(slice);
  let mapDocumentContextRuleHandler: Dynamic = (
    ..._extraArguments: unknown[]
  ) => items.length - mappedItemsSlice.length + Math.max(0, options);
  for (
    ;
    mappedItemsSlice.length > 0 &&
    join(mappedItemsSlice, mapDocumentContextRuleHandler()).length > 6144;

  )
    mappedItemsSlice = mappedItemsSlice.slice(0, -1);
  return join(mappedItemsSlice, mapDocumentContextRuleHandler());
}

function resolveDocumentContextSampler(
  documentContextSampler?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return loadDocumentContextRequest({
    sampler: documentContextSampler.sampler,
    request: documentContextSampler.request,
    context: documentContextSampler.context,
    retryNote: mapDocumentContextRule(
      documentContextSampler.diagnostics,
      documentContextSampler.diagnosticsOmitted ?? 0,
    ),
    previousSource: documentContextSampler.refusedSource,
    fresh: true,
    trigger: `click`,
  });
}

function resolveDocumentContextValue2(
  documentContextValue2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  switch (documentContextValue2) {
    case `not_granted`:
      return `Claude wasn't allowed to run on your account for this document, so the widget can't be built here.`;
    case `sampling_disabled`:
      return `Claude isn't available for your account or organization, so the widget can't be built here.`;
    case `rate_limited`:
      return `That was too many requests for now — wait a moment and try again.`;
    case `session_expired`:
      return `Your session expired — sign in again, then try once more.`;
    case `refused`:
      return `Claude declined that request — try describing the widget differently.`;
    case `empty_completion`:
    case `no_source`:
      return `Claude didn't produce a component for that — try again or rephrase.`;
    case `prompt_too_large`:
      return `That request plus the document around it is too long to send — shorten the request.`;
    case `upstream_error`:
    case `malformed`:
      return `The model call failed — try again.`;
    case `invalid_request`:
      return `Claude couldn't take that request — try again, and report it if it keeps happening.`;
    default:
      return `Building widgets with Claude isn't available in this view.`;
  }
}

var DocumentContextState: {
    ok: boolean;
};

function createWidgetWritingCoordinator(
  widgetWritingCoordinator?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let createWidgetWritingCoordinatorResult: Dynamic = null;
  let createWidgetWritingCoordinatorHandler = (
    widgetWritingCoordinator2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => createWidgetWritingCoordinatorResult === widgetWritingCoordinator2;
  let createWidgetWritingCoordinatorHandler2 = (
    widgetWritingCoordinator2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => widgetWritingCoordinator2.attempt < 3;
  let createWidgetWritingCoordinatorHandler3: Dynamic = (
    widgetWritingCoordinator2?: Dynamic,
    note?: Dynamic,
    context: Dynamic = true,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    phase: `refused`,
    request: widgetWritingCoordinator2.request,
    source:
      widgetWritingCoordinator2.refusedSource ??
      widgetWritingCoordinator2.source ??
      ``,
    attempt: widgetWritingCoordinator2.attempt,
    canRetry:
      context &&
      createWidgetWritingCoordinatorHandler2(widgetWritingCoordinator2),
    problems: widgetWritingCoordinator2.diagnostics ?? [],
    more: widgetWritingCoordinator2.diagnosticsOmitted ?? 0,
    ...(note
      ? {
          note: note,
        }
      : {}),
  });
  let createWidgetWritingCoordinatorHandler4: Dynamic = (
    widgetWritingCoordinator2?: Dynamic,
    source?: Dynamic,
    truncated: Dynamic = false,
    problems?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    phase: `proposal`,
    request: widgetWritingCoordinator2.request,
    source: source,
    truncated: truncated,
    attempt: widgetWritingCoordinator2.attempt,
    canRetry: createWidgetWritingCoordinatorHandler2(widgetWritingCoordinator2),
    ...(widgetWritingCoordinator2.note
      ? {
          note: widgetWritingCoordinator2.note,
        }
      : {}),
    ...(problems && problems.length > 0
      ? {
          problems: problems,
        }
      : {}),
  });
  let door = (
    widgetWritingCoordinator2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      !widgetWritingCoordinator2?.draftNodeId ||
      widgetWritingCoordinator2.busy
    )
      return;
    let nodeId: Dynamic = widgetWritingCoordinator2.draftNodeId;
    widgetWritingCoordinator2.draftNodeId = undefined;
    widgetWritingCoordinator.forget?.(nodeId);
    let door2: Dynamic = widgetWritingCoordinator.door();
    if (door2) {
      loadDocumentContextRef2({
        door: door2,
        nodeId: nodeId,
      });
    }
  };
  let forget = (
    widgetWritingCoordinator2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (widgetWritingCoordinator2.draftNodeId) {
      widgetWritingCoordinator.forget?.(widgetWritingCoordinator2.draftNodeId);
    }
    widgetWritingCoordinator2.draftNodeId = undefined;
    widgetWritingCoordinator2.refusedSource = undefined;
    widgetWritingCoordinator2.diagnostics = undefined;
    widgetWritingCoordinator2.diagnosticsOmitted = undefined;
    widgetWritingCoordinator2.retryNote = undefined;
  };
  let updateSampling = async (
    widgetWritingCoordinator2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<undefined> => {
    widgetWritingCoordinator2.sampling = true;
    try {
      await show(widgetWritingCoordinator2, options);
    } finally {
      widgetWritingCoordinator2.sampling = false;
    }
  };
  let show: Dynamic = async (
    widgetWritingCoordinator2?: Dynamic,
    fresh?: Dynamic,
    previousSource?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<Dynamic> => {
    widgetWritingCoordinator.show({
      phase: `generating`,
      request: widgetWritingCoordinator2.request,
      attempt: widgetWritingCoordinator2.attempt,
    });
    let sampler: Dynamic = null;
    try {
      sampler = await widgetWritingCoordinator.sampler();
    } catch {
      sampler = null;
    }
    if (!createWidgetWritingCoordinatorHandler(widgetWritingCoordinator2))
      return;
    let documentContextSampler: Dynamic =
      widgetWritingCoordinator2.draftNodeId !== undefined &&
      widgetWritingCoordinator2.refusedSource !== undefined
        ? await resolveDocumentContextSampler({
            sampler: sampler,
            request: widgetWritingCoordinator2.request,
            context: widgetWritingCoordinator2.context,
            refusedSource: widgetWritingCoordinator2.refusedSource,
            diagnostics: widgetWritingCoordinator2.diagnostics ?? [],
            diagnosticsOmitted: widgetWritingCoordinator2.diagnosticsOmitted,
          })
        : await loadDocumentContextRequest({
            sampler: sampler,
            request: widgetWritingCoordinator2.request,
            context: widgetWritingCoordinator2.context,
            retryNote: widgetWritingCoordinator2.retryNote,
            previousSource: previousSource,
            fresh: fresh,
            trigger:
              widgetWritingCoordinator2.attempt > 1 ? `click` : `command`,
          });
    if (!createWidgetWritingCoordinatorHandler(widgetWritingCoordinator2))
      return;
    if (!documentContextSampler.ok) {
      widgetWritingCoordinator2.source = undefined;
      let words = resolveDocumentContextValue2(documentContextSampler.code);
      if (widgetWritingCoordinator2.draftNodeId === undefined) {
        widgetWritingCoordinator.show({
          phase: `failed`,
          request: widgetWritingCoordinator2.request,
          words: words,
          canRetry:
            createWidgetWritingCoordinatorHandler2(widgetWritingCoordinator2) &&
            !documentContextSampler.permanent,
          attempt: widgetWritingCoordinator2.attempt,
        });
      } else {
        widgetWritingCoordinator.show(
          createWidgetWritingCoordinatorHandler3(
            widgetWritingCoordinator2,
            words,
            !documentContextSampler.permanent,
          ),
        );
      }
      return;
    }
    let DocumentContextState4: Dynamic = DocumentContextState;
    if (widgetWritingCoordinator.preflight)
      try {
        DocumentContextState4 = widgetWritingCoordinator.preflight(
          documentContextSampler.source,
        );
      } catch {
        DocumentContextState4 = DocumentContextState;
      }
    if (
      !DocumentContextState4.ok &&
      createWidgetWritingCoordinatorHandler2(widgetWritingCoordinator2) &&
      widgetWritingCoordinator2.draftNodeId === undefined
    ) {
      widgetWritingCoordinator2.attempt += 1;
      widgetWritingCoordinator2.retryNote = DocumentContextState4.note;
      widgetWritingCoordinator2.note = undefined;
      return show(
        widgetWritingCoordinator2,
        true,
        documentContextSampler.source,
      );
    }
    if (previousSource !== undefined) {
      widgetWritingCoordinator2.retryNote = undefined;
    }
    widgetWritingCoordinator2.source = documentContextSampler.source;
    widgetWritingCoordinator.show(
      createWidgetWritingCoordinatorHandler4(
        widgetWritingCoordinator2,
        documentContextSampler.source,
        documentContextSampler.truncated,
        DocumentContextState4.ok ? undefined : DocumentContextState4.problems,
      ),
    );
  };
  let handBack = async (
    widgetWritingCoordinator2?: Dynamic,
    nodeId?: Dynamic,
    landed?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<undefined> => {
    widgetWritingCoordinator2.busy = true;
    widgetWritingCoordinator.show({
      phase: `inserting`,
      request: widgetWritingCoordinator2.request,
      source:
        widgetWritingCoordinator2.refusedSource ??
        widgetWritingCoordinator2.source ??
        ``,
      attempt: widgetWritingCoordinator2.attempt,
    });
    let diagnostics: Dynamic =
      landed === `draft` ? (widgetWritingCoordinator2.diagnostics ?? []) : [];
    let diagnosticsOmitted: Dynamic =
      landed === `draft`
        ? (widgetWritingCoordinator2.diagnosticsOmitted ?? 0)
        : 0;
    if (landed !== `draft`) {
      widgetWritingCoordinator.forget?.(nodeId);
    }
    try {
      await widgetWritingCoordinator.placeChip({
        nodeId: nodeId,
        request: widgetWritingCoordinator2.request,
        after: widgetWritingCoordinator2.after,
        landed: landed,
        diagnostics: diagnostics,
        diagnosticsOmitted: diagnosticsOmitted,
      });
    } catch {}
    if (createWidgetWritingCoordinatorHandler(widgetWritingCoordinator2)) {
      createWidgetWritingCoordinatorResult = null;
      widgetWritingCoordinator.show(null);
      widgetWritingCoordinator.handBack(true);
    }
  };
  return {
    start(
      { after: after, request: request, context: context }: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      door(createWidgetWritingCoordinatorResult);
      let record: Dynamic = {
        after: after,
        request: request,
        context: context,
        attempt: 1,
        busy: false,
        sampling: false,
      };
      createWidgetWritingCoordinatorResult = record;
      updateSampling(record, false);
    },
    retry(..._extraArguments: unknown[]): undefined {
      let createWidgetWritingCoordinatorResult2: Dynamic =
        createWidgetWritingCoordinatorResult;
      if (
        !(
          !createWidgetWritingCoordinatorResult2 ||
          createWidgetWritingCoordinatorResult2.busy ||
          createWidgetWritingCoordinatorResult2.sampling ||
          !createWidgetWritingCoordinatorHandler2(
            createWidgetWritingCoordinatorResult2,
          )
        )
      ) {
        createWidgetWritingCoordinatorResult2.attempt += 1;
        createWidgetWritingCoordinatorResult2.retryNote =
          createWidgetWritingCoordinatorResult2.retryNote ??
          `The person asked for another attempt at the same request — produce a different, simpler component that follows every rule.`;
        updateSampling(createWidgetWritingCoordinatorResult2, true);
      }
    },
    discard(..._extraArguments: unknown[]): undefined {
      let createWidgetWritingCoordinatorResult2: Dynamic =
        createWidgetWritingCoordinatorResult;
      if (!createWidgetWritingCoordinatorResult2?.busy) {
        createWidgetWritingCoordinatorResult = null;
        widgetWritingCoordinator.show(null);
        door(createWidgetWritingCoordinatorResult2);
        widgetWritingCoordinator.handBack(false);
      }
    },
    abandon(..._extraArguments: unknown[]): undefined {
      let createWidgetWritingCoordinatorResult2: Dynamic =
        createWidgetWritingCoordinatorResult;
      createWidgetWritingCoordinatorResult = null;
      door(createWidgetWritingCoordinatorResult2);
    },
    async insert(..._extraArguments: unknown[]): Promise<undefined> {
      let createWidgetWritingCoordinatorResult2: Dynamic =
        createWidgetWritingCoordinatorResult;
      if (
        !createWidgetWritingCoordinatorResult2?.source ||
        createWidgetWritingCoordinatorResult2.busy
      )
        return;
      let source: Dynamic = createWidgetWritingCoordinatorResult2.source;
      let door2: Dynamic = widgetWritingCoordinator.door();
      let fileId: Dynamic = widgetWritingCoordinator.fileId();
      if (!door2 || !fileId) {
        widgetWritingCoordinator.show({
          phase: `failed`,
          request: createWidgetWritingCoordinatorResult2.request,
          words: `This document is no longer open here, so the widget can't be inserted.`,
          canRetry: false,
          attempt: createWidgetWritingCoordinatorResult2.attempt,
        });
        return;
      }
      createWidgetWritingCoordinatorResult2.busy = true;
      widgetWritingCoordinator.show({
        phase: `inserting`,
        request: createWidgetWritingCoordinatorResult2.request,
        source: source,
        attempt: createWidgetWritingCoordinatorResult2.attempt,
      });
      let nodeId: Dynamic = createWidgetWritingCoordinatorResult2.draftNodeId;
      let documentContextObject: Dynamic =
        nodeId === undefined
          ? await loadDocumentContextObject({
              door: door2,
              fileId: fileId,
              source: source,
              readNode: widgetWritingCoordinator.readNode,
            })
          : await loadDocumentContextRef({
              door: door2,
              nodeId: nodeId,
              source: source,
              readNode: widgetWritingCoordinator.readNode,
            });
      if (
        !createWidgetWritingCoordinatorHandler(
          createWidgetWritingCoordinatorResult2,
        )
      ) {
        if (documentContextObject.ok) {
          widgetWritingCoordinator.forget?.(documentContextObject.nodeId);
          loadDocumentContextRef2({
            door: door2,
            nodeId: documentContextObject.nodeId,
          });
        }
        return;
      }
      createWidgetWritingCoordinatorResult2.busy = false;
      if (!documentContextObject.ok) {
        if (
          nodeId !== undefined &&
          (resolveDataOperationControlAbsent(documentContextObject.code) ||
            documentContextObject.code === `widget-draft-stale`)
        ) {
          forget(createWidgetWritingCoordinatorResult2);
          createWidgetWritingCoordinatorResult2.note =
            documentContextObject.code === `widget-draft-stale`
              ? `Someone published this block meanwhile; Insert will add the widget as a new block.`
              : `The draft block was removed meanwhile; Insert will add the widget as a new block.`;
        } else {
          createWidgetWritingCoordinatorResult2.note =
            documentContextObject.notNow
              ? documentContextObject.reason.replace(/\.$/, ``) +
                ` — press Insert to try again.`
              : documentContextObject.unreachable
                ? `Couldn't reach the document (` +
                  documentContextObject.reason +
                  `) — press Insert to try again.`
                : `The widget wasn't inserted` +
                  resolvePlatformLiveDocumentAndHistoryTest(
                    documentContextObject.reason,
                  );
          if (nodeId === undefined && !documentContextObject.notNow) {
            createWidgetWritingCoordinatorResult2.retryNote =
              `The document refused the previous attempt (` +
              documentContextObject.reason +
              `) — produce a different component that follows every rule.`;
          }
        }
        widgetWritingCoordinator.show(
          createWidgetWritingCoordinatorHandler4(
            createWidgetWritingCoordinatorResult2,
            source,
          ),
        );
        return;
      }
      if (documentContextObject.landed === `draft`) {
        createWidgetWritingCoordinatorResult2.draftNodeId =
          documentContextObject.nodeId;
        createWidgetWritingCoordinatorResult2.refusedSource = source;
        createWidgetWritingCoordinatorResult2.diagnostics =
          documentContextObject.diagnostics;
        createWidgetWritingCoordinatorResult2.diagnosticsOmitted =
          documentContextObject.diagnosticsOmitted;
        createWidgetWritingCoordinatorResult2.note = undefined;
        widgetWritingCoordinator.show(
          createWidgetWritingCoordinatorHandler3(
            createWidgetWritingCoordinatorResult2,
          ),
        );
        return;
      }
      forget(createWidgetWritingCoordinatorResult2);
      await handBack(
        createWidgetWritingCoordinatorResult2,
        documentContextObject.nodeId,
        documentContextObject.landed,
      );
    },
    async insertDraft(..._extraArguments: unknown[]): Promise<undefined> {
      let createWidgetWritingCoordinatorResult2: Dynamic =
        createWidgetWritingCoordinatorResult;
      if (
        !createWidgetWritingCoordinatorResult2?.draftNodeId ||
        createWidgetWritingCoordinatorResult2.busy
      )
        return;
      let draftNodeId: Dynamic =
        createWidgetWritingCoordinatorResult2.draftNodeId;
      createWidgetWritingCoordinatorResult2.draftNodeId = undefined;
      await handBack(
        createWidgetWritingCoordinatorResult2,
        draftNodeId,
        `draft`,
      );
    },
  };
}

var documentContextMap: Dynamic;

var documentContextSet: Dynamic;

var documentContextLimit0: Dynamic;

var resolveDocumentContextValue3: (..._extraArguments: unknown[]) => undefined;

function updateDocumentContextProblems(
  updateDocumentContextProblems2?: Dynamic,
  options?: Dynamic,
  context: Dynamic = 0,
  ..._extraArguments: unknown[]
): undefined {
  documentContextMap.set(updateDocumentContextProblems2, {
    problems: options.slice(),
    more: Math.max(0, context),
  });
  resolveDocumentContextValue3();
}

function clearDocumentContextDelete(
  clearDocumentContextDelete3?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (documentContextMap.delete(clearDocumentContextDelete3)) {
    resolveDocumentContextValue3();
  }
}

function getDocumentContextValue(
  documentContextValue?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return documentContextMap.get(documentContextValue);
}

var clearDocumentContextDelete2: Dynamic;

var resolveDocumentContextValue4: Dynamic;

function useDocumentContextUseSyncExternalStore(
  ..._extraArguments: unknown[]
): Dynamic {
  return (0, React.useSyncExternalStore)(
    clearDocumentContextDelete2,
    resolveDocumentContextValue4,
    resolveDocumentContextValue4,
  );
}

var documentContextSet2: Dynamic;

function isDocumentContextSetTimeout(
  documentContextSetTimeout: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let liveMs: Dynamic = documentContextSetTimeout.liveMs ?? 15e3;
  let timers: Dynamic = documentContextSetTimeout.timers ?? {
    setTimeout: (
      documentContextSetTimeout2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) => setTimeout(documentContextSetTimeout2, options),
    clearTimeout: (
      documentContextSetTimeout2?: Dynamic,
      ..._extraArguments: unknown[]
    ) => clearTimeout(documentContextSetTimeout2),
  };
  let channel: Dynamic =
    documentContextSetTimeout.channel ??
    ((..._extraArguments: unknown[]): Dynamic =>
      new (MessageChannel as Dynamic)());
  let isDocumentContextSetTimeoutResult: Dynamic = null;
  let isDocumentContextSetTimeoutResult2: Dynamic = null;
  let enabled = false;
  let isDocumentContextSetTimeoutResult3: Dynamic = null;
  let isDocumentContextSetTimeoutHandler = (
    ..._extraArguments: unknown[]
  ): undefined => {
    if (isDocumentContextSetTimeoutResult3 !== null) {
      timers.clearTimeout(isDocumentContextSetTimeoutResult3);
    }
    isDocumentContextSetTimeoutResult3 = null;
  };
  return {
    reset(..._extraArguments: unknown[]): undefined {
      isDocumentContextSetTimeoutHandler();
      isDocumentContextSetTimeoutResult?.close();
      isDocumentContextSetTimeoutResult = null;
      isDocumentContextSetTimeoutResult2 = null;
      enabled = false;
    },
    issue(
      documentContextSetTimeout2?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      isDocumentContextSetTimeoutHandler();
      isDocumentContextSetTimeoutResult?.close();
      let channel2: Dynamic = channel();
      let port1: Dynamic = channel2.port1;
      isDocumentContextSetTimeoutResult = port1;
      isDocumentContextSetTimeoutResult2 = documentContextSetTimeout2;
      enabled = true;
      port1.addEventListener(
        `message`,
        (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (isDocumentContextSetTimeoutResult === port1) {
            options(event.data);
          }
        },
      );
      port1.start();
      isDocumentContextSetTimeoutResult3 = timers.setTimeout(
        (..._extraArguments: unknown[]): undefined => {
          isDocumentContextSetTimeoutResult3 = null;
          if (isDocumentContextSetTimeoutResult === port1) {
            context();
          }
        },
        liveMs,
      );
      return channel2.port2;
    },
    live(..._extraArguments: unknown[]): undefined {
      isDocumentContextSetTimeoutHandler();
    },
    send(
      documentContextSetTimeout2?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      return isDocumentContextSetTimeoutResult
        ? documentContextSetTimeout2 === isDocumentContextSetTimeoutResult2
          ? (isDocumentContextSetTimeoutResult.postMessage(
              options,
              context ?? [],
            ),
            `port`)
          : `dropped`
        : enabled || !documentContextSetTimeout2
          ? `dropped`
          : (documentContextSetTimeout2.postMessage(
              options,
              `*`,
              context ?? [],
            ),
            `window`);
    },
    drop(..._extraArguments: unknown[]): undefined {
      isDocumentContextSetTimeoutHandler();
      isDocumentContextSetTimeoutResult?.close();
      isDocumentContextSetTimeoutResult = null;
      isDocumentContextSetTimeoutResult2 = null;
    },
    admitsOnWindow(
      documentContextSetTimeout2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return !enabled || documentContextSet2.has(documentContextSetTimeout2);
    },
    issued(..._extraArguments: unknown[]) {
      return enabled;
    },
  };
}

function useDocumentContextWarm(
  page2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [warm, setWarm]: Dynamic = (0, React.useState)(
    (..._extraArguments: unknown[]) =>
      page2.pid !== undefined && resolveEditorHostTaken(page2.pid),
  );
  let elementRef: Dynamic = (0, React.useRef)(null);
  let enabledRef: Dynamic = (0, React.useRef)(false);
  let pageRef: Dynamic = (0, React.useRef)(page2);
  pageRef.current = page2;
  return {
    warm: warm,
    slotRef: (0, React.useCallback)(
      (
        documentContextWarm?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (documentContextWarm === null) {
          let element: Dynamic = elementRef.current;
          elementRef.current = null;
          if (element !== null) {
            pageRef.current.seat(null);
            element.abandon();
          }
          setWarm(false);
          return;
        }
        let pid: Dynamic = pageRef.current.pid;
        let useDocumentContextWarmResult: Dynamic =
          !enabledRef.current && pid !== undefined
            ? resolveEditorHostHandoff(pid, documentContextWarm)
            : null;
        if (useDocumentContextWarmResult === null) {
          setWarm(false);
          return;
        }
        elementRef.current = useDocumentContextWarmResult;
        pageRef.current.dress(useDocumentContextWarmResult.el);
        pageRef.current.seat(useDocumentContextWarmResult.el);
      },
      [],
    ),
    handoff: (0, React.useCallback)(
      (
        documentContextWarm?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        enabledRef.current = true;
        let element: Dynamic = elementRef.current;
        if (element === null) {
          let pid: Dynamic = pageRef.current.pid;
          if (pid !== undefined) {
            resolvePlatformSyncAndRoutingTaken(`declined`, pid);
          }
          setWarm(false);
          return null;
        }
        let handoff: Dynamic = element.handoff(documentContextWarm);
        return handoff.failed ? (setWarm(false), null) : handoff;
      },
      [],
    ),
    seated: (0, React.useCallback)(
      (..._extraArguments: unknown[]): Dynamic =>
        elementRef.current?.el ?? null,
      [],
    ),
    drop: (0, React.useCallback)(
      (..._extraArguments: unknown[]): Dynamic => setWarm(false),
      [],
    ),
  };
}

var DocumentContextSetTimeout: Dynamic;

function resolveDocumentContextIsFinite(
  documentContextIsFinite?: unknown,
  ..._extraArguments: unknown[]
) {
  if (
    typeof documentContextIsFinite != `number` ||
    !Number.isFinite(documentContextIsFinite)
  )
    return null;
  let round = Math.round(documentContextIsFinite);
  return round > EditorHostSize && round <= 400 ? round : null;
}

function documentFrameStyleAttributes(
  documentFrameStyle?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies: Dynamic = false,
  ..._extraArguments: unknown[]
): Dynamic {
  let documentContextIsFinite = resolveDocumentContextIsFinite(options);
  let documentFrameStyleAttributesResult = resolveEditorHostIsFinite3(context);
  let filteredItems = [
    documentContextIsFinite === null
      ? ``
      : `--edge-min-left:${documentContextIsFinite}px`,
    documentFrameStyleAttributesResult &&
      `--doc-zoom:${documentFrameStyleAttributesResult}`,
  ].filter(Boolean);
  let filteredItems2 = [
    filteredItems.length === 0 ? `` : `style="${filteredItems.join(`;`)}"`,
    dependencies ? `data-frame-chrome=""` : ``,
  ].filter(Boolean);
  return filteredItems2.length === 0
    ? documentFrameStyle
    : documentFrameStyle.replace(
        `<html `,
        (..._extraArguments: unknown[]) => `<html ${filteredItems2.join(` `)} `,
      );
}

var DocumentContextState2: boolean;

function useDocumentContextUseSyncExternalStore2(
  ..._extraArguments: unknown[]
): Dynamic {
  (0, React.useEffect)(resolveDocumentContextCatch, []);
  return (0, React.useSyncExternalStore)(
    clearEditorHostDelete,
    resolveEditorHostValue11,
    resolveEditorHostValue11,
  );
}

function resolveDocumentContextCatch(..._extraArguments: unknown[]): undefined {
  if (!DocumentContextState2) {
    DocumentContextState2 = true;
    preloadModule(
      (..._extraArguments: unknown[]) =>
        import("./renderable-katex").then(
          (result?: Dynamic, ..._extraArguments: unknown[]) =>
            resolveEditorHostValue9(result.renderLatexMathml),
        ),
      mapPreloadDependencies([25, 0, 1, 2, 3]),
      import.meta.url,
    ).catch((..._extraArguments: unknown[]): undefined => {
      DocumentContextState2 = false;
    });
  }
}

function resolveDocumentContextTest(
  documentContextTest?: Dynamic,
  options: Dynamic = ``,
  context: Dynamic = `light`,
  dependencies: Dynamic = `Document`,
  argument?: Dynamic,
  argument2?: Dynamic,
  argument3?: Dynamic,
  ..._extraArguments: unknown[]
) {
  resolveDocumentContextCatch();
  return (
    documentFrameStyleAttributes(
      `<!doctype html><html${argument3 !== undefined && platformAnnouncementsPattern.test(argument3) ? ` lang="${argument3}"` : ``} class="cds-root" data-mode="${context === `dark` ? `dark` : `light`}" data-density="comfortable" aria-label="${resolveEditorHostReplace(dependencies)}" ${EditorHostDataLfileFrame}>`,
      argument,
      argument2,
    ) +
    `<meta http-equiv="Content-Security-Policy" content="${EditorHostStyles13}"><title>${resolveEditorHostReplace(dependencies)}</title><style>${options}@layer base{${EditorHostState3}}${EditorHostSans}${EditorHostRest5}${EditorHostState25}</style><body style="margin:0">${documentContextTest}</body>`
  );
}

function UseDocumentContextHtmlComponent(
  {
    html: html,
    title: title,
    fontCss = ``,
    mode = `light`,
    edgeMinLeft: edgeMinLeft,
    zoom: zoom,
    language: language,
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    <iframe
      {...originalJsxProps({
        "aria-label": title,
        sandbox: ``,
        srcDoc: resolveDocumentContextTest(
          html,
          fontCss,
          mode,
          title,
          edgeMinLeft,
          zoom,
          language,
        ),
        className: `block h-full w-full border-0`,
        [EditorSelectionAndTablesDataPagesPrintSurface]: ``,
      })}
    />
  );
}

var documentContextLimit2000: number;

var DocumentContextState3: number;

var documentContextLimit5000: number;

var documentContextSet3: Dynamic;

var documentContextLimit64: number;

var documentContextLimit10: number;

var documentContextLimit12: number;

function resolveDocumentContextTest2(
  documentContextTest2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let resolveDocumentContextTest2Result = /^(?:projects|users|skills)[/]/;
  return documentContextTest2 &&
    resolveDocumentContextTest2Result.test(documentContextTest2)
    ? documentContextTest2
    : options && resolveDocumentContextTest2Result.test(options)
      ? options
      : null;
}

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeDocumentContextCreateWidgetWritingCoordinatorStep1(): void {
  (documentContextPattern = /\p{Cf}/u);
  (resolveDocumentContextIsArray = (
    documentContextIsArray?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof documentContextIsArray == `object` &&
    !!documentContextIsArray &&
    !Array.isArray(documentContextIsArray));
  (resolveDocumentContextTrim = (
    documentContextTrim?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => documentContextTrim.split(`:`, 1)[0].trim());
  (resolveDocumentContextMessage = (
    error?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    error instanceof Error && error.message
      ? error.message
      : `the document couldn't be reached`);
  (resolveDocumentContextReason = (
    documentContextReason?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    ok: false,
    reason: resolveDocumentContextMessage(documentContextReason),
    ...(isDoorUnreachable(documentContextReason) ||
    !(documentContextReason instanceof Error)
      ? {
          unreachable: true,
        }
      : {}),
  }));
  (resolveDocumentContextReason2 = (
    documentContextReason2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    documentContextReason2.reason === `unavailable`
      ? {
          ok: false,
          reason: resolvePlatformSessionAndSourcesUnavailable(
            documentContextReason2.reason,
            resolvePlatformSessionAndSourcesData(documentContextReason2),
          ),
          code: `unavailable`,
          notNow: true,
        }
      : {
          ok: false,
          reason:
            documentContextReason2.reason +
            (documentContextReason2.detail
              ? `: ` + documentContextReason2.detail
              : ``),
          code: resolveDocumentContextTrim(documentContextReason2.reason),
        });
  (DocumentContextState = {
    ok: true,
  });
  (documentContextMap = new (Map as Dynamic)());
  (documentContextSet = new (Set as Dynamic)());
  (documentContextLimit0 = 0);
  (resolveDocumentContextValue3 = (
    ..._extraArguments: unknown[]
  ): undefined => {
    documentContextLimit0 += 1;
    for (let resolveDocumentContextValue3Result of documentContextSet as Dynamic)
      resolveDocumentContextValue3Result();
  });
  (clearDocumentContextDelete2 = (
    clearDocumentContextDelete22?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => (
    documentContextSet.add(clearDocumentContextDelete22),
    (..._extraArguments: unknown[]): Dynamic =>
      documentContextSet.delete(clearDocumentContextDelete22)
  ));
  (resolveDocumentContextValue4 = (
    ..._extraArguments: unknown[]
  ): Dynamic => documentContextLimit0);
  (documentContextSet2 = new (Set as Dynamic)([
    `lfile-unload`,
    `lfile-crash`,
    `lfile-error`,
  ]));
  (DocumentContextSetTimeout = {
    setTimeout: (
      documentContextSetTimeout?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) => setTimeout(documentContextSetTimeout, options),
    clearTimeout: (
      documentContextSetTimeout?: Dynamic,
      ..._extraArguments: unknown[]
    ) => clearTimeout(documentContextSetTimeout),
    setInterval: (
      documentContextSetTimeout?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) => setInterval(documentContextSetTimeout, options),
    clearInterval: (
      documentContextSetTimeout?: Dynamic,
      ..._extraArguments: unknown[]
    ) => clearInterval(documentContextSetTimeout),
    now: (..._extraArguments: unknown[]) => Date.now(),
  });
  (DocumentContextState2 = false);
  (documentContextLimit2000 = 2e3);
  (DocumentContextState3 = 600 * 1e3);
  (documentContextLimit5000 = 5e3);
  (documentContextSet3 = new (Set as Dynamic)([
    `ok`,
    `error`,
    `cancelled`,
  ]));
  (documentContextLimit64 = 64);
  (documentContextLimit10 = 10);
  (documentContextLimit12 = 12);
}

export {
  DocumentContextSetTimeout,
  DocumentContextState3,
  UseDocumentContextHtmlComponent,
  clearDocumentContextDelete,
  createWidgetWritingCoordinator,
  documentContextLimit10,
  documentContextLimit12,
  documentContextLimit2000,
  documentContextLimit5000,
  documentContextLimit64,
  documentContextSet3,
  documentFrameStyleAttributes,
  getDocumentContextValue,
  isDocumentContextSetTimeout,
  resolveDocumentContextTest2,
  updateDocumentContextProblems,
  useDocumentContextUseSyncExternalStore,
  useDocumentContextUseSyncExternalStore2,
  useDocumentContextWarm,
};
