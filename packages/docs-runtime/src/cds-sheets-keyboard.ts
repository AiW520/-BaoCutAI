/** BaoCut: sheets keyboard from cds-CIGM-LUe.js. */
import type { Dynamic } from "./types";

var sheetsValue_100000000: Dynamic;

var SheetsState8: Dynamic;

var sheetsWeakSet: Dynamic;

function resolveSheetsTest(..._extraArguments: unknown[]): Dynamic {
  return typeof window === "undefined"
    ? false
    : /Apple Computer/.test((window as Dynamic).navigator.vendor);
}

function resolveSheetsValue5(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  SheetsState8 = input;
}

function resolveSheetsEnter(
  event?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (
    event.key !== `Enter` ||
    event.shiftKey ||
    event.altKey ||
    event.keyCode === 229 ||
    event.isComposing === true ||
    event.nativeEvent?.isComposing === true
  ) {
    SheetsState8 = sheetsValue_100000000;
  }
}

function resolveSheetsIsComposing(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return input.isComposing || input.keyCode === 229
    ? ((SheetsState8 = sheetsValue_100000000), true)
    : sheetsWeakSet.has(input)
      ? true
      : resolveSheetsTest() && Math.abs(input.timeStamp - SheetsState8) < 500
        ? ((SheetsState8 = sheetsValue_100000000),
          input.metaKey || input.ctrlKey
            ? false
            : (sheetsWeakSet.add(input), true))
        : false;
}

var sheetsSet3: Dynamic;

var sheetsBeforeinputKeydownKeyupCompositionstartValues: Dynamic;

function installSheetsCapture(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (!sheetsWeakSet.has(input)) return;
  let value: Dynamic = input;
  let value2 = (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    if (event !== value) {
      for (let value3 of sheetsBeforeinputKeydownKeyupCompositionstartValues as Dynamic)
        options.removeEventListener(value3, value2, {
          capture: true,
        });
      if (
        event.type === `beforeinput` &&
        `inputType` in event &&
        typeof event.inputType == `string` &&
        sheetsSet3.has(event.inputType)
      ) {
        event.preventDefault();
        context();
      }
    }
  };
  for (let value3 of sheetsBeforeinputKeydownKeyupCompositionstartValues as Dynamic)
    options.addEventListener(value3, value2, {
      capture: true,
    });
}

function resolveSheetsModifierKey(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    modifierKey: input.metaKey || input.ctrlKey,
    source: options,
  };
}

function resolveSheetsEnter2(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (
    input.key === `Enter` &&
    !input.shiftKey &&
    !input.altKey &&
    !input.isComposing &&
    (options || input.metaKey || input.ctrlKey)
  );
}

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeSheetsKeyboardStep1(): void {
  sheetsValue_100000000 = -1e8;
  SheetsState8 = sheetsValue_100000000;
  sheetsWeakSet = new (WeakSet as Dynamic)();
  sheetsSet3 = new (Set as Dynamic)([`insertParagraph`, `insertLineBreak`]);
  sheetsBeforeinputKeydownKeyupCompositionstartValues = [
    `beforeinput`,
    `keydown`,
    `keyup`,
    `compositionstart`,
    `focusout`,
  ];
}

export {
  installSheetsCapture,
  resolveSheetsEnter,
  resolveSheetsEnter2,
  resolveSheetsIsComposing,
  resolveSheetsModifierKey,
  resolveSheetsValue5,
};
