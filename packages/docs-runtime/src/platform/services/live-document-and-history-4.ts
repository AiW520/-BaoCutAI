/** BaoCut: platform live document and history from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  React,
  create,
  isFrameOfflineError,
  inFrame,
} from "../dependencies";
import {
  dataEnumsAndValidationCreateUpdateDeleteValues,
} from "../data/enums-and-validation";
import {
  lazyZod,
  resolveDataLazyZodDigest,
} from "../data/lazy-zod";
import {
  dataContentAndReferencesDescribeSchema3,
  dataContentAndReferencesFragSchema,
} from "../data/content-and-references";
import {
  PAGE_BUSY_TRY_AGAIN,
  outcomeUnknownThrownOf,
  pageBusyThrownOf,
  retryOnceIfPageBusy,
} from "./session-and-sources-1";
import {
  EditorExtensionsFrameSendError,
  editorExtensionsSet14,
} from "../../prose-editor/platform/extensions-3";
import {
  api,
} from "./api-and-auth-1";
import {
  DataModelSchemasFamily2,
  DataModelSchemasState3,
  clearDataModelSchemasDelete,
  collectDataModelSchemasJoin,
  loadDataModelSchemasCatch,
  resolveDataModelSchemasEvery,
  resolveDataModelSchemasFontWeight,
} from "../data/model-schemas-3";
import {
  dataOperationEngineDescribeSchema,
} from "../data/operation-engine-1";
import {
  resolveCommentsStorePaint,
} from "../../comments/store/store-4";
import {
  resolvePlatformSyncAndRoutingValue22,
  resolvePlatformSyncAndRoutingValue23,
} from "./sync-and-routing-2";
import {
  PlatformLiveDocumentAndHistoryDENIED,
  PlatformLiveDocumentAndHistoryDETAILSUNAVAILABLE,
  loadPlatformLiveDocumentAndHistoryKind,
  loadPlatformLiveDocumentAndHistoryRev,
  resolvePlatformLiveDocumentAndHistoryNode5,
  resolvePlatformLiveDocumentAndHistoryPid2,
  resolvePlatformLiveDocumentAndHistoryRev,
  resolvePlatformLiveDocumentAndHistoryWritable,
} from "./live-document-and-history-3";

async function loadPlatformLiveDocumentAndHistoryChanged(
  pid?: Dynamic,
  fileId?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  try {
    if (!inFrame())
      return {
        changed:
          (
            await retryOnceIfPageBusy(
              (..._extraArguments: unknown[]): Dynamic =>
                api.v3FileRestore(pid, fileId, context),
            )
          )?.restored !== false,
      };
    let rev: Dynamic =
      dependencies?.rev ??
      resolvePlatformLiveDocumentAndHistoryRev(pid, fileId, context).rev;
    if (rev === undefined)
      throw new (PlatformLiveDocumentAndHistoryDETAILSUNAVAILABLE as Dynamic)(
        `restored`,
      );
    let platformLiveDocumentAndHistoryPid2: Dynamic =
      resolvePlatformLiveDocumentAndHistoryPid2({
        pid: pid,
        fileId: fileId,
      });
    let count = resolvePlatformSyncAndRoutingValue23() ? 3 : 1;
    for (let count2 = 1; ; count2++)
      try {
        let platformLiveDocumentAndHistoryRev: Dynamic =
          await loadPlatformLiveDocumentAndHistoryRev(
            platformLiveDocumentAndHistoryPid2,
            {
              rev: rev,
              ...(count2 === 1 && dependencies?.ifRev !== undefined
                ? {
                    ifRev: dependencies.ifRev,
                  }
                : {}),
            },
          );
        return {
          changed: platformLiveDocumentAndHistoryRev.changed,
          ...(platformLiveDocumentAndHistoryRev.rev === undefined
            ? {}
            : {
                rev: platformLiveDocumentAndHistoryRev.rev,
              }),
        };
      } catch (loadPlatformLiveDocumentAndHistoryChangedResult: Dynamic) {
        if (
          count2 >= count ||
          !(
            loadPlatformLiveDocumentAndHistoryChangedResult instanceof
            (PlatformLiveDocumentAndHistoryDENIED as Dynamic)
          ) ||
          loadPlatformLiveDocumentAndHistoryChangedResult.reason !==
            `guard_mismatch`
        )
          throw loadPlatformLiveDocumentAndHistoryChangedResult;
        await new (Promise as Dynamic)(
          (resolve?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            platformLiveDocumentAndHistoryPid2.schedule(
              resolve,
              400 * 2 ** (count2 - 1),
            ),
        );
      }
  } catch (cause: Dynamic) {
    throw pageBusyThrownOf(cause) !== null || outcomeUnknownThrownOf(cause)
      ? Error(PAGE_BUSY_TRY_AGAIN, {
          cause: cause,
        })
      : cause;
  }
}

var PlatformLiveDocumentAndHistoryMessage4: string;

function resolvePlatformLiveDocumentAndHistoryRestoreFailed(
  error?: unknown,
  ..._extraArguments: unknown[]
): string {
  if (!resolvePlatformSyncAndRoutingValue23())
    return error instanceof Error ? error.message : `restore failed`;
  let error2: Dynamic = typeof error == `object` && error ? error : {};
  return error2.reason === `guard_mismatch`
    ? PlatformLiveDocumentAndHistoryMessage4
    : error2.message ===
        `The document is busy right now — try again in a moment.`
      ? PAGE_BUSY_TRY_AGAIN
      : error2.code === `DETAILS_UNAVAILABLE`
        ? `Version details unavailable right now, so this version can't be restored. Try again in a moment.`
        : error2.reason === `forbidden` ||
            error2.reason === `access` ||
            error2.status === 403 ||
            error2.status === 404
          ? `You don't have permission to restore this document.`
          : error2.code === `TIMEOUT`
            ? `The restore didn't get an answer in time. If it went through, the page will show it shortly.`
            : `The restore didn't go through. Try again in a moment.`;
}

var resolvePlatformLiveDocumentAndHistoryFileId3: (page?: Dynamic, ..._extraArguments: unknown[]) => string;

var PlatformLiveDocumentAndHistoryReady: Dynamic;

var platformLiveDocumentAndHistoryMap16: Dynamic;

var platformLiveDocumentAndHistoryMap17: Dynamic;

var platformLiveDocumentAndHistoryValue20003: number;

var platformLiveDocumentAndHistoryValue30000: number;

var resolvePlatformLiveDocumentAndHistoryValue34: Dynamic;

var resolvePlatformLiveDocumentAndHistoryUnavailable2: Dynamic;

var resolvePlatformLiveDocumentAndHistoryValue35: Dynamic;

function getPlatformLiveDocumentAndHistoryFile2(
  platformLiveDocumentAndHistoryFile2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let record2: Dynamic = platformLiveDocumentAndHistoryFile2.read({
    object: `file`,
    id: options,
  });
  let content: Dynamic =
    resolvePlatformLiveDocumentAndHistoryValue35(record2) &&
    resolvePlatformLiveDocumentAndHistoryValue35(record2.content)
      ? record2.content
      : undefined;
  return content === undefined ||
    content.kind !== `node` ||
    typeof content.id != `string`
    ? false
    : platformLiveDocumentAndHistoryFile2.refs().get(`node/${content.id}`)
        ?.engine === `prose`;
}

function resolvePlatformLiveDocumentAndHistoryLane(
  platformLiveDocumentAndHistoryLane?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let lane: Dynamic = resolvePlatformLiveDocumentAndHistoryPid2(
    platformLiveDocumentAndHistoryLane,
  ).lane;
  return lane === undefined
    ? true
    : lane.seeded &&
        resolvePlatformLiveDocumentAndHistoryWritable(lane) &&
        getPlatformLiveDocumentAndHistoryFile2(
          lane,
          platformLiveDocumentAndHistoryLane.fileId,
        );
}

function updatePlatformLiveDocumentAndHistoryReady(
  updatePlatformLiveDocumentAndHistoryReady2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let platformLiveDocumentAndHistoryFileId3 =
    resolvePlatformLiveDocumentAndHistoryFileId3(
      updatePlatformLiveDocumentAndHistoryReady2,
    );
  if (
    !PlatformLiveDocumentAndHistoryReady.getState().ready[
      platformLiveDocumentAndHistoryFileId3
    ]
  ) {
    PlatformLiveDocumentAndHistoryReady.setState(
      (
        updatePlatformLiveDocumentAndHistoryReady3?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => ({
        ready: {
          ...updatePlatformLiveDocumentAndHistoryReady3.ready,
          [platformLiveDocumentAndHistoryFileId3]: true,
        },
      }),
    );
  }
}

function loadPlatformLiveDocumentAndHistoryLimit(
  platformLiveDocumentAndHistoryLimit?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!inFrame()) return Promise.resolve(true);
  if (platformLiveDocumentAndHistoryLimit.fileId.length === 0)
    return Promise.resolve(false);
  if (resolvePlatformSyncAndRoutingValue23()) {
    let lane: Dynamic = resolvePlatformLiveDocumentAndHistoryPid2(
      platformLiveDocumentAndHistoryLimit,
    ).lane;
    return (lane ? lane.whenSeeded() : Promise.resolve()).then(
      (..._extraArguments: unknown[]): Dynamic =>
        resolvePlatformLiveDocumentAndHistoryLane(
          platformLiveDocumentAndHistoryLimit,
        ),
      (..._extraArguments: unknown[]) => false,
    );
  }
  let platformLiveDocumentAndHistoryFileId3 =
    resolvePlatformLiveDocumentAndHistoryFileId3(
      platformLiveDocumentAndHistoryLimit,
    );
  if (
    PlatformLiveDocumentAndHistoryReady.getState().ready[
      platformLiveDocumentAndHistoryFileId3
    ]
  )
    return Promise.resolve(true);
  let platformLiveDocumentAndHistoryMap16Entry: Dynamic =
    platformLiveDocumentAndHistoryMap16.get(
      platformLiveDocumentAndHistoryFileId3,
    );
  if (platformLiveDocumentAndHistoryMap16Entry !== undefined)
    return platformLiveDocumentAndHistoryMap16Entry;
  let platformLiveDocumentAndHistoryMap17Entry: Dynamic =
    platformLiveDocumentAndHistoryMap17.get(
      platformLiveDocumentAndHistoryFileId3,
    );
  if (
    platformLiveDocumentAndHistoryMap17Entry !== undefined &&
    resolvePlatformLiveDocumentAndHistoryValue34() <
      platformLiveDocumentAndHistoryMap17Entry.until
  )
    return Promise.resolve(false);
  let then = (async (..._extraArguments: unknown[]): Promise<undefined> => {
    let platformLiveDocumentAndHistoryPid2: Dynamic =
      resolvePlatformLiveDocumentAndHistoryPid2(
        platformLiveDocumentAndHistoryLimit,
      );
    await platformLiveDocumentAndHistoryPid2.lane?.whenSeeded();
    await loadPlatformLiveDocumentAndHistoryKind(
      platformLiveDocumentAndHistoryPid2,
      {
        limit: 1,
      },
    );
  })().then(
    (..._extraArguments: unknown[]) => (
      updatePlatformLiveDocumentAndHistoryReady(
        platformLiveDocumentAndHistoryLimit,
      ),
      platformLiveDocumentAndHistoryMap17.delete(
        platformLiveDocumentAndHistoryFileId3,
      ),
      true
    ),
    (error?: Dynamic, ..._extraArguments: unknown[]) => {
      if (
        error instanceof (PlatformLiveDocumentAndHistoryDENIED as Dynamic) &&
        error.local
      ) {
        platformLiveDocumentAndHistoryMap16.delete(
          platformLiveDocumentAndHistoryFileId3,
        );
        return false;
      }
      if (
        error instanceof (PlatformLiveDocumentAndHistoryDENIED as Dynamic) ||
        (error instanceof (EditorExtensionsFrameSendError as Dynamic) &&
          editorExtensionsSet14.has(error.code)) ||
        resolvePlatformLiveDocumentAndHistoryUnavailable2(error)
      )
        return false;
      platformLiveDocumentAndHistoryMap16.delete(
        platformLiveDocumentAndHistoryFileId3,
      );
      let total: Dynamic =
        (platformLiveDocumentAndHistoryMap17.get(
          platformLiveDocumentAndHistoryFileId3,
        )?.n ?? 0) + 1;
      platformLiveDocumentAndHistoryMap17.set(
        platformLiveDocumentAndHistoryFileId3,
        {
          until:
            resolvePlatformLiveDocumentAndHistoryValue34() +
            Math.min(
              platformLiveDocumentAndHistoryValue30000,
              platformLiveDocumentAndHistoryValue20003 * 2 ** (total - 1),
            ),
          n: total,
        },
      );
      return false;
    },
  );
  platformLiveDocumentAndHistoryMap16.set(
    platformLiveDocumentAndHistoryFileId3,
    then,
  );
  return then;
}

function usePlatformLiveDocumentAndHistoryPid2(
  pid?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let inFrame2: Dynamic = inFrame();
  let fileId: Dynamic = options ?? ``;
  let [
    platformLiveDocumentAndHistoryNode5,
    setPlatformLiveDocumentAndHistoryNode5,
  ]: Dynamic = (0, React.useState)(undefined);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!inFrame2 || pid.length === 0 || fileId.length === 0)
        return void setPlatformLiveDocumentAndHistoryNode5(undefined);
      let usePlatformLiveDocumentAndHistoryPid2Result: Dynamic;
      try {
        usePlatformLiveDocumentAndHistoryPid2Result =
          resolvePlatformLiveDocumentAndHistoryPid2({
            pid: pid,
            fileId: fileId,
          });
      } catch {
        setPlatformLiveDocumentAndHistoryNode5(undefined);
        return;
      }
      let setPlatformLiveDocumentAndHistoryNode52 = (
        ..._extraArguments: unknown[]
      ): undefined => {
        try {
          setPlatformLiveDocumentAndHistoryNode5(
            resolvePlatformLiveDocumentAndHistoryNode5(
              usePlatformLiveDocumentAndHistoryPid2Result,
            ),
          );
        } catch {
          setPlatformLiveDocumentAndHistoryNode5(undefined);
        }
      };
      setPlatformLiveDocumentAndHistoryNode52();
      return usePlatformLiveDocumentAndHistoryPid2Result.lane?.subscribe(
        (entry?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (
            entry.kind === `live` ||
            entry.kind === `recovered` ||
            entry.kind === `envelope`
          ) {
            setPlatformLiveDocumentAndHistoryNode52();
          }
        },
      );
    },
    [inFrame2, pid, fileId],
  );
  return platformLiveDocumentAndHistoryNode5;
}

function usePlatformLiveDocumentAndHistoryPid3(
  pid?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let inFrame2: Dynamic = inFrame();
  let platformSyncAndRoutingValue22: Dynamic =
    resolvePlatformSyncAndRoutingValue22();
  let fileId: Dynamic = options ?? ``;
  let label = `${pid}/${fileId}`;
  let PlatformLiveDocumentAndHistoryReady2: Dynamic =
    PlatformLiveDocumentAndHistoryReady(
      (
        platformLiveDocumentAndHistoryPid3?: Dynamic,
        ..._extraArguments: unknown[]
      ) => platformLiveDocumentAndHistoryPid3.ready[label] === true,
    );
  let [recordState, setRecordState]: Dynamic = (0, React.useState)({
    k: ``,
    on: false,
  });
  let [enabledState, setEnabledState]: Dynamic = (0, React.useState)(true);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!inFrame2 || pid.length === 0) return;
      let lane: Dynamic = resolvePlatformLiveDocumentAndHistoryPid2({
        pid: pid,
        fileId: fileId,
      }).lane;
      setEnabledState(resolvePlatformLiveDocumentAndHistoryWritable(lane));
      let setRecordState2 = (..._extraArguments: unknown[]): undefined => {
        if (!platformSyncAndRoutingValue22) return;
        let matchesFileIdCount: Dynamic =
          fileId.length > 0 &&
          resolvePlatformLiveDocumentAndHistoryLane({
            pid: pid,
            fileId: fileId,
          });
        setRecordState(
          (
            platformLiveDocumentAndHistoryPid3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            platformLiveDocumentAndHistoryPid3.k === label &&
            platformLiveDocumentAndHistoryPid3.on === matchesFileIdCount
              ? platformLiveDocumentAndHistoryPid3
              : {
                  k: label,
                  on: matchesFileIdCount,
                },
        );
      };
      setRecordState2();
      return lane?.subscribe(
        (entry?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (entry.kind === `writable`) {
            setEnabledState(entry.writable);
            setRecordState2();
          } else if (!platformSyncAndRoutingValue22) return;
          else if (entry.kind === `live` || entry.kind === `recovered`)
            setRecordState2();
          else if (entry.kind === `envelope`)
            for (let usePlatformLiveDocumentAndHistoryPid3Result of entry
              .envelope.diff as Dynamic) {
              let ref: Dynamic =
                usePlatformLiveDocumentAndHistoryPid3Result.address?.ref;
              if (ref?.object === `file` && ref.id === fileId) {
                setRecordState2();
                break;
              }
            }
        },
      );
    },
    [inFrame2, pid, fileId, label, platformSyncAndRoutingValue22],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (
        inFrame2 &&
        fileId.length > 0 &&
        enabledState &&
        !platformSyncAndRoutingValue22
      ) {
        loadPlatformLiveDocumentAndHistoryLimit({
          pid: pid,
          fileId: fileId,
        });
      }
    },
    [inFrame2, pid, fileId, enabledState, platformSyncAndRoutingValue22],
  );
  return fileId.length === 0
    ? false
    : inFrame2
      ? platformSyncAndRoutingValue22
        ? (recordState.k === label
            ? recordState.on
            : pid.length > 0 &&
              resolvePlatformLiveDocumentAndHistoryLane({
                pid: pid,
                fileId: fileId,
              })) && enabledState
        : PlatformLiveDocumentAndHistoryReady2 && enabledState
      : true;
}

function resolvePlatformLiveDocumentAndHistoryValue36(
  platformLiveDocumentAndHistoryValue36?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let platformSyncAndRoutingValue22: Dynamic =
    resolvePlatformSyncAndRoutingValue22() || !inFrame();
  return usePlatformLiveDocumentAndHistoryPid3(
    platformSyncAndRoutingValue22 ? platformLiveDocumentAndHistoryValue36 : ``,
    platformSyncAndRoutingValue22 ? options : undefined,
  );
}

var PlatformLiveDocumentAndHistoryOpen: Dynamic;

function updatePlatformLiveDocumentAndHistoryOpen(
  ..._extraArguments: unknown[]
): undefined {
  if (!PlatformLiveDocumentAndHistoryOpen.getState().open) {
    PlatformLiveDocumentAndHistoryOpen.setState({
      open: true,
    });
  }
}

function updatePlatformLiveDocumentAndHistoryOpen2(
  ..._extraArguments: unknown[]
): undefined {
  if (PlatformLiveDocumentAndHistoryOpen.getState().open) {
    PlatformLiveDocumentAndHistoryOpen.setState({
      open: false,
    });
  }
}

var resolvePlatformLiveDocumentAndHistoryOpen: Dynamic;

var platformLiveDocumentAndHistoryAdapterArgsBindingBodyValues: string[];

function resolvePlatformLiveDocumentAndHistoryValue37(
  platformLiveDocumentAndHistoryValue37?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    typeof platformLiveDocumentAndHistoryValue37 != `object` ||
    !platformLiveDocumentAndHistoryValue37 ||
    Array.isArray(platformLiveDocumentAndHistoryValue37)
  )
    return {};
  let platformLiveDocumentAndHistoryValue372: Dynamic =
    platformLiveDocumentAndHistoryValue37;
  let record2: Dynamic = {};
  for (let resolvePlatformLiveDocumentAndHistoryValue37Result of platformLiveDocumentAndHistoryAdapterArgsBindingBodyValues as Dynamic)
    if (
      platformLiveDocumentAndHistoryValue372[
        resolvePlatformLiveDocumentAndHistoryValue37Result
      ] !== undefined
    ) {
      record2[resolvePlatformLiveDocumentAndHistoryValue37Result] =
        platformLiveDocumentAndHistoryValue372[
          resolvePlatformLiveDocumentAndHistoryValue37Result
        ];
    }
  return record2;
}

function collectPlatformLiveDocumentAndHistoryJoin(
  collectPlatformLiveDocumentAndHistoryJoin2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return Array.isArray(collectPlatformLiveDocumentAndHistoryJoin2)
    ? `[` +
        collectPlatformLiveDocumentAndHistoryJoin2
          .map(collectPlatformLiveDocumentAndHistoryJoin)
          .join(`,`) +
        `]`
    : typeof collectPlatformLiveDocumentAndHistoryJoin2 == `object` &&
        collectPlatformLiveDocumentAndHistoryJoin2
      ? `{` +
        Object.keys(collectPlatformLiveDocumentAndHistoryJoin2)
          .toSorted()
          .map(
            (toSorted?: Dynamic, ..._extraArguments: unknown[]): string =>
              JSON.stringify(toSorted) +
              `:` +
              collectPlatformLiveDocumentAndHistoryJoin(
                collectPlatformLiveDocumentAndHistoryJoin2[toSorted],
              ),
          )
          .join(`,`) +
        `}`
      : JSON.stringify(collectPlatformLiveDocumentAndHistoryJoin2);
}

function resolvePlatformLiveDocumentAndHistoryEncode(
  platformLiveDocumentAndHistoryEncode?: Dynamic,
  ..._extraArguments: unknown[]
): string {
  let dataLazyZodDigest: Dynamic = resolveDataLazyZodDigest(
    new TextEncoder().encode(
      collectPlatformLiveDocumentAndHistoryJoin(
        resolvePlatformLiveDocumentAndHistoryValue37(
          platformLiveDocumentAndHistoryEncode,
        ),
      ),
    ),
  );
  let label: string = ``;
  for (let resolvePlatformLiveDocumentAndHistoryEncodeResult of dataLazyZodDigest as Dynamic)
    label += resolvePlatformLiveDocumentAndHistoryEncodeResult
      .toString(16)
      .padStart(2, `0`);
  return label;
}

var PlatformLiveDocumentAndHistoryRail: {
    rail: null;
    pane: null;
    bars: number;
    component: null;
    compareAsk: {
        seq: number;
        base: string;
    };
};

var PlatformLiveDocumentAndHistoryState3: Dynamic;

var resolvePlatformLiveDocumentAndHistoryCanRestore: Dynamic;

var resolvePlatformLiveDocumentAndHistoryNote: Dynamic;

function updatePlatformLiveDocumentAndHistoryRail(
  rail?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (
    !resolvePlatformLiveDocumentAndHistoryCanRestore(
      PlatformLiveDocumentAndHistoryState3.getState().rail,
      rail,
    )
  ) {
    PlatformLiveDocumentAndHistoryState3.setState({
      rail: rail,
    });
  }
}

var resolvePlatformLiveDocumentAndHistoryRail: Dynamic;

function updatePlatformLiveDocumentAndHistoryPane(
  pane?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (
    !resolvePlatformLiveDocumentAndHistoryNote(
      PlatformLiveDocumentAndHistoryState3.getState().pane,
      pane,
    )
  ) {
    PlatformLiveDocumentAndHistoryState3.setState({
      pane: pane,
    });
  }
}

var resolvePlatformLiveDocumentAndHistoryPane: Dynamic;

function updatePlatformLiveDocumentAndHistoryBars(
  ..._extraArguments: unknown[]
): Dynamic {
  PlatformLiveDocumentAndHistoryState3.setState(
    (
      updatePlatformLiveDocumentAndHistoryBars2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      bars: updatePlatformLiveDocumentAndHistoryBars2.bars + 1,
    }),
  );
  let enabled = false;
  return (..._extraArguments: unknown[]): undefined => {
    if (!enabled) {
      enabled = true;
      PlatformLiveDocumentAndHistoryState3.setState(
        (
          updatePlatformLiveDocumentAndHistoryBars2?: Dynamic,
          ..._extraArguments: unknown[]
        ) => ({
          bars: Math.max(0, updatePlatformLiveDocumentAndHistoryBars2.bars - 1),
        }),
      );
    }
  };
}

var resolvePlatformLiveDocumentAndHistoryBars: Dynamic;

function updatePlatformLiveDocumentAndHistoryComponent(
  component?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (PlatformLiveDocumentAndHistoryState3.getState().component !== component) {
    PlatformLiveDocumentAndHistoryState3.setState({
      component: component,
    });
  }
}

var resolvePlatformLiveDocumentAndHistoryComponent: Dynamic;

function updatePlatformLiveDocumentAndHistoryCompareAsk(
  base?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  PlatformLiveDocumentAndHistoryState3.setState(
    (
      updatePlatformLiveDocumentAndHistoryCompareAsk2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      compareAsk: {
        seq: updatePlatformLiveDocumentAndHistoryCompareAsk2.compareAsk.seq + 1,
        base: base,
      },
    }),
  );
}

var resolvePlatformLiveDocumentAndHistoryCompareAsk: Dynamic;

function resolvePlatformLiveDocumentAndHistoryNote2(
  platformLiveDocumentAndHistoryNote2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let note: Dynamic = PlatformLiveDocumentAndHistoryState3(
    (
      platformLiveDocumentAndHistoryNote22?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      platformLiveDocumentAndHistoryNote2 &&
      platformLiveDocumentAndHistoryNote22.bars > 0 &&
      platformLiveDocumentAndHistoryNote22.pane !== null
        ? platformLiveDocumentAndHistoryNote22.pane.note
        : null,
  );
  let aside: Dynamic = PlatformLiveDocumentAndHistoryState3(
    (
      platformLiveDocumentAndHistoryNote22?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      platformLiveDocumentAndHistoryNote2 &&
      platformLiveDocumentAndHistoryNote22.bars > 0 &&
      platformLiveDocumentAndHistoryNote22.pane !== null
        ? platformLiveDocumentAndHistoryNote22.pane.aside
        : null,
  );
  return note === null && aside === null
    ? null
    : {
        note: note,
        aside: aside,
      };
}

var platformLiveDocumentAndHistoryValue30002: number;

var platformLiveDocumentAndHistoryValue4000: number;

var PlatformLiveDocumentAndHistoryStyles: string;

function getPlatformLiveDocumentAndHistoryAddFace(
  scheduler?: Dynamic,
  options: Dynamic = DataModelSchemasState3,
  ..._extraArguments: unknown[]
): Dynamic {
  let addFace: Dynamic = scheduler.addFace;
  if (!resolveDataModelSchemasEvery(options) || addFace === null) {
    scheduler.sheet(collectDataModelSchemasJoin(options));
    return [];
  }
  let sheet: Dynamic = scheduler.sheet(PlatformLiveDocumentAndHistoryStyles);
  let lookup: Dynamic = new (Map as Dynamic)(
    options.map(
      (option?: Dynamic, ..._extraArguments: unknown[]): Dynamic => [
        option.path,
        option,
      ],
    ),
  );
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let uniqueItems2: Dynamic = new (Set as Dynamic)(
    options
      .filter(
        (option?: Dynamic, ..._extraArguments: unknown[]) =>
          option.family === DataModelSchemasFamily2.family,
      )
      .map(
        (filteredOption?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          filteredOption.path,
      ),
  );
  let uniqueItemsCount: Dynamic = uniqueItems2.size;
  let iconsPending = (..._extraArguments: unknown[]): undefined => {
    if (uniqueItemsCount > 0 && --uniqueItemsCount === 0) {
      scheduler.iconsPending(false);
    }
  };
  if (uniqueItemsCount > 0) {
    scheduler.iconsPending(true);
    scheduler.schedule((..._extraArguments: unknown[]): undefined => {
      if (uniqueItemsCount > 0) {
        uniqueItemsCount = 0;
        scheduler.iconsPending(false);
      }
    }, platformLiveDocumentAndHistoryValue30002);
  }
  let append = (
    platformLiveDocumentAndHistoryAddFace?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (uniqueItems.has(platformLiveDocumentAndHistoryAddFace)) return;
    uniqueItems.add(platformLiveDocumentAndHistoryAddFace);
    let lookupEntry: Dynamic = lookup.get(
      platformLiveDocumentAndHistoryAddFace,
    );
    if (lookupEntry !== undefined) {
      if (!options2) {
        sheet.append(collectDataModelSchemasJoin([lookupEntry]));
      }
      if (uniqueItems2.has(platformLiveDocumentAndHistoryAddFace)) {
        iconsPending();
      }
    }
  };
  scheduler.onBytes(
    (
      platformLiveDocumentAndHistoryAddFace?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let lookupEntry: Dynamic = lookup.get(
        platformLiveDocumentAndHistoryAddFace,
      );
      if (
        !(
          lookupEntry === undefined ||
          uniqueItems.has(platformLiveDocumentAndHistoryAddFace)
        )
      ) {
        addFace(
          lookupEntry.family,
          options2,
          resolveDataModelSchemasFontWeight(lookupEntry),
        ).then(
          (..._extraArguments: unknown[]) =>
            append(platformLiveDocumentAndHistoryAddFace, true),
          (..._extraArguments: unknown[]) =>
            append(platformLiveDocumentAndHistoryAddFace, false),
        );
      }
    },
  );
  let filteredItems: Dynamic = [
    options[0],
    ...options.filter(
      (option?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        uniqueItems2.has(option.path),
    ),
  ].filter(
    (
      item?: Dynamic,
      index?: Dynamic,
      item2?: Dynamic,
      ..._extraArguments: unknown[]
    ) => item !== undefined && item2.indexOf(item) === index,
  );
  let bytes = (
    platformLiveDocumentAndHistoryAddFace?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined =>
    void scheduler
      .bytes(platformLiveDocumentAndHistoryAddFace.path)
      .catch((..._extraArguments: unknown[]) =>
        append(platformLiveDocumentAndHistoryAddFace.path, false),
      );
  for (let getPlatformLiveDocumentAndHistoryAddFaceResult of filteredItems as Dynamic)
    bytes(getPlatformLiveDocumentAndHistoryAddFaceResult);
  scheduler.afterPaint(
    (..._extraArguments: unknown[]): Dynamic =>
      scheduler.schedule((..._extraArguments: unknown[]): undefined => {
        for (let getPlatformLiveDocumentAndHistoryAddFaceResult of options as Dynamic)
          if (
            !uniqueItems.has(
              getPlatformLiveDocumentAndHistoryAddFaceResult.path,
            )
          ) {
            bytes(getPlatformLiveDocumentAndHistoryAddFaceResult);
          }
      }, platformLiveDocumentAndHistoryValue4000),
  );
  return filteredItems.map(
    (filteredItem?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      filteredItem.path,
  );
}

function loadPlatformLiveDocumentAndHistorySheet(
  ..._extraArguments: unknown[]
): undefined {
  let FontFace: Dynamic = (globalThis as Dynamic).FontFace;
  let fonts = document.fonts;
  getPlatformLiveDocumentAndHistoryAddFace({
    sheet(
      platformLiveDocumentAndHistorySheet?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let element = document.createElement(`style`);
      element.dataset.hostFonts = ``;
      element.textContent = platformLiveDocumentAndHistorySheet;
      document.head.appendChild(element);
      return {
        append: (
          platformLiveDocumentAndHistorySheet2?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined =>
          void (element.textContent = `${element.textContent ?? ``}${platformLiveDocumentAndHistorySheet2}`),
      };
    },
    iconsPending(
      platformLiveDocumentAndHistorySheet?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (platformLiveDocumentAndHistorySheet) {
        document.documentElement.dataset.hostIcons = `pending`;
      } else {
        delete document.documentElement.dataset.hostIcons;
      }
    },
    addFace:
      typeof FontFace == `function` &&
      fonts !== undefined &&
      typeof fonts.add == `function`
        ? async (
            platformLiveDocumentAndHistorySheet?: Dynamic,
            options?: Dynamic,
            context?: Dynamic,
            ..._extraArguments: unknown[]
          ): Promise<undefined> => {
            let fontFace: Dynamic = new (FontFace as Dynamic)(
              platformLiveDocumentAndHistorySheet,
              options,
              context,
            );
            await fontFace.load();
            fonts.add(fontFace);
          }
        : null,
    bytes: loadDataModelSchemasCatch,
    onBytes: clearDataModelSchemasDelete,
    schedule: (
      platformLiveDocumentAndHistorySheet?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined =>
      void setTimeout(platformLiveDocumentAndHistorySheet, options),
    afterPaint: (
      platformLiveDocumentAndHistorySheet?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined =>
      void resolveCommentsStorePaint().then(
        platformLiveDocumentAndHistorySheet,
      ),
  });
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializePlatformLiveDocumentAndHistory4Step1(): void {
  (PlatformLiveDocumentAndHistoryMessage4 = `Someone is editing this document right now, so the restore didn't go through. Try again in a moment.`);
  (resolvePlatformLiveDocumentAndHistoryFileId3 = (
    page?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `${page.pid}/${page.fileId}`);
  (PlatformLiveDocumentAndHistoryReady = create(
    (..._extraArguments: unknown[]): Dynamic => ({
      ready: {},
    }),
  ));
  (platformLiveDocumentAndHistoryMap16 = new (Map as Dynamic)());
  (platformLiveDocumentAndHistoryMap17 = new (Map as Dynamic)());
  (platformLiveDocumentAndHistoryValue20003 = 2e3);
  (platformLiveDocumentAndHistoryValue30000 = 3e4);
  (resolvePlatformLiveDocumentAndHistoryValue34 = (
    ..._extraArguments: unknown[]
  ) => Date.now());
  (resolvePlatformLiveDocumentAndHistoryUnavailable2 = (
    error?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    (error instanceof (PlatformLiveDocumentAndHistoryDENIED as Dynamic) &&
      error.reason === `unavailable`) ||
    (error instanceof (EditorExtensionsFrameSendError as Dynamic) &&
      error.code === `NO_RESULT_RELAY`) ||
    isFrameOfflineError(error));
  (resolvePlatformLiveDocumentAndHistoryValue35 = (
    platformLiveDocumentAndHistoryValue35?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof platformLiveDocumentAndHistoryValue35 == `object` &&
    !!platformLiveDocumentAndHistoryValue35 &&
    !Array.isArray(platformLiveDocumentAndHistoryValue35));
  (PlatformLiveDocumentAndHistoryOpen = create(
    (..._extraArguments: unknown[]) => ({
      open: false,
    }),
  ));
  (resolvePlatformLiveDocumentAndHistoryOpen = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    PlatformLiveDocumentAndHistoryOpen(
      (
        platformLiveDocumentAndHistoryOpen?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => platformLiveDocumentAndHistoryOpen.open,
    ));
  lazyZod
    .strictObject({
      ref: dataContentAndReferencesFragSchema
        .optional()
        .describe(`The existing object an update/delete targets.`),
      object: dataContentAndReferencesDescribeSchema3
        .optional()
        .describe(
          `For embedded creates: what KIND to birth (the room mints ids at execute). The room vocabulary, not z.string() (verifier: a garbage or retired noun dies at the grammar, not at some future resolver's default).`,
        ),
      verb: lazyZod
        .enum(dataEnumsAndValidationCreateUpdateDeleteValues)
        .describe(`The embedded op's verb (create | update | delete).`),
      engine: dataOperationEngineDescribeSchema.describe(
        `The lattice cell the execute-time replay speaks.`,
      ),
      payload: lazyZod
        .json()
        .describe(
          `The op's cell payload, verbatim — validated again at execute.`,
        ),
    })
    .refine(
      (callback?: Dynamic, ..._extraArguments: unknown[]) =>
        callback.verb === `create`
          ? callback.object !== undefined && callback.ref === undefined
          : callback.ref !== undefined && callback.object === undefined,
      {
        message: `EXACTLY one addressing field, keyed by verb — a create births (object, no ref); update/delete target (ref, no object). Both present is the ambiguity the shape law keys off; NEITHER present is the targetless op a future resolver default would otherwise adopt past the genesis/recursion fences (verifier t4-7/t2-1).`,
      },
    )
    .refine(
      (callback?: Dynamic, ..._extraArguments: unknown[]) =>
        !(
          callback.engine === `prose` &&
          callback.payload !== null &&
          typeof callback.payload == `object` &&
          !Array.isArray(callback.payload) &&
          typeof callback.payload.yUpdate == `string`
        ),
      {
        message: `a prose {yUpdate} (raw CRDT bytes) is not stageable cargo — it is the browser editor's live-typing lane and is never structure-judged; stage the edit as bid-addressed {ops:[…]} or a whole-doc {value, if_match} instead.`,
      },
    )
    .describe(`One embedded op inside a staged run's ops cargo.`);
  (platformLiveDocumentAndHistoryAdapterArgsBindingBodyValues = [
    `adapter`,
    `args`,
    `binding`,
    `body`,
    `commitUnderTest`,
    `harness`,
    `ids`,
    `kind`,
    `maxRetries`,
    `metadata`,
    `model`,
    `models`,
    `name`,
    `node`,
    `numRollouts`,
    `ops`,
    `parameters`,
    `params`,
    `parent`,
    `prompt`,
    `rollout`,
    `routine`,
    `source`,
    `spec`,
    `suite`,
  ]);
  (PlatformLiveDocumentAndHistoryRail = {
    rail: null,
    pane: null,
    bars: 0,
    component: null,
    compareAsk: {
      seq: 0,
      base: `previous`,
    },
  });
  (PlatformLiveDocumentAndHistoryState3 = create(
    (..._extraArguments: unknown[]) => ({
      ...PlatformLiveDocumentAndHistoryRail,
    }),
  ));
  (resolvePlatformLiveDocumentAndHistoryCanRestore = (
    platformLiveDocumentAndHistoryCanRestore?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    platformLiveDocumentAndHistoryCanRestore === options ||
    (platformLiveDocumentAndHistoryCanRestore !== null &&
      options !== null &&
      platformLiveDocumentAndHistoryCanRestore.canRestore ===
        options.canRestore &&
      platformLiveDocumentAndHistoryCanRestore.isCurrent === options.isCurrent &&
      platformLiveDocumentAndHistoryCanRestore.restoring === options.restoring));
  (resolvePlatformLiveDocumentAndHistoryNote = (
    platformLiveDocumentAndHistoryNote?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    platformLiveDocumentAndHistoryNote === options ||
    (platformLiveDocumentAndHistoryNote !== null &&
      options !== null &&
      (platformLiveDocumentAndHistoryNote.note?.full ?? null) ===
        (options.note?.full ?? null) &&
      (platformLiveDocumentAndHistoryNote.aside?.full ?? null) ===
        (options.aside?.full ?? null) &&
      (platformLiveDocumentAndHistoryNote.compare === null
        ? options.compare === null
        : options.compare !== null &&
          platformLiveDocumentAndHistoryNote.compare.base ===
            options.compare.base &&
          platformLiveDocumentAndHistoryNote.compare.source ===
            options.compare.source)));
  (resolvePlatformLiveDocumentAndHistoryRail = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    PlatformLiveDocumentAndHistoryState3(
      (
        platformLiveDocumentAndHistoryRail?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => platformLiveDocumentAndHistoryRail.rail,
    ));
  (resolvePlatformLiveDocumentAndHistoryPane = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    PlatformLiveDocumentAndHistoryState3(
      (
        platformLiveDocumentAndHistoryPane?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => platformLiveDocumentAndHistoryPane.pane,
    ));
  (resolvePlatformLiveDocumentAndHistoryBars = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    PlatformLiveDocumentAndHistoryState3(
      (
        platformLiveDocumentAndHistoryBars?: Dynamic,
        ..._extraArguments: unknown[]
      ) => platformLiveDocumentAndHistoryBars.bars > 0,
    ));
  (resolvePlatformLiveDocumentAndHistoryComponent = (
    ..._extraArguments: unknown[]
  ): Dynamic => PlatformLiveDocumentAndHistoryState3.getState().component);
  (resolvePlatformLiveDocumentAndHistoryCompareAsk = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    PlatformLiveDocumentAndHistoryState3(
      (
        platformLiveDocumentAndHistoryCompareAsk?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => platformLiveDocumentAndHistoryCompareAsk.compareAsk,
    ));
  (platformLiveDocumentAndHistoryValue30002 = 3e3);
  (platformLiveDocumentAndHistoryValue4000 = 4e3);
  (PlatformLiveDocumentAndHistoryStyles = `html[data-host-icons="pending"] [data-cds="Icon"]:not(svg){visibility:hidden}`);
}

export {
  loadPlatformLiveDocumentAndHistoryChanged,
  loadPlatformLiveDocumentAndHistoryLimit,
  loadPlatformLiveDocumentAndHistorySheet,
  resolvePlatformLiveDocumentAndHistoryBars,
  resolvePlatformLiveDocumentAndHistoryCompareAsk,
  resolvePlatformLiveDocumentAndHistoryComponent,
  resolvePlatformLiveDocumentAndHistoryEncode,
  resolvePlatformLiveDocumentAndHistoryFileId3,
  resolvePlatformLiveDocumentAndHistoryNote2,
  resolvePlatformLiveDocumentAndHistoryOpen,
  resolvePlatformLiveDocumentAndHistoryPane,
  resolvePlatformLiveDocumentAndHistoryRail,
  resolvePlatformLiveDocumentAndHistoryRestoreFailed,
  resolvePlatformLiveDocumentAndHistoryValue36,
  updatePlatformLiveDocumentAndHistoryBars,
  updatePlatformLiveDocumentAndHistoryCompareAsk,
  updatePlatformLiveDocumentAndHistoryComponent,
  updatePlatformLiveDocumentAndHistoryOpen,
  updatePlatformLiveDocumentAndHistoryOpen2,
  updatePlatformLiveDocumentAndHistoryPane,
  updatePlatformLiveDocumentAndHistoryRail,
  updatePlatformLiveDocumentAndHistoryReady,
  usePlatformLiveDocumentAndHistoryPid2,
  usePlatformLiveDocumentAndHistoryPid3,
};
