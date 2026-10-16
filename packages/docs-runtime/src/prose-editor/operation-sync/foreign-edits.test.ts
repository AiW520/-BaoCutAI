import { describe, expect, it } from "vitest";
import { Schema, Fragment, Slice } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
import { ReplaceAroundStep, ReplaceStep } from "prosemirror-transform";
import { createCharacterLedger } from "../character-ledger";
import { captureForeignEdit } from "./capture-foreign-edit";
import { ForeignEditHistory } from "./foreign-edit-history";
import { KnownCharacters } from "./known-characters";
import { releaseForeignEdit } from "./release-foreign-edit";
import {
  isBlockShellReplacement,
  isInlineLeafReplacement,
  isSameTypeBlockShellReplacement,
  isStructurePreservingStep,
  replacementTextEdges,
} from "./step-classification";
import {
  characterIdsForBlock,
  foreignCharacterRanges,
  splitCharacterOwnership,
} from "./character-ownership";

const schema = new Schema({
  nodes: {
    doc: { content: "block+" },
    paragraph: { group: "block", content: "inline*", attrs: { bid: { default: null } } },
    heading: { group: "block", content: "inline*", attrs: { bid: { default: null } } },
    text: { group: "inline" },
    chip: { group: "inline", inline: true, atom: true },
  },
  marks: {},
});

function fixture(text = "A😀e\u0301Z") {
  const document = schema.node("doc", null, [
    schema.node("paragraph", { bid: "remote.50" }, schema.text(text)),
  ]);
  const ledger = createCharacterLedger(
    () => document,
    () => "local",
  );
  ledger.load([{ bid: "remote.50", runs: [{ id: "remote.0", len: [...text].length }] }]);
  const events: string[] = [];
  const history = new ForeignEditHistory(
    () => false,
    (event) => events.push(event.name),
  );
  const known = new KnownCharacters();
  return { document, ledger, history, events, known };
}

describe("operation sync ownership", () => {
  it("merges learned intervals across pictures without including gaps or losing block ids", () => {
    const { document, known } = fixture();
    known.learn(document, [
      {
        bid: "extra",
        runs: [
          { id: "s.5", len: 3 },
          { id: "s.0", len: 2 },
          { id: "bad", len: 2 },
        ],
      },
    ]);
    known.learn(document, [
      {
        bid: "other",
        runs: [
          { id: "s.2", len: 3 },
          { id: "s.10", len: 0 },
          { id: "s.12", len: 1 },
        ],
      },
    ]);
    expect([...known.blocks]).toEqual(["remote.50", "extra", "other"]);
    expect(
      Array.from({ length: 14 }, (_, counter) => known.contains("s", counter)),
    ).toEqual([
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
      true,
      false,
    ]);
    expect(known.contains("other", 0)).toBe(false);
  });

  it("translates mixed ownership to UTF-16 ranges and preserves opaque/drift sentinels", () => {
    const { document, ledger } = fixture();
    const node = document.firstChild;
    if (!node) throw new Error("Missing paragraph");
    const split = (span: { sess: string; start: number; len: number }) =>
      splitCharacterOwnership(
        span,
        () => false,
        (_session, counter) => counter === 0 || counter === 4,
      );
    const runs = ledger.runsOf("remote.50");
    expect(split({ sess: "remote", start: 0, len: 5 })).toEqual([
      { at: 0, len: 1, mine: true },
      { at: 1, len: 3, mine: false },
      { at: 4, len: 1, mine: true },
    ]);
    expect(foreignCharacterRanges(runs, node, split)).toEqual([[1, 5]]);
    expect(characterIdsForBlock(runs, node)).toEqual([
      "remote.0",
      "remote.1",
      "remote.2",
      "remote.3",
      "remote.4",
    ]);
    const shorter = schema.node("paragraph", null, schema.text("A"));
    expect(foreignCharacterRanges(runs, shorter, split)).toEqual([]);
    expect(characterIdsForBlock(runs, shorter)).toBeNull();
    if (!runs) throw new Error("Missing runs");
    runs.opaque = true;
    expect(foreignCharacterRanges(runs, node, split)).toBeNull();
    expect(characterIdsForBlock(runs, node)).toBeNull();
  });
});

describe("foreign edit history", () => {
  it("preserves ended entries in an undo window and isolates bridge instances", () => {
    const history = new ForeignEditHistory(
      () => false,
      () => {},
    );
    history.record(
      new Set(["remote.10"]),
      [
        { sess: "s", i: 2 },
        { sess: "s", i: 1 },
        { sess: "s", i: 2 },
      ],
      () => true,
      false,
    );
    history.endAll("written");
    expect(history.revision).toBe(2);
    expect(history.containsCharacter("s", 1)).toBe(false);
    history.window = { lo: 1, hi: 1 };
    expect(history.containsCharacter("s", 2)).toBe(true);
    expect(history.containsBlock("remote.10")).toBe(true);
    history.window = { lo: 1, hi: 2 };
    expect(history.containsCharacter("s", 2)).toBe(false);
    expect(
      new ForeignEditHistory(
        () => false,
        () => {},
      ).size,
    ).toBe(0);
  });

  it("refuses blind captures and protects pending undo when the 64-record cap is reached", () => {
    let pending = true;
    const events: string[] = [];
    const history = new ForeignEditHistory(
      () => pending,
      (event) => events.push(event.name),
    );
    history.record(new Set(["blind"]), [], () => false, true);
    expect(history.size).toBe(0);
    for (let i = 0; i < 65; i++)
      history.record(new Set([`block-${i}`]), [], () => true, false);
    expect(history.size).toBe(64);
    expect(history.containsBlock("block-64")).toBe(false);
    expect(events).toContain("undo.foreign.took.blind");
    expect(events).toContain("undo.foreign.took.full");
    history.endWhere((taking) => taking.blocks.has("block-0"), "written");
    pending = false;
    history.record(new Set(["last"]), [], () => true, false);
    expect(history.size).toBe(64);
    expect(history.containsBlock("last")).toBe(true);
  });

  it("captures a deletion through earlier transaction steps and releases on a later write", () => {
    const { document, ledger, history, known, events } = fixture();
    const transaction = EditorState.create({ doc: document })
      .tr.insertText("X", 1)
      .delete(3, 5);
    captureForeignEdit(transaction, {
      document,
      region: false,
      ledger,
      known,
      history,
      pendingSteps: () => [],
      isForeignSession: (session) => session !== "local",
      ownsBlock: () => false,
    });
    expect(history.containsCharacter("remote", 1)).toBe(true);
    expect(history.containsCharacter("remote", 0)).toBe(false);
    expect(events).toEqual(["undo.foreign.took"]);
    const later = EditorState.create({ doc: document }).tr.insertText("Q", 2);
    releaseForeignEdit(later, document, ledger, history, []);
    expect(history.hasActive).toBe(false);
    expect(events).toEqual(["undo.foreign.took", "undo.foreign.took.ended"]);
  });

  it("does not capture known characters or claim an unmappable region", () => {
    const { document, ledger, history, known, events } = fixture();
    known.learn(document, ledger.dump());
    const transaction = EditorState.create({ doc: document }).tr.delete(2, 4);
    const context = {
      document,
      region: false,
      ledger,
      known,
      history,
      pendingSteps: () => [],
      isForeignSession: () => true,
      ownsBlock: () => false,
    };
    captureForeignEdit(transaction, context);
    expect(history.size).toBe(0);
    captureForeignEdit(
      EditorState.create({ doc: document }).tr.delete(0, document.content.size),
      {
        ...context,
        known: new KnownCharacters(),
        region: true,
      },
    );
    expect(events).toEqual(["undo.foreign.took.blind"]);
  });

  it("maps captures back through local steps waiting for synchronization", () => {
    const { document, ledger, history, known } = fixture("abcdef");
    const initial = EditorState.create({ doc: document });
    const pending = initial.tr.insertText("LL", 1);
    const current = initial.apply(pending);
    const transaction = current.tr.delete(3, 4);
    captureForeignEdit(transaction, {
      document,
      region: false,
      ledger,
      known,
      history,
      pendingSteps: () => pending.steps,
      isForeignSession: () => true,
      ownsBlock: () => false,
    });
    expect(history.containsCharacter("remote", 0)).toBe(true);
    expect(history.containsCharacter("remote", 1)).toBe(false);
  });

  it("releases overlapping inserted character ids even when no step changes positions", () => {
    const { document, ledger, history } = fixture();
    history.record(new Set(), [{ sess: "remote", i: 8 }], () => true, false);
    releaseForeignEdit(
      EditorState.create({ doc: document }).tr,
      document,
      ledger,
      history,
      [{ from: 1, firstId: "remote.7", len: 2 }],
    );
    expect(history.hasActive).toBe(false);
  });
});

describe("native step classification", () => {
  it("distinguishes block shells, inline leaves and open slices", () => {
    const paragraph = schema.node("paragraph", { bid: "block" }, schema.text("abc"));
    const document = schema.node("doc", null, [paragraph]);
    const same = new ReplaceAroundStep(
      0,
      5,
      1,
      4,
      new Slice(Fragment.from(schema.node("paragraph", { bid: "block" })), 0, 0),
      1,
    );
    const different = new ReplaceAroundStep(
      0,
      5,
      1,
      4,
      new Slice(Fragment.from(schema.node("heading", { bid: "block" })), 0, 0),
      1,
    );
    expect(isSameTypeBlockShellReplacement(same, document)).toBe(true);
    expect(isSameTypeBlockShellReplacement(different, document)).toBe(false);
    expect(isBlockShellReplacement(different, document)).toBe(true);
    const withChip = schema.node("doc", null, [
      schema.node("paragraph", null, [schema.node("chip")]),
    ]);
    const leaf = new ReplaceStep(
      1,
      2,
      new Slice(Fragment.from(schema.node("chip")), 0, 0),
    );
    expect(isInlineLeafReplacement(leaf, withChip)).toBe(true);
    expect(isStructurePreservingStep(same, document)).toBe(true);
    expect(
      isStructurePreservingStep(
        new ReplaceStep(2, 2, new Slice(Fragment.from(schema.text("x")), 0, 0)),
        document,
      ),
    ).toBe(true);
    expect(isStructurePreservingStep(new ReplaceStep(1, 2, Slice.empty), document)).toBe(
      false,
    );
  });

  it("trims only unchanged edges of a same-parent plain-text replacement", () => {
    const { document } = fixture("abcXYZdef");
    const replacement = new ReplaceStep(
      1,
      10,
      new Slice(Fragment.from(schema.text("abcQdef")), 0, 0),
    );
    expect(replacementTextEdges(replacement, document)).toEqual({ head: 3, tail: 3 });
    expect(replacementTextEdges(new ReplaceStep(2, 2, Slice.empty), document)).toEqual({
      head: 0,
      tail: 0,
    });
  });
});
