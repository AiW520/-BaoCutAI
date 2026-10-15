/** BaoCut: comments editor from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  Editor,
  Extension,
  Fragment,
  Node2,
  Plugin,
  PluginKey,
  React,
  Slice,
  inFrame,
  mergeAttributes,
  preloadTImport,
  useAtomValue,
} from "../../platform/dependencies";
import {
  lazyZod,
} from "../../platform/data/lazy-zod";
import {
  EditorAnchorsAndMentionsRefchip,
  isEditorAnchorsAndMentionsTextPlain,
  resolveEditorAnchorsAndMentionsValue10,
  resolveEditorAnchorsAndMentionsValue13,
} from "../../prose-editor/platform/anchors-and-mentions-1";
import {
  clearPlatformLoadingAndStatusDelete,
  isPlatformLoadingAndStatusWokeAt,
  resolvePlatformLoadingAndStatusName,
  resolvePlatformLoadingAndStatusOnline,
} from "../../platform/services/loading-and-status";
import {
  resolvePlatformChunkLoadingDescription2,
} from "../../platform/services/chunk-loading";
import {
  ObservabilityBrowserAndOperationEventsAvatarUrl,
  resolveObservabilityBrowserAndOperationEventsTest9,
} from "../../platform/observability/browser-and-operation-events-2";
import {
  frameLane,
  frameViewer,
  subscribeFrameCommentable,
  subscribeFrameViewerClass,
  subscribeFrameViewerRole,
  subscribeFrameWritable,
} from "../../platform/observability/browser-and-operation-events-3";
import {
  api,
} from "../../platform/services/api-and-auth-1";
import {
  apiFetcher,
  collectPlatformApiAndAuthVerb,
  liveDoor,
  resolvePlatformApiAndAuthUseContext2,
  updatePlatformApiAndAuthTopic2,
} from "../../platform/services/api-and-auth-2";
import {
  subscribeProjectFeed,
} from "../../platform/services/api-and-auth-5";
import {
  EMOJI_OK,
  QUICK_EMOJI,
} from "../../platform/data/model-schemas-3";
import {
  updateDataModelSchemasBid,
} from "../../platform/data/model-schemas-4";
import {
  liveScope,
} from "../../platform/data/operation-engine-4";
import {
  _resetFold,
  applyFrame,
} from "./store-1";
import {
  CommentsStoreANCHORGONECARDWORDS,
} from "./store-2";
import {
  COMPOSE_BOX_ID,
  DRAFT_BOX_ID,
  isTmpId,
  outboxRowsAreDurable,
  threadClosed,
} from "./store-4";
import {
  useCommentStore,
} from "./store-3";
import {
  getCommentsActionsAndSelectionRef,
  resolveCommentsActionsAndSelectionStand,
  resolveCommentsActionsAndSelectionValue10,
  updateCommentsActionsAndSelectionStand,
} from "./actions-and-selection";

function resolveCommentsEditorLen(
  commentsEditorLen?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  if (!Array.isArray(commentsEditorLen)) return items;
  for (let resolveCommentsEditorLenResult of commentsEditorLen as Dynamic) {
    if (
      !resolveCommentsEditorLenResult ||
      typeof resolveCommentsEditorLenResult != `object` ||
      items.length >= 2e4
    )
      continue;
    let commentsActionsAndSelectionValue10: Dynamic =
      resolveCommentsActionsAndSelectionValue10(
        resolveCommentsEditorLenResult.id,
      );
    let len: Dynamic = resolveCommentsEditorLenResult.len;
    if (
      commentsActionsAndSelectionValue10 &&
      typeof len == `number` &&
      Number.isInteger(len) &&
      len > 0
    ) {
      items.push({
        ...commentsActionsAndSelectionValue10,
        len: len,
      });
    }
  }
  return items;
}

function isCommentsEditorRank(..._extraArguments: unknown[]): Dynamic {
  let map: Dynamic = new (Map as Dynamic)();
  let lookup: Dynamic = new (Map as Dynamic)();
  let index = 0;
  let isCommentsEditorRankHandler: Dynamic = (
    ..._extraArguments: unknown[]
  ): number => index++;
  let hear: Dynamic = (
    commentsEditorRank?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (commentsEditorRank.t === `snapshot`) {
      let commentsEditorRank2: Dynamic = commentsEditorRank;
      let matchesPartial =
        commentsEditorRank2.partial !== true &&
        commentsEditorRank2.whole !== false;
      let uniqueItems: Dynamic = matchesPartial
        ? new (Set as Dynamic)(map.keys())
        : null;
      if (matchesPartial) {
        map.clear();
        lookup.clear();
      }
      let enabled = false;
      for (let ask of updateDataModelSchemasBid(
        commentsEditorRank2.docJson,
        commentsEditorRank2.blocks,
      ) as Dynamic) {
        let mapEntry: Dynamic = map.get(ask.bid);
        if (mapEntry === undefined && !uniqueItems?.has(ask.bid)) {
          enabled = true;
        }
        map.set(ask.bid, {
          rank: mapEntry?.rank ?? isCommentsEditorRankHandler(),
          size: ask.size,
          text: ask.text,
        });
      }
      if (Array.isArray(commentsEditorRank2.blocks))
        for (let ask of commentsEditorRank2.blocks as Dynamic)
          if (
            ask &&
            typeof ask == `object` &&
            resolveObservabilityBrowserAndOperationEventsTest9(ask.bid)
          ) {
            lookup.set(ask.bid, resolveCommentsEditorLen(ask.runs));
          }
      if (
        commentsEditorRank2.gone === true &&
        typeof commentsEditorRank2.block == `string` &&
        map.delete(commentsEditorRank2.block)
      ) {
        lookup.delete(commentsEditorRank2.block);
        enabled = true;
      }
      return enabled || (uniqueItems !== null && uniqueItems.size !== map.size);
    }
    if (commentsEditorRank.t === `ack`) {
      let commentsEditorRank2: Dynamic = commentsEditorRank;
      return commentsEditorRank2.provisional === true ||
        typeof commentsEditorRank2.rev != `number` ||
        commentsEditorRank2.rev < 0
        ? false
        : updateCommentsActionsAndSelectionStand2(
            commentsEditorRank2.results,
            undefined,
          );
    }
    if (commentsEditorRank.t === `row`) {
      let row: Dynamic = commentsEditorRank.row;
      return row
        ? updateCommentsActionsAndSelectionStand2(row.results, row.ops)
        : false;
    }
    return false;
  };
  let updateCommentsActionsAndSelectionStand2: Dynamic = (
    commentsEditorRank?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let commentsActionsAndSelectionStand: Dynamic =
      resolveCommentsActionsAndSelectionStand(commentsEditorRank, options);
    if (
      commentsActionsAndSelectionStand.stand.some(
        (stand?: Dynamic, ..._extraArguments: unknown[]) => !map.has(stand),
      ) ||
      commentsActionsAndSelectionStand.retired.some(
        (retired?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          map.has(retired),
      )
    )
      for (let isCommentsEditorRankResult of [
        ...commentsActionsAndSelectionStand.stand,
        ...commentsActionsAndSelectionStand.retired,
      ] as Dynamic)
        lookup.delete(isCommentsEditorRankResult);
    return updateCommentsActionsAndSelectionStand(
      map,
      commentsEditorRank,
      options,
      isCommentsEditorRankHandler,
      commentsActionsAndSelectionStand,
    );
  };
  return {
    map: map,
    hear: hear,
    blockOfChar: (
      commentsEditorRank?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let commentsActionsAndSelectionValue10: Dynamic =
        resolveCommentsActionsAndSelectionValue10(commentsEditorRank);
      if (commentsActionsAndSelectionValue10 === null) return null;
      for (let [
        isCommentsEditorRankResult,
        isCommentsEditorRankResult2,
      ] of lookup as Dynamic)
        if (map.has(isCommentsEditorRankResult)) {
          for (let isCommentsEditorRankResult3 of isCommentsEditorRankResult2 as Dynamic)
            if (
              isCommentsEditorRankResult3.sess ===
                commentsActionsAndSelectionValue10.sess &&
              commentsActionsAndSelectionValue10.i >=
                isCommentsEditorRankResult3.i &&
              commentsActionsAndSelectionValue10.i <
                isCommentsEditorRankResult3.i + isCommentsEditorRankResult3.len
            )
              return isCommentsEditorRankResult;
        }
      return null;
    },
  };
}

function resolveCommentsEditorAvailable(
  commentsEditorAvailable?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return commentsEditorAvailable === `available`
    ? true
    : commentsEditorAvailable === `unknown`
      ? options
      : false;
}

function loadCommentsEditorNow(
  commentsEditorNow?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let enabled: boolean = false;
  let enabled2 = false;
  let loadCommentsEditorNowResult: Dynamic = null;
  let enabled3 = false;
  let count: number = 0;
  let loadCommentsEditorNowResult2: Dynamic = null;
  let loadCommentsEditorNowHandler = (
    ..._extraArguments: unknown[]
  ): undefined => {
    if (enabled) {
      enabled = false;
      commentsEditorNow.apply(false);
    }
  };
  let result: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
    loadCommentsEditorNowResult === null
      ? ((loadCommentsEditorNowResult = (async (
          ..._extraArguments: unknown[]
        ): Promise<undefined> => {
          do {
            enabled3 = false;
            let count2: Dynamic = count;
            let ask: Dynamic = await commentsEditorNow.ask();
            if (enabled2) return;
            if (count2 !== count) {
              enabled3 = true;
              continue;
            }
            commentsEditorNow.heard?.(ask);
            let commentsEditorAvailable: Dynamic =
              resolveCommentsEditorAvailable(ask, enabled);
            if (commentsEditorAvailable !== enabled) {
              enabled = commentsEditorAvailable;
              commentsEditorNow.apply(enabled);
            }
          } while (enabled3);
        })().finally((..._extraArguments: unknown[]): undefined => {
          loadCommentsEditorNowResult = null;
        })),
        loadCommentsEditorNowResult)
      : ((enabled3 = true), loadCommentsEditorNowResult);
  let dispose = (..._extraArguments: unknown[]): undefined => {
    enabled2 = true;
    loadCommentsEditorNowResult2?.();
    loadCommentsEditorNowResult2 = null;
  };
  return {
    now: (..._extraArguments: unknown[]): Dynamic =>
      enabled2 ? Promise.resolve() : result(),
    soon: (..._extraArguments: unknown[]): undefined => {
      if (!(enabled2 || loadCommentsEditorNowResult2 !== null)) {
        loadCommentsEditorNowResult2 = commentsEditorNow.wait(
          (..._extraArguments: unknown[]): undefined => {
            loadCommentsEditorNowResult2 = null;
            if (!enabled2) {
              result();
            }
          },
          250,
        );
      }
    },
    standDown: (..._extraArguments: unknown[]): undefined => {
      if (!enabled2) {
        count += 1;
        loadCommentsEditorNowHandler();
      }
    },
    ask: async (..._extraArguments: unknown[]): Promise<Dynamic> => {
      let count2: Dynamic = count;
      let pressAsk: Dynamic = await (
        commentsEditorNow.pressAsk ?? commentsEditorNow.ask
      )();
      if (enabled2 || count2 !== count) return pressAsk;
      commentsEditorNow.heard?.(pressAsk);
      let commentsEditorAvailable: Dynamic = resolveCommentsEditorAvailable(
        pressAsk,
        enabled,
      );
      if (commentsEditorAvailable !== enabled) {
        enabled = commentsEditorAvailable;
        commentsEditorNow.apply(enabled);
      }
      return pressAsk;
    },
    retire: (..._extraArguments: unknown[]): undefined => {
      if (!enabled2) {
        dispose();
        loadCommentsEditorNowHandler();
      }
    },
    dispose: dispose,
  };
}

var commentsEditorSet: Dynamic;

function resolveCommentsEditorFailed(..._extraArguments: unknown[]): Dynamic {
  let cls: Dynamic = null;
  let count: number = 0;
  return {
    failed(
      commentsEditorFailed?: Dynamic,
      ..._extraArguments: unknown[]
    ): number {
      return commentsEditorSet.has(commentsEditorFailed)
        ? ((count = cls === commentsEditorFailed ? count + 1 : 1),
          (cls = commentsEditorFailed),
          count)
        : ((cls = null), (count = 0), 0);
    },
    reset(..._extraArguments: unknown[]): undefined {
      cls = null;
      count = 0;
    },
    get standing(): Dynamic {
      return {
        cls: cls,
        n: count,
      };
    },
  };
}

var resolveCommentsEditorValue: Dynamic;

function updateCommentsEditorFailed(
  updateCommentsEditorFailed2: Dynamic = 64,
  ..._extraArguments: unknown[]
): Dynamic {
  let lookup: Dynamic = new (Map as Dynamic)();
  return {
    failed(
      updateCommentsEditorFailed3?: Dynamic,
      reason?: Dynamic,
      agentRows?: Dynamic,
      dependencies?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      for (
        lookup.delete(updateCommentsEditorFailed3),
          lookup.set(updateCommentsEditorFailed3, {
            reason: reason,
            agentRows: agentRows,
            at: dependencies,
            sentBetween: false,
          });
        lookup.size > updateCommentsEditorFailed2;

      )
        lookup.delete(lookup.keys().next().value);
    },
    sent(request?: Dynamic, ..._extraArguments: unknown[]): undefined {
      let lookupEntry: Dynamic = lookup.get(request);
      if (lookupEntry !== undefined) {
        lookupEntry.sentBetween = true;
      }
    },
    answered(
      updateCommentsEditorFailed3?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let lookupEntry: Dynamic = lookup.get(updateCommentsEditorFailed3);
      return lookupEntry === undefined || options <= lookupEntry.agentRows
        ? null
        : (lookup.delete(updateCommentsEditorFailed3),
          {
            reason_before: lookupEntry.reason,
            sent_between: lookupEntry.sentBetween,
            ms: Math.max(0, Math.round(context - lookupEntry.at)),
          });
    },
    forget(
      updateCommentsEditorFailed3?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      lookup.delete(updateCommentsEditorFailed3);
    },
    get size(): Dynamic {
      return lookup.size;
    },
    has: (
      updateCommentsEditorFailed3?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => lookup.has(updateCommentsEditorFailed3),
    clear: (..._extraArguments: unknown[]): Dynamic => lookup.clear(),
  };
}

var CommentsEditorState: number;

var CommentsEditorState2: number;

function resolveCommentsEditorAdmit(
  commentsEditorAdmit: Dynamic = CommentsEditorState,
  options: Dynamic = CommentsEditorState2,
  ..._extraArguments: unknown[]
): Dynamic {
  let resolveCommentsEditorAdmitResult: Dynamic = null;
  let count: number = 0;
  let count2: number = 0;
  return {
    admit(
      commentsEditorAdmit2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      if (
        resolveCommentsEditorAdmitResult !== null &&
        commentsEditorAdmit2 - count < commentsEditorAdmit &&
        commentsEditorAdmit2 - resolveCommentsEditorAdmitResult < options
      ) {
        count = commentsEditorAdmit2;
        count2 += 1;
        return {
          say: false,
        };
      }
      resolveCommentsEditorAdmitResult = commentsEditorAdmit2;
      count = commentsEditorAdmit2;
      let count3: Dynamic = count2 + 1;
      count2 = 0;
      return {
        say: true,
        count: count3,
      };
    },
    replied(..._extraArguments: unknown[]): undefined {
      resolveCommentsEditorAdmitResult = null;
    },
    get held(): number {
      return count2;
    },
    get open() {
      return resolveCommentsEditorAdmitResult !== null;
    },
  };
}

var resolveCommentsEditorToClaude: Dynamic;

function updateCommentsEditorLanded(..._extraArguments: unknown[]): Dynamic {
  let lookup: Dynamic = new (Map as Dynamic)();
  return {
    landed: (
      updateCommentsEditorLanded2?: Dynamic,
      options?: unknown,
      ..._extraArguments: unknown[]
    ): undefined => {
      lookup.delete(updateCommentsEditorLanded2);
      if (
        !(
          typeof options != `number` ||
          !Number.isFinite(options) ||
          options < 0
        )
      ) {
        lookup.set(updateCommentsEditorLanded2, options);
        if (lookup.size > 64) {
          lookup.delete(lookup.keys().next().value);
        }
      }
    },
    take: (
      updateCommentsEditorLanded2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): number | undefined => {
      let lookupEntry: Dynamic = lookup.get(updateCommentsEditorLanded2);
      lookup.delete(updateCommentsEditorLanded2);
      if (lookupEntry === undefined || !Number.isFinite(options)) return;
      let difference: number = options - lookupEntry;
      return difference >= 0 && difference <= 6e4 ? difference : undefined;
    },
    size: (..._extraArguments: unknown[]): Dynamic => lookup.size,
    clear: (..._extraArguments: unknown[]): Dynamic => lookup.clear(),
  };
}

function useCommentsEditorThen(..._extraArguments: unknown[]): Dynamic {
  let [
    ObservabilityBrowserAndOperationEventsAvatarUrlState,
    setObservabilityBrowserAndOperationEventsAvatarUrlState,
  ]: Dynamic = (0, React.useState)(
    ObservabilityBrowserAndOperationEventsAvatarUrl,
  );
  (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    if (!inFrame()) return;
    let enabled = true;
    frameViewer().then(
      (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        if (enabled) {
          setObservabilityBrowserAndOperationEventsAvatarUrlState(result);
        }
      },
    );
    return (..._extraArguments: unknown[]): undefined => {
      enabled = false;
    };
  }, []);
  return ObservabilityBrowserAndOperationEventsAvatarUrlState;
}

var CommentsEditorCoworkerObservers: string;

function resolveCommentsEditorKind(
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return items.startsWith(`cc:`) && items.length > 3
    ? {
        kind: `cc`,
        sessionId: items.slice(3),
      }
    : items.startsWith(`cw:`) && items.length > 3
      ? {
          kind: `cw`,
          did: items.slice(3),
        }
      : {
          kind: `person`,
          id: items,
        };
}

var CommentsEditorGrantItEditorAccessFromTheShareDialog: string;

var resolveCommentsEditorSlice: (commentsEditorSlice?: Dynamic, ..._extraArguments: unknown[]) => string;

function resolveCommentsEditorChannelName(
  commentsEditorChannelName?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return commentsEditorChannelName.channelName
    ? commentsEditorChannelName.channelName.startsWith(`#`)
      ? commentsEditorChannelName.channelName
      : `#${commentsEditorChannelName.channelName}`
    : commentsEditorChannelName.label
      ? commentsEditorChannelName.label
      : `coworker …${commentsEditorChannelName.did.slice(-6)}`;
}

function filterCommentsEditorLabel(
  filterCommentsEditorLabel2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!context.enabled || context.capped) return [];
  let normalizedOptions: Dynamic = options.toLowerCase();
  return filterCommentsEditorLabel2
    .filter(
      (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        resolveCommentsEditorChannelName(rolldownNImport2)
          .toLowerCase()
          .includes(normalizedOptions),
    )
    .slice(0, 6)
    .map(
      (
        filteredRolldownNImportSlice?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => ({
        id: `cw:${filteredRolldownNImportSlice.did}`,
        label: resolveCommentsEditorChannelName(filteredRolldownNImportSlice),
        handle: `Coworker ${resolveCommentsEditorSlice(filteredRolldownNImportSlice.did)}`,
      }),
    );
}

function resolveCommentsEditorSlice2(
  items?: Dynamic,
  items2?: Dynamic,
  context: Dynamic = 6,
  dependencies: Dynamic = 2,
  ..._extraArguments: unknown[]
): Dynamic {
  let min = Math.min(
    items.length,
    context - Math.min(items2.length, dependencies),
  );
  return [...items.slice(0, min), ...items2.slice(0, context - min)];
}

function resolveCommentsEditorSessions(
  commentsEditorSessions?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return options
    ? commentsEditorSessions.startsWith(`cc:`)
      ? `Sessions`
      : commentsEditorSessions.startsWith(`cw:`)
        ? `Coworkers`
        : `People`
    : null;
}

function resolveCommentsEditorChannel(
  commentsEditorChannel?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return options && commentsEditorChannel.channel
    ? `${commentsEditorChannel.label}|${commentsEditorChannel.channel.replace(/^#/, ``).toLowerCase()}`
    : commentsEditorChannel.label;
}

function resolveCommentsEditorLine(
  commentsEditorLine?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return options && commentsEditorLine.channel
    ? {
        line: commentsEditorLine.channel.startsWith(`#`)
          ? commentsEditorLine.channel
          : `#${commentsEditorLine.channel}`,
        via: commentsEditorLine.label,
      }
    : {
        line: commentsEditorLine.label,
      };
}

function resolveCommentsEditorIncludes(
  commentsEditorIncludes?: unknown,
  ..._extraArguments: unknown[]
) {
  return typeof commentsEditorIncludes == `string` &&
    QUICK_EMOJI.includes(commentsEditorIncludes)
    ? commentsEditorIncludes
    : undefined;
}

var commentsEditorPattern: RegExp;

function resolveCommentsEditorTrim(
  commentsEditorTrim?: unknown,
  ..._extraArguments: unknown[]
) {
  if (typeof commentsEditorTrim != `string`) return null;
  let trimmedCommentsEditorTrim = commentsEditorTrim.trim();
  return trimmedCommentsEditorTrim === `` ||
    trimmedCommentsEditorTrim.length > 64
    ? null
    : EMOJI_OK.test(trimmedCommentsEditorTrim) &&
        commentsEditorPattern.test(trimmedCommentsEditorTrim)
      ? trimmedCommentsEditorTrim
      : null;
}

function isCommentsEditorComment(
  file?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (file.reactionOnly || file.replies.length > 0) return false;
  let kind: Dynamic = file.root.kind;
  return kind !== undefined && kind !== `comment`
    ? false
    : resolveCommentsEditorTrim(file.root.body) !== null;
}

var resolveCommentsEditorReactionOnly: Dynamic;

function resolveCommentsEditorAgent(
  file?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (file.root.reactions?.[options] ?? []).some(
    (reactionItem?: Dynamic, ..._extraArguments: unknown[]) =>
      reactionItem.user === file.root.user &&
      !reactionItem.actor.startsWith(`agent`),
  );
}

function filterCommentsEditorEmoji(
  file?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let commentsEditorTrim = file.reactionOnly
    ? null
    : resolveCommentsEditorTrim(file.root.body);
  if (commentsEditorTrim === null) return null;
  let filterCommentsEditorEmojiResult: Dynamic = null;
  for (let [emoji, filterCommentsEditorEmojiResult2] of Object.entries(
    file.root.reactions ?? {},
  ) as Dynamic) {
    if (emoji === commentsEditorTrim) continue;
    let filteredFilterCommentsEditorEmojiResult: Dynamic =
      filterCommentsEditorEmojiResult2.filter(
        (
          filterCommentsEditorEmojiResult3?: Dynamic,
          ..._extraArguments: unknown[]
        ) =>
          filterCommentsEditorEmojiResult3.user === file.root.user &&
          !filterCommentsEditorEmojiResult3.actor.startsWith(`agent`),
      );
    if (filteredFilterCommentsEditorEmojiResult.length !== 0) {
      if (
        filteredFilterCommentsEditorEmojiResult.some(
          (
            filteredFilterCommentsEditorEmojiResult2?: Dynamic,
            ..._extraArguments: unknown[]
          ) => filteredFilterCommentsEditorEmojiResult2.id !== undefined,
        ) &&
        resolveCommentsEditorTrim(emoji) === emoji
      )
        return {
          emoji: emoji,
          ready: true,
        };
      filterCommentsEditorEmojiResult ??= {
        emoji: emoji,
        ready: false,
      };
    }
  }
  return filterCommentsEditorEmojiResult;
}

function resolveCommentsEditorUser(
  file?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let reactions: Dynamic = file.root.reactions ?? {};
  let commentsEditorTrim = file.reactionOnly
    ? null
    : resolveCommentsEditorTrim(file.root.body);
  if (commentsEditorTrim === null) return reactions;
  let { [commentsEditorTrim]: reactions3 = [], ...reactions2 }: Dynamic =
    reactions;
  let items: Dynamic = resolveCommentsEditorAgent(file, commentsEditorTrim)
    ? []
    : [
        {
          user: file.root.user,
          actor: file.root.actor,
        },
      ];
  return {
    [commentsEditorTrim]: [...items, ...reactions3],
    ...reactions2,
  };
}

var DocNode: Dynamic;

var HardBreakNode: Dynamic;

var CommentsEditorStyles: string;

var CommentsEditorMessage: string;

var ParagraphNode: Dynamic;

var TextNode: Dynamic;

function resolveCommentsEditorKey(
  commentsEditorKey?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let KeyboardEvent2: Dynamic = (
    commentsEditorKey.dom.ownerDocument.defaultView ?? window
  ).KeyboardEvent;
  return new (KeyboardEvent2 as Dynamic)(`keydown`, {
    key: `Backspace`,
    code: `Backspace`,
    keyCode: 8,
    which: 8,
    repeat: options.repeat,
    isComposing: options.isComposing,
    bubbles: true,
    cancelable: true,
  });
}

var ShiftBackspaceExtension: Dynamic;

var CommentsEditorAddKeyboardShortcuts: Dynamic;

var ReadOnlyWhileLockedExtension: Dynamic;

var resolveCommentsEditorHardBreak: Dynamic;

var resolveCommentsEditorAnchor: Dynamic;

var ChipLineDeleteExtension: Dynamic;

function collectCommentsEditorParagraph(
  file?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let marks: Dynamic = context?.marks() ?? [];
  let paragraph: Dynamic = file.nodes.paragraph;
  return Slice.maxOpen(
    Fragment.from(
      options
        .replace(
          /\r\n?/g,
          `
`,
        )
        .split(
          `
`,
        )
        .map(
          (replacePart?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            paragraph.create(
              null,
              replacePart ? file.text(replacePart, marks) : undefined,
            ),
        ),
    ),
  );
}

function isCommentsEditorElement(
  node?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return new (Editor as Dynamic)({
    ...(node.element !== undefined && {
      element: node.element,
    }),
    ...(node.content !== undefined && {
      content: node.content,
    }),
    extensions: [
      DocNode,
      ParagraphNode,
      TextNode,
      CommentsEditorAddKeyboardShortcuts,
      ReadOnlyWhileLockedExtension,
      ChipLineDeleteExtension,
      ShiftBackspaceExtension,
      ...(node.extensions ?? []),
    ],
    editorProps: {
      attributes: {
        role: `textbox`,
        "aria-multiline": `true`,
        ...(node.className && {
          class: node.className,
        }),
        ...(node.ariaLabel && {
          "aria-label": node.ariaLabel,
        }),
      },
      ...(node.preservePasteBlankLines && {
        clipboardTextParser: (
          commentsEditorElement?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          collectCommentsEditorParagraph(
            options.doc.type.schema,
            commentsEditorElement,
            options,
          ),
      }),
      handlePaste(
        commentsEditorElement?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ) {
        let isEditorAnchorsAndMentionsTextPlain2: Dynamic =
          isEditorAnchorsAndMentionsTextPlain(options.clipboardData);
        return isEditorAnchorsAndMentionsTextPlain2 === null
          ? false
          : (commentsEditorElement.pasteText(
              isEditorAnchorsAndMentionsTextPlain2,
            ),
            true);
      },
      handleKeyDown(
        commentsEditorElement?: unknown,
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ) {
        let isPopupVisible: Dynamic =
          node.isPopupVisible?.() ?? node.isPopupOpen?.() ?? false;
        if (
          event.key === `Enter`
            ? (node.popupOwnsEnter?.() ?? isPopupVisible)
            : isPopupVisible
        )
          return false;
        let matchesIsReplay = event.isReplay === true;
        let repeat: Dynamic = event.repeat;
        return event.key === `Enter` &&
          !event.shiftKey &&
          (event.metaKey || event.ctrlKey) &&
          node.onModEnter
          ? (event.preventDefault(),
            !matchesIsReplay && !repeat && node.onModEnter(),
            true)
          : event.key === `Enter` && !event.shiftKey && node.onEnter
            ? (event.preventDefault(),
              !matchesIsReplay && !repeat && node.onEnter(),
              true)
            : event.key === `Escape` && node.onEscape
              ? (node.onEscape(), true)
              : false;
      },
    },
    ...(node.onUpdate && {
      onUpdate: (
        { editor: editor }: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => node.onUpdate(editor),
    }),
  });
}

var CommentsEditorNow: Dynamic;

function clearCommentsEditorNow(
  clearCommentsEditorNow2?: Dynamic,
  options: Dynamic = CommentsEditorNow,
  ..._extraArguments: unknown[]
): Dynamic {
  let clearCommentsEditorNowResult: Dynamic;
  let clearCommentsEditorNowResult2: Dynamic;
  let index = 0;
  let enabled = false;
  let blinked = false;
  let record2: Dynamic = {
    now: (..._extraArguments: unknown[]): Dynamic => options.now(),
    facts: (..._extraArguments: unknown[]): Dynamic => ({
      ...options.facts(),
      blinked: blinked,
    }),
    win: options.win,
  };
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let clearCommentsEditorNow3 = (..._extraArguments: unknown[]): undefined => {
    for (let clearCommentsEditorNowResult3 of Array.from<Dynamic>(
      uniqueItems,
    ) as Dynamic)
      clearCommentsEditorNowResult3();
  };
  let clearCommentsEditorNow4 = (..._extraArguments: unknown[]): undefined => {
    if (
      !(
        clearCommentsEditorNowResult !== undefined ||
        clearCommentsEditorNowResult2 !== undefined ||
        enabled ||
        index >= 3
      )
    ) {
      enabled = true;
      index++;
      clearCommentsEditorNow2().then(
        (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          enabled = false;
          clearCommentsEditorNowResult = result;
          clearCommentsEditorNow3();
        },
        (result?: Dynamic, ..._extraArguments: unknown[]) => {
          enabled = false;
          if (!resolvePlatformLoadingAndStatusName(result)) {
            clearCommentsEditorNowResult2 =
              result ?? Error(`chunk load rejected`);
            return clearCommentsEditorNow3();
          }
          blinked = isPlatformLoadingAndStatusWokeAt(
            record2.now(),
            record2.facts(),
          );
          resolvePlatformChunkLoadingDescription2(result, record2);
          if (index < 3) {
            options.whenBack(clearCommentsEditorNow4);
          }
        },
      );
    }
  };
  return {
    get: (..._extraArguments: unknown[]): Dynamic =>
      clearCommentsEditorNowResult,
    error: (..._extraArguments: unknown[]): Dynamic =>
      clearCommentsEditorNowResult2,
    want: (..._extraArguments: unknown[]): undefined => {
      if (
        !(
          index > 0 &&
          isPlatformLoadingAndStatusWokeAt(options.now(), options.facts())
        )
      ) {
        clearCommentsEditorNow4();
      }
    },
    subscribe(
      clearCommentsEditorNow5?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      uniqueItems.add(clearCommentsEditorNow5);
      return (..._extraArguments: unknown[]): undefined =>
        void uniqueItems.delete(clearCommentsEditorNow5);
    },
  };
}

function useCommentsEditorUseSyncExternalStore(
  commentsEditorUseSyncExternalStore?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let useSyncExternalStore: Dynamic = (0, React.useSyncExternalStore)(
    commentsEditorUseSyncExternalStore.subscribe,
    commentsEditorUseSyncExternalStore.get,
    commentsEditorUseSyncExternalStore.get,
  );
  let useSyncExternalStore2: Dynamic = (0, React.useSyncExternalStore)(
    commentsEditorUseSyncExternalStore.subscribe,
    commentsEditorUseSyncExternalStore.error,
    commentsEditorUseSyncExternalStore.error,
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      commentsEditorUseSyncExternalStore.want(),
    [commentsEditorUseSyncExternalStore],
  );
  if (useSyncExternalStore2 !== undefined) throw useSyncExternalStore2;
  return useSyncExternalStore;
}

var commentsEditorValue20000: number;

var commentsEditorValue256: number;

var commentsEditorValue16: number;

var commentsEditorPattern2: RegExp;

var commentsEditorPattern3: RegExp;

var commentsEditorPattern4: RegExp;

var isCommentsEditorPrototype: (commentsEditorPrototype?: Dynamic, ..._extraArguments: unknown[]) => boolean;

var commentsEditorMap: Dynamic;

var commentsEditorSet2: Dynamic;

function updateCommentsEditorDelete(
  updateCommentsEditorDelete2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  commentsEditorMap.set(updateCommentsEditorDelete2, options);
  return (..._extraArguments: unknown[]): undefined => {
    if (commentsEditorMap.get(updateCommentsEditorDelete2) === options) {
      commentsEditorMap.delete(updateCommentsEditorDelete2);
    }
  };
}

function clearCommentsEditorBoxGoneAt(..._extraArguments: unknown[]): Dynamic {
  let record2: Dynamic = {
    boxGoneAt: null,
  };
  commentsEditorSet2.add(record2);
  return {
    ended: (..._extraArguments: unknown[]): undefined =>
      void commentsEditorSet2.delete(record2),
    boxGone: (..._extraArguments: unknown[]): undefined => {
      if (commentsEditorSet2.has(record2)) {
        record2.boxGoneAt ??= Date.now();
      }
    },
  };
}

var isCommentsEditorBoxGoneAt: (..._extraArguments: unknown[]) => boolean;

var resolveCommentsEditorEncode: Dynamic;

var resolveCommentsEditorValue2: Dynamic;

var collectCommentsEditorText: Dynamic;

var collectCommentsEditorText2: Dynamic;

var resolveCommentsEditorValue3: Dynamic;

var resolveCommentsEditorText: Dynamic;

var collectCommentsEditorParagraph2: Dynamic;

var resolveCommentsEditorTrim2: Dynamic;

var resolveCommentsEditorTest: Dynamic;

var resolveCommentsEditorValue4: Dynamic;

var resolveCommentsEditorPageId: Dynamic;

var resolveCommentsEditorJson: Dynamic;

function updateCommentsEditorKey(..._extraArguments: unknown[]): Dynamic {
  let lookup: Dynamic = new (Map as Dynamic)();
  let lossy: boolean = false;
  let useCommentStoreState: Dynamic = useCommentStore.getState();
  for (let [key, updateCommentsEditorKeyResult] of Object.entries(
    useCommentStoreState.replyDrafts,
  ) as Dynamic) {
    if (commentsEditorPattern4.test(key)) continue;
    let record2: Dynamic = {
      key: key,
      ...updateCommentsEditorKeyResult,
    };
    if (resolveCommentsEditorTest(key)) {
      lookup.set(key, record2);
    }
    let isTmpId2: Dynamic =
      isTmpId(key) &&
      resolveCommentsEditorValue2(
        (..._extraArguments: unknown[]): Dynamic =>
          threadClosed(key, updateCommentsEditorKeyResult.pageId),
        false,
      );
    lossy ||= !isTmpId2 && !resolveCommentsEditorPageId(record2);
  }
  for (let updateCommentsEditorKeyResult of commentsEditorMap.values() as Dynamic) {
    if (
      !updateCommentsEditorKeyResult.carried ||
      !resolveCommentsEditorValue2(
        (..._extraArguments: unknown[]): Dynamic =>
          updateCommentsEditorKeyResult.holding(),
        false,
      )
    )
      continue;
    let commentsEditorValue2: Dynamic = resolveCommentsEditorValue2(
      (..._extraArguments: unknown[]): Dynamic =>
        updateCommentsEditorKeyResult.peek(),
      null,
    );
    lossy ||= !resolveCommentsEditorPageId(commentsEditorValue2);
    if (
      !(
        commentsEditorValue2 === null ||
        !resolveCommentsEditorTest(commentsEditorValue2.key)
      )
    ) {
      lookup.delete(commentsEditorValue2.key);
      lookup.set(commentsEditorValue2.key, commentsEditorValue2);
    }
  }
  let replies: Dynamic = [...lookup.values()].map(resolveCommentsEditorJson);
  let resolveCommentsEditorEncode2: Dynamic = (
    replies2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveCommentsEditorEncode(
      JSON.stringify({
        replies: replies2,
      }),
    );
  for (
    ;
    replies.length > 32 ||
    (replies.length > 1 && resolveCommentsEditorEncode2(replies) > 2e5);

  ) {
    replies = replies.slice(1);
    lossy = true;
  }
  return {
    replies: replies,
    lossy: lossy,
  };
}

function resolveCommentsEditorReplies(..._extraArguments: unknown[]): Dynamic {
  let { replies: replies }: Dynamic = updateCommentsEditorKey();
  return replies.length === 0
    ? null
    : {
        replies: replies,
      };
}

function resolveCommentsEditorJson2(
  commentsEditorJson2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (typeof commentsEditorJson2 != `object` || !commentsEditorJson2) return;
  let replies: Dynamic = commentsEditorJson2.replies;
  if (!Array.isArray(replies)) return;
  let useCommentStoreState: Dynamic = useCommentStore.getState();
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  for (let event of replies.slice(0, 32) as Dynamic)
    try {
      if (
        typeof event != `object` ||
        !event ||
        !resolveCommentsEditorTest(event.key) ||
        !resolveCommentsEditorValue4(event.pageId) ||
        uniqueItems.has(event.key)
      )
        continue;
      uniqueItems.add(event.key);
      let json2: Dynamic = resolveCommentsEditorTrim2(event.json, event.text);
      if (json2 === null) continue;
      let box: Dynamic = event.box;
      let record2: Dynamic = {
        json: json2,
        pageId: event.pageId,
        ...(event.told === true && {
          told: true,
        }),
        ...(box !== undefined &&
          typeof box?.checked == `boolean` &&
          typeof box.byPerson == `boolean` && {
            box: {
              checked: box.checked,
              byPerson: box.byPerson,
            },
          }),
      };
      useCommentStoreState.stashReplyDraft(event.key, record2);
    } catch {}
}

var commentsEditorUrlPattern: RegExp;

var isCommentsEditorHidden: Dynamic;

function getCommentsEditorPost(..._extraArguments: unknown[]) {
  if (isCommentsEditorBoxGoneAt()) return `post`;
  let useCommentStoreState: Dynamic = useCommentStore.getState();
  let draftAnchor: Dynamic = useCommentStoreState.draftAnchor;
  if (
    draftAnchor !== null &&
    draftAnchor.react === undefined &&
    draftAnchor.autopost === undefined
  ) {
    let filteredItems: Dynamic = [
      commentsEditorMap.get(COMPOSE_BOX_ID),
      commentsEditorMap.get(DRAFT_BOX_ID),
    ].filter(
      (item?: Dynamic, ..._extraArguments: unknown[]) => item !== undefined,
    );
    if (
      filteredItems.length === 0 ||
      filteredItems.some(
        (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          resolveCommentsEditorValue2(
            (..._extraArguments: unknown[]): Dynamic =>
              rolldownNImport2.holding(),
            true,
          ),
      )
    )
      return `box`;
  }
  for (let getCommentsEditorPostResult of useCommentStoreState.dirtyEditors as Dynamic)
    if (commentsEditorMap.get(getCommentsEditorPostResult)?.carried !== true)
      return `box`;
  for (let getCommentsEditorPostResult of commentsEditorMap.values() as Dynamic)
    if (
      !getCommentsEditorPostResult.carried &&
      resolveCommentsEditorValue2(
        (..._extraArguments: unknown[]): Dynamic =>
          getCommentsEditorPostResult.holding(),
        false,
      )
    )
      return `box`;
  return resolveCommentsEditorRefused()
    ? `outbox`
    : updateCommentsEditorKey().lossy || isCommentsEditorHidden()
      ? `box`
      : null;
}

function resolveCommentsEditorRefused(..._extraArguments: unknown[]): Dynamic {
  let useCommentStoreState: Dynamic = useCommentStore.getState();
  let outboxEntries: Dynamic = Object.entries(useCommentStoreState.outbox);
  return outboxEntries.some(
    ([, outboxEntry]: Dynamic, ..._extraArguments: unknown[]) =>
      outboxEntry.state !== `refused`,
  )
    ? true
    : outboxEntries.length > 0 &&
        (!outboxRowsAreDurable() ||
          outboxEntries.some(
            ([rolldownRImport2]: Dynamic, ..._extraArguments: unknown[]) =>
              rolldownRImport2 in useCommentStoreState.optimisticY,
          ));
}

function resolveCommentsEditorValue5(..._extraArguments: unknown[]) {
  return getCommentsEditorPost() !== null;
}

function resolveCommentsEditorOutbox(..._extraArguments: unknown[]) {
  let commentsEditorPost = getCommentsEditorPost();
  return commentsEditorPost === `box` &&
    resolveCommentsEditorValue2(resolveCommentsEditorRefused, false)
    ? `outbox`
    : commentsEditorPost;
}

function isCommentsEditorValues(..._extraArguments: unknown[]) {
  for (let isCommentsEditorValuesResult of commentsEditorMap.values() as Dynamic)
    if (
      isCommentsEditorValuesResult.carried &&
      resolveCommentsEditorValue2(
        (..._extraArguments: unknown[]): Dynamic =>
          isCommentsEditorValuesResult.holding(),
        false,
      ) &&
      resolveCommentsEditorPageId(
        resolveCommentsEditorValue2(
          (..._extraArguments: unknown[]): Dynamic =>
            isCommentsEditorValuesResult.peek(),
          null,
        ),
      )
    )
      return true;
  return false;
}

function isCommentsEditorActiveElement(..._extraArguments: unknown[]): Dynamic {
  if (typeof document === "undefined") return false;
  let activeElement2 = document.activeElement;
  if (activeElement2 === null || !document.hasFocus()) return false;
  for (let file of commentsEditorMap.values() as Dynamic)
    if (
      resolveCommentsEditorValue2(
        (..._extraArguments: unknown[]) =>
          file.root()?.contains(activeElement2) === true,
        false,
      )
    )
      return resolveCommentsEditorValue2(
        (..._extraArguments: unknown[]): Dynamic => file.holding(),
        true,
      );
  return false;
}

var CommentsEditorCollect: Dynamic;

var CommentsEditorState3: Dynamic;

var CommentsEditorState4: Dynamic;

var commentsEditorState: Dynamic;

var CommentsEditorRoomProject: string;

var commentsEditorState2: Dynamic;

var commentsEditorState3: Dynamic;

function resolveCommentsEditorUnbridge(
  page?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  page.unbridge = getCommentsActionsAndSelectionRef(
    (commentsEditorState ?? frameLane)(`project/${page.pid}`),
    (
      commentsEditorUnbridge?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => void applyFrame(commentsEditorUnbridge),
    (..._extraArguments: unknown[]): undefined => {
      if (!page.closed) {
        page.closed = true;
        page.unbridge?.();
        if (commentsEditorState2 === page) {
          commentsEditorState2 = undefined;
        }
        _resetFold();
      }
    },
    commentsEditorState3 ??
      ((commentsEditorUnbridge?: Dynamic, ..._extraArguments: unknown[]) =>
        console.warn(`fold-bridge dropped ${commentsEditorUnbridge}`)),
  );
}

function updateCommentsEditorKind(
  updateCommentsEditorKind2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (
    !(
      updateCommentsEditorKind2.pending.has(options) ||
      updateCommentsEditorKind2.sock === undefined ||
      updateCommentsEditorKind2.sock.readyState !== 1
    )
  ) {
    updateCommentsEditorKind2.pending.set(options, []);
    updateCommentsEditorKind2.sock.send(
      JSON.stringify({
        kind: `subscribe`,
        ref: options,
      }),
    );
  }
}

function clearCommentsEditorMessage(
  page?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (page.closed) return;
  let CommentsEditorState32: Dynamic = CommentsEditorState3(
    CommentsEditorRoomProject + page.pid,
  );
  page.sock = CommentsEditorState32;
  page.pending.clear();
  CommentsEditorState32.addEventListener(
    `message`,
    (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (
        page.closed ||
        page.sock !== CommentsEditorState32 ||
        typeof event.data != `string`
      )
        return;
      let entry: Dynamic;
      try {
        entry = JSON.parse(event.data);
      } catch {
        return;
      }
      if (entry.kind === `sync`) {
        let pendingEntry: Dynamic = page.pending.get(entry.ref);
        if (pendingEntry !== undefined) {
          page.pending.delete(entry.ref);
          applyFrame(entry);
          for (let clearCommentsEditorMessageResult of pendingEntry as Dynamic)
            applyFrame(clearCommentsEditorMessageResult);
          return;
        }
      } else if (entry.kind === `op` || entry.kind === `relay`) {
        let pendingEntry: Dynamic = page.pending.get(entry.ref);
        if (pendingEntry !== undefined) {
          pendingEntry.push(entry);
          return;
        }
      }
      applyFrame(entry);
    },
  );
  CommentsEditorState32.addEventListener(
    `open`,
    (..._extraArguments: unknown[]): undefined => {
      if (!(page.closed || page.sock !== CommentsEditorState32)) {
        clearTimeout(page.dwell);
        page.dwell = setTimeout((..._extraArguments: unknown[]): undefined => {
          page.attempt = 0;
        }, 3e3);
        page.scheduled = 0;
        for (let clearCommentsEditorMessageResult of page.lazy as Dynamic)
          if (!page.pending.has(clearCommentsEditorMessageResult)) {
            updateCommentsEditorKind(page, clearCommentsEditorMessageResult);
          }
      }
    },
  );
  CommentsEditorState32.addEventListener(
    `close`,
    (error?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      clearTimeout(page.dwell);
      if (page.closed || page.sock !== CommentsEditorState32) return;
      if (error.code === 1008) {
        page.closed = true;
        if (commentsEditorState2 === page) {
          commentsEditorState2 = undefined;
        }
        _resetFold();
        return;
      }
      let retryMs: Dynamic = error.retryMs;
      if (
        typeof retryMs == `number` &&
        Number.isFinite(retryMs) &&
        retryMs >= 0 &&
        page.scheduled < 3
      ) {
        page.scheduled++;
        page.retry = setTimeout(
          (..._extraArguments: unknown[]) => clearCommentsEditorMessage(page),
          Math.min(3e4, retryMs) + Math.random() * 250,
        );
        return;
      }
      let min = Math.min(3e4, 250 * 2 ** page.attempt++);
      page.retry = setTimeout(
        (..._extraArguments: unknown[]) => clearCommentsEditorMessage(page),
        min / 2 + Math.random() * min,
      );
    },
  );
}

function resolveCommentsEditorPid(
  pid?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let commentsEditorState22: Dynamic = commentsEditorState2;
  if (commentsEditorState22?.pid === pid && !commentsEditorState22.closed) {
    commentsEditorState22.teardownScheduled = false;
    return resolveCommentsEditorTeardownScheduled(commentsEditorState22);
  }
  resolveCommentsEditorClosed();
  let record2: Dynamic = {
    pid: pid,
    sock: undefined,
    closed: false,
    lazy: new (Set as Dynamic)(),
    attempt: 0,
    retry: undefined,
    dwell: undefined,
    pending: new (Map as Dynamic)(),
    teardownScheduled: false,
    scheduled: 0,
  };
  commentsEditorState2 = record2;
  if (commentsEditorState !== undefined || inFrame()) {
    resolveCommentsEditorUnbridge(record2);
  } else {
    clearCommentsEditorMessage(record2);
  }
  collectPlatformApiAndAuthVerb(CommentsEditorState4(pid), {
    kind: `project`,
    id: pid,
  });
  return resolveCommentsEditorTeardownScheduled(record2);
}

function resolveCommentsEditorTeardownScheduled(
  commentsEditorTeardownScheduled?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (..._extraArguments: unknown[]): undefined => {
    if (commentsEditorState2 === commentsEditorTeardownScheduled) {
      commentsEditorTeardownScheduled.teardownScheduled = true;
      queueMicrotask((..._extraArguments: unknown[]): undefined => {
        if (
          commentsEditorState2 === commentsEditorTeardownScheduled &&
          commentsEditorTeardownScheduled.teardownScheduled
        ) {
          resolveCommentsEditorClosed();
        }
      });
    }
  };
}

function resolveCommentsEditorClosed(..._extraArguments: unknown[]): undefined {
  let commentsEditorState22: Dynamic = commentsEditorState2;
  commentsEditorState2 = undefined;
  if (commentsEditorState22) {
    commentsEditorState22.closed = true;
    clearTimeout(commentsEditorState22.retry);
    clearTimeout(commentsEditorState22.dwell);
    commentsEditorState22.unbridge?.();
    try {
      commentsEditorState22.sock?.close();
    } catch {}
    _resetFold();
  }
}

var CommentsEditorContains: Dynamic;

var commentsEditorSet3: Dynamic;

function isCommentsEditorPush(
  commentsEditorPush?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let items: Dynamic = [commentsEditorPush];
  let weakSet: Dynamic = new (WeakSet as Dynamic)();
  for (; items.length > 0; ) {
    let pop: Dynamic = items.pop();
    if (!(typeof pop != `object` || !pop) && !weakSet.has(pop)) {
      weakSet.add(pop);
      if (Array.isArray(pop)) {
        for (let isCommentsEditorPushResult of pop as Dynamic)
          items.push(isCommentsEditorPushResult);
        continue;
      }
      for (let isCommentsEditorPushResult of Object.keys(pop) as Dynamic) {
        if (commentsEditorSet3.has(isCommentsEditorPushResult)) return true;
        items.push(pop[isCommentsEditorPushResult]);
      }
    }
  }
  return false;
}

function isCommentsEditorIsFinite(
  commentsEditorIsFinite?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let items: Dynamic = [commentsEditorIsFinite];
  let weakSet: Dynamic = new (WeakSet as Dynamic)();
  for (; items.length > 0; ) {
    let pop: Dynamic = items.pop();
    if (!(pop === null || typeof pop == `string` || typeof pop == `boolean`)) {
      if (typeof pop == `number`) {
        if (!Number.isFinite(pop)) return false;
        continue;
      }
      if (typeof pop == `object`) {
        if (weakSet.has(pop)) return false;
        weakSet.add(pop);
        if (Array.isArray(pop)) {
          for (let isCommentsEditorIsFiniteResult of pop as Dynamic)
            items.push(isCommentsEditorIsFiniteResult);
          continue;
        }
        for (let isCommentsEditorIsFiniteResult of Object.keys(pop) as Dynamic)
          items.push(pop[isCommentsEditorIsFiniteResult]);
        continue;
      }
      return false;
    }
  }
  return true;
}

var CommentsEditorMessage2: Dynamic;

var commentsEditorSet4: Dynamic;

var commentsEditorPattern5: RegExp;

var CommentsEditorMessage3: Dynamic;

var CommentsEditorPath: Dynamic;

var commentsEditorMessageSchema: Dynamic;

var commentsEditorMessageSchema2: Dynamic;

var commentsEditorDescribeSchema: Dynamic;

var commentsEditorDescribeSchema2: Dynamic;

var commentsEditorVerdictSchema: Dynamic;

var CommentsEditorCreateContext2: Dynamic;

var resolveCommentsEditorUseContext2: Dynamic;

var resolveCommentsEditorUseContext3: (..._extraArguments: unknown[]) => boolean;

function resolveCommentsEditorStore(
  commentsEditorStore?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let commentsEditorUseContext2: Dynamic = resolveCommentsEditorUseContext2();
  return useAtomValue(commentsEditorUseContext2.refAtom(commentsEditorStore), {
    store: commentsEditorUseContext2.store,
  });
}

function resolveCommentsEditorStore2(..._extraArguments: unknown[]): Dynamic {
  let commentsEditorUseContext2: Dynamic = resolveCommentsEditorUseContext2();
  return useAtomValue(commentsEditorUseContext2.fileIdsAtom, {
    store: commentsEditorUseContext2.store,
  });
}

function resolveCommentsEditorStore3(..._extraArguments: unknown[]): Dynamic {
  let commentsEditorUseContext2: Dynamic = resolveCommentsEditorUseContext2();
  return useAtomValue(commentsEditorUseContext2.foldSyncedAtom, {
    store: commentsEditorUseContext2.store,
  });
}

function resolveCommentsEditorStore4(
  commentsEditorStore4?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let commentsEditorUseContext2: Dynamic = resolveCommentsEditorUseContext2();
  let useAtomValue2: Dynamic = useAtomValue(
    commentsEditorUseContext2.foldSyncedAtom,
    {
      store: commentsEditorUseContext2.store,
    },
  );
  let useAtomValue3: Dynamic = useAtomValue(
    commentsEditorUseContext2.refIndexAtom,
    {
      store: commentsEditorUseContext2.store,
    },
  );
  return (
    useAtomValue2 &&
    commentsEditorStore4 !== undefined &&
    commentsEditorStore4 !== `` &&
    useAtomValue3.has(`project/${commentsEditorStore4}`)
  );
}

function useCommentsEditorThen2(
  commentsEditorThen2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let commentsEditorUseContext3 = resolveCommentsEditorUseContext3();
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!commentsEditorThen2 || commentsEditorUseContext3) return;
      let commentsEditorPid: Dynamic =
        resolveCommentsEditorPid(commentsEditorThen2);
      let useCommentsEditorThen2Result: Dynamic;
      let enabled = true;
      preloadTImport(
        (..._extraArguments: unknown[]) =>
          Promise.resolve()
            .then(
              (..._extraArguments: unknown[]): Dynamic =>
                CommentsStoreANCHORGONECARDWORDS,
            )
            .then(
              (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
                if (enabled) {
                  useCommentsEditorThen2Result = result.connectCommentFold();
                }
              },
            ),
        undefined,
        import.meta.url,
      );
      return (..._extraArguments: unknown[]): undefined => {
        enabled = false;
        useCommentsEditorThen2Result?.();
        commentsEditorPid();
      };
    },
    [commentsEditorThen2, commentsEditorUseContext3],
  );
}

var CommentsEditorCreateContext3: Dynamic;

function resolveCommentsEditorUseContext4(
  ..._extraArguments: unknown[]
): Dynamic {
  let useContext: Dynamic = (0, React.useContext)(CommentsEditorCreateContext3);
  let platformApiAndAuthUseContext2: Dynamic =
    resolvePlatformApiAndAuthUseContext2();
  return useContext ?? Date.parse(platformApiAndAuthUseContext2.now());
}

function useCommentsEditorState(
  commentsEditorState4?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [enabledState, setEnabledState]: Dynamic = (0, React.useState)(true);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!(!commentsEditorState4 || !inFrame()))
        return subscribeFrameWritable(
          `project/${commentsEditorState4}`,
          setEnabledState,
        );
    },
    [commentsEditorState4],
  );
  return enabledState;
}

function useCommentsEditorState2(
  commentsEditorState22?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [enabledState, setEnabledState]: Dynamic = (0, React.useState)(true);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!(!commentsEditorState22 || !inFrame()))
        return subscribeFrameCommentable(
          `project/${commentsEditorState22}`,
          setEnabledState,
        );
    },
    [commentsEditorState22],
  );
  return enabledState;
}

function useCommentsEditorState3(
  commentsEditorState32?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [useCommentsEditorState3State, setUseCommentsEditorState3State]: Dynamic =
    (0, React.useState)(null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!(!commentsEditorState32 || !inFrame()))
        return subscribeFrameViewerRole(
          `project/${commentsEditorState32}`,
          setUseCommentsEditorState3State,
        );
    },
    [commentsEditorState32],
  );
  return useCommentsEditorState3State;
}

function useCommentsEditorState4(
  commentsEditorState4?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [useCommentsEditorState4State, setUseCommentsEditorState4State]: Dynamic =
    (0, React.useState)(null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!(!commentsEditorState4 || !inFrame()))
        return subscribeFrameViewerClass(
          `project/${commentsEditorState4}`,
          setUseCommentsEditorState4State,
        );
    },
    [commentsEditorState4],
  );
  return useCommentsEditorState4State;
}

function resolveCommentsEditorPostOrDiscardYourCommentFirst(
  commentsEditorPostOrDiscardYourCommentFirst?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return commentsEditorPostOrDiscardYourCommentFirst.drafting
    ? `Post or discard your comment first`
    : null;
}

function resolveCommentsEditorLabel(
  commentsEditorLabel?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return commentsEditorLabel.narrow
    ? commentsEditorLabel.mode === `list`
      ? {
          label: `Close comment list`,
          next: `margin`,
        }
      : {
          label: `All comments`,
          next: `list`,
        }
    : commentsEditorLabel.mode === `hidden`
      ? {
          label: `Show comments`,
          next: `margin`,
        }
      : {
          label: `Hide comments`,
          next: `hidden`,
        };
}

function resolveCommentsEditorValue7(
  commentsEditorValue7?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return commentsEditorValue7 === 404;
}

function resolveCommentsEditorPid2(
  pid?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return options === undefined
    ? undefined
    : {
        pid: pid,
        code: options ? 200 : 404,
      };
}

var commentsEditorValue15000: number;

function resolveCommentsEditorSignal(
  commentsEditorSignal?: Dynamic,
  options?: Dynamic,
  context: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let fetch2: Dynamic = context.fetch ?? apiFetcher;
  let subscribe: Dynamic = context.subscribe ?? subscribeProjectFeed;
  let enabled = true;
  let resolveCommentsEditorSignalResult: Dynamic;
  let enabled2 = false;
  let enabled3 = false;
  let enabled4 = false;
  let amount = -1 / 0;
  let resolveCommentsEditorSignalHandler = (
    ..._extraArguments: unknown[]
  ): undefined => {
    if (!(!enabled || resolveCommentsEditorSignalResult !== undefined)) {
      if (enabled2) {
        enabled3 = true;
        return;
      }
      resolveCommentsEditorSignalResult = setTimeout(
        (..._extraArguments: unknown[]): undefined => {
          resolveCommentsEditorSignalResult = undefined;
          if (!enabled) return;
          enabled2 = true;
          enabled3 = false;
          enabled4 = false;
          let enabled5 = false;
          fetch2(
            `/api/v3/project/${encodeURIComponent(commentsEditorSignal)}/access`,
            {
              signal: AbortSignal.timeout(commentsEditorValue15000),
            },
          )
            .then(
              (
                response?: Dynamic,
                ..._extraArguments: unknown[]
              ): undefined => {
                if (enabled) {
                  enabled5 = true;
                  amount = Date.now();
                  options(response.status);
                }
              },
            )
            .catch((..._extraArguments: unknown[]): undefined => {})
            .finally((..._extraArguments: unknown[]): undefined => {
              enabled2 = false;
              if (enabled3 || (enabled4 && !enabled5)) {
                resolveCommentsEditorSignalHandler();
              }
            });
        },
        100,
      );
    }
  };
  let resolveCommentsEditorSignalHandler2 = (
    ..._extraArguments: unknown[]
  ): undefined => {
    if (enabled2) return void (enabled4 = true);
    if (!(Date.now() - amount < 1e3)) {
      resolveCommentsEditorSignalHandler();
    }
  };
  resolveCommentsEditorSignalHandler();
  let subscribe2: Dynamic = subscribe(
    commentsEditorSignal,
    (entry?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (entry.kind === `access-changed`) {
        resolveCommentsEditorSignalHandler();
      } else {
        if (entry.kind === `live` || entry.kind === `recovered`) {
          resolveCommentsEditorSignalHandler2();
        }
      }
    },
  );
  return (..._extraArguments: unknown[]): undefined => {
    enabled = false;
    if (resolveCommentsEditorSignalResult !== undefined) {
      clearTimeout(resolveCommentsEditorSignalResult);
    }
    resolveCommentsEditorSignalResult = undefined;
    subscribe2();
  };
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeCommentsEditorStep1(): void {
  (commentsEditorSet = new (Set as Dynamic)([
    `not_delivered`,
    `unreachable`,
    `refused`,
  ]));
  (resolveCommentsEditorValue = (
    commentsEditorValue?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => commentsEditorSet.has(commentsEditorValue) && options >= 2);
  (CommentsEditorState = 10 * 6e4);
  (CommentsEditorState2 = 30 * 6e4);
  (resolveCommentsEditorToClaude = (
    commentsEditor?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    ...(commentsEditor !== undefined && {
      toClaude: commentsEditor.toClaude,
    }),
    ...(commentsEditor?.pressedAt !== undefined && {
      pressedAt: commentsEditor.pressedAt,
    }),
  }));
  (CommentsEditorCoworkerObservers = `coworkerObservers`);
  (CommentsEditorGrantItEditorAccessFromTheShareDialog = `grant it editor access from the Share dialog`);
  (resolveCommentsEditorSlice = (
    commentsEditorSlice?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `…${commentsEditorSlice.slice(-6)}`);
  `${CommentsEditorGrantItEditorAccessFromTheShareDialog}`;
  (commentsEditorPattern = /\p{Emoji_Presentation}|\uFE0F|\p{Emoji_Modifier}/u);
  (resolveCommentsEditorReactionOnly = (
    commentsEditorReactionOnly?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    commentsEditorReactionOnly.reactionOnly === true ||
    isCommentsEditorComment(commentsEditorReactionOnly));
  (DocNode = Node2.create({
    name: `doc`,
    topNode: true,
    content: `block+`,
    renderMarkdown: (
      node?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      node.content
        ? options.renderChildren(
            node.content,
            `

`,
          )
        : ``,
  }));
  (HardBreakNode = Node2.create({
    name: `hardBreak`,
    markdownTokenName: `br`,
    addOptions(..._extraArguments: unknown[]): Dynamic {
      return {
        keepMarks: true,
        HTMLAttributes: {},
      };
    },
    inline: true,
    group: `inline`,
    selectable: false,
    linebreakReplacement: true,
    parseHTML(..._extraArguments: unknown[]) {
      return [
        {
          tag: `br`,
        },
      ];
    },
    renderHTML(
      this: Dynamic,
      { HTMLAttributes: HTMLAttributes }: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return [`br`, mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
    },
    renderText(..._extraArguments: unknown[]) {
      return `
`;
    },
    renderMarkdown: (..._extraArguments: unknown[]) => `  
`,
    parseMarkdown: (..._extraArguments: unknown[]) => ({
      type: `hardBreak`,
    }),
    addCommands(..._extraArguments: unknown[]): Dynamic {
      return {
        setHardBreak:
          (..._extraArguments: unknown[]): Dynamic =>
          (
            {
              commands: commands2,
              chain: chain,
              state: state,
              editor: editor,
            }: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            commands2.first([
              (..._extraArguments: unknown[]): Dynamic => commands2.exitCode(),
              (..._extraArguments: unknown[]): Dynamic =>
                commands2.command((..._extraArguments: unknown[]): Dynamic => {
                  let { selection: state2, storedMarks: state3 }: Dynamic = state;
                  if (state2.$from.parent.type.spec.isolating) return false;
                  let { keepMarks: options }: Dynamic = this.options;
                  let { splittableMarks: extensionManager }: Dynamic =
                    editor.extensionManager;
                  let state4: Dynamic =
                    state3 || (state2.$to.parentOffset && state2.$from.marks());
                  return chain()
                    .insertContent({
                      type: this.name,
                    })
                    .command(
                      (
                        { tr: tr2, dispatch: dispatch }: Dynamic,
                        ..._extraArguments: unknown[]
                      ) => {
                        if (dispatch && state4 && options) {
                          let filteredState: Dynamic = state4.filter(
                            (
                              state5?: Dynamic,
                              ..._extraArguments: unknown[]
                            ): Dynamic =>
                              extensionManager.includes(state5.type.name),
                          );
                          tr2.ensureMarks(filteredState);
                        }
                        return true;
                      },
                    )
                    .run();
                }),
            ]),
      };
    },
    addKeyboardShortcuts(..._extraArguments: unknown[]): Dynamic {
      return {
        "Mod-Enter": (..._extraArguments: unknown[]): Dynamic =>
          this.editor.commands.setHardBreak(),
        "Shift-Enter": (..._extraArguments: unknown[]): Dynamic =>
          this.editor.commands.setHardBreak(),
      };
    },
  }));
  (CommentsEditorStyles = `&nbsp;`);
  (CommentsEditorMessage = `\xA0`);
  (ParagraphNode = Node2.create({
    name: `paragraph`,
    priority: 1e3,
    addOptions(..._extraArguments: unknown[]): Dynamic {
      return {
        HTMLAttributes: {},
      };
    },
    group: `block`,
    content: `inline*`,
    parseHTML(..._extraArguments: unknown[]) {
      return [
        {
          tag: `p`,
        },
      ];
    },
    renderHTML(
      this: Dynamic,
      { HTMLAttributes: HTMLAttributes }: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return [
        `p`,
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
        0,
      ];
    },
    parseMarkdown: (
      HTMLAttributes?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let tokens: Dynamic = HTMLAttributes.tokens || [];
      if (tokens.length === 1 && tokens[0].type === `image`)
        return options.parseChildren([tokens[0]]);
      let inline: Dynamic = options.parseInline(tokens);
      return tokens.length === 1 &&
        tokens[0].type === `text` &&
        (tokens[0].raw === CommentsEditorStyles ||
          tokens[0].text === CommentsEditorStyles ||
          tokens[0].raw === CommentsEditorMessage ||
          tokens[0].text === CommentsEditorMessage) &&
        inline.length === 1 &&
        inline[0].type === `text` &&
        (inline[0].text === CommentsEditorStyles ||
          inline[0].text === CommentsEditorMessage)
        ? options.createNode(`paragraph`, undefined, [])
        : options.createNode(`paragraph`, undefined, inline);
    },
    renderMarkdown: (
      HTMLAttributes?: Dynamic,
      options?: Dynamic,
      tokens?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      if (!HTMLAttributes) return ``;
      let inline: Dynamic = Array.isArray(HTMLAttributes.content)
        ? HTMLAttributes.content
        : [];
      if (inline.length === 0) {
        let content: Dynamic = Array.isArray(tokens?.previousNode?.content)
          ? tokens.previousNode.content
          : [];
        return tokens?.previousNode?.type === `paragraph` && content.length === 0
          ? CommentsEditorStyles
          : ``;
      }
      return options.renderChildren(inline);
    },
    addCommands(..._extraArguments: unknown[]): Dynamic {
      return {
        setParagraph:
          (..._extraArguments: unknown[]): Dynamic =>
          (
            { commands: commands2 }: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            commands2.setNode(this.name),
      };
    },
    addKeyboardShortcuts(..._extraArguments: unknown[]): Dynamic {
      return {
        "Mod-Alt-0": (..._extraArguments: unknown[]): Dynamic =>
          this.editor.commands.setParagraph(),
      };
    },
  }));
  (TextNode = Node2.create({
    name: `text`,
    group: `inline`,
    parseMarkdown: (
      textNode?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      type: `text`,
      text: textNode.text || ``,
    }),
    renderMarkdown: (
      textNode?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => textNode.text || ``,
  }));
  (ShiftBackspaceExtension = Extension.create({
    name: `shiftBackspace`,
    priority: 1050,
    addProseMirrorPlugins: (..._extraArguments: unknown[]): Dynamic => [
      new (Plugin as Dynamic)({
        key: new (PluginKey as Dynamic)(`shiftBackspace`),
        props: {
          handleKeyDown(
            shiftBackspaceExtension?: Dynamic,
            event?: Dynamic,
            ..._extraArguments: unknown[]
          ) {
            return event.key !== `Backspace` ||
              !event.shiftKey ||
              event.metaKey ||
              event.ctrlKey ||
              event.altKey
              ? false
              : !!shiftBackspaceExtension.someProp(
                  `handleKeyDown`,
                  (
                    shiftBackspaceExtension2?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic =>
                    shiftBackspaceExtension2(
                      shiftBackspaceExtension,
                      resolveCommentsEditorKey(shiftBackspaceExtension, event),
                    ),
                );
          },
        },
      }),
    ],
  }));
  (CommentsEditorAddKeyboardShortcuts = HardBreakNode.extend({
    addKeyboardShortcuts(..._extraArguments: unknown[]): Dynamic {
      return {
        "Shift-Enter": (..._extraArguments: unknown[]): Dynamic =>
          this.editor.chain().setHardBreak().scrollIntoView().run(),
      };
    },
  }));
  (ReadOnlyWhileLockedExtension = Extension.create({
    name: `readOnlyWhileLocked`,
    addProseMirrorPlugins(..._extraArguments: unknown[]): Dynamic {
      return [
        new (Plugin as Dynamic)({
          key: new (PluginKey as Dynamic)(`readOnlyWhileLocked`),
          props: {
            attributes: (..._extraArguments: unknown[]): Dynamic =>
              this.editor.isEditable
                ? {}
                : {
                    "aria-readonly": `true`,
                  },
          },
        }),
      ];
    },
  }));
  (resolveCommentsEditorHardBreak = (
    node?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    node.isInline &&
    node.isAtom &&
    !node.isText &&
    node.type.name !== `hardBreak`);
  (resolveCommentsEditorAnchor = (
    commentsEditorAnchor?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    try {
      let selection: Dynamic =
        commentsEditorAnchor.dom.ownerDocument.getSelection();
      if (
        selection?.focusNode &&
        selection.anchorNode &&
        commentsEditorAnchor.dom.contains(selection.focusNode)
      )
        return {
          anchor: commentsEditorAnchor.posAtDOM(
            selection.anchorNode,
            selection.anchorOffset,
          ),
          head: commentsEditorAnchor.posAtDOM(
            selection.focusNode,
            selection.focusOffset,
          ),
        };
    } catch {}
    return {
      anchor: commentsEditorAnchor.state.selection.anchor,
      head: commentsEditorAnchor.state.selection.head,
    };
  });
  (ChipLineDeleteExtension = Extension.create({
    name: `chipLineDelete`,
    priority: 99,
    addKeyboardShortcuts(..._extraArguments: unknown[]): Dynamic {
      return {
        "Cmd-Backspace": (..._extraArguments: unknown[]): boolean => {
          let { state: editor, view: editor2 }: Dynamic = this.editor;
          let {
            anchor: commentsEditorAnchor,
            head: commentsEditorAnchor2,
          }: Dynamic = resolveCommentsEditorAnchor(editor2);
          if (
            commentsEditorAnchor !== commentsEditorAnchor2 ||
            commentsEditorAnchor2 < 0 ||
            commentsEditorAnchor2 > editor.doc.content.size
          )
            return false;
          let resolve: Dynamic = editor.doc.resolve(commentsEditorAnchor2);
          if (!resolve.parent.isTextblock) return false;
          let from: Dynamic = resolve.start();
          let enabled: boolean = false;
          resolve.parent.forEach(
            (
              node?: Dynamic,
              index?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              let total: Dynamic = resolve.start() + index;
              if (!(total >= commentsEditorAnchor2)) {
                if (node.type.name === `hardBreak`) {
                  from = total + node.nodeSize;
                  enabled = false;
                } else {
                  if (resolveCommentsEditorHardBreak(node)) {
                    enabled = true;
                  }
                }
              }
            },
          );
          if (!enabled) return false;
          try {
            let coordsAtPos: Dynamic = editor2.coordsAtPos(
              commentsEditorAnchor2,
              1,
            );
            let left: Dynamic = editor2
              .nodeDOM(resolve.before())
              ?.getBoundingClientRect().left;
            let posAtCoords: Dynamic =
              left === undefined
                ? null
                : editor2.posAtCoords({
                    left: left + 1,
                    top: (coordsAtPos.top + coordsAtPos.bottom) / 2,
                  });
            if (
              posAtCoords &&
              posAtCoords.pos > from &&
              posAtCoords.pos <= commentsEditorAnchor2
            ) {
              from = posAtCoords.pos;
            }
          } catch {}
          return from >= commentsEditorAnchor2
            ? false
            : ((enabled = false),
              editor.doc.nodesBetween(
                from,
                commentsEditorAnchor2,
                (
                  chipLineDeleteExtension?: Dynamic,
                  ..._extraArguments: unknown[]
                ): undefined =>
                  void (enabled ||= resolveCommentsEditorHardBreak(
                    chipLineDeleteExtension,
                  )),
              ),
              enabled &&
                this.editor.commands.deleteRange({
                  from: from,
                  to: commentsEditorAnchor2,
                }));
        },
      };
    },
  }));
  (CommentsEditorNow = {
    now: (..._extraArguments: unknown[]) => Date.now(),
    facts: (..._extraArguments: unknown[]): Dynamic =>
      resolvePlatformLoadingAndStatusOnline(),
    whenBack: (
      commentsEditorNow?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => clearPlatformLoadingAndStatusDelete(commentsEditorNow),
  });
  (commentsEditorValue20000 = 2e4);
  (commentsEditorValue256 = 256);
  (commentsEditorValue16 = 16);
  (commentsEditorPattern2 = /^dock-ask:[A-Za-z0-9_.:~/-]{1,256}$/);
  (commentsEditorPattern3 = /^[A-Za-z0-9_.:-]{1,256}$/);
  (commentsEditorPattern4 = /^claude-ask-card:/);
  (isCommentsEditorPrototype = (
    commentsEditorPrototype?: Dynamic,
    ..._extraArguments: unknown[]
  ) => !(commentsEditorPrototype in Object.prototype));
  (commentsEditorMap = new (Map as Dynamic)());
  (commentsEditorSet2 = new (Set as Dynamic)());
  (isCommentsEditorBoxGoneAt = (..._extraArguments: unknown[]) => {
    let now = Date.now();
    for (let isCommentsEditorBoxGoneAtResult of commentsEditorSet2 as Dynamic) {
      if (
        isCommentsEditorBoxGoneAtResult.boxGoneAt === null ||
        now - isCommentsEditorBoxGoneAtResult.boxGoneAt < 6e4
      )
        return true;
      commentsEditorSet2.delete(isCommentsEditorBoxGoneAtResult);
    }
    return false;
  });
  (resolveCommentsEditorEncode = (
    commentsEditorEncode?: Dynamic,
    ..._extraArguments: unknown[]
  ) => new TextEncoder().encode(commentsEditorEncode).length);
  (resolveCommentsEditorValue2 = (
    commentsEditorValue2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    try {
      return commentsEditorValue2();
    } catch {
      return options;
    }
  });
  (collectCommentsEditorText = (
    collectCommentsEditorText3?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    type: `doc`,
    content: collectCommentsEditorText3
      .split(
        `
`,
      )
      .map(
        (text?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          text === ``
            ? {
                type: `paragraph`,
              }
            : {
                type: `paragraph`,
                content: [
                  {
                    type: `text`,
                    text: text,
                  },
                ],
              },
      ),
  }));
  (collectCommentsEditorText2 = (
    collectCommentsEditorText22?: unknown,
    options: Dynamic = 0,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (
      typeof collectCommentsEditorText22 != `object` ||
      !collectCommentsEditorText22 ||
      options > commentsEditorValue16
    )
      return ``;
    let collectCommentsEditorText23: Dynamic = collectCommentsEditorText22;
    if (collectCommentsEditorText23.type === `text`)
      return typeof collectCommentsEditorText23.text == `string`
        ? collectCommentsEditorText23.text
        : ``;
    if (collectCommentsEditorText23.type === `hardBreak`)
      return `
`;
    if (collectCommentsEditorText23.type === `mention`) {
      let attrs: Dynamic = collectCommentsEditorText23.attrs ?? {};
      return `@${String(attrs.label ?? attrs.id ?? ``)}`;
    }
    if (collectCommentsEditorText23.type === `refchip`)
      return resolveEditorAnchorsAndMentionsValue13(
        collectCommentsEditorText23.attrs ?? {},
      );
    let mappedContent: Dynamic = Array.isArray(
      collectCommentsEditorText23.content,
    )
      ? collectCommentsEditorText23.content.map(
          (content?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            collectCommentsEditorText2(content, options + 1),
        )
      : [];
    return collectCommentsEditorText23.type === `doc`
      ? mappedContent.join(`
`)
      : mappedContent.join(``);
  });
  (resolveCommentsEditorValue3 = (
    items?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    items === null ||
    (typeof items == `string` && items.length <= commentsEditorValue256));
  (resolveCommentsEditorText = (
    commentsEditorText?: unknown,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (typeof commentsEditorText != `object` || !commentsEditorText) return null;
    let commentsEditorText2: Dynamic = commentsEditorText;
    if (commentsEditorText2.marks !== undefined) return null;
    if (commentsEditorText2.type === `text`)
      return typeof commentsEditorText2.text == `string` &&
        commentsEditorText2.text.length > 0
        ? {
            type: `text`,
            text: commentsEditorText2.text,
          }
        : null;
    if (commentsEditorText2.type === `hardBreak`)
      return {
        type: `hardBreak`,
      };
    let id: Dynamic = commentsEditorText2.attrs?.id ?? null;
    let label: Dynamic = commentsEditorText2.attrs?.label ?? null;
    if (
      commentsEditorText2.type === `mention` &&
      resolveCommentsEditorValue3(id) &&
      resolveCommentsEditorValue3(label)
    )
      return {
        type: `mention`,
        attrs: {
          id: id,
          label: label,
        },
      };
    let ref: Dynamic = commentsEditorText2.attrs?.ref;
    return commentsEditorText2.type === `refchip` &&
      typeof ref == `string` &&
      ref.length <= commentsEditorValue256 &&
      resolveEditorAnchorsAndMentionsValue10(ref) !== null &&
      resolveCommentsEditorValue3(label)
      ? {
          type: EditorAnchorsAndMentionsRefchip,
          attrs: {
            ref: ref,
            label: label,
          },
        }
      : null;
  });
  (collectCommentsEditorParagraph2 = (
    collectCommentsEditorParagraph22?: unknown,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (
      typeof collectCommentsEditorParagraph22 != `object` ||
      !collectCommentsEditorParagraph22
    )
      return null;
    let collectCommentsEditorParagraph23: Dynamic =
      collectCommentsEditorParagraph22;
    if (
      collectCommentsEditorParagraph23.type !== `doc` ||
      collectCommentsEditorParagraph23.marks !== undefined ||
      !Array.isArray(collectCommentsEditorParagraph23.content)
    )
      return null;
    let content: Dynamic = [];
    for (let node of collectCommentsEditorParagraph23.content as Dynamic) {
      if (node?.type !== `paragraph` || node.marks !== undefined) return null;
      if (node.content === undefined) {
        content.push({
          type: `paragraph`,
        });
        continue;
      }
      if (!Array.isArray(node.content)) return null;
      let content2: Dynamic = node.content.map(resolveCommentsEditorText);
      if (content2.includes(null)) return null;
      content.push({
        type: `paragraph`,
        content: content2,
      });
    }
    return {
      type: `doc`,
      content: content,
    };
  });
  (resolveCommentsEditorTrim2 = (
    commentsEditorTrim2?: Dynamic,
    options?: unknown,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let commentsEditorValue2: Dynamic = resolveCommentsEditorValue2(
      (..._extraArguments: unknown[]): Dynamic =>
        JSON.stringify(commentsEditorTrim2 ?? null).length <= 65536
          ? collectCommentsEditorParagraph2(commentsEditorTrim2)
          : null,
      null,
    );
    if (commentsEditorValue2 !== null)
      return collectCommentsEditorText2(commentsEditorValue2).trim() === ``
        ? null
        : commentsEditorValue2;
    let optionsSlice: Dynamic = (
      commentsEditorTrim2 === undefined
        ? typeof options == `string`
          ? options
          : ``
        : collectCommentsEditorText2(commentsEditorTrim2)
    ).slice(0, commentsEditorValue20000);
    return optionsSlice.trim() === ``
      ? null
      : collectCommentsEditorText(optionsSlice);
  });
  (resolveCommentsEditorTest = (
    commentsEditorTest?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof commentsEditorTest == `string` &&
    !isTmpId(commentsEditorTest) &&
    !commentsEditorPattern4.test(commentsEditorTest) &&
    isCommentsEditorPrototype(commentsEditorTest) &&
    (commentsEditorPattern2.test(commentsEditorTest) ||
      commentsEditorPattern3.test(commentsEditorTest)));
  (resolveCommentsEditorValue4 = (
    items?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof items == `string` &&
    items.length <= commentsEditorValue256 &&
    isCommentsEditorPrototype(items));
  (resolveCommentsEditorPageId = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    event !== null &&
    resolveCommentsEditorTest(event.key) &&
    resolveCommentsEditorValue4(event.pageId) &&
    (event.json === undefined ||
      resolveCommentsEditorValue2(
        (..._extraArguments: unknown[]) =>
          resolveCommentsEditorEncode(JSON.stringify(event.json)) <= 65536 &&
          collectCommentsEditorParagraph2(event.json) !== null,
        false,
      )));
  (resolveCommentsEditorJson = (
    commentsEditorJson?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (
      commentsEditorJson.json === undefined ||
      resolveCommentsEditorEncode(JSON.stringify(commentsEditorJson.json)) <=
        65536
    )
      return commentsEditorJson;
    let { json: commentsEditorJson2, ...commentsEditorJson3 }: Dynamic =
      commentsEditorJson;
    return {
      ...commentsEditorJson3,
      text: collectCommentsEditorText2(commentsEditorJson2).slice(
        0,
        commentsEditorValue20000,
      ),
    };
  });
  (commentsEditorUrlPattern = /^(?:text|search|url|tel|email|)$/);
  (isCommentsEditorHidden = (..._extraArguments: unknown[]) => {
    if (typeof document === "undefined") return false;
    let activeElement2 = document.activeElement;
    if (
      activeElement2 === null ||
      activeElement2 === document.body ||
      (document.visibilityState !== `hidden` && !document.hasFocus())
    )
      return false;
    for (let file of commentsEditorMap.values() as Dynamic)
      if (
        resolveCommentsEditorValue2(
          (..._extraArguments: unknown[]) =>
            file.root()?.contains(activeElement2) === true,
          false,
        )
      )
        return false;
    return activeElement2 instanceof HTMLTextAreaElement
      ? activeElement2.value.trim() !== ``
      : activeElement2 instanceof HTMLInputElement
        ? commentsEditorUrlPattern.test(activeElement2.type) &&
          activeElement2.value.trim() !== ``
        : activeElement2 instanceof HTMLElement &&
          activeElement2.isContentEditable &&
          (activeElement2.textContent ?? ``).trim() !== ``;
  });
  (CommentsEditorCollect = {
    collect: (..._extraArguments: unknown[]): Dynamic =>
      resolveCommentsEditorReplies(),
    restore: resolveCommentsEditorJson2,
    carriedUnsaved: isCommentsEditorValues,
    hold: resolveCommentsEditorValue5,
    why: resolveCommentsEditorOutbox,
    active: isCommentsEditorActiveElement,
  });
  (CommentsEditorState3 = updatePlatformApiAndAuthTopic2);
  (CommentsEditorState4 = liveDoor);
  (CommentsEditorRoomProject = `room:project/`);
  (CommentsEditorContains = lazyZod.enum([
    `eq`,
    `contains`,
    `matches`,
  ]));
  (commentsEditorSet3 = new (Set as Dynamic)([
    `__proto__`,
    `constructor`,
    `prototype`,
  ]));
  (CommentsEditorMessage2 = lazyZod
    .unknown()
    .refine(
      (commentsEditorMessage2?: Dynamic, ..._extraArguments: unknown[]) =>
        !isCommentsEditorPush(commentsEditorMessage2),
      {
        message: `value carries a prototype-polluting own key (__proto__/constructor/prototype) — refused loudly, never dropped or crashed`,
      },
    )
    .refine(
      (commentsEditorMessage2?: Dynamic, ..._extraArguments: unknown[]) =>
        isCommentsEditorIsFinite(commentsEditorMessage2),
      {
        message: `value is not plain JSON (function/undefined/non-finite, or shared/circular references)`,
      },
    ));
  (commentsEditorSet4 = new (Set as Dynamic)([
    `__proto__`,
    `constructor`,
    `prototype`,
  ]));
  (commentsEditorPattern5 = /^\d+$/);
  (CommentsEditorMessage3 = lazyZod.union([
    lazyZod
      .string()
      .refine(
        (commentsEditorMessage3?: Dynamic, ..._extraArguments: unknown[]) =>
          !commentsEditorSet4.has(commentsEditorMessage3),
        {
          message: `patch: prototype-key segment`,
        },
      )
      .refine(
        (commentsEditorMessage3?: Dynamic, ..._extraArguments: unknown[]) =>
          !commentsEditorPattern5.test(commentsEditorMessage3),
        {
          message: `patch: numeric-string segment (array indexes are numbers)`,
        },
      ),
    lazyZod.number().int().nonnegative(),
  ]));
  (CommentsEditorPath = lazyZod
    .strictObject({
      op: lazyZod.enum([`set`, `delete`]),
      path: lazyZod
        .array(CommentsEditorMessage3)
        .min(1)
        .max(
          64,
          `patch: path deeper than 64 segments — the two-reader depth bound (lane-proposed, pending the differential fixture)`,
        ),
      value: CommentsEditorMessage2.optional(),
    })
    .refine(
      (operation?: Dynamic, ..._extraArguments: unknown[]) =>
        operation.op === `set` || operation.value === undefined,
      {
        message: `patch: delete carries no value`,
      },
    )
    .refine(
      (operation?: Dynamic, ..._extraArguments: unknown[]) =>
        operation.op === `delete` || operation.value !== undefined,
      {
        message: `patch: set requires a defined value (an omitted or explicit-undefined value would write an own-undefined key — decided: refuse, don't guess)`,
      },
    ));
  lazyZod.array(CommentsEditorPath);
  (commentsEditorMessageSchema = lazyZod
    .string()
    .regex(/^[a-z0-9][a-z0-9_-]{0,31}$/i)
    .refine(
      (commentsEditorMessageSchema3?: Dynamic, ..._extraArguments: unknown[]) =>
        ![`constructor`, `prototype`, `__proto__`].includes(
          commentsEditorMessageSchema3.toLowerCase(),
        ),
      {
        message: `tab-handle: prototype-polluting name`,
      },
    )
    .describe(`Scope-local tab handle (e.g. "t1") — slug grammar, 1-32 chars.`));
  (commentsEditorMessageSchema2 = lazyZod
    .string()
    .min(1)
    .max(64)
    .refine(
      (commentsEditorMessageSchema22?: Dynamic, ..._extraArguments: unknown[]) =>
        ![`constructor`, `prototype`, `__proto__`].includes(
          commentsEditorMessageSchema22.toLowerCase(),
        ),
      {
        message: `cast-handle: prototype-polluting name`,
      },
    )
    .refine(
      (commentsEditorMessageSchema22?: Dynamic, ..._extraArguments: unknown[]) =>
        !commentsEditorMessageSchema22.includes(`@`),
      {
        message: `cast-handle: bare token, never email-shaped`,
      },
    )
    .refine(
      (commentsEditorMessageSchema22?: Dynamic, ..._extraArguments: unknown[]) =>
        !/^\d+$/.test(commentsEditorMessageSchema22),
      {
        message: `cast-handle: all-digit names collide with array indices in world paths — add a letter`,
      },
    )
    .describe(
      `Cast member name later methods reference (e.g. "ada"). Bare token: the P0 wall against spelling a real person.`,
    ));
  (commentsEditorDescribeSchema = lazyZod
    .array(CommentsEditorMessage3)
    .min(1)
    .describe(`Path segments into the World value, own-key resolved.`));
  (commentsEditorDescribeSchema2 = CommentsEditorMessage2.describe(
    `One nested room intent, validated by the real door's own parse at the seam (path-identity law). Prototype-polluting own keys refuse at THIS boundary too (zJsonSafe) — defense-in-depth ahead of the seam's own parse.`,
  ));
  lazyZod.strictObject({});
  lazyZod.strictObject({
    name: commentsEditorMessageSchema2,
  });
  lazyZod.strictObject({
    name: commentsEditorMessageSchema
      .optional()
      .describe(
        `The author's word for the tab (slug grammar); auto-minted when absent. make returns the NAME.`,
      ),
    user: commentsEditorMessageSchema2
      .optional()
      .describe(
        `Whose tab — must name a minted cast member (the cast wall). OPTIONAL (R6, the user narrow): absent = the runtime's one reserved implicit-viewer cast, stamped onto the tab row. Explicit user is the multi-principal opt-in.`,
      ),
    ref: lazyZod
      .strictObject({
        object: lazyZod.string().min(1),
        id: lazyZod.string().min(1),
      })
      .optional()
      .describe(
        `What the tab is parked on, for its WHOLE LIFE: {object, id} with the MINTED ref threaded from the create ack (Q2). Validated against world memory at declaration time (tab-ref-unowned) — declare the tab AFTER the births that mint its target. Absent = the product's empty start state.`,
      ),
  });
  lazyZod.strictObject({
    text: lazyZod
      .string()
      .describe(`What the user says, verbatim. Lands inline on the session row.`),
  });
  (commentsEditorVerdictSchema = lazyZod.strictObject({
    verdict: lazyZod.literal(`deny`),
    reason: lazyZod
      .string()
      .min(1)
      .optional()
      .describe(
        `The expected deny reason — exact-equality, the "widget-invalid:<rule>" prefix arm, or the bare "prose-unknown-node" word (its actual reason carries a ": <detail>" tail). Omit for a verdict-only expectation (the R9 byte-identity probes: expect cannot spell "same as the last one").`,
      ),
  }));
  lazyZod.strictObject({
    tab: commentsEditorMessageSchema
      .optional()
      .describe(
        `The acting tab; absent = the harness actor form (no user credited).`,
      ),
    op: commentsEditorDescribeSchema2,
    expect: commentsEditorVerdictSchema.optional(),
  });
  lazyZod
    .strictObject({
      kind: lazyZod
        .string()
        .min(1, `objects(): empty kind — omit the field to select every object`)
        .refine(
          (callback?: Dynamic, ..._extraArguments: unknown[]) =>
            !callback.includes(`/`),
          {
            message: `objects(): kind is the key's object segment ("node", "utterance") — never a path`,
          },
        )
        .optional()
        .describe(`Key-prefix filter: only entries whose key starts "<kind>/".`),
      id: lazyZod
        .string()
        .min(
          1,
          `objects(): empty id — omit the field to select every object of the kind`,
        )
        .optional()
        .describe(
          `Point selection (R9, the see:world merge): beside kind, selects the ONE entry whose key is "<kind>/<id>". The point read is objects({kind, id, path})[0] — a missing object is an empty selection ([0] = undefined, a failed check), a missing projection rides [null] (a failed eq). Legal only beside kind.`,
        ),
      path: commentsEditorDescribeSchema
        .optional()
        .describe(
          `Per-entry projection through the own-key law; segments walk the ENTRY ({key, kind, id, value}) — ["value", …] reaches the object, ["id"] selects ids. A missing projection rides as null (absence visible, never dropped).`,
        ),
    })
    .refine(
      (entry?: Dynamic, ..._extraArguments: unknown[]) =>
        entry.id === undefined || entry.kind !== undefined,
      {
        message: `objects(): id without kind — a point selection names both halves of "<kind>/<id>"`,
      },
    );
  lazyZod.strictObject({
    title: lazyZod.string().min(1),
  });
  lazyZod.strictObject({
    tab: commentsEditorMessageSchema.optional(),
  });
  lazyZod
    .strictObject({
      fn: CommentsEditorContains.default(`eq`).describe(
        `Gate-lane grader; eq is the corpus default (247 assertEq).`,
      ),
      got: CommentsEditorMessage2.optional().describe(
        `The observed value (usually a see projection). UNDEFINED IS LEGAL and records a FAILED check row (a missing projection is exactly the eval failure checks exist to catch — never a parse error). Respell: actual→got — the check ROW's own field names, nothing translates.`,
      ),
      want: CommentsEditorMessage2.describe(
        `REQUIRED (absence never means something; fn:'exists' is the recorded future route). ALWAYS the raw payload value (R10, the want-unify gavel): eq's expected value, contains' element/substring, matches' pattern string. The grader-args object left the authoring surface.`,
      ),
      flags: lazyZod
        .string()
        .regex(
          /^[ims]*$/,
          `check: flags limited to i/m/s (the u flag is rejected rather than half-implemented; g/y are iteration state, d is irrelevant)`,
        )
        .optional()
        .describe(
          `Regex flags — matches' optional sibling (R10). Legal only beside fn:"matches".`,
        ),
      what: lazyZod
        .string()
        .describe(
          `The claim, verbatim — the check row's what. Respell: label→what (the envelope freed the word).`,
        ),
    })
    .refine(
      (callback?: Dynamic, ..._extraArguments: unknown[]) =>
        callback.flags === undefined || callback.fn === `matches`,
      {
        message: `check: flags is legal only beside fn:"matches"`,
      },
    );
  lazyZod.strictObject({
    target: lazyZod
      .discriminatedUnion(`kind`, [
        lazyZod.strictObject({
          kind: lazyZod.literal(`path`),
          path: commentsEditorDescribeSchema,
        }),
      ])
      .describe(
        `What gets graded — kind-discriminated (the union gavel): a World projection ({kind:'path', path}).`,
      ),
    rubric: lazyZod.string(),
    max: lazyZod
      .number()
      .positive()
      .default(1)
      .describe(
        `Grade-lane normalization: outcomes are {value, max} and NEVER gate CI. OPTIONAL, default 1 (R13) — the row records the RESOLVED max.`,
      ),
  });
  lazyZod.strictObject({
    note: lazyZod.string().optional(),
  });
  (CommentsEditorCreateContext2 = (0, React.createContext)(liveScope));
  (resolveCommentsEditorUseContext2 = (
    ..._extraArguments: unknown[]
  ): Dynamic => (0, React.useContext)(CommentsEditorCreateContext2));
  (resolveCommentsEditorUseContext3 = (..._extraArguments: unknown[]) =>
    (0, React.useContext)(CommentsEditorCreateContext2) !== liveScope);
  (CommentsEditorCreateContext3 = (0, React.createContext)(undefined));
  (0, React.createContext)(undefined);
  api.viewstate.get;
  api.viewstate.put;
  (commentsEditorValue15000 = 15e3);
}

export {
  CommentsEditorCollect,
  CommentsEditorCoworkerObservers,
  DocNode,
  HardBreakNode,
  ParagraphNode,
  ShiftBackspaceExtension,
  TextNode,
  clearCommentsEditorBoxGoneAt,
  clearCommentsEditorNow,
  commentsEditorSet,
  filterCommentsEditorEmoji,
  filterCommentsEditorLabel,
  isCommentsEditorElement,
  isCommentsEditorRank,
  loadCommentsEditorNow,
  resolveCommentsEditorAdmit,
  resolveCommentsEditorAgent,
  resolveCommentsEditorAnchor,
  resolveCommentsEditorChannel,
  resolveCommentsEditorFailed,
  resolveCommentsEditorHardBreak,
  resolveCommentsEditorIncludes,
  resolveCommentsEditorKind,
  resolveCommentsEditorLabel,
  resolveCommentsEditorLine,
  resolveCommentsEditorPid2,
  resolveCommentsEditorPostOrDiscardYourCommentFirst,
  resolveCommentsEditorReactionOnly,
  resolveCommentsEditorSessions,
  resolveCommentsEditorSignal,
  resolveCommentsEditorSlice2,
  resolveCommentsEditorStore,
  resolveCommentsEditorStore2,
  resolveCommentsEditorStore3,
  resolveCommentsEditorStore4,
  resolveCommentsEditorToClaude,
  resolveCommentsEditorTrim,
  resolveCommentsEditorUseContext2,
  resolveCommentsEditorUseContext4,
  resolveCommentsEditorUser,
  resolveCommentsEditorValue,
  resolveCommentsEditorValue7,
  updateCommentsEditorDelete,
  updateCommentsEditorFailed,
  updateCommentsEditorLanded,
  useCommentsEditorState,
  useCommentsEditorState2,
  useCommentsEditorState3,
  useCommentsEditorState4,
  useCommentsEditorThen,
  useCommentsEditorThen2,
  useCommentsEditorUseSyncExternalStore,
};
