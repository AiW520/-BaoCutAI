/** BaoCut: document uploads from index-CX4IZqzA.js. */
import type { Dynamic } from "../interop/legacy-dynamic";
import {
  Button,
  CommentsActionsAndSelectionState3,
  DEFAULT_STATUS_ENUM,
  ENUM_COLORS,
  UiDialogsRoot,
  UiOverlaysAndIconsCustomIcon,
  api,
  createPagesAssetRefusedEvent,
  emitTelemetryEvent,
  enumSchema,
  frameUploadAsset,
  isFrameArtifact,
  originalJsxProps,
  originalJsxsProps,
  preloadModule,
  resolveDataModelSchemasValue14,
  resolveObservabilityBrowserAndOperationEventsDenyUnrowed,
  resolvePlatformArtifactLinksIncludes2,
  resolvePlatformArtifactLinksTest2,
  resolvePlatformImagesAndBlobsValue8,
  resolvePlatformSessionAndSourcesReplace,
  resolvePlatformSyncAndRoutingCompact,
  toast,
  updatePlatformImagesAndBlobsAsset,
} from "./dependencies";
import {
  React,
  mapPreloadDependencies,
} from "./bootstrap";
import {
  PhoneDialogPopup,
  isDocumentFocusedElsewhere,
} from "./phone-overlays/export-progress-dialog";
import {
  resolveDocumentSelectionName,
} from "./document-selection/create-heading-normalization-plugin";
import {
  clearFrameGesturesIsArray,
  resolveFrameGesturesValue7,
  resolveFrameGesturesValue8,
  resolveFrameGesturesValue9,
  updateFrameGesturesDelete2,
} from "./frame/gestures-state-1";
import {
  resolveWidgetBridgeValue2,
} from "./widget-bridge/widget-sample-card";
import {
  resolveDocumentLinksOpen,
} from "./document-links";

function LinkPopoverIconButton(
  linkPopoverIconButton?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    <Button
      size={`xs`}
      variant={`ghost`}
      iconOnly={true}
      icon={
        <UiOverlaysAndIconsCustomIcon
          name={linkPopoverIconButton.icon}
          size={`sm`}
        />
      }
      aria-label={linkPopoverIconButton.label}
      disabled={linkPopoverIconButton.disabled}
      onClick={linkPopoverIconButton.onClick}
    />
  );
}

var documentUploadsLimit20: number;

var DocumentUploadsState: number;

var resolveDocumentUploadsValue: Dynamic;

var DocumentUploadsState2: number;

function resolveDocumentUploadsThen(
  documentUploadsThen?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return new (Promise as Dynamic)(
    (
      resolve?: Dynamic,
      reject?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let setTimeout2 = setTimeout(
        (..._extraArguments: unknown[]): undefined => {
          try {
            resolve(options());
          } catch (resolveDocumentUploadsThenResult: Dynamic) {
            reject(resolveDocumentUploadsThenResult);
          }
        },
        DocumentUploadsState2,
      );
      documentUploadsThen.then(
        (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          clearTimeout(setTimeout2);
          resolve(result);
        },
        (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          clearTimeout(setTimeout2);
          reject(result);
        },
      );
    },
  );
}

var resolveDocumentUploadsValue2: (..._extraArguments: unknown[]) => undefined;

var resolveDocumentUploadsCode: Dynamic;

var resolveDocumentUploadsThen2: (documentUploadsThen2?: Dynamic, ..._extraArguments: unknown[]) => undefined;

async function uploadDroppedFiles(
  items?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  let items2: Dynamic = [];
  let RegExp2 = RegExp(`[\\\\/\\u0000-\\u001f]`, `g`);
  let enabled = false;
  if (items.length > documentUploadsLimit20) {
    toast.error(
      resolveWidgetBridgeValue2(items.length, documentUploadsLimit20),
    );
    emitTelemetryEvent(createPagesAssetRefusedEvent(`too_many_files`, `frame`));
  }
  for (
    let index = 0;
    index < items.length && index < documentUploadsLimit20;
    index++
  ) {
    let itemItem: Dynamic = items[index];
    let name: Dynamic = (
      resolveDocumentSelectionName(itemItem, index)
        .replace(RegExp2, `_`)
        .replace(/^\.+/, ``) || `image`
    ).slice(0, 512);
    let documentUploadsThen: Dynamic = await resolveDocumentUploadsThen(
      frameUploadAsset(itemItem),
      resolveDocumentUploadsCode,
    );
    if (documentUploadsThen.ok) {
      try {
        let intend: Dynamic = await options.intend({
          verb: `create`,
          object: `blob`,
          engine: `blob`,
          payload: {
            asset: documentUploadsThen.id,
            parent: {
              object: `file`,
              id: options.fileId,
            },
          },
        });
        if (intend.verdict !== `allow` || !intend.minted)
          throw Error(
            intend.verdict === `deny`
              ? `blob create deny: ${intend.reason}`
              : `blob create: no minted id`,
          );
        let blob = resolvePlatformImagesAndBlobsValue8(intend.minted);
        if (blob === null) throw Error(`blob create: malformed id`);
        updatePlatformImagesAndBlobsAsset(blob, documentUploadsThen.id);
        updateFrameGesturesDelete2(blob, name);
        items2.push({
          src: {
            kind: `ref`,
            blob: blob,
            mime: documentUploadsThen.contentType,
          },
          name: name,
        });
      } catch (error: Dynamic) {
        let label =
          error instanceof Error &&
          error.message.startsWith(`blob create deny: `)
            ? resolveObservabilityBrowserAndOperationEventsDenyUnrowed(
                error.message.slice(18),
              )
            : `blob_create`;
        console.warn(
          `[lfile] host-drop:`,
          label,
          resolveDataModelSchemasValue14(error),
        );
        toast.error(resolveFrameGesturesValue7(name));
        emitTelemetryEvent(createPagesAssetRefusedEvent(label, `frame`));
      }
      continue;
    }
    switch (
      (emitTelemetryEvent(
        createPagesAssetRefusedEvent(documentUploadsThen.code, `frame`),
      ),
      documentUploadsThen.code)
    ) {
      case `unsupported_type`:
        toast.error(resolveFrameGesturesValue8(name));
        break;
      case `too_large`:
        toast.error(
          resolveFrameGesturesValue9(name, itemItem.type.startsWith(`video/`)),
        );
        break;
      case `invalid_request`:
        toast.error(`"${name}" is empty.`);
        break;
      case `quota_or_state`:
        toast.error(
          `This document can't take more images right now (storage limit).`,
        );
        return items2;
      case `rate_limited`:
        toast.error(`Adding images too quickly — wait a moment and try again.`);
        return items2;
      case `not_granted`:
      case `unavailable`:
      case `capability_disabled`:
      case `capability_removed`:
        if (!enabled) {
          toast.error(
            `You can read this document but not add images to it here.`,
          );
        }
        enabled = true;
        break;
      case `upstream_auth`:
        toast.error(
          `Couldn't add the image — reload the page and sign in again.`,
        );
        return items2;
      default:
        toast.error(resolveFrameGesturesValue7(name));
    }
  }
  return items2;
}

function resolveDocumentUploadsError(
  documentUploadsError?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (isFrameArtifact())
    for (let resolveDocumentUploadsErrorResult of clearFrameGesturesIsArray(
      documentUploadsError,
    ) as Dynamic) {
      toast.error(
        resolveFrameGesturesValue7(resolveDocumentUploadsErrorResult),
      );
      emitTelemetryEvent(
        createPagesAssetRefusedEvent(`insert_refused`, `frame`),
      );
    }
}

async function handleHostDropFiles(
  items?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<Dynamic> {
  if (!items.length) return [];
  if (
    !options.room &&
    (isFrameArtifact() || !options.fileRef || !options.rev)
  ) {
    console.warn(`[lfile] host-drop: room not ready`);
    toast.error(`Upload failed: document not ready`);
    emitTelemetryEvent(
      createPagesAssetRefusedEvent(
        `not_ready`,
        isFrameArtifact() ? `frame` : `standalone`,
      ),
    );
    return [];
  }
  if (isFrameArtifact()) return uploadDroppedFiles(items, options.room);
  if (items.length > documentUploadsLimit20) {
    toast.error(
      resolveWidgetBridgeValue2(items.length, documentUploadsLimit20),
    );
    emitTelemetryEvent(
      createPagesAssetRefusedEvent(`too_many_files`, `standalone`),
    );
    return [];
  }
  let label: Dynamic = options.room
    ? ``
    : (options.fileRef ?? ``).replace(/^f-/, ``);
  let RegExp2 = RegExp(`[\\\\/\\u0000-\\u001f]`, `g`);
  let items2: Dynamic = [];
  for (let index = 0; index < items.length; index++) {
    let itemItem: Dynamic = items[index];
    let name: Dynamic = (
      resolveDocumentSelectionName(itemItem, index)
        .replace(RegExp2, `_`)
        .replace(/^\.+/, ``) || `file`
    ).slice(0, 512);
    if (itemItem.size > DocumentUploadsState) {
      toast.error(
        `"${name}" is too large to embed (${DocumentUploadsState / 1024 / 1024}MB max).`,
      );
      emitTelemetryEvent(
        createPagesAssetRefusedEvent(`too_large`, `standalone`),
      );
      continue;
    }
    try {
      let mime: Dynamic = /^[\w.+-]+\/[\w.+-]+$/.test(itemItem.type)
        ? itemItem.type
        : `application/octet-stream`;
      let arrayBuffer: Dynamic = await itemItem.arrayBuffer();
      if (options.room) {
        let { sha: sha256 }: Dynamic = await resolveDocumentUploadsThen(
          api.blob.put(new Uint8Array(arrayBuffer)),
          resolveDocumentUploadsValue2,
        );
        let intend: Dynamic = await options.room.intend({
          verb: `create`,
          object: `blob`,
          engine: `blob`,
          payload: {
            engine: `blob`,
            sha256: sha256,
            bytes: arrayBuffer.byteLength,
            mime: mime,
            parent: {
              object: `file`,
              id: options.room.fileId,
            },
          },
        });
        if (intend.verdict !== `allow` || !intend.minted)
          throw Error(
            intend.verdict === `deny`
              ? `blob create deny: ${intend.reason}`
              : `blob create: no minted id`,
          );
        let blob = resolvePlatformImagesAndBlobsValue8(intend.minted);
        if (blob === null) throw Error(`blob create: malformed id`);
        items2.push({
          src: {
            kind: `ref`,
            blob: blob,
            mime: mime,
          },
          name: name,
        });
      } else {
        let { sha: sha, size: size }: Dynamic =
          await resolveDocumentUploadsThen(
            api.lfile.blobPut(options.dir, label, new Uint8Array(arrayBuffer)),
            resolveDocumentUploadsValue2,
          );
        items2.push({
          src: {
            kind: `blob`,
            sha: sha,
            size: size,
            mime: mime,
          },
          name: name,
        });
      }
    } catch (error: Dynamic) {
      let replace = (
        error instanceof Error ? error.message : String(error)
      ).replace(/\?[^\s]*/g, `?[redacted]`);
      console.warn(`[lfile] host-drop:`, replace);
      toast.error(`Upload failed: ${name}`);
      emitTelemetryEvent(
        createPagesAssetRefusedEvent(
          error instanceof Error &&
            error.message.startsWith(`blob create deny: `)
            ? resolveObservabilityBrowserAndOperationEventsDenyUnrowed(
                error.message.slice(18),
              )
            : `upload_failed`,
          `standalone`,
        ),
      );
    }
  }
  return items2;
}

var documentUploadsLimit500: number;

function OpenCommentsReminder(
  { count: count, pulse: pulse, onClose: onClose }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let label = count === 1 ? `1 open comment is` : `${count} open comments are`;
  let label2 = count === 1 ? `The comment stays` : `The comments stay`;
  let elementRef: Dynamic = (0, React.useRef)(null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let setTimeout2 = setTimeout(
        (..._extraArguments: unknown[]): undefined =>
          void (
            isDocumentFocusedElsewhere(document) || elementRef.current?.focus()
          ),
        documentUploadsLimit500,
      );
      return (..._extraArguments: unknown[]) => clearTimeout(setTimeout2);
    },
    [pulse],
  );
  return (
    <UiDialogsRoot.Root
      open={true}
      onOpenChange={(
        openCommentsReminder?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => !openCommentsReminder && onClose(false)}
    >
      <PhoneDialogPopup size={`sm`} initialFocus={false}>
        <UiDialogsRoot.Header
          showClose={true}
        >{`Delete commented text?`}</UiDialogsRoot.Header>
        <div className={`text-secondary px-lg pb-md text-body`}>
          {`This deletes text that `}
          {label}
          {` attached to. `}
          {label2}
          {` in the comments panel but will no longer point at anything in the document, and Undo will not re-attach`}
          {` `}
          {count === 1 ? `it` : `them`}
          {`.`}
        </div>
        <UiDialogsRoot.Footer align={`end`}>
          <UiDialogsRoot.Close
            ref={elementRef}
            render={<Button>{`Cancel`}</Button>}
          />
          <Button
            variant={`danger`}
            onClick={(..._extraArguments: unknown[]): Dynamic => onClose(true)}
          >{`Delete anyway`}</Button>
        </UiDialogsRoot.Footer>
      </PhoneDialogPopup>
    </UiDialogsRoot.Root>
  );
}

function UseDocumentUploadsUrlComponent(
  { url: url, fromMention = false, onClose: onClose }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let [enabledState, setEnabledState]: Dynamic = (0, React.useState)(false);
  let matchesProtocol = url.protocol === `http:` || url.protocol === `https:`;
  let origin: Dynamic = matchesProtocol
    ? url.origin
    : `${url.protocol}${url.pathname}`;
  let total: Dynamic = matchesProtocol
    ? url.pathname + url.search + url.hash
    : url.search;
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      setEnabledState(false);
      let setTimeout2 = setTimeout(
        (..._extraArguments: unknown[]): Dynamic => setEnabledState(true),
        400,
      );
      return (..._extraArguments: unknown[]) => clearTimeout(setTimeout2);
    },
    [url.href],
  );
  let onClick = (..._extraArguments: unknown[]): undefined => {
    if (enabledState) {
      resolveDocumentLinksOpen(url.href);
      onClose(true);
    }
  };
  let fromMention2: Dynamic =
    fromMention &&
    matchesProtocol &&
    resolvePlatformArtifactLinksIncludes2(url.origin) !== null &&
    url.pathname.startsWith(`/code/artifact/`) &&
    resolvePlatformArtifactLinksTest2(url.pathname.slice(15)) &&
    url.search === `` &&
    url.hash === ``;
  return (
    <UiDialogsRoot.Root
      open={true}
      onOpenChange={(
        documentUploadsUrl?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => !documentUploadsUrl && onClose(false)}
    >
      <PhoneDialogPopup size={`sm`}>
        <UiDialogsRoot.Header showClose={true}>
          {fromMention2 ? `Open this document?` : `Open external link?`}
        </UiDialogsRoot.Header>
        <div className={`text-secondary px-lg pb-md text-body`}>
          <div className={`mb-sm`}>
            {fromMention2
              ? `This mention opens another document, in a new browser tab, at`
              : `This document wants to open a link to`}
          </div>
          <div
            className={`bg-surface-1 rounded-card p-sm max-h-40 overflow-auto font-mono text-sm`}
          >
            <div className={`font-medium break-all`}>{origin}</div>
            {total && (
              <div className={`text-muted mt-xs text-xs break-all`}>
                {total}
              </div>
            )}
          </div>
        </div>
        <UiDialogsRoot.Footer align={`end`}>
          <UiDialogsRoot.Close
            render={<Button autoFocus={true}>{`Cancel`}</Button>}
          />
          <Button
            variant={`primary`}
            disabled={!enabledState}
            onClick={onClick}
          >{`Open`}</Button>
        </UiDialogsRoot.Footer>
      </PhoneDialogPopup>
    </UiDialogsRoot.Root>
  );
}

var DocumentUploadsNeutral: Dynamic;

function TypeEditorPopover(
  {
    anchor: anchor,
    typeRef: typeRef,
    container: container,
    loadClaudeJson: loadClaudeJson,
    onDone: onDone,
  }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let typeEditorPopoverResult: Dynamic = resolvePlatformSyncAndRoutingCompact();
  let matchesTypeRef = typeRef === null;
  let countRef: Dynamic = (0, React.useRef)(0);
  let typeEditorPopoverHandler: Dynamic = (
    typeEditorPopover?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    k: countRef.current++,
    l: typeEditorPopover,
    c: options,
  });
  let slice: Dynamic = (
    typeEditorPopover?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let typeEditorPopoverSlice: Dynamic = typeEditorPopover.slice();
    typeEditorPopoverSlice[options] = {
      ...typeEditorPopoverSlice[options],
      ...context,
    };
    return typeEditorPopoverSlice;
  };
  let [typeRefState, setTypeRefState]: Dynamic = (0, React.useState)(
    typeRef ?? ``,
  );
  let [itemsState, setItemsState]: Dynamic = (0, React.useState)([
    typeEditorPopoverHandler(``, `neutral`),
  ]);
  let [typeEditorPopoverState, setTypeEditorPopoverState]: Dynamic = (0,
  React.useState)(null);
  let [enabledState, setEnabledState]: Dynamic = (0, React.useState)(false);
  let [labelState, setLabelState]: Dynamic = (0, React.useState)(``);
  (0, React.useEffect)((..._extraArguments: unknown[]): Dynamic => {
    let enabled2 = true;
    loadClaudeJson().then(
      (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        if (enabled2)
          if (typeRef) {
            let typeItem: Dynamic =
              result.types && Object.hasOwn(result.types, typeRef)
                ? result.types[typeRef]
                : null;
            setTypeEditorPopoverState(typeItem);
            if (typeItem?.enum?.length) {
              let typeItemItem: Dynamic = typeItem[`x-display`] ?? {};
              setItemsState(
                typeItem.enum.map(
                  (result2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                    typeEditorPopoverHandler(
                      String(result2),
                      ENUM_COLORS.includes(typeItemItem[result2]?.color ?? ``)
                        ? typeItemItem[result2].color
                        : `neutral`,
                    ),
                ),
              );
            }
          } else if (!result.types || Object.keys(result.types).length === 0) {
            setTypeRefState(DEFAULT_STATUS_ENUM.name);
            setItemsState(
              DEFAULT_STATUS_ENUM.opts.map(
                (opt?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  typeEditorPopoverHandler(opt.l, opt.c),
              ),
            );
          }
      },
    );
    return (..._extraArguments: unknown[]): undefined => {
      enabled2 = false;
    };
  }, []);
  let enabled = !CommentsActionsAndSelectionState3.test(typeRefState);
  return (
    <div
      role={`dialog`}
      aria-label={
        matchesTypeRef ? `New dropdown type` : `Edit type: ${typeRef}`
      }
      className={`border-strong bg-surface-popover fixed z-[2147483646] flex w-[300px] flex-col gap-2 rounded-md border p-2 text-sm shadow-md duration-100`}
      style={{
        top: anchor.top + anchor.height + 4,
        left: anchor.left,
      }}
      data-testid={`type-editor-popover`}
    >
      <div
        className={`text-muted flex items-center justify-between text-[11px] font-semibold tracking-wide uppercase`}
      >
        <span>
          {matchesTypeRef
            ? `New dropdown type`
            : `Edit type: ${resolvePlatformSessionAndSourcesReplace(typeRef)}`}
        </span>
        <button
          type={`button`}
          aria-label={`Close`}
          className={`text-muted hover:text-primary -m-1 p-1`}
          onClick={(..._extraArguments: unknown[]): Dynamic => onDone(null)}
        >
          <UiOverlaysAndIconsCustomIcon name={`X`} size={`sm`} />
        </button>
      </div>
      <div className={`flex max-h-[280px] flex-col gap-1.5 overflow-auto`}>
        {itemsState.map(
          (
            itemsState2?: Dynamic,
            index?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => (
            <div
              {...originalJsxsProps(
                {
                  className: `flex items-center gap-2`,
                  children: [
                    <div className={`flex flex-none gap-[5px] p-[2px]`}>
                      {ENUM_COLORS.map(
                        (
                          ariaLabel?: Dynamic,
                          ..._extraArguments: unknown[]
                        ): Dynamic => (
                          <button
                            {...originalJsxProps(
                              {
                                type: `button`,
                                "aria-label": ariaLabel,
                                "aria-pressed": itemsState2.c === ariaLabel,
                                onClick: (
                                  ..._extraArguments: unknown[]
                                ): Dynamic =>
                                  setItemsState(
                                    (
                                      typeEditorPopover?: Dynamic,
                                      ..._extraArguments: unknown[]
                                    ): Dynamic =>
                                      slice(typeEditorPopover, index, {
                                        c: ariaLabel,
                                      }),
                                  ),
                                className: `relative h-[14px] w-[14px] cursor-pointer rounded-[3px] transition-transform hover:scale-[1.15]`,
                                style: {
                                  background: DocumentUploadsNeutral[ariaLabel],
                                  boxShadow:
                                    itemsState2.c === ariaLabel
                                      ? `0 0 0 1px #fff, 0 0 0 2px #3d3929`
                                      : undefined,
                                },
                                children: itemsState2.c === ariaLabel && (
                                  <UiOverlaysAndIconsCustomIcon
                                    name={`Check`}
                                    size={`xs`}
                                    className={`absolute inset-0 m-auto text-white drop-shadow-sm`}
                                  />
                                ),
                              },
                              ariaLabel,
                            )}
                          />
                        ),
                      )}
                    </div>,
                    <input
                      value={itemsState2.l}
                      placeholder={`Option`}
                      maxLength={80}
                      className={`border-strong bg-surface-0 focus:border-accent min-w-0 flex-1 rounded border px-1.5 py-1 text-sm`}
                      onChange={(
                        event?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): Dynamic =>
                        setItemsState(
                          (
                            typeEditorPopover?: Dynamic,
                            ..._extraArguments: unknown[]
                          ): Dynamic =>
                            slice(typeEditorPopover, index, {
                              l: event.target.value,
                            }),
                        )
                      }
                    />,
                    <button
                      type={`button`}
                      aria-label={`Remove`}
                      className={`text-muted hover:text-danger flex-none px-1`}
                      onClick={(..._extraArguments: unknown[]): Dynamic =>
                        setItemsState(
                          (
                            typeEditorPopover?: Dynamic,
                            ..._extraArguments: unknown[]
                          ): Dynamic =>
                            typeEditorPopover.filter(
                              (
                                item?: unknown,
                                index2?: Dynamic,
                                ..._extraArguments: unknown[]
                              ) => index2 !== index,
                            ),
                        )
                      }
                    >{`×`}</button>,
                  ],
                },
                itemsState2.k,
              )}
            />
          ),
        )}
        <Button
          size={typeEditorPopoverResult(`sm`)}
          variant={`secondary`}
          onClick={(..._extraArguments: unknown[]): Dynamic =>
            setItemsState(
              (
                typeEditorPopover?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => [
                ...typeEditorPopover,
                typeEditorPopoverHandler(``, `neutral`),
              ],
            )
          }
        >{`+ Add option`}</Button>
      </div>
      <div className={`border-strong -mx-2 border-t`} />
      <div className={`flex items-center gap-2`}>
        <input
          value={typeRefState}
          placeholder={`type-name`}
          readOnly={!matchesTypeRef}
          aria-invalid={matchesTypeRef && typeRefState.length > 0 && enabled}
          className={
            `border-strong bg-surface-0 min-w-0 flex-1 rounded border px-1.5 py-1 font-mono text-sm ` +
            (matchesTypeRef ? `` : `text-muted`) +
            (matchesTypeRef && typeRefState.length > 0 && enabled
              ? ` border-danger`
              : ``)
          }
          onChange={(event?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            matchesTypeRef && setTypeRefState(event.target.value)
          }
        />
        <Button
          size={typeEditorPopoverResult(`sm`)}
          variant={`primary`}
          disabled={enabledState || enabled}
          onClick={(..._extraArguments: unknown[]): Dynamic => {
            setLabelState(``);
            if (enabled) return;
            let filteredMappedItemsState: Dynamic = itemsState
              .map(
                (
                  itemsState2?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => ({
                  l: itemsState2.l.trim().slice(0, 80),
                  c: itemsState2.c,
                }),
              )
              .filter(
                (
                  mappedItemsState?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => mappedItemsState.l,
              );
            if (!filteredMappedItemsState.length)
              return setLabelState(`at least one option required`);
            if (filteredMappedItemsState.length > 64)
              return setLabelState(`max 64 options`);
            if (
              new (Set as Dynamic)(
                filteredMappedItemsState.map(
                  (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                    item.l,
                ),
              ).size !== filteredMappedItemsState.length
            )
              return setLabelState(`option labels must be unique`);
            setEnabledState(true);
            let typeEditorPopoverResult2: Dynamic = enumSchema(
              filteredMappedItemsState,
              typeEditorPopoverState,
            );
            api.types
              .define(container, typeRefState, typeEditorPopoverResult2)
              .then(
                (..._extraArguments: unknown[]): Dynamic =>
                  onDone(typeRefState),
                (error?: Dynamic, ..._extraArguments: unknown[]): undefined => {
                  setLabelState(
                    error instanceof Error ? error.message : `save failed`,
                  );
                  setEnabledState(false);
                },
              );
          }}
        >{`Save`}</Button>
      </div>
      {labelState && <div className={`text-danger text-xs`}>{labelState}</div>}
    </div>
  );
}

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeDocumentUploadsStep1(): void {
  (documentUploadsLimit20 = 20);
  (DocumentUploadsState = 25 * 1024 * 1024);
  (resolveDocumentUploadsValue = (..._extraArguments: unknown[]) =>
    isFrameArtifact() ? 2e7 : DocumentUploadsState);
  (DocumentUploadsState2 = 5 * 6e4);
  (resolveDocumentUploadsValue2 = (
    ..._extraArguments: unknown[]
  ): undefined => {
    throw Error(`upload timed out`);
  });
  (resolveDocumentUploadsCode = (..._extraArguments: unknown[]) => (
    console.warn(`[lfile] host-drop: upload timed out`),
    {
      ok: false,
      code: `upstream_error`,
    }
  ));
  (resolveDocumentUploadsThen2 = (
    documentUploadsThen2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined =>
    void preloadModule(
      (..._extraArguments: unknown[]): Dynamic =>
        import("../platform/index")
          .then(
            (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              result.rg,
          )
          .then(
            (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              result.ingestFiles(documentUploadsThen2),
          ),
      mapPreloadDependencies([0, 1, 2, 3]),
      import.meta.url,
    ));
  (documentUploadsLimit500 = 500);
  (DocumentUploadsNeutral = {
    neutral: `var(--cds-text-muted, #8a8882)`,
    accent: `var(--cds-fill-accent, #2a78d6)`,
    success: `var(--cds-fill-success, #009300)`,
    warning: `var(--cds-fill-warning, #fab219)`,
    danger: `var(--cds-fill-danger, #d03b3b)`,
    pro: `var(--cds-fill-pro, #7161e0)`,
  });
}

export {
  LinkPopoverIconButton,
  OpenCommentsReminder,
  TypeEditorPopover,
  UseDocumentUploadsUrlComponent,
  handleHostDropFiles,
  resolveDocumentUploadsError,
  resolveDocumentUploadsThen2,
  resolveDocumentUploadsValue,
};
