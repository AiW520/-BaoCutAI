/** tabs-place-row: restored from TabsPlaceRow-DNisWUl6.js. */

import type { Dynamic } from "../interop/legacy-dynamic";
import { toModuleNamespace } from "../boot/module-runtime";
import {
  loadJsxRuntime,
  loadReact,
  resolvePlatformAnnouncementsValue,
} from "../platform/index";
import { Switch } from "../design-system/index";
import {
  getTabsPlacement,
  parseTabsPlacement,
} from "../document-app/index";
import {
  TABS_PLACE_FAILURE_COPY,
  tabsPlaceRowOnScreen,
  writeTabsPlace,
} from "./place-write";
import type * as ReactComponentTypes from "react";

export const TabsPlaceRow: ReactComponentTypes.FC<Dynamic> = ({
  seat: seat,
  shown: shown,
  why: why,
}) => {
  let [failure, setFailure]: Dynamic = (0, React.useState)(null);
  let seatRef: Dynamic = (0, React.useRef)(false);
  let controlId: Dynamic = (0, React.useId)();
  let controlId2: Dynamic = (0, React.useId)();
  let controlId3: Dynamic = (0, React.useId)();
  let elementRef: Dynamic = (0, React.useRef)(null);
  let seatRef2: Dynamic = (0, React.useRef)(seat);
  seatRef2.current = seat;
  let { pid: seat2 }: Dynamic = seat;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => tabsPlaceRowOnScreen(seat2, setFailure),
    [seat2],
  );
  let callback: Dynamic = (0, React.useCallback)(
    (tabsPlaceRow?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let seat3: Dynamic = seatRef2.current;
      if (
        !(
          seat3.post === undefined ||
          tabsPlaceRow ===
            (getTabsPlacement(seat3.pid) ?? parseTabsPlacement(seat3.style))
        )
      ) {
        setFailure(null);
        seatRef.current = tabsPlaceRow === `left`;
        writeTabsPlace(
          (..._extraArguments: unknown[]): Dynamic => seatRef2.current,
          tabsPlaceRow,
        );
      }
    },
    [],
  );
  let TABSPLACEROWCOPYItem: Dynamic =
    !failure && why && shown === `left` ? TABS_PLACE_ROW_COPY[why] : null;
  let TABSPLACEROWCOPYItem2: Dynamic = failure
    ? TABS_PLACE_ROW_COPY[failure]
    : TABSPLACEROWCOPYItem;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (!(!seatRef.current || TABSPLACEROWCOPYItem === null)) {
        seatRef.current = false;
        resolvePlatformAnnouncementsValue(
          elementRef.current?.ownerDocument ?? document,
          TABSPLACEROWCOPYItem,
          {
            key: `tabs-place`,
          },
        );
      }
    },
    [TABSPLACEROWCOPYItem],
  );
  return (
    <div ref={elementRef} data-testid={`tabs-place-row`} data-place={shown}>
      <div
        className={`gap-x-sm flex min-h-8 items-center justify-between py-px pointer-coarse:min-h-10`}
      >
        <label
          id={controlId2}
          htmlFor={controlId3}
          className={`text-footnote text-muted min-w-0 truncate select-none`}
        >
          {TABS_PLACE_ROW_COPY.label}
        </label>
        <Switch
          id={controlId3}
          aria-labelledby={controlId2}
          aria-describedby={TABSPLACEROWCOPYItem2 ? controlId : undefined}
          checked={shown === `left`}
          onCheckedChange={(
            tabsPlaceRow?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => callback(tabsPlaceRow ? `left` : `default`)}
        />
      </div>
      {TABSPLACEROWCOPYItem2 ? (
        <p
          id={controlId}
          role={failure ? `alert` : undefined}
          className={
            failure ? `text-footnote text-danger pt-1` : `text-footnote text-muted pt-1`
          }
          data-testid={failure ? `tabs-place-error` : `tabs-place-why`}
          key={(failure ? `alert:` : `why:`) + TABSPLACEROWCOPYItem2}
        >
          {TABSPLACEROWCOPYItem2}
        </p>
      ) : null}
    </div>
  );
};

var React: Dynamic = toModuleNamespace(loadReact(), 1);
var jsxRuntime: Dynamic = loadJsxRuntime();
var TABS_PLACE_ROW_COPY: Dynamic = {
  label: `Show on page`,
  oneTab: `Tabs show beside the text once this Doc has two tabs or two headings.`,
  ...TABS_PLACE_FAILURE_COPY,
};
