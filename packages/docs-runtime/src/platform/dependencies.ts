/** BaoCut: dependencies from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../interop/legacy-dynamic";
import {
  originalElementProps,
  originalJsxProps,
  originalJsxsProps,
} from "../react-runtime/jsx-runtime";

// BaoCut: KaTeX 字体随包输出，由父页面读取缓存，沿用 loadFonts 传入沙箱。
import KATEX_FONT_CSS from "virtual:katex-font-css";
import { createKatexFontLoader } from "../fonts/katex-fonts";
import { useStore, useAtomValue } from "jotai/react";
import { atom, createStore, getDefaultStore } from "jotai/vanilla";
import {
  INTERNAL_isPromiseLike,
  INTERNAL_shouldThrowSynchronously,
  INTERNAL_getBuildingBlocksRev3,
  INTERNAL_buildStoreRev3,
} from "jotai/vanilla/internals";
import { useStore as useStore2, create } from "zustand";
import { createStore as createStore2 } from "zustand/vanilla";
import { DialogRoot } from "#base-ui/dialog/root/DialogRoot.mjs";
import { createAlertDialogHandle } from "#base-ui/alert-dialog/handle.mjs";
import { AlertDialogTrigger } from "#base-ui/alert-dialog/trigger/AlertDialogTrigger.mjs";
import { DialogTrigger } from "#base-ui/dialog/trigger/DialogTrigger.mjs";
import { DialogTitle } from "#base-ui/dialog/title/DialogTitle.mjs";
import { DialogPortal } from "#base-ui/dialog/portal/DialogPortal.mjs";
import { DialogPopup } from "#base-ui/dialog/popup/DialogPopup.mjs";
import { DialogDescription } from "#base-ui/dialog/description/DialogDescription.mjs";
import { DialogClose } from "#base-ui/dialog/close/DialogClose.mjs";
import { DialogBackdrop } from "#base-ui/dialog/backdrop/DialogBackdrop.mjs";
import { AlertDialogRoot } from "#base-ui/alert-dialog/root/AlertDialogRoot.mjs";
import { useCheckboxGroupContext } from "#base-ui/checkbox-group/CheckboxGroupContext.mjs";
import { getCheckboxStateAttributesMapping } from "#base-ui/checkbox/utils/getCheckboxStateAttributesMapping.mjs";
import { getDefaultFormSubmitter } from "#base-ui-utils/getDefaultFormSubmitter.mjs";
import { useOpenMethodTriggerProps, useOpenInteractionType } from "#base-ui/utils/useOpenInteractionType.mjs";
import { useValueChanged } from "#base-ui/internals/useValueChanged.mjs";
import { useScrollLock } from "#base-ui-utils/useScrollLock.mjs";
import * as internalBackdropModule from "#base-ui/utils/InternalBackdrop.mjs";
const InternalBackdrop: Dynamic = (internalBackdropModule as Dynamic).InternalBackdrop;

import {
  HOME,
  COMPOSITE_KEYS,
  SHIFT,
  MODIFIER_KEYS,
  isNativeInput,
  scrollIntoViewIfNeeded,
} from "#base-ui/internals/composite/composite.mjs";
import { useRegisterFieldControl } from "#base-ui/internals/field-register-control/useRegisterFieldControl.mjs";
import { useFieldsetRootContext } from "#base-ui/fieldset/root/FieldsetRootContext.mjs";
import { useFormContext } from "#base-ui/internals/form-context/FormContext.mjs";
import { FieldRootContext, useFieldRootContext } from "#base-ui/internals/field-root-context/FieldRootContext.mjs";
import { DEFAULT_VALIDITY_STATE, fieldValidityMapping } from "#base-ui/internals/field-constants/constants.mjs";
import { useAriaLabelledBy } from "#base-ui/internals/labelable-provider/useAriaLabelledBy.mjs";
import { LabelableContext, useLabelableContext } from "#base-ui/internals/labelable-provider/LabelableContext.mjs";
import { createTooltipHandle } from "#base-ui/tooltip/store/TooltipHandle.mjs";
import { inertValue } from "#base-ui-utils/inertValue.mjs";
import { TooltipProvider } from "#base-ui/tooltip/provider/TooltipProvider.mjs";
import { TooltipPopup } from "#base-ui/tooltip/popup/TooltipPopup.mjs";
import { TooltipPositioner } from "#base-ui/tooltip/positioner/TooltipPositioner.mjs";
import { usePositioner } from "#base-ui/utils/usePositioner.mjs";
import { getDisabledMountTransitionStyles } from "#base-ui/internals/getDisabledMountTransitionStyles.mjs";
import { useAnchorPositioning } from "#base-ui/internals/useAnchorPositioning.mjs";
import { useDirection } from "#base-ui/internals/direction-context/DirectionContext.mjs";
import { TooltipPortal } from "#base-ui/tooltip/portal/TooltipPortal.mjs";
import * as floatingPortalLiteModule from "#base-ui/utils/FloatingPortalLite.mjs";
const FloatingPortalLite: Dynamic = (floatingPortalLiteModule as Dynamic).FloatingPortalLite;

import { TooltipTrigger } from "#base-ui/tooltip/trigger/TooltipTrigger.mjs";
import {
  triggerOpenStateMapping,
  pressableTriggerOpenStateMapping,
  popupStateMapping,
  popupTransitionStateMapping,
} from "#base-ui/utils/popupStateMapping.mjs";
import { TooltipRoot } from "#base-ui/tooltip/root/TooltipRoot.mjs";
import { NullStore } from "#base-ui/utils/NullStore.mjs";
import { safePolygon } from "#base-ui/floating-ui-react/safePolygon.mjs";
import { useHoverReferenceInteraction } from "#base-ui/floating-ui-react/hooks/useHoverReferenceInteraction.mjs";
import { useHoverFloatingInteraction } from "#base-ui/floating-ui-react/hooks/useHoverFloatingInteraction.mjs";
import { useFocus } from "#base-ui/floating-ui-react/hooks/useFocus.mjs";
import { usePopupHandleStore } from "#base-ui/utils/popups/usePopupHandleStore.mjs";
import {
  createInitialPopupStoreState,
  createPopupFloatingRootContext,
  popupStoreSelectors,
} from "#base-ui/utils/popups/store.mjs";
import { PopupTriggerMap } from "#base-ui/utils/popups/popupTriggerMap.mjs";
import {
  FOCUSABLE_POPUP_PROPS,
  createDefaultInitialFocus,
  usePopupRootStore,
  PopupHandleAttachment,
  useTriggerRegistration,
  setPopupOpenState,
  attachPreventUnmountOnClose,
  useTriggerDataForwarding,
  useImplicitActiveTrigger,
  useOpenStateTransitions,
  usePopupInteractionProps,
  usePopupRootSync,
} from "#base-ui/utils/popups/popupStoreUtils.mjs";
import { useSyncedFloatingRootContext } from "#base-ui/floating-ui-react/hooks/useSyncedFloatingRootContext.mjs";
import { ReactStore } from "#base-ui-utils/store/ReactStore.mjs";
import { useStore as useStore3 } from "#base-ui-utils/store/useStore.mjs";
import * as useSyncExternalStoreShimModule from "use-sync-external-store/shim";
import { BasePopupHandle } from "#base-ui/utils/popups/popupHandle.mjs";
import { useDismiss } from "#base-ui/floating-ui-react/hooks/useDismiss.mjs";
import { useClick } from "#base-ui/floating-ui-react/hooks/useClick.mjs";
import * as floatingFocusManagerModule from "#base-ui/floating-ui-react/components/FloatingFocusManager.mjs";
const FloatingFocusManager: Dynamic = (floatingFocusManagerModule as Dynamic).FloatingFocusManager;

import { useFloatingParentNodeId, useFloatingTree, useFloatingNodeId } from "#base-ui/floating-ui-react/components/FloatingTree.mjs";
import * as floatingNodeModule from "#base-ui/floating-ui-react/components/FloatingTree.mjs";
const FloatingNode: Dynamic = (floatingNodeModule as Dynamic).FloatingNode;
const FloatingTree: Dynamic = (floatingNodeModule as Dynamic).FloatingTree;

import { FloatingTreeStore } from "#base-ui/floating-ui-react/components/FloatingTreeStore.mjs";
import * as floatingPortalModule from "#base-ui/floating-ui-react/components/FloatingPortal.mjs";
const FloatingPortal: Dynamic = (floatingPortalModule as Dynamic).FloatingPortal;

import {
  CLICK_TRIGGER_IDENTIFIER,
  BASE_UI_SWIPE_IGNORE_SELECTOR,
  LEGACY_SWIPE_IGNORE_SELECTOR,
  DROPDOWN_COLLISION_AVOIDANCE,
  POPUP_COLLISION_AVOIDANCE,
} from "#base-ui/internals/constants.mjs";
import { enqueueFocus } from "#base-ui/floating-ui-react/utils/enqueueFocus.mjs";
import {
  getNextTabbable,
  getTabbableAfterElement,
  getTabbableBeforeElement,
  isOutsideEvent,
} from "#base-ui/floating-ui-react/utils/tabbable.mjs";
import {
  isIndexOutOfListBounds,
  getMinListIndex,
  getMaxListIndex,
  findNonDisabledListIndex,
  isListIndexDisabled,
  isElementVisible,
} from "#base-ui/floating-ui-react/utils/composite.mjs";
import * as focusGuardModule from "#base-ui/utils/FocusGuard.mjs";
const FocusGuard: Dynamic = (focusGuardModule as Dynamic).FocusGuard;

import { visuallyHidden, visuallyHiddenInput } from "#base-ui-utils/visuallyHidden.mjs";
import { mergeCleanups } from "#base-ui-utils/mergeCleanups.mjs";
import {
  isTypeableCombobox,
  matchesFocusVisible,
  getFloatingFocusElement,
} from "#base-ui/floating-ui-react/utils/element.mjs";
import { activeElement, contains, getTarget } from "#base-ui/internals/shadowDom.mjs";
import {
  ARROW_LEFT,
  ARROW_RIGHT,
  ARROW_UP,
  ARROW_DOWN,
  ARROW_UP as ARROW_UP2,
  ARROW_DOWN as ARROW_DOWN2,
  ARROW_LEFT as ARROW_LEFT2,
  ARROW_RIGHT as ARROW_RIGHT2,
} from "#base-ui/floating-ui-react/utils/constants.mjs";
import { stopEvent, isVirtualClick, isVirtualPointerEvent } from "#base-ui/floating-ui-react/utils/event.mjs";
import { jsdom } from "#base-ui-utils/platform/env.mjs";
import { voiceOver } from "#base-ui-utils/platform/screen-reader.mjs";
import { webkit } from "#base-ui-utils/platform/engine.mjs";
import { mac } from "#base-ui-utils/platform/os.mjs";
import { Timeout, useTimeout } from "#base-ui-utils/useTimeout.mjs";
import { fastComponent, fastComponentRef } from "#base-ui-utils/fastHooks.mjs";
import { useOpenChangeComplete } from "#base-ui/internals/useOpenChangeComplete.mjs";
import { useAnimationsFinished } from "#base-ui/internals/useAnimationsFinished.mjs";
import { useValueAsRef } from "#base-ui-utils/useValueAsRef.mjs";
import { addEventListener as addEventListener2 } from "#base-ui-utils/addEventListener.mjs";
import { useButton } from "#base-ui/internals/use-button/useButton.mjs";
import { dispatchClickWithModifiers } from "#base-ui/utils/dispatchClickWithModifiers.mjs";
import { ownerDocument } from "#base-ui-utils/owner.mjs";
import {
  CompositeRootContext,
  useCompositeRootContext,
} from "#base-ui/internals/composite/root/CompositeRootContext.mjs";
import { getWindow, isElement, isHTMLElement, isLastTraversableNode, getParentNode } from "@floating-ui/utils/dom";
import { TransitionStatusDataAttributes, transitionStatusMapping } from "#base-ui/internals/stateAttributesMapping.mjs";
import { useTransitionStatus } from "#base-ui/internals/useTransitionStatus.mjs";
import { AnimationFrame, useAnimationFrame } from "#base-ui-utils/useAnimationFrame.mjs";
import { useOnMount } from "#base-ui-utils/useOnMount.mjs";
import { createChangeEventDetails } from "#base-ui/internals/createBaseUIEventDetails.mjs";
import {
  none,
  triggerPress,
  triggerHover,
  triggerFocus,
  outsidePress,
  itemPress,
  closePress,
  focusOut,
  escapeKey,
  listNavigation,
  cancelOpen,
  siblingOpen,
  imperativeAction,
} from "#base-ui/internals/reason-parts.mjs";
import { useBaseUiId } from "#base-ui/internals/useBaseUiId.mjs";
import { useId } from "#base-ui-utils/useId.mjs";
import { useIsoLayoutEffect } from "#base-ui-utils/useIsoLayoutEffect.mjs";
import { useStableCallback } from "#base-ui-utils/useStableCallback.mjs";
import { useControlled } from "#base-ui-utils/useControlled.mjs";
import { useRender } from "#base-ui/use-render/useRender.mjs";
import { useRenderElement } from "#base-ui/internals/useRenderElement.mjs";
import { mergeProps } from "#base-ui/merge-props/mergeProps.mjs";
import { resolveStyle } from "#base-ui/utils/resolveStyle.mjs";
import { NOOP, EMPTY_ARRAY, EMPTY_OBJECT } from "#base-ui-utils/empty.mjs";
import { useMergedRefs } from "#base-ui-utils/useMergedRefs.mjs";
import { useRefWithInit } from "#base-ui-utils/useRefWithInit.mjs";
import baseUiUtils from "#base-ui-utils/formatErrorMessage.mjs";
import { PARENT_CHECKBOX, CheckboxRoot } from "#base-ui/checkbox/root/CheckboxRoot.mjs";
import { CheckboxRootContext } from "#base-ui/checkbox/root/CheckboxRootContext.mjs";
import { Dropcursor, Gapcursor, Placeholder, TrailingNode, UndoRedo } from "@tiptap/extensions";
import { closeHistory, history as history2, undo, redo } from "prosemirror-history";
import RopeSequence from "rope-sequence";
import { GapCursor, gapCursor } from "prosemirror-gapcursor";
import { dropCursor } from "prosemirror-dropcursor";
import {
  createChainableState,
  CommandManager,
  commands,
  getNodeType,
  isRegExp,
  objectIncludes,
  getMarkRange,
  getMarkType,
  isTextSelection,
  minMax,
  resolveFocusPosition,
  isAndroid,
  isiOS,
  isSafari,
  elementFromString,
  createNodeFromContent,
  selectionToInsertionEnd,
  isMacOS,
  isNodeActive,
  getSchemaTypeNameByName,
  deleteProps,
  createDocument,
  getMarkAttributes,
  combineTransactionSteps,
  defaultBlockAt,
  findChildren,
  findChildrenInRange,
  findParentNodeClosestToPos,
  findParentNode,
  getExtensionField,
  flattenExtensions,
  getHTMLFromFragment,
  isFunction,
  callOrReturn,
  isEmptyObject,
  splitExtensions,
  getAttributesFromExtensions,
  mergeAttributes,
  getRenderedAttributes,
  fromString,
  injectExtensionAttributesToParseRule,
  getSchemaByResolvedExtensions,
  findDuplicates,
  sortExtensions,
  resolveExtensions,
  getSchema,
  getTextBetween,
  getText,
  getTextSerializersFromSchema,
  getNodeAttributes,
  getAttributes,
  removeDuplicates,
  getChangedRanges,
  getMarksBetween,
  getNodeAtPosition,
  getSchemaTypeByName,
  getSplittedAttributes,
  getTextContentFromNodes,
  isMarkActive,
  isActive,
  isAtEndOfNode,
  isAtStartOfNode,
  isExtensionRulesEnabled,
  isList,
  isNodeEmpty,
  isNodeSelection,
  MappablePosition,
  getUpdatedPosition,
  createMappablePosition,
  InputRule,
  inputRulesPlugin,
  isPlainObject,
  mergeDeep,
  Extendable,
  Mark,
  isNumber,
  PasteRule,
  pasteRulesPlugin,
  Extension,
  NodePos,
  createStyleTag,
  Editor,
  markInputRule,
  nodeInputRule,
  textblockTypeInputRule,
  wrappingInputRule,
  canInsertNode,
  escapeForRegEx,
  parseAttributes,
  serializeAttributes,
  createAtomBlockMarkdownSpec,
  createBlockMarkdownSpec,
  createInlineMarkdownSpec,
  parseIndentedBlocks,
  renderNestedMarkdownContent,
  updateMarkViewAttributes,
  Node as Node2,
  markPasteRule,
} from "@tiptap/core";
import { keymap, keydownHandler } from "prosemirror-keymap";
import { keyName, base as baseKeyNames, shift as shiftedKeyNames } from "w3c-keyname";
import { wrapInList, wrapRangeInList, liftListItem, sinkListItem } from "prosemirror-schema-list";
import {
  deleteSelection,
  joinBackward,
  selectNodeBackward,
  joinForward,
  selectNodeForward,
  joinUp,
  joinDown,
  lift,
  newlineInCode,
  exitCode,
  createParagraphNear,
  liftEmptyBlock,
  splitBlock,
  selectParentNode,
  selectAll,
  selectTextblockStart,
  selectTextblockEnd,
  wrapIn,
  setBlockType,
  chainCommands,
  pcBaseKeymap,
  macBaseKeymap,
} from "prosemirror-commands";
import { ySyncPluginKey } from "y-prosemirror";
import { simpleDiffString } from "lib0/diff";
import { Awareness, encodeAwarenessUpdate, applyAwarenessUpdate, removeAwarenessStates } from "y-protocols/awareness";
import { Decoration, DecorationSet, EditorView } from "prosemirror-view";
import {
  Selection,
  SelectionRange,
  TextSelection,
  NodeSelection,
  AllSelection,
  Transaction,
  EditorState,
  Plugin,
  PluginKey,
} from "prosemirror-state";
import * as proseMirrorTransformModule from "prosemirror-transform";
import {
  MapResult,
  StepMap,
  Mapping,
  Step,
  StepResult,
  AddMarkStep,
  RemoveMarkStep,
  AddNodeMarkStep,
  RemoveNodeMarkStep,
  ReplaceStep,
  ReplaceAroundStep,
  liftTarget,
  findWrapping,
  canSplit,
  canJoin,
  joinPoint,
  dropPoint,
  replaceStep,
  AttrStep,
  DocAttrStep,
  Transform,
} from "prosemirror-transform";
import {
  Fragment,
  Mark as Mark2,
  ReplaceError,
  Slice,
  ResolvedPos,
  NodeRange,
  Node as Node3,
  ContentMatch,
  NodeType,
  MarkType,
  Schema,
  DOMParser as DOMParser2,
  DOMSerializer,
} from "prosemirror-model";
import OrderedMap from "orderedmap";
import {
  Doc,
  applyUpdate,
  encodeStateAsUpdate,
  encodeStateVector,
  mergeUpdates,
  encodeStateVectorFromUpdate,
  XmlElement,
  XmlText,
  GC,
  ContentDeleted,
  ContentFormat,
  ContentAny,
  ContentString,
  ContentType,
  Item,
} from "yjs";
import { toBase64, encodeAny } from "lib0/buffer";
import { createDecoder, readVarUint8Array, readVarUint, peekVarUint } from "lib0/decoding";
import { unexpectedCase } from "lib0/error";
import { BITS29 } from "lib0/binary";
import { createEncoder, length, toUint8Array, writeVarUint, writeVarUint8Array } from "lib0/encoding";
import { cva } from "class-variance-authority";
import { extendTailwindMerge, validators, twMerge } from "tailwind-merge";
import { clsx } from "clsx";
import { $ZodError, _safeParse } from "zod/v4/core";
import {
  string,
  number,
  int,
  boolean,
  null as value_null,
  unknown,
  never,
  date,
  array,
  object,
  strictObject,
  looseObject,
  union,
  discriminatedUnion,
  tuple,
  record,
  partialRecord,
  enum as value_enum,
  literal,
  templateLiteral,
  lazy,
  custom,
  json,
  preprocess,
  iso,
} from "zod";
import * as reactDomModule from "react-dom";
import * as jsxRuntimeModule from "react/jsx-runtime";
import * as reactModule from "react";
import {
  createLiveModuleNamespace,
  initializeCommonJS,
} from "../boot/module-runtime";
import {
  adoptEarlyHello,
  canContactShell,
  createFrameMessagePort,
  DEFAULT_SHELL_ORIGINS,
  disposePrewarmWorker,
  FRAME_STORE,
  FRAME_TIMING_DETAIL_KEYS,
  FRAME_TIMING_PHASES,
  frameHostEnvironment,
  FrameOfflineError,
  frameTimings,
  isFrameArtifact as inFrame,
  isFrameOfflineError,
  isSafeFrameToken,
  isTrustedClaudeOrigin,
  knownShellOrigin,
  NO_SHELL_ORIGIN_REASON,
  recordFramePhase,
  recordHostStart,
  shellOriginFromWindow,
  subscribeFrameTimings,
  takePrewarmWorker,
  waitForShellOrigin,
  watchShellOrigin,
} from "../boot/environment";

// BaoCut: 独立页面的批注宿主（globalThis.docsHost），见 docs-host.ts。
import { standaloneCommentAnchors, standaloneDocsHost } from "../host/docs-host";
import { preloadModule } from "../boot/preload";

const loadKatexFontCss = createKatexFontLoader(KATEX_FONT_CSS);

const Namespace = useSyncExternalStoreShimModule;

const TransformError = (proseMirrorTransformModule as typeof proseMirrorTransformModule & { TransformError: ErrorConstructor }).TransformError;

const ReactDOM = reactDomModule;

const loadReactDom = (..._extraArguments: unknown[]) =>
  reactDomModule;

const jsxRuntime = jsxRuntimeModule;

const loadJsxRuntime = (..._extraArguments: unknown[]) =>
  jsxRuntimeModule;

const React = reactModule;

const loadReact = (..._extraArguments: unknown[]) =>
  reactModule;

export {
  $ZodError,
  ARROW_DOWN,
  ARROW_LEFT,
  ARROW_RIGHT,
  ARROW_UP,
  AddMarkStep,
  AddNodeMarkStep,
  AlertDialogRoot,
  AlertDialogTrigger,
  AllSelection,
  AnimationFrame,
  AttrStep,
  Awareness,
  BASE_UI_SWIPE_IGNORE_SELECTOR,
  BITS29,
  BasePopupHandle,
  CLICK_TRIGGER_IDENTIFIER,
  COMPOSITE_KEYS,
  CheckboxRoot,
  CompositeRootContext,
  ContentAny,
  ContentDeleted,
  ContentFormat,
  ContentString,
  ContentType,
  DEFAULT_VALIDITY_STATE,
  DOMParser2,
  DOMSerializer,
  DROPDOWN_COLLISION_AVOIDANCE,
  Decoration,
  DecorationSet,
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogPopup,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  Doc,
  DocAttrStep,
  Dropcursor,
  EMPTY_ARRAY,
  EMPTY_OBJECT,
  Editor,
  EditorState,
  Extension,
  FOCUSABLE_POPUP_PROPS,
  FieldRootContext,
  FloatingFocusManager,
  FloatingNode,
  FloatingPortal,
  FloatingPortalLite,
  FloatingTree,
  FloatingTreeStore,
  FocusGuard,
  Fragment,
  GC,
  GapCursor,
  Gapcursor,
  HOME,
  InputRule,
  InternalBackdrop,
  Item,
  LEGACY_SWIPE_IGNORE_SELECTOR,
  LabelableContext,
  MODIFIER_KEYS,
  Mapping,
  Mark,
  NOOP,
  Namespace,
  Node2,
  Node3,
  NodeRange,
  NodeSelection,
  NullStore,
  POPUP_COLLISION_AVOIDANCE,
  Placeholder,
  Plugin,
  PluginKey,
  PopupHandleAttachment,
  PopupTriggerMap,
  React,
  ReactDOM,
  ReactStore,
  RemoveMarkStep,
  RemoveNodeMarkStep,
  ReplaceAroundStep,
  ReplaceStep,
  SHIFT,
  Schema,
  Selection,
  SelectionRange,
  Slice,
  Step,
  StepResult,
  TextSelection,
  Timeout,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TrailingNode,
  Transform,
  TransitionStatusDataAttributes,
  UndoRedo,
  XmlElement,
  XmlText,
  _safeParse,
  activeElement,
  addEventListener2,
  applyAwarenessUpdate,
  applyUpdate,
  array,
  atom,
  attachPreventUnmountOnClose,
  baseKeyNames,
  baseUiUtils,
  boolean,
  callOrReturn,
  canInsertNode,
  canJoin,
  canSplit,
  cancelOpen,
  closeHistory,
  closePress,
  clsx,
  combineTransactionSteps,
  commands,
  contains,
  create,
  createAlertDialogHandle,
  createChangeEventDetails,
  createDecoder,
  createDefaultInitialFocus,
  createEncoder,
  createInitialPopupStoreState,
  createPopupFloatingRootContext,
  createStore,
  createStore2,
  createTooltipHandle,
  custom,
  cva,
  date,
  discriminatedUnion,
  dispatchClickWithModifiers,
  dropPoint,
  encodeAny,
  encodeAwarenessUpdate,
  encodeStateAsUpdate,
  encodeStateVector,
  encodeStateVectorFromUpdate,
  enqueueFocus,
  escapeForRegEx,
  escapeKey,
  extendTailwindMerge,
  fastComponent,
  fastComponentRef,
  fieldValidityMapping,
  findChildren,
  findChildrenInRange,
  findNonDisabledListIndex,
  findParentNode,
  findParentNodeClosestToPos,
  findWrapping,
  focusOut,
  getAttributes,
  getChangedRanges,
  getDisabledMountTransitionStyles,
  getExtensionField,
  getFloatingFocusElement,
  getMarksBetween,
  getMaxListIndex,
  getMinListIndex,
  getNextTabbable,
  getNodeAtPosition,
  getNodeType,
  getParentNode,
  getRenderedAttributes,
  getSchema,
  getSplittedAttributes,
  getTabbableAfterElement,
  getTabbableBeforeElement,
  getTarget,
  getTextBetween,
  getTextSerializersFromSchema,
  getWindow,
  imperativeAction,
  inFrame,
  inertValue,
  int,
  isAndroid,
  isAtEndOfNode,
  isAtStartOfNode,
  isElement,
  isElementVisible,
  isHTMLElement,
  isIndexOutOfListBounds,
  isLastTraversableNode,
  isListIndexDisabled,
  isMacOS,
  isNativeInput,
  isNodeActive,
  isNodeSelection,
  isOutsideEvent,
  isTypeableCombobox,
  isVirtualClick,
  isVirtualPointerEvent,
  isiOS,
  iso,
  itemPress,
  jsdom,
  json,
  jsxRuntime,
  keyName,
  keydownHandler,
  keymap,
  lazy,
  length,
  liftTarget,
  listNavigation,
  literal,
  loadJsxRuntime,
  loadKatexFontCss,
  loadReact,
  loadReactDom,
  looseObject,
  mac,
  markInputRule,
  markPasteRule,
  matchesFocusVisible,
  mergeAttributes,
  mergeCleanups,
  mergeProps,
  mergeUpdates,
  never,
  nodeInputRule,
  none,
  number,
  object,
  originalElementProps,
  originalJsxProps,
  originalJsxsProps,
  outsidePress,
  ownerDocument,
  parseIndentedBlocks,
  partialRecord,
  peekVarUint,
  popupStateMapping,
  popupStoreSelectors,
  popupTransitionStateMapping,
  preprocess,
  pressableTriggerOpenStateMapping,
  readVarUint,
  readVarUint8Array,
  record,
  renderNestedMarkdownContent,
  replaceStep,
  resolveStyle,
  safePolygon,
  scrollIntoViewIfNeeded,
  setBlockType,
  setPopupOpenState,
  shiftedKeyNames,
  siblingOpen,
  simpleDiffString,
  standaloneCommentAnchors,
  standaloneDocsHost,
  stopEvent,
  strictObject,
  string,
  templateLiteral,
  textblockTypeInputRule,
  toBase64,
  toUint8Array,
  transitionStatusMapping,
  triggerFocus,
  triggerHover,
  triggerOpenStateMapping,
  triggerPress,
  tuple,
  twMerge,
  unexpectedCase,
  union,
  unknown,
  useAnchorPositioning,
  useAnimationFrame,
  useAnimationsFinished,
  useAriaLabelledBy,
  useAtomValue,
  useBaseUiId,
  useButton,
  useClick,
  useCompositeRootContext,
  useControlled,
  useDirection,
  useDismiss,
  useFieldRootContext,
  useFieldsetRootContext,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
  useFocus,
  useFormContext,
  useHoverFloatingInteraction,
  useHoverReferenceInteraction,
  useId,
  useImplicitActiveTrigger,
  useIsoLayoutEffect,
  useLabelableContext,
  useMergedRefs,
  useOnMount,
  useOpenChangeComplete,
  useOpenInteractionType,
  useOpenMethodTriggerProps,
  useOpenStateTransitions,
  usePopupHandleStore,
  usePopupInteractionProps,
  usePopupRootStore,
  usePopupRootSync,
  usePositioner,
  useRefWithInit,
  useRegisterFieldControl,
  useRender,
  useRenderElement,
  useScrollLock,
  useStableCallback,
  useStore2,
  useStore3,
  useSyncedFloatingRootContext,
  useTimeout,
  useTransitionStatus,
  useTriggerDataForwarding,
  useTriggerRegistration,
  useValueAsRef,
  useValueChanged,
  validators,
  value_enum,
  value_null,
  visuallyHidden,
  visuallyHiddenInput,
  voiceOver,
  webkit,
  wrapInList,
  wrapRangeInList,
  wrappingInputRule,
  writeVarUint,
  writeVarUint8Array,
  ySyncPluginKey,
  DEFAULT_SHELL_ORIGINS,
  FRAME_STORE,
  FRAME_TIMING_DETAIL_KEYS,
  FRAME_TIMING_PHASES,
  FrameOfflineError,
  NO_SHELL_ORIGIN_REASON,
  adoptEarlyHello,
  canContactShell,
  createFrameMessagePort,
  createLiveModuleNamespace,
  disposePrewarmWorker,
  frameHostEnvironment,
  frameTimings,
  initializeCommonJS,
  isFrameOfflineError,
  isSafeFrameToken,
  isTrustedClaudeOrigin,
  knownShellOrigin,
  preloadModule,
  recordFramePhase,
  recordHostStart,
  shellOriginFromWindow,
  subscribeFrameTimings,
  takePrewarmWorker,
  waitForShellOrigin,
  watchShellOrigin,
};
