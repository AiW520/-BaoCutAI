/** BaoCut: comment components from index-CX4IZqzA.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  Badge,
  Button,
  CommentCard,
  DataModelSchemasPending,
  EditorExtensionsMoreActions,
  PlatformApiAndAuthUser,
  Tooltip,
  TooltipGroup,
  UiOverlaysAndIconsCustomIcon,
  clampAnchorLabel,
  filterDataModelSchemasFilter3,
  isTmpId,
  isTouchPresentation,
  mintedThreadId,
  resolveCommentsStoreNode,
  resolveCommentsStoreSource,
  resolveCommentsStoreSource2,
  resolveDataModelSchemasBody2,
  resolveDataModelSchemasComment,
  resolveDataModelSchemasSent,
  resolveDataModelSchemasSent2,
  resolveDataModelSchemasSent3,
  resolveDataModelSchemasValue28,
  resolveDataModelSchemasValue29,
  resolvePlatformAnnouncementsValue,
  resolvePlatformApiAndAuthUseContext2,
  resolvePlatformSessionAndSourcesClaude,
  resolvePlatformSessionAndSourcesSent2,
  resolvePlatformSyncAndRoutingCompact,
  resolveUiDesignSystemValue2,
  segmentOfAnchor,
  subscribePresentationChanges,
  unconfirmedReplyIn,
  useCommentStore,
  useCommentsActionsAndSelectionPlatform,
  useCommentsEditorThen,
} from "../dependencies";
import {
  React,
  jsxRuntime,
} from "../bootstrap";
import {
  IconButton,
} from "../run-review";
import {
  resolveCommentSessionValue,
} from "../comment-session/clear-comment-session-thread-id";
import {
  ClaudeTypingIndicator,
  loadCommentAnchorsValue,
  resolveCommentAnchorsFormat,
} from "../comment-anchors/use-comment-anchors-sheets-component";
import {
  CommentAnchors_ReplyPosted,
  CommentAnchors_Styles2,
  CommentAnchors_TextMutedHoverTextSecondaryTextCaptionMt05BlockTextLeft,
  SummonNote,
  UseCommentAnchorsStateComponent,
  resolveCommentAnchorsActor,
  resolveCommentAnchorsIndexOf,
  resolveCommentAnchorsQuote,
  resolveCommentAnchorsReplace2,
  resolveCommentAnchorsResolvedBy,
  resolveCommentAnchorsUser,
  useCommentResolveMotion,
} from "../comment-anchors/create-comment-mention-search";
import {
  CommentHeader,
  CommentWhen,
  SeeMorePill,
  UseCommentAnchorsPinnedComponent,
} from "../comment-anchors/see-more-pill";
import {
  ClaudePendingRow,
  PendingAsk,
  ResolvedMark,
  UseCommentComposerDataClaudeActivityDotsComponent,
  UseCommentComposerLabelComponent,
  UseCommentComposerModalComponent,
  UseCommentComposerTextComponent,
  filterCommentComposerFilter,
  resolveCommentComposerMentionNames,
  resolveCommentComposerTest,
} from "../comment-composer";
import {
  ChartLineSwatch,
  UseCommentComponentsFromComponent,
  UseCommentComponentsTextComponent,
} from "./comment-editor";
import {
  CommentComponentsState,
  CommentComponents_CommentExpanded,
  CommentComponents_Message2,
  CommentComponents_Mx3Mt3Mb3Px3Pb3,
  CommentComponents_PsMdMs25BorderS,
  CommentComponents_Styles2,
  CommentComponents_Styles3,
  CommentReplyComposer,
  mapCommentComponentsReplace,
  resolveCommentComponentsPush,
  resolveCommentComponentsTarget3,
  resolveCommentComponentsTarget4,
  useCommentComponentsState,
} from "./comment-reply-composer";
import {
  CommentComponentsState4,
  CommentOutbox,
  CommentReplySheet,
  resolveCommentComponentsTarget5,
} from "./comment-reply-sheet";

var CiteOutcomeChip: Dynamic;

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeCommentComponentsShared4Step1(): void {
  (CiteOutcomeChip = (0, React.memo)(function (
    {
      t: t5,
      expanded: expanded,
      flat: flat,
      tuckReplies: tuckReplies,
      chrome: chrome,
      quote: quote,
      chartLine: chartLine,
      active: active,
      orphan: orphan,
      wholePage: wholePage,
      anchorLabel: anchorLabel,
      away = false,
      beside = false,
      readOnly: readOnly,
      commentOnly = false,
      enableCCSessions: enableCCSessions,
      coworkerContainer: coworkerContainer,
      refPid: refPid,
      onExpand: onExpand,
      onReply: onReply,
      onEdit: onEdit,
      onDelete: onDelete,
      onReact: onReact,
      onCopyLink: onCopyLink,
      onResolve: onResolve,
      onReopen: onReopen,
      onOpenPin: onOpenPin,
      keepReplyDraft: keepReplyDraft,
      compact: compact,
      onNavigate: onNavigate,
      hintId: hintId,
      tabStop: tabStop,
      touch = false,
      replyRoad = `box`,
      fit = false,
      resolveMotion: resolveMotion,
    }: Dynamic,
    ..._extraArguments: unknown[]
  ) {
    let citeOutcomeChipResult: Dynamic = resolvePlatformSyncAndRoutingCompact();
    let face: Dynamic = useCommentStore(
      (citeOutcomeChip?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        Object.hasOwn(citeOutcomeChip.outbox, t5.id)
          ? citeOutcomeChip.outbox[t5.id]
          : undefined,
    );
    let citeOutcomeChipResult2: Dynamic = useCommentStore(
      (citeOutcomeChip?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        t5.replies.some((reply?: Dynamic, ..._extraArguments: unknown[]) =>
          Object.hasOwn(citeOutcomeChip.outbox, reply.id),
        )
          ? citeOutcomeChip.outbox
          : CommentComponentsState4,
    );
    let readOnly2 = readOnly === true || face !== undefined;
    let sendHeld: Dynamic = useCommentStore(
      (citeOutcomeChip?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        unconfirmedReplyIn(citeOutcomeChip, t5.id),
    );
    let text: Dynamic = useCommentStore(
      (citeOutcomeChip?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        citeOutcomeChip.working[t5.id],
    );
    let citeOutcomeChipResult3: Dynamic = useCommentStore(
      (citeOutcomeChip?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        Object.hasOwn(citeOutcomeChip.summonNotes, t5.id)
          ? citeOutcomeChip.summonNotes[t5.id]
          : undefined,
    );
    let citeOutcomeChipResult4: Dynamic = useCommentStore(
      (citeOutcomeChip?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        Object.hasOwn(citeOutcomeChip.summonOpen, t5.id)
          ? citeOutcomeChip.summonOpen[t5.id]
          : undefined,
    );
    let citeOutcomeChipResult5: Dynamic = useCommentStore(
      (citeOutcomeChip?: Dynamic, ..._extraArguments: unknown[]) =>
        citeOutcomeChip.frameSummon !== null,
    );
    let citeOutcomeChipResult6: Dynamic = PlatformApiAndAuthUser(
      (citeOutcomeChip?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        citeOutcomeChip.user?.email,
    );
    let id2: Dynamic = useCommentsEditorThen().id;
    let cardRef: Dynamic = (0, React.useRef)(null);
    let useSyncExternalStore: Dynamic = (0, React.useSyncExternalStore)(
      subscribePresentationChanges,
      isTouchPresentation,
      (..._extraArguments: unknown[]) => false,
    );
    let useCommentResolveMotion2: Dynamic = useCommentResolveMotion({
      threadId: t5.id,
      pageId: t5.target.pageId,
      motion: resolveMotion,
      onResolve: onResolve,
      cardRef: cardRef,
      resolved: t5.resolved,
      partPlacement:
        chrome === `cds` && onReopen !== undefined
          ? useSyncExternalStore || expanded
            ? `pinned`
            : `float`
          : null,
    });
    let citeOutcomeChipResult7: Dynamic =
      citeOutcomeChipResult6 ?? id2 ?? undefined;
    let citeOutcomeChipResult8: Dynamic = resolvePlatformApiAndAuthUseContext2();
    let parse = Date.parse(citeOutcomeChipResult8.now());
    let citeOutcomeChipResult9: Dynamic = useCommentsActionsAndSelectionPlatform(
      resolveCommentAnchorsActor(t5.root) || t5.root.user === ``
        ? null
        : t5.root.user,
    );
    let ariaLabel: Dynamic = resolveCommentComponentsPush({
      author: resolveCommentAnchorsUser(t5.root, citeOutcomeChipResult9?.name),
      when:
        t5.root.at === ``
          ? undefined
          : resolveCommentAnchorsFormat(
              t5.root.at,
              new Date(citeOutcomeChipResult8.now()),
              citeOutcomeChipResult8.locale,
              citeOutcomeChipResult8.timeZone,
            ),
      body: mapCommentComponentsReplace(
        t5.root.body,
        resolveCommentComposerMentionNames,
      ),
      replies: t5.replies.length,
      resolved: !!t5.resolved,
      suggestion: t5.root.kind === `suggestion`,
      quote: quote ?? t5.target.quote?.exact,
      wholePage: wholePage,
      anchorLabel: anchorLabel,
      orphan: orphan,
      open: expanded,
    });
    let onKeyDown: Dynamic = (event?: Dynamic, ..._extraArguments: unknown[]) =>
      resolveCommentComponentsTarget5(
        event,
        (citeOutcomeChip?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          let currentTarget: Dynamic = event.currentTarget;
          if (!expanded) {
            let matchesOnExpand = onExpand(t5.id) !== false;
            resolvePlatformAnnouncementsValue(
              currentTarget.ownerDocument,
              matchesOnExpand
                ? CommentComponents_CommentExpanded
                : CommentComponents_Message2,
              {
                key: `comment-card`,
              },
            );
          } else if (citeOutcomeChip === `Enter` && !readOnly2) {
            let removeEventListener = (
              ..._extraArguments: unknown[]
            ): undefined => {
              currentTarget.removeEventListener(`keyup`, focus);
              currentTarget.removeEventListener(`blur`, removeEventListener);
            };
            let focus = (
              event2?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              if (event2.key === `Enter`) {
                removeEventListener();
                if (currentTarget.ownerDocument.activeElement === currentTarget) {
                  currentTarget
                    .querySelector(
                      `[data-comment-reply] [contenteditable="true"]`,
                    )
                    ?.focus();
                }
              }
            };
            currentTarget.addEventListener(`keyup`, focus);
            currentTarget.addEventListener(`blur`, removeEventListener);
          }
        },
        onNavigate,
      );
    let matchesTabStop = tabStop !== undefined;
    (0, React.useLayoutEffect)((..._extraArguments: unknown[]): Dynamic => {
      let card: Dynamic = cardRef.current;
      if (!card || !matchesTabStop) return;
      if (expanded) {
        for (let element of card.querySelectorAll(
          `[data-rest-tabindex]`,
        ) as Dynamic) {
          let attribute: Dynamic = element.getAttribute(`data-rest-tabindex`);
          if (attribute) {
            element.setAttribute(`tabindex`, attribute);
          } else {
            element.removeAttribute(`tabindex`);
          }
          element.removeAttribute(`data-rest-tabindex`);
        }
        return;
      }
      let setAttribute = (..._extraArguments: unknown[]): undefined => {
        for (let element of card.querySelectorAll(
          CommentComponents_Styles3,
        ) as Dynamic) {
          if (!element.hasAttribute(`data-rest-tabindex`)) {
            element.setAttribute(
              `data-rest-tabindex`,
              element.getAttribute(`tabindex`) ?? ``,
            );
          }
          if (element.getAttribute(`tabindex`) !== `-1`) {
            element.setAttribute(`tabindex`, `-1`);
          }
        }
      };
      setAttribute();
      if (typeof MutationObserver === "undefined") return;
      let mutationObserver = new MutationObserver(setAttribute);
      mutationObserver.observe(card, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: [`tabindex`],
      });
      return (..._extraArguments: unknown[]) => mutationObserver.disconnect();
    });
    let live: Dynamic = citeOutcomeChipResult5;
    let live2: Dynamic = live && resolveDataModelSchemasBody2(t5);
    let [citeOutcomeChipState, setCiteOutcomeChipState]: Dynamic = (0,
    React.useState)(null);
    let liveRef: Dynamic = (0, React.useRef)(live2);
    liveRef.current = live2;
    let [checked, onChange]: Dynamic = (0, React.useState)(null);
    let onHolding: Dynamic = (0, React.useCallback)(
      (
        citeOutcomeChip?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        setCiteOutcomeChipState(
          (citeOutcomeChip2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            citeOutcomeChip
              ? options && !options.byPerson
                ? options.checked
                : (citeOutcomeChip2 ?? liveRef.current)
              : null,
        );
        if (citeOutcomeChip && options?.byPerson) {
          onChange(options.checked);
        }
      },
      [],
    );
    let onDraftEnd: Dynamic = (0, React.useCallback)(
      (..._extraArguments: unknown[]): Dynamic => onChange(null),
      [],
    );
    let expanded2: Dynamic = expanded && !readOnly2 && live;
    (0, React.useEffect)(
      (..._extraArguments: unknown[]): undefined => {
        if (!expanded2) {
          setCiteOutcomeChipState(null);
          onChange(null);
        }
      },
      [expanded2],
    );
    let checked2: Dynamic =
      checked ?? (expanded2 && (citeOutcomeChipState ?? live2));
    let route: Dynamic = (0, React.useMemo)(
      (..._extraArguments: unknown[]): Dynamic =>
        live
          ? {
              checked: checked2,
              byPerson: checked !== null,
              onChange: onChange,
              onDraftEnd: onDraftEnd,
            }
          : undefined,
      [live, checked2, checked, onDraftEnd],
    );
    let placeholder = resolveDataModelSchemasComment(
      `reply`,
      expanded2 && checked2,
    );
    let [enabledState, setEnabledState]: Dynamic = (0, React.useState)(false);
    let returnFocus: Dynamic = (0, React.useRef)(null);
    let enabledRef: Dynamic = (0, React.useRef)(false);
    (0, React.useEffect)(
      (..._extraArguments: unknown[]): undefined => {
        if (!(replyRoad !== `sheet` || enabledState)) {
          setCiteOutcomeChipState(null);
          onChange(null);
          if (enabledRef.current) {
            enabledRef.current = false;
            useCommentStore
              .getState()
              .stashReplyDraft(mintedThreadId(t5.id), null);
          }
        }
      },
      [replyRoad, enabledState, t5.id],
    );
    let citeOutcomeChipResult10: Dynamic = DataModelSchemasPending(
      (citeOutcomeChip?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        Object.hasOwn(citeOutcomeChip.pending, t5.id)
          ? citeOutcomeChip.pending[t5.id]
          : undefined,
    );
    let rowShowing: Dynamic =
      live &&
      resolveDataModelSchemasSent3(
        citeOutcomeChipResult10,
        t5,
        citeOutcomeChipResult3,
        parse,
      );
    let answered: Dynamic =
      live &&
      resolvePlatformSessionAndSourcesSent2(citeOutcomeChipResult3) &&
      resolveDataModelSchemasValue29(t5);
    let note: Dynamic = resolveDataModelSchemasSent2(citeOutcomeChipResult3, {
      live: live,
      rowShowing: rowShowing,
      answered: answered,
      recordHeld: citeOutcomeChipResult10 !== undefined,
    });
    let onOpen: Dynamic =
      citeOutcomeChipResult4 === undefined
        ? undefined
        : (..._extraArguments: unknown[]) =>
            resolveCommentSessionValue(citeOutcomeChipResult4);
    let handoff: Dynamic = useCommentStore(
      (citeOutcomeChip?: Dynamic, ..._extraArguments: unknown[]) =>
        Object.hasOwn(citeOutcomeChip.summonHandoff, t5.id),
    );
    let mark: Dynamic = async (
      citeOutcomeChip?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> => {
      let citeOutcomeChipResult13: Dynamic = mintedThreadId(t5.id);
      let summonNoteItem: Dynamic =
        useCommentStore.getState().summonNotes[citeOutcomeChipResult13];
      let handoff2 = Object.hasOwn(
        useCommentStore.getState().summonHandoff,
        citeOutcomeChipResult13,
      );
      useCommentStore.getState().setSummonNote(citeOutcomeChipResult13, null);
      let citeOutcomeChipResult14: Dynamic;
      try {
        citeOutcomeChipResult14 = await citeOutcomeChip();
      } catch (citeOutcomeChipResult15: Dynamic) {
        throw (
          useCommentStore
            .getState()
            .setSummonNote(citeOutcomeChipResult13, summonNoteItem ?? null, {
              handoff: handoff2,
            }),
          citeOutcomeChipResult15
        );
      }
      if (
        !resolveDataModelSchemasSent(
          useCommentStore.getState().summonNotes[mintedThreadId(t5.id)],
        )
      ) {
        DataModelSchemasPending.getState().mark(
          mintedThreadId(t5.id),
          filterDataModelSchemasFilter3(t5),
          {
            now: Date.parse(citeOutcomeChipResult8.now()),
          },
        );
      }
      return citeOutcomeChipResult14;
    };
    let onPost: Dynamic = async (
      citeOutcomeChip?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      dependencies?: Dynamic,
      argument?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> => {
      let toClaude: Dynamic = argument.toClaude;
      let onReply2: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
        onReply?.(t5.id, citeOutcomeChip, options, context, dependencies, {
          toClaude: toClaude,
          ...(argument.pressedAt !== undefined && {
            pressedAt: argument.pressedAt,
          }),
        }) ?? Promise.resolve();
      return resolveDataModelSchemasValue28(toClaude, citeOutcomeChip, options)
        ? mark(onReply2)
        : onReply2();
    };
    let onPosted = (
      { queued: queued }: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (!queued) {
        resolvePlatformAnnouncementsValue(document, CommentAnchors_ReplyPosted, {
          key: `comment-post`,
        });
      }
    };
    (0, React.useEffect)(
      (..._extraArguments: unknown[]): undefined => {
        if (answered) {
          DataModelSchemasPending.getState().clear(t5.id);
          useCommentStore.getState().setSummonNote(t5.id, null);
        }
      },
      [answered, t5.id],
    );
    let [citeOutcomeChipState2, setCiteOutcomeChipState2]: Dynamic = (0,
    React.useState)(null);
    let [citeOutcomeChipState3, setCiteOutcomeChipState3]: Dynamic = (0,
    React.useState)(null);
    let [deleteAsk, setDeleteAsk]: Dynamic = (0, React.useState)(0);
    let [enabledState2, setEnabledState2]: Dynamic = (0, React.useState)(false);
    let enabledRef2: Dynamic = (0, React.useRef)(false);
    let row: Dynamic = expanded ? citeOutcomeChipState2 : null;
    let citeOutcomeChipState4: Dynamic = expanded ? citeOutcomeChipState3 : null;
    let expanded3: Dynamic = expanded && enabledState2;
    (0, React.useEffect)(
      (..._extraArguments: unknown[]): undefined => {
        if (!expanded) {
          setCiteOutcomeChipState2(null);
          setCiteOutcomeChipState3(null);
          setEnabledState2(false);
          setEnabledState(false);
        }
      },
      [expanded],
    );
    let recordRef: Dynamic = (0, React.useRef)({
      row: row,
    });
    (0, React.useLayoutEffect)(
      (..._extraArguments: unknown[]): undefined => {
        if (recordRef.current.row !== row) {
          recordRef.current = {
            row: row,
          };
        }
      },
      [row],
    );
    let resolveCommentAnchorsActor2: Dynamic = (
      citeOutcomeChip?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      !resolveCommentAnchorsActor(citeOutcomeChip) &&
      !!citeOutcomeChipResult7 &&
      citeOutcomeChip.user === citeOutcomeChipResult7;
    let enabled: Dynamic = !commentOnly || resolveCommentAnchorsActor2(t5.root);
    let citeOutcomeChipHandler: Dynamic =
      (citeOutcomeChip?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      (citeOutcomeChip2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        if (!(!expanded && onExpand(t5.id) === false)) {
          setCiteOutcomeChipState2(null);
          setCiteOutcomeChipState3(null);
          citeOutcomeChip(citeOutcomeChip2);
        }
      };
    let jsxs: Dynamic = (
      citeOutcomeChip?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) => {
      if (readOnly2) return;
      let commentAnchorsActor: Dynamic =
        resolveCommentAnchorsActor2(citeOutcomeChip);
      let expanded4: Dynamic = expanded && options;
      let enabled2 = !expanded4;
      let jsx3 = (
        <UseCommentComposerModalComponent
          onCopyLink={(..._extraArguments: unknown[]): Dynamic =>
            onCopyLink?.(t5.id)
          }
          onEdit={
            commentAnchorsActor
              ? (..._extraArguments: unknown[]): Dynamic =>
                  citeOutcomeChipHandler(setCiteOutcomeChipState2)(
                    citeOutcomeChip.id,
                  )
              : undefined
          }
          onDelete={
            commentAnchorsActor
              ? (..._extraArguments: unknown[]): undefined => {
                  setDeleteAsk(
                    (
                      citeOutcomeChip2?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic => citeOutcomeChip2 + 1,
                  );
                  citeOutcomeChipHandler(setCiteOutcomeChipState3)(
                    citeOutcomeChip.id,
                  );
                }
              : undefined
          }
        />
      );
      let options2: Dynamic =
        options &&
        t5.resolved &&
        onReopen &&
        (enabled ? (
          <Tooltip content={resolveCommentAnchorsResolvedBy(t5)} side={`top`}>
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
                citeOutcomeChip2?: Dynamic,
                ..._extraArguments: unknown[]
              ): undefined => {
                citeOutcomeChip2.stopPropagation();
                onReopen(t5.id);
              }}
            />
        </Tooltip>
        ) : (
          <ResolvedMark t={t5} />
        ));
      let options3: Dynamic = options && !options2 && enabled && (
        <UseCommentComposerLabelComponent
          label={`Resolve`}
          icon={
            <UseCommentAnchorsStateComponent
              state={useCommentResolveMotion2.checkState}
              size={13}
            />
          }
          onClick={useCommentResolveMotion2.start}
          pinned={true}
        />
      );
      return (
        <span
          className={resolveUiDesignSystemValue2(
            `flex gap-0.5`,
            enabled2 && !options2 && `-ms-2 pointer-coarse:ms-0`,
            expanded4 && `shrink-0`,
          )}
        >
        <span
            className={
              enabled2
                ? resolveUiDesignSystemValue2(
                    CommentAnchors_Styles2,
                    options && `rx-actions`,
                    options2 ? `end-7` : `end-0`,
                  )
                : `contents`
            }
          >
          <UseCommentAnchorsPinnedComponent
              onPick={(
                citeOutcomeChip2?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => onReact?.(citeOutcomeChip.id, citeOutcomeChip2)}
              pinned={true}
            />
          {jsx3}
          {options3}
        </span>
        {options2}
      </span>
      );
    };
    let onCancel = (..._extraArguments: unknown[]): undefined => {
      setCiteOutcomeChipState2(null);
      setCiteOutcomeChipState3(null);
    };
    let citeOutcomeChipHandler2: Dynamic =
      (citeOutcomeChip?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      (
        citeOutcomeChip2?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ) => {
        let record: Dynamic = recordRef.current;
        return loadCommentAnchorsValue(
          (..._extraArguments: unknown[]): Dynamic =>
            options.toClaude
              ? mark(
                  (..._extraArguments: unknown[]): Dynamic =>
                    onEdit?.(citeOutcomeChip, citeOutcomeChip2, options),
                )
              : onEdit?.(citeOutcomeChip, citeOutcomeChip2),
          (..._extraArguments: unknown[]): Dynamic =>
            setCiteOutcomeChipState2(
              (
                citeOutcomeChip3?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic =>
                citeOutcomeChip3 === citeOutcomeChip ? null : citeOutcomeChip3,
            ),
          (..._extraArguments: unknown[]) => recordRef.current === record,
        );
      };
    let resolveCommentAnchorsActor3: Dynamic = (
      post?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      live &&
      !resolveCommentAnchorsActor(post) &&
      !resolvePlatformSessionAndSourcesClaude(post.body, post.to) &&
      !options.some(resolveCommentAnchorsActor);
    let citeOutcomeChipHandler3: Dynamic =
      (citeOutcomeChip?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      async (..._extraArguments: unknown[]): Promise<undefined> => {
        await onDelete?.(citeOutcomeChip);
        setCiteOutcomeChipState3(null);
      };
    let citeOutcomeChipResult11 = orphan
      ? segmentOfAnchor(t5.target.anchor)
      : null;
    let citeOutcomeChipResult12: Dynamic =
      chartLine === undefined ? resolveCommentsStoreNode(t5.target.pin) : null;
    let matchesDatum =
      t5.target.pin?.datum !== undefined ||
      t5.target.pin?.resolved?.path !== undefined;
    let at2: Dynamic = t5.replies.at(-1);
    let tailKey: Dynamic =
      at2 !== undefined && isTmpId(at2.id) ? at2.id : undefined;
    let matchesCompact =
      compact === true && !expanded && !expanded3 && t5.replies.length > 0;
    let count: Dynamic = resolveCommentAnchorsIndexOf(
      t5.replies.map(
        (reply?: Dynamic, ..._extraArguments: unknown[]): Dynamic => reply.id,
      ),
      row ?? citeOutcomeChipState4,
      expanded3,
      matchesCompact,
    );
    let matchesCount = count > 0;
    let matchesRepliesCount: Dynamic =
      t5.replies.length > 0 ||
      !!text ||
      rowShowing ||
      filterCommentComposerFilter(t5.pendingAsks, parse).length > 0;
    let UseCommentComponentsState3Component: Dynamic =
      tuckReplies === true && t5.replies.length > 0 && note !== undefined
        ? useCommentComponentsState
        : React.Fragment;
    let jsxs2: Dynamic = (
      flush: Dynamic = false,
      ..._extraArguments: unknown[]
    ) => (
      <jsxRuntime.Fragment>
      {t5.root.citeOutcome && (
          <span
            data-testid={`cite-outcome-chip`}
            className={resolveUiDesignSystemValue2(
              `bg-accent text-accent inline-block rounded px-1.5 py-0.5 text-[11px] font-medium`,
              flush ? `self-start` : `mb-2`,
            )}
          >
          {t5.root.citeOutcome.kind === `cite` && `✓ cited`}
          {t5.root.citeOutcome.kind === `contradicted` && `⚠ contradicted`}
          {t5.root.citeOutcome.kind === `citation-needed` &&
              `? citation needed`}
          {t5.root.citeOutcome.sourceRef &&
              ` · ${t5.root.citeOutcome.sourceRef}`}
          {t5.root.citeOutcome.tier && ` · ${t5.root.citeOutcome.tier}`}
        </span>
        )}
      {citeOutcomeChipResult12 !== null && (
          <div
            className={resolveUiDesignSystemValue2(
              `text-muted text-caption truncate`,
              !flush && `mb-1`,
            )}
            data-testid={`datum-readout`}
          >
          <span className={`bg-alpha-1 text-secondary rounded px-1 py-0.5`}>
            {citeOutcomeChipResult12}
          </span>
        </div>
        )}
      {t5.root.kind === `suggestion` && t5.root.proposedText !== undefined ? (
          <UseCommentComponentsFromComponent
            from={t5.target.quote?.exact ?? quote ?? ``}
            to={t5.root.proposedText}
            flush={flush}
          />
        ) : chartLine === undefined ? (
          quote && !orphan ? (
            <UseCommentComponentsTextComponent text={quote} part={flush} />
          ) : (
            away &&
            anchorLabel &&
            !orphan &&
            !wholePage && (
              <UseCommentComponentsTextComponent
                text={anchorLabel}
                testid={`anchor-line`}
                part={flush}
              />
            )
          )
        ) : beside && !matchesDatum ? (
          <span className={`sr-only`}>{chartLine.text}</span>
        ) : (
          <ChartLineSwatch line={chartLine} part={flush} />
        )}
      {wholePage && (
          <div
            className={flush ? undefined : `mb-1`}
            data-testid={`whole-page-chip`}
          >
          <Badge variant={`neutral`} size={`xxs`}>{`Whole document`}</Badge>
        </div>
        )}
      {((..._extraArguments: unknown[]) => {
          let citeOutcomeChipResult13: Dynamic = resolveCommentsStoreSource(
            t5.target.pin,
          );
          let citeOutcomeChipResult14: Dynamic =
            citeOutcomeChipResult13 === null
              ? null
              : resolveCommentsStoreSource2(citeOutcomeChipResult13);
          if (
            citeOutcomeChipResult13 === null ||
            citeOutcomeChipResult13.ref === null ||
            citeOutcomeChipResult14 === null ||
            onOpenPin === undefined ||
            citeOutcomeChipResult13.ref.startsWith(`node/`)
          )
            return null;
          let pin: Dynamic = t5.target.pin;
          let citeOutcomeChipResult15: Dynamic =
            resolveCommentsStoreNode(pin) ?? citeOutcomeChipResult14;
          return (
            <Tooltip
              content={`Open this datum's source with the pinned cell highlighted`}
              multiline={true}
            >
            <button
                type={`button`}
                data-testid={`datum-pin-chip`}
                onClick={(
                  citeOutcomeChip?: Dynamic,
                  ..._extraArguments: unknown[]
                ): undefined => {
                  citeOutcomeChip.stopPropagation();
                  onOpenPin(pin);
                }}
                className={resolveUiDesignSystemValue2(
                  `bg-alpha-1 text-secondary hover:bg-alpha-2 hover:text-primary text-caption inline-flex max-w-full items-center gap-1 rounded px-1.5 py-0.5 transition-colors`,
                  !flush && `mb-1`,
                )}
              >
              <UiOverlaysAndIconsCustomIcon
                  name={`Pin`}
                  customSize={10}
                  className={`shrink-0 opacity-60`}
                />
              <span className={`truncate font-mono`}>
                {clampAnchorLabel(citeOutcomeChipResult15)}
              </span>
            </button>
          </Tooltip>
          );
        })()}
      {orphan &&
          (citeOutcomeChipResult11 ? (
            <div
              className={resolveUiDesignSystemValue2(
                `text-muted text-caption truncate`,
                !flush && `mb-1`,
              )}
              data-testid={`segment-orphan-label`}
            >
            {`on`}
            {` `}
            <span
                className={`bg-alpha-1 text-secondary rounded px-1 py-0.5 font-mono`}
              >
              {citeOutcomeChipResult11}
            </span>
          </div>
          ) : (
            resolveCommentAnchorsQuote(t5.target) && (
              <Tooltip
                content={resolveCommentAnchorsQuote(t5.target)}
                multiline={true}
              >
              <div>
                <UseCommentComponentsTextComponent
                    lead={`was on:`}
                    text={resolveCommentAnchorsQuote(t5.target)}
                    testid={`was-on-line`}
                    part={flush}
                  />
              </div>
            </Tooltip>
            )
          ))}
    </jsxRuntime.Fragment>
    );
    let jsxs3: Dynamic = (
      citeOutcomeChip?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) => {
      if (readOnly2) return;
      let commentAnchorsActor: Dynamic =
        resolveCommentAnchorsActor2(citeOutcomeChip);
      return (
        <CommentCard.Actions>
        <UseCommentAnchorsPinnedComponent
            onPick={(
              citeOutcomeChip2?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => onReact?.(citeOutcomeChip.id, citeOutcomeChip2)}
            pinned={true}
            touch={useSyncExternalStore && `card`}
            keysOnlyFocusBack={true}
          />
        <CommentCard.MoreMenu
            label={EditorExtensionsMoreActions}
            onCopyLink={(..._extraArguments: unknown[]): Dynamic =>
              onCopyLink?.(t5.id)
            }
            onEdit={
              commentAnchorsActor
                ? (..._extraArguments: unknown[]): Dynamic =>
                    citeOutcomeChipHandler(setCiteOutcomeChipState2)(
                      citeOutcomeChip.id,
                    )
                : undefined
            }
            onReopen={
              options && t5.resolved && onReopen && enabled
                ? (..._extraArguments: unknown[]): undefined =>
                    void onReopen(t5.id)
                : undefined
            }
            onDelete={
              commentAnchorsActor
                ? (..._extraArguments: unknown[]): undefined => {
                    setDeleteAsk(
                      (
                        citeOutcomeChip2?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): Dynamic => citeOutcomeChip2 + 1,
                    );
                    citeOutcomeChipHandler(setCiteOutcomeChipState3)(
                      citeOutcomeChip.id,
                    );
                  }
                : undefined
            }
          />
        {options && t5.resolved && onReopen ? (
            <CommentCard.ResolveAction
              resolved={true}
              resolvedLabel={resolveCommentAnchorsReplace2(t5)}
              data-testid={`resolved-mark`}
            />
          ) : (
            options &&
            enabled && (
              <CommentCard.ResolveAction
                onResolve={useCommentResolveMotion2.start}
                busy={useCommentResolveMotion2.checkState !== `idle`}
              />
            )
          )}
      </CommentCard.Actions>
      );
    };
    let onClick = (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (!event.currentTarget.contains(event.target)) {
        event.stopPropagation();
        return;
      }
      let closest: Dynamic = event.target.closest(
        `button, a[href], [role="checkbox"], [data-cds-part="edit-field"], [data-cds-part="delete-confirm"]`,
      );
      if (
        closest !== null &&
        event.currentTarget.contains(closest) &&
        closest.closest(`[data-cds-part="replies-toggle"]`) === null
      ) {
        event.stopPropagation();
        return;
      }
      if (enabledRef2.current) {
        enabledRef2.current = false;
      } else {
        if (!expanded) {
          onExpand(t5.id);
        }
      }
    };
    let citeOutcomeChipHandler4: Dynamic = (
      citeOutcomeChip?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      whoReacted: touch,
      editReturnAddsLine: touch,
      container: refPid,
      compact: compact,
      cardExpanded: expanded,
      r: citeOutcomeChip,
      editing: row === citeOutcomeChip.id,
      editToClaude: resolveCommentAnchorsActor3(citeOutcomeChip, options),
      deleting: citeOutcomeChipState4 === citeOutcomeChip.id,
      deleteAsk: deleteAsk,
      me: citeOutcomeChipResult7,
      onSave: citeOutcomeChipHandler2(citeOutcomeChip.id),
      onDelete: citeOutcomeChipHandler3(citeOutcomeChip.id),
      onCancel: onCancel,
    });
    let jsx = (
      <SummonNote
        as={CommentCard.Note}
        note={note}
        onOpen={onOpen}
        handoff={handoff}
      />
    );
    let matchesTuckReplies =
      tuckReplies === true && t5.replies.length > 0 && note !== undefined;
    let jsx2 =
      expanded && !readOnly2 && replyRoad === `sheet` && enabledState ? (
        <div
          role={`presentation`}
          onClick={(
            citeOutcomeChip?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => citeOutcomeChip.stopPropagation()}
        >
        <CommentReplySheet
            placeholder={placeholder}
            sendHeld={sendHeld}
            boxId={`reply-sheet:${t5.id}`}
            draftKey={keepReplyDraft ? t5.id : undefined}
            draftPageId={keepReplyDraft ? t5.target.pageId : undefined}
            route={route}
            onHolding={live ? onHolding : undefined}
            enableCCSessions={enableCCSessions}
            coworkerContainer={coworkerContainer}
            refPid={refPid}
            returnFocus={returnFocus}
            onPost={(
              citeOutcomeChip?: Dynamic,
              options?: Dynamic,
              context?: Dynamic,
              dependencies?: Dynamic,
              argument?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              live
                ? onPost(
                    citeOutcomeChip,
                    options,
                    context,
                    dependencies,
                    argument,
                  )
                : (onReply?.(
                    t5.id,
                    citeOutcomeChip,
                    options,
                    context,
                    dependencies,
                  ) ?? Promise.resolve())
            }
            onClose={(..._extraArguments: unknown[]): Dynamic =>
              setEnabledState(false)
            }
            onDiscard={(..._extraArguments: unknown[]): undefined => {
              enabledRef.current = true;
              setEnabledState(false);
            }}
          />
      </div>
      ) : null;
    return chrome === `cds` ? (
      <TooltipGroup delay={150}>
      <CommentCard
        ref={cardRef}
        variant={flat ? `flat` : `raised`}
        expanded={expanded}
        active={expanded || active === true}
        readOnly={readOnly2}
        className={resolveUiDesignSystemValue2(`rx-card`, flat && !fit && `py-md`, fit && `min-h-0`)}
        role={`article`}
        data-testid={`ldoc-thread-card`}
        data-comment-stop={``}
        data-stop-id={t5.id}
        data-nonresting={expanded || useCommentResolveMotion2.phase !== `idle` || undefined}
        {...useCommentResolveMotion2.cardProps}
        tabIndex={tabStop === false ? -1 : 0}
        aria-label={ariaLabel}
        aria-describedby={hintId}
        onKeyDown={onKeyDown}
        onClick={onClick}
      >{<SeeMorePill fit={fit} touch={touch} tailKey={tailKey} expanded={expanded} column={`flex flex-col gap-sm`} tallerCap={true}>
              {jsxs2(true)}
              <CommentHeader
                {...citeOutcomeChipHandler4(t5.root, t5.replies)}
                dimmed={face?.state === `sending` && face.unconfirmed !== undefined}
                right={jsxs3(t5.root, true)}
                onReact={readOnly2 ? undefined : (citeOutcomeChip?: Dynamic, ..._extraArguments: unknown[]): Dynamic => onReact?.(t5.root.id, citeOutcomeChip)}
              />
              {t5.root.kind === `suggestion` && !t5.resolved && !readOnly2 && enabled && t5.root.proposedText !== undefined && <div className={`flex gap-2`}>
                    <Button size={citeOutcomeChipResult(`xs`)} variant={`secondary`} onClick={(citeOutcomeChip?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        citeOutcomeChip.stopPropagation();
        onResolve?.(t5.id);
      }}>{`Reject`}</Button>
                  </div>}
              {matchesRepliesCount && <CommentCard.Replies className={resolveUiDesignSystemValue2(tuckReplies && CommentComponents_PsMdMs25BorderS)}>
                  {matchesCount && <CommentCard.RepliesToggle count={count} data-testid={`show-replies`} onClick={(..._extraArguments: unknown[]): Dynamic => {
        if (expanded) return setEnabledState2(true);
        enabledRef2.current = true;
        queueMicrotask((..._extraArguments: unknown[]) => enabledRef2.current = false);
        if (onExpand(t5.id) !== false) {
          setEnabledState2(true);
        }
      }} />}
                  {t5.replies.slice(count).map((repliesSlice?: Dynamic, ..._extraArguments: unknown[]) => {
        let face2: Dynamic = Object.hasOwn(citeOutcomeChipResult2, repliesSlice.id) ? citeOutcomeChipResult2[repliesSlice.id] : undefined;
        return <React.Fragment key={repliesSlice.id}>{<CommentHeader
          {...citeOutcomeChipHandler4(repliesSlice, t5.replies.slice(t5.replies.indexOf(repliesSlice) + 1))}
          dimmed={face2?.state === `sending` && face2.unconfirmed !== undefined}
          right={face2 ? undefined : jsxs3(repliesSlice, false)}
          onReact={readOnly2 || face2 ? undefined : (citeOutcomeChip?: Dynamic, ..._extraArguments: unknown[]): Dynamic => onReact?.(repliesSlice.id, citeOutcomeChip)}
        />}{face2 && <CommentOutbox id={repliesSlice.id} face={face2} flush={true} />}</React.Fragment>;
      })}
                  {(text || rowShowing) && <CommentCard.Activity byline={!!text} label={text ? resolveCommentComposerTest(text) :
      // BaoCut: 称「the agent」，不称 Claude。
      `The agent is working on it…`} leading={text ? <UseCommentComposerDataClaudeActivityDotsComponent /> : <ClaudeTypingIndicator />} data-testid={text ? undefined : `claude-pending-row`} />}
                  {t5.pendingAsks && filterCommentComposerFilter(t5.pendingAsks, parse).length > 0 ? <PendingAsk asks={t5.pendingAsks} /> : null}
                  {matchesTuckReplies && jsx}
                </CommentCard.Replies>}
              {!matchesTuckReplies && jsx}
              {face && <CommentOutbox id={t5.id} face={face} flush={true} />}
            </SeeMorePill>}{<CommentCard.ReplyField data-comment-reply={``} onClick={(citeOutcomeChip?: Dynamic, ..._extraArguments: unknown[]): Dynamic => citeOutcomeChip.stopPropagation()} launcher={replyRoad === `sheet` ? {
    placeholder: placeholder,
    onOpen: (..._extraArguments: unknown[]): undefined => {
      returnFocus.current = cardRef.current?.querySelector(`[data-cds-part="reply-launcher"]`) ?? null;
      setEnabledState(true);
    }
  } : undefined}>
              {replyRoad === `sheet` ? null : <div className={`pointer-coarse:py-1 min-w-0 [&_.ProseMirror]:content-center`}>
                  {live ? <CommentReplyComposer
                    layout={`composer`}
                    composerChrome={`cds`}
                    foldWhenIdle={true}
                    placeholder={placeholder}
                    sendHeld={sendHeld}
                    ariaLabel={`Reply`}
                    enableCCSessions={enableCCSessions}
                    coworkerContainer={coworkerContainer}
                    refPid={refPid}
                    draftKey={keepReplyDraft ? t5.id : undefined}
                    draftPageId={keepReplyDraft ? t5.target.pageId : undefined}
                    claudeRoute={route}
                    onHolding={onHolding}
                    onPost={onPost}
                    onPosted={onPosted}
                    key={`composer`}
                  /> : <CommentReplyComposer
                    composerChrome={`flush`}
                    placeholder={placeholder}
                    sendHeld={sendHeld}
                    ariaLabel={`Reply`}
                    enableCCSessions={enableCCSessions}
                    coworkerContainer={coworkerContainer}
                    refPid={refPid}
                    draftKey={keepReplyDraft ? t5.id : undefined}
                    draftPageId={keepReplyDraft ? t5.target.pageId : undefined}
                    onPost={(citeOutcomeChip?: Dynamic, options?: Dynamic, context?: Dynamic, dependencies?: Dynamic, ..._extraArguments: unknown[]): Dynamic => onReply?.(t5.id, citeOutcomeChip, options, context, dependencies) ?? Promise.resolve()}
                    onPosted={onPosted}
                    key={`inline`}
                  />}
                </div>}
            </CommentCard.ReplyField>}</CommentCard>
      {jsx2}
    </TooltipGroup>
    ) : (
      <TooltipGroup delay={150}>
      <div ref={cardRef} data-testid={`ldoc-thread-card`} data-comment-stop={``} data-stop-id={t5.id} role={`article`} tabIndex={tabStop === false ? -1 : 0} aria-label={ariaLabel} aria-describedby={hintId} onKeyDown={onKeyDown} onClick={(..._extraArguments: unknown[]): undefined => {
  if (enabledRef2.current) {
    enabledRef2.current = false;
  } else {
    if (!expanded) {
      onExpand(t5.id);
    }
  }
}} data-active={active || undefined} data-expanded={expanded || undefined} data-nonresting={expanded || useCommentResolveMotion2.phase !== `idle` || undefined} {...useCommentResolveMotion2.cardProps} className={`rx-card ` + (flat ? `text-primary focus-visible:ring-fill-accent p-3 text-[13px] focus-visible:ring-1 focus-visible:outline-none focus-visible:ring-inset` : `${CommentComponents_Styles2} data-[expanded]:shadow-card-active focus-visible:ring-fill-accent transition-[box-shadow,translate] focus-visible:ring-1 focus-visible:outline-none data-[expanded]:-translate-x-2`)}>{<SeeMorePill tailKey={tailKey} expanded={expanded}>
              {jsxs2()}
              <CommentWhen
                container={refPid}
                r={t5.root}
                dimmed={face?.state === `sending` && face.unconfirmed !== undefined}
                expanded={expanded}
                compact={compact}
                right={jsxs(t5.root, true)}
                rightSeated={expanded && !readOnly2}
                editing={row === t5.root.id}
                editToClaude={resolveCommentAnchorsActor3(t5.root, t5.replies)}
                deleting={citeOutcomeChipState4 === t5.root.id}
                deleteAsk={deleteAsk}
                me={citeOutcomeChipResult7}
                onReact={readOnly2 ? undefined : (citeOutcomeChip?: Dynamic, ..._extraArguments: unknown[]): Dynamic => onReact?.(t5.root.id, citeOutcomeChip)}
                onSave={citeOutcomeChipHandler2(t5.root.id)}
                onDelete={citeOutcomeChipHandler3(t5.root.id)}
                onCancel={onCancel}
              />
              {t5.root.kind === `suggestion` && !t5.resolved && !readOnly2 && enabled && t5.root.proposedText !== undefined && <div className={`mt-2 flex gap-2`}>
                    <Button size={citeOutcomeChipResult(`xs`)} variant={`secondary`} onClick={(citeOutcomeChip?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        citeOutcomeChip.stopPropagation();
        onResolve?.(t5.id);
      }}>{`Reject`}</Button>
                  </div>}
              {matchesRepliesCount && <div className={resolveUiDesignSystemValue2(`mt-2 space-y-2`, tuckReplies && CommentComponents_PsMdMs25BorderS)}>
                  {matchesCount && <button type={`button`} data-testid={`show-replies`} className={CommentAnchors_TextMutedHoverTextSecondaryTextCaptionMt05BlockTextLeft} onClick={(..._extraArguments: unknown[]): Dynamic => {
        if (expanded) return setEnabledState2(true);
        enabledRef2.current = true;
        queueMicrotask((..._extraArguments: unknown[]) => enabledRef2.current = false);
        if (onExpand(t5.id) !== false) {
          setEnabledState2(true);
        }
      }}>
                      {`Show `}
                      {count}
                      {` `}
                      {count === 1 ? `reply` : `replies`}
                    </button>}
                  {t5.replies.slice(count).map((repliesSlice?: Dynamic, ..._extraArguments: unknown[]) => {
        let face2: Dynamic = Object.hasOwn(citeOutcomeChipResult2, repliesSlice.id) ? citeOutcomeChipResult2[repliesSlice.id] : undefined;
        return <React.Fragment key={repliesSlice.id}>{<CommentWhen
          container={refPid}
          r={repliesSlice}
          dimmed={face2?.state === `sending` && face2.unconfirmed !== undefined}
          expanded={expanded}
          compact={compact}
          right={face2 ? undefined : jsxs(repliesSlice, false)}
          editing={row === repliesSlice.id}
          editToClaude={resolveCommentAnchorsActor3(repliesSlice, t5.replies.slice(t5.replies.indexOf(repliesSlice) + 1))}
          deleting={citeOutcomeChipState4 === repliesSlice.id}
          deleteAsk={deleteAsk}
          me={citeOutcomeChipResult7}
          onReact={readOnly2 || face2 ? undefined : (citeOutcomeChip?: Dynamic, ..._extraArguments: unknown[]): Dynamic => onReact?.(repliesSlice.id, citeOutcomeChip)}
          onSave={citeOutcomeChipHandler2(repliesSlice.id)}
          onDelete={citeOutcomeChipHandler3(repliesSlice.id)}
          onCancel={onCancel}
        />}{face2 && <CommentOutbox id={repliesSlice.id} face={face2} />}</React.Fragment>;
      })}
                  {text && <UseCommentComposerTextComponent text={text} />}
                  {rowShowing && !text && <ClaudePendingRow />}
                  {t5.pendingAsks && filterCommentComposerFilter(t5.pendingAsks, parse).length > 0 ? <PendingAsk asks={t5.pendingAsks} /> : null}
                </div>}
              <UseCommentComponentsState3Component>
                <SummonNote note={note} onOpen={onOpen} handoff={handoff} />
              </UseCommentComponentsState3Component>
              {face && <CommentOutbox id={t5.id} face={face} />}
            </SeeMorePill>}{expanded && !readOnly2 && <div
              className={row || citeOutcomeChipState4 ? `hidden` : CommentComponents_Mx3Mt3Mb3Px3Pb3}
              data-comment-reply={``}
              onMouseDown={resolveCommentComponentsTarget3}
              onClick={resolveCommentComponentsTarget4}
            >
                <div
                  className={CommentComponentsState}
                  data-comment-reply-field={``}
                  onMouseDown={resolveCommentComponentsTarget3}
                  onClick={resolveCommentComponentsTarget4}
                >
                  {live ? <CommentReplyComposer
                    layout={`composer`}
                    composerChrome={`flush`}
                    foldWhenIdle={true}
                    placeholder={placeholder}
                    sendHeld={sendHeld}
                    ariaLabel={`Reply`}
                    enableCCSessions={enableCCSessions}
                    coworkerContainer={coworkerContainer}
                    refPid={refPid}
                    draftKey={keepReplyDraft ? t5.id : undefined}
                    draftPageId={keepReplyDraft ? t5.target.pageId : undefined}
                    claudeRoute={route}
                    onHolding={onHolding}
                    onPost={onPost}
                    onPosted={onPosted}
                    key={`composer`}
                  /> : <CommentReplyComposer
                    composerChrome={`flush`}
                    placeholder={placeholder}
                    sendHeld={sendHeld}
                    ariaLabel={`Reply`}
                    enableCCSessions={enableCCSessions}
                    coworkerContainer={coworkerContainer}
                    refPid={refPid}
                    draftKey={keepReplyDraft ? t5.id : undefined}
                    draftPageId={keepReplyDraft ? t5.target.pageId : undefined}
                    onPost={(citeOutcomeChip?: Dynamic, options?: Dynamic, context?: Dynamic, dependencies?: Dynamic, ..._extraArguments: unknown[]): Dynamic => onReply?.(t5.id, citeOutcomeChip, options, context, dependencies) ?? Promise.resolve()}
                    onPosted={onPosted}
                    key={`inline`}
                  />}
                </div>
              </div>}</div>
    </TooltipGroup>
    );
  }));
}

export { CiteOutcomeChip };
