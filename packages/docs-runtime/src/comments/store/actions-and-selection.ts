/** BaoCut: comments actions and selection from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  React,
  Schema,
  create,
  inFrame,
} from "../../platform/dependencies";
import {
  lazyZod,
} from "../../platform/data/lazy-zod";
import {
  DataContentAndReferencesHasHeader,
  dataContentAndReferencesSet,
  resolveDataContentAndReferencesKind,
  resolveDataContentAndReferencesKind2,
  resolveDataContentAndReferencesTest5,
} from "../../platform/data/content-and-references";
import {
  resolvePlatformSessionAndSourcesTest8,
  resolvePlatformSessionAndSourcesValue,
} from "../../platform/services/session-and-sources-1";
import {
  loadPlatformSessionAndSourcesAckOf,
  resolvePlatformSessionAndSourcesVerb4,
} from "../../platform/services/session-and-sources-2";
import {
  resolveEditorExtensionsSess4,
} from "../../prose-editor/platform/extensions-3";
import {
  EditorAnchorsAndMentionsStyles,
  resolveEditorAnchorsAndMentionsOther,
  resolveEditorAnchorsAndMentionsRef,
} from "../../prose-editor/platform/anchors-and-mentions-1";
import {
  resolveObservabilityBrowserAndOperationEventsTest9,
} from "../../platform/observability/browser-and-operation-events-2";
import {
  frameArtifactUrl,
  frameBootContainer,
  frameFacesSubscribe,
  framePeekProfile,
  frameProfiles,
  frameProjectAck,
} from "../../platform/observability/browser-and-operation-events-3";
import {
  api,
  resolvePlatformApiAndAuthStartsWith,
} from "../../platform/services/api-and-auth-1";
import {
  DataModelSchemasMinRows,
} from "../../platform/data/model-schemas-2";
import {
  clampAnchorLabel,
  resolveDataModelSchemasHasOwn,
} from "../../platform/data/model-schemas-3";
import {
  updateDataModelSchemasValue,
} from "../../platform/data/model-schemas-4";
import {
  collectDataOperationEngineJoin,
  dataOperationEnginePattern6,
  resolveDataOperationEngineEvery,
  resolveDataOperationEngineValue25,
} from "../../platform/data/operation-engine-3";
import {
  loadPlatformSyncAndRoutingFinal,
  resolvePlatformSyncAndRoutingLid,
  resolvePlatformSyncAndRoutingRef,
  resolvePlatformSyncAndRoutingRef2,
  resolvePlatformSyncAndRoutingUnavailable,
} from "../../platform/services/sync-and-routing-2";
import {
  resolveDataOperationControlMinted,
} from "../../platform/data/operation-control-1";
import {
  dataOperationControlValue1,
  resolveDataOperationControlKind3,
  resolveDataOperationControlSess3,
  resolveDataOperationControlValue39,
} from "../../platform/data/operation-control-5";

function getCommentsActionsAndSelectionRef(
  event?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies: Dynamic = (..._extraArguments: unknown[]): undefined => {},
  ..._extraArguments: unknown[]
): Dynamic {
  let read = (..._extraArguments: unknown[]): undefined => {
    let refs: Dynamic = event.refs();
    let refs2: Dynamic = [];
    for (let [
      getCommentsActionsAndSelectionRefResult,
      getCommentsActionsAndSelectionRefResult2,
    ] of refs as Dynamic)
      refs2.push({
        ref: getCommentsActionsAndSelectionRefResult,
        engine: getCommentsActionsAndSelectionRefResult2.engine,
        ...(getCommentsActionsAndSelectionRefResult2.parent
          ? {
              parent: getCommentsActionsAndSelectionRefResult2.parent,
            }
          : {}),
      });
    options({
      v: dataOperationControlValue1,
      kind: `index`,
      refs: refs2,
      head: 0,
    });
    for (let [
      getCommentsActionsAndSelectionRefResult,
      getCommentsActionsAndSelectionRefResult2,
    ] of refs as Dynamic) {
      let getCommentsActionsAndSelectionRefResultIndex: Dynamic =
        getCommentsActionsAndSelectionRefResult.indexOf(`/`);
      let record2: Dynamic = event.read({
        object: getCommentsActionsAndSelectionRefResult.slice(
          0,
          getCommentsActionsAndSelectionRefResultIndex,
        ),
        id: getCommentsActionsAndSelectionRefResult.slice(
          getCommentsActionsAndSelectionRefResultIndex + 1,
        ),
      });
      if (record2 !== undefined) {
        options(
          resolveDataOperationControlKind3(
            getCommentsActionsAndSelectionRefResult,
            getCommentsActionsAndSelectionRefResult2,
            record2,
            dependencies,
          ),
        );
      }
    }
    options({
      v: dataOperationControlValue1,
      kind: `ready`,
    });
  };
  return event.subscribe(
    (entry?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      switch (entry.kind) {
        case `live`:
        case `recovered`:
          read();
          return;
        case `envelope`: {
          let refs: Dynamic = event.refs();
          for (let getCommentsActionsAndSelectionRefResult of entry.envelope
            .diff as Dynamic) {
            if (
              !resolveDataOperationControlValue39(
                getCommentsActionsAndSelectionRefResult.address,
              )
            )
              continue;
            let ref: Dynamic =
              getCommentsActionsAndSelectionRefResult.address.ref;
            if (
              !resolveDataOperationControlValue39(ref) ||
              typeof ref.object != `string` ||
              typeof ref.id != `string`
            )
              continue;
            let container: Dynamic =
              getCommentsActionsAndSelectionRefResult.address.container;
            if (
              resolveDataOperationControlValue39(container) &&
              `${String(container.kind)}/${String(container.id)}` !== event.key
            )
              continue;
            let label = `${ref.object}/${ref.id}`;
            if (getCommentsActionsAndSelectionRefResult.after === undefined) {
              let actor: Dynamic = resolveDataOperationControlSess3(
                entry.envelope.actor,
              );
              if (actor === undefined) {
                dependencies(`tail-actor-rejected:${label}`);
                continue;
              }
              options({
                v: dataOperationControlValue1,
                kind: `op`,
                ref: label,
                engine: refs.get(label)?.engine ?? `json`,
                verb: `delete`,
                seq: entry.seq ?? 0,
                at: entry.envelope.at,
                actor: actor,
              });
              continue;
            }
            let refEntry: Dynamic = refs.get(label);
            if (refEntry !== undefined) {
              options(
                resolveDataOperationControlKind3(
                  label,
                  refEntry,
                  getCommentsActionsAndSelectionRefResult.after,
                  dependencies,
                ),
              );
            }
          }
          return;
        }
        case `down`:
          if (entry.terminal) {
            context();
          }
          return;
        default:
          return;
      }
    },
  );
}

var CommentsActionsAndSelectionChrome: string[][];

var commentsActionsAndSelectionFrameTFrameVValues: string[];

function resolveCommentsActionsAndSelectionLocalhost(
  ..._extraArguments: unknown[]
): string {
  let origin: string = typeof location !== "undefined" ? location.origin : ``;
  let BONGOPUBLICORIGIN_: Dynamic =
    typeof window !== "undefined"
      ? (window as Dynamic).__BONGO_PUBLIC_ORIGIN__
      : undefined;
  if (typeof BONGOPUBLICORIGIN_ != `string` || !BONGOPUBLICORIGIN_)
    return origin;
  try {
    let url: Dynamic = new (URL as Dynamic)(BONGOPUBLICORIGIN_);
    let matchesHostname: boolean =
      url.hostname === `localhost` || url.hostname === `127.0.0.1`;
    return url.protocol !== `https:` &&
      !(url.protocol === `http:` && matchesHostname)
      ? origin
      : url.origin === BONGOPUBLICORIGIN_
        ? BONGOPUBLICORIGIN_
        : origin;
  } catch {
    return origin;
  }
}

function resolveCommentsActionsAndSelectionValue(
  commentsActionsAndSelectionValue?: Dynamic,
  ..._extraArguments: unknown[]
): string {
  return (
    resolveCommentsActionsAndSelectionLocalhost() +
    commentsActionsAndSelectionValue
  );
}

function resolveCommentsActionsAndSelectionContainer(
  container?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): string {
  return inFrame()
    ? clearCommentsActionsAndSelectionBONGOAPIBASE() +
        (resolvePlatformSessionAndSourcesTest8(options) ?? ``)
    : resolveCommentsActionsAndSelectionValue(
        resolveDataContentAndReferencesTest5(options)
          ? resolveDataContentAndReferencesKind({
              container: container,
              ref: {
                noun: `file`,
                id: options,
              },
            })
          : resolveDataContentAndReferencesKind2(container),
      );
}

function resolveCommentsActionsAndSelectionUrl(
  commentsActionsAndSelectionUrl?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (inFrame()) {
    let platformSessionAndSourcesTest8 = resolvePlatformSessionAndSourcesTest8(
      options,
      context,
    );
    return platformSessionAndSourcesTest8 === null
      ? {
          url: resolveCommentsActionsAndSelectionContainer(
            commentsActionsAndSelectionUrl,
            options,
          ),
          exact: false,
        }
      : {
          url:
            clearCommentsActionsAndSelectionBONGOAPIBASE() +
            platformSessionAndSourcesTest8,
          exact: true,
        };
  }
  return {
    url: `${resolveCommentsActionsAndSelectionContainer(commentsActionsAndSelectionUrl, options)}#${encodeURIComponent(context)}`,
    exact: true,
  };
}

function clearCommentsActionsAndSelectionBONGOAPIBASE(
  ..._extraArguments: unknown[]
): Dynamic {
  let frameArtifactUrl2: Dynamic = frameArtifactUrl();
  if (frameArtifactUrl2 !== null) return frameArtifactUrl2;
  let BONGOAPIBASE_: Dynamic =
    typeof window !== "undefined"
      ? ((window as Dynamic).__BONGO_API_BASE__ ?? ``)
      : ``;
  let platformApiAndAuthStartsWith: Dynamic =
    resolvePlatformApiAndAuthStartsWith(location.pathname, BONGOAPIBASE_);
  let search: string = location.search;
  let query: Dynamic = new (URLSearchParams as Dynamic)(search);
  let enabled: boolean = false;
  for (let [
    clearCommentsActionsAndSelectionBONGOAPIBASEResult,
    clearCommentsActionsAndSelectionBONGOAPIBASEResult2,
  ] of CommentsActionsAndSelectionChrome as Dynamic)
    if (
      query
        .getAll(clearCommentsActionsAndSelectionBONGOAPIBASEResult)
        .includes(clearCommentsActionsAndSelectionBONGOAPIBASEResult2)
    ) {
      let filteredAll: Dynamic = query
        .getAll(clearCommentsActionsAndSelectionBONGOAPIBASEResult)
        .filter(
          (all?: Dynamic, ..._extraArguments: unknown[]) =>
            all !== clearCommentsActionsAndSelectionBONGOAPIBASEResult2,
        );
      query.delete(clearCommentsActionsAndSelectionBONGOAPIBASEResult);
      for (let clearCommentsActionsAndSelectionBONGOAPIBASEResult3 of filteredAll as Dynamic)
        query.append(
          clearCommentsActionsAndSelectionBONGOAPIBASEResult,
          clearCommentsActionsAndSelectionBONGOAPIBASEResult3,
        );
      enabled = true;
    }
  for (let clearCommentsActionsAndSelectionBONGOAPIBASEResult of commentsActionsAndSelectionFrameTFrameVValues as Dynamic)
    if (query.has(clearCommentsActionsAndSelectionBONGOAPIBASEResult)) {
      query.delete(clearCommentsActionsAndSelectionBONGOAPIBASEResult);
      enabled = true;
    }
  if (enabled) {
    let queryText: Dynamic = query.toString();
    search = queryText ? `?${queryText}` : ``;
  }
  return (
    resolveCommentsActionsAndSelectionLocalhost() +
    platformApiAndAuthStartsWith +
    search
  );
}

var CommentsActionsAndSelectionState: Dynamic;

function updateCommentsActionsAndSelectionValue(
  updateCommentsActionsAndSelectionValue3?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (CommentsActionsAndSelectionState !== null) {
    CommentsActionsAndSelectionState.set(
      updateCommentsActionsAndSelectionValue3,
      (CommentsActionsAndSelectionState.get(
        updateCommentsActionsAndSelectionValue3,
      ) ?? 0) + 1,
    );
  }
}

var CommentsActionsAndSelectionUntitledXlsx: string;

function resolveCommentsActionsAndSelectionBirthName(
  commentsActionsAndSelectionBirthName: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let {
    birthName:
      commentsActionsAndSelectionBirthName4 = CommentsActionsAndSelectionUntitledXlsx,
    pid: commentsActionsAndSelectionBirthName2,
    seed: commentsActionsAndSelectionBirthName3,
  }: Dynamic = commentsActionsAndSelectionBirthName;
  let record2 = {
    $lid: `n`,
    object: `node`,
    verb: `create`,
    engine: `iron`,
    payload: {
      parent: {
        object: `file`,
        id: `$lid:f`,
      },
      ...(commentsActionsAndSelectionBirthName3 === undefined
        ? {}
        : {
            id: `$lid:b`,
          }),
    },
  };
  let items: Dynamic = [];
  if (commentsActionsAndSelectionBirthName3 !== undefined) {
    items.push({
      $lid: `b`,
      object: `blob`,
      verb: `create`,
      engine: `blob`,
      payload: {
        sha256: commentsActionsAndSelectionBirthName3.sha256,
        ...(commentsActionsAndSelectionBirthName3.bytes === undefined
          ? {}
          : {
              bytes: commentsActionsAndSelectionBirthName3.bytes,
            }),
        ...(commentsActionsAndSelectionBirthName3.mime === undefined
          ? {}
          : {
              mime: commentsActionsAndSelectionBirthName3.mime,
            }),
      },
    });
  }
  items.push(
    resolvePlatformSyncAndRoutingLid(commentsActionsAndSelectionBirthName4),
    record2,
    resolvePlatformSyncAndRoutingRef(commentsActionsAndSelectionBirthName4),
  );
  if (commentsActionsAndSelectionBirthName2 !== undefined) {
    items.push(
      resolvePlatformSyncAndRoutingRef2(
        commentsActionsAndSelectionBirthName2,
        commentsActionsAndSelectionBirthName.placement,
      ),
    );
  }
  return items;
}

async function loadCommentsActionsAndSelectionDialect(
  commentsActionsAndSelectionDialect?: Dynamic,
  options: Dynamic = {},
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let {
    dialect: dialect,
    peekDialect: peekDialect,
    learn: learn,
    ...options2
  }: Dynamic = options;
  let platformSyncAndRoutingFinal: Dynamic =
    await loadPlatformSyncAndRoutingFinal(
      commentsActionsAndSelectionDialect,
      resolveCommentsActionsAndSelectionBirthName({
        ...options2,
        pid: commentsActionsAndSelectionDialect.container.id,
      }),
      {
        dialect: dialect,
        peekDialect: peekDialect,
        learn: learn,
      },
    );
  if (platformSyncAndRoutingFinal.verdict !== `allow`)
    throw Error(
      resolvePlatformSyncAndRoutingUnavailable(
        platformSyncAndRoutingFinal,
        `spreadsheet`,
      ),
    );
  let fileId: Dynamic =
    platformSyncAndRoutingFinal.acks[0]?.verdict === `allow`
      ? platformSyncAndRoutingFinal.acks[0].minted
      : undefined;
  let nodeId: Dynamic =
    platformSyncAndRoutingFinal.acks[1]?.verdict === `allow`
      ? platformSyncAndRoutingFinal.acks[1].minted
      : undefined;
  if (!fileId || !nodeId)
    throw Error(
      `Could not create the spreadsheet — the server accepted it but named no id. Reload and try again.`,
    );
  return {
    fileId: fileId,
    nodeId: nodeId,
  };
}

var CommentsActionsAndSelectionState2: number;

function resolveCommentsActionsAndSelectionContent(
  commentsActionsAndSelectionContent?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let index = 0;
  let items: Dynamic = [commentsActionsAndSelectionContent];
  for (; items.length; ) {
    let pop: Dynamic = items.pop();
    if (!pop || typeof pop != `object`) continue;
    index++;
    if (index > 12e3) return index;
    let content: Dynamic = pop.content;
    if (Array.isArray(content))
      for (let resolveCommentsActionsAndSelectionContentResult of content as Dynamic)
        items.push(resolveCommentsActionsAndSelectionContentResult);
  }
  return index;
}

var commentsActionsAndSelectionSchema: Dynamic;

function resolveCommentsActionsAndSelectionCause(
  commentsActionsAndSelectionCause?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    resolveCommentsActionsAndSelectionContent(
      commentsActionsAndSelectionCause,
    ) > 12e3
  )
    throw Error(
      `invalid prompt doc: too many nodes (> ${CommentsActionsAndSelectionState2})`,
    );
  let resolveCommentsActionsAndSelectionCauseResult: Dynamic;
  try {
    resolveCommentsActionsAndSelectionCauseResult =
      commentsActionsAndSelectionSchema.nodeFromJSON(
        commentsActionsAndSelectionCause,
      );
    resolveCommentsActionsAndSelectionCauseResult.check();
  } catch (cause: Dynamic) {
    throw Error(
      `invalid prompt doc: ${cause instanceof Error ? cause.message : String(cause)}`,
      {
        cause: cause,
      },
    );
  }
  if (resolveCommentsActionsAndSelectionCauseResult.type.name !== `doc`)
    throw Error(
      `invalid prompt doc: root must be type "doc", got "${resolveCommentsActionsAndSelectionCauseResult.type.name}"`,
    );
  return resolveCommentsActionsAndSelectionCauseResult.toJSON();
}

var CommentsActionsAndSelectionText: Dynamic;

var CommentsActionsAndSelectionCode: Dynamic;

var CommentsActionsAndSelectionRecord: Dynamic;

var CommentsActionsAndSelectionUnique: Dynamic;

var CommentsActionsAndSelectionDescription: Dynamic;

var CommentsActionsAndSelectionState3: Dynamic;

var CommentsActionsAndSelectionRegex: Dynamic;

var CommentsActionsAndSelectionColor: Dynamic;

var CommentsActionsAndSelectionEnum: Dynamic;

var CommentsActionsAndSelectionMessage: string;

var commentsActionsAndSelectionPattern: RegExp;

var resolveCommentsActionsAndSelectionRef: Dynamic;

var CommentsActionsAndSelectionRecurrence: Dynamic;

var CommentsActionsAndSelectionPath: Dynamic;

var CommentsActionsAndSelectionCall: Dynamic;

var CommentsActionsAndSelectionPrompt: Dynamic;

var CommentsActionsAndSelectionCode2: Dynamic;

var CommentsActionsAndSelectionType: Dynamic;

var CommentsActionsAndSelectionEmail: Dynamic;

var commentsActionsAndSelectionSummarySchema: Dynamic;

var commentsActionsAndSelectionValue0: number;

var commentsActionsAndSelectionValue02: number;

var CommentsActionsAndSelectionStarred: Dynamic;

function updateCommentsActionsAndSelectionValue2(
  ..._extraArguments: unknown[]
): Dynamic {
  let CommentsActionsAndSelectionStarred2: Dynamic =
    CommentsActionsAndSelectionStarred(
      (
        updateCommentsActionsAndSelectionValue22?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => updateCommentsActionsAndSelectionValue22.value,
    );
  return [
    (0, React.useMemo)(
      (..._extraArguments: unknown[]): Dynamic =>
        new (Set as Dynamic)(CommentsActionsAndSelectionStarred2),
      [CommentsActionsAndSelectionStarred2],
    ),
    (0, React.useCallback)(
      (
        updateCommentsActionsAndSelectionValue22?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let uniqueItems: Dynamic = new (Set as Dynamic)(
          CommentsActionsAndSelectionStarred.getState().value,
        );
        if (
          !(
            options?.onlyIfSet &&
            !uniqueItems.has(updateCommentsActionsAndSelectionValue22)
          )
        ) {
          if (uniqueItems.has(updateCommentsActionsAndSelectionValue22)) {
            uniqueItems.delete(updateCommentsActionsAndSelectionValue22);
          } else {
            uniqueItems.add(updateCommentsActionsAndSelectionValue22);
          }
          CommentsActionsAndSelectionStarred.getState().set([...uniqueItems]);
        }
      },
      [],
    ),
  ];
}

var commentsActionsAndSelectionValue80: number;

var commentsActionsAndSelectionMap: Dynamic;

var commentsActionsAndSelectionSet: Dynamic;

var commentsActionsAndSelectionValue03: Dynamic;

var commentsActionsAndSelectionState: Dynamic;

var commentsActionsAndSelectionMap2: Dynamic;

var commentsActionsAndSelectionMap3: Dynamic;

var resolveCommentsActionsAndSelectionAccount: Dynamic;

var resolveCommentsActionsAndSelectionSlice: Dynamic;

function resolveCommentsActionsAndSelectionValue2(
  ..._extraArguments: unknown[]
): undefined {
  commentsActionsAndSelectionValue03 += 1;
  for (let resolveCommentsActionsAndSelectionValue2Result of commentsActionsAndSelectionSet as Dynamic)
    resolveCommentsActionsAndSelectionValue2Result();
}

function updateCommentsActionsAndSelectionEmail(
  updateCommentsActionsAndSelectionEmail2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let enabled = false;
  for (let [
    updateCommentsActionsAndSelectionEmailResult,
    contributor,
  ] of Object.entries(updateCommentsActionsAndSelectionEmail2) as Dynamic) {
    if (
      !resolveCommentsActionsAndSelectionAccount(
        updateCommentsActionsAndSelectionEmailResult,
      ) ||
      !contributor ||
      typeof contributor != `object`
    )
      continue;
    let normalizedUpdateCommentsActionsAndSelectionEmailResult: Dynamic =
      updateCommentsActionsAndSelectionEmailResult.toLowerCase();
    let commentsActionsAndSelectionMapEntry: Dynamic =
      commentsActionsAndSelectionMap.get(
        normalizedUpdateCommentsActionsAndSelectionEmailResult,
      );
    let record2: Dynamic = {
      name:
        resolveCommentsActionsAndSelectionSlice(contributor.name) ||
        commentsActionsAndSelectionMapEntry?.name ||
        ``,
      email:
        resolveCommentsActionsAndSelectionSlice(contributor.email) ||
        commentsActionsAndSelectionMapEntry?.email ||
        ``,
    };
    if (
      !(
        (!record2.name && !record2.email) ||
        (commentsActionsAndSelectionMapEntry &&
          commentsActionsAndSelectionMapEntry.name === record2.name &&
          commentsActionsAndSelectionMapEntry.email === record2.email)
      )
    ) {
      commentsActionsAndSelectionMap.set(
        normalizedUpdateCommentsActionsAndSelectionEmailResult,
        record2,
      );
      enabled = true;
    }
  }
  if (enabled) {
    resolveCommentsActionsAndSelectionValue2();
  }
}

var getCommentsActionsAndSelectionToLowerCase: Dynamic;

function resolveCommentsActionsAndSelectionName(
  commentsActionsAndSelectionName?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let commentsActionsAndSelectionToLowerCase: Dynamic =
    getCommentsActionsAndSelectionToLowerCase(commentsActionsAndSelectionName);
  return (
    (commentsActionsAndSelectionToLowerCase &&
      (commentsActionsAndSelectionToLowerCase.name ||
        resolvePlatformSessionAndSourcesValue(
          commentsActionsAndSelectionToLowerCase.email,
        ))) ||
    null
  );
}

function clearCommentsActionsAndSelectionDelete(
  clearCommentsActionsAndSelectionDelete3?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  commentsActionsAndSelectionSet.add(clearCommentsActionsAndSelectionDelete3);
  return (..._extraArguments: unknown[]): undefined =>
    void commentsActionsAndSelectionSet.delete(
      clearCommentsActionsAndSelectionDelete3,
    );
}

async function loadCommentsActionsAndSelectionFilter(
  commentsActionsAndSelectionFilter?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let items: Dynamic = [
    ...new (Set as Dynamic)(
      commentsActionsAndSelectionFilter
        .filter(resolveCommentsActionsAndSelectionAccount)
        .map(
          (
            filteredRolldownNImport?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => filteredRolldownNImport.toLowerCase(),
        ),
    ),
  ];
  await Promise.all(
    items
      .filter(
        (item?: Dynamic, ..._extraArguments: unknown[]) =>
          !commentsActionsAndSelectionMap.has(item),
      )
      .map(updateCommentsActionsAndSelectionResolve),
  );
  let record2: Dynamic = {};
  for (let loadCommentsActionsAndSelectionFilterResult of items as Dynamic)
    record2[loadCommentsActionsAndSelectionFilterResult] =
      resolveCommentsActionsAndSelectionName(
        loadCommentsActionsAndSelectionFilterResult,
      ) ?? ``;
  for (let loadCommentsActionsAndSelectionFilterResult of commentsActionsAndSelectionFilter as Dynamic)
    if (
      resolveCommentsActionsAndSelectionAccount(
        loadCommentsActionsAndSelectionFilterResult,
      ) &&
      !(loadCommentsActionsAndSelectionFilterResult in record2)
    ) {
      record2[loadCommentsActionsAndSelectionFilterResult] =
        record2[loadCommentsActionsAndSelectionFilterResult.toLowerCase()] ??
        ``;
    }
  return record2;
}

function updateCommentsActionsAndSelectionResolve(
  updateCommentsActionsAndSelectionResolve2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!commentsActionsAndSelectionState) return Promise.resolve();
  let commentsActionsAndSelectionMap2Entry: Dynamic =
    commentsActionsAndSelectionMap2.get(
      updateCommentsActionsAndSelectionResolve2,
    );
  if (commentsActionsAndSelectionMap2Entry)
    return commentsActionsAndSelectionMap2Entry;
  let then: Dynamic = new (Promise as Dynamic)(
    (resolve?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (commentsActionsAndSelectionMap3.size === 0) {
        Promise.resolve().then(collectCommentsActionsAndSelectionPeople);
      }
      let commentsActionsAndSelectionMap3Entry: Dynamic =
        commentsActionsAndSelectionMap3.get(
          updateCommentsActionsAndSelectionResolve2,
        ) ?? [];
      commentsActionsAndSelectionMap3Entry.push(resolve);
      commentsActionsAndSelectionMap3.set(
        updateCommentsActionsAndSelectionResolve2,
        commentsActionsAndSelectionMap3Entry,
      );
    },
  ).then(
    (..._extraArguments: unknown[]): undefined =>
      void commentsActionsAndSelectionMap2.delete(
        updateCommentsActionsAndSelectionResolve2,
      ),
  );
  commentsActionsAndSelectionMap2.set(
    updateCommentsActionsAndSelectionResolve2,
    then,
  );
  return then;
}

function collectCommentsActionsAndSelectionPeople(
  ..._extraArguments: unknown[]
): undefined {
  let commentsActionsAndSelectionState2: Dynamic =
    commentsActionsAndSelectionState;
  let items: Dynamic = [...commentsActionsAndSelectionMap3];
  commentsActionsAndSelectionMap3.clear();
  for (let count: number = 0; count < items.length; count += 50) {
    let itemsSlice: Dynamic = items.slice(count, count + 50);
    let mappedItemsSlice: Dynamic = itemsSlice.map(
      ([itemsSlice2]: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        itemsSlice2,
    );
    Promise.resolve()
      .then(
        (..._extraArguments: unknown[]): Dynamic =>
          commentsActionsAndSelectionState2
            ? commentsActionsAndSelectionState2(mappedItemsSlice)
            : {
                people: [],
              },
      )
      .then(
        (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          let people: Dynamic =
            result && typeof result == `object` ? result.people : null;
          if (!Array.isArray(people)) return;
          let record2: Dynamic = {};
          for (let collectCommentsActionsAndSelectionPeopleResult of people as Dynamic) {
            if (
              !collectCommentsActionsAndSelectionPeopleResult ||
              typeof collectCommentsActionsAndSelectionPeopleResult != `object`
            )
              continue;
            let {
              user: collectCommentsActionsAndSelectionPeopleResult2,
              name: name,
              email: email,
            }: Dynamic = collectCommentsActionsAndSelectionPeopleResult;
            if (
              !(
                !resolveCommentsActionsAndSelectionAccount(
                  collectCommentsActionsAndSelectionPeopleResult2,
                ) ||
                !mappedItemsSlice.includes(
                  collectCommentsActionsAndSelectionPeopleResult2.toLowerCase(),
                )
              )
            ) {
              record2[collectCommentsActionsAndSelectionPeopleResult2] = {
                ...(typeof name == `string`
                  ? {
                      name: name,
                    }
                  : {}),
                ...(typeof email == `string`
                  ? {
                      email: email,
                    }
                  : {}),
              };
            }
          }
          updateCommentsActionsAndSelectionEmail(record2);
        },
        (..._extraArguments: unknown[]): undefined => undefined,
      )
      .then((..._extraArguments: unknown[]): undefined => {
        for (let [
          ,
          collectCommentsActionsAndSelectionPeopleResult,
        ] of itemsSlice as Dynamic)
          for (let collectCommentsActionsAndSelectionPeopleResult2 of collectCommentsActionsAndSelectionPeopleResult as Dynamic)
            collectCommentsActionsAndSelectionPeopleResult2();
      });
  }
}

var CommentsActionsAndSelection: string;

function resolveCommentsActionsAndSelectionEvery(
  items?: Dynamic,
  items2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    items.length === items2.length &&
    items.every(
      (
        rolldownNImport2?: Dynamic,
        index?: Dynamic,
        ..._extraArguments: unknown[]
      ) => rolldownNImport2 === items2[index],
    )
  );
}

function resolveCommentsActionsAndSelectionNull(
  commentsActionsAndSelectionNull?: unknown,
  ..._extraArguments: unknown[]
) {
  if (
    commentsActionsAndSelectionNull === undefined ||
    (typeof commentsActionsAndSelectionNull == `number` &&
      !Number.isFinite(commentsActionsAndSelectionNull))
  )
    return `null`;
  try {
    return JSON.stringify(commentsActionsAndSelectionNull) ?? `null`;
  } catch {
    return String(commentsActionsAndSelectionNull);
  }
}

function resolveCommentsActionsAndSelectionStart(
  commentsActionsAndSelectionStart?: Dynamic,
  options?: Dynamic,
  context: Dynamic = ``,
  ..._extraArguments: unknown[]
): Dynamic {
  let lines: Dynamic = [];
  let pin: Dynamic = null;
  let resolveCommentsActionsAndSelectionStartHandler: Dynamic = (
    commentsActionsAndSelectionStart2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => JSON.stringify(commentsActionsAndSelectionStart2) + `: `;
  function resolveCommentsActionsAndSelectionStartHandler2(
    items?: unknown,
    options2?: Dynamic,
    context2?: Dynamic,
    dependencies?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    let repeat = CommentsActionsAndSelection.repeat(dependencies);
    let start: Dynamic = lines.length;
    if (Array.isArray(items)) {
      if (items.length === 0) {
        lines.push(repeat + context2 + `[]`);
      } else {
        lines.push(repeat + context2 + `[`);
        items.forEach(
          (
            item?: Dynamic,
            index?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            let commentsActionsAndSelectionStartHandler: Dynamic =
              resolveCommentsActionsAndSelectionStartHandler2(
                item,
                [...options2, String(index)],
                ``,
                dependencies + 1,
              );
            if (index < items.length - 1) {
              lines[commentsActionsAndSelectionStartHandler.end] += `,`;
            }
          },
        );
        lines.push(repeat + `]`);
      }
    } else if (typeof items == `object` && items) {
      let itemsKeys = Object.keys(items);
      if (itemsKeys.length === 0) {
        lines.push(repeat + context2 + `{}`);
      } else {
        lines.push(repeat + context2 + `{`);
        itemsKeys.forEach(
          (
            itemsKey?: Dynamic,
            index?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            let commentsActionsAndSelectionStartHandler: Dynamic =
              resolveCommentsActionsAndSelectionStartHandler2(
                resolveDataModelSchemasHasOwn(items, itemsKey),
                [...options2, itemsKey],
                resolveCommentsActionsAndSelectionStartHandler(itemsKey),
                dependencies + 1,
              );
            if (index < itemsKeys.length - 1) {
              lines[commentsActionsAndSelectionStartHandler.end] += `,`;
            }
          },
        );
        lines.push(repeat + `}`);
      }
    } else
      lines.push(
        repeat + context2 + resolveCommentsActionsAndSelectionNull(items),
      );
    let end = lines.length - 1;
    if (
      options !== null &&
      resolveCommentsActionsAndSelectionEvery(options2, options)
    ) {
      pin = {
        start: start,
        end: end,
      };
    }
    return {
      start: start,
      end: end,
    };
  }
  resolveCommentsActionsAndSelectionStartHandler2(
    commentsActionsAndSelectionStart,
    [],
    context,
    0,
  );
  return {
    lines: lines,
    pin: pin,
  };
}

function resolveCommentsActionsAndSelectionKind(
  commentsActionsAndSelectionKind?: Dynamic,
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return items === undefined || items.length === 0
    ? {
        kind: `no-path`,
      }
    : resolveDataOperationEngineValue25(
          commentsActionsAndSelectionKind,
          items,
        ) === undefined
      ? {
          kind: `unresolved`,
          pointer:
            collectDataOperationEngineJoin(items) ?? `/` + items.join(`/`),
        }
      : {
          kind: `highlight`,
          pinPath: [...items],
        };
}

var commentsActionsAndSelectionValue250000: number;

var commentsActionsAndSelectionValue40000: number;

function resolveCommentsActionsAndSelectionNull2(
  commentsActionsAndSelectionNull2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  try {
    return (JSON.stringify(commentsActionsAndSelectionNull2) ?? `null`).length;
  } catch {
    return 1 / 0;
  }
}

function resolveCommentsActionsAndSelectionLines(
  commentsActionsAndSelectionLines?: Dynamic,
  pin?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let shown: number = 0;
  let lines: Dynamic = [];
  for (let items of commentsActionsAndSelectionLines as Dynamic) {
    let total: Dynamic = items.length + 1;
    if (shown + total > context && lines.length > 0) {
      lines.push(`… (truncated)`);
      return {
        lines: lines,
        pin:
          pin === null
            ? null
            : {
                start: pin.start,
                end: Math.min(pin.end, lines.length - 2),
              },
        shown: shown,
      };
    }
    lines.push(items);
    shown += total;
  }
  return {
    lines: lines,
    pin: pin,
    shown: shown,
  };
}

function resolveCommentsActionsAndSelectionLines2(
  commentsActionsAndSelectionLines2?: Dynamic,
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let commentsActionsAndSelectionKind: Dynamic =
    resolveCommentsActionsAndSelectionKind(
      commentsActionsAndSelectionLines2,
      items,
    );
  let total = resolveCommentsActionsAndSelectionNull2(
    commentsActionsAndSelectionLines2,
  );
  if (total <= 25e4) {
    let { lines: lines2, pin: pin }: Dynamic =
      resolveCommentsActionsAndSelectionStart(
        commentsActionsAndSelectionLines2,
        commentsActionsAndSelectionKind.kind === `highlight`
          ? commentsActionsAndSelectionKind.pinPath
          : null,
      );
    return {
      lines: lines2,
      pin: pin,
      ...(commentsActionsAndSelectionKind.kind === `unresolved`
        ? {
            unresolved: {
              pointer: commentsActionsAndSelectionKind.pointer,
            },
          }
        : {}),
    };
  }
  if (commentsActionsAndSelectionKind.kind === `highlight`) {
    let dataOperationEngineValue25: Dynamic = resolveDataOperationEngineValue25(
      commentsActionsAndSelectionLines2,
      items,
    );
    let itemItem: Dynamic = items[items.length - 1];
    let commentsActionsAndSelectionStart: Dynamic =
      resolveCommentsActionsAndSelectionStart(
        dataOperationEngineValue25,
        [],
        dataOperationEnginePattern6.test(itemItem)
          ? ``
          : JSON.stringify(itemItem) + `: `,
      );
    let commentsActionsAndSelectionLines: Dynamic =
      resolveCommentsActionsAndSelectionLines(
        commentsActionsAndSelectionStart.lines,
        commentsActionsAndSelectionStart.pin,
        commentsActionsAndSelectionValue40000,
      );
    return {
      lines: commentsActionsAndSelectionLines.lines,
      pin: commentsActionsAndSelectionLines.pin,
      truncated: {
        mode: `focus`,
        total: total,
        shown: commentsActionsAndSelectionLines.shown,
      },
    };
  }
  let items2: Dynamic;
  try {
    items2 =
      JSON.stringify(commentsActionsAndSelectionLines2, null, 2) ?? `null`;
  } catch {
    items2 = String(commentsActionsAndSelectionLines2);
  }
  let items3: Dynamic =
    items2.length <= 25e4
      ? items2
      : items2.slice(0, commentsActionsAndSelectionValue250000);
  let lines: Dynamic = items3.split(`
`);
  if (items3.length < items2.length) {
    lines.push(`… (truncated)`);
  }
  return {
    lines: lines,
    pin: null,
    truncated: {
      mode: `head`,
      total: total,
      shown: items3.length,
    },
    ...(commentsActionsAndSelectionKind.kind === `unresolved`
      ? {
          unresolved: {
            pointer: commentsActionsAndSelectionKind.pointer,
          },
        }
      : {}),
  };
}

var CommentsActionsAndSelectionState4: Dynamic;

function resolveCommentsActionsAndSelectionValue3(
  commentsActionsAndSelectionValue3?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  CommentsActionsAndSelectionState4 = commentsActionsAndSelectionValue3;
}

function resolveCommentsActionsAndSelectionValue4(
  ..._extraArguments: unknown[]
) {
  return CommentsActionsAndSelectionState4 !== null;
}

function resolveCommentsActionsAndSelectionValue5(
  commentsActionsAndSelectionValue5?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  CommentsActionsAndSelectionState4?.(commentsActionsAndSelectionValue5);
}

var commentsActionsAndSelectionPattern2: RegExp;

function resolveCommentsActionsAndSelectionBlobId(
  commentsActionsAndSelectionBlobId?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    typeof commentsActionsAndSelectionBlobId != `object` ||
    !commentsActionsAndSelectionBlobId ||
    Array.isArray(commentsActionsAndSelectionBlobId)
  )
    return null;
  let commentsActionsAndSelectionBlobId2: Dynamic =
    commentsActionsAndSelectionBlobId;
  if (commentsActionsAndSelectionBlobId2.object !== `blob`) return null;
  let adapter: Dynamic = commentsActionsAndSelectionBlobId2.adapter;
  if (
    typeof adapter != `object` ||
    !adapter ||
    adapter.kind !== `xlsx-values` ||
    typeof commentsActionsAndSelectionBlobId2.id != `string` ||
    !commentsActionsAndSelectionPattern2.test(
      commentsActionsAndSelectionBlobId2.id,
    )
  )
    return null;
  let path: Dynamic = Array.isArray(commentsActionsAndSelectionBlobId2.path)
    ? commentsActionsAndSelectionBlobId2.path
    : [];
  let sheet = typeof path[0] == `string` && path[0].length > 0 ? path[0] : null;
  let pathItem =
    sheet !== null && typeof path[1] == `string` && path[1].length > 0
      ? path[1]
      : null;
  return {
    blobId: commentsActionsAndSelectionBlobId2.id,
    sheet: sheet,
    a1: pathItem,
  };
}

var CommentsActionsAndSelectionResultJson: string;

var resolveCommentsActionsAndSelectionTruncated: Dynamic;

var resolveCommentsActionsAndSelectionEvery2: Dynamic;

function resolveCommentsActionsAndSelectionKind2(
  commentsActionsAndSelectionKind2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let entry: Dynamic = commentsActionsAndSelectionKind2.entries.find(
    (entry2?: Dynamic, ..._extraArguments: unknown[]) =>
      entry2.name === CommentsActionsAndSelectionResultJson,
  );
  return entry === undefined
    ? {
        kind: `missing`,
      }
    : entry.blob === undefined
      ? entry.object === undefined
        ? {
            kind: `value`,
            value: entry.text,
          }
        : resolveCommentsActionsAndSelectionTruncated(entry.object)
          ? {
              kind: `too-large`,
              bytes: entry.object._bytes,
            }
          : resolveCommentsActionsAndSelectionEvery2(entry.object)
            ? {
                kind: `rows`,
                rows: entry.object,
              }
            : {
                kind: `value`,
                value: entry.object,
              }
      : {
          kind: `too-large`,
          bytes: entry.blob.size,
        };
}

function resolveCommentsActionsAndSelectionKind3(
  items?: Dynamic,
  items2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!resolveDataOperationEngineEvery(items2))
    return {
      kind: `bad-path`,
    };
  let itemItem: Dynamic = items2[0];
  if (!dataOperationEnginePattern6.test(itemItem))
    return {
      kind: `bad-path`,
    };
  let row = Number(itemItem);
  if (row >= items.length)
    return {
      kind: `row-not-stored`,
      row: row,
      rowCount: items.length,
    };
  if (items2.length === 1)
    return {
      kind: `row`,
      row: row,
    };
  let column: Dynamic = items2[1];
  let itemItem2: Dynamic = items[row];
  return Object.hasOwn(itemItem2, column)
    ? {
        kind: `cell`,
        row: row,
        column: column,
        value:
          items2.length === 2
            ? resolveDataModelSchemasHasOwn(itemItem2, column)
            : resolveDataOperationEngineValue25(items, items2),
      }
    : {
        kind: `no-column`,
        row: row,
        column: clampAnchorLabel(column),
      };
}

function resolveCommentsActionsAndSelectionCell(
  entry?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return entry?.kind === `cell` ||
    entry?.kind === `row` ||
    entry?.kind === `no-column`
    ? entry.row
    : null;
}

function useCommentsActionsAndSelectionAccount(
  commentsActionsAndSelectionAccount?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  let commentsActionsAndSelectionAccount2 =
    typeof commentsActionsAndSelectionAccount == `string` &&
    resolveEditorAnchorsAndMentionsOther(commentsActionsAndSelectionAccount) ===
      `account`
      ? commentsActionsAndSelectionAccount
      : null;
  let useSyncExternalStore: Dynamic = (0, React.useSyncExternalStore)(
    clearCommentsActionsAndSelectionDelete,
    (..._extraArguments: unknown[]): Dynamic =>
      commentsActionsAndSelectionAccount2 === null
        ? null
        : resolveCommentsActionsAndSelectionName(
            commentsActionsAndSelectionAccount2,
          ),
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (
        commentsActionsAndSelectionAccount2 !== null &&
        getCommentsActionsAndSelectionToLowerCase(
          commentsActionsAndSelectionAccount2,
        ) === undefined
      ) {
        loadCommentsActionsAndSelectionFilter([
          commentsActionsAndSelectionAccount2,
        ]);
      }
    },
    [commentsActionsAndSelectionAccount2],
  );
  return useSyncExternalStore;
}

function useCommentsActionsAndSelectionPlatform(
  commentsActionsAndSelectionPlatform?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  let commentsActionsAndSelectionPlatform2 =
    typeof commentsActionsAndSelectionPlatform == `string` &&
    resolveEditorAnchorsAndMentionsOther(
      commentsActionsAndSelectionPlatform,
    ) === `platform` &&
    inFrame()
      ? commentsActionsAndSelectionPlatform
      : null;
  let useSyncExternalStore: Dynamic = (0, React.useSyncExternalStore)(
    frameFacesSubscribe,
    (..._extraArguments: unknown[]): Dynamic =>
      commentsActionsAndSelectionPlatform2 === null
        ? undefined
        : framePeekProfile(commentsActionsAndSelectionPlatform2),
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (
        commentsActionsAndSelectionPlatform2 !== null &&
        framePeekProfile(commentsActionsAndSelectionPlatform2) === undefined
      ) {
        frameProfiles([commentsActionsAndSelectionPlatform2]);
      }
    },
    [commentsActionsAndSelectionPlatform2],
  );
  return commentsActionsAndSelectionPlatform2 === null
    ? null
    : useSyncExternalStore;
}

function resolveCommentsActionsAndSelectionValue6(
  commentsActionsAndSelectionValue6?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return context === commentsActionsAndSelectionValue6
    ? `file/${options}`
    : `project/${commentsActionsAndSelectionValue6}`;
}

function resolveCommentsActionsAndSelectionKind4(
  commentsActionsAndSelectionKind4?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let commentsActionsAndSelectionNoun: Dynamic =
    resolveCommentsActionsAndSelectionNoun(commentsActionsAndSelectionKind4);
  if (commentsActionsAndSelectionNoun === null) return null;
  if (commentsActionsAndSelectionNoun.noun === `project`)
    return commentsActionsAndSelectionNoun.container === undefined
      ? resolveDataContentAndReferencesKind2({
          kind: `project`,
          id: commentsActionsAndSelectionNoun.id,
        })
      : null;
  if (!dataContentAndReferencesSet.has(commentsActionsAndSelectionNoun.noun))
    return null;
  let container: Dynamic = commentsActionsAndSelectionNoun.container ?? options;
  if (container === undefined) return null;
  let dataContentAndReferencesKind = resolveDataContentAndReferencesKind({
    container: {
      kind: `project`,
      id: container,
    },
    ref: {
      noun: commentsActionsAndSelectionNoun.noun,
      id: commentsActionsAndSelectionNoun.id,
    },
  });
  return commentsActionsAndSelectionNoun.anchor === undefined
    ? dataContentAndReferencesKind
    : `${dataContentAndReferencesKind}#${commentsActionsAndSelectionNoun.anchor}`;
}

function resolveCommentsActionsAndSelectionValue7(
  commentsActionsAndSelectionValue7?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let commentsActionsAndSelectionKind4 =
    resolveCommentsActionsAndSelectionKind4(
      commentsActionsAndSelectionValue7,
      options,
    );
  return commentsActionsAndSelectionKind4 === null
    ? null
    : `claude:/${commentsActionsAndSelectionKind4}`;
}

function resolveCommentsActionsAndSelectionRef2(
  commentsActionsAndSelectionRef2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let editorAnchorsAndMentionsRef: Dynamic = resolveEditorAnchorsAndMentionsRef(
    commentsActionsAndSelectionRef2,
  );
  return editorAnchorsAndMentionsRef === null
    ? null
    : {
        ref: editorAnchorsAndMentionsRef.ref,
        kind: editorAnchorsAndMentionsRef.kind,
      };
}

function resolveCommentsActionsAndSelectionNoun(
  commentsActionsAndSelectionNoun?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let editorAnchorsAndMentionsRef: Dynamic = resolveEditorAnchorsAndMentionsRef(
    commentsActionsAndSelectionNoun,
  );
  if (editorAnchorsAndMentionsRef === null) return null;
  let refIndex: Dynamic = editorAnchorsAndMentionsRef.ref.indexOf(`#`);
  let refSlice: Dynamic =
    refIndex >= 0
      ? editorAnchorsAndMentionsRef.ref.slice(0, refIndex)
      : editorAnchorsAndMentionsRef.ref;
  let anchor: Dynamic =
    refIndex >= 0
      ? editorAnchorsAndMentionsRef.ref.slice(refIndex + 1)
      : undefined;
  let refSliceParts: Dynamic = refSlice.split(`/`);
  return refSliceParts[0] === `project` && refSliceParts.length === 2
    ? {
        noun: `project`,
        id: refSliceParts[1],
        ...(anchor === undefined
          ? {}
          : {
              anchor: anchor,
            }),
      }
    : refSliceParts[0] === `project` && refSliceParts.length === 4
      ? {
          container: refSliceParts[1],
          noun: refSliceParts[2],
          id: refSliceParts[3],
          ...(anchor === undefined
            ? {}
            : {
                anchor: anchor,
              }),
        }
      : refSliceParts.length === 2
        ? {
            noun: refSliceParts[0],
            id: refSliceParts[1],
            ...(anchor === undefined
              ? {}
              : {
                  anchor: anchor,
                }),
          }
        : null;
}

function resolveCommentsActionsAndSelectionLane(
  commentsActionsAndSelectionLane?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return commentsActionsAndSelectionLane.frame &&
    commentsActionsAndSelectionLane.ownPage
    ? `lane`
    : `door`;
}

function resolveCommentsActionsAndSelectionProject(
  commentsActionsAndSelectionProject?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let frameBootContainer2: Dynamic = frameBootContainer();
  return (
    frameBootContainer2 !== null &&
    frameBootContainer2.kind === `project` &&
    frameBootContainer2.id === commentsActionsAndSelectionProject
  );
}

function resolveCommentsActionsAndSelectionVerdict(
  response?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return response.verdict === `deny`
    ? response
    : {
        verdict: `allow`,
        diff: [],
        ...(response.value === undefined
          ? {}
          : {
              value: response.value,
            }),
      };
}

async function loadCommentsActionsAndSelectionFrame(
  commentsActionsAndSelectionFrame?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  return resolveCommentsActionsAndSelectionLane({
    frame: options.frame,
    ownPage: options.ownPage,
  }) === `lane`
    ? resolveCommentsActionsAndSelectionVerdict(
        await options.lane(commentsActionsAndSelectionFrame),
      )
    : options.door(commentsActionsAndSelectionFrame);
}

function resolveCommentsActionsAndSelectionFrame(
  commentsActionsAndSelectionFrame?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return loadCommentsActionsAndSelectionFrame(
    commentsActionsAndSelectionFrame,
    {
      frame: inFrame(),
      ownPage: resolveCommentsActionsAndSelectionProject(
        commentsActionsAndSelectionFrame,
      ),
      lane: frameProjectAck,
      door: (
        commentsActionsAndSelectionFrame2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        loadPlatformSessionAndSourcesAckOf(
          commentsActionsAndSelectionFrame2,
          resolvePlatformSessionAndSourcesVerb4(
            commentsActionsAndSelectionFrame2,
          ),
          options,
        ),
    },
  );
}

var commentsActionsAndSelectionSet2: Dynamic;

var commentsActionsAndSelectionValue512: number;

var resolveCommentsActionsAndSelectionValue8: Dynamic;

var resolveCommentsActionsAndSelectionFlatMap: Dynamic;

function resolveCommentsActionsAndSelectionEvery3(
  commentsActionsAndSelectionEvery3?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (Array.isArray(commentsActionsAndSelectionEvery3))
    return commentsActionsAndSelectionEvery3.every(
      (rolldownNImport2?: unknown, ..._extraArguments: unknown[]) =>
        typeof rolldownNImport2 == `string`,
    )
      ? [...commentsActionsAndSelectionEvery3]
      : [];
  if (
    !resolveCommentsActionsAndSelectionValue8(
      commentsActionsAndSelectionEvery3,
    ) ||
    typeof commentsActionsAndSelectionEvery3.from != `string`
  )
    return [];
  let lastIndexOf: Dynamic =
    commentsActionsAndSelectionEvery3.from.lastIndexOf(`.`);
  let number2 = Number(
    commentsActionsAndSelectionEvery3.from.slice(lastIndexOf + 1),
  );
  let length2: Dynamic =
    typeof commentsActionsAndSelectionEvery3.count == `number` &&
    Number.isInteger(commentsActionsAndSelectionEvery3.count)
      ? commentsActionsAndSelectionEvery3.count
      : 0;
  if (
    lastIndexOf <= 0 ||
    !Number.isInteger(number2) ||
    number2 < 0 ||
    length2 <= 0 ||
    length2 > 2e4
  )
    return [];
  let fromSlice: Dynamic = commentsActionsAndSelectionEvery3.from.slice(
    0,
    lastIndexOf,
  );
  return Array.from<Dynamic, Dynamic>(
    {
      length: length2,
    },
    (
      commentsActionsAndSelectionEvery32?: unknown,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) => `${fromSlice}.${number2 + options}`,
  );
}

function resolveCommentsActionsAndSelectionValue9(
  commentsActionsAndSelectionValue9?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dataOperationControlMinted: Dynamic = commentsActionsAndSelectionValue9
    ? resolveDataOperationControlMinted(commentsActionsAndSelectionValue9)
    : [];
  return dataOperationControlMinted !== null &&
    dataOperationControlMinted.length > 0
    ? dataOperationControlMinted
    : options
      ? resolveCommentsActionsAndSelectionEvery3(options.ids)
      : [];
}

function resolveCommentsActionsAndSelectionBlocks(
  commentsActionsAndSelectionBlocks?: Dynamic,
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let source: Dynamic = resolveCommentsActionsAndSelectionValue8(
    commentsActionsAndSelectionBlocks.source,
  )
    ? commentsActionsAndSelectionBlocks.source
    : resolveCommentsActionsAndSelectionValue8(
          commentsActionsAndSelectionBlocks.with,
        )
      ? commentsActionsAndSelectionBlocks.with
      : null;
  let content: Dynamic = (
    source && resolveCommentsActionsAndSelectionValue8(source.from)
      ? source.from
      : null
  )?.content;
  if (
    !Array.isArray(content) ||
    (source.as !== `blocks` && source.as !== undefined)
  )
    return null;
  let items2: Dynamic = [];
  if (items.length === 0) return items2;
  let uniqueItems: Dynamic = new (Set as Dynamic)(items);
  let count: number = 0;
  let index = 0;
  let helloBImport2 = (
    node?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      index++ > 8 * commentsActionsAndSelectionValue512 ||
      options > 64 ||
      !resolveCommentsActionsAndSelectionValue8(node)
    )
      return;
    if (node.type === `text`) {
      count +=
        typeof node.text == `string`
          ? Array.from<Dynamic>(node.text).length
          : 0;
      return;
    }
    let id: Dynamic = resolveCommentsActionsAndSelectionValue8(node.attrs)
      ? node.attrs.id
      : undefined;
    let id2: Dynamic =
      typeof id == `string` && uniqueItems.has(id) ? id : items[count];
    count += 1;
    if (
      typeof node.type == `string` &&
      !commentsActionsAndSelectionSet2.has(node.type) &&
      id2 !== undefined
    ) {
      items2.push(id2);
    }
    if (Array.isArray(node.content))
      for (let resolveCommentsActionsAndSelectionBlocksResult of node.content as Dynamic)
        helloBImport2(
          resolveCommentsActionsAndSelectionBlocksResult,
          options + 1,
        );
  };
  for (let resolveCommentsActionsAndSelectionBlocksResult of content as Dynamic)
    helloBImport2(resolveCommentsActionsAndSelectionBlocksResult, 0);
  return items2;
}

function resolveCommentsActionsAndSelectionStand(
  commentsActionsAndSelectionStand?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let stand: Dynamic = [];
  let retired: Dynamic = [];
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let resolveObservabilityBrowserAndOperationEventsTest92 = (
    commentsActionsAndSelectionStand3?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      !(
        stand.length >= commentsActionsAndSelectionValue512 ||
        !resolveObservabilityBrowserAndOperationEventsTest9(
          commentsActionsAndSelectionStand3,
        ) ||
        uniqueItems.has(commentsActionsAndSelectionStand3)
      )
    ) {
      uniqueItems.add(commentsActionsAndSelectionStand3);
      stand.push(commentsActionsAndSelectionStand3);
    }
  };
  let commentsActionsAndSelectionStand2: Dynamic = Array.isArray(
    commentsActionsAndSelectionStand,
  )
    ? commentsActionsAndSelectionStand
    : [];
  let options2: Dynamic = Array.isArray(options) ? options : [];
  let max = Math.max(commentsActionsAndSelectionStand2.length, options2.length);
  for (
    let index = 0;
    index < max && index < commentsActionsAndSelectionValue512;
    index++
  ) {
    let commentsActionsAndSelectionStandItem: Dynamic =
      commentsActionsAndSelectionStand2[index];
    let commentsActionsAndSelectionStandItem2: Dynamic =
      resolveCommentsActionsAndSelectionValue8(
        commentsActionsAndSelectionStandItem,
      )
        ? commentsActionsAndSelectionStandItem
        : null;
    let blocks: Dynamic =
      commentsActionsAndSelectionStandItem2 &&
      Array.isArray(commentsActionsAndSelectionStandItem2.blocks)
        ? commentsActionsAndSelectionStandItem2.blocks
        : null;
    if (blocks !== null) {
      for (let resolveCommentsActionsAndSelectionStandResult of blocks as Dynamic)
        if (
          resolveCommentsActionsAndSelectionValue8(
            resolveCommentsActionsAndSelectionStandResult,
          )
        ) {
          resolveObservabilityBrowserAndOperationEventsTest92(
            resolveCommentsActionsAndSelectionStandResult.id,
          );
        }
    } else {
      let optionItem: Dynamic = options2[index];
      let optionItem2: Dynamic = resolveCommentsActionsAndSelectionValue8(
        optionItem,
      )
        ? optionItem
        : null;
      let commentsActionsAndSelectionValue9: Dynamic =
        resolveCommentsActionsAndSelectionValue9(
          commentsActionsAndSelectionStandItem2,
          optionItem2,
        );
      if (optionItem2?.op === `split` || optionItem2?.op === `wrap`)
        for (let resolveCommentsActionsAndSelectionStandResult of (commentsActionsAndSelectionValue9.length >
        0
          ? commentsActionsAndSelectionValue9
          : resolveCommentsActionsAndSelectionFlatMap(
              optionItem2.id,
            )) as Dynamic)
          resolveObservabilityBrowserAndOperationEventsTest92(
            resolveCommentsActionsAndSelectionStandResult,
          );
      else if (
        optionItem2 &&
        (optionItem2.op === `insert` || optionItem2.op === `replace`)
      )
        for (let resolveCommentsActionsAndSelectionStandResult of (resolveCommentsActionsAndSelectionBlocks(
          optionItem2,
          commentsActionsAndSelectionValue9,
        ) ?? []) as Dynamic)
          resolveObservabilityBrowserAndOperationEventsTest92(
            resolveCommentsActionsAndSelectionStandResult,
          );
    }
    if (commentsActionsAndSelectionStandItem2)
      for (let resolveCommentsActionsAndSelectionStandResult of resolveCommentsActionsAndSelectionFlatMap(
        commentsActionsAndSelectionStandItem2.retired,
      ) as Dynamic)
        if (
          resolveObservabilityBrowserAndOperationEventsTest9(
            resolveCommentsActionsAndSelectionStandResult,
          ) &&
          retired.length < commentsActionsAndSelectionValue512
        ) {
          retired.push(resolveCommentsActionsAndSelectionStandResult);
        }
  }
  return {
    stand: stand,
    retired: retired,
  };
}

function updateCommentsActionsAndSelectionStand(
  updateCommentsActionsAndSelectionStand2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument: Dynamic = resolveCommentsActionsAndSelectionStand(options, context),
  ..._extraArguments: unknown[]
) {
  let { stand: argument2, retired: argument3 }: Dynamic = argument;
  let enabled = false;
  for (let updateCommentsActionsAndSelectionStandResult of argument2 as Dynamic)
    if (
      !updateCommentsActionsAndSelectionStand2.has(
        updateCommentsActionsAndSelectionStandResult,
      )
    ) {
      updateCommentsActionsAndSelectionStand2.set(
        updateCommentsActionsAndSelectionStandResult,
        {
          rank: dependencies(),
          size: 0,
          text: false,
        },
      );
      enabled = true;
    }
  for (let updateCommentsActionsAndSelectionStandResult of argument3 as Dynamic)
    if (
      updateCommentsActionsAndSelectionStand2.delete(
        updateCommentsActionsAndSelectionStandResult,
      )
    ) {
      enabled = true;
    }
  return enabled;
}

var commentsActionsAndSelectionSet3: Dynamic;

function clearCommentsActionsAndSelectionDelete2(
  clearCommentsActionsAndSelectionDelete22?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  commentsActionsAndSelectionSet3.add(clearCommentsActionsAndSelectionDelete22);
  return (..._extraArguments: unknown[]): undefined =>
    void commentsActionsAndSelectionSet3.delete(
      clearCommentsActionsAndSelectionDelete22,
    );
}

function resolveCommentsActionsAndSelectionFrom(
  ..._extraArguments: unknown[]
): undefined {
  for (let resolveCommentsActionsAndSelectionFromResult of Array.from<Dynamic>(
    commentsActionsAndSelectionSet3,
  ) as Dynamic)
    try {
      resolveCommentsActionsAndSelectionFromResult();
    } catch {}
}

var resolveCommentsActionsAndSelectionValue10: Dynamic;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeCommentsActionsAndSelectionStep1(): void {
  (CommentsActionsAndSelectionChrome = [[`chrome`, `embed`]]);
  (commentsActionsAndSelectionFrameTFrameVValues = [`__frame_t`, `__frame_v`]);
  (CommentsActionsAndSelectionState = null);
  (CommentsActionsAndSelectionUntitledXlsx = `Untitled.xlsx`);
  (CommentsActionsAndSelectionState2 = 3 * 4e3);
  (commentsActionsAndSelectionSchema = new (Schema as Dynamic)({
    nodes: {
      doc: {
        content: `paragraph+`,
      },
      paragraph: {
        content: `inline*`,
        group: `block`,
      },
      text: {
        group: `inline`,
      },
      hardBreak: {
        inline: true,
        group: `inline`,
        selectable: false,
      },
    },
  }));
  (CommentsActionsAndSelectionText = lazyZod.lazy(
    (..._extraArguments: unknown[]): Dynamic =>
      lazyZod
        .object({
          type: lazyZod.string(),
          content: lazyZod.array(CommentsActionsAndSelectionText).optional(),
          text: lazyZod.string().optional(),
        })
        .strict(),
  ));
  (CommentsActionsAndSelectionCode = CommentsActionsAndSelectionText.refine(
      (
        commentsActionsAndSelectionCode?: Dynamic,
        ..._extraArguments: unknown[]
      ) => commentsActionsAndSelectionCode.type === `doc`,
      `prompt doc root must be type "doc"`,
    ).superRefine(
      (
        commentsActionsAndSelectionCode?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        try {
          resolveCommentsActionsAndSelectionCause(
            commentsActionsAndSelectionCode,
          );
        } catch (error: Dynamic) {
          options.addIssue({
            code: `custom`,
            message: error instanceof Error ? error.message : String(error),
          });
        }
      },
    ));
  (CommentsActionsAndSelectionRecord = lazyZod.record(
    lazyZod.string(),
    lazyZod.unknown(),
  ));
  (CommentsActionsAndSelectionUnique = lazyZod.object({
    pk: lazyZod
      .union([lazyZod.string(), lazyZod.array(lazyZod.string())])
      .optional(),
    unique: lazyZod.array(lazyZod.array(lazyZod.string())).optional(),
    indexes: lazyZod
      .array(
        lazyZod.object({
          on: lazyZod.array(lazyZod.string()),
        }),
      )
      .optional(),
    references: lazyZod
      .array(
        lazyZod.object({
          on: lazyZod.string(),
          table: lazyZod.string(),
          column: lazyZod.string(),
        }),
      )
      .optional(),
  }));
  (CommentsActionsAndSelectionDescription = lazyZod
    .object({
      description: lazyZod.string().optional(),
      columns: CommentsActionsAndSelectionRecord,
      required: lazyZod.array(lazyZod.string()).optional(),
      keys: CommentsActionsAndSelectionUnique.optional(),
    })
    .superRefine(
      (
        commentsActionsAndSelectionDescription?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let columns: Dynamic = commentsActionsAndSelectionDescription.columns;
        let hasOwn: Dynamic = (
          commentsActionsAndSelectionDescription2?: Dynamic,
          ..._extraArguments: unknown[]
        ) => Object.hasOwn(columns, commentsActionsAndSelectionDescription2);
        let pk2: Dynamic = commentsActionsAndSelectionDescription.keys?.pk;
        for (let commentsActionsAndSelectionDescriptionResult of (pk2 == null
          ? []
          : Array.isArray(pk2)
            ? pk2
            : [pk2]) as Dynamic)
          if (!hasOwn(commentsActionsAndSelectionDescriptionResult)) {
            options.addIssue({
              code: `custom`,
              path: [`keys`, `pk`],
              message: `pk '${commentsActionsAndSelectionDescriptionResult}' is not a column`,
            });
          }
        for (let commentsActionsAndSelectionDescriptionResult of (commentsActionsAndSelectionDescription
          .keys?.references ?? []) as Dynamic)
          if (!hasOwn(commentsActionsAndSelectionDescriptionResult.on)) {
            options.addIssue({
              code: `custom`,
              path: [`keys`, `references`],
              message: `references.on '${commentsActionsAndSelectionDescriptionResult.on}' is not a column`,
            });
          }
        for (let commentsActionsAndSelectionDescriptionResult of (commentsActionsAndSelectionDescription
          .keys?.unique ?? []) as Dynamic)
          for (let commentsActionsAndSelectionDescriptionResult2 of commentsActionsAndSelectionDescriptionResult as Dynamic)
            if (!hasOwn(commentsActionsAndSelectionDescriptionResult2)) {
              options.addIssue({
                code: `custom`,
                path: [`keys`, `unique`],
                message: `unique '${commentsActionsAndSelectionDescriptionResult2}' is not a column`,
              });
            }
        for (let commentsActionsAndSelectionDescriptionResult of (commentsActionsAndSelectionDescription
          .keys?.indexes ?? []) as Dynamic)
          for (let commentsActionsAndSelectionDescriptionResult2 of commentsActionsAndSelectionDescriptionResult.on as Dynamic)
            if (!hasOwn(commentsActionsAndSelectionDescriptionResult2)) {
              options.addIssue({
                code: `custom`,
                path: [`keys`, `indexes`],
                message: `indexes.on '${commentsActionsAndSelectionDescriptionResult2}' is not a column`,
              });
            }
      },
    ));
  (CommentsActionsAndSelectionState3 = RegExp(
    `^${EditorAnchorsAndMentionsStyles}$`,
  ));
  (CommentsActionsAndSelectionRegex = lazyZod
    .string()
    .regex(
      CommentsActionsAndSelectionState3,
      `must match /^${EditorAnchorsAndMentionsStyles}$/`,
    ));
  (CommentsActionsAndSelectionColor = lazyZod.object({
    color: lazyZod.string(),
    label: lazyZod.string().optional(),
    icon: lazyZod.string().optional(),
  }));
  (CommentsActionsAndSelectionEnum = lazyZod.object({
    enum: lazyZod.array(lazyZod.string()).min(1),
    "x-display": lazyZod
      .record(lazyZod.string(), CommentsActionsAndSelectionColor)
      .optional(),
  }));
  (CommentsActionsAndSelectionMessage = `#/types/`);
  (commentsActionsAndSelectionPattern = /^#\/types\/([a-z0-9][a-z0-9-_]{0,63})$/);
  (resolveCommentsActionsAndSelectionRef = (
    commentsActionsAndSelectionRef?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    typeof commentsActionsAndSelectionRef == `object` &&
    !!commentsActionsAndSelectionRef &&
    !Array.isArray(commentsActionsAndSelectionRef) &&
    typeof commentsActionsAndSelectionRef.$ref == `string` &&
    commentsActionsAndSelectionRef.$ref.startsWith(
      CommentsActionsAndSelectionMessage,
    ));
  lazyZod.strictObject({
    $param: lazyZod.string().min(1),
  });
  (CommentsActionsAndSelectionRecurrence = lazyZod.object({
    recurrence: lazyZod.object({
      rrule: lazyZod.string().min(1),
      tz: lazyZod.string().min(1),
    }),
    run_as: lazyZod.string().min(1),
    condition: lazyZod
      .object({
        type: lazyZod.literal(`code`),
        code: lazyZod.string(),
      })
      .optional(),
    overlap: lazyZod.enum([`skip`, `queue`, `allow`]).default(`skip`),
  }));
  (CommentsActionsAndSelectionPath = lazyZod.object({
    path: lazyZod.string().min(1),
    target: lazyZod.string().min(1).optional(),
    mode: lazyZod.enum([`replace`, `merge`]).optional(),
    file: lazyZod.string().min(1).optional(),
  }));
  (CommentsActionsAndSelectionCall = lazyZod.object({
    type: lazyZod.literal(`tool_call`),
    call: lazyZod.object({
      tool: lazyZod.string().min(1),
      args: lazyZod.record(lazyZod.string(), lazyZod.unknown()),
      mode: lazyZod.enum([`apply`, `stage`]).default(`apply`),
    }),
    expect: DataModelSchemasMinRows.optional(),
    adapter: DataContentAndReferencesHasHeader.optional(),
    output: lazyZod
      .union([
        lazyZod.string().min(1),
        lazyZod.array(CommentsActionsAndSelectionPath).min(1),
      ])
      .optional(),
  }));
  (CommentsActionsAndSelectionPrompt = lazyZod.object({
    type: lazyZod.literal(`prompt`),
    prompt: lazyZod.union([lazyZod.string(), CommentsActionsAndSelectionCode]),
  }));
  (CommentsActionsAndSelectionCode2 = lazyZod.object({
    type: lazyZod.literal(`code`),
    code: lazyZod.string(),
  }));
  (CommentsActionsAndSelectionType = lazyZod.discriminatedUnion(
    `type`,
    [
      CommentsActionsAndSelectionCall,
      CommentsActionsAndSelectionPrompt,
      CommentsActionsAndSelectionCode2,
    ],
  ));
  (CommentsActionsAndSelectionEmail = lazyZod.object({
    email: lazyZod.string(),
    actor: lazyZod.string(),
    at: lazyZod.string(),
  }));
  (commentsActionsAndSelectionSummarySchema = lazyZod
    .object({
      name: lazyZod.string().optional(),
      summary: lazyZod
        .string()
        .optional()
        .describe(`@deprecated — no longer rendered anywhere; do not write`),
      config: CommentsActionsAndSelectionType,
      parameters: CommentsActionsAndSelectionRecord.optional(),
      sources: lazyZod
        .array(CommentsActionsAndSelectionRegex)
        .max(32)
        .optional()
        .describe(
          `@deprecated — UI now shows computed refs from fn:/db: literals in config; do not write`,
        ),
      schedule: CommentsActionsAndSelectionRecurrence.optional(),
      paused: lazyZod.boolean().optional(),
      configBy: CommentsActionsAndSelectionEmail.optional(),
      scheduleBy: CommentsActionsAndSelectionEmail.optional(),
    })
    .superRefine(
      (
        scheduler?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let properties: Dynamic = scheduler.parameters?.properties;
        if (
          scheduler.config.type === `prompt` &&
          scheduler.schedule &&
          properties &&
          Object.keys(properties).length > 0
        ) {
          options.addIssue({
            code: `custom`,
            path: [`parameters`],
            message: `scheduled prompt functions can't take parameters — params interpolated into prompt text are an injection vector on unattended runs. Use config.type:'tool_call' or 'code', or remove the schedule.`,
          });
        }
      },
    ));
  lazyZod.preprocess(
    (callback?: unknown, ..._extraArguments: unknown[]): Dynamic => {
      if (typeof callback == `object` && callback && !Array.isArray(callback)) {
        let callback2: Dynamic = callback;
        if (`routines` in callback2 || `functions` in callback2)
          return {
            ...callback2,
            routines: callback2.routines ?? callback2.functions,
          };
      }
      return callback;
    },
    lazyZod
      .object({
        version: lazyZod.literal(1),
        instructions: lazyZod.string().optional(),
        context: lazyZod.string().max(4e3).optional(),
        routines: lazyZod.record(
          CommentsActionsAndSelectionRegex,
          commentsActionsAndSelectionSummarySchema,
        ),
        tables: lazyZod
          .record(
            CommentsActionsAndSelectionRegex,
            CommentsActionsAndSelectionDescription,
          )
          .optional(),
        types: lazyZod
          .record(
            CommentsActionsAndSelectionRegex,
            CommentsActionsAndSelectionEnum,
          )
          .optional(),
      })
      .superRefine(
        (
          callback?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          let routinesKeys = Object.keys(callback.routines);
          let tablesKeys = Object.keys(callback.tables ?? {});
          let typesKeys = Object.keys(callback.types ?? {});
          for (let localResult of tablesKeys as Dynamic)
            if (Object.hasOwn(callback.routines, localResult)) {
              options.addIssue({
                code: `custom`,
                path: [`tables`, localResult],
                message: `name '${localResult}' collides with a routine — names are unique across routines ∪ tables ∪ types`,
              });
            }
          for (let localResult of typesKeys as Dynamic)
            if (
              Object.hasOwn(callback.routines, localResult) ||
              Object.hasOwn(callback.tables ?? {}, localResult)
            ) {
              options.addIssue({
                code: `custom`,
                path: [`types`, localResult],
                message: `name '${localResult}' collides with a ${Object.hasOwn(callback.routines, localResult) ? `routine` : `table`} — names are unique across routines ∪ tables ∪ types`,
              });
            }
          for (let [localResult, localResult2] of [
            [`routines`, routinesKeys],
            [`tables`, tablesKeys],
            [`types`, typesKeys],
          ] as Dynamic)
            for (let localResult3 of localResult2 as Dynamic)
              if (!CommentsActionsAndSelectionState3.test(localResult3)) {
                options.addIssue({
                  code: `custom`,
                  path: [localResult, localResult3],
                  message: `invalid name '${localResult3}'`,
                });
              }
          let types: Dynamic = callback.types ?? {};
          let addIssue = (
            callback2?: Dynamic,
            options2?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (Array.isArray(callback2)) {
              callback2.forEach(
                (
                  rolldownNImport2?: Dynamic,
                  index?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => addIssue(rolldownNImport2, [...options2, index]),
              );
              return;
            }
            if (!(typeof callback2 != `object` || !callback2)) {
              if (resolveCommentsActionsAndSelectionRef(callback2)) {
                let match: Dynamic = commentsActionsAndSelectionPattern.exec(
                  callback2.$ref,
                );
                if (match) {
                  if (!Object.hasOwn(types, match[1])) {
                    options.addIssue({
                      code: `custom`,
                      path: [...options2, `$ref`],
                      message: `unknown $ref '#/types/${match[1]}' — no such entry in types`,
                    });
                  }
                } else {
                  options.addIssue({
                    code: `custom`,
                    path: [...options2, `$ref`],
                    message: `bad $ref '${callback2.$ref}' — name must match ${CommentsActionsAndSelectionState3}`,
                  });
                }
                return;
              }
              for (let [localResult, localResult2] of Object.entries(
                callback2,
              ) as Dynamic)
                addIssue(localResult2, [...options2, localResult]);
            }
          };
          for (let [localResult, localResult2] of Object.entries(
            callback.routines,
          ) as Dynamic)
            if (localResult2.parameters) {
              addIssue(localResult2.parameters, [
                `routines`,
                localResult,
                `parameters`,
              ]);
            }
          for (let [localResult, localResult2] of Object.entries(
            callback.tables ?? {},
          ) as Dynamic)
            addIssue(localResult2.columns, [`tables`, localResult, `columns`]);
        },
      ),
  );
  (commentsActionsAndSelectionValue0 = 0);
  (commentsActionsAndSelectionValue02 = 0);
  create(
    (
      callback?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      name: ``,
      versions: undefined,
      mount: (name?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        commentsActionsAndSelectionValue02++;
        let localResult: number = ++commentsActionsAndSelectionValue0;
        if (options().name !== name) {
          callback({
            name: name,
            versions: undefined,
          });
        }
        api.projects
          .versions(name)
          .then(
            (versions?: Dynamic, ..._extraArguments: unknown[]): undefined => {
              if (localResult === commentsActionsAndSelectionValue0) {
                callback({
                  versions: versions,
                });
              }
            },
          );
      },
      release: (..._extraArguments: unknown[]): undefined => {
        commentsActionsAndSelectionValue02 = Math.max(
          0,
          commentsActionsAndSelectionValue02 - 1,
        );
        if (commentsActionsAndSelectionValue02 === 0) {
          commentsActionsAndSelectionValue0++;
          callback({
            name: ``,
            versions: undefined,
          });
        }
      },
    }),
  );
  (CommentsActionsAndSelectionStarred = updateDataModelSchemasValue(
    `starred`,
    [],
  ));
  (commentsActionsAndSelectionValue80 = 80);
  (commentsActionsAndSelectionMap = new (Map as Dynamic)());
  (commentsActionsAndSelectionSet = new (Set as Dynamic)());
  (commentsActionsAndSelectionValue03 = 0);
  (commentsActionsAndSelectionMap2 = new (Map as Dynamic)());
  (commentsActionsAndSelectionMap3 = new (Map as Dynamic)());
  (resolveCommentsActionsAndSelectionAccount = (
    commentsActionsAndSelectionAccount?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof commentsActionsAndSelectionAccount == `string` &&
    resolveEditorAnchorsAndMentionsOther(commentsActionsAndSelectionAccount) ===
      `account`);
  (resolveCommentsActionsAndSelectionSlice = (
    commentsActionsAndSelectionSlice?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof commentsActionsAndSelectionSlice == `string`
      ? commentsActionsAndSelectionSlice
          .trim()
          .slice(0, commentsActionsAndSelectionValue80)
      : ``);
  (getCommentsActionsAndSelectionToLowerCase = (
    commentsActionsAndSelection?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveCommentsActionsAndSelectionAccount(commentsActionsAndSelection)
      ? commentsActionsAndSelectionMap.get(
          commentsActionsAndSelection.toLowerCase(),
        )
      : undefined);
  (CommentsActionsAndSelection = `  `);
  (commentsActionsAndSelectionValue250000 = 25e4);
  (commentsActionsAndSelectionValue40000 = 4e4);
  (CommentsActionsAndSelectionState4 = null);
  (commentsActionsAndSelectionPattern2 = /^[A-Za-z0-9_-]{1,128}$/);
  (CommentsActionsAndSelectionResultJson = `result.json`);
  (resolveCommentsActionsAndSelectionTruncated = (
    commentsActionsAndSelectionTruncated?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let commentsActionsAndSelectionTruncated2: Dynamic =
      commentsActionsAndSelectionTruncated;
    return (
      typeof commentsActionsAndSelectionTruncated2 == `object` &&
      !!commentsActionsAndSelectionTruncated2 &&
      commentsActionsAndSelectionTruncated2._truncated === true &&
      typeof commentsActionsAndSelectionTruncated2._bytes == `number`
    );
  });
  (resolveCommentsActionsAndSelectionEvery2 = (
    commentsActionsAndSelectionEvery2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    Array.isArray(commentsActionsAndSelectionEvery2) &&
    commentsActionsAndSelectionEvery2.every(
      (rolldownNImport2?: unknown, ..._extraArguments: unknown[]) =>
        typeof rolldownNImport2 == `object` &&
        !!rolldownNImport2 &&
        !Array.isArray(rolldownNImport2),
    ));
  (commentsActionsAndSelectionSet2 = new (Set as Dynamic)([
    `text`,
    `hardBreak`,
    `mention`,
    `date`,
    `dropdown`,
    `media`,
  ]));
  (commentsActionsAndSelectionValue512 = 512);
  (resolveCommentsActionsAndSelectionValue8 = (
    commentsActionsAndSelectionValue8?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof commentsActionsAndSelectionValue8 == `object` &&
    !!commentsActionsAndSelectionValue8 &&
    !Array.isArray(commentsActionsAndSelectionValue8));
  (resolveCommentsActionsAndSelectionFlatMap = (
    commentsActionsAndSelectionFlatMap?: unknown,
    options: Dynamic = 0,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    typeof commentsActionsAndSelectionFlatMap == `string`
      ? [commentsActionsAndSelectionFlatMap]
      : Array.isArray(commentsActionsAndSelectionFlatMap) && options < 4
        ? commentsActionsAndSelectionFlatMap.flatMap(
            (
              rolldownNImport2?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              resolveCommentsActionsAndSelectionFlatMap(
                rolldownNImport2,
                options + 1,
              ),
          )
        : []);
  (commentsActionsAndSelectionSet3 = new (Set as Dynamic)());
  (resolveCommentsActionsAndSelectionValue10 = (
    commentsActionsAndSelectionValue10?: unknown,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    typeof commentsActionsAndSelectionValue10 == `string`
      ? resolveEditorExtensionsSess4(commentsActionsAndSelectionValue10)
      : null);
}

export {
  CommentsActionsAndSelectionState3,
  clearCommentsActionsAndSelectionBONGOAPIBASE,
  clearCommentsActionsAndSelectionDelete2,
  getCommentsActionsAndSelectionRef,
  getCommentsActionsAndSelectionToLowerCase,
  loadCommentsActionsAndSelectionDialect,
  loadCommentsActionsAndSelectionFilter,
  resolveCommentsActionsAndSelectionBlobId,
  resolveCommentsActionsAndSelectionCell,
  resolveCommentsActionsAndSelectionContainer,
  resolveCommentsActionsAndSelectionFrame,
  resolveCommentsActionsAndSelectionFrom,
  resolveCommentsActionsAndSelectionKind2,
  resolveCommentsActionsAndSelectionKind3,
  resolveCommentsActionsAndSelectionKind4,
  resolveCommentsActionsAndSelectionLines2,
  resolveCommentsActionsAndSelectionLocalhost,
  resolveCommentsActionsAndSelectionName,
  resolveCommentsActionsAndSelectionNoun,
  resolveCommentsActionsAndSelectionRef2,
  resolveCommentsActionsAndSelectionStand,
  resolveCommentsActionsAndSelectionUrl,
  resolveCommentsActionsAndSelectionValue10,
  resolveCommentsActionsAndSelectionValue3,
  resolveCommentsActionsAndSelectionValue4,
  resolveCommentsActionsAndSelectionValue5,
  resolveCommentsActionsAndSelectionValue6,
  resolveCommentsActionsAndSelectionValue7,
  updateCommentsActionsAndSelectionEmail,
  updateCommentsActionsAndSelectionStand,
  updateCommentsActionsAndSelectionValue,
  updateCommentsActionsAndSelectionValue2,
  useCommentsActionsAndSelectionAccount,
  useCommentsActionsAndSelectionPlatform,
};
