import { Suspense } from "react";
import { UiOverlaysAndIconsCustomIcon } from "../../dependencies";
import { SessionNavigationThen5 } from "../../session-navigation/ldoc-comments-btn";
import type { VisualizeRoutine } from "../project-contracts";
import { RoutineRunActivity } from "./run-activity";
import { RoutineHistoryButton } from "./run-history";
import { useRoutinePage, type RoutinePageOptions } from "./use-routine-page";
import { useRoutineRuns } from "./use-routine-runs";
interface RoutinePageProps extends RoutinePageOptions {
  onVisualize?: VisualizeRoutine;
}
function RoutinePage({
  pid,
  routineId,
  version,
  chipNav,
  onVisualize,
}: RoutinePageProps) {
  const { pageState, selectedRef } = useRoutinePage({
    pid,
    routineId,
    version,
    chipNav,
  });
  const runs = useRoutineRuns(pid, routineId);
  return pageState.kind === `loading` ? (
    <div className={`text-muted flex h-full flex-col items-center justify-center`}>
      <UiOverlaysAndIconsCustomIcon
        name={`Spinner`}
        size={`md`}
        bold={true}
        className={`animate-spin`}
      />
    </div>
  ) : pageState.kind === `missing` ? (
    <div
      className={`text-footnote text-danger p-sm`}
      data-testid={`routine-page-missing`}
    >{`This routine doesn’t exist, or you don’t have access to it.`}</div>
  ) : (
    <div className={`flex h-full min-h-0 flex-col`}>
      <RoutineRunActivity runs={runs} />
      <div className={`min-h-0 flex-1`}>
        <Suspense
          fallback={
            <div className={`text-muted text-body p-lg`}>{`Loading routine…`}</div>
          }
        >
          <SessionNavigationThen5
            container={`projects/${pageState.slug}`}
            name={pageState.address}
            pid={pid}
            readOnly={version !== undefined}
            selectedRef={selectedRef}
            historySlot={
              <RoutineHistoryButton
                runs={runs}
                routineId={routineId}
                label={pageState.displayName}
                onVisualize={onVisualize}
              />
            }
            key={`${pid}/${routineId}`}
          />
        </Suspense>
      </div>
    </div>
  );
}
export { RoutinePage };
