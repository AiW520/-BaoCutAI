/** BaoCut: document export from index-CX4IZqzA.js. */
import type { Dynamic } from "./types";
import {
  PlatformFrameAndCapabilitiesApplicationVndOpenxmlformatsOfficedocumentWordprocessingmlDocument,
  PlatformFrameAndCapabilitiesFloor,
  resolveDataContentAndReferencesValue3,
  resolveExportMcpConnectorsKeptAsText,
  resolvePlatformFrameAndCapabilitiesGdriveUpload,
  resolvePlatformFrameAndCapabilitiesValue7,
} from "./docs-app-dependencies";
import {
  TAB_NAVIGATION_DEBOUNCE_MS,
} from "./docs-app-document-context-actions-tab-tree-rows";

function exportFilename(
  exportFilename2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let filteredReplacePartsText: Dynamic = exportFilename2
    .replace(/[/\\:*?"<>|\u{0}-\u{1F}\u{7F}]/gu, ` `)
    .split(/\s+/)
    .filter(Boolean)
    .join(` `);
  let trimmedFilteredReplacePartsTextSliceText = Array.from<Dynamic>(
    filteredReplacePartsText,
  )
    .slice(0, TAB_NAVIGATION_DEBOUNCE_MS)
    .join(``)
    .trimEnd();
  return `${trimmedFilteredReplacePartsTextSliceText.length > 0 ? trimmedFilteredReplacePartsTextSliceText : `Untitled`}.${options}`;
}

var EXPORT_ORGANIZATION_DISABLED_MESSAGE: string;

function combineExportCapability(...combineExportCapability2: Dynamic[]) {
  return combineExportCapability2.includes(`unlisted`)
    ? `unlisted`
    : combineExportCapability2.includes(`unknown`)
      ? `unknown`
      : combineExportCapability2.includes(`withheld`)
        ? `withheld`
        : `ok`;
}

var isExportCapabilityOffered: Dynamic;

var EXPORT_NONEDITOR_ROLES: Dynamic;

function canExportForRole(
  result?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    (result === null || EXPORT_NONEDITOR_ROLES.has(result)) &&
    !resolveDataContentAndReferencesValue3(options)
  );
}

var defaultExportClock: (..._extraArguments: unknown[]) => number;

function reportExportResult(
  reportExportResult2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (reportExportResult2 !== undefined)
    try {
      reportExportResult2(options, context);
    } catch {}
}

var DOCUMENT_EXPORT_FORMATS: Dynamic;

var LETTER_PAPER_COUNTRIES: Dynamic;

function localeRegion(
  localeRegion2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  try {
    let locale: Dynamic = new (Intl.Locale as Dynamic)(
      localeRegion2.trim().replace(/_/g, `-`),
    );
    return locale.region ?? locale.maximize().region;
  } catch {
    return;
  }
}

function preferredPaperSize(
  preferredPaperSize2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  for (let preferredPaperSizeResult of preferredPaperSize2 as Dynamic) {
    let localeRegion2: Dynamic = localeRegion(preferredPaperSizeResult);
    if (localeRegion2 !== undefined)
      return LETTER_PAPER_COUNTRIES.has(localeRegion2) ? `letter` : `a4`;
  }
  return `letter`;
}

async function renderDocumentExport(
  documentExport?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let exportViaMcp: Dynamic = await options.exportViaMcp({
    container: options.container,
    fileId: options.fileId,
    format: documentExport.format,
    ...(documentExport.format === `pdf` && options.paper !== undefined
      ? {
          paper: options.paper,
        }
      : {}),
    ...(options.maxBytes === undefined
      ? {}
      : {
          maxBytes: options.maxBytes,
        }),
  });
  return exportViaMcp.ok
    ? {
        ok: true,
        filename: exportFilename(options.tabName, documentExport.ext),
        bytes: exportViaMcp.bytes,
        notes: exportViaMcp.notes,
        simplified: resolveExportMcpConnectorsKeptAsText(exportViaMcp.notes),
      }
    : exportViaMcp;
}

async function saveDocumentExport(
  saveDocumentExport2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let options2: Dynamic = await options({
    filename: saveDocumentExport2.filename,
    data: saveDocumentExport2.bytes,
  });
  return options2.ok
    ? {
        ok: true,
        filename: saveDocumentExport2.filename,
        notes: saveDocumentExport2.notes,
        simplified: saveDocumentExport2.simplified,
      }
    : {
        ok: false,
        code: options2.code,
        ...(options2.unlisted
          ? {
              unlisted: true,
            }
          : {}),
      };
}

async function exportDocumentDownload(
  exportDocumentDownload2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let now: Dynamic = options.now ?? defaultExportClock;
  let now2: Dynamic = now();
  let renderDocumentExport2: Dynamic = await renderDocumentExport(
    exportDocumentDownload2,
    options,
  );
  let renderMs: Dynamic = now() - now2;
  if (!renderDocumentExport2.ok) {
    reportExportResult(options.report, renderDocumentExport2, {
      renderMs: renderMs,
    });
    return renderDocumentExport2;
  }
  let saveDocumentExport2: Dynamic = await saveDocumentExport(
    renderDocumentExport2,
    options.save,
  );
  reportExportResult(options.report, saveDocumentExport2, {
    renderMs: renderMs,
    bytes: renderDocumentExport2.bytes.length,
  });
  return saveDocumentExport2;
}

var formatExportMegabytes: (exportMegabytes?: Dynamic, ..._extraArguments: unknown[]) => string;

function documentDownloadError(
  documentDownloadError2?: Dynamic,
  response?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (response.ok) return null;
  switch (response.code) {
    case `declined`:
    case `not_in_manifest`:
    case `consent_undecided`:
    case `cancelled`:
      return null;
    case `no_node`:
      return `This tab can't be exported.`;
    case `denied`:
      return `You can't export this tab.`;
    case `too_large`:
      return response.dim === `pages`
        ? response.limit === undefined
          ? `This tab is too long to export ${documentDownloadError2.asWords}.`
          : `This tab is too long to export ${documentDownloadError2.asWords} (over ${response.limit} pages).`
        : response.limit === undefined
          ? `This tab is too large to export ${documentDownloadError2.asWords}.`
          : `This tab is too large to export ${documentDownloadError2.asWords} (over ${formatExportMegabytes(response.limit)}).`;
    case `renderer_unavailable`:
      return response.reason === `render_rate`
        ? `You've exported a lot in the last minute. Try ${documentDownloadError2.name} again in a minute.`
        : `${documentDownloadError2.name} export is busy. Try again in a moment.`;
    case `server_unavailable`:
    case `rate_limited`:
      return `${documentDownloadError2.name} export is busy. Try again in a moment.`;
    case `server_not_connected`:
    case `server_not_found`:
    case `needs_reauth`:
    case `selection_required`:
      return `${documentDownloadError2.name} export isn't available for your account.`;
    case `blocked_by_policy`:
    case `approval_required`:
      return `Your organization doesn't allow ${documentDownloadError2.name} export here.`;
    case `withheld`:
      return EXPORT_ORGANIZATION_DISABLED_MESSAGE;
    case `extension_not_enabled`:
    case `rejected_extension`:
      return `${documentDownloadError2.name} exports aren't enabled in this view yet.`;
    case `unavailable`:
    case `no_export_tool`:
    case `not_granted`:
    case `capability_disabled`:
    case `capability_removed`:
      return `${documentDownloadError2.name} export isn't available in this view.`;
    default:
      return `Couldn't export this tab ${documentDownloadError2.asWords}. Try again in a moment.`;
  }
}

function exportSuccessNotice(
  exportSuccessNotice2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let title = `Exported ${exportSuccessNotice2}`;
  return options <= 0
    ? {
        title: title,
      }
    : {
        title: title,
        description:
          options === 1
            ? `1 item was simplified.`
            : `${options} items were simplified.`,
      };
}

function simplifiedDownloadNotice(
  simplifiedDownloadNotice2?: Dynamic,
  response?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return !response.ok ||
    response.simplified <= 0 ||
    countDroppedExportPictures(response.notes) > 0
    ? null
    : exportSuccessNotice(
        simplifiedDownloadNotice2.asWords,
        response.simplified,
      );
}

function downloadSuccessToast(
  downloadSuccess?: Dynamic,
  response?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return !response.ok ||
    response.simplified > 0 ||
    countDroppedExportPictures(response.notes) > 0
    ? null
    : exportSuccessNotice(downloadSuccess.asWords, 0).title;
}

function downloadDroppedPictureNotice(
  downloadDroppedPictureNotice2?: Dynamic,
  response?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return response.ok
    ? droppedExportPictureNotice(
        response.notes,
        downloadDroppedPictureNotice2.asWords,
      )
    : null;
}

var DROPPED_EXPORT_PICTURE_PATTERN: RegExp;

var isDroppedExportPicture: Dynamic;

var countDroppedExportPictures: Dynamic;

function droppedExportPictureNotice(
  droppedExportPictureNotice2?: Dynamic,
  options?: Dynamic,
  context: Dynamic = false,
  ..._extraArguments: unknown[]
) {
  let countDroppedExportPictures2: Dynamic = countDroppedExportPictures(
    droppedExportPictureNotice2,
  );
  if (countDroppedExportPictures2 === 0) return null;
  let droppedExportPictureNoticeResult: Dynamic =
    resolveExportMcpConnectorsKeptAsText(
      droppedExportPictureNotice2.filter(
        (item?: Dynamic, ..._extraArguments: unknown[]) =>
          !isDroppedExportPicture(item),
      ),
    );
  let label = countDroppedExportPictures2 === 1 ? `it` : `them`;
  let label2 = context
    ? `With ${label}, the file was too large to send. Export as Word to keep ${label}.`
    : `With ${label}, the file was too large to export.`;
  let label3 =
    droppedExportPictureNoticeResult <= 0
      ? ``
      : droppedExportPictureNoticeResult === 1
        ? ` 1 other item was simplified.`
        : ` ${droppedExportPictureNoticeResult} other items were simplified.`;
  return {
    title: `Exported ${options} without ${countDroppedExportPictures2} image${countDroppedExportPictures2 === 1 ? `` : `s`}`,
    description: `${label2}${label3}`,
  };
}

function documentDownloadAvailability(
  entry?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return !isExportCapabilityOffered(entry.doorExport) ||
    !entry.downloadsOk ||
    !canExportForRole(entry.role, entry.viewerClass) ||
    entry.kind === `other`
    ? {
        offered: false,
        disabled: true,
        busy: false,
      }
    : {
        offered: true,
        disabled: entry.kind !== `doc` || entry.exporting,
        busy: entry.exporting,
      };
}

var isExportErrorObject: Dynamic;

function tryParseExportErrorJson(
  tryParseExportErrorJson2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (tryParseExportErrorJson2.trimStart().startsWith(`{`))
    try {
      return JSON.parse(tryParseExportErrorJson2);
    } catch {
      return;
    }
}

function nestedExportErrorMessage(
  error?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (options < 0 || !isExportErrorObject(error)) return;
  let nestedExportErrorMessage2: Dynamic =
    typeof error.body == `string`
      ? nestedExportErrorMessage(
          tryParseExportErrorJson(error.body),
          options - 1,
        )
      : undefined;
  return nestedExportErrorMessage2 === undefined
    ? typeof error.message == `string` && error.message.trim() !== ``
      ? error.message
      : nestedExportErrorMessage(error.error, options - 1)
    : nestedExportErrorMessage2;
}

var EXPORT_ERROR_CONTROL_PATTERN: RegExp;

function sanitizeExportErrorMessage(
  sanitizeExportErrorMessage2?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof sanitizeExportErrorMessage2 != `string`) return null;
  let filteredReplacePartsText: Dynamic = (
    nestedExportErrorMessage(
      tryParseExportErrorJson(sanitizeExportErrorMessage2),
      2,
    ) ?? sanitizeExportErrorMessage2
  )
    .replace(EXPORT_ERROR_CONTROL_PATTERN, ` `)
    .split(/\s+/)
    .filter(Boolean)
    .join(` `);
  if (filteredReplacePartsText === ``) return null;
  let filteredReplacePartsText2: Dynamic = Array.from<Dynamic>(
    filteredReplacePartsText,
  );
  return filteredReplacePartsText2.length <= 240
    ? filteredReplacePartsText
    : `${filteredReplacePartsText2.slice(0, 239).join(``).trimEnd()}…`;
}

var GOOGLE_DOCS_EXPORTING_MESSAGE: string;

var GOOGLE_DOCS_CONSENT_MESSAGES: {
    consent_declined: {
        title: string;
        description: string;
    };
    consent_closed: {
        title: string;
        description: string;
    };
    consent_unasked: {
        title: string;
        description: string;
    };
    consent_undecided: {
        title: string;
        description: string;
    };
};

var GOOGLE_DOCS_FAILURE_MESSAGES: Dynamic;

var OPEN_CONNECTORS_LABEL: string;

var CONNECTOR_SETTINGS_URL: string;

var EXPORT_AS_WORD_LABEL: string;

async function exportToGoogleDocs(
  result?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let now: Dynamic = result.now ?? defaultExportClock;
  let reportExportResult2: Dynamic = (
    result2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => (reportExportResult(result.report, result2, options), result2);
  if (result.withheld !== undefined && (await result.withheld()))
    return reportExportResult2(
      {
        ok: false,
        stage: `render`,
        code: `withheld`,
      },
      {
        renderMs: 0,
      },
    );
  let consent: Dynamic = await result.consent();
  if (consent === `declined`)
    return reportExportResult2(
      {
        ok: false,
        stage: `consent`,
        code: `consent_declined`,
      },
      {
        renderMs: 0,
      },
    );
  if (consent === `closed`)
    return reportExportResult2(
      {
        ok: false,
        stage: `consent`,
        code: `consent_closed`,
      },
      {
        renderMs: 0,
      },
    );
  if (consent === `unasked`)
    return reportExportResult2(
      {
        ok: false,
        stage: `consent`,
        code: `consent_unasked`,
        retryable: true,
      },
      {
        renderMs: 0,
      },
    );
  result.proceeding?.();
  let fileArgs: Dynamic = await result.fileArgs();
  let renderDocumentExport2: Dynamic = (
    result2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    renderDocumentExport(DOCUMENT_EXPORT_FORMATS.docx, {
      container: result.container,
      fileId: result.fileId,
      tabName: result.tabName,
      ...(result2
        ? {
            maxBytes: PlatformFrameAndCapabilitiesFloor,
          }
        : {}),
      exportViaMcp: result.exportViaMcp,
    });
  let enabled = !fileArgs;
  let now2: Dynamic = now();
  let renderDocumentExport3: Dynamic = await renderDocumentExport2(enabled);
  let renderMs: Dynamic = now() - now2;
  if (!renderDocumentExport3.ok)
    return reportExportResult2(
      {
        ...renderDocumentExport3,
        stage: `render`,
      },
      {
        renderMs: renderMs,
      },
    );
  let now3: Dynamic = now();
  let upload: Dynamic = await result.upload({
    filename: renderDocumentExport3.filename,
    data: renderDocumentExport3.bytes,
    mime: PlatformFrameAndCapabilitiesApplicationVndOpenxmlformatsOfficedocumentWordprocessingmlDocument,
    fileArgs: fileArgs,
  });
  let deliverMs: Dynamic = now() - now3;
  let enabled2 = false;
  if (
    !upload.ok &&
    !enabled &&
    !resolvePlatformFrameAndCapabilitiesValue7(
      renderDocumentExport3.bytes.length,
    ) &&
    resolvePlatformFrameAndCapabilitiesGdriveUpload(upload)
  ) {
    enabled = true;
    enabled2 = true;
    now2 = now();
    renderDocumentExport3 = await renderDocumentExport2(enabled);
    renderMs += now() - now2;
    if (!renderDocumentExport3.ok)
      return reportExportResult2(
        {
          ...renderDocumentExport3,
          stage: `render`,
          fallback: true,
        },
        {
          renderMs: renderMs,
          deliverMs: deliverMs,
        },
      );
    now3 = now();
    upload = await result.upload({
      filename: renderDocumentExport3.filename,
      data: renderDocumentExport3.bytes,
      mime: PlatformFrameAndCapabilitiesApplicationVndOpenxmlformatsOfficedocumentWordprocessingmlDocument,
    });
    deliverMs += now() - now3;
  }
  let bytes: Dynamic = renderDocumentExport3.bytes.length;
  if (!upload.ok)
    return reportExportResult2(
      {
        ok: false,
        stage: `send`,
        code: upload.code,
        ...(upload.message === undefined
          ? {}
          : {
              reason: upload.message,
            }),
        ...(upload.retryable
          ? {
              retryable: true,
            }
          : {}),
        ...(upload.tool === undefined
          ? {}
          : {
              tool: upload.tool,
            }),
        ...(upload.failClass === undefined
          ? {}
          : {
              failClass: upload.failClass,
            }),
        ...(upload.shape === undefined
          ? {}
          : {
              shape: upload.shape,
            }),
        ...(upload.unlisted
          ? {
              unlisted: true,
            }
          : {}),
        ...(enabled2
          ? {
              fallback: true,
            }
          : {}),
      },
      {
        renderMs: renderMs,
        deliverMs: deliverMs,
        bytes: bytes,
      },
    );
  let filteredNotes: Dynamic = renderDocumentExport3.notes.filter(
    isDroppedExportPicture,
  );
  let wordKeepsPictures: Dynamic =
    enabled &&
    filteredNotes.length > 0 &&
    filteredNotes.every(
      (filteredNote?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        filteredNote.what.endsWith(`(file too large to deliver)`),
    ) &&
    (await result.downloads());
  return reportExportResult2(
    {
      ok: true,
      filename: renderDocumentExport3.filename,
      bytes: bytes,
      notes: renderDocumentExport3.notes,
      simplified: renderDocumentExport3.simplified,
      wordKeepsPictures: wordKeepsPictures,
      tool: upload.tool,
      ...(upload.url === undefined
        ? {}
        : {
            url: upload.url,
          }),
      ...(enabled2
        ? {
            fallback: true,
          }
        : {}),
    },
    {
      renderMs: renderMs,
      deliverMs: deliverMs,
      bytes: bytes,
    },
  );
}

var isGoogleDocsRelayTooLarge: Dynamic;

function googleDocsConsentNotice(
  response?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (response.ok) return null;
  switch (response.code) {
    case `consent_declined`:
      return GOOGLE_DOCS_CONSENT_MESSAGES.consent_declined;
    case `not_in_manifest`:
      return response.stage === `send`
        ? GOOGLE_DOCS_CONSENT_MESSAGES.consent_declined
        : null;
    case `consent_closed`:
      return GOOGLE_DOCS_CONSENT_MESSAGES.consent_closed;
    case `consent_unasked`:
      return GOOGLE_DOCS_CONSENT_MESSAGES.consent_unasked;
    case `consent_undecided`:
      return GOOGLE_DOCS_CONSENT_MESSAGES.consent_undecided;
    default:
      return null;
  }
}

function googleDocsExportError(
  response?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (response.ok) return null;
  let googleDocsFailureKind2: Dynamic = googleDocsFailureKind(response);
  if (googleDocsFailureKind2 !== null)
    return GOOGLE_DOCS_FAILURE_MESSAGES[googleDocsFailureKind2];
  switch (response.code) {
    case `consent_declined`:
    case `consent_closed`:
    case `consent_unasked`:
    case `consent_undecided`:
    case `not_in_manifest`:
    case `cancelled`:
      return null;
    case `no_node`:
      return `This tab can't be exported.`;
    case `denied`:
      return `You can't export this tab.`;
    case `too_large`:
      return isGoogleDocsRelayTooLarge(response) && response.limit !== undefined
        ? `This tab is too large to export (over ${formatExportMegabytes(response.limit)}).`
        : `This tab is too large to send to Google Drive directly. Export as Word and upload the file to Drive instead.`;
    case `too_large_for_call`:
      return `This tab is too large to send to Google Drive directly. Export as Word and upload the file to Drive instead.`;
    case `server_not_connected`:
    case `server_not_found`:
      return response.stage === `send`
        ? `Connect Google Drive in Settings → Connectors, then try again.`
        : `Google Docs export isn't available for your account.`;
    case `needs_reauth`:
      return response.stage === `send`
        ? `Reconnect Google Drive in Settings → Connectors, then try again.`
        : `Google Docs export isn't available for your account.`;
    case `selection_required`:
      return response.stage === `send`
        ? `Choose which Google Drive connection to use when asked, then try again.`
        : `Google Docs export isn't available for your account.`;
    case `blocked_by_policy`:
    case `approval_required`:
      return response.stage === `send`
        ? `Your Google Drive connector can't save files here. Check its tool permissions in Settings → Connectors, or ask your organization's admin. Export as Word instead.`
        : `Your organization doesn't allow Google Docs export here.`;
    case `withheld`:
      return EXPORT_ORGANIZATION_DISABLED_MESSAGE;
    case `tool_error`:
      return `Google Drive couldn't save this document. Try again, or export as Word instead.`;
    case `renderer_unavailable`:
    case `server_unavailable`:
    case `rate_limited`:
      return response.stage === `send`
        ? `Google Drive is busy. Try again in a moment.`
        : `Google Docs export is busy. Try again in a moment.`;
    case `malformed`:
    case `failed`:
      return `Couldn't export this tab to Google Docs. Try again in a moment.`;
    case `unavailable`:
    case `no_export_tool`:
    case `no_drive_tool`:
    case `not_granted`:
    case `capability_disabled`:
    case `capability_removed`:
      return `Google Docs export isn't available in this view.`;
    default:
      return `Couldn't export this tab to Google Docs. Try again in a moment.`;
  }
}

function googleDocsToolError(
  response?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (
    response.ok ||
    response.stage !== `send` ||
    response.code !== `tool_error`
  )
    return null;
  let sanitizeExportErrorMessage2: Dynamic = sanitizeExportErrorMessage(
    response.reason,
  );
  return sanitizeExportErrorMessage2 === null
    ? null
    : `Error from Google Drive: ${sanitizeExportErrorMessage2}`;
}

function googleDocsFailureKind(
  response?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return response.ok ||
    response.stage !== `send` ||
    response.code !== `tool_error` ||
    response.failClass === undefined
    ? null
    : (GOOGLE_DOCS_FAILURE_CLASSES[response.failClass] ?? null);
}

var GOOGLE_DOCS_FAILURE_CLASSES: Dynamic;

function googleDocsReconnectAction(
  googleDocsReconnectAction2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return googleDocsFailureKind(googleDocsReconnectAction2) === `reconnect`
    ? {
        url: CONNECTOR_SETTINGS_URL,
        label: OPEN_CONNECTORS_LABEL,
      }
    : null;
}

function canFallbackGoogleDocsExport(
  response?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return response.ok || googleDocsExportError(response) === null
    ? false
    : response.stage === `send` ||
        (response.code === `too_large` && !isGoogleDocsRelayTooLarge(response));
}

function googleDocsExportSuccess(
  response?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return !response.ok || countDroppedExportPictures(response.notes) > 0
    ? null
    : exportSuccessNotice(`to Google Docs`, response.simplified);
}

function googleDocsDroppedPictureNotice(
  response?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!response.ok) return null;
  let droppedExportPictureNotice2 = droppedExportPictureNotice(
    response.notes,
    `to Google Docs`,
    response.wordKeepsPictures,
  );
  return droppedExportPictureNotice2 === null
    ? null
    : response.url === undefined
      ? droppedExportPictureNotice2
      : {
          ...droppedExportPictureNotice2,
          url: response.url,
        };
}

function googleDocsExportAvailability(
  entry?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return !isExportCapabilityOffered(
    combineExportCapability(entry.drive, entry.doorExport),
  ) ||
    !canExportForRole(entry.role, entry.viewerClass) ||
    entry.kind === `other`
    ? {
        offered: false,
        disabled: true,
        busy: false,
      }
    : {
        offered: true,
        disabled: entry.kind !== `doc` || entry.exporting,
        busy: entry.exporting,
      };
}

var NOTION_EXPORTING_MESSAGE: string;

var NOTION_CONSENT_MESSAGES: {
    consent_declined: {
        title: string;
        description: string;
    };
    consent_closed: {
        title: string;
        description: string;
    };
    consent_unasked: {
        title: string;
        description: string;
    };
    consent_undecided: {
        title: string;
        description: string;
    };
};

var MAX_NOTION_PAGE_NAME_LENGTH: number;

function notionPageName(
  notionPageName2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let filteredReplacePartsText: Dynamic = notionPageName2
    .replace(/[\u{0}-\u{1F}\u{7F}]/gu, ` `)
    .split(/\s+/)
    .filter(Boolean)
    .join(` `);
  let trimmedFilteredReplacePartsTextSliceText = Array.from<Dynamic>(
    filteredReplacePartsText,
  )
    .slice(0, MAX_NOTION_PAGE_NAME_LENGTH)
    .join(``)
    .trimEnd();
  return trimmedFilteredReplacePartsTextSliceText.length > 0
    ? trimmedFilteredReplacePartsTextSliceText
    : `Untitled`;
}

async function exportToNotion(
  result?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let now: Dynamic = result.now ?? defaultExportClock;
  let reportExportResult2: Dynamic = (
    result2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => (reportExportResult(result.report, result2, options), result2);
  if (result.withheld !== undefined && (await result.withheld()))
    return reportExportResult2(
      {
        ok: false,
        stage: `render`,
        code: `withheld`,
      },
      {
        renderMs: 0,
      },
    );
  let consent: Dynamic = await result.consent();
  if (consent === `declined`)
    return reportExportResult2(
      {
        ok: false,
        stage: `consent`,
        code: `consent_declined`,
      },
      {
        renderMs: 0,
      },
    );
  if (consent === `closed`)
    return reportExportResult2(
      {
        ok: false,
        stage: `consent`,
        code: `consent_closed`,
      },
      {
        renderMs: 0,
      },
    );
  if (consent === `unasked`)
    return reportExportResult2(
      {
        ok: false,
        stage: `consent`,
        code: `consent_unasked`,
        retryable: true,
      },
      {
        renderMs: 0,
      },
    );
  result.proceeding?.();
  let now2: Dynamic = now();
  let exportViaMcp: Dynamic = await result.exportViaMcp({
    container: result.container,
    fileId: result.fileId,
    format: `notion`,
  });
  let renderMs: Dynamic = now() - now2;
  if (!exportViaMcp.ok)
    return reportExportResult2(
      {
        ...exportViaMcp,
        stage: `render`,
      },
      {
        renderMs: renderMs,
      },
    );
  let bytes: Dynamic = exportViaMcp.bytes.length;
  let title = notionPageName(result.tabName);
  let markdown = new TextDecoder().decode(exportViaMcp.bytes);
  let now3: Dynamic = now();
  let create2: Dynamic = await result.create({
    title: title,
    markdown: markdown,
  });
  return reportExportResult2(
    create2.ok
      ? {
          ok: true,
          title: title,
          notes: exportViaMcp.notes,
          simplified: resolveExportMcpConnectorsKeptAsText(exportViaMcp.notes),
          ...(create2.url === undefined
            ? {}
            : {
                url: create2.url,
              }),
        }
      : {
          ok: false,
          stage: `send`,
          code: create2.code,
          ...(create2.message === undefined
            ? {}
            : {
                reason: create2.message,
              }),
          ...(create2.retryable
            ? {
                retryable: true,
              }
            : {}),
          ...(create2.unlisted
            ? {
                unlisted: true,
              }
            : {}),
        },
    {
      renderMs: renderMs,
      deliverMs: now() - now3,
      bytes: bytes,
    },
  );
}

function notionConsentNotice(
  response?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (response.ok) return null;
  switch (response.code) {
    case `consent_declined`:
      return NOTION_CONSENT_MESSAGES.consent_declined;
    case `not_in_manifest`:
      return response.stage === `send`
        ? NOTION_CONSENT_MESSAGES.consent_declined
        : null;
    case `consent_closed`:
      return NOTION_CONSENT_MESSAGES.consent_closed;
    case `consent_unasked`:
      return NOTION_CONSENT_MESSAGES.consent_unasked;
    case `consent_undecided`:
      return NOTION_CONSENT_MESSAGES.consent_undecided;
    default:
      return null;
  }
}

function notionExportError(response?: Dynamic, ..._extraArguments: unknown[]) {
  if (response.ok) return null;
  switch (response.code) {
    case `consent_declined`:
    case `consent_closed`:
    case `consent_unasked`:
    case `consent_undecided`:
    case `not_in_manifest`:
    case `cancelled`:
      return null;
    case `no_node`:
      return `This tab can't be exported.`;
    case `denied`:
      return `You can't export this tab.`;
    case `too_large`:
    case `too_large_for_call`:
      return `This tab is too large to send to Notion. Export as Word instead.`;
    case `server_not_connected`:
    case `server_not_found`:
      return response.stage === `send`
        ? `Connect Notion in Settings → Connectors, then try again.`
        : `Notion export isn't available for your account.`;
    case `needs_reauth`:
      return response.stage === `send`
        ? `Reconnect Notion in Settings → Connectors, then try again.`
        : `Notion export isn't available for your account.`;
    case `selection_required`:
      return response.stage === `send`
        ? `Choose which Notion connection to use when asked, then try again.`
        : `Notion export isn't available for your account.`;
    case `blocked_by_policy`:
      return response.stage === `send`
        ? `Your Notion connector can't create pages here. Check its tool permissions in Settings → Connectors, or ask your organization's admin. Export as Word instead.`
        : `Your organization doesn't allow Notion export here.`;
    case `withheld`:
      return EXPORT_ORGANIZATION_DISABLED_MESSAGE;
    case `approval_required`:
      return `Exporting to Notion needs your approval. Try again and choose Allow.`;
    case `tool_error`:
      return `Notion couldn't create this page. Try again.`;
    case `renderer_unavailable`:
    case `server_unavailable`:
    case `rate_limited`:
      return response.stage === `send`
        ? `Notion is busy. Try again in a moment.`
        : `Notion export is busy. Try again in a moment.`;
    case `unavailable`:
    case `no_export_tool`:
    case `no_notion_tool`:
    case `not_granted`:
    case `capability_disabled`:
    case `capability_removed`:
      return `Notion export isn't available in this view.`;
    default:
      return `Couldn't export this tab to Notion. Try again in a moment.`;
  }
}

function notionToolError(response?: Dynamic, ..._extraArguments: unknown[]) {
  if (
    response.ok ||
    response.stage !== `send` ||
    response.code !== `tool_error`
  )
    return null;
  let sanitizeExportErrorMessage2: Dynamic = sanitizeExportErrorMessage(
    response.reason,
  );
  return sanitizeExportErrorMessage2 === null
    ? null
    : `Error from Notion: ${sanitizeExportErrorMessage2}`;
}

function notionExportSuccess(
  response?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return response.ok
    ? exportSuccessNotice(`to Notion`, response.simplified)
    : null;
}

function notionExportAvailability(
  entry?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return !isExportCapabilityOffered(
    combineExportCapability(entry.notion, entry.doorExport),
  ) ||
    !canExportForRole(entry.role, entry.viewerClass) ||
    entry.kind === `other`
    ? {
        offered: false,
        disabled: true,
        busy: false,
      }
    : {
        offered: true,
        disabled: entry.kind !== `doc` || entry.exporting,
        busy: entry.exporting,
      };
}

var ABORTED_EXPORT_CODES: Dynamic;

var EXPORT_TELEMETRY_REASONS: Dynamic;

function exportFailureTelemetry(
  exportFailureTelemetry2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let reason: Dynamic =
    exportFailureTelemetry2 === `too_large`
      ? options
        ? `payload_too_large`
        : `doc_too_large`
      : EXPORT_TELEMETRY_REASONS[exportFailureTelemetry2];
  return {
    outcome: ABORTED_EXPORT_CODES.has(exportFailureTelemetry2)
      ? `aborted`
      : `failed`,
    reason: reason,
  };
}

var googleDocsFailureTelemetry: Dynamic;

var downloadFailureTelemetry: Dynamic;

var notionFailureTelemetry: Dynamic;

var MAX_EXPORT_TELEMETRY_MS: number;

var MAX_EXPORT_TELEMETRY_BYTES: number;

var MAX_EXPORT_SIMPLIFIED_COUNT: number;

var clampExportTelemetryNumber: Dynamic;

function exportBytesTelemetry(
  exportBytesTelemetry2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let bytes: Dynamic = clampExportTelemetryNumber(
    exportBytesTelemetry2,
    MAX_EXPORT_TELEMETRY_BYTES,
  );
  return bytes === undefined
    ? {}
    : {
        bytes: bytes,
        relayFit: resolvePlatformFrameAndCapabilitiesValue7(bytes)
          ? `fits`
          : `over`,
      };
}

function exportTimingTelemetry(
  exportTimingTelemetry2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let deliverMs: Dynamic = clampExportTelemetryNumber(
    exportTimingTelemetry2.deliverMs,
    MAX_EXPORT_TELEMETRY_MS,
  );
  return {
    renderMs:
      clampExportTelemetryNumber(
        exportTimingTelemetry2.renderMs,
        MAX_EXPORT_TELEMETRY_MS,
      ) ?? 0,
    ...(deliverMs === undefined
      ? {}
      : {
          deliverMs: deliverMs,
        }),
  };
}

var exportRawFailureCode: Dynamic;

function exportTelemetryResult(
  format?: Dynamic,
  road?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let record: Dynamic = {
    format: format,
    road: road,
    ...exportTimingTelemetry(context),
    ...argument,
  };
  return `outcome` in dependencies
    ? {
        ...record,
        ...dependencies,
        ...exportBytesTelemetry(context.bytes),
        simplified: 0,
      }
    : {
        ...record,
        outcome: dependencies.simplified > 0 ? `degraded` : `ok`,
        ...exportBytesTelemetry(dependencies.bytes ?? context.bytes),
        simplified:
          clampExportTelemetryNumber(
            dependencies.simplified,
            MAX_EXPORT_SIMPLIFIED_COUNT,
          ) ?? 0,
      };
}

function googleDocsExportStage(
  response?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let label: Dynamic = response.ok ? `send` : response.stage;
  return response.fallback === true
    ? label === `render`
      ? `rerender`
      : label === `send`
        ? `resend`
        : label
    : label;
}

function googleDocsExportTelemetry(
  response?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return response.ok
    ? exportTelemetryResult(`gdoc`, `page_drive`, options, response, {
        stage: googleDocsExportStage(response),
        tool: response.tool,
      })
    : exportTelemetryResult(
        `gdoc`,
        `page_drive`,
        options,
        googleDocsFailureTelemetry(
          response.code,
          isGoogleDocsRelayTooLarge(response),
        ),
        {
          stage: googleDocsExportStage(response),
          rawCode: exportRawFailureCode(response),
          ...(response.tool === undefined
            ? {}
            : {
                tool: response.tool,
              }),
          ...(response.code === `tool_error` && response.shape !== undefined
            ? {
                shape: response.shape,
              }
            : {}),
          ...(response.code === `tool_error` && response.failClass !== undefined
            ? {
                failClass: response.failClass,
              }
            : {}),
        },
      );
}

var downloadExportTelemetry: Dynamic;

var notionExportTelemetry: Dynamic;

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeDocumentExportExportToGoogleDocsStep1(): void {
  (EXPORT_ORGANIZATION_DISABLED_MESSAGE = `Export is turned off for your organization.`);
  (isExportCapabilityOffered = (
    exportCapability?: Dynamic,
    ..._extraArguments: unknown[]
  ) => exportCapability === `ok` || exportCapability === `withheld`);
  (EXPORT_NONEDITOR_ROLES = new (Set as Dynamic)([
    `view`,
    `comment`,
    `interact`,
    `admin`,
  ]));
  (defaultExportClock = (..._extraArguments: unknown[]) => 0);
  (DOCUMENT_EXPORT_FORMATS = {
    pdf: {
      format: `pdf`,
      ext: `pdf`,
      label: `Export as PDF (.pdf)`,
      short: `PDF (.pdf)`,
      busyLabel: `Exporting to PDF…`,
      toastId: `pdf-export`,
      asWords: `as a PDF`,
      name: `PDF`,
    },
    markdown: {
      format: `markdown`,
      ext: `md`,
      label: `Export as Markdown (.md)`,
      short: `Markdown (.md)`,
      busyLabel: `Exporting to Markdown…`,
      toastId: `markdown-export`,
      asWords: `as Markdown`,
      name: `Markdown`,
    },
    docx: {
      format: `docx`,
      ext: `docx`,
      label: `Export as Word (.docx)`,
      short: `Word (.docx)`,
      busyLabel: `Exporting to Word…`,
      toastId: `docx-export`,
      asWords: `as Word`,
      name: `Word`,
    },
  });
  (LETTER_PAPER_COUNTRIES = new (Set as Dynamic)([`US`, `CA`]));
  (formatExportMegabytes = (
    exportMegabytes?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `${Math.max(1, Math.round(exportMegabytes / (1024 * 1024)))} MB`);
  (DROPPED_EXPORT_PICTURE_PATTERN = /^(?:images|embed snapshots) \(file too large(?: to deliver)?\)$/u);
  (isDroppedExportPicture = (
    error?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    error.code === `dropped` && DROPPED_EXPORT_PICTURE_PATTERN.test(error.what));
  (countDroppedExportPictures = (
    countDroppedExportPictures2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    countDroppedExportPictures2.reduce(
      (
        accumulator?: Dynamic,
        accumulator2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        isDroppedExportPicture(accumulator2)
          ? accumulator + accumulator2.count
          : accumulator,
      0,
    ));
  (isExportErrorObject = (
    exportErrorObject?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof exportErrorObject == `object` &&
    !!exportErrorObject &&
    !Array.isArray(exportErrorObject));
  (EXPORT_ERROR_CONTROL_PATTERN = /[\u{0}-\u{1F}\u{7F}-\u{9F}]/gu);
  (GOOGLE_DOCS_EXPORTING_MESSAGE = `Exporting to Google Docs…`);
  (GOOGLE_DOCS_CONSENT_MESSAGES = {
    consent_declined: {
      title: `Google Drive is turned off for this document, so nothing was exported.`,
      description: `To export here, reload the page, choose Export to Google Docs again and turn Google Drive on.`,
    },
    consent_closed: {
      title: `Google Drive wasn't allowed, so nothing was exported.`,
      description: `Choose Export to Google Docs again to allow it. If Google Drive isn't connected yet, press Connect first, then Continue. If you just connected it and the dialog still says Connect, close the dialog, wait a moment and export again.`,
    },
    consent_unasked: {
      title: `Nothing was exported. You can be asked about Google Drive again in a moment.`,
      description: `Try Export to Google Docs again shortly. If you still aren't asked, reload the page.`,
    },
    consent_undecided: {
      title: `This document's connectors weren't allowed, so nothing was exported.`,
      description: `Choose Export to Google Docs again and press Continue to allow them. If Google Drive isn't connected yet, press Connect first.`,
    },
  });
  (GOOGLE_DOCS_FAILURE_MESSAGES = {
    reconnect: `Your Google Drive connection doesn't let Claude create files. Export as Word instead, or reconnect Google Drive and allow Claude to create files.`,
    drive_full: `Your Google Drive storage is full. Free up space and try again, or export as Word instead.`,
    admin_off: `Your Google Workspace admin has turned off third-party Drive apps. Ask them to allow Claude, or export as Word instead.`,
  });
  (OPEN_CONNECTORS_LABEL = `Open Connectors`);
  (CONNECTOR_SETTINGS_URL = `https://claude.ai/settings/connectors`);
  (EXPORT_AS_WORD_LABEL = `Export as Word`);
  (isGoogleDocsRelayTooLarge = (
    response?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    !response.ok &&
    response.code === `too_large` &&
    response.limit !== undefined &&
    response.limit > PlatformFrameAndCapabilitiesFloor);
  (GOOGLE_DOCS_FAILURE_CLASSES = {
    insufficient_permission: `reconnect`,
    quota_full: `drive_full`,
    admin_disabled: `admin_off`,
  });
  (NOTION_EXPORTING_MESSAGE = `Exporting to Notion…`);
  (NOTION_CONSENT_MESSAGES = {
    consent_declined: {
      title: `Notion is turned off for this document, so nothing was exported.`,
      description: `To export here, reload the page, choose Export to Notion again and turn Notion on.`,
    },
    consent_closed: {
      title: `Notion wasn't allowed, so nothing was exported.`,
      description: `Choose Export to Notion again to allow it. If Notion isn't connected yet, press Connect first, then Continue. If you just connected it and the dialog still says Connect, close the dialog, wait a moment and export again.`,
    },
    consent_unasked: {
      title: `Nothing was exported. You can be asked about Notion again in a moment.`,
      description: `Try Export to Notion again shortly. If you still aren't asked, reload the page.`,
    },
    consent_undecided: {
      title: `This document's connectors weren't allowed, so nothing was exported.`,
      description: `Choose Export to Notion again and press Continue to allow them. If Notion isn't connected yet, press Connect first.`,
    },
  });
  (MAX_NOTION_PAGE_NAME_LENGTH = 200);
  (ABORTED_EXPORT_CODES = new (Set as Dynamic)([
    `declined`,
    `not_in_manifest`,
    `cancelled`,
    `consent_declined`,
    `consent_closed`,
    `consent_undecided`,
  ]));
  (EXPORT_TELEMETRY_REASONS = {
    declined: `user_declined`,
    rejected_extension: `capability_unavailable`,
    extension_not_enabled: `capability_unavailable`,
    malformed: `internal`,
    request_unknown: `request_lapsed`,
    not_in_manifest: `user_declined`,
    cancelled: `user_declined`,
    server_not_connected: `connector_not_connected`,
    server_not_found: `connector_not_connected`,
    selection_required: `connector_not_connected`,
    needs_reauth: `needs_reauth`,
    blocked_by_policy: `blocked_by_policy`,
    approval_required: `blocked_by_policy`,
    tool_error: `upstream_error`,
    upstream_error: `upstream_error`,
    server_unavailable: `upstream_error`,
    bad_request: `internal`,
    transform_error: `internal`,
    rate_limited: `rate_limited`,
    unavailable: `capability_unavailable`,
    withheld: `policy_withheld`,
    not_granted: `capability_unavailable`,
    capability_disabled: `capability_unavailable`,
    capability_removed: `capability_unavailable`,
    no_drive_tool: `connector_tool_missing`,
    too_large_for_call: `payload_too_large`,
    consent_declined: `user_declined`,
    consent_closed: `user_declined`,
    consent_unasked: `consent_unavailable`,
    no_node: `not_a_document`,
    denied: `access_denied`,
    no_export_tool: `connector_tool_missing`,
    list_failed: `transport`,
    consent_undecided: `user_declined`,
    renderer_unavailable: `render_unavailable`,
    failed: `upstream_error`,
    no_notion_tool: `connector_tool_missing`,
  });
  [...Object.keys(EXPORT_TELEMETRY_REASONS)];
  (googleDocsFailureTelemetry = (
    googleDocsFailureTelemetry2?: Dynamic,
    options: Dynamic = false,
    ..._extraArguments: unknown[]
  ): Dynamic => exportFailureTelemetry(googleDocsFailureTelemetry2, !options));
  (downloadFailureTelemetry = (
    downloadFailureTelemetry2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => exportFailureTelemetry(downloadFailureTelemetry2, options));
  (notionFailureTelemetry = (
    notionFailureTelemetry2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => exportFailureTelemetry(notionFailureTelemetry2, false));
  (MAX_EXPORT_TELEMETRY_MS = 6e5);
  (MAX_EXPORT_TELEMETRY_BYTES = 64 * 1024 * 1024);
  (MAX_EXPORT_SIMPLIFIED_COUNT = 65535);
  (clampExportTelemetryNumber = (
    clampExportTelemetryNumber2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    clampExportTelemetryNumber2 === undefined ||
    !Number.isFinite(clampExportTelemetryNumber2)
      ? undefined
      : Math.min(options, Math.max(0, Math.round(clampExportTelemetryNumber2))));
  (exportRawFailureCode = (
    error?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => (error.unlisted ? `unlisted` : error.code));
  (downloadExportTelemetry = (
    downloadExportTelemetry2?: Dynamic,
    response?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    exportTelemetryResult(
      downloadExportTelemetry2,
      `page_download`,
      {
        ...context,
        deliverMs: undefined,
      },
      response.ok
        ? response
        : downloadFailureTelemetry(response.code, context.bytes !== undefined),
      response.ok
        ? {
            stage: `save`,
          }
        : {
            stage: context.bytes === undefined ? `render` : `save`,
            rawCode: exportRawFailureCode(response),
          },
    ));
  (notionExportTelemetry = (
    response?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    exportTelemetryResult(
      `notion`,
      `page_notion`,
      options,
      response.ok ? response : notionFailureTelemetry(response.code),
      response.ok
        ? {
            stage: `send`,
          }
        : {
            stage: response.stage,
            rawCode: exportRawFailureCode(response),
          },
    ));
}

export {
  DOCUMENT_EXPORT_FORMATS,
  EXPORT_AS_WORD_LABEL,
  GOOGLE_DOCS_EXPORTING_MESSAGE,
  NOTION_EXPORTING_MESSAGE,
  canExportForRole,
  canFallbackGoogleDocsExport,
  documentDownloadAvailability,
  documentDownloadError,
  downloadDroppedPictureNotice,
  downloadExportTelemetry,
  downloadSuccessToast,
  exportDocumentDownload,
  exportToGoogleDocs,
  exportToNotion,
  googleDocsConsentNotice,
  googleDocsDroppedPictureNotice,
  googleDocsExportAvailability,
  googleDocsExportError,
  googleDocsExportSuccess,
  googleDocsExportTelemetry,
  googleDocsReconnectAction,
  googleDocsToolError,
  notionConsentNotice,
  notionExportAvailability,
  notionExportError,
  notionExportSuccess,
  notionExportTelemetry,
  notionToolError,
  preferredPaperSize,
  simplifiedDownloadNotice,
};
