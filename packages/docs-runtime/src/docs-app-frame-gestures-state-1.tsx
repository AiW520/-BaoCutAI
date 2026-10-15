/** BaoCut: frame gestures from index-CX4IZqzA.js. */
import type { UnknownRecord } from "./type-models/common";
import type { KeyboardPlace, PrimeAnswer, KeyboardDecision, KeyboardSeat, KeyboardLease, FrameStorage, HeadingGate, RectPin, OpenWindow } from "./type-models/host";
import type { Dynamic } from "./types";
import {
  Button,
  Popover,
  dataModelSchemasPattern16,
  editorHostPattern3,
  logError,
  platformImagesAndBlobsSet2,
  resolveCommentsStoreLayer,
  resolveDataOperationControlOutline,
  resolveDataOperationControlValue5,
  resolveEditorHostValue21,
  resolveObservabilityBrowserAndOperationEventsVideoWebm,
} from "./docs-app-dependencies";
import {
  React,
} from "./docs-app-bootstrap";
import {
  DocumentSelection_BongoDocCaret,
  documentSelectionLimit64,
  documentSelectionMap,
  isDocumentSelectionCaret,
  resolveDocumentSelectionKind5,
  resolveDocumentSelectionValue3,
  updateDocumentSelectionParse,
} from "./docs-app-document-selection-map-document-selection-tops";

function resolveFrameGesturesSize(..._extraArguments: unknown[]): undefined {
  let documentSelectionValue3: Dynamic = resolveDocumentSelectionValue3();
  if (documentSelectionValue3)
    try {
      if (documentSelectionMap.size === 0) {
        documentSelectionValue3.removeItem(DocumentSelection_BongoDocCaret);
      } else {
        documentSelectionValue3.setItem(
          DocumentSelection_BongoDocCaret,
          JSON.stringify(Object.fromEntries(documentSelectionMap)),
        );
      }
    } catch {}
}

function updateFrameGesturesAnchor(
  updateFrameGesturesAnchor2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let isDocumentSelectionCaret2: Dynamic = isDocumentSelectionCaret(options);
  if (isDocumentSelectionCaret2 === null) return;
  let record: Dynamic =
    isDocumentSelectionCaret2.anchor.kind === `blocks` &&
    isDocumentSelectionCaret2.anchor.ids.length > 1
      ? {
          ...isDocumentSelectionCaret2,
          anchor: {
            kind: `blocks`,
            ids: [isDocumentSelectionCaret2.anchor.ids[0]],
          },
        }
      : isDocumentSelectionCaret2;
  updateDocumentSelectionParse();
  let documentSelectionMapEntry: Dynamic = documentSelectionMap.get(
    updateFrameGesturesAnchor2,
  );
  documentSelectionMap.delete(updateFrameGesturesAnchor2);
  documentSelectionMap.set(updateFrameGesturesAnchor2, record);
  if (documentSelectionMap.size > documentSelectionLimit64) {
    let value: Dynamic = documentSelectionMap.keys().next().value;
    if (value !== undefined) {
      documentSelectionMap.delete(value);
    }
  }
  if (
    documentSelectionMapEntry === undefined ||
    resolveDocumentSelectionKind5(documentSelectionMapEntry) !==
      resolveDocumentSelectionKind5(record)
  ) {
    resolveFrameGesturesSize();
  }
}

function getFrameGesturesValue(
  frameGesturesValue?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  updateDocumentSelectionParse();
  return documentSelectionMap.get(frameGesturesValue);
}

// BaoCut: 编辑器更新后的提示不提 Claude Docs。
var FrameGestures_Message: string;

var FrameGesturesBack: Dynamic;

var frameGesturesLimit1000: number;

var frameGesturesLimit10000: number;

var frameGesturesLimit10002: number;

var frameGesturesLimit15000: number;

var FrameGesturesRestored: Dynamic;

function resolveFrameGesturesKeyboard(frameGesturesKeyboard: {
  keyboard: KeyboardPlace;
  answer: PrimeAnswer;
}): KeyboardDecision {
  return frameGesturesKeyboard.keyboard === `notInText`
    ? `notInText`
    : frameGesturesKeyboard.answer === `restored`
      ? `restored`
      : frameGesturesKeyboard.answer === `other`
        ? `primedInText`
        : `elsewhereInText`;
}

function resolveFrameGesturesHasFocus(document2: {
  hasFocus: boolean;
  iframe: HTMLIFrameElement | null;
  activeElement: Element | null;
}): KeyboardPlace {
  return document2.hasFocus &&
    document2.iframe !== null &&
    document2.activeElement === document2.iframe
    ? `inText`
    : `notInText`;
}

var FrameGesturesState: boolean;

var FrameGesturesState2: Dynamic;

var FrameGesturesState3: boolean;

var FrameGesturesState4: KeyboardSeat[];

var frameGesturesSet: Set<() => void>;

var resolveFrameGesturesValue: () => KeyboardSeat | undefined;

function resolveFrameGesturesKeyboard2(
  keyboard: () => KeyboardPlace,
  writable?: () => boolean | undefined,
): KeyboardLease {
  let record: KeyboardSeat = {
    keyboard: keyboard,
    writable: writable,
    answer: null,
    resets: 0,
  };
  FrameGesturesState4.push(record);
  let keyboard2: (answer: PrimeAnswer) => void = (frameGesturesKeyboard2) => {
    if (record.answer === null) {
      record.answer = frameGesturesKeyboard2;
      for (let resolveFrameGesturesKeyboard2Result of frameGesturesSet)
        resolveFrameGesturesKeyboard2Result();
    }
  };
  return {
    answer: (frameGesturesKeyboard2) =>
      keyboard2(frameGesturesKeyboard2 === true ? `restored` : `other`),
    noPrime: () => keyboard2(`none`),
    reset() {
      record.answer = null;
      record.resets++;
      for (let resolveFrameGesturesKeyboard2Result of frameGesturesSet)
        resolveFrameGesturesKeyboard2Result();
    },
    dispose() {
      let FrameGesturesState4Index = FrameGesturesState4.indexOf(record);
      if (FrameGesturesState4Index >= 0) {
        FrameGesturesState4.splice(FrameGesturesState4Index, 1);
      }
    },
  };
}

function resolveFrameGesturesAccept(
  frameGesturesAccept: {
    nonce: string;
    restored?: unknown;
  },
  options: {
    accept(nonce: string): boolean;
  },
  context?: KeyboardLease,
): boolean {
  return options.accept(frameGesturesAccept.nonce)
    ? (context?.answer(frameGesturesAccept.restored === true), true)
    : false;
}

function resolveFrameGesturesRoom(response: {
  room: boolean;
  verdict?: string;
  settled: boolean;
  readOnly: boolean;
}): boolean | undefined {
  if (!(response.room ? response.verdict === undefined : !response.settled))
    return response.readOnly
      ? false
      : response.room
        ? response.verdict === `writer`
        : true;
}

function resolveFrameGesturesAnswer(..._extraArguments: unknown[]): Dynamic {
  let frameGesturesValue: Dynamic = resolveFrameGesturesValue();
  let keyboard: Dynamic = `notInText`;
  try {
    keyboard = frameGesturesValue?.keyboard() ?? `notInText`;
  } catch {
    keyboard = `notInText`;
  }
  return FrameGesturesBack[
    FrameGesturesRestored[
      resolveFrameGesturesKeyboard({
        answer: frameGesturesValue?.answer ?? `none`,
        keyboard: keyboard,
      })
    ]
  ];
}

function updateFrameGesturesVisibilityState(
  updateFrameGesturesVisibilityState2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    FrameGesturesState ||
    (FrameGesturesState3 &&
      FrameGesturesState2 !== null &&
      updateFrameGesturesVisibilityState2.now() - FrameGesturesState2 > 3e4)
  )
    return (..._extraArguments: unknown[]): undefined => {};
  if (updateFrameGesturesVisibilityState2.doc.visibilityState === `visible`) {
    FrameGesturesState2 ??= updateFrameGesturesVisibilityState2.now();
  }
  let now: Dynamic = updateFrameGesturesVisibilityState2.now();
  let updateFrameGesturesVisibilityStateResult: Dynamic = null;
  let updateFrameGesturesVisibilityStateResult2: Dynamic = null;
  let enabled = false;
  let updateFrameGesturesVisibilityStateResult3: Dynamic = null;
  let frameGesturesValue: Dynamic = resolveFrameGesturesValue();
  let resets: Dynamic = frameGesturesValue?.resets ?? 0;
  let updateFrameGesturesVisibilityStateResult4: Dynamic = null;
  let enabled2 = false;
  let updateFrameGesturesVisibilityStateHandler = (
    ..._extraArguments: unknown[]
  ): undefined => {
    if (updateFrameGesturesVisibilityStateResult4 !== null) {
      updateFrameGesturesVisibilityState2.timers.clear(
        updateFrameGesturesVisibilityStateResult4,
      );
    }
    updateFrameGesturesVisibilityStateResult4 = null;
  };
  let removeEventListener = (..._extraArguments: unknown[]): undefined => {
    enabled2 = true;
    updateFrameGesturesVisibilityStateHandler();
    updateFrameGesturesVisibilityState2.doc.removeEventListener(
      `visibilitychange`,
      updateFrameGesturesVisibilityStateHandler3,
    );
    frameGesturesSet.delete(updateFrameGesturesVisibilityStateHandler2);
  };
  let removeEventListener2 = (..._extraArguments: unknown[]): undefined => {
    FrameGesturesState3 = true;
    removeEventListener();
  };
  let writable = (..._extraArguments: unknown[]): undefined => {
    updateFrameGesturesVisibilityStateResult4 = null;
    if (
      enabled2 ||
      FrameGesturesState ||
      updateFrameGesturesVisibilityState2.doc.visibilityState !== `visible`
    )
      return;
    let difference: Dynamic = updateFrameGesturesVisibilityState2.now() - now;
    let writable2: Dynamic = updateFrameGesturesVisibilityState2.writable();
    let frameGesturesValue2: Dynamic = resolveFrameGesturesValue();
    if (writable2 === false) {
      removeEventListener2();
      return;
    }
    if (writable2 === undefined) {
      enabled = true;
    } else {
      if (enabled && updateFrameGesturesVisibilityStateResult2 === null) {
        updateFrameGesturesVisibilityStateResult2 =
          updateFrameGesturesVisibilityState2.now();
      }
    }
    if (frameGesturesValue2 === frameGesturesValue) {
      if (
        frameGesturesValue2 !== undefined &&
        frameGesturesValue2.resets !== resets
      ) {
        resets = frameGesturesValue2.resets;
        updateFrameGesturesVisibilityStateResult3 =
          updateFrameGesturesVisibilityState2.now();
      }
    } else {
      frameGesturesValue = frameGesturesValue2;
      resets = frameGesturesValue2?.resets ?? 0;
    }
    if (
      writable2 !== undefined &&
      (frameGesturesValue2?.answer ?? null) === null
    ) {
      let difference2 =
        updateFrameGesturesVisibilityState2.now() -
        Math.max(
          now,
          updateFrameGesturesVisibilityStateResult2 ?? now,
          updateFrameGesturesVisibilityStateResult3 ?? now,
        );
      if (difference2 < 1e4) {
        updateFrameGesturesVisibilityStateResult4 =
          updateFrameGesturesVisibilityState2.timers.set(
            writable,
            frameGesturesLimit10000 - difference2,
          );
        return;
      }
    }
    if (
      (!updateFrameGesturesVisibilityState2.swappedIn() ||
        writable2 === undefined) &&
      difference < 3e4
    ) {
      updateFrameGesturesVisibilityStateResult4 =
        updateFrameGesturesVisibilityState2.timers.set(
          writable,
          frameGesturesLimit1000,
        );
      return;
    }
    updateFrameGesturesVisibilityStateResult ??=
      updateFrameGesturesVisibilityState2.now();
    let sinceActivity: Dynamic =
      updateFrameGesturesVisibilityState2.sinceActivity();
    if (
      sinceActivity < 1e3 &&
      updateFrameGesturesVisibilityState2.now() -
        updateFrameGesturesVisibilityStateResult <
        15e3
    ) {
      updateFrameGesturesVisibilityStateResult4 =
        updateFrameGesturesVisibilityState2.timers.set(
          writable,
          Math.min(
            frameGesturesLimit10002 - sinceActivity,
            frameGesturesLimit15000 -
              (updateFrameGesturesVisibilityState2.now() -
                updateFrameGesturesVisibilityStateResult),
          ),
        );
      return;
    }
    if (!updateFrameGesturesVisibilityState2.swappedIn()) {
      FrameGesturesState = true;
      return;
    }
    if (writable2 !== true) {
      removeEventListener2();
      return;
    }
    let writable3: Dynamic = frameGesturesValue2?.writable
      ? frameGesturesValue2.writable()
      : true;
    if (writable3 !== true) {
      if (writable3 === false) {
        removeEventListener2();
      } else {
        removeEventListener();
      }
      return;
    }
    FrameGesturesState = true;
    updateFrameGesturesVisibilityState2.say(resolveFrameGesturesAnswer());
  };
  let updateFrameGesturesVisibilityStateHandler2 = (
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      !(
        enabled2 ||
        FrameGesturesState ||
        updateFrameGesturesVisibilityState2.doc.visibilityState !== `visible`
      )
    ) {
      updateFrameGesturesVisibilityStateHandler();
      updateFrameGesturesVisibilityStateResult4 =
        updateFrameGesturesVisibilityState2.timers.set(
          writable,
          frameGesturesLimit1000,
        );
    }
  };
  let updateFrameGesturesVisibilityStateHandler3 = (
    ..._extraArguments: unknown[]
  ): undefined => {
    if (updateFrameGesturesVisibilityState2.doc.visibilityState === `visible`) {
      now = updateFrameGesturesVisibilityState2.now();
      updateFrameGesturesVisibilityStateResult = null;
      FrameGesturesState2 ??= updateFrameGesturesVisibilityState2.now();
    }
    updateFrameGesturesVisibilityStateHandler2();
  };
  updateFrameGesturesVisibilityState2.doc.addEventListener(
    `visibilitychange`,
    updateFrameGesturesVisibilityStateHandler3,
  );
  frameGesturesSet.add(updateFrameGesturesVisibilityStateHandler2);
  updateFrameGesturesVisibilityStateHandler2();
  return removeEventListener;
}

function resolveFrameGesturesIsArray(items: unknown): string[] {
  if (!Array.isArray(items) || items.length > 256 * 4) return [];
  let items2: string[] = [];
  let uniqueItems: Set<string> = new Set();
  for (let items3 of items)
    if (
      !(
        typeof items3 != `string` ||
        items3.length > 128 ||
        !dataModelSchemasPattern16.test(items3) ||
        uniqueItems.has(items3)
      ) &&
      (uniqueItems.add(items3), items2.push(items3), items2.length >= 256)
    )
      break;
  return items2;
}

var frameGesturesLimit64: number;

var frameGesturesLimit200000: number;

var FrameGestures_BongoCollapsedHeadings: string;

var frameGesturesLimit400: number;

var frameGesturesMap: Map<string, string[]>;

var frameGesturesState: FrameStorage | undefined;

var FrameGesturesState5: boolean;

function resolveFrameGesturesValue2(): FrameStorage | undefined {
  if (!FrameGesturesState5) {
    FrameGesturesState5 = true;
    try {
      frameGesturesState ??=
        typeof sessionStorage !== "undefined" ? sessionStorage : undefined;
    } catch {
      frameGesturesState = undefined;
    }
  }
  return frameGesturesState;
}

var FrameGesturesState6: boolean;

function updateFrameGesturesParse(): void {
  if (FrameGesturesState6) return;
  FrameGesturesState6 = true;
  let updateFrameGesturesParseResult: unknown;
  try {
    let item =
      resolveFrameGesturesValue2()?.getItem(
        FrameGestures_BongoCollapsedHeadings,
      ) ?? null;
    if (!item || item.length > frameGesturesLimit200000) return;
    updateFrameGesturesParseResult = JSON.parse(item);
  } catch {
    return;
  }
  if (
    !(
      !updateFrameGesturesParseResult ||
      typeof updateFrameGesturesParseResult != `object` ||
      Array.isArray(updateFrameGesturesParseResult)
    )
  )
    for (let [items, updateFrameGesturesParseResult2] of Object.entries(
      updateFrameGesturesParseResult as UnknownRecord,
    )) {
      let frameGesturesIsArray = resolveFrameGesturesIsArray(
        updateFrameGesturesParseResult2,
      );
      if (
        !(items.length > 256 || frameGesturesIsArray.length === 0) &&
        (frameGesturesMap.set(items, frameGesturesIsArray),
        frameGesturesMap.size >= frameGesturesLimit64)
      )
        break;
    }
}

var frameGesturesSet2: Set<string>;

var FrameGesturesState7: number | ReturnType<typeof setTimeout> | null;

function updateFrameGesturesSize(): void {
  if (FrameGesturesState7 !== null) {
    clearTimeout(FrameGesturesState7);
  }
  FrameGesturesState7 = null;
  let frameGesturesValue2 = resolveFrameGesturesValue2();
  if (!(!frameGesturesValue2 || frameGesturesSet2.size === 0))
    try {
      let lookup: Map<string, string[]> = new Map();
      try {
        let item = frameGesturesValue2.getItem(
          FrameGestures_BongoCollapsedHeadings,
        );
        let parse: unknown =
          item && item.length <= frameGesturesLimit200000
            ? JSON.parse(item)
            : null;
        if (parse && typeof parse == `object` && !Array.isArray(parse))
          for (let [items, updateFrameGesturesSizeResult] of Object.entries(
            parse as UnknownRecord,
          )) {
            let frameGesturesIsArray = resolveFrameGesturesIsArray(
              updateFrameGesturesSizeResult,
            );
            if (items.length <= 256 && frameGesturesIsArray.length > 0) {
              lookup.set(items, frameGesturesIsArray);
            }
          }
      } catch {
        lookup.clear();
      }
      for (let updateFrameGesturesSizeResult of frameGesturesSet2) {
        lookup.delete(updateFrameGesturesSizeResult);
        let frameGesturesMapEntry = frameGesturesMap.get(
          updateFrameGesturesSizeResult,
        );
        if (frameGesturesMapEntry) {
          lookup.set(updateFrameGesturesSizeResult, frameGesturesMapEntry);
        }
      }
      for (frameGesturesSet2.clear(); lookup.size > frameGesturesLimit64; )
        lookup.delete(lookup.keys().next().value!);
      let stringify = JSON.stringify(Object.fromEntries(lookup));
      for (; stringify.length > frameGesturesLimit200000 && lookup.size > 1; ) {
        lookup.delete(lookup.keys().next().value!);
        stringify = JSON.stringify(Object.fromEntries(lookup));
      }
      if (lookup.size === 0) {
        frameGesturesValue2.removeItem(FrameGestures_BongoCollapsedHeadings);
      } else {
        frameGesturesValue2.setItem(
          FrameGestures_BongoCollapsedHeadings,
          stringify,
        );
      }
    } catch {}
}

var FrameGesturesState8: boolean;

function installFrameGesturesValue(): void {
  if (!FrameGesturesState8 && typeof addEventListener == `function`) {
    FrameGesturesState8 = true;
    addEventListener(`pagehide`, updateFrameGesturesSize);
  }
  if (FrameGesturesState7 === null) {
    FrameGesturesState7 = setTimeout(
      updateFrameGesturesSize,
      frameGesturesLimit400,
    );
  }
}

function getFrameGesturesValue2(
  frameGesturesValue2: string,
): readonly string[] {
  updateFrameGesturesParse();
  return frameGesturesMap.get(frameGesturesValue2) ?? [];
}

function updateFrameGesturesDelete(
  updateFrameGesturesDelete3: string,
  options: unknown,
): void {
  updateFrameGesturesParse();
  let frameGesturesIsArray = resolveFrameGesturesIsArray(options);
  frameGesturesMap.delete(updateFrameGesturesDelete3);
  frameGesturesSet2.add(updateFrameGesturesDelete3);
  if (frameGesturesIsArray.length > 0)
    for (
      frameGesturesMap.set(updateFrameGesturesDelete3, frameGesturesIsArray);
      frameGesturesMap.size > frameGesturesLimit64;

    )
      frameGesturesMap.delete(frameGesturesMap.keys().next().value!);
  installFrameGesturesValue();
}

function resolveFrameGesturesIds(event: HeadingGate): {
  type: "collapsed-headings";
  ids: string[];
} | null {
  if (
    !event.ready ||
    event.navigated ||
    !event.displayOn ||
    event.filmed ||
    event.key === null
  )
    return null;
  let frameGesturesValue2 = getFrameGesturesValue2(event.key);
  return frameGesturesValue2.length === 0
    ? null
    : {
        type: `collapsed-headings`,
        ids: [...frameGesturesValue2],
      };
}

function isFrameGesturesDisplayOn(
  event: HeadingGate,
  options: unknown,
): boolean {
  if (!event.displayOn || event.filmed || event.key === null) return false;
  let frameGesturesValue2 = getFrameGesturesValue2(event.key);
  updateFrameGesturesDelete(event.key, options);
  resolveDataOperationControlValue5(
    frameGesturesValue2,
    getFrameGesturesValue2(event.key),
  );
  return true;
}

var frameGesturesLimit3: number;

function resolveFrameGesturesRowsPin<Pin extends RectPin>(
  frameGesturesRowsPin: Pin,
  options: number,
  context: number,
  dependencies?: number,
): Pin | Omit<Pin, "rowsPin" | "fedPath"> {
  let rect = frameGesturesRowsPin.rect;
  let difference =
    frameGesturesRowsPin.scrollY !== undefined && dependencies !== undefined
      ? dependencies - frameGesturesRowsPin.scrollY
      : 0;
  let count = rect === undefined ? 0 : rect.y - difference;
  if (
    rect !== undefined &&
    options >= rect.x - frameGesturesLimit3 &&
    options <= rect.x + rect.w + frameGesturesLimit3 &&
    context >= count - frameGesturesLimit3 &&
    context <= count + rect.h + frameGesturesLimit3
  )
    return frameGesturesRowsPin;
  let {
    rowsPin: frameGesturesRowsPin2,
    fedPath: frameGesturesRowsPin3,
    ...frameGesturesRowsPin4
  } = frameGesturesRowsPin;
  return frameGesturesRowsPin4;
}

var FrameGestures_ChooseImages: string;

var frameGesturesLimit20000: number;

var FrameGesturesWidth: {
  width: number;
  height: number;
};

function resolveFrameGesturesIsFinite(
  frameGesturesIsFinite: {
    x: unknown;
    y: unknown;
  },
  options: Pick<DOMRect, "top" | "left" | "width" | "height">,
  context: {
    width: number;
    height: number;
  },
): {
  x: number;
  y: number;
} | null {
  let { x: frameGesturesIsFinite2, y: frameGesturesIsFinite3 } =
    frameGesturesIsFinite;
  if (
    typeof frameGesturesIsFinite2 != `number` ||
    typeof frameGesturesIsFinite3 != `number` ||
    !Number.isFinite(frameGesturesIsFinite2) ||
    !Number.isFinite(frameGesturesIsFinite3) ||
    !(options.width > 0) ||
    !(options.height > 0)
  )
    return null;
  let max = Math.max(options.left, 0);
  let max2 = Math.max(options.top, 0);
  let difference =
    Math.min(options.left + options.width, context.width) -
    FrameGesturesWidth.width;
  let difference2 =
    Math.min(options.top + options.height, context.height) -
    FrameGesturesWidth.height;
  return {
    x: Math.max(
      max,
      Math.min(options.left + frameGesturesIsFinite2, difference),
    ),
    y: Math.max(
      max2,
      Math.min(options.top + frameGesturesIsFinite3, difference2),
    ),
  };
}

var resolveFrameGesturesOpenedAt: () => OpenWindow;

var resolveFrameGesturesOpenedAt2: (frameGesturesOpened: OpenWindow, options: number) => boolean;

var resolveFrameGesturesValue3: (frameGesturesValue3: number | null, options: number, context?: number) => boolean;

var resolveFrameGesturesValue4: (frameGesturesValue4: number, options: number) => number;

var resolveFrameGesturesValue5: Dynamic;

function resolveFrameGesturesIsActive(
  frameGesturesIsActive?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let {
    isActive: frameGesturesIsActive2,
    popupClosedAt: frameGesturesIsActive3,
    stillOffered: frameGesturesIsActive4,
    open: frameGesturesIsActive5,
    showButton: frameGesturesIsActive6,
    drop: frameGesturesIsActive7,
    now: frameGesturesIsActive8,
    later: frameGesturesIsActive9,
  }: Dynamic = frameGesturesIsActive;
  if (!frameGesturesIsActive4()) return frameGesturesIsActive7();
  if (
    frameGesturesIsActive2 === null ||
    resolveFrameGesturesValue5(frameGesturesIsActive3, frameGesturesIsActive8())
  )
    return frameGesturesIsActive6();
  let total: Dynamic = frameGesturesIsActive8() + 150;
  let frameGesturesIsActive10 = (..._extraArguments: unknown[]): undefined => {
    if (frameGesturesIsActive4()) {
      if (frameGesturesIsActive2()) {
        if (!frameGesturesIsActive5()) {
          frameGesturesIsActive6();
        }
      } else {
        if (frameGesturesIsActive8() < total) {
          frameGesturesIsActive9(frameGesturesIsActive10, 8);
        } else {
          frameGesturesIsActive6();
        }
      }
    } else {
      frameGesturesIsActive7();
    }
  };
  frameGesturesIsActive10();
}

function resolveFrameGesturesStale(
  error?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return error.stale ||
    !error.canServe ||
    !error.frameIsActive ||
    !error.pageHasFocus ||
    error.frame === null ||
    !resolveFrameGesturesOpenedAt2(error.gate, error.now)
    ? null
    : resolveFrameGesturesIsFinite(error.message, error.frame, error.view);
}

var frameGesturesSet3: Dynamic;

var resolveFrameGesturesValue6: Dynamic;

function ImagePickPopup(
  {
    at: at2,
    onChoose: onChoose,
    onClose: onClose,
    returnFocusTo: returnFocusTo,
    lifetimeMs = frameGesturesLimit20000,
    now = resolveFrameGesturesValue6,
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let initialFocus: Dynamic = (0, React.useRef)(null);
  let elementRef: Dynamic = (0, React.useRef)(null);
  let anchor: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => ({
      getBoundingClientRect: (..._extraArguments: unknown[]): Dynamic =>
        new (DOMRect as Dynamic)(at2.x, at2.y, 0, 0),
    }),
    [at2.x, at2.y],
  );
  let onCloseRef: Dynamic = (0, React.useRef)(onClose);
  onCloseRef.current = onClose;
  let nowRef: Dynamic = (0, React.useRef)(now);
  nowRef.current = now;
  let enabledRef: Dynamic = (0, React.useRef)(false);
  let onClose2: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): undefined => {
      if (!enabledRef.current) {
        enabledRef.current = true;
        onCloseRef.current();
      }
    },
    [],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let setTimeout2 = setTimeout(onClose2, lifetimeMs);
      return (..._extraArguments: unknown[]) => clearTimeout(setTimeout2);
    },
    [lifetimeMs, onClose2],
  );
  let enabledRef2: Dynamic = (0, React.useRef)(false);
  let elementRef2: Dynamic = (0, React.useRef)(null);
  let itemsRef: Dynamic = (0, React.useRef)([]);
  let cancelAnimationFrame2: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): undefined => {
      for (let imagePickPopupResult of itemsRef.current as Dynamic)
        cancelAnimationFrame(imagePickPopupResult);
      itemsRef.current = [];
    },
    [],
  );
  let requestAnimationFrame2: Dynamic = (0, React.useCallback)(
    (..._extraArguments: unknown[]): undefined => {
      if (
        elementRef.current === null ||
        elementRef2.current !== null ||
        itemsRef.current.length > 0
      )
        return;
      let requestAnimationFrame3 = (
        ..._extraArguments: unknown[]
      ): undefined => {
        itemsRef.current = [];
        let element: Dynamic = elementRef.current;
        if (element !== null) {
          if (getComputedStyle(element).visibility === `visible`) {
            elementRef2.current = nowRef.current();
          } else {
            itemsRef.current = [requestAnimationFrame(requestAnimationFrame3)];
          }
        }
      };
      itemsRef.current = [
        requestAnimationFrame((..._extraArguments: unknown[]): undefined => {
          itemsRef.current = [requestAnimationFrame(requestAnimationFrame3)];
        }),
      ];
    },
    [],
  );
  let cancelAnimationFrame3: Dynamic = (0, React.useCallback)(
    (imagePickPopup?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      elementRef.current = imagePickPopup;
      if (imagePickPopup !== null) return requestAnimationFrame2();
      cancelAnimationFrame2();
      elementRef2.current = null;
      enabledRef2.current = false;
    },
    [cancelAnimationFrame2, requestAnimationFrame2],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => (
      requestAnimationFrame2(),
      cancelAnimationFrame2
    ),
    [requestAnimationFrame2, cancelAnimationFrame2],
  );
  let updateElement = (
    imagePickPopup?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (elementRef2.current !== null) {
      elementRef2.current = Math.max(elementRef2.current, imagePickPopup);
    }
  };
  let updateElement2: Dynamic = (
    imagePickPopup?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    resolveFrameGesturesValue3(elementRef2.current, imagePickPopup)
      ? true
      : (updateElement(imagePickPopup), false);
  return (
    <Popover.Root
      open={true}
      modal={true}
      onOpenChange={(
        imagePickPopup?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => void (imagePickPopup || onClose2())}
    >
      <Popover.Popup
        ref={initialFocus}
        anchor={anchor}
        side={`bottom`}
        align={`start`}
        sideOffset={4}
        padding={`xs`}
        aria-label={FrameGestures_ChooseImages}
        initialFocus={initialFocus}
        finalFocus={returnFocusTo}
        onKeyDown={(
          event?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (frameGesturesSet3.has(event.key)) return;
          if (event.repeat) {
            event.preventDefault();
            event.stopPropagation();
            return;
          }
          let matchesTarget = event.target === elementRef.current;
          let frameGesturesValue4 = resolveFrameGesturesValue4(
            event.timeStamp,
            nowRef.current(),
          );
          if (
            matchesTarget &&
            enabledRef2.current &&
            (event.key === `Enter` || event.key === ` `)
          ) {
            if (!updateElement2(frameGesturesValue4)) {
              event.preventDefault();
            }
            return;
          }
          let ctrlKey: Dynamic = event.ctrlKey || event.metaKey || event.altKey;
          if (event.key === `Tab` && !matchesTarget && !ctrlKey) {
            event.preventDefault();
            event.stopPropagation();
            updateElement(frameGesturesValue4);
            elementRef.current?.focus({
              focusVisible: true,
            });
            enabledRef2.current =
              elementRef.current !== null &&
              document.activeElement === elementRef.current;
            return;
          }
          event.stopPropagation();
          if (!ctrlKey) {
            event.preventDefault();
          }
          onClose2();
        }}
        data-testid={`image-pick-popup`}
      >
        <Button
          ref={cancelAnimationFrame3}
          variant={`secondary`}
          size={`sm`}
          icon={`Image`}
          onClick={(
            imagePickPopup?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (!enabledRef.current) {
              if (
                updateElement2(
                  resolveFrameGesturesValue4(
                    imagePickPopup.timeStamp,
                    nowRef.current(),
                  ),
                )
              ) {
                onChoose();
                onClose2();
              }
            }
          }}
          data-testid={`image-pick-button`}
        >
          {FrameGestures_ChooseImages}
        </Button>
      </Popover.Popup>
    </Popover.Root>
  );
}

var resolveFrameGesturesValue7: (frameGesturesValue7?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolveFrameGesturesValue8: (frameGesturesValue8?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolveFrameGesturesValue9: (frameGesturesValue9?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => string;

var frameGesturesLimit642: number;

var frameGesturesLimit25: number;

var frameGesturesMap2: Dynamic;

function updateFrameGesturesDelete2(
  updateFrameGesturesDelete22?: Dynamic,
  name?: Dynamic,
  context: Dynamic = Date.now(),
  ..._extraArguments: unknown[]
): undefined {
  frameGesturesMap2.delete(updateFrameGesturesDelete22);
  frameGesturesMap2.set(updateFrameGesturesDelete22, {
    name: name,
    at: context,
  });
  if (frameGesturesMap2.size > frameGesturesLimit642) {
    frameGesturesMap2.delete(frameGesturesMap2.keys().next().value);
  }
}

function clearFrameGesturesIsArray(
  items?: Dynamic,
  options: Dynamic = Date.now(),
  ..._extraArguments: unknown[]
): Dynamic {
  let items2: Dynamic = [];
  if (!Array.isArray(items)) return items2;
  for (
    let index = 0;
    index < items.length && index < frameGesturesLimit25;
    index++
  ) {
    let itemItem: Dynamic = items[index];
    if (typeof itemItem != `string` || !editorHostPattern3.test(itemItem))
      continue;
    let frameGesturesMap2Entry: Dynamic = frameGesturesMap2.get(itemItem);
    if (frameGesturesMap2Entry !== undefined) {
      frameGesturesMap2.delete(itemItem);
      if (options - frameGesturesMap2Entry.at <= 6e5) {
        items2.push(frameGesturesMap2Entry.name);
      }
    }
  }
  return items2;
}

var frameGesturesSet4: Dynamic;

var frameGesturesLimit4000: number;

var frameGesturesLimit16: number;

var FrameGesturesState9: number;

function resolveFrameGesturesEvery(
  items?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let resolveFrameGesturesEveryHandler = (
    frameGesturesEvery?: Dynamic,
    ..._extraArguments: unknown[]
  ) => (items[frameGesturesEvery] << 8) | items[frameGesturesEvery + 1];
  let resolveFrameGesturesEveryHandler2 = (
    frameGesturesEvery?: Dynamic,
    ..._extraArguments: unknown[]
  ) => items[frameGesturesEvery] | (items[frameGesturesEvery + 1] << 8);
  let resolveFrameGesturesEveryHandler3 = (
    frameGesturesEvery?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    resolveFrameGesturesEveryHandler2(frameGesturesEvery) |
    (items[frameGesturesEvery + 2] << 16);
  let resolveFrameGesturesEveryHandler4: Dynamic = (
    frameGesturesEvery?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    [...options].every(
      (item?: Dynamic, index?: Dynamic, ..._extraArguments: unknown[]) =>
        items[frameGesturesEvery + index] === item.charCodeAt(0),
    );
  if (
    items.length >= 24 &&
    items[0] === 137 &&
    resolveFrameGesturesEveryHandler4(1, `PNG`) &&
    resolveFrameGesturesEveryHandler4(12, `IHDR`)
  )
    return {
      w:
        resolveFrameGesturesEveryHandler(16) * 65536 +
        resolveFrameGesturesEveryHandler(18),
      h:
        resolveFrameGesturesEveryHandler(20) * 65536 +
        resolveFrameGesturesEveryHandler(22),
    };
  if (
    items.length >= 10 &&
    (resolveFrameGesturesEveryHandler4(0, `GIF87a`) ||
      resolveFrameGesturesEveryHandler4(0, `GIF89a`))
  )
    return {
      w: resolveFrameGesturesEveryHandler2(6),
      h: resolveFrameGesturesEveryHandler2(8),
    };
  if (
    items.length >= 30 &&
    resolveFrameGesturesEveryHandler4(0, `RIFF`) &&
    resolveFrameGesturesEveryHandler4(8, `WEBP`)
  ) {
    if (resolveFrameGesturesEveryHandler4(12, `VP8X`))
      return {
        w: resolveFrameGesturesEveryHandler3(24) + 1,
        h: resolveFrameGesturesEveryHandler3(27) + 1,
      };
    if (resolveFrameGesturesEveryHandler4(12, `VP8L`) && items[20] === 47) {
      let amount =
        resolveFrameGesturesEveryHandler2(21) |
        (resolveFrameGesturesEveryHandler2(23) << 16);
      return {
        w: (amount & 16383) + 1,
        h: ((amount >>> 14) & 16383) + 1,
      };
    }
    return resolveFrameGesturesEveryHandler4(12, `VP8 `) &&
      items[23] === 157 &&
      items[24] === 1 &&
      items[25] === 42
      ? {
          w: resolveFrameGesturesEveryHandler2(26) & 16383,
          h: resolveFrameGesturesEveryHandler2(28) & 16383,
        }
      : null;
  }
  if (items.length >= 4 && items[0] === 255 && items[1] === 216) {
    let count: Dynamic = 2;
    for (; count + 9 < items.length && items[count] === 255; ) {
      let itemItem: Dynamic = items[count + 1];
      if (itemItem === 255) count++;
      else if (itemItem === 1 || (itemItem >= 208 && itemItem <= 215))
        count += 2;
      else if (itemItem === 218 || itemItem === 217) return null;
      else if (
        itemItem >= 192 &&
        itemItem <= 207 &&
        itemItem !== 196 &&
        itemItem !== 200 &&
        itemItem !== 204
      )
        return {
          w: resolveFrameGesturesEveryHandler(count + 7),
          h: resolveFrameGesturesEveryHandler(count + 5),
        };
      else count += 2 + resolveFrameGesturesEveryHandler(count + 2);
    }
  }
  return null;
}

var FrameGesturesHead: Dynamic;

var FrameGesturesVideo: Dynamic;

function installFrameGesturesWidth(
  installFrameGesturesWidth2?: Dynamic,
  scheduler: Dynamic = FrameGesturesVideo,
  ..._extraArguments: unknown[]
): Dynamic {
  return new (Promise as Dynamic)(
    (
      resolve?: Dynamic,
      reject?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let video: Dynamic = scheduler.video();
      let address: Dynamic = scheduler.address(installFrameGesturesWidth2);
      let enabled = false;
      let withdraw = (
        installFrameGesturesWidth3?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (!enabled) {
          enabled = true;
          scheduler.cancel(schedule);
          try {
            video.removeAttribute(`src`);
            video.load();
          } finally {
            scheduler.withdraw(address);
            installFrameGesturesWidth3();
          }
        }
      };
      let schedule: Dynamic = scheduler.schedule(
        (..._extraArguments: unknown[]) =>
          withdraw(
            (..._extraArguments: unknown[]): Dynamic =>
              reject(Error(`video header: timed out`)),
          ),
        frameGesturesLimit4000,
      );
      video.preload = `metadata`;
      video.addEventListener(
        `loadedmetadata`,
        (..._extraArguments: unknown[]): undefined => {
          let record: Dynamic = {
            width: video.videoWidth,
            height: video.videoHeight,
          };
          withdraw((..._extraArguments: unknown[]): Dynamic => resolve(record));
        },
      );
      video.addEventListener(`error`, (..._extraArguments: unknown[]) =>
        withdraw(
          (..._extraArguments: unknown[]): Dynamic =>
            reject(Error(`video header: unreadable`)),
        ),
      );
      video.src = address;
    },
  );
}

async function loadFrameGesturesSize(
  items?: Dynamic,
  options?: Dynamic,
  context: Dynamic = FrameGesturesHead,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let itemItem: Dynamic = items.length === 1 ? items[0] : undefined;
  if (!itemItem || itemItem.size <= 0 || itemItem.size > options) return null;
  if (platformImagesAndBlobsSet2.has(itemItem.type))
    try {
      if (
        resolveObservabilityBrowserAndOperationEventsVideoWebm(
          await context.head(itemItem, frameGesturesLimit16),
        ) !== itemItem.type
      )
        return null;
      let videoSize: Dynamic = await context.videoSize(itemItem);
      return resolveEditorHostValue21(videoSize.width, videoSize.height);
    } catch {
      return null;
    }
  if (!frameGesturesSet4.has(itemItem.type)) return null;
  try {
    let frameGesturesEvery = resolveFrameGesturesEvery(
      await context.head(itemItem, FrameGesturesState9),
    );
    if (
      !frameGesturesEvery ||
      !(frameGesturesEvery.w * frameGesturesEvery.h <= 5e7)
    )
      return null;
    let decode: Dynamic = await context.decode(itemItem);
    try {
      return resolveEditorHostValue21(decode.width, decode.height);
    } finally {
      decode.close?.();
    }
  } catch {
    return null;
  }
}

function resolveFrameGesturesOpen(
  frameGesturesOpen?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument: Dynamic = loadFrameGesturesSize,
  argument2?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let resolveFrameGesturesOpenResult: Dynamic = ++frameGesturesOpen.seq;
  let argument3: Dynamic = argument2 ?? resolveFrameGesturesOpenResult;
  frameGesturesOpen.open++;
  let enabled = true;
  argument(options, context).then(
    (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (
        result &&
        enabled &&
        frameGesturesOpen.seq === resolveFrameGesturesOpenResult &&
        frameGesturesOpen.open === 1
      ) {
        dependencies({
          type: `pending-box`,
          w: result.w,
          h: result.h,
          g: argument3,
        });
      }
    },
    (..._extraArguments: unknown[]): undefined => {},
  );
  return Object.assign(
    (..._extraArguments: unknown[]): undefined => {
      if (enabled) {
        frameGesturesOpen.open--;
      }
      enabled = false;
    },
    {
      g: argument3,
    },
  );
}

var frameGesturesSet5: Dynamic;

function resolveFrameGesturesExec(
  frameGesturesExec?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let match = /^(?:door (?:batch )?)?(\d{3})\b/.exec(frameGesturesExec);
  return match ? Number(match[1]) : null;
}

function resolveFrameGesturesValue10(
  frameGesturesValue10?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let frameGesturesExec = resolveFrameGesturesExec(frameGesturesValue10);
  return frameGesturesExec !== null && frameGesturesSet5.has(frameGesturesExec);
}

function resolveFrameGesturesTest(
  frameGesturesTest?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return editorHostPattern3.test(frameGesturesTest) ||
    /^[0-9a-f]{64}$/.test(frameGesturesTest)
    ? frameGesturesTest
    : `invalid`;
}

function resolveFrameGesturesLayer(
  event?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    layer: `host`,
    name: `image.bytes_gone`,
    road: event.road,
    lane: event.lane,
    status: event.status,
    blob: resolveFrameGesturesTest(event.key),
    pid: event.pid,
    session: event.session,
    build: event.build ?? `259dc54003a391cffb50b52b94c913ed15d92d1c`,
  };
}

var FrameGesturesRing: Dynamic;

function resolveFrameGesturesLayer2(
  frameGesturesLayer2?: Dynamic,
  options: Dynamic = FrameGesturesRing,
  ..._extraArguments: unknown[]
): Dynamic {
  let frameGesturesLayer: Dynamic =
    resolveFrameGesturesLayer(frameGesturesLayer2);
  let {
    layer: frameGesturesLayer3,
    name: frameGesturesLayer4,
    ...frameGesturesLayer5
  }: Dynamic = frameGesturesLayer;
  options.ring(frameGesturesLayer3, frameGesturesLayer4, frameGesturesLayer5);
  options.log({
    source: `other`,
    message: `${frameGesturesLayer4} ${frameGesturesLayer.road}/${frameGesturesLayer.lane} ${frameGesturesLayer.status ?? `-`} ${frameGesturesLayer.blob}`,
    path: frameGesturesLayer.pid
      ? `project/${frameGesturesLayer.pid}`
      : undefined,
    detail: JSON.stringify(frameGesturesLayer5),
    silent: true,
  });
  return frameGesturesLayer;
}

function useFrameGesturesWanted(
  {
    wanted: wanted,
    jump: jump,
    ready: ready,
    post: post,
    focusFrame: focusFrame,
    onOutline: onOutline,
    onOutlineAt: onOutlineAt,
  }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let wantedRef: Dynamic = (0, React.useRef)(wanted);
  wantedRef.current = wanted;
  let onOutlineRef: Dynamic = (0, React.useRef)(onOutline);
  onOutlineRef.current = onOutline;
  let onOutlineAtRef: Dynamic = (0, React.useRef)(onOutlineAt);
  onOutlineAtRef.current = onOutlineAt;
  let postRef: Dynamic = (0, React.useRef)(post);
  postRef.current = post;
  let focusFrameRef: Dynamic = (0, React.useRef)(focusFrame);
  focusFrameRef.current = focusFrame;
  let enabledRef: Dynamic = (0, React.useRef)(false);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (!ready) {
        enabledRef.current = false;
      }
    },
    [ready],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (!(!ready || wanted === enabledRef.current)) {
        if (
          postRef.current({
            type: `outline-want`,
            on: wanted,
          })
        ) {
          enabledRef.current = wanted;
        }
      }
    },
    [ready, wanted],
  );
  let n5: Dynamic = jump?.n;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (!ready || jump === null) return;
      let activeElement =
        jump.focus === true && typeof document !== "undefined"
          ? document.activeElement
          : null;
      let matchesFocus =
        jump.focus === true && focusFrameRef.current?.() === true;
      let post2: Dynamic = postRef.current({
        type: `jump-to`,
        frag: jump.frag,
        ...(matchesFocus && {
          focus: true,
        }),
      });
      if (
        matchesFocus &&
        !post2 &&
        activeElement instanceof HTMLElement &&
        activeElement.isConnected
      ) {
        activeElement.focus({
          preventScroll: true,
        });
      }
    },
    [n5],
  );
  return {
    heard: (0, React.useCallback)(
      (
        frameGesturesWanted?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let activity: Dynamic = resolveDataOperationControlOutline(
          wantedRef.current,
          frameGesturesWanted,
        );
        if (activity !== null) {
          if (`outline` in activity) {
            onOutlineRef.current?.(activity.outline);
          } else {
            onOutlineAtRef.current?.(activity.at, activity.byPerson);
          }
        }
      },
      [],
    ),
  };
}

var frameGesturesSet6: Dynamic;

function resolveFrameGesturesValue11(
  frameGesturesValue11?: unknown,
  ..._extraArguments: unknown[]
) {
  return typeof frameGesturesValue11 == `string` &&
    frameGesturesSet6.has(frameGesturesValue11)
    ? frameGesturesValue11
    : undefined;
}

var frameGesturesSet7: Dynamic;

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeFrameGesturesState1Step1(): void {
  (FrameGestures_Message = `Docs was updated. You can’t undo changes from before the update.`);
  (FrameGesturesBack = {
    back: `${FrameGestures_Message} Your cursor is where you left it.`,
    away: `${FrameGestures_Message} Move back into the text to keep editing.`,
    moved: `${FrameGestures_Message} Your cursor moved from where you left it.`,
  });
  (frameGesturesLimit1000 = 1e3);
  (frameGesturesLimit10000 = 1e4);
  (frameGesturesLimit10002 = 1e3);
  (frameGesturesLimit15000 = 15e3);
  (FrameGesturesRestored = {
    restored: `back`,
    primedInText: `moved`,
    elsewhereInText: `moved`,
    notInText: `away`,
  });
  (FrameGesturesState = false);
  (FrameGesturesState2 = null);
  (FrameGesturesState3 = false);
  (FrameGesturesState4 = []);
  (frameGesturesSet = new Set());
  (resolveFrameGesturesValue = (): KeyboardSeat | undefined =>
    FrameGesturesState4[FrameGesturesState4.length - 1]);
  (frameGesturesLimit64 = 64);
  (frameGesturesLimit200000 = 2e5);
  (FrameGestures_BongoCollapsedHeadings = `bongo.collapsed-headings`);
  (frameGesturesLimit400 = 400);
  (frameGesturesMap = new Map());
  (FrameGesturesState5 = false);
  (FrameGesturesState6 = false);
  (frameGesturesSet2 = new Set());
  (FrameGesturesState7 = null);
  (FrameGesturesState8 = false);
  (frameGesturesLimit3 = 3);
  (FrameGestures_ChooseImages = `Choose images`);
  (frameGesturesLimit20000 = 2e4);
  (FrameGesturesWidth = {
    width: 200,
    height: 52,
  });
  (resolveFrameGesturesOpenedAt = (): OpenWindow => ({
    openedAt: null,
    closedAt: -1 / 0,
  }));
  (resolveFrameGesturesOpenedAt2 = (
    frameGesturesOpened: OpenWindow,
    options: number,
  ): boolean =>
    frameGesturesOpened.openedAt === null &&
    options - frameGesturesOpened.closedAt >= 1e3);
  (resolveFrameGesturesValue3 = (
    frameGesturesValue3: number | null,
    options: number,
    context: number = 400,
  ): boolean =>
    frameGesturesValue3 !== null && options - frameGesturesValue3 >= context);
  (resolveFrameGesturesValue4 = (
    frameGesturesValue4: number,
    options: number,
  ): number =>
    frameGesturesValue4 > 0 && frameGesturesValue4 <= options
      ? frameGesturesValue4
      : options);
  (resolveFrameGesturesValue5 = (
    frameGesturesValue5?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => frameGesturesValue5 !== null && options - frameGesturesValue5 < 7e3);
  (frameGesturesSet3 = new (Set as Dynamic)([
    `Shift`,
    `Control`,
    `Alt`,
    `AltGraph`,
    `Meta`,
    `OS`,
    `Fn`,
    `CapsLock`,
    `NumLock`,
    `ScrollLock`,
    `ContextMenu`,
  ]));
  (resolveFrameGesturesValue6 = (..._extraArguments: unknown[]) =>
    performance.now());
  (resolveFrameGesturesValue7 = (
    frameGesturesValue7?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `Couldn't add "${frameGesturesValue7}" — try again.`);
  (resolveFrameGesturesValue8 = (
    frameGesturesValue8?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `“${frameGesturesValue8}” isn’t a supported file type. Use a PNG, JPEG, GIF, or WebP image, or an MP4 or WebM video.`);
  (resolveFrameGesturesValue9 = (
    frameGesturesValue9?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    `“${frameGesturesValue9}” is too large to add (20 MB max).${options ? ` Trim or compress it first.` : ``}`);
  (frameGesturesLimit642 = 64);
  (frameGesturesLimit25 = 25);
  (frameGesturesMap2 = new (Map as Dynamic)());
  (frameGesturesSet4 = new (Set as Dynamic)([
    `image/png`,
    `image/jpeg`,
    `image/gif`,
    `image/webp`,
  ]));
  (frameGesturesLimit4000 = 4e3);
  (frameGesturesLimit16 = 16);
  (FrameGesturesState9 = 256 * 1024);
  (FrameGesturesHead = {
    head: async (
      frameGesturesHead?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Promise<Dynamic> =>
      new Uint8Array(await frameGesturesHead.slice(0, options).arrayBuffer()),
    decode: (frameGesturesHead?: Dynamic, ..._extraArguments: unknown[]) =>
      createImageBitmap(frameGesturesHead, {
        imageOrientation: `from-image`,
      }).catch((..._extraArguments: unknown[]) =>
        createImageBitmap(frameGesturesHead),
      ),
    videoSize: (
      frameGesturesHead?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => installFrameGesturesWidth(frameGesturesHead),
  });
  (FrameGesturesVideo = {
    video: (..._extraArguments: unknown[]) => document.createElement(`video`),
    address: (frameGesturesVideo?: Dynamic, ..._extraArguments: unknown[]) =>
      URL.createObjectURL(frameGesturesVideo),
    withdraw: (frameGesturesVideo?: Dynamic, ..._extraArguments: unknown[]) =>
      URL.revokeObjectURL(frameGesturesVideo),
    schedule: (
      frameGesturesVideo?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) => setTimeout(frameGesturesVideo, options),
    cancel: (frameGesturesVideo?: Dynamic, ..._extraArguments: unknown[]) =>
      clearTimeout(frameGesturesVideo),
  });
  (frameGesturesSet5 = new (Set as Dynamic)([403, 404, 410, 451]));
  (FrameGesturesRing = {
    ring: resolveCommentsStoreLayer,
    log: logError,
  });
  (frameGesturesSet6 = new (Set as Dynamic)(
    `requestIdleCallback.cancelIdleCallback.requestAnimationFrame.cancelAnimationFrame.queueMicrotask.structuredClone.reportError.scheduler.setImmediate.clearImmediate.ResizeObserver.IntersectionObserver.MutationObserver.PerformanceObserver.ReportingObserver.AbortController.AbortSignal.BroadcastChannel.MessageChannel.MessagePort.MessageEvent.Worker.SharedWorker.WebSocket.EventSource.fetch.Headers.Request.Response.FormData.URL.URLSearchParams.URLPattern.XMLHttpRequest.TextEncoder.TextDecoder.TextEncoderStream.TextDecoderStream.CompressionStream.DecompressionStream.ReadableStream.WritableStream.TransformStream.Blob.File.FileReader.SharedArrayBuffer.Atomics.BigInt.BigInt64Array.BigUint64Array.WebAssembly.globalThis.WeakRef.FinalizationRegistry.AggregateError.Intl.Temporal.Iterator.Reflect.Proxy.Symbol.Promise.crypto.indexedDB.localStorage.sessionStorage.caches.cookieStore.navigator.navigation.performance.trustedTypes.CSS.CSSStyleSheet.Highlight.customElements.ShadowRoot.DOMParser.XMLSerializer.DOMRect.DOMRectReadOnly.DOMMatrix.DOMPoint.StaticRange.Selection.getSelection.EditContext.matchMedia.visualViewport.VisualViewport.ViewTransition.PointerEvent.InputEvent.ClipboardItem.ClipboardEvent.CustomEvent.ErrorEvent.PromiseRejectionEvent.EventTarget.HTMLDialogElement.HTMLSlotElement.OffscreenCanvas.ImageBitmap.createImageBitmap.Path2D.ImageData.process.global.Buffer.require.module.exports.regeneratorRuntime.webkit.chrome`
      .split(`.`)
      .map(
        (labelPart?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          labelPart.toLowerCase(),
      ),
  ));
  (frameGesturesSet7 = new (Set as Dynamic)([
    `async`,
    `handler`,
    `rejection`,
  ]));
}

export {
  ImagePickPopup,
  clearFrameGesturesIsArray,
  frameGesturesSet7,
  getFrameGesturesValue,
  getFrameGesturesValue2,
  installFrameGesturesValue,
  isFrameGesturesDisplayOn,
  resolveFrameGesturesAccept,
  resolveFrameGesturesExec,
  resolveFrameGesturesHasFocus,
  resolveFrameGesturesIds,
  resolveFrameGesturesIsActive,
  resolveFrameGesturesIsArray,
  resolveFrameGesturesIsFinite,
  resolveFrameGesturesKeyboard,
  resolveFrameGesturesKeyboard2,
  resolveFrameGesturesLayer2,
  resolveFrameGesturesOpen,
  resolveFrameGesturesOpenedAt,
  resolveFrameGesturesOpenedAt2,
  resolveFrameGesturesRoom,
  resolveFrameGesturesRowsPin,
  resolveFrameGesturesStale,
  resolveFrameGesturesValue,
  resolveFrameGesturesValue10,
  resolveFrameGesturesValue11,
  resolveFrameGesturesValue2,
  resolveFrameGesturesValue3,
  resolveFrameGesturesValue4,
  resolveFrameGesturesValue7,
  resolveFrameGesturesValue8,
  resolveFrameGesturesValue9,
  updateFrameGesturesAnchor,
  updateFrameGesturesDelete,
  updateFrameGesturesDelete2,
  updateFrameGesturesParse,
  updateFrameGesturesSize,
  updateFrameGesturesVisibilityState,
  useFrameGesturesWanted,
};
