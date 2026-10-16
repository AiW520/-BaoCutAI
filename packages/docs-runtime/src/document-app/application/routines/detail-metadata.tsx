import { Fragment } from "react";
import {
  Tooltip,
  UiOverlaysAndIconsCustomIcon,
  collectDataContentAndReferencesWEEKLY,
  resolveDataContentAndReferencesReplace2,
  resolvePlatformSessionAndSourcesReplace,
  resolvePlatformSessionAndSourcesWeekday,
} from "../../dependencies";
import type { RoutineRow, RoutineRun } from "../project-contracts";
import { RoutineInflightChip } from "../routes-filmed-prose-page";
import type * as React from "react";

export const RoutineDetailMetadata: React.FC<{
  row: RoutineRow;
  run?: RoutineRun;
  endedAt: string;
  nowMs: number;
  filteredRefs: readonly string[];
  onSelectRoutine: (name: string) => void;
}> = ({ row, run, endedAt, nowMs, filteredRefs, onSelectRoutine }) => {
  return (
    <div className={`mt-4 grid grid-cols-[auto_1fr] items-baseline gap-x-8 gap-y-2.5`}>
      <span className={`text-muted text-footnote`}>{`Last ran`}</span>
      <span className={`text-primary text-footnote flex flex-wrap items-center gap-1.5`}>
        {run === undefined ? (
          endedAt === `` ? (
            `Never`
          ) : (
            resolvePlatformSessionAndSourcesWeekday(endedAt, nowMs)
          )
        ) : (
          <RoutineInflightChip run={run} />
        )}
        {row.consentLive === false && (
          <Tooltip content={`Runs are staged for review until someone approves one`}>
            <span
              data-testid={`routine-needs-approval`}
              className={`bg-alpha-1 text-secondary text-footnote flex items-center gap-1 rounded px-1.5 py-0.5`}
            >
              <UiOverlaysAndIconsCustomIcon name={`Clock`} customSize={11} />
              {`Needs approval`}
            </span>
          </Tooltip>
        )}
        {row.paused === true && (
          <span
            className={`bg-alpha-1 text-secondary text-footnote rounded px-1.5 py-0.5`}
          >{`paused`}</span>
        )}
      </span>
      {filteredRefs.length > 0 && (
        <Fragment>
          <span className={`text-muted text-footnote`}>{`Sources`}</span>
          <span className={`flex flex-wrap items-center gap-1.5`}>
            {filteredRefs.map((filteredRef) => (
              <button
                type={`button`}
                onClick={() => onSelectRoutine(filteredRef)}
                className={`bg-alpha-1 text-secondary text-footnote hover:bg-alpha-2 flex items-center gap-1 rounded px-1.5 py-0.5`}
                key={filteredRef}
              >
                <UiOverlaysAndIconsCustomIcon name={`Lightning`} customSize={11} />
                {resolveDataContentAndReferencesReplace2(filteredRef)}
              </button>
            ))}
          </span>
        </Fragment>
      )}
      {row.schedule !== undefined && (
        <Fragment>
          <span className={`text-muted text-footnote`}>{`Schedule`}</span>
          <span className={`flex flex-wrap items-center gap-1.5`}>
            <span
              className={`bg-alpha-1 text-secondary text-footnote flex items-center gap-1 rounded px-1.5 py-0.5`}
            >
              <UiOverlaysAndIconsCustomIcon name={`Calendar`} customSize={11} />
              {resolvePlatformSessionAndSourcesReplace(
                collectDataContentAndReferencesWEEKLY(
                  row.schedule.recurrence.rrule,
                  row.schedule.recurrence.tz,
                ),
              )}
            </span>
          </span>
        </Fragment>
      )}
    </div>
  );
};
