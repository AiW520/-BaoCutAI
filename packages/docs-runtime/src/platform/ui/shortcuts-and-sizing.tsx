/** BaoCut: ui shortcuts and sizing from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  React,
  jsxRuntime,
} from "../dependencies";
import {
  UiDesignSystemUseLayoutEffect,
  resolveUiDesignSystemValue2,
} from "./design-system";
import {
  createSafeMutationObserver,
  resolveUiLinksAndFoundationUseContext3,
  resolveUiLinksAndFoundationValue9,
} from "./links-and-foundation";
import {
  resolveUiProviderAndLayersUseContext8,
} from "./provider-and-layers";
import {
  resolveUiOverlaysAndIconsValue4,
} from "./overlays-and-icons";
import type * as ReactComponentTypes from "react";
import type {
  TooltipPositionerProps,
  TooltipPortalProps,
} from "@base-ui/react/tooltip";

export interface ShortcutProps
  extends ReactComponentTypes.HTMLAttributes<HTMLSpanElement> {
  keys: string;
  variant?: "keycap" | "text";
  onFill?: boolean;
}

export const UiShortcutsAndSizingKeys: ReactComponentTypes.FC<ShortcutProps> = ({
  keys: keys,
  variant = `keycap`,
  onFill = false,
  className: className,
  ...uiShortcutsAndSizingKeys
}) => {
  let useUiShortcutsAndSizingUseSyncExternalStore3: Dynamic =
    useUiShortcutsAndSizingUseSyncExternalStore();
  let uiLinksAndFoundationUseContext3: Dynamic = resolveUiLinksAndFoundationUseContext3(
    `sequenceThen`,
    UiShortcutsAndSizingThen,
  );
  let mappedUiShortcutsAndSizingReplace: Dynamic = resolveUiShortcutsAndSizingReplace(
    keys,
  ).map(
    (uiShortcutsAndSizingReplace?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      collectUiShortcutsAndSizingModifiers(
        uiShortcutsAndSizingReplace,
        useUiShortcutsAndSizingUseSyncExternalStore3,
      ),
  );
  let matchesVariant: boolean =
    variant === `text` && !useUiShortcutsAndSizingUseSyncExternalStore3;
  return (
    <span
      {...uiShortcutsAndSizingKeys}
      data-cds={`Shortcut`}
      data-variant={variant}
      className={resolveUiDesignSystemValue2(
        UiShortcutsAndSizingKeycap[variant],
        onFill && `[--cds-shortcut-cap-ink:currentColor]`,
        className,
      )}
    >
      {mappedUiShortcutsAndSizingReplace.map(
        (
          mappedUiShortcutsAndSizingReplace2?: Dynamic,
          index?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => (
          <React.Fragment key={index}>
            {index > 0 && (
              <span className={`px-[2px] [color:var(--cds-shortcut-cap-ink)]`}>
                {uiLinksAndFoundationUseContext3}
              </span>
            )}
            {mappedUiShortcutsAndSizingReplace2.map(
              (
                { label: label, spoken: spoken }: Dynamic,
                index2?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => (
                <React.Fragment key={index2}>
                  {matchesVariant && index2 > 0 && (
                    <span className={`mx-[-0.3em] [color:var(--cds-shortcut-cap-ink)]`}>
                      {UiShortcutsAndSizingMessage}
                    </span>
                  )}
                  {
                    <kbd
                      className={
                        variant === `text`
                          ? UiShortcutsAndSizingStyles4
                          : resolveUiShortcutsAndSizingFrom(label)
                      }
                    >
                      {spoken === undefined ? (
                        label
                      ) : matchesVariant ? (
                        spoken
                      ) : (
                        <jsxRuntime.Fragment>
                          <span aria-hidden={`true`}>{label}</span>
                          <span className={`sr-only select-none`}>{spoken}</span>
                        </jsxRuntime.Fragment>
                      )}
                    </kbd>
                  }
                </React.Fragment>
              ),
            )}
          </React.Fragment>
        ),
      )}
    </span>
  );
};

export const UiShortcutsAndSizingOverride: ReactComponentTypes.FC<{
  override?: TooltipPositionerProps["collisionPadding"];
  container?: TooltipPortalProps["container"];
  provideInherit?: boolean;
  children: (
    padding: TooltipPositionerProps["collisionPadding"],
  ) => ReactComponentTypes.ReactNode;
}> = ({
  override: override,
  container: container,
  provideInherit = false,
  children: children,
}) => {
  let collisionPadding: TooltipPositionerProps["collisionPadding"] = resolveUiShortcutsAndSizingTop(override, container);
  let memoized: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => ({
      collisionPadding: collisionPadding,
    }),
    [collisionPadding],
  );
  let children2 = children(collisionPadding);
  return provideInherit ? (
    <UiShortcutsAndSizingCreateContext3.Provider value={memoized}>
      {children2}
    </UiShortcutsAndSizingCreateContext3.Provider>
  ) : (
    children2
  );
};

export const UiShortcutsAndSizingReason: ReactComponentTypes.FC<{
  id: string;
  reason?: ReactComponentTypes.ReactNode;
}> = ({
  id: id,
  reason: reason,
}) => {
  let elementRef: Dynamic = (0, React.useRef)(null);
  (0, React.useEffect)((..._extraArguments: unknown[]): undefined => {}, [reason]);
  return (
    <span
      ref={elementRef}
      id={id}
      hidden={true}
      {...{
        [UiShortcutsAndSizingDataCdsDisabledReason]: ``,
      }}
    >
      {isUiShortcutsAndSizingValue(reason) ? reason : null}
    </span>
  );
};

export const UiShortcutsAndSizingDataMode: ReactComponentTypes.FC<{
  children?: ReactComponentTypes.ReactNode;
}> = ({
  children: children,
}) => {
  return (
    <div className={`cds-dark-scope contents`} data-mode={`dark`}>
      {children}
    </div>
  );
};

var UiShortcutsAndSizingStyles: string;

var UiShortcutsAndSizingStyles2: string;

var UiShortcutsAndSizingStyles3: string;

function resolveUiShortcutsAndSizingFrom(
  uiShortcutsAndSizing?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return `${UiShortcutsAndSizingStyles} ${Array.from<Dynamic>(uiShortcutsAndSizing ?? ``).length === 1 ? UiShortcutsAndSizingStyles2 : UiShortcutsAndSizingStyles3}`;
}

var UiShortcutsAndSizingStyles4: string;

var UiShortcutsAndSizingKeycap: Dynamic;

var UiShortcutsAndSizingThen: string;

var UiShortcutsAndSizingMessage: string;

var uiShortcutsAndSizingPattern: RegExp;

var resolveUiShortcutsAndSizingValue: Dynamic;

function useUiShortcutsAndSizingUseSyncExternalStore(
  ..._extraArguments: unknown[]
): Dynamic {
  return (0, React.useSyncExternalStore)(
    resolveUiShortcutsAndSizingValue,
    (..._extraArguments: unknown[]) =>
      uiShortcutsAndSizingPattern.test(navigator.userAgent),
    (..._extraArguments: unknown[]) => false,
  );
}

var uiShortcutsAndSizingCmdCommandMetaCtrlValues: string[];

var resolveUiShortcutsAndSizingIncludes: Dynamic;

var uiShortcutsAndSizingCtrlControlAltOptionValues: string[];

var UiShortcutsAndSizingCtrl: {
    ctrl: string;
    control: string;
    alt: string;
    option: string;
    shift: string;
    cmd: string;
    command: string;
    meta: string;
};

var UiShortcutsAndSizingCtrl2: {
    ctrl: string;
    control: string;
    alt: string;
    option: string;
    shift: string;
    cmd: string;
    command: string;
    meta: string;
};

var UiShortcutsAndSizingSpace: {
    space: string;
    enter: string;
    return: string;
    delete: string;
    backspace: string;
    escape: string;
    esc: string;
    tab: string;
    up: string;
    down: string;
    left: string;
    right: string;
    pageup: string;
    pagedown: string;
    home: string;
    end: string;
    insert: string;
};

var UiShortcutsAndSizingSpace2: {
    space: string;
    enter: string;
    return: string;
    delete: string;
    backspace: string;
    escape: string;
    esc: string;
    tab: string;
    up: string;
    down: string;
    left: string;
    right: string;
    pageup: string;
    pagedown: string;
    home: string;
    end: string;
    insert: string;
};

function resolveUiShortcutsAndSizingHasOwn(
  uiShortcutsAndSizingHasOwn?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return Object.hasOwn(uiShortcutsAndSizingHasOwn, options)
    ? uiShortcutsAndSizingHasOwn[options]
    : undefined;
}

function resolveUiShortcutsAndSizingTest(
  items?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let uiShortcutsAndSizingHasOwn: Dynamic = resolveUiShortcutsAndSizingHasOwn(
    options ? UiShortcutsAndSizingSpace : UiShortcutsAndSizingSpace2,
    items,
  );
  return uiShortcutsAndSizingHasOwn === undefined
    ? /^f\d+$/.test(items) || items.length === 1
      ? items.toUpperCase()
      : items.charAt(0).toUpperCase() + items.slice(1)
    : uiShortcutsAndSizingHasOwn;
}

function resolveUiShortcutsAndSizingReplace(
  uiShortcutsAndSizingReplace?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let replace: Dynamic = uiShortcutsAndSizingReplace
    .trim()
    .replace(/\s*\+\s*/g, `+`);
  return replace ? replace.split(/\s+/) : [];
}

function filterUiShortcutsAndSizingModifiers(
  filterUiShortcutsAndSizingModifiers2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let filteredMappedNormalizedFilterUiShortcutsAndSizingModifiersParts: Dynamic =
    filterUiShortcutsAndSizingModifiers2
      .toLowerCase()
      .split(`+`)
      .map(
        (
          normalizedRolldownNImportPart?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => normalizedRolldownNImportPart.trim(),
      )
      .filter(
        (
          mappedNormalizedRolldownNImportPart?: Dynamic,
          ..._extraArguments: unknown[]
        ) => mappedNormalizedRolldownNImportPart !== ``,
      );
  let modifiers: Dynamic = [];
  let keys: Dynamic = [];
  for (let filterUiShortcutsAndSizingModifiersResult of filteredMappedNormalizedFilterUiShortcutsAndSizingModifiersParts as Dynamic)
    if (
      resolveUiShortcutsAndSizingIncludes(
        filterUiShortcutsAndSizingModifiersResult,
      )
    ) {
      modifiers.push(filterUiShortcutsAndSizingModifiersResult);
    } else {
      keys.push(filterUiShortcutsAndSizingModifiersResult);
    }
  let indexOf: Dynamic = (
    filterUiShortcutsAndSizingModifiers3?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    uiShortcutsAndSizingCtrlControlAltOptionValues.indexOf(
      !options &&
        (filterUiShortcutsAndSizingModifiers3 === `cmd` ||
          filterUiShortcutsAndSizingModifiers3 === `command` ||
          filterUiShortcutsAndSizingModifiers3 === `meta`)
        ? `ctrl`
        : filterUiShortcutsAndSizingModifiers3,
    );
  modifiers.sort(
    (
      modifier?: Dynamic,
      modifier2?: Dynamic,
      ..._extraArguments: unknown[]
    ): number => indexOf(modifier) - indexOf(modifier2),
  );
  return {
    modifiers: modifiers,
    keys: keys,
  };
}

var UiShortcutsAndSizingCmd: {
    cmd: string;
    command: string;
    meta: string;
    ctrl: string;
    control: string;
    alt: string;
    option: string;
    shift: string;
    enter: string;
    return: string;
    space: string;
    tab: string;
    delete: string;
    backspace: string;
    up: string;
    down: string;
    left: string;
    right: string;
};

function collectUiShortcutsAndSizingModifiers(
  collectUiShortcutsAndSizingModifiers3?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let {
    modifiers: filterUiShortcutsAndSizingModifiers2,
    keys: filterUiShortcutsAndSizingModifiers3,
  }: Dynamic = filterUiShortcutsAndSizingModifiers(
    collectUiShortcutsAndSizingModifiers3,
    options,
  );
  let UiShortcutsAndSizingCtrl4: Dynamic = options
    ? UiShortcutsAndSizingCtrl
    : UiShortcutsAndSizingCtrl2;
  let test: Dynamic = (
    collectUiShortcutsAndSizingModifiers4?: Dynamic,
    label?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (/^[A-Za-z0-9 ]+$/.test(label))
      return {
        label: label,
      };
    let spoken: Dynamic = resolveUiShortcutsAndSizingHasOwn(
      UiShortcutsAndSizingCmd,
      collectUiShortcutsAndSizingModifiers4,
    );
    return spoken === undefined
      ? {
          label: label,
        }
      : {
          label: label,
          spoken: spoken,
        };
  };
  return [
    ...filterUiShortcutsAndSizingModifiers2.map(
      (
        filterUiShortcutsAndSizingModifier?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        test(
          filterUiShortcutsAndSizingModifier,
          UiShortcutsAndSizingCtrl4[filterUiShortcutsAndSizingModifier],
        ),
    ),
    ...filterUiShortcutsAndSizingModifiers3.map(
      (
        filterUiShortcutsAndSizingModifier?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        test(
          filterUiShortcutsAndSizingModifier,
          resolveUiShortcutsAndSizingTest(
            filterUiShortcutsAndSizingModifier,
            options,
          ),
        ),
    ),
  ];
}

var UiShortcutsAndSizingCtrl3: {
    ctrl: string;
    control: string;
    alt: string;
    option: string;
    shift: string;
    enter: string;
    return: string;
    escape: string;
    esc: string;
    space: string;
    tab: string;
    delete: string;
    backspace: string;
    up: string;
    down: string;
    left: string;
    right: string;
    home: string;
    end: string;
    pageup: string;
    pagedown: string;
    insert: string;
};

function collectUiShortcutsAndSizingModifiers2(
  collectUiShortcutsAndSizingModifiers22?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let [
    uiShortcutsAndSizingReplace,
    ...setUiShortcutsAndSizingReplace
  ]: Dynamic = resolveUiShortcutsAndSizingReplace(
    collectUiShortcutsAndSizingModifiers22,
  );
  if (
    uiShortcutsAndSizingReplace === undefined ||
    setUiShortcutsAndSizingReplace.length > 0
  )
    return;
  let {
    modifiers: filterUiShortcutsAndSizingModifiers2,
    keys: filterUiShortcutsAndSizingModifiers3,
  }: Dynamic = filterUiShortcutsAndSizingModifiers(
    uiShortcutsAndSizingReplace,
    options,
  );
  if (filterUiShortcutsAndSizingModifiers3.length !== 1) return;
  let label = options ? `Meta` : `Control`;
  let slice: Dynamic = (
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    items === `cmd` || items === `command` || items === `meta`
      ? label
      : (resolveUiShortcutsAndSizingHasOwn(UiShortcutsAndSizingCtrl3, items) ??
        (/^f\d+$/.test(items)
          ? items.toUpperCase()
          : items.length === 1
            ? items
            : items.charAt(0).toUpperCase() + items.slice(1)));
  return [
    ...filterUiShortcutsAndSizingModifiers2,
    ...filterUiShortcutsAndSizingModifiers3,
  ]
    .map(slice)
    .join(`+`);
}

var UiShortcutsAndSizingMaxWidth: string;

var uiShortcutsAndSizingWeakMap: Dynamic;

var uiShortcutsAndSizingWeakMap2: Dynamic;

function updateUiShortcutsAndSizingStyle(
  updateUiShortcutsAndSizingStyle3?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  updateUiShortcutsAndSizingStyle3.style[UiShortcutsAndSizingMaxWidth] =
    options;
  uiShortcutsAndSizingWeakMap2.set(updateUiShortcutsAndSizingStyle3, options);
}

function updateUiShortcutsAndSizingStyle2(
  updateUiShortcutsAndSizingStyle22?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let styleItem: Dynamic =
    updateUiShortcutsAndSizingStyle22.style[UiShortcutsAndSizingMaxWidth];
  if (
    !uiShortcutsAndSizingWeakMap.has(updateUiShortcutsAndSizingStyle22) ||
    styleItem !==
      uiShortcutsAndSizingWeakMap2.get(updateUiShortcutsAndSizingStyle22)
  ) {
    uiShortcutsAndSizingWeakMap.set(
      updateUiShortcutsAndSizingStyle22,
      styleItem,
    );
  }
}

var uiShortcutsAndSizingValue12: number;

var UiShortcutsAndSizingDataShrinkwrap: string;

var uiShortcutsAndSizingValue16: number;

function isUiShortcutsAndSizingAcceptNode(
  element?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let ownerDocument2: Dynamic = element.ownerDocument;
  let defaultView: Dynamic = ownerDocument2.defaultView;
  let rects: Dynamic = [];
  let left: number = 1 / 0;
  let right: number = -1 / 0;
  let isUiShortcutsAndSizingAcceptNodeHandler = (
    uiShortcutsAndSizingAcceptNode?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    rects.push(uiShortcutsAndSizingAcceptNode);
    if (uiShortcutsAndSizingAcceptNode.left < left) {
      left = uiShortcutsAndSizingAcceptNode.left;
    }
    if (uiShortcutsAndSizingAcceptNode.right > right) {
      right = uiShortcutsAndSizingAcceptNode.right;
    }
  };
  let clipped: number = 0;
  let boundLeft: number = 1 / 0;
  let boundRight: number = -1 / 0;
  let isUiShortcutsAndSizingAcceptNodeHandler2 = (
    uiShortcutsAndSizingAcceptNode?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (uiShortcutsAndSizingAcceptNode.left < boundLeft) {
      boundLeft = uiShortcutsAndSizingAcceptNode.left;
    }
    if (uiShortcutsAndSizingAcceptNode.right > boundRight) {
      boundRight = uiShortcutsAndSizingAcceptNode.right;
    }
  };
  let getAttribute = (
    uiShortcutsAndSizingAcceptNode?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    for (
      let uiShortcutsAndSizingAcceptNode2: Dynamic =
        uiShortcutsAndSizingAcceptNode.nodeType === 1
          ? uiShortcutsAndSizingAcceptNode
          : uiShortcutsAndSizingAcceptNode.parentElement;
      uiShortcutsAndSizingAcceptNode2 &&
      uiShortcutsAndSizingAcceptNode2 !== element;
      uiShortcutsAndSizingAcceptNode2 =
        uiShortcutsAndSizingAcceptNode2.parentElement
    )
      if (
        uiShortcutsAndSizingAcceptNode2.getAttribute(`data-shrinkwrap`) ===
        `fill`
      )
        return true;
    return false;
  };
  let range: Dynamic = ownerDocument2.createRange();
  let treeWalker: Dynamic = ownerDocument2.createTreeWalker(element, 5, {
    acceptNode: (
      uiShortcutsAndSizingAcceptNode?: Dynamic,
      ..._extraArguments: unknown[]
    ) => {
      if (uiShortcutsAndSizingAcceptNode.nodeType === 1) {
        let computedStyle: Dynamic = defaultView?.getComputedStyle(
          uiShortcutsAndSizingAcceptNode,
        );
        return computedStyle &&
          (computedStyle.display === `none` ||
            computedStyle.position === `absolute` ||
            computedStyle.position === `fixed`)
          ? 2
          : 1;
      }
      return getAttribute(uiShortcutsAndSizingAcceptNode) ? 2 : 1;
    },
  });
  let nextNode: Dynamic = treeWalker.nextNode();
  for (; nextNode; ) {
    if (nextNode.nodeType === 3) {
      range.selectNodeContents(nextNode);
      for (let isUiShortcutsAndSizingAcceptNodeResult of (range.getClientRects?.() ??
        []) as Dynamic)
        if (isUiShortcutsAndSizingAcceptNodeResult.width > 0) {
          isUiShortcutsAndSizingAcceptNodeHandler(
            isUiShortcutsAndSizingAcceptNodeResult,
          );
          isUiShortcutsAndSizingAcceptNodeHandler2(
            isUiShortcutsAndSizingAcceptNodeResult,
          );
        }
    } else {
      let nextNode2: Dynamic = nextNode;
      let computedStyle: Dynamic = defaultView?.getComputedStyle(nextNode2);
      let nextNodeBounds: Dynamic = nextNode2.getBoundingClientRect();
      if (nextNodeBounds.width > 0) {
        isUiShortcutsAndSizingAcceptNodeHandler2(nextNodeBounds);
      }
      if (
        computedStyle &&
        !getAttribute(nextNode2) &&
        resolveUiShortcutsAndSizingInline(nextNode2, computedStyle)
      )
        for (let isUiShortcutsAndSizingAcceptNodeResult of nextNode2.getClientRects() as Dynamic)
          if (isUiShortcutsAndSizingAcceptNodeResult.width > 0) {
            isUiShortcutsAndSizingAcceptNodeHandler(
              isUiShortcutsAndSizingAcceptNodeResult,
            );
          }
      if (
        computedStyle &&
        (computedStyle.overflowX !== `visible` ||
          computedStyle.overflowY !== `visible`)
      ) {
        clipped +=
          Math.max(0, nextNode2.scrollWidth - nextNode2.clientWidth) +
          Math.max(0, nextNode2.scrollHeight - nextNode2.clientHeight);
      }
    }
    if (options && right > left && options(right - left)) break;
    nextNode = treeWalker.nextNode();
  }
  return {
    rects: rects,
    left: left,
    right: right,
    clipped: clipped,
    boundLeft: boundLeft,
    boundRight: boundRight,
  };
}

var uiShortcutsAndSizingSet: Dynamic;

function resolveUiShortcutsAndSizingInline(
  uiShortcutsAndSizingInline?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return uiShortcutsAndSizingSet.has(
    uiShortcutsAndSizingInline.tagName.toUpperCase(),
  )
    ? true
    : options.display.startsWith(`inline`);
}

function collectUiShortcutsAndSizingRects(
  element: Dynamic,
  {
    rects: rects,
    clipped: clipped,
    boundLeft: boundLeft,
    boundRight: boundRight,
  }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let computedStyle: Dynamic =
    element.ownerDocument.defaultView?.getComputedStyle(element);
  let elementBounds: Dynamic = element.getBoundingClientRect();
  let spill = 0;
  if (computedStyle && Number.isFinite(boundLeft)) {
    let number2 = parseFloat(computedStyle.width);
    let number3 =
      computedStyle.boxSizing === `border-box`
        ? number2
        : number2 +
          parseFloat(computedStyle.paddingLeft) +
          parseFloat(computedStyle.paddingRight) +
          parseFloat(computedStyle.borderLeftWidth) +
          parseFloat(computedStyle.borderRightWidth);
    let matchesNumber: number =
      (number3 > 0 && elementBounds.width / number3) || 1;
    let total: Dynamic =
      elementBounds.left +
      (parseFloat(computedStyle.borderLeftWidth) +
        parseFloat(computedStyle.paddingLeft)) *
        matchesNumber;
    let difference =
      elementBounds.right -
      (parseFloat(computedStyle.borderRightWidth) +
        parseFloat(computedStyle.paddingRight)) *
        matchesNumber;
    spill =
      Math.max(0, boundRight - difference) + Math.max(0, total - boundLeft);
  }
  return {
    height: element.scrollHeight,
    overflow: element.scrollWidth,
    client: element.clientWidth,
    spill: spill,
    clipped: clipped,
    widths: rects.map(
      (rect?: Dynamic, ..._extraArguments: unknown[]): Dynamic => rect.width,
    ),
  };
}

function resolveUiShortcutsAndSizingHeight(
  uiShortcutsAndSizingHeight?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return options.height > uiShortcutsAndSizingHeight.height ||
    options.overflow > options.client + 0.5 ||
    options.spill > uiShortcutsAndSizingHeight.spill + 0.5 ||
    options.clipped > uiShortcutsAndSizingHeight.clipped + 0.5
    ? false
    : uiShortcutsAndSizingHeight.widths.length === options.widths.length &&
        uiShortcutsAndSizingHeight.widths.every(
          (width?: Dynamic, index?: Dynamic, ..._extraArguments: unknown[]) =>
            Math.abs(width - (options.widths[index] ?? NaN)) <= 0.5,
        );
}

function resolveUiShortcutsAndSizingHeight2(
  uiShortcutsAndSizingHeight2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    (options.height < uiShortcutsAndSizingHeight2.height ||
      options.clipped < uiShortcutsAndSizingHeight2.clipped - 0.5) &&
    uiShortcutsAndSizingHeight2.widths.length === options.widths.length &&
    uiShortcutsAndSizingHeight2.widths.every(
      (width?: Dynamic, index?: Dynamic, ..._extraArguments: unknown[]) =>
        Math.abs(width - (options.widths[index] ?? NaN)) <= 0.5,
    )
  );
}

function getUiShortcutsAndSizingValue(
  uiShortcutsAndSizingValue?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (uiShortcutsAndSizingWeakMap.has(uiShortcutsAndSizingValue)) {
    updateUiShortcutsAndSizingStyle2(uiShortcutsAndSizingValue);
    updateUiShortcutsAndSizingStyle(
      uiShortcutsAndSizingValue,
      uiShortcutsAndSizingWeakMap.get(uiShortcutsAndSizingValue) ?? ``,
    );
  }
}

function resolveUiShortcutsAndSizingDone(
  uiShortcutsAndSizingDone?: Dynamic,
  done?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    el: uiShortcutsAndSizingDone,
    done: done,
    boxWidth: 0,
    borderBoxSizing: true,
    natural: null,
    candidate: 0,
    stage: `read`,
    lo: 0,
    hi: 0,
    probes: 0,
    resizeDue: false,
  };
}

function resolveUiShortcutsAndSizingSettled(
  uiShortcutsAndSizingSettled?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (options === null) {
    getUiShortcutsAndSizingValue(uiShortcutsAndSizingSettled.el);
  } else {
    updateUiShortcutsAndSizingStyle(
      uiShortcutsAndSizingSettled.el,
      `${options}px`,
    );
  }
  uiShortcutsAndSizingSettled.stage = `settled`;
  uiShortcutsAndSizingSettled.done(options);
}

function resolveUiShortcutsAndSizingBorderBox(
  uiShortcutsAndSizingBorderBox?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let { el: uiShortcutsAndSizingBorderBox2 }: Dynamic =
    uiShortcutsAndSizingBorderBox;
  let defaultView: Dynamic =
    uiShortcutsAndSizingBorderBox2.ownerDocument.defaultView;
  if (
    !defaultView ||
    typeof uiShortcutsAndSizingBorderBox2.getBoundingClientRect != `function`
  ) {
    resolveUiShortcutsAndSizingSettled(uiShortcutsAndSizingBorderBox, null);
    return;
  }
  let computedStyle: Dynamic = defaultView.getComputedStyle(
    uiShortcutsAndSizingBorderBox2,
  );
  let number2 = parseFloat(computedStyle.width);
  if (!Number.isFinite(number2) || number2 <= 0) {
    resolveUiShortcutsAndSizingSettled(uiShortcutsAndSizingBorderBox, null);
    return;
  }
  let matchesBoxSizing = computedStyle.boxSizing === `border-box`;
  let total =
    parseFloat(computedStyle.paddingLeft) +
    parseFloat(computedStyle.paddingRight) +
    parseFloat(computedStyle.borderLeftWidth) +
    parseFloat(computedStyle.borderRightWidth);
  let number3 = matchesBoxSizing ? number2 : number2 + total;
  let amount: number =
    uiShortcutsAndSizingBorderBox2.getBoundingClientRect().width / number3 || 1;
  let ceil: Dynamic = (
    uiShortcutsAndSizingBorderBox3?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let amount2: number = uiShortcutsAndSizingBorderBox3 / amount;
    return Math.ceil((matchesBoxSizing ? amount2 + total : amount2) - 0.001);
  };
  let ceil2 = (
    uiShortcutsAndSizingBorderBox3?: Dynamic,
    ..._extraArguments: unknown[]
  ) => ceil(uiShortcutsAndSizingBorderBox3) >= number2 - 0.5;
  let isUiShortcutsAndSizingAcceptNode2: Dynamic =
    isUiShortcutsAndSizingAcceptNode(uiShortcutsAndSizingBorderBox2, ceil2);
  if (isUiShortcutsAndSizingAcceptNode2.rects.length === 0) {
    resolveUiShortcutsAndSizingSettled(uiShortcutsAndSizingBorderBox, null);
    return;
  }
  let difference: number =
    isUiShortcutsAndSizingAcceptNode2.right -
    isUiShortcutsAndSizingAcceptNode2.left;
  if (ceil2(difference)) {
    resolveUiShortcutsAndSizingSettled(uiShortcutsAndSizingBorderBox, null);
    return;
  }
  uiShortcutsAndSizingBorderBox.natural = collectUiShortcutsAndSizingRects(
    uiShortcutsAndSizingBorderBox2,
    isUiShortcutsAndSizingAcceptNode2,
  );
  uiShortcutsAndSizingBorderBox.boxWidth = number2;
  uiShortcutsAndSizingBorderBox.borderBoxSizing = matchesBoxSizing;
  uiShortcutsAndSizingBorderBox.candidate = ceil(difference);
  uiShortcutsAndSizingBorderBox.stage = `verify`;
}

function isUiShortcutsAndSizingShrank(
  uiShortcutsAndSizingShrank?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (uiShortcutsAndSizingShrank.natural === null) return false;
  let collectUiShortcutsAndSizingRects2: Dynamic =
    collectUiShortcutsAndSizingRects(
      uiShortcutsAndSizingShrank.el,
      isUiShortcutsAndSizingAcceptNode(uiShortcutsAndSizingShrank.el),
    );
  return resolveUiShortcutsAndSizingHeight2(
    uiShortcutsAndSizingShrank.natural,
    collectUiShortcutsAndSizingRects2,
  )
    ? `shrank`
    : resolveUiShortcutsAndSizingHeight(
        uiShortcutsAndSizingShrank.natural,
        collectUiShortcutsAndSizingRects2,
      );
}

function resolveUiShortcutsAndSizingBoxWidth(
  uiShortcutsAndSizingBoxWidth?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let { boxWidth: uiShortcutsAndSizingBoxWidth2 }: Dynamic =
    uiShortcutsAndSizingBoxWidth;
  if (uiShortcutsAndSizingBoxWidth.stage === `verify`) {
    if (options) {
      resolveUiShortcutsAndSizingSettled(
        uiShortcutsAndSizingBoxWidth,
        uiShortcutsAndSizingBoxWidth.candidate,
      );
      return null;
    }
    uiShortcutsAndSizingBoxWidth.stage = `nudge1`;
    if (
      uiShortcutsAndSizingBoxWidth.candidate + 1 <
      uiShortcutsAndSizingBoxWidth2
    )
      return uiShortcutsAndSizingBoxWidth.candidate + 1;
    uiShortcutsAndSizingBoxWidth.stage = `bisect`;
  } else if (uiShortcutsAndSizingBoxWidth.stage === `nudge1`) {
    if (options) {
      resolveUiShortcutsAndSizingSettled(
        uiShortcutsAndSizingBoxWidth,
        uiShortcutsAndSizingBoxWidth.candidate + 1,
      );
      return null;
    }
    uiShortcutsAndSizingBoxWidth.stage = `nudge2`;
    if (
      uiShortcutsAndSizingBoxWidth.candidate + 2 <
      uiShortcutsAndSizingBoxWidth2
    )
      return uiShortcutsAndSizingBoxWidth.candidate + 2;
    uiShortcutsAndSizingBoxWidth.stage = `bisect`;
  } else if (uiShortcutsAndSizingBoxWidth.stage === `nudge2`) {
    if (options) {
      resolveUiShortcutsAndSizingSettled(
        uiShortcutsAndSizingBoxWidth,
        uiShortcutsAndSizingBoxWidth.candidate + 2,
      );
      return null;
    }
    uiShortcutsAndSizingBoxWidth.stage = `bisect`;
  } else if (uiShortcutsAndSizingBoxWidth.stage === `bisect`) {
    uiShortcutsAndSizingBoxWidth.probes += 1;
    let floor =
      uiShortcutsAndSizingBoxWidth.lo > 0
        ? Math.floor(
            (uiShortcutsAndSizingBoxWidth.lo +
              uiShortcutsAndSizingBoxWidth.hi) /
              2,
          )
        : NaN;
    if (options) {
      uiShortcutsAndSizingBoxWidth.hi = floor;
    } else {
      uiShortcutsAndSizingBoxWidth.lo = floor;
    }
  }
  return uiShortcutsAndSizingBoxWidth.stage === `bisect`
    ? (uiShortcutsAndSizingBoxWidth.lo === 0 &&
        ((uiShortcutsAndSizingBoxWidth.lo =
          uiShortcutsAndSizingBoxWidth.candidate + 2),
        (uiShortcutsAndSizingBoxWidth.hi = Math.ceil(
          uiShortcutsAndSizingBoxWidth2,
        ))),
      uiShortcutsAndSizingBoxWidth.probes >= uiShortcutsAndSizingValue12 ||
      uiShortcutsAndSizingBoxWidth.hi - uiShortcutsAndSizingBoxWidth.lo <= 1
        ? (uiShortcutsAndSizingBoxWidth.hi < uiShortcutsAndSizingBoxWidth2 - 0.5
            ? resolveUiShortcutsAndSizingSettled(
                uiShortcutsAndSizingBoxWidth,
                uiShortcutsAndSizingBoxWidth.hi,
              )
            : resolveUiShortcutsAndSizingSettled(
                uiShortcutsAndSizingBoxWidth,
                null,
              ),
          null)
        : Math.floor(
            (uiShortcutsAndSizingBoxWidth.lo +
              uiShortcutsAndSizingBoxWidth.hi) /
              2,
          ))
    : null;
}

function filterUiShortcutsAndSizingVerify(
  filterUiShortcutsAndSizingVerify2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  for (let filterUiShortcutsAndSizingVerifyResult of filterUiShortcutsAndSizingVerify2 as Dynamic) {
    updateUiShortcutsAndSizingStyle2(filterUiShortcutsAndSizingVerifyResult.el);
    getUiShortcutsAndSizingValue(filterUiShortcutsAndSizingVerifyResult.el);
  }
  for (let filterUiShortcutsAndSizingVerifyResult of filterUiShortcutsAndSizingVerify2 as Dynamic)
    resolveUiShortcutsAndSizingBorderBox(
      filterUiShortcutsAndSizingVerifyResult,
    );
  let filteredFilterUiShortcutsAndSizingVerify: Dynamic =
    filterUiShortcutsAndSizingVerify2.filter(
      (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
        rolldownNImport2.stage === `verify`,
    );
  for (let filterUiShortcutsAndSizingVerifyResult of filteredFilterUiShortcutsAndSizingVerify as Dynamic)
    updateUiShortcutsAndSizingStyle(
      filterUiShortcutsAndSizingVerifyResult.el,
      `${filterUiShortcutsAndSizingVerifyResult.candidate}px`,
    );
  for (
    let index = 0;
    filteredFilterUiShortcutsAndSizingVerify.length > 0 && index < 16;
    index++
  ) {
    let mappedFilteredFilterUiShortcutsAndSizingVerify: Dynamic =
      filteredFilterUiShortcutsAndSizingVerify.map(
        (
          filteredFilterUiShortcutsAndSizingVerify2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => [
          filteredFilterUiShortcutsAndSizingVerify2,
          isUiShortcutsAndSizingShrank(
            filteredFilterUiShortcutsAndSizingVerify2,
          ),
        ],
      );
    let items: Dynamic = [];
    for (let [
      filterUiShortcutsAndSizingVerifyResult,
      filterUiShortcutsAndSizingVerifyResult2,
    ] of mappedFilteredFilterUiShortcutsAndSizingVerify as Dynamic) {
      if (filterUiShortcutsAndSizingVerifyResult2 === `shrank`) {
        resolveUiShortcutsAndSizingSettled(
          filterUiShortcutsAndSizingVerifyResult,
          null,
        );
        continue;
      }
      let uiShortcutsAndSizingBoxWidth: Dynamic =
        resolveUiShortcutsAndSizingBoxWidth(
          filterUiShortcutsAndSizingVerifyResult,
          filterUiShortcutsAndSizingVerifyResult2,
        );
      if (uiShortcutsAndSizingBoxWidth !== null) {
        items.push([
          filterUiShortcutsAndSizingVerifyResult,
          uiShortcutsAndSizingBoxWidth,
        ]);
      }
    }
    for (let [
      filterUiShortcutsAndSizingVerifyResult,
      filterUiShortcutsAndSizingVerifyResult2,
    ] of items as Dynamic)
      updateUiShortcutsAndSizingStyle(
        filterUiShortcutsAndSizingVerifyResult.el,
        `${filterUiShortcutsAndSizingVerifyResult2}px`,
      );
    filteredFilterUiShortcutsAndSizingVerify = items.map(
      ([item]: Dynamic, ..._extraArguments: unknown[]): Dynamic => item,
    );
  }
  for (let filterUiShortcutsAndSizingVerifyResult of filteredFilterUiShortcutsAndSizingVerify as Dynamic)
    if (filterUiShortcutsAndSizingVerifyResult.stage !== `settled`) {
      resolveUiShortcutsAndSizingSettled(
        filterUiShortcutsAndSizingVerifyResult,
        null,
      );
    }
}

function resolveUiShortcutsAndSizingValue2(
  uiShortcutsAndSizingValue2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let resolveUiShortcutsAndSizingValue2Result: Dynamic = null;
  filterUiShortcutsAndSizingVerify([
    resolveUiShortcutsAndSizingDone(
      uiShortcutsAndSizingValue2,
      (
        uiShortcutsAndSizingValue22?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        resolveUiShortcutsAndSizingValue2Result = uiShortcutsAndSizingValue22;
      },
    ),
  ]);
  return resolveUiShortcutsAndSizingValue2Result;
}

var uiShortcutsAndSizingWeakMap3: Dynamic;

function updateUiShortcutsAndSizingQueue(
  updateUiShortcutsAndSizingQueue2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let uiShortcutsAndSizingWeakMap3Entry: Dynamic =
    uiShortcutsAndSizingWeakMap3.get(updateUiShortcutsAndSizingQueue2);
  if (!uiShortcutsAndSizingWeakMap3Entry) {
    uiShortcutsAndSizingWeakMap3Entry = {
      queue: new (Map as Dynamic)(),
      microtaskQueued: false,
      frameQueued: 0,
    };
    uiShortcutsAndSizingWeakMap3.set(
      updateUiShortcutsAndSizingQueue2,
      uiShortcutsAndSizingWeakMap3Entry,
    );
  }
  return uiShortcutsAndSizingWeakMap3Entry;
}

function clearUiShortcutsAndSizingSize(
  clearUiShortcutsAndSizingSize2?: Dynamic,
  options?: Dynamic,
  items?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (items.length > 0) {
    filterUiShortcutsAndSizingVerify(items);
  }
  if (!(options.queue.size > 0)) {
    options.frameQueued &&=
      (clearUiShortcutsAndSizingSize2.cancelAnimationFrame(options.frameQueued),
      0);
    if (!options.microtaskQueued) {
      uiShortcutsAndSizingWeakMap3.delete(clearUiShortcutsAndSizingSize2);
    }
  }
}

function getUiShortcutsAndSizingMicrotaskQueued(
  uiShortcutsAndSizingMicrotaskQueued?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let uiShortcutsAndSizingWeakMap3Entry: Dynamic =
    uiShortcutsAndSizingWeakMap3.get(uiShortcutsAndSizingMicrotaskQueued);
  if (!uiShortcutsAndSizingWeakMap3Entry) return;
  uiShortcutsAndSizingWeakMap3Entry.microtaskQueued = false;
  uiShortcutsAndSizingWeakMap3Entry.frameQueued &&=
    (uiShortcutsAndSizingMicrotaskQueued.cancelAnimationFrame(
      uiShortcutsAndSizingWeakMap3Entry.frameQueued,
    ),
    0);
  let items: Dynamic = [...uiShortcutsAndSizingWeakMap3Entry.queue.values()];
  uiShortcutsAndSizingWeakMap3Entry.queue.clear();
  clearUiShortcutsAndSizingSize(
    uiShortcutsAndSizingMicrotaskQueued,
    uiShortcutsAndSizingWeakMap3Entry,
    items,
  );
}

function clearUiShortcutsAndSizingQueue(
  clearUiShortcutsAndSizingQueue2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let uiShortcutsAndSizingWeakMap3Entry: Dynamic =
    uiShortcutsAndSizingWeakMap3.get(clearUiShortcutsAndSizingQueue2);
  if (!uiShortcutsAndSizingWeakMap3Entry) return;
  let items: Dynamic = [];
  for (let [
    clearUiShortcutsAndSizingQueueResult,
    clearUiShortcutsAndSizingQueueResult2,
  ] of uiShortcutsAndSizingWeakMap3Entry.queue as Dynamic)
    if (clearUiShortcutsAndSizingQueueResult2.resizeDue) {
      uiShortcutsAndSizingWeakMap3Entry.queue.delete(
        clearUiShortcutsAndSizingQueueResult,
      );
      items.push(clearUiShortcutsAndSizingQueueResult2);
    }
  clearUiShortcutsAndSizingSize(
    clearUiShortcutsAndSizingQueue2,
    uiShortcutsAndSizingWeakMap3Entry,
    items,
  );
}

function updateUiShortcutsAndSizingMicrotask(
  element?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let defaultView: Dynamic = element.ownerDocument.defaultView;
  if (!defaultView) {
    options(resolveUiShortcutsAndSizingValue2(element));
    return;
  }
  let updateUiShortcutsAndSizingQueue2: Dynamic =
    updateUiShortcutsAndSizingQueue(defaultView);
  let queueEntry: Dynamic = updateUiShortcutsAndSizingQueue2.queue.get(element);
  if (queueEntry) {
    queueEntry.done = options;
  } else {
    queueEntry = resolveUiShortcutsAndSizingDone(element, options);
    updateUiShortcutsAndSizingQueue2.queue.set(element, queueEntry);
  }
  if (context === `microtask`) {
    if (!updateUiShortcutsAndSizingQueue2.microtaskQueued) {
      updateUiShortcutsAndSizingQueue2.microtaskQueued = true;
      queueMicrotask((..._extraArguments: unknown[]): undefined => {
        getUiShortcutsAndSizingMicrotaskQueued(defaultView);
      });
    }
  } else {
    if (context === `resize`) {
      queueEntry.resizeDue = true;
    } else {
      if (
        !updateUiShortcutsAndSizingQueue2.frameQueued &&
        !updateUiShortcutsAndSizingQueue2.microtaskQueued
      ) {
        updateUiShortcutsAndSizingQueue2.frameQueued =
          defaultView.requestAnimationFrame(
            (..._extraArguments: unknown[]): undefined => {
              getUiShortcutsAndSizingMicrotaskQueued(defaultView);
            },
          );
      }
    }
  }
}

function clearUiShortcutsAndSizingOwnerDocument(
  element?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let defaultView: Dynamic = element.ownerDocument.defaultView;
  if (!defaultView) return;
  let uiShortcutsAndSizingWeakMap3Entry: Dynamic =
    uiShortcutsAndSizingWeakMap3.get(defaultView);
  if (uiShortcutsAndSizingWeakMap3Entry) {
    uiShortcutsAndSizingWeakMap3Entry.queue.delete(element);
    clearUiShortcutsAndSizingSize(
      defaultView,
      uiShortcutsAndSizingWeakMap3Entry,
      [],
    );
  }
}

function shouldRecomputeShrinkWrap(
  shouldRecomputeShrinkWrap2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (shouldRecomputeShrinkWrap2.self) {
    let matchesApplied =
      shouldRecomputeShrinkWrap2.applied !== null &&
      Math.abs(
        shouldRecomputeShrinkWrap2.inline - shouldRecomputeShrinkWrap2.applied,
      ) <= 1;
    return (
      Math.abs(
        shouldRecomputeShrinkWrap2.block - shouldRecomputeShrinkWrap2.prevBlock,
      ) > 1 ||
      (!matchesApplied &&
        Math.abs(
          shouldRecomputeShrinkWrap2.inline -
            shouldRecomputeShrinkWrap2.prevInline,
        ) > 1)
    );
  }
  return (
    Math.abs(
      shouldRecomputeShrinkWrap2.inline - shouldRecomputeShrinkWrap2.prevInline,
    ) > 1
  );
}

var uiShortcutsAndSizingWeakMap4: Dynamic;

function updateUiShortcutsAndSizingObserver(
  updateUiShortcutsAndSizingObserver2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let uiShortcutsAndSizingWeakMap4Entry: Dynamic =
    uiShortcutsAndSizingWeakMap4.get(updateUiShortcutsAndSizingObserver2);
  if (!uiShortcutsAndSizingWeakMap4Entry) {
    let handlers: Dynamic = new (Map as Dynamic)();
    uiShortcutsAndSizingWeakMap4Entry = {
      observer:
        new (updateUiShortcutsAndSizingObserver2.ResizeObserver as Dynamic)(
          (
            updateUiShortcutsAndSizingObserver3?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            for (let event of updateUiShortcutsAndSizingObserver3 as Dynamic)
              for (let updateUiShortcutsAndSizingObserverResult of (handlers.get(
                event.target,
              ) ?? []) as Dynamic)
                updateUiShortcutsAndSizingObserverResult(event);
            clearUiShortcutsAndSizingQueue(updateUiShortcutsAndSizingObserver2);
          },
        ),
      handlers: handlers,
      paused: new (Set as Dynamic)(),
      resumeQueued: 0,
    };
    uiShortcutsAndSizingWeakMap4.set(
      updateUiShortcutsAndSizingObserver2,
      uiShortcutsAndSizingWeakMap4Entry,
    );
  }
  let handlerEntry: Dynamic =
    uiShortcutsAndSizingWeakMap4Entry.handlers.get(options);
  if (!handlerEntry) {
    try {
      uiShortcutsAndSizingWeakMap4Entry.observer.observe(options);
    } catch (updateUiShortcutsAndSizingObserverResult: Dynamic) {
      throw (
        uiShortcutsAndSizingWeakMap4Entry.handlers.size === 0 &&
          uiShortcutsAndSizingWeakMap4.delete(
            updateUiShortcutsAndSizingObserver2,
          ),
        updateUiShortcutsAndSizingObserverResult
      );
    }
    handlerEntry = new (Set as Dynamic)();
    uiShortcutsAndSizingWeakMap4Entry.handlers.set(options, handlerEntry);
  }
  handlerEntry.add(context);
}

function clearUiShortcutsAndSizingDelete(
  clearUiShortcutsAndSizingDelete2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let uiShortcutsAndSizingWeakMap4Entry: Dynamic =
    uiShortcutsAndSizingWeakMap4.get(clearUiShortcutsAndSizingDelete2);
  let handlerEntry: Dynamic =
    uiShortcutsAndSizingWeakMap4Entry?.handlers.get(options);
  if (!(!uiShortcutsAndSizingWeakMap4Entry || !handlerEntry)) {
    handlerEntry.delete(context);
    if (handlerEntry.size === 0) {
      uiShortcutsAndSizingWeakMap4Entry.handlers.delete(options);
      uiShortcutsAndSizingWeakMap4Entry.paused.delete(options);
      uiShortcutsAndSizingWeakMap4Entry.observer.unobserve(options);
    }
    if (uiShortcutsAndSizingWeakMap4Entry.handlers.size === 0) {
      uiShortcutsAndSizingWeakMap4Entry.observer.disconnect();
      if (uiShortcutsAndSizingWeakMap4Entry.resumeQueued) {
        clearUiShortcutsAndSizingDelete2.cancelAnimationFrame(
          uiShortcutsAndSizingWeakMap4Entry.resumeQueued,
        );
      }
      uiShortcutsAndSizingWeakMap4.delete(clearUiShortcutsAndSizingDelete2);
    }
  }
}

function getUiShortcutsAndSizingHandlers(
  uiShortcutsAndSizingHandlers?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let uiShortcutsAndSizingWeakMap4Entry: Dynamic =
    uiShortcutsAndSizingWeakMap4.get(uiShortcutsAndSizingHandlers);
  if (
    !(
      !uiShortcutsAndSizingWeakMap4Entry ||
      !uiShortcutsAndSizingWeakMap4Entry.handlers.has(options) ||
      uiShortcutsAndSizingWeakMap4Entry.paused.has(options)
    )
  ) {
    uiShortcutsAndSizingWeakMap4Entry.observer.unobserve(options);
    uiShortcutsAndSizingWeakMap4Entry.paused.add(options);
    uiShortcutsAndSizingWeakMap4Entry.resumeQueued ||=
      uiShortcutsAndSizingHandlers.requestAnimationFrame(
        (..._extraArguments: unknown[]): undefined => {
          uiShortcutsAndSizingWeakMap4Entry.resumeQueued = 0;
          for (let getUiShortcutsAndSizingHandlersResult of uiShortcutsAndSizingWeakMap4Entry.paused as Dynamic)
            if (
              uiShortcutsAndSizingWeakMap4Entry.handlers.has(
                getUiShortcutsAndSizingHandlersResult,
              )
            ) {
              uiShortcutsAndSizingWeakMap4Entry.observer.observe(
                getUiShortcutsAndSizingHandlersResult,
              );
            }
          uiShortcutsAndSizingWeakMap4Entry.paused.clear();
        },
      );
  }
}

var uiShortcutsAndSizingWeakMap5: Dynamic;

function updateUiShortcutsAndSizingRefits(
  updateUiShortcutsAndSizingRefits2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof updateUiShortcutsAndSizingRefits2?.addEventListener != `function`)
    return (..._extraArguments: unknown[]): undefined => undefined;
  let uiShortcutsAndSizingWeakMap5Entry: Dynamic =
    uiShortcutsAndSizingWeakMap5.get(updateUiShortcutsAndSizingRefits2);
  if (!uiShortcutsAndSizingWeakMap5Entry) {
    let refits: Dynamic = new (Set as Dynamic)();
    let listener = (..._extraArguments: unknown[]): undefined => {
      for (let updateUiShortcutsAndSizingRefitsResult of refits as Dynamic)
        updateUiShortcutsAndSizingRefitsResult();
    };
    updateUiShortcutsAndSizingRefits2.addEventListener(`loadingdone`, listener);
    uiShortcutsAndSizingWeakMap5Entry = {
      refits: refits,
      listener: listener,
    };
    uiShortcutsAndSizingWeakMap5.set(
      updateUiShortcutsAndSizingRefits2,
      uiShortcutsAndSizingWeakMap5Entry,
    );
  }
  let uiShortcutsAndSizingWeakMap5Entry2: Dynamic =
    uiShortcutsAndSizingWeakMap5Entry;
  uiShortcutsAndSizingWeakMap5Entry2.refits.add(options);
  return (..._extraArguments: unknown[]): undefined => {
    uiShortcutsAndSizingWeakMap5Entry2.refits.delete(options);
    if (
      uiShortcutsAndSizingWeakMap5Entry2.refits.size === 0 &&
      uiShortcutsAndSizingWeakMap5.get(updateUiShortcutsAndSizingRefits2) ===
        uiShortcutsAndSizingWeakMap5Entry2
    ) {
      uiShortcutsAndSizingWeakMap5.delete(updateUiShortcutsAndSizingRefits2);
      updateUiShortcutsAndSizingRefits2.removeEventListener?.(
        `loadingdone`,
        uiShortcutsAndSizingWeakMap5Entry2.listener,
      );
    }
  };
}

function updateUiShortcutsAndSizingImmediate(
  element?: Dynamic,
  { immediate: options = false }: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let enabled = false;
  let applied: Dynamic = null;
  let defaultView: Dynamic = element.ownerDocument.defaultView;
  let lookup: Dynamic = new (Map as Dynamic)();
  let items: Dynamic = [];
  let updateUiShortcutsAndSizingImmediateHandler = (
    updateUiShortcutsAndSizingImmediate2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let updateUiShortcutsAndSizingImmediate3: Dynamic =
      updateUiShortcutsAndSizingImmediate2;
    lookup.set(updateUiShortcutsAndSizingImmediate2, {
      inline: updateUiShortcutsAndSizingImmediate3.offsetWidth ?? 0,
      block: updateUiShortcutsAndSizingImmediate3.offsetHeight ?? 0,
    });
  };
  let defaultView2: Dynamic = defaultView?.ResizeObserver ? defaultView : null;
  let count = 0;
  let slice = (
    updateUiShortcutsAndSizingImmediate2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (!enabled) {
      applied = updateUiShortcutsAndSizingImmediate2;
      for (let updateUiShortcutsAndSizingImmediateResult2 of items as Dynamic)
        updateUiShortcutsAndSizingImmediateHandler(
          updateUiShortcutsAndSizingImmediateResult2,
        );
      if (defaultView2 && count > 0)
        for (let updateUiShortcutsAndSizingImmediateResult2 of items.slice(
          count,
        ) as Dynamic)
          getUiShortcutsAndSizingHandlers(
            defaultView2,
            updateUiShortcutsAndSizingImmediateResult2,
          );
      count = 0;
    }
  };
  let updateUiShortcutsAndSizingMicrotask2 = (
    updateUiShortcutsAndSizingImmediate2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (!enabled) {
      updateUiShortcutsAndSizingMicrotask(
        element,
        slice,
        updateUiShortcutsAndSizingImmediate2,
      );
    }
  };
  let indexOf = (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let borderBoxSizeItem: Dynamic = event.borderBoxSize?.[0];
    let inline: Dynamic = borderBoxSizeItem
      ? borderBoxSizeItem.inlineSize
      : event.contentRect.width;
    let block: Dynamic = borderBoxSizeItem
      ? borderBoxSizeItem.blockSize
      : event.contentRect.height;
    let lookupEntry: Dynamic = lookup.get(event.target) ?? {
      inline: inline,
      block: block,
    };
    lookup.set(event.target, {
      inline: inline,
      block: block,
    });
    let self = event.target === element;
    if (
      shouldRecomputeShrinkWrap({
        self: self,
        inline: inline,
        block: block,
        prevInline: lookupEntry.inline,
        prevBlock: lookupEntry.block,
        applied: applied,
      })
    ) {
      if (!self) {
        count = Math.max(count, items.indexOf(event.target));
      }
      updateUiShortcutsAndSizingMicrotask2(self ? `frame` : `resize`);
    }
  };
  let updateUiShortcutsAndSizingImmediateHandler2 = (
    updateUiShortcutsAndSizingImmediate2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (defaultView2) {
      updateUiShortcutsAndSizingObserver(
        defaultView2,
        updateUiShortcutsAndSizingImmediate2,
        indexOf,
      );
    }
    items.push(updateUiShortcutsAndSizingImmediate2);
    if (options) {
      updateUiShortcutsAndSizingImmediateHandler(
        updateUiShortcutsAndSizingImmediate2,
      );
    }
  };
  let updateUiShortcutsAndSizingImmediateResult: Dynamic = null;
  let updateUiShortcutsAndSizingImmediateHandler3 = (
    ..._extraArguments: unknown[]
  ): undefined => undefined;
  let disconnect = (..._extraArguments: unknown[]): undefined => {
    enabled = true;
    clearUiShortcutsAndSizingOwnerDocument(element);
    if (defaultView2)
      for (let updateUiShortcutsAndSizingImmediateResult2 of items as Dynamic)
        clearUiShortcutsAndSizingDelete(
          defaultView2,
          updateUiShortcutsAndSizingImmediateResult2,
          indexOf,
        );
    updateUiShortcutsAndSizingImmediateResult?.disconnect();
    updateUiShortcutsAndSizingImmediateHandler3();
    getUiShortcutsAndSizingValue(element);
  };
  try {
    if (options) {
      applied = resolveUiShortcutsAndSizingValue2(element);
    } else {
      updateUiShortcutsAndSizingMicrotask2(`microtask`);
    }
    updateUiShortcutsAndSizingImmediateHandler2(element);
    for (
      let parentElement: Dynamic = element.parentElement, index = 0;
      parentElement && index < uiShortcutsAndSizingValue16;
      parentElement = parentElement.parentElement, index++
    )
      updateUiShortcutsAndSizingImmediateHandler2(parentElement);
    if (defaultView?.MutationObserver) {
      let mutationObserver: Dynamic =
        new (defaultView.MutationObserver as Dynamic)(
          (..._extraArguments: unknown[]): undefined => {
            updateUiShortcutsAndSizingMicrotask2(`microtask`);
          },
        );
      mutationObserver.observe(element, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true,
        attributeFilter: [UiShortcutsAndSizingDataShrinkwrap],
      });
      updateUiShortcutsAndSizingImmediateResult = mutationObserver;
    }
    let fonts: Dynamic = element.ownerDocument.fonts;
    let updateUiShortcutsAndSizingMicrotask3: Dynamic = (
      ..._extraArguments: unknown[]
    ) => updateUiShortcutsAndSizingMicrotask2(`microtask`);
    updateUiShortcutsAndSizingImmediateHandler3 =
      updateUiShortcutsAndSizingRefits(
        fonts,
        updateUiShortcutsAndSizingMicrotask3,
      );
    if (fonts && fonts.status !== `loaded`) {
      fonts.ready.then(updateUiShortcutsAndSizingMicrotask3);
    }
  } catch (updateUiShortcutsAndSizingImmediateResult2: Dynamic) {
    try {
      disconnect();
    } catch {}
    throw updateUiShortcutsAndSizingImmediateResult2;
  }
  return disconnect;
}

function useUiShortcutsAndSizingEnabled(
  {
    enabled: uiShortcutsAndSizingEnabled = true,
    immediate = false,
  }: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let elementRef: Dynamic = (0, React.useRef)(null);
  return (0, React.useCallback)(
    (
      uiShortcutsAndSizingEnabled2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let element: Dynamic = elementRef.current;
      elementRef.current = null;
      if (element) {
        resolveUiLinksAndFoundationValue9(element);
      }
      if (uiShortcutsAndSizingEnabled2) {
        if (!uiShortcutsAndSizingEnabled) {
          getUiShortcutsAndSizingValue(uiShortcutsAndSizingEnabled2);
          return;
        }
        resolveUiLinksAndFoundationValue9(
          (..._extraArguments: unknown[]): undefined => {
            elementRef.current = updateUiShortcutsAndSizingImmediate(
              uiShortcutsAndSizingEnabled2,
              {
                immediate: immediate,
              },
            );
          },
        );
      }
    },
    [uiShortcutsAndSizingEnabled, immediate],
  );
}

var ShrinkWrap: Dynamic;

var UiShortcutsAndSizingCreateContext: Dynamic;

function useTooltipTrigger(..._extraArguments: unknown[]): Dynamic {
  return (0, React.useContext)(UiShortcutsAndSizingCreateContext);
}

var UiShortcutsAndSizingCreateContext2: Dynamic;

var uiShortcutsAndSizingValue5: number;

function resolveUiShortcutsAndSizingDocumentElement(
  uiShortcutsAndSizingDocumentElement?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let documentElement: Dynamic =
    uiShortcutsAndSizingDocumentElement.documentElement;
  let propertyValue: Dynamic =
    uiShortcutsAndSizingDocumentElement.defaultView
      ?.getComputedStyle(documentElement)
      .getPropertyValue(`--desktop-titlebar-inset`) ||
    documentElement.style.getPropertyValue(`--desktop-titlebar-inset`);
  let number2 = Number.parseFloat(propertyValue);
  return Number.isFinite(number2) && number2 > 0 ? number2 : 0;
}

var uiShortcutsAndSizingWeakMap6: Dynamic;

function updateUiShortcutsAndSizingSubscribe(
  updateUiShortcutsAndSizingSubscribe2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let uiShortcutsAndSizingWeakMap6Entry: Dynamic =
    uiShortcutsAndSizingWeakMap6.get(updateUiShortcutsAndSizingSubscribe2);
  if (uiShortcutsAndSizingWeakMap6Entry === undefined) {
    let uniqueItems: Dynamic = new (Set as Dynamic)();
    let updateUiShortcutsAndSizingSubscribeResult: Dynamic = null;
    let enabled = false;
    let updateUiShortcutsAndSizingSubscribeResult2: Dynamic;
    let enabled2 = false;
    let resolveUiShortcutsAndSizingDocumentElement2: Dynamic = (
      ..._extraArguments: unknown[]
    ): Dynamic => (
      (enabled2 = false),
      (updateUiShortcutsAndSizingSubscribeResult2 =
        resolveUiShortcutsAndSizingDocumentElement(
          updateUiShortcutsAndSizingSubscribe2,
        )),
      updateUiShortcutsAndSizingSubscribeResult2
    );
    uiShortcutsAndSizingWeakMap6Entry = {
      subscribe(
        updateUiShortcutsAndSizingSubscribe3?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic {
        uniqueItems.add(updateUiShortcutsAndSizingSubscribe3);
        if (updateUiShortcutsAndSizingSubscribeResult === null && !enabled) {
          let safeMutationObserver: Dynamic = createSafeMutationObserver(
            MutationObserver,
            (..._extraArguments: unknown[]): undefined => {
              if (uniqueItems.size === 0) {
                enabled2 = true;
                return;
              }
              let updateUiShortcutsAndSizingSubscribeResult3: Dynamic =
                updateUiShortcutsAndSizingSubscribeResult2;
              if (
                resolveUiShortcutsAndSizingDocumentElement2() !==
                updateUiShortcutsAndSizingSubscribeResult3
              )
                for (let updateUiShortcutsAndSizingSubscribeResult4 of uniqueItems as Dynamic)
                  updateUiShortcutsAndSizingSubscribeResult4();
            },
          );
          if (
            safeMutationObserver.observe(
              updateUiShortcutsAndSizingSubscribe2.documentElement,
              {
                attributes: true,
                attributeFilter: [`style`],
              },
            )
          ) {
            resolveUiShortcutsAndSizingDocumentElement2();
            updateUiShortcutsAndSizingSubscribeResult = safeMutationObserver;
          } else {
            enabled = true;
          }
        }
        return (..._extraArguments: unknown[]): undefined => {
          uniqueItems.delete(updateUiShortcutsAndSizingSubscribe3);
        };
      },
      getSnapshot: (..._extraArguments: unknown[]): Dynamic => {
        if (updateUiShortcutsAndSizingSubscribeResult === null)
          return resolveUiShortcutsAndSizingDocumentElement(
            updateUiShortcutsAndSizingSubscribe2,
          );
        let matchesUniqueItemsCount =
          uniqueItems.size === 0 &&
          updateUiShortcutsAndSizingSubscribeResult.takeRecords().length > 0;
        if (enabled2 || matchesUniqueItemsCount) {
          resolveUiShortcutsAndSizingDocumentElement2();
        }
        return updateUiShortcutsAndSizingSubscribeResult2;
      },
    };
    uiShortcutsAndSizingWeakMap6.set(
      updateUiShortcutsAndSizingSubscribe2,
      uiShortcutsAndSizingWeakMap6Entry,
    );
  }
  return uiShortcutsAndSizingWeakMap6Entry;
}

var resolveUiShortcutsAndSizingValue3: (..._extraArguments: unknown[]) => number;

var resolveUiShortcutsAndSizingValue4: Dynamic;

function resolveUiShortcutsAndSizingOwnerDocument(
  ref?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  let resolveUiShortcutsAndSizingOwnerDocumentHandler: Dynamic = (
    uiShortcutsAndSizingOwnerDocument?: Dynamic,
    ..._extraArguments: unknown[]
  ): boolean =>
    typeof uiShortcutsAndSizingOwnerDocument == `object` &&
    !!uiShortcutsAndSizingOwnerDocument &&
    (uiShortcutsAndSizingOwnerDocument.nodeType === 1 ||
      uiShortcutsAndSizingOwnerDocument.nodeType === 11) &&
    `ownerDocument` in uiShortcutsAndSizingOwnerDocument;
  if (resolveUiShortcutsAndSizingOwnerDocumentHandler(ref)) return ref;
  if (typeof ref == `object` && ref && `current` in ref) {
    let ref2: Dynamic = ref.current;
    return resolveUiShortcutsAndSizingOwnerDocumentHandler(ref2) ? ref2 : null;
  }
  return null;
}

function useUiShortcutsAndSizingUseSyncExternalStore2(
  uiShortcutsAndSizingUseSyncExternalStore2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let uiProviderAndLayersUseContext8: Dynamic =
    resolveUiProviderAndLayersUseContext8();
  let resolveUiShortcutsAndSizingOwnerDocument2: Dynamic = (0,
  React.useCallback)(
    (..._extraArguments: unknown[]): Dynamic =>
      (
        resolveUiShortcutsAndSizingOwnerDocument(
          uiShortcutsAndSizingUseSyncExternalStore2,
        ) ?? uiProviderAndLayersUseContext8
      )?.ownerDocument ?? (typeof document === "undefined" ? null : document),
    [uiShortcutsAndSizingUseSyncExternalStore2, uiProviderAndLayersUseContext8],
  );
  let [
    resolveUiShortcutsAndSizingOwnerDocumentState,
    setResolveUiShortcutsAndSizingOwnerDocumentState,
  ]: Dynamic = (0, React.useState)(resolveUiShortcutsAndSizingOwnerDocument2);
  UiDesignSystemUseLayoutEffect((..._extraArguments: unknown[]): undefined => {
    setResolveUiShortcutsAndSizingOwnerDocumentState(
      resolveUiShortcutsAndSizingOwnerDocument2(),
    );
  });
  let updateUiShortcutsAndSizingSubscribe2: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      resolveUiShortcutsAndSizingOwnerDocumentState === null
        ? null
        : updateUiShortcutsAndSizingSubscribe(
            resolveUiShortcutsAndSizingOwnerDocumentState,
          ),
    [resolveUiShortcutsAndSizingOwnerDocumentState],
  );
  return (0, React.useSyncExternalStore)(
    updateUiShortcutsAndSizingSubscribe2 === null
      ? resolveUiShortcutsAndSizingValue4
      : updateUiShortcutsAndSizingSubscribe2.subscribe,
    updateUiShortcutsAndSizingSubscribe2 === null
      ? resolveUiShortcutsAndSizingValue3
      : updateUiShortcutsAndSizingSubscribe2.getSnapshot,
    resolveUiShortcutsAndSizingValue3,
  );
}

function resolveUiShortcutsAndSizingTop(
  uiShortcutsAndSizing?: TooltipPositionerProps["collisionPadding"],
  options?: TooltipPortalProps["container"],
  ..._extraArguments: unknown[]
): TooltipPositionerProps["collisionPadding"] {
  let useUiShortcutsAndSizingUseSyncExternalStore22: number =
    useUiShortcutsAndSizingUseSyncExternalStore2(options);
  return (0, React.useMemo)(
    (..._extraArguments: unknown[]) => {
      if (uiShortcutsAndSizing !== undefined) return uiShortcutsAndSizing;
      if (!(useUiShortcutsAndSizingUseSyncExternalStore22 <= 0))
        return {
          top:
            uiShortcutsAndSizingValue5 +
            useUiShortcutsAndSizingUseSyncExternalStore22,
          right: uiShortcutsAndSizingValue5,
          bottom: uiShortcutsAndSizingValue5,
          left: uiShortcutsAndSizingValue5,
        };
    },
    [uiShortcutsAndSizing, useUiShortcutsAndSizingUseSyncExternalStore22],
  );
}

var UiShortcutsAndSizingCreateContext3: Dynamic;

var uiShortcutsAndSizingWeakMap7: Dynamic;

function isUiShortcutsAndSizingOwnerDocument(
  element?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let ownerDocument2: Dynamic = element.ownerDocument;
  let uiShortcutsAndSizingWeakMap7Entry: Dynamic =
    uiShortcutsAndSizingWeakMap7.get(ownerDocument2);
  if (uiShortcutsAndSizingWeakMap7Entry === undefined) {
    uiShortcutsAndSizingWeakMap7Entry = ownerDocument2.createRange();
    uiShortcutsAndSizingWeakMap7.set(
      ownerDocument2,
      uiShortcutsAndSizingWeakMap7Entry,
    );
  }
  uiShortcutsAndSizingWeakMap7Entry.selectNodeContents(element);
  let uiShortcutsAndSizingWeakMap7EntryBounds: Dynamic =
    uiShortcutsAndSizingWeakMap7Entry.getBoundingClientRect?.();
  uiShortcutsAndSizingWeakMap7Entry.setStart(ownerDocument2, 0);
  uiShortcutsAndSizingWeakMap7Entry.collapse(true);
  if (
    uiShortcutsAndSizingWeakMap7EntryBounds === undefined ||
    uiShortcutsAndSizingWeakMap7EntryBounds.width === 0
  )
    return false;
  let elementBounds: Dynamic = element.getBoundingClientRect();
  return (
    uiShortcutsAndSizingWeakMap7EntryBounds.right - elementBounds.right > 0.1 ||
    elementBounds.left - uiShortcutsAndSizingWeakMap7EntryBounds.left > 0.1
  );
}

function useUiShortcutsAndSizingStart(..._extraArguments: unknown[]): Dynamic {
  let elementRef: Dynamic = (0, React.useRef)(undefined);
  let cancel: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): undefined => {
      window.clearTimeout(elementRef.current);
      elementRef.current = undefined;
    },
    [],
  );
  let start: Dynamic = (0, React.useCallback)(
    (
      uiShortcutsAndSizingStart?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      cancel();
      elementRef.current = window.setTimeout(
        options,
        uiShortcutsAndSizingStart,
      );
    },
    [cancel],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => cancel,
    [cancel],
  );
  return (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => ({
      start: start,
      cancel: cancel,
    }),
    [start, cancel],
  );
}

var UiShortcutsAndSizingStyles5: string;

var UiShortcutsAndSizingStyles6: string;

var UiShortcutsAndSizingStyles7: string;

var UiShortcutsAndSizingStyles8: string;

var UiShortcutsAndSizingCdsBtnSquish: string;

var UiShortcutsAndSizingStyles9: string;

var UiShortcutsAndSizingGroupAriaPressedBtnBgAccentGroupHoverBtnGroupAriaPressedBtnBgAccent: string;

var UiShortcutsAndSizingStyles10: string;

var UiShortcutsAndSizingStyles11: string;

function resolveUiShortcutsAndSizingJoined(
  uiShortcutsAndSizingJoined?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return `${UiShortcutsAndSizingStyles5} ${!uiShortcutsAndSizingJoined.joined && uiShortcutsAndSizingJoined.solid ? UiShortcutsAndSizingStyles11 : `inset-0`} ${uiShortcutsAndSizingJoined.joined ? `` : UiShortcutsAndSizingCdsBtnSquish}`;
}

var UiShortcutsAndSizingState: string;

function resolveUiShortcutsAndSizingTabIndex(
  uiShortcutsAndSizingTabIndex?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let isUiShortcutsAndSizingValue2 = isUiShortcutsAndSizingValue(
    uiShortcutsAndSizingTabIndex,
  );
  return {
    tabIndex: isUiShortcutsAndSizingValue2 ? 0 : -1,
    "aria-describedby": isUiShortcutsAndSizingValue2 ? options : undefined,
    "data-cds-disabled-reason-wrapper": ``,
    className: resolveUiDesignSystemValue2(
      `inline-flex`,
      UiShortcutsAndSizingState,
      context,
    ),
  };
}

function isUiShortcutsAndSizingValue(
  uiShortcutsAndSizingValue?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return !!uiShortcutsAndSizingValue;
}

var UiShortcutsAndSizingDataCdsDisabledReason: string;

var UiShortcutsAndSizingStyles12: string;

var UiShortcutsAndSizingState2: string;

var UiShortcutsAndSizingStyles13: string;

var UiShortcutsAndSizingStyles14: string;

var UiShortcutsAndSizingState3: string;

var UiShortcutsAndSizingPx2Py15: string;

var UiShortcutsAndSizingMinW0BreakWords: string;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeUiShortcutsAndSizingStep1(): void {
  (UiShortcutsAndSizingStyles = `inline-flex shrink-0 items-center justify-center h-[calc(1em+6px)] rounded-[var(--cds-keycap-radius,4px)] [color:var(--cds-shortcut-cap-ink)] bg-[color:var(--cds-shortcut-cap-fill)] border border-[color:var(--cds-shortcut-cap-line)] font-inherit [font-variation-settings:inherit] [line-height:1]`);
  (UiShortcutsAndSizingStyles2 = `w-[calc(1em+6px)] px-0`);
  (UiShortcutsAndSizingStyles3 = `min-w-[calc(1em+6px)] px-[3px]`);
  (UiShortcutsAndSizingStyles4 = `font-inherit [font-variation-settings:inherit] [color:var(--cds-shortcut-cap-ink)]`);
  (UiShortcutsAndSizingKeycap = {
    keycap: `inline-flex shrink-0 items-center gap-[2px] text-caption`,
    text: `inline-flex shrink-0 items-baseline gap-[0.3em] text-caption`,
  });
  (UiShortcutsAndSizingThen = `then`);
  (UiShortcutsAndSizingMessage = `+`);
  (uiShortcutsAndSizingPattern = /mac|iphone|ipad|ipod/i);
  (resolveUiShortcutsAndSizingValue = (..._extraArguments: unknown[]): Dynamic =>
    (..._extraArguments: unknown[]): undefined =>
      undefined);
  (uiShortcutsAndSizingCmdCommandMetaCtrlValues = [
    `cmd`,
    `command`,
    `meta`,
    `ctrl`,
    `control`,
    `alt`,
    `option`,
    `shift`,
  ]);
  (resolveUiShortcutsAndSizingIncludes = (
    uiShortcutsAndSizingIncludes?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    uiShortcutsAndSizingCmdCommandMetaCtrlValues.includes(
      uiShortcutsAndSizingIncludes,
    ));
  (uiShortcutsAndSizingCtrlControlAltOptionValues = [
    `ctrl`,
    `control`,
    `alt`,
    `option`,
    `shift`,
    `cmd`,
    `command`,
    `meta`,
  ]);
  (UiShortcutsAndSizingCtrl = {
    ctrl: `⌃`,
    control: `⌃`,
    alt: `⌥`,
    option: `⌥`,
    shift: `⇧`,
    cmd: `⌘`,
    command: `⌘`,
    meta: `⌘`,
  });
  (UiShortcutsAndSizingCtrl2 = {
    ctrl: `Ctrl`,
    control: `Ctrl`,
    alt: `Alt`,
    option: `Alt`,
    shift: `Shift`,
    cmd: `Ctrl`,
    command: `Ctrl`,
    meta: `Ctrl`,
  });
  (UiShortcutsAndSizingSpace = {
    space: `␣`,
    enter: `⏎`,
    return: `⏎`,
    delete: `⌫`,
    backspace: `⌫`,
    escape: `Esc`,
    esc: `Esc`,
    tab: `⇥`,
    up: `↑`,
    down: `↓`,
    left: `←`,
    right: `→`,
    pageup: `Page Up`,
    pagedown: `Page Down`,
    home: `Home`,
    end: `End`,
    insert: `Insert`,
  });
  (UiShortcutsAndSizingSpace2 = {
    space: `Space`,
    enter: `⏎`,
    return: `⏎`,
    delete: `Backspace`,
    backspace: `Backspace`,
    escape: `Esc`,
    esc: `Esc`,
    tab: `Tab`,
    up: `↑`,
    down: `↓`,
    left: `←`,
    right: `→`,
    pageup: `Page Up`,
    pagedown: `Page Down`,
    home: `Home`,
    end: `End`,
    insert: `Insert`,
  });
  (UiShortcutsAndSizingCmd = {
    cmd: `Command`,
    command: `Command`,
    meta: `Command`,
    ctrl: `Control`,
    control: `Control`,
    alt: `Option`,
    option: `Option`,
    shift: `Shift`,
    enter: `Enter`,
    return: `Enter`,
    space: `Space`,
    tab: `Tab`,
    delete: `Delete`,
    backspace: `Delete`,
    up: `Up`,
    down: `Down`,
    left: `Left`,
    right: `Right`,
  });
  (UiShortcutsAndSizingCtrl3 = {
    ctrl: `Control`,
    control: `Control`,
    alt: `Alt`,
    option: `Alt`,
    shift: `Shift`,
    enter: `Enter`,
    return: `Enter`,
    escape: `Escape`,
    esc: `Escape`,
    space: `Space`,
    tab: `Tab`,
    delete: `Backspace`,
    backspace: `Backspace`,
    up: `ArrowUp`,
    down: `ArrowDown`,
    left: `ArrowLeft`,
    right: `ArrowRight`,
    home: `Home`,
    end: `End`,
    pageup: `PageUp`,
    pagedown: `PageDown`,
    insert: `Insert`,
  });
  (UiShortcutsAndSizingMaxWidth = `maxWidth`);
  (uiShortcutsAndSizingWeakMap = new (WeakMap as Dynamic)());
  (uiShortcutsAndSizingWeakMap2 = new (WeakMap as Dynamic)());
  (uiShortcutsAndSizingValue12 = 12);
  (UiShortcutsAndSizingDataShrinkwrap = `data-shrinkwrap`);
  (uiShortcutsAndSizingValue16 = 16);
  (uiShortcutsAndSizingSet = new (Set as Dynamic)([
    `IMG`,
    `SVG`,
    `VIDEO`,
    `AUDIO`,
    `CANVAS`,
    `IFRAME`,
    `EMBED`,
    `OBJECT`,
    `PICTURE`,
    `INPUT`,
    `TEXTAREA`,
    `SELECT`,
    `PROGRESS`,
    `METER`,
  ]));
  (uiShortcutsAndSizingWeakMap3 = new (WeakMap as Dynamic)());
  (uiShortcutsAndSizingWeakMap4 = new (WeakMap as Dynamic)());
  (uiShortcutsAndSizingWeakMap5 = new (WeakMap as Dynamic)());
  (ShrinkWrap = (0, React.forwardRef)(
    (
      {
        enabled = true,
        immediate = false,
        children: children,
        ...shrinkWrap
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) => (
      <div ref={resolveUiOverlaysAndIconsValue4(options, useUiShortcutsAndSizingEnabled({
  enabled: enabled,
  immediate: immediate
}))} data-cds={`ShrinkWrap`} {...shrinkWrap}>{children}</div>
    ),
  ));
  ShrinkWrap.displayName = `ShrinkWrap`;
  (UiShortcutsAndSizingCreateContext = (0, React.createContext)(
    false,
  ));
  (UiShortcutsAndSizingCreateContext2 = (0, React.createContext)(
    null,
  ));
  (uiShortcutsAndSizingValue5 = 5);
  (uiShortcutsAndSizingWeakMap6 = new (WeakMap as Dynamic)());
  (resolveUiShortcutsAndSizingValue3 = (..._extraArguments: unknown[]) => 0);
  (resolveUiShortcutsAndSizingValue4 = (..._extraArguments: unknown[]): Dynamic =>
    (..._extraArguments: unknown[]): undefined =>
      undefined);
  (UiShortcutsAndSizingCreateContext3 = (0, React.createContext)(
    null,
  ));
  (uiShortcutsAndSizingWeakMap7 = new (WeakMap as Dynamic)());
  (UiShortcutsAndSizingStyles5 = `absolute -z-[1] rounded-[inherit]`);
  (UiShortcutsAndSizingStyles6 = `focus-visible:shadow-focus [&[data-initial-focus]:focus]:shadow-focus`);
  (UiShortcutsAndSizingStyles7 = `focus-visible:shadow-focus-danger [&[data-initial-focus]:focus]:shadow-focus-danger`);
  (UiShortcutsAndSizingStyles8 = `absolute inset-0 rounded-[inherit] transition-[background-color,box-shadow,color] duration-fast ease-out group-focus-visible/btn:shadow-[inset_0_0_0_1px_var(--cds-page-bg)] group-[[data-initial-focus]:focus]/btn:shadow-[inset_0_0_0_1px_var(--cds-page-bg)]`);
  (UiShortcutsAndSizingCdsBtnSquish = `cds-btn-squish`);
  (UiShortcutsAndSizingStyles9 = `shadow-field group-aria-pressed/btn:shadow-field-pressed group-focus-visible/btn:group-aria-pressed/btn:shadow-[inset_0_0_0_1px_var(--cds-page-bg)]`);
  (UiShortcutsAndSizingGroupAriaPressedBtnBgAccentGroupHoverBtnGroupAriaPressedBtnBgAccent = `group-aria-pressed/btn:bg-accent group-hover/btn:group-aria-pressed/btn:bg-accent`);
  (UiShortcutsAndSizingStyles10 = `bg-fill-secondary group-hover/btn:bg-fill-secondary-hover group-[[aria-haspopup][aria-expanded=true]]/btn:bg-fill-secondary-hover`);
  (UiShortcutsAndSizingStyles11 = `inset-[0.5px]`);
  (UiShortcutsAndSizingState = `rounded outline-none focus-visible:outline-hidden [&[data-initial-focus]:focus]:outline-hidden transition-shadow duration-fast ${UiShortcutsAndSizingStyles6}`);
  (UiShortcutsAndSizingDataCdsDisabledReason = `data-cds-disabled-reason`);
  (UiShortcutsAndSizingStyles12 = `rounded-[calc(0.375rem*var(--cds-rem-scale,1))] bg-[var(--cds-tooltip-bg)] text-[var(--cds-tooltip-fg)] shadow-sm dark:shadow-panel-sm print:hidden text-[calc(0.8125rem*var(--cds-rem-scale,1))]/[calc(1.125rem*var(--cds-rem-scale,1))] font-normal`);
  (UiShortcutsAndSizingState2 = `px-2 ${UiShortcutsAndSizingStyles12}`);
  (UiShortcutsAndSizingStyles13 = `origin-[var(--transform-origin)] transition-[opacity,scale] duration-snap ease-snap motion-reduce:transition-none data-[starting-style]:opacity-0 data-[starting-style]:scale-[0.98] data-[ending-style]:opacity-0 data-[ending-style]:scale-[0.98] data-[instant]:duration-0`);
  (UiShortcutsAndSizingStyles14 = `max-w-[240px] whitespace-normal`);
  (UiShortcutsAndSizingState3 = `${UiShortcutsAndSizingStyles14} py-1.5`);
  (UiShortcutsAndSizingPx2Py15 = `px-2 py-1.5`);
  (UiShortcutsAndSizingMinW0BreakWords = `min-w-0 break-words`);
}

export { UiShortcutsAndSizingCreateContext, UiShortcutsAndSizingCreateContext2, UiShortcutsAndSizingCreateContext3, UiShortcutsAndSizingGroupAriaPressedBtnBgAccentGroupHoverBtnGroupAriaPressedBtnBgAccent, UiShortcutsAndSizingMinW0BreakWords, UiShortcutsAndSizingPx2Py15, UiShortcutsAndSizingState2, UiShortcutsAndSizingState3, UiShortcutsAndSizingStyles10, UiShortcutsAndSizingStyles12, UiShortcutsAndSizingStyles13, UiShortcutsAndSizingStyles14, UiShortcutsAndSizingStyles6, UiShortcutsAndSizingStyles7, UiShortcutsAndSizingStyles8, UiShortcutsAndSizingStyles9, collectUiShortcutsAndSizingModifiers2, isUiShortcutsAndSizingOwnerDocument, isUiShortcutsAndSizingValue, resolveUiShortcutsAndSizingJoined, resolveUiShortcutsAndSizingTabIndex, useTooltipTrigger, useUiShortcutsAndSizingEnabled, useUiShortcutsAndSizingStart, useUiShortcutsAndSizingUseSyncExternalStore };
