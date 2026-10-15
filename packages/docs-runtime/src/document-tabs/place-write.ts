/** tabs-place-write: restored from tabsPlaceWrite-TUu0l391.js. */
import type {
  StyleRoad,
  StyleFailure,
  StyleWriteResult,
  TabsPlacement,
} from "../document/style-contracts";
import type { Dispose } from "../boot/lifecycle-contracts";
import {
  resolveDataOperationControlValue3,
  resolveDataOperationControlValue4,
  toast,
} from "../platform/index";
import {
  commitTabsPlacementPick,
  getDocumentFontGeneration,
  parseTabsPlacement,
  pickTabsPlacement,
  releaseTabsPlacementPick,
  serializeTabsPlacement,
} from "../document-app/index";
import { enqueueStyleWrite } from "../document/style-write-chain";
var TABS_PLACE_FAILURE_MESSAGE = `Couldn’t save where tabs show. Tabs are back to the saved setting.`;
var TABS_PLACE_FAILURE_COPY = {
  refused: TABS_PLACE_FAILURE_MESSAGE,
  notSent: `${TABS_PLACE_FAILURE_MESSAGE} Try again.`,
};
var visibleTabsPlaceRows: Map<string, (failure: StyleFailure) => void> =
  new Map();
function tabsPlaceRowOnScreen(
  pid: string,
  onFailure: (failure: StyleFailure) => void,
): Dispose {
  visibleTabsPlaceRows.set(pid, onFailure);
  return () => {
    if (visibleTabsPlaceRows.get(pid) === onFailure) {
      visibleTabsPlaceRows.delete(pid);
    }
  };
}
var TABS_PLACE_FAILURE_TOAST_KEY = `doc-tabs-place-failed`;
function writeTabsPlace(getRoad: () => StyleRoad, place: TabsPlacement): void {
  let road = getRoad();
  let visit = (getDocumentFontGeneration as (pid: string) => number)(road.pid);
  let writeReads: number | undefined;
  let optimisticToken = (
    pickTabsPlacement as (pid: string, place: TabsPlacement) => number
  )(road.pid, place);
  (async () => {
    let writeTabsPlaceResult = await enqueueStyleWrite(road.pid, {
      change: (
        serializeTabsPlacement as (
          place: TabsPlacement,
        ) => import("../document/style-contracts").StyleChange
      )(place),
      road: () => {
        let road2 = getRoad();
        let post = road2.post;
        return post === undefined
          ? road2
          : {
              ...road2,
              post: (tabsPlace) => (
                (writeReads = road2.styleReads()),
                post(tabsPlace)
              ),
            };
      },
    });
    resolveDataOperationControlValue3(
      `tabs_place:${place}`,
      writeTabsPlaceResult,
    );
    if (writeTabsPlaceResult === `allowed`) {
      let road2 = getRoad();
      let latestStyle =
        writeReads !== undefined && road2.styleReads() > writeReads
          ? road2.latestStyle()
          : undefined;
      (
        commitTabsPlacementPick as (
          pid: string,
          token: number,
          place?: TabsPlacement,
        ) => void
      )(
        road.pid,
        optimisticToken,
        latestStyle === undefined
          ? undefined
          : (parseTabsPlacement as (style: unknown) => TabsPlacement)(
              latestStyle,
            ),
      );
      return;
    }
    if (
      !(releaseTabsPlacementPick as (pid: string, token: number) => boolean)(
        road.pid,
        optimisticToken,
      ) ||
      writeTabsPlaceResult === `left` ||
      writeTabsPlaceResult === `superseded` ||
      (getDocumentFontGeneration as (pid: string) => number)(road.pid) !== visit
    )
      return;
    let visibleTabsPlaceRowEntry = visibleTabsPlaceRows.get(road.pid);
    if (visibleTabsPlaceRowEntry) {
      visibleTabsPlaceRowEntry(writeTabsPlaceResult);
    } else {
      toast.error(TABS_PLACE_FAILURE_COPY[writeTabsPlaceResult], {
        id: TABS_PLACE_FAILURE_TOAST_KEY,
      });
    }
  })();
}
function writeTabsPlaceUnseen(
  getRoad: () => StyleRoad,
  place: TabsPlacement,
): Promise<StyleWriteResult> {
  let result = enqueueStyleWrite(getRoad().pid, {
    change: (
      serializeTabsPlacement as (
        place: TabsPlacement,
      ) => import("../document/style-contracts").StyleChange
    )(place),
    road: getRoad,
  });
  result.then((result2) =>
    resolveDataOperationControlValue4(`tabs_place:${place}`, result2),
  );
  return result;
}
export {
  TABS_PLACE_FAILURE_COPY,
  tabsPlaceRowOnScreen,
  writeTabsPlace,
  writeTabsPlaceUnseen,
};
