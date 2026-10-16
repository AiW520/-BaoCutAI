/** BaoCut: document context actions from index-CX4IZqzA.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  Button,
  Counter,
  DataOperationControlMessage,
  DataOperationControlRoomReadDenied,
  EditorExtensionsFrameSendError,
  Tooltip,
  UiOverlaysAndIconsCustomIcon,
  collectDataOperationControlJoin,
  collectPlatformSyncAndRoutingEngine,
  collectPlatformSyncAndRoutingText,
  create,
  dataOperationControlSet,
  getDataOperationControlEntry,
  getDataOperationControlKeys,
  isDataOperationControlLabel,
  isEditorExtensionsRoot,
  isFrameArtifact,
  loadCommentsActionsAndSelectionDialect,
  loadDataOperationControlDialect,
  loadDataOperationControlDoc,
  loadDataOperationControlNode,
  preloadModule,
  resolveDataModelSchemasDoorFactsListenerError,
  resolveDataModelSchemasHighlightColour,
  resolveDataModelSchemasHrefFragment,
  resolveDataModelSchemasMarkIds,
  resolveDataModelSchemasMentionLabel,
  resolveDataModelSchemasPersonLabel,
  resolveDataModelSchemasValue14,
  resolveDataOperationControlEngineBound,
  resolveDataOperationControlPush,
  resolveDataOperationControlSess3,
  resolveDataOperationControlText3,
  resolveDataOperationControlValue34,
  resolveDataOperationControlValue35,
  resolveEditorExtensionsValue22,
  resolveEditorExtensionsValue25,
  resolveObservabilityBrowserAndOperationEventsValue48,
  resolvePlatformApiAndAuthAssistant,
  resolvePlatformSessionAndSourcesBid3,
  resolvePlatformSessionAndSourcesStartsWith,
  resolvePlatformSessionAndSourcesTest12,
  resolvePlatformSyncAndRoutingTab,
  resolvePlatformSyncAndRoutingVerb3,
} from "../dependencies";
import {
  React,
  mapPreloadDependencies,
} from "../bootstrap";
import {
  getDoorDialect,
  setDoorDialect,
} from "../run-review";
import {
  DUPLICATE_LINK_BATCH_SIZE,
  DUPLICATE_SESSION_BATCH_SIZE,
  INLINE_OBJECT_REPLACEMENT,
  MAX_DUPLICATE_DOCUMENT_DEPTH,
  MAX_DUPLICATE_DOCUMENT_SIZE,
  decodeCopyableDocument,
  duplicateDocumentLeafIndex,
  extractDuplicateLinkSpans,
  filePresentationKind,
  removePendingBlocks,
  stripCommentAnchors,
} from "../presence-and-chat";
import type * as ReactComponentTypes from "react";

export const HomeButton: ReactComponentTypes.FC<{ boxed?: boolean }> = ({ boxed: boxed }) => {
  let [, set]: Dynamic = resolveObservabilityBrowserAndOperationEventsValue48();
  return (
    <Tooltip content={`Home`}>
      <button
        type={`button`}
        aria-label={`Home`}
        onClick={(..._extraArguments: unknown[]): Dynamic => set(`/`)}
        className={boxed ? BOXED_HOME_BUTTON_CLASS : HOME_BUTTON_CLASS}
      >
        <UiOverlaysAndIconsCustomIcon
          name={`Home`}
          customSize={15}
          className={`-mt-px`}
        />
      </button>
    </Tooltip>
  );
};

export const TabCaretIcon: ReactComponentTypes.FC<
  Readonly<Record<string, unknown>>
> = () => {
  return (
    <span aria-hidden={`true`} className={`text-muted -mx-0.5 inline-flex shrink-0`}>
      <UiOverlaysAndIconsCustomIcon name={`CaretDown`} size={`xs`} />
    </span>
  );
};

function legacyDocumentLeafIndex(
  legacyDocumentLeafIndex2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let legacyDocumentLeafIndex3: Dynamic = legacyDocumentLeafIndex2;
  let items: Dynamic = [];
  let uniqueItems: Dynamic = new (Set as Dynamic)([`root`]);
  let flatMap: Dynamic = (
    legacyDocumentLeafIndex4?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    legacyDocumentLeafIndex4.flatMap(
      (entry?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        isDuplicateObject(entry) &&
        entry.kind === `block` &&
        typeof entry.id == `string`
          ? [entry.id]
          : [],
    );
  let legacyDocumentLeafIndexHandler = (
    legacyDocumentLeafIndex4?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    for (let legacyDocumentLeafIndexResult of legacyDocumentLeafIndex4 as Dynamic)
      if (!uniqueItems.has(legacyDocumentLeafIndexResult)) {
        uniqueItems.add(legacyDocumentLeafIndexResult);
        isDuplicateObject2(legacyDocumentLeafIndexResult, options);
      }
  };
  let isDuplicateObject2 = (
    bid?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let legacyDocumentLeafIndexItem: Dynamic = legacyDocumentLeafIndex3[bid];
    if (
      options > MAX_DUPLICATE_DOCUMENT_DEPTH ||
      !isDuplicateObject(legacyDocumentLeafIndexItem)
    )
      return;
    let content: Dynamic = Array.isArray(legacyDocumentLeafIndexItem.content)
      ? legacyDocumentLeafIndexItem.content
      : [];
    let flatMap2: Dynamic = flatMap(content);
    if (flatMap2.length > 0) {
      legacyDocumentLeafIndexHandler(flatMap2, options + 1);
      return;
    }
    let words: string = ``;
    for (let entry of content as Dynamic)
      if (isDuplicateObject(entry)) {
        if (entry.kind === `text` && typeof entry.text == `string`) {
          words += entry.text;
        } else {
          if (entry.kind === `atom`) {
            words += INLINE_OBJECT_REPLACEMENT;
          }
        }
      }
    if (Array.from<Dynamic>(words).length > 0) {
      items.push({
        words: words,
        bid: bid,
      });
    }
  };
  let root: Dynamic = legacyDocumentLeafIndex3.root;
  if (isDuplicateObject(root) && Array.isArray(root.content)) {
    legacyDocumentLeafIndexHandler(flatMap(root.content), 1);
  }
  return items;
}

function matchDuplicatedBlockId(
  matchDuplicatedBlockId2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let option: Dynamic = options.find(
    (ask?: Dynamic, ..._extraArguments: unknown[]) =>
      ask.bid === matchDuplicatedBlockId2,
  );
  if (option === undefined) return;
  let filteredOptionIndex: Dynamic = options
    .filter(
      (request?: Dynamic, ..._extraArguments: unknown[]) =>
        request.words === option.words,
    )
    .findIndex(
      (ask?: Dynamic, ..._extraArguments: unknown[]) =>
        ask.bid === matchDuplicatedBlockId2,
    );
  return context.filter(
    (request?: Dynamic, ..._extraArguments: unknown[]) =>
      request.words === option.words,
  )[filteredOptionIndex]?.bid;
}

function rewriteDuplicatedInternalLink(
  rewriteDuplicatedInternalLink2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let ask = resolvePlatformSessionAndSourcesBid3(
    rewriteDuplicatedInternalLink2.slice(1),
  );
  if (ask === null) return rewriteDuplicatedInternalLink2;
  let options2: Dynamic = options(ask.bid);
  let rewriteDuplicatedInternalLinkResult: Dynamic =
    options2 === undefined
      ? null
      : resolvePlatformSessionAndSourcesTest12(options2, ask.hint ?? ``);
  return rewriteDuplicatedInternalLinkResult === null
    ? ask.hint === undefined
      ? null
      : resolvePlatformSessionAndSourcesStartsWith(ask.hint)
    : `#${rewriteDuplicatedInternalLinkResult}`;
}

function countDocumentMarks(
  countDocumentMarks2?: Dynamic,
  ..._extraArguments: unknown[]
): number {
  let count: number = 0;
  let isDuplicateObject2 = (
    node?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      !(options > MAX_DUPLICATE_DOCUMENT_DEPTH || !isDuplicateObject(node)) &&
      (Array.isArray(node.marks) && (count += node.marks.length),
      Array.isArray(node.content))
    )
      for (let countDocumentMarksResult of node.content as Dynamic)
        isDuplicateObject2(countDocumentMarksResult, options + 1);
  };
  for (let countDocumentMarksResult of countDocumentMarks2 as Dynamic)
    isDuplicateObject2(countDocumentMarksResult, 0);
  return count;
}

function rebuildDuplicateLinkMarks(
  rebuildDuplicateLinkMarks2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument: Dynamic = (..._extraArguments: unknown[]): undefined => undefined,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  let from: Dynamic = dependencies?.from ?? 0;
  for (let rebuildDuplicateLinkMarksResult of rebuildDuplicateLinkMarks2 as Dynamic) {
    let contextItem: Dynamic = context[rebuildDuplicateLinkMarksResult.leaf];
    if (
      contextItem === undefined ||
      contextItem.ids === null ||
      contextItem.words !== options[rebuildDuplicateLinkMarksResult.leaf]
    )
      continue;
    let [items2, setItems]: Dynamic = [
      contextItem.ids[rebuildDuplicateLinkMarksResult.u0],
      contextItem.ids[rebuildDuplicateLinkMarksResult.u1],
    ];
    if (items2 === undefined || setItems === undefined) continue;
    let href: Dynamic = rewriteDuplicatedInternalLink(
      rebuildDuplicateLinkMarksResult.mark.href,
      argument,
    );
    if (href !== null) {
      items.push({
        op: `format`,
        target: {
          kind: `chars`,
          range: [items2, setItems],
        },
        add: [
          {
            type: `link`,
            href: href,
          },
        ],
        ...(dependencies
          ? {
              ids: [resolveEditorExtensionsValue22(dependencies.label, from++)],
            }
          : {}),
      });
    }
  }
  return items;
}

async function restoreDuplicateLinks(
  restoreDuplicateLinks2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<undefined> {
  if (context.spans.length !== 0)
    try {
      let restoreDuplicateLinksResult: Dynamic =
        await loadDataOperationControlNode(restoreDuplicateLinks2, options);
      if (!resolveDataOperationControlValue34(restoreDuplicateLinksResult))
        return;
      let duplicateDocumentLeafIndex2: Dynamic = duplicateDocumentLeafIndex(
        restoreDuplicateLinksResult.doc,
      );
      let duplicateSessionIdentity: Dynamic =
        await createDuplicateSessionIdentity(restoreDuplicateLinks2, argument);
      let record: Dynamic =
        duplicateSessionIdentity !== undefined &&
        (duplicateSessionIdentity.markIds ??
          (await resolveDataModelSchemasMarkIds())) &&
        duplicateSessionIdentity
          ? {
              label: duplicateSessionIdentity.label,
              from:
                duplicateSessionIdentity.hwm +
                1 +
                resolveDataOperationControlText3(context.blocks) +
                countDocumentMarks(context.blocks),
            }
          : undefined;
      let rebuildDuplicateLinkMarks2: Dynamic = rebuildDuplicateLinkMarks(
        context.spans,
        context.leaves,
        duplicateDocumentLeafIndex2,
        record,
        (
          restoreDuplicateLinks3?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          dependencies === undefined
            ? undefined
            : matchDuplicatedBlockId(
                restoreDuplicateLinks3,
                dependencies,
                duplicateDocumentLeafIndex2,
              ),
      );
      if (rebuildDuplicateLinkMarks2.length === 0) return;
      let items: Dynamic = [];
      for (
        let count: number = 0;
        count < rebuildDuplicateLinkMarks2.length &&
        items.length < DUPLICATE_SESSION_BATCH_SIZE;
        count += DUPLICATE_LINK_BATCH_SIZE
      )
        items.push(
          collectPlatformSyncAndRoutingEngine({
            ref: {
              object: `node`,
              id: options,
            },
            verb: `update`,
            engine: `prose`,
            payload: {
              engine: `prose`,
              ops: rebuildDuplicateLinkMarks2.slice(
                count,
                count + DUPLICATE_LINK_BATCH_SIZE,
              ),
            },
          }),
        );
      let batch: Dynamic = await restoreDuplicateLinks2.batch(items);
      if (batch.verdict !== `allow`) {
        console.info(
          `[tabDuplicate] the copy's in-page links were not re-laid:`,
          batch.reason,
        );
      }
    } catch (restoreDuplicateLinksResult: Dynamic) {
      console.info(
        `[tabDuplicate] the copy's in-page links were not re-laid:`,
        resolveDataModelSchemasValue14(restoreDuplicateLinksResult),
      );
    }
}

function allocateDuplicateBlockIds(
  allocateDuplicateBlockIds2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let allocateDuplicateBlockIdsHandler = (
    allocateDuplicateBlockIds3?: unknown,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      options2 > MAX_DUPLICATE_DOCUMENT_DEPTH ||
      typeof allocateDuplicateBlockIds3 != `object` ||
      !allocateDuplicateBlockIds3 ||
      Array.isArray(allocateDuplicateBlockIds3)
    )
      return;
    let allocateDuplicateBlockIds4: Dynamic = allocateDuplicateBlockIds3;
    let bid: Dynamic = allocateDuplicateBlockIds4.attrs?.bid;
    if (typeof bid == `string`) {
      uniqueItems.add(bid);
    }
    if (Array.isArray(allocateDuplicateBlockIds4.content))
      for (let allocateDuplicateBlockIdsResult of allocateDuplicateBlockIds4.content as Dynamic)
        allocateDuplicateBlockIdsHandler(
          allocateDuplicateBlockIdsResult,
          options2 + 1,
        );
  };
  allocateDuplicateBlockIdsHandler(allocateDuplicateBlockIds2, 0);
  let uniqueItems2: Dynamic = new (Set as Dynamic)();
  let allocateDuplicateBlockIdsHandler2: Dynamic = (
    allocateDuplicateBlockIds3?: unknown,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (options2 > MAX_DUPLICATE_DOCUMENT_DEPTH)
      throw Error(`This tab's contents are nested too deeply to duplicate.`);
    if (
      typeof allocateDuplicateBlockIds3 != `object` ||
      !allocateDuplicateBlockIds3 ||
      Array.isArray(allocateDuplicateBlockIds3)
    )
      return allocateDuplicateBlockIds3;
    let allocateDuplicateBlockIds4: Dynamic = allocateDuplicateBlockIds3;
    let allocateDuplicateBlockIds5: Dynamic = allocateDuplicateBlockIds4;
    let attrs: Dynamic = allocateDuplicateBlockIds4.attrs;
    let bid: Dynamic = attrs?.bid;
    if (typeof bid == `string`)
      if (!uniqueItems2.has(bid)) uniqueItems2.add(bid);
      else if (
        typeof allocateDuplicateBlockIds4.type == `string` &&
        dataOperationControlSet.has(allocateDuplicateBlockIds4.type)
      ) {
        let bid2: Dynamic =
          options === undefined
            ? collectDataOperationControlJoin(uniqueItems)
            : collectDataOperationControlJoin(uniqueItems, options);
        uniqueItems.add(bid2);
        uniqueItems2.add(bid2);
        allocateDuplicateBlockIds5 = {
          ...allocateDuplicateBlockIds4,
          attrs: {
            ...attrs,
            bid: bid2,
          },
        };
      } else {
        let { bid: attrs2, ...attrs3 }: Dynamic = attrs;
        allocateDuplicateBlockIds5 = {
          ...allocateDuplicateBlockIds4,
          attrs: attrs3,
        };
      }
    if (Array.isArray(allocateDuplicateBlockIds4.content)) {
      let content: Dynamic = allocateDuplicateBlockIds4.content.map(
        (content2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          allocateDuplicateBlockIdsHandler2(content2, options2 + 1),
      );
      if (
        content.some(
          (item?: Dynamic, index?: Dynamic, ..._extraArguments: unknown[]) =>
            item !== allocateDuplicateBlockIds4.content[index],
        )
      ) {
        allocateDuplicateBlockIds5 = {
          ...allocateDuplicateBlockIds5,
          content: content,
        };
      }
    }
    return allocateDuplicateBlockIds5;
  };
  return allocateDuplicateBlockIdsHandler2(allocateDuplicateBlockIds2, 0);
}

var MAX_DUPLICATE_NAME_LENGTH: number;

function duplicateDocumentName(
  duplicateDocumentName2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let trimmedReplace: Dynamic = duplicateDocumentName2
    .replace(/[/\p{Cc}\p{Cf}\p{Zl}\p{Zp}]+/gu, ` `)
    .replace(/\s+/g, ` `)
    .trim();
  let trimmedReplaceSlice: Dynamic = Array.from<Dynamic>(trimmedReplace).slice(
    0,
    MAX_DUPLICATE_NAME_LENGTH,
  );
  for (; trimmedReplaceSlice.join(``).length > MAX_DUPLICATE_NAME_LENGTH; )
    trimmedReplaceSlice.pop();
  let trimmedTrimmedReplaceSliceText: Dynamic = trimmedReplaceSlice
    .join(``)
    .trim();
  return trimmedTrimmedReplaceSliceText.length > 0
    ? trimmedTrimmedReplaceSliceText
    : `Untitled` + DataOperationControlMessage;
}

var DuplicateUnsupported: Dynamic;

var DuplicateStructureInvalid: Dynamic;

var DuplicateTooLarge: Dynamic;

async function readDuplicateSourceFile(
  duplicateSourceFile?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  try {
    return await duplicateSourceFile.read(
      {
        object: `file`,
        id: options,
      },
      `json`,
    );
  } catch (readDuplicateSourceFileResult: Dynamic) {
    if (
      readDuplicateSourceFileResult instanceof
        (DataOperationControlRoomReadDenied as Dynamic) &&
      resolveDataOperationControlEngineBound(
        readDuplicateSourceFileResult.reason,
      )
    )
      return await duplicateSourceFile.read(
        {
          object: `file`,
          id: options,
        },
        `text`,
      );
    throw readDuplicateSourceFileResult;
  }
}

function readDuplicateSessionIdentity(
  duplicateSessionIdentity?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!(options === undefined && !isFrameArtifact()))
    try {
      let lookupEntry: Dynamic = isDataOperationControlLabel(
        options ?? sessionStorage,
        duplicateSessionIdentity,
      ).get();
      return lookupEntry !== null &&
        lookupEntry.secret === `` &&
        lookupEntry.label !== ``
        ? {
            label: lookupEntry.label,
            hwm: Number.isInteger(lookupEntry.hwm) ? lookupEntry.hwm : -1,
          }
        : undefined;
    } catch {
      return;
    }
}

var isDuplicateObject: Dynamic;

var truthyCapability: Dynamic;

async function createDuplicateSessionIdentity(
  duplicateSessionIdentity?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let duplicateSessionIdentity2: Dynamic = readDuplicateSessionIdentity(
    duplicateSessionIdentity.container.id,
    options,
  );
  let response: Dynamic;
  try {
    response = await duplicateSessionIdentity.send({
      verb: `create`,
      object: `session`,
    });
  } catch {
    response = null;
  }
  if (response?.verdict !== `allow`) return duplicateSessionIdentity2;
  let data: Dynamic = isDuplicateObject(response.data) ? response.data : {};
  let caps: Dynamic = isDuplicateObject(data.caps) ? data.caps : undefined;
  if (caps) {
    resolveDataModelSchemasDoorFactsListenerError(caps);
  }
  let label: Dynamic = typeof response.sess == `string` ? response.sess : ``;
  let matchesSessSecret =
    response.sessSecret === undefined || response.sessSecret === ``;
  if (label === `` || !matchesSessSecret) return duplicateSessionIdentity2;
  let next: Dynamic =
    typeof data.next == `number` &&
    Number.isInteger(data.next) &&
    data.next >= 0
      ? data.next
      : 0;
  return {
    label: label,
    hwm: Math.max(
      next - 1,
      duplicateSessionIdentity2 !== undefined &&
        duplicateSessionIdentity2.label === label
        ? duplicateSessionIdentity2.hwm
        : -1,
    ),
    ...(caps
      ? {
          markIds: truthyCapability(caps.markIds),
        }
      : {}),
  };
}

function createDuplicatedDocument(
  duplicatedDocument?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let options2: Dynamic = async (
    duplicatedDocument2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<Dynamic> => {
    let createDuplicatedDocumentHandler: Dynamic = async (
      ..._extraArguments: unknown[]
    ) => ({
      mentionLabel: await resolveDataModelSchemasMentionLabel(),
      personLabel: await resolveDataModelSchemasPersonLabel(),
      highlightColour: await resolveDataModelSchemasHighlightColour(),
    });
    let duplicatedDocumentHandler: Dynamic =
      await createDuplicatedDocumentHandler();
    let blocks: Dynamic = duplicatedDocument2(duplicatedDocumentHandler);
    if (resolveDataOperationControlPush(blocks).length < 2)
      return {
        blocks: blocks,
      };
    let duplicateSessionIdentity: Dynamic =
      await createDuplicateSessionIdentity(duplicatedDocument, context);
    if (duplicateSessionIdentity === undefined)
      return {
        blocks: blocks,
      };
    let duplicatedDocumentHandler2: Dynamic =
      await createDuplicatedDocumentHandler();
    return {
      blocks:
        (!duplicatedDocumentHandler.mentionLabel &&
          duplicatedDocumentHandler2.mentionLabel) ||
        (!duplicatedDocumentHandler.personLabel &&
          duplicatedDocumentHandler2.personLabel) ||
        (!duplicatedDocumentHandler.highlightColour &&
          duplicatedDocumentHandler2.highlightColour)
          ? duplicatedDocument2(duplicatedDocumentHandler2)
          : blocks,
      sess: duplicateSessionIdentity.label,
      sessHwm: duplicateSessionIdentity.hwm,
      markIds:
        duplicateSessionIdentity.markIds ??
        (await resolveDataModelSchemasMarkIds()),
    };
  };
  let createDuplicateSessionIdentity2: Dynamic = async (
    blocks?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<Dynamic> => {
    let extractDuplicateLinkSpans2: Dynamic = extractDuplicateLinkSpans(blocks);
    return extractDuplicateLinkSpans2.spans.length === 0 ||
      (await resolveDataModelSchemasHrefFragment())
      ? extractDuplicateLinkSpans2
      : (await createDuplicateSessionIdentity(duplicatedDocument, context),
        (await resolveDataModelSchemasHrefFragment())
          ? extractDuplicateLinkSpans2
          : {
              blocks: blocks,
              spans: [],
              leaves: [],
            });
  };
  return async (
    duplicatedDocument2?: Dynamic,
    options3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<Dynamic> => {
    let options4: Dynamic = await options2(duplicatedDocument2);
    let duplicateSessionIdentity: Dynamic =
      await createDuplicateSessionIdentity2(options4.blocks);
    let { fileId: fileId, nodeId: createDuplicatedDocumentResult }: Dynamic =
      await loadDataOperationControlDialect(duplicatedDocument, {
        ...options,
        ...options4,
        blocks: duplicateSessionIdentity.blocks,
        dialect: `final`,
      });
    await restoreDuplicateLinks(
      duplicatedDocument,
      createDuplicatedDocumentResult,
      duplicateSessionIdentity,
      duplicateSessionIdentity.spans.length > 0 ? options3() : undefined,
      context,
    );
    return {
      fileId: fileId,
    };
  };
}

function prepareVersionDuplicate(
  prepareVersionDuplicate2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let prepareVersionDuplicateResult: Dynamic = resolveEditorExtensionsValue25(
    prepareVersionDuplicate2,
  );
  if (
    !prepareVersionDuplicateResult.complete ||
    prepareVersionDuplicateResult.capped !== undefined
  )
    throw new (DuplicateTooLarge as Dynamic)();
  return {
    spell: (
      prepareVersionDuplicate3?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let mappedRemovePendingBlocks: Dynamic = removePendingBlocks(
        prepareVersionDuplicateResult.docJson.content ?? [],
      ).map(
        (
          removePendingBlock?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          collectPlatformSyncAndRoutingText(
            removePendingBlock,
            prepareVersionDuplicate3,
          ),
      );
      if (!resolveDataOperationControlValue35(mappedRemovePendingBlocks))
        throw new (DuplicateTooLarge as Dynamic)();
      return mappedRemovePendingBlocks;
    },
    source: (..._extraArguments: unknown[]): Dynamic =>
      duplicateDocumentLeafIndex(prepareVersionDuplicate2),
  };
}

async function duplicateDocumentTab(
  duplicateDocumentTab2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let placement: Dynamic = getDataOperationControlEntry(options, context);
  if (placement === null) throw Error(`This tab no longer exists.`);
  let duplicateSourceFile: Dynamic = await readDuplicateSourceFile(
    duplicateDocumentTab2,
    context,
  );
  if (filePresentationKind(duplicateSourceFile) !== `doc`)
    throw new (DuplicateUnsupported as Dynamic)();
  let id2: Dynamic = duplicateSourceFile.content.id;
  let duplicateDocumentTabResult: Dynamic = await loadDataOperationControlNode(
    duplicateDocumentTab2,
    id2,
  );
  let record: Dynamic = {
    birthName: duplicateDocumentName(placement.name) + `.ldoc`,
    placement: placement,
  };
  let duplicatedDocument: Dynamic = createDuplicatedDocument(
    duplicateDocumentTab2,
    record,
    argument,
  );
  let duplicatedDocument2: Dynamic = async (
    duplicateDocumentTab3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<Dynamic> =>
    duplicatedDocument(
      (
        duplicateDocumentTab4?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        decodeCopyableDocument(duplicateDocumentTab3, duplicateDocumentTab4),
      (..._extraArguments: unknown[]): Dynamic =>
        legacyDocumentLeafIndex(duplicateDocumentTab3),
    );
  if (isEditorExtensionsRoot(duplicateDocumentTabResult.doc)) {
    let { fileId: fileId2 }: Dynamic = await duplicatedDocument2(
      duplicateDocumentTabResult.doc,
    );
    return {
      fileId: fileId2,
    };
  }
  if (resolveDataOperationControlValue34(duplicateDocumentTabResult)) {
    let result: Dynamic = await loadDataOperationControlDoc(
      duplicateDocumentTab2,
      id2,
    ).catch((error?: Dynamic, ..._extraArguments: unknown[]) => {
      if (
        (error instanceof (DataOperationControlRoomReadDenied as Dynamic) &&
          error.reason === `unavailable`) ||
        (error instanceof (EditorExtensionsFrameSendError as Dynamic) &&
          error.code === `NO_RESULT_RELAY`) ||
        (error instanceof Error && /not a block map/.test(error.message))
      )
        return null;
      throw error;
    });
    if (result !== null) {
      if (!result.complete) throw new (DuplicateTooLarge as Dynamic)();
      let { fileId: fileId2 }: Dynamic = await duplicatedDocument2(result.doc);
      return {
        fileId: fileId2,
      };
    }
    if (duplicateDocumentTabResult.complete === false)
      throw new (DuplicateTooLarge as Dynamic)();
    let prepareVersionDuplicate2: Dynamic = prepareVersionDuplicate(
      duplicateDocumentTabResult.doc,
    );
    return duplicatedDocument(
      prepareVersionDuplicate2.spell,
      prepareVersionDuplicate2.source,
    );
  }
  let doc: Dynamic = allocateDuplicateBlockIds(
    stripCommentAnchors(duplicateDocumentTabResult.doc),
    dependencies,
  );
  let { validateStructuralPM: duplicateDocumentTabResult2 }: Dynamic =
    await preloadModule(
      async (..._extraArguments: unknown[]): Promise<Dynamic> => {
        let { validateStructuralPM: validateStructuralPM }: Dynamic =
          await import("../../prose-editor/schema").then(
            (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              result.structuralPMValidationModule,
          );
        return {
          validateStructuralPM: validateStructuralPM,
        };
      },
      mapPreloadDependencies([20, 1, 0, 2, 3, 8]),
      import.meta.url,
    );
  if (!duplicateDocumentTabResult2(doc, `doc`).ok)
    throw new (DuplicateStructureInvalid as Dynamic)();
  if (JSON.stringify(doc).length > MAX_DUPLICATE_DOCUMENT_SIZE)
    throw new (DuplicateTooLarge as Dynamic)();
  let { fileId: fileId }: Dynamic = await loadDataOperationControlDialect(
    duplicateDocumentTab2,
    {
      ...record,
      doc: doc,
    },
  );
  return {
    fileId: fileId,
  };
}

var versionDuplicateName: (versionDuplicateName2?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => string;

async function duplicateVersionTab(
  duplicateVersionTab2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let duplicateVersionTabResult: Dynamic = getDataOperationControlEntry(
    options,
    context,
  );
  if (duplicateVersionTabResult === null)
    throw Error(`This tab no longer exists.`);
  let name = versionDuplicateName(
    options.get(context)?.name ?? `Untitled`,
    dependencies.when,
  );
  if (
    filePresentationKind(
      await readDuplicateSourceFile(duplicateVersionTab2, context),
    ) !== `doc`
  )
    throw new (DuplicateUnsupported as Dynamic)();
  let prepareVersionDuplicate2: Dynamic = prepareVersionDuplicate(
    dependencies.xml,
  );
  return createDuplicatedDocument(
    duplicateVersionTab2,
    {
      birthName: duplicateDocumentName(name) + `.ldoc`,
      placement: {
        ...duplicateVersionTabResult,
        name: name,
      },
    },
    argument,
  )(prepareVersionDuplicate2.spell, prepareVersionDuplicate2.source);
}

var tabNavigationWaiters: Dynamic;

var pendingTabNavigationRequests: Dynamic;

function registerTabNavigationWaiter(
  registerTabNavigationWaiter2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return pendingTabNavigationRequests.delete(registerTabNavigationWaiter2)
    ? (options(),
      (..._extraArguments: unknown[]): undefined =>
        void pendingTabNavigationRequests.delete(registerTabNavigationWaiter2))
    : (tabNavigationWaiters.set(registerTabNavigationWaiter2, options),
      (..._extraArguments: unknown[]): undefined => {
        if (
          tabNavigationWaiters.get(registerTabNavigationWaiter2) === options
        ) {
          tabNavigationWaiters.delete(registerTabNavigationWaiter2);
        }
        pendingTabNavigationRequests.delete(registerTabNavigationWaiter2);
      });
}

function resolveTabNavigation(
  tabNavigation?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let tabNavigationWaiterEntry: Dynamic =
    tabNavigationWaiters.get(tabNavigation);
  return tabNavigationWaiterEntry === undefined
    ? (pendingTabNavigationRequests.add(tabNavigation), false)
    : (tabNavigationWaiters.delete(tabNavigation),
      pendingTabNavigationRequests.delete(tabNavigation),
      tabNavigationWaiterEntry());
}

function cancelTabNavigation(
  celTabNavigation?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return pendingTabNavigationRequests.delete(celTabNavigation);
}

var tabRenameHandlers: Dynamic;

var pendingTabRenameRequests: Dynamic;

function registerTabRename(
  registerTabRename2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (pendingTabRenameRequests.delete(registerTabRename2)) {
    options();
  }
  tabRenameHandlers.set(registerTabRename2, options);
  return (..._extraArguments: unknown[]): undefined => {
    if (tabRenameHandlers.get(registerTabRename2) === options) {
      tabRenameHandlers.delete(registerTabRename2);
    }
    pendingTabRenameRequests.delete(registerTabRename2);
    if (activeTabRename === registerTabRename2) {
      activeTabRename = null;
    }
  };
}

function requestTabRename(
  requestTabRename2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let tabRenameHandlerEntry: Dynamic = tabRenameHandlers.get(requestTabRename2);
  return tabRenameHandlerEntry === undefined
    ? (pendingTabRenameRequests.add(requestTabRename2), false)
    : tabRenameHandlerEntry();
}

function cancelTabRename(
  celTabRename?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return pendingTabRenameRequests.delete(celTabRename);
}

function clearPendingTabRename(
  clearPendingTabRename2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  pendingTabRenameRequests.delete(clearPendingTabRename2);
}

var activeTabRename: Dynamic;

function markActiveTabRename(
  markActiveTabRename2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  activeTabRename = markActiveTabRename2;
}

function clearActiveTabRename(..._extraArguments: unknown[]): undefined {
  activeTabRename = null;
}

function releaseActiveTabRename(
  releaseActiveTabRename2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let matchesActiveTabRename: Dynamic =
    activeTabRename !== null &&
    activeTabRename.startsWith(releaseActiveTabRename2);
  activeTabRename = null;
  return matchesActiveTabRename;
}

var HOME_BUTTON_CLASS: string;

var BOXED_HOME_BUTTON_CLASS: string;

function joinClasses(...joinClasses2: Dynamic[]) {
  return joinClasses2.filter(Boolean).join(` `);
}

var tabRailContext: Dynamic;

var tabRailDisabledContext: Dynamic;

function tabActionTooltip(
  tabAction?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return tabAction.disabled
    ? {
        content: tabAction.disabledTip ?? tabAction.tip ?? tabAction.label,
        shortcut: undefined,
      }
    : {
        content: tabAction.tip ?? tabAction.label,
        shortcut: tabAction.shortcut,
      };
}

function disabledTabActionAccessibility(
  disabledTabActionAccessibility2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let controlId: Dynamic = (0, React.useId)();
  if (!disabledTabActionAccessibility2.disabled)
    return {
      props: {},
      inner: {},
      mirror: null,
    };
  let enabled =
    !!disabledTabActionAccessibility2.reason &&
    disabledTabActionAccessibility2.reason !==
      disabledTabActionAccessibility2.name;
  return {
    props: {
      role: `button`,
      "aria-disabled": true,
      "aria-label": disabledTabActionAccessibility2.name,
      "aria-describedby": enabled ? controlId : undefined,
      "aria-pressed": disabledTabActionAccessibility2.pressed,
      "aria-expanded": disabledTabActionAccessibility2.expanded,
      "aria-haspopup": disabledTabActionAccessibility2.hasPopup,
    },
    inner: {
      "aria-hidden": true,
    },
    mirror: enabled ? (
      <span hidden={true} id={controlId}>
        {disabledTabActionAccessibility2.reason}
      </span>
    ) : null,
  };
}

var TabRailButton: Dynamic;

function findTabTreeNode(
  findTabTreeNode2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  for (let node of findTabTreeNode2 as Dynamic) {
    if (node.id === options) return node;
    let findTabTreeNode3: Dynamic = findTabTreeNode(node.children, options);
    if (findTabTreeNode3 !== undefined) return findTabTreeNode3;
  }
}

var createDocumentFile: Dynamic;

async function createTab(
  tab?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let name = resolvePlatformSyncAndRoutingTab(options, dependencies);
  let placement: Dynamic = {
    name: name,
    order: getDataOperationControlKeys(options, dependencies),
  };
  if (dependencies !== undefined) {
    placement.subtabOf = dependencies;
  }
  let { fileId: fileId }: Dynamic = await (context === `sheet`
    ? loadCommentsActionsAndSelectionDialect(tab, {
        birthName: name + `.xlsx`,
        placement: placement,
        peekDialect: getDoorDialect,
        learn: setDoorDialect,
      })
    : loadDataOperationControlDialect(tab, {
        birthName: name + `.ldoc`,
        placement: placement,
        peekDialect: getDoorDialect,
        learn: setDoorDialect,
      }));
  return {
    fileId: fileId,
    entry: placement,
  };
}

var spreadsheetTabsEnabled: boolean;

var canCreateSpreadsheetTabs: Dynamic;

var isSpreadsheetTab: (element?: Dynamic, ..._extraArguments: unknown[]) => boolean;

var DISABLED_TAB_CLASS: string;

var IN_THIS_TAB_LABEL: string;

var TAB_DRAG_MIME_TYPE: string;

var tabDropPosition: (event?: Dynamic, ..._extraArguments: unknown[]) => "after" | "before" | "into";

var isTabDropBelowLabel: Dynamic;

var tabSubtreeIds: Dynamic;

var TAB_OUTLINE_REFRESH_MS: number;

function hasTabMenuFocusTargets(
  tabMenuFocusTargets?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (tabMenuFocusTargets === null) return false;
  for (let hasTabMenuFocusTargetsResult of tabMenuFocusTargets.querySelectorAll(
    `[role="treeitem"], button:enabled, [role="switch"]`,
  ) as Dynamic) {
    let closest: Dynamic = hasTabMenuFocusTargetsResult.closest(`.hidden`);
    if (closest === null || !tabMenuFocusTargets.contains(closest)) return true;
  }
  return false;
}

function canRestoreTabMenuFocus(
  element?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return element === null ||
    element === element.ownerDocument.body ||
    !element.isConnected ||
    element.hasAttribute(`data-base-ui-focus-guard`) ||
    (options !== null && options.contains(element))
    ? true
    : element === context;
}

function isRealTabFile(
  realTabFile?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let isRealTabFileResult: Dynamic =
    resolveDataOperationControlSess3(realTabFile);
  return (
    isRealTabFileResult !== undefined &&
    resolvePlatformApiAndAuthAssistant(isRealTabFileResult)
  );
}

var AGENT_ADDED_TAB_TOAST_ID: string;

var TABS_MOVED_TO_PAGE_MESSAGE: string;

function addedTabs(
  addedTabs2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  for (let [addedTabsResult, addedTabsResult2] of options as Dynamic)
    if (!addedTabs2.has(addedTabsResult)) {
      items.push({
        id: addedTabsResult,
        name: addedTabsResult2.name,
      });
    }
  return items;
}

// BaoCut: 智能体新加标签页的提示称「the agent」，不称 Claude。
function agentAddedTabsMessage(items?: Dynamic, ..._extraArguments: unknown[]) {
  if (items.length > 1) return `The agent added ${items.length} tabs`;
  let name: Dynamic = items[0]?.name;
  return name
    ? `The agent added a tab: “${name.length > 60 ? `${name.slice(0, 59)}…` : name}”`
    : `The agent added a tab`;
}

var tabIdentityKey: Dynamic;

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeDocumentContextActionsDuplicateDocumentTabStep1(): void {
  (MAX_DUPLICATE_NAME_LENGTH = 200);
  (DuplicateUnsupported = class extends Error {
    [key: string]: Dynamic;
    constructor(..._extraArguments: unknown[]) {
      super(`This kind of tab can't be duplicated yet.`);
      this.name = `DuplicateUnsupported`;
    }
  });
  (DuplicateStructureInvalid = class extends Error {
    [key: string]: Dynamic;
    constructor(..._extraArguments: unknown[]) {
      super(
        `This document can't be duplicated — its content isn't in a copyable shape.`,
      );
      this.name = `DuplicateStructureInvalid`;
    }
  });
  (DuplicateTooLarge = class extends Error {
    [key: string]: Dynamic;
    constructor(..._extraArguments: unknown[]) {
      super(`This document is too large to duplicate.`);
      this.name = `DuplicateTooLarge`;
    }
  });
  (isDuplicateObject = (
    duplicateObject?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof duplicateObject == `object` &&
    !!duplicateObject &&
    !Array.isArray(duplicateObject));
  (truthyCapability = (
    truthyCapability2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    truthyCapability2 === true ||
    truthyCapability2 === 1 ||
    truthyCapability2 === `1`);
  (versionDuplicateName = (
    versionDuplicateName2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `${versionDuplicateName2} (version of ${options})`);
  (tabNavigationWaiters = new (Map as Dynamic)());
  (pendingTabNavigationRequests = new (Set as Dynamic)());
  (tabRenameHandlers = new (Map as Dynamic)());
  (pendingTabRenameRequests = new (Set as Dynamic)());
  (activeTabRename = null);
  create(
    (callback?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
      isOpen: false,
      open: (..._extraArguments: unknown[]): Dynamic =>
        callback({
          isOpen: true,
        }),
      close: (..._extraArguments: unknown[]): Dynamic =>
        callback({
          isOpen: false,
        }),
    }),
  );
  (HOME_BUTTON_CLASS = `text-secondary hover:bg-alpha-1 hover:text-primary flex size-7 shrink-0 items-center justify-center rounded-md transition-colors`);
  (BOXED_HOME_BUTTON_CLASS = `text-primary hover:bg-alpha-1 flex size-7 shrink-0 items-center justify-center rounded-md transition-colors`);
  (tabRailContext = (0, React.createContext)(false));
  (tabRailDisabledContext = (0, React.createContext)(false));
  (TabRailButton = (0, React.forwardRef)(function (
    {
      icon: icon,
      glyph: glyph,
      label: label,
      tip: tip,
      disabledTip: disabledTip,
      shortcut: shortcut,
      children: children,
      pressed: pressed,
      expanded: expanded,
      count: count,
      iconOnly: iconOnly,
      caret: caret,
      tipSide = `bottom`,
      className: className,
      variant = `ghost`,
      "aria-expanded": ariaExpanded,
      ...tabRailButton
    }: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) {
    let useContext: Dynamic = (0, React.useContext)(tabRailContext);
    let disabled = tabRailButton.disabled === true;
    let name: Dynamic = count ? label + ` (` + String(count) + `)` : label;
    let icon2: Dynamic = icon ?? glyph;
    let tabActionTooltip2: Dynamic = tabActionTooltip({
      label: label,
      tip: tip,
      disabledTip: disabledTip,
      shortcut: shortcut,
      disabled: disabled,
    });
    let disabledTabActionAccessibility2: Dynamic = disabledTabActionAccessibility(
      {
        disabled: disabled,
        name: name,
        reason: disabledTip ?? tip,
        pressed: pressed,
        expanded: expanded ?? ariaExpanded,
        hasPopup: tabRailButton[`aria-haspopup`],
      },
    );
    let record: Dynamic = {
      ...tabRailButton,
      ref: options,
      variant: variant,
      pressed: pressed,
      "aria-expanded": expanded ?? ariaExpanded,
      "aria-label": name,
      ...disabledTabActionAccessibility2.inner,
    };
    let useContext2: Dynamic =
      (useContext || iconOnly === true) && caret !== true;
    return (
      <Tooltip
        content={tabActionTooltip2.content}
        shortcut={tabActionTooltip2.shortcut}
        side={tipSide}
        hoverable={false}
      >
      <span
        tabIndex={disabled ? 0 : -1}
        {...disabledTabActionAccessibility2.props}
        data-tb-icon={useContext2 ? `` : undefined}
        className={joinClasses(`relative inline-flex shrink-0 rounded align-top outline-none focus-visible:shadow-focus`, className)}
      >{useContext || iconOnly === true ? caret === true ? <Button {...record} icon={icon2}>{<TabCaretIcon />}</Button> : <Button {...record} iconOnly={true} icon={icon2} tooltip={false} /> : <Button {...record} icon={icon2}>{label}{children}{caret === true ? <TabCaretIcon /> : null}</Button>}{count ? <span aria-hidden={`true`} className={`pointer-events-none absolute -top-0.5 -right-0.5 flex`}>
                <Counter value={count} variant={`accent`} size={`xs`} />
              </span> : null}{disabledTabActionAccessibility2.mirror}</span>
    </Tooltip>
    );
  }));
  (createDocumentFile = resolvePlatformSyncAndRoutingVerb3);
  (spreadsheetTabsEnabled = false);
  (canCreateSpreadsheetTabs = (
    createSpreadsheetTabs: Dynamic = spreadsheetTabsEnabled,
    ..._extraArguments: unknown[]
  ): Dynamic => createSpreadsheetTabs && !isFrameArtifact());
  (isSpreadsheetTab = (element?: Dynamic, ..._extraArguments: unknown[]) =>
    element?.getAttribute(`data-presentation`) === `sheet`);
  (DISABLED_TAB_CLASS = `aria-disabled:opacity-disabled aria-disabled:pointer-events-none`);
  (IN_THIS_TAB_LABEL = `In this tab: `);
  (TAB_DRAG_MIME_TYPE = `application/x-bongo-v3-tab`);
  (tabDropPosition = (event?: Dynamic, ..._extraArguments: unknown[]) => {
    let currentTargetBounds: Dynamic =
      event.currentTarget.getBoundingClientRect();
    let difference: number = event.clientY - currentTargetBounds.top;
    return difference < currentTargetBounds.height * 0.25
      ? `before`
      : difference > currentTargetBounds.height * 0.75
        ? `after`
        : `into`;
  });
  (isTabDropBelowLabel = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let firstElementChild: Dynamic = event.currentTarget.firstElementChild;
    return (
      firstElementChild === null ||
      event.clientY >= firstElementChild.getBoundingClientRect().bottom
    );
  });
  (tabSubtreeIds = (
    tabSubtreeIds2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let uniqueItems: Dynamic = new (Set as Dynamic)();
    let tabSubtreeIdsHandler = (
      node?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      uniqueItems.add(node.id);
      for (let tabSubtreeIdsResult of node.children as Dynamic)
        tabSubtreeIdsHandler(tabSubtreeIdsResult);
    };
    tabSubtreeIdsHandler(tabSubtreeIds2);
    return uniqueItems;
  });
  (TAB_OUTLINE_REFRESH_MS = 1e3);
  (AGENT_ADDED_TAB_TOAST_ID = `agent-added-tab`);
  (TABS_MOVED_TO_PAGE_MESSAGE = `Tabs now show on the page, in the Tabs landmark.`);
  (tabIdentityKey = (
    tabIdentityKey2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => tabIdentityKey2 ?? ``);
}

export { AGENT_ADDED_TAB_TOAST_ID, BOXED_HOME_BUTTON_CLASS, DISABLED_TAB_CLASS, DuplicateStructureInvalid, DuplicateTooLarge, DuplicateUnsupported, IN_THIS_TAB_LABEL, TABS_MOVED_TO_PAGE_MESSAGE, TAB_DRAG_MIME_TYPE, TAB_OUTLINE_REFRESH_MS, TabRailButton, addedTabs, agentAddedTabsMessage, canCreateSpreadsheetTabs, canRestoreTabMenuFocus, cancelTabNavigation, cancelTabRename, clearActiveTabRename, clearPendingTabRename, createDocumentFile, createTab, disabledTabActionAccessibility, duplicateDocumentTab, duplicateVersionTab, findTabTreeNode, hasTabMenuFocusTargets, isDuplicateObject, isRealTabFile, isSpreadsheetTab, isTabDropBelowLabel, joinClasses, markActiveTabRename, readDuplicateSourceFile, registerTabNavigationWaiter, registerTabRename, releaseActiveTabRename, requestTabRename, resolveTabNavigation, tabActionTooltip, tabDropPosition, tabIdentityKey, tabRailContext, tabRailDisabledContext, tabSubtreeIds };
