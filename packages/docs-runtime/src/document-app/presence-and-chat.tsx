/** BaoCut: presence and chat from index-CX4IZqzA.js. */
import type { Dynamic } from "../interop/legacy-dynamic";
import {
  EditorExtensionsProseBlockMapUnreadable,
  Tooltip,
  createStore,
  filterEditorExtensionsMap,
  originalJsxProps,
  originalJsxsProps,
  preloadModule,
  resolveDataOperationControlValue35,
  resolveDataOperationControlValue8,
  resolveDataOperationEngineLdoc,
  resolveEditorExtensionsSess,
  resolveEditorExtensionsTest,
  resolveEditorExtensionsValue22,
  resolveEditorExtensionsValue25,
  resolvePlatformChunkLoadingLazy,
  resolvePlatformSessionAndSourcesTest9,
  useStore,
} from "./dependencies";
import {
  React,
  mapPreloadDependencies,
} from "./bootstrap";
import {
  RouteErrorBoundary,
} from "./connection-and-errors/connector-permission-dialog";
import {
  EMPTY_TABS_OUTLINE_STATE,
  countTabTree,
  getSelectedHeading,
  getTabOutline,
  isTabsLocationFeatureEnabled,
  reduceTabsOutline,
  shouldReadTabsOutline,
} from "./document-chrome";
import {
  DuplicateStructureInvalid,
  DuplicateTooLarge,
  isDuplicateObject,
} from "./document-context-actions/duplicate-document-tab";

var ONE_TAB_OUTLINE_HOLD_MS: number;

var ONE_TAB_OUTLINE_SILENCE_MS: number;

var EMPTY_ONE_TAB_LIST_STATE: {
    tab: undefined;
    offered: null;
    holding: boolean;
    silentOver: boolean;
};

function reduceOneTabListState(
  reduceOneTabListState2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  switch (options.type) {
    case `tab`:
      return options.fileId === reduceOneTabListState2.tab
        ? reduceOneTabListState2
        : {
            ...EMPTY_ONE_TAB_LIST_STATE,
            tab: options.fileId,
          };
    case `said`: {
      if (options.fileId !== reduceOneTabListState2.tab)
        return reduceOneTabListState2;
      let offered: Dynamic = resolveDataOperationControlValue8(options.outline);
      return offered === reduceOneTabListState2.offered ||
        (!offered && !options.shown)
        ? reduceOneTabListState2
        : {
            ...reduceOneTabListState2,
            offered: offered,
            holding:
              !offered &&
              (reduceOneTabListState2.offered === true ||
                reduceOneTabListState2.holding),
          };
    }
    case `holdOver`:
      return reduceOneTabListState2.holding
        ? {
            ...reduceOneTabListState2,
            holding: false,
          }
        : reduceOneTabListState2;
    case `silentOver`:
      return reduceOneTabListState2.offered === null &&
        !reduceOneTabListState2.silentOver
        ? {
            ...reduceOneTabListState2,
            silentOver: true,
          }
        : reduceOneTabListState2;
  }
}

function shouldDrawOneTabList(
  shouldDrawOneTabList2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return options.wanted
    ? shouldDrawOneTabList2.offered === null
      ? options.drew && !shouldDrawOneTabList2.silentOver
      : shouldDrawOneTabList2.offered || shouldDrawOneTabList2.holding
    : false;
}

function oneTabListReadTarget(
  oneTabListReadTarget2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return oneTabListReadTarget2.tab === undefined ||
    oneTabListReadTarget2.offered === null
    ? oneTabListReadTarget2.silentOver
      ? null
      : undefined
    : oneTabListReadTarget2.offered
      ? oneTabListReadTarget2.tab
      : oneTabListReadTarget2.holding
        ? undefined
        : null;
}

function tabsOutlineReadPlan(
  tabsOutlineReadPlan2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let wanted: Dynamic =
    tabsOutlineReadPlan2.version === undefined &&
    shouldReadTabsOutline({
      on: tabsOutlineReadPlan2.on,
      frame: tabsOutlineReadPlan2.frame,
      seat: tabsOutlineReadPlan2.seat,
      place: tabsOutlineReadPlan2.place,
      menuOpen: tabsOutlineReadPlan2.menuOpen,
    });
  let tab: Dynamic = wanted ? tabsOutlineReadPlan2.seat?.activeId : undefined;
  let wanted2: Dynamic =
    wanted &&
    tabsOutlineReadPlan2.place === `left` &&
    tabsOutlineReadPlan2.seat !== null &&
    countTabTree(tabsOutlineReadPlan2.seat.roots) === 1;
  let matchesTab =
    tabsOutlineReadPlan2.oneTabList.tab === tab && tab !== undefined;
  return {
    wanted: wanted,
    tab: tab,
    outlined:
      wanted2 &&
      matchesTab &&
      (shouldDrawOneTabList(tabsOutlineReadPlan2.oneTabList, {
        wanted: wanted,
        drew: tabsOutlineReadPlan2.drew === tab,
      }) ||
        tabsOutlineReadPlan2.renaming === true),
    remember:
      wanted2 && matchesTab
        ? oneTabListReadTarget(tabsOutlineReadPlan2.oneTabList)
        : undefined,
    silent:
      wanted2 &&
      matchesTab &&
      tabsOutlineReadPlan2.shown &&
      tabsOutlineReadPlan2.oneTabList.offered === null &&
      !tabsOutlineReadPlan2.oneTabList.silentOver,
  };
}

function createTabsOutlineStore(..._extraArguments: unknown[]): Dynamic {
  let store: Dynamic = createStore(
    (..._extraArguments: unknown[]) => EMPTY_TABS_OUTLINE_STATE,
  );
  return {
    store: store,
    send: (
      tabsOutlineStore2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      store.setState(
        reduceTabsOutline(store.getState(), tabsOutlineStore2),
        true,
      ),
  };
}

var useTabOutline: Dynamic;

var useSelectedTabHeading: Dynamic;

var tabsOutlineStore: Dynamic;

var presenceNames: Dynamic;

function PresenceDots({ dots: dots }: Dynamic, ..._extraArguments: unknown[]) {
  return dots.length === 0 ? null : (
    <Tooltip content={presenceNames(dots)} multiline={true}>
      <span
        data-testid={`presence-dots`}
        className={`flex shrink-0 items-center`}
      >
        {dots
          .slice(0, 3)
          .map(
            (
              itemsSlice?: Dynamic,
              index?: Dynamic,
              ..._extraArguments: unknown[]
            ) => (
              <span
                {...originalJsxProps(
                  {
                    className: `size-[6px] rounded-full ring-1 ring-white ${index > 0 ? `-ml-0.5` : ``}`,
                    style: {
                      backgroundColor: itemsSlice.color,
                    },
                  },
                  index,
                )}
              />
            ),
          )}
      </span>
    </Tooltip>
  );
}

function createTabNavigationSourceFence(
  ..._extraArguments: unknown[]
): Dynamic {
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  return {
    take(
      request?: Dynamic,
      reason?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      return request === `door`
        ? (options !== undefined &&
            options !== reason &&
            uniqueItems.add(options),
          uniqueItems.delete(reason),
          true)
        : reason !== options && uniqueItems.has(reason)
          ? false
          : (uniqueItems.clear(), true);
    },
    forget: (..._extraArguments: unknown[]): Dynamic => uniqueItems.clear(),
  };
}

function useRepeatedTabShortcut(
  repeatedTabShortcut?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let elementRef: Dynamic = (0, React.useRef)(null);
  let repeatedTabShortcutRef: Dynamic = (0, React.useRef)(repeatedTabShortcut);
  repeatedTabShortcutRef.current = repeatedTabShortcut;
  let elementRef2: Dynamic = (0, React.useRef)(null);
  elementRef2.current ??= {
    anyKeyDown: (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (
        elementRef.current !== null &&
        !(event.repeat && event.key === elementRef.current.key)
      ) {
        elementRef.current = null;
      }
    },
    press: (
      repeatedTabShortcut2?: Dynamic,
      options?: Dynamic,
      key?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      repeatedTabShortcutRef.current?.(options);
      elementRef.current = {
        id: repeatedTabShortcut2,
        key: key,
        h: options,
      };
    },
    keyUp: (
      repeatedTabShortcut2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) => {
      let element: Dynamic = elementRef.current;
      return element === null ||
        repeatedTabShortcut2 !== element.key ||
        ((elementRef.current = null),
        options !== element.id || repeatedTabShortcutRef.current === undefined)
        ? false
        : (repeatedTabShortcutRef.current(element.h, true), true);
    },
    drop: (..._extraArguments: unknown[]): undefined => {
      elementRef.current = null;
    },
    arrivedOn: (
      repeatedTabShortcut2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (elementRef.current?.id !== repeatedTabShortcut2) {
        elementRef.current = null;
      }
    },
  };
  return elementRef2.current;
}

function nearestScrollContainer(
  nearestScrollContainer2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  for (
    let parentElement: Dynamic = nearestScrollContainer2.parentElement;
    parentElement !== null && options.contains(parentElement);
    parentElement = parentElement.parentElement
  )
    if (parentElement.scrollHeight > parentElement.clientHeight + 1)
      return parentElement;
  return null;
}

function scrollTabRowIntoView(
  scrollTabRowIntoView2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let nearestScrollContainer2: Dynamic = nearestScrollContainer(
    scrollTabRowIntoView2,
    options,
  );
  if (nearestScrollContainer2 === null) return;
  let scrollTabRowIntoViewBounds: Dynamic =
    scrollTabRowIntoView2.getBoundingClientRect();
  let nearestScrollContainerBounds: Dynamic =
    nearestScrollContainer2.getBoundingClientRect();
  if (scrollTabRowIntoViewBounds.top < nearestScrollContainerBounds.top) {
    nearestScrollContainer2.scrollTop -=
      nearestScrollContainerBounds.top - scrollTabRowIntoViewBounds.top + 4;
  } else {
    if (
      scrollTabRowIntoViewBounds.bottom > nearestScrollContainerBounds.bottom
    ) {
      nearestScrollContainer2.scrollTop +=
        scrollTabRowIntoViewBounds.bottom -
        nearestScrollContainerBounds.bottom +
        4;
    }
  }
}

function isFocusVisible(
  focusVisible?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  try {
    return focusVisible.matches(`:focus-visible`);
  } catch {
    return false;
  }
}

var tabOutlineToggleLabel: (tabOutline?: Dynamic, options?: Dynamic, context?: Dynamic, ..._extraArguments: unknown[]) => string;

var TAB_TREE_INDENT_REM: number;

function overflowTitle(
  overflowTitle2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return overflowTitle2 != null &&
    overflowTitle2.scrollWidth > overflowTitle2.clientWidth + 1
    ? options
    : null;
}

function TabsHeadingRow(
  {
    boxRef: boxRef,
    id: id2,
    tabName: tabName,
    rows: rows,
    places: places,
    marked: marked,
    stop: stop,
    level: level,
    indentRem: indentRem,
    lead: lead,
    cap: cap,
    restTone = `text-muted`,
    testid = `tabs-left-heading`,
    onPick: onPick,
    onRowFocus: onRowFocus,
    onRowBlur: onRowBlur,
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let ariaDescribedby = `${id2}-kind`;
  let elementRef: Dynamic = (0, React.useRef)(null);
  let elementRef2: Dynamic = (0, React.useRef)(undefined);
  let onPick2 = (
    tabsHeadingRow?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let element: Dynamic = elementRef2.current;
    elementRef2.current = undefined;
    onPick(tabsHeadingRow, options === 0, options === 0 ? undefined : element);
  };
  return (
    <div
      ref={(0, React.useCallback)(
        (
          tabsHeadingRow?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          elementRef.current = tabsHeadingRow;
          if (typeof boxRef == `function`) {
            boxRef(tabsHeadingRow);
          } else {
            if (boxRef) {
              boxRef.current = tabsHeadingRow;
            }
          }
        },
        [boxRef],
      )}
      id={id2}
      role={`group`}
      tabIndex={cap === null ? undefined : -1}
      aria-label={tabName === `` ? `Headings` : `Headings in ${tabName}`}
      className={`flex flex-col gap-px border-l py-px forced-colors:scroll-py-1 forced-colors:p-1 ${cap === null ? `` : `more-rows-fade overflow-y-auto overscroll-contain`}`}
      style={{
        marginLeft:
          lead === undefined
            ? `${indentRem}rem`
            : `calc(${indentRem}rem + ${lead})`,
        ...(cap !== null && {
          maxHeight: cap,
        }),
      }}
      data-testid={`${testid}s`}
    >
      <span id={ariaDescribedby} hidden={true}>{`heading`}</span>
      {rows.map(
        (item?: Dynamic, index?: Dynamic, ..._extraArguments: unknown[]) => {
          let matchesId = item.id === marked;
          let jsx = (
            <button
              type={`button`}
              tabIndex={-1}
              draggable={false}
              className={`text-body min-h-control compact:px-2 comfortable:px-2.5 flex min-w-0 flex-1 items-center text-left focus-visible:outline-none`}
              style={
                item.indent > 0
                  ? {
                      paddingLeft: `calc(${item.indent * TAB_TREE_INDENT_REM}rem + 0.5rem)`,
                    }
                  : undefined
              }
              onClick={(
                event?: Dynamic,
                ..._extraArguments: unknown[]
              ): undefined => {
                event.currentTarget.parentElement?.focus({
                  preventScroll: true,
                });
                onPick2(item.h, event.detail);
              }}
              data-testid={`${testid}-${item.id}`}
            >
              <span
                data-outline-name={item.id}
                className={`-my-0.5 min-w-0 flex-1 truncate py-0.5`}
              >
                {item.h.text}
              </span>
            </button>
          );
          return (
            <div
              {...originalJsxsProps(
                {
                  role: `treeitem`,
                  "aria-level": level + item.indent,
                  "aria-setsize": places[index]?.size,
                  "aria-posinset": places[index]?.pos,
                  "aria-current": matchesId ? `location` : undefined,
                  "aria-label": item.h.text,
                  "aria-describedby": ariaDescribedby,
                  tabIndex: item.id === stop ? 0 : -1,
                  "data-outline-row": item.id,
                  onClick: (
                    event?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): undefined => {
                    if (event.target === event.currentTarget) {
                      onPick2(item.h, event.detail);
                    }
                  },
                  onPointerDown: (
                    tabsHeadingRow?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): undefined => {
                    elementRef2.current = tabsHeadingRow.pointerType;
                  },
                  onFocus: (
                    event?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): undefined => {
                    if (event.target === event.currentTarget) {
                      onRowFocus?.(item.id, index);
                    }
                  },
                  onBlur: (
                    tabsHeadingRow?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic =>
                    onRowBlur?.(tabsHeadingRow.relatedTarget === null),
                  className: `focus-visible:ring-fill-accent relative flex items-center focus-visible:ring-1 focus-visible:outline-hidden focus-visible:ring-inset ${matchesId ? `text-primary font-medium` : `${restTone} hover:text-primary`}`,
                  children: [
                    matchesId ? (
                      <span
                        aria-hidden={`true`}
                        className={`bg-fill-primary pointer-events-none absolute inset-y-0 -left-px w-0.5`}
                      />
                    ) : null,
                    <Tooltip
                      lazy={true}
                      content={(..._extraArguments: unknown[]): Dynamic =>
                        overflowTitle(
                          elementRef.current?.querySelector(
                            `[data-outline-name="${CSS.escape(item.id)}"]`,
                          ),
                          item.h.text,
                        )
                      }
                      side={`right`}
                    >
                      {jsx}
                    </Tooltip>,
                  ],
                },
                item.id,
              )}
            />
          );
        },
      )}
    </div>
  );
}

var LazyTabsPlaceRow: Dynamic;

function TabsPlaceRowGate(
  { seat: seat, shown: shown, why: why }: Dynamic,
  ..._extraArguments: unknown[]
) {
  return !isTabsLocationFeatureEnabled() ||
    seat === null ||
    seat.post === undefined ? null : (
    <RouteErrorBoundary component={`tabsplace`} fallback={null}>
      <React.Suspense
        fallback={<div className={`min-h-8 pointer-coarse:min-h-10`} />}
      >
        <LazyTabsPlaceRow seat={seat} shown={shown} why={why} />
      </React.Suspense>
    </RouteErrorBoundary>
  );
}

function tabTreeAuthority(
  tabTreeAuthority2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return tabTreeAuthority2.frame && !tabTreeAuthority2.fresh ? `lane` : `door`;
}

function filePresentationKind(
  filePresentationKind2?: unknown,
  ..._extraArguments: unknown[]
) {
  if (typeof filePresentationKind2 != `object` || !filePresentationKind2)
    return `other`;
  let filePresentationKind3: Dynamic = filePresentationKind2;
  return filePresentationKind3.content?.kind !== `node` ||
    typeof filePresentationKind3.content?.id != `string` ||
    filePresentationKind3.content.id.length === 0 ||
    resolveDataOperationEngineLdoc(
      typeof filePresentationKind3.birthName == `string`
        ? filePresentationKind3.birthName
        : ``,
    ) === `iron`
    ? `other`
    : `doc`;
}

var MAX_DUPLICATE_DOCUMENT_DEPTH: number;

var isCommentAnchorMark: Dynamic;

function stripCommentAnchors(
  stripCommentAnchors2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let stripCommentAnchorsHandler: Dynamic = (
    stripCommentAnchors3?: unknown,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (options > MAX_DUPLICATE_DOCUMENT_DEPTH)
      throw Error(`This tab's contents are nested too deeply to duplicate.`);
    if (
      typeof stripCommentAnchors3 != `object` ||
      !stripCommentAnchors3 ||
      Array.isArray(stripCommentAnchors3)
    )
      return stripCommentAnchors3;
    let stripCommentAnchors4: Dynamic = stripCommentAnchors3;
    let stripCommentAnchors5: Dynamic = stripCommentAnchors4;
    if (
      Array.isArray(stripCommentAnchors4.marks) &&
      stripCommentAnchors4.marks.some(isCommentAnchorMark)
    ) {
      let { marks: stripCommentAnchors6, ...stripCommentAnchors7 }: Dynamic =
        stripCommentAnchors4;
      let marks: Dynamic = stripCommentAnchors4.marks.filter(
        (mark?: Dynamic, ..._extraArguments: unknown[]) =>
          !isCommentAnchorMark(mark),
      );
      stripCommentAnchors5 =
        marks.length > 0
          ? {
              ...stripCommentAnchors7,
              marks: marks,
            }
          : stripCommentAnchors7;
    }
    if (
      typeof stripCommentAnchors4.attrs == `object` &&
      stripCommentAnchors4.attrs !== null &&
      `commentIds` in stripCommentAnchors4.attrs
    ) {
      let { commentIds: attrs, ...attrs2 }: Dynamic =
        stripCommentAnchors4.attrs;
      stripCommentAnchors5 = {
        ...stripCommentAnchors5,
        attrs: attrs2,
      };
    }
    if (Array.isArray(stripCommentAnchors4.content)) {
      let content: Dynamic = stripCommentAnchors4.content.map(
        (content2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          stripCommentAnchorsHandler(content2, options + 1),
      );
      if (
        content.some(
          (item?: Dynamic, index?: Dynamic, ..._extraArguments: unknown[]) =>
            item !== stripCommentAnchors4.content[index],
        )
      ) {
        stripCommentAnchors5 = {
          ...stripCommentAnchors5,
          content: content,
        };
      }
    }
    return stripCommentAnchors5;
  };
  return stripCommentAnchorsHandler(stripCommentAnchors2, 0);
}

var MAX_DUPLICATE_DOCUMENT_SIZE: number;

function decodeCopyableDocument(
  decodeCopyableDocument2?: Dynamic,
  options: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let decodeCopyableDocumentResult: Dynamic;
  try {
    ({ blocks: decodeCopyableDocumentResult } = filterEditorExtensionsMap(
      decodeCopyableDocument2,
      options,
    ));
  } catch (decodeCopyableDocumentResult2: Dynamic) {
    throw decodeCopyableDocumentResult2 instanceof
      (EditorExtensionsProseBlockMapUnreadable as Dynamic)
      ? new (DuplicateStructureInvalid as Dynamic)()
      : decodeCopyableDocumentResult2;
  }
  if (!resolveDataOperationControlValue35(decodeCopyableDocumentResult))
    throw new (DuplicateTooLarge as Dynamic)();
  return decodeCopyableDocumentResult;
}

var DUPLICATE_TEXT_BLOCK_TYPES: Dynamic;

var INLINE_OBJECT_REPLACEMENT: string;

var DUPLICATE_LINK_BATCH_SIZE: number;

var DUPLICATE_SESSION_BATCH_SIZE: number;

var isCopyableInternalLink: Dynamic;

function hasCopyableInternalLinks(
  copyableInternalLinks?: Dynamic,
  options: Dynamic = 0,
  ..._extraArguments: unknown[]
): Dynamic {
  return options > MAX_DUPLICATE_DOCUMENT_DEPTH
    ? false
    : copyableInternalLinks.some(
        (node?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          isDuplicateObject(node) &&
          ((Array.isArray(node.marks) &&
            node.marks.some(isCopyableInternalLink)) ||
            (Array.isArray(node.content) &&
              hasCopyableInternalLinks(node.content, options + 1))),
      );
}

function extractDuplicateLinkSpans(
  blocks?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!hasCopyableInternalLinks(blocks))
    return {
      blocks: blocks,
      spans: [],
      leaves: [],
    };
  let blocks2: Dynamic = structuredClone(blocks);
  let spans: Dynamic = [];
  let leaves: Dynamic = [];
  let findLast = (
    extractDuplicateLinkSpans2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let label: string = ``;
    let count: number = 0;
    let items: Dynamic = [];
    for (let extractDuplicateLinkSpansResult of extractDuplicateLinkSpans2 as Dynamic) {
      if (!isDuplicateObject(extractDuplicateLinkSpansResult)) continue;
      let matchesType = extractDuplicateLinkSpansResult.type === `text`;
      let text: Dynamic =
        matchesType && typeof extractDuplicateLinkSpansResult.text == `string`
          ? extractDuplicateLinkSpansResult.text
          : ``;
      let textCount = matchesType ? Array.from<Dynamic>(text).length : 1;
      label += matchesType ? text : INLINE_OBJECT_REPLACEMENT;
      if (Array.isArray(extractDuplicateLinkSpansResult.marks)) {
        let filteredMarks: Dynamic =
          extractDuplicateLinkSpansResult.marks.filter(isCopyableInternalLink);
        if (filteredMarks.length) {
          let filteredMarks2: Dynamic =
            extractDuplicateLinkSpansResult.marks.filter(
              (mark?: Dynamic, ..._extraArguments: unknown[]) =>
                !isCopyableInternalLink(mark),
            );
          if (filteredMarks2.length) {
            extractDuplicateLinkSpansResult.marks = filteredMarks2;
          } else {
            delete extractDuplicateLinkSpansResult.marks;
          }
          if (textCount > 0)
            for (let extractDuplicateLinkSpansResult2 of filteredMarks as Dynamic) {
              let mark: Dynamic = {
                type: `link`,
                href: extractDuplicateLinkSpansResult2.href,
              };
              let key: Dynamic = extractDuplicateLinkSpansResult2.href;
              let findLast3: Dynamic = items.findLast(
                (event?: Dynamic, ..._extraArguments: unknown[]) =>
                  event.key === key,
              );
              if (findLast3 && findLast3.u1 === count - 1) {
                findLast3.u1 = count + textCount - 1;
              } else {
                items.push({
                  leaf: leaves.length,
                  u0: count,
                  u1: count + textCount - 1,
                  mark: mark,
                  key: key,
                });
              }
            }
        }
      }
      count += textCount;
    }
    if (count !== 0) {
      for (let {
        key: extractDuplicateLinkSpansResult,
        ...extractDuplicateLinkSpansResult2
      } of items as Dynamic)
        spans.push(extractDuplicateLinkSpansResult2);
      leaves.push(label);
    }
  };
  let findLast2 = (
    extractDuplicateLinkSpans2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (!(options > MAX_DUPLICATE_DOCUMENT_DEPTH))
      for (let node of extractDuplicateLinkSpans2 as Dynamic)
        if (!(!isDuplicateObject(node) || !Array.isArray(node.content))) {
          if (
            typeof node.type == `string` &&
            DUPLICATE_TEXT_BLOCK_TYPES.has(node.type)
          ) {
            findLast(node.content);
          } else {
            findLast2(node.content, options + 1);
          }
        }
  };
  findLast2(blocks2, 0);
  return {
    blocks: blocks2,
    spans: spans,
    leaves: leaves,
  };
}

function removePendingBlocks(
  removePendingBlocks2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return removePendingBlocks2.filter(
    (item?: Dynamic, ..._extraArguments: unknown[]) =>
      !(typeof item == `object` && item && item.type === `pending`),
  );
}

function duplicateDocumentLeafIndex(
  duplicateDocumentLeafIndex2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let duplicateDocumentLeafIndexResult: Dynamic =
    resolveEditorExtensionsValue25(duplicateDocumentLeafIndex2);
  let lookup: Dynamic = new (Map as Dynamic)(
    duplicateDocumentLeafIndexResult.blocks.map(
      (ask?: Dynamic, ..._extraArguments: unknown[]): Dynamic => [ask.bid, ask],
    ),
  );
  let items: Dynamic = [];
  let isDuplicateObject2: Dynamic = (
    duplicateDocumentLeafIndex3?: Dynamic,
    ..._extraArguments: unknown[]
  ): string => {
    let label: string = ``;
    if (Array.isArray(duplicateDocumentLeafIndex3))
      for (let duplicateDocumentLeafIndexResult2 of duplicateDocumentLeafIndex3 as Dynamic)
        if (isDuplicateObject(duplicateDocumentLeafIndexResult2)) {
          label +=
            duplicateDocumentLeafIndexResult2.type === `text` &&
            typeof duplicateDocumentLeafIndexResult2.text == `string`
              ? duplicateDocumentLeafIndexResult2.text
              : INLINE_OBJECT_REPLACEMENT;
        }
    return label;
  };
  let duplicateDocumentLeafIndexHandler = (
    node?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (options > MAX_DUPLICATE_DOCUMENT_DEPTH || !isDuplicateObject(node))
      return;
    let bid: Dynamic = isDuplicateObject(node.attrs)
      ? node.attrs.bid
      : undefined;
    let lookupEntry: Dynamic =
      typeof bid == `string` ? lookup.get(bid) : undefined;
    if (lookupEntry !== undefined) {
      let words: Dynamic = isDuplicateObject2(node.content);
      if (Array.from<Dynamic>(words).length === 0) return;
      let ids: Dynamic = lookupEntry.opaque ? null : [];
      if (ids !== null)
        for (let duplicateDocumentLeafIndexResult2 of lookupEntry.runs as Dynamic) {
          let duplicateDocumentLeafIndexResult3: Dynamic =
            resolveEditorExtensionsSess(duplicateDocumentLeafIndexResult2.id);
          if (duplicateDocumentLeafIndexResult3 === null) {
            ids = null;
            break;
          }
          for (
            let index = 0;
            index < duplicateDocumentLeafIndexResult2.len;
            index++
          )
            ids.push(
              resolveEditorExtensionsValue22(
                duplicateDocumentLeafIndexResult3.sess,
                duplicateDocumentLeafIndexResult3.i + index,
              ),
            );
        }
      if (ids !== null && ids.length !== Array.from<Dynamic>(words).length) {
        ids = null;
      }
      items.push({
        words: words,
        bid: bid,
        ids: ids,
      });
      return;
    }
    if (Array.isArray(node.content))
      for (let duplicateDocumentLeafIndexResult2 of node.content as Dynamic)
        duplicateDocumentLeafIndexHandler(
          duplicateDocumentLeafIndexResult2,
          options + 1,
        );
  };
  duplicateDocumentLeafIndexHandler(
    duplicateDocumentLeafIndexResult.docJson,
    0,
  );
  return items;
}

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializePresenceAndChatStep1(): void {
  (ONE_TAB_OUTLINE_HOLD_MS = 1500);
  (ONE_TAB_OUTLINE_SILENCE_MS = 4e3);
  (EMPTY_ONE_TAB_LIST_STATE = {
    tab: undefined,
    offered: null,
    holding: false,
    silentOver: false,
  });
  (useTabOutline = (
    tabOutline?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    useStore(
      tabOutline.store,
      (tabOutline2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        getTabOutline(tabOutline2, options),
    ));
  (useSelectedTabHeading = (
    selectedTabHeading?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    useStore(
      selectedTabHeading.store,
      (selectedTabHeading2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        getSelectedHeading(selectedTabHeading2, options),
    ));
  (tabsOutlineStore = createTabsOutlineStore());
  (presenceNames = (
    presenceNames2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    presenceNames2
      .map((item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => item.name)
      .join(`, `));
  (tabOutlineToggleLabel = (
    tabOutline?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `${options ? `Hide` : `Show`} ${tabOutline === `both` ? `headings and subtabs` : tabOutline}${context === `` ? `` : ` in ${context}`}`);
  (TAB_TREE_INDENT_REM = 0.625);
  (LazyTabsPlaceRow = resolvePlatformChunkLoadingLazy(
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          import("../document-tabs/place-row").then(
            (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
              default: result.TabsPlaceRow,
            }),
          ),
        mapPreloadDependencies([18, 1, 6, 2, 0, 3, 19, 15]),
        import.meta.url,
      ),
  ));
  (MAX_DUPLICATE_DOCUMENT_DEPTH = 1024);
  (isCommentAnchorMark = (
    commentAnchorMark?: Dynamic,
    ..._extraArguments: unknown[]
  ): boolean =>
    typeof commentAnchorMark == `object` &&
    !!commentAnchorMark &&
    commentAnchorMark.type === `commentAnchor`);
  (MAX_DUPLICATE_DOCUMENT_SIZE = 8e6);
  (DUPLICATE_TEXT_BLOCK_TYPES = new (Set as Dynamic)([
    `paragraph`,
    `codeBlock`,
  ]));
  (INLINE_OBJECT_REPLACEMENT = `￼`);
  (DUPLICATE_LINK_BATCH_SIZE = 64);
  (DUPLICATE_SESSION_BATCH_SIZE = 64);
  (isCopyableInternalLink = (
    copyableInternalLink?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    isDuplicateObject(copyableInternalLink) &&
    copyableInternalLink.type === `link` &&
    typeof copyableInternalLink.href == `string` &&
    !resolveEditorExtensionsTest(copyableInternalLink.href) &&
    resolvePlatformSessionAndSourcesTest9(copyableInternalLink.href));
}

export {
  DUPLICATE_LINK_BATCH_SIZE,
  DUPLICATE_SESSION_BATCH_SIZE,
  EMPTY_ONE_TAB_LIST_STATE,
  INLINE_OBJECT_REPLACEMENT,
  MAX_DUPLICATE_DOCUMENT_DEPTH,
  MAX_DUPLICATE_DOCUMENT_SIZE,
  ONE_TAB_OUTLINE_HOLD_MS,
  ONE_TAB_OUTLINE_SILENCE_MS,
  PresenceDots,
  TabsHeadingRow,
  TabsPlaceRowGate,
  createTabNavigationSourceFence,
  createTabsOutlineStore,
  decodeCopyableDocument,
  duplicateDocumentLeafIndex,
  extractDuplicateLinkSpans,
  filePresentationKind,
  isFocusVisible,
  nearestScrollContainer,
  overflowTitle,
  presenceNames,
  reduceOneTabListState,
  removePendingBlocks,
  scrollTabRowIntoView,
  stripCommentAnchors,
  tabOutlineToggleLabel,
  tabTreeAuthority,
  tabsOutlineReadPlan,
  tabsOutlineStore,
  useRepeatedTabShortcut,
  useSelectedTabHeading,
  useTabOutline,
};
