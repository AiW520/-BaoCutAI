/** BaoCut: comment anchors from index-CX4IZqzA.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  editRefusalLeavesBoxOpen,
  isCommentRefusal,
  preloadModule,
  resolvePlatformSessionAndSourcesRound,
  resolvePlatformSessionAndSourcesValue3,
  resolveUiDesignSystemValue2,
  usePlatformSyncAndRoutingUseSyncExternalStore,
} from "../dependencies";
import {
  React,
  jsxRuntime,
} from "../bootstrap";
import {
  CommentAnchorsState,
  CommentAnchorsState2,
  resolveCommentSessionCommentOnly,
  resolveCommentSessionLabel,
} from "../comment-session/ask-suggestions-measure";

function mapCommentAnchorsPush(
  items?: Dynamic,
  options: Dynamic = true,
  ..._extraArguments: unknown[]
): Dynamic {
  let items2: Dynamic = [];
  if (items.length > 3) {
    items2.push(`more than three`);
  }
  let mappedItems: Dynamic = items.map(
    (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => item.cat,
  );
  if (
    mappedItems.some(
      (mappedItem?: Dynamic, ..._extraArguments: unknown[]) =>
        mappedItem === undefined,
    )
  ) {
    items2.push(`an entry has no category`);
  }
  let mappedItemIndex: Dynamic = mappedItems.findIndex(
    (mappedItem?: Dynamic, ..._extraArguments: unknown[]) =>
      mappedItem !== `agentic`,
  );
  let lastIndexOf: Dynamic = mappedItems.lastIndexOf(`agentic`);
  if (mappedItemIndex !== -1 && lastIndexOf > mappedItemIndex) {
    items2.push(`an agentic entry after a non-agentic one`);
  }
  return options
    ? (lastIndexOf === -1 && items2.push(`no agentic entry to lead with`),
      mappedItems.includes(`editing`) || items2.push(`no editing entry`),
      mappedItems.includes(`context`) ||
        items2.push(`no informational (context) entry`),
      items2)
    : items2;
}

var resolveCommentAnchorsSlice: Dynamic;

var commentAnchorsSet: Dynamic;

function mapCommentAnchorsKey(
  mapCommentAnchorsKey2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let commentSessionCommentOnly: Dynamic = resolveCommentSessionCommentOnly(
    mapCommentAnchorsKey2,
  );
  for (let [
    mapCommentAnchorsKeyResult,
    key,
  ] of commentSessionCommentOnly.entries() as Dynamic) {
    if (CommentAnchorsState2[key].length === 0) continue;
    let CommentAnchorsState2Item: Dynamic = CommentAnchorsState2[key];
    let commentSessionCommentOnlyItem: Dynamic =
      commentSessionCommentOnly[mapCommentAnchorsKeyResult + 1];
    if (
      key === `S7` &&
      commentSessionCommentOnlyItem !== undefined &&
      commentAnchorsSet.has(commentSessionCommentOnlyItem)
    ) {
      CommentAnchorsState2Item = [
        ...CommentAnchorsState2Item,
        ...CommentAnchorsState2[commentSessionCommentOnlyItem],
      ];
    }
    return {
      key: key,
      list: resolveCommentAnchorsSlice(CommentAnchorsState2Item).map(
        (
          commentAnchorsSlice?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          resolveCommentSessionLabel(
            commentAnchorsSlice,
            mapCommentAnchorsKey2,
          ),
      ),
    };
  }
  return {
    key: null,
    list: CommentAnchorsState,
  };
}

async function loadCommentAnchorsList(
  commentAnchorsList?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  return mapCommentAnchorsKey(commentAnchorsList).list;
}

var resolveCommentAnchorsThen: Dynamic;

var resolveCommentAnchorsEvery: Dynamic;

function useCommentAnchorsCurrent(
  commentAnchorsCurrent?: unknown,
  options?: Dynamic,
  context: Dynamic = 0,
  ..._extraArguments: unknown[]
): Dynamic {
  let [CommentAnchorsStateState, setCommentAnchorsStateState]: Dynamic = (0,
  React.useState)(
    (..._extraArguments: unknown[]): Dynamic =>
      typeof commentAnchorsCurrent == `function` ||
      commentAnchorsCurrent === undefined
        ? CommentAnchorsState
        : resolveCommentAnchorsSlice(commentAnchorsCurrent),
  );
  let countRef: Dynamic = (0, React.useRef)(0);
  let enabledRef: Dynamic = (0, React.useRef)(false);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => (
      (enabledRef.current = true),
      (..._extraArguments: unknown[]): undefined => {
        enabledRef.current = false;
      }
    ),
    [],
  );
  let elementRef: Dynamic = (0, React.useRef)(null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (!options) {
        elementRef.current = null;
        return;
      }
      let items: Dynamic = [commentAnchorsCurrent, options, context];
      if (
        elementRef.current &&
        items.every(
          (item?: Dynamic, index?: Dynamic, ..._extraArguments: unknown[]) =>
            item === elementRef.current[index],
        )
      )
        return;
      elementRef.current = items;
      let setCommentAnchorsStateState2 = (
        commentAnchorsCurrent2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let commentAnchorsSlice: Dynamic = resolveCommentAnchorsSlice(
          commentAnchorsCurrent2,
        );
        setCommentAnchorsStateState(
          (
            commentAnchorsCurrent3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            resolveCommentAnchorsEvery(
              commentAnchorsCurrent3,
              commentAnchorsSlice,
            )
              ? commentAnchorsCurrent3
              : commentAnchorsSlice,
        );
      };
      if (commentAnchorsCurrent === undefined)
        return void setCommentAnchorsStateState2(CommentAnchorsState);
      if (typeof commentAnchorsCurrent != `function`)
        return void setCommentAnchorsStateState2(commentAnchorsCurrent);
      let useCommentAnchorsCurrentResult: number = ++countRef.current;
      let useCommentAnchorsCurrentResult2: Dynamic;
      try {
        useCommentAnchorsCurrentResult2 = commentAnchorsCurrent();
      } catch {
        return;
      }
      if (resolveCommentAnchorsThen(useCommentAnchorsCurrentResult2)) {
        useCommentAnchorsCurrentResult2.then(
          (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            if (
              enabledRef.current &&
              useCommentAnchorsCurrentResult === countRef.current
            ) {
              setCommentAnchorsStateState2(result);
            }
          },
          (..._extraArguments: unknown[]): undefined => {},
        );
        return;
      }
      setCommentAnchorsStateState2(useCommentAnchorsCurrentResult2.now);
      useCommentAnchorsCurrentResult2.later?.then(
        (items2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (
            enabledRef.current &&
            useCommentAnchorsCurrentResult === countRef.current &&
            items2 &&
            items2.length > 0
          ) {
            setCommentAnchorsStateState2(items2);
          }
        },
        (..._extraArguments: unknown[]): undefined => {},
      );
    },
    [commentAnchorsCurrent, options, context],
  );
  return options ? CommentAnchorsStateState : CommentAnchorsState;
}

function resolveCommentAnchorsOpenedDirectly(
  request?: Dynamic,
  options: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let record = {
    ...(options.openedDirectly
      ? {
          openedDirectly: true,
        }
      : {}),
    ...(options.commentOnly
      ? {
          commentOnly: true,
        }
      : {}),
  };
  let record2: Dynamic = options.blockKind
    ? {
        block: options.blockKind,
      }
    : {};
  if (options.inlineAsk)
    return {
      kind: `inlineAsk`,
      ...record2,
      ...(options.pageShape
        ? {
            shape: options.pageShape,
          }
        : {}),
      ...record,
    };
  if (!request)
    return {
      kind: `page`,
      shape: options.pageShape ?? `short`,
      ...record,
    };
  if (request.cellIds?.length)
    return {
      kind: `tableCells`,
      ...record,
    };
  if (request.atom)
    return {
      kind: `image`,
      ...record,
    };
  if (request.citation !== undefined) {
    let row: Dynamic = request.words?.row?.label;
    return {
      kind: `chartPoint`,
      ...(row
        ? {
            row: row,
          }
        : {}),
      ...record,
    };
  }
  if (request.roomWidget || request.segment !== undefined)
    return {
      kind: `widget`,
      ...record,
    };
  let chars: Dynamic = request.quote.length;
  return {
    kind: `selection`,
    chars: chars,
    long:
      chars > 160 ||
      request.quote.includes(`
`) ||
      request.clamped === true,
    ...record2,
    ...record,
  };
}

var filterCommentAnchorsIsArray: Dynamic;

var resolveCommentAnchorsType: Dynamic;

function resolveCommentAnchorsAttrs(
  commentAnchors?: unknown,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    options === undefined ||
    typeof commentAnchors != `object` ||
    !commentAnchors
  )
    return;
  let resolveCommentAnchorsAttrsHandler = (
    commentAnchors2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    commentAnchors2 === `codeBlock`
      ? `code`
      : commentAnchors2 === `list` || commentAnchors2 === `listItem`
        ? `list`
        : commentAnchors2 === `blockquote`
          ? `quote`
          : commentAnchors2 === `table` ||
              commentAnchors2 === `tableRow` ||
              commentAnchors2 === `cell`
            ? `table`
            : undefined;
  let filterCommentAnchorsIsArray2: Dynamic = (
    commentAnchors2?: Dynamic,
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (commentAnchors2.attrs?.bid === options) {
      if (commentAnchors2.type === `codeBlock`) return `code`;
      for (let difference = items.length - 1; difference >= 0; difference--) {
        let commentAnchorsAttrsHandler = resolveCommentAnchorsAttrsHandler(
          items[difference].type,
        );
        if (commentAnchorsAttrsHandler) return commentAnchorsAttrsHandler;
      }
      return (
        resolveCommentAnchorsAttrsHandler(commentAnchors2.type) ??
        (resolveCommentAnchorsType(commentAnchors2) ? `heading` : `paragraph`)
      );
    }
    let items2: Dynamic = [...items, commentAnchors2];
    for (let resolveCommentAnchorsAttrsResult of filterCommentAnchorsIsArray(
      commentAnchors2,
    ) as Dynamic) {
      let filterCommentAnchorsIsArray3: Dynamic = filterCommentAnchorsIsArray2(
        resolveCommentAnchorsAttrsResult,
        items2,
      );
      if (filterCommentAnchorsIsArray3) return filterCommentAnchorsIsArray3;
    }
  };
  return filterCommentAnchorsIsArray2(commentAnchors, []);
}

function resolveCommentAnchorsText(
  commentAnchorsText?: unknown,
  ..._extraArguments: unknown[]
) {
  let count: number = 0;
  let index = 0;
  let index2 = 0;
  let index3 = 0;
  let index4 = 0;
  let filterCommentAnchorsIsArray2 = (
    commentAnchorsText2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (typeof commentAnchorsText2.text == `string`) {
      count += commentAnchorsText2.text.length;
    }
    if (resolveCommentAnchorsType(commentAnchorsText2)) {
      index++;
    } else {
      if (commentAnchorsText2.type === `table`) {
        index2++;
      } else {
        if (commentAnchorsText2.type === `embed`) {
          index3++;
        } else {
          if (commentAnchorsText2.type === `media`) {
            index4++;
          }
        }
      }
    }
    for (let resolveCommentAnchorsTextResult of filterCommentAnchorsIsArray(
      commentAnchorsText2,
    ) as Dynamic)
      filterCommentAnchorsIsArray2(resolveCommentAnchorsTextResult);
  };
  if (typeof commentAnchorsText == `object` && commentAnchorsText) {
    filterCommentAnchorsIsArray2(commentAnchorsText);
  }
  return count === 0 && index2 === 0 && index3 === 0 && index4 === 0
    ? `empty`
    : index2 > 0 && index3 === 0
      ? `tablesNoChart`
      : count >= 3e3 || index >= 4
        ? `long`
        : `short`;
}

var resolveCommentAnchorsText2: Dynamic;

var resolveCommentAnchorsTrim: Dynamic;

function resolveCommentAnchorsPush(
  commentAnchorsPush?: unknown,
  options: Dynamic = 40,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  let repeat = (
    commentAnchorsPush2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (!(items.length >= options)) {
      if (resolveCommentAnchorsType(commentAnchorsPush2)) {
        let commentAnchorsTrim: Dynamic = resolveCommentAnchorsTrim(
          resolveCommentAnchorsText2(commentAnchorsPush2),
          100,
        );
        if (commentAnchorsTrim) {
          items.push(
            `${`#`.repeat(Math.min(6, Math.max(1, commentAnchorsPush2.attrs.heading)))} ${commentAnchorsTrim}`,
          );
        }
        return;
      }
      for (let resolveCommentAnchorsPushResult of filterCommentAnchorsIsArray(
        commentAnchorsPush2,
      ) as Dynamic)
        repeat(resolveCommentAnchorsPushResult);
    }
  };
  if (typeof commentAnchorsPush == `object` && commentAnchorsPush) {
    repeat(commentAnchorsPush);
  }
  return items;
}

function resolveCommentAnchorsLast(
  commentAnchorsLast?: unknown,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    options === undefined ||
    typeof commentAnchorsLast != `object` ||
    !commentAnchorsLast
  )
    return;
  let record: Dynamic = {};
  let filterCommentAnchorsIsArray2: Dynamic = (
    commentAnchorsLast2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (resolveCommentAnchorsType(commentAnchorsLast2)) {
      let commentAnchorsTrim: Dynamic = resolveCommentAnchorsTrim(
        resolveCommentAnchorsText2(commentAnchorsLast2),
        100,
      );
      if (commentAnchorsTrim) {
        record.last = commentAnchorsTrim;
      }
    }
    return commentAnchorsLast2.attrs?.bid === options
      ? true
      : filterCommentAnchorsIsArray(commentAnchorsLast2).some(
          filterCommentAnchorsIsArray2,
        );
  };
  return filterCommentAnchorsIsArray2(commentAnchorsLast)
    ? record.last
    : undefined;
}

function resolveCommentAnchorsValue(
  commentAnchorsValue?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return options === true
    ? `empty`
    : options === false &&
        (commentAnchorsValue === null || commentAnchorsValue === `empty`)
      ? `short`
      : commentAnchorsValue;
}

function resolveCommentAnchorsWhole(
  commentAnchorsWhole?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return options.whole
    ? resolveCommentAnchorsText(options.docJson)
    : options.hasText
      ? commentAnchorsWhole === null || commentAnchorsWhole === `empty`
        ? `short`
        : commentAnchorsWhole
      : commentAnchorsWhole === null
        ? null
        : commentAnchorsWhole === `tablesNoChart`
          ? commentAnchorsWhole
          : `empty`;
}

var commentAnchorsLimit20: number;

var commentAnchorsLimit0_35: number;

var CommentAnchorsWidth: {
    width: number;
    height: number;
};

var CommentAnchorsWillChange: {
    willChange: string;
    boxShadow: string;
};

var CommentAnchorsState3: Dynamic;

var CommentAnchorsState4: Dynamic;

function resolveCommentAnchorsResolve(
  commentAnchorsResolve?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (typeof Image === "undefined") return Promise.resolve();
  let image = new Image();
  image.src = commentAnchorsResolve;
  return typeof image.decode == `function` ? image.decode() : Promise.resolve();
}

async function loadCommentAnchorsValues(
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  try {
    let loadCommentAnchorsValuesResult: Dynamic = await preloadModule(
      (..._extraArguments: unknown[]) => import("../../assistant/writing-sheets"),
      [],
      import.meta.url,
    );
    await Promise.all(
      Object.values(loadCommentAnchorsValuesResult.WRITING_SHEETS).map(
        (WRITINGSHEETSValue?: Dynamic, ..._extraArguments: unknown[]) =>
          resolveCommentAnchorsResolve(WRITINGSHEETSValue.url),
      ),
    );
    return loadCommentAnchorsValuesResult;
  } catch {
    return null;
  }
}

function resolveCommentAnchorsResolve2(..._extraArguments: unknown[]): Dynamic {
  if (CommentAnchorsState3) return Promise.resolve(CommentAnchorsState3);
  if (!CommentAnchorsState4) {
    let then: Dynamic = loadCommentAnchorsValues().then(
      (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
        CommentAnchorsState4 === then &&
          (result
            ? (CommentAnchorsState3 = result)
            : (CommentAnchorsState4 = null)),
        result
      ),
    );
    CommentAnchorsState4 = then;
  }
  return CommentAnchorsState4;
}

function ClaudeTypingIndicator(
  { className: className }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let reduceMotion: Dynamic = usePlatformSyncAndRoutingUseSyncExternalStore(
    `(prefers-reduced-motion: reduce)`,
  );
  let [sheets, setSheets]: Dynamic = (0, React.useState)(CommentAnchorsState3);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (sheets) return;
      let enabled = true;
      resolveCommentAnchorsResolve2().then(
        (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (enabled && result) {
            setSheets(result);
          }
        },
      );
      return (..._extraArguments: unknown[]): undefined => {
        enabled = false;
      };
    },
    [sheets],
  );
  return (
    <span
      aria-hidden={`true`}
      data-claude-writing-mark={sheets ? `playing` : `dot`}
      className={resolveUiDesignSystemValue2(
        `relative block shrink-0 select-none`,
        className,
      )}
      style={CommentAnchorsWidth}
    >
      {sheets ? (
        <UseCommentAnchorsSheetsComponent
          sheets={sheets}
          reduceMotion={reduceMotion}
        />
      ) : (
        <UseCommentAnchorsDataHeldDotComponent />
      )}
    </span>
  );
}

function UseCommentAnchorsDataHeldDotComponent(
  ..._extraArguments: [Readonly<Record<string, unknown>>?, ...unknown[]]
) {
  let width = commentAnchorsLimit20 * commentAnchorsLimit0_35;
  return (
    <span
      data-held-dot={``}
      className={`bg-clay absolute inset-0 m-auto block rounded-full`}
      style={{
        width: width,
        height: width,
      }}
    />
  );
}

var resolveCommentAnchorsValue2: (commentAnchorsValue2?: Dynamic, ..._extraArguments: unknown[]) => string;

function UseCommentAnchorsSheetsComponent(
  { sheets: sheets, reduceMotion: reduceMotion }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let {
    WRITING_SHEETS: sheets2,
    WRITING_STAGES: sheets3,
    SHEET_FRAME_MS: sheets4,
    LOOP_REST_FRAME: sheets5,
  }: Dynamic = sheets;
  let [sheetItemState, setSheetItemState]: Dynamic = (0, React.useState)(
    sheets3[0],
  );
  let [enabledState, setEnabledState]: Dynamic = (0, React.useState)(false);
  let lookupRef: Dynamic = (0, React.useRef)(new (Map as Dynamic)());
  let label: Dynamic = reduceMotion ? `loop` : sheetItemState;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let lookupEntry: Dynamic = lookupRef.current.get(sheetItemState);
      if (
        !lookupEntry ||
        reduceMotion ||
        typeof lookupEntry.animate != `function`
      )
        return;
      let { frames: sheetItem }: Dynamic = sheets2[sheetItemState];
      let sheetItem2: Dynamic = sheets3[sheets3.indexOf(sheetItemState) + 1];
      let animate: Dynamic = lookupEntry.animate(
        [
          {
            transform: resolveCommentAnchorsValue2(0),
          },
          {
            transform: resolveCommentAnchorsValue2(sheetItem - 1),
          },
        ],
        {
          duration: sheets4 * sheetItem,
          iterations: sheetItem2 ? 1 : 1 / 0,
          easing: `steps(${sheetItem}, jump-none)`,
          fill: `forwards`,
        },
      );
      let enabled = true;
      let useCommentAnchorsSheetsHandler: Dynamic =
        (
          commentAnchorsSheets?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
        (..._extraArguments: unknown[]): undefined => {
          if (enabled) {
            commentAnchorsSheets();
          }
        };
      animate.ready
        .then(
          useCommentAnchorsSheetsHandler(
            (..._extraArguments: unknown[]): Dynamic => setEnabledState(true),
          ),
        )
        .catch((..._extraArguments: unknown[]): undefined => {});
      if (sheetItem2) {
        animate.finished
          .then(
            useCommentAnchorsSheetsHandler(
              (..._extraArguments: unknown[]): Dynamic =>
                setSheetItemState(sheetItem2),
            ),
          )
          .catch((..._extraArguments: unknown[]): undefined => {});
      }
      return (..._extraArguments: unknown[]): undefined => {
        enabled = false;
        animate.cancel();
      };
    },
    [sheetItemState, reduceMotion, sheets2, sheets3, sheets4],
  );
  return (
    <jsxRuntime.Fragment>
      {!enabledState && !reduceMotion ? (
        <UseCommentAnchorsDataHeldDotComponent />
      ) : null}
      {sheets3.map((dataStage?: Dynamic, ..._extraArguments: unknown[]) => {
        let matchesDataStage = dataStage === label;
        let { url: sheetItem, frames: sheetItem2 }: Dynamic =
          sheets2[dataStage];
        return (
          <span data-stage={dataStage} data-live={matchesDataStage ? `` : undefined} className={`absolute inset-0 m-auto overflow-clip`} style={{
  ...CommentAnchorsWidth,
  opacity: matchesDataStage ? undefined : 0.001,
  zIndex: matchesDataStage ? 1 : undefined
}} key={dataStage}>{<span className={`block`}>
                    <span ref={(commentAnchorsSheets?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (commentAnchorsSheets) {
        lookupRef.current.set(dataStage, commentAnchorsSheets);
      } else {
        lookupRef.current.delete(dataStage);
      }
    }} className={`block`} style={{
      width: commentAnchorsLimit20,
      height: sheetItem2 * commentAnchorsLimit20,
      backgroundImage: `url(${sheetItem})`,
      backgroundSize: `100% 100%`,
      backgroundRepeat: `no-repeat`,
      transform: resolveCommentAnchorsValue2(matchesDataStage && reduceMotion ? sheets5 : 0),
      ...(matchesDataStage && !reduceMotion && CommentAnchorsWillChange)
    }} />
                  </span>}</span>
        );
      })}
    </jsxRuntime.Fragment>
  );
}

var CommentAnchorsHour: {
    hour: string;
    minute: string;
};

var CommentAnchorsMonth: {
    hour: string;
    minute: string;
    month: string;
    day: string;
};

var CommentAnchorsYear: {
    hour: string;
    minute: string;
    month: string;
    day: string;
    year: string;
};

var commentAnchorsMap: Dynamic;

var updateCommentAnchorsTime: Dynamic;

var CommentAnchors_Yesterday: string;

function resolveCommentAnchorsFormat(
  commentAnchors?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let date = new Date(commentAnchors);
  let updateCommentAnchorsTime2: Dynamic = updateCommentAnchorsTime(
    context,
    dependencies,
  );
  let resolveCommentAnchorsFormatResult: Dynamic =
    resolvePlatformSessionAndSourcesRound(date, options, dependencies);
  return resolveCommentAnchorsFormatResult <= 0
    ? updateCommentAnchorsTime2.time.format(date)
    : resolveCommentAnchorsFormatResult === 1
      ? `${CommentAnchors_Yesterday}, ${updateCommentAnchorsTime2.time.format(date)}`
      : (resolvePlatformSessionAndSourcesValue3(date, dependencies) ===
        resolvePlatformSessionAndSourcesValue3(options, dependencies)
          ? updateCommentAnchorsTime2.dateTime
          : updateCommentAnchorsTime2.dateTimeYear
        ).format(date);
}

var CommentAnchors_LeftOpen: string;

async function loadCommentAnchorsValue(
  commentAnchorsValue?: Dynamic,
  options?: Dynamic,
  context: Dynamic = (..._extraArguments: unknown[]) => true,
  ..._extraArguments: unknown[]
) {
  try {
    await commentAnchorsValue();
  } catch (loadCommentAnchorsValueResult: Dynamic) {
    if (!isCommentRefusal(loadCommentAnchorsValueResult))
      throw loadCommentAnchorsValueResult;
    if (editRefusalLeavesBoxOpen(loadCommentAnchorsValueResult))
      return CommentAnchors_LeftOpen;
    options();
    return;
  }
  if (context()) {
    options();
  }
}

function isCommentAnchorsPeople(
  commentAnchorsPeople?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let uniqueItems: Dynamic = new (Set as Dynamic)(
    commentAnchorsPeople.map(
      (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => item.id,
    ),
  );
  return {
    people: [
      ...commentAnchorsPeople,
      ...options.hits.filter(
        (hit?: Dynamic, ..._extraArguments: unknown[]) =>
          !uniqueItems.has(hit.id),
      ),
    ],
    priming: options.priming,
  };
}

var resolveCommentAnchorsIssued: Dynamic;

var CommentAnchorsState5: Dynamic;

var CommentAnchorsAvatarUrl: {
    id: null;
    name: string;
    avatarUrl: string;
};

var resolveCommentAnchorsEvery2: Dynamic;

var resolveCommentAnchorsSplit: Dynamic;

var commentAnchorsPattern2: RegExp;

var resolveCommentAnchorsReplace: Dynamic;

var filterCommentAnchorsFilter: Dynamic;

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeCommentAnchorsUseCommentAnchorsSheetsComponentStep1(): void {
  (resolveCommentAnchorsSlice = (
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => (items.length > 4 ? items.slice(0, 4) : items));
  (commentAnchorsSet = new (Set as Dynamic)([`W1`, `W2`, `W3`, `W4`]));
  (resolveCommentAnchorsThen = (
    commentAnchorsThen?: Dynamic,
    ..._extraArguments: unknown[]
  ): boolean =>
    typeof commentAnchorsThen == `object` &&
    !!commentAnchorsThen &&
    typeof commentAnchorsThen.then == `function`);
  (resolveCommentAnchorsEvery = (
    items?: Dynamic,
    items2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    items.length === items2.length &&
    items.every(
      (item?: Dynamic, index?: Dynamic, ..._extraArguments: unknown[]) =>
        item.id === items2[index].id &&
        item.label === items2[index].label &&
        item.prompt === items2[index].prompt,
    ));
  (filterCommentAnchorsIsArray = (
    node?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    Array.isArray(node.content)
      ? node.content.filter(
          (content?: unknown, ..._extraArguments: unknown[]) =>
            typeof content == `object` && !!content,
        )
      : []);
  (resolveCommentAnchorsType = (
    commentAnchorsType?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    commentAnchorsType.type === `paragraph` &&
    typeof commentAnchorsType.attrs?.heading == `number` &&
    commentAnchorsType.attrs.heading > 0);
  (resolveCommentAnchorsText2 = (
    commentAnchorsText2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (typeof commentAnchorsText2.text == `string`)
      return commentAnchorsText2.text;
    let label: string = ``;
    for (let resolveCommentAnchorsText2Result of filterCommentAnchorsIsArray(
      commentAnchorsText2,
    ) as Dynamic)
      label += resolveCommentAnchorsText2(resolveCommentAnchorsText2Result);
    return label;
  });
  (resolveCommentAnchorsTrim = (
    commentAnchorsTrim?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let trimmedReplace: Dynamic = commentAnchorsTrim.replace(/\s+/g, ` `).trim();
    return trimmedReplace.length > options
      ? trimmedReplace.slice(0, options).trimEnd()
      : trimmedReplace;
  });
  (commentAnchorsLimit20 = 20);
  (commentAnchorsLimit0_35 = 0.35);
  (CommentAnchorsWidth = {
    width: commentAnchorsLimit20,
    height: commentAnchorsLimit20,
  });
  (CommentAnchorsWillChange = {
    willChange: `transform`,
    boxShadow: `inset 0 0 0 1px transparent`,
  });
  (CommentAnchorsState3 = null);
  (CommentAnchorsState4 = null);
  (resolveCommentAnchorsValue2 = (
    commentAnchorsValue2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `translateY(${-commentAnchorsValue2 * commentAnchorsLimit20}px)`);
  (CommentAnchorsHour = {
    hour: `numeric`,
    minute: `2-digit`,
  });
  (CommentAnchorsMonth = {
    month: `short`,
    day: `numeric`,
    ...CommentAnchorsHour,
  });
  (CommentAnchorsYear = {
    ...CommentAnchorsMonth,
    year: `numeric`,
  });
  (commentAnchorsMap = new (Map as Dynamic)());
  (updateCommentAnchorsTime = (
    updateCommentAnchorsTime2?: Dynamic,
    timeZone?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let label = `${updateCommentAnchorsTime2 ?? ``}|${timeZone ?? ``}`;
    let commentAnchorsMapEntry: Dynamic = commentAnchorsMap.get(label);
    if (commentAnchorsMapEntry === undefined) {
      commentAnchorsMapEntry = {
        time: new (Intl.DateTimeFormat as Dynamic)(updateCommentAnchorsTime2, {
          ...CommentAnchorsHour,
          timeZone: timeZone,
        }),
        dateTime: new (Intl.DateTimeFormat as Dynamic)(
          updateCommentAnchorsTime2,
          {
            ...CommentAnchorsMonth,
            timeZone: timeZone,
          },
        ),
        dateTimeYear: new (Intl.DateTimeFormat as Dynamic)(
          updateCommentAnchorsTime2,
          {
            ...CommentAnchorsYear,
            timeZone: timeZone,
          },
        ),
      };
      commentAnchorsMap.set(label, commentAnchorsMapEntry);
    }
    return commentAnchorsMapEntry;
  });
  (CommentAnchors_Yesterday = `Yesterday`);
  (CommentAnchors_LeftOpen = `left-open`);
  (resolveCommentAnchorsIssued = (..._extraArguments: unknown[]) => ({
    issued: 0,
    searchesOut: 0,
  }));
  (CommentAnchorsState5 = resolveCommentAnchorsIssued());
  (CommentAnchorsAvatarUrl = {
    id: null,
    name: ``,
    avatarUrl: ``,
  });
  (resolveCommentAnchorsEvery2 = (
    items?: Dynamic,
    items2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    items.length === items2.length &&
    items.every(
      (item?: Dynamic, index?: Dynamic, ..._extraArguments: unknown[]) =>
        item.id === items2[index].id &&
        item.label === items2[index].label &&
        item.photoData === items2[index].photoData &&
        item.photoUrl === items2[index].photoUrl,
    ));
  (resolveCommentAnchorsSplit = (
    commentAnchorsSplit?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => commentAnchorsSplit.split(`?`)[0]);
  (commentAnchorsPattern2 = /[\s-]+/);
  (resolveCommentAnchorsReplace = (
    commentAnchorsReplace?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => commentAnchorsReplace.toLowerCase().replace(/['"‘’“”]/g, ``));
  (filterCommentAnchorsFilter = (
    filterCommentAnchorsFilter2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let filteredCommentAnchorsReplaceParts: Dynamic =
      resolveCommentAnchorsReplace(filterCommentAnchorsFilter2)
        .split(commentAnchorsPattern2)
        .filter(Boolean);
    return filteredCommentAnchorsReplaceParts.length === 0
      ? null
      : [...filterCommentAnchorsFilter2.trim()].length >= 3
        ? (
            filterCommentAnchorsFilter3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let commentAnchorsReplace: Dynamic = resolveCommentAnchorsReplace(
              filterCommentAnchorsFilter3,
            );
            return filteredCommentAnchorsReplaceParts.every(
              (
                filteredCommentAnchorsReplacePart?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic =>
                commentAnchorsReplace.includes(filteredCommentAnchorsReplacePart),
            );
          }
        : (
            filterCommentAnchorsFilter3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let commentAnchorsReplaceParts: Dynamic =
              resolveCommentAnchorsReplace(filterCommentAnchorsFilter3).split(
                commentAnchorsPattern2,
              );
            return filteredCommentAnchorsReplaceParts.every(
              (
                filteredCommentAnchorsReplacePart?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic =>
                commentAnchorsReplaceParts.some(
                  (
                    commentAnchorsReplacePart?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic =>
                    commentAnchorsReplacePart.startsWith(
                      filteredCommentAnchorsReplacePart,
                    ),
                ),
            );
          };
  });
}

export {
  ClaudeTypingIndicator,
  CommentAnchorsAvatarUrl,
  CommentAnchorsState5,
  filterCommentAnchorsFilter,
  isCommentAnchorsPeople,
  loadCommentAnchorsList,
  loadCommentAnchorsValue,
  mapCommentAnchorsKey,
  mapCommentAnchorsPush,
  resolveCommentAnchorsAttrs,
  resolveCommentAnchorsEvery2,
  resolveCommentAnchorsFormat,
  resolveCommentAnchorsIssued,
  resolveCommentAnchorsLast,
  resolveCommentAnchorsOpenedDirectly,
  resolveCommentAnchorsPush,
  resolveCommentAnchorsSplit,
  resolveCommentAnchorsText,
  resolveCommentAnchorsValue,
  resolveCommentAnchorsWhole,
  useCommentAnchorsCurrent,
};
