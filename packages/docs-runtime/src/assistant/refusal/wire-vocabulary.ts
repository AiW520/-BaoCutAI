import {
  isPlatformAnnouncementsFlatMap,
  observabilityTelemetryPattern27,
  observabilityTelemetryPattern28,
  observabilityTelemetrySet22,
  PlatformLiveDocumentAndHistoryOther,
  PlatformLiveDocumentAndHistoryUnsaid,
  PlatformLiveDocumentAndHistoryValues,
} from "../../platform/index";
import { rowKeySlug, WIRE_WORD_UNROWED } from "./format";
import {
  allReasonRows,
  doorSubreasons,
  httpRefusalRows,
  relayRefusalRows,
} from "./row-index";
const unreachableVerdictKeys = [
  `verdict | unreachable`,
  `verdict | unreachable hung`,
  `verdict | unreachable reopens`,
  `verdict | unreachable lost`,
];
let wireWordIndex: {
  words: Set<string>;
  rowKeys: Map<string, string>;
} | null = null;
function buildWireWordIndex() {
  if (wireWordIndex !== null) return wireWordIndex;
  const rows = allReasonRows().map(({ row }) => row);
  const words = new Set<string>(
    [`unreachable`, ...rows.map((input) => input.reason.toLowerCase())].filter(
      (input): boolean =>
        observabilityTelemetryPattern27.test(input) &&
        !observabilityTelemetrySet22.has(input),
    ),
  );
  const rowKeys = new Map<string, string>();
  for (const value of [
    ...rows.map((input) => input.key),
    ...relayRefusalRows.map((input) => input.key),
    ...httpRefusalRows.map((input) => input.key),
    ...unreachableVerdictKeys,
  ]) {
    const value2 = rowKeySlug(value);
    if (
      observabilityTelemetryPattern28.test(value2) &&
      !observabilityTelemetrySet22.has(value2)
    ) {
      rowKeys.set(value, value2);
    }
  }
  return (wireWordIndex = {
    words: words,
    rowKeys: rowKeys,
  });
}
function wireWordOf(word: string): string {
  const normalized = word.toLowerCase();
  return buildWireWordIndex().words.has(normalized) ? normalized : WIRE_WORD_UNROWED;
}
function wireRowKeyOf(key: string): string | undefined {
  return buildWireWordIndex().rowKeys.get(key);
}
const additionalRefusalNeedWords =
  `retired.replaced.deleted.own_chars.newer_rows.col_widths.at_rev_cold.missing_guard.unknown_key.range.overlap.bad_payload.bad_op.bad_at.shape_mismatch.schema.lead.table_arity.grid.not_allowed.inline.container.items_of_list.contiguous.anchor_span.too_many.model_balance.used.not_minted.prefix.widget_invalid.enum.dead_in_batch.lead_delete_takes_item.wrong_kind.opaque.option.not_leaf.retype.attr_unknown.address.kind.thread.list_level_skip.start_outside_ordered.text.prose_node.owner.chars.own_subtree.root.place_arity.relative_id.future_rev.history.restore_not_alone.attrs.cycle.doc.unchanged.adopt.depth.not_settable.reaction_parent.re_parent.resolve_root.a8_op_not_alone.address_dead.anchor_cells.at.bid.block.char.colspan.cross_block.empty_table.exactly_one_of.expected.guard_too_short.h.hash.href.inline_outside_leaf.item.language.length.level.mismatch.mixed_ops.newline.no_record.not_a_rev.nth.offset.overflow.parent.same_anchor.style.too_deep.two_arms_one_leaf.typed_between.unknown_field.use_resolve.would_empty.artifact_road.artifact_store_auth.bad_key.bad_param.blob_road.cap.embed_kind.emptied.scope_empty_sel.empty_attrs.errors_dropped.errors_truncated.exclusive.grid_moved.heading_not_root.list_depth.not_a_child.not_exposed.not_in_enum.object.path_scoped.placement.render_rate.scan_pending.sha_not_yours.travels_alone.under_proposed.unknown_blob.wrong_type.foreign_label.not_in_schema.render.node_not_parent.not_cell.unknown_id.arity.cross_node.struct_form.unsupported_kind.unknown_param.too_long.pattern_too_complex.regex_syntax.empty_match.select.mixed_spelling.rate_limited.count_unknowable.prose_orphan_node`.split(
    `.`,
  );
let refusalNeedWordCache: Set<string> | null = null;
function refusalNeedWords(): Set<string> {
  if (refusalNeedWordCache !== null) return refusalNeedWordCache;
  const words = new Set<string>(isPlatformAnnouncementsFlatMap());
  for (const { row } of allReasonRows())
    if (row.sub !== `*`)
      for (const value of row.sub.toLowerCase().split(`:`))
        words.add(value.replace(/-/g, `_`));
  for (const value of Object.values(doorSubreasons))
    for (const value2 of value) words.add(value2.toLowerCase().replace(/-/g, `_`));
  for (const value of additionalRefusalNeedWords) words.add(value);
  const platformNeeds: readonly string[] = PlatformLiveDocumentAndHistoryValues;
  for (const value of platformNeeds) words.add(value);
  for (const value of [
    PlatformLiveDocumentAndHistoryUnsaid,
    PlatformLiveDocumentAndHistoryOther,
  ])
    words.delete(value);
  return (refusalNeedWordCache = new Set<string>(
    [...words].filter((input): boolean => /^[a-z0-9_]{1,24}$/.test(input)),
  ));
}
const refusalWireFields = (input: string, options: string) => {
  const value = wireRowKeyOf(options);
  return value === undefined
    ? {
        word: wireWordOf(input),
      }
    : {
        word: wireWordOf(input),
        rowKey: value,
      };
};
export { refusalNeedWords, refusalWireFields, wireRowKeyOf, wireWordOf };
