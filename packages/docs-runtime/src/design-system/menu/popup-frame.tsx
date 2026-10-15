/** BaoCut: menu popup frame from cds-CIGM-LUe.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  BaseMenuPopup,
  BaseMenuPositioner,
  React,
  UiOverlaysAndIconsSurface,
  UiProviderAndLayersCreateContext13,
  UiShortcutsAndSizingOverride,
  UiTooltipsAndControlsPanel,
  originalJsxProps,
  resolveUiDesignSystemValue2,
  resolveUiOverlaysAndIconsValue4,
  resolveUiProviderAndLayersValue3,
  resolveUiTooltipsAndControlsValue3,
  useUiTooltipsAndControlsFinalFocus,
} from "../dependencies";
import { SheetsValue } from "../sheets/stack";
import {
  MenuInteractionsHeader,
  useMenuInteractionsIsOpen2,
  useMenuInteractionsPreventScroll,
} from "./interactions";

var MenuPopupsPopover: Dynamic;

var MenuPopupsAnchor: Dynamic;

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeMenuPopupFrameStep1(): void {
  MenuPopupsPopover = `cds-reset draggable-none group/menu-popup relative flex flex-col min-w-[128px] max-w-[320px] max-h-[var(--available-height)] ${resolveUiTooltipsAndControlsValue3(`popover`)} text-body font-normal text-primary outline-none focus-visible:outline-hidden`;
  MenuPopupsAnchor = (0, React.forwardRef)(
    (
      {
        anchor: input,
        side: input2,
        align: input3,
        sideOffset: input4,
        collisionPadding: input5,
        finalFocus: input6,
        className: input7,
        children: input8,
        "data-cds": input9,
        ...input10
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let { finalFocus: value, popupRef: value2 }: Dynamic =
        useUiTooltipsAndControlsFinalFocus({
          registerOpenerReturn: input6 == null,
        });
      useMenuInteractionsPreventScroll(value2);
      let value3: Dynamic = resolveUiProviderAndLayersValue3(`contextmenu`);
      let { elementRef: value4, overlayAttrs: value5 }: Dynamic =
        useMenuInteractionsIsOpen2();
      let value6: Dynamic = resolveUiOverlaysAndIconsValue4(
        options,
        value2,
        value4,
      );
      return (
        <SheetsValue>
        <UiOverlaysAndIconsSurface
            {...originalJsxProps({
              ...value3.portalProps,
              surface: UiTooltipsAndControlsPanel.popover,
              companionModalCatcher: true,
              closeOnActivityHide: true,
              children: (
                <UiShortcutsAndSizingOverride
                  override={input5}
                  provideInherit={true}
                >
                {(
                    input11?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic => (
                    <UiProviderAndLayersCreateContext13.Provider
                      value={value3.base}
                    >
                    <BaseMenuPositioner
                        style={value3.style}
                        anchor={input}
                        side={input2}
                        align={input3}
                        sideOffset={input4}
                        collisionPadding={input11}
                      >
                      <BaseMenuPopup
                          {...originalJsxProps({
                            "data-cds": input9,
                            ...value5,
                            ref: value6,
                            finalFocus: input6 ?? value,
                            ...input10,
                            className: resolveUiDesignSystemValue2(
                              MenuPopupsPopover,
                              input7,
                            ),
                            children: (
                              <MenuInteractionsHeader>
                              {input8}
                            </MenuInteractionsHeader>
                            ),
                          })}
                        />
                    </BaseMenuPositioner>
                  </UiProviderAndLayersCreateContext13.Provider>
                  )}
              </UiShortcutsAndSizingOverride>
              ),
            })}
          />
      </SheetsValue>
      );
    },
  );
  MenuPopupsAnchor.displayName = `ContextMenuPopupFrame`;
}

export { MenuPopupsAnchor, MenuPopupsPopover };
