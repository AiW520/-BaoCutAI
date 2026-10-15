/** BaoCut: comment notifications from index-CX4IZqzA.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  PlatformSyncAndRoutingAssign2,
  PlatformSyncAndRoutingState4,
  dataModelSchemasValue3000,
  onFrameViewerClassChange,
  useCommentStore,
} from "../dependencies";
import {
  rememberCommentListReturn,
} from "../ask-cards/document-posture-badge";

var CommentNotificationsTickMs: {
    ms: number;
    tickMs: number;
};

var CommentNotifications_Margin: Dynamic;

function updateCommentNotificationsSet(..._extraArguments: unknown[]): Dynamic {
  return {
    set: (
      updateCommentNotificationsSet2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let storeState: Dynamic = useCommentStore.getState();
      if (updateCommentNotificationsSet2) {
        if (storeState.commentMode === `list`) return;
        CommentNotifications_Margin = storeState.commentMode;
        rememberCommentListReturn(options !== false);
        storeState.setCommentMode(`list`);
        PlatformSyncAndRoutingState4.getState().set(false);
        PlatformSyncAndRoutingAssign2.getState().clear();
      } else if (storeState.commentMode === `list`) {
        storeState.setCommentMode(CommentNotifications_Margin);
      }
    },
    subscribe: (
      updateCommentNotificationsSet2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      useCommentStore.subscribe(
        (
          updateCommentNotificationsSet3?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          let matchesCommentMode =
            updateCommentNotificationsSet3.commentMode === `list`;
          if (matchesCommentMode !== (options.commentMode === `list`)) {
            updateCommentNotificationsSet2(matchesCommentMode);
          }
        },
      ),
  };
}

function installCommentNotificationsVisibilityState(
  installCommentNotificationsVisibilityState2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let installCommentNotificationsVisibilityState3 = (
    ..._extraArguments: unknown[]
  ): undefined => {
    if (document.visibilityState === `visible`) {
      installCommentNotificationsVisibilityState2();
    }
  };
  document.addEventListener(
    `visibilitychange`,
    installCommentNotificationsVisibilityState3,
  );
  window.addEventListener(`focus`, installCommentNotificationsVisibilityState2);
  let installCommentNotificationsVisibilityStateResult: Dynamic =
    onFrameViewerClassChange(installCommentNotificationsVisibilityState2);
  let subscribe: Dynamic = useCommentStore.subscribe(
    (
      installCommentNotificationsVisibilityState4?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        (installCommentNotificationsVisibilityState4.draftAnchor !== null &&
          options.draftAnchor === null) ||
        (installCommentNotificationsVisibilityState4.draftY !== null &&
          options.draftY === null)
      ) {
        installCommentNotificationsVisibilityState2();
      }
    },
  );
  return (..._extraArguments: unknown[]): undefined => {
    document.removeEventListener(
      `visibilitychange`,
      installCommentNotificationsVisibilityState3,
    );
    window.removeEventListener(
      `focus`,
      installCommentNotificationsVisibilityState2,
    );
    installCommentNotificationsVisibilityStateResult();
    subscribe();
  };
}

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeCommentNotificationsState2Step1(): void {
  (CommentNotificationsTickMs = {
    ms: dataModelSchemasValue3000,
    tickMs: 250,
  });
  (CommentNotifications_Margin = `margin`);
}

export {
  CommentNotificationsTickMs,
  installCommentNotificationsVisibilityState,
  updateCommentNotificationsSet,
};
