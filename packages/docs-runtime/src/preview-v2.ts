/** preview-v2: restored from previewV2-BX6Rlgqx.js. */
import type { Dynamic } from "./types";
import {
  Bk as Mark,
  C as resolvePlatformLiveDocumentAndHistoryValue33,
  Qk as getSchema,
  Rk as Extension,
  S as resolvePlatformLiveDocumentAndHistoryValue32,
  _M as DOMSerializer,
  br as resolveEditorChipsAndNodeViewsColor,
  ir as resolveEditorMediaValue3,
  mO as resolveEditorAnchorsAndMentionsEmail,
  nv as frameEnumRows,
  pk as resolveEditorExtensionsValue13,
  sr as resolveEditorMediaWidth,
  xr as resolveEditorChipsAndNodeViewsDate2,
  yM as Node,
  yv as framePeekProfile,
} from "./platform-core";
import {
  r as proseExtensions,
  t as RENDERABLE_PM_TYPES,
} from "./editor-schema";
import {
  L as diffAnchorId,
  P as sanitizePreviewHtml,
  Yt as fetchVersionPreviewDocs,
  a as fillWidgetCodeSlots,
  at as readEmbedDeltas,
  ct as serializeDiffEnums,
  dt as MAX_DIFF_ROW_SPAN,
  et as mergeEmbedDeltasIntoDiff,
  ft as MAX_DIFF_COLUMN_SPAN,
  i as WIDGET_CODE_SLOT_ATTRIBUTE,
  it as readWidgetCodePair,
  lt as DIFF_ATTRIBUTE_NAMES,
  nt as collectDiffEmbedReferences,
  o as proseMirrorCalloutKind,
  ot as versionSequenceRange,
  r as sanitizePreviewDocument,
  rt as createEmbedDeltaCache,
  s as createVisualizeHtmlCache,
  st as diffDocumentsAsync,
  tt as renderUnavailableWidgetCodeDiff,
  ut as DIFF_MARK_TYPES,
} from "./platform-lazy";
var DIFF_KINDS: Dynamic = new (Set as Dynamic)([`ins`, `del`, `chg`, `move`]);
var MAX_DIFF_SUMMARY_CHARS: Dynamic = 512;
var MAX_DIFF_ID_CHARS: Dynamic = 128;
var boundedString: Dynamic = (
  text?: Dynamic,
  maxCharacters?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  typeof text == `string` && text.length > 0
    ? text.length <= maxCharacters
      ? text
      : Array.from<Dynamic>(text).slice(0, maxCharacters).join(``)
    : null;
function diffHtmlAttributes(
  attrs?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let htmlAttributes: Dynamic = {};
  let diffKind: Dynamic =
    typeof attrs.diff == `string` && DIFF_KINDS.has(attrs.diff)
      ? attrs.diff
      : null;
  if (diffKind === null) return htmlAttributes;
  htmlAttributes[`data-diff`] = diffKind;
  let diffId: Dynamic = boundedString(attrs.diffId, MAX_DIFF_ID_CHARS);
  if (diffId !== null) {
    htmlAttributes[`data-diff-id`] = diffId;
  }
  let diffSummary: Dynamic = boundedString(
    attrs.diffSummary,
    MAX_DIFF_SUMMARY_CHARS,
  );
  if (diffSummary !== null) {
    htmlAttributes[`data-diff-summary`] = diffSummary;
    htmlAttributes.title = diffSummary;
  }
  return htmlAttributes;
}
var DIFF_MARK_PRIORITY: Dynamic = 1e4;
var noHtmlParseValue = (..._extraArguments: unknown[]) => null;
var DIFF_ID_ATTRIBUTE: Dynamic = {
  id: {
    default: null,
    parseHTML: noHtmlParseValue,
    rendered: false,
  },
};
var DiffInsertionMark: Dynamic = Mark.create({
  name: `diffIns`,
  priority: DIFF_MARK_PRIORITY,
  inclusive: false,
  addAttributes: (..._extraArguments: unknown[]): Dynamic => DIFF_ID_ATTRIBUTE,
  parseHTML: (..._extraArguments: unknown[]): Dynamic => [],
  renderHTML: (
    { mark: mark }: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => [
    `ins`,
    {
      class: `vh-ins`,
      "data-diff-id": boundedString(mark.attrs.id, MAX_DIFF_ID_CHARS) ?? ``,
    },
    0,
  ],
});
var DiffDeletionMark: Dynamic = Mark.create({
  name: `diffDel`,
  priority: DIFF_MARK_PRIORITY,
  inclusive: false,
  addAttributes: (..._extraArguments: unknown[]): Dynamic => DIFF_ID_ATTRIBUTE,
  parseHTML: (..._extraArguments: unknown[]): Dynamic => [],
  renderHTML: (
    { mark: mark }: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => [
    `del`,
    {
      class: `vh-del`,
      "data-diff-id": boundedString(mark.attrs.id, MAX_DIFF_ID_CHARS) ?? ``,
    },
    0,
  ],
});
var DiffFormattingMark: Dynamic = Mark.create({
  name: `diffFmt`,
  priority: DIFF_MARK_PRIORITY,
  inclusive: false,
  addAttributes: (..._extraArguments: unknown[]): Dynamic => ({
    ...DIFF_ID_ATTRIBUTE,
    summary: {
      default: null,
      parseHTML: noHtmlParseValue,
      rendered: false,
    },
  }),
  parseHTML: (..._extraArguments: unknown[]): Dynamic => [],
  renderHTML: (
    { mark: mark }: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let boundedString2: Dynamic = boundedString(
      mark.attrs.summary,
      MAX_DIFF_SUMMARY_CHARS,
    );
    return [
      `span`,
      {
        class: `vh-fmt`,
        "data-diff-id": boundedString(mark.attrs.id, MAX_DIFF_ID_CHARS) ?? ``,
        ...(boundedString2 === null
          ? {}
          : {
              "data-diff-summary": boundedString2,
              title: boundedString2,
            }),
      },
      0,
    ];
  },
});
var DIFF_ATTRIBUTE_NODE_TYPES: Dynamic = [...RENDERABLE_PM_TYPES].filter(
  (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
    item !== `text` && item !== `doc`,
);
var VersionDiffNodeAttributes: Dynamic = Extension.create({
  name: `versionDiffNodeAttrs`,
  addGlobalAttributes(..._extraArguments: unknown[]): Dynamic {
    let versionDiffNodeAttributesHandler: Dynamic =
      (versionDiffNode?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      (versionDiffNode2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        let diffHtmlAttributes2: Dynamic = diffHtmlAttributes(versionDiffNode2);
        let record: Dynamic = {};
        if (
          versionDiffNode === `diff` &&
          diffHtmlAttributes2[`data-diff`] !== undefined
        ) {
          record[`data-diff`] = diffHtmlAttributes2[`data-diff`];
        }
        if (
          versionDiffNode === `diffId` &&
          diffHtmlAttributes2[`data-diff-id`] !== undefined
        ) {
          record[`data-diff-id`] = diffHtmlAttributes2[`data-diff-id`];
        }
        if (
          versionDiffNode === `diffSummary` &&
          diffHtmlAttributes2[`data-diff-summary`] !== undefined
        ) {
          record[`data-diff-summary`] =
            diffHtmlAttributes2[`data-diff-summary`];
          record.title = diffHtmlAttributes2.title;
        }
        return record;
      };
    return [
      {
        types: [...DIFF_ATTRIBUTE_NODE_TYPES],
        attributes: {
          diff: {
            default: null,
            parseHTML: noHtmlParseValue,
            renderHTML: versionDiffNodeAttributesHandler(`diff`),
          },
          diffId: {
            default: null,
            parseHTML: noHtmlParseValue,
            renderHTML: versionDiffNodeAttributesHandler(`diffId`),
          },
          diffSummary: {
            default: null,
            parseHTML: noHtmlParseValue,
            renderHTML: versionDiffNodeAttributesHandler(`diffSummary`),
          },
          diffBefore: {
            default: null,
            parseHTML: noHtmlParseValue,
            renderHTML: (..._extraArguments: unknown[]): Dynamic => ({}),
          },
          diffGhost: {
            default: null,
            parseHTML: noHtmlParseValue,
            renderHTML: (
              versionDiffNode?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              versionDiffNode.diffGhost === `move`
                ? {
                    "data-diff-ghost": `move`,
                  }
                : {},
          },
          diffMoveTo: {
            default: null,
            parseHTML: noHtmlParseValue,
            renderHTML: (
              versionDiffNode?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => {
              let boundedString2: Dynamic = boundedString(
                versionDiffNode.diffMoveTo,
                MAX_DIFF_ID_CHARS,
              );
              return boundedString2 === null
                ? {}
                : {
                    "data-diff-move-to": boundedString2,
                  };
            },
          },
        },
      },
      {
        types: [`paragraph`],
        attributes: {
          [UNSUPPORTED_NODE_ATTRIBUTE]: {
            default: null,
            parseHTML: noHtmlParseValue,
            renderHTML: (
              versionDiffNode?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => {
              let boundedString2: Dynamic = boundedString(
                versionDiffNode[UNSUPPORTED_NODE_ATTRIBUTE],
                40,
              );
              return boundedString2 === null
                ? {}
                : {
                    class: `vh-unsupported`,
                    "data-vh-unsupported": boundedString2,
                  };
            },
          },
        },
      },
    ];
  },
});
var UNSUPPORTED_NODE_ATTRIBUTE: Dynamic = `vhUnsupported`;
var VERSION_DIFF_EXTENSIONS: Dynamic = [
  DiffInsertionMark,
  DiffDeletionMark,
  DiffFormattingMark,
  VersionDiffNodeAttributes,
];
var versionDiffSchema: Dynamic = null;
function getVersionDiffSchema(..._extraArguments: unknown[]): Dynamic {
  versionDiffSchema ??= getSchema([
    ...proseExtensions,
    ...VERSION_DIFF_EXTENSIONS,
  ]);
  return versionDiffSchema;
}
var isRecord: Dynamic = (
  candidate?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  typeof candidate == `object` && !!candidate && !Array.isArray(candidate);
var knownDiffMarkNames: Dynamic = new (Set as Dynamic)(
  Object.values(DIFF_MARK_TYPES),
);
var isDiffMarkName: Dynamic = (
  markName?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => knownDiffMarkNames.has(markName);
var DIFF_MARK_ORDER: Dynamic = {
  diffIns: 0,
  diffDel: 1,
  diffFmt: 2,
};
var TEXT_BLOCK_TYPES: Dynamic = new (Set as Dynamic)([
  `paragraph`,
  `codeBlock`,
]);
var MAX_UNSUPPORTED_NODE_NAME_CHARS: Dynamic = 40;
function diffNodeAttributes(
  attrs?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let diffAttributes: Dynamic = {};
  for (let diffNodeAttributesResult of [
    DIFF_ATTRIBUTE_NAMES.kind,
    DIFF_ATTRIBUTE_NAMES.id,
    DIFF_ATTRIBUTE_NAMES.summary,
  ] as Dynamic)
    if (attrs?.[diffNodeAttributesResult] !== undefined) {
      diffAttributes[diffNodeAttributesResult] =
        attrs[diffNodeAttributesResult];
    }
  return diffAttributes;
}
function unsupportedNodeText(
  node?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let kind: Dynamic = node.attrs?.[DIFF_ATTRIBUTE_NAMES.kind];
  let diffId: Dynamic = node.attrs?.[DIFF_ATTRIBUTE_NAMES.id];
  let mark: Dynamic =
    kind === `ins` || kind === `del`
      ? {
          type: kind === `ins` ? DIFF_MARK_TYPES.ins : DIFF_MARK_TYPES.del,
          attrs: {
            id: typeof diffId == `string` ? diffId : null,
          },
        }
      : null;
  return {
    type: `text`,
    text: `[${node.type.slice(0, MAX_UNSUPPORTED_NODE_NAME_CHARS)}]`,
    ...(mark
      ? {
          marks: [mark],
        }
      : {}),
  };
}
function flattenUnsupportedContent(
  node?: Dynamic,
  schema?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let inlineContent: Dynamic = [];
  let visit = (node2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let content: Dynamic = node2.content ?? [];
    if (
      content.some(
        (content2?: Dynamic, ..._extraArguments: unknown[]) =>
          content2.type === `text`,
      )
    ) {
      let flatMap: Dynamic = content.flatMap(
        (content2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          content2.type === `text` &&
          typeof content2.text == `string` &&
          content2.text.length > 0
            ? [
                {
                  type: `text`,
                  text: content2.text,
                  marks: (content2.marks ?? []).filter(
                    (mark?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                      hasMarkType(schema, mark.type),
                  ),
                },
              ]
            : [],
      );
      if (flatMap.length) {
        inlineContent.push(flatMap);
      }
      return;
    }
    for (let flattenUnsupportedContentResult of content as Dynamic)
      visit(flattenUnsupportedContentResult);
  };
  visit(node);
  let blocks: Dynamic = [];
  for (let [
    flattenUnsupportedContentResult,
    flattenUnsupportedContentResult2,
  ] of inlineContent.entries() as Dynamic) {
    if (flattenUnsupportedContentResult > 0) {
      blocks.push({
        type: `hardBreak`,
      });
    }
    (blocks.push as Dynamic)(...flattenUnsupportedContentResult2);
  }
  return {
    type: `paragraph`,
    attrs: {
      ...diffNodeAttributes(node.attrs),
      [UNSUPPORTED_NODE_ATTRIBUTE]: node.type.slice(
        0,
        MAX_UNSUPPORTED_NODE_NAME_CHARS,
      ),
    },
    content: blocks,
  };
}
var hasNodeType: Dynamic = (
  schema?: Dynamic,
  typeName?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => Object.hasOwn(schema.nodes, typeName);
var hasMarkType: Dynamic = (
  schema?: Dynamic,
  typeName?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => Object.hasOwn(schema.marks, typeName);
var isInlineType: Dynamic = (
  schema?: Dynamic,
  typeName?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  typeName === `text` ||
  (hasNodeType(schema, typeName) && schema.nodes[typeName].isInline);
var unsupportedBlockWrapper: Dynamic = (
  node?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => ({
  type: `paragraph`,
  attrs: {
    ...diffNodeAttributes(node.attrs),
    [UNSUPPORTED_NODE_ATTRIBUTE]: node.type.slice(
      0,
      MAX_UNSUPPORTED_NODE_NAME_CHARS,
    ),
  },
  content: [node],
});
var MAX_PREVIEW_MEDIA_WIDTH_PX: Dynamic = 1e4;
var boundedTableSpan: Dynamic = (
  span?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  typeof span == `number` && Number.isFinite(span)
    ? Math.min(MAX_DIFF_COLUMN_SPAN, Math.max(1, Math.trunc(span)))
    : 1;
function normalizeTableCells(
  cells?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let remainingColumns: Dynamic = MAX_DIFF_ROW_SPAN;
  return cells.map(
    (
      cell?: Dynamic,
      index?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let difference: Dynamic = cells.length - index - 1;
      let max: Dynamic = Math.max(
        1,
        Math.min(
          boundedTableSpan(cell.attrs?.colspan),
          remainingColumns - difference,
        ),
      );
      remainingColumns -= max;
      let colwidth: Dynamic = cell.attrs?.colwidth;
      let mappedColwidthSlice: Dynamic = Array.isArray(colwidth)
        ? colwidth
            .slice(0, max)
            .map(
              (
                colwidthSlice?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic =>
                typeof colwidthSlice == `number` &&
                Number.isFinite(colwidthSlice) &&
                colwidthSlice > 0
                  ? Math.min(
                      Math.round(colwidthSlice),
                      MAX_PREVIEW_MEDIA_WIDTH_PX,
                    )
                  : null,
            )
        : [];
      return {
        ...cell,
        attrs: {
          ...cell.attrs,
          colspan: max,
          rowspan: boundedTableSpan(cell.attrs?.rowspan),
          colwidth:
            mappedColwidthSlice.length === max &&
            mappedColwidthSlice.every(
              (mappedColwidthSlice2?: Dynamic, ..._extraArguments: unknown[]) =>
                mappedColwidthSlice2 !== null,
            )
              ? mappedColwidthSlice
              : null,
        },
      };
    },
  );
}
function normalizePreviewDocument(
  documentJson?: Dynamic,
  schema?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let codeDiffs: Dynamic = [];
  let normalizeNode: Dynamic = (
    node?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (node.type === `text`) {
      if (typeof node.text != `string` || node.text.length === 0) return null;
      let filteredMarks: Dynamic = (node.marks ?? []).filter(
        (mark?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          hasMarkType(schema, mark.type),
      );
      return {
        ...node,
        marks: filteredMarks,
      };
    }
    if (node.attrs?.diffGhost === `move` && !node.content?.length) {
      let andFill: Dynamic = (
        hasNodeType(schema, node.type) && !isInlineType(schema, node.type)
          ? schema.nodes[node.type]
          : schema.nodes.paragraph
      ).createAndFill({
        ...diffNodeAttributes(node.attrs),
        diffGhost: `move`,
        diffMoveTo: node.attrs.diffMoveTo ?? null,
      });
      if (andFill !== null) {
        let toJSON: Dynamic = andFill.toJSON();
        let normalizePreviewDocumentHandler: Dynamic = (
          node2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          +(node2.type === `codeBlock`) +
          (node2.content ?? []).reduce(
            (
              accumulator?: Dynamic,
              content?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              accumulator + normalizePreviewDocumentHandler(content),
            0,
          );
        for (
          let previewDocumentHandler: Dynamic =
            normalizePreviewDocumentHandler(toJSON);
          previewDocumentHandler > 0;
          previewDocumentHandler--
        )
          codeDiffs.push([]);
        return toJSON;
      }
    }
    if (!hasNodeType(schema, node.type))
      return options !== null && TEXT_BLOCK_TYPES.has(options)
        ? node.content?.length
          ? null
          : unsupportedNodeText(node)
        : flattenUnsupportedContent(node, schema);
    let record: Dynamic = {
      ...node,
    };
    if (node.type === `codeBlock`) {
      let items: Dynamic = [];
      for (let normalizePreviewDocumentResult of (node.content ??
        []) as Dynamic) {
        let normalizePreviewDocumentResult2: Dynamic =
          normalizePreviewDocumentResult.type === `text`
            ? normalizePreviewDocumentResult
            : unsupportedNodeText(normalizePreviewDocumentResult);
        if (
          typeof normalizePreviewDocumentResult2.text != `string` ||
          normalizePreviewDocumentResult2.text.length === 0
        )
          continue;
        let items2: Dynamic = [];
        for (let normalizePreviewDocumentResult3 of (normalizePreviewDocumentResult2.marks ??
          []) as Dynamic)
          if (isDiffMarkName(normalizePreviewDocumentResult3.type)) {
            items2.push({
              type: normalizePreviewDocumentResult3.type,
              id:
                typeof normalizePreviewDocumentResult3.attrs?.id == `string`
                  ? normalizePreviewDocumentResult3.attrs.id
                  : ``,
              summary:
                typeof normalizePreviewDocumentResult3.attrs?.summary ==
                `string`
                  ? normalizePreviewDocumentResult3.attrs.summary
                  : null,
            });
          }
        items2.sort(
          (
            item?: Dynamic,
            item2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            DIFF_MARK_ORDER[item.type] - DIFF_MARK_ORDER[item2.type],
        );
        items.push({
          text: normalizePreviewDocumentResult2.text,
          marks: items2,
        });
      }
      codeDiffs.push(items);
      let mappedItemsText: Dynamic = items
        .map(
          (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => item.text,
        )
        .join(``);
      record.content =
        mappedItemsText.length > 0
          ? [
              {
                type: `text`,
                text: mappedItemsText,
              },
            ]
          : [];
      return record;
    }
    if (node.content) {
      record.content = node.content
        .map(
          (content?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            normalizeNode(content, node.type),
        )
        .filter(
          (mappedContent?: Dynamic, ..._extraArguments: unknown[]) =>
            mappedContent !== null,
        );
    }
    if (node.type === `tableRow` && record.content) {
      record.content = normalizeTableCells(record.content);
    }
    if (node.type === schema.topNodeType.name && record.content) {
      record.content = record.content.map(
        (content?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          isInlineType(schema, content.type)
            ? unsupportedBlockWrapper(content)
            : content,
      );
    }
    return record;
  };
  return {
    json: normalizeNode(documentJson, null) ?? {
      type: `doc`,
      content: [],
    },
    code: codeDiffs,
  };
}
function parsePreviewDocument(
  documentJson?: Dynamic,
  schema?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let topNodeType: Dynamic = schema.topNodeType;
  if (
    documentJson.type === topNodeType.name &&
    (documentJson.content ?? []).length === 0
  )
    return topNodeType.create(null, []);
  try {
    let fromJSON: Dynamic = Node.fromJSON(schema, documentJson);
    fromJSON.check();
    return fromJSON;
  } catch {
    let mappedContent: Dynamic = (documentJson.content ?? []).map(
      (content?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        try {
          let fromJSON: Dynamic = Node.fromJSON(schema, content);
          fromJSON.check();
          if (topNodeType.contentMatch.matchType(fromJSON.type) === null)
            throw Error(`not a top-level block`);
          return fromJSON;
        } catch {
          return Node.fromJSON(
            schema,
            flattenUnsupportedContent(content, schema),
          );
        }
      },
    );
    let create: Dynamic = topNodeType.create(null, mappedContent);
    create.check();
    return create;
  }
}
function diffMarkElement(
  document2?: Dynamic,
  mark?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let element: Dynamic = document2.createElement(
    mark.type === `diffIns` ? `ins` : mark.type === `diffDel` ? `del` : `span`,
  );
  element.className =
    mark.type === `diffIns`
      ? `vh-ins`
      : mark.type === `diffDel`
        ? `vh-del`
        : `vh-fmt`;
  element.setAttribute(`data-diff-id`, mark.id);
  if (mark.type === `diffFmt` && mark.summary) {
    element.setAttribute(`data-diff-summary`, mark.summary);
    element.setAttribute(`title`, mark.summary);
  }
  return element;
}
function appendCodeDiffSegments(
  document2?: Dynamic,
  parent?: Dynamic,
  segments?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let mergedSegments: Dynamic = [];
  for (let appendCodeDiffSegmentsResult of segments as Dynamic) {
    let mergedSegmentItem: Dynamic = mergedSegments[mergedSegments.length - 1];
    if (
      mergedSegmentItem &&
      JSON.stringify(mergedSegmentItem.marks) ===
        JSON.stringify(appendCodeDiffSegmentsResult.marks)
    ) {
      mergedSegmentItem.text += appendCodeDiffSegmentsResult.text;
    } else {
      mergedSegments.push({
        text: appendCodeDiffSegmentsResult.text,
        marks: appendCodeDiffSegmentsResult.marks,
      });
    }
  }
  for (let appendCodeDiffSegmentsResult of mergedSegments as Dynamic) {
    let textNode: Dynamic = document2.createTextNode(
      appendCodeDiffSegmentsResult.text,
    );
    for (
      let difference: Dynamic = appendCodeDiffSegmentsResult.marks.length - 1;
      difference >= 0;
      difference--
    ) {
      let diffMarkElement2: Dynamic = diffMarkElement(
        document2,
        appendCodeDiffSegmentsResult.marks[difference],
      );
      diffMarkElement2.appendChild(textNode);
      textNode = diffMarkElement2;
    }
    parent.appendChild(textNode);
  }
}
function codeDiffByNode(
  doc?: Dynamic,
  codeDiffs?: Dynamic,
  documentJson?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let codeTexts: Dynamic = [];
  let collectCodeTexts = (
    node?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (node.type === `codeBlock`) {
      codeTexts.push(
        (node.content ?? [])
          .map(
            (content?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              content.text ?? ``,
          )
          .join(``),
      );
    }
    for (let codeDiffByNodeResult of (node.content ?? []) as Dynamic)
      collectCodeTexts(codeDiffByNodeResult);
  };
  collectCodeTexts(documentJson);
  let diffByNode: Dynamic = new (Map as Dynamic)();
  let codeIndex: Dynamic = 0;
  doc.descendants(
    (codeDiffByNode2?: Dynamic, ..._extraArguments: unknown[]) => {
      if (codeDiffByNode2.type.name !== `codeBlock`) return true;
      for (
        ;
        codeIndex < codeTexts.length &&
        codeTexts[codeIndex] !== codeDiffByNode2.textContent;

      )
        codeIndex++;
      diffByNode.set(
        codeDiffByNode2,
        codeIndex < codeTexts.length
          ? codeDiffs[codeIndex++]
          : [
              {
                text: codeDiffByNode2.textContent,
                marks: [],
              },
            ],
      );
      return false;
    },
  );
  return diffByNode;
}
var normalizedText: Dynamic = (
  text?: Dynamic,
  maxCharacters?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => {
  if (typeof text != `string`) return ``;
  let normalized: Dynamic = text.replace(/\s+/g, ` `).trim();
  return normalized.length <= maxCharacters
    ? normalized
    : Array.from<Dynamic>(normalized).slice(0, maxCharacters).join(``);
};
var MIME_PATTERN: Dynamic = /^[\w.+-]+\/[\w.+-]+$/;
function previewCard(
  document2?: Dynamic,
  tag?: Dynamic,
  className?: Dynamic,
  label?: Dynamic,
  detail?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let card: Dynamic = document2.createElement(tag);
  card.className = className;
  let labelElement: Dynamic = document2.createElement(`span`);
  labelElement.className = `vh-card-label`;
  labelElement.textContent = label;
  card.appendChild(labelElement);
  if (detail) {
    let element: Dynamic = document2.createElement(`span`);
    element.className = `vh-card-meta`;
    element.textContent = detail;
    card.appendChild(element);
  }
  return card;
}
var MEDIA_ALIGNMENTS: Dynamic = new (Set as Dynamic)([
  `left`,
  `center`,
  `right`,
]);
function applyMediaDimensions(
  element?: Dynamic,
  dimensions?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let styles: Dynamic = [];
  if (dimensions.width > 0) {
    styles.push(`width:${dimensions.width}px`);
  }
  if (dimensions.ratio !== null) {
    styles.push(`aspect-ratio:${dimensions.ratio}`);
  }
  let align: Dynamic =
    typeof dimensions.align == `string` &&
    MEDIA_ALIGNMENTS.has(dimensions.align)
      ? dimensions.align
      : null;
  if (align !== null) {
    element.setAttribute(`data-align`, align);
    if (align !== `left`) {
      if (dimensions.inline) {
        styles.push(`display:flex`);
      }
      styles.push(
        align === `center`
          ? `margin-left:auto;margin-right:auto`
          : `margin-left:auto`,
      );
    }
  }
  if (styles.length > 0) {
    element.setAttribute(`style`, styles.join(`;`));
  }
}
function mediaPreviewCard(
  document2?: Dynamic,
  node?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let mime: Dynamic = normalizedText(node.attrs.mime, 128);
  let normalizedMime: Dynamic = MIME_PATTERN.test(mime)
    ? mime.toLowerCase()
    : ``;
  let label: Dynamic = normalizedMime.startsWith(`image/`)
    ? `Image`
    : normalizedMime.startsWith(`video/`)
      ? `Video`
      : `File`;
  let alt: Dynamic = normalizedText(node.attrs.alt, 300);
  let card: Dynamic = previewCard(
    document2,
    `span`,
    `vh-card vh-media`,
    alt || label,
    normalizedMime || label.toLowerCase(),
  );
  card.setAttribute(`role`, `img`);
  card.setAttribute(`aria-label`, alt || label);
  if (Object.keys(diffHtmlAttributes(node.attrs)).length > 0) {
    card.setAttribute(`data-diff-atom`, ``);
  }
  let dimensions: Dynamic = resolveEditorMediaValue3(node.attrs.dims);
  applyMediaDimensions(card, {
    width: Math.min(
      Math.round(resolveEditorMediaWidth(node.attrs)),
      MAX_PREVIEW_MEDIA_WIDTH_PX,
    ),
    ratio: dimensions
      ? `${Math.max(1, Math.round(dimensions.w))} / ${Math.max(1, Math.round(dimensions.h))}`
      : null,
    align: node.attrs.align,
    inline: true,
  });
  return card;
}
function embedPreviewCard(
  document2?: Dynamic,
  node?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let caption: Dynamic = normalizedText(node.attrs.caption, 300);
  let ref: Dynamic = normalizedText(node.attrs.ref, 120);
  let rawWidth: Dynamic = Number(node.attrs.width);
  let width: Dynamic =
    Number.isFinite(rawWidth) && rawWidth > 0
      ? Math.min(Math.round(rawWidth), MAX_PREVIEW_MEDIA_WIDTH_PX)
      : 0;
  let detail: Dynamic = [ref, width > 0 ? `${width}px wide` : ``]
    .filter(Boolean)
    .join(` · `);
  let card: Dynamic = previewCard(
    document2,
    `figure`,
    `vh-card vh-embed`,
    caption || `Embedded content`,
    detail,
  );
  let referenceElement: Dynamic = document2.createElement(`span`);
  referenceElement.setAttribute(
    WIDGET_CODE_SLOT_ATTRIBUTE,
    String(node.attrs.ref ?? ``),
  );
  card.appendChild(referenceElement);
  applyMediaDimensions(card, {
    width: width,
    ratio: null,
    align: node.attrs.align,
    inline: false,
  });
  return card;
}
var isElementNode = (node?: Dynamic, ..._extraArguments: unknown[]) =>
  node.nodeType === 1;
function applyDiffAttributes(
  element?: Dynamic,
  attrs?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (isElementNode(element))
    for (let [
      applyDiffAttributesResult,
      applyDiffAttributesResult2,
    ] of Object.entries(diffHtmlAttributes(attrs)) as Dynamic)
      element.setAttribute(
        applyDiffAttributesResult,
        applyDiffAttributesResult2,
      );
}
function renderDiffNodeSpec(
  document2?: Dynamic,
  spec?: Dynamic,
  node?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (Object.keys(diffHtmlAttributes(node.attrs)).length === 0) return spec;
  let rendered: Dynamic = DOMSerializer.renderSpec(document2, spec);
  applyDiffAttributes(rendered.dom, node.attrs);
  return rendered.contentDOM
    ? {
        dom: rendered.dom,
        contentDOM: rendered.contentDOM,
      }
    : {
        dom: rendered.dom,
      };
}
var LINK_ATTRIBUTES: Dynamic = [`href`, `target`, `rel`];
function stripLinkAttributes(
  spec?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!Array.isArray(spec)) return spec;
  let [tag, attrs, ...children]: Dynamic = spec;
  if (typeof attrs != `object` || !attrs || Array.isArray(attrs)) return spec;
  let safeAttrs: Dynamic = {
    ...attrs,
  };
  for (let stripLinkAttributesResult of LINK_ATTRIBUTES as Dynamic)
    delete safeAttrs[stripLinkAttributesResult];
  return [tag, safeAttrs, ...children];
}
var CHANGED_INLINE_ATTRIBUTES: Dynamic = {
  dropdown: [`enum`, `index`],
  date: [`ts`],
  mention: [`principal`, `ref`],
};
var EMPTY_DIFF_ATTRIBUTES: Dynamic = {
  diff: null,
  diffId: null,
  diffSummary: null,
  diffBefore: null,
};
function previewDomSerializer(
  schema?: Dynamic,
  document2?: Dynamic,
  codeDiffs?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let nodeSerializers: Dynamic = DOMSerializer.nodesFromSchema(schema);
  let markSerializers: Dynamic = DOMSerializer.marksFromSchema(schema);
  let wrappedSerializers: Dynamic = {};
  for (let [
    previewDomSerializerResult,
    previewDomSerializerResult2,
  ] of Object.entries(nodeSerializers) as Dynamic)
    wrappedSerializers[previewDomSerializerResult] = (
      previewDomSerializer2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      renderDiffNodeSpec(
        document2,
        previewDomSerializerResult2(previewDomSerializer2),
        previewDomSerializer2,
      );
  let codeBlockSerializer: Dynamic = nodeSerializers.codeBlock;
  if (codeBlockSerializer) {
    wrappedSerializers.codeBlock = (
      previewDomSerializer2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let renderSpec: Dynamic = DOMSerializer.renderSpec(
        document2,
        codeBlockSerializer(previewDomSerializer2),
      );
      appendCodeDiffSegments(
        document2,
        renderSpec.contentDOM ?? renderSpec.dom,
        codeDiffs.get(previewDomSerializer2) ?? [],
      );
      applyDiffAttributes(renderSpec.dom, previewDomSerializer2.attrs);
      return {
        dom: renderSpec.dom,
      };
    };
  }
  wrappedSerializers.media = (
    previewDomSerializer2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let mediaPreviewCard2: Dynamic = mediaPreviewCard(
      document2,
      previewDomSerializer2,
    );
    applyDiffAttributes(mediaPreviewCard2, previewDomSerializer2.attrs);
    return {
      dom: mediaPreviewCard2,
    };
  };
  wrappedSerializers.embed = (
    previewDomSerializer2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let embedPreviewCard2: Dynamic = embedPreviewCard(
      document2,
      previewDomSerializer2,
    );
    applyDiffAttributes(embedPreviewCard2, previewDomSerializer2.attrs);
    return {
      dom: embedPreviewCard2,
    };
  };
  for (let [
    previewDomSerializerResult,
    previewDomSerializerResult2,
  ] of Object.entries(schema.nodes) as Dynamic) {
    let nodeSerializerItem: Dynamic =
      nodeSerializers[previewDomSerializerResult];
    if (
      !(
        !nodeSerializerItem ||
        !previewDomSerializerResult2.spec.attrs ||
        !(`colspan` in previewDomSerializerResult2.spec.attrs)
      )
    ) {
      wrappedSerializers[previewDomSerializerResult] = (
        previewDomSerializer2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let renderDiffNodeSpec2: Dynamic = renderDiffNodeSpec(
          document2,
          nodeSerializerItem(previewDomSerializer2),
          previewDomSerializer2,
        );
        let diffBefore: Dynamic = previewDomSerializer2.attrs.diffBefore;
        if (
          !isRecord(diffBefore) ||
          (diffBefore.colspan === undefined && diffBefore.rowspan === undefined)
        )
          return renderDiffNodeSpec2;
        let renderSpec: Dynamic = DOMSerializer.renderSpec(
          document2,
          renderDiffNodeSpec2,
        );
        if (isElementNode(renderSpec.dom)) {
          if (diffBefore.colspan !== undefined) {
            renderSpec.dom.setAttribute(
              ORIGINAL_COLSPAN_ATTRIBUTE,
              String(boundedTableSpan(diffBefore.colspan)),
            );
          }
          if (diffBefore.rowspan !== undefined) {
            renderSpec.dom.setAttribute(
              ORIGINAL_ROWSPAN_ATTRIBUTE,
              String(boundedTableSpan(diffBefore.rowspan)),
            );
          }
        }
        return renderSpec.contentDOM
          ? {
              dom: renderSpec.dom,
              contentDOM: renderSpec.contentDOM,
            }
          : {
              dom: renderSpec.dom,
            };
      };
    }
  }
  let renderChangedInline: Dynamic = (
    previewDomSerializer2?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let dom: Dynamic = DOMSerializer.renderSpec(
      document2,
      previewDomSerializer2(options2),
    ).dom;
    if (isElementNode(dom)) {
      if (options2.type.name === `dropdown`) {
        renderPreviewDropdown(document2, dom, options2, options);
      } else {
        if (options2.type.name === `date`) {
          renderPreviewDate(dom, options2);
        }
      }
    }
    return dom;
  };
  for (let [
    previewDomSerializerResult,
    previewDomSerializerResult2,
  ] of Object.entries(CHANGED_INLINE_ATTRIBUTES) as Dynamic) {
    let nodeSerializerItem: Dynamic =
      nodeSerializers[previewDomSerializerResult];
    if (nodeSerializerItem) {
      wrappedSerializers[previewDomSerializerResult] = (
        previewDomSerializer2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let renderChangedInline2: Dynamic = renderChangedInline(
          nodeSerializerItem,
          previewDomSerializer2,
        );
        applyDiffAttributes(renderChangedInline2, previewDomSerializer2.attrs);
        if (
          isElementNode(renderChangedInline2) &&
          Object.keys(diffHtmlAttributes(previewDomSerializer2.attrs)).length >
            0
        ) {
          renderChangedInline2.setAttribute(`data-diff-atom`, ``);
        }
        let diffBefore: Dynamic = previewDomSerializer2.attrs.diffBefore;
        if (
          previewDomSerializer2.attrs.diff !== `chg` ||
          !isRecord(diffBefore) ||
          !previewDomSerializerResult2.some(
            (
              previewDomSerializerResult3?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              previewDomSerializerResult3 in diffBefore &&
              diffBefore[previewDomSerializerResult3] !==
                previewDomSerializer2.attrs[previewDomSerializerResult3],
          )
        )
          return renderChangedInline2;
        let create: Dynamic = previewDomSerializer2.type.create(
          {
            ...previewDomSerializer2.attrs,
            ...diffBefore,
            ...EMPTY_DIFF_ATTRIBUTES,
          },
          null,
          previewDomSerializer2.marks,
        );
        let element: Dynamic = document2.createElement(`del`);
        element.className = `vh-del`;
        element.setAttribute(`data-diff-ghost`, ``);
        element.setAttribute(`aria-hidden`, `true`);
        element.appendChild(renderChangedInline(nodeSerializerItem, create));
        let documentFragment: Dynamic = document2.createDocumentFragment();
        documentFragment.append(element, renderChangedInline2);
        return documentFragment;
      };
    }
  }
  let blockquoteSerializer: Dynamic = nodeSerializers.blockquote;
  if (blockquoteSerializer) {
    wrappedSerializers.blockquote = (
      previewDomSerializer2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let renderDiffNodeSpec2: Dynamic = renderDiffNodeSpec(
        document2,
        blockquoteSerializer(previewDomSerializer2),
        previewDomSerializer2,
      );
      let ghostBlockquote2: Dynamic = ghostBlockquote(
        previewDomSerializer2,
        schema,
      );
      if (ghostBlockquote2 === null) return renderDiffNodeSpec2;
      let renderSpec: Dynamic = DOMSerializer.renderSpec(
        document2,
        renderDiffNodeSpec2,
      );
      if (isElementNode(renderSpec.dom)) {
        renderSpec.dom.classList.add(`ldoc-callout`);
        renderSpec.dom.setAttribute(`data-callout`, ghostBlockquote2);
      }
      return renderSpec.contentDOM
        ? {
            dom: renderSpec.dom,
            contentDOM: renderSpec.contentDOM,
          }
        : {
            dom: renderSpec.dom,
          };
    };
  }
  let paragraphSerializer: Dynamic = nodeSerializers.paragraph;
  if (paragraphSerializer) {
    wrappedSerializers.paragraph = (
      previewDomSerializer2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let renderDiffNodeSpec2: Dynamic = renderDiffNodeSpec(
        document2,
        paragraphSerializer(previewDomSerializer2),
        previewDomSerializer2,
      );
      let attrItem: Dynamic =
        previewDomSerializer2.attrs[UNSUPPORTED_NODE_ATTRIBUTE];
      if (typeof attrItem != `string` || attrItem.length === 0)
        return renderDiffNodeSpec2;
      let renderSpec: Dynamic = DOMSerializer.renderSpec(
        document2,
        renderDiffNodeSpec2,
      );
      let element: Dynamic = document2.createElement(`span`);
      element.className = `vh-unsupported-label`;
      element.textContent = `Unsupported block · ${attrItem}`;
      (renderSpec.contentDOM ?? renderSpec.dom).appendChild(element);
      return renderSpec.contentDOM
        ? {
            dom: renderSpec.dom,
            contentDOM: renderSpec.contentDOM,
          }
        : {
            dom: renderSpec.dom,
          };
    };
  }
  let wrappedMarks: Dynamic = {
    ...markSerializers,
  };
  let linkSerializer: Dynamic = markSerializers.link;
  if (linkSerializer) {
    wrappedMarks.link = (
      previewDomSerializer2?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      stripLinkAttributes(linkSerializer(previewDomSerializer2, options2));
  }
  return new (DOMSerializer as Dynamic)(wrappedSerializers, wrappedMarks);
}
var OBJECT_REPLACEMENT_CHARACTER: Dynamic = `￼`;
var MAX_GHOST_NESTING: Dynamic = 8;
function ghostBlockquote(
  node?: Dynamic,
  schema?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let firstChild: Dynamic = node.firstChild;
  let blockquote: Dynamic = schema.nodes.blockquote;
  let paragraph: Dynamic = schema.nodes.paragraph;
  if (
    !firstChild ||
    firstChild.type.name !== `paragraph` ||
    !blockquote ||
    !paragraph
  )
    return null;
  let ghostMark: Dynamic =
    node.attrs.diff === `del` ? DIFF_MARK_TYPES.ins : DIFF_MARK_TYPES.del;
  let ghostKind: Dynamic = node.attrs.diff === `del` ? `ins` : `del`;
  let placeholderText: Dynamic = ``;
  firstChild.forEach(
    (node2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (!(placeholderText.length >= MAX_GHOST_NESTING)) {
        if (!node2.isText) {
          if (node2.attrs.diff !== ghostKind) {
            placeholderText += OBJECT_REPLACEMENT_CHARACTER;
          }
          return;
        }
        if (
          !node2.marks.some(
            (mark?: Dynamic, ..._extraArguments: unknown[]) =>
              mark.type.name === ghostMark,
          )
        ) {
          placeholderText += node2.text ?? ``;
        }
      }
    },
  );
  return placeholderText === ``
    ? null
    : (proseMirrorCalloutKind(
        blockquote.create(
          null,
          paragraph.create(null, schema.text(placeholderText)),
        ),
      )?.kind ?? null);
}
function renderPreviewDropdown(
  document2?: Dynamic,
  element?: Dynamic,
  node?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let { enum: enumId, index: index }: Dynamic = node.attrs;
  let definition: Dynamic =
    typeof enumId == `string` ? (options.resolveEnum?.(enumId) ?? null) : null;
  let currentText: Dynamic = element.textContent ?? ``;
  let label: Dynamic = document2.createElement(`span`);
  label.className = `t`;
  if (typeof index == `number` && Number.isInteger(index) && index >= 0) {
    let optionItem: Dynamic = definition?.options[index];
    let record: Dynamic =
      typeof optionItem == `string`
        ? {
            name: optionItem,
          }
        : isRecord(optionItem)
          ? optionItem
          : null;
    let name: Dynamic = typeof record?.name == `string` ? record.name : ``;
    label.textContent = name || currentText || `Option ${index + 1}`;
    if (record !== null && name !== ``) {
      if (record.disabled === true) {
        element.setAttribute(`data-disabled-opt`, `true`);
      } else {
        element.setAttribute(`data-set`, `true`);
        element.classList.add(
          `dd-c-${resolveEditorChipsAndNodeViewsColor(record, index)}`,
        );
      }
    }
  } else {
    label.textContent =
      (typeof definition?.name == `string` && definition.name) || `Select`;
    label.setAttribute(`style`, `opacity:0.55`);
  }
  element.replaceChildren(label);
}
function renderPreviewDate(
  element?: Dynamic,
  node?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let timestamp: Dynamic = node.attrs.ts;
  if (!(typeof timestamp != `string` || timestamp === ``))
    try {
      element.textContent = resolveEditorChipsAndNodeViewsDate2(timestamp);
    } catch {}
}
function decoratePreviewChecklists(
  document2?: Dynamic,
  container?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  for (let element of Array.from<Dynamic>(
    container.querySelectorAll(`ul[data-kind="check"] > li`),
  ) as Dynamic) {
    let element2: Dynamic = document2.createElement(`div`);
    for (; element.firstChild; ) element2.appendChild(element.firstChild);
    let element3: Dynamic = document2.createElement(`label`);
    element3.className = `ldoc-check`;
    let element4: Dynamic = document2.createElement(`input`);
    element4.setAttribute(`type`, `checkbox`);
    element4.setAttribute(`disabled`, ``);
    if (element.getAttribute(`data-checked`) === `true`) {
      element4.setAttribute(`checked`, ``);
    }
    element3.appendChild(element4);
    element.append(element3, element2);
  }
}
var MAX_MOVE_GHOST_DEPTH: Dynamic = 4;
var STRUCTURAL_GHOST_TAGS: Dynamic = new (Set as Dynamic)([
  `li`,
  `tr`,
  `td`,
  `th`,
]);
function decorateMovedNodes(
  document2?: Dynamic,
  container?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let movedNodes: Dynamic = Array.from<Dynamic>(
    container.querySelectorAll(`[data-diff="move"]`),
  );
  let ghostNodes: Dynamic = new (Set as Dynamic)([
    ...Array.from<Dynamic>(
      container.querySelectorAll(`[data-diff-ghost="move"]`),
    ),
    ...Array.from<Dynamic>(
      container.querySelectorAll(
        `[data-diff="del"][data-diff-summary="Moved"]`,
      ),
    ),
  ]);
  for (let element of Array.from<Dynamic>(
    container.querySelectorAll(`[data-diff]`),
  ).filter(
    (matchedElement?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      ghostNodes.has(matchedElement),
  ) as Dynamic) {
    if (!container.contains(element)) continue;
    let attribute: Dynamic = element.getAttribute(`data-diff-id`) ?? ``;
    let previousElementSibling: Dynamic = element.previousElementSibling;
    if (
      attribute &&
      previousElementSibling?.classList.contains(`vh-moved`) &&
      previousElementSibling.getAttribute(`data-diff-id`) === attribute
    ) {
      element.remove();
      continue;
    }
    let attribute2: Dynamic =
      element.getAttribute(`data-diff-move-to`) || attribute;
    let movedNode: Dynamic = attribute2
      ? movedNodes.find(
          (element3?: Dynamic, ..._extraArguments: unknown[]) =>
            element3.getAttribute(`data-diff-id`) === attribute2,
        )
      : undefined;
    let label: Dynamic = movedNode
      ? element.compareDocumentPosition(movedNode) & MAX_MOVE_GHOST_DEPTH
        ? ` ↓`
        : ` ↑`
      : ``;
    let normalizedTagName: Dynamic = element.tagName.toLowerCase();
    let element2: Dynamic = element;
    if (STRUCTURAL_GHOST_TAGS.has(normalizedTagName)) {
      let reduce: Dynamic =
        normalizedTagName === `tr`
          ? Array.from<Dynamic>(element.children).reduce(
              (
                accumulator?: Dynamic,
                element3?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic =>
                accumulator + (Number(element3.getAttribute(`colspan`)) || 1),
              0,
            )
          : 0;
      element.replaceChildren();
      if (normalizedTagName === `tr`) {
        let element3: Dynamic = document2.createElement(`td`);
        element3.setAttribute(`colspan`, String(Math.max(1, reduce)));
        element3.textContent = `Moved${label}`;
        element.appendChild(element3);
      } else element.textContent = `Moved${label}`;
    } else {
      element2 = document2.createElement(`div`);
      for (let decorateMovedNodesResult of [
        `data-diff`,
        `data-diff-id`,
        `data-diff-summary`,
        `title`,
        `data-diff-ghost`,
        `data-diff-move-to`,
      ] as Dynamic) {
        let attribute3: Dynamic = element.getAttribute(
          decorateMovedNodesResult,
        );
        if (attribute3 !== null) {
          element2.setAttribute(decorateMovedNodesResult, attribute3);
        }
      }
      element2.textContent = `Moved${label}`;
      element.replaceWith(element2);
    }
    element2.classList.add(`vh-moved`);
  }
}
var ORIGINAL_COLSPAN_ATTRIBUTE: Dynamic = `data-vh-colspan-was`;
var ORIGINAL_ROWSPAN_ATTRIBUTE: Dynamic = `data-vh-rowspan-was`;
var tableCells: Dynamic = (
  row?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  Array.from<Dynamic>(row.children).filter(
    (children?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      children.tagName === `TD` || children.tagName === `TH`,
  );
var tableSpan: Dynamic = (
  cell?: Dynamic,
  attribute?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => {
  let span: Dynamic = Number(cell.getAttribute(attribute));
  return Number.isInteger(span) && span > 0
    ? Math.min(span, MAX_DIFF_COLUMN_SPAN)
    : 1;
};
function tableRows(table?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
  let rows: Dynamic = [];
  for (let node of Array.from<Dynamic>(table.children) as Dynamic)
    if (node.tagName === `TR`) rows.push(node);
    else if (
      node.tagName === `THEAD` ||
      node.tagName === `TBODY` ||
      node.tagName === `TFOOT`
    )
      for (let tableRowsResult of Array.from<Dynamic>(node.children) as Dynamic)
        if (tableRowsResult.tagName === `TR`) {
          rows.push(tableRowsResult);
        }
  return rows;
}
var EMPTY_TABLE_GRID: Dynamic = {
  width: 0,
  carry: [],
  holder: [],
};
function advanceTableGrid(
  cells?: Dynamic,
  carry?: Dynamic,
  holders?: Dynamic,
  spanOf: Dynamic = tableSpan,
  ..._extraArguments: unknown[]
): Dynamic {
  let nextCarry: Dynamic = carry.map(
    (carry2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      Math.max(0, carry2 - 1),
  );
  let nextHolders: Dynamic = holders.slice();
  let column: Dynamic = 0;
  for (let advanceTableGridResult of cells as Dynamic) {
    for (; (carry[column] ?? 0) > 0; ) column++;
    let spanOf2: Dynamic = spanOf(advanceTableGridResult, `colspan`);
    let spanOf3: Dynamic = spanOf(advanceTableGridResult, `rowspan`);
    for (let column2: Dynamic = column; column2 < column + spanOf2; column2++) {
      nextCarry[column2] = spanOf3 - 1;
      nextHolders[column2] = advanceTableGridResult;
    }
    column += spanOf2;
  }
  let width: Dynamic = column;
  for (
    let difference: Dynamic = carry.length - 1;
    difference >= width;
    difference--
  )
    if ((carry[difference] ?? 0) > 0) {
      width = difference + 1;
      break;
    }
  for (let index: Dynamic = 0; index < nextCarry.length; index++)
    nextCarry[index] ??= 0;
  return {
    width: width,
    carry: nextCarry,
    holder: nextHolders,
  };
}
var isDeletedElement = (element?: Dynamic, ..._extraArguments: unknown[]) =>
  element.getAttribute(`data-diff`) === `del`;
var isMovedElement: Dynamic = (
  element?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => element.classList.contains(`vh-moved`);
var isDeletedMovedElement: Dynamic = (
  element?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  isDeletedElement(element) &&
  (element.classList.contains(`vh-moved`) ||
    (element.children.length > 0 &&
      Array.from<Dynamic>(element.children).every(
        (children?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          children.classList.contains(`vh-moved`),
      )));
var allEqual: Dynamic = (
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  items.every(
    (item?: Dynamic, ..._extraArguments: unknown[]) => item === items[0],
  );
function repairPreviewTableSpans(
  container?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  for (let repairPreviewTableSpansResult of Array.from<Dynamic>(
    container.querySelectorAll(`table`),
  ) as Dynamic) {
    let tableRows2: Dynamic = tableRows(repairPreviewTableSpansResult);
    let lookup: Dynamic = new (Map as Dynamic)();
    for (let repairPreviewTableSpansResult2 of tableRows2 as Dynamic)
      for (let element of tableCells(
        repairPreviewTableSpansResult2,
      ) as Dynamic) {
        let attribute: Dynamic = element.getAttribute(
          ORIGINAL_COLSPAN_ATTRIBUTE,
        );
        let attribute2: Dynamic = element.getAttribute(
          ORIGINAL_ROWSPAN_ATTRIBUTE,
        );
        if (!(attribute === null && attribute2 === null)) {
          lookup.set(element, {
            ...(attribute === null
              ? {}
              : {
                  colspan: Number(attribute),
                }),
            ...(attribute2 === null
              ? {}
              : {
                  rowspan: Number(attribute2),
                }),
          });
          element.removeAttribute(ORIGINAL_COLSPAN_ATTRIBUTE);
          element.removeAttribute(ORIGINAL_ROWSPAN_ATTRIBUTE);
        }
      }
    if (
      !tableRows2.some(
        (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          isMovedElement(item) || tableCells(item).some(isDeletedElement),
      )
    )
      continue;
    let filteredTableRows: Dynamic = tableRows2.filter(
      (item?: Dynamic, ..._extraArguments: unknown[]) => !isMovedElement(item),
    );
    let repairPreviewTableSpansHandler: Dynamic = (
      repairPreviewTableSpans2?: Dynamic,
      options: Dynamic = tableSpan,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let EMPTYTABLEGRID2: Dynamic = EMPTY_TABLE_GRID;
      return filteredTableRows.map(
        (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          (EMPTYTABLEGRID2 = advanceTableGrid(
            tableCells(item).filter(repairPreviewTableSpans2),
            EMPTYTABLEGRID2.carry,
            EMPTYTABLEGRID2.holder,
            options,
          )).width,
      );
    };
    let repairPreviewTableSpansHandler2: Dynamic = (
      repairPreviewTableSpans2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      lookup.get(repairPreviewTableSpans2)?.[options] ??
      tableSpan(repairPreviewTableSpans2, options);
    let repairPreviewTableSpansHandler3: Dynamic =
      repairPreviewTableSpansHandler((..._extraArguments: unknown[]) => true);
    if (
      !allEqual(repairPreviewTableSpansHandler3) &&
      allEqual(
        repairPreviewTableSpansHandler(
          (repairPreviewTableSpans2?: Dynamic, ..._extraArguments: unknown[]) =>
            !isDeletedMovedElement(repairPreviewTableSpans2),
        ),
      )
    ) {
      for (let repairPreviewTableSpansResult2 of filteredTableRows as Dynamic)
        for (let repairPreviewTableSpansResult3 of tableCells(
          repairPreviewTableSpansResult2,
        ) as Dynamic)
          if (isDeletedMovedElement(repairPreviewTableSpansResult3)) {
            repairPreviewTableSpansResult3.remove();
          }
      repairPreviewTableSpansHandler3 = repairPreviewTableSpansHandler(
        (..._extraArguments: unknown[]) => true,
      );
    }
    if (
      !allEqual(repairPreviewTableSpansHandler3) &&
      lookup.size > 0 &&
      allEqual(
        repairPreviewTableSpansHandler(
          (..._extraArguments: unknown[]) => true,
          repairPreviewTableSpansHandler2,
        ),
      )
    ) {
      for (let [
        repairPreviewTableSpansResult2,
        repairPreviewTableSpansResult3,
      ] of lookup as Dynamic) {
        if (repairPreviewTableSpansResult3.colspan !== undefined) {
          repairPreviewTableSpansResult2.setAttribute(
            `colspan`,
            String(repairPreviewTableSpansResult3.colspan),
          );
        }
        if (repairPreviewTableSpansResult3.rowspan !== undefined) {
          repairPreviewTableSpansResult2.setAttribute(
            `rowspan`,
            String(repairPreviewTableSpansResult3.rowspan),
          );
        }
      }
      repairPreviewTableSpansHandler3 = repairPreviewTableSpansHandler(
        (..._extraArguments: unknown[]) => true,
      );
    }
    let reduce: Dynamic = repairPreviewTableSpansHandler3.reduce(
      (
        accumulator?: Dynamic,
        repairPreviewTableSpansHandler4?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => Math.min(accumulator, repairPreviewTableSpansHandler4),
      1 / 0,
    );
    let reduce2: Dynamic = repairPreviewTableSpansHandler3.reduce(
      (
        accumulator?: Dynamic,
        repairPreviewTableSpansHandler4?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => Math.max(accumulator, repairPreviewTableSpansHandler4),
      0,
    );
    let reduce3: Dynamic = repairPreviewTableSpansHandler(
      (repairPreviewTableSpans2?: Dynamic, ..._extraArguments: unknown[]) =>
        !isDeletedElement(repairPreviewTableSpans2),
    ).reduce(
      (
        accumulator?: Dynamic,
        repairPreviewTableSpansHandler4?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => Math.max(accumulator, repairPreviewTableSpansHandler4),
      0,
    );
    let reduce4: Dynamic =
      reduce === reduce2 ? reduce2 : Math.max(reduce3, reduce);
    let EMPTYTABLEGRID: Dynamic = EMPTY_TABLE_GRID;
    for (let repairPreviewTableSpansResult2 of tableRows2 as Dynamic) {
      if (isMovedElement(repairPreviewTableSpansResult2)) {
        let uniqueItems: Dynamic = new (Set as Dynamic)(
          EMPTYTABLEGRID.holder.filter(
            (
              holder?: Dynamic,
              index?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              holder !== undefined && (EMPTYTABLEGRID.carry[index] ?? 0) > 0,
          ),
        );
        for (let repairPreviewTableSpansResult3 of uniqueItems as Dynamic)
          repairPreviewTableSpansResult3.setAttribute(
            `rowspan`,
            String(tableSpan(repairPreviewTableSpansResult3, `rowspan`) + 1),
          );
        let filteredCarryCount: Dynamic = EMPTYTABLEGRID.carry.filter(
          (carry?: Dynamic, ..._extraArguments: unknown[]) => carry > 0,
        ).length;
        let tableCellItem: Dynamic = tableCells(
          repairPreviewTableSpansResult2,
        )[0];
        if (tableCellItem) {
          tableCellItem.setAttribute(
            `colspan`,
            String(Math.max(1, reduce4 - filteredCarryCount)),
          );
        }
        continue;
      }
      let advanceTableGrid2: Dynamic = advanceTableGrid(
        tableCells(repairPreviewTableSpansResult2),
        EMPTYTABLEGRID.carry,
        EMPTYTABLEGRID.holder,
      );
      for (; advanceTableGrid2.width > reduce4; ) {
        let tableCells2: Dynamic = tableCells(repairPreviewTableSpansResult2);
        let filteredTableCells: Dynamic = tableCells2.filter(isDeletedElement);
        if (filteredTableCells.length === 0) break;
        let filteredTableCell: Dynamic =
          filteredTableCells.find(isDeletedMovedElement) ??
          filteredTableCells[filteredTableCells.length - 1];
        let tableCellIndex: Dynamic = tableCells2.indexOf(filteredTableCell);
        let findLast: Dynamic =
          tableCells2
            .slice(0, tableCellIndex)
            .findLast(
              (tableCellsSlice?: Dynamic, ..._extraArguments: unknown[]) =>
                !isDeletedElement(tableCellsSlice),
            ) ??
          tableCells2
            .slice(tableCellIndex + 1)
            .find(
              (tableCellsSlice?: Dynamic, ..._extraArguments: unknown[]) =>
                !isDeletedElement(tableCellsSlice),
            ) ??
          null;
        if (findLast !== null) {
          for (let repairPreviewTableSpansResult3 of Array.from<Dynamic>(
            filteredTableCell.children,
          ) as Dynamic)
            if (
              !repairPreviewTableSpansResult3.classList.contains(`vh-moved`)
            ) {
              if (!repairPreviewTableSpansResult3.hasAttribute(`data-diff`))
                for (let repairPreviewTableSpansResult4 of [
                  `data-diff`,
                  `data-diff-id`,
                ] as Dynamic) {
                  let attribute: Dynamic = filteredTableCell.getAttribute(
                    repairPreviewTableSpansResult4,
                  );
                  if (attribute !== null) {
                    repairPreviewTableSpansResult3.setAttribute(
                      repairPreviewTableSpansResult4,
                      attribute,
                    );
                  }
                }
              findLast.appendChild(repairPreviewTableSpansResult3);
            }
        }
        filteredTableCell.remove();
        advanceTableGrid2 = advanceTableGrid(
          tableCells(repairPreviewTableSpansResult2),
          EMPTYTABLEGRID.carry,
          EMPTYTABLEGRID.holder,
        );
      }
      EMPTYTABLEGRID = advanceTableGrid2;
    }
  }
  for (let repairPreviewTableSpansResult of Array.from<Dynamic>(
    container.querySelectorAll(
      `[${ORIGINAL_COLSPAN_ATTRIBUTE}],[${ORIGINAL_ROWSPAN_ATTRIBUTE}]`,
    ),
  ) as Dynamic) {
    repairPreviewTableSpansResult.removeAttribute(ORIGINAL_COLSPAN_ATTRIBUTE);
    repairPreviewTableSpansResult.removeAttribute(ORIGINAL_ROWSPAN_ATTRIBUTE);
  }
}
var INVISIBLE_TAB_SPACES: Dynamic = 4;
var WHITESPACE_PATTERN: Dynamic = /^\s+$/;
function invisibleDiffSpan(
  document2?: Dynamic,
  kind?: Dynamic,
  invisibleKind?: Dynamic,
  text?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let span: Dynamic = document2.createElement(`span`);
  span.className = `vh-invisible`;
  span.setAttribute(`data-vh-invisible`, invisibleKind);
  span.setAttribute(`data-diff`, kind);
  span.setAttribute(`aria-hidden`, `true`);
  span.textContent = text;
  return span;
}
function decorateInvisibleDiffs(
  document2?: Dynamic,
  container?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  for (let element of Array.from<Dynamic>(
    container.querySelectorAll(`br`),
  ) as Dynamic) {
    let attribute: Dynamic = element.getAttribute(`data-diff`);
    let parentElement: Dynamic = element.parentElement;
    let matchesParentElement: Dynamic =
      parentElement !== null &&
      parentElement.matches(`ins.vh-ins, del.vh-del`) &&
      !parentElement.hasAttribute(`data-diff-ghost`);
    let attribute2: Dynamic =
      attribute === `ins` || attribute === `del`
        ? attribute
        : matchesParentElement
          ? parentElement.tagName === `INS`
            ? `ins`
            : `del`
          : null;
    if (attribute2 === null) continue;
    let invisibleDiffSpan2: Dynamic = invisibleDiffSpan(
      document2,
      attribute2,
      `break`,
      `↵`,
    );
    if (attribute !== null)
      for (let decorateInvisibleDiffsResult of [
        `data-diff-id`,
        `data-diff-summary`,
        `title`,
      ] as Dynamic) {
        let attribute3: Dynamic = element.getAttribute(
          decorateInvisibleDiffsResult,
        );
        if (attribute3 !== null) {
          invisibleDiffSpan2.setAttribute(
            decorateInvisibleDiffsResult,
            attribute3,
          );
        }
      }
    element.before(invisibleDiffSpan2);
    if (attribute2 === `del`) {
      element.remove();
    }
  }
  for (let node of Array.from<Dynamic>(
    container.querySelectorAll(`ins.vh-ins, del.vh-del`),
  ) as Dynamic) {
    if (
      node.hasAttribute(`data-diff-ghost`) ||
      node.children.length > 0 ||
      node.closest(`pre`) !== null
    )
      continue;
    let textContent: Dynamic = node.textContent ?? ``;
    if (textContent.length === 0 || !WHITESPACE_PATTERN.test(textContent))
      continue;
    let textContentCount: Dynamic = Array.from<Dynamic>(textContent).length;
    let repeat: Dynamic =
      textContentCount <= INVISIBLE_TAB_SPACES
        ? `·`.repeat(textContentCount)
        : `\u00b7\u00d7${textContentCount}`;
    node.appendChild(
      invisibleDiffSpan(
        document2,
        node.tagName === `INS` ? `ins` : `del`,
        `space`,
        repeat,
      ),
    );
  }
  for (let element of Array.from<Dynamic>(
    container.querySelectorAll(
      `p[data-diff],h1[data-diff],h2[data-diff],h3[data-diff],h4[data-diff],h5[data-diff],h6[data-diff]`,
    ),
  ) as Dynamic) {
    let attribute: Dynamic = element.getAttribute(`data-diff`);
    if (
      !(
        (attribute !== `ins` && attribute !== `del`) ||
        element.classList.contains(`vh-moved`) ||
        (element.textContent ?? ``) !== `` ||
        element.firstElementChild !== null
      )
    ) {
      element.appendChild(
        invisibleDiffSpan(
          document2,
          attribute,
          `empty`,
          element.tagName === `P` ? `Empty paragraph` : `Empty heading`,
        ),
      );
    }
  }
}
function stampDiffAnchors(
  container?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let seenIds: Dynamic = new (Set as Dynamic)();
  for (let element of Array.from<Dynamic>(
    container.querySelectorAll(`[data-diff-id]`),
  ) as Dynamic) {
    let attribute: Dynamic = element.getAttribute(`data-diff-id`) ?? ``;
    if (!(attribute.length === 0 || seenIds.has(attribute))) {
      seenIds.add(attribute);
      element.setAttribute(`id`, diffAnchorId(attribute));
    }
  }
}
function previewDocumentElement(
  documentJson?: Dynamic,
  document2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let schema: Dynamic = getVersionDiffSchema();
  let normalized: Dynamic = normalizePreviewDocument(documentJson, schema);
  let doc: Dynamic = parsePreviewDocument(normalized.json, schema);
  let codeDiffs: Dynamic = codeDiffByNode(
    doc,
    normalized.code,
    normalized.json,
  );
  let element: Dynamic = document2.createElement(`div`);
  element.className = `ProseMirror`;
  element.appendChild(
    previewDomSerializer(
      schema,
      document2,
      codeDiffs,
      options,
    ).serializeFragment(doc.content, {
      document: document2,
    }),
  );
  return element;
}
function decoratePreviewDocument(
  document2?: Dynamic,
  container?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  decoratePreviewChecklists(document2, container);
  decorateMovedNodes(document2, container);
  repairPreviewTableSpans(container);
  decorateInvisibleDiffs(document2, container);
  stampDiffAnchors(container);
}
function serializePreviewDocument(
  documentJson?: Dynamic,
  document2?: Dynamic,
  options: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let element: Dynamic = previewDocumentElement(
    documentJson,
    document2,
    options,
  );
  decoratePreviewDocument(document2, element);
  return cleanPreviewHtml(element.outerHTML);
}
var DIFF_NODE_ATTRIBUTE_KEYS: Dynamic = Object.values(DIFF_ATTRIBUTE_NAMES);
var SAFE_INLINE_ATOM_TYPES: Dynamic = new (Set as Dynamic)([
  `hardBreak`,
  `media`,
  `date`,
]);
var HELD_BLOCK_ATTRIBUTE: Dynamic = `data-vh-held-block`;
var EMPTY_CODE_BY_REF: Dynamic = new (Map as Dynamic)();
function canReuseUnchangedBlock(
  node?: Dynamic,
  codeByRef?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let pending: Dynamic = [node];
  for (; pending.length > 0; ) {
    let pop: Dynamic = pending.pop();
    let attrs: Dynamic = pop.attrs;
    if (attrs) {
      for (let canReuseUnchangedBlockResult of DIFF_NODE_ATTRIBUTE_KEYS as Dynamic)
        if (
          attrs[canReuseUnchangedBlockResult] !== undefined &&
          attrs[canReuseUnchangedBlockResult] !== null
        )
          return false;
      if (
        pop.type === `embed` &&
        codeByRef.size > 0 &&
        codeByRef.has(String(attrs.ref ?? ``))
      )
        return false;
    }
    for (let canReuseUnchangedBlockResult of (pop.marks ?? []) as Dynamic)
      if (isDiffMarkName(canReuseUnchangedBlockResult.type)) return false;
    for (let canReuseUnchangedBlockResult of (pop.content ?? []) as Dynamic)
      pending.push(canReuseUnchangedBlockResult);
  }
  return true;
}
function hasOnlySafeInlineAtoms(
  node?: Dynamic,
  schema?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let pending: Dynamic = [node];
  for (; pending.length > 0; ) {
    let pop: Dynamic = pending.pop();
    if (pop.type !== `text` && hasNodeType(schema, pop.type)) {
      let nodeItem: Dynamic = schema.nodes[pop.type];
      if (
        nodeItem.isInline &&
        nodeItem.isAtom &&
        !SAFE_INLINE_ATOM_TYPES.has(pop.type)
      )
        return false;
    }
    for (let hasOnlySafeInlineAtomsResult of (pop.content ?? []) as Dynamic)
      pending.push(hasOnlySafeInlineAtomsResult);
  }
  return true;
}
function blockCacheKey(
  prefix?: Dynamic,
  serializedBlock?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return prefix + NULL_CHARACTER + serializedBlock;
}
async function serializePreviewWithBlockCache(
  documentJson?: Dynamic,
  document2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let codeByRef: Dynamic = options.codeByRef ?? EMPTY_CODE_BY_REF;
  let renderOptions: Dynamic = options.resolveEnum
    ? {
        resolveEnum: options.resolveEnum,
      }
    : {};
  let renderFullDocument: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
    options.strip(
      fillWidgetCodeSlots(
        serializePreviewDocument(documentJson, document2, renderOptions),
        codeByRef,
      ),
    );
  let schema: Dynamic = getVersionDiffSchema();
  let blocks: Dynamic = documentJson.content ?? [];
  if (documentJson.type !== schema.topNodeType.name || blocks.length === 0)
    return renderFullDocument();
  let sliceBytes: Dynamic = options.sliceBytes ?? 15e4;
  let yieldToPage: Dynamic = options.yieldToPage;
  let cache: Dynamic = options.cache;
  cache?.begin();
  let mode: Dynamic = resolveEditorExtensionsValue13();
  let cachePrefix: Dynamic = `${mode?.locale ?? ``}|${mode?.timeZone ?? ``}|`;
  let serializedBlocks: Dynamic = blocks.map(
    (block?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      JSON.stringify(block),
  );
  let reusableBlocks: Dynamic = blocks.map(
    (block?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      canReuseUnchangedBlock(block, codeByRef),
  );
  let cacheKeys: Dynamic = blocks.map(
    (
      block?: Dynamic,
      index?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      cache !== undefined &&
      reusableBlocks[index] &&
      hasOnlySafeInlineAtoms(block, schema)
        ? blockCacheKey(cachePrefix, serializedBlocks[index])
        : null,
  );
  let cachedBlocks: Dynamic = cacheKeys.map(
    (cacheKey?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      cacheKey === null ? undefined : cache.get(cacheKey),
  );
  let stripKeepsBlocks: Dynamic = (
    preview?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let previewText: Dynamic = preview.join(``);
    return previewText === `` || options.strip(previewText) === previewText;
  };
  let renderedByIndex: Dynamic = new (Map as Dynamic)();
  let pendingIndices: Dynamic = [];
  let pendingBytes: Dynamic = 0;
  let flushPending = (..._extraArguments: unknown[]) => {
    if (pendingIndices.length === 0) return true;
    let previewDocumentElement2: Dynamic = previewDocumentElement(
      {
        ...documentJson,
        content: pendingIndices.map(
          (pendingIndice?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            blocks[pendingIndice],
        ),
      },
      document2,
      renderOptions,
    );
    let childNodes: Dynamic = Array.from<Dynamic>(
      previewDocumentElement2.childNodes,
    );
    if (childNodes.length !== pendingIndices.length) return false;
    decoratePreviewChecklists(document2, previewDocumentElement2);
    let items: Dynamic = [];
    for (let index: Dynamic = 0; index < childNodes.length; index++) {
      let pendingIndiceItem: Dynamic = pendingIndices[index];
      let childNodeItem: Dynamic = childNodes[index];
      if (!isElementNode(childNodeItem)) return false;
      if (reusableBlocks[pendingIndiceItem]) {
        items.push([
          pendingIndiceItem,
          cleanPreviewHtml(childNodeItem.outerHTML),
        ]);
      } else {
        renderedByIndex.set(pendingIndiceItem, childNodeItem);
      }
    }
    if (
      !stripKeepsBlocks(
        items.map(
          ([, item]: Dynamic, ..._extraArguments: unknown[]): Dynamic => item,
        ),
      )
    )
      return false;
    for (let [
      serializePreviewWithBlockCacheResult,
      serializePreviewWithBlockCacheResult2,
    ] of items as Dynamic) {
      cachedBlocks[serializePreviewWithBlockCacheResult] =
        serializePreviewWithBlockCacheResult2;
      let cacheKeyItem: Dynamic =
        cacheKeys[serializePreviewWithBlockCacheResult];
      if (cacheKeyItem != null) {
        cache.set(cacheKeyItem, serializePreviewWithBlockCacheResult2);
      }
    }
    pendingIndices = [];
    pendingBytes = 0;
    return true;
  };
  if (yieldToPage) {
    await yieldToPage();
  }
  for (let index: Dynamic = 0; index < blocks.length; index++)
    if (
      cachedBlocks[index] === undefined &&
      (pendingIndices.push(index),
      (pendingBytes += serializedBlocks[index].length),
      !(pendingBytes < sliceBytes))
    ) {
      if (!flushPending()) return renderFullDocument();
      if (yieldToPage) {
        await yieldToPage();
      }
    }
  if (!flushPending()) return renderFullDocument();
  let container: Dynamic = document2.createElement(`div`);
  container.className = `ProseMirror`;
  for (let index: Dynamic = 0; index < blocks.length; index++) {
    let renderedByIndexEntry: Dynamic = renderedByIndex.get(index);
    if (renderedByIndexEntry !== undefined) {
      container.appendChild(renderedByIndexEntry);
      continue;
    }
    let element: Dynamic = document2.createElement(`div`);
    element.setAttribute(HELD_BLOCK_ATTRIBUTE, String(index));
    container.appendChild(element);
  }
  if (renderedByIndex.size > 0) {
    decorateMovedNodes(document2, container);
    repairPreviewTableSpans(container);
    decorateInvisibleDiffs(document2, container);
    stampDiffAnchors(container);
  }
  let renderedBlocks: Dynamic = [];
  let heldBlocks: Dynamic = [];
  pendingBytes = 0;
  for (let element of Array.from<Dynamic>(container.childNodes) as Dynamic) {
    if (!isElementNode(element)) return renderFullDocument();
    let attribute: Dynamic = element.getAttribute(HELD_BLOCK_ATTRIBUTE);
    if (attribute !== null && element.attributes.length === 1) {
      let cachedBlockItem: Dynamic = cachedBlocks[Number(attribute)];
      if (cachedBlockItem === undefined) return renderFullDocument();
      renderedBlocks.push(cachedBlockItem);
      continue;
    }
    let cleanPreviewHtml2: Dynamic = cleanPreviewHtml(element.outerHTML);
    renderedBlocks.push(cleanPreviewHtml2);
    if (codeByRef.size === 0) {
      heldBlocks.push(cleanPreviewHtml2);
    }
    pendingBytes += cleanPreviewHtml2.length;
    if (!(pendingBytes < sliceBytes * 2)) {
      if (!stripKeepsBlocks(heldBlocks)) return renderFullDocument();
      heldBlocks = [];
      pendingBytes = 0;
      if (yieldToPage) {
        await yieldToPage();
      }
    }
  }
  if (!stripKeepsBlocks(heldBlocks)) return renderFullDocument();
  let html: Dynamic = `<div class="ProseMirror">${renderedBlocks.join(``)}</div>`;
  return codeByRef.size === 0
    ? html
    : options.strip(fillWidgetCodeSlots(html, codeByRef));
}
var NULL_CHARACTER: Dynamic = `\0`;
var CARRIAGE_RETURN: Dynamic = `\r`;
var SPACE_CHARACTER: Dynamic = `
`;
var REPLACEMENT_CHARACTER: Dynamic = `\uFFFD`;
var cleanPreviewHtml: Dynamic = (
  html?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  html
    .replaceAll(
      `\r
`,
      SPACE_CHARACTER,
    )
    .replaceAll(CARRIAGE_RETURN, SPACE_CHARACTER)
    .replaceAll(NULL_CHARACTER, REPLACEMENT_CHARACTER);
function changesWithRenderedAnchors(
  changes?: Dynamic,
  html?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let seenIds: Dynamic = new (Set as Dynamic)();
  return changes.flatMap(
    (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      let changesWithRenderedAnchorsResult: Dynamic = diffAnchorId(item.id);
      return seenIds.has(item.id) ||
        !html.includes(`id="${changesWithRenderedAnchorsResult}"`)
        ? []
        : (seenIds.add(item.id),
          [
            {
              ...item,
              anchor: changesWithRenderedAnchorsResult,
            },
          ]);
    },
  );
}
var utf8Bytes: Dynamic = (
  text?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => new (TextEncoder as Dynamic)().encode(text).length;
async function mapWithConcurrency(
  items?: Dynamic,
  concurrency?: Dynamic,
  mapper?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let results: Dynamic = [];
  let nextIndex: Dynamic = 0;
  await Promise.all(
    Array.from<Dynamic, Dynamic>(
      {
        length: Math.min(concurrency, items.length),
      },
      async (..._extraArguments: unknown[]): Promise<undefined> => {
        for (; nextIndex < items.length; ) {
          let mapWithConcurrencyResult: Dynamic = nextIndex++;
          results[mapWithConcurrencyResult] = await mapper(
            items[mapWithConcurrencyResult],
          );
        }
      },
    ),
  );
  return results;
}
async function resolveVersionEmbeds(
  reader?: Dynamic,
  preview?: Dynamic,
  versionWindow?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let { seqA: seqA, seqB: seqB }: Dynamic = versionWindow;
  let { refs: refs, truncated: truncated }: Dynamic =
    collectDiffEmbedReferences(preview.doc);
  let options: Dynamic = {
    ...(reader.schedule
      ? {
          schedule: reader.schedule,
        }
      : {}),
    ...(reader.cache
      ? {
          cache: reader.cache,
        }
      : {}),
  };
  let resolved: Dynamic = mergeEmbedDeltasIntoDiff(
    preview,
    refs.length === 0
      ? new (Map as Dynamic)()
      : await readEmbedDeltas(reader.door, refs, seqA, seqB, {
          ...options,
          classify: true,
        }),
    reader.nameOf
      ? {
          nameOf: reader.nameOf,
        }
      : {},
  );
  let unchecked: Dynamic = [...resolved.uncheckedWhy];
  if (versionWindow.openTail === true && refs.length > 0) {
    unchecked.push({
      ref: null,
      reason: `after-newest-version`,
    });
  }
  let widgetRefs: Dynamic = [
    ...new (Set as Dynamic)(
      resolved.annotations
        .filter(
          (annotation?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            annotation.block &&
            annotation.delta.engine === `widget` &&
            annotation.delta.kind === `published`,
        )
        .map(
          (
            filteredAnnotation?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => filteredAnnotation.ref,
        ),
    ),
  ];
  for (let resolveVersionEmbedsResult of widgetRefs.slice(3) as Dynamic)
    unchecked.push({
      ref: resolveVersionEmbedsResult,
      reason: `code-diff: over-widget-cap`,
    });
  let selectedWidgets: Dynamic = widgetRefs.slice(0, 3);
  let widgetDiffs: Dynamic = await mapWithConcurrency(
    selectedWidgets,
    2,
    (versionEmbeds?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      readWidgetCodePair(reader.door, versionEmbeds, seqA, seqB, options),
  );
  let codeByRef: Dynamic = new (Map as Dynamic)();
  let widgetEdits: Dynamic = 0;
  selectedWidgets.forEach(
    (
      selectedWidget?: Dynamic,
      index?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let widgetDiffItem: Dynamic = widgetDiffs[index];
      if (!widgetDiffItem.ok) {
        unchecked.push({
          ref: selectedWidget,
          reason: `code-diff: ${widgetDiffItem.why}`,
        });
        return;
      }
      if (widgetDiffItem.html === ``) return;
      let utf8Bytes2: Dynamic = utf8Bytes(widgetDiffItem.html);
      if (widgetEdits + utf8Bytes2 > 45e4) {
        codeByRef.set(
          selectedWidget,
          renderUnavailableWidgetCodeDiff(`Code diff too large to show`),
        );
        unchecked.push({
          ref: selectedWidget,
          reason: `code-diff: too-large`,
        });
        return;
      }
      widgetEdits += utf8Bytes2;
      codeByRef.set(selectedWidget, widgetDiffItem.html);
    },
  );
  return {
    doc: resolved.doc,
    changes: resolved.changes,
    codeByRef: codeByRef,
    unchecked: unchecked,
    truncated: truncated,
  };
}
var NO_VERSION_WINDOW_REASON: Dynamic = `no version window`;
function uncheckedEmbedsWithoutWindow(
  doc?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let { refs: refs, legacy: legacy }: Dynamic = collectDiffEmbedReferences(
    doc,
    2 ** 53 - 1,
  );
  return [...refs, ...legacy].map(
    (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
      ref: item,
      reason: NO_VERSION_WINDOW_REASON,
    }),
  );
}
async function buildVersionPreview(
  pid?: Dynamic,
  fileId?: Dynamic,
  upto?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let showChanges: Dynamic = options.showChanges ?? true;
  let compare: Dynamic = showChanges
    ? (options.compare ?? `previous`)
    : `previous`;
  let docs: Dynamic = await (
    options.fetchDocs ??
    ((
      versionPreview?: Dynamic,
      options2?: Dynamic,
      context?: Dynamic,
      dependencies?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      fetchVersionPreviewDocs(
        versionPreview,
        options2,
        context,
        undefined,
        dependencies,
      ))
  )(pid, fileId, upto, compare);
  let current: Dynamic = sanitizePreviewDocument(docs.doc);
  let previous: Dynamic =
    docs.prevDoc === null ? null : sanitizePreviewDocument(docs.prevDoc);
  let parse: Dynamic = (
    versionPreview?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    options.parse === undefined
      ? sanitizePreviewHtml(versionPreview)
      : sanitizePreviewHtml(versionPreview, options.parse);
  let renderOptions: Dynamic = options.resolveEnum
    ? {
        resolveEnum: options.resolveEnum,
      }
    : {};
  let enumDefinitions: Dynamic = options.enumDefs ?? options.resolveEnum;
  let render: Dynamic = (
    versionPreview?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    serializePreviewWithBlockCache(versionPreview, options.document, {
      ...(enumDefinitions
        ? {
            resolveEnum: enumDefinitions,
          }
        : {}),
      strip: parse,
      ...(options2
        ? {
            codeByRef: options2,
          }
        : {}),
      ...(options.blockCache
        ? {
            cache: options.blockCache,
          }
        : {}),
      ...(options.yieldToPage
        ? {
            yieldToPage: options.yieldToPage,
          }
        : {}),
    });
  let emptyDiff: Dynamic = {
    changes: [],
    degraded: false,
    unchecked: [],
    truncated: false,
    stats: null,
  };
  if (!showChanges)
    return {
      body: await render(current),
      ...emptyDiff,
      compare: compare,
      plain: true,
    };
  if (previous === null)
    return {
      body: await render(current),
      ...emptyDiff,
      compare: compare,
      plain: false,
    };
  let proseDiff: Dynamic = await options.diffVersions(previous, current, {
    nextRuns: docs.runs,
    ...(docs.prevRuns === null
      ? {}
      : {
          prevRuns: docs.prevRuns,
        }),
    ...renderOptions,
  });
  let widgetReader: Dynamic = options.widget;
  let versionWindow: Dynamic =
    widgetReader === undefined
      ? null
      : versionSequenceRange(
          (
            widgetReader.heldRows ??
            resolvePlatformLiveDocumentAndHistoryValue32
          )(pid, fileId),
          {
            upto: upto,
          },
          compare,
        );
  let resolvedPreview: Dynamic =
    widgetReader !== undefined && versionWindow !== null
      ? await resolveVersionEmbeds(widgetReader, proseDiff, versionWindow)
      : {
          doc: proseDiff.doc,
          changes: proseDiff.changes,
          codeByRef: new (Map as Dynamic)(),
          unchecked:
            widgetReader === undefined
              ? []
              : uncheckedEmbedsWithoutWindow(proseDiff.doc),
          truncated: false,
        };
  let html: Dynamic = await render(
    resolvedPreview.doc,
    resolvedPreview.codeByRef,
  );
  let stats: Dynamic = proseDiff.stats;
  return {
    body: html,
    changes: changesWithRenderedAnchors(resolvedPreview.changes, html),
    degraded: proseDiff.degraded,
    unchecked: resolvedPreview.unchecked,
    truncated: resolvedPreview.truncated,
    compare: compare,
    plain: false,
    stats: {
      ins: stats.ins,
      del: stats.del,
      chg: stats.chg,
      fmt: stats.fmt,
      move: stats.move,
      total: resolvedPreview.changes.length,
    },
  };
}
var enumOptionName: Dynamic = (
  option?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  typeof option == `string`
    ? option
    : typeof option == `object` && option && typeof option.name == `string`
      ? option.name
      : ``;
function enumResolver(
  definitions?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let byId: Dynamic = new (Map as Dynamic)(
    definitions.map(
      (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => [
        item.id,
        {
          name: item.name,
          options: item.options.map(enumOptionName),
        },
      ],
    ),
  );
  return (enumResolver2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
    byId.get(enumResolver2) ?? null;
}
function enumDefinitionsResolver(
  definitions?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let byId: Dynamic = new (Map as Dynamic)(
    definitions.map(
      (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => [
        item.id,
        {
          name: item.name,
          options: item.options,
        },
      ],
    ),
  );
  return (
    enumDefinitionsResolver2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => byId.get(enumDefinitionsResolver2) ?? null;
}
async function loadPreviewEnums(
  pid?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  try {
    let loadPreviewEnumsResult: Dynamic = await frameEnumRows(pid);
    return {
      resolveEnum: enumResolver(loadPreviewEnumsResult),
      enumDefs: enumDefinitionsResolver(loadPreviewEnumsResult),
      table: serializeDiffEnums(loadPreviewEnumsResult),
    };
  } catch {
    return {};
  }
}
function versionDiffRunner(
  enums?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    versionDiffRunner2?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    diffDocumentsAsync(versionDiffRunner2, options, {
      ...(context?.prevRuns
        ? {
            prevRuns: context.prevRuns,
          }
        : {}),
      ...(context?.nextRuns
        ? {
            nextRuns: context.nextRuns,
          }
        : {}),
      ...(enums
        ? {
            enums: enums,
          }
        : {}),
    });
}
var lastPreviewBlockCache: Dynamic = null;
function previewBlockCache(
  pid?: Dynamic,
  fileId?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let pageKey: Dynamic = `${pid}/${fileId}`;
  if (lastPreviewBlockCache?.page !== pageKey) {
    lastPreviewBlockCache = {
      page: pageKey,
      cache: createVisualizeHtmlCache(),
    };
  }
  return lastPreviewBlockCache.cache;
}
var displayPrincipalName: Dynamic = (
  principal?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  resolveEditorAnchorsAndMentionsEmail(
    principal,
    framePeekProfile(principal)?.name || undefined,
  );
var previewEmbedCaches: Dynamic = new (Map as Dynamic)();
function previewEmbedCacheForProject(
  pid?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let cache: Dynamic = previewEmbedCaches.get(pid);
  if (cache === undefined) {
    cache = createEmbedDeltaCache();
    previewEmbedCaches.set(pid, cache);
  }
  return cache;
}
async function loadV2Preview(
  pid?: Dynamic,
  fileId?: Dynamic,
  upto?: Dynamic,
  options: Dynamic = {
    compare: `previous`,
    showChanges: true,
  },
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let { table: table, ...enumOptions }: Dynamic = await loadPreviewEnums(pid);
  let reader: Dynamic = resolvePlatformLiveDocumentAndHistoryValue33({
    pid: pid,
    fileId: fileId,
  });
  return buildVersionPreview(pid, fileId, upto, {
    diffVersions: versionDiffRunner(table),
    document,
    ...enumOptions,
    blockCache: previewBlockCache(pid, fileId),
    yieldToPage: (..._extraArguments: unknown[]): Dynamic =>
      new (Promise as Dynamic)(
        (resolve?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          reader.schedule(resolve, 0);
        },
      ),
    widget: {
      door: reader.door,
      schedule: reader.schedule,
      nameOf: displayPrincipalName,
      cache: previewEmbedCacheForProject(pid),
    },
    compare: options.compare,
    showChanges: options.showChanges,
  });
}
export { loadV2Preview };
