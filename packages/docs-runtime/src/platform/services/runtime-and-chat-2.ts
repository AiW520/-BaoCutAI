/** BaoCut: platform runtime and chat from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  Awareness,
  Doc,
  applyAwarenessUpdate,
  applyUpdate,
  create,
  createDecoder,
  createEncoder,
  encodeAwarenessUpdate,
  encodeStateAsUpdate,
  encodeStateVectorFromUpdate,
  length,
  peekVarUint,
  preloadModule,
  readVarUint,
  readVarUint8Array,
  toUint8Array,
  writeVarUint,
  writeVarUint8Array,
} from "../dependencies";
import {
  TELEMETRY_ATTRIBUTE_NAMES,
  isObservabilityTelemetryValue,
  withWebSpan,
} from "../observability/telemetry-1";
import {
  okJson,
  rawReq,
  serverRev,
} from "./api-and-auth-1";
import {
  clearPlatformApiAndAuthDelete3,
  isPlatformApiAndAuthHandoff,
  resolvePlatformApiAndAuthState5,
} from "./api-and-auth-2";
import {
  resolvePlatformApiAndAuthValue34,
} from "./api-and-auth-5";
import {
  PlatformApiAndAuthUser,
} from "./api-and-auth-6";
import {
  CommentsStoreANCHORGONECARDWORDS,
} from "../../comments/store/store-2";
import {
  PlatformRuntimeAndChatIframe,
  PlatformRuntimeAndChatState6,
  PlatformRuntimeAndChatState7,
  PlatformRuntimeAndChatState8,
  clearPlatformRuntimeAndChatIndexOf,
  forceClientReload,
  hasAuxDraft,
  isPlatformRuntimeAndChatContainer,
  isPlatformRuntimeAndChatValues,
  loadPlatformRuntimeAndChatValue3,
  platformRuntimeAndChatMap2,
  platformRuntimeAndChatMap3,
  platformRuntimeAndChatMap4,
  platformRuntimeAndChatMap5,
  platformRuntimeAndChatMap6,
  platformRuntimeAndChatMap7,
  platformRuntimeAndChatPattern2,
  platformRuntimeAndChatSet2,
  platformRuntimeAndChatValue03,
  platformRuntimeAndChatValue1,
  platformRuntimeAndChatValue10000,
  platformRuntimeAndChatValue100002,
  platformRuntimeAndChatValue1500,
  platformRuntimeAndChatValue150002,
  platformRuntimeAndChatValue300002,
  platformRuntimeAndChatValue5000,
  platformRuntimeAndChatValue50002,
  platformRuntimeAndChatValue50003,
  platformRuntimeAndChatValue50004,
  platformRuntimeAndChatValue600002,
  platformRuntimeAndChatValue8,
  resolvePlatformRuntimeAndChatAnon,
  resolvePlatformRuntimeAndChatAnon2,
  resolvePlatformRuntimeAndChatGapMs,
  resolvePlatformRuntimeAndChatRemoveItem,
  resolvePlatformRuntimeAndChatUnknownMessageType,
  resolvePlatformRuntimeAndChatUserId,
  resolvePlatformRuntimeAndChatValue,
  resolvePlatformRuntimeAndChatValue4,
  resolvePlatformRuntimeAndChatValue7,
  resolvePlatformRuntimeAndChatValue8,
  resolvePlatformRuntimeAndChatValues2,
  updatePlatformRuntimeAndChatByPath,
  wsInstance,
} from "./runtime-and-chat-1";

var PlatformRuntimeAndChatByPath: Dynamic;

function isPlatformRuntimeAndChatReconnecting(..._extraArguments: unknown[]) {
  return Object.values(PlatformRuntimeAndChatByPath.getState().byPath).some(
    (byPathValue?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      !byPathValue.detached &&
      !byPathValue.readonly &&
      byPathValue.rt.pendingEdits() > 0 &&
      (byPathValue.synced ||
        byPathValue.state === `reconnecting` ||
        byPathValue.state === `draining`),
  );
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializePlatformRuntimeAndChat2Step1(): void {
  (PlatformRuntimeAndChatByPath = create(
    (
      platformRuntimeAndChatByPath?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      byPath: {},
      connect(
        container?: Dynamic,
        path?: Dynamic,
        tab?: Dynamic,
        dependencies?: Dynamic,
        argument?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic {
        let label: Dynamic = tab ? `${path}#${tab}` : path;
        let byPathItem: Dynamic = options().byPath[label];
        if (byPathItem && byPathItem.container === container) {
          let matchesRefs = byPathItem.refs === 0;
          byPathItem.refs++;
          let matchesArgument = argument === true && !byPathItem.content;
          if (matchesArgument) {
            byPathItem.content = true;
          }
          if (dependencies === false && byPathItem.readonly) {
            byPathItem.readonly = false;
            let platformRuntimeAndChatMap6Entry2: Dynamic =
              platformRuntimeAndChatMap6.get(
                resolvePlatformRuntimeAndChatValue8(container, label),
              );
            if (platformRuntimeAndChatMap6Entry2) {
              platformRuntimeAndChatMap6.delete(
                resolvePlatformRuntimeAndChatValue8(container, label),
              );
              applyUpdate(byPathItem.ydoc, platformRuntimeAndChatMap6Entry2.u);
            }
            platformRuntimeAndChatByPath(
              (
                platformRuntimeAndChatByPath2?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => ({
                byPath: {
                  ...platformRuntimeAndChatByPath2.byPath,
                  [label]: {
                    ...byPathItem,
                  },
                },
              }),
            );
            return options().byPath[label];
          } else if (
            dependencies === true &&
            !byPathItem.readonly &&
            matchesRefs
          ) {
            byPathItem.readonly = true;
            platformRuntimeAndChatByPath(
              (
                platformRuntimeAndChatByPath2?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => ({
                byPath: {
                  ...platformRuntimeAndChatByPath2.byPath,
                  [label]: {
                    ...byPathItem,
                  },
                },
              }),
            );
            return options().byPath[label];
          }
          platformRuntimeAndChatByPath(
            (
              platformRuntimeAndChatByPath2?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => ({
              byPath: matchesArgument
                ? {
                    ...platformRuntimeAndChatByPath2.byPath,
                    [label]: {
                      ...byPathItem,
                    },
                  }
                : {
                    ...platformRuntimeAndChatByPath2.byPath,
                  },
            }),
          );
          return options().byPath[label];
        }
        if (byPathItem) {
          byPathItem.detached = true;
          byPathItem.unhook();
          byPathItem.awareness.destroy();
          byPathItem.ydoc.destroy();
          byPathItem.rt.close();
        }
        let ydoc: Dynamic = new (Doc as Dynamic)();
        let awareness: Dynamic = new (Awareness as Dynamic)(ydoc);
        let onUpdate: Dynamic = new (Set as Dynamic)();
        let onAwareness: Dynamic = new (Set as Dynamic)();
        let synced = false;
        let enabled = false;
        let uniqueItems: Dynamic = new (Set as Dynamic)();
        let join = (items?: Dynamic, ..._extraArguments: unknown[]) =>
          `${items.length}:${items.subarray(0, 16).join(`,`)}:${items.subarray(-8).join(`,`)}`;
        let enabled2 = false;
        let now = Date.now();
        let index = 0;
        let enabled3 = false;
        let index2 = 0;
        let enabled4 = false;
        let platformRuntimeAndChatByPathResult: Dynamic;
        let record2: Dynamic = {
          bornAt: Date.now(),
          notOpenSince: undefined,
          awaiting: null,
          probeSentAt: 0,
          probeSig: undefined,
          beltReplySig: undefined,
          lastLocalEditAt: 0,
          running: false,
          lastStaleAt: 0,
        };
        let options2: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
          options().byPath[label]?.readonly ?? dependencies === true;
        let room =
          resolvePlatformApiAndAuthValue34(container, path) +
          (tab ? `#${tab}` : ``);
        let isPlatformApiAndAuthHandoff2: Dynamic = isPlatformApiAndAuthHandoff(
          resolvePlatformRuntimeAndChatAnon2(room),
          (
            platformRuntimeAndChatByPath2?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (platformRuntimeAndChatByPath2.t === `comment-changed`) {
              preloadModule(
                (..._extraArguments: unknown[]): Dynamic =>
                  Promise.resolve()
                    .then(
                      (..._extraArguments: unknown[]): Dynamic =>
                        CommentsStoreANCHORGONECARDWORDS,
                    )
                    .then(
                      (
                        result?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): Dynamic =>
                        result.useCommentStore
                          .getState()
                          .refetch(
                            container,
                            platformRuntimeAndChatByPath2.pageId,
                          ),
                    ),
                undefined,
                import.meta.url,
              );
            } else {
              if (platformRuntimeAndChatByPath2.t === `comment-status`) {
                preloadModule(
                  (..._extraArguments: unknown[]): Dynamic =>
                    Promise.resolve()
                      .then(
                        (..._extraArguments: unknown[]): Dynamic =>
                          CommentsStoreANCHORGONECARDWORDS,
                      )
                      .then(
                        (
                          result?: Dynamic,
                          ..._extraArguments: unknown[]
                        ): Dynamic =>
                          result.useCommentStore
                            .getState()
                            .setWorking(
                              platformRuntimeAndChatByPath2.rootId,
                              platformRuntimeAndChatByPath2.state === `done`
                                ? null
                                : (platformRuntimeAndChatByPath2.text ??
                                    `Working…`),
                            ),
                      ),
                  undefined,
                  import.meta.url,
                );
              }
            }
          },
          (
            state?: Dynamic,
            options3?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            now = Date.now();
            clearTimeout(platformRuntimeAndChatByPathResult);
            platformRuntimeAndChatByPathResult = undefined;
            let handoffGrace: boolean =
              state === `reconnecting` && !!options3?.handoff;
            platformRuntimeAndChatByPath(
              (
                platformRuntimeAndChatByPath2?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => {
                if (enabled2) return platformRuntimeAndChatByPath2;
                let byPathItem2: Dynamic =
                  platformRuntimeAndChatByPath2.byPath[label];
                return byPathItem2
                  ? {
                      byPath: {
                        ...platformRuntimeAndChatByPath2.byPath,
                        [label]: {
                          ...byPathItem2,
                          state: state,
                          handoffGrace: handoffGrace,
                        },
                      },
                    }
                  : platformRuntimeAndChatByPath2;
              },
            );
            if (state !== `open`) {
              if (synced) {
                record2.notOpenSince ??= Date.now();
              }
              if (state === `reconnecting` || state === `closed`) {
                if (record2.probeSig !== undefined) {
                  uniqueItems.delete(record2.probeSig);
                }
                if (record2.beltReplySig !== undefined) {
                  uniqueItems.delete(record2.beltReplySig);
                }
                record2.probeSig = record2.beltReplySig = undefined;
                record2.probeSentAt = 0;
              }
            } else {
              let count: number =
                record2.notOpenSince === undefined
                  ? 0
                  : Date.now() - record2.notOpenSince;
              record2.notOpenSince = undefined;
              if (synced && count > resolvePlatformRuntimeAndChatGapMs()) {
                platformRuntimeAndChatByPathHandler(`reconnect`, count);
              }
            }
            if (handoffGrace) {
              platformRuntimeAndChatByPathResult = setTimeout(
                (..._extraArguments: unknown[]): Dynamic =>
                  platformRuntimeAndChatByPath(
                    (
                      platformRuntimeAndChatByPath2?: Dynamic,
                      ..._extraArguments: unknown[]
                    ): Dynamic => {
                      if (enabled2) return platformRuntimeAndChatByPath2;
                      let byPathItem2: Dynamic =
                        platformRuntimeAndChatByPath2.byPath[label];
                      return byPathItem2
                        ? {
                            byPath: {
                              ...platformRuntimeAndChatByPath2.byPath,
                              [label]: {
                                ...byPathItem2,
                                handoffGrace: false,
                              },
                            },
                          }
                        : platformRuntimeAndChatByPath2;
                    },
                  ),
                5e3,
              );
            }
          },
          {
            isEdit: resolvePlatformRuntimeAndChatValue7,
            onReplayed: (..._extraArguments: unknown[]): undefined => {
              if (!enabled2 && record2.awaiting) {
                platformRuntimeAndChatByPathHandler2();
              }
            },
          },
        );
        isPlatformApiAndAuthHandoff2.onMessage(
          (
            platformRuntimeAndChatByPath2?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (enabled2) return;
            let uint8Array: Dynamic =
              platformRuntimeAndChatByPath2 instanceof (ArrayBuffer as Dynamic)
                ? new (Uint8Array as Dynamic)(platformRuntimeAndChatByPath2)
                : platformRuntimeAndChatByPath2 instanceof (Uint8Array as Dynamic)
                  ? platformRuntimeAndChatByPath2
                  : null;
            if (!uint8Array) return;
            let decoder: Dynamic = createDecoder(uint8Array);
            let varUint: Dynamic = readVarUint(decoder);
            if (varUint === platformRuntimeAndChatValue03) {
              let peekVarUint2: Dynamic = peekVarUint(decoder);
              if (uniqueItems.delete(join(uint8Array))) {
                if (peekVarUint2 === 0) {
                  record2.probeSig = undefined;
                }
                return;
              }
              let encoder: Dynamic = createEncoder();
              writeVarUint(encoder, platformRuntimeAndChatValue03);
              resolvePlatformRuntimeAndChatUnknownMessageType(
                decoder,
                encoder,
                ydoc,
                PlatformRuntimeAndChatState8,
              );
              if (length(encoder) > 1 && !options2()) {
                let toUint8Array2: Dynamic = toUint8Array(encoder);
                if (
                  peekVarUint2 === 0 &&
                  record2.probeSig !== undefined &&
                  join(uint8Array) === record2.probeSig &&
                  Date.now() - record2.probeSentAt <
                    platformRuntimeAndChatValue100002
                ) {
                  if (isPlatformApiAndAuthHandoff2.sendVolatile(toUint8Array2)) {
                    uniqueItems.add((record2.beltReplySig = join(toUint8Array2)));
                  }
                } else {
                  uniqueItems.add(join(toUint8Array2));
                  isPlatformApiAndAuthHandoff2.send(toUint8Array2);
                }
              }
              if (
                record2.awaiting &&
                record2.probeSentAt > 0 &&
                peekVarUint2 === 1
              ) {
                platformRuntimeAndChatByPathHandler2();
              }
              if (!synced) {
                synced = true;
                platformRuntimeAndChatByPath(
                  (
                    platformRuntimeAndChatByPath3?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): Dynamic => {
                    let byPathItem2: Dynamic =
                      platformRuntimeAndChatByPath3.byPath[label];
                    return byPathItem2
                      ? {
                          byPath: {
                            ...platformRuntimeAndChatByPath3.byPath,
                            [label]: {
                              ...byPathItem2,
                              synced: true,
                            },
                          },
                        }
                      : platformRuntimeAndChatByPath3;
                  },
                );
                let encodeStateAsUpdate2: Dynamic = encodeStateAsUpdate(ydoc);
                for (let platformRuntimeAndChatByPathResult2 of onUpdate as Dynamic)
                  platformRuntimeAndChatByPathResult2(encodeStateAsUpdate2);
                if (enabled && !options2()) {
                  let encoder2: Dynamic = createEncoder();
                  writeVarUint(encoder2, platformRuntimeAndChatValue03);
                  resolvePlatformRuntimeAndChatValue4(
                    encoder2,
                    encodeStateAsUpdate2,
                  );
                  let toUint8Array2: Dynamic = toUint8Array(encoder2);
                  uniqueItems.add(join(toUint8Array2));
                  isPlatformApiAndAuthHandoff2.send(toUint8Array2);
                }
              }
            } else if (varUint === platformRuntimeAndChatValue1) {
              applyAwarenessUpdate(
                awareness,
                readVarUint8Array(decoder),
                PlatformRuntimeAndChatState8,
              );
            }
          },
        );
        let send = (
          platformRuntimeAndChatByPath2?: Dynamic,
          options3?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (options3 === PlatformRuntimeAndChatIframe) {
            record2.lastLocalEditAt = Date.now();
          }
          if (options3 !== PlatformRuntimeAndChatState8 && !options2()) {
            if (!synced) {
              enabled = true;
            }
            let encoder: Dynamic = createEncoder();
            writeVarUint(encoder, platformRuntimeAndChatValue03);
            resolvePlatformRuntimeAndChatValue4(
              encoder,
              platformRuntimeAndChatByPath2,
            );
            let toUint8Array2: Dynamic = toUint8Array(encoder);
            uniqueItems.add(join(toUint8Array2));
            isPlatformApiAndAuthHandoff2.send(toUint8Array2);
          }
          if (options3 !== PlatformRuntimeAndChatIframe)
            for (let platformRuntimeAndChatByPathResult2 of onUpdate as Dynamic)
              platformRuntimeAndChatByPathResult2(platformRuntimeAndChatByPath2);
        };
        ydoc.on(`update`, send);
        let send2 = (
          { added: added, updated: updated, removed: removed }: Dynamic,
          options3?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          let items: Dynamic = [...added, ...updated, ...removed];
          if (items.length === 0) return;
          let encodeAwarenessUpdate2: Dynamic = encodeAwarenessUpdate(
            awareness,
            items,
          );
          if (options3 !== PlatformRuntimeAndChatState8 && !options2()) {
            let encoder: Dynamic = createEncoder();
            writeVarUint(encoder, platformRuntimeAndChatValue1);
            writeVarUint8Array(encoder, encodeAwarenessUpdate2);
            isPlatformApiAndAuthHandoff2.send(toUint8Array(encoder));
          }
          if (options3 !== PlatformRuntimeAndChatIframe)
            for (let platformRuntimeAndChatByPathResult2 of onAwareness as Dynamic)
              platformRuntimeAndChatByPathResult2(encodeAwarenessUpdate2);
        };
        awareness.on(`update`, send2);
        let onSpan = async (
          ..._extraArguments: unknown[]
        ): Promise<undefined> => {
          if (enabled2) return;
          let byPathItem2: Dynamic = options().byPath[label];
          if (!byPathItem2 || byPathItem2.readonly) {
            index = 0;
            index2 = 0;
            return;
          }
          if (byPathItem2.state !== `open`) {
            index2++;
            if (index2 >= 4 && !enabled4) {
              enabled4 = true;
              let platformApiAndAuthState52: Dynamic =
                resolvePlatformApiAndAuthState5();
              let record4: Dynamic = {
                [TELEMETRY_ATTRIBUTE_NAMES.container]: container,
                [TELEMETRY_ATTRIBUTE_NAMES.roomPath]: room,
                [TELEMETRY_ATTRIBUTE_NAMES.userId]:
                  PlatformApiAndAuthUser.getState().user?.id ?? `anon`,
                [TELEMETRY_ATTRIBUTE_NAMES.roomState]: byPathItem2.state,
                [TELEMETRY_ATTRIBUTE_NAMES.muxState]:
                  platformApiAndAuthState52.state,
                [TELEMETRY_ATTRIBUTE_NAMES.wsAttempt]:
                  platformApiAndAuthState52.attempt,
                [TELEMETRY_ATTRIBUTE_NAMES.wsReadyState]:
                  platformApiAndAuthState52.readyState,
                [TELEMETRY_ATTRIBUTE_NAMES.roomLastMsgAgoMs]:
                  platformApiAndAuthState52.lastRecvAgoMs,
                [TELEMETRY_ATTRIBUTE_NAMES.netOnline]:
                  platformApiAndAuthState52.online,
              };
              PlatformRuntimeAndChatState6.onSpan?.(
                `ldoc.reconnect_stuck`,
                record4,
              );
              withWebSpan(
                `ldoc.reconnect_stuck`,
                record4,
                (..._extraArguments: unknown[]): undefined => {},
                `ldoc.reconnect_stuck`,
              );
            }
          } else {
            index2 = 0;
            enabled4 = false;
          }
          if (
            byPathItem2.state !== `open` ||
            isPlatformApiAndAuthHandoff2.pendingEdits() > 0 ||
            Date.now() - now <
              (PlatformRuntimeAndChatState6.settleMs ??
                platformRuntimeAndChatValue5000)
          ) {
            index = 0;
            return;
          }
          let platformRuntimeAndChatByPathResult2: Dynamic;
          let label2: string = ``;
          let label3: string = ``;
          let enabled5: boolean = false;
          try {
            if (PlatformRuntimeAndChatState6.probe)
              platformRuntimeAndChatByPathResult2 =
                await PlatformRuntimeAndChatState6.probe(container, path, tab);
            else {
              let okJson2: Dynamic = await okJson(
                await rawReq(
                  `GET`,
                  `/api/ldoc/sv?${new URLSearchParams({
                    container: container,
                    path: path,
                    ...(tab
                      ? {
                          tab: tab,
                        }
                      : {}),
                  })}`,
                ),
              );
              platformRuntimeAndChatByPathResult2 = Uint8Array.from(
                atob(okJson2.sv),
                (
                  platformRuntimeAndChatByPath2?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => platformRuntimeAndChatByPath2.charCodeAt(0),
              );
              label2 = okJson2.rev ?? ``;
              label3 = okJson2.instance ?? ``;
              enabled5 = okJson2.live ?? false;
            }
          } catch {
            index = 0;
            return;
          }
          if (enabled2) return;
          let encodeStateAsUpdate2: Dynamic = encodeStateAsUpdate(
            ydoc,
            platformRuntimeAndChatByPathResult2,
          );
          if (encodeStateAsUpdate2.byteLength > platformRuntimeAndChatValue8) {
            index++;
            if (index >= 2 && !enabled3) {
              enabled3 = true;
              let count: number = 0;
              let enabled6 = false;
              try {
                let decoder: Dynamic = createDecoder(
                  encodeStateVectorFromUpdate(encodeStateAsUpdate2),
                );
                count = readVarUint(decoder);
                for (let index3 = 0; index3 < count; index3++) {
                  let varUint: Dynamic = readVarUint(decoder);
                  readVarUint(decoder);
                  if (varUint === ydoc.clientID) {
                    enabled6 = true;
                  }
                }
              } catch {}
              let record4: Dynamic = {
                [TELEMETRY_ATTRIBUTE_NAMES.container]: container,
                [TELEMETRY_ATTRIBUTE_NAMES.roomPath]: room,
                [TELEMETRY_ATTRIBUTE_NAMES.userId]:
                  PlatformApiAndAuthUser.getState().user?.id ?? `anon`,
                [TELEMETRY_ATTRIBUTE_NAMES.ldocDiffBytes]:
                  encodeStateAsUpdate2.byteLength,
                [TELEMETRY_ATTRIBUTE_NAMES.ldocDiffClients]: count,
                [TELEMETRY_ATTRIBUTE_NAMES.ldocDiffOwn]: enabled6,
                [TELEMETRY_ATTRIBUTE_NAMES.wsInstance]: wsInstance(),
                [TELEMETRY_ATTRIBUTE_NAMES.svRev]: label2,
                [TELEMETRY_ATTRIBUTE_NAMES.svInstance]: label3,
                [TELEMETRY_ATTRIBUTE_NAMES.svLive]: enabled5,
                [TELEMETRY_ATTRIBUTE_NAMES.clientRev]: serverRev() ?? ``,
              };
              PlatformRuntimeAndChatState6.onSpan?.(`ldoc.diverged`, record4);
              withWebSpan(
                `ldoc.diverged`,
                record4,
                (..._extraArguments: unknown[]): undefined => {},
                `ldoc.diverged`,
              );
            }
          } else {
            index = 0;
            enabled3 = false;
          }
        };
        let setInterval2 = setInterval(
          (..._extraArguments: unknown[]): undefined => void onSpan(),
          platformRuntimeAndChatValue300002,
        );
        platformRuntimeAndChatMap2.set(label, onSpan);
        function platformRuntimeAndChatByPathHandler(
          reason?: Dynamic,
          options3?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined {
          if (
            enabled2 ||
            options2() ||
            options().byPath[label]?.content !== true ||
            !synced
          )
            return;
          let awayMs: number = Math.min(options3, Date.now() - record2.bornAt);
          if (
            !(awayMs <= resolvePlatformRuntimeAndChatGapMs()) &&
            ((record2.awaiting ??= {
              reason: reason,
              awayMs: awayMs,
            }),
            reason !== `reconnect` &&
              record2.probeSentAt === 0 &&
              options().byPath[label]?.state === `open`)
          ) {
            let encoder: Dynamic = createEncoder();
            writeVarUint(encoder, platformRuntimeAndChatValue03);
            resolvePlatformRuntimeAndChatValue(encoder, ydoc);
            let toUint8Array2: Dynamic = toUint8Array(encoder);
            if (isPlatformApiAndAuthHandoff2.sendVolatile(toUint8Array2)) {
              record2.probeSig = join(toUint8Array2);
              uniqueItems.add(record2.probeSig);
              record2.probeSentAt = Date.now();
            }
          }
        }
        platformRuntimeAndChatMap3.set(
          label,
          platformRuntimeAndChatByPathHandler,
        );
        platformRuntimeAndChatMap5.set(
          label,
          (..._extraArguments: unknown[]): Dynamic => record2.lastLocalEditAt,
        );
        platformRuntimeAndChatMap4.set(
          label,
          (
            platformRuntimeAndChatByPath2?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (enabled2) return;
            let now2: number = Date.now();
            if (now2 - record2.lastStaleAt < platformRuntimeAndChatValue50004)
              return;
            record2.lastStaleAt = now2;
            let record4: Dynamic = {
              [TELEMETRY_ATTRIBUTE_NAMES.container]: container,
              [TELEMETRY_ATTRIBUTE_NAMES.roomPath]: room,
              [TELEMETRY_ATTRIBUTE_NAMES.userId]:
                PlatformApiAndAuthUser.getState().user?.id ?? `anon`,
              [TELEMETRY_ATTRIBUTE_NAMES.ldocStaleReason]:
                platformRuntimeAndChatSet2.has(platformRuntimeAndChatByPath2)
                  ? platformRuntimeAndChatByPath2
                  : `other`,
              [TELEMETRY_ATTRIBUTE_NAMES.roomState]:
                options().byPath[label]?.state ?? `unknown`,
              [TELEMETRY_ATTRIBUTE_NAMES.clientBuild]:
                PlatformRuntimeAndChatState7.clientBuild ??
                `259dc54003a391cffb50b52b94c913ed15d92d1c`,
            };
            PlatformRuntimeAndChatState6.onSpan?.(`ldoc.stale`, record4);
            withWebSpan(
              `ldoc.stale`,
              record4,
              (..._extraArguments: unknown[]): undefined => {},
              `ldoc.stale`,
            );
            record2.awaiting ??= {
              reason: `stale`,
              awayMs: 0,
            };
            platformRuntimeAndChatByPathHandler2();
          },
        );
        let pendingEdits: Dynamic = (..._extraArguments: unknown[]) =>
          isPlatformApiAndAuthHandoff2.pendingEdits() === 0 &&
          !isPlatformRuntimeAndChatReconnecting();
        let hostDraft: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
          (PlatformRuntimeAndChatState7.hostDraft ?? hasAuxDraft)();
        let hostDraft2: Dynamic = (
          platformRuntimeAndChatByPath2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          isPlatformRuntimeAndChatValues(platformRuntimeAndChatByPath2) &&
          pendingEdits() &&
          !hostDraft();
        async function platformRuntimeAndChatByPathHandler2(
          ..._extraArguments: unknown[]
        ): Promise<undefined> {
          let awaiting: Dynamic = record2.awaiting;
          if (!(!awaiting || record2.running || enabled2)) {
            record2.awaiting = null;
            record2.probeSentAt = 0;
            if (record2.probeSig !== undefined) {
              uniqueItems.delete(record2.probeSig);
            }
            record2.probeSig = undefined;
            record2.running = true;
            try {
              let label2: string = ``;
              try {
                let platformRuntimeAndChatByPathResult2: Dynamic;
                let promise: Dynamic = new (Promise as Dynamic)(
                  (
                    resolve?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): undefined => {
                    platformRuntimeAndChatByPathResult2 = setTimeout(
                      (..._extraArguments: unknown[]): Dynamic => resolve({}),
                      platformRuntimeAndChatValue50002,
                    );
                  },
                );
                try {
                  let updateCheck: Dynamic = (
                    PlatformRuntimeAndChatState7.updateCheck ??
                    loadPlatformRuntimeAndChatValue3
                  )();
                  label2 =
                    (await Promise.race([updateCheck, promise])).build ?? ``;
                } finally {
                  clearTimeout(platformRuntimeAndChatByPathResult2);
                }
              } catch {}
              let isObservabilityTelemetryValue4 = isObservabilityTelemetryValue(
                label2,
                PlatformRuntimeAndChatState7.clientBuild ??
                  `259dc54003a391cffb50b52b94c913ed15d92d1c`,
              );
              let idleMs: Dynamic =
                PlatformRuntimeAndChatState7.idleMs ??
                platformRuntimeAndChatValue1500;
              let maxWaitMs: Dynamic =
                PlatformRuntimeAndChatState7.maxWaitMs ??
                platformRuntimeAndChatValue10000;
              let now2 = Date.now();
              for (;;) {
                if (enabled2) return;
                if (
                  (isObservabilityTelemetryValue4
                    ? hostDraft2(idleMs)
                    : Date.now() - record2.lastLocalEditAt >= idleMs) ||
                  Date.now() - now2 >= maxWaitMs
                )
                  break;
                await new (Promise as Dynamic)(
                  (resolve?: Dynamic, ..._extraArguments: unknown[]) =>
                    setTimeout(resolve, 200),
                );
              }
              if (enabled2) return;
              if (isObservabilityTelemetryValue4 && hostDraft2(idleMs)) {
                PlatformRuntimeAndChatState7.onDecision?.(
                  label,
                  `reload`,
                  awaiting.reason,
                );
                resolvePlatformRuntimeAndChatUserId(
                  platformRuntimeAndChatByPathHandler4(
                    `reload`,
                    awaiting,
                    label2,
                  ),
                );
                if (
                  (PlatformRuntimeAndChatState7.reload ?? forceClientReload)(
                    `stale-build`,
                  )
                )
                  return;
                resolvePlatformRuntimeAndChatRemoveItem();
              }
              PlatformRuntimeAndChatState7.onDecision?.(
                label,
                `remount`,
                awaiting.reason,
              );
              resolvePlatformRuntimeAndChatAnon3(`remount`, awaiting, label2);
              platformRuntimeAndChatByPathHandler3(awaiting.reason);
            } finally {
              record2.running = false;
              record2.awaiting = null;
              record2.probeSentAt = 0;
              if (record2.probeSig !== undefined) {
                uniqueItems.delete(record2.probeSig);
              }
              record2.probeSig = undefined;
            }
          }
        }
        function platformRuntimeAndChatByPathHandler3(
          resyncReason?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined {
          let byPathItem2: Dynamic = options().byPath[label];
          if (!(!byPathItem2 || byPathItem2.detached || enabled2)) {
            byPathItem2.refs++;
            setTimeout((..._extraArguments: unknown[]): undefined => {
              let byPathItem3: Dynamic = options().byPath[label];
              if (
                byPathItem3 &&
                byPathItem3.ydoc === ydoc &&
                !byPathItem3.detached
              ) {
                options().disconnect(path, tab);
              }
            }, PlatformRuntimeAndChatState7.holdMs ?? platformRuntimeAndChatValue150002);
            platformRuntimeAndChatByPath(
              (
                platformRuntimeAndChatByPath2?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => {
                let byPathItem3: Dynamic =
                  platformRuntimeAndChatByPath2.byPath[label];
                return byPathItem3
                  ? {
                      byPath: {
                        ...platformRuntimeAndChatByPath2.byPath,
                        [label]: {
                          ...byPathItem3,
                          resyncAt: Date.now(),
                          resyncReason: resyncReason,
                        },
                      },
                    }
                  : platformRuntimeAndChatByPath2;
              },
            );
          }
        }
        let platformRuntimeAndChatByPathHandler4: Dynamic = (
          action?: Dynamic,
          options3?: Dynamic,
          serverBuild?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => ({
          container: container,
          room: room,
          action: action,
          reason: options3.reason,
          awayMs: options3.awayMs,
          serverBuild: serverBuild,
          clientBuild:
            PlatformRuntimeAndChatState7.clientBuild ??
            `259dc54003a391cffb50b52b94c913ed15d92d1c`,
        });
        let resolvePlatformRuntimeAndChatAnon3: Dynamic = (
          platformRuntimeAndChatByPath2?: Dynamic,
          options3?: Dynamic,
          context?: Dynamic,
          ..._extraArguments: unknown[]
        ) =>
          resolvePlatformRuntimeAndChatAnon(
            platformRuntimeAndChatByPathHandler4(
              platformRuntimeAndChatByPath2,
              options3,
              context,
            ),
          );
        let record3: Dynamic = {
          ydoc: ydoc,
          awareness: awareness,
          rt: isPlatformApiAndAuthHandoff2,
          state: `connecting`,
          onUpdate: onUpdate,
          onAwareness: onAwareness,
          unhook: (..._extraArguments: unknown[]): undefined => {
            enabled2 = true;
            clearInterval(setInterval2);
            platformRuntimeAndChatMap2.delete(label);
            platformRuntimeAndChatMap3.delete(label);
            platformRuntimeAndChatMap4.delete(label);
            platformRuntimeAndChatMap5.delete(label);
            ydoc.off(`update`, send);
            awareness.off(`update`, send2);
          },
          refs: 1,
          synced: synced,
          readonly: dependencies === true,
          content: argument === true,
          container: container,
        };
        platformRuntimeAndChatByPath(
          (
            platformRuntimeAndChatByPath2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => ({
            byPath: {
              ...platformRuntimeAndChatByPath2.byPath,
              [label]: record3,
            },
          }),
        );
        clearPlatformRuntimeAndChatIndexOf();
        let platformRuntimeAndChatMap6Entry: Dynamic =
          platformRuntimeAndChatMap6.get(
            resolvePlatformRuntimeAndChatValue8(container, label),
          );
        if (platformRuntimeAndChatMap6Entry) {
          if (dependencies === true) {
            platformRuntimeAndChatMap6.set(
              resolvePlatformRuntimeAndChatValue8(container, label),
              {
                u: platformRuntimeAndChatMap6Entry.u,
                at: Date.now(),
              },
            );
          } else {
            platformRuntimeAndChatMap6.delete(
              resolvePlatformRuntimeAndChatValue8(container, label),
            );
            applyUpdate(ydoc, platformRuntimeAndChatMap6Entry.u);
          }
        }
        return record3;
      },
      disconnect(
        platformRuntimeAndChatByPath2?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined {
        let label: Dynamic = options2
          ? `${platformRuntimeAndChatByPath2}#${options2}`
          : platformRuntimeAndChatByPath2;
        let byPathItem: Dynamic = options().byPath[label];
        if (!(!byPathItem || byPathItem.detached || --byPathItem.refs > 0)) {
          queueMicrotask((..._extraArguments: unknown[]): undefined => {
            let byPathItem2: Dynamic = options().byPath[label];
            if (!byPathItem2 || byPathItem2.refs > 0 || byPathItem2.detached)
              return;
            clearPlatformRuntimeAndChatIndexOf();
            let platformRuntimeAndChatMap7Entry: Dynamic =
              platformRuntimeAndChatMap7.get(
                resolvePlatformRuntimeAndChatValue8(byPathItem2.container, label),
              );
            if (platformRuntimeAndChatMap7Entry) {
              platformRuntimeAndChatMap7.delete(
                resolvePlatformRuntimeAndChatValue8(byPathItem2.container, label),
              );
              updatePlatformRuntimeAndChatByPath(
                byPathItem2.container,
                platformRuntimeAndChatMap7Entry.to,
                encodeStateAsUpdate(byPathItem2.ydoc),
              );
            }
            byPathItem2.detached = true;
            byPathItem2.unhook();
            byPathItem2.awareness.destroy();
            byPathItem2.ydoc.destroy();
            byPathItem2.rt.close();
            platformRuntimeAndChatByPath(
              (
                platformRuntimeAndChatByPath3?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic => {
                let { [label]: byPath, ...byPath2 }: Dynamic =
                  platformRuntimeAndChatByPath3.byPath;
                return {
                  byPath: byPath2,
                };
              },
            );
          });
        }
      },
      applyUpdate(
        platformRuntimeAndChatByPath2?: Dynamic,
        options2?: Dynamic,
        context?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined {
        let byPathItem: Dynamic =
          options().byPath[
            context
              ? `${platformRuntimeAndChatByPath2}#${context}`
              : platformRuntimeAndChatByPath2
          ];
        if (byPathItem) {
          applyUpdate(byPathItem.ydoc, options2, PlatformRuntimeAndChatIframe);
        }
      },
      applyAwareness(
        platformRuntimeAndChatByPath2?: Dynamic,
        options2?: Dynamic,
        context?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined {
        let byPathItem: Dynamic =
          options().byPath[
            context
              ? `${platformRuntimeAndChatByPath2}#${context}`
              : platformRuntimeAndChatByPath2
          ];
        if (byPathItem) {
          applyAwarenessUpdate(
            byPathItem.awareness,
            options2,
            PlatformRuntimeAndChatIframe,
          );
        }
      },
      reportStale(
        platformRuntimeAndChatByPath2?: Dynamic,
        options2?: Dynamic,
        context?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined {
        platformRuntimeAndChatMap4.get(
          context
            ? `${platformRuntimeAndChatByPath2}#${context}`
            : platformRuntimeAndChatByPath2,
        )?.(options2);
      },
    }),
  ));
  if (typeof window !== "undefined") {
    (window as Dynamic).__ldocStore = PlatformRuntimeAndChatByPath;
    setTimeout(isPlatformRuntimeAndChatContainer, 0);
    window.addEventListener(
      `beforeunload`,
      (event?: Dynamic, ..._extraArguments: unknown[]): undefined => {
        if (isPlatformRuntimeAndChatReconnecting()) {
          event.preventDefault();
          event.returnValue = ``;
        }
      },
    );
    (
      setInterval(
        clearPlatformRuntimeAndChatIndexOf,
        platformRuntimeAndChatValue600002,
      ) as (number | ReturnType<typeof setInterval>) & {
        unref?: () => void;
      }
    ).unref?.();
    if (typeof document !== "undefined") {
      let now: number = document.hidden ? Date.now() : 0;
      let count = 0;
      document.addEventListener(
        `visibilitychange`,
        (..._extraArguments: unknown[]): undefined => {
          if (document.hidden) {
            now ||= Date.now();
            return;
          }
          let max = Math.max(now ? Date.now() - now : 0, count);
          now = 0;
          count = 0;
          if (max > resolvePlatformRuntimeAndChatGapMs()) {
            resolvePlatformRuntimeAndChatValues2(`visible`, max);
          }
        },
      );
      let now2 = Date.now();
      (
        setInterval((..._extraArguments: unknown[]): undefined => {
          let now3 = Date.now();
          let difference = now3 - now2 - platformRuntimeAndChatValue50003;
          now2 = now3;
          if (!(difference <= resolvePlatformRuntimeAndChatGapMs())) {
            if (document.hidden) {
              count = Math.max(count, difference);
            } else {
              resolvePlatformRuntimeAndChatValues2(`clock`, difference);
            }
          }
        }, platformRuntimeAndChatValue50003) as (
          | number
          | ReturnType<typeof setInterval>
        ) & {
          unref?: () => void;
        }
      ).unref?.();
    }
    clearPlatformApiAndAuthDelete3(
      (
        callback?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let match: Dynamic = callback.match(platformRuntimeAndChatPattern2);
        let match2: Dynamic = options.match(platformRuntimeAndChatPattern2);
        if (!match || !match2 || match[1] !== match2[1]) return;
        let matchItem: Dynamic = match[1];
        let [items, setItems]: Dynamic = [match[2], match2[2]];
        let PlatformRuntimeAndChatByPathState: Dynamic =
          PlatformRuntimeAndChatByPath.getState();
        for (let localResult of Object.keys(
          PlatformRuntimeAndChatByPathState.byPath,
        ) as Dynamic) {
          if (localResult !== items && !localResult.startsWith(`${items}#`))
            continue;
          let byPathItem: Dynamic =
            PlatformRuntimeAndChatByPathState.byPath[localResult];
          if (!byPathItem || byPathItem.container !== matchItem) continue;
          let total: Dynamic = setItems + localResult.slice(items.length);
          platformRuntimeAndChatMap7.set(
            resolvePlatformRuntimeAndChatValue8(matchItem, localResult),
            {
              to: total,
              at: Date.now(),
            },
          );
          if (!byPathItem.detached) {
            updatePlatformRuntimeAndChatByPath(
              matchItem,
              total,
              encodeStateAsUpdate(byPathItem.ydoc),
            );
          }
        }
        let slice: Dynamic = (
          callback2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          callback2 === items || callback2.startsWith(`${items}#`)
            ? setItems + callback2.slice(items.length)
            : null;
        for (let [localResult, post] of platformRuntimeAndChatMap7 as Dynamic) {
          if (!localResult.startsWith(`${matchItem}|`)) continue;
          let itemsSlice: Dynamic = slice(post.to);
          if (itemsSlice) {
            platformRuntimeAndChatMap7.set(localResult, {
              to: itemsSlice,
              at: Date.now(),
            });
          }
        }
        for (let [localResult, localResult2] of [
          ...platformRuntimeAndChatMap6,
        ] as Dynamic) {
          if (!localResult.startsWith(`${matchItem}|`)) continue;
          let itemsSlice: Dynamic = slice(
            localResult.slice(matchItem.length + 1),
          );
          if (itemsSlice) {
            platformRuntimeAndChatMap6.delete(localResult);
            platformRuntimeAndChatMap6.set(
              resolvePlatformRuntimeAndChatValue8(matchItem, itemsSlice),
              localResult2,
            );
          }
        }
      },
    );
  }
}

export {
  PlatformRuntimeAndChatByPath,
};
