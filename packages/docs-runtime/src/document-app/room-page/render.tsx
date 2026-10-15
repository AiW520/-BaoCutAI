import { FunctionRunDialog, WidgetSampleCard, resolveWidgetBridgeRule } from "../widget-bridge/widget-sample-card";
import { DocumentCommentsHeadless } from "../room-document-page/document-comments-headless";
import { DocumentRuntimePrototype, DocumentRuntimeSearch, DocumentRuntimeState6, DocumentRuntimeState7, WidgetBuildQueued, WidgetProvenanceGutter, WidgetSegMenuPopup } from "../document-runtime/widget-provenance-gutter";
import { DocumentOpeningBanner, DocumentOpeningSkeleton, RecoveryTextPanel, SyncLossBanner, SyncLossReportActions } from "../document-recovery";
import { jsxRuntime, mapPreloadDependencies } from "../bootstrap";
import { InlineAskComposer, InlineAskSheet, MediaAltTextPopover } from "../document-commands/create-selection-ask-coordinator";
import { INLINE_ASK_COMPOSER_LAYOUT } from "../comment-components/state";
import { getDocumentContextValue } from "../document-context/create-widget-writing-coordinator";
import { resolveDocumentRuntimeBuild } from "../document-runtime/use-document-iframe-focus";
import { ImagePickPopup, resolveFrameGesturesRowsPin } from "../frame/gestures-state-1";
import { OpenCommentsReminder, TypeEditorPopover, UseDocumentUploadsUrlComponent } from "../document-uploads";
import { DocumentLinkPopover } from "../document-links";
import { SelectionActionsBar, TargetSourcePopover } from "../ask-cards/target-source-popover";

/** BaoCut: room document render; live accessors preserve closure state. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import { originalJsxProps, originalJsxsProps } from "../../react-runtime/jsx-runtime";
import {
  Button,
  CommentsStoreAllowScripts,
  EditorHostLayoutMax,
  EditorHostLfileOrphanRemount,
  editorHostValue1600,
  editorHostValue1700,
  EditorSelectionAndTablesByFile2,
  EditorSelectionAndTablesDataPagesPrintSurface,
  liveSupportCode,
  PlatformApiAndAuthAssign,
  PlatformSessionAndSourcesMessage4,
  resolveCommentsStoreKind3,
  resolveCommentsStoreNode,
  resolveCommentsStoreValue30,
  resolveEditorExtensionsRefusalClass,
  resolvePlatformKeyboardAndSaveStatusSaved,
  resolvePlatformSessionAndSourcesPath,
  resolvePlatformSessionAndSourcesTest4,
  resolvePlatformSessionAndSourcesTest6,
  toast,
  UiOverlaysAndIconsCustomIcon,
  updateEditorSelectionAndTablesChat,
  useCommentStore,
} from "../../platform/index";
import { isFrameArtifact } from "../../boot/environment";
import { preloadModule } from "../../boot/preload";
export function runRoomPage203Render(roomPageContext: {
  activeDataTarget: Dynamic;
  addEventListener2: Dynamic;
  askCardDeskRef: Dynamic;
  askCardDraft: Dynamic;
  AskCardFace: Dynamic;
  askInvitationKinds: Dynamic;
  askOffer: Dynamic;
  askWhyKeysRef: Dynamic;
  askWhyOffer: Dynamic;
  askWhyRef: Dynamic;
  blank: Dynamic;
  blockContextMenu: Dynamic;
  blockKindOf: Dynamic;
  busyAskCard: Dynamic;
  callback: Dynamic;
  callback2: Dynamic;
  collapsed: Dynamic;
  commentOnly: Dynamic;
  commentsReadOnly2: Dynamic;
  container: Dynamic;
  containerRef: Dynamic;
  countRef3: Dynamic;
  documentHostStateSave: Dynamic;
  edgeLeft: Dynamic;
  element2: Dynamic;
  elementRef38: Dynamic;
  elementRef46: Dynamic;
  elementRef47: Dynamic;
  elementRef48: Dynamic;
  elementRef79: Dynamic;
  enabled: Dynamic;
  enabled2: Dynamic;
  enabledRef13: Dynamic;
  enabledState5: Dynamic;
  enumEditDialog: Dynamic;
  enumEditDialogRef: Dynamic;
  errorRef2: Dynamic;
  fileIdRef: Dynamic;
  frameError: Dynamic;
  frameGesturesOpenedAtRef: Dynamic;
  frameMessengerRef: Dynamic;
  frameMountEpoch: Dynamic;
  fromMention: Dynamic;
  fsEntryId2: Dynamic;
  gone: Dynamic;
  handFocusOut: Dynamic;
  iconLane: Dynamic;
  icons: Dynamic;
  iframeRef: Dynamic;
  imagePicker: Dynamic;
  inlineAskHost: Dynamic;
  inlineAskHost2: Dynamic;
  insertMenuAnchor: Dynamic;
  items: Dynamic;
  itemsState: Dynamic;
  judge: Dynamic;
  labelRef2: Dynamic;
  lastDataTarget: Dynamic;
  layout: Dynamic;
  leaving: Dynamic;
  leavingAskCard: Dynamic;
  linkPopover: Dynamic;
  lookupRef: Dynamic;
  lookupRef8: Dynamic;
  memoized3: Dynamic;
  memoized4: Dynamic;
  mentionPopover: Dynamic;
  mode: Dynamic;
  mode2: Dynamic;
  navigatedRef: Dynamic;
  nodeName: Dynamic;
  notice: Dynamic;
  observe: Dynamic;
  onCancel: Dynamic;
  onCardSpans: Dynamic;
  onClose: Dynamic;
  onClose2: Dynamic;
  onClose3: Dynamic;
  onComposeExit: Dynamic;
  onDelete: Dynamic;
  onDismiss: Dynamic;
  onLoad: Dynamic;
  onOpenNodeLog: Dynamic;
  onOpenWidgetCode2: Dynamic;
  onOpenWidgetCodeRef: Dynamic;
  onOpenWidgetPanel2: Dynamic;
  onOpenWidgetPanel3: Dynamic;
  onOpenWidgetPanelRef: Dynamic;
  onOverhang: Dynamic;
  onPost: Dynamic;
  onPost2: Dynamic;
  onPressOutside: Dynamic;
  onReact: Dynamic;
  onRevealNode: Dynamic;
  onScrollDoc: Dynamic;
  onShown: Dynamic;
  onTabOut: Dynamic;
  openAskCard: Dynamic;
  openAskCard2: Dynamic;
  openDebugReportDialog2: Dynamic;
  openUrl: Dynamic;
  pageRef: Dynamic;
  path: Dynamic;
  phone2: Dynamic;
  projectContainer: Dynamic;
  quiet: Dynamic;
  railDocked: Dynamic;
  railSeated: Dynamic;
  railSync: Dynamic;
  railWheelMountedRef: Dynamic;
  readOnly2: Dynamic;
  readOnly4: Dynamic;
  readTimeout: Dynamic;
  recordRef3: Dynamic;
  recordRef4: Dynamic;
  recordState: Dynamic;
  recordState2: Dynamic;
  recordState3: Dynamic;
  resolveOwnOnly: Dynamic;
  room: Dynamic;
  roomDocumentPageHandler3: Dynamic;
  roomDocumentPageHandler4: Dynamic;
  roomDocumentPageResult11: Dynamic;
  roomDocumentPageResult24: Dynamic;
  roomDocumentPageResult4: Dynamic;
  roomDocumentPageResult8: Dynamic;
  roomNodeId: Dynamic;
  roomPageModuleUrl: Dynamic;
  runModal: Dynamic;
  save: Dynamic;
  saveWords: Dynamic;
  seat: Dynamic;
  selbarPortRef: Dynamic;
  send2: Dynamic;
  setActiveDataTarget: Dynamic;
  setBlockContextMenu: Dynamic;
  setCountState2: Dynamic;
  setDraftAnchor: Dynamic;
  setEnumEditDialog: Dynamic;
  setHoldingDraft: Dynamic;
  setLinkPopover: Dynamic;
  setMentionPopover2: Dynamic;
  setOpenUrl: Dynamic;
  setRunModal: Dynamic;
  setTarget: Dynamic;
  setTarget2: Dynamic;
  sheetScrollRef: Dynamic;
  slice: Dynamic;
  split: Dynamic;
  srcDoc: Dynamic;
  stage: Dynamic;
  stashKey: Dynamic;
  state: Dynamic;
  suggestions: Dynamic;
  suggestions2: Dynamic;
  suppressed: Dynamic;
  target: Dynamic;
  title: Dynamic;
  title2: Dynamic;
  toText: Dynamic;
  turned: Dynamic;
  updateAmount: Dynamic;
  useDocumentContextWarm2: Dynamic;
  useDocumentHostStateJoin2: Dynamic;
  useDocumentIframeFocus2: Dynamic;
  useDocumentInteractionOverlays10: Dynamic;
  useDocumentInteractionOverlays22: Dynamic;
  useDocumentRuntimeFsEntryId3: Dynamic;
  useDocumentRuntimeSubscribeProjectFeed2: Dynamic;
  useNodeEngineNames2: Dynamic;
  useWidgetBridgeCurrent2: Dynamic;
  v3WidgetProvenance: Dynamic;
  version: Dynamic;
  vouch: Dynamic;
  wide: Dynamic;
  widgetBlockOf: Dynamic;
  words: Dynamic;
  writingPreview: Dynamic;
}): Dynamic {
  return <div ref={roomPageContext.observe} className={`@container relative flex h-full`} style={{
    [EditorHostLayoutMax]: `${roomPageContext.wide ? editorHostValue1700 : editorHostValue1600}px`
  }} data-testid={`ldoc-view`}>
      {roomPageContext.roomDocumentPageResult4}
      {roomPageContext.writingPreview && <WidgetSampleCard view={roomPageContext.writingPreview} onInsert={(..._extraArguments: unknown[]): undefined => void roomPageContext.element2.insert()} onInsertDraft={(..._extraArguments: unknown[]): undefined => void roomPageContext.element2.insertDraft()} onRetry={(..._extraArguments: unknown[]): Dynamic => roomPageContext.element2.retry()} onDiscard={(..._extraArguments: unknown[]): Dynamic => roomPageContext.element2.discard()} />}
      {roomPageContext.runModal && <FunctionRunDialog container={roomPageContext.container} runRef={roomPageContext.runModal.runRef} onClose={(..._extraArguments: unknown[]): Dynamic => (0, roomPageContext.setRunModal)(null)} />}
      {(!roomPageContext.room || roomPageContext.projectContainer) && <DocumentCommentsHeadless {...originalJsxProps({
      covered: roomPageContext.onShown !== undefined && !roomPageContext.roomDocumentPageResult11 || roomPageContext.leaving,
      container: roomPageContext.room ? `projects/${roomPageContext.projectContainer.pid}` : roomPageContext.container,
      version: roomPageContext.room ? `main` : roomPageContext.version,
      fsEntryId: roomPageContext.fsEntryId2 ?? roomPageContext.room?.fileId,
      path: roomPageContext.path,
      collapsed: roomPageContext.collapsed,
      iconLane: roomPageContext.iconLane,
      phone: roomPageContext.phone2,
      railSeated: roomPageContext.railSeated,
      readOnly: roomPageContext.commentsReadOnly2,
      commentOnly: roomPageContext.commentOnly,
      resolveOwnOnly: roomPageContext.resolveOwnOnly,
      room: roomPageContext.room && roomPageContext.projectContainer ? {
        pid: roomPageContext.projectContainer.pid,
        fileId: roomPageContext.room.fileId,
        nodeId: roomPageContext.roomNodeId
      } : undefined,
      widgetNodes: roomPageContext.room ? roomPageContext.split : undefined,
      widgetBlockOf: roomPageContext.widgetBlockOf,
      blockKindOf: roomPageContext.blockKindOf,
      askOffer: roomPageContext.askOffer,
      nodeName: roomPageContext.nodeName,
      onOpenNodeLog: roomPageContext.onOpenNodeLog,
      onRevealNode: roomPageContext.onRevealNode,
      onOverhang: roomPageContext.onOverhang,
      onCardSpans: roomPageContext.onCardSpans,
      onScrollDoc: roomPageContext.onScrollDoc,
      sheetScrollRef: roomPageContext.sheetScrollRef,
      onComposeExit: roomPageContext.onComposeExit,
      handFocusOut: roomPageContext.handFocusOut,
      onStageForClaude: DocumentRuntimePrototype ? roomPageContext.callback2 : undefined,
      railSync: roomPageContext.railSync,
      railWheelMountedRef: roomPageContext.railWheelMountedRef
    }, roomPageContext.fsEntryId2 ?? roomPageContext.room?.fileId)} />}
      <div ref={roomPageContext.pageRef} className={`relative min-w-0 flex-1`}>
        {roomPageContext.save && <span data-testid={`lfile-save-chip`} data-save={roomPageContext.save.word} data-pending={roomPageContext.save.pending} data-snippets={roomPageContext.items.length} role={`status`} className={`text-caption text-secondary absolute top-1 right-3 z-20 ${roomPageContext.documentHostStateSave ? `sr-only` : ``}`}>
            {resolvePlatformKeyboardAndSaveStatusSaved({
          linkWords: roomPageContext.saveWords,
          word: roomPageContext.save.word,
          named: roomPageContext.save.named,
          quiet: roomPageContext.quiet,
          kept: roomPageContext.items.length,
          turned: roomPageContext.turned
        })}
          </span>}
        {((..._extraArguments: unknown[]) => {
        let roomDocumentPageResult34: Dynamic = resolveEditorExtensionsRefusalClass();
        let jsx = roomPageContext.words && roomPageContext.stage ? <DocumentOpeningBanner words={roomPageContext.words} stage={roomPageContext.stage} onReload={(..._extraArguments: unknown[]): Dynamic => (globalThis as Dynamic).location?.reload()} /> : roomPageContext.words ? <SyncLossReportActions {...originalJsxProps({
          words: roomPageContext.words,
          ...(roomDocumentPageResult34 ? {
            onReport: roomPageContext.roomDocumentPageResult8 ? roomPageContext.openDebugReportDialog2 : undefined,
            supportCode: liveSupportCode()
          } : {})
        })} /> : roomPageContext.state ? <SyncLossBanner state={roomPageContext.state} onReport={roomPageContext.roomDocumentPageResult8 ? roomPageContext.openDebugReportDialog2 : undefined} supportCode={liveSupportCode()} /> : null;
        let jsx2 = roomPageContext.items.length > 0 ? <RecoveryTextPanel items={roomPageContext.items} onDismiss={roomPageContext.onDismiss} onCopyReport={resolveCommentsStoreValue30() ? roomPageContext.openDebugReportDialog2 : undefined} viewOnly={roomPageContext.readOnly2} gone={roomPageContext.gone} /> : null;
        let jsx3 = roomPageContext.words && roomPageContext.stage ? <div className={`pointer-events-none absolute inset-x-0 top-0`} style={{
          zIndex: roomPageContext.readTimeout
        }}>
                <DocumentOpeningSkeleton frameChrome={DocumentRuntimeState6} />
              </div> : null;
        if (roomDocumentPageResult34) return jsx || jsx2 ? <jsxRuntime.Fragment>
                {jsx3}
                <div {...originalJsxsProps({
            className: `pointer-events-none absolute inset-x-0 top-0 z-20 flex flex-col gap-2 px-3 ${roomPageContext.save && !roomPageContext.documentHostStateSave ? `pt-6` : `pt-3`}`,
            "data-testid": `ldoc-top-stack`,
            ...roomPageContext.useDocumentIframeFocus2,
            children: [jsx, jsx2]
          })} />
              </jsxRuntime.Fragment> : null;
        let turned2: Dynamic = roomPageContext.turned && !roomPageContext.documentHostStateSave && roomPageContext.saveWords === null && !roomPageContext.save?.named;
        return <jsxRuntime.Fragment>
              {jsx3}
              {jsx && <div {...originalJsxProps({
            className: `pointer-events-none absolute inset-x-0 top-0 z-20 px-3 ${turned2 ? `pt-6` : `pt-3`}`,
            ...roomPageContext.useDocumentIframeFocus2,
            children: jsx
          })} />}
              {jsx2 && <div {...originalJsxProps({
            className: `pointer-events-none absolute inset-x-0 ${turned2 ? `top-15` : `top-12`} z-20 px-3`,
            ...roomPageContext.useDocumentIframeFocus2,
            children: jsx2
          })} />}
            </jsxRuntime.Fragment>;
      })()}
        {roomPageContext.openAskCard?.docked === true && <InlineAskComposer {...originalJsxProps({
        nonce: roomPageContext.openAskCard.nonce,
        rect: roomPageContext.openAskCard.rect,
        notice: roomPageContext.notice,
        onPost: roomPageContext.onPost,
        onCancel: roomPageContext.onCancel,
        onEscape: roomPageContext.toText,
        onHeight: (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (0, roomPageContext.setCountState2)(roomDocumentPage > 0 ? roomDocumentPage + INLINE_ASK_COMPOSER_LAYOUT.bottom + INLINE_ASK_COMPOSER_LAYOUT.clearance : 0),
        suggestions: roomPageContext.suggestions2,
        dock: {
          icons: roomPageContext.icons,
          edgeLeft: roomPageContext.edgeLeft,
          wide: roomPageContext.wide,
          rail: roomPageContext.railDocked,
          layout: roomPageContext.layout,
          suppressed: roomPageContext.suppressed,
          onHolding: roomPageContext.setHoldingDraft,
          stashKey: roomPageContext.stashKey
        }
      }, roomPageContext.openAskCard.nonce)} />}
        {roomPageContext.useDocumentContextWarm2.warm && roomPageContext.frameMountEpoch === 0 ? <div ref={roomPageContext.useDocumentContextWarm2.slotRef} style={{
        display: `contents`
      }} data-warm-frame-slot={``} /> : <iframe {...originalJsxProps({
        ref: roomPageContext.seat,
        name: roomPageContext.frameMountEpoch === roomPageContext.elementRef38.current ? EditorHostLfileOrphanRemount : undefined,
        "aria-label": roomPageContext.title,
        sandbox: CommentsStoreAllowScripts,
        srcDoc: roomPageContext.srcDoc,
        onLoad: roomPageContext.onLoad,
        className: `block h-full w-full border-0`,
        "data-testid": `ldoc-iframe`,
        [EditorSelectionAndTablesDataPagesPrintSurface]: ``
      }, roomPageContext.frameMountEpoch)} />}
        {Object.keys(roomPageContext.recordState3).length > 0 && <style>{`@keyframes lfile-widget-chase{to{transform:rotate(360deg)}}`}</style>}
        {Object.keys(roomPageContext.recordState3).length > 0 && <div className={`pointer-events-none absolute inset-0 z-10 overflow-hidden ${roomPageContext.enabledState5 ? `invisible` : ``}`} data-testid={`widget-overlay-clip`}>
            {Object.entries(roomPageContext.recordState3).map(([recordStateEntry, recordStateEntry2]: Dynamic, ..._extraArguments: unknown[]) => {
          let build: Dynamic = roomPageContext.room ? roomPageContext.useNodeEngineNames2[recordStateEntry] : undefined;
          let sliceItem: Dynamic = roomPageContext.slice[recordStateEntry] ?? build?.prompt ?? undefined;
          let fileId4: Dynamic = roomPageContext.room?.fileId ?? roomPageContext.fsEntryId2;
          let dispatched = !!(fileId4 && roomPageContext.roomDocumentPageResult24[`${fileId4}#${recordStateEntry}`]);
          let documentContextValue: Dynamic = getDocumentContextValue(recordStateEntry);
          let total: Dynamic = documentContextValue ? documentContextValue.problems.length + documentContextValue.more : 0;
          let documentRuntimeBuild = resolveDocumentRuntimeBuild({
            failed: !!roomPageContext.recordState2[recordStateEntry]?.failed,
            blocked: !!roomPageContext.recordState2[recordStateEntry]?.blocked,
            draftPresent: recordStateEntry2.draft,
            dispatched: dispatched,
            queuedLocal: !!roomPageContext.recordState2[recordStateEntry]?.queued,
            build: build,
            draftBroken: roomPageContext.useDocumentRuntimeSubscribeProjectFeed2[recordStateEntry] === `errors` || DocumentRuntimeState6 && documentContextValue !== undefined,
            draftStatusUnknowable: DocumentRuntimeState6
          });
          let matchesDocumentRuntimeBuild = documentRuntimeBuild === `building`;
          let matchesDocumentRuntimeBuild2 = matchesDocumentRuntimeBuild || documentRuntimeBuild === `queued`;
          return <div {...originalJsxsProps({
            className: `bg-surface-popover pointer-events-none absolute rounded-lg`,
            style: {
              top: recordStateEntry2.top,
              left: recordStateEntry2.left,
              width: recordStateEntry2.width,
              height: recordStateEntry2.height,
              border: `1px solid ${roomPageContext.mode2 === `dark` ? `var(--cds-border)` : `#e8e5dc`}`
            },
            "data-testid": `widget-prompt-overlay`,
            children: [matchesDocumentRuntimeBuild2 && <div data-testid={`widget-loading-chase`} style={{
              position: `absolute`,
              inset: -1,
              borderRadius: 8,
              padding: 1,
              overflow: `hidden`,
              WebkitMask: `linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)`,
              WebkitMaskComposite: `xor`,
              maskComposite: `exclude`,
              pointerEvents: `none`
            }}>
                              {((..._extraArguments: unknown[]) => {
                let width = Math.ceil(Math.hypot(recordStateEntry2.width, recordStateEntry2.height)) + 4;
                return <div style={{
                  position: `absolute`,
                  left: `50%`,
                  top: `50%`,
                  width: width,
                  height: width,
                  margin: -width / 2,
                  background: `conic-gradient(transparent 0deg 190deg, ${roomPageContext.mode2 === `dark` ? `rgba(250,249,245,.4)` : `rgba(31,30,29,.45)`} 315deg, transparent 360deg)`,
                  animation: `lfile-widget-chase 1.1s linear infinite`
                }} />;
              })()}
                            </div>, <div className={`relative flex h-full w-full items-center overflow-hidden rounded-lg`} style={{
              padding: `10px 40px 10px 14px`
            }}>
                            <div className={`min-w-0`}>
                              <div className={`text-secondary text-footnote border-strong line-clamp-2 border-l-2 pl-2 leading-relaxed`}>
                                {sliceItem ? matchesDocumentRuntimeBuild ? `Building: ${sliceItem}` : sliceItem : `widget`}
                              </div>
                              {matchesDocumentRuntimeBuild && roomPageContext.useDocumentHostStateJoin2[recordStateEntry] && <div className={`text-secondary text-footnote mt-1.5 truncate`} data-testid={`widget-build-say`}>
                                    {roomPageContext.useDocumentHostStateJoin2[recordStateEntry]}
                                  </div>}
                              {documentRuntimeBuild === `error` && <div className={`text-danger text-footnote mt-1.5 flex items-center gap-1`} data-testid={`widget-build-failed`}>
                                  <UiOverlaysAndIconsCustomIcon name={`Warning`} customSize={12} />
                                  <span className={`min-w-0 truncate`}>{`Build failed — open the panel for details`}</span>
                                </div>}
                              {documentRuntimeBuild === `blocked` && <div className={`text-warning text-footnote mt-1.5 flex items-center gap-1`} data-testid={`widget-build-blocked`}>
                                  <UiOverlaysAndIconsCustomIcon name={`Warning`} customSize={12} />
                                  <span className={`min-w-0 truncate`}>{`Waiting for your approval — open the panel`}</span>
                                </div>}
                              {documentRuntimeBuild === `draft-errors` && <jsxRuntime.Fragment>
                                  <div className={`text-danger text-footnote mt-1.5 flex items-center gap-1`} data-testid={`widget-draft-errors`}>
                                    <UiOverlaysAndIconsCustomIcon name={`Warning`} customSize={12} />
                                    <span className={`min-w-0 truncate`}>
                                      {total > 0 ? `Draft widget — not published: the document's checks found ${total} problem${total === 1 ? `` : `s`}` : documentContextValue ? `Draft widget — not published: the document's checks did not accept the code` : `Draft widget — has errors`}
                                    </span>
                                  </div>
                                  {DocumentRuntimeState6 && documentContextValue && documentContextValue.problems.length > 0 && <div className={`text-secondary text-footnote mt-1 line-clamp-2`} data-testid={`widget-draft-errors-first`}>
                                        {resolveWidgetBridgeRule(documentContextValue.problems[0])}
                                        {total > 1 ? ` (+${total - 1} more)` : ``}
                                      </div>}
                                  {roomPageContext.enabled2 && !DocumentRuntimeState6 && <button type={`button`} data-testid={`widget-draft-errors-open-code`} onClick={(..._extraArguments: unknown[]): Dynamic => (0, roomPageContext.onOpenWidgetCode2)(recordStateEntry)} className={`text-danger text-footnote pointer-events-auto mt-1.5 cursor-pointer truncate hover:underline`}>{`Open code`}</button>}
                                </jsxRuntime.Fragment>}
                              {documentRuntimeBuild === `draft` && <div className={`text-secondary text-footnote mt-1.5 truncate`} data-testid={`widget-draft-note`}>{`Draft widget — not published yet`}</div>}
                              {documentRuntimeBuild === `draft-ready` && DocumentRuntimeState6 && <div className={`text-success text-footnote mt-1.5 truncate`} data-testid={`widget-build-draft-ready-note`}>{`Draft ready`}</div>}
                              {documentRuntimeBuild === `draft-ready` && !DocumentRuntimeState6 && <button type={`button`} data-testid={`widget-build-draft-ready`} onClick={(..._extraArguments: unknown[]): undefined => {
                  let roomDocumentPageResult34: Dynamic = resolvePlatformSessionAndSourcesTest4(recordStateEntry, (0, roomPageContext.roomDocumentPageHandler3)());
                  if (roomDocumentPageResult34 && roomPageContext.enabledRef13.current) {
                    roomPageContext.onOpenWidgetCodeRef.current?.(roomDocumentPageResult34);
                  }
                }} className={`text-success text-footnote pointer-events-auto mt-1.5 cursor-pointer truncate hover:underline`}>{`Draft ready — Review & publish`}</button>}
                              {documentRuntimeBuild === `queued` && <WidgetBuildQueued build={build} />}
                            </div>
                          </div>]
          }, recordStateEntry)} />;
        })}
          </div>}
        {((roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomDocumentPage && roomDocumentPage.docked !== true && (roomPageContext.useWidgetBridgeCurrent2 ? <InlineAskSheet {...originalJsxProps({
        nonce: roomDocumentPage.nonce,
        notice: roomPageContext.notice,
        onPost: roomPageContext.onPost,
        onCancel: (roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (0, roomPageContext.inlineAskHost2)(roomDocumentPage2),
        dirty: (..._extraArguments: unknown[]): Dynamic => useCommentStore.getState().dirtyEditors.has(`inline-ask`),
        sending: (..._extraArguments: unknown[]): Dynamic => roomPageContext.inlineAskHost.isSending(),
        onHeight: (roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomPageContext.inlineAskHost.height(roomDocumentPage.nonce, roomDocumentPage2),
        onLayout: (roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomPageContext.elementRef79.current(roomDocumentPage2),
        suggestions: roomPageContext.suggestions
      }, roomDocumentPage.nonce)} /> : <div className={`pointer-events-none absolute inset-0 overflow-hidden`} data-testid={`inline-ask-clip`} onScroll={(event?: Dynamic, ..._extraArguments: unknown[]): Dynamic => event.currentTarget.scrollTo(0, 0)}>
              <div ref={roomPageContext.addEventListener2} className={`pointer-events-none absolute inset-0`} data-testid={`inline-ask-layer`}>
                {roomPageContext.askInvitationKinds.current.has(roomDocumentPage.nonce) && roomPageContext.AskCardFace ? <roomPageContext.AskCardFace {...originalJsxProps({
            cardKey: roomPageContext.lookupRef.current.get(roomDocumentPage.nonce),
            nonce: roomDocumentPage.nonce,
            rect: roomDocumentPage.rect,
            notice: roomPageContext.notice,
            busy: roomPageContext.busyAskCard === roomDocumentPage.nonce,
            leaving: roomPageContext.leavingAskCard === roomDocumentPage.nonce,
            draftKey: roomPageContext.askCardDraft?.nonce === roomDocumentPage.nonce ? roomPageContext.askCardDraft.key : undefined,
            invites: roomPageContext.askInvitationKinds.current.get(roomDocumentPage.nonce) === `comment` ? `comment` : roomPageContext.blank === true ? `blank` : `write`,
            onTouched: (..._extraArguments: unknown[]): Dynamic => roomPageContext.askCardDeskRef.current?.touched(roomDocumentPage.nonce),
            onPost: roomPageContext.onPost2,
            onCancel: (roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (0, roomPageContext.inlineAskHost2)(true, roomDocumentPage2),
            onTabOut: roomPageContext.onTabOut,
            onHeight: (roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomPageContext.inlineAskHost.height(roomDocumentPage.nonce, roomDocumentPage2),
            why: roomPageContext.askWhyOffer?.nonce === roomDocumentPage.nonce ? {
              picked: roomPageContext.askWhyOffer.picked,
              thanks: roomPageContext.askWhyOffer.thanks === true,
              onChip: (roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]) => roomPageContext.askWhyKeysRef.current?.chip(roomDocumentPage2) === true,
              onPick: (roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
                let amount = document.activeElement instanceof Element && document.activeElement.closest(`[data-inline-ask="${roomDocumentPage.nonce}"]`) !== null;
                roomPageContext.askWhyRef.current?.pick(roomDocumentPage2);
                if (amount) {
                  (0, roomPageContext.toText)();
                }
              }
            } : null
          }, roomPageContext.lookupRef.current.get(roomDocumentPage.nonce) ?? roomDocumentPage.nonce)} /> : <InlineAskComposer {...originalJsxProps({
            nonce: roomDocumentPage.nonce,
            rect: roomDocumentPage.rect,
            notice: roomPageContext.notice,
            onPost: roomPageContext.onPost,
            onCancel: (..._extraArguments: unknown[]): Dynamic => (0, roomPageContext.inlineAskHost2)(true),
            onHeight: (roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomPageContext.inlineAskHost.height(roomDocumentPage.nonce, roomDocumentPage2),
            suggestions: roomPageContext.suggestions
          }, roomDocumentPage.nonce)} />}
              </div>
            </div>))(roomPageContext.openAskCard2)}
        {roomPageContext.enabled2 && roomPageContext.itemsState.length > 0 && <div className={`pointer-events-none absolute inset-0 z-10 overflow-hidden ${roomPageContext.enabledState5 ? `invisible` : ``}`} data-testid={`widget-stale-overlay-clip`}>
            {roomPageContext.itemsState.map((event?: Dynamic, ..._extraArguments: unknown[]) => {
          let id2: Dynamic = event.id;
          let disabled = !!roomPageContext.recordState[id2];
          return <div {...originalJsxsProps({
            className: `bg-surface-popover pointer-events-none absolute flex flex-col justify-center rounded-lg`,
            style: {
              top: event.top,
              left: event.left,
              width: event.width,
              height: event.height,
              padding: `12px 14px`,
              border: `1px solid ${roomPageContext.mode2 === `dark` ? `var(--cds-border)` : `#e8e5dc`}`
            },
            "data-testid": `widget-stale-overlay`,
            children: [<div className={`text-muted text-body`}>{`This block changed since it was last published.`}</div>, <div className={`text-muted text-footnote mt-0.5`}>{`Publish it again to update the render.`}</div>, <div className={`pointer-events-auto mt-2 self-start`}>
                            <Button variant={`secondary`} size={(0, roomPageContext.mode)(`sm`)} data-testid={`widget-stale-publish`} disabled={disabled} onClick={(..._extraArguments: unknown[]): undefined => void roomPageContext.errorRef2.current(id2)}>
                              {roomPageContext.room ? disabled ? `Publishing…` : `Publish` : `Open code`}
                            </Button>
                          </div>]
          }, event.key)} />;
        })}
          </div>}
        {(roomPageContext.fsEntryId2 ?? roomPageContext.room?.fileId) != null && (roomPageContext.room && roomPageContext.enabled || roomPageContext.enabled2 || roomPageContext.readOnly4) && <WidgetProvenanceGutter fetchFor={roomPageContext.room && roomPageContext.enabled ? roomPageContext.v3WidgetProvenance : undefined} railKey={roomPageContext.fsEntryId2 ?? roomPageContext.room?.fileId} onOpenDependencies={roomPageContext.enabled2 ? roomPageContext.onOpenWidgetPanel2 : undefined} vouch={roomPageContext.vouch} actions={roomPageContext.enabled2 ? roomPageContext.memoized3 : roomPageContext.readOnly4 ? roomPageContext.memoized4 : undefined} rightKeepout={roomPageContext.railDocked ? 340 : roomPageContext.icons ? 88 : 0} layoutMax={roomPageContext.wide ? 1700 : 1600} />}
        {roomPageContext.blockContextMenu && <WidgetSegMenuPopup {...originalJsxProps({
        x: roomPageContext.blockContextMenu.x,
        y: roomPageContext.blockContextMenu.y,
        noun: EditorSelectionAndTablesByFile2.getState().byFile[roomPageContext.useDocumentRuntimeFsEntryId3.current ?? roomPageContext.fileIdRef.current ?? ``]?.[roomPageContext.blockContextMenu.nodeId]?.noun,
        onComment: roomPageContext.commentsReadOnly2 ? undefined : (..._extraArguments: unknown[]): undefined => {
          let blockContextMenu2: Dynamic = roomPageContext.blockContextMenu;
          (0, roomPageContext.setBlockContextMenu)(null);
          (0, roomPageContext.send2)(blockContextMenu2.nodeId);
        },
        onViewData: roomPageContext.lastDataTarget !== null && roomPageContext.lastDataTarget.nodeId === roomPageContext.blockContextMenu.nodeId ? (..._extraArguments: unknown[]): undefined => {
          let blockContextMenu2: Dynamic = roomPageContext.blockContextMenu;
          (0, roomPageContext.setBlockContextMenu)(null);
          (0, roomPageContext.setTarget2)(resolveFrameGesturesRowsPin(roomPageContext.lastDataTarget, blockContextMenu2.gx, blockContextMenu2.gy, roomPageContext.countRef3.current));
        } : undefined,
        onSources: DocumentRuntimeState7 ? undefined : (..._extraArguments: unknown[]): undefined => {
          let blockContextMenu2: Dynamic = roomPageContext.blockContextMenu;
          (0, roomPageContext.setBlockContextMenu)(null);
          roomPageContext.onOpenWidgetPanelRef.current?.(blockContextMenu2.nodeId, `dependencies`);
        },
        onSourceCode: DocumentRuntimeState7 || !roomPageContext.enabled2 ? undefined : (..._extraArguments: unknown[]): undefined => {
          let blockContextMenu2: Dynamic = roomPageContext.blockContextMenu;
          (0, roomPageContext.setBlockContextMenu)(null);
          if (roomPageContext.onOpenWidgetCodeRef.current && !resolvePlatformSessionAndSourcesTest6(blockContextMenu2.nodeId)) {
            (0, roomPageContext.onOpenWidgetCode2)(blockContextMenu2.nodeId);
          } else {
            (0, roomPageContext.onOpenWidgetPanel3)(blockContextMenu2.nodeId, `code`);
          }
        },
        onReact: roomPageContext.commentsReadOnly2 || resolvePlatformSessionAndSourcesTest6(roomPageContext.blockContextMenu.nodeId) ? undefined : (roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (0, roomPageContext.onReact)(roomPageContext.blockContextMenu.nodeId, roomDocumentPage),
        onClose: (..._extraArguments: unknown[]): Dynamic => (0, roomPageContext.setBlockContextMenu)(null),
        onDelete: (0, roomPageContext.roomDocumentPageHandler4)(roomPageContext.blockContextMenu.nodeId) === `` ? undefined : (..._extraArguments: unknown[]): undefined => {
          let blockContextMenu2: Dynamic = roomPageContext.blockContextMenu;
          (0, roomPageContext.setBlockContextMenu)(null);
          (0, roomPageContext.onDelete)(blockContextMenu2.nodeId, {
            x: blockContextMenu2.gx,
            y: blockContextMenu2.gy
          });
        }
      }, `${roomPageContext.blockContextMenu.nodeId}@${roomPageContext.blockContextMenu.gx},${roomPageContext.blockContextMenu.gy}`)} />}
        {roomPageContext.useDocumentInteractionOverlays10 && <OpenCommentsReminder {...originalJsxProps({
        count: roomPageContext.useDocumentInteractionOverlays10.count,
        pulse: roomPageContext.useDocumentInteractionOverlays10.pulse,
        onClose: roomPageContext.onClose2
      }, roomPageContext.useDocumentInteractionOverlays10.token)} />}
        {roomPageContext.openUrl && <UseDocumentUploadsUrlComponent url={roomPageContext.openUrl} fromMention={roomPageContext.fromMention} onClose={(roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        if (roomDocumentPage) {
          roomPageContext.recordRef3.current.n = 0;
        }
        (0, roomPageContext.setOpenUrl)(null);
      }} />}
        {roomPageContext.enumEditDialog && <TypeEditorPopover {...originalJsxProps({
        anchor: roomPageContext.enumEditDialog.rect,
        typeRef: roomPageContext.enumEditDialog.typeRef,
        loadClaudeJson: (..._extraArguments: unknown[]): Dynamic => (roomPageContext.elementRef46.current = null, roomPageContext.elementRef48.current()),
        onDone: (name?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          let enumEditDialog2: Dynamic = roomPageContext.enumEditDialog;
          if (roomPageContext.enumEditDialogRef.current === enumEditDialog2) {
            (0, roomPageContext.setEnumEditDialog)(null);
            if (name) {
              roomPageContext.recordRef4.current.n = 0;
            }
            if (!roomPageContext.navigatedRef.current) {
              roomPageContext.frameMessengerRef.current.send(enumEditDialog2.win, name ? {
                type: `bridge-reply`,
                id: enumEditDialog2.id,
                ok: true,
                value: {
                  name: name
                }
              } : {
                type: `bridge-reply`,
                id: enumEditDialog2.id,
                ok: false,
                error: `cancelled`
              });
              if (name) {
                roomPageContext.elementRef47.current(name);
              }
            }
          }
        },
        container: roomPageContext.containerRef.current
      }, roomPageContext.enumEditDialog.id)} />}
        {!roomPageContext.useDocumentInteractionOverlays22 && <div className={`bg-surface-popover dark:bg-surface-0 text-muted absolute inset-0 flex items-center justify-center text-xs`}>{`Loading…`}</div>}
        {roomPageContext.linkPopover && <DocumentLinkPopover pop={roomPageContext.linkPopover} iframeEl={roomPageContext.iframeRef.current} readOnly={!!roomPageContext.readOnly2} onClose={(..._extraArguments: unknown[]): Dynamic => (0, roomPageContext.setLinkPopover)(null)} onEdit={(..._extraArguments: unknown[]): Dynamic => (0, roomPageContext.setLinkPopover)((roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomDocumentPage && {
        ...roomDocumentPage,
        mode: `edit`,
        openedAt: Date.now()
      })} onCancel={(..._extraArguments: unknown[]): undefined => {
        let nodeId2: Dynamic = roomPageContext.linkPopover.nodeId;
        (0, roomPageContext.setLinkPopover)(null);
        roomPageContext.selbarPortRef.current?.postMessage({
          type: `link-cancel`,
          nodeId: nodeId2
        });
      }} onCommit={(roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        (0, roomPageContext.setLinkPopover)(null);
        roomPageContext.selbarPortRef.current?.postMessage(roomDocumentPage);
      }} />}
        {roomPageContext.mentionPopover && <MediaAltTextPopover {...originalJsxProps({
        pop: roomPageContext.mentionPopover,
        iframeEl: roomPageContext.iframeRef.current,
        onClose: (..._extraArguments: unknown[]): undefined => {
          let nodeId2: Dynamic = roomPageContext.mentionPopover.nodeId;
          (0, roomPageContext.setMentionPopover2)();
          roomPageContext.selbarPortRef.current?.postMessage({
            type: `alt-cancel`,
            nodeId: nodeId2,
            keepFocus: true
          });
        },
        onCancel: (..._extraArguments: unknown[]): undefined => {
          let nodeId2: Dynamic = roomPageContext.mentionPopover.nodeId;
          (0, roomPageContext.setMentionPopover2)();
          roomPageContext.selbarPortRef.current?.postMessage({
            type: `alt-cancel`,
            nodeId: nodeId2
          });
        },
        onSave: (alt?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          let nodeId2: Dynamic = roomPageContext.mentionPopover.nodeId;
          (0, roomPageContext.setMentionPopover2)();
          roomPageContext.selbarPortRef.current?.postMessage({
            type: `alt-set`,
            nodeId: nodeId2,
            alt: alt
          });
        }
      }, roomPageContext.mentionPopover.openedAt)} />}
        {roomPageContext.insertMenuAnchor && <ImagePickPopup {...originalJsxProps({
        at: roomPageContext.insertMenuAnchor,
        onChoose: (..._extraArguments: unknown[]): undefined => void (0, roomPageContext.imagePicker)(),
        onClose: roomPageContext.onClose,
        returnFocusTo: roomPageContext.iframeRef
      }, roomPageContext.frameGesturesOpenedAtRef.current.openedAt)} />}
        {roomPageContext.frameError && <div className={`text-danger bg-surface-1 absolute right-2 bottom-2 left-2 rounded p-2 font-mono text-xs`}>
            {roomPageContext.frameError}
          </div>}
      </div>
      <SelectionActionsBar selection={roomPageContext.activeDataTarget ? {
      nodeId: roomPageContext.activeDataTarget.nodeId,
      target: roomPageContext.activeDataTarget.target
    } : null} anchor={roomPageContext.activeDataTarget?.anchor ?? null} canShowData={roomPageContext.activeDataTarget?.rows !== undefined || roomPageContext.activeDataTarget?.fed !== undefined} onClose={roomPageContext.onClose3} onPressOutside={roomPageContext.onPressOutside} onComment={roomPageContext.commentsReadOnly2 ? undefined : (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let activeDataTarget2: Dynamic = roomPageContext.activeDataTarget;
      (0, roomPageContext.setActiveDataTarget)(null);
      if (activeDataTarget2) {
        (0, roomPageContext.setDraftAnchor)(event.nodeId, event.target.component, activeDataTarget2.vs, activeDataTarget2.y, event.target, activeDataTarget2.words);
      }
    }} onReact={roomPageContext.commentsReadOnly2 ? undefined : (event?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let activeDataTarget2: Dynamic = roomPageContext.activeDataTarget;
      (0, roomPageContext.setActiveDataTarget)(null);
      let updateAmount2: Dynamic = (0, roomPageContext.updateAmount)(options);
      if (!(!activeDataTarget2 || updateAmount2 === undefined)) {
        (0, roomPageContext.setDraftAnchor)(event.nodeId, event.target.component, activeDataTarget2.vs, activeDataTarget2.y, event.target, activeDataTarget2.words, updateAmount2);
      }
    }} onAskClaude={roomPageContext.readOnly2 || DocumentRuntimeState6 ? undefined : (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      (0, roomPageContext.setActiveDataTarget)(null);
      let anchor: Dynamic = resolveCommentsStoreKind3(event.target);
      let text: Dynamic = resolveCommentsStoreNode(anchor);
      if (text) {
        if (roomPageContext.room && isFrameArtifact()) {
          let judge2: Dynamic = (0, roomPageContext.judge)(roomPageContext.lookupRef8.current.get(event.nodeId));
          if (!judge2) {
            toast(PlatformSessionAndSourcesMessage4, {
              id: `ask-claude-frame`,
              duration: 4e3
            });
            return;
          }
          (0, roomPageContext.callback)({
            text: text,
            ref: resolvePlatformSessionAndSourcesPath({
              file: roomPageContext.room.fileId,
              node: event.nodeId,
              bid: judge2.bid
            }),
            kind: `widget`,
            title: (0, roomPageContext.title2)(judge2.bid)
          });
          return;
        }
        if (roomPageContext.room) {
          updateEditorSelectionAndTablesChat(DocumentRuntimeSearch, {
            fileId: roomPageContext.room.fileId,
            anchor: anchor,
            text: text,
            nodeId: event.nodeId
          });
          return;
        }
        PlatformApiAndAuthAssign.getState().add({
          path: roomPageContext.labelRef2.current,
          hash: ``,
          text: text,
          block: null
        });
        preloadModule(async (..._extraArguments: unknown[]): Promise<Dynamic> => {
          let {
            revealChat: revealChat
          }: Dynamic = await import("../../platform/index").then((result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => result.PlatformRuntimeAndChatDISCONNECTTOASTID);
          return {
            revealChat: revealChat
          };
        }, mapPreloadDependencies([0, 1, 2, 3]), roomPageContext.roomPageModuleUrl).then(({
          revealChat: revealChat
        }: Dynamic, ..._extraArguments: unknown[]): undefined => {
          revealChat();
          setTimeout((..._extraArguments: unknown[]) => window.dispatchEvent(new Event(`bongo:focusChat`)), 0);
        });
      }
    }} onTrackSource={DocumentRuntimeState7 ? undefined : (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let activeDataTarget2: Dynamic = roomPageContext.activeDataTarget;
      (0, roomPageContext.setActiveDataTarget)(null);
      (0, roomPageContext.setTarget)({
        nodeId: event.nodeId,
        target: event.target,
        ...(activeDataTarget2?.rows === undefined ? {} : {
          rows: activeDataTarget2.rows
        }),
        ...(activeDataTarget2?.rowsPin === undefined ? {} : {
          rowsPin: activeDataTarget2.rowsPin
        }),
        ...(activeDataTarget2?.fed === undefined ? {} : {
          fed: activeDataTarget2.fed
        }),
        ...(activeDataTarget2?.fedPath === undefined ? {} : {
          fedPath: activeDataTarget2.fedPath
        }),
        ...(activeDataTarget2?.at === undefined ? {} : {
          at: activeDataTarget2.at
        }),
        ...(activeDataTarget2?.status === undefined ? {} : {
          status: activeDataTarget2.status
        })
      });
    }} onViewData={(event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      let activeDataTarget2: Dynamic = roomPageContext.activeDataTarget;
      (0, roomPageContext.setActiveDataTarget)(null);
      (0, roomPageContext.setTarget2)({
        ...activeDataTarget2,
        nodeId: event.nodeId,
        target: event.target
      });
    }} />
      <TargetSourcePopover open={roomPageContext.target !== null} onOpenChange={(roomDocumentPage?: Dynamic, ..._extraArguments: unknown[]): undefined => {
      if (!roomDocumentPage) {
        (0, roomPageContext.setTarget)(null);
      }
    }} pid={roomPageContext.room?.pid ?? ``} target={roomPageContext.target} />
    </div>;
}
