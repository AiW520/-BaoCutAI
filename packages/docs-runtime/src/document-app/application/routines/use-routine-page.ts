import { useEffect, useRef, useState } from "react";
import {
  ObservabilityBrowserAndOperationEventsRoutine,
  resolveDataContentAndReferencesKind,
  resolveDataContentAndReferencesKind3,
  resolveDataContentAndReferencesTest6,
  resolveDataModelSchemasValue3,
  resolveObservabilityBrowserAndOperationEventsValue48,
  subscribeProjectFeed,
  toast,
} from "../../dependencies";
import type {
  DocumentChipTarget,
  ProjectFeedEvent,
  RoutinePageState,
  RoutineRow,
} from "../project-contracts";
import { isRoutineFeedUpdate, loadRoutineList } from "../project-data";
export interface RoutinePageOptions {
  pid: string;
  routineId: string;
  version?: string;
  chipNav?: (target: DocumentChipTarget) => void;
}
export function useRoutinePage({ pid, routineId, version, chipNav }: RoutinePageOptions) {
  const [pageState, setPageState] = useState<RoutinePageState>({
    kind: `loading`,
  });
  const [, set]: [string, (path: string) => void] =
    resolveObservabilityBrowserAndOperationEventsValue48();
  const rowsRef = useRef<RoutineRow[]>([]);
  const refreshRef = useRef((): undefined => {});
  const mountedRef = useRef(true);
  useEffect(
    () => (
      (mountedRef.current = true),
      (): undefined => {
        mountedRef.current = false;
      }
    ),
    [],
  );
  useEffect(() => {
    let active = true;
    setPageState({
      kind: `loading`,
    });
    const loadPageState = async () => {
      const { slug: applicationRootRows, rows: applicationRootRows2 } =
        await loadRoutineList(pid);
      rowsRef.current = applicationRootRows2;
      return resolveDataContentAndReferencesKind3(
        applicationRootRows2,
        routineId,
        applicationRootRows,
      );
    };
    let inFlight = false;
    let queued = false;
    const refresh = (): undefined => {
      if (inFlight) {
        queued = true;
        return;
      }
      inFlight = true;
      loadPageState()
        .then(
          (response) => active && setPageState(response),
          () =>
            active &&
            setPageState((entry) =>
              entry.kind === `ready`
                ? entry
                : {
                    kind: `missing`,
                  },
            ),
        )
        .finally((): undefined => {
          inFlight = false;
          if (queued && active) {
            queued = false;
            refresh();
          }
        });
    };
    refreshRef.current = refresh;
    refresh();
    const unsubscribe: () => void = subscribeProjectFeed(
      pid,
      (event: ProjectFeedEvent): undefined => {
        if (isRoutineFeedUpdate(event)) {
          refresh();
        }
      },
    );
    return (): undefined => {
      active = false;
      unsubscribe();
    };
  }, [pid, routineId]);
  useEffect(
    () => (
      resolveDataModelSchemasValue3(({ file, hash }: DocumentChipTarget): undefined => {
        if (file.startsWith(`.routine/`)) {
          const address = file.slice(
            ObservabilityBrowserAndOperationEventsRoutine.length,
          );
          refreshRef.current();
          (async (): Promise<undefined> => {
            const { rows: result } = await loadRoutineList(pid).catch(() => ({
              rows: rowsRef.current,
            }));
            if (!mountedRef.current) return;
            const result2 = result.find((row) => row.id === address);
            const items = result2
              ? [result2]
              : result.filter((row) => row.name === address);
            const routine = items.length === 1 ? items[0] : undefined;
            if (routine?.id !== undefined && routine.id !== routineId) {
              set(
                resolveDataContentAndReferencesKind({
                  container: {
                    kind: `project`,
                    id: pid,
                    ...(version
                      ? {
                          version,
                        }
                      : {}),
                  },
                  ref: {
                    noun: `routine`,
                    id: routine.id,
                  },
                }),
              );
            }
          })();
          return;
        }
        if (chipNav) {
          chipNav({
            file,
            hash,
          });
          return;
        }
        toast.error(`That link isn't available here yet`);
      }),
      () => resolveDataModelSchemasValue3(null)
    ),
    [pid, routineId, set, version, chipNav],
  );
  const [selectedRef] = useState<string | undefined>(() => {
    const anchor:
      | {
          childId?: string;
          engineAnchor?: string;
        }
      | null
      | undefined = resolveDataContentAndReferencesTest6(
      location.hash.slice(1) || undefined,
    );
    return anchor?.childId ?? anchor?.engineAnchor;
  });
  return {
    pageState,
    selectedRef,
  };
}
