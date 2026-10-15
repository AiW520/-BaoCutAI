/** BaoCut: platform session and sources from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  helloDImport,
  helloLImport,
  helloSImport,
  rolldownNImport,
} from "../dependencies";
import {
  observabilityTelemetrySignedOutReauthRefusedUnavailableValues,
} from "../observability/telemetry-2";
import {
  lazyZod,
} from "../data/lazy-zod";
import {
  resolveDataContentAndReferencesChildId,
  resolveDataContentAndReferencesIndexOf,
  resolveDataContentAndReferencesReplace4,
} from "../data/content-and-references";

var PlatformSessionAndSourcesMessage: string;

var resolvePlatformSessionAndSourcesIncludes: Dynamic;

function resolvePlatformSessionAndSourcesUsers(
  platformSessionAndSourcesUsers?: Dynamic,
  options: Dynamic = ``,
  ..._extraArguments: unknown[]
): Dynamic {
  let platformSessionAndSourcesIncludes: Dynamic =
    resolvePlatformSessionAndSourcesIncludes(platformSessionAndSourcesUsers);
  return platformSessionAndSourcesIncludes.startsWith(`users/`)
    ? platformSessionAndSourcesIncludes
    : `${platformSessionAndSourcesIncludes}/versions/${options || `main`}`;
}

var platformSessionAndSourcesD977576A9BCC788C5DC46686Values: string[];

var resolvePlatformSessionAndSourcesReduce: Dynamic;

function resolvePlatformSessionAndSourcesDisplayName(
  name?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    id: ``,
    name: name,
    displayName: name.split(`/`).pop() ?? name,
    color: resolvePlatformSessionAndSourcesReduce(name),
    state: `shared`,
    meta: `${options.files.length} file${options.files.length === 1 ? `` : `s`} · ${options.versions.length} version${options.versions.length === 1 ? `` : `s`}`,
    fileCount: options.files.length,
    ...options,
  };
}

function resolvePlatformSessionAndSourcesPush(
  platformSessionAndSourcesPush?: Dynamic,
  options?: unknown,
  event?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let platformSessionAndSourcesIncludes: Dynamic =
    resolvePlatformSessionAndSourcesIncludes(platformSessionAndSourcesPush);
  event?.v2;
  let label = `/${platformSessionAndSourcesIncludes}`;
  let items: Dynamic = [];
  if (event?.path) {
    items.push(`path=${encodeURIComponent(event.path)}`);
  }
  if (event?.target) {
    items.push(`target=${encodeURIComponent(event.target)}`);
  }
  return items.length ? `${label}?${items.join(`&`)}` : label;
}

var resolvePlatformSessionAndSourcesValue: Dynamic;

var resolvePlatformSessionAndSourcesIncludes2: Dynamic;

var platformSessionAndSourcesSet: Dynamic;

var resolvePlatformSessionAndSourcesMessage: Dynamic;

var resolvePlatformSessionAndSourcesIncludes3: Dynamic;

var resolvePlatformSessionAndSourcesValue2: Dynamic;

var platformSessionAndSourcesPattern: RegExp;

function resolvePlatformSessionAndSourcesReplace(
  platformSessionAndSourcesReplace?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return platformSessionAndSourcesReplace.replace(
    platformSessionAndSourcesPattern,
    (
      platformSessionAndSourcesReplace2?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      `\\u{${platformSessionAndSourcesReplace2.codePointAt(0).toString(16).toUpperCase()}}`,
  );
}

var platformSessionAndSourcesPattern2: RegExp;

function resolvePlatformSessionAndSourcesToUpperCase(
  platformSessionAndSources?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let toUpperCase = (
    platformSessionAndSources2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `\\u{${platformSessionAndSources2.codePointAt(0).toString(16).toUpperCase()}}`;
  return platformSessionAndSources
    .replace(/\\/g, `\\u{5C}`)
    .replace(platformSessionAndSourcesPattern2, toUpperCase)
    .replace(/[^\S ]/gu, toUpperCase);
}

var isPlatformSessionAndSourcesToLowerCase: Dynamic;

function resolvePlatformSessionAndSourcesWeekday(
  platformSessionAndSourcesWeekday?: Dynamic,
  options: Dynamic = Date.now(),
  context?: Dynamic,
  timeZone?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let date2 = new Date(platformSessionAndSourcesWeekday);
  let max = Math.max(0, Math.round((options - date2.getTime()) / 1e3));
  return max < 60
    ? `now`
    : max < 3600
      ? `${Math.floor(max / 60)}m ago`
      : max < 86400
        ? `${Math.floor(max / 3600)}h ago`
        : max < 7 * 86400
          ? date2.toLocaleDateString(context, {
              weekday: `short`,
              timeZone: timeZone,
            })
          : date2.toLocaleDateString(context, {
              month: `short`,
              day: `numeric`,
              timeZone: timeZone,
            });
}

var platformSessionAndSourcesMap: Dynamic;

var updatePlatformSessionAndSourcesTimeZone: Dynamic;

var resolvePlatformSessionAndSourcesRound: Dynamic;

var resolvePlatformSessionAndSourcesValue3: Dynamic;

var PlatformSessionAndSourcesStyles: string;

var PlatformSessionAndSourcesStyles2: string;

var PlatformSessionAndSourcesStyles3: string;

var PlatformSessionAndSourcesStyles4: string;

var PlatformSessionAndSourcesStyles5: string;

var PlatformSessionAndSourcesState: RegExp;

var PlatformSessionAndSourcesState2: RegExp;

var PlatformSessionAndSourcesState3: RegExp;

var PlatformSessionAndSourcesState4: RegExp;

var PlatformSessionAndSourcesState5: RegExp;

var PlatformSessionAndSourcesState6: RegExp;

var platformSessionAndSourcesSet2: Dynamic;

var platformSessionAndSourcesSet3: Dynamic;

var resolvePlatformSessionAndSourcesValue4: Dynamic;

var resolvePlatformSessionAndSourcesCanSendToClaude: Dynamic;

async function loadPlatformSessionAndSourcesComments(
  platformSessionAndSourcesComments?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  if (platformSessionAndSourcesComments == null) return null;
  if (typeof platformSessionAndSourcesComments.use == `function`)
    try {
      let use: Dynamic =
        await platformSessionAndSourcesComments.use(`comments`);
      if (resolvePlatformSessionAndSourcesCanSendToClaude(use)) return use;
      if (use === null) return null;
    } catch {}
  let comments: Dynamic = platformSessionAndSourcesComments.comments;
  return resolvePlatformSessionAndSourcesCanSendToClaude(comments)
    ? comments
    : null;
}

var platformSessionAndSourcesSet4: Dynamic;

async function loadPlatformSessionAndSourcesUnknown(
  platformSessionAndSourcesUnknown?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let platformSessionAndSourcesComments: Dynamic =
    await loadPlatformSessionAndSourcesComments(
      platformSessionAndSourcesUnknown,
    );
  if (platformSessionAndSourcesComments === null) return `unknown`;
  try {
    let canSendToClaude: Dynamic =
      await platformSessionAndSourcesComments.canSendToClaude();
    return typeof canSendToClaude == `string` &&
      platformSessionAndSourcesSet4.has(canSendToClaude)
      ? canSendToClaude
      : `unknown`;
  } catch {
    return `unknown`;
  }
}

var platformSessionAndSourcesValue4000: number;

function resolvePlatformSessionAndSourcesUnknown(
  platformSessionAndSourcesUnknown?: Dynamic,
  options?: Dynamic,
  context: Dynamic = platformSessionAndSourcesValue4000,
  ..._extraArguments: unknown[]
): Dynamic {
  return new (Promise as Dynamic)(
    (resolve?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let enabled = false;
      let helloImport2 = (
        platformSessionAndSourcesUnknown2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (!enabled) {
          enabled = true;
          options2();
          resolve(platformSessionAndSourcesUnknown2);
        }
      };
      let options2: Dynamic = options(
        (..._extraArguments: unknown[]) => helloImport2(`unknown`),
        context,
      );
      loadPlatformSessionAndSourcesUnknown(
        platformSessionAndSourcesUnknown,
      ).then(helloImport2, (..._extraArguments: unknown[]) =>
        helloImport2(`unknown`),
      );
    },
  );
}

function resolvePlatformSessionAndSourcesUnknown2(
  platformSessionAndSourcesUnknown2?: Dynamic,
  options?: Dynamic,
  context: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let ms: Dynamic = context.ms ?? 4e3;
  let reaskMs: Dynamic = context.reaskMs ?? 1500;
  return new (Promise as Dynamic)(
    (resolve?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let enabled = false;
      let count: number = 0;
      let index: number = 0;
      let helloGImport2 = (
        platformSessionAndSourcesUnknown22?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (!enabled) {
          enabled = true;
          options2();
          options3();
          resolve(platformSessionAndSourcesUnknown22);
        }
      };
      let reasked = (
        platformSessionAndSourcesUnknown22?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        count += 1;
        index += 1;
        if (platformSessionAndSourcesUnknown22 !== undefined)
          try {
            context.reasked?.(platformSessionAndSourcesUnknown22);
          } catch {}
        loadPlatformSessionAndSourcesUnknown(
          platformSessionAndSourcesUnknown2,
        ).then((result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          --index;
          if (!enabled) {
            if (result === `unknown`) {
              if (count < 2) {
                reasked(`unknown`);
              } else {
                if (index === 0) {
                  helloGImport2(`unknown`);
                }
              }
            } else {
              helloGImport2(result);
            }
          }
        });
      };
      let options2: Dynamic = options(
        (..._extraArguments: unknown[]) => helloGImport2(`unknown`),
        ms,
      );
      let options3: Dynamic = options(
        (..._extraArguments: unknown[]): undefined => {
          if (!enabled && count < 2) {
            reasked(`silent`);
          }
        },
        reaskMs,
      );
      reasked();
    },
  );
}

function resolvePlatformSessionAndSourcesUpstreamError(
  error?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let code: Dynamic = resolvePlatformSessionAndSourcesValue4(error)
    ? error.code
    : undefined;
  return typeof code == `string` && platformSessionAndSourcesSet3.has(code)
    ? code
    : `upstream_error`;
}

var platformSessionAndSourcesTextEncoder: TextEncoder;

var resolvePlatformSessionAndSourcesEncode: Dynamic;

var resolvePlatformSessionAndSourcesIsInteger: Dynamic;

function getPlatformSessionAndSourcesStart(
  ask?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!ask || !options || typeof ask.bid != `string`) return null;
  let optionEntry: Dynamic = options.get(ask.bid);
  if (optionEntry === undefined) return null;
  if (ask.start === undefined && ask.end === undefined) return ask;
  if (
    !optionEntry.text ||
    !resolvePlatformSessionAndSourcesIsInteger(ask.start) ||
    !resolvePlatformSessionAndSourcesIsInteger(ask.end) ||
    ask.start > ask.end ||
    ask.end > optionEntry.size
  ) {
    let { start: ask2, end: ask3, ...ask4 }: Dynamic = ask;
    return ask4;
  }
  return ask;
}

var resolvePlatformSessionAndSourcesValue5: (platformSessionAndSourcesValue5?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => string;

function resolvePlatformSessionAndSourcesExec(
  platformSessionAndSourcesExec?: unknown,
  ask?: Dynamic,
  context?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    typeof platformSessionAndSourcesExec != `string` ||
    !ask ||
    typeof ask.bid != `string`
  )
    return null;
  let match = PlatformSessionAndSourcesState5.exec(
    platformSessionAndSourcesExec,
  );
  if (match === null) return null;
  let [, setMatch, match2]: Dynamic = match;
  let bid: Dynamic = ask.bid;
  if (
    !PlatformSessionAndSourcesState.test(setMatch) ||
    !PlatformSessionAndSourcesState2.test(match2) ||
    !PlatformSessionAndSourcesState3.test(bid)
  )
    return null;
  let label = `${setMatch}#${match2}/${bid}`;
  let label2 =
    resolvePlatformSessionAndSourcesIsInteger(ask.start) &&
    resolvePlatformSessionAndSourcesIsInteger(ask.end) &&
    ask.start <= ask.end
      ? `${label}@${ask.start}-${ask.end}`
      : null;
  let label3 =
    typeof context == `string` && PlatformSessionAndSourcesState4.test(context)
      ? `;thread=${context}`
      : null;
  let items = [
    label2 !== null && label3 !== null ? label2 + label3 : null,
    label3 === null ? null : label + label3,
    label2,
    label,
  ];
  for (let resolvePlatformSessionAndSourcesExecResult of items as Dynamic)
    if (
      resolvePlatformSessionAndSourcesExecResult !== null &&
      resolvePlatformSessionAndSourcesTest(
        resolvePlatformSessionAndSourcesExecResult,
      )
    )
      return resolvePlatformSessionAndSourcesExecResult;
  return null;
}

function resolvePlatformSessionAndSourcesBid(
  platformSessionAndSourcesBid?: Dynamic,
  bid?: unknown,
  context?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    typeof bid != `string` ||
    typeof context != `string` ||
    !PlatformSessionAndSourcesState4.test(context)
  )
    return null;
  let platformSessionAndSourcesExec: Dynamic =
    resolvePlatformSessionAndSourcesExec(
      platformSessionAndSourcesBid,
      {
        bid: bid,
      },
      context,
    );
  return platformSessionAndSourcesExec !== null &&
    platformSessionAndSourcesExec.endsWith(`;thread=${context}`)
    ? platformSessionAndSourcesExec
    : null;
}

function resolvePlatformSessionAndSourcesTest(
  platformSessionAndSourcesTest?: unknown,
  ..._extraArguments: unknown[]
) {
  return (
    typeof platformSessionAndSourcesTest == `string` &&
    PlatformSessionAndSourcesState6.test(platformSessionAndSourcesTest) &&
    resolvePlatformSessionAndSourcesEncode(platformSessionAndSourcesTest) <= 128
  );
}

function resolvePlatformSessionAndSourcesRef(
  platformSessionAndSourcesRef?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!resolvePlatformSessionAndSourcesTest(platformSessionAndSourcesRef))
    return null;
  let [, file, node, bid, match, match2, thread]: Dynamic =
    PlatformSessionAndSourcesState6.exec(platformSessionAndSourcesRef);
  let ask: Dynamic = {
    ref: `${file}#${node}`,
    file: file,
    node: node,
    bid: bid,
    ...(thread !== undefined && {
      thread: thread,
    }),
  };
  if (match === undefined) return ask;
  let start = Number(match);
  let end = Number(match2);
  return start <= end
    ? {
        ...ask,
        start: start,
        end: end,
      }
    : null;
}

// BaoCut: 批注发给智能体的状态文案称「the agent」，不称 Claude（键不变）；提及智能体写作「@Agent」（见下面的提及项）。
var PlatformSessionAndSourcesSent: Dynamic;

var PlatformSessionAndSourcesMessage2: string;

var PlatformSessionAndSourcesNoReply: Dynamic;

var resolvePlatformSessionAndSourcesValue6: Dynamic;

// BaoCut: 同上，称「the agent」。
var PlatformSessionAndSourcesClaudeRepliedInTheComments: string;

var resolvePlatformSessionAndSourcesAvailable: Dynamic;

function resolvePlatformSessionAndSourcesConsentRequired(
  platformSessionAndSourcesConsentRequired?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return platformSessionAndSourcesConsentRequired === `consent_required`
    ? `consent`
    : platformSessionAndSourcesConsentRequired === `rate_limited`
      ? `slow_down`
      : platformSessionAndSourcesConsentRequired === `too_long`
        ? `too_long`
        : platformSessionAndSourcesConsentRequired === `no_anchor`
          ? `no_anchor`
          : platformSessionAndSourcesConsentRequired !== `claude_unavailable` &&
              platformSessionAndSourcesConsentRequired !== `no_capability` &&
              platformSessionAndSourcesSet2.has(
                platformSessionAndSourcesConsentRequired,
              )
            ? `off`
            : `unreachable`;
}

var platformSessionAndSourcesSet5: Dynamic;

function resolvePlatformSessionAndSourcesSent(
  platformSessionAndSourcesSent?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return platformSessionAndSourcesSent === undefined ||
    (options !== `sent` && options !== `waiting`)
    ? options
    : platformSessionAndSourcesSent === `ended` ||
        platformSessionAndSourcesSent === `edited` ||
        (context !== `shell` &&
          (platformSessionAndSourcesSet5.has(platformSessionAndSourcesSent) ||
            platformSessionAndSourcesSent === `queued` ||
            platformSessionAndSourcesSent === `still_working`))
      ? platformSessionAndSourcesSent
      : options;
}

function resolvePlatformSessionAndSourcesSent2(
  platformSessionAndSourcesSent2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    platformSessionAndSourcesSent2 === `sent` ||
    platformSessionAndSourcesSent2 === `queued` ||
    platformSessionAndSourcesSent2 === `still_working` ||
    platformSessionAndSourcesSent2 === `needs_user` ||
    platformSessionAndSourcesSent2 === `ended` ||
    platformSessionAndSourcesSent2 === `edited` ||
    platformSessionAndSourcesSent2 === `no_listener`
  );
}

var platformSessionAndSourcesSet6: Dynamic;

var platformSessionAndSourcesSet7: Dynamic;

function resolvePlatformSessionAndSourcesFailed(
  platformSessionAndSourcesFailed?: Dynamic,
  options?: unknown,
  ..._extraArguments: unknown[]
) {
  return platformSessionAndSourcesFailed === `failed` &&
    typeof options == `string` &&
    platformSessionAndSourcesSet7.has(options)
    ? options
    : undefined;
}

function resolvePlatformSessionAndSourcesFailed2(
  platformSessionAndSourcesFailed2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return platformSessionAndSourcesFailed2 === `failed`
    ? options === `no_listener`
      ? `no_listener`
      : options === `reauth` || options === `signed_out`
        ? `sign_in`
        : `not_delivered`
    : platformSessionAndSourcesFailed2 === `kept`
      ? `kept`
      : platformSessionAndSourcesFailed2 === `stopped`
        ? `stopped`
        : platformSessionAndSourcesFailed2 === `queued`
          ? `queued`
          : platformSessionAndSourcesFailed2 === `needs_user`
            ? `needs_user`
            : platformSessionAndSourcesFailed2 === `ended`
              ? `ended`
              : `sent`;
}

// BaoCut: 提及智能体写作「@Agent」；以前的文档与手打的「@Claude」也照样算。
var platformSessionAndSourcesPattern3: RegExp;

function resolvePlatformSessionAndSourcesClaude(
  platformSessionAndSourcesClaude?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    (options?.includes(`claude`) ?? false) ||
    platformSessionAndSourcesPattern3.test(platformSessionAndSourcesClaude)
  );
}

var platformSessionAndSourcesValue3: number;

var platformSessionAndSourcesPattern4: RegExp;

var resolvePlatformSessionAndSourcesReplace2: Dynamic;

function resolvePlatformSessionAndSourcesReplace3(
  platformSessionAndSourcesReplace3?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let platformSessionAndSourcesReplace2: Dynamic =
    resolvePlatformSessionAndSourcesReplace2(platformSessionAndSourcesReplace3);
  for (let index = 0; index < platformSessionAndSourcesValue3; index++) {
    let platformSessionAndSourcesReplace22: Dynamic =
      resolvePlatformSessionAndSourcesReplace2(
        platformSessionAndSourcesReplace2.replace(
          platformSessionAndSourcesPattern2,
          ``,
        ),
      );
    if (
      platformSessionAndSourcesReplace22 === platformSessionAndSourcesReplace2
    )
      break;
    platformSessionAndSourcesReplace2 = platformSessionAndSourcesReplace22;
  }
  return platformSessionAndSourcesReplace2;
}

function resolvePlatformSessionAndSourcesCode(
  platformSessionAndSourcesCode?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let text: Dynamic = resolvePlatformSessionAndSourcesReplace3(
    platformSessionAndSourcesCode.replace(
      /\r\n?/g,
      `
`,
    ),
  ).trim();
  return text === ``
    ? {
        ok: false,
        code: `nothing_to_send`,
      }
    : resolvePlatformSessionAndSourcesEncode(text) > 4096
      ? {
          ok: false,
          code: `too_long`,
        }
      : {
          ok: true,
          text: text,
        };
}

var resolvePlatformSessionAndSourcesIsFinite: Dynamic;

async function loadPlatformSessionAndSourcesCall(
  platformSessionAndSourcesCall?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let platformSessionAndSourcesComments: Dynamic =
    await loadPlatformSessionAndSourcesComments(platformSessionAndSourcesCall);
  let resolve: Dynamic = platformSessionAndSourcesComments?.resolve;
  if (typeof resolve != `function`) return false;
  try {
    await resolve.call(platformSessionAndSourcesComments, options, true);
    return true;
  } catch {
    return false;
  }
}

async function loadPlatformSessionAndSourcesCode(
  platformSessionAndSourcesCode?: Dynamic,
  options?: Dynamic,
  text?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let platformSessionAndSourcesComments: Dynamic =
    await loadPlatformSessionAndSourcesComments(platformSessionAndSourcesCode);
  if (platformSessionAndSourcesComments === null)
    return {
      ok: false,
      code: `no_capability`,
    };
  if (text === null || text === ``)
    return {
      ok: false,
      code: `nothing_to_send`,
    };
  if (
    !options ||
    !resolvePlatformSessionAndSourcesTest(options.path) ||
    !resolvePlatformSessionAndSourcesIsFinite(options.x) ||
    !resolvePlatformSessionAndSourcesIsFinite(options.y)
  )
    return {
      ok: false,
      code: `no_anchor`,
    };
  let ask: Dynamic;
  try {
    ask = await platformSessionAndSourcesComments.sendToClaude({
      anchor: {
        path: options.path,
        x: options.x,
        y: options.y,
      },
      text: text,
    });
  } catch (loadPlatformSessionAndSourcesCodeResult: Dynamic) {
    return {
      ok: false,
      code: resolvePlatformSessionAndSourcesUpstreamError(
        loadPlatformSessionAndSourcesCodeResult,
      ),
    };
  }
  let threadId: Dynamic = resolvePlatformSessionAndSourcesValue4(ask)
    ? ask.threadId
    : undefined;
  return typeof threadId == `string` && threadId !== ``
    ? {
        ok: true,
        threadId: threadId,
      }
    : {
        ok: false,
        code: `malformed`,
      };
}

var PlatformSessionAndSourcesFrameContextCard: string;

var platformSessionAndSourcesValue4096: number;

var platformSessionAndSourcesPattern5: RegExp;

var platformSessionAndSourcesValue4: number;

var platformSessionAndSourcesPattern6: RegExp;

var platformSessionAndSourcesPattern7: RegExp;

var platformSessionAndSourcesPattern8: RegExp;

var platformSessionAndSourcesValue8: number;

function resolvePlatformSessionAndSourcesReplace4(
  platformSessionAndSourcesReplace4?: Dynamic,
  options: Dynamic = platformSessionAndSourcesValue4096,
  ..._extraArguments: unknown[]
): Dynamic {
  let replace: Dynamic = (
    platformSessionAndSourcesReplace42?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    platformSessionAndSourcesReplace42.replace(
      platformSessionAndSourcesPattern8,
      `\uFFFD`,
    );
  let replace2: Dynamic = replace(platformSessionAndSourcesReplace4);
  for (let index = 0; index < platformSessionAndSourcesValue8; index++) {
    let replace3: Dynamic = replace(
      replace2
        .replace(platformSessionAndSourcesPattern2, ``)
        .replace(platformSessionAndSourcesPattern7, ``),
    );
    if (replace3 === replace2) break;
    replace2 = replace3;
  }
  if (replace2.length <= options) return replace2;
  let label: string = ``;
  for (let items of replace2 as Dynamic) {
    if (label.length + items.length > options) break;
    label += items;
  }
  return label;
}

var resolvePlatformSessionAndSourcesTest2: Dynamic;

function resolvePlatformSessionAndSourcesPath(
  ask?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let range: Dynamic =
    ask.range !== undefined && platformSessionAndSourcesPattern6.test(ask.range)
      ? ask.range
      : undefined;
  return {
    id: range ? `${ask.bid}:${range}` : ask.bid,
    path: [ask.file, ask.node],
  };
}

function resolvePlatformSessionAndSourcesText(
  entry?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let text: Dynamic = resolvePlatformSessionAndSourcesReplace4(entry.text);
  if (
    text.trim() === `` ||
    !resolvePlatformSessionAndSourcesTest2(entry.ref.id)
  )
    return null;
  let path: Dynamic = entry.ref.path;
  if (
    path !== undefined &&
    (!Array.isArray(path) ||
      path.length > platformSessionAndSourcesValue4 ||
      !path.every(resolvePlatformSessionAndSourcesTest2))
  )
    return null;
  let title: Dynamic = entry.title
    ? resolvePlatformSessionAndSourcesReplace4(entry.title, 120)
        .replace(/\s+/g, ` `)
        .trim()
    : ``;
  return {
    text: text,
    ref: {
      id: entry.ref.id,
      ...(path === undefined
        ? {}
        : {
            path: [...path],
          }),
    },
    kind: entry.kind,
    ...(title
      ? {
          title: title,
        }
      : {}),
  };
}

var PlatformSessionAndSourcesMessage3: string;

function resolvePlatformSessionAndSourcesTrim(
  platformSessionAndSourcesTrim?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let trim: Dynamic = (
    platformSessionAndSourcesTrim2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolvePlatformSessionAndSourcesReplace4(
      platformSessionAndSourcesTrim2 ?? ``,
      120,
    )
      .replace(/\s+/g, ` `)
      .trim();
  let trimmedText: Dynamic = trim(platformSessionAndSourcesTrim);
  let trimmedText2: Dynamic = trim(options);
  if (trimmedText === `` && trimmedText2 === ``) return;
  if (trimmedText2 === ``) return trimmedText;
  if (trimmedText === ``) return trimmedText2;
  let difference = 120 - trimmedText.length - 3;
  if (difference < 8) return trimmedText;
  if (trimmedText2.length <= difference)
    return `${trimmedText}${PlatformSessionAndSourcesMessage3}${trimmedText2}`;
  let label: string = ``;
  for (let items of trimmedText2 as Dynamic) {
    if (label.length + items.length > difference - 1) break;
    label += items;
  }
  return `${trimmedText}${PlatformSessionAndSourcesMessage3}${label.trimEnd()}…`;
}

var platformSessionAndSourcesValue0: number;

function installPlatformSessionAndSourcesReason(
  installPlatformSessionAndSourcesReason2?: Dynamic,
  options?: Dynamic,
  scheduler?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (installPlatformSessionAndSourcesReason2 === null)
    return Promise.resolve({
      ok: false,
      reason: `no_shell`,
    });
  let targetOrigin: Dynamic = helloLImport(
    installPlatformSessionAndSourcesReason2,
  );
  if (targetOrigin === null)
    return Promise.resolve({
      ok: false,
      reason: `no_shell`,
    });
  let card: Dynamic =
    options === null ? null : resolvePlatformSessionAndSourcesText(options);
  if (options !== null && card === null)
    return Promise.resolve({
      ok: false,
      reason: `invalid`,
    });
  let label = `c${++platformSessionAndSourcesValue0}-${scheduler.random().toString(36).slice(2, 10)}`;
  return new (Promise as Dynamic)(
    (resolve?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let enabled = false;
      let installPlatformSessionAndSourcesReasonResult: Dynamic;
      let helloCImport22: Dynamic = (
        installPlatformSessionAndSourcesReason3?: Dynamic,
        ..._extraArguments: unknown[]
      ) => {
        let helloLImport2: Dynamic = helloLImport(
          installPlatformSessionAndSourcesReason2,
        );
        if (
          helloLImport2 === null ||
          helloLImport2 !== targetOrigin ||
          installPlatformSessionAndSourcesReason3.source !==
            installPlatformSessionAndSourcesReason2.parent ||
          installPlatformSessionAndSourcesReason3.origin !== helloLImport2
        )
          return;
        let data: Dynamic = installPlatformSessionAndSourcesReason3.data;
        if (
          !data ||
          typeof data != `object` ||
          data.type !== `frame-context:card_result` ||
          data.id !== label
        )
          return;
        if (data.ok === true)
          return removeEventListener2({
            ok: true,
          });
        let reason: Dynamic = data.reason;
        removeEventListener2({
          ok: false,
          reason:
            reason === `not_declared` ||
            reason === `no_gesture` ||
            reason === `rate_limited` ||
            reason === `invalid`
              ? reason
              : `invalid`,
        });
      };
      let removeEventListener2 = (
        installPlatformSessionAndSourcesReason3?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (!enabled) {
          enabled = true;
          installPlatformSessionAndSourcesReasonResult?.();
          installPlatformSessionAndSourcesReason2.self.removeEventListener(
            `message`,
            helloCImport22,
          );
          resolve(installPlatformSessionAndSourcesReason3);
        }
      };
      installPlatformSessionAndSourcesReasonResult = scheduler.schedule(
        (..._extraArguments: unknown[]) =>
          removeEventListener2({
            ok: false,
            reason: `timeout`,
          }),
        scheduler.timeoutMs ?? 1500,
      );
      installPlatformSessionAndSourcesReason2.self.addEventListener(
        `message`,
        helloCImport22,
      );
      let record2: Dynamic = {
        type: PlatformSessionAndSourcesFrameContextCard,
        id: label,
        card: card,
      };
      try {
        installPlatformSessionAndSourcesReason2.parent.postMessage(record2, {
          targetOrigin: targetOrigin,
          includeUserActivation: true,
        });
      } catch {
        installPlatformSessionAndSourcesReason2.parent.postMessage(
          record2,
          targetOrigin,
        );
      }
    },
  );
}

var PlatformSessionAndSourcesMessage4: string;

var PlatformSessionAndSourcesAddedToYourMessageToClaude: string;

function resolvePlatformSessionAndSourcesBid2(
  bid?: unknown,
  start?: unknown,
  end?: unknown,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof bid != `string` || !PlatformSessionAndSourcesState3.test(bid))
    return null;
  let platformSessionAndSourcesStart: Dynamic =
    getPlatformSessionAndSourcesStart(
      typeof start == `number` && typeof end == `number`
        ? {
            bid: bid,
            start: start,
            end: end,
          }
        : {
            bid: bid,
          },
      dependencies,
    );
  return platformSessionAndSourcesStart
    ? platformSessionAndSourcesStart.start !== undefined &&
      platformSessionAndSourcesStart.end !== undefined
      ? {
          bid: platformSessionAndSourcesStart.bid,
          range: `${platformSessionAndSourcesStart.start}-${platformSessionAndSourcesStart.end}`,
        }
      : {
          bid: platformSessionAndSourcesStart.bid,
        }
    : null;
}

var platformSessionAndSourcesSet8: Dynamic;

var resolvePlatformSessionAndSourcesValue7: Dynamic;

var resolvePlatformSessionAndSourcesCanSendToClaudeSession: Dynamic;

async function loadPlatformSessionAndSourcesRoom(
  platformSessionAndSourcesRoom?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  if (typeof platformSessionAndSourcesRoom.use == `function`)
    try {
      let use: Dynamic = await platformSessionAndSourcesRoom.use(`room`);
      if (resolvePlatformSessionAndSourcesCanSendToClaudeSession(use))
        return use;
      if (use === null) return null;
    } catch {}
  return resolvePlatformSessionAndSourcesCanSendToClaudeSession(
    platformSessionAndSourcesRoom.room,
  )
    ? platformSessionAndSourcesRoom.room
    : null;
}

async function loadPlatformSessionAndSourcesUnknown2(
  platformSessionAndSourcesUnknown2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (platformSessionAndSourcesUnknown2 == null) return `unknown`;
  try {
    let platformSessionAndSourcesRoom: Dynamic =
      await loadPlatformSessionAndSourcesRoom(
        platformSessionAndSourcesUnknown2,
      );
    if (platformSessionAndSourcesRoom === null) return `unknown`;
    let canSendToClaudeSession: Dynamic =
      await platformSessionAndSourcesRoom.canSendToClaudeSession();
    return typeof canSendToClaudeSession == `string` &&
      platformSessionAndSourcesSet8.has(canSendToClaudeSession)
      ? canSendToClaudeSession
      : `unknown`;
  } catch {
    return `unknown`;
  }
}

var platformSessionAndSourcesValue3000: number;

function isPlatformSessionAndSourcesState(
  platformSessionAndSourcesState?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let label: string = `unasked`;
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let platformSessionAndSourcesState2 = (
    platformSessionAndSourcesState3?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (platformSessionAndSourcesState3 !== label) {
      label = platformSessionAndSourcesState3;
      for (let isPlatformSessionAndSourcesStateResult of Array.from<Dynamic>(
        uniqueItems,
      ) as Dynamic)
        isPlatformSessionAndSourcesStateResult();
    }
  };
  return {
    state: (..._extraArguments: unknown[]): string => label,
    subscribe(
      platformSessionAndSourcesState3?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      uniqueItems.add(platformSessionAndSourcesState3);
      return (..._extraArguments: unknown[]): Dynamic =>
        uniqueItems.delete(platformSessionAndSourcesState3);
    },
    ask(..._extraArguments: unknown[]) {
      if (label !== `unasked`) return false;
      platformSessionAndSourcesState2(`pending`);
      let options2: Dynamic = options?.(
        (..._extraArguments: unknown[]): undefined => {
          if (label === `pending`) {
            platformSessionAndSourcesState2(`unknown`);
          }
        },
        platformSessionAndSourcesValue3000,
      );
      loadPlatformSessionAndSourcesUnknown2(
        platformSessionAndSourcesState(),
      ).then((result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        options2?.();
        if (label === `pending` || result !== `unknown`) {
          platformSessionAndSourcesState2(result);
        }
      });
      return true;
    },
  };
}

var PlatformSessionAndSourcesStyles6: string;

var PlatformSessionAndSourcesState7: RegExp;

var platformSessionAndSourcesPattern9: RegExp;

var resolvePlatformSessionAndSourcesNode: Dynamic;

var platformSessionAndSourcesPattern10: RegExp;

var resolvePlatformSessionAndSourcesTest3: Dynamic;

var resolvePlatformSessionAndSourcesTest4: Dynamic;

var resolvePlatformSessionAndSourcesTest5: Dynamic;

var resolvePlatformSessionAndSourcesTest6: Dynamic;

var resolvePlatformSessionAndSourcesValue8: (platformSessionAndSourcesValue82?: Dynamic, ..._extraArguments: unknown[]) => string;

var PlatformSessionAndSources0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz: string;

var resolvePlatformSessionAndSourcesGetRandomValues: (..._extraArguments: unknown[]) => number;

function resolvePlatformSessionAndSourcesValue9(
  platformSessionAndSourcesValue9: Dynamic = resolvePlatformSessionAndSourcesGetRandomValues,
  ..._extraArguments: unknown[]
) {
  let label: string = ``;
  for (let index = 0; index < 8; index++)
    label +=
      PlatformSessionAndSources0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz[
        Math.min(61, (platformSessionAndSourcesValue9() * 62) | 0)
      ];
  return `ln-${label}`;
}

var platformSessionAndSourcesPattern11: RegExp;

var resolvePlatformSessionAndSourcesTest7: Dynamic;

function resolvePlatformSessionAndSourcesRest(
  platformSessionAndSourcesRest?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let platformSessionAndSourcesRest2: Dynamic =
    platformSessionAndSourcesRest.startsWith(`#`)
      ? platformSessionAndSourcesRest
      : `#${platformSessionAndSourcesRest}`;
  if (!platformSessionAndSourcesPattern11.test(platformSessionAndSourcesRest2))
    return null;
  let platformSessionAndSourcesRestSlice: Dynamic =
    platformSessionAndSourcesRest2.slice(1);
  if (!platformSessionAndSourcesRestSlice.startsWith(``)) return null;
  let dataContentAndReferencesChildId: Dynamic =
    resolveDataContentAndReferencesChildId(
      platformSessionAndSourcesRestSlice.slice(0),
      resolvePlatformSessionAndSourcesTest7,
    );
  return dataContentAndReferencesChildId === null ||
    dataContentAndReferencesChildId.childId === undefined
    ? null
    : dataContentAndReferencesChildId.engineAnchor === undefined
      ? {
          id: dataContentAndReferencesChildId.childId,
        }
      : {
          id: dataContentAndReferencesChildId.childId,
          rest: dataContentAndReferencesChildId.engineAnchor,
        };
}

function resolvePlatformSessionAndSourcesTest8(
  platformSessionAndSourcesTest8?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (!platformSessionAndSourcesPattern9.test(platformSessionAndSourcesTest8))
    return null;
  let total =
    `#${platformSessionAndSourcesTest8}` +
    (options !== undefined && options !== `` ? `.${options}` : ``);
  return platformSessionAndSourcesPattern11.test(total) ? total : null;
}

function resolvePlatformSessionAndSourcesKind(
  platformSessionAndSourcesKind?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies: Dynamic = 8,
  ..._extraArguments: unknown[]
): Dynamic {
  let restHash =
    platformSessionAndSourcesKind.rest === undefined
      ? ``
      : `#${platformSessionAndSourcesKind.rest}`;
  if (options(platformSessionAndSourcesKind.id))
    return {
      kind: `land`,
      fileId: platformSessionAndSourcesKind.id,
      restHash: restHash,
    };
  let context2: Dynamic = context(`node/${platformSessionAndSourcesKind.id}`);
  if (context2 === undefined)
    return {
      kind: `clear`,
    };
  let uniqueItems: Dynamic = new (Set as Dynamic)([
    platformSessionAndSourcesKind.id,
  ]);
  let parent: Dynamic = context2.parent;
  for (let count = 1; parent !== undefined && count <= dependencies; count++) {
    if (parent.object === `file`)
      return options(parent.id)
        ? {
            kind: `land`,
            fileId: parent.id,
            restHash: restHash,
          }
        : {
            kind: `clear`,
          };
    if (uniqueItems.has(parent.id)) break;
    uniqueItems.add(parent.id);
    parent = context(`${parent.object}/${parent.id}`)?.parent;
  }
  return {
    kind: `keep`,
  };
}

var platformSessionAndSourcesPattern12: RegExp;

var platformSessionAndSourcesValue2048: number;

function resolvePlatformSessionAndSourcesCharCodeAt(
  items?: Dynamic,
  ..._extraArguments: unknown[]
): number {
  let count: number = 0;
  for (let index = 0; index < items.length; index++) {
    let charCodeAt: Dynamic = items.charCodeAt(index);
    if (charCodeAt < 128) {
      count += 1;
    } else {
      if (charCodeAt < 2048) {
        count += 2;
      } else {
        if (
          charCodeAt >= 55296 &&
          charCodeAt <= 56319 &&
          index + 1 < items.length &&
          (items.charCodeAt(index + 1) & 64512) == 56320
        ) {
          count += 4;
          index++;
        } else {
          count += 3;
        }
      }
    }
  }
  return count;
}

var resolvePlatformSessionAndSourcesValue10: Dynamic;

var platformSessionAndSourcesPattern13: RegExp;

function resolvePlatformSessionAndSourcesTest9(
  items?: unknown,
  ..._extraArguments: unknown[]
) {
  return (
    typeof items == `string` &&
    items.length <= 257 &&
    platformSessionAndSourcesPattern13.test(items)
  );
}

function resolvePlatformSessionAndSourcesStartsWith(
  platformSessionAndSourcesStarts?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let platformSessionAndSourcesStartsSlice: Dynamic =
    platformSessionAndSourcesStarts.startsWith(`#`)
      ? platformSessionAndSourcesStarts.slice(1)
      : platformSessionAndSourcesStarts;
  try {
    platformSessionAndSourcesStartsSlice = decodeURIComponent(
      platformSessionAndSourcesStartsSlice,
    );
  } catch {}
  if (!platformSessionAndSourcesStartsSlice) return null;
  let label = `#${encodeURIComponent(platformSessionAndSourcesStartsSlice)}`;
  return resolvePlatformSessionAndSourcesTest9(label) ? label : null;
}

function resolvePlatformSessionAndSourcesCharCodeAt2(
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let index = 0;
  let itemsCount: Dynamic = items.length;
  for (; index < itemsCount && items.charCodeAt(index) <= 32; ) index++;
  for (; itemsCount > index && items.charCodeAt(itemsCount - 1) <= 32; )
    itemsCount--;
  return items
    .slice(index, itemsCount)
    .replace(/[\t\n\r]/g, ``)
    .replace(/\\/g, `/`);
}

function isPlatformSessionAndSourcesTest(
  items?: unknown,
  ..._extraArguments: unknown[]
) {
  if (typeof items != `string` || items.length > 8192) return false;
  let platformSessionAndSourcesCharCodeAt2: Dynamic =
    resolvePlatformSessionAndSourcesCharCodeAt2(items);
  return !!(
    /^(https?|mailto|tel|claude):/i.test(
      platformSessionAndSourcesCharCodeAt2,
    ) ||
    platformSessionAndSourcesCharCodeAt2.startsWith(`#`) ||
    (platformSessionAndSourcesCharCodeAt2.startsWith(`/`) &&
      !platformSessionAndSourcesCharCodeAt2.startsWith(`//`))
  );
}

var platformSessionAndSourcesUrlPattern: RegExp;

var platformSessionAndSourcesPattern14: RegExp;

var platformSessionAndSourcesPattern15: RegExp;

var platformSessionAndSourcesPattern16: RegExp;

var resolvePlatformSessionAndSourcesTest10: Dynamic;

function isPlatformSessionAndSourcesExec(
  platformSessionAndSourcesExec?: Dynamic,
  options: Dynamic = false,
  ..._extraArguments: unknown[]
): Dynamic {
  let match = /^https?:\/\/([^/?#]*)/i.exec(platformSessionAndSourcesExec);
  if (match) {
    if (
      !platformSessionAndSourcesPattern14.test(match[1]) ||
      (options && !match[1].replace(/:\d+$/, ``).includes(`.`))
    )
      return null;
    let isPlatformSessionAndSourcesExecResult: Dynamic;
    try {
      isPlatformSessionAndSourcesExecResult = new URL(
        platformSessionAndSourcesExec,
      );
    } catch {
      return null;
    }
    return isPlatformSessionAndSourcesExecResult.username ||
      isPlatformSessionAndSourcesExecResult.password ||
      !isPlatformSessionAndSourcesExecResult.hostname ||
      !platformSessionAndSourcesPattern15.test(
        isPlatformSessionAndSourcesExecResult.hostname,
      )
      ? null
      : platformSessionAndSourcesPattern16.test(platformSessionAndSourcesExec)
        ? platformSessionAndSourcesExec
        : isPlatformSessionAndSourcesExecResult.href;
  }
  if (/^mailto:/i.test(platformSessionAndSourcesExec)) {
    let platformSessionAndSourcesExecSlice: Dynamic =
      platformSessionAndSourcesExec.slice(7);
    return !platformSessionAndSourcesExecSlice ||
      /\s/.test(platformSessionAndSourcesExecSlice)
      ? null
      : !options ||
          platformSessionAndSourcesPattern17.test(
            platformSessionAndSourcesExecSlice.replace(/\?.*$/, ``),
          )
        ? platformSessionAndSourcesExec
        : null;
  }
  return null;
}

var platformSessionAndSourcesPattern17: RegExp;

var platformSessionAndSourcesPattern18: RegExp;

function resolvePlatformSessionAndSourcesMatchAll(
  platformSessionAndSourcesMatchAll?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let resolvePlatformSessionAndSourcesMatchAllResult: Dynamic = null;
  let count: number = 0;
  for (let resolvePlatformSessionAndSourcesMatchAllResult2 of platformSessionAndSourcesMatchAll.matchAll(
    platformSessionAndSourcesUrlPattern,
  ) as Dynamic) {
    let isPlatformSessionAndSourcesExec2: Dynamic =
      isPlatformSessionAndSourcesExec(
        resolvePlatformSessionAndSourcesMatchAllResult2[0].replace(
          platformSessionAndSourcesPattern18,
          ``,
        ),
        true,
      );
    if (isPlatformSessionAndSourcesExec2) {
      if (resolvePlatformSessionAndSourcesMatchAllResult) return null;
      resolvePlatformSessionAndSourcesMatchAllResult =
        isPlatformSessionAndSourcesExec2;
      count = resolvePlatformSessionAndSourcesMatchAllResult2.index ?? 0;
    }
  }
  if (!resolvePlatformSessionAndSourcesMatchAllResult) return null;
  for (let resolvePlatformSessionAndSourcesMatchAllResult2 of platformSessionAndSourcesMatchAll
    .slice(0, count)
    .split(/\s+/) as Dynamic) {
    let replace: Dynamic =
      resolvePlatformSessionAndSourcesMatchAllResult2.replace(
        platformSessionAndSourcesPattern18,
        ``,
      );
    if (
      replace &&
      !/^[a-z][a-z0-9+-]*:/i.test(replace) &&
      isPlatformSessionAndSourcesExec(`https://${replace}`, true)
    )
      return null;
  }
  return resolvePlatformSessionAndSourcesMatchAllResult;
}

function resolvePlatformSessionAndSourcesStartsWith2(
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (items.length > 8192) return null;
  let platformSessionAndSourcesCharCodeAt2: Dynamic =
    resolvePlatformSessionAndSourcesCharCodeAt2(items);
  if (!platformSessionAndSourcesCharCodeAt2) return null;
  if (platformSessionAndSourcesCharCodeAt2.startsWith(`#`))
    return /\s/.test(platformSessionAndSourcesCharCodeAt2)
      ? null
      : platformSessionAndSourcesCharCodeAt2;
  if (platformSessionAndSourcesCharCodeAt2.startsWith(`//`)) return null;
  if (platformSessionAndSourcesCharCodeAt2.startsWith(`/`))
    return platformSessionAndSourcesCharCodeAt2.replace(
      /\s/g,
      (
        platformSessionAndSourcesStarts?: Dynamic,
        ..._extraArguments: unknown[]
      ) => encodeURIComponent(platformSessionAndSourcesStarts),
    );
  if (/^tel:/i.test(platformSessionAndSourcesCharCodeAt2))
    return platformSessionAndSourcesCharCodeAt2.replace(/\s/g, ``);
  if (/^claude:/i.test(platformSessionAndSourcesCharCodeAt2))
    return /\s/.test(platformSessionAndSourcesCharCodeAt2)
      ? null
      : platformSessionAndSourcesCharCodeAt2;
  if (/^(https?:\/\/|mailto:)/i.test(platformSessionAndSourcesCharCodeAt2)) {
    let isPlatformSessionAndSourcesExec2: Dynamic =
      (
        platformSessionAndSourcesCharCodeAt2.match(
          platformSessionAndSourcesUrlPattern,
        ) ?? []
      ).length > 1
        ? null
        : isPlatformSessionAndSourcesExec(platformSessionAndSourcesCharCodeAt2);
    if (isPlatformSessionAndSourcesExec2)
      return isPlatformSessionAndSourcesExec2;
  }
  return (
    resolvePlatformSessionAndSourcesMatchAll(
      platformSessionAndSourcesCharCodeAt2,
    ) ||
    (/^[a-z][a-z0-9+-]*:/i.test(platformSessionAndSourcesCharCodeAt2) ||
    /\s/.test(platformSessionAndSourcesCharCodeAt2)
      ? null
      : /^go\//i.test(platformSessionAndSourcesCharCodeAt2)
        ? isPlatformSessionAndSourcesExec(
            `http://${platformSessionAndSourcesCharCodeAt2}`,
          )
        : /^[^\s@/]+@[^\s@/]+\.[^\s@/]+$/.test(
              platformSessionAndSourcesCharCodeAt2,
            )
          ? `mailto:${platformSessionAndSourcesCharCodeAt2}`
          : isPlatformSessionAndSourcesExec(
              `https://${platformSessionAndSourcesCharCodeAt2}`,
              true,
            ))
  );
}

var platformSessionAndSourcesValue1000000: number;

function resolvePlatformSessionAndSourcesTextHtml(
  platformSessionAndSourcesTextHtml?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!platformSessionAndSourcesTextHtml) return null;
  let data: Dynamic = platformSessionAndSourcesTextHtml.getData(`text/html`);
  if (
    data &&
    data.length <= platformSessionAndSourcesValue1000000 &&
    typeof DOMParser !== "undefined"
  ) {
    let matchedElement: Dynamic = new DOMParser()
      .parseFromString(data, `text/html`)
      .querySelector(`a[href]`);
    let platformSessionAndSourcesStartsWith2: Dynamic = matchedElement
      ? resolvePlatformSessionAndSourcesStartsWith2(
          matchedElement.getAttribute(`href`) ?? ``,
        )
      : null;
    if (platformSessionAndSourcesStartsWith2)
      return platformSessionAndSourcesStartsWith2;
  }
  let data2: Dynamic = platformSessionAndSourcesTextHtml.getData(`text/plain`);
  return data2 ? resolvePlatformSessionAndSourcesStartsWith2(data2) : null;
}

var platformSessionAndSourcesValue60: number;

function resolvePlatformSessionAndSourcesOpen(
  platformSessionAndSourcesOpen?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let replace: Dynamic = platformSessionAndSourcesOpen.replace(
    platformSessionAndSourcesPattern12,
    ``,
  );
  if (replace.length > 2048) return null;
  let resolvePlatformSessionAndSourcesOpenResult: Dynamic;
  try {
    resolvePlatformSessionAndSourcesOpenResult = new URL(replace);
  } catch {
    return null;
  }
  if (
    (resolvePlatformSessionAndSourcesOpenResult.protocol !== `https:` &&
      resolvePlatformSessionAndSourcesOpenResult.protocol !== `http:`) ||
    resolvePlatformSessionAndSourcesOpenResult.username ||
    resolvePlatformSessionAndSourcesOpenResult.password ||
    resolvePlatformSessionAndSourcesOpenResult.host.length > 253
  )
    return null;
  let origin = `${resolvePlatformSessionAndSourcesOpenResult.protocol}//${resolvePlatformSessionAndSourcesOpenResult.host}`;
  let rest: Dynamic =
    resolvePlatformSessionAndSourcesOpenResult.pathname +
    resolvePlatformSessionAndSourcesOpenResult.search +
    resolvePlatformSessionAndSourcesOpenResult.hash;
  return {
    open: origin + rest,
    origin: origin,
    host: resolvePlatformSessionAndSourcesOpenResult.host,
    rest: rest,
  };
}

function resolvePlatformSessionAndSourcesRest2(
  platformSessionAndSourcesRest2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    platformSessionAndSourcesRest2.rest.length >
      platformSessionAndSourcesValue60 ||
    platformSessionAndSourcesRest2.host.length > 30
  );
}

var resolvePlatformSessionAndSourcesReplace5: Dynamic;

function collectPlatformSessionAndSourcesValue(
  collectPlatformSessionAndSourcesValue2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  return collectPlatformSessionAndSourcesValue2.map(
    (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      if (!rolldownNImport2) return ``;
      let rolldownNImport3: Dynamic = rolldownNImport2;
      for (let count = 1; uniqueItems.has(rolldownNImport3); count++)
        rolldownNImport3 = `${rolldownNImport2}-${count}`;
      uniqueItems.add(rolldownNImport3);
      return rolldownNImport3;
    },
  );
}

function resolvePlatformSessionAndSourcesSlice(
  platformSessionAndSourcesSlice?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let trimmedPlatformSessionAndSourcesSliceSlice: Dynamic =
    platformSessionAndSourcesSlice.trim().slice(0, 120);
  for (
    ;
    trimmedPlatformSessionAndSourcesSliceSlice.length * 3 > 240 &&
    resolvePlatformSessionAndSourcesCharCodeAt(
      trimmedPlatformSessionAndSourcesSliceSlice,
    ) > 240;

  )
    trimmedPlatformSessionAndSourcesSliceSlice =
      trimmedPlatformSessionAndSourcesSliceSlice.slice(0, -1);
  return trimmedPlatformSessionAndSourcesSliceSlice.trim();
}

var resolvePlatformSessionAndSourcesTest11: Dynamic;

var platformSessionAndSourcesSet9: Dynamic;

var resolvePlatformSessionAndSourcesToLowerCase: Dynamic;

var platformSessionAndSourcesPattern19: RegExp;

function isPlatformSessionAndSourcesToLowerCase2(
  platformSessionAndSources?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (
    !platformSessionAndSources ||
    resolvePlatformSessionAndSourcesToLowerCase(platformSessionAndSources) ||
    resolvePlatformSessionAndSourcesTest11(platformSessionAndSources)
  )
    return false;
  let platformSessionAndSources2: Dynamic = platformSessionAndSources;
  try {
    platformSessionAndSources2 = decodeURIComponent(platformSessionAndSources);
  } catch {
    return false;
  }
  return resolvePlatformSessionAndSourcesBid3(platformSessionAndSources2) ===
    null
    ? platformSessionAndSources2 === platformSessionAndSources2.toLowerCase() &&
        platformSessionAndSourcesPattern19.test(platformSessionAndSources2)
    : true;
}

var platformSessionAndSourcesPattern20: RegExp;

var platformSessionAndSourcesPattern21: RegExp;

function resolvePlatformSessionAndSourcesTest12(
  platformSessionAndSourcesTest12?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return platformSessionAndSourcesTest12 === undefined ||
    !platformSessionAndSourcesPattern20.test(platformSessionAndSourcesTest12)
    ? null
    : platformSessionAndSourcesPattern21.test(options)
      ? `${platformSessionAndSourcesTest12}~${options}`
      : platformSessionAndSourcesTest12;
}

function resolvePlatformSessionAndSourcesTest13(
  platformSessionAndSourcesTest13?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return platformSessionAndSourcesTest13 !== undefined &&
    platformSessionAndSourcesPattern20.test(platformSessionAndSourcesTest13)
    ? platformSessionAndSourcesTest13
    : null;
}

function resolvePlatformSessionAndSourcesValue11(
  platformSessionAndSourcesValue11?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (resolvePlatformSessionAndSourcesTest11(platformSessionAndSourcesValue11))
    return platformSessionAndSourcesValue11;
  let platformSessionAndSourcesBid3 = resolvePlatformSessionAndSourcesBid3(
    platformSessionAndSourcesValue11,
  );
  return platformSessionAndSourcesBid3?.hint === undefined
    ? platformSessionAndSourcesValue11
    : platformSessionAndSourcesBid3.bid;
}

function resolvePlatformSessionAndSourcesBid3(
  platformSessionAndSourcesBid3?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let match =
    /^([A-Za-z0-9]{1,16}\.\d{1,8})(?:~(.*))?$/.exec(
      platformSessionAndSourcesBid3,
    ) ?? /^(bk_[0-9a-f]{6})(?:[-~](.*))?$/.exec(platformSessionAndSourcesBid3);
  return match
    ? match[2]
      ? {
          bid: match[1],
          hint: match[2],
        }
      : {
          bid: match[1],
        }
    : null;
}

function resolvePlatformSessionAndSourcesValue12(
  platformSessionAndSourcesValue12?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    resolvePlatformSessionAndSourcesTest13(options) ??
    resolvePlatformSessionAndSourcesTest13(
      resolvePlatformSessionAndSourcesBid3(platformSessionAndSourcesValue12)
        ?.bid,
    )
  );
}

var platformSessionAndSourcesValue16: number;

var resolvePlatformSessionAndSourcesHeading: Dynamic;

var resolvePlatformSessionAndSourcesType: Dynamic;

var resolvePlatformSessionAndSourcesText2: Dynamic;

function resolvePlatformSessionAndSourcesContent(
  node?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let content: Dynamic = node.content;
  if (Array.isArray(content)) return content;
  if (content && typeof content.forEach == `function`) {
    let items: Dynamic = [];
    content.forEach(
      (rolldownRImport2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        items.push(rolldownRImport2),
    );
    return items;
  }
  return null;
}

function resolvePlatformSessionAndSourcesText3(
  platformSessionAndSourcesText3?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  let test = (
    node?: unknown,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      items.length >= options ||
      options2 > platformSessionAndSourcesValue16 ||
      typeof node != `object` ||
      !node
    )
      return;
    let node2: Dynamic = node;
    let record2: Dynamic = {
      type: resolvePlatformSessionAndSourcesType(node2),
      attrs: node2.attrs,
      content: node2.content,
      text: node2.text,
    };
    let level: Dynamic = resolvePlatformSessionAndSourcesHeading(record2);
    if (level !== null) {
      let text: Dynamic = resolvePlatformSessionAndSourcesSlice(
        resolvePlatformSessionAndSourcesText2(record2, options2),
      );
      let bid: Dynamic = node2.attrs?.bid;
      if (text) {
        items.push({
          level: level,
          text: text,
          node: node,
          ...(typeof bid == `string` &&
          platformSessionAndSourcesPattern20.test(bid)
            ? {
                bid: bid,
              }
            : {}),
        });
      }
      return;
    }
    let platformSessionAndSourcesContent: Dynamic =
      resolvePlatformSessionAndSourcesContent(record2);
    if (platformSessionAndSourcesContent)
      for (let resolvePlatformSessionAndSourcesText3Result of platformSessionAndSourcesContent as Dynamic)
        test(resolvePlatformSessionAndSourcesText3Result, options2 + 1);
  };
  test(platformSessionAndSourcesText3, 0);
  return items;
}

function collectPlatformSessionAndSourcesFindIndex(
  collectPlatformSessionAndSourcesFindIndex2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let platformSessionAndSourcesText3: Dynamic =
    resolvePlatformSessionAndSourcesText3(
      collectPlatformSessionAndSourcesFindIndex2,
      1 / 0,
    );
  let platformSessionAndSourcesText3Index: Dynamic =
    platformSessionAndSourcesText3.findIndex(
      (
        platformSessionAndSourcesText32?: Dynamic,
        ..._extraArguments: unknown[]
      ) => platformSessionAndSourcesText32.node === options,
    );
  return platformSessionAndSourcesText3Index < 0
    ? null
    : collectPlatformSessionAndSourcesValue(
        platformSessionAndSourcesText3
          .slice(0, platformSessionAndSourcesText3Index + 1)
          .map(
            (
              platformSessionAndSourcesText3Slice?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              resolvePlatformSessionAndSourcesReplace5(
                platformSessionAndSourcesText3Slice.text,
              ),
          ),
      )[platformSessionAndSourcesText3Index] || null;
}

var PlatformSessionAndSourcesCurrentAnchor: string;

var platformSessionAndSourcesPattern22: RegExp;

var PlatformSessionAndSourcesCurrentAnchorRefused: string;

function resolvePlatformSessionAndSourcesTab(
  platformSessionAndSourcesTab?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof platformSessionAndSourcesTab.tab != `string`) return null;
  if (typeof platformSessionAndSourcesTab.landed == `string`)
    return resolvePlatformSessionAndSourcesTest8(
      platformSessionAndSourcesTab.tab,
    ) === null ||
      !platformSessionAndSourcesPattern22.test(
        platformSessionAndSourcesTab.landed,
      )
      ? null
      : {
          type: PlatformSessionAndSourcesCurrentAnchor,
          tab: platformSessionAndSourcesTab.tab,
          fragment: platformSessionAndSourcesTab.landed,
        };
  let heading: Dynamic =
    typeof platformSessionAndSourcesTab.heading == `string` &&
    platformSessionAndSourcesTab.heading !== ``
      ? platformSessionAndSourcesTab.heading
      : undefined;
  let platformSessionAndSourcesTest8 = resolvePlatformSessionAndSourcesTest8(
    platformSessionAndSourcesTab.tab,
    heading,
  );
  if (platformSessionAndSourcesTest8 === null) return null;
  let fragment = platformSessionAndSourcesTest8.slice(1);
  return platformSessionAndSourcesPattern22.test(fragment)
    ? {
        type: PlatformSessionAndSourcesCurrentAnchor,
        tab: platformSessionAndSourcesTab.tab,
        ...(heading === undefined
          ? {}
          : {
              heading: heading,
            }),
        fragment: fragment,
        ...(heading === undefined && platformSessionAndSourcesTab.nav === `tab`
          ? {
              nav: `tab`,
            }
          : {}),
      }
    : null;
}

var resolvePlatformSessionAndSourcesTab2: Dynamic;

function resolvePlatformSessionAndSourcesTab3(
  ask?: Dynamic,
  tab?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (tab === undefined) return null;
  let frag: Dynamic = typeof ask.frag == `string` ? ask.frag : ``;
  if (
    frag === `` ||
    frag.length > 256 ||
    resolvePlatformSessionAndSourcesTest11(frag)
  )
    return null;
  let heading: Dynamic = resolvePlatformSessionAndSourcesValue12(
    frag,
    typeof ask.bid == `string` &&
      platformSessionAndSourcesPattern20.test(ask.bid)
      ? ask.bid
      : undefined,
  );
  return heading === null
    ? null
    : resolvePlatformSessionAndSourcesTab2(tab, heading)
      ? {
          tab: tab,
          heading: heading,
        }
      : {
          tab: tab,
        };
}

function resolvePlatformSessionAndSourcesTab4(
  platformSessionAndSourcesTab4?: Dynamic,
  tab?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (tab === undefined) return null;
  let anchor: Dynamic = platformSessionAndSourcesTab4.anchor;
  let heading: Dynamic =
    typeof anchor == `string` && anchor.length <= 256
      ? resolvePlatformSessionAndSourcesTest13(
          resolvePlatformSessionAndSourcesBid3(anchor)?.bid,
        )
      : null;
  return heading !== null && resolvePlatformSessionAndSourcesTab2(tab, heading)
    ? {
        tab: tab,
        heading: heading,
      }
    : {
        tab: tab,
      };
}

function resolvePlatformSessionAndSourcesTab5(
  tab?: Dynamic,
  options?: Dynamic,
  entry?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (options === ``)
    return {
      tab: tab,
    };
  if (entry !== null) {
    if (entry.kind === `clear`)
      return {
        tab: tab,
      };
    if (entry.kind === `keep`) return null;
    let rest: Dynamic = entry.fileId === tab ? entry.rest : undefined;
    return rest === undefined || rest === ``
      ? {
          tab: tab,
        }
      : platformSessionAndSourcesPattern22.test(rest)
        ? {
            tab: tab,
            heading: resolvePlatformSessionAndSourcesValue11(rest),
          }
        : null;
  }
  return platformSessionAndSourcesPattern22.test(options)
    ? {
        tab: tab,
        landed: resolvePlatformSessionAndSourcesValue11(options),
      }
    : null;
}

function resolvePlatformSessionAndSourcesTab6(
  tab?: Dynamic,
  entry?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (entry === null)
    return {
      tab: tab,
    };
  if (entry.kind === `user`)
    return {
      tab: tab,
      nav: `tab`,
    };
  if (`landed` in entry)
    return platformSessionAndSourcesPattern22.test(entry.landed)
      ? {
          tab: tab,
          landed: entry.landed,
        }
      : {
          tab: tab,
        };
  let heading: Dynamic = entry.heading;
  return typeof heading == `string` &&
    heading !== `` &&
    platformSessionAndSourcesPattern22.test(heading)
    ? {
        tab: tab,
        heading: heading,
      }
    : {
        tab: tab,
      };
}

function resolvePlatformSessionAndSourcesHost(
  scheduler?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let { host: scheduler2 }: Dynamic = scheduler;
  let helloDImport2: Dynamic = helloDImport(scheduler2);
  let resolvePlatformSessionAndSourcesHostResult: Dynamic = null;
  let resolvePlatformSessionAndSourcesHostResult2: Dynamic = null;
  let resolvePlatformSessionAndSourcesHostResult3: Dynamic;
  let enabled = false;
  let postMessage = (..._extraArguments: unknown[]): undefined => {
    resolvePlatformSessionAndSourcesHostResult2 = null;
    let helloLImport2: Dynamic = helloLImport(scheduler2);
    if (helloLImport2 === null && !enabled) return;
    let resolvePlatformSessionAndSourcesHostResult4: Dynamic =
      resolvePlatformSessionAndSourcesHostResult;
    resolvePlatformSessionAndSourcesHostResult = null;
    if (
      !(
        resolvePlatformSessionAndSourcesHostResult4 === null ||
        enabled ||
        scheduler2 === null ||
        helloLImport2 === null
      ) &&
      resolvePlatformSessionAndSourcesHostResult4.fragment !==
        resolvePlatformSessionAndSourcesHostResult3
    ) {
      resolvePlatformSessionAndSourcesHostResult3 =
        resolvePlatformSessionAndSourcesHostResult4.fragment;
      scheduler2.parent.postMessage(
        resolvePlatformSessionAndSourcesHostResult4,
        helloLImport2,
      );
    }
  };
  let helloSImport2: Dynamic = helloSImport(
    scheduler2,
    (..._extraArguments: unknown[]): undefined => {
      if (!(enabled || resolvePlatformSessionAndSourcesHostResult === null)) {
        resolvePlatformSessionAndSourcesHostResult2?.();
        postMessage();
      }
    },
  );
  return {
    emit(
      platformSessionAndSourcesHost?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (enabled || scheduler2 === null || !helloDImport2) return;
      let platformSessionAndSourcesTab: Dynamic =
        resolvePlatformSessionAndSourcesTab(platformSessionAndSourcesHost);
      if (platformSessionAndSourcesTab === null) {
        scheduler.log?.(PlatformSessionAndSourcesCurrentAnchorRefused);
        return;
      }
      resolvePlatformSessionAndSourcesHostResult = platformSessionAndSourcesTab;
      resolvePlatformSessionAndSourcesHostResult2?.();
      resolvePlatformSessionAndSourcesHostResult2 = null;
      if (helloLImport(scheduler2) !== null) {
        resolvePlatformSessionAndSourcesHostResult2 = scheduler.schedule(
          postMessage,
          250,
        );
      }
    },
    dispose(..._extraArguments: unknown[]): undefined {
      enabled = true;
      helloSImport2();
      resolvePlatformSessionAndSourcesHostResult2?.();
      resolvePlatformSessionAndSourcesHostResult2 = null;
      resolvePlatformSessionAndSourcesHostResult = null;
    },
  };
}

var PlatformSessionAndSourcesONESHOTBUSYCAPMS: Dynamic;

var PAGE_BUSY_TRY_AGAIN: string;

var ONE_SHOT_BUSY_FLOOR_MS: number;

var ONE_SHOT_BUSY_CAP_MS: number;

var resolvePlatformSessionAndSourcesValue13: Dynamic;

var platformSessionAndSourcesSet10: Dynamic;

var resolvePlatformSessionAndSourcesRetryAfterMs: Dynamic;

var platformSessionAndSourcesSet11: Dynamic;

var RATE_LIMITED_WHY: string;

var RATE_LIMITED_CAP_MS: number;

var platformSessionAndSourcesSet12: Dynamic;

var resolvePlatformSessionAndSourcesUnknown3: Dynamic;

var resolvePlatformSessionAndSourcesAllow: Dynamic;

var resolvePlatformSessionAndSourcesRoom: Dynamic;

var pageBusyOf: Dynamic;

var rateLimitedOf: Dynamic;

var reissueSafeOf: Dynamic;

var unconfirmedWaitOf: Dynamic;

var pageBusyThrownOf: Dynamic;

var outcomeUnknownThrownOf: Dynamic;

var oneShotBusyWaitMs: Dynamic;

var platformSessionAndSourcesValue10000: number;

var PlatformSessionAndSourcesState8: Dynamic;

function noteBusyHandedBack(
  why?: Dynamic,
  options: Dynamic = Date.now(),
  ..._extraArguments: unknown[]
): undefined {
  PlatformSessionAndSourcesState8 = {
    why: why,
    at: options,
  };
}

function takeBusyWhy(
  busyWhy: Dynamic = Date.now(),
  ..._extraArguments: unknown[]
): Dynamic {
  let PlatformSessionAndSourcesState82: Dynamic =
    PlatformSessionAndSourcesState8;
  PlatformSessionAndSourcesState8 = null;
  return PlatformSessionAndSourcesState82 !== null &&
    busyWhy - PlatformSessionAndSourcesState82.at >= 0 &&
    busyWhy - PlatformSessionAndSourcesState82.at <
      platformSessionAndSourcesValue10000
    ? PlatformSessionAndSourcesState82.why
    : `busy`;
}

var resolvePlatformSessionAndSourcesOutcomeUnknown: (platformSessionAndSourcesOutcomeUnknown?: Dynamic, ..._extraArguments: unknown[]) => "busy" | "outcome_unknown" | null;

var resolvePlatformSessionAndSourcesValue14: (platformSessionAndSourcesValue14?: Dynamic, ..._extraArguments: unknown[]) => undefined;

var platformSessionAndSourcesSet13: Dynamic;

var resolvePlatformSessionAndSourcesValue15: Dynamic;

var PlatformSessionAndSourcesState9: symbol;

var platformSessionAndSourcesValue02: number;

var platformSessionAndSourcesMap2: Dynamic;

var platformSessionAndSourcesValue40962: number;

var resolvePlatformSessionAndSourcesValue16: (platformSessionAndSourcesValue162?: Dynamic, ..._extraArguments: unknown[]) => string | null;

var resolvePlatformSessionAndSourcesBatch: Dynamic;

var updatePlatformSessionAndSourcesSize: Dynamic;

var getPlatformSessionAndSourcesSome: Dynamic;

function withBusyRetry(
  withBusyRetry2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return withBusyRetry2[PlatformSessionAndSourcesState9]
    ? withBusyRetry2
    : {
        [PlatformSessionAndSourcesState9]: true,
        async call(
          withBusyRetry3?: Dynamic,
          options2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Promise<Dynamic> {
          if (!platformSessionAndSourcesSet13.has(withBusyRetry3))
            return withBusyRetry2.call(withBusyRetry3, options2);
          let platformSessionAndSourcesBatch: Dynamic =
            resolvePlatformSessionAndSourcesBatch(withBusyRetry3, options2);
          let updatePlatformSessionAndSourcesSize2: Dynamic =
            updatePlatformSessionAndSourcesSize(platformSessionAndSourcesBatch);
          let call: Dynamic = await withBusyRetry2.call(
            withBusyRetry3,
            options2,
          );
          let record2: Dynamic = resolvePlatformSessionAndSourcesValue13(
            call.body,
          )
            ? {
                status: call.status,
                ...call.body,
              }
            : call.body;
          let reissueSafeOf2: Dynamic = reissueSafeOf(record2);
          if (reissueSafeOf2 === null) {
            resolvePlatformSessionAndSourcesValue14(record2);
            return call;
          }
          if (
            getPlatformSessionAndSourcesSome(
              platformSessionAndSourcesBatch,
              updatePlatformSessionAndSourcesSize2,
            )
          )
            return call;
          let oneShotBusyWaitMs2: Dynamic = oneShotBusyWaitMs(reissueSafeOf2);
          options?.(oneShotBusyWaitMs2);
          await resolvePlatformSessionAndSourcesValue15(oneShotBusyWaitMs2);
          if (
            getPlatformSessionAndSourcesSome(
              platformSessionAndSourcesBatch,
              updatePlatformSessionAndSourcesSize2,
            )
          )
            return call;
          let call2: Dynamic = await withBusyRetry2.call(
            withBusyRetry3,
            options2,
          );
          resolvePlatformSessionAndSourcesValue14(
            resolvePlatformSessionAndSourcesValue13(call2.body)
              ? {
                  status: call2.status,
                  ...call2.body,
                }
              : call2.body,
          );
          return call2;
        },
      };
}

async function retryOnceIfPageBusy(
  retryOnceIfPageBusy2?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  try {
    return await retryOnceIfPageBusy2();
  } catch (retryOnceIfPageBusyResult: Dynamic) {
    let pageBusyThrownOf2: Dynamic = pageBusyThrownOf(
      retryOnceIfPageBusyResult,
    );
    if (pageBusyThrownOf2 === null)
      throw (
        outcomeUnknownThrownOf(retryOnceIfPageBusyResult) &&
          noteBusyHandedBack(`outcome_unknown`),
        retryOnceIfPageBusyResult
      );
    await resolvePlatformSessionAndSourcesValue15(
      oneShotBusyWaitMs(pageBusyThrownOf2),
    );
    try {
      return await retryOnceIfPageBusy2();
    } catch (retryOnceIfPageBusyResult2: Dynamic) {
      throw (
        pageBusyThrownOf(retryOnceIfPageBusyResult2) === null
          ? outcomeUnknownThrownOf(retryOnceIfPageBusyResult2) &&
            noteBusyHandedBack(`outcome_unknown`)
          : noteBusyHandedBack(`busy`),
        retryOnceIfPageBusyResult2
      );
    }
  }
}

var PlatformSessionAndSourcesAddress: Dynamic;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializePlatformSessionAndSources1Step1(): void {
  (PlatformSessionAndSourcesMessage = `git -c commit.gpgsign=false -c user.name=bongo -c user.email=bongo@local`);
  (resolvePlatformSessionAndSourcesIncludes = (
    platformSessionAndSourcesIncludes?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    platformSessionAndSourcesIncludes.includes(`/`)
      ? platformSessionAndSourcesIncludes
      : `projects/${platformSessionAndSourcesIncludes}`);
  (platformSessionAndSourcesD977576A9BCC788C5DC46686Values = [
    `#D97757`,
    `#6A9BCC`,
    `#788C5D`,
    `#C46686`,
    `#B8A23F`,
    `#7D6BB3`,
  ]);
  (resolvePlatformSessionAndSourcesReduce = (
    platformSessionAndSourcesReduce?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    platformSessionAndSourcesD977576A9BCC788C5DC46686Values[
      [...platformSessionAndSourcesReduce].reduce(
        (
          accumulator?: Dynamic,
          item?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => accumulator + item.charCodeAt(0),
        0,
      ) % platformSessionAndSourcesD977576A9BCC788C5DC46686Values.length
    ]);
  `${PlatformSessionAndSourcesMessage}`;
  [
    `${PlatformSessionAndSourcesMessage} ls-files`,
    `${PlatformSessionAndSourcesMessage} worktree list --porcelain`,
    `${PlatformSessionAndSourcesMessage} status --porcelain | wc -l`,
    `${PlatformSessionAndSourcesMessage} log -1 --format=%cI 2>/dev/null || date -Iseconds`,
  ].join(`; printf ''; `);
  (resolvePlatformSessionAndSourcesValue = (
    platformSessionAndSourcesValue?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => platformSessionAndSourcesValue?.split(`@`)[0] ?? ``);
  (resolvePlatformSessionAndSourcesIncludes2 = (
    platformSessionAndSourcesIncludes2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let platformSessionAndSourcesIncludes22: Dynamic =
      platformSessionAndSourcesIncludes2 ?? ``;
    if (!platformSessionAndSourcesIncludes22) return ``;
    if (!platformSessionAndSourcesIncludes22.includes(`@`))
      throw Error(
        `uidOf expects a principal (an email), got ${JSON.stringify(platformSessionAndSourcesIncludes22.slice(0, 40))} — if you are holding an already-derived key, you want to compare with sameUser() or keep hold of the email; deriving twice re-escapes and stops matching`,
      );
    if (
      resolveDataContentAndReferencesReplace4(
        resolvePlatformSessionAndSourcesValue(
          platformSessionAndSourcesIncludes22,
        ),
      ) === ``
    )
      throw Error(
        `uidOf refuses to derive a key from ${JSON.stringify(platformSessionAndSourcesIncludes22.slice(0, 40))} — the local part is empty or blank, so this names no principal; an absent principal is the empty string, not an address with nothing in front of the @`,
      );
    if (
      (
        resolveDataContentAndReferencesReplace4(
          platformSessionAndSourcesIncludes22,
        ).match(/@/g) ?? []
      ).length > 1
    )
      throw Error(
        `uidOf refuses to derive a key from ${JSON.stringify(platformSessionAndSourcesIncludes22.slice(0, 40))} — an address carries exactly one @, and a string with more is not a principal under the grammar in src/room/literals.ts; deriving from one of its readings is choosing an interpretation the grammar already refused`,
      );
    let dataContentAndReferencesIndexOf: Dynamic =
      resolveDataContentAndReferencesIndexOf(platformSessionAndSourcesIncludes22);
    if (dataContentAndReferencesIndexOf !== null) {
      let replaceAll2: Dynamic = (
        platformSessionAndSourcesIncludes23?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => platformSessionAndSourcesIncludes23.replaceAll(`!`, `!!`);
      return `${replaceAll2(dataContentAndReferencesIndexOf)}!${replaceAll2(resolvePlatformSessionAndSourcesValue(platformSessionAndSourcesIncludes22).trim().toLowerCase())}`;
    }
    let replaceAll: Dynamic = resolvePlatformSessionAndSourcesValue(
      platformSessionAndSourcesIncludes22,
    ).replaceAll(`!`, `!!`);
    if (platformSessionAndSourcesSet.has(replaceAll.toLowerCase()))
      throw Error(
        `uidOf refuses to derive the reserved row-space key ${JSON.stringify(replaceAll)} from a principal — that key names a system row-space (db/userState.ts SYSTEM_KV), not a user`,
      );
    return replaceAll;
  });
  (platformSessionAndSourcesSet = new (Set as Dynamic)([`_system`]));
  (resolvePlatformSessionAndSourcesMessage = (
    error?: Dynamic,
    ..._extraArguments: unknown[]
  ) => (error instanceof Error ? error.message : String(error)));
  (resolvePlatformSessionAndSourcesIncludes3 = (
    platformSessionAndSourcesIncludes3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    platformSessionAndSourcesIncludes3.includes(`@`)
      ? resolvePlatformSessionAndSourcesIncludes2(
          platformSessionAndSourcesIncludes3,
        )
      : platformSessionAndSourcesIncludes3);
  (resolvePlatformSessionAndSourcesValue2 = (
    platformSessionAndSourcesValue2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (!platformSessionAndSourcesValue2) return null;
    try {
      return resolvePlatformSessionAndSourcesIncludes3(
        platformSessionAndSourcesValue2,
      );
    } catch {
      return null;
    }
  });
  (platformSessionAndSourcesPattern = /[\p{Cf}\u034F\u115F\u1160\u3164\uFFA0]/gu);
  (platformSessionAndSourcesPattern2 = /[\p{Cf}\p{Default_Ignorable_Code_Point}\u2800\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/gu);
  (isPlatformSessionAndSourcesToLowerCase = (
    platformSessionAndSources?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    !!platformSessionAndSources &&
    !!options &&
    platformSessionAndSources.trim().toLowerCase() ===
      options.trim().toLowerCase());
  (platformSessionAndSourcesMap = new (Map as Dynamic)());
  (updatePlatformSessionAndSourcesTimeZone = (
    updatePlatformSessionAndSourcesTimeZone2?: Dynamic,
    timeZone?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (!timeZone)
      return [
        updatePlatformSessionAndSourcesTimeZone2.getFullYear(),
        updatePlatformSessionAndSourcesTimeZone2.getMonth() + 1,
        updatePlatformSessionAndSourcesTimeZone2.getDate(),
      ];
    let platformSessionAndSourcesMapEntry: Dynamic =
      platformSessionAndSourcesMap.get(timeZone);
    if (!platformSessionAndSourcesMapEntry) {
      platformSessionAndSourcesMapEntry = new (Intl.DateTimeFormat as Dynamic)(
        `en-CA`,
        {
          timeZone: timeZone,
          year: `numeric`,
          month: `2-digit`,
          day: `2-digit`,
        },
      );
      platformSessionAndSourcesMap.set(
        timeZone,
        platformSessionAndSourcesMapEntry,
      );
    }
    let toParts: Dynamic = platformSessionAndSourcesMapEntry.formatToParts(
      updatePlatformSessionAndSourcesTimeZone2,
    );
    let Number2: Dynamic = (
      updatePlatformSessionAndSourcesTimeZone3?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      Number(
        toParts.find(
          (toPart?: Dynamic, ..._extraArguments: unknown[]) =>
            toPart.type === updatePlatformSessionAndSourcesTimeZone3,
        )?.value,
      );
    return [Number2(`year`), Number2(`month`), Number2(`day`)];
  });
  (resolvePlatformSessionAndSourcesRound = (
    platformSessionAndSourcesRound?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let [
      updatePlatformSessionAndSourcesTimeZone2,
      setUpdatePlatformSessionAndSourcesTimeZone,
      updatePlatformSessionAndSourcesTimeZone3,
    ]: Dynamic = updatePlatformSessionAndSourcesTimeZone(
      platformSessionAndSourcesRound,
      context,
    );
    let [
      updatePlatformSessionAndSourcesTimeZone4,
      setUpdatePlatformSessionAndSourcesTimeZone2,
      updatePlatformSessionAndSourcesTimeZone5,
    ]: Dynamic = updatePlatformSessionAndSourcesTimeZone(options, context);
    return Math.round(
      (Date.UTC(
        updatePlatformSessionAndSourcesTimeZone4,
        setUpdatePlatformSessionAndSourcesTimeZone2 - 1,
        updatePlatformSessionAndSourcesTimeZone5,
      ) -
        Date.UTC(
          updatePlatformSessionAndSourcesTimeZone2,
          setUpdatePlatformSessionAndSourcesTimeZone - 1,
          updatePlatformSessionAndSourcesTimeZone3,
        )) /
        864e5,
    );
  });
  (resolvePlatformSessionAndSourcesValue3 = (
    platformSessionAndSourcesValue32?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    updatePlatformSessionAndSourcesTimeZone(
      platformSessionAndSourcesValue32,
      options,
    )[0]);
  (PlatformSessionAndSourcesStyles = `[A-Za-z0-9_.-]{1,64}`);
  (PlatformSessionAndSourcesStyles2 = `[A-Za-z0-9_.-]{1,96}`);
  (PlatformSessionAndSourcesStyles3 = `(?:bk_[0-9a-f]{6}|[A-Za-z0-9]{1,16}\\.\\d{1,8})`);
  (PlatformSessionAndSourcesStyles4 = `\\d{1,8}`);
  (PlatformSessionAndSourcesStyles5 = `[0-9a-f]{8}-[0-9a-f]{4}(?:-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})?`);
  (PlatformSessionAndSourcesState = RegExp(
    `^${PlatformSessionAndSourcesStyles}$`,
  ));
  (PlatformSessionAndSourcesState2 = RegExp(
    `^${PlatformSessionAndSourcesStyles2}$`,
  ));
  (PlatformSessionAndSourcesState3 = RegExp(
    `^${PlatformSessionAndSourcesStyles3}$`,
  ));
  (PlatformSessionAndSourcesState4 = RegExp(
    `^${PlatformSessionAndSourcesStyles5}$`,
  ));
  (PlatformSessionAndSourcesState5 = RegExp(
    `^(${PlatformSessionAndSourcesStyles})#(${PlatformSessionAndSourcesStyles2})$`,
  ));
  (PlatformSessionAndSourcesState6 = RegExp(
    `^(${PlatformSessionAndSourcesStyles})#(${PlatformSessionAndSourcesStyles2})/(${PlatformSessionAndSourcesStyles3})(?:@(${PlatformSessionAndSourcesStyles4})-(${PlatformSessionAndSourcesStyles4}))?(?:;thread=(${PlatformSessionAndSourcesStyles5}))?$`,
  ));
  (platformSessionAndSourcesSet2 = new (Set as Dynamic)([
    `forbidden`,
    `not_granted`,
    `capability_disabled`,
    `capability_removed`,
    `claude_unavailable`,
    `no_capability`,
  ]));
  (platformSessionAndSourcesSet3 = new (Set as Dynamic)([
    `consent_required`,
    `forbidden`,
    `invalid`,
    `not_found`,
    `rate_limited`,
    `unavailable`,
    `upstream_error`,
    `claude_unavailable`,
    `not_granted`,
    `capability_disabled`,
    `capability_removed`,
    `transform_error`,
  ]));
  (resolvePlatformSessionAndSourcesValue4 = (
    platformSessionAndSourcesValue42?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof platformSessionAndSourcesValue42 == `object` &&
    !!platformSessionAndSourcesValue42);
  (resolvePlatformSessionAndSourcesCanSendToClaude = (
    platformSessionAndSourcesCanSend?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolvePlatformSessionAndSourcesValue4(platformSessionAndSourcesCanSend) &&
    typeof platformSessionAndSourcesCanSend.canSendToClaude == `function` &&
    typeof platformSessionAndSourcesCanSend.sendToClaude == `function`);
  (platformSessionAndSourcesSet4 = new (Set as Dynamic)([
    `available`,
    `no_session`,
    `writers_only`,
    `off`,
  ]));
  (platformSessionAndSourcesValue4000 = 4e3);
  (platformSessionAndSourcesTextEncoder = new TextEncoder());
  (resolvePlatformSessionAndSourcesEncode = (
    platformSessionAndSourcesEncode?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    platformSessionAndSourcesTextEncoder.encode(platformSessionAndSourcesEncode)
      .length);
  (resolvePlatformSessionAndSourcesIsInteger = (
    platformSessionAndSourcesIsInteger?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof platformSessionAndSourcesIsInteger == `number` &&
    Number.isInteger(platformSessionAndSourcesIsInteger) &&
    platformSessionAndSourcesIsInteger >= 0 &&
    platformSessionAndSourcesIsInteger <= 99999999);
  (resolvePlatformSessionAndSourcesValue5 = (
    platformSessionAndSourcesValue5?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `f-${platformSessionAndSourcesValue5}#${options}`);
  (PlatformSessionAndSourcesSent = {
    sent: `Sent to agent — reply will land in this thread`,
    waiting: `Still waiting to reach the agent.`,
    no_reply: `Sent to agent, but no reply yet — send it again from a reply, or check your agent session is still open beside this document.`,
    queued: `The agent is busy with an earlier request. This one is waiting its turn.`,
    still_working: `The agent is still working on this. Its reply will land in this thread.`,
    needs_user: `The agent is waiting for your answer in your session.`,
    ended: `The agent's session ended without replying — mention @Agent again to retry`,
    edited: `The agent edited the document.`,
    stopped: `Stopped before the agent replied — send it again from a reply.`,
    not_delivered: `Comment added, but it didn't reach the agent. Try again from a reply, or ask the agent directly in your session.`,
    no_listener: `Comment added. No agent session picked it up. To continue, open your agent session`,
    sign_in: `Comment added, but the agent can't get your comment until you sign in again. Sign in from your session, then reply with @Agent.`,
    kept: `Not sent to agent. The comment stays here.`,
    no_anchor: `Comment added, but the agent couldn't be pointed at this spot yet. Reply with @Agent to try again, or reload the page if that doesn't help.`,
    refused: `Comment added, but not sent to agent — reply with @Agent to try again.`,
    no_session: `Comment added, but no agent session is listening here. To reach the agent, open this document next to your agent session.`,
    writers_only: `Comment added. Only people who can edit this document can send comments to the agent.`,
    off: `Comment added. Sending comments to the agent is turned off here.`,
    consent: `Comment added, but sending to the agent is turned off for you on this document.`,
    slow_down: `Comment added, but not sent to agent — that was a few too many in a row. Wait a moment, then reply with @Agent.`,
    too_long: `Comment added, but it's over the 4 KB the agent can be sent at once. Shorten it, or split it across replies to @Agent.`,
    unreachable: `The agent isn't reachable from here right now`,
    staged: `Comment added — it's in the chat box, send it to the agent from there`,
    unavailable: `Comment added · Asking the agent isn't available here yet`,
  });
  (PlatformSessionAndSourcesMessage2 = `Comment added, but it still can't be sent to the agent from this page. Ask directly in your session`);
  (PlatformSessionAndSourcesNoReply = {
    no_reply: `Sent to agent, but no reply yet — send it again from a reply.`,
    not_delivered: `Comment added, but it didn't reach the agent.`,
    sign_in: `Comment added, but the agent can't get your comment until you sign in again.`,
    no_anchor: `Comment added, but the agent couldn't be pointed at this spot yet.`,
    no_session: `Comment added, but no agent session is listening here.`,
    slow_down: `Comment added, but not sent to agent — that was a few too many in a row.`,
    too_long: `Comment added, but it's over the 4 KB the agent can be sent at once.`,
  });
  (resolvePlatformSessionAndSourcesValue6 = (
    platformSessionAndSourcesValue6?: Dynamic,
    options: Dynamic = false,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    options
      ? PlatformSessionAndSourcesMessage2
      : (PlatformSessionAndSourcesNoReply[platformSessionAndSourcesValue6] ??
        PlatformSessionAndSourcesSent[platformSessionAndSourcesValue6]));
  (PlatformSessionAndSourcesClaudeRepliedInTheComments = `The agent replied in the comments`);
  (resolvePlatformSessionAndSourcesAvailable = (
    platformSessionAndSourcesAvailable?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    platformSessionAndSourcesAvailable === `available` ||
    platformSessionAndSourcesAvailable === `unknown`
      ? `unreachable`
      : platformSessionAndSourcesAvailable);
  (platformSessionAndSourcesSet5 = new (Set as Dynamic)([
    `not_delivered`,
    `no_listener`,
    `sign_in`,
    `kept`,
    `stopped`,
    `needs_user`,
    `ended`,
  ]));
  (platformSessionAndSourcesSet6 = new (Set as Dynamic)([
    `sent`,
    `queued`,
    `needs_user`,
    `ended`,
  ]));
  (platformSessionAndSourcesSet7 = new (Set as Dynamic)(
    observabilityTelemetrySignedOutReauthRefusedUnavailableValues,
  ));
  (platformSessionAndSourcesPattern3 = /@(?:claude|agent)\b/i);
  (platformSessionAndSourcesValue3 = 3);
  (platformSessionAndSourcesPattern4 = /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g);
  (resolvePlatformSessionAndSourcesReplace2 = (
    platformSessionAndSourcesReplace2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    platformSessionAndSourcesReplace2.replace(
      platformSessionAndSourcesPattern4,
      `\uFFFD`,
    ));
  (resolvePlatformSessionAndSourcesIsFinite = (
    platformSessionAndSourcesIsFinite?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof platformSessionAndSourcesIsFinite == `number` &&
    Number.isFinite(platformSessionAndSourcesIsFinite) &&
    platformSessionAndSourcesIsFinite >= 0 &&
    platformSessionAndSourcesIsFinite <= 1);
  (PlatformSessionAndSourcesFrameContextCard = `frame-context:card`);
  (platformSessionAndSourcesValue4096 = 4096);
  (platformSessionAndSourcesPattern5 = /^[A-Za-z0-9_.:-]{1,128}$/);
  (platformSessionAndSourcesValue4 = 4);
  (platformSessionAndSourcesPattern6 = /^[0-9]{1,9}-[0-9]{1,9}$/);
  (platformSessionAndSourcesPattern7 = /[\u2028\u2029]/g);
  (platformSessionAndSourcesPattern8 = /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g);
  (platformSessionAndSourcesValue8 = 8);
  (resolvePlatformSessionAndSourcesTest2 = (
    platformSessionAndSourcesTest2?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof platformSessionAndSourcesTest2 == `string` &&
    platformSessionAndSourcesPattern5.test(platformSessionAndSourcesTest2));
  (PlatformSessionAndSourcesMessage3 = ` › `);
  (platformSessionAndSourcesValue0 = 0);
  (PlatformSessionAndSourcesMessage4 = `Ask Agent isn't available here`);
  (PlatformSessionAndSourcesAddedToYourMessageToClaude = `Added to your message to the agent`);
  (platformSessionAndSourcesSet8 = new (Set as Dynamic)([
    `available`,
    `available_if_summoned`,
    `no_session`,
    `unsupported`,
    `off`,
  ]));
  (resolvePlatformSessionAndSourcesValue7 = (
    platformSessionAndSourcesValue7?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof platformSessionAndSourcesValue7 == `object` &&
    !!platformSessionAndSourcesValue7);
  (resolvePlatformSessionAndSourcesCanSendToClaudeSession = (
    platformSessionAndSourcesCanSend?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolvePlatformSessionAndSourcesValue7(platformSessionAndSourcesCanSend) &&
    typeof platformSessionAndSourcesCanSend.canSendToClaudeSession == `function`);
  (platformSessionAndSourcesValue3000 = 3e3);
  (PlatformSessionAndSourcesStyles6 = `[0-9A-Za-z](?:[0-9A-Za-z-]{0,7}[0-9A-Za-z])?`);
  (PlatformSessionAndSourcesState7 = RegExp(
    `^ln-${PlatformSessionAndSourcesStyles6}$`,
  ));
  (platformSessionAndSourcesPattern9 = /^[0-9a-f]{8}-[0-9a-f]{4}$/);
  (resolvePlatformSessionAndSourcesNode = (
    platformSessionAndSourcesNode?: unknown,
    ..._extraArguments: unknown[]
  ) => {
    if (typeof platformSessionAndSourcesNode != `string`) return;
    let platformSessionAndSourcesNodeSlice =
      platformSessionAndSourcesNode.startsWith(`node/`)
        ? platformSessionAndSourcesNode.slice(5)
        : platformSessionAndSourcesNode.startsWith(`#`)
          ? platformSessionAndSourcesNode.slice(1)
          : null;
    return platformSessionAndSourcesNodeSlice !== null &&
      platformSessionAndSourcesPattern9.test(platformSessionAndSourcesNodeSlice)
      ? platformSessionAndSourcesNodeSlice
      : undefined;
  });
  (platformSessionAndSourcesPattern10 = /^f-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
  RegExp(
    `data-node\\s*=\\s*["'](ln-${PlatformSessionAndSourcesStyles6})["']`,
    `g`,
  );
  (resolvePlatformSessionAndSourcesTest3 = (
    platformSessionAndSourcesTest3?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    PlatformSessionAndSourcesState7.test(platformSessionAndSourcesTest3) ||
    platformSessionAndSourcesPattern9.test(platformSessionAndSourcesTest3));
  (resolvePlatformSessionAndSourcesTest4 = (
    platformSessionAndSourcesTest4?: unknown,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    typeof platformSessionAndSourcesTest4 != `string` ||
    !resolvePlatformSessionAndSourcesTest3(platformSessionAndSourcesTest4)
      ? ``
      : PlatformSessionAndSourcesState7.test(platformSessionAndSourcesTest4) ||
          options.has(platformSessionAndSourcesTest4)
        ? platformSessionAndSourcesTest4
        : ``);
  (resolvePlatformSessionAndSourcesTest5 = (
    platformSessionAndSourcesTest5?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let platformSessionAndSourcesTest4: Dynamic =
      resolvePlatformSessionAndSourcesTest4(
        platformSessionAndSourcesTest5,
        options,
      );
    return platformSessionAndSourcesPattern9.test(platformSessionAndSourcesTest4)
      ? platformSessionAndSourcesTest4
      : ``;
  });
  (resolvePlatformSessionAndSourcesTest6 = (
    platformSessionAndSourcesTest6?: Dynamic,
    ..._extraArguments: unknown[]
  ) => PlatformSessionAndSourcesState7.test(platformSessionAndSourcesTest6));
  (resolvePlatformSessionAndSourcesValue8 = (
    platformSessionAndSourcesValue82?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `f-${platformSessionAndSourcesValue82}`);
  (PlatformSessionAndSources0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz = `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`);
  (resolvePlatformSessionAndSourcesGetRandomValues = (
    ..._extraArguments: unknown[]
  ) => crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32);
  (platformSessionAndSourcesPattern11 = /^#[A-Za-z0-9._:~-]{1,128}$/);
  (resolvePlatformSessionAndSourcesTest7 = (
    platformSessionAndSourcesTest7?: Dynamic,
    ..._extraArguments: unknown[]
  ) => platformSessionAndSourcesPattern9.test(platformSessionAndSourcesTest7));
  (platformSessionAndSourcesPattern12 = /[\u0000-\u001F\u007F-\u009F\u200B-\u200F\u202A-\u202E\u2066-\u2069]/g);
  (platformSessionAndSourcesValue2048 = 2048);
  (resolvePlatformSessionAndSourcesValue10 = (
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    items.length > 2048 ||
    (items.length * 3 > 2048 &&
      resolvePlatformSessionAndSourcesCharCodeAt(items) > 2048));
  (platformSessionAndSourcesPattern13 = /^#[A-Za-z0-9\-._~!$&'()*+,;=:@/?%]{1,256}$/);
  (platformSessionAndSourcesUrlPattern = /(?:https?:\/\/|mailto:)[^\s]+/gi);
  (platformSessionAndSourcesPattern14 = /^(?:[\p{L}\p{N}\p{M}._-]+|\[[0-9a-f:.]+\])(?::\d{1,5})?$/iu);
  (platformSessionAndSourcesPattern15 = /^(?:[a-z0-9._-]+|\[[0-9a-f:.]+\])$/i);
  (platformSessionAndSourcesPattern16 = /^[\x21-\x7e]+$/);
  (resolvePlatformSessionAndSourcesTest10 = (
    platformSessionAndSourcesTest10?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    /^https?:\/\/(?:[a-z0-9._-]+|\[[0-9a-f:.]+\])(?::\d{1,5})?(?=[/?#\\]|$)/i.test(
      platformSessionAndSourcesTest10,
    ));
  (platformSessionAndSourcesPattern17 = /^[^\s@/]+@[^\s@/]+\.[^\s@/]+$/);
  (platformSessionAndSourcesPattern18 = /[).,;:!?\]}>'"]+$/);
  (platformSessionAndSourcesValue1000000 = 1e6);
  (platformSessionAndSourcesValue60 = 60);
  (resolvePlatformSessionAndSourcesReplace5 = (
    platformSessionAndSourcesReplace5?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    platformSessionAndSourcesReplace5
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]+/gu, ``)
      .trim()
      .replace(/\s+/g, `-`));
  (resolvePlatformSessionAndSourcesTest11 = (
    platformSessionAndSourcesTest11?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    /^(?:thread-|comment-|vs:)|~(?:el|cell):/.test(
      platformSessionAndSourcesTest11,
    ));
  (platformSessionAndSourcesSet9 = new (Set as Dynamic)([
    `no_universal_links`,
  ]));
  (resolvePlatformSessionAndSourcesToLowerCase = (
    platformSessionAndSources?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    platformSessionAndSourcesSet9.has(platformSessionAndSources.toLowerCase()));
  (platformSessionAndSourcesPattern19 = /^[\p{L}\p{N}-]+$/u);
  (platformSessionAndSourcesPattern20 = /^(?:bk_[0-9a-f]{6}|[A-Za-z0-9]{1,16}\.\d{1,8})$/);
  (platformSessionAndSourcesPattern21 = /^[A-Za-z0-9._-]{1,80}$/);
  (platformSessionAndSourcesValue16 = 16);
  (resolvePlatformSessionAndSourcesHeading = (
    platformSessionAndSourcesHeading?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let attrs: Dynamic = platformSessionAndSourcesHeading.attrs ?? {};
    let level: Dynamic =
      platformSessionAndSourcesHeading.type === `heading`
        ? attrs.level
        : platformSessionAndSourcesHeading.type === `paragraph`
          ? attrs.heading
          : null;
    return typeof level == `number` && Number.isInteger(level) && level >= 1
      ? Math.min(level, 6)
      : null;
  });
  (resolvePlatformSessionAndSourcesType = (
    platformSessionAndSourcesType?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    typeof platformSessionAndSourcesType.type == `string`
      ? platformSessionAndSourcesType.type
      : platformSessionAndSourcesType.type?.name);
  (resolvePlatformSessionAndSourcesText2 = (
    platformSessionAndSourcesText2?: unknown,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (
      options > platformSessionAndSourcesValue16 ||
      typeof platformSessionAndSourcesText2 != `object` ||
      !platformSessionAndSourcesText2
    )
      return ``;
    let platformSessionAndSourcesText22: Dynamic = platformSessionAndSourcesText2;
    if (
      resolvePlatformSessionAndSourcesType(platformSessionAndSourcesText22) ===
        `text` &&
      typeof platformSessionAndSourcesText22.text == `string`
    )
      return platformSessionAndSourcesText22.text;
    let platformSessionAndSourcesContent: Dynamic =
      resolvePlatformSessionAndSourcesContent(platformSessionAndSourcesText22);
    if (!platformSessionAndSourcesContent) return ``;
    let label: string = ``;
    for (let resolvePlatformSessionAndSourcesText2Result of platformSessionAndSourcesContent as Dynamic)
      if (
        ((label += resolvePlatformSessionAndSourcesText2(
          resolvePlatformSessionAndSourcesText2Result,
          options + 1,
        )),
        label.length > 240)
      )
        break;
    return label;
  });
  (PlatformSessionAndSourcesCurrentAnchor = `current_anchor`);
  (platformSessionAndSourcesPattern22 = /^[A-Za-z0-9._~-]{1,128}$/);
  (PlatformSessionAndSourcesCurrentAnchorRefused = `currentAnchor:refused`);
  (resolvePlatformSessionAndSourcesTab2 = (
    tab?: Dynamic,
    heading?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    heading !== `` &&
    resolvePlatformSessionAndSourcesTab({
      tab: tab,
      heading: heading,
    }) !== null);
  (PlatformSessionAndSourcesONESHOTBUSYCAPMS = rolldownNImport({
    ONE_SHOT_BUSY_CAP_MS: (..._extraArguments: unknown[]) => ONE_SHOT_BUSY_CAP_MS,
    ONE_SHOT_BUSY_FLOOR_MS: (..._extraArguments: unknown[]) =>
      ONE_SHOT_BUSY_FLOOR_MS,
    PAGE_BUSY_TRY_AGAIN: (..._extraArguments: unknown[]) => PAGE_BUSY_TRY_AGAIN,
    RATE_LIMITED_CAP_MS: (..._extraArguments: unknown[]) => RATE_LIMITED_CAP_MS,
    RATE_LIMITED_WHY: (..._extraArguments: unknown[]) => RATE_LIMITED_WHY,
    noteBusyHandedBack: (..._extraArguments: unknown[]): Dynamic =>
      noteBusyHandedBack,
    oneShotBusyWaitMs: (..._extraArguments: unknown[]): Dynamic =>
      oneShotBusyWaitMs,
    outcomeUnknownThrownOf: (..._extraArguments: unknown[]): Dynamic =>
      outcomeUnknownThrownOf,
    pageBusyOf: (..._extraArguments: unknown[]): Dynamic => pageBusyOf,
    pageBusyThrownOf: (..._extraArguments: unknown[]): Dynamic =>
      pageBusyThrownOf,
    rateLimitedOf: (..._extraArguments: unknown[]): Dynamic => rateLimitedOf,
    reissueSafeOf: (..._extraArguments: unknown[]): Dynamic => reissueSafeOf,
    retryOnceIfPageBusy: (..._extraArguments: unknown[]): Dynamic =>
      retryOnceIfPageBusy,
    takeBusyWhy: (..._extraArguments: unknown[]): Dynamic => takeBusyWhy,
    unconfirmedWaitOf: (..._extraArguments: unknown[]): Dynamic =>
      unconfirmedWaitOf,
    withBusyRetry: (..._extraArguments: unknown[]): Dynamic => withBusyRetry,
  }));
  (PAGE_BUSY_TRY_AGAIN = `The document is busy right now — try again in a moment.`);
  (ONE_SHOT_BUSY_FLOOR_MS = 1e3);
  (ONE_SHOT_BUSY_CAP_MS = 5e3);
  (resolvePlatformSessionAndSourcesValue13 = (
    platformSessionAndSourcesValue13?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof platformSessionAndSourcesValue13 == `object` &&
    !!platformSessionAndSourcesValue13 &&
    !Array.isArray(platformSessionAndSourcesValue13));
  (platformSessionAndSourcesSet10 = new (Set as Dynamic)([
    `relay`,
    `http`,
    `link`,
    `lane`,
  ]));
  (resolvePlatformSessionAndSourcesRetryAfterMs = (
    platformSessionAndSourcesRetryAfterMs?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let retryAfterMs: Dynamic =
      platformSessionAndSourcesRetryAfterMs.retryAfterMs ?? options.retryAfterMs;
    let number2 = Number(retryAfterMs);
    return Number.isFinite(number2) && number2 > 0
      ? Math.min(ONE_SHOT_BUSY_CAP_MS, number2)
      : 0;
  });
  (platformSessionAndSourcesSet11 = new (Set as Dynamic)([
    `busy`,
    `db_timeout`,
    `db_unavailable`,
    `rate_limited`,
  ]));
  (RATE_LIMITED_WHY = `rate_limited`);
  (RATE_LIMITED_CAP_MS = 3e4);
  (platformSessionAndSourcesSet12 = new (Set as Dynamic)([
    `ledger-busy`,
    `forward-timeout`,
    `hop-timeout`,
  ]));
  (resolvePlatformSessionAndSourcesUnknown3 = (
    response?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    options.outcome === `unknown` ||
    response.outcome === `unknown` ||
    ((response.status === 503 || response.status === 504) &&
      typeof options.was == `string` &&
      platformSessionAndSourcesSet12.has(options.was)));
  (resolvePlatformSessionAndSourcesAllow = (
    platformSessionAndSourcesAllow?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolvePlatformSessionAndSourcesUnknown3(
      platformSessionAndSourcesAllow,
      options,
    ) ||
    (resolvePlatformSessionAndSourcesValue13(
      platformSessionAndSourcesAllow.created,
    ) &&
      platformSessionAndSourcesAllow.created.verdict === `allow`) ||
    (typeof platformSessionAndSourcesAllow.index == `number` &&
      platformSessionAndSourcesAllow.index > 0) ||
    (typeof options.member == `number` && options.member > 0));
  (resolvePlatformSessionAndSourcesRoom = (
    platformSessionAndSourcesRoom?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    (platformSessionAndSourcesRoom.why === undefined ||
      platformSessionAndSourcesRoom.why === `room`) &&
    /^busy:/i.test(options));
  (pageBusyOf = (
    response?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (
      !resolvePlatformSessionAndSourcesValue13(response) ||
      response.verdict !== `deny` ||
      response.reason !== `unavailable`
    )
      return null;
    let data: Dynamic = resolvePlatformSessionAndSourcesValue13(response.data)
      ? response.data
      : {};
    if (
      data.why === `lane` ||
      (typeof data.layer == `string` &&
        platformSessionAndSourcesSet10.has(data.layer)) ||
      (data.scope !== undefined && data.scope !== `write`)
    )
      return null;
    let detail: Dynamic =
      typeof response.detail == `string`
        ? response.detail
        : typeof data.detail == `string`
          ? data.detail
          : ``;
    return (typeof data.why == `string` &&
      platformSessionAndSourcesSet11.has(data.why)) ||
      resolvePlatformSessionAndSourcesRoom(data, detail)
      ? resolvePlatformSessionAndSourcesRetryAfterMs(data, response)
      : null;
  });
  (rateLimitedOf = (
    rateLimited?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (
      pageBusyOf(rateLimited) === null ||
      !resolvePlatformSessionAndSourcesValue13(rateLimited)
    )
      return null;
    let data: Dynamic = resolvePlatformSessionAndSourcesValue13(rateLimited.data)
      ? rateLimited.data
      : {};
    if (data.why !== `rate_limited`) return null;
    let number2 = Number(data.retryAfterMs ?? rateLimited.retryAfterMs);
    return Number.isFinite(number2) && number2 > 0
      ? Math.min(RATE_LIMITED_CAP_MS, number2)
      : 0;
  });
  (reissueSafeOf = (
    reissueSafe?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let pageBusyOf2: Dynamic = pageBusyOf(reissueSafe);
    if (
      pageBusyOf2 === null ||
      !resolvePlatformSessionAndSourcesValue13(reissueSafe)
    )
      return null;
    let data: Dynamic = resolvePlatformSessionAndSourcesValue13(reissueSafe.data)
      ? reissueSafe.data
      : {};
    if (resolvePlatformSessionAndSourcesAllow(reissueSafe, data)) return null;
    let detail: Dynamic =
      typeof reissueSafe.detail == `string`
        ? reissueSafe.detail
        : typeof data.detail == `string`
          ? data.detail
          : ``;
    return data.why === `busy` ||
      resolvePlatformSessionAndSourcesRoom(data, detail) ||
      data.committed === false
      ? pageBusyOf2
      : null;
  });
  (unconfirmedWaitOf = (
    response?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (
      !resolvePlatformSessionAndSourcesValue13(response) ||
      response.verdict !== `deny` ||
      response.reason !== `unavailable`
    )
      return null;
    let data: Dynamic = resolvePlatformSessionAndSourcesValue13(response.data)
      ? response.data
      : {};
    if (
      data.why === `lane` ||
      (typeof data.layer == `string` &&
        platformSessionAndSourcesSet10.has(data.layer))
    )
      return null;
    let unknown2: Dynamic = resolvePlatformSessionAndSourcesUnknown3(
      response,
      data,
    );
    let pageBusyOf2: Dynamic = pageBusyOf(response);
    let detail: Dynamic =
      typeof response.detail == `string`
        ? response.detail
        : typeof data.detail == `string`
          ? data.detail
          : ``;
    let matchesPageBusyOf: Dynamic =
      pageBusyOf2 !== null &&
      (data.why === `busy` || resolvePlatformSessionAndSourcesRoom(data, detail));
    return !unknown2 && !matchesPageBusyOf
      ? null
      : {
          waitMs:
            pageBusyOf2 ??
            resolvePlatformSessionAndSourcesRetryAfterMs(data, response),
          unknown: unknown2,
        };
  });
  (pageBusyThrownOf = (
    pageBusyThrown?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (!(pageBusyThrown instanceof Error)) return null;
    let pageBusyThrown2: Dynamic = pageBusyThrown;
    return pageBusyThrown2.outcome === `unknown`
      ? null
      : pageBusyThrown2.status === 503 &&
          (pageBusyThrown2.code === `ledger-busy` ||
            pageBusyThrown2.serverError === `busy`)
        ? ONE_SHOT_BUSY_FLOOR_MS
        : typeof pageBusyThrown2.reason == `string`
          ? reissueSafeOf({
              verdict: `deny`,
              reason: pageBusyThrown2.reason,
              data: pageBusyThrown2.data,
            })
          : null;
  });
  (outcomeUnknownThrownOf = (
    outcomeUnknownThrown?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (!(outcomeUnknownThrown instanceof Error)) return false;
    let outcomeUnknownThrown2: Dynamic = outcomeUnknownThrown;
    return outcomeUnknownThrown2.outcome === `unknown`
      ? true
      : typeof outcomeUnknownThrown2.reason == `string` &&
          resolvePlatformSessionAndSourcesUnknown3(
            {
              verdict: `deny`,
              reason: outcomeUnknownThrown2.reason,
              status: outcomeUnknownThrown2.status,
            },
            resolvePlatformSessionAndSourcesValue13(outcomeUnknownThrown2.data)
              ? outcomeUnknownThrown2.data
              : {},
          );
  });
  (oneShotBusyWaitMs = (
    oneShotBusyWaitMs2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    Math.min(
      ONE_SHOT_BUSY_CAP_MS,
      Math.max(
        ONE_SHOT_BUSY_FLOOR_MS,
        Number.isFinite(oneShotBusyWaitMs2) && oneShotBusyWaitMs2 > 0
          ? oneShotBusyWaitMs2
          : 0,
      ),
    ));
  (platformSessionAndSourcesValue10000 = 1e4);
  (PlatformSessionAndSourcesState8 = null);
  (resolvePlatformSessionAndSourcesOutcomeUnknown = (
    platformSessionAndSourcesOutcomeUnknown?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    pageBusyOf(platformSessionAndSourcesOutcomeUnknown) === null ||
    !resolvePlatformSessionAndSourcesValue13(
      platformSessionAndSourcesOutcomeUnknown,
    )
      ? null
      : resolvePlatformSessionAndSourcesUnknown3(
            platformSessionAndSourcesOutcomeUnknown,
            resolvePlatformSessionAndSourcesValue13(
              platformSessionAndSourcesOutcomeUnknown.data,
            )
              ? platformSessionAndSourcesOutcomeUnknown.data
              : {},
          )
        ? `outcome_unknown`
        : `busy`);
  (resolvePlatformSessionAndSourcesValue14 = (
    platformSessionAndSourcesValue14?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let platformSessionAndSourcesOutcomeUnknown =
      resolvePlatformSessionAndSourcesOutcomeUnknown(
        platformSessionAndSourcesValue14,
      );
    if (platformSessionAndSourcesOutcomeUnknown !== null) {
      noteBusyHandedBack(platformSessionAndSourcesOutcomeUnknown);
    }
  });
  (platformSessionAndSourcesSet13 = new (Set as Dynamic)([
    `create`,
    `update`,
    `delete`,
    `access`,
    `batch`,
  ]));
  (resolvePlatformSessionAndSourcesValue15 = (
    platformSessionAndSourcesValue15?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    new (Promise as Dynamic)((resolve?: Dynamic, ..._extraArguments: unknown[]) =>
      setTimeout(resolve, platformSessionAndSourcesValue15),
    ));
  (PlatformSessionAndSourcesState9 = Symbol(`pageBusy.withBusyRetry`));
  (platformSessionAndSourcesValue02 = 0);
  (platformSessionAndSourcesMap2 = new (Map as Dynamic)());
  (platformSessionAndSourcesValue40962 = 4096);
  (resolvePlatformSessionAndSourcesValue16 = (
    platformSessionAndSourcesValue162?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    resolvePlatformSessionAndSourcesValue13(platformSessionAndSourcesValue162) &&
    typeof platformSessionAndSourcesValue162.object == `string` &&
    typeof platformSessionAndSourcesValue162.id == `string`
      ? `${platformSessionAndSourcesValue162.object}/${platformSessionAndSourcesValue162.id}`
      : null);
  (resolvePlatformSessionAndSourcesBatch = (
    platformSessionAndSourcesBatch?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (!options) return [];
    if (platformSessionAndSourcesBatch === `batch`) {
      let uniqueItems: Dynamic = new (Set as Dynamic)();
      for (let resolvePlatformSessionAndSourcesBatchResult of (Array.isArray(
        options.batch,
      )
        ? options.batch
        : []) as Dynamic) {
        if (
          !resolvePlatformSessionAndSourcesValue13(
            resolvePlatformSessionAndSourcesBatchResult,
          ) ||
          resolvePlatformSessionAndSourcesBatchResult.verb === `create`
        )
          continue;
        let platformSessionAndSourcesValue163 =
          resolvePlatformSessionAndSourcesValue16(
            resolvePlatformSessionAndSourcesBatchResult.ref,
          );
        if (platformSessionAndSourcesValue163 !== null) {
          uniqueItems.add(platformSessionAndSourcesValue163);
        }
      }
      return [...uniqueItems];
    }
    if (platformSessionAndSourcesBatch === `create`) return [];
    let platformSessionAndSourcesValue162 =
      resolvePlatformSessionAndSourcesValue16(options.ref);
    return platformSessionAndSourcesValue162 === null
      ? []
      : [platformSessionAndSourcesValue162];
  });
  (updatePlatformSessionAndSourcesSize = (
    updatePlatformSessionAndSourcesSize2?: Dynamic,
    ..._extraArguments: unknown[]
  ): number => {
    let updatePlatformSessionAndSourcesSizeResult: number =
      ++platformSessionAndSourcesValue02;
    for (let updatePlatformSessionAndSourcesSizeResult2 of updatePlatformSessionAndSourcesSize2 as Dynamic)
      platformSessionAndSourcesMap2.set(
        updatePlatformSessionAndSourcesSizeResult2,
        updatePlatformSessionAndSourcesSizeResult,
      );
    if (platformSessionAndSourcesMap2.size > platformSessionAndSourcesValue40962)
      for (let [
        updatePlatformSessionAndSourcesSizeResult2,
        updatePlatformSessionAndSourcesSizeResult3,
      ] of platformSessionAndSourcesMap2 as Dynamic)
        if (
          updatePlatformSessionAndSourcesSizeResult3 <
          updatePlatformSessionAndSourcesSizeResult -
            platformSessionAndSourcesValue40962
        ) {
          platformSessionAndSourcesMap2.delete(
            updatePlatformSessionAndSourcesSizeResult2,
          );
        }
    return updatePlatformSessionAndSourcesSizeResult;
  });
  (getPlatformSessionAndSourcesSome = (
    platformSessionAndSourcesSome?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    platformSessionAndSourcesSome.some(
      (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
        platformSessionAndSourcesMap2.get(rolldownNImport2) !== options,
    ));
  (PlatformSessionAndSourcesAddress = lazyZod.object({
    address: lazyZod.unknown(),
    after: lazyZod.unknown().optional(),
  }));
}

export {
  PAGE_BUSY_TRY_AGAIN,
  PlatformSessionAndSourcesAddedToYourMessageToClaude,
  PlatformSessionAndSourcesAddress,
  PlatformSessionAndSourcesClaudeRepliedInTheComments,
  PlatformSessionAndSourcesMessage2,
  PlatformSessionAndSourcesMessage4,
  PlatformSessionAndSourcesONESHOTBUSYCAPMS,
  PlatformSessionAndSourcesSent,
  PlatformSessionAndSourcesState3,
  PlatformSessionAndSourcesState7,
  PlatformSessionAndSourcesStyles6,
  RATE_LIMITED_CAP_MS,
  collectPlatformSessionAndSourcesFindIndex,
  getPlatformSessionAndSourcesStart,
  installPlatformSessionAndSourcesReason,
  isPlatformSessionAndSourcesState,
  isPlatformSessionAndSourcesTest,
  isPlatformSessionAndSourcesToLowerCase,
  isPlatformSessionAndSourcesToLowerCase2,
  loadPlatformSessionAndSourcesCall,
  loadPlatformSessionAndSourcesCode,
  loadPlatformSessionAndSourcesComments,
  outcomeUnknownThrownOf,
  pageBusyOf,
  pageBusyThrownOf,
  platformSessionAndSourcesPattern10,
  platformSessionAndSourcesPattern12,
  platformSessionAndSourcesPattern19,
  platformSessionAndSourcesPattern2,
  platformSessionAndSourcesPattern20,
  platformSessionAndSourcesPattern22,
  platformSessionAndSourcesPattern9,
  platformSessionAndSourcesSet2,
  platformSessionAndSourcesSet6,
  platformSessionAndSourcesValue2048,
  rateLimitedOf,
  resolvePlatformSessionAndSourcesAvailable,
  resolvePlatformSessionAndSourcesBid,
  resolvePlatformSessionAndSourcesBid2,
  resolvePlatformSessionAndSourcesBid3,
  resolvePlatformSessionAndSourcesCharCodeAt2,
  resolvePlatformSessionAndSourcesClaude,
  resolvePlatformSessionAndSourcesCode,
  resolvePlatformSessionAndSourcesConsentRequired,
  resolvePlatformSessionAndSourcesDisplayName,
  resolvePlatformSessionAndSourcesExec,
  resolvePlatformSessionAndSourcesFailed,
  resolvePlatformSessionAndSourcesFailed2,
  resolvePlatformSessionAndSourcesHost,
  resolvePlatformSessionAndSourcesIncludes,
  resolvePlatformSessionAndSourcesKind,
  resolvePlatformSessionAndSourcesMessage,
  resolvePlatformSessionAndSourcesNode,
  resolvePlatformSessionAndSourcesOpen,
  resolvePlatformSessionAndSourcesPath,
  resolvePlatformSessionAndSourcesPush,
  resolvePlatformSessionAndSourcesReduce,
  resolvePlatformSessionAndSourcesRef,
  resolvePlatformSessionAndSourcesReplace,
  resolvePlatformSessionAndSourcesReplace4,
  resolvePlatformSessionAndSourcesRest,
  resolvePlatformSessionAndSourcesRest2,
  resolvePlatformSessionAndSourcesRound,
  resolvePlatformSessionAndSourcesSent,
  resolvePlatformSessionAndSourcesSent2,
  resolvePlatformSessionAndSourcesStartsWith,
  resolvePlatformSessionAndSourcesStartsWith2,
  resolvePlatformSessionAndSourcesTab3,
  resolvePlatformSessionAndSourcesTab4,
  resolvePlatformSessionAndSourcesTab5,
  resolvePlatformSessionAndSourcesTab6,
  resolvePlatformSessionAndSourcesTest10,
  resolvePlatformSessionAndSourcesTest12,
  resolvePlatformSessionAndSourcesTest13,
  resolvePlatformSessionAndSourcesTest3,
  resolvePlatformSessionAndSourcesTest4,
  resolvePlatformSessionAndSourcesTest5,
  resolvePlatformSessionAndSourcesTest6,
  resolvePlatformSessionAndSourcesTest8,
  resolvePlatformSessionAndSourcesTest9,
  resolvePlatformSessionAndSourcesTextHtml,
  resolvePlatformSessionAndSourcesToLowerCase,
  resolvePlatformSessionAndSourcesToUpperCase,
  resolvePlatformSessionAndSourcesTrim,
  resolvePlatformSessionAndSourcesUnknown,
  resolvePlatformSessionAndSourcesUnknown2,
  resolvePlatformSessionAndSourcesUsers,
  resolvePlatformSessionAndSourcesValue,
  resolvePlatformSessionAndSourcesValue10,
  resolvePlatformSessionAndSourcesValue2,
  resolvePlatformSessionAndSourcesValue3,
  resolvePlatformSessionAndSourcesValue5,
  resolvePlatformSessionAndSourcesValue6,
  resolvePlatformSessionAndSourcesValue8,
  resolvePlatformSessionAndSourcesValue9,
  resolvePlatformSessionAndSourcesWeekday,
  retryOnceIfPageBusy,
  takeBusyWhy,
  unconfirmedWaitOf,
  withBusyRetry,
};
