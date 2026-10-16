import { describe, expect, it, vi } from "vitest";
import type { RefusalEvent, RefusalRequest } from "./contracts";

vi.mock("../../platform/index", () => import("./platform.fixture"));

import {
  LAW,
  openRefusalShadow,
  weatherOf,
  wireRowKeyOf,
  wireWordOf,
} from "../refusal-shadow";
import { refusalContractSeed } from "./contract-seed";

describe("refusal classification", () => {
  it("honors explicit door retry contracts and keeps replayed text in custody", () => {
    expect(
      LAW.classify(
        {
          verdict: "deny",
          reason: "future_reason",
          data: { retry: "never", scope: "page", face: "cmek" },
        },
        { road: "write" },
      ),
    ).toMatchObject({ k: "page_terminal", face: "cmek", source: "wire", scope: "page" });
    expect(
      LAW.classify(
        { verdict: "deny", reason: "bad_request" },
        { road: "write", replayed: true },
      ),
    ).toMatchObject({ k: "op_terminal", custody: "tray", reason: "bad_request" });
  });

  it("distinguishes project deletion, session recovery and local identifier failures", () => {
    expect(
      LAW.classify(
        { verdict: "deny", reason: "gone", data: { object: "project" } },
        { road: "write", seated: true },
      ),
    ).toMatchObject({ k: "page_terminal", face: "deleted" });
    expect(
      LAW.classify(
        { verdict: "deny", reason: "not_your_session", data: { why: "unknown_secret" } },
        { road: "write" },
      ),
    ).toMatchObject({ k: "rehandshake", max: LAW.UNKNOWN_RETRY_MAX - 1 });
    expect(
      LAW.classify(
        { verdict: "deny", reason: "id_invalid", data: { why: "count" } },
        { road: "write", kStart: 0 },
      ),
    ).toMatchObject({ k: "op_terminal", custody: "tray", words: "id_refused" });
  });

  it("bounds unknown denials and translates network failures without treating them as acknowledgements", () => {
    expect(
      LAW.classify({ verdict: "deny", reason: "future_reason" }, { road: "write" }),
    ).toMatchObject({
      k: "bounded",
      max: LAW.UNKNOWN_RETRY_MAX,
      after: { k: "op_terminal", custody: "tray" },
    });
    expect(LAW.ofThrow(new TypeError("network"), "update")).toEqual({
      verdict: "unreachable",
    });
    expect(LAW.ofThrow(new Error("door 429"), "read")).toEqual({
      verdict: "unreachable",
    });
  });

  it("keeps all declared reason rows reachable through the bounded wire vocabulary", () => {
    for (const row of [...refusalContractSeed.reasons, ...refusalContractSeed.feLocal]) {
      expect(wireRowKeyOf(row.key), row.key).toBeDefined();
    }
    expect(wireWordOf("some unrecognized private message")).toBe("unrowed");
  });
});

describe("refusal observation", () => {
  const context: RefusalRequest = {
    road: "write",
    verb: "update",
    opId: "session.1",
    node: "node.1",
  };

  it("isolates observers, applies retry thresholds and recovers on an acknowledgement", () => {
    const events: RefusalEvent[] = [];
    const observer = openRefusalShadow(
      { surface: "standalone", page: "page.1" },
      (event) => events.push(event),
    );
    const other = openRefusalShadow({ surface: "standalone", page: "page.2" }, () => {});
    for (let row = 0; row < LAW.BREAKER_N; row++) {
      for (let attempt = 0; attempt <= LAW.UNKNOWN_RETRY_MAX; attempt++) {
        observer.judged({}, { verdict: "deny", reason: "future_reason" }, "retry", {
          ...context,
          opId: `session.${row}`,
        });
      }
    }
    expect(observer.state()).toMatchObject({
      down: "refusing",
      trips: 1,
      strikes: LAW.BREAKER_N,
    });
    expect(other.state()).toMatchObject({ down: null, rows: 0, strikes: 0 });
    expect(
      events.filter((event) => event.name === "pages.refusal.shadow.down"),
    ).toHaveLength(1);
    observer.judged({}, { verdict: "allow" }, "done", context);
    expect(observer.state()).toMatchObject({ down: null, rows: 0, strikes: 0 });
  });

  it("caps emitted events while continuing bookkeeping, and stops after close", () => {
    const events: RefusalEvent[] = [];
    const observer = openRefusalShadow(
      { surface: "standalone", page: "page.1" },
      (event) => events.push(event),
      { cap: 1 },
    );
    for (let attempt = 0; attempt < 5; attempt++)
      observer.judged({}, { verdict: "deny", reason: "future_reason" }, "retry", context);
    expect(events.filter((event) => event.name === "pages.refusal.shadow")).toHaveLength(
      1,
    );
    expect(
      events.filter((event) => event.name === "pages.refusal.shadow.capped"),
    ).toHaveLength(1);
    expect(observer.state().strikes).toBe(1);
    const state = observer.state();
    observer.close();
    observer.judged({}, { verdict: "allow" }, "done", context);
    expect(observer.state()).toEqual(state);
  });

  it("retains transport throws until the matching request is judged", () => {
    const events: RefusalEvent[] = [];
    const observer = openRefusalShadow(
      { surface: "standalone", page: "page.1" },
      (event) => events.push(event),
    );
    const request = { opId: context.opId };
    observer.threw(
      request,
      Object.assign(new Error("closed"), {
        name: "FrameSendError",
        code: "DEAD:NETWORK",
      }),
    );
    observer.judged(request, { verdict: "unreachable" }, "retry", context);
    expect(events[0]?.fields).toMatchObject({ relay: "DEAD:NETWORK", code: "dead" });
  });

  it("suppresses foul-weather telemetry while safely reading optional weather providers", () => {
    expect(weatherOf({ ...context, vis: "hidden" }, () => ({ online: true }))).toEqual({
      foul: true,
      fields: { online: true },
    });
    expect(
      weatherOf(context, () => {
        throw new Error("unavailable");
      }),
    ).toEqual({ foul: false, fields: {} });
  });
});
