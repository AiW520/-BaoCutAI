/** BaoCut: document host state from index-CX4IZqzA.js. */
import type { Dynamic } from "./types";
import {
  AvatarGroup,
  PlatformApiAndAuthColor,
  PlatformApiAndAuthPriming,
  PlatformApiAndAuthUser,
  Tooltip,
  createPagesWriteIntegrityEndEvent,
  createPagesWriteIntegrityEvent,
  createPagesWriteIntegrityGapEvent,
  frameFacesSubscribe,
  frameHostChrome,
  framePeekProfile,
  frameProfiles,
  frameViewerFace,
  isFrameArtifact,
  isPlatformApiAndAuthAnon,
  isPlatformSessionAndSourcesToLowerCase,
  originalJsxProps,
  resolveDataContentAndReferencesValue5,
  resolveEditorAnchorsAndMentionsOther,
  resolveObservabilityBrowserAndOperationEventsKey2,
  resolveObservabilityBrowserAndOperationEventsKey3,
  resolveObservabilityBrowserAndOperationEventsTaken,
  resolvePlatformApiAndAuthAgent,
  resolvePlatformApiAndAuthAnon,
  resolvePlatformApiAndAuthAntspace,
  resolvePlatformApiAndAuthCharCodeAt,
  resolvePlatformApiAndAuthHuman4,
  resolvePlatformApiAndAuthSplit2,
  resolvePlatformApiAndAuthTest,
  resolvePlatformApiAndAuthToLowerCase,
  resolvePlatformSessionAndSourcesValue,
  useCommentsEditorThen,
} from "./docs-app-dependencies";
import {
  React,
} from "./docs-app-bootstrap";
import {
  CollaboratorAvatar,
} from "./docs-app-comment-notifications-create-comment-notice-coordinator";
import {
  DocumentHostStateState5,
  DocumentHostStateState6,
  DocumentHostStateState7,
  DocumentHostStateState8,
  documentHostStateLimit20003,
  documentHostStateLimit300002,
  documentHostStateLimit4096,
  filterDocumentHostStateFilter,
} from "./docs-app-document-host-state-create-document-host-coordinator";

function createDocumentHostHealthMonitor(
  documentHostHealthMonitor?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let options2: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
    try {
      return options?.();
    } catch {
      return;
    }
  };
  let local = 0;
  let handed = 0;
  let sent = 0;
  let acked = 0;
  let createDocumentHostHealthMonitorResult: Dynamic = null;
  let amount: Dynamic = -1 / 0;
  let amount2: Dynamic = -1 / 0;
  let gap = false;
  let enabled = false;
  let createDocumentHostHealthMonitorResult2: Dynamic = null;
  let index = 0;
  let createDocumentHostHealthMonitorResult3: Dynamic = null;
  let enabled2 = false;
  let createDocumentHostHealthMonitorHandler = (
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      createDocumentHostHealthMonitorResult3 !== null &&
      createDocumentHostHealthMonitorResult !== null &&
      !enabled2
    ) {
      createDocumentHostHealthMonitorResult2 ??=
        createDocumentHostHealthMonitorResult3;
    }
    createDocumentHostHealthMonitorResult3 = null;
  };
  let createDocumentHostHealthMonitorHandler2: Dynamic = (
    ..._extraArguments: unknown[]
  ) => ({
    rung: 0,
    rows: {
      timer: 0,
      hidden: 0,
      reseat: 0,
    },
    lastRowAt: {
      timer: -1 / 0,
      hidden: -1 / 0,
      reseat: -1 / 0,
    },
  });
  let documentHostHealthMonitorHandler: Dynamic =
    createDocumentHostHealthMonitorHandler2();
  let createDocumentHostHealthMonitorResult4: Dynamic = null;
  let amount3: Dynamic = -1 / 0;
  let hold = `none`;
  let lookup: Dynamic = new (Map as Dynamic)();
  let settled = 0;
  let lastAt: Dynamic = null;
  let createDocumentHostHealthMonitorResult5: Dynamic = null;
  let oldest: Dynamic;
  let createDocumentHostHealthMonitorResult6: Dynamic;
  let amount4: Dynamic = -1 / 0;
  let createDocumentHostHealthMonitorResult7: Dynamic = null;
  let index2 = 0;
  let createDocumentHostHealthMonitorResult8: Dynamic = null;
  let count = 0;
  let createDocumentHostHealthMonitorResult9: Dynamic = null;
  let enabled3 = false;
  let createDocumentHostHealthMonitorHandler3: Dynamic = (
    documentHostHealthMonitor3?: Dynamic,
    options3?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof options3 == `string` && documentHostHealthMonitor3.includes(options3)
      ? options3
      : undefined;
  let createDocumentHostHealthMonitorHandler4 = (
    ..._extraArguments: unknown[]
  ): undefined =>
    void ((createDocumentHostHealthMonitorResult7 = false), (index2 = 0));
  let createDocumentHostHealthMonitorHandler5 = (
    documentHostHealthMonitor3?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    createDocumentHostHealthMonitorResult = documentHostHealthMonitor3;
    documentHostHealthMonitorHandler =
      createDocumentHostHealthMonitorHandler2();
    gap = false;
    createDocumentHostHealthMonitorResult7 = null;
  };
  let createDocumentHostHealthMonitorHandler6 = (
    ..._extraArguments: unknown[]
  ) => {
    let difference =
      (createDocumentHostHealthMonitorResult ?? 0) -
      documentHostStateLimit20003;
    return amount < difference
      ? `unhanded`
      : amount2 < difference
        ? `unsent`
        : `unacked`;
  };
  let createDocumentHostHealthMonitorHandler7: Dynamic = (
    ..._extraArguments: unknown[]
  ) => {
    if (hold === `flight` && handed > 0) {
      if (handed > settled)
        return [...lookup.values()].includes(true)
          ? `ackeaten`
          : amount2 < (createDocumentHostHealthMonitorResult ?? 0) - 2e3
            ? `unsent`
            : `unacked`;
      if (
        lastAt !== null &&
        createDocumentHostHealthMonitorResult5 !== null &&
        lastAt >= createDocumentHostHealthMonitorResult5
      )
        return `ackheld`;
    }
    return createDocumentHostHealthMonitorHandler6();
  };
  let counts: Dynamic = (
    documentHostHealthMonitor3?: Dynamic,
    ..._extraArguments: unknown[]
  ) => ({
    local: local,
    handed: handed,
    sent: sent,
    acked: acked,
    dirtyS:
      createDocumentHostHealthMonitorResult === null
        ? 0
        : Math.max(
            0,
            Math.round(
              (documentHostHealthMonitor3 -
                createDocumentHostHealthMonitorResult) /
                1e3,
            ),
          ),
    upS:
      createDocumentHostHealthMonitorResult4 === null
        ? -1
        : Math.max(
            0,
            Math.round(
              (documentHostHealthMonitor3 -
                createDocumentHostHealthMonitorResult4) /
                1e3,
            ),
          ),
    hold: hold,
    ...(lastAt !== null &&
    createDocumentHostHealthMonitorHandler7() !==
      createDocumentHostHealthMonitorHandler6()
      ? {
          downS: Math.max(
            0,
            Math.round((documentHostHealthMonitor3 - lastAt) / 1e3),
          ),
        }
      : {}),
  });
  let round = (
    documentHostHealthMonitor3?: Dynamic,
    options3?: Dynamic,
    context?: Dynamic,
    dependencies?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let createDocumentHostHealthMonitorResult10: Dynamic =
      createDocumentHostHealthMonitorResult2;
    createDocumentHostHealthMonitorResult2 = null;
    if (!(createDocumentHostHealthMonitorResult10 === null || enabled2)) {
      documentHostHealthMonitor(
        createPagesWriteIntegrityEndEvent(
          documentHostHealthMonitor3,
          options3,
          context,
          Math.round(
            (dependencies - createDocumentHostHealthMonitorResult10) / 1e3,
          ),
          ++index,
        ),
      );
      if (documentHostHealthMonitor3 === `closed`) {
        createDocumentHostHealthMonitorResult3 =
          createDocumentHostHealthMonitorResult10;
      }
    }
  };
  let createDocumentHostHealthMonitorHandler8 = (
    documentHostHealthMonitor3?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    gap = true;
    enabled = true;
    documentHostHealthMonitorHandler.rung = filterDocumentHostStateFilter(
      documentHostHealthMonitor3 -
        (createDocumentHostHealthMonitorResult ?? documentHostHealthMonitor3) +
        documentHostStateLimit300002,
    );
    if (
      documentHostHealthMonitor(
        createPagesWriteIntegrityGapEvent(
          createDocumentHostHealthMonitorHandler7(),
          counts(documentHostHealthMonitor3),
          options2(),
        ),
      ) !== false
    ) {
      createDocumentHostHealthMonitorResult2 ??=
        createDocumentHostHealthMonitorResult ?? documentHostHealthMonitor3;
    }
    createDocumentHostHealthMonitorHandler4();
  };
  let createDocumentHostHealthMonitorHandler9: Dynamic = (
    documentHostHealthMonitor3?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    hold === `ime` &&
    createDocumentHostHealthMonitorResult !== null &&
    documentHostHealthMonitor3 - createDocumentHostHealthMonitorResult < 3e5;
  let documentHostHealthMonitor2 = (
    documentHostHealthMonitor3?: Dynamic,
    options3?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let matchesCreateDocumentHostHealthMonitorResult =
      createDocumentHostHealthMonitorResult !== null &&
      (gap || options3 - createDocumentHostHealthMonitorResult >= 3e4);
    let late =
      matchesCreateDocumentHostHealthMonitorResult &&
      documentHostHealthMonitorHandler.rows[documentHostHealthMonitor3] >=
        (documentHostHealthMonitor3 === `timer` ? 30 : 6);
    if (
      late &&
      options3 -
        documentHostHealthMonitorHandler.lastRowAt[documentHostHealthMonitor3] <
        3e5
    )
      return;
    amount3 = options3;
    let label: Dynamic =
      createDocumentHostHealthMonitorResult === null
        ? `clean`
        : createDocumentHostHealthMonitorHandler7();
    if (!matchesCreateDocumentHostHealthMonitorResult || label === `clean`) {
      documentHostHealthMonitor(
        createPagesWriteIntegrityEvent(
          documentHostHealthMonitor3,
          label,
          counts(options3),
        ),
      );
      return;
    }
    documentHostHealthMonitorHandler.rows[documentHostHealthMonitor3]++;
    documentHostHealthMonitorHandler.lastRowAt[documentHostHealthMonitor3] =
      options3;
    documentHostHealthMonitor(
      resolveObservabilityBrowserAndOperationEventsKey3(
        documentHostHealthMonitor3,
        label,
        counts(options3),
        {
          gap: gap,
          late: late,
        },
      ),
    );
  };
  return {
    local(
      documentHostHealthMonitor3?: Dynamic,
      options3?: Dynamic,
      context?: Dynamic,
      dependencies?: unknown,
      ..._extraArguments: unknown[]
    ): undefined {
      createDocumentHostHealthMonitorHandler();
      let record: Dynamic =
        !options3 && createDocumentHostHealthMonitorResult2 !== null
          ? {
              state: createDocumentHostHealthMonitorHandler7(),
              c: counts(context),
            }
          : null;
      if (
        Number.isFinite(documentHostHealthMonitor3) &&
        documentHostHealthMonitor3 > local
      ) {
        local = Math.floor(documentHostHealthMonitor3);
      }
      let isFinite2 =
        Number.isFinite(documentHostHealthMonitor3) &&
        Math.floor(documentHostHealthMonitor3) > count;
      if (Number.isFinite(documentHostHealthMonitor3)) {
        count = Math.floor(documentHostHealthMonitor3);
      }
      let matchesHold = hold === `ime`;
      hold =
        typeof dependencies != `string` || !dependencies
          ? `none`
          : DocumentHostStateState6.includes(dependencies)
            ? dependencies
            : `unrowed`;
      if (
        options3 &&
        (createDocumentHostHealthMonitorResult9 === null ||
          isFinite2 ||
          (matchesHold && hold !== `ime`))
      ) {
        createDocumentHostHealthMonitorResult9 = 0;
      }
      if (
        options3 &&
        (createDocumentHostHealthMonitorResult === null ||
          (matchesHold && hold !== `ime`))
      ) {
        createDocumentHostHealthMonitorHandler5(context);
      }
      if (!options3) {
        createDocumentHostHealthMonitorResult = null;
        documentHostHealthMonitorHandler =
          createDocumentHostHealthMonitorHandler2();
        gap = false;
        enabled = false;
        createDocumentHostHealthMonitorResult9 = null;
        enabled3 = false;
        hold = `none`;
        lookup.clear();
        settled = handed;
        if (record !== null) {
          round(`clean`, record.state, record.c, context);
        }
      }
      createDocumentHostHealthMonitorResult5 =
        hold === `flight`
          ? (createDocumentHostHealthMonitorResult5 ?? context)
          : null;
    },
    handed(
      documentHostHealthMonitor3?: Dynamic,
      options3?: unknown,
      ..._extraArguments: unknown[]
    ): undefined {
      amount = documentHostHealthMonitor3;
      if (!(typeof options3 == `string` && options3 && lookup.has(options3))) {
        handed++;
        if (!(typeof options3 != `string` || !options3)) {
          lookup.set(options3, false);
          if (lookup.size > documentHostStateLimit4096) {
            lookup.delete(lookup.keys().next().value);
          }
        }
      }
    },
    settledDown(
      documentHostHealthMonitor3?: Dynamic,
      options3?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      try {
        if (!lookup.delete(options3)) return;
        settled++;
        createDocumentHostHealthMonitorResult7 = null;
        createDocumentHostHealthMonitorResult8 = 0;
        if (Number.isFinite(documentHostHealthMonitor3)) {
          lastAt = documentHostHealthMonitor3;
        }
      } catch {}
    },
    downFailed(
      documentHostHealthMonitor3?: unknown,
      options3?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      try {
        if (lookup.has(options3)) {
          lookup.set(options3, true);
        }
      } catch {}
    },
    sent(request?: Dynamic, ..._extraArguments: unknown[]): undefined {
      sent++;
      amount2 = request;
    },
    acked(
      documentHostHealthMonitor3?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      acked++;
      createDocumentHostHealthMonitorHandler();
      if (
        createDocumentHostHealthMonitorResult !== null &&
        createDocumentHostHealthMonitorResult2 !== null
      ) {
        round(
          `acked`,
          createDocumentHostHealthMonitorHandler7(),
          counts(documentHostHealthMonitor3),
          documentHostHealthMonitor3,
        );
      }
      if (createDocumentHostHealthMonitorResult !== null) {
        createDocumentHostHealthMonitorHandler5(documentHostHealthMonitor3);
      }
    },
    lane(
      documentHostHealthMonitor3?: Dynamic,
      options3?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      createDocumentHostHealthMonitorResult4 = documentHostHealthMonitor3
        ? (createDocumentHostHealthMonitorResult4 ?? options3)
        : null;
    },
    tick(
      documentHostHealthMonitor3?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      createDocumentHostHealthMonitorHandler();
      if (
        createDocumentHostHealthMonitorResult !== null &&
        (!createDocumentHostHealthMonitorHandler9(documentHostHealthMonitor3) &&
          createDocumentHostHealthMonitorResult4 !== null &&
          !gap &&
          documentHostHealthMonitor3 -
            Math.max(
              createDocumentHostHealthMonitorResult,
              createDocumentHostHealthMonitorResult4,
            ) >=
            3e4 &&
          createDocumentHostHealthMonitorHandler8(documentHostHealthMonitor3),
        documentHostHealthMonitor3 - amount3 >= 6e4 &&
          documentHostHealthMonitor2(`timer`, documentHostHealthMonitor3),
        gap &&
          !createDocumentHostHealthMonitorHandler9(
            documentHostHealthMonitor3,
          ) &&
          createDocumentHostHealthMonitorResult4 !== null &&
          documentHostHealthMonitor3 -
            Math.max(
              createDocumentHostHealthMonitorResult,
              createDocumentHostHealthMonitorResult4,
            ) >=
            3e4)
      ) {
        let filterDocumentHostStateFilter2: Dynamic =
          filterDocumentHostStateFilter(
            documentHostHealthMonitor3 -
              createDocumentHostHealthMonitorResult +
              1,
          );
        if (
          filterDocumentHostStateFilter2 > documentHostHealthMonitorHandler.rung
        ) {
          documentHostHealthMonitorHandler.rung =
            filterDocumentHostStateFilter2;
          if (
            documentHostHealthMonitor(
              resolveObservabilityBrowserAndOperationEventsKey2(
                createDocumentHostHealthMonitorHandler7(),
                counts(documentHostHealthMonitor3),
                DocumentHostStateState5[filterDocumentHostStateFilter2 - 1],
                options2(),
              ),
            ) !== false
          ) {
            createDocumentHostHealthMonitorResult2 ??=
              createDocumentHostHealthMonitorResult;
          }
          createDocumentHostHealthMonitorHandler4();
        }
      }
    },
    snapshot(
      documentHostHealthMonitor3?: Dynamic,
      options3?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (createDocumentHostHealthMonitorResult !== null) {
        if (
          documentHostHealthMonitor3 === `hidden` &&
          !createDocumentHostHealthMonitorHandler9(options3) &&
          createDocumentHostHealthMonitorResult4 !== null &&
          !gap &&
          options3 -
            Math.max(
              createDocumentHostHealthMonitorResult,
              createDocumentHostHealthMonitorResult4,
            ) >=
            1e4
        ) {
          createDocumentHostHealthMonitorHandler8(options3);
        }
        documentHostHealthMonitor2(documentHostHealthMonitor3, options3);
      }
    },
    close(
      documentHostHealthMonitor3?: Dynamic,
      options3?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        createDocumentHostHealthMonitorResult !== null &&
        createDocumentHostHealthMonitorResult2 !== null
      ) {
        round(
          `closed`,
          createDocumentHostHealthMonitorHandler7(),
          counts(documentHostHealthMonitor3),
          documentHostHealthMonitor3,
        );
      }
      if (options3 === true) {
        enabled2 = true;
      }
      if (options3 === true) {
        enabled = false;
      }
    },
    counts: counts,
    gapOwed: (..._extraArguments: unknown[]) =>
      !enabled2 &&
      createDocumentHostHealthMonitorResult !== null &&
      (gap || enabled),
    verdictsDown: (..._extraArguments: unknown[]): Dynamic => ({
      settled: settled,
      lastAt: lastAt,
    }),
    frameSaid(
      requestId?: Dynamic,
      word?: Dynamic,
      details?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      oldest = createDocumentHostHealthMonitorHandler3(
        DocumentHostStateState7,
        requestId,
      );
      if (oldest === `taken`) {
        createDocumentHostHealthMonitorResult8 = null;
      }
      createDocumentHostHealthMonitorResult6 =
        createDocumentHostHealthMonitorHandler3(DocumentHostStateState8, word);
      amount4 = details;
    },
    reported(..._extraArguments: unknown[]): undefined {
      if (createDocumentHostHealthMonitorResult7 !== null) {
        createDocumentHostHealthMonitorResult7 = true;
      }
      if (createDocumentHostHealthMonitorResult6 === `none`) {
        createDocumentHostHealthMonitorResult6 = undefined;
      }
      if (
        createDocumentHostHealthMonitorResult8 !== null &&
        createDocumentHostHealthMonitorResult8 < 120
      ) {
        createDocumentHostHealthMonitorResult8 = 0;
      }
    },
    beat(..._extraArguments: unknown[]): undefined {
      index2++;
      if (createDocumentHostHealthMonitorResult8 !== null) {
        createDocumentHostHealthMonitorResult8++;
      }
      if (
        createDocumentHostHealthMonitorResult9 !== null &&
        ++createDocumentHostHealthMonitorResult9 >=
          (hold === `ime` ? 3e5 / 1e3 : 9)
      ) {
        enabled3 = true;
      }
    },
    portClosed: (..._extraArguments: unknown[]): undefined =>
      void ((oldest = undefined),
      (createDocumentHostHealthMonitorResult6 = undefined),
      (createDocumentHostHealthMonitorResult7 = null),
      (createDocumentHostHealthMonitorResult8 = null)),
    answerHeld: (..._extraArguments: unknown[]) =>
      createDocumentHostHealthMonitorHandler7() === `ackheld` &&
      createDocumentHostHealthMonitorResult8 !== null &&
      createDocumentHostHealthMonitorResult8 >= 120 &&
      oldest !== `taken`,
    pileOwed: (..._extraArguments: unknown[]) => !enabled2 && enabled3,
    tailThird: (..._extraArguments: unknown[]) =>
      resolveObservabilityBrowserAndOperationEventsTaken({
        oldest: oldest,
        served:
          createDocumentHostHealthMonitorResult6 !== `none` ||
          (createDocumentHostHealthMonitorResult5 !== null &&
            amount4 -
              Math.max(
                createDocumentHostHealthMonitorResult5,
                lastAt ?? createDocumentHostHealthMonitorResult5,
              ) >=
              2e3)
            ? createDocumentHostHealthMonitorResult6
            : undefined,
        reports:
          createDocumentHostHealthMonitorResult7 === null
            ? undefined
            : createDocumentHostHealthMonitorResult7
              ? `some`
              : index2 >= 2
                ? `none`
                : undefined,
      }),
  };
}

var documentHostStateSet2: Dynamic;

var DocumentHostState_Saved: string;

function resolveDocumentHostStateValue3(
  documentHostStateValue3?: Dynamic,
  options?: Dynamic,
  context: Dynamic = false,
  ..._extraArguments: unknown[]
): Dynamic {
  return context && documentHostStateValue3 === `saved`
    ? `saving`
    : (documentHostStateValue3 === `saving` ||
          documentHostStateValue3 === `syncing`) &&
        !options &&
        !context
      ? `saved`
      : documentHostStateValue3;
}

function resolveDocumentHostStateSave(
  {
    save: save,
    saveWords: saveWords,
    rescues: rescues,
    turned: turned,
  }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    save !== null &&
    saveWords === null &&
    !save.named &&
    !turned &&
    documentHostStateSet2.has(save.word) &&
    !(save.word === `saved` && rescues > 0)
  );
}

function resolveDocumentHostStateSave2(
  { save: save, overdue: overdue, alarmOwed: alarmOwed }: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (save !== null) {
    if (save.named) return `unsaved`;
    switch (save.word) {
      case `opening`:
        return;
      case `unsaved`:
      case `trayed`:
        return `unsaved`;
      case `waiting`:
        return `reconnecting`;
      case `busy`:
        return `saving`;
      case `readonly`:
        return `readonly`;
      case `saved`:
        return resolveDocumentHostStateValue3(save.word, overdue, alarmOwed) ===
          save.word
          ? `saved`
          : `saving`;
      case `saving`:
      case `syncing`:
        return resolveDocumentHostStateValue3(save.word, overdue, alarmOwed) ===
          save.word
          ? `saving`
          : DocumentHostState_Saved;
    }
  }
}

function resolveDocumentHostStateReadonly(
  documentHostStateReadonly?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return documentHostStateReadonly.readonly
    ? null
    : documentHostStateReadonly.term === `bar` ||
        (documentHostStateReadonly.term === `link` &&
          documentHostStateReadonly.linkUnsaved)
      ? `unsaved`
      : null;
}

function resolveDocumentHostStateValue4(
  documentHostStateValue4?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return options === `unsaved` &&
    documentHostStateValue4 !== `readonly` &&
    documentHostStateValue4 !== `reconnecting`
    ? `unsaved`
    : documentHostStateValue4;
}

function resolveDocumentHostStateValue5(
  documentHostStateValue5?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return resolveDataContentAndReferencesValue5(options)
    ? 0
    : documentHostStateValue5;
}

function useDocumentHostStateSaved(
  documentHostStateSaved?: Dynamic,
  saved?: Dynamic,
  unresolved?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (documentHostStateSaved) {
        frameHostChrome({
          saved: saved,
          unresolved: unresolved,
        });
      }
    },
    [documentHostStateSaved, saved, unresolved],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (documentHostStateSaved)
        return (..._extraArguments: unknown[]): Dynamic =>
          frameHostChrome(null);
    },
    [documentHostStateSaved],
  );
}

var resolveDocumentHostStateArmed: (ask?: Dynamic, ..._extraArguments: unknown[]) => string;

function updateDocumentHostStateIdent(
  updateDocumentHostStateIdent2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let uniqueItems: Dynamic = new (Set as Dynamic)(
    options.map(
      (option?: Dynamic, ..._extraArguments: unknown[]): Dynamic => option.id,
    ),
  );
  let lookup: Dynamic = new (Map as Dynamic)();
  for (let [
    updateDocumentHostStateIdentResult,
    activity,
  ] of updateDocumentHostStateIdent2 as Dynamic)
    if (!uniqueItems.has(updateDocumentHostStateIdentResult)) {
      lookup.set(
        activity.ident,
        Math.min(lookup.get(activity.ident) ?? activity.at, activity.at),
      );
      updateDocumentHostStateIdent2.delete(updateDocumentHostStateIdentResult);
    }
  for (let updateDocumentHostStateIdentResult of options as Dynamic)
    if (
      !updateDocumentHostStateIdent2.has(updateDocumentHostStateIdentResult.id)
    ) {
      let ident = resolveDocumentHostStateArmed(
        updateDocumentHostStateIdentResult,
      );
      updateDocumentHostStateIdent2.set(updateDocumentHostStateIdentResult.id, {
        at: lookup.get(ident) ?? context,
        ident: ident,
      });
    }
}

var CLAUDE_LOGO_DATA_URI: string;

var resolveDocumentHostStateKind: (documentHostStateKind?: Dynamic, ..._extraArguments: unknown[]) => number;

var documentHostStateLimit0_5: number;

var DocumentHostState_AgentResting: string;

var resolveDocumentHostStateKind2: Dynamic;

var resolveDocumentHostStateIncludes2: Dynamic;

var resolveDocumentHostStateValue6: Dynamic;

var documentHostStateMap: Dynamic;

var documentHostStateSet3: Dynamic;

var resolveDocumentHostStateValue7: Dynamic;

var clearDocumentHostStateDelete: Dynamic;

var updateDocumentHostStateCatch: (updateDocumentHostStateCatch2?: Dynamic, ..._extraArguments: unknown[]) => undefined;

var getDocumentHostStateKind: Dynamic;

var resolveDocumentHostStateValue8: Dynamic;

function useDocumentHostStateKind(
  documentHostStateKind?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let email: Dynamic =
    documentHostStateKind.who.kind === `human` &&
    resolveDocumentHostStateIncludes2(documentHostStateKind.who.email)
      ? documentHostStateKind.who.email
      : null;
  let [, setUseReducer]: Dynamic = (0, React.useReducer)(
    (
      documentHostStateKind2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => documentHostStateKind2 + 1,
    0,
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (email === null) return;
      updateDocumentHostStateCatch(email);
      let setUseReducer2: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
        setUseReducer();
      documentHostStateSet3.add(setUseReducer2);
      let useDocumentHostStateKindResult: Dynamic =
        frameFacesSubscribe(setUseReducer2);
      return (..._extraArguments: unknown[]): undefined => {
        documentHostStateSet3.delete(setUseReducer2);
        useDocumentHostStateKindResult();
      };
    },
    [email],
  );
  return getDocumentHostStateKind(documentHostStateKind);
}

var resolveDocumentHostStateValue9: Dynamic;

var isDocumentHostStateKind: Dynamic;

var resolveDocumentHostStateValue10: Dynamic;

var resolveDocumentHostStateValue11: (documentHostStateValue11?: Dynamic, ..._extraArguments: unknown[]) => boolean;

function useDocumentHostStateValues(
  documentHostStateValues?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [
    useDocumentHostStateValuesState,
    setUseDocumentHostStateValuesState,
  ]: Dynamic = (0, React.useState)(
    (..._extraArguments: unknown[]): Dynamic =>
      (
        documentHostStateValues2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        resolveDocumentHostStateValue9(documentHostStateValues2),
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      clearDocumentHostStateDelete(
        (..._extraArguments: unknown[]): Dynamic =>
          setUseDocumentHostStateValuesState(
            (..._extraArguments: unknown[]): Dynamic =>
              (
                documentHostStateValues2?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic =>
                resolveDocumentHostStateValue9(documentHostStateValues2),
          ),
      ),
    [],
  );
  let items: Dynamic = [];
  for (let useDocumentHostStateValuesResult of (resolveDocumentHostStateValue11(
    documentHostStateValues,
  )
    ? documentHostStateValues.values()
    : documentHostStateValues) as Dynamic)
    if (
      useDocumentHostStateValuesResult.who.kind === `human` &&
      !useDocumentHostStateValuesResult.who.self &&
      resolveDocumentHostStateIncludes2(
        useDocumentHostStateValuesResult.who.email,
      )
    ) {
      items.push(useDocumentHostStateValuesResult.who.email);
    }
  let itemsText: Dynamic = items.join(`
`);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      for (let useDocumentHostStateValuesResult of itemsText.split(`
`) as Dynamic)
        if (useDocumentHostStateValuesResult !== ``) {
          updateDocumentHostStateCatch(useDocumentHostStateValuesResult);
        }
    },
    [itemsText],
  );
  return useDocumentHostStateValuesState;
}

var resolveDocumentHostStateKind3: Dynamic;

var resolveDocumentHostStateKind4: Dynamic;

var documentHostStateLimit45000: number;

var resolveDocumentHostStateColor: Dynamic;

var resolveDocumentHostStateKind5: Dynamic;

var resolveDocumentHostStateValue12: Dynamic;

function resolveDocumentHostStateEmail(
  email?: Dynamic,
  contributor?: Dynamic,
  name?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return contributor === null
    ? email === `anon`
      ? null
      : {
          email: email,
          ...(name
            ? {
                name: name,
              }
            : {}),
        }
    : contributor.id === null &&
        contributor.name === `` &&
        contributor.avatarUrl === ``
      ? null
      : {
          email: contributor.email ?? ``,
          name: contributor.name || `you`,
          ...(contributor.avatarUrl
            ? {
                photoUrl: contributor.avatarUrl,
              }
            : {}),
          ...(contributor.color
            ? {
                color: contributor.color,
              }
            : {}),
        };
}

function updateDocumentHostStateKind(
  updateDocumentHostStateKind2?: Dynamic,
  options?: Dynamic,
  context: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let filteredUpdateDocumentHostStateKind: Dynamic =
    updateDocumentHostStateKind2.filter(
      (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        resolveDocumentHostStateKind5(item, options, context.viewerId),
    );
  let lookup: Dynamic = new (Map as Dynamic)();
  for (let updateDocumentHostStateKindResult of filteredUpdateDocumentHostStateKind as Dynamic) {
    let updateDocumentHostStateKindResult2: Dynamic =
      resolvePlatformApiAndAuthHuman4(updateDocumentHostStateKindResult);
    if (!lookup.has(updateDocumentHostStateKindResult2)) {
      lookup.set(
        updateDocumentHostStateKindResult2,
        updateDocumentHostStateKindResult,
      );
    }
  }
  let mappedToSorted: Dynamic = [...lookup.values()]
    .toSorted(
      (item?: Dynamic, item2?: Dynamic, ..._extraArguments: unknown[]) =>
        resolveDocumentHostStateKind(item) -
        resolveDocumentHostStateKind(item2),
    )
    .map(
      (toSorted?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
        kind: `peer`,
        key: resolvePlatformApiAndAuthHuman4(toSorted),
        p: toSorted,
      }),
    );
  let items: Dynamic = [];
  let self: Dynamic = context.self ?? null;
  if (self !== null) {
    let record: Dynamic = {
      who: {
        kind: `human`,
        uid: `${(self as Dynamic).email || `me`}#self`,
        connId: ``,
        email: (self as Dynamic).email,
        name: (self as Dynamic).name,
        photoUrl: (self as Dynamic).photoUrl,
        self: true,
      },
      path: ``,
      ts: 0,
      color:
        (self as Dynamic).color ??
        resolvePlatformApiAndAuthCharCodeAt(
          isPlatformApiAndAuthAnon((self as Dynamic).email, ``),
        ),
    };
    items.push({
      kind: `self`,
      key: `self:${((self as Dynamic).email || `me`).toLowerCase()}`,
      p: record,
    });
  }
  let filteredMappedToSorted: Dynamic = mappedToSorted.filter(
    (entry?: Dynamic, ..._extraArguments: unknown[]) =>
      entry.kind === `peer` && entry.p.who.kind !== `human`,
  );
  let filteredMappedToSorted2: Dynamic = mappedToSorted.filter(
    (entry?: Dynamic, ..._extraArguments: unknown[]) =>
      entry.kind === `peer` && entry.p.who.kind === `human`,
  );
  (items.push as Dynamic)(...filteredMappedToSorted);
  if (
    context.restingClaude &&
    filteredMappedToSorted.length === 0 &&
    items.length + filteredMappedToSorted2.length < 5
  ) {
    items.push({
      kind: `resting`,
      key: DocumentHostState_AgentResting,
    });
  }
  (items.push as Dynamic)(...filteredMappedToSorted2);
  return items;
}

function UseDocumentHostStateParticipantsComponent(
  {
    participants: participants,
    following: following,
    onFollow: onFollow,
    showSelf: showSelf,
    restingClaude: restingClaude,
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let documentHostStateValue12: Dynamic = resolveDocumentHostStateValue12();
  let useDocumentHostStateParticipantsResult: Dynamic = isFrameArtifact();
  let useDocumentHostStateParticipantsResult2: Dynamic =
    useCommentsEditorThen();
  let avatarUrl: Dynamic = (0, React.useSyncExternalStore)(
    frameFacesSubscribe,
    frameViewerFace,
  );
  useDocumentHostStateValues(participants);
  let updateDocumentHostStateKind2: Dynamic = updateDocumentHostStateKind(
    participants,
    documentHostStateValue12,
    {
      self:
        (showSelf ?? useDocumentHostStateParticipantsResult)
          ? resolveDocumentHostStateEmail(
              documentHostStateValue12,
              useDocumentHostStateParticipantsResult
                ? useDocumentHostStateParticipantsResult2.id === null ||
                  avatarUrl === undefined
                  ? useDocumentHostStateParticipantsResult2
                  : {
                      ...useDocumentHostStateParticipantsResult2,
                      avatarUrl: avatarUrl,
                    }
                : null,
              resolvePlatformApiAndAuthAntspace()?.firstName ??
                resolvePlatformApiAndAuthAntspace()?.name,
            )
          : null,
      restingClaude: restingClaude ?? useDocumentHostStateParticipantsResult,
      ...(useDocumentHostStateParticipantsResult
        ? {
            viewerId: useDocumentHostStateParticipantsResult2.id,
          }
        : {}),
    },
  );
  let flatMapText: Dynamic = updateDocumentHostStateKind2
    .slice(0, 5)
    .flatMap(
      (entry?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        entry.kind === `peer` &&
        entry.p.who.kind === `human` &&
        entry.p.who.email
          ? [entry.p.who.email]
          : [],
    )
    .join(`|`);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!flatMapText) return;
      let mappedFlatMapTextParts: Dynamic = flatMapText
        .split(`|`)
        .map(
          (
            flatMapTextPart?: Dynamic,
            index?: Dynamic,
            ..._extraArguments: unknown[]
          ) =>
            setTimeout(
              (..._extraArguments: unknown[]): undefined =>
                void PlatformApiAndAuthPriming.getState().prime(
                  resolvePlatformApiAndAuthSplit2(flatMapTextPart),
                ),
              index * 250,
            ),
        );
      return (..._extraArguments: unknown[]): Dynamic =>
        mappedFlatMapTextParts.forEach(clearTimeout);
    },
    [flatMapText],
  );
  // BaoCut: 在线头像里歇着的智能体叫 Agent，不叫 Claude。
  return updateDocumentHostStateKind2.length === 0 ? null : (
    <AvatarGroup
      max={5}
      size={`sm`}
      noun={`viewers`}
      className={`[--cds-avatar-sm:24px]`}
    >
      {updateDocumentHostStateKind2.map(
        (event?: Dynamic, ..._extraArguments: unknown[]) =>
          event.kind === `resting` ? (
            <PresenceClaudeResting
              {...originalJsxProps(
                {
                  name: `Agent`,
                },
                event.key,
              )}
            />
          ) : (
            <DocumentPresencePerson
              {...originalJsxProps(
                {
                  name:
                    event.kind === `self`
                      ? `${resolveDocumentHostStateKind2(event.p)} (you)`
                      : resolveDocumentHostStateKind2(event.p),
                  p: event.p,
                  isSelf: event.kind === `self`,
                  following: following,
                  onFollow: onFollow,
                },
                event.key,
              )}
            />
          ),
      )}
    </AvatarGroup>
  );
}

function DocumentPresencePerson(
  {
    name: name,
    p: p5,
    isSelf = false,
    following: following,
    onFollow: onFollow,
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let documentPresencePersonResult = resolvePlatformApiAndAuthAgent(p5);
  let documentPresencePersonResult2: Dynamic = PlatformApiAndAuthPriming(
    (
      documentPresencePerson?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      p5.who.kind === `human` &&
      p5.who.email &&
      !resolveDocumentHostStateIncludes2(p5.who.email)
        ? resolvePlatformApiAndAuthToLowerCase(
            documentPresencePerson,
            p5.who.email,
          )
        : undefined,
  );
  let useDocumentHostStateKind2: Dynamic = useDocumentHostStateKind(p5);
  let photoUrl: Dynamic =
    (p5.who.kind === `human` && p5.who.photoUrl) ||
    useDocumentHostStateKind2?.avatarUrl ||
    documentPresencePersonResult2;
  let content: Dynamic = useDocumentHostStateKind2?.name
    ? isSelf
      ? `${useDocumentHostStateKind2.name} (you)`
      : useDocumentHostStateKind2.name
    : name;
  let [, setUseReducer]: Dynamic = (0, React.useReducer)(
    (
      documentPresencePerson?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => documentPresencePerson + 1,
    0,
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (p5.who.kind !== `xagent`) return;
      let difference = p5.ts + documentHostStateLimit45000 - Date.now();
      if (difference <= 0) return;
      let setTimeout2 = setTimeout(setUseReducer, difference + 50);
      return (..._extraArguments: unknown[]) => clearTimeout(setTimeout2);
    },
    [p5.ts, p5.who.kind],
  );
  let matchesRunning =
    p5.who.kind === `agent`
      ? p5.running === false
      : p5.who.kind === `xagent` && Date.now() - p5.ts > 45e3;
  let label = isSelf
    ? ``
    : following === documentPresencePersonResult
      ? `click to stop following`
      : `click to follow`;
  let detail =
    [...resolveDocumentHostStateKind3(p5), label].filter(Boolean).join(` · `) ||
    undefined;
  let documentHostStateKind4: Dynamic = resolveDocumentHostStateKind4(p5);
  let ariaLabel: Dynamic =
    p5.who.kind === `human` && p5.who.email ? p5.who.email : content;
  return (
    <Tooltip
      content={content}
      detail={detail}
      side={`bottom`}
      hoverable={false}
    >
      <button
        type={`button`}
        data-testid={isSelf ? `presence-self` : `presence-avatar`}
        aria-label={ariaLabel}
        onClick={
          isSelf
            ? undefined
            : (..._extraArguments: unknown[]): Dynamic =>
                onFollow(
                  documentPresencePersonResult,
                  p5.who.kind === `human` ? p5.who.email : p5.who.agent,
                )
        }
        className={`hover:outline-stronger flex size-6 cursor-pointer items-center justify-center overflow-hidden rounded-full outline-[1.5px] outline-offset-1 outline-transparent transition-[outline-color]`}
        style={{
          backgroundColor: resolveDocumentHostStateColor(p5),
          boxShadow: `inset 0 0 0 1.5px ${resolveDocumentHostStateColor(p5)}`,
          opacity: matchesRunning ? documentHostStateLimit0_5 : 1,
          ...(following === documentPresencePersonResult && {
            outline: `2px solid var(--cds-text-primary)`,
          }),
        }}
      >
        {documentHostStateKind4.kind === `spark` ? (
          <PresenceAgentSpark
            src={documentHostStateKind4.src}
            alt={documentHostStateKind4.alt}
          />
        ) : (
          p5.who.kind === `human` && (
            <CollaboratorAvatar
              email={
                resolveDocumentHostStateIncludes2(p5.who.email)
                  ? ``
                  : p5.who.email
              }
              name={
                useDocumentHostStateKind2?.name ??
                p5.who.name ??
                (resolveDocumentHostStateIncludes2(p5.who.email)
                  ? `?`
                  : undefined)
              }
              photoUrl={photoUrl}
              size={21}
              className={`ring-0`}
            />
          )
        )}
      </button>
    </Tooltip>
  );
}

function PresenceAgentSpark(
  { src: src, alt: alt }: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    <img
      src={src}
      alt={alt}
      data-testid={`presence-agent-spark`}
      className={`size-3.5 shrink-0`}
      style={{
        filter: `brightness(0) invert(1)`,
      }}
      draggable={false}
    />
  );
}

function PresenceClaudeResting(
  { name: name }: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    <Tooltip content={name} detail={`idle`} side={`bottom`} hoverable={false}>
      <span
        role={`img`}
        data-testid={`presence-claude-resting`}
        aria-label={name}
        className={`flex size-6 items-center justify-center overflow-hidden rounded-full`}
        style={{
          backgroundColor: PlatformApiAndAuthColor.color,
          opacity: documentHostStateLimit0_5,
        }}
      >
        <PresenceAgentSpark src={CLAUDE_LOGO_DATA_URI} alt={``} />
      </span>
    </Tooltip>
  );
}

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeDocumentHostStateCreateDocumentHostHealthMonitorStep1(): void {
  (documentHostStateSet2 = new (Set as Dynamic)([
    `opening`,
    `saving`,
    `syncing`,
    `saved`,
  ]));
  (DocumentHostState_Saved = `saved`);
  (resolveDocumentHostStateArmed = (
    ask?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `${ask.armed === true ? `a` : ask.staged === true ? `s` : `k`}|${ask.bid ?? ``}|${ask.afterId ?? ``}`);
  (CLAUDE_LOGO_DATA_URI = `data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='94'%20height='94'%20viewBox='0%200%2094%2094'%20fill='none'%3e%3cpath%20d='M18.3658%2062.2435L36.7823%2051.9165L37.0858%2051.012L36.7823%2050.5083H35.8716L32.7853%2050.3206L22.2616%2050.0389L13.1546%2049.6634L4.30054%2049.194L2.07438%2048.7246L0%2045.9551L0.202378%2044.5938L2.07438%2043.3264L4.75589%2043.5611L10.6755%2043.9836L19.5801%2044.5938L26.0056%2044.9693L35.568%2045.9551H37.0858L37.2882%2045.3448L36.7823%2044.9693L36.3775%2044.5938L27.1693%2038.3507L17.2022%2031.7789L11.9909%2027.9767L9.20822%2026.0522L7.79157%2024.2684L7.18443%2020.3254L9.71416%2017.5089L13.1546%2017.7436L14.0147%2017.9783L17.5057%2020.654L24.9431%2026.4277L34.6573%2033.5627L36.0739%2034.7362L36.6444%2034.3512L36.7317%2034.079L36.0739%2032.9994L30.8121%2023.4704L25.1961%2013.7537L22.6664%209.71675L22.0086%207.32277C21.7539%206.31812%2021.6039%205.48695%2021.6039%204.45938L24.4878%200.516349L26.1068%200L30.0026%200.516349L31.6216%201.92457L34.0502%207.46359L37.9459%2016.1476L44.0173%2027.9767L45.7881%2031.4973L46.7494%2034.7362L47.1036%2035.722H47.7107V35.1587L48.2166%2028.4931L49.1274%2020.3254L50.0381%209.81063L50.3416%206.85336L51.8089%203.28586L54.7434%201.36128L57.0201%202.44092L58.8921%205.11655L58.6391%206.85336L57.5261%2014.0822L55.3505%2025.395L53.9338%2032.9994H54.7434L55.7047%2032.0136L59.5498%2026.944L65.9753%2018.8702L68.8086%2015.6782L72.1479%2012.1577L74.2729%2010.4678H78.3204L81.2549%2014.8802L79.9395%2019.4335L75.7907%2024.6909L72.3503%2029.1503L67.4173%2035.7593L64.3563%2041.0732L64.6308%2041.5116L65.3682%2041.4487L76.499%2039.0548L82.5198%2037.9751L89.7042%2036.7547L92.9423%2038.2568L93.2964%2039.8058L92.0316%2042.9509L84.3412%2044.8285L75.3354%2046.6592L61.9245%2049.8162L61.776%2049.9356L61.9513%2050.1956L67.9991%2050.743L70.5795%2050.8839H76.9038L88.6923%2051.7757L91.7786%2053.7942L93.6%2056.282L93.2964%2058.2066L88.5405%2060.6006L82.1656%2059.0985L67.2402%2055.531L62.1302%2054.2636H61.4218V54.6861L65.6718%2058.8638L73.514%2065.9049L83.2787%2075.0114L83.7846%2077.2646L82.5198%2079.0483L81.2043%2078.8606L72.6032%2072.3827L69.264%2069.4724L61.776%2063.1354H61.2701V63.7926L62.9903%2066.3274L72.1479%2080.081L72.6032%2084.3057L71.9455%2085.667L69.5676%2086.5119L66.9872%2086.0425L61.5736%2078.4851L56.0588%2070.0357L51.6065%2062.4313L51.0687%2062.7708L48.419%2091.0652L47.2048%2092.5204L44.3715%2093.6L41.9935%2091.8162L40.7286%2088.9059L41.9935%2083.1322L43.5114%2075.6217L44.7256%2069.6602L45.8387%2062.2435L46.5185%2059.7659L46.4584%2059.6001L45.9153%2059.6914L40.3239%2067.3601L31.824%2078.8606L25.0949%2086.0425L23.4759%2086.6997L20.6932%2085.2445L20.9462%2082.6628L22.5146%2080.3627L31.824%2068.5336L37.44%2061.1639L41.0595%2056.9335L41.0243%2056.3216L40.8245%2056.3046L16.0891%2072.4297L11.6874%2072.993L9.76476%2071.2092L10.0177%2068.2989L10.9284%2067.3601L18.3658%2062.2435Z'%20fill='%23D97757'%3e%3c/path%3e%3c/svg%3e`);
  (resolveDocumentHostStateKind = (
    documentHostStateKind?: Dynamic,
    ..._extraArguments: unknown[]
  ) => +(documentHostStateKind.who.kind === `human`));
  (documentHostStateLimit0_5 = 0.5);
  (DocumentHostState_AgentResting = `agent:resting`);
  (resolveDocumentHostStateKind2 = (
    documentHostStateKind2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    documentHostStateKind2.who.kind === `human`
      ? (documentHostStateKind2.who.name ??
        resolveDocumentHostStateValue6(documentHostStateKind2.who.email))
      : documentHostStateKind2.who.agent);
  (resolveDocumentHostStateIncludes2 = (
    documentHostStateIncludes2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    documentHostStateIncludes2 !== `` &&
    !documentHostStateIncludes2.includes(`@`));
  (resolveDocumentHostStateValue6 = (
    documentHostStateValue6?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveDocumentHostStateIncludes2(documentHostStateValue6)
      ? `Someone`
      : resolvePlatformSessionAndSourcesValue(documentHostStateValue6));
  (documentHostStateMap = new (Map as Dynamic)());
  (documentHostStateSet3 = new (Set as Dynamic)());
  (resolveDocumentHostStateValue7 = (
    documentHostStateValue7?: Dynamic,
    ..._extraArguments: unknown[]
  ) => updateDocumentHostStateCatch(documentHostStateValue7));
  (clearDocumentHostStateDelete = (
    clearDocumentHostStateDelete2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => (
    documentHostStateSet3.add(clearDocumentHostStateDelete2),
    (..._extraArguments: unknown[]): undefined =>
      void documentHostStateSet3.delete(clearDocumentHostStateDelete2)
  ));
  (updateDocumentHostStateCatch = (
    updateDocumentHostStateCatch2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      !(
        documentHostStateMap.has(updateDocumentHostStateCatch2) ||
        !isFrameArtifact()
      )
    ) {
      documentHostStateMap.set(updateDocumentHostStateCatch2, null);
      frameProfiles([updateDocumentHostStateCatch2])
        .then((result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          let resultItem: Dynamic = result[updateDocumentHostStateCatch2];
          if (resultItem && (resultItem.name || resultItem.avatarUrl)) {
            documentHostStateMap.set(updateDocumentHostStateCatch2, resultItem);
          }
          for (let updateDocumentHostStateCatchResult of documentHostStateSet3 as Dynamic)
            updateDocumentHostStateCatchResult();
        })
        .catch((..._extraArguments: unknown[]): undefined => {});
    }
  });
  (getDocumentHostStateKind = (
    documentHostStateKind?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (
      documentHostStateKind.who.kind !== `human` ||
      !resolveDocumentHostStateIncludes2(documentHostStateKind.who.email)
    )
      return;
    let getDocumentHostStateKindResult: Dynamic = framePeekProfile(
      documentHostStateKind.who.email,
    );
    return getDocumentHostStateKindResult !== undefined &&
      (getDocumentHostStateKindResult.name !== `` ||
        getDocumentHostStateKindResult.avatarUrl !== ``)
      ? getDocumentHostStateKindResult
      : (documentHostStateMap.get(documentHostStateKind.who.email) ?? undefined);
  });
  (resolveDocumentHostStateValue8 = (
    documentHostStateValue8?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let color: Dynamic = getDocumentHostStateKind(documentHostStateValue8)?.color;
    return resolvePlatformApiAndAuthTest(color) ? color : undefined;
  });
  (resolveDocumentHostStateValue9 = (
    documentHostStateValue9?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    getDocumentHostStateKind(documentHostStateValue9)?.name ||
    resolveDocumentHostStateKind2(documentHostStateValue9));
  (isDocumentHostStateKind = (
    documentHostStateKind?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (documentHostStateKind.who.kind !== `human`) return true;
    let isDocumentHostStateKindResult = resolveEditorAnchorsAndMentionsOther(
      documentHostStateKind.who.email,
    );
    return (
      isDocumentHostStateKindResult === `email` ||
      (isDocumentHostStateKindResult === `platform` &&
        !!getDocumentHostStateKind(documentHostStateKind)?.name)
    );
  });
  (resolveDocumentHostStateValue10 = (
    documentHostStateValue10?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    isDocumentHostStateKind(documentHostStateValue10)
      ? resolveDocumentHostStateValue9(documentHostStateValue10)
      : ``);
  (resolveDocumentHostStateValue11 = (
    documentHostStateValue11?: Dynamic,
    ..._extraArguments: unknown[]
  ) => documentHostStateValue11 instanceof (Map as Dynamic));
  (resolveDocumentHostStateKind3 = (
    documentHostStateKind3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    documentHostStateKind3.who.kind === `human`
      ? [documentHostStateKind3.path]
      : [
          `with ${resolvePlatformSessionAndSourcesValue(documentHostStateKind3.who.ownerUid)}`,
          documentHostStateKind3.path,
        ]);
  (resolveDocumentHostStateKind4 = (
    documentHostStateKind4?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    documentHostStateKind4.who.kind === `human`
      ? {
          kind: `person`,
        }
      : {
          kind: `spark`,
          src: CLAUDE_LOGO_DATA_URI,
          alt: documentHostStateKind4.who.agent,
        });
  (documentHostStateLimit45000 = 45e3);
  (resolveDocumentHostStateColor = (
    documentHostStateColor?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => documentHostStateColor.color);
  (resolveDocumentHostStateKind5 = (
    documentHostStateKind5?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    documentHostStateKind5.who.kind === `human`
      ? documentHostStateKind5.who.self ||
        documentHostStateKind5.who.email === `anon` ||
        !isDocumentHostStateKind(documentHostStateKind5)
        ? false
        : context === undefined
          ? options === `anon`
            ? false
            : !isPlatformSessionAndSourcesToLowerCase(
                documentHostStateKind5.who.email,
                options,
              )
          : context === null || documentHostStateKind5.who.email !== context
      : true);
  (resolveDocumentHostStateValue12 = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    PlatformApiAndAuthUser(
      (..._extraArguments: unknown[]): Dynamic => resolvePlatformApiAndAuthAnon(),
    ));
}

export {
  CLAUDE_LOGO_DATA_URI,
  UseDocumentHostStateParticipantsComponent,
  clearDocumentHostStateDelete,
  createDocumentHostHealthMonitor,
  isDocumentHostStateKind,
  resolveDocumentHostStateReadonly,
  resolveDocumentHostStateSave,
  resolveDocumentHostStateSave2,
  resolveDocumentHostStateValue10,
  resolveDocumentHostStateValue3,
  resolveDocumentHostStateValue4,
  resolveDocumentHostStateValue5,
  resolveDocumentHostStateValue7,
  resolveDocumentHostStateValue8,
  updateDocumentHostStateIdent,
  useDocumentHostStateSaved,
  useDocumentHostStateValues,
};
