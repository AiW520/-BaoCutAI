/** doc-font-control: restored from DocFontControl-YP-wmLFC.js. */
import { originalJsxProps } from "../../react-runtime/jsx-runtime";
import type { Dynamic } from "../../interop/legacy-dynamic";
import { r as toModuleNamespace } from "../../boot/module-runtime";
import {
  BM as resolvePlatformFeatureFlagsHasFocus,
  HM as loadReact,
  UE as loadJsxRuntime,
  VM as usePlatformFeatureFlagsPress,
  ls as resolveDataOperationControlValue3,
  vx as toast,
} from "../../platform/index";
import { A as Popover, h as SegmentedControl } from "../../design-system/index";
import {
  Ft as serializeDocumentFonts,
  Mt as setDocumentFonts,
  Nt as applyDocumentFontsIfCurrent,
  Pt as equalDocumentFonts,
  W as TabRailButton,
  i as canClosePagebarOnFocusLeave,
  jt as getDocumentFontGeneration,
} from "../index";
import { t as PropertyRow } from "../../design-system/property-row";
import { t as enqueueStyleWrite } from "../../document/style-write-chain";
var React: Dynamic = toModuleNamespace(loadReact(), 1);
var jsxRuntime: Dynamic = loadJsxRuntime();
function readDocumentFontChoice(
  choice?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let style: Dynamic = serializeDocumentFonts(choice);
  return {
    headingFont: style.headingFont,
    textFont: style.textFont,
  };
}
var FONT_COPY: Dynamic = {
  button: `Font`,
  headings: `Headings`,
  text: `Text`,
  headingsName: `Headings font`,
  textName: `Text font`,
  serif: `Serif`,
  sans: `Sans`,
  refused: `Couldn’t save the font choice. The document is back to its saved fonts.`,
  notSent: `Couldn’t save the font choice. The document is back to its saved fonts. Try again.`,
};
var FONT_FAILURE_TOAST_KEY: string = `doc-font-failed`;
var fontOption: Dynamic = (
  font?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => ({
  value: font,
  label: FONT_COPY[font],
});
var FONT_OPTIONS: Dynamic = [fontOption(`serif`), fontOption(`sans`)];
function DocFontControl(
  { seat: seat }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [open, setOpen]: Dynamic = (0, React.useState)(false);
  let openRef: Dynamic = (0, React.useRef)(open);
  openRef.current = open;
  usePlatformFeatureFlagsPress(open, setOpen);
  let popupRef: Dynamic = (0, React.useRef)(null);
  let finalFocus: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      resolvePlatformFeatureFlagsHasFocus(
        canClosePagebarOnFocusLeave(popupRef),
      ),
    [],
  );
  let [optimisticChoice, setOptimisticChoice]: Dynamic = (0, React.useState)(
    null,
  );
  let [failure, setFailure]: Dynamic = (0, React.useState)(null);
  let [failureIsQuiet, setFailureIsQuiet]: Dynamic = (0, React.useState)(true);
  let failureWasShown: Dynamic = (0, React.useRef)(false);
  let choice: Dynamic = optimisticChoice ?? seat.typography;
  let choiceRef: Dynamic = (0, React.useRef)(choice);
  choiceRef.current = choice;
  let seatRef: Dynamic = (0, React.useRef)(seat);
  seatRef.current = seat;
  let pendingChoice: Dynamic = (0, React.useRef)(null);
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
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (pendingChoice.current === null) {
        setOptimisticChoice(null);
      }
    },
    [seat.typography.headings, seat.typography.text],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (open && failure !== null && !failureIsQuiet) {
        failureWasShown.current = true;
      }
    },
    [open, failure, failureIsQuiet],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (!open && failureWasShown.current) {
        setFailureIsQuiet(true);
      }
    },
    [open],
  );
  let writeChoice: Dynamic = (0, React.useCallback)(
    (docFontControl?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let seat2: Dynamic = seatRef.current;
      if (
        seat2.post === undefined ||
        equalDocumentFonts(
          docFontControl,
          pendingChoice.current ?? choiceRef.current,
        )
      )
        return;
      pendingChoice.current = docFontControl;
      setFailure(null);
      failureWasShown.current = false;
      setOptimisticChoice(docFontControl);
      let docFontControlResult: number = getDocumentFontGeneration(seat2.pid);
      setDocumentFonts(seat2.pid, docFontControl);
      enqueueStyleWrite(seat2.pid, {
        change: readDocumentFontChoice(docFontControl),
        road: (..._extraArguments: unknown[]): Dynamic => seatRef.current,
      })
        .then((result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          resolveDataOperationControlValue3(
            `font:${docFontControl.headings}_${docFontControl.text}`,
            result,
          );
          if (pendingChoice.current === docFontControl) {
            pendingChoice.current = null;
            if (result !== `allowed`) {
              if (!(result === `left` || result === `superseded`)) {
                if (
                  applyDocumentFontsIfCurrent(
                    seat2.pid,
                    seatRef.current.typography,
                    docFontControlResult,
                  )
                ) {
                  if (!mountedRef.current || !openRef.current) {
                    toast.error(FONT_COPY[result], {
                      id: FONT_FAILURE_TOAST_KEY,
                    });
                  }
                  if (mountedRef.current) {
                    setOptimisticChoice(null);
                    setFailure(result);
                    setFailureIsQuiet(false);
                  }
                }
              }
            }
          }
        })
        .catch((..._extraArguments: unknown[]): undefined => {});
    },
    [],
  );
  let announceFailure: Dynamic = !failureIsQuiet && open;
  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        render={
          <TabRailButton
            iconOnly={true}
            icon={`Styles`}
            label={FONT_COPY.button}
            data-testid={`doc-font-button`}
          />
        }
      />
      <Popover.Popup
        ref={popupRef}
        finalFocus={finalFocus}
        side={`bottom`}
        align={`start`}
        sideOffset={4}
        padding={`md`}
        className={`w-76`}
        aria-label={FONT_COPY.button}
        data-testid={`doc-font-panel`}
      >
        <PropertyRow label={FONT_COPY.headings}>
          <SegmentedControl
            aria-label={FONT_COPY.headingsName}
            fullWidth={true}
            value={choice.headings}
            onChange={(
              docFontControl?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              writeChoice({
                ...choice,
                headings: docFontControl,
              })
            }
            segments={FONT_OPTIONS}
          />
        </PropertyRow>
        <PropertyRow label={FONT_COPY.text}>
          <SegmentedControl
            aria-label={FONT_COPY.textName}
            fullWidth={true}
            value={choice.text}
            onChange={(
              docFontControl?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              writeChoice({
                ...choice,
                text: docFontControl,
              })
            }
            segments={FONT_OPTIONS}
          />
        </PropertyRow>
        {failure ? (
          <p
            {...originalJsxProps(
              {
                role: announceFailure ? `alert` : undefined,
                className: `text-footnote text-danger pt-1`,
                "data-testid": `doc-font-error`,
                children: FONT_COPY[failure],
              },
              (announceFailure ? `alert:` : `quiet:`) + failure,
            )}
          />
        ) : null}
      </Popover.Popup>
    </Popover.Root>
  );
}
export { DocFontControl };
