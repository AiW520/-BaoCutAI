/** BaoCut: export mcp connectors from app-core-BE6n4d7F.js. */
import type { Dynamic } from "./types";
import {
  PlatformFrameAndCapabilitiesApplicationVndOpenxmlformatsOfficedocumentWordprocessingmlDocument,
  PlatformFrameAndCapabilitiesState2,
  loadPlatformFrameAndCapabilitiesAbsent,
  loadPlatformFrameAndCapabilitiesFilter,
  loadPlatformFrameAndCapabilitiesMounted,
  loadPlatformFrameAndCapabilitiesState,
  loadPlatformFrameAndCapabilitiesWithheld,
  platformFrameAndCapabilitiesNeedsReauthServerNotConnectedSelectionRequiredServerNotFoundValues,
  resolvePlatformFrameAndCapabilitiesFrom,
  resolvePlatformFrameAndCapabilitiesUpstreamError,
} from "./platform-core-platform-frame-and-capabilities";

function resolveExportMcpConnectorsRefused(
  exportMcpConnectorsRefused?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (exportMcpConnectorsRefused == null || !exportMcpConnectorsRefused.body)
    return `refused`;
  let resolveExportMcpConnectorsRefusedResult: Dynamic;
  try {
    resolveExportMcpConnectorsRefusedResult = new URL(options);
  } catch {
    return `refused`;
  }
  if (
    (resolveExportMcpConnectorsRefusedResult.protocol !== `https:` &&
      resolveExportMcpConnectorsRefusedResult.protocol !== `http:`) ||
    resolveExportMcpConnectorsRefusedResult.username !== `` ||
    resolveExportMcpConnectorsRefusedResult.password !== ``
  )
    return `refused`;
  let body: Dynamic = exportMcpConnectorsRefused.body;
  let event: Dynamic = null;
  let enabled = false;
  try {
    event = exportMcpConnectorsRefused.createElement(`a`);
    event.href = resolveExportMcpConnectorsRefusedResult.href;
    event.target = `_blank`;
    event.rel = `noopener noreferrer`;
    if (event.style) {
      event.style.display = `none`;
    }
    event.setAttribute?.(`aria-hidden`, `true`);
    event.setAttribute?.(`tabindex`, `-1`);
    body.appendChild(event);
    event.click();
    enabled = true;
  } catch {
  } finally {
    try {
      if (event !== null) {
        body.removeChild(event);
      }
    } catch {}
  }
  return enabled ? `clicked` : `refused`;
}

var ExportMcpConnectorsNotion: string;

var ExportMcpConnectorsNotionCreatePages: string;

var ExportMcpConnectorsState: string;

var ExportMcpConnectorsState2: number;

var exportMcpConnectorsSet: Dynamic;

var resolveExportMcpConnectorsValue: Dynamic;

function isExportMcpConnectorsNotion(
  exportMcpConnectorsNotion?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    !resolveExportMcpConnectorsValue(exportMcpConnectorsNotion) ||
    !Array.isArray(exportMcpConnectorsNotion.servers)
  )
    return false;
  let server: Dynamic = exportMcpConnectorsNotion.servers.find(
    (server2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      resolveExportMcpConnectorsValue(server2) && server2.server === `Notion`,
  );
  return !resolveExportMcpConnectorsValue(server) ||
    !Array.isArray(server.tools)
    ? false
    : server.tools.length === 0 ||
        server.tools.some(
          (tool?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            resolveExportMcpConnectorsValue(tool) &&
            tool.name === `notion-create-pages`,
        );
}

async function loadExportMcpConnectorsListTools(
  exportMcpConnectorsList?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  if (typeof exportMcpConnectorsList.listTools != `function`) return false;
  try {
    return isExportMcpConnectorsNotion(
      await exportMcpConnectorsList.listTools(),
    );
  } catch {
    return false;
  }
}

var resolveExportMcpConnectorsValue2: Dynamic;

var resolveExportMcpConnectorsValue3: Dynamic;

var resolveExportMcpConnectorsEncode: Dynamic;

var resolveExportMcpConnectorsMarkdown: (exportMcpConnectorsMarkdown?: Dynamic, ..._extraArguments: unknown[]) => boolean;

function resolveExportMcpConnectorsCreationMode(
  exportMcpConnectorsCreationMode?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    creation_mode: `draft`,
    pages: [
      {
        properties: {
          title: exportMcpConnectorsCreationMode.title,
        },
        content: exportMcpConnectorsCreationMode.markdown,
      },
    ],
  };
}

var exportMcpConnectorsPattern: RegExp;

var resolveExportMcpConnectorsToLowerCase: (exportMcpConnectors?: Dynamic, ..._extraArguments: unknown[]) => string;

var exportMcpConnectorsPattern2: RegExp;

function resolveExportMcpConnectorsTrim(
  exportMcpConnectorsTrim?: unknown,
  ..._extraArguments: unknown[]
) {
  if (typeof exportMcpConnectorsTrim == `string`)
    try {
      let url = new URL(exportMcpConnectorsTrim.trim());
      return url.protocol === `https:` &&
        url.username === `` &&
        exportMcpConnectorsPattern2.test(url.hostname)
        ? url.href
        : undefined;
    } catch {
      return;
    }
}

function resolveExportMcpConnectorsValue4(
  exportMcpConnectorsValue4?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  try {
    return JSON.parse(exportMcpConnectorsValue4);
  } catch {
    return;
  }
}

function resolveExportMcpConnectorsPayload(
  node?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let payload: Dynamic =
    resolveExportMcpConnectorsValue(node) && `payload` in node
      ? node.payload
      : node;
  let items: Dynamic = [
    typeof payload == `string`
      ? resolveExportMcpConnectorsValue4(payload)
      : payload,
  ];
  if (resolveExportMcpConnectorsValue(node) && Array.isArray(node.content))
    for (let resolveExportMcpConnectorsPayloadResult of node.content as Dynamic)
      if (
        resolveExportMcpConnectorsValue(
          resolveExportMcpConnectorsPayloadResult,
        ) &&
        typeof resolveExportMcpConnectorsPayloadResult.text == `string`
      ) {
        items.push(
          resolveExportMcpConnectorsValue4(
            resolveExportMcpConnectorsPayloadResult.text,
          ),
        );
      }
  let items2: Dynamic = [];
  let resolveExportMcpConnectorsValue8 = (
    exportMcpConnectorsPayload?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      resolveExportMcpConnectorsValue(exportMcpConnectorsPayload) &&
      !Array.isArray(exportMcpConnectorsPayload)
    ) {
      items2.push(exportMcpConnectorsPayload);
    }
  };
  for (let resolveExportMcpConnectorsPayloadResult of items as Dynamic)
    if (Array.isArray(resolveExportMcpConnectorsPayloadResult)) {
      resolveExportMcpConnectorsValue8(
        resolveExportMcpConnectorsPayloadResult[0],
      );
    } else {
      if (
        resolveExportMcpConnectorsValue(resolveExportMcpConnectorsPayloadResult)
      ) {
        resolveExportMcpConnectorsValue8(
          resolveExportMcpConnectorsPayloadResult,
        );
        if (Array.isArray(resolveExportMcpConnectorsPayloadResult.pages)) {
          resolveExportMcpConnectorsValue8(
            resolveExportMcpConnectorsPayloadResult.pages[0],
          );
        }
        if (Array.isArray(resolveExportMcpConnectorsPayloadResult.results)) {
          resolveExportMcpConnectorsValue8(
            resolveExportMcpConnectorsPayloadResult.results[0],
          );
        }
        resolveExportMcpConnectorsValue8(
          resolveExportMcpConnectorsPayloadResult.page,
        );
      }
    }
  for (let resolveExportMcpConnectorsPayloadResult of items2 as Dynamic) {
    let exportMcpConnectorsTrim =
      resolveExportMcpConnectorsTrim(
        resolveExportMcpConnectorsPayloadResult.url,
      ) ??
      resolveExportMcpConnectorsTrim(
        resolveExportMcpConnectorsPayloadResult.public_url,
      );
    if (exportMcpConnectorsTrim !== undefined) return exportMcpConnectorsTrim;
  }
  for (let resolveExportMcpConnectorsPayloadResult of items2 as Dynamic)
    if (
      typeof resolveExportMcpConnectorsPayloadResult.id == `string` &&
      exportMcpConnectorsPattern.test(
        resolveExportMcpConnectorsPayloadResult.id,
      )
    )
      return resolveExportMcpConnectorsToLowerCase(
        resolveExportMcpConnectorsPayloadResult.id,
      );
}

async function loadExportMcpConnectorsCode(
  exportMcpConnectorsCode?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let platformFrameAndCapabilitiesMounted: Dynamic =
    await loadPlatformFrameAndCapabilitiesMounted(exportMcpConnectorsCode);
  if (
    platformFrameAndCapabilitiesMounted === null ||
    typeof platformFrameAndCapabilitiesMounted.callTool != `function`
  )
    return {
      ok: false,
      code: `unavailable`,
    };
  if (!resolveExportMcpConnectorsMarkdown(options))
    return {
      ok: false,
      code: `too_large_for_call`,
    };
  if (
    !(await loadExportMcpConnectorsListTools(
      platformFrameAndCapabilitiesMounted,
    ))
  )
    return {
      ok: false,
      code: `no_notion_tool`,
    };
  let loadExportMcpConnectorsCodeResult: Dynamic;
  try {
    loadExportMcpConnectorsCodeResult =
      await platformFrameAndCapabilitiesMounted.callTool(
        ExportMcpConnectorsNotion,
        ExportMcpConnectorsNotionCreatePages,
        resolveExportMcpConnectorsCreationMode(options),
        {
          cache: false,
        },
      );
  } catch (error: Dynamic) {
    if (
      resolvePlatformFrameAndCapabilitiesUpstreamError(error) &&
      (await loadPlatformFrameAndCapabilitiesState(
        exportMcpConnectorsCode,
        ExportMcpConnectorsState,
      )) !== `granted`
    )
      return {
        ok: false,
        code: `consent_undecided`,
        retryable: true,
      };
    let code: Dynamic =
      resolveExportMcpConnectorsValue(error) && typeof error.code == `string`
        ? error.code
        : ``;
    let hasCode: Dynamic = exportMcpConnectorsSet.has(code);
    return {
      ok: false,
      code: hasCode ? code : `upstream_error`,
      ...(hasCode
        ? {}
        : {
            unlisted: true,
          }),
      ...(resolveExportMcpConnectorsValue(error) && error.retryable === true
        ? {
            retryable: true,
          }
        : {}),
      ...(code === `tool_error` &&
      resolveExportMcpConnectorsValue(error) &&
      typeof error.message == `string`
        ? {
            message: error.message,
          }
        : {}),
    };
  }
  if (
    resolveExportMcpConnectorsValue(loadExportMcpConnectorsCodeResult) &&
    loadExportMcpConnectorsCodeResult.isError === true
  )
    return {
      ok: false,
      code: `tool_error`,
    };
  let url = resolveExportMcpConnectorsPayload(
    loadExportMcpConnectorsCodeResult,
  );
  return {
    ok: true,
    ...(url === undefined
      ? {}
      : {
          url: url,
        }),
  };
}

var exportMcpConnectorsClaudeDocsClaudePagesValues: string[];

var ExportMcpConnectorsExport: string;

var ExportMcpConnectorsState3: string;

var exportMcpConnectorsSet2: Dynamic;

var resolveExportMcpConnectorsKeptAsText: Dynamic;

var resolveExportMcpConnectorsValue5: Dynamic;

function resolveExportMcpConnectorsExport(
  exportMcpConnectorsExport?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    !resolveExportMcpConnectorsValue5(exportMcpConnectorsExport) ||
    !Array.isArray(exportMcpConnectorsExport.servers)
  )
    return null;
  let resolveExportMcpConnectorsExportResult: Dynamic = null;
  for (let resolveExportMcpConnectorsExportResult2 of exportMcpConnectorsClaudeDocsClaudePagesValues as Dynamic) {
    let server: Dynamic = exportMcpConnectorsExport.servers.find(
      (server2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        resolveExportMcpConnectorsValue5(server2) &&
        server2.server === resolveExportMcpConnectorsExportResult2,
    );
    if (
      !(
        !resolveExportMcpConnectorsValue5(server) ||
        !Array.isArray(server.tools)
      )
    ) {
      if (
        server.tools.some(
          (tool?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            resolveExportMcpConnectorsValue5(tool) && tool.name === `export`,
        )
      )
        return resolveExportMcpConnectorsExportResult2;
      if (server.tools.length === 0) {
        resolveExportMcpConnectorsExportResult ??=
          resolveExportMcpConnectorsExportResult2;
      }
    }
  }
  return resolveExportMcpConnectorsExportResult;
}

var ExportMcpConnectorsListFailed: string;

async function loadExportMcpConnectorsListTools2(
  exportMcpConnectorsList?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  if (typeof exportMcpConnectorsList.listTools != `function`) return null;
  try {
    return resolveExportMcpConnectorsExport(
      await exportMcpConnectorsList.listTools(),
    );
  } catch {
    return ExportMcpConnectorsListFailed;
  }
}

async function loadExportMcpConnectorsValue(
  exportMcpConnectorsValue?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let exportMcpConnectorsListTools2: Dynamic =
    await loadExportMcpConnectorsListTools2(exportMcpConnectorsValue);
  return exportMcpConnectorsListTools2 === ExportMcpConnectorsListFailed
    ? null
    : exportMcpConnectorsListTools2;
}

async function loadExportMcpConnectorsValue2(
  exportMcpConnectorsValue2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let platformFrameAndCapabilitiesMounted: Dynamic =
    await loadPlatformFrameAndCapabilitiesMounted(exportMcpConnectorsValue2);
  let exportMcpConnectorsValue: Dynamic =
    platformFrameAndCapabilitiesMounted === null
      ? null
      : await loadExportMcpConnectorsValue(platformFrameAndCapabilitiesMounted);
  return exportMcpConnectorsValue === null
    ? null
    : `mcp:${exportMcpConnectorsValue}`;
}

var resolveExportMcpConnectorsValue6: Dynamic;

function resolveExportMcpConnectorsContainer(
  exportMcpConnectorsContainer?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    container: {
      kind: exportMcpConnectorsContainer.container.kind,
      id: exportMcpConnectorsContainer.container.id,
    },
    file: exportMcpConnectorsContainer.fileId,
    format: exportMcpConnectorsContainer.format,
    ...(exportMcpConnectorsContainer.format === `pdf` &&
    exportMcpConnectorsContainer.paper !== undefined
      ? {
          paper: exportMcpConnectorsContainer.paper,
        }
      : {}),
    ...(exportMcpConnectorsContainer.maxBytes === undefined
      ? {}
      : {
          maxBytes: Math.max(
            1,
            Math.floor(exportMcpConnectorsContainer.maxBytes),
          ),
        }),
  };
}

function resolveExportMcpConnectorsSplit(
  exportMcpConnectorsSplit?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  for (let resolveExportMcpConnectorsSplitResult of [
    exportMcpConnectorsSplit,
    exportMcpConnectorsSplit.split(
      `
`,
      1,
    )[0] ?? ``,
  ] as Dynamic)
    try {
      let parse: Dynamic = JSON.parse(resolveExportMcpConnectorsSplitResult);
      if (resolveExportMcpConnectorsValue5(parse) && !Array.isArray(parse))
        return parse;
    } catch {}
  return null;
}

function resolveExportMcpConnectorsText(
  node?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!resolveExportMcpConnectorsValue5(node)) return null;
  if (
    resolveExportMcpConnectorsValue5(node.payload) &&
    !Array.isArray(node.payload)
  )
    return node.payload;
  let content: Dynamic = Array.isArray(node.content) ? node.content : [];
  for (let resolveExportMcpConnectorsTextResult of content as Dynamic) {
    if (
      !resolveExportMcpConnectorsValue5(resolveExportMcpConnectorsTextResult) ||
      resolveExportMcpConnectorsTextResult.type !== `text` ||
      typeof resolveExportMcpConnectorsTextResult.text != `string`
    )
      continue;
    let exportMcpConnectorsSplit: Dynamic = resolveExportMcpConnectorsSplit(
      resolveExportMcpConnectorsTextResult.text,
    );
    if (exportMcpConnectorsSplit) return exportMcpConnectorsSplit;
  }
  return null;
}

function resolveExportMcpConnectorsCode(
  exportMcpConnectorsCode?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let reason: Dynamic =
    typeof exportMcpConnectorsCode.reason == `string`
      ? exportMcpConnectorsCode.reason
      : ``;
  let data: Dynamic = resolveExportMcpConnectorsValue5(
    exportMcpConnectorsCode.data,
  )
    ? exportMcpConnectorsCode.data
    : {};
  switch (reason) {
    case `doc_too_large`:
      return {
        ok: false,
        code: `too_large`,
        dim: data.dim === `pages` ? `pages` : `bytes`,
        ...(typeof data.limit == `number`
          ? {
              limit: data.limit,
            }
          : {}),
        reason: reason,
      };
    case `unavailable`: {
      let reason2: Dynamic = typeof data.why == `string` ? data.why : ``;
      return reason2 !== `render` && reason2 !== `render_rate`
        ? {
            ok: false,
            code: `failed`,
            retryable: true,
            reason: reason,
          }
        : {
            ok: false,
            code: `renderer_unavailable`,
            ...(data.problem === `dark`
              ? {}
              : {
                  retryable: true,
                }),
            reason: reason2,
          };
    }
    case `forbidden`:
    case `unknown_id`:
      return {
        ok: false,
        code: `denied`,
        reason: reason,
      };
    case `bad_request`: {
      let reason2: Dynamic =
        typeof data.problem == `string` ? data.problem : reason;
      return reason2 === `unsupported`
        ? {
            ok: false,
            code: `no_node`,
            reason: reason2,
          }
        : {
            ok: false,
            code: `malformed`,
            reason: reason2,
          };
    }
    case `intent-shape`:
      return (typeof exportMcpConnectorsCode.detail == `string`
        ? exportMcpConnectorsCode.detail
        : ``
      ).startsWith(`format:invalid_value`)
        ? {
            ok: false,
            code: `unavailable`,
            reason: `format`,
          }
        : {
            ok: false,
            code: `malformed`,
            reason: `intent-shape`,
          };
    default:
      return {
        ok: false,
        code: `failed`,
        ...(reason === ``
          ? {}
          : {
              reason: reason,
            }),
      };
  }
}

function resolveExportMcpConnectorsDeny(
  error?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let exportMcpConnectorsText: Dynamic = resolveExportMcpConnectorsText(
    error.result,
  );
  if (
    exportMcpConnectorsText !== null &&
    exportMcpConnectorsText.verdict === `deny`
  )
    return exportMcpConnectorsText;
  let exportMcpConnectorsSplit: Dynamic =
    typeof error.message == `string`
      ? resolveExportMcpConnectorsSplit(error.message)
      : null;
  return exportMcpConnectorsSplit !== null &&
    exportMcpConnectorsSplit.verdict === `deny`
    ? exportMcpConnectorsSplit
    : null;
}

function resolveExportMcpConnectorsCode2(
  error?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let code: Dynamic =
    resolveExportMcpConnectorsValue5(error) && typeof error.code == `string`
      ? error.code
      : ``;
  let reason: Dynamic =
    resolveExportMcpConnectorsValue5(error) && typeof error.message == `string`
      ? error.message
      : undefined;
  if (code === `tool_error` && resolveExportMcpConnectorsValue5(error)) {
    let exportMcpConnectorsDeny: Dynamic =
      resolveExportMcpConnectorsDeny(error);
    return exportMcpConnectorsDeny === null
      ? {
          ok: false,
          code: `failed`,
          ...(reason === undefined
            ? {}
            : {
                reason: reason,
              }),
        }
      : resolveExportMcpConnectorsCode(exportMcpConnectorsDeny);
  }
  let hasCode: Dynamic = exportMcpConnectorsSet2.has(code);
  return {
    ok: false,
    code: hasCode ? code : `upstream_error`,
    ...(hasCode
      ? {}
      : {
          unlisted: true,
        }),
    ...(resolveExportMcpConnectorsValue5(error) && error.retryable === true
      ? {
          retryable: true,
        }
      : {}),
    ...(reason === undefined
      ? {}
      : {
          reason: reason,
        }),
  };
}

var resolveExportMcpConnectorsCode3: Dynamic;

function resolveExportMcpConnectorsValue7(
  exportMcpConnectorsValue7?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  try {
    return resolvePlatformFrameAndCapabilitiesFrom(exportMcpConnectorsValue7);
  } catch {
    return null;
  }
}

function resolveExportMcpConnectorsCode4(
  exportMcpConnectorsCode4?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let exportMcpConnectorsText: Dynamic = resolveExportMcpConnectorsText(
    exportMcpConnectorsCode4,
  );
  if (exportMcpConnectorsText === null)
    return resolveExportMcpConnectorsValue5(exportMcpConnectorsCode4) &&
      exportMcpConnectorsCode4.isError === true
      ? {
          ok: false,
          code: `failed`,
        }
      : {
          ok: false,
          code: `malformed`,
          reason: `no ack`,
        };
  if (exportMcpConnectorsText.verdict === `deny`)
    return resolveExportMcpConnectorsCode(exportMcpConnectorsText);
  let data: Dynamic = resolveExportMcpConnectorsValue5(
    exportMcpConnectorsText.data,
  )
    ? exportMcpConnectorsText.data
    : null;
  if (
    exportMcpConnectorsText.verdict !== `allow` ||
    data === null ||
    typeof data.bytes_b64 != `string`
  )
    return {
      ok: false,
      code: `malformed`,
      reason: `no bytes`,
    };
  if (typeof data.format == `string` && data.format !== options.format)
    return {
      ok: false,
      code: `malformed`,
      reason: `format`,
    };
  let bytes: Dynamic = resolveExportMcpConnectorsValue7(data.bytes_b64);
  return bytes === null || bytes.length === 0
    ? {
        ok: false,
        code: `malformed`,
        reason: `base64`,
      }
    : typeof data.bytes == `number` && data.bytes !== bytes.length
      ? {
          ok: false,
          code: `malformed`,
          reason: `length`,
        }
      : isExportMcpConnectorsFatal(options.format, data, bytes)
        ? {
            ok: true,
            bytes: bytes,
            notes: resolveExportMcpConnectorsCode3(data.notes),
          }
        : {
            ok: false,
            code: `malformed`,
            reason: `type`,
          };
}

function isExportMcpConnectorsFatal(
  exportMcpConnectorsFatal?: Dynamic,
  options?: Dynamic,
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  switch (exportMcpConnectorsFatal) {
    case `pdf`: {
      if (typeof options.mime == `string` && options.mime !== `application/pdf`)
        return false;
      let items2 = [37, 80, 68, 70, 45];
      return (
        items.length > items2.length &&
        items2.every(
          (
            rolldownNImport2?: Dynamic,
            index?: Dynamic,
            ..._extraArguments: unknown[]
          ) => items[index] === rolldownNImport2,
        )
      );
    }
    case `markdown`:
    case `notion`:
      if (typeof options.mime == `string` && options.mime !== `text/markdown`)
        return false;
      try {
        new TextDecoder(`utf-8`, {
          fatal: true,
        }).decode(items);
        return true;
      } catch {
        return false;
      }
    case `docx`: {
      if (
        typeof options.mime == `string` &&
        options.mime !== ExportMcpConnectorsState3
      )
        return false;
      let items2 = [80, 75, 3, 4];
      return (
        items.length > items2.length &&
        items2.every(
          (
            rolldownNImport2?: Dynamic,
            index?: Dynamic,
            ..._extraArguments: unknown[]
          ) => items[index] === rolldownNImport2,
        )
      );
    }
    default:
      return exportMcpConnectorsFatal;
  }
}

async function loadExportMcpConnectorsCode2(
  exportMcpConnectorsCode2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let platformFrameAndCapabilitiesAbsent: Dynamic =
    await loadPlatformFrameAndCapabilitiesAbsent(exportMcpConnectorsCode2);
  if (platformFrameAndCapabilitiesAbsent.at === `withheld`)
    return {
      ok: false,
      code: `withheld`,
    };
  let ns2: Dynamic =
    platformFrameAndCapabilitiesAbsent.at === `mounted`
      ? platformFrameAndCapabilitiesAbsent.ns
      : null;
  if (ns2 === null || typeof ns2.callTool != `function`)
    return {
      ok: false,
      code: `unavailable`,
    };
  let exportMcpConnectorsListTools2: Dynamic =
    await loadExportMcpConnectorsListTools2(ns2);
  if (exportMcpConnectorsListTools2 === ExportMcpConnectorsListFailed)
    return {
      ok: false,
      code: `list_failed`,
      retryable: true,
    };
  if (exportMcpConnectorsListTools2 === null)
    return {
      ok: false,
      code: `no_export_tool`,
    };
  let loadExportMcpConnectorsCode2Result: Dynamic;
  try {
    loadExportMcpConnectorsCode2Result = await ns2.callTool(
      exportMcpConnectorsListTools2,
      ExportMcpConnectorsExport,
      resolveExportMcpConnectorsContainer(options),
      {
        cache: false,
      },
    );
  } catch (loadExportMcpConnectorsCode2Result2: Dynamic) {
    return resolvePlatformFrameAndCapabilitiesUpstreamError(
      loadExportMcpConnectorsCode2Result2,
    ) &&
      (await loadPlatformFrameAndCapabilitiesState(
        exportMcpConnectorsCode2,
        `mcp:${exportMcpConnectorsListTools2}`,
      )) !== `granted`
      ? {
          ok: false,
          code: `consent_undecided`,
          retryable: true,
        }
      : resolveExportMcpConnectorsCode2(loadExportMcpConnectorsCode2Result2);
  }
  return resolveExportMcpConnectorsCode4(
    loadExportMcpConnectorsCode2Result,
    options,
  );
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeExportMcpConnectorsStep1(): void {
  (ExportMcpConnectorsNotion = `Notion`);
  (ExportMcpConnectorsNotionCreatePages = `notion-create-pages`);
  (ExportMcpConnectorsState = `mcp:${ExportMcpConnectorsNotion}`);
  (ExportMcpConnectorsState2 = PlatformFrameAndCapabilitiesState2);
  (exportMcpConnectorsSet = new (Set as Dynamic)(
    platformFrameAndCapabilitiesNeedsReauthServerNotConnectedSelectionRequiredServerNotFoundValues,
  ));
  (resolveExportMcpConnectorsValue = (
    exportMcpConnectorsValue?: unknown,
    ..._extraArguments: unknown[]
  ) => typeof exportMcpConnectorsValue == `object` && !!exportMcpConnectorsValue);
  (resolveExportMcpConnectorsValue2 = (
    exportMcpConnectorsValue2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    loadPlatformFrameAndCapabilitiesWithheld(
      exportMcpConnectorsValue2,
      isExportMcpConnectorsNotion,
    ));
  (resolveExportMcpConnectorsValue3 = (
    exportMcpConnectorsValue3?: Dynamic,
    options?: Dynamic,
    context: Dynamic = [],
    ..._extraArguments: unknown[]
  ) =>
    loadPlatformFrameAndCapabilitiesFilter(
      exportMcpConnectorsValue3,
      options,
      ExportMcpConnectorsState,
      context,
    ));
  (resolveExportMcpConnectorsEncode = (
    exportMcpConnectorsEncode?: Dynamic,
    ..._extraArguments: unknown[]
  ) => new TextEncoder().encode(JSON.stringify(exportMcpConnectorsEncode)).length);
  (resolveExportMcpConnectorsMarkdown = (
    exportMcpConnectorsMarkdown?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    resolveExportMcpConnectorsEncode(exportMcpConnectorsMarkdown.markdown) +
      resolveExportMcpConnectorsEncode(exportMcpConnectorsMarkdown.title) <=
    ExportMcpConnectorsState2);
  (exportMcpConnectorsPattern = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/iu);
  (resolveExportMcpConnectorsToLowerCase = (
    exportMcpConnectors?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `https://app.notion.com/p/${exportMcpConnectors.replace(/-/g, ``).toLowerCase()}`);
  (exportMcpConnectorsPattern2 = /^(?:[a-z0-9-]+\.)*notion\.(?:com|so|site)$/iu);
  (exportMcpConnectorsClaudeDocsClaudePagesValues = [
    `Claude Docs`,
    `Claude Pages`,
  ]);
  (ExportMcpConnectorsExport = `export`);
  (ExportMcpConnectorsState3 = PlatformFrameAndCapabilitiesApplicationVndOpenxmlformatsOfficedocumentWordprocessingmlDocument);
  (exportMcpConnectorsSet2 = new (Set as Dynamic)(
    platformFrameAndCapabilitiesNeedsReauthServerNotConnectedSelectionRequiredServerNotFoundValues,
  ));
  (resolveExportMcpConnectorsKeptAsText = (
    exportMcpConnectorsKeptAsText?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    exportMcpConnectorsKeptAsText.reduce(
      (
        accumulator?: Dynamic,
        error?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        error.code === `kept_as_text` ? accumulator : accumulator + error.count,
      0,
    ));
  (resolveExportMcpConnectorsValue5 = (
    exportMcpConnectorsValue5?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof exportMcpConnectorsValue5 == `object` && !!exportMcpConnectorsValue5);
  (ExportMcpConnectorsListFailed = `list_failed`);
  (resolveExportMcpConnectorsValue6 = (
    exportMcpConnectorsValue6?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    loadPlatformFrameAndCapabilitiesWithheld(
      exportMcpConnectorsValue6,
      (exportMcpConnectorsValue62?: Dynamic, ..._extraArguments: unknown[]) =>
        resolveExportMcpConnectorsExport(exportMcpConnectorsValue62) !== null,
    ));
  (resolveExportMcpConnectorsCode3 = (
    exportMcpConnectorsCode3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    Array.isArray(exportMcpConnectorsCode3)
      ? exportMcpConnectorsCode3.flatMap(
          (error?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            resolveExportMcpConnectorsValue5(error) &&
            typeof error.code == `string` &&
            typeof error.what == `string`
              ? [
                  {
                    code: error.code,
                    what: error.what,
                    count:
                      typeof error.count == `number` && error.count > 0
                        ? error.count
                        : 1,
                  },
                ]
              : [],
        )
      : []);
}

export {
  loadExportMcpConnectorsCode,
  loadExportMcpConnectorsCode2,
  loadExportMcpConnectorsValue2,
  resolveExportMcpConnectorsKeptAsText,
  resolveExportMcpConnectorsRefused,
  resolveExportMcpConnectorsValue2,
  resolveExportMcpConnectorsValue3,
  resolveExportMcpConnectorsValue6,
};
