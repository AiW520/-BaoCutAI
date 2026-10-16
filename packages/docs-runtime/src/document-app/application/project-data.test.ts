import { beforeEach, describe, expect, it, vi } from "vitest";

const fetcher = vi.hoisted(() => vi.fn<(url: string) => Promise<Response>>());
vi.mock("../dependencies", () => ({ apiFetcher: fetcher }));

import { routineDefinitionSchema } from "./project-contracts";
import {
  isDatabaseFeedUpdate,
  isRoutineFeedUpdate,
  loadDatabaseDetail,
  loadDatabaseList,
  loadRoutineList,
} from "./project-data";

beforeEach(() => fetcher.mockReset());

describe("project data boundaries", () => {
  it("normalizes legacy routine lists without requiring a slug or nullable display fields", async () => {
    const row = {
      name: "Daily report",
      label: null,
      summary: null,
      runs: null,
      lastRun: null,
    };
    fetcher.mockResolvedValueOnce(Response.json([row]));
    expect(await loadRoutineList("project/a")).toEqual({ rows: [row] });
    expect(fetcher).toHaveBeenCalledWith("/api/v3/project/project%2Fa/routines");
  });

  it("retains addressable routine envelopes and rejects malformed data before it reaches components", async () => {
    fetcher.mockResolvedValueOnce(
      Response.json({ slug: "daily", rows: [{ id: "routine.1", name: "Report" }] }),
    );
    expect(await loadRoutineList("project.1")).toEqual({
      slug: "daily",
      rows: [{ id: "routine.1", name: "Report" }],
    });
    fetcher.mockResolvedValueOnce(Response.json({ rows: [{ name: 42 }] }));
    await expect(loadRoutineList("project.1")).rejects.toThrow();
  });

  it("preserves missing-database and HTTP failure states", async () => {
    fetcher.mockResolvedValueOnce(new Response(null, { status: 404 }));
    expect(await loadDatabaseDetail("project.1", "database.1")).toBe("missing");
    fetcher.mockResolvedValueOnce(new Response(null, { status: 503 }));
    await expect(loadDatabaseList("project.1")).rejects.toThrow(
      "databases read failed (503)",
    );
  });

  it("checks each supported routine instruction payload", () => {
    expect(
      routineDefinitionSchema.parse({
        refs: null,
        config: { type: "prompt", prompt: "Summarize" },
      }).config,
    ).toEqual({ type: "prompt", prompt: "Summarize" });
    expect(
      routineDefinitionSchema.parse({ config: { type: "code", code: "return 1" } })
        .config,
    ).toEqual({ type: "code", code: "return 1" });
    expect(
      routineDefinitionSchema.parse({
        config: { type: "tool", call: { tool: "search", args: { query: "test" } } },
      }).config,
    ).toEqual({ type: "call", call: { tool: "search", args: { query: "test" } } });
  });
});

describe("project feed refresh rules", () => {
  it("refreshes only the applicable routine or database changes", () => {
    expect(isRoutineFeedUpdate({ kind: "recovered" })).toBe(true);
    expect(isDatabaseFeedUpdate({ kind: "access-changed" })).toBe(true);
    const routine = {
      kind: "envelope",
      envelope: { diff: [{ address: { ref: { object: "routine" } } }] },
    };
    expect(isRoutineFeedUpdate(routine)).toBe(true);
    expect(isDatabaseFeedUpdate(routine)).toBe(false);
    expect(
      isDatabaseFeedUpdate({
        kind: "envelope",
        envelope: { outcome: "row-inserted", diff: [] },
      }),
    ).toBe(true);
    expect(isRoutineFeedUpdate({ kind: "presence" })).toBe(false);
  });
});
