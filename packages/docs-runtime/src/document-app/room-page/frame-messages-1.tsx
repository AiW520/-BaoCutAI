import { DocumentRuntimeState6, documentRuntimeSet4, documentRuntimeSet5 } from "../document-runtime/widget-provenance-gutter";
import { resolveWidgetBridgeTest, resolveWidgetBridgeValue4 } from "../widget-bridge/widget-sample-card";
import { resolveWidgetBridgeRule2 } from "../widget-bridge/state";
import { DocumentRuntimeLoad2 } from "../document-runtime/use-document-iframe-focus";
import { DocumentRuntime_ThatTabHasBeenDeletedOrIsNoLongerAvailable } from "../document-runtime/use-document-runtime-room";

/** BaoCut: room document frame messages; live accessors preserve closure state. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import { Ai as resolveEditorSelectionAndTablesValue2, Bh as updateDataModelSchemasHerePath, En as resolvePlatformLiveDocumentAndHistoryNodeId, Hj as filterDataContentAndReferencesFilter, In as PlatformLiveDocumentAndHistorySession, Kd as isCommentsStoreIsActive, Ma as resolveCommentsActionsAndSelectionNoun, Mn as loadPlatformLiveDocumentAndHistoryContainer, OO as resolveEditorAnchorsAndMentionsKind, Rg as resolvePlatformApiAndAuthValue28, SA as loadPlatformSessionAndSourcesAckOf, SO as isEditorAnchorsAndMentionsKind, Ss as updatePlatformSyncAndRoutingDirectory, W_ as frameBlobSource, eg as resolveDataModelSchemasEmptyRef, h_ as rawReq, hp as resolveDataOperationEngineMsg2, i_ as liveDoor, ig as useContainerStore, kO as resolveEditorAnchorsAndMentionsValue9, kn as PlatformLiveDocumentAndHistoryWidgetBundle, lj as resolvePlatformSessionAndSourcesTest6, m_ as api, no as CommentsActionsAndSelectionState3, qh as collectDataModelSchemasSplit, vx as toast, z_ as frameArtifactUrlFor } from "../../platform/index";
import { S as isFrameArtifact } from "../../boot/environment";
import { C as referenceContainer, E as fileReferenceLabel, S as readEnumDefinition, T as projectName, _ as searchReferenceCandidates, b as readCrossFileReference, f as referenceReadRoute, g as isRestrictedResponse, h as crossProjectClaudeLink, m as reconcileEnumDefinition, p as safeReferenceUrl, w as resolveLocalReference, x as readTableReference } from "../references/chips";
export function runRoomPage10DataVerbReadDataVerbWatch(roomPageContext: {
  containerRef: Dynamic;
  data: Dynamic;
  elementRef53: Dynamic;
  elementRef68: Dynamic;
  frameMessengerRef: Dynamic;
  id2: Dynamic;
  lookupRef7: Dynamic;
  navigatedRef: Dynamic;
  pidRef: Dynamic;
  reply: Dynamic;
  roomRef: Dynamic;
  updateElement: Dynamic;
  useDocumentInteractionOverlaysRef2: Dynamic;
  useDocumentManifestState2: Dynamic;
  win: Dynamic;
}): Dynamic {
  let refSlice: Dynamic = typeof roomPageContext.data.ref == `string` ? roomPageContext.data.ref.slice(0, 8192) : ``;
  if (refSlice.startsWith(`enum:`)) {
    let pid2: Dynamic = roomPageContext.pidRef.current;
    let refSliceSlice: Dynamic = refSlice.slice(5, 133);
    if (!pid2 || !/^[\w.-]+$/.test(refSliceSlice)) return {
      value: (0, roomPageContext.reply)({
        ok: false,
        error: `bad-ref`
      })
    };
    (async (..._extraArguments: unknown[]): Promise<Dynamic> => {
      let body: Dynamic = (await liveDoor(pid2).call(`read`, {
        ref: {
          object: `enum`,
          id: refSliceSlice
        },
        container: {
          kind: `project`,
          id: pid2
        }
      })).body;
      if (body?.verdict !== `allow`) return (0, roomPageContext.reply)({
        ok: false,
        error: body?.reason || `denied`
      });
      (0, roomPageContext.reply)({
        ok: true,
        value: body.value
      });
    })().catch((..._extraArguments: unknown[]): Dynamic => (0, roomPageContext.reply)({
      ok: false,
      error: `read-failed`
    }));
    return {
      value: void 0
    };
  }
  if (refSlice === `type:`) {
    let updateElement2: Dynamic = (..._extraArguments: unknown[]): Dynamic => (0, roomPageContext.updateElement)().then((result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => result.types ?? {});
    if (roomPageContext.data.verb === `read`) updateElement2().then((result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (0, roomPageContext.reply)({
      ok: true,
      value: result
    }), (error4?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (0, roomPageContext.reply)({
      ok: false,
      error: error4?.message || `read-failed`
    }));else {
      if (!roomPageContext.useDocumentManifestState2.addTypeWatch(roomPageContext.id2, ``)) return {
        value: (0, roomPageContext.reply)({
          ok: false,
          error: `watch-cap`
        })
      };
      updateElement2().then((result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomPageContext.useDocumentManifestState2.hasTypeWatch(roomPageContext.id2) && (0, roomPageContext.reply)({
        ok: true,
        value: result
      }), (error4?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomPageContext.useDocumentManifestState2.hasTypeWatch(roomPageContext.id2) && (0, roomPageContext.reply)({
        ok: false,
        error: error4?.message || `read-failed`
      }));
    }
    return {
      value: void 0
    };
  }
  let roomDocumentPageResult36: Dynamic = resolveDataModelSchemasEmptyRef(refSlice);
  let headKind: Dynamic = resolvePlatformApiAndAuthValue28(roomDocumentPageResult36) ? undefined : roomDocumentPageResult36[0]?.resource?.kind;
  let headId: Dynamic = resolvePlatformApiAndAuthValue28(roomDocumentPageResult36) ? `` : roomDocumentPageResult36[0]?.resource?.id ?? ``;
  let enabled6: boolean = !!(headKind && documentRuntimeSet4.has(headKind));
  let roomDocumentPageResult37: Dynamic = enabled6 ? null : referenceReadRoute(refSlice, roomPageContext.elementRef53.current, roomPageContext.data.verb);
  if (roomDocumentPageResult37?.route === `reject`) {
    (0, roomPageContext.reply)({
      ok: false,
      error: roomDocumentPageResult37.error
    });
    return {
      value: void 0
    };
  }
  if (roomDocumentPageResult37?.route === `api`) {
    readCrossFileReference((roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => rawReq(`GET`, roomDocumentPage2), roomPageContext.containerRef.current, roomDocumentPageResult37.ref).then((result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (0, roomPageContext.reply)({
      ok: true,
      value: result
    }), (error4?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (0, roomPageContext.reply)({
      ok: false,
      error: error4?.message || `read-failed`
    }));
    return {
      value: void 0
    };
  }
  if (enabled6) {
    let container2: Dynamic = roomPageContext.containerRef.current;
    let roomDocumentPageHandler7: Dynamic = (roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): boolean => !!roomDocumentPage2 && (roomDocumentPage2.includes(`/`) ? roomDocumentPage2 : `projects/${roomDocumentPage2}`) === container2;
    let resolve: Dynamic = async (..._extraArguments: unknown[]): Promise<Dynamic> => {
      let roomDocumentPageResult38: Dynamic = roomDocumentPageResult36;
      if (resolvePlatformApiAndAuthValue28(roomDocumentPageResult38) || roomDocumentPageResult38.length === 0) throw Error(`bad-ref`);
      if (roomDocumentPageResult38.length > 1) throw Error(`chained refs not supported in lfile read`);
      let roomDocumentPageResultItem: Dynamic = roomDocumentPageResult38[0];
      let kind: Dynamic = roomDocumentPageResultItem.resource?.kind;
      let id3: Dynamic = roomDocumentPageResultItem.resource?.id ?? ``;
      if (kind === `fn`) {
        let idIndex: Dynamic = id3.indexOf(`/`);
        let id4: Dynamic = idIndex < 0 ? id3 : id3.slice(0, idIndex);
        let label2: Dynamic = idIndex < 0 ? `` : id3.slice(idIndex + 1);
        if (label2 === `completions`) {
          if (roomDocumentPageResultItem.target) throw Error(`bad-ref`);
          let room2: Dynamic = roomPageContext.roomRef.current;
          if (room2 && !roomPageContext.elementRef68.current?.granted(`routine/${id4}`)) return null;
          let result3: Dynamic = room2 ? await api.v3RoutineStamp(room2.pid, id4).catch((..._extraArguments: unknown[]) => null) : await PlatformLiveDocumentAndHistoryWidgetBundle.widgetRoutineStamp(container2, id4).catch((..._extraArguments: unknown[]) => null);
          return result3 && !(`error` in result3) ? result3 : null;
        }
        if (label2) throw Error(`bad-ref`);
        let result: Dynamic = await PlatformLiveDocumentAndHistoryWidgetBundle.functionsList(container2).then((result3?: Dynamic, ..._extraArguments: unknown[]): Dynamic => filterDataContentAndReferencesFilter(result3, id4)).catch((..._extraArguments: unknown[]): Dynamic => id4);
        if (result === undefined) return null;
        let result2: Dynamic = await PlatformLiveDocumentAndHistoryWidgetBundle.functionsGet(container2, result).catch((..._extraArguments: unknown[]) => null);
        return roomDocumentPageResultItem.target ? collectDataModelSchemasSplit(result2, roomDocumentPageResultItem.target) : result2 ?? null;
      }
      if (kind === `run`) {
        let result: Dynamic = await PlatformLiveDocumentAndHistoryWidgetBundle.runsGet(id3).catch((..._extraArguments: unknown[]) => null);
        if (!result || !roomDocumentPageHandler7(result.source?.id)) return null;
        if (roomDocumentPageResultItem.target?.startsWith(`artifacts/`)) {
          let roomDocumentPageResult39: Dynamic;
          try {
            roomDocumentPageResult39 = decodeURIComponent(roomDocumentPageResultItem.target.slice(10));
          } catch {
            throw Error(`bad-ref`);
          }
          if (!roomDocumentPageResult39 || roomDocumentPageResult39.includes(`%`) || roomDocumentPageResult39.startsWith(`/`) || roomDocumentPageResult39.split(`/`).some((textPart?: Dynamic, ..._extraArguments: unknown[]): boolean => textPart === `` || textPart === `.` || textPart === `..`)) throw Error(`bad-ref`);
          return await PlatformLiveDocumentAndHistoryWidgetBundle.runsFile(id3, roomDocumentPageResult39).catch((..._extraArguments: unknown[]) => null);
        }
        if (roomDocumentPageResultItem.target) throw Error(`unsupported run: target`);
        return result;
      }
      if (kind === `table`) return await readTableReference((roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => rawReq(`GET`, roomDocumentPage2), container2, id3, roomDocumentPageResultItem.target);
      if (kind === `type`) return await readEnumDefinition(roomPageContext.updateElement, id3);
      throw Error(`not-implemented (T5b)`);
    };
    if (roomPageContext.data.verb === `read`) {
      resolve().then((result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (0, roomPageContext.reply)({
        ok: true,
        value: result
      }), (error4?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (0, roomPageContext.reply)({
        ok: false,
        error: error4?.message || `read-failed`
      }));
      return {
        value: void 0
      };
    }
    let matchesHeadKind: Dynamic = headKind === `fn` && headId.endsWith(`/completions`);
    roomPageContext.useDocumentManifestState2.startWatch({
      id: roomPageContext.id2,
      headKind: headKind,
      headId: headId,
      resolve: resolve,
      reply: roomPageContext.reply,
      ...(matchesHeadKind ? {
        mode: `completion-keyed`
      } : {})
    });
    return {
      value: void 0
    };
  }
  let send9 = (..._extraArguments: unknown[]): undefined => {
    let win2: Dynamic = roomPageContext.win;
    if (!win2 || roomPageContext.navigatedRef.current) return;
    let file: Dynamic = roomPageContext.useDocumentInteractionOverlaysRef2.current?.file;
    let record4: Dynamic = file ? resolveLocalReference(file, refSlice) : {
      ok: false,
      error: `host-gone: room state not ready`
    };
    let record5: Dynamic = record4.ok ? {
      type: `bridge-reply`,
      id: roomPageContext.id2,
      ok: true,
      value: record4.value
    } : {
      type: `bridge-reply`,
      id: roomPageContext.id2,
      ok: false,
      error: record4.error
    };
    roomPageContext.frameMessengerRef.current.send(win2, record5);
  };
  if (roomPageContext.data.verb === `watch`) {
    if (roomPageContext.lookupRef7.current.size >= 256 && !roomPageContext.lookupRef7.current.has(roomPageContext.id2)) {
      (0, roomPageContext.reply)({
        ok: false,
        error: `not-allowed: watch budget exceeded`
      });
      return {
        value: void 0
      };
    }
    roomPageContext.lookupRef7.current.set(roomPageContext.id2, {
      ref: refSlice
    });
  }
  send9();
  return {
    value: void 0
  };
}
export function runRoomPage11DataVerbWidgetInvoke(roomPageContext: {
  containerRef: Dynamic;
  data: Dynamic;
  frameMessengerRef: Dynamic;
  id2: Dynamic;
  iframeRef: Dynamic;
  labelRef: Dynamic;
  navigatedRef: Dynamic;
  useDocumentRuntimeFsEntryId3: Dynamic;
  win: Dynamic;
}): Dynamic {
  let send9 = (roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let win2: Dynamic = roomPageContext.win;
    if (!(!win2 || roomPageContext.navigatedRef.current)) {
      roomPageContext.frameMessengerRef.current.send(win2, {
        type: `bridge-reply`,
        id: roomPageContext.id2,
        ok: true,
        value: roomDocumentPage2
      });
    }
  };
  let send10: Dynamic = (rule?: Dynamic, message?: Dynamic, ..._extraArguments: unknown[]): Dynamic => send9({
    error: true,
    rule: rule,
    message: message
  });
  let iframe: Dynamic = roomPageContext.iframeRef.current;
  let userActivation: Dynamic = (navigator as Dynamic).userActivation;
  if (!iframe || !isCommentsStoreIsActive(roomPageContext.data.sig, roomPageContext.labelRef.current || null, (document as Dynamic).activeElement, iframe, userActivation)) return {
    value: send10(`not-allowed`, `routines can only be started by a real click`)
  };
  let useDocumentRuntimeFsEntryId4: Dynamic = roomPageContext.useDocumentRuntimeFsEntryId3.current;
  let nodeIdSlice: Dynamic = typeof roomPageContext.data.nodeId == `string` ? roomPageContext.data.nodeId.slice(0, 64) : ``;
  let routine: Dynamic = typeof roomPageContext.data.routine == `string` ? roomPageContext.data.routine.slice(0, 512) : ``;
  let argsJson: Dynamic = typeof roomPageContext.data.argsJson == `string` ? roomPageContext.data.argsJson : undefined;
  if (argsJson !== undefined && argsJson.length > 8192) return {
    value: send10(`too-large`, `the routine's parameters are too big (8KB cap)`)
  };
  if (!useDocumentRuntimeFsEntryId4 || !nodeIdSlice || !routine) return {
    value: send10(`bad-request`, `malformed invocation`)
  };
  let args: Dynamic;
  if (argsJson !== undefined) try {
    let parse: Dynamic = JSON.parse(argsJson);
    if (parse !== null && (typeof parse != `object` || Array.isArray(parse))) return {
      value: send10(`bad-request`, `routine parameters must be an object`)
    };
    args = parse ?? undefined;
  } catch {
    return {
      value: send10(`bad-request`, `routine parameters weren't valid JSON`)
    };
  }
  PlatformLiveDocumentAndHistorySession.invoke(roomPageContext.containerRef.current, useDocumentRuntimeFsEntryId4, nodeIdSlice, {
    routine: routine,
    args: args
  }).then((result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => send9(result), (..._extraArguments: unknown[]): Dynamic => send10(`invoke-failed`, `the routine couldn't be started right now`));
  return {
    value: void 0
  };
}
export function runRoomPage12DataVerbWidgetWrite(roomPageContext: {
  containerRef: Dynamic;
  data: Dynamic;
  frameMessengerRef: Dynamic;
  id2: Dynamic;
  iframeRef: Dynamic;
  labelRef: Dynamic;
  navigatedRef: Dynamic;
  roomRef: Dynamic;
  useDocumentRuntimeFsEntryId3: Dynamic;
  win: Dynamic;
}): Dynamic {
  let send9 = (roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let win2: Dynamic = roomPageContext.win;
    if (!(!win2 || roomPageContext.navigatedRef.current)) {
      roomPageContext.frameMessengerRef.current.send(win2, {
        type: `bridge-reply`,
        id: roomPageContext.id2,
        ok: true,
        value: roomDocumentPage2
      });
    }
  };
  let send10: Dynamic = (rule?: Dynamic, message?: Dynamic, ..._extraArguments: unknown[]): Dynamic => send9({
    error: true,
    rule: rule,
    message: message
  });
  let iframe: Dynamic = roomPageContext.iframeRef.current;
  let userActivation: Dynamic = (navigator as Dynamic).userActivation;
  if (!iframe || !isCommentsStoreIsActive(roomPageContext.data.sig, roomPageContext.labelRef.current || null, (document as Dynamic).activeElement, iframe, userActivation)) return {
    value: send10(`not-allowed`, `writes need a real click in the document`)
  };
  let useDocumentRuntimeFsEntryId4: Dynamic = roomPageContext.useDocumentRuntimeFsEntryId3.current;
  let nodeIdSlice: Dynamic = typeof roomPageContext.data.nodeId == `string` ? roomPageContext.data.nodeId.slice(0, 64) : ``;
  let refSlice: Dynamic = typeof roomPageContext.data.ref == `string` ? roomPageContext.data.ref.slice(0, 512) : ``;
  let target2: Dynamic = typeof roomPageContext.data.target == `string` ? roomPageContext.data.target.slice(0, 512) : undefined;
  let valueJson: Dynamic = typeof roomPageContext.data.valueJson == `string` ? roomPageContext.data.valueJson : `null`;
  if (valueJson.length > 65536) return {
    value: send10(`too-large`, `write value is too big (64KB cap)`)
  };
  if (!useDocumentRuntimeFsEntryId4 && !roomPageContext.roomRef.current || !nodeIdSlice || !refSlice) return {
    value: send10(`bad-request`, `malformed write`)
  };
  let roomDocumentPageResult36: Dynamic;
  try {
    roomDocumentPageResult36 = JSON.parse(valueJson);
  } catch {
    return {
      value: send10(`bad-request`, `write value wasn't valid JSON`)
    };
  }
  if (!useDocumentRuntimeFsEntryId4) return {
    value: send10(`bad-request`, `malformed write`)
  };
  api.lfile.widgetWrite(roomPageContext.containerRef.current, useDocumentRuntimeFsEntryId4, nodeIdSlice, {
    ref: refSlice,
    target: target2,
    value: roomDocumentPageResult36
  }).then((result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => send9(result), (..._extraArguments: unknown[]): Dynamic => send10(`write-failed`, `the write didn't reach the server`));
  return {
    value: void 0
  };
}
export function runRoomPage13DataVerbWidgetSource(roomPageContext: {
  containerRef: Dynamic;
  data: Dynamic;
  ensureRef: Dynamic;
  frameMessengerRef: Dynamic;
  id2: Dynamic;
  navigatedRef: Dynamic;
  roomDocumentPageHandler3: Dynamic;
  roomDocumentPageHandler5: Dynamic;
  roomRef: Dynamic;
  updateElement: Dynamic;
  useDocumentRuntimeFsEntryId3: Dynamic;
  win: Dynamic;
}): Dynamic {
  let send9 = (roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let win2: Dynamic = roomPageContext.win;
    if (!(!win2 || roomPageContext.navigatedRef.current)) {
      roomPageContext.frameMessengerRef.current.send(win2, {
        type: `bridge-reply`,
        id: roomPageContext.id2,
        ...roomDocumentPage2
      });
    }
  };
  let refSlice: Dynamic = typeof roomPageContext.data.ref == `string` ? roomPageContext.data.ref.slice(0, 8192) : ``;
  let room2: Dynamic = roomPageContext.roomRef.current;
  if (room2) {
    let widgetBridgeTest: Dynamic = resolveWidgetBridgeTest(typeof roomPageContext.data.nodeId == `string` ? roomPageContext.data.nodeId : ``, true, (0, roomPageContext.roomDocumentPageHandler3)());
    let response3: Dynamic = resolveDataOperationEngineMsg2(refSlice);
    if (!response3.ok) return {
      value: send9({
        ok: false,
        error: response3.msg
      })
    };
    let send11: Dynamic = (rule?: Dynamic, message?: Dynamic, ..._extraArguments: unknown[]): Dynamic => send9({
      ok: true,
      value: {
        value: null,
        refused: {
          rule: rule,
          message: message
        }
      }
    });
    let send12: Dynamic = (..._extraArguments: unknown[]): Dynamic => send11(`off-manifest`, `This block isn't allowed to read that — it isn't in the block's published sources.`);
    if (!widgetBridgeTest) return {
      value: send12()
    };
    if (isFrameArtifact()) {
      if (response3.noun !== `blob`) return {
        value: send11(`unavailable-in-artifact`, `Live data doesn't load inside a Claude artifact — open this project in Bongo to see it.`)
      };
      if (!(0, roomPageContext.roomDocumentPageHandler5)(resolveWidgetBridgeValue4(room2.fileId, roomPageContext.useDocumentRuntimeFsEntryId3.current, widgetBridgeTest)).has(response3.canonical)) return {
        value: send12()
      };
      frameBlobSource(room2.pid, response3.canonical).then((result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => send9({
        ok: true,
        value: result
      }), (..._extraArguments: unknown[]): Dynamic => send9({
        ok: false,
        error: `read-failed`
      }));
      return {
        value: void 0
      };
    }
    (async (..._extraArguments: unknown[]): Promise<Dynamic> => {
      let ensure2: Dynamic = await roomPageContext.ensureRef.current(room2, widgetBridgeTest);
      if (!ensure2 || !ensure2.grants.has(response3.canonical)) return send12();
      let v3WidgetData: Dynamic = (token?: Dynamic, ..._extraArguments: unknown[]): Dynamic => api.v3WidgetData(room2.pid, room2.fileId, widgetBridgeTest, {
        token: token,
        ref: response3.canonical
      });
      let v3WidgetData2: Dynamic = await v3WidgetData(ensure2.token);
      if (`error` in v3WidgetData2 && v3WidgetData2.rule === `mount-required`) {
        ensure2 = await roomPageContext.ensureRef.current(room2, widgetBridgeTest, true);
        if (!ensure2 || !ensure2.grants.has(response3.canonical)) return send12();
        v3WidgetData2 = await v3WidgetData(ensure2.token);
      }
      if (`error` in v3WidgetData2) {
        send9({
          ok: true,
          value: {
            value: null,
            refused: resolveWidgetBridgeRule2(v3WidgetData2)
          }
        });
        return;
      }
      if (response3.noun === `routine`) {
        send9({
          ok: true,
          value: {
            value: v3WidgetData2.value,
            columns: null,
            routine: v3WidgetData2.routine,
            run: v3WidgetData2.run,
            at: v3WidgetData2.at,
            ...(v3WidgetData2.stale ? {
              stale: v3WidgetData2.stale
            } : {})
          }
        });
        return;
      }
      send9({
        ok: true,
        value: v3WidgetData2.value
      });
    })().catch((..._extraArguments: unknown[]): Dynamic => send9({
      ok: false,
      error: `read-failed`
    }));
    return {
      value: void 0
    };
  }
  let roomDocumentPageResult36: Dynamic = ((..._extraArguments: unknown[]): Dynamic => {
    let nodeId2: Dynamic = typeof roomPageContext.data.nodeId == `string` ? roomPageContext.data.nodeId : ``;
    return nodeId2 ? (0, roomPageContext.roomDocumentPageHandler5)(resolveWidgetBridgeValue4(roomPageContext.roomRef.current?.fileId, roomPageContext.useDocumentRuntimeFsEntryId3.current, nodeId2)).has(refSlice) : false;
  })();
  let send10: Dynamic = (..._extraArguments: unknown[]): Dynamic => send9({
    ok: true,
    value: {
      value: null,
      refused: {
        rule: `off-manifest`,
        message: `This block isn't allowed to read that — it isn't in the block's published sources.`
      }
    }
  });
  let entry: Dynamic = isEditorAnchorsAndMentionsKind(refSlice);
  if (entry && entry.kind === `xlsx`) {
    if (!roomDocumentPageResult36) return {
      value: send10()
    };
    (async (..._extraArguments: unknown[]): Promise<Dynamic> => {
      let response3: Dynamic = await rawReq(`GET`, `/api/lfile/widget-xlsx-range?container=${encodeURIComponent(roomPageContext.containerRef.current)}&fileId=${encodeURIComponent(entry.fileId)}&sheet=${encodeURIComponent(entry.sheet)}&range=${encodeURIComponent(entry.range)}`);
      if (!response3.ok) return send9({
        ok: false,
        error: `read-failed`
      });
      let json: Dynamic = await response3.json();
      if (`error` in json) return send9({
        ok: false,
        error: json.message
      });
      send9({
        ok: true,
        value: resolveEditorAnchorsAndMentionsValue9(json.values, json.note)
      });
    })().catch((..._extraArguments: unknown[]): Dynamic => send9({
      ok: false,
      error: `read-failed`
    }));
    return {
      value: void 0
    };
  }
  let response2: Dynamic = resolveDataOperationEngineMsg2(refSlice);
  if (response2.ok) {
    let nodeId2: Dynamic = typeof roomPageContext.data.nodeId == `string` ? roomPageContext.data.nodeId : ``;
    let roomDocumentPageHandler7: Dynamic = nodeId2 ? (0, roomPageContext.roomDocumentPageHandler5)(resolveWidgetBridgeValue4(roomPageContext.roomRef.current?.fileId, roomPageContext.useDocumentRuntimeFsEntryId3.current, nodeId2)) : undefined;
    if (!roomDocumentPageHandler7 || !roomDocumentPageHandler7.has(response2.canonical)) return {
      value: send9({
        ok: true,
        value: {
          value: null,
          refused: {
            rule: `off-manifest`,
            message: `This block isn't allowed to read that — it isn't in the block's published sources.`
          }
        }
      })
    };
    if (response2.noun === `routine`) {
      (async (..._extraArguments: unknown[]): Promise<Dynamic> => {
        let widgetRoutineResult: Dynamic = await PlatformLiveDocumentAndHistoryWidgetBundle.widgetRoutineResult(roomPageContext.containerRef.current, response2.id);
        if (`error` in widgetRoutineResult) return send9({
          ok: true,
          value: {
            value: null,
            refused: {
              rule: widgetRoutineResult.rule,
              message: widgetRoutineResult.message,
              ...(widgetRoutineResult.lastRun ? {
                lastRun: widgetRoutineResult.lastRun
              } : {})
            }
          }
        });
        send9({
          ok: true,
          value: {
            value: widgetRoutineResult.value,
            columns: null,
            routine: widgetRoutineResult.routine,
            run: widgetRoutineResult.run,
            at: widgetRoutineResult.at,
            ...(widgetRoutineResult.stale ? {
              stale: widgetRoutineResult.stale
            } : {})
          }
        });
      })().catch((..._extraArguments: unknown[]): Dynamic => send9({
        ok: false,
        error: `read-failed`
      }));
      return {
        value: void 0
      };
    }
    if (response2.noun === `run`) {
      (async (..._extraArguments: unknown[]): Promise<Dynamic> => {
        let widgetRunResult: Dynamic = await PlatformLiveDocumentAndHistoryWidgetBundle.widgetRunResult(roomPageContext.containerRef.current, response2.id);
        if (`error` in widgetRunResult) return send9({
          ok: true,
          value: {
            value: null,
            refused: {
              rule: widgetRunResult.rule,
              message: widgetRunResult.message,
              ...(widgetRunResult.lastRun ? {
                lastRun: widgetRunResult.lastRun
              } : {})
            }
          }
        });
        send9({
          ok: true,
          value: {
            value: widgetRunResult.value,
            columns: null,
            routine: widgetRunResult.routine,
            run: widgetRunResult.run,
            at: widgetRunResult.at,
            pinned: true
          }
        });
      })().catch((..._extraArguments: unknown[]): Dynamic => send9({
        ok: false,
        error: `read-failed`
      }));
      return {
        value: void 0
      };
    }
    if (response2.noun === `file`) {
      (async (..._extraArguments: unknown[]): Promise<Dynamic> => {
        let widgetFileRead: Dynamic = await PlatformLiveDocumentAndHistoryWidgetBundle.widgetFileRead(roomPageContext.containerRef.current, response2.id);
        if (`error` in widgetFileRead) return send9({
          ok: true,
          value: {
            value: null,
            refused: {
              rule: widgetFileRead.rule,
              message: widgetFileRead.message
            }
          }
        });
        send9({
          ok: true,
          value: {
            value: widgetFileRead.value,
            columns: null,
            run: null,
            at: null
          }
        });
      })().catch((..._extraArguments: unknown[]): Dynamic => send9({
        ok: false,
        error: `read-failed`
      }));
      return {
        value: void 0
      };
    }
    (async (..._extraArguments: unknown[]): Promise<Dynamic> => {
      let response3: Dynamic = await rawReq(`GET`, `/api/tables/state-row?container=${encodeURIComponent(roomPageContext.containerRef.current)}&path=${encodeURIComponent(response2.id)}`);
      if (!response3.ok) return send9({
        ok: false,
        error: `read-failed`
      });
      let json: Dynamic = await response3.json();
      let state2: Dynamic = json?.state ?? {};
      let columns: Dynamic = null;
      try {
        let columns2: Dynamic = (await (0, roomPageContext.updateElement)()).tables?.[response2.id]?.columns;
        if (columns2 && typeof columns2 == `object`) {
          columns = Object.keys(columns2);
        }
      } catch {}
      send9({
        ok: true,
        value: {
          value: state2,
          columns: columns,
          run: null,
          at: json?.updatedAt ?? null
        }
      });
    })().catch((..._extraArguments: unknown[]): Dynamic => send9({
      ok: false,
      error: `read-failed`
    }));
    return {
      value: void 0
    };
  }
  let entry2: Dynamic = resolveEditorAnchorsAndMentionsKind(refSlice);
  if (!entry2 || entry2.kind !== `tables` || entry2.id.includes(`/`)) return {
    value: send9({
      ok: false,
      error: response2.msg
    })
  };
  if (!roomDocumentPageResult36) return {
    value: send10()
  };
  let id3: Dynamic = entry2.id;
  (async (..._extraArguments: unknown[]): Promise<Dynamic> => {
    let response3: Dynamic = await rawReq(`GET`, `/api/tables/state-row?container=${encodeURIComponent(roomPageContext.containerRef.current)}&path=${encodeURIComponent(id3)}`);
    if (!response3.ok) return send9({
      ok: false,
      error: `read-failed`
    });
    let json: Dynamic = await response3.json();
    let state2: Dynamic = json?.state ?? {};
    let columns: Dynamic = null;
    try {
      let columns2: Dynamic = (await (0, roomPageContext.updateElement)()).tables?.[id3]?.columns;
      if (columns2 && typeof columns2 == `object`) {
        columns = Object.keys(columns2);
      }
    } catch {}
    send9({
      ok: true,
      value: {
        value: state2,
        columns: columns,
        run: null,
        at: json?.updatedAt ?? null
      }
    });
  })().catch((..._extraArguments: unknown[]): Dynamic => send9({
    ok: false,
    error: `read-failed`
  }));
  return {
    value: void 0
  };
}
export function runRoomPage14DataVerbWidgetVsLoad(roomPageContext: {
  data: Dynamic;
  elementRef33: Dynamic;
  frameMessengerRef: Dynamic;
  id2: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
  roomDocumentPageResultRef: Dynamic;
  useDocumentRuntimeFsEntryId3: Dynamic;
}): Dynamic {
  let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
  if (!contentWindow || roomPageContext.navigatedRef.current) return {
    value: void 0
  };
  let nodeId2: Dynamic = typeof roomPageContext.data.nodeId == `string` && resolvePlatformSessionAndSourcesTest6(roomPageContext.data.nodeId) ? roomPageContext.data.nodeId : ``;
  let useDocumentRuntimeFsEntryId4: Dynamic = roomPageContext.useDocumentRuntimeFsEntryId3.current;
  let roomDocumentPageResult36: Dynamic = null;
  if (!roomPageContext.roomDocumentPageResultRef.current && nodeId2 && useDocumentRuntimeFsEntryId4) {
    let frag: Dynamic = roomPageContext.elementRef33.current?.frag;
    if (frag && frag.nodeId === nodeId2) {
      roomPageContext.elementRef33.current = {
        frag: null
      };
      if (Object.keys(frag.vs).length) {
        roomDocumentPageResult36 = frag.vs;
      }
    }
    if (!roomDocumentPageResult36) {
      let roomDocumentPageResult38: Dynamic = resolvePlatformLiveDocumentAndHistoryNodeId(location.hash.slice(1));
      if (roomDocumentPageResult38 && roomDocumentPageResult38.nodeId === nodeId2 && Object.keys(roomDocumentPageResult38.vs).length) {
        roomDocumentPageResult36 = roomDocumentPageResult38.vs;
      }
    }
  }
  let roomDocumentPageResult37: Dynamic = roomDocumentPageResult36 ?? (!roomPageContext.roomDocumentPageResultRef.current && nodeId2 && useDocumentRuntimeFsEntryId4 ? DocumentRuntimeLoad2.load(useDocumentRuntimeFsEntryId4, nodeId2) : {});
  roomPageContext.frameMessengerRef.current.send(contentWindow, {
    type: `bridge-reply`,
    id: roomPageContext.id2,
    ok: true,
    value: roomDocumentPageResult37
  });
  return {
    value: void 0
  };
}
export function runRoomPage15DataVerbWidgetBundle(roomPageContext: {
  containerRef: Dynamic;
  countRef5: Dynamic;
  data: Dynamic;
  ensureRef: Dynamic;
  frameMessengerRef: Dynamic;
  id2: Dynamic;
  lookupRef11: Dynamic;
  lookupRef9: Dynamic;
  navigatedRef: Dynamic;
  roomDocumentPageHandler3: Dynamic;
  roomRef: Dynamic;
  useDocumentInteractionOverlays12: Dynamic;
  useDocumentRuntimeFsEntryId3: Dynamic;
  win: Dynamic;
}): Dynamic {
  let send9 = (roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let win2: Dynamic = roomPageContext.win;
    if (!(!win2 || roomPageContext.navigatedRef.current)) {
      roomPageContext.frameMessengerRef.current.send(win2, {
        type: `bridge-reply`,
        id: roomPageContext.id2,
        ...roomDocumentPage2
      });
    }
  };
  let nodeId2: Dynamic = typeof roomPageContext.data.nodeId == `string` ? roomPageContext.data.nodeId : ``;
  let room2: Dynamic = roomPageContext.roomRef.current;
  let widgetBridgeTest: Dynamic = resolveWidgetBridgeTest(nodeId2, !!room2, room2 ? (0, roomPageContext.roomDocumentPageHandler3)() : documentRuntimeSet5);
  let fileId4: Dynamic = room2 ? room2.fileId : roomPageContext.useDocumentRuntimeFsEntryId3.current;
  if (!fileId4 || !widgetBridgeTest || !/^[A-Za-z0-9_-]{1,64}$/.test(widgetBridgeTest)) return {
    value: send9({
      ok: true,
      value: null
    })
  };
  let widgetBridgeValue4: string = resolveWidgetBridgeValue4(room2?.fileId, roomPageContext.useDocumentRuntimeFsEntryId3.current, widgetBridgeTest);
  let total: Dynamic = (roomPageContext.lookupRef11.current.get(widgetBridgeValue4) ?? 0) + 1;
  roomPageContext.lookupRef11.current.set(widgetBridgeValue4, total);
  let count: Dynamic = roomPageContext.countRef5.current;
  let ensure2: Dynamic = room2 && !isFrameArtifact() ? roomPageContext.ensureRef.current(room2, widgetBridgeTest, true) : null;
  (room2 ? loadPlatformLiveDocumentAndHistoryContainer(room2.pid, room2.fileId, widgetBridgeTest) : PlatformLiveDocumentAndHistoryWidgetBundle.widgetBundle(roomPageContext.containerRef.current, fileId4, widgetBridgeTest)).then((result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let matchesCount: boolean = count === roomPageContext.countRef5.current && roomPageContext.lookupRef11.current.get(widgetBridgeValue4) === total && !roomPageContext.navigatedRef.current;
    let deps: Dynamic = result?.deps;
    if (matchesCount && deps && (Array.isArray(deps.sources) || Array.isArray(deps.embeds))) {
      let uniqueItems: Dynamic = new (Set as Dynamic)();
      roomPageContext.lookupRef9.current.set(widgetBridgeValue4, uniqueItems);
      if (Array.isArray(deps.sources)) for (let roomDocumentPageResult36 of deps.sources as Dynamic) if (typeof roomDocumentPageResult36 == `string`) {
        uniqueItems.add(roomDocumentPageResult36);
      }
      if (Array.isArray(deps.embeds)) {
        let items2: Dynamic = [];
        for (let roomDocumentPageResult36 of deps.embeds as Dynamic) {
          let ref: Dynamic = roomDocumentPageResult36?.ref;
          if (typeof ref == `string`) {
            uniqueItems.add(ref);
            items2.push(ref);
          }
        }
        if (room2 && ensure2) {
          let index: number = 0;
          let useDocumentInteractionOverlays25 = (roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): undefined => {
            if (!(count !== roomPageContext.countRef5.current || roomPageContext.lookupRef11.current.get(widgetBridgeValue4) !== total || roomPageContext.navigatedRef.current)) {
              if (roomDocumentPage2?.pending) {
                if (index++ < 3) {
                  setTimeout((..._extraArguments: unknown[]): undefined => void roomPageContext.ensureRef.current(room2, widgetBridgeTest, true).then(useDocumentInteractionOverlays25), 800);
                }
                return;
              }
              roomPageContext.useDocumentInteractionOverlays12.current(`pub:${widgetBridgeValue4}`, roomDocumentPage2 ? items2.filter((item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomDocumentPage2.grants.has(item)) : []);
            }
          };
          ensure2.then(useDocumentInteractionOverlays25);
        }
      }
    }
    send9({
      ok: true,
      value: result
    });
  }, (error4?: Dynamic, ..._extraArguments: unknown[]): Dynamic => send9({
    ok: false,
    error: room2 && error4 instanceof (Error as Dynamic) && error4.message && !error4.logged ? error4.message : `bundle-read-failed`
  }));
  return {
    value: void 0
  };
}
export function runRoomPage16DataVerbEditType(roomPageContext: {
  containerRef: Dynamic;
  data: Dynamic;
  enumEditDialogRef: Dynamic;
  frameMessengerRef: Dynamic;
  id2: Dynamic;
  iframeRef: Dynamic;
  labelRef: Dynamic;
  recordRef4: Dynamic;
  setEnumEditDialog: Dynamic;
  win: Dynamic;
}): Dynamic {
  let send9: Dynamic = (error4?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomPageContext.frameMessengerRef.current.send(roomPageContext.win, {
    type: `bridge-reply`,
    id: roomPageContext.id2,
    ok: false,
    error: error4
  });
  let iframe: Dynamic = roomPageContext.iframeRef.current;
  let userActivation: Dynamic = (navigator as Dynamic).userActivation;
  if (!iframe || !isCommentsStoreIsActive(roomPageContext.data.sig, roomPageContext.labelRef.current || null, (document as Dynamic).activeElement, iframe, userActivation)) return {
    value: send9(`not-allowed`)
  };
  if (roomPageContext.containerRef.current.startsWith(`users/`)) return {
    value: send9(`types live in a project's claude.json — not available in users/`)
  };
  {
    let now: number = Date.now();
    let record4: Dynamic = roomPageContext.recordRef4.current;
    if (now - record4.last > 2e3) {
      record4.n = 0;
    }
    record4.last = now;
    if (record4.n >= 8) return {
      value: send9(`not-allowed: prompt rate cap`)
    };
    record4.n++;
  }
  let typeRef: Dynamic = roomPageContext.data.typeRef;
  let typeRef2: Dynamic = typeof typeRef == `string` && CommentsActionsAndSelectionState3.test(typeRef) ? typeRef : null;
  let rect: Dynamic = roomPageContext.data.rect ?? {};
  let isFinite2: Dynamic = (roomDocumentPage2?: Dynamic, options2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => Number.isFinite(roomDocumentPage2) ? roomDocumentPage2 : options2;
  let iframeBounds: Dynamic = iframe.getBoundingClientRect();
  let clientWidth: Dynamic = (document as Dynamic).documentElement.clientWidth;
  let clientHeight: Dynamic = (document as Dynamic).documentElement.clientHeight;
  let rect2: Dynamic = {
    top: Math.min(Math.max(iframeBounds.top + isFinite2(rect.top, 0), 8), clientHeight - 40),
    left: Math.min(Math.max(iframeBounds.left + isFinite2(rect.left, 0), 8), clientWidth - 40),
    width: Math.min(Math.max(isFinite2(rect.width, 120), 20), 400),
    height: Math.min(Math.max(isFinite2(rect.height, 24), 14), 60)
  };
  let enumEditDialog2: Dynamic = roomPageContext.enumEditDialogRef.current;
  if (enumEditDialog2) {
    roomPageContext.frameMessengerRef.current.send(enumEditDialog2.win, {
      type: `bridge-reply`,
      id: enumEditDialog2.id,
      ok: false,
      error: `superseded`
    });
  }
  (0, roomPageContext.setEnumEditDialog)({
    id: roomPageContext.id2,
    typeRef: typeRef2,
    rect: rect2,
    win: roomPageContext.win
  });
  return {
    value: void 0
  };
}
export function runRoomPage17DataVerbNavigate(roomPageContext: {
  data: Dynamic;
  enabledRef3: Dynamic;
  fileIdRef: Dynamic;
  frameMessengerRef: Dynamic;
  id2: Dynamic;
  navigatedRef: Dynamic;
  pidRef: Dynamic;
  recordRef3: Dynamic;
  roomDocumentPageResultRef: Dynamic;
  setFromMention: Dynamic;
  setOpenUrl: Dynamic;
  setRunModal: Dynamic;
  tabNamesRef: Dynamic;
  win: Dynamic;
}): Dynamic {
  if (!(navigator as Dynamic).userActivation?.isActive) {
    roomPageContext.frameMessengerRef.current.send(roomPageContext.win, {
      type: `bridge-reply`,
      id: roomPageContext.id2,
      ok: false,
      error: `not-allowed`
    });
    return {
      value: void 0
    };
  }
  let ref: Dynamic = typeof roomPageContext.data.ref == `string` ? roomPageContext.data.ref : ``;
  let items2: Dynamic = resolveDataModelSchemasEmptyRef(ref);
  let itemItem: Dynamic = !resolvePlatformApiAndAuthValue28(items2) && items2.length === 1 ? items2[0] : undefined;
  if (itemItem?.resource?.kind === `run`) {
    let runId: Dynamic = itemItem.resource.id;
    if (itemItem.params?.panel === `sources`) {
      (0, roomPageContext.setRunModal)({
        runRef: `run:${runId}`
      });
      return {
        value: void 0
      };
    }
    (window as Dynamic).dispatchEvent(new (CustomEvent as Dynamic)(`bongo:openRuns`, {
      detail: {
        runId: runId
      }
    }));
    return {
      value: void 0
    };
  }
  if (ref.startsWith(`connector:`)) {
    (window as Dynamic).dispatchEvent(new (CustomEvent as Dynamic)(`bongo:reconnect`, {
      detail: {
        slug: ref.slice(10)
      }
    }));
    return {
      value: void 0
    };
  }
  let setOpenUrl2 = (roomDocumentPage2?: Dynamic, options2: Dynamic = false, ..._extraArguments: unknown[]): undefined => {
    if (roomPageContext.roomDocumentPageResultRef.current) return;
    let now: number = Date.now();
    let record4: Dynamic = roomPageContext.recordRef3.current;
    if (now - record4.last > 2e3) {
      record4.n = 0;
    }
    record4.last = now;
    if (record4.n < 8) {
      record4.n++;
      (0, roomPageContext.setFromMention)(options2);
      (0, roomPageContext.setOpenUrl)(roomDocumentPage2);
    }
  };
  if (isFrameArtifact()) {
    let page2: Dynamic = crossProjectClaudeLink(ref, roomPageContext.pidRef.current);
    if (page2 !== null) {
      let roomDocumentPageResult36: Dynamic = page2.kind === `artifact` ? frameArtifactUrlFor(page2.pid) : null;
      if (roomDocumentPageResult36 !== null) {
        setOpenUrl2(new (URL as Dynamic)(roomDocumentPageResult36), true);
      }
      return {
        value: void 0
      };
    }
  }
  {
    let toLowerCase: Dynamic = (roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (roomDocumentPage2 ?? ``).toLowerCase();
    let match: Dynamic = /^claude:\/\/project\/([^/#]+)\/file\/([^/#]+)(?:#([A-Za-z0-9_/:.-]{1,128}))?$/.exec(ref);
    if (match !== null && toLowerCase(match[1]) === toLowerCase(roomPageContext.pidRef.current)) {
      let matchesNormalizedText: boolean = toLowerCase(match[2]) === toLowerCase(roomPageContext.fileIdRef.current);
      if (matchesNormalizedText && match[3] !== undefined) {
        if (roomPageContext.enabledRef3.current && !roomPageContext.navigatedRef.current) {
          roomPageContext.frameMessengerRef.current.send(roomPageContext.win, {
            type: `jump-to`,
            frag: match[3]
          });
        }
        return {
          value: void 0
        };
      }
      if (matchesNormalizedText) return {
        value: void 0
      };
      let tabNames2: Dynamic = roomPageContext.tabNamesRef.current;
      if (tabNames2 !== undefined) {
        let tabNamesKeys: Dynamic = Object.keys(tabNames2);
        if (tabNamesKeys.length > 0 && !tabNamesKeys.some((item?: Dynamic, ..._extraArguments: unknown[]) => toLowerCase(item) === toLowerCase(match[2]))) {
          toast.info(DocumentRuntime_ThatTabHasBeenDeletedOrIsNoLongerAvailable, {
            id: `tab-deleted`
          });
          return {
            value: void 0
          };
        }
      }
      updateDataModelSchemasHerePath(ref, {
        sameTab: true
      });
      return {
        value: void 0
      };
    }
  }
  let entry: Dynamic = safeReferenceUrl(roomPageContext.data.ref);
  if (entry?.kind === `external`) {
    if (roomPageContext.roomDocumentPageResultRef.current) return {
      value: void 0
    };
    setOpenUrl2(entry.url);
  }
  return {
    value: void 0
  };
}
export function runRoomPage18DataVerbRun(roomPageContext: {
  containerRef: Dynamic;
  data: Dynamic;
  iframeRef: Dynamic;
  labelRef: Dynamic;
  reply: Dynamic;
  roomDocumentPageResultRef2: Dynamic;
  roomDocumentPageResultRef3: Dynamic;
  roomDocumentPageResultRef4: Dynamic;
}): Dynamic {
  let ref: Dynamic = typeof roomPageContext.data.ref == `string` ? roomPageContext.data.ref : ``;
  let params: Dynamic = roomPageContext.data.params && typeof roomPageContext.data.params == `object` ? roomPageContext.data.params : null;
  let userActivation: Dynamic = (navigator as Dynamic).userActivation;
  let iframe: Dynamic = roomPageContext.iframeRef.current;
  if (!iframe || !isCommentsStoreIsActive(roomPageContext.data.sig, roomPageContext.labelRef.current || null, (document as Dynamic).activeElement, iframe, userActivation)) {
    (0, roomPageContext.reply)({
      ok: false,
      error: `not-allowed`
    });
    return {
      value: void 0
    };
  }
  let roomDocumentPageResult36: Dynamic = params == null ? null : resolveEditorSelectionAndTablesValue2(params);
  if (params != null && roomDocumentPageResult36 === null) {
    (0, roomPageContext.reply)({
      ok: false,
      error: `not-allowed`
    });
    return {
      value: void 0
    };
  }
  let params2: Dynamic = roomDocumentPageResult36 === null ? null : JSON.parse(roomDocumentPageResult36);
  (async (..._extraArguments: unknown[]): Promise<Dynamic> => {
    if (!(await roomPageContext.roomDocumentPageResultRef2.current({
      ref: ref,
      params: params2
    }))) return (0, roomPageContext.reply)({
      ok: false,
      error: `not-allowed`
    });
    try {
      if (!roomPageContext.roomDocumentPageResultRef4.current) {
        (0, roomPageContext.reply)({
          ok: true,
          value: (await api.ldoc.run(roomPageContext.containerRef.current, ref, params2 ?? undefined)).runRef
        });
        return;
      }
      (0, roomPageContext.reply)({
        ok: true,
        value: (await PlatformLiveDocumentAndHistorySession.ldocRun(roomPageContext.roomDocumentPageResultRef3.current, ref, params2 ?? undefined, async (roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): Promise<Dynamic> => {
          let result: Dynamic = await PlatformLiveDocumentAndHistoryWidgetBundle.functionsList(roomPageContext.containerRef.current).then((result3?: Dynamic, ..._extraArguments: unknown[]): Dynamic => filterDataContentAndReferencesFilter(result3, roomDocumentPage2)).catch((..._extraArguments: unknown[]): Dynamic => roomDocumentPage2);
          if (result === undefined) return;
          let result2: Dynamic = await PlatformLiveDocumentAndHistoryWidgetBundle.functionsGet(roomPageContext.containerRef.current, result).catch((..._extraArguments: unknown[]): undefined => undefined);
          return result2?.id === undefined ? undefined : {
            id: result2.id,
            type: result2.config?.type,
            scheduleApproved: result2.scheduleApproved,
            consentLive: result2.consentLive,
            declaresParams: result2.declaresParams
          };
        })).runRef
      });
    } catch (roomDocumentPageResult37: Dynamic) {
      (console as Dynamic).error(`[ldoc bridge:run]`, roomDocumentPageResult37);
      (0, roomPageContext.reply)({
        ok: false,
        error: `run-failed`
      });
    }
  })();
  return {
    value: void 0
  };
}
export function runRoomPage19DataVerbEnumUpdate(roomPageContext: {
  data: Dynamic;
  iframeRef: Dynamic;
  labelRef: Dynamic;
  pidRef: Dynamic;
  roomDocumentPageHandler6: Dynamic;
}): Dynamic {
  let roomDocumentPageHandler7: Dynamic = (0, roomPageContext.roomDocumentPageHandler6)(roomPageContext.data.id);
  let roomDocumentPageHandler8: Dynamic = (roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomDocumentPageHandler7({
    ok: roomDocumentPage2
  });
  let iframe: Dynamic = roomPageContext.iframeRef.current;
  let userActivation: Dynamic = (navigator as Dynamic).userActivation;
  if (!iframe || !isCommentsStoreIsActive(roomPageContext.data.sig, roomPageContext.labelRef.current || null, (document as Dynamic).activeElement, iframe, userActivation)) return {
    value: roomDocumentPageHandler8(false)
  };
  let pid2: Dynamic = roomPageContext.pidRef.current;
  let enumId: Dynamic = typeof roomPageContext.data.enumId == `string` ? roomPageContext.data.enumId : ``;
  if (!pid2 || !/^[A-Za-z0-9][A-Za-z0-9-]{0,127}$/.test(enumId)) return {
    value: roomDocumentPageHandler8(false)
  };
  if (roomPageContext.data.op === `replace`) {
    let expectLen: Dynamic = typeof roomPageContext.data.expectLen == `number` && Number.isInteger(roomPageContext.data.expectLen) ? roomPageContext.data.expectLen : null;
    let value: Dynamic = roomPageContext.data.value;
    if (typeof value?.name != `string` || value.name.trim() === `` || !Array.isArray(value.options) || value.options.some((option?: Dynamic, ..._extraArguments: unknown[]): boolean => typeof option != `object` || !option || typeof option.name != `string` || option.name.trim() === `` || typeof option.order != `number` || option.disabled !== undefined && typeof option.disabled != `boolean`) || value.options.length > 100) return {
      value: roomDocumentPageHandler8(false)
    };
    let options2: Dynamic = value.options.map((option?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      let record4: Dynamic = {
        name: option.name.trim().slice(0, 120),
        order: option.order,
        disabled: option.disabled === true
      };
      if (typeof option.color == `string` && option.color.length <= 24) {
        record4.color = option.color;
      }
      return record4;
    });
    loadPlatformSessionAndSourcesAckOf(pid2, {
      verb: `read`,
      engine: `json`,
      ref: {
        object: `enum`,
        id: enumId
      },
      container: {
        kind: `project`,
        id: pid2
      },
      payload: {
        engine: `json`
      }
    }).then((response2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      let value2: Dynamic = response2.value;
      if (response2.verdict !== `allow` || !Array.isArray(value2?.options)) return roomDocumentPageHandler8(false);
      let roomDocumentPageResult36: Dynamic = reconcileEnumDefinition({
        name: value.name.trim().slice(0, 120),
        options: options2
      }, roomPageContext.data.base, value2, expectLen, roomPageContext.data.keepIndex === true);
      return roomDocumentPageResult36 === null || roomDocumentPageResult36.options.length > 100 ? roomDocumentPageHandler8(false) : loadPlatformSessionAndSourcesAckOf(pid2, {
        verb: `update`,
        engine: `json`,
        ref: {
          object: `enum`,
          id: enumId
        },
        container: {
          kind: `project`,
          id: pid2
        },
        payload: {
          engine: `json`,
          kind: `value`,
          value: roomDocumentPageResult36
        }
      }).then((response3?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomDocumentPageHandler8(response3.verdict === `allow`));
    }).catch((..._extraArguments: unknown[]): Dynamic => roomDocumentPageHandler8(false));
    return {
      value: void 0
    };
  }
  return {
    value: roomDocumentPageHandler8(false)
  };
}
export function runRoomPage20DataVerbEnumCreate(roomPageContext: {
  data: Dynamic;
  iframeRef: Dynamic;
  labelRef: Dynamic;
  pidRef: Dynamic;
  roomDocumentPageHandler6: Dynamic;
}): Dynamic {
  let roomDocumentPageHandler7: Dynamic = (0, roomPageContext.roomDocumentPageHandler6)(roomPageContext.data.id);
  let roomDocumentPageHandler8: Dynamic = (..._extraArguments: unknown[]): Dynamic => roomDocumentPageHandler7(null);
  let iframe: Dynamic = roomPageContext.iframeRef.current;
  let userActivation: Dynamic = (navigator as Dynamic).userActivation;
  if (!iframe || !isCommentsStoreIsActive(roomPageContext.data.sig, roomPageContext.labelRef.current || null, (document as Dynamic).activeElement, iframe, userActivation)) return {
    value: roomDocumentPageHandler8()
  };
  let pid2: Dynamic = roomPageContext.pidRef.current;
  let name: Dynamic = (typeof roomPageContext.data.name == `string` ? roomPageContext.data.name : ``).trim().slice(0, 120);
  let options2: Dynamic = Array.isArray(roomPageContext.data.options) ? roomPageContext.data.options : [];
  if (!pid2 || name === ``) return {
    value: roomDocumentPageHandler8()
  };
  let options3: Dynamic = options2.filter((option?: Dynamic, ..._extraArguments: unknown[]) => typeof option == `string`).map((filteredOption?: Dynamic, ..._extraArguments: unknown[]): Dynamic => filteredOption.trim().slice(0, 120)).filter((mappedFilteredOption?: Dynamic, ..._extraArguments: unknown[]) => mappedFilteredOption !== ``).slice(0, 100).map((name2?: Dynamic, order?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
    name: name2,
    order: order,
    disabled: false
  }));
  loadPlatformSessionAndSourcesAckOf(pid2, {
    verb: `create`,
    engine: `json`,
    object: `enum`,
    container: {
      kind: `project`,
      id: pid2
    },
    payload: {
      engine: `json`,
      value: {
        name: name,
        options: options3
      }
    }
  }).then((result?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let minted: Dynamic = result.minted;
    roomDocumentPageHandler7(typeof minted == `string` ? {
      id: minted
    } : null);
  }).catch(roomDocumentPageHandler8);
  return {
    value: void 0
  };
}
export function runRoomPage21DataVerbProjects(roomPageContext: {
  data: Dynamic;
  elementRef36: Dynamic;
  frameMessengerRef: Dynamic;
  navigatedRef: Dynamic;
  pidRef: Dynamic;
  win: Dynamic;
}): Dynamic {
  let qSlice: Dynamic = (typeof roomPageContext.data.q == `string` ? roomPageContext.data.q : ``).slice(0, 64);
  let send9 = (hits?: Dynamic, ..._extraArguments: unknown[]): undefined => {
    let win2: Dynamic = roomPageContext.win;
    if (!(!win2 || roomPageContext.navigatedRef.current)) {
      roomPageContext.frameMessengerRef.current.send(win2, {
        type: `bridge-reply`,
        id: roomPageContext.data.id,
        ok: true,
        value: {
          hits: hits
        }
      });
    }
  };
  (async (..._extraArguments: unknown[]): Promise<undefined> => {
    try {
      let [roomDocumentPageResult36, set]: Dynamic = await (roomPageContext.elementRef36.current ??= Promise.all([api.v3Directory({
        silent: true
      }).catch((..._extraArguments: unknown[]): Dynamic => []), api.v3DirectoryOrg({
        silent: true
      }).catch((..._extraArguments: unknown[]): Dynamic => [])]));
      let normalizedPid: Dynamic = roomPageContext.pidRef.current?.toLowerCase();
      send9(searchReferenceCandidates([...roomDocumentPageResult36, ...set].filter((item?: Dynamic, ..._extraArguments: unknown[]): boolean => normalizedPid === undefined || item.id.toLowerCase() !== normalizedPid).map((filteredItem?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
        id: filteredItem.id,
        label: filteredItem.name
      })), qSlice));
    } catch {
      send9([]);
    }
  })();
  return {
    value: void 0
  };
}
export function runRoomPage22DataVerbRef(roomPageContext: {
  data: Dynamic;
  fileIdRef: Dynamic;
  pidRef: Dynamic;
  readAck: Dynamic;
  roomDocumentPageHandler6: Dynamic;
}): Dynamic {
  let roomDocumentPageResult36: Dynamic = resolveCommentsActionsAndSelectionNoun(String(roomPageContext.data.ref ?? ``).slice(0, 512));
  let roomDocumentPageHandler7: Dynamic = (0, roomPageContext.roomDocumentPageHandler6)(roomPageContext.data.id);
  if (roomDocumentPageResult36 === null) {
    roomDocumentPageHandler7(null);
    return {
      value: void 0
    };
  }
  (async (..._extraArguments: unknown[]): Promise<undefined> => {
    try {
      let roomDocumentPageResult37: Dynamic = referenceContainer(roomDocumentPageResult36, roomPageContext.pidRef.current);
      if (roomDocumentPageResult37 === null) {
        roomDocumentPageHandler7(null);
        return;
      }
      let ack: Dynamic = await (0, roomPageContext.readAck)(roomDocumentPageResult37);
      if (ack.verdict !== `allow` || ack.value === undefined) {
        roomDocumentPageHandler7({
          restricted: true
        });
        return;
      }
      if (roomDocumentPageResult36.noun === `file`) {
        let roomDocumentPageResult38: Dynamic = fileReferenceLabel(ack.value, roomDocumentPageResult36.id);
        let label2: Dynamic = roomDocumentPageResult38 !== null && roomDocumentPageResult38.parentTab !== undefined && roomDocumentPageResult36.id !== roomPageContext.fileIdRef.current ? `${roomDocumentPageResult38.parentTab} \u00b7 ${roomDocumentPageResult38.tab}` : roomDocumentPageResult38?.tab;
        roomDocumentPageHandler7(roomDocumentPageResult38 && label2 !== undefined ? {
          label: label2,
          parent: roomDocumentPageResult38.project
        } : {
          restricted: true
        });
        return;
      }
      if (roomDocumentPageResult36.noun !== `project`) {
        roomDocumentPageHandler7(null);
        return;
      }
      roomDocumentPageHandler7({
        label: projectName(ack.value),
        fileCount: updatePlatformSyncAndRoutingDirectory(ack.value).size
      });
    } catch (roomDocumentPageResult37: Dynamic) {
      roomDocumentPageHandler7(isRestrictedResponse(roomDocumentPageResult37) ? {
        restricted: true
      } : null);
    }
  })();
  return {
    value: void 0
  };
}
export function runRoomPage23DataVerbObjects(roomPageContext: {
  containerRef: Dynamic;
  data: Dynamic;
  elementRef35: Dynamic;
  frameMessengerRef: Dynamic;
  iframeRef: Dynamic;
  navigatedRef: Dynamic;
  objectFilesRef: Dynamic;
  pidRef: Dynamic;
  win: Dynamic;
}): Dynamic {
  let normalizedQSlice: Dynamic = (typeof roomPageContext.data.q == `string` ? roomPageContext.data.q : ``).slice(0, 64).toLowerCase();
  let send9: Dynamic = (roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => roomPageContext.frameMessengerRef.current.send(roomPageContext.win, {
    type: `bridge-reply`,
    id: roomPageContext.data.id,
    ok: true,
    value: roomDocumentPage2
  });
  if (DocumentRuntimeState6) {
    send9({
      hits: [],
      priming: false
    });
    return {
      value: void 0
    };
  }
  let pid2: Dynamic = roomPageContext.pidRef.current;
  let key2: string = pid2 ? `room:${pid2}` : `v1:${roomPageContext.containerRef.current}`;
  let element4: Dynamic = roomPageContext.elementRef35.current;
  if (!element4 || element4.key !== key2) {
    element4 = {
      key: key2,
      fns: null,
      tables: null,
      loading: false
    };
    roomPageContext.elementRef35.current = element4;
  }
  if (!element4.loading && (element4.fns === null || element4.tables === null)) {
    let element5: Dynamic = element4;
    element5.loading = true;
    (async (..._extraArguments: unknown[]): Promise<undefined> => {
      let then: Dynamic = pid2 ? rawReq(`GET`, `/api/v3/project/${encodeURIComponent(pid2)}/routines`).then(async (response2?: Dynamic, ..._extraArguments: unknown[]): Promise<Dynamic> => {
        if (!response2.ok) return null;
        let json: Dynamic = await response2.json();
        return Array.isArray(json) ? json : json.rows;
      }) : api.functions.list(roomPageContext.containerRef.current);
      let then2: Dynamic = pid2 ? rawReq(`GET`, `/api/v3/project/${encodeURIComponent(pid2)}/tables`).then(async (response2?: Dynamic, ..._extraArguments: unknown[]): Promise<Dynamic> => response2.ok ? await response2.json() : null) : api.tables.list(roomPageContext.containerRef.current);
      let [all, setAll]: Dynamic = await Promise.all([then.catch((..._extraArguments: unknown[]) => null), then2.catch((..._extraArguments: unknown[]) => null)]);
      if (roomPageContext.elementRef35.current !== element5) return;
      element5.loading = false;
      let matchesFns: boolean = element5.fns === null && all !== null || element5.tables === null && setAll !== null;
      element5.fns = all ?? element5.fns;
      element5.tables = setAll ?? element5.tables;
      if (!matchesFns) return;
      let contentWindow: Dynamic = roomPageContext.iframeRef.current?.contentWindow;
      if (!(!contentWindow || roomPageContext.navigatedRef.current)) {
        roomPageContext.frameMessengerRef.current.send(contentWindow, {
          type: `objects-settled`
        });
      }
    })();
  }
  let toLowerCase: Dynamic = (roomDocumentPage2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => !normalizedQSlice || (roomDocumentPage2 ?? ``).toLowerCase().includes(normalizedQSlice);
  let mappedFilteredObjectFilesSlice: Dynamic = (roomPageContext.objectFilesRef.current ?? useContainerStore.getState().entries).filter((objectFile?: Dynamic, ..._extraArguments: unknown[]): Dynamic => objectFile.path && toLowerCase(objectFile.path)).slice(0, 6).map((filteredObjectFilesSlice?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
    let lastIndexOf: Dynamic = filteredObjectFilesSlice.path.lastIndexOf(`/`);
    let pid3: Dynamic = roomPageContext.pidRef.current;
    let pageId: Dynamic = filteredObjectFilesSlice.pageId;
    let record4: Dynamic = {
      kind: `file`,
      label: lastIndexOf >= 0 ? filteredObjectFilesSlice.path.slice(lastIndexOf + 1) : filteredObjectFilesSlice.path,
      href: pid3 && pageId ? `${location.origin}/project/${encodeURIComponent(pid3)}/file/${encodeURIComponent(pageId)}` : `claude://file/${filteredObjectFilesSlice.path.split(`/`).map(encodeURIComponent).join(`/`)}`
    };
    if (lastIndexOf >= 0) {
      record4.hint = filteredObjectFilesSlice.path.slice(0, lastIndexOf);
    }
    return record4;
  });
  let mappedFilteredFnsSlice: Dynamic = (element4.fns ?? []).filter((fn2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => fn2.name !== `main` && (toLowerCase(fn2.name) || toLowerCase(fn2.label))).slice(0, 6).map((filteredFnsSlice?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
    kind: `routine`,
    label: filteredFnsSlice.label ?? filteredFnsSlice.name,
    href: `claude://fn/${encodeURIComponent(filteredFnsSlice.name)}`
  }));
  let mappedFilteredTablesSlice: Dynamic = (element4.tables ?? []).filter((table?: Dynamic, ..._extraArguments: unknown[]): Dynamic => toLowerCase(table.name) || toLowerCase(table.path)).slice(0, 6).map((filteredTablesSlice?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
    kind: `table`,
    label: filteredTablesSlice.name || filteredTablesSlice.path,
    href: `claude://db/${encodeURIComponent(filteredTablesSlice.name || filteredTablesSlice.path)}`
  }));
  let enabled6: boolean = !!roomPageContext.pidRef.current;
  send9({
    hits: enabled6 ? mappedFilteredObjectFilesSlice : [...mappedFilteredObjectFilesSlice, ...mappedFilteredFnsSlice, ...mappedFilteredTablesSlice],
    priming: !enabled6 && (element4.fns === null || element4.tables === null)
  });
  return {
    value: void 0
  };
}
