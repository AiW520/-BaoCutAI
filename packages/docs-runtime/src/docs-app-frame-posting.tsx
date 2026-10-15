/** BaoCut: extracted comment frame posting expressions; state remains owned by the original closure. */
import type { Dynamic } from "./types";
import type { DocumentFrameContext } from "./docs-app-frame-context";

export function createDocumentFrameSetDraftY293(__documentClosure: Pick<DocumentFrameContext, "elementRef27" | "useCommentStore" | "DocumentSourcePromptState" | "documentSourcePromptLimit0" | "DocumentSourcePrompt_Other" | "isSelbarDraft" | "otherEditorDirty" | "useWidgetBridgeCurrent3" | "setDraftY" | "resolveEditorSelectionAndTablesSummon" | "matchesOnStageForClaude" | "resolveEditorSelectionAndTablesValue5" | "onStageForClaude" | "nodeName" | "resolveCommentsStoreComponent" | "enabledRef6" | "enabledRef5" | "resolveDataModelSchemasValue28" | "resolveDataModelSchemasSent" | "DataModelSchemasPending" | "documentFrameResult3" | "container" | "fsEntryId" | "quietCarrierThreads" | "resolvePlatformAnnouncementsValue" | "CommentAnchors_SentToClaude" | "PlatformAnnouncementsCommentPosted" | "resolveEditorSelectionAndTablesStaged" | "resolveCommentSessionSource" | "setEnabledState" | "api" | "getSessionRouteModule" | "path" | "resolveEditorAnchorsAndMentionsValue8" | "room" | "CommentQueuedError" | "DocumentSourcePromptState2" | "fsEntryIdRef" | "setDocumentFrameState" | "setDocumentFrameState2" | "resolveDocumentFrameNodeId">): Dynamic {
  return (({ ["setDraftY2"]: (async (
    request2?: Dynamic,
    body?: Dynamic,
    context?: Dynamic,
    dependencies?: Dynamic,
    argument?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<undefined> => {
    if (!request2) return;
    let element: Dynamic =
      request2.autopost?.quiet === true
        ? __documentClosure.elementRef27.current
        : __documentClosure.useCommentStore.getState().draftY;
    let DocumentSourcePromptState5: Dynamic = __documentClosure.DocumentSourcePromptState;
    let storeState11: Dynamic = __documentClosure.useCommentStore.getState();
    __documentClosure.documentSourcePromptLimit0 += 1;
    __documentClosure.DocumentSourcePrompt_Other = (0, __documentClosure.isSelbarDraft)(request2) ? `prose` : `other`;
    let focus3 =
      request2.react === undefined &&
      request2.autopost?.quiet !== true &&
      !(0, __documentClosure.otherEditorDirty)(
        storeState11,
        request2.autopost === undefined ? `__compose` : `inline-ask`,
      ) &&
      !__documentClosure.useWidgetBridgeCurrent3;
    if (request2.autopost?.quiet !== true) {
      (0, __documentClosure.setDraftY)();
    }
    let documentFrameResult36: Dynamic = (0, __documentClosure.resolveEditorSelectionAndTablesSummon)(
      argument?.toClaude === true,
      storeState11.frameSummon !== null,
      __documentClosure.matchesOnStageForClaude &&
        request2.autopost === undefined &&
        (0, __documentClosure.resolveEditorSelectionAndTablesValue5)(request2.block),
    );
    let summon = argument?.toClaude === true;
    let onStageForClaude2: Dynamic =
      documentFrameResult36.stage && __documentClosure.onStageForClaude
        ? (0, __documentClosure.onStageForClaude)(
            request2.block,
            request2.quote || undefined,
            argument?.typed ?? body,
          )
        : argument?.toClaude && !documentFrameResult36.summon
          ? Promise.resolve(`missed`)
          : null;
    let widgetTitle: Dynamic = request2.roomWidget
      ? (0, __documentClosure.nodeName)?.(request2.nodeId)
      : undefined;
    let record4: Dynamic =
      widgetTitle !== undefined && widgetTitle !== request2.nodeId
        ? {
            widgetTitle: widgetTitle,
          }
        : {};
    let label: Dynamic = (0, __documentClosure.resolveCommentsStoreComponent)(request2, record4);
    let labelWhole: Dynamic =
      request2.words?.chart === undefined
        ? undefined
        : (0, __documentClosure.resolveCommentsStoreComponent)(
            {
              ...request2,
              citation: undefined,
              words: {
                chart: request2.words.chart,
              },
            },
            record4,
          );
    __documentClosure.enabledRef6.current =
      focus3 && __documentClosure.enabledRef5.current && request2.autopost === undefined;
    let ccMention = (
      threadId?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (!request2.roomWidget && request2.autopost?.quiet !== true) {
        DocumentSourcePromptState5?.(threadId, request2.nonce);
      }
      let matchesFrameSummon: Dynamic =
        storeState11.frameSummon !== null &&
        (0, __documentClosure.resolveDataModelSchemasValue28)(
          argument?.toClaude === true,
          body,
          context,
        ) &&
        !(0, __documentClosure.resolveDataModelSchemasSent)(
          __documentClosure.useCommentStore.getState().summonNotes[threadId],
        );
      if (matchesFrameSummon && request2.autopost?.quiet !== true) {
        __documentClosure.DataModelSchemasPending.getState().mark(threadId, 0, {
          now: Date.parse(__documentClosure.documentFrameResult3.now()),
        });
      }
      if (request2.autopost?.quiet === true) {
        storeState11
          .resolve(
            __documentClosure.container,
            request2.roomWidget ? request2.nodeId : __documentClosure.fsEntryId,
            threadId,
          )
          .catch(
            (..._extraArguments: unknown[]): undefined =>
              void __documentClosure.quietCarrierThreads.delete(threadId),
          );
      }
      if (__documentClosure.useWidgetBridgeCurrent3) {
        (0, __documentClosure.resolvePlatformAnnouncementsValue)(
          document,
          matchesFrameSummon
            ? __documentClosure.CommentAnchors_SentToClaude
            : __documentClosure.PlatformAnnouncementsCommentPosted,
          {
            key: `comment-post`,
          },
        );
      }
      if (onStageForClaude2) {
        onStageForClaude2.then(
          (result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            let storeState12: Dynamic = __documentClosure.useCommentStore.getState();
            if (
              result !== `missed` ||
              storeState12.summonNotes[threadId] === undefined
            ) {
              let documentFrameResult38 =
                (0, __documentClosure.resolveEditorSelectionAndTablesStaged)(result);
              if (documentFrameResult38 === `unavailable`) {
                (0, __documentClosure.resolveCommentSessionSource)(documentFrameResult38, `stage`, {
                  threadId: threadId,
                });
              }
              storeState12.setSummonNote(threadId, documentFrameResult38);
            }
            if (result === `refused`) {
              (0, __documentClosure.setEnabledState)(true);
            }
          },
        );
      }
      for (let documentFrameResult38 of dependencies as Dynamic)
        __documentClosure.api
          .ccMention({
            sessionId: documentFrameResult38.sessionId,
            sessionName: documentFrameResult38.sessionName,
            container: __documentClosure.container,
            commentId: threadId,
            anchor: request2.quote
              ? {
                  prefix: request2.prefix,
                  exact: request2.quote,
                  suffix: request2.suffix,
                }
              : undefined,
            thread: [],
            body: body,
          })
          .catch((..._extraArguments: unknown[]): undefined => {});
    };
    let documentFrameResult37: Dynamic;
    try {
      if (request2.autopost?.quiet === true) {
        (0, __documentClosure.getSessionRouteModule)()?.routeCarrierDispatched(
          request2.autopost.nonce,
        );
      }
      documentFrameResult37 = request2.roomWidget
        ? await storeState11.create(__documentClosure.container, request2.nodeId, {
            docId: __documentClosure.fsEntryId,
            ...(label === undefined
              ? {}
              : {
                  label: label,
                }),
            ...(labelWhole === undefined
              ? {}
              : {
                  labelWhole: labelWhole,
                }),
            body: body,
            to: context,
            path: __documentClosure.path,
            y: element ?? undefined,
            focus: focus3,
            ...(request2.block
              ? {
                  summonBlock: request2.block,
                }
              : {}),
            summon: summon,
            toClaude: argument?.toClaude === true,
            ...(argument?.pressedAt !== undefined && {
              pressedAt: argument.pressedAt,
            }),
            roomWidget: {
              nodeId: request2.nodeId,
              element: request2.segment || undefined,
              ...(request2.citation === undefined
                ? {}
                : {
                    citation: request2.citation,
                  }),
            },
            target: {
              pageId: request2.nodeId,
              anchor: {
                kind: `lfile`,
                ref: request2.segment
                  ? `#${(0, __documentClosure.resolveEditorAnchorsAndMentionsValue8)(request2.nodeId, request2.segment)}`
                  : `#${request2.nodeId}`,
              },
              ...(request2.citation === undefined
                ? {}
                : {
                    pin: {
                      node: request2.nodeId,
                      component: request2.segment ?? ``,
                      ...request2.citation,
                    },
                  }),
            },
          })
        : await storeState11.create(__documentClosure.container, __documentClosure.fsEntryId, {
            docId: __documentClosure.fsEntryId,
            ...(label === undefined
              ? {}
              : {
                  label: label,
                }),
            ...(labelWhole === undefined
              ? {}
              : {
                  labelWhole: labelWhole,
                }),
            body: body,
            to: context,
            path: __documentClosure.path,
            y: element ?? undefined,
            focus: focus3,
            ...(__documentClosure.room?.nodeId
              ? {
                  roomNode: __documentClosure.room.nodeId,
                }
              : {}),
            ...(__documentClosure.room?.nodeId && request2.idRange
              ? {
                  roomIdRange: request2.idRange,
                }
              : {}),
            ...(__documentClosure.room?.nodeId && request2.cellIds
              ? {
                  roomCellIds: request2.cellIds,
                }
              : {}),
            ...(request2.block
              ? {
                  summonBlock: request2.block,
                }
              : {}),
            summon: summon,
            toClaude: argument?.toClaude === true,
            ...(argument?.pressedAt !== undefined && {
              pressedAt: argument.pressedAt,
            }),
            ...(request2.autopost?.quiet === true
              ? {
                  quietCarrier: true,
                  ...(request2.autopost.summonText !== undefined && {
                    summonText: request2.autopost.summonText,
                  }),
                  ...(request2.autopost.summonOwedTo !== undefined && {
                    summonOwedTo: request2.autopost.summonOwedTo,
                  }),
                }
              : {}),
            target: {
              pageId: __documentClosure.fsEntryId,
              anchor: {
                kind: `lfile`,
                ref: `${__documentClosure.path}#${request2.nodeId}${request2.segment ? `~el:${request2.segment}` : ``}`,
              },
              ...(request2.quote && {
                quote: {
                  prefix: request2.prefix,
                  exact: request2.quote,
                  suffix: request2.suffix,
                },
              }),
              ...(__documentClosure.room?.nodeId && request2.cellIds
                ? {
                    cells: {
                      ids: request2.cellIds,
                    },
                  }
                : {}),
              ...(request2.atom && {
                atomAnchor: true,
              }),
              ...(request2.segment &&
                request2.vs && {
                  vs: request2.vs,
                }),
            },
          });
    } catch (documentFrameResult38: Dynamic) {
      if (documentFrameResult38 instanceof (__documentClosure.CommentQueuedError as Dynamic)) {
        if (request2.autopost) {
          (0, __documentClosure.DocumentSourcePromptState2)?.(request2.autopost.nonce, null, {
            restored: true,
          });
        }
        documentFrameResult38.landed.then(
          ccMention,
          (..._extraArguments: unknown[]): undefined => {},
        );
        return;
      }
      let restored =
        request2.react === undefined &&
        request2.autopost?.quiet !== true &&
        __documentClosure.fsEntryIdRef.current === __documentClosure.fsEntryId &&
        __documentClosure.useCommentStore.getState().draftAnchor === null &&
        __documentClosure.DocumentSourcePromptState === DocumentSourcePromptState5;
      if (request2.autopost) {
        (0, __documentClosure.DocumentSourcePromptState2)?.(request2.autopost.nonce, null, {
          restored: restored,
        });
      }
      if (restored) {
        (0, __documentClosure.setDocumentFrameState)({
          nonce: request2.nonce,
          body: argument?.typed ?? body,
        });
        if (argument !== undefined) {
          (0, __documentClosure.setDocumentFrameState2)({
            key: (0, __documentClosure.resolveDocumentFrameNodeId)(request2),
            checked: argument.toClaude,
          });
        }
        let { autopost: request3, ...request4 }: Dynamic = request2;
        storeState11.setDraftAnchor(
          request3
            ? {
                ...request4,
                ask: true,
              }
            : request2,
        );
        storeState11.setDraftY(element);
      }
      return;
    } finally {
      --__documentClosure.documentSourcePromptLimit0;
    }
    ccMention(documentFrameResult37);
    if (request2.autopost) {
      (0, __documentClosure.DocumentSourcePromptState2)?.(
        request2.autopost.nonce,
        documentFrameResult37,
      );
    }
  }) })["setDraftY2"]);
}

export function createDocumentFrameEffect94(__documentClosure: Pick<DocumentFrameContext, "useCommentStore" | "DocumentSourcePromptState3" | "setDraftY2" | "clearDocumentSourcePromptPressedAt">): Dynamic {
  return ((..._extraArguments: unknown[]): undefined => {
      let draftAnchor: Dynamic = __documentClosure.useCommentStore.getState().draftAnchor;
      if (draftAnchor?.react === undefined) {
        if (draftAnchor?.autopost !== undefined) {
          (0, __documentClosure.DocumentSourcePromptState3)?.(draftAnchor.autopost.nonce);
          (0, __documentClosure.setDraftY2)(
            draftAnchor,
            draftAnchor.autopost.body,
            draftAnchor.autopost.to,
            draftAnchor.autopost.cc,
            {
              toClaude: true,
              ...(0, __documentClosure.clearDocumentSourcePromptPressedAt)(draftAnchor.autopost.nonce),
            },
          );
        }
      } else {
        (0, __documentClosure.setDraftY2)(draftAnchor, draftAnchor.react, [], []);
      }
    });
}

export function createDocumentFrameEffect95(__documentClosure: Pick<DocumentFrameContext, "useCommentStore" | "quietCarrierThreads" | "container" | "fsEntryId">): Dynamic {
  return ((..._extraArguments: unknown[]): undefined => {
      let storeState11: Dynamic = __documentClosure.useCommentStore.getState();
      let items2: Dynamic = [...storeState11.surfaceCarrier];
      if (items2.length !== 0) {
        storeState11.setSurfaceCarrier(null);
        if (storeState11.commentMode === `hidden`) {
          storeState11.setCommentMode(`margin`);
        }
        for (let documentFrameResult36 of items2 as Dynamic) {
          __documentClosure.quietCarrierThreads.delete(documentFrameResult36);
          storeState11
            .reopen(__documentClosure.container, __documentClosure.fsEntryId, documentFrameResult36)
            .catch((..._extraArguments: unknown[]): undefined => {})
            .then((..._extraArguments: unknown[]): undefined => {
              if (documentFrameResult36 !== items2.at(-1)) return;
              let storeState12: Dynamic = __documentClosure.useCommentStore.getState();
              storeState12.setFocus(documentFrameResult36);
              storeState12.setActive(documentFrameResult36);
              requestAnimationFrame(
                (..._extraArguments: unknown[]): undefined => {
                  for (let documentFrameResult37 of document.querySelectorAll(
                    `[data-thread-id]`,
                  ) as Dynamic)
                    if (
                      documentFrameResult37.dataset.threadId ===
                      documentFrameResult36
                    ) {
                      documentFrameResult37.scrollIntoView?.({
                        block: `nearest`,
                      });
                    }
                },
              );
            });
        }
      }
    });
}

export function createDocumentFrameEffect96(__documentClosure: Pick<DocumentFrameContext, "useCommentStore" | "elementRef27" | "DocumentSourcePromptState3" | "setDraftY2" | "clearDocumentSourcePromptPressedAt">): Dynamic {
  return ((..._extraArguments: unknown[]): undefined => {
      let quietPost: Dynamic = __documentClosure.useCommentStore.getState().quietPost;
      if (quietPost?.autopost !== undefined) {
        __documentClosure.elementRef27.current = __documentClosure.useCommentStore.getState().quietPostY;
        __documentClosure.useCommentStore.getState().setQuietPost(null);
        (0, __documentClosure.DocumentSourcePromptState3)?.(quietPost.autopost.nonce);
        (0, __documentClosure.setDraftY2)(
          quietPost,
          quietPost.autopost.body,
          quietPost.autopost.to,
          quietPost.autopost.cc,
          {
            toClaude: true,
            ...(0, __documentClosure.clearDocumentSourcePromptPressedAt)(quietPost.autopost.nonce),
          },
        );
      }
    });
}

export function createDocumentFrameMappedItems97(__documentClosure: Pick<DocumentFrameContext, "filter" | "enabledRef" | "setUseReducer" | "setFilter">): Dynamic {
  return ([`open`, `resolved`, `all`].map(
    (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
      label:
        item === `open` ? `Open` : item === `resolved` ? `Resolved` : `All`,
      checked: __documentClosure.filter === item,
      checkedRole: `radio`,
      onSelect: (..._extraArguments: unknown[]): undefined => {
        __documentClosure.enabledRef.current = true;
        (0, __documentClosure.setUseReducer)();
        (0, __documentClosure.setFilter)(item);
      },
    }),
  ));
}

export function createDocumentFrameEffect98(__documentClosure: Pick<DocumentFrameContext, "useReducer" | "countRef" | "mode" | "filter" | "documentFrameResult22" | "resolvePlatformAnnouncementsValue" | "documentFrameResult33">): Dynamic {
  return ((..._extraArguments: unknown[]): undefined => {
      if (__documentClosure.useReducer !== __documentClosure.countRef.current) {
        if (__documentClosure.mode !== `list`) {
          __documentClosure.countRef.current = __documentClosure.useReducer;
          return;
        }
        if (!(__documentClosure.filter !== `open` && __documentClosure.documentFrameResult22 === null)) {
          __documentClosure.countRef.current = __documentClosure.useReducer;
          (0, __documentClosure.resolvePlatformAnnouncementsValue)(document, __documentClosure.documentFrameResult33, {
            key: `comment-list`,
          });
        }
      }
    });
}
