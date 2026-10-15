/** BaoCut: document commands from index-CX4IZqzA.js. */
import type { Dynamic } from "./types";
import {
  PlatformFeatureFlagsState5,
  _onToastBridgeReady,
  frameHotProvide,
  isPlatformSyncAndRoutingTextarea,
  loadPlatformSyncAndRoutingClipboard,
  preloadModule,
  toast,
  toastStands,
  useCommentStore,
} from "./docs-app-dependencies";
import {
  isCommentSessionFeatureDisabled,
} from "./docs-app-comment-notifications-create-comment-notice-coordinator";
import {
  mapCommentComponentsType,
} from "./docs-app-comment-components-comment-editor";
import {
  documentCommandsMap,
  documentCommandsSet,
  resolveDocumentCommandsValue4,
} from "./docs-app-document-commands-create-selection-ask-coordinator";

function updateDocumentCommandsDuration(
  updateDocumentCommandsDuration2?: Dynamic,
  options: Dynamic = {},
  context: Dynamic = resolveDocumentCommandsValue4(),
  ..._extraArguments: unknown[]
): undefined {
  let raise: Dynamic =
    options.raise ??
    ((
      updateDocumentCommandsDuration4?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => void toast.info(updateDocumentCommandsDuration4, options2));
  let copySync: Dynamic =
    options.copySync ??
    ((
      updateDocumentCommandsDuration4?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      isPlatformSyncAndRoutingTextarea(updateDocumentCommandsDuration4, {}));
  let copy: Dynamic =
    options.copy ??
    ((
      updateDocumentCommandsDuration4?: Dynamic,
      ..._extraArguments: unknown[]
    ) => loadPlatformSyncAndRoutingClipboard(updateDocumentCommandsDuration4));
  let updateDocumentCommandsDurationHandler = (
    ..._extraArguments: unknown[]
  ): undefined => {
    documentCommandsSet.delete(context);
    documentCommandsMap.delete(context);
  };
  let updateDocumentCommandsDuration3 = (
    ..._extraArguments: unknown[]
  ): undefined => {
    try {
      updateDocumentCommandsDuration(
        updateDocumentCommandsDuration2,
        options,
        context,
      );
    } catch {
    } finally {
      documentCommandsSet.delete(context);
    }
  };
  documentCommandsMap.set(
    context,
    options.stands ??
      ((
        updateDocumentCommandsDuration4?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => toastStands(updateDocumentCommandsDuration4)),
  );
  raise(updateDocumentCommandsDuration2.title, {
    id: context,
    duration: 1 / 0,
    action: {
      label: updateDocumentCommandsDuration2.label,
      onClick: (..._extraArguments: unknown[]) => {
        if (copySync(updateDocumentCommandsDuration2.text))
          return updateDocumentCommandsDurationHandler();
        documentCommandsSet.add(context);
        let setTimeout2 = setTimeout(
          updateDocumentCommandsDuration3,
          options.lateMs ?? 1e4,
        );
        copy(updateDocumentCommandsDuration2.text).then(
          (result?: Dynamic, ..._extraArguments: unknown[]) => (
            clearTimeout(setTimeout2),
            result
              ? updateDocumentCommandsDurationHandler()
              : updateDocumentCommandsDuration3()
          ),
          (..._extraArguments: unknown[]) => (
            clearTimeout(setTimeout2),
            updateDocumentCommandsDuration3()
          ),
        );
      },
    },
  });
}

var documentCommandsPattern7: RegExp;

var filterDocumentCommandsFilter2: Dynamic;

async function loadDocumentCommandsGone(
  ..._extraArguments: unknown[]
): Promise<undefined> {
  let loadDocumentCommandsGoneResult: Dynamic = await preloadModule(
    (..._extraArguments: unknown[]): Dynamic => import("./claude-ask-card"),
    [],
    import.meta.url,
  );
  await new (Promise as Dynamic)(
    (resolve?: Dynamic, ..._extraArguments: unknown[]) =>
      _onToastBridgeReady(resolve),
  );
  for (let loadDocumentCommandsGoneResult2 of filterDocumentCommandsFilter2() as Dynamic) {
    let replyDraftItem: Dynamic =
      useCommentStore.getState().replyDrafts[loadDocumentCommandsGoneResult2];
    let dockParkedNotice: Dynamic =
      loadDocumentCommandsGoneResult.dockParkedNotice({
        gone: isCommentSessionFeatureDisabled(),
        parked:
          replyDraftItem === undefined
            ? null
            : mapCommentComponentsType(replyDraftItem.json),
      });
    if (dockParkedNotice !== null) {
      updateDocumentCommandsDuration(dockParkedNotice);
      useCommentStore
        .getState()
        .stashReplyDraft(loadDocumentCommandsGoneResult2, null);
    }
  }
}

var DocumentCommandsState6: boolean;

var DocumentCommandsState7: boolean;

function resolveDocumentCommandsFinally(
  ..._extraArguments: unknown[]
): undefined {
  try {
    if (
      !isCommentSessionFeatureDisabled() ||
      filterDocumentCommandsFilter2().length === 0
    )
      return;
    if (DocumentCommandsState6) return void (DocumentCommandsState7 = true);
    DocumentCommandsState6 = true;
    loadDocumentCommandsGone()
      .catch((..._extraArguments: unknown[]): undefined => undefined)
      .finally((..._extraArguments: unknown[]): undefined => {
        let DocumentCommandsState72 = DocumentCommandsState7;
        DocumentCommandsState6 = DocumentCommandsState7 = false;
        if (DocumentCommandsState72) {
          resolveDocumentCommandsFinally();
        }
      });
  } catch {}
}

function resolveDocumentCommandsSubscribe(
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [
    useCommentStore.subscribe(
      (
        documentCommandsSubscribe?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined =>
        void (
          documentCommandsSubscribe.replyDrafts !== options.replyDrafts &&
          resolveDocumentCommandsFinally()
        ),
    ),
    PlatformFeatureFlagsState5(resolveDocumentCommandsFinally),
  ];
  resolveDocumentCommandsFinally();
  return (..._extraArguments: unknown[]): Dynamic =>
    items.forEach(
      (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => item(),
    );
}

var documentCommandsSet2: Dynamic;

var ASK_RETRY_DELAY_MS: number;

var documentCommandsLimit6000: number;

var documentCommandsLimit2000: number;

var resolveDocumentCommandsFrom: Dynamic;

function mapDocumentCommandsTitle(
  mapDocumentCommandsTitle2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let mapDocumentCommandsTitle3: Dynamic = mapDocumentCommandsTitle2;
  if (
    !mapDocumentCommandsTitle3 ||
    typeof mapDocumentCommandsTitle3.title != `string` ||
    typeof mapDocumentCommandsTitle3.before != `string` ||
    typeof mapDocumentCommandsTitle3.after != `string`
  )
    return;
  let join: Dynamic = (
    mapDocumentCommandsTitle4?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    mapDocumentCommandsTitle4
      .split(
        `
`,
      )
      .map(
        (textPart?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          textPart.split(`	`).map(resolveDocumentCommandsReplace4).join(`	`),
      ).join(`
`);
  let heading: Dynamic =
    typeof mapDocumentCommandsTitle3.heading == `number` &&
    Number.isInteger(mapDocumentCommandsTitle3.heading) &&
    mapDocumentCommandsTitle3.heading >= 1 &&
    mapDocumentCommandsTitle3.heading <= 6
      ? mapDocumentCommandsTitle3.heading
      : undefined;
  return {
    title: resolveDocumentCommandsFrom(
      normalizeClaudeRequestText(mapDocumentCommandsTitle3.title),
      200,
    ),
    before: resolveDocumentCommandsFrom(
      join(mapDocumentCommandsTitle3.before),
      documentCommandsLimit6000,
      true,
    ),
    after: resolveDocumentCommandsFrom(
      join(mapDocumentCommandsTitle3.after),
      documentCommandsLimit2000,
    ),
    ...(heading !== undefined && {
      heading: heading,
    }),
  };
}

var documentCommandsPattern8: RegExp;

var documentCommandsPattern9: RegExp;

var documentCommandsPattern10: RegExp;

var documentCommandsPattern11: RegExp;

var documentCommandsPattern12: RegExp;

var resolveDocumentCommandsFrom2: Dynamic;

var resolveDocumentCommandsReplace3: Dynamic;

var resolveDocumentCommandsReplace4: Dynamic;

var normalizeClaudeRequestText: Dynamic;

var isEmptyClaudeRequest: (emptyClaudeRequest?: Dynamic, ..._extraArguments: unknown[]) => boolean;

var DocumentCommands_CLAUDEWRITINGSIM: string;

function resolveDocumentCommandsGetPrototypeOf(
  documentCommandsGetPrototype?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let documentCommandsGetPrototypeItem: Dynamic =
    documentCommandsGetPrototype[DocumentCommands_CLAUDEWRITINGSIM];
  return documentCommandsGetPrototypeItem === true
    ? {}
    : typeof documentCommandsGetPrototypeItem == `object` &&
        documentCommandsGetPrototypeItem &&
        Object.getPrototypeOf(documentCommandsGetPrototypeItem) ===
          Object.prototype
      ? documentCommandsGetPrototypeItem
      : null;
}

var isDocumentCommandsValue: Dynamic;

function resolveDocumentCommandsStarted(
  documentCommandsStarted?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return documentCommandsStarted.started ||
    !documentCommandsStarted.wants ||
    documentCommandsStarted.closed
    ? `nothing`
    : documentCommandsStarted.told === null
      ? `start`
      : documentCommandsStarted.told === undefined
        ? `start_late`
        : `nothing`;
}

function resolveDocumentCommandsTold(
  documentCommands?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    documentCommands.told === undefined &&
    documentCommands.wants &&
    !documentCommands.closed &&
    documentCommands.option !== undefined
  );
}

function isDocumentCommandsTold(
  documentCommands?: Dynamic,
  options: Dynamic = isCommentSessionFeatureDisabled(),
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    !options &&
    documentCommands.told === undefined &&
    !documentCommands.closed &&
    documentCommands.inFrame &&
    documentCommands.setting !== false &&
    (documentCommands.setting === true ||
      documentCommands.owner ||
      documentCommands.org !== false)
  );
}

function resolveDocumentCommandsStaff(
  documentCommandsStaff?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return documentCommandsStaff.staff
    ? documentCommandsStaff.setting === false
      ? `off_by_setting`
      : documentCommandsStaff.probe
        ? documentCommandsStaff.probe === `failed`
          ? `probe_failed`
          : documentCommandsStaff.probe.available
            ? documentCommandsStaff.probe.permission === `denied`
              ? `permission_denied`
              : documentCommandsStaff.probe.permission === `unavailable`
                ? `permission_unavailable`
                : null
            : `sample_not_served`
        : null
    : null;
}

function resolveDocumentCommandsWants(
  documentCommandsWants?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return documentCommandsWants.wants
    ? documentCommandsWants.probed === null
      ? `late`
      : null
    : documentCommandsWants.started
      ? `unwanted_at_mount`
      : null;
}

function resolveDocumentCommandsSimulated(
  documentCommandsSimulated?: Dynamic,
  options?: Dynamic,
  context: Dynamic = false,
  dependencies: Dynamic = null,
  ..._extraArguments: unknown[]
) {
  if (!documentCommandsSimulated) return;
  if (resolveDocumentCommandsGetPrototypeOf(options) !== null)
    return {
      simulated: true,
    };
  let claude: Dynamic = options.claude;
  return context && typeof claude?.use == `function` && dependencies === true
    ? {
        simulated: false,
      }
    : undefined;
}

function resolveDocumentCommandsValue5(
  documentCommandsValue5?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    documentCommandsValue5 && options !== `denied` && options !== `unavailable`
  );
}

var resolveDocumentCommandsTold2: Dynamic;

var resolveDocumentCommandsRound: Dynamic;

function resolveDocumentCommandsStaff2(
  documentCommandsStaff2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let what = documentCommandsStaff2.silentSaid
    ? null
    : resolveDocumentCommandsStaff({
        staff: options.staff(),
        setting: options.setting(),
        ...(documentCommandsStaff2.reads && {
          probe: documentCommandsStaff2.reads,
        }),
      });
  if (what !== null) {
    documentCommandsStaff2.silentSaid = true;
    options.ring({
      what: what,
    });
  }
}

function resolveDocumentCommandsTold3(
  documentCommands?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let option: Dynamic = options.option(documentCommands.probed);
  if (
    !(
      documentCommands.upgrading ||
      !resolveDocumentCommandsTold({
        told: documentCommands.told.current,
        wants: options.wants(),
        closed: documentCommands.closed,
        option: option,
      })
    )
  ) {
    if (!documentCommands.later) {
      if (!documentCommands.skipSaid) {
        options.ring({
          what: `upgrade_skipped`,
          wantedMs: documentCommands.wantedMs,
          mountMs: documentCommands.mountMs,
          probeMs: documentCommands.probeMs,
        });
      }
      documentCommands.skipSaid = true;
      return;
    }
    documentCommands.told.current = option;
    documentCommands.upgrading = true;
    options.loadCard().then((..._extraArguments: unknown[]): Dynamic => {
      if (
        options.gone() ||
        documentCommands.closed ||
        documentCommands.told.current !== option
      )
        return;
      if (!options.cardReady()) {
        documentCommands.told.current = undefined;
        options.changed();
        return options.ring({
          what: `card_load_failed`,
          wantedMs: documentCommands.wantedMs,
          mountMs: documentCommands.mountMs,
          probeMs: documentCommands.probeMs,
        });
      }
      let via: Dynamic = options.arm(option.simulated);
      options.changed();
      options.ring({
        what: `upgraded`,
        ...(documentCommands.half && {
          why: documentCommands.half,
        }),
        via: via,
        wantedMs: documentCommands.wantedMs,
        mountMs: documentCommands.mountMs,
        probeMs: documentCommands.probeMs,
      });
    });
  }
}

function resolveDocumentCommandsStarted2(
  documentCommandsStarted2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  resolveDocumentCommandsStaff2(documentCommandsStarted2, options);
  let documentCommandsStarted = resolveDocumentCommandsStarted({
    started: documentCommandsStarted2.started,
    wants: options.wants(),
    told: documentCommandsStarted2.told.current,
    closed: documentCommandsStarted2.closed,
  });
  if (documentCommandsStarted === `nothing`)
    return resolveDocumentCommandsTold3(documentCommandsStarted2, options);
  documentCommandsStarted2.wantedMs ??= resolveDocumentCommandsRound(
    documentCommandsStarted2,
    options,
  );
  if (documentCommandsStarted === `start_late`) {
    documentCommandsStarted2.half = `staff_answer`;
    options.ring({
      what: `staff_answer_late`,
      wantedMs: documentCommandsStarted2.wantedMs,
      mountMs: documentCommandsStarted2.mountMs,
    });
  }
  documentCommandsStarted2.started = true;
  (options.inFrame() && !options.simulation()
    ? options.reads().then(
        (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
          (documentCommandsStarted2.reads = result),
          resolveDocumentCommandsValue5(result.available, result.permission)
        ),
        (..._extraArguments: unknown[]) => (
          (documentCommandsStarted2.reads = `failed`),
          false
        ),
      )
    : Promise.resolve(null)
  ).then((result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    if (!options.gone()) {
      documentCommandsStarted2.probed = result;
      documentCommandsStarted2.probeMs ??= resolveDocumentCommandsRound(
        documentCommandsStarted2,
        options,
      );
      resolveDocumentCommandsStaff2(documentCommandsStarted2, options);
      if (
        documentCommandsStarted2.told.current !== undefined &&
        options.option(result)
      ) {
        options.loadCard();
      }
      resolveDocumentCommandsTold3(documentCommandsStarted2, options);
    }
  });
}

function resolveDocumentCommandsClaudeWriting(
  documentCommandsClaudeWriting?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let resolveDocumentCommandsClaudeWritingHandler: Dynamic = (
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    claudeWriting: documentCommandsClaudeWriting.told.current ?? undefined,
    later:
      documentCommandsClaudeWriting.told.current === undefined &&
      documentCommandsClaudeWriting.later &&
      !documentCommandsClaudeWriting.closed,
  });
  if (documentCommandsClaudeWriting.told.current !== null)
    return resolveDocumentCommandsClaudeWritingHandler();
  let what =
    options.inFrame() && !options.simulation()
      ? resolveDocumentCommandsWants({
          wants: options.wants(),
          probed: documentCommandsClaudeWriting.probed,
          started: documentCommandsClaudeWriting.started,
        })
      : null;
  documentCommandsClaudeWriting.mountMs ??= resolveDocumentCommandsRound(
    documentCommandsClaudeWriting,
    options,
  );
  if (what !== null) {
    options.ring({
      what: what,
      mountMs: documentCommandsClaudeWriting.mountMs,
      wantedMs: documentCommandsClaudeWriting.wantedMs,
    });
  }
  if (what === `late`) {
    documentCommandsClaudeWriting.half = `probe`;
  }
  documentCommandsClaudeWriting.told.current = options.option(
    documentCommandsClaudeWriting.probed,
  );
  if (documentCommandsClaudeWriting.told.current) {
    options.loadCard();
  }
  documentCommandsClaudeWriting.later = isDocumentCommandsTold({
    told: documentCommandsClaudeWriting.told.current,
    closed: documentCommandsClaudeWriting.closed,
    setting: options.setting(),
    owner: options.owner(),
    org: options.org(),
    inFrame: options.inFrame(),
  });
  return resolveDocumentCommandsClaudeWritingHandler();
}

function resolveDocumentCommandsCurrent(
  documentCommandsCurrent?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  documentCommandsCurrent.told.current = undefined;
  documentCommandsCurrent.closed = true;
}

var documentCommandsLimit1000: number;

var documentCommandsLimit10002: number;

function createAskCardRequestPool(
  deps?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let lookup: Dynamic = new (Map as Dynamic)();
  let lookup2: Dynamic = new (Map as Dynamic)();
  let state = {
    closed: false,
    realAsks: 0,
    lastRealAsk: -1 / 0,
  };
  let createAskCardRequestPoolResult: Dynamic = null;
  let createAskCardRequestPoolHandler: Dynamic =
    (run?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
    (error?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (lookup.has(run)) {
        if (error.t === `done` || error.t === `error`) {
          lookup.delete(run);
        }
        if (error.t === `error` && documentCommandsSet2.has(error.code)) {
          state.closed = true;
        }
        deps.post({
          type: `claude-run-event`,
          run: run,
          ev: error,
        });
      }
    };
  let lookupEntry = (
    askCardRequestPool?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    lookup.get(askCardRequestPool)?.();
    lookup.delete(askCardRequestPool);
  };
  let createAskCardRequestPoolHandler2 = (
    askCardRequestPool?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let lookupEntry2: Dynamic = lookup.get(askCardRequestPool);
    let enabled = false;
    let onNotAllowed = (
      askCardRequestPool2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        !enabled &&
        ((enabled = true),
        deps.timers.clearTimeout(setTimeout2),
        !(
          lookupEntry2 === undefined ||
          lookup.get(askCardRequestPool) !== lookupEntry2
        ))
      )
        try {
          if (askCardRequestPool2 === `prompt`) {
            deps.onNotAllowed?.(options);
          }
        } finally {
          context();
        }
    };
    let setTimeout2: Dynamic = deps.timers.setTimeout(
      (..._extraArguments: unknown[]) => onNotAllowed(null),
      documentCommandsLimit10002,
    );
    Promise.resolve()
      .then(
        (..._extraArguments: unknown[]): Dynamic => deps.allowed?.() ?? null,
      )
      .then(onNotAllowed, (..._extraArguments: unknown[]) =>
        onNotAllowed(null),
      );
  };
  let closeFor = (
    askCardRequestPool?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (documentCommandsSet2.has(options)) {
      state.closed = true;
      deps.onClosed?.(askCardRequestPool);
    }
  };
  return {
    async decide(
      card?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> {
      let createAskCardRequestPoolResult2: Dynamic = null;
      try {
        let told: Dynamic = deps.told();
        if (!told || state.closed)
          return {
            failed: `off`,
          };
        let words: Dynamic = deps.verdictWords(card);
        if (words === null)
          return {
            failed: `no_card_send`,
          };
        let live: Dynamic = told.simulated ? true : deps.gestureLive();
        for (let createAskCardRequestPoolResult3 of lookup2.values() as Dynamic)
          createAskCardRequestPoolResult3.abort();
        lookup2.clear();
        createAskCardRequestPoolResult2 = new AbortController();
        lookup2.set(card, createAskCardRequestPoolResult2);
        let decideAsk: Dynamic = await (
          await deps.loadVerdict()
        ).decideAsk(
          {
            deps: deps,
            state: state,
            closeFor: closeFor,
            minGapMs: documentCommandsLimit1000,
            perView: 60,
          },
          {
            card: card,
            words: words,
            simulated: told.simulated,
            live: live,
            signal: createAskCardRequestPoolResult2.signal,
          },
        );
        if (!told.simulated && `verdict` in decideAsk) {
          createAskCardRequestPoolResult = card;
        }
        return decideAsk;
      } catch {
        return {
          failed: `load_failed`,
        };
      } finally {
        if (
          createAskCardRequestPoolResult2 !== null &&
          lookup2.get(card) === createAskCardRequestPoolResult2
        ) {
          lookup2.delete(card);
        }
      }
    },
    stopDeciding(
      askCardRequestPool?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      lookup2.get(askCardRequestPool)?.abort();
      lookup2.delete(askCardRequestPool);
    },
    unspent(
      askCardRequestPool?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (createAskCardRequestPoolResult === askCardRequestPool) {
        createAskCardRequestPoolResult = null;
        --state.realAsks;
      }
    },
    live: (..._extraArguments: unknown[]) =>
      lookup2.size > 0 || lookup.size > 0,
    onMessage(
      askCardRequestPool?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let askCardRequestPool2: Dynamic = askCardRequestPool;
      if (
        !askCardRequestPool2 ||
        typeof askCardRequestPool2.run != `number` ||
        !Number.isFinite(askCardRequestPool2.run) ||
        (askCardRequestPool2.type !== `claude-run-start` &&
          askCardRequestPool2.type !== `claude-run-stop`)
      )
        return false;
      let run: Dynamic = askCardRequestPool2.run;
      lookupEntry(run);
      if (askCardRequestPool2.type === `claude-run-stop`) return true;
      let told: Dynamic = deps.told();
      let post: Dynamic = (code?: Dynamic, ..._extraArguments: unknown[]) => (
        deps.post({
          type: `claude-run-event`,
          run: run,
          ev: {
            t: `error`,
            code: code,
          },
        }),
        true
      );
      if (!told || state.closed) return post(`off`);
      let card: Dynamic =
        typeof askCardRequestPool2.card == `number` &&
        Number.isFinite(askCardRequestPool2.card)
          ? askCardRequestPool2.card
          : null;
      if (lookup.size > 0) return post(`run_live`);
      let takeAsk: Dynamic = card === null ? null : deps.takeAsk(card);
      if (card === null || takeAsk === null) return post(`no_card_send`);
      if (createAskCardRequestPoolResult === card) {
        createAskCardRequestPoolResult = null;
      }
      let knobs: Dynamic = told.simulated ? (deps.knobs() ?? {}) : null;
      let ask: Dynamic = normalizeClaudeRequestText(
        Array.from<Dynamic>(takeAsk).slice(0, ASK_RETRY_DELAY_MS).join(``),
      );
      let askCardRequestPoolHandler: Dynamic = (
        error?: Dynamic,
        ..._extraArguments: unknown[]
      ) => {
        if (error.t === `error` && lookup.has(run)) {
          closeFor(card, error.code);
        }
        if (
          error.t === `error` &&
          error.code === `upstream_error` &&
          !knobs &&
          lookup.has(run) &&
          deps.allowed &&
          deps.onNotAllowed
        )
          return createAskCardRequestPoolHandler2(
            run,
            card,
            (..._extraArguments: unknown[]): Dynamic =>
              createAskCardRequestPoolHandler(run)(error),
          );
        createAskCardRequestPoolHandler(run)(error);
      };
      let enabled = false;
      lookup.set(
        run,
        (..._extraArguments: unknown[]): undefined => void (enabled = true),
      );
      let askCardRequestPoolHandler2: Dynamic = (
        ..._extraArguments: unknown[]
      ): Dynamic =>
        askCardRequestPoolHandler({
          t: `error`,
          code: `load_failed`,
        });
      let deps2 = (
        askCardRequestPool3?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (enabled || !lookup.has(run)) return;
        let askCardRequestPool4: Dynamic = askCardRequestPool3();
        if (lookup.has(run)) {
          lookup.set(run, askCardRequestPool4);
        }
      };
      if (knobs)
        deps
          .loadSim()
          .then(
            (result?: Dynamic, ..._extraArguments: unknown[]) =>
              deps2(
                (..._extraArguments: unknown[]): Dynamic =>
                  result.startSimulatedRun(
                    knobs,
                    deps.timers,
                    askCardRequestPoolHandler,
                    mapDocumentCommandsTitle(askCardRequestPool2.context)
                      ?.heading,
                  ),
              ),
            askCardRequestPoolHandler2,
          );
      else {
        let context: Dynamic = mapDocumentCommandsTitle(
          askCardRequestPool2.context,
        ) ?? {
          title: ``,
          before: ``,
          after: ``,
        };
        if (ask.trim() === ``) {
          askCardRequestPoolHandler({
            t: `error`,
            code: `empty_ask`,
          });
        } else {
          deps.loadSample().then(
            (result?: Dynamic, ..._extraArguments: unknown[]) =>
              deps2(
                (..._extraArguments: unknown[]): Dynamic =>
                  result.startSampleRun(
                    deps.sampler,
                    {
                      ask: ask,
                      context: context,
                    },
                    askCardRequestPoolHandler,
                    deps.timers,
                  ),
              ),
            askCardRequestPoolHandler2,
          );
        }
      }
      return true;
    },
    dispose(..._extraArguments: unknown[]): undefined {
      for (let createAskCardRequestPoolResult2 of lookup.values() as Dynamic)
        createAskCardRequestPoolResult2();
      lookup.clear();
      for (let createAskCardRequestPoolResult2 of lookup2.values() as Dynamic)
        createAskCardRequestPoolResult2.abort();
      lookup2.clear();
    },
  };
}

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeDocumentCommandsCreateAskCardRequestPoolStep1(): void {
  frameHotProvide(`ask_unsent`, {
    collect: (..._extraArguments: unknown[]) => null,
    restore: (..._extraArguments: unknown[]): undefined => {},
    carriedUnsaved: (..._extraArguments: unknown[]) => false,
    hold: (..._extraArguments: unknown[]) => {
      for (let [localResult, localResult2] of documentCommandsMap as Dynamic) {
        let enabled: Dynamic = true;
        try {
          enabled =
            documentCommandsSet.has(localResult) || localResult2(localResult);
        } catch {
          enabled = true;
        }
        if (!enabled) {
          documentCommandsMap.delete(localResult);
        }
      }
      return documentCommandsMap.size > 0;
    },
  });
  (documentCommandsPattern7 = /^dock-ask:/);
  (filterDocumentCommandsFilter2 = (..._extraArguments: unknown[]) =>
    Object.keys(useCommentStore.getState().replyDrafts).filter(
      (replyDraftsKey?: Dynamic, ..._extraArguments: unknown[]) =>
        documentCommandsPattern7.test(replyDraftsKey),
    ));
  (DocumentCommandsState6 = false);
  (DocumentCommandsState7 = false);
  (documentCommandsSet2 = new (Set as Dynamic)([
    `not_granted`,
    `sampling_disabled`,
    `not_declared`,
    `capability_disabled`,
    `capability_removed`,
    `images_unavailable`,
    `unavailable`,
    `off`,
    `too_many`,
    `invalid_request`,
  ]));
  (ASK_RETRY_DELAY_MS = 4e3);
  (documentCommandsLimit6000 = 6e3);
  (documentCommandsLimit2000 = 2e3);
  (resolveDocumentCommandsFrom = (
    documentCommands?: Dynamic,
    options?: Dynamic,
    context: Dynamic = false,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let documentCommands2: Dynamic = Array.from<Dynamic>(documentCommands);
    return (
      context
        ? documentCommands2.slice(-options)
        : documentCommands2.slice(0, options)
    ).join(``);
  });
  (documentCommandsPattern8 = /[\p{C}\p{Default_Ignorable_Code_Point}]+/gu);
  (documentCommandsPattern9 = /^[\p{Extended_Pictographic}\p{Emoji_Modifier}]$/u);
  (documentCommandsPattern10 = /^[0-9#*]$/);
  (documentCommandsPattern11 = /^[\p{Script_Extensions=Arabic}\p{Script_Extensions=Syriac}\p{Script_Extensions=Mongolian}\p{Script_Extensions=Devanagari}\p{Script_Extensions=Bengali}\p{Script_Extensions=Gurmukhi}\p{Script_Extensions=Gujarati}\p{Script_Extensions=Oriya}\p{Script_Extensions=Tamil}\p{Script_Extensions=Telugu}\p{Script_Extensions=Kannada}\p{Script_Extensions=Malayalam}\p{Script_Extensions=Sinhala}\p{Script_Extensions=Khmer}\p{Script_Extensions=Myanmar}\p{Script_Extensions=Tibetan}\p{Script_Extensions=Thai}\p{Script_Extensions=Lao}]$/u);
  (documentCommandsPattern12 = /^\p{Script_Extensions=Mongolian}$/u);
  (resolveDocumentCommandsFrom2 = (
    documentCommands?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let pop: Dynamic = Array.from<Dynamic>(options.slice(-2)).pop() ?? ``;
    return documentCommands === `️` || documentCommands === `︎`
      ? documentCommandsPattern9.test(pop) ||
          (documentCommandsPattern10.test(pop) && context === `⃣`)
      : /^[\u180b-\u180d\u180f]$/.test(documentCommands)
        ? documentCommandsPattern12.test(pop)
        : documentCommands === `️‍`
          ? documentCommandsPattern9.test(pop)
          : documentCommands === `‍` || documentCommands === `‌`
            ? documentCommandsPattern9.test(pop) ||
              documentCommandsPattern11.test(pop)
            : false;
  });
  (resolveDocumentCommandsReplace3 = (
    documentCommandsReplace3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    documentCommandsReplace3.replace(
      RegExp(`[⠀𝅙]|[^\\S\\n\\t \\ufeff]`, `gu`),
      ` `,
    ));
  (resolveDocumentCommandsReplace4 = (
    documentCommandsReplace4?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveDocumentCommandsReplace3(documentCommandsReplace4).replace(
      documentCommandsPattern8,
      (
        items?: Dynamic,
        options?: Dynamic,
        context?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        resolveDocumentCommandsFrom2(
          items,
          context.slice(Math.max(0, options - 2), options),
          context[options + items.length] ?? ``,
        )
          ? items
          : ``,
    ));
  (normalizeClaudeRequestText = (
    claudeRequestText?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveDocumentCommandsReplace4(
      claudeRequestText
        .replaceAll(`﻿`, ``)
        .replace(
          RegExp(`[\\u0000-\\u001f\\u007f-\\u009f\\u2028\\u2029\\s⠀𝅙]+`, `gu`),
          ` `,
        ),
    )
      .replace(/ {2,}/g, ` `)
      .trim());
  (isEmptyClaudeRequest = (
    emptyClaudeRequest?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    emptyClaudeRequest
      .replace(/^\s*@(?:Claude|Agent)\u2060?\s*/i, ``)
      .split(
        `
`,
      )
      .map(normalizeClaudeRequestText)
      .join(``)
      .trim() === ``);
  (DocumentCommands_CLAUDEWRITINGSIM = `__CLAUDE_WRITING_SIM`);
  (isDocumentCommandsValue = (
    documentCommandsValue?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    dependencies: Dynamic = isCommentSessionFeatureDisabled(),
    ..._extraArguments: unknown[]
  ): Dynamic =>
    !dependencies && (documentCommandsValue ?? (options === true || context)));
  (resolveDocumentCommandsTold2 = (
    told?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    told: told,
    started: false,
    closed: false,
    probed: null,
    reads: null,
    half: null,
    silentSaid: false,
    upgrading: false,
    later: false,
    skipSaid: false,
    t0: options,
  }));
  (resolveDocumentCommandsRound = (
    documentCommandsRound?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => Math.round(options.now() - documentCommandsRound.t0));
  (documentCommandsLimit1000 = 1e3);
  (documentCommandsLimit10002 = 1e3);
}

export {
  ASK_RETRY_DELAY_MS,
  createAskCardRequestPool,
  isDocumentCommandsValue,
  isEmptyClaudeRequest,
  normalizeClaudeRequestText,
  resolveDocumentCommandsClaudeWriting,
  resolveDocumentCommandsCurrent,
  resolveDocumentCommandsGetPrototypeOf,
  resolveDocumentCommandsSimulated,
  resolveDocumentCommandsStarted2,
  resolveDocumentCommandsSubscribe,
  resolveDocumentCommandsTold2,
  updateDocumentCommandsDuration,
};
