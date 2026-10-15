import { describe, expect, expectTypeOf, it } from "vitest";
import { Schema, type Node } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
import {
  CharacterRunSpans,
  characterIndexToUTF16Offset,
  codePointCount,
  createCharacterLedger,
  indexPMCharacterOffsets,
  parseCharacterId,
  pmCharacterCount,
  pmCharacterOffsets,
  utf16OffsetToCharacterIndex,
  type CharacterLedger,
} from "./character-ledger";

const schema = new Schema({
  nodes: {
    doc: { content: "paragraph+" },
    paragraph: { content: "inline*", attrs: { bid: { default: null } } },
    text: { group: "inline" },
    chip: { group: "inline", inline: true, atom: true },
  },
});

function documentWithText(text: string, bid = "block.0"): Node {
  return schema.node("doc", null, [
    schema.node("paragraph", { bid }, text ? schema.text(text) : undefined),
  ]);
}

describe("character offsets", () => {
  it("counts code points, combining marks and inline atoms without splitting surrogate pairs", () => {
    const block = schema.node("paragraph", { bid: "block.0" }, [
      schema.text("A😀"), schema.node("chip"), schema.text("e\u0301"),
    ]);
    expect(codePointCount("A😀e\u0301")).toBe(4);
    expect(pmCharacterCount(block)).toBe(5);
    expect([...pmCharacterOffsets(block)]).toEqual([
      [0, 1], [1, 3], [3, 4], [4, 5], [5, 6],
    ]);
    expect([0, 1, 2, 3, 4, 5, 6].map(offset => utf16OffsetToCharacterIndex(block, offset)))
      .toEqual([0, 1, 1, 2, 3, 4, 5]);
    expect([0, 1, 2, 3, 4, 5].map(index => characterIndexToUTF16Offset(block, index)))
      .toEqual([0, 1, 3, 4, 5, 6]);
    expect(indexPMCharacterOffsets(block)).toBe(indexPMCharacterOffsets(block));
  });

  it("keeps the ASCII fast path and clamps positions at the document edges", () => {
    const block = documentWithText("abc").firstChild;
    if (!block) throw new Error("Missing fixture paragraph");
    expect(indexPMCharacterOffsets(block)).toEqual({ plain: true, size: 3 });
    expect(utf16OffsetToCharacterIndex(block, -1)).toBe(0);
    expect(utf16OffsetToCharacterIndex(block, 99)).toBe(3);
    expect(characterIndexToUTF16Offset(block, 99)).toBe(3);
  });
});

describe("character run spans", () => {
  it("splits, inserts, removes and merges session intervals while preserving identifiers", () => {
    const spans = CharacterRunSpans.fromView([{ id: "session.0", len: 4 }]);
    spans.insert(2, "other", 10, 2);
    expect(spans.toView()).toEqual([
      { id: "session.0", len: 2 }, { id: "other.10", len: 2 }, { id: "session.2", len: 2 },
    ]);
    expect(spans.remove(1, 4)).toEqual(["session.1", "other.10", "other.11", "session.2"]);
    spans.renameAt(1, "session.1");
    expect(spans.toView()).toEqual([{ id: "session.0", len: 2 }]);
    expect(spans.range(0, 2)).toEqual(["session.0", "session.1"]);
    expect(spans.offsetOf("session.1")).toBe(1);
    expect(spans.offsetOf("missing.1")).toBe(-1);
    expect(() => spans.cut(3)).toThrow(RangeError);
  });

  it("makes malformed identifiers opaque and preserves the parser's accepted forms", () => {
    const spans = CharacterRunSpans.fromView([{ id: "invalid", len: 2 }]);
    expect(spans.opaque).toBe(true);
    expect(spans.spans).toEqual([]);
    expect(parseCharacterId("session.with.dots.12")).toEqual({ sess: "session.with.dots", i: 12 });
    expect(parseCharacterId("session.-1")).toBeNull();
    expect(parseCharacterId("session.1.5")).toEqual({ sess: "session.1", i: 5 });
  });
});

describe("character ledger", () => {
  it("maps transaction insertions and restores an earlier generation without reusing allocated IDs", () => {
    const original = documentWithText("A😀B");
    let doc = original;
    const ledger = createCharacterLedger(() => doc, () => "local");
    expectTypeOf(ledger).toEqualTypeOf<CharacterLedger>();
    ledger.load([{ bid: "block.0", runs: [{ id: "session.0", len: 3 }] }]);
    expect(ledger.idAt(3)).toBe("session.1");
    expect(ledger.posOf("session.2", true)).toBe(4);
    expect(ledger.idsIn(1, 5)).toEqual(["session.0", "session.1", "session.2"]);
    expect(ledger.blockAt(3)).toEqual({ bid: "block.0", start: 1, end: 5 });

    const restore = ledger.save();
    const transaction = EditorState.create({ doc, schema }).tr.insertText("C", 4);
    ledger.mapThrough(transaction, [{ from: 4, firstId: "local.10", len: 1 }]);
    doc = transaction.doc;
    expect(ledger.drifted).toBeNull();
    expect(ledger.idsIn(1, 6)).toEqual(["session.0", "session.1", "local.10", "session.2"]);
    expect(ledger.posOf("session.2")).toBe(5);
    const beforeRestore = ledger.generation;
    restore();
    doc = original;
    expect(ledger.generation).toBeGreaterThan(beforeRestore);
    expect(ledger.idsIn(1, 5)).toEqual(["session.0", "session.1", "session.2"]);
    expect(ledger.predict(1)).toBe("local.11");
  });

  it("renames acknowledged IDs, keeps holder lookups and records unaddressable blocks", () => {
    const doc = documentWithText("abc");
    const ledger = createCharacterLedger(() => doc, () => "local");
    ledger.load([{ bid: "block.0", runs: [{ id: "local.0", len: 3 }] }]);
    ledger.settle(new Map([["local.0", "room.100"]]));
    expect(ledger.idAt(1)).toBe("room.100");
    expect(ledger.holderOf("room.100")).toBe("block.0");
    expect(ledger.holdersOf("room.100")).toEqual(["block.0"]);
    expect(ledger.posOfBlock("block.0")).toBe(0);
    ledger.load([{ bid: "block.0", runs: [{ id: "local.0", len: 1 }] }], false, true);
    expect(ledger.drifted).toBeNull();
    expect(ledger.doubted.get("block.0")).toBe("block block.0: runs ≠ content");
    expect(ledger.runsOf("block.0")?.opaque).toBe(true);
    expect(ledger.dump()).toEqual([{ bid: "block.0", runs: [], opaque: true }]);
  });

  it("reports structural drift without silently accepting mismatched character runs", () => {
    const ledger = createCharacterLedger(() => documentWithText("abc"), () => "local");
    ledger.load([{ bid: "block.0", runs: [{ id: "local.0", len: 1 }] }]);
    expect(ledger.drifted).toBe("block block.0: runs ≠ content");
    expect(ledger.salvageDrift()).toBe("block.0");
    expect(ledger.drifted).toBeNull();
    expect(ledger.doubted.has("block.0")).toBe(true);
  });
});
