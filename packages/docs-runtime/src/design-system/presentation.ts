/** BaoCut: presentation from cds-CIGM-LUe.js. */
import type { Dynamic } from "../interop/legacy-dynamic";
import {
  React,
  UiOverlaysAndIconsStyles,
  createSafeMutationObserver,
  resolveUiOverlaysAndIconsValue4,
  resolveUiProviderAndLayersUseContext10,
  useUiOverlaysAndIconsUseInsertionEffect,
} from "./dependencies";

var PresentationStyles: Dynamic;

var PresentationMessage: Dynamic;

var PresentationStyles2: Dynamic;

var PresentationElectron: Dynamic;

function resolvePresentationValue(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return input ?? (typeof window === "undefined" ? undefined : window);
}

function resolvePresentationMatches(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = resolvePresentationValue(options);
  return (
    typeof value?.matchMedia == `function` && value.matchMedia(input).matches
  );
}

function isTouchPresentation(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return resolvePresentationMatches(PresentationStyles, input);
}

function isPointerPresentation(input?: Dynamic, ..._extraArguments: unknown[]) {
  let value: Dynamic = resolvePresentationValue(input);
  return value?.navigator?.userAgent?.includes(PresentationElectron)
    ? true
    : !(
        resolvePresentationMatches(PresentationStyles2, value) &&
        (value?.navigator?.maxTouchPoints ?? 0) > 0
      );
}

function subscribePresentationChanges(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = resolvePresentationValue(options);
  if (typeof value?.matchMedia != `function`)
    return (..._extraArguments: unknown[]): undefined => undefined;
  let mapped: Dynamic = [
    PresentationStyles,
    PresentationMessage,
    PresentationStyles2,
  ].map(
    (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      value.matchMedia(input2),
  );
  for (let value2 of mapped as Dynamic)
    value2.addEventListener(`change`, input);
  return (..._extraArguments: unknown[]): undefined => {
    for (let value2 of mapped as Dynamic)
      value2.removeEventListener(`change`, input);
  };
}

function resolvePresentationNavigator(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  let navigator: Dynamic = input.navigator;
  let value: Dynamic = (navigator as Dynamic).userAgentData?.platform ?? ``;
  return (
    /android/i.test(value) ||
    /android/i.test((navigator as Dynamic).userAgent ?? ``)
  );
}

function usePresentationCapture(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let value: Dynamic = resolveUiProviderAndLayersUseContext10();
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!input || value === undefined || options === undefined) return;
      let CloseWatcher: Dynamic = value.CloseWatcher;
      if (CloseWatcher === undefined || !resolvePresentationNavigator(value))
        return;
      let value2: Dynamic = null;
      let value3: boolean = false;
      let value4 = (..._extraArguments: unknown[]): undefined => {
        try {
          value2 = new (CloseWatcher as Dynamic)();
        } catch {
          value2 = null;
          return;
        }
        value2.onclose = (..._extraArguments: unknown[]): undefined => {
          options();
          value.addEventListener(`pointerup`, value5, {
            capture: true,
            once: true,
          });
          value.addEventListener(`keydown`, value5, {
            capture: true,
            once: true,
          });
        };
      };
      let value5 = (..._extraArguments: unknown[]): undefined => {
        value.removeEventListener(`pointerup`, value5, {
          capture: true,
        });
        value.removeEventListener(`keydown`, value5, {
          capture: true,
        });
        if (!value3) {
          value2?.destroy();
          value4();
        }
      };
      value4();
      return (..._extraArguments: unknown[]): undefined => {
        value3 = true;
        value.removeEventListener(`pointerup`, value5, {
          capture: true,
        });
        value.removeEventListener(`keydown`, value5, {
          capture: true,
        });
        value2?.destroy();
      };
    },
    [input, value, options],
  );
}

var PresentationState: Dynamic;

function resolvePresentationValue2(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): number {
  return input - options - (context || 0);
}

function isPresentationInline(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  let value: Dynamic = getComputedStyle(context);
  if (value.display === `inline`) return false;
  let value2: Dynamic = resolvePresentationValue2(
    context.offsetWidth,
    context.clientWidth,
    parseFloat(value.borderLeftWidth) + parseFloat(value.borderRightWidth),
  );
  let value3: Dynamic = resolvePresentationValue2(
    context.offsetHeight,
    context.clientHeight,
    parseFloat(value.borderTopWidth) + parseFloat(value.borderBottomWidth),
  );
  let value4: boolean =
    value2 >= 1 &&
    (value.direction === `rtl` ? input < value2 : input >= context.clientWidth);
  let value5: boolean = value3 >= 1 && options >= context.clientHeight;
  return value4 || value5;
}

function useClickToFocus(
  input?: Dynamic,
  options: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let {
    disabled: value2 = false,
    readOnly: value3 = false,
    shouldIgnoreTarget: value,
  }: Dynamic = options;
  let value4: Dynamic = useUiOverlaysAndIconsUseInsertionEffect(input);
  let value5: Dynamic = useUiOverlaysAndIconsUseInsertionEffect(value);
  return {
    clickToFocusProps: {
      onMouseDown: (0, React.useCallback)(
        (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (event.button !== 0 || value3 || value2) return;
          let target: Dynamic = event.target;
          let currentTarget: Dynamic = event.currentTarget;
          if (!currentTarget.contains(target)) return;
          if (target !== currentTarget) {
            if (value5?.(target)) return;
            let value6: Dynamic = target.closest(PresentationState);
            if (
              value6 &&
              value6 !== currentTarget &&
              currentTarget.contains(value6)
            )
              return;
          }
          let { offsetX: nativeEvent, offsetY: nativeEvent2 }: Dynamic =
            event.nativeEvent;
          if (!isPresentationInline(nativeEvent, nativeEvent2, target)) {
            event.preventDefault();
            value4?.();
          }
        },
        [value2, value3, value4, value5],
      ),
    },
  };
}

var PresentationStyles3: Dynamic;

var PresentationDataReduceMotion: Dynamic;

function isReducedMotion(..._extraArguments: unknown[]): Dynamic {
  return typeof window === "undefined" || typeof document === "undefined"
    ? false
    : (typeof (window as Dynamic).matchMedia == `function` &&
        (window as Dynamic).matchMedia(PresentationStyles3).matches) ||
        (document as Dynamic).documentElement.getAttribute(
          PresentationDataReduceMotion,
        ) === `true`;
}

var presentationSet: Dynamic;

var presentationState: Dynamic;

function resolvePresentationFrom(..._extraArguments: unknown[]): undefined {
  for (let value of Array.from<Dynamic>(presentationSet) as Dynamic) value();
}

function installPresentationAttributes(..._extraArguments: unknown[]): Dynamic {
  let value: Dynamic =
    typeof (window as Dynamic).matchMedia == `function`
      ? (window as Dynamic).matchMedia(PresentationStyles3)
      : undefined;
  let value2 = (..._extraArguments: unknown[]): undefined => {
    if (presentationState !== undefined) {
      presentationState.os = value?.matches ?? false;
    }
    resolvePresentationFrom();
  };
  value?.addEventListener(`change`, value2);
  let value3: Dynamic = createSafeMutationObserver(
    MutationObserver,
    resolvePresentationFrom,
  );
  value3.observe((document as Dynamic).documentElement, {
    attributes: true,
    attributeFilter: [PresentationDataReduceMotion],
  });
  return {
    via: (window as Dynamic).matchMedia,
    os: value?.matches ?? false,
    detach: (..._extraArguments: unknown[]): undefined => {
      value?.removeEventListener(`change`, value2);
      value3.disconnect();
    },
  };
}

function clearPresentationDelete(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  presentationSet.add(input);
  presentationState ??= installPresentationAttributes();
  return (..._extraArguments: unknown[]): undefined => {
    presentationSet.delete(input);
    if (presentationSet.size === 0 && presentationState !== undefined) {
      presentationState.detach();
      presentationState = undefined;
    }
  };
}

function resolvePresentationTrue(..._extraArguments: unknown[]): Dynamic {
  return presentationState === undefined ||
    presentationState.via !== (window as Dynamic).matchMedia
    ? isReducedMotion()
    : presentationState.os ||
        (document as Dynamic).documentElement.getAttribute(
          PresentationDataReduceMotion,
        ) === `true`;
}

var isPresentationValue: (..._extraArguments: unknown[]) => boolean;

function useReducedMotion(..._extraArguments: unknown[]): Dynamic {
  return (0, React.useSyncExternalStore)(
    clearPresentationDelete,
    resolvePresentationTrue,
    isPresentationValue,
  );
}

function useDisclosureAnimationRef(..._extraArguments: unknown[]): Dynamic {
  let value: Dynamic = (0, React.useRef)(null);
  return (0, React.useCallback)(
    (input?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (!(!input || input === value.current?.node)) {
        value.current?.detach();
        value.current = {
          node: input,
          detach: installPresentationHeight(input),
        };
      }
    },
    [],
  );
}

function installPresentationHeight(
  element?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic;
  let value2: Dynamic;
  let value3 = (..._extraArguments: unknown[]): undefined => {
    value2?.disconnect();
    value2 = undefined;
    value?.();
    value = undefined;
  };
  let value4 = (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    if (!(event.target !== element || value)) {
      value = setTemporaryStyles(element, {
        height: `auto`,
        "transition-property": `none`,
      });
      value2 = new ((element.ownerDocument.defaultView?.MutationObserver ??
        MutationObserver) as Dynamic)(
        (..._extraArguments: unknown[]): undefined => {
          if (element.hasAttribute(`data-open`)) {
            value3();
          }
        },
      );
      value2.observe(element, {
        attributes: true,
        attributeFilter: [`data-open`],
      });
    }
  };
  element.addEventListener(`beforematch`, value4);
  return (..._extraArguments: unknown[]): undefined => {
    element.removeEventListener(`beforematch`, value4);
    value3();
  };
}

function setTemporaryStyles(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let mapped: Dynamic = Object.keys(options).map(
    (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => [
      input2,
      input.style.getPropertyValue(input2),
      input.style.getPropertyPriority(input2),
    ],
  );
  for (let [value, value2] of Object.entries(options) as Dynamic)
    input.style.setProperty(value, value2);
  return (..._extraArguments: unknown[]): undefined => {
    for (let [value, value2, value3] of mapped as Dynamic)
      if (value2) {
        input.style.setProperty(value, value2, value3);
      } else {
        input.style.removeProperty(value);
      }
  };
}

var disclosurePanelClasses: Dynamic;

var resolvePresentationTransitionProperty: Dynamic;

var installPresentationAttributeFilter: Dynamic;

var usePresentationCurrent: Dynamic;

var useDisclosurePanelRef: Dynamic;

var PresentationCreateContext: Dynamic;

function resolvePresentationUseContext(..._extraArguments: unknown[]): Dynamic {
  return (0, React.useContext)(PresentationCreateContext);
}

// BaoCut: called by cds-initialize in the recovered source order.
export function initializePresentationStep1(): void {
  PresentationStyles = `(pointer: coarse), (hover: none)`;
  PresentationMessage = `(width < 40rem)`;
  PresentationStyles2 = `(pointer: coarse)`;
  PresentationElectron = ` Electron/`;
  PresentationState = `button,a[href],label,[role="button"],select,[tabindex]:not([tabindex="-1"]),${UiOverlaysAndIconsStyles}`;
  PresentationStyles3 = `(prefers-reduced-motion: reduce)`;
  PresentationDataReduceMotion = `data-reduce-motion`;
  presentationSet = new (Set as Dynamic)();
  isPresentationValue = (..._extraArguments: unknown[]) => false;
  disclosurePanelClasses = `break-words h-[var(--cds-disclosure-panel-height)] transition-[height] duration-base ease-out motion-reduce:transition-none data-[starting-style]:h-0 data-[ending-style]:h-0 data-[starting-style]:[clip-path:inset(-8px_-100vw_0_-100vw)] data-[ending-style]:[clip-path:inset(-8px_-100vw_0_-100vw)] data-[animating]:[clip-path:inset(-8px_-100vw_0_-100vw)] data-[starting-style]:contain-layout data-[ending-style]:contain-layout data-[animating]:contain-layout`;
  resolvePresentationTransitionProperty = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): boolean =>
    `transitionProperty` in input && input.transitionProperty === `height`;
  installPresentationAttributeFilter = (
    element?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let value = (..._extraArguments: unknown[]): undefined => {
      let value5: Dynamic =
        element.hasAttribute(`data-starting-style`) ||
        element.hasAttribute(`data-ending-style`) ||
        (element
          .getAnimations?.()
          .some(resolvePresentationTransitionProperty) ??
          false);
      element.toggleAttribute(`data-animating`, value5);
    };
    let value2: Dynamic = new ((element.ownerDocument.defaultView
      ?.MutationObserver ?? MutationObserver) as Dynamic)(value);
    value2.observe(element, {
      attributeFilter: [`data-starting-style`, `data-ending-style`],
    });
    value();
    let value3 = (
      event?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (event.target === element && event.propertyName === `height`) {
        element.setAttribute(`data-animating`, ``);
      }
    };
    let value4 = (
      event?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (event.target === element && event.propertyName === `height`) {
        value();
      }
    };
    element.addEventListener(`transitionrun`, value3);
    element.addEventListener(`transitionend`, value4);
    element.addEventListener(`transitioncancel`, value4);
    return (..._extraArguments: unknown[]): undefined => {
      value2.disconnect();
      element.removeEventListener(`transitionrun`, value3);
      element.removeEventListener(`transitionend`, value4);
      element.removeEventListener(`transitioncancel`, value4);
      element.removeAttribute(`data-animating`);
    };
  };
  usePresentationCurrent = (..._extraArguments: unknown[]): Dynamic => {
    let value: Dynamic = (0, React.useRef)(null);
    return (0, React.useCallback)(
      (input?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        value.current?.();
        value.current = input
          ? installPresentationAttributeFilter(input)
          : null;
      },
      [],
    );
  };
  useDisclosurePanelRef = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveUiOverlaysAndIconsValue4(
      input,
      usePresentationCurrent(),
      useDisclosureAnimationRef(),
    );
  PresentationCreateContext = (0, React.createContext)(null);
}

export {
  PresentationCreateContext,
  disclosurePanelClasses,
  isPointerPresentation,
  isPresentationInline,
  isReducedMotion,
  isTouchPresentation,
  resolvePresentationUseContext,
  subscribePresentationChanges,
  useClickToFocus,
  useDisclosurePanelRef,
  usePresentationCapture,
  useReducedMotion,
};
