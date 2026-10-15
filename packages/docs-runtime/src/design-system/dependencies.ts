/** BaoCut: dependencies from cds-CIGM-LUe.js. */
import type { Dynamic } from "../interop/legacy-dynamic";

import { originalJsxProps, originalJsxsProps } from "../react-runtime/jsx-runtime";

import * as npmDependency1 from "#base-ui/internals/labelable-provider/LabelableProvider.mjs";

import * as npmDependency0 from "@base-ui/react";

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

const BaseLabelableProvider: Dynamic = (npmDependency1 as Dynamic)
  .LabelableProvider;

const BaseCollapsibleRoot: Dynamic = (npmDependency0).Collapsible
  .Root;

const BaseCollapsibleTrigger: Dynamic = (npmDependency0).Collapsible
  .Trigger;

const BaseCollapsiblePanel: Dynamic = (npmDependency0).Collapsible
  .Panel;

const BaseFieldRoot: Dynamic = (npmDependency0).Field.Root;

const BaseFieldLabel: Dynamic = (npmDependency0).Field.Label;

const BaseFieldError: Dynamic = (npmDependency0).Field.Error;

const BaseFieldDescription: Dynamic = (npmDependency0).Field
  .Description;

const BaseFieldControl: Dynamic = (npmDependency0).Field.Control;

const BaseMenuCheckboxItem: Dynamic = (npmDependency0).Menu
  .CheckboxItem;

const BaseMenuGroup: Dynamic = (npmDependency0).Menu.Group;

const BaseMenuGroupLabel: Dynamic = (npmDependency0).Menu.GroupLabel;

const BaseMenuItem: Dynamic = (npmDependency0).Menu.Item;

const BaseMenuPopup: Dynamic = (npmDependency0).Menu.Popup;

const BaseMenuPortal: Dynamic = (npmDependency0).Menu.Portal;

const BaseMenuRoot: Dynamic = (npmDependency0).Menu.Root;

const BaseMenuSubmenuRoot: Dynamic = (npmDependency0).Menu
  .SubmenuRoot;

const BaseMenuTrigger: Dynamic = (npmDependency0).Menu.Trigger;

const BaseSeparator = (npmDependency0).Separator;

const BaseMenuSubmenuTrigger: Dynamic = (npmDependency0).Menu
  .SubmenuTrigger;

const BaseContextMenuRoot: Dynamic = (npmDependency0).ContextMenu
  .Root;

const BaseContextMenuTrigger: Dynamic = (npmDependency0).ContextMenu
  .Trigger;

const BaseMenubar = (npmDependency0).Menubar;

const BasePopoverPositioner: Dynamic = (npmDependency0).Popover
  .Positioner;

const BasePopoverPopup: Dynamic = (npmDependency0).Popover.Popup;

const BasePopoverArrow: Dynamic = (npmDependency0).Popover.Arrow;

const BasePopoverTitle: Dynamic = (npmDependency0).Popover.Title;

const BasePopoverDescription: Dynamic = (npmDependency0).Popover
  .Description;

const BasePopoverClose: Dynamic = (npmDependency0).Popover.Close;

const BasePopoverBackdrop: Dynamic = (npmDependency0).Popover
  .Backdrop;

const BaseButton = (npmDependency0).Button;

const BaseComboboxBackdrop: Dynamic = (npmDependency0).Combobox
  .Backdrop;

const BaseSwitchRoot: Dynamic = (npmDependency0).Switch.Root;

const BaseSwitchThumb: Dynamic = (npmDependency0).Switch.Thumb;

const BaseRadioRoot: Dynamic = (npmDependency0).Radio.Root;

const BaseRadioGroup = (npmDependency0).RadioGroup;

const BaseToastProvider: Dynamic = (npmDependency0).Toast.Provider;

const BaseToastViewport: Dynamic = (npmDependency0).Toast.Viewport;

const BaseToastRoot: Dynamic = (npmDependency0).Toast.Root;

const BaseToastDescription: Dynamic = (npmDependency0).Toast
  .Description;

const BaseToastTitle: Dynamic = (npmDependency0).Toast.Title;

const BaseToastClose: Dynamic = (npmDependency0).Toast.Close;

const BaseToastPortal: Dynamic = (npmDependency0).Toast.Portal;

const BaseToastuseToastManager: Dynamic = (npmDependency0).Toast
  .useToastManager;

const BasePopoverRoot: Dynamic = (npmDependency0).Popover.Root;

const BasePopoverTrigger: Dynamic = (npmDependency0).Popover.Trigger;

const BasePopoverPortal: Dynamic = (npmDependency0).Popover.Portal;

const BasePopovercreateHandle: Dynamic = (npmDependency0).Popover
  .createHandle;

const BaseMenuBackdrop: Dynamic = (npmDependency0).Menu.Backdrop;

const BaseMenuPositioner: Dynamic = (npmDependency0).Menu.Positioner;

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
  clsx as appKDImport,
  mergeProps as appKEImport,
  useLabelableContext as appLCImport2,
  cva as appTImport2,
  useRender as appWEImport,
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
};

/** Semantic exports; legacy adapter names remain available above. */
export { clsx, cva, mergeProps, useLabelableContext, useRender };
