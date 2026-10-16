import { z } from "zod";
import { apiFetcher } from "../dependencies";
import {
  databaseDetailSchema,
  databaseSummarySchema,
  routineListSchema,
  type DatabaseDetailData,
  type ProjectFeedEvent,
  type RoutineList,
} from "./project-contracts";
export async function loadRoutineList(projectId: string): Promise<RoutineList> {
  const response: Response = await apiFetcher(
    `/api/v3/project/${encodeURIComponent(projectId)}/routines`,
  );
  if (!response.ok) throw Error(`routines read failed (${response.status})`);
  const body: unknown = await response.json();
  return routineListSchema.parse(
    Array.isArray(body)
      ? {
          rows: body,
        }
      : body,
  );
}
export async function loadDatabaseList(projectId: string) {
  const response: Response = await apiFetcher(
    `/api/v3/project/${encodeURIComponent(projectId)}/databases`,
  );
  if (!response.ok) throw Error(`databases read failed (${response.status})`);
  const body: unknown = await response.json();
  return z
    .object({
      rows: z.array(databaseSummarySchema),
    })
    .parse(body).rows;
}
export async function loadDatabaseDetail(
  projectId: string,
  databaseId: string,
): Promise<DatabaseDetailData | "missing"> {
  const response: Response = await apiFetcher(
    `/api/v3/project/${encodeURIComponent(projectId)}/database/${encodeURIComponent(databaseId)}`,
  );
  if (response.status === 404) return "missing";
  if (!response.ok) throw Error(`database read failed (${response.status})`);
  const body: unknown = await response.json();
  return databaseDetailSchema.parse(body);
}
export function isRoutineFeedUpdate(event: ProjectFeedEvent): boolean {
  return (
    event.kind === "live" ||
    event.kind === "recovered" ||
    event.kind === "access-changed" ||
    (event.kind === "envelope" &&
      (event.envelope?.diff.some((diff) => diff.address?.ref?.object === "routine") ??
        false))
  );
}
export function isDatabaseFeedUpdate(event: ProjectFeedEvent): boolean {
  return (
    event.kind === "live" ||
    event.kind === "recovered" ||
    event.kind === "access-changed" ||
    (event.kind === "envelope" &&
      ((typeof event.envelope?.outcome === "string" &&
        event.envelope.outcome.startsWith("row-")) ||
        (event.envelope?.diff.some((diff) => diff.address?.ref?.object === "database") ??
          false)))
  );
}
