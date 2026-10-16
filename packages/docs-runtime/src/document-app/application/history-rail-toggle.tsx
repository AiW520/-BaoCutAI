import {
  PlatformSyncAndRoutingAssign2,
  PlatformSyncAndRoutingState4,
  Tooltip,
  updatePlatformLiveDocumentAndHistoryOpen,
  updatePlatformLiveDocumentAndHistoryOpen2,
  useCommentStore,
} from "../dependencies";
import { IconButton } from "../run-review";
import {
  SessionNavigationPanel,
  SessionNavigationState4,
} from "../session-navigation/ldoc-comments-btn";
import type * as React from "react";

export const HistoryRailToggle: React.FC = () => {
  return (
    <Tooltip content={`History`}>
      <IconButton
        data-testid={`history-rail-toggle`}
        aria-label={`History`}
        variant={`default`}
        size={28}
        onClick={toggleHistoryRail}
        icon={<SessionNavigationState4 size={14} />}
      />
    </Tooltip>
  );
};

function toggleHistoryRail(): undefined {
  const storeState: {
    value: boolean;
    set: (value: boolean) => void;
  } = PlatformSyncAndRoutingState4.getState();
  const enabled = !storeState.value;
  if (enabled) {
    updatePlatformLiveDocumentAndHistoryOpen();
  } else {
    updatePlatformLiveDocumentAndHistoryOpen2();
  }
  storeState.set(enabled);
  if (enabled) {
    const storeState2: {
      commentMode: string;
      setCommentMode: (mode: "margin") => void;
    } = useCommentStore.getState();
    if (storeState2.commentMode === `list`) {
      storeState2.setCommentMode(`margin`);
    }
    SessionNavigationPanel.getState().close();
  } else PlatformSyncAndRoutingAssign2.getState().clear();
}

export { toggleHistoryRail };
