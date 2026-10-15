/** BaoCut: comment composer from index-CX4IZqzA.js. */
import type { Dynamic } from "../interop/legacy-dynamic";
import {
  Button,
  CommentsEditorCoworkerObservers,
  DataModelSchemasMessage3,
  Dots,
  EditorAnchorsAndMentionsLabel,
  EditorAnchorsAndMentionsLabel2,
  EditorExtensionsMoreActions,
  Extension,
  Menu,
  PENDING_ASK_TTL_MS,
  Placeholder,
  PlatformApiAndAuthParticipants,
  PlatformApiAndAuthPriming,
  PlatformApiAndAuthUser,
  Plugin,
  Shimmer,
  TextSelection,
  Tooltip,
  UiOverlaysAndIconsCustomIcon,
  api,
  apiFetcher,
  cachedArtifactReference,
  collectEditorAnchorsAndMentionsText,
  emitTelemetryEvent,
  filterCommentsEditorLabel,
  frameInlineAvatar,
  framePeekProfile,
  frameSearchPeople,
  frameViewerWithFace,
  isCommentsEditorElement,
  isDataOperationControlRoot,
  isEditorAnchorsAndMentionsSuggestion,
  isFrameArtifact,
  loadEditorExtensionsPluginKey,
  renderMenuItems,
  resolveCommentsActionsAndSelectionFrame,
  resolveCommentsActionsAndSelectionNoun,
  resolveCommentsActionsAndSelectionValue6,
  resolveCommentsEditorAnchor,
  resolveCommentsEditorChannel,
  resolveCommentsEditorHardBreak,
  resolveCommentsEditorKind,
  resolveCommentsEditorLine,
  resolveCommentsEditorSessions,
  resolveCommentsEditorSlice2,
  resolveDataModelSchemasTrim,
  resolveEditorAnchorsAndMentionsBoundaryMarker,
  resolveEditorAnchorsAndMentionsGroup,
  resolveEditorAnchorsAndMentionsLabel2,
  resolveEditorAnchorsAndMentionsSpan,
  resolveEditorAnchorsAndMentionsTest,
  resolveEditorAnchorsAndMentionsValue12,
  resolveEditorExtensionsDelete,
  resolveEditorExtensionsValue9,
  resolveEditorHostFloor,
  resolveEditorHostFloor2,
  resolvePlatformApiAndAuthUseContext2,
  resolvePlatformFeatureFlagsEnabled2,
  resolveUiDesignSystemValue2,
  searchReferenceCandidates,
  searchTabs,
  updatePlatformSyncAndRoutingDirectory,
  useCommentStore,
} from "./dependencies";
import {
  PHONE_TOUCH_TARGET_CLASS,
  React,
  jsxRuntime,
} from "./bootstrap";
import {
  isDocumentFocusedElsewhere,
} from "./phone-overlays/export-progress-dialog";
import {
  IconButton,
} from "./run-review";
import {
  ClaudeTypingIndicator,
  CommentAnchorsState5,
  isCommentAnchorsPeople,
} from "./comment-anchors/use-comment-anchors-sheets-component";
import {
  CommentAnchors_Resolved,
  CommentAnchors_Styles,
  UseCommentAnchorsRoleComponent,
  commentAnchorsLimit202,
  createCommentMentionSearch,
  resolveCommentAnchorsParse,
  resolveCommentAnchorsReplace2,
} from "./comment-anchors/create-comment-mention-search";
import {
  CommentComposer_ShowWhoReacted,
  ReactionNames,
} from "./comment-anchors/see-more-pill";

function WhoReacted(
  { reactions: reactions, children: children }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [pressed, setPressed]: Dynamic = (0, React.useState)(false);
  let ariaControls: Dynamic = (0, React.useId)();
  return Object.values(reactions).some(
    (items?: Dynamic, ..._extraArguments: unknown[]) => items.length > 0,
  ) ? (
    <div className={`flex flex-col`} data-testid={`who-reacted`}>
      <div className={`gap-xs flex flex-wrap items-center`}>
        {children}
        <Button
          variant={`ghost`}
          iconOnly={true}
          icon={
            <UiOverlaysAndIconsCustomIcon
              name={`Users`}
              customSize={commentAnchorsLimit202}
            />
          }
          aria-label={CommentComposer_ShowWhoReacted}
          pressed={pressed}
          tooltip={false}
          className={PHONE_TOUCH_TARGET_CLASS}
          aria-controls={ariaControls}
          data-testid={`who-reacted-toggle`}
          onClick={(..._extraArguments: unknown[]): Dynamic =>
            setPressed(
              (whoReacted?: Dynamic, ..._extraArguments: unknown[]) =>
                !whoReacted,
            )
          }
        />
      </div>
      <div id={ariaControls}>
        {pressed && <ReactionNames reactions={reactions} />}
      </div>
    </div>
  ) : (
    children
  );
}

function ResolvedMark({ t: t5 }: Dynamic, ..._extraArguments: unknown[]) {
  return (
    <Tooltip content={resolveCommentAnchorsReplace2(t5)} side={`top`}>
      <span
        role={`img`}
        aria-label={CommentAnchors_Resolved}
        data-testid={`resolved-mark`}
        className={`inline-flex size-5 items-center justify-center`}
      >
        <UiOverlaysAndIconsCustomIcon
          name={`CheckCircleFilled`}
          customSize={14}
          className={`text-accent`}
        />
      </span>
    </Tooltip>
  );
}

function UseCommentComposerLabelComponent(
  { onClick: onClick, label: label, icon: icon, pinned: pinned }: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    <Tooltip content={label} side={`top`}>
      <IconButton
        aria-label={label}
        size={20}
        icon={icon}
        onClick={(
          commentComposerLabel?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          commentComposerLabel.stopPropagation();
          onClick();
        }}
        className={resolveUiDesignSystemValue2(
          !pinned && CommentAnchors_Styles,
        )}
      />
    </Tooltip>
  );
}

function UseCommentComposerModalComponent(
  { onCopyLink: onCopyLink, onEdit: onEdit, onDelete: onDelete }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let elementRef: Dynamic = (0, React.useRef)(null);
  let elementRef2: Dynamic = (0, React.useRef)(null);
  let [useCommentComposerModalState]: Dynamic = (0, React.useState)(
    (..._extraArguments: unknown[]): Dynamic =>
      isDataOperationControlRoot(elementRef2, elementRef),
  );
  return (
    <Menu.Root modal={false} {...useCommentComposerModalState.root}>{<Tooltip content={EditorExtensionsMoreActions}>
            <Menu.Trigger render={<IconButton
              ref={elementRef}
              aria-label={EditorExtensionsMoreActions}
              size={20}
              icon={<UiOverlaysAndIconsCustomIcon name={`DotsHorizontal`} customSize={14} />}
              onClick={(commentComposerModal?: Dynamic, ..._extraArguments: unknown[]): Dynamic => commentComposerModal.stopPropagation()}
            />} />
          </Tooltip>}{<Menu.Popup
            ref={elementRef2}
            align={`end`}
            finalFocus={useCommentComposerModalState.finalFocus}
            onClick={(commentComposerModal?: Dynamic, ..._extraArguments: unknown[]): Dynamic => commentComposerModal.stopPropagation()}
          >
            {renderMenuItems([{
      label: `Copy link`,
      onSelect: onCopyLink
    }, onEdit && {
      label: `Edit`,
      onSelect: onEdit
    }, onDelete && {
      label: resolveEditorExtensionsDelete(`comment`),
      variant: `danger`,
      separatorBefore: true,
      onSelect: onDelete
    }].filter(Boolean))}
          </Menu.Popup>}</Menu.Root>
  );
}

var CommentComposerState: string[][];

var resolveCommentComposerTest: Dynamic;

var resolveCommentComposerValue: (commentComposerValue?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => string;

var filterCommentComposerFilter: Dynamic;

function PendingAsk({ asks: asks }: Dynamic, ..._extraArguments: unknown[]) {
  let [, setCountState]: Dynamic = (0, React.useState)(0);
  (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    let setInterval2 = setInterval(
      (..._extraArguments: unknown[]): Dynamic =>
        setCountState(
          (pendingAsk?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            pendingAsk + 1,
        ),
      6e4,
    );
    return (..._extraArguments: unknown[]) => clearInterval(setInterval2);
  }, []);
  let pendingAskResult: Dynamic = resolvePlatformFeatureFlagsEnabled2(
    CommentsEditorCoworkerObservers,
  );
  let pendingAskResult2: Dynamic = resolvePlatformApiAndAuthUseContext2();
  let parse = Date.parse(pendingAskResult2.now());
  let filterCommentComposerFilter2: Dynamic = filterCommentComposerFilter(
    asks,
    parse,
  );
  let lookup: Dynamic = new (Map as Dynamic)();
  for (let pendingAskResult3 of filterCommentComposerFilter2 as Dynamic) {
    let pendingAskResult4: Dynamic = resolveCommentsEditorChannel(
      pendingAskResult3,
      pendingAskResult,
    );
    let lookupEntry: Dynamic = lookup.get(pendingAskResult4);
    if (lookupEntry) {
      lookupEntry.n++;
      if (pendingAskResult3.askedAt < lookupEntry.oldest) {
        lookupEntry.oldest = pendingAskResult3.askedAt;
      }
      lookupEntry.channel ??= pendingAskResult3.channel;
      lookupEntry.channelId ??= pendingAskResult3.channelId;
    } else {
      lookup.set(pendingAskResult4, {
        label: pendingAskResult3.label,
        channel: pendingAskResult3.channel,
        channelId: pendingAskResult3.channelId,
        oldest: pendingAskResult3.askedAt,
        n: 1,
      });
    }
  }
  return (
    <jsxRuntime.Fragment>
      {[...lookup.values()].map(
        (item?: Dynamic, ..._extraArguments: unknown[]) => {
          let pendingAskResult3: Dynamic = resolveCommentsEditorLine(
            item,
            pendingAskResult,
          );
          return (
            <Tooltip
              content={pendingAskResult3.via ? `Asked via ${pendingAskResult3.via}` : item.channel ? `Asked in ${item.channel.startsWith(`#`) ? item.channel : `#${item.channel}`}` : item.channelId ? `Asked from Slack channel ${item.channelId}` : `Asked via ${item.label}`}
              multiline={true}
              key={resolveCommentsEditorChannel(item, pendingAskResult)}
            >{<div data-testid={`pending-ask`} className={`text-muted flex cursor-default items-center gap-1.5 text-[12px]`}>
                      <span className={`bg-accent-blue size-2 shrink-0 animate-pulse rounded-full`} />
                      <span className={`min-w-0 truncate`}>
                        {`Waiting on `}
                        {pendingAskResult3.line}
                        {item.n > 1 ? ` · ${item.n} asks · oldest ${resolveCommentComposerValue(item.oldest, parse)}` : ` · asked ${resolveCommentComposerValue(item.oldest, parse)}`}
                      </span>
                    </div>}</Tooltip>
          );
        },
      )}
    </jsxRuntime.Fragment>
  );
}

// BaoCut: 批注里智能体正在回复时的署名叫 Agent，不叫 Claude。
function UseCommentComposerTextComponent(
  { text: text }: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    <div className={`flex flex-col gap-1`}>
      <div className={`flex items-center gap-2 text-xs`}>
        <UseCommentAnchorsRoleComponent />
        <span className={`font-semibold`}>{`Agent`}</span>
      </div>
      <div className={`text-secondary flex items-center gap-1.5 text-[13px]`}>
        <UseCommentComposerDataClaudeActivityDotsComponent />
        <Shimmer variant={`secondary`} className={`min-w-0 truncate`}>
          {resolveCommentComposerTest(text)}
        </Shimmer>
      </div>
    </div>
  );
}

function UseCommentComposerDataClaudeActivityDotsComponent(
  ..._extraArguments: [Readonly<Record<string, unknown>>?, ...unknown[]]
) {
  return (
    <span
      className={`inline-flex size-4 shrink-0 items-center justify-center`}
      data-claude-activity-dots={``}
    >
      <Dots />
    </span>
  );
}

function ClaudePendingRow(
  ..._extraArguments: [Readonly<Record<string, unknown>>?, ...unknown[]]
) {
  return (
    <div
      role={`status`}
      aria-live={`polite`}
      className={`text-secondary text-body flex items-center gap-2`}
      data-testid={`claude-pending-row`}
    >
      <ClaudeTypingIndicator />
      <Shimmer variant={`secondary`} className={`min-w-0 truncate`}>
        {DataModelSchemasMessage3}
      </Shimmer>
    </div>
  );
}

var CommentComposerState2: Dynamic;

var commentComposerWeakMap: Dynamic;

var commentComposerLimit30000: number;

var CommentComposerSilent: {
    silent: boolean;
};

function resolveCommentComposerRows(..._extraArguments: unknown[]): undefined {
  if (resolvePlatformFeatureFlagsEnabled2(`docObservers`)) {
    if (!(CommentComposerState2 && CommentComposerState2.exp > Date.now())) {
      CommentComposerState2 = {
        rows: CommentComposerState2?.rows ?? [],
        exp: Date.now() + commentComposerLimit30000,
      };
      api
        .ccSessions(CommentComposerSilent)
        .then(
          (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            (CommentComposerState2 = {
              ...result,
              exp: Date.now() + commentComposerLimit30000,
            }),
        )
        .catch(
          (..._extraArguments: unknown[]): Dynamic =>
            (CommentComposerState2 = {
              rows: [],
              reason: `ccr_error`,
              exp: Date.now() + commentComposerLimit30000,
            }),
        );
    }
  }
}

var resolveCommentComposerLabel: Dynamic;

function getCommentComposerToLowerCase(
  commentComposer?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!commentComposerWeakMap.get(commentComposer)) return [];
  resolveCommentComposerRows();
  let normalizedOptions: Dynamic = options.toLowerCase();
  return (CommentComposerState2?.rows ?? [])
    .filter(
      (row?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        row.title.toLowerCase().includes(normalizedOptions),
    )
    .slice(0, 6)
    .map(resolveCommentComposerLabel);
}

var CommentComposerState3: Dynamic;

var commentComposerWeakMap2: Dynamic;

var commentComposerLimit300002: number;

function resolveCommentComposerContainer(
  container?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (
    !container.startsWith(`projects/`) ||
    !resolvePlatformFeatureFlagsEnabled2(`docObservers`) ||
    !resolvePlatformFeatureFlagsEnabled2(`coworkerObservers`) ||
    (CommentComposerState3 &&
      CommentComposerState3.container === container &&
      CommentComposerState3.exp > Date.now())
  )
    return;
  let CommentComposerState32: Dynamic =
    CommentComposerState3?.container === container
      ? CommentComposerState3
      : null;
  CommentComposerState3 = {
    container: container,
    rows: CommentComposerState32?.rows ?? [],
    capped: CommentComposerState32?.capped ?? false,
    exp: Date.now() + commentComposerLimit300002,
  };
  api.coworkers
    .list(container, CommentComposerSilent)
    .then(
      (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        (CommentComposerState3 = {
          container: container,
          rows: result.rows,
          capped: result.capped,
          exp: Date.now() + commentComposerLimit300002,
        }),
    )
    .catch(
      (..._extraArguments: unknown[]): Dynamic =>
        (CommentComposerState3 = {
          container: container,
          rows: [],
          capped: false,
          exp: Date.now() + commentComposerLimit300002,
        }),
    );
}

function getCommentComposerEnabled(
  commentComposerEnabled?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let commentComposerWeakMap2Entry: Dynamic = commentComposerWeakMap2.get(
    commentComposerEnabled,
  );
  if (
    !commentComposerWeakMap2Entry?.startsWith(`projects/`) ||
    !resolvePlatformFeatureFlagsEnabled2(`docObservers`) ||
    !resolvePlatformFeatureFlagsEnabled2(`coworkerObservers`)
  )
    return [];
  resolveCommentComposerContainer(commentComposerWeakMap2Entry);
  let CommentComposerState32: Dynamic =
    CommentComposerState3?.container === commentComposerWeakMap2Entry
      ? CommentComposerState3
      : null;
  return filterCommentsEditorLabel(
    CommentComposerState32?.rows ?? [],
    options,
    {
      enabled: true,
      capped: CommentComposerState32?.capped ?? false,
    },
  );
}

var CommentComposer_Reftab: string;

var CommentComposer_Refpage: string;

var resolveCommentComposerStartsWith: Dynamic;

var commentComposerWeakMap3: Dynamic;

var commentComposerLimit300003: number;

var CommentComposerState4: Dynamic;

function resolveCommentComposerPid(
  pid?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (
    !(
      CommentComposerState4 &&
      CommentComposerState4.pid === pid &&
      CommentComposerState4.exp > Date.now()
    )
  ) {
    CommentComposerState4 = {
      pid: pid,
      rows:
        (CommentComposerState4?.pid === pid ? CommentComposerState4 : null)
          ?.rows ?? [],
      exp: Date.now() + commentComposerLimit300003,
    };
    resolveCommentsActionsAndSelectionFrame(pid, apiFetcher)
      .then((response?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        CommentComposerState4 = {
          pid: pid,
          rows:
            response.verdict === `allow` && response.value !== undefined
              ? searchTabs(
                  updatePlatformSyncAndRoutingDirectory(response.value),
                )
              : [],
          exp: Date.now() + commentComposerLimit300003,
        };
      })
      .catch(
        (..._extraArguments: unknown[]): Dynamic =>
          (CommentComposerState4 = {
            pid: pid,
            rows: [],
            exp: Date.now() + commentComposerLimit300003,
          }),
      );
  }
}

var CommentComposerState5: Dynamic;

function mapCommentComposerRows(..._extraArguments: unknown[]): undefined {
  if (!(CommentComposerState5 && CommentComposerState5.exp > Date.now())) {
    CommentComposerState5 = {
      rows: CommentComposerState5?.rows ?? [],
      exp: Date.now() + commentComposerLimit300003,
    };
    Promise.all([
      api
        .v3Directory(CommentComposerSilent)
        .catch((..._extraArguments: unknown[]): Dynamic => []),
      api
        .v3DirectoryOrg(CommentComposerSilent)
        .catch((..._extraArguments: unknown[]): Dynamic => []),
    ]).then(
      (
        [result, result2]: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        CommentComposerState5 = {
          rows: [...result, ...result2].map(
            (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
              id: item.id,
              label: item.name,
            }),
          ),
          exp: Date.now() + commentComposerLimit300003,
        };
      },
    );
  }
}

function getCommentComposerLabel(
  commentComposerLabel?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let commentComposerWeakMap3Entry: Dynamic =
    commentComposerWeakMap3.get(commentComposerLabel);
  if (commentComposerWeakMap3Entry === undefined) return [];
  resolveCommentComposerPid(commentComposerWeakMap3Entry);
  mapCommentComposerRows();
  let normalizedOptions: Dynamic = options.toLowerCase();
  let mappedFilteredRowsSlice: Dynamic = (
    CommentComposerState4?.pid === commentComposerWeakMap3Entry
      ? CommentComposerState4.rows
      : []
  )
    .filter(
      (row?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        normalizedOptions === `` ||
        row.name.toLowerCase().includes(normalizedOptions),
    )
    .slice(0, 6)
    .map(
      (
        filteredRowsSlice?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => ({
        id: `${CommentComposer_Reftab}${resolveCommentsActionsAndSelectionValue6(commentComposerWeakMap3Entry, filteredRowsSlice.id, commentComposerWeakMap3Entry)}`,
        label: filteredRowsSlice.name,
      }),
    );
  let normalizedCommentComposerWeakMap3Entry: Dynamic =
    commentComposerWeakMap3Entry.toLowerCase();
  let mappedItems: Dynamic = searchReferenceCandidates(
    (CommentComposerState5?.rows ?? []).filter(
      (row?: Dynamic, ..._extraArguments: unknown[]) =>
        row.id.toLowerCase() !== normalizedCommentComposerWeakMap3Entry,
    ),
    options,
  ).map(
    (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
      id: `${CommentComposer_Refpage}project/${item.id}`,
      label: item.label,
    }),
  );
  return [...mappedFilteredRowsSlice, ...mappedItems];
}

var CommentComposerState6: Dynamic;

var resolveCommentComposerValue2: Dynamic;

function* resolveCommentComposerAvatarUrl(
  commentComposerAvatarUrl?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Generator<Dynamic, Dynamic, Dynamic> {
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let dependencies2: Dynamic = function* (
    commentComposerAvatarUrl2?: Dynamic,
    name: Dynamic = ``,
    ..._extraArguments: unknown[]
  ): Generator<Dynamic, Dynamic, Dynamic> {
    if (
      !resolveEditorAnchorsAndMentionsTest(commentComposerAvatarUrl2) ||
      uniqueItems.has(commentComposerAvatarUrl2)
    )
      return;
    let dependencies3: Dynamic = dependencies(commentComposerAvatarUrl2);
    if (dependencies3 !== undefined && dependencies3.name !== ``) {
      uniqueItems.add(commentComposerAvatarUrl2);
      yield dependencies3;
    } else {
      if (name !== ``) {
        uniqueItems.add(commentComposerAvatarUrl2);
        yield {
          id: commentComposerAvatarUrl2,
          name: name,
          avatarUrl: ``,
          color: ``,
          email: null,
          isMe: false,
        };
      }
    }
  };
  for (let resolveCommentComposerAvatarUrlResult of commentComposerAvatarUrl as Dynamic)
    if (
      resolveCommentComposerAvatarUrlResult.who.kind === `human` &&
      !resolveCommentComposerAvatarUrlResult.who.self
    ) {
      yield* dependencies2(
        resolveCommentComposerAvatarUrlResult.who.email,
        resolveCommentComposerAvatarUrlResult.who.name ?? ``,
      );
    }
  for (let file of options as Dynamic)
    for (let post of [file.root, ...file.replies] as Dynamic) {
      if (post.actor === `human`) {
        yield* dependencies2(post.user, context[post.user] ?? ``);
      }
      for (let resolveCommentComposerAvatarUrlResult of (post.to ??
        []) as Dynamic)
        yield* dependencies2(
          resolveCommentComposerAvatarUrlResult,
          context[resolveCommentComposerAvatarUrlResult] ?? ``,
        );
    }
  for (let [
    resolveCommentComposerAvatarUrlResult,
    resolveCommentComposerAvatarUrlResult2,
  ] of Object.entries(context) as Dynamic)
    yield* dependencies2(
      resolveCommentComposerAvatarUrlResult,
      resolveCommentComposerAvatarUrlResult2,
    );
}

var CommentComposerViewer: Dynamic;

var mapCommentComposerHits: Dynamic;

var resolveCommentComposerPeople: Dynamic;

var filterCommentComposerPeople: Dynamic;

var resolveCommentComposerHits: Dynamic;

var CommentComposerItems: Dynamic;

var CommentComposerNode: Dynamic;

var CommentComposerState7: Dynamic;

var resolveCommentComposerMentionNames: Dynamic;

var COMMENT_PROSE_CLASS: string;

var CommentComposer_Styles: string;

var CommentComposer_Styles2: string;

var CommentComposerAutocapitalize: {
    autocapitalize: string;
    autocorrect: string;
    spellcheck: string;
    inputmode: string;
};

function resolveCommentComposerPreventScroll(
  commentComposerPreventScroll?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let dom: Dynamic = commentComposerPreventScroll.view.dom;
  let ownerDocument: Dynamic = dom.ownerDocument;
  let matchesActiveElement: Dynamic =
    ownerDocument.activeElement === dom ||
    dom.contains(ownerDocument.activeElement);
  commentComposerPreventScroll.setEditable(!options);
  if (options) {
    dom.setAttribute(`tabindex`, `0`);
    if (matchesActiveElement && ownerDocument.activeElement !== dom) {
      dom.focus({
        preventScroll: true,
      });
    }
  }
}

var resolveCommentComposerFirstChild: Dynamic;

var commentComposerWeakMap4: Dynamic;

var isCommentComposerAnchor: Dynamic;

function resolveCommentComposerParentTab(
  commentComposerParentTab?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let resolveCommentComposerParentTabResult: Dynamic = cachedArtifactReference(
    commentComposerParentTab,
    context,
  );
  if (resolveCommentComposerParentTabResult !== null)
    return `restricted` in resolveCommentComposerParentTabResult
      ? `Restricted`
      : resolveCommentComposerParentTabResult.parentTab === undefined
        ? resolveCommentComposerParentTabResult.label
        : `${resolveCommentComposerParentTabResult.parentTab} · ${resolveCommentComposerParentTabResult.label}`;
  let resolveCommentComposerParentTabResult2: Dynamic =
    resolveCommentsActionsAndSelectionNoun(commentComposerParentTab);
  if (resolveCommentComposerParentTabResult2?.noun === `file`) {
    let container: Dynamic =
      resolveCommentComposerParentTabResult2.container ?? context;
    let row: Dynamic = (
      CommentComposerState4 !== null && CommentComposerState4.pid === container
        ? CommentComposerState4.rows
        : []
    ).find(
      (row2?: Dynamic, ..._extraArguments: unknown[]) =>
        row2.id === resolveCommentComposerParentTabResult2.id,
    );
    if (row) return row.name;
  } else if (resolveCommentComposerParentTabResult2?.noun === `project`) {
    let normalizedId: Dynamic =
      resolveCommentComposerParentTabResult2.id.toLowerCase();
    let row: Dynamic = CommentComposerState5?.rows.find(
      (commentComposerParentTab2?: Dynamic, ..._extraArguments: unknown[]) =>
        commentComposerParentTab2.id.toLowerCase() === normalizedId,
    );
    if (row) return row.label;
  }
  return resolveEditorExtensionsValue9(options);
}

function updateCommentComposerExtensions(
  element?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let placeholder: Dynamic =
    typeof options.placeholder == `function`
      ? options.placeholder()
      : options.placeholder;
  let updateCommentComposerExtensionsResult: Dynamic = isCommentsEditorElement({
    extensions: [
      ...(options.placeholder
        ? [
            Placeholder.configure({
              placeholder: options.placeholder,
            }),
          ]
        : []),
      CommentComposerNode,
      CommentComposerState7,
      ...(options.claudeChipLeads
        ? [isCommentComposerAnchor(options.claudeChipLeads.onBackspaceEmpty)]
        : []),
    ],
    ariaLabel:
      options.ariaLabel ?? (placeholder?.replace(/…$/, ``) || `Edit comment`),
    className: `cds-text-entry-floored w-full ${options.chrome === `card` ? COMMENT_PROSE_CLASS : `text-[13px] ${CommentComposer_Styles2}`} outline-none focus-visible:outline-hidden whitespace-pre-wrap ${options.chrome === `bare` ? `min-h-8 px-2 py-1.5` : options.chrome === `card` ? `min-h-12 ${CommentComposer_Styles} px-0 py-0` : options.chrome === `flush` ? (options.sheetSeat === true ? `min-h-8.5 px-0 py-1.25` : `min-h-6 px-0 py-0`) : options.chrome === `sheet` ? `min-h-11 px-0 py-2.5` : `min-h-7 rounded-md border px-2 py-1`}`,
    isPopupVisible: CommentComposerItems.isVisible,
    popupOwnsEnter: CommentComposerItems.ownsEnter,
    onEnter: options.onEnter,
    onModEnter: options.onModEnter,
    onEscape: options.onEscape,
    onUpdate: options.onUpdate,
  });
  commentComposerWeakMap.set(
    updateCommentComposerExtensionsResult,
    !!options.enableCCSessions,
  );
  if (options.enableCCSessions) {
    resolveCommentComposerRows();
  }
  if (options.coworkerContainer) {
    commentComposerWeakMap2.set(
      updateCommentComposerExtensionsResult,
      options.coworkerContainer,
    );
    resolveCommentComposerContainer(options.coworkerContainer);
  }
  if (options.refPid) {
    commentComposerWeakMap3.set(
      updateCommentComposerExtensionsResult,
      options.refPid,
    );
    resolveCommentComposerPid(options.refPid);
    mapCommentComposerRows();
  }
  if (options.chrome === `card`) {
    updateCommentComposerExtensionsResult.view.dom.setAttribute(
      `enterkeyhint`,
      `send`,
    );
    for (let [
      updateCommentComposerExtensionsResult2,
      updateCommentComposerExtensionsResult3,
    ] of Object.entries(CommentComposerAutocapitalize) as Dynamic)
      updateCommentComposerExtensionsResult.view.dom.setAttribute(
        updateCommentComposerExtensionsResult2,
        updateCommentComposerExtensionsResult3,
      );
  }
  element.append(updateCommentComposerExtensionsResult.view.dom);
  if (options.initial) {
    let refPid: Dynamic = options.refPid ?? options.container;
    updateCommentComposerExtensionsResult.commands.setContent(
      collectEditorAnchorsAndMentionsText(
        options.initial,
        isFrameArtifact(),
        resolveCommentComposerMentionNames,
        (
          updateCommentComposerExtensions2?: Dynamic,
          options2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          resolveCommentComposerParentTab(
            updateCommentComposerExtensions2,
            options2,
            refPid,
          ),
      ),
    );
    if (!isDocumentFocusedElsewhere(element.ownerDocument)) {
      updateCommentComposerExtensionsResult.commands.focus(`end`);
    }
  } else if (options.autoFocus) {
    updateCommentComposerExtensionsResult.commands.focus(`end`);
  }
  let subscribe: Dynamic = PlatformApiAndAuthPriming.subscribe(
    (
      updateCommentComposerExtensions2?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (options2.priming && !updateCommentComposerExtensions2.priming) {
        CommentComposerItems.repaint();
      }
    },
  );
  return {
    ed: updateCommentComposerExtensionsResult,
    cleanup: (..._extraArguments: unknown[]): undefined => {
      subscribe();
      updateCommentComposerExtensionsResult.destroy();
    },
  };
}

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeCommentComposerStep1(): void {
  (CommentComposerState = [
    [`ldoc_read`, `Reading`],
    [`ldoc_patch`, `Editing`],
    [`list_comments`, `Reading comments`],
    [`reply_comment`, `Replying`],
    [`read`, `Reading`],
    [`write`, `Writing`],
    [`edit`, `Editing`],
    [`list`, `Listing`],
  ]);
  (resolveCommentComposerTest = (
    commentComposerTest?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    /^[a-z_]+$/.test(commentComposerTest)
      ? `${CommentComposerState.find(([CommentComposerState8]: Dynamic, ..._extraArguments: unknown[]): Dynamic => commentComposerTest.startsWith(CommentComposerState8))?.[1] ?? commentComposerTest}…`
      : commentComposerTest);
  (resolveCommentComposerValue = (
    commentComposerValue?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let commentAnchorsParse = resolveCommentAnchorsParse(
      commentComposerValue,
      options,
    );
    return commentAnchorsParse === `now`
      ? `just now`
      : `${commentAnchorsParse} ago`;
  });
  (filterCommentComposerFilter = (
    items?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (!items?.length) return [];
    let difference = options - PENDING_ASK_TTL_MS - 6e4;
    return items.filter(
      (item?: Dynamic, ..._extraArguments: unknown[]) =>
        new Date(item.askedAt).getTime() >= difference,
    );
  });
  (CommentComposerState2 = null);
  (commentComposerWeakMap = new (WeakMap as Dynamic)());
  (commentComposerLimit30000 = 3e4);
  (CommentComposerSilent = {
    silent: true,
  });
  (resolveCommentComposerLabel = (
    commentComposerLabel?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    id: `cc:${commentComposerLabel.sessionId}`,
    label: commentComposerLabel.title,
    handle: commentComposerLabel.type,
  }));
  (CommentComposerState3 = null);
  (commentComposerWeakMap2 = new (WeakMap as Dynamic)());
  (commentComposerLimit300002 = 3e4);
  (CommentComposer_Reftab = `reftab:`);
  (CommentComposer_Refpage = `refpage:`);
  (resolveCommentComposerStartsWith = (
    commentComposerStarts?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    commentComposerStarts.startsWith(CommentComposer_Reftab)
      ? commentComposerStarts.slice(7)
      : commentComposerStarts.startsWith(CommentComposer_Refpage)
        ? commentComposerStarts.slice(8)
        : null);
  (commentComposerWeakMap3 = new (WeakMap as Dynamic)());
  (commentComposerLimit300003 = 3e4);
  (CommentComposerState4 = null);
  (CommentComposerState5 = null);
  (CommentComposerState6 = null);
  (resolveCommentComposerValue2 = (
    commentComposerValue2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveCommentsEditorSlice2(
      getCommentComposerToLowerCase(commentComposerValue2, options),
      getCommentComposerEnabled(commentComposerValue2, options),
    ));
  (CommentComposerViewer = createCommentMentionSearch(
    frameSearchPeople,
    (..._extraArguments: unknown[]): Dynamic => CommentComposerItems.repaint(),
    {
      viewer: frameViewerWithFace,
      channel: CommentAnchorsState5,
      poolBare: false,
      known: (..._extraArguments: unknown[]): Dynamic => {
        let storeState: Dynamic = useCommentStore.getState();
        return resolveCommentComposerAvatarUrl(
          PlatformApiAndAuthParticipants.getState().all(),
          [
            ...Object.values(storeState.allByPage),
            ...Object.values(storeState.byPage),
          ].flat(),
          storeState.mentionNames,
          framePeekProfile,
        );
      },
      knownAtBare: true,
      localBelow: 3,
      inlinePhoto: frameInlineAvatar,
      onSearch: (storeState?: Dynamic, ..._extraArguments: unknown[]) =>
        emitTelemetryEvent({
          name: `pages.mention.search`,
          key: `composer:${storeState.outcome}`,
          fields: {
            ...storeState,
            src: `composer`,
          },
        }),
    },
  ));
  (mapCommentComposerHits = (
    mapCommentComposerHits2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    hits: mapCommentComposerHits2.hits.map(
      (
        { photoUrl: photoUrl, ...hit }: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => hit,
    ),
    priming: mapCommentComposerHits2.priming,
  }));
  (resolveCommentComposerPeople = (
    commentComposerPeople?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    isFrameArtifact()
      ? isCommentAnchorsPeople(
          commentComposerPeople.search(options),
          mapCommentComposerHits(CommentComposerViewer.read(options)),
        )
      : {
          people: commentComposerPeople.search(options),
          priming: commentComposerPeople.isPriming(options),
        });
  (filterCommentComposerPeople = (
    filterCommentComposerPeople2?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let { people: commentComposerPeople, priming: priming }: Dynamic =
      resolveCommentComposerPeople(context, options);
    let email: Dynamic = PlatformApiAndAuthUser.getState().user?.email;
    let commentComposerPeople2: Dynamic =
      email === undefined
        ? commentComposerPeople
        : [
            ...commentComposerPeople.filter(
              (commentComposerPeople3?: Dynamic, ..._extraArguments: unknown[]) =>
                commentComposerPeople3.id === `claude`,
            ),
            ...commentComposerPeople.filter(
              (commentComposerPeople3?: Dynamic, ..._extraArguments: unknown[]) =>
                commentComposerPeople3.id === email,
            ),
            ...commentComposerPeople.filter(
              (commentComposerPeople3?: Dynamic, ..._extraArguments: unknown[]) =>
                commentComposerPeople3.id !== `claude` &&
                commentComposerPeople3.id !== email,
            ),
          ];
    let commentComposerValue2: Dynamic = filterCommentComposerPeople2
      ? resolveCommentComposerValue2(filterCommentComposerPeople2, options)
      : [];
    let commentComposerLabel: Dynamic = filterCommentComposerPeople2
      ? getCommentComposerLabel(filterCommentComposerPeople2, options)
      : [];
    return {
      hits: [
        ...commentComposerPeople2.slice(0, 12 - commentComposerValue2.length),
        ...commentComposerLabel,
        ...commentComposerValue2,
      ],
      priming: priming,
    };
  });
  (resolveCommentComposerHits = (
    commentComposerHits?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let {
      hits: filterCommentComposerPeople2,
      priming: filterCommentComposerPeople3,
    }: Dynamic = filterCommentComposerPeople(
      commentComposerHits,
      options,
      context,
    );
    return filterCommentComposerPeople3
      ? [...filterCommentComposerPeople2, EditorAnchorsAndMentionsLabel]
      : filterCommentComposerPeople2.length === 0 &&
          !isFrameArtifact() &&
          context.settled[options.trim()] !== `ok`
        ? [EditorAnchorsAndMentionsLabel2]
        : filterCommentComposerPeople2;
  });
  (CommentComposerItems = isEditorAnchorsAndMentionsSuggestion({
    items: (
      { editor: editor, query: query }: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      CommentComposerState6 = editor;
      let prime: Dynamic = PlatformApiAndAuthPriming.getState().prime(query);
      if (prime) {
        prime.finally(CommentComposerItems.repaint);
      }
      return resolveCommentComposerHits(
        editor,
        query,
        PlatformApiAndAuthPriming.getState(),
      );
    },
    search: (editor?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      resolveCommentComposerHits(
        CommentComposerState6,
        editor,
        PlatformApiAndAuthPriming.getState(),
      ),
    menuClass: `chat-mention-menu`,
    density: `compact`,
    sectionOf: (editor?: Dynamic, ..._extraArguments: unknown[]) => {
      let query = String(editor.id);
      if (query.startsWith(CommentComposer_Reftab)) return `Tabs`;
      if (query.startsWith(CommentComposer_Refpage)) return `Other documents`;
      let prime: Dynamic = CommentComposerState6;
      return resolveCommentsEditorSessions(
        query,
        !!prime &&
          ((resolvePlatformFeatureFlagsEnabled2(`coworkerObservers`) &&
            (!!commentComposerWeakMap.get(prime) ||
              commentComposerWeakMap2.has(prime))) ||
            commentComposerWeakMap3.has(prime)),
      );
    },
    renderRow: (
      editor?: Dynamic,
      query?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (resolveCommentComposerStartsWith(String(editor.id)) !== null) {
        let element = document.createElement(`span`);
        element.className = `g`;
        element.innerHTML = String(editor.id).startsWith(CommentComposer_Reftab)
          ? resolveEditorHostFloor2(16)
          : resolveEditorHostFloor(16);
        let element2 = document.createElement(`span`);
        element2.className = `t`;
        element2.textContent = editor.label;
        query.append(element, element2);
        return;
      }
      resolveEditorAnchorsAndMentionsSpan(editor, query);
    },
    command: (
      editor?: Dynamic,
      query?: Dynamic,
      prime?: Dynamic,
      ..._extraArguments: unknown[]
    ) => {
      let commentComposerStartsWith: Dynamic = resolveCommentComposerStartsWith(
        String(prime.id),
      );
      if (commentComposerStartsWith === null)
        return resolveEditorAnchorsAndMentionsLabel2(editor, query, prime);
      editor
        .chain()
        .focus()
        .insertContentAt(query, [
          {
            type: CommentComposerState7.name,
            attrs: {
              ref: commentComposerStartsWith,
              label: prime.label,
            },
          },
          {
            type: `text`,
            text: ` `,
          },
        ])
        .run();
    },
    onCommit: (editor?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let query = String(editor.id);
      if (resolveCommentComposerStartsWith(query) === null) {
        if (!isFrameArtifact()) {
          if (resolveCommentsEditorKind(query).kind === `person`) {
            PlatformApiAndAuthPriming.getState().note(editor);
          }
        }
      }
    },
    swallowLoading: true,
    emptyLabel: `No results`,
  }));
  (CommentComposerNode = resolveEditorAnchorsAndMentionsBoundaryMarker(`chat-mention`).extend({
      renderText({ node: node }: Dynamic, ..._extraArguments: unknown[]) {
        return resolveEditorAnchorsAndMentionsValue12(
          node.attrs,
          isFrameArtifact(),
        );
      },
      addProseMirrorPlugins(
        this: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic {
        return [
          loadEditorExtensionsPluginKey({
            editor: this.editor,
            ...CommentComposerItems.suggestion,
          }),
        ];
      },
    }));
  (CommentComposerState7 = resolveEditorAnchorsAndMentionsGroup(`comment-ref-chip`));
  (resolveCommentComposerMentionNames = (
    commentComposerMentionNames?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    useCommentStore.getState().mentionNames[commentComposerMentionNames] ||
    framePeekProfile(commentComposerMentionNames)?.name ||
    `Someone`);
  (COMMENT_PROSE_CLASS = `text-prose`);
  (CommentComposer_Styles = `max-h-[var(--field-max-h)] overflow-y-auto`);
  (CommentComposer_Styles2 = `max-h-[min(var(--comment-field-cap),40dvh)] overflow-y-auto`);
  (CommentComposerAutocapitalize = {
    autocapitalize: `sentences`,
    autocorrect: `on`,
    spellcheck: `true`,
    inputmode: `text`,
  });
  (resolveCommentComposerFirstChild = (
    commentComposerFirstChild?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let firstChild: Dynamic = commentComposerFirstChild.firstChild;
    let firstChild2: Dynamic = firstChild?.firstChild;
    if (!firstChild || !firstChild2 || firstChild2.type.name !== `mention`)
      return null;
    let child: Dynamic = firstChild.childCount > 1 ? firstChild.child(1) : null;
    return (
      1 +
      firstChild2.nodeSize +
      (child?.isText && child.text?.startsWith(` `) ? 1 : 0)
    );
  });
  (commentComposerWeakMap4 = new (WeakMap as Dynamic)());
  (isCommentComposerAnchor = (
    commentComposerAnchor?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    Extension.create({
      name: `claudeChipLeads`,
      addProseMirrorPlugins(
        this: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic {
        let isCommentComposerAnchorResult: Dynamic = resolveCommentsEditorAnchor;
        commentComposerWeakMap4.set(this.editor, isCommentComposerAnchorResult);
        let resolveCommentComposerFirstChild2: Dynamic =
          resolveCommentComposerFirstChild;
        return [
          new (Plugin as Dynamic)({
            filterTransaction(
              commentComposerAnchor2?: Dynamic,
              options?: Dynamic,
              ..._extraArguments: unknown[]
            ) {
              let matchesTrimmedTextContent: boolean =
                commentComposerAnchor2.doc.textContent.trim() !== ``;
              if (!matchesTrimmedTextContent) {
                commentComposerAnchor2.doc.descendants(
                  (
                    commentComposerAnchor3?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): undefined =>
                    void (matchesTrimmedTextContent ||=
                      resolveCommentsEditorHardBreak(commentComposerAnchor3)),
                );
              }
              return !(
                commentComposerAnchor2.docChanged &&
                resolveCommentComposerFirstChild2(options.doc) !== null &&
                resolveCommentComposerFirstChild2(commentComposerAnchor2.doc) ===
                  null &&
                matchesTrimmedTextContent
              );
            },
            appendTransaction(
              commentComposerAnchor2?: unknown,
              options?: unknown,
              context?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic {
              let commentComposerFirstChild: Dynamic =
                resolveCommentComposerFirstChild2(context.doc);
              let { anchor: selection, head: selection2 }: Dynamic =
                context.selection;
              if (
                commentComposerFirstChild === null ||
                Math.min(selection, selection2) >= commentComposerFirstChild
              )
                return null;
              let max = Math.max(
                commentComposerFirstChild,
                context.doc.content.size - 1,
              );
              return context.tr.setSelection(
                TextSelection.create(
                  context.doc,
                  Math.min(Math.max(selection, commentComposerFirstChild), max),
                  Math.min(Math.max(selection2, commentComposerFirstChild), max),
                ),
              );
            },
            props: {
              handleKeyDown(
                commentComposerAnchor2?: Dynamic,
                event?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic {
                if (event.key !== `ArrowLeft` && event.key !== `Home`)
                  return false;
                let commentComposerFirstChild: Dynamic =
                  resolveCommentComposerFirstChild2(
                    commentComposerAnchor2.state.doc,
                  );
                if (commentComposerFirstChild === null) return false;
                let {
                  anchor: isCommentComposerAnchorResult2,
                  head: isCommentComposerAnchorResult3,
                }: Dynamic = isCommentComposerAnchorResult(
                  commentComposerAnchor2,
                );
                let dispatch: Dynamic = (..._extraArguments: unknown[]) => (
                  event.preventDefault(),
                  (isCommentComposerAnchorResult3 !== commentComposerFirstChild ||
                    (!event.shiftKey &&
                      isCommentComposerAnchorResult2 !==
                        commentComposerFirstChild)) &&
                    commentComposerAnchor2.dispatch(
                      commentComposerAnchor2.state.tr.setSelection(
                        TextSelection.create(
                          commentComposerAnchor2.state.doc,
                          event.shiftKey
                            ? Math.max(
                                isCommentComposerAnchorResult2,
                                commentComposerFirstChild,
                              )
                            : commentComposerFirstChild,
                          commentComposerFirstChild,
                        ),
                      ),
                    ),
                  true
                );
                if (event.key === `Home` || event.metaKey) {
                  if (isCommentComposerAnchorResult3 <= commentComposerFirstChild)
                    return dispatch();
                  let enabled = true;
                  try {
                    enabled =
                      Math.abs(
                        commentComposerAnchor2.coordsAtPos(
                          commentComposerFirstChild,
                        ).top -
                          commentComposerAnchor2.coordsAtPos(
                            isCommentComposerAnchorResult3,
                          ).top,
                      ) < 4;
                  } catch {}
                  return enabled ? dispatch() : false;
                }
                return event.ctrlKey || event.altKey
                  ? isCommentComposerAnchorResult3 <= commentComposerFirstChild ||
                    !/\s\S/.test(
                      commentComposerAnchor2.state.doc
                        .textBetween(
                          commentComposerFirstChild,
                          isCommentComposerAnchorResult3,
                          `
`,
                          ` `,
                        )
                        .trimEnd(),
                    )
                    ? dispatch()
                    : false
                  : isCommentComposerAnchorResult3 > commentComposerFirstChild
                    ? false
                    : (event.preventDefault(),
                      !event.shiftKey &&
                        isCommentComposerAnchorResult2 !==
                          isCommentComposerAnchorResult3 &&
                        commentComposerAnchor2.dispatch(
                          commentComposerAnchor2.state.tr.setSelection(
                            TextSelection.create(
                              commentComposerAnchor2.state.doc,
                              commentComposerFirstChild,
                            ),
                          ),
                        ),
                      true);
              },
            },
          }),
        ];
      },
      addKeyboardShortcuts(..._extraArguments: unknown[]): Dynamic {
        let resolveCommentComposerFirstChild2: Dynamic = (
          ..._extraArguments: unknown[]
        ): Dynamic => resolveCommentComposerFirstChild(this.editor.state.doc);
        let commentComposerWeakMap4Entry: Dynamic = (
          ..._extraArguments: unknown[]
        ): Dynamic => {
          let commentComposerWeakMap4Entry2: Dynamic =
            commentComposerWeakMap4.get(this.editor)?.(this.editor.view) ??
            this.editor.state.selection;
          return {
            empty:
              commentComposerWeakMap4Entry2.anchor ===
              commentComposerWeakMap4Entry2.head,
            head: commentComposerWeakMap4Entry2.head,
          };
        };
        let Backspace: Dynamic = (..._extraArguments: unknown[]) => {
          let {
            empty: commentComposerWeakMap4Entry2,
            head: commentComposerWeakMap4Entry3,
          }: Dynamic = commentComposerWeakMap4Entry();
          let commentComposerFirstChild: Dynamic =
            resolveCommentComposerFirstChild2();
          return commentComposerWeakMap4Entry2 &&
            commentComposerFirstChild === null &&
            this.editor.getText().trim() === ``
            ? (commentComposerAnchor(), true)
            : !commentComposerWeakMap4Entry2 ||
                commentComposerFirstChild === null ||
                commentComposerWeakMap4Entry3 > commentComposerFirstChild
              ? false
              : (resolveDataModelSchemasTrim(this.editor.getText()) &&
                  commentComposerAnchor(),
                true);
        };
        let CmdBackspace: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
          let {
            empty: commentComposerWeakMap4Entry2,
            head: commentComposerWeakMap4Entry3,
          }: Dynamic = commentComposerWeakMap4Entry();
          let from: Dynamic = resolveCommentComposerFirstChild2();
          if (!commentComposerWeakMap4Entry2 || from === null) return false;
          if (commentComposerWeakMap4Entry3 <= from) return Backspace();
          let firstChild: Dynamic = this.editor.state.doc.firstChild;
          if (
            !firstChild ||
            commentComposerWeakMap4Entry3 > firstChild.nodeSize - 1
          )
            return false;
          let enabled = false;
          this.editor.state.doc.nodesBetween(
            from,
            commentComposerWeakMap4Entry3,
            (
              commentComposerAnchor2?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined =>
              void (
                commentComposerAnchor2.type.name === `hardBreak` &&
                (enabled = true)
              ),
          );
          return enabled
            ? false
            : this.editor.commands.deleteRange({
                from: from,
                to: commentComposerWeakMap4Entry3,
              });
        };
        let AltBackspace: Dynamic = (..._extraArguments: unknown[]): Dynamic => {
          let {
            empty: commentComposerWeakMap4Entry2,
            head: commentComposerWeakMap4Entry3,
          }: Dynamic = commentComposerWeakMap4Entry();
          let from: Dynamic = resolveCommentComposerFirstChild2();
          if (!commentComposerWeakMap4Entry2 || from === null) return false;
          if (commentComposerWeakMap4Entry3 <= from) return Backspace();
          let textBetween: Dynamic = this.editor.state.doc.textBetween(
            from,
            commentComposerWeakMap4Entry3,
            `
`,
            ` `,
          );
          return /\s\S/.test(textBetween.trimEnd())
            ? false
            : this.editor.commands.deleteRange({
                from: from,
                to: commentComposerWeakMap4Entry3,
              });
        };
        return {
          Backspace: Backspace,
          "Cmd-Backspace": CmdBackspace,
          "Alt-Backspace": AltBackspace,
          "Ctrl-Backspace": AltBackspace,
        };
      },
    }));
}

export {
  COMMENT_PROSE_CLASS,
  ClaudePendingRow,
  CommentComposerNode,
  CommentComposerState7,
  PendingAsk,
  ResolvedMark,
  UseCommentComposerDataClaudeActivityDotsComponent,
  UseCommentComposerLabelComponent,
  UseCommentComposerModalComponent,
  UseCommentComposerTextComponent,
  WhoReacted,
  filterCommentComposerFilter,
  resolveCommentComposerMentionNames,
  resolveCommentComposerPreventScroll,
  resolveCommentComposerTest,
  updateCommentComposerExtensions,
};
