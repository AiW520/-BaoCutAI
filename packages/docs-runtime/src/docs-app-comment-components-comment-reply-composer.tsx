/** BaoCut: comment components from index-CX4IZqzA.js. */
import type { Dynamic } from "./types";
import {
  Button,
  CommentQueuedError,
  DataModelSchemasClaude,
  DataModelSchemasLabel3,
  DataModelSchemasSendToClaudeChecked,
  DataModelSchemasSendToClaudeUnchecked,
  clearCommentsEditorBoxGoneAt,
  commentTooLong,
  commentWords,
  fieldHoverClasses,
  frameHotActivity,
  isFrameArtifact,
  mintedThreadId,
  nothingToSee,
  quoteWords,
  resolveCommentsEditorKind,
  resolveDataModelSchemasAlways,
  resolveDataModelSchemasBody,
  resolveDataModelSchemasBody3,
  resolveDataModelSchemasChecked3,
  resolveDataModelSchemasLabel2,
  resolveDataModelSchemasRemove,
  resolveDataModelSchemasTrim,
  resolveEditorAnchorsAndMentionsRef3,
  resolveEditorAnchorsAndMentionsReplaceAll,
  resolveEditorAnchorsAndMentionsTest,
  resolvePlatformAnnouncementsValue,
  resolvePlatformSyncAndRoutingCompact,
  textAreaSurfaceClasses,
  threadClosed,
  updateCommentsEditorDelete,
  useCommentStore,
} from "./docs-app-dependencies";
import {
  React,
  jsxRuntime,
} from "./docs-app-bootstrap";
import {
  isDocumentFocusedElsewhere,
} from "./docs-app-phone-overlays-export-progress-dialog";
import {
  canRestoreFocus,
  classifyFocusLocation,
} from "./docs-app-document-recovery";
import {
  AskSuggestionsMeasure,
  resolveCommentSessionPrompt,
} from "./docs-app-comment-session-ask-suggestions-measure";
import {
  useCommentAnchorsCurrent,
} from "./docs-app-comment-anchors-use-comment-anchors-sheets-component";
import {
  CommentComposerNode,
  resolveCommentComposerPreventScroll,
  updateCommentComposerExtensions,
} from "./docs-app-comment-composer";
import {
  CommentComponents_Styles,
  clearCommentComponentsDoc,
  isCommentComponentsFirstChild,
  isCommentComponentsMaps,
  mapCommentComponentsClaude,
  resolveCommentComponentsClaude,
  resolveCommentComponentsError,
  resolveCommentComponentsFrom,
  resolveCommentComponentsLabel,
  resolveCommentComponentsPreventDefault,
  resolveCommentComponentsSchema,
  resolveCommentComponentsTarget,
  resolveCommentComponentsTrim,
} from "./docs-app-comment-components-comment-editor";
import {
  CommentClaudeToggle,
  CommentComposerCds,
} from "./docs-app-comment-components-comment-reply-sheet";

function CommentReplyComposer(
  {
    onPost: onPost,
    onPosted: onPosted,
    onCancel: onCancel,
    placeholder = `Reply…`,
    ariaLabel: ariaLabel,
    submitLabel = `Reply`,
    layout = `inline`,
    claudeRoute: claudeRoute,
    addressClaude: addressClaude,
    composerChrome = `boxed`,
    checkboxSeat = `box`,
    returnAddsLine = false,
    composerForm: composerForm,
    foldWhenIdle: foldWhenIdle,
    autoFocus: autoFocus,
    initial: initial,
    enableCCSessions: enableCCSessions,
    coworkerContainer: coworkerContainer,
    refPid: refPid,
    boxId: boxId,
    lockWhileBusy: lockWhileBusy,
    holdWhileBusy: holdWhileBusy,
    heldFromOutside: heldFromOutside,
    persistent: persistent,
    draftKey: draftKey,
    draftPageId: draftPageId,
    suggestions: suggestions,
    onHolding: onHolding,
    onDraftNames: onDraftNames,
    sendHeld: sendHeld,
  }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let commentReplyComposerResult: Dynamic =
    resolvePlatformSyncAndRoutingCompact();
  let elementRef: Dynamic = (0, React.useRef)(null);
  let elementRef2: Dynamic = (0, React.useRef)(null);
  let matchesLayout = layout === `composer`;
  let matchesLayout2 = matchesLayout && composerChrome === `card`;
  let matchesLayout3 = matchesLayout && composerChrome === `cds`;
  let sheetSeat = matchesLayout3 && checkboxSeat === `header`;
  let matchesComposerChrome =
    composerChrome === `flush` || matchesLayout2 || matchesLayout3;
  let matchesLayout4 = matchesLayout && composerChrome === `sheet`;
  let plainEnterPosts = !(
    matchesLayout4 ||
    sheetSeat ||
    (matchesLayout && returnAddsLine)
  );
  let claudeRouteRef: Dynamic = (0, React.useRef)(claudeRoute);
  claudeRouteRef.current = claudeRoute;
  let matchesSendHeldRef: Dynamic = (0, React.useRef)(sendHeld === true);
  matchesSendHeldRef.current = sendHeld === true;
  let commentReplyComposerHandler: Dynamic = (
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let claudeRoute3: Dynamic = claudeRouteRef.current;
    return matchesLayout &&
      typeof claudeRoute3 == `object` &&
      claudeRoute3.tag === true
      ? claudeRoute3
      : null;
  };
  let getText: Dynamic = (
    commentReplyComposer?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    (addressClaude === true &&
      resolveDataModelSchemasTrim(commentReplyComposer.getText())) ||
    (commentReplyComposerHandler() !== null &&
      isCommentComponentsFirstChild(commentReplyComposer) !== null &&
      resolveCommentComponentsTrim(commentReplyComposer) === ``);
  let reduce: Dynamic = (
    commentReplyComposer?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let children: Dynamic =
      commentReplyComposer.state.doc.firstChild?.children ?? [];
    let childrenIndex: Dynamic = children.findIndex(
      (node?: Dynamic, ..._extraArguments: unknown[]) =>
        !node.isText || commentWords(node.text ?? ``) !== ``,
    );
    return childrenIndex > 0 &&
      children[childrenIndex].type.name === CommentComposerNode.name &&
      String(children[childrenIndex].attrs.id) === DataModelSchemasLabel3.id
      ? 1 +
          children
            .slice(0, childrenIndex + 1)
            .reduce(
              (
                accumulator?: Dynamic,
                node?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => accumulator + node.nodeSize,
              0,
            )
      : null;
  };
  let getText2: Dynamic = (
    commentReplyComposer?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let text: Dynamic = commentReplyComposer.getText();
    if (commentWords(text) === text) return getText(commentReplyComposer);
    let isCommentComponentsFirstChild2: Dynamic =
      addressClaude === true || commentReplyComposerHandler() !== null
        ? (isCommentComponentsFirstChild(commentReplyComposer) ??
          reduce(commentReplyComposer))
        : null;
    return (
      (addressClaude === true &&
        resolveDataModelSchemasTrim(
          commentWords(commentReplyComposer.getText()),
        )) ||
      (isCommentComponentsFirstChild2 !== null &&
        nothingToSee(
          commentWords(
            resolveCommentComponentsFrom(
              commentReplyComposer,
              isCommentComponentsFirstChild2,
            ),
          ),
        ))
    );
  };
  let getText3: Dynamic = (
    commentReplyComposer?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    commentReplyComposer.isEmpty ||
    nothingToSee(commentWords(commentReplyComposer.getText())) ||
    getText(commentReplyComposer);
  let getText4: Dynamic = (
    commentReplyComposer?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    getText3(commentReplyComposer) || getText2(commentReplyComposer);
  let [enabledState, setEnabledState]: Dynamic = (0, React.useState)(
    (..._extraArguments: unknown[]): Dynamic =>
      initial
        ? nothingToSee(commentWords(initial))
        : !(
            draftKey !== undefined &&
            useCommentStore.getState().replyDrafts[draftKey]
          ),
  );
  let [enabledStateState, setEnabledStateState]: Dynamic = (0, React.useState)(
    enabledState,
  );
  let draftKeyRef: Dynamic = (0, React.useRef)(draftKey);
  draftKeyRef.current = draftKey;
  let draftPageIdRef: Dynamic = (0, React.useRef)(draftPageId);
  draftPageIdRef.current = draftPageId;
  let enabledRef: Dynamic = (0, React.useRef)(false);
  let stashReplyDraft = (
    commentReplyComposer?: Dynamic,
    json?: Dynamic,
    context: Dynamic = false,
    ..._extraArguments: unknown[]
  ): undefined => {
    let claudeRoute3: Dynamic = claudeRouteRef.current;
    useCommentStore.getState().stashReplyDraft(
      mintedThreadId(commentReplyComposer),
      {
        json: json,
        pageId: draftPageIdRef.current ?? ``,
        ...(enabledRef.current && {
          told: true,
        }),
        ...(matchesLayout &&
          typeof claudeRoute3 == `object` && {
            box: {
              checked: claudeRoute3.checked,
              byPerson: claudeRoute3.byPerson === true,
            },
          }),
      },
      context,
    );
  };
  let enabledRef2: Dynamic = (0, React.useRef)(false);
  let [busy, setBusy]: Dynamic = (0, React.useState)(false);
  let elementRef3: Dynamic = (0, React.useRef)(null);
  let enabled: Dynamic = !enabledStateState || busy;
  let onHoldingRef: Dynamic = (0, React.useRef)(onHolding);
  onHoldingRef.current = onHolding;
  let elementRef4: Dynamic = (0, React.useRef)(null);
  let elementRef5: Dynamic = (0, React.useRef)(undefined);
  let onHolding2 = (..._extraArguments: unknown[]): undefined => {
    let element: Dynamic = elementRef2.current;
    if (!element) return;
    let enabled2: Dynamic = enabledRef2.current || !getText3(element);
    if (enabled2 === elementRef4.current) return;
    elementRef4.current = enabled2;
    let element2: Dynamic = elementRef5.current;
    elementRef5.current = undefined;
    onHoldingRef.current?.(enabled2, enabled2 ? element2 : undefined);
  };
  (0, React.useEffect)(onHolding2, [enabled]);
  let [matchesAutoFocusState, setMatchesAutoFocusState]: Dynamic = (0,
  React.useState)(autoFocus === true || addressClaude === true);
  let [named, setNamed]: Dynamic = (0, React.useState)(DataModelSchemasClaude);
  let elementRef6: Dynamic = (0, React.useRef)(DataModelSchemasClaude);
  let onDraftNamesRef: Dynamic = (0, React.useRef)(onDraftNames);
  onDraftNamesRef.current = onDraftNames;
  let countRef: Dynamic = (0, React.useRef)(0);
  let onPost2 = (
    commentReplyComposer?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    countRef.current += 1;
    try {
      commentReplyComposer();
    } finally {
      --countRef.current;
    }
  };
  let labelRef: Dynamic = (0, React.useRef)(``);
  let enabledRef3: Dynamic = (0, React.useRef)(false);
  let enabledRef4: Dynamic = (0, React.useRef)(false);
  let onChange = (
    commentReplyComposer?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    setEnabledState(getText4(commentReplyComposer));
    setEnabledStateState(getText3(commentReplyComposer));
    let after: Dynamic = matchesLayout
      ? mapCommentComponentsClaude(commentReplyComposer)
      : DataModelSchemasClaude;
    let before: Dynamic = elementRef6.current;
    let label: Dynamic = labelRef.current;
    labelRef.current = matchesLayout
      ? resolveCommentComponentsTrim(commentReplyComposer)
      : ``;
    if (after.tag !== true) {
      enabledRef3.current = false;
    }
    let enabled2 = !resolveCommentComponentsClaude(after, before);
    if (enabled2) {
      elementRef6.current = after;
      setNamed(after);
      onDraftNamesRef.current?.(after);
    }
    let commentReplyComposerHandler2: Dynamic =
      countRef.current === 0 ? commentReplyComposerHandler() : null;
    if (
      !commentReplyComposerHandler2 ||
      commentReplyComposerHandler2.disabled === true
    )
      return;
    let theirTag =
      after.tag === true &&
      !enabledRef3.current &&
      commentReplyComposerHandler2.byPerson !== true;
    if (!enabled2 && !theirTag) return;
    let commentReplyComposerResult2: Dynamic = resolveDataModelSchemasChecked3({
      before: before,
      after: after,
      checked: commentReplyComposerHandler2.checked,
      wordsKept: labelRef.current === label,
      theirTag: theirTag,
    });
    if (commentReplyComposerResult2 === null) return;
    let matchesChecked =
      commentReplyComposerResult2.checked !==
      commentReplyComposerHandler2.checked;
    commentReplyComposerHandler2.onChange(commentReplyComposerResult2.checked, {
      remember: commentReplyComposerResult2.remember,
    });
    let commentReplyComposerResult3 = commentReplyComposerResult2.checked
      ? DataModelSchemasSendToClaudeChecked
      : DataModelSchemasSendToClaudeUnchecked;
    if (matchesChecked) {
      resolvePlatformAnnouncementsValue(
        commentReplyComposer.view.dom.ownerDocument,
        commentReplyComposerResult3,
        {
          key: `send-to-claude`,
        },
      );
    }
  };
  let trim: Dynamic = (
    commentReplyComposer?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    !commentReplyComposer.isEmpty &&
    !(matchesLayout && commentReplyComposer.getText().trim() === ``) &&
    !(
      commentReplyComposerHandler() !== null &&
      isCommentComponentsFirstChild(commentReplyComposer) !== null &&
      resolveCommentComponentsTrim(commentReplyComposer) === ``
    );
  let onPostRef: Dynamic = (0, React.useRef)(onPost);
  let onPostedRef: Dynamic = (0, React.useRef)(onPosted);
  onPostedRef.current = onPosted;
  onPostRef.current = onPost;
  let controlId: Dynamic = (0, React.useId)();
  let boxId2: Dynamic = boxId ?? controlId;
  let setEditorDirty = (
    commentReplyComposer?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (!persistent) {
      useCommentStore.getState().setEditorDirty(boxId2, commentReplyComposer);
    }
  };
  let [countState, setCountState]: Dynamic = (0, React.useState)(0);
  let items: Dynamic = useCommentAnchorsCurrent(
    matchesLayout && claudeRoute === `always` ? suggestions : undefined,
    enabledState && !busy,
    countState,
  );
  let onPick = (
    commentReplyComposer?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let element: Dynamic = elementRef2.current;
    if (!(!element || enabledRef2.current)) {
      element.commands.focus(`end`);
      element.commands.insertContent({
        type: `text`,
        text: resolveCommentSessionPrompt(commentReplyComposer),
      });
    }
  };
  let elementRef7: Dynamic = (0, React.useRef)(null);
  let [enabledState2, setEnabledState2]: Dynamic = (0, React.useState)(false);
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let element: Dynamic = elementRef7.current;
      if (!element || items.length === 0) return;
      let setEnabledState3: Dynamic = (
        ..._extraArguments: unknown[]
      ): Dynamic => setEnabledState2(element.clientWidth >= 480);
      setEnabledState3();
      if (typeof ResizeObserver === "undefined") return;
      let resizeObserver = new ResizeObserver(setEnabledState3);
      resizeObserver.observe(element);
      return (..._extraArguments: unknown[]) => resizeObserver.disconnect();
    },
    [items.length],
  );
  let setEditable: Dynamic = (
    commentReplyComposer?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    matchesLayout2
      ? resolveCommentComposerPreventScroll(commentReplyComposer, options)
      : void commentReplyComposer.setEditable(!options);
  let matchesHoldWhileBusy = holdWhileBusy === true && heldFromOutside === true;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      let element: Dynamic = elementRef2.current;
      if (
        !(!element || holdWhileBusy !== true || heldFromOutside === undefined)
      ) {
        if (matchesHoldWhileBusy) {
          setEditable(element, true);
        } else {
          if (!enabledRef2.current) {
            setEditable(element, false);
          }
        }
      }
    },
    [matchesHoldWhileBusy],
  );
  let onPosted2: Dynamic = async (..._extraArguments: unknown[]) => {
    let element: Dynamic = elementRef2.current;
    if (!element || enabledRef2.current || matchesSendHeldRef.current) return;
    let trimmedText: Dynamic = commentWords(
      element.getText({
        blockSeparator: `
`,
      }),
    ).trim();
    if (nothingToSee(trimmedText) || getText2(element)) return;
    let claudeRoute3: Dynamic = claudeRouteRef.current;
    let mapCommentComponentsClaude2: Dynamic =
      mapCommentComponentsClaude(element);
    let reduce2: Dynamic = reduce(element);
    let toClaude: Dynamic =
      matchesLayout &&
      resolveDataModelSchemasAlways(claudeRoute3, mapCommentComponentsClaude2);
    let items2: Dynamic = [];
    let items3: Dynamic = [];
    let items4: Dynamic = [];
    let record: Dynamic = {};
    for (let {
      id: commentReplyComposerResult3,
      label: commentReplyComposerResult4,
    } of resolveCommentComponentsLabel(element) as Dynamic) {
      let entry: Dynamic = resolveCommentsEditorKind(
        commentReplyComposerResult3,
      );
      if (entry.kind === `cc`) {
        items3.push({
          sessionId: entry.sessionId,
          sessionName: String(
            commentReplyComposerResult4 ?? commentReplyComposerResult3,
          ).slice(0, 64),
        });
      } else {
        if (entry.kind === `cw`) {
          items4.push({
            did: entry.did,
            label: String(
              commentReplyComposerResult4 ?? commentReplyComposerResult3,
            ).slice(0, 64),
          });
        } else {
          items2.push(commentReplyComposerResult3);
          if (
            resolveEditorAnchorsAndMentionsTest(commentReplyComposerResult3) &&
            typeof commentReplyComposerResult4 == `string`
          ) {
            record[commentReplyComposerResult3] = commentReplyComposerResult4;
          }
        }
      }
    }
    useCommentStore.getState().learnMentionNames(record);
    let typed: Dynamic = trimmedText;
    if (toClaude && commentReplyComposerHandler() !== null) {
      ({ body: typed, to: items2 } = resolveDataModelSchemasBody3(
        trimmedText,
        items2,
        mapCommentComponentsClaude2.tag === true || reduce2 !== null,
      ));
    }
    let typed2: Dynamic = typed;
    if (toClaude) {
      ({ body: typed2, to: items2 } = resolveDataModelSchemasBody(
        typed,
        items2,
      ));
    }
    if (isFrameArtifact() && !matchesLayout2 && commentTooLong(typed2))
      return resolveCommentComponentsError();
    let record2: Dynamic = {
      toClaude: toClaude,
      ...(typed2 !== typed && {
        typed: typed,
      }),
      ...(toClaude && {
        pressedAt: Date.now(),
      }),
    };
    let jSON: Dynamic = element.getJSON();
    enabledRef2.current = true;
    setBusy(true);
    let element2: Dynamic = elementRef7.current;
    let matchesElement: Dynamic =
      element2 !== null &&
      element2.contains(element2.ownerDocument.activeElement);
    if (holdWhileBusy) {
      setEditable(element, true);
    } else {
      onPost2(
        (..._extraArguments: unknown[]): Dynamic =>
          element.commands.clearContent(),
      );
    }
    let enabled2 = false;
    let queued = false;
    let commentReplyComposerResult2: Dynamic = clearCommentsEditorBoxGoneAt();
    elementRef3.current = commentReplyComposerResult2;
    try {
      await onPostRef.current(typed2, items2, items3, items4, record2);
      if (holdWhileBusy && elementRef2.current) {
        setEditable(elementRef2.current, false);
        onPost2(
          (..._extraArguments: unknown[]): Dynamic =>
            elementRef2.current?.commands.clearContent(),
        );
        if (
          persistent &&
          !isDocumentFocusedElsewhere(
            elementRef2.current.view.dom.ownerDocument,
          )
        ) {
          elementRef2.current.commands.focus();
        }
      }
      enabled2 = true;
      if (
        typeof claudeRoute3 == `object` &&
        (elementRef2.current?.isEmpty ?? true)
      ) {
        claudeRoute3.onDraftEnd?.();
      }
    } catch (commentReplyComposerResult3: Dynamic) {
      if (
        commentReplyComposerResult3 instanceof (CommentQueuedError as Dynamic)
      ) {
        if (holdWhileBusy && elementRef2.current) {
          setEditable(elementRef2.current, false);
          onPost2(
            (..._extraArguments: unknown[]): Dynamic =>
              elementRef2.current?.commands.clearContent(),
          );
          if (
            persistent &&
            !isDocumentFocusedElsewhere(
              elementRef2.current.view.dom.ownerDocument,
            )
          ) {
            elementRef2.current.commands.focus();
          }
        }
        enabled2 = queued = true;
        if (
          typeof claudeRoute3 == `object` &&
          (elementRef2.current?.isEmpty ?? true)
        ) {
          claudeRoute3.onDraftEnd?.();
        }
      } else if (holdWhileBusy) {
        let element3: Dynamic = elementRef2.current;
        if (element3) {
          setEditable(element3, false);
          let element4: Dynamic = elementRef7.current ?? elementRef.current;
          if (
            canRestoreFocus({
              at: classifyFocusLocation(
                element4,
                (element4 ?? element3.view.dom).ownerDocument,
              ),
            })
          ) {
            element3.commands.focus(`end`);
          }
          onChange(element3);
        } else if (draftKeyRef.current !== undefined) {
          stashReplyDraft(draftKeyRef.current, jSON, true);
        }
      } else {
        let element3: Dynamic = elementRef2.current;
        if (element3) {
          onPost2((..._extraArguments: unknown[]): undefined => {
            if (element3.isEmpty || getText(element3)) {
              element3.commands.setContent(jSON);
            } else {
              element3.commands.insertContentAt(0, jSON.content ?? [], {
                updateSelection: false,
              });
            }
            onChange(element3);
          });
        } else {
          if (draftKeyRef.current !== undefined) {
            stashReplyDraft(draftKeyRef.current, jSON, true);
          }
        }
      }
    } finally {
      commentReplyComposerResult2.ended();
      if (elementRef3.current === commentReplyComposerResult2) {
        elementRef3.current = null;
      }
      frameHotActivity();
      enabledRef2.current = false;
      setBusy(false);
      let element3: Dynamic = elementRef2.current;
      if (element3) {
        setEditorDirty(trim(element3));
        let element4: Dynamic = elementRef7.current;
        let ownerDocument: Dynamic = element4?.ownerDocument;
        let activeElement: Dynamic = ownerDocument?.activeElement ?? null;
        if (
          enabled2 &&
          matchesElement &&
          element4 &&
          ownerDocument &&
          !isDocumentFocusedElsewhere(ownerDocument) &&
          !element3.view.dom.contains(activeElement) &&
          (activeElement === null ||
            activeElement === ownerDocument.body ||
            element4.contains(activeElement))
        ) {
          element3.commands.focus();
        }
        setMatchesAutoFocusState(
          element4 !== null &&
            element4.contains(element4.ownerDocument.activeElement),
        );
      }
    }
    if (enabled2) {
      onPostedRef.current?.({
        queued: queued,
      });
    }
  };
  let matchesLayout5: Dynamic =
    matchesLayout && resolveDataModelSchemasAlways(claudeRoute, named);
  let controlId2: Dynamic = (0, React.useId)();
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      let dom: Dynamic = elementRef2.current?.view.dom;
      if (dom) {
        if (matchesLayout5) {
          dom.setAttribute(`aria-describedby`, controlId2);
        } else {
          dom.removeAttribute(`aria-describedby`);
        }
      }
    },
    [matchesLayout5, controlId2],
  );
  let placeholderRef: Dynamic = (0, React.useRef)(placeholder);
  placeholderRef.current = placeholder;
  let placeholderRef2: Dynamic = (0, React.useRef)(placeholder);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (placeholderRef2.current === placeholder) return;
      placeholderRef2.current = placeholder;
      let element: Dynamic = elementRef2.current;
      if (element && element.isEmpty) {
        element.view.dispatch(element.state.tr);
      }
    },
    [placeholder],
  );
  (0, React.useLayoutEffect)((..._extraArguments: unknown[]): Dynamic => {
    let element: Dynamic = elementRef.current;
    if (!element) return;
    countRef.current += 1;
    let blur = (..._extraArguments: unknown[]): undefined => {
      if (lockWhileBusy && enabledRef2.current) return;
      if (!persistent) {
        onPost2(
          (..._extraArguments: unknown[]): Dynamic =>
            updateCommentComposerExtensions2.commands.clearContent(),
        );
      }
      let claudeRoute3: Dynamic = claudeRouteRef.current;
      if (typeof claudeRoute3 == `object`) {
        claudeRoute3.onDraftEnd?.();
      }
      if (onCancel) {
        onCancel();
      } else {
        updateCommentComposerExtensions2.commands.blur();
      }
    };
    let {
      ed: updateCommentComposerExtensions2,
      cleanup: updateCommentComposerExtensions3,
    }: Dynamic = updateCommentComposerExtensions(element, {
      placeholder: (..._extraArguments: unknown[]): Dynamic =>
        placeholderRef.current,
      ariaLabel: ariaLabel,
      autoFocus: autoFocus,
      enableCCSessions: enableCCSessions,
      coworkerContainer: coworkerContainer,
      refPid: refPid,
      chrome: matchesLayout2
        ? `card`
        : matchesComposerChrome
          ? `flush`
          : matchesLayout4
            ? `sheet`
            : `bare`,
      sheetSeat: sheetSeat,
      ...(matchesLayout2 &&
        addressClaude && {
          claudeChipLeads: {
            onBackspaceEmpty: (..._extraArguments: unknown[]) => blur(),
          },
        }),
      initial: initial
        ? resolveEditorAnchorsAndMentionsReplaceAll(initial)
        : undefined,
      ...(plainEnterPosts && {
        onEnter: (..._extraArguments: unknown[]): Dynamic => onPosted2(),
      }),
      ...(matchesLayout && {
        onModEnter: (..._extraArguments: unknown[]): Dynamic => onPosted2(),
      }),
      onEscape: (..._extraArguments: unknown[]) => blur(),
      onUpdate: (
        commentReplyComposer?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        onChange(commentReplyComposer);
        frameHotActivity();
        setEditorDirty(trim(commentReplyComposer) || enabledRef2.current);
      },
    });
    elementRef2.current = updateCommentComposerExtensions2;
    enabledRef4.current = true;
    updateCommentComposerExtensions2.on(
      `transaction`,
      (
        { transaction: transaction }: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (
          transaction.docChanged &&
          countRef.current === 0 &&
          enabledRef3.current &&
          !isCommentComponentsMaps(transaction)
        ) {
          enabledRef3.current = false;
        }
      },
    );
    let commentReplyComposerResult2: Dynamic = updateCommentsEditorDelete(
      boxId2,
      {
        carried: draftKeyRef.current !== undefined,
        root: (..._extraArguments: unknown[]): Dynamic =>
          elementRef7.current ?? elementRef.current,
        holding: (..._extraArguments: unknown[]): Dynamic =>
          enabledRef2.current || !getText3(updateCommentComposerExtensions2),
        peek: (..._extraArguments: unknown[]): Dynamic => {
          let draftKey3: Dynamic = draftKeyRef.current;
          if (
            draftKey3 === undefined ||
            getText3(updateCommentComposerExtensions2) ||
            (holdWhileBusy === true && enabledRef2.current)
          )
            return null;
          let claudeRoute3: Dynamic = claudeRouteRef.current;
          return {
            key: mintedThreadId(draftKey3),
            pageId: draftPageIdRef.current ?? ``,
            json: updateCommentComposerExtensions2.getJSON(),
            ...(enabledRef.current && {
              told: true,
            }),
            ...(matchesLayout &&
              typeof claudeRoute3 == `object` && {
                box: {
                  checked: claudeRoute3.checked,
                  byPerson: claudeRoute3.byPerson === true,
                },
              }),
          };
        },
      },
    );
    let draftKey2: Dynamic = draftKeyRef.current;
    let replyDraftItem: Dynamic =
      !initial && draftKey2 !== undefined
        ? useCommentStore.getState().replyDrafts[draftKey2]
        : undefined;
    if (draftKey2 !== undefined) {
      enabledRef.current =
        replyDraftItem?.told ??
        threadClosed(draftKey2, draftPageIdRef.current ?? ``);
    }
    if (replyDraftItem) {
      updateCommentComposerExtensions2.commands.setContent(replyDraftItem.json);
      elementRef5.current = replyDraftItem.box;
      useCommentStore.getState().stashReplyDraft(draftKey2, null);
    } else {
      if (addressClaude && !initial) {
        updateCommentComposerExtensions2.commands.setContent(
          resolveDataModelSchemasLabel2(),
          {
            emitUpdate: false,
          },
        );
        if (autoFocus === false) {
          updateCommentComposerExtensions2.commands.setTextSelection(
            updateCommentComposerExtensions2.state.doc.content.size,
          );
        } else {
          updateCommentComposerExtensions2.commands.focus(`end`);
        }
      }
    }
    if (
      initial ||
      (replyDraftItem && !updateCommentComposerExtensions2.isEmpty)
    ) {
      setEditorDirty(true);
    }
    onChange(updateCommentComposerExtensions2);
    --countRef.current;
    onHolding2();
    return (..._extraArguments: unknown[]): undefined => {
      commentReplyComposerResult2();
      elementRef3.current?.boxGone();
      setEditorDirty(false);
      let draftKey3: Dynamic = draftKeyRef.current;
      let jSON: Dynamic =
        draftKey3 !== undefined &&
        !getText3(updateCommentComposerExtensions2) &&
        !(holdWhileBusy && enabledRef2.current)
          ? updateCommentComposerExtensions2.getJSON()
          : null;
      elementRef2.current = null;
      if (draftKey3 !== undefined && jSON !== null) {
        stashReplyDraft(draftKey3, jSON);
      }
      updateCommentComposerExtensions3();
    };
  }, []);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let draftKey2: Dynamic = draftKey;
      if (draftKey2 !== undefined)
        return useCommentStore.subscribe(
          (
            commentReplyComposer?: Dynamic,
            options?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            let replyDraftItem: Dynamic =
              commentReplyComposer.replyDrafts[draftKey2];
            if (
              replyDraftItem === undefined ||
              replyDraftItem === options.replyDrafts[draftKey2]
            )
              return;
            let element: Dynamic = elementRef2.current;
            if (!(!element || enabledRef2.current)) {
              onPost2((..._extraArguments: unknown[]): undefined => {
                if (element.isEmpty || getText(element)) {
                  element.commands.setContent(replyDraftItem.json);
                } else {
                  element.commands.insertContentAt(
                    0,
                    replyDraftItem.json.content ?? [],
                    {
                      updateSelection: false,
                    },
                  );
                }
                onChange(element);
              });
              useCommentStore.getState().stashReplyDraft(draftKey2, null);
              if (element.isEmpty || elementRef4.current !== true) {
                elementRef5.current = replyDraftItem.box;
              }
              setEditorDirty(trim(element));
              onHolding2();
            }
          },
        );
    },
    [draftKey],
  );
  let claudeRoute2: Dynamic =
    matchesLayout && typeof claudeRoute == `object` && claudeRoute.tag === true
      ? claudeRoute
      : null;
  let checked: Dynamic = claudeRoute2?.checked;
  let matchesDisabled = claudeRoute2?.disabled === true;
  let elementRef8: Dynamic = (0, React.useRef)(null);
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): undefined => {
      let element: Dynamic = elementRef2.current;
      let box: Dynamic = commentReplyComposerHandler();
      let element2: Dynamic = elementRef8.current;
      elementRef8.current = box === null ? null : box.checked;
      let pressed =
        box !== null &&
        element2 !== null &&
        element2 !== box.checked &&
        box.byPerson === true;
      let enabled2: Dynamic = enabledRef4.current;
      if (element) {
        enabledRef4.current = false;
      }
      if (!element || enabledRef2.current) return;
      let seedable: Dynamic = enabled2 || !trim(element);
      let gone = box === null && element2 !== null;
      let arrived = box !== null && element2 === null && !enabled2;
      let commentReplyComposerResult2 = resolveDataModelSchemasRemove({
        box: box,
        named: mapCommentComponentsClaude(element),
        pressed: pressed,
        seedable: seedable,
        arrived: arrived,
        gone: gone,
        ours: enabledRef3.current,
      });
      if (commentReplyComposerResult2 !== `keep`) {
        if (
          commentReplyComposerResult2 === `tick` ||
          commentReplyComposerResult2 === `untick`
        )
          return void box?.onChange(commentReplyComposerResult2 === `tick`, {
            remember: false,
          });
        onPost2((..._extraArguments: unknown[]): undefined => {
          if (commentReplyComposerResult2 === `add`) {
            resolveCommentComponentsSchema(element);
          } else {
            clearCommentComponentsDoc(element);
          }
          onChange(element);
        });
        enabledRef3.current = commentReplyComposerResult2 === `add`;
        setEditorDirty(trim(element) || enabledRef2.current);
      }
    },
    [claudeRoute2 !== null, checked, matchesDisabled],
  );
  if (matchesLayout) {
    let route: Dynamic = typeof claudeRoute == `object` ? claudeRoute : null;
    let commentReplyComposerResult2: Dynamic = (
      className?: Dynamic,
      ..._extraArguments: unknown[]
    ) => (
      <Button
        size={commentReplyComposerResult(`xs`)}
        variant={`ghost`}
        iconOnly={true}
        icon={`ArrowUp`}
        aria-label={`Send`}
        aria-keyshortcuts={
          plainEnterPosts ? `Enter` : `Control+Enter Meta+Enter`
        }
        disabled={(enabledState && !busy) || (sendHeld === true && !busy)}
        busy={busy}
        onClick={(..._extraArguments: unknown[]): undefined => void onPosted2()}
        className={className}
        data-testid={`comment-send`}
      />
    );
    let matchesRoute = route !== null && foldWhenIdle === true;
    let enabled2: Dynamic =
      !matchesRoute || !enabledState || busy || matchesAutoFocusState;
    let label = enabled2
      ? `grid-rows-[1fr] opacity-100`
      : `invisible grid-rows-[0fr] opacity-0`;
    let label2 = enabled2 ? `` : `overflow-hidden`;
    let trimmedLabel =
      `${matchesComposerChrome ? `` : `px-2`} ${enabled2 ? (matchesComposerChrome ? `pt-2` : `pb-1.5`) : ``}`.trim();
    let route2: Dynamic = route && (
      <CommentClaudeToggle
        route={route}
        named={named}
        busy={busy}
        className={`min-w-0`}
        onPointerToggle={(..._extraArguments: unknown[]): Dynamic =>
          elementRef2.current?.commands.focus()
        }
      />
    );
    let jsxs = matchesLayout4 ? (
      <jsxRuntime.Fragment>
        {items.length > 0 && (
          <AskSuggestionsMeasure
            items={items}
            onPick={onPick}
            className={`pb-2`}
          />
        )}
        <div className={`flex items-end gap-1`}>
          <div
            ref={elementRef}
            data-chat-editor={true}
            className={`min-w-0 flex-1`}
          />
          <span
            role={`presentation`}
            className={`flex shrink-0`}
            onMouseDown={resolveCommentComponentsPreventDefault}
            onPointerDown={resolveCommentComponentsPreventDefault}
          >
            {commentReplyComposerResult2(`size-11`)}
          </span>
        </div>
      </jsxRuntime.Fragment>
    ) : null;
    return (
      <div
        ref={elementRef7}
        className={`mt-2 first:mt-0`}
        onClick={(
          commentReplyComposer?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => commentReplyComposer.stopPropagation()}
        onFocusCapture={(..._extraArguments: unknown[]): Dynamic =>
          setCountState(
            (
              commentReplyComposer?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => commentReplyComposer + 1,
          )
        }
        onFocus={(..._extraArguments: unknown[]): Dynamic =>
          setMatchesAutoFocusState(true)
        }
        onBlur={(event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          let currentTarget: Dynamic = event.currentTarget;
          if (
            !currentTarget.contains(event.relatedTarget) &&
            !currentTarget.contains(currentTarget.ownerDocument.activeElement)
          ) {
            setMatchesAutoFocusState(false);
          }
        }}
        onMouseDown={(
          event?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (
            !matchesRoute ||
            event.button !== 0 ||
            event.target.closest(CommentComponents_Styles)
          )
            return;
          event.preventDefault();
          let currentTarget: Dynamic = event.currentTarget;
          if (
            !currentTarget.contains(currentTarget.ownerDocument.activeElement)
          ) {
            elementRef2.current?.commands.focus();
          }
        }}
        data-testid={`comment-composer`}
        data-chrome={matchesLayout4 ? `sheet` : undefined}
      >
        {matchesLayout5 && (
          <span
            id={controlId2}
            hidden={true}
            data-testid={`comment-route-said`}
          >
            {/* BaoCut: 称「agent」，不称 Claude。 */}
            {`Sends to agent`}
          </span>
        )}
        {jsxs ??
          (matchesLayout2 ? (
            <div
              className={`relative`}
              onMouseDown={resolveCommentComponentsTarget3}
            >
              <div
                ref={elementRef}
                data-chat-editor={true}
                data-ask-busy={busy || matchesHoldWhileBusy ? `` : undefined}
                className={`min-w-0 mr-11`}
              />
              {commentReplyComposerResult2(
                `absolute right-0 bottom-0 before:absolute before:-inset-1 before:content-[''] pointer-coarse:before:-inset-2.5`,
              )}
            </div>
          ) : matchesLayout3 ? (
            <span
              className={`contents`}
              onPointerDown={
                sheetSeat ? resolveCommentComponentsTarget : undefined
              }
            >
              {sheetSeat && items.length > 0 && (
                <AskSuggestionsMeasure
                  items={items}
                  onPick={onPick}
                  className={`pb-2`}
                />
              )}
              <CommentComposerCds
                editor={
                  <div
                    ref={elementRef}
                    data-chat-editor={true}
                    className={`min-w-0`}
                  />
                }
                text={
                  enabledState ? `` : (elementRef2.current?.getText() ?? ``)
                }
                canSubmit={!enabledState && sendHeld !== true}
                busy={busy}
                route={sheetSeat ? null : route}
                named={named}
                form={composerForm}
                plainEnterPosts={plainEnterPosts}
                onSend={(..._extraArguments: unknown[]): undefined =>
                  void onPosted2()
                }
                onPointerToggle={(..._extraArguments: unknown[]): Dynamic =>
                  elementRef2.current?.commands.focus()
                }
              />
              {!sheetSeat && items.length > 0 && (
                <AskSuggestionsMeasure
                  items={items}
                  onPick={onPick}
                  className={`pt-2`}
                />
              )}
            </span>
          ) : (
            <div
              className={
                matchesComposerChrome ? undefined : `rounded-md border`
              }
            >
              <div
                ref={elementRef}
                data-chat-editor={true}
                className={`min-w-0`}
              />
              <div
                className={`grid transition-[grid-template-rows,padding,opacity,visibility] duration-150 ease-in-out motion-reduce:transition-none ${label} ${trimmedLabel}`}
                data-testid={`comment-composer-footer`}
              >
                <div
                  className={`flex min-h-0 min-w-0 items-center gap-2 ${label2}`}
                >
                  {route2}
                  {enabledState2 && items.length > 0 && (
                    <AskSuggestionsMeasure
                      items={items}
                      onPick={onPick}
                      className={`flex-1`}
                    />
                  )}
                  {plainEnterPosts ? (
                    commentReplyComposerResult2(`ml-auto`)
                  ) : (
                    <span
                      role={`presentation`}
                      className={`ml-auto flex shrink-0`}
                      onMouseDown={resolveCommentComponentsPreventDefault}
                      onPointerDown={resolveCommentComponentsPreventDefault}
                    >
                      {commentReplyComposerResult2()}
                    </span>
                  )}
                </div>
              </div>
              {!enabledState2 && items.length > 0 && (
                <AskSuggestionsMeasure
                  items={items}
                  onPick={onPick}
                  className={matchesComposerChrome ? `pt-2` : `px-2 pb-1.5`}
                />
              )}
            </div>
          ))}
      </div>
    );
  }
  return (
    <div
      className={matchesComposerChrome ? undefined : `mt-2`}
      onClick={(
        commentReplyComposer?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => commentReplyComposer.stopPropagation()}
    >
      <div
        className={`flex items-end${matchesComposerChrome ? `` : ` rounded-md border`}`}
        onMouseDown={resolveCommentComponentsTarget3}
      >
        <div
          ref={elementRef}
          data-chat-editor={true}
          className={`min-w-0 flex-1`}
        />
        {(!enabledState || busy) && (
          <Button
            size={commentReplyComposerResult(`xs`)}
            variant={`primary`}
            iconOnly={true}
            icon={`ArrowUp`}
            aria-label={submitLabel}
            disabled={busy || sendHeld === true}
            onClick={(..._extraArguments: unknown[]): undefined =>
              void onPosted2()
            }
            className={matchesComposerChrome ? `ml-2` : `m-1`}
          />
        )}
      </div>
      {onCancel && (
        <div className={`mt-1 flex justify-start`}>
          <Button
            size={commentReplyComposerResult(`sm`)}
            variant={`ghost`}
            disabled={lockWhileBusy && busy}
            onClick={onCancel}
          >{`Cancel`}</Button>
        </div>
      )}
    </div>
  );
}

var CommentComponents_Styles2: string;

var CommentComponents_PsMdMs25BorderS: string;

function useCommentComponentsState(
  { children: children }: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    <div className={`${CommentComponents_PsMdMs25BorderS} flow-root`}>
      {children}
    </div>
  );
}

var CommentComponents_CommentExpanded: string;

var CommentComponents_CommentCollapsed: string;

var CommentComponents_Message2: string;

var CommentComponents_Message3: string;

var CommentComponents_FirstPressEscapeToGoBackToTheText: string;

var commentComponentsSet: Dynamic;

var CommentComponents_Styles3: string;

var CommentComponents_Mx3Mt3Mb3Px3Pb3: string;

var CommentComponentsState: string;

var resolveCommentComponentsTarget3: (event?: Dynamic, ..._extraArguments: unknown[]) => undefined;

var resolveCommentComponentsTarget4: (event?: Dynamic, ..._extraArguments: unknown[]) => undefined;

var commentComponentsLimit140: number;

var commentComponentsLimit60: number;

var CommentComponentsState2: number;

function resolveCommentComponentsTrim2(
  commentComponentsTrim2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let trimmedReplace: Dynamic = commentComponentsTrim2
    .replace(/\s+/g, ` `)
    .trim();
  let trimmedReplace2: Dynamic = Array.from<Dynamic>(trimmedReplace);
  return trimmedReplace2.length > options
    ? trimmedReplace2
        .slice(0, options - 1)
        .join(``)
        .trimEnd() + `…`
    : trimmedReplace;
}

var resolveCommentComponentsTest: Dynamic;

function mapCommentComponentsReplace(
  mapCommentComponentsReplace2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return resolveEditorAnchorsAndMentionsRef3(
    resolveCommentComponentsSlice(
      mapCommentComponentsReplace2,
      CommentComponentsState2,
    ),
  )
    .map(
      (entry?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        entry.type === `text`
          ? entry.text
          : entry.kind === `user`
            ? `@${entry.label ?? options(entry.ref.replace(/^users\//, ``))}`
            : (entry.label ?? `${entry.kind} link`),
    )
    .join(``)
    .replace(/\u2060/g, ``)
    .replace(/\[([^\]\n]+)\]\([^)\n]+\)/g, `$1`)
    .replace(
      /^[ \t]*(?:```.*|#{1,6}[ \t]+|>[ \t]*|[-*+][ \t]+(?:\[[ xX]\][ \t]+)?)/gm,
      ``,
    )
    .replace(commentComponentsPattern, `$2`)
    .replace(commentComponentsPattern, `$2`)
    .replace(commentComponentsPattern2, `$2`);
}

function resolveCommentComponentsSlice(
  items?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (items.length <= options) return items;
  let itemsSlice: Dynamic = items.slice(0, options);
  if (/[\uD800-\uDBFF]$/.test(itemsSlice)) {
    itemsSlice = itemsSlice.slice(0, -1);
  }
  let lastIndexOf: Dynamic = itemsSlice.lastIndexOf(`<`);
  if (
    lastIndexOf >= 0 &&
    lastIndexOf >= itemsSlice.length - 200 &&
    /^<[^<>\n]*$/.test(itemsSlice.slice(lastIndexOf))
  ) {
    itemsSlice = itemsSlice.slice(0, lastIndexOf);
  }
  let lastIndexOf2: Dynamic = itemsSlice.lastIndexOf(`[`);
  if (
    lastIndexOf2 >= 0 &&
    /^\[[^\]\n]*(?:\]\([^)\n]*)?$/.test(itemsSlice.slice(lastIndexOf2)) &&
    (lastIndexOf2 >= itemsSlice.length - 200 ||
      itemsSlice.indexOf(`](`, lastIndexOf2) >= 0)
  ) {
    itemsSlice = itemsSlice.slice(0, lastIndexOf2);
  }
  return itemsSlice;
}

var commentComponentsPattern: RegExp;

var commentComponentsPattern2: RegExp;

function resolveCommentComponentsPush(
  commentComponentsPush?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  items.push(
    resolveCommentComponentsTest(
      `${commentComponentsPush.suggestion ? `Suggestion from ` : ``}${commentComponentsPush.author}${commentComponentsPush.when ? `, ${commentComponentsPush.when}` : ``}`,
    ),
  );
  let commentComponentsTrim2: Dynamic = resolveCommentComponentsTrim2(
    commentComponentsPush.body,
    commentComponentsLimit140,
  );
  if (commentComponentsTrim2 !== ``) {
    items.push(resolveCommentComponentsTest(commentComponentsTrim2));
  }
  if (commentComponentsPush.replies > 0) {
    items.push(
      commentComponentsPush.replies === 1
        ? `1 reply.`
        : `${commentComponentsPush.replies} replies.`,
    );
  }
  let commentComponentsTrim22: Dynamic = commentComponentsPush.quote
    ? resolveCommentComponentsTrim2(
        quoteWords(commentComponentsPush.quote),
        commentComponentsLimit60,
      )
    : ``;
  if (commentComponentsPush.wholePage) {
    items.push(`On the whole document.`);
  } else {
    if (commentComponentsPush.orphan) {
      if (commentComponentsTrim22 !== ``) {
        items.push(`Was on “${commentComponentsTrim22}”.`);
      }
    } else {
      if (commentComponentsPush.anchorLabel) {
        items.push(
          resolveCommentComponentsTest(
            `On ${commentComponentsPush.anchorLabel.replace(/ · /g, `, `)}`,
          ),
        );
      } else {
        if (commentComponentsTrim22 !== ``) {
          items.push(`On “${commentComponentsTrim22}”.`);
        }
      }
    }
  }
  if (commentComponentsPush.resolved) {
    items.push(`Resolved.`);
  }
  if (commentComponentsPush.open) {
    items.push(`Expanded.`);
  }
  return items.join(` `);
}

function resolveCommentComponentsCount(
  commentComponentsCount?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let label =
    commentComponentsCount.count === 1
      ? `1 comment`
      : `${commentComponentsCount.count} comments`;
  let commentComponentsKind: Dynamic = commentComponentsCount.place
    ? resolveCommentComponentsKind(commentComponentsCount.place)
    : ``;
  return commentComponentsKind === ``
    ? label
    : (commentComponentsCount.threads ?? 1) > 1 &&
        commentComponentsCount.place?.on !== `page`
      ? `${label}, including on ${commentComponentsKind}`
      : `${label} on ${commentComponentsKind}`;
}

var CommentComponentsImage: Dynamic;

function resolveCommentComponentsKind(
  request?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  switch (request.on) {
    case `page`:
      return `the whole document`;
    case `atom`:
      return CommentComponentsImage[request.kind];
    case `cells`: {
      let meta: Dynamic = request.meta;
      if (meta?.kind === `column` || meta?.kind === `row`) {
        let commentComponentsReplace: Dynamic = meta.header
          ? resolveCommentComponentsReplace(meta.header)
          : ``;
        return commentComponentsReplace === ``
          ? `a table ${meta.kind}`
          : `the table’s ${commentComponentsReplace} ${meta.kind}`;
      }
      let n5: Dynamic =
        meta?.kind === `cells` ? meta.n : request.cells.ids.length;
      return n5 === 1
        ? `a table cell`
        : n5 > 1
          ? `${n5} table cells`
          : `a table`;
    }
    case `widget`: {
      let commentComponentsReplace: Dynamic = resolveCommentComponentsReplace(
        (request.words ?? ``)
          .replace(/^(?:re|was): /, ``)
          .replace(/ \(was: .*\)$/s, ``)
          .replace(/ · /g, `, `),
      );
      return commentComponentsReplace === ``
        ? request.chart
          ? `a chart`
          : ``
        : `${request.chart ? `the chart` : `the widget`} ${commentComponentsReplace}`;
    }
    case `text`:
      return resolveCommentComponentsReplace(quoteWords(request.quote));
  }
}

function resolveCommentComponentsReplace(
  commentComponentsReplace?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let commentComponentsTrim3: Dynamic = resolveCommentComponentsTrim3(
    commentComponentsReplace
      .replace(/“/g, `‘`)
      .replace(/”/g, `’`)
      .replace(/"/g, `'`),
    commentComponentsLimit60,
  );
  return commentComponentsTrim3 === `` ? `` : `“${commentComponentsTrim3}”`;
}

function resolveCommentComponentsTrim3(
  commentComponentsTrim3?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let trimmedReplace: Dynamic = commentComponentsTrim3
    .replace(/\s+/g, ` `)
    .trim();
  let trimmedReplace2: Dynamic = Array.from<Dynamic>(trimmedReplace);
  if (trimmedReplace2.length <= options) return trimmedReplace;
  let trimmedReplaceSliceText: Dynamic = trimmedReplace2
    .slice(0, options - 1)
    .join(``);
  if (!/^[,.:;…]*(?: |$)/.test(trimmedReplace2.slice(options - 1).join(``))) {
    let lastIndexOf: Dynamic = trimmedReplaceSliceText.lastIndexOf(` `);
    if (lastIndexOf > 0) {
      trimmedReplaceSliceText = trimmedReplaceSliceText.slice(0, lastIndexOf);
    }
  }
  trimmedReplaceSliceText = trimmedReplaceSliceText
    .trimEnd()
    .replace(/[,.:;…]+$/, ``)
    .trimEnd();
  return trimmedReplaceSliceText === `` ? `` : `${trimmedReplaceSliceText}…`;
}

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeCommentComponentsCommentReplyComposerStep1(): void {
  (CommentComponents_Styles2 = `bg-surface-1 text-primary shadow-card animate-slide-in data-[active]:shadow-card-active rounded-[10px] p-3 text-[13px]`);
  (CommentComponents_PsMdMs25BorderS = `ps-md ms-2.5 border-s`);
  (CommentComponents_CommentExpanded = `Comment expanded`);
  (CommentComponents_CommentCollapsed = `Comment collapsed`);
  (CommentComponents_Message2 = `Finish or cancel what you're writing first`);
  (CommentComponents_Message3 = `Can't open that comment here`);
  (CommentComponents_FirstPressEscapeToGoBackToTheText = `First press Escape to go back to the text`);
  (commentComponentsSet = new (Set as Dynamic)([
    `ArrowDown`,
    `ArrowUp`,
    `Home`,
    `End`,
  ]));
  (CommentComponents_Styles3 = `button, a[href], input, select, textarea, summary, [contenteditable="true"], [tabindex]:not([tabindex="-1"]):not([data-comment-stop])`);
  (CommentComponents_Mx3Mt3Mb3Px3Pb3 = `-mx-3 mt-3 -mb-3 px-3 pb-3`);
  (CommentComponentsState = `${textAreaSurfaceClasses} ${fieldHoverClasses} focus-within:shadow-focus forced-colors:border pointer-coarse:py-2.5 [&_.ProseMirror]:content-center`);
  (resolveCommentComponentsTarget3 = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (event.target === event.currentTarget) {
      event.preventDefault();
      event.stopPropagation();
      event.currentTarget.querySelector(`[contenteditable="true"]`)?.focus();
    }
  });
  (resolveCommentComponentsTarget4 = (
    event?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (event.target === event.currentTarget) {
      event.stopPropagation();
    }
  });
  (commentComponentsLimit140 = 140);
  (commentComponentsLimit60 = 60);
  (CommentComponentsState2 = 8 * commentComponentsLimit140);
  (resolveCommentComponentsTest = (
    commentComponentsTest?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    /[.!?…:;]["”’)]?$/.test(commentComponentsTest)
      ? commentComponentsTest
      : `${commentComponentsTest}.`);
  (commentComponentsPattern = /(\*\*|~~|\*|`)(?=\S)([^\n]*?\S)\1/g);
  (commentComponentsPattern2 = /(?<![\p{L}\p{N}])(__|_)(?=\S)([^\n]*?\S)\1(?![\p{L}\p{N}])/gu);
  (CommentComponentsImage = {
    image: `an image`,
    video: `a video`,
    file: `a file`,
    date: `a date`,
    dropdown: `a dropdown`,
    mention: `a mention`,
    br: `a line break`,
    checkbox: `a checkbox`,
    atom: `an object`,
  });
}

export {
  CommentComponentsState,
  CommentComponents_CommentCollapsed,
  CommentComponents_CommentExpanded,
  CommentComponents_FirstPressEscapeToGoBackToTheText,
  CommentComponents_Message2,
  CommentComponents_Message3,
  CommentComponents_Mx3Mt3Mb3Px3Pb3,
  CommentComponents_PsMdMs25BorderS,
  CommentComponents_Styles2,
  CommentComponents_Styles3,
  CommentReplyComposer,
  commentComponentsLimit140,
  commentComponentsLimit60,
  commentComponentsSet,
  mapCommentComponentsReplace,
  resolveCommentComponentsCount,
  resolveCommentComponentsPush,
  resolveCommentComponentsTarget3,
  resolveCommentComponentsTarget4,
  resolveCommentComponentsTest,
  resolveCommentComponentsTrim2,
  useCommentComponentsState,
};
