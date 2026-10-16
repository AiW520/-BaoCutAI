import { useEffect, useState } from "react";
import {
  api,
  ObservabilityBrowserAndOperationEventsRoutine,
  resolveDataContentAndReferencesKind,
  resolveDataContentAndReferencesReplace2,
  resolvePlatformSessionAndSourcesPush,
} from "../../dependencies";
import type {
  LoadState,
  RoutineDefinition,
  RoutineRow,
  RoutineRun,
  VisualizeRoutine,
} from "../project-contracts";
import { routineDefinitionSchema } from "../project-contracts";
import { resolveApplicationRoutesRuns } from "../routes-filmed-prose-page";
import { RoutineDefinitionPanel } from "./definition-panel";
import { RoutineDetailHeader } from "./detail-header";
import { RoutineDetailMetadata } from "./detail-metadata";
import type * as React from "react";

export const RoutineDetail: React.FC<RoutineDetailProps> = ({
  pid,
  version,
  row,
  slug,
  nowMs,
  knownNames,
  onVisualize,
  closeModal,
  onSelectRoutine,
}) => {
  const [definition, setDefinition] = useState<LoadState<RoutineDefinition>>(`loading`);
  useEffect(() => {
    if (slug === undefined) {
      setDefinition(`err`);
      return;
    }
    let enabled = true;
    setDefinition(`loading`);
    loadRoutineDefinition(slug, row.id ?? row.name).then(
      (result) => enabled && setDefinition(result),
      () => enabled && setDefinition(`err`),
    );
    return (): undefined => {
      enabled = false;
    };
  }, [slug, row.id, row.name]);
  const run: RoutineRun | undefined = resolveApplicationRoutesRuns(row);
  const endedAt = row.lastRun?.timing.endedAt || row.lastRun?.timing.startedAt || ``;
  const href =
    slug === undefined
      ? undefined
      : row.id === undefined
        ? resolvePlatformSessionAndSourcesPush(slug, undefined, {
            path: ObservabilityBrowserAndOperationEventsRoutine + row.name,
          })
        : resolveDataContentAndReferencesKind({
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
              id: row.id,
            },
          });
  const filteredRefs =
    definition !== `loading` && definition !== `err`
      ? (definition.refs ?? []).filter((ref) => knownNames.has(ref))
      : [];
  return (
    <div className={`flex min-h-0 flex-1 flex-col`} data-testid={`routine-detail`}>
      <RoutineDetailHeader
        row={row}
        href={href}
        onVisualize={onVisualize}
        closeModal={closeModal}
      />
      {(row.summary ?? ``) !== `` && (
        <div className={`text-secondary text-footnote mt-1`}>
          {resolveDataContentAndReferencesReplace2(row.summary ?? ``)}
        </div>
      )}
      <RoutineDetailMetadata
        row={row}
        run={run}
        endedAt={endedAt}
        nowMs={nowMs}
        filteredRefs={filteredRefs}
        onSelectRoutine={onSelectRoutine}
      />
      <RoutineDefinitionPanel definition={definition} runs={row.runs ?? []} />
    </div>
  );
};

interface RoutineDetailProps {
  pid: string;
  version?: string;
  row: RoutineRow;
  slug?: string;
  nowMs: number;
  knownNames: ReadonlySet<string>;
  onVisualize?: VisualizeRoutine;
  closeModal: () => void;
  onSelectRoutine: (name: string) => void;
}

async function loadRoutineDefinition(
  slug: string,
  name: string,
): Promise<RoutineDefinition> {
  const value: unknown = await api.functions.get(`projects/${slug}`, name);
  return routineDefinitionSchema.parse(value);
}
