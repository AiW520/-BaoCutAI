/** BaoCut: sheets geometry from cds-CIGM-LUe.js. */
import type { Dynamic } from "./types";
import {
  React,
  UiDesignSystemUseLayoutEffect,
  UiLinksAndFoundationStyles,
  UiTooltipsAndControlsStyles6,
  isUiLinksAndFoundationValue,
  resolveUiLinksAndFoundationValue6,
  resolveUiProviderAndLayersUseContext10,
  updateUiLinksAndFoundationSubscribe,
  useUiLinksAndFoundationUseSyncExternalStore,
} from "./cds-dependencies";

function resolveSheetsValue(..._extraArguments: unknown[]): Dynamic {
  return useUiLinksAndFoundationUseSyncExternalStore(
    resolveUiProviderAndLayersUseContext10(),
    UiLinksAndFoundationStyles,
  );
}

var SheetsAuto: Dynamic;

function resolveSheetsUseContext(..._extraArguments: unknown[]): Dynamic {
  return (0, React.useContext)(SheetsAuto);
}

function useSheetsSheet(..._extraArguments: unknown[]): Dynamic {
  "use no memo";
  let value: Dynamic = resolveSheetsUseContext();
  let value2: Dynamic = resolveUiProviderAndLayersUseContext10();
  let value3: Dynamic = (0, React.useSyncExternalStore)(
    resolveUiLinksAndFoundationValue6,
    (..._extraArguments: unknown[]): Dynamic =>
      value2 !== undefined &&
      (updateUiLinksAndFoundationSubscribe(
        value2,
        `(pointer: coarse)`,
      )?.getSnapshot() ??
        false),
    isUiLinksAndFoundationValue,
  );
  return value === `sheet` || value3;
}

var SheetsDataCdsSheetDrilled: Dynamic;

var SheetsDataCdsSheetCovered: Dynamic;

var SheetsDataCdsSheetPeeling: Dynamic;

var SheetsDataCdsSheetTreeClosing: Dynamic;

var SheetsDataCdsSheetScroll: Dynamic;

var SheetsDataCdsSheetPressed: Dynamic;

var SheetsDataCdsSheetControlHeld: Dynamic;

function isSheetsFrom(input?: Dynamic, ..._extraArguments: unknown[]) {
  if (resolveSheetsValue2(input)) return true;
  for (let value of Array.from<Dynamic>(
    input.querySelectorAll(`[${SheetsDataCdsSheetScroll}]`),
  ) as Dynamic)
    if (value.scrollHeight > value.clientHeight + 1) return true;
  return false;
}

function resolveSheetsValue2(element?: Dynamic, ..._extraArguments: unknown[]) {
  return element.querySelector(UiTooltipsAndControlsStyles6) !== null;
}

function resolveSheetsAuto(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return options ? false : input === `auto` ? context : input === `sheet`;
}

function useSheetsState(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [value, value2]: Dynamic = (0, React.useState)(input);
  let [value3, value4]: Dynamic = (0, React.useState)(options);
  return options !== value3 && (value4(options), options)
    ? (value2(input), input)
    : context
      ? value
      : input;
}

function useSheetsShowing(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [value, value2]: Dynamic = (0, React.useState)(input);
  if (input && !value) {
    value2(true);
  }
  let value3: Dynamic = (0, React.useCallback)(
    (input2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (!input2) {
        value2(false);
      }
    },
    [],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (input || !value) return;
      let value4: Dynamic = setTimeout(
        (..._extraArguments: unknown[]): undefined => {
          value2(false);
        },
        sheetsValue1000,
      );
      return (..._extraArguments: unknown[]): undefined => {
        clearTimeout(value4);
      };
    },
    [input, value],
  );
  return {
    showing: input || value,
    onOpenChangeComplete: value3,
  };
}

var sheetsValue1000: Dynamic;

function useSheetsWasOpen(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [value, value2]: Dynamic = (0, React.useState)(
    (..._extraArguments: unknown[]): Dynamic => ({
      wasOpen: input,
      value: input ? options() : context,
    }),
  );
  let value3: Dynamic = (0, React.useRef)(options);
  UiDesignSystemUseLayoutEffect((..._extraArguments: unknown[]): undefined => {
    value3.current = options;
  });
  UiDesignSystemUseLayoutEffect(
    (..._extraArguments: unknown[]): undefined => {
      if (!input) return;
      let value4: Dynamic = value3.current();
      value2(
        (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          input2.wasOpen && Object.is(input2.value, value4)
            ? input2
            : {
                wasOpen: true,
                value: value4,
              },
      );
    },
    [input],
  );
  if (input !== value.wasOpen) {
    let value4: Dynamic = input ? options() : value.value;
    value2({
      wasOpen: input,
      value: value4,
    });
    return value4;
  }
  return value.value;
}

var SheetsDetentThreshold: Dynamic;

function resolveSheetsRubberBand(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return input <= 0 || options <= 0
    ? 0
    : (1 - 1 / ((input * SheetsDetentThreshold.rubberBand) / options + 1)) *
        options;
}

function resolveSheetsRubberBand2(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return input <= 0 || options <= 0
    ? 0
    : ((1 / (1 - Math.min(input, options * 0.9) / options) - 1) * options) /
        SheetsDetentThreshold.rubberBand;
}

function resolveSheetsRest(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  value: Dynamic = true,
  ..._extraArguments: unknown[]
): Dynamic {
  let value2: Dynamic = Math.max(options * context, input);
  let value3: Dynamic =
    !value || value2 - input < SheetsDetentThreshold.detentThreshold
      ? input
      : value2;
  return {
    rest: input,
    tall: value3,
    room: Math.max(0, (options - value3) * SheetsDetentThreshold.overshootRoom),
  };
}

function resolveSheetsTall(input?: Dynamic, ..._extraArguments: unknown[]) {
  return input.tall > input.rest;
}

function resolveSheetsHeight(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (options > input.tall)
    return {
      height:
        input.tall + resolveSheetsRubberBand(options - input.tall, input.room),
      slide: 0,
      shown: 1,
    };
  if (options >= input.rest)
    return {
      height: options,
      slide: 0,
      shown: 1,
    };
  let value: Dynamic = input.rest - options;
  return {
    height: input.rest,
    slide: value,
    shown: 1 - Math.min(1, value / Math.max(1, input.rest)),
  };
}

function resolveSheetsTall2(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return options > input.tall
    ? input.tall + resolveSheetsRubberBand2(options - input.tall, input.room)
    : Math.min(options, input.tall) - Math.max(0, context);
}

function resolveSheetsSlide(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let { slide: value }: Dynamic = resolveSheetsHeight(
    input,
    options.rawAtRelease,
  );
  let value2: Dynamic =
    options.commit &&
    value > 0 &&
    (value - options.caughtSlide >
      input.rest * SheetsDetentThreshold.dismissFraction ||
      (options.detent === "default" &&
        options.velocity > SheetsDetentThreshold.flingVelocity));
  if (!options.commit || value2)
    return {
      dismiss: value2,
      detent: options.detent,
    };
  if (options.rawAtGrab > input.rest && options.rawAtGrab < input.tall) {
    let value3: Dynamic = options.rawAtRelease - options.rawAtGrab;
    return value3 > SheetsDetentThreshold.detentThreshold &&
      resolveSheetsTall(input)
      ? {
          dismiss: false,
          detent: `tall`,
        }
      : value3 < -SheetsDetentThreshold.detentThreshold
        ? {
            dismiss: false,
            detent: `default`,
          }
        : {
            dismiss: false,
            detent: options.detent,
          };
  }
  return options.detent === "default" &&
    resolveSheetsTall(input) &&
    options.rawAtRelease > input.rest + SheetsDetentThreshold.detentThreshold
    ? {
        dismiss: false,
        detent: `tall`,
      }
    : options.detent === `tall` &&
        options.rawAtRelease <
          input.tall - SheetsDetentThreshold.detentThreshold
      ? {
          dismiss: false,
          detent: `default`,
        }
      : {
          dismiss: false,
          detent: options.detent,
        };
}

var SheetsMessage: Dynamic;

var SheetsState: Dynamic;

var SheetsPosition: Dynamic;

var SheetsDisableAnchorTracking: Dynamic;

function resolveSheetsBottom(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = input?.keyboard?.inset ?? 0;
  return value > 0
    ? {
        ...SheetsPosition,
        bottom: value,
      }
    : SheetsPosition;
}

var sheetsValue0_9: Dynamic;

var SheetsState2: Dynamic;

var SheetsOvershootRoom: Dynamic;

function resolveSheetsInnerHeight(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = options?.parentElement;
  if (value == null) return input.innerHeight;
  let value2: Dynamic = Number.parseFloat(
    input.getComputedStyle(value)?.scrollMarginTop ?? ``,
  );
  return value2 > 0
    ? Math.max(0, input.innerHeight - value2)
    : input.innerHeight;
}

var SheetsComfortable: Dynamic;

var sheetsValue0_5: Dynamic;

var SheetsState3: Dynamic;

function resolveSheetsValue3(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return options ? input * sheetsValue0_5 : 0;
}

function resolveSheetsFloor(
  input: Dynamic,
  { floor: options, parentFrameHeight: options2 }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = input?.keyboard ?? null;
  let value2: Dynamic =
    options === `half` ? `min(${SheetsState3}, ${SheetsState2})` : `0px`;
  return {
    "--available-height": SheetsState2,
    width: `100%`,
    maxWidth: `none`,
    minWidth: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingBottom: value === null ? undefined : `0.5rem`,
    minHeight:
      value === null
        ? options2 === undefined
          ? options === `half`
            ? value2
            : undefined
          : `max(${value2}, ${options2}px)`
        : undefined,
    maxHeight:
      value === null
        ? input?.height === undefined
          ? options === `half`
            ? value2
            : SheetsState2
          : SheetsOvershootRoom
        : `calc(${value.visible}px - ${SheetsMessage} - 8px)`,
    height:
      input?.detent === `tall`
        ? SheetsState2
        : input?.height === undefined
          ? undefined
          : `${input.height}px`,
  };
}

function resolveSheetsGet(..._extraArguments: unknown[]): Dynamic {
  let value: Dynamic = null;
  return {
    get: (..._extraArguments: unknown[]): Dynamic => value,
    set: (input?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      value = input;
    },
  };
}

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeSheetsGeometryStep1(): void {
  SheetsAuto = (0, React.createContext)(`auto`);
  SheetsDataCdsSheetDrilled = `data-cds-sheet-drilled`;
  SheetsDataCdsSheetCovered = `data-cds-sheet-covered`;
  SheetsDataCdsSheetPeeling = `data-cds-sheet-peeling`;
  SheetsDataCdsSheetTreeClosing = `data-cds-sheet-tree-closing`;
  SheetsDataCdsSheetScroll = `data-cds-sheet-scroll`;
  SheetsDataCdsSheetPressed = `data-cds-sheet-pressed`;
  SheetsDataCdsSheetControlHeld = `data-cds-sheet-control-held`;
  sheetsValue1000 = 1e3;
  SheetsDetentThreshold = {
    detentThreshold: 40,
    dismissFraction: 0.25,
    flingVelocity: 0.8,
    rubberBand: 0.55,
    overshootRoom: 0.5,
  };
  SheetsMessage = `env(safe-area-inset-top, 0px)`;
  SheetsState = `(100dvh - ${SheetsMessage})`;
  SheetsPosition = {
    position: `fixed`,
    top: `auto`,
    right: 0,
    bottom: 0,
    left: 0,
    width: `auto`,
    minWidth: 0,
    maxWidth: `none`,
    transform: `none`,
    scrollMarginTop: SheetsMessage,
  };
  SheetsDisableAnchorTracking = {
    disableAnchorTracking: true,
    collisionAvoidance: {
      side: `none`,
      align: `none`,
    },
  };
  sheetsValue0_9 = 0.9;
  SheetsState2 = `calc(${SheetsState} * ${sheetsValue0_9})`;
  SheetsOvershootRoom = `calc(${SheetsState} * ${sheetsValue0_9 + 0.09999999999999998 * SheetsDetentThreshold.overshootRoom})`;
  SheetsComfortable = `comfortable`;
  sheetsValue0_5 = 0.5;
  SheetsState3 = `${sheetsValue0_5 * 100}dvh`;
}

export {
  SheetsAuto,
  SheetsComfortable,
  SheetsDataCdsSheetControlHeld,
  SheetsDataCdsSheetCovered,
  SheetsDataCdsSheetDrilled,
  SheetsDataCdsSheetPeeling,
  SheetsDataCdsSheetPressed,
  SheetsDataCdsSheetScroll,
  SheetsDataCdsSheetTreeClosing,
  SheetsDisableAnchorTracking,
  SheetsState2,
  SheetsState3,
  isSheetsFrom,
  resolveSheetsAuto,
  resolveSheetsBottom,
  resolveSheetsFloor,
  resolveSheetsGet,
  resolveSheetsHeight,
  resolveSheetsInnerHeight,
  resolveSheetsRest,
  resolveSheetsSlide,
  resolveSheetsTall2,
  resolveSheetsUseContext,
  resolveSheetsValue,
  resolveSheetsValue2,
  resolveSheetsValue3,
  sheetsValue0_5,
  sheetsValue0_9,
  useSheetsSheet,
  useSheetsShowing,
  useSheetsState,
  useSheetsWasOpen,
};
