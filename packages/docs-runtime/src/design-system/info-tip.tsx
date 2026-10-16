/** BaoCut: info tip from cds-CIGM-LUe.js. */
import type { Dynamic } from "../interop/legacy-dynamic";
import {
  React,
  UiOverlaysAndIconsCustomIcon,
  UiShortcutsAndSizingDataMode,
  UiShortcutsAndSizingMinW0BreakWords,
  UiShortcutsAndSizingPx2Py15,
  UiShortcutsAndSizingStyles12,
  UiShortcutsAndSizingStyles13,
  UiShortcutsAndSizingStyles14,
  resolveUiDesignSystemValue2,
  resolveUiLinksAndFoundationUseContext3,
} from "./dependencies";
import { SheetsAuto } from "./sheets/geometry";
import { Popover } from "./popover";
import type * as ReactComponentTypes from "react";

export const InfoTip: ReactComponentTypes.FC<Dynamic> = ({
  content: input,
  "aria-label": input2,
  icon: input7 = `Info`,
  size: input8 = `sm`,
  side: input9 = `top`,
  align: input10 = `center`,
  sideOffset: input11 = 6,
  delay: input12 = 300,
  open: input3,
  onOpenChange: input4,
  className: input5,
  popupClassName: input6,
}) => {
  let value: Dynamic = resolveUiLinksAndFoundationUseContext3(`moreInfo`, `More info`);
  let value2: Dynamic = input2 || value;
  let value3: Dynamic = (0, React.useCallback)(
    (input13?: Dynamic, ..._extraArguments: unknown[]): Dynamic => input4?.(input13),
    [input4],
  );
  let state: Dynamic = {
    name: input7,
    size: input8,
  };
  return (
    <SheetsAuto.Provider value={`anchored`}>
      <Popover.Root open={input3} onOpenChange={value3}>
        <Popover.Trigger
          data-cds={`InfoTip`}
          type={`button`}
          aria-label={value2}
          openOnHover={true}
          delay={input12}
          className={resolveUiDesignSystemValue2(SwitchStylesStyles5, input5)}
        >
          <UiOverlaysAndIconsCustomIcon {...state} />
        </Popover.Trigger>
        <Popover.Popup
          aria-label={value2}
          side={input9}
          align={input10}
          sideOffset={input11}
          padding={`none`}
          scrollFade={false}
          className={resolveUiDesignSystemValue2(SwitchStylesState, input6)}
        >
          <UiShortcutsAndSizingDataMode>
            <span className={SwitchStylesState2}>{input}</span>
          </UiShortcutsAndSizingDataMode>
        </Popover.Popup>
      </Popover.Root>
    </SheetsAuto.Provider>
  );
};

var SwitchStylesStyles5: Dynamic;

var SwitchStylesState: Dynamic;

var SwitchStylesState2: Dynamic;

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeInfoTipStep1(): void {
  SwitchStylesStyles5 = `cds-reset inline-flex shrink-0 items-center justify-center rounded p-1 -m-1 text-muted outline-none transition-colors duration-fast hover:text-secondary focus-visible:text-secondary focus-visible:shadow-focus data-[popup-open]:text-secondary`;
  SwitchStylesState = `${UiShortcutsAndSizingStyles12} ${UiShortcutsAndSizingStyles14} ${UiShortcutsAndSizingStyles13}`;
  SwitchStylesState2 = `block ${UiShortcutsAndSizingPx2Py15} ${UiShortcutsAndSizingMinW0BreakWords}`;
}
