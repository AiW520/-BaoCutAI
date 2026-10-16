import {
  ObservabilityBrowserAndOperationEventsHref,
  resolveDataContentAndReferencesReplace2,
  Tooltip,
  UiOverlaysAndIconsCustomIcon,
} from "../../dependencies";
import { resolveDocumentPreviewValue3 } from "../../document-preview/roomview-frame-toolbar";
import type { RoutineRow, VisualizeRoutine } from "../project-contracts";
import type * as React from "react";

export const RoutineDetailHeader: React.FC<{
  row: RoutineRow;
  href?: string;
  onVisualize?: VisualizeRoutine;
  closeModal: () => void;
}> = ({ row, href, onVisualize, closeModal }) => {
  return (
    <div className={`flex items-center gap-1 pr-8`}>
      <div className={`text-primary text-heading min-w-0 flex-1 truncate font-medium`}>
        {resolveDataContentAndReferencesReplace2(row.label ?? row.name)}
      </div>
      {onVisualize !== undefined && (
        <Tooltip
          content={`Build a live chart of this routine's results — a widget build starts in a tab and you watch it work.`}
          side={`bottom`}
          multiline={true}
        >
          <button
            type={`button`}
            aria-label={`Chart results`}
            data-testid={`routine-chart-results`}
            onClick={(): undefined => {
              onVisualize(resolveDocumentPreviewValue3(row.id ?? row.name, row.name));
              closeModal();
            }}
            className={`text-muted hover:text-primary hover:bg-alpha-1 flex size-6 shrink-0 items-center justify-center rounded`}
          >
            <UiOverlaysAndIconsCustomIcon name={`Chart`} customSize={14} />
          </button>
        </Tooltip>
      )}
      {href !== undefined && (
        <Tooltip content={`Open in editor`}>
          <ObservabilityBrowserAndOperationEventsHref
            href={href}
            data-testid={`routine-open-editor`}
            aria-label={`Open in editor`}
            onClick={closeModal}
            className={`text-muted hover:text-primary hover:bg-alpha-1 flex size-6 shrink-0 items-center justify-center rounded`}
          >
            <UiOverlaysAndIconsCustomIcon name={`ArrowOutSquare`} customSize={14} />
          </ObservabilityBrowserAndOperationEventsHref>
        </Tooltip>
      )}
    </div>
  );
};
