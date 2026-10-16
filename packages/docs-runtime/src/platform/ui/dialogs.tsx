/** BaoCut: ui dialogs from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  AlertDialogRoot,
  AlertDialogTrigger,
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogPopup,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  React,
  clsx,
  createAlertDialogHandle,
} from "../dependencies";
import {
  UiDesignSystemUseLayoutEffect,
  resolveUiDesignSystemValue2,
} from "./design-system";
import {
  resolveUiLinksAndFoundationUseContext3,
} from "./links-and-foundation";
import {
  UiProviderAndLayersCreateContext13,
  resolveUiProviderAndLayersUseContext9,
  resolveUiProviderAndLayersValue2,
  resolveUiProviderAndLayersValue3,
} from "./provider-and-layers";
import {
  UiOverlaysAndIconsActionsRef,
  UiOverlaysAndIconsDataCdsOverlay,
  UiOverlaysAndIconsSurface,
  resolveUiOverlaysAndIconsValue4,
} from "./overlays-and-icons";
import {
  Button,
  UiTooltipsAndControlsPanel,
  resolveUiTooltipsAndControlsClose,
  resolveUiTooltipsAndControlsValue3,
  useUiTooltipsAndControlsFinalFocus2,
  useUiTooltipsAndControlsTop,
} from "./tooltips-and-controls";
import type * as ReactComponentTypes from "react";
import type {
  DialogRootProps,
  DialogRootActions,
  DialogPopupProps as BaseDialogPopupProps,
  DialogPopupState,
} from "@base-ui/react/dialog";
import type {
  AlertDialogRootProps,
  AlertDialogRootActions,
} from "@base-ui/react/alert-dialog";
import type { ButtonVariant } from "./tooltips-and-controls";

import type { ComponentRenderFn, HTMLProps } from "@base-ui/react/types";

export interface DialogPopupProps
  extends Omit<BaseDialogPopupProps, "className" | "render"> {
  render?:
    | ReactComponentTypes.ReactElement
    | ComponentRenderFn<HTMLProps<HTMLDivElement>, DialogPopupState>;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  fullHeight?: boolean;
  unstyled?: boolean;
  surface?: string;
  backdropClassName?: string;
  backdropStyle?: ReactComponentTypes.CSSProperties;
  portalClassName?: string;
  className?: string;
}
export type DialogPopupComponent =
  ReactComponentTypes.ForwardRefExoticComponent<
    Omit<DialogPopupProps, "ref"> &
      ReactComponentTypes.RefAttributes<HTMLDivElement>
  >;
type DialogPopupInnerProps = BaseDialogPopupProps & {
  fitVisualViewport?: boolean;
};

export interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (
    open: boolean,
    details: { reason: "confirm" | "dismiss" },
  ) => void;
  title: ReactComponentTypes.ReactNode;
  description?: ReactComponentTypes.ReactNode;
  confirmLabel?: ReactComponentTypes.ReactNode;
  cancelLabel?: ReactComponentTypes.ReactNode;
  confirmVariant?: ButtonVariant;
  initialFocus?: "confirm" | "cancel";
  disabled?: boolean;
  confirmDisabledReason?: ReactComponentTypes.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  className?: string;
  portalClassName?: string;
  onConfirm: () => unknown;
  closeOnConfirm?: boolean;
  children?: ReactComponentTypes.ReactNode;
}

export interface DialogProps<Payload = unknown>
  extends DialogRootProps<Payload> {
  dismissible?: boolean;
}

interface DialogRootComponent {
  <Payload = unknown>(
    props: DialogProps<Payload>,
  ): ReactComponentTypes.JSX.Element;
  displayName?: string;
}
interface AlertDialogRootComponent {
  <Payload = unknown>(
    props: AlertDialogRootProps<Payload>,
  ): ReactComponentTypes.JSX.Element;
  displayName?: string;
}

export const UiDialogsOpen: ReactComponentTypes.FC<ConfirmationDialogProps> = ({
  open: open,
  onOpenChange: onOpenChange,
  title: title,
  description: description,
  confirmLabel: confirmLabel,
  cancelLabel: cancelLabel,
  confirmVariant = `primary`,
  initialFocus = `confirm`,
  disabled = false,
  confirmDisabledReason: confirmDisabledReason,
  size = `sm`,
  className: className,
  portalClassName: portalClassName,
  onConfirm: onConfirm,
  closeOnConfirm = false,
  children: children,
}) => {
  let defaultConfirmLabel: string = resolveUiLinksAndFoundationUseContext3(
    `confirm`,
    `Confirm`,
  );
  let defaultCancelLabel: string = resolveUiLinksAndFoundationUseContext3(
    `cancel`,
    `Cancel`,
  );
  let resolvedConfirmLabel = confirmLabel ?? defaultConfirmLabel;
  let resolvedCancelLabel = cancelLabel ?? defaultCancelLabel;
  let [confirming, setConfirming] = (0, React.useState)(false);
  let cancelButtonRef = (0, React.useRef)<HTMLButtonElement | null>(null);
  let confirmButtonRef = (0, React.useRef)<HTMLButtonElement | null>(null);
  let {
    finalFocus: finalFocus,
    popupRef: useUiTooltipsAndControlsFinalFocus22,
  }: Dynamic = useUiTooltipsAndControlsFinalFocus2(open);
  let initialFocusTarget = (..._extraArguments: unknown[]): "confirm" | "cancel" | "pending" =>
    initialFocus === `cancel` ? `cancel` : disabled ? `pending` : `confirm`;
  let [focusTarget, setFocusTarget] = (0, React.useState)(initialFocusTarget);
  let focusTargetRef = (0, React.useRef)(focusTarget);
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): undefined => {
      focusTargetRef.current = focusTarget;
    },
    [focusTarget],
  );
  let initialFocusElement: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): Dynamic => {
      switch (focusTargetRef.current) {
        case `confirm`:
          return confirmButtonRef.current;
        case `cancel`:
          return cancelButtonRef.current;
        default:
          return useUiTooltipsAndControlsFinalFocus22.current;
      }
    },
    [useUiTooltipsAndControlsFinalFocus22],
  );
  let userFocusedRef = (0, React.useRef)(false);
  let markUserFocused = (0, React.useCallback)(
    (..._extraArguments: unknown[]): undefined => {
      userFocusedRef.current = true;
    },
    [],
  );
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): undefined => {
      if (open) {
        userFocusedRef.current = false;
        setFocusTarget(initialFocusTarget());
      }
    },
    [open],
  );
  let changeFocusTarget = (0, React.useCallback)(
    (uiDialogsOpen: "confirm" | "cancel" | "pending", ..._extraArguments: unknown[]): undefined => {
      setFocusTarget(uiDialogsOpen);
      let confirmButton2: Dynamic =
        uiDialogsOpen === `confirm` ? confirmButtonRef.current : cancelButtonRef.current;
      let useUiTooltipsAndControlsFinalFocus23: Dynamic =
        useUiTooltipsAndControlsFinalFocus22.current;
      if (!confirmButton2 || !useUiTooltipsAndControlsFinalFocus23) return;
      let activeElement2: Dynamic = confirmButton2.ownerDocument.activeElement;
      let enabled: boolean =
        !activeElement2 ||
        activeElement2 === useUiTooltipsAndControlsFinalFocus23 ||
        activeElement2 === confirmButton2.ownerDocument.body ||
        (!useUiTooltipsAndControlsFinalFocus23.contains(activeElement2) &&
          activeElement2.closest(UiDialogsStyles6) !== null);
      let matchesActiveElement: boolean =
        activeElement2 === cancelButtonRef.current ||
        activeElement2 === confirmButtonRef.current;
      if (enabled || (matchesActiveElement && !userFocusedRef.current)) {
        confirmButton2.focus({
          preventScroll: true,
          focusVisible: true,
        });
      }
    },
    [useUiTooltipsAndControlsFinalFocus22],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!open || focusTarget !== `pending`) return;
      if (!disabled) {
        let requestAnimationFrame2: number = requestAnimationFrame(
          (..._extraArguments: unknown[]): Dynamic => changeFocusTarget(`confirm`),
        );
        return (..._extraArguments: unknown[]): void =>
          cancelAnimationFrame(requestAnimationFrame2);
      }
      let setTimeout2: Dynamic = setTimeout(
        (..._extraArguments: unknown[]): Dynamic => changeFocusTarget(`cancel`),
        uiDialogsValue250,
      );
      return (..._extraArguments: unknown[]): void => clearTimeout(setTimeout2);
    },
    [disabled, focusTarget, changeFocusTarget, open],
  );
  let openRef: Dynamic = (0, React.useRef)(open);
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): undefined => {
      openRef.current = open;
    },
    [open],
  );
  let dialogFocusProps: Dynamic = useUiDialogsPreventScroll(
    focusTarget === `confirm`
      ? confirmButtonRef
      : focusTarget === `cancel`
        ? cancelButtonRef
        : useUiTooltipsAndControlsFinalFocus22,
    focusTarget !== `pending`,
    useUiTooltipsAndControlsFinalFocus22,
    openRef,
    userFocusedRef,
    initialFocusElement,
  );
  let preventRepeatedActivation = (0, React.useCallback)(
    (event: ReactComponentTypes.KeyboardEvent<HTMLButtonElement>, ..._extraArguments: unknown[]): undefined => {
      if (event.repeat && (event.key === `Enter` || event.key === ` `)) {
        event.preventDefault();
      }
    },
    [],
  );
  let confirmedRef = (0, React.useRef)(false);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (open) {
        confirmedRef.current = false;
      }
    },
    [open],
  );
  let container: Dynamic = resolveUiProviderAndLayersUseContext9();
  let confirm = (0, React.useCallback)(
    (..._extraArguments: unknown[]): undefined => {
      if (confirming || disabled || !open || confirmedRef.current) return;
      if (closeOnConfirm) {
        confirmedRef.current = true;
      } else {
        setConfirming(true);
      }
      let uiDialogsOpenResult: Promise<unknown>;
      try {
        uiDialogsOpenResult = Promise.resolve(onConfirm());
      } catch (uiDialogsOpenResult2) {
        uiDialogsOpenResult = Promise.reject(uiDialogsOpenResult2);
      }
      if (closeOnConfirm) {
        onOpenChange(false, {
          reason: `confirm`,
        });
      }
      uiDialogsOpenResult.finally((..._extraArguments: unknown[]): undefined => {
        if (!closeOnConfirm) {
          setConfirming(false);
        }
      });
    },
    [confirming, closeOnConfirm, disabled, onConfirm, onOpenChange, open],
  );
  let changeOpen = (0, React.useCallback)(
    (uiDialogsOpen: boolean, ..._extraArguments: unknown[]): undefined => {
      if (!(confirming || !open)) {
        onOpenChange(uiDialogsOpen, {
          reason: `dismiss`,
        });
      }
    },
    [confirming, onOpenChange, open],
  );
  let modalContext: Dynamic = resolveUiProviderAndLayersValue3(`modal`);
  useUiDialogsState(portalClassName);
  let popupRef: Dynamic = (0, React.useRef)(null);
  let confirmButton = (
    <Button
      ref={confirmButtonRef}
      variant={confirmVariant}
      busy={confirming}
      disabled={disabled}
      disabledReason={confirmDisabledReason}
      data-initial-focus={focusTarget === `confirm` ? `` : undefined}
      onClick={confirm}
      onKeyDown={preventRepeatedActivation}
    >
      {resolvedConfirmLabel}
    </Button>
  );
  return (
    <UiOverlaysAndIconsActionsRef actionsRef={popupRef}>
      <AlertDialogRoot open={open} onOpenChange={changeOpen} actionsRef={popupRef}>
        <DialogPortal container={container}>
          <UiOverlaysAndIconsSurface
            className={resolveUiDesignSystemValue2(`relative`, portalClassName)}
            style={modalContext.style}
            surface={UiTooltipsAndControlsPanel.popover}
            closeOnActivityHide={true}
          >
            <UiProviderAndLayersCreateContext13.Provider value={modalContext.base}>
              <DialogBackdrop
                forceRender={true}
                onMouseDown={resolveUiDialogsPreventDefault}
                className={clsx(UiDialogsStyles3, UiDialogsStartingOpacity0)}
              />
              <UiDialogsAriaHidden />
              <ConfirmationDialog_PopupInner
                data-cds={`ConfirmationDialog`}
                ref={useUiTooltipsAndControlsFinalFocus22}
                onKeyDownCapture={markUserFocused}
                onPointerDownCapture={markUserFocused}
                initialFocus={dialogFocusProps}
                finalFocus={finalFocus}
                className={resolveUiDesignSystemValue2(
                  `draggable-none`,
                  UiDialogsStyles4,
                  UiDialogsPopover,
                  UiDialogsStyles2,
                  UiDialogsStyles5,
                  UiDialogs2xl[size],
                  className,
                )}
              >
                <div className={UiDialogsStyles}>
                  <DialogTitle
                    className={clsx(
                      UiDialogsMt05,
                      UiDialogsTextHeadingFontMediumBreakWords,
                      `text-primary`,
                    )}
                  >
                    {title}
                  </DialogTitle>
                  {description && (
                    <DialogDescription
                      className={UiDialogsMt1TextBodyFontNormalTextSecondaryBreakWords}
                    >
                      {description}
                    </DialogDescription>
                  )}
                  {children}
                  <Dialog_Footer>
                    <DialogClose
                      render={
                        <Button
                          ref={cancelButtonRef}
                          variant={`secondary`}
                          disabled={confirming}
                          data-initial-focus={focusTarget === `cancel` ? `` : undefined}
                        >
                          {resolvedCancelLabel}
                        </Button>
                      }
                    />
                    {confirmButton}
                  </Dialog_Footer>
                </div>
              </ConfirmationDialog_PopupInner>
            </UiProviderAndLayersCreateContext13.Provider>
          </UiOverlaysAndIconsSurface>
        </DialogPortal>
      </AlertDialogRoot>
    </UiOverlaysAndIconsActionsRef>
  );
};

export const UiDialogsAriaHidden: ReactComponentTypes.FC = () => {
  return (
    <div
      aria-hidden={true}
      data-cds-window-drag-strip={``}
      className={`fixed inset-x-0 top-0`}
      style={UiDialogsHeight}
    />
  );
};

export const Dialog_CloseButton: ReactComponentTypes.FC<{
  "aria-label"?: string;
  className?: string;
  flush?: boolean;
}> = ({
  "aria-label": ariaLabel,
  className: className,
  flush = false,
}) => {
  let uiLinksAndFoundationUseContext3: Dynamic = resolveUiLinksAndFoundationUseContext3(
    `close`,
    `Close`,
  );
  return (
    <DialogClose
      render={
        <Button
          variant={`ghost`}
          iconOnly={true}
          icon={`X`}
          aria-label={ariaLabel ?? uiLinksAndFoundationUseContext3}
          tooltip={false}
          className={resolveUiDesignSystemValue2(
            flush && UiDialogsMePadSmMtPadSm,
            className,
          )}
        />
      }
    />
  );
};

export const Dialog_Header: ReactComponentTypes.FC<{
  actions?: ReactComponentTypes.ReactNode;
  description?: ReactComponentTypes.ReactNode;
  showClose?: boolean;
  closeLabel?: string;
  className?: string;
  children?: ReactComponentTypes.ReactNode;
}> = ({
  actions: actions,
  description: description,
  showClose = true,
  closeLabel: closeLabel,
  className: className,
  children: children,
}) => {
  let useContext: Dynamic = (0, React.useContext)(UiDialogsCreateContext2);
  return (
    <div
      className={resolveUiDesignSystemValue2(
        `mb-pad-md flex items-start gap-2`,
        className,
      )}
    >
      <div
        className={clsx(
          useContext ? UiDialogsMt05 : UiDialogsMt1,
          `flex min-w-0 flex-1 flex-col gap-1`,
        )}
      >
        <Dialog_Title>{children}</Dialog_Title>
        {description && (
          <DialogDescription
            className={`text-body font-normal text-secondary break-words`}
          >
            {description}
          </DialogDescription>
        )}
      </div>
      {actions && <div className={`-mt-pad-sm`}>{actions}</div>}
      {showClose && <Dialog_CloseButton aria-label={closeLabel} flush={true} />}
    </div>
  );
};

export const Dialog_Footer: ReactComponentTypes.FC<{
  align?: "start" | "center" | "end" | "between";
  className?: string;
  children?: ReactComponentTypes.ReactNode;
}> = ({
  align = `end`,
  className: className,
  children: children,
}) => {
  return (
    <div
      className={resolveUiDesignSystemValue2(
        `mt-pad-lg flex flex-col-reverse gap-2 sm:flex-row`,
        `max-sm:[&>[data-cds-disabled-reason-wrapper]]:flex-col`,
        UiDialogsStart[align],
        className,
      )}
    >
      {children}
    </div>
  );
};

export const Dialog_Root: DialogRootComponent = <Payload,>({
  dismissible: dismissible,
  disablePointerDismissal: disablePointerDismissal,
  actionsRef: actionsRef,
  ...dialogRoot
}: DialogProps<Payload>) => {
  let elementRef: Dynamic = (0, React.useRef)(null);
  let actionsRef2 = (0, React.useRef)<DialogRootActions | null>(null);
  resolveUiTooltipsAndControlsClose(actionsRef2, actionsRef);
  let disablePointerDismissal2 =
    disablePointerDismissal ?? (dismissible === false ? true : undefined);
  return (
    <UiDialogsCreateContext2.Provider value={false}>
      <UiDialogsCreateContext.Provider value={dialogRoot.modal}>
        <UiDialogsCreateContext3.Provider value={elementRef}>
          <UiDialogsCreateContext4.Provider value={!disablePointerDismissal2}>
            <UiOverlaysAndIconsActionsRef actionsRef={actionsRef2}>
              <DialogRoot
                disablePointerDismissal={disablePointerDismissal2}
                actionsRef={actionsRef2}
                {...dialogRoot}
              />
            </UiOverlaysAndIconsActionsRef>
          </UiDialogsCreateContext4.Provider>
        </UiDialogsCreateContext3.Provider>
      </UiDialogsCreateContext.Provider>
    </UiDialogsCreateContext2.Provider>
  );
};

export const AlertDialog_Root: AlertDialogRootComponent = <Payload,>({
  actionsRef: actionsRef,
  ...alertDialogRoot
}: AlertDialogRootProps<Payload>) => {
  let actionsRef2 = (0, React.useRef)<AlertDialogRootActions | null>(null);
  resolveUiTooltipsAndControlsClose(actionsRef2, actionsRef);
  return (
    <UiDialogsCreateContext2.Provider value={true}>
      <UiDialogsCreateContext.Provider value={true}>
        <UiDialogsCreateContext4.Provider value={false}>
          <UiOverlaysAndIconsActionsRef actionsRef={actionsRef2}>
            <AlertDialogRoot {...alertDialogRoot} actionsRef={actionsRef2} />
          </UiOverlaysAndIconsActionsRef>
        </UiDialogsCreateContext4.Provider>
      </UiDialogsCreateContext.Provider>
    </UiDialogsCreateContext2.Provider>
  );
};

var UiDialogsPopover: Dynamic;

var UiDialogsStyles: string;

var UiDialogsStyles2: string;

var UiDialogsStyles3: string;

var UiDialogsStartingOpacity0: string;

function resolveUiDialogsPreventDefault(
  event?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  event.preventDefault();
}

var UiDialogsState: Dynamic;

function installUiDialogsSignal(
  event?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (event.button !== 0) {
    event.preventDefault();
    return;
  }
  let currentTarget: Dynamic = event.currentTarget;
  let parentElement: Dynamic = currentTarget.parentElement;
  let ownerDocument2: Dynamic = currentTarget.ownerDocument;
  let uiProviderAndLayersValue2: Dynamic = resolveUiProviderAndLayersValue2(
    ownerDocument2.activeElement,
  );
  if (
    parentElement === null ||
    uiProviderAndLayersValue2 === null ||
    !parentElement.contains(uiProviderAndLayersValue2)
  )
    return;
  UiDialogsState?.abort();
  let abortController: Dynamic = new ((ownerDocument2.defaultView
    ?.AbortController ?? AbortController) as Dynamic)();
  UiDialogsState = abortController;
  let { signal: signal }: Dynamic = abortController;
  signal.addEventListener(
    `abort`,
    (..._extraArguments: unknown[]): undefined => {
      if (UiDialogsState === abortController) {
        UiDialogsState = null;
      }
    },
    {
      once: true,
    },
  );
  ownerDocument2.addEventListener(
    `mousedown`,
    (..._extraArguments: unknown[]): Dynamic => abortController.abort(),
    {
      capture: true,
      once: true,
      signal: signal,
    },
  );
  ownerDocument2.addEventListener(
    `mouseup`,
    (event2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      abortController.abort();
      if (
        event2.target !== currentTarget &&
        ownerDocument2.activeElement === ownerDocument2.body &&
        uiProviderAndLayersValue2.isConnected
      ) {
        uiProviderAndLayersValue2.focus({
          preventScroll: true,
        });
      }
    },
    {
      capture: true,
      once: true,
      signal: signal,
    },
  );
}

var UiDialogsHeight: {
    height: string;
    WebkitAppRegion: string;
};

var UiDialogsStyles4: string;

var UiDialogsStyles5: string;

var UiDialogs2xl: Dynamic;

function useUiDialogsState(
  uiDialogsState?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {},
    [uiDialogsState],
  );
}

var UiDialogsCreateContext: Dynamic;

var UiDialogsCreateContext2: Dynamic;

var UiDialogsTextHeadingFontMediumBreakWords: string;

var UiDialogsTextTitleFontSemiboldBreakWords: string;

var UiDialogsMt05: string;

var UiDialogsMt1: string;

var UiDialogsMt1TextBodyFontNormalTextSecondaryBreakWords: string;

var UiDialogsCreateContext3: Dynamic;

var UiDialogsCreateContext4: Dynamic;

var Dialog_Trigger: Dynamic;

var uiDialogsValue250: number;

var UiDialogsStyles6: string;

function useUiDialogsPreventScroll(
  ref?: Dynamic,
  focusVisible?: Dynamic,
  ref2?: Dynamic,
  ref3?: Dynamic,
  ref4?: Dynamic,
  argument?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let elementRef: Dynamic = (0, React.useRef)(null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): Dynamic =>
        elementRef.current?.(),
    [],
  );
  return (0, React.useCallback)(
    (..._extraArguments: unknown[]): Dynamic => {
      let ref5: Dynamic = ref.current;
      let ownerDocument2: Dynamic = ref5?.ownerDocument;
      let defaultView: Dynamic = ownerDocument2?.defaultView;
      if (ref5 && ownerDocument2 && defaultView) {
        defaultView.requestAnimationFrame(
          (..._extraArguments: unknown[]): undefined => {
            if (!ref3.current || !ref5.isConnected) return;
            let ref6: Dynamic = ref2.current;
            let activeElement2: Dynamic = ownerDocument2.activeElement;
            if (
              !(
                ref6 &&
                activeElement2 &&
                activeElement2 !== ref5 &&
                ref6.contains(activeElement2)
              )
            ) {
              ref5.focus({
                preventScroll: true,
                focusVisible: focusVisible,
              });
            }
          },
        );
        let count: number = 0;
        let enabled = false;
        let requestAnimationFrame2 = (
          event?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          let ref6: Dynamic = ref2.current;
          let target: Dynamic = event.target;
          if (
            !(
              enabled ||
              !ref3.current ||
              ref4.current ||
              count >= 3 ||
              !ref6 ||
              !(target instanceof (defaultView.Element as Dynamic)) ||
              ref6.contains(target)
            )
          ) {
            if (!target.closest(UiDialogsStyles6)) {
              enabled = true;
              return;
            }
            count += 1;
            defaultView.requestAnimationFrame(
              (..._extraArguments: unknown[]): undefined => {
                let argument2: Dynamic = argument();
                if (
                  !(
                    !ref3.current ||
                    ref4.current ||
                    !argument2?.isConnected ||
                    (argument2 instanceof
                      (defaultView.HTMLButtonElement as Dynamic) &&
                      argument2.disabled)
                  )
                ) {
                  argument2.focus({
                    preventScroll: true,
                    focusVisible: argument2 !== ref2.current,
                  });
                }
              },
            );
          }
        };
        elementRef.current?.();
        ownerDocument2.addEventListener(
          `focusin`,
          requestAnimationFrame2,
          true,
        );
        let setTimeout2: Dynamic = defaultView.setTimeout(
          (..._extraArguments: unknown[]): Dynamic => elementRef.current?.(),
          1e3,
        );
        elementRef.current = (..._extraArguments: unknown[]): undefined => {
          defaultView.clearTimeout(setTimeout2);
          ownerDocument2.removeEventListener(
            `focusin`,
            requestAnimationFrame2,
            true,
          );
          elementRef.current = null;
        };
      }
      return ref5;
    },
    [ref, focusVisible, ref2, ref3, ref4, argument],
  );
}

var Dialog_PopupInner: ReactComponentTypes.ForwardRefExoticComponent<Omit<DialogPopupInnerProps, "ref"> & ReactComponentTypes.RefAttributes<HTMLDivElement>>;

var ConfirmationDialog_PopupInner: ReactComponentTypes.ForwardRefExoticComponent<Omit<BaseDialogPopupProps, "ref"> & ReactComponentTypes.RefAttributes<HTMLDivElement>>;

var Dialog_Popup: DialogPopupComponent;

var Dialog_Title: Dynamic;

var UiDialogsMePadSmMtPadSm: string;

var Dialog_Description: Dynamic;

var UiDialogsStart: Dynamic;

var UiDialogsRoot: Dynamic;

var UiDialogsRoot2: Dynamic;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeUiDialogsStep1(): void {
  (UiDialogsPopover = `fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col w-[calc(100vw-2rem)] max-h-[calc(100dvh_-_max(2rem,2*var(--desktop-titlebar-inset,0px))_-_2*max(env(safe-area-inset-top,0px),env(safe-area-inset-bottom,0px)))] ${`${resolveUiTooltipsAndControlsValue3(`popover`)} shadow-panel-lg`} cds-reset text-body font-normal text-primary outline-none focus-visible:outline-hidden`);
  (UiDialogsStyles = `isolate flex min-h-0 flex-1 flex-col overflow-y-auto scroll-fade-y rounded-[inherit] p-xl`);
  (UiDialogsStyles2 = `transition-[opacity,scale,filter] duration-base ease-out motion-reduce:transition-none data-[starting-style]:opacity-0 data-[starting-style]:scale-[0.98] starting:opacity-0 starting:scale-[0.98] motion-reduce:data-[starting-style]:scale-100 data-[ending-style]:opacity-0 data-[ending-style]:scale-[0.98]`);
  (UiDialogsStyles3 = `draggable-none fixed inset-0 bg-backdrop transition-opacity duration-base ease-out motion-reduce:transition-none data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 has-[~[data-nested]]:bg-transparent has-[~[data-nested]]:backdrop-blur-none`);
  (UiDialogsStartingOpacity0 = `starting:opacity-0`);
  (UiDialogsState = null);
  (UiDialogsHeight = {
    height: `var(--desktop-titlebar-inset, 0px)`,
    WebkitAppRegion: `drag`,
  });
  (UiDialogsStyles4 = `after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:bg-backdrop after:opacity-0 after:z-50 after:transition-opacity after:duration-base after:ease-out data-[nested-dialog-open]:after:opacity-100`);
  (UiDialogsStyles5 = `data-[nested-dialog-open]:blur-[2px]`);
  (UiDialogs2xl = {
    sm: `max-w-[400px]`,
    md: `max-w-[520px]`,
    lg: `max-w-[720px]`,
    xl: `max-w-[880px]`,
    "2xl": `max-w-[1024px]`,
    "3xl": `max-w-[1152px]`,
  });
  (UiDialogsCreateContext = (0, React.createContext)(undefined));
  (UiDialogsCreateContext2 = (0, React.createContext)(false));
  (UiDialogsTextHeadingFontMediumBreakWords = `text-heading font-medium break-words`);
  (UiDialogsTextTitleFontSemiboldBreakWords = `text-title font-semibold break-words`);
  (UiDialogsMt05 = `-mt-0.5`);
  (UiDialogsMt1 = `-mt-1`);
  (UiDialogsMt1TextBodyFontNormalTextSecondaryBreakWords = `mt-1 text-body font-normal text-secondary break-words`);
  (UiDialogsCreateContext3 = (0, React.createContext)(undefined));
  (UiDialogsCreateContext4 = (0, React.createContext)(false));
  (Dialog_Trigger = (0, React.forwardRef)(
    (
      dialogTrigger?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) => {
      let useContext: Dynamic = (0, React.useContext)(UiDialogsCreateContext3);
      let uiOverlaysAndIconsValue4: Dynamic = resolveUiOverlaysAndIconsValue4(
        options,
        dialogTrigger.handle ? null : (useContext ?? null),
      );
      return (
        <DialogTrigger ref={uiOverlaysAndIconsValue4} {...dialogTrigger} />
      );
    },
  ));
  Dialog_Trigger.displayName = `Dialog.Trigger`;
  (uiDialogsValue250 = 250);
  (UiDialogsStyles6 = `[aria-hidden="true"], [inert]`);
  (Dialog_PopupInner = (0, React.forwardRef)(
    (
      {
        finalFocus: finalFocus,
        fitVisualViewport: fitVisualViewport,
        children: children,
        ...dialogPopupInner
      }: DialogPopupInnerProps,
      options: ReactComponentTypes.ForwardedRef<HTMLDivElement>,
      ..._extraArguments: unknown[]
    ) => {
      let useContext: Dynamic = (0, React.useContext)(UiDialogsCreateContext);
      let useContext2: Dynamic = (0, React.useContext)(UiDialogsCreateContext3);
      let {
        finalFocus: useUiTooltipsAndControlsFinalFocus22,
        popupRef: useUiTooltipsAndControlsFinalFocus23,
      }: Dynamic = useUiTooltipsAndControlsFinalFocus2(
        true,
        useContext !== false,
        useContext2,
      );
      let uiOverlaysAndIconsValue4: Dynamic = resolveUiOverlaysAndIconsValue4(
        options,
        useUiTooltipsAndControlsFinalFocus23,
        useUiTooltipsAndControlsTop(fitVisualViewport),
      );
      return (
        <DialogPopup {...{
  [UiOverlaysAndIconsDataCdsOverlay]: ``
}} ref={uiOverlaysAndIconsValue4} finalFocus={finalFocus ?? useUiTooltipsAndControlsFinalFocus22} aria-modal={useContext === false ? `false` : undefined} {...dialogPopupInner}>{children}</DialogPopup>
      );
    },
  ));
  Dialog_PopupInner.displayName = `Dialog.PopupInner`;
  (ConfirmationDialog_PopupInner = (0, React.forwardRef)(
    (
      { children: children, ...confirmationDialogPopupInner }: BaseDialogPopupProps,
      options: ReactComponentTypes.ForwardedRef<HTMLDivElement>,
      ..._extraArguments: unknown[]
    ) => {
      let uiOverlaysAndIconsValue4: Dynamic = resolveUiOverlaysAndIconsValue4(
        options,
        useUiTooltipsAndControlsTop(true),
      );
      return (
        <DialogPopup {...{
  [UiOverlaysAndIconsDataCdsOverlay]: ``
}} ref={uiOverlaysAndIconsValue4} {...confirmationDialogPopupInner}>{children}</DialogPopup>
      );
    },
  ));
  ConfirmationDialog_PopupInner.displayName = `ConfirmationDialog.PopupInner`;
  (Dialog_Popup = (0, React.forwardRef)(
    (
      {
        size = `md`,
        fullHeight = false,
        unstyled = false,
        surface: surface,
        backdropClassName: backdropClassName,
        backdropStyle: backdropStyle,
        portalClassName: portalClassName,
        className: className,
        children: children,
        ...dialogPopup
      }: DialogPopupProps,
      options: ReactComponentTypes.ForwardedRef<HTMLDivElement>,
      ..._extraArguments: unknown[]
    ) => {
      let label: string = unstyled
        ? ``
        : `${UiDialogsPopover} ${UiDialogsStyles2} ${UiDialogsStyles5} ${UiDialogs2xl[size]} ${fullHeight ? `h-dvh` : ``}`;
      let uiProviderAndLayersValue3: Dynamic =
        resolveUiProviderAndLayersValue3(`modal`);
      useUiDialogsState(portalClassName);
      let useContext: Dynamic = (0, React.useContext)(UiDialogsCreateContext);
      let useContext2: Dynamic = (0, React.useContext)(UiDialogsCreateContext4);
      let forceRender: boolean = useContext === undefined || useContext === true;
      return (
        <DialogPortal container={resolveUiProviderAndLayersUseContext9()}>
        <UiOverlaysAndIconsSurface
            className={resolveUiDesignSystemValue2(`relative`, portalClassName)}
            style={uiProviderAndLayersValue3.style}
            surface={
              surface ??
              (unstyled ? undefined : UiTooltipsAndControlsPanel.popover)
            }
            closeOnActivityHide={true}
          >
          <UiProviderAndLayersCreateContext13.Provider
              value={uiProviderAndLayersValue3.base}
            >
            <DialogBackdrop
                forceRender={forceRender}
                onMouseDown={
                  useContext2
                    ? installUiDialogsSignal
                    : resolveUiDialogsPreventDefault
                }
                className={resolveUiDesignSystemValue2(
                  UiDialogsStyles3,
                  !unstyled && UiDialogsStartingOpacity0,
                  useContext === false && `pointer-events-none opacity-0`,
                  backdropClassName,
                )}
                style={backdropStyle}
              />
            <UiDialogsAriaHidden />
            <Dialog_PopupInner
              data-cds={`Dialog`}
              ref={options}
              {...dialogPopup}
              fitVisualViewport={!unstyled}
              className={resolveUiDesignSystemValue2(`draggable-none`, UiDialogsStyles4, label, className)}
            >{unstyled ? children : <div className={UiDialogsStyles}>{children}</div>}</Dialog_PopupInner>
          </UiProviderAndLayersCreateContext13.Provider>
        </UiOverlaysAndIconsSurface>
      </DialogPortal>
      );
    },
  ));
  Dialog_Popup.displayName = `Dialog.Popup`;
  (Dialog_Title = (0, React.forwardRef)(
    (
      { className: className, ...dialogTitle }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) => {
      let useContext: Dynamic = (0, React.useContext)(UiDialogsCreateContext2);
      return (
        <DialogTitle
          ref={options}
          {...dialogTitle}
          className={resolveUiDesignSystemValue2(`text-primary`, useContext ? UiDialogsTextHeadingFontMediumBreakWords : UiDialogsTextTitleFontSemiboldBreakWords, className)}
        />
      );
    },
  ));
  Dialog_Title.displayName = `Dialog.Title`;
  (UiDialogsMePadSmMtPadSm = `-me-pad-sm -mt-pad-sm`);
  Dialog_CloseButton.displayName = `Dialog.CloseButton`;
  Dialog_Header.displayName = `Dialog.Header`;
  (Dialog_Description = (0, React.forwardRef)(
    (
      { className: className, ...dialogDescription }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) => (
      <DialogDescription
        ref={options}
        {...dialogDescription}
        className={resolveUiDesignSystemValue2(UiDialogsMt1TextBodyFontNormalTextSecondaryBreakWords, className)}
      />
    ),
  ));
  Dialog_Description.displayName = `Dialog.Description`;
  (UiDialogsStart = {
    start: `sm:justify-start`,
    center: `sm:justify-center`,
    end: `sm:justify-end`,
    between: `sm:justify-between`,
  });
  Dialog_Footer.displayName = `Dialog.Footer`;
  Dialog_Root.displayName = `Dialog.Root`;
  (UiDialogsRoot = {
    Root: Dialog_Root,
    Trigger: Dialog_Trigger,
    Popup: Dialog_Popup,
    Backdrop: DialogBackdrop,
    Header: Dialog_Header,
    Title: Dialog_Title,
    Description: Dialog_Description,
    Footer: Dialog_Footer,
    Close: DialogClose,
    CloseButton: Dialog_CloseButton,
  });
  AlertDialog_Root.displayName = `AlertDialog.Root`;
  (UiDialogsRoot2 = {
    Root: AlertDialog_Root,
    Trigger: AlertDialogTrigger,
    Popup: Dialog_Popup,
    Backdrop: DialogBackdrop,
    Header: Dialog_Header,
    Title: Dialog_Title,
    Description: Dialog_Description,
    Footer: Dialog_Footer,
    Close: DialogClose,
    CloseButton: Dialog_CloseButton,
    createHandle: createAlertDialogHandle,
  });
}

export { UiDialogsRoot, UiDialogsRoot2 };
