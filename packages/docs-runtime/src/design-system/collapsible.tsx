/** BaoCut: collapsible from cds-CIGM-LUe.js. */
import type { Dynamic } from "../interop/legacy-dynamic";
import {
  BaseCollapsiblePanel,
  BaseCollapsibleRoot,
  BaseCollapsibleTrigger,
  React,
  UiOverlaysAndIconsCustomIcon,
  clsx,
  originalJsxProps,
  originalJsxsProps,
  resolveUiDesignSystemValue2,
  resolveUiOverlaysAndIconsValue2,
} from "./dependencies";
import {
  disclosurePanelClasses,
  useDisclosurePanelRef,
} from "./presentation";

var CollapsibleRef: Dynamic;

var CollapsibleStyles: Dynamic;

var CollapsibleStyles2: Dynamic;

var CollapsibleCaretPosition: Dynamic;

var CollapsibleState: Dynamic;

var CollapsibleRef2: Dynamic;

var Collapsible: Dynamic;

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeCollapsibleStep1(): void {
  CollapsibleRef = (0, React.forwardRef)(
    (
      input?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => (
      <BaseCollapsibleRoot
        {...originalJsxProps({
          ref: options,
          "data-cds": `Collapsible`,
          ...input,
        })}
      />
    ),
  );
  CollapsibleRef.displayName = `Collapsible.Root`;
  CollapsibleStyles = `cds-reset group/clp inline-flex w-fit items-center gap-1.5 border-0 select-none outline-none focus-visible:outline-hidden font-sans text-body font-normal text-secondary hover:text-primary transition-shadow duration-fast focus-visible:shadow-focus rounded data-[disabled]:opacity-disabled data-[disabled]:pointer-events-none`;
  CollapsibleStyles2 = `shrink-0 transition-transform rtl:rotate-180 group-data-[panel-open]/clp:rotate-90`;
  CollapsibleCaretPosition = (0, React.forwardRef)(
    (
      {
        className: input,
        children: input2,
        caretPosition: input3,
        hideCaret: input4,
        render: input5,
        ...input6
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value: Dynamic = resolveUiOverlaysAndIconsValue2(input6.onMouseDown);
      let value2: Dynamic = input4 ? null : (
        <UiOverlaysAndIconsCustomIcon
          name={`CaretRight`}
          size={`sm`}
          className={clsx(
            CollapsibleStyles2,
            input3 === `end` && `ms-auto`,
          )}
        />
      );
      return input5 ? (
        <BaseCollapsibleTrigger
          {...originalJsxProps({
            ref: options,
            render: input5,
            className: input,
            ...input6,
            onMouseDown: value,
          })}
        />
      ) : (
        <BaseCollapsibleTrigger
          {...originalJsxsProps({
            ref: options,
            ...input6,
            className: resolveUiDesignSystemValue2(CollapsibleStyles, input),
            onMouseDown: value,
            children: [
              input3 !== `end` && value2,
              input2,
              input3 === `end` && value2,
            ],
          })}
        />
      );
    },
  );
  CollapsibleCaretPosition.displayName = `Collapsible.Trigger`;
  CollapsibleState = `${disclosurePanelClasses} [--cds-disclosure-panel-height:var(--collapsible-panel-height)]`;
  CollapsibleRef2 = (0, React.forwardRef)(
    (
      { className: input, ...input2 }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value: Dynamic = useDisclosurePanelRef(options);
      return (
        <BaseCollapsiblePanel
          {...originalJsxProps({
            ref: value,
            ...input2,
            className: resolveUiDesignSystemValue2(CollapsibleState, input),
          })}
        />
      );
    },
  );
  CollapsibleRef2.displayName = `Collapsible.Panel`;
  Collapsible = {
    Root: CollapsibleRef,
    Trigger: CollapsibleCaretPosition,
    Panel: CollapsibleRef2,
  };
}

export { Collapsible };
