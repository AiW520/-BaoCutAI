/** BaoCut: ui toasts from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  jsxRuntime,
  createLiveModuleNamespace,
} from "../dependencies";
import {
  emitTelemetryEvent,
} from "../observability/telemetry-3";
import {
  takeBusyWhy,
} from "../services/session-and-sources-1";
import {
  resolvePlatformLoadingAndStatusOnline,
} from "../services/loading-and-status";
import {
  Button,
} from "./tooltips-and-controls";
import {
  clearPlatformKeyboardAndSaveStatusDelete,
  resolvePlatformKeyboardAndSaveStatusBody,
  resolvePlatformKeyboardAndSaveStatusKey,
  resolvePlatformKeyboardAndSaveStatusValue8,
} from "../services/keyboard-and-save-status";

function resolveUiToastsKey(
  ui2?: Dynamic,
  options: Dynamic = Date.now(),
  ..._extraArguments: unknown[]
): undefined {
  if (ui2 === `The document is busy right now — try again in a moment.`)
    try {
      let key: Dynamic = takeBusyWhy(options);
      let editors: Dynamic = resolvePlatformKeyboardAndSaveStatusValue8();
      emitTelemetryEvent(
        {
          name: `pages.face.busy`,
          key: key,
          fields: {
            why: key,
            ...(editors === undefined
              ? {}
              : {
                  editors: editors,
                }),
          },
        },
        undefined,
        options,
      );
    } catch {}
}

var UiToastsTOASTHARDMAXMS: Dynamic;

var UiToastsState: Dynamic;

var uiToastsMap: Dynamic;

function _setToastApi(
  Set2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  UiToastsState = Set2;
  if (Set2 !== null)
    for (let SetToastApiResult of uiToastsSet as Dynamic) {
      uiToastsSet.delete(SetToastApiResult);
      SetToastApiResult();
    }
}

var uiToastsSet: Dynamic;

function _onToastBridgeReady(
  On2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (UiToastsState === null) {
    uiToastsSet.add(On2);
  } else {
    On2();
  }
}

var toastStands: Dynamic;

var isUiToastsLabel: Dynamic;

var uiToastsSet2: Dynamic;

function resolveUiToastsValue(
  ui2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  uiToastsSet2.add(ui2);
  UiToastsState?.close(ui2);
}

function UiToastsSecondary(
  ui2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let uiToastsSecondaryHandler: Dynamic = (
    ui3?: Dynamic,
    variant?: Dynamic,
    context2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => (
    <Button size={`lg`} variant={variant} onClick={(ui4?: Dynamic, ..._extraArguments: unknown[]): undefined => {
  ui3.onClick(ui4);
  context();
}} key={context2}>{ui3.label}</Button>
  );
  let uiToastsSecondaryHandler2: Dynamic = isUiToastsLabel(ui2)
    ? uiToastsSecondaryHandler(ui2, `secondary`, `a`)
    : ui2;
  return options ? (
    <jsxRuntime.Fragment>
      {uiToastsSecondaryHandler(options, `ghost`, `c`)}
      {uiToastsSecondaryHandler2}
    </jsxRuntime.Fragment>
  ) : (
    uiToastsSecondaryHandler2
  );
}

var TOAST_HARD_MAX_MS: number;

var UiToastsState2: number;

var TOAST_HELD_MAX_MS: number;

var UiToastsState3: number;

var uiToastsMap2: Dynamic;

var UiToastsPointer: {
    pointer: boolean;
    focus: boolean;
};

var uiToastsValue_1: boolean;

var UiToastsState4: Dynamic;

function resolveUiToastsValue2(
  ui2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  clearUiToastsHeldMax(ui2);
  UiToastsState?.close(ui2);
}

function resolveUiToastsTimer(
  ui2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (ui2.timer !== null) {
    clearTimeout(ui2.timer);
  }
  ui2.timer = null;
}

function updateUiToastsTimer(
  updateUi?: Dynamic,
  options?: unknown,
  ..._extraArguments: unknown[]
): undefined {
  clearUiToastsHeldMax(updateUi);
  if (options === 0 || options === 1 / 0) return;
  let max =
    typeof options == `number` && Number.isFinite(options) && options > 0
      ? Math.max(options, UiToastsState2)
      : UiToastsState2;
  let record2 = {
    ms: max,
    timer: null,
    heldMax: setTimeout(
      (..._extraArguments: unknown[]) => getUiToastsPastHeldMax(updateUi),
      Math.max(max, UiToastsState3),
    ),
    pastHeldMax: false,
  };
  uiToastsMap2.set(updateUi, record2);
  UiToastsPointer.pointer = false;
  resolveUiToastsFocus();
}

function getUiToastsPastHeldMax(
  ui2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let uiToastsMap2Entry: Dynamic = uiToastsMap2.get(ui2);
  if (uiToastsMap2Entry !== undefined) {
    uiToastsMap2Entry.pastHeldMax = true;
    resolveUiToastsFocus();
    if (UiToastsPointer.pointer && !UiToastsPointer.focus) {
      resolveUiToastsValue2(ui2);
    }
  }
}

function clearUiToastsHeldMax(
  clearUi?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let uiToastsMap2Entry: Dynamic = uiToastsMap2.get(clearUi);
  if (uiToastsMap2Entry !== undefined) {
    resolveUiToastsTimer(uiToastsMap2Entry);
    clearTimeout(uiToastsMap2Entry.heldMax);
    uiToastsMap2.delete(clearUi);
  }
}

function resolveUiToastsFocus(..._extraArguments: unknown[]): undefined {
  if (
    UiToastsPointer.focus &&
    !isUiToastsClosest(UiToastsState4?.activeElement ?? null)
  ) {
    UiToastsPointer.focus = false;
  }
  for (let [
    resolveUiToastsFocusResult,
    resolveUiToastsFocusResult2,
  ] of uiToastsMap2 as Dynamic)
    if (
      UiToastsPointer.focus ||
      (UiToastsPointer.pointer && !resolveUiToastsFocusResult2.pastHeldMax)
    ) {
      resolveUiToastsTimer(resolveUiToastsFocusResult2);
    } else {
      if (resolveUiToastsFocusResult2.timer === null) {
        resolveUiToastsFocusResult2.timer = setTimeout(
          (..._extraArguments: unknown[]) =>
            resolveUiToastsValue2(resolveUiToastsFocusResult),
          resolveUiToastsFocusResult2.ms,
        );
      }
    }
}

var UiToastsStyles: string;

var isUiToastsClosest: Dynamic;

function isUiToastsMatches(
  ui2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  try {
    return ui2.matches(`:focus-visible`);
  } catch {
    return true;
  }
}

var uiToastsSet3: Dynamic;

function watchToastStack(
  document2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let resolveUiToastsFocus2 = (..._extraArguments: unknown[]): undefined => {
    if (UiToastsPointer.pointer) {
      uiToastsValue_1 = true;
    }
    UiToastsPointer.pointer = false;
    resolveUiToastsFocus();
  };
  let resolveUiToastsFocus3 = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (isUiToastsClosest(input)) {
      if (
        !UiToastsPointer.pointer &&
        !uiToastsValue_1 &&
        uiToastsMap2.size > 0
      ) {
        UiToastsPointer.pointer = true;
        resolveUiToastsFocus();
      }
    } else {
      uiToastsValue_1 = false;
      if (UiToastsPointer.pointer) {
        UiToastsPointer.pointer = false;
        resolveUiToastsFocus();
      }
    }
  };
  let items: Dynamic = [
    [
      `pointermove`,
      (event?: Dynamic, ..._extraArguments: unknown[]) =>
        resolveUiToastsFocus3(event.target),
    ],
    [
      `pointerover`,
      (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        if (!isUiToastsClosest(event.target)) {
          resolveUiToastsFocus3(event.target);
        }
      },
    ],
    [
      `pointerout`,
      (input?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        let relatedTarget: Dynamic = input.relatedTarget;
        if (!isUiToastsClosest(relatedTarget)) {
          resolveUiToastsFocus3(relatedTarget);
        }
      },
    ],
    [
      `keydown`,
      (input?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        let input2: Dynamic = input;
        if (isUiToastsClosest(input2.target)) {
          if (
            resolvePlatformKeyboardAndSaveStatusKey(input2) &&
            resolvePlatformKeyboardAndSaveStatusBody(
              input2.composedPath()[0] ?? input2.target,
              document2,
              input2.key,
            )
          ) {
            UiToastsPointer.focus = false;
          }
        } else {
          if (!uiToastsSet3.has(input2.key)) {
            resolveUiToastsFocus2();
          }
        }
        resolveUiToastsFocus();
      },
    ],
    [
      `focusin`,
      (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        UiToastsPointer.focus =
          isUiToastsClosest(event.target) && isUiToastsMatches(event.target);
        resolveUiToastsFocus();
      },
    ],
    [
      `focusout`,
      (input?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        if (
          !(!UiToastsPointer.focus || isUiToastsClosest(input.relatedTarget))
        ) {
          UiToastsPointer.focus = false;
          resolveUiToastsFocus();
        }
      },
    ],
  ];
  let defaultView: Dynamic = document2.defaultView ?? document2;
  for (let [watchToastStackResult, watchToastStackResult2] of items as Dynamic)
    defaultView.addEventListener(
      watchToastStackResult,
      watchToastStackResult2,
      true,
    );
  let clearPlatformKeyboardAndSaveStatusDelete2: Dynamic =
    clearPlatformKeyboardAndSaveStatusDelete(resolveUiToastsFocus2);
  UiToastsState4 = document2;
  UiToastsPointer.focus =
    isUiToastsClosest(document2.activeElement) &&
    isUiToastsMatches(document2.activeElement);
  resolveUiToastsFocus();
  return (..._extraArguments: unknown[]): undefined => {
    for (let [
      watchToastStackResult,
      watchToastStackResult2,
    ] of items as Dynamic)
      defaultView.removeEventListener(
        watchToastStackResult,
        watchToastStackResult2,
        true,
      );
    clearPlatformKeyboardAndSaveStatusDelete2();
    UiToastsPointer.pointer = false;
    UiToastsPointer.focus = false;
    uiToastsValue_1 = false;
    resolveUiToastsFocus();
    if (UiToastsState4 === document2) {
      UiToastsState4 = null;
    }
  };
}

var uiToastsValue0: number;

function updateUiToastsTitle(
  title?: Dynamic,
  variant?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!UiToastsState) return context?.id ?? `pre-${++uiToastsValue0}`;
  resolveUiToastsKey(title);
  let id: Dynamic = context?.id;
  if (id != null) {
    let uiToastsMapEntry: Dynamic = uiToastsMap.get(id);
    if (uiToastsMapEntry) {
      uiToastsMap.delete(id);
      resolveUiToastsValue(uiToastsMapEntry);
    }
  }
  let onDismiss: Dynamic = context?.onDismiss ?? context?.onAutoClose;
  let label: string = ``;
  let id2: Dynamic = id ?? ``;
  label = UiToastsState.add({
    title: title,
    variant: variant,
    description: context?.description,
    timeout: context?.duration === 1 / 0 ? 0 : context?.duration,
    action: UiToastsSecondary(
      context?.action,
      context?.cancel,
      (..._extraArguments: unknown[]) => resolveUiToastsValue(label),
    ),
    onClose: (..._extraArguments: unknown[]): undefined => {
      clearUiToastsHeldMax(label);
      if (uiToastsMap.get(id2) === label) {
        uiToastsMap.delete(id2);
      }
      if (!uiToastsSet2.delete(label)) {
        onDismiss?.();
      }
    },
  });
  id2 = id ?? label;
  uiToastsMap.set(id2, label);
  updateUiToastsTimer(label, context?.duration);
  return id2;
}

function resolveUiToastsNeutral(
  ui2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return updateUiToastsTitle(ui2, `neutral`, options);
}

var toast: Dynamic;

var UiToastsNow: Dynamic;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeUiToastsStep1(): void {
  (UiToastsTOASTHARDMAXMS = createLiveModuleNamespace({
    TOAST_HARD_MAX_MS: (..._extraArguments: unknown[]) => TOAST_HARD_MAX_MS,
    TOAST_HELD_MAX_MS: (..._extraArguments: unknown[]) => TOAST_HELD_MAX_MS,
    _onToastBridgeReady: (..._extraArguments: unknown[]): Dynamic =>
      _onToastBridgeReady,
    _setToastApi: (..._extraArguments: unknown[]): Dynamic => _setToastApi,
    toast: (..._extraArguments: unknown[]): Dynamic => toast,
    toastStands: (..._extraArguments: unknown[]): Dynamic => toastStands,
    watchToastStack: (..._extraArguments: unknown[]): Dynamic => watchToastStack,
  }));
  (UiToastsState = null);
  (uiToastsMap = new (Map as Dynamic)());
  (uiToastsSet = new (Set as Dynamic)());
  (toastStands = (
    toastStands2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => UiToastsState !== null && uiToastsMap.has(toastStands2));
  (isUiToastsLabel = (ui2?: unknown, ..._extraArguments: unknown[]) =>
    !!ui2 && typeof ui2 == `object` && `label` in ui2 && `onClick` in ui2);
  (uiToastsSet2 = new (Set as Dynamic)());
  (TOAST_HARD_MAX_MS = 8e3);
  (UiToastsState2 = TOAST_HARD_MAX_MS);
  (TOAST_HELD_MAX_MS = 6e4);
  (UiToastsState3 = TOAST_HELD_MAX_MS);
  (uiToastsMap2 = new (Map as Dynamic)());
  (UiToastsPointer = {
    pointer: false,
    focus: false,
  });
  (uiToastsValue_1 = false);
  (UiToastsState4 = null);
  (UiToastsStyles = `[data-cds="Toast"] [role="region"]`);
  (isUiToastsClosest = (
    ui2?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    !!ui2 &&
    typeof ui2.closest == `function` &&
    ui2.closest(UiToastsStyles) !== null);
  (uiToastsSet3 = new (Set as Dynamic)([
    `Shift`,
    `Control`,
    `Alt`,
    `Meta`,
    `AltGraph`,
    `CapsLock`,
    `Insert`,
    `Fn`,
    `OS`,
  ]));
  (uiToastsValue0 = 0);
  (resolveUiToastsNeutral as Dynamic).success = (
    callback?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => updateUiToastsTitle(callback, `neutral`, options);
  (resolveUiToastsNeutral as Dynamic).info = (
    callback?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => updateUiToastsTitle(callback, `neutral`, options);
  (resolveUiToastsNeutral as Dynamic).error = (
    callback?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => updateUiToastsTitle(callback, `danger`, options);
  (resolveUiToastsNeutral as Dynamic).warning = (
    callback?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => updateUiToastsTitle(callback, `warning`, options);
  (resolveUiToastsNeutral as Dynamic).loading = (
    callback?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    updateUiToastsTitle(callback, `neutral`, {
      ...options,
      duration: options?.duration ?? 0,
    });
  (resolveUiToastsNeutral as Dynamic).dismiss = (
    callback?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (!UiToastsState || callback == null) return;
    let uiToastsMapEntry: Dynamic = uiToastsMap.get(callback);
    if (uiToastsMapEntry) {
      uiToastsMap.delete(callback);
      UiToastsState.close(uiToastsMapEntry);
    }
  };
  (resolveUiToastsNeutral as Dynamic).promise = function (
    callback?: Dynamic,
    options: Dynamic = {},
    ..._extraArguments: unknown[]
  ): Dynamic {
    let record2: Dynamic = {
      unwrap: (..._extraArguments: unknown[]): Dynamic => callback,
    };
    if (!UiToastsState) {
      callback.catch((..._extraArguments: unknown[]): undefined => {});
      return record2;
    }
    let add: Dynamic = UiToastsState.add({
      title: options.loading ?? `Working…`,
      variant: `neutral`,
      timeout: 0,
    });
    let close = (
      callback2?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      UiToastsState?.close(add);
      if (options2 != null) {
        updateUiToastsTitle(options2, callback2);
      }
    };
    callback
      .then(
        (result?: Dynamic, ..._extraArguments: unknown[]) =>
          close(
            `neutral`,
            typeof options.success == `function`
              ? options.success(result)
              : options.success,
          ),
        (result?: Dynamic, ..._extraArguments: unknown[]) =>
          close(
            `danger`,
            typeof options.error == `function`
              ? options.error(result)
              : (options.error ?? String(result)),
          ),
      )
      .catch((..._extraArguments: unknown[]): undefined => {});
    return record2;
  };
  (toast = resolveUiToastsNeutral);
  (UiToastsNow = {
    now: (..._extraArguments: unknown[]) => Date.now(),
    facts: (..._extraArguments: unknown[]): Dynamic =>
      resolvePlatformLoadingAndStatusOnline(),
  });
}

export { UiToastsNow, UiToastsTOASTHARDMAXMS, _onToastBridgeReady, _setToastApi, toast, toastStands, watchToastStack };
