/** BaoCut: comment components from index-CX4IZqzA.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  Button,
  Checkbox,
  Composer,
  DataModelSchemasClaude,
  DataModelSchemasMessage2,
  DataModelSchemasSendToClaude,
  PlatformAnnouncementsMessage,
  PlatformAnnouncementsMessage3,
  Tooltip,
  UNCONFIRMED_WORDS_AFTER_MS,
  quoteWords,
  resolveDataModelSchemasChecked,
  resolvePlatformAnnouncementsValue,
  resolvePlatformSyncAndRoutingCompact,
  resolveUiDesignSystemValue2,
  useCommentStore,
} from "../dependencies";
import {
  React,
} from "../bootstrap";
import {
  BottomSheet,
  PhoneConfirmationDialog,
} from "../phone-overlays/export-progress-dialog";
import {
  CommentAnchors_ReplyPosted,
} from "../comment-anchors/create-comment-mention-search";
import {
  resolveCommentComponentsPreventDefault,
} from "./comment-editor";
import {
  CommentReplyComposer,
  commentComponentsLimit140,
  commentComponentsLimit60,
  commentComponentsSet,
  resolveCommentComponentsTest,
  resolveCommentComponentsTrim2,
} from "./comment-reply-composer";

function resolveCommentComponentsCount2(
  commentComponentsCount2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let items = [
    `${commentComponentsCount2.count === 1 ? `1 comment` : `${commentComponentsCount2.count} comments`} on ${resolveCommentComponentsTrim2(commentComponentsCount2.name, commentComponentsLimit60)}.`,
  ];
  if (commentComponentsCount2.latest) {
    items.push(
      resolveCommentComponentsTest(
        `Latest: ${commentComponentsCount2.latest.author}${commentComponentsCount2.latest.when ? `, ${commentComponentsCount2.latest.when}` : ``}`,
      ),
    );
    let commentComponentsTrim2: Dynamic = resolveCommentComponentsTrim2(
      commentComponentsCount2.latest.body,
      commentComponentsLimit140,
    );
    if (commentComponentsTrim2 !== ``) {
      items.push(resolveCommentComponentsTest(commentComponentsTrim2));
    }
  }
  return items.join(` `);
}

function resolveCommentComponentsValue2(
  commentComponentsValue2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return `${commentComponentsValue2} reactions: ${options}`;
}

function filterCommentComponentsJoin(
  filterCommentComponentsJoin2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let items = [
    `Reactions: ${
      Object.entries(filterCommentComponentsJoin2.reactions)
        .filter(
          ([, items2]: Dynamic, ..._extraArguments: unknown[]) =>
            items2.length > 0,
        )
        .map(
          (
            [filteredReactionsEntry, items2]: Dynamic,
            ..._extraArguments: unknown[]
          ) => `${filteredReactionsEntry} ${items2.length}`,
        )
        .join(`, `) || `none`
    }.`,
  ];
  let commentComponentsTrim2: Dynamic = filterCommentComponentsJoin2.quote
    ? resolveCommentComponentsTrim2(
        quoteWords(filterCommentComponentsJoin2.quote),
        commentComponentsLimit60,
      )
    : ``;
  if (commentComponentsTrim2 !== ``) {
    items.push(`On “${commentComponentsTrim2}”.`);
  }
  if (filterCommentComponentsJoin2.resolved) {
    items.push(`Resolved.`);
  }
  return items.join(` `);
}

function resolveCommentComponentsTarget5(
  event?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (
    event.target === event.currentTarget &&
    !(
      event.nativeEvent.isComposing ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey
    )
  ) {
    if (event.key === `Enter` || event.key === ` `) {
      event.preventDefault();
      if (!event.repeat) {
        options(event.key);
      }
      return;
    }
    if (!event.shiftKey && commentComponentsSet.has(event.key)) {
      context?.(event);
    }
  }
}

function useCommentComponentsWrapper(
  commentComponentsWrapper?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let commentComponentsWrapper2: Dynamic =
    commentComponentsWrapper &&
    resolveDataModelSchemasChecked(commentComponentsWrapper, options);
  let enabledRef: Dynamic = (0, React.useRef)(false);
  let enabledRef2: Dynamic = (0, React.useRef)(false);
  return {
    wrapper: {
      onClickCapture: (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (event.nativeEvent.isReplay === true) {
          enabledRef.current = true;
          queueMicrotask(
            (..._extraArguments: unknown[]): undefined =>
              void (enabledRef.current = false),
          );
        }
      },
      onPointerDown: (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        enabledRef2.current =
          event.target.closest(`[role="checkbox"]`) !== null;
      },
      onPointerCancel: (..._extraArguments: unknown[]): undefined => {
        enabledRef2.current = false;
      },
      onKeyDown: (..._extraArguments: unknown[]): undefined => {
        enabledRef2.current = false;
      },
    },
    sendToClaude:
      commentComponentsWrapper && commentComponentsWrapper2
        ? {
            checked: commentComponentsWrapper2.checked,
            onCheckedChange: (
              commentComponentsWrapper3?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              let enabled: Dynamic = enabledRef2.current;
              enabledRef2.current = false;
              if (
                !(
                  enabledRef.current ||
                  context ||
                  commentComponentsWrapper2.disabled
                )
              ) {
                commentComponentsWrapper.onChange(commentComponentsWrapper3);
                if (enabled) {
                  dependencies();
                }
              }
            },
            disabledReason: commentComponentsWrapper2.locked
              ? DataModelSchemasMessage2
              : undefined,
          }
        : undefined,
  };
}

function CommentComposerCds(
  {
    editor: editor,
    text: text,
    canSubmit: canSubmit,
    busy: busy,
    route: route,
    named: named,
    form: form,
    plainEnterPosts: plainEnterPosts,
    onSend: onSend,
    onPointerToggle: onPointerToggle,
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let {
    wrapper: useCommentComponentsWrapper2,
    sendToClaude: sendToClaude,
  }: Dynamic = useCommentComponentsWrapper(route, named, busy, onPointerToggle);
  return (
    <span className={`contents`} {...useCommentComponentsWrapper2}>{<Composer
      editor={editor}
      value={text}
      canSubmit={canSubmit}
      busy={busy}
      onSubmit={onSend}
      submitOnPlainEnter={plainEnterPosts}
      sendToClaude={sendToClaude}
      form={form}
      data-testid={`comment-composer-cds`}
    />}</span>
  );
}

function CommentClaudeToggle(
  {
    route: route,
    named: named,
    busy = false,
    className: className,
    boxClassName: boxClassName,
    onPointerToggle: onPointerToggle,
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let commentClaudeToggleResult: Dynamic =
    resolvePlatformSyncAndRoutingCompact();
  let commentClaudeToggleResult2: Dynamic = resolveDataModelSchemasChecked(
    route,
    named,
  );
  let enabledRef: Dynamic = (0, React.useRef)(false);
  let enabledRef2: Dynamic = (0, React.useRef)(false);
  let controlId: Dynamic = (0, React.useId)();
  let jsx = (
    <Checkbox size={commentClaudeToggleResult(`xs`)} className={resolveUiDesignSystemValue2(boxClassName, commentClaudeToggleResult2.locked && `opacity-disabled`)} label={<span className={`text-secondary text-caption`}>
            {DataModelSchemasSendToClaude}
          </span>} checked={commentClaudeToggleResult2.checked} disabled={busy || commentClaudeToggleResult2.disabled && !commentClaudeToggleResult2.locked} {...commentClaudeToggleResult2.locked ? {
  readOnly: true
} : {}} aria-describedby={commentClaudeToggleResult2.locked ? controlId : undefined} onCheckedChange={(commentClaude?: Dynamic, ..._extraArguments: unknown[]): undefined => {
  let enabled: Dynamic = enabledRef.current;
  enabledRef.current = false;
  if (!enabledRef2.current) {
    if (!commentClaudeToggleResult2.locked) {
      route.onChange(commentClaude === true);
      if (enabled) {
        onPointerToggle?.();
      }
    }
  }
}} />
  );
  return (
    <span
      data-testid={`comment-claude-toggle`}
      data-locked={commentClaudeToggleResult2.locked ? `` : undefined}
      className={resolveUiDesignSystemValue2(`flex items-center`, className)}
      onClickCapture={(
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (event.nativeEvent.isReplay === true) {
          enabledRef2.current = true;
          queueMicrotask(
            (..._extraArguments: unknown[]): undefined =>
              void (enabledRef2.current = false),
          );
        }
      }}
      onPointerDown={(..._extraArguments: unknown[]): undefined => {
        enabledRef.current = true;
      }}
      onPointerCancel={(..._extraArguments: unknown[]): undefined => {
        enabledRef.current = false;
      }}
      onKeyDown={(..._extraArguments: unknown[]): undefined => {
        enabledRef.current = false;
      }}
    >
      <Tooltip
        content={
          commentClaudeToggleResult2.locked
            ? DataModelSchemasMessage2
            : undefined
        }
        side={`bottom`}
        align={`start`}
      >
        {jsx}
      </Tooltip>
      {commentClaudeToggleResult2.locked && (
        <span
          id={controlId}
          hidden={true}
        >{`Your comment mentions @Agent. Remove the mention to uncheck.`}</span>
      )}
    </span>
  );
}

function UseCommentComponentsRouteComponent(
  { route: route, named = DataModelSchemasClaude, disabled = false }: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    <span
      role={`presentation`}
      className={`pr-1`}
      onMouseDown={resolveCommentComponentsPreventDefault}
      onPointerDown={resolveCommentComponentsPreventDefault}
    >
      <CommentClaudeToggle
        route={route}
        named={named}
        busy={disabled}
        boxClassName={`py-3`}
      />
    </span>
  );
}

function CommentReplySheet(
  {
    placeholder: placeholder,
    boxId: boxId,
    draftKey: draftKey,
    draftPageId: draftPageId,
    route: route,
    onHolding: onHolding,
    enableCCSessions: enableCCSessions,
    coworkerContainer: coworkerContainer,
    refPid: refPid,
    returnFocus: returnFocus,
    onPost: onPost,
    onClose: onClose,
    onDiscard: onDiscard,
    sendHeld: sendHeld,
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let elementRef: Dynamic = (0, React.useRef)(null);
  let [open, setOpen]: Dynamic = (0, React.useState)(false);
  let [disabled, setDisabled]: Dynamic = (0, React.useState)(false);
  let enabledRef: Dynamic = (0, React.useRef)(false);
  let [named, onDraftNames]: Dynamic = (0, React.useState)(
    DataModelSchemasClaude,
  );
  let enabledRef2: Dynamic = (0, React.useRef)(false);
  let [boxId2]: Dynamic = (0, React.useState)(boxId);
  let getState: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
    useCommentStore.getState().dirtyEditors.has(boxId2);
  return (
    <BottomSheet
      shouldClose={(..._extraArguments: unknown[]) =>
        enabledRef.current ? false : getState() ? (setOpen(true), false) : true
      }
      onClose={onClose}
      title={`Reply`}
      trailing={
        route ? (
          <UseCommentComponentsRouteComponent
            route={route}
            named={named}
            disabled={disabled}
          />
        ) : undefined
      }
      initialFocus={(..._extraArguments: unknown[]): Dynamic =>
        elementRef.current?.querySelector(`[contenteditable="true"]`) ?? true
      }
      finalFocus={(
        commentReplySheet?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        enabledRef2.current || commentReplySheet !== `keyboard`
          ? false
          : (returnFocus?.current ?? true)
      }
      data-testid={`comment-reply-sheet`}
      data-mode={`reply`}
      bodyClassName={`px-4 pb-1`}
    >
      <div ref={elementRef}>
        <CommentReplyComposer
          layout={`composer`}
          composerChrome={`cds`}
          checkboxSeat={`header`}
          composerForm={`reply`}
          placeholder={placeholder}
          ariaLabel={`Reply`}
          claudeRoute={route}
          onHolding={onHolding}
          onDraftNames={onDraftNames}
          enableCCSessions={enableCCSessions}
          coworkerContainer={coworkerContainer}
          refPid={refPid}
          boxId={boxId2}
          draftKey={draftKey}
          draftPageId={draftPageId}
          sendHeld={sendHeld}
          autoFocus={true}
          holdWhileBusy={true}
          lockWhileBusy={true}
          onPost={async (
            commentReplySheet?: Dynamic,
            options?: Dynamic,
            context?: Dynamic,
            dependencies?: Dynamic,
            argument?: Dynamic,
            ..._extraArguments: unknown[]
          ): Promise<Dynamic> => {
            enabledRef.current = true;
            setDisabled(true);
            try {
              return await onPost(
                commentReplySheet,
                options,
                context,
                dependencies,
                argument,
              );
            } finally {
              enabledRef.current = false;
              setDisabled(false);
            }
          }}
          onPosted={(
            { queued: queued }: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            enabledRef2.current = true;
            if (!queued) {
              resolvePlatformAnnouncementsValue(
                document,
                CommentAnchors_ReplyPosted,
                {
                  key: `comment-post`,
                },
              );
            }
            onClose();
          }}
          onCancel={onClose}
        />
      </div>
      <PhoneConfirmationDialog
        open={open}
        onOpenChange={(
          commentReplySheet?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => !commentReplySheet && setOpen(false)}
        title={`Discard reply?`}
        description={`Your unsent reply will be lost.`}
        confirmLabel={`Discard`}
        confirmVariant={`danger`}
        initialFocus={`cancel`}
        closeOnConfirm={true}
        onConfirm={onDiscard}
      />
    </BottomSheet>
  );
}

var CommentComponentsQueued: Dynamic;

var CommentComponentsNow: Dynamic;

function useCommentComponentsState2(
  commentComponentsState2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let total: Dynamic =
    commentComponentsState2.state === `sending` &&
    commentComponentsState2.since !== undefined
      ? commentComponentsState2.since + UNCONFIRMED_WORDS_AFTER_MS
      : null;
  let [, setCountState]: Dynamic = (0, React.useState)(0);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (total === null) return;
      let difference: number = total - CommentComponentsNow.now();
      if (difference <= 0) return;
      let set: Dynamic = CommentComponentsNow.set(
        (..._extraArguments: unknown[]): Dynamic =>
          setCountState(
            (
              commentComponentsState22?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => commentComponentsState22 + 1,
          ),
        difference,
      );
      return (..._extraArguments: unknown[]): Dynamic =>
        CommentComponentsNow.clear(set);
    },
    [total],
  );
  return total !== null && CommentComponentsNow.now() < total;
}

var commentComponentsLimit600: number;

var CommentComponentsState3: {
    state: string;
};

function CommentOutbox(
  { id: id2, face: face, flush = false }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let commentOutboxResult: Dynamic = resolvePlatformSyncAndRoutingCompact();
  let [enabledState, setEnabledState]: Dynamic = (0, React.useState)(false);
  let elementRef: Dynamic = (0, React.useRef)(null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): undefined =>
        void (elementRef.current !== null && clearTimeout(elementRef.current)),
    [],
  );
  let allSettled = (..._extraArguments: unknown[]): undefined => {
    setEnabledState(true);
    let promise: Dynamic = new (Promise as Dynamic)(
      (resolve?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        (elementRef.current = setTimeout(resolve, commentComponentsLimit600)),
    );
    Promise.allSettled([
      useCommentStore.getState().retryOutbox(id2),
      promise,
    ]).then((..._extraArguments: unknown[]): Dynamic => setEnabledState(false));
  };
  let enabledState2: Dynamic =
    enabledState && (face.state === `failed` || face.state === `queued`);
  let CommentComponentsState32: Dynamic = enabledState2
    ? CommentComponentsState3
    : face;
  let copy: Dynamic =
    CommentComponentsState32.state === `refused`
      ? CommentComponentsState32.copy
      : CommentComponentsQueued[CommentComponentsState32.state];
  let matchesState: boolean =
    face.state === `sending` && face.unconfirmed !== undefined;
  let disabled: boolean =
    CommentComponentsState32.state === `sending` && !matchesState;
  return useCommentComponentsState2(CommentComponentsState32) ? (
    <span
      hidden={true}
      data-testid={`comment-outbox`}
      data-state={CommentComponentsState32.state}
      data-wordless={``}
    />
  ) : (
    <div
      className={resolveUiDesignSystemValue2(
        `gap-xs flex flex-col`,
        !flush && `mt-2`,
      )}
      data-testid={`comment-outbox`}
      data-state={CommentComponentsState32.state}
    >
      <div
        className={resolveUiDesignSystemValue2(
          `text-caption`,
          CommentComponentsState32.state === `refused` ||
            CommentComponentsState32.state === `failed`
            ? `text-danger`
            : `text-secondary`,
        )}
        role={`status`}
      >
        {copy}
      </div>
      {(face.state === `failed` ||
        face.state === `refused` ||
        face.state === `queued` ||
        matchesState) && (
        <div
          className={resolveUiDesignSystemValue2(
            `gap-sm flex`,
            enabledState2 && `invisible`,
          )}
        >
          {face.state !== `refused` && (
            <Button
              size={commentOutboxResult(`xs`)}
              variant={`secondary`}
              disabled={disabled}
              data-testid={`comment-outbox-retry`}
              onClick={(
                commentOutbox?: Dynamic,
                ..._extraArguments: unknown[]
              ): undefined => {
                commentOutbox.stopPropagation();
                allSettled();
              }}
            >{`Try again`}</Button>
          )}
          <Button
            size={commentOutboxResult(`xs`)}
            variant={`ghost`}
            disabled={disabled}
            data-testid={`comment-outbox-discard`}
            onClick={(
              commentOutbox?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              commentOutbox.stopPropagation();
              useCommentStore.getState().discardOutbox(id2);
            }}
          >{`Discard`}</Button>
        </div>
      )}
    </div>
  );
}

var CommentComponentsState4: Dynamic;

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeCommentComponentsCommentReplySheetStep1(): void {
  (CommentComponentsQueued = {
    queued: `Will post when you're back online.`,
    sending: PlatformAnnouncementsMessage,
    failed: PlatformAnnouncementsMessage3,
  });
  (CommentComponentsNow = {
    now: (..._extraArguments: unknown[]) => Date.now(),
    set: (
      commentComponentsNow?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) => setTimeout(commentComponentsNow, options),
    clear: (commentComponentsNow?: Dynamic, ..._extraArguments: unknown[]) =>
      clearTimeout(commentComponentsNow),
  });
  (commentComponentsLimit600 = 600);
  (CommentComponentsState3 = {
    state: `sending`,
  });
  (CommentComponentsState4 = {});
}

export {
  CommentClaudeToggle,
  CommentComponentsState4,
  CommentComposerCds,
  CommentOutbox,
  CommentReplySheet,
  UseCommentComponentsRouteComponent,
  filterCommentComponentsJoin,
  resolveCommentComponentsCount2,
  resolveCommentComponentsTarget5,
  resolveCommentComponentsValue2,
  useCommentComponentsWrapper,
};
