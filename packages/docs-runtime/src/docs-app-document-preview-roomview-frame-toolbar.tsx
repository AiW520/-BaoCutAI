/** BaoCut: document preview from index-CX4IZqzA.js. */
import type { Dynamic } from "./types";
import {
  resolvePlatformSyncAndRoutingStackOffers2,
  resolveUiProviderAndLayersUseContext11,
} from "./docs-app-dependencies";
import {
  DocumentPostureBadge,
} from "./docs-app-ask-cards-document-posture-badge";
import {
  DocumentSelectionState,
} from "./docs-app-document-selection-create-heading-normalization-plugin";
import {
  DOCUMENT_PREVIEW_POPOVER_CLASS,
  resolveDocumentPreviewTrim,
} from "./docs-app-document-preview-use-page-skill-seat";

function resolveDocumentPreviewValue3(
  documentPreviewValue3?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let documentPreviewTrim: Dynamic = resolveDocumentPreviewTrim(
    documentPreviewValue3,
  );
  let documentPreviewTrim2: Dynamic = resolveDocumentPreviewTrim(
    options !== undefined && options !== `` ? options : documentPreviewValue3,
  );
  return `Build a widget visualizing the results of the routine \`${documentPreviewTrim2}\`${documentPreviewTrim2 === documentPreviewTrim ? `` : ` (routine id ${documentPreviewTrim} — routines are addressed by their minted id, never by name)`}. A chart's source reads a BLOB id at launch — a routine/…, run/… or table/… ref is refused at publish — so first save the routine's latest row-shaped result (an array of row objects) as a blob the doc owns, then use <claude.Visualize> with sources={{rows: {kind: 'ref', ref: 'blob/<that blob id>'}}} and a definition {kind: 'chart', source: 'rows', axes: {x: [{column: '<the x column>', type: 'band' | 'time' | 'linear' | 'log'}]}, marks: [{type: 'bar' | 'line' | 'point' | 'area', y: '<measure column>', group?: {by: '<series column>'}}]} whose marks fit the result shape (the x axis type is always written — 'band' for categories, 'time' for dates — never inferred). Tokens-styled chrome.`;
}

var DocumentPreview_AbsoluteTop3Left3FlexItemsCenterGap15: string;

var DocumentPreviewState: string;

var DocumentPreview_BorderTransparent: string;

function RoomviewFrameToolbar(
  {
    seats: seats,
    tabs: tabs,
    pageSkill: pageSkill,
    viewOnly: viewOnly,
    pillPosture: pillPosture,
    pillReason: pillReason,
    docked = false,
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let zIndex: Dynamic = resolveUiProviderAndLayersUseContext11(20);
  let roomviewFrameToolbarResult: Dynamic =
    resolvePlatformSyncAndRoutingStackOffers2();
  let DocumentSelectionState7: Dynamic = DocumentSelectionState(
    (roomviewFrame?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      roomviewFrame.scrolled,
  );
  return roomviewFrameToolbarResult || (!seats.tabs && !viewOnly) ? null : (
    <div
      className={
        docked
          ? `${DocumentPreviewState}${DocumentSelectionState7 ? `` : ` ${DocumentPreview_BorderTransparent}`}`
          : DocumentPreview_AbsoluteTop3Left3FlexItemsCenterGap15
      }
      style={{
        zIndex: zIndex,
      }}
      data-testid={`roomview-frame-toolbar`}
      data-docked={docked ? `` : undefined}
      data-rule={docked && DocumentSelectionState7 ? `` : undefined}
    >
      {seats.tabs && (
        <div
          className={
            docked
              ? `flex min-w-0 items-center`
              : `bg-surface-popover rounded-lg flex items-center`
          }
          data-testid={`roomview-frame-tabs`}
        >
          {tabs}
          {pageSkill}
        </div>
      )}
      {viewOnly && (
        <DocumentPostureBadge
          chrome={docked ? `badge` : `plate`}
          size={docked ? `lg` : undefined}
          posture={pillPosture}
          reason={pillReason}
        />
      )}
    </div>
  );
}

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeDocumentPreviewRoomviewFrameToolbarStep1(): void {
  (DocumentPreview_AbsoluteTop3Left3FlexItemsCenterGap15 = `absolute top-3 left-3 flex items-center gap-1.5`);
  (DocumentPreviewState = `${DOCUMENT_PREVIEW_POPOVER_CLASS} relative flex shrink-0 items-center justify-between gap-1.5 border-b pt-[max(0.5rem,env(safe-area-inset-top))] pr-[max(0.75rem,env(safe-area-inset-right))] pb-2 pl-[max(0.75rem,env(safe-area-inset-left))] transition-colors duration-snap ease-out motion-reduce:transition-none`);
  (DocumentPreview_BorderTransparent = `border-transparent`);
}

export {
  RoomviewFrameToolbar,
  resolveDocumentPreviewValue3,
};
