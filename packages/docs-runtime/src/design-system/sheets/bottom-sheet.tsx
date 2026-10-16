/** bottom-sheet.impl: restored from BottomSheet.impl-CAaQPhpT.js. */

import type { Dynamic } from "../../interop/legacy-dynamic";
import { toModuleNamespace } from "../../boot/module-runtime";
import {
  Button,
  loadJsxRuntime,
  loadReact,
  resolvePlatformSyncAndRoutingValue10,
  resolveUiDesignSystemValue2,
  UiDialogsOpen,
  UiDialogsRoot,
  UiDialogsRoot2,
} from "../../platform/index";
import {
  BOTTOM_SHEET_CLEAR_PROPERTY,
  BOTTOM_SHEET_SCRIM_CLASS,
  PHONE_TOUCH_TARGET_CLASS as SHEET_CONTROL_CLASS,
} from "../../document-app/index";
import type * as ReactComponentTypes from "react";
import { useRef, useState } from "react";
import type {
  DialogPopupProps,
  DialogRootChangeEventDetails,
} from "@base-ui/react/dialog";
import type { ConfirmationDialogProps } from "../../platform/ui/dialogs";

export type BottomSheetCloseReason = "backdrop" | "escape" | "close" | "swipe";
export interface BottomSheetProps {
  shouldClose?: (reason: BottomSheetCloseReason) => boolean | void;
  onClose: (reason: BottomSheetCloseReason) => void;
  title: ReactComponentTypes.ReactNode;
  titleHidden?: boolean;
  leading?: ReactComponentTypes.ReactNode;
  trailing?: ReactComponentTypes.ReactNode;
  children?: ReactComponentTypes.ReactNode;
  footer?: ReactComponentTypes.ReactNode;
  bodyClassName?: string;
  bottomInset?: number;
  closeLabel?: string;
  detent?: "content" | "high" | "tall";
  onHeightChange?: (height: number) => void;
  initialFocus?: DialogPopupProps["initialFocus"];
  finalFocus?: DialogPopupProps["finalFocus"];
  "data-testid"?: string;
  "data-mode"?: string;
}

export const BottomSheet: ReactComponentTypes.FC<BottomSheetProps> = ({
  shouldClose: shouldClose,
  onClose: onClose,
  title: title,
  titleHidden = false,
  leading: leading,
  trailing: trailing,
  children: children,
  footer: footer,
  bodyClassName: bodyClassName,
  bottomInset = 0,
  closeLabel: closeLabel,
  detent = `content`,
  onHeightChange: onHeightChange,
  initialFocus: initialFocus,
  finalFocus: finalFocus,
  "data-testid": dataTestid,
  "data-mode": dataMode,
}) => {
  let popupRef: Dynamic = (0, React.useRef)(null);
  let openRef = useRef(onHeightChange);
  openRef.current = onHeightChange;
  let observerRef: Dynamic = (0, React.useRef)(null);
  let [popupElement, setPopupElement]: Dynamic = (0, React.useState)(null);
  let setPopupRef: Dynamic = (0, React.useCallback)(
    (bottomSheet?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      observerRef.current?.disconnect();
      observerRef.current = null;
      popupRef.current = bottomSheet;
      setPopupElement(bottomSheet);
      if (!bottomSheet || !openRef.current) return;
      let bottomSheetResult: number = -1;
      let bottomSheetHandler = (..._extraArguments: unknown[]): undefined => {
        let offsetHeight: Dynamic = bottomSheet.offsetHeight;
        if (offsetHeight !== bottomSheetResult) {
          bottomSheetResult = offsetHeight;
          openRef.current?.(offsetHeight);
        }
      };
      bottomSheetHandler();
      if (!(typeof ResizeObserver === "undefined")) {
        observerRef.current = new (ResizeObserver as Dynamic)(bottomSheetHandler);
        observerRef.current.observe(bottomSheet);
      }
    },
    [],
  );
  let [closeReason, setCloseReason]: Dynamic = (0, React.useState)(null);
  let closingPromiseRef: Dynamic = (0, React.useRef)(null);
  let mountedRef: Dynamic = (0, React.useRef)(true);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => (
      (mountedRef.current = true),
      (..._extraArguments: unknown[]): undefined => {
        mountedRef.current = false;
      }
    ),
    [],
  );
  let shouldCloseRef = useRef(shouldClose);
  shouldCloseRef.current = shouldClose;
  let onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  let requestClose: Dynamic = (0, React.useCallback)(
    (bottomSheet: BottomSheetCloseReason, ..._extraArguments: unknown[]): boolean =>
      closingPromiseRef.current === null
        ? shouldCloseRef.current?.(bottomSheet) === false
          ? false
          : ((closingPromiseRef.current = bottomSheet), setCloseReason(bottomSheet), true)
        : true,
    [],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (closeReason === null) return;
      let popup: Dynamic = popupRef.current;
      let enabled: boolean = false;
      let bottomSheetHandler = (..._extraArguments: unknown[]): undefined => {
        if (!enabled) {
          enabled = true;
          onCloseRef.current(closeReason);
          (window as Dynamic).setTimeout((..._extraArguments: unknown[]): undefined => {
            if (!(!mountedRef.current || closingPromiseRef.current !== closeReason)) {
              closingPromiseRef.current = null;
              setCloseReason(null);
            }
          }, SHEET_CLOSE_MS);
        }
      };
      let computedStyle: Dynamic = popup ? getComputedStyle(popup) : null;
      if (
        !popup ||
        !computedStyle ||
        computedStyle.transitionProperty === `none` ||
        !(parseFloat(computedStyle.transitionDuration) > 0)
      ) {
        bottomSheetHandler();
        return;
      }
      let bottomSheetHandler2 = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (event.target === popup && event.propertyName === `translate`) {
          bottomSheetHandler();
        }
      };
      popup.addEventListener(`transitionend`, bottomSheetHandler2);
      let setTimeout: Dynamic = (window as Dynamic).setTimeout(
        bottomSheetHandler,
        SHEET_OPEN_MS,
      );
      return (..._extraArguments: unknown[]): undefined => {
        popup.removeEventListener(`transitionend`, bottomSheetHandler2);
        (window as Dynamic).clearTimeout(setTimeout);
      };
    },
    [closeReason],
  );
  let [visible, setVisible]: Dynamic = (0, React.useState)(true);
  let notClosing: boolean = closeReason === null;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!notClosing) return;
      setVisible(true);
      let setTimeout: Dynamic = (window as Dynamic).setTimeout(
        (..._extraArguments: unknown[]): Dynamic => setVisible(false),
        500,
      );
      return (..._extraArguments: unknown[]): Dynamic =>
        (window as Dynamic).clearTimeout(setTimeout);
    },
    [notClosing],
  );
  let dragHandlers: Dynamic = useSwipeToClose(popupRef, requestClose);
  useSheetClearance(popupElement, bottomInset, closeReason === null);
  usePreventFocusScroll(popupElement);
  let hasBottomInset: boolean = bottomInset > 0;
  let insetStyle: Dynamic = hasBottomInset
    ? {
        bottom: bottomInset,
        maxHeight: `calc(90dvh - ${bottomInset}px)`,
      }
    : undefined;
  return (
    <UiDialogsRoot.Root
      open={true}
      onOpenChange={(
        bottomSheet: boolean,
        options: DialogRootChangeEventDetails,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (bottomSheet) return;
        let reason: Dynamic = options.reason;
        if (!(reason === `escape-key` && options.event?.defaultPrevented)) {
          requestClose(
            reason === `outside-press`
              ? `backdrop`
              : reason === `escape-key`
                ? `escape`
                : `close`,
          );
        }
      }}
    >
      <UiDialogsRoot.Popup
        ref={setPopupRef}
        unstyled={true}
        surface={`surface-3`}
        initialFocus={initialFocus ?? popupRef}
        finalFocus={finalFocus ?? isKeyboardInteraction}
        data-testid={dataTestid}
        data-mode={dataMode}
        data-bottom-sheet={``}
        data-closing={closeReason ?? undefined}
        backdropClassName={resolveUiDesignSystemValue2(
          SHEET_BACKDROP_CLASS,
          closeReason !== null && `opacity-0`,
        )}
        className={resolveUiDesignSystemValue2(
          SHEET_POPUP_CLASS,
          hasBottomInset && `before:top-[calc(100%-var(--cds-ring-inner,1px))]`,
          detent === `tall` && `h-[88dvh]`,
          detent === `high` && `h-[75dvh]`,
          closeReason !== null && [SHEET_EXIT_CLASS, `pointer-events-none`],
        )}
        style={insetStyle}
      >
        <div
          {...dragHandlers}
          className={`flex min-h-control shrink-0 touch-none items-center gap-sm px-4 pt-4 pb-2 select-none`}
          data-testid={`bottom-sheet-header`}
        >
          {leading !== undefined && (
            <span className={`flex shrink-0 items-center`}>{leading}</span>
          )}
          {
            <UiDialogsRoot.Title
              className={resolveUiDesignSystemValue2(
                `text-heading min-w-0 flex-1 truncate font-semibold`,
                titleHidden && `sr-only`,
              )}
            >
              {title}
            </UiDialogsRoot.Title>
          }
          {titleHidden && <span className={`flex-1`} aria-hidden={true} />}
          {trailing !== undefined && (
            <span className={`flex shrink-0 items-center`}>{trailing}</span>
          )}
        </div>
        <div
          className={resolveUiDesignSystemValue2(
            `min-h-0 flex-1 overflow-y-auto overscroll-contain rounded-[inherit] px-4`,
            bodyClassName,
          )}
          data-testid={`bottom-sheet-body`}
        >
          {children}
        </div>
        {footer !== undefined && <div className={`shrink-0 px-4 pt-2`}>{footer}</div>}
        <SheetCloseButton label={closeLabel} />
        <SheetSafeAreaFoot folded={hasBottomInset} />
        {visible && notClosing && (
          <div
            role={`presentation`}
            aria-hidden={true}
            data-testid={`bottom-sheet-arriving`}
            className={`absolute inset-0`}
            onPointerDown={(event?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              event.preventDefault()
            }
            onMouseDown={(event?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              event.preventDefault()
            }
          />
        )}
      </UiDialogsRoot.Popup>
    </UiDialogsRoot.Root>
  );
};

export const PhonePopupContent: ReactComponentTypes.FC<Dynamic> = ({
  Ns: Ns,
  popupRef: popupRef,
  portalClassName: portalClassName,
  backdropClassName: backdropClassName,
  touchActions: touchActions,
  rest: rest,
  children: children,
}) => {
  let popupRef2: Dynamic = (0, React.useRef)(null);
  let [popupElement, setPopupElement]: Dynamic = (0, React.useState)(null);
  useSheetClearance(popupElement, 0, true);
  usePreventFocusScroll(popupElement);
  let closeButtonRef: Dynamic = (0, React.useRef)(null);
  let dragHandlers: Dynamic = useSwipeToClose(
    popupRef2,
    (0, React.useCallback)(
      (..._extraArguments: unknown[]): boolean => (closeButtonRef.current?.click(), true),
      [],
    ),
  );
  let setPopupRef: Dynamic = (0, React.useCallback)(
    (phonePopupContent?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      popupRef2.current = phonePopupContent;
      setPopupElement(phonePopupContent);
      if (typeof popupRef == `function`) {
        popupRef(phonePopupContent);
      } else {
        if (popupRef) {
          popupRef.current = phonePopupContent;
        }
      }
    },
    [popupRef],
  );
  return (
    <Ns.Popup
      {...rest}
      ref={setPopupRef}
      unstyled={true}
      surface={`surface-3`}
      data-bottom-sheet={``}
      portalClassName={portalClassName}
      backdropClassName={resolveUiDesignSystemValue2(
        SHEET_BACKDROP_CLASS,
        backdropClassName,
      )}
      className={SHEET_POPUP_CLASS}
    >
      {<SheetDragStrip drag={dragHandlers} />}
      {
        <div
          className={resolveUiDesignSystemValue2(
            `isolate flex min-h-0 flex-1 flex-col overflow-y-auto rounded-[inherit] px-xl pt-sm pb-xl`,
            touchActions && `[&_[data-cds=Button]:not([data-cds-icon-only])]:min-h-11`,
          )}
        >
          {children}
        </div>
      }
      {<Ns.Close ref={closeButtonRef} hidden={true} tabIndex={-1} aria-hidden={true} />}
      {<SheetSafeAreaFoot />}
    </Ns.Popup>
  );
};

export const PhoneConfirmationDialog: ReactComponentTypes.FC<ConfirmationDialogProps> = (props) => {
  let phone: Dynamic = resolvePlatformSyncAndRoutingValue10();
  let [pending, setPending] = useState(false);
  let confirmRef: Dynamic = (0, React.useRef)(null);
  let cancelRef: Dynamic = (0, React.useRef)(null);
  let confirmedRef = useRef(false);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (props.open) {
        confirmedRef.current = false;
      }
    },
    [props.open],
  );
  if (!phone) return <UiDialogsOpen {...props} />;
  let {
    open: props2,
    onOpenChange: props3,
    title: props4,
    description: props5,
    confirmLabel: props9 = `Confirm`,
    cancelLabel: props10 = `Cancel`,
    confirmVariant: props11 = `primary`,
    initialFocus: props12 = `confirm`,
    disabled: props13 = false,
    portalClassName: props6,
    onConfirm: props7,
    closeOnConfirm: props14 = false,
    children: props8,
  } = props;
  let confirm = async (..._extraArguments: unknown[]): Promise<undefined> => {
    if (pending || props13 || !props2 || confirmedRef.current) return;
    let phoneConfirmationDialogResult: Promise<unknown>;
    try {
      phoneConfirmationDialogResult = Promise.resolve(props7());
    } catch (phoneConfirmationDialogResult2) {
      phoneConfirmationDialogResult = Promise.reject(phoneConfirmationDialogResult2);
    }
    if (props14) {
      confirmedRef.current = true;
      props3(false, {
        reason: `confirm`,
      });
      return;
    }
    setPending(true);
    try {
      await phoneConfirmationDialogResult;
    } finally {
      setPending(false);
    }
  };
  return (
    <UiDialogsRoot2.Root
      open={props2}
      onOpenChange={(
        phoneConfirmationDialog: boolean,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (!(pending || !props2)) {
          props3(phoneConfirmationDialog, {
            reason: `dismiss`,
          });
        }
      }}
    >
      <PhoneDialogPopup
        kind={`alert`}
        portalClassName={props6}
        initialFocus={props12 === `cancel` ? confirmRef : cancelRef}
        data-testid={`phone-confirmation-sheet`}
      >
        <UiDialogsRoot2.Header showClose={false} description={props5}>
          {props4}
        </UiDialogsRoot2.Header>
        {props8}
        <UiDialogsRoot2.Footer align={`end`}>
          <UiDialogsRoot2.Close
            ref={confirmRef}
            disabled={pending}
            render={<Button>{props10}</Button>}
          />
          <Button
            ref={cancelRef}
            variant={props11}
            busy={pending}
            disabled={props13}
            onClick={(..._extraArguments: unknown[]): undefined => void confirm()}
            onKeyDown={(event: ReactComponentTypes.KeyboardEvent<HTMLButtonElement>, ..._extraArguments: unknown[]): undefined => {
              if (event.repeat && (event.key === `Enter` || event.key === ` `)) {
                event.preventDefault();
              }
            }}
          >
            {props9}
          </Button>
        </UiDialogsRoot2.Footer>
      </PhoneDialogPopup>
    </UiDialogsRoot2.Root>
  );
};

export const SheetCloseButton: ReactComponentTypes.FC<{ label?: string }> = ({ label: label }) => {
  return (
    <UiDialogsRoot.Close
      render={
        <button
          type={`button`}
          data-testid={`bottom-sheet-close`}
          className={`cds-reset text-body text-primary focus-visible:bg-fill-ghost-hover mx-3 mb-1 block min-h-control shrink-0 rounded px-2 text-start outline-none select-none focus-visible:outline-hidden [&:not(:focus-visible)]:sr-only`}
        >
          {label ?? `Close`}
        </button>
      }
    />
  );
};

export const SheetDragStrip: ReactComponentTypes.FC<{
  drag?: ReactComponentTypes.HTMLAttributes<HTMLDivElement>;
}> = ({ drag: drag }) => {
  return (
    <div
      aria-hidden={true}
      data-testid={`bottom-sheet-drag-strip`}
      {...drag}
      className={`min-h-5 shrink-0 touch-none select-none`}
    />
  );
};

export const SheetSafeAreaFoot: ReactComponentTypes.FC<{ folded?: boolean }> = ({
  folded = false,
}) => {
  return (
    <div
      aria-hidden={true}
      data-testid={`bottom-sheet-foot`}
      className={folded ? `h-0 shrink-0` : SAFE_AREA_FOOT_CLASS}
    />
  );
};

var React: Dynamic = toModuleNamespace(loadReact(), 1);
var jsxRuntime: Dynamic = loadJsxRuntime();
var SHEET_ENTER_CLASS: string = `starting:translate-y-[calc(100%+1.5rem)] data-[starting-style]:translate-y-[calc(100%+1.5rem)]`;
var SHEET_EXIT_CLASS: string = `translate-y-[calc(100%+1.5rem)]`;
var SHEET_POPUP_CLASS: Dynamic = resolveUiDesignSystemValue2(
  `fixed inset-x-0 bottom-0 flex max-h-[90dvh] w-full max-w-none flex-col`,
  `cds-reset rounded-t-card rounded-b-none bg-surface-3 shadow-panel text-body text-primary`,
  `pb-2 outline-none focus-visible:outline-hidden`,
  `before:pointer-events-none before:absolute before:inset-x-0 before:top-full before:h-dvh before:bg-surface-3`,
  `transition-[translate] duration-sheet ease-out motion-reduce:transition-none`,
  SHEET_ENTER_CLASS,
  `data-[ending-style]:translate-y-[calc(100%+1.5rem)]`,
);
var ON_KEYBOARD_CLASS: string = `before:top-[calc(100%-var(--cds-ring-inner,1px))]`;
var SHEET_BACKDROP_CLASS: Dynamic = resolveUiDesignSystemValue2(
  BOTTOM_SHEET_SCRIM_CLASS,
  `backdrop-blur-none duration-sheet starting:opacity-0`,
);
var ENTER_GUARD_MS: number = 500;
var SHEET_OPEN_MS: number = 360;
var SHEET_CLOSE_MS: number = 200;
var activeSheets: Dynamic = [];
function syncSheetClearance(..._extraArguments: unknown[]): undefined {
  let topSheet: Dynamic = activeSheets.findLast(
    (activeSheet?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      activeSheet.open,
  );
  let clearance: string = topSheet
    ? `${topSheet.el.offsetHeight + topSheet.lift}px`
    : ``;
  let rootStyle: Dynamic = (document as Dynamic).documentElement.style;
  if (rootStyle.getPropertyValue(`--bottom-sheet-clear`) !== clearance) {
    if (clearance) {
      rootStyle.setProperty(BOTTOM_SHEET_CLEAR_PROPERTY, clearance);
    } else {
      rootStyle.removeProperty(BOTTOM_SHEET_CLEAR_PROPERTY);
    }
  }
}
function useSheetClearance(
  element?: Dynamic,
  lift?: Dynamic,
  open?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let sheetStateRef: Dynamic = (0, React.useRef)({
    lift: lift,
    open: open,
  });
  sheetStateRef.current = {
    lift: lift,
    open: open,
  };
  let registrationRef: Dynamic = (0, React.useRef)(null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!element) return;
      let record: Dynamic = {
        el: element,
        ...sheetStateRef.current,
      };
      registrationRef.current = record;
      activeSheets.push(record);
      syncSheetClearance();
      let resizeObserver: Dynamic =
        typeof ResizeObserver === "undefined"
          ? null
          : new (ResizeObserver as Dynamic)(syncSheetClearance);
      resizeObserver?.observe(element);
      return (..._extraArguments: unknown[]): undefined => {
        resizeObserver?.disconnect();
        registrationRef.current = null;
        activeSheets.splice(activeSheets.indexOf(record), 1);
        syncSheetClearance();
      };
    },
    [element],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (registrationRef.current) {
        Object.assign(registrationRef.current, {
          lift: lift,
          open: open,
        });
        syncSheetClearance();
      }
    },
    [lift, open],
  );
}
var isKeyboardInteraction = (
  interaction?: Dynamic,
  ..._extraArguments: unknown[]
) => interaction === `keyboard`;

var TEXT_FIELD: string = `:is([contenteditable],textarea,input:not([type=checkbox],[type=radio],[type=range]))`;
var SAFE_AREA_FOOT_CLASS: string = `h-[env(safe-area-inset-bottom)] shrink-0 [[data-bottom-sheet][data-keyboard]:has(:is([contenteditable],textarea,input:not([type=checkbox],[type=radio],[type=range])):focus)_&]:h-0`;

var documentClickStates: Dynamic = new (WeakMap as Dynamic)();
function getDocumentClickState(
  document2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let existing: Dynamic = documentClickStates.get(document2);
  if (existing) return existing;
  let clickState: Dynamic = {
    now: false,
  };
  documentClickStates.set(document2, clickState);
  let window2: Dynamic = document2.defaultView;
  let resetTimer: number = 0;
  document2.addEventListener(
    `click`,
    (..._extraArguments: unknown[]): undefined => {
      clickState.now = true;
      window2?.clearTimeout(resetTimer);
      resetTimer =
        window2?.setTimeout(
          (..._extraArguments: unknown[]): undefined =>
            void (clickState.now = false),
          0,
        ) ?? 0;
    },
    true,
  );
  return clickState;
}
if (typeof document !== "undefined") {
  getDocumentClickState(document);
}
function usePreventFocusScroll(
  element?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let defaultView: Dynamic = element?.ownerDocument.defaultView;
      if (!element || !defaultView) return;
      let ownerDocument: Dynamic = element.ownerDocument;
      let documentClickState: Dynamic = getDocumentClickState(ownerDocument);
      let usePreventFocusScrollHandler: Dynamic = (
        preventFocusScroll?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        preventFocusScroll instanceof (defaultView.Element as Dynamic) &&
        preventFocusScroll.matches(
          `:is([contenteditable],textarea,input:not([type=checkbox],[type=radio],[type=range]))`,
        ) &&
        element.contains(preventFocusScroll);
      let usePreventFocusScrollResult: Dynamic = null;
      let usePreventFocusScrollHandler2 = (
        preventFocusScroll?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        usePreventFocusScrollResult = preventFocusScroll;
        if (preventFocusScroll) {
          element.setAttribute(`data-keyboard`, ``);
        } else {
          element.removeAttribute(`data-keyboard`);
        }
      };
      let usePreventFocusScrollHandler3 = (
        ..._extraArguments: unknown[]
      ): undefined => {
        if (usePreventFocusScrollHandler(ownerDocument.activeElement)) {
          usePreventFocusScrollHandler2(ownerDocument.activeElement);
        }
      };
      let count: number = 0;
      let usePreventFocusScrollHandler4 = (
        ..._extraArguments: unknown[]
      ): undefined => {
        defaultView.clearTimeout(count);
        count = defaultView.setTimeout(usePreventFocusScrollHandler3, 0);
      };
      let usePreventFocusScrollHandler5 = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (usePreventFocusScrollHandler(event.target)) {
          if (usePreventFocusScrollHandler(event.relatedTarget)) {
            usePreventFocusScrollResult &&= event.relatedTarget;
            return;
          }
          if (ownerDocument.activeElement !== event.target) {
            usePreventFocusScrollHandler2(null);
          }
        }
      };
      let usePreventFocusScrollHandler6 = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (usePreventFocusScrollHandler(event.target)) {
          if (documentClickState.now) {
            usePreventFocusScrollHandler2(event.target);
          } else {
            if (
              usePreventFocusScrollResult &&
              event.target !== usePreventFocusScrollResult
            ) {
              usePreventFocusScrollHandler2(null);
            }
          }
        }
      };
      if (documentClickState.now) {
        usePreventFocusScrollHandler3();
      }
      ownerDocument.addEventListener(
        `click`,
        usePreventFocusScrollHandler4,
        true,
      );
      element.addEventListener(
        `beforeinput`,
        usePreventFocusScrollHandler3,
        true,
      );
      element.addEventListener(`focusout`, usePreventFocusScrollHandler5, true);
      element.addEventListener(`focusin`, usePreventFocusScrollHandler6, true);
      return (..._extraArguments: unknown[]): undefined => {
        defaultView.clearTimeout(count);
        ownerDocument.removeEventListener(
          `click`,
          usePreventFocusScrollHandler4,
          true,
        );
        element.removeEventListener(
          `beforeinput`,
          usePreventFocusScrollHandler3,
          true,
        );
        element.removeEventListener(
          `focusout`,
          usePreventFocusScrollHandler5,
          true,
        );
        element.removeEventListener(
          `focusin`,
          usePreventFocusScrollHandler6,
          true,
        );
        element.removeAttribute(`data-keyboard`);
      };
    },
    [element],
  );
}
var PhoneDialogPopup: Dynamic = (0, React.forwardRef)(function (
  { kind = `dialog`, touchActions = true, ...phoneDialogPopup }: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let phoneDialogPopupResult: Dynamic = resolvePlatformSyncAndRoutingValue10();
  let phoneDialogPopupResult2: Dynamic =
    kind === `alert` ? UiDialogsRoot2 : UiDialogsRoot;
  if (!phoneDialogPopupResult)
    return (
      <phoneDialogPopupResult2.Popup ref={options} {...phoneDialogPopup} />
    );
  let {
    size: phoneDialogPopup2,
    fullHeight: phoneDialogPopup3,
    className: phoneDialogPopup4,
    portalClassName: phoneDialogPopup5,
    backdropClassName: phoneDialogPopup6,
    children: phoneDialogPopup7,
    ...phoneDialogPopup8
  }: Dynamic = phoneDialogPopup;
  return (
    <PhonePopupContent
      Ns={phoneDialogPopupResult2}
      popupRef={options}
      portalClassName={phoneDialogPopup5}
      backdropClassName={phoneDialogPopup6}
      touchActions={touchActions}
      rest={phoneDialogPopup8}
    >
      {phoneDialogPopup7}
    </PhonePopupContent>
  );
});

var SWIPE_CLOSE_PX: number = 80;
var SWIPE_START_PX: number = 16;
var SWIPE_SPEED_PX_PER_MS: number = 0.5;
var SWIPE_SPEED_WINDOW_MS: number = 30;
function useSwipeToClose(
  popupRef?: Dynamic,
  close?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let dragStateRef: Dynamic = (0, React.useRef)(null);
  let resetDrag: Dynamic = (0, React.useCallback)(
    (swipe?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      dragStateRef.current = null;
      if (swipe) {
        swipe.style.transition = ``;
        swipe.style.translate = ``;
      }
    },
    [],
  );
  let onPointerDown: Dynamic = (0, React.useCallback)(
    (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (
        dragStateRef.current !== null ||
        event.target.closest(
          `button, a, input, textarea, select, label, [role=button], [role=checkbox], [role=switch], [contenteditable=true]`,
        )
      )
        return;
      let popup: Dynamic = popupRef.current;
      if (!(!popup || (event.pointerType === `mouse` && event.button !== 0))) {
        dragStateRef.current = {
          y0: event.clientY,
          t0: event.timeStamp,
          dy: 0,
          id: event.pointerId,
        };
        event.currentTarget.setPointerCapture?.(event.pointerId);
        popup.style.transition = `none`;
      }
    },
    [popupRef],
  );
  let onPointerMove: Dynamic = (0, React.useCallback)(
    (swipe?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let dragState: Dynamic = dragStateRef.current;
      let popup: Dynamic = popupRef.current;
      if (!(!dragState || dragState.id !== swipe.pointerId || !popup)) {
        dragState.dy = Math.max(0, swipe.clientY - dragState.y0);
        popup.style.translate = `0 ${dragState.dy}px`;
      }
    },
    [popupRef],
  );
  let onPointerUp: Dynamic = (0, React.useCallback)(
    (swipe?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let dragState: Dynamic = dragStateRef.current;
      let popup: Dynamic = popupRef.current;
      if (!dragState || dragState.id !== swipe.pointerId) return;
      let difference: number = swipe.timeStamp - dragState.t0;
      let matchesDifference: boolean =
        difference >= SWIPE_SPEED_WINDOW_MS &&
        dragState.dy > SWIPE_START_PX &&
        dragState.dy / difference > SWIPE_SPEED_PX_PER_MS;
      let matchesType: Dynamic =
        swipe.type !== `pointercancel` &&
        (dragState.dy > 80 || matchesDifference);
      resetDrag(popup);
      if (matchesType) {
        close(`swipe`);
      }
    },
    [popupRef, close, resetDrag],
  );
  let onPointerCancel: Dynamic = (0, React.useCallback)(
    (swipe?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (dragStateRef.current?.id === swipe.pointerId) {
        resetDrag(popupRef.current);
      }
    },
    [popupRef, resetDrag],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): Dynamic =>
        resetDrag(popupRef.current),
    [popupRef, resetDrag],
  );
  return {
    onPointerDown: onPointerDown,
    onPointerMove: onPointerMove,
    onPointerUp: onPointerUp,
    onPointerCancel: onPointerUp,
    onLostPointerCapture: onPointerCancel,
  };
}
export { BOTTOM_SHEET_SCRIM_CLASS, ENTER_GUARD_MS, ON_KEYBOARD_CLASS, PhoneDialogPopup, SAFE_AREA_FOOT_CLASS, SHEET_CONTROL_CLASS, SWIPE_CLOSE_PX, TEXT_FIELD };
