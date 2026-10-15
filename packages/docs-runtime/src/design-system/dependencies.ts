/** BaoCut: dependencies from cds-CIGM-LUe.js. */
import type { Dynamic } from "../interop/legacy-dynamic";

import { originalJsxProps, originalJsxsProps } from "../react-runtime/jsx-runtime";

import {
  LabelableProvider as BaseLabelableProvider,
} from "#base-ui/internals/labelable-provider/LabelableProvider.mjs";

import * as baseUiModule from "@base-ui/react";
import {
  Separator as BaseSeparator,
  Menubar as BaseMenubar,
  Button as BaseButton,
  RadioGroup as BaseRadioGroup,
} from "@base-ui/react";

import {
  createLiveModuleNamespace as moduleNamespace,
  toModuleNamespace,
} from "../boot/module-runtime";

import {
  Button,
  CdsLayer,
  Checkbox,
  clsx,
  collectUiShortcutsAndSizingModifiers2,
  createSafeMutationObserver,
  createSafeResizeObserver,
  cva,
  DisabledReasonTooltip,
  installUiTooltipsAndControlsValue,
  isUiLinksAndFoundationToLowerCase,
  isUiLinksAndFoundationValue,
  isUiShortcutsAndSizingValue,
  loadJsxRuntime,
  loadReact,
  loadReactDom,
  mergeProps,
  OverflowTooltip,
  resolvePlatformLoadingAndStatusResolve,
  resolveUiDesignSystemValue2,
  resolveUiLinksAndFoundationHref,
  resolveUiLinksAndFoundationItContainsAControlCharacter,
  resolveUiLinksAndFoundationNoreferrer,
  resolveUiLinksAndFoundationUseContext3,
  resolveUiLinksAndFoundationValue,
  resolveUiLinksAndFoundationValue17,
  resolveUiLinksAndFoundationValue18,
  resolveUiLinksAndFoundationValue19,
  resolveUiLinksAndFoundationValue3,
  resolveUiLinksAndFoundationValue4,
  resolveUiLinksAndFoundationValue5,
  resolveUiLinksAndFoundationValue6,
  resolveUiLinksAndFoundationValue9,
  resolveUiLinksAndFoundationWindow,
  resolveUiOverlaysAndIconsValue,
  resolveUiOverlaysAndIconsValue2,
  resolveUiOverlaysAndIconsValue3,
  resolveUiOverlaysAndIconsValue4,
  resolveUiOverlaysAndIconsValue5,
  resolveUiOverlaysAndIconsValue6,
  resolveUiOverlaysAndIconsValue9,
  resolveUiProviderAndLayersBase,
  resolveUiProviderAndLayersBase2,
  resolveUiProviderAndLayersCdsPageBg,
  resolveUiProviderAndLayersDataSize,
  resolveUiProviderAndLayersLight,
  resolveUiProviderAndLayersUseContext10,
  resolveUiProviderAndLayersUseContext2,
  resolveUiProviderAndLayersUseContext6,
  resolveUiProviderAndLayersUseContext7,
  resolveUiProviderAndLayersUseContext9,
  resolveUiProviderAndLayersValue2,
  resolveUiProviderAndLayersValue3,
  resolveUiTooltipsAndControlsClose,
  resolveUiTooltipsAndControlsMatches,
  resolveUiTooltipsAndControlsUseContext2,
  resolveUiTooltipsAndControlsValue3,
  resolveUiTooltipsAndControlsValue5,
  Tooltip,
  TooltipGroup,
  TooltipImplProvider,
  UiDesignSystemUseLayoutEffect,
  UiLinksAndFoundationCreateContext3,
  uiLinksAndFoundationOnClickOnPointerEnterOnPointerLeaveOnPointerDownValues,
  UiLinksAndFoundationStyles,
  UiLinksAndFoundationStyles2,
  UiOverlaysAndIconsActionsRef,
  UiOverlaysAndIconsCreateContext,
  UiOverlaysAndIconsCreateContext2,
  UiOverlaysAndIconsCreateContext3,
  UiOverlaysAndIconsCreateContext4,
  UiOverlaysAndIconsCreateContext6,
  UiOverlaysAndIconsCustomIcon,
  UiOverlaysAndIconsDataCdsOverlay,
  UiOverlaysAndIconsIcon,
  UiOverlaysAndIconsStyles,
  UiOverlaysAndIconsSurface,
  UiProviderAndLayersCreateContext13,
  UiProviderAndLayersCreateContext8,
  uiProviderAndLayersValue9000,
  UiShortcutsAndSizingCreateContext3,
  UiShortcutsAndSizingDataMode,
  UiShortcutsAndSizingKeys,
  UiShortcutsAndSizingMinW0BreakWords,
  UiShortcutsAndSizingOverride,
  UiShortcutsAndSizingPx2Py15,
  UiShortcutsAndSizingReason,
  UiShortcutsAndSizingStyles12,
  UiShortcutsAndSizingStyles13,
  UiShortcutsAndSizingStyles14,
  UiTooltipsAndControlsChecked,
  UiTooltipsAndControlsLight,
  UiTooltipsAndControlsLight2,
  UiTooltipsAndControlsPanel,
  UiTooltipsAndControlsStyles6,
  updateUiLinksAndFoundationSubscribe,
  updateUiTooltipsAndControlsValue,
  useLabelableContext,
  useRender,
  useTooltipGroup,
  useUiLinksAndFoundationUseSyncExternalStore,
  useUiLinksAndFoundationUseSyncExternalStore3,
  useUiLinksAndFoundationUseSyncExternalStore4,
  useUiLinksAndFoundationUseSyncExternalStore5,
  useUiOverlaysAndIconsUseInsertionEffect,
  useUiOverlaysAndIconsUseInsertionEffect2,
  useUiShortcutsAndSizingUseSyncExternalStore,
  useUiTooltipsAndControlsFinalFocus,
  useUiTooltipsAndControlsState,
  useUiTooltipsAndControlsUnpan,
} from "../platform/index";

import { preloadModule } from "../boot/preload";

const BaseCollapsibleRoot: Dynamic = (baseUiModule).Collapsible
  .Root;

const BaseCollapsibleTrigger: Dynamic = (baseUiModule).Collapsible
  .Trigger;

const BaseCollapsiblePanel: Dynamic = (baseUiModule).Collapsible
  .Panel;

const BaseFieldRoot: Dynamic = (baseUiModule).Field.Root;

const BaseFieldLabel: Dynamic = (baseUiModule).Field.Label;

const BaseFieldError: Dynamic = (baseUiModule).Field.Error;

const BaseFieldDescription: Dynamic = (baseUiModule).Field
  .Description;

const BaseFieldControl: Dynamic = (baseUiModule).Field.Control;

const BaseMenuCheckboxItem: Dynamic = (baseUiModule).Menu
  .CheckboxItem;

const BaseMenuGroup: Dynamic = (baseUiModule).Menu.Group;

const BaseMenuGroupLabel: Dynamic = (baseUiModule).Menu.GroupLabel;

const BaseMenuItem: Dynamic = (baseUiModule).Menu.Item;

const BaseMenuPopup: Dynamic = (baseUiModule).Menu.Popup;

const BaseMenuPortal: Dynamic = (baseUiModule).Menu.Portal;

const BaseMenuRoot: Dynamic = (baseUiModule).Menu.Root;

const BaseMenuSubmenuRoot: Dynamic = (baseUiModule).Menu
  .SubmenuRoot;

const BaseMenuTrigger: Dynamic = (baseUiModule).Menu.Trigger;

const BaseMenuSubmenuTrigger: Dynamic = (baseUiModule).Menu
  .SubmenuTrigger;

const BaseContextMenuRoot: Dynamic = (baseUiModule).ContextMenu
  .Root;

const BaseContextMenuTrigger: Dynamic = (baseUiModule).ContextMenu
  .Trigger;

const BasePopoverPositioner: Dynamic = (baseUiModule).Popover
  .Positioner;

const BasePopoverPopup: Dynamic = (baseUiModule).Popover.Popup;

const BasePopoverArrow: Dynamic = (baseUiModule).Popover.Arrow;

const BasePopoverTitle: Dynamic = (baseUiModule).Popover.Title;

const BasePopoverDescription: Dynamic = (baseUiModule).Popover
  .Description;

const BasePopoverClose: Dynamic = (baseUiModule).Popover.Close;

const BasePopoverBackdrop: Dynamic = (baseUiModule).Popover
  .Backdrop;

const BaseComboboxBackdrop: Dynamic = (baseUiModule).Combobox
  .Backdrop;

const BaseSwitchRoot: Dynamic = (baseUiModule).Switch.Root;

const BaseSwitchThumb: Dynamic = (baseUiModule).Switch.Thumb;

const BaseRadioRoot: Dynamic = (baseUiModule).Radio.Root;

const BaseToastProvider: Dynamic = (baseUiModule).Toast.Provider;

const BaseToastViewport: Dynamic = (baseUiModule).Toast.Viewport;

const BaseToastRoot: Dynamic = (baseUiModule).Toast.Root;

const BaseToastDescription: Dynamic = (baseUiModule).Toast
  .Description;

const BaseToastTitle: Dynamic = (baseUiModule).Toast.Title;

const BaseToastClose: Dynamic = (baseUiModule).Toast.Close;

const BaseToastPortal: Dynamic = (baseUiModule).Toast.Portal;

const BaseToastuseToastManager: Dynamic = (baseUiModule).Toast
  .useToastManager;

const BasePopoverRoot: Dynamic = (baseUiModule).Popover.Root;

const BasePopoverTrigger: Dynamic = (baseUiModule).Popover.Trigger;

const BasePopoverPortal: Dynamic = (baseUiModule).Popover.Portal;

const BasePopovercreateHandle: Dynamic = (baseUiModule).Popover
  .createHandle;

const BaseMenuBackdrop: Dynamic = (baseUiModule).Menu.Backdrop;

const BaseMenuPositioner: Dynamic = (baseUiModule).Menu.Positioner;

var React: Dynamic = toModuleNamespace(loadReact());

var jsxRuntime: Dynamic = loadJsxRuntime();

export {
  BaseButton,
  BaseCollapsiblePanel,
  BaseCollapsibleRoot,
  BaseCollapsibleTrigger,
  BaseComboboxBackdrop,
  BaseContextMenuRoot,
  BaseContextMenuTrigger,
  BaseFieldControl,
  BaseFieldDescription,
  BaseFieldError,
  BaseFieldLabel,
  BaseFieldRoot,
  BaseLabelableProvider,
  BaseMenuBackdrop,
  BaseMenuCheckboxItem,
  BaseMenuGroup,
  BaseMenuGroupLabel,
  BaseMenuItem,
  BaseMenuPopup,
  BaseMenuPortal,
  BaseMenuPositioner,
  BaseMenuRoot,
  BaseMenuSubmenuRoot,
  BaseMenuSubmenuTrigger,
  BaseMenuTrigger,
  BaseMenubar,
  BasePopoverArrow,
  BasePopoverBackdrop,
  BasePopoverClose,
  BasePopoverDescription,
  BasePopoverPopup,
  BasePopoverPortal,
  BasePopoverPositioner,
  BasePopoverRoot,
  BasePopoverTitle,
  BasePopoverTrigger,
  BasePopovercreateHandle,
  BaseRadioGroup,
  BaseRadioRoot,
  BaseSeparator,
  BaseSwitchRoot,
  BaseSwitchThumb,
  BaseToastClose,
  BaseToastDescription,
  BaseToastPortal,
  BaseToastProvider,
  BaseToastRoot,
  BaseToastTitle,
  BaseToastViewport,
  BaseToastuseToastManager,
  Button,
  CdsLayer,
  Checkbox,
  DisabledReasonTooltip,
  OverflowTooltip,
  React,
  Tooltip,
  TooltipGroup,
  TooltipImplProvider,
  UiDesignSystemUseLayoutEffect,
  UiLinksAndFoundationCreateContext3,
  UiLinksAndFoundationStyles,
  UiLinksAndFoundationStyles2,
  UiOverlaysAndIconsActionsRef,
  UiOverlaysAndIconsCreateContext,
  UiOverlaysAndIconsCreateContext2,
  UiOverlaysAndIconsCreateContext3,
  UiOverlaysAndIconsCreateContext4,
  UiOverlaysAndIconsCreateContext6,
  UiOverlaysAndIconsCustomIcon,
  UiOverlaysAndIconsDataCdsOverlay,
  UiOverlaysAndIconsIcon,
  UiOverlaysAndIconsStyles,
  UiOverlaysAndIconsSurface,
  UiProviderAndLayersCreateContext13,
  UiProviderAndLayersCreateContext8,
  UiShortcutsAndSizingCreateContext3,
  UiShortcutsAndSizingDataMode,
  UiShortcutsAndSizingKeys,
  UiShortcutsAndSizingMinW0BreakWords,
  UiShortcutsAndSizingOverride,
  UiShortcutsAndSizingPx2Py15,
  UiShortcutsAndSizingReason,
  UiShortcutsAndSizingStyles12,
  UiShortcutsAndSizingStyles13,
  UiShortcutsAndSizingStyles14,
  UiTooltipsAndControlsChecked,
  UiTooltipsAndControlsLight,
  UiTooltipsAndControlsLight2,
  UiTooltipsAndControlsPanel,
  UiTooltipsAndControlsStyles6,
  collectUiShortcutsAndSizingModifiers2,
  createSafeMutationObserver,
  createSafeResizeObserver,
  installUiTooltipsAndControlsValue,
  isUiLinksAndFoundationToLowerCase,
  isUiLinksAndFoundationValue,
  isUiShortcutsAndSizingValue,
  jsxRuntime,
  loadReactDom,
  moduleNamespace,
  originalJsxProps,
  originalJsxsProps,
  preloadModule,
  resolvePlatformLoadingAndStatusResolve,
  resolveUiDesignSystemValue2,
  resolveUiLinksAndFoundationHref,
  resolveUiLinksAndFoundationItContainsAControlCharacter,
  resolveUiLinksAndFoundationNoreferrer,
  resolveUiLinksAndFoundationUseContext3,
  resolveUiLinksAndFoundationValue,
  resolveUiLinksAndFoundationValue17,
  resolveUiLinksAndFoundationValue18,
  resolveUiLinksAndFoundationValue19,
  resolveUiLinksAndFoundationValue3,
  resolveUiLinksAndFoundationValue4,
  resolveUiLinksAndFoundationValue5,
  resolveUiLinksAndFoundationValue6,
  resolveUiLinksAndFoundationValue9,
  resolveUiLinksAndFoundationWindow,
  resolveUiOverlaysAndIconsValue,
  resolveUiOverlaysAndIconsValue2,
  resolveUiOverlaysAndIconsValue3,
  resolveUiOverlaysAndIconsValue4,
  resolveUiOverlaysAndIconsValue5,
  resolveUiOverlaysAndIconsValue6,
  resolveUiOverlaysAndIconsValue9,
  resolveUiProviderAndLayersBase,
  resolveUiProviderAndLayersBase2,
  resolveUiProviderAndLayersCdsPageBg,
  resolveUiProviderAndLayersDataSize,
  resolveUiProviderAndLayersLight,
  resolveUiProviderAndLayersUseContext10,
  resolveUiProviderAndLayersUseContext2,
  resolveUiProviderAndLayersUseContext6,
  resolveUiProviderAndLayersUseContext7,
  resolveUiProviderAndLayersUseContext9,
  resolveUiProviderAndLayersValue2,
  resolveUiProviderAndLayersValue3,
  resolveUiTooltipsAndControlsClose,
  resolveUiTooltipsAndControlsMatches,
  resolveUiTooltipsAndControlsUseContext2,
  resolveUiTooltipsAndControlsValue3,
  resolveUiTooltipsAndControlsValue5,
  toModuleNamespace,
  uiLinksAndFoundationOnClickOnPointerEnterOnPointerLeaveOnPointerDownValues,
  uiProviderAndLayersValue9000,
  updateUiLinksAndFoundationSubscribe,
  updateUiTooltipsAndControlsValue,
  useTooltipGroup,
  useUiLinksAndFoundationUseSyncExternalStore,
  useUiLinksAndFoundationUseSyncExternalStore3,
  useUiLinksAndFoundationUseSyncExternalStore4,
  useUiLinksAndFoundationUseSyncExternalStore5,
  useUiOverlaysAndIconsUseInsertionEffect,
  useUiOverlaysAndIconsUseInsertionEffect2,
  useUiShortcutsAndSizingUseSyncExternalStore,
  useUiTooltipsAndControlsFinalFocus,
  useUiTooltipsAndControlsState,
  useUiTooltipsAndControlsUnpan,
  clsx,
  cva,
  mergeProps,
  useLabelableContext,
  useRender,
};
