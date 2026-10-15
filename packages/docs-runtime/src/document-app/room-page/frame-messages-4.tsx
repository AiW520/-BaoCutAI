
/** BaoCut: room document frame messages; live accessors preserve closure state. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import { _ as recordFramePhase } from "../../boot/environment";
export function runRoomPage193OnLoad(roomPageContext: {
  elementRef23: Dynamic;
  elementRef27: Dynamic;
  focus2: Dynamic;
  iframeRef: Dynamic;
}): Dynamic {
  return {
    ["onLoad"]: (..._extraArguments: unknown[]): undefined => {
      let load: Dynamic = roomPageContext.elementRef23.current.load();
      if (load !== `navigated`) {
        recordFramePhase(`iframeLoad`);
      }
      if (load === `navigated`) {
        roomPageContext.elementRef27.current(roomPageContext.iframeRef.current?.contentWindow);
        return;
      }
      if (load === `boot`) {
        (0, roomPageContext.focus2)();
      }
    }
  }["onLoad"];
}
