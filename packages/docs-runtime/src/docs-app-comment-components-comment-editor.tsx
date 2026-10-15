/** BaoCut: comment components from index-CX4IZqzA.js. */
import type { Dynamic } from "./types";
import {
  Button,
  CommentCard,
  CommentsEditorCollect,
  DataModelSchemasClaude,
  DataModelSchemasLabel3,
  EDIT_BOX_PREFIX,
  commentDenyCopy,
  commentTooLong,
  commentWords,
  frameHotActivity,
  frameHotProvide,
  getTextBetween,
  getTextSerializersFromSchema,
  isFrameArtifact,
  loadPlatformSyncAndRoutingClipboard,
  nothingToSee,
  originalJsxProps,
  originalJsxsProps,
  resolveDataModelSchemasAlways,
  resolveDataModelSchemasBody,
  resolveEditorAnchorsAndMentionsReplaceAll,
  resolveEditorAnchorsAndMentionsValue13,
  resolvePlatformSessionAndSourcesClaude,
  resolvePlatformSyncAndRoutingCompact,
  resolveUiDesignSystemValue2,
  threadClosed,
  toast,
  useCommentStore,
} from "./docs-app-dependencies";
import {
  React,
  jsxRuntime,
} from "./docs-app-bootstrap";
import {
  canRestoreFocus,
  classifyFocusLocation,
} from "./docs-app-document-recovery";
import {
  CommentComposerNode,
  CommentComposerState7,
  updateCommentComposerExtensions,
} from "./docs-app-comment-composer";
import {
  CommentClaudeToggle,
  useCommentComponentsWrapper,
} from "./docs-app-comment-components-comment-reply-sheet";

var resolveCommentComponentsError: (..._extraArguments: unknown[]) => undefined;

function CommentEditor(
  {
    initial: initial,
    onSave: onSave,
    onCancel: onCancel,
    sendToClaude = false,
    container: container,
    chrome: chrome,
    returnAddsLine = false,
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let commentEditorResult: Dynamic = resolvePlatformSyncAndRoutingCompact();
  let elementRef: Dynamic = (0, React.useRef)(null);
  let elementRef2: Dynamic = (0, React.useRef)(null);
  let elementRef3: Dynamic = (0, React.useRef)(null);
  let [checked, onChange]: Dynamic = (0, React.useState)(false);
  let enabledRef: Dynamic = (0, React.useRef)(false);
  enabledRef.current = checked;
  let sendToClaudeRef: Dynamic = (0, React.useRef)(sendToClaude);
  sendToClaudeRef.current = sendToClaude;
  let onSaveRef: Dynamic = (0, React.useRef)(onSave);
  onSaveRef.current = onSave;
  let [named, setNamed]: Dynamic = (0, React.useState)(DataModelSchemasClaude);
  let route: Dynamic = {
    checked: checked,
    byPerson: true,
    onChange: onChange,
  };
  let sendToClaude2: Dynamic =
    sendToClaude && resolveDataModelSchemasAlways(route, named);
  let controlId: Dynamic = (0, React.useId)();
  let initial2: Dynamic = resolveEditorAnchorsAndMentionsReplaceAll(initial);
  let enabledRef2: Dynamic = (0, React.useRef)(false);
  let [busy, setBusy]: Dynamic = (0, React.useState)(false);
  let [initialState, setInitialState]: Dynamic = (0, React.useState)(initial2);
  let label = `${EDIT_BOX_PREFIX}${(0, React.useId)()}`;
  let onModEnter: Dynamic = async (
    ..._extraArguments: unknown[]
  ): Promise<Dynamic> => {
    let element: Dynamic = elementRef3.current;
    if (!element || enabledRef2.current) return;
    let typed: Dynamic = commentWords(
      element.getText({
        blockSeparator: `
`,
      }),
    ).trim();
    let toClaude: Dynamic =
      sendToClaudeRef.current === true &&
      resolveDataModelSchemasAlways(
        {
          checked: enabledRef.current,
          byPerson: true,
          onChange: onChange,
        },
        mapCommentComponentsClaude(element),
      );
    let body: Dynamic = toClaude
      ? resolveDataModelSchemasBody(typed, []).body
      : typed;
    if (nothingToSee(typed) || body === commentWords(initial2).trim())
      return onCancel();
    if (isFrameArtifact() && commentTooLong(body, initial))
      return resolveCommentComponentsError();
    let activeElement: Dynamic =
      elementRef.current?.ownerDocument.activeElement;
    enabledRef2.current = true;
    setBusy(true);
    try {
      let onSave2: Dynamic = await onSaveRef.current(body, {
        toClaude: toClaude,
        ...(body !== typed && {
          typed: typed,
        }),
        ...(toClaude && {
          pressedAt: Date.now(),
        }),
      });
      let element2: Dynamic = elementRef.current;
      let classifyFocusLocation2 = classifyFocusLocation(
        element2,
        element2?.ownerDocument,
      );
      if (
        onSave2 === `left-open` &&
        element2 &&
        canRestoreFocus({
          at: classifyFocusLocation2,
        }) &&
        (classifyFocusLocation2 === `nothing` ||
          element2.ownerDocument.activeElement === activeElement)
      ) {
        elementRef3.current?.commands.focus();
      }
    } finally {
      enabledRef2.current = false;
      setBusy(false);
    }
  };
  (0, React.useLayoutEffect)((..._extraArguments: unknown[]): Dynamic => {
    let element: Dynamic = elementRef2.current;
    if (!element) return;
    let {
      ed: updateCommentComposerExtensions2,
      cleanup: updateCommentComposerExtensions3,
    }: Dynamic = updateCommentComposerExtensions(element, {
      initial: initial2,
      container: container,
      ...(chrome === `cds` && {
        chrome: `flush`,
      }),
      ...(returnAddsLine
        ? {
            onModEnter: onModEnter,
          }
        : {
            onEnter: onModEnter,
          }),
      onEscape: onCancel,
      onUpdate: (
        commentEditor?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        useCommentStore.getState().setEditorDirty(
          label,
          commentEditor
            .getText({
              blockSeparator: `
`,
            })
            .trim() !== initial2.trim() ||
            (sendToClaudeRef.current === true && enabledRef.current),
        );
        let mapCommentComponentsClaude2: Dynamic =
          mapCommentComponentsClaude(commentEditor);
        setNamed(
          (commentEditor2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            resolveCommentComponentsClaude(
              commentEditor2,
              mapCommentComponentsClaude2,
            )
              ? commentEditor2
              : mapCommentComponentsClaude2,
        );
        if (chrome === `cds`) {
          setInitialState(
            commentEditor.getText({
              blockSeparator: `
`,
            }),
          );
        }
      },
    });
    elementRef3.current = updateCommentComposerExtensions2;
    setNamed(mapCommentComponentsClaude(updateCommentComposerExtensions2));
    return (..._extraArguments: unknown[]): undefined => {
      useCommentStore.getState().setEditorDirty(label, false);
      updateCommentComposerExtensions3();
      elementRef3.current = null;
    };
  }, []);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (!(!sendToClaude || !checked)) {
        useCommentStore.getState().setEditorDirty(label, true);
        return (..._extraArguments: unknown[]): undefined => {
          let element: Dynamic = elementRef3.current;
          if (element !== null) {
            useCommentStore.getState().setEditorDirty(
              label,
              element
                .getText({
                  blockSeparator: `
`,
                })
                .trim() !== initial2.trim(),
            );
          }
        };
      }
    },
    [sendToClaude, checked],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      let dom: Dynamic = elementRef3.current?.view.dom;
      if (dom) {
        if (sendToClaude2) {
          dom.setAttribute(`aria-describedby`, controlId);
        } else {
          dom.removeAttribute(`aria-describedby`);
        }
      }
    },
    [sendToClaude2, controlId],
  );
  let useCommentComponentsWrapper2: Dynamic = useCommentComponentsWrapper(
    sendToClaude ? route : null,
    named,
    busy,
    (..._extraArguments: unknown[]): Dynamic =>
      elementRef3.current?.commands.focus(),
  );
  return chrome === `cds` ? (
    <span
      {...originalJsxsProps({
        className: `contents`,
        ...useCommentComponentsWrapper2.wrapper,
        children: [
          sendToClaude2 && (
            <span
              id={controlId}
              hidden={true}
              data-testid={`comment-route-said`}
            >
              {/* BaoCut: 称「agent」，不称 Claude。 */}
              {`Sends to agent`}
            </span>
          ),
          <CommentCard.EditField
            {...originalJsxProps({
              ref: elementRef,
              editor: <div ref={elementRef2} data-chat-editor={true} />,
              value: initialState,
              savedValue: initial2,
              busy: busy,
              onSave: (..._extraArguments: unknown[]): undefined =>
                void onModEnter(),
              onCancel: onCancel,
              sendToClaude: useCommentComponentsWrapper2.sendToClaude,
              "data-testid": `comment-edit`,
              onClick: (
                commentEditor?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => commentEditor.stopPropagation(),
              ...(returnAddsLine && {
                onPointerDown: resolveCommentComponentsTarget2,
                onMouseDown: resolveCommentComponentsTarget2,
              }),
            })}
          />,
        ],
      })}
    />
  ) : (
    <div
      ref={elementRef}
      className={`flex flex-col gap-1`}
      onClick={(
        commentEditor?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => commentEditor.stopPropagation()}
      data-testid={`comment-edit`}
    >
      {sendToClaude2 && (
        <span
          id={controlId}
          hidden={true}
          data-testid={`comment-route-said`}
        >
          {/* BaoCut: 称「agent」，不称 Claude。 */}
          {`Sends to agent`}
        </span>
      )}
      <div ref={elementRef2} data-chat-editor={true} />
      <div className={`flex items-center justify-end gap-2`}>
        {sendToClaude && (
          <CommentClaudeToggle
            route={route}
            named={named}
            busy={busy}
            className={`mr-auto min-w-0`}
            onPointerToggle={(..._extraArguments: unknown[]): Dynamic =>
              elementRef3.current?.commands.focus()
            }
          />
        )}
        <Button
          variant={`secondary`}
          size={commentEditorResult(`sm`)}
          onClick={onCancel}
        >{`Cancel`}</Button>
        <Button
          size={commentEditorResult(`sm`)}
          variant={`primary`}
          disabled={busy}
          onClick={onModEnter}
        >{`Save`}</Button>
      </div>
    </div>
  );
}

var CommentComponents_BorderStrongTextSecondaryTextCaptionMb2LineClamp2BorderS2Ps2FontNormal: string;

function UseCommentComponentsTextComponent(
  { text: text, lead: lead, testid: testid, part = false }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let jsxs = (
    <jsxRuntime.Fragment>
      {lead !== undefined && (
        <span className={`text-muted`}>
          {lead}
          {` `}
        </span>
      )}
      {text}
    </jsxRuntime.Fragment>
  );
  return part ? (
    <CommentCard.Quote data-testid={testid}>{jsxs}</CommentCard.Quote>
  ) : (
    <div
      className={
        CommentComponents_BorderStrongTextSecondaryTextCaptionMb2LineClamp2BorderS2Ps2FontNormal
      }
      data-testid={testid}
    >
      {jsxs}
    </div>
  );
}

function ChartLineSwatch(
  { line: line, testid = `chart-line`, part = false }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let jsxs = (
    <jsxRuntime.Fragment>
      {line.color !== undefined && (
        <span
          aria-hidden={true}
          data-testid={`chart-line-swatch`}
          className={`me-1.5 inline-block size-2 rounded-full align-middle`}
          style={{
            background: line.color,
          }}
        />
      )}
      {line.text}
    </jsxRuntime.Fragment>
  );
  return part ? (
    <CommentCard.Quote data-testid={testid}>{jsxs}</CommentCard.Quote>
  ) : (
    <div
      className={
        CommentComponents_BorderStrongTextSecondaryTextCaptionMb2LineClamp2BorderS2Ps2FontNormal
      }
      data-testid={testid}
    >
      {jsxs}
    </div>
  );
}

function UseCommentComponentsFromComponent(
  { from: from, to: to2, flush = false }: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    <div
      className={resolveUiDesignSystemValue2(
        `border-accent bg-accent rounded border-l-2 px-2 py-1.5 text-[12px]`,
        !flush && `mb-2`,
      )}
    >
      <div className={`text-muted whitespace-pre-wrap line-through`}>
        {from}
      </div>
      <div className={`text-primary whitespace-pre-wrap`}>{to2}</div>
    </div>
  );
}

function mapCommentComponentsType(
  mapCommentComponentsType2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!mapCommentComponentsType2) return ``;
  let join: Dynamic = (
    node?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    if (node.type === `text`) return node.text ?? ``;
    if (node.type === `hardBreak`)
      return `
`;
    if (node.type === CommentComposerNode.name)
      return `@${String(node.attrs?.label ?? node.attrs?.id ?? ``)}`;
    if (node.type === CommentComposerState7.name)
      return resolveEditorAnchorsAndMentionsValue13(node.attrs ?? {});
    let mappedContent: Dynamic = (node.content ?? []).map(join);
    return node.type === `doc`
      ? mappedContent.join(`
`)
      : mappedContent.join(``);
  };
  return join(mapCommentComponentsType2).trim();
}

var CommentComponents_Message: string;

var resolveCommentComponentsValue: (commentComponentsValue?: Dynamic, ..._extraArguments: unknown[]) => string;

function resolveCommentComponentsDuration(
  ..._extraArguments: unknown[]
): undefined {
  let storeState: Dynamic = useCommentStore.getState();
  for (let [
    resolveCommentComponentsDurationResult,
    resolveCommentComponentsDurationResult2,
  ] of Object.entries(storeState.replyDrafts) as Dynamic)
    if (
      !(
        resolveCommentComponentsDurationResult2.told ||
        !threadClosed(
          resolveCommentComponentsDurationResult,
          resolveCommentComponentsDurationResult2.pageId,
        )
      )
    ) {
      storeState.markReplyDraftTold(resolveCommentComponentsDurationResult);
      toast.info(CommentComponents_Message, {
        id: resolveCommentComponentsValue(
          resolveCommentComponentsDurationResult,
        ),
        duration: 1 / 0,
        action: {
          label: `Copy`,
          onClick: (..._extraArguments: unknown[]): undefined =>
            void useCommentComponentsDuration(
              mapCommentComponentsType(
                (
                  useCommentStore.getState().replyDrafts[
                    resolveCommentComponentsDurationResult
                  ] ?? resolveCommentComponentsDurationResult2
                ).json,
              ),
            ),
        },
      });
    }
}

async function useCommentComponentsDuration(
  commentComponentsDuration?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<undefined> {
  if (await loadPlatformSyncAndRoutingClipboard(commentComponentsDuration)) {
    toast.success(`Reply copied`, {
      id: `copy-draft`,
    });
  } else {
    toast.error(
      <jsxRuntime.Fragment>
        {`Couldn't copy — select it here and press ⌘C (Ctrl-C):`}
        <span
          className={`mt-1 block max-h-24 overflow-y-auto font-normal break-all whitespace-pre-wrap select-all`}
        >
          {commentComponentsDuration}
        </span>
      </jsxRuntime.Fragment>,
      {
        id: `copy-draft`,
        duration: 2e4,
      },
    );
  }
}

var CommentComponents_Styles: string;

var resolveCommentComponentsPreventDefault: Dynamic;

var resolveCommentComponentsTarget: (event?: Dynamic, ..._extraArguments: unknown[]) => undefined;

var resolveCommentComponentsTarget2: (event?: Dynamic, ..._extraArguments: unknown[]) => undefined;

function resolveCommentComponentsLabel(
  commentComponentsLabel?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  commentComponentsLabel.state.doc.descendants(
    (
      commentComponentsLabel2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        commentComponentsLabel2.type.name === CommentComposerNode.name &&
        commentComponentsLabel2.attrs.id
      ) {
        items.push({
          id: String(commentComponentsLabel2.attrs.id),
          label: commentComponentsLabel2.attrs.label,
        });
      }
    },
  );
  return items;
}

function mapCommentComponentsClaude(
  mapCommentComponentsClaude2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let mappedCommentComponentsLabel: Dynamic = resolveCommentComponentsLabel(
    mapCommentComponentsClaude2,
  ).map(
    (
      commentComponentsLabel?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => commentComponentsLabel.id,
  );
  let record: Dynamic = {
    claude: resolvePlatformSessionAndSourcesClaude(
      commentWords(mapCommentComponentsClaude2.getText()),
      mappedCommentComponentsLabel,
    ),
    others: mappedCommentComponentsLabel.some(
      (
        mappedCommentComponentsLabel2?: Dynamic,
        ..._extraArguments: unknown[]
      ) => mappedCommentComponentsLabel2 !== DataModelSchemasLabel3.id,
    ),
  };
  let isCommentComponentsFirstChild2: Dynamic = isCommentComponentsFirstChild(
    mapCommentComponentsClaude2,
  );
  return isCommentComponentsFirstChild2 === null
    ? record
    : resolvePlatformSessionAndSourcesClaude(
          commentWords(
            resolveCommentComponentsFrom(
              mapCommentComponentsClaude2,
              isCommentComponentsFirstChild2,
            ),
          ),
          mappedCommentComponentsLabel.slice(1),
        )
      ? {
          ...record,
          tag: true,
        }
      : {
          ...record,
          tag: true,
          lead: true,
        };
}

var resolveCommentComponentsClaude: Dynamic;

function resolveCommentComponentsFrom(
  commentComponents?: Dynamic,
  from?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let doc: Dynamic = commentComponents.state.doc;
  return getTextBetween(
    doc,
    {
      from: from,
      to: doc.content.size,
    },
    {
      textSerializers: getTextSerializersFromSchema(commentComponents.schema),
    },
  );
}

var resolveCommentComponentsTrim: Dynamic;

function isCommentComponentsFirstChild(
  commentComponentsFirstChild?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let firstChild: Dynamic =
    commentComponentsFirstChild.state.doc.firstChild?.firstChild;
  return !firstChild ||
    firstChild.type.name !== CommentComposerNode.name ||
    String(firstChild.attrs.id) !== DataModelSchemasLabel3.id
    ? null
    : 1 + firstChild.nodeSize;
}

function resolveCommentComponentsSchema(
  commentComponentsSchema?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let { schema: state, tr: state2 }: Dynamic = commentComponentsSchema.state;
  let create2: Dynamic = state.nodes[CommentComposerNode.name].create({
    id: DataModelSchemasLabel3.id,
    label: DataModelSchemasLabel3.label,
  });
  commentComponentsSchema.view.dispatch(
    state2
      .insert(1, [create2, state.text(` `)])
      .setMeta(`addToHistory`, false)
      .setMeta(`preventUpdate`, true),
  );
}

function isCommentComponentsMaps(
  commentComponentsMaps?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let count: Dynamic = 1;
  let count2: Dynamic = 2;
  for (let isCommentComponentsMapsResult of commentComponentsMaps.mapping
    .maps as Dynamic) {
    let enabled = false;
    isCommentComponentsMapsResult.forEach(
      (
        item?: Dynamic,
        index?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (item < count2 && index > count) {
          enabled = true;
        }
      },
    );
    if (enabled) return false;
    count = isCommentComponentsMapsResult.map(count, 1);
    count2 = isCommentComponentsMapsResult.map(count2, -1);
  }
  return count === 1 && count2 === 2;
}

function clearCommentComponentsDoc(
  clearCommentComponentsDoc2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let isCommentComponentsFirstChild2: Dynamic = isCommentComponentsFirstChild(
    clearCommentComponentsDoc2,
  );
  if (isCommentComponentsFirstChild2 === null) return;
  let { doc: state, tr: state2 }: Dynamic = clearCommentComponentsDoc2.state;
  let matchesIsCommentComponentsFirstChild =
    isCommentComponentsFirstChild2 < state.content.size &&
    state.textBetween(
      isCommentComponentsFirstChild2,
      isCommentComponentsFirstChild2 + 1,
      `
`,
      `
`,
    ) === ` `;
  clearCommentComponentsDoc2.view.dispatch(
    state2
      .delete(
        1,
        matchesIsCommentComponentsFirstChild
          ? isCommentComponentsFirstChild2 + 1
          : isCommentComponentsFirstChild2,
      )
      .setMeta(`addToHistory`, false)
      .setMeta(`preventUpdate`, true),
  );
}

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeCommentComponentsCommentEditorStep1(): void {
  (resolveCommentComponentsError = (
    ..._extraArguments: unknown[]
  ): undefined =>
    void toast.error(commentDenyCopy(`row_too_large`), {
      id: `comments:row_too_large`,
    }));
  (CommentComponents_BorderStrongTextSecondaryTextCaptionMb2LineClamp2BorderS2Ps2FontNormal = `border-strong text-secondary text-caption mb-2 line-clamp-2 border-s-2 ps-2 font-normal`);
  (CommentComponents_Message = `This thread was closed — your draft was kept.`);
  (resolveCommentComponentsValue = (
    commentComponentsValue?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `kept-reply:${commentComponentsValue}`);
  frameHotProvide(`comments`, CommentsEditorCollect);
  useCommentStore.subscribe(
    (
      callback?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        callback.dirtyEditors !== options.dirtyEditors ||
        callback.draftAnchor !== options.draftAnchor ||
        callback.outbox !== options.outbox
      ) {
        frameHotActivity();
      }
      if (callback.replyDrafts !== options.replyDrafts)
        for (let localResult of Object.keys(options.replyDrafts) as Dynamic)
          if (callback.replyDrafts[localResult] === undefined) {
            toast.dismiss(resolveCommentComponentsValue(localResult));
          }
      if (
        !(
          callback.replyDrafts === options.replyDrafts &&
          callback.byPage === options.byPage &&
          callback.allByPage === options.allByPage &&
          callback.resolvedIds === options.resolvedIds
        )
      ) {
        resolveCommentComponentsDuration();
      }
    },
  );
  (CommentComponents_Styles = `[contenteditable], button, a, label, [role="checkbox"], [role="button"]`);
  (resolveCommentComponentsPreventDefault = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => event.preventDefault());
  (resolveCommentComponentsTarget = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      event.target instanceof Element &&
      event.target.closest(`[data-cds-part="send"]`)
    ) {
      event.preventDefault();
    }
  });
  (resolveCommentComponentsTarget2 = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (event.target instanceof Element && event.target.closest(`button`)) {
      event.preventDefault();
    }
  });
  (resolveCommentComponentsClaude = (
    commentComponentsClaude?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    commentComponentsClaude.claude === options.claude &&
    commentComponentsClaude.others === options.others &&
    (commentComponentsClaude.tag === true) == (options.tag === true) &&
    (commentComponentsClaude.lead === true) == (options.lead === true));
  (resolveCommentComponentsTrim = (
    commentComponentsTrim?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveCommentComponentsFrom(
      commentComponentsTrim,
      isCommentComponentsFirstChild(commentComponentsTrim) ?? 0,
    ).trim());
}

export {
  ChartLineSwatch,
  CommentComponents_Styles,
  CommentEditor,
  UseCommentComponentsFromComponent,
  UseCommentComponentsTextComponent,
  clearCommentComponentsDoc,
  isCommentComponentsFirstChild,
  isCommentComponentsMaps,
  mapCommentComponentsClaude,
  mapCommentComponentsType,
  resolveCommentComponentsClaude,
  resolveCommentComponentsError,
  resolveCommentComponentsFrom,
  resolveCommentComponentsLabel,
  resolveCommentComponentsPreventDefault,
  resolveCommentComponentsSchema,
  resolveCommentComponentsTarget,
  resolveCommentComponentsTrim,
};
