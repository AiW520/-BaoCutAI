/** BaoCut: phone overlays from index-CX4IZqzA.js. */
import type { JSX } from "./jsx-runtime";
import type { CapturedProps as CapturedJsxProps } from "./jsx-runtime";
import type { Dynamic } from "./types";
type JsxElementType = JSX.ElementType;
import {
  Button,
  PlatformSyncAndRoutingDialog,
  UiDialogsOpen,
  UiDialogsRoot,
  UiDialogsRoot2,
  UiTooltipsAndControlsDelay,
  frameOpenExternal,
  originalJsxProps,
  resolvePlatformChunkLoadingDescription2,
  resolvePlatformSyncAndRoutingValue10,
} from "./docs-app-dependencies";
import {
  React,
} from "./docs-app-bootstrap";
import {
  ReactDom,
} from "./docs-app-connection-and-errors-connector-permission-dialog";
import {
  ensureBottomSheetLoaded,
  loadedBottomSheetModule,
} from "./docs-app-phone-overlays-shared-1";
import {
  REACT_FORWARD_REF_SYMBOL,
  REACT_MEMO_SYMBOL,
} from "./docs-app-connection-and-errors-shared-2";

function isReactComponent(
  reactComponent?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof reactComponent == `function`) return true;
  let $$typeof: Dynamic = reactComponent?.$$typeof;
  return (
    $$typeof === REACT_FORWARD_REF_SYMBOL || $$typeof === REACT_MEMO_SYMBOL
  );
}

function validateBottomSheetModule(
  validateBottomSheetModule2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let {
    BottomSheet: BottomSheet2,
    PhoneDialogPopup: PhoneDialogPopup2,
    PhoneConfirmationDialog: PhoneConfirmationDialog2,
  }: Dynamic = validateBottomSheetModule2;
  if (
    !isReactComponent(BottomSheet2) ||
    !isReactComponent(PhoneDialogPopup2) ||
    !isReactComponent(PhoneConfirmationDialog2)
  )
    throw Error(`BottomSheet.impl landed without its components`);
  return {
    BottomSheet: BottomSheet2,
    PhoneDialogPopup: PhoneDialogPopup2,
    PhoneConfirmationDialog: PhoneConfirmationDialog2,
  };
}

function useBottomSheetModule(
  bottomSheetModule?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [loadedBottomSheetModuleState, setLoadedBottomSheetModuleState]: Dynamic =
    (0, React.useState)(
      (..._extraArguments: unknown[]): Dynamic => loadedBottomSheetModule,
    );
  let [failed, setFailed]: Dynamic = (0, React.useState)(false);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (loadedBottomSheetModuleState || !bottomSheetModule) return;
      let enabled = true;
      ensureBottomSheetLoaded().then(
        (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (enabled) {
            setLoadedBottomSheetModuleState(result);
          }
        },
        (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (enabled) {
            resolvePlatformChunkLoadingDescription2(result);
            setFailed(true);
          }
        },
      );
      return (..._extraArguments: unknown[]): undefined => {
        enabled = false;
      };
    },
    [loadedBottomSheetModuleState, bottomSheetModule],
  );
  return {
    m: loadedBottomSheetModuleState,
    failed: failed,
  };
}

function preloadBottomSheet(..._extraArguments: unknown[]): undefined {
  ensureBottomSheetLoaded().catch(
    (..._extraArguments: unknown[]): undefined => {},
  );
}

var DesktopDialogPopup: Dynamic;

function BottomSheet(bottomSheet?: Dynamic, ..._extraArguments: unknown[]) {
  let { m: useBottomSheetModule2, failed: useBottomSheetModule3 }: Dynamic =
    useBottomSheetModule(true);
  let shouldCloseRef: Dynamic = (0, React.useRef)(bottomSheet.shouldClose);
  shouldCloseRef.current = bottomSheet.shouldClose;
  let onCloseRef: Dynamic = (0, React.useRef)(bottomSheet.onClose);
  onCloseRef.current = bottomSheet.onClose;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (
        useBottomSheetModule3 &&
        shouldCloseRef.current?.(`backdrop`) !== false
      ) {
        onCloseRef.current(`backdrop`);
      }
    },
    [useBottomSheetModule3],
  );
  return useBottomSheetModule2 ? (
    <useBottomSheetModule2.BottomSheet
      {...originalJsxProps({
        ...bottomSheet,
      })}
    />
  ) : null;
}

var PhoneDialogPopup: Dynamic;

function PhoneConfirmationDialog(
  phoneConfirmationDialog?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let phoneConfirmationDialogResult: Dynamic =
    resolvePlatformSyncAndRoutingValue10();
  let { m: useBottomSheetModule2, failed: useBottomSheetModule3 }: Dynamic =
    useBottomSheetModule(phoneConfirmationDialogResult);
  return !phoneConfirmationDialogResult ||
    (!useBottomSheetModule2 && useBottomSheetModule3) ? (
    <UiDialogsOpen
      {...originalJsxProps({
        ...phoneConfirmationDialog,
      })}
    />
  ) : useBottomSheetModule2 ? (
    <useBottomSheetModule2.PhoneConfirmationDialog
      {...originalJsxProps({
        ...phoneConfirmationDialog,
      })}
    />
  ) : null;
}

function ExportProgressDialog(
  ..._extraArguments: [Readonly<Record<string, unknown>>?, ...unknown[]]
) {
  let exportProgressDialogResult: Dynamic = PlatformSyncAndRoutingDialog(
    (exportProgressDialog?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      exportProgressDialog.dialog,
  );
  let exportProgressDialogResult2: Dynamic = PlatformSyncAndRoutingDialog(
    (exportProgressDialog?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      exportProgressDialog.clear,
  );
  if (exportProgressDialogResult === null) return null;
  let url: Dynamic =
    exportProgressDialogResult.phase === `done`
      ? exportProgressDialogResult.url
      : undefined;
  let action: Dynamic =
    exportProgressDialogResult.phase === `done`
      ? exportProgressDialogResult.action
      : undefined;
  return (
    <UiDialogsRoot2.Root
      open={true}
      onOpenChange={(
        exportProgressDialog?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => !exportProgressDialog && exportProgressDialogResult2()}
    >
      <PhoneDialogPopup
        kind={`alert`}
        size={`sm`}
        data-testid={`export-dialog`}
      >
        {exportProgressDialogResult.phase === `working` ? (
          <UiDialogsRoot2.Header showClose={false}>
            <span
              role={`status`}
              className={`flex items-center gap-2`}
              data-testid={`export-dialog-working`}
            >
              <UiTooltipsAndControlsDelay size={`sm`} />
              {exportProgressDialogResult.title}
            </span>
          </UiDialogsRoot2.Header>
        ) : (
          <UiDialogsRoot2.Header
            showClose={false}
            description={exportProgressDialogResult.description}
          >
            {exportProgressDialogResult.title}
          </UiDialogsRoot2.Header>
        )}
        <ExportOutcomeAnnouncement
          title={
            exportProgressDialogResult.phase === `done`
              ? exportProgressDialogResult.title
              : null
          }
          description={
            exportProgressDialogResult.phase === `done`
              ? exportProgressDialogResult.description
              : undefined
          }
        />
        <UiDialogsRoot2.Footer align={`end`}>
          <UiDialogsRoot2.Close
            render={
              <Button
                variant={
                  exportProgressDialogResult.phase === `done` &&
                  url === undefined &&
                  action === undefined
                    ? `primary`
                    : `secondary`
                }
              >{`Close`}</Button>
            }
          />
          {url !== undefined && (
            <Button
              variant={action === undefined ? `primary` : `secondary`}
              onClick={(..._extraArguments: unknown[]): undefined => {
                frameOpenExternal(url);
                exportProgressDialogResult2();
              }}
              data-testid={`export-dialog-open`}
            >
              {exportProgressDialogResult.phase === `done` &&
              exportProgressDialogResult.urlLabel !== undefined
                ? exportProgressDialogResult.urlLabel
                : `Open`}
            </Button>
          )}
          {action !== undefined && (
            <Button
              variant={`primary`}
              onClick={(..._extraArguments: unknown[]): undefined => {
                (0, ReactDom.flushSync)(exportProgressDialogResult2);
                action.run();
              }}
              data-testid={`export-dialog-action`}
            >
              {action.label}
            </Button>
          )}
        </UiDialogsRoot2.Footer>
      </PhoneDialogPopup>
    </UiDialogsRoot2.Root>
  );
}

function ExportOutcomeAnnouncement(
  { title: title, description: description }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let [matchesTitleState]: Dynamic = (0, React.useState)(title === null);
  return (
    <div
      role={`status`}
      className={`sr-only`}
      data-testid={`export-dialog-outcome`}
    >
      {matchesTitleState && title !== null && (
        <div>
          <div>{title}</div>
          {description && <div>{description}</div>}
        </div>
      )}
    </div>
  );
}

var isDocumentFocusedElsewhere: Dynamic;

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializePhoneOverlaysExportProgressDialogStep1(): void {
  (DesktopDialogPopup = (0, React.forwardRef)(function (
    {
      kind = `dialog`,
      touchActions: touchActions,
      ...desktopDialogPopup
    }: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) {
    return ((
      RenderedComponent: JsxElementType,
      CapturedProps: CapturedJsxProps,
    ) => <RenderedComponent {...CapturedProps} />)(
      (kind === `alert` ? UiDialogsRoot2 : UiDialogsRoot).Popup,
      originalJsxProps({
        ref: options,
        ...desktopDialogPopup,
      }),
    );
  }));
  (PhoneDialogPopup = (0, React.forwardRef)(function (
    phoneDialogPopup?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) {
    let phoneDialogPopupResult: Dynamic = resolvePlatformSyncAndRoutingValue10();
    let { m: useBottomSheetModule2, failed: useBottomSheetModule3 }: Dynamic =
      useBottomSheetModule(phoneDialogPopupResult);
    return !phoneDialogPopupResult ||
      (!useBottomSheetModule2 && useBottomSheetModule3) ? (
      <DesktopDialogPopup
        {...originalJsxProps({
          ref: options,
          ...phoneDialogPopup,
        })}
      />
    ) : useBottomSheetModule2 ? (
      <useBottomSheetModule2.PhoneDialogPopup
        {...originalJsxProps({
          ref: options,
          ...phoneDialogPopup,
        })}
      />
    ) : null;
  }));
  (isDocumentFocusedElsewhere = (
    documentFocusedElsewhere?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    !!documentFocusedElsewhere &&
    typeof documentFocusedElsewhere.hasFocus == `function` &&
    !documentFocusedElsewhere.hasFocus() &&
    documentFocusedElsewhere.visibilityState === `visible`);
}

export {
  BottomSheet,
  ExportProgressDialog,
  PhoneConfirmationDialog,
  PhoneDialogPopup,
  isDocumentFocusedElsewhere,
  preloadBottomSheet,
  validateBottomSheetModule,
};
