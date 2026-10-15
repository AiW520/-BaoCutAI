/** BaoCut: comment anchors from index-CX4IZqzA.js. */
import type { JSX } from "../../react-runtime/jsx-runtime";
import type { CapturedProps as CapturedJsxProps } from "../../react-runtime/jsx-runtime";
import type { Dynamic } from "../../interop/legacy-dynamic";
type JsxElementType = JSX.ElementType;
import {
  ArtifactReferenceChip,
  EditorAnchorsAndMentions00100100,
  EditorAnchorsAndMentionsMessage2,
  EditorHostFade,
  EditorHostMessage,
  Link,
  MentionName,
  OverflowTooltip,
  PlatformApiAndAuthPriming,
  PlatformSessionAndSourcesMessage2,
  PlatformSessionAndSourcesSent,
  Tooltip,
  UiOverlaysAndIconsCustomIcon,
  atomChipLabel,
  atomKindOfQuote,
  cellsChipLabel,
  clampAnchorLabel,
  clearCommentsEditorNow,
  commentSummonHost,
  commentsEditorSet,
  isRawAnchorJson,
  isTmpId,
  originalJsxProps,
  preloadModule,
  quoteWords,
  resolveCommentsStorePaint,
  resolveEditorAnchorsAndMentionsEmail,
  resolveEditorAnchorsAndMentionsEmail2,
  resolveEditorAnchorsAndMentionsOther,
  resolveEditorAnchorsAndMentionsPlatform,
  resolveEditorAnchorsAndMentionsRef3,
  resolveObservabilityBrowserAndOperationEventsStartsWith,
  resolvePlatformAnnouncementsValue,
  resolvePlatformApiAndAuthSplit2,
  resolvePlatformApiAndAuthToLowerCase,
  resolvePlatformApiAndAuthUseContext2,
  resolvePlatformLoadingAndStatusCatch,
  resolvePlatformSessionAndSourcesValue,
  threadClosed,
  threadResolved,
  useCommentsActionsAndSelectionPlatform,
  useCommentsEditorUseSyncExternalStore,
} from "../dependencies";
import {
  React,
  jsxRuntime,
  mapPreloadDependencies,
} from "../bootstrap";
import {
  CollaboratorAvatar,
} from "../comment-notifications/create-comment-notice-coordinator";
import {
  CommentAnchorsAvatarUrl,
  filterCommentAnchorsFilter,
  resolveCommentAnchorsEvery2,
  resolveCommentAnchorsIssued,
  resolveCommentAnchorsSplit,
} from "./use-comment-anchors-sheets-component";

function createCommentMentionSearch(
  commentMentionSearch?: Dynamic,
  options?: Dynamic,
  context: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let timeoutMs: Dynamic = context.timeoutMs ?? 8e3;
  let onSearch = (
    items?: Dynamic,
    options2?: Dynamic,
    hits?: Dynamic,
    outcome?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (context.onSearch !== undefined)
      try {
        context.onSearch({
          qlen: items.length,
          ms: Math.max(0, now() - options2),
          hits: hits,
          outcome: outcome,
        });
      } catch {}
  };
  let emptyRetryMs: Dynamic = context.emptyRetryMs ?? 5e3;
  let now: Dynamic = context.now ?? Date.now;
  let maxAsks: Dynamic = context.maxAsks ?? 3e3;
  let poolBare: Dynamic = context.poolBare ?? true;
  let viewerWaitMs: Dynamic = context.viewerWaitMs ?? 1500;
  let revalidateMs: Dynamic = context.revalidateMs ?? 1e3;
  let maxQueries: Dynamic = context.maxQueries ?? 1500;
  let viewerLeadsTyped: Dynamic = context.viewerLeadsTyped ?? true;
  let localBelow: Dynamic = context.localBelow ?? 0;
  let knownAtBare: Dynamic = context.knownAtBare ?? false;
  let lookup: Dynamic = new (Map as Dynamic)();
  let lookup2: Dynamic = new (Map as Dynamic)();
  let lookup3: Dynamic = new (Map as Dynamic)();
  let lookup4: Dynamic = new (Map as Dynamic)();
  let channel: Dynamic = context.channel ?? resolveCommentAnchorsIssued();
  let index = 0;
  let enabled = false;
  let enabled2 = false;
  let createCommentMentionSearchResult: Dynamic;
  let enabled3 = false;
  let enabled4 = false;
  let createCommentMentionSearchResult2: Dynamic = null;
  let race: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
    if (
      createCommentMentionSearchResult2 !== null ||
      context.viewer === undefined
    )
      return Promise.resolve(
        createCommentMentionSearchResult2 ?? CommentAnchorsAvatarUrl,
      );
    let then: Dynamic = context.viewer().then(
      (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        result.id !== null && result.name !== ``
          ? (createCommentMentionSearchResult2 = result)
          : CommentAnchorsAvatarUrl,
      (..._extraArguments: unknown[]) => CommentAnchorsAvatarUrl,
    );
    let promise: Dynamic = new (Promise as Dynamic)(
      (resolve?: Dynamic, ..._extraArguments: unknown[]) =>
        setTimeout(
          (..._extraArguments: unknown[]): Dynamic =>
            resolve(
              createCommentMentionSearchResult2 ?? CommentAnchorsAvatarUrl,
            ),
          viewerWaitMs,
        ),
    );
    return Promise.race([then, promise]);
  };
  let inlinePhoto: Dynamic = context.inlinePhoto;
  let maxPhotoFetches: Dynamic = context.maxPhotoFetches ?? 512;
  let photoRetryMs: Dynamic = context.photoRetryMs ?? 6e4;
  let lookup5: Dynamic = new (Map as Dynamic)();
  let lookup6: Dynamic = new (Map as Dynamic)();
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let index2 = 0;
  let resolveCommentAnchorsSplit2 = (
    commentMentionSearch2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let commentAnchorsSplit: Dynamic = resolveCommentAnchorsSplit(
      commentMentionSearch2,
    );
    if (
      inlinePhoto === undefined ||
      enabled4 ||
      uniqueItems.has(commentAnchorsSplit)
    )
      return;
    let lookupEntry: Dynamic = lookup5.get(commentAnchorsSplit);
    if (typeof lookupEntry != `string`) {
      if (
        !(
          (lookupEntry === null &&
            Date.now() - (lookup6.get(commentAnchorsSplit) ?? 0) <
              photoRetryMs) ||
          index2 >= maxPhotoFetches
        )
      ) {
        index2++;
        uniqueItems.add(commentAnchorsSplit);
        Promise.resolve()
          .then(
            (..._extraArguments: unknown[]): Dynamic =>
              inlinePhoto(commentMentionSearch2),
          )
          .then(
            (result?: unknown, ..._extraArguments: unknown[]) =>
              typeof result == `string` && result.startsWith(`data:`)
                ? result
                : null,
            (..._extraArguments: unknown[]) => null,
          )
          .then(
            (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
              uniqueItems.delete(commentAnchorsSplit);
              if (enabled4) return;
              lookup5.set(commentAnchorsSplit, result);
              if (result === null) {
                lookup6.set(commentAnchorsSplit, Date.now());
                return;
              }
              lookup6.delete(commentAnchorsSplit);
              let resolveCommentAnchorsSplit3 = (
                commentMentionSearch3?: Dynamic,
                ..._extraArguments: unknown[]
              ): undefined => {
                if (
                  commentMentionSearch3.photoUrl !== undefined &&
                  resolveCommentAnchorsSplit(commentMentionSearch3.photoUrl) ===
                    commentAnchorsSplit
                ) {
                  commentMentionSearch3.photoData = result;
                }
              };
              for (let createCommentMentionSearchResult3 of lookup.values() as Dynamic)
                if (createCommentMentionSearchResult3 !== null) {
                  createCommentMentionSearchResult3.forEach(
                    resolveCommentAnchorsSplit3,
                  );
                }
              lookup3.forEach(resolveCommentAnchorsSplit3);
              options();
            },
          );
      }
    }
  };
  let startsWith: Dynamic = (
    commentMentionSearch2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let record: Dynamic = {
      id: commentMentionSearch2.id,
      label: commentMentionSearch2.name,
    };
    let avatarUrl: Dynamic = commentMentionSearch2.avatarUrl;
    if (avatarUrl === ``) return record;
    if (avatarUrl.startsWith(`data:`)) {
      record.photoData = avatarUrl;
      return record;
    }
    record.photoUrl = avatarUrl;
    let lookupEntry: Dynamic = lookup5.get(
      resolveCommentAnchorsSplit(avatarUrl),
    );
    if (typeof lookupEntry == `string`) {
      record.photoData = lookupEntry;
    } else {
      resolveCommentAnchorsSplit2(avatarUrl);
    }
    return record;
  };
  let unshift: Dynamic = (
    commentMentionSearch2?: Dynamic,
    options2?: Dynamic,
    context2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let createCommentMentionSearchHandler2: Dynamic = (
      commentMentionSearch3?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      commentMentionSearch3.isMe ||
      (context2.id !== null && commentMentionSearch3.id === context2.id);
    let mappedItems: Dynamic = (
      commentMentionSearch2 === `` || viewerLeadsTyped
        ? [
            ...options2.filter(createCommentMentionSearchHandler2),
            ...options2.filter(
              (option?: Dynamic, ..._extraArguments: unknown[]) =>
                !createCommentMentionSearchHandler2(option),
            ),
          ]
        : [...options2]
    ).map(startsWith);
    if (
      commentMentionSearch2 === `` &&
      context2.id !== null &&
      context2.name !== `` &&
      !options2.some(createCommentMentionSearchHandler2)
    ) {
      mappedItems.unshift(
        startsWith({
          id: context2.id,
          name: context2.name,
          avatarUrl: context2.avatarUrl,
        }),
      );
    }
    return mappedItems;
  };
  let slice: Dynamic = (
    commentMentionSearch2?: Dynamic,
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let filterCommentAnchorsFilter2: Dynamic = filterCommentAnchorsFilter(
      commentMentionSearch2,
    );
    if (filterCommentAnchorsFilter2 === null) return [...items];
    let lookup7: Dynamic = new (Map as Dynamic)();
    for (let createCommentMentionSearchResult3 of items as Dynamic)
      if (
        filterCommentAnchorsFilter2(createCommentMentionSearchResult3.label)
      ) {
        lookup7.set(
          createCommentMentionSearchResult3.id,
          createCommentMentionSearchResult3,
        );
      }
    for (let createCommentMentionSearchResult3 of lookup3.values() as Dynamic)
      if (
        !lookup7.has(createCommentMentionSearchResult3.id) &&
        filterCommentAnchorsFilter2(createCommentMentionSearchResult3.label)
      ) {
        lookup7.set(
          createCommentMentionSearchResult3.id,
          createCommentMentionSearchResult3,
        );
      }
    let items2: Dynamic = [
      ...(context.known?.() ?? []),
      ...(createCommentMentionSearchResult2
        ? [createCommentMentionSearchResult2]
        : []),
    ];
    for (let createCommentMentionSearchResult3 of items2 as Dynamic)
      if (
        createCommentMentionSearchResult3.id !== null &&
        createCommentMentionSearchResult3.name !== `` &&
        !lookup7.has(createCommentMentionSearchResult3.id) &&
        filterCommentAnchorsFilter2(createCommentMentionSearchResult3.name)
      ) {
        lookup7.set(
          createCommentMentionSearchResult3.id,
          startsWith({
            id: createCommentMentionSearchResult3.id,
            name: createCommentMentionSearchResult3.name,
            avatarUrl: createCommentMentionSearchResult3.avatarUrl,
          }),
        );
      }
    let itemsSlice: Dynamic = [...lookup7.values()].slice(
      0,
      Math.max(12, items.length),
    );
    let id2: Dynamic =
      viewerLeadsTyped && createCommentMentionSearchResult2?.id != null
        ? createCommentMentionSearchResult2.id
        : null;
    if (
      id2 !== null &&
      itemsSlice.some(
        (itemsSlice2?: Dynamic, ..._extraArguments: unknown[]) =>
          itemsSlice2.id === id2,
      )
    ) {
      itemsSlice = [
        ...itemsSlice.filter(
          (itemsSlice2?: Dynamic, ..._extraArguments: unknown[]) =>
            itemsSlice2.id === id2,
        ),
        ...itemsSlice.filter(
          (itemsSlice2?: Dynamic, ..._extraArguments: unknown[]) =>
            itemsSlice2.id !== id2,
        ),
      ];
    }
    let uniqueItems2: Dynamic = new (Set as Dynamic)(
      itemsSlice.map(
        (itemsSlice2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          itemsSlice2.id,
      ),
    );
    return [
      ...itemsSlice,
      ...items.filter(
        (item?: Dynamic, ..._extraArguments: unknown[]) =>
          !uniqueItems2.has(item.id),
      ),
    ];
  };
  let slice2: Dynamic = (
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (!knownAtBare) return [...items];
    let lookup7: Dynamic = new (Map as Dynamic)();
    for (let createCommentMentionSearchResult3 of items as Dynamic)
      lookup7.set(
        createCommentMentionSearchResult3.id,
        createCommentMentionSearchResult3,
      );
    let items2: Dynamic = [
      ...(createCommentMentionSearchResult2
        ? [createCommentMentionSearchResult2]
        : []),
      ...(context.known?.() ?? []),
    ];
    for (let createCommentMentionSearchResult3 of items2 as Dynamic)
      if (
        createCommentMentionSearchResult3.id !== null &&
        createCommentMentionSearchResult3.name !== `` &&
        !lookup7.has(createCommentMentionSearchResult3.id)
      ) {
        lookup7.set(
          createCommentMentionSearchResult3.id,
          startsWith({
            id: createCommentMentionSearchResult3.id,
            name: createCommentMentionSearchResult3.name,
            avatarUrl: createCommentMentionSearchResult3.avatarUrl,
          }),
        );
      }
    return [...lookup7.values()].slice(0, Math.max(12, items.length));
  };
  let slice3: Dynamic = (
    commentMentionSearch2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let filterCommentAnchorsFilter2: Dynamic = filterCommentAnchorsFilter(
      commentMentionSearch2,
    );
    if (filterCommentAnchorsFilter2 === null) return [];
    let itemsSlice: Dynamic = slice(commentMentionSearch2, []);
    let uniqueItems2: Dynamic = new (Set as Dynamic)(
      itemsSlice.map(
        (itemsSlice2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          itemsSlice2.id,
      ),
    );
    let filteredItemsSlice: Dynamic = slice2(lookup.get(``) ?? []).filter(
      (itemsSlice2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        filterCommentAnchorsFilter2(itemsSlice2.label) &&
        !uniqueItems2.has(itemsSlice2.id),
    );
    return [...itemsSlice, ...filteredItemsSlice];
  };
  let race2: Dynamic = (
    commentMentionSearch2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let createCommentMentionSearchResult3: number = ++channel.issued;
    let result: Dynamic = commentMentionSearch(commentMentionSearch2).catch(
      (..._extraArguments: unknown[]): Dynamic => [],
    );
    let race5: Dynamic =
      commentMentionSearch2 === ``
        ? race()
        : Promise.resolve(CommentAnchorsAvatarUrl);
    return {
      n: createCommentMentionSearchResult3,
      rows: Promise.all([result, race5]).then(
        (
          [result2, result3]: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          channel.issued === createCommentMentionSearchResult3
            ? unshift(commentMentionSearch2, result2, result3)
            : null,
      ),
    };
  };
  let createCommentMentionSearchHandler = (
    ..._extraArguments: unknown[]
  ): undefined => {
    if (!(!enabled3 || enabled || enabled2)) {
      enabled3 = false;
      race3();
    }
  };
  let race3 = (..._extraArguments: unknown[]): undefined => {
    if (enabled4 || channel.searchesOut > 0 || index >= maxAsks) return;
    if (enabled || enabled2) {
      enabled3 = true;
      return;
    }
    index++;
    enabled = true;
    if (revalidateMs > 0) {
      enabled2 = true;
      createCommentMentionSearchResult = setTimeout(
        (..._extraArguments: unknown[]): undefined => {
          enabled2 = false;
          createCommentMentionSearchHandler();
        },
        revalidateMs,
      );
    }
    let enabled5 = false;
    let createCommentMentionSearchHandler2 = (
      ..._extraArguments: unknown[]
    ): undefined => {
      if (!enabled5) {
        enabled5 = true;
        enabled = false;
        createCommentMentionSearchHandler();
      }
    };
    let setTimeout2 = setTimeout(createCommentMentionSearchHandler2, timeoutMs);
    let { rows: race5 }: Dynamic = race2(``);
    race5.then((result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      clearTimeout(setTimeout2);
      if (result !== null) {
        if (poolBare)
          for (let createCommentMentionSearchResult3 of result as Dynamic)
            lookup3.set(
              createCommentMentionSearchResult3.id,
              createCommentMentionSearchResult3,
            );
        if (
          !enabled4 &&
          !resolveCommentAnchorsEvery2(lookup.get(``) ?? [], result)
        ) {
          lookup.set(``, result);
          options();
        }
      }
      createCommentMentionSearchHandler2();
    });
  };
  let race4 = (
    commentMentionSearch2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let now2: Dynamic = now();
    if (index >= maxAsks) {
      onSearch(commentMentionSearch2, now2, 0, `spent`);
      return false;
    }
    index++;
    lookup.set(commentMentionSearch2, null);
    channel.searchesOut++;
    let { n: race5, rows: race6 }: Dynamic = race2(commentMentionSearch2);
    lookup4.set(commentMentionSearch2, race5);
    let setTimeout2 = setTimeout((..._extraArguments: unknown[]): undefined => {
      if (
        !(
          lookup4.get(commentMentionSearch2) !== race5 ||
          lookup.get(commentMentionSearch2) !== null
        )
      ) {
        lookup.set(
          commentMentionSearch2,
          commentMentionSearch2 === ``
            ? unshift(
                ``,
                [],
                createCommentMentionSearchResult2 ?? CommentAnchorsAvatarUrl,
              )
            : [],
        );
        if (commentMentionSearch2 !== ``) {
          lookup2.set(commentMentionSearch2, now());
        }
        onSearch(commentMentionSearch2, now2, 0, `timeout`);
        options();
      }
    }, timeoutMs);
    race6.then((items?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      clearTimeout(setTimeout2);
      channel.searchesOut--;
      if (lookup4.get(commentMentionSearch2) !== race5) return;
      lookup4.delete(commentMentionSearch2);
      let lookupEntry: Dynamic = lookup.get(commentMentionSearch2);
      onSearch(
        commentMentionSearch2,
        now2,
        items?.length ?? 0,
        items === null
          ? `superseded`
          : lookupEntry === null
            ? items.length > 0
              ? `ok`
              : `empty`
            : `late`,
      );
      if (items === null) {
        if (lookupEntry !== null) return;
        if (commentMentionSearch2 === ``) {
          lookup.set(
            ``,
            unshift(
              ``,
              [],
              createCommentMentionSearchResult2 ?? CommentAnchorsAvatarUrl,
            ),
          );
        } else {
          lookup.delete(commentMentionSearch2);
        }
        options();
        return;
      }
      if (commentMentionSearch2 !== `` || poolBare)
        for (let createCommentMentionSearchResult3 of items as Dynamic)
          lookup3.set(
            createCommentMentionSearchResult3.id,
            createCommentMentionSearchResult3,
          );
      if (items.length === 0 && commentMentionSearch2 !== ``) {
        lookup2.set(commentMentionSearch2, now());
      } else {
        lookup2.delete(commentMentionSearch2);
      }
      lookup.set(commentMentionSearch2, items);
      options();
    });
    return true;
  };
  return {
    read(
      commentMentionSearch2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let commentMentionSearchSlice: Dynamic = commentMentionSearch2.slice(
        0,
        64,
      );
      let slice4: Dynamic = (
        commentMentionSearch3?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => ({
        hits:
          commentMentionSearchSlice === ``
            ? slice2(commentMentionSearch3 ?? [])
            : slice(commentMentionSearchSlice, commentMentionSearch3 ?? []),
        priming: commentMentionSearch3 === null,
      });
      if (
        commentMentionSearchSlice !== `` &&
        commentMentionSearchSlice.length < localBelow
      ) {
        let hits: Dynamic = slice3(commentMentionSearchSlice);
        onSearch(commentMentionSearchSlice, now(), hits.length, `local`);
        return {
          hits: hits,
          priming: false,
        };
      }
      if (lookup.has(commentMentionSearchSlice)) {
        let lookupEntry: Dynamic =
          lookup.get(commentMentionSearchSlice) ?? null;
        if (commentMentionSearchSlice === `` && lookupEntry !== null) race3();
        else if (
          lookupEntry !== null &&
          lookupEntry.length === 0 &&
          now() - (lookup2.get(commentMentionSearchSlice) ?? 0) >= emptyRetryMs
        )
          return race4(commentMentionSearchSlice)
            ? slice4(null)
            : slice4(lookupEntry);
        return slice4(lookupEntry);
      }
      return lookup.size >= maxQueries
        ? slice4([])
        : race4(commentMentionSearchSlice)
          ? slice4(null)
          : slice4([]);
    },
    dispose(..._extraArguments: unknown[]): undefined {
      enabled4 = true;
      enabled3 = false;
      clearTimeout(createCommentMentionSearchResult);
    },
  };
}

function resolveCommentAnchorsIndexOf(
  items?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (dependencies) return items.length;
  if (context || items.length < 2) return 0;
  let itemIndex: Dynamic = options === null ? -1 : items.indexOf(options);
  return itemIndex === -1 ? items.length - 1 : itemIndex;
}

var resolveCommentAnchorsValue3: Dynamic;

var commentAnchorsSet2: Dynamic;

function clearCommentAnchorsDelete(
  clearCommentAnchorsDelete2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  commentAnchorsSet2.add(clearCommentAnchorsDelete2);
  return (..._extraArguments: unknown[]): undefined => {
    commentAnchorsSet2.delete(clearCommentAnchorsDelete2);
  };
}

function resolveCommentAnchorsDefaultView(
  commentAnchorsDefaultView?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let defaultView: Dynamic = commentAnchorsDefaultView.defaultView;
  return (
    (typeof defaultView?.matchMedia == `function` &&
      defaultView.matchMedia(`(prefers-reduced-motion: reduce)`).matches) ||
    commentAnchorsDefaultView.documentElement.getAttribute(
      `data-reduce-motion`,
    ) === `true`
  );
}

function resolveCommentAnchorsTrim2(
  commentAnchorsTrim2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let trimmedPropertyValue = commentAnchorsTrim2
    ? getComputedStyle(commentAnchorsTrim2)
        .getPropertyValue(`--cds-dur-snap`)
        .trim()
    : ``;
  let number = trimmedPropertyValue.endsWith(`ms`)
    ? Number.parseFloat(trimmedPropertyValue)
    : trimmedPropertyValue.endsWith(`s`)
      ? Number.parseFloat(trimmedPropertyValue) * 1e3
      : NaN;
  return Number.isFinite(number) && number > 0 ? number : 120;
}

var CommentAnchors_Resolved: string;

var CommentAnchors_CommentResolved: string;

var CommentAnchors_CommentResolve: string;

function useCommentAnchorsKey(
  commentAnchorsKey?: Dynamic,
  partPlacement?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let elementRef: Dynamic = (0, React.useRef)(null);
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): undefined => {
      let element: Dynamic = elementRef.current;
      if (element !== null) {
        if (partPlacement !== element.partPlacement) {
          element.moved = true;
        }
        if (commentAnchorsKey) {
          elementRef.current = null;
          if (partPlacement === null || element.moved) {
            resolvePlatformAnnouncementsValue(
              element.doc,
              CommentAnchors_CommentResolved,
              {
                key: CommentAnchors_CommentResolve,
              },
            );
          }
        }
      }
    },
    [commentAnchorsKey, partPlacement],
  );
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): undefined => {
        let element: Dynamic = elementRef.current;
        elementRef.current = null;
        if (element !== null) {
          if (
            !(
              threadClosed(element.threadId, element.pageId) &&
              !threadResolved(element.threadId, element.pageId)
            )
          ) {
            resolvePlatformAnnouncementsValue(
              element.doc,
              CommentAnchors_CommentResolved,
              {
                key: CommentAnchors_CommentResolve,
              },
            );
          }
        }
      },
    [],
  );
  return (0, React.useCallback)(
    (
      doc?: Dynamic,
      threadId?: Dynamic,
      pageId?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      elementRef.current = {
        doc: doc,
        threadId: threadId,
        pageId: pageId,
        partPlacement: partPlacement,
        moved: false,
      };
    },
    [partPlacement],
  );
}

function useCommentResolveMotion(
  {
    threadId: threadId,
    pageId: pageId,
    motion: motion,
    onResolve: onResolve,
    cardRef: cardRef,
    resolved: resolved,
    partPlacement: partPlacement,
  }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [phase, setPhase]: Dynamic = (0, React.useState)(`idle`);
  let [useCommentResolveMotionState, setUseCommentResolveMotionState]: Dynamic =
    (0, React.useState)(null);
  let elementRef: Dynamic = (0, React.useRef)(null);
  let elementRef2: Dynamic = (0, React.useRef)(null);
  let useCommentAnchorsKey2: Dynamic = useCommentAnchorsKey(
    resolved,
    partPlacement,
  );
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): undefined => {
        elementRef.current?.();
        elementRef.current = null;
        let element: Dynamic = elementRef2.current;
        elementRef2.current = null;
        element?.();
      },
    [],
  );
  let start: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): undefined => {
      if (phase !== `idle` || elementRef2.current !== null) return;
      if (onResolve !== undefined && !isTmpId(threadId)) {
        useCommentAnchorsKey2(
          cardRef.current?.ownerDocument ?? document,
          threadId,
          pageId,
        );
      }
      if (motion === undefined || isTmpId(threadId)) {
        onResolve?.(threadId);
        return;
      }
      let card: Dynamic = cardRef.current;
      let reduced: Dynamic = card
        ? resolveCommentAnchorsDefaultView(card.ownerDocument)
        : false;
      let commentAnchorsTrim2 = resolveCommentAnchorsTrim2(card);
      let checkMs = 2 * commentAnchorsTrim2;
      elementRef2.current = async (
        ..._extraArguments: unknown[]
      ): Promise<undefined> => {
        try {
          if (!threadClosed(threadId, pageId)) {
            await onResolve?.(threadId);
          }
        } catch {
        } finally {
          setPhase(`idle`);
          setUseCommentResolveMotionState(null);
        }
      };
      let threadId2 = (..._extraArguments: unknown[]): undefined => {
        elementRef.current = null;
        let element: Dynamic = elementRef2.current;
        elementRef2.current = null;
        element?.();
      };
      let items = reduced
        ? motion === `card`
          ? [[`exit`, commentAnchorsTrim2]]
          : [[null, commentAnchorsTrim2]]
        : motion === `card`
          ? [
              [null, checkMs],
              [`fade`, EditorHostFade.fade],
              [`exit`, EditorHostFade.exit],
              [`collapse`, EditorHostFade.collapse],
            ]
          : [[null, checkMs]];
      let resolveCommentAnchorsValue32: Dynamic = (
        commentResolveMotion?: Dynamic,
        ..._extraArguments: unknown[]
      ) => {
        let itemItem = items[commentResolveMotion];
        if (itemItem === undefined) return threadId2();
        let [itemItem2, setItemItem]: Dynamic = itemItem;
        if (itemItem2 !== null) {
          setPhase(itemItem2);
        }
        if (itemItem2 === `fade`) {
          let height: Dynamic = cardRef.current?.offsetHeight;
          setUseCommentResolveMotionState(
            (
              commentResolveMotion2?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              commentResolveMotion2 === null
                ? commentResolveMotion2
                : {
                    ...commentResolveMotion2,
                    height: height,
                  },
          );
        }
        elementRef.current = resolveCommentAnchorsValue3(
          (..._extraArguments: unknown[]): Dynamic =>
            resolveCommentAnchorsValue32(commentResolveMotion + 1),
          setItemItem,
        );
      };
      setUseCommentResolveMotionState({
        reduced: reduced,
        checkMs: checkMs,
        height: undefined,
      });
      setPhase(`check`);
      resolveCommentAnchorsValue32(0);
      if (motion === `card` && !reduced)
        for (let useCommentResolveMotionResult of commentAnchorsSet2 as Dynamic)
          useCommentResolveMotionResult(threadId);
    },
    [
      phase,
      motion,
      onResolve,
      threadId,
      pageId,
      cardRef,
      useCommentAnchorsKey2,
    ],
  );
  let matchesPhase =
    phase === `fade` || phase === `exit` || phase === `collapse`;
  return {
    phase: phase,
    checkState:
      phase === `idle` || useCommentResolveMotionState === null
        ? `idle`
        : phase === `check` && !useCommentResolveMotionState.reduced
          ? `playing`
          : `done`,
    start: start,
    cardProps:
      phase === `idle` || useCommentResolveMotionState === null
        ? {}
        : {
            "data-rx-phase": phase,
            ...(useCommentResolveMotionState.reduced
              ? {
                  "data-rx-motion": `reduced`,
                }
              : {}),
            ...(matchesPhase
              ? {
                  inert: true,
                }
              : {}),
            style: {
              "--rx-check": `${useCommentResolveMotionState.checkMs}ms`,
              "--rx-fade": `${EditorHostFade.fade}ms`,
              "--rx-exit": `${EditorHostFade.exit}ms`,
              "--rx-ease": EditorHostMessage,
              "--rx-collapse": `${EditorHostFade.collapse}ms`,
              ...(useCommentResolveMotionState.height === undefined
                ? {}
                : {
                    height:
                      phase === `collapse`
                        ? 0
                        : useCommentResolveMotionState.height,
                  }),
            },
          },
  };
}

function UseCommentAnchorsStateComponent(
  { state: state, size: size }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let jsx = (
    <UiOverlaysAndIconsCustomIcon
      name={`Check`}
      customSize={size}
      className={`rx-glyph`}
    />
  );
  return state === `idle` ? (
    jsx
  ) : (
    <span className={`rx-check`} data-state={state}>
      <svg viewBox={`0 0 16 16`} aria-hidden={true}>
        <rect
          className={`rx-square`}
          x={`0.75`}
          y={`0.75`}
          width={`14.5`}
          height={`14.5`}
          rx={`4`}
        />
      </svg>
      {jsx}
    </span>
  );
}

function SummonNote(
  { note: note, onOpen: onOpen, handoff = false, as: as2 }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  // BaoCut: 批注下方「已发给智能体」等状态，独立页面装了 docsHost.comments 时也显示。
  if (!commentSummonHost() || note === undefined) return null;
  let Item: Dynamic = resolveCommentAnchorsValue4(note, handoff)
    ? PlatformSessionAndSourcesMessage2
    : PlatformSessionAndSourcesSent[note];
  let commentAnchorsLastIndexOf: Dynamic = resolveCommentAnchorsValue5(
    note,
    onOpen,
    handoff,
  )
    ? resolveCommentAnchorsLastIndexOf(
        Item,
        note === `no_listener`
          ? CommentAnchors_OpenItInClaude
          : CommentAnchors_YourSession,
      )
    : null;
  return ((
    RenderedComponent2: JsxElementType,
    CapturedProps2: CapturedJsxProps,
  ) => <RenderedComponent2 {...CapturedProps2} />)(
    as2 ?? `div`,
    originalJsxProps({
      ...(as2 === undefined && {
        className: `text-muted text-caption mt-1`,
      }),
      "data-testid": `summon-note`,
      "data-summon-note": note,
      "data-summon-handoff": resolveCommentAnchorsValue4(note, handoff)
        ? ``
        : undefined,
      children:
        commentAnchorsLastIndexOf === null ? (
          Item
        ) : (
          <jsxRuntime.Fragment>
            {commentAnchorsLastIndexOf[0]}
            <Link
              {...originalJsxProps({
                onClick: onOpen,
                ...(note !== `no_listener` && {
                  // BaoCut: 称「agent」，不称 Claude。
                  "aria-label": `Open your agent session`,
                }),
                children: commentAnchorsLastIndexOf[1],
              })}
            />
            {commentAnchorsLastIndexOf[2] || null}
          </jsxRuntime.Fragment>
        ),
    }),
  );
}

function resolveCommentAnchorsLastIndexOf(
  commentAnchorsLastIndex?: Dynamic,
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let lastIndexOf: Dynamic =
    items === `` ? -1 : commentAnchorsLastIndex.lastIndexOf(items);
  return lastIndexOf < 0
    ? null
    : [
        commentAnchorsLastIndex.slice(0, lastIndexOf),
        items,
        commentAnchorsLastIndex.slice(lastIndexOf + items.length),
      ];
}

var CommentAnchors_YourSession: string;

// BaoCut: 链接文字要与 platform-core.tsx 里 no_listener 那条状态文案的结尾一致（称「agent」，不称 Claude）。
var CommentAnchors_OpenItInClaude: string;

function resolveCommentAnchorsValue4(
  commentAnchorsValue4?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    options &&
    commentAnchorsValue4 !== undefined &&
    commentsEditorSet.has(commentAnchorsValue4)
  );
}

function resolveCommentAnchorsValue5(
  commentAnchorsValue5?: Dynamic,
  options?: Dynamic,
  context: Dynamic = false,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    (commentAnchorsValue5 === `needs_user` ||
      commentAnchorsValue5 === `no_listener` ||
      commentAnchorsValue5 === `sign_in` ||
      resolveCommentAnchorsValue4(commentAnchorsValue5, context)) &&
    options !== undefined
  );
}

var resolveCommentAnchorsParse: (commentAnchorsParse?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolveCommentAnchorsActor: Dynamic;

var resolveCommentAnchorsUser: Dynamic;

var resolveCommentAnchorsResolvedBy: (commentAnchorsResolvedBy?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolveCommentAnchorsReplace2: Dynamic;

var resolveCommentAnchorsValue6: Dynamic;

var filterCommentAnchorsJoin: Dynamic;

function resolveCommentAnchorsHover(
  commentAnchorsHover?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let resolveCommentAnchorsHoverResult: Dynamic =
    useCommentsActionsAndSelectionPlatform(
      resolveCommentAnchorsActor(commentAnchorsHover)
        ? null
        : commentAnchorsHover.user,
    );
  return resolveCommentAnchorsHoverResult === undefined
    ? {
        name: ``,
        hover: null,
        loading: true,
      }
    : {
        name: resolveCommentAnchorsUser(
          commentAnchorsHover,
          resolveCommentAnchorsHoverResult?.name,
        ),
        hover: resolveCommentAnchorsActor(commentAnchorsHover)
          ? null
          : resolveEditorAnchorsAndMentionsEmail2(commentAnchorsHover.user),
        loading: false,
      };
}

function AuthorLoading(
  { r: r5, className: className }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let {
    name: commentAnchorsHover,
    hover: content,
    loading: commentAnchorsHover2,
  }: Dynamic = resolveCommentAnchorsHover(r5);
  return commentAnchorsHover2 ? (
    <span
      className={className}
      aria-hidden={`true`}
      data-testid={`author-loading`}
    >
      <span
        className={`bg-alpha-2 inline-block h-2 w-14 animate-pulse rounded align-middle`}
      />
    </span>
  ) : content === null ? (
    <OverflowTooltip className={className}>
      {commentAnchorsHover}
    </OverflowTooltip>
  ) : (
    <Tooltip content={content}>
      <span className={className}>{commentAnchorsHover}</span>
    </Tooltip>
  );
}

function UseCommentAnchorsUserComponent(
  { user: user }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let useCommentAnchorsUserResult = resolveEditorAnchorsAndMentionsOther(user);
  let useCommentAnchorsUserResult2: Dynamic =
    useCommentsActionsAndSelectionPlatform(
      useCommentAnchorsUserResult === `platform` ? user : null,
    );
  let useCommentAnchorsUserResult3: Dynamic =
    resolvePlatformApiAndAuthUseContext2();
  let matchesLocale =
    useCommentAnchorsUserResult3.locale !== undefined ||
    useCommentAnchorsUserResult3.timeZone !== undefined;
  let photoUrl: Dynamic = PlatformApiAndAuthPriming(
    (commentAnchorsUser?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      matchesLocale
        ? undefined
        : resolvePlatformApiAndAuthToLowerCase(commentAnchorsUser, user),
  );
  return useCommentAnchorsUserResult === `email` ? (
    <CollaboratorAvatar
      email={user}
      photoUrl={photoUrl}
      size={20}
      className={`shrink-0`}
    />
  ) : useCommentAnchorsUserResult2 === undefined ? (
    <span
      className={`bg-alpha-2 size-[20px] shrink-0 animate-pulse rounded-full`}
    />
  ) : (
    <CollaboratorAvatar
      email={resolveEditorAnchorsAndMentionsEmail(
        user,
        useCommentAnchorsUserResult2?.name,
      )}
      photoUrl={resolveObservabilityBrowserAndOperationEventsStartsWith(
        useCommentAnchorsUserResult2?.avatarUrl,
        matchesLocale,
      )}
      size={20}
      className={`shrink-0`}
    />
  );
}

// BaoCut: 智能体头像的无障碍名称叫 Agent，不叫 Claude。
function UseCommentAnchorsRoleComponent(
  ..._extraArguments: [Readonly<Record<string, unknown>>?, ...unknown[]]
) {
  return (
    <span
      role={`img`}
      aria-label={`Agent`}
      className={`bg-fill-brand text-on-brand inline-flex size-5 shrink-0 items-center justify-center rounded-full`}
    >
      <svg
        viewBox={EditorAnchorsAndMentions00100100}
        width={12}
        height={12}
        fill={`currentColor`}
        aria-hidden={`true`}
      >
        <path d={EditorAnchorsAndMentionsMessage2} />
      </svg>
    </span>
  );
}

function useCommentAnchorsFlatMap(
  commentAnchorsFlatMap?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let mappedItems = [
        ...new (Set as Dynamic)(
          commentAnchorsFlatMap.flatMap(
            (file?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              [file.root, ...file.replies]
                .filter(
                  (item?: Dynamic, ..._extraArguments: unknown[]) =>
                    !resolveCommentAnchorsActor(item) &&
                    resolveEditorAnchorsAndMentionsOther(item.user) === `email`,
                )
                .map(
                  (
                    filteredItem?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic => filteredItem.user,
                ),
          ),
        ),
      ].map((item?: Dynamic, index?: Dynamic, ..._extraArguments: unknown[]) =>
        setTimeout(
          (..._extraArguments: unknown[]): undefined =>
            void PlatformApiAndAuthPriming.getState().prime(
              resolvePlatformApiAndAuthSplit2(item),
            ),
          index * 250,
        ),
      );
      return (..._extraArguments: unknown[]) =>
        mappedItems.forEach(clearTimeout);
    },
    [commentAnchorsFlatMap],
  );
}

var resolveCommentAnchorsQuote: Dynamic;

var resolveCommentAnchorsReplace3: Dynamic;

var commentAnchorsLimit272: number;

var commentAnchorsLimit56: number;

var CommentAnchors_TextMutedHoverTextSecondaryTextCaptionMt05BlockTextLeft: string;

var CommentAnchors_Styles: string;

var CommentAnchors_Styles2: string;

var CommentAnchors_Styles3: string;

var CommentAnchors_ReplyPosted: string;

// BaoCut: 批注发给智能体后的提示称「agent」，不称 Claude。
var CommentAnchors_SentToClaude: string;

var commentAnchorsLimit202: number;

var CommentAnchorsThen: Dynamic;

function UseCommentAnchorsContainerComponent(
  { container: container, children: children }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let ResultComponent: Dynamic =
    useCommentsEditorUseSyncExternalStore(CommentAnchorsThen)?.default;
  return ResultComponent ? (
    <ResultComponent container={container}>{children}</ResultComponent>
  ) : (
    <div className={`whitespace-pre-wrap`}>
      <UseCommentAnchorsContainer2Component
        container={container}
        body={children}
      />
    </div>
  );
}

function UseCommentAnchorsContainer2Component(
  { container: container, body: body }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let count: number = 0;
  return resolveEditorAnchorsAndMentionsRef3(body).map(
    (entry?: Dynamic, ..._extraArguments: unknown[]) => {
      let label = `@${count}`;
      count +=
        entry.type === `text`
          ? entry.text.length
          : entry.ref.length + (entry.label?.length ?? 0);
      if (entry.type === `text`)
        return (
          <React.Fragment
            {...originalJsxProps(
              {
                children: entry.text,
              },
              label,
            )}
          />
        );
      if (entry.kind === `user`) {
        let dataMentionId: Dynamic = entry.ref.slice(6);
        return (
          <span
            {...originalJsxProps(
              {
                "data-chat-mention": ``,
                "data-mention-id": dataMentionId,
                children:
                  entry.label == null ? (
                    resolveEditorAnchorsAndMentionsPlatform(dataMentionId) ? (
                      <MentionName principal={dataMentionId} />
                    ) : (
                      `@${resolvePlatformSessionAndSourcesValue(dataMentionId)}`
                    )
                  ) : (
                    `@${entry.label}`
                  ),
              },
              label,
            )}
          />
        );
      }
      return (
        <ArtifactReferenceChip
          {...originalJsxProps(
            {
              refStr: entry.ref,
              label: entry.label,
              kind: entry.kind,
              container: container,
            },
            label,
          )}
        />
      );
    },
  );
}

function UseCommentAnchorsExpandedComponent(
  {
    expanded: expanded,
    compact: compact,
    compactPx = commentAnchorsLimit56,
    container: container,
    children: children,
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let compactPx2: Dynamic = compact ? compactPx : commentAnchorsLimit272;
  let [enabledState, setEnabledState]: Dynamic = (0, React.useState)(false);
  let elementRef: Dynamic = (0, React.useRef)(null);
  let [enabledState2, setEnabledState2]: Dynamic = (0, React.useState)(false);
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): undefined => {
      let element: Dynamic = elementRef.current;
      if (element) {
        setEnabledState2(element.scrollHeight > compactPx2 + 8);
      }
    },
    [children, compactPx2],
  );
  let elementRef2: Dynamic = (0, React.useRef)(null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let element: Dynamic = elementRef2.current;
      if (!element || typeof ResizeObserver === "undefined") return;
      let resizeObserver = new ResizeObserver(
        (..._extraArguments: unknown[]): Dynamic =>
          setEnabledState2(element.offsetHeight > compactPx2 + 8),
      );
      resizeObserver.observe(element);
      return (..._extraArguments: unknown[]) => resizeObserver.disconnect();
    },
    [compactPx2],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (!expanded) {
        setEnabledState(false);
      }
    },
    [expanded],
  );
  let enabled = !enabledState && !expanded;
  let enabledState3: Dynamic = enabledState2 && enabled;
  return (
    <div>
      <div
        ref={elementRef}
        data-nonresting={enabledState || undefined}
        style={
          enabled
            ? {
                maxHeight: enabledState3 ? compactPx2 : compactPx2 + 8,
              }
            : undefined
        }
        className={`text-pretty wrap-anywhere [&_code]:break-all [&_pre]:max-w-full [&_pre]:overflow-x-auto ${enabledState3 ? `relative overflow-hidden` : ``}`}
      >
        <div ref={elementRef2}>
          <UseCommentAnchorsContainerComponent container={container}>
            {children}
          </UseCommentAnchorsContainerComponent>
        </div>
        {enabledState3 && (
          <div
            className={`pointer-events-none absolute inset-x-0 bottom-0 ${compact ? `h-4` : `h-8`} bg-gradient-to-t from-[var(--comment-fade-stop,var(--cds-surface-1))] to-transparent`}
          />
        )}
      </div>
      {enabledState2 && !expanded && (
        <button
          type={`button`}
          onClick={(
            commentAnchorsExpanded?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            commentAnchorsExpanded.stopPropagation();
            setEnabledState(
              (
                commentAnchorsExpanded2?: Dynamic,
                ..._extraArguments: unknown[]
              ) => !commentAnchorsExpanded2,
            );
          }}
          className={
            CommentAnchors_TextMutedHoverTextSecondaryTextCaptionMt05BlockTextLeft
          }
        >
          {enabledState ? `Show less` : `Show more`}
        </button>
      )}
    </div>
  );
}

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeCommentAnchorsCreateCommentMentionSearchStep1(): void {
  (resolveCommentAnchorsValue3 = (
    commentAnchorsValue3?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let setTimeout2 = setTimeout(commentAnchorsValue3, options);
    return (..._extraArguments: unknown[]) => clearTimeout(setTimeout2);
  });
  (commentAnchorsSet2 = new (Set as Dynamic)());
  (CommentAnchors_Resolved = `Resolved`);
  (CommentAnchors_CommentResolved = `Comment resolved`);
  (CommentAnchors_CommentResolve = `comment-resolve`);
  (CommentAnchors_YourSession = `your session`);
  (CommentAnchors_OpenItInClaude = `open your agent session`);
  (resolveCommentAnchorsParse = (
    commentAnchorsParse?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let max = Math.max(1, (options - Date.parse(commentAnchorsParse)) / 1e3);
    return max < 60
      ? `now`
      : max < 3600
        ? `${Math.floor(max / 60)}m`
        : max < 86400
          ? `${Math.floor(max / 3600)}h`
          : `${Math.floor(max / 86400)}d`;
  });
  (resolveCommentAnchorsActor = (
    commentAnchorsActor?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => commentAnchorsActor.actor?.startsWith(`agent`));
  (resolveCommentAnchorsUser = (
    commentAnchorsUser?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveCommentAnchorsActor(commentAnchorsUser)
      ? // BaoCut: 智能体（actor 以 agent 开头）写的批注显示的作者名
        `Agent`
      : resolveEditorAnchorsAndMentionsEmail(commentAnchorsUser.user, options));
  (resolveCommentAnchorsResolvedBy = (
    commentAnchorsResolvedBy?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (commentAnchorsResolvedBy.resolvedBy === undefined) return `Reopen`;
    let resolveCommentAnchorsResolvedByResult: Dynamic =
      resolvePlatformSessionAndSourcesValue(
        commentAnchorsResolvedBy.resolvedBy.user,
      );
    // BaoCut: 智能体关掉的批注上的说明称「the agent」，不称 Claude。
    return commentAnchorsResolvedBy.resolvedBy.actor.startsWith(`agent`)
      ? resolveCommentAnchorsResolvedByResult === ``
        ? `Resolved by the agent · Reopen`
        : `Resolved by the agent (for ${resolveCommentAnchorsResolvedByResult}) · Reopen`
      : resolveCommentAnchorsResolvedByResult === ``
        ? `Reopen`
        : `Resolved by ${resolveCommentAnchorsResolvedByResult} · Reopen`;
  });
  (resolveCommentAnchorsReplace2 = (
    commentAnchorsReplace2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let commentAnchorsResolvedBy = resolveCommentAnchorsResolvedBy(
      commentAnchorsReplace2,
    );
    return commentAnchorsResolvedBy === `Reopen`
      ? CommentAnchors_Resolved
      : commentAnchorsResolvedBy.replace(/ · Reopen$/, ``);
  });
  (resolveCommentAnchorsValue6 = (
    commentAnchorsValue6?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    commentAnchorsValue6.via === `claude` &&
    !resolveCommentAnchorsActor(commentAnchorsValue6));
  (filterCommentAnchorsJoin = (
    filterCommentAnchorsJoin2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    [
      // BaoCut: 经智能体发的批注的署名称「the agent」，不称 Claude。
      resolveCommentAnchorsValue6(filterCommentAnchorsJoin2) && `via the agent`,
      filterCommentAnchorsJoin2.session_author?.name,
      filterCommentAnchorsJoin2.session_author?.model,
      filterCommentAnchorsJoin2.edited && `(edited)`,
    ]
      .filter(Boolean)
      .join(` · `) || null);
  (resolveCommentAnchorsQuote = (
    commentAnchorsQuote?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let label: Dynamic = isRawAnchorJson(commentAnchorsQuote.quote?.exact)
      ? ``
      : (commentAnchorsQuote.quote?.exact ?? ``);
    return commentAnchorsQuote.atomAnchor
      ? atomChipLabel(atomKindOfQuote(label) ?? `image`)
      : quoteWords(label) ||
          (commentAnchorsQuote.cells === undefined
            ? isRawAnchorJson(commentAnchorsQuote.anchorWas)
              ? ``
              : clampAnchorLabel(commentAnchorsQuote.anchorWas) ||
                (commentAnchorsQuote.anchor?.kind === `html`
                  ? commentAnchorsQuote.anchor.block
                  : `(deleted)`)
            : cellsChipLabel(commentAnchorsQuote.cells));
  });
  (resolveCommentAnchorsReplace3 = (
    commentAnchorsReplace3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    commentAnchorsReplace3.replace(
      /\n(?=\n)/g,
      `
\xA0`,
    ));
  (commentAnchorsLimit272 = 272);
  (commentAnchorsLimit56 = 56);
  (CommentAnchors_TextMutedHoverTextSecondaryTextCaptionMt05BlockTextLeft = `text-muted hover:text-secondary text-caption mt-0.5 block text-left`);
  (CommentAnchors_Styles = `opacity-0 transition group-focus-within/row:opacity-100 group-hover/row:opacity-100 focus-visible:opacity-100 data-[popup-open]:opacity-100`);
  (CommentAnchors_Styles2 = `pointer-events-none absolute inset-y-0 flex items-center gap-0.5 ps-8 opacity-0 [--fade:var(--comment-fade-stop,var(--cds-surface-1))] [--tint:var(--comment-hover-tint,transparent)] bg-[linear-gradient(to_right,transparent,var(--tint)_30%),linear-gradient(to_right,transparent,var(--fade)_30%)] rtl:bg-[linear-gradient(to_left,transparent,var(--tint)_30%),linear-gradient(to_left,transparent,var(--fade)_30%)] group-hover/row:opacity-100 group-hover/row:*:pointer-events-auto has-[:focus-visible]:opacity-100 has-[:focus-visible]:*:pointer-events-auto has-[[data-popup-open]]:opacity-100 has-[[data-popup-open]]:*:pointer-events-auto pointer-coarse:static pointer-coarse:bg-none pointer-coarse:ps-0 pointer-coarse:opacity-100 pointer-coarse:*:pointer-events-auto`);
  (CommentAnchors_Styles3 = `flex min-w-0 shrink-[9999] overflow-hidden text-clip after:w-4 after:shrink-0 [mask-image:linear-gradient(to_left,transparent,#000_16px)] rtl:[mask-image:linear-gradient(to_right,transparent,#000_16px)]`);
  (CommentAnchors_ReplyPosted = `Reply posted`);
  (CommentAnchors_SentToClaude = `Sent to agent`);
  (commentAnchorsLimit202 = 20);
  (CommentAnchorsThen = clearCommentsEditorNow(
    resolvePlatformLoadingAndStatusCatch(
      (..._extraArguments: unknown[]): Dynamic =>
        resolveCommentsStorePaint().then(
          (..._extraArguments: unknown[]): Dynamic =>
            preloadModule(
              (..._extraArguments: unknown[]): Dynamic =>
                import("../../markdown/chat").then(
                  (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                    result.t,
                ),
              mapPreloadDependencies([5, 1, 2, 6, 0, 3, 7, 8, 9]),
              import.meta.url,
            ),
        ),
    ),
  ));
}

export {
  AuthorLoading,
  CommentAnchors_ReplyPosted,
  CommentAnchors_Resolved,
  CommentAnchors_SentToClaude,
  CommentAnchors_Styles,
  CommentAnchors_Styles2,
  CommentAnchors_Styles3,
  CommentAnchors_TextMutedHoverTextSecondaryTextCaptionMt05BlockTextLeft,
  SummonNote,
  UseCommentAnchorsContainerComponent,
  UseCommentAnchorsExpandedComponent,
  UseCommentAnchorsRoleComponent,
  UseCommentAnchorsStateComponent,
  UseCommentAnchorsUserComponent,
  clearCommentAnchorsDelete,
  commentAnchorsLimit202,
  createCommentMentionSearch,
  filterCommentAnchorsJoin,
  resolveCommentAnchorsActor,
  resolveCommentAnchorsHover,
  resolveCommentAnchorsIndexOf,
  resolveCommentAnchorsParse,
  resolveCommentAnchorsQuote,
  resolveCommentAnchorsReplace2,
  resolveCommentAnchorsReplace3,
  resolveCommentAnchorsResolvedBy,
  resolveCommentAnchorsUser,
  useCommentAnchorsFlatMap,
  useCommentAnchorsKey,
  useCommentResolveMotion,
};
