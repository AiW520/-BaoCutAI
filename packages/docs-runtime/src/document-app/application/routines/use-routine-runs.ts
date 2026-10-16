import { useEffect, useState } from "react";
import { subscribeProjectFeed } from "../../dependencies";
import type { ProjectFeedEvent, RoutineRun } from "../project-contracts";
import { loadRoutineList } from "../project-data";
import { resolveApplicationRoutesKind } from "../routes-filmed-prose-page";
function useRoutineRuns(projectId: string, routineId: string) {
  const [runs, setRuns] = useState<RoutineRun[] | undefined>();
  useEffect(() => {
    let active = true;
    setRuns(undefined);
    let inFlight = false;
    let queued = false;
    const refresh = (): undefined => {
      if (inFlight) {
        queued = true;
        return;
      }
      inFlight = true;
      loadRoutineList(projectId)
        .then(
          (response) =>
            active &&
            setRuns(response.rows.find((row) => row.id === routineId)?.runs ?? []),
          (): undefined => undefined,
        )
        .finally((): undefined => {
          inFlight = false;
          if (queued && active) {
            queued = false;
            refresh();
          }
        });
    };
    refresh();
    const unsubscribe: () => void = subscribeProjectFeed(
      projectId,
      (event: ProjectFeedEvent): undefined => {
        if (resolveApplicationRoutesKind(event)) {
          refresh();
        }
      },
    );
    return (): undefined => {
      active = false;
      unsubscribe();
    };
  }, [projectId, routineId]);
  return runs;
}
export { useRoutineRuns };
