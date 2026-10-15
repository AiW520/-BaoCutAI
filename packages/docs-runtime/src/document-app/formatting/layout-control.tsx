/** doc-layout-control: restored from DocLayoutControl-B2yicOym.js. */

import type { Dynamic } from "../../interop/legacy-dynamic";
import { toModuleNamespace } from "../../boot/module-runtime";
import {
  loadJsxRuntime,
  loadReact,
  resolveDataOperationControlValue3,
  resolvePlatformFeatureFlagsHasFocus,
  toast,
  usePlatformFeatureFlagsPress,
} from "../../platform/index";
import {
  Popover,
  SegmentedControl,
} from "../../design-system/index";
import {
  applyDocumentLayoutIfCurrent,
  canClosePagebarOnFocusLeave,
  clearDocumentLayoutPickIfCurrent,
  equalDocumentLayouts,
  getDocumentDisplayGeneration,
  PAGE_WIDTH_PROPERTY,
  parseDocumentLayout,
  pickDocumentLayout,
  serializeDocumentLayout,
  TabRailButton,
} from "../index";
import { PropertyRow } from "../../design-system/property-row";
import { enqueueStyleWrite } from "../../document/style-write-chain";
var React: Dynamic = toModuleNamespace(loadReact(), 1);
var jsxRuntime: Dynamic = loadJsxRuntime();
function readDocumentLayoutChoice(
  choice?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    [PAGE_WIDTH_PROPERTY]: serializeDocumentLayout(choice)[PAGE_WIDTH_PROPERTY],
  };
}
var LAYOUT_COPY: Dynamic = {
  button: `Layout`,
  width: `Width`,
  widthName: `Page width`,
  default: `Default`,
  wide: `Wide`,
  refused: `Couldn’t save the layout choice. The document is back to its saved layout.`,
  notSent: `Couldn’t save the layout choice. The document is back to its saved layout. Try again.`,
};
var LAYOUT_FAILURE_TOAST_KEY: string = `doc-layout-failed`;
var PAGE_WIDTH_OPTIONS: Dynamic = [
  {
    value: `default`,
    label: LAYOUT_COPY.default,
  },
  {
    value: `wide`,
    label: LAYOUT_COPY.wide,
  },
];
function DocLayoutControl(
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
  let savedChoice: Dynamic = parseDocumentLayout(seat.style);
  let choice: Dynamic = optimisticChoice ?? savedChoice;
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
    [savedChoice.width],
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
    (docLayoutControl?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let seat2: Dynamic = seatRef.current;
      if (
        seat2.post === undefined ||
        equalDocumentLayouts(
          docLayoutControl,
          pendingChoice.current ?? choiceRef.current,
        )
      )
        return;
      pendingChoice.current = docLayoutControl;
      setFailure(null);
      failureWasShown.current = false;
      setOptimisticChoice(docLayoutControl);
      let docLayoutControlResult: Dynamic = getDocumentDisplayGeneration(
        seat2.pid,
      );
      pickDocumentLayout(seat2.pid, docLayoutControl);
      enqueueStyleWrite(seat2.pid, {
        change: readDocumentLayoutChoice(docLayoutControl),
        road: (..._extraArguments: unknown[]): Dynamic => seatRef.current,
      })
        .then((result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          resolveDataOperationControlValue3(
            `layout:${docLayoutControl.width}`,
            result,
          );
          if (pendingChoice.current === docLayoutControl) {
            pendingChoice.current = null;
            if (result !== `allowed`) {
              if (!(result === `left` || result === `superseded`)) {
                if (
                  mountedRef.current
                    ? applyDocumentLayoutIfCurrent(
                        seat2.pid,
                        parseDocumentLayout(seatRef.current.style),
                        docLayoutControlResult,
                      )
                    : clearDocumentLayoutPickIfCurrent(
                        seat2.pid,
                        docLayoutControlResult,
                      )
                ) {
                  if (!mountedRef.current || !openRef.current) {
                    toast.error(LAYOUT_COPY[result], {
                      id: LAYOUT_FAILURE_TOAST_KEY,
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
            icon={`ArrowsOut`}
            label={LAYOUT_COPY.button}
            data-testid={`doc-layout-button`}
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
        aria-label={LAYOUT_COPY.button}
        data-testid={`doc-layout-panel`}
      >
        <PropertyRow label={LAYOUT_COPY.width}>
          <SegmentedControl
            aria-label={LAYOUT_COPY.widthName}
            fullWidth={true}
            value={choice.width}
            onChange={(
              docLayoutControl?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic =>
              writeChoice({
                ...choice,
                width: docLayoutControl,
              })
            }
            segments={PAGE_WIDTH_OPTIONS}
          />
        </PropertyRow>
        {failure ? (
          <p
            role={announceFailure ? `alert` : undefined}
            className={`text-footnote text-danger pt-1`}
            data-testid={`doc-layout-error`}
            key={(announceFailure ? `alert:` : `quiet:`) + failure}
          >{LAYOUT_COPY[failure]}</p>
        ) : null}
      </Popover.Popup>
    </Popover.Root>
  );
}
export { DocLayoutControl };
