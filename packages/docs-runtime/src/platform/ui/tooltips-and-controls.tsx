/** BaoCut: ui tooltips and controls from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  CheckboxRoot,
  React,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  clsx,
  createTooltipHandle,
  cva,
  jsxRuntime,
  preloadModule,
  createLiveModuleNamespace,
  useRender,
} from "../dependencies";
import {
  UiDesignSystemUseLayoutEffect,
  resolveUiDesignSystemValue2,
} from "./design-system";
import {
  isUiLinksAndFoundationRelatedTarget,
  resolveUiLinksAndFoundationHref,
  resolveUiLinksAndFoundationValue3,
} from "./links-and-foundation";
import {
  UiProviderAndLayersCreateContext13,
  resolveUiProviderAndLayersDataSize,
  resolveUiProviderAndLayersUseContext10,
  resolveUiProviderAndLayersUseContext8,
  resolveUiProviderAndLayersUseContext9,
  resolveUiProviderAndLayersValue2,
  resolveUiProviderAndLayersValue3,
} from "./provider-and-layers";
import {
  UiOverlaysAndIconsCustomIcon,
  UiOverlaysAndIconsMaster,
  UiOverlaysAndIconsStyles,
  UiOverlaysAndIconsSurface,
  resolveUiOverlaysAndIconsValue2,
  resolveUiOverlaysAndIconsValue4,
  resolveUiOverlaysAndIconsValue6,
  resolveUiOverlaysAndIconsValue7,
  resolveUiOverlaysAndIconsValue9,
  useUiOverlaysAndIconsUseInsertionEffect,
  useUiOverlaysAndIconsUseInsertionEffect2,
} from "./overlays-and-icons";
import {
  UiShortcutsAndSizingCreateContext,
  UiShortcutsAndSizingCreateContext2,
  UiShortcutsAndSizingDataMode,
  UiShortcutsAndSizingGroupAriaPressedBtnBgAccentGroupHoverBtnGroupAriaPressedBtnBgAccent,
  UiShortcutsAndSizingKeys,
  UiShortcutsAndSizingMinW0BreakWords,
  UiShortcutsAndSizingOverride,
  UiShortcutsAndSizingReason,
  UiShortcutsAndSizingState2,
  UiShortcutsAndSizingState3,
  UiShortcutsAndSizingStyles10,
  UiShortcutsAndSizingStyles13,
  UiShortcutsAndSizingStyles6,
  UiShortcutsAndSizingStyles7,
  UiShortcutsAndSizingStyles8,
  UiShortcutsAndSizingStyles9,
  collectUiShortcutsAndSizingModifiers2,
  isUiShortcutsAndSizingOwnerDocument,
  isUiShortcutsAndSizingValue,
  resolveUiShortcutsAndSizingJoined,
  resolveUiShortcutsAndSizingTabIndex,
  useTooltipTrigger,
  useUiShortcutsAndSizingEnabled,
  useUiShortcutsAndSizingStart,
  useUiShortcutsAndSizingUseSyncExternalStore,
} from "./shortcuts-and-sizing";
import type * as ReactComponentTypes from "react";

export const Tooltip: ReactComponentTypes.FC<Dynamic> = ({
  content: content,
  detail: detail,
  secondaryHint: secondaryHint,
  multiline: multiline,
  shortcut: shortcut,
  side = `top`,
  align: align,
  sideOffset = 4,
  collisionPadding: collisionPadding,
  trackCursorAxis: trackCursorAxis,
  delay = 300,
  open: open,
  onOpenChange: onOpenChange,
  closeDelay: closeDelay,
  hoverable = true,
  closeOnClick: closeOnClick,
  lazy: lazy2 = false,
  openOnHandedBackFocus = false,
  triggerRef: triggerRef,
  container: container,
  className: className,
  children: children,
}) => {
  let defaultContainer: Dynamic = resolveUiProviderAndLayersUseContext9();
  let delays: Dynamic = useUiShortcutsAndSizingEnabled({
    immediate: true,
  });
  let tooltipId: Dynamic = (0, React.useId)();
  let tooltipHandleRef: Dynamic = (0, React.useRef)(null);
  let [forceInstantClose, setForceInstantClose]: Dynamic = (0, React.useState)(false);
  let closeControllerRef: Dynamic = (0, React.useRef)({
    closeInstant: (..._extraArguments: unknown[]): undefined => {
      setForceInstantClose(true);
      tooltipHandleRef.current?.close();
    },
  });
  let [cursorPosition, setCursorPosition]: Dynamic = (0, React.useState)(null);
  let [tooltipState, setTooltipState]: Dynamic = (0, React.useState)(
    UiTooltipsAndControlsOpen,
  );
  if (open === false && tooltipState.open) {
    setTooltipState(resolveUiTooltipsAndControlsOpen2);
  }
  let lazyContent = typeof content == `function`;
  let hasContent = lazyContent || !resolveUiTooltipsAndControlsEvery(content);
  let displayedBody: Dynamic = !lazyContent && hasContent ? content : tooltipState.body;
  let hasDisplayedBody = !resolveUiTooltipsAndControlsEvery(displayedBody);
  let visible: Dynamic =
    (open ?? tooltipState.open) && (!lazyContent || hasDisplayedBody);
  if (!lazyContent && hasContent && visible && !Object.is(tooltipState.body, content)) {
    setTooltipState(resolveUiTooltipsAndControlsBody2(content));
  }
  let changeOpen: Dynamic = (0, React.useCallback)(
    (input?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => {
      if (
        !openOnHandedBackFocus &&
        resolveUiTooltipsAndControlsTriggerFocus(input, options)
      )
        return false;
      if (input) {
        if (typeof content != `function`)
          setTooltipState(resolveUiTooltipsAndControlsOpen3(content));
        else if (visible) setTooltipState(resolveUiTooltipsAndControlsOpen);
        else {
          let uiTooltipsAndControlsValue: Dynamic =
            resolveUiTooltipsAndControlsValue(content);
          if (uiTooltipsAndControlsValue === UiTooltipsAndControlsState2) {
            options.cancel();
            return false;
          }
          setTooltipState(resolveUiTooltipsAndControlsOpen3(uiTooltipsAndControlsValue));
        }
        setForceInstantClose(false);
        resolveUiTooltipsAndControlsCurrent(closeControllerRef);
      } else {
        setTooltipState(
          visible ? resolveUiTooltipsAndControlsOpen2 : resolveUiTooltipsAndControlsOpen4,
        );
        if (UiTooltipsAndControlsState === closeControllerRef) {
          UiTooltipsAndControlsState = null;
        }
      }
      setCursorPosition(
        input && options.reason === `trigger-hover` ? (options.trigger ?? null) : null,
      );
      onOpenChange?.(input);
      return true;
    },
    [onOpenChange, openOnHandedBackFocus, content, visible],
  );
  let controlled = open !== undefined;
  let internalOpen: Dynamic = tooltipState.open;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!(!controlled || !hasContent || !hasDisplayedBody)) {
        if (open) {
          resolveUiTooltipsAndControlsCurrent(closeControllerRef);
        } else {
          if (UiTooltipsAndControlsState === closeControllerRef) {
            UiTooltipsAndControlsState = null;
          }
        }
        return (..._extraArguments: unknown[]): undefined => {
          if (!internalOpen && UiTooltipsAndControlsState === closeControllerRef) {
            UiTooltipsAndControlsState = null;
          }
        };
      }
    },
    [controlled, open, hasContent, hasDisplayedBody, internalOpen, lazyContent],
  );
  let onClosed: Dynamic = (0, React.useCallback)(
    (input?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (!input) {
        setForceInstantClose(false);
        setCursorPosition(null);
        setTooltipState(resolveUiTooltipsAndControlsBody);
      }
    },
    [],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!cursorPosition) return;
      let ownerDocument2: Dynamic = cursorPosition.ownerDocument;
      let closeInstant = (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        let target: Dynamic = event.target;
        if (target && target !== cursorPosition && target.contains(cursorPosition)) {
          closeControllerRef.current.closeInstant();
        }
      };
      ownerDocument2.addEventListener(`scroll`, closeInstant, {
        capture: true,
        passive: true,
      });
      return (..._extraArguments: unknown[]): undefined => {
        ownerDocument2.removeEventListener(`scroll`, closeInstant, {
          capture: true,
        });
      };
    },
    [cursorPosition],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): undefined => {
        if (UiTooltipsAndControlsState === closeControllerRef) {
          UiTooltipsAndControlsState = null;
        }
      },
    [],
  );
  let modalContext: Dynamic = resolveUiProviderAndLayersValue3(`tooltip`);
  let [lazyHandle]: Dynamic = (0, React.useState)(
    (..._extraArguments: unknown[]): Dynamic =>
      lazy2 && open === undefined ? createTooltipHandle() : null,
  );
  let [lazyReady, setLazyReady]: Dynamic = (0, React.useState)(false);
  let renderReady: Dynamic = lazyReady || lazyHandle === null;
  let contentResolvedRef: Dynamic = (0, React.useRef)(false);
  let markLazyReady: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): undefined => {
      contentResolvedRef.current = true;
      setLazyReady(true);
    },
    [],
  );
  let hoverDelay: Dynamic = useUiShortcutsAndSizingStart();
  let hoveredTriggerRef: Dynamic = (0, React.useRef)(null);
  let handedBackOpenRef: Dynamic = (0, React.useRef)(false);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (open === false) {
        handedBackOpenRef.current = false;
      }
    },
    [open],
  );
  let resolveLazyContent: Dynamic = useUiOverlaysAndIconsUseInsertionEffect(
    (..._extraArguments: unknown[]): undefined => {
      if (contentResolvedRef.current || renderReady || !hasContent || open !== undefined)
        return;
      let tooltipResult: Dynamic;
      if (typeof content == `function`) {
        let uiTooltipsAndControlsValue: Dynamic =
          resolveUiTooltipsAndControlsValue(content);
        if (uiTooltipsAndControlsValue === UiTooltipsAndControlsState2) return;
        tooltipResult = uiTooltipsAndControlsValue;
      } else tooltipResult = content;
      markLazyReady();
      setForceInstantClose(false);
      resolveUiTooltipsAndControlsCurrent(closeControllerRef);
      setCursorPosition(hoveredTriggerRef.current);
      setTooltipState(resolveUiTooltipsAndControlsOpen3(tooltipResult));
      handedBackOpenRef.current = true;
      onOpenChange?.(true);
    },
  );
  let onPointerEnter: Dynamic = useUiOverlaysAndIconsUseInsertionEffect(
    (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (!(renderReady || event.pointerType === `touch`)) {
        if (hasContent) {
          hoveredTriggerRef.current = event.currentTarget;
          hoverDelay.start(delay, resolveLazyContent);
        }
      }
    },
  );
  let cancelHoverDelay: Dynamic = useUiOverlaysAndIconsUseInsertionEffect(
    (..._extraArguments: unknown[]): undefined => {
      if (closeOnClick !== false) {
        hoverDelay.cancel();
      }
    },
  );
  let onVisibleFocus: Dynamic = useUiOverlaysAndIconsUseInsertionEffect(
    (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (!renderReady) {
        if (event.target.matches(`:focus-visible`)) {
          if (
            !(
              !openOnHandedBackFocus &&
              isUiLinksAndFoundationRelatedTarget(event.nativeEvent)
            )
          ) {
            hoveredTriggerRef.current = null;
            hoverDelay.cancel();
            resolveLazyContent();
          }
        }
      }
    },
  );
  if (lazyHandle !== null && open === true && !lazyReady) {
    setLazyReady(true);
  }
  let onOpenChange2: Dynamic = (0, React.useCallback)(
    (input?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (
        !(
          !openOnHandedBackFocus &&
          resolveUiTooltipsAndControlsTriggerFocus(input, options)
        )
      ) {
        if (input && handedBackOpenRef.current && visible) {
          setTooltipState(resolveUiTooltipsAndControlsOpen);
          return;
        }
        if (changeOpen(input, options)) {
          handedBackOpenRef.current = input;
        }
      }
    },
    [changeOpen, openOnHandedBackFocus, visible],
  );
  let triggerElement: Dynamic =
    (0, React.isValidElement)(children) && children.type !== React.Fragment
      ? children
      : (input?: Dynamic, ..._extraArguments: unknown[]) => (
          <span {...input} className={`inline-flex`}>
            {children}
          </span>
        );
  let trigger = (
    <TooltipTrigger
      ref={triggerRef}
      id={tooltipId}
      delay={delay}
      closeDelay={closeDelay}
      closeOnClick={closeOnClick}
      handle={lazyHandle ?? undefined}
      disabled={lazyHandle !== null && !renderReady ? !hasContent : undefined}
      onPointerEnter={lazyHandle ? onPointerEnter : undefined}
      onPointerLeave={lazyHandle ? hoverDelay.cancel : undefined}
      onPointerDown={lazyHandle ? cancelHoverDelay : undefined}
      onFocus={lazyHandle ? onVisibleFocus : undefined}
      render={triggerElement}
    />
  );
  let popup =
    renderReady && hasDisplayedBody ? (
      <TooltipPortal container={container ?? defaultContainer}>
        <UiOverlaysAndIconsSurface>
          <UiShortcutsAndSizingOverride
            override={collisionPadding}
            container={container ?? defaultContainer}
          >
            {(collisionPadding2?: Dynamic, ..._extraArguments: unknown[]) => (
              <UiProviderAndLayersCreateContext13.Provider value={modalContext.base}>
                <TooltipPositioner
                  data-cds={`Tooltip`}
                  className={`data-[anchor-hidden]:invisible`}
                  style={modalContext.style}
                  side={side}
                  align={align}
                  sideOffset={sideOffset}
                  collisionPadding={collisionPadding2}
                >
                  <TooltipPopup
                    ref={delays}
                    role={`tooltip`}
                    style={
                      forceInstantClose
                        ? {
                            transition: `none`,
                          }
                        : undefined
                    }
                    className={resolveUiDesignSystemValue2(
                      UiTooltipsAndControlsState3,
                      UiTooltipsAndControlsState4,
                      multiline || detail || secondaryHint
                        ? UiTooltipsAndControlsState5
                        : UiTooltipsAndControlsStyles,
                      !shortcut && UiTooltipsAndControlsTextBalance,
                      className,
                    )}
                  >
                    <UiShortcutsAndSizingDataMode>
                      {multiline || detail || secondaryHint ? (
                        <jsxRuntime.Fragment>
                          <span className={`inline-flex min-w-0 items-center gap-2`}>
                            <span className={UiShortcutsAndSizingMinW0BreakWords}>
                              {displayedBody}
                            </span>
                            {shortcut && <UiTooltipsAndControlsKeys keys={shortcut} />}
                          </span>
                          {secondaryHint && (
                            <span className={`inline-flex min-w-0 items-center gap-2`}>
                              <span className={`min-w-0 break-words`}>
                                {secondaryHint.label}
                              </span>
                              <UiTooltipsAndControlsKeys keys={secondaryHint.shortcut} />
                            </span>
                          )}
                          {detail && (
                            <span
                              className={`break-words text-[calc(0.6875rem*var(--cds-rem-scale,1))]/[calc(0.875rem*var(--cds-rem-scale,1))] text-secondary`}
                            >
                              {detail}
                            </span>
                          )}
                        </jsxRuntime.Fragment>
                      ) : (
                        <jsxRuntime.Fragment>
                          <span className={UiShortcutsAndSizingMinW0BreakWords}>
                            {displayedBody}
                          </span>
                          {shortcut && (
                            <UiTooltipsAndControlsKeys
                              keys={shortcut}
                              className={UiTooltipsAndControlsSelfStart}
                            />
                          )}
                        </jsxRuntime.Fragment>
                      )}
                    </UiShortcutsAndSizingDataMode>
                  </TooltipPopup>
                </TooltipPositioner>
              </UiProviderAndLayersCreateContext13.Provider>
            )}
          </UiShortcutsAndSizingOverride>
        </UiOverlaysAndIconsSurface>
      </TooltipPortal>
    ) : null;
  return lazyHandle ? (
    <jsxRuntime.Fragment>
      <UiShortcutsAndSizingCreateContext2.Provider value={UiTooltipsAndControlsTooltip}>
        <UiShortcutsAndSizingCreateContext.Provider value={hasContent}>
          {trigger}
        </UiShortcutsAndSizingCreateContext.Provider>
      </UiShortcutsAndSizingCreateContext2.Provider>
      {renderReady && (
        <TooltipRoot
          handle={lazyHandle}
          open={visible}
          disableHoverablePopup={!hoverable}
          trackCursorAxis={trackCursorAxis}
          disabled={!hasContent}
          actionsRef={tooltipHandleRef}
          onOpenChange={onOpenChange2}
          onOpenChangeComplete={onClosed}
          triggerId={tooltipId}
        >
          {popup}
        </TooltipRoot>
      )}
    </jsxRuntime.Fragment>
  ) : (
    <TooltipRoot
      open={visible}
      disableHoverablePopup={!hoverable}
      trackCursorAxis={trackCursorAxis}
      disabled={!hasContent}
      actionsRef={tooltipHandleRef}
      onOpenChange={changeOpen}
      onOpenChangeComplete={onClosed}
      triggerId={tooltipId}
    >
      <UiShortcutsAndSizingCreateContext2.Provider value={UiTooltipsAndControlsTooltip}>
        <UiShortcutsAndSizingCreateContext.Provider value={hasContent}>
          {trigger}
        </UiShortcutsAndSizingCreateContext.Provider>
      </UiShortcutsAndSizingCreateContext2.Provider>
      {popup}
    </TooltipRoot>
  );
};

export const UiTooltipsAndControlsDelay: ReactComponentTypes.FC<Dynamic> = ({
  size = `sm`,
  delay = 0,
  inheritColor = false,
  label: label,
  className: className,
}) => {
  let [matchesDelayState, setMatchesDelayState]: Dynamic = (0, React.useState)(
    delay <= 0,
  );
  let [delayState, setDelayState]: Dynamic = (0, React.useState)(delay);
  if (delay !== delayState) {
    setDelayState(delay);
    if (delay > 0 && matchesDelayState) {
      setMatchesDelayState(false);
    }
  }
  let show: Dynamic = delay <= 0 || matchesDelayState;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (delay <= 0) return;
      let setTimeout2: Dynamic = (window as Dynamic).setTimeout(
        (..._extraArguments: unknown[]): Dynamic => setMatchesDelayState(true),
        delay,
      );
      return (..._extraArguments: unknown[]): Dynamic =>
        (window as Dynamic).clearTimeout(setTimeout2);
    },
    [delay],
  );
  let UiTooltipsAndControlsBoxItem: Dynamic =
    UiTooltipsAndControlsBox[UiTooltipsAndControlsState6[size] ?? size];
  let label2: string = inheritColor ? `currentColor` : `var(--cds-text-muted)`;
  let label3: string = inheritColor
    ? `color-mix(in srgb, currentColor 25%, transparent)`
    : `var(--cds-border)`;
  let width: string = resolveUiOverlaysAndIconsValue6(UiTooltipsAndControlsBoxItem.box);
  let uiOverlaysAndIconsValue6: string = resolveUiOverlaysAndIconsValue6(
    UiTooltipsAndControlsBoxItem.stroke,
  );
  let label4: string = `calc(100% - ${uiOverlaysAndIconsValue6})`;
  let WebkitMask: string = `radial-gradient(farthest-side, transparent ${label4}, #000 calc(${label4} + 0.5px))`;
  let jsxs: Dynamic = show ? (
    <span
      data-cds={`Spinner`}
      className={resolveUiDesignSystemValue2(
        `relative inline-block shrink-0 align-middle`,
        className,
      )}
      style={{
        width: width,
        height: width,
      }}
      aria-hidden={true}
    >
      <span
        className={`absolute inset-0 rounded-full`}
        style={{
          border: `${uiOverlaysAndIconsValue6} solid ${label3}`,
        }}
      />
      <span
        className={`absolute inset-0 rounded-full animate-[spin_1s_linear_infinite] motion-reduce:animate-none`}
        style={{
          background: `conic-gradient(transparent 40%, ${label2})`,
          WebkitMask: WebkitMask,
          mask: WebkitMask,
        }}
      />
    </span>
  ) : null;
  return label ? (
    <span role={`status`} className={`leading-[0]`}>
      {jsxs}
      <UiTooltipsAndControlsShow show={show}>{label}</UiTooltipsAndControlsShow>
    </span>
  ) : (
    jsxs
  );
};

export const UiTooltipsAndControlsShow: ReactComponentTypes.FC<Dynamic> = ({
  show: show,
  children: children,
}) => {
  let [enabledState, setEnabledState]: Dynamic = (0, React.useState)(false);
  (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    let setTimeout2 = window.setTimeout(
      (..._extraArguments: unknown[]): Dynamic => setEnabledState(true),
      100,
    );
    return (..._extraArguments: unknown[]) => window.clearTimeout(setTimeout2);
  }, []);
  return show && enabledState ? <span className={`sr-only`}>{children}</span> : null;
};

export const UiTooltipsAndControlsKeys: ReactComponentTypes.FC<Dynamic> = ({
  keys: keys,
  className: className,
}) => {
  return (
    <UiShortcutsAndSizingKeys
      keys={keys}
      variant={`text`}
      className={resolveUiDesignSystemValue2(
        `text-[calc(0.75rem*var(--cds-rem-scale,1))] [--cds-shortcut-cap-ink:var(--cds-text-muted)]`,
        className,
      )}
    />
  );
};

export const DisabledReasonTooltip: ReactComponentTypes.FC<Dynamic> = ({
  reason: reason,
  side: side,
  align: align,
  sideOffset: sideOffset,
  multiline = true,
  delay: delay,
  collisionPadding: collisionPadding,
  hoverable: hoverable,
  className: className,
  wrapperClassName: wrapperClassName,
  children: children,
}) => {
  let controlId: Dynamic = (0, React.useId)();
  return (
    <Tooltip
      content={isUiShortcutsAndSizingValue(reason) ? reason : undefined}
      side={side}
      align={align}
      sideOffset={sideOffset}
      multiline={multiline}
      delay={delay}
      collisionPadding={collisionPadding}
      hoverable={hoverable}
      className={className}
      closeOnClick={false}
      openOnHandedBackFocus={true}
    >
      <span {...resolveUiShortcutsAndSizingTabIndex(reason, controlId, wrapperClassName)}>
        {children}
        {<UiShortcutsAndSizingReason id={controlId} reason={reason} />}
      </span>
    </Tooltip>
  );
};

export const TooltipImplProvider: ReactComponentTypes.FC<Dynamic> = ({
  children: children,
}) => {
  return (
    <UiShortcutsAndSizingCreateContext2.Provider value={UiTooltipsAndControlsTooltip}>
      {children}
    </UiShortcutsAndSizingCreateContext2.Provider>
  );
};

export const TooltipGroup: ReactComponentTypes.FC<Dynamic> = ({
  delay = 600,
  closeDelay = 200,
  children: children,
}) => {
  return (
    <UiTooltipsAndControlsCreateContext.Provider value={true}>
      <TooltipProvider delay={delay} closeDelay={closeDelay}>
        {children}
      </TooltipProvider>
    </UiTooltipsAndControlsCreateContext.Provider>
  );
};

export const UiTooltipsAndControlsImpl: ReactComponentTypes.FC<Dynamic> = (node) => {
  let {
    impl: useUiTooltipsAndControlsImpl2,
    wasCold: useUiTooltipsAndControlsImpl3,
    interceptors: useUiTooltipsAndControlsImpl4,
    trackTrigger: triggerRef,
  }: Dynamic = useUiTooltipsAndControlsImpl(true);
  let matchesAutoFocus = node.autoFocus === false;
  if (useUiTooltipsAndControlsImpl2 !== null)
    return useUiTooltipsAndControlsImpl3 || matchesAutoFocus ? (
      <useUiTooltipsAndControlsImpl2.Tooltip {...node} triggerRef={triggerRef}>
        {resolveUiTooltipsAndControlsAutoFocus(node.children)}
      </useUiTooltipsAndControlsImpl2.Tooltip>
    ) : (
      <useUiTooltipsAndControlsImpl2.Tooltip {...node} />
    );
  let { children: node2 }: Dynamic = node;
  if (!(0, React.isValidElement)(node2))
    return <jsxRuntime.Fragment>{node2}</jsxRuntime.Fragment>;
  let node3: Dynamic = node2;
  return (0, React.cloneElement)(node3, {
    ...useUiTooltipsAndControlsImpl4(node3.props),
    ...UiTooltipsAndControlsTooltipPending,
  });
};

export const UiTooltipsAndControlsImpl2: ReactComponentTypes.FC<Dynamic> = (node) => {
  let {
    impl: useUiTooltipsAndControlsImpl2,
    wasCold: useUiTooltipsAndControlsImpl3,
    interceptors: useUiTooltipsAndControlsImpl4,
  }: Dynamic = useUiTooltipsAndControlsImpl(false);
  let controlId: Dynamic = (0, React.useId)();
  if (useUiTooltipsAndControlsImpl2 !== null)
    return useUiTooltipsAndControlsImpl3 ? (
      <useUiTooltipsAndControlsImpl2.DisabledReasonTooltip {...node}>
        {resolveUiTooltipsAndControlsAutoFocus(node.children)}
      </useUiTooltipsAndControlsImpl2.DisabledReasonTooltip>
    ) : (
      <useUiTooltipsAndControlsImpl2.DisabledReasonTooltip {...node} />
    );
  let { reason: reason, wrapperClassName: node2, children: node3 }: Dynamic = node;
  return (
    <span
      {...resolveUiShortcutsAndSizingTabIndex(reason, controlId, node2)}
      title={typeof reason == `string` ? reason : undefined}
      {...useUiTooltipsAndControlsImpl4({})}
      {...UiTooltipsAndControlsTooltipPending}
    >
      {node3}
      {<UiShortcutsAndSizingReason id={controlId} reason={reason} />}
    </span>
  );
};

export const UiTooltipsAndControlsIndeterminate: ReactComponentTypes.FC<Dynamic> = ({
  indeterminate = false,
}) => {
  return (
    <UiOverlaysAndIconsCustomIcon
      name={indeterminate ? `Minus` : `Check`}
      size={`sm`}
      bold={true}
      style={{
        fontSize: `var(--cds-checkbox-glyph)`,
      }}
    />
  );
};

export const UiTooltipsAndControlsChecked: ReactComponentTypes.FC<Dynamic> = ({
  checked: checked,
  indeterminate = false,
  className: className,
}) => {
  let checked2: Dynamic = checked || indeterminate;
  return (
    <span
      data-checked={checked && !indeterminate ? `` : undefined}
      data-indeterminate={indeterminate ? `` : undefined}
      data-unchecked={checked2 ? undefined : ``}
      className={resolveUiDesignSystemValue2(
        UiTooltipsAndControlsStyles5,
        checked2 && `bg-fill-accent border-transparent`,
        className,
      )}
    >
      {checked2 && (
        <span className={`text-on-accent`}>
          <UiTooltipsAndControlsIndeterminate indeterminate={indeterminate} />
        </span>
      )}
    </span>
  );
};

var UiTooltipsAndControlsDisabledReasonTooltip: Dynamic;

var UiTooltipsAndControlsState: Dynamic;

function resolveUiTooltipsAndControlsTriggerFocus(
  ui2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return ui2 &&
    options.reason === `trigger-focus` &&
    isUiLinksAndFoundationRelatedTarget(options.event)
    ? (options.cancel(), true)
    : false;
}

function resolveUiTooltipsAndControlsCurrent(
  ui2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (
    UiTooltipsAndControlsState !== null &&
    UiTooltipsAndControlsState !== ui2
  ) {
    UiTooltipsAndControlsState.current?.closeInstant();
  }
  UiTooltipsAndControlsState = ui2;
}

function resolveUiTooltipsAndControlsEvery(
  ui2?: unknown,
  ..._extraArguments: unknown[]
) {
  return (
    ui2 == null ||
    ui2 === `` ||
    typeof ui2 == `boolean` ||
    (Array.isArray(ui2) && ui2.every(resolveUiTooltipsAndControlsEvery))
  );
}

var UiTooltipsAndControlsState2: symbol;

function resolveUiTooltipsAndControlsValue(
  ui2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let ui3: Dynamic = ui2();
  return resolveUiTooltipsAndControlsEvery(ui3)
    ? UiTooltipsAndControlsState2
    : ui3;
}

var UiTooltipsAndControlsOpen: {
    open: boolean;
    body: undefined;
};

var resolveUiTooltipsAndControlsOpen: Dynamic;

var resolveUiTooltipsAndControlsOpen2: Dynamic;

var resolveUiTooltipsAndControlsBody: Dynamic;

var resolveUiTooltipsAndControlsOpen3: Dynamic;

var resolveUiTooltipsAndControlsBody2: Dynamic;

var resolveUiTooltipsAndControlsOpen4: Dynamic;

var UiTooltipsAndControlsState3: string;

var UiTooltipsAndControlsTextBalance: string;

var UiTooltipsAndControlsState4: string;

var UiTooltipsAndControlsStyles: string;

var UiTooltipsAndControlsSelfStart: string;

var UiTooltipsAndControlsState5: string;

var OverflowTooltip: Dynamic;

var UiTooltipsAndControlsTooltip: Dynamic;

var UiTooltipsAndControlsCreateContext: Dynamic;

function useTooltipGroup(..._extraArguments: unknown[]): Dynamic {
  return (0, React.useContext)(UiTooltipsAndControlsCreateContext);
}

var UiTooltipsAndControlsState6: Dynamic;

var UiTooltipsAndControlsBox: Dynamic;

var UiTooltipsAndControlsState7: Dynamic;

var UiTooltipsAndControlsState8: Dynamic;

var uiTooltipsAndControlsSet: Dynamic;

var UiTooltipsAndControlsState9: Dynamic;

var uiTooltipsAndControlsSet2: Dynamic;

function resolveUiTooltipsAndControlsClear(
  ui2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  uiTooltipsAndControlsSet2.add(ui2);
  UiTooltipsAndControlsState9 ??= setTimeout(
    (..._extraArguments: unknown[]): undefined => {
      UiTooltipsAndControlsState9 = null;
      let items: Dynamic = [...uiTooltipsAndControlsSet2];
      uiTooltipsAndControlsSet2.clear();
      for (let resolveUiTooltipsAndControlsClearResult of items as Dynamic)
        resolveUiTooltipsAndControlsClearResult();
    },
    0,
  );
}

function clearUiTooltipsAndControlsDelete(
  clearUi?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  uiTooltipsAndControlsSet2.delete(clearUi);
}

function resolveUiTooltipsAndControlsThen(
  ..._extraArguments: unknown[]
): Dynamic {
  UiTooltipsAndControlsState8 ??= preloadModule(
    (..._extraArguments: unknown[]): Dynamic =>
      Promise.resolve()
        .then(
          (..._extraArguments: unknown[]): Dynamic =>
            UiTooltipsAndControlsDisabledReasonTooltip,
        )
        .then(
          (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
            UiTooltipsAndControlsState7 = result;
            for (let resolveUiTooltipsAndControlsThenResult of uiTooltipsAndControlsSet as Dynamic)
              resolveUiTooltipsAndControlsThenResult();
            return result;
          },
          (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            throw ((UiTooltipsAndControlsState8 = null), result);
          },
        ),
    undefined,
    import.meta.url,
  );
  return UiTooltipsAndControlsState8;
}

var uiTooltipsAndControlsPointermoveKeydownTouchstartValues: string[];

var uiTooltipsAndControlsValue_1: boolean;

function installUiTooltipsAndControlsCapture(
  ..._extraArguments: unknown[]
): undefined {
  if (
    !(uiTooltipsAndControlsValue_1 || UiTooltipsAndControlsState7 !== null) &&
    !(typeof document === "undefined")
  ) {
    uiTooltipsAndControlsValue_1 = true;
    for (let installUiTooltipsAndControlsCaptureResult of uiTooltipsAndControlsPointermoveKeydownTouchstartValues as Dynamic)
      document.addEventListener(
        installUiTooltipsAndControlsCaptureResult,
        resolveUiTooltipsAndControlsCatch,
        {
          capture: true,
          passive: true,
          once: true,
        },
      );
  }
}

function resolveUiTooltipsAndControlsCatch(
  ..._extraArguments: unknown[]
): undefined {
  resolveUiTooltipsAndControlsThen().catch(
    (..._extraArguments: unknown[]): undefined => undefined,
  );
}

function resolveUiTooltipsAndControlsNode(
  ui2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  ui2.node = options;
  if (options !== null) {
    ui2.adopted = true;
    if (ui2.handBack) {
      ui2.handBack = false;
      queueMicrotask((..._extraArguments: unknown[]) =>
        resolveUiTooltipsAndControlsPreventScroll(ui2, options),
      );
    }
  }
}

function resolveUiTooltipsAndControlsPreventScroll(
  ui2?: Dynamic,
  element?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (!element.isConnected || !ui2.focus) return;
  let activeElement2: Dynamic = element.ownerDocument.activeElement;
  if (
    !(activeElement2 !== null && activeElement2 !== element.ownerDocument.body)
  ) {
    element.focus({
      preventScroll: true,
    });
  }
}

var UiTooltipsAndControlsTooltipPending: {
    "data-cds-tooltip-pending": string;
};

var uiTooltipsAndControlsValue700: number;

function resolveUiTooltipsAndControlsTapHold(
  ui2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (ui2.tapHold !== null) {
    clearTimeout(ui2.tapHold);
    ui2.tapHold = null;
  }
}

function resolveUiTooltipsAndControlsPointerup(
  ui2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  resolveUiTooltipsAndControlsTapHold(ui2);
  if (
    ui2.down &&
    options.type === `pointerup` &&
    (options.pointerType === `touch` || options.pointerType === `pen`)
  ) {
    ui2.tapHold = setTimeout((..._extraArguments: unknown[]): undefined => {
      ui2.tapHold = null;
      ui2.down = false;
      context();
    }, uiTooltipsAndControlsValue700);
    return;
  }
  ui2.down = false;
  context();
}

function resolveUiTooltipsAndControlsAmbientImpl(
  ui2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return UiTooltipsAndControlsState7 === null
    ? ui2 === null
      ? null
      : ui2.ambientImpl()
    : UiTooltipsAndControlsState7;
}

var UiTooltipsAndControlsCreateContext2: Dynamic;

function isUiTooltipsAndControlsActiveElement(
  element?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (element.ownerDocument.activeElement !== element) return false;
  try {
    return !element.matches(`:focus-visible`);
  } catch {
    return false;
  }
}

function useUiTooltipsAndControlsImpl(
  ui2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let useContext: Dynamic = (0, React.useContext)(
    UiShortcutsAndSizingCreateContext2,
  );
  let useContext2: Dynamic = (0, React.useContext)(
    UiTooltipsAndControlsCreateContext2,
  );
  let [
    useUiTooltipsAndControlsImplState,
    setUseUiTooltipsAndControlsImplState,
  ]: Dynamic = (0, React.useState)((..._extraArguments: unknown[]): Dynamic => {
    let impl2: Dynamic =
      useContext ??
      (useContext2 !== null && useContext2.isDeferred()
        ? null
        : resolveUiTooltipsAndControlsAmbientImpl(useContext2));
    return impl2 === null
      ? null
      : {
          impl: impl2,
          track: undefined,
        };
  });
  let impl: Dynamic =
    useUiTooltipsAndControlsImplState === null
      ? null
      : useUiTooltipsAndControlsImplState.impl;
  let [wasCold]: Dynamic = (0, React.useState)(impl === null);
  let recordRef: Dynamic = (0, React.useRef)({
    hover: false,
    focus: false,
    down: false,
    node: null,
    adopted: false,
    handBack: false,
    tapHold: null,
  });
  let enabledRef: Dynamic = (0, React.useRef)(false);
  let isDeferred: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): undefined => {
      if (
        recordRef.current.adopted ||
        (useContext2 !== null && useContext2.isDeferred())
      )
        return;
      let {
        hover: record2,
        focus: record3,
        down: record4,
        node: record5,
      }: Dynamic = recordRef.current;
      if (record4) return;
      let enabled: Dynamic = enabledRef.current;
      enabledRef.current = false;
      let record6: Dynamic =
        record3 &&
        ui2 &&
        record5 !== null &&
        isUiTooltipsAndControlsActiveElement(record5);
      if (record3 && !record6) return;
      let impl2: Dynamic = resolveUiTooltipsAndControlsAmbientImpl(useContext2);
      if (impl2 !== null && (!record2 || enabled)) {
        let record7: Dynamic = recordRef.current;
        record7.handBack = record6;
        setUseUiTooltipsAndControlsImplState(
          (ui3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            ui3 ?? {
              impl: impl2,
              track: ui2
                ? (ui4?: Dynamic, ..._extraArguments: unknown[]) =>
                    resolveUiTooltipsAndControlsNode(record7, ui4)
                : undefined,
            },
        );
      }
    },
    [useContext2, ui2],
  );
  let resolveUiTooltipsAndControlsClear2: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): undefined => {
      if (resolveUiTooltipsAndControlsAmbientImpl(useContext2) !== null) {
        resolveUiTooltipsAndControlsClear(isDeferred);
      }
    },
    [useContext2, isDeferred],
  );
  let resolveUiTooltipsAndControlsClear3: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): undefined => {
      enabledRef.current =
        resolveUiTooltipsAndControlsAmbientImpl(useContext2) !== null;
      resolveUiTooltipsAndControlsClear2();
    },
    [resolveUiTooltipsAndControlsClear2, useContext2],
  );
  let elementRef: Dynamic = (0, React.useRef)(null);
  let removeEventListener2: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): undefined => {
      let element: Dynamic = elementRef.current;
      if (element !== null) {
        elementRef.current = null;
        element.doc.removeEventListener(`pointerup`, element.release, true);
        element.doc.removeEventListener(`pointercancel`, element.release, true);
      }
    },
    [],
  );
  let addEventListener3: Dynamic = (0, React.useCallback)(
    (
      doc?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (elementRef.current !== null) return;
      let release = (
        ui3?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let pointerId: Dynamic = ui3.pointerId;
        if (
          !(
            options !== undefined &&
            pointerId !== undefined &&
            pointerId !== options
          )
        ) {
          removeEventListener2();
          resolveUiTooltipsAndControlsPointerup(
            recordRef.current,
            ui3,
            resolveUiTooltipsAndControlsClear2,
          );
        }
      };
      elementRef.current = {
        doc: doc,
        release: release,
      };
      doc.addEventListener(`pointerup`, release, {
        capture: true,
      });
      doc.addEventListener(`pointercancel`, release, {
        capture: true,
      });
    },
    [resolveUiTooltipsAndControlsClear2, removeEventListener2],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!wasCold) return;
      installUiTooltipsAndControlsCapture();
      let record2: Dynamic = recordRef.current;
      let removeEventListener3 = (..._extraArguments: unknown[]): undefined => {
        clearUiTooltipsAndControlsDelete(isDeferred);
        if (record2.tapHold !== null) {
          resolveUiTooltipsAndControlsTapHold(record2);
          record2.down = false;
        }
        removeEventListener2();
      };
      let items: Dynamic = [];
      let matchesUseContext: Dynamic =
        useContext2 !== null && useContext2.isDeferred();
      if (matchesUseContext) {
        items.push(useContext2.subscribe(resolveUiTooltipsAndControlsClear3));
      }
      if (UiTooltipsAndControlsState7 === null) {
        uiTooltipsAndControlsSet.add(resolveUiTooltipsAndControlsClear2);
        items.push(
          (..._extraArguments: unknown[]): Dynamic =>
            uiTooltipsAndControlsSet.delete(resolveUiTooltipsAndControlsClear2),
        );
      }
      if (
        !matchesUseContext &&
        resolveUiTooltipsAndControlsAmbientImpl(useContext2) !== null
      ) {
        if (useContext2 !== null) {
          enabledRef.current = true;
        }
        resolveUiTooltipsAndControlsClear2();
      }
      return (..._extraArguments: unknown[]): undefined => {
        for (let useUiTooltipsAndControlsImplResult of items as Dynamic)
          useUiTooltipsAndControlsImplResult();
        removeEventListener3();
      };
    },
    [
      resolveUiTooltipsAndControlsClear2,
      resolveUiTooltipsAndControlsClear3,
      useContext2,
      removeEventListener2,
      isDeferred,
      wasCold,
    ],
  );
  let resolveUiTooltipsAndControlsThen2: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): undefined => {
      resolveUiTooltipsAndControlsThen().catch(
        (..._extraArguments: unknown[]): undefined => undefined,
      );
    },
    [],
  );
  return {
    impl: impl,
    wasCold: wasCold,
    interceptors: (0, React.useCallback)(
      (ui3?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        let useUiTooltipsAndControlsImplHandler: Dynamic =
          (
            ui4?: Dynamic,
            options?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
          (ui5?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            ui4(ui5);
            options?.(ui5);
          };
        return {
          onPointerEnter: useUiTooltipsAndControlsImplHandler(
            (..._extraArguments: unknown[]): undefined => {
              recordRef.current.hover = true;
              resolveUiTooltipsAndControlsThen2();
            },
            ui3.onPointerEnter,
          ),
          onPointerLeave: useUiTooltipsAndControlsImplHandler(
            (..._extraArguments: unknown[]): undefined => {
              recordRef.current.hover = false;
              resolveUiTooltipsAndControlsClear2();
            },
            ui3.onPointerLeave,
          ),
          onPointerDown: useUiTooltipsAndControlsImplHandler(
            (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
              if (event.isPrimary !== false && event.button === 0) {
                resolveUiTooltipsAndControlsTapHold(recordRef.current);
                recordRef.current.down = true;
                addEventListener3(
                  event.currentTarget.ownerDocument,
                  event.pointerId,
                );
              }
            },
            ui3.onPointerDown,
          ),
          onPointerUp: useUiTooltipsAndControlsImplHandler(
            (ui4?: Dynamic, ..._extraArguments: unknown[]): undefined => {
              if (ui4.isPrimary !== false) {
                resolveUiTooltipsAndControlsPointerup(
                  recordRef.current,
                  ui4,
                  resolveUiTooltipsAndControlsClear2,
                );
              }
            },
            ui3.onPointerUp,
          ),
          onPointerCancel: useUiTooltipsAndControlsImplHandler(
            (ui4?: Dynamic, ..._extraArguments: unknown[]): undefined => {
              if (ui4.isPrimary !== false) {
                resolveUiTooltipsAndControlsPointerup(
                  recordRef.current,
                  ui4,
                  resolveUiTooltipsAndControlsClear2,
                );
              }
            },
            ui3.onPointerCancel,
          ),
          onClick: useUiTooltipsAndControlsImplHandler(
            (ui4?: Dynamic, ..._extraArguments: unknown[]): undefined => {
              if (recordRef.current.tapHold !== null) {
                resolveUiTooltipsAndControlsPointerup(
                  recordRef.current,
                  ui4,
                  resolveUiTooltipsAndControlsClear2,
                );
              }
            },
            ui3.onClick,
          ),
          onFocus: useUiTooltipsAndControlsImplHandler(
            (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
              recordRef.current.focus = true;
              recordRef.current.node = resolveUiProviderAndLayersValue2(
                event.currentTarget,
              );
              resolveUiTooltipsAndControlsThen2();
            },
            ui3.onFocus,
          ),
          onBlur: useUiTooltipsAndControlsImplHandler(
            (..._extraArguments: unknown[]): undefined => {
              recordRef.current.focus = false;
              resolveUiTooltipsAndControlsClear2();
            },
            ui3.onBlur,
          ),
        };
      },
      [
        resolveUiTooltipsAndControlsClear2,
        addEventListener3,
        resolveUiTooltipsAndControlsThen2,
      ],
    ),
    trackTrigger: useUiTooltipsAndControlsImplState?.track,
  };
}

function resolveUiTooltipsAndControlsAutoFocus(
  ui2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (0, React.isValidElement)<{ autoFocus?: boolean }>(ui2)
    ? (0, React.cloneElement)(ui2, {
        autoFocus: false,
      })
    : ui2;
}

var UiTooltipsAndControlsCompact: Dynamic;

function resolveUiTooltipsAndControlsUseContext(
  ..._extraArguments: unknown[]
): Dynamic {
  return (0, React.useContext)(UiTooltipsAndControlsCompact);
}

var UiTooltipsAndControlsDataCdsCompactable: string;

function useUiTooltipsAndControlsState(
  ui2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {},
    [ui2, options],
  );
}

var resolveUiTooltipsAndControlsPreventDefault: (event?: Dynamic, ..._extraArguments: unknown[]) => undefined;

function resolveUiTooltipsAndControlsEnter(
  event?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return event.key === `Enter` || event.key === ` `;
}

function resolveUiTooltipsAndControlsCtrlKey(
  ui2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    resolveUiTooltipsAndControlsEnter(ui2) &&
    !ui2.ctrlKey &&
    !ui2.metaKey &&
    !ui2.altKey &&
    !ui2.shiftKey
  );
}

var UiTooltipsAndControlsStyles2: string;

var UiTooltipsAndControlsStyles3: string;

var UiTooltipsAndControlsVariants: Dynamic;

var UiTooltipsAndControlsStyles4: string;

var UiTooltipsAndControlsVariants2: Dynamic;

var UiTooltipsAndControlsCreateContext3: Dynamic;

function resolveUiTooltipsAndControlsUseContext2(
  ..._extraArguments: unknown[]
): Dynamic {
  return (0, React.useContext)(UiTooltipsAndControlsCreateContext3);
}

var UiTooltipsAndControlsStart: Dynamic;

var UiTooltipsAndControlsStart2: Dynamic;

var UiTooltipsAndControlsCdsOutsetX: {
    "--cds-outset-x": string;
};

function resolveUiTooltipsAndControlsAutoSm(
  ui2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return ui2 === `xs` || ui2 === `xxs`
    ? `auto-sm`
    : ui2 === `lg`
      ? `md`
      : `auto`;
}

var UiTooltipsAndControlsCreateContext4: Dynamic;

function resolveUiTooltipsAndControlsAuto(
  ui2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let uiTooltipsAndControlsUseContext2: Dynamic =
    resolveUiTooltipsAndControlsUseContext2();
  let useContext: Dynamic = (0, React.useContext)(
    UiTooltipsAndControlsCreateContext4,
  );
  return resolveUiOverlaysAndIconsValue7(
    ui2 === undefined
      ? (useContext ??
          (uiTooltipsAndControlsUseContext2?.size === undefined
            ? `auto`
            : resolveUiTooltipsAndControlsAutoSm(
                uiTooltipsAndControlsUseContext2.size,
              )))
      : resolveUiTooltipsAndControlsAutoSm(ui2),
  );
}

function resolveUiTooltipsAndControlsValue2(
  ui2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return `calc((var(--cds-h-control) - ${resolveUiOverlaysAndIconsValue6(UiOverlaysAndIconsMaster[ui2].px)}) / 2)`;
}

var Button: Dynamic;

var UiTooltipsAndControlsPanel: Dynamic;

var UiTooltipsAndControlsPanel2: Dynamic;

var UiTooltipsAndControlsSurface2: Dynamic;

function resolveUiTooltipsAndControlsValue3(
  ui2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return `rounded-card ${UiTooltipsAndControlsSurface2[UiTooltipsAndControlsPanel[ui2]]} ${UiTooltipsAndControlsPanel2[ui2]}`;
}

var UiTooltipsAndControlsLight: Dynamic;

var UiTooltipsAndControlsLight2: Dynamic;

var UiTooltipsAndControlsStyles5: string;

var UiTooltipsAndControlsInlineFlexGapXsTextStartFontSansTextBodyFontNormalTextPrimary: string;

function resolveUiTooltipsAndControlsClose(
  ref?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  (0, React.useImperativeHandle)(
    options,
    (..._extraArguments: unknown[]): Dynamic => ({
      close: (..._extraArguments: unknown[]): Dynamic => ref.current?.close?.(),
      unmount: (..._extraArguments: unknown[]): Dynamic =>
        ref.current?.unmount(),
    }),
    [ref],
  );
}

var UiTooltipsAndControlsStyles6: string;

function resolveUiTooltipsAndControlsMatches(
  ui2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return ui2 == null
    ? false
    : ui2.matches(
          `input:not([type=button],[type=checkbox],[type=radio],[type=range],[type=submit],[type=reset],[type=color],[type=file],[type=image],[type=hidden],[readonly]), textarea:not([readonly]), [contenteditable=""], [contenteditable="true"], [contenteditable="plaintext-only"]`,
        )
      ? true
      : resolveUiProviderAndLayersValue2(ui2)?.isContentEditable === true;
}

function resolveUiTooltipsAndControlsInset(
  ui2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let visualViewport: Dynamic = ui2.visualViewport;
  if (
    visualViewport == null ||
    Math.abs((visualViewport.scale ?? 1) - 1) > uiTooltipsAndControlsValue0_01
  )
    return null;
  let clientHeight: Dynamic = ui2.document.documentElement.clientHeight;
  return {
    inset: Math.max(
      0,
      Math.round(
        clientHeight - (visualViewport.offsetTop + visualViewport.height),
      ),
    ),
    visible: Math.round(visualViewport.height),
    offset: Math.max(0, Math.round(visualViewport.offsetTop)),
  };
}

var uiTooltipsAndControlsValue120: number;

var uiTooltipsAndControlsValue0_01: number;

function useUiTooltipsAndControlsUnpan(
  ui2?: Dynamic,
  options?: Dynamic,
  { unpan: context = false }: Dynamic = {},
  ..._extraArguments: unknown[]
): undefined {
  let uiProviderAndLayersUseContext10: Dynamic =
    resolveUiProviderAndLayersUseContext10();
  let useUiOverlaysAndIconsUseInsertionEffect22: Dynamic =
    useUiOverlaysAndIconsUseInsertionEffect2(options);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!ui2 || uiProviderAndLayersUseContext10 === undefined) return;
      let visualViewport: Dynamic =
        uiProviderAndLayersUseContext10.visualViewport;
      if (visualViewport == null) return;
      let useUiTooltipsAndControlsUnpanResult: Dynamic = null;
      let enabled = false;
      let count: number = 0;
      let scrollTo = (..._extraArguments: unknown[]): undefined => {
        count = 0;
        let uiTooltipsAndControlsInset = resolveUiTooltipsAndControlsInset(
          uiProviderAndLayersUseContext10,
        );
        let clientHeight: Dynamic =
          uiProviderAndLayersUseContext10.document.documentElement.clientHeight;
        let matchesUiTooltipsAndControlsInset =
          uiTooltipsAndControlsInset !== null &&
          uiTooltipsAndControlsInset.visible <
            clientHeight - uiTooltipsAndControlsValue120;
        let uiTooltipsAndControlsInset2 = matchesUiTooltipsAndControlsInset
          ? uiTooltipsAndControlsInset
          : null;
        if (
          uiTooltipsAndControlsInset2?.inset !==
            useUiTooltipsAndControlsUnpanResult?.inset ||
          uiTooltipsAndControlsInset2?.visible !==
            useUiTooltipsAndControlsUnpanResult?.visible ||
          uiTooltipsAndControlsInset2?.offset !==
            useUiTooltipsAndControlsUnpanResult?.offset
        ) {
          useUiTooltipsAndControlsUnpanResult = uiTooltipsAndControlsInset2;
          useUiOverlaysAndIconsUseInsertionEffect22(
            uiTooltipsAndControlsInset2,
          );
        }
        if (
          context &&
          matchesUiTooltipsAndControlsInset &&
          !enabled &&
          visualViewport.offsetTop > 0
        ) {
          enabled = true;
          uiProviderAndLayersUseContext10.document.documentElement.scrollIntoView(
            {
              block: `start`,
              inline: `start`,
              behavior: `instant`,
            },
          );
          uiProviderAndLayersUseContext10.scrollTo({
            top: 0,
            left: 0,
            behavior: `instant`,
          });
        }
        if (!matchesUiTooltipsAndControlsInset) {
          enabled = false;
        }
      };
      let requestAnimationFrame2 = (
        ..._extraArguments: unknown[]
      ): undefined => {
        if (count === 0) {
          count =
            uiProviderAndLayersUseContext10.requestAnimationFrame(scrollTo);
        }
      };
      scrollTo();
      visualViewport.addEventListener(`resize`, requestAnimationFrame2);
      visualViewport.addEventListener(`scroll`, requestAnimationFrame2);
      return (..._extraArguments: unknown[]): undefined => {
        visualViewport.removeEventListener(`resize`, requestAnimationFrame2);
        visualViewport.removeEventListener(`scroll`, requestAnimationFrame2);
        if (count !== 0) {
          uiProviderAndLayersUseContext10.cancelAnimationFrame(count);
        }
        useUiOverlaysAndIconsUseInsertionEffect22(null);
      };
    },
    [
      ui2,
      uiProviderAndLayersUseContext10,
      useUiOverlaysAndIconsUseInsertionEffect22,
      context,
    ],
  );
}

function installUiTooltipsAndControlsValue(
  installUi?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let defineProperty = (
    installUi2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let relatedTarget: Dynamic = installUi2.relatedTarget;
    if (
      relatedTarget != null &&
      resolveUiProviderAndLayersValue2(relatedTarget) === null
    ) {
      Object.defineProperty(installUi2, "relatedTarget", {
        value: null,
        configurable: true,
      });
    }
  };
  installUi.addEventListener(`focusout`, defineProperty, true);
  try {
    installUi.blur();
  } finally {
    installUi.removeEventListener(`focusout`, defineProperty, true);
  }
}

var uiTooltipsAndControlsWeakMap: Dynamic;

var uiTooltipsAndControlsValue8: number;

function updateUiTooltipsAndControlsValue(
  updateUi?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  uiTooltipsAndControlsWeakMap.set(updateUi, options);
}

function getUiTooltipsAndControlsParentElement(
  ui2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  let ui3: Dynamic = ui2;
  for (; ui3 !== null && items.length < uiTooltipsAndControlsValue8; ) {
    let uiTooltipsAndControlsWeakMapEntry: Dynamic =
      uiTooltipsAndControlsWeakMap.get(ui3);
    if (uiTooltipsAndControlsWeakMapEntry === undefined) {
      ui3 = ui3.parentElement;
      continue;
    }
    let uiTooltipsAndControlsWeakMapEntry2: Dynamic =
      uiTooltipsAndControlsWeakMapEntry();
    if (
      uiTooltipsAndControlsWeakMapEntry2 === null ||
      uiTooltipsAndControlsWeakMapEntry2 === ui3 ||
      items.includes(uiTooltipsAndControlsWeakMapEntry2)
    )
      break;
    items.push(uiTooltipsAndControlsWeakMapEntry2);
    ui3 = uiTooltipsAndControlsWeakMapEntry2;
  }
  return items;
}

function useUiTooltipsAndControlsUseInsertionEffect(
  ui2?: Dynamic,
  ref?: Dynamic,
  ref2?: Dynamic,
  dependencies?: Dynamic,
  ref3?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let uiProviderAndLayersUseContext8: Dynamic =
    resolveUiProviderAndLayersUseContext8();
  let enabledRef: Dynamic = (0, React.useRef)(false);
  (0, React.useInsertionEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (!ui2) {
        enabledRef.current = false;
        return;
      }
      if (enabledRef.current) return;
      enabledRef.current = true;
      ref.current = null;
      ref2.current = uiProviderAndLayersUseContext8 ?? null;
      let ownerDocument2: Dynamic =
        uiProviderAndLayersUseContext8?.ownerDocument ?? document;
      let activeElement2: Dynamic = ownerDocument2.activeElement;
      let activeElement3: Dynamic =
        activeElement2 && activeElement2 !== ownerDocument2.body
          ? activeElement2
          : null;
      ref.current = activeElement3;
      if (ref3) {
        ref3.current = getUiTooltipsAndControlsParentElement(activeElement3);
      }
      dependencies?.();
    },
    [ui2, uiProviderAndLayersUseContext8, ref, ref2, dependencies, ref3],
  );
}

function useUiTooltipsAndControlsFinalFocus(
  ui2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let skipRestoreOnOutsideFocus: Dynamic =
    ui2?.skipRestoreOnOutsideFocus ?? false;
  let registerOpenerReturn: Dynamic = ui2?.registerOpenerReturn ?? true;
  let triggerRef: Dynamic = ui2?.triggerRef;
  let elementRef: Dynamic = (0, React.useRef)(null);
  let popupRef: Dynamic = (0, React.useRef)(null);
  let elementRef2: Dynamic = (0, React.useRef)(null);
  useUiTooltipsAndControlsUseInsertionEffect(
    ui2?.open ?? true,
    elementRef,
    elementRef2,
  );
  let registerOpenerReturnRef: Dynamic = (0, React.useRef)(
    registerOpenerReturn,
  );
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): undefined => {
      registerOpenerReturnRef.current = registerOpenerReturn;
    },
    [registerOpenerReturn],
  );
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (popupRef.current) {
        updateUiTooltipsAndControlsValue(
          popupRef.current,
          (..._extraArguments: unknown[]): Dynamic =>
            registerOpenerReturnRef.current
              ? (resolveUiTooltipsAndControlsValue4(triggerRef) ??
                elementRef.current)
              : null,
        );
      }
    },
    [triggerRef],
  );
  let finalFocus: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (skipRestoreOnOutsideFocus) {
        let popup: Dynamic = popupRef.current;
        let ownerDocument2: Dynamic =
          elementRef2.current?.ownerDocument ?? document;
        let activeElement2: Dynamic = ownerDocument2.activeElement;
        if (
          activeElement2 &&
          activeElement2 !== ownerDocument2.body &&
          !popup?.contains(activeElement2)
        )
          return false;
      }
      return resolveUiTooltipsAndControlsValue4(triggerRef) === null
        ? isUiTooltipsAndControlsPreventScroll(
            elementRef.current,
            popupRef.current,
          )
        : null;
    },
    [skipRestoreOnOutsideFocus, triggerRef],
  );
  return (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => ({
      finalFocus: finalFocus,
      popupRef: popupRef,
    }),
    [finalFocus],
  );
}

function resolveUiTooltipsAndControlsValue4(
  ref?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let ref2: Dynamic = ref?.current ?? null;
  return ref2?.isConnected ? ref2 : null;
}

function useUiTooltipsAndControlsFinalFocus2(
  ui2?: Dynamic,
  options: Dynamic = true,
  ref?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let uiProviderAndLayersUseContext8: Dynamic =
    resolveUiProviderAndLayersUseContext8();
  let elementRef: Dynamic = (0, React.useRef)(null);
  let enabledRef: Dynamic = (0, React.useRef)(false);
  let updateEnabled: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): undefined => {
      elementRef.current = null;
      enabledRef.current = true;
    },
    [],
  );
  let elementRef2: Dynamic = (0, React.useRef)(null);
  let itemsRef: Dynamic = (0, React.useRef)([]);
  let popupRef: Dynamic = (0, React.useRef)(null);
  let elementRef3: Dynamic = (0, React.useRef)(null);
  useUiTooltipsAndControlsUseInsertionEffect(
    ui2,
    elementRef2,
    elementRef3,
    updateEnabled,
    itemsRef,
  );
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (
        !enabledRef.current ||
        ((enabledRef.current = false), !options && !ref)
      )
        return;
      let ownerDocument2: Dynamic =
        uiProviderAndLayersUseContext8?.ownerDocument ?? document;
      if (!elementRef2.current) {
        let ref2: Dynamic = ref?.current ?? null;
        elementRef.current =
          ref2 !== null && ref2.isConnected && !popupRef.current?.contains(ref2)
            ? ref2
            : null;
      }
      if (!options) return;
      let uiProviderAndLayersValue2: Dynamic = resolveUiProviderAndLayersValue2(
        ownerDocument2.activeElement,
      );
      let uiProviderAndLayersValue22: Dynamic =
        uiProviderAndLayersValue2 &&
        uiProviderAndLayersValue2 !== ownerDocument2.body
          ? uiProviderAndLayersValue2
          : null;
      if (
        !(
          !uiProviderAndLayersValue22 ||
          popupRef.current?.contains(uiProviderAndLayersValue22)
        )
      ) {
        installUiTooltipsAndControlsValue(uiProviderAndLayersValue22);
      }
    },
    [ui2, options, ref, uiProviderAndLayersUseContext8],
  );
  let enabled = !options;
  let finalFocus: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (enabled) {
        let popup: Dynamic = popupRef.current;
        let ownerDocument2: Dynamic =
          elementRef3.current?.ownerDocument ?? document;
        let activeElement2: Dynamic = ownerDocument2.activeElement;
        if (
          activeElement2 &&
          activeElement2 !== ownerDocument2.body &&
          !popup?.contains(activeElement2)
        )
          return false;
      }
      if (elementRef2.current) {
        if (!elementRef2.current.isConnected) {
          let item: Dynamic = itemsRef.current.find(
            (item2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              item2.isConnected,
          );
          if (item)
            return isUiTooltipsAndControlsPreventScroll(item, popupRef.current);
        }
        return isUiTooltipsAndControlsPreventScroll(
          elementRef2.current,
          popupRef.current,
        );
      }
      if (elementRef.current) {
        let popup: Dynamic = popupRef.current;
        let activeElement2: Dynamic = (
          elementRef3.current?.ownerDocument ?? document
        ).activeElement;
        return (activeElement2 &&
          resolveUiTooltipsAndControlsMatches2(activeElement2) &&
          !popup?.contains(activeElement2)) ||
          !elementRef.current.isConnected
          ? false
          : null;
      }
      return false;
    },
    [enabled],
  );
  return (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => ({
      finalFocus: finalFocus,
      popupRef: popupRef,
    }),
    [finalFocus, popupRef],
  );
}

function isUiTooltipsAndControlsPreventScroll(
  element?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!element?.isConnected) return false;
  let activeElement2: Dynamic = element.ownerDocument.activeElement;
  if (
    activeElement2 &&
    resolveUiTooltipsAndControlsMatches2(activeElement2) &&
    !options?.contains(activeElement2)
  )
    return false;
  let element2: Dynamic = element;
  return element2.tabIndex < 0
    ? (element2.focus({
        preventScroll: true,
      }),
      false)
    : element2;
}

function resolveUiTooltipsAndControlsMatches2(
  ui2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return ui2.matches(UiOverlaysAndIconsStyles);
}

var UiTooltipsAndControlsState10: string;

var Checkbox: Dynamic;

var resolveUiTooltipsAndControlsValue5: (..._extraArguments: unknown[]) => undefined;

var uiTooltipsAndControlsValue82: number;

var UiTooltipsAndControlsState11: string;

var uiTooltipsAndControlsValue240: number;

var uiTooltipsAndControlsTopMaxHeightMinHeightValues: string[];

var uiTooltipsAndControlsBottomInsetTranslateTransformValues: string[];

var UiTooltipsAndControlsState12: string[];

function resolveUiTooltipsAndControlsValue6(
  ui2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    value: ui2.getPropertyValue(options),
    priority: ui2.getPropertyPriority(options),
  };
}

function resolveUiTooltipsAndControlsImportant(
  ui2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    context !== undefined &&
    ui2.getPropertyPriority(options) === `important` &&
    ui2.getPropertyValue(options) === context
  );
}

function resolveUiTooltipsAndControlsValue7(
  ui2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let style: Dynamic = ui2.node.style;
  for (let resolveUiTooltipsAndControlsValue7Result of uiTooltipsAndControlsTopMaxHeightMinHeightValues as Dynamic)
    if (
      resolveUiTooltipsAndControlsImportant(
        style,
        resolveUiTooltipsAndControlsValue7Result,
        ui2.written[resolveUiTooltipsAndControlsValue7Result],
      )
    ) {
      let { value: baselineItem, priority: baselineItem2 }: Dynamic =
        ui2.baseline[resolveUiTooltipsAndControlsValue7Result];
      style.setProperty(
        resolveUiTooltipsAndControlsValue7Result,
        baselineItem,
        baselineItem2,
      );
    }
}

function useUiTooltipsAndControlsTop(
  ui2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [node, setNode]: Dynamic = (0, React.useState)(null);
  let [
    useUiTooltipsAndControlsTopState,
    setUseUiTooltipsAndControlsTopState,
  ]: Dynamic = (0, React.useState)(null);
  let useSyncExternalStore: Dynamic = (0, React.useSyncExternalStore)(
    (0, React.useCallback)(
      (ui3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        !ui2 || node === null
          ? (..._extraArguments: unknown[]): undefined => undefined
          : (node.addEventListener(`focusin`, ui3),
            node.addEventListener(`focusout`, ui3),
            (..._extraArguments: unknown[]): undefined => {
              node.removeEventListener(`focusin`, ui3);
              node.removeEventListener(`focusout`, ui3);
            }),
      [ui2, node],
    ),
    (0, React.useCallback)(
      (..._extraArguments: unknown[]): Dynamic => {
        if (!ui2 || node === null) return false;
        let activeElement2: Dynamic = node.ownerDocument.activeElement;
        return (
          node.contains(activeElement2) &&
          resolveUiTooltipsAndControlsMatches(activeElement2)
        );
      },
      [ui2, node],
    ),
    (..._extraArguments: unknown[]) => false,
  );
  useUiTooltipsAndControlsUnpan(
    ui2 && (useSyncExternalStore || useUiTooltipsAndControlsTopState !== null),
    setUseUiTooltipsAndControlsTopState,
  );
  let resolveUiTooltipsAndControlsTop2: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]) =>
      resolveUiTooltipsAndControlsTop(useUiTooltipsAndControlsTopState),
    [useUiTooltipsAndControlsTopState],
  );
  let elementRef: Dynamic = (0, React.useRef)(null);
  UiDesignSystemUseLayoutEffect((..._extraArguments: unknown[]): undefined => {
    let element: Dynamic = elementRef.current;
    if (
      element !== null &&
      (element.node !== node || resolveUiTooltipsAndControlsTop2 === undefined)
    ) {
      resolveUiTooltipsAndControlsValue7(element);
      elementRef.current = null;
    }
    if (node === null || resolveUiTooltipsAndControlsTop2 === undefined) return;
    let style: Dynamic = node.style;
    let record2: Dynamic = {
      top: resolveUiTooltipsAndControlsTop2.top,
      "max-height": resolveUiTooltipsAndControlsTop2.maxHeight,
      "min-height": `0px`,
    };
    let element2: Dynamic = elementRef.current;
    if (element2 === null) {
      if (
        UiTooltipsAndControlsState12.some(
          (
            UiTooltipsAndControlsState122?: Dynamic,
            ..._extraArguments: unknown[]
          ) => style.getPropertyValue(UiTooltipsAndControlsState122) !== ``,
        )
      )
        return;
      element2 = {
        node: node,
        baseline: {
          top: resolveUiTooltipsAndControlsValue6(style, `top`),
          "max-height": resolveUiTooltipsAndControlsValue6(style, `max-height`),
          "min-height": resolveUiTooltipsAndControlsValue6(style, `min-height`),
        },
        intended: {},
        written: {},
        cap: ``,
      };
      elementRef.current = element2;
    } else {
      let some = uiTooltipsAndControlsBottomInsetTranslateTransformValues.some(
        (
          uiTooltipsAndControlsBottomInsetTranslateTransformValue?: Dynamic,
          ..._extraArguments: unknown[]
        ) =>
          style.getPropertyValue(
            uiTooltipsAndControlsBottomInsetTranslateTransformValue,
          ) !== ``,
      );
      for (let useUiTooltipsAndControlsTopResult of uiTooltipsAndControlsTopMaxHeightMinHeightValues as Dynamic)
        if (
          !resolveUiTooltipsAndControlsImportant(
            style,
            useUiTooltipsAndControlsTopResult,
            element2.written[useUiTooltipsAndControlsTopResult],
          )
        ) {
          let uiTooltipsAndControlsValue6: Dynamic =
            resolveUiTooltipsAndControlsValue6(
              style,
              useUiTooltipsAndControlsTopResult,
            );
          element2.baseline[useUiTooltipsAndControlsTopResult] =
            uiTooltipsAndControlsValue6;
          if (
            useUiTooltipsAndControlsTopResult === `top` &&
            uiTooltipsAndControlsValue6.value !== ``
          ) {
            some = true;
          }
        }
      if (some) {
        resolveUiTooltipsAndControlsValue7(element2);
        elementRef.current = null;
        return;
      }
    }
    for (let useUiTooltipsAndControlsTopResult of uiTooltipsAndControlsTopMaxHeightMinHeightValues as Dynamic)
      if (
        element2.intended[useUiTooltipsAndControlsTopResult] !==
          record2[useUiTooltipsAndControlsTopResult] ||
        !resolveUiTooltipsAndControlsImportant(
          style,
          useUiTooltipsAndControlsTopResult,
          element2.written[useUiTooltipsAndControlsTopResult],
        )
      ) {
        style.setProperty(
          useUiTooltipsAndControlsTopResult,
          record2[useUiTooltipsAndControlsTopResult],
          `important`,
        );
        element2.intended[useUiTooltipsAndControlsTopResult] =
          record2[useUiTooltipsAndControlsTopResult];
        element2.written[useUiTooltipsAndControlsTopResult] =
          style.getPropertyValue(useUiTooltipsAndControlsTopResult);
      }
    if (element2.cap !== resolveUiTooltipsAndControlsTop2.maxHeight) {
      element2.cap = resolveUiTooltipsAndControlsTop2.maxHeight;
      let activeElement2: Dynamic = node.ownerDocument.activeElement;
      let defaultView: Dynamic = node.ownerDocument.defaultView;
      if (
        defaultView !== null &&
        activeElement2 instanceof (defaultView.HTMLElement as Dynamic) &&
        activeElement2 !== node &&
        node.contains(activeElement2)
      ) {
        resolveUiTooltipsAndControlsOverflowY(node, activeElement2);
      }
    }
  });
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): undefined => {
        if (elementRef.current !== null) {
          resolveUiTooltipsAndControlsValue7(elementRef.current);
          elementRef.current = null;
        }
      },
    [],
  );
  return setNode;
}

function resolveUiTooltipsAndControlsTop(
  ui2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (!(ui2 === null || ui2.visible < uiTooltipsAndControlsValue240))
    return {
      top: `calc(${ui2.offset + (ui2.visible + uiTooltipsAndControlsValue82) / 2}px - ${UiTooltipsAndControlsState11} / 2)`,
      maxHeight: `calc(${ui2.visible - uiTooltipsAndControlsValue82}px - ${UiTooltipsAndControlsState11})`,
    };
}

function resolveUiTooltipsAndControlsOverflowY(
  element?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let defaultView: Dynamic = element.ownerDocument.defaultView;
  if (defaultView !== null)
    for (
      let parentElement: Dynamic = options.parentElement;
      parentElement !== null;
      parentElement =
        parentElement === element ? null : parentElement.parentElement
    ) {
      if (parentElement.scrollHeight <= parentElement.clientHeight) continue;
      let { overflowY: computedStyle }: Dynamic =
        defaultView.getComputedStyle(parentElement);
      if (computedStyle !== `auto` && computedStyle !== `scroll`) continue;
      let parentElementBounds: Dynamic = parentElement.getBoundingClientRect();
      let optionsBounds: Dynamic = options.getBoundingClientRect();
      if (optionsBounds.bottom > parentElementBounds.bottom) {
        parentElement.scrollTop +=
          optionsBounds.bottom -
          parentElementBounds.bottom +
          uiTooltipsAndControlsValue82;
      } else {
        if (optionsBounds.top < parentElementBounds.top) {
          parentElement.scrollTop -=
            parentElementBounds.top -
            optionsBounds.top +
            uiTooltipsAndControlsValue82;
        }
      }
    }
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeUiTooltipsAndControlsStep1(): void {
  (UiTooltipsAndControlsDisabledReasonTooltip = createLiveModuleNamespace({
    DisabledReasonTooltip: (..._extraArguments: unknown[]): Dynamic =>
      DisabledReasonTooltip,
    OverflowTooltip: (..._extraArguments: unknown[]): Dynamic => OverflowTooltip,
    Tooltip: (..._extraArguments: unknown[]): Dynamic => Tooltip,
    TooltipGroup: (..._extraArguments: unknown[]): Dynamic => TooltipGroup,
    TooltipImplProvider: (..._extraArguments: unknown[]): Dynamic =>
      TooltipImplProvider,
    useTooltipGroup: (..._extraArguments: unknown[]): Dynamic => useTooltipGroup,
    useTooltipTrigger: (..._extraArguments: unknown[]): Dynamic =>
      useTooltipTrigger,
  }));
  (UiTooltipsAndControlsState = null);
  (UiTooltipsAndControlsState2 = Symbol(`cds.Tooltip.noShow`));
  (UiTooltipsAndControlsOpen = {
    open: false,
    body: undefined,
  });
  (resolveUiTooltipsAndControlsOpen = (
    ui2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    ui2.open
      ? ui2
      : {
          ...ui2,
          open: true,
        });
  (resolveUiTooltipsAndControlsOpen2 = (
    ui2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    ui2.open
      ? {
          ...ui2,
          open: false,
        }
      : ui2);
  (resolveUiTooltipsAndControlsBody = (
    ui2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    ui2.body === undefined
      ? ui2
      : {
          ...ui2,
          body: undefined,
        });
  (resolveUiTooltipsAndControlsOpen3 = (body?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
    (ui2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      ui2.open && Object.is(ui2.body, body)
        ? ui2
        : {
            open: true,
            body: body,
          });
  (resolveUiTooltipsAndControlsBody2 = (body?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
    (ui2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      Object.is(ui2.body, body)
        ? ui2
        : {
            ...ui2,
            body: body,
          });
  (resolveUiTooltipsAndControlsOpen4 = (
    ui2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    ui2.open || ui2.body !== undefined ? UiTooltipsAndControlsOpen : ui2);
  (UiTooltipsAndControlsState3 = UiShortcutsAndSizingState2);
  (UiTooltipsAndControlsTextBalance = `text-balance`);
  (UiTooltipsAndControlsState4 = UiShortcutsAndSizingStyles13);
  (UiTooltipsAndControlsStyles = `inline-flex items-center gap-2 min-h-[calc(1.5rem*var(--cds-rem-scale,1))] max-w-[240px] py-[calc(0.1875rem*var(--cds-rem-scale,1))]`);
  (UiTooltipsAndControlsSelfStart = `self-start`);
  (UiTooltipsAndControlsState5 = `flex flex-col gap-0.5 ${UiShortcutsAndSizingState3}`);
  (OverflowTooltip = (0, React.forwardRef)(function (
    {
      className: className,
      side: side,
      align: align,
      sideOffset: sideOffset,
      delay: delay,
      collisionPadding: collisionPadding,
      hoverable: hoverable,
      lazy: lazy2,
      children: children,
      ...overflow
    }: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) {
    let elementRef: Dynamic = (0, React.useRef)(null);
    let uiOverlaysAndIconsValue4: Dynamic = resolveUiOverlaysAndIconsValue4(
      elementRef,
      options,
    );
    return (
      <Tooltip
        content={
          useTooltipTrigger()
            ? undefined
            : (..._extraArguments: unknown[]): Dynamic => {
                let element: Dynamic = elementRef.current;
                if (element !== null)
                  return element.scrollWidth > element.clientWidth ||
                    isUiShortcutsAndSizingOwnerDocument(element)
                    ? children
                    : undefined;
              }
        }
        side={side}
        align={align}
        sideOffset={sideOffset}
        delay={delay}
        collisionPadding={collisionPadding}
        hoverable={hoverable}
        lazy={lazy2}
      >
      <span
        {...overflow}
        ref={uiOverlaysAndIconsValue4}
        data-cds={`OverflowTooltip`}
        className={resolveUiDesignSystemValue2(`block min-w-0 overflow-x-clip text-ellipsis whitespace-nowrap`, className)}
      >{children}</span>
    </Tooltip>
    );
  }));
  OverflowTooltip.displayName = `OverflowTooltip`;
  (UiTooltipsAndControlsTooltip = {
    Tooltip: Tooltip,
    DisabledReasonTooltip: DisabledReasonTooltip,
  });
  (UiTooltipsAndControlsCreateContext = (0, React.createContext)(
    false,
  ));
  (UiTooltipsAndControlsState6 = {
    s: `sm`,
    m: `md`,
    l: `lg`,
  });
  (UiTooltipsAndControlsBox = {
    sm: {
      box: 12,
      stroke: 1.5,
    },
    md: {
      box: 16,
      stroke: 1.75,
    },
    lg: {
      box: 20,
      stroke: 2,
    },
  });
  (UiTooltipsAndControlsState7 = null);
  (UiTooltipsAndControlsState8 = null);
  (uiTooltipsAndControlsSet = new (Set as Dynamic)());
  (UiTooltipsAndControlsState9 = null);
  (uiTooltipsAndControlsSet2 = new (Set as Dynamic)());
  (uiTooltipsAndControlsPointermoveKeydownTouchstartValues = [
    `pointermove`,
    `keydown`,
    `touchstart`,
  ]);
  (uiTooltipsAndControlsValue_1 = false);
  (UiTooltipsAndControlsTooltipPending = {
    "data-cds-tooltip-pending": ``,
  });
  (uiTooltipsAndControlsValue700 = 700);
  (UiTooltipsAndControlsCreateContext2 = (0, React.createContext)(
    null,
  ));
  (UiTooltipsAndControlsCompact = (0, React.createContext)({
    compact: false,
  }));
  (UiTooltipsAndControlsDataCdsCompactable = `data-cds-compactable`);
  (resolveUiTooltipsAndControlsPreventDefault = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    event.preventDefault();
    event.stopPropagation();
  });
  (UiTooltipsAndControlsStyles2 = `text-primary font-medium focus-visible:shadow-[0_0_0_2px_rgb(255_255_255/0.7)] [&[data-initial-focus]:focus]:shadow-[0_0_0_2px_rgb(255_255_255/0.7)]`);
  (UiTooltipsAndControlsStyles3 = `me-[calc((var(--cds-h-control)-1em-6px)/2-var(--cds-pad-md))]`);
  (UiTooltipsAndControlsVariants = cva(
    `cds-reset group/btn relative isolate inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap select-none cursor-[var(--cds-cursor-interactive)] aria-disabled:cursor-default data-[disabled]:cursor-default border-0 outline-none focus-visible:outline-hidden [&[data-initial-focus]:focus]:outline-hidden rounded h-control font-sans text-body [&:disabled:not([aria-busy])]:opacity-disabled disabled:pointer-events-none transition-shadow duration-fast`,
    {
      variants: {
        variant: {
          primary: `text-on-primary font-medium [--cds-shortcut-cap-ink:currentColor] ${UiShortcutsAndSizingStyles6}`,
          secondary: `text-primary font-normal aria-pressed:text-accent ${UiShortcutsAndSizingStyles6}`,
          ghost: `text-primary font-normal aria-pressed:text-accent ${UiShortcutsAndSizingStyles6}`,
          danger: `text-on-danger font-medium [--cds-shortcut-cap-ink:currentColor] ${UiShortcutsAndSizingStyles7}`,
          brand: `text-on-brand font-medium [--cds-shortcut-cap-ink:currentColor] ${UiShortcutsAndSizingStyles6}`,
          onContent: UiTooltipsAndControlsStyles2,
          onAccent: UiTooltipsAndControlsStyles2,
        },
        iconOnly: {
          true: `aspect-square w-control px-0`,
          false: `px-md`,
        },
      },
      defaultVariants: {
        variant: `secondary`,
        iconOnly: false,
      },
    },
  ));
  (UiTooltipsAndControlsStyles4 = `bg-[var(--cds-button-on-content)] backdrop-blur-md shadow-[inset_0_0_0_1px_var(--cds-button-on-content-ring)] group-focus-visible/btn:!shadow-[inset_0_0_0_1px_var(--cds-button-on-content-ring)] group-[[data-initial-focus]:focus]/btn:!shadow-[inset_0_0_0_1px_var(--cds-button-on-content-ring)] group-hover/btn:bg-[var(--cds-button-on-content-hover)] group-[[aria-haspopup][aria-expanded=true]]/btn:bg-[var(--cds-button-on-content-hover)]`);
  (UiTooltipsAndControlsVariants2 = cva(UiShortcutsAndSizingStyles8, {
    variants: {
      variant: {
        primary: `bg-fill-primary group-hover/btn:bg-fill-primary-hover group-[[aria-haspopup][aria-expanded=true]]/btn:bg-fill-primary-hover`,
        secondary: UiShortcutsAndSizingStyles10,
        ghost: `bg-transparent group-hover/btn:bg-fill-ghost-hover group-[[aria-haspopup][aria-expanded=true]]/btn:bg-fill-ghost-hover`,
        danger: `bg-fill-danger group-hover/btn:bg-fill-danger-hover group-[[aria-haspopup][aria-expanded=true]]/btn:bg-fill-danger-hover`,
        brand: `bg-fill-brand group-hover/btn:bg-fill-brand-hover group-[[aria-haspopup][aria-expanded=true]]/btn:bg-fill-brand-hover`,
        onContent: UiTooltipsAndControlsStyles4,
        onAccent: UiTooltipsAndControlsStyles4,
      },
    },
    defaultVariants: {
      variant: `secondary`,
    },
  }));
  (UiTooltipsAndControlsCreateContext3 = (0, React.createContext)(
    null,
  ));
  (UiTooltipsAndControlsStart = {
    start: `rounded-e-none`,
    end: `rounded-s-none`,
    middle: `rounded-none`,
  });
  (UiTooltipsAndControlsStart2 = {
    start: `ms-outset`,
    end: `me-outset`,
    both: `mx-outset`,
  });
  (UiTooltipsAndControlsCdsOutsetX = {
    "--cds-outset-x": `var(--cds-pad-md)`,
  });
  (UiTooltipsAndControlsCreateContext4 = (0, React.createContext)(
    undefined,
  ));
  (Button = (0, React.forwardRef)(
    (
      {
        variant: variant,
        size: size,
        icon: icon,
        iconOnly = false,
        iconPosition = `start`,
        tooltip: tooltip,
        tooltipSide: tooltipSide,
        indicator: indicator,
        shortcut: shortcut,
        busy = false,
        busyLabel: busyLabel,
        pressed: pressed,
        flush = false,
        style: style,
        disabled: disabled,
        disabledReason: disabledReason,
        disabledReasonSide: disabledReasonSide,
        type: type,
        href: href,
        routerOptions: routerOptions,
        target: target,
        rel: rel,
        download: download,
        render: render,
        className: className,
        children: children,
        "aria-label": ariaLabel,
        ...button
      }: Dynamic,
      forwardedRef?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let buttonGroup: Dynamic = resolveUiTooltipsAndControlsUseContext2();
      let joined: Dynamic = buttonGroup?.joined;
      if (buttonGroup) {
        size ??= buttonGroup.size;
        if (buttonGroup.enforceVariant) {
          variant = buttonGroup.buttonVariant;
        } else {
          variant ??= buttonGroup.buttonVariant;
        }
      }
      let resolvedVariant: Dynamic = variant ?? `secondary`;
      let compactContext: Dynamic = resolveUiTooltipsAndControlsUseContext();
      let compactIcon: Dynamic =
        iconOnly === true ? undefined : compactContext.icon;
      let compact: Dynamic = compactIcon !== undefined && compactContext.compact;
      let resolvedIconOnly: Dynamic = iconOnly === true || compact;
      let resolvedIcon: Dynamic = compact ? compactIcon : icon;
      let compactLabel: Dynamic = compact ? (
        <span data-cds-part={`compact-name`} className={`contents`}>
        {children}
      </span>
      ) : null;
      let flushSide: Dynamic =
        flush === true ? `start` : flush === false ? undefined : flush;
      let validFlushSide: Dynamic =
        flushSide !== undefined &&
        Object.hasOwn(UiTooltipsAndControlsStart2, flushSide)
          ? flushSide
          : undefined;
      let outsetSide: Dynamic =
        validFlushSide !== undefined && !joined && resolvedVariant === `ghost`
          ? validFlushSide
          : undefined;
      let mode: Dynamic = useUiShortcutsAndSizingUseSyncExternalStore();
      let buttonRef: Dynamic = (0, React.useRef)(null);
      useUiTooltipsAndControlsState(buttonRef, `Button`);
      let iconSize: Dynamic = resolveUiTooltipsAndControlsAuto(size);
      let iconElement: Dynamic =
        resolvedIconOnly && resolvedIcon ? (
          resolveUiOverlaysAndIconsValue9(resolvedIcon) ? (
            <UiOverlaysAndIconsCustomIcon name={resolvedIcon} size={iconSize} />
          ) : (
            resolvedIcon
          )
        ) : null;
      let tooltipDisabled: Dynamic = useTooltipTrigger();
      let showTooltip: Dynamic =
        (resolvedIconOnly && ariaLabel && tooltip !== false) ||
        compactIcon !== undefined;
      let tooltipContent: Dynamic =
        compactIcon === undefined
          ? typeof tooltip == `string`
            ? tooltip
            : ariaLabel
          : compact
            ? compactLabel
            : undefined;
      let showDisabledReason: boolean =
        href === undefined && !!disabled && !!disabledReason;
      let nativeButton: boolean = href === undefined && render === undefined;
      let busyNativeButton: Dynamic = busy && nativeButton;
      let onKeyDown = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (resolveUiTooltipsAndControlsEnter(event)) {
          if (busyNativeButton && resolveUiTooltipsAndControlsCtrlKey(event)) {
            event.preventDefault();
            event.stopPropagation();
            return;
          }
          if (event.repeat && nativeButton) {
            event.preventDefault();
          }
        }
        button.onKeyDown?.(event);
      };
      let onKeyUp = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (busyNativeButton && resolveUiTooltipsAndControlsCtrlKey(event)) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        button.onKeyUp?.(event);
      };
      let outsetStyle: Dynamic =
        outsetSide === undefined
          ? undefined
          : resolvedIconOnly
            ? {
                "--cds-outset-x": resolveUiTooltipsAndControlsValue2(iconSize),
              }
            : UiTooltipsAndControlsCdsOutsetX;
      let buttonClass: Dynamic = resolveUiDesignSystemValue2(
        UiTooltipsAndControlsVariants({
          variant: variant,
          iconOnly: resolvedIconOnly,
        }),
        busyNativeButton ? `pointer-events-none` : ``,
        outsetSide ? UiTooltipsAndControlsStart2[outsetSide] : ``,
        joined && resolvedVariant !== `ghost`
          ? UiTooltipsAndControlsStart[joined]
          : ``,
        className,
      );
      let contents: Dynamic = (
        <jsxRuntime.Fragment>
        <span
            aria-hidden={true}
            className={resolveUiShortcutsAndSizingJoined({
              joined: !!joined,
              solid:
                resolvedVariant === `primary` ||
                resolvedVariant === `danger` ||
                resolvedVariant === `brand`,
            })}
          >
          <span
              ref={buttonRef}
              data-cds-part={`paint`}
              className={`${UiTooltipsAndControlsVariants2({
                variant: resolvedVariant,
              })} ${UiShortcutsAndSizingGroupAriaPressedBtnBgAccentGroupHoverBtnGroupAriaPressedBtnBgAccent} ${resolvedVariant === `secondary` && !joined ? UiShortcutsAndSizingStyles9 : ``}`}
            />
        </span>
        <span
            className={`inline-flex min-w-0 items-center gap-1 ${busy ? `opacity-0` : ``}`}
          >
          <UiTooltipsAndControlsCreateContext4.Provider value={iconSize}>
            {iconElement ? (
                indicator ? (
                  <span className={`grid`}>
                  <span
                      className={`col-start-1 row-start-1 [--btn-dot-r:calc(0.1875rem*var(--cds-rem-scale,1))] [--btn-dot-x:calc(100%_-_var(--btn-dot-r)_+_1px)] [&:dir(rtl)]:[--btn-dot-x:calc(var(--btn-dot-r)_-_1px)] not-forced-colors:has-[~[data-cds-part=indicator]>[data-cds=Pulse]]:[mask-image:radial-gradient(circle_at_var(--btn-dot-x)_calc(var(--btn-dot-r)_-_1px),transparent_calc(var(--btn-dot-r)_+_2px),black_calc(var(--btn-dot-r)_+_2.5px))]`}
                    >
                    {iconElement}
                  </span>
                  <span
                      aria-hidden={true}
                      data-cds-part={`indicator`}
                      className={`relative col-start-1 row-start-1 -me-px -mt-px self-start justify-self-end has-[>[data-cds=Pulse]]:[--cds-page-bg:transparent]`}
                    >
                    {indicator}
                  </span>
                </span>
                ) : compact ? (
                  <jsxRuntime.Fragment>
                  {iconElement}
                  <span className={`sr-only`}>{compactLabel}</span>
                </jsxRuntime.Fragment>
                ) : (
                  iconElement
                )
              ) : (
                <jsxRuntime.Fragment>
                {resolvedIcon &&
                    iconPosition === `start` &&
                    (resolveUiOverlaysAndIconsValue9(resolvedIcon) ? (
                      <UiOverlaysAndIconsCustomIcon
                        name={resolvedIcon}
                        size={iconSize}
                        className={`-ms-1`}
                      />
                    ) : (
                      <span className={`-ms-1 inline-flex`}>{resolvedIcon}</span>
                    ))}
                {children}
                {resolvedIcon &&
                    iconPosition === `end` &&
                    (resolveUiOverlaysAndIconsValue9(resolvedIcon) ? (
                      <UiOverlaysAndIconsCustomIcon
                        name={resolvedIcon}
                        size={iconSize}
                        className={`-me-1`}
                      />
                    ) : (
                      <span className={`-me-1 inline-flex`}>{resolvedIcon}</span>
                    ))}
                {shortcut && (
                    <UiShortcutsAndSizingKeys
                      keys={shortcut}
                      aria-hidden={true}
                      className={clsx(
                        `pointer-coarse:hidden ms-1`,
                        (!joined || joined === `end`) &&
                          UiTooltipsAndControlsStyles3,
                      )}
                    />
                  )}
              </jsxRuntime.Fragment>
              )}
          </UiTooltipsAndControlsCreateContext4.Provider>
        </span>
        {busy && (
            <span
              className={`absolute inset-0 grid place-items-center leading-[0]`}
            >
            <UiTooltipsAndControlsDelay
                size={`sm`}
                inheritColor={true}
                label={busyLabel}
              />
          </span>
          )}
      </jsxRuntime.Fragment>
      );
      let linkProps: Dynamic = resolveUiLinksAndFoundationHref({
        href: href,
        routerOptions: routerOptions,
        target: target,
        rel: rel,
        download: download,
        ...resolveUiLinksAndFoundationValue3(button),
      });
      let buttonElement: Dynamic = useRender({
        render:
          render ??
          (href === undefined ? (
            <button type={type ?? `button`} disabled={disabled} />
          ) : (
            <a />
          )),
        ref: forwardedRef,
        props: {
          "data-cds": `Button`,
          ...(resolvedIconOnly
            ? {
                "data-cds-icon-only": ``,
              }
            : undefined),
          ...(compactIcon === undefined
            ? undefined
            : {
                [UiTooltipsAndControlsDataCdsCompactable]: ``,
              }),
          ...(resolvedVariant === `ghost`
            ? {
                "data-cds-ghost": ``,
              }
            : undefined),
          ...(size === `xxs`
            ? {
                "data-step": `1`,
              }
            : resolveUiProviderAndLayersDataSize(size)),
          className: buttonClass,
          style: outsetStyle
            ? {
                ...outsetStyle,
                ...style,
              }
            : style,
          "aria-busy": busy || undefined,
          "aria-pressed": href === undefined ? pressed : undefined,
          "aria-disabled": busyNativeButton || undefined,
          "aria-label": ariaLabel,
          "aria-keyshortcuts": shortcut
            ? collectUiShortcutsAndSizingModifiers2(shortcut, mode)
            : undefined,
          children: contents,
          ...button,
          onMouseDown: resolveUiOverlaysAndIconsValue2(button.onMouseDown),
          onClick: busyNativeButton
            ? resolveUiTooltipsAndControlsPreventDefault
            : button.onClick,
          onKeyDown: onKeyDown,
          onKeyUp: onKeyUp,
          ...(href === undefined ? undefined : linkProps),
        },
      });
      let wrappedButton: Dynamic = showTooltip ? (
        <UiTooltipsAndControlsImpl
          side={tooltipSide}
          hoverable={false}
          content={
            tooltipDisabled || showDisabledReason ? undefined : tooltipContent
          }
          shortcut={shortcut}
        >
        {buttonElement}
      </UiTooltipsAndControlsImpl>
      ) : (
        buttonElement
      );
      return disabledReason === undefined || href !== undefined ? (
        wrappedButton
      ) : (
        <UiTooltipsAndControlsImpl2
          side={disabledReasonSide}
          reason={showDisabledReason ? disabledReason : undefined}
        >
        {wrappedButton}
      </UiTooltipsAndControlsImpl2>
      );
    },
  ));
  Button.displayName = `Button`;
  (UiTooltipsAndControlsPanel = {
    panel: `surface-2`,
    popover: `surface-3`,
  });
  (UiTooltipsAndControlsPanel2 = {
    panel: `shadow-panel-sm`,
    popover: `shadow-panel`,
  });
  (UiTooltipsAndControlsSurface2 = {
    "surface-2": `bg-surface-2`,
    "surface-3": `bg-surface-3`,
  });
  (UiTooltipsAndControlsLight = {
    light: `inset 0 0 0 1px var(--cds-page-bg), 0 0 0 1px var(--cds-fill-accent), 0 0 6px 1px var(--cds-bg-accent)`,
    dark: `inset 0 0 0 1px var(--cds-page-bg), 0 0 0 1px var(--cds-fill-accent), 0 0 6px 1px hsl(from var(--cds-role-accent-600) h s l / 60%)`,
  });
  (UiTooltipsAndControlsLight2 = {
    light: `inset 0 0 0 1px var(--cds-page-bg), 0 0 0 1px var(--cds-fill-danger), 0 0 6px 1px var(--cds-bg-danger)`,
    dark: `inset 0 0 0 1px var(--cds-page-bg), 0 0 0 1px var(--cds-fill-danger), 0 0 6px 1px hsl(from var(--cds-role-danger-600) h s l / 60%)`,
  });
  (UiTooltipsAndControlsStyles5 = `flex shrink-0 size-[var(--cds-checkbox)] items-center justify-center rounded-[var(--cds-checkbox-radius)] border border-strong bg-transparent`);
  (UiTooltipsAndControlsInlineFlexGapXsTextStartFontSansTextBodyFontNormalTextPrimary = `inline-flex gap-xs text-start font-sans text-body font-normal text-primary`);
  (UiTooltipsAndControlsStyles6 = `input:not([type=button],[type=checkbox],[type=radio],[type=range],[type=submit],[type=reset],[type=color],[type=file],[type=image],[type=hidden],[readonly]), textarea:not([readonly]), [contenteditable=""], [contenteditable="true"], [contenteditable="plaintext-only"]`);
  (uiTooltipsAndControlsValue120 = 120);
  (uiTooltipsAndControlsValue0_01 = 0.01);
  (uiTooltipsAndControlsWeakMap = new (WeakMap as Dynamic)());
  (uiTooltipsAndControlsValue8 = 8);
  (UiTooltipsAndControlsState10 = `${UiTooltipsAndControlsStyles5} transition-colors duration-fast ease-out motion-reduce:transition-none group-data-[unchecked]/cb:group-hover/cb:border-stronger group-data-[checked]/cb:bg-fill-accent group-data-[checked]/cb:border-transparent group-data-[indeterminate]/cb:bg-fill-accent group-data-[indeterminate]/cb:border-transparent group-data-[checked]/cb:group-hover/cb:bg-fill-accent-hover group-data-[indeterminate]/cb:group-hover/cb:bg-fill-accent-hover group-data-[disabled]/cb:group-data-[unchecked]/cb:group-hover/cb:border-strong group-focus-visible/cb:shadow-focus`);
  (Checkbox = (0, React.forwardRef)(
    (
      {
        label: label,
        description: description,
        size: size,
        className: className,
        disabledReason: disabledReason,
        "aria-describedby": ariaDescribedby,
        "aria-labelledby": ariaLabelledby,
        onMouseDown: onMouseDown,
        ...checkbox
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) => {
      let controlId: Dynamic = (0, React.useId)();
      let controlId2: Dynamic = (0, React.useId)();
      let matchesLabel =
        label != null && typeof label != `boolean` && label !== ``;
      let matchesLabel2 = matchesLabel && !!description;
      let [indeterminateState, setIndeterminateState]: Dynamic = (0,
      React.useState)(checkbox.indeterminate ?? false);
      let indeterminate: Dynamic =
        checkbox.indeterminate === true ||
        (checkbox.checked === false && indeterminateState);
      if (indeterminate !== indeterminateState) {
        setIndeterminateState(indeterminate);
      }
      let jsxs = (
        <CheckboxRoot ref={options} data-cds={`Checkbox`} aria-labelledby={ariaLabelledby || (matchesLabel2 && !checkbox[`aria-label`] ? controlId : undefined)} aria-describedby={[ariaDescribedby, matchesLabel2 ? controlId2 : undefined].filter(Boolean).join(` `) || undefined} {...checkbox} {...size === `xxs` ? {
  "data-size": `xxs`
} : resolveUiProviderAndLayersDataSize(size)} onMouseDown={resolveUiOverlaysAndIconsValue2(onMouseDown)} className={resolveUiDesignSystemValue2(`cds-reset group/cb border-0 outline-none focus-visible:outline-hidden data-[disabled]:opacity-disabled`, UiTooltipsAndControlsInlineFlexGapXsTextStartFontSansTextBodyFontNormalTextPrimary, matchesLabel ? `items-start` : `items-center`, size === `xxs` && `[--cds-checkbox:var(--cds-checkbox-xxs)] [--cds-checkbox-radius:var(--cds-checkbox-xxs-radius)] [--cds-checkbox-glyph:var(--cds-checkbox-xxs-glyph)]`, className)}>{<span className={clsx(UiTooltipsAndControlsState10, matchesLabel && `mt-[calc((1lh_-_var(--cds-checkbox,1rem))_/_2)]`)}>
              <span className={`text-on-accent [clip-path:inset(0_100%_0_0)] transition-[clip-path] duration-snap ease-out motion-reduce:transition-none group-data-[checked]/cb:[clip-path:inset(0)] group-data-[checked]/cb:duration-base group-data-[indeterminate]/cb:[clip-path:inset(0)] group-data-[indeterminate]/cb:duration-base`}>
                <UiTooltipsAndControlsIndeterminate indeterminate={indeterminate} />
              </span>
            </span>}{matchesLabel && (matchesLabel2 ? <span className={`flex min-w-0 flex-col`}>
                  <span id={controlId}>{label}</span>
                  <span id={controlId2} className={`text-footnote leading-snug text-muted`}>
                    {description}
                  </span>
                </span> : <span>{label}</span>)}</CheckboxRoot>
      );
      return disabledReason === undefined ? (
        jsxs
      ) : (
        <DisabledReasonTooltip
          reason={checkbox.disabled ? disabledReason : undefined}
        >
        {jsxs}
      </DisabledReasonTooltip>
      );
    },
  ));
  Checkbox.displayName = `Checkbox`;
  (resolveUiTooltipsAndControlsValue5 = (
    ..._extraArguments: unknown[]
  ): undefined => {});
  (uiTooltipsAndControlsValue82 = 8);
  (UiTooltipsAndControlsState11 = `max(${uiTooltipsAndControlsValue82}px, env(safe-area-inset-bottom, 0px))`);
  (uiTooltipsAndControlsValue240 = 240);
  (uiTooltipsAndControlsTopMaxHeightMinHeightValues = [
    `top`,
    `max-height`,
    `min-height`,
  ]);
  (uiTooltipsAndControlsBottomInsetTranslateTransformValues = [
    `bottom`,
    `inset`,
    `translate`,
    `transform`,
  ]);
  (UiTooltipsAndControlsState12 = [
    `top`,
    ...uiTooltipsAndControlsBottomInsetTranslateTransformValues,
  ]);
}

export { Button, Checkbox, OverflowTooltip, UiTooltipsAndControlsLight, UiTooltipsAndControlsLight2, UiTooltipsAndControlsPanel, UiTooltipsAndControlsStyles6, installUiTooltipsAndControlsValue, resolveUiTooltipsAndControlsClose, resolveUiTooltipsAndControlsMatches, resolveUiTooltipsAndControlsUseContext2, resolveUiTooltipsAndControlsValue3, resolveUiTooltipsAndControlsValue5, updateUiTooltipsAndControlsValue, useTooltipGroup, useUiTooltipsAndControlsFinalFocus, useUiTooltipsAndControlsFinalFocus2, useUiTooltipsAndControlsState, useUiTooltipsAndControlsTop, useUiTooltipsAndControlsUnpan };
