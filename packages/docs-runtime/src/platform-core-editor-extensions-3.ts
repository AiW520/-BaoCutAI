/** BaoCut: editor extensions from app-core-BE6n4d7F.js. */
import type { Dynamic } from "./types";
import {
  helloAImport,
  helloCImport2,
  helloImport,
  helloNImport,
  helloRImport,
  helloVImport,
} from "./platform-core-dependencies";
import {
  resolvePlatformFeatureFlagsEnabled2,
} from "./platform-core-platform-feature-flags";
import {
  dataEnumsAndValidationProjectFileNodeRunValues,
  resolveDataEnumsAndValidationIncludes,
} from "./platform-core-data-enums-and-validation";
import {
  lazyZod,
} from "./platform-core-data-lazy-zod";
import {
  dataContentAndReferencesDescribeSchema,
  dataContentAndReferencesDescribeSchema4,
  dataContentAndReferencesFragSchema,
  dataContentAndReferencesProjectSuiteValues,
} from "./platform-core-data-content-and-references";
import {
  resolveEditorExtensionsColor2,
  resolveEditorExtensionsIncludes,
} from "./platform-core-editor-extensions-1";
import {
  EditorExtensionsCommentUtteranceAnchor,
  EditorExtensionsDocRootViewDocument,
  EditorExtensionsGapGoneHitHitsNotice,
  EditorExtensionsHorizontalRuleEmbed,
  EditorExtensionsIdHRevSeqByKindCompleteSinceSinceRevSessType,
  EditorExtensionsParagraphCodeBlock,
  EditorExtensionsState3,
  EditorExtensionsState4,
  EditorExtensionsState5,
  EditorExtensionsState6,
  EditorExtensionsState7,
  editorExtensionsSet9,
  isEditorExtensionsTrim,
  resolveEditorExtensionsBlock,
  resolveEditorExtensionsCenter,
  resolveEditorExtensionsChildren,
  resolveEditorExtensionsClaude,
  resolveEditorExtensionsEvery,
  resolveEditorExtensionsHref2,
  resolveEditorExtensionsIsInteger2,
  resolveEditorExtensionsName,
  resolveEditorExtensionsObjectId,
  resolveEditorExtensionsPush,
  resolveEditorExtensionsReg,
  resolveEditorExtensionsSess,
  resolveEditorExtensionsSess2,
  resolveEditorExtensionsSess3,
  resolveEditorExtensionsSome2,
  resolveEditorExtensionsTrim,
  resolveEditorExtensionsTrim3,
  resolveEditorExtensionsTrue2,
  resolveEditorExtensionsTrunc,
  resolveEditorExtensionsValue21,
  resolveEditorExtensionsValue23,
  resolveEditorExtensionsValue24,
} from "./platform-core-editor-extensions-2";
import {
  EditorExtensionsReadTimeouts,
} from "./platform-core-editor-extensions-4";

function filterEditorExtensionsCtx(
  filterEditorExtensionsCtx2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let {
    ctx: dependencies2,
    out: out2,
    runs: dependencies3,
  }: Dynamic = dependencies;
  let resolveEditorExtensionsSess32 = (
    len?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let open: Dynamic = context
      ? context.open
      : dependencies3.at(-1)?.id === ``
        ? dependencies3.at(-1)
        : null;
    let id: Dynamic = open
      ? open.id
      : context
        ? resolveEditorExtensionsSess3(context)
        : ``;
    if (id === ``) {
      dependencies2.loose += len;
    }
    if (open) open.len += len;
    else {
      let record2: Dynamic = {
        id: id,
        len: len,
      };
      dependencies3.push(record2);
      if (context) {
        context.open = record2;
      }
    }
    if (context) {
      context.off += len;
    }
  };
  for (let text of filterEditorExtensionsCtx2 as Dynamic)
    if (typeof text == `string`) {
      if (!text) continue;
      let outItem: Dynamic = out2[out2.length - 1];
      let editorExtensionsValue24: Dynamic = resolveEditorExtensionsValue24(
        {
          type: `text`,
          text: text,
        },
        options,
      );
      if (
        outItem?.type === `text` &&
        JSON.stringify(outItem.marks ?? []) ===
          JSON.stringify(editorExtensionsValue24.marks ?? [])
      ) {
        outItem.text += text;
      } else {
        out2.push(editorExtensionsValue24);
      }
      dependencies.off += text.length;
      resolveEditorExtensionsSess32(EditorExtensionsState7(text));
    } else if (EditorExtensionsGapGoneHitHitsNotice.has(text.name))
      resolveEditorExtensionsWas(text, dependencies2);
    else if (EditorExtensionsCommentUtteranceAnchor.has(text.name)) {
      let from: Dynamic = dependencies.off;
      let dependenciesCount: Dynamic = dependencies3.length;
      filterEditorExtensionsCtx(text.children, options, context, dependencies);
      let filteredDependenciesSlice: Dynamic = dependencies3
        .slice(dependenciesCount)
        .filter(
          (dependenciesSlice?: Dynamic, ..._extraArguments: unknown[]) =>
            typeof dependenciesSlice.id == `string` &&
            /\.\d+$/.test(dependenciesSlice.id),
        );
      let filteredDependenciesSliceItem: Dynamic = filteredDependenciesSlice[0];
      let filteredDependenciesSliceItem2: Dynamic =
        filteredDependenciesSlice[filteredDependenciesSlice.length - 1];
      let ids: Dynamic =
        filteredDependenciesSliceItem && filteredDependenciesSliceItem2
          ? [
              filteredDependenciesSliceItem.id,
              `${filteredDependenciesSliceItem2.id.slice(0, filteredDependenciesSliceItem2.id.lastIndexOf(`.`))}.${Number(filteredDependenciesSliceItem2.id.slice(filteredDependenciesSliceItem2.id.lastIndexOf(`.`) + 1)) + filteredDependenciesSliceItem2.len - 1}`,
            ]
          : undefined;
      dependencies2.spans.push({
        thread: resolveEditorExtensionsObjectId(text.attrs),
        out: out2,
        from: from,
        to: dependencies.off,
        ...(ids
          ? {
              ids: ids,
            }
          : {}),
      });
    } else if (EditorExtensionsState6.has(text.name)) {
      let options2: Dynamic = options;
      for (let filterEditorExtensionsCtxResult of (
        text.attrs.marks ?? ``
      ).split(/[\s,]+/) as Dynamic)
        if (filterEditorExtensionsCtxResult) {
          options2 = resolveEditorExtensionsSome2(
            options2,
            resolveEditorExtensionsHref2(
              filterEditorExtensionsCtxResult,
              text.attrs,
            ),
          );
        }
      if (text.attrs.href !== undefined) {
        options2 = resolveEditorExtensionsSome2(
          options2,
          resolveEditorExtensionsHref2(`link`, text.attrs),
        );
      }
      let id: Dynamic = text.attrs.id ?? text.attrs.by ?? ``;
      filterEditorExtensionsCtx(
        text.children,
        options2,
        id ? resolveEditorExtensionsSess2(id) : null,
        dependencies,
      );
    } else if (
      EditorExtensionsState5[text.name] ||
      resolveEditorExtensionsColor2(text.name)
    )
      filterEditorExtensionsCtx(
        text.children,
        resolveEditorExtensionsSome2(
          options,
          resolveEditorExtensionsHref2(text.name, text.attrs),
        ),
        context,
        dependencies,
      );
    else {
      let EditorExtensionsState4Item: Dynamic =
        EditorExtensionsState4[text.name] ??
        (text.name === `atom`
          ? (EditorExtensionsState4[text.attrs.type ?? ``] ??
            text.attrs.type ??
            `atom`)
          : null);
      if (!EditorExtensionsState4Item) {
        filterEditorExtensionsCtx(
          text.children,
          options,
          context,
          dependencies,
        );
        continue;
      }
      out2.push(
        resolveEditorExtensionsValue24(
          resolveEditorExtensionsPrincipal2(EditorExtensionsState4Item, text),
          options,
        ),
      );
      if (EditorExtensionsState4Item === `mention`) {
        resolveEditorExtensionsEmail(text.attrs, dependencies2);
      }
      let id: Dynamic =
        text.attrs.id ??
        text.attrs.by ??
        (context ? resolveEditorExtensionsSess3(context) : ``);
      if (id === ``) {
        dependencies2.loose += 1;
      }
      dependencies3.push({
        id: id,
        len: 1,
      });
      dependencies.off += 1;
      if (context) {
        [context.off, context.open] = [context.off + 1, null];
      }
    }
}

function resolveEditorExtensionsEmail(
  actor?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let user: Dynamic = actor.user ?? actor.principal;
  if (!(!user || (actor.name === undefined && actor.email === undefined))) {
    options.faces[user] = {
      ...options.faces[user],
      ...(actor.name
        ? {
            name: actor.name,
          }
        : {}),
      ...(actor.email
        ? {
            email: actor.email,
          }
        : {}),
    };
  }
}

function resolveEditorExtensionsWas(
  editorExtensionsWas?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (editorExtensionsWas.name === `gone` && editorExtensionsWas.attrs.id) {
    options.gone.push({
      id: editorExtensionsWas.attrs.id,
      was: editorExtensionsWas.attrs.was,
    });
  } else {
    if (
      editorExtensionsWas.name === `gap` &&
      !resolveEditorExtensionsTrue2(editorExtensionsWas.attrs.cap)
    ) {
      options.folded += 1;
    } else {
      if (editorExtensionsWas.name === `notice`) {
        options.skipped +=
          resolveEditorExtensionsIsInteger2(
            editorExtensionsWas.attrs.skipped,
          ) ?? 0;
      }
    }
  }
}

var isEditorExtensionsFilter: Dynamic;

function resolveEditorExtensionsPrincipal2(
  type?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let attrs: Dynamic = options.attrs;
  if (type === `hardBreak`)
    return {
      type: type,
    };
  if (type === `mention`) {
    let principal: Dynamic = attrs.principal ?? attrs.user ?? null;
    let label = (
      principal === null
        ? attrs.ref !== undefined
        : resolveEditorExtensionsClaude({
            principal: principal,
          })
    )
      ? resolveEditorExtensionsTrim(attrs.label)
      : null;
    return {
      type: type,
      attrs: {
        principal: principal,
        ref: attrs.ref ?? null,
        ...(label === null
          ? {}
          : {
              label: label,
            }),
      },
    };
  }
  if (type === `date`)
    return {
      type: type,
      attrs: {
        ts: attrs.ts ?? attrs.value ?? null,
      },
    };
  if (type === `dropdown`)
    return {
      type: type,
      attrs: {
        enum: attrs.enum ?? ``,
        index: resolveEditorExtensionsIsInteger2(attrs.index),
      },
    };
  let attrs2: Dynamic = isEditorExtensionsFilter(attrs);
  if (type === `media`) {
    if (attrs.dims !== undefined) {
      attrs2.dims = resolveEditorExtensionsEvery(attrs.dims);
    }
    if (attrs.crop !== undefined) {
      attrs2.crop = resolveEditorExtensionsValue23(attrs.crop);
    }
    if (attrs.align !== undefined) {
      attrs2.align =
        attrs.align === `center` || attrs.align === `right`
          ? attrs.align
          : null;
    }
  }
  return Object.keys(attrs2).length
    ? {
        type: type,
        attrs: attrs2,
      }
    : {
        type: type,
      };
}

function resolveEditorExtensionsBid(
  editorExtensionsBid?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let attrs: Dynamic = options.attrs;
  let ask: Dynamic = {
    bid: attrs.id ?? null,
  };
  if (editorExtensionsBid === `paragraph`)
    ask.heading =
      options.name === `heading`
        ? (resolveEditorExtensionsIsInteger2(attrs.level) ?? 1)
        : resolveEditorExtensionsIsInteger2(attrs.heading);
  else if (editorExtensionsBid === `list`) {
    let recordItem: Dynamic = (
      {
        ol: `ordered`,
        orderedList: `ordered`,
        taskList: `check`,
      } as Dynamic
    )[options.name];
    ask.kind = attrs.kind ?? recordItem ?? `bullet`;
    if ((resolveEditorExtensionsIsInteger2(attrs.start) ?? 1) !== 1) {
      ask.start = resolveEditorExtensionsIsInteger2(attrs.start);
    }
    let editorExtensionsIncludes: Dynamic =
      ask.kind === `ordered`
        ? resolveEditorExtensionsIncludes(attrs.numbering ?? attrs.type)
        : null;
    if (editorExtensionsIncludes) {
      ask.numbering = editorExtensionsIncludes;
    }
  } else if (editorExtensionsBid === `listItem`) {
    let kind: Dynamic = context ? (context.attrs.kind ?? context.name) : null;
    if (kind === `check` || kind === `taskList`) {
      ask.checked = resolveEditorExtensionsTrue2(attrs.checked) ?? false;
    } else {
      if (
        kind === null &&
        resolveEditorExtensionsTrue2(attrs.checked) !== null
      ) {
        ask.checked = resolveEditorExtensionsTrue2(attrs.checked);
      }
    }
  } else if (editorExtensionsBid === `codeBlock`)
    ask.language = attrs.language || null;
  else if (editorExtensionsBid === `cell`) {
    if (
      options.name === `th` ||
      options.name === `tableHeader` ||
      resolveEditorExtensionsTrue2(attrs.header)
    ) {
      ask.header = true;
    }
    for (let resolveEditorExtensionsBidResult of [
      `colspan`,
      `rowspan`,
    ] as Dynamic)
      if (
        (resolveEditorExtensionsIsInteger2(
          attrs[resolveEditorExtensionsBidResult],
        ) ?? 1) !== 1
      ) {
        ask[resolveEditorExtensionsBidResult] =
          resolveEditorExtensionsIsInteger2(
            attrs[resolveEditorExtensionsBidResult],
          );
      }
    let isEditorExtensionsTrim3 = isEditorExtensionsTrim(attrs.colwidth);
    if (isEditorExtensionsTrim3) {
      ask.colwidth = isEditorExtensionsTrim3;
    }
    if (attrs.align === `center` || attrs.align === `right`) {
      ask.align = attrs.align;
    }
    if (attrs.background && /^#[0-9a-f]{6}$/.test(attrs.background)) {
      ask.background = attrs.background;
    }
  } else if (editorExtensionsBid === `pending`) ask.intent = attrs.intent ?? ``;
  else if (editorExtensionsBid === `embed`) {
    let {
      width: isEditorExtensionsFilter2,
      align: isEditorExtensionsFilter3,
      caption: isEditorExtensionsFilter4,
      ...isEditorExtensionsFilter5
    }: Dynamic = isEditorExtensionsFilter(attrs);
    Object.assign(ask, isEditorExtensionsFilter5);
    let editorExtensionsTrunc = resolveEditorExtensionsTrunc(
      isEditorExtensionsFilter2,
    );
    if (editorExtensionsTrunc) {
      ask.width = editorExtensionsTrunc;
    }
    let editorExtensionsCenter: Dynamic = resolveEditorExtensionsCenter(
      isEditorExtensionsFilter3,
    );
    if (editorExtensionsCenter) {
      ask.align = editorExtensionsCenter;
    }
    let editorExtensionsTrim3 = resolveEditorExtensionsTrim3(
      isEditorExtensionsFilter4,
    );
    if (editorExtensionsTrim3) {
      ask.caption = editorExtensionsTrim3;
    }
  }
  return ask;
}

function isEditorExtensionsBid(
  editorExtensionsBid?: Dynamic,
  bid?: unknown,
  runs?: Dynamic,
  dependencies: Dynamic = editorExtensionsBid.blocks.length,
  ..._extraArguments: unknown[]
): undefined {
  if (typeof bid != `string` || !bid) return;
  let some: Dynamic = runs.some(
    (run?: Dynamic, ..._extraArguments: unknown[]) =>
      !resolveEditorExtensionsSess(run.id),
  );
  if (some) {
    editorExtensionsBid.looseBlocks.push(bid);
  }
  editorExtensionsBid.blocks.splice(
    dependencies,
    0,
    some
      ? {
          bid: bid,
          runs: [],
          opaque: true,
        }
      : {
          bid: bid,
          runs: runs,
        },
  );
}

function resolveEditorExtensionsBid2(
  node?: Dynamic,
  options?: Dynamic,
  ask?: Dynamic,
  ctx?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  let blocksCount: Dynamic = ctx.blocks.length;
  let isEditorExtensionsBid2: Dynamic = (
    content?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let bid: Dynamic =
      options !== `doc` && items.length === 0 && typeof ask.bid == `string`
        ? ask.bid
        : null;
    if (bid) {
      ask.bid = null;
    }
    isEditorExtensionsBid(ctx, bid, options2, blocksCount);
    return {
      type: `paragraph`,
      attrs: {
        bid: bid,
        heading: null,
      },
      ...(content.length
        ? {
            content: content,
          }
        : {}),
    };
  };
  let items2: Dynamic = [];
  let isEditorExtensionsBid3 = (..._extraArguments: unknown[]): undefined => {
    if (
      items2.some(
        (item?: unknown, ..._extraArguments: unknown[]) =>
          typeof item != `string` || item.trim(),
      )
    ) {
      let out2: Dynamic = [];
      let runs: Dynamic = [];
      filterEditorExtensionsCtx(items2, [], null, {
        ctx: ctx,
        out: out2,
        runs: runs,
        off: 0,
      });
      items.push(isEditorExtensionsBid2(out2, runs));
    }
    items2 = [];
  };
  let items3: Dynamic = [...node.children];
  for (let index = 0; index < items3.length; index++) {
    let itemItem: Dynamic = items3[index];
    if (
      typeof itemItem != `string` &&
      EditorExtensionsCommentUtteranceAnchor.has(itemItem.name) &&
      itemItem.children.some(
        (children?: unknown, ..._extraArguments: unknown[]) =>
          typeof children != `string` && !resolveEditorExtensionsName(children),
      )
    ) {
      (items3.splice as Dynamic)(index + 1, 0, ...itemItem.children);
      continue;
    }
    if (
      typeof itemItem != `string` &&
      EditorExtensionsCommentUtteranceAnchor.has(itemItem.name) &&
      itemItem.children.every(
        (children?: unknown, ..._extraArguments: unknown[]) =>
          typeof children == `string` && !children.trim(),
      )
    ) {
      let thread: Dynamic = resolveEditorExtensionsObjectId(itemItem.attrs);
      if (thread && typeof ask.bid == `string` && ask.bid) {
        ctx.cellSpans.push({
          thread: thread,
          bid: ask.bid,
        });
      }
      continue;
    }
    if (typeof itemItem == `string` || resolveEditorExtensionsName(itemItem))
      items2.push(itemItem);
    else if (EditorExtensionsGapGoneHitHitsNotice.has(itemItem.name))
      resolveEditorExtensionsWas(itemItem, ctx);
    else {
      isEditorExtensionsBid3();
      let editorExtensionsBid3: Dynamic = resolveEditorExtensionsBid3(
        itemItem,
        ctx,
        options === `list` ? node : null,
      );
      items.push(
        options === `list` && editorExtensionsBid3.type !== `listItem`
          ? {
              type: `listItem`,
              attrs: {
                bid: null,
              },
              content: [editorExtensionsBid3],
            }
          : editorExtensionsBid3,
      );
    }
  }
  isEditorExtensionsBid3();
  let type: Dynamic = items[0]?.type;
  if (options === `pending` && !type) return items;
  if (!type || (options === `listItem` && type !== `paragraph`)) {
    let splice: Dynamic = items.splice(0);
    (items.push as Dynamic)(isEditorExtensionsBid2([], []), ...splice);
  }
  return items;
}

function resolveEditorExtensionsBid3(
  node?: Dynamic,
  ctx?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let EditorExtensionsState3Item: Dynamic = EditorExtensionsState3[node.name];
  let type: Dynamic = EditorExtensionsState3Item ?? `paragraph`;
  let attrs: Dynamic = EditorExtensionsState3Item
    ? resolveEditorExtensionsBid(type, node, context)
    : {
        bid: node.attrs.id ?? null,
        heading: null,
      };
  if (ctx.changed && node.attrs.rev !== undefined) {
    ctx.changed.push({
      id: node.attrs.id ?? null,
      rev: resolveEditorExtensionsIsInteger2(node.attrs.rev) ?? -1,
    });
  }
  let resolveEditorExtensionsBid3Result: Dynamic;
  if (EditorExtensionsParagraphCodeBlock.has(type)) {
    let out2: Dynamic = [];
    let runs: Dynamic = [];
    filterEditorExtensionsCtx(
      EditorExtensionsState3Item
        ? node.children
        : resolveEditorExtensionsPush(node),
      [],
      null,
      {
        ctx: ctx,
        out: out2,
        runs: runs,
        off: 0,
      },
    );
    isEditorExtensionsBid(
      ctx,
      attrs.bid,
      EditorExtensionsState3Item
        ? runs
        : [
            {
              id: ``,
              len: 1,
            },
          ],
    );
    resolveEditorExtensionsBid3Result = {
      type: type,
      attrs: attrs,
      ...(out2.length
        ? {
            content: out2,
          }
        : {}),
    };
  } else if (EditorExtensionsHorizontalRuleEmbed.has(type))
    resolveEditorExtensionsBid3Result = {
      type: type,
      attrs: attrs,
    };
  else {
    let content: Dynamic = resolveEditorExtensionsBid2(node, type, attrs, ctx);
    resolveEditorExtensionsBid3Result =
      type === `pending` && content.length === 0
        ? {
            type: type,
            attrs: attrs,
          }
        : {
            type: type,
            attrs: attrs,
            content: content,
          };
  }
  return resolveEditorExtensionsBid3Result;
}

function filterEditorExtensionsGap(
  node?: Dynamic,
  options: Dynamic = null,
  ..._extraArguments: unknown[]
): Dynamic {
  let type: Dynamic = EditorExtensionsState3[node.name] ?? `paragraph`;
  let json2: Dynamic = {
    type: type,
    attrs: resolveEditorExtensionsBid(type, node, options),
  };
  let node2: Dynamic = type === `list` ? node : null;
  let kids: Dynamic = [];
  for (let filterEditorExtensionsGapResult of node.children as Dynamic)
    if (
      !(
        typeof filterEditorExtensionsGapResult == `string` ||
        resolveEditorExtensionsName(filterEditorExtensionsGapResult)
      )
    ) {
      if (filterEditorExtensionsGapResult.name === `gap`) {
        let gap: Dynamic =
          resolveEditorExtensionsIsInteger2(
            filterEditorExtensionsGapResult.attrs.blocks,
          ) ?? 0;
        let ids: Dynamic = (filterEditorExtensionsGapResult.attrs.ids ?? ``)
          .split(/[\s,]+/)
          .filter(Boolean);
        if (gap > 0) {
          kids.push({
            gap: gap,
            ...(ids.length === gap
              ? {
                  ids: ids,
                }
              : {}),
          });
        }
        continue;
      }
      if (
        !EditorExtensionsGapGoneHitHitsNotice.has(
          filterEditorExtensionsGapResult.name,
        )
      ) {
        if (resolveEditorExtensionsSome3(filterEditorExtensionsGapResult)) {
          kids.push({
            block: filterEditorExtensionsGapResult.attrs.id ?? null,
            shell: filterEditorExtensionsGap(
              filterEditorExtensionsGapResult,
              node2,
            ),
          });
        } else {
          if (filterEditorExtensionsGapResult.attrs.id) {
            kids.push({
              block: filterEditorExtensionsGapResult.attrs.id,
              json: resolveEditorExtensionsBid3(
                filterEditorExtensionsGapResult,
                {
                  blocks: [],
                  looseBlocks: [],
                  loose: 0,
                  gone: [],
                  spans: [],
                  cellSpans: [],
                  folded: 0,
                  changed: null,
                  faces: {},
                  skipped: 0,
                },
                node2,
              ),
            });
          }
        }
      }
    }
  return {
    block: node.attrs.id ?? null,
    json: json2,
    kids: kids,
  };
}

function filterEditorExtensionsFilter(
  filterEditorExtensionsFilter2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let filteredEditorExtensionsChildren: Dynamic =
    resolveEditorExtensionsChildren(filterEditorExtensionsFilter2).filter(
      (editorExtensionsChildren?: unknown, ..._extraArguments: unknown[]) =>
        typeof editorExtensionsChildren != `string`,
    );
  if (!filteredEditorExtensionsChildren.length)
    throw Error(`opSnapshot: no elements in the view`);
  let filteredEditorExtensionsChildrenItem: Dynamic =
    filteredEditorExtensionsChildren.length === 1 &&
    EditorExtensionsDocRootViewDocument.has(
      filteredEditorExtensionsChildren[0].name,
    )
      ? filteredEditorExtensionsChildren[0]
      : {
          name: `doc`,
          attrs: {},
          children: filteredEditorExtensionsChildren,
        };
  let bad: Dynamic = resolveEditorExtensionsReg(
    filteredEditorExtensionsChildrenItem.children,
    null,
  ).bad;
  if (bad) {
    console.warn(
      `opSnapshot: ${bad} relative id(s) with no session before them, left as printed`,
    );
  }
  return filteredEditorExtensionsChildrenItem;
}

var resolveEditorExtensionsValue25: Dynamic;

function resolveEditorExtensionsBlocks(
  editorExtensionsBlocks?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let record2: Dynamic = {
    blocks: [],
    looseBlocks: [],
    loose: 0,
    gone: [],
    spans: [],
    cellSpans: [],
    folded: 0,
    changed:
      editorExtensionsBlocks.attrs.sinceRev !== undefined &&
      editorExtensionsBlocks.attrs.since !== `unavailable`
        ? []
        : null,
    faces: {},
    skipped: 0,
  };
  let content: Dynamic = resolveEditorExtensionsBid2(
    editorExtensionsBlocks,
    `doc`,
    {},
    record2,
  );
  let capped: Dynamic = resolveEditorExtensionsFrom6(editorExtensionsBlocks);
  return {
    rev:
      resolveEditorExtensionsIsInteger2(editorExtensionsBlocks.attrs.rev) ?? 0,
    complete:
      resolveEditorExtensionsTrue2(editorExtensionsBlocks.attrs.complete) ??
      true,
    ...(capped.length
      ? {
          capped: capped,
        }
      : {}),
    ...(record2.folded
      ? {
          folded: record2.folded,
        }
      : {}),
    ...(record2.changed
      ? {
          changed: record2.changed,
        }
      : {}),
    docJson: {
      type: `doc`,
      content: content,
    },
    blocks: record2.blocks,
    loose: record2.loose,
    ...(record2.looseBlocks.length
      ? {
          looseBlocks: record2.looseBlocks,
        }
      : {}),
    ...(editorExtensionsBlocks.attrs.since === `unavailable`
      ? {
          sinceUnavailable: true,
        }
      : {}),
    ...(record2.skipped ||
    resolveEditorExtensionsIsInteger2(editorExtensionsBlocks.attrs.skipped)
      ? {
          skipped:
            record2.skipped ||
            resolveEditorExtensionsIsInteger2(
              editorExtensionsBlocks.attrs.skipped,
            ),
        }
      : {}),
    ...(record2.gone.length
      ? {
          gone: record2.gone,
        }
      : {}),
    ...(record2.spans.length || record2.cellSpans.length
      ? {
          anchors: updateEditorExtensionsPos(
            content,
            record2.spans,
            record2.cellSpans,
          ),
        }
      : {}),
    ...(Object.keys(record2.faces).length
      ? {
          faces: record2.faces,
        }
      : {}),
  };
}

var resolveEditorExtensionsValue26: (editorExtensionsValue26?: unknown, ..._extraArguments: unknown[]) => boolean;

var resolveEditorExtensionsName2: Dynamic;

var resolveEditorExtensionsName3: Dynamic;

function resolveEditorExtensionsFrom6(
  editorExtensions?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  let rolldownTImport2 = (
    node?: Dynamic,
    parentId?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    for (let node2 of node.children as Dynamic)
      if (resolveEditorExtensionsValue26(node2)) {
        if (resolveEditorExtensionsName2(node2)) {
          items.push({
            from: node2.attrs.from || null,
            parentId: parentId,
            blocks: resolveEditorExtensionsIsInteger2(node2.attrs.blocks),
          });
        } else {
          if (node2.children.length) {
            rolldownTImport2(node2, node2.attrs.id ?? parentId);
          }
        }
      }
  };
  rolldownTImport2(editorExtensions, null);
  return items;
}

function resolveEditorExtensionsChildren2(
  node?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  for (let node2 of node.children as Dynamic) {
    if (!resolveEditorExtensionsValue26(node2)) continue;
    if (node2.attrs.id === options) return node2;
    let editorExtensionsChildren2: Dynamic = node2.children.length
      ? resolveEditorExtensionsChildren2(node2, options)
      : null;
    if (editorExtensionsChildren2) return editorExtensionsChildren2;
  }
  return null;
}

function resolveEditorExtensionsSome3(
  node?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return node.children.some(
    (node2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      resolveEditorExtensionsValue26(node2) &&
      (node2.name === `gap` ||
        (node2.children.length > 0 && resolveEditorExtensionsSome3(node2))),
  );
}

var resolveEditorExtensionsTrim4: Dynamic;

var resolveEditorExtensionsAnchor: Dynamic;

function isEditorExtensionsFrom5(
  editorExtensions?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (!options.from) return false;
  let editorExtensions2: Dynamic =
    options.parentId === null
      ? editorExtensions
      : resolveEditorExtensionsChildren2(editorExtensions, options.parentId);
  let context2: Dynamic =
    options.parentId === null
      ? context
      : resolveEditorExtensionsChildren2(context, options.parentId);
  if (!editorExtensions2 || !context2) return false;
  let childrenIndex: Dynamic = editorExtensions2.children.findIndex(
    (children2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      resolveEditorExtensionsValue26(children2) &&
      resolveEditorExtensionsName2(children2) &&
      (children2.attrs.from || null) === options.from,
  );
  if (childrenIndex < 0) return false;
  let children: Dynamic = context2.children;
  let index = 0;
  for (
    ;
    index < children.length &&
    (resolveEditorExtensionsName3(children[index]) ||
      resolveEditorExtensionsAnchor(children[index]) ||
      resolveEditorExtensionsTrim4(children[index]));

  )
    index++;
  let childrenSlice: Dynamic = children.slice(index);
  let childrenSlice2: Dynamic = childrenSlice.find(
    resolveEditorExtensionsValue26,
  );
  if (!childrenSlice2 || childrenSlice2.attrs.id !== options.from) return false;
  let uniqueItems: Dynamic = new (Set as Dynamic)(
    editorExtensions2.children
      .filter(resolveEditorExtensionsAnchor)
      .map(
        (filteredChildren?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          resolveEditorExtensionsObjectId(filteredChildren.attrs),
      ),
  );
  let items: Dynamic = [];
  for (let isEditorExtensionsFrom5Result of children
    .slice(0, index)
    .filter(resolveEditorExtensionsAnchor) as Dynamic) {
    let editorExtensionsObjectId: Dynamic = resolveEditorExtensionsObjectId(
      isEditorExtensionsFrom5Result.attrs,
    );
    if (!uniqueItems.has(editorExtensionsObjectId)) {
      items.push(isEditorExtensionsFrom5Result);
    }
    uniqueItems.add(editorExtensionsObjectId);
  }
  let childrenIndex2: Dynamic = editorExtensions2.children.findIndex(
    (children2?: Dynamic, ..._extraArguments: unknown[]) =>
      !resolveEditorExtensionsAnchor(children2) &&
      !resolveEditorExtensionsTrim4(children2),
  );
  (editorExtensions2.children.splice as Dynamic)(
    childrenIndex,
    1,
    ...childrenSlice,
  );
  (editorExtensions2.children.splice as Dynamic)(childrenIndex2, 0, ...items);
  return true;
}

var resolveEditorExtensionsReplace2: Dynamic;

var resolveEditorExtensionsReplace3: Dynamic;

function resolveEditorExtensionsEntries(
  node?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof node == `string`) return resolveEditorExtensionsReplace2(node);
  let label: Dynamic = ``;
  for (let [
    resolveEditorExtensionsEntriesResult,
    resolveEditorExtensionsEntriesResult2,
  ] of Object.entries(node.attrs) as Dynamic)
    label += ` ${resolveEditorExtensionsEntriesResult}="${resolveEditorExtensionsReplace3(resolveEditorExtensionsEntriesResult2)}"`;
  if (!node.children.length) return `<${node.name}${label}/>`;
  let label2: Dynamic = ``;
  for (let resolveEditorExtensionsEntriesResult of node.children as Dynamic)
    label2 += resolveEditorExtensionsEntries(
      resolveEditorExtensionsEntriesResult,
    );
  return `<${node.name}${label}>${label2}</${node.name}>`;
}

function updateEditorExtensionsPos(
  updateEditorExtensionsPos2?: Dynamic,
  options?: Dynamic,
  context: Dynamic = [],
  ..._extraArguments: unknown[]
): Dynamic {
  let lookup: Dynamic = new (Map as Dynamic)();
  let lookup2: Dynamic = new (Map as Dynamic)();
  let helloTImport2: Dynamic = (
    updateEditorExtensionsPos3?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    for (let node of updateEditorExtensionsPos3 as Dynamic) {
      let from: Dynamic = options2;
      if (node.content) {
        lookup.set(node.content, {
          pos: options2 + 1,
          bid: node.attrs?.bid ?? null,
        });
      }
      let count =
        (editorExtensionsSet9.has(node.type) &&
          !EditorExtensionsHorizontalRuleEmbed.has(node.type)) ||
        node.content
          ? 2
          : 1;
      options2 =
        node.text === undefined
          ? helloTImport2(node.content ?? [], options2 + 1) + count - 1
          : options2 + node.text.length;
      if (typeof node.attrs?.bid == `string` && !lookup2.has(node.attrs.bid)) {
        lookup2.set(node.attrs.bid, {
          from: from,
          to: options2,
        });
      }
    }
    return options2;
  };
  helloTImport2(updateEditorExtensionsPos2, 0);
  return [
    ...options.flatMap(
      (
        { thread: thread, out: out2, from: from, to: to, ids: ids }: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let lookupEntry: Dynamic = lookup.get(out2);
        return lookupEntry
          ? [
              {
                thread: thread,
                bid: lookupEntry.bid,
                from: lookupEntry.pos + from,
                to: lookupEntry.pos + to,
                base: lookupEntry.pos,
                ...(ids
                  ? {
                      ids: ids,
                    }
                  : {}),
              },
            ]
          : [];
      },
    ),
    ...context.flatMap(
      (
        { thread: thread, bid: bid }: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let lookupEntry: Dynamic = lookup2.get(bid);
        return lookupEntry
          ? [
              {
                thread: thread,
                bid: bid,
                from: lookupEntry.from,
                to: lookupEntry.to,
                cell: true,
                base: lookupEntry.from,
              },
            ]
          : [];
      },
    ),
  ];
}

function resolveEditorExtensionsTest2(
  editorExtensionsTest2?: unknown,
  options?: unknown,
  ..._extraArguments: unknown[]
) {
  return typeof editorExtensionsTest2 == `string` &&
    /^[A-Za-z0-9_.:-]{1,64}$/.test(editorExtensionsTest2)
    ? editorExtensionsTest2
    : typeof options == `string` && /^[0-9a-f]{8}$/i.test(options)
      ? `schema:${options}`
      : ``;
}

function resolveEditorExtensionsThrew(
  editorExtensionsThrew?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let resolveEditorExtensionsThrewResult: Dynamic = null;
  let items: Dynamic = [];
  let enabled = false;
  let index = 0;
  let resolveEditorExtensionsThrewResult2: Dynamic;
  let judged = (
    editorExtensionsThrew3?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (enabled) return;
    resolveEditorExtensionsThrewResult = editorExtensionsThrew3;
    let items2: Dynamic = items ?? [];
    items = null;
    if (editorExtensionsThrew3 !== null)
      for (let resolveEditorExtensionsThrewResult3 of items2 as Dynamic)
        try {
          if (resolveEditorExtensionsThrewResult3.t === `threw`) {
            editorExtensionsThrew3.threw(
              resolveEditorExtensionsThrewResult3.body,
              resolveEditorExtensionsThrewResult3.e,
            );
          } else {
            editorExtensionsThrew3.judged(
              resolveEditorExtensionsThrewResult3.body,
              resolveEditorExtensionsThrewResult3.rep,
              resolveEditorExtensionsThrewResult3.action,
              resolveEditorExtensionsThrewResult3.ctx,
            );
          }
        } catch {}
  };
  let editorExtensionsThrew2 = (..._extraArguments: unknown[]): undefined => {
    index++;
    editorExtensionsThrew().then(
      judged,
      (..._extraArguments: unknown[]): undefined => {
        if (!enabled) {
          if (options === undefined || index >= 3) return void (items = null);
          resolveEditorExtensionsThrewResult2 = options(
            (..._extraArguments: unknown[]): undefined => {
              resolveEditorExtensionsThrewResult2 = undefined;
              if (!enabled) {
                editorExtensionsThrew2();
              }
            },
          );
        }
      },
    );
  };
  editorExtensionsThrew2();
  return {
    threw: (
      body?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (!enabled) {
        if (resolveEditorExtensionsThrewResult) {
          resolveEditorExtensionsThrewResult.threw(body, options2);
        } else {
          if (items && items.length < 64) {
            items.push({
              t: `threw`,
              body: body,
              e: options2,
            });
          }
        }
      }
    },
    judged: (
      body?: Dynamic,
      rep?: Dynamic,
      action?: Dynamic,
      ctx?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (!enabled) {
        if (resolveEditorExtensionsThrewResult) {
          resolveEditorExtensionsThrewResult.judged(body, rep, action, ctx);
        } else {
          if (items && items.length < 64) {
            items.push({
              t: `judged`,
              body: body,
              rep: rep,
              action: action,
              ctx: ctx,
            });
          }
        }
      }
    },
    close: (..._extraArguments: unknown[]): undefined => {
      enabled = true;
      items = null;
      resolveEditorExtensionsThrewResult = null;
      resolveEditorExtensionsThrewResult2?.();
      resolveEditorExtensionsThrewResult2 = undefined;
    },
  };
}

function resolveEditorExtensionsRefusalClass(
  ..._extraArguments: unknown[]
): Dynamic {
  return resolvePlatformFeatureFlagsEnabled2(`refusalClass`);
}

var editorExtensionsValue40962: number;

var editorExtensionsSet10: Dynamic;

var editorExtensionsSet11: Dynamic;

function isEditorExtensionsContainer(
  items?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    typeof items != `string` ||
    items.length === 0 ||
    items.length > editorExtensionsValue40962 ||
    /[\s<>]/.test(items)
  )
    return null;
  let itemIndex = items.indexOf(`#`);
  let itemsSlice = itemIndex >= 0 ? items.slice(0, itemIndex) : items;
  let anchor = itemIndex >= 0 ? items.slice(itemIndex + 1) : undefined;
  if (anchor === ``) return null;
  let itemsSliceParts = itemsSlice.split(`/`);
  if (
    itemsSliceParts.some(
      (itemsSlicePart?: Dynamic, ..._extraArguments: unknown[]) =>
        itemsSlicePart === ``,
    )
  )
    return null;
  if (itemsSliceParts.length === 2) {
    let [kind, setKind]: Dynamic = itemsSliceParts;
    return editorExtensionsSet10.has(kind)
      ? anchor === undefined
        ? {
            container: {
              kind: kind,
              id: setKind,
            },
          }
        : null
      : editorExtensionsSet11.has(kind)
        ? {
            object: {
              type: kind,
              id: setKind,
            },
            ...(anchor === undefined
              ? {}
              : {
                  anchor: anchor,
                }),
          }
        : null;
  }
  if (itemsSliceParts.length === 4) {
    let [kind, setKind, type, kind2]: Dynamic = itemsSliceParts;
    return !editorExtensionsSet10.has(kind) || !editorExtensionsSet11.has(type)
      ? null
      : {
          container: {
            kind: kind,
            id: setKind,
          },
          object: {
            type: type,
            id: kind2,
          },
          ...(anchor === undefined
            ? {}
            : {
                anchor: anchor,
              }),
        };
  }
  return null;
}

var resolveEditorExtensionsValue27: (editorExtensionsValue27?: Dynamic, ..._extraArguments: unknown[]) => boolean;

var editorExtensionsMessageReactionResolveValues: string[];

var editorExtensionsValue65536: number;

var editorExtensionsTabSchema: Dynamic;

var editorExtensionsBlobSchema: Dynamic;

var editorExtensionsTypeSchema: Dynamic;

var editorExtensionsAnchorSchema: Dynamic;

var editorExtensionsRefSchema: Dynamic;

var editorExtensionsFileIdSchema: Dynamic;

var editorExtensionsPattern12: RegExp;

var EditorExtensionsNotAMentionPrincipal: Dynamic;

var editorExtensionsKindSchema: Dynamic;

var editorExtensionsKindSchema2: Dynamic;

var editorExtensionsKindSchema3: Dynamic;

var editorExtensionsKindSchema4: Dynamic;

function resolveEditorExtensionsAnchor2(
  editorExtensionsAnchor2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof editorExtensionsAnchor2 != `object` || !editorExtensionsAnchor2)
    return;
  let parent: Dynamic = editorExtensionsAnchor2.parent;
  if (typeof parent != `object` || !parent || Array.isArray(parent)) return;
  let object2: Dynamic = parent.object;
  let id: Dynamic = parent.id;
  if (typeof object2 != `string` || typeof id != `string`) return;
  let anchor: Dynamic = parent.anchor;
  return {
    object: object2,
    id: id,
    ...(anchor === undefined
      ? {}
      : {
          anchor: anchor,
        }),
  };
}

function resolveEditorExtensionsMessage(
  entry?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof entry != `object` || !entry) return `message`;
  let kind: Dynamic = entry.kind;
  return kind === undefined
    ? `message`
    : editorExtensionsMessageReactionResolveValues.includes(kind)
      ? kind
      : undefined;
}

var resolveEditorExtensionsValue28: Dynamic;

function isEditorExtensionsSeq(
  editorExtensionsSeq?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let items: Dynamic = [];
  for (let [
    isEditorExtensionsSeqResult,
    isEditorExtensionsSeqResult2,
  ] of editorExtensionsSeq.refs() as Dynamic) {
    if (!isEditorExtensionsSeqResult.startsWith(`utterance/`)) continue;
    let parent: Dynamic = isEditorExtensionsSeqResult2.parent;
    if (parent === undefined) continue;
    if (parent.object === `utterance`) {
      if (
        resolveEditorExtensionsMessage(
          editorExtensionsSeq.read({
            object: `utterance`,
            id: isEditorExtensionsSeqResult.slice(10),
          }),
        ) === `resolve`
      ) {
        uniqueItems.add(parent.id);
      }
      continue;
    }
    if (parent.object !== `node` || parent.id !== options) continue;
    let isEditorExtensionsSeqResultSlice: Dynamic =
      isEditorExtensionsSeqResult.slice(10);
    let record2: Dynamic = editorExtensionsSeq.read({
      object: `utterance`,
      id: isEditorExtensionsSeqResultSlice,
    });
    if (
      record2 === undefined ||
      resolveEditorExtensionsMessage(record2) !== `message`
    )
      continue;
    let anchor: Dynamic = filterEditorExtensionsThread(
      isEditorExtensionsSeqResultSlice,
      resolveEditorExtensionsAnchor2(record2)?.anchor,
    );
    if (anchor !== null) {
      items.push({
        seq: isEditorExtensionsSeqResult2.born?.seq ?? 2 ** 53 - 1,
        id: isEditorExtensionsSeqResultSlice,
        anchor: anchor,
      });
    }
  }
  return items
    .filter(
      (item?: Dynamic, ..._extraArguments: unknown[]) =>
        !uniqueItems.has(item.id),
    )
    .toSorted(
      (
        filteredItem?: Dynamic,
        filteredItem2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        filteredItem.seq - filteredItem2.seq ||
        (filteredItem.id < filteredItem2.id
          ? -1
          : +(filteredItem.id > filteredItem2.id)),
    )
    .map(
      (toSorted?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        toSorted.anchor,
    );
}

function filterEditorExtensionsThread(
  thread?: Dynamic,
  entry?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!resolveEditorExtensionsValue28(entry)) return null;
  if (
    entry.kind === `chars` &&
    Array.isArray(entry.range) &&
    entry.range.length === 2
  ) {
    let [start, end]: Dynamic = entry.range;
    return typeof start == `string` &&
      typeof end == `string` &&
      start !== `` &&
      end !== ``
      ? {
          thread: thread,
          kind: `chars`,
          start: start,
          end: end,
        }
      : null;
  }
  if (entry.kind === `cells` && Array.isArray(entry.ids)) {
    let ids: Dynamic = entry.ids.filter(
      (id?: unknown, ..._extraArguments: unknown[]) =>
        typeof id == `string` && id !== ``,
    );
    return ids.length > 0
      ? {
          thread: thread,
          kind: `cells`,
          ids: ids,
        }
      : null;
  }
  return null;
}

function resolveEditorExtensionsSess4(
  editorExtensionsSess4?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (editorExtensionsSess4 === undefined) return null;
  let lastIndexOf: Dynamic = editorExtensionsSess4.lastIndexOf(`.`);
  if (lastIndexOf <= 0) return null;
  let editorExtensionsSess4Slice: Dynamic = editorExtensionsSess4.slice(
    lastIndexOf + 1,
  );
  let number2 = Number(editorExtensionsSess4Slice);
  return /^\d+$/.test(editorExtensionsSess4Slice) &&
    Number.isSafeInteger(number2)
    ? {
        sess: editorExtensionsSess4.slice(0, lastIndexOf),
        i: number2,
      }
    : null;
}

function resolveEditorExtensionsKind2(
  editorExtensionsKind2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let resolveEditorExtensionsKind2Result: Dynamic;
  let slice = (
    editorExtensionsKind22?: Dynamic,
    options2?: Dynamic,
    context2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (options2 === undefined || options2 === context2) {
      if (resolveEditorExtensionsKind2Result) {
        resolveEditorExtensionsKind2Result.push(context2);
      }
      return;
    }
    resolveEditorExtensionsKind2Result ??= editorExtensionsKind2.slice(
      0,
      editorExtensionsKind22,
    );
    if (Array.isArray(options2)) {
      (resolveEditorExtensionsKind2Result.push as Dynamic)(...options2);
    } else {
      resolveEditorExtensionsKind2Result.push(options2);
    }
  };
  for (let [
    resolveEditorExtensionsKind2Result2,
    node,
  ] of editorExtensionsKind2.entries() as Dynamic) {
    if (typeof node == `string`) {
      if (node === ``) {
        slice(resolveEditorExtensionsKind2Result2, undefined, node);
        continue;
      }
      let len = resolveEditorExtensionsValue21(node);
      let dependencies2: Dynamic = dependencies(
        {
          kind: `text`,
          sess: options?.sess ?? null,
          i: options ? options.base + options.off : 0,
          len: len,
        },
        context.n,
        node,
      );
      if (options) {
        options.off += len;
      }
      context.n += len;
      slice(resolveEditorExtensionsKind2Result2, dependencies2, node);
      continue;
    }
    switch (resolveEditorExtensionsBlock(node)) {
      case `skip`:
        slice(resolveEditorExtensionsKind2Result2, undefined, node);
        continue;
      case `block`: {
        let editorExtensionsKind22: Dynamic = resolveEditorExtensionsKind2(
          node.children,
          null,
          context,
          dependencies,
        );
        slice(
          resolveEditorExtensionsKind2Result2,
          editorExtensionsKind22
            ? {
                ...node,
                children: editorExtensionsKind22,
              }
            : undefined,
          node,
        );
        continue;
      }
      case `run`: {
        let editorExtensionsSess4: Dynamic = resolveEditorExtensionsSess4(
          node.attrs.id ?? node.attrs.by,
        );
        let record2: Dynamic = editorExtensionsSess4
          ? {
              sess: editorExtensionsSess4.sess,
              base: editorExtensionsSess4.i,
              off: 0,
            }
          : null;
        let editorExtensionsKind22: Dynamic = resolveEditorExtensionsKind2(
          node.children,
          record2,
          context,
          dependencies,
        );
        slice(
          resolveEditorExtensionsKind2Result2,
          editorExtensionsKind22
            ? {
                ...node,
                children: editorExtensionsKind22,
              }
            : undefined,
          node,
        );
        continue;
      }
      case `mark`:
      case `span`:
      case `other`: {
        let editorExtensionsKind22: Dynamic = resolveEditorExtensionsKind2(
          node.children,
          options,
          context,
          dependencies,
        );
        slice(
          resolveEditorExtensionsKind2Result2,
          editorExtensionsKind22
            ? {
                ...node,
                children: editorExtensionsKind22,
              }
            : undefined,
          node,
        );
        continue;
      }
      case `atom`: {
        let editorExtensionsSess4: Dynamic = resolveEditorExtensionsSess4(
          node.attrs.id ?? node.attrs.by,
        );
        let dependencies2: Dynamic = dependencies(
          editorExtensionsSess4
            ? {
                kind: `atom`,
                sess: editorExtensionsSess4.sess,
                i: editorExtensionsSess4.i,
              }
            : {
                kind: `atom`,
                sess: options?.sess ?? null,
                i: options ? options.base + options.off : 0,
              },
          context.n,
          node,
        );
        if (options) {
          options.off += 1;
        }
        context.n += 1;
        slice(resolveEditorExtensionsKind2Result2, dependencies2, node);
        continue;
      }
    }
  }
  return resolveEditorExtensionsKind2Result;
}

var resolveEditorExtensionsAnchor3: Dynamic;

function resolveEditorExtensionsCharCodeAt2(
  items?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let count: Dynamic = 0;
  for (let index = 0; index < options && count < items.length; index++) {
    let charCodeAt: Dynamic = items.charCodeAt(count);
    let charCodeAt2: Dynamic = items.charCodeAt(count + 1);
    count +=
      charCodeAt >= 55296 &&
      charCodeAt <= 56319 &&
      charCodeAt2 >= 56320 &&
      charCodeAt2 <= 57343
        ? 2
        : 1;
  }
  return count;
}

function updateEditorExtensionsThread(
  node?: Dynamic,
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (items.length === 0) return node;
  let lookup: Dynamic = new (Map as Dynamic)();
  let items2: Dynamic = [];
  items.forEach(
    (
      entry?: Dynamic,
      index?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (entry.kind !== `chars`) return;
      let editorExtensionsSess4: Dynamic = resolveEditorExtensionsSess4(
        entry.start,
      );
      let editorExtensionsSess42: Dynamic = resolveEditorExtensionsSess4(
        entry.end,
      );
      items2[index] = {
        thread: entry.thread,
        s: -1,
        e: -1,
      };
      if (!(editorExtensionsSess4 === null || editorExtensionsSess42 === null))
        for (let [
          updateEditorExtensionsThreadResult2,
          updateEditorExtensionsThreadResult3,
        ] of [
          [editorExtensionsSess4, `start`],
          [editorExtensionsSess42, `end`],
        ] as Dynamic) {
          let lookupEntry: Dynamic = lookup.get(
            updateEditorExtensionsThreadResult2.sess,
          );
          if (!lookupEntry) {
            lookup.set(
              updateEditorExtensionsThreadResult2.sess,
              (lookupEntry = {
                start: new (Map as Dynamic)(),
                end: new (Map as Dynamic)(),
              }),
            );
          }
          let lookupEntryItemEntry: Dynamic =
            lookupEntry[updateEditorExtensionsThreadResult3].get(
              updateEditorExtensionsThreadResult2.i,
            ) ?? [];
          lookupEntryItemEntry.push(index);
          lookupEntry[updateEditorExtensionsThreadResult3].set(
            updateEditorExtensionsThreadResult2.i,
            lookupEntryItemEntry,
          );
        }
    },
  );
  if (lookup.size > 0) {
    resolveEditorExtensionsKind2(
      node.children,
      null,
      {
        n: 0,
      },
      (
        entry?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (entry.sess === null) return;
        let lookupEntry: Dynamic = lookup.get(entry.sess);
        if (!lookupEntry) return;
        let len: Dynamic = entry.kind === `text` ? entry.len : 1;
        for (let [
          updateEditorExtensionsThreadResult2,
          updateEditorExtensionsThreadResult3,
        ] of lookupEntry.start as Dynamic)
          if (
            updateEditorExtensionsThreadResult2 >= entry.i &&
            updateEditorExtensionsThreadResult2 < entry.i + len
          )
            for (let updateEditorExtensionsThreadResult4 of updateEditorExtensionsThreadResult3 as Dynamic)
              if (items2[updateEditorExtensionsThreadResult4].s < 0) {
                items2[updateEditorExtensionsThreadResult4].s =
                  options + (updateEditorExtensionsThreadResult2 - entry.i);
              }
        for (let [
          updateEditorExtensionsThreadResult2,
          updateEditorExtensionsThreadResult3,
        ] of lookupEntry.end as Dynamic)
          if (
            updateEditorExtensionsThreadResult2 >= entry.i &&
            updateEditorExtensionsThreadResult2 < entry.i + len
          )
            for (let updateEditorExtensionsThreadResult4 of updateEditorExtensionsThreadResult3 as Dynamic)
              if (items2[updateEditorExtensionsThreadResult4].e < 0) {
                items2[updateEditorExtensionsThreadResult4].e =
                  options + (updateEditorExtensionsThreadResult2 - entry.i);
              }
      },
    );
  }
  let filteredItems: Dynamic = items2.filter(
    (item?: Dynamic, ..._extraArguments: unknown[]) =>
      item !== undefined && item.s >= 0 && item.e >= item.s,
  );
  let updateEditorExtensionsThreadResult: Dynamic;
  if (filteredItems.length > 0) {
    updateEditorExtensionsThreadResult = resolveEditorExtensionsKind2(
      node.children,
      null,
      {
        n: 0,
      },
      (
        entry?: Dynamic,
        options?: Dynamic,
        context?: unknown,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        if (entry.sess === null && typeof context == `string`) return;
        let len: Dynamic = entry.kind === `text` ? entry.len : 1;
        let filteredFilteredItems: Dynamic = filteredItems.filter(
          (filteredItem?: Dynamic, ..._extraArguments: unknown[]) =>
            filteredItem.s < options + len && filteredItem.e >= options,
        );
        if (filteredFilteredItems.length === 0) return;
        if (typeof context != `string`)
          return filteredFilteredItems.reduceRight(
            (
              updateEditorExtensionsThread2?: Dynamic,
              options2?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              resolveEditorExtensionsAnchor3(options2.thread, [
                updateEditorExtensionsThread2,
              ]),
            context,
          );
        let uniqueItems: Dynamic = new (Set as Dynamic)([0, len]);
        for (let updateEditorExtensionsThreadResult2 of filteredFilteredItems as Dynamic) {
          if (updateEditorExtensionsThreadResult2.s > options) {
            uniqueItems.add(updateEditorExtensionsThreadResult2.s - options);
          }
          if (updateEditorExtensionsThreadResult2.e + 1 < options + len) {
            uniqueItems.add(
              updateEditorExtensionsThreadResult2.e + 1 - options,
            );
          }
        }
        let toSorted: Dynamic = [...uniqueItems].toSorted(
          (
            item?: Dynamic,
            item2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => item - item2,
        );
        let items3: Dynamic = [];
        for (let index = 0; index + 1 < toSorted.length; index++) {
          let [items4, setItems]: Dynamic = [
            toSorted[index],
            toSorted[index + 1],
          ];
          let contextSlice = context.slice(
            resolveEditorExtensionsCharCodeAt2(context, items4),
            resolveEditorExtensionsCharCodeAt2(context, setItems),
          );
          let filteredFilteredFilteredItems: Dynamic =
            filteredFilteredItems.filter(
              (filteredFilteredItem?: Dynamic, ..._extraArguments: unknown[]) =>
                filteredFilteredItem.s <= options + items4 &&
                filteredFilteredItem.e >= options + setItems - 1,
            );
          items3.push(
            filteredFilteredFilteredItems.reduceRight(
              (
                updateEditorExtensionsThread2?: Dynamic,
                options2?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic =>
                resolveEditorExtensionsAnchor3(options2.thread, [
                  updateEditorExtensionsThread2,
                ]),
              contextSlice,
            ),
          );
        }
        return items3;
      },
    );
  }
  let record2: Dynamic = updateEditorExtensionsThreadResult
    ? {
        ...node,
        children: updateEditorExtensionsThreadResult,
      }
    : node;
  let filteredItems2: Dynamic = items.filter(
    (entry?: Dynamic, ..._extraArguments: unknown[]) => entry.kind === `cells`,
  );
  if (filteredItems2.length > 0) {
    let lookup2: Dynamic = new (Map as Dynamic)();
    for (let updateEditorExtensionsThreadResult2 of filteredItems2 as Dynamic)
      for (let updateEditorExtensionsThreadResult3 of updateEditorExtensionsThreadResult2.ids as Dynamic)
        lookup2.set(updateEditorExtensionsThreadResult3, [
          ...(lookup2.get(updateEditorExtensionsThreadResult3) ?? []),
          updateEditorExtensionsThreadResult2.thread,
        ]);
    let updateEditorExtensionsThreadHandler: Dynamic = (
      updateEditorExtensionsThread2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let updateEditorExtensionsThreadResult2: Dynamic;
      updateEditorExtensionsThread2.forEach(
        (
          node2?: Dynamic,
          index?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (
            typeof node2 == `string` ||
            resolveEditorExtensionsBlock(node2) !== `block`
          ) {
            if (updateEditorExtensionsThreadResult2) {
              updateEditorExtensionsThreadResult2.push(node2);
            }
            return;
          }
          let updateEditorExtensionsThreadHandler3: Dynamic =
            updateEditorExtensionsThreadHandler(node2.children);
          let lookupEntry: Dynamic =
            typeof node2.attrs.id == `string`
              ? lookup2.get(node2.attrs.id)
              : undefined;
          if (!updateEditorExtensionsThreadHandler3 && !lookupEntry) {
            if (updateEditorExtensionsThreadResult2) {
              updateEditorExtensionsThreadResult2.push(node2);
            }
            return;
          }
          updateEditorExtensionsThreadResult2 ??=
            updateEditorExtensionsThread2.slice(0, index);
          let updateEditorExtensionsThreadHandler4: Dynamic =
            updateEditorExtensionsThreadHandler3 ?? node2.children;
          updateEditorExtensionsThreadResult2.push({
            ...node2,
            children: lookupEntry
              ? [
                  ...lookupEntry.map(
                    (
                      lookupEntry2?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic =>
                      resolveEditorExtensionsAnchor3(lookupEntry2, []),
                  ),
                  ...updateEditorExtensionsThreadHandler4,
                ]
              : updateEditorExtensionsThreadHandler4,
          });
        },
      );
      return updateEditorExtensionsThreadResult2;
    };
    let updateEditorExtensionsThreadHandler2: Dynamic =
      updateEditorExtensionsThreadHandler(record2.children);
    if (updateEditorExtensionsThreadHandler2) {
      record2 = {
        ...record2,
        children: updateEditorExtensionsThreadHandler2,
      };
    }
  }
  return record2;
}

var editorExtensionsSet12: Dynamic;

var editorExtensionsSet13: Dynamic;

var resolveEditorExtensionsValue29: Dynamic;

var resolveEditorExtensionsUtterance: Dynamic;

var EditorExtensionsINSTANCECHURN: Dynamic;

var resolveEditorExtensionsUtterance2: Dynamic;

var EditorExtensionsFrameSendError: Dynamic;

var editorExtensionsSet14: Dynamic;

var editorExtensionsSet15: Dynamic;

var editorExtensionsValue1500: number;

var editorExtensionsValue30000: number;

var editorExtensionsValue10003: number;

var editorExtensionsValue8000: number;

var editorExtensionsValue12000: number;

var EditorExtensionsState8: number[];

var RESET_STORM: string;

var INSTANCE_CHURN: string;

var editorExtensionsSet16: Dynamic;

var editorExtensionsValue2000: number;

var editorExtensionsValue60000: number;

var editorExtensionsValue300002: number;

var editorExtensionsSet17: Dynamic;

var editorExtensionsSet18: Dynamic;

var editorExtensionsValue20000: number;

var EditorExtensionsWITHDRAWN: string;

var editorExtensionsValue15002: number;

var editorExtensionsValue80002: number;

var editorExtensionsValue10000: number;

var EditorExtensionsNORESULTRELAY: string;

var editorExtensionsSet19: Dynamic;

var editorExtensionsSet20: Dynamic;

var editorExtensionsSet21: Dynamic;

var editorExtensionsSet22: Dynamic;

var editorExtensionsSet23: Dynamic;

var editorExtensionsState2: Dynamic;

function resolveEditorExtensionsHello(
  editorExtensionsHello?: Dynamic,
  options: Dynamic = false,
  ..._extraArguments: unknown[]
): undefined {
  editorExtensionsHello.cancelHello?.();
  editorExtensionsHello.cancelHello = undefined;
  if (
    !(
      editorExtensionsHello.helloAnswered || !editorExtensionsHello.port.hello()
    )
  ) {
    helloImport(`hello`);
    resolveEditorExtensionsCancelHello(editorExtensionsHello, options);
  }
}

function resolveEditorExtensionsCancelHello(
  editorExtensionsCancelHello?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (!options)
    return resolveEditorExtensionsRandom(editorExtensionsCancelHello);
  editorExtensionsCancelHello.cancelHello =
    editorExtensionsCancelHello.deps.schedule(
      (..._extraArguments: unknown[]): undefined => {
        editorExtensionsCancelHello.cancelHello = undefined;
        if (!editorExtensionsCancelHello.helloAnswered) {
          resolveEditorExtensionsRandom(editorExtensionsCancelHello);
        }
      },
      0,
    );
}

function resolveEditorExtensionsRandom(
  editorExtensionsRandom?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let amount: Dynamic =
    editorExtensionsRandom.deps.random() *
    editorExtensionsRandom.helloBackoffMs;
  editorExtensionsRandom.helloBackoffMs = Math.min(
    editorExtensionsRandom.helloBackoffMs * 2,
    editorExtensionsValue8000,
  );
  editorExtensionsRandom.cancelHello = editorExtensionsRandom.deps.schedule(
    (..._extraArguments: unknown[]): undefined => {
      editorExtensionsRandom.cancelHello = undefined;
      if (!editorExtensionsRandom.helloAnswered) {
        resolveEditorExtensionsHello(editorExtensionsRandom);
      }
    },
    amount,
  );
}

function resolveEditorExtensionsState(
  editorExtensionsState3?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  helloImport(`state`);
  editorExtensionsState3.helloAnswered = true;
  editorExtensionsState3.everHelloAnswered = true;
  editorExtensionsState3.helloTerminal = null;
  editorExtensionsState3.helloRefusals = 0;
  editorExtensionsState3.cancelHello?.();
  editorExtensionsState3.cancelHello = undefined;
  editorExtensionsState3.helloBackoffMs = 500;
  for (let resolveEditorExtensionsStateResult of editorExtensionsState3.byStream.values() as Dynamic)
    resolveEditorExtensionsStateResult.onHelloAnswered();
}

function resolveEditorExtensionsHelloRefusals(
  editorExtensionsHelloRefusals?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  editorExtensionsHelloRefusals.helloRefusals++;
  if (!(editorExtensionsHelloRefusals.helloRefusals <= 3)) {
    editorExtensionsHelloRefusals.deps.log?.(`lane:hello:refused`);
    editorExtensionsHelloRefusals.cancelHello?.();
    editorExtensionsHelloRefusals.cancelHello = undefined;
    editorExtensionsHelloRefusals.helloTerminal = options;
    for (let resolveEditorExtensionsHelloRefusalsResult of editorExtensionsHelloRefusals.byStream.values() as Dynamic)
      resolveEditorExtensionsHelloRefusalsResult.onTerminal(options);
  }
}

function resolveEditorExtensionsHelloAnswered(
  editorExtensionsHelloAnswered?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (editorExtensionsHelloAnswered.helloAnswered) {
    editorExtensionsHelloAnswered.restarts++;
    if (editorExtensionsHelloAnswered.restarts > 3) {
      editorExtensionsHelloAnswered.deps.log?.(`lane:restart:exhausted`);
      for (let resolveEditorExtensionsHelloAnsweredResult of editorExtensionsHelloAnswered.byStream.values() as Dynamic)
        resolveEditorExtensionsHelloAnsweredResult.onTerminal(options);
      return;
    }
    editorExtensionsHelloAnswered.deps.log?.(`lane:restart:${options}`);
    editorExtensionsHelloAnswered.helloAnswered = false;
    editorExtensionsHelloAnswered.connected = false;
    for (let resolveEditorExtensionsHelloAnsweredResult of editorExtensionsHelloAnswered.byStream.values() as Dynamic)
      resolveEditorExtensionsHelloAnsweredResult.onRestart(options);
    resolveEditorExtensionsHello(editorExtensionsHelloAnswered);
  }
}

function resolveEditorExtensionsCancelAsk(
  editorExtensionsCancelAsk?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  editorExtensionsCancelAsk.cancelAsk = undefined;
  if (editorExtensionsCancelAsk.port.pending) {
    editorExtensionsCancelAsk.port.expire();
    editorExtensionsCancelAsk.cancelHello?.();
    editorExtensionsCancelAsk.cancelHello = undefined;
    editorExtensionsCancelAsk.deps.log?.(`lane:hello:unanswered`);
    editorExtensionsCancelAsk.deps.onShellOriginUnanswered?.();
    for (let resolveEditorExtensionsCancelAskResult of editorExtensionsCancelAsk.byStream.values() as Dynamic)
      resolveEditorExtensionsCancelAskResult.onTerminal(
        helloRImport.toUpperCase(),
      );
  }
}

function resolveEditorExtensionsPort(
  deps?: Dynamic,
  options: Dynamic = false,
  ..._extraArguments: unknown[]
): Dynamic {
  if (editorExtensionsState2 !== undefined) return editorExtensionsState2;
  let record2: Dynamic = {
    port: undefined,
    deps: deps,
    byStream: new (Map as Dynamic)(),
    byKey: new (Map as Dynamic)(),
    nextIndex: 0,
    connected: false,
    everHelloAnswered: false,
    everConnected: false,
    joinedSendable: null,
    shellCanEdit: null,
    canEditAsked: false,
    helloAnswered: false,
    helloTerminal: null,
    helloBackoffMs: 500,
    cancelHello: undefined,
    cancelAsk: undefined,
    restarts: 0,
    helloRefusals: 0,
    grantBlip: new (Map as Dynamic)(),
    resultsSeen: false,
    relaySilent: false,
  };
  let resolveEditorExtensionsPortHandler: Dynamic = (
    editorExtensionsPort?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => deps.log?.(editorExtensionsPort);
  let getEditorExtensionsState2: Dynamic = (
    editorExtensionsPort?: Dynamic,
    ..._extraArguments: unknown[]
  ) => getEditorExtensionsState(record2, editorExtensionsPort);
  let resolveEditorExtensionsPortHandler2: Dynamic = (
    editorExtensionsPort?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveEditorExtensionsPortHandler(`port:${editorExtensionsPort}`);
  let helloNImport2: Dynamic = helloNImport(
    deps.host,
    getEditorExtensionsState2,
    resolveEditorExtensionsPortHandler2,
  );
  record2.port =
    helloNImport2 === null
      ? helloCImport2(
          deps.host,
          getEditorExtensionsState2,
          resolveEditorExtensionsPortHandler2,
        )
      : helloNImport2.port;
  editorExtensionsState2 = record2;
  if (record2.port.pending) {
    resolveEditorExtensionsPortHandler(`lane:hello:asking`);
    record2.cancelAsk = deps.schedule(
      (..._extraArguments: unknown[]) =>
        resolveEditorExtensionsCancelAsk(record2),
      editorExtensionsValue12000,
    );
  }
  return helloNImport2 === null
    ? (resolveEditorExtensionsHello(record2, options), record2)
    : (resolveEditorExtensionsPortHandler(`lane:hello:early`),
      resolveEditorExtensionsCancelHello(record2, options),
      helloNImport2.drain(),
      record2);
}

function resolveEditorExtensionsValue30(
  editorExtensionsValue30?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  resolveEditorExtensionsPort(editorExtensionsValue30, true);
}

function resolveEditorExtensionsCanEditAsked(
  editorExtensionsCanEditAsked?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (editorExtensionsCanEditAsked.canEditAsked) return;
  editorExtensionsCanEditAsked.canEditAsked = true;
  let viewerCanEdit: Dynamic = editorExtensionsCanEditAsked.deps.viewerCanEdit;
  if (viewerCanEdit !== undefined) {
    Promise.resolve()
      .then(viewerCanEdit)
      .then(
        (result?: unknown, ..._extraArguments: unknown[]) =>
          typeof result == `boolean` ? result : null,
        (..._extraArguments: unknown[]) => null,
      )
      .then((result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        if (
          !(
            editorExtensionsState2 !== editorExtensionsCanEditAsked ||
            result === null
          )
        ) {
          editorExtensionsCanEditAsked.shellCanEdit = result;
          editorExtensionsCanEditAsked.deps.log?.(
            `lane:shell-can-edit:${result}`,
          );
          for (let resolveEditorExtensionsCanEditAskedResult of editorExtensionsCanEditAsked.byStream.values() as Dynamic)
            resolveEditorExtensionsCanEditAskedResult.onShellVerdict();
        }
      });
  }
}

function getEditorExtensionsState(
  editorExtensionsState3?: Dynamic,
  operation?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  switch (
    (editorExtensionsState3.cancelAsk !== undefined &&
      !editorExtensionsState3.port.pending &&
      (editorExtensionsState3.cancelAsk(),
      (editorExtensionsState3.cancelAsk = undefined)),
    operation.op)
  ) {
    case `state`:
      if (!editorExtensionsState3.helloAnswered) {
        resolveEditorExtensionsState(editorExtensionsState3);
      }
      if (operation.hostStart !== undefined) {
        helloVImport(operation.hostStart, operation.hostStartFrom);
      }
      editorExtensionsState3.connected = operation.connected;
      if (operation.connected) {
        editorExtensionsState3.everConnected = true;
        editorExtensionsState3.joinedSendable = operation.sendable;
      }
      for (let getEditorExtensionsStateResult of editorExtensionsState3.byStream.values() as Dynamic)
        getEditorExtensionsStateResult.onState();
      return;
    case `unavailable`: {
      let toUpperCase: Dynamic = operation.reason.toUpperCase();
      if (editorExtensionsSet20.has(operation.reason)) {
        if (editorExtensionsState3.helloAnswered) {
          resolveEditorExtensionsHelloAnswered(
            editorExtensionsState3,
            toUpperCase,
          );
        } else {
          resolveEditorExtensionsHelloRefusals(
            editorExtensionsState3,
            toUpperCase,
          );
        }
      } else {
        if (!editorExtensionsState3.helloAnswered) {
          editorExtensionsState3.helloTerminal = toUpperCase;
        }
        for (let getEditorExtensionsStateResult of editorExtensionsState3.byStream.values() as Dynamic)
          getEditorExtensionsStateResult.onTerminal(toUpperCase);
      }
      return;
    }
    case `reset`:
      if (!operation.reopening && editorExtensionsSet19.has(operation.reason)) {
        resolveEditorExtensionsHelloAnswered(
          editorExtensionsState3,
          operation.reason,
        );
        return;
      }
      {
        let byStreamEntry: Dynamic = editorExtensionsState3.byStream.get(
          operation.stream,
        );
        if (byStreamEntry === undefined) {
          editorExtensionsState3.deps.log?.(`lane:stray-stream`);
        } else {
          byStreamEntry.onMsg(operation);
        }
      }
      return;
    default: {
      if (operation.op === `result` && !editorExtensionsState3.resultsSeen) {
        editorExtensionsState3.resultsSeen = true;
        editorExtensionsState3.relaySilent = false;
        editorExtensionsState3.deps.log?.(`lane:relay:results`);
      }
      let byStreamEntry: Dynamic = editorExtensionsState3.byStream.get(
        operation.stream,
      );
      if (byStreamEntry === undefined) {
        editorExtensionsState3.deps.log?.(`lane:stray-stream`);
        return;
      }
      byStreamEntry.onMsg(operation);
    }
  }
}

function updateEditorExtensionsByKey(
  updateEditorExtensionsByKey2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let editorExtensionsPort: Dynamic = resolveEditorExtensionsPort(options);
  resolveEditorExtensionsCanEditAsked(editorExtensionsPort);
  let byKeyEntry: Dynamic = editorExtensionsPort.byKey.get(
    updateEditorExtensionsByKey2,
  );
  if (byKeyEntry !== undefined) return byKeyEntry;
  if (editorExtensionsPort.nextIndex >= 16)
    throw Error(`frameShell: lane budget exhausted (16)`);
  let editorExtensionsReadTimeouts: Dynamic =
    new (EditorExtensionsReadTimeouts as Dynamic)(
      editorExtensionsPort,
      updateEditorExtensionsByKey2,
      `${helloAImport}.${editorExtensionsPort.nextIndex++}`,
    );
  editorExtensionsPort.byKey.set(
    updateEditorExtensionsByKey2,
    editorExtensionsReadTimeouts,
  );
  editorExtensionsPort.byStream.set(
    editorExtensionsReadTimeouts.stream,
    editorExtensionsReadTimeouts,
  );
  editorExtensionsReadTimeouts.begin();
  return editorExtensionsReadTimeouts;
}

function getEditorExtensionsValue(
  editorExtensionsValue?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return editorExtensionsState2?.byKey.get(editorExtensionsValue);
}

function resolveEditorExtensionsHelloAnswered2(
  ..._extraArguments: unknown[]
): Dynamic {
  let editorExtensionsState22: Dynamic = editorExtensionsState2;
  if (editorExtensionsState22 === undefined) return null;
  let everOpened = false;
  let resolveEditorExtensionsHelloAnswered2Result: Dynamic = null;
  for (let resolveEditorExtensionsHelloAnswered2Result2 of editorExtensionsState22.byStream.values() as Dynamic) {
    if (resolveEditorExtensionsHelloAnswered2Result2.hasOpened) {
      everOpened = true;
    }
    if (
      resolveEditorExtensionsHelloAnswered2Result === null &&
      resolveEditorExtensionsHelloAnswered2Result2.deadReason !== null
    ) {
      resolveEditorExtensionsHelloAnswered2Result =
        resolveEditorExtensionsHelloAnswered2Result2.deadReason;
    }
  }
  return {
    helloAnswered: editorExtensionsState22.everHelloAnswered,
    everConnected: editorExtensionsState22.everConnected,
    connectedNow: editorExtensionsState22.connected,
    everOpened: everOpened,
    deadReason:
      resolveEditorExtensionsHelloAnswered2Result ??
      editorExtensionsState22.helloTerminal,
    restarts: editorExtensionsState22.restarts,
  };
}

var resolveEditorExtensionsValue31: Dynamic;

var resolveEditorExtensionsValue32: (editorExtensionsValue32?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolveEditorExtensionsValue33: Dynamic;

var resolveEditorExtensionsKind3: Dynamic;

var resolveEditorExtensionsParent: Dynamic;

var EditorExtensionsBlob: Dynamic;

function resolveEditorExtensionsNode2(
  editorExtensionsNode2?: Dynamic,
  error?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return typeof context == `string`
    ? context
    : editorExtensionsNode2 === `node` &&
        resolveEditorExtensionsValue31(error) &&
        typeof error.pub == `number` &&
        typeof error.code == `string`
      ? `widget`
      : (EditorExtensionsBlob[editorExtensionsNode2] ?? `json`);
}

var resolveEditorExtensionsSeq: Dynamic;

var resolveEditorExtensionsCode: Dynamic;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeEditorExtensions3Step1(): void {
  (isEditorExtensionsFilter = (
    editorExtensionsFilter?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    Object.fromEntries(
      Object.entries(editorExtensionsFilter).filter(
        ([rolldownNImportEntry]: Dynamic, ..._extraArguments: unknown[]) =>
          !EditorExtensionsIdHRevSeqByKindCompleteSinceSinceRevSessType.has(
            rolldownNImportEntry,
          ),
      ),
    ));
  (resolveEditorExtensionsValue25 = (
    editorExtensionsValue25?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveEditorExtensionsBlocks(
      filterEditorExtensionsFilter(editorExtensionsValue25),
    ));
  (resolveEditorExtensionsValue26 = (
    editorExtensionsValue26?: unknown,
    ..._extraArguments: unknown[]
  ) => typeof editorExtensionsValue26 != `string`);
  (resolveEditorExtensionsName2 = (
    editorExtensionsName2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    resolveEditorExtensionsValue26(editorExtensionsName2) &&
    editorExtensionsName2.name === `gap` &&
    resolveEditorExtensionsTrue2(editorExtensionsName2.attrs.cap) === true);
  (resolveEditorExtensionsName3 = (
    editorExtensionsName3?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    resolveEditorExtensionsValue26(editorExtensionsName3) &&
    editorExtensionsName3.name === `gap` &&
    !resolveEditorExtensionsTrue2(editorExtensionsName3.attrs.cap));
  (resolveEditorExtensionsTrim4 = (
    editorExtensionsTrim4?: unknown,
    ..._extraArguments: unknown[]
  ) => typeof editorExtensionsTrim4 == `string` && !editorExtensionsTrim4.trim());
  (resolveEditorExtensionsAnchor = (
    node?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveEditorExtensionsValue26(node) &&
    node.name === `anchor` &&
    node.attrs.id === undefined &&
    node.children.every(resolveEditorExtensionsTrim4));
  (resolveEditorExtensionsReplace2 = (
    editorExtensionsReplace2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    editorExtensionsReplace2.replace(
      /[&<>]/g,
      (editorExtensionsReplace22?: Dynamic, ..._extraArguments: unknown[]) =>
        editorExtensionsReplace22 === `&`
          ? `&amp;`
          : editorExtensionsReplace22 === `<`
            ? `&lt;`
            : `&gt;`,
    ));
  (resolveEditorExtensionsReplace3 = (
    editorExtensionsReplace3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    editorExtensionsReplace3.replace(
      /[&<"]/g,
      (editorExtensionsReplace32?: Dynamic, ..._extraArguments: unknown[]) =>
        editorExtensionsReplace32 === `&`
          ? `&amp;`
          : editorExtensionsReplace32 === `<`
            ? `&lt;`
            : `&quot;`,
    ));
  (editorExtensionsValue40962 = 4096);
  (editorExtensionsSet10 = new (Set as Dynamic)(
    dataContentAndReferencesProjectSuiteValues,
  ));
  (editorExtensionsSet11 = new (Set as Dynamic)(
    dataEnumsAndValidationProjectFileNodeRunValues.filter(
      (
        dataEnumsAndValidationProjectFileNodeRunValue?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        !resolveDataEnumsAndValidationIncludes(
          dataEnumsAndValidationProjectFileNodeRunValue,
        ),
    ),
  ));
  (resolveEditorExtensionsValue27 = (
    editorExtensionsValue27?: Dynamic,
    ..._extraArguments: unknown[]
  ) => isEditorExtensionsContainer(editorExtensionsValue27) !== null);
  (editorExtensionsMessageReactionResolveValues = [
    `message`,
    `reaction`,
    `resolve`,
  ]);
  (editorExtensionsValue65536 = 65536);
  (editorExtensionsTabSchema = lazyZod
    .strictObject({
      tab: lazyZod
        .number()
        .int()
        .describe(`Which tab (snapshot index) the comment points at.`),
      url: lazyZod
        .string()
        .describe(`The tab's url at comment time — render-law input #2.`),
      state: lazyZod
        .json()
        .optional()
        .describe(
          `The tab's tabState at comment time (any JSON, zTabState-shaped) — render-law input #3. z.json() not z.unknown(): unknown compiles to a bare {} in the MCP tool schemas and lies about optionality (no-bare-node law, Jul 7).`,
        ),
      beat: lazyZod
        .number()
        .int()
        .optional()
        .describe(`Which beat of the performance the viewer was on.`),
      line: lazyZod
        .number()
        .int()
        .optional()
        .describe(`The focused source line, if any.`),
      rect: lazyZod
        .strictObject({
          x: lazyZod
            .number()
            .describe(
              `Left edge in tab-pane pixels, measured from the pane's left.`,
            ),
          y: lazyZod
            .number()
            .describe(
              `Top edge in tab-pane pixels, measured from the pane's top.`,
            ),
          w: lazyZod
            .number()
            .describe(`Width in pixels — an EXTENT, not a second corner's x.`),
          h: lazyZod
            .number()
            .describe(`Height in pixels — an EXTENT, not a second corner's y.`),
        })
        .describe(`The dragged rectangle, in tab-pane pixels.`),
      size: lazyZod
        .strictObject({
          w: lazyZod
            .number()
            .describe(`The tab pane's width in pixels at drag time.`),
          h: lazyZod
            .number()
            .describe(`The tab pane's height in pixels at drag time.`),
        })
        .describe(
          `The tab pane's size when dragged — rect is meaningless without it.`,
        ),
      b64: lazyZod
        .string()
        .max(3e6)
        .optional()
        .describe(
          `The cropped screenshot png. NEVER client-supplied — and the door ENFORCES it: the json engine declares this key host-vouched (Engine.testimony, engines/json.ts), so a non-host-channel payload carrying it denies host-testimony at receive. The capture service photographs the real viewer at (url, state, beat) itself and commits this via a host-channel update — pixels enter the world ledgered, like every other fact. Absent = capture pending.`,
        ),
    })
    .describe(
      `A region of a rendered tab: the geometry, plus the render-law inputs (url, state, beat) the host needs to re-photograph it.`,
    ));
  (editorExtensionsBlobSchema = lazyZod
    .strictObject({
      type: lazyZod.literal(`image`),
      blob: lazyZod
        .string()
        .regex(/^blob\/[A-Za-z0-9_-]{1,64}$/)
        .describe(
          `The blob RECORD's room address, blob/<id> — the same grammar as the prose engine's media ref (zProseMedia). Hydration re-reads the record through the room (the ACL gate) then fetches bytes by the record's sha; the address itself is never a byte capability.`,
        ),
      mime: lazyZod
        .enum([
          `image/png`,
          `image/jpeg`,
          `image/jpg`,
          `image/gif`,
          `image/webp`,
          `image/avif`,
          `image/heic`,
          `image/heif`,
        ])
        .describe(
          "RASTER-ONLY allowlist (🛡️ review): the earlier `/^image\\/…$/` shape admitted `image/svg+xml`, and SVG carries scripts — a chat-planted SVG rendered as an <img> is an XSS vector regardless of client-side filtering. The schema is the wall, so only formats that CANNOT carry script commit. Superset of the composer's RASTER_IMAGE set; the extras (avif/heic/heif, and the non-IANA `jpg` alias some browsers report) are all pure raster.",
        ),
      name: lazyZod
        .string()
        .min(1)
        .max(512)
        .regex(new RegExp(String.raw`^(?!\.)[^\\/\u0000-\u001f]+$`, `u`))
        .optional()
        .describe(
          `The dropped file's display name — alt text and download hint only. Schema-refuses path separators, control characters, and leading dots (the composer sanitizes client-side; the schema is the wall for every other writer).`,
        ),
    })
    .describe(
      `A speaker-attached image, by blob-record ADDRESS. No b64, no sha, no url — bytes never ride the utterance value.`,
    ));
  (editorExtensionsTypeSchema = lazyZod
    .discriminatedUnion(`type`, [
      editorExtensionsTabSchema.extend({
        type: lazyZod
          .literal(`shot`)
          .describe(
            "A SCREENSHOT COMMENT: the utterance anchors to a region of a rendered tab. The client sends geometry + render inputs only; the host's capture pass fills `b64`. In production the utterance's container is the performance object.",
          ),
      }),
      editorExtensionsBlobSchema,
    ])
    .describe(
      "One thing attached to an utterance, discriminated by `type`. An attachment is CONTENT riding with the remark — never its position (position rides the one generic parent edge), and never a link (a link is a mark in the body prose).",
    ));
  (editorExtensionsAnchorSchema = lazyZod
    .strictObject({
      object: dataContentAndReferencesDescribeSchema4.describe(
        `What KIND of object this utterance hangs on.`,
      ),
      id: dataContentAndReferencesDescribeSchema
        .min(1)
        .describe(
          `The parent's minted id — non-empty floor (verifier F3: the body grammar's tokenizer already refuses an empty oid; the edge schema matches it).`,
        ),
      anchor: lazyZod
        .json()
        .optional()
        .describe(
          `WHERE INSIDE the parent, for placed comments — engine-defined (the owning engine's Engine.target grammar: zProseTarget's text quote, zJsonTarget's patch path, zWidgetTarget's component/anchor arms) and therefore ANY JSON here, deliberately: the door validates it live against the parent's engine (anchorParses), because grammars can tighten while committed history stands — pinning today's target union into this fold-strict shape would re-judge committed anchors on every future grammar change. z.json() IS the seat's whole fold contract (the wire is JSON; the census close-out typed the envelope, not the vocabulary). Absent = the parent as a whole.`,
        ),
      label: lazyZod
        .string()
        .max(128)
        .refine(
          (
            editorExtensionsAnchorSchema2?: Dynamic,
            ..._extraArguments: unknown[]
          ) => editorExtensionsAnchorSchema2.trim().length > 0,
          `a label says something or is absent — never blank`,
        )
        .optional()
        .describe(
          `HOW THE PLACE READS, for surfaces that cannot open the parent (the page computes it; the door stores an optional parent.label beside parent.anchor on every comment create, the same key for all anchor kinds): one display line the PAGE computed at post time — the quoted words, 'Image', a chart's '<title> · <series>: <value> · <x>' (pinLabel.ts commentLabelOf) — stored VERBATIM (1..128 UTF-16 units, not blank), never interpreted, never an address: the anchor says WHERE, this says how a human names it. Returned in listings and the MCP comment face; the page itself renders from the anchor's shape and the live document, not from this. Absent = no label (every comment born before it, and any the page could not name).`,
        ),
    })
    .describe(
      `The ONE generic optional parent edge (Q4, ruled Jul 10) — {object, id, anchor?, label?}: no utterance-specific edge fields anywhere (label is display testimony about the edge, not a second edge). IMMUTABLE after birth (door value-law, 13a door-arm commit).`,
    ));
  (editorExtensionsRefSchema = lazyZod
    .strictObject({
      ref: lazyZod
        .strictObject({
          ...dataContentAndReferencesFragSchema.shape,
          object: dataContentAndReferencesDescribeSchema4,
        })
        .describe(`The quoted object.`),
      anchor: lazyZod
        .json()
        .optional()
        .describe(
          `Engine-defined position inside the quoted object — same posture as the parent edge's anchor: ANY JSON here (the fold contract; the wire is JSON), the target vocabulary (zProseTarget / zJsonTarget / zWidgetTarget) validated live at the door, never fold-pinned. The citation deny (quoteAnchorCarriesCitation) is door law, not shape law.`,
        ),
    })
    .describe(
      `A message's optional soft quote target {ref, anchor?} — a second address that may dangle; never cascades, never positions.`,
    ));
  (editorExtensionsFileIdSchema = lazyZod
    .strictObject({
      fileId: lazyZod
        .string()
        .min(1)
        .max(256)
        .describe(
          `The focused file's id — a client-claimed UI fact, never dereferenced by law.`,
        ),
      name: lazyZod
        .string()
        .max(512)
        .optional()
        .describe(
          `The tab's display label at send time (client-derived from path).`,
        ),
      pin: lazyZod
        .json()
        .optional()
        .superRefine(
          (
            editorExtensionsFileIdSchema2?: Dynamic,
            options?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (editorExtensionsFileIdSchema2 === undefined) return;
            let editorExtensionsFileIdSchemaResult: Dynamic;
            try {
              let stringify = JSON.stringify(editorExtensionsFileIdSchema2);
              if (stringify === undefined) {
                options.addIssue({
                  code: `custom`,
                  message: `pin must be JSON-representable`,
                });
                return;
              }
              editorExtensionsFileIdSchemaResult = stringify.length;
              if (/"(?:__proto__|constructor|prototype)"\s*:/.test(stringify)) {
                options.addIssue({
                  code: `custom`,
                  message: `pin carries a prototype-shaped key`,
                });
                return;
              }
            } catch {
              options.addIssue({
                code: `custom`,
                message: `pin must be JSON-representable`,
              });
              return;
            }
            if (editorExtensionsFileIdSchemaResult > 8192) {
              options.addIssue({
                code: `custom`,
                message: `pin exceeds the 8 KiB citation envelope`,
              });
            }
          },
        )
        .describe(
          "The DATUM the user pinned inside this tab when they asked (Ask Claude on a chart bar / KPI) — the widget engine's own datum-target grammar (`{kind:'component', component, source?, resolved?, value?}`, the SAME anchor the Comment road stamps as its citation), and therefore OPAQUE here for exactly the reason `parent.anchor` and `quote.anchor` are: engine grammars tighten while committed history stands. STRUCTURED, never a pre-rendered string, so every surface renders it through the ONE pin renderer (`pinReadout`) at READ time — the transcript bubble, the composer chip and the system-prompt line cannot drift apart, and a pin whose datum no longer resolves still reads its stored `value` testimony instead of going blank. Same testimony category as `name`: CLIENT-SUPPLIED UI STATE, never addressing, never routing, never ACL-consulted. Widened additively (optional + strict), so old writers keep committing and old rows keep folding.",
        ),
    })
    .describe(
      `The tab the user was looking at when they sent this — CLIENT-SUPPLIED UI STATE, not addressing.`,
    ));
  (editorExtensionsPattern12 = /^(?:claude|u_[A-Za-z0-9_]{22}|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/);
  (EditorExtensionsNotAMentionPrincipal = lazyZod
    .string()
    .regex(editorExtensionsPattern12, `not a mention principal`));
  (editorExtensionsKindSchema = lazyZod.strictObject({
    kind: lazyZod
      .literal(`message`)
      .optional()
      .describe(
        "The discriminator — ABSENT by default on the message arm: an utterance with no `kind` is a message (RULED spelling, workbook p13 U2/Q1). Written explicitly only by clients that prefer to be explicit. The other arms are `reaction` and `resolve`.",
      ),
    body: lazyZod
      .string()
      .max(editorExtensionsValue65536)
      .describe(
        "What was said — the text. Who said it and when are the room's envelope testimony (LedgerRow / Broadcast at+actor), never client-written fields — a client cannot claim an author. Chat's STORAGE is the ledger (rows are ordered and stamped); memory holds only the current body so room physics work: update/delete need a `before`, and refs (a comment anchoring to an utterance) must resolve. LINKS LIVE HERE (Jul 6): external URLs and in-world object links alike are MARKS IN THIS PROSE — there is no `url` field and no `modal` field, because a link is something the body says, not a property of the remark. In-world links ride the <claude:{container}/{ref}#anchor> token (Q2, ruled Jul 10) — parseBodyTokens below is the one grammar. CEILING: 65,536 chars (proceed-by-default, routed to the tracker; zShot.b64's 3MB cap is the house precedent) — tightening at a fresh DB is free, loosening later is always fold-safe, so the cap lands schema-side now rather than as door law forever.",
      ),
    attachments: lazyZod
      .array(editorExtensionsTypeSchema)
      .max(5)
      .optional()
      .describe(
        "CONTENT riding with the remark — screenshots today (`{type:'shot'}`). ABSENT = none (optional, never .default([]): the door commits the PARSE OUTPUT since Jul 7, and a default would materialize an empty array onto every stored utterance — defaults are read-side sugar, not stored truth). This array is the fold that retired the top-level `shot` field.",
      ),
    parent: editorExtensionsAnchorSchema
      .optional()
      .describe(
        `Where this message hangs: the thread's ROOT utterance (a reply — one level only, U8), a file/node (a comment, with anchor for placed comments — U6), or a run (suite-run chat). ABSENT = a plain container remark rendered in the conversation (U14: chat is an utterance on the container without a parent).`,
      ),
    quote: editorExtensionsRefSchema.optional(),
    viewing: editorExtensionsFileIdSchema.optional(),
    to: lazyZod
      .array(EditorExtensionsNotAMentionPrincipal)
      .min(1)
      .max(16)
      .refine(
        (items?: Dynamic, ..._extraArguments: unknown[]) =>
          new (Set as Dynamic)(items).size === items.length,
        `addressees must be unique`,
      )
      .optional()
      .describe(
        "THE ADDRESSEE seat: who the message ASKS — 1–16 DISTINCT mention principals (`u_…`, a lowercase account uuid, or `claude` — the literal that asks Claude to answer). BIRTH FACTS like the parent edge (an update never moves them — door law, `update_moves_lists`); the door reads them to paint `<comment … to='claude' answered=…/>` and the query rows' `to` / `answered`. Admitted at COMMIT only under a door that says `caps.utteranceTo` (api-rs `DoorFlag::UtteranceTo`); the shape admits them on every road so the fold replays whatever was admitted. Widened additively (optional + strict) — old rows fold unchanged. The TS twin of api-rs shapes.rs MESSAGE `to`.",
      ),
    cc: lazyZod
      .array(EditorExtensionsNotAMentionPrincipal)
      .min(1)
      .max(16)
      .refine(
        (items?: Dynamic, ..._extraArguments: unknown[]) =>
          new (Set as Dynamic)(items).size === items.length,
        `addressees must be unique`,
      )
      .optional()
      .describe(
        "Who is copied for visibility — same grammar as `to`, never an ask. Admitted only under `caps.utteranceTo`.",
      ),
    changeNote: lazyZod
      .strictObject({
        bids: lazyZod
          .array(lazyZod.string().min(1).max(64))
          .max(64)
          .optional()
          .describe(
            `The touched block bids (attrs.bid) this note summarizes — bounded like the ops arm itself (≤64 ops per row).`,
          ),
      })
      .optional()
      .describe(
        "AGENT CHANGE-NOTE marker: present IFF this message is a server-composed note on a range the agent just edited (the durable trace an ephemeral edit-splash doesn't leave). HOST-VOUCHED TESTIMONY, not a client field: `changeNote` is in the json engine's TESTIMONY_KEYS, so a non-host-channel payload carrying it refuses host-testimony at the door — only the server's change-note composer (src/api/changeNotes.ts, host channel) can stamp it. The serve projection (v3serveComments) maps its presence to the v1 wire's `kind:\"note\"`. Widened additively (the zViewing precedent): optional + strict, old rows fold unchanged.",
      ),
  }));
  (editorExtensionsKindSchema2 = lazyZod.strictObject({
    kind: lazyZod
      .literal(`reaction`)
      .describe(
        "The discriminator: this utterance is a REACTION, not something said. A reaction is an utterance so that it is minted, ledgered, policy-judged, broadcast and deleted by exactly the machinery every other object uses. UN-REACTING IS DELETING THIS OBJECT — there is no toggle, no `active` flag, no state to reconcile. WHO reacted is the room's envelope testimony (the row's actor), never a field.",
      ),
    emoji: lazyZod
      .string()
      .min(1)
      .max(128)
      .describe(
        "The reaction, as EXACTLY ONE grapheme cluster — `👍`, `👨‍👩‍👧` (ZWJ sequence), `👍🏽` (skin tone), `🇺🇸` (flag). The door counts clusters and refuses anything else (`emoji-grapheme`): two emoji are two reactions, and an empty string is not a reaction at all. The schema bounds here are floor-and-ceiling only (non-empty, ≤128 UTF-16 units — the longest public ZWJ sequences are ~35, so no real cluster comes near it, and every sibling string field carries a cap); the exact one-cluster count is a LIVE door law (countGraphemes below) so a runtime's Unicode-table drift can never re-count committed history at fold.",
      ),
    parent: editorExtensionsAnchorSchema.describe(
      `The MESSAGE utterance this reaction decorates — REQUIRED: there are no parent-less reactions, ever (Q3 ruling, Jul 10: a reaction's parent is another utterance of type message; reacting to a reaction or a resolve refuses at the door, reaction-parent). v1's react-to-file lane drops entirely by the same ruling — no synthetic-root carrier.`,
    ),
  }));
  (editorExtensionsKindSchema3 = lazyZod.strictObject({
    kind: lazyZod
      .literal(`resolve`)
      .describe(
        "The discriminator: this utterance RESOLVES a thread. Reaction-shaped by ruling — same physics: minted, ledgered, policy-judged, broadcast, and deleted (= reopened) by exactly the machinery every other object uses. ROOT-LEVEL ONLY: resolution is thread-level, so a resolve pointed at a reply, a reaction, or another resolve refuses at the door (`resolve-root`).",
      ),
    parent: editorExtensionsAnchorSchema.describe(
      `The thread's ROOT utterance (U12) — REQUIRED. A resolve pointed at a reply, a reaction, or another resolve refuses at the door (resolve-root). A second resolve on an already-resolved root is legal and idempotent in the fold (the thread folds resolved either way). REOPENING IS DELETING THIS OBJECT.`,
    ),
  }));
  (editorExtensionsKindSchema4 = lazyZod
    .discriminatedUnion(`kind`, [
      editorExtensionsKindSchema,
      editorExtensionsKindSchema2,
      editorExtensionsKindSchema3,
    ])
    .describe(
      `An utterance: a MESSAGE (something said — body + attachments + the optional parent edge + the optional soft quote), a REACTION to a message (one emoji, parent = the decorated message), or a RESOLVE of a thread (parent = the thread root; delete = reopen). Three arms, one noun — reactions and resolutions get the room's physics for free. STRICT: unknown keys refuse at the value gate; the island's superseded per-arm edge fields refuse rather than silently strip.`,
    ));
  lazyZod.strictObject({
    under: lazyZod
      .strictObject({
        object: lazyZod.enum([`file`, `node`, `utterance`]),
        id: dataContentAndReferencesDescribeSchema.min(1),
      })
      .describe(
        `The ancestor: every served row's utterance reaches this ref over parent edges (file ← node membership ← root ← reply/reaction/resolve). A parentless utterance (container chat) is under nothing and never serves here.`,
      ),
    verbs: lazyZod
      .array(lazyZod.enum([`create`, `update`, `delete`]))
      .nonempty()
      .optional()
      .describe(`Ledger-verb filter; absent = all three.`),
    afterSeq: lazyZod
      .number()
      .int()
      .nonnegative()
      .optional()
      .describe(`Resume past this seq (exclusive) — the pagination cursor.`),
    limit: lazyZod
      .number()
      .int()
      .positive()
      .max(500)
      .optional()
      .describe(
        `Page size; default UTTERANCE_QUERY_LIMIT_DEFAULT, ceiling UTTERANCE_QUERY_LIMIT_MAX.`,
      ),
  });
  (resolveEditorExtensionsValue28 = (
    editorExtensionsValue28?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof editorExtensionsValue28 == `object` &&
    !!editorExtensionsValue28 &&
    !Array.isArray(editorExtensionsValue28));
  (resolveEditorExtensionsAnchor3 = (
    editorExtensionsAnchor3?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    name: `anchor`,
    attrs: {
      object: `utterance/${editorExtensionsAnchor3}`,
    },
    children: options,
  }));
  (editorExtensionsSet12 = new (Set as Dynamic)([
    `interact`,
    `admin`,
  ]));
  (editorExtensionsSet13 = new (Set as Dynamic)([
    `comment`,
    `interact`,
    `admin`,
  ]));
  (resolveEditorExtensionsValue29 = (
    editorExtensionsValue29?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    editorExtensionsValue29 === null ||
    editorExtensionsSet12.has(editorExtensionsValue29));
  (resolveEditorExtensionsUtterance = (
    editorExtensionsUtterance?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    typeof editorExtensionsUtterance == `object` &&
    !!editorExtensionsUtterance &&
    editorExtensionsUtterance.object === `utterance`);
  (EditorExtensionsINSTANCECHURN = {
    INSTANCE_CHURN: `Still reconnecting — that didn’t go through. Try again in a moment.`,
  });
  (resolveEditorExtensionsUtterance2 = (
    editorExtensionsUtterance2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    editorExtensionsUtterance2.object === `utterance` ||
    resolveEditorExtensionsUtterance(editorExtensionsUtterance2.ref));
  (EditorExtensionsFrameSendError = class extends Error {
    [key: string]: Dynamic;
    code: Dynamic;
    constructor(
      editorExtensionsFrameSendError?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      super(
        EditorExtensionsINSTANCECHURN[editorExtensionsFrameSendError] ??
          `frameShell: send failed (${editorExtensionsFrameSendError})`,
      );
      this.name = `FrameSendError`;
      this.code = editorExtensionsFrameSendError;
    }
  });
  (editorExtensionsSet14 = new (Set as Dynamic)([
    `NOT_WRITABLE`,
    `NOT_SENDABLE`,
  ]));
  (editorExtensionsSet15 = new (Set as Dynamic)([
    `NOT_OPEN`,
    `GRANT_EXPIRED`,
    `GRANT_MISMATCH`,
  ]));
  (editorExtensionsValue1500 = 1500);
  (editorExtensionsValue30000 = 3e4);
  (editorExtensionsValue10003 = 1e3);
  (editorExtensionsValue8000 = 8e3);
  (editorExtensionsValue12000 = 12e3);
  (EditorExtensionsState8 = [2e3, 5e3, 1e4, 2e4]);
  (RESET_STORM = `RESET_STORM`);
  (INSTANCE_CHURN = `INSTANCE_CHURN`);
  (editorExtensionsSet16 = new (Set as Dynamic)([
    INSTANCE_CHURN,
    RESET_STORM,
    `TIMEOUT`,
    `PROTOCOL`,
    `UNKNOWN`,
    `DEAD`,
  ]));
  (editorExtensionsValue2000 = 2e3);
  (editorExtensionsValue60000 = 6e4);
  (editorExtensionsValue300002 = 3e4);
  (editorExtensionsSet17 = new (Set as Dynamic)([`SERVER`]));
  (editorExtensionsSet18 = new (Set as Dynamic)([
    `SERVER`,
    `UNAVAILABLE`,
  ]));
  (editorExtensionsValue20000 = 2e4);
  (EditorExtensionsWITHDRAWN = `WITHDRAWN`);
  (editorExtensionsValue15002 = 1500);
  (editorExtensionsValue80002 = 8e3);
  (editorExtensionsValue10000 = 1e4);
  (EditorExtensionsNORESULTRELAY = `NO_RESULT_RELAY`);
  (editorExtensionsSet19 = new (Set as Dynamic)([
    `CLOSED`,
    `REVOKED`,
    `NO_RELAY`,
  ]));
  (editorExtensionsSet20 = new (Set as Dynamic)([
    `revoked`,
    `no_relay`,
  ]));
  (editorExtensionsSet21 = new (Set as Dynamic)([
    `DENIED`,
    `NOT_JOINED`,
    `LANE_DISABLED`,
    `CAPABILITY_DISABLED`,
    `RATE`,
    `BAD_MESSAGE`,
    `BAD_STORE`,
    `BAD_STREAM`,
    `BAD_SPEC`,
    `BAD_SINCE`,
  ]));
  (editorExtensionsSet22 = new (Set as Dynamic)([
    `RETENTION`,
    `GENERATION`,
    `ROTATION`,
  ]));
  (editorExtensionsSet23 = new (Set as Dynamic)([
    `utterance`,
    `version`,
  ]));
  (resolveEditorExtensionsValue31 = (
    editorExtensionsValue31?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof editorExtensionsValue31 == `object` &&
    !!editorExtensionsValue31 &&
    !Array.isArray(editorExtensionsValue31));
  (resolveEditorExtensionsValue32 = (
    editorExtensionsValue32?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `${editorExtensionsValue32.object}/${editorExtensionsValue32.id}`);
  (resolveEditorExtensionsValue33 = (
    editorExtensionsValue33?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveEditorExtensionsValue31(editorExtensionsValue33) &&
    typeof editorExtensionsValue33.object == `string` &&
    typeof editorExtensionsValue33.id == `string`
      ? {
          object: editorExtensionsValue33.object,
          id: editorExtensionsValue33.id,
        }
      : undefined);
  (resolveEditorExtensionsKind3 = (
    entry?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveEditorExtensionsValue31(entry) &&
    typeof entry.kind == `string` &&
    typeof entry.id == `string`
      ? {
          kind: entry.kind,
          id: entry.id,
        }
      : undefined);
  (resolveEditorExtensionsParent = (
    editorExtensionsParent?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveEditorExtensionsValue31(editorExtensionsParent)
      ? resolveEditorExtensionsValue33(editorExtensionsParent.parent)
      : undefined);
  (EditorExtensionsBlob = {
    blob: `blob`,
    database: `database`,
  });
  (resolveEditorExtensionsSeq = (
    activity?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (
      !resolveEditorExtensionsValue31(activity) ||
      typeof activity.seq != `number` ||
      typeof activity.at != `string`
    )
      return;
    let container: Dynamic = resolveEditorExtensionsKind3(activity.container);
    return {
      seq: activity.seq,
      at: activity.at,
      actor: activity.actor,
      ...(container
        ? {
            container: container,
          }
        : {}),
    };
  });
  (resolveEditorExtensionsCode = (
    editorExtensionsCode?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    for (let resolveEditorExtensionsCodeResult of [`code`, `reason`] as Dynamic) {
      let editorExtensionsCodeItem: Dynamic =
        editorExtensionsCode[resolveEditorExtensionsCodeResult];
      if (
        typeof editorExtensionsCodeItem == `string` &&
        editorExtensionsCodeItem.length > 0 &&
        editorExtensionsCodeItem.length <= 64
      )
        return editorExtensionsCodeItem.toUpperCase();
    }
    return `REJECTED`;
  });
}

export {
  EditorExtensionsFrameSendError,
  EditorExtensionsNORESULTRELAY,
  EditorExtensionsState8,
  EditorExtensionsWITHDRAWN,
  INSTANCE_CHURN,
  RESET_STORM,
  editorExtensionsKindSchema4,
  editorExtensionsPattern12,
  editorExtensionsSet12,
  editorExtensionsSet13,
  editorExtensionsSet14,
  editorExtensionsSet15,
  editorExtensionsSet16,
  editorExtensionsSet17,
  editorExtensionsSet18,
  editorExtensionsSet21,
  editorExtensionsSet22,
  editorExtensionsSet23,
  editorExtensionsValue10000,
  editorExtensionsValue10003,
  editorExtensionsValue1500,
  editorExtensionsValue15002,
  editorExtensionsValue2000,
  editorExtensionsValue20000,
  editorExtensionsValue30000,
  editorExtensionsValue300002,
  editorExtensionsValue60000,
  editorExtensionsValue80002,
  filterEditorExtensionsFilter,
  filterEditorExtensionsGap,
  getEditorExtensionsValue,
  isEditorExtensionsFrom5,
  isEditorExtensionsSeq,
  resolveEditorExtensionsAnchor2,
  resolveEditorExtensionsBlocks,
  resolveEditorExtensionsCode,
  resolveEditorExtensionsEntries,
  resolveEditorExtensionsFrom6,
  resolveEditorExtensionsHelloAnswered2,
  resolveEditorExtensionsKind3,
  resolveEditorExtensionsMessage,
  resolveEditorExtensionsNode2,
  resolveEditorExtensionsParent,
  resolveEditorExtensionsRefusalClass,
  resolveEditorExtensionsSeq,
  resolveEditorExtensionsSess4,
  resolveEditorExtensionsSome3,
  resolveEditorExtensionsTest2,
  resolveEditorExtensionsThrew,
  resolveEditorExtensionsUtterance,
  resolveEditorExtensionsUtterance2,
  resolveEditorExtensionsValue25,
  resolveEditorExtensionsValue27,
  resolveEditorExtensionsValue29,
  resolveEditorExtensionsValue30,
  resolveEditorExtensionsValue31,
  resolveEditorExtensionsValue32,
  resolveEditorExtensionsValue33,
  updateEditorExtensionsByKey,
  updateEditorExtensionsThread,
};
