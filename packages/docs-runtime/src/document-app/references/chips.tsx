/** ref-chips: restored from ref-chips-bSfzhdCy.js. */
import { originalJsxProps } from "../../react-runtime/jsx-runtime";
import type { Dynamic } from "../../interop/legacy-dynamic";
import { r as toModuleNamespace } from "../../boot/module-runtime";
import {
  Aj as resolvePlatformSessionAndSourcesWeekday,
  Bh as updateDataModelSchemasHerePath,
  CO as resolveEditorAnchorsAndMentionsRoutines,
  Cg as PlatformApiAndAuthPriming,
  Cu as resolveEditorHostError,
  Eg as resolvePlatformApiAndAuthValue39,
  Fa as useCommentsActionsAndSelectionPlatform,
  Fh as loadDataModelSchemasRetired,
  HM as loadReact,
  Ia as useCommentsActionsAndSelectionAccount,
  Ma as resolveCommentsActionsAndSelectionNoun,
  Na as resolveCommentsActionsAndSelectionValue7,
  Ph as resolveDataModelSchemasPush,
  Qa as getCommentsActionsAndSelectionToLowerCase,
  Qg as resolvePlatformApiAndAuthUseContext2,
  Sr as filterEditorChipsAndNodeViewsOnce,
  Ss as updatePlatformSyncAndRoutingDirectory,
  Tg as resolvePlatformApiAndAuthToLowerCase3,
  UE as loadJsxRuntime,
  dO as resolveEditorAnchorsAndMentionsPlatform,
  eo as loadCommentsActionsAndSelectionFilter,
  fO as resolveEditorAnchorsAndMentionsEmail2,
  gO as editorAnchorsAndMentionsPattern,
  hO as EditorAnchorsAndMentionsStyles,
  hk as EditorExtensionsBlue2,
  hs as updatePlatformSyncAndRoutingEntry,
  iE as UiOverlaysAndIconsCustomIcon,
  ja as resolveCommentsActionsAndSelectionFrame,
  kj as resolvePlatformSessionAndSourcesValue,
  lO as EditorAnchorsAndMentionsSomeone,
  mO as resolveEditorAnchorsAndMentionsEmail,
  pO as resolveEditorAnchorsAndMentionsOther,
  qh as collectDataModelSchemasSplit,
  sO as resolveEditorAnchorsAndMentionsStartsWith,
  uO as EditorAnchorsAndMentionsMessage,
  vt as loadPlatformLiveDocumentAndHistoryFile,
  wg as resolvePlatformApiAndAuthToLowerCase2,
  wu as resolveEditorHostFile,
  xC as Tooltip,
  yt as PlatformLiveDocumentAndHistoryLevels,
} from "../../platform/index";
var React: Dynamic = toModuleNamespace(loadReact(), 1);
var jsxRuntime: Dynamic = loadJsxRuntime();
function resolveLocalReference(
  file?: Dynamic,
  refStr?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let parsed: Dynamic = resolveEditorHostError(refStr);
  if (!parsed.ok)
    return {
      ok: false,
      error: `bad-ref: ${parsed.error}`,
    };
  if (parsed.ref.file !== undefined)
    return {
      ok: false,
      error: `dangling-ref: cross-file refs resolve via readLfileRef, not the local resolver`,
    };
  let target: Dynamic = parsed.ref.target;
  if (target.kind !== `node`)
    return {
      ok: false,
      error: `dangling-ref: ${target.kind} refs are not readable same-file — qualify with a file part`,
    };
  let node: Dynamic = file.nodes[target.id];
  if (!node)
    return {
      ok: false,
      error: `dangling-ref: node ${target.id} not in file`,
    };
  if (target.selector)
    return {
      ok: false,
      error: `dangling-ref: ~selector refs not yet supported in the .ldoc bridge`,
    };
  if (!target.field?.length)
    return {
      ok: true,
      value: node,
    };
  let resolvedNode: Dynamic = node;
  for (let resolveLocalReferenceResult of target.field as Dynamic) {
    if (
      resolveLocalReferenceResult === `__proto__` ||
      resolveLocalReferenceResult === `prototype` ||
      resolveLocalReferenceResult === `constructor`
    )
      return {
        ok: false,
        error: `bad-ref: reserved field name ${resolveLocalReferenceResult}`,
      };
    if (typeof resolvedNode != `object` || !resolvedNode)
      return {
        ok: false,
        error: `dangling-ref: .${resolveLocalReferenceResult} on non-object`,
      };
    if (!Object.hasOwn(resolvedNode, resolveLocalReferenceResult))
      return {
        ok: false,
        error: `dangling-ref: .${resolveLocalReferenceResult} not found`,
      };
    resolvedNode = resolvedNode[resolveLocalReferenceResult];
  }
  return {
    ok: true,
    value: resolvedNode,
  };
}
async function readTableReference(
  fetch?: Dynamic,
  container?: Dynamic,
  tableName?: Dynamic,
  selector?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  if (!container) throw Error(`read: table: requires a project container`);
  if (tableName.includes(`/`))
    throw Error(`read: table "${tableName}" — table names are single-segment`);
  let readRows: Dynamic = async (
    tableReference?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<Dynamic> => {
    let response: Dynamic = await fetch(
      `/api/tables/state?container=${encodeURIComponent(container)}&path=${encodeURIComponent(tableReference)}`,
    );
    if (response.ok) return await response.json();
    let readTableReferenceResult: Dynamic =
      await loadDataModelSchemasRetired(response);
    if (readTableReferenceResult) throw readTableReferenceResult;
    return null;
  };
  let table: Dynamic = null;
  for (let readTableReferenceResult of resolveDataModelSchemasPush(
    tableName,
  ) as Dynamic) {
    let rows: Dynamic = await readRows(readTableReferenceResult);
    table ??= rows;
    if (rows && Object.keys(rows).length > 0) {
      table = rows;
      break;
    }
  }
  return selector ? collectDataModelSchemasSplit(table, selector) : table;
}
async function readEnumDefinition(
  readProject?: Dynamic,
  enumName?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let types: Dynamic = (await readProject()).types;
  return !types || typeof types != `object` || !Object.hasOwn(types, enumName)
    ? null
    : (types[enumName] ?? null);
}
var ENUM_COLORS: Dynamic = [
  `neutral`,
  `accent`,
  `success`,
  `warning`,
  `danger`,
  `pro`,
];
var DEFAULT_STATUS_ENUM: Dynamic = {
  name: `status`,
  opts: [
    {
      l: `Not started`,
      c: `neutral`,
    },
    {
      l: `In progress`,
      c: `accent`,
    },
    {
      l: `Done`,
      c: `success`,
    },
  ],
};
function enumSchema(
  options?: Dynamic,
  previous?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let display: Dynamic = Object.create(null);
  for (let enumSchemaResult of options as Dynamic)
    display[enumSchemaResult.l] = {
      color: enumSchemaResult.c,
    };
  let names: Dynamic = options.map(
    (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => item.l,
  );
  mergeEnumDisplay(names, display, previous);
  return {
    enum: names,
    "x-display": display,
  };
}
function mergeEnumDisplay(
  names?: Dynamic,
  display?: Dynamic,
  previous?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let previousDisplay: Dynamic =
    previous && typeof previous == `object`
      ? (previous[`x-display`] ?? {})
      : {};
  for (let mergeEnumDisplayResult of names as Dynamic) {
    let displayItem: Dynamic = Object.hasOwn(display, mergeEnumDisplayResult)
      ? display[mergeEnumDisplayResult]
      : undefined;
    let previousDisplayItem: Dynamic = Object.hasOwn(
      previousDisplay,
      mergeEnumDisplayResult,
    )
      ? previousDisplay[mergeEnumDisplayResult]
      : undefined;
    if (!(!displayItem || !previousDisplayItem)) {
      if (typeof previousDisplayItem.label == `string`) {
        displayItem.label = previousDisplayItem.label.slice(0, 80);
      }
      if (typeof previousDisplayItem.icon == `string`) {
        displayItem.icon = previousDisplayItem.icon.slice(0, 64);
      }
    }
  }
}
async function readCrossFileReference(
  fetch?: Dynamic,
  container?: Dynamic,
  refStr?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  return (await readCrossFileReferenceResult(fetch, container, refStr)).value;
}
async function readCrossFileReferenceResult(
  fetch?: Dynamic,
  container?: Dynamic,
  refStr?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  if (!container)
    throw Error(`read-failed: cross-file refs require a project container`);
  let response: Dynamic = await fetch(
    `/api/lfile/read?container=${encodeURIComponent(container)}&ref=${encodeURIComponent(refStr)}`,
  );
  if (!response.ok) {
    await throwReferenceReadError(response, `read-failed`);
  }
  return await response
    .json()
    .catch((..._extraArguments: unknown[]): undefined => {
      throw Error(`read-failed: malformed response`);
    });
}
async function throwReferenceReadError(
  response?: Dynamic,
  fallbackCode?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<undefined> {
  let body: Dynamic = await response
    .json()
    .catch((..._extraArguments: unknown[]) => null);
  throw Error(
    referenceErrorMessage(body?.error, response.status, fallbackCode),
  );
}
var KNOWN_REFERENCE_ERROR_CODES: Dynamic = new (Set as Dynamic)([
  `ref-parse`,
  `ref-kind`,
  `ref-field`,
  `ref-file`,
  `not-found`,
  `not-supported`,
  `selector`,
  `shape`,
  `pm-schema`,
  `too-large`,
  `placeholder-writeback`,
  `stored-invalid`,
  `locked`,
  `frozen`,
  `lfile/read`,
  `lfile/write`,
]);
var REFERENCE_ERROR_COPY: Dynamic = {
  locked: `locked: the target is locked`,
};
function referenceErrorMessage(
  error?: Dynamic,
  status?: Dynamic,
  fallbackCode?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let codeMatch: Dynamic = error ? /^([a-z/-]+): /.exec(error) : null;
  return codeMatch && error && KNOWN_REFERENCE_ERROR_CODES.has(codeMatch[1])
    ? (REFERENCE_ERROR_COPY[codeMatch[1]] ?? error)
    : `${fallbackCode}: ${status}`;
}
function resolvedCrossFileNodeRef(
  fileId?: Dynamic,
  parsed?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let fileRef: string = `f-${fileId}`;
  let resolvedRef: Dynamic = resolveEditorHostFile({
    file: fileRef,
    target: parsed.target,
    resolved: true,
  });
  let verified: Dynamic = resolveEditorHostError(resolvedRef);
  return !verified.ok ||
    verified.ref.file !== fileRef ||
    !verified.ref.resolved ||
    JSON.stringify(verified.ref.target) !== JSON.stringify(parsed.target)
    ? {
        ok: false,
        error: `bad-ref: ref does not survive file qualification`,
      }
    : {
        ok: true,
        ref: resolvedRef,
      };
}
function referenceReadRoute(
  refStr?: Dynamic,
  fileId?: Dynamic,
  operation?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let parsed: Dynamic = resolveEditorHostError(refStr);
  if (!parsed.ok)
    return {
      route: `local`,
    };
  let target: Dynamic = parsed.ref.target;
  if (
    target.kind === `node` &&
    target.selector &&
    target.selector.kind !== `cell`
  )
    return {
      route: `reject`,
      error: `dangling-ref: ~${target.selector.kind === `quote` ? `q` : `el`} reads not supported in the .ldoc bridge (v1 serves ~cell only)`,
    };
  let reject: Dynamic = (
    referenceReadRoute2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    operation === `watch`
      ? {
          route: `reject`,
          error: `dangling-ref: watch on cross-file refs not yet supported in the .ldoc bridge`,
        }
      : {
          route: `api`,
          ref: referenceReadRoute2,
        };
  if (parsed.ref.file !== undefined) return reject(refStr);
  if (target.kind === `node` && target.selector) {
    if (!fileId)
      return {
        route: `reject`,
        error: `dangling-ref: file identity not ready`,
      };
    let resolvedCrossFileNodeRef2: Dynamic = resolvedCrossFileNodeRef(
      fileId,
      parsed.ref,
    );
    return resolvedCrossFileNodeRef2.ok
      ? reject(resolvedCrossFileNodeRef2.ref)
      : {
          route: `reject`,
          error: resolvedCrossFileNodeRef2.error,
        };
  }
  return {
    route: `local`,
  };
}
var SAFE_LINK_PROTOCOLS: Dynamic = new (Set as Dynamic)([
  `http:`,
  `https:`,
  `mailto:`,
  `tel:`,
]);
function safeReferenceUrl(
  href?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof href != `string`) return null;
  let trimmed: string = href.replace(/^[\s\x00-\x1f]+|[\s\x00-\x1f]+$/g, ``);
  if (trimmed.length === 0 || trimmed.length > 8192 || trimmed.startsWith(`#`))
    return null;
  if (trimmed.startsWith(`//`))
    try {
      let url2: Dynamic = new (URL as Dynamic)(trimmed, location.href);
      return !SAFE_LINK_PROTOCOLS.has(url2.protocol) ||
        url2.username ||
        url2.password
        ? null
        : {
            kind: `external`,
            url: url2,
          };
    } catch {
      return null;
    }
  if (
    !/^[a-z][a-z0-9+.-]*:/i.test(trimmed) ||
    trimmed.startsWith(`claude://`)
  ) {
    let replace: Dynamic = (
      trimmed.startsWith(`claude://`) ? trimmed.slice(9) : trimmed
    ).replace(/^\//, ``);
    if (replace.length === 0 || replace.startsWith(`#`)) return null;
    let safeReferenceUrlResult: Dynamic;
    try {
      safeReferenceUrlResult = new (URL as Dynamic)(
        `/${replace}`,
        location.origin,
      );
    } catch {
      return null;
    }
    return safeReferenceUrlResult.origin !== location.origin ||
      safeReferenceUrlResult.pathname.startsWith(`//`)
      ? null
      : (updateDataModelSchemasHerePath(`claude://${replace}`),
        {
          kind: `internal`,
        });
  }
  let url: Dynamic;
  try {
    url = new (URL as Dynamic)(trimmed);
  } catch {
    return null;
  }
  return !SAFE_LINK_PROTOCOLS.has(url.protocol) || url.username || url.password
    ? null
    : {
        kind: `external`,
        url: url,
      };
}
function collectMentionPrincipals(
  principals?: Dynamic,
  seen?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let collected: Dynamic = [];
  for (let collectMentionPrincipalsResult of (Array.isArray(principals)
    ? principals
    : []
  ).slice(0, 50) as Dynamic)
    if (
      !(
        typeof collectMentionPrincipalsResult != `string` ||
        !resolveEditorAnchorsAndMentionsPlatform(collectMentionPrincipalsResult)
      )
    ) {
      if (!seen.has(collectMentionPrincipalsResult)) {
        if (seen.size >= 1500) continue;
        seen.add(collectMentionPrincipalsResult);
      }
      collected.push(collectMentionPrincipalsResult);
    }
  return collected;
}
async function readMentionNames(
  principals?: Dynamic,
  platformNames?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let platformPrincipals: Dynamic = principals.filter(
    (item?: Dynamic, ..._extraArguments: unknown[]) =>
      resolveEditorAnchorsAndMentionsOther(item) === `platform`,
  );
  let [platformDirectory, accountDirectory]: Dynamic = await Promise.all([
    platformNames && platformPrincipals.length > 0
      ? platformNames(platformPrincipals).catch(
          (..._extraArguments: unknown[]): Dynamic => ({}),
        )
      : {},
    loadCommentsActionsAndSelectionFilter(
      principals.filter(
        (item?: Dynamic, ..._extraArguments: unknown[]) =>
          resolveEditorAnchorsAndMentionsOther(item) === `account`,
      ),
    ),
  ]);
  let platformResults: Dynamic = platformDirectory;
  let names: Dynamic = {};
  for (let readMentionNamesResult of principals as Dynamic)
    if (
      resolveEditorAnchorsAndMentionsOther(readMentionNamesResult) ===
      `platform`
    ) {
      if (platformNames === null) {
        names[readMentionNamesResult] = ``;
      } else {
        if (platformResults[readMentionNamesResult] !== undefined) {
          names[readMentionNamesResult] =
            platformResults[readMentionNamesResult].name ?? ``;
        }
      }
    } else {
      names[readMentionNamesResult] =
        accountDirectory[readMentionNamesResult] ?? ``;
    }
  return names;
}
async function resolveMentionNames(
  principals?: Dynamic,
  seen?: Dynamic,
  platformNames?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let collected: Dynamic = collectMentionPrincipals(principals, seen);
  let names: Dynamic =
    collected.length > 0
      ? await readMentionNames(collected, platformNames)
      : {};
  let collectedSet: Dynamic = new (Set as Dynamic)(collected);
  for (let resolveMentionNamesResult of (Array.isArray(principals)
    ? principals
    : []
  ).slice(0, 50) as Dynamic)
    if (
      typeof resolveMentionNamesResult == `string` &&
      resolveEditorAnchorsAndMentionsPlatform(resolveMentionNamesResult) &&
      !collectedSet.has(resolveMentionNamesResult)
    ) {
      names[resolveMentionNamesResult] = ``;
    }
  return names;
}
var REFERENCE_REFRESH_DEBOUNCE_MS: number = 2e3;
function fileReferenceLabel(
  project?: Dynamic,
  fileId?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof project != `object` || !project) return null;
  let files: Dynamic = updatePlatformSyncAndRoutingDirectory(project);
  let file: Dynamic = files.get(fileId);
  if (file === undefined) return null;
  let projectName2: Dynamic = project.name;
  let label: string =
    typeof projectName2 == `string` && projectName2.length > 0
      ? projectName2
      : `Untitled`;
  let fileLabel: Dynamic =
    file.name !== undefined && file.name.length > 0 ? file.name : `Untitled`;
  let parentId: Dynamic = file.subtabOf;
  let parent: Dynamic =
    parentId === undefined ? undefined : files.get(parentId);
  let parentLabel: Dynamic =
    parent !== undefined && parent.name !== undefined && parent.name.length > 0
      ? parent.name
      : undefined;
  return {
    tab: fileLabel,
    project: label,
    ...(parentLabel === undefined
      ? {}
      : {
          parentTab: parentLabel,
        }),
  };
}
function searchReferenceCandidates(
  candidates?: Dynamic,
  query?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let normalizedQuery: Dynamic = query.toLowerCase();
  let unique: Dynamic = new (Map as Dynamic)();
  for (let searchReferenceCandidatesResult of candidates as Dynamic)
    if (!unique.has(searchReferenceCandidatesResult.id.toLowerCase())) {
      unique.set(
        searchReferenceCandidatesResult.id.toLowerCase(),
        searchReferenceCandidatesResult,
      );
    }
  return [...unique.values()]
    .filter(
      (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        item.label.toLowerCase().includes(normalizedQuery),
    )
    .slice(0, 8);
}
function projectName(
  project?: Dynamic,
  ..._extraArguments: unknown[]
): string {
  let name: Dynamic =
    typeof project == `object` && project ? project.name : undefined;
  return typeof name == `string` && name.length > 0 ? name : `Untitled`;
}
var nonemptyTabName: Dynamic = (
  name?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => (name !== undefined && name.length > 0 ? name : `Untitled`);
function tabNameDirectory(
  files?: Dynamic,
  requestedIds: Dynamic = [],
  ..._extraArguments: unknown[]
): Dynamic {
  let directory: Dynamic = {};
  if (files !== undefined)
    for (let {
      id: tabNameDirectoryResult,
      name: tabNameDirectoryResult2,
    } of searchTabs(files) as Dynamic)
      directory[tabNameDirectoryResult] = tabNameDirectoryResult2;
  for (let [tabNameDirectoryResult, tabNameDirectoryResult2] of (files ??
    []) as Dynamic)
    directory[tabNameDirectoryResult] ??= nonemptyTabName(
      tabNameDirectoryResult2.name,
    );
  for (let tabNameDirectoryResult of requestedIds as Dynamic)
    directory[tabNameDirectoryResult] ??= ``;
  return directory;
}
function searchTabs(
  files?: Dynamic,
  query: Dynamic = ``,
  ..._extraArguments: unknown[]
): Dynamic {
  let matches: Dynamic = [];
  let normalizedQuery: Dynamic = query.trim().toLowerCase();
  let visit = (
    searchTabs2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    for (let node of searchTabs2 as Dynamic) {
      let nonemptyTabName2: Dynamic = nonemptyTabName(node.entry.name);
      if (
        normalizedQuery === `` ||
        nonemptyTabName2.toLowerCase().includes(normalizedQuery)
      ) {
        matches.push({
          id: node.id,
          name: nonemptyTabName2,
        });
      }
      visit(node.children);
    }
  };
  visit(updatePlatformSyncAndRoutingEntry(files));
  return matches;
}
function watchReferenceChanges(
  subscribe?: Dynamic,
  changed?: Dynamic,
  timers: Dynamic = {
    set: (
      referenceChanges?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => setTimeout(referenceChanges, options),
    clear: (
      referenceChanges?: Dynamic,
      ..._extraArguments: unknown[]
    ): void => clearTimeout(referenceChanges),
  },
  ..._extraArguments: unknown[]
): Dynamic {
  let refreshTimer: Dynamic = null;
  let disposed: boolean = false;
  let unsubscribe: Dynamic = subscribe(
    (entry?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (
        !(
          disposed ||
          !(
            entry.kind === `live` ||
            entry.kind === `recovered` ||
            (entry.kind === `envelope` &&
              entry.envelope !== undefined &&
              entry.envelope.diff.some(
                (diff?: Dynamic, ..._extraArguments: unknown[]) =>
                  diff.address?.ref?.object === `enum`,
              ))
          ) ||
          refreshTimer !== null
        )
      ) {
        refreshTimer = {
          id: timers.set((..._extraArguments: unknown[]): undefined => {
            refreshTimer = null;
            changed();
          }, 150),
        };
      }
    },
  );
  return (..._extraArguments: unknown[]): undefined => {
    disposed = true;
    unsubscribe();
    if (refreshTimer !== null) {
      timers.clear(refreshTimer.id);
    }
    refreshTimer = null;
  };
}
function parseEnumDefinition(
  candidate?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof candidate != `object` || !candidate) return null;
  let { name: candidate2, options: candidate3 }: Dynamic = candidate;
  if (
    typeof candidate2 != `string` ||
    !Array.isArray(candidate3) ||
    candidate3.length > 1e3
  )
    return null;
  let options: Dynamic = [];
  for (let parseEnumDefinitionResult of candidate3 as Dynamic) {
    if (
      typeof parseEnumDefinitionResult != `object` ||
      !parseEnumDefinitionResult
    )
      return null;
    let parseEnumDefinitionResult2: Dynamic = parseEnumDefinitionResult;
    if (
      typeof parseEnumDefinitionResult2.name != `string` ||
      typeof parseEnumDefinitionResult2.order != `number` ||
      !Number.isFinite(parseEnumDefinitionResult2.order)
    )
      return null;
    let record: Dynamic = {
      name: parseEnumDefinitionResult2.name,
      order: parseEnumDefinitionResult2.order,
    };
    if (typeof parseEnumDefinitionResult2.disabled == `boolean`) {
      record.disabled = parseEnumDefinitionResult2.disabled;
    }
    if (typeof parseEnumDefinitionResult2.color == `string`) {
      record.color = parseEnumDefinitionResult2.color;
    }
    options.push(record);
  }
  return {
    name: candidate2,
    options: options,
  };
}
function rebaseEnumOptions(
  before?: Dynamic,
  draft?: Dynamic,
  after?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let oldCount: Dynamic = before.options.length;
  let options: Dynamic = after.options.map(
    (
      option?: Dynamic,
      index?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let optionItem: Dynamic = before.options[index];
      let optionItem2: Dynamic = draft.options[index];
      let record: Dynamic = {
        ...option,
      };
      return index >= oldCount ||
        optionItem === undefined ||
        optionItem2 === undefined
        ? record
        : (optionItem2.name.trim() !== optionItem.name.trim() &&
            (record.name = optionItem2.name),
          (optionItem2.disabled === true) != (optionItem.disabled === true) &&
            (record.disabled = optionItem2.disabled === true),
          optionItem2.color !== optionItem.color &&
            (optionItem2.color === undefined
              ? delete record.color
              : (record.color = optionItem2.color)),
          record);
    },
  );
  let sameName = (
    rebaseEnumOptions2?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    rebaseEnumOptions2.trim().toLowerCase() === options2.trim().toLowerCase();
  let usedIndices: Dynamic = new (Set as Dynamic)();
  let addedIndices: Dynamic = draft.options
    .slice(oldCount)
    .map((optionsSlice?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      let optionIndex: Dynamic = after.options.findIndex(
        (
          option?: Dynamic,
          index?: Dynamic,
          ..._extraArguments: unknown[]
        ): boolean =>
          index >= oldCount &&
          !usedIndices.has(index) &&
          option.disabled !== true &&
          sameName(option.name, optionsSlice.name),
      );
      return optionIndex < 0
        ? options.push({
            ...optionsSlice,
          }) - 1
        : (usedIndices.add(optionIndex), optionIndex);
    });
  let outOfRange: Dynamic = addedIndices.filter(
    (addedIndice?: Dynamic, ..._extraArguments: unknown[]) =>
      addedIndice >= after.options.length,
  );
  let sortedIndices: Dynamic = (
    rebaseEnumOptions2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    rebaseEnumOptions2
      .map(
        (
          item?: unknown,
          index?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => index,
      )
      .toSorted(
        (
          mappedRebaseEnumOption?: Dynamic,
          mappedRebaseEnumOption2?: Dynamic,
          ..._extraArguments: unknown[]
        ): number =>
          rebaseEnumOptions2[mappedRebaseEnumOption].order -
            rebaseEnumOptions2[mappedRebaseEnumOption2].order ||
          mappedRebaseEnumOption - mappedRebaseEnumOption2,
      );
  let order: Dynamic = [
    ...sortedIndices(before.options),
    ...draft.options
      .slice(oldCount)
      .map(
        (
          optionsSlice?: unknown,
          index?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => oldCount + index,
      ),
  ];
  if (
    sortedIndices(draft.options).some(
      (
        sortedIndice?: Dynamic,
        index?: Dynamic,
        ..._extraArguments: unknown[]
      ) => sortedIndice !== order[index],
    )
  ) {
    let filteredItems: Dynamic = [
      ...new (Set as Dynamic)(
        sortedIndices(draft.options).map(
          (sortedIndice?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            sortedIndice < oldCount
              ? sortedIndice
              : addedIndices[sortedIndice - oldCount],
        ),
      ),
    ].filter(
      (item?: Dynamic, ..._extraArguments: unknown[]) => item < options.length,
    );
    let filteredMappedOptions: Dynamic = options
      .map(
        (
          option?: unknown,
          index?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => index,
      )
      .filter(
        (mappedOption?: Dynamic, ..._extraArguments: unknown[]) =>
          !filteredItems.includes(mappedOption),
      );
    for (let [rebaseEnumOptionsResult, rebaseEnumOptionsResult2] of [
      ...filteredItems,
      ...filteredMappedOptions,
    ].entries() as Dynamic)
      options[rebaseEnumOptionsResult2].order = rebaseEnumOptionsResult;
  } else {
    let total: Dynamic =
      after.options.reduce(
        (
          accumulator?: Dynamic,
          option?: Dynamic,
          ..._extraArguments: unknown[]
        ): number => Math.max(accumulator, option.order),
        -1,
      ) + 1;
    for (let rebaseEnumOptionsResult of outOfRange as Dynamic)
      options[rebaseEnumOptionsResult].order = total++;
  }
  return {
    name: draft.name.trim() === before.name.trim() ? after.name : draft.name,
    options: options,
  };
}
function reconcileEnumDefinition(
  draft?: Dynamic,
  before?: Dynamic,
  after?: Dynamic,
  maxCount?: Dynamic,
  strict?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let oldDefinition: Dynamic = parseEnumDefinition(before);
  let newDefinition: Dynamic = parseEnumDefinition(after);
  return oldDefinition === null || newDefinition === null
    ? maxCount !== null && after.options.length > maxCount
      ? null
      : draft
    : (
          strict
            ? newDefinition.options.length !== oldDefinition.options.length
            : newDefinition.options.length < oldDefinition.options.length
        )
      ? null
      : rebaseEnumOptions(oldDefinition, draft, newDefinition);
}
function referenceContainer(
  ref?: Dynamic,
  currentContainer?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return ref.container === undefined
    ? ref.noun === `project`
      ? ref.id
      : typeof currentContainer == `string` && currentContainer.length > 0
        ? currentContainer
        : null
    : ref.container;
}
function crossProjectClaudeLink(
  href?: Dynamic,
  currentProject?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let match: Dynamic = /^claude:\/\/project\/([^/?#]+)(\/file\/[^/?#]+)?$/.exec(
    href,
  );
  return match === null ||
    match[1].toLowerCase() === (currentProject ?? ``).toLowerCase()
    ? null
    : match[2] === undefined
      ? {
          kind: `artifact`,
          pid: match[1],
        }
      : {
          kind: `inert`,
        };
}
function isRestrictedResponse(
  response?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  let status: Dynamic =
    typeof response == `object` && response ? response.status : undefined;
  return status === 404 || status === 403;
}
var LOADING_MENTION_TEXT: string = `…`;
function MentionName(
  { principal: principal }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let preferredName: Dynamic = useCommentsActionsAndSelectionAccount(principal);
  let account: Dynamic = useCommentsActionsAndSelectionPlatform(principal);
  if (preferredName === null && account === undefined)
    return (
      <jsxRuntime.Fragment>
        {`@`}
        {LOADING_MENTION_TEXT}
      </jsxRuntime.Fragment>
    );
  let label: Dynamic = preferredName || account?.name;
  return label ? (
    <jsxRuntime.Fragment>
      {`@`}
      {label}
    </jsxRuntime.Fragment>
  ) : (
    <span
      title={EditorAnchorsAndMentionsMessage}
      aria-label={`@${EditorAnchorsAndMentionsSomeone}, ${EditorAnchorsAndMentionsMessage}`}
    >
      {`@`}
      {EditorAnchorsAndMentionsSomeone}
    </span>
  );
}
function UserReferenceChip(
  { who: who, label: label }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let isPrincipal: Dynamic = resolveEditorAnchorsAndMentionsPlatform(who);
  let email: Dynamic = isPrincipal
    ? getCommentsActionsAndSelectionToLowerCase(who)?.email || null
    : who;
  let label2: Dynamic = label ?? resolvePlatformSessionAndSourcesValue(who);
  let chip: Dynamic = (
    <span
      data-ref-chip={`user`}
      style={{
        display: `inline-block`,
        padding: `0 3px`,
        fontSize: `.96em`,
        lineHeight: 1.35,
        verticalAlign: `baseline`,
        borderRadius: 3,
        background: `color-mix(in oklch, var(--cds-blue-450) 14%, transparent)`,
        fontWeight: 500,
      }}
    >
      {isPrincipal && label == null ? (
        <MentionName principal={who} />
      ) : (
        `@${label2}`
      )}
    </span>
  );
  return email ? <Tooltip content={email}>{chip}</Tooltip> : chip;
}
var projectReadPromises: Dynamic = new (Map as Dynamic)();
var projectReadCache: Dynamic = new (Map as Dynamic)();
function readReferenceProject(
  pid?: Dynamic,
  refresh: Dynamic = false,
  ..._extraArguments: unknown[]
): Dynamic {
  if (refresh) {
    projectReadPromises.delete(pid);
    projectReadCache.delete(pid);
  }
  let cached: Dynamic = projectReadPromises.get(pid);
  if (cached) return cached;
  let promise: Dynamic = resolveCommentsActionsAndSelectionFrame(pid)
    .then(
      (response?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        response.verdict !== `allow` || response.value === undefined
          ? `restricted`
          : response.value,
    )
    .catch((error?: Dynamic, ..._extraArguments: unknown[]) =>
      isRestrictedResponse(error) ? `restricted` : null,
    );
  if (projectReadPromises.size >= 200) {
    projectReadPromises.clear();
    projectReadCache.clear();
  }
  projectReadPromises.set(pid, promise);
  promise.then((result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    if (result === null) {
      projectReadPromises.delete(pid);
    } else {
      projectReadCache.set(pid, result);
    }
  });
  return promise;
}
async function loadArtifactReference(
  refStr?: Dynamic,
  container?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let ref: Dynamic = resolveCommentsActionsAndSelectionNoun(refStr);
  if (ref === null || (ref.noun !== `project` && ref.noun !== `file`))
    return null;
  let pid: Dynamic = referenceContainer(ref, container);
  if (pid === null) return null;
  let project: Dynamic = await readReferenceProject(pid);
  if (
    project === null ||
    (project !== `restricted` &&
      ref.noun === `file` &&
      fileReferenceLabel(project, ref.id) === null &&
      ((project = await readReferenceProject(pid, true)), project === null))
  )
    return null;
  if (project === `restricted`)
    return {
      restricted: true,
    };
  if (ref.noun === `file`) {
    let fileReferenceLabel2: Dynamic = fileReferenceLabel(project, ref.id);
    return fileReferenceLabel2
      ? {
          label: fileReferenceLabel2.tab,
          parent: fileReferenceLabel2.project,
          ...(fileReferenceLabel2.parentTab === undefined
            ? {}
            : {
                parentTab: fileReferenceLabel2.parentTab,
              }),
        }
      : {
          restricted: true,
        };
  }
  return {
    label: projectName(project),
  };
}
function cachedArtifactReference(
  refStr?: Dynamic,
  container?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let ref: Dynamic = resolveCommentsActionsAndSelectionNoun(refStr);
  if (ref === null || (ref.noun !== `project` && ref.noun !== `file`))
    return null;
  let pid: Dynamic = referenceContainer(ref, container);
  if (pid === null) return null;
  let project: Dynamic = projectReadCache.get(pid);
  if (project === undefined) return null;
  if (project === `restricted`)
    return {
      restricted: true,
    };
  if (ref.noun === `file`) {
    let fileReferenceLabel2: Dynamic = fileReferenceLabel(project, ref.id);
    return fileReferenceLabel2
      ? {
          label: fileReferenceLabel2.tab,
          parent: fileReferenceLabel2.project,
          ...(fileReferenceLabel2.parentTab === undefined
            ? {}
            : {
                parentTab: fileReferenceLabel2.parentTab,
              }),
        }
      : null;
  }
  return {
    label: projectName(project),
  };
}
function useArtifactReference(
  refStr?: Dynamic,
  container?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [reference, setReference]: Dynamic = (0, React.useState)(
    (..._extraArguments: unknown[]): Dynamic =>
      cachedArtifactReference(refStr, container),
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let enabled: boolean = false;
      loadArtifactReference(refStr, container).then(
        (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (!enabled && result !== null) {
            setReference(result);
          }
        },
      );
      return (..._extraArguments: unknown[]): undefined => {
        enabled = true;
      };
    },
    [refStr, container],
  );
  return reference;
}
function ArtifactReferenceChip(
  props?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let ref: Dynamic = resolveCommentsActionsAndSelectionNoun(props.refStr);
  let reference: Dynamic = useArtifactReference(props.refStr, props.container);
  let restricted: boolean = reference !== null && `restricted` in reference;
  let resolvedLabel: Dynamic =
    reference !== null && `label` in reference
      ? reference.parentTab === undefined
        ? reference.label
        : `${reference.parentTab} \u00b7 ${reference.label}`
      : null;
  let fallbackLabel: Dynamic = resolveEditorAnchorsAndMentionsStartsWith(
    props.refStr,
    props.container,
  );
  let label: Dynamic = restricted
    ? `Restricted`
    : (resolvedLabel ?? props.label ?? fallbackLabel);
  return props.kind === `user` ? (
    <span
      style={{
        display: `contents`,
      }}
      onClick={(
        artifactReferenceChip?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => artifactReferenceChip.stopPropagation()}
    >
      <UserReferenceChip who={props.refStr.slice(6)} label={props.label} />
    </span>
  ) : (
    <Tooltip content={fallbackLabel}>
      <button
        type={`button`}
        onClick={(
          artifactReferenceChip?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => {
          artifactReferenceChip.stopPropagation();
          if (!restricted) {
            if (props.kind === `run` && ref?.container === undefined) {
              let artifactReferenceChipResult: Dynamic =
                resolveEditorAnchorsAndMentionsRoutines(props.refStr);
              if (artifactReferenceChipResult && props.onDrillRun)
                return props.onDrillRun(artifactReferenceChipResult);
              let replace: Dynamic = props.refStr.replace(/^runs?[:/]/, ``);
              (window as Dynamic).dispatchEvent(
                new (CustomEvent as Dynamic)(`bongo:openRuns`, {
                  detail: {
                    runId: replace,
                  },
                }),
              );
              return;
            }
            if (props.kind === `node`) {
              location.hash = props.refStr;
              return;
            }
            if (ref !== null) {
              let artifactReferenceChipResult: Dynamic =
                resolveCommentsActionsAndSelectionValue7(
                  props.refStr,
                  props.container,
                );
              if (artifactReferenceChipResult !== null)
                return updateDataModelSchemasHerePath(
                  artifactReferenceChipResult,
                );
              if (ref.container !== undefined) return;
            }
            updateDataModelSchemasHerePath(
              `claude://${props.refStr.replace(/^routine:/, `routines/`).replace(/^table:/, `tables/`)}`,
            );
          }
        }}
        data-ref-chip={props.kind}
        data-restricted={restricted ? `true` : undefined}
        style={{
          display: `inline-flex`,
          alignItems: `center`,
          padding: `1px 7px`,
          fontSize: `var(--cds-font-size-footnote, 13px)`,
          lineHeight: 1.5,
          verticalAlign: `baseline`,
          borderRadius: 999,
          fontFamily: `inherit`,
          fontWeight: 500,
          cursor: restricted ? `default` : `pointer`,
        }}
        className={
          restricted
            ? `text-secondary bg-[var(--cds-neutral-50,#f5f4ed)]`
            : `text-primary bg-[var(--cds-neutral-50,#f5f4ed)] hover:bg-[var(--cds-neutral-100,#e1e0d9)]`
        }
      >
        {label}
      </button>
    </Tooltip>
  );
}
var MAX_DRILL_DEPTH: number = 5;
var ROUTINE_REFERENCE_PATTERN: Dynamic = RegExp(
  `^routines?[:/](${EditorAnchorsAndMentionsStyles})$`,
);
var RUN_REFERENCE_PATTERN: Dynamic = RegExp(
  `^run:(${editorAnchorsAndMentionsPattern.source.slice(1, -1)})$`,
);
function drillReferenceKind(
  refStr?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let routineMatch: Dynamic = ROUTINE_REFERENCE_PATTERN.exec(refStr);
  if (routineMatch)
    return {
      kind: `routine`,
      name: routineMatch[1],
    };
  let runMatch: Dynamic = RUN_REFERENCE_PATTERN.exec(refStr);
  return runMatch
    ? {
        kind: `run`,
        id: runMatch[1],
      }
    : null;
}
function DrillReferenceChip(
  props?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    <DrillFrame
      container={props.container}
      frame={{
        ref: props.refStr,
        kind: ``,
        summary: props.label ?? props.refStr,
        expandable: true,
      }}
      depth={0}
    />
  );
}
function DrillFrame(props?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
  let mode: Dynamic = resolvePlatformApiAndAuthUseContext2();
  let [expanded, setExpanded]: Dynamic = (0, React.useState)(false);
  let frame: Dynamic = props.frame;
  let actor: Dynamic =
    frame.actor && !frame.summary.includes(frame.actor) ? frame.actor : null;
  let summary: Dynamic = (
    <jsxRuntime.Fragment>
      <span className={`text-muted w-3 shrink-0`}>
        {frame.expandable ? (expanded ? `▾` : `▸`) : `·`}
      </span>
      {frame.kind && (
        <span className={`text-muted shrink-0`}>{frame.kind}</span>
      )}
      <span className={`text-primary truncate`}>{frame.summary}</span>
      {actor &&
        (actor.includes(`@`) && !actor.startsWith(`agent:`) ? (
          <UserReferenceChip who={actor} />
        ) : (
          <span className={`text-muted shrink-0`}>{actor}</span>
        ))}
      {frame.at && (
        <span className={`text-muted shrink-0`}>
          {resolvePlatformSessionAndSourcesWeekday(
            frame.at,
            Date.parse(mode.now()),
            mode.locale,
            mode.timeZone,
          )}
        </span>
      )}
    </jsxRuntime.Fragment>
  );
  let reference: Dynamic = drillReferenceKind(frame.ref);
  let detail: Dynamic = reference && (
    <Tooltip
      content={
        reference.kind === `routine`
          ? `Open routine:${reference.name}`
          : `Open this run's routine`
      }
    >
      <button
        type={`button`}
        data-testid={`drill-open`}
        aria-label={
          reference.kind === `routine`
            ? `Open routine ${reference.name}`
            : `Open this run's routine`
        }
        onClick={(..._extraArguments: unknown[]): undefined =>
          void loadPlatformLiveDocumentAndHistoryFile(
            props.container,
            reference,
          )
        }
        className={`text-muted hover:text-primary hover:bg-alpha-1 flex size-5 shrink-0 items-center justify-center self-center rounded`}
      >
        <UiOverlaysAndIconsCustomIcon name={`ArrowOutSquare`} customSize={11} />
      </button>
    </Tooltip>
  );
  return (
    <div className={`text-caption font-mono leading-relaxed`}>
      {frame.expandable ? (
        <div className={`flex items-stretch gap-0.5`}>
          <button
            type={`button`}
            data-testid={`drill-frame`}
            data-ref={frame.ref}
            onClick={(..._extraArguments: unknown[]): Dynamic =>
              setExpanded(!expanded)
            }
            className={`hover:bg-alpha-1 flex min-w-0 flex-1 items-baseline gap-1.5 rounded px-1 py-0.5 text-left`}
          >
            {summary}
          </button>
          {detail}
        </div>
      ) : (
        <div className={`flex items-stretch gap-0.5`}>
          <div
            data-testid={`drill-frame`}
            data-ref={frame.ref}
            className={`flex min-w-0 flex-1 items-baseline gap-1.5 px-1 py-0.5`}
          >
            {summary}
          </div>
          {detail}
        </div>
      )}
      {frame.detail && (
        <details className={`text-muted pl-8`}>
          <summary className={`cursor-pointer select-none`}>{`params`}</summary>
          <pre
            className={`text-caption max-h-40 overflow-auto break-all whitespace-pre-wrap`}
          >
            {frame.detail}
          </pre>
        </details>
      )}
      {frame.expandable && expanded && (
        <div className={`border-strong/40 ml-1.5 border-l pl-3`}>
          <DrillChildren
            container={props.container}
            refStr={frame.ref}
            depth={props.depth + 1}
          />
        </div>
      )}
    </div>
  );
}
function DrillChildren(
  props?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [allowDeep, setAllowDeep]: Dynamic = (0, React.useState)(false);
  let tooDeep: boolean = props.depth >= MAX_DRILL_DEPTH && !allowDeep;
  let slot: Dynamic = (0, React.useId)();
  let level: Dynamic = PlatformLiveDocumentAndHistoryLevels(
    (drillChildren?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      drillChildren.levels[slot] ?? null,
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (!tooDeep) {
        PlatformLiveDocumentAndHistoryLevels.getState().load(
          slot,
          props.container,
          props.refStr,
        );
      }
    },
    [slot, props.container, props.refStr, tooDeep],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): Dynamic =>
        PlatformLiveDocumentAndHistoryLevels.getState().release(slot),
    [slot],
  );
  if (tooDeep)
    return (
      <button
        type={`button`}
        data-testid={`drill-more`}
        className={`text-muted hover:text-primary text-caption px-1 py-0.5 font-mono`}
        onClick={(..._extraArguments: unknown[]): Dynamic => setAllowDeep(true)}
      >{`show more…`}</button>
    );
  if (level === null) return <DrillStatus>{`…`}</DrillStatus>;
  if (`error` in level) return <DrillStatus>{level.message}</DrillStatus>;
  if (level.empty)
    return <DrillStatus empty={true}>{level.empty.reason}</DrillStatus>;
  if (level.frames.length === 0)
    return (
      <DrillStatus
        empty={true}
      >{`No further dependencies recorded.`}</DrillStatus>
    );
  let depth: Dynamic = allowDeep ? 0 : props.depth;
  let counts: Dynamic = new (Map as Dynamic)();
  return (
    <jsxRuntime.Fragment>
      {level.frames.map(
        (entry?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          let label: string = `${entry.kind}|${entry.ref}`;
          let countEntry: Dynamic = counts.get(label) ?? 0;
          counts.set(label, countEntry + 1);
          return (
            <DrillFrame
              {...originalJsxProps(
                {
                  container: props.container,
                  frame: entry,
                  depth: depth,
                },
                countEntry ? `${label}#${countEntry}` : label,
              )}
            />
          );
        },
      )}
    </jsxRuntime.Fragment>
  );
}
function DrillStatus(props?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
  return (
    <div
      data-testid={props.empty ? `drill-empty` : undefined}
      className={`text-muted text-caption px-1 py-0.5 font-mono`}
    >
      {props.children}
    </div>
  );
}
if (
  typeof document !== "undefined" &&
  (document as Dynamic).getElementById(`ldoc-chip-css`) === null
) {
  let element: Dynamic = (document as Dynamic).createElement(`style`);
  element.id = `ldoc-chip-css`;
  element.textContent = EditorExtensionsBlue2;
  (document as Dynamic).head.append(element);
}
function MentionHoverCard(
  { principal: principal, anchor: anchor }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let emailPrincipal: boolean =
    resolveEditorAnchorsAndMentionsOther(principal) === `email`;
  let preferredName: Dynamic = useCommentsActionsAndSelectionAccount(principal);
  let account: Dynamic = useCommentsActionsAndSelectionPlatform(principal);
  let email: Dynamic =
    resolveEditorAnchorsAndMentionsEmail2(principal) ??
    (account?.email || undefined);
  let name: Dynamic = preferredName || account?.name || undefined;
  let emailLabel: Dynamic = resolvePlatformApiAndAuthToLowerCase3(email);
  let label: Dynamic = emailPrincipal
    ? (emailLabel ?? resolveEditorAnchorsAndMentionsEmail(principal))
    : resolveEditorAnchorsAndMentionsEmail(principal, name);
  let avatar: Dynamic =
    resolvePlatformApiAndAuthValue39(email) ??
    (account?.avatarUrl || undefined);
  let profile: Dynamic = resolvePlatformApiAndAuthToLowerCase2(email);
  let showName: Dynamic = emailPrincipal || name !== undefined;
  let cardRef: Dynamic = (0, React.useRef)(null);
  let anchorRef: Dynamic = (0, React.useRef)(null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (emailPrincipal) {
        PlatformApiAndAuthPriming.getState().primeExact([principal]);
      }
    },
    [emailPrincipal, principal],
  );
  let roleDescription: string = [profile?.title, profile?.team, profile?.org]
    .filter(Boolean)
    .join(` · `);
  let locationDescription: string = [
    profile?.building,
    profile?.floor ? `Floor ${profile.floor}` : ``,
  ]
    .filter(Boolean)
    .join(` · `);
  let placement: string = ``;
  if (profile?.tz)
    try {
      placement = `${new (Intl.DateTimeFormat as Dynamic)(undefined, {
        hour: `numeric`,
        minute: `2-digit`,
        timeZone: profile.tz,
        timeZoneName: `short`,
      }).format(new (Date as Dynamic)())} local`;
    } catch {}
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let card: Dynamic = cardRef.current;
      if (!showName || card === null) return;
      let element: Dynamic = filterEditorChipsAndNodeViewsOnce(
        document,
        {
          label: label,
          principal: emailPrincipal ? principal : undefined,
          email: email,
          photoUrl: avatar,
          role: roleDescription,
          desk: locationDescription,
          local: placement,
        },
        {
          onCopy: (
            mentionHoverCard?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            (navigator as Dynamic).clipboard
              ?.writeText(mentionHoverCard)
              .then((..._extraArguments: unknown[]): undefined => {
                let matchedElement: Dynamic =
                  element.querySelector(`button.cp`);
                if (matchedElement !== null) {
                  matchedElement.textContent = `Copied`;
                  if (anchorRef.current !== null) {
                    clearTimeout(anchorRef.current);
                  }
                  anchorRef.current = setTimeout(
                    (..._extraArguments: unknown[]): undefined => {
                      matchedElement.textContent = `Copy email`;
                    },
                    1200,
                  );
                }
              });
          },
        },
      );
      card.replaceChildren(element);
      return (..._extraArguments: unknown[]): undefined => {
        if (anchorRef.current !== null) {
          clearTimeout(anchorRef.current);
        }
        anchorRef.current = null;
        card.replaceChildren();
      };
    },
    [
      showName,
      label,
      emailPrincipal,
      principal,
      email,
      avatar,
      roleDescription,
      locationDescription,
      placement,
    ],
  );
  if (!showName) return null;
  let left: number = Math.max(
    8,
    Math.min(anchor.left, (window as Dynamic).innerWidth - 268 - 8),
  );
  return (
    <div
      ref={cardRef}
      className={`bg-surface-3 border-weak shadow-md text-footnote fixed z-50 rounded-lg border px-3.5 py-3`}
      style={{
        ...(anchor.bottom + 8 + 180 < (window as Dynamic).innerHeight
          ? {
              top: anchor.bottom + 6,
              left: left,
            }
          : {
              bottom: (window as Dynamic).innerHeight - anchor.top + 6,
              left: left,
            }),
        width: 268,
      }}
      data-testid={`person-hover-card`}
    />
  );
}
function MentionHoverAnchor(
  { principal: principal, children: children }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [anchor, setAnchor]: Dynamic = (0, React.useState)(null);
  let showTimer: Dynamic = (0, React.useRef)(null);
  let hideTimer: Dynamic = (0, React.useRef)(null);
  let clearTimer = (
    ref?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (ref.current !== null) {
      clearTimeout(ref.current);
    }
    ref.current = null;
  };
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): undefined => {
        clearTimer(showTimer);
        clearTimer(hideTimer);
      },
    [],
  );
  let hide = (..._extraArguments: unknown[]): undefined => {
    clearTimer(hideTimer);
    hideTimer.current = setTimeout(
      (..._extraArguments: unknown[]): Dynamic => setAnchor(null),
      200,
    );
  };
  return (
    <span
      onMouseEnter={(
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        clearTimer(hideTimer);
        clearTimer(showTimer);
        let currentTarget: Dynamic = event.currentTarget;
        showTimer.current = setTimeout(
          (..._extraArguments: unknown[]): Dynamic =>
            setAnchor(currentTarget.getBoundingClientRect()),
          250,
        );
      }}
      onMouseLeave={(..._extraArguments: unknown[]): undefined => {
        clearTimer(showTimer);
        hide();
      }}
    >
      {children}
      {anchor !== null && (
        <span
          onMouseEnter={(..._extraArguments: unknown[]): Dynamic =>
            clearTimer(hideTimer)
          }
          onMouseLeave={hide}
        >
          <MentionHoverCard principal={principal} anchor={anchor} />
        </span>
      )}
    </span>
  );
}
export {
  referenceContainer as C,
  watchReferenceChanges as D,
  fileReferenceLabel as E,
  readEnumDefinition as S,
  projectName as T,
  searchReferenceCandidates as _,
  UserReferenceChip as a,
  readCrossFileReference as b,
  DEFAULT_STATUS_ENUM as c,
  enumSchema as d,
  referenceReadRoute as f,
  isRestrictedResponse as g,
  crossProjectClaudeLink as h,
  cachedArtifactReference as i,
  ENUM_COLORS as l,
  reconcileEnumDefinition as m,
  DrillReferenceChip as n,
  MentionName as o,
  safeReferenceUrl as p,
  ArtifactReferenceChip as r,
  REFERENCE_REFRESH_DEBOUNCE_MS as s,
  MentionHoverAnchor as t,
  resolveMentionNames as u,
  tabNameDirectory as v,
  resolveLocalReference as w,
  readTableReference as x,
  searchTabs as y,
};
export {
  referenceContainer,
  watchReferenceChanges,
  fileReferenceLabel,
  readEnumDefinition,
  projectName,
  searchReferenceCandidates,
  UserReferenceChip,
  readCrossFileReference,
  DEFAULT_STATUS_ENUM,
  enumSchema,
  referenceReadRoute,
  isRestrictedResponse,
  crossProjectClaudeLink,
  cachedArtifactReference,
  ENUM_COLORS,
  reconcileEnumDefinition,
  DrillReferenceChip,
  MentionName,
  safeReferenceUrl,
  ArtifactReferenceChip,
  REFERENCE_REFRESH_DEBOUNCE_MS,
  MentionHoverAnchor,
  resolveMentionNames,
  tabNameDirectory,
  resolveLocalReference,
  readTableReference,
  searchTabs,
};
