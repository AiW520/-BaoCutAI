import { useEffect, useState } from "react";
import { SupportCodeCopyButton } from "../connection-and-errors/connector-permission-dialog";
import {
  Button,
  UiOverlaysAndIconsCustomIcon,
  resolvePlatformLiveDocumentAndHistoryReason4,
  resolvePlatformLiveDocumentAndHistoryReason5,
  resolvePlatformLiveDocumentAndHistoryWsNeverOpened,
  resolvePlatformSyncAndRoutingCompact,
} from "../dependencies";
import { SessionNavigationTitle } from "../session-navigation/create-file-placement-waiter";
import type * as React from "react";

export const RoomTabUnbound: React.FC<{ fileId?: string }> = ({ fileId }) => {
  return (
    <div
      role={`status`}
      className={`gap-md flex h-full flex-col items-center justify-center px-6`}
      data-testid={`room-tab-unbound`}
    >
      <UiOverlaysAndIconsCustomIcon
        name={`File`}
        size={`lg`}
        className={`text-secondary`}
      />
      <div className={`text-primary text-body font-medium`}>
        {SessionNavigationTitle.title}
      </div>
      <div className={`text-secondary text-footnote max-w-md text-center`}>
        {SessionNavigationTitle.body}
      </div>
      {false}
    </div>
  );
};

export const DocumentConnectionError: React.FC<{
  onRetry: () => void;
  message?: string;
  frame?: boolean;
  supportCode?: string;
}> = ({ onRetry, message, frame = false, supportCode }) => {
  const controlSize: (size: "sm") => string = resolvePlatformSyncAndRoutingCompact();
  const [reason] = useState((): null | string =>
    frame ? resolvePlatformLiveDocumentAndHistoryReason4().reason : null,
  );
  useEffect((): undefined => {
    if (frame) {
      resolvePlatformLiveDocumentAndHistoryReason5(`card`);
    }
  }, [frame]);
  const hint = frame ? resolvePlatformLiveDocumentAndHistoryWsNeverOpened(reason) : null;
  return (
    <div
      role={`alert`}
      className={`gap-md flex h-full flex-col items-center justify-center px-6`}
      data-testid={`roomview-authority-failed`}
    >
      <UiOverlaysAndIconsCustomIcon
        name={`CloudSlash`}
        size={`lg`}
        className={`text-secondary`}
      />
      <div className={`text-primary text-body font-medium`}>
        {frame ? `Couldn’t load this document` : `Can’t reach Docs`}
      </div>
      <div className={`text-secondary text-footnote max-w-md text-center`}>
        {frame
          ? `Something went wrong opening the document. Try again, or reload.`
          : `Check your connection and try again.`}
      </div>
      {hint !== null && (
        <div
          className={`text-secondary text-footnote max-w-md text-center`}
          data-testid={`roomview-boot-gave-up-hint`}
          data-reason={reason ?? undefined}
        >
          {hint}
        </div>
      )}
      <Button
        size={controlSize(`sm`)}
        variant={`secondary`}
        onClick={onRetry}
      >{`Retry`}</Button>
      {supportCode ? <SupportCodeCopyButton code={supportCode} /> : null}
      {false}
    </div>
  );
};

export const EmptyDocumentView: React.FC<{ hasFiles: boolean }> = ({ hasFiles }) => {
  return (
    <div className={`text-body text-secondary flex h-full items-center justify-center`}>
      {hasFiles
        ? `Open a tab from the tabs menu.`
        : `No tabs yet. Create one from the tabs menu.`}
    </div>
  );
};
