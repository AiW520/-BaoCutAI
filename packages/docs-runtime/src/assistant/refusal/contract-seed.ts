import type { RetryContract } from "./contracts";
import { editorStateRows } from "./frontend/editor-state-rows";
import { lifecycleRows } from "./frontend/lifecycle-rows";
import { accessRows } from "./reasons/access-rows";
import { addressingRows } from "./reasons/addressing-rows";
import { availabilityRows } from "./reasons/availability-rows";
import { engineRows } from "./reasons/engine-rows";
import { goneRows } from "./reasons/gone-rows";
import { identifiersRows } from "./reasons/identifiers-rows";
import { limitsRows } from "./reasons/limits-rows";
import { requestRows } from "./reasons/request-rows";
import { sessionsRows } from "./reasons/sessions-rows";
import { httpRows } from "./transport/http-rows";
import { relayFallbackRows } from "./transport/relay-fallback-rows";
import { relayResponseRows } from "./transport/relay-response-rows";

export const refusalContractSeed = {
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
    ...requestRows,
    ...addressingRows,
    ...limitsRows,
    ...identifiersRows,
    ...sessionsRows,
    ...accessRows,
    ...goneRows,
    ...availabilityRows,
    ...engineRows,
  ],
  relay: [...relayResponseRows, ...relayFallbackRows],
  http: [...httpRows],
  feLocal: [...lifecycleRows, ...editorStateRows],
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
  } satisfies RetryContract,
};
