/** BaoCut: platform frame and capabilities from app-core-BE6n4d7F.js. */
import type {
  FrameLane,
  FrameVersions,
  VersionLine,
  EnumRow,
  FrameVerdict,
  NonceDependencies,
  DownloadsCapability,
  SaveRequest,
  SaveResult,
  McpCapability,
  McpMount,
  ModeStore,
  ModeCallbacks,
  HostThread,
  CapabilityAccess,
} from "./type-models/host";
import type { UnknownRecord } from "./type-models/common";
import type { Dynamic } from "./types";
import {
  loadPlatformSessionAndSourcesComments,
  resolvePlatformSessionAndSourcesRef,
} from "./platform-core-platform-session-and-sources-1";
import {
  EditorExtensionsFrameSendError,
} from "./platform-core-editor-extensions-3";

var PlatformFrameAndCapabilitiesBongoFrameMount: string;

var platformFrameAndCapabilitiesPattern: RegExp;

function resolvePlatformFrameAndCapabilitiesReloaded(
  platformFrameAndCapabilitiesReloaded: NonceDependencies,
): string {
  if (platformFrameAndCapabilitiesReloaded.reloaded)
    try {
      let item = platformFrameAndCapabilitiesReloaded.storage?.getItem(
        PlatformFrameAndCapabilitiesBongoFrameMount,
      );
      if (
        typeof item == `string` &&
        platformFrameAndCapabilitiesPattern.test(item)
      )
        return item;
    } catch {}
  let mint = platformFrameAndCapabilitiesReloaded.mint();
  if (!platformFrameAndCapabilitiesPattern.test(mint))
    throw Error(`frameShell: mint produced an illegal mount nonce`);
  try {
    platformFrameAndCapabilitiesReloaded.storage?.setItem(
      PlatformFrameAndCapabilitiesBongoFrameMount,
      mint,
    );
  } catch {}
  return mint;
}

function isPlatformFrameAndCapabilitiesNavigation(
  ..._extraArguments: unknown[]
) {
  try {
    return (
      (globalThis as Dynamic).performance?.getEntriesByType?.(`navigation`)?.[0]
        ?.type === `reload`
    );
  } catch {
    return false;
  }
}

function isPlatformFrameAndCapabilitiesWindow(..._extraArguments: unknown[]) {
  try {
    let from: Dynamic = (globalThis as Dynamic).window?.claude?.hot?.from;
    return typeof from == `object` && !!from && !Array.isArray(from);
  } catch {
    return false;
  }
}

var resolvePlatformFrameAndCapabilitiesValue: (platformFrameAndCapabilitiesValue: unknown) => platformFrameAndCapabilitiesValue is UnknownRecord;

async function loadPlatformFrameAndCapabilitiesParent(
  platformFrameAndCapabilitiesParent: FrameLane,
  options: string,
): Promise<FrameVersions> {
  await platformFrameAndCapabilitiesParent.whenSeeded();
  let record2 = platformFrameAndCapabilitiesParent.read({
    object: `project`,
    id: options,
  });
  let defaultVersionId = resolvePlatformFrameAndCapabilitiesValue(record2)
    ? record2.defaultVersionId
    : undefined;
  let lines: VersionLine[] = [];
  for (let [
    loadPlatformFrameAndCapabilitiesParentResult,
    loadPlatformFrameAndCapabilitiesParentResult2,
  ] of platformFrameAndCapabilitiesParent.refs()) {
    if (!loadPlatformFrameAndCapabilitiesParentResult.startsWith(`version/`))
      continue;
    let loadPlatformFrameAndCapabilitiesParentResultSlice =
      loadPlatformFrameAndCapabilitiesParentResult.slice(8);
    let record3 = platformFrameAndCapabilitiesParent.read({
      object: `version`,
      id: loadPlatformFrameAndCapabilitiesParentResultSlice,
    });
    if (!resolvePlatformFrameAndCapabilitiesValue(record3)) continue;
    let parent = record3.parent;
    let base = record3.base;
    if (
      !(
        (parent !== null && typeof parent != `string`) ||
        typeof base != `number`
      )
    ) {
      lines.push({
        id: loadPlatformFrameAndCapabilitiesParentResultSlice,
        parent: parent,
        base: base,
        ...(typeof record3.name == `string`
          ? {
              name: record3.name,
            }
          : {}),
        ...(typeof record3.frozen == `boolean`
          ? {
              frozen: record3.frozen,
            }
          : {}),
        ...(typeof record3.abandoned == `boolean`
          ? {
              abandoned: record3.abandoned,
            }
          : {}),
        ...(loadPlatformFrameAndCapabilitiesParentResult2.born
          ? {
              bornAtSeq: loadPlatformFrameAndCapabilitiesParentResult2.born.seq,
              bornAt: loadPlatformFrameAndCapabilitiesParentResult2.born.at,
            }
          : {}),
      });
    }
  }
  return {
    head: platformFrameAndCapabilitiesParent.head,
    defaultVersionId:
      typeof defaultVersionId == `string` ? defaultVersionId : null,
    lines: lines,
  };
}

async function loadPlatformFrameAndCapabilitiesOptions(
  platformFrameAndCapabilitiesOptions: FrameLane,
): Promise<EnumRow[]> {
  await platformFrameAndCapabilitiesOptions.whenSeeded();
  let items: EnumRow[] = [];
  for (let loadPlatformFrameAndCapabilitiesOptionsResult of platformFrameAndCapabilitiesOptions
    .refs()
    .keys()) {
    if (!loadPlatformFrameAndCapabilitiesOptionsResult.startsWith(`enum/`))
      continue;
    let loadPlatformFrameAndCapabilitiesOptionsResultSlice =
      loadPlatformFrameAndCapabilitiesOptionsResult.slice(5);
    let record2 = platformFrameAndCapabilitiesOptions.read({
      object: `enum`,
      id: loadPlatformFrameAndCapabilitiesOptionsResultSlice,
    });
    if (resolvePlatformFrameAndCapabilitiesValue(record2)) {
      items.push({
        id: loadPlatformFrameAndCapabilitiesOptionsResultSlice,
        name: typeof record2.name == `string` ? record2.name : ``,
        options: Array.isArray(record2.options) ? record2.options : [],
      });
    }
  }
  items.sort((rolldownRImport2, rolldownRImport3) =>
    rolldownRImport2.name < rolldownRImport3.name
      ? -1
      : rolldownRImport2.name > rolldownRImport3.name
        ? 1
        : rolldownRImport2.id < rolldownRImport3.id
          ? -1
          : +(rolldownRImport2.id > rolldownRImport3.id),
  );
  return items;
}

var platformFrameAndCapabilitiesSet: Set<string>;

async function loadPlatformFrameAndCapabilitiesVerdict(
  platformFrameAndCapabilitiesVerdict: FrameLane,
  options: string,
): Promise<FrameVerdict> {
  await platformFrameAndCapabilitiesVerdict.whenSeeded();
  let deadReason = platformFrameAndCapabilitiesVerdict.deadReason;
  if (deadReason !== null) {
    if (platformFrameAndCapabilitiesSet.has(deadReason))
      return {
        verdict: `deny`,
        reason: `forbidden`,
        detail: `this page's access was withdrawn (the relay's lane was revoked)`,
        data: {
          code: `forbidden`,
          why: `lane`,
        },
      };
    throw new EditorExtensionsFrameSendError(`DEAD:${deadReason}`);
  }
  let record2 = platformFrameAndCapabilitiesVerdict.read({
    object: `project`,
    id: options,
  });
  return record2 === undefined
    ? {
        verdict: `allow`,
      }
    : {
        verdict: `allow`,
        value: record2,
      };
}

var resolvePlatformFrameAndCapabilitiesValue2: (platformFrameAndCapabilitiesValue2: unknown) => platformFrameAndCapabilitiesValue2 is UnknownRecord;

function updatePlatformFrameAndCapabilitiesCbs(
  updatePlatformFrameAndCapabilitiesCbs2: (bid: string) => void,
  options: ModeStore,
): ModeCallbacks {
  let updatePlatformFrameAndCapabilitiesCbsResult: {
    exitMode?(): void;
  } | null = null;
  let enabled = false;
  let items: HostThread[] = [];
  let enabled2 = false;
  let enabled3 = false;
  let exitMode = () => {
    if (updatePlatformFrameAndCapabilitiesCbsResult === null) {
      enabled = true;
      return;
    }
    enabled = false;
    updatePlatformFrameAndCapabilitiesCbsResult.exitMode?.();
  };
  let updatePlatformFrameAndCapabilitiesCbsHandler: (
    on: boolean,
    byKey?: boolean,
  ) => void = (updatePlatformFrameAndCapabilitiesCbs3, options2) => {
    enabled3 = true;
    try {
      options.set(updatePlatformFrameAndCapabilitiesCbs3, options2);
    } finally {
      enabled3 = false;
    }
  };
  return {
    cbs: {
      mode: (updatePlatformFrameAndCapabilitiesCbs3, options2) => {
        enabled2 = updatePlatformFrameAndCapabilitiesCbs3 === true;
        if (!enabled2) {
          enabled = false;
        }
        updatePlatformFrameAndCapabilitiesCbsHandler(
          enabled2,
          resolvePlatformFrameAndCapabilitiesValue2(options2) &&
            typeof options2.byKey == `boolean`
            ? options2.byKey
            : undefined,
        );
      },
      threads: (updatePlatformFrameAndCapabilitiesCbs3) => {
        items = Array.isArray(updatePlatformFrameAndCapabilitiesCbs3)
          ? updatePlatformFrameAndCapabilitiesCbs3
          : [];
      },
      reveal: (updatePlatformFrameAndCapabilitiesCbs3) => {
        let item = items.find(
          (item2) => item2.id === updatePlatformFrameAndCapabilitiesCbs3,
        );
        let platformSessionAndSourcesRef = item
          ? resolvePlatformSessionAndSourcesRef(item.anchor)
          : null;
        if (platformSessionAndSourcesRef !== null) {
          updatePlatformFrameAndCapabilitiesCbs2(
            platformSessionAndSourcesRef.bid,
          );
        }
      },
    },
    attach: (updatePlatformFrameAndCapabilitiesCbs3) => {
      updatePlatformFrameAndCapabilitiesCbsResult =
        updatePlatformFrameAndCapabilitiesCbs3;
      if (enabled) {
        exitMode();
      }
    },
    threads: () => items,
    hostOn: () => enabled2,
    dispose: options.subscribe((updatePlatformFrameAndCapabilitiesCbs3) => {
      if (!enabled3) {
        if (!updatePlatformFrameAndCapabilitiesCbs3 && enabled2) {
          exitMode();
        }
      }
    }),
  };
}

async function loadPlatformFrameAndCapabilitiesCall(
  platformFrameAndCapabilitiesCall?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let platformSessionAndSourcesComments: Dynamic =
    await loadPlatformSessionAndSourcesComments(
      platformFrameAndCapabilitiesCall,
    );
  let customAnchors: Dynamic = platformSessionAndSourcesComments?.customAnchors;
  if (typeof customAnchors != `function`) return null;
  try {
    let call: Dynamic = await customAnchors.call(
      platformSessionAndSourcesComments,
      options,
    );
    return resolvePlatformFrameAndCapabilitiesValue2(call) &&
      typeof call.compose == `function` &&
      typeof call.placed == `function` &&
      typeof call.release == `function`
      ? call
      : null;
  } catch {
    return null;
  }
}

var platformFrameAndCapabilitiesSet2: Set<string>;

var resolvePlatformFrameAndCapabilitiesValue3: (platformFrameAndCapabilitiesValue3: unknown) => platformFrameAndCapabilitiesValue3 is UnknownRecord;

var resolvePlatformFrameAndCapabilitiesSave: (platformFrameAndCapabilitiesSave: unknown) => platformFrameAndCapabilitiesSave is DownloadsCapability;

async function loadPlatformFrameAndCapabilitiesDownloads(
  platformFrameAndCapabilitiesDownloads: unknown,
): Promise<DownloadsCapability | null> {
  const capabilities = platformFrameAndCapabilitiesDownloads as
    | CapabilityAccess
    | null
    | undefined;
  if (capabilities == null) return null;
  if (typeof capabilities.use == `function`)
    try {
      let use = await capabilities.use(`downloads`);
      return resolvePlatformFrameAndCapabilitiesSave(use) ? use : null;
    } catch {
      return null;
    }
  return resolvePlatformFrameAndCapabilitiesSave(capabilities.downloads)
    ? capabilities.downloads
    : null;
}

async function loadPlatformFrameAndCapabilitiesValue(
  platformFrameAndCapabilitiesValue: unknown,
): Promise<boolean> {
  return (
    (await loadPlatformFrameAndCapabilitiesDownloads(
      platformFrameAndCapabilitiesValue,
    )) !== null
  );
}

async function loadPlatformFrameAndCapabilitiesCode(
  platformFrameAndCapabilitiesCode: unknown,
  options: SaveRequest,
): Promise<SaveResult> {
  let platformFrameAndCapabilitiesDownloads =
    await loadPlatformFrameAndCapabilitiesDownloads(
      platformFrameAndCapabilitiesCode,
    );
  if (
    platformFrameAndCapabilitiesDownloads === null ||
    typeof platformFrameAndCapabilitiesDownloads.save != `function`
  )
    return {
      ok: false,
      code: `unavailable`,
    };
  let response;
  try {
    response = await platformFrameAndCapabilitiesDownloads.save(options);
  } catch (error) {
    let code =
      resolvePlatformFrameAndCapabilitiesValue3(error) &&
      typeof error.code == `string`
        ? error.code
        : ``;
    let hasCode = platformFrameAndCapabilitiesSet2.has(code);
    return {
      ok: false,
      code: hasCode ? code : `unavailable`,
      ...(hasCode
        ? {}
        : {
            unlisted: true,
          }),
    };
  }
  return resolvePlatformFrameAndCapabilitiesValue3(response) &&
    (response.status === `saved` ||
      (options.request !== undefined && response.status === `delivered`))
    ? {
        ok: true,
      }
    : {
        ok: false,
        code: `malformed`,
      };
}

function resolvePlatformFrameAndCapabilitiesIndexOf(
  items?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let label: Dynamic = ``;
  let index: Dynamic = 0;
  let index2 = 0;
  for (; index < items.length; ) {
    let itemItem: Dynamic = items[index];
    if (itemItem === `*`) {
      if (items[index + 1] === `*`) {
        if (items[index + 2] === `/`) {
          label += `(?:.*/)?`;
          index += 3;
        } else {
          label += `.*`;
          index += 2;
        }
      } else {
        label += `[^/]*`;
        index++;
      }
    } else if (itemItem === `?`) {
      label += `[^/]`;
      index++;
    } else if (itemItem === `[`) {
      let itemIndex: Dynamic = items.indexOf(`]`, index + 1);
      if (itemIndex === -1) {
        label += `\\[`;
        index++;
      } else {
        let itemsSlice: Dynamic = items.slice(index + 1, itemIndex);
        if (itemsSlice.startsWith(`!`)) {
          itemsSlice = `^` + itemsSlice.slice(1);
        }
        label += `[` + itemsSlice + `]`;
        index = itemIndex + 1;
      }
    } else if (itemItem === `{`) {
      label += `(?:`;
      index2++;
      index++;
    } else {
      if (itemItem === `}` && index2 > 0) {
        label += `)`;
        index2--;
        index++;
      } else {
        if (itemItem === `,` && index2 > 0) {
          label += `|`;
          index++;
        } else {
          if (`\\^$+.()|`.includes(itemItem)) {
            label += `\\` + itemItem;
            index++;
          } else {
            label += itemItem;
            index++;
          }
        }
      }
    }
  }
  return RegExp(`^` + label + `$`);
}

var platformFrameAndCapabilitiesPattern2: RegExp;

function resolvePlatformFrameAndCapabilitiesCause(
  items?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (items.length > 200)
    throw Error(
      `grep: pattern too long (max 200) — narrow it or use regex:false`,
    );
  let items2: Dynamic = options
    ? items
    : items.replace(/[\\^$+.()|[\]{}*?]/g, `\\$&`);
  try {
    return new RegExp(items2, context ? `i` : ``);
  } catch (cause: Dynamic) {
    throw Error(
      `grep: invalid regex '${items}' — pass regex:false for a literal substring search (${cause.message})`,
      {
        cause: cause,
      },
    );
  }
}

function isPlatformFrameAndCapabilitiesTest(
  platformFrameAndCapabilitiesTest?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return !platformFrameAndCapabilitiesPattern2.test(
    platformFrameAndCapabilitiesTest,
  );
}

var resolvePlatformFrameAndCapabilitiesTest: Dynamic;

var resolvePlatformFrameAndCapabilitiesFrom: Dynamic;

var resolvePlatformFrameAndCapabilitiesFromCharCode: Dynamic;

function resolvePlatformFrameAndCapabilitiesNext(
  platformFrameAndCapabilitiesNext?: Dynamic,
  items?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (items === context)
    throw Error(`patch: old_string and new_string are identical`);
  if (items === ``) throw Error(`patch: old_string is empty`);
  let index = 0;
  let platformFrameAndCapabilitiesNextIndex: Dynamic =
    platformFrameAndCapabilitiesNext.indexOf(items);
  for (; platformFrameAndCapabilitiesNextIndex !== -1; ) {
    index++;
    platformFrameAndCapabilitiesNextIndex =
      platformFrameAndCapabilitiesNext.indexOf(
        items,
        platformFrameAndCapabilitiesNextIndex + items.length,
      );
  }
  if (index === 0) throw Error(`patch: old_string not found in ${argument}`);
  if (index > 1 && !dependencies)
    throw Error(
      `patch: old_string matches ${index} times in ${argument} — make it unique with more context, or pass replace_all:true`,
    );
  return {
    next: platformFrameAndCapabilitiesNext.split(items).join(context),
    replaced: dependencies ? index : 1,
  };
}

function getPlatformFrameAndCapabilitiesPattern(
  { pattern: pattern, candidates: candidates, mtimeOf: mtimeOf }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let platformFrameAndCapabilitiesIndexOf =
    resolvePlatformFrameAndCapabilitiesIndexOf(pattern);
  let difference = 2 ** 53 - 1;
  return candidates
    .filter((candidate?: Dynamic, ..._extraArguments: unknown[]) =>
      platformFrameAndCapabilitiesIndexOf.test(candidate),
    )
    .toSorted(
      (
        filteredRolldownRImport?: Dynamic,
        filteredRolldownRImport2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let mtimeOfEntry: Dynamic =
          mtimeOf?.get(filteredRolldownRImport) ?? difference;
        let mtimeOfEntry2: Dynamic =
          mtimeOf?.get(filteredRolldownRImport2) ?? difference;
        return mtimeOfEntry2 === mtimeOfEntry
          ? filteredRolldownRImport.localeCompare(filteredRolldownRImport2)
          : mtimeOfEntry2 - mtimeOfEntry;
      },
    );
}

var platformFrameAndCapabilitiesValue5000: number;

function resolvePlatformFrameAndCapabilitiesTag(
  platformFrameAndCapabilitiesTag?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let platformFrameAndCapabilitiesTagParts: Dynamic =
    platformFrameAndCapabilitiesTag.split(`
`);
  let optionsParts: Dynamic = options.split(`
`);
  let platformFrameAndCapabilitiesTagPartsCount: Dynamic =
    platformFrameAndCapabilitiesTagParts.length;
  let optionsPartsCount: Dynamic = optionsParts.length;
  let record2: Dynamic = Array.from<Dynamic, Dynamic>(
    {
      length: platformFrameAndCapabilitiesTagPartsCount + 1,
    },
    (..._extraArguments: unknown[]): Dynamic =>
      Array.from<Dynamic, Dynamic>(
        {
          length: optionsPartsCount + 1,
        },
        (..._extraArguments: unknown[]) => 0,
      ),
  );
  for (
    let difference = platformFrameAndCapabilitiesTagPartsCount - 1;
    difference >= 0;
    difference--
  )
    for (
      let difference2 = optionsPartsCount - 1;
      difference2 >= 0;
      difference2--
    )
      record2[difference][difference2] =
        platformFrameAndCapabilitiesTagParts[difference] ===
        optionsParts[difference2]
          ? record2[difference + 1][difference2 + 1] + 1
          : Math.max(
              record2[difference + 1][difference2],
              record2[difference][difference2 + 1],
            );
  let items: Dynamic = [];
  let index = 0;
  let index2 = 0;
  for (
    ;
    index < platformFrameAndCapabilitiesTagPartsCount &&
    index2 < optionsPartsCount;

  )
    if (platformFrameAndCapabilitiesTagParts[index] === optionsParts[index2]) {
      items.push({
        tag: ` `,
        a: platformFrameAndCapabilitiesTagParts[index++],
        b: optionsParts[index2++],
      });
    } else {
      if (record2[index + 1][index2] >= record2[index][index2 + 1]) {
        items.push({
          tag: `-`,
          a: platformFrameAndCapabilitiesTagParts[index++],
        });
      } else {
        items.push({
          tag: `+`,
          b: optionsParts[index2++],
        });
      }
    }
  for (; index < platformFrameAndCapabilitiesTagPartsCount; )
    items.push({
      tag: `-`,
      a: platformFrameAndCapabilitiesTagParts[index++],
    });
  for (; index2 < optionsPartsCount; )
    items.push({
      tag: `+`,
      b: optionsParts[index2++],
    });
  return items;
}

function resolvePlatformFrameAndCapabilitiesSplit(
  items?: Dynamic,
  items2?: Dynamic,
  context?: Dynamic,
  dependencies: Dynamic = context,
  ..._extraArguments: unknown[]
) {
  if (items === items2)
    return `--- ${context}\n+++ ${dependencies}\n(identical)`;
  let itemsPartsCount: Dynamic = items.split(`
`).length;
  let itemsPartsCount2: Dynamic = items2.split(`
`).length;
  if (
    itemsPartsCount > platformFrameAndCapabilitiesValue5000 ||
    itemsPartsCount2 > platformFrameAndCapabilitiesValue5000
  )
    return `--- ${context}\n+++ ${dependencies}\n(too large for line diff: ${itemsPartsCount} vs ${itemsPartsCount2} lines, ${items.length} vs ${items2.length} bytes)`;
  let platformFrameAndCapabilitiesTag: Dynamic =
    resolvePlatformFrameAndCapabilitiesTag(items, items2);
  let items3 = [`--- ${context}`, `+++ ${dependencies}`];
  for (let resolvePlatformFrameAndCapabilitiesSplitResult of platformFrameAndCapabilitiesTag as Dynamic)
    items3.push(
      resolvePlatformFrameAndCapabilitiesSplitResult.tag +
        (resolvePlatformFrameAndCapabilitiesSplitResult.tag === `+`
          ? (resolvePlatformFrameAndCapabilitiesSplitResult.b ?? ``)
          : (resolvePlatformFrameAndCapabilitiesSplitResult.a ?? ``)),
    );
  return items3.join(`
`);
}

function collectPlatformFrameAndCapabilitiesFilesWithMatches(
  collectPlatformFrameAndCapabilitiesFiles?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let outputMode: Dynamic =
    collectPlatformFrameAndCapabilitiesFiles.output_mode ??
    `files_with_matches`;
  let enabled = !!collectPlatformFrameAndCapabilitiesFiles[`-i`];
  let matchesCollectPlatformFrameAndCapabilitiesFileItem =
    collectPlatformFrameAndCapabilitiesFiles[`-n`] !== false;
  let headLimit: Dynamic =
    typeof collectPlatformFrameAndCapabilitiesFiles.head_limit == `number`
      ? collectPlatformFrameAndCapabilitiesFiles.head_limit
      : 100;
  let matchesRegex = collectPlatformFrameAndCapabilitiesFiles.regex !== false;
  let platformFrameAndCapabilitiesIndexOf =
    collectPlatformFrameAndCapabilitiesFiles.path
      ? resolvePlatformFrameAndCapabilitiesIndexOf(
          collectPlatformFrameAndCapabilitiesFiles.path,
        )
      : null;
  let platformFrameAndCapabilitiesCause =
    resolvePlatformFrameAndCapabilitiesCause(
      collectPlatformFrameAndCapabilitiesFiles.pattern,
      matchesRegex,
      enabled,
    );
  let items: Dynamic = [];
  let items2: Dynamic = [];
  let items3: Dynamic = [];
  let index = 0;
  let index2 = 0;
  outer: for (let [
    collectPlatformFrameAndCapabilitiesFilesWithMatchesResult,
    collectPlatformFrameAndCapabilitiesFilesWithMatchesResult2,
  ] of collectPlatformFrameAndCapabilitiesFiles.files as Dynamic) {
    if (
      (platformFrameAndCapabilitiesIndexOf &&
        !platformFrameAndCapabilitiesIndexOf.test(
          collectPlatformFrameAndCapabilitiesFilesWithMatchesResult,
        )) ||
      !isPlatformFrameAndCapabilitiesTest(
        collectPlatformFrameAndCapabilitiesFilesWithMatchesResult,
      )
    )
      continue;
    index2++;
    let collectPlatformFrameAndCapabilitiesFilesWithMatchesResultParts: Dynamic =
      collectPlatformFrameAndCapabilitiesFilesWithMatchesResult2.split(`
`);
    let index3 = 0;
    for (
      let index4 = 0;
      index4 <
      collectPlatformFrameAndCapabilitiesFilesWithMatchesResultParts.length;
      index4++
    ) {
      let collectPlatformFrameAndCapabilitiesFilesWithMatchesResultPartItem: Dynamic =
        collectPlatformFrameAndCapabilitiesFilesWithMatchesResultParts[
          index4
        ] ?? ``;
      if (
        platformFrameAndCapabilitiesCause.test(
          collectPlatformFrameAndCapabilitiesFilesWithMatchesResultPartItem,
        )
      ) {
        index3++;
        if (outputMode === `content`) {
          items3.push(
            matchesCollectPlatformFrameAndCapabilitiesFileItem
              ? `${collectPlatformFrameAndCapabilitiesFilesWithMatchesResult}:${index4 + 1}:${collectPlatformFrameAndCapabilitiesFilesWithMatchesResultPartItem}`
              : `${collectPlatformFrameAndCapabilitiesFilesWithMatchesResult}:${collectPlatformFrameAndCapabilitiesFilesWithMatchesResultPartItem}`,
          );
          if (++index >= headLimit) break outer;
        } else if (outputMode === `files_with_matches`) break;
      }
    }
    if (index3 > 0) {
      if (outputMode === `files_with_matches`) {
        items.push(collectPlatformFrameAndCapabilitiesFilesWithMatchesResult);
        if (++index >= headLimit) break;
      } else if (
        outputMode === `count` &&
        (items2.push([
          collectPlatformFrameAndCapabilitiesFilesWithMatchesResult,
          index3,
        ]),
        ++index >= headLimit)
      )
        break;
    }
  }
  return index === 0
    ? `(no matches in ${index2} file${index2 === 1 ? `` : `s`})`
    : outputMode === `content`
      ? items3.join(`
`)
      : outputMode === `count`
        ? items2.map(
            ([item, item2]: Dynamic, ..._extraArguments: unknown[]) =>
              `${item}:${item2}`,
          ).join(`
`)
        : items.join(`
`);
}

var platformFrameAndCapabilitiesSet3: Dynamic;

var resolvePlatformFrameAndCapabilitiesValue4: Dynamic;

var resolvePlatformFrameAndCapabilitiesValue5: Dynamic;

async function loadPlatformFrameAndCapabilitiesPermissions(
  platformFrameAndCapabilitiesPermissions?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  if (
    platformFrameAndCapabilitiesPermissions == null ||
    typeof platformFrameAndCapabilitiesPermissions.use != `function`
  )
    return null;
  try {
    let use: Dynamic =
      await platformFrameAndCapabilitiesPermissions.use(`permissions`);
    return resolvePlatformFrameAndCapabilitiesValue5(use) ? use : null;
  } catch {
    return null;
  }
}

async function loadPlatformFrameAndCapabilitiesState(
  platformFrameAndCapabilitiesState?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let platformFrameAndCapabilitiesPermissions: Dynamic =
    await loadPlatformFrameAndCapabilitiesPermissions(
      platformFrameAndCapabilitiesState,
    );
  if (
    platformFrameAndCapabilitiesPermissions === null ||
    typeof platformFrameAndCapabilitiesPermissions.state != `function`
  )
    return null;
  try {
    return resolvePlatformFrameAndCapabilitiesValue4(
      await platformFrameAndCapabilitiesPermissions.state(options),
    );
  } catch {
    return null;
  }
}

async function loadPlatformFrameAndCapabilitiesGranted(
  platformFrameAndCapabilitiesGranted?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    (await loadPlatformFrameAndCapabilitiesState(
      platformFrameAndCapabilitiesGranted,
      options,
    )) === `granted`
  );
}

async function loadPlatformFrameAndCapabilitiesRequest(
  platformFrameAndCapabilitiesRequest?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let platformFrameAndCapabilitiesPermissions: Dynamic =
    await loadPlatformFrameAndCapabilitiesPermissions(
      platformFrameAndCapabilitiesRequest,
    );
  if (
    platformFrameAndCapabilitiesPermissions === null ||
    typeof platformFrameAndCapabilitiesPermissions.request != `function`
  )
    return null;
  try {
    let request: Dynamic =
      await platformFrameAndCapabilitiesPermissions.request([...options]);
    return resolvePlatformFrameAndCapabilitiesValue5(request)
      ? Object.fromEntries(
          options.map(
            (
              rolldownRImport2?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => [
              rolldownRImport2,
              resolvePlatformFrameAndCapabilitiesValue4(
                request[rolldownRImport2],
              ),
            ],
          ),
        )
      : null;
  } catch {
    return null;
  }
}

var PlatformFrameAndCapabilitiesGoogleDrive: string;

var PlatformFrameAndCapabilitiesState: string;

var platformFrameAndCapabilitiesGdriveUploadCreateFileValues: string[];

var PlatformFrameAndCapabilitiesCreateFile: string;

var PlatformFrameAndCapabilitiesApplicationVndOpenxmlformatsOfficedocumentWordprocessingmlDocument: string;

var PlatformFrameAndCapabilitiesState2: number;

var PlatformFrameAndCapabilitiesFloor: number;

var platformFrameAndCapabilitiesNeedsReauthServerNotConnectedSelectionRequiredServerNotFoundValues: string[];

var platformFrameAndCapabilitiesSet4: Dynamic;

var platformFrameAndCapabilitiesSet5: Dynamic;

var resolvePlatformFrameAndCapabilitiesValue6: (platformFrameAndCapabilitiesValue6: unknown) => platformFrameAndCapabilitiesValue6 is UnknownRecord;

var resolvePlatformFrameAndCapabilitiesCallTool: (platformFrameAndCapabilitiesCall: unknown) => platformFrameAndCapabilitiesCall is McpCapability;

async function loadPlatformFrameAndCapabilitiesAbsent(
  platformFrameAndCapabilitiesAbsent: unknown,
): Promise<McpMount> {
  const capabilities = platformFrameAndCapabilitiesAbsent as
    | CapabilityAccess
    | null
    | undefined;
  if (capabilities == null)
    return {
      at: `absent`,
    };
  if (typeof capabilities.use == `function`)
    try {
      let use = await capabilities.use(`mcp`);
      return resolvePlatformFrameAndCapabilitiesCallTool(use)
        ? {
            at: `mounted`,
            ns: use,
          }
        : {
            at: `withheld`,
          };
    } catch {
      return {
        at: `failed`,
      };
    }
  return resolvePlatformFrameAndCapabilitiesCallTool(capabilities.mcp)
    ? {
        at: `mounted`,
        ns: capabilities.mcp,
      }
    : {
        at: `absent`,
      };
}

async function loadPlatformFrameAndCapabilitiesMounted(
  platformFrameAndCapabilitiesMounted: unknown,
): Promise<McpCapability | null> {
  let platformFrameAndCapabilitiesAbsent =
    await loadPlatformFrameAndCapabilitiesAbsent(
      platformFrameAndCapabilitiesMounted,
    );
  return platformFrameAndCapabilitiesAbsent.at === `mounted`
    ? platformFrameAndCapabilitiesAbsent.ns
    : null;
}

async function loadPlatformFrameAndCapabilitiesWithheld(
  platformFrameAndCapabilities: unknown,
  options: (tools: unknown) => boolean,
): Promise<"withheld" | "unknown" | "unlisted" | "ok"> {
  let platformFrameAndCapabilitiesAbsent =
    await loadPlatformFrameAndCapabilitiesAbsent(platformFrameAndCapabilities);
  if (platformFrameAndCapabilitiesAbsent.at === `withheld`) return `withheld`;
  if (platformFrameAndCapabilitiesAbsent.at === `failed`) return `unknown`;
  if (
    platformFrameAndCapabilitiesAbsent.at === `absent` ||
    typeof platformFrameAndCapabilitiesAbsent.ns.listTools != `function`
  )
    return `unlisted`;
  try {
    return options(await platformFrameAndCapabilitiesAbsent.ns.listTools())
      ? `ok`
      : `unlisted`;
  } catch {
    return `unknown`;
  }
}

var PlatformFrameAndCapabilitiesOffered: Dynamic;

function filterPlatformFrameAndCapabilitiesOffered(
  filterPlatformFrameAndCapabilities?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    !resolvePlatformFrameAndCapabilitiesValue6(
      filterPlatformFrameAndCapabilities,
    ) ||
    !Array.isArray(filterPlatformFrameAndCapabilities.servers)
  )
    return PlatformFrameAndCapabilitiesOffered;
  let fileArgs = filterPlatformFrameAndCapabilities.fileArgs === true;
  let server: Dynamic = filterPlatformFrameAndCapabilities.servers.find(
    (server2?: Dynamic, ..._extraArguments: unknown[]) =>
      resolvePlatformFrameAndCapabilitiesValue6(server2) &&
      server2.server === `Google Drive`,
  );
  if (
    !resolvePlatformFrameAndCapabilitiesValue6(server) ||
    !Array.isArray(server.tools)
  )
    return {
      offered: false,
      tools: [],
      fileArgs: fileArgs,
    };
  if (server.tools.length === 0)
    return {
      offered: true,
      tools: [],
      fileArgs: fileArgs,
    };
  let uniqueItems: Dynamic = new (Set as Dynamic)(
    server.tools.map((tool?: Dynamic, ..._extraArguments: unknown[]) =>
      resolvePlatformFrameAndCapabilitiesValue6(tool) &&
      typeof tool.name == `string`
        ? tool.name
        : ``,
    ),
  );
  let tools = platformFrameAndCapabilitiesGdriveUploadCreateFileValues.filter(
    (
      platformFrameAndCapabilitiesGdriveUploadCreateFileValue?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      uniqueItems.has(platformFrameAndCapabilitiesGdriveUploadCreateFileValue),
  );
  return {
    offered: tools.length > 0,
    tools: tools,
    fileArgs: fileArgs,
  };
}

async function loadPlatformFrameAndCapabilitiesListTools(
  platformFrameAndCapabilitiesList?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  if (typeof platformFrameAndCapabilitiesList.listTools != `function`)
    return PlatformFrameAndCapabilitiesOffered;
  try {
    return filterPlatformFrameAndCapabilitiesOffered(
      await platformFrameAndCapabilitiesList.listTools(),
    );
  } catch {
    return PlatformFrameAndCapabilitiesOffered;
  }
}

async function loadPlatformFrameAndCapabilitiesFileArgs(
  platformFrameAndCapabilitiesFileArgs?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let platformFrameAndCapabilitiesMounted: Dynamic =
    await loadPlatformFrameAndCapabilitiesMounted(
      platformFrameAndCapabilitiesFileArgs,
    );
  return (
    platformFrameAndCapabilitiesMounted !== null &&
    (
      await loadPlatformFrameAndCapabilitiesListTools(
        platformFrameAndCapabilitiesMounted,
      )
    ).fileArgs
  );
}

var resolvePlatformFrameAndCapabilitiesOffered: Dynamic;

var resolvePlatformFrameAndCapabilitiesClosed: (platformFrameAndCapabilitiesClosed: number) => "closed" | "unasked";

var resolvePlatformFrameAndCapabilitiesGranted: (platformFrameAndCapabilitiesGranted: unknown, options: number) => "granted" | "declined" | "closed" | "unasked" | "unknown";

async function loadPlatformFrameAndCapabilitiesValue2(
  platformFrameAndCapabilitiesValue2?: Dynamic,
  options?: Dynamic,
  context: Dynamic = [],
  ..._extraArguments: unknown[]
) {
  return loadPlatformFrameAndCapabilitiesFilter(
    platformFrameAndCapabilitiesValue2,
    options,
    PlatformFrameAndCapabilitiesState,
    context,
  );
}

async function loadPlatformFrameAndCapabilitiesFilter(
  platformFrameAndCapabilitiesFilter?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies: Dynamic = [],
  ..._extraArguments: unknown[]
) {
  let options2: Dynamic = options();
  return resolvePlatformFrameAndCapabilitiesGranted(
    (
      await loadPlatformFrameAndCapabilitiesRequest(
        platformFrameAndCapabilitiesFilter,
        [
          ...dependencies.filter(
            (dependency?: Dynamic, ..._extraArguments: unknown[]) =>
              dependency !== context,
          ),
          context,
        ],
      )
    )?.[context] ?? null,
    options() - options2,
  );
}

var resolvePlatformFrameAndCapabilitiesValue7: (platformFrameAndCapabilitiesValue7?: Dynamic, ..._extraArguments: unknown[]) => boolean;

var resolvePlatformFrameAndCapabilitiesLastIndexOf: Dynamic;

var platformFrameAndCapabilitiesUrlPattern: RegExp;

var PlatformFrameAndCapabilitiesApplicationVndGoogleAppsDocument: string;

function resolvePlatformFrameAndCapabilitiesPayload(node: unknown): unknown {
  if (!resolvePlatformFrameAndCapabilitiesValue6(node)) return node;
  if (node.payload !== undefined) return node.payload;
  if (node.structuredContent !== undefined) return node.structuredContent;
  let contentItem = Array.isArray(node.content) ? node.content[0] : undefined;
  if (
    !resolvePlatformFrameAndCapabilitiesValue6(contentItem) ||
    typeof contentItem.text != `string`
  )
    return node;
  try {
    return JSON.parse(contentItem.text);
  } catch {
    return contentItem.text;
  }
}

function resolvePlatformFrameAndCapabilitiesPush(
  platformFrameAndCapabilitiesPush?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  let resolvePlatformFrameAndCapabilitiesValue62 = (
    platformFrameAndCapabilitiesPush2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      resolvePlatformFrameAndCapabilitiesValue6(
        platformFrameAndCapabilitiesPush2,
      ) &&
      !Array.isArray(platformFrameAndCapabilitiesPush2)
    ) {
      items.push(platformFrameAndCapabilitiesPush2);
    }
  };
  if (Array.isArray(platformFrameAndCapabilitiesPush)) {
    resolvePlatformFrameAndCapabilitiesValue62(
      platformFrameAndCapabilitiesPush[0],
    );
  } else {
    if (
      resolvePlatformFrameAndCapabilitiesValue6(
        platformFrameAndCapabilitiesPush,
      )
    ) {
      resolvePlatformFrameAndCapabilitiesValue62(
        platformFrameAndCapabilitiesPush,
      );
      resolvePlatformFrameAndCapabilitiesValue62(
        platformFrameAndCapabilitiesPush.file,
      );
      if (Array.isArray(platformFrameAndCapabilitiesPush.files)) {
        resolvePlatformFrameAndCapabilitiesValue62(
          platformFrameAndCapabilitiesPush.files[0],
        );
      }
      if (Array.isArray(platformFrameAndCapabilitiesPush.results)) {
        resolvePlatformFrameAndCapabilitiesValue62(
          platformFrameAndCapabilitiesPush.results[0],
        );
      }
    }
  }
  return items;
}

function resolvePlatformFrameAndCapabilitiesWebViewLink(
  node?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let platformFrameAndCapabilitiesPayload: Dynamic =
    resolvePlatformFrameAndCapabilitiesPayload(node);
  for (let resolvePlatformFrameAndCapabilitiesWebViewLinkResult of resolvePlatformFrameAndCapabilitiesPush(
    platformFrameAndCapabilitiesPayload,
  ) as Dynamic) {
    for (let resolvePlatformFrameAndCapabilitiesWebViewLinkResult2 of [
      `webViewLink`,
      `alternateLink`,
      `url`,
      `link`,
      `webUrl`,
      `uri`,
    ] as Dynamic) {
      let match =
        typeof resolvePlatformFrameAndCapabilitiesWebViewLinkResult[
          resolvePlatformFrameAndCapabilitiesWebViewLinkResult2
        ] == `string`
          ? resolvePlatformFrameAndCapabilitiesWebViewLinkResult[
              resolvePlatformFrameAndCapabilitiesWebViewLinkResult2
            ].match(platformFrameAndCapabilitiesUrlPattern)
          : null;
      if (match) return match[0];
    }
    let id: Dynamic =
      typeof resolvePlatformFrameAndCapabilitiesWebViewLinkResult.id == `string`
        ? resolvePlatformFrameAndCapabilitiesWebViewLinkResult.id
        : typeof resolvePlatformFrameAndCapabilitiesWebViewLinkResult.fileId ==
            `string`
          ? resolvePlatformFrameAndCapabilitiesWebViewLinkResult.fileId
          : null;
    if (id !== null && /^[\w-]{10,}$/u.test(id))
      return resolvePlatformFrameAndCapabilitiesWebViewLinkResult.mimeType ===
        PlatformFrameAndCapabilitiesApplicationVndGoogleAppsDocument
        ? `https://docs.google.com/document/d/${id}/edit`
        : `https://drive.google.com/file/d/${id}/view`;
  }
  let items: Dynamic = [];
  if (typeof platformFrameAndCapabilitiesPayload == `string`) {
    items.push(platformFrameAndCapabilitiesPayload);
  }
  if (
    resolvePlatformFrameAndCapabilitiesValue6(node) &&
    Array.isArray(node.content)
  )
    for (let resolvePlatformFrameAndCapabilitiesWebViewLinkResult of node.content as Dynamic)
      if (
        resolvePlatformFrameAndCapabilitiesValue6(
          resolvePlatformFrameAndCapabilitiesWebViewLinkResult,
        ) &&
        typeof resolvePlatformFrameAndCapabilitiesWebViewLinkResult.text ==
          `string`
      ) {
        items.push(resolvePlatformFrameAndCapabilitiesWebViewLinkResult.text);
      }
  for (let resolvePlatformFrameAndCapabilitiesWebViewLinkResult of items as Dynamic) {
    let match: Dynamic =
      resolvePlatformFrameAndCapabilitiesWebViewLinkResult.match(
        platformFrameAndCapabilitiesUrlPattern,
      );
    if (match) return match[0];
  }
}

function resolvePlatformFrameAndCapabilitiesMessage(
  node?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    resolvePlatformFrameAndCapabilitiesValue6(node) &&
    node.isError === true
  ) {
    let content: Dynamic = Array.isArray(node.content)
      ? node.content.find(
          (content2?: Dynamic, ..._extraArguments: unknown[]) =>
            resolvePlatformFrameAndCapabilitiesValue6(content2) &&
            typeof content2.text == `string`,
        )
      : undefined;
    return resolvePlatformFrameAndCapabilitiesValue6(content) &&
      typeof content.text == `string` &&
      content.text !== ``
      ? {
          message: content.text,
          shape: `is_error`,
        }
      : {
          shape: `is_error`,
        };
  }
  let platformFrameAndCapabilitiesPush: Dynamic =
    resolvePlatformFrameAndCapabilitiesPush(
      resolvePlatformFrameAndCapabilitiesPayload(node),
    ).find(
      (
        platformFrameAndCapabilitiesPush2?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        typeof platformFrameAndCapabilitiesPush2.error == `string` &&
        platformFrameAndCapabilitiesPush2.error !== `` &&
        typeof platformFrameAndCapabilitiesPush2.fileId != `string` &&
        typeof platformFrameAndCapabilitiesPush2.id != `string`,
    );
  return platformFrameAndCapabilitiesPush === undefined
    ? null
    : {
        message: platformFrameAndCapabilitiesPush.error,
        shape: `per_file`,
      };
}

var platformFrameAndCapabilitiesPattern3: RegExp;

var PlatformFrameAndCapabilitiesToolMissing: (string | RegExp)[][];

var platformFrameAndCapabilitiesValue2048: number;

function resolvePlatformFrameAndCapabilitiesNoWords(
  platformFrameAndCapabilitiesNoWords?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    platformFrameAndCapabilitiesNoWords === undefined ||
    platformFrameAndCapabilitiesNoWords === ``
  )
    return `no_words`;
  let platformFrameAndCapabilitiesNoWordsSlice: Dynamic =
    platformFrameAndCapabilitiesNoWords.slice(
      0,
      platformFrameAndCapabilitiesValue2048,
    );
  for (let [
    resolvePlatformFrameAndCapabilitiesNoWordsResult,
    resolvePlatformFrameAndCapabilitiesNoWordsResult2,
  ] of PlatformFrameAndCapabilitiesToolMissing as Dynamic)
    if (
      resolvePlatformFrameAndCapabilitiesNoWordsResult.test(
        platformFrameAndCapabilitiesNoWordsSlice,
      )
    )
      return resolvePlatformFrameAndCapabilitiesNoWordsResult2;
  return `unmatched`;
}

var platformFrameAndCapabilitiesPattern4: RegExp;

var resolvePlatformFrameAndCapabilitiesBlockedByPolicy: Dynamic;

var platformFrameAndCapabilitiesPattern5: RegExp;

var resolvePlatformFrameAndCapabilitiesCapabilityDisabled: Dynamic;

function resolvePlatformFrameAndCapabilitiesGdriveUpload(
  error?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return error.tool === `gdrive_upload`
    ? resolvePlatformFrameAndCapabilitiesCapabilityDisabled(error)
    : error.tool === `create_file`
      ? platformFrameAndCapabilitiesSet5.has(error.code) ||
        error.code === `tool_error`
      : false;
}

function resolvePlatformFrameAndCapabilitiesTitle(
  platformFrameAndCapabilitiesTitle?: Dynamic,
  options?: Dynamic,
  base64Content?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return platformFrameAndCapabilitiesTitle === `create_file`
    ? {
        title: resolvePlatformFrameAndCapabilitiesLastIndexOf(options.filename),
        base64Content: base64Content,
        contentMimeType: options.mime,
      }
    : {
        files: [
          {
            fileName: options.filename,
            content: base64Content,
            mimeType: options.mime,
          },
        ],
      };
}

var resolvePlatformFrameAndCapabilitiesFile: Dynamic;

var resolvePlatformFrameAndCapabilitiesUpstreamError: Dynamic;

async function loadPlatformFrameAndCapabilitiesCode2(
  platformFrameAndCapabilitiesCode2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let platformFrameAndCapabilitiesMounted: Dynamic =
    await loadPlatformFrameAndCapabilitiesMounted(
      platformFrameAndCapabilitiesCode2,
    );
  if (
    platformFrameAndCapabilitiesMounted === null ||
    !resolvePlatformFrameAndCapabilitiesCallTool2(
      platformFrameAndCapabilitiesMounted,
    )
  )
    return {
      ok: false,
      code: `unavailable`,
    };
  if (
    !resolvePlatformFrameAndCapabilitiesValue7(options.data.length) &&
    options.fileArgs !== true
  )
    return {
      ok: false,
      code: `too_large_for_call`,
    };
  let platformFrameAndCapabilitiesListTools: Dynamic =
    await loadPlatformFrameAndCapabilitiesListTools(
      platformFrameAndCapabilitiesMounted,
    );
  if (!platformFrameAndCapabilitiesListTools.offered)
    return {
      ok: false,
      code: `no_drive_tool`,
    };
  let platformFrameAndCapabilitiesFile: Dynamic =
    resolvePlatformFrameAndCapabilitiesFile(options);
  let toolItem: Dynamic =
    platformFrameAndCapabilitiesListTools.tools[0] ??
    PlatformFrameAndCapabilitiesCreateFile;
  let platformFrameAndCapabilitiesCache: Dynamic =
    await loadPlatformFrameAndCapabilitiesCache(
      platformFrameAndCapabilitiesCode2,
      platformFrameAndCapabilitiesMounted,
      toolItem,
      options,
      platformFrameAndCapabilitiesFile,
      context,
    );
  return !platformFrameAndCapabilitiesCache.ok &&
    toolItem === `gdrive_upload` &&
    resolvePlatformFrameAndCapabilitiesBlockedByPolicy(
      platformFrameAndCapabilitiesCache,
    ) &&
    platformFrameAndCapabilitiesListTools.tools.includes(`create_file`) &&
    typeof platformFrameAndCapabilitiesFile == `string`
    ? loadPlatformFrameAndCapabilitiesCache(
        platformFrameAndCapabilitiesCode2,
        platformFrameAndCapabilitiesMounted,
        `create_file`,
        options,
        platformFrameAndCapabilitiesFile,
        context,
      )
    : platformFrameAndCapabilitiesCache;
}

var platformFrameAndCapabilitiesSet6: Dynamic;

var resolvePlatformFrameAndCapabilitiesCallTool2: (platformFrameAndCapabilitiesCall?: Dynamic, ..._extraArguments: unknown[]) => boolean;

async function loadPlatformFrameAndCapabilitiesCache(
  platformFrameAndCapabilitiesCache?: Dynamic,
  options?: Dynamic,
  tool?: Dynamic,
  dependencies?: Dynamic,
  argument?: Dynamic,
  argument2?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let loadPlatformFrameAndCapabilitiesCacheResult: Dynamic;
  let argument3: Dynamic = argument2();
  try {
    loadPlatformFrameAndCapabilitiesCacheResult = await options.callTool(
      PlatformFrameAndCapabilitiesGoogleDrive,
      tool,
      resolvePlatformFrameAndCapabilitiesTitle(tool, dependencies, argument),
      {
        cache: false,
      },
    );
  } catch (error: Dynamic) {
    let difference: Dynamic = argument2() - argument3;
    let code =
      resolvePlatformFrameAndCapabilitiesValue6(error) &&
      typeof error.code == `string`
        ? error.code
        : ``;
    let record2: Dynamic = {
      tool: tool,
      ...(resolvePlatformFrameAndCapabilitiesValue6(error) &&
      error.retryable === true
        ? {
            retryable: true,
          }
        : {}),
      ...(resolvePlatformFrameAndCapabilitiesValue6(error) &&
      typeof error.retryAfterMs == `number`
        ? {
            retryAfterMs: error.retryAfterMs,
          }
        : {}),
    };
    if (
      resolvePlatformFrameAndCapabilitiesUpstreamError(error) &&
      (await loadPlatformFrameAndCapabilitiesState(
        platformFrameAndCapabilitiesCache,
        PlatformFrameAndCapabilitiesState,
      )) !== `granted`
    )
      return {
        ok: false,
        code:
          resolvePlatformFrameAndCapabilitiesClosed(difference) === `closed`
            ? `consent_closed`
            : `consent_unasked`,
        ...record2,
      };
    let message =
      platformFrameAndCapabilitiesSet6.has(code) &&
      resolvePlatformFrameAndCapabilitiesValue6(error) &&
      typeof error.message == `string`
        ? error.message
        : undefined;
    let hasCode: Dynamic = platformFrameAndCapabilitiesSet4.has(code);
    return {
      ok: false,
      code: hasCode ? code : `upstream_error`,
      ...record2,
      ...(message === undefined
        ? {}
        : {
            message: message,
          }),
      ...(code === `tool_error`
        ? {
            failClass: resolvePlatformFrameAndCapabilitiesNoWords(message),
            shape: platformFrameAndCapabilitiesPattern4.test(message ?? ``)
              ? `jsonrpc`
              : `rejected`,
          }
        : {}),
      ...(hasCode
        ? {}
        : {
            unlisted: true,
          }),
    };
  }
  let platformFrameAndCapabilitiesMessage: Dynamic =
    resolvePlatformFrameAndCapabilitiesMessage(
      loadPlatformFrameAndCapabilitiesCacheResult,
    );
  if (platformFrameAndCapabilitiesMessage !== null)
    return {
      ok: false,
      code: `tool_error`,
      tool: tool,
      ...(platformFrameAndCapabilitiesMessage.message === undefined
        ? {}
        : {
            message: platformFrameAndCapabilitiesMessage.message,
          }),
      failClass: resolvePlatformFrameAndCapabilitiesNoWords(
        platformFrameAndCapabilitiesMessage.message,
      ),
      shape: platformFrameAndCapabilitiesMessage.shape,
    };
  let url: Dynamic = resolvePlatformFrameAndCapabilitiesWebViewLink(
    loadPlatformFrameAndCapabilitiesCacheResult,
  );
  return {
    ok: true,
    tool: tool,
    ...(url === undefined
      ? {}
      : {
          url: url,
        }),
  };
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializePlatformFrameAndCapabilitiesStep1(): void {
  (PlatformFrameAndCapabilitiesBongoFrameMount = `bongo.frame-mount`);
  (platformFrameAndCapabilitiesPattern = /^[A-Za-z0-9_-]{8,64}$/);
  (resolvePlatformFrameAndCapabilitiesValue = (
    platformFrameAndCapabilitiesValue: unknown,
  ): platformFrameAndCapabilitiesValue is UnknownRecord =>
    typeof platformFrameAndCapabilitiesValue == `object` &&
    !!platformFrameAndCapabilitiesValue &&
    !Array.isArray(platformFrameAndCapabilitiesValue));
  (platformFrameAndCapabilitiesSet = new Set([
    `REVOKED`,
    `DENIED`,
  ]));
  (resolvePlatformFrameAndCapabilitiesValue2 = (
    platformFrameAndCapabilitiesValue2: unknown,
  ): platformFrameAndCapabilitiesValue2 is UnknownRecord =>
    typeof platformFrameAndCapabilitiesValue2 == `object` &&
    !!platformFrameAndCapabilitiesValue2);
  (platformFrameAndCapabilitiesSet2 = new Set([
    `rejected_extension`,
    `extension_not_enabled`,
    `too_large`,
    `declined`,
    `rate_limited`,
    `bad_request`,
    `request_unknown`,
    `unavailable`,
    `not_granted`,
    `capability_disabled`,
    `capability_removed`,
    `transform_error`,
  ]));
  (resolvePlatformFrameAndCapabilitiesValue3 = (
    platformFrameAndCapabilitiesValue3: unknown,
  ): platformFrameAndCapabilitiesValue3 is UnknownRecord =>
    typeof platformFrameAndCapabilitiesValue3 == `object` &&
    !!platformFrameAndCapabilitiesValue3);
  (resolvePlatformFrameAndCapabilitiesSave = (
    platformFrameAndCapabilitiesSave: unknown,
  ): platformFrameAndCapabilitiesSave is DownloadsCapability =>
    resolvePlatformFrameAndCapabilitiesValue3(platformFrameAndCapabilitiesSave) &&
    typeof platformFrameAndCapabilitiesSave.save == `function`);
  (platformFrameAndCapabilitiesPattern2 = /\.(xlsx|xls|pptx|docx|png|jpg|jpeg|gif|webp|pdf|zip|woff2?)$/i);
  (resolvePlatformFrameAndCapabilitiesTest = (
    platformFrameAndCapabilitiesTest?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    /^runs\/([a-f0-9-]{36}|r-[a-z0-9]+-[a-z0-9]{1,32})(\/|$)/.test(
      platformFrameAndCapabilitiesTest,
    ));
  (resolvePlatformFrameAndCapabilitiesFrom = (
    platformFrameAndCapabilities?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    Uint8Array.from(
      atob(platformFrameAndCapabilities),
      (
        platformFrameAndCapabilities2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => platformFrameAndCapabilities2.charCodeAt(0),
    ));
  (resolvePlatformFrameAndCapabilitiesFromCharCode = (
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let label: Dynamic = ``;
    for (let count: Dynamic = 0; count < items.length; count += 32768)
      label += (String.fromCharCode as Dynamic)(
        ...items.subarray(count, count + 32768),
      );
    return btoa(label);
  });
  (platformFrameAndCapabilitiesValue5000 = 5e3);
  (platformFrameAndCapabilitiesSet3 = new (Set as Dynamic)([
    `granted`,
    `prompt`,
    `denied`,
    `unavailable`,
  ]));
  (resolvePlatformFrameAndCapabilitiesValue4 = (
    platformFrameAndCapabilitiesValue4?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof platformFrameAndCapabilitiesValue4 == `string` &&
    platformFrameAndCapabilitiesSet3.has(platformFrameAndCapabilitiesValue4)
      ? platformFrameAndCapabilitiesValue4
      : null);
  (resolvePlatformFrameAndCapabilitiesValue5 = (
    platformFrameAndCapabilitiesValue5?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof platformFrameAndCapabilitiesValue5 == `object` &&
    !!platformFrameAndCapabilitiesValue5);
  (PlatformFrameAndCapabilitiesGoogleDrive = `Google Drive`);
  (PlatformFrameAndCapabilitiesState = `mcp:${PlatformFrameAndCapabilitiesGoogleDrive}`);
  (platformFrameAndCapabilitiesGdriveUploadCreateFileValues = [
    `gdrive_upload`,
    `create_file`,
  ]);
  (PlatformFrameAndCapabilitiesCreateFile = `create_file`);
  (PlatformFrameAndCapabilitiesApplicationVndOpenxmlformatsOfficedocumentWordprocessingmlDocument = `application/vnd.openxmlformats-officedocument.wordprocessingml.document`);
  (PlatformFrameAndCapabilitiesState2 = 1024 * 1024 - 8 * 1024);
  (PlatformFrameAndCapabilitiesFloor = Math.floor(PlatformFrameAndCapabilitiesState2 / 4) * 3);
  (platformFrameAndCapabilitiesNeedsReauthServerNotConnectedSelectionRequiredServerNotFoundValues = [
      `needs_reauth`,
      `server_not_connected`,
      `selection_required`,
      `server_not_found`,
      `server_unavailable`,
      `not_in_manifest`,
      `blocked_by_policy`,
      `approval_required`,
      `tool_error`,
      `bad_request`,
      `cancelled`,
      `rate_limited`,
      `upstream_error`,
      `not_granted`,
      `capability_disabled`,
      `capability_removed`,
      `transform_error`,
    ]);
  (platformFrameAndCapabilitiesSet4 = new (Set as Dynamic)(
    platformFrameAndCapabilitiesNeedsReauthServerNotConnectedSelectionRequiredServerNotFoundValues,
  ));
  (platformFrameAndCapabilitiesSet5 = new (Set as Dynamic)([
    `capability_disabled`,
    `bad_request`,
    `blocked_by_policy`,
    `server_unavailable`,
    `upstream_error`,
  ]));
  (resolvePlatformFrameAndCapabilitiesValue6 = (
    platformFrameAndCapabilitiesValue6: unknown,
  ): platformFrameAndCapabilitiesValue6 is UnknownRecord =>
    typeof platformFrameAndCapabilitiesValue6 == `object` &&
    !!platformFrameAndCapabilitiesValue6);
  (resolvePlatformFrameAndCapabilitiesCallTool = (
    platformFrameAndCapabilitiesCall: unknown,
  ): platformFrameAndCapabilitiesCall is McpCapability =>
    resolvePlatformFrameAndCapabilitiesValue6(platformFrameAndCapabilitiesCall) &&
    typeof platformFrameAndCapabilitiesCall.callTool == `function`);
  (PlatformFrameAndCapabilitiesOffered = {
    offered: false,
    tools: [],
    fileArgs: false,
  });
  (resolvePlatformFrameAndCapabilitiesOffered = (
    platformFrameAndCapabilities?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    loadPlatformFrameAndCapabilitiesWithheld(
      platformFrameAndCapabilities,
      (
        platformFrameAndCapabilities2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        filterPlatformFrameAndCapabilitiesOffered(platformFrameAndCapabilities2)
          .offered,
    ));
  (resolvePlatformFrameAndCapabilitiesClosed = (
    platformFrameAndCapabilitiesClosed: number,
  ): "closed" | "unasked" =>
    platformFrameAndCapabilitiesClosed >= 500 ? `closed` : `unasked`);
  (resolvePlatformFrameAndCapabilitiesGranted = (
    platformFrameAndCapabilitiesGranted: unknown,
    options: number,
  ): "granted" | "declined" | "closed" | "unasked" | "unknown" => {
    switch (platformFrameAndCapabilitiesGranted) {
      case `granted`:
        return `granted`;
      case `denied`:
        return `declined`;
      case `prompt`:
        return resolvePlatformFrameAndCapabilitiesClosed(options);
      default:
        return `unknown`;
    }
  });
  (resolvePlatformFrameAndCapabilitiesValue7 = (
    platformFrameAndCapabilitiesValue7?: Dynamic,
    ..._extraArguments: unknown[]
  ) => platformFrameAndCapabilitiesValue7 <= PlatformFrameAndCapabilitiesFloor);
  (resolvePlatformFrameAndCapabilitiesLastIndexOf = (
    platformFrameAndCapabilitiesLastIndex?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let lastIndexOf: Dynamic =
      platformFrameAndCapabilitiesLastIndex.lastIndexOf(`.`);
    return lastIndexOf > 0
      ? platformFrameAndCapabilitiesLastIndex.slice(0, lastIndexOf)
      : platformFrameAndCapabilitiesLastIndex;
  });
  (platformFrameAndCapabilitiesUrlPattern = /https:\/\/(?:docs|drive)\.google\.com\/[^\s"'<>)\]]*[^\s"'<>)\].,;:!?]/u);
  (PlatformFrameAndCapabilitiesApplicationVndGoogleAppsDocument = `application/vnd.google-apps.document`);
  (platformFrameAndCapabilitiesPattern3 = /^(?:(?:tool returned json-rpc error -?\d+|mcp error -?\d+|error): )*(?:unknown tool\b|tool \S+ not found)/iu);
  (PlatformFrameAndCapabilitiesToolMissing = [
    [platformFrameAndCapabilitiesPattern3, `tool_missing`],
    [
      /insufficientfilepermissions|appnotauthorizedtofile|has not granted the app|shared drive/iu,
      `forbidden`,
    ],
    [
      /^(?=.*insufficient)(?=.*(?:permission|scope))|access_token_scope_insufficient/isu,
      `insufficient_permission`,
    ],
    [/domain administrators have disabled|domainpolicy/iu, `admin_disabled`],
    [
      /session is invalid|invalid(?: authentication)? credentials|invalid[ _]grant|expired or revoked|login required|unauthori[sz]ed|unauthenticated/iu,
      `unauthenticated`,
    ],
    [
      /rate ?limit|too many requests|quota metric|quota group|per user per|daily ?limit/iu,
      `rate_limited`,
    ],
    [/storage ?quota|drive (?:storage )?(?:is )?full/iu, `quota_full`],
    [/quota/iu, `quota_other`],
    [
      /does not have (?:sufficient )?permissions?|permission[ _]denied|\bforbidden\b/iu,
      `forbidden`,
    ],
    [/too large|exceeds the .*limit/isu, `too_large`],
    [
      /conversion.*not supported|conversionunsupported/isu,
      `conversion_unsupported`,
    ],
    [
      /econn(?:reset|refused|aborted)|socket hang up|\bepipe\b|enotfound|eai_again|fetch failed|bad gateway|\bunavailable\b/iu,
      `network`,
    ],
    [/\btimed? ?out\b|etimedout|deadline/iu, `timeout`],
    [/internal(?: server)? ?error|backend ?error|try again/iu, `internal`],
    [
      /bad ?request|\binvalid\b|malformed|extension doesn.t match|not supported|unsupported/iu,
      `bad_request`,
    ],
  ]);
  (platformFrameAndCapabilitiesValue2048 = 2048);
  (platformFrameAndCapabilitiesPattern4 = /^tool returned json-rpc error /iu);
  (resolvePlatformFrameAndCapabilitiesBlockedByPolicy = (
    error?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    error.code === `blocked_by_policy` ||
    (error.code === `tool_error` &&
      platformFrameAndCapabilitiesPattern3.test(error.message ?? ``)));
  (platformFrameAndCapabilitiesPattern5 = /^(?:file upload|malformed upload|connector scope changed|connector access isn)/iu);
  (resolvePlatformFrameAndCapabilitiesCapabilityDisabled = (
    error?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    error.code === `capability_disabled` ||
    error.code === `bad_request` ||
    resolvePlatformFrameAndCapabilitiesBlockedByPolicy(error) ||
    ((error.code === `server_unavailable` || error.code === `upstream_error`) &&
      platformFrameAndCapabilitiesPattern5.test(error.message ?? ``)));
  (resolvePlatformFrameAndCapabilitiesFile = (
    platformFrameAndCapabilitiesFile?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolvePlatformFrameAndCapabilitiesValue7(
      platformFrameAndCapabilitiesFile.data.length,
    )
      ? resolvePlatformFrameAndCapabilitiesFromCharCode(
          platformFrameAndCapabilitiesFile.data,
        )
      : {
          $file: {
            data: platformFrameAndCapabilitiesFile.data,
            name: platformFrameAndCapabilitiesFile.filename,
            type: platformFrameAndCapabilitiesFile.mime,
          },
        });
  (resolvePlatformFrameAndCapabilitiesUpstreamError = (
    error?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    resolvePlatformFrameAndCapabilitiesValue6(error) &&
    error.code === `upstream_error` &&
    error.retryable === true &&
    typeof error.retryAfterMs == `number`);
  (platformFrameAndCapabilitiesSet6 = new (Set as Dynamic)([
    `tool_error`,
    `server_unavailable`,
    `upstream_error`,
  ]));
  (resolvePlatformFrameAndCapabilitiesCallTool2 = (
    platformFrameAndCapabilitiesCall?: Dynamic,
    ..._extraArguments: unknown[]
  ) => typeof platformFrameAndCapabilitiesCall.callTool == `function`);
}

export {
  PlatformFrameAndCapabilitiesApplicationVndOpenxmlformatsOfficedocumentWordprocessingmlDocument,
  PlatformFrameAndCapabilitiesFloor,
  PlatformFrameAndCapabilitiesState2,
  collectPlatformFrameAndCapabilitiesFilesWithMatches,
  getPlatformFrameAndCapabilitiesPattern,
  isPlatformFrameAndCapabilitiesNavigation,
  isPlatformFrameAndCapabilitiesTest,
  isPlatformFrameAndCapabilitiesWindow,
  loadPlatformFrameAndCapabilitiesAbsent,
  loadPlatformFrameAndCapabilitiesCall,
  loadPlatformFrameAndCapabilitiesCode,
  loadPlatformFrameAndCapabilitiesCode2,
  loadPlatformFrameAndCapabilitiesDownloads,
  loadPlatformFrameAndCapabilitiesFileArgs,
  loadPlatformFrameAndCapabilitiesFilter,
  loadPlatformFrameAndCapabilitiesGranted,
  loadPlatformFrameAndCapabilitiesMounted,
  loadPlatformFrameAndCapabilitiesOptions,
  loadPlatformFrameAndCapabilitiesParent,
  loadPlatformFrameAndCapabilitiesState,
  loadPlatformFrameAndCapabilitiesValue,
  loadPlatformFrameAndCapabilitiesValue2,
  loadPlatformFrameAndCapabilitiesVerdict,
  loadPlatformFrameAndCapabilitiesWithheld,
  platformFrameAndCapabilitiesNeedsReauthServerNotConnectedSelectionRequiredServerNotFoundValues,
  resolvePlatformFrameAndCapabilitiesCallTool,
  resolvePlatformFrameAndCapabilitiesClosed,
  resolvePlatformFrameAndCapabilitiesFrom,
  resolvePlatformFrameAndCapabilitiesFromCharCode,
  resolvePlatformFrameAndCapabilitiesGdriveUpload,
  resolvePlatformFrameAndCapabilitiesGranted,
  resolvePlatformFrameAndCapabilitiesNext,
  resolvePlatformFrameAndCapabilitiesOffered,
  resolvePlatformFrameAndCapabilitiesPayload,
  resolvePlatformFrameAndCapabilitiesReloaded,
  resolvePlatformFrameAndCapabilitiesSave,
  resolvePlatformFrameAndCapabilitiesSplit,
  resolvePlatformFrameAndCapabilitiesTest,
  resolvePlatformFrameAndCapabilitiesUpstreamError,
  resolvePlatformFrameAndCapabilitiesValue,
  resolvePlatformFrameAndCapabilitiesValue2,
  resolvePlatformFrameAndCapabilitiesValue3,
  resolvePlatformFrameAndCapabilitiesValue6,
  resolvePlatformFrameAndCapabilitiesValue7,
  updatePlatformFrameAndCapabilitiesCbs,
};
