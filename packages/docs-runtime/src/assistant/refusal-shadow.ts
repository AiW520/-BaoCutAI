/** refusal-shadow: restored from refusalShadow-B7UFY3f1.js. */
import type { Dynamic } from "../interop/legacy-dynamic";
import {
  collectPlatformLiveDocumentAndHistoryAutoLift,
  filterPlatformLiveDocumentAndHistoryPayload,
  isDataOperationControlDeny2,
  isPlatformAnnouncementsFlatMap,
  isPlatformLiveDocumentAndHistoryInsert,
  observabilityTelemetryPattern27,
  observabilityTelemetryPattern28,
  observabilityTelemetrySet18,
  observabilityTelemetrySet22,
  PlatformLiveDocumentAndHistoryOther,
  PlatformLiveDocumentAndHistoryUnsaid,
  PlatformLiveDocumentAndHistoryValues,
  resolveDataOperationControlIdInvalid,
  resolvePlatformLiveDocumentAndHistoryAsking,
  resolvePlatformLiveDocumentAndHistoryCell,
  resolvePlatformLiveDocumentAndHistoryGesture,
  resolvePlatformLiveDocumentAndHistoryNone,
  resolvePlatformLiveDocumentAndHistoryPayload3,
  resolvePlatformLiveDocumentAndHistoryTest4,
  resolvePlatformLiveDocumentAndHistoryValue8,
  resolvePlatformLiveDocumentAndHistoryValue9,
  updatePlatformLiveDocumentAndHistoryTake,
} from "../platform/index";
var refusalContractSeed: Dynamic = {
  contractRef: `seed`,
  klasses: [
    `page_terminal`,
    `link_terminal`,
    `op_terminal`,
    `reread_once`,
    `counter`,
    `rehandshake`,
    `bounded`,
    `transient`,
    `lost`,
  ],
  matrixKey:
    "every row's `key` is its label in refusalClass.matrix.expected.json (`<section> | <reason|code|status>[ <sub>][ {error}][ @<verb>]`); matrix[key][road] is `<klass>[/<face|custody>]` or `<klass>(<max>[,floor][,redial])→<after>` — the leading token is always one of `klasses`",
  inject: {
    reasons:
      "a DOOR deny body, on either road: standalone = the /api/mux doorack (or REST /api/v3/door) answering `{verdict:\"deny\", reason, data:{<subKey>: <sub>, ...fixture}}` with the row's `fixture` merged (status beside it where the fixture names one); Frame = the same body inside frame-sync's ACCEPTED result `{status, body}`. The write road = answer an `update`; mint = answer the session `create`; read = answer a `read`; stream = a `stream-refused` feed event whose `ack` is that body; presence = answer the `presence` verb.",
    relay:
      "Frame lane ONLY: frame-sync's ctrl reply for the send — `result{status:\"REJECTED\", body:{code:<lower-case code>}}` (rejectionCode upper-cases it), or the lane's own words (DEAD:* = kill the lane with that reason; NOT_OPEN/GRANT_* = a `refused{reason}`; TIMEOUT = never answer; NO_RESULT_RELAY = ACCEPTED with no body on a silent relay; RESET_STORM = end the stream `reset{SERVER}` RESET_STRIKE_LIMIT times under one head; MUX_CLOSED / HANG = standalone: close the socket mid-call / never answer). `@<verb>` = which verb the code must arrive under.",
    http: 'standalone REST/mux ONLY: answer the verb with that HTTP status and NO ack body (`{error: "..."}` where the key says `{error}` — the route\'s own JSON; an html page otherwise) (+ Retry-After where relevant). `@<verb>` as relay.',
    feLocal:
      "rows the FE mints or alone still honours: inject only those WITHOUT `rigSkip` — page_gone * / unborn come from the relay FAILED_PRECONDITION / http 404 rows (seated vs never-seated life), forbidden lane = kill the Frame lane DEAD:DENIED|REVOKED, unavailable lane = a Frame-lane READ under a non-sendable lane with no cached snapshot, unclassified_transport = any relay code / http status with no row (e.g. REJECTED{code:\"some_future_code\"}, HTTP 500), engine_mismatch / schema_mismatch / parent_gone = a door deny body with that legacy reason. `rigSkip` rows are the transport's / editor's own OUTPUT words — assert them, never inject them.",
    fallback:
      "any door deny whose reason no row or alias names (e.g. `zzz_unknown`), on any road.",
    wire: 'blue CR-2\'s self-classifying body (not printed by any door yet): a DOOR deny carrying `data.retry` (+ `data.scope`, `data.max`) — e.g. `{verdict:"deny", reason:"zzz_unknown", data:{retry:"never", scope:"page"}}` ⇒ page_terminal whatever the reason; never honoured on a body with `data.layer` ∈ relay|http|link|lane (FE-minted).',
    verdict:
      "`verdict | unreachable*` rows: no answer at all (standalone: drop the socket / 502; Frame: DEAD lane) — `hung` = no answer within HANG_MS (8 s) with the request left open; `reopens` = standalone socket closed mid-call while the host re-dials.",
  },
  door: {
    repo: `anthropics/anthropic`,
    sha: `c7c208b12d98b40b2fc3c496ae5d4c0b5f2c21d3`,
    asOf: `2026-08-28`,
    final: [
      `bad_request`,
      `bad_at`,
      `bad_find`,
      `unknown_id`,
      `block_gone`,
      `char_gone`,
      `range_split`,
      `find_none`,
      `find_ambiguous`,
      `shape_mismatch`,
      `bad_move`,
      `anchors_affected`,
      `guard_mismatch`,
      `too_many`,
      `op_id_conflict`,
      `doc_too_large`,
      `id_invalid`,
    ],
    door: [
      `not_your_session`,
      `forbidden`,
      `unavailable`,
      `gone`,
      `id_conflict`,
      `index_gap`,
      `origin_missing`,
      `unsupported_construct`,
      `row_too_large`,
      `append_only`,
    ],
    keptOutside: [`internal`, `prose-substrate`, `opening`],
    vocabExtra: [`bad_op`, `doc_ceiling`, `guard_required`, `find_too_many`],
    raw: `absent.access.anchor.answer-too-large.answer-unmaskable.artifact-attest.batch-shape.busy.conflict.container.draining.dry-run.engine-not-granted.engine-unported.exists.frame_lane_door_unavailable.host-testimony.intent-shape.mint-reissue.parent.principal-namespace.rate-limit.retired.room-authored.shape.share-via-artifact.sharing-protected.take-lane.unproven-blob.unrouted.utterance-author.value-shape.watch-carrier`.split(
      `.`,
    ),
    subs: {
      id_invalid: [
        `count`,
        `order`,
        `used`,
        `gap`,
        `prefix`,
        `shape`,
        `required`,
        `empty_scope`,
      ],
      not_your_session: [
        `unknown_secret`,
        `label_not_secret`,
        `other_principal`,
        `unknown_session`,
        `beyond_next`,
      ],
      forbidden: [
        `role`,
        `owner_only`,
        `locked`,
        `unbound`,
        `binding_unverified`,
        `unauthenticated`,
        `not_author`,
        `not_governed`,
        `cmek`,
        `taken_down`,
      ],
      unavailable: [
        `room`,
        `busy`,
        `rate`,
        `rate_limited`,
        `ledger`,
        `engine`,
        `db_timeout`,
        `db_unavailable`,
      ],
      unknown_id: [`not_minted`, `op_slot`],
      gone: [
        `project`,
        `node`,
        `file`,
        `blob`,
        `utterance`,
        `table`,
        `enum`,
        `database`,
        `access`,
      ],
      bad_request: [
        `required`,
        `unknown_key`,
        `type`,
        `enum`,
        `pattern`,
        `range`,
        `exactly_one`,
        `unknown_verb`,
        `unknown_object`,
        `unknown_op`,
        `legible`,
        `unsupported`,
        `unresolved_lid`,
        `empty`,
        `too_many`,
        `duplicate`,
        `binary`,
        `json`,
        `conflicts`,
        `not_offered`,
        `wrong_object`,
      ],
    },
  },
  constants: {
    UNKNOWN_RETRY_MAX: 3,
    TRANSIENT_RETRY_MAX: 30,
    LOST_RETRY_MAX: 6,
    BREAKER_N: 3,
    REDIAL_AT: 4,
    UNBORN_RETRY_MAX: 10,
    BUSY_RETRY_MAX: 8,
    BUSY_RETRY_MS: 100,
    REHANDSHAKE_MAX: 2,
  },
  reasons: [
    {
      key: `door | bad_request *`,
      reason: `bad_request`,
      sub: `*`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `words`,
      words: `page_bug`,
      today: `reread_once`,
      aliases: [
        `invalid_argument`,
        `invalid`,
        `exists`,
        `shape`,
        `value-shape`,
        `batch-shape`,
        `container`,
        `unrouted`,
        `retired`,
        `watch-carrier`,
        `parent`,
        `anchor`,
        `bad_range`,
      ],
      note: "PAGE_BUG_DENY: zero_error assert once, then unsynced; the editor holds custody. `bad_request{was:<word>}` classifies under `was` when that word has a row (bin-6 id_invalid spelling, X8).",
    },
    {
      key: `door | bad_at *`,
      reason: `bad_at`,
      sub: `*`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `words`,
      words: `page_bug`,
      today: `reread_once`,
      note: "PAGE_BUG_DENY: zero_error assert once, then unsynced; the editor holds custody. `bad_request{was:<word>}` classifies under `was` when that word has a row (bin-6 id_invalid spelling, X8).",
    },
    {
      key: `door | bad_find *`,
      reason: `bad_find`,
      sub: `*`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `words`,
      words: `page_bug`,
      today: `reread_once`,
      note: "PAGE_BUG_DENY: zero_error assert once, then unsynced; the editor holds custody. `bad_request{was:<word>}` classifies under `was` when that word has a row (bin-6 id_invalid spelling, X8).",
    },
    {
      key: `door | bad_op *`,
      reason: `bad_op`,
      sub: `*`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `words`,
      words: `page_bug`,
      today: `reread_once`,
      note: `VOCAB word (close() target of engine law words); PAGE_BUG_DENY.`,
    },
    {
      key: `door | bad_op prose_orphan_node`,
      reason: `bad_op`,
      sub: `prose_orphan_node`,
      subKey: `problem`,
      retry: `never`,
      scope: `op`,
      custody: `unsynced`,
      surfaces: `silent`,
      words: null,
      today: `op_terminal`,
      fixture: {
        data: {
          why: `bad_payload`,
          problem: `prose_orphan_node`,
          was: `bad_op`,
          issues: [
            {
              path: ``,
            },
          ],
        },
      },
      note: "THE ORPHAN-NODE LAW (door/core.rs prose_orphan_node_deny · room.ts proseOrphanNodeDeny): the node this tab writes to is no longer the one its parent file's `content` names — the document was re-pointed under an open tab. A function of the FILE, never of the op: every update of that node is refused so for the rest of the tab's life while reads of it succeed. opTransport ORPHAN_DENY: judged zero_error `unsynced` (the page keeps its text, unsaved, and STOPS) — NEVER asserted (the assert meets the same law), nothing re-read, nothing learned (no mark, no shape that matters), no sentence; the frame rides `orphan_node:true`, the editor latches (nothing more leaves that instance; refused and later words keep custody in the words stage under the old node) and the host hears `env.onOrphanNode({node})` ONCE per link. Released by a RE-MOUNT only (a new transport + editor on the node the file names now). Before: `reread_once` — the key, its block ASSERTED (`repair`), refused again, a by-id re-read, once per caret. THE WIRE'S ROW: the law word closes to `bad_op` and finalizes as `bad_request{why:bad_payload, problem:prose_orphan_node, was:bad_op}` — `was` wins in classify (d), so this is the row production hits.",
    },
    {
      key: `door | bad_request prose_orphan_node`,
      reason: `bad_request`,
      sub: `prose_orphan_node`,
      subKey: `problem`,
      retry: `never`,
      scope: `op`,
      custody: `unsynced`,
      surfaces: `silent`,
      words: null,
      today: `op_terminal`,
      fixture: {
        data: {
          why: `bad_payload`,
          problem: `prose_orphan_node`,
        },
      },
      note: "the same law on a body that carries no rowed `was` (see `door | bad_op prose_orphan_node`, the row the wire hits): the same class, so the word never falls to `bad_request *`'s assert road whichever way it is carried.",
    },
    {
      key: `door | op_id_conflict *`,
      reason: `op_id_conflict`,
      sub: `*`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `words`,
      words: `page_bug`,
      today: `reread_once`,
      note: `PAGE_BUG_DENY.`,
    },
    {
      key: `door | guard_required *`,
      reason: `guard_required`,
      sub: `*`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `words`,
      words: `page_bug`,
      today: `reread_once`,
      aliases: [`range_needs_hash`],
      note: `VOCAB word; PAGE_BUG_DENY.`,
    },
    {
      key: `door | unknown_id *`,
      reason: `unknown_id`,
      sub: `*`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `words`,
      words: `unknown_id`,
      today: `reread_once`,
      aliases: [
        `not_minted`,
        `unknown_block`,
        `char_unknown`,
        `unknown_ref`,
        `not_found`,
        `unknown_target`,
        `target_gone`,
        `absent`,
      ],
      note: "GONE_REASONS: this life ⇒ zero_error assert (the editor re-derives); replayed ⇒ tray + unknown_id:…:earlier_life words; names the room GAVE ⇒ `given` put-back.",
    },
    {
      key: `door | unknown_id not_minted`,
      reason: `unknown_id`,
      sub: `not_minted`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `words`,
      words: `unknown_id:not_minted`,
      today: `reread_once`,
      note: `close() sub for every retired 'names nothing' spelling.`,
    },
    {
      key: `door | unknown_id op_slot`,
      reason: `unknown_id`,
      sub: `op_slot`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `words`,
      words: `unknown_id`,
      today: `reread_once`,
      note: "unresolved `_.n` slot.",
    },
    {
      key: `door | unknown_id blob`,
      reason: `unknown_id`,
      sub: `blob`,
      subKey: `kind`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `words`,
      words: `blob_unknown`,
      today: `reread_once`,
      note: 'blobDeny: unknown_id/not_minted {kind:"blob"} — a blob this page cannot cite; goes down as `blob_unknown` (why:paste for an html/markdown paste), never as a gone paragraph. Spec target never/op(tray); today the editor\'s zero_error road drops the paste — kept (§4).',
      aliases: [`unproven-blob`],
    },
    {
      key: `door | block_gone *`,
      reason: `block_gone`,
      sub: `*`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `words`,
      words: `block_gone`,
      today: `reread_once`,
      aliases: [`bid_gone`],
      note: `concurrency word (ZERO-ERROR: unreachable from a verdict on this life's ops — assert; an earlier life's row hands its words to the tray).`,
    },
    {
      key: `door | char_gone *`,
      reason: `char_gone`,
      sub: `*`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `words`,
      words: `char_gone`,
      today: `reread_once`,
      aliases: [`origin_gone`],
      note: `concurrency word (ZERO-ERROR: unreachable from a verdict on this life's ops — assert; an earlier life's row hands its words to the tray).`,
    },
    {
      key: `door | range_split *`,
      reason: `range_split`,
      sub: `*`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `words`,
      words: `range_split`,
      today: `reread_once`,
      note: `concurrency word (ZERO-ERROR: unreachable from a verdict on this life's ops — assert; an earlier life's row hands its words to the tray).`,
    },
    {
      key: `door | find_none *`,
      reason: `find_none`,
      sub: `*`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `words`,
      words: `find_none`,
      today: `reread_once`,
      note: `concurrency word (ZERO-ERROR: unreachable from a verdict on this life's ops — assert; an earlier life's row hands its words to the tray).`,
    },
    {
      key: `door | find_ambiguous *`,
      reason: `find_ambiguous`,
      sub: `*`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `words`,
      words: `find_ambiguous`,
      today: `reread_once`,
      aliases: [`quote_ambiguous`, `quote_not_found`, `no_match`, `ambiguous`],
      note: `concurrency word (ZERO-ERROR: unreachable from a verdict on this life's ops — assert; an earlier life's row hands its words to the tray).`,
    },
    {
      key: `door | guard_mismatch *`,
      reason: `guard_mismatch`,
      sub: `*`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `words`,
      words: `guard_mismatch`,
      today: `reread_once`,
      aliases: [
        `stale`,
        `stale_guard`,
        `rev_mismatch`,
        `guard`,
        `missing_guard`,
        `quote_mismatch`,
        `quote_stale`,
      ],
      note: "guardWord: a ranged erase / structural block op refused by the rev guard goes down as feLocal `block_changed{why:<op>}` (guardDeny); any other op ⇒ zero_error assert.",
    },
    {
      key: `door | too_many *`,
      reason: `too_many`,
      sub: `*`,
      retry: `never`,
      scope: `op`,
      custody: `unsynced`,
      surfaces: `words`,
      words: `too_many`,
      today: `op_terminal`,
      note: `LAW_DENY: a size law limits.ts should have pre-checked; unsynced.`,
    },
    {
      key: `door | too_many source`,
      reason: `too_many`,
      sub: `source`,
      subKey: `dim`,
      retry: `never`,
      scope: `op`,
      custody: `unsynced`,
      surfaces: `words`,
      words: `too_many:source`,
      today: `op_terminal`,
      note: `a paste larger than one edit may carry.`,
    },
    {
      key: `door | doc_too_large *`,
      reason: `doc_too_large`,
      sub: `*`,
      retry: `never`,
      scope: `op`,
      custody: `tray`,
      surfaces: `words`,
      words: `doc_too_large`,
      today: `op_terminal`,
      aliases: [`too_large`, `block_full`, `element_too_large`],
      note: 'LAW_DENY. Two printers: the engine\'s document ceiling (vocab finalize: `{dim:"bytes", limit, got}`) and — monorepo CR 753473 [187] D4, `frame_send::too_large_answered_body` — the artifact lane\'s OWN byte cap on the intent, ANSWERED at status 413 as the ruled `doc_too_large{dim:"bytes", limit:MAX_PAYLOAD_BYTES, max, got, was:"doc_ceiling"}` (before: Connect InvalidArgument ⇒ relay INVALID_ARGUMENT ⇒ worded "page bug" and re-derived once with the same oversize bytes). Today: zero_error `unsynced` (the page keeps its text unsaved and stops, console zero_error_fallback). Live: terminal — one deny `terminal:true`, the editor\'s terminal road puts the text in the tray, the sentence once, nothing re-sent.',
      flip: "op_terminal/unsynced→op_terminal/tray (live: the change is refused ONCE and its text goes to the tray under the doc_too_large sentence — never the zero_error `unsynced` stop; the artifact lane's own 413 included)",
      fixture: {
        status: 413,
        detail: `doc_too_large: the change is larger than this lane carries; split it or paste less`,
        data: {
          dim: `bytes`,
          limit: 262144,
          max: 262144,
          got: 3e5,
          was: `doc_ceiling`,
        },
      },
    },
    {
      key: `door | doc_ceiling *`,
      reason: `doc_ceiling`,
      sub: `*`,
      retry: `never`,
      scope: `op`,
      custody: `tray`,
      surfaces: `words`,
      words: `doc_too_large`,
      today: `op_terminal`,
      aliases: [`ceiling`],
      note: `VOCAB word (ALIAS doc_too_large); LAW_DENY.`,
      flip: `op_terminal/unsynced→op_terminal/tray (as doc_too_large, which it finalizes to)`,
    },
    {
      key: `door | find_too_many *`,
      reason: `find_too_many`,
      sub: `*`,
      retry: `never`,
      scope: `op`,
      custody: `unsynced`,
      surfaces: `words`,
      words: `too_many`,
      today: `op_terminal`,
      note: `VOCAB word (ALIAS too_many); LAW_DENY.`,
    },
    {
      key: `door | row_too_large *`,
      reason: `row_too_large`,
      sub: `*`,
      retry: `never`,
      scope: `op`,
      custody: `unsynced`,
      surfaces: `generic`,
      words: null,
      today: `op_terminal`,
      aliases: [`row-too-large`],
      note: `LAW_DENY; generic sentence today (its road did not move: the words stay).`,
    },
    {
      key: `door | shape_mismatch *`,
      reason: `shape_mismatch`,
      sub: `*`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `words`,
      words: `shape_mismatch`,
      today: `reread_once`,
      aliases: [`bad_mark`],
      note: `a law of the resolved op; not in LAW_DENY today ⇒ zero_error assert→unsynced (spec target never/op unsynced is PR-C's, with §6 Q1).`,
    },
    {
      key: `door | bad_move *`,
      reason: `bad_move`,
      sub: `*`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `words`,
      words: `bad_move`,
      today: `reread_once`,
      note: `a law of the resolved op; not in LAW_DENY today ⇒ zero_error assert→unsynced (spec target never/op unsynced is PR-C's, with §6 Q1).`,
    },
    {
      key: `door | anchors_affected *`,
      reason: `anchors_affected`,
      sub: `*`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `words`,
      words: `anchors_affected`,
      today: `reread_once`,
      note: `a law of the resolved op; not in LAW_DENY today ⇒ zero_error assert→unsynced (spec target never/op unsynced is PR-C's, with §6 Q1).`,
    },
    {
      key: `door | unsupported_construct *`,
      reason: `unsupported_construct`,
      sub: `*`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `generic`,
      words: null,
      today: `reread_once`,
      aliases: [`unknown_element`, `schema_violation`, `html_in_markdown`],
      note: `a law of the resolved op; not in LAW_DENY today ⇒ zero_error assert→unsynced (spec target never/op unsynced is PR-C's, with §6 Q1).`,
    },
    {
      key: `door | append_only *`,
      reason: `append_only`,
      sub: `*`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `generic`,
      words: null,
      today: `reread_once`,
      aliases: [`append-only`],
      note: `a law of the resolved op; not in LAW_DENY today ⇒ zero_error assert→unsynced (spec target never/op unsynced is PR-C's, with §6 Q1).`,
    },
    {
      key: `door | origin_missing *`,
      reason: `origin_missing`,
      sub: `*`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `generic`,
      words: null,
      today: `reread_once`,
      note: `a law of the resolved op; not in LAW_DENY today ⇒ zero_error assert→unsynced (spec target never/op unsynced is PR-C's, with §6 Q1).`,
    },
    {
      key: `door | shape_mismatch check_list`,
      reason: `shape_mismatch`,
      sub: `check_list`,
      subKey: `need`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `words`,
      words: `shape_mismatch:check_list`,
      today: `reread_once`,
      note: "refined by `need` (opWords REFINED_BY).",
    },
    {
      key: `door | id_invalid count`,
      reason: `id_invalid`,
      sub: `count`,
      retry: `never`,
      scope: `op`,
      custody: `tray`,
      surfaces: `words`,
      words: `id_refused`,
      today: `op_terminal`,
      note: "ID_TERMINAL_WHYS: terminal for the edit — goes down as feLocal `id_refused`, the edit comes off the screen, one sentence; never re-proposed/asserted. replayed or kStart>0 keep the earlier-life / cut-send custody roads (ctx).",
    },
    {
      key: `door | id_invalid order`,
      reason: `id_invalid`,
      sub: `order`,
      retry: `never`,
      scope: `op`,
      custody: `tray`,
      surfaces: `words`,
      words: `id_refused`,
      today: `op_terminal`,
      note: `ID_TERMINAL_WHYS (as count).`,
    },
    {
      key: `door | id_invalid used`,
      reason: `id_invalid`,
      sub: `used`,
      retry: `counter`,
      scope: `op`,
      max: 1,
      surfaces: `quiet`,
      words: `unknown_id`,
      today: `counter`,
      fixture: {
        data: {
          why: `used`,
          got: `u3.2`,
          next_free: `u3.9`,
        },
      },
      note: "counterWord: re-propose ONCE from data.next_free (unless next_free ≤ got: recountMovesNothing ⇒ zero_error); the same word again before anything lands is an ordinary refusal. A SPLIT's `used` (door CR 963583: the arm's block_split hears it too) first asks the room whether the tail it named already stands where the cut would put it (heldSplitStands [302]): stands ⇒ settled as landed, nothing resent; held by something else ⇒ this counter road; the room could not say ⇒ `unverified`, the ordinary re-read road — never a resend on a guess.",
    },
    {
      key: `door | id_invalid gap`,
      reason: `id_invalid`,
      sub: `gap`,
      retry: `counter`,
      scope: `op`,
      max: 1,
      surfaces: `quiet`,
      words: `unknown_id`,
      today: `counter`,
      fixture: {
        data: {
          why: `gap`,
          next_free: `u3.9`,
        },
      },
      note: `counterWord (as used).`,
    },
    {
      key: `door | id_invalid prefix`,
      reason: `id_invalid`,
      sub: `prefix`,
      retry: `rehandshake`,
      scope: `session`,
      max: 2,
      after: {
        retry: `reread`,
        scope: `op`,
        after: `assert`,
      },
      surfaces: `silent`,
      words: `unknown_id`,
      today: `rehandshake`,
      fixture: {
        data: {
          why: `prefix`,
          want_prefix: `u7`,
        },
      },
      note: `relabelled: proposed under a label the room does not run this page under (want_prefix) — hello again, every pending proposal re-labelled, fly again; sessRetries<2.`,
    },
    {
      key: `door | id_invalid shape`,
      reason: `id_invalid`,
      sub: `shape`,
      retry: `rehandshake`,
      scope: `session`,
      max: 2,
      after: {
        retry: `reread`,
        scope: `op`,
        after: `assert`,
      },
      surfaces: `silent`,
      words: `unknown_id`,
      today: `rehandshake`,
      fixture: {
        data: {
          why: `shape`,
          got: `_.3`,
        },
      },
      note: "relabelled ONLY when `got` names a `_.n` placeholder (a row that flew before the hello named it); a shape refusal of real ids ⇒ zero_error assert; of a re-flown (lost) row ⇒ tray (reflownShape).",
    },
    {
      key: `door | id_invalid required`,
      reason: `id_invalid`,
      sub: `required`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `words`,
      words: `unknown_id`,
      today: `reread_once`,
      note: `idsRequired doors: an op that proposed no ids; the editor re-proposes (opPlugin), the link asserts.`,
    },
    {
      key: `door | id_invalid *`,
      reason: `id_invalid`,
      sub: `*`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `words`,
      words: `unknown_id`,
      today: `reread_once`,
      note: `any other why (empty_scope…): zero_error assert.`,
    },
    {
      key: `door | index_gap *`,
      reason: `index_gap`,
      sub: `*`,
      retry: `counter`,
      scope: `op`,
      max: 1,
      surfaces: `quiet`,
      words: `unknown_id`,
      today: `counter`,
      aliases: [`clock_gap`],
      fixture: {
        data: {
          nextIndex: 7,
        },
      },
      note: `the text arm's counter word: re-propose once from nextIndex.`,
    },
    {
      key: `door | id_conflict *`,
      reason: `id_conflict`,
      sub: `*`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `words`,
      words: `session_collided`,
      today: `reread_once`,
      aliases: [`id_collision`],
      note: `DOOR word (opWords ALIAS session_collided) but NOT in STATE_DENY: today the zero_error assert road. Spec target never/link (a state of the session) — a flip PR-A does not take (§4 lists none for it); PR-C with Q1.`,
    },
    {
      key: `door | not_your_session *`,
      reason: `not_your_session`,
      sub: `*`,
      retry: `never`,
      scope: `op`,
      custody: `tray`,
      surfaces: `words`,
      words: `session_collided`,
      today: `op_terminal`,
      aliases: [`foreign_sess`, `session_collided`],
      fixture: {
        data: {
          why: `some_new_why`,
        },
      },
      note: "STATE_DENY: a why this code does not know (and the FE's own `session_collided` spelling) goes down as the state it is — one deny, words, the tray; never guessed at, never re-flown under a fresh session. The LOST whys (none / unknown_secret / unknown_session) are the re-handshake rows below (classify's sessionFamily splits them exactly as fly() does).",
    },
    {
      key: `door | not_your_session unknown_secret`,
      reason: `not_your_session`,
      sub: `unknown_secret`,
      retry: `rehandshake`,
      scope: `session`,
      max: 2,
      after: {
        retry: `never`,
        scope: `op`,
        custody: `tray`,
      },
      surfaces: `words`,
      words: `not_your_session:unknown_secret`,
      today: `rehandshake`,
      aliases: [`unknown_secret`],
      note: `the session was LOST (an engine restart; also NO why at all): re-handshake silently and fly the same opId again, ≤2 (sessRetries); past that one deny, words, tray.`,
    },
    {
      key: `door | not_your_session unknown_session`,
      reason: `not_your_session`,
      sub: `unknown_session`,
      retry: `rehandshake`,
      scope: `session`,
      max: 2,
      after: {
        retry: `never`,
        scope: `op`,
        custody: `tray`,
      },
      surfaces: `words`,
      words: `session_collided`,
      today: `rehandshake`,
      aliases: [`unknown_session`],
      note: `lost (legacy why).`,
    },
    {
      key: `door | not_your_session beyond_next`,
      reason: `not_your_session`,
      sub: `beyond_next`,
      retry: `never`,
      scope: `op`,
      custody: `tray`,
      surfaces: `words`,
      words: `session_collided`,
      today: `op_terminal`,
      note: `spec-listed why with no printer on staging c7c208b1: today an unknown why ⇒ STATE terminal (spec target rehandshake — a flip only once the door prints it).`,
    },
    {
      key: `door | not_your_session other_principal`,
      reason: `not_your_session`,
      sub: `other_principal`,
      retry: `never`,
      scope: `op`,
      custody: `tray`,
      surfaces: `words`,
      words: `not_your_session:other_principal`,
      today: `op_terminal`,
      note: `this tab now speaks as another account — a refusal the person must read, never re-flown under a session minted for that account.`,
    },
    {
      key: `door | not_your_session label_not_secret`,
      reason: `not_your_session`,
      sub: `label_not_secret`,
      retry: `never`,
      scope: `op`,
      custody: `tray`,
      surfaces: `words`,
      words: `page_bug`,
      today: `op_terminal`,
      note: `a page bug (ALIAS page_bug); STATE road (no assert).`,
    },
    {
      key: `door | forbidden *`,
      reason: `forbidden`,
      sub: `*`,
      retry: `never`,
      scope: `op`,
      custody: `tray`,
      surfaces: `words`,
      words: `forbidden`,
      today: `op_terminal`,
      aliases: [
        `not_allowed`,
        `read_only`,
        `member_denied`,
        `sha_not_yours`,
        `engine-not-granted`,
        `sharing-protected`,
      ],
      note: "DOOR word. Write road `update`: STATE_DENY ⇒ one deny, the viewer's sentence, words to the tray, one whole re-read owed, nothing re-sent. Session mint `create`: ACCESS_REFUSED ⇒ page_terminal{view_only} (setViewOnly). Spec table says page/view_only on both write roads; §4 t0 + the byte-identical bar keep update op-scoped in PR-A.",
    },
    {
      key: `door | forbidden role`,
      reason: `forbidden`,
      sub: `role`,
      retry: `never`,
      scope: `op`,
      custody: `tray`,
      surfaces: `words`,
      words: `forbidden`,
      today: `op_terminal`,
      note: "the gate's ROLE fault (`need` rides beside: role:<need> rows refine it). Write road `update`: STATE_DENY ⇒ one deny, the viewer's sentence, words to the tray, one whole re-read owed, nothing re-sent. Session mint `create`: ACCESS_REFUSED ⇒ page_terminal{view_only} (setViewOnly). Spec table says page/view_only on both write roads; §4 t0 + the byte-identical bar keep update op-scoped in PR-A.",
    },
    {
      key: `door | forbidden role:editor`,
      reason: `forbidden`,
      sub: `role:editor`,
      retry: `never`,
      scope: `op`,
      custody: `tray`,
      surfaces: `words`,
      words: `forbidden:editor`,
      today: `op_terminal`,
      note: `clientDoor relayAccessDeny/httpAccessDeny mint this one-string why (layer relay/http); the door prints the pair {why:role, need:editor} — both resolve here: the viewer's sentence.`,
      aliases: [`access`],
    },
    {
      key: `door | forbidden locked`,
      reason: `forbidden`,
      sub: `locked`,
      retry: `never`,
      scope: `op`,
      custody: `tray`,
      surfaces: `words`,
      words: `forbidden:locked`,
      today: `op_terminal`,
      note: `possession/role why.`,
    },
    {
      key: `door | forbidden owner_only`,
      reason: `forbidden`,
      sub: `owner_only`,
      retry: `never`,
      scope: `op`,
      custody: `tray`,
      surfaces: `words`,
      words: `forbidden`,
      today: `op_terminal`,
      note: `possession/role why. (self-lockout / sharing-protected close here.)`,
    },
    {
      key: `door | forbidden unbound`,
      reason: `forbidden`,
      sub: `unbound`,
      retry: `never`,
      scope: `op`,
      custody: `tray`,
      surfaces: `words`,
      words: `forbidden`,
      today: `op_terminal`,
      note: `possession/role why.`,
    },
    {
      key: `door | forbidden binding_unverified`,
      reason: `forbidden`,
      sub: `binding_unverified`,
      retry: `never`,
      scope: `op`,
      custody: `tray`,
      surfaces: `words`,
      words: `forbidden`,
      today: `op_terminal`,
      note: `possession/role why.`,
    },
    {
      key: `door | forbidden not_author`,
      reason: `forbidden`,
      sub: `not_author`,
      retry: `never`,
      scope: `op`,
      custody: `tray`,
      surfaces: `words`,
      words: `forbidden`,
      today: `op_terminal`,
      note: `possession/role why.`,
    },
    {
      key: `door | forbidden unauthenticated`,
      reason: `forbidden`,
      sub: `unauthenticated`,
      retry: `rehandshake`,
      scope: `session`,
      max: 2,
      after: {
        retry: `never`,
        scope: `link`,
        face: `session`,
      },
      surfaces: `words`,
      words: `forbidden:unauthenticated`,
      today: `op_terminal`,
      flip: `op_terminal→3 sends (1 + REHANDSHAKE_MAX) ⇒ link DOWN signed_out under ONE line, nothing refused into the tray, liftable by a probe read answered (classify: rehandshake≤2→link_terminal{session}; the implemented end state is the liftable DOWN, not a latch)`,
      aliases: [`unauthenticated`, `unauthorized`],
      note: "signed out (mux `session expired`/`unauthorized`, v3 401 close to this). Today STATE_DENY ⇒ one deny + words per row; spec: a sign-in probe / re-handshake ≤2 then the link is read-only under the one sentence until the person signs in (401 heals itself — never a per-keystroke refusal, never infinite).",
    },
    {
      key: `door | forbidden not_governed`,
      reason: `forbidden`,
      sub: `not_governed`,
      retry: `never`,
      scope: `page`,
      face: `not_governed`,
      surfaces: `words`,
      words: `forbidden:not_governed`,
      today: `op_terminal`,
      flip: `op_terminal→page_terminal{not_governed} (live: the page read-only for this life under its own sentence — on a read, the mint and a write alike; nothing re-asked)`,
      fixture: {
        status: 200,
        detail: `not_governed: this page is not governed by the artifact this lane's grant names`,
        data: {
          why: `not_governed`,
          layer: `door`,
        },
      },
      note: 'monorepo CR 753473 [187] D1 (ps1 c7bebecf) `frame_send::refused_answered`: the page carries no artifact seat naming the grant\'s artifact (a native page, another artifact\'s or org\'s) — ANSWERED OK (200) with the ruled `{verdict:"deny",reason:"forbidden",data:{why:"not_governed",layer:"door"}}` on every arm (read, presence, write), told apart from `read_only` (the PermissionDenied a grant\'s ROLE earns). Before the CR: `{code:"permission_denied"}` ⇒ read `throw e` ⇒ unreachable ⇒ re-asked for ever; Watch ⇒ UNAVAILABLE ⇒ 60 s pre-open wall / unbounded re-open (frame-sync follow-up: PermissionDenied ⇒ DENIED). Today (this body on main): write STATE_DENY tray (generic forbidden line), read re-asked, mint view-only. Live: page_terminal{not_governed} ⇒ setPageGone("not_governed"): PAGE_NOT_GOVERNED words, read-only, nothing sent.',
    },
    {
      key: `door | forbidden cmek`,
      reason: `forbidden`,
      sub: `cmek`,
      retry: `never`,
      scope: `page`,
      face: `cmek`,
      surfaces: `words`,
      words: `forbidden:cmek`,
      today: `op_terminal`,
      flip: `op_terminal→page_terminal{cmek} (live: the page read-only for this life under its own sentence — on a read, the mint and a write alike; nothing re-asked)`,
      fixture: {
        status: 200,
        detail: `cmek: this page's organization requires customer-managed encryption; Pages are not served for it here`,
        data: {
          why: `cmek`,
          layer: `door`,
        },
      },
      note: 'monorepo CR 753473 [187] D1 (ps1 c7bebecf) `frame_send::refused_answered`: the CMEK org gate refuses ANY op for the page (reads included) on the artifact iframe\'s lane — ANSWERED OK (200) with the door\'s ruled `{verdict:"deny",reason:"forbidden",data:{why:"cmek",layer:"door"}}`, told apart from `read_only` (before: all three were Connect PermissionDenied ⇒ `{code:"permission_denied"}` ⇒ a reader LOOPED on a read it could never win — clientDoor `throw e` ⇒ unreachable ⇒ for ever). Today (this body on main): write ⇒ STATE_DENY tray with the generic `forbidden` line; read ⇒ a deny ⇒ the read road re-asks; mint ⇒ ACCESS_REFUSED view-only "you can view". Live: page_terminal{cmek} on every road ⇒ setPageGone("cmek"): read-only, PAGE_CMEK words, nothing sent or re-read.',
    },
    {
      key: `door | forbidden taken_down`,
      reason: `forbidden`,
      sub: `taken_down`,
      retry: `never`,
      scope: `op`,
      custody: `tray`,
      surfaces: `words`,
      words: `forbidden`,
      today: `op_terminal`,
      note: "a new why word under `forbidden` on the import and export roads: final: a retry gets the same refusal. Its class on every road is `forbidden *`'s, under a key of its own; its sentence is the generic `forbidden` one.",
    },
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
    {
      key: `door | conflict *`,
      reason: `conflict`,
      sub: `*`,
      retry: `bounded`,
      scope: `op`,
      max: 8,
      floorMs: 100,
      after: {
        retry: `never`,
        scope: `op`,
        custody: `tray`,
      },
      surfaces: `words`,
      words: `busy`,
      today: `bounded`,
      fixture: {
        status: 409,
        detail: `ledger-busy: concurrent writers moved the tail; nothing committed, retry`,
      },
      note: "RAW ledger-busy (isBusyRefusal: reason conflict + detail ^ledger-busy | code ledger-busy — by its WORDS, never a bare 409): the SAME bytes under the SAME opId, BUSY_RETRY_MS doubling to BUSY_RETRY_CAP_MS, upper-half jitter, retryAfterMs the floor, BUSY_RETRY_MAX=8. THE BELT'S END on the write road (fly, before any class): a `conflict` / 409 vouches for nothing — the legacy `ledger_busy_at` body is what a mid-roll old owner printed (the write may stand on the new owner) — so it is NEVER busyOut ⇒ the tray: rewritten `{unreachable, lost}` ⇒ the LOST class (same opId, LOST_RETRY_MAX, then link DOWN unreached, the log keeps the row); `after` here describes only what still reaches busyOut — a `ledger-busy` CODE under another word at another status ⇒ feLocal `busy{terminal}` (tray) — and the stream road's spent burst. A 409 `conflict` NO belt reads (`outcome:\"unknown\"`, or no ledger-busy words: opTransport.conflictLostNow) is that lost verdict AT ONCE. HISTORY: since 2026-09-08 production says CAS exhaustion 200 `unavailable{why:busy, was:ledger-busy, outcome:unknown}` (the `unavailable busy` rows). Deliberately NOT the 1 s transient road inside the budget. A `conflict` at another status that is not ledger-busy ⇒ zero_error assert.",
    },
    {
      key: `door | unavailable *`,
      reason: `unavailable`,
      sub: `*`,
      retry: `transient`,
      scope: `link`,
      max: 30,
      redial: false,
      surfaces: `quiet`,
      words: `unavailable`,
      today: `infinite`,
      flip: `infinite→transient(30)`,
      aliases: [
        `warming`,
        `block_busy`,
        `storage_lagging`,
        `ledger_unavailable`,
        `engine-unavailable`,
        `engine_unavailable`,
        `substrate_conflict`,
        `turn_timeout`,
        `timeout`,
        `overloaded`,
        `unreachable`,
        `frame_lane_door_unavailable`,
      ],
      fixture: {
        retryAfterMs: 500,
      },
      note: `NOT a verdict: the door cannot take writes right now. The payload stays queued under its opId and goes again after the asked delay (floor) or the backoff (RETRY_MS doubling to RETRY_CAP_MS, half jitter) — today FOR EVER; PR-A caps at TRANSIENT_RETRY_MAX then link_terminal{unreached} (PAGE_UNREACHED words, lifts on reopen/accessChanged).`,
    },
    {
      key: `door | unavailable busy`,
      reason: `unavailable`,
      sub: `busy`,
      retry: `transient`,
      scope: `link`,
      max: 720,
      redial: false,
      surfaces: `quiet`,
      words: `unavailable:busy`,
      today: `infinite`,
      flip: `infinite→transient(720)`,
      fixture: {
        data: {
          why: `busy`,
          retryAfterMs: 1e3,
        },
        detail: `busy: too many reads of this page in flight; nothing read, retry`,
      },
      note: "CR 711037 ps4 / CR 727776: the door's ADMISSION queues shed (read admission; write admission `scope:write`; the turn-queue / landing sheds) — a busy pod asking for TIME, nothing committed, NOT a room restarting and NOT a failure of the row: back off per retryAfterMs (the floor — opTransport SHED_FLOOR_MS doubling on the read road, PAGE_BUSY_MS ×1.5 capped on the write road, which spends no other budget), NEVER redial (a fresh socket / Watch is one more snapshot build under the load that shed). Its OWN large budget (720 ≈ an hour of capped waits), distinct from `unavailable *`: a long busy stretch must never become link_terminal{unreached}. ps3-era doors say why:room with a `busy:` detail for the same thing — refusalClass folds that here too.",
    },
    {
      key: `door | unavailable db_timeout`,
      reason: `unavailable`,
      sub: `db_timeout`,
      retry: `transient`,
      scope: `link`,
      max: 720,
      redial: false,
      surfaces: `quiet`,
      words: `unavailable:busy`,
      today: `infinite`,
      flip: `infinite→transient(720) — the write road never reaches the class: pageBusyOf (WAIT_WHYS, #5506) ⇒ the calm wait, same opId, no budget`,
      fixture: {
        detail: `db_timeout: the page store timed out; retry the same op (same opId) shortly`,
        data: {
          why: `db_timeout`,
          scope: `write`,
          retryAfterMs: 1500,
        },
      },
      note: 'monorepo CR 743258 `door::core::store_shed_at` (landed; telemetry_catalogue `store_shed{why}`): `unavailable{why:"db_timeout", scope:"write"|"read", retryAfterMs 1000–2000, committed?:false}` — a ledger statement / pool checkout timed out. `committed:false` rides ONLY when the door KNOWS nothing was written; absent on `scope:write` ⇒ the append MAY have landed ⇒ re-send the SAME opId (OP-21 replay answers the duplicate), never re-derive. Write ⇒ pageBusy calm wait (#5506); read ⇒ shedReadOf; one-shots ⇒ withBusyRetry once iff committed:false. Class as `unavailable busy` (transient 720, no redial).',
    },
    {
      key: `door | unavailable db_unavailable`,
      reason: `unavailable`,
      sub: `db_unavailable`,
      retry: `transient`,
      scope: `link`,
      max: 720,
      redial: false,
      surfaces: `quiet`,
      words: `unavailable:busy`,
      today: `infinite`,
      flip: `infinite→transient(720) — the write road never reaches the class: pageBusyOf (WAIT_WHYS, #5506) ⇒ the calm wait, same opId, no budget`,
      fixture: {
        detail: `db_unavailable: the page store could not be reached; retry the same op (same opId) shortly`,
        data: {
          why: `db_unavailable`,
          scope: `write`,
          retryAfterMs: 2500,
          committed: false,
        },
      },
      note: 'monorepo CR 743258 `door::core::store_shed_at` (landed): `unavailable{why:"db_unavailable", scope:"write"|"read", retryAfterMs 2000–3000, committed?:false}` — the database could not be reached (pool checkout / connect). A WAIT word, never a ruling: write ⇒ pageBusy calm wait (#5506 WAIT_WHYS: same opId after the named wait, ×1.5 capped, `tries` untouched, the calm PAGE_BUSY_SAVING line from the second in a row — never RECONNECTING→"Unsaved"); read ⇒ shedReadOf backoff; one-shots ⇒ withBusyRetry once iff `committed:false`. The class (transient 720, no redial) is `unavailable busy`\'s: a long store outage must never become DOWN unreached while the door is answering.',
    },
    {
      key: `door | unavailable rate_limited`,
      reason: `unavailable`,
      sub: `rate_limited`,
      retry: `transient`,
      scope: `link`,
      max: 720,
      redial: false,
      surfaces: `quiet`,
      words: `unavailable:rate`,
      today: `infinite`,
      flip: `infinite→transient(720) — the write road never reaches the class: pageBusyOf (WAIT_WHYS) ⇒ the calm wait THE DOOR NAMED (rateLimitedOf: the bucket's honest refill, ≤ 30 s), same opId, no budget; a cut send's later updates are paced to it`,
      fixture: {
        detail:
          "rate_limited: too many edits too fast by this account (`budget`: `page` = on this doc, `principal` = across all docs); nothing committed — slow down and retry the same op after `retry_after_s` seconds",
        data: {
          why: `rate_limited`,
          scope: `write`,
          budget: `page`,
          retry_after_s: 7,
          retryAfterMs: 6400,
        },
      },
      note: 'monorepo `guards.write_rate` (door/write_admission.rs `rate_shed_answer`; guard words `write_rate_page` / `write_rate_principal`): a token bucket per (principal, page) 600/min burst 300 and per principal 3000/min burst 1000, charged by an update\'s OP COUNT before the write queues for the turn; over budget ⇒ rowless `unavailable{why:"rate_limited", scope:"write", budget:"page"|"principal", retry_after_s, retryAfterMs}` at 200 — nothing committed, no opId reserved; retryAfterMs = the honest refill wait for that weight (floor 500 ms, ≤ burst/rate). Met by ONE gesture: a toolbar mark over a very long selection = one format per text block, cut into 64-op updates. Before: the `*` row (transient 30: Reconnecting… / Unsaved — retrying, the 30-send fuse).',
    },
    {
      key: `door | unavailable forward-timeout`,
      reason: `unavailable`,
      sub: `forward-timeout`,
      subKey: `was`,
      retry: `lost`,
      scope: `link`,
      max: 6,
      surfaces: `quiet`,
      words: `unavailable:busy`,
      today: `infinite`,
      flip: 'infinite→lost(6) — the write road never reaches the class: pageBusyOf takes `why:"busy"` first ⇒ the calm wait (same opId after max(retryAfterMs, PAGE_BUSY_MS), no budget spent, never trayed; the door\'s OP-21 replay answers the duplicate if the first landed)',
      fixture: {
        status: 504,
        detail: `forward-timeout: the owning pod did not answer in time; the op MAY have committed — re-send the same op (same opId) and the door's replay answers a duplicate`,
        data: {
          why: `busy`,
          retryAfterMs: 2e3,
          was: `forward-timeout`,
        },
      },
      note: 'monorepo CR 753473 [187] D5 `glue::forward_timeout_answer` (horizontal ferry / the landing\'s own bound; standalone mux/HTTP + MCP lanes only, `BONGO_HORIZONTAL=1`): 504 + the ruled `unavailable{why:"busy", retryAfterMs:2000, was:"forward-timeout"}` and NO `committed` key — THE LOST-VERDICT class: the owner MAY have committed, so the page keeps custody and re-sends the SAME opId after the wait; never re-derive, never tray. `busy` not `room`: nothing here is cured by re-dialling. Before the CR the bare `reason:"forward-timeout"` had no row (today: zero_error assert ⇒ unsynced; the live fallback bounded(3) ⇒ op_terminal would have trayed a write whose verdict was merely lost — the reason the door respelled it). Write road, today AND live: pageBusyOf (`why:"busy"`, no scope) ⇒ fly\'s calm page-busy wait. Read road: shedReadOf (unavailable + retryAfterMs) ⇒ polite backoff, the same read again. Keyed on `data.was` so the shadow logs `unavailable/forward-timeout`, not `busy`.',
    },
    {
      key: `door | unavailable owner-unreachable`,
      reason: `unavailable`,
      sub: `owner-unreachable`,
      subKey: `was`,
      retry: `transient`,
      scope: `link`,
      max: 30,
      redial: true,
      surfaces: `quiet`,
      words: `unavailable:room`,
      today: `infinite`,
      flip: `infinite→transient(30)+redial@4`,
      fixture: {
        status: 503,
        detail: `owner-unreachable: no pod owning this page could be reached; nothing was sent or committed — retry shortly`,
        data: {
          why: `room`,
          retryAfterMs: 1e3,
          committed: false,
          was: `owner-unreachable`,
        },
      },
      note: 'monorepo CR 753473 [187] D5 `glue::owner_unreachable_answer` (horizontal ferry, standalone mux/HTTP + MCP lanes only, `BONGO_HORIZONTAL=1`; never the artifact lane): 503 + the ruled `unavailable{why:"room", retryAfterMs, committed:false, was:"owner-unreachable"}` — a DEFINITE non-commit (nothing left the origin pod), the redial class. Before the CR the bare `reason:"owner-unreachable"` sat outside the vocabulary (no row ⇒ today\'s unknown-word road: zero_error assert ⇒ unsynced, silent; live fallback would have TRAYED it). Keyed on `data.was` (subKey was) so the shadow names it; the class is `unavailable room`\'s: write ⇒ the transient road (retryAfterMs the floor, redial once at REDIAL_AT), capped at 30 ⇒ DOWN unreached; read ⇒ shedReadOf\'s polite backoff.',
    },
    {
      key: `door | unavailable room`,
      reason: `unavailable`,
      sub: `room`,
      retry: `transient`,
      scope: `link`,
      max: 30,
      redial: true,
      surfaces: `quiet`,
      words: `unavailable:room`,
      today: `infinite`,
      flip: `infinite→transient(30)+redial@4`,
      aliases: [`room_unavailable`, `draining`, `opening`],
      note: `[110]: the room is restarting — same-socket retry never reached the new room; redial:true kicks env.redial (nudgeLiveDoor) at try REDIAL_AT before terminal.`,
    },
    {
      key: `door | unavailable rate`,
      reason: `unavailable`,
      sub: `rate`,
      retry: `transient`,
      scope: `link`,
      max: 30,
      redial: false,
      surfaces: `quiet`,
      words: `unavailable:rate`,
      today: `infinite`,
      flip: `infinite→transient(30)`,
      aliases: [`rate_limited`],
      note: `unavailable{why:rate}.`,
    },
    {
      key: `door | unavailable ledger`,
      reason: `unavailable`,
      sub: `ledger`,
      retry: `transient`,
      scope: `link`,
      max: 30,
      redial: false,
      surfaces: `quiet`,
      words: `unavailable`,
      today: `infinite`,
      flip: `infinite→transient(30)`,
      note: `unavailable{why:ledger}.`,
    },
    {
      key: `door | unavailable engine`,
      reason: `unavailable`,
      sub: `engine`,
      retry: `never`,
      scope: `op`,
      surfaces: `words`,
      words: `unavailable:engine`,
      today: `infinite`,
      flip: `infinite→op_terminal/tray (live: refused ONCE, the text to the tray — an engine this server build lacks does not heal in 30 sends)`,
      note: 'unavailable{why:"engine"} (door/vocab.rs close of `engine-unavailable` / `engine-unported`): the binary serving this page lacks the engine the content needs (a widget / iron node on a build without it). NOT a wait: no retryAfterMs heals it. Today fly\'s /unavailable/ ⇒ transient FOR EVER under "retry on their own"; live ⇒ op_terminal: one deny, `terminal`, the tray holds the text, opWords `unavailable:engine`. pageBusyOf never takes it (WAIT_WHYS is busy / db_timeout / db_unavailable — bughunter #5506).',
      aliases: [`engine-unported`],
      custody: `tray`,
    },
    {
      key: `door | rate-limit *`,
      reason: `rate-limit`,
      sub: `*`,
      retry: `transient`,
      scope: `link`,
      max: 30,
      redial: false,
      surfaces: `quiet`,
      words: `unavailable:rate`,
      today: `infinite`,
      flip: `infinite→transient(30)`,
      fixture: {
        status: 429,
      },
      note: "RAW: the mux's per-socket in-flight cap answers 429 `{deny, rate-limit}` with no number beside it (issue 136); fly's /rate[-_ ]?limit/ ⇒ transient. (closes to unavailable{rate}; respelling is CR-3.)",
    },
    {
      key: `door | busy *`,
      reason: `busy`,
      sub: `*`,
      retry: `transient`,
      scope: `link`,
      max: 30,
      redial: false,
      surfaces: `quiet`,
      words: `busy`,
      today: `infinite`,
      flip: `infinite→transient(30)`,
      note: "RAW `busy` (core.rs Ack::deny(\"busy\") — a container busy under another writer; closes to unavailable{room}): fly's /busy/ ⇒ transient today. NOT feLocal `busy{terminal}` (busyOut's word, matched first by data.terminal/room:ledger-busy).",
    },
    {
      key: `door | internal *`,
      reason: `internal`,
      sub: `*`,
      retry: `bounded`,
      scope: `op`,
      max: 3,
      floorMs: 0,
      after: {
        retry: `never`,
        scope: `op`,
        custody: `tray`,
      },
      surfaces: `words`,
      words: `server_refused`,
      today: `reread_once`,
      flip: `assert→bounded(3)→op_terminal`,
      note: "KEPT_OUTSIDE: the door's own fault word (HTTP lifts it to 500 `{error:internal}` — http row; in-process callers and born-container composites still print it as a deny). Today ∉ STATE/LAW/PAGE_BUG ⇒ zero_error assert; spec: bounded(3) then terminal + the generic sentence, counted.",
    },
    {
      key: `door | prose-substrate *`,
      reason: `prose-substrate`,
      sub: `*`,
      retry: `bounded`,
      scope: `op`,
      max: 3,
      floorMs: 0,
      after: {
        retry: `never`,
        scope: `op`,
        custody: `tray`,
      },
      surfaces: `words`,
      words: `server_refused`,
      today: `reread_once`,
      flip: `assert→bounded(3)→op_terminal`,
      note: `KEPT_OUTSIDE: a doc whose stored bytes this build cannot open.`,
    },
    {
      key: `door | answer-too-large *`,
      reason: `answer-too-large`,
      sub: `*`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `generic`,
      words: null,
      today: `reread_once`,
      note: "RAW: frame_send REPLY_TOO_BIG_BODY @413: the answer passed the store's reply cap (MAX_REPLY_BYTES 256 KiB). On a WRITE it REPLACES the answer — the verdict did not travel (the production door trims an ALLOWED over-cap ack to fit and answers it 200 + `data.trimmed`; its 413 replaces a non-allow answer; `pos` / `duplicate` ride beside every write-arm answer and prove nothing) — see `writeRoad`. On a READ: ask for less; never re-send the same read (opTransport answerTooLarge ⇒ the link halts under its sentence, capped views still page — #5380). Stream / mint: never printed there.",
      writeRoad:
        "write: the door REPLACED the body (frame_send `answered`) — the VERDICT DID NOT TRAVEL, whatever it was (the production door trims an ALLOWED over-cap ack and answers it 200, so its 413 replaces a deny's answer; 422 replaces either; every write-arm answer carries a pos, a duplicate can replay a deny — position proves nothing). clientDoor.transportDoorOf / fly say it `{unreachable, lost, verdictLost}` BEFORE any class is read: the LOST class on the write road — custody kept, the SAME opId re-sent ONCE: the door's replay answers the verdict (`allow` at 200 — trimmed or faceless, it fits — ⇒ landed; a deny ⇒ that deny); replaced AGAIN ⇒ it was a deny (a deny's mass is its body): ONE terminal refusal with custody (`boundOut`, the tray, the generic sentence; `data.was` names the replaced word). The re-send itself unanswered stays on the lost road (LOST_RETRY_MAX, then link DOWN, the log keeps the row). Never landed by position. The class here is the READ road's (#5380: halt, never re-ask the same bytes) and the other roads'.",
    },
    {
      key: `door | answer-unmaskable *`,
      reason: `answer-unmaskable`,
      sub: `*`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `generic`,
      words: null,
      today: `reread_once`,
      writeRoad:
        "write: as `answer-too-large` — a replaced body, the verdict did not travel ⇒ `{unreachable, lost, verdictLost}`: the same opId once more; `allow` ⇒ landed, replaced again ⇒ it was a deny (terminal, custody); never landed by position",
      note: `RAW: frame_send REPLY_UNMASKABLE_BODY @422. TODAY (and in PR-A): not in STATE/LAW/PAGE_BUG ⇒ the zero_error assert road, unchanged (Y-1 shard D: PR == main). Spec seed target never/op(unsynced) is a road PR-C decides with §6 Q1 — PR-A wires no flip for it.`,
    },
    {
      key: `door | intent-shape *`,
      reason: `intent-shape`,
      sub: `*`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `words`,
      words: `page_bug`,
      today: `reread_once`,
      note: `RAW: core.rs @413 / v3 door_deny: the request body is not an intent (closes to bad_request{problem}); relay INVALID_ARGUMENT is the Frame lane's spelling (relay row ⇒ bad_request). TODAY (and in PR-A): not in STATE/LAW/PAGE_BUG ⇒ the zero_error assert road, unchanged (Y-1 shard D: PR == main). Spec seed target never/op(unsynced) is a road PR-C decides with §6 Q1 — PR-A wires no flip for it.`,
    },
    {
      key: `door | dry-run *`,
      reason: `dry-run`,
      sub: `*`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `generic`,
      words: null,
      today: `reread_once`,
      note: `RAW: dry-run refusals of the create/import arms. TODAY (and in PR-A): not in STATE/LAW/PAGE_BUG ⇒ the zero_error assert road, unchanged (Y-1 shard D: PR == main). Spec seed target never/op(unsynced) is a road PR-C decides with §6 Q1 — PR-A wires no flip for it.`,
    },
    {
      key: `door | host-testimony *`,
      reason: `host-testimony`,
      sub: `*`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `generic`,
      words: null,
      today: `reread_once`,
      note: `RAW: utterance/testimony law of the speak arm. TODAY (and in PR-A): not in STATE/LAW/PAGE_BUG ⇒ the zero_error assert road, unchanged (Y-1 shard D: PR == main). Spec seed target never/op(unsynced) is a road PR-C decides with §6 Q1 — PR-A wires no flip for it.`,
    },
    {
      key: `door | utterance-author *`,
      reason: `utterance-author`,
      sub: `*`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `generic`,
      words: null,
      today: `reread_once`,
      note: `RAW: utterance law. TODAY (and in PR-A): not in STATE/LAW/PAGE_BUG ⇒ the zero_error assert road, unchanged (Y-1 shard D: PR == main). Spec seed target never/op(unsynced) is a road PR-C decides with §6 Q1 — PR-A wires no flip for it.`,
    },
    {
      key: `door | room-authored *`,
      reason: `room-authored`,
      sub: `*`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `generic`,
      words: null,
      today: `reread_once`,
      note: `RAW: utterance law. TODAY (and in PR-A): not in STATE/LAW/PAGE_BUG ⇒ the zero_error assert road, unchanged (Y-1 shard D: PR == main). Spec seed target never/op(unsynced) is a road PR-C decides with §6 Q1 — PR-A wires no flip for it.`,
    },
    {
      key: `door | mint-reissue *`,
      reason: `mint-reissue`,
      sub: `*`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `generic`,
      words: null,
      today: `reread_once`,
      note: `RAW: blob mint law. TODAY (and in PR-A): not in STATE/LAW/PAGE_BUG ⇒ the zero_error assert road, unchanged (Y-1 shard D: PR == main). Spec seed target never/op(unsynced) is a road PR-C decides with §6 Q1 — PR-A wires no flip for it.`,
    },
    {
      key: `door | take-lane *`,
      reason: `take-lane`,
      sub: `*`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `generic`,
      words: null,
      today: `reread_once`,
      note: `RAW: core.rs REASON_ const: lane take-over law. TODAY (and in PR-A): not in STATE/LAW/PAGE_BUG ⇒ the zero_error assert road, unchanged (Y-1 shard D: PR == main). Spec seed target never/op(unsynced) is a road PR-C decides with §6 Q1 — PR-A wires no flip for it.`,
    },
    {
      key: `door | principal-namespace *`,
      reason: `principal-namespace`,
      sub: `*`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `generic`,
      words: null,
      today: `reread_once`,
      note: `RAW: core.rs transport_deny actor-floor seat (anti-oracle; PRODSEC-gated). TODAY (and in PR-A): the zero_error assert road, unchanged (Y-1 shard D rows 96–99: PR == main — assert per keystroke, tray, page editable). Spec seed target never/link (read-only under one line) is NOT wired in PR-A: these are MCP-plane / access-verb / Frame-role words a Pages write does not meet, and a new link-terminal road for them is PR-C's to decide (§4 lists no flip for them).`,
    },
    {
      key: `door | share-via-artifact *`,
      reason: `share-via-artifact`,
      sub: `*`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `generic`,
      words: null,
      today: `reread_once`,
      note: `RAW: frame_send REASON_ const / deny_rowed!: sharing is done through the artifact, not this verb. TODAY (and in PR-A): the zero_error assert road, unchanged (Y-1 shard D rows 96–99: PR == main — assert per keystroke, tray, page editable). Spec seed target never/link (read-only under one line) is NOT wired in PR-A: these are MCP-plane / access-verb / Frame-role words a Pages write does not meet, and a new link-terminal road for them is PR-C's to decide (§4 lists no flip for them).`,
    },
    {
      key: `door | artifact-attest *`,
      reason: `artifact-attest`,
      sub: `*`,
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `generic`,
      words: null,
      today: `reread_once`,
      note: `RAW: deny_envelope: the artifact attestation failed. TODAY (and in PR-A): the zero_error assert road, unchanged (Y-1 shard D rows 96–99: PR == main — assert per keystroke, tray, page editable). Spec seed target never/link (read-only under one line) is NOT wired in PR-A: these are MCP-plane / access-verb / Frame-role words a Pages write does not meet, and a new link-terminal road for them is PR-C's to decide (§4 lists no flip for them).`,
    },
  ],
  relay: [
    {
      key: `relay | DEAD:* @update`,
      code: `DEAD:*`,
      as: `unreachable`,
      retry: `transient`,
      max: 30,
      today: `infinite`,
      flip: `infinite→transient(30)`,
      note: `isDoorUnreachable: nothing reached the room and the shell re-opens/re-grants (WAIT_FOR_OPEN_REFUSALS / a dead lane). DEAD:DENIED / DEAD:REVOKED never reject — door.ts ACCESS_DEATHS answer the feLocal forbidden{lane} value.`,
    },
    {
      key: `relay | NOT_OPEN @update`,
      code: `NOT_OPEN`,
      as: `unreachable`,
      retry: `transient`,
      max: 30,
      today: `infinite`,
      flip: `infinite→transient(30)`,
      note: `isDoorUnreachable: nothing reached the room and the shell re-opens/re-grants (WAIT_FOR_OPEN_REFUSALS / a dead lane). DEAD:DENIED / DEAD:REVOKED never reject — door.ts ACCESS_DEATHS answer the feLocal forbidden{lane} value.`,
    },
    {
      key: `relay | GRANT_EXPIRED @update`,
      code: `GRANT_EXPIRED`,
      as: `unreachable`,
      retry: `transient`,
      max: 30,
      today: `infinite`,
      flip: `infinite→transient(30)`,
      note: `isDoorUnreachable: nothing reached the room and the shell re-opens/re-grants (WAIT_FOR_OPEN_REFUSALS / a dead lane). DEAD:DENIED / DEAD:REVOKED never reject — door.ts ACCESS_DEATHS answer the feLocal forbidden{lane} value.`,
    },
    {
      key: `relay | GRANT_MISMATCH @update`,
      code: `GRANT_MISMATCH`,
      as: `unreachable`,
      retry: `transient`,
      max: 30,
      today: `infinite`,
      flip: `infinite→transient(30)`,
      note: `isDoorUnreachable: nothing reached the room and the shell re-opens/re-grants (WAIT_FOR_OPEN_REFUSALS / a dead lane). DEAD:DENIED / DEAD:REVOKED never reject — door.ts ACCESS_DEATHS answer the feLocal forbidden{lane} value.`,
    },
    {
      key: `relay | TIMEOUT @update`,
      code: `TIMEOUT`,
      as: `lost`,
      retry: `lost`,
      max: 6,
      today: `infinite`,
      flip: `infinite→lost(6)`,
      note: "a verdict LOST — the write may have landed; the re-send under its opId is a fresh entry and hears the replayed answer. Today `throw e` ⇒ unreachable ⇒ unbounded.",
    },
    {
      key: `relay | NO_RESULT_RELAY @update`,
      code: `NO_RESULT_RELAY`,
      as: `lost`,
      retry: `lost`,
      max: 6,
      today: `infinite`,
      flip: `infinite→lost(6)`,
      note: "a verdict LOST — the write may have landed; the re-send under its opId is a fresh entry and hears the replayed answer. Today `throw e` ⇒ unreachable ⇒ unbounded.",
    },
    {
      key: `relay | PROTOCOL @update`,
      code: `PROTOCOL`,
      as: `lost`,
      retry: `lost`,
      max: 6,
      today: `infinite`,
      flip: `infinite→lost(6)`,
      note: "a verdict LOST — the write may have landed; the re-send under its opId is a fresh entry and hears the replayed answer. Today `throw e` ⇒ unreachable ⇒ unbounded.",
    },
    {
      key: `relay | HANG @update`,
      code: `HANG`,
      as: `lost`,
      retry: `lost`,
      max: 6,
      today: `infinite`,
      flip: `infinite→lost(6)`,
      note: `opTransport call(): no answer by HANG_MS ⇒ {unreachable, hung} — the request is still out; re-send SAME bytes SAME opId to hear the replay.`,
    },
    {
      key: `relay | MUX_CLOSED @update`,
      code: `MUX_CLOSED`,
      as: `lost`,
      retry: `lost`,
      max: 6,
      today: `infinite`,
      flip: `infinite→lost(6)`,
      note: "wsLink `mux closed mid-call` WITHOUT the host's reopens word (isCarrierReopening ⇒ {unreachable, reopens:true} moors instead); `mux door timeout` / `reset` ride here too.",
    },
    {
      key: `relay | DUP_OP_ID @update`,
      code: `DUP_OP_ID`,
      as: `lost`,
      retry: `lost`,
      max: 6,
      today: `infinite`,
      flip: `infinite→lost(6)`,
      note: `lane.ts call(): this opId is ALREADY in the lane's outbox — on the prose transport that is its OWN earlier post of the row, given up for hung at HANG_MS (8 s) and still unanswered inside the lane's CALL_TIMEOUT_MS (20 s): a SILENT relay (no send_result, ack or none). The verdict of that post is pending ⇒ the lost road (same bytes, same opId, LOST_RETRY_MAX, then DOWN unreached + probe ladder, lifts when the relay answers again — the held words fly, never trayed). cae22be42 rowed it unclassified ⇒ bounded(3) ⇒ a silent relay TRAYED the words after 2 wire posts (yellow y1r-cae2-silent-timeout).`,
    },
    {
      key: `relay | INVALID_ARGUMENT @update`,
      code: `INVALID_ARGUMENT`,
      as: `bad_request`,
      today: `reread_once`,
      note: `relayFaultDeny (all verbs): the relay refused the bytes before the room saw them ⇒ bad_request{code:bad_request, was, layer:relay} ⇒ zero_error.`,
    },
    {
      key: `relay | BAD_PAYLOAD @update`,
      code: `BAD_PAYLOAD`,
      as: `bad_request`,
      today: `reread_once`,
      note: `relayFaultDeny (all verbs): the relay refused the bytes before the room saw them ⇒ bad_request{code:bad_request, was, layer:relay} ⇒ zero_error.`,
    },
    {
      key: `relay | TOO_BIG too_large @update`,
      code: `TOO_BIG`,
      as: `bad_request`,
      sub: `too_large`,
      today: `op_terminal`,
      note: `relayFaultDeny RELAY_SIZE_FAULTS ⇒ bad_request{code:too_large} ⇒ LAW (unsynced, no assert re-flying the same oversize bytes).`,
    },
    {
      key: `relay | LOCAL too_large @update`,
      code: `LOCAL`,
      as: `bad_request`,
      sub: `too_large`,
      today: `op_terminal`,
      note: `relayFaultDeny RELAY_SIZE_FAULTS ⇒ bad_request{code:too_large} ⇒ LAW (unsynced, no assert re-flying the same oversize bytes).`,
    },
    {
      key: `relay | RESET_STORM @update`,
      code: `RESET_STORM`,
      as: `conflict`,
      verbs: [`update`],
      today: `bounded`,
      note: "relayBusyDeny: RESET_STRIKE_LIMIT server resets under one un-acked head IS the busy answer in the relay's only words ⇒ 409 conflict ledger-busy value (update only; create/read stay thrown ⇒ unreachable). SYNTHETIC — the lane never heard an answer (an apply of this opId may still be in flight): it rides the busy belt as ever and, the belt spent, is the LOST verdict (custody kept, same opId), never busyOut ⇒ the tray (the `door | conflict *` row's note).",
    },
    {
      key: `relay | RESET_STORM @create`,
      code: `RESET_STORM`,
      as: `unreachable`,
      verbs: [`create`, `read`, `query`, `delete`, `batch`, `access`],
      retry: `transient`,
      max: 30,
      today: `infinite`,
      flip: `infinite→transient(30)`,
      note: `a storm under the mint or a read says nothing about the session service: the thrown unreachable road.`,
    },
    {
      key: `relay | INSTANCE_CHURN @update`,
      code: `INSTANCE_CHURN`,
      as: `conflict`,
      verbs: [`update`],
      today: `bounded`,
      note: `relayBusyDeny, RESET_STORM's twin (lane.ts THE RE-POST LIMIT): the update rode REPOST_LIMIT+1 stream instances that each died un-acked and unanswered by a road THE STRIKE LIMIT does not count (a socket that flaps, a client re-open loop) ⇒ the same 409 conflict ledger-busy value, same opId re-flown on the busy belt (the door dedups), the belt spent ⇒ LOST, never busyOut. SYNTHETIC as RESET_STORM: the lane never heard an answer.`,
    },
    {
      key: `relay | INSTANCE_CHURN @create`,
      code: `INSTANCE_CHURN`,
      as: `unreachable`,
      verbs: [`create`, `read`, `query`, `delete`, `batch`, `access`],
      retry: `transient`,
      max: 30,
      today: `infinite`,
      flip: `infinite→transient(30)`,
      note: `a read / mint that lost its instances says nothing about the session service: the thrown unreachable road, re-asked on the caller's ladder (as RESET_STORM @create).`,
    },
    {
      key: `relay | PERMISSION_DENIED role:editor @update`,
      code: `PERMISSION_DENIED`,
      as: `forbidden`,
      sub: `role:editor`,
      verbs: [`update`, `create`],
      today: `op_terminal`,
      note: `relayAccessDeny: a VIEW GRANT WROTE ([97]) ⇒ 403 forbidden{why:role:editor, layer:relay}; update ⇒ STATE (tray, one sentence), create ⇒ view-only.`,
    },
    {
      key: `relay | PERMISSION_DENIED @read`,
      code: `PERMISSION_DENIED`,
      as: `unreachable`,
      verbs: [`read`, `query`, `delete`, `batch`, `access`],
      retry: `transient`,
      max: 30,
      today: `infinite`,
      flip: `infinite→transient(30)`,
      note: `never refused under view in practice (a view grant reads); left thrown.`,
    },
    {
      key: `relay | NOT_WRITABLE role:editor @update`,
      code: `NOT_WRITABLE`,
      as: `forbidden`,
      sub: `role:editor`,
      verbs: [`update`, `create`],
      today: `op_terminal`,
      note: `relayAccessDeny: a VIEW GRANT WROTE ([97]) ⇒ 403 forbidden{why:role:editor, layer:relay}; update ⇒ STATE (tray, one sentence), create ⇒ view-only.`,
    },
    {
      key: `relay | NOT_WRITABLE @read`,
      code: `NOT_WRITABLE`,
      as: `unreachable`,
      verbs: [`read`, `query`, `delete`, `batch`, `access`],
      retry: `transient`,
      max: 30,
      today: `infinite`,
      flip: `infinite→transient(30)`,
      note: `never refused under view in practice (a view grant reads); left thrown.`,
    },
    {
      key: `relay | NOT_SENDABLE role:editor @update`,
      code: `NOT_SENDABLE`,
      as: `forbidden`,
      sub: `role:editor`,
      verbs: [`update`, `create`],
      today: `op_terminal`,
      note: `relayAccessDeny: a VIEW GRANT WROTE ([97]) ⇒ 403 forbidden{why:role:editor, layer:relay}; update ⇒ STATE (tray, one sentence), create ⇒ view-only.`,
    },
    {
      key: `relay | NOT_SENDABLE @read`,
      code: `NOT_SENDABLE`,
      as: `unreachable`,
      verbs: [`read`, `query`, `delete`, `batch`, `access`],
      retry: `transient`,
      max: 30,
      today: `infinite`,
      flip: `infinite→transient(30)`,
      note: `never refused under view in practice (a view grant reads); left thrown.`,
    },
    {
      key: `relay | FAILED_PRECONDITION unborn @update`,
      code: `FAILED_PRECONDITION`,
      as: `page_gone`,
      sub: `unborn`,
      verbs: [`update`, `create`, `read`],
      today: `bounded`,
      note: "relayGoneDeny RELAY_ABSENT_WORDS ⇒ page_gone{maybe:unborn}: seated ⇒ terminal (deleted); never seated ⇒ UNBORN_RETRY_MAX then page_terminal{unreached} ([119]). KIT: the klass column is the NEVER-SEATED context only — a page this life has neither read (no rev served) nor written (no ack): open a just-created page whose FIRST `read` is also answered this way (or not yet answered) and answer its `update` so; expect the same bytes re-sent on the unreachable backoff, UNBORN_RETRY_MAX=10 sends in all, then page_terminal `page_gone:unreached` (heal: allow on send k<10 ⇒ lands, no tray). Injected on the `update` of a page already READ or WRITTEN (seated — every ordinary rig page) it is `feLocal | page_gone unborn (seated)`: ONE send ⇒ page_terminal/deleted, identical to main.",
    },
    {
      key: `relay | NOT_FOUND unborn @update`,
      code: `NOT_FOUND`,
      as: `page_gone`,
      sub: `unborn`,
      verbs: [`update`, `create`, `read`],
      today: `bounded`,
      note: "relayGoneDeny RELAY_ABSENT_WORDS ⇒ page_gone{maybe:unborn}: seated ⇒ terminal (deleted); never seated ⇒ UNBORN_RETRY_MAX then page_terminal{unreached} ([119]). KIT: the klass column is the NEVER-SEATED context only — a page this life has neither read (no rev served) nor written (no ack): open a just-created page whose FIRST `read` is also answered this way (or not yet answered) and answer its `update` so; expect the same bytes re-sent on the unreachable backoff, UNBORN_RETRY_MAX=10 sends in all, then page_terminal `page_gone:unreached` (heal: allow on send k<10 ⇒ lands, no tray). Injected on the `update` of a page already READ or WRITTEN (seated — every ordinary rig page) it is `feLocal | page_gone unborn (seated)`: ONE send ⇒ page_terminal/deleted, identical to main.",
    },
    {
      key: `relay | GONE @update`,
      code: `GONE`,
      as: `page_gone`,
      verbs: [`update`, `create`, `read`],
      today: `page_terminal`,
      note: `relayGoneDeny RELAY_GONE_WORDS (none printed today): sure ⇒ terminal whether or not seated.`,
    },
    {
      key: `relay | PAGE_GONE @update`,
      code: `PAGE_GONE`,
      as: `page_gone`,
      verbs: [`update`, `create`, `read`],
      today: `page_terminal`,
      note: `relayGoneDeny RELAY_GONE_WORDS (none printed today): sure ⇒ terminal whether or not seated.`,
    },
    {
      key: `relay | PAGE_DELETED @update`,
      code: `PAGE_DELETED`,
      as: `page_gone`,
      verbs: [`update`, `create`, `read`],
      today: `page_terminal`,
      note: `relayGoneDeny RELAY_GONE_WORDS (none printed today): sure ⇒ terminal whether or not seated.`,
    },
    {
      key: `relay | DELETED @update`,
      code: `DELETED`,
      as: `page_gone`,
      verbs: [`update`, `create`, `read`],
      today: `page_terminal`,
      note: `relayGoneDeny RELAY_GONE_WORDS (none printed today): sure ⇒ terminal whether or not seated.`,
    },
    {
      key: `relay | PURGED @update`,
      code: `PURGED`,
      as: `page_gone`,
      verbs: [`update`, `create`, `read`],
      today: `page_terminal`,
      note: `relayGoneDeny RELAY_GONE_WORDS (none printed today): sure ⇒ terminal whether or not seated.`,
    },
    {
      key: `relay | MALFORMED_RESULT @update`,
      code: `MALFORMED_RESULT`,
      as: `unclassified_transport`,
      retry: `bounded`,
      max: 3,
      today: `infinite`,
      flip: `infinite→bounded(3)→op_terminal`,
      note: "lane.ts: a send_result the lane could not parse. Today `throw e` ⇒ unreachable ⇒ unbounded; PR-A: a synthetic deny {reason:unclassified_transport, data:{was:<code>, layer:relay}} ⇒ bounded(3) ⇒ op_terminal + generic sentence + deny.class{source:default} counted.",
    },
    {
      key: `relay | REJECTED @update`,
      code: `REJECTED`,
      as: `unclassified_transport`,
      retry: `bounded`,
      max: 3,
      today: `infinite`,
      flip: `infinite→bounded(3)→op_terminal`,
      note: "rejectionCode(): a REJECTED result with no code/reason. Today `throw e` ⇒ unreachable ⇒ unbounded; PR-A: a synthetic deny {reason:unclassified_transport, data:{was:<code>, layer:relay}} ⇒ bounded(3) ⇒ op_terminal + generic sentence + deny.class{source:default} counted.",
    },
    {
      key: `relay | UNKNOWN @update`,
      code: `UNKNOWN`,
      as: `unclassified_transport`,
      retry: `bounded`,
      max: 3,
      today: `infinite`,
      flip: `infinite→lost(6)→link_down unreached (words HELD; probe ladder) — the road that SHIPS; the value itself, should it ever reach the transport, bounded(3)→op_terminal`,
      note: "UNKNOWN: frame-sync's refuse-delivered — the frame was never handed to the store, its seq unspent. WHAT SHIPS (yellow, merged tree 2026-09-01): the transport never sees this code as a value. lane.ts rides a refused frame again itself (UNKNOWN: unpost, paced re-post, UNKNOWN_REFUSAL_LIMIT=3 times per post; the 4th refusal of ONE post would reject it UNKNOWN — a floor of REOPEN_BASE_MS per re-post makes that slower than the transport's HANG_MS) while the transport gives the hung call up at HANG_MS (8 s) and re-flies the same opId; lane call() then SUPERSEDES the earlier post (73ecf00ee / 1914e37c9: rejected TIMEOUT, seq spent) ⇒ classify sees TIMEOUT ⇒ the LOST road: 1 + LOST_RETRY_MAX sends, then DOWN unreached (the words HELD in the log, never trayed), the probe ladder, probation lifts of one send — ≈16–22 sends of one op over 45–80 s before the link settles DOWN. Still bounded against main's `throw e` ⇒ unreachable ⇒ for ever. The row's own class (bounded(3) ⇒ op_terminal + the tray's server_refused line + deny.class{source:default}) is what a value of this code WOULD get if the lane ever rejected with it inside HANG_MS — kept so the matrix face is the value's, the shipped road is the flip's. Today `throw e` ⇒ unreachable ⇒ unbounded.",
      ships: `lost(6)→link_down unreached/held`,
      rigWhy: `the refusal never reaches the transport as a value: the lane re-posts a refused frame itself (paced, UNKNOWN_REFUSAL_LIMIT times per post) while the transport gives the call up at HANG_MS (8 s) and re-flies the opId ⇒ lane call() SUPERSEDES the earlier post (TIMEOUT) ⇒ the lost road (yellow 2026-09-01, rows 131–133: DOWN after 16–22 sends of one op, 45–80 s, words held — never the tray)`,
    },
    {
      key: `relay | RATE_LIMITED @update`,
      code: `RATE_LIMITED`,
      as: `unclassified_transport`,
      retry: `bounded`,
      max: 3,
      today: `infinite`,
      flip: `infinite→lost(6)→link_down unreached (words HELD; probe ladder) — the road that SHIPS; the value itself, should it ever reach the transport, bounded(3)→op_terminal`,
      note: "RATE_LIMITED: frame-sync's refuse-delivered — the frame was never handed to the store, its seq unspent. WHAT SHIPS (yellow, merged tree 2026-09-01): the transport never sees this code as a value. lane.ts rides a refused frame again itself (RATE_LIMITED / WINDOW_FULL: unpost, pause, paced re-post from that seq for as long as the relay refuses) while the transport gives the hung call up at HANG_MS (8 s) and re-flies the same opId; lane call() then SUPERSEDES the earlier post (73ecf00ee / 1914e37c9: rejected TIMEOUT, seq spent) ⇒ classify sees TIMEOUT ⇒ the LOST road: 1 + LOST_RETRY_MAX sends, then DOWN unreached (the words HELD in the log, never trayed), the probe ladder, probation lifts of one send — ≈16–22 sends of one op over 45–80 s before the link settles DOWN. Still bounded against main's `throw e` ⇒ unreachable ⇒ for ever. The row's own class (bounded(3) ⇒ op_terminal + the tray's server_refused line + deny.class{source:default}) is what a value of this code WOULD get if the lane ever rejected with it inside HANG_MS — kept so the matrix face is the value's, the shipped road is the flip's. Today `throw e` ⇒ unreachable ⇒ unbounded.",
      ships: `lost(6)→link_down unreached/held`,
      rigWhy: `the refusal never reaches the transport as a value: the lane re-posts a refused frame itself (paced, for the page life) while the transport gives the call up at HANG_MS (8 s) and re-flies the opId ⇒ lane call() SUPERSEDES the earlier post (TIMEOUT) ⇒ the lost road (yellow 2026-09-01, rows 131–133: DOWN after 16–22 sends of one op, 45–80 s, words held — never the tray)`,
    },
    {
      key: `relay | WINDOW_FULL @update`,
      code: `WINDOW_FULL`,
      as: `unclassified_transport`,
      retry: `bounded`,
      max: 3,
      today: `infinite`,
      flip: `infinite→lost(6)→link_down unreached (words HELD; probe ladder) — the road that SHIPS; the value itself, should it ever reach the transport, bounded(3)→op_terminal`,
      note: "WINDOW_FULL: frame-sync's refuse-delivered — the frame was never handed to the store, its seq unspent. WHAT SHIPS (yellow, merged tree 2026-09-01): the transport never sees this code as a value. lane.ts rides a refused frame again itself (RATE_LIMITED / WINDOW_FULL: unpost, pause, paced re-post from that seq for as long as the relay refuses) while the transport gives the hung call up at HANG_MS (8 s) and re-flies the same opId; lane call() then SUPERSEDES the earlier post (73ecf00ee / 1914e37c9: rejected TIMEOUT, seq spent) ⇒ classify sees TIMEOUT ⇒ the LOST road: 1 + LOST_RETRY_MAX sends, then DOWN unreached (the words HELD in the log, never trayed), the probe ladder, probation lifts of one send — ≈16–22 sends of one op over 45–80 s before the link settles DOWN. Still bounded against main's `throw e` ⇒ unreachable ⇒ for ever. The row's own class (bounded(3) ⇒ op_terminal + the tray's server_refused line + deny.class{source:default}) is what a value of this code WOULD get if the lane ever rejected with it inside HANG_MS — kept so the matrix face is the value's, the shipped road is the flip's. Today `throw e` ⇒ unreachable ⇒ unbounded.",
      ships: `lost(6)→link_down unreached/held`,
      rigWhy: `the refusal never reaches the transport as a value: the lane re-posts a refused frame itself (paced, for the page life) while the transport gives the call up at HANG_MS (8 s) and re-flies the opId ⇒ lane call() SUPERSEDES the earlier post (TIMEOUT) ⇒ the lost road (yellow 2026-09-01, rows 131–133: DOWN after 16–22 sends of one op, 45–80 s, words held — never the tray)`,
    },
    {
      key: `relay | * @update`,
      code: `*`,
      as: `unclassified_transport`,
      retry: `bounded`,
      max: 3,
      today: `infinite`,
      flip: `infinite→bounded(3)→op_terminal`,
      note: "ANY FUTURE FrameSendError code: never `throw e` ⇒ unreachable for ever again. Today `throw e` ⇒ unreachable ⇒ unbounded; PR-A: a synthetic deny {reason:unclassified_transport, data:{was:<code>, layer:relay}} ⇒ bounded(3) ⇒ op_terminal + generic sentence + deny.class{source:default} counted.",
    },
  ],
  http: [
    {
      key: `http | 0 @update`,
      status: 0,
      as: `unreachable`,
      retry: `transient`,
      max: 30,
      today: `infinite`,
      flip: `infinite→transient(30)`,
      note: 'fetch() network TypeError / no status. Today `throw new Error("door <status>")` ⇒ unreachable ⇒ unbounded.',
    },
    {
      key: `http | 408 @update`,
      status: 408,
      as: `unreachable`,
      retry: `transient`,
      max: 30,
      today: `infinite`,
      flip: `infinite→transient(30)`,
      note: 'gateway / proxy transient. Today `throw new Error("door <status>")` ⇒ unreachable ⇒ unbounded.',
    },
    {
      key: `http | 429 @update`,
      status: 429,
      as: `unreachable`,
      retry: `transient`,
      max: 30,
      today: `infinite`,
      flip: `infinite→transient(30)`,
      note: 'httpx busy_retry `{error:busy, code:ledger-busy, retry:true}` + Retry-After (REST facades) — isBusyRefusal reads the ledger-busy code when it arrives as a value; a bare 429 is shed. Today `throw new Error("door <status>")` ⇒ unreachable ⇒ unbounded.',
    },
    {
      key: `http | 502 @update`,
      status: 502,
      as: `unreachable`,
      retry: `transient`,
      max: 30,
      today: `infinite`,
      flip: `infinite→transient(30)`,
      note: 'gateway / proxy transient. Today `throw new Error("door <status>")` ⇒ unreachable ⇒ unbounded.',
    },
    {
      key: `http | 503 @update`,
      status: 503,
      as: `unreachable`,
      retry: `transient`,
      max: 30,
      today: `infinite`,
      flip: `infinite→transient(30)`,
      note: '`{error:"door not mounted"}` (mux), DOOR_UNAVAILABLE_BODY (frame_role), opening — infra \'not now\'. Today `throw new Error("door <status>")` ⇒ unreachable ⇒ unbounded.',
    },
    {
      key: `http | 504 @update`,
      status: 504,
      as: `unreachable`,
      retry: `transient`,
      max: 30,
      today: `infinite`,
      flip: `infinite→transient(30)`,
      note: 'gateway / proxy transient. Today `throw new Error("door <status>")` ⇒ unreachable ⇒ unbounded.',
    },
    {
      key: `http | 401 unauthenticated @update`,
      status: 401,
      as: `forbidden`,
      sub: `unauthenticated`,
      retry: `rehandshake`,
      max: 2,
      today: `infinite`,
      flip: `infinite→3 sends (1 + REHANDSHAKE_MAX) ⇒ link DOWN signed_out under ONE line, nothing refused into the tray, liftable by a probe read answered (classify: rehandshake≤2→link_terminal{session}; the implemented end state is the liftable DOWN, not a latch)`,
      note: 'mux `{error:"session expired"}` / `{error:"unauthorized"}`, v3 `{error:"unauthorized"}`: an AUTHENTICATION state that heals when the person signs in — today thrown ⇒ unreachable ⇒ a 401 loop; PR-A: forbidden{why:unauthenticated, layer:http, was:http_401}.',
    },
    {
      key: `http | 403 role:editor @update`,
      status: 403,
      as: `forbidden`,
      sub: `role:editor`,
      verbs: [`update`],
      today: `op_terminal`,
      note: `httpAccessDeny: a 403 whose body is NOT an ack (gateway permission_error) is still the answer 'no access' on the write road ⇒ forbidden{why:role:editor, layer:http}. NOT on the mint (an auth blip would latch view-only).`,
    },
    {
      key: `http | 403 @create`,
      status: 403,
      as: `unclassified_transport`,
      verbs: [`create`, `read`, `query`, `delete`, `batch`, `access`],
      retry: `bounded`,
      max: 3,
      today: `infinite`,
      flip: `infinite→bounded(3)`,
      note: `403 with no verdict off the write road: today thrown ⇒ unreachable (the mint keeps its backoff); PR-A: bounded(3) — the mint road classifies it transient-capped (ctx.road mint).`,
    },
    {
      key: `http | 404 unborn {error} @update`,
      status: 404,
      error: `*`,
      as: `page_gone`,
      sub: `unborn`,
      verbs: [`update`],
      today: `bounded`,
      note: 'httpGoneDeny: the v3 route\'s own `404 {error:"no such project"}` (deleted, pre-genesis, or hidden — deny ≡ absent) ⇒ page_gone{maybe:unborn, layer:http}. ONLY a JSON body carrying `error`: an ingress/CDN 404 page is infra (row below). KIT: the klass column is the NEVER-SEATED context only — a page this life has neither read (no rev served) nor written (no ack): open a just-created page whose FIRST `read` is also answered this way (or not yet answered) and answer its `update` so; expect the same bytes re-sent on the unreachable backoff, UNBORN_RETRY_MAX=10 sends in all, then page_terminal `page_gone:unreached` (heal: allow on send k<10 ⇒ lands, no tray). Injected on the `update` of a page already READ or WRITTEN (seated — every ordinary rig page) it is `feLocal | page_gone unborn (seated)`: ONE send ⇒ page_terminal/deleted, identical to main.',
    },
    {
      key: `http | 410 {error} @update`,
      status: 410,
      error: `*`,
      as: `page_gone`,
      verbs: [`update`],
      today: `page_terminal`,
      note: `httpGoneDeny sure (nothing says 410 today).`,
    },
    {
      key: `http | 404 @update`,
      status: 404,
      as: `unreachable`,
      retry: `transient`,
      max: 30,
      today: `infinite`,
      flip: `infinite→transient(30)`,
      note: "a 404 with no `error` member (default-backend / CDN mid-deploy) or off the update road: infra, heals when the proxy does.",
    },
    {
      key: `http | 500 @update`,
      status: 500,
      as: `unclassified_transport`,
      retry: `bounded`,
      max: 3,
      today: `infinite`,
      flip: `infinite→bounded(3)→op_terminal`,
      note: 'glue UNCOMMITTED_500 `{error:"door failed", committed:false}` / mux `{error:internal}`: nothing committed; today thrown ⇒ unreachable ⇒ unbounded (heals a PG blip, or loops for ever on a poison row); PR-A: bounded(3) then terminal + counted. (F2: these bodies must NOT gain `verdict` — old FEs would flip roads.)',
    },
    {
      key: `http | 4xx @update`,
      status: `4xx`,
      as: `unclassified_transport`,
      retry: `bounded`,
      max: 3,
      today: `infinite`,
      flip: `infinite→bounded(3)→op_terminal`,
      note: "any other 4xx without a verdict body (400 `{error:\"invalid body\"}`, a proxy's 4xx): the same bytes hear the same status — bounded, never infinite. NOT a bodyless 413 / 422 on a write-road verb (`update`, the mint's `create`): those are the statuses the door replaces a write's answer under — a verdict lost, `{unreachable, lost, verdictLost}` (clientDoor.transportDoorOf), the lost class.",
    },
  ],
  feLocal: [
    {
      key: `feLocal | page_gone *`,
      reason: `page_gone`,
      sub: `*`,
      mintedBy: `clientDoor.relayGoneDeny/httpGoneDeny · opTransport PAGE_GONE_REPLY`,
      retry: `never`,
      scope: `page`,
      face: `deleted`,
      surfaces: `words`,
      words: `page_gone`,
      today: `page_terminal`,
      note: `the FE's ONE word for 'the door holds no such page' on a page this life SEATED (or a sure word): terminal for the transport's life.`,
    },
    {
      key: `feLocal | page_gone unborn`,
      reason: `page_gone`,
      sub: `unborn`,
      subKey: `maybe`,
      mintedBy: `clientDoor.relayGoneDeny/httpGoneDeny`,
      retry: `bounded`,
      scope: `page`,
      max: 10,
      floorMs: 0,
      after: {
        retry: `never`,
        scope: `page`,
        face: `unreached`,
      },
      surfaces: `quiet`,
      words: `page_gone:unreached`,
      today: `bounded`,
      note: `the AMBIGUOUS word on a page NEVER seated: the create window — the same bytes on the unreachable backoff UNBORN_RETRY_MAX=10 sends in all, then page_terminal{unreached}. ctx.seated ⇒ the row above.`,
    },
    {
      key: `feLocal | page_gone unreached`,
      reason: `page_gone`,
      sub: `unreached`,
      subKey: `why`,
      mintedBy: `opTransport setPageGone("unreached")`,
      retry: `never`,
      scope: `page`,
      rigSkip: true,
      rigWhy: `the transport's own output word / state (observe it, never inject it)`,
      face: `unreached`,
      surfaces: `words`,
      words: `page_gone:unreached`,
      today: `page_terminal`,
      note: `the create window's budget spent: 'could not be reached'.`,
    },
    {
      key: `feLocal | page_gone deleted`,
      reason: `page_gone`,
      sub: `deleted`,
      subKey: `why`,
      mintedBy: `opTransport PAGE_GONE_REPLY`,
      retry: `never`,
      scope: `page`,
      rigSkip: true,
      rigWhy: `the transport's own output word / state (observe it, never inject it)`,
      face: `deleted`,
      surfaces: `words`,
      words: `page_gone`,
      today: `page_terminal`,
      note: `call()'s short-circuit answer once the page is gone.`,
    },
    {
      key: `feLocal | node_gone *`,
      reason: `node_gone`,
      sub: `*`,
      mintedBy: `opTransport markNodeGone (NODE_GONE words)`,
      retry: `never`,
      scope: `node`,
      rigSkip: true,
      rigWhy: `the transport's own output word / state (observe it, never inject it)`,
      face: `node_gone`,
      surfaces: `words`,
      words: `node_gone`,
      today: `link_terminal`,
      note: `the door's gone{object:node} naming this link's node, worded for the host.`,
    },
    {
      key: `feLocal | verdict_lost *`,
      reason: `verdict_lost`,
      sub: `*`,
      mintedBy: `opTransport fly() VERDICT_LOST`,
      retry: `never`,
      scope: `op`,
      rigSkip: true,
      rigWhy: `the transport's own output word / state (observe it, never inject it)`,
      custody: `tray`,
      surfaces: `words`,
      words: `server_refused`,
      today: `op_terminal`,
      note: "a write whose answer the door REPLACED (413 `answer-too-large` / 422 `answer-unmaskable`) TWICE in a row under ONE opId: the first is a verdict lost (the same opId, the same bytes again — the replay of an allow is trimmed or faceless and fits), the second says it was a DENY whose reason word went with its body. ONE terminal refusal with custody (`boundOut`: the editor takes the words to the tray, the generic sentence); `data.was` names the replaced word, `data.maybeLanded:true` tells whoever offers a restore that the claim rests on the door's builds.",
    },
    {
      key: `feLocal | id_refused *`,
      reason: `id_refused`,
      sub: `*`,
      mintedBy: `opTransport ID_REFUSED`,
      retry: `never`,
      scope: `op`,
      rigSkip: true,
      rigWhy: `the transport's own output word / state (observe it, never inject it)`,
      custody: `tray`,
      surfaces: `words`,
      words: `id_refused`,
      today: `op_terminal`,
      note: "id_invalid{count|order} goes down under this word (outside every re-send road); the door's own rides under `room`.",
    },
    {
      key: `feLocal | busy ledger-busy`,
      reason: `busy`,
      sub: `ledger-busy`,
      subKey: `room`,
      mintedBy: `opTransport busyOut`,
      retry: `never`,
      scope: `op`,
      rigSkip: true,
      rigWhy: `the transport's own output word / state (observe it, never inject it)`,
      custody: `tray`,
      surfaces: `words`,
      words: `busy`,
      today: `op_terminal`,
      fixture: {
        data: {
          terminal: true,
          room: `ledger-busy`,
        },
      },
      note: "BUSY_RETRY_MAX busy answers ran out: the last one is the terminal refusal it now is — `busy{terminal, room:ledger-busy}`, the editor takes the words into ONE tray line.",
    },
    {
      key: `feLocal | block_changed *`,
      reason: `block_changed`,
      sub: `*`,
      mintedBy: `opTransport guardDeny`,
      retry: `never`,
      scope: `op`,
      rigSkip: true,
      rigWhy: `the transport's own output word / state (observe it, never inject it)`,
      custody: `tray`,
      surfaces: `words`,
      words: `block_changed`,
      today: `op_terminal`,
      fixture: {
        data: {
          why: `erase`,
        },
      },
      note: `a ranged erase / structural block op refused by the room's rev guard (guard_mismatch/stale/missing_guard): worded as 'someone typed inside your selection', why = the op.`,
    },
    {
      key: `feLocal | blob_unknown *`,
      reason: `blob_unknown`,
      sub: `*`,
      mintedBy: `opTransport blobDeny`,
      retry: `reread`,
      scope: `op`,
      rigSkip: true,
      rigWhy: `the transport's own output word / state (observe it, never inject it)`,
      after: `assert`,
      surfaces: `words`,
      words: `blob_unknown`,
      today: `reread_once`,
      note: `unknown_id/not_minted {kind:blob} renamed for every layer below (never a gone paragraph); why:paste for an html/markdown paste.`,
    },
    {
      key: `feLocal | not_applied *`,
      reason: `not_applied`,
      sub: `*`,
      mintedBy: `opTransport hollow`,
      retry: `reread`,
      scope: `op`,
      rigSkip: true,
      rigWhy: `the transport's own output word / state (observe it, never inject it)`,
      after: `assert`,
      surfaces: `words`,
      words: `not_applied`,
      today: `reread_once`,
      note: `an ALLOW that committed nothing of a words-carrying update: judged as the refusal it is (zero_error assert).`,
    },
    {
      key: `feLocal | denied *`,
      reason: `denied`,
      sub: `*`,
      mintedBy: 'opTransport fly() `rep.reason ?? "denied"`',
      retry: `bounded`,
      scope: `op`,
      rigSkip: true,
      rigWhy: `the transport's own output word / state (observe it, never inject it)`,
      max: 3,
      floorMs: 0,
      after: {
        retry: `never`,
        scope: `op`,
        custody: `tray`,
      },
      surfaces: `words`,
      words: `server_refused`,
      today: `reread_once`,
      flip: `assert→bounded(3)→op_terminal`,
      fixture: {
        data: {
          terminal: true,
          klass: `bounded`,
        },
      },
      note: `a deny with NO reason at all: unclassified by construction; worded (like every unrowed word) only on its terminal frame — the tray's line.`,
    },
    {
      key: `feLocal | refused *`,
      reason: `refused`,
      sub: `*`,
      mintedBy: 'opTransport streamRefused `ack.reason ?? "refused"`',
      retry: `never`,
      scope: `op`,
      rigSkip: true,
      rigWhy: `the transport's own output word / state (observe it, never inject it)`,
      custody: `none`,
      surfaces: `generic`,
      words: null,
      today: `op_terminal`,
      note: `stream road: a stream-refused event with no ack reason — the burst's deny frames go down, the room's picture replaces the words.`,
    },
    {
      key: `feLocal | unclassified_transport *`,
      reason: `unclassified_transport`,
      sub: `*`,
      mintedBy: `clientDoor transportDoorOf`,
      retry: `bounded`,
      scope: `op`,
      max: 3,
      floorMs: 0,
      after: {
        retry: `never`,
        scope: `op`,
        custody: `tray`,
      },
      surfaces: `words`,
      words: `server_refused`,
      today: `infinite`,
      flip: `infinite→bounded(3)→op_terminal`,
      fixture: {
        data: {
          was: `SOME_FUTURE_CODE`,
          layer: `relay`,
        },
      },
      note: "a relay code / HTTP status the table does not name, said as a VALUE instead of thrown: bounded(3) ⇒ op_terminal + OP_WORDS_GENERIC + one deny.class{source:default} per `was` per life. The breaker (I4) trips the link read-only after BREAKER_N across distinct opIds.",
    },
    {
      key: `feLocal | unavailable lane`,
      reason: `unavailable`,
      sub: `lane`,
      subKey: `why`,
      mintedBy: `frameShell/lane.ts cacheReadOf`,
      retry: `transient`,
      scope: `link`,
      max: 30,
      surfaces: `quiet`,
      words: `unavailable`,
      today: `infinite`,
      flip: `infinite→transient(30)`,
      note: `the Frame lane answers a READ it cannot carry off the cache, or says unavailable{why:lane}: the read road's backoff (gapRetry — capped in PR-A). Never carries data.retry (FE-minted).`,
    },
    {
      key: `feLocal | forbidden lane`,
      reason: `forbidden`,
      sub: `lane`,
      subKey: `why`,
      mintedBy: `frameShell/door.ts ACCESS_DEATHS`,
      retry: `never`,
      scope: `op`,
      custody: `tray`,
      surfaces: `words`,
      words: `forbidden`,
      today: `op_terminal`,
      note: `a lane DEAD for access (REVOKED / DENIED) answers every call with this value: RoomView's denied screen (oneshot road); under the prose transport the STATE road (update) / view-only (mint). Never carries data.retry.`,
    },
    {
      key: `feLocal | engine_mismatch *`,
      reason: `engine_mismatch`,
      sub: `*`,
      mintedBy: `legacy door spelling (close() ⇒ bad_request{enum}); STATE_DENY ∩ PAGE_BUG_DENY`,
      retry: `never`,
      scope: `op`,
      custody: `tray`,
      surfaces: `words`,
      words: `page_bug`,
      today: `op_terminal`,
      aliases: [`engine-mismatch`, `engine_unregistered`, `format_unsupported`],
      note: `the one word in BOTH families: a page-bug word that is also a STATE — THE BELT trays the words link-side (keepRescued), one sentence. Spec scope link; today op (§4 kept).`,
    },
    {
      key: `feLocal | schema_mismatch *`,
      reason: `schema_mismatch`,
      sub: `*`,
      mintedBy: `legacy door spelling; STATE_DENY`,
      retry: `never`,
      scope: `link`,
      face: `readonly`,
      surfaces: `words`,
      words: `schema_mismatch`,
      today: `op_terminal`,
      unwired: `link_terminal{readonly}: the link latch is not wired on the write road in P0-a (PR-C) — behaves as today: ONE send, ONE terminal deny with these words into the tray, the link NOT latched read-only, a row typed after it sent and refused the same; a READ so answered is not re-asked`,
      aliases: [`schema`],
      note: `this page is older than the document's format: read-only until reload (the sentence says so; today only the refused row is judged — the link is not latched).`,
    },
    {
      key: `feLocal | too_old *`,
      reason: `too_old`,
      sub: `*`,
      mintedBy: `opTransport read road (an engine older than EDITOR_ENGINE); STATE_DENY`,
      retry: `never`,
      scope: `link`,
      rigSkip: true,
      rigWhy: `the transport's own output word / state (observe it, never inject it)`,
      face: `too_old`,
      surfaces: `quiet`,
      words: null,
      today: `link_terminal`,
      note: `TOO_OLD: 'This document service is too old for this editor.' — the link halts read-only on the first picture; as a deny word it is a STATE.`,
    },
    {
      key: `feLocal | limit *`,
      reason: `limit`,
      sub: `*`,
      mintedBy: `opTransport pre-check (limits.ts) zeroErrored law_local`,
      retry: `never`,
      scope: `op`,
      rigSkip: true,
      rigWhy: `the transport's own output word / state (observe it, never inject it)`,
      custody: `unsynced`,
      surfaces: `words`,
      words: `limit`,
      today: `op_terminal`,
      fixture: {
        data: `leaf_chars:20000:20001`,
      },
      note: "a LAW this page's own table stopped before anything flew: `limit` + `<law>:<limit>:<actual>` — the sentence names the number (opWords parseLimit).",
    },
    {
      key: `feLocal | parent_gone *`,
      reason: `parent_gone`,
      sub: `*`,
      mintedBy:
        "legacy engine word (the TS room engine); opPlugin GONE road (`GONE_WORDS ∪ parent_gone`)",
      retry: `reread`,
      scope: `op`,
      after: `assert`,
      surfaces: `silent`,
      words: null,
      today: `reread_once`,
      note: `a block whose PARENT ended: a concurrency word the editor's zero-error road owns (zeroError.test 'class (a)'), never the fallback.`,
    },
    {
      key: `feLocal | repeat *`,
      reason: `repeat`,
      sub: `*`,
      mintedBy: `opPlugin (a local refusal: the room's last refusal derived again byte for byte)`,
      retry: `reread`,
      scope: `op`,
      rigSkip: true,
      rigWhy: `an editor-local word (opPlugin), never on the wire`,
      after: `assert`,
      surfaces: `silent`,
      words: null,
      today: `reread_once`,
      note: `the EDITOR's own word, handed to itself as a deny frame; listed so a door that ever echoes it stays on the zero-error road.`,
    },
    {
      key: `feLocal | unsupported_edit *`,
      reason: `unsupported_edit`,
      sub: `*`,
      mintedBy: `opPlugin toast (lower.ts skip kinds)`,
      retry: `reread`,
      scope: `op`,
      rigSkip: true,
      rigWhy: `an editor-local word (opPlugin), never on the wire`,
      after: `assert`,
      surfaces: `words`,
      words: `unsupported_edit`,
      today: `reread_once`,
      aliases: [`unsupported`],
      note: `the editor's word for an edit it cannot lower; as a door answer (the TS engine's) it is the zero-error road's.`,
    },
    {
      key: `feLocal | container_deleted *`,
      reason: `container_deleted`,
      sub: `*`,
      mintedBy:
        "a door NOTICE word on an allow's `retired` member (the container another hand deleted / replaced) — opPlugin reads `m.reason`; never a deny's reason",
      retry: `reread`,
      scope: `op`,
      rigSkip: true,
      rigWhy: `an allow's NOTICE word, never a deny's reason`,
      after: `assert`,
      surfaces: `silent`,
      words: null,
      today: `reread_once`,
      note: "listed so the inverse guard (every `reason ===` literal has a row) holds; were a door ever to DENY with it, the zero-error road — never the fallback.",
    },
    {
      key: `feLocal | container_replaced *`,
      reason: `container_replaced`,
      sub: `*`,
      mintedBy:
        "a door NOTICE word on an allow's `retired` member (the container another hand deleted / replaced) — opPlugin reads `m.reason`; never a deny's reason",
      retry: `reread`,
      scope: `op`,
      rigSkip: true,
      rigWhy: `an allow's NOTICE word, never a deny's reason`,
      after: `assert`,
      surfaces: `silent`,
      words: null,
      today: `reread_once`,
      note: "listed so the inverse guard (every `reason ===` literal has a row) holds; were a door ever to DENY with it, the zero-error road — never the fallback.",
    },
    {
      key: `feLocal | swapped *`,
      reason: `swapped`,
      sub: `*`,
      mintedBy:
        "a door NOTICE code on an allow's `swapped` member (the paragraph another hand swapped out, P → P′) — opPlugin lifts my words at P's grave and keys that lift's `home.reason` on it; never a deny's reason",
      retry: `reread`,
      scope: `op`,
      rigSkip: true,
      rigWhy: `an allow's NOTICE code / an editor-local lift reason, never a deny's reason`,
      after: `assert`,
      surfaces: `silent`,
      words: null,
      today: `reread_once`,
      note: "listed so the inverse guard (every `reason ===` literal has a row) holds; were a door ever to DENY with it, the zero-error road — never the fallback.",
    },
    {
      key: `feLocal | frozen *`,
      reason: `frozen`,
      sub: `*`,
      mintedBy: `opPlugin breaker / STREAM_LAW_WORDS`,
      retry: `never`,
      scope: `op`,
      rigSkip: true,
      rigWhy: `an editor-local word (opPlugin), never on the wire`,
      custody: `none`,
      surfaces: `words`,
      words: `frozen`,
      today: `op_terminal`,
      aliases: [`doc_gone`, `deleted`],
      note: `stream road law-side words (substrate): the burst is refused, deny frames go down.`,
    },
  ],
  fallback: {
    retry: `bounded`,
    scope: `op`,
    max: 3,
    floorMs: 0,
    after: {
      retry: `never`,
      scope: `op`,
      custody: `tray`,
    },
    surfaces: `words`,
    words: `server_refused`,
    note: 'I3 — reason ∉ (reasons ∪ feLocal ∪ their aliases) and no data.retry from a door-printed body: bounded(UNKNOWN_RETRY_MAX=3) ⇒ op_terminal + the tray\'s `server_refused` sentence (opWords words the terminal frame by its `klass:bounded` + `terminal`) + one deny.class{source:"default", reason} per reason per life. Never unreachable, never assert, never silent. Today: a verdict-less/throwing answer ⇒ unreachable ⇒ retried for ever; an unknown deny WORD ⇒ zero_error assert→unsynced (silent).',
  },
};
var UNKNOWN_RETRY_MAX: Dynamic =
  refusalContractSeed.constants.UNKNOWN_RETRY_MAX;
var TRANSIENT_RETRY_MAX: Dynamic =
  refusalContractSeed.constants.TRANSIENT_RETRY_MAX;
var LOST_RETRY_MAX: Dynamic = refusalContractSeed.constants.LOST_RETRY_MAX;
var BREAKER_N: Dynamic = refusalContractSeed.constants.BREAKER_N;
var REDIAL_AT: Dynamic = refusalContractSeed.constants.REDIAL_AT;
var REHANDSHAKE_MAX: Dynamic = refusalContractSeed.constants.REHANDSHAKE_MAX;
var refusalReasonRows: Dynamic = refusalContractSeed.reasons;
var frontendRefusalRows: Dynamic = refusalContractSeed.feLocal;
var relayRefusalRows: Dynamic = refusalContractSeed.relay;
var httpRefusalRows: Dynamic = refusalContractSeed.http;
var fallbackRefusalRow: Dynamic = refusalContractSeed.fallback;
/* Subsystem: refusal-contract */
new (Set as Dynamic)([
  ...refusalContractSeed.door.final,
  ...refusalContractSeed.door.door,
  ...refusalContractSeed.door.keptOutside,
  ...refusalContractSeed.door.vocabExtra,
  ...refusalContractSeed.door.raw,
]);
var doorSubreasons: Dynamic = refusalContractSeed.door.subs;
var isRecord: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): boolean => typeof input == `object` && !!input && !Array.isArray(input);
var stringOrUndefined: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): string | undefined => (typeof input == `string` ? input : undefined);
var frontendTransportLayers: Dynamic = new (Set as Dynamic)([
  `relay`,
  `http`,
  `link`,
  `lane`,
]);
var allowedRetryKinds: Dynamic = new (Set as Dynamic)([
  `never`,
  `reread`,
  `rehandshake`,
  `counter`,
  `bounded`,
  `transient`,
  `lost`,
]);
var allowedRefusalScopes: Dynamic = new (Set as Dynamic)([
  `op`,
  `node`,
  `link`,
  `page`,
  `session`,
]);
var accessTerminalReasons: Dynamic = new (Set as Dynamic)([
  `access`,
  `forbidden`,
  `not_allowed`,
  `read_only`,
]);
var pageGoneCertainty: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => {
  if (input.verdict !== `deny`) return null;
  let value: Dynamic = isRecord(input.data) ? input.data : {};
  return (input.reason === `gone` || value.code === `gone`) &&
    value.object === `project`
    ? {
        sure: true,
      }
    : value.code !== `page_gone` && input.reason !== `page_gone`
      ? null
      : {
          sure: value.maybe !== `unborn`,
        };
};
var isNodeGoneReply: Dynamic = (
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): boolean => {
  if (input.verdict !== `deny`) return false;
  let value: Dynamic = isRecord(input.data) ? input.data : {};
  return (
    (input.reason === `gone` || value.code === `gone`) &&
    value.object === `node` &&
    (value.id === undefined || value.id === options)
  );
};
var ledgerConflictDetail: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): null | number => {
  if (input.verdict !== `deny` || isDataOperationControlDeny2(input))
    return null;
  let value: Dynamic = isRecord(input.data) ? input.data : {};
  let value2: string = [input.detail, value.detail, value.message]
    .filter(
      (input2?: Dynamic, ..._extraArguments: unknown[]) =>
        typeof input2 == `string`,
    )
    .join(` `)
    .trim();
  let value3: string = String(value.code ?? input.code ?? ``);
  if (
    !(
      (input.reason === `conflict` && /^ledger[-_]busy/.test(value2)) ||
      /^ledger[-_]busy$/.test(value3) ||
      (input.error === `busy` && /ledger[-_]busy/.test(value3))
    )
  )
    return null;
  let value4: number = Number(value.retryAfterMs ?? input.retryAfterMs ?? 0);
  return Number.isFinite(value4) && value4 > 0 ? value4 : 0;
};
var reasonSubreasonKey = (
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) => `${input}\u0000${options}`;
var refusalRowsByReason: Dynamic = new (Map as Dynamic)();
var refusalAliases: Dynamic = new (Map as Dynamic)();
/* Subsystem: classification */
for (let [value, value2] of [
  [refusalReasonRows, false],
  [frontendRefusalRows, true],
] as Dynamic)
  for (let value3 of value as Dynamic) {
    if (
      !refusalRowsByReason.has(reasonSubreasonKey(value3.reason, value3.sub))
    ) {
      refusalRowsByReason.set(reasonSubreasonKey(value3.reason, value3.sub), {
        row: value3,
        local: value2,
      });
    }
    for (let value4 of (value3.aliases ?? []) as Dynamic)
      if (!refusalAliases.has(value4)) {
        refusalAliases.set(value4, {
          reason: value3.reason,
          ...(value3.sub === `*`
            ? {}
            : {
                sub: value3.sub,
              }),
        });
      }
  }
var subreasonFieldOrder: Dynamic = [
  `why`,
  `problem`,
  `object`,
  `kind`,
  `need`,
  `dim`,
  `maybe`,
  `room`,
];
var resolveReasonRow: Dynamic = (
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => {
  if (context !== undefined) {
    let entry2: Dynamic = refusalRowsByReason.get(
      reasonSubreasonKey(input, context),
    );
    if (entry2)
      return {
        ...entry2,
        sub: context,
      };
  }
  if (typeof options.was == `string`) {
    let entry2: Dynamic = refusalRowsByReason.get(
      reasonSubreasonKey(input, options.was),
    );
    if (entry2 && entry2.row.subKey === `was`)
      return {
        ...entry2,
        sub: options.was,
      };
  }
  if (typeof options.why == `string` && typeof options.need == `string`) {
    let entry2: Dynamic = refusalRowsByReason.get(
      reasonSubreasonKey(input, `${options.why}:${options.need}`),
    );
    if (entry2)
      return {
        ...entry2,
        sub: `${options.why}:${options.need}`,
      };
  }
  for (let value of subreasonFieldOrder as Dynamic) {
    let value2: Dynamic = options[value];
    if (typeof value2 != `string` && typeof value2 != `number`) continue;
    let entry2: Dynamic = refusalRowsByReason.get(
      reasonSubreasonKey(input, String(value2)),
    );
    if (entry2 && (entry2.row.subKey ?? `why`) === value)
      return {
        ...entry2,
        sub: String(value2),
      };
  }
  let entry: Dynamic = refusalRowsByReason.get(reasonSubreasonKey(input, `*`));
  return entry
    ? {
        ...entry,
      }
    : null;
};
var resolveReasonAlias: Dynamic = (
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => {
  if (input === undefined || input === ``) return null;
  let value: Dynamic = resolveReasonRow(input, options);
  if (value)
    return {
      ...value,
      via: input,
    };
  let entry: Dynamic = refusalAliases.get(input);
  if (!entry) return null;
  let value2: Dynamic = resolveReasonRow(entry.reason, options, entry.sub);
  return value2
    ? {
        ...value2,
        via: input,
      }
    : null;
};
var normalizePageTerminalFace: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  input === `unreached` ||
  input === `view_only` ||
  input === `not_governed` ||
  input === `cmek`
    ? input
    : `deleted`;
var normalizeLinkTerminalFace: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  input === `node_gone` ||
  input === `unreached` ||
  input === `session` ||
  input === `too_old`
    ? input
    : `readonly`;
var normalizeOperationCustody: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => (input === `unsynced` || input === `none` ? input : `tray`);
var defaultRetryLimit: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  input === `transient`
    ? TRANSIENT_RETRY_MAX
    : input === `lost`
      ? LOST_RETRY_MAX
      : input === `rehandshake`
        ? REHANDSHAKE_MAX
        : input === `counter`
          ? 1
          : UNKNOWN_RETRY_MAX;
var normalizeAfterRetry: Dynamic = (
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  classifyRetryContract(
    input === undefined || input === `assert`
      ? {
          retry: `never`,
          scope: options,
          custody: `tray`,
        }
      : input,
  );
var classifyRetryContract: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => {
  switch (input.retry) {
    case `never`:
      return input.scope === `page`
        ? {
            k: `page_terminal`,
            face: normalizePageTerminalFace(input.face),
          }
        : input.scope === `link` || input.scope === `session`
          ? {
              k: `link_terminal`,
              face: normalizeLinkTerminalFace(input.face),
            }
          : input.scope === `node`
            ? {
                k: `link_terminal`,
                face: `node_gone`,
              }
            : {
                k: `op_terminal`,
                custody: normalizeOperationCustody(input.custody),
              };
    case `reread`:
      return {
        k: `reread_once`,
        after: `assert`,
      };
    case `counter`:
      return {
        k: `counter`,
      };
    case `rehandshake`:
      return {
        k: `rehandshake`,
        max: input.max ?? REHANDSHAKE_MAX,
        after: normalizeAfterRetry(input.after, `op`),
      };
    case `bounded`:
      return {
        k: `bounded`,
        max: input.max ?? UNKNOWN_RETRY_MAX,
        floorMs: input.floorMs ?? 0,
        after: normalizeAfterRetry(input.after, input.scope),
        redial: input.redial === true,
      };
    case `transient`:
      return {
        k: `transient`,
        max: input.max ?? TRANSIENT_RETRY_MAX,
        redial: input.redial === true,
      };
    case `lost`:
      return {
        k: `lost`,
        max: input.max ?? LOST_RETRY_MAX,
      };
  }
};
var scopeOfClassification: Dynamic = (
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  input.k === `page_terminal`
    ? `page`
    : input.k === `link_terminal`
      ? input.face === `node_gone`
        ? `node`
        : `link`
      : input.k === `rehandshake`
        ? `session`
        : input.k === `transient` || input.k === `lost`
          ? `link`
          : options;
var isTerminalScope: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): boolean => input === `page` || input === `link` || input === `node`;
var adaptClassificationToRoad: Dynamic = (
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  value?: Dynamic,
  extra: Dynamic = `table`,
  ..._extraArguments: unknown[]
): Dynamic => {
  if (context === `write`) return input;
  let value2: Dynamic =
    isTerminalScope(options) &&
    (input.k === `page_terminal` || input.k === `link_terminal`);
  let value3: boolean =
    input.k === `transient` || input.k === `lost` || input.k === `bounded`;
  switch (context) {
    case `mint`:
      return input.k === `page_terminal`
        ? input
        : accessTerminalReasons.has(value) &&
            extra !== `http` &&
            extra !== `relay`
          ? {
              k: `page_terminal`,
              face: `view_only`,
            }
          : value === `unreachable` ||
              value === `page_gone` ||
              ((extra === `http` || extra === `relay`) &&
                (value3 || input.k === `rehandshake`))
            ? input.k === `rehandshake`
              ? input
              : {
                  k: `transient`,
                  max: TRANSIENT_RETRY_MAX,
                  redial: input.k === `transient` && input.redial,
                }
            : value2
              ? input
              : {
                  k: `op_terminal`,
                  custody: `none`,
                };
    case `read`:
      return value2
        ? input
        : value === `gone` || value === `page_gone`
          ? {
              k: `op_terminal`,
              custody: `none`,
            }
          : value === `forbidden` && input.k === `op_terminal`
            ? {
                k: `link_terminal`,
                face: `readonly`,
              }
            : {
                k: `transient`,
                max: TRANSIENT_RETRY_MAX,
                redial: input.k === `transient` && input.redial,
              };
    case `presence`:
      return value2
        ? input
        : {
            k: `op_terminal`,
            custody: `none`,
          };
    case `stream`:
      return value2
        ? input
        : input.k === `transient` || input.k === `lost`
          ? {
              k: `transient`,
              max: TRANSIENT_RETRY_MAX,
              redial: input.k === `transient` && input.redial,
            }
          : input.k === `bounded`
            ? input
            : {
                k: `op_terminal`,
                custody: `none`,
              };
    case `oneshot`:
      return value3
        ? {
            k: `transient`,
            max: 1,
            redial: false,
          }
        : value2
          ? input
          : {
              k: `op_terminal`,
              custody: `none`,
            };
  }
};
var attachRefusalMetadata: Dynamic = (
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  value?: Dynamic,
  extra?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => ({
  ...input,
  reason: context,
  ...(extra === undefined
    ? {}
    : {
        sub: extra,
      }),
  source: value,
  scope: scopeOfClassification(input, options?.scope ?? `op`),
  words: options?.words ?? null,
  surfaces: options?.surfaces ?? `generic`,
});
function classifyRefusal(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = classifyRefusalCore(input, options);
  return options.road === `write` && options.replayed === true
    ? {
        ...value,
        ...adjustReplayedWriteCustody(value),
      }
    : value;
}
var adjustReplayedWriteCustody: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  input.k === `reread_once` ||
  (input.k === `op_terminal` && input.custody === `unsynced`)
    ? {
        k: `op_terminal`,
        custody: `tray`,
      }
    : input.k === `rehandshake` || input.k === `bounded`
      ? {
          ...input,
          after: adjustReplayedWriteCustody(input.after),
        }
      : input;
function classifyRefusalCore(
  state?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let road: Dynamic = options.road;
  let value: Dynamic = isRecord(state.data) ? state.data : {};
  if (state.verdict === `allow`)
    return attachRefusalMetadata(
      {
        k: `op_terminal`,
        custody: `none`,
      },
      null,
      `allow`,
      `local`,
    );
  if (state.verdict !== `deny`) {
    let value7: string = `unreachable`;
    return state.reopens === true
      ? attachRefusalMetadata(
          adaptClassificationToRoad(
            {
              k: `transient`,
              max: TRANSIENT_RETRY_MAX,
              redial: false,
            },
            `link`,
            road,
            value7,
          ),
          {
            scope: `link`,
            words: `offline`,
            surfaces: `quiet`,
          },
          value7,
          `local`,
          `reopens`,
        )
      : state.hung === true || state.lost === true
        ? attachRefusalMetadata(
            adaptClassificationToRoad(
              {
                k: `lost`,
                max: LOST_RETRY_MAX,
              },
              `link`,
              road,
              value7,
            ),
            {
              scope: `link`,
              words: `offline`,
              surfaces: `quiet`,
            },
            value7,
            `local`,
            state.hung === true ? `hung` : `lost`,
          )
        : attachRefusalMetadata(
            adaptClassificationToRoad(
              {
                k: `transient`,
                max: TRANSIENT_RETRY_MAX,
                redial: false,
              },
              `link`,
              road,
              value7,
            ),
            {
              scope: `link`,
              words: `offline`,
              surfaces: `quiet`,
            },
            value7,
            `local`,
          );
  }
  let value2: Dynamic = stringOrUndefined(state.reason) ?? `denied`;
  let value3: Dynamic = stringOrUndefined(value.layer);
  let value4: boolean =
    value3 === undefined || !frontendTransportLayers.has(value3);
  if (
    value4 &&
    typeof value.retry != `string` &&
    (value.transient === true || state.transient === true)
  ) {
    let value7: Dynamic = resolveReasonAlias(value2, value);
    return attachRefusalMetadata(
      adaptClassificationToRoad(
        {
          k: `transient`,
          max: TRANSIENT_RETRY_MAX,
          redial: false,
        },
        `link`,
        road,
        value2,
      ),
      value7?.row ?? {
        scope: `link`,
        words: null,
        surfaces: `quiet`,
      },
      value2,
      `wire`,
      `transient`,
    );
  }
  if (
    value4 &&
    typeof value.retry == `string` &&
    allowedRetryKinds.has(value.retry)
  ) {
    let value7: Dynamic =
      typeof value.scope == `string` && allowedRefusalScopes.has(value.scope)
        ? value.scope
        : `op`;
    let retry: Dynamic = value.retry;
    let value8: Dynamic =
      typeof value.max == `number` && value.max > 0
        ? value.max
        : typeof value.retryMax == `number` && value.retryMax > 0
          ? value.retryMax
          : defaultRetryLimit(retry);
    let value9: Dynamic = resolveReasonAlias(value2, value);
    return attachRefusalMetadata(
      adaptClassificationToRoad(
        classifyRetryContract({
          retry: retry,
          scope: value7,
          max: value8,
          redial: value.redial === true,
          face: stringOrUndefined(value.face),
          custody: stringOrUndefined(value.custody),
        }),
        value7,
        road,
        value2,
      ),
      value9?.row ?? {
        scope: value7,
        words: null,
        surfaces: `generic`,
      },
      value2,
      `wire`,
      value9?.sub,
    );
  }
  let value5: Dynamic = pageGoneCertainty(state);
  if (value5 !== null) {
    let value7: boolean = options.seated === true;
    if (value5.sure || value7) {
      let value8: boolean =
        (state.reason === `gone` || value.code === `gone`) &&
        value.object === `project`;
      let value9: string = value.why === `unreached` ? `unreached` : `deleted`;
      let value10: Dynamic = value8
        ? refusalRowsByReason.get(reasonSubreasonKey(`gone`, `project`))
        : (refusalRowsByReason.get(reasonSubreasonKey(`page_gone`, value9)) ??
          refusalRowsByReason.get(reasonSubreasonKey(`page_gone`, `*`)));
      return attachRefusalMetadata(
        adaptClassificationToRoad(
          {
            k: `page_terminal`,
            face: value9,
          },
          `page`,
          road,
          `page_gone`,
        ),
        value10?.row ?? null,
        value8 ? `gone` : `page_gone`,
        value8 ? `table` : `local`,
        value8 ? `project` : stringOrUndefined(value.why),
      );
    }
    let entry: Dynamic = refusalRowsByReason.get(
      reasonSubreasonKey(`page_gone`, `unborn`),
    );
    return attachRefusalMetadata(
      adaptClassificationToRoad(
        classifyRetryContract(entry.row),
        `page`,
        road,
        `page_gone`,
      ),
      entry.row,
      `page_gone`,
      `local`,
      `unborn`,
    );
  }
  if (isNodeGoneReply(state, options.node)) {
    let entry: Dynamic = refusalRowsByReason.get(
      reasonSubreasonKey(`gone`, `node`),
    );
    return attachRefusalMetadata(
      adaptClassificationToRoad(
        {
          k: `link_terminal`,
          face: `node_gone`,
        },
        `node`,
        road,
        `gone`,
      ),
      entry.row,
      `gone`,
      `table`,
      `node`,
    );
  }
  if (
    value.terminal === true &&
    (value2 === `busy` || value.room === `ledger-busy`)
  ) {
    let entry: Dynamic = refusalRowsByReason.get(
      reasonSubreasonKey(`busy`, `ledger-busy`),
    );
    return attachRefusalMetadata(
      adaptClassificationToRoad(
        classifyRetryContract(entry.row),
        `op`,
        road,
        `busy`,
      ),
      entry.row,
      `busy`,
      `local`,
      `terminal`,
    );
  }
  if (ledgerConflictDetail(state) !== null) {
    let entry: Dynamic = refusalRowsByReason.get(
      reasonSubreasonKey(`conflict`, `*`),
    );
    let value7: string =
      value3 === `relay` ? `relay` : value3 === `http` ? `http` : `table`;
    return attachRefusalMetadata(
      adaptClassificationToRoad(
        classifyRetryContract(entry.row),
        `op`,
        road,
        `conflict`,
        value7,
      ),
      entry.row,
      `conflict`,
      value7,
      `ledger-busy`,
    );
  }
  if (value2 === `conflict`) {
    let entry: Dynamic = refusalRowsByReason.get(
      reasonSubreasonKey(`conflict`, `*`),
    );
    return isDataOperationControlDeny2(state) || state.status === 409
      ? attachRefusalMetadata(
          adaptClassificationToRoad(
            {
              k: `lost`,
              max: LOST_RETRY_MAX,
            },
            `link`,
            road,
            `conflict`,
          ),
          {
            scope: `link`,
            words: null,
            surfaces: `quiet`,
          },
          `conflict`,
          `table`,
          `unknown`,
        )
      : attachRefusalMetadata(
          adaptClassificationToRoad(
            {
              k: `reread_once`,
              after: `assert`,
            },
            `op`,
            road,
            `conflict`,
          ),
          {
            ...entry.row,
            words: null,
            surfaces: `generic`,
          },
          `conflict`,
          `table`,
          `other`,
        );
  }
  if (sessionRefusalPattern.test(`${value2} ${String(value.code)}`))
    return classifySessionRefusal(state, value, options, value2);
  if (resolveDataOperationControlIdInvalid(state, value))
    return classifyInvalidIds(state, value, options);
  if (
    value2 === `index_gap` ||
    value.code === `index_gap` ||
    refusalAliases.get(value2)?.reason === `index_gap`
  ) {
    let entry: Dynamic = refusalRowsByReason.get(
      reasonSubreasonKey(`index_gap`, `*`),
    );
    return attachRefusalMetadata(
      adaptClassificationToRoad(
        [value.nextIndex, state.nextIndex].some(
          (input?: Dynamic, ..._extraArguments: unknown[]) =>
            typeof input == `number`,
        )
          ? {
              k: `counter`,
            }
          : {
              k: `reread_once`,
              after: `assert`,
            },
        `op`,
        road,
        `index_gap`,
      ),
      entry.row,
      `index_gap`,
      `table`,
    );
  }
  let value6: Dynamic =
    (value2 === `bad_request`
      ? resolveReasonAlias(stringOrUndefined(value.was), value)
      : null) ??
    resolveReasonAlias(stringOrUndefined(value.code), value) ??
    resolveReasonAlias(value2, value);
  if (
    value6 &&
    value6.row.reason === `unavailable` &&
    value6.sub === `room` &&
    /^busy:/i.test(
      stringOrUndefined(state.detail) ?? stringOrUndefined(value.detail) ?? ``,
    )
  ) {
    let entry: Dynamic = refusalRowsByReason.get(
      reasonSubreasonKey(`unavailable`, `busy`),
    );
    if (entry) {
      value6 = {
        ...value6,
        row: entry.row,
        sub: `busy`,
      };
    }
  }
  if (value6) {
    let value7: string =
      value3 === `relay`
        ? `relay`
        : value3 === `http`
          ? `http`
          : value6.local
            ? `local`
            : `table`;
    let value8: Dynamic = classifyRetryContract(value6.row);
    if (
      value6.row.reason === `gone` &&
      value6.row.sub === `*` &&
      typeof value.object != `string`
    ) {
      value8 = {
        k: `reread_once`,
        after: `assert`,
      };
    }
    return value6.row.reason === `gone` && value6.row.sub === `node`
      ? attachRefusalMetadata(
          adaptClassificationToRoad(
            {
              k: `op_terminal`,
              custody: `tray`,
            },
            `op`,
            road,
            `gone`,
            value7,
          ),
          refusalRowsByReason.get(reasonSubreasonKey(`gone`, `*`))?.row ??
            value6.row,
          `gone`,
          value7,
          stringOrUndefined(value.object),
        )
      : attachRefusalMetadata(
          adaptClassificationToRoad(
            value8,
            value6.row.scope,
            road,
            value6.row.reason,
            value7,
          ),
          value6.row,
          value6.row.reason,
          value7,
          value6.sub,
        );
  }
  return attachRefusalMetadata(
    adaptClassificationToRoad(
      classifyRetryContract(fallbackRefusalRow),
      `op`,
      road,
      value2,
      `default`,
    ),
    {
      scope: `op`,
      words: null,
      surfaces: `generic`,
    },
    value2,
    `default`,
  );
}
var sessionRefusalPattern: Dynamic =
  /not_your_session|unknown_secret|unknown_session/;
var askedIdHasSession: Dynamic = (
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): boolean => {
  let value: Dynamic =
    options.asked ??
    options.newBid ??
    (options.field === `ids` ? options.start : undefined) ??
    input.asked;
  return typeof value == `string`
    ? /^[^.\s]+\.\d+$/.test(value) && !value.startsWith(`_.`)
    : typeof value == `object` && !!value && typeof value.sess == `string`;
};
function classifySessionRefusal(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  value?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value2: Dynamic = options.why ?? input.why;
  let value3: boolean =
    value2 == null ||
    value2 === `unknown_secret` ||
    value2 === `unknown_session`;
  let value4: Dynamic =
    context.replayed === true &&
    /not_your_session/.test(value + ` ` + String(options.code)) &&
    askedIdHasSession(input, options);
  let value5: Dynamic =
    typeof value2 == `string`
      ? value2
      : value !== `not_your_session` &&
          refusalRowsByReason.has(reasonSubreasonKey(`not_your_session`, value))
        ? value
        : undefined;
  let value6: Dynamic =
    (value5 !== undefined &&
      refusalRowsByReason.get(
        reasonSubreasonKey(`not_your_session`, value5),
      )) ||
    refusalRowsByReason.get(
      reasonSubreasonKey(`not_your_session`, value3 ? `unknown_secret` : `*`),
    );
  return attachRefusalMetadata(
    adaptClassificationToRoad(
      value3 || value4
        ? {
            k: `rehandshake`,
            max: REHANDSHAKE_MAX,
            after: {
              k: `op_terminal`,
              custody: `tray`,
            },
          }
        : {
            k: `op_terminal`,
            custody: `tray`,
          },
      `op`,
      context.road,
      `not_your_session`,
    ),
    value6.row,
    `not_your_session`,
    `table`,
    value5,
  );
}
function classifyInvalidIds(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let road: Dynamic = context.road;
  let value: string = `${String(options.detail)} ${String(input.detail)} ${String(options.message)} ${String(input.reason)}`;
  let value2: Dynamic =
    stringOrUndefined(options.why) ??
    /\bproposed ids: ([a-z_]+)/.exec(value)?.[1];
  let value3: Dynamic =
    (value2 !== undefined &&
      refusalRowsByReason.get(reasonSubreasonKey(`id_invalid`, value2))) ||
    refusalRowsByReason.get(reasonSubreasonKey(`id_invalid`, `*`));
  let value4: Dynamic = (
    input2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    attachRefusalMetadata(
      adaptClassificationToRoad(input2, `op`, road, `id_invalid`),
      value3.row,
      `id_invalid`,
      `table`,
      value2,
    );
  let value5: boolean = value2 === `count` || value2 === `order`;
  if (
    !value5 &&
    ((value2 === `prefix` && typeof options.want_prefix == `string`) ||
      (value2 === `shape` &&
        typeof options.got == `string` &&
        options.got.startsWith(`_.`)) ||
      /proposed ids: prefix/.test(value))
  )
    return value4({
      k: `rehandshake`,
      max: REHANDSHAKE_MAX,
      after: {
        k: `reread_once`,
        after: `assert`,
      },
    });
  if (value5)
    return context.replayed === true
      ? value4({
          k: `op_terminal`,
          custody: `tray`,
        })
      : (context.kStart ?? 0) > 0
        ? value4({
            k: `reread_once`,
            after: `assert`,
          })
        : attachRefusalMetadata(
            adaptClassificationToRoad(
              {
                k: `op_terminal`,
                custody: `tray`,
              },
              `op`,
              road,
              `id_invalid`,
            ),
            {
              ...value3.row,
              words: `id_refused`,
            },
            `id_invalid`,
            `table`,
            value2,
          );
  if (value2 === `shape` && context.lost === true)
    return value4({
      k: `op_terminal`,
      custody: `tray`,
    });
  if (value2 === `used` || value2 === `gap`) {
    let value6: Dynamic = options.next_free ?? input.next_free;
    let value7: Dynamic =
      typeof options.got == `string` ? parseBlockId(options.got) : null;
    let value8: Dynamic =
      typeof value6 == `string` ? parseBlockId(value6) : null;
    let value9: boolean =
      value2 === `used` &&
      !!value7 &&
      !!value8 &&
      value7.sess === value8.sess &&
      value8.i <= value7.i;
    if (value6 !== undefined && !value9)
      return value4({
        k: `counter`,
      });
  }
  return value4(
    context.replayed === true
      ? {
          k: `op_terminal`,
          custody: `tray`,
        }
      : {
          k: `reread_once`,
          after: `assert`,
        },
  );
}
var parseBlockId: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => {
  let value: Dynamic = input.lastIndexOf(`.`);
  if (value <= 0) return null;
  let value2: number = Number(input.slice(value + 1));
  return Number.isInteger(value2)
    ? {
        sess: input.slice(0, value),
        i: value2,
      }
    : null;
};
function relayRowForCode(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = input.startsWith(`DEAD:`);
  let value2: Dynamic;
  for (let value3 of relayRefusalRows as Dynamic)
    if (!(value3.verbs && !value3.verbs.includes(options))) {
      if (value3.code === `*`) value2 ??= value3;
      else if (value3.code === input || (value && value3.code === `DEAD:*`))
        return value3;
    }
  return value2;
}
function httpRowForStatus(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = isRecord(options) && typeof options.error == `string`;
  let value2: Dynamic;
  for (let value3 of httpRefusalRows as Dynamic)
    if (
      !(value3.verbs && !value3.verbs.includes(context)) &&
      !(value3.error !== undefined && !value)
    ) {
      if (value3.status === input) return value3;
      if (value3.status === `4xx` && input >= 400 && input < 500) {
        value2 ??= value3;
      }
    }
  return (
    value2 ??
    httpRefusalRows.find(
      (state?: Dynamic, ..._extraArguments: unknown[]) => state.status === 0,
    )
  );
}
function relayRowToReply(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return input.as === `unreachable`
    ? {
        verdict: `unreachable`,
      }
    : input.as === `lost`
      ? {
          verdict: `unreachable`,
          lost: true,
        }
      : createDenyReply(
          input.as,
          input.sub,
          {
            was: options,
            layer: `relay`,
          },
          input.as === `conflict` ? 409 : 0,
        );
}
function httpRowToReply(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return input.as === `unreachable`
    ? {
        verdict: `unreachable`,
      }
    : createDenyReply(
        input.as,
        input.sub,
        {
          was: `http_${options}`,
          layer: `http`,
        },
        options,
      );
}
var createDenyReply: Dynamic = (
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  value?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => {
  let value2: Dynamic =
    options === undefined
      ? undefined
      : refusalRowsByReason.get(reasonSubreasonKey(input, options))?.row;
  let value3: Dynamic =
    value2 ?? refusalRowsByReason.get(reasonSubreasonKey(input, `*`))?.row;
  let value4: boolean =
    options !== undefined &&
    value2 === undefined &&
    resolveReasonAlias(options, {}) !== null;
  let value5: Dynamic =
    options === undefined || value4
      ? {}
      : {
          [value3?.subKey ?? `why`]: options,
        };
  return {
    verdict: `deny`,
    reason: input,
    ...(value > 0
      ? {
          status: value,
        }
      : {}),
    ...(input === `conflict`
      ? {
          detail: `ledger-busy: relay reset storm`,
        }
      : {}),
    data: {
      code: input === `conflict` ? `ledger-busy` : value4 ? options : input,
      ...value5,
      ...context,
    },
  };
};
var doorHTTPErrorPattern: Dynamic = /^door(?: batch)? (\d{1,3})$/;
var transportCodeFromThrow: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): null | string => {
  if (!(input instanceof (Error as Dynamic))) return `THROWN`;
  let code: Dynamic = input.code;
  return input.name === `FrameSendError` && typeof code == `string`
    ? code
    : input instanceof (TypeError as Dynamic)
      ? `DEAD:NETWORK`
      : input.message === `mux door timeout` ||
          input.message === `mux closed mid-call` ||
          input.message === `reset`
        ? `MUX_CLOSED`
        : doorHTTPErrorPattern.test(input.message)
          ? null
          : `THROWN`;
};
function classifyTransportThrow(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = transportCodeFromThrow(input);
  if (value !== null) {
    let value4: Dynamic = relayRowForCode(value, options);
    return {
      rep: relayRowToReply(value4, value),
      rowKey: value4.key,
      relay: value4.code === `*` ? `unrowed` : value,
    };
  }
  let value2: number = Number(
    (doorHTTPErrorPattern.exec(input.message) as Dynamic)[1],
  );
  let value3: Dynamic = httpRowForStatus(value2, null, options);
  return {
    rep: httpRowToReply(value3, value2),
    rowKey: value3.key,
    http: value2,
  };
}
var LAW: Dynamic = {
  classify: classifyRefusal,
  ofThrow: (
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let value: Dynamic = classifyTransportThrow(input, options);
    return value.relay === `unrowed` &&
      !(input instanceof (Error as Dynamic) && input.name === `FrameSendError`)
      ? null
      : value.rep;
  },
  BREAKER_N: BREAKER_N,
  REDIAL_AT: REDIAL_AT,
  TRANSIENT_RETRY_MAX: TRANSIENT_RETRY_MAX,
  LOST_RETRY_MAX: LOST_RETRY_MAX,
  UNKNOWN_RETRY_MAX: UNKNOWN_RETRY_MAX,
};
function allReasonRows(..._extraArguments: unknown[]): Dynamic {
  return [...refusalRowsByReason.values()];
}
var SHADOW_EVENT_CAP: number = 200;
var isShadowRecord: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): boolean => typeof input == `object` && !!input && !Array.isArray(input);
var emptyRetryCounts: Dynamic = (..._extraArguments: unknown[]): Dynamic => ({
  transient: 0,
  lost: 0,
  bounded: 0,
  rehandshake: 0,
});
var shadowReasonKey = (
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) => `${input} ${options}`;
var shadowRowLookup: Dynamic = null;
var shadowRowForReason: Dynamic = (
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => (
  (shadowRowLookup ??= new (Map as Dynamic)(
    allReasonRows().map(
      ({ row: row }: Dynamic, ..._extraArguments: unknown[]): Dynamic => [
        shadowReasonKey(row.reason, row.sub),
        row,
      ],
    ),
  )),
  shadowRowLookup.get(shadowReasonKey(input, options))
);
var shadowSubreasonFields: Dynamic = [
  `why`,
  `problem`,
  `object`,
  `kind`,
  `need`,
  `dim`,
  `maybe`,
  `room`,
];
var shadowRowFromReply: Dynamic = (
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => {
  if (input.sub !== undefined) {
    let value: Dynamic = shadowRowForReason(input.reason, input.sub);
    if (value) return value;
  }
  for (let value of shadowSubreasonFields as Dynamic) {
    let value2: Dynamic = options[value];
    if (typeof value2 != `string` && typeof value2 != `number`) continue;
    let value3: Dynamic = shadowRowForReason(input.reason, String(value2));
    if (value3 && (value3.subKey ?? `why`) === value) return value3;
  }
  return shadowRowForReason(input.reason, `*`);
};
var faceOf = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): string | undefined => {
  switch (input.k) {
    case `page_terminal`:
    case `link_terminal`:
      return `${input.k}/${input.face}`;
    case `op_terminal`:
      return `${input.k}/${input.custody}`;
    case `reread_once`:
      return `${input.k}/${input.after}`;
    case `counter`:
      return `counter`;
    case `rehandshake`:
      return `rehandshake(${input.max})→${faceOf(input.after)}`;
    case `bounded`:
      return `bounded(${input.max}${input.floorMs ? `,${input.floorMs}ms` : ``}${input.redial ? `,redial` : ``})→${faceOf(input.after)}`;
    case `transient`:
      return `transient(${input.max}${input.redial ? `,redial` : ``})`;
    case `lost`:
      return `lost(${input.max})`;
  }
};
var retryInfoOf: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => {
  switch (input.k) {
    case `page_terminal`:
    case `link_terminal`:
    case `op_terminal`:
      return {
        retry: `never`,
        retryMax: 0,
        after: ``,
      };
    case `reread_once`:
      return {
        retry: `reread`,
        retryMax: 1,
        after: `assert`,
      };
    case `counter`:
      return {
        retry: `counter`,
        retryMax: 1,
        after: ``,
      };
    case `rehandshake`:
    case `bounded`:
      return {
        retry: input.k,
        retryMax: input.max,
        after: faceOf(input.after),
      };
    case `transient`:
    case `lost`:
      return {
        retry: input.k,
        retryMax: input.max,
        after: `link_down/unreached`,
      };
  }
};
var hashRefusalLabel: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): string => {
  let count: number = 2166136261;
  for (let index: number = 0; index < input.length; index++)
    count = Math.imul(count ^ input.charCodeAt(index), 16777619) >>> 0;
  return count.toString(16).padStart(8, `0`);
};
var wireWordPattern: Dynamic = /^[a-z0-9_:.-]{1,40}$/i;
var WIRE_WORD_UNROWED: string = `unrowed`;
/* Subsystem: shadow-observer */
function rowKeySlug(input?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
  return input
    .toLowerCase()
    .replace(/ \| /g, `:`)
    .replace(/\*/g, `any`)
    .replace(/[^a-z0-9_:.-]+/g, `.`)
    .replace(/^\.+|\.+$/g, ``)
    .slice(0, 48);
}
var unreachableVerdictKeys: Dynamic = [
  `verdict | unreachable`,
  `verdict | unreachable hung`,
  `verdict | unreachable reopens`,
  `verdict | unreachable lost`,
];
var wireWordIndex: Dynamic = null;
function buildWireWordIndex(..._extraArguments: unknown[]): Dynamic {
  if (wireWordIndex !== null) return wireWordIndex;
  let mapped: Dynamic = allReasonRows().map(
    ({ row: row }: Dynamic, ..._extraArguments: unknown[]): Dynamic => row,
  );
  let values: Dynamic = new (Set as Dynamic)(
    [
      `unreachable`,
      ...mapped.map(
        (input?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          input.reason.toLowerCase(),
      ),
    ].filter(
      (input?: Dynamic, ..._extraArguments: unknown[]): boolean =>
        observabilityTelemetryPattern27.test(input) &&
        !observabilityTelemetrySet22.has(input),
    ),
  );
  let entries: Dynamic = new (Map as Dynamic)();
  for (let value of [
    ...mapped.map(
      (input?: Dynamic, ..._extraArguments: unknown[]): Dynamic => input.key,
    ),
    ...relayRefusalRows.map(
      (input?: Dynamic, ..._extraArguments: unknown[]): Dynamic => input.key,
    ),
    ...httpRefusalRows.map(
      (input?: Dynamic, ..._extraArguments: unknown[]): Dynamic => input.key,
    ),
    ...unreachableVerdictKeys,
  ] as Dynamic) {
    let value2: Dynamic = rowKeySlug(value);
    if (
      observabilityTelemetryPattern28.test(value2) &&
      !observabilityTelemetrySet22.has(value2)
    ) {
      entries.set(value, value2);
    }
  }
  return (wireWordIndex = {
    words: values,
    rowKeys: entries,
  });
}
function wireWordOf(input?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
  let value: Dynamic = input.toLowerCase();
  return buildWireWordIndex().words.has(value) ? value : WIRE_WORD_UNROWED;
}
function wireRowKeyOf(input?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
  return buildWireWordIndex().rowKeys.get(input);
}
var additionalRefusalNeedWords: Dynamic =
  `retired.replaced.deleted.own_chars.newer_rows.col_widths.at_rev_cold.missing_guard.unknown_key.range.overlap.bad_payload.bad_op.bad_at.shape_mismatch.schema.lead.table_arity.grid.not_allowed.inline.container.items_of_list.contiguous.anchor_span.too_many.model_balance.used.not_minted.prefix.widget_invalid.enum.dead_in_batch.lead_delete_takes_item.wrong_kind.opaque.option.not_leaf.retype.attr_unknown.address.kind.thread.list_level_skip.start_outside_ordered.text.prose_node.owner.chars.own_subtree.root.place_arity.relative_id.future_rev.history.restore_not_alone.attrs.cycle.doc.unchanged.adopt.depth.not_settable.reaction_parent.re_parent.resolve_root.a8_op_not_alone.address_dead.anchor_cells.at.bid.block.char.colspan.cross_block.empty_table.exactly_one_of.expected.guard_too_short.h.hash.href.inline_outside_leaf.item.language.length.level.mismatch.mixed_ops.newline.no_record.not_a_rev.nth.offset.overflow.parent.same_anchor.style.too_deep.two_arms_one_leaf.typed_between.unknown_field.use_resolve.would_empty.artifact_road.artifact_store_auth.bad_key.bad_param.blob_road.cap.embed_kind.emptied.scope_empty_sel.empty_attrs.errors_dropped.errors_truncated.exclusive.grid_moved.heading_not_root.list_depth.not_a_child.not_exposed.not_in_enum.object.path_scoped.placement.render_rate.scan_pending.sha_not_yours.travels_alone.under_proposed.unknown_blob.wrong_type.foreign_label.not_in_schema.render.node_not_parent.not_cell.unknown_id.arity.cross_node.struct_form.unsupported_kind.unknown_param.too_long.pattern_too_complex.regex_syntax.empty_match.select.mixed_spelling.rate_limited.count_unknowable.prose_orphan_node`.split(
    `.`,
  );
var refusalNeedWordCache: Dynamic = null;
function refusalNeedWords(..._extraArguments: unknown[]): Dynamic {
  if (refusalNeedWordCache !== null) return refusalNeedWordCache;
  let values: Dynamic = new (Set as Dynamic)(isPlatformAnnouncementsFlatMap());
  for (let { row: row } of allReasonRows() as Dynamic)
    if (row.sub !== `*`)
      for (let value of row.sub.toLowerCase().split(`:`) as Dynamic)
        values.add(value.replace(/-/g, `_`));
  for (let value of Object.values(doorSubreasons) as Dynamic)
    for (let value2 of value as Dynamic)
      values.add(value2.toLowerCase().replace(/-/g, `_`));
  for (let value of additionalRefusalNeedWords as Dynamic) values.add(value);
  for (let value of PlatformLiveDocumentAndHistoryValues as Dynamic)
    values.add(value);
  for (let value of [
    PlatformLiveDocumentAndHistoryUnsaid,
    PlatformLiveDocumentAndHistoryOther,
  ] as Dynamic)
    values.delete(value);
  return (refusalNeedWordCache = new (Set as Dynamic)(
    [...values].filter(
      (input?: Dynamic, ..._extraArguments: unknown[]): boolean =>
        /^[a-z0-9_]{1,24}$/.test(input),
    ),
  ));
}
var operationSuffixPattern: Dynamic = /:\d+-\d+$/;
var bookKeyOf: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => input.replace(operationSuffixPattern, ``).replace(/~1$/, ``);
function operationShadowFields(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  value: Dynamic = [],
  extra?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (input.road !== `write` && input.road !== `stream`) return {};
  let value2: Dynamic;
  try {
    value2 =
      input.replayed === true
        ? {
            g: `replay`,
          }
        : input.opId === undefined
          ? undefined
          : resolvePlatformLiveDocumentAndHistoryCell(
              context?.get(bookKeyOf(input.opId)),
            );
  } catch {
    value2 = undefined;
  }
  let value3: Dynamic =
    collectPlatformLiveDocumentAndHistoryAutoLift(
      value,
      value2?.g ?? `other`,
    ) ??
    value2?.g ??
    `other`;
  let value4: Dynamic =
    extra ??
    (options.verdict === `deny`
      ? resolvePlatformLiveDocumentAndHistoryValue9(
          options.data,
          refusalNeedWords(),
          options.detail,
        )
      : `unsaid`);
  let value5: number =
    typeof input.ops == `number` && Number.isFinite(input.ops)
      ? Math.min(99, Math.max(1, Math.round(input.ops)))
      : 1;
  let [items, items2]: Dynamic = [
    value2?.cell === true,
    value2?.cross === true,
  ];
  return {
    component: resolvePlatformLiveDocumentAndHistoryGesture({
      gesture: value3,
      need: value4,
      ops: value5,
      cell: resolvePlatformLiveDocumentAndHistoryValue8(value2),
      cross: items2,
    }),
    gesture: value3,
    need: value4,
    nOps: value5,
    cellSel: items,
    crossed: items2,
  };
}
var refusalWireFields: Dynamic = (
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => {
  let value: Dynamic = wireRowKeyOf(options);
  return value === undefined
    ? {
        word: wireWordOf(input),
      }
    : {
        word: wireWordOf(input),
        rowKey: value,
      };
};
function openRefusalShadow(
  input?: Dynamic,
  options?: Dynamic,
  context: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = context.cap ?? 200;
  let value2: Dynamic = updatePlatformLiveDocumentAndHistoryTake(
    context.sample,
  );
  let state: Dynamic = {
    down: null,
    trips: 0,
    strikes: 0,
    readsUnanswered: 0,
    createFails: 0,
    rows: 0,
    page: `live`,
    nodesGone: 0,
    emitted: 0,
    weathered: 0,
  };
  let entries: Dynamic = new (Map as Dynamic)();
  let values: Dynamic = new (Set as Dynamic)();
  let cache: Dynamic = new (WeakMap as Dynamic)();
  let entries2: Dynamic = new (Map as Dynamic)();
  let value3: boolean = false;
  let value4: boolean = false;
  let value5 = (
    input2?: Dynamic,
    options2?: Dynamic,
    context2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    try {
      options({
        name: input2,
        fields: options2,
        wire: context2,
      });
    } catch {}
  };
  let value6: Dynamic = (
    input2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    surface: input.surface,
    page: input.page,
    sess: input.session?.() ?? ``,
    sc: input.supportCode ?? ``,
    feBuild: input.feBuild,
    doorBuild: input.doorBuild?.() ?? ``,
    road: input2.road,
    verb: input2.verb,
    ...(input2.opId === undefined
      ? {}
      : {
          opId: input2.opId,
        }),
    ...(input2.node === undefined
      ? {}
      : {
          node: input2.node,
        }),
    ...(input2.stream === true
      ? {
          stream: true,
        }
      : {}),
    ...(input2.burst === undefined
      ? {}
      : {
          burst: input2.burst,
        }),
    ...(input2.replayed === true
      ? {
          replayed: true,
        }
      : {}),
    ...(input2.lost === true
      ? {
          lost: true,
        }
      : {}),
    ...(input2.tries === undefined
      ? {}
      : {
          tries: input2.tries,
        }),
    ...(input2.vis === undefined
      ? {}
      : {
          vis: input2.vis,
        }),
    ...(typeof input2.feedUp == `boolean`
      ? {
          feedUp: input2.feedUp,
        }
      : {}),
    ...(input2.gap === true
      ? {
          gap: true,
        }
      : {}),
    weathered: state.weathered,
    shadow: state.down === null ? `live` : `down`,
    down: state.down ?? ``,
    trips: state.trips,
    strikes: state.strikes,
    readsUnanswered: state.readsUnanswered,
    createFails: state.createFails,
    pageFace: state.page,
  });
  let value7: Dynamic = (
    input2?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let value13: Dynamic;
    if (isShadowRecord(input2) && cache.has(input2)) {
      value13 = cache.get(input2);
      cache.delete(input2);
    }
    if (options2 !== undefined && entries2.has(options2)) {
      value13 ??= entries2.get(options2);
      entries2.delete(options2);
    }
    return value13;
  };
  let value8: Dynamic = (
    input2?: Dynamic,
    ..._extraArguments: unknown[]
  ): boolean =>
    state.down === null
      ? ((state.down = input2), (state.trips += 1), true)
      : false;
  let value9 = (..._extraArguments: unknown[]): undefined => {
    state.down = null;
    entries.clear();
    state.rows = 0;
    state.readsUnanswered = 0;
    state.createFails = 0;
  };
  let value10 = (
    input2?: Dynamic,
    options2?: Dynamic,
    context2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let value13: Dynamic =
      filterPlatformLiveDocumentAndHistoryPayload(context2);
    let value14: Dynamic =
      input2.replayed === true || options2 === undefined
        ? undefined
        : collectPlatformLiveDocumentAndHistoryAutoLift(value13, options2.g);
    let value15: Dynamic = value2.take(
      input2.replayed === true
        ? {
            g: `replay`,
          }
        : value14 === undefined
          ? options2
          : {
              ...options2,
              g: value14,
            },
      input2.ops,
      input.now?.() ?? NaN,
    );
    if (value15 === undefined) return;
    let state2: Dynamic = {
      surface: input.surface,
      page: input.page,
      sess: input.session?.() ?? ``,
      sc: input.supportCode ?? ``,
      feBuild: input.feBuild,
      doorBuild: input.doorBuild?.() ?? ``,
      road: input2.road,
      component: value15.component,
      gesture: value15.gesture,
      nOps: value15.ops,
      cellSel: value15.cell,
      crossed: value15.cross,
    };
    let value16: Dynamic;
    try {
      value16 =
        input.loweringShadow?.() === true
          ? resolvePlatformLiveDocumentAndHistoryNone(value15)
          : undefined;
    } catch {
      value16 = undefined;
    }
    try {
      value16 = resolvePlatformLiveDocumentAndHistoryTest4(
        value16,
        isPlatformLiveDocumentAndHistoryInsert(value13, input.browser?.()),
      );
    } catch {}
    options({
      name: `pages.write.sample`,
      key: value15.why === `nth` ? `nth:${value15.gesture}` : value15.gesture,
      fields: state2,
      ...(value16 === undefined
        ? {}
        : {
            wire: {
              word: value16,
            },
          }),
    });
  };
  let value11 = (
    input2?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (input2.road === `write` || input2.road === `stream`) {
      let value13: Dynamic;
      try {
        if (input2.opId !== undefined) {
          value13 = resolvePlatformLiveDocumentAndHistoryCell(
            input.births?.get(bookKeyOf(input2.opId)),
          );
        }
      } catch {
        value13 = undefined;
      }
      try {
        if (
          input2.opId !== undefined &&
          !operationSuffixPattern.test(input2.opId)
        ) {
          input.births?.drop(bookKeyOf(input2.opId));
        }
      } catch {}
      entries.clear();
      state.rows = 0;
      state.strikes = 0;
      if (state.down !== null) {
        value9();
      }
      try {
        value10(input2, value13, options2);
      } catch {}
    } else if (input2.road === `read`) {
      state.readsUnanswered = 0;
      if (state.down === `unreached` || state.down === `signed_out`) {
        value9();
      }
    } else {
      if (input2.road === `mint`) {
        state.createFails = 0;
        if (state.down === `unreached`) {
          value9();
        }
      }
    }
  };
  let value12: Dynamic = (
    input2?: Dynamic,
    options2?: Dynamic,
    context2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (input2.k === `page_terminal`) {
      state.page = input2.face;
      return false;
    }
    if (input2.k === `link_terminal` && input2.face === `node_gone`) {
      values.add(options2.node ?? ``);
      state.nodesGone = values.size;
      return false;
    }
    if (options2.road === `read`)
      return context2.verdict === `deny`
        ? false
        : ((state.readsUnanswered += 1),
          state.readsUnanswered >= TRANSIENT_RETRY_MAX && value8(`unreached`));
    if (options2.road === `mint`)
      return input2.k === `transient`
        ? ((state.createFails += 1),
          state.createFails >= TRANSIENT_RETRY_MAX && value8(`unreached`))
        : false;
    let value13: Dynamic = options2.opId ?? ``;
    let value14: Dynamic = entries.get(value13) ?? emptyRetryCounts();
    switch (
      (entries.set(value13, value14), (state.rows = entries.size), input2.k)
    ) {
      case `transient`:
        value14.transient += 1;
        return value14.transient >= input2.max && value8(`unreached`);
      case `lost`:
        value14.lost += 1;
        return value14.lost >= 1 + input2.max && value8(`unreached`);
      case `rehandshake`:
        value14.rehandshake += 1;
        return value14.rehandshake < 1 + input2.max
          ? false
          : input2.after.k === `link_terminal` &&
              input2.after.face === `session` &&
              value8(`signed_out`);
      case `bounded`:
        value14.bounded += 1;
        return value14.bounded === 1 + input2.max
          ? input2.after.k === `page_terminal`
            ? ((state.page = input2.after.face), false)
            : ((state.strikes += 1),
              state.strikes >= BREAKER_N && value8(`refusing`))
          : false;
      default:
        return false;
    }
  };
  return {
    threw: (
      input2?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (!value3) {
        if (isShadowRecord(input2)) {
          cache.set(input2, options2);
          if (typeof input2.opId == `string`) {
            entries2.set(input2.opId, options2);
          }
        }
      }
    },
    judged: (
      input2?: Dynamic,
      options2?: Dynamic,
      context2?: Dynamic,
      value13?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      if (value3 || !isShadowRecord(options2)) return;
      let value14: Dynamic = options2;
      let value15: Dynamic = value7(input2, value13.opId);
      if (value14.verdict === `allow`) return value11(value13, input2);
      let verb: Dynamic = value13.verb;
      let value16: Dynamic =
        value15 !== undefined &&
        value14.verdict !== `deny` &&
        value14.hung !== true &&
        value14.reopens !== true
          ? classifyTransportThrow(value15, verb)
          : null;
      let value17: Dynamic = value16?.rep ?? value14;
      let value18: Dynamic = classifyRefusal(value17, {
        road: value13.road,
        verb: verb,
        seated: value13.seated,
        replayed: value13.replayed,
        kStart: value13.kStart,
        node: value13.node,
        lost: value13.lost,
      });
      let value19: Dynamic = value12(value18, value13, value17);
      let value20: Dynamic =
        value18.source === "default"
          ? undefined
          : shadowRowFromReply(
              value18,
              isShadowRecord(value17.data) ? value17.data : {},
            );
      let value21: boolean = value20 !== undefined && value20.sub !== `*`;
      let value22: boolean = value17.verdict !== `deny`;
      let value23: Dynamic =
        value16?.rowKey ??
        value20?.key ??
        (value22
          ? `verdict | unreachable${value17.hung === true ? ` hung` : value17.reopens === true ? ` reopens` : value17.lost === true ? ` lost` : ``}`
          : `unrowed`);
      let value24: Dynamic =
        typeof value17.reason == `string` ? value17.reason : ``;
      let value25: Dynamic = retryInfoOf(value18);
      let value26: Dynamic =
        value20 === undefined
          ? value22
            ? `unreachable`
            : `unrowed`
          : value18.reason;
      let value27: Dynamic = refusalWireFields(value26, value23);
      let value28: Dynamic = value22
        ? transportCode(value16, value17)
        : undefined;
      let value29: Dynamic = weatherOf(value13, input.weather);
      let value30: Dynamic =
        value22 &&
        (value29.foul || (value13.road === `read` && value13.gap === true));
      let state2: Dynamic = {
        ...value6(value13),
        ...value29.fields,
        word: value26,
        ...(value28 === undefined
          ? {}
          : {
              code: value28,
            }),
        ...(value21
          ? {
              sub: value20.sub,
            }
          : {}),
        rowKey: value23,
        source: value18.source,
        ...(value16?.relay === undefined
          ? {}
          : {
              relay: value16.relay,
            }),
        ...(value16?.http === undefined
          ? {}
          : {
              http: value16.http,
            }),
        ...(value20 === undefined && !value22
          ? {
              unrowedLen: value24.length,
              ...(wireWordPattern.test(value24)
                ? {
                    unrowedHash: hashRefusalLabel(value24),
                  }
                : {}),
            }
          : {}),
        ...(value17.hung === true
          ? {
              hung: true,
            }
          : {}),
        ...(value17.reopens === true
          ? {
              reopens: true,
            }
          : {}),
        klass: faceOf(value18),
        k: value18.k,
        scope: value18.scope,
        retry: value25.retry,
        retryMax: value25.retryMax,
        after: value25.after,
        today: value20?.today ?? ``,
        action: context2,
        trip: value19,
        ...(value13.opId === undefined
          ? {}
          : retryCountFields(entries.get(value13.opId))),
        ...operationShadowFields(
          value13,
          value17,
          input.births,
          filterPlatformLiveDocumentAndHistoryPayload(input2),
          value17.verdict === `deny` && value26 === `anchors_affected`
            ? resolvePlatformLiveDocumentAndHistoryAsking(
                value17.data,
                value13.road === `write`
                  ? resolvePlatformLiveDocumentAndHistoryPayload3(input2)
                  : undefined,
              )
            : undefined,
        ),
      };
      state2.shadow = state.down === null ? `live` : `down`;
      state2.down = state.down ?? ``;
      state2.trips = state.trips;
      state2.strikes = state.strikes;
      state2.readsUnanswered = state.readsUnanswered;
      state2.createFails = state.createFails;
      state2.pageFace = state.page;
      if (value30) {
        state.weathered += 1;
        state2.weathered = state.weathered;
      } else if (state.emitted < value) {
        state.emitted += 1;
        value5(`pages.refusal.shadow`, state2, value27);
        try {
          let value31: Dynamic =
            (value13.road === `write` || value13.road === `stream`) &&
            typeof state2.component == `string`
              ? isPlatformLiveDocumentAndHistoryInsert(
                  filterPlatformLiveDocumentAndHistoryPayload(input2),
                  input.browser?.(),
                )
              : undefined;
          if (value31 !== undefined) {
            value5(
              `pages.write.shape`,
              {
                ...value6(value13),
                component: state2.component,
                road: value13.road,
              },
              {
                word: value31,
              },
            );
          }
        } catch {}
      } else if (!value4) {
        value4 = true;
        value5(
          `pages.refusal.shadow.capped`,
          {
            ...value6(value13),
            word: value26,
            rowKey: value23,
            cap: value,
            emitted: state.emitted,
          },
          value27,
        );
      }
      if (value19 && state.trips === 1) {
        value5(`pages.refusal.shadow.down`, state2, value27);
      }
    },
    state: (..._extraArguments: unknown[]): Dynamic => ({
      ...state,
    }),
    close: (..._extraArguments: unknown[]): undefined => {
      value3 = true;
      entries.clear();
      entries2.clear();
    },
  };
}
var retryCountFields: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  input === undefined
    ? {}
    : {
        nTransient: input.transient,
        nLost: input.lost,
        nBounded: input.bounded,
        nRehandshake: input.rehandshake,
      };
function transportCode(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (input?.relay !== undefined && input.relay !== `unrowed`) {
    let value: Dynamic = input.relay.startsWith(`DEAD:`)
      ? `dead`
      : input.relay.toLowerCase();
    return observabilityTelemetrySet18.has(value) ? value : `unknown`;
  }
  return input?.http === undefined
    ? input?.relay === `unrowed`
      ? `unknown`
      : options.hung === true || options.lost === true
        ? `timeout`
        : options.reopens === true
          ? `reset`
          : `network`
    : input.http >= 500
      ? `http_5xx`
      : input.http >= 400
        ? `http_4xx`
        : `network`;
}
function weatherOf(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let state: Dynamic = {};
  try {
    state = options?.() ?? {};
  } catch {}
  let state2: Dynamic = {
    ...(typeof state.online == `boolean`
      ? {
          online: state.online,
        }
      : {}),
    ...(typeof state.laneOpen == `boolean`
      ? {
          laneOpen: state.laneOpen,
        }
      : {}),
  };
  return {
    foul:
      input.vis === `hidden` ||
      input.vis === `idle` ||
      input.feedUp === false ||
      state.online === false ||
      state.laneOpen === false,
    fields: state2,
  };
}
export {
  LAW,
  SHADOW_EVENT_CAP,
  WIRE_WORD_UNROWED,
  bookKeyOf,
  faceOf,
  openRefusalShadow,
  refusalNeedWords,
  rowKeySlug,
  transportCode,
  weatherOf,
  wireRowKeyOf,
  wireWordOf,
};
