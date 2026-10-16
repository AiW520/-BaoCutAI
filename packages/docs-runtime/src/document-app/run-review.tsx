/** BaoCut: run review from index-CX4IZqzA.js. */
import type { RunSource } from "../interop/recovered-contracts";
import type { DocumentFonts, DisplayRecord } from "./contracts";
import type { Dynamic } from "../interop/legacy-dynamic";
import {
  Button,
  Checkbox,
  TextArea,
  Tooltip,
  UiDialogsRoot,
  UiOverlaysAndIconsCustomIcon,
  apiFetcher,
  collectDataContentAndReferencesWEEKLY,
  createLiveModuleNamespace as lastTextblock,
  resolveCommentsStoreValue29,
  resolveCommentsStoreValue32,
  resolveDataContentAndReferencesReplace,
  resolveDataContentAndReferencesReplace2,
  resolveDataContentAndReferencesRule,
  resolvePlatformSessionAndSourcesToUpperCase,
  resolvePlatformSyncAndRoutingCompact,
  resolvePlatformSyncAndRoutingFeedback,
  resolvePlatformSyncAndRoutingScheduled,
  resolvePlatformSyncAndRoutingScheduled2,
  resolvePlatformSyncAndRoutingValue20,
  toast,
  useCommentsStoreUseSyncExternalStore,
} from "./dependencies";
import {
  React,
  jsxRuntime,
} from "./bootstrap";
import {
  openDebugReportDialog,
} from "./document-recovery";
import {
  asManifestObject,
} from "./connection-pages";
import type * as ReactComponentTypes from "react";

export const DeclaredOutputsLine: ReactComponentTypes.FC<Dynamic> = ({
  outputs: outputs,
}) => {
  if (outputs.length === 0) return null;
  let lookup: Dynamic = new (Map as Dynamic)();
  let enabled = true;
  return (
    <p className={`text-footnote`} data-testid={`review-routine-outputs`}>
      <span className={`font-medium`}>{`Declared outputs:`}</span>
      {` `}
      {outputs.map((item?: Dynamic, ..._extraArguments: unknown[]) => {
        let lookupEntry: Dynamic = lookup.get(item) ?? 0;
        lookup.set(item, lookupEntry + 1);
        let enabled2 = !enabled;
        enabled = false;
        return (
          <span key={`${item}#${lookupEntry}`}>
            {enabled2 && <span className={`text-secondary`}>{` · `}</span>}
            {
              <span
                className={`whitespace-pre-wrap`}
                data-testid={`review-output-target`}
              >
                {resolveDataContentAndReferencesReplace(
                  resolvePlatformSessionAndSourcesToUpperCase(item),
                )}
              </span>
            }
          </span>
        );
      })}
    </p>
  );
};

export const ApproveReviewDialog: ReactComponentTypes.FC<Dynamic> = ({
  review: review,
  busy: busy,
  onClose: onClose,
  onApprove: onApprove,
  portalClassName: portalClassName,
}) => {
  let source: Dynamic =
    review === null ? null : (review.source ?? runSourceOf(review.pinnedPlane));
  return (
    <UiDialogsRoot.Root
      open={review !== null}
      onOpenChange={(
        approveReviewDialog?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (!approveReviewDialog && !busy) {
          onClose();
        }
      }}
    >
      <UiDialogsRoot.Popup size={`lg`} portalClassName={portalClassName}>
        <UiDialogsRoot.Header
          showClose={true}
        >{`Approve staged run`}</UiDialogsRoot.Header>
        {review !== null && (
          <div className={`flex flex-col gap-2`}>
            <div className={`text-secondary text-xs`}>
              <span className={`text-code`}>{review.runId}</span>
              {` · `}
              {resolveDataContentAndReferencesReplace2(review.homeLabel)}
              {review.trigger != null && review.trigger !== review.kind
                ? ` · ${review.trigger}`
                : ``}
              {review.kind == null ? `` : ` · ${review.kind}`}
              {` · staged by `}
              {review.provenance === undefined ? (
                review.user
              ) : (
                <span
                  title={
                    resolvePlatformSyncAndRoutingScheduled2(review.provenance) ||
                    undefined
                  }
                >
                  {resolvePlatformSyncAndRoutingScheduled(review.provenance)}
                </span>
              )}
            </div>
            {source !== null && <RunSourceChip source={source} />}
            <p
              className={`text-secondary text-xs`}
            >{`Approving queues this run to execute. The review pin covers exactly the run content shown below; if the run changes before you approve, the approval is refused.`}</p>
            {review.routine != null && (
              <jsxRuntime.Fragment>
                {review.routine.parameters === undefined ? (
                  <p
                    className={`text-xs font-medium`}
                  >{`This is a routine run: approving it runs it — and when the run's arguments match the routine's own, it also arms the routine's standing consent, so future runs start without review until the routine is edited.`}</p>
                ) : (
                  <p
                    className={`text-xs font-medium`}
                    data-testid={`review-consent-declared`}
                  >
                    {`This is a run of a routine that declares parameters. Approving it runs it — and when the run's arguments are valid for the declared parameters (shown below), it also arms the routine's standing consent for the whole declared surface: future runs with `}
                    <em>{`any`}</em>
                    {` arguments valid for the declaration start without review, until the routine is edited.`}
                  </p>
                )}
                {review.routine.schedule !== undefined &&
                  (resolveDataContentAndReferencesRule(review.routine.schedule) ===
                  null ? (
                    <p
                      className={`text-secondary text-xs`}
                      data-testid={`review-routine-schedule`}
                    >
                      {`Schedule: `}
                      {review.routine.schedule}
                    </p>
                  ) : (
                    <p
                      className={`text-secondary text-xs`}
                      data-testid={`review-routine-schedule`}
                    >
                      {`Schedule: `}
                      {collectDataContentAndReferencesWEEKLY(
                        review.routine.schedule,
                        `UTC`,
                      )}
                      {` — when this approve arms the routine's standing consent, it fires unattended on this schedule.`}
                    </p>
                  ))}
                {review.routine.source != null && (
                  <span data-testid={`review-routine-source`}>
                    <RunSourceChip source={review.routine.source} action={`defined`} />
                  </span>
                )}
                {review.routine.connector !== undefined &&
                  (review.routine.connector.identityHash === null ? (
                    <p
                      className={`text-danger text-xs`}
                      data-testid={`review-routine-connector`}
                    >
                      {`The connector this routine calls (`}
                      <span className={`whitespace-pre-wrap`}>
                        {resolveDataContentAndReferencesReplace(
                          resolvePlatformSessionAndSourcesToUpperCase(
                            review.routine.connector.ref,
                          ),
                        )}
                      </span>
                      {`) couldn't be resolved on your account, or can't be displayed faithfully for review — connect it on claude.ai (or fix its registration) to review and approve. Approving is disabled: you can't delegate to a connector you can't see.`}
                    </p>
                  ) : (
                    <p
                      className={`text-secondary text-xs`}
                      data-testid={`review-routine-connector`}
                    >
                      {`Calls connector:`}
                      {` `}
                      <span className={`whitespace-pre-wrap`}>
                        {resolveDataContentAndReferencesReplace(
                          resolvePlatformSessionAndSourcesToUpperCase(
                            review.routine.connector.name !== null &&
                              review.routine.connector.name !== ``
                              ? review.routine.connector.name
                              : review.routine.connector.ref,
                          ),
                        )}
                      </span>
                      {review.routine.connector.url !== null &&
                        review.routine.connector.url !== `` && (
                          <span
                            className={`block`}
                            data-testid={`review-connector-endpoint`}
                          >
                            {`Endpoint: `}
                            <span className={`text-code whitespace-pre-wrap`}>
                              {resolveDataContentAndReferencesReplace(
                                resolvePlatformSessionAndSourcesToUpperCase(
                                  review.routine.connector.url,
                                ),
                              )}
                            </span>
                          </span>
                        )}
                      <span className={`block`}>
                        {`Approving binds this exact connector registration; if it is re-registered, moved, or reclassified, fires refuse until you re-approve.`}
                        {review.routine.connector.curated !== undefined &&
                          (review.routine.connector.curated === null ? (
                            <span
                              data-testid={`review-connector-regime`}
                            >{` This is a custom MCP with no curated walls — fires are bounded to exactly the tool and defaults shown here, on your token.`}</span>
                          ) : (
                            <span data-testid={`review-connector-regime`}>
                              {` Fires answer the read-only curated walls for '`}
                              {review.routine.connector.curated}
                              {`'.`}
                            </span>
                          ))}
                      </span>
                    </p>
                  ))}
              </jsxRuntime.Fragment>
            )}
            {review.routine?.outputs !== undefined &&
              review.routine.outputs.length > 0 && (
                <DeclaredOutputsLine outputs={review.routine.outputs} />
              )}
            {review.routine?.runnable !== undefined && (
              <div
                className={`flex flex-col gap-1`}
                data-testid={`review-routine-preview`}
              >
                <div className={`text-secondary text-xs`}>
                  {`The routine this run fires — `}
                  {review.routine.name ?? review.routine.id}
                  {` · `}
                  {review.routine.runnable.kind}
                  {`:`}
                </div>
                <pre
                  className={`bg-alpha-1 max-h-40 overflow-auto rounded p-2 font-mono text-xs whitespace-pre-wrap`}
                >
                  {review.routine.runnable.preview}
                </pre>
              </div>
            )}
            {review.routine?.parameters !== undefined && (
              <div
                className={`flex flex-col gap-1`}
                data-testid={`review-routine-parameters`}
              >
                <div
                  className={`text-secondary text-xs`}
                >{`Declared parameters (approval covers all valid arguments):`}</div>
                <pre
                  className={`bg-alpha-1 max-h-40 overflow-auto rounded p-2 font-mono text-xs whitespace-pre-wrap`}
                >
                  {resolveDataContentAndReferencesReplace2(review.routine.parameters)}
                </pre>
              </div>
            )}
            {review.routine != null && review.pinnedPlane?.params !== undefined && (
              <div className={`flex flex-col gap-1`} data-testid={`review-run-params`}>
                <div
                  className={`text-secondary text-xs`}
                >{`Parameters this run carries:`}</div>
                <pre
                  className={`bg-alpha-1 max-h-40 overflow-auto rounded p-2 font-mono text-xs whitespace-pre-wrap`}
                >
                  {resolveDataContentAndReferencesReplace2(
                    JSON.stringify(review.pinnedPlane.params, null, 2),
                  )}
                </pre>
              </div>
            )}
            {review.pinnedPlane === undefined ? (
              <p
                className={`text-danger text-xs`}
              >{`This row was served without its reviewable content (older server) — reload the page to review before approving.`}</p>
            ) : (
              <jsxRuntime.Fragment>
                <div
                  className={`text-secondary text-xs`}
                >{`Run content (what the pin attests):`}</div>
                <pre
                  className={`bg-alpha-1 max-h-80 overflow-auto rounded p-2 font-mono text-xs whitespace-pre-wrap`}
                >
                  {resolveDataContentAndReferencesReplace2(
                    JSON.stringify(review.pinnedPlane, null, 2),
                  )}
                </pre>
              </jsxRuntime.Fragment>
            )}
          </div>
        )}
        <UiDialogsRoot.Footer align={`end`}>
          <UiDialogsRoot.Close render={<Button disabled={busy}>{`Cancel`}</Button>} />
          <Button
            variant={`primary`}
            busy={busy}
            disabled={
              review === null ||
              review.pinnedPlane === undefined ||
              (review.routine?.connector !== undefined &&
                review.routine.connector.identityHash === null)
            }
            onClick={(..._extraArguments: unknown[]): Dynamic =>
              review !== null && onApprove(review)
            }
          >{`Approve`}</Button>
        </UiDialogsRoot.Footer>
      </UiDialogsRoot.Popup>
    </UiDialogsRoot.Root>
  );
};

export const SupportReportDialog: ReactComponentTypes.FC<Dynamic> = ({
  open: open,
  onOpenChange: onOpenChange,
  source: source,
  container: container,
}) => {
  let initialFocus: Dynamic = (0, React.useRef)(null);
  let [labelState, setLabelState]: Dynamic = (0, React.useState)(``);
  let [includePageUrl, setIncludePageUrl]: Dynamic = (0, React.useState)(true);
  let [disabled, setDisabled]: Dynamic = (0, React.useState)(false);
  let [supportReportDialogState, setSupportReportDialogState]: Dynamic = (0,
  React.useState)(null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (!open) {
        setLabelState(``);
        setIncludePageUrl(true);
        setDisabled(false);
        setSupportReportDialogState(null);
      }
    },
    [open],
  );
  let matchesTrimmedLabelStateCount = labelState.trim().length > 0;
  let success = async (..._extraArguments: unknown[]): Promise<undefined> => {
    setDisabled(true);
    setSupportReportDialogState(null);
    try {
      await resolvePlatformSyncAndRoutingFeedback({
        text: labelState.trim(),
        source: source,
        include_page_url: includePageUrl,
        container: container,
      });
      onOpenChange(false);
      toast.success(
        <span>
          {`Posted to`}
          {` `}
          <a
            href={SUPPORT_SLACK_URL}
            target={`_blank`}
            rel={`noreferrer`}
            className={`underline underline-offset-2`}
          >{`#bongo-feedback`}</a>
        </span>,
      );
    } catch (error: Dynamic) {
      setSupportReportDialogState(error instanceof Error ? error.message : String(error));
    } finally {
      setDisabled(false);
    }
  };
  return (
    <UiDialogsRoot.Root
      open={open}
      onOpenChange={(
        supportReportDialog?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => !disabled && onOpenChange(supportReportDialog)}
    >
      <UiDialogsRoot.Popup size={`md`} initialFocus={initialFocus}>
        <UiDialogsRoot.Header showClose={true}>{`Send feedback`}</UiDialogsRoot.Header>
        <div className={`flex flex-col gap-3`}>
          <TextArea
            ref={initialFocus}
            aria-label={`Feedback`}
            placeholder={`What's working, what's not?`}
            rows={5}
            maxLength={4e3}
            value={labelState}
            onChange={(event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
              setLabelState(event.target.value);
              if (supportReportDialogState) {
                setSupportReportDialogState(null);
              }
            }}
          />
          <Checkbox
            label={`Include a link to this page`}
            checked={includePageUrl}
            onCheckedChange={(
              supportReportDialog?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => setIncludePageUrl(supportReportDialog === true)}
          />
          {supportReportDialogState && (
            <p className={`text-danger text-sm`}>
              {`Couldn't send feedback. `}
              {supportReportDialogState}
            </p>
          )}
        </div>
        <UiDialogsRoot.Footer align={`end`}>
          <UiDialogsRoot.Close render={<Button disabled={disabled}>{`Cancel`}</Button>} />
          <Button
            variant={`primary`}
            busy={disabled}
            disabled={!matchesTrimmedLabelStateCount || disabled}
            onClick={(..._extraArguments: unknown[]): undefined => void success()}
          >{`Send`}</Button>
        </UiDialogsRoot.Footer>
      </UiDialogsRoot.Popup>
    </UiDialogsRoot.Root>
  );
};

export const RunSourceChip: ReactComponentTypes.FC<Dynamic> = ({
  source: source,
  action: action,
}) => {
  let runSourceSurface: Dynamic = formatRunSourceSurface(source.surface);
  let label = action === undefined ? `from` : `${action} from`;
  return (
    <span
      data-testid={`run-source-chip`}
      title={sanitizeChipTitle(source.id)}
      className={`bg-alpha-1 text-secondary text-caption inline-flex w-fit shrink-0 items-center gap-1 rounded px-1.5 py-0.5`}
    >
      {source.attested
        ? `${label} ${runSourceSurface} ✓`
        : action === undefined
          ? `reported from ${runSourceSurface}`
          : `reportedly ${label} ${runSourceSurface}`}
    </span>
  );
};

export const DebugReportFloatingButton: ReactComponentTypes.FC<
  Readonly<Record<string, unknown>>
> = () => {
  let debugReportFloatingButtonResult: Dynamic = useCommentsStoreUseSyncExternalStore();
  let debugReportFloatingButtonResult2: Dynamic = resolvePlatformSyncAndRoutingValue20();
  let debugReportFloatingButtonResult3: Dynamic =
    debugReportFloatingButtonResult && !debugReportFloatingButtonResult2;
  let useDebugReportContext2: Dynamic = useDebugReportContext(
    debugReportFloatingButtonResult3,
  );
  return !debugReportFloatingButtonResult3 || !useDebugReportContext2 ? null : (
    <div
      className={`fixed right-3 bottom-3 z-30 print:hidden`}
      data-testid={`debug-bug-fab`}
    >
      <Tooltip content={COPY_DEBUG_REPORT_LABEL} side={`left`}>
        <IconButton
          data-testid={`debug-bug-fab-button`}
          aria-label={COPY_DEBUG_REPORT_LABEL}
          variant={`default`}
          size={28}
          icon={<UiOverlaysAndIconsCustomIcon customIcon={BUG_ICON} size={`sm`} />}
          className={DEBUG_BUTTON_REVEAL_CLASS}
          onClick={openDebugReportDialog}
        />
      </Tooltip>
    </div>
  );
};

function detectDoorDialect(
  detectDoorDialect2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let asManifestObject2: Dynamic = asManifestObject(
    asManifestObject(detectDoorDialect2).door,
  );
  return asManifestObject2.dialect === `final` ||
    (asManifestObject2.dialect === undefined &&
      asManifestObject2.envelope !== undefined &&
      asManifestObject2.envelope !== null)
    ? `final`
    : `legacy`;
}

var doorDialectRequest: Dynamic;

var cachedDoorDialect: Dynamic;

function loadDoorDialect(
  doorDialect: Dynamic = apiFetcher,
  ..._extraArguments: unknown[]
): Dynamic {
  doorDialectRequest ??= doorDialect(`/api/v3/manifest`, {
    method: `GET`,
  })
    .then(async (response?: Dynamic, ..._extraArguments: unknown[]) =>
      response.ok ? detectDoorDialect(await response.json()) : undefined,
    )
    .then(
      (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        (cachedDoorDialect ??= result),
    )
    .catch((..._extraArguments: unknown[]): undefined => undefined);
  return doorDialectRequest;
}

function getDoorDialect(
  doorDialect: Dynamic = apiFetcher,
  ..._extraArguments: unknown[]
): Dynamic {
  if (cachedDoorDialect === undefined) {
    loadDoorDialect(doorDialect);
  }
  return cachedDoorDialect;
}

function setDoorDialect(
  doorDialect?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  cachedDoorDialect = doorDialect;
}

var runReviewModule: Dynamic;

var RUN_SOURCE_SURFACE_NAMES: Dynamic;

var formatRunSourceSurface: Dynamic;

function runSourceOf(
  runSource?: unknown,
  ..._extraArguments: unknown[]
): RunSource | null {
  let source = (runSource as { source?: unknown } | null | undefined)?.source;
  if (typeof source != `object` || !source || Array.isArray(source))
    return null;
  let source2: Record<string, unknown> = source as Record<string, unknown>;
  return typeof source2.surface != `string` ||
    typeof source2.id != `string` ||
    typeof source2.attested != `boolean`
    ? null
    : {
        surface: source2.surface,
        id: source2.id,
        attested: source2.attested,
      };
}

var sanitizeChipTitle: Dynamic;

var IconButtonBase: Dynamic;

var iconButtonSize: (iconButtonSize2?: Dynamic, ..._extraArguments: unknown[]) => "sm" | "xs" | undefined;

var IconButton: Dynamic;

var UntippedIconButton: Dynamic;

var COPY_DEBUG_REPORT_LABEL: string;

var BUG_ICON: {
    name: string;
    viewBox: number;
    paths: {
        d: string;
        strokeWidth: number;
    }[];
};

var DEBUG_BUTTON_REVEAL_CLASS: string;

var hasDebugReportContext: Dynamic;

function useDebugReportContext(
  debugReportContext?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [hasDebugReportContextState, setHasDebugReportContextState]: Dynamic = (0,
  React.useState)(hasDebugReportContext);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!debugReportContext || hasDebugReportContextState) return;
      if (hasDebugReportContext()) {
        setHasDebugReportContextState(true);
        return;
      }
      let setInterval2 = window.setInterval(
        (..._extraArguments: unknown[]): undefined => {
          if (hasDebugReportContext()) {
            window.clearInterval(setInterval2);
            setHasDebugReportContextState(true);
          }
        },
        1e3,
      );
      return (..._extraArguments: unknown[]) =>
        window.clearInterval(setInterval2);
    },
    [debugReportContext, hasDebugReportContextState],
  );
  return hasDebugReportContextState || hasDebugReportContext();
}

var SUPPORT_SLACK_URL: string;

var DOC_FONTS_FEATURE: string;

var DISPLAY_PROPERTY: "display";

var HEADING_FONT_PROPERTY: "headingFont";

var TEXT_FONT_PROPERTY: "textFont";

var DEFAULT_DOCUMENT_FONTS: DocumentFonts;

var isFontSettingsObject: (fontSettingsObject: unknown) => fontSettingsObject is DisplayRecord;

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeRunReviewStep1(): void {
  (runReviewModule = lastTextblock({
    ApproveReviewDialog: (..._extraArguments: unknown[]): Dynamic =>
      ApproveReviewDialog,
    DeclaredOutputsLine: (..._extraArguments: unknown[]): Dynamic =>
      DeclaredOutputsLine,
    RunSourceChip: (..._extraArguments: unknown[]): Dynamic => RunSourceChip,
    runSourceOf: (..._extraArguments: unknown[]): Dynamic => runSourceOf,
    sanitizeChipTitle: (..._extraArguments: unknown[]): Dynamic =>
      sanitizeChipTitle,
  }));
  (RUN_SOURCE_SURFACE_NAMES = {
    slack: `Slack`,
    "claude-ai": `Claude.ai`,
    "claude-code": `Claude Code`,
  });
  (formatRunSourceSurface = (
    runSourceSurface?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let RUNSOURCESURFACENAMESItem: Dynamic = Object.hasOwn(
      RUN_SOURCE_SURFACE_NAMES,
      runSourceSurface,
    )
      ? RUN_SOURCE_SURFACE_NAMES[runSourceSurface]
      : undefined;
    if (RUNSOURCESURFACENAMESItem !== undefined) return RUNSOURCESURFACENAMESItem;
    let replace: Dynamic = runSourceSurface
      .toLowerCase()
      .replace(/[^a-z0-9._-]/g, ``);
    return replace.length > 0 ? replace : `unknown surface`;
  });
  (sanitizeChipTitle = (
    sanitizeChipTitle2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    sanitizeChipTitle2.replace(
      /[\u2611\u2705\u2713\u2714\u200B-\u200D\u2060\uFEFF\u202A-\u202E\u2066-\u2069\u0000-\u001F\u007F]/g,
      ``,
    ));
  (IconButtonBase = Button);
  (iconButtonSize = (
    iconButtonSize2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => (iconButtonSize2 <= 22 ? `xs` : iconButtonSize2 <= 29 ? `sm` : undefined));
  (IconButton = (0, React.forwardRef)(function (
    {
      icon: icon,
      size = 26,
      variant = `ghost`,
      title: title,
      "aria-label": ariaLabel,
      ...iconButton
    }: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) {
    let iconButtonResult: Dynamic = resolvePlatformSyncAndRoutingCompact();
    let iconButtonSize2 = iconButtonSize(size);
    return (
      <IconButtonBase
        {...iconButton}
        ref={options}
        iconOnly={true}
        icon={icon}
        variant={variant === "default" ? `secondary` : `ghost`}
        size={iconButtonSize2 && iconButtonResult(iconButtonSize2)}
        aria-label={ariaLabel ?? title ?? ``}
        tooltip={false}
      />
    );
  }));
  (UntippedIconButton = (0, React.forwardRef)(function (
    {
      icon: icon,
      size = 26,
      title: title,
      "aria-label": ariaLabel,
      ...untippedIconButton
    }: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) {
    let untippedIconButtonResult: Dynamic =
      resolvePlatformSyncAndRoutingCompact();
    let iconButtonSize2 = iconButtonSize(size);
    return (
      <IconButtonBase
        {...untippedIconButton}
        ref={options}
        iconOnly={true}
        icon={icon}
        variant={`ghost`}
        size={iconButtonSize2 && untippedIconButtonResult(iconButtonSize2)}
        aria-label={ariaLabel ?? title ?? ``}
        tooltip={false}
      />
    );
  }));
  (COPY_DEBUG_REPORT_LABEL = `Copy debug report`);
  (BUG_ICON = {
    name: `Bug`,
    viewBox: 16,
    paths: [
      {
        d: `M8 5.5C9.933 5.5 11.5 7.291 11.5 9.5C11.5 11.709 9.933 13.5 8 13.5C6.067 13.5 4.5 11.709 4.5 9.5C4.5 7.291 6.067 5.5 8 5.5Z`,
        strokeWidth: 1,
      },
      {
        d: `M8 5.5V13.5`,
        strokeWidth: 1,
      },
      {
        d: `M6.5 5.5C6.5 4.672 7.172 4 8 4C8.828 4 9.5 4.672 9.5 5.5M7 4L6 2.5M9 4L10 2.5`,
        strokeWidth: 1,
      },
      {
        d: `M4.5 8L2.5 7M4.5 10H2.5M4.8 12L3 13.5M11.5 8L13.5 7M11.5 10H13.5M11.2 12L13 13.5`,
        strokeWidth: 1,
      },
    ],
  });
  (DEBUG_BUTTON_REVEAL_CLASS = `opacity-0 transition-opacity hover:opacity-100 focus-visible:opacity-100 data-[popup-open]:opacity-100 [@media(hover:none)]:opacity-35`);
  (hasDebugReportContext = (..._extraArguments: unknown[]) =>
    resolveCommentsStoreValue29() > 0 ||
    resolveCommentsStoreValue32().pid !== undefined);
  (SUPPORT_SLACK_URL = `https://anthropic.enterprise.slack.com/archives/C0ARHF9LW8M`);
  (DOC_FONTS_FEATURE = `docFonts`);
  (DISPLAY_PROPERTY = `display`);
  (HEADING_FONT_PROPERTY = `headingFont`);
  (TEXT_FONT_PROPERTY = `textFont`);
  (DEFAULT_DOCUMENT_FONTS = Object.freeze({
    headings: `serif`,
    text: `sans`,
  }));
  (isFontSettingsObject = (
    fontSettingsObject: unknown,
  ): fontSettingsObject is DisplayRecord =>
    typeof fontSettingsObject == `object` &&
    !!fontSettingsObject &&
    !Array.isArray(fontSettingsObject));
}

export { BUG_ICON, DEFAULT_DOCUMENT_FONTS, DISPLAY_PROPERTY, DOC_FONTS_FEATURE, HEADING_FONT_PROPERTY, IconButton, SUPPORT_SLACK_URL, TEXT_FONT_PROPERTY, UntippedIconButton, getDoorDialect, isFontSettingsObject, runReviewModule, runSourceOf, setDoorDialect };
