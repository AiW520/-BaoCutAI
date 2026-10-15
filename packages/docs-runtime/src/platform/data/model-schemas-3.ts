import type { FontAsset } from "../../fonts/contracts";
/** BaoCut: data model schemas from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  loadKatexFontCss,
  createLiveModuleNamespace,
} from "../dependencies";
import {
  PlatformSessionAndSourcesState3,
  PlatformSessionAndSourcesStyles6,
  getPlatformSessionAndSourcesStart,
  platformSessionAndSourcesSet2,
  resolvePlatformSessionAndSourcesAvailable,
  resolvePlatformSessionAndSourcesBid,
  resolvePlatformSessionAndSourcesClaude,
  resolvePlatformSessionAndSourcesCode,
  resolvePlatformSessionAndSourcesConsentRequired,
  resolvePlatformSessionAndSourcesExec,
  resolvePlatformSessionAndSourcesFailed,
  resolvePlatformSessionAndSourcesFailed2,
} from "../services/session-and-sources-1";
import {
  editorAnchorsAndMentionsPattern2,
  resolveEditorAnchorsAndMentionsNode,
} from "../../prose-editor/platform/anchors-and-mentions-1";
import {
  resolvePlatformFrameAndCapabilitiesFrom,
  resolvePlatformFrameAndCapabilitiesFromCharCode,
} from "../services/frame-and-capabilities";
import {
  isObservabilityBrowserAndOperationEventsIncludes,
  isObservabilityBrowserAndOperationEventsIncludes2,
  resolveObservabilityBrowserAndOperationEventsSome,
} from "../observability/browser-and-operation-events-2";
import {
  PlatformApiAndAuthBONGOBASE,
} from "../observability/browser-and-operation-events-4";
import {
  resolvePlatformApiAndAuthStartsWith,
} from "../services/api-and-auth-1";
import {
  resolvePlatformApiAndAuthValue33,
} from "../services/api-and-auth-5";
import {
  useWorkbookStore,
} from "./model-schemas-1";
import {
  parseLineParam,
  parseTarget,
  resolveDataModelSchemasValue,
  useContainerStore,
} from "./model-schemas-2";

function resolveDataModelSchemasSourceProject(
  dataModelSchemasSourceProject?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let params: Dynamic = dataModelSchemasSourceProject.params ?? {};
  return typeof dataModelSchemasSourceProject.source == `string`
    ? options.runner === `project`
      ? {
          sourceProject: options.sourceProject,
          sourceBranch: options.sourceBranch,
          ...params,
        }
      : options.runner === `bigquery` &&
          !dataModelSchemasSourceProject.source.startsWith(`bigquery:`)
        ? {
            queryFile: dataModelSchemasSourceProject.source,
            ...params,
          }
        : options.runner === `url` &&
            /^https?:\/\//i.test(dataModelSchemasSourceProject.source)
          ? {
              url: dataModelSchemasSourceProject.source,
              ...params,
            }
          : params
    : params;
}

function resolveDataModelSchemasRunner(
  dataModelSchemasRunner?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (resolveDataModelSchemasValue(dataModelSchemasRunner))
    return {
      runner: dataModelSchemasRunner.slug,
      tier: `snapshotted`,
    };
  if (dataModelSchemasRunner.startsWith(`feed:`))
    throw Error(
      `feed: source "${dataModelSchemasRunner}" — feeds cannot reference other feeds (DL-X6)`,
    );
  if (dataModelSchemasRunner.startsWith(`project:`)) {
    let dataModelSchemasRunnerSlice: Dynamic = dataModelSchemasRunner.slice(8);
    let dataModelSchemasRunnerSliceIndex: Dynamic =
      dataModelSchemasRunnerSlice.indexOf(`@`);
    return {
      runner: `project`,
      tier: `referenced`,
      sourceProject:
        dataModelSchemasRunnerSliceIndex < 0
          ? dataModelSchemasRunnerSlice
          : dataModelSchemasRunnerSlice.slice(
              0,
              dataModelSchemasRunnerSliceIndex,
            ),
      sourceBranch:
        dataModelSchemasRunnerSliceIndex < 0
          ? `main`
          : dataModelSchemasRunnerSlice.slice(
              dataModelSchemasRunnerSliceIndex + 1,
            ),
    };
  }
  if (/\.sql$/i.test(dataModelSchemasRunner))
    return {
      runner: `bigquery`,
      tier: `snapshotted`,
    };
  if (/^https?:\/\//i.test(dataModelSchemasRunner))
    return {
      runner: `url`,
      tier: `snapshotted`,
    };
  let match = /^([A-Za-z][\w-]+):/.exec(dataModelSchemasRunner);
  if (match)
    return {
      runner: match[1] === `gsheets` ? `url` : match[1],
      tier: `snapshotted`,
    };
  throw Error(`feed: unknown source "${dataModelSchemasRunner}"`);
}

var DataModelSchemasArtifactTypeFontsAnthropiconsVariableE7f7e9ca44846912Woff2: string;

// BaoCut: 不内置 Anthropic 品牌字体（Anthropic Sans / Serif / Mono 各两份，原版从 ./artifact-type/fonts/ 取）。
// 这份清单与图标字体一起用 Promise.all 取，缺一份就整组作废、编辑器 iframe 连图标字体也没有，所以清单留空：
// 只取图标字体，正文退回 docs.css 字体栈里的系统字体（--font-sans 等以 ui-sans-serif、system-ui 兜底）。
var DataModelSchemasFamily: FontAsset[];

var DataModelSchemasState2: string;

var DataModelSchemasFamily2: {
    family: string;
    path: string;
    format: string;
    desc: string;
};

var DataModelSchemasState3: FontAsset[];

var DataModelSchemasStyles: string;

var DataModelSchemasState4: FontAsset[];

var resolveDataModelSchemasDesc: Dynamic;

var resolveDataModelSchemasNormal: (dataModelSchemasNormal?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolveDataModelSchemasNormal2: (dataModelSchemasNormal2?: Dynamic, ..._extraArguments: unknown[]) => string;

var collectDataModelSchemasJoin: Dynamic;

var DataModelSchemasEvery: Dynamic;

var resolveDataModelSchemasStartsWith: Dynamic;

var DataModelSchemasEvery2: Dynamic;

var resolveDataModelSchemasEvery: Dynamic;

function resolveDataModelSchemasFontWeight(
  dataModelSchemasFontWeight?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let record2: Dynamic = {
    "font-weight": `weight`,
    "font-style": `style`,
    "font-display": `display`,
    "font-stretch": `stretch`,
    "unicode-range": `unicodeRange`,
  };
  let record3: Dynamic = {};
  for (let resolveDataModelSchemasFontWeightResult of resolveDataModelSchemasDesc(
    dataModelSchemasFontWeight,
  ).split(`;`) as Dynamic) {
    let resolveDataModelSchemasFontWeightResultIndex: Dynamic =
      resolveDataModelSchemasFontWeightResult.indexOf(`:`);
    if (resolveDataModelSchemasFontWeightResultIndex < 0) continue;
    let recordItem: Dynamic =
      record2[
        resolveDataModelSchemasFontWeightResult
          .slice(0, resolveDataModelSchemasFontWeightResultIndex)
          .trim()
      ];
    let trimmedResolveDataModelSchemasFontWeightResultSlice: Dynamic =
      resolveDataModelSchemasFontWeightResult
        .slice(resolveDataModelSchemasFontWeightResultIndex + 1)
        .trim();
    if (
      recordItem !== undefined &&
      trimmedResolveDataModelSchemasFontWeightResultSlice !== ``
    ) {
      record3[recordItem] = trimmedResolveDataModelSchemasFontWeightResultSlice;
    }
  }
  return record3;
}

var DataModelSchemasState5: Dynamic;

var DataModelSchemasState6: Dynamic;

var resolveDataModelSchemasReplace: Dynamic;

var dataModelSchemasState: Dynamic;

function loadDataModelSchemasBuf(..._extraArguments: unknown[]): Dynamic {
  return DataModelSchemasEvery
    ? (dataModelSchemasState ??= Promise.resolve([]))
    : (dataModelSchemasState ??= Promise.all(
        DataModelSchemasFamily.map(
          async (
            DataModelSchemasFamily3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Promise<Dynamic> => {
            let response = await fetch(DataModelSchemasFamily3.path);
            if (!response.ok)
              throw Error(
                `${DataModelSchemasFamily3.path}: ${response.status}`,
              );
            return {
              ...DataModelSchemasFamily3,
              buf: await response.arrayBuffer(),
            };
          },
        ),
      ).catch(
        (error?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
          (dataModelSchemasState = undefined),
          console.warn(
            `[fontBlobs] fetch failed, falling back to system fonts.`,
            error,
          ),
          []
        ),
      ));
}

async function loadDataModelSchemasFamily(
  dataModelSchemasFamily?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  return collectDataModelSchemasJoin(
    await Promise.all(
      dataModelSchemasFamily.map(
        async (
          rolldownNImport2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Promise<Dynamic> => ({
          family: rolldownNImport2.family,
          path: await updateDataModelSchemasCatch(rolldownNImport2.path),
          style: rolldownNImport2.style,
          format: rolldownNImport2.format,
          desc: rolldownNImport2.desc,
        }),
      ),
    ),
  );
}

var dataModelSchemasMap3: Dynamic;

var dataModelSchemasSet4: Dynamic;

function loadDataModelSchemasCatch(
  dataModelSchemasCatch?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dataModelSchemasMap3Entry: Dynamic = dataModelSchemasMap3.get(
    dataModelSchemasCatch,
  );
  if (!dataModelSchemasMap3Entry) {
    dataModelSchemasMap3Entry = fetch(dataModelSchemasCatch)
      .then(
        async (
          response?: Dynamic,
          ..._extraArguments: unknown[]
        ): Promise<Dynamic> => {
          if (!response.ok)
            throw Error(`${dataModelSchemasCatch}: ${response.status}`);
          let arrayBuffer: Dynamic = await response.arrayBuffer();
          for (let loadDataModelSchemasCatchResult of Array.from<Dynamic>(
            dataModelSchemasSet4,
          ) as Dynamic)
            try {
              loadDataModelSchemasCatchResult(
                dataModelSchemasCatch,
                arrayBuffer,
              );
            } catch {}
          return arrayBuffer;
        },
      )
      .catch((error?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        throw (dataModelSchemasMap3.delete(dataModelSchemasCatch), error);
      });
    dataModelSchemasMap3.set(dataModelSchemasCatch, dataModelSchemasMap3Entry);
  }
  return dataModelSchemasMap3Entry;
}

function clearDataModelSchemasDelete(
  clearDataModelSchemasDelete3?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  dataModelSchemasSet4.add(clearDataModelSchemasDelete3);
  return (..._extraArguments: unknown[]): undefined =>
    void dataModelSchemasSet4.delete(clearDataModelSchemasDelete3);
}

var dataModelSchemasMap4: Dynamic;

function updateDataModelSchemasCatch(
  updateDataModelSchemasCatch2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dataModelSchemasMap4Entry: Dynamic = dataModelSchemasMap4.get(
    updateDataModelSchemasCatch2,
  );
  if (!dataModelSchemasMap4Entry) {
    dataModelSchemasMap4Entry = loadDataModelSchemasCatch(
      updateDataModelSchemasCatch2,
    )
      .then(
        (result?: Dynamic, ..._extraArguments: unknown[]) =>
          `data:font/woff2;base64,${resolvePlatformFrameAndCapabilitiesFromCharCode(new Uint8Array(result))}`,
      )
      .catch((error?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        throw (
          dataModelSchemasMap4.delete(updateDataModelSchemasCatch2),
          error
        );
      });
    dataModelSchemasMap4.set(
      updateDataModelSchemasCatch2,
      dataModelSchemasMap4Entry,
    );
  }
  return dataModelSchemasMap4Entry;
}

var collectDataModelSchemasFind: Dynamic;

var dataModelSchemasMap5: Dynamic;

function loadDataModelSchemasCatch2(
  dataModelSchemasCatch2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dataModelSchemasMap5Entry: Dynamic = dataModelSchemasMap5.get(
    dataModelSchemasCatch2,
  );
  if (!dataModelSchemasMap5Entry) {
    dataModelSchemasMap5Entry = loadDataModelSchemasFamily(options).catch(
      async (
        error?: Dynamic,
        ..._extraArguments: unknown[]
      ): Promise<Dynamic> => {
        try {
          let DataModelSchemasState52: Dynamic = DataModelSchemasState5;
          if (DataModelSchemasState52)
            return collectDataModelSchemasJoin(
              collectDataModelSchemasFind(
                (await DataModelSchemasState52()).faces,
                options,
              ),
            );
        } catch (loadDataModelSchemasCatch2Result: Dynamic) {
          error = loadDataModelSchemasCatch2Result;
        }
        dataModelSchemasMap5.delete(dataModelSchemasCatch2);
        console.warn(
          `[fontBlobs] /_runtime/ font fetch failed, falling back to system fonts.`,
          error,
        );
        return ``;
      },
    );
    dataModelSchemasMap5.set(dataModelSchemasCatch2, dataModelSchemasMap5Entry);
  }
  return dataModelSchemasMap5Entry;
}

var resolveDataModelSchemasIframe: Dynamic;

var resolveDataModelSchemasValue2: Dynamic;

var resolveDataModelSchemasFamily: Dynamic;

async function loadDataModelSchemasCss(
  phase: Dynamic = `all`,
): Promise<Dynamic> {
  // BaoCut: 冷启动的 all 与预热帧的 first 都带 KaTeX；rest 不重复传。字体失败不阻断原有字体。
  const [message, css] = await Promise.all([
    loadDataModelSchemasBaseCss(phase),
    phase === `rest` ? `` : loadKatexFontCss().catch((error: unknown) => {
      console.warn(`[KaTeX] Local font loading failed.`, error);
      return ``;
    }),
  ]);
  return css ? { ...(message ?? { type: `loadFonts` }), css: (message?.css ?? ``) + css } : message;
}

async function loadDataModelSchemasBaseCss(
  dataModelSchemasCss: Dynamic = `all`,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  if (DataModelSchemasEvery) return null;
  if (DataModelSchemasEvery2) {
    if (dataModelSchemasCss === `all`) {
      let css2: Dynamic = await resolveDataModelSchemasIframe();
      return css2
        ? {
            type: `loadFonts`,
            css: css2,
          }
        : null;
    }
    let filteredDataModelSchemasState4 = DataModelSchemasState4.filter(
      (DataModelSchemasState42?: Dynamic, ..._extraArguments: unknown[]) =>
        resolveDataModelSchemasFamily(DataModelSchemasState42) ===
        (dataModelSchemasCss === `first`),
    );
    let css: Dynamic = await loadDataModelSchemasCatch2(
      `iframe-${dataModelSchemasCss}`,
      filteredDataModelSchemasState4,
    );
    return css
      ? {
          type: `loadFonts`,
          css: css,
        }
      : null;
  }
  if (dataModelSchemasCss === `rest`) return null;
  let fonts: Dynamic = await loadDataModelSchemasBuf();
  return fonts.length
    ? {
        type: `loadFonts`,
        fonts: fonts,
      }
    : null;
}

var dataModelSchemasState2: Dynamic;

function collectDataModelSchemasBuf(..._extraArguments: unknown[]): Dynamic {
  return DataModelSchemasEvery
    ? (dataModelSchemasState2 ??= Promise.resolve(DataModelSchemasState6))
    : DataModelSchemasEvery2
      ? resolveDataModelSchemasValue2()
      : (dataModelSchemasState2 ??= loadDataModelSchemasBuf().then(
          (items?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            items.length === 0
              ? ((dataModelSchemasState2 = undefined), ``)
              : collectDataModelSchemasJoin(
                  items.map(
                    (
                      { buf: buf, ...buf2 }: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic => ({
                      ...buf2,
                      path: `data:font/woff2;base64,${resolvePlatformFrameAndCapabilitiesFromCharCode(new Uint8Array(buf))}`,
                    }),
                  ),
                ),
        ));
}

var resolveDataModelSchemasReplace2: Dynamic;

var resolveDataModelSchemasHasOwn: Dynamic;

function collectDataModelSchemasSplit(
  collectDataModelSchemasSplit2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!options) return collectDataModelSchemasSplit2;
  let mappedReplaceParts: Dynamic = options
    .replace(/^\//, ``)
    .split(`/`)
    .map(resolveDataModelSchemasReplace2);
  let collectDataModelSchemasSplit3: Dynamic = collectDataModelSchemasSplit2;
  for (let collectDataModelSchemasSplitResult of mappedReplaceParts as Dynamic) {
    if (collectDataModelSchemasSplit3 == null) return;
    if (Array.isArray(collectDataModelSchemasSplit3)) {
      let number2 = Number(collectDataModelSchemasSplitResult);
      if (
        !Number.isInteger(number2) ||
        number2 < 0 ||
        number2 >= collectDataModelSchemasSplit3.length
      )
        return;
      collectDataModelSchemasSplit3 = resolveDataModelSchemasHasOwn(
        collectDataModelSchemasSplit3,
        number2,
      );
    } else if (typeof collectDataModelSchemasSplit3 == `object`)
      collectDataModelSchemasSplit3 = resolveDataModelSchemasHasOwn(
        collectDataModelSchemasSplit3,
        collectDataModelSchemasSplitResult,
      );
    else return;
  }
  return collectDataModelSchemasSplit3;
}

var DataModelSchemasState7: Dynamic;

var DataModelSchemasState8: Dynamic;

function resolveDataModelSchemasValue3(
  dataModelSchemasValue3?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  DataModelSchemasState7 = dataModelSchemasValue3;
}

function resolveDataModelSchemasValue4(
  dataModelSchemasValue4?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  DataModelSchemasState8 = dataModelSchemasValue4;
}

function updateDataModelSchemasPath(
  updateDataModelSchemasPath2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    resolveObservabilityBrowserAndOperationEventsSome(
      updateDataModelSchemasPath2.file,
    )
  ) {
    console.warn(`[nav] refusing dot-segment path`);
    return;
  }
  let DataModelSchemasState72: Dynamic =
    DataModelSchemasState7 ?? DataModelSchemasState8;
  if (DataModelSchemasState72)
    return DataModelSchemasState72(updateDataModelSchemasPath2);
  if (typeof location === "undefined" || typeof history === "undefined") return;
  console.warn(
    `[nav] no handler registered; falling back to ?path=`,
    updateDataModelSchemasPath2.file,
  );
  let url = new URL(location.href);
  url.searchParams.set(`path`, updateDataModelSchemasPath2.file);
  if (updateDataModelSchemasPath2.hash) {
    url.hash = encodeURIComponent(updateDataModelSchemasPath2.hash);
  }
  history.pushState(null, ``, url);
}

var DataModelSchemasState9: Dynamic;

var DataModelSchemasState10: Dynamic;

function resolveDataModelSchemasValue5(
  dataModelSchemasValue5?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  DataModelSchemasState10 = dataModelSchemasValue5;
}

function resolveDataModelSchemasPathname(
  dataModelSchemasPathname?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let platformApiAndAuthStartsWith: Dynamic =
    typeof location !== "undefined"
      ? resolvePlatformApiAndAuthStartsWith(location.pathname)
      : ``;
  (DataModelSchemasState9 ?? DataModelSchemasState10)?.(
    dataModelSchemasPathname,
  );
  if (typeof location === "undefined") return;
  let url = new URL(dataModelSchemasPathname, location.origin);
  if (url.pathname !== platformApiAndAuthStartsWith) return;
  let match = url.pathname.match(/^\/(projects|skills)\/([^/?#]+)/);
  if (match) {
    useWorkbookStore.getState().invalidatePrefix(`${match[1]}/${match[2]}/`);
  }
  isDataModelSchemasFile(url);
  useContainerStore.getState().refresh();
}

function resolveDataModelSchemasValue6(
  dataModelSchemasValue6?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  try {
    return decodeURIComponent(dataModelSchemasValue6);
  } catch {
    return dataModelSchemasValue6;
  }
}

var resolveDataModelSchemasMatch: Dynamic;

function isDataModelSchemasFile(
  dataModelSchemasFile?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let useContainerStoreState: Dynamic = useContainerStore.getState();
  let searchParamEntry: Dynamic =
    dataModelSchemasFile.searchParams.get(`target`);
  if (searchParamEntry != null) {
    useContainerStoreState.setTarget(parseTarget(searchParamEntry));
  }
  if (dataModelSchemasFile.searchParams.get(`version`) != null) {
    useContainerStoreState.setLine(parseLineParam(dataModelSchemasFile.search));
  }
  let file: Dynamic = dataModelSchemasFile.searchParams.get(`path`);
  return !file || isObservabilityBrowserAndOperationEventsIncludes(file)
    ? false
    : (updateDataModelSchemasPath({
        file: file,
        hash:
          resolveDataModelSchemasValue6(dataModelSchemasFile.hash.slice(1)) ||
          undefined,
      }),
      true);
}

function updateDataModelSchemasHerePath(
  updateDataModelSchemasHerePath2?: Dynamic,
  {
    herePath: options = resolvePlatformApiAndAuthStartsWith(location.pathname),
    userAt: options2 = resolvePlatformApiAndAuthStartsWith(location.pathname),
    sameTab: options3 = false,
  }: Dynamic = {},
  ..._extraArguments: unknown[]
) {
  let dataModelSchemasMain: Dynamic = resolveDataModelSchemasMain(
    updateDataModelSchemasHerePath2,
    options,
  );
  if (!dataModelSchemasMain) return;
  let label = dataModelSchemasMain.pathname.startsWith(`/skills/`)
    ? `SKILL.md`
    : dataModelSchemasMain.pathname.startsWith(`/users/`)
      ? `public/scratch.md`
      : undefined;
  let searchParamEntry: Dynamic =
    dataModelSchemasMain.searchParams.get(`path`) || label;
  let dataModelSchemasValue6: Dynamic =
    resolveDataModelSchemasValue6(dataModelSchemasMain.hash.slice(1)) ||
    undefined;
  let searchParamEntry2: Dynamic =
    dataModelSchemasMain.searchParams.get(`target`);
  if (dataModelSchemasMain.pathname === options2) {
    if (label && !dataModelSchemasMain.searchParams.get(`path`)) {
      dataModelSchemasMain.searchParams.set(`path`, label);
    }
    if (!isDataModelSchemasFile(dataModelSchemasMain)) {
      if (dataModelSchemasValue6) {
        let total = `#` + encodeURIComponent(dataModelSchemasValue6);
        if (location.hash === total) {
          window.dispatchEvent(new (HashChangeEvent as Dynamic)(`hashchange`));
        } else {
          location.hash = total;
        }
        return true;
      }
      resolveDataModelSchemasPathname(dataModelSchemasMain.pathname);
    }
  } else {
    if (
      (searchParamEntry &&
        isObservabilityBrowserAndOperationEventsIncludes(searchParamEntry)) ||
      (searchParamEntry2 && resolveDataModelSchemasMatch(searchParamEntry2))
    )
      return;
    let label2 = searchParamEntry
      ? `?path=${encodeURIComponent(searchParamEntry)}`
      : ``;
    let label3 = searchParamEntry2
      ? `${label2 ? `&` : `?`}target=${encodeURIComponent(searchParamEntry2)}`
      : ``;
    let label4 = `${dataModelSchemasMain.pathname}${label2}${label3}${dataModelSchemasValue6 ? `#${encodeURIComponent(dataModelSchemasValue6)}` : ``}`;
    if (new URL(label4, location.origin).origin !== location.origin) return;
    let exec: Dynamic = (
      updateDataModelSchemasHerePath3?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      /^\/(project|projects)\/([^/]+)/.exec(
        updateDataModelSchemasHerePath3,
      )?.[2] ?? null;
    let match: Dynamic = exec(options2);
    if (
      options3 ||
      (match !== null && exec(dataModelSchemasMain.pathname) === match)
    ) {
      resolveDataModelSchemasPathname(label4);
    } else {
      window.open(
        PlatformApiAndAuthBONGOBASE
          ? `${PlatformApiAndAuthBONGOBASE}${label4}`
          : label4,
        `_blank`,
        `noopener`,
      );
    }
  }
}

function resolveDataModelSchemasMain(
  dataModelSchemasMain?: Dynamic,
  options: Dynamic = typeof location !== "undefined"
    ? resolvePlatformApiAndAuthStartsWith(location.pathname)
    : `/`,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!dataModelSchemasMain.startsWith(`claude://`)) return null;
  let dataModelSchemasMainSlice: Dynamic = dataModelSchemasMain.slice(9);
  let match: Dynamic = dataModelSchemasMainSlice.match(
    /^(projects|skills|users)\/([^/?#]+)\/(?:versions\/([^/?#]+)\/)?([^?#]+)(#.*)?$/,
  );
  if (match) {
    let [, setMatch, match2, match3, match4, match5]: Dynamic = match;
    let match6: Dynamic =
      match3 && match3 !== `main` && !match3.startsWith(`@tab:`);
    dataModelSchemasMainSlice = `${setMatch}/${match2}?path=${encodeURIComponent(resolveDataModelSchemasValue6(match4))}${match6 ? `&target=${match3}` : ``}${match5 ?? ``}`;
  }
  if (
    dataModelSchemasMainSlice.startsWith(`?`) ||
    /^(projects|project|skills|users)\//.test(dataModelSchemasMainSlice)
  )
    try {
      return new URL(
        dataModelSchemasMainSlice.startsWith(`?`)
          ? options + dataModelSchemasMainSlice
          : `/${dataModelSchemasMainSlice}`,
        location.origin,
      );
    } catch {
      return null;
    }
  let dataModelSchemasMainSliceIndex: Dynamic =
    dataModelSchemasMainSlice.indexOf(`?`);
  if (dataModelSchemasMainSliceIndex >= 0)
    return resolveDataModelSchemasMain(
      `claude://?path=${encodeURIComponent(resolveDataModelSchemasValue6(dataModelSchemasMainSlice.slice(0, dataModelSchemasMainSliceIndex)))}&${dataModelSchemasMainSlice.slice(dataModelSchemasMainSliceIndex + 1)}`,
      options,
    );
  let dataModelSchemasMainSliceIndex2: Dynamic =
    dataModelSchemasMainSlice.indexOf(`#`);
  let dataModelSchemasValue6: Dynamic = resolveDataModelSchemasValue6(
    dataModelSchemasMainSliceIndex2 >= 0
      ? dataModelSchemasMainSlice.slice(0, dataModelSchemasMainSliceIndex2)
      : dataModelSchemasMainSlice,
  );
  let dataModelSchemasMainSliceSlice: Dynamic =
    dataModelSchemasMainSliceIndex2 >= 0
      ? dataModelSchemasMainSlice.slice(dataModelSchemasMainSliceIndex2)
      : ``;
  return resolveDataModelSchemasMain(
    `claude://?path=${encodeURIComponent(dataModelSchemasValue6)}${dataModelSchemasMainSliceSlice}`,
    options,
  );
}

var DataModelSchemasStyles2: string;

var dataModelSchemasValue48000000: number;

var resolveDataModelSchemasReplace3: Dynamic;

async function loadDataModelSchemasImagePng(
  items?: unknown,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<undefined> {
  if (
    typeof items != `string` ||
    !items.startsWith(DataModelSchemasStyles2) ||
    items.length > dataModelSchemasValue48000000
  )
    throw Error(`copy image: not a PNG data URI`);
  let itemsSlice = items.slice(22);
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(itemsSlice))
    throw Error(`copy image: not a PNG data URI`);
  let platformFrameAndCapabilitiesFrom: Dynamic =
    resolvePlatformFrameAndCapabilitiesFrom(itemsSlice);
  let number2 = Number(options?.width);
  let altSlice: Dynamic =
    typeof options?.alt == `string` ? options.alt.slice(0, 2e3) : ``;
  let total =
    `<img src="${DataModelSchemasStyles2}${itemsSlice}"` +
    (Number.isFinite(number2) && number2 > 0
      ? ` width="${Math.round(number2)}"`
      : ``) +
    (altSlice ? ` alt="${resolveDataModelSchemasReplace3(altSlice)}"` : ``) +
    `>`;
  let context2: Dynamic = context ? context(total) : total;
  let imagepng = new Blob([platformFrameAndCapabilitiesFrom], {
    type: `image/png`,
  });
  await navigator.clipboard.write([
    new (ClipboardItem as Dynamic)(
      context2 === null
        ? {
            "image/png": imagepng,
          }
        : {
            "image/png": imagepng,
            "text/html": new Blob([context2], {
              type: `text/html`,
            }),
          },
    ),
  ]);
}

var DataModelSchemasStyles3: string;

function resolveDataModelSchemasStartsWith2(
  dataModelSchemasStarts?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (!dataModelSchemasStarts)
    throw Error(`read: empty path segment in "${options}"`);
  if (
    dataModelSchemasStarts.startsWith(`/`) ||
    dataModelSchemasStarts.includes(`\\`) ||
    dataModelSchemasStarts.split(`/`).includes(`..`)
  )
    throw Error(
      `read: path "${dataModelSchemasStarts}" must be relative without .. (in "${options}")`,
    );
}

var DataModelSchemasTables: string;

var DataModelSchemasTopics: string;

var dataModelSchemasPattern14: RegExp;

var dataModelSchemasSet5: Dynamic;

function resolveDataModelSchemasTables(
  dataModelSchemasTables?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dataModelSchemasTables2: Dynamic = dataModelSchemasTables;
  if (
    dataModelSchemasTables.startsWith(`tables/`) ||
    dataModelSchemasTables.startsWith(DataModelSchemasTopics)
  ) {
    dataModelSchemasTables2 = dataModelSchemasTables.slice(7);
  }
  return !dataModelSchemasTables2 ||
    dataModelSchemasTables2.includes(`/`) ||
    dataModelSchemasTables2.includes(`..`) ||
    !dataModelSchemasPattern14.test(dataModelSchemasTables2)
    ? null
    : dataModelSchemasTables2;
}

function resolveDataModelSchemasPush(
  dataModelSchemasPush?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dataModelSchemasTables: Dynamic =
    resolveDataModelSchemasTables(dataModelSchemasPush);
  if (dataModelSchemasTables === null) return [dataModelSchemasPush];
  let items = [
    DataModelSchemasTables + dataModelSchemasTables,
    DataModelSchemasTopics + dataModelSchemasTables,
  ];
  if (!dataModelSchemasSet5.has(dataModelSchemasTables)) {
    items.push(dataModelSchemasTables);
  }
  return items;
}

async function loadDataModelSchemasRetired(
  response?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let error: Dynamic = null;
  try {
    error = await response.json();
  } catch {
    return;
  }
  let error2: Dynamic = error?.error;
  if (!(typeof error2 != `string` || error2 === ``))
    return error?.code === `retired` || response.status === 503
      ? Error(error2)
      : undefined;
}

function collectDataModelSchemasValue(
  collectDataModelSchemasValue2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return resolveDataModelSchemasPush(options).map(
    (dataModelSchemasPush?: Dynamic, ..._extraArguments: unknown[]) =>
      resolvePlatformApiAndAuthValue33(
        collectDataModelSchemasValue2,
        dataModelSchemasPush,
      ),
  );
}

var dataModelSchemasValue20000: number;

var dataModelSchemasValue150000: number;

function isDataModelSchemasCode(
  dataModelSchemasCode?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let send: Dynamic = dataModelSchemasCode.send(context, dependencies);
  let wait: Dynamic = dataModelSchemasCode.wait;
  return wait
    ? new (Promise as Dynamic)(
        (resolve?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          let enabled = false;
          let wait2: Dynamic = wait(
            (..._extraArguments: unknown[]): undefined => {
              if (!enabled) {
                dataModelSchemasCode.note(options, `waiting`);
              }
            },
            dataModelSchemasValue20000,
          );
          let wait3: Dynamic = wait(
            (..._extraArguments: unknown[]): undefined => {
              if (!enabled) {
                enabled = true;
                wait2();
                resolve({
                  ok: false,
                  code: `no_answer`,
                });
                send.then(
                  (ask?: Dynamic, ..._extraArguments: unknown[]): undefined => {
                    if (ask.ok) {
                      dataModelSchemasCode.note(options, `sent`);
                      dataModelSchemasCode.sentAs?.(options, ask.threadId);
                      dataModelSchemasCode
                        .resolve(ask.threadId)
                        .catch((..._extraArguments: unknown[]) => false);
                    }
                  },
                  (..._extraArguments: unknown[]): undefined => undefined,
                );
              }
            },
            dataModelSchemasValue150000,
          );
          let wait4 = (
            dataModelSchemasCode2?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (!enabled) {
              enabled = true;
              wait2();
              wait3();
              resolve(dataModelSchemasCode2);
            }
          };
          send.then(wait4, (..._extraArguments: unknown[]) =>
            wait4({
              ok: false,
              code: `upstream_error`,
            }),
          );
        },
      )
    : send;
}

var dataModelSchemasValue3000: number;

function updateDataModelSchemasSentAs(
  updateDataModelSchemasSentAs2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let lookup: Dynamic = new (Map as Dynamic)();
  let lookup2: Dynamic = new (Map as Dynamic)();
  let lookup3: Dynamic = new (Map as Dynamic)();
  let lookup4: Dynamic = new (Map as Dynamic)();
  let said = (
    updateDataModelSchemasSentAs3?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let platformSessionAndSourcesFailed =
      resolvePlatformSessionAndSourcesFailed(context.state, context.reason);
    updateDataModelSchemasSentAs2.state?.(
      updateDataModelSchemasSentAs3,
      context.state,
      platformSessionAndSourcesFailed,
    );
    updateDataModelSchemasSentAs2.note(
      updateDataModelSchemasSentAs3,
      resolvePlatformSessionAndSourcesFailed2(
        context.state,
        platformSessionAndSourcesFailed,
      ),
    );
    updateDataModelSchemasSentAs2.open(
      updateDataModelSchemasSentAs3,
      context.canOpen ? options : null,
    );
    let state: Dynamic =
      platformSessionAndSourcesFailed === undefined
        ? context.state
        : `${context.state}|${platformSessionAndSourcesFailed}`;
    if (
      lookup4.get(updateDataModelSchemasSentAs3) !== state &&
      (lookup4.set(updateDataModelSchemasSentAs3, state),
      updateDataModelSchemasSentAs2.said !== undefined)
    )
      try {
        updateDataModelSchemasSentAs2.said(
          updateDataModelSchemasSentAs3,
          context.state,
          platformSessionAndSourcesFailed,
        );
      } catch {}
  };
  return {
    sentAs(
      updateDataModelSchemasSentAs3?: Dynamic,
      options?: unknown,
      ..._extraArguments: unknown[]
    ): undefined {
      if (typeof options != `string` || options === ``) return;
      let lookupEntry: Dynamic = lookup2.get(updateDataModelSchemasSentAs3);
      if (lookupEntry !== undefined && lookupEntry !== options) {
        lookup.delete(lookupEntry);
      }
      if (lookupEntry !== options) {
        lookup4.delete(updateDataModelSchemasSentAs3);
      }
      lookup2.set(updateDataModelSchemasSentAs3, options);
      lookup.set(options, updateDataModelSchemasSentAs3);
      let lookupEntry2: Dynamic = lookup3.get(options);
      if (lookupEntry2 !== undefined) {
        lookup3.delete(options);
        said(updateDataModelSchemasSentAs3, options, lookupEntry2);
      }
    },
    heard(
      updateDataModelSchemasSentAs3?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (
        !updateDataModelSchemasSentAs3 ||
        typeof updateDataModelSchemasSentAs3.id != `string` ||
        typeof updateDataModelSchemasSentAs3.state != `string`
      )
        return;
      let lookupEntry: Dynamic = lookup.get(updateDataModelSchemasSentAs3.id);
      if (lookupEntry === undefined) {
        if (
          !lookup3.has(updateDataModelSchemasSentAs3.id) &&
          lookup3.size >= 32
        ) {
          lookup3.delete(lookup3.keys().next().value);
        }
        lookup3.set(updateDataModelSchemasSentAs3.id, {
          state: updateDataModelSchemasSentAs3.state,
          canOpen: updateDataModelSchemasSentAs3.canOpen === true,
          ...(typeof updateDataModelSchemasSentAs3.reason == `string` && {
            reason: updateDataModelSchemasSentAs3.reason,
          }),
        });
        return;
      }
      said(lookupEntry, updateDataModelSchemasSentAs3.id, {
        state: updateDataModelSchemasSentAs3.state,
        canOpen: updateDataModelSchemasSentAs3.canOpen === true,
        ...(typeof updateDataModelSchemasSentAs3.reason == `string` && {
          reason: updateDataModelSchemasSentAs3.reason,
        }),
      });
    },
    last: (
      updateDataModelSchemasSentAs3?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => lookup4.get(updateDataModelSchemasSentAs3)?.split(`|`, 1)[0],
    carrier(
      updateDataModelSchemasSentAs3?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let lookupEntry: Dynamic = lookup.get(updateDataModelSchemasSentAs3);
      return lookupEntry === undefined
        ? lookup3.get(updateDataModelSchemasSentAs3)?.state
        : lookup4.get(lookupEntry)?.split(`|`, 1)[0];
    },
    reset(..._extraArguments: unknown[]): undefined {
      lookup.clear();
      lookup2.clear();
      lookup3.clear();
      lookup4.clear();
    },
  };
}

var dataModelSchemasSet6: Dynamic;

var resolveDataModelSchemasValue7: Dynamic;

function loadDataModelSchemasResolve(
  dataModelSchemasResolve?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let loadDataModelSchemasResolveResult: Dynamic = null;
  let enabled = false;
  let trace = (
    dataModelSchemasResolve2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    try {
      dataModelSchemasResolve.trace?.(
        dataModelSchemasResolve2,
        uniqueItems.size,
      );
    } catch {}
  };
  let loadDataModelSchemasResolveHandler: Dynamic = (
    dataModelSchemasResolve2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    try {
      return dataModelSchemasResolve.resolve(dataModelSchemasResolve2).then(
        (result?: Dynamic, ..._extraArguments: unknown[]) => result === true,
        (..._extraArguments: unknown[]) => false,
      );
    } catch {
      return Promise.resolve(false);
    }
  };
  let whenAnswered = (..._extraArguments: unknown[]): undefined => {
    if (
      loadDataModelSchemasResolveResult === null &&
      !enabled &&
      uniqueItems.size > 0
    ) {
      loadDataModelSchemasResolveResult =
        dataModelSchemasResolve.whenAnswered(live);
    }
  };
  let live = (..._extraArguments: unknown[]): undefined => {
    loadDataModelSchemasResolveResult = null;
    if (!enabled) {
      for (let loadDataModelSchemasResolveResult2 of Array.from<Dynamic>(
        uniqueItems,
      ) as Dynamic) {
        let enabled2: boolean = true;
        try {
          enabled2 = dataModelSchemasResolve.live(
            loadDataModelSchemasResolveResult2,
          );
        } catch {}
        if (!enabled2) {
          uniqueItems.delete(loadDataModelSchemasResolveResult2);
          trace(`retried`);
          loadDataModelSchemasResolveHandler(
            loadDataModelSchemasResolveResult2,
          ).then((result?: Dynamic, ..._extraArguments: unknown[]) =>
            trace(result ? `ok` : `failed`),
          );
        }
      }
      whenAnswered();
    }
  };
  return {
    async resolve(
      dataModelSchemasResolve2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> {
      let dataModelSchemasResolveHandler: Dynamic =
        await loadDataModelSchemasResolveHandler(dataModelSchemasResolve2);
      return dataModelSchemasResolveHandler ||
        enabled ||
        dataModelSchemasResolve2 === ``
        ? dataModelSchemasResolveHandler
        : (uniqueItems.delete(dataModelSchemasResolve2),
          uniqueItems.add(dataModelSchemasResolve2),
          uniqueItems.size > 8 &&
            uniqueItems.delete(uniqueItems.values().next().value),
          trace(`remembered`),
          whenAnswered(),
          false);
    },
    dispose(..._extraArguments: unknown[]): undefined {
      enabled = true;
      uniqueItems.clear();
      loadDataModelSchemasResolveResult?.();
      loadDataModelSchemasResolveResult = null;
    },
  };
}

var resolveDataModelSchemasSummon: Dynamic;

function resolveDataModelSchemasValue8(
  dataModelSchemasValue8?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return resolveDataModelSchemasSummon(dataModelSchemasValue8)
    ? resolvePlatformSessionAndSourcesAvailable(options)
    : null;
}

async function loadDataModelSchemasKind(
  dataModelSchemasKind?: Dynamic,
  ask?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  if (!resolveDataModelSchemasSummon(ask)) return `no_mention`;
  let trace = (
    dataModelSchemasKind2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    try {
      dataModelSchemasKind.trace?.(dataModelSchemasKind2, options);
    } catch {}
  };
  let kind =
    ask.page === true
      ? `page`
      : ask.block
        ? `composer`
        : ask.anchorStart
          ? `host`
          : `wire`;
  let note: Dynamic = (
    dataModelSchemasKind2?: Dynamic,
    note2: Dynamic = `unreachable`,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ) => (
    trace(`fail.${dataModelSchemasKind2}`, {
      kind: kind,
      note: note2,
      ...context,
    }),
    dataModelSchemasKind.note(ask.threadId, note2),
    `unreachable`
  );
  try {
    let [all, verdict]: Dynamic = await Promise.all([
      dataModelSchemasKind.anchorOf(
        ask.threadId,
        ask.block,
        ask.y,
        ask.page === true,
        ask.anchorStart,
      ),
      ask.sendFirst === true
        ? Promise.resolve(`available`)
        : dataModelSchemasKind.canSend(),
    ]);
    if (all === null)
      return ask.owed === true
        ? (trace(`owed.unanchored`, {
            kind: kind,
          }),
          `unanchored`)
        : note(
            `anchor`,
            resolvePlatformSessionAndSourcesConsentRequired(`no_anchor`),
          );
    let platformSessionAndSourcesCode: Dynamic =
      resolvePlatformSessionAndSourcesCode(ask.body);
    if (!platformSessionAndSourcesCode.ok)
      return note(
        `text`,
        resolvePlatformSessionAndSourcesConsentRequired(
          platformSessionAndSourcesCode.code,
        ),
        {
          code: platformSessionAndSourcesCode.code,
        },
      );
    if (verdict !== `available`)
      return note(
        `verdict`,
        resolvePlatformSessionAndSourcesAvailable(verdict),
        {
          verdict: verdict,
        },
      );
    if (
      ask.owed === true &&
      dataModelSchemasKind.claim !== undefined &&
      !dataModelSchemasKind.claim(ask.threadId)
    ) {
      trace(`owed.unclaimed`, {
        kind: kind,
      });
      return `unanchored`;
    }
    try {
      dataModelSchemasKind.asked?.(ask.threadId);
    } catch {}
    let isDataModelSchemasCode2: Dynamic = await isDataModelSchemasCode(
      dataModelSchemasKind,
      ask.threadId,
      all,
      platformSessionAndSourcesCode.text,
    );
    if (!isDataModelSchemasCode2.ok) {
      if (platformSessionAndSourcesSet2.has(isDataModelSchemasCode2.code)) {
        dataModelSchemasKind.retire(isDataModelSchemasCode2.code);
      }
      if (isDataModelSchemasCode2.code === `claude_unavailable`) {
        let verdict2: Dynamic = await dataModelSchemasKind.canSend();
        return note(
          `send`,
          verdict2 === `available`
            ? `refused`
            : resolvePlatformSessionAndSourcesAvailable(verdict2),
          {
            code: isDataModelSchemasCode2.code,
            verdict: verdict2,
          },
        );
      }
      return note(
        `send`,
        resolvePlatformSessionAndSourcesConsentRequired(
          isDataModelSchemasCode2.code,
        ),
        {
          code: isDataModelSchemasCode2.code,
        },
      );
    }
    trace(`sent`, {
      kind: kind,
    });
    dataModelSchemasKind.note(ask.threadId, `sent`);
    dataModelSchemasKind.sentAs?.(
      ask.threadId,
      isDataModelSchemasCode2.threadId,
    );
    dataModelSchemasKind
      .resolve(isDataModelSchemasCode2.threadId)
      .catch((..._extraArguments: unknown[]) => false);
    return `sent`;
  } catch {
    return note(`throw`);
  }
}

function resolveDataModelSchemasResolve(
  dataModelSchemasResolve?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dataModelSchemasResolve2: Dynamic = dataModelSchemasResolve();
  return dataModelSchemasResolve2 === null
    ? new (Promise as Dynamic)(
        (resolve?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          let enabled = false;
          let resolveDataModelSchemasResolveHandler = (
            ..._extraArguments: unknown[]
          ): undefined => {};
          let resolveDataModelSchemasResolveHandler2 = (
            ..._extraArguments: unknown[]
          ): undefined => {};
          let resolveDataModelSchemasResolveHandler3 = (
            dataModelSchemasResolve3?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (!enabled) {
              enabled = true;
              resolveDataModelSchemasResolveHandler();
              resolveDataModelSchemasResolveHandler2();
              resolve(dataModelSchemasResolve3);
            }
          };
          resolveDataModelSchemasResolveHandler2 = options(
            (..._extraArguments: unknown[]): undefined => {
              let dataModelSchemasResolve3: Dynamic = dataModelSchemasResolve();
              if (dataModelSchemasResolve3 !== null) {
                resolveDataModelSchemasResolveHandler3(
                  dataModelSchemasResolve3,
                );
              }
            },
          );
          resolveDataModelSchemasResolveHandler = context(
            (..._extraArguments: unknown[]) =>
              resolveDataModelSchemasResolveHandler3(dataModelSchemasResolve()),
          );
        },
      )
    : Promise.resolve(dataModelSchemasResolve2);
}

var resolveDataModelSchemasHasOwn2: Dynamic;

function resolveDataModelSchemasTest3(
  dataModelSchemasTest3?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!dataModelSchemasTest3) return null;
  let resolveDataModelSchemasTest3Result: Dynamic = null;
  let amount: number = 1 / 0;
  for (let [
    resolveDataModelSchemasTest3Result2,
    resolveDataModelSchemasTest3Result3,
  ] of dataModelSchemasTest3 as Dynamic) {
    if (
      !PlatformSessionAndSourcesState3.test(resolveDataModelSchemasTest3Result2)
    )
      continue;
    let rank: Dynamic =
      typeof resolveDataModelSchemasTest3Result3.rank == `number` &&
      Number.isFinite(resolveDataModelSchemasTest3Result3.rank)
        ? resolveDataModelSchemasTest3Result3.rank
        : 1 / 0;
    if (resolveDataModelSchemasTest3Result === null || rank < amount) {
      resolveDataModelSchemasTest3Result = resolveDataModelSchemasTest3Result2;
      amount = rank;
    }
  }
  return resolveDataModelSchemasTest3Result;
}

function resolveDataModelSchemasLeft2(
  dataModelSchemasLeft2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument?: unknown,
  argument2?: Dynamic,
  argument3?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let frameBox: Dynamic = dependencies.frameBox;
  if (!frameBox) return null;
  if (argument2 === true) {
    let platformSessionAndSourcesBid: Dynamic =
      resolvePlatformSessionAndSourcesBid(
        dependencies.docRef,
        resolveDataModelSchemasTest3(dependencies.known),
        dataModelSchemasLeft2,
      );
    return platformSessionAndSourcesBid === null
      ? null
      : resolveDataModelSchemasPath2(
          platformSessionAndSourcesBid,
          frameBox,
          {
            left: 0,
            top: 0,
          },
          dependencies.viewport,
        );
  }
  let dataModelSchemasHasOwn2: Dynamic = resolveDataModelSchemasHasOwn2(
    context.anchors,
    dataModelSchemasLeft2,
  );
  let top: Dynamic = resolveDataModelSchemasHasOwn2(
    context.rects,
    dataModelSchemasLeft2,
  );
  let resolveDataModelSchemasLeft2Result: Dynamic = null;
  let block: Dynamic = getPlatformSessionAndSourcesStart(
    dataModelSchemasHasOwn2,
    dependencies.known,
  );
  if (block && top !== undefined) {
    resolveDataModelSchemasLeft2Result = {
      block: block,
      left: block.left,
      top: top,
    };
  }
  if (!resolveDataModelSchemasLeft2Result) {
    let top2: Dynamic =
      top ??
      resolveDataModelSchemasHasOwn2(
        context.optimisticY,
        dataModelSchemasLeft2,
      ) ??
      (typeof argument == `number` && Number.isFinite(argument)
        ? argument
        : undefined);
    if (options) {
      let block2: Dynamic = getPlatformSessionAndSourcesStart(
        options,
        dependencies.known,
      );
      if (block2 && top2 !== undefined) {
        resolveDataModelSchemasLeft2Result = {
          block: block2,
          left: dataModelSchemasHasOwn2?.left ?? 0,
          top: top2,
        };
      }
    } else {
      let block2: Dynamic = resolveDataModelSchemasBid(
        dataModelSchemasLeft2,
        argument3,
        dependencies,
      );
      if (block2) {
        resolveDataModelSchemasLeft2Result = {
          block: block2,
          left: dataModelSchemasHasOwn2?.left ?? 0,
          top: top2 ?? 0,
        };
      }
    }
  }
  if (!resolveDataModelSchemasLeft2Result) return null;
  let platformSessionAndSourcesExec: Dynamic =
    resolvePlatformSessionAndSourcesExec(
      dependencies.docRef,
      resolveDataModelSchemasLeft2Result.block,
      dataModelSchemasLeft2,
    );
  return platformSessionAndSourcesExec === null
    ? null
    : resolveDataModelSchemasPath2(
        platformSessionAndSourcesExec,
        frameBox,
        resolveDataModelSchemasLeft2Result,
        dependencies.viewport,
      );
}

function resolveDataModelSchemasBid(
  dataModelSchemasBid?: Dynamic,
  options?: unknown,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let host: Dynamic = context.host;
  if (!host) return null;
  let options2: Dynamic =
    typeof options == `string`
      ? options
      : (host.anchorStartOf?.(dataModelSchemasBid) ?? null);
  let bid: Dynamic =
    options2 !== null && options2 !== `` ? host.blockOfChar(options2) : null;
  return bid === null
    ? null
    : getPlatformSessionAndSourcesStart(
        {
          bid: bid,
        },
        context.known,
      );
}

function resolveDataModelSchemasPath2(
  path?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let width: Dynamic = dependencies.width || 1;
  let height: Dynamic = dependencies.height || 1;
  let resolveDataModelSchemasPath2Handler: Dynamic = (
    dataModelSchemasPath2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => Math.min(1, Math.max(0, dataModelSchemasPath2));
  let dataModelSchemasPath2Handler: Dynamic =
    resolveDataModelSchemasPath2Handler((options.left + context.left) / width);
  let dataModelSchemasPath2Handler2: Dynamic =
    resolveDataModelSchemasPath2Handler((options.top + context.top) / height);
  return Number.isFinite(dataModelSchemasPath2Handler) &&
    Number.isFinite(dataModelSchemasPath2Handler2)
    ? {
        path: path,
        x: dataModelSchemasPath2Handler,
        y: dataModelSchemasPath2Handler2,
      }
    : null;
}

function isDataModelSchemasArm(..._extraArguments: unknown[]): Dynamic {
  let enabled = false;
  let lookup: Dynamic = new (Map as Dynamic)();
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  return {
    arm(..._extraArguments: unknown[]): undefined {
      enabled = true;
    },
    park(
      ask?: Dynamic,
      options?: Dynamic,
      context: Dynamic = false,
      ..._extraArguments: unknown[]
    ) {
      if (!enabled || !resolveDataModelSchemasSummon(ask)) return false;
      lookup.delete(ask.threadId);
      lookup.set(ask.threadId, {
        ev: ask,
        at: options,
      });
      if (lookup.size > 32) {
        lookup.delete(lookup.keys().next().value);
      }
      if (!context)
        for (let isDataModelSchemasArmResult of Array.from<Dynamic>(
          uniqueItems,
        ) as Dynamic)
          try {
            isDataModelSchemasArmResult(ask);
          } catch {}
      return true;
    },
    onParked(
      dataModelSchemasArm?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      uniqueItems.add(dataModelSchemasArm);
      return (..._extraArguments: unknown[]): undefined =>
        void uniqueItems.delete(dataModelSchemasArm);
    },
    takeOwed(
      dataModelSchemasArm?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let lookupEntry: Dynamic = lookup.get(dataModelSchemasArm);
      return lookupEntry === undefined || lookupEntry.ev.owed !== true
        ? null
        : (lookup.delete(dataModelSchemasArm), lookupEntry.ev);
    },
    take(
      request?: Dynamic,
      reason: Dynamic = (..._extraArguments: unknown[]) => true,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let record2: Dynamic = {
        send: [],
        left: [],
      };
      for (let [
        isDataModelSchemasArmResult,
        { ev: isDataModelSchemasArmResult2, at: isDataModelSchemasArmResult3 },
      ] of lookup as Dynamic) {
        let difference: number = request - isDataModelSchemasArmResult3;
        let matchesOwed =
          isDataModelSchemasArmResult2.owed === true ||
          (difference >= 0 && difference <= 5e3);
        if (!(matchesOwed && !reason(isDataModelSchemasArmResult2))) {
          lookup.delete(isDataModelSchemasArmResult);
          (matchesOwed ? record2.send : record2.left).push(
            isDataModelSchemasArmResult2,
          );
        }
      }
      return record2;
    },
    get size(): Dynamic {
      return lookup.size;
    },
    reset(..._extraArguments: unknown[]): undefined {
      enabled = false;
      lookup.clear();
      uniqueItems.clear();
    },
  };
}

var DataModelSchemasANCHORLABELMAX: Dynamic;

var DataModelSchemasSlice: RegExp;

function segmentOfAnchor(entry?: Dynamic, ..._extraArguments: unknown[]) {
  return entry?.kind === `lfile`
    ? (DataModelSchemasSlice.exec(entry.ref)?.[1] ?? null)
    : null;
}

var PENDING_ASK_TTL_MS: number;

var QUICK_EMOJI: string[];

var EMOJI_OK: RegExp;

var dataModelSchemasPattern15: RegExp;

function extractMentions(
  extractMentions2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return [...extractMentions2.matchAll(dataModelSchemasPattern15)].map(
    (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => item[1],
  );
}

function clampAnchorLabel(
  clampAnchorLabel2?: unknown,
  ..._extraArguments: unknown[]
) {
  return typeof clampAnchorLabel2 == `string`
    ? [...clampAnchorLabel2.replace(/[\p{Cc}\p{Cf}\p{Zl}\p{Zp}\p{Cs}]/gu, ``)]
        .slice(0, 120)
        .join(``)
    : ``;
}

function screenCellIds(
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!Array.isArray(items) || items.length === 0 || items.length > 400)
    return null;
  let items2: Dynamic = [];
  for (let items3 of items as Dynamic) {
    if (typeof items3 != `string` || items3 === `` || items3.length > 200)
      return null;
    items2.push(items3);
  }
  return items2;
}

function coerceCellsMeta(
  coerceCellsMeta2?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  let record2: Dynamic = {};
  if (typeof coerceCellsMeta2 != `object` || !coerceCellsMeta2) return record2;
  for (let [coerceCellsMetaResult, coerceCellsMetaResult2] of Object.entries(
    coerceCellsMeta2,
  ) as Dynamic) {
    if (typeof coerceCellsMetaResult2 != `object` || !coerceCellsMetaResult2)
      continue;
    let coerceCellsMetaResult3: Dynamic = coerceCellsMetaResult2;
    if (
      (coerceCellsMetaResult3.kind !== `column` &&
        coerceCellsMetaResult3.kind !== `row` &&
        coerceCellsMetaResult3.kind !== `cells`) ||
      typeof coerceCellsMetaResult3.n != `number` ||
      !Number.isInteger(coerceCellsMetaResult3.n) ||
      coerceCellsMetaResult3.n < 0 ||
      coerceCellsMetaResult3.n > 1e4
    )
      continue;
    let header =
      typeof coerceCellsMetaResult3.header == `string`
        ? clampAnchorLabel(coerceCellsMetaResult3.header)
        : ``;
    record2[coerceCellsMetaResult] = {
      kind: coerceCellsMetaResult3.kind,
      n: coerceCellsMetaResult3.n,
      ...(header
        ? {
            header: header,
          }
        : {}),
    };
  }
  return record2;
}

var DataModelSchemasImage: Dynamic;

function atomKindOfQuote(
  atomKind?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return atomKind !== undefined &&
    Object.hasOwn(DataModelSchemasImage, atomKind)
    ? DataModelSchemasImage[atomKind]
    : undefined;
}

var DataModelSchemasStyles4: string;

var DataModelSchemasState11: RegExp;

function quoteWords(
  quoteWords2?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof quoteWords2 != `string`) return ``;
  let atomKindOfQuote2: Dynamic = atomKindOfQuote(quoteWords2.trim());
  if (atomKindOfQuote2 !== undefined) return atomChipLabel(atomKindOfQuote2);
  let quoteWordsParts = quoteWords2.split(DataModelSchemasState11);
  if (quoteWordsParts.length === 1) return quoteWords2;
  let items = [quoteWordsParts[0]];
  let enabled = false;
  for (let quoteWordsResult of quoteWordsParts.slice(1) as Dynamic) {
    let quoteWordsResult2 = (items[items.length - 1] =
      items[items.length - 1].trimEnd());
    let trimStart: Dynamic = quoteWordsResult.trimStart();
    if (quoteWordsResult2 !== ``) {
      enabled = true;
    }
    let enabled2 =
      !enabled ||
      trimStart === `` ||
      /^[,.;:!?)\]}”’]/.test(trimStart) ||
      /[([{“‘]$/.test(quoteWordsResult2);
    items.push(enabled2 ? trimStart : ` ${trimStart}`);
  }
  let itemsText = items.join(``);
  return /[^\p{P}\p{Z}\p{C}\p{M}\s]/u.test(itemsText) ? itemsText : ``;
}

var DataModelSchemasImage2: Dynamic;

function atomChipLabel(
  atomChipLabel2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return DataModelSchemasImage2[atomChipLabel2];
}

function coerceMediaMeta(
  coerceMediaMeta2?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  let record2: Dynamic = {};
  if (typeof coerceMediaMeta2 != `object` || !coerceMediaMeta2) return record2;
  for (let [items, entry] of Object.entries(coerceMediaMeta2) as Dynamic) {
    if (
      items === `` ||
      items.length > 200 ||
      typeof entry != `object` ||
      !entry
    )
      continue;
    let kind: Dynamic = entry.kind;
    if (kind === `image` || kind === `video` || kind === `file`) {
      record2[items] = {
        kind: kind,
      };
    }
  }
  return record2;
}

function cellsChipLabel(
  cellsChipLabel2?: Dynamic,
  entry?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (entry?.kind === `column`)
    return entry.header ? `Table · ${entry.header} column` : `Table · column`;
  if (entry?.kind === `row`)
    return entry.header ? `Table · ${entry.header} row` : `Table · row`;
  let n10: Dynamic =
    entry?.kind === `cells` ? entry.n : cellsChipLabel2.ids.length;
  return n10 === 1
    ? `Table · 1 cell`
    : n10 > 1
      ? `Table · ${n10} cells`
      : `Table`;
}

var dataModelSchemasKindRangeIdsObjectValues: string[];

function isRawAnchorJson(
  rawAnchorJson?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof rawAnchorJson != `string` || !/^\s*[[{]/.test(rawAnchorJson))
    return false;
  let items: Dynamic;
  try {
    items = JSON.parse(rawAnchorJson);
  } catch {
    return false;
  }
  let isRawAnchorJsonHandler: Dynamic = (
    rawAnchorJson2?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof rawAnchorJson2 == `object` &&
    !!rawAnchorJson2 &&
    !Array.isArray(rawAnchorJson2) &&
    dataModelSchemasKindRangeIdsObjectValues.some(
      (
        dataModelSchemasKindRangeIdsObjectValue?: Dynamic,
        ..._extraArguments: unknown[]
      ) => dataModelSchemasKindRangeIdsObjectValue in rawAnchorJson2,
    );
  return Array.isArray(items)
    ? items.length > 0 && items.every(isRawAnchorJsonHandler)
    : isRawAnchorJsonHandler(items);
}

function threadRefOf(event?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
  let anchor: Dynamic = event.target?.anchor;
  return anchor?.kind === `lfile` && typeof anchor.ref == `string`
    ? anchor.ref
    : ``;
}

function isNodeThread(
  nodeThread?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let threadRefOf2: Dynamic = threadRefOf(nodeThread);
  if (
    threadRefOf2.includes(`#${options}~el:`) ||
    threadRefOf2.endsWith(`#${options}`)
  )
    return true;
  let widgetAnchorOfThread2 = widgetAnchorOfThread(nodeThread);
  return (
    widgetAnchorOfThread2 !== null && widgetAnchorOfThread2.node === options
  );
}

function widgetAnchorOfThread(
  widgetAnchor?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let threadRefOf2: Dynamic = threadRefOf(widgetAnchor);
  let threadRefOfIndex: Dynamic = threadRefOf2.indexOf(`#`);
  return threadRefOfIndex < 0
    ? null
    : resolveEditorAnchorsAndMentionsNode(
        threadRefOf2.slice(threadRefOfIndex + 1),
      );
}

function isDatumPinThread(event?: Dynamic, ..._extraArguments: unknown[]) {
  return event.target?.pin !== undefined;
}

var DataModelSchemasState12: RegExp;

function nodeIdOfThread(nodeId?: Dynamic, ..._extraArguments: unknown[]) {
  let match = DataModelSchemasState12.exec(threadRefOf(nodeId));
  return match ? match[1] : null;
}

function isRunProgress(file?: Dynamic, ..._extraArguments: unknown[]) {
  return file.root?.kind === `status`;
}

function isAgentRow(
  agentRow?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return agentRow.actor?.startsWith(`agent`) ?? false;
}

function isBuildConversation(
  buildConversation?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return buildConversation.buildRun !== undefined;
}

function latestRunSay(
  latestRunSay2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let activity: Dynamic = null;
  for (let file of latestRunSay2 as Dynamic) {
    if (!isRunProgress(file) || file.resolved || !isNodeThread(file, options))
      continue;
    let body: Dynamic = file.root?.body;
    if (typeof body != `string` || !body.trim()) continue;
    let at2: Dynamic = file.root?.at ?? ``;
    if (!activity || at2 >= activity.at) {
      activity = {
        at: at2,
        body: body,
      };
    }
  }
  return activity ? activity.body.slice(0, 500) : null;
}

function foldOwnsPage(
  foldOwnsPage2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return foldOwnsPage2 && options !== undefined;
}

function filterCorrectionReady(
  filterCorrectionReady2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return filterCorrectionReady2.seeded
    ? filterCorrectionReady2.foldOwnsThisPage
      ? filterCorrectionReady2.foldReady
      : true
    : false;
}

function listFilterSaid(
  listFilterSaid2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let label =
    listFilterSaid2 === `open`
      ? `open `
      : listFilterSaid2 === `resolved`
        ? `resolved `
        : ``;
  return options === 0
    ? `No ${label}comments`
    : `${options} ${label}comment${options === 1 ? `` : `s`}`;
}

function listTitleCount(
  listTitleCount2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return listTitleCount2 === `open`
    ? {
        n: options,
        words: `open`,
      }
    : {
        n: context,
        words:
          listTitleCount2 === `resolved` ? `resolved` : `open and resolved`,
      };
}

var resolveDataModelSchemasFrame: Dynamic;

function resolveDataModelSchemasSess(
  dataModelSchemasSess?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let lastIndexOf: Dynamic = dataModelSchemasSess.lastIndexOf(`.`);
  let dataModelSchemasSessSlice: Dynamic = dataModelSchemasSess.slice(
    lastIndexOf + 1,
  );
  let number2 = Number(dataModelSchemasSessSlice);
  return lastIndexOf > 0 &&
    /^\d+$/.test(dataModelSchemasSessSlice) &&
    Number.isSafeInteger(number2)
    ? {
        sess: dataModelSchemasSess.slice(0, lastIndexOf),
        i: number2,
      }
    : null;
}

function isDataModelSchemasKind2(
  dataModelSchemasKind2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return !resolveDataModelSchemasSess(dataModelSchemasKind2.startId) ||
    !resolveDataModelSchemasSess(dataModelSchemasKind2.endId)
    ? null
    : {
        kind: `message`,
        body: dataModelSchemasKind2.body,
        parent: {
          object: `node`,
          id: dataModelSchemasKind2.node,
          anchor: {
            kind: `chars`,
            range: [dataModelSchemasKind2.startId, dataModelSchemasKind2.endId],
          },
        },
      };
}

function filterDataModelSchemasKind(
  filterDataModelSchemasKind2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let ids: Dynamic = filterDataModelSchemasKind2.cellIds.filter(
    (cellId?: unknown, ..._extraArguments: unknown[]) =>
      typeof cellId == `string` && cellId !== ``,
  );
  return ids.length === 0 ||
    ids.length !== filterDataModelSchemasKind2.cellIds.length
    ? null
    : {
        kind: `message`,
        body: filterDataModelSchemasKind2.body,
        parent: {
          object: `node`,
          id: filterDataModelSchemasKind2.node,
          anchor: {
            kind: `cells`,
            ids: ids,
          },
        },
      };
}

function isDataModelSchemasUtterance(
  dataModelSchemasUtterance?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (
    resolveDataModelSchemasValue9(
      resolveDataModelSchemasValue9(dataModelSchemasUtterance.address).ref,
    ).object !== `utterance`
  )
    return false;
  let dataModelSchemasValue9: Dynamic = resolveDataModelSchemasValue9(
    dataModelSchemasUtterance.after,
  );
  if (!(`parent` in dataModelSchemasValue9)) return true;
  let dataModelSchemasValue92: Dynamic = resolveDataModelSchemasValue9(
    dataModelSchemasValue9.parent,
  );
  return dataModelSchemasValue92.object === `utterance`
    ? true
    : dataModelSchemasValue92.id === options;
}

function resolveDataModelSchemasResolved(
  dataModelSchemasResolved?: Dynamic,
  pageId?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  for (let resolveDataModelSchemasResolvedResult of dataModelSchemasResolved as Dynamic) {
    let dataModelSchemasValue9: Dynamic = resolveDataModelSchemasValue9(
      resolveDataModelSchemasResolvedResult,
    );
    if (
      typeof dataModelSchemasValue9.id != `string` ||
      dataModelSchemasValue9.id === ``
    )
      continue;
    let dataModelSchemasValue92: Dynamic = resolveDataModelSchemasValue9(
      dataModelSchemasValue9.at,
    );
    let exact: Dynamic =
      [
        resolveDataModelSchemasValue10(dataModelSchemasValue92.quote),
        resolveDataModelSchemasValue10(dataModelSchemasValue92.was),
      ].find(
        (item2?: Dynamic, ..._extraArguments: unknown[]) =>
          item2 !== `` && !isRawAnchorJson(item2),
      ) ?? ``;
    let amount =
      `cells` in dataModelSchemasValue92 ||
      dataModelSchemasValue92.kind === `cells` ||
      (dataModelSchemasValue92.kind === undefined &&
        `ids` in dataModelSchemasValue92 &&
        !(`range` in dataModelSchemasValue92));
    let ids: Dynamic = amount
      ? screenCellIds(
          dataModelSchemasValue92.cells ?? dataModelSchemasValue92.ids,
        )
      : null;
    let amount2 =
      amount ||
      `range` in dataModelSchemasValue92 ||
      `kind` in dataModelSchemasValue92 ||
      `state` in dataModelSchemasValue92 ||
      `quote` in dataModelSchemasValue92 ||
      `was` in dataModelSchemasValue92;
    let matchesState =
      dataModelSchemasValue92.state === `attached` ||
      dataModelSchemasValue92.state === `shrunk`;
    let isArray =
      Array.isArray(dataModelSchemasValue92.range) &&
      dataModelSchemasValue92.range.length === 2 &&
      typeof dataModelSchemasValue92.range[0] == `string` &&
      dataModelSchemasValue92.range[0] === dataModelSchemasValue92.range[1];
    let matchesAtomKindOfQuote = atomKindOfQuote(exact) !== undefined;
    let enabled =
      !amount &&
      matchesState &&
      isArray &&
      (exact === `` || matchesAtomKindOfQuote);
    let amount3 =
      amount2 &&
      !enabled &&
      (dataModelSchemasValue92.state === `detached` ||
        (!exact && ids === null));
    let amount4 = amount3 && matchesAtomKindOfQuote;
    let user: Dynamic = resolveDataModelSchemasAuthor(dataModelSchemasValue9);
    let item =
      [
        dataModelSchemasValue9.created,
        dataModelSchemasValue9.time,
        dataModelSchemasValue9.ts,
      ].find(
        (item2?: unknown, ..._extraArguments: unknown[]) =>
          typeof item2 == `string`,
      ) ?? ``;
    items.push({
      id: dataModelSchemasValue9.id,
      resolved: dataModelSchemasValue9.resolved === true,
      target: {
        pageId: pageId,
        anchor: {
          kind: `lfile`,
          ref: context,
        },
        ...(exact
          ? {
              quote: {
                prefix: ``,
                exact: exact,
                suffix: ``,
              },
            }
          : {}),
        ...(ids === null
          ? {}
          : {
              cells: {
                ids: ids,
              },
            }),
        ...(enabled || amount4
          ? {
              atomAnchor: true,
            }
          : {}),
        ...(amount3
          ? {
              anchorDropped: true,
              anchorWas: amount && ids === null ? `table cells` : ``,
            }
          : {}),
      },
      root: {
        id: dataModelSchemasValue9.id,
        user: user,
        actor: resolveDataModelSchemasHuman(user, dataModelSchemasValue9.via),
        at: item,
        body: resolveDataModelSchemasValue10(dataModelSchemasValue9.body),
      },
      replies: Array.isArray(dataModelSchemasValue9.replies)
        ? dataModelSchemasValue9.replies.flatMap(
            (reply?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              resolveDataModelSchemasUser(reply, user),
          )
        : [],
    });
  }
  return items;
}

function getDataModelSchemasTmp(
  dataModelSchemasTmp?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let uniqueItems: Dynamic = new (Set as Dynamic)(
    options.map(
      (option?: Dynamic, ..._extraArguments: unknown[]): Dynamic => option.id,
    ),
  );
  let lookup: Dynamic = new (Map as Dynamic)(
    dataModelSchemasTmp.map(
      (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => [
        rolldownNImport2.id,
        rolldownNImport2,
      ],
    ),
  );
  return [
    ...options.map(
      (rolldownRImport2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        let lookupEntry: Dynamic = lookup.get(rolldownRImport2.id);
        return lookupEntry === undefined
          ? rolldownRImport2
          : getDataModelSchemasReactions(rolldownRImport2, lookupEntry);
      },
    ),
    ...dataModelSchemasTmp.filter(
      (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        rolldownNImport2.id.startsWith(`tmp-`) &&
        !uniqueItems.has(rolldownNImport2.id),
    ),
  ];
}

function updateDataModelSchemasQuote(
  updateDataModelSchemasQuote2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let lookup: Dynamic = new (Map as Dynamic)();
  for (let event of updateDataModelSchemasQuote2 as Dynamic) {
    let quote: Dynamic = event.target.quote;
    if (
      !(
        quote === undefined ||
        quote.exact === `` ||
        event.target.atomAnchor === true ||
        event.target.cells !== undefined
      )
    ) {
      if (atomKindOfQuote(quote.exact) === undefined) {
        lookup.set(event.id, {
          quote: quote,
          stands: event.target.anchorDropped !== true,
        });
      }
    }
  }
  return lookup;
}

function updateDataModelSchemasStands(
  updateDataModelSchemasStands3?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let lookup: Dynamic = new (Map as Dynamic)();
  for (let [
    updateDataModelSchemasStandsResult,
    updateDataModelSchemasStandsResult2,
  ] of updateDataModelSchemasStands3 as Dynamic)
    if (
      !updateDataModelSchemasStandsResult2.stands ||
      options?.has(updateDataModelSchemasStandsResult) === true
    ) {
      lookup.set(
        updateDataModelSchemasStandsResult,
        updateDataModelSchemasStandsResult2.quote,
      );
    }
  return lookup;
}

function updateDataModelSchemasStands2(
  updateDataModelSchemasStands22?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let lookup: Dynamic = new (Map as Dynamic)();
  for (let [
    updateDataModelSchemasStands2Result,
    updateDataModelSchemasStands2Result2,
  ] of updateDataModelSchemasStands22 as Dynamic)
    if (
      updateDataModelSchemasStands2Result2.stands &&
      options?.has(updateDataModelSchemasStands2Result) !== true
    ) {
      lookup.set(
        updateDataModelSchemasStands2Result,
        updateDataModelSchemasStands2Result2.quote,
      );
    }
  return lookup;
}

function resolveDataModelSchemasStands(
  dataModelSchemasStands?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  for (let [
    resolveDataModelSchemasStandsResult,
    resolveDataModelSchemasStandsResult2,
  ] of dataModelSchemasStands as Dynamic)
    if (resolveDataModelSchemasStandsResult2.stands) {
      uniqueItems.add(resolveDataModelSchemasStandsResult);
    }
  return uniqueItems;
}

function getDataModelSchemasTarget2(
  dataModelSchemasTarget2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let getDataModelSchemasTarget2Result: Dynamic = null;
  dataModelSchemasTarget2.forEach(
    (
      event?: Dynamic,
      index?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let target: Dynamic = event.target;
      if (
        target.anchorDropped !== true ||
        target.cells !== undefined ||
        target.atomAnchor === true ||
        context?.has(event.id) === true
      )
        return;
      let optionEntry: Dynamic =
        options.get(event.id) ??
        (event.resolved ? dependencies?.get(event.id) : undefined);
      if (optionEntry?.exact === target.quote?.exact) return;
      let target2: Dynamic = {
        ...target,
      };
      if (optionEntry === undefined) {
        delete target2.quote;
      } else {
        target2.quote = optionEntry;
      }
      (getDataModelSchemasTarget2Result ??= dataModelSchemasTarget2.slice())[
        index
      ] = {
        ...event,
        target: target2,
      };
    },
  );
  return getDataModelSchemasTarget2Result ?? dataModelSchemasTarget2;
}

function updateDataModelSchemasOpen(
  updateDataModelSchemasOpen2?: Dynamic,
  all?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (all === undefined)
    return {
      open: getDataModelSchemasTarget2(
        updateDataModelSchemasOpen2,
        context,
        dependencies,
        argument,
      ),
      all: all,
    };
  let all2: Dynamic = getDataModelSchemasTarget2(
    all,
    context,
    dependencies,
    argument,
  );
  if (all2 === all)
    return {
      open: getDataModelSchemasTarget2(
        updateDataModelSchemasOpen2,
        context,
        dependencies,
        argument,
      ),
      all: all,
    };
  let lookup: Dynamic = new (Map as Dynamic)();
  all.forEach(
    (
      rolldownRImport2?: Dynamic,
      index?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (all2[index] !== rolldownRImport2) {
        lookup.set(rolldownRImport2, all2[index]);
      }
    },
  );
  return {
    open: getDataModelSchemasTarget2(
      updateDataModelSchemasOpen2.map(
        (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          lookup.get(rolldownNImport2) ?? rolldownNImport2,
      ),
      context,
      dependencies,
      argument,
    ),
    all: all2,
  };
}

function getDataModelSchemasReactions(
  file?: Dynamic,
  file2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let lookup: Dynamic = new (Map as Dynamic)([
    [file2.root.id, file2.root],
    ...file2.replies.map(
      (reply?: Dynamic, ..._extraArguments: unknown[]): Dynamic => [
        reply.id,
        reply,
      ],
    ),
  ]);
  let getDataModelSchemasReactionsHandler: Dynamic = (
    dataModelSchemasReactions?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let lookupEntry: Dynamic = lookup.get(dataModelSchemasReactions.id);
    return lookupEntry?.reactions !== undefined &&
      dataModelSchemasReactions.reactions === undefined
      ? {
          ...dataModelSchemasReactions,
          reactions: lookupEntry.reactions,
        }
      : dataModelSchemasReactions;
  };
  let record2: Dynamic =
    file.resolved &&
    file.resolvedBy === undefined &&
    file2.resolvedBy !== undefined
      ? {
          resolvedBy: file2.resolvedBy,
          ...(file2.resolveId === undefined
            ? {}
            : {
                resolveId: file2.resolveId,
              }),
        }
      : {};
  return {
    ...file,
    ...record2,
    root: getDataModelSchemasReactionsHandler(file.root),
    replies: file.replies.map(getDataModelSchemasReactionsHandler),
  };
}

var resolveDataModelSchemasAuthor: Dynamic;

var resolveDataModelSchemasHuman: Dynamic;

function resolveDataModelSchemasUser(
  dataModelSchemasUser?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dataModelSchemasValue9: Dynamic =
    resolveDataModelSchemasValue9(dataModelSchemasUser);
  if (typeof dataModelSchemasValue9.id != `string`) return [];
  let user: Dynamic =
    resolveDataModelSchemasAuthor(dataModelSchemasValue9) || options;
  return [
    {
      id: dataModelSchemasValue9.id,
      user: user,
      actor: resolveDataModelSchemasHuman(user, dataModelSchemasValue9.via),
      at: resolveDataModelSchemasValue10(dataModelSchemasValue9.created),
      body: resolveDataModelSchemasValue10(dataModelSchemasValue9.body),
    },
  ];
}

var resolveDataModelSchemasValue9: Dynamic;

var resolveDataModelSchemasValue10: Dynamic;

var dataModelSchemasPattern16: RegExp;

var resolveDataModelSchemasIsFinite: Dynamic;

var resolveDataModelSchemasIsInteger: Dynamic;

var dataModelSchemasValue256: number;

var dataModelSchemasPattern17: RegExp;

var dataModelSchemasSet7: Dynamic;

var resolveDataModelSchemasTest4: Dynamic;

function resolveDataModelSchemasBid2(
  ask?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!(typeof ask.bid != `string` || !dataModelSchemasPattern16.test(ask.bid)))
    return resolveDataModelSchemasIsInteger(ask.start) &&
      resolveDataModelSchemasIsInteger(ask.end) &&
      ask.start <= ask.end
      ? {
          bid: ask.bid,
          start: ask.start,
          end: ask.end,
        }
      : {
          bid: ask.bid,
        };
}

function resolveDataModelSchemasBid3(
  dataModelSchemasBid3?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  let create2: Dynamic = Object.create(null);
  if (!dataModelSchemasBid3 || typeof dataModelSchemasBid3 != `object`)
    return create2;
  let index = 0;
  for (let [
    resolveDataModelSchemasBid3Result,
    resolveDataModelSchemasBid3Result2,
  ] of Object.entries(dataModelSchemasBid3) as Dynamic) {
    if (++index > dataModelSchemasValue256) break;
    if (!resolveDataModelSchemasTest4(resolveDataModelSchemasBid3Result))
      continue;
    let resolveDataModelSchemasBid3Result3: Dynamic =
      resolveDataModelSchemasBid3Result2;
    if (
      !(
        !resolveDataModelSchemasBid3Result3 ||
        typeof resolveDataModelSchemasBid3Result3 != `object` ||
        typeof resolveDataModelSchemasBid3Result3.bid != `string` ||
        !dataModelSchemasPattern16.test(
          resolveDataModelSchemasBid3Result3.bid,
        ) ||
        !resolveDataModelSchemasIsFinite(
          resolveDataModelSchemasBid3Result3.left,
        )
      )
    ) {
      create2[resolveDataModelSchemasBid3Result] =
        resolveDataModelSchemasIsInteger(
          resolveDataModelSchemasBid3Result3.start,
        ) &&
        resolveDataModelSchemasIsInteger(
          resolveDataModelSchemasBid3Result3.end,
        ) &&
        resolveDataModelSchemasBid3Result3.start <=
          resolveDataModelSchemasBid3Result3.end
          ? {
              bid: resolveDataModelSchemasBid3Result3.bid,
              left: resolveDataModelSchemasBid3Result3.left,
              start: resolveDataModelSchemasBid3Result3.start,
              end: resolveDataModelSchemasBid3Result3.end,
            }
          : {
              bid: resolveDataModelSchemasBid3Result3.bid,
              left: resolveDataModelSchemasBid3Result3.left,
            };
    }
  }
  return create2;
}

function resolveDataModelSchemasTop(
  dataModelSchemas?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  let create2: Dynamic = Object.create(null);
  if (!dataModelSchemas || typeof dataModelSchemas != `object`) return create2;
  let index = 0;
  for (let [
    resolveDataModelSchemasTopResult,
    resolveDataModelSchemasTopResult2,
  ] of Object.entries(dataModelSchemas) as Dynamic) {
    if (++index > dataModelSchemasValue256) break;
    if (
      !resolveDataModelSchemasTest4(resolveDataModelSchemasTopResult) ||
      !dataModelSchemasPattern16.test(resolveDataModelSchemasTopResult)
    )
      continue;
    let resolveDataModelSchemasTopResult3: Dynamic =
      resolveDataModelSchemasTopResult2;
    if (
      !(
        !resolveDataModelSchemasTopResult3 ||
        typeof resolveDataModelSchemasTopResult3 != `object` ||
        !resolveDataModelSchemasIsFinite(
          resolveDataModelSchemasTopResult3.top,
        ) ||
        !resolveDataModelSchemasIsFinite(
          resolveDataModelSchemasTopResult3.left,
        ) ||
        !resolveDataModelSchemasIsFinite(
          resolveDataModelSchemasTopResult3.width,
        ) ||
        !resolveDataModelSchemasIsFinite(
          resolveDataModelSchemasTopResult3.height,
        )
      )
    ) {
      create2[resolveDataModelSchemasTopResult] = {
        top: resolveDataModelSchemasTopResult3.top,
        left: resolveDataModelSchemasTopResult3.left,
        width: resolveDataModelSchemasTopResult3.width,
        height: resolveDataModelSchemasTopResult3.height,
      };
    }
  }
  return create2;
}

var DataModelSchemasFreeze: Readonly<{}>;

var dataModelSchemasValue512: number;

var resolveDataModelSchemasReduce: Dynamic;

function resolveDataModelSchemasEntries(
  dataModelSchemasEntries?: unknown,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    !context ||
    !dataModelSchemasEntries ||
    typeof dataModelSchemasEntries != `object` ||
    Array.isArray(dataModelSchemasEntries)
  )
    return DataModelSchemasFreeze;
  let uniqueItems: Dynamic = new (Set as Dynamic)(options);
  let record2: Dynamic = {};
  let index = 0;
  for (let [items, items2] of Object.entries(
    dataModelSchemasEntries,
  ) as Dynamic)
    if (
      !(
        items.length === 0 ||
        items.length > 128 ||
        !uniqueItems.has(items) ||
        typeof items2 != `string` ||
        items2.length > 64 ||
        !dataModelSchemasPattern16.test(items2)
      ) &&
      ((record2[items] = items2), ++index >= dataModelSchemasValue512)
    )
      break;
  return index === 0 ? DataModelSchemasFreeze : record2;
}

var isDataModelSchemasKeys: Dynamic;

function resolveDataModelSchemasHasOwn3(
  dataModelSchemasHasOwn3?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (options == null || !Object.hasOwn(dataModelSchemasHasOwn3, options))
    return dataModelSchemasHasOwn3;
  let {
    [options]: dataModelSchemasHasOwn32,
    ...dataModelSchemasHasOwn33
  }: Dynamic = dataModelSchemasHasOwn3;
  return dataModelSchemasHasOwn33;
}

function isDataModelSchemasHeading(
  dataModelSchemasHeading?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let lookup: Dynamic = new (Map as Dynamic)();
  let hidden: Dynamic = new (Set as Dynamic)();
  for (let isDataModelSchemasHeadingResult of dataModelSchemasHeading as Dynamic) {
    if (
      !Object.hasOwn(options, isDataModelSchemasHeadingResult.id) ||
      !context(isDataModelSchemasHeadingResult)
    )
      continue;
    let dependencies2: Dynamic = dependencies(
      isDataModelSchemasHeadingResult.id,
    );
    if (dependencies2 === undefined || !Number.isFinite(dependencies2))
      continue;
    let heading: Dynamic = options[isDataModelSchemasHeadingResult.id];
    let lookupEntry: Dynamic = lookup.get(heading);
    if (lookupEntry) {
      lookupEntry.ids.push(isDataModelSchemasHeadingResult.id);
      lookupEntry.y = Math.min(lookupEntry.y, dependencies2);
    } else {
      lookup.set(heading, {
        heading: heading,
        y: dependencies2,
        ids: [isDataModelSchemasHeadingResult.id],
      });
    }
    hidden.add(isDataModelSchemasHeadingResult.id);
  }
  return {
    icons: [...lookup.values()].toSorted(
      (
        item?: Dynamic,
        item2?: Dynamic,
        ..._extraArguments: unknown[]
      ): number => item.y - item2.y,
    ),
    hidden: hidden,
    rail: dataModelSchemasHeading.filter(
      (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
        !hidden.has(rolldownNImport2.id),
    ),
  };
}

var resolveDataModelSchemasValue11: Dynamic;

var dataModelSchemasValue40: number;

function resolveDataModelSchemasIsFinite2(
  dataModelSchemasIsFinite2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return Number.isFinite(dataModelSchemasIsFinite2.deltaY)
    ? dataModelSchemasIsFinite2.deltaMode === 1
      ? dataModelSchemasIsFinite2.deltaY * dataModelSchemasValue40
      : dataModelSchemasIsFinite2.deltaMode === 2
        ? dataModelSchemasIsFinite2.deltaY *
          Math.max(options, dataModelSchemasValue40)
        : dataModelSchemasIsFinite2.deltaY
    : 0;
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeDataModelSchemas3Step1(): void {
  (DataModelSchemasArtifactTypeFontsAnthropiconsVariableE7f7e9ca44846912Woff2 = `./artifact-type/fonts/anthropicons-variable.e7f7e9ca44846912.woff2`);
  (DataModelSchemasFamily = []);
  (DataModelSchemasState2 = DataModelSchemasArtifactTypeFontsAnthropiconsVariableE7f7e9ca44846912Woff2);
  (DataModelSchemasFamily2 = {
    family: `Anthropicons-Variable`,
    path: DataModelSchemasArtifactTypeFontsAnthropiconsVariableE7f7e9ca44846912Woff2,
    format: `woff2-variations`,
    desc: `font-weight:400 700;font-display:block`,
  });
  (DataModelSchemasState3 = [
    ...DataModelSchemasFamily,
    DataModelSchemasFamily2,
  ]);
  (DataModelSchemasStyles = `:root{--font-anthropic-sans:"Anthropic Sans";--font-anthropic-serif:"Anthropic Serif";--font-anthropic-mono:"Anthropic Mono"}`);
  (DataModelSchemasState4 = [
    ...DataModelSchemasFamily,
    DataModelSchemasFamily2,
  ]);
  (resolveDataModelSchemasDesc = (
    dataModelSchemasDesc?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    dataModelSchemasDesc.desc ??
    resolveDataModelSchemasNormal(dataModelSchemasDesc.style));
  (resolveDataModelSchemasNormal = (
    dataModelSchemasNormal: Dynamic = `normal`,
    ..._extraArguments: unknown[]
  ) =>
    `font-weight:300 800;font-style:${dataModelSchemasNormal};font-display:swap`);
  (resolveDataModelSchemasNormal2 = (
    dataModelSchemasNormal2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let text = String(
      (dataModelSchemasNormal2 && dataModelSchemasNormal2.family) || ``,
    );
    if (!/^[\w\s-]+$/.test(text)) return ``;
    let style: Dynamic = /^(normal|italic)$/.test(dataModelSchemasNormal2.style)
      ? dataModelSchemasNormal2.style
      : `normal`;
    return `@font-face{font-family:"${text}";src:url("${URL.createObjectURL(
      new Blob([dataModelSchemasNormal2.buf], {
        type: `font/woff2`,
      }),
    )}") format("woff2");font-weight:300 800;font-style:${style};font-display:swap}`;
  });
  (collectDataModelSchemasJoin = (
    collectDataModelSchemasJoin2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    collectDataModelSchemasJoin2
      .map(
        (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
          `@font-face{font-family:"${rolldownNImport2.family}";src:url("${rolldownNImport2.path}") format("${rolldownNImport2.format ?? `woff2`}");${rolldownNImport2.desc ?? resolveDataModelSchemasNormal(rolldownNImport2.style)}}`,
      )
      .join(``));
  collectDataModelSchemasJoin(DataModelSchemasState3);
  (DataModelSchemasEvery = ((
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    items.length > 0 &&
    items.every(
      (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        rolldownNImport2.path.startsWith(`data:`),
    ))(DataModelSchemasFamily));
  (resolveDataModelSchemasStartsWith = (
    dataModelSchemasStarts?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    dataModelSchemasStarts.startsWith(`/_runtime/`) ||
    dataModelSchemasStarts.startsWith(`./artifact-type/fonts/`));
  (DataModelSchemasEvery2 = ((
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    items.length > 0 &&
    items.every(
      (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        resolveDataModelSchemasStartsWith(rolldownNImport2.path),
    ))(DataModelSchemasState3));
  (resolveDataModelSchemasEvery = (
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    items.length > 0 &&
    items.every(
      (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        rolldownNImport2.path.startsWith(`./artifact-type/fonts/`),
    ));
  resolveDataModelSchemasEvery(DataModelSchemasState3);
  (DataModelSchemasState5 = null);
  (DataModelSchemasState6 = DataModelSchemasEvery
    ? collectDataModelSchemasJoin(DataModelSchemasFamily)
    : ``);
  (resolveDataModelSchemasReplace = (
    dataModelSchemasReplace?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => dataModelSchemasReplace.replace(/@font-face\s*\{[^}]*\}/g, ``));
  (dataModelSchemasMap3 = new (Map as Dynamic)());
  (dataModelSchemasSet4 = new (Set as Dynamic)());
  (dataModelSchemasMap4 = new (Map as Dynamic)());
  (collectDataModelSchemasFind = (
    collectDataModelSchemasFind2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    options.map(
      (rolldownRImport2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        let collectDataModelSchemasFind3: Dynamic =
          collectDataModelSchemasFind2.find(
            (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
              rolldownNImport2.family === rolldownRImport2.family &&
              resolveDataModelSchemasDesc(rolldownNImport2) ===
                resolveDataModelSchemasDesc(rolldownRImport2) &&
              (rolldownNImport2.format ?? `woff2`) ===
                (rolldownRImport2.format ?? `woff2`),
          );
        if (!collectDataModelSchemasFind3)
          throw Error(
            `inline font chunk lacks ${rolldownRImport2.family} (${resolveDataModelSchemasDesc(rolldownRImport2)})`,
          );
        return collectDataModelSchemasFind3;
      },
    ));
  (dataModelSchemasMap5 = new (Map as Dynamic)());
  (resolveDataModelSchemasIframe = (
    ..._extraArguments: unknown[]
  ): Dynamic => loadDataModelSchemasCatch2(`iframe`, DataModelSchemasState4));
  (resolveDataModelSchemasValue2 = (
    ..._extraArguments: unknown[]
  ): Dynamic => loadDataModelSchemasCatch2(`tier0`, DataModelSchemasFamily));
  (resolveDataModelSchemasFamily = (
    dataModelSchemasFamily?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let DataModelSchemasState3Item: Dynamic = DataModelSchemasState3[0];
    return (
      dataModelSchemasFamily.family === DataModelSchemasFamily2.family ||
      (dataModelSchemasFamily.family === DataModelSchemasState3Item.family &&
        (dataModelSchemasFamily.style ?? ``) ===
          (DataModelSchemasState3Item.style ?? ``))
    );
  });
  (resolveDataModelSchemasReplace2 = (
    dataModelSchemasReplace2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => dataModelSchemasReplace2.replace(/~1/g, `/`).replace(/~0/g, `~`));
  (resolveDataModelSchemasHasOwn = (
    dataModelSchemasHasOwn?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    Object.hasOwn(dataModelSchemasHasOwn, options)
      ? dataModelSchemasHasOwn[options]
      : undefined);
  (DataModelSchemasState7 = null);
  (DataModelSchemasState8 = null);
  (DataModelSchemasState9 = null);
  (DataModelSchemasState10 = null);
  (resolveDataModelSchemasMatch = (
    dataModelSchemasMatch?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let match: Dynamic = dataModelSchemasMatch.match(/^(.+?)\.\.\.(.+)$/);
    return match
      ? isObservabilityBrowserAndOperationEventsIncludes2(match[1]) ||
          isObservabilityBrowserAndOperationEventsIncludes2(match[2])
      : dataModelSchemasMatch === `.` ||
          dataModelSchemasMatch === `..` ||
          isObservabilityBrowserAndOperationEventsIncludes2(
            dataModelSchemasMatch.replace(/^\./, ``),
          );
  });
  (DataModelSchemasStyles2 = `data:image/png;base64,`);
  (dataModelSchemasValue48000000 = 48e6);
  (resolveDataModelSchemasReplace3 = (
    dataModelSchemasReplace3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    dataModelSchemasReplace3
      .replace(/&/g, `&amp;`)
      .replace(/"/g, `&quot;`)
      .replace(/</g, `&lt;`)
      .replace(/>/g, `&gt;`));
  (DataModelSchemasStyles3 = `.claude-routine{display:flex;flex-direction:column;gap:10px;font:14px/1.4 ui-sans-serif,system-ui,sans-serif}.claude-routine-row{display:flex;align-items:center;gap:12px}.claude-routine-btn{padding:10px 18px;border:0;border-radius:8px;background:#2a78d6;color:#fff;font:500 14px/1 ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif;cursor:pointer;box-shadow:0 1px 3px rgba(42,120,214,.35)}.claude-routine-btn:disabled{opacity:.55;cursor:default}.claude-routine-pill{display:inline-flex;align-items:center;gap:6px;font-size:13px;color:#6b6255}.claude-routine-pill::before{content:'';width:7px;height:7px;border-radius:50%;background:#9aa0a6}.claude-routine-pill.run::before{background:#5b8def;animation:crp 1.2s ease-in-out infinite}.claude-routine-pill.ok::before{background:#3a8f5a}.claude-routine-pill.err::before{background:#c0392b}@keyframes crp{0%,100%{opacity:.35}50%{opacity:1}}.claude-routine-log{font:12px/1.5 ui-monospace,Menlo,monospace;color:#6b6255;white-space:pre-wrap}.claude-routine-runid{color:#5b8def;text-decoration:underline;cursor:pointer}.claude-routine-runid:hover{color:#3b6dd0}.claude-routine-err{color:#c0392b;font-weight:500}.claude-routine-rc{margin-top:6px;padding:8px 14px;border:0;border-radius:8px;background:#2a78d6;color:#fff;font:500 13px/1 ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif;cursor:pointer}.claude-routine-chip{font:12px/1.4 ui-monospace,Menlo,monospace;color:#5b8def;text-decoration:underline;cursor:pointer}.claude-routine-chip:hover{color:#3b6dd0}.claude-routine-reconnect{align-self:flex-start;padding:8px 14px;border:0;border-radius:8px;background:#2a78d6;color:#fff;font:500 13px/1 ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif;cursor:pointer}.claude-routine-artifact{overflow:auto;font:12px/1.5 ui-monospace,Menlo,monospace;color:#6b6255}.claude-routine-table{border-collapse:collapse;font:12px/1.4 ui-monospace,Menlo,monospace}.claude-routine-table td{border:1px solid rgba(15,12,8,.12);padding:3px 8px;color:#6b6255;white-space:nowrap}.claude-routine-pre{margin:0;font:12px/1.5 ui-monospace,Menlo,monospace;color:#6b6255;white-space:pre-wrap}.claude-routine-more{margin-top:4px;font:11px/1.4 ui-sans-serif,system-ui,sans-serif;color:#9aa0a6}.claude-routine-filechip{display:inline-flex;align-items:center;padding:3px 10px;border:1px solid rgba(15,12,8,.12);border-radius:999px;background:#fff;font:12px/1.4 ui-monospace,Menlo,monospace;color:#6b6255}[data-lfile-fn][data-state="starting"] .claude-routine-pill::before,[data-lfile-fn][data-state="running"] .claude-routine-pill::before{background:#5b8def;animation:crp 1.2s ease-in-out infinite}[data-lfile-fn][data-state="ok"] .claude-routine-pill::before{background:#3a8f5a}[data-lfile-fn][data-state="error"] .claude-routine-pill::before,[data-lfile-fn][data-state="disconnected"] .claude-routine-pill::before{background:#c0392b}`);
  (DataModelSchemasTables = `tables/`);
  (DataModelSchemasTopics = `topics/`);
  (dataModelSchemasPattern14 = /^[A-Za-z0-9][\w.-]*$/);
  (dataModelSchemasSet5 = new (Set as Dynamic)([
    `cursor`,
    `embed-trust`,
  ]));
  (dataModelSchemasValue20000 = 2e4);
  (dataModelSchemasValue150000 = 15e4);
  (dataModelSchemasValue3000 = 3e3);
  (dataModelSchemasSet6 = new (Set as Dynamic)([
    `sent`,
    `needs_user`,
    `ended`,
    `failed`,
    `kept`,
    `stopped`,
  ]));
  (resolveDataModelSchemasValue7 = (
    dataModelSchemasValue7?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    dataModelSchemasValue7 !== undefined &&
    !dataModelSchemasSet6.has(dataModelSchemasValue7));
  (resolveDataModelSchemasSummon = (
    post?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    post.summon === true ||
    resolvePlatformSessionAndSourcesClaude(post.body, post.to));
  (resolveDataModelSchemasHasOwn2 = (
    dataModelSchemasHasOwn2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    Object.hasOwn(dataModelSchemasHasOwn2, options)
      ? dataModelSchemasHasOwn2[options]
      : undefined);
  (DataModelSchemasANCHORLABELMAX = createLiveModuleNamespace({
    ANCHOR_LABEL_MAX: (..._extraArguments: unknown[]) => 120,
    CELLS_IDS_MAX: (..._extraArguments: unknown[]) => 400,
    COMMENT_TOOL: (..._extraArguments: unknown[]): Dynamic => COMMENT_TOOL,
    EMOJI_OK: (..._extraArguments: unknown[]) => EMOJI_OK,
    PENDING_ASK_TTL_MS: (..._extraArguments: unknown[]) => PENDING_ASK_TTL_MS,
    QUICK_EMOJI: (..._extraArguments: unknown[]) => QUICK_EMOJI,
    atomChipLabel: (..._extraArguments: unknown[]): Dynamic => atomChipLabel,
    atomKindOfQuote: (..._extraArguments: unknown[]): Dynamic => atomKindOfQuote,
    cellsChipLabel: (..._extraArguments: unknown[]): Dynamic => cellsChipLabel,
    clampAnchorLabel: (..._extraArguments: unknown[]): Dynamic =>
      clampAnchorLabel,
    coerceCellsMeta: (..._extraArguments: unknown[]): Dynamic => coerceCellsMeta,
    coerceMediaMeta: (..._extraArguments: unknown[]): Dynamic => coerceMediaMeta,
    extractMentions: (..._extraArguments: unknown[]): Dynamic => extractMentions,
    filterCorrectionReady: (..._extraArguments: unknown[]): Dynamic =>
      filterCorrectionReady,
    foldOwnsPage: (..._extraArguments: unknown[]): Dynamic => foldOwnsPage,
    isAgentRow: (..._extraArguments: unknown[]): Dynamic => isAgentRow,
    isBuildConversation: (..._extraArguments: unknown[]): Dynamic =>
      isBuildConversation,
    isDatumPinThread: (..._extraArguments: unknown[]): Dynamic =>
      isDatumPinThread,
    isNodeThread: (..._extraArguments: unknown[]): Dynamic => isNodeThread,
    isRawAnchorJson: (..._extraArguments: unknown[]): Dynamic => isRawAnchorJson,
    isRunProgress: (..._extraArguments: unknown[]): Dynamic => isRunProgress,
    latestRunSay: (..._extraArguments: unknown[]): Dynamic => latestRunSay,
    listFilterSaid: (..._extraArguments: unknown[]): Dynamic => listFilterSaid,
    listTitleCount: (..._extraArguments: unknown[]): Dynamic => listTitleCount,
    nodeIdOfThread: (..._extraArguments: unknown[]): Dynamic => nodeIdOfThread,
    quoteWords: (..._extraArguments: unknown[]): Dynamic => quoteWords,
    screenCellIds: (..._extraArguments: unknown[]): Dynamic => screenCellIds,
    segmentOfAnchor: (..._extraArguments: unknown[]): Dynamic => segmentOfAnchor,
    threadRefOf: (..._extraArguments: unknown[]): Dynamic => threadRefOf,
    widgetAnchorOfThread: (..._extraArguments: unknown[]): Dynamic =>
      widgetAnchorOfThread,
  }));
  (DataModelSchemasSlice = RegExp(
    `~el:(${editorAnchorsAndMentionsPattern2.source.slice(1, -1)})$`,
  ));
  (PENDING_ASK_TTL_MS = 10 * 6e4);
  (QUICK_EMOJI = [`👍`, `➕`, `❤️`, `🎉`, `👀`, `😄`, `🚀`, `✅`]);
  (EMOJI_OK = /^\p{Extended_Pictographic}️?\p{Emoji_Modifier}?(‍\p{Extended_Pictographic}️?\p{Emoji_Modifier}?)*$/u);
  (dataModelSchemasPattern15 = /@([\w.+-]+@[\w.-]+\.\w+)/g);
  (DataModelSchemasImage = {
    "[image]": `image`,
    "[media]": `image`,
    "[video]": `video`,
    "[file]": `file`,
    "[date]": `date`,
    "[dropdown]": `dropdown`,
    "[mention]": `mention`,
    "[br]": `br`,
    "[checkbox]": `checkbox`,
    "[atom]": `atom`,
  });
  (DataModelSchemasStyles4 = `\\[(?:media|date|dropdown|mention|br|checkbox|atom)\\]`);
  (DataModelSchemasState11 = RegExp(
    `${DataModelSchemasStyles4}(?:\\s*${DataModelSchemasStyles4})*`,
    `g`,
  ));
  (DataModelSchemasImage2 = {
    image: `Image`,
    video: `Video`,
    file: `File`,
    date: `Date`,
    dropdown: `Dropdown`,
    mention: `Mention`,
    br: `Line break`,
    checkbox: `Checkbox`,
    atom: `Object`,
  });
  (dataModelSchemasKindRangeIdsObjectValues = [
    `kind`,
    `range`,
    `ids`,
    `object`,
    `anchor`,
    `bid`,
  ]);
  (DataModelSchemasState12 = RegExp(
    `#(ln-${PlatformSessionAndSourcesStyles6}|[A-Za-z0-9][A-Za-z0-9-]{3,63})(?:~el:|\\.|$)`,
  ));
  (resolveDataModelSchemasFrame = (
    dataModelSchemasFrame?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    dataModelSchemasFrame === `frame` ||
    dataModelSchemasFrame === `frame_outside`);
  (resolveDataModelSchemasAuthor = (
    dataModelSchemasAuthor?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveDataModelSchemasValue10(dataModelSchemasAuthor.by) ||
    resolveDataModelSchemasValue10(dataModelSchemasAuthor.author));
  (resolveDataModelSchemasHuman = (
    dataModelSchemasHuman?: Dynamic,
    options?: unknown,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    typeof options == `string` &&
    options !== `` &&
    !resolveDataModelSchemasFrame(options)
      ? `agent:${options}`
      : dataModelSchemasHuman.startsWith(`agent:`)
        ? dataModelSchemasHuman
        : `human`);
  (resolveDataModelSchemasValue9 = (
    dataModelSchemasValue9?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof dataModelSchemasValue9 == `object` && dataModelSchemasValue9
      ? dataModelSchemasValue9
      : {});
  (resolveDataModelSchemasValue10 = (
    dataModelSchemasValue10?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof dataModelSchemasValue10 == `string` ? dataModelSchemasValue10 : ``);
  (dataModelSchemasPattern16 = /^(?:bk_[0-9a-f]{6}|[A-Za-z0-9]{1,16}\.\d{1,8})$/);
  (resolveDataModelSchemasIsFinite = (
    dataModelSchemasIsFinite?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof dataModelSchemasIsFinite == `number` &&
    Number.isFinite(dataModelSchemasIsFinite));
  (resolveDataModelSchemasIsInteger = (
    dataModelSchemasIsInteger?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveDataModelSchemasIsFinite(dataModelSchemasIsInteger) &&
    Number.isInteger(dataModelSchemasIsInteger) &&
    dataModelSchemasIsInteger >= 0);
  (dataModelSchemasValue256 = 256);
  (dataModelSchemasPattern17 = /^[A-Za-z0-9_.:~-]{1,128}$/);
  (dataModelSchemasSet7 = new (Set as Dynamic)([
    `__proto__`,
    `constructor`,
    `prototype`,
  ]));
  (resolveDataModelSchemasTest4 = (
    dataModelSchemasTest4?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    dataModelSchemasPattern17.test(dataModelSchemasTest4) &&
    !dataModelSchemasSet7.has(dataModelSchemasTest4));
  (DataModelSchemasFreeze = Object.freeze({}));
  (dataModelSchemasValue512 = 512);
  (resolveDataModelSchemasReduce = (
    dataModelSchemasReduce?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    dataModelSchemasReduce.reduce(
      (
        accumulator?: Dynamic,
        accumulator2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => accumulator + 1 + accumulator2.replies.length,
      0,
    ));
  (isDataModelSchemasKeys = (
    dataModelSchemasKeys?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (dataModelSchemasKeys === options) return true;
    let dataModelSchemasKeysKeys = Object.keys(dataModelSchemasKeys);
    return (
      dataModelSchemasKeysKeys.length === Object.keys(options).length &&
      dataModelSchemasKeysKeys.every(
        (rolldownTImport2?: Dynamic, ..._extraArguments: unknown[]) =>
          dataModelSchemasKeys[rolldownTImport2] === options[rolldownTImport2],
      )
    );
  });
  (resolveDataModelSchemasValue11 = (
    dataModelSchemasValue11?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    dependencies?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    dataModelSchemasValue11 !== undefined &&
    dataModelSchemasValue11 > -context &&
    (options <= 0 || dataModelSchemasValue11 + dependencies <= options));
  (dataModelSchemasValue40 = 40);
}

export {
  DataModelSchemasANCHORLABELMAX,
  DataModelSchemasFamily,
  DataModelSchemasFamily2,
  DataModelSchemasFreeze,
  DataModelSchemasState2,
  DataModelSchemasState3,
  DataModelSchemasState6,
  DataModelSchemasStyles,
  DataModelSchemasStyles3,
  EMOJI_OK,
  PENDING_ASK_TTL_MS,
  QUICK_EMOJI,
  atomChipLabel,
  atomKindOfQuote,
  cellsChipLabel,
  clampAnchorLabel,
  clearDataModelSchemasDelete,
  coerceCellsMeta,
  coerceMediaMeta,
  collectDataModelSchemasBuf,
  collectDataModelSchemasJoin,
  collectDataModelSchemasSplit,
  collectDataModelSchemasValue,
  dataModelSchemasPattern16,
  dataModelSchemasValue3000,
  filterCorrectionReady,
  filterDataModelSchemasKind,
  foldOwnsPage,
  getDataModelSchemasTarget2,
  getDataModelSchemasTmp,
  isAgentRow,
  isBuildConversation,
  isDataModelSchemasArm,
  isDataModelSchemasHeading,
  isDataModelSchemasKeys,
  isDataModelSchemasKind2,
  isDataModelSchemasUtterance,
  isDatumPinThread,
  isNodeThread,
  isRawAnchorJson,
  isRunProgress,
  latestRunSay,
  listFilterSaid,
  listTitleCount,
  loadDataModelSchemasCatch,
  loadDataModelSchemasCss,
  loadDataModelSchemasImagePng,
  loadDataModelSchemasKind,
  loadDataModelSchemasResolve,
  loadDataModelSchemasRetired,
  nodeIdOfThread,
  quoteWords,
  resolveDataModelSchemasBid2,
  resolveDataModelSchemasBid3,
  resolveDataModelSchemasEntries,
  resolveDataModelSchemasEvery,
  resolveDataModelSchemasFontWeight,
  resolveDataModelSchemasFrame,
  resolveDataModelSchemasHasOwn,
  resolveDataModelSchemasHasOwn3,
  resolveDataModelSchemasIsFinite2,
  resolveDataModelSchemasLeft2,
  resolveDataModelSchemasMain,
  resolveDataModelSchemasNormal2,
  resolveDataModelSchemasPathname,
  resolveDataModelSchemasPush,
  resolveDataModelSchemasReduce,
  resolveDataModelSchemasReplace,
  resolveDataModelSchemasReplace3,
  resolveDataModelSchemasResolve,
  resolveDataModelSchemasResolved,
  resolveDataModelSchemasRunner,
  resolveDataModelSchemasSourceProject,
  resolveDataModelSchemasStands,
  resolveDataModelSchemasStartsWith,
  resolveDataModelSchemasStartsWith2,
  resolveDataModelSchemasSummon,
  resolveDataModelSchemasTop,
  resolveDataModelSchemasValue11,
  resolveDataModelSchemasValue3,
  resolveDataModelSchemasValue4,
  resolveDataModelSchemasValue5,
  resolveDataModelSchemasValue6,
  resolveDataModelSchemasValue7,
  resolveDataModelSchemasValue8,
  screenCellIds,
  segmentOfAnchor,
  threadRefOf,
  updateDataModelSchemasHerePath,
  updateDataModelSchemasOpen,
  updateDataModelSchemasPath,
  updateDataModelSchemasQuote,
  updateDataModelSchemasSentAs,
  updateDataModelSchemasStands,
  updateDataModelSchemasStands2,
  widgetAnchorOfThread,
};
