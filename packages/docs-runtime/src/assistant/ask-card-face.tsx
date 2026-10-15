/** claude-ask-card-face: restored from ClaudeAskCardFace-DS3zK7tX.js. */
import { originalJsxProps } from "../react-runtime/jsx-runtime";
import type { Dynamic } from "../interop/legacy-dynamic";
import { r as toModuleNamespace } from "../boot/module-runtime";
import {
  HM as loadReact,
  UE as loadJsxRuntime,
  hC as Button,
  pl as resolvePlatformSyncAndRoutingCompact,
} from "../platform/index";
import {
  C as CommentReplyComposer,
  M as INLINE_ASK_TOAST_ID,
  S as COMMENT_PROSE_CLASS,
  b as InlineAskNotice,
  w as ClaudeTypingIndicator,
  x as INLINE_ASK_COMPOSER_LAYOUT,
} from "../document-app/index";
import {
  ASK_WHY_CHIPS,
  ASK_WHY_CHIP_KEYS,
  ASK_WHY_LIVE_CHIPS,
  ASK_WHY_QUESTION,
  ASK_WHY_THANKS,
  askWhyChipArrow,
  askWhyGroupStep,
} from "./ask-why";
import "./ask-card";
var React: Dynamic = toModuleNamespace(loadReact(), 1);
var jsxRuntime: Dynamic = loadJsxRuntime();
var ASK_CARD_PLACEHOLDER: string = `Tell Claude what to write or edit`;
var ASK_CARD_PLACEHOLDER_BLANK: string = `Tell Claude what to write here`;
var placeholderByInvitation: Dynamic = {
  write: ASK_CARD_PLACEHOLDER,
  comment: ASK_CARD_PLACEHOLDER,
  blank: ASK_CARD_PLACEHOLDER_BLANK,
};
var ASK_CARD_FIELD_LABEL: string = `Ask the agent to write or edit here`;
var ASK_CARD_GROUP_LABEL: Dynamic = {
  write: `Ask the agent to write`,
  comment: `Ask Agent`,
  blank: `Ask the agent to write`,
};
var CARD_FOCUSABLE_SELECTOR: string = `[contenteditable="true"], [role="textbox"][tabindex="0"], button:not(:disabled):not([aria-busy="true"]):not([tabindex="-1"])`;
var CARD_READONLY_SELECTOR: string = `[role="textbox"][aria-readonly="true"]`;
var CARD_RADIUS_CLASS: string = `rounded-[10px]`;
var CARD_SURFACE_CLASS: string = `bg-surface-1 shadow-card relative ${CARD_RADIUS_CLASS} p-3`;
var ASK_WHY_LOOK: Dynamic = {
  stack: `flex flex-col gap-sm`,
  question: `text-secondary text-footnote`,
  chips: `flex flex-wrap items-center gap-sm`,
  chipSize: `xs`,
  chipVariant: `secondary`,
  groupRing: `${CARD_RADIUS_CLASS} focus:ring-1 focus:ring-fill-accent focus:outline-hidden`,
};
function reportWhyChipKey(
  event?: Dynamic,
  reportKey?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  if (!reportKey || (event.isDefaultPrevented() && !event.repeat)) return false;
  let chips: Dynamic = [
    ...event.currentTarget.querySelectorAll(ASK_WHY_LIVE_CHIPS),
  ];
  let chipIndex: Dynamic = chips.indexOf(event.target);
  return (chipIndex === -1 &&
    (event.target !== event.currentTarget || chips.length === 0)) ||
    !reportKey({
      type: `key`,
      key: event.key,
      code: event.code,
      shift: event.shiftKey,
      alt: event.altKey,
      chord: event.ctrlKey || event.metaKey,
      composing: event.nativeEvent.isComposing,
      repeat: event.repeat,
      stamp: event.nativeEvent.timeStamp,
      at: chipIndex,
      count: chips.length,
    })
    ? false
    : (event.preventDefault(), true);
}
function handleWhyChipArrow(
  event?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (
    !Object.hasOwn(ASK_WHY_CHIP_KEYS, event.key) ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey ||
    event.isDefaultPrevented() ||
    event.nativeEvent.isComposing
  )
    return;
  let chips: Dynamic = [
    ...event.currentTarget.querySelectorAll(ASK_WHY_LIVE_CHIPS),
  ];
  let chipIndex: Dynamic = chips.indexOf(event.target);
  if (chipIndex === -1) return;
  event.preventDefault();
  let nextChip: Dynamic = askWhyChipArrow(event.key, chipIndex, chips.length);
  if (nextChip === `group`) return void event.currentTarget.focus();
  chips[nextChip === null ? chipIndex : nextChip]?.focus();
}
function handleWhyGroupEntry(
  event?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (
    event.target !== event.currentTarget ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    event.isDefaultPrevented() ||
    event.nativeEvent.isComposing
  )
    return;
  let entryPosition: Dynamic = askWhyGroupStep(event.key, event.shiftKey);
  let chips: Dynamic = [
    ...event.currentTarget.querySelectorAll(ASK_WHY_LIVE_CHIPS),
  ];
  if (!(entryPosition === null || chips.length === 0)) {
    event.preventDefault();
    chips[entryPosition === `first` ? 0 : chips.length - 1].focus();
  }
}
var pressIsOnCardBlank: Dynamic = (
  target?: Dynamic,
  ..._extraArguments: unknown[]
): boolean =>
  target instanceof (Element as Dynamic) &&
  target.closest(
    `[contenteditable], button, a, input, textarea, select, [role="button"], [role="option"]`,
  ) === null;
function ClaudeAskCardFace(
  {
    nonce: nonce,
    rect: rect,
    notice: notice,
    busy: busy,
    leaving: leaving,
    draftKey: draftKey,
    cardKey: cardKey,
    invites = `write`,
    onPost: onPost,
    onCancel: onCancel,
    onTabOut: onTabOut,
    onTouched: onTouched,
    onHeight: onHeight,
    why = null,
  }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let fieldId: Dynamic = (0, React.useId)();
  let thanks: boolean = why?.thanks === true;
  let askingWhy: boolean = why !== null && !thanks && why.picked === null;
  let containerRef: Dynamic = (0, React.useRef)(null);
  let lastHeightRef: Dynamic = (0, React.useRef)(0);
  (0, React.useLayoutEffect)((..._extraArguments: unknown[]): undefined => {
    if (why !== null && !thanks && containerRef.current) {
      lastHeightRef.current = containerRef.current.offsetHeight;
    }
  });
  let mode: Dynamic = resolvePlatformSyncAndRoutingCompact();
  let showPrompt: boolean = why === null;
  let heightObserverRef: Dynamic = (0, React.useRef)(null);
  let onHeightRef: Dynamic = (0, React.useRef)(onHeight);
  onHeightRef.current = onHeight;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let heightObserver: Dynamic = heightObserverRef.current;
      if (!heightObserver) return;
      let claudeAskCardFaceHandler: Dynamic = (
        ..._extraArguments: unknown[]
      ): Dynamic => onHeightRef.current(heightObserver.offsetHeight);
      claudeAskCardFaceHandler();
      let resizeObserver: Dynamic = new (ResizeObserver as Dynamic)(
        claudeAskCardFaceHandler,
      );
      resizeObserver.observe(heightObserver);
      return (..._extraArguments: unknown[]): Dynamic =>
        resizeObserver.disconnect();
    },
    [nonce],
  );
  let [draftReady, setDraftReady]: Dynamic = (0, React.useState)(
    draftKey !== undefined,
  );
  let draftReadyRef: Dynamic = (0, React.useRef)(draftReady);
  draftReadyRef.current = draftReady;
  let [draftEditor, setDraftEditor]: Dynamic = (0, React.useState)(null);
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let heightObserver: Dynamic = heightObserverRef.current;
      let matchedElement: Dynamic =
        heightObserver?.querySelector(`.chat-mention`);
      if (!heightObserver || !matchedElement) return;
      let claudeAskCardFaceHandler = (
        ..._extraArguments: unknown[]
      ): undefined => {
        let heightObserverBounds: Dynamic =
          heightObserver.getBoundingClientRect();
        let matchedElementBounds: Dynamic =
          matchedElement.getBoundingClientRect();
        if (matchedElementBounds.width > 0) {
          setDraftEditor({
            left:
              Math.round(
                matchedElementBounds.right - heightObserverBounds.left,
              ) + 5,
            top: Math.round(
              matchedElementBounds.top - heightObserverBounds.top,
            ),
          });
        }
      };
      claudeAskCardFaceHandler();
      let resizeObserver: Dynamic = new (ResizeObserver as Dynamic)(
        claudeAskCardFaceHandler,
      );
      resizeObserver.observe(heightObserver);
      return (..._extraArguments: unknown[]): Dynamic =>
        resizeObserver.disconnect();
    },
    [nonce, notice, showPrompt],
  );
  let [hasWords, setHasWords]: Dynamic = (0, React.useState)(false);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let requestAnimationFrame2: number = requestAnimationFrame(
        (..._extraArguments: unknown[]): Dynamic => setHasWords(true),
      );
      return (..._extraArguments: unknown[]): void =>
        cancelAnimationFrame(requestAnimationFrame2);
    },
    [nonce],
  );
  return (
    <div
      {...originalJsxProps({
        className: `absolute ${leaving ? `pointer-events-none` : `pointer-events-auto`}${askingWhy ? ` ${ASK_WHY_LOOK.groupRing}` : ``}`,
        style: {
          top: rect.top,
          left: rect.left,
          width: rect.width,
        },
        role: `group`,
        ...(why
          ? {
              "aria-labelledby": fieldId,
            }
          : {
              "aria-label": ASK_CARD_GROUP_LABEL[invites],
            }),
        tabIndex: askingWhy ? -1 : undefined,
        "aria-busy": busy || undefined,
        "data-testid": `inline-ask-composer`,
        "data-inline-ask": nonce,
        "data-face": why ? `why` : `write`,
        onPointerDownCapture: (
          event?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => event.nativeEvent.isTrusted && onTouched?.(),
        onKeyDownCapture: (
          event?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => event.nativeEvent.isTrusted && onTouched?.(),
        onKeyDown: (
          event?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (
            (why && reportWhyChipKey(event, why.onChip)) ||
            (why && handleWhyChipArrow(event),
            askingWhy && handleWhyGroupEntry(event),
            event.key !== `Tab` ||
              !onTabOut ||
              event.altKey ||
              event.ctrlKey ||
              event.metaKey ||
              event.isDefaultPrevented() ||
              event.nativeEvent.isComposing)
          )
            return;
          if (
            event.currentTarget.querySelector(CARD_READONLY_SELECTOR) !== null
          )
            return void event.preventDefault();
          let items: Dynamic = [
            ...event.currentTarget.querySelectorAll(CARD_FOCUSABLE_SELECTOR),
          ];
          let itemIndex: Dynamic = items.indexOf(
            event.currentTarget.ownerDocument.activeElement,
          );
          if (
            !(
              itemIndex !== -1 &&
              itemIndex !== (event.shiftKey ? 0 : items.length - 1)
            )
          ) {
            event.preventDefault();
            onTabOut();
          }
        },
        children: (
          <div
            ref={heightObserverRef}
            className={`${CARD_SURFACE_CLASS} transition-opacity ease-out motion-reduce:transition-none forced-colors:outline ${hasWords && !leaving ? `opacity-100` : `opacity-0`}`}
            style={{
              transitionDuration: `${leaving ? 300 : 150}ms`,
              "--field-max-h": `${INLINE_ASK_COMPOSER_LAYOUT.fieldMaxHeight}px`,
            }}
            data-busy={busy ? `` : undefined}
            role={`presentation`}
            onMouseDown={(
              event?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              if (why) return void event.preventDefault();
              if (
                !(
                  !event.nativeEvent.isTrusted ||
                  event.button !== 0 ||
                  !pressIsOnCardBlank(event.target)
                )
              ) {
                event.preventDefault();
                heightObserverRef.current
                  ?.querySelector(`[contenteditable="true"]`)
                  ?.focus();
              }
            }}
          >
            {why ? (
              <div
                ref={containerRef}
                className={ASK_WHY_LOOK.stack}
                style={
                  thanks && lastHeightRef.current > 0
                    ? {
                        minHeight: lastHeightRef.current,
                      }
                    : undefined
                }
                data-testid={`ask-why`}
                data-thanks={thanks ? `` : undefined}
              >
                <div id={fieldId} className={ASK_WHY_LOOK.question}>
                  {thanks ? ASK_WHY_THANKS : ASK_WHY_QUESTION}
                </div>
                {thanks ? null : (
                  <div className={ASK_WHY_LOOK.chips}>
                    {ASK_WHY_CHIPS.map(
                      (
                        item?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): Dynamic => (
                        <Button
                          {...originalJsxProps(
                            {
                              size: mode(ASK_WHY_LOOK.chipSize),
                              variant: ASK_WHY_LOOK.chipVariant,
                              pressed:
                                why.picked === item.word ? true : undefined,
                              disabled:
                                why.picked !== null && why.picked !== item.word,
                              onClick: (
                                event?: Dynamic,
                                ..._extraArguments: unknown[]
                              ): undefined =>
                                void (
                                  why.onChip?.({
                                    type: `press`,
                                    pointer: event.detail > 0,
                                    stamp: event.nativeEvent.timeStamp,
                                  }) === true || why.onPick(item.word)
                                ),
                              children: item.label,
                            },
                            item.word,
                          )}
                        />
                      ),
                    )}
                  </div>
                )}
              </div>
            ) : null}
            {!why && notice ? <InlineAskNotice notice={notice} /> : null}
            {why ? null : (
              <CommentReplyComposer
                {...originalJsxProps(
                  {
                    layout: `composer`,
                    composerChrome: `card`,
                    claudeRoute: `always`,
                    placeholder: placeholderByInvitation[invites],
                    ariaLabel: ASK_CARD_FIELD_LABEL,
                    autoFocus: draftKey === undefined,
                    addressClaude: true,
                    boxId: INLINE_ASK_TOAST_ID,
                    lockWhileBusy: true,
                    holdWhileBusy: true,
                    heldFromOutside: busy,
                    draftKey: draftKey,
                    onHolding: (
                      claudeAskCardFace?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic => setDraftReady(claudeAskCardFace),
                    onPost: (
                      claudeAskCardFace?: Dynamic,
                      options?: Dynamic,
                      context?: Dynamic,
                      dependencies?: unknown,
                      argument?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic =>
                      onPost(claudeAskCardFace, options, context, argument),
                    onCancel: (..._extraArguments: unknown[]): Dynamic =>
                      onCancel(draftReadyRef.current),
                  },
                  cardKey ?? nonce,
                )}
              />
            )}
            {!why && !draftReady && !busy && draftEditor ? (
              <span
                aria-hidden={`true`}
                className={`text-muted ${COMMENT_PROSE_CLASS} pointer-events-none absolute right-14 left-3 line-clamp-2 select-none`}
                style={{
                  top: draftEditor.top,
                  textIndent: draftEditor.left - 12,
                }}
                data-testid={`ask-card-placeholder`}
              >
                {placeholderByInvitation[invites]}
              </span>
            ) : null}
            {!why && busy ? (
              <span
                role={`status`}
                aria-label={`Claude is working on it`}
                className={`bg-surface-1 absolute right-3 bottom-3 grid size-6 place-items-center`}
                data-testid={`ask-card-writing-mark`}
              >
                <ClaudeTypingIndicator />
              </span>
            ) : null}
          </div>
        ),
      })}
    />
  );
}
export {
  ASK_CARD_FIELD_LABEL,
  ASK_CARD_GROUP_LABEL,
  ASK_CARD_PLACEHOLDER,
  ASK_CARD_PLACEHOLDER_BLANK,
  ASK_WHY_LOOK,
  ClaudeAskCardFace,
  pressIsOnCardBlank,
};
