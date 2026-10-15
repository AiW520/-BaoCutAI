/** BaoCut: comment anchors from index-CX4IZqzA.js. */
import type { Dynamic } from "./types";
import {
  Button,
  CommentCard,
  EditorExtensionsAskClaude,
  OverflowTooltip,
  PlatformApiAndAuthUser,
  Popover,
  Reactions,
  Tooltip,
  TooltipGroup,
  UiOverlaysAndIconsCustomIcon,
  filterCommentsEditorEmoji,
  framePeekProfile,
  frameProfiles,
  frameProfilesSubscribe,
  frameProfilesVersion,
  isFrameArtifact,
  isTmpId,
  originalJsxProps,
  originalJsxsProps,
  resolveCommentsEditorAgent,
  resolveCommentsEditorTrim,
  resolveCommentsEditorUser,
  resolveEditorAnchorsAndMentionsEmail,
  resolveEditorAnchorsAndMentionsOther,
  resolvePlatformApiAndAuthUseContext2,
  resolvePlatformSyncAndRoutingCompact,
  resolveUiDesignSystemValue2,
  resolveUiProviderAndLayersUseContext2,
  useCommentsEditorThen,
} from "./docs-app-dependencies";
import {
  React,
  jsxRuntime,
} from "./docs-app-bootstrap";
import {
  IconButton,
} from "./docs-app-run-review";
import {
  ReactionPicker,
} from "./docs-app-ask-cards-document-posture-badge";
import {
  resolveCommentAnchorsFormat,
} from "./docs-app-comment-anchors-use-comment-anchors-sheets-component";
import {
  AuthorLoading,
  CommentAnchors_Styles,
  CommentAnchors_Styles3,
  UseCommentAnchorsContainerComponent,
  UseCommentAnchorsExpandedComponent,
  UseCommentAnchorsRoleComponent,
  UseCommentAnchorsUserComponent,
  commentAnchorsLimit202,
  filterCommentAnchorsJoin,
  resolveCommentAnchorsActor,
  resolveCommentAnchorsHover,
  resolveCommentAnchorsReplace3,
  resolveCommentAnchorsResolvedBy,
  useCommentAnchorsKey,
} from "./docs-app-comment-anchors-create-comment-mention-search";
import {
  ResolvedMark,
  UseCommentComposerLabelComponent,
  WhoReacted,
} from "./docs-app-comment-composer";
import {
  CommentEditor,
} from "./docs-app-comment-components-comment-editor";
import {
  CommentComponents_Styles3,
} from "./docs-app-comment-components-comment-reply-composer";
import {
  filterCommentComponentsJoin,
  resolveCommentComponentsTarget5,
  resolveCommentComponentsValue2,
} from "./docs-app-comment-components-comment-reply-sheet";

function SeeMorePill(
  {
    children: children,
    fit = false,
    tailKey: tailKey,
    expanded = true,
    column: column,
    tallerCap = false,
    touch = false,
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let elementRef: Dynamic = (0, React.useRef)(null);
  let [enabledState, setEnabledState]: Dynamic = (0, React.useState)(false);
  let elementRef2: Dynamic = (0, React.useRef)(null);
  let setEnabledState2 = (..._extraArguments: unknown[]): undefined => {
    let element: Dynamic = elementRef.current;
    if (element) {
      setEnabledState(
        element.scrollHeight - element.scrollTop - element.clientHeight > 24,
      );
    }
  };
  let updateElement = (..._extraArguments: unknown[]): undefined => {
    let element: Dynamic = elementRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
      elementRef2.current = element.scrollTop;
    }
  };
  let setEnabledState3 = (..._extraArguments: unknown[]): undefined => {
    if (elementRef2.current !== null) {
      updateElement();
    }
    setEnabledState2();
  };
  let onScroll = (..._extraArguments: unknown[]): undefined => {
    let element: Dynamic = elementRef.current;
    if (
      element &&
      elementRef2.current !== null &&
      element.scrollTop !== elementRef2.current
    ) {
      elementRef2.current =
        element.scrollHeight - element.scrollTop - element.clientHeight > 4
          ? null
          : element.scrollTop;
    }
    setEnabledState2();
  };
  (0, React.useLayoutEffect)((..._extraArguments: unknown[]): Dynamic => {
    let element: Dynamic = elementRef.current;
    if (!element) return;
    setEnabledState2();
    let resizeObserver = new ResizeObserver(setEnabledState3);
    resizeObserver.observe(element);
    if (element.firstElementChild) {
      resizeObserver.observe(element.firstElementChild);
    }
    let updateElement2 = (..._extraArguments: unknown[]): undefined =>
      void (elementRef2.current = null);
    element.addEventListener(`pointerdown`, updateElement2);
    element.addEventListener(`wheel`, updateElement2, {
      passive: true,
    });
    element.addEventListener(`keydown`, updateElement2);
    return (..._extraArguments: unknown[]): undefined => {
      resizeObserver.disconnect();
      element.removeEventListener(`pointerdown`, updateElement2);
      element.removeEventListener(`wheel`, updateElement2);
      element.removeEventListener(`keydown`, updateElement2);
    };
  }, []);
  let tailKeyRef: Dynamic = (0, React.useRef)(tailKey);
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (tailKey !== tailKeyRef.current) {
        tailKeyRef.current = tailKey;
        if (!(tailKey === undefined || !expanded)) {
          updateElement();
          setEnabledState2();
        }
      }
    },
    [tailKey, expanded],
  );
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (!expanded) {
        elementRef2.current = null;
      }
    },
    [expanded],
  );
  return (
    <div
      className={
        fit ? `relative flex min-h-0 flex-col` : `relative flex flex-col`
      }
    >
      <div
        ref={elementRef}
        onScroll={onScroll}
        className={`-mx-2 -mt-1.5 -mb-2 box-content ${fit ? `min-h-0 overscroll-contain` : tallerCap ? (touch ? `max-h-[min(536px,calc(55vh_+_96px))]` : `max-h-[min(456px,calc(55vh_+_16px))]`) : `max-h-[min(440px,55vh)]`} scroll-pt-1.5 scroll-pb-2 overflow-y-auto px-2 pt-1.5 pb-2`}
      >
        <div className={column}>{children}</div>
      </div>
      {enabledState && (
        <button
          type={`button`}
          data-testid={`see-more-pill`}
          onClick={(
            seeMorePill?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            seeMorePill.stopPropagation();
            let element: Dynamic = elementRef.current;
            if (element) {
              element.scrollTop += element.clientHeight * 0.8;
            }
          }}
          className={`bg-surface-popover text-primary shadow-card-active text-caption absolute -bottom-0.5 left-1/2 -translate-x-1/2 rounded-full px-2.5 py-1 font-medium`}
        >{`↓ See more`}</button>
      )}
    </div>
  );
}

function useCommentAnchorsSetTimeout(..._extraArguments: unknown[]): Dynamic {
  let [enabledState, setEnabledState]: Dynamic = (0, React.useState)(false);
  (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    let setTimeout2 = window.setTimeout(
      (..._extraArguments: unknown[]): Dynamic => setEnabledState(true),
      500,
    );
    return (..._extraArguments: unknown[]) => window.clearTimeout(setTimeout2);
  }, []);
  return enabledState;
}

function UseCommentAnchorsAutoFocusComponent(
  { onDelete: onDelete, onCancel: onCancel }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let useCommentAnchorsAutoFocusResult: Dynamic =
    resolvePlatformSyncAndRoutingCompact();
  let [disabled, setDisabled]: Dynamic = (0, React.useState)(false);
  let useCommentAnchorsSetTimeout2: Dynamic = useCommentAnchorsSetTimeout();
  return (
    <div className={`mt-1 flex flex-col gap-2 border-t pt-2`}>
      <span
        className={`text-primary text-[13px]`}
      >{`Delete this comment?`}</span>
      <div className={`flex justify-end gap-2`}>
        <Button
          variant={`secondary`}
          size={useCommentAnchorsAutoFocusResult(`sm`)}
          autoFocus={true}
          onClick={(
            commentAnchorsAutoFocus?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            commentAnchorsAutoFocus.stopPropagation();
            onCancel();
          }}
        >{`Cancel`}</Button>
        <Button
          size={useCommentAnchorsAutoFocusResult(`sm`)}
          variant={`primary`}
          disabled={disabled}
          onClick={async (
            commentAnchorsAutoFocus?: Dynamic,
            ..._extraArguments: unknown[]
          ): Promise<undefined> => {
            commentAnchorsAutoFocus.stopPropagation();
            if (
              !(
                !useCommentAnchorsSetTimeout2 &&
                commentAnchorsAutoFocus.detail !== 0
              )
            ) {
              setDisabled(true);
              try {
                await onDelete();
              } finally {
                setDisabled(false);
              }
            }
          }}
        >{`Delete`}</Button>
      </div>
    </div>
  );
}

function UseCommentAnchorsBusyComponent(
  { onDelete: onDelete, onCancel: onCancel }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let [busy, setBusy]: Dynamic = (0, React.useState)(false);
  let useCommentAnchorsSetTimeout2: Dynamic = useCommentAnchorsSetTimeout();
  return (
    <CommentCard.DeleteConfirm
      busy={busy}
      onCancel={onCancel}
      onDelete={(..._extraArguments: unknown[]): undefined => {
        setBusy(true);
        onDelete().finally(
          (..._extraArguments: unknown[]): Dynamic => setBusy(false),
        );
      }}
      onClick={(
        commentAnchorsBusy?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => commentAnchorsBusy.stopPropagation()}
      onClickCapture={(
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (useCommentAnchorsSetTimeout2 || event.detail === 0) return;
        let matchedElements: Dynamic =
          event.currentTarget.querySelectorAll(`button`);
        if (
          event.target.closest(`button`) ===
          matchedElements[matchedElements.length - 1]
        ) {
          event.stopPropagation();
        }
      }}
    />
  );
}

function CommentWhen(
  {
    r: r5,
    right: right,
    rightSeated: rightSeated,
    expanded: expanded,
    compact: compact,
    editing: editing,
    editToClaude: editToClaude,
    deleting: deleting,
    deleteAsk: deleteAsk,
    me: me2,
    onReact: onReact,
    container: container,
    onSave: onSave,
    onDelete: onDelete,
    onCancel: onCancel,
    dimmed: dimmed,
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let commentWhenResult: Dynamic = resolvePlatformApiAndAuthUseContext2();
  let content: Dynamic = filterCommentAnchorsJoin(r5);
  return (
    <div
      className={resolveUiDesignSystemValue2(
        `group/row flex flex-col gap-1`,
        dimmed && `opacity-60`,
      )}
      data-unconfirmed={dimmed ? `` : undefined}
    >
      <div
        className={`relative flex items-center gap-x-2 text-xs`}
        data-comment-meta={``}
      >
        {resolveCommentAnchorsActor(r5) ? (
          <UseCommentAnchorsRoleComponent />
        ) : (
          r5.user !== `` && <UseCommentAnchorsUserComponent user={r5.user} />
        )}
        <span
          className={resolveUiDesignSystemValue2(
            `flex min-w-0 flex-1 items-center gap-x-1`,
            right !== undefined && `min-h-6`,
          )}
        >
          {(resolveCommentAnchorsActor(r5) || r5.user !== ``) && (
            <AuthorLoading
              r={r5}
              className={`min-w-0 truncate font-semibold`}
            />
          )}
          {r5.at !== `` && (
            <OverflowTooltip
              lazy={true}
              className={resolveUiDesignSystemValue2(
                `text-muted text-caption whitespace-nowrap`,
                rightSeated ? CommentAnchors_Styles3 : `shrink-0`,
              )}
              data-testid={`comment-when`}
            >
              {resolveCommentAnchorsFormat(
                r5.at,
                new Date(commentWhenResult.now()),
                commentWhenResult.locale,
                commentWhenResult.timeZone,
              )}
            </OverflowTooltip>
          )}
        </span>
        {right}
      </div>
      {editing && onSave && onCancel ? (
        <CommentEditor
          initial={r5.body}
          onSave={onSave}
          onCancel={onCancel}
          sendToClaude={editToClaude}
          container={container}
        />
      ) : (
        <div
          className={`text-primary text-[13px] leading-[1.4]`}
          data-comment-body={``}
        >
          <UseCommentAnchorsExpandedComponent
            expanded={expanded}
            compact={compact}
            container={container}
          >
            {resolveCommentAnchorsActor(r5)
              ? r5.body
              : resolveCommentAnchorsReplace3(r5.body)}
          </UseCommentAnchorsExpandedComponent>
          {content && (
            <Tooltip content={content} multiline={true}>
              <span
                className={`text-muted text-caption block truncate`}
                data-testid={`comment-provenance`}
              >
                {content}
              </span>
            </Tooltip>
          )}
        </div>
      )}
      {r5.reactions && (
        <ReactionPill reactions={r5.reactions} me={me2} onToggle={onReact} />
      )}
      {deleting && onDelete && onCancel && (
        <UseCommentAnchorsAutoFocusComponent
          {...originalJsxProps(
            {
              onDelete: onDelete,
              onCancel: onCancel,
            },
            deleteAsk,
          )}
        />
      )}
    </div>
  );
}

function CommentHeader(
  {
    r: r5,
    right: right,
    editing: editing,
    editToClaude: editToClaude,
    deleting: deleting,
    deleteAsk: deleteAsk,
    me: me2,
    onReact: onReact,
    container: container,
    onSave: onSave,
    onDelete: onDelete,
    onCancel: onCancel,
    dimmed: dimmed,
    compact: compact,
    cardExpanded: cardExpanded,
    whoReacted = false,
    editReturnAddsLine = false,
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let commentHeaderResult: Dynamic = resolvePlatformApiAndAuthUseContext2();
  let commentAnchorsHover: Dynamic = resolveCommentAnchorsHover(r5);
  let filterCommentAnchorsJoin2: Dynamic = filterCommentAnchorsJoin(r5);
  let byClaude: Dynamic = resolveCommentAnchorsActor(r5);
  let count =
    resolveUiProviderAndLayersUseContext2() === `comfortable` ? 20 : 19;
  let jsx = (
    <CommentCard.Comment
      byClaude={byClaude}
      authorName={
        byClaude || r5.user === `` ? undefined : commentAnchorsHover.name
      }
      authorTooltip={commentAnchorsHover.hover ?? undefined}
      identityLoading={commentAnchorsHover.loading}
      avatar={
        byClaude || r5.user === `` ? undefined : (
          <span aria-hidden={`true`} className={`inline-flex`}>
            <UseCommentAnchorsUserComponent user={r5.user} />
          </span>
        )
      }
      timestamp={
        r5.at === `` ? undefined : (
          <span data-testid={`comment-when`}>
            {resolveCommentAnchorsFormat(
              r5.at,
              new Date(commentHeaderResult.now()),
              commentHeaderResult.locale,
              commentHeaderResult.timeZone,
            )}
          </span>
        )
      }
      actions={right}
      footnote={
        filterCommentAnchorsJoin2 ? (
          <span data-testid={`comment-provenance`}>
            {filterCommentAnchorsJoin2}
          </span>
        ) : undefined
      }
      reactions={
        r5.reactions &&
        (whoReacted ? (
          <WhoReacted reactions={r5.reactions}>
            <UseCommentAnchorsReactionsComponent
              reactions={r5.reactions}
              me={me2}
              onToggle={onReact}
            />
          </WhoReacted>
        ) : (
          <UseCommentAnchorsReactionsComponent
            reactions={r5.reactions}
            me={me2}
            onToggle={onReact}
          />
        ))
      }
      editor={
        editing && onSave && onCancel ? (
          <CommentEditor
            chrome={`cds`}
            initial={r5.body}
            onSave={onSave}
            onCancel={onCancel}
            sendToClaude={editToClaude}
            container={container}
            returnAddsLine={editReturnAddsLine}
          />
        ) : undefined
      }
      confirm={
        deleting && onDelete && onCancel ? (
          <UseCommentAnchorsBusyComponent
            {...originalJsxProps(
              {
                onDelete: onDelete,
                onCancel: onCancel,
              },
              deleteAsk,
            )}
          />
        ) : undefined
      }
    >
      {compact ? (
        <div
          className={`[--comment-fade-stop:var(--cds-comment-card-bg,var(--cds-surface-2))]`}
        >
          <UseCommentAnchorsExpandedComponent
            expanded={cardExpanded}
            compact={true}
            compactPx={3 * count}
            container={container}
          >
            {byClaude ? r5.body : resolveCommentAnchorsReplace3(r5.body)}
          </UseCommentAnchorsExpandedComponent>
        </div>
      ) : (
        <div data-comment-body={``}>
          <UseCommentAnchorsContainerComponent container={container}>
            {byClaude ? r5.body : resolveCommentAnchorsReplace3(r5.body)}
          </UseCommentAnchorsContainerComponent>
        </div>
      )}
    </CommentCard.Comment>
  );
  return dimmed ? (
    <div className={`opacity-60`} data-unconfirmed={``}>
      {jsx}
    </div>
  ) : (
    jsx
  );
}

// BaoCut: 表情回应名单里的智能体叫 Agent，不叫 Claude。
var resolveCommentAnchorsStartsWith: Dynamic;

var isCommentAnchorsStartsWith: Dynamic;

function UseCommentAnchorsPinnedComponent(
  {
    onPick: onPick,
    pinned: pinned,
    touch: touch,
    keysOnlyFocusBack = false,
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let [open, onOpenChange]: Dynamic = (0, React.useState)(false);
  let elementRef: Dynamic = (0, React.useRef)(null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!open) return;
      let onOpenChange2: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
        onOpenChange(false);
      window.addEventListener(`blur`, onOpenChange2);
      return (..._extraArguments: unknown[]) =>
        window.removeEventListener(`blur`, onOpenChange2);
    },
    [open],
  );
  return (
    <Popover.Root open={open} onOpenChange={onOpenChange}>
      <Tooltip
        content={open ? undefined : EditorExtensionsAskClaude.react.label}
      >
        <Popover.Trigger
          render={
            <IconButton
              ref={elementRef}
              aria-label={EditorExtensionsAskClaude.react.label}
              size={touch === `card` ? 32 : 20}
              icon={
                <UiOverlaysAndIconsCustomIcon
                  name={`Smiley`}
                  customSize={touch ? commentAnchorsLimit202 : 14}
                />
              }
              onClick={(
                commentAnchorsPinned?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => commentAnchorsPinned.stopPropagation()}
              className={!pinned && !touch ? CommentAnchors_Styles : undefined}
            />
          }
        />
      </Tooltip>
      <ReactionPicker
        side={`top`}
        align={`end`}
        sideOffset={4}
        finalFocus={
          keysOnlyFocusBack
            ? (commentAnchorsPinned?: Dynamic, ..._extraArguments: unknown[]) =>
                commentAnchorsPinned === `keyboard`
            : undefined
        }
        onClick={(
          commentAnchorsPinned?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          commentAnchorsPinned.stopPropagation();
          if (keysOnlyFocusBack && commentAnchorsPinned.detail === 0) {
            elementRef.current?.focus();
          }
        }}
        onPick={(
          commentAnchorsPinned?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          onPick(commentAnchorsPinned);
          onOpenChange(false);
        }}
      />
    </Popover.Root>
  );
}

function useCommentAnchorsUseSyncExternalStore(
  commentAnchorsUseSyncExternalStore?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  (0, React.useSyncExternalStore)(frameProfilesSubscribe, frameProfilesVersion);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (!isFrameArtifact()) return;
      let items: Dynamic = [
        ...new (Set as Dynamic)(
          Object.values(commentAnchorsUseSyncExternalStore)
            .flat()
            .filter(
              (flat?: Dynamic, ..._extraArguments: unknown[]) =>
                !flat.actor.startsWith(`agent`) &&
                resolveEditorAnchorsAndMentionsOther(flat.user) ===
                  `platform` &&
                framePeekProfile(flat.user) === undefined,
            )
            .map(
              (
                filteredFlat?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => filteredFlat.user,
            ),
        ),
      ];
      if (items.length > 0) {
        frameProfiles(items);
      }
    },
    [commentAnchorsUseSyncExternalStore],
  );
}

function UseCommentAnchorsReactionsComponent(
  {
    reactions: reactions,
    me: me2,
    onToggle: onToggle,
    className: className,
    onClick: onClick,
    hint: hint,
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  useCommentAnchorsUseSyncExternalStore(reactions);
  return (
    <Reactions
      items={Object.entries(reactions)
        .filter(
          ([, items]: Dynamic, ..._extraArguments: unknown[]) =>
            items.length > 0,
        )
        .map(
          (
            [emoji, items]: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => ({
            emoji: emoji,
            count: items.length,
            mine:
              !!me2 &&
              items.some(
                (item?: Dynamic, ..._extraArguments: unknown[]) =>
                  item.user === me2 && !item.actor.startsWith(`agent`),
              ),
            names:
              items.map(resolveCommentAnchorsStartsWith).join(`, `) +
              (hint !== undefined && hint.emoji === emoji
                ? ` · ${hint.text}`
                : ``),
          }),
        )}
      onToggle={onToggle}
      className={className}
      onClick={onClick}
    />
  );
}

function ReactionPill(
  { reactions: reactions, me: me2, onToggle: onToggle }: Dynamic,
  ..._extraArguments: unknown[]
) {
  useCommentAnchorsUseSyncExternalStore(reactions);
  let controlId: Dynamic = (0, React.useId)();
  let filteredReactionsEntries: Dynamic = Object.entries(reactions).filter(
    ([, items]: Dynamic, ..._extraArguments: unknown[]) => items.length > 0,
  );
  return filteredReactionsEntries.length === 0 ? null : (
    <div className={`mt-1 flex flex-wrap gap-1`}>
      {filteredReactionsEntries.map(
        (
          [item, items]: Dynamic,
          index?: Dynamic,
          ..._extraArguments: unknown[]
        ) => {
          let ariaPressed: Dynamic =
            !!me2 &&
            items.some(
              (item2?: Dynamic, ..._extraArguments: unknown[]) =>
                item2.user === me2 && !item2.actor.startsWith(`agent`),
            );
          let content: Dynamic = items
            .map(resolveCommentAnchorsStartsWith)
            .join(`, `);
          let ariaLabel = resolveCommentComponentsValue2(item, items.length);
          let className = `flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[11px] leading-none transition-colors ${ariaPressed ? `border-accent bg-accent text-accent` : `border-strong text-secondary${onToggle ? ` hover:bg-alpha-1` : ``}`}`;
          let jsxs = (
            <jsxRuntime.Fragment>
              <span className={`text-[13px]`}>{item}</span>
              <span>{items.length}</span>
            </jsxRuntime.Fragment>
          );
          return (
            <Tooltip
              {...originalJsxProps(
                {
                  content: content,
                  side: `top`,
                  multiline: true,
                  children: onToggle ? (
                    <button
                      type={`button`}
                      data-testid={`reaction-pill`}
                      aria-pressed={ariaPressed}
                      aria-label={ariaLabel}
                      aria-describedby={`${controlId}-${index}`}
                      onClick={(
                        reactionPill?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): undefined => {
                        reactionPill.stopPropagation();
                        onToggle(item);
                      }}
                      onKeyDown={(
                        event?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): undefined =>
                        void (
                          event.repeat &&
                          event.key === `Enter` &&
                          event.preventDefault()
                        )
                      }
                      className={className}
                    >
                      {jsxs}
                      <span id={`${controlId}-${index}`} className={`sr-only`}>
                        {content}
                      </span>
                    </button>
                  ) : (
                    <span
                      data-testid={`reaction-pill`}
                      role={`img`}
                      aria-label={`${ariaLabel}, ${content}`}
                      className={className}
                    >
                      {jsxs}
                    </span>
                  ),
                },
                item,
              )}
            />
          );
        },
      )}
    </div>
  );
}

var CommentAnchorsState6: Dynamic;

var commentAnchorsLimit1000: number;

var resolveCommentAnchorsParse2: Dynamic;

var ReactionChip: Dynamic;

var ReactionNames: Dynamic;

var CommentComposer_ShowWhoReacted: string;

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeCommentAnchorsSeeMorePillStep1(): void {
  (resolveCommentAnchorsStartsWith = (
    commentAnchorsStarts?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    commentAnchorsStarts.actor.startsWith(`agent`)
      ? `Agent`
      : resolveEditorAnchorsAndMentionsEmail(
          commentAnchorsStarts.user,
          framePeekProfile(commentAnchorsStarts.user)?.name,
        ));
  (isCommentAnchorsStartsWith = (
    commentAnchorsStarts?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    !commentAnchorsStarts.actor.startsWith(`agent`) &&
    resolveEditorAnchorsAndMentionsOther(commentAnchorsStarts.user) ===
      `platform` &&
    isFrameArtifact() &&
    framePeekProfile(commentAnchorsStarts.user) === undefined);
  (CommentAnchorsState6 = {});
  (commentAnchorsLimit1000 = 1e3);
  (resolveCommentAnchorsParse2 = (
    file?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let difference = Date.parse(options) - Date.parse(file.root.at);
    return (
      isTmpId(file.id) && difference >= 0 && difference < commentAnchorsLimit1000
    );
  });
  (ReactionChip = (0, React.memo)(function (
    {
      t: t5,
      active: active,
      quote: quote,
      showLabel = false,
      readOnly = false,
      commentOnly = false,
      onReact: onReact,
      onResolve: onResolve,
      onReopen: onReopen,
      onDelete: onDelete,
      onUnreactRoot: onUnreactRoot,
      tabStop: tabStop,
      onNavigate: onNavigate,
      hintId: hintId,
    }: Dynamic,
    ..._extraArguments: unknown[]
  ) {
    let reactionChipResult: Dynamic = PlatformApiAndAuthUser(
      (reactionChip?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        reactionChip.user?.email,
    );
    let id2: Dynamic = useCommentsEditorThen().id;
    let reactionChipResult2: Dynamic = reactionChipResult ?? id2 ?? undefined;
    let reactions: Dynamic = resolveCommentsEditorUser(t5);
    let reactionChipResult3: Dynamic = resolvePlatformApiAndAuthUseContext2();
    let [enabledState, setEnabledState]: Dynamic = (0, React.useState)(
      (..._extraArguments: unknown[]) =>
        !resolveCommentAnchorsParse2(t5, reactionChipResult3.now()),
    );
    (0, React.useLayoutEffect)(
      (..._extraArguments: unknown[]): Dynamic => setEnabledState(true),
      [],
    );
    let emoji = t5.reactionOnly ? null : resolveCommentsEditorTrim(t5.root.body);
    let matchesEmoji =
      emoji !== null &&
      !resolveCommentAnchorsActor(t5.root) &&
      !!reactionChipResult2 &&
      t5.root.user === reactionChipResult2 &&
      !resolveCommentsEditorAgent(t5, emoji);
    let enabled =
      !commentOnly ||
      (!resolveCommentAnchorsActor(t5.root) &&
        !!reactionChipResult2 &&
        t5.root.user === reactionChipResult2);
    let reduce: Dynamic = Object.values(reactions).reduce(
      (
        accumulator?: Dynamic,
        reactionsValue?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        accumulator +
        reactionsValue.filter(
          (reactionsValue2?: Dynamic, ..._extraArguments: unknown[]) =>
            !(
              reactionsValue2.user === t5.root.user &&
              !reactionsValue2.actor.startsWith(`agent`)
            ),
        ).length,
      0,
    );
    let reactionChipResult4: Dynamic = matchesEmoji
      ? filterCommentsEditorEmoji(t5)
      : null;
    let enabledRef: Dynamic = (0, React.useRef)(false);
    let elementRef: Dynamic = (0, React.useRef)(null);
    let useCommentAnchorsKey2: Dynamic = useCommentAnchorsKey(t5.resolved, null);
    let onClick = (..._extraArguments: unknown[]): undefined => {
      if (!isTmpId(t5.id)) {
        useCommentAnchorsKey2(
          elementRef.current?.ownerDocument ?? document,
          t5.id,
          t5.target.pageId,
        );
      }
      onResolve(t5.id);
    };
    let label = matchesEmoji
      ? reactionChipResult4 === null
        ? reduce > 0
          ? `nothing`
          : onDelete
            ? `delete`
            : `resolve`
        : reactionChipResult4.ready && onUnreactRoot
          ? `swap`
          : `nothing`
      : `nothing`;
    let result = (
      reactionChip?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (!enabledRef.current) {
        if (matchesEmoji && reactionChip === emoji) {
          if (!options) return;
          if (label === `swap` && reactionChipResult4 !== null && onUnreactRoot) {
            enabledRef.current = true;
            Promise.resolve(onUnreactRoot(t5.root.id, reactionChipResult4.emoji))
              .catch((..._extraArguments: unknown[]): undefined => {})
              .finally(
                (..._extraArguments: unknown[]): undefined =>
                  void (enabledRef.current = false),
              );
          } else {
            if (label === `delete` && onDelete) {
              Promise.resolve(onDelete(t5.root.id)).catch(
                (..._extraArguments: unknown[]): undefined => {},
              );
            } else {
              if (label === `resolve` && !t5.resolved) {
                onClick();
              }
            }
          }
          return;
        }
        onReact(t5.root.id, reactionChip);
      }
    };
    let matchesTabStop = tabStop !== undefined;
    let [, onFocus]: Dynamic = (0, React.useReducer)(
      (reactionChip?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        reactionChip + 1,
      0,
    );
    let elementRef2: Dynamic = (0, React.useRef)(null);
    (0, React.useLayoutEffect)((..._extraArguments: unknown[]): Dynamic => {
      let element: Dynamic = elementRef.current;
      if (!element || !matchesTabStop) return;
      let activeElement: Dynamic = element.ownerDocument.activeElement;
      let contains: Dynamic = element.contains(activeElement);
      let element2: Dynamic = elementRef2.current;
      let keyed: Dynamic = true;
      try {
        keyed =
          !!activeElement && contains && activeElement.matches(`:focus-visible`);
      } catch {}
      elementRef2.current =
        contains && activeElement
          ? {
              el: activeElement,
              keyed: keyed,
            }
          : null;
      if (
        !contains &&
        element2?.keyed &&
        !element2.el.isConnected &&
        (activeElement === null || activeElement === element.ownerDocument.body)
      ) {
        element.focus({
          preventScroll: true,
        });
        return;
      }
      if (contains) {
        for (let element3 of element.querySelectorAll(
          `[data-rest-tabindex]`,
        ) as Dynamic) {
          let attribute: Dynamic = element3.getAttribute(`data-rest-tabindex`);
          if (attribute) {
            element3.setAttribute(`tabindex`, attribute);
          } else {
            element3.removeAttribute(`tabindex`);
          }
          element3.removeAttribute(`data-rest-tabindex`);
        }
        return;
      }
      let setAttribute = (..._extraArguments: unknown[]): undefined => {
        for (let element3 of element.querySelectorAll(
          CommentComponents_Styles3,
        ) as Dynamic) {
          if (!element3.hasAttribute(`data-rest-tabindex`)) {
            element3.setAttribute(
              `data-rest-tabindex`,
              element3.getAttribute(`tabindex`) ?? ``,
            );
          }
          element3.setAttribute(`tabindex`, `-1`);
        }
      };
      setAttribute();
      if (typeof MutationObserver === "undefined") return;
      let mutationObserver = new MutationObserver(setAttribute);
      mutationObserver.observe(element, {
        childList: true,
        subtree: true,
      });
      return (..._extraArguments: unknown[]) => mutationObserver.disconnect();
    });
    let ariaLabel = matchesTabStop
      ? filterCommentComponentsJoin({
          reactions: reactions,
          quote: quote ?? t5.target.quote?.exact,
          resolved: !!t5.resolved,
        })
      : undefined;
    let matchesLabel = label === `swap` || label === `delete`;
    let record =
      matchesEmoji &&
      emoji !== null &&
      !(reactionChipResult4 !== null && label === `nothing`) &&
      (matchesLabel || !t5.resolved)
        ? {
            emoji: emoji,
            text: matchesLabel
              ? `Remove reaction`
              : label === `resolve`
                ? `Resolve thread`
                : `Others reacted too, so this stays. Resolve the thread to clear it.`,
          }
        : undefined;
    return (
      <TooltipGroup delay={150}>
      <div
          {...originalJsxsProps({
            ref: elementRef,
            "data-active": active || undefined,
            "data-testid": `reaction-chip`,
            className: `group/row relative inline-flex max-w-full items-center gap-1${enabledState ? `` : ` align-top`} ${matchesTabStop ? `rounded-full focus-visible:ring-1 focus-visible:ring-fill-accent focus-visible:outline-none` : ``}`,
            ...(matchesTabStop
              ? {
                  "data-comment-stop": ``,
                  "data-stop-id": t5.id,
                  role: `group`,
                  tabIndex: tabStop === false ? -1 : 0,
                  "aria-label": ariaLabel,
                  onFocus: onFocus,
                  onBlur: onFocus,
                  "aria-describedby": readOnly ? undefined : hintId,
                  onKeyDown: (
                    event?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): undefined => {
                    if (
                      event.key === `Escape` &&
                      event.target !== event.currentTarget &&
                      !event.nativeEvent.isComposing
                    ) {
                      event.preventDefault();
                      event.stopPropagation();
                      event.currentTarget.focus();
                      return;
                    }
                    let enabled2 = false;
                    resolveCommentComponentsTarget5(
                      event,
                      (..._extraArguments: unknown[]): undefined => {
                        let matchedElement: Dynamic =
                          event.currentTarget.querySelector(`button`);
                        if (matchedElement) {
                          matchedElement.focus();
                          enabled2 = true;
                        }
                      },
                      onNavigate,
                    );
                    if (enabled2) {
                      event.stopPropagation();
                    }
                  },
                }
              : {}),
            children: [
              <UseCommentAnchorsReactionsComponent
                reactions={enabledState ? reactions : CommentAnchorsState6}
                me={reactionChipResult2}
                onToggle={
                  readOnly
                    ? undefined
                    : (reactionChip?: Dynamic, ..._extraArguments: unknown[]) =>
                        result(reactionChip, true)
                }
                className={`flex-nowrap items-center`}
                hint={readOnly ? undefined : record}
                onClick={(
                  event?: Dynamic,
                  ..._extraArguments: unknown[]
                ): undefined => {
                  let closest: Dynamic = event.target.closest(`button`);
                  if (closest && event.currentTarget.contains(closest)) {
                    event.stopPropagation();
                  }
                }}
              />,
              showLabel && quote && (
                <Tooltip content={quote} multiline={true}>
                <span
                    className={`text-muted text-caption min-w-0 truncate`}
                    data-testid={`reaction-chip-label`}
                  >
                  {quote}
                </span>
              </Tooltip>
              ),
              t5.resolved && onReopen && !readOnly && enabled && (
                <Tooltip
                  content={resolveCommentAnchorsResolvedBy(t5)}
                  side={`top`}
                >
                <IconButton
                    aria-label={`Reopen`}
                    size={20}
                    icon={
                      <UiOverlaysAndIconsCustomIcon
                        name={`CheckCircleFilled`}
                        customSize={14}
                        className={`text-accent`}
                      />
                    }
                    onClick={(
                      reactionChip?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): undefined => {
                      reactionChip.stopPropagation();
                      onReopen(t5.id);
                    }}
                  />
              </Tooltip>
              ),
              t5.resolved && onReopen && !readOnly && !enabled && (
                <ResolvedMark t={t5} />
              ),
              !readOnly && (
                <span
                  className={`pointer-events-none flex w-0 shrink-0 items-center gap-0.5 overflow-hidden opacity-0 transition-opacity group-focus-within/row:pointer-events-auto group-focus-within/row:w-auto group-focus-within/row:opacity-100 group-hover/row:pointer-events-auto group-hover/row:w-auto group-hover/row:opacity-100 has-[[data-popup-open]]:pointer-events-auto has-[[data-popup-open]]:w-auto has-[[data-popup-open]]:opacity-100`}
                >
                <UseCommentAnchorsPinnedComponent
                    onPick={(
                      reactionChip?: Dynamic,
                      ..._extraArguments: unknown[]
                    ) => result(reactionChip, false)}
                  />
                {!t5.resolved && enabled && (
                    <UseCommentComposerLabelComponent
                      label={`Resolve`}
                      icon={
                        <UiOverlaysAndIconsCustomIcon
                          name={`Check`}
                          customSize={13}
                        />
                      }
                      onClick={onClick}
                    />
                  )}
              </span>
              ),
            ],
          })}
        />
    </TooltipGroup>
    );
  }));
  (ReactionNames = (0, React.memo)(function (
    { reactions: reactions }: Dynamic,
    ..._extraArguments: unknown[]
  ) {
    useCommentAnchorsUseSyncExternalStore(reactions);
    let filteredReactionsEntries: Dynamic = Object.entries(reactions).filter(
      ([, items]: Dynamic, ..._extraArguments: unknown[]) => items.length > 0,
    );
    return filteredReactionsEntries.length === 0 ? null : (
      <ul
        className={`text-caption text-secondary mt-sm flex flex-col gap-xs`}
        data-testid={`reaction-names`}
      >
      {filteredReactionsEntries.map(
          ([item, item2]: Dynamic, ..._extraArguments: unknown[]) => (
            <li
              {...originalJsxsProps(
                {
                  className: `gap-xs flex`,
                  children: [
                    <span className={`shrink-0`}>{item}</span>,
                    item2.some(isCommentAnchorsStartsWith) ? (
                      <span
                        aria-hidden={`true`}
                        data-testid={`reaction-names-loading`}
                        className={`bg-alpha-2 inline-block h-2 w-24 animate-pulse self-center rounded`}
                      />
                    ) : (
                      <span className={`min-w-0 wrap-break-word`}>
                      {item2.map(resolveCommentAnchorsStartsWith).join(`, `)}
                    </span>
                    ),
                  ],
                },
                item,
              )}
            />
          ),
        )}
    </ul>
    );
  }));
  (CommentComposer_ShowWhoReacted = `Show who reacted`);
}

export {
  CommentComposer_ShowWhoReacted,
  CommentHeader,
  CommentWhen,
  ReactionChip,
  ReactionNames,
  SeeMorePill,
  UseCommentAnchorsPinnedComponent,
};
