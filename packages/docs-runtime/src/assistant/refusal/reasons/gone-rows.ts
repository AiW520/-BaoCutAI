import type { ReasonRow } from "../contracts";

export const goneRows: readonly ReasonRow[] = [
  {
    key: `door | gone project`,
    reason: `gone`,
    sub: `project`,
    subKey: `object`,
    retry: `never`,
    scope: `page`,
    face: `deleted`,
    surfaces: `words`,
    words: `page_gone`,
    today: `page_terminal`,
    note: 'pageGoneOf SURE (CR 610870 `{deny, gone, data:{object:"project"}}`) on ANY verb: setPageGone("deleted") — every node read-only under the one line, nothing more sent (call() short-circuits), pending rows refused the same way so the editor trays their words.',
  },
  {
    key: `door | gone node`,
    reason: `gone`,
    sub: `node`,
    subKey: `object`,
    retry: `never`,
    scope: `node`,
    face: `node_gone`,
    surfaces: `words`,
    words: `node_gone`,
    today: `link_terminal`,
    fixture: {
      data: {
        object: `node`,
      },
    },
    note: `nodeGoneOf: names THIS link's node (data.id absent or == ctx.node) ⇒ markNodeGone (halted, pen off, nothing more sent for it; other nodes carry on). Another node's id ⇒ the entombed-ref row below.`,
  },
  {
    key: `door | gone *`,
    reason: `gone`,
    sub: `*`,
    retry: `never`,
    scope: `op`,
    custody: `tray`,
    surfaces: `words`,
    words: `block_gone`,
    today: `op_terminal`,
    fixture: {
      data: {
        object: `file`,
        id: `f_1`,
      },
    },
    note: "refGone: `gone` NAMING an entombed ref (data.object a string ≠ project/this node): that row's terminal STATE — data.terminal, words to the tray (opWords gone→block_gone), one re-read owed, the page stays live. A bare `gone` naming nothing keeps the zero_error road (sub `*` with no object ⇒ see fixture-less alias row).",
  },
];
