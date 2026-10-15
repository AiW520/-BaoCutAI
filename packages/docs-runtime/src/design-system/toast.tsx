/** BaoCut: toast from cds-CIGM-LUe.js. */
import type { Dynamic } from "../interop/legacy-dynamic";
import {
  BaseToastClose,
  BaseToastDescription,
  BaseToastPortal,
  BaseToastProvider,
  BaseToastRoot,
  BaseToastTitle,
  BaseToastViewport,
  BaseToastuseToastManager,
  CdsLayer,
  React,
  UiDesignSystemUseLayoutEffect,
  UiOverlaysAndIconsCustomIcon,
  UiOverlaysAndIconsSurface,
  UiTooltipsAndControlsPanel,
  originalJsxProps,
  resolveUiDesignSystemValue2,
  resolveUiLinksAndFoundationUseContext3,
  resolveUiTooltipsAndControlsValue3,
  uiProviderAndLayersValue9000,
} from "./dependencies";

var toastValue6000: Dynamic;

var toastValue1000: Dynamic;

function resolveToastIsFinite(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return input === undefined || input <= 0
    ? input
    : Number.isFinite(input)
      ? input < 6e3
        ? toastValue6000
        : input
      : 0;
}

var ToastPopover: Dynamic;

var ToastNeutral: Dynamic;

var ToastNeutral2: Dynamic;

var ToastNeutral3: Dynamic;

var ToastNeutral4: Dynamic;

var ToastStyles: Dynamic;

var ToastStyles2: Dynamic;

var ToastMinW0Flex1TextPrettyBreakWords: Dynamic;

var ToastStyles3: Dynamic;

var toastValues: Dynamic;

function ToastToast(
  { toast: input, front: input2, frontHeight: input3, zIndex: input4 }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = input.data?.variant ?? input.type ?? `neutral`;
  let value2: Dynamic = input.data?.icon;
  let value3: boolean = value2 != null && typeof value2 != `boolean`;
  let value4: boolean = !input2;
  let value5: Dynamic = value4 && input3 ? input3 : undefined;
  let value6: Dynamic = resolveUiLinksAndFoundationUseContext3(
    `dismiss`,
    `Dismiss`,
  );
  let { update: value7 }: Dynamic = BaseToastuseToastManager();
  let value8: Dynamic = (0, React.useContext)(ToastCreateContext);
  let value9: Dynamic = (0, React.useRef)(null);
  let value10: Dynamic = (0, React.useRef)(``);
  let value11: Dynamic = input.data?.titleNode;
  let value12: Dynamic = input.data?.count ?? 1;
  let id: Dynamic = input.id;
  let value13 = (..._extraArguments: unknown[]): undefined => {
    let value19: Dynamic = value8?.userDismissAt;
    let value20: number = Date.now();
    for (let [value21, value22] of (value19 ?? []) as Dynamic)
      if (value20 - value22 > toastValue1000) {
        value19?.delete(value21);
      }
    value19?.set(id, value20);
  };
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let current: Dynamic = value9.current;
      if (value11 === undefined || !current) return;
      let value19 = (..._extraArguments: unknown[]): undefined => {
        let value20: Dynamic = current.textContent ?? ``;
        if (value20 !== value10.current) {
          value10.current = value20;
          value7(id, {
            title: value20,
          });
        }
      };
      value19();
      let observer: Dynamic = new (MutationObserver as Dynamic)(value19);
      observer.observe(current, {
        characterData: true,
        childList: true,
        subtree: true,
      });
      return (..._extraArguments: unknown[]): Dynamic => observer.disconnect();
    },
    [value11, id, value7],
  );
  let value14: boolean = input.transitionStatus === `ending`;
  let [value15, value16]: Dynamic = (0, React.useState)({
    behind: value4,
    lockedHeight: value5,
  });
  if (
    !value14 &&
    (value15.behind !== value4 || value15.lockedHeight !== value5)
  ) {
    value16({
      behind: value4,
      lockedHeight: value5,
    });
  }
  let value17: Dynamic = value14 ? value15.behind : value4;
  let value18: Dynamic = value14 ? value15.lockedHeight : value5;
  return (
    <BaseToastRoot
      toast={input}
      swipeDirection={toastValues}
      className={ToastStyles}
      style={{
        zIndex: input4,
      }}
      onKeyDown={(
        input5?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (
          input5.key === `Escape` &&
          input5.currentTarget.contains(
            input5.currentTarget.ownerDocument.activeElement,
          )
        ) {
          value13();
        }
      }}
    >
      <div
        className={`${ToastPopover} ${ToastNeutral[value]} ${ToastNeutral2[value]}`}
      >
        <div
          className={ToastStyles2}
          data-behind={value17 ? `` : undefined}
          style={
            value18 === undefined
              ? undefined
              : {
                  height: value18,
                }
          }
        >
          {value2 !== null && (
            <span className={`shrink-0 ${ToastNeutral4[value]}`}>
              {value3 ? (
                value2
              ) : (
                <UiOverlaysAndIconsCustomIcon
                  name={ToastNeutral3[value]}
                  size={`md`}
                />
              )}
            </span>
          )}
          <div className={ToastMinW0Flex1TextPrettyBreakWords}>
            <BaseToastTitle className={`font-medium`} aria-atomic={`true`}>
              <span ref={value9}>{value11 ?? input.data?.baseTitle}</span>
              {value12 > 1 && (
                <span
                  aria-live={value12 > 2 ? `off` : undefined}
                  data-cds-toast-count={``}
                >{` (×${value12})`}</span>
              )}
            </BaseToastTitle>
            <BaseToastDescription />
            {input.data?.action && (
              <div className={`mt-pad-md empty:hidden`}>
                {input.data.action}
              </div>
            )}
          </div>
          <BaseToastClose
            aria-label={value6}
            className={ToastStyles3}
            onClick={value13}
          >
            <UiOverlaysAndIconsCustomIcon name={`X`} size={`sm`} />
          </BaseToastClose>
        </div>
      </div>
    </BaseToastRoot>
  );
}

var ToastCreateContext: Dynamic;

function ToastPinned(
  { pinned: input, onDismiss: input2 }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = input.variant ?? `neutral`;
  let value2: Dynamic = resolveUiLinksAndFoundationUseContext3(
    `dismiss`,
    `Dismiss`,
  );
  return (
    <div
      data-pinned={``}
      className={`pointer-events-auto relative w-full ${ToastPopover} ${ToastNeutral[value]} ${ToastNeutral2[value]}`}
    >
      <div className={ToastStyles2}>
        <span className={`shrink-0 ${ToastNeutral4[value]}`}>
          <UiOverlaysAndIconsCustomIcon
            name={ToastNeutral3[value]}
            size={`md`}
          />
        </span>
        <div className={ToastMinW0Flex1TextPrettyBreakWords}>
          <div className={`font-medium`}>{input.title}</div>
          {input.description && <div>{input.description}</div>}
          {input.action && (
            <div className={`mt-pad-md empty:hidden`}>{input.action}</div>
          )}
        </div>
        {input.dismissible && (
          <button
            type={`button`}
            aria-label={input.dismissLabel ?? value2}
            onClick={input2}
            className={ToastStyles3}
          >
            <UiOverlaysAndIconsCustomIcon name={`X`} size={`sm`} />
          </button>
        )}
      </div>
    </div>
  );
}

function isToastContains(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = input?.ownerDocument.activeElement;
  if (!input || !value || !input.contains(value)) return false;
  try {
    return value.matches(`:focus-visible`);
  } catch {
    return true;
  }
}

function ToastCtx(
  { ctx: input }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let {
    pinned: value,
    setPinned: value2,
    slotRef: value3,
    focusWasInsideRef: value4,
  }: Dynamic = input;
  let value5: Dynamic = (0, React.useRef)(null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let current: Dynamic = value3.current;
      if (!current) return;
      let ownerDocument: Dynamic = current.ownerDocument;
      let value6 = (
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let target: Dynamic = event.target;
        if (
          target &&
          typeof target.focus == `function` &&
          !current.contains(target)
        ) {
          value5.current = target;
        }
      };
      ownerDocument.addEventListener(`focusin`, value6);
      return (..._extraArguments: unknown[]): Dynamic =>
        ownerDocument.removeEventListener(`focusin`, value6);
    },
    [value3],
  );
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): undefined => {
      let current: Dynamic = value3.current;
      if (
        !current ||
        !value4.current ||
        ((value4.current = false),
        current.contains(current.ownerDocument.activeElement))
      )
        return;
      let current2: Dynamic = value5.current;
      if (current2?.isConnected) {
        current2.focus({
          preventScroll: true,
        });
      }
    },
    [value, value3, value4],
  );
  return (
    <div
      ref={(input2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        value3.current = input2;
      }}
      role={`status`}
      className={value ? `w-full` : `sr-only`}
      onKeyDown={(
        event?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (
          event.key === `Escape` &&
          !event.defaultPrevented &&
          !event.nativeEvent.isComposing &&
          value?.dismissible &&
          event.currentTarget.contains(
            event.currentTarget.ownerDocument.activeElement,
          )
        ) {
          value2(null);
        }
      }}
    >
      {value && (
        <ToastPinned
          pinned={value}
          onDismiss={(..._extraArguments: unknown[]): Dynamic => value2(null)}
        />
      )}
    </div>
  );
}

function ToastToasts(
  { className: input }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let { toasts: value }: Dynamic = BaseToastuseToastManager();
  let value2: Dynamic = (0, React.useContext)(ToastCreateContext);
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): undefined => {
      value2?.syncLiveToasts(value);
    },
    [value, value2],
  );
  let match: Dynamic = value.find(
    (input2?: Dynamic, ..._extraArguments: unknown[]) =>
      input2.transitionStatus !== `ending`,
  );
  return (
    <BaseToastPortal>
      <UiOverlaysAndIconsSurface surface={UiTooltipsAndControlsPanel.popover}>
        <CdsLayer
          base={uiProviderAndLayersValue9000}
          render={
            <div
              data-cds={`Toast`}
              className={resolveUiDesignSystemValue2(
                `cds-reset pointer-events-none fixed right-4 bottom-4 flex w-[360px] max-w-[calc(100vw-2rem)] flex-col-reverse gap-md`,
                input,
              )}
            />
          }
        >
          {value2 && <ToastCtx ctx={value2} />}
          <BaseToastViewport
            className={`pointer-events-auto relative outline-none focus-visible:outline-hidden`}
            style={{
              height: match?.height,
            }}
          >
            {value.map(
              (
                input2?: Dynamic,
                options?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => (
                <ToastToast
                  {...originalJsxProps(
                    {
                      toast: input2,
                      front: input2 === match,
                      frontHeight: match?.height,
                      zIndex: value.length - options,
                    },
                    input2.id,
                  )}
                />
              ),
            )}
          </BaseToastViewport>
        </CdsLayer>
      </UiOverlaysAndIconsSurface>
    </BaseToastPortal>
  );
}

function resolveToastAllocId(..._extraArguments: unknown[]): Dynamic {
  let index: number = 0;
  return {
    allocId: (..._extraArguments: unknown[]) => `cds-toast-${++index}`,
    movingIds: new (Set as Dynamic)(),
    userDismissAt: new (Map as Dynamic)(),
  };
}

function ToastProvider(
  {
    children: input,
    timeout: input4 = toastValue6000,
    limit: input2,
    viewportClassName: input3,
  }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [value, value2]: Dynamic = (0, React.useState)(null);
  let value3: Dynamic = (0, React.useRef)(value);
  let value4: Dynamic = (0, React.useRef)(null);
  let value5: Dynamic = (0, React.useRef)(false);
  let value6: Dynamic = (0, React.useCallback)(
    (input5?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let current: Dynamic = value3.current;
      value3.current = input5;
      if (current !== input5 && !value5.current) {
        value5.current = isToastContains(value4.current);
      }
      value2(input5);
      if (current && current !== input5) {
        current.onClose?.();
      }
    },
    [],
  );
  let value7: Dynamic = (0, React.useRef)([]);
  let value8: Dynamic = (0, React.useCallback)(
    (input5?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      value7.current = input5;
    },
    [],
  );
  let [value9]: Dynamic = (0, React.useState)(resolveToastAllocId);
  let value10: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => resolveToastIsFinite(input4),
    [input4],
  );
  let value11: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => ({
      pinned: value,
      setPinned: value6,
      slotRef: value4,
      focusWasInsideRef: value5,
      liveToasts: value7,
      syncLiveToasts: value8,
      defaultTimeout: value10,
      ...value9,
    }),
    [value, value6, value8, value10, value9],
  );
  return (
    <BaseToastProvider timeout={value10} limit={input2}>
      <ToastCreateContext.Provider value={value11}>
        {input}
        <ToastToasts className={input3} />
      </ToastCreateContext.Provider>
    </BaseToastProvider>
  );
}

var resolveToastValue: (..._extraArguments: unknown[]) => undefined;

function useToast(..._extraArguments: unknown[]): Dynamic {
  let value: Dynamic = BaseToastuseToastManager();
  let value2: Dynamic = (0, React.useContext)(ToastCreateContext);
  return {
    add: (0, React.useCallback)(
      (
        {
          title: input,
          description: input2,
          variant: input3,
          icon: input4,
          action: input5,
          timeout: input6,
          onClose: input7,
          dedupe: input9 = false,
          dedupeKey: input8,
        }: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let value3: Dynamic = input3 ?? `neutral`;
        let value4: boolean = typeof input == `string`;
        let value5: Dynamic = input8 ?? (value4 ? input : undefined);
        let state: Dynamic = {
          titleNode: value4 ? undefined : input,
          baseTitle: value4 ? input : undefined,
        };
        let value6: number = Date.now();
        let value7: Dynamic = (
          input10?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => {
          let value12: Dynamic = input10 ?? value2?.defaultTimeout;
          return value12 !== undefined && value12 > 0
            ? value6 + value12
            : undefined;
        };
        if (input9 && value5 !== undefined) {
          let value12: Dynamic = value2?.liveToasts.current ?? value.toasts;
          let match: Dynamic = value12.find(
            (input10?: Dynamic, ..._extraArguments: unknown[]): boolean =>
              input10.data?.dedupeKey === value5 &&
              input10.transitionStatus !== `ending`,
          );
          if (match) {
            let value13: Dynamic = (match.data?.count ?? 1) + 1;
            let value14: Dynamic = input5 ?? match.data?.action;
            let value15: boolean =
              !!match.data?.action ||
              (match.timeout ?? value2?.defaultTimeout) === 0;
            let value16: Dynamic =
              input6 === undefined ? undefined : resolveToastIsFinite(input6);
            let value17: Dynamic = value14 ? 0 : value15 ? undefined : value16;
            let state4: Dynamic = {
              ...match.data,
              ...state,
              variant: input3 ?? match.data?.variant,
              ...(input4 !== undefined && {
                icon: input4,
              }),
              action: value14,
              count: value13,
              ...(value17 !== undefined && {
                expiresAt: value7(value17),
              }),
            };
            let value18: Dynamic = value4 ? input : match.title;
            let value19: Dynamic =
              value13 === 2 && typeof value18 == `string`
                ? `${value18} (×2)`
                : value4 && input !== match.data?.baseTitle
                  ? input
                  : undefined;
            let match2: Dynamic = value12.find(
              (input10?: Dynamic, ..._extraArguments: unknown[]) =>
                input10.transitionStatus !== `ending`,
            );
            let value20: boolean =
              typeof document !== "undefined" &&
              !!(document as Dynamic).activeElement?.closest(
                `[data-cds="Toast"]`,
              );
            if (
              !value2 ||
              value20 ||
              (match2?.id === match.id && !match.limited)
            ) {
              value.update(match.id, {
                ...(value19 !== undefined && {
                  title: value19,
                }),
                description: input2,
                ...(value17 !== undefined && {
                  timeout: value17,
                }),
                data: state4,
              });
              value2?.syncLiveToasts(
                value12.map(
                  (
                    input10?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic =>
                    input10.id === match.id
                      ? {
                          ...input10,
                          data: state4,
                          timeout: value17 ?? input10.timeout,
                        }
                      : input10,
                ),
              );
              return match.id;
            }
            let value21: number =
              state4.expiresAt === undefined
                ? 0
                : Math.max(state4.expiresAt - value6, 1);
            let value22: Dynamic =
              value17 ?? (value15 ? 0 : Math.max(value21, 6e3));
            let state5: Dynamic = {
              ...match,
              title: value19 ?? match.title,
              description: input2,
              timeout: value22,
              limited: false,
              data: {
                ...state4,
                expiresAt: value7(value22),
              },
            };
            value2.movingIds.add(match.id);
            value.close(match.id);
            value2.movingIds.delete(match.id);
            value.add({
              id: state5.id,
              title: state5.title,
              description: input2,
              type: state5.type,
              priority: state5.priority,
              timeout: value22,
              onClose: state5.onClose,
              data: state5.data,
            });
            value2.syncLiveToasts([
              state5,
              ...value2.liveToasts.current.filter(
                (input10?: Dynamic, ..._extraArguments: unknown[]) =>
                  input10.id !== match.id,
              ),
            ]);
            return match.id;
          }
        }
        let value8: boolean = !!input5;
        let value9: Dynamic = value2?.allocId();
        let value10: Dynamic = value8 ? 0 : resolveToastIsFinite(input6);
        let state2: Dynamic = {
          variant: value3,
          icon: input4,
          action: input5,
          ...state,
          dedupeKey: value5,
          count: 1,
          expiresAt: value7(value10),
        };
        let state3: Dynamic = {
          id: value9,
          title: value4 ? input : undefined,
          description: input2,
          type: value3,
          timeout: value10,
          onClose: (..._extraArguments: unknown[]): undefined => {
            if (value9 === undefined || !value2) {
              input7?.({
                byUser: false,
              });
              return;
            }
            if (value2.movingIds.has(value9)) return;
            value2.syncLiveToasts(
              value2.liveToasts.current.map(
                (input10?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  input10.id === value9
                    ? {
                        ...input10,
                        transitionStatus: `ending`,
                      }
                    : input10,
              ),
            );
            let entry: Dynamic = value2.userDismissAt.get(value9);
            value2.userDismissAt.delete(value9);
            input7?.({
              byUser:
                entry !== undefined && Date.now() - entry < toastValue1000,
            });
          },
          priority: value3 === `danger` ? `high` : `low`,
          data: state2,
        };
        let value11: Dynamic = value.add(state3);
        value2?.syncLiveToasts([
          {
            ...state3,
            id: value11,
          },
          ...value2.liveToasts.current,
        ]);
        return value11;
      },
      [value, value2],
    ),
    close: value.close,
    setPinned: value2?.setPinned ?? resolveToastValue,
  };
}

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeToastStep1(): void {
  toastValue6000 = 6e3;
  toastValue1000 = 1e3;
  ToastPopover = resolveUiTooltipsAndControlsValue3(`popover`);
  ToastNeutral = {
    neutral: `shadow-panel-md`,
    warning: `shadow-ring-warning [background-image:linear-gradient(0deg,var(--cds-bg-warning),var(--cds-bg-warning))]`,
    danger: `shadow-ring-danger [background-image:linear-gradient(0deg,var(--cds-bg-danger),var(--cds-bg-danger))]`,
  };
  ToastNeutral2 = {
    neutral: `text-primary`,
    warning: `text-warning`,
    danger: `text-danger`,
  };
  ToastNeutral3 = {
    neutral: `Info`,
    warning: `Warning`,
    danger: `WarningCircle`,
  };
  ToastNeutral4 = {
    neutral: `text-secondary`,
    warning: ``,
    danger: ``,
  };
  ToastStyles = `absolute w-full bottom-0 right-0 origin-bottom [--ty:calc(var(--toast-index)_*_-14px)] [--ts:calc(1_-_var(--toast-index)_*_0.04)] [transform:translateY(var(--ty))_scale(var(--ts))] transition-[transform,opacity] duration-base ease-out motion-reduce:transition-none data-[starting-style]:opacity-0 data-[starting-style]:[--ty:100%] data-[ending-style]:opacity-0 data-[ending-style]:[--ts:0.85] data-[limited]:opacity-0`;
  ToastStyles2 = `flex items-start gap-sm px-lg py-md overflow-hidden rounded-[inherit] text-body font-normal transition-[opacity,visibility] duration-base ease-out motion-reduce:transition-none data-[behind]:invisible data-[behind]:opacity-0`;
  ToastMinW0Flex1TextPrettyBreakWords = `min-w-0 flex-1 text-pretty break-words`;
  ToastStyles3 = `cds-reset -mx-1 -mb-1 -mt-0.5 shrink-0 rounded p-1 outline-none focus-visible:outline-hidden transition duration-fast hover:bg-fill-ghost-hover focus-visible:shadow-focus`;
  toastValues = [];
  ToastCreateContext = (0, React.createContext)(null);
  resolveToastValue = (..._extraArguments: unknown[]): undefined => undefined;
}

export { ToastProvider, useToast };
