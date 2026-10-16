import {
  resolvePlatformApiAndAuthUseContext2,
  resolvePlatformSessionAndSourcesWeekday,
} from "../../dependencies";
import { UseDocumentPreviewStatusComponent } from "../../document-preview/use-page-skill-seat";
import type { RoutineRun } from "../project-contracts";
import { ApplicationRoutesStaged } from "../routes-filmed-prose-page";
import type * as React from "react";

export const RoutineRunActivity: React.FC<{ runs?: readonly RoutineRun[] }> = ({
  runs,
}) => {
  const clock: DisplayClock = resolvePlatformApiAndAuthUseContext2();
  if (runs === undefined) return null;
  const nowMs = Date.parse(clock.now());
  const formatTime = (routineRunActivity: string) =>
    resolvePlatformSessionAndSourcesWeekday(
      routineRunActivity,
      nowMs,
      clock.locale,
      clock.timeZone,
    );
  const inflightRuns = runs.filter(
    (response) => response.status === `pending` || response.status === `running`,
  );
  return inflightRuns.length === 0 ? null : (
    <div
      data-testid={`routine-run-activity`}
      className={`border-strong shrink-0 border-b`}
    >
      <div className={`mx-auto w-full max-w-[720px] px-4 py-3`}>
        <div className={`flex flex-col gap-1.5`} data-testid={`routine-runs-inflight`}>
          {inflightRuns.map((response) => (
            <div
              data-testid={`routine-run-inflight-${response.status}`}
              key={response.id}
            >
              <div className={`flex items-center gap-2`}>
                <UseDocumentPreviewStatusComponent
                  running={response.status === `running`}
                />
                <span className={`text-primary text-footnote font-medium`}>
                  {ApplicationRoutesStaged[response.status] ?? response.status}
                </span>
                {response.startedAt !== `` && (
                  <span className={`text-secondary text-caption`}>
                    {`started `}
                    {formatTime(response.startedAt)}
                  </span>
                )}
              </div>
              {response.status === `running` &&
                response.progress !== undefined &&
                response.progress.length > 0 && (
                  <div
                    className={`mt-1 ml-4 flex flex-col gap-0.5`}
                    data-testid={`routine-run-progress`}
                  >
                    {response.progress.map((progress, index, items) => (
                      <div
                        className={`text-caption ${index === items.length - 1 ? `text-secondary` : `text-muted`}`}
                        key={`${progress}#${String(items.slice(0, index).filter((itemsSlice) => itemsSlice === progress).length)}`}
                      >
                        {progress}
                      </div>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface DisplayClock {
  now(): string;
  locale: string;
  timeZone: string;
}
