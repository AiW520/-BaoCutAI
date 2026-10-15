/** BaoCut: document tabs from index-CX4IZqzA.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  EditorExtensionsCommentSelection,
  resolveDataContentAndReferencesValue3,
  resolveDataContentAndReferencesValue5,
} from "../dependencies";
import {
  DOCUMENT_EXPORT_FORMATS,
  canExportForRole,
  documentDownloadAvailability,
  googleDocsExportAvailability,
  notionExportAvailability,
} from "../document-export/export-to-google-docs";
import {
  DocumentTabsCheck,
  DocumentTabsDocx,
  DocumentTabsUndo,
  DocumentTabs_SetLanguage,
  DocumentTabs_VersionHistory,
  resolveDocumentTabsPhone,
} from "./pagebar";

function resolveDocumentTabsDisabled(..._extraArguments: unknown[]): Dynamic {
  let resolveDocumentTabsDisabledHandler: Dynamic = (
    documentTabsDisabled?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    id: documentTabsDisabled,
    disabled: true,
    run: (..._extraArguments: unknown[]): undefined => {},
  });
  return [
    resolveDocumentTabsDisabledHandler(DocumentTabsDocx.docx),
    resolveDocumentTabsDisabledHandler(DocumentTabsDocx.pdf),
    resolveDocumentTabsDisabledHandler(DocumentTabsDocx.markdown),
  ];
}

function buildPagebarExportActions(
  pagebarExportActions?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  let exports: Dynamic = pagebarExportActions.exports;
  let buildPagebarExportActionsResult = resolveDataContentAndReferencesValue3(
    pagebarExportActions.viewerClass,
  );
  if (exports === `booting`) {
    if (!buildPagebarExportActionsResult) {
      (items.push as Dynamic)(...resolveDocumentTabsDisabled());
    }
  } else if (exports !== null) {
    let {
      downloadsOk: downloadsOk,
      drive: drive,
      doorExport: doorExport,
    }: Dynamic = exports.roads;
    let record: Dynamic = {
      role: exports.role,
      viewerClass: pagebarExportActions.viewerClass,
      kind: exports.kind,
      exporting: exports.exporting,
    };
    let documentDownloadAvailability2: Dynamic = documentDownloadAvailability({
      doorExport: doorExport,
      downloadsOk: downloadsOk,
      ...record,
    });
    let googleDocsExportAvailability2: Dynamic = googleDocsExportAvailability({
      drive: drive,
      doorExport: doorExport,
      ...record,
    });
    let notionExportAvailability2: Dynamic = notionExportAvailability({
      notion: exports.roads.notion,
      doorExport: doorExport,
      ...record,
    });
    let buildPagebarExportActionsHandler: Dynamic = (
      pagebarExportActions2?: Dynamic,
      options?: Dynamic,
      run?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      options.disabled
        ? {
            id: pagebarExportActions2,
            disabled: true,
            run: run,
          }
        : {
            id: pagebarExportActions2,
            run: run,
          };
    if (documentDownloadAvailability2.offered) {
      items.push(
        buildPagebarExportActionsHandler(
          DocumentTabsDocx.docx,
          documentDownloadAvailability2,
          exports.exportDocx,
        ),
      );
      items.push(
        buildPagebarExportActionsHandler(
          DocumentTabsDocx.pdf,
          documentDownloadAvailability2,
          exports.exportPdf,
        ),
      );
      items.push(
        buildPagebarExportActionsHandler(
          DocumentTabsDocx.markdown,
          documentDownloadAvailability2,
          exports.exportMarkdown,
        ),
      );
    } else {
      if (
        exports.roadsPending &&
        canExportForRole(exports.role, pagebarExportActions.viewerClass) &&
        exports.kind !== `other`
      ) {
        (items.push as Dynamic)(...resolveDocumentTabsDisabled());
      }
    }
    if (googleDocsExportAvailability2.offered) {
      items.push(
        buildPagebarExportActionsHandler(
          DocumentTabsDocx.googleDocs,
          googleDocsExportAvailability2,
          exports.exportGoogleDocs,
        ),
      );
    }
    if (notionExportAvailability2.offered) {
      items.push(
        buildPagebarExportActionsHandler(
          DocumentTabsDocx.notion,
          notionExportAvailability2,
          exports.exportNotion,
        ),
      );
    }
  }
  let items2: Dynamic = resolveDataContentAndReferencesValue5(
    pagebarExportActions.viewerClass,
  )
    ? [
        {
          id: `show_all_comments`,
          disabled: true,
          run: (..._extraArguments: unknown[]): undefined => {},
        },
      ]
    : [
        pagebarExportActions.commentsListOpen
          ? {
              id: `hide_comments`,
              run: pagebarExportActions.hideComments,
            }
          : {
              id: `show_all_comments`,
              disabled: pagebarExportActions.showCommentsDisabled,
              run: pagebarExportActions.showAllComments,
            },
      ];
  let spelling: Dynamic = pagebarExportActions.spelling;
  let claude: Dynamic = spelling?.claude ?? `ask`;
  let items3: Dynamic =
    spelling === null
      ? []
      : [
          {
            id: DocumentTabsCheck.check,
            disabled: claude === `off` || buildPagebarExportActionsResult,
            run: spelling.check,
          },
          spelling.showOn
            ? {
                id: DocumentTabsCheck.hide,
                run: (..._extraArguments: unknown[]): Dynamic =>
                  spelling.setShow(false),
              }
            : {
                id: DocumentTabsCheck.show,
                run: (..._extraArguments: unknown[]): Dynamic =>
                  spelling.setShow(true),
              },
          spelling.autocorrectOn
            ? {
                id: DocumentTabsCheck.autocorrectOff,
                run: (..._extraArguments: unknown[]): Dynamic =>
                  spelling.setAutocorrect(false),
              }
            : {
                id: DocumentTabsCheck.autocorrectOn,
                run: (..._extraArguments: unknown[]): Dynamic =>
                  spelling.setAutocorrect(true),
              },
        ];
  let items4: Dynamic =
    pagebarExportActions.versionHistoryV2 && pagebarExportActions.historyReady
      ? [
          {
            id: DocumentTabs_VersionHistory,
            run: pagebarExportActions.versionHistory,
          },
        ]
      : [];
  let undoRedo: Dynamic = pagebarExportActions.undoRedo ?? null;
  let items5: Dynamic =
    undoRedo === null
      ? []
      : [
          {
            id: DocumentTabsUndo.undo,
            disabled: !undoRedo.canUndo,
            run: undoRedo.undo,
          },
          {
            id: DocumentTabsUndo.redo,
            disabled: !undoRedo.canRedo,
            run: undoRedo.redo,
          },
        ];
  return [
    ...items,
    ...items2,
    ...items4,
    ...items3,
    ...(pagebarExportActions.docLanguage
      ? [
          {
            id: DocumentTabs_SetLanguage,
            run: pagebarExportActions.docLanguage,
          },
        ]
      : []),
    ...items5,
    ...(pagebarExportActions.internal
      ? [
          {
            id: `send_feedback`,
            run: pagebarExportActions.sendFeedback,
          },
        ]
      : []),
    ...(resolveDocumentTabsPhone(pagebarExportActions) &&
    !resolveDataContentAndReferencesValue5(pagebarExportActions.viewerClass)
      ? [
          {
            id: EditorExtensionsCommentSelection,
            disabled: pagebarExportActions.commentSelectionDisabled,
            run: pagebarExportActions.commentSelection,
          },
        ]
      : []),
  ];
}

var DocumentTabsState7: string[];

var DocumentTabsGoogleDocs: {
    googleDocs: string;
    notion: string;
};

function mapDocumentTabsFormat(
  entry?: Dynamic,
  options?: Dynamic,
  viewerClass?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let mapDocumentTabsFormatHandler: Dynamic = (
    mapDocumentTabs?: Dynamic,
    options2: Dynamic = false,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    DocumentTabsState7.map(
      (
        DocumentTabsState72?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let format: Dynamic = DOCUMENT_EXPORT_FORMATS[DocumentTabsState72].ext;
        let run: Dynamic = (
          mapDocumentTabs2?: Dynamic,
          options3?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => options(DocumentTabsState72, mapDocumentTabs2, options3);
        let record: Dynamic = mapDocumentTabs
          ? {
              format: format,
              disabled: true,
              run: run,
            }
          : {
              format: format,
              run: run,
            };
        if (options2) {
          record.interactive = true;
        }
        return record;
      },
    );
  if (entry === null || resolveDataContentAndReferencesValue3(viewerClass))
    return [];
  if (entry === `booting`) return mapDocumentTabsFormatHandler(true);
  let { doorExport: doorExport, downloadsOk: downloadsOk }: Dynamic =
    entry.roads;
  let documentDownloadAvailability2: Dynamic = documentDownloadAvailability({
    doorExport: doorExport,
    downloadsOk: downloadsOk,
    role: entry.role,
    viewerClass: viewerClass,
    kind: entry.kind,
    exporting: false,
  });
  return documentDownloadAvailability2.offered
    ? mapDocumentTabsFormatHandler(
        documentDownloadAvailability2.disabled,
        doorExport === `withheld`,
      )
    : entry.roadsPending &&
        canExportForRole(entry.role, viewerClass) &&
        entry.kind !== `other`
      ? mapDocumentTabsFormatHandler(true)
      : [];
}

function resolveDocumentTabsDrive(
  entry?: Dynamic,
  options?: Dynamic,
  viewerClass?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (entry === null || entry === `booting` || !entry.roads.downloadsOk)
    return [];
  let {
    drive: drive,
    doorExport: doorExport,
    notion: notion,
  }: Dynamic = entry.roads;
  let record: Dynamic = {
    doorExport: doorExport,
    role: entry.role,
    viewerClass: viewerClass,
    kind: entry.kind,
    exporting: entry.exporting,
  };
  let items: Dynamic = [];
  let resolveDocumentTabsDriveHandler = (
    documentTabsDrive?: Dynamic,
    options2?: Dynamic,
    run?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (options2.offered) {
      items.push(
        options2.disabled
          ? {
              id: documentTabsDrive,
              disabled: true,
              run: run,
            }
          : {
              id: documentTabsDrive,
              run: run,
            },
      );
    }
  };
  resolveDocumentTabsDriveHandler(
    DocumentTabsGoogleDocs.googleDocs,
    googleDocsExportAvailability({
      drive: drive,
      ...record,
    }),
    options.googleDocs,
  );
  resolveDocumentTabsDriveHandler(
    DocumentTabsGoogleDocs.notion,
    notionExportAvailability({
      notion: notion,
      ...record,
    }),
    options.notion,
  );
  return items;
}

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeDocumentTabsBuildPagebarExportActionsStep1(): void {
  (DocumentTabsState7 = [`docx`, `pdf`, `markdown`]);
  (DocumentTabsGoogleDocs = {
    googleDocs: `google_docs`,
    notion: `notion`,
  });
}

export { buildPagebarExportActions, mapDocumentTabsFormat, resolveDocumentTabsDrive };
