import { jsxs as renderReactJsxs } from "react/jsx-runtime";
/** BaoCut: comment content from cds-CIGM-LUe.js. */
import type { JSX } from "react";

import type { Dynamic } from "../../interop/legacy-dynamic";

import {
  Button,
  OverflowTooltip,
  React,
  Tooltip,
  UiDesignSystemUseLayoutEffect,
  jsxRuntime,
  resolveUiDesignSystemValue2,
  resolveUiLinksAndFoundationUseContext3,
  resolveUiOverlaysAndIconsValue4,
  resolveUiTooltipsAndControlsValue5,
} from "../dependencies";
import { Avatar } from "../avatars";
import {
  FieldStylesCreateContext,
  FieldStylesState2,
  useCommentCardContext,
} from "../field-foundation";
import {
  CommentMotionCreateContext,
  CommentMotionCreateContext2,
  CommentMotionCreateContext3,
  CommentMotionCreateContext4,
  CommentMotionCreateContext5,
  CommentMotionFloat,
  commentMotionValue2000,
  createReactionSettledTracker,
  resolveCommentMotionCurrent,
  resolveCommentMotionStandDown,
} from "./motion";
import { Reactions } from "../reactions";
import { Skeleton } from "../skeleton";
import { resolveShimmerValue6 } from "../spark";
import {
  CommentsEmoji,
  CommentsItems,
  CommentsPlacement,
  CommentsResolved,
} from "./actions";
import { CommentsLabel2 } from "./activity";
import { CommentsBusy, CommentsValue2 } from "./edit";
import { CommentsExpanded } from "./card";
import type * as ReactComponentTypes from "react";

export const CommentsShowMoreLabel: ReactComponentTypes.FC<{
  showMoreLabel?: ReactComponentTypes.ReactNode;
  showLessLabel?: ReactComponentTypes.ReactNode;
  children?: ReactComponentTypes.ReactNode;
}> = ({
  showMoreLabel: input,
  showLessLabel: input2,
  children: input3,
}) => {
  let { expanded: value }: Dynamic = useCommentCardContext();
  let value2: Dynamic = resolveUiLinksAndFoundationUseContext3(`showMore`, `Show more`);
  let value3: Dynamic = resolveUiLinksAndFoundationUseContext3(`showLess`, `Show less`);
  let [value4, value5]: Dynamic = (0, React.useState)(false);
  let [value6, value7]: Dynamic = (0, React.useState)(false);
  let value8: Dynamic = (0, React.useRef)(null);
  let value9: Dynamic = (0, React.useId)();
  let [value10, value11]: Dynamic = (0, React.useState)(value);
  if (value !== value10) {
    value11(value);
    if (!value) {
      value5(false);
    }
  }
  UiDesignSystemUseLayoutEffect((..._extraArguments: unknown[]): Dynamic => {
    let current: Dynamic = value8.current;
    if (!current) return;
    let defaultView: Dynamic = current.ownerDocument.defaultView;
    let value13 = (..._extraArguments: unknown[]): undefined => {
      let value15: number = Number.parseFloat(
        defaultView?.getComputedStyle(current).lineHeight ?? ``,
      );
      value7(
        current.offsetHeight >
          (Number.isFinite(value15) ? value15 : 20) * commentsValue16,
      );
    };
    value13();
    if (!defaultView || defaultView.ResizeObserver === undefined) return;
    let value14: Dynamic = new (defaultView.ResizeObserver as Dynamic)(value13);
    value14.observe(current);
    return (..._extraArguments: unknown[]): Dynamic => value14.disconnect();
  }, []);
  let value12: Dynamic = value6 && !value4 && !value;
  return (
    <jsxRuntime.Fragment>
      <div
        id={value9}
        data-clamped={value12 || undefined}
        onFocusCapture={
          value12 ? (..._extraArguments: unknown[]): Dynamic => value5(true) : undefined
        }
        className={resolveUiDesignSystemValue2(
          `text-pretty wrap-anywhere [&_code]:break-all [&_pre]:max-w-full [&_pre]:overflow-x-auto`,
          value12 &&
            `max-h-[15lh] overflow-hidden [mask-image:linear-gradient(to_bottom,black_calc(100%_-_min(2rem,28%)),transparent)]`,
        )}
      >
        <div ref={value8} className={`whitespace-pre-wrap`}>
          {input3}
        </div>
      </div>
      {value6 && !value && (
        <CommentsOpen
          open={value4}
          controls={value9}
          label={value4 ? (input2 ?? value3) : (input ?? value2)}
          onToggle={(..._extraArguments: unknown[]): Dynamic =>
            value5((input4?: Dynamic, ..._extraArguments: unknown[]) => !input4)
          }
        />
      )}
    </jsxRuntime.Fragment>
  );
};

export const CommentsOpen: ReactComponentTypes.FC<{
  open: boolean;
  controls: string;
  label: ReactComponentTypes.ReactNode;
  onToggle: ReactComponentTypes.MouseEventHandler<HTMLButtonElement>;
}> = ({
  open: input,
  controls: input2,
  label: input3,
  onToggle: input4,
}) => {
  let value: Dynamic = (0, React.useRef)(null);
  resolveCommentMotionStandDown(value);
  return (
    <Button
      ref={value}
      variant={`ghost`}
      size={`xs`}
      flush={true}
      aria-expanded={input}
      aria-controls={input2}
      onClick={input4}
      className={`self-start`}
    >
      {input3}
    </Button>
  );
};

function useCommentsSettle(..._extraArguments: unknown[]): Dynamic {
  let [value]: Dynamic = (0, React.useState)(createReactionSettledTracker);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let value2: Dynamic = setTimeout(value.settle, commentMotionValue2000);
      return (..._extraArguments: unknown[]): void => clearTimeout(value2);
    },
    [value],
  );
  return value;
}

var CommentsAuthorName: Dynamic;

var commentsValue16: Dynamic;

var CommentsRef: Dynamic;

var CommentsCount: Dynamic;

var CommentsRef2: Dynamic;

var CommentsValue3: Dynamic;

var CommentsRef3: Dynamic;

var CommentsRef4: Dynamic;

var CommentsReplace: Dynamic;

var CommentsLauncher: Dynamic;

var CommentCard: Dynamic;

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeCommentContentStep1(): void {
  CommentsAuthorName = (0, React.forwardRef)(
    (
      {
        authorName: input,
        avatarSrc: input2,
        byClaude: input16 = false,
        avatar: input3,
        authorTooltip: input4,
        identityLoading: input17 = false,
        timestamp: input5,
        actions: input6,
        footnote: input7,
        reactions: input8,
        showMoreLabel: input9,
        showLessLabel: input10,
        editor: input11,
        confirm: input12,
        className: input13,
        children: input14,
        ...input15
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value: Dynamic = resolveUiLinksAndFoundationUseContext3(
        `claude`,
        // BaoCut: 智能体写的批注与回复显示的作者名
        `Agent`,
      );
      let value2: Dynamic = resolveUiLinksAndFoundationUseContext3(
        `loading`,
        `Loading`,
      );
      let { expanded: value3, touch: value4 }: Dynamic =
        useCommentCardContext();
      let value5: Dynamic = (0, React.useContext)(FieldStylesCreateContext);
      let value6: Dynamic = useCommentsSettle();
      let value7: Dynamic = (0, React.useContext)(CommentMotionCreateContext5);
      let value8: Dynamic = (0, React.useContext)(CommentMotionCreateContext3);
      let value9: Dynamic = (0, React.useId)();
      let value10: Dynamic =
        !value5 && value8
          ? value8
          : {
              name: `${value9}-name`,
              time: `${value9}-time`,
              body: `${value9}-body`,
            };
      let value11: boolean = input5 != null;
      let value12: Dynamic = input ?? (input16 ? value : ``);
      resolveUiTooltipsAndControlsValue5(
        !input17 && value12 === ``,
        `cds: CommentCard.Comment needs authorName (or byClaude / identityLoading).`,
      );
      let value13: Dynamic = resolveShimmerValue6(input6) ? (
        input6
      ) : value7 && !value5 ? (
        <CommentsPlacement />
      ) : undefined;
      let value14: string = value4 || (value3 && !value5) ? `pinned` : `float`;
      let value15: Dynamic =
        input3 ??
        (input17 ? (
          <Skeleton
            as={`span`}
            decorative={true}
            className={`size-[var(--cds-avatar-sm)] shrink-0 rounded-full`}
          />
        ) : input16 ? (
          <Avatar
            variant={`claude`}
            name={value12}
            size={`sm`}
            className={`shrink-0`}
          />
        ) : (
          <Avatar
            name={value12}
            src={input2}
            size={`sm`}
            className={`shrink-0`}
          />
        ));
      let value16: string = `min-w-0 overflow-x-clip text-ellipsis whitespace-nowrap font-semibold`;
      let value17: Dynamic = input17 ? (
        <span id={value10.name} className={value16}>
        <Skeleton
            as={`span`}
            decorative={true}
            className={`inline-block h-2 w-14 align-middle`}
          />
        <span className={`sr-only`}>{value2}</span>
      </span>
      ) : input4 == null ? (
        <OverflowTooltip
          lazy={true}
          id={value10.name}
          className={`font-semibold`}
        >
        {value12}
      </OverflowTooltip>
      ) : (
        <Tooltip content={input4}>
        <span id={value10.name} className={value16}>
          {value12}
        </span>
      </Tooltip>
      );
      return renderReactJsxs(value5 ? `article` : `div`, {
  ref: options,
  "data-cds-part": `comment`,
  "data-by-claude": input16 || undefined,
  "aria-labelledby": value5 ? `${value10.name} ${value10.time}` : undefined,
  tabIndex: value5 ? -1 : undefined,
  className: resolveUiDesignSystemValue2(`group/comment relative flex flex-col gap-xs rounded outline-none focus-visible:shadow-focus focus-visible:outline-hidden`, `touch:isolate`, input13),
  ...input15,
  children: [<div className={resolveUiDesignSystemValue2(`relative flex flex-wrap items-center gap-x-sm text-footnote font-normal touch:z-[1]`, !resolveShimmerValue6(input11) && `-mb-[calc(var(--cds-gap-xs)/2)]`)}>
            <span aria-hidden={input3 == null ? `true` : undefined} className={`-me-[calc(var(--cds-gap-sm)-var(--cds-gap-xs))] inline-flex shrink-0`}>
              {value15}
            </span>
            <span className={`flex min-h-control flex-1 flex-wrap content-center items-baseline gap-x-xs before:h-0 before:w-16 before:basis-full before:content-['']`}>
              <span className={`grid max-w-full grid-cols-[minmax(0,max-content)]`}>
                {value17}
              </span>
              {value11 && <span id={value10.time} className={`shrink-0 text-caption font-normal whitespace-nowrap text-muted`} data-cds-part={`timestamp`}>
                  {input5}
                </span>}
            </span>
            <CommentMotionFloat.Provider value={value14}>
              <CommentMotionCreateContext2.Provider value={value6}>
                {value13}
              </CommentMotionCreateContext2.Provider>
            </CommentMotionFloat.Provider>
          </div>, resolveShimmerValue6(input11) ? input11 : <div className={`flex flex-col text-body font-normal text-primary`} data-cds-part={`body`} id={value10.body}>
              <CommentsShowMoreLabel showMoreLabel={input9} showLessLabel={input10}>
                {input14}
              </CommentsShowMoreLabel>
              {input7 != null && input7 !== false && <OverflowTooltip lazy={true} className={`text-caption font-normal text-muted`} data-cds-part={`footnote`}>
                  {input7}
                </OverflowTooltip>}
            </div>, <CommentMotionCreateContext2.Provider value={value6}>
            {input8}
          </CommentMotionCreateContext2.Provider>, input12]
});
    },
  );
  CommentsAuthorName.displayName = `CommentCard.Comment`;
  commentsValue16 = 16;
  CommentsRef = (0, React.forwardRef)(
    (
      { className: input, children: input2, ...input3 }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => (
      <blockquote
        ref={options}
        dir={`auto`}
        data-cds-part={`quote`}
        className={resolveUiDesignSystemValue2(`m-0 line-clamp-2 border-s-2 border-strong ps-md text-caption font-normal text-secondary`, input)}
        {...input3}
      >{input2}</blockquote>
    ),
  );
  CommentsRef.displayName = `CommentCard.Quote`;
  CommentsCount = (0, React.forwardRef)(
    (
      { count: input, label: input2, className: input3, ...input4 }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value: Dynamic = resolveUiLinksAndFoundationUseContext3(
        `showReplies`,
        input === 1 ? `Show 1 reply` : `Show {count} replies`,
        {
          count: input,
        },
      );
      let value2: Dynamic = (0, React.useRef)(null);
      resolveCommentMotionStandDown(value2, `replies`);
      return (
        <Button
          ref={resolveUiOverlaysAndIconsValue4(value2, options)}
          variant={`ghost`}
          size={`xs`}
          flush={true}
          data-cds-part={`replies-toggle`}
          className={resolveUiDesignSystemValue2(`self-start text-secondary`, input3)}
          {...input4}
        >{input2 ?? value}</Button>
      );
    },
  );
  CommentsCount.displayName = `CommentCard.RepliesToggle`;
  CommentsRef2 = (0, React.forwardRef)(
    (
      { className: input, children: input2, ...input3 }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => (
      <div ref={options} data-cds-part={`note`} className={resolveUiDesignSystemValue2(`text-caption font-normal text-muted`, input)} {...input3}>{input2}</div>
    ),
  );
  CommentsRef2.displayName = `CommentCard.Note`;
  CommentsValue3 = (0, React.forwardRef)(
    (
      { className: input, children: input2, ...input3 }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => (
      <FieldStylesCreateContext.Provider value={true}>
      <div ref={options} data-cds-part={`replies`} className={resolveUiDesignSystemValue2(`flex flex-col gap-sm`, input)} {...input3}>{input2}</div>
    </FieldStylesCreateContext.Provider>
    ),
  );
  CommentsValue3.displayName = `CommentCard.Replies`;
  CommentsRef3 = (0, React.forwardRef)(
    (
      { className: input, children: input2, ...input3 }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      resolveUiTooltipsAndControlsValue5(
        (0, React.useContext)(CommentMotionCreateContext),
        `cds: CommentCard.FixedRow must be a direct child of CommentCard. Inside a fragment or your own component it is laid out with the comments and, with maxHeight, scrolls away with them.`,
      );
      let value: Dynamic = (0, React.useRef)(null);
      resolveCommentMotionCurrent(value);
      return (
        <div
          ref={resolveUiOverlaysAndIconsValue4(value, options)}
          data-cds-part={`fixed-row`}
          className={resolveUiDesignSystemValue2(`px-lg pb-xs`, input)}
          {...input3}
        >{input2}</div>
      );
    },
  );
  CommentsRef3.displayName = `CommentCard.FixedRow`;
  CommentsRef4 = (0, React.forwardRef)(
    (
      input?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value: Dynamic = (0, React.useRef)(null);
      resolveCommentMotionCurrent(value);
      return (
        <div ref={resolveUiOverlaysAndIconsValue4(value, options)} {...input} />
      );
    },
  );
  CommentsRef4.displayName = `CommentCard.ReplyField.Box`;
  CommentsReplace = FieldStylesState2.replace(
    `[&:hover:not(:focus-within):not([data-invalid]):not([data-disabled])]:shadow-field-hover`,
    `hover:[&:not(:focus-within):not([data-invalid]):not([data-disabled])]:shadow-field-hover`,
  );
  CommentsLauncher = (0, React.forwardRef)(
    (
      {
        launcher: input,
        className: input2,
        children: input3,
        onMouseDown: input4,
        ...input5
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let { expanded: value, readOnly: value2 }: Dynamic =
        useCommentCardContext();
      resolveUiTooltipsAndControlsValue5(
        (0, React.useContext)(CommentMotionCreateContext),
        `cds: CommentCard.ReplyField must be a direct child of CommentCard. Inside a fragment or your own component it is laid out with the comments and, with maxHeight, scrolls away with them.`,
      );
      let value3: Dynamic = (0, React.useRef)(null);
      return !value || value2 ? null : (
        <CommentsRef4 ref={options} data-cds-part={`reply-field`} className={resolveUiDesignSystemValue2(`px-lg pb-lg group-has-[:is([data-cds-part=edit-field],[data-cds-part=delete-confirm])]/comment-card:hidden`, input2)} onMouseDown={(event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
  input4?.(event);
  let value4: boolean = event.target === event.currentTarget || event.target === value3.current;
  if (event.defaultPrevented || !value4) return;
  event.preventDefault();
  let element: Dynamic = event.currentTarget.querySelector(`textarea, [contenteditable="true"], button[data-cds-part="reply-launcher"]`);
  element?.focus();
  if (element?.matches(`button`)) {
    element.click();
  }
}} {...input5}>{input ? <button
  type={`button`}
  data-cds-part={`reply-launcher`}
  aria-haspopup={`dialog`}
  onClick={input.onOpen}
  className={resolveUiDesignSystemValue2(CommentsReplace, `cds-reset flex min-h-11 w-full items-center text-start text-muted forced-colors:border`)}
>
              {input.placeholder}
            </button> : <CommentMotionCreateContext4.Provider value={true}>
              <div ref={value3} className={resolveUiDesignSystemValue2(FieldStylesState2, `forced-colors:border`)}>
                {input3}
              </div>
            </CommentMotionCreateContext4.Provider>}</CommentsRef4>
      );
    },
  );
  CommentsLauncher.displayName = `CommentCard.ReplyField`;
  CommentCard = Object.assign(CommentsExpanded, {
    Comment: CommentsAuthorName,
    Quote: CommentsRef,
    Replies: CommentsValue3,
    RepliesToggle: CommentsCount,
    Note: CommentsRef2,
    FixedRow: CommentsRef3,
    ReplyField: CommentsLauncher,
    Actions: CommentsPlacement,
    ReactAction: CommentsEmoji,
    MoreMenu: CommentsItems,
    ResolveAction: CommentsResolved,
    Reactions: Reactions,
    Activity: CommentsLabel2,
    EditField: CommentsValue2,
    DeleteConfirm: CommentsBusy,
  });
}

export { CommentCard, CommentsAuthorName, CommentsLauncher, CommentsRef3 };
