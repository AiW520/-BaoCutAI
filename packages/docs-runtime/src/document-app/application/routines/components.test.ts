import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { DatabaseGrid } from "../databases/grid";
import type { RoutineRun } from "../project-contracts";
import { RoutineDefinitionPanel } from "./definition-panel";
import { RoutineRunActivity } from "./run-activity";
import { RoutineRunHistory } from "./run-history";
vi.mock("../../dependencies", () => ({
  resolveDataContentAndReferencesReplace2: (text: string) => text,
  UiOverlaysAndIconsCustomIcon: () => null,
  Tooltip: ({ children }: { children: ReactNode }) => children,
  Link: (props: AnchorHTMLAttributes<HTMLAnchorElement>) =>
    createElement("a", {
      ...props,
    }),
  resolvePlatformApiAndAuthUseContext2: () => ({
    now: () => "2026-10-15T12:00:00Z",
    locale: "en",
    timeZone: "UTC",
  }),
  resolvePlatformSessionAndSourcesWeekday: (time: string) => `at ${time}`,
  resolvePlatformApiAndAuthValue: (path: string) => path,
  runFilePath: (run: string, name: string) => `/runs/${run}/${name}`,
  resolveObservabilityBrowserAndOperationEventsToFixed: (bytes: number) => `${bytes}B`,
  resolvePlatformSyncAndRoutingCompact: () => (size: string) => size,
  Button: ({ children }: { children?: ReactNode }) =>
    createElement("button", null, children),
  Popover: {
    Root: ({ children }: { children: ReactNode }) => children,
    Trigger: ({
      render,
    }: {
      render: (props: ButtonHTMLAttributes<HTMLButtonElement>) => ReactNode;
    }) => render({}),
    Popup: ({ children }: { children: ReactNode }) => children,
  },
  Table: ({ children }: { children: ReactNode }) =>
    createElement("table", null, children),
  TableHead: ({ children }: { children: ReactNode }) =>
    createElement("thead", null, children),
  TableBody: ({ children }: { children: ReactNode }) =>
    createElement("tbody", null, children),
  TableRow: ({ children }: { children: ReactNode }) =>
    createElement("tr", null, children),
  TableCell: ({ children }: { children: ReactNode }) =>
    createElement("td", null, children),
  TableHeaderCell: ({ children }: { children: ReactNode }) =>
    createElement("th", null, children),
}));
vi.mock("../routes-filmed-prose-page", () => ({
  applicationRoutesSet: new Set(["staged", "pending", "running"]),
  ApplicationRoutesStaged: { done: "Done", running: "Running…", pending: "Queued" },
}));
vi.mock("../../document-preview/use-page-skill-seat", () => ({
  UseDocumentPreviewStatusComponent: () => null,
}));
vi.mock("../../document-preview/roomview-frame-toolbar", () => ({
  resolveDocumentPreviewValue3: (id: string) => id,
}));
const completed: RoutineRun = {
  id: "run.1",
  status: "done",
  startedAt: "2026-10-15T10:00:00Z",
  settledAt: "2026-10-15T10:01:00Z",
  summary: "Report ready",
  outputs: [{ kind: "file", name: "report.csv", bytes: 24 }],
};
describe("routine components", () => {
  it("keeps completed output links separate from in-flight progress", () => {
    const runs = [
      completed,
      {
        ...completed,
        id: "run.2",
        status: "running",
        progress: ["Reading", "Reading", "Writing"],
      },
    ];
    const history = renderToStaticMarkup(
      createElement(RoutineRunHistory, {
        runs: runs,
      }),
    );
    expect(history).toContain('href="/runs/run.1/report.csv"');
    expect(history).toContain("Report ready");
    expect(history).not.toContain("Writing");
    const activity = renderToStaticMarkup(
      createElement(RoutineRunActivity, {
        runs: runs,
      }),
    );
    expect(activity).toContain("Writing");
    expect(activity).not.toContain("Report ready");
  });
  it("renders loading, empty and definition states without conflating them", () => {
    expect(renderToStaticMarkup(createElement(RoutineRunHistory, null))).toContain(
      "Loading…",
    );
    expect(
      renderToStaticMarkup(
        createElement(RoutineRunHistory, {
          runs: [],
        }),
      ),
    ).toContain("No runs yet.");
    expect(
      renderToStaticMarkup(
        createElement(RoutineDefinitionPanel, {
          definition: "err",
          runs: [],
        }),
      ),
    ).toContain("Couldn&#x27;t load");
    expect(
      renderToStaticMarkup(
        createElement(RoutineDefinitionPanel, {
          definition: { config: { type: "prompt", prompt: "Summarize the report" } },
          runs: [],
        }),
      ),
    ).toContain("Summarize the report");
  });
});
describe("database presentation", () => {
  it("renders column metadata, integrity marks and typed scalar cells", () => {
    const html = renderToStaticMarkup(
      createElement(DatabaseGrid, {
        database: {
          name: "Results",
          columns: [
            { key: "count", type: { kind: "number" }, required: true },
            { key: "enabled", type: { kind: "boolean" } },
          ],
          totalRows: 1,
          marks: [{ source: "source.1", kind: "row-keyless", count: 2 }],
          rows: [
            { pk: { source: "source.1", index: 0 }, cells: { count: 3, enabled: false } },
          ],
        },
      }),
    );
    expect(html).toContain("Results");
    expect(html).toContain("required");
    expect(html).toContain("Rows are missing the unique key");
    expect(html).toContain("tabular-nums");
    expect(html).toContain("false");
  });
});
