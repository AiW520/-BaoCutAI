/** BaoCut: comment actions from cds-CIGM-LUe.js. */
import type { Dynamic } from "./types";
import {
  Button,
  React,
  Tooltip,
  UiLinksAndFoundationCreateContext3,
  UiOverlaysAndIconsCustomIcon,
  jsxRuntime,
  originalJsxProps,
  originalJsxsProps,
  resolveUiDesignSystemValue2,
  resolveUiLinksAndFoundationUseContext3,
  resolveUiLinksAndFoundationValue19,
  resolveUiOverlaysAndIconsValue4,
  resolveUiProviderAndLayersBase,
} from "./cds-dependencies";
import { useRovingToolbar } from "./cds-roving-toolbar";
import {
  FieldStylesCreateContext,
  isFieldStylesIsValidElement,
  useCommentCardContext,
} from "./cds-field-foundation";
import {
  CommentMotionCreateContext2,
  CommentMotionCreateContext5,
  CommentMotionCreateContext6,
  CommentMotionFloat,
  resolveCommentMotionStandDown,
} from "./cds-comment-motion";
import { renderMenuItems } from "./cds-menu-root";
import { Menu } from "./cds-menu-search";
import { Popover } from "./cds-popover";

var CommentsStyles: Dynamic;

var CommentsStyles2: Dynamic;

var CommentsStyles3: Dynamic;

var resolveCommentsComfortable: Dynamic;

function resolveCommentsValue(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return isFieldStylesIsValidElement(input, CommentsResolved);
}

var CommentsPlacement: Dynamic;

var CommentsEmoji: Dynamic;

var CommentsItems: Dynamic;

var CommentsHandBack: Dynamic;

function useCommentsResolved(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = (0, React.useRef)(false);
  let value2: Dynamic = (0, React.useRef)({
    resolved: input,
    busy: options,
  });
  let [value3, value4]: Dynamic = (0, React.useState)(``);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      let current: Dynamic = value2.current;
      value2.current = {
        resolved: input,
        busy: options,
      };
      if (input !== current.resolved) {
        let value5: Dynamic = input && value.current ? context : ``;
        value.current = false;
        queueMicrotask(
          (..._extraArguments: unknown[]): Dynamic => value4(value5),
        );
      } else if (current.busy && !options && !input) {
        value.current = false;
      }
    },
    [input, options, context],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (value3 === ``) return;
      let value5: Dynamic = (window as Dynamic).setTimeout(
        (..._extraArguments: unknown[]): Dynamic => value4(``),
        2e3,
      );
      return (..._extraArguments: unknown[]): Dynamic =>
        (window as Dynamic).clearTimeout(value5);
    },
    [value3],
  );
  return {
    words: value3,
    notePress: (..._extraArguments: unknown[]): undefined => {
      value.current = true;
    },
  };
}

var CommentsResolved: Dynamic;

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeCommentActionsStep1(): void {
  CommentsStyles = `pointer-events-none absolute inset-y-0 end-full ps-8 opacity-0 empty:hidden [&:not(:has(button,a[href],[role=button]))]:bg-none [&:not(:has(button,a[href],[role=button]))]:ps-0 bg-[linear-gradient(to_right,transparent,var(--cds-comment-card-row-tint,transparent)_30%),linear-gradient(to_right,transparent,var(--cds-comment-card-bg,var(--cds-page-bg))_30%)] rtl:bg-[linear-gradient(to_left,transparent,var(--cds-comment-card-row-tint,transparent)_30%),linear-gradient(to_left,transparent,var(--cds-comment-card-bg,var(--cds-page-bg))_30%)] group-hover/comment:pointer-events-auto group-hover/comment:opacity-100 has-[:focus-visible]:pointer-events-auto has-[:focus-visible]:opacity-100 has-[[data-popup-open]]:pointer-events-auto has-[[data-popup-open]]:opacity-100 has-[[aria-expanded=true]]:pointer-events-auto has-[[aria-expanded=true]]:opacity-100 has-[[data-resolving]]:pointer-events-auto has-[[data-resolving]]:opacity-100 touch:pointer-events-auto touch:static touch:bg-none touch:ps-0 touch:opacity-100`;
  CommentsStyles2 = `touch:mx-[calc((2.75rem*var(--cds-rem-scale,1)_-_var(--cds-h-control))/2)] touch:[&:not(:has(~_:is(button,a[href],[role=button],input,[data-cds-part=resolved-mark]),~_*_:is(button,a[href],[role=button],input)))]:me-0 touch:before:absolute touch:before:top-1/2 touch:before:left-1/2 touch:before:size-[calc(2.75rem*var(--cds-rem-scale,1))] touch:before:-translate-x-1/2 touch:before:-translate-y-1/2 touch:before:content-['']`;
  CommentsStyles3 = `touch:[&_[data-cds=Button][data-cds-icon-only][data-cds-ghost]:not([data-cds-part],[data-size],[data-step])]:[--cds-h-control:calc(2rem*var(--cds-rem-scale,1))] touch:[&_[data-cds=Button][data-cds-icon-only][data-cds-ghost]:not([data-cds-part],[data-size],[data-step])]:[--cds-radius:calc(0.5rem*var(--cds-rem-scale,1))] touch:[&_[data-cds=Button][data-cds-icon-only][data-cds-ghost]:not([data-cds-part],[data-size],[data-step])]:mx-[calc((2.75rem*var(--cds-rem-scale,1)_-_var(--cds-h-control))/2)] touch:[&_[data-cds=Button][data-cds-icon-only][data-cds-ghost]:not([data-cds-part],[data-size],[data-step]):not(:has(~_:is(button,a[href],[role=button],input,[data-cds-part=resolved-mark]),~_*_:is(button,a[href],[role=button],input)))]:me-0 touch:[&_[data-cds=Button][data-cds-icon-only][data-cds-ghost]:not([data-cds-part],[data-size],[data-step])]:before:absolute touch:[&_[data-cds=Button][data-cds-icon-only][data-cds-ghost]:not([data-cds-part],[data-size],[data-step])]:before:top-1/2 touch:[&_[data-cds=Button][data-cds-icon-only][data-cds-ghost]:not([data-cds-part],[data-size],[data-step])]:before:left-1/2 touch:[&_[data-cds=Button][data-cds-icon-only][data-cds-ghost]:not([data-cds-part],[data-size],[data-step])]:before:size-[calc(2.75rem*var(--cds-rem-scale,1))] touch:[&_[data-cds=Button][data-cds-icon-only][data-cds-ghost]:not([data-cds-part],[data-size],[data-step])]:before:-translate-x-1/2 touch:[&_[data-cds=Button][data-cds-icon-only][data-cds-ghost]:not([data-cds-part],[data-size],[data-step])]:before:-translate-y-1/2 touch:[&_[data-cds=Button][data-cds-icon-only][data-cds-ghost]:not([data-cds-part],[data-size],[data-step])]:before:content-['']`;
  resolveCommentsComfortable = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    input ? resolveUiProviderAndLayersBase(`comfortable`) : undefined;
  CommentsPlacement = (0, React.forwardRef)(
    (
      {
        placement: input,
        label: input2,
        className: input3,
        children: input4,
        onKeyDown: input5,
        onFocus: input6,
        ...input7
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let { touch: value, readOnly: value2 }: Dynamic = useCommentCardContext();
      let value3: Dynamic = (0, React.useContext)(CommentMotionFloat);
      let value4: Dynamic = (0, React.useContext)(FieldStylesCreateContext);
      let value5: Dynamic = (0, React.useContext)(CommentMotionCreateContext5);
      let value6: Dynamic = resolveUiLinksAndFoundationUseContext3(
        `commentActions`,
        `Comment actions`,
      );
      let value7: Dynamic = resolveUiLinksAndFoundationUseContext3(
        `close`,
        `Close`,
      );
      let {
        ref: value8,
        onKeyDown: value9,
        onFocus: value10,
      }: Dynamic = useRovingToolbar();
      let value11: Dynamic = resolveUiOverlaysAndIconsValue4(value8, options);
      let value12: Dynamic =
        value5 && !value4 ? (
          <Button
            {...originalJsxProps(
              {
                variant: `ghost`,
                iconOnly: true,
                "aria-label": value5.closeLabel ?? value7,
                icon: (
                  <UiOverlaysAndIconsCustomIcon
                    name={`X`}
                    size={value ? `md` : `sm`}
                  />
                ),
                onClick: value5.onClose,
                className: CommentsStyles2,
                "data-step": resolveCommentsComfortable(value),
                "data-cds-part": `close`,
              },
              `close`,
            )}
          />
        ) : null;
      let value13: Dynamic = React.Children.toArray(input4);
      let value14: Dynamic = value2
        ? value13.filter(resolveCommentsValue)
        : value13;
      if (value2 && value14.length === 0 && !value12) return null;
      let value15: Dynamic = value ? `pinned` : (input ?? value3);
      return value2 ? (
        <span
          {...originalJsxsProps({
            ref: options,
            "data-cds-part": `actions`,
            "data-placement": value15,
            onKeyDown: input5,
            onFocus: input6,
            className: resolveUiDesignSystemValue2(
              `ms-auto flex shrink-0 items-center`,
              input3,
            ),
            ...input7,
            children: [value14, value12],
          })}
        />
      ) : (
        <span
          {...originalJsxProps({
            ref: value11,
            role: `toolbar`,
            "aria-label": input2 ?? value6,
            tabIndex: -1,
            "data-cds-part": `actions`,
            "data-placement": value15,
            onKeyDown: (
              input8?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              input5?.(input8);
              value9(input8);
            },
            onFocus: (
              input8?: Dynamic,
              ..._extraArguments: unknown[]
            ): undefined => {
              input6?.(input8);
              value10(input8);
            },
            className: resolveUiDesignSystemValue2(
              `relative ms-auto flex shrink-0 items-center self-stretch`,
              CommentsStyles3,
              input3,
            ),
            ...input7,
            children:
              value15 === `float` ? (
                <jsxRuntime.Fragment>
                <CommentMotionCreateContext6.Provider value={`float`}>
                  <span
                      className={resolveUiDesignSystemValue2(
                        `flex items-center`,
                        CommentsStyles,
                      )}
                    >
                    {value14}
                  </span>
                </CommentMotionCreateContext6.Provider>
                <CommentMotionCreateContext6.Provider value={`line`}>
                  {value14.filter(resolveCommentsValue)}
                </CommentMotionCreateContext6.Provider>
                {value12}
              </jsxRuntime.Fragment>
              ) : (
                <jsxRuntime.Fragment>
                {value14}
                {value12}
              </jsxRuntime.Fragment>
              ),
          })}
        />
      );
    },
  );
  CommentsPlacement.displayName = `CommentCard.Actions`;
  CommentsEmoji = (0, React.forwardRef)(
    (
      {
        emoji: input,
        onReact: input2,
        label: input3,
        className: input4,
        ...input5
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value: Dynamic = (0, React.useContext)(CommentMotionCreateContext2);
      let { touch: value2, readOnly: value3 }: Dynamic =
        useCommentCardContext();
      let [value4, value5]: Dynamic = (0, React.useState)(false);
      let value6: Dynamic = resolveUiLinksAndFoundationUseContext3(
        `addReaction`,
        `Add reaction`,
      );
      let value7: Dynamic = (0, React.useContext)(
        UiLinksAndFoundationCreateContext3,
      );
      let value8: Dynamic = input3 ?? value6;
      return value3 ? null : (
        <Popover.Root open={value4} onOpenChange={value5}>
        <Tooltip content={value8} open={value4 ? false : undefined}>
          <Popover.Trigger
              render={
                <CommentsHandBack
                  {...originalJsxProps({
                    ref: options,
                    handBack: `actions`,
                    variant: `ghost`,
                    iconOnly: true,
                    tooltip: false,
                    "aria-label": value8,
                    icon: (
                      <UiOverlaysAndIconsCustomIcon
                        name={`Smiley`}
                        size={value2 ? `md` : `sm`}
                      />
                    ),
                    className: resolveUiDesignSystemValue2(
                      CommentsStyles2,
                      input4,
                    ),
                    "data-step": resolveCommentsComfortable(value2),
                    "data-cds-part": `react`,
                    ...input5,
                  })}
                />
              }
            />
        </Tooltip>
        <Popover.Popup
            side={`top`}
            align={`end`}
            sideOffset={4}
            padding={`xs`}
            className={`flex gap-xs`}
          >
          {input.map(
              (input6?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
                <Button
                  {...originalJsxProps(
                    {
                      variant: `ghost`,
                      iconOnly: true,
                      icon: (
                        <span
                          aria-hidden={true}
                          className={`text-heading font-normal leading-none`}
                        >
                        {input6}
                      </span>
                      ),
                      "aria-label": resolveUiLinksAndFoundationValue19(
                        value7,
                        `reactWith`,
                        `React with {emoji}`,
                        {
                          emoji: input6,
                        },
                      ),
                      tooltip: false,
                      onClick: (..._extraArguments: unknown[]): undefined => {
                        value?.note(input6);
                        input2(input6);
                        value5(false);
                      },
                    },
                    input6,
                  )}
                />
              ),
            )}
        </Popover.Popup>
      </Popover.Root>
      );
    },
  );
  CommentsEmoji.displayName = `CommentCard.ReactAction`;
  CommentsItems = (0, React.forwardRef)(
    (
      {
        onCopyLink: input,
        onEdit: input2,
        onReopen: input3,
        onDelete: input4,
        items: input5,
        label: input6,
        className: input7,
        ...input8
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let { touch: value, readOnly: value2 }: Dynamic = useCommentCardContext();
      let [value3, value4]: Dynamic = (0, React.useState)(false);
      let value5: Dynamic = resolveUiLinksAndFoundationUseContext3(
        `moreOptions`,
        `More options`,
      );
      let value6: Dynamic = resolveUiLinksAndFoundationUseContext3(
        `copyLink`,
        `Copy link`,
      );
      let value7: Dynamic = resolveUiLinksAndFoundationUseContext3(
        `edit`,
        `Edit`,
      );
      let value8: Dynamic = resolveUiLinksAndFoundationUseContext3(
        `reopen`,
        `Reopen`,
      );
      let value9: Dynamic = resolveUiLinksAndFoundationUseContext3(
        `deleteComment`,
        `Delete comment`,
      );
      let items: Dynamic = [...(input5 ?? [])];
      if (input) {
        items.push({
          label: value6,
          onSelect: input,
        });
      }
      if (input2) {
        items.push({
          label: value7,
          onSelect: input2,
        });
      }
      if (input3) {
        items.push({
          label: value8,
          onSelect: input3,
        });
      }
      if (input4) {
        items.push({
          label: value9,
          variant: `danger`,
          separatorBefore: items.length > 0,
          onSelect: input4,
        });
      }
      if (items.length === 0 || value2) {
        if (value3) {
          value4(false);
        }
        return null;
      }
      let value10: Dynamic = input6 ?? value5;
      return (
        <Menu.Root open={value3} onOpenChange={value4}>
        <Tooltip content={value10} open={value3 ? false : undefined}>
          <Menu.Trigger
              render={
                <CommentsHandBack
                  {...originalJsxProps({
                    ref: options,
                    handBack: `actions`,
                    variant: `ghost`,
                    iconOnly: true,
                    tooltip: false,
                    "aria-label": value10,
                    icon: (
                      <UiOverlaysAndIconsCustomIcon
                        name={`DotsHorizontal`}
                        size={value ? `md` : `sm`}
                      />
                    ),
                    className: resolveUiDesignSystemValue2(
                      CommentsStyles2,
                      input7,
                    ),
                    "data-step": resolveCommentsComfortable(value),
                    "data-cds-part": `more`,
                    ...input8,
                  })}
                />
              }
            />
        </Tooltip>
        <Menu.Popup align={`end`}>{renderMenuItems(items)}</Menu.Popup>
      </Menu.Root>
      );
    },
  );
  CommentsItems.displayName = `CommentCard.MoreMenu`;
  CommentsHandBack = (0, React.forwardRef)(
    (
      { handBack: input, ...input2 }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value: Dynamic = (0, React.useRef)(null);
      resolveCommentMotionStandDown(value, input);
      return (
        <Button
          {...originalJsxProps({
            ref: resolveUiOverlaysAndIconsValue4(value, options),
            ...input2,
          })}
        />
      );
    },
  );
  CommentsHandBack.displayName = `CommentCard.Actions.Button`;
  CommentsResolved = (0, React.forwardRef)(
    (
      {
        resolved: input6 = false,
        onResolve: input,
        busy: input7 = false,
        resolveLabel: input2,
        resolvedLabel: input3,
        className: input4,
        ...input5
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let { touch: value, readOnly: value2 }: Dynamic = useCommentCardContext();
      let value3: Dynamic = resolveUiLinksAndFoundationUseContext3(
        `resolve`,
        `Resolve`,
      );
      let value4: Dynamic = resolveUiLinksAndFoundationUseContext3(
        `resolved`,
        `Resolved`,
      );
      let value5: Dynamic = (0, React.useContext)(CommentMotionCreateContext6);
      let value6: Dynamic = input3 ?? value4;
      let { words: value7, notePress: value8 }: Dynamic = useCommentsResolved(
        input6,
        input7,
        value6,
      );
      let [value9, value10]: Dynamic = (0, React.useState)(
        !input6 && !value2 && input !== undefined,
      );
      if (!value9 && !input6 && !value2 && input !== undefined) {
        value10(true);
      }
      let value11: Dynamic = (
        <span
          {...originalJsxProps(
            {
              role: `status`,
              className: `sr-only`,
              children: value7,
            },
            `status`,
          )}
        />
      );
      if (value5 !== `all` && (value5 === `line`) !== input6)
        return value5 === `float` && value9 ? (
          <jsxRuntime.Fragment>{value11}</jsxRuntime.Fragment>
        ) : null;
      if (input6) {
        let value12: Dynamic = (
          <Tooltip content={value6} side={`top`}>
          <span
              {...originalJsxProps({
                ref: options,
                ...input5,
                role: `img`,
                "aria-label": value6,
                "data-cds-part": `resolved-mark`,
                "data-step": resolveCommentsComfortable(value),
                className: resolveUiDesignSystemValue2(
                  `inline-flex size-control items-center justify-center`,
                  input4,
                ),
                children: (
                  <UiOverlaysAndIconsCustomIcon
                    name={`CheckCircleFilled`}
                    size={value ? `md` : `sm`}
                    className={`text-accent`}
                  />
                ),
              })}
            />
        </Tooltip>
        );
        return value5 === `all` ? (
          <jsxRuntime.Fragment>
          {value12}
          {value11}
        </jsxRuntime.Fragment>
        ) : (
          value12
        );
      }
      return value2 || input === undefined ? null : (
        <jsxRuntime.Fragment>
        <CommentsHandBack
            {...originalJsxProps({
              ref: options,
              handBack: `more`,
              variant: `ghost`,
              iconOnly: true,
              "aria-label": input2 ?? value3,
              ...(input7
                ? {
                    "aria-busy": true,
                    "aria-disabled": true,
                  }
                : {}),
              "data-cds-part": `resolve`,
              "data-resolving": input7 ? `true` : undefined,
              icon: input7 ? (
                <span className={`cds-resolve-check relative inline-flex`}>
                <svg
                    viewBox={`0 0 16 16`}
                    aria-hidden={true}
                    className={`pointer-events-none absolute inset-0 size-full overflow-visible`}
                  >
                  <rect
                      className={`cds-resolve-square`}
                      x={`0.75`}
                      y={`0.75`}
                      width={`14.5`}
                      height={`14.5`}
                      rx={`4`}
                    />
                </svg>
                <UiOverlaysAndIconsCustomIcon
                    name={`Check`}
                    size={value ? `md` : `sm`}
                    className={`relative`}
                  />
              </span>
              ) : (
                <UiOverlaysAndIconsCustomIcon
                  name={`Check`}
                  size={value ? `md` : `sm`}
                />
              ),
              onClick: input7
                ? undefined
                : (..._extraArguments: unknown[]): undefined => {
                    value8();
                    input();
                  },
              className: resolveUiDesignSystemValue2(CommentsStyles2, input4),
              "data-step": resolveCommentsComfortable(value),
              ...input5,
            })}
          />
        {value11}
      </jsxRuntime.Fragment>
      );
    },
  );
  CommentsResolved.displayName = `CommentCard.ResolveAction`;
}

export { CommentsEmoji, CommentsItems, CommentsPlacement, CommentsResolved };
