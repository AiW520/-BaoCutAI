import type { Node } from "prosemirror-model";
import type { Transaction } from "prosemirror-state";
import { ReplaceAroundStep, ReplaceStep } from "prosemirror-transform";
import {
  parseCharacterId,
  type CharacterLedger,
  type InsertedCharacterRun,
} from "../character-ledger";
import { type ForeignCharacterRun, ForeignEditHistory } from "./foreign-edit-history";
import {
  isBlockShellReplacement,
  isInlineLeafReplacement,
  isSameTypeBlockShellReplacement,
} from "./step-classification";

/** Subsequent writes end the foreign ownership records they overwrite or restore. */
export function releaseForeignEdit(
  transaction: Transaction,
  document: Node | null,
  ledger: CharacterLedger,
  history: ForeignEditHistory,
  inserted: readonly InsertedCharacterRun[],
): void {
  if (!history.hasActive) return;
  const touched = new Set<string>();
  const restored = new Set<string>();
  const insertedRuns: ForeignCharacterRun[] = [];
  const renamed = transaction.getMeta("op$") === "names";
  let endAll = false;
  transaction.steps.forEach((step, stepIndex) => {
    const before = transaction.docs[stepIndex];
    let changesPositions = false;
    step.getMap().forEach(() => {
      changesPositions = true;
    });
    if (
      !changesPositions ||
      isSameTypeBlockShellReplacement(step, before) ||
      isBlockShellReplacement(step, before) ||
      isInlineLeafReplacement(step, before)
    )
      return;
    // Native Step has no slice; replacement steps are the ones that insert content.
    const slice =
      step instanceof ReplaceStep || step instanceof ReplaceAroundStep
        ? step.slice
        : undefined;
    if (slice && slice.size > 0) {
      if (renamed) endAll = true;
      else
        slice.content.descendants((node) => {
          if (node.isInline) return false;
          if (typeof node.attrs.bid === "string" && node.attrs.bid)
            restored.add(node.attrs.bid);
          return true;
        });
    }
    const touch = (node: Node): void => {
      if (typeof node.attrs.bid === "string" && node.attrs.bid)
        touched.add(node.attrs.bid);
      else endAll = true;
    };
    step.getMap().forEach((from, to) => {
      if (from > before.content.size || to > before.content.size) {
        endAll = true;
        return;
      }
      const resolved = before.resolve(from);
      if (resolved.parent.isTextblock) touch(resolved.parent);
      if (to > from)
        before.nodesBetween(from, to, (node) =>
          node.isTextblock ? (touch(node), false) : !node.isInline,
        );
    });
  });
  for (const run of inserted) {
    const first = parseCharacterId(run.firstId);
    if (first !== null && run.len > 0)
      insertedRuns.push({ sess: first.sess, lo: first.i, hi: first.i + run.len - 1 });
  }
  if (touched.size === 0 && restored.size === 0 && insertedRuns.length === 0 && !endAll)
    return;
  if (touched.size > 0 && document !== null && document !== transaction.before)
    endAll = true;
  const wasInserted = (id: string): boolean => {
    const character = parseCharacterId(id);
    return (
      character !== null &&
      insertedRuns.some(
        (run) =>
          run.sess === character.sess && character.i >= run.lo && character.i <= run.hi,
      )
    );
  };
  history.endWhere(
    (taking) => {
      if (endAll) return true;
      for (const block of taking.blocks)
        if (restored.has(block) || wasInserted(block)) return true;
      if (
        insertedRuns.some((insert) =>
          taking.runs.some(
            (run) =>
              run.sess === insert.sess && run.lo <= insert.hi && run.hi >= insert.lo,
          ),
        )
      )
        return true;
      for (const block of touched) {
        if (taking.blocks.has(block)) return true;
        const runs = ledger.runsOf(block);
        if (!runs || runs.opaque) {
          if (taking.runs.length > 0) return true;
          continue;
        }
        if (
          runs.spans.some((span) =>
            taking.runs.some(
              (run) =>
                run.sess === span.sess &&
                run.lo <= span.start + span.len - 1 &&
                run.hi >= span.start,
            ),
          )
        )
          return true;
      }
      return false;
    },
    renamed ? "rolled-back" : "written",
  );
}
