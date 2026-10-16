import type { ButtonHTMLAttributes } from "react";
import { Fragment } from "react";
import {
  Button,
  Link,
  Popover,
  resolveDataContentAndReferencesReplace2,
  resolveObservabilityBrowserAndOperationEventsToFixed,
  resolvePlatformApiAndAuthUseContext2,
  resolvePlatformApiAndAuthValue,
  resolvePlatformSessionAndSourcesWeekday,
  resolvePlatformSyncAndRoutingCompact,
  runFilePath,
  Tooltip,
  UiOverlaysAndIconsCustomIcon,
} from "../../dependencies";
import { resolveDocumentPreviewValue3 } from "../../document-preview/roomview-frame-toolbar";
import { UseDocumentPreviewStatusComponent } from "../../document-preview/use-page-skill-seat";
import type { RoutineRun, VisualizeRoutine } from "../project-contracts";
import {
  applicationRoutesSet,
  ApplicationRoutesStaged,
} from "../routes-filmed-prose-page";
interface DisplayClock {
  now(): string;
  locale: string;
  timeZone: string;
}
function RoutineHistoryButton({
  runs,
  routineId,
  label,
  onVisualize,
}: {
  runs?: readonly RoutineRun[];
  routineId?: string;
  label?: string;
  onVisualize?: VisualizeRoutine;
}) {
  const controlSize: (size: "sm") => string = resolvePlatformSyncAndRoutingCompact();
  return (
    <Popover.Root>
      <Popover.Trigger
        render={(routineHistoryIcon: ButtonHTMLAttributes<HTMLButtonElement>) => (
          <Tooltip content={`Run history`}>
            <button
              {...routineHistoryIcon}
              type={`button`}
              aria-label={`Run history`}
              data-testid={`routine-history-icon`}
              className={`text-muted hover:text-primary hover:bg-alpha-1 mt-2 flex size-6 shrink-0 items-center justify-center rounded`}
            >
              <UiOverlaysAndIconsCustomIcon name={`History`} customSize={14} />
            </button>
          </Tooltip>
        )}
      />
      <Popover.Popup align={`end`} className={`w-96 !max-w-none`}>
        <div className={`mb-1 flex items-center`}>
          <span
            className={`text-secondary text-caption font-medium`}
          >{`Run history`}</span>
          {routineId !== undefined && onVisualize !== undefined && (
            <Fragment>
              <span className={`flex-1`} />
              <Tooltip
                content={`Build a live chart of this routine's results — a widget build starts in a tab and you watch it work.`}
                side={`bottom`}
                multiline={true}
              >
                <Button
                  variant={`ghost`}
                  size={controlSize(`sm`)}
                  data-testid={`routine-chart-results`}
                  onClick={() =>
                    onVisualize(resolveDocumentPreviewValue3(routineId, label))
                  }
                >
                  <UiOverlaysAndIconsCustomIcon name={`Chart`} customSize={12} />
                  {` Chart results`}
                </Button>
              </Tooltip>
            </Fragment>
          )}
        </div>
        <div className={`max-h-72 overflow-y-auto`}>
          <RoutineRunHistory runs={runs} />
        </div>
      </Popover.Popup>
    </Popover.Root>
  );
}
function RoutineRunHistory({ runs }: { runs?: readonly RoutineRun[] }) {
  const clock: DisplayClock = resolvePlatformApiAndAuthUseContext2();
  const nowMs = Date.parse(clock.now());
  const formatTime = (routineRuns: string) =>
    resolvePlatformSessionAndSourcesWeekday(
      routineRuns,
      nowMs,
      clock.locale,
      clock.timeZone,
    );
  const completedRuns = (runs ?? []).filter(
    (response) => !applicationRoutesSet.has(response.status),
  );
  return runs === undefined ? (
    <div className={`text-muted text-caption`}>{`Loading…`}</div>
  ) : completedRuns.length === 0 ? (
    <div
      className={`text-muted text-caption`}
      data-testid={`routine-runs-empty`}
    >{`No runs yet.`}</div>
  ) : (
    <div data-testid={`routine-run-history`}>
      {completedRuns.map((response) => (
        <div data-testid={`routine-run-row`} className={`py-1`} key={response.id}>
          <div className={`flex items-center gap-2`}>
            <UseDocumentPreviewStatusComponent
              status={
                response.status === `error`
                  ? `error`
                  : response.status === `cancelled`
                    ? `warning`
                    : `ok`
              }
            />
            {response.startedAt !== `` && (
              <span className={`text-secondary text-caption shrink-0`}>
                {formatTime(response.startedAt)}
              </span>
            )}
            <span className={`text-muted text-caption shrink-0`}>
              {ApplicationRoutesStaged[response.status] ?? response.status}
              {response.settledAt !== `` && response.status !== `error`
                ? ` ${formatTime(response.settledAt)}`
                : ``}
            </span>
            {(response.error || response.summary) && (
              <span
                className={`text-caption min-w-0 flex-1 truncate ${response.error === undefined ? `text-secondary` : `text-danger`}`}
              >
                {resolveDataContentAndReferencesReplace2(
                  response.error ?? response.summary ?? ``,
                )}
              </span>
            )}
          </div>
          {response.outputs !== undefined && response.outputs.length > 0 && (
            <div
              data-testid={`routine-run-outputs`}
              className={`text-caption mt-0.5 ml-4 flex min-w-0 flex-wrap items-baseline gap-x-2`}
            >
              <span className={`text-muted shrink-0`}>{`Outputs:`}</span>
              {response.outputs.map((entry) =>
                entry.kind === `file` ? (
                  <Link
                    href={resolvePlatformApiAndAuthValue(
                      runFilePath(response.id, entry.name),
                    )}
                    download={entry.name}
                    className={`max-w-full truncate`}
                    key={entry.name}
                  >
                    {resolveDataContentAndReferencesReplace2(entry.name)}
                    {` (`}
                    {resolveObservabilityBrowserAndOperationEventsToFixed(entry.bytes)}
                    {`)`}
                  </Link>
                ) : (
                  <span className={`text-secondary max-w-full truncate`} key={entry.name}>
                    {resolveDataContentAndReferencesReplace2(entry.name)}
                    {` (`}
                    {resolveObservabilityBrowserAndOperationEventsToFixed(entry.bytes)}
                    {`)`}
                  </span>
                ),
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
export { RoutineHistoryButton, RoutineRunHistory };
