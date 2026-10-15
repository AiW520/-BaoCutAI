/** BaoCut: platform images and blobs from app-core-BE6n4d7F.js. */
import type { Dynamic } from "./types";


var platformImagesAndBlobsPattern: RegExp;

var resolvePlatformImagesAndBlobsFromCharCode: Dynamic;

async function loadPlatformImagesAndBlobsDone(
  platformImagesAndBlobsDone?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let reader: Dynamic = platformImagesAndBlobsDone.body?.getReader();
  if (reader === undefined) {
    let uint8Array2: Dynamic = new Uint8Array(
      await platformImagesAndBlobsDone.arrayBuffer(),
    );
    return uint8Array2.byteLength > options ? null : uint8Array2;
  }
  let items: Dynamic = [];
  let count: Dynamic = 0;
  for (;;) {
    let { done: record2, value: record3 }: Dynamic = await reader.read();
    if (record2) break;
    count += record3.byteLength;
    if (count > options) {
      context();
      return null;
    }
    items.push(record3);
  }
  let uint8Array: Dynamic = new Uint8Array(count);
  let count2: Dynamic = 0;
  for (let loadPlatformImagesAndBlobsDoneResult of items as Dynamic) {
    uint8Array.set(loadPlatformImagesAndBlobsDoneResult, count2);
    count2 += loadPlatformImagesAndBlobsDoneResult.byteLength;
  }
  return uint8Array;
}

async function loadPlatformImagesAndBlobsFetcher(
  platformImagesAndBlobsFetcher?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let {
    fetcher: options2,
    origin: options3,
    schedule: options4,
  }: Dynamic = options;
  let maxBytes: Dynamic = options.maxBytes ?? 32768;
  let loadPlatformImagesAndBlobsFetcherResult: Dynamic;
  try {
    loadPlatformImagesAndBlobsFetcherResult = new URL(
      platformImagesAndBlobsFetcher,
    );
  } catch {
    return null;
  }
  if (
    options3 === null ||
    options3 === `null` ||
    loadPlatformImagesAndBlobsFetcherResult.origin !== options3 ||
    loadPlatformImagesAndBlobsFetcherResult.username !== `` ||
    loadPlatformImagesAndBlobsFetcherResult.password !== `` ||
    (loadPlatformImagesAndBlobsFetcherResult.protocol !== `https:` &&
      loadPlatformImagesAndBlobsFetcherResult.protocol !== `http:`) ||
    options2 === null
  )
    return null;
  let abortController = new AbortController();
  let options5: Dynamic = options4?.(
    (..._extraArguments: unknown[]) => abortController.abort(),
    options.timeoutMs ?? 1e4,
  );
  try {
    let options6: Dynamic = await options2(
      loadPlatformImagesAndBlobsFetcherResult.href,
      {
        credentials: `same-origin`,
        referrerPolicy: `no-referrer`,
        redirect: `manual`,
        signal: abortController.signal,
      },
    );
    if (options6.type === `opaqueredirect` || !options6.ok) return null;
    let match = platformImagesAndBlobsPattern.exec(
      options6.headers.get(`content-type`) ?? ``,
    );
    if (match === null) return null;
    let number2 = Number(options6.headers.get(`content-length`));
    if (Number.isFinite(number2) && number2 > maxBytes) return null;
    let platformImagesAndBlobsDone: Dynamic =
      await loadPlatformImagesAndBlobsDone(
        options6,
        maxBytes,
        (..._extraArguments: unknown[]) => abortController.abort(),
      );
    return platformImagesAndBlobsDone === null ||
      platformImagesAndBlobsDone.byteLength === 0
      ? null
      : `data:image/${match[1].toLowerCase()};base64,${resolvePlatformImagesAndBlobsFromCharCode(platformImagesAndBlobsDone)}`;
  } catch {
    return null;
  } finally {
    options5?.();
  }
}

function loadPlatformImagesAndBlobsInline(
  platformImagesAndBlobsInline?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let {
    inline: platformImagesAndBlobsInline2,
    fresh: platformImagesAndBlobsInline3,
    now: platformImagesAndBlobsInline4,
  }: Dynamic = platformImagesAndBlobsInline;
  let retryMs: Dynamic = platformImagesAndBlobsInline.retryMs ?? 6e4;
  let retryCapMs: Dynamic = platformImagesAndBlobsInline.retryCapMs ?? 18e5;
  let recheckMs: Dynamic = platformImagesAndBlobsInline.recheckMs ?? 18e5;
  let maxAgeMs: Dynamic = platformImagesAndBlobsInline.maxAgeMs ?? 36e5;
  let maxPeople: Dynamic = platformImagesAndBlobsInline.maxPeople ?? 512;
  let lookup: Dynamic = new (Map as Dynamic)();
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let index = 0;
  let platformImagesAndBlobsInline5 = (
    ..._extraArguments: unknown[]
  ): undefined => {
    index++;
    for (let loadPlatformImagesAndBlobsInlineResult of uniqueItems as Dynamic)
      try {
        loadPlatformImagesAndBlobsInlineResult();
      } catch {}
  };
  let enabled = false;
  let queueMicrotask2 = (..._extraArguments: unknown[]): undefined => {
    if (!enabled) {
      enabled = true;
      queueMicrotask((..._extraArguments: unknown[]): undefined => {
        enabled = false;
        platformImagesAndBlobsInline5();
      });
    }
  };
  let loadPlatformImagesAndBlobsInlineHandler: Dynamic = (
    platformImagesAndBlobsInline8?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    Promise.resolve()
      .then(
        (..._extraArguments: unknown[]): Dynamic =>
          platformImagesAndBlobsInline2(platformImagesAndBlobsInline8),
      )
      .then(
        (result?: unknown, ..._extraArguments: unknown[]) =>
          typeof result == `string` && result.startsWith(`data:`)
            ? result
            : null,
        (..._extraArguments: unknown[]) => null,
      );
  let lookup2: Dynamic = new (Map as Dynamic)();
  let enabled2 = false;
  let startsWith = async (
    ..._extraArguments: unknown[]
  ): Promise<undefined> => {
    if (!enabled2) {
      enabled2 = true;
      try {
        for (; lookup2.size > 0; ) {
          let items: Dynamic = [...lookup2];
          lookup2.clear();
          let result: Dynamic = await Promise.resolve()
            .then(
              (..._extraArguments: unknown[]): Dynamic =>
                platformImagesAndBlobsInline3(
                  items.map(
                    (
                      [rolldownNImport2]: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic => rolldownNImport2,
                  ),
                ),
            )
            .catch((..._extraArguments: unknown[]) => null);
          let result2: Dynamic =
            typeof result == `object` && result ? result : {};
          for (let [
            loadPlatformImagesAndBlobsInlineResult,
            loadPlatformImagesAndBlobsInlineResult2,
          ] of items as Dynamic) {
            let resultItem: Dynamic = Object.hasOwn(
              result2,
              loadPlatformImagesAndBlobsInlineResult,
            )
              ? result2[loadPlatformImagesAndBlobsInlineResult]
              : ``;
            if (
              typeof resultItem != `string` ||
              resultItem === `` ||
              resultItem.startsWith(`data:`)
            ) {
              loadPlatformImagesAndBlobsInlineResult2(null);
            } else {
              loadPlatformImagesAndBlobsInlineHandler(resultItem).then(
                loadPlatformImagesAndBlobsInlineResult2,
              );
            }
          }
        }
      } finally {
        enabled2 = false;
      }
    }
  };
  let platformImagesAndBlobsInline6: Dynamic = (
    platformImagesAndBlobsInline8?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    platformImagesAndBlobsInline8.fails === 0 ||
    platformImagesAndBlobsInline4() - platformImagesAndBlobsInline8.failedAt >=
      Math.min(
        retryMs * 2 ** (platformImagesAndBlobsInline8.fails - 1),
        retryCapMs,
      );
  let loadPlatformImagesAndBlobsInlineHandler2: Dynamic = (
    platformImagesAndBlobsInline8?: Dynamic,
    activity?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (activity.out || !platformImagesAndBlobsInline6(activity)) return;
    activity.out = true;
    let platformImagesAndBlobsInline9 = (
      platformImagesAndBlobsInline10?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      activity.out = false;
      for (let loadPlatformImagesAndBlobsInlineResult of activity.idle.splice(
        0,
      ) as Dynamic)
        loadPlatformImagesAndBlobsInlineResult();
      if (platformImagesAndBlobsInline10 === null) {
        activity.fails++;
        activity.failedAt = platformImagesAndBlobsInline4();
        return;
      }
      let data: Dynamic = activity.data;
      activity.data = platformImagesAndBlobsInline10;
      activity.at = platformImagesAndBlobsInline4();
      activity.fails = 0;
      if (platformImagesAndBlobsInline10 !== data) {
        platformImagesAndBlobsInline5();
      }
    };
    let startsWith2 = (..._extraArguments: unknown[]): undefined => {
      lookup2.set(platformImagesAndBlobsInline8, platformImagesAndBlobsInline9);
      startsWith();
    };
    if (activity.tried) return startsWith2();
    activity.tried = true;
    loadPlatformImagesAndBlobsInlineHandler(context).then(
      (result?: Dynamic, ..._extraArguments: unknown[]) =>
        result === null ? startsWith2() : platformImagesAndBlobsInline9(result),
    );
  };
  let platformImagesAndBlobsInline7: Dynamic = (
    activity?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    activity !== undefined &&
    activity.data !== null &&
    platformImagesAndBlobsInline4() - activity.at < maxAgeMs;
  return {
    src(
      platformImagesAndBlobsInline8?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let lookupEntry: Dynamic =
        platformImagesAndBlobsInline8 === ``
          ? undefined
          : lookup.get(platformImagesAndBlobsInline8);
      if (platformImagesAndBlobsInline7(lookupEntry)) {
        if (platformImagesAndBlobsInline4() - lookupEntry.at >= recheckMs) {
          loadPlatformImagesAndBlobsInlineHandler2(
            platformImagesAndBlobsInline8,
            lookupEntry,
            options,
          );
        }
        return lookupEntry.data;
      }
      if (lookupEntry !== undefined && lookupEntry.data !== null) {
        lookupEntry.data = null;
        queueMicrotask2();
      }
      if (options === `` || options.startsWith(`data:`)) return options;
      if (platformImagesAndBlobsInline8 === ``) return ``;
      if (lookupEntry === undefined) {
        if (lookup.size >= maxPeople) return ``;
        lookupEntry = {
          data: null,
          at: 0,
          out: false,
          idle: [],
          tried: false,
          fails: 0,
          failedAt: 0,
        };
        lookup.set(platformImagesAndBlobsInline8, lookupEntry);
      }
      loadPlatformImagesAndBlobsInlineHandler2(
        platformImagesAndBlobsInline8,
        lookupEntry,
        options,
      );
      return ``;
    },
    held(
      platformImagesAndBlobsInline8?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let lookupEntry: Dynamic =
        platformImagesAndBlobsInline8 === ``
          ? undefined
          : lookup.get(platformImagesAndBlobsInline8);
      return platformImagesAndBlobsInline7(lookupEntry)
        ? lookupEntry.data
        : options === `` || options.startsWith(`data:`)
          ? options
          : ``;
    },
    settled(
      platformImagesAndBlobsInline8?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let lookupEntry: Dynamic = lookup.get(platformImagesAndBlobsInline8);
      return lookupEntry === undefined || !lookupEntry.out
        ? Promise.resolve()
        : new (Promise as Dynamic)(
            (resolve?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              lookupEntry.idle.push(resolve),
          );
    },
    retryFailed(..._extraArguments: unknown[]): undefined {
      let enabled3 = false;
      for (let loadPlatformImagesAndBlobsInlineResult of lookup.values() as Dynamic)
        if (loadPlatformImagesAndBlobsInlineResult.fails !== 0) {
          loadPlatformImagesAndBlobsInlineResult.fails = 0;
          if (loadPlatformImagesAndBlobsInlineResult.data === null) {
            enabled3 = true;
          }
        }
      if (enabled3) {
        platformImagesAndBlobsInline5();
      }
    },
    subscribe(
      platformImagesAndBlobsInline8?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      uniqueItems.add(platformImagesAndBlobsInline8);
      return (..._extraArguments: unknown[]): undefined =>
        void uniqueItems.delete(platformImagesAndBlobsInline8);
    },
    version: (..._extraArguments: unknown[]) => index,
  };
}

var PlatformImagesAndBlobsState: number;

var resolvePlatformImagesAndBlobsSlice: Dynamic;

var resolvePlatformImagesAndBlobsCeil: Dynamic;

var resolvePlatformImagesAndBlobsValue: (platformImagesAndBlobsValue?: Dynamic, options?: Dynamic, context?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolvePlatformImagesAndBlobsBlob: Dynamic;

var platformImagesAndBlobsSqlCodeJsonTextValues: string[];

var PlatformImagesAndBlobsState2: number;

var platformImagesAndBlobsValue128: number;

var resolvePlatformImagesAndBlobsValue2: Dynamic;

var resolvePlatformImagesAndBlobsValue3: Dynamic;

var platformImagesAndBlobsPattern2: RegExp;

function resolvePlatformImagesAndBlobsValue4(
  platformImagesAndBlobsValue4?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    options === `` ||
    !resolvePlatformImagesAndBlobsValue2(platformImagesAndBlobsValue4)
  )
    return {
      ok: false,
    };
  let platformImagesAndBlobsValue42: Dynamic = platformImagesAndBlobsValue4;
  for (let resolvePlatformImagesAndBlobsValue4Result of options.split(
    `.`,
  ) as Dynamic) {
    if (resolvePlatformImagesAndBlobsValue4Result === ``)
      return {
        ok: false,
      };
    if (Array.isArray(platformImagesAndBlobsValue42)) {
      if (
        !platformImagesAndBlobsPattern2.test(
          resolvePlatformImagesAndBlobsValue4Result,
        ) ||
        !(
          Number(resolvePlatformImagesAndBlobsValue4Result) <
          platformImagesAndBlobsValue42.length
        )
      )
        return {
          ok: false,
        };
      platformImagesAndBlobsValue42 =
        platformImagesAndBlobsValue42[
          Number(resolvePlatformImagesAndBlobsValue4Result)
        ];
    } else if (
      resolvePlatformImagesAndBlobsValue2(platformImagesAndBlobsValue42) &&
      Object.hasOwn(
        platformImagesAndBlobsValue42,
        resolvePlatformImagesAndBlobsValue4Result,
      )
    )
      platformImagesAndBlobsValue42 =
        platformImagesAndBlobsValue42[
          resolvePlatformImagesAndBlobsValue4Result
        ];
    else
      return {
        ok: false,
      };
  }
  return {
    ok: true,
    value: platformImagesAndBlobsValue42,
  };
}

var resolvePlatformImagesAndBlobsValue5: Dynamic;

function resolvePlatformImagesAndBlobsCall(
  platformImagesAndBlobsCall?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  try {
    if (
      !resolvePlatformImagesAndBlobsValue2(platformImagesAndBlobsCall) ||
      !resolvePlatformImagesAndBlobsValue2(platformImagesAndBlobsCall.origin)
    )
      return;
    let { call: origin, display: origin2 }: Dynamic =
      platformImagesAndBlobsCall.origin;
    if (
      !resolvePlatformImagesAndBlobsValue2(origin) ||
      !resolvePlatformImagesAndBlobsValue2(origin2)
    )
      return;
    let { connector: connector, tool: tool, args: origin3 }: Dynamic = origin;
    if (
      !resolvePlatformImagesAndBlobsValue3(connector) ||
      !resolvePlatformImagesAndBlobsValue3(tool) ||
      !resolvePlatformImagesAndBlobsValue2(origin3)
    )
      return;
    let args: Dynamic = [];
    let PlatformImagesAndBlobsState22: Dynamic = PlatformImagesAndBlobsState2;
    for (let path of Object.keys(origin2).toSorted() as Dynamic) {
      let platformImagesAndBlobsValue4: Dynamic =
        resolvePlatformImagesAndBlobsValue4(origin3, path);
      let text: Dynamic = platformImagesAndBlobsValue4.ok
        ? resolvePlatformImagesAndBlobsValue5(
            platformImagesAndBlobsValue4.value,
          )
        : undefined;
      if (
        text === undefined ||
        path.length + text.length > PlatformImagesAndBlobsState22
      )
        continue;
      PlatformImagesAndBlobsState22 -= path.length + text.length;
      let originItem: Dynamic = origin2[path];
      args.push({
        path: path,
        render: platformImagesAndBlobsSqlCodeJsonTextValues.includes(originItem)
          ? originItem
          : `text`,
        text: text,
        stored:
          platformImagesAndBlobsValue4.ok &&
          typeof platformImagesAndBlobsValue4.value == `string`,
      });
    }
    return {
      connector: connector,
      tool: tool,
      args: args,
    };
  } catch {
    return;
  }
}

var platformImagesAndBlobsPattern3: RegExp;

var platformImagesAndBlobsPattern4: RegExp;

function resolvePlatformImagesAndBlobsLabel(
  platformImagesAndBlobsLabel?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let label: Dynamic = ``;
  let count: Dynamic = 0;
  let enabled = false;
  for (let resolvePlatformImagesAndBlobsLabelResult of platformImagesAndBlobsLabel as Dynamic) {
    if (
      platformImagesAndBlobsPattern4.test(
        resolvePlatformImagesAndBlobsLabelResult,
      )
    ) {
      enabled = label.length > 0;
      continue;
    }
    if (
      platformImagesAndBlobsPattern3.test(
        resolvePlatformImagesAndBlobsLabelResult,
      )
    )
      continue;
    let label2: Dynamic = enabled
      ? ` ${resolvePlatformImagesAndBlobsLabelResult}`
      : resolvePlatformImagesAndBlobsLabelResult;
    let count2 = enabled ? 2 : 1;
    if (count + count2 > 120 || label.length + label2.length > 128)
      return {
        label: label,
        cut: true,
      };
    label += label2;
    count += count2;
    enabled = false;
  }
  return {
    label: label,
    cut: false,
  };
}

var platformImagesAndBlobsPattern5: RegExp;

var platformImagesAndBlobsPattern6: RegExp;

var platformImagesAndBlobsSet: Dynamic;

var platformImagesAndBlobsSet2: Dynamic;

var platformImagesAndBlobsSet3: Dynamic;

var platformImagesAndBlobsSet4: Dynamic;

var platformImagesAndBlobsSet5: Dynamic;

var platformImagesAndBlobsSet6: Dynamic;

var resolvePlatformImagesAndBlobsValue6: Dynamic;

async function loadPlatformImagesAndBlobsAssets(
  platformImagesAndBlobsAssets?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  if (platformImagesAndBlobsAssets == null) return null;
  if (typeof platformImagesAndBlobsAssets.use == `function`)
    try {
      let use: Dynamic = await platformImagesAndBlobsAssets.use(`assets`);
      if (
        resolvePlatformImagesAndBlobsValue6(use) &&
        typeof use.upload == `function`
      )
        return use;
      if (use === null) return null;
    } catch {}
  let assets: Dynamic = platformImagesAndBlobsAssets.assets;
  return resolvePlatformImagesAndBlobsValue6(assets) &&
    typeof assets.upload == `function`
    ? assets
    : null;
}

var resolvePlatformImagesAndBlobsTest: (platformImagesAndBlobsTest?: Dynamic, ..._extraArguments: unknown[]) => string | null;

var loadPlatformImagesAndBlobsStatus: Dynamic;

async function loadPlatformImagesAndBlobsCode(
  platformImagesAndBlobsCode?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  if (!(options instanceof Blob) || options.size === 0)
    return {
      ok: false,
      code: `invalid_request`,
    };
  let type: Dynamic = context?.type ?? options.type;
  if (!platformImagesAndBlobsSet3.has(type))
    return {
      ok: false,
      code: `unsupported_type`,
    };
  if (options.size > 20971520)
    return {
      ok: false,
      code: `too_large`,
    };
  let platformImagesAndBlobsAssets: Dynamic =
    await loadPlatformImagesAndBlobsAssets(platformImagesAndBlobsCode);
  if (platformImagesAndBlobsAssets === null)
    return {
      ok: false,
      code: `unavailable`,
    };
  let loadPlatformImagesAndBlobsCodeResult: Dynamic;
  try {
    loadPlatformImagesAndBlobsCodeResult =
      await platformImagesAndBlobsAssets.upload.call(
        platformImagesAndBlobsAssets,
        options,
        {
          type: type,
        },
      );
  } catch (error: Dynamic) {
    let code: Dynamic =
      resolvePlatformImagesAndBlobsValue6(error) &&
      typeof error.code == `string`
        ? error.code
        : ``;
    return {
      ok: false,
      code: platformImagesAndBlobsSet6.has(code) ? code : `upstream_error`,
    };
  }
  if (
    !resolvePlatformImagesAndBlobsValue6(
      loadPlatformImagesAndBlobsCodeResult,
    ) ||
    typeof loadPlatformImagesAndBlobsCodeResult.id != `string` ||
    !platformImagesAndBlobsPattern5.test(
      loadPlatformImagesAndBlobsCodeResult.id,
    )
  )
    return {
      ok: false,
      code: `malformed`,
    };
  let url: Dynamic =
    typeof loadPlatformImagesAndBlobsCodeResult.url == `string` &&
    platformImagesAndBlobsPattern6.test(
      loadPlatformImagesAndBlobsCodeResult.url,
    )
      ? loadPlatformImagesAndBlobsCodeResult.url
      : `_blob/${loadPlatformImagesAndBlobsCodeResult.id}`;
  return {
    ok: true,
    id: loadPlatformImagesAndBlobsCodeResult.id,
    url: url,
    contentType:
      typeof loadPlatformImagesAndBlobsCodeResult.contentType == `string`
        ? loadPlatformImagesAndBlobsCodeResult.contentType
        : type,
    bytes:
      typeof loadPlatformImagesAndBlobsCodeResult.sizeBytes == `number`
        ? loadPlatformImagesAndBlobsCodeResult.sizeBytes
        : options.size,
  };
}

async function loadPlatformImagesAndBlobsWhy(
  platformImagesAndBlobsWhy?: unknown,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let platformImagesAndBlobsTest = resolvePlatformImagesAndBlobsTest(options);
  if (
    platformImagesAndBlobsTest === null ||
    typeof platformImagesAndBlobsWhy != `function`
  )
    return {
      ok: false,
      why: `no-route`,
    };
  let response: Dynamic;
  try {
    response = await platformImagesAndBlobsWhy(platformImagesAndBlobsTest);
  } catch {
    return {
      ok: false,
      why: `read-failed`,
    };
  }
  if (response.status === 404 || response.status === 410)
    return {
      ok: false,
      why: `not-found`,
    };
  if (!response.ok)
    return {
      ok: false,
      why: `read-failed`,
    };
  let contentType: Dynamic = (response.headers.get(`content-type`) ?? ``)
    .split(`;`)[0]
    .trim()
    .toLowerCase();
  if (!platformImagesAndBlobsSet5.has(contentType))
    return {
      ok: false,
      why: `not-image`,
    };
  let bytes: Dynamic;
  try {
    bytes = new Uint8Array(await response.arrayBuffer());
  } catch {
    return {
      ok: false,
      why: `read-failed`,
    };
  }
  return bytes.byteLength === 0
    ? {
        ok: false,
        why: `empty`,
      }
    : bytes.byteLength > 20971520
      ? {
          ok: false,
          why: `too-large`,
        }
      : {
          ok: true,
          bytes: bytes,
          contentType: contentType,
        };
}

var platformImagesAndBlobsPattern7: RegExp;

var platformImagesAndBlobsPattern8: RegExp;

var platformImagesAndBlobsPattern9: RegExp;

var PlatformImagesAndBlobsState3: number;

var resolvePlatformImagesAndBlobsValue7: Dynamic;

function resolvePlatformImagesAndBlobsKind(
  platformImagesAndBlobsKind?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (resolvePlatformImagesAndBlobsValue7(platformImagesAndBlobsKind)) {
    if (typeof platformImagesAndBlobsKind.asset == `string`) {
      if (
        !platformImagesAndBlobsPattern7.test(platformImagesAndBlobsKind.asset)
      )
        return;
      let url = resolvePlatformImagesAndBlobsTest(
        platformImagesAndBlobsKind.asset,
      );
      return url === null
        ? undefined
        : {
            kind: `asset`,
            asset: platformImagesAndBlobsKind.asset,
            url: url,
          };
    }
    if (
      !(
        typeof platformImagesAndBlobsKind.sha256 != `string` ||
        !platformImagesAndBlobsPattern8.test(platformImagesAndBlobsKind.sha256)
      )
    )
      return {
        kind: `stored`,
        sha256: platformImagesAndBlobsKind.sha256,
        ...(typeof platformImagesAndBlobsKind.mime == `string`
          ? {
              mime: platformImagesAndBlobsKind.mime,
            }
          : {}),
        ...(typeof platformImagesAndBlobsKind.bytes == `number`
          ? {
              bytes: platformImagesAndBlobsKind.bytes,
            }
          : {}),
      };
  }
}

function resolvePlatformImagesAndBlobsBlob2(
  platformImagesAndBlobsBlob2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let platformImagesAndBlobsBlob2Slice: Dynamic =
    platformImagesAndBlobsBlob2.startsWith(`blob/`)
      ? platformImagesAndBlobsBlob2.slice(5)
      : platformImagesAndBlobsBlob2;
  return platformImagesAndBlobsPattern9.test(platformImagesAndBlobsBlob2Slice)
    ? platformImagesAndBlobsBlob2Slice
    : null;
}

function resolvePlatformImagesAndBlobsValue8(
  platformImagesAndBlobsValue8?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let platformImagesAndBlobsBlob2: Dynamic = resolvePlatformImagesAndBlobsBlob2(
    platformImagesAndBlobsValue8,
  );
  return platformImagesAndBlobsBlob2 === null
    ? null
    : `blob/${platformImagesAndBlobsBlob2}`;
}

var platformImagesAndBlobsMap: Dynamic;

function updatePlatformImagesAndBlobsAsset(
  updatePlatformImagesAndBlobsAsset2?: Dynamic,
  asset?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let platformImagesAndBlobsBlob2: Dynamic = resolvePlatformImagesAndBlobsBlob2(
    updatePlatformImagesAndBlobsAsset2,
  );
  if (
    !(
      platformImagesAndBlobsBlob2 === null ||
      !platformImagesAndBlobsPattern7.test(asset)
    )
  ) {
    platformImagesAndBlobsMap.set(platformImagesAndBlobsBlob2, {
      asset: asset,
    });
  }
}

function clearPlatformImagesAndBlobsBlob(
  clearPlatformImagesAndBlobsBlob2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let platformImagesAndBlobsBlob2: Dynamic =
    resolvePlatformImagesAndBlobsBlob2(options);
  if (platformImagesAndBlobsBlob2 === null) return;
  let record2: Dynamic = clearPlatformImagesAndBlobsBlob2.read({
    object: `blob`,
    id: platformImagesAndBlobsBlob2,
  });
  return record2 === undefined
    ? resolvePlatformImagesAndBlobsKind(
        platformImagesAndBlobsMap.get(platformImagesAndBlobsBlob2),
      )
    : (platformImagesAndBlobsMap.delete(platformImagesAndBlobsBlob2),
      resolvePlatformImagesAndBlobsKind(record2));
}

var PlatformImagesAndBlobsNoBlob: Dynamic;

var resolvePlatformImagesAndBlobsRule: Dynamic;

var resolvePlatformImagesAndBlobsBytes: Dynamic;

async function loadPlatformImagesAndBlobsBytes(
  platformImagesAndBlobsBytes?: unknown,
  entry?: Dynamic,
  context: Dynamic = {},
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  if (entry.kind === `stored`)
    return resolvePlatformImagesAndBlobsRule(`no-byte-road`);
  if (typeof platformImagesAndBlobsBytes != `function`)
    return resolvePlatformImagesAndBlobsRule(`read-failed`);
  let maxBytes: Dynamic = context.maxBytes;
  let response: Dynamic;
  try {
    response = await platformImagesAndBlobsBytes(entry.url);
  } catch {
    return resolvePlatformImagesAndBlobsRule(`read-failed`);
  }
  if (response.status === 404 || response.status === 410)
    return resolvePlatformImagesAndBlobsRule(`not-found`);
  if (!response.ok) return resolvePlatformImagesAndBlobsRule(`read-failed`);
  let number2 = Number(response.headers.get(`content-length`) ?? ``);
  if (maxBytes !== undefined && Number.isFinite(number2) && number2 > maxBytes)
    return resolvePlatformImagesAndBlobsBytes(number2, maxBytes);
  let bytes: Dynamic;
  try {
    bytes = new Uint8Array(await response.arrayBuffer());
  } catch {
    return resolvePlatformImagesAndBlobsRule(`read-failed`);
  }
  if (maxBytes !== undefined && bytes.byteLength > maxBytes)
    return resolvePlatformImagesAndBlobsBytes(bytes.byteLength, maxBytes);
  let contentType: Dynamic = (response.headers.get(`content-type`) ?? ``)
    .split(`;`)[0]
    .trim()
    .toLowerCase();
  return {
    ok: true,
    bytes: bytes,
    contentType: contentType,
  };
}

var resolvePlatformImagesAndBlobsRule2: Dynamic;

function resolvePlatformImagesAndBlobsFatal(
  platformImagesAndBlobsFatal?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let resolvePlatformImagesAndBlobsFatalResult: Dynamic;
  try {
    resolvePlatformImagesAndBlobsFatalResult = new TextDecoder(`utf-8`, {
      fatal: true,
    }).decode(platformImagesAndBlobsFatal);
  } catch {
    return {
      value: null,
      refused: {
        rule: `blob-binary`,
        message: PlatformImagesAndBlobsNoBlob[`blob-binary`],
      },
    };
  }
  if (options === `application/json` || options.endsWith(`+json`))
    try {
      return {
        value: JSON.parse(resolvePlatformImagesAndBlobsFatalResult),
        columns: null,
        run: null,
        at: null,
      };
    } catch {}
  return {
    value: resolvePlatformImagesAndBlobsFatalResult,
    columns: null,
    run: null,
    at: null,
  };
}

async function loadPlatformImagesAndBlobsValue(
  platformImagesAndBlobsValue?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let platformImagesAndBlobsBlob2: Dynamic =
    resolvePlatformImagesAndBlobsBlob2(context);
  let origin: Dynamic =
    platformImagesAndBlobsBlob2 === null
      ? undefined
      : resolvePlatformImagesAndBlobsCall(
          options.read({
            object: `blob`,
            id: platformImagesAndBlobsBlob2,
          }),
        );
  let clearPlatformImagesAndBlobsBlob2: Dynamic =
    clearPlatformImagesAndBlobsBlob(options, context);
  if (clearPlatformImagesAndBlobsBlob2 === undefined)
    return {
      value: null,
      refused: {
        rule: `no-blob`,
        message: PlatformImagesAndBlobsNoBlob[`no-blob`],
      },
    };
  if (
    clearPlatformImagesAndBlobsBlob2.kind === `stored` &&
    clearPlatformImagesAndBlobsBlob2.bytes !== undefined &&
    clearPlatformImagesAndBlobsBlob2.bytes > PlatformImagesAndBlobsState3
  )
    return resolvePlatformImagesAndBlobsRule2(
      resolvePlatformImagesAndBlobsBytes(
        clearPlatformImagesAndBlobsBlob2.bytes,
        PlatformImagesAndBlobsState3,
      ),
    );
  let platformImagesAndBlobsBytes: Dynamic =
    await loadPlatformImagesAndBlobsBytes(
      platformImagesAndBlobsValue,
      clearPlatformImagesAndBlobsBlob2,
      {
        maxBytes: PlatformImagesAndBlobsState3,
      },
    );
  if (!platformImagesAndBlobsBytes.ok)
    return resolvePlatformImagesAndBlobsRule2(platformImagesAndBlobsBytes);
  let platformImagesAndBlobsFatal: Dynamic = resolvePlatformImagesAndBlobsFatal(
    platformImagesAndBlobsBytes.bytes,
    platformImagesAndBlobsBytes.contentType,
  );
  return origin === undefined || `refused` in platformImagesAndBlobsFatal
    ? platformImagesAndBlobsFatal
    : {
        ...platformImagesAndBlobsFatal,
        origin: origin,
      };
}

async function loadPlatformImagesAndBlobsMiss(
  platformImagesAndBlobsMiss?: unknown,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let clearPlatformImagesAndBlobsBlob2: Dynamic =
    clearPlatformImagesAndBlobsBlob(options, context);
  if (clearPlatformImagesAndBlobsBlob2 === undefined)
    return {
      ok: false,
      miss: `transient`,
      why: `no-blob`,
    };
  if (clearPlatformImagesAndBlobsBlob2.kind === `asset`) {
    let platformImagesAndBlobsWhy: Dynamic =
      await loadPlatformImagesAndBlobsWhy(
        platformImagesAndBlobsMiss,
        clearPlatformImagesAndBlobsBlob2.asset,
      );
    return platformImagesAndBlobsWhy.ok
      ? {
          ok: true,
          bytes: platformImagesAndBlobsWhy.bytes,
        }
      : {
          ok: false,
          miss:
            platformImagesAndBlobsWhy.why === `read-failed`
              ? `transient`
              : `absent`,
          why: platformImagesAndBlobsWhy.why,
        };
  }
  let dependencies2: Dynamic = dependencies(
    clearPlatformImagesAndBlobsBlob2.sha256,
  );
  if (dependencies2 === null || typeof platformImagesAndBlobsMiss != `function`)
    return {
      ok: false,
      miss: `absent`,
      why: `no-byte-road`,
    };
  let response: Dynamic;
  try {
    response = await platformImagesAndBlobsMiss(dependencies2);
  } catch {
    return {
      ok: false,
      miss: `transient`,
      why: `read-failed`,
    };
  }
  if (response.status === 404 || response.status === 410)
    return {
      ok: false,
      miss: `absent`,
      why: `not-found`,
    };
  if (!response.ok)
    return {
      ok: false,
      miss: `transient`,
      why: `read-failed`,
    };
  try {
    return {
      ok: true,
      bytes: new Uint8Array(await response.arrayBuffer()),
    };
  } catch {
    return {
      ok: false,
      miss: `transient`,
      why: `read-failed`,
    };
  }
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializePlatformImagesAndBlobsStep1(): void {
  (platformImagesAndBlobsPattern = /^image\/(webp|png|jpeg|gif|avif)(?=\s*(?:;|$))/i);
  (resolvePlatformImagesAndBlobsFromCharCode = (
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let label: Dynamic = ``;
    for (let count: Dynamic = 0; count < items.length; count += 8192)
      label += (String.fromCharCode as Dynamic)(
        ...items.subarray(count, count + 8192),
      );
    return btoa(label);
  });
  (PlatformImagesAndBlobsState = 256 * 1024);
  (resolvePlatformImagesAndBlobsSlice = (
    platformImagesAndBlobsSlice?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let text = String(platformImagesAndBlobsSlice);
    let textSlice: Dynamic = text.slice(0, text.length % 3 || 3);
    for (
      let textSliceCount: Dynamic = textSlice.length;
      textSliceCount < text.length;
      textSliceCount += 3
    )
      textSlice += `,${text.slice(textSliceCount, textSliceCount + 3)}`;
    return textSlice;
  });
  (resolvePlatformImagesAndBlobsCeil = (
    platformImagesAndBlobsCeil?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolvePlatformImagesAndBlobsSlice(
      Math.ceil(platformImagesAndBlobsCeil / 1024),
    ));
  (resolvePlatformImagesAndBlobsValue = (
    platformImagesAndBlobsValue?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `That ${platformImagesAndBlobsValue} is too large to render inline (${resolvePlatformImagesAndBlobsCeil(options)} KiB; ${resolvePlatformImagesAndBlobsCeil(context)} KiB allowed).`);
  (resolvePlatformImagesAndBlobsBlob = (
    platformImagesAndBlobsBlob?: Dynamic,
    options: Dynamic = PlatformImagesAndBlobsState,
    ..._extraArguments: unknown[]
  ) =>
    resolvePlatformImagesAndBlobsValue(
      `blob`,
      platformImagesAndBlobsBlob,
      options,
    ));
  (platformImagesAndBlobsSqlCodeJsonTextValues = [
    `sql`,
    `code`,
    `json`,
    `text`,
    `datetime`,
  ]);
  (PlatformImagesAndBlobsState2 = 256 * 1024);
  (platformImagesAndBlobsValue128 = 128);
  (resolvePlatformImagesAndBlobsValue2 = (
    platformImagesAndBlobsValue2?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof platformImagesAndBlobsValue2 == `object` &&
    !!platformImagesAndBlobsValue2 &&
    !Array.isArray(platformImagesAndBlobsValue2));
  (resolvePlatformImagesAndBlobsValue3 = (
    items?: unknown,
    ..._extraArguments: unknown[]
  ) => typeof items == `string` && items.length <= platformImagesAndBlobsValue128);
  (platformImagesAndBlobsPattern2 = /^(?:0|[1-9][0-9]*)$/);
  (resolvePlatformImagesAndBlobsValue5 = (
    platformImagesAndBlobsValue5?: unknown,
    ..._extraArguments: unknown[]
  ) => {
    if (typeof platformImagesAndBlobsValue5 == `string`)
      return platformImagesAndBlobsValue5;
    let stringify = JSON.stringify(platformImagesAndBlobsValue5, null, 2);
    return typeof stringify == `string` ? stringify : undefined;
  });
  (platformImagesAndBlobsPattern3 = /[\p{Cf}\p{Cs}]/u);
  (platformImagesAndBlobsPattern4 = /[\s\p{Cc}\p{Zl}\p{Zp}]/u);
  (platformImagesAndBlobsPattern5 = /^[A-Za-z0-9_-]{16,64}$/);
  (platformImagesAndBlobsPattern6 = /^_blob\/[A-Za-z0-9_-]+$/);
  (platformImagesAndBlobsSet = new (Set as Dynamic)([
    `image/png`,
    `image/jpeg`,
    `image/gif`,
    `image/webp`,
  ]));
  (platformImagesAndBlobsSet2 = new (Set as Dynamic)([
    `video/mp4`,
    `video/webm`,
  ]));
  (platformImagesAndBlobsSet3 = new (Set as Dynamic)([
    ...platformImagesAndBlobsSet,
    ...platformImagesAndBlobsSet2,
  ]));
  (platformImagesAndBlobsSet4 = new (Set as Dynamic)([
    ...platformImagesAndBlobsSet,
    `image/svg+xml`,
  ]));
  (platformImagesAndBlobsSet5 = new (Set as Dynamic)([
    ...platformImagesAndBlobsSet4,
    ...platformImagesAndBlobsSet2,
  ]));
  (platformImagesAndBlobsSet6 = new (Set as Dynamic)([
    `invalid_request`,
    `too_large`,
    `unsupported_type`,
    `quota_or_state`,
    `rate_limited`,
    `upstream_auth`,
    `capability_disabled`,
    `store_unavailable`,
    `upstream_error`,
    `not_granted`,
    `capability_removed`,
    `transform_error`,
  ]));
  (resolvePlatformImagesAndBlobsValue6 = (
    platformImagesAndBlobsValue6?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof platformImagesAndBlobsValue6 == `object` &&
    !!platformImagesAndBlobsValue6);
  (resolvePlatformImagesAndBlobsTest = (
    platformImagesAndBlobsTest?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    platformImagesAndBlobsPattern5.test(platformImagesAndBlobsTest)
      ? `_blob/${platformImagesAndBlobsTest}`
      : null);
  (loadPlatformImagesAndBlobsStatus = (
      platformImagesAndBlobsStatus?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
    async (
      platformImagesAndBlobsStatus2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> => {
      let platformImagesAndBlobsStatus3: Dynamic =
        await platformImagesAndBlobsStatus(platformImagesAndBlobsStatus2);
      if (
        platformImagesAndBlobsStatus3.status !== 403 ||
        !platformImagesAndBlobsPattern6.test(platformImagesAndBlobsStatus2)
      )
        return platformImagesAndBlobsStatus3;
      try {
        let platformImagesAndBlobsStatus4: Dynamic =
          await platformImagesAndBlobsStatus(`/${platformImagesAndBlobsStatus2}`);
        return platformImagesAndBlobsStatus4.ok
          ? platformImagesAndBlobsStatus4
          : platformImagesAndBlobsStatus3;
      } catch {
        return platformImagesAndBlobsStatus3;
      }
    });
  (platformImagesAndBlobsPattern7 = /^[0-9a-f]{32}$/);
  (platformImagesAndBlobsPattern8 = /^[0-9a-f]{64}$/);
  (platformImagesAndBlobsPattern9 = /^[A-Za-z0-9_-]{1,64}$/);
  (PlatformImagesAndBlobsState3 = PlatformImagesAndBlobsState);
  (resolvePlatformImagesAndBlobsValue7 = (
    platformImagesAndBlobsValue7?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof platformImagesAndBlobsValue7 == `object` &&
    !!platformImagesAndBlobsValue7 &&
    !Array.isArray(platformImagesAndBlobsValue7));
  (platformImagesAndBlobsMap = new (Map as Dynamic)());
  (PlatformImagesAndBlobsNoBlob = {
    "no-blob": `There is no blob with that id in this project.`,
    "no-byte-road": `That blob's bytes were uploaded to Bongo, not to this artifact — they can't load here. Re-add the file to this document.`,
    "not-found": `That blob's file is no longer stored with this artifact (it was removed or never finished uploading).`,
    "read-failed": `That blob's bytes aren't reachable right now.`,
    "blob-too-large": `That blob is too large to render inline.`,
    "blob-binary": `That blob's bytes aren't text — only text blobs read as widget data for now.`,
  });
  (resolvePlatformImagesAndBlobsRule = (
    rule?: Dynamic,
    message: Dynamic = PlatformImagesAndBlobsNoBlob[rule],
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    ok: false,
    rule: rule,
    message: message,
  }));
  (resolvePlatformImagesAndBlobsBytes = (
    bytes?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    ...resolvePlatformImagesAndBlobsRule(
      `blob-too-large`,
      resolvePlatformImagesAndBlobsBlob(bytes, options),
    ),
    bytes: bytes,
  }));
  (resolvePlatformImagesAndBlobsRule2 = (
    { rule: rule, message: message, bytes: bytes }: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    value: null,
    refused: {
      rule: rule,
      message: message,
      ...(bytes === undefined
        ? {}
        : {
            bytes: bytes,
          }),
    },
  }));
}

export {
  loadPlatformImagesAndBlobsCode,
  loadPlatformImagesAndBlobsFetcher,
  loadPlatformImagesAndBlobsInline,
  loadPlatformImagesAndBlobsMiss,
  loadPlatformImagesAndBlobsStatus,
  loadPlatformImagesAndBlobsValue,
  platformImagesAndBlobsSet2,
  resolvePlatformImagesAndBlobsLabel,
  resolvePlatformImagesAndBlobsValue8,
  updatePlatformImagesAndBlobsAsset,
};
