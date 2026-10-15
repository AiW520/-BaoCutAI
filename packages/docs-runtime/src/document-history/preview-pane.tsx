/** version-preview-pane: restored from VersionPreviewPane-Bo7aPjii.js. */
import { originalJsxProps } from "../react-runtime/jsx-runtime";
import type { Dynamic } from "../interop/legacy-dynamic";
const mapPreloadDependencies: Dynamic = (
  ..._extraArguments: unknown[]
): Dynamic => [];
import { toModuleNamespace } from "../boot/module-runtime";
import {
  Button,
  collectDataModelSchemasBuf,
  loadJsxRuntime,
  loadPlatformLiveDocumentAndHistoryContainer,
  loadPlatformLiveDocumentAndHistoryHtml,
  loadReact,
  PlatformLiveDocumentAndHistoryEntries2,
  platformSessionAndSourcesPattern9,
  PlatformSyncAndRoutingAssign2,
  PlatformSyncAndRoutingState4,
  resolvePlatformApiAndAuthUseContext2,
  resolvePlatformLiveDocumentAndHistoryBars,
  resolvePlatformLiveDocumentAndHistoryCompareAsk,
  resolvePlatformLiveDocumentAndHistoryParams,
  resolvePlatformLiveDocumentAndHistoryValue32,
  resolvePlatformSyncAndRoutingCompact,
  resolvePlatformSyncAndRoutingCompareMode,
  resolvePlatformSyncAndRoutingCopyOffers2,
  resolvePlatformSyncAndRoutingHeadDrivenId,
  resolvePlatformSyncAndRoutingHeadEmbedNodes,
  resolvePlatformSyncAndRoutingHeadEpoch,
  resolvePlatformSyncAndRoutingList,
  resolvePlatformSyncAndRoutingPick,
  resolvePlatformSyncAndRoutingPreparing,
  resolvePlatformSyncAndRoutingPreview,
  resolvePlatformSyncAndRoutingPreview2,
  resolvePlatformSyncAndRoutingRestoreOffers2,
  resolvePlatformSyncAndRoutingShowChanges,
  resolvePlatformSyncAndRoutingStepAsk,
  resolvePlatformSyncAndRoutingStepAsk2,
  resolvePlatformSyncAndRoutingStepOffers,
  resolvePlatformSyncAndRoutingStepOffers2,
  resolvePlatformSyncAndRoutingValue22,
  resolvePlatformSyncAndRoutingValue24,
  resolvePlatformSyncAndRoutingValue26,
  Tooltip,
  UiOverlaysAndIconsCustomIcon,
  updatePlatformLiveDocumentAndHistoryPane,
  updatePlatformSyncAndRoutingCopyAsk,
  updatePlatformSyncAndRoutingPhoneView,
  updatePlatformSyncAndRoutingRestoreAsk,
  updatePlatformSyncAndRoutingShowChanges,
  updatePlatformSyncAndRoutingStats,
  updatePlatformSyncAndRoutingStepAsk,
  usePlatformSyncAndRoutingFramed,
} from "../platform/index";
import { isFrameArtifact } from "../boot/environment";
import { preloadModule } from "../boot/preload";
import {
  SegmentedControl,
  Switch,
} from "../design-system/index";
import {
  IconButton,
  UntippedIconButton,
  useDocumentDisplay,
  useDocumentFonts,
  useDocumentLanguage,
} from "../document-app/index";
import {
  clearProjectEnumCache,
  clearVersionComparisonCache,
  clearVersionFaceCaches,
  collectEmbedReferences,
  compareVersionDocuments,
  comparisonBaseKey,
  describeUncheckedDiffs,
  diffHtml,
  equalComparisonBases,
  getCachedVersionComparison,
  getCachedVersionFace,
  getVersionReader,
  isEmbedDiffError,
  legacyDiffPreviewHtml,
  loadProjectEnums,
  loadVersionFace,
  neighboringVersionRevisions,
  normalizeComparisonBase,
  previousVersionRevision,
  prewarmComparisonBase,
  prewarmVersionFaces,
  publishPreviewDiffStats,
  resolveComparisonBase,
  restoredVersionDetails,
  restoredVersionSummary,
  sanitizePreviewHtml,
  SIMPLER_COMPARISON_MESSAGE,
  tryDetailedDiff,
  versionBlobReader,
  versionDiffPreviewHtml,
  versionDiffStatsSummary,
  versionLoadErrorMessage,
  withManifestRedline,
  withVersionPreviewCss,
} from "../platform/lazy";
import { changeStatsLabel } from "./groups";
import { LFileSnapshotView } from "./snapshot-view";
var React: Dynamic = toModuleNamespace(loadReact(), 1);
var jsxRuntime: Dynamic = loadJsxRuntime();
function StackedPreviewShell(
  { stacked: stacked, children: children }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return stacked ? (
    <jsxRuntime.Fragment>
      <PreviewHeader />
      <div className={`min-h-0 flex-1`}>{children}</div>
    </jsxRuntime.Fragment>
  ) : (
    children
  );
}
function formatVersionDateRange(
  at2?: Dynamic,
  since?: Dynamic,
  locale?: Dynamic,
  timeZone?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let formatOptions: Dynamic = {
    month: `short`,
    day: `numeric`,
    hour: `numeric`,
    minute: `2-digit`,
    timeZone: timeZone,
  };
  let atDate: Dynamic = new (Date as Dynamic)(at2);
  let sinceDate: Dynamic =
    since === undefined ? undefined : new (Date as Dynamic)(since);
  if (
    Number.isNaN(atDate.getTime()) ||
    (sinceDate !== undefined && Number.isNaN(sinceDate.getTime()))
  )
    return atDate.toLocaleString(locale, formatOptions);
  let formatter: Dynamic = new (Intl.DateTimeFormat as Dynamic)(
    locale,
    formatOptions,
  );
  return sinceDate === undefined || since === at2
    ? formatter.format(atDate)
    : formatter.formatRange(sinceDate, atDate);
}
function PreviewHeader(
  ..._extraArguments: [Readonly<Record<string, unknown>>?, ...unknown[]]
): Dynamic {
  let mode: Dynamic = resolvePlatformApiAndAuthUseContext2();
  let preview: Dynamic = PlatformSyncAndRoutingAssign2(
    (previewHeader?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      previewHeader.preview,
  );
  let showChanges: Dynamic = resolvePlatformSyncAndRoutingPreview2();
  let stats: Dynamic = resolvePlatformSyncAndRoutingPreview();
  let unchecked: Dynamic = resolvePlatformSyncAndRoutingStepOffers2();
  let restoring: Dynamic = resolvePlatformSyncAndRoutingRestoreOffers2();
  let canRestore: Dynamic = resolvePlatformSyncAndRoutingCopyOffers2();
  let railMode: Dynamic = resolvePlatformSyncAndRoutingList();
  let headerRef: Dynamic = (0, React.useRef)(null);
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (railMode !== `preview`) return;
      let activeElement: Dynamic = (document as Dynamic).activeElement;
      if (
        (document as Dynamic).hasFocus() &&
        (activeElement === null ||
          activeElement === (document as Dynamic).body ||
          activeElement.closest(`[data-testid="history-rail-seat"]`) !== null)
      ) {
        headerRef.current?.focus({
          preventScroll: true,
        });
      }
    },
    [railMode],
  );
  if (preview === null) return null;
  let dateLabel: Dynamic = formatVersionDateRange(
    preview.at,
    preview.group?.since,
    mode.locale,
    mode.timeZone,
  );
  let group: Dynamic = preview.group;
  let details: string = [
    showChanges,
    group === undefined ? null : `${group.count} versions`,
    stats
      ? changeStatsLabel(stats, mode.locale, {
          net: group !== undefined,
        })
      : null,
  ]
    .filter(Boolean)
    .join(` · `);
  return (
    <div
      data-testid={`history-phone-bar`}
      className={`bg-surface-panel flex h-12 shrink-0 items-center gap-2 border-b px-2`}
    >
      <Tooltip content={`Back to versions`}>
        <UntippedIconButton
          ref={headerRef}
          icon={
            <UiOverlaysAndIconsCustomIcon name={`CaretLeft`} customSize={14} />
          }
          size={22}
          onClick={updatePlatformSyncAndRoutingPhoneView}
          aria-label={`Back to versions`}
        />
      </Tooltip>
      <div className={`min-w-0 flex-1`}>
        <div className={`text-primary text-body truncate font-medium`}>
          {dateLabel}
        </div>
        {details !== `` && (
          <div
            className={`text-secondary text-caption truncate`}
            data-testid={`history-phone-meta`}
          >
            {details}
          </div>
        )}
      </div>
      {unchecked && stats !== null && stats.total > 0 && (
        <jsxRuntime.Fragment>
          <UntippedIconButton
            icon={
              <UiOverlaysAndIconsCustomIcon name={`CaretUp`} customSize={14} />
            }
            size={22}
            onClick={(..._extraArguments: unknown[]): Dynamic =>
              updatePlatformSyncAndRoutingStepAsk(-1)
            }
            aria-label={`Previous change`}
          />
          <UntippedIconButton
            icon={
              <UiOverlaysAndIconsCustomIcon
                name={`CaretDown`}
                customSize={14}
              />
            }
            size={22}
            onClick={(..._extraArguments: unknown[]): Dynamic =>
              updatePlatformSyncAndRoutingStepAsk(1)
            }
            aria-label={`Next change`}
          />
        </jsxRuntime.Fragment>
      )}
      {canRestore && (
        <Button
          variant={`ghost`}
          data-testid={`history-phone-copy`}
          onClick={(..._extraArguments: unknown[]): Dynamic =>
            updatePlatformSyncAndRoutingCopyAsk()
          }
        >{`Make a copy`}</Button>
      )}
      {restoring && !preview.isCurrent && (
        <Button
          data-testid={`history-phone-restore`}
          onClick={(..._extraArguments: unknown[]): Dynamic =>
            updatePlatformSyncAndRoutingRestoreAsk()
          }
        >{`Restore`}</Button>
      )}
    </div>
  );
}
var EARLIER_VERSION_NOTE: string = `Earlier version · comments hidden`;
var CURRENT_VERSION_NOTE: string = `Current version · comments hidden`;
var versionPreviewNote: Dynamic = (
  isCurrent?: Dynamic,
  comparedWithFirst?: Dynamic,
  ..._extraArguments: unknown[]
): string =>
  comparedWithFirst
    ? `${isCurrent ? `Current version` : `Earlier version`} · ${FIRST_SAVED_COMPARISON_NOTE} · comments hidden`
    : isCurrent
      ? CURRENT_VERSION_NOTE
      : EARLIER_VERSION_NOTE;
var groupPreviewNote = (
  group?: Dynamic,
  showFirstSavedNote: Dynamic = true,
  ..._extraArguments: unknown[]
) =>
  `${group.count} versions · ${group.base === `first` && showFirstSavedNote ? `${FIRST_SAVED_COMPARISON_NOTE} · ` : ``}comments hidden`;
var FIRST_SAVED_COMPARISON_NOTE: string = `compared with the document as first saved`;
var NO_EARLIER_VERSION_NOTE: string = `No earlier version to compare with`;
var EARLIER_VERSION_LOAD_FAILED_NOTE: string = `Couldn't load the earlier version to compare`;
var VERSION_COMPARE_FAILED_NOTE: string = `Couldn't compare these versions`;
var LOAD_OLDER_VERSIONS_NOTE: string = `Show older versions to compare`;
var RESTORED_VERSION_MATCH_NOTE: string = `Identical to the restored version`;
var SHORT_COMPARISON_NOTES: Dynamic = {
  [NO_EARLIER_VERSION_NOTE]: `Nothing earlier to compare`,
  [EARLIER_VERSION_LOAD_FAILED_NOTE]: `Couldn't compare`,
  [VERSION_COMPARE_FAILED_NOTE]: `Couldn't compare`,
  [RESTORED_VERSION_MATCH_NOTE]: `Matches restored version`,
  [FIRST_SAVED_COMPARISON_NOTE]: `vs first saved version`,
};
var CHECKING_EMBEDDED_CONTENT_NOTE: string = `Checking embedded content…`;
var CHECKING_EMBEDS_NOTE: string = `Checking embeds…`;
var shortComparisonNotice: Dynamic = (
  notice?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  notice === null
    ? null
    : {
        short:
          notice === `Checking embedded content…`
            ? CHECKING_EMBEDS_NOTE
            : (SHORT_COMPARISON_NOTES[notice] ?? notice),
        full: notice,
        ...(notice === `Identical to the restored version`
          ? {
              inPlaceOfNoChanges: true,
            }
          : {}),
      };
function StructuredVersionPreview(
  props?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    <StackedPreviewShell stacked={props.stacked && props.upto !== undefined}>
      <StructuredVersionPreviewBody
        {...originalJsxProps({
          ...props,
        })}
      />
    </StackedPreviewShell>
  );
}
function StructuredVersionPreviewBody(
  {
    pid: pid,
    fileId: fileId,
    upto: upto,
    previewId: previewId,
    title: title,
    envelope: envelope,
    scrollY: scrollY,
    uptos: uptos,
    stacked: stacked,
    Surface = LFileSnapshotView,
    reader: reader,
    diff: diff,
    embeds: embeds,
  }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let typography: Dynamic = useDocumentFonts(pid);
  let style: Dynamic = useDocumentDisplay(pid);
  let language: Dynamic = useDocumentLanguage(pid);
  let [snapshot, setSnapshot]: Dynamic = (0, React.useState)(
    (..._extraArguments: unknown[]): Dynamic =>
      upto === undefined
        ? null
        : (getCachedVersionFace(
            {
              pid: pid,
              fileId: fileId,
            },
            upto,
          ) ?? null),
  );
  let [comparison, setComparison]: Dynamic = (0, React.useState)(null);
  let [failedComparisonKey, setFailedComparisonKey]: Dynamic = (0,
  React.useState)(null);
  let [comparisonError, setComparisonError]: Dynamic = (0, React.useState)(
    false,
  );
  let [loadState, setLoadState]: Dynamic = (0, React.useState)({
    state: `idle`,
  });
  let [showLoading, setShowLoading]: Dynamic = (0, React.useState)(false);
  let [retryTick, setRetryTick]: Dynamic = (0, React.useState)(0);
  let [previewError, setPreviewError]: Dynamic = (0, React.useState)(null);
  let showChanges: Dynamic = resolvePlatformSyncAndRoutingShowChanges();
  let group: Dynamic = PlatformSyncAndRoutingAssign2(
    (
      structuredVersionPreviewBody?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      structuredVersionPreviewBody.preview !== null &&
      structuredVersionPreviewBody.preview.id === previewId
        ? structuredVersionPreviewBody.preview.group
        : undefined,
  );
  let rowBase: Dynamic = PlatformSyncAndRoutingAssign2(
    (
      structuredVersionPreviewBody?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      structuredVersionPreviewBody.preview !== null &&
      structuredVersionPreviewBody.preview.id === previewId &&
      structuredVersionPreviewBody.preview.group === undefined
        ? structuredVersionPreviewBody.preview.base
        : undefined,
  );
  let comparisonBase: Dynamic = group === undefined ? rowBase : group.base;
  let isCurrent: Dynamic = PlatformSyncAndRoutingAssign2(
    (
      structuredVersionPreviewBody?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      structuredVersionPreviewBody.preview !== null &&
      structuredVersionPreviewBody.preview.id === previewId &&
      structuredVersionPreviewBody.preview.group === undefined &&
      structuredVersionPreviewBody.preview.isCurrent,
  );
  let headEpoch: Dynamic = resolvePlatformSyncAndRoutingHeadEpoch();
  let currentHeadEpoch: Dynamic = isCurrent ? headEpoch : -1;
  let restoredPreviewId: Dynamic = resolvePlatformSyncAndRoutingHeadDrivenId();
  let previewPick: Dynamic = resolvePlatformSyncAndRoutingPick();
  let lastPickRef: Dynamic = (0, React.useRef)({
    pick: null,
    epoch: 0,
    asHead: false,
  });
  if (
    snapshot !== null &&
    snapshot.upto === upto &&
    comparison !== null &&
    comparison.upto === snapshot.upto &&
    lastPickRef.current.pick !== previewPick
  ) {
    lastPickRef.current = {
      pick: previewPick,
      epoch: headEpoch,
      asHead: isCurrent,
    };
  }
  let headPick: Dynamic = lastPickRef.current.asHead
    ? lastPickRef.current.pick
    : null;
  let hideStaleChanges: Dynamic =
    isCurrent &&
    ((lastPickRef.current.pick === previewPick &&
      headEpoch !== lastPickRef.current.epoch) ||
      restoredPreviewId === previewId);
  let readerRef: Dynamic = (0, React.useRef)(reader);
  readerRef.current = reader;
  let diffRef: Dynamic = (0, React.useRef)(diff);
  diffRef.current = diff;
  let embedsRef: Dynamic = (0, React.useRef)(embeds);
  embedsRef.current = embeds;
  let mode: Dynamic = resolvePlatformApiAndAuthUseContext2();
  let side: Dynamic = resolvePlatformSyncAndRoutingCompact();
  let [compareMode, setCompareMode]: Dynamic = (0, React.useState)(`previous`);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      setCompareMode(`previous`);
    },
    [pid, fileId, upto, previewId],
  );
  let history: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      resolvePlatformLiveDocumentAndHistoryValue32(pid, fileId),
    [
      pid,
      fileId,
      PlatformLiveDocumentAndHistoryEntries2(
        (
          structuredVersionPreviewBody?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => structuredVersionPreviewBody.entries,
      ),
    ],
  );
  let envelopeRef: Dynamic = (0, React.useRef)(envelope);
  envelopeRef.current = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => ({
      bodyLid: envelope?.bodyLid,
      styleSheet: withVersionPreviewCss(envelope?.styleSheet),
    }),
    [envelope?.bodyLid, envelope?.styleSheet],
  );
  let [keepExistingPreview, setKeepExistingPreview]: Dynamic = (0,
  React.useState)(false);
  let uptosRef: Dynamic = (0, React.useRef)(uptos);
  uptosRef.current = uptos;
  let olderUptos: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): Dynamic =>
      uptosRef.current?.filter(
        (
          structuredVersionPreviewBody?: Dynamic,
          ..._extraArguments: unknown[]
        ) => typeof structuredVersionPreviewBody == `number`,
      ) ??
      resolvePlatformLiveDocumentAndHistoryValue32(pid, fileId)
        .filter(
          (item?: Dynamic, ..._extraArguments: unknown[]) =>
            resolvePlatformLiveDocumentAndHistoryParams(item) !== `current`,
        )
        .map(
          (filteredItem?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            filteredItem.params.upto,
        )
        .filter(
          (mappedFilteredItem?: Dynamic, ..._extraArguments: unknown[]) =>
            typeof mappedFilteredItem == `number`,
        ),
    [pid, fileId],
  );
  let initialLoadRef: Dynamic = (0, React.useRef)(upto === undefined);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (upto === undefined) {
        initialLoadRef.current = true;
        setLoadState({
          state: `idle`,
        });
        return;
      }
      let record: Dynamic = {
        pid: pid,
        fileId: fileId,
      };
      let initialLoad: Dynamic = initialLoadRef.current;
      initialLoadRef.current = false;
      let structuredVersionPreviewBodyResult: Dynamic = getCachedVersionFace(
        record,
        upto,
      );
      if (structuredVersionPreviewBodyResult !== undefined) {
        setSnapshot(structuredVersionPreviewBodyResult);
        setKeepExistingPreview(false);
        setLoadState({
          state: `idle`,
        });
        return;
      }
      let enabled: boolean = true;
      setKeepExistingPreview(initialLoad);
      setLoadState({
        state: `loading`,
        upto: upto,
        since: retryTick,
      });
      loadVersionFace(
        record,
        upto,
        envelopeRef.current,
        readerRef.current ?? getVersionReader(),
      ).then(
        (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (enabled) {
            setSnapshot(result);
            setKeepExistingPreview(false);
            setLoadState({
              state: `idle`,
            });
          }
        },
        (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (enabled) {
            setLoadState({
              state: `error`,
              upto: upto,
              words: versionLoadErrorMessage(result),
            });
          }
        },
      );
      return (..._extraArguments: unknown[]): undefined => {
        enabled = false;
      };
    },
    [pid, fileId, upto, retryTick, currentHeadEpoch],
  );
  let baseAddress: Dynamic =
    comparisonBase === undefined
      ? undefined
      : normalizeComparisonBase(comparisonBase);
  let cachedBase: Dynamic =
    comparison !== null &&
    snapshot !== null &&
    comparison.upto === snapshot.upto
      ? comparison.base
      : undefined;
  let compareRestored: boolean = compareMode === `restored`;
  let requestedBase: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (upto === undefined)
        return {
          base: null,
          vsRestored: false,
        };
      let structuredVersionPreviewBodyResult: Dynamic = restoredVersionDetails(
        history,
        upto,
      );
      if (
        compareMode === `restored` &&
        structuredVersionPreviewBodyResult !== null &&
        structuredVersionPreviewBodyResult.sourceUpto !== undefined
      )
        return {
          base: structuredVersionPreviewBodyResult.sourceUpto,
          vsRestored: true,
        };
      if (baseAddress !== undefined)
        return {
          base: resolveComparisonBase(history, baseAddress),
          vsRestored: false,
        };
      let history2: Dynamic = (history as Dynamic).find(
        (history3?: Dynamic, ..._extraArguments: unknown[]): boolean =>
          history3.params.upto === upto &&
          resolvePlatformLiveDocumentAndHistoryParams(history3) === `current`,
      );
      if (history2 !== undefined) {
        let structuredVersionPreviewBodyResult2: Dynamic =
          previousVersionRevision([upto, ...olderUptos()], upto);
        let baseRev: Dynamic = history2.params.baseRev;
        if (typeof baseRev != `number`)
          return {
            base: structuredVersionPreviewBodyResult2,
            vsRestored: false,
          };
        let history3: Dynamic =
          structuredVersionPreviewBodyResult2 === null
            ? undefined
            : (history as Dynamic).find(
                (history4?: Dynamic, ..._extraArguments: unknown[]) =>
                  history4.params.upto === structuredVersionPreviewBodyResult2,
              );
        let rev: Dynamic =
          history3 === undefined ? undefined : history3.params.rev;
        return {
          base:
            structuredVersionPreviewBodyResult2 !== null && rev === baseRev
              ? structuredVersionPreviewBodyResult2
              : resolveComparisonBase(history, {
                  rev: baseRev,
                }),
          vsRestored: false,
        };
      }
      return {
        base: previousVersionRevision(olderUptos(), upto),
        vsRestored: false,
      };
    },
    [history, compareMode, baseAddress, upto, olderUptos],
  );
  let { base: activeBase, vsRestored: vsRestored }: Dynamic = (0,
  React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      snapshot === null
        ? {
            base: null,
            vsRestored: false,
          }
        : snapshot.upto === upto
          ? requestedBase
          : {
              base: cachedBase ?? null,
              vsRestored: cachedBase !== undefined && compareRestored,
            },
    [snapshot, upto, requestedBase, cachedBase, compareRestored],
  );
  let baseKey: Dynamic = comparisonBaseKey(activeBase);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (upto === undefined || !showChanges || requestedBase.vsRestored)
        return;
      let record: Dynamic = {
        pid: pid,
        fileId: fileId,
      };
      if (
        getCachedVersionComparison(
          record,
          upto,
          requestedBase.base,
          requestedBase.vsRestored,
        ) === undefined
      ) {
        prewarmComparisonBase(record, requestedBase.base, {
          reader: readerRef.current ?? getVersionReader(),
          envelope: envelopeRef.current,
        });
      }
    },
    [
      pid,
      fileId,
      upto,
      showChanges,
      comparisonBaseKey(requestedBase.base),
      requestedBase.vsRestored,
      retryTick,
      currentHeadEpoch,
    ],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (snapshot === null || !showChanges) {
        setComparison(null);
        return;
      }
      let record: Dynamic = {
        pid: pid,
        fileId: fileId,
      };
      let structuredVersionPreviewBodyResult: Dynamic =
        getCachedVersionComparison(
          record,
          snapshot.upto,
          activeBase,
          vsRestored,
        );
      if (structuredVersionPreviewBodyResult !== undefined) {
        setComparison(structuredVersionPreviewBodyResult);
        return;
      }
      setComparison(null);
      let enabled: boolean = true;
      let structuredVersionPreviewBodyResult2: Dynamic;
      let structuredVersionPreviewBodyHandler = (
        ..._extraArguments: unknown[]
      ): undefined => {
        structuredVersionPreviewBodyResult2 = setTimeout(
          (..._extraArguments: unknown[]): undefined => {
            structuredVersionPreviewBodyResult2 = undefined;
            if (enabled) {
              compareVersionDocuments(record, snapshot, activeBase, {
                reader: readerRef.current ?? getVersionReader(),
                envelope: envelopeRef.current,
                diff: diffRef.current,
                embeds: embedsRef.current,
                byContent: vsRestored,
                onProse: (
                  structuredVersionPreviewBody?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  enabled && setComparison(structuredVersionPreviewBody),
              }).then(
                (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  enabled && setComparison(result),
                (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  enabled &&
                  (setFailedComparisonKey(
                    `${snapshot.upto}~${comparisonBaseKey(activeBase)}`,
                  ),
                  setComparisonError(!isEmbedDiffError(result))),
              );
            }
          },
          0,
        );
      };
      let requestAnimationFrame: Dynamic =
        typeof (window as Dynamic).requestAnimationFrame == `function`
          ? (window as Dynamic).requestAnimationFrame(
              structuredVersionPreviewBodyHandler,
            )
          : (structuredVersionPreviewBodyHandler(), undefined);
      return (..._extraArguments: unknown[]): undefined => {
        enabled = false;
        if (requestAnimationFrame !== undefined) {
          (window as Dynamic).cancelAnimationFrame(requestAnimationFrame);
        }
        if (structuredVersionPreviewBodyResult2 !== undefined) {
          clearTimeout(structuredVersionPreviewBodyResult2);
        }
      };
    },
    [pid, fileId, snapshot, showChanges, baseKey, vsRestored, history],
  );
  let loading: boolean = loadState.state === `loading`;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!loading) {
        setShowLoading(false);
        return;
      }
      let setTimeout2: Dynamic = setTimeout(
        (..._extraArguments: unknown[]): Dynamic => setShowLoading(true),
        150,
      );
      return (..._extraArguments: unknown[]): void =>
        clearTimeout(setTimeout2);
    },
    [loading, upto, retryTick],
  );
  let comparisonReady: Dynamic =
    showChanges &&
    comparison !== null &&
    snapshot !== null &&
    comparison.upto === snapshot.upto &&
    equalComparisonBases(comparison.base, activeBase) &&
    comparison.merged !== null;
  let liveEmbedNodes: Dynamic = resolvePlatformSyncAndRoutingHeadEmbedNodes(
    `${pid}/${fileId}`,
  );
  let widgetOverrides: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!isCurrent || liveEmbedNodes === null) return null;
      let record: Dynamic = {};
      for (let [
        structuredVersionPreviewBodyResult,
        structuredVersionPreviewBodyResult2,
      ] of Object.entries(liveEmbedNodes) as Dynamic) {
        if (
          !platformSessionAndSourcesPattern9.test(
            structuredVersionPreviewBodyResult,
          )
        )
          continue;
        let structuredVersionPreviewBodyResult3: Dynamic =
          structuredVersionPreviewBodyResult2;
        if (structuredVersionPreviewBodyResult3.type === `widget`) {
          if (structuredVersionPreviewBodyResult3.gone === true) {
            record[structuredVersionPreviewBodyResult] = {
              type: `widget`,
              code: ``,
              gone: true,
            };
          } else {
            if (
              typeof structuredVersionPreviewBodyResult3.code == `string` &&
              structuredVersionPreviewBodyResult3.code !== ``
            ) {
              record[structuredVersionPreviewBodyResult] = {
                type: `widget`,
                code: structuredVersionPreviewBodyResult3.code,
                ...(typeof structuredVersionPreviewBodyResult3.pub == `number`
                  ? {
                      pub: structuredVersionPreviewBodyResult3.pub,
                    }
                  : {}),
              };
            }
          }
        } else {
          record[structuredVersionPreviewBodyResult] =
            structuredVersionPreviewBodyResult2;
        }
      }
      return Object.keys(record).length === 0 ? null : record;
    },
    [isCurrent, liveEmbedNodes],
  );
  let previewFile: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      snapshot === null
        ? null
        : widgetOverrides === null ||
            snapshot.upto !== upto ||
            !collectEmbedReferences(snapshot.doc).some(
              (item?: Dynamic, ..._extraArguments: unknown[]) =>
                widgetOverrides[item] !== undefined,
            )
          ? snapshot.file
          : {
              ...snapshot.file,
              nodes: {
                ...snapshot.file.nodes,
                ...widgetOverrides,
              },
            },
    [snapshot, widgetOverrides, upto],
  );
  let readLiveWidgetFilm: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (
        !(
          widgetOverrides === null ||
          previewFile === null ||
          snapshot === null ||
          previewFile === snapshot.file
        )
      )
        return (
          structuredVersionPreviewBody?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => {
          let widgetOverrideItem: Dynamic = Object.hasOwn(
            widgetOverrides,
            structuredVersionPreviewBody,
          )
            ? widgetOverrides[structuredVersionPreviewBody]
            : undefined;
          return widgetOverrideItem === undefined ||
            widgetOverrideItem.type !== `widget` ||
            typeof widgetOverrideItem.code != `string` ||
            widgetOverrideItem.code === ``
            ? Promise.resolve(null)
            : loadPlatformLiveDocumentAndHistoryContainer(
                pid,
                fileId,
                structuredVersionPreviewBody,
              );
        };
    },
    [widgetOverrides, previewFile, snapshot, pid, fileId],
  );
  let surface: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      previewFile === null || snapshot === null
        ? null
        : withManifestRedline(
            previewFile,
            comparisonReady && comparison !== null ? comparison.merged : null,
            {
              ...(comparison === null
                ? {}
                : {
                    key: `${comparison.upto}~${comparisonBaseKey(comparison.base)}${headPick === null ? `` : `~p${headPick}`}`,
                  }),
              ...(hideStaleChanges
                ? {
                    reveal: false,
                  }
                : {}),
            },
          ),
    [
      previewFile,
      snapshot,
      comparison,
      comparisonReady,
      hideStaleChanges,
      headPick,
    ],
  );
  let stats: Dynamic =
    comparisonReady && comparison !== null ? comparison.stats : null;
  let uncheckedCount: Dynamic =
    comparisonReady && comparison !== null ? comparison.unchecked.length : 0;
  let checkingEmbeds: Dynamic =
    comparisonReady && comparison !== null && comparison.checking;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (upto === undefined)
        return void updatePlatformSyncAndRoutingStats(null);
      updatePlatformSyncAndRoutingStats(
        stats !== null && snapshot?.upto === upto
          ? uncheckedCount > 0
            ? {
                ...stats,
                unchecked: uncheckedCount,
              }
            : stats
          : null,
        previewId,
      );
    },
    [upto, previewId, stats, uncheckedCount, snapshot?.upto],
  );
  let loadedUpto: Dynamic = snapshot?.upto;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (upto === undefined || loadedUpto !== upto) return;
      let filteredItems: Dynamic = neighboringVersionRevisions(
        olderUptos(),
        upto,
      ).filter(
        (item?: Dynamic, ..._extraArguments: unknown[]) =>
          getCachedVersionFace(
            {
              pid: pid,
              fileId: fileId,
            },
            item,
          ) === undefined,
      );
      if (filteredItems.length === 0) return;
      let enabled: boolean = true;
      let structuredVersionPreviewBodyHandler = (
        ..._extraArguments: unknown[]
      ): undefined =>
        void prewarmVersionFaces(
          {
            pid: pid,
            fileId: fileId,
          },
          filteredItems,
          envelopeRef.current,
          readerRef.current ?? getVersionReader(),
          (..._extraArguments: unknown[]): boolean => enabled,
        );
      let window2: Dynamic = window;
      if (typeof window2.requestIdleCallback == `function`) {
        let requestIdleCallback: Dynamic = window2.requestIdleCallback(
          structuredVersionPreviewBodyHandler,
          {
            timeout: 400 * 4,
          },
        );
        return (..._extraArguments: unknown[]): undefined => {
          enabled = false;
          window2.cancelIdleCallback?.(requestIdleCallback);
        };
      }
      let setTimeout2: Dynamic = setTimeout(
        structuredVersionPreviewBodyHandler,
        400,
      );
      return (..._extraArguments: unknown[]): undefined => {
        enabled = false;
        clearTimeout(setTimeout2);
      };
    },
    [pid, fileId, upto, loadedUpto, olderUptos],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): undefined => {
        clearVersionFaceCaches();
        clearVersionComparisonCache();
        clearProjectEnumCache();
      },
    [],
  );
  let [initialScroll, setInitialScroll]: Dynamic = (0, React.useState)(
    undefined,
  );
  let readScroll: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
    let scrollY2: Dynamic = typeof scrollY == `function` ? scrollY() : scrollY;
    setInitialScroll(scrollY2);
    return scrollY2;
  };
  let fontLoader: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => versionBlobReader(pid),
    [pid],
  );
  let fontCss: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): Dynamic => loadProjectEnums(pid),
    [pid],
  );
  let noticeEnabled: Dynamic = resolvePlatformSyncAndRoutingPreparing();
  let loadError: Dynamic =
    loadState.state === `error` && loadState.upto === upto
      ? loadState.words
      : null;
  let changesReadout: Dynamic =
    stats === null
      ? ``
      : versionDiffStatsSummary(stats, uncheckedCount, {
          net: group !== undefined,
        });
  let comparisonFailed: boolean =
    snapshot !== null && failedComparisonKey === `${snapshot.upto}~${baseKey}`;
  let changesStatus: Dynamic = checkingEmbeds
    ? [changesReadout, CHECKING_EMBEDDED_CONTENT_NOTE]
        .filter((item?: Dynamic, ..._extraArguments: unknown[]) => item !== ``)
        .join(` · `)
    : changesReadout;
  let restoreSource: Dynamic =
    upto === undefined ? null : restoredVersionDetails(history, upto);
  let formatSourceDate: Dynamic = (
    structuredVersionPreviewBody?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    new (Date as Dynamic)(structuredVersionPreviewBody).toLocaleString(
      mode.locale,
      {
        weekday: `short`,
        hour: `numeric`,
        minute: `2-digit`,
        timeZone: mode.timeZone,
      },
    );
  let previewNote: Dynamic =
    restoreSource === null
      ? group === undefined
        ? versionPreviewNote(
            isCurrent,
            comparisonBase === `first` && !comparisonFailed,
          )
        : groupPreviewNote(group, !comparisonFailed)
      : restoredVersionSummary(restoreSource, formatSourceDate);
  let canCompareRestore: Dynamic =
    restoreSource !== null &&
    restoreSource.sourceUpto !== undefined &&
    showChanges;
  let resolvedComparisonBase: Dynamic =
    comparisonReady && comparison !== null && comparison.base !== null
      ? comparison.base
      : null;
  let headingLabel: Dynamic = resolvePlatformLiveDocumentAndHistoryBars();
  let restoreSourceDate: Dynamic =
    restoreSource !== null && restoreSource.sourceAt !== undefined
      ? formatSourceDate(restoreSource.sourceAt)
      : null;
  let comparisonNotice: Dynamic =
    !showChanges ||
    changesStatus !== `` ||
    comparisonReady ||
    comparisonBase === undefined
      ? null
      : comparisonBase === `none`
        ? NO_EARLIER_VERSION_NOTE
        : comparisonBase === `older`
          ? LOAD_OLDER_VERSIONS_NOTE
          : comparisonFailed
            ? comparisonError
              ? VERSION_COMPARE_FAILED_NOTE
              : EARLIER_VERSION_LOAD_FAILED_NOTE
            : null;
  let changeNotice: Dynamic = showChanges
    ? checkingEmbeds
      ? CHECKING_EMBEDDED_CONTENT_NOTE
      : comparisonReady &&
          changesStatus === `` &&
          compareMode === `restored` &&
          restoreSource !== null
        ? RESTORED_VERSION_MATCH_NOTE
        : comparisonBase === `first` && !comparisonFailed
          ? FIRST_SAVED_COMPARISON_NOTE
          : null
    : null;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      updatePlatformLiveDocumentAndHistoryPane(
        upto === undefined
          ? null
          : {
              compare: canCompareRestore
                ? {
                    base: compareMode,
                    source: restoreSourceDate,
                  }
                : null,
              note: shortComparisonNotice(comparisonNotice),
              aside: shortComparisonNotice(changeNotice),
            },
      );
    },
    [
      upto,
      canCompareRestore,
      compareMode,
      restoreSourceDate,
      comparisonNotice,
      changeNotice,
    ],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): Dynamic =>
        updatePlatformLiveDocumentAndHistoryPane(null),
    [],
  );
  let commentThread: Dynamic =
    resolvePlatformLiveDocumentAndHistoryCompareAsk();
  let commentSequenceRef: Dynamic = (0, React.useRef)(commentThread.seq);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (commentThread.seq !== commentSequenceRef.current) {
        commentSequenceRef.current = commentThread.seq;
        setCompareMode(commentThread.base);
      }
    },
    [commentThread],
  );
  return (
    <div
      className={`relative size-full`}
      data-testid={`history-version-doc`}
      data-upto={upto ?? ``}
      data-shown-upto={snapshot?.upto ?? ``}
      data-shown-rev={snapshot?.rev ?? ``}
      data-swap={previewError ?? ``}
      data-loading={loading ? `1` : undefined}
      data-redline={
        comparisonReady && comparison !== null
          ? comparisonBaseKey(comparison.base)
          : undefined
      }
      data-versions={group?.count}
      data-unchecked={uncheckedCount > 0 ? uncheckedCount : undefined}
      data-checking={checkingEmbeds ? `1` : undefined}
      data-restored-from={restoreSource?.restoredFrom ?? undefined}
      data-restore-base={restoreSource === null ? undefined : compareMode}
      data-reveal={hideStaleChanges ? `0` : `1`}
      data-scroll-y={initialScroll ?? ``}
    >
      <Surface
        file={surface}
        title={title}
        swap={`update`}
        scrollY={readScroll}
        container={pid}
        typography={typography}
        display={style}
        language={language}
        label={`version`}
        parked={upto === undefined}
        requestBlob={fontLoader}
        requestEnums={fontCss}
        requestWidgetBundle={readLiveWidgetFilm}
        onMounted={setPreviewError}
        onError={(..._extraArguments: unknown[]): Dynamic =>
          setLoadState(
            (
              structuredVersionPreviewBody?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              upto === undefined
                ? structuredVersionPreviewBody
                : {
                    state: `error`,
                    upto: upto,
                    words: versionLoadErrorMessage({}),
                  },
          )
        }
      />
      {upto !== undefined && !headingLabel && (
        <div
          className={`pointer-events-none absolute inset-x-0 top-2 flex justify-center px-4`}
        >
          <div
            data-testid={`history-version-doc-note`}
            data-restore={restoreSource === null ? undefined : `1`}
            className={`bg-surface-1 text-secondary text-caption pointer-events-auto flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full border px-3 py-1 shadow-sm`}
          >
            <span
              className={`truncate`}
              data-testid={`history-version-doc-lead`}
              title={
                restoreSource === null
                  ? undefined
                  : `This version restored rev ${restoreSource.restoredFrom}${restoreSource.reverted ? ` and undid the ${restoreSource.reverted} version${restoreSource.reverted === 1 ? `` : `s`} after it` : ``} · comments hidden`
              }
            >
              {previewNote}
            </span>
            <label
              className={`flex shrink-0 items-center gap-2`}
              data-testid={`history-version-doc-changes`}
            >
              <span
                data-testid={`history-version-doc-counts`}
                title={
                  resolvedComparisonBase !== null && restoreSource !== null
                    ? compareMode === `restored`
                      ? `Compared with the version it restored`
                      : `Compared with the version before the restore`
                    : undefined
                }
              >
                {showChanges
                  ? changesStatus === ``
                    ? comparisonReady
                      ? compareMode === `restored` && restoreSource !== null
                        ? `Identical to the restored version`
                        : group === undefined
                          ? `No changes`
                          : `No net changes`
                      : comparisonBase === `none`
                        ? `No earlier version to compare with`
                        : comparisonBase === `older`
                          ? `Show older versions to compare`
                          : comparisonBase !== undefined && comparisonFailed
                            ? comparisonError
                              ? `Couldn't compare these versions`
                              : `Couldn't load the earlier version to compare`
                            : `Show changes`
                    : changesStatus
                  : `Show changes`}
              </span>
              <Switch
                size={`xs`}
                checked={showChanges}
                onCheckedChange={(
                  structuredVersionPreviewBody?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic =>
                  updatePlatformSyncAndRoutingShowChanges(
                    structuredVersionPreviewBody,
                  )
                }
                aria-label={`Show changes`}
              />
            </label>
            {canCompareRestore && restoreSource !== null && (
              <span
                className={`flex shrink-0 items-center gap-2`}
                data-testid={`history-version-doc-base`}
                title={`vs previous version: what this restore changed in the document · vs restored version: this version against ${restoreSource.sourceAt === undefined ? `rev ${restoreSource.restoredFrom}` : formatSourceDate(restoreSource.sourceAt)} (it should be identical)`}
              >
                <SegmentedControl
                  aria-label={`Compare this restore with`}
                  size={side(`xs`)}
                  value={compareMode}
                  onChange={setCompareMode}
                  segments={[
                    {
                      value: `previous`,
                      label: `vs previous version`,
                    },
                    {
                      value: `restored`,
                      label: `vs restored version (rev ${restoreSource.restoredFrom})`,
                    },
                  ]}
                />
              </span>
            )}
            {isCurrent && (
              <button
                type={`button`}
                data-testid={`history-version-doc-back-to-editing`}
                className={`text-secondary hover:text-primary shrink-0 underline decoration-dotted underline-offset-2`}
                onClick={(..._extraArguments: unknown[]): undefined => {
                  PlatformSyncAndRoutingAssign2.getState().clear();
                  if (stacked) {
                    PlatformSyncAndRoutingState4.getState().set(false);
                  }
                }}
                title={`Leave the preview and return to the live document`}
              >{`Back to editing`}</button>
            )}
          </div>
        </div>
      )}
      {upto !== undefined &&
        (snapshot === null || keepExistingPreview || showLoading) &&
        loadError === null && (
          <div
            data-testid={`history-version-doc-loading`}
            data-cover={
              snapshot === null || keepExistingPreview ? `1` : undefined
            }
            className={`absolute inset-0 ${snapshot === null || keepExistingPreview ? `bg-surface-popover dark:bg-surface-0` : `bg-alpha-0`} pointer-events-none ${showLoading ? `animate-pulse` : ``}`}
          >
            {(showLoading || noticeEnabled) && (
              <p
                role={`status`}
                className={`text-secondary text-footnote absolute inset-x-0 top-12 text-center`}
              >
                {noticeEnabled
                  ? `Still preparing this version…`
                  : `Loading this version…`}
              </p>
            )}
          </div>
        )}
      {loadError !== null && (
        <div
          data-testid={`history-version-doc-error`}
          className={`bg-surface-popover dark:bg-surface-0 absolute inset-0 flex flex-col items-center justify-center gap-3 p-6`}
        >
          <p className={`text-secondary text-body text-center`}>
            {loadError.text}
          </p>
          {loadError.retry && (
            <Button
              data-testid={`history-version-doc-retry`}
              onClick={(..._extraArguments: unknown[]): Dynamic =>
                setRetryTick(
                  (
                    structuredVersionPreviewBody?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic => structuredVersionPreviewBody + 1,
                )
              }
            >{`Try again`}</Button>
          )}
        </div>
      )}
    </div>
  );
}
function VersionDiffSurface(
  { preview: preview, fontCss: fontCss, stacked = false }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let frameRef: Dynamic = (0, React.useRef)(null);
  let { changes: changes }: Dynamic = preview;
  let changeCount: Dynamic = changes.length;
  let mode: Dynamic = usePlatformSyncAndRoutingFramed();
  let frameDocument: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): string =>
      versionDiffPreviewHtml(fontCss, preview.body, {
        firstAnchor: changes[0]?.anchor ?? null,
        mode: mode,
      }),
    [fontCss, preview.body, changes, mode],
  );
  let [activeChange, setActiveChange]: Dynamic = (0, React.useState)(-1);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => setActiveChange(-1),
    [frameDocument],
  );
  let focusChange: Dynamic = (0, React.useCallback)(
    (
      versionDiffSurface?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let changeItem: Dynamic = changes[versionDiffSurface];
      if (changeItem !== undefined) {
        setActiveChange(versionDiffSurface);
        try {
          frameRef.current?.contentWindow?.location.replace(
            `about:srcdoc#${changeItem.anchor}`,
          );
        } catch {}
      }
    },
    [changes],
  );
  let stepChange: Dynamic = (0, React.useCallback)(
    (
      versionDiffSurface?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (changeCount > 0) {
        focusChange(
          versionDiffSurface === 1
            ? (activeChange + 1) % changeCount
            : activeChange <= 0
              ? changeCount - 1
              : activeChange - 1,
        );
      }
    },
    [activeChange, changeCount, focusChange],
  );
  let hasNavigation: boolean = !preview.plain && changeCount > 0;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      hasNavigation ? resolvePlatformSyncAndRoutingStepOffers() : undefined,
    [hasNavigation],
  );
  let focusRequest: Dynamic = resolvePlatformSyncAndRoutingStepAsk();
  let commentSequenceRef: Dynamic = (0, React.useRef)(
    resolvePlatformSyncAndRoutingStepAsk2().seq,
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (focusRequest.seq !== commentSequenceRef.current) {
        commentSequenceRef.current = focusRequest.seq;
        stepChange(focusRequest.dir);
      }
    },
    [focusRequest, stepChange],
  );
  let activeChangeDetails: Dynamic =
    activeChange >= 0 ? changes[activeChange] : undefined;
  let uncheckedReadout: Dynamic = describeUncheckedDiffs(preview);
  let coverageNotice: string = [
    preview.degraded ? `Some compared by block` : ``,
    uncheckedReadout,
  ]
    .filter((item?: Dynamic, ..._extraArguments: unknown[]) => item !== ``)
    .join(` · `);
  return (
    <div className={`flex size-full flex-col`}>
      {!stacked &&
        !preview.plain &&
        (changeCount > 0 || uncheckedReadout !== ``) && (
          <div
            data-testid={`history-preview-v3-changes`}
            className={`bg-surface-1 flex shrink-0 items-center gap-2 border-b px-2 py-1`}
          >
            <span className={`text-secondary text-caption shrink-0`}>
              {changeCount === 1 ? `1 change` : `${changeCount} changes`}
              {preview.compare === `current`
                ? ` since this version`
                : ` in this version`}
              {preview.degraded ? ` · some compared by block` : ``}
            </span>
            <span
              className={`text-primary text-caption min-w-0 flex-1 truncate`}
            >
              {activeChangeDetails?.summary ?? ``}
            </span>
            {uncheckedReadout !== `` && (
              <span
                data-testid={`history-preview-v3-widget-note`}
                className={`text-secondary text-caption shrink-0`}
              >
                {uncheckedReadout}
              </span>
            )}
            {changeCount > 0 && (
              <jsxRuntime.Fragment>
                <IconButton
                  data-testid={`history-preview-v3-prev`}
                  aria-label={`Previous change`}
                  onClick={(..._extraArguments: unknown[]): Dynamic =>
                    stepChange(-1)
                  }
                  icon={
                    <UiOverlaysAndIconsCustomIcon
                      name={`CaretUp`}
                      customSize={14}
                    />
                  }
                />
                <IconButton
                  data-testid={`history-preview-v3-next`}
                  aria-label={`Next change`}
                  onClick={(..._extraArguments: unknown[]): Dynamic =>
                    stepChange(1)
                  }
                  icon={
                    <UiOverlaysAndIconsCustomIcon
                      name={`CaretDown`}
                      customSize={14}
                    />
                  }
                />
              </jsxRuntime.Fragment>
            )}
          </div>
        )}
      {stacked && !preview.plain && coverageNotice !== `` && (
        <div
          data-testid={`history-preview-v3-widget-note`}
          className={`bg-surface-1 text-secondary text-caption shrink-0 border-b px-2 py-1`}
        >
          {coverageNotice}
        </div>
      )}
      <iframe
        ref={frameRef}
        title={`Version preview`}
        data-testid={`history-preview-v3`}
        sandbox={``}
        srcDoc={frameDocument}
        className={`bg-surface-popover dark:bg-surface-0 min-h-0 w-full flex-1 border-0`}
      />
    </div>
  );
}
function PreviewNotice(
  { text: text, onRetry: onRetry }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    <div
      data-testid={`history-preview-v3-notice`}
      className={`flex h-full flex-col items-center justify-center gap-3 p-6`}
    >
      <p className={`text-secondary text-body text-center`}>{text}</p>
      {onRetry && (
        <Button
          data-testid={`history-preview-v3-retry`}
          onClick={onRetry}
        >{`Try again`}</Button>
      )}
    </div>
  );
}
function PreviewFailure(
  { flagOn: flagOn, words: words, raw: raw, onRetry: onRetry }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return flagOn ? (
    <PreviewNotice
      {...originalJsxProps({
        text: words.text,
        ...(words.retry
          ? {
              onRetry: onRetry,
            }
          : {}),
      })}
    />
  ) : (
    <div
      className={`text-danger text-footnote flex h-full items-center justify-center p-6`}
    >
      {raw}
    </div>
  );
}
function VersionPreviewPane(
  props?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return resolvePlatformSyncAndRoutingValue26() ? (
    props.upto === undefined ? null : (
      <StackedPreviewShell stacked={props.stacked}>
        <FrameVersionPreview
          pid={props.pid}
          fileId={props.fileId}
          upto={props.upto}
          stacked={props.stacked}
        />
      </StackedPreviewShell>
    )
  ) : (
    <StructuredVersionPreview
      {...originalJsxProps({
        ...props,
      })}
    />
  );
}
function FrameVersionPreview(
  { pid: pid, fileId: fileId, upto: upto, stacked = false }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let reader: Dynamic = resolvePlatformSyncAndRoutingValue24();
  let routeContext: Dynamic = resolvePlatformSyncAndRoutingValue22();
  let language: Dynamic = resolvePlatformSyncAndRoutingCompareMode();
  let showChanges: Dynamic = resolvePlatformSyncAndRoutingShowChanges();
  let previewId: Dynamic = PlatformSyncAndRoutingAssign2(
    (frameVersionPreview?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      frameVersionPreview.preview?.id,
  );
  let [slow, setSlow]: Dynamic = (0, React.useState)(false);
  let [retryTick, setRetryTick]: Dynamic = (0, React.useState)(0);
  let [result, setResult]: Dynamic = (0, React.useState)(`loading`);
  let [error, setError]: Dynamic = (0, React.useState)(``);
  (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    let enabled: boolean = true;
    collectDataModelSchemasBuf().then(
      (result2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        enabled && setError(result2),
    );
    return (..._extraArguments: unknown[]): undefined => {
      enabled = false;
    };
  }, []);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let enabled: boolean = false;
      setResult(`loading`);
      setSlow(false);
      let frameVersionPreviewResult: Dynamic = isFrameArtifact();
      let frameVersionPreviewHandler: Dynamic = (
        frameVersionPreview?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        frameVersionPreviewResult
          ? {
              html: sanitizePreviewHtml(frameVersionPreview.html),
              prevHtml:
                frameVersionPreview.prevHtml === null
                  ? null
                  : sanitizePreviewHtml(frameVersionPreview.prevHtml),
            }
          : frameVersionPreview;
      let frameVersionPreviewHandler2: Dynamic = (
        ..._extraArguments: unknown[]
      ): Dynamic =>
        loadPlatformLiveDocumentAndHistoryHtml(pid, fileId, upto)
          .then(
            (result2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              !enabled && setResult(frameVersionPreviewHandler(result2)),
          )
          .catch(
            (error2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              !enabled &&
              setResult({
                error: versionLoadErrorMessage(error2),
                raw:
                  error2 instanceof (Error as Dynamic)
                    ? error2.message
                    : String(error2),
              }),
          );
      if (reader) {
        tryDetailedDiff(
          (..._extraArguments: unknown[]): Dynamic =>
            preloadModule(
              (..._extraArguments: unknown[]): Dynamic =>
                import("./preview").then(
                  (result2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                    result2.loadV2Preview(pid, fileId, upto, {
                      compare: language,
                      showChanges: showChanges,
                    }),
                ),
              mapPreloadDependencies([0, 1, 2, 3, 4, 5, 6, 7]),
              import.meta.url,
            ),
        ).then(
          (envelope?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            if (enabled) return;
            if (`diff` in envelope) {
              publishPreviewDiffStats(envelope.diff, previewId);
              setResult({
                diff: envelope.diff,
              });
              return;
            }
            publishPreviewDiffStats(null, previewId);
            let frameVersionPreviewResult2: Dynamic = versionLoadErrorMessage(
              envelope.error,
            );
            if (frameVersionPreviewResult2.final) {
              setResult({
                error: frameVersionPreviewResult2,
                raw: ``,
              });
              return;
            }
            setSlow(true);
            frameVersionPreviewHandler2();
          },
        );
      } else {
        frameVersionPreviewHandler2();
      }
      return (..._extraArguments: unknown[]): undefined => {
        enabled = true;
      };
    },
    [pid, fileId, upto, reader, language, showChanges, previewId, retryTick],
  );
  if (result === `loading`) return <PreviewLoading />;
  if (`error` in result)
    return (
      <PreviewFailure
        flagOn={routeContext}
        words={result.error}
        raw={result.raw}
        onRetry={(..._extraArguments: unknown[]): Dynamic =>
          setRetryTick(
            (
              frameVersionPreview?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => frameVersionPreview + 1,
          )
        }
      />
    );
  if (`diff` in result)
    return (
      <VersionDiffSurface
        preview={result.diff}
        fontCss={error}
        stacked={stacked}
      />
    );
  let html: Dynamic = result.html;
  if (result.prevHtml !== null) {
    try {
      html = diffHtml(result.prevHtml, result.html);
    } catch {}
    if (isFrameArtifact()) {
      html = sanitizePreviewHtml(html);
    }
  }
  let previewHtml: string = legacyDiffPreviewHtml(error, html);
  return slow ? (
    <div className={`flex size-full flex-col`}>
      <div
        data-testid={`history-preview-v3-simpler`}
        className={`bg-surface-1 text-secondary text-caption shrink-0 border-b px-2 py-1`}
      >
        {SIMPLER_COMPARISON_MESSAGE}
      </div>
      <iframe
        title={`Version preview`}
        data-testid={`history-preview-v3`}
        sandbox={``}
        srcDoc={previewHtml}
        className={`bg-surface-popover dark:bg-surface-0 min-h-0 w-full flex-1 border-0`}
      />
    </div>
  ) : (
    <iframe
      title={`Version preview`}
      data-testid={`history-preview-v3`}
      sandbox={``}
      srcDoc={previewHtml}
      className={`bg-surface-popover dark:bg-surface-0 size-full border-0`}
    />
  );
}
function PreviewLoading(
  ..._extraArguments: [Readonly<Record<string, unknown>>?, ...unknown[]]
): Dynamic {
  return resolvePlatformSyncAndRoutingPreparing() ? (
    <div className={`relative h-full`}>
      <div className={`bg-alpha-0 h-full animate-pulse`} />
      <p
        role={`status`}
        className={`text-secondary text-footnote absolute inset-x-0 top-6 text-center`}
      >{`Still preparing this version…`}</p>
    </div>
  ) : (
    <div className={`bg-alpha-0 h-full animate-pulse`} />
  );
}
export { PreviewLoading, VersionPreviewPane as default };
export { VersionPreviewPane };
