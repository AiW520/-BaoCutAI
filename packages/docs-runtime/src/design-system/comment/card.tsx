/** BaoCut: comment card from cds-CIGM-LUe.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  React,
  TooltipGroup,
  UiProviderAndLayersCreateContext8,
  UiTooltipsAndControlsPanel,
  resolveUiDesignSystemValue2,
  resolveUiLinksAndFoundationUseContext3,
  resolveUiProviderAndLayersUseContext6,
  resolveUiTooltipsAndControlsValue5,
} from "../dependencies";
import {
  isTouchPresentation,
  subscribePresentationChanges,
} from "../presentation";
import {
  CommentCardContext,
  commentCardSurfaceClasses,
  isFieldStylesIsValidElement,
} from "../field-foundation";
import {
  CommentMotionCreateContext,
  CommentMotionCreateContext3,
  CommentMotionCreateContext5,
} from "./motion";
import { resolveSurfaceCdsFocusShadow } from "../surface";
import {
  CommentsAuthorName,
  CommentsLauncher,
  CommentsRef3,
} from "./content";

var CommentsStyles5: Dynamic;

function isCommentsClosest(
  input?: Dynamic,
  element?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!(`closest` in input)) return false;
  let value: Dynamic = input;
  if (!element.contains(value)) return false;
  let value2: Dynamic = element.ownerDocument.getSelection();
  if (
    value2 !== null &&
    !value2.isCollapsed &&
    element.contains(value2.anchorNode)
  )
    return false;
  let value3: Dynamic = value.closest(CommentsStyles5);
  return (
    value3 === null ||
    !element.contains(value3) ||
    value3.matches(`[data-cds-part="replies-toggle"]`)
  );
}

var CommentsStyles6: Dynamic;

var CommentsStyles7: Dynamic;

var CommentsStyles8: Dynamic;

var CommentsStyles9: Dynamic;

var CommentsExpanded: Dynamic;

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeCommentCardStep1(): void {
  CommentsStyles5 = `a[href], button, input, select, textarea, summary, label, [role="button"], [role="link"], [role="checkbox"], [role="switch"], [contenteditable]:not([contenteditable="false"]), [data-cds-part="edit-field"], [data-cds-part="delete-confirm"], [data-cds-part="reply-field"]`;
  CommentsStyles6 = `transition-shadow duration-fast [--cds-comment-card-bg:var(--cds-surface-2)]`;
  CommentsStyles7 = `bg-[var(--cds-comment-card-row-tint,transparent)] hover:[--cds-comment-card-row-tint:var(--cds-comment-card-hover-tint,var(--cds-alpha-1))] data-[active]:[--cds-comment-card-row-tint:var(--cds-comment-card-hover-tint,var(--cds-alpha-1))] after:inset-px`;
  CommentsStyles8 = `flex min-h-0 flex-col gap-sm overflow-y-auto overscroll-contain px-lg pt-[8px] pb-[max(8px,var(--cds-pad-md))] outline-none scroll-fade-y scroll-fade-hide-top scroll-fade-size-4`;
  CommentsStyles9 = `relative flex min-h-0 flex-col mt-[calc(var(--cds-pad-lg)-8px)] mb-pad-xs has-[>:focus-visible]:after:pointer-events-none has-[>:focus-visible]:after:absolute has-[>:focus-visible]:after:inset-0 has-[>:focus-visible]:after:shadow-focus has-[>:focus-visible]:after:outline-hidden`;
  CommentsExpanded = (0, React.forwardRef)(
    (
      {
        variant: input16 = `raised`,
        expanded: input17 = false,
        active: input18 = false,
        readOnly: input19 = false,
        onExpand: input,
        onClose: input2,
        closeLabel: input3,
        maxHeight: input4,
        scrollRegionLabel: input5,
        className: input6,
        style: input7,
        children: input8,
        onClick: input9,
        onKeyDown: input10,
        tabIndex: input11,
        "aria-label": input12,
        "aria-labelledby": input13,
        "aria-describedby": input14,
        ...input15
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value: Dynamic = (0, React.useSyncExternalStore)(
        subscribePresentationChanges,
        isTouchPresentation,
        (..._extraArguments: unknown[]) => false,
      );
      let value2: Dynamic = (0, React.useMemo)(
        (..._extraArguments: unknown[]): Dynamic => ({
          expanded: input17,
          readOnly: input19,
          touch: value,
        }),
        [input17, input19, value],
      );
      let value3: Dynamic = (0, React.useId)();
      let value4: Dynamic = (0, React.useMemo)(
        (..._extraArguments: unknown[]): Dynamic => ({
          name: `${value3}-name`,
          time: `${value3}-time`,
          body: `${value3}-body`,
        }),
        [value3],
      );
      let value5: Dynamic = resolveUiLinksAndFoundationUseContext3(
        `commentThread`,
        `Comment thread`,
      );
      let value6: boolean =
        resolveUiProviderAndLayersUseContext6() ===
        UiTooltipsAndControlsPanel.popover;
      let value7: boolean = input16 === `raised` && !value6;
      let value8: Dynamic = resolveSurfaceCdsFocusShadow(
        UiTooltipsAndControlsPanel.panel,
      );
      let value9: Dynamic = (
        input20?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        value7 ? (
          <UiProviderAndLayersCreateContext8.Provider
            value={UiTooltipsAndControlsPanel.panel}
          >
          {input20}
        </UiProviderAndLayersCreateContext8.Provider>
        ) : (
          input20
        );
      let value10: Dynamic = (0, React.useMemo)(
        (..._extraArguments: unknown[]): Dynamic =>
          input2
            ? {
                onClose: input2,
                closeLabel: input3,
              }
            : null,
        [input2, input3],
      );
      let value11: Dynamic = React.Children.toArray(input8);
      let filtered: Dynamic = value11.filter(
        (input20?: Dynamic, ..._extraArguments: unknown[]): boolean =>
          isFieldStylesIsValidElement(input20, CommentsRef3),
      );
      let filtered2: Dynamic = value11.filter(
        (input20?: Dynamic, ..._extraArguments: unknown[]): boolean =>
          isFieldStylesIsValidElement(input20, CommentsLauncher),
      );
      let filtered3: Dynamic = value11.filter(
        (input20?: Dynamic, ..._extraArguments: unknown[]): boolean =>
          !filtered.includes(input20) && !filtered2.includes(input20),
      );
      resolveUiTooltipsAndControlsValue5(
        filtered3.filter(
          (input20?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            (0, React.isValidElement)(input20) &&
            input20.type === CommentsAuthorName,
        ).length > 1,
        `cds: CommentCard takes one first Comment; put the others inside CommentCard.Replies.`,
      );
      let value12: Dynamic = (
        <CommentMotionCreateContext.Provider value={true}>
        <CommentMotionCreateContext5.Provider value={value10}>
          {value9(filtered3)}
        </CommentMotionCreateContext5.Provider>
      </CommentMotionCreateContext.Provider>
      );
      let value13: boolean = input12 !== undefined || input13 !== undefined;
      return (
        <CommentCardContext.Provider value={value2}>
        <CommentMotionCreateContext3.Provider value={value4}>
          <TooltipGroup>
            <article ref={options} data-cds={`CommentCard`} data-variant={input16} data-expanded={input17 || undefined} data-active={input18 || undefined} aria-label={input12} aria-labelledby={value13 ? input13 : `${value4.name} ${value4.time}`} aria-describedby={input14 ?? (value13 ? undefined : value4.body)} tabIndex={input11 ?? (input && !input17 || input17 && !value6 ? 0 : -1)} onClick={(event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
  input9?.(event);
  if (!event.defaultPrevented && !input17 && isCommentsClosest(event.target, event.currentTarget)) {
    input?.();
  }
}} onKeyDown={(event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
  input10?.(event);
  if (!(event.defaultPrevented || event.target !== event.currentTarget) && !input17 && input && (event.key === `Enter` || event.key === ` `)) {
    event.preventDefault();
    if (!event.repeat) {
      input();
    }
  }
}} className={resolveUiDesignSystemValue2(`group/comment-card relative flex flex-col font-sans text-body font-normal text-primary outline-none after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:content-[''] focus-visible:outline-hidden focus-visible:after:shadow-focus`, input && !input17 && `cursor-interactive`, value7 ? resolveUiDesignSystemValue2(commentCardSurfaceClasses(input17 || input18), CommentsStyles6) : input16 === `flat` && CommentsStyles7, input6)} style={value7 ? {
  ...value8,
  ...input7
} : input7} {...input15}>{input4 === undefined ? <div className={`flex min-h-0 flex-col gap-sm p-lg`}>
                      {value12}
                    </div> : <div className={CommentsStyles9}>
                      <div role={`group`} tabIndex={0} aria-label={input5 || value5} className={CommentsStyles8} style={{
      maxHeight: input4
    }}>
                        {value12}
                      </div>
                    </div>}{<CommentMotionCreateContext.Provider value={false}>
                    {value9(filtered)}
                    {value9(filtered2)}
                  </CommentMotionCreateContext.Provider>}</article>
          </TooltipGroup>
        </CommentMotionCreateContext3.Provider>
      </CommentCardContext.Provider>
      );
    },
  );
  CommentsExpanded.displayName = `CommentCard`;
}

export { CommentsExpanded };
