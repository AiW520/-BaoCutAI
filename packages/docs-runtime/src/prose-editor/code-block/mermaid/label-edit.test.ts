import { describe, expect, it } from "vitest";
import { bareIdentifierOffsets } from "./bare-identifiers";
import { bracketLabels } from "./bracket-labels";
import { planLabelEdit } from "./label-edit";
import { decodeMermaidLabel } from "./label-encoding";
import { locateHeldLabelSource } from "./label-location";
import { stateDeclaration } from "./state-declarations";

describe("Mermaid source label editing", () => {
  it("escapes display quotes while preserving the node id and source shape", () => {
    const source = "flowchart TD\n A[First] --> B";
    const edit = planLabelEdit(source, "A", "First", 'a"b');
    if (!edit) throw new Error("Missing label edit");
    expect(source.slice(0, edit.from) + edit.insert + source.slice(edit.to)).toBe(
      'flowchart TD\n A["a#quot;b"] --> B',
    );
    expect(edit.exact).toBe(false);
  });

  it("changes shape-data single quotes to Mermaid double quotes and rejects backslashes", () => {
    const source = "flowchart TD\n A@{ label: 'First', shape: rect } --> B";
    const edit = planLabelEdit(source, "A", "First", "Second");
    if (!edit) throw new Error("Missing shape-data edit");
    expect(source.slice(0, edit.from) + edit.insert + source.slice(edit.to)).toBe(
      'flowchart TD\n A@{ label: "Second", shape: rect } --> B',
    );
    expect(planLabelEdit(source, "A", "First", "back\\slash")).toBeNull();
  });

  it("honors a held duplicate definition instead of rewriting another node occurrence", () => {
    const source = "flowchart TD\n A[First] --> A[Second]";
    const second = source.indexOf("Second");
    const held = { from: second, to: second + 6 };
    const location = locateHeldLabelSource(source, "A", "Second", held);
    expect(location?.label).toEqual(held);
    expect(bracketLabels(source, "A")).toHaveLength(2);
  });

  it("ignores front matter/comments and handles state descriptions with encoded separators", () => {
    const source = "---\ntitle: A\n---\nflowchart TD\n %% A[hidden]\n A --> B";
    expect(bareIdentifierOffsets(source, "A")).toEqual([source.indexOf("A --> B")]);
    const state = "stateDiagram-v2\n A: #58;First#59;";
    expect(stateDeclaration(state, "A")?.kind).toBe("desc");
    const edit = planLabelEdit(state, "A", ":First;", ":Next;");
    if (!edit) throw new Error("Missing state description edit");
    expect(edit.insert).toBe("#58;Next#59;");
    expect(decodeMermaidLabel(edit.insert)).toBe(":Next;");
  });
});
