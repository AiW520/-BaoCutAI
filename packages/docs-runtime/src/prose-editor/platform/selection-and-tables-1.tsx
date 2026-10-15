/** BaoCut: editor selection and tables from app-core-BE6n4d7F.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  Node2,
  NodeSelection,
  PluginKey,
  React,
  TextSelection,
  canInsertNode,
  create,
  inFrame,
  isNodeSelection,
  mergeAttributes,
  nodeInputRule,
} from "../../platform/dependencies";
import {
  resolvePlatformSessionAndSourcesPath,
  resolvePlatformSessionAndSourcesReplace4,
} from "../../platform/services/session-and-sources-1";
import {
  isEditorExtensionsValue,
} from "./extensions-5";
import {
  Button,
  Checkbox,
} from "../../platform/ui/tooltips-and-controls";
import {
  UiDialogsRoot,
} from "../../platform/ui/dialogs";
import {
  frameBootContainer,
  subscribeFrameShellOriginChanged,
  subscribeFrameWriteVerdict,
} from "../../platform/observability/browser-and-operation-events-3";
import {
  api,
  emitAction,
} from "../../platform/services/api-and-auth-1";
import {
  isRunProgress,
  nodeIdOfThread,
} from "../../platform/data/model-schemas-3";
import {
  updateDataModelSchemasValue,
} from "../../platform/data/model-schemas-4";
import {
  dataOperationEnginePattern6,
  resolveDataOperationEngineEvery,
} from "../../platform/data/operation-engine-3";
import {
  resolveCommentsStoreNode,
} from "../../comments/store/store-2";
import {
  EditorHostDataLfileDatumDraft,
  EditorHostDataLfileDatumThreads,
  EditorHostDataLfileWidget,
  EditorHostStyles6,
} from "./host-1";
import {
  resolveCommentsEditorPid2,
  resolveCommentsEditorReactionOnly,
  resolveCommentsEditorSignal,
  resolveCommentsEditorValue7,
} from "../../comments/store/editor";

function useEditorSelectionAndTablesPid(
  pid?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let [commentsEditorPid2, setCommentsEditorPid2]: Dynamic = (0,
  React.useState)(undefined);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (pid !== undefined)
        return inFrame()
          ? subscribeFrameWriteVerdict(
              `project/${pid}`,
              (
                editorSelectionAndTablesPid?: Dynamic,
                ..._extraArguments: unknown[]
              ): Dynamic =>
                setCommentsEditorPid2(
                  resolveCommentsEditorPid2(pid, editorSelectionAndTablesPid),
                ),
            )
          : resolveCommentsEditorSignal(
              pid,
              (code2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                setCommentsEditorPid2({
                  pid: pid,
                  code: code2,
                }),
            );
    },
    [pid],
  );
  let code: Dynamic =
    commentsEditorPid2 !== undefined && commentsEditorPid2.pid === pid
      ? commentsEditorPid2.code
      : undefined;
  let verdict =
    code === undefined
      ? undefined
      : code === 200
        ? `writer`
        : code === 404
          ? `viewer`
          : `other`;
  return {
    readOnly: resolveCommentsEditorValue7(code),
    verdict: verdict,
  };
}

var resolveEditorSelectionAndTablesValue: Dynamic;

function useEditorSelectionAndTablesUseSyncExternalStore(
  ..._extraArguments: unknown[]
): Dynamic {
  return (0, React.useSyncExternalStore)(
    subscribeFrameShellOriginChanged,
    resolveEditorSelectionAndTablesValue,
    (..._extraArguments: unknown[]) => false,
  );
}

var editorSelectionAndTablesPattern: RegExp;

var resolveEditorSelectionAndTablesTest: Dynamic;

var resolveEditorSelectionAndTablesType: Dynamic;

var resolveEditorSelectionAndTablesValue2: Dynamic;

var resolveEditorSelectionAndTablesValue3: (editorSelectionAndTablesValue3?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => string;

var resolveEditorSelectionAndTablesGetItem: Dynamic;

var resolveEditorSelectionAndTablesSetItem: (editorSelectionAndTablesSetItem?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => undefined;

var editorSelectionAndTablesValue8192: number;

var resolveEditorSelectionAndTablesText: Dynamic;

var resolveEditorSelectionAndTablesReplace: Dynamic;

function EditorSelectionAndTablesReq(
  editorSelectionAndTablesReq?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [
    editorSelectionAndTablesReqState,
    setEditorSelectionAndTablesReqState,
  ]: Dynamic = (0, React.useState)(null);
  let [checked, setChecked]: Dynamic = (0, React.useState)(false);
  let [enabledState, setEnabledState]: Dynamic = (0, React.useState)(false);
  let [enabledState2, setEnabledState2]: Dynamic = (0, React.useState)(false);
  let elementRef: Dynamic = (0, React.useRef)(null);
  let elementRef2: Dynamic = (0, React.useRef)(null);
  let enabledRef: Dynamic = (0, React.useRef)(false);
  let resolveEditorSelectionAndTablesText4: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      resolveEditorSelectionAndTablesText(
        editorSelectionAndTablesReqState?.params ?? null,
      ),
    [editorSelectionAndTablesReqState],
  );
  let resolveEditorSelectionAndTablesValue22: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      editorSelectionAndTablesReqState
        ? resolveEditorSelectionAndTablesValue2(
            editorSelectionAndTablesReqState.params,
          )
        : null,
    [editorSelectionAndTablesReqState],
  );
  let enabled: Dynamic =
    !!editorSelectionAndTablesReqState &&
    resolveEditorSelectionAndTablesTest(editorSelectionAndTablesReqState.ref);
  let serializable: Dynamic =
    resolveEditorSelectionAndTablesText4.serializable &&
    !resolveEditorSelectionAndTablesText4.truncated;
  let disabled = !enabledState || !serializable;
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      elementRef2.current = editorSelectionAndTablesReqState;
      if (!editorSelectionAndTablesReqState) return;
      let setTimeout2 = setTimeout(
        (..._extraArguments: unknown[]): undefined => {
          enabledRef.current = true;
          setEnabledState(true);
        },
        400,
      );
      return (..._extraArguments: unknown[]) => clearTimeout(setTimeout2);
    },
    [editorSelectionAndTablesReqState],
  );
  let setEnabledState3: Dynamic = (0, React.useCallback)(
    (
      editorSelectionAndTablesReq2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let element: Dynamic = elementRef.current;
      if (!element) return;
      let editorSelectionAndTablesReq3: Dynamic =
        editorSelectionAndTablesReq2 &&
        elementRef.current === element &&
        element.req === elementRef2.current &&
        enabledRef.current;
      elementRef.current = null;
      if (
        editorSelectionAndTablesReq3 &&
        checked &&
        enabled &&
        serializable &&
        resolveEditorSelectionAndTablesValue22 !== null &&
        resolveEditorSelectionAndTablesValue22.length <= 8192
      ) {
        resolveEditorSelectionAndTablesSetItem(
          resolveEditorSelectionAndTablesValue3(
            editorSelectionAndTablesReq.docId,
            element.req.ref,
          ),
          resolveEditorSelectionAndTablesValue22,
        );
      }
      setEditorSelectionAndTablesReqState(null);
      setChecked(false);
      enabledRef.current = false;
      setEnabledState(false);
      setEnabledState2(false);
      element.resolve(editorSelectionAndTablesReq3);
    },
    [
      checked,
      editorSelectionAndTablesReq.docId,
      enabled,
      serializable,
      resolveEditorSelectionAndTablesValue22,
    ],
  );
  let confirmRun: Dynamic = (0, React.useCallback)(
    (req?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
      let editorSelectionAndTablesValue2: Dynamic =
        resolveEditorSelectionAndTablesValue2(req.params);
      return resolveEditorSelectionAndTablesTest(req.ref) &&
        editorSelectionAndTablesValue2 !== null &&
        resolveEditorSelectionAndTablesGetItem(
          resolveEditorSelectionAndTablesValue3(
            editorSelectionAndTablesReq.docId,
            req.ref,
          ),
        ) === editorSelectionAndTablesValue2
        ? Promise.resolve(true)
        : new (Promise as Dynamic)(
            (resolve?: Dynamic, ..._extraArguments: unknown[]): undefined => {
              let matchesElement = elementRef.current !== null;
              elementRef.current?.resolve(false);
              elementRef.current = {
                req: req,
                resolve: resolve,
              };
              setChecked(false);
              enabledRef.current = false;
              setEnabledState(false);
              setEnabledState2(matchesElement);
              setEditorSelectionAndTablesReqState(req);
            },
          );
    },
    [editorSelectionAndTablesReq.docId],
  );
  return {
    dialog:
      editorSelectionAndTablesReqState && !enabled ? (
        <UiDialogsRoot.Root
          open={true}
          onOpenChange={(
            editorSelectionAndTablesReq2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            !editorSelectionAndTablesReq2 && setEnabledState3(false)
          }
        >
          <UiDialogsRoot.Popup size={`md`}>
            <UiDialogsRoot.Header
              showClose={true}
            >{`Can’t run this`}</UiDialogsRoot.Header>
            <div className={`text-secondary px-lg pb-md text-body`}>
              {editorSelectionAndTablesReq.docTitle && (
                <div className={`text-muted mb-sm`}>
                  {`from `}
                  <span className={`font-medium`}>
                    {editorSelectionAndTablesReq.docTitle}
                  </span>
                </div>
              )}
              <div
                className={`text-danger`}
              >{`This button points at a routine that doesn’t exist, so there’s nothing to run.`}</div>
            </div>
            <UiDialogsRoot.Footer align={`end`}>
              <UiDialogsRoot.Close
                render={<Button autoFocus={true}>{`Close`}</Button>}
              />
            </UiDialogsRoot.Footer>
          </UiDialogsRoot.Popup>
        </UiDialogsRoot.Root>
      ) : editorSelectionAndTablesReqState ? (
        <UiDialogsRoot.Root
          open={true}
          onOpenChange={(
            editorSelectionAndTablesReq2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            !editorSelectionAndTablesReq2 && setEnabledState3(false)
          }
        >
          <UiDialogsRoot.Popup size={`md`}>
            <UiDialogsRoot.Header showClose={true}>
              {`Run `}
              {resolveEditorSelectionAndTablesReplace(
                editorSelectionAndTablesReqState.ref,
              )}
              {`?`}
            </UiDialogsRoot.Header>
            <div className={`text-secondary px-lg pb-md text-body`}>
              {enabledState2 && (
                <div
                  className={`text-danger mb-sm font-medium`}
                >{`Request changed — review again`}</div>
              )}
              {editorSelectionAndTablesReq.docTitle && (
                <div className={`text-muted mb-sm`}>
                  {`from `}
                  <span className={`font-medium`}>
                    {editorSelectionAndTablesReq.docTitle}
                  </span>
                </div>
              )}
              {resolveEditorSelectionAndTablesText4.text && (
                <pre
                  className={`bg-surface-1 rounded-card mt-sm p-sm max-h-40 overflow-auto font-mono`}
                >
                  {resolveEditorSelectionAndTablesText4.text}
                </pre>
              )}
              {resolveEditorSelectionAndTablesText4.truncated && (
                <div
                  className={`text-danger mt-sm`}
                >{`Full parameters not shown — cannot approve.`}</div>
              )}
              {!resolveEditorSelectionAndTablesText4.serializable && (
                <div
                  className={`text-danger mt-sm`}
                >{`Params can’t be displayed; Run is disabled.`}</div>
              )}
              <Checkbox
                className={`mt-md`}
                checked={checked}
                disabled={!serializable}
                onCheckedChange={(
                  editorSelectionAndTablesReq2?: Dynamic,
                  ..._extraArguments: unknown[]
                ): Dynamic => setChecked(editorSelectionAndTablesReq2 === true)}
                label={`Don’t ask again for this routine with these params in this document`}
              />
            </div>
            <UiDialogsRoot.Footer align={`end`}>
              <UiDialogsRoot.Close
                render={<Button autoFocus={true}>{`Cancel`}</Button>}
              />
              <Button
                variant={`primary`}
                disabled={disabled}
                onClick={(..._extraArguments: unknown[]): Dynamic =>
                  setEnabledState3(true)
                }
              >{`Run`}</Button>
            </UiDialogsRoot.Footer>
          </UiDialogsRoot.Popup>
        </UiDialogsRoot.Root>
      ) : null,
    confirmRun: confirmRun,
  };
}

function resolveEditorSelectionAndTablesCreate(
  ..._extraArguments: unknown[]
): Dynamic {
  return Object.create(null);
}

function resolveEditorSelectionAndTablesHasOwn(
  editorSelectionAndTablesHasOwn?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (!Object.hasOwn(editorSelectionAndTablesHasOwn, options)) {
    editorSelectionAndTablesHasOwn[options] = Object.create(null);
  }
  let editorSelectionAndTablesHasOwnItem: Dynamic =
    editorSelectionAndTablesHasOwn[options];
  if (Object.hasOwn(editorSelectionAndTablesHasOwnItem, context)) {
    editorSelectionAndTablesHasOwnItem[context].n++;
  } else {
    editorSelectionAndTablesHasOwnItem[context] = {
      id: dependencies,
      n: 1,
    };
  }
}

var EditorSelectionAndTablesDataPagesPrintSurface: string;

var EditorSelectionAndTablesPagesPrintDocH: string;

var EditorSelectionAndTablesDataPagesPrintMirror: string;

var EditorSelectionAndTablesDataPagesPrintGhost: string;

var EditorSelectionAndTablesDataPagesPrintSkip: string;

var EditorSelectionAndTablesState: string;

var EditorSelectionAndTablesState2: string;

var editorSelectionAndTablesValue200000: number;

var editorSelectionAndTablesWeakMap: Dynamic;

function updateEditorSelectionAndTablesHeights(
  updateEditorSelectionAndTablesHeights2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let editorSelectionAndTablesWeakMapEntry: Dynamic =
    editorSelectionAndTablesWeakMap.get(updateEditorSelectionAndTablesHeights2);
  if (!editorSelectionAndTablesWeakMapEntry) {
    editorSelectionAndTablesWeakMapEntry = {
      heights: new (Map as Dynamic)(),
      refused: false,
    };
    editorSelectionAndTablesWeakMap.set(
      updateEditorSelectionAndTablesHeights2,
      editorSelectionAndTablesWeakMapEntry,
    );
  }
  return editorSelectionAndTablesWeakMapEntry;
}

function resolveEditorSelectionAndTablesIsFinite(
  editorSelectionAndTablesIsFinite?: unknown,
  ..._extraArguments: unknown[]
) {
  return typeof editorSelectionAndTablesIsFinite != `number` ||
    !Number.isFinite(editorSelectionAndTablesIsFinite) ||
    editorSelectionAndTablesIsFinite <= 0
    ? null
    : Math.min(
        Math.ceil(editorSelectionAndTablesIsFinite),
        editorSelectionAndTablesValue200000,
      );
}

var resolveEditorSelectionAndTablesValue4: Dynamic;

function resolveEditorSelectionAndTablesDocumentElement(
  editorSelectionAndTablesDocumentElement?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let documentElement: Dynamic =
    editorSelectionAndTablesDocumentElement.documentElement;
  documentElement.removeAttribute(EditorSelectionAndTablesDataPagesPrintMirror);
  documentElement.style.removeProperty(EditorSelectionAndTablesPagesPrintDocH);
  resolveEditorSelectionAndTablesValue4(
    editorSelectionAndTablesDocumentElement,
  )?.remove();
}

function resolveEditorSelectionAndTablesDataPagesPrintMirror(
  editorSelectionAndTablesDataPagesPrintMirror?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (options.refused) return;
  if (options.heights.size === 0) {
    resolveEditorSelectionAndTablesDocumentElement(
      editorSelectionAndTablesDataPagesPrintMirror,
    );
    return;
  }
  let documentElement: Dynamic =
    editorSelectionAndTablesDataPagesPrintMirror.documentElement;
  let editorSelectionAndTablesValue4: Dynamic =
    resolveEditorSelectionAndTablesValue4(
      editorSelectionAndTablesDataPagesPrintMirror,
    );
  if (
    !documentElement.hasAttribute(`data-pages-print-mirror`) ||
    editorSelectionAndTablesValue4 === null
  ) {
    documentElement.setAttribute(
      EditorSelectionAndTablesDataPagesPrintMirror,
      ``,
    );
    editorSelectionAndTablesValue4 ??=
      editorSelectionAndTablesDataPagesPrintMirror.body.appendChild(
        editorSelectionAndTablesDataPagesPrintMirror.createElement(`div`),
      );
    editorSelectionAndTablesValue4.setAttribute(
      EditorSelectionAndTablesDataPagesPrintGhost,
      ``,
    );
    editorSelectionAndTablesValue4.setAttribute(`aria-hidden`, `true`);
  }
  let label = `${(Math.max as Dynamic)(...options.heights.values())}px`;
  if (
    editorSelectionAndTablesValue4.style.getPropertyValue(
      `--pages-print-doc-h`,
    ) === label
  )
    return;
  editorSelectionAndTablesValue4.style.setProperty(
    EditorSelectionAndTablesPagesPrintDocH,
    label,
  );
  let scrollingElement: Dynamic =
    editorSelectionAndTablesDataPagesPrintMirror.scrollingElement ??
    documentElement;
  if (scrollingElement.scrollHeight > scrollingElement.clientHeight + 1) {
    options.refused = true;
    resolveEditorSelectionAndTablesDocumentElement(
      editorSelectionAndTablesDataPagesPrintMirror,
    );
  }
}

function updateEditorSelectionAndTablesReport(
  element?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let ownerDocument2: Dynamic = element.ownerDocument;
  let updateEditorSelectionAndTablesHeights2: Dynamic = options.mirror
    ? updateEditorSelectionAndTablesHeights(ownerDocument2)
    : null;
  let Symbol2 = Symbol(`print-surface`);
  let updateEditorSelectionAndTablesReportResult: Dynamic = null;
  let enabled: boolean = false;
  let setProperty = (
    updateEditorSelectionAndTablesReport2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    if (
      updateEditorSelectionAndTablesReport2 !==
      updateEditorSelectionAndTablesReportResult
    ) {
      updateEditorSelectionAndTablesReportResult =
        updateEditorSelectionAndTablesReport2;
      if (updateEditorSelectionAndTablesReport2 === null) {
        element.style.removeProperty(EditorSelectionAndTablesPagesPrintDocH);
      } else {
        element.style.setProperty(
          EditorSelectionAndTablesPagesPrintDocH,
          `${updateEditorSelectionAndTablesReport2}px`,
        );
      }
      if (updateEditorSelectionAndTablesHeights2) {
        if (updateEditorSelectionAndTablesReport2 === null) {
          updateEditorSelectionAndTablesHeights2.heights.delete(Symbol2);
        } else {
          updateEditorSelectionAndTablesHeights2.heights.set(
            Symbol2,
            updateEditorSelectionAndTablesReport2,
          );
        }
        resolveEditorSelectionAndTablesDataPagesPrintMirror(
          ownerDocument2,
          updateEditorSelectionAndTablesHeights2,
        );
      }
    }
  };
  return {
    report(
      updateEditorSelectionAndTablesReport2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined {
      if (!enabled) {
        setProperty(
          resolveEditorSelectionAndTablesIsFinite(
            updateEditorSelectionAndTablesReport2,
          ),
        );
      }
    },
    release(..._extraArguments: unknown[]): undefined {
      enabled ||= (setProperty(null), true);
    },
  };
}

var EditorSelectionAndTablesHide: string;

function resolveEditorSelectionAndTablesFallback(
  editorSelectionAndTablesFallback?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies: Dynamic = EditorSelectionAndTablesHide,
  ..._extraArguments: unknown[]
): Dynamic {
  return editorSelectionAndTablesFallback
    ? options
      ? true
      : dependencies === `fallback` && context
    : false;
}

function resolveEditorSelectionAndTablesSummon(
  editorSelectionAndTablesSummon?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies: Dynamic = EditorSelectionAndTablesHide,
  ..._extraArguments: unknown[]
): Dynamic {
  return editorSelectionAndTablesSummon
    ? options
      ? {
          summon: true,
          stage: false,
        }
      : {
          summon: false,
          stage: dependencies === `fallback` && context,
        }
    : {
        summon: false,
        stage: false,
      };
}

var resolveEditorSelectionAndTablesTrim: Dynamic;

function resolveEditorSelectionAndTablesJoin(
  editorSelectionAndTablesJoin?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let editorSelectionAndTablesTrim: Dynamic =
    resolveEditorSelectionAndTablesTrim(editorSelectionAndTablesJoin);
  let items: Dynamic = [...editorSelectionAndTablesTrim];
  let label: Dynamic =
    items.length > 280
      ? `${items.slice(0, 279).join(``)}…`
      : editorSelectionAndTablesTrim;
  let trimmedOptions: Dynamic = options.trim();
  return resolvePlatformSessionAndSourcesReplace4(
    label === `` ? trimmedOptions : `"${label}"\n\n${trimmedOptions}`,
  );
}

function resolveEditorSelectionAndTablesText2(
  editorSelectionAndTablesText2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return {
    text: resolveEditorSelectionAndTablesJoin(
      editorSelectionAndTablesText2.quote,
      editorSelectionAndTablesText2.body,
    ),
    ref: resolvePlatformSessionAndSourcesPath(
      editorSelectionAndTablesText2.address,
    ),
    kind:
      resolveEditorSelectionAndTablesTrim(
        editorSelectionAndTablesText2.quote,
      ) === ``
        ? `block`
        : `selection`,
    ...(editorSelectionAndTablesText2.title
      ? {
          title: editorSelectionAndTablesText2.title,
        }
      : {}),
  };
}

var editorSelectionAndTablesSet: Dynamic;

var resolveEditorSelectionAndTablesStaged: (editorSelectionAndTablesStaged?: Dynamic, ..._extraArguments: unknown[]) => "staged" | "unavailable";

var resolveEditorSelectionAndTablesValue5: (editorSelectionAndTablesValue5?: Dynamic, ..._extraArguments: unknown[]) => boolean;

function resolveEditorSelectionAndTablesQuote(
  editorSelectionAndTablesQuote?: Dynamic,
  ask?: Dynamic,
  quote?: Dynamic,
  body?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!editorSelectionAndTablesQuote.framed) return Promise.resolve(`refused`);
  let judge: Dynamic = ask
    ? editorSelectionAndTablesQuote.judge(ask.bid, ask.start, ask.end)
    : null;
  if (
    !editorSelectionAndTablesQuote.file ||
    !editorSelectionAndTablesQuote.node ||
    !judge
  )
    return Promise.resolve(`missed`);
  let editorSelectionAndTablesText2: Dynamic =
    resolveEditorSelectionAndTablesText2({
      quote: quote,
      body: body,
      address: {
        file: editorSelectionAndTablesQuote.file,
        node: editorSelectionAndTablesQuote.node,
        ...judge,
      },
      title: editorSelectionAndTablesQuote.title?.(judge.bid),
    });
  return editorSelectionAndTablesQuote.post(editorSelectionAndTablesText2).then(
    (response?: Dynamic, ..._extraArguments: unknown[]) =>
      response.ok === true
        ? `staged`
        : editorSelectionAndTablesSet.has(String(response.reason))
          ? `refused`
          : `missed`,
    (..._extraArguments: unknown[]) => `missed`,
  );
}

function resolveEditorSelectionAndTablesSlice(
  editorSelectionAndTablesSlice?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let editorSelectionAndTablesSliceSlice: Dynamic =
    editorSelectionAndTablesSlice.slice(0, 500);
  let charCodeAt: Dynamic = editorSelectionAndTablesSliceSlice.charCodeAt(
    editorSelectionAndTablesSliceSlice.length - 1,
  );
  return charCodeAt >= 55296 && charCodeAt <= 56319
    ? editorSelectionAndTablesSliceSlice.slice(0, -1)
    : editorSelectionAndTablesSliceSlice;
}

var EditorSelectionAndTablesDataClaudeTextJsonPath: string;

var EditorSelectionAndTablesReason: {
    reason: string;
    detail: string;
};

var EditorSelectionAndTablesReason2: string;

var editorSelectionAndTablesPattern2: RegExp;

var editorSelectionAndTablesPattern3: RegExp;

var editorSelectionAndTablesPattern4: RegExp;

var editorSelectionAndTablesSet2: Dynamic;

function resolveEditorSelectionAndTablesIsSafeInteger(
  editorSelectionAndTablesIsSafeInteger?: Dynamic,
  ..._extraArguments: unknown[]
): boolean {
  return typeof editorSelectionAndTablesIsSafeInteger == `number`
    ? Number.isSafeInteger(editorSelectionAndTablesIsSafeInteger) &&
        editorSelectionAndTablesIsSafeInteger >= 0 &&
        editorSelectionAndTablesIsSafeInteger <= 9999
    : editorSelectionAndTablesPattern3.test(
        editorSelectionAndTablesIsSafeInteger,
      ) &&
        !editorSelectionAndTablesSet2.has(
          editorSelectionAndTablesIsSafeInteger,
        );
}

function resolveEditorSelectionAndTablesPush(
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!Array.isArray(items) || items.length === 0 || items.length > 8)
    return null;
  let items2: Dynamic = [];
  for (let resolveEditorSelectionAndTablesPushResult of items as Dynamic) {
    if (
      (typeof resolveEditorSelectionAndTablesPushResult != `string` &&
        typeof resolveEditorSelectionAndTablesPushResult != `number`) ||
      !resolveEditorSelectionAndTablesIsSafeInteger(
        resolveEditorSelectionAndTablesPushResult,
      )
    )
      return null;
    items2.push(resolveEditorSelectionAndTablesPushResult);
  }
  return items2;
}

function collectEditorSelectionAndTablesJoin(
  collectEditorSelectionAndTablesJoin2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return resolveEditorSelectionAndTablesPush([
    ...collectEditorSelectionAndTablesJoin2,
  ])
    ? collectEditorSelectionAndTablesJoin2.map(String).join(`.`)
    : null;
}

function resolveEditorSelectionAndTablesSplit(
  items?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof items != `string` || items.length === 0) return null;
  let itemsParts = items.split(`.`);
  if (itemsParts.length > 8) return null;
  let items2: Dynamic = [];
  for (let resolveEditorSelectionAndTablesSplitResult of itemsParts as Dynamic)
    if (
      editorSelectionAndTablesPattern4.test(
        resolveEditorSelectionAndTablesSplitResult,
      )
    )
      items2.push(Number(resolveEditorSelectionAndTablesSplitResult));
    else if (
      editorSelectionAndTablesPattern3.test(
        resolveEditorSelectionAndTablesSplitResult,
      ) &&
      !editorSelectionAndTablesSet2.has(
        resolveEditorSelectionAndTablesSplitResult,
      )
    )
      items2.push(resolveEditorSelectionAndTablesSplitResult);
    else return null;
  return items2;
}

var EditorSelectionAndTablesJsonPath: string;

function resolveEditorSelectionAndTablesComponent(
  editorSelectionAndTablesComponent?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    !editorSelectionAndTablesComponent.startsWith(
      EditorSelectionAndTablesJsonPath,
    )
  )
    return null;
  let editorSelectionAndTablesComponentSlice: Dynamic =
    editorSelectionAndTablesComponent.slice(10);
  let editorSelectionAndTablesComponentSliceIndex: Dynamic =
    editorSelectionAndTablesComponentSlice.indexOf(`:`);
  if (editorSelectionAndTablesComponentSliceIndex < 0) return null;
  let editorSelectionAndTablesComponentSliceSlice: Dynamic =
    editorSelectionAndTablesComponentSlice.slice(
      0,
      editorSelectionAndTablesComponentSliceIndex,
    );
  if (
    editorSelectionAndTablesComponentSliceSlice !== `` &&
    !editorSelectionAndTablesPattern2.test(
      editorSelectionAndTablesComponentSliceSlice,
    )
  )
    return null;
  let attr: Dynamic = editorSelectionAndTablesComponentSlice.slice(
    editorSelectionAndTablesComponentSliceIndex + 1,
  );
  let path: Dynamic = resolveEditorSelectionAndTablesSplit(attr);
  return path
    ? {
        component:
          editorSelectionAndTablesComponentSliceSlice === ``
            ? undefined
            : editorSelectionAndTablesComponentSliceSlice,
        attr: attr,
        path: path,
      }
    : null;
}

function resolveEditorSelectionAndTablesComponent2(
  editorSelectionAndTablesComponent2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let id: Dynamic =
    typeof editorSelectionAndTablesComponent2.id == `string` &&
    editorSelectionAndTablesComponent2.id.length <= 512
      ? editorSelectionAndTablesComponent2.id
      : null;
  let editorSelectionAndTablesComponent: Dynamic =
    id === null ? null : resolveEditorSelectionAndTablesComponent(id);
  if (id === null || editorSelectionAndTablesComponent === null) return null;
  let valueSliceText =
    editorSelectionAndTablesComponent2.value === null
      ? null
      : typeof editorSelectionAndTablesComponent2.value == `string` &&
          editorSelectionAndTablesComponent2.value !== ``
        ? Array.from<Dynamic>(editorSelectionAndTablesComponent2.value)
            .slice(0, 200)
            .join(``)
        : undefined;
  if (valueSliceText === undefined) return null;
  let basePub: Dynamic =
    typeof editorSelectionAndTablesComponent2.basePub == `number` &&
    Number.isSafeInteger(editorSelectionAndTablesComponent2.basePub) &&
    editorSelectionAndTablesComponent2.basePub >= 0
      ? editorSelectionAndTablesComponent2.basePub
      : null;
  return {
    id: id,
    component: editorSelectionAndTablesComponent.component,
    path: editorSelectionAndTablesComponent.path,
    value: valueSliceText,
    basePub: basePub,
  };
}

function resolveEditorSelectionAndTablesFind(
  editorSelectionAndTablesFind?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  for (let resolveEditorSelectionAndTablesFindResult of options as Dynamic) {
    let editorSelectionAndTablesFind2: Dynamic =
      editorSelectionAndTablesFind.find(
        (rolldownNImport2?: Dynamic, ..._extraArguments: unknown[]) =>
          rolldownNImport2.id === resolveEditorSelectionAndTablesFindResult,
      );
    if (
      editorSelectionAndTablesFind2 &&
      !editorSelectionAndTablesFind2.resolved &&
      !editorSelectionAndTablesFind2.deleted &&
      editorSelectionAndTablesFind2.target?.pin !== undefined
    )
      return resolveEditorSelectionAndTablesFindResult;
  }
  return null;
}

function updateEditorSelectionAndTablesNodeId(
  updateEditorSelectionAndTablesNodeId2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let lookup: Dynamic = new (Map as Dynamic)();
  let rest: Dynamic = [];
  for (let file of updateEditorSelectionAndTablesNodeId2 as Dynamic) {
    let nodeId = nodeIdOfThread(file);
    if (
      !nodeId ||
      resolveCommentsEditorReactionOnly(file) ||
      (options && !options(nodeId))
    ) {
      rest.push(file);
      continue;
    }
    let lookupEntry: Dynamic = lookup.get(nodeId);
    if (!lookupEntry) {
      lookupEntry = {
        nodeId: nodeId,
        threads: [],
        count: 0,
        latest: null,
      };
      lookup.set(nodeId, lookupEntry);
    }
    lookupEntry.threads.push(file);
    let replies: Dynamic = isRunProgress(file)
      ? file.replies
      : [file.root, ...file.replies];
    lookupEntry.count += replies.length;
    for (let activity of replies as Dynamic)
      if (
        activity?.body?.trim() &&
        (!lookupEntry.latest ||
          (activity.at ?? ``) >= (lookupEntry.latest.at ?? ``))
      ) {
        lookupEntry.latest = activity;
      }
  }
  return {
    groups: [...lookup.values()].filter(
      (item?: Dynamic, ..._extraArguments: unknown[]) => item.count > 0,
    ),
    rest: rest,
  };
}

var editorSelectionAndTablesIdentifierPattern: RegExp;

var editorSelectionAndTablesPattern5: RegExp;

var editorSelectionAndTablesValue80: number;

var resolveEditorSelectionAndTablesSlice2: Dynamic;

function resolveEditorSelectionAndTablesExec(
  items?: Dynamic,
  ..._extraArguments: unknown[]
): string | undefined {
  let match = /definition\s*=\s*\{\{/.exec(items);
  if (!match) return;
  let total: number = match.index + match[0].length;
  let min = Math.min(items.length, total + 2e4);
  let index = 0;
  for (; total < min; ) {
    let itemItem: Dynamic = items[total];
    if (itemItem === `{` || itemItem === `[`) index++;
    else if (itemItem === `}` || itemItem === `]`) {
      if (index === 0) return;
      index--;
    } else if (itemItem === `"` || itemItem === `'` || itemItem === "`")
      for (total++; total < min && items[total] !== itemItem; )
        total += items[total] === `\\` ? 2 : 1;
    else if (
      index === 0 &&
      items.startsWith(`title:`, total) &&
      !/[\w$]/.test(items[total - 1] ?? ``)
    ) {
      let total2: Dynamic = total + 6;
      for (; total2 < min && /\s/.test(items[total2]); ) total2++;
      let itemItem2: Dynamic = items[total2];
      if (itemItem2 !== `"` && itemItem2 !== `'`) return;
      let label: string = ``;
      let total3: Dynamic = total2 + 1;
      for (; total3 < min && items[total3] !== itemItem2; ) {
        label +=
          items[total3] === `\\` ? (items[total3 + 1] ?? ``) : items[total3];
        total3 += items[total3] === `\\` ? 2 : 1;
      }
      return label.replace(/\s+/g, ` `).trim() || undefined;
    }
    total++;
  }
}

function resolveEditorSelectionAndTablesExec2(
  editorSelectionAndTablesExec2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (editorSelectionAndTablesExec2) {
    for (let resolveEditorSelectionAndTablesExec2Result of [
      editorSelectionAndTablesIdentifierPattern,
      editorSelectionAndTablesPattern5,
    ] as Dynamic) {
      let trimmedReplace: Dynamic = resolveEditorSelectionAndTablesExec2Result
        .exec(editorSelectionAndTablesExec2)?.[1]
        ?.replace(/\s+/g, ` `)
        .trim();
      if (trimmedReplace)
        return resolveEditorSelectionAndTablesSlice2(trimmedReplace);
    }
    let editorSelectionAndTablesExec: Dynamic =
      resolveEditorSelectionAndTablesExec(editorSelectionAndTablesExec2);
    if (editorSelectionAndTablesExec)
      return resolveEditorSelectionAndTablesSlice2(
        editorSelectionAndTablesExec,
      );
  }
  return options;
}

function resolveEditorSelectionAndTablesValue6(
  editorSelectionAndTablesValue6?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let editorSelectionAndTablesValue6Item: Dynamic =
    editorSelectionAndTablesValue6?.[options];
  return resolveEditorSelectionAndTablesExec2(
    editorSelectionAndTablesValue6Item?.code ??
      editorSelectionAndTablesValue6Item?.html ??
      null,
    options,
  );
}

function isEditorSelectionAndTablesConstructor(
  editorSelectionAndTablesConstructor?: unknown,
  ..._extraArguments: unknown[]
) {
  if (
    typeof editorSelectionAndTablesConstructor != `object` ||
    !editorSelectionAndTablesConstructor ||
    Array.isArray(editorSelectionAndTablesConstructor)
  )
    return false;
  let editorSelectionAndTablesConstructorEntries: Dynamic = Object.entries(
    editorSelectionAndTablesConstructor,
  );
  if (
    editorSelectionAndTablesConstructorEntries.length === 0 ||
    editorSelectionAndTablesConstructorEntries.length > 8
  )
    return false;
  for (let [
    items,
    items2,
  ] of editorSelectionAndTablesConstructorEntries as Dynamic)
    if (
      items.length === 0 ||
      items.length > 256 ||
      items === `__proto__` ||
      items === `constructor` ||
      items === `prototype` ||
      !(
        items2 === null ||
        typeof items2 == `boolean` ||
        (typeof items2 == `number` && Number.isFinite(items2)) ||
        (typeof items2 == `string` && items2.length <= 512)
      )
    )
      return false;
  return true;
}

var resolveEditorSelectionAndTablesValue7: Dynamic;

function isEditorSelectionAndTablesRowIndex(
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return !resolveDataOperationEngineEvery(items) ||
    items.length < 2 ||
    !dataOperationEnginePattern6.test(items[0])
    ? null
    : {
        rowIndex: Number(items[0]),
        field: items[1],
      };
}

function resolveEditorSelectionAndTablesNull(
  editorSelectionAndTablesNull?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return editorSelectionAndTablesNull === undefined
    ? `null`
    : JSON.stringify(
        Object.entries(editorSelectionAndTablesNull).toSorted(
          (
            [rolldownNImportEntry]: Dynamic,
            [rolldownNImportEntryEntry]: Dynamic,
            ..._extraArguments: unknown[]
          ) =>
            rolldownNImportEntry < rolldownNImportEntryEntry
              ? -1
              : +(rolldownNImportEntry > rolldownNImportEntryEntry),
        ),
      );
}

function isEditorSelectionAndTablesComponent(
  component?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let source: Dynamic = options?.source?.name;
  let resolved: Dynamic = options?.resolved;
  if (!component || !source || !resolved || resolved.object === `database`)
    return null;
  let path: Dynamic = resolved.path;
  return !resolveDataOperationEngineEvery(path) || path.length === 0
    ? null
    : {
        component: component,
        source: source,
        path: path,
        ...(isEditorSelectionAndTablesConstructor(options.datum)
          ? {
              datum: options.datum,
            }
          : {}),
        ...(resolveEditorSelectionAndTablesValue7(options.value)
          ? {
              value: options.value,
            }
          : {}),
      };
}

function updateEditorSelectionAndTablesResolved(
  updateEditorSelectionAndTablesResolved2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let lookup: Dynamic = new (Map as Dynamic)();
  let resolveEditorSelectionAndTablesNull2 = (
    event?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    let pin: Dynamic = event.target?.pin;
    let node: Dynamic = pin?.node || event.target?.pageId || ``;
    let isEditorSelectionAndTablesComponent3: Dynamic =
      isEditorSelectionAndTablesComponent(pin?.component, pin);
    if (!node || isEditorSelectionAndTablesComponent3 === null) return;
    let stringify = JSON.stringify([
      options2,
      isEditorSelectionAndTablesComponent3.component,
      isEditorSelectionAndTablesComponent3.source,
      isEditorSelectionAndTablesComponent3.path,
      resolveEditorSelectionAndTablesNull(
        isEditorSelectionAndTablesComponent3.datum,
      ),
      isEditorSelectionAndTablesComponent3.value ?? null,
    ]);
    let lookupEntry: Dynamic = lookup.get(node);
    if (lookupEntry === undefined) {
      lookup.set(node, (lookupEntry = new (Map as Dynamic)()));
    }
    let lookupEntryEntry: Dynamic = lookupEntry.get(stringify);
    if (lookupEntryEntry === undefined) {
      lookupEntry.set(stringify, {
        d: options2
          ? {
              ...isEditorSelectionAndTablesComponent3,
              resolved: true,
            }
          : isEditorSelectionAndTablesComponent3,
        ids: [event.id],
      });
    } else {
      if (!lookupEntryEntry.ids.includes(event.id)) {
        lookupEntryEntry.ids.push(event.id);
      }
    }
  };
  for (let updateEditorSelectionAndTablesResolvedResult of updateEditorSelectionAndTablesResolved2 as Dynamic)
    if (
      !updateEditorSelectionAndTablesResolvedResult.resolved &&
      !updateEditorSelectionAndTablesResolvedResult.deleted
    ) {
      resolveEditorSelectionAndTablesNull2(
        updateEditorSelectionAndTablesResolvedResult,
        false,
      );
    }
  if (options !== null)
    for (let updateEditorSelectionAndTablesResolvedResult of options as Dynamic)
      if (
        updateEditorSelectionAndTablesResolvedResult.resolved &&
        !updateEditorSelectionAndTablesResolvedResult.deleted
      ) {
        resolveEditorSelectionAndTablesNull2(
          updateEditorSelectionAndTablesResolvedResult,
          true,
        );
      }
  let byNode: Dynamic = {};
  for (let [
    updateEditorSelectionAndTablesResolvedResult,
    updateEditorSelectionAndTablesResolvedResult2,
  ] of lookup as Dynamic) {
    let items: Dynamic = [];
    for (let {
      d: updateEditorSelectionAndTablesResolvedResult3,
      ids: ids,
    } of updateEditorSelectionAndTablesResolvedResult2.values() as Dynamic)
      items.push(
        Object.assign({}, updateEditorSelectionAndTablesResolvedResult3, {
          ids: ids,
        }),
      );
    byNode[updateEditorSelectionAndTablesResolvedResult] = items;
  }
  let nodeId: Dynamic =
    context && context.react === undefined ? context.nodeId : undefined;
  let isEditorSelectionAndTablesComponent2: Dynamic = nodeId
    ? isEditorSelectionAndTablesComponent(context.segment, context.citation)
    : null;
  return {
    byNode: byNode,
    draft:
      isEditorSelectionAndTablesComponent2 === null
        ? null
        : {
            ...isEditorSelectionAndTablesComponent2,
            nodeId: nodeId,
          },
  };
}

var EditorSelectionAndTablesThisBlockChangedSinceItWasLastPublished: string;

var EditorSelectionAndTablesPublishItAgainToUpdateTheRender: string;

var EditorSelectionAndTablesPrototype: MouseEvent | undefined;

var EditorSelectionAndTablesGetPrototypeOf: Dynamic;

var resolveEditorSelectionAndTablesValue8: Dynamic;

var resolveEditorSelectionAndTablesText3: Dynamic;

function resolveEditorSelectionAndTablesBongoPr(
  editorSelectionAndTablesBongoPr?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return editorSelectionAndTablesBongoPr.pref === true ||
    (editorSelectionAndTablesBongoPr.appId != null &&
      editorSelectionAndTablesBongoPr.appId.startsWith(`bongo-pr-`))
    ? true
    : editorSelectionAndTablesBongoPr.envOverride === `1`;
}

function resolveEditorSelectionAndTablesValue9(
  editorSelectionAndTablesValue9?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return resolveEditorSelectionAndTablesBongoPr(editorSelectionAndTablesValue9);
}

function resolveEditorSelectionAndTablesValue10(
  editorSelectionAndTablesValue10?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return resolveEditorSelectionAndTablesBongoPr(
    editorSelectionAndTablesValue10,
  );
}

function resolveEditorSelectionAndTablesPref(
  pref?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return resolveEditorSelectionAndTablesValue10({
    pref: pref,
    appId: /^\d+$/.test(``) ? `bongo-pr-` : null,
    envOverride: null,
  });
}

function resolveEditorSelectionAndTablesPref2(
  pref?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return resolveEditorSelectionAndTablesValue9({
    pref: pref,
    appId: /^\d+$/.test(``) ? `bongo-pr-` : null,
    envOverride: null,
  });
}

function resolveEditorSelectionAndTablesLocale(
  editorSelectionAndTablesLocale?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    editorSelectionAndTablesLocale.locale !== undefined ||
    editorSelectionAndTablesLocale.timeZone !== undefined
  );
}

var EditorSelectionAndTablesAsk: Dynamic;

function updateEditorSelectionAndTablesAsk(
  bid?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (bid.length !== 0) {
    EditorSelectionAndTablesAsk.setState(
      (
        updateEditorSelectionAndTablesAsk2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => ({
        ask: {
          bid: bid,
          n: (updateEditorSelectionAndTablesAsk2.ask?.n ?? 0) + 1,
        },
      }),
    );
  }
}

var editorSelectionAndTablesPattern6: RegExp;

var EditorSelectionAndTablesComment: string;

var EditorSelectionAndTablesThread: string;

function resolveEditorSelectionAndTablesHash(
  editorSelectionAndTablesHash?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let replace: Dynamic =
    typeof editorSelectionAndTablesHash.hash == `string`
      ? editorSelectionAndTablesHash.hash.replace(/^#/, ``)
      : ``;
  let item = [
    EditorSelectionAndTablesComment,
    EditorSelectionAndTablesThread,
  ].find(
    (item2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      replace.startsWith(item2),
  );
  if (item === undefined) return null;
  let replaceSlice: Dynamic = replace.slice(item.length);
  return editorSelectionAndTablesPattern6.test(replaceSlice)
    ? replaceSlice
    : null;
}

function resolveEditorSelectionAndTablesRoot(
  editorSelectionAndTablesRoot?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  for (let file of editorSelectionAndTablesRoot as Dynamic)
    if (
      file.id === options ||
      file.root?.id === options ||
      file.replies?.some(
        (
          editorSelectionAndTablesRoot2?: Dynamic,
          ..._extraArguments: unknown[]
        ) => editorSelectionAndTablesRoot2.id === options,
      )
    )
      return file.id;
  return null;
}

function resolveEditorSelectionAndTablesKeys(
  editorSelectionAndTablesKeys?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  for (let resolveEditorSelectionAndTablesKeysResult of editorSelectionAndTablesKeys as Dynamic)
    for (let resolveEditorSelectionAndTablesKeysResult2 of Object.keys(
      resolveEditorSelectionAndTablesKeysResult,
    ) as Dynamic) {
      let resolveEditorSelectionAndTablesKeysResultItem: Dynamic =
        resolveEditorSelectionAndTablesKeysResult[
          resolveEditorSelectionAndTablesKeysResult2
        ];
      if (
        resolveEditorSelectionAndTablesKeysResultItem !== undefined &&
        resolveEditorSelectionAndTablesRoot(
          resolveEditorSelectionAndTablesKeysResultItem,
          options,
        ) !== null
      )
        return resolveEditorSelectionAndTablesKeysResult2;
    }
  return null;
}

var resolveEditorSelectionAndTablesValue11: (editorSelectionAndTablesValue11?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => string;

var EditorSelectionAndTablesState3: Dynamic;

function updateEditorSelectionAndTablesPublished(
  updateEditorSelectionAndTablesPublished2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let EditorSelectionAndTablesState3State: Dynamic =
    EditorSelectionAndTablesState3.getState();
  let record2: Dynamic = {
    ...EditorSelectionAndTablesState3State.value,
  };
  if (options === `published`) {
    delete record2[updateEditorSelectionAndTablesPublished2];
  } else {
    record2[updateEditorSelectionAndTablesPublished2] = options;
  }
  EditorSelectionAndTablesState3State.set(record2);
}

var EditorSelectionAndTablesByKey: Dynamic;

var EditorSelectionAndTablesByFile: Dynamic;

var EditorSelectionAndTablesByFile2: Dynamic;

var editorSelectionAndTablesValue0: number;

var resolveEditorSelectionAndTablesValue12: Dynamic;

var EditorSelectionAndTablesByKey2: Dynamic;

var editorSelectionAndTablesValue5000: number;

function isEditorSelectionAndTablesIsActive(
  editorSelectionAndTablesIsActive?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return !(
    !options ||
    editorSelectionAndTablesIsActive !== options ||
    !context ||
    context.isActive !== true
  );
}

var EditorSelectionAndTablesState4: number;

var EditorSelectionAndTablesSelection: Dynamic;

var EditorSelectionAndTablesSelection2: Dynamic;

function resolveEditorSelectionAndTablesLane(
  editorSelectionAndTablesLane?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!editorSelectionAndTablesLane)
    return {
      lane: `chat`,
      selection: {
        fileId: options.fileId,
        anchor: options.anchor,
      },
    };
  let text: Dynamic = (
    options.text ??
    resolveCommentsStoreNode(options.anchor) ??
    ``
  ).trim();
  return text
    ? {
        lane: `embed`,
        selection: {
          fileId: options.fileId,
          text: text,
          ...(options.nodeId === undefined
            ? {}
            : {
                nodeId: options.nodeId,
              }),
          userGesture: true,
          pinned: true,
        },
      }
    : null;
}

function updateEditorSelectionAndTablesChat(
  updateEditorSelectionAndTablesChat2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let editorSelectionAndTablesLane: Dynamic =
    resolveEditorSelectionAndTablesLane(
      updateEditorSelectionAndTablesChat2,
      options,
    );
  return editorSelectionAndTablesLane === null
    ? null
    : editorSelectionAndTablesLane.lane === `chat`
      ? (EditorSelectionAndTablesSelection2.getState().setSelection(
          editorSelectionAndTablesLane.selection,
        ),
        `chat`)
      : (EditorSelectionAndTablesSelection.getState().set(
          editorSelectionAndTablesLane.selection,
        ),
        `embed`);
}

var EditorSelectionAndTablesState5: Dynamic;

var EditorSelectionAndTablesPrefs: Dynamic;

var resolveEditorSelectionAndTablesReplace2: Dynamic;

var EditorSelectionAndTablesState6: Dynamic;

var EditorSelectionAndTablesState7: Dynamic;

var EditorSelectionAndTablesRequested: Dynamic;

var EditorSelectionAndTablesRoads: Dynamic;

var resolveEditorSelectionAndTablesSpellWords: Dynamic;

var EditorSelectionAndTablesState8: Dynamic;

function resolveEditorSelectionAndTablesKind(..._extraArguments: unknown[]) {
  let frameBootContainer2: Dynamic = frameBootContainer();
  return frameBootContainer2
    ? `:${frameBootContainer2.kind}/${frameBootContainer2.id}`
    : ``;
}

var editorSelectionAndTablesPattern7: RegExp;

function filterEditorSelectionAndTablesValue(
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = EditorSelectionAndTablesState8.getState().value;
  return Array.isArray(value)
    ? value
        .filter(
          (rolldownNImport2?: unknown, ..._extraArguments: unknown[]) =>
            typeof rolldownNImport2 == `string` &&
            editorSelectionAndTablesPattern7.test(rolldownNImport2),
        )
        .slice(0, 500)
    : [];
}

function filterEditorSelectionAndTablesText(
  filterEditorSelectionAndTablesText2?: Dynamic,
  items?: Dynamic,
  context: Dynamic = 50,
  dependencies: Dynamic = 2048,
  ..._extraArguments: unknown[]
): Dynamic {
  if (items.length === 0) return [];
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  for (let filterEditorSelectionAndTablesTextResult of filterEditorSelectionAndTablesText2 as Dynamic) {
    let editorSelectionAndTablesReplace2: Dynamic =
      resolveEditorSelectionAndTablesReplace2(
        filterEditorSelectionAndTablesTextResult.text,
      );
    for (let filterEditorSelectionAndTablesTextResult2 of [
      /[\p{L}\p{M}\p{N}'-]+/gu,
      /\p{L}(?:[\p{L}\p{M}']*\p{L})?/gu,
    ] as Dynamic)
      for (let filterEditorSelectionAndTablesTextResult3 of (editorSelectionAndTablesReplace2.match(
        filterEditorSelectionAndTablesTextResult2,
      ) ?? []) as Dynamic) {
        uniqueItems.add(filterEditorSelectionAndTablesTextResult3);
        if (filterEditorSelectionAndTablesTextResult3.endsWith(`'s`)) {
          uniqueItems.add(
            filterEditorSelectionAndTablesTextResult3.slice(0, -2),
          );
        }
      }
  }
  let items2: Dynamic = [];
  let count: number = 0;
  for (let filterEditorSelectionAndTablesTextResult of items
    .filter(
      (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        uniqueItems.has(item),
    )
    .toSorted() as Dynamic) {
    count +=
      new TextEncoder().encode(filterEditorSelectionAndTablesTextResult)
        .length + 2;
    if (items2.length >= context || count > dependencies) break;
    items2.push(filterEditorSelectionAndTablesTextResult);
  }
  return items2;
}

function isEditorSelectionAndTablesSpelling(
  editorSelectionAndTablesSpelling?: Dynamic,
  items?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (items.length === 0) return editorSelectionAndTablesSpelling;
  let uniqueItems: Dynamic = new (Set as Dynamic)(items);
  let slice: Dynamic = (
    editorSelectionAndTablesSpelling2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let editorSelectionAndTablesReplace2: Dynamic =
      resolveEditorSelectionAndTablesReplace2(
        editorSelectionAndTablesSpelling2.trim(),
      );
    return (
      uniqueItems.has(editorSelectionAndTablesReplace2) ||
      (editorSelectionAndTablesReplace2.endsWith(`'s`) &&
        uniqueItems.has(editorSelectionAndTablesReplace2.slice(0, -2)))
    );
  };
  return editorSelectionAndTablesSpelling.filter(
    (entry?: Dynamic, ..._extraArguments: unknown[]) =>
      !(entry.kind === `spelling` && slice(entry.quote)),
  );
}

var resolveEditorSelectionAndTablesValue13: Dynamic;

function resolveEditorSelectionAndTablesIncludes(
  editorSelectionAndTablesIncludes?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let editorSelectionAndTablesReplace2: Dynamic =
    resolveEditorSelectionAndTablesReplace2(options);
  return editorSelectionAndTablesReplace2.length === 0 ||
    editorSelectionAndTablesReplace2.length > 100 ||
    editorSelectionAndTablesIncludes.includes(editorSelectionAndTablesReplace2)
    ? null
    : [...editorSelectionAndTablesIncludes, editorSelectionAndTablesReplace2];
}

function updateEditorSelectionAndTablesSpellWords(
  updateEditorSelectionAndTablesSpellWords2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (inFrame()) {
    let filterEditorSelectionAndTablesValue2: Dynamic =
      filterEditorSelectionAndTablesValue();
    if (filterEditorSelectionAndTablesValue2.length >= 500) return;
    let editorSelectionAndTablesIncludes: Dynamic =
      resolveEditorSelectionAndTablesIncludes(
        filterEditorSelectionAndTablesValue2,
        updateEditorSelectionAndTablesSpellWords2,
      );
    if (
      editorSelectionAndTablesIncludes &&
      editorSelectionAndTablesPattern7.test(
        editorSelectionAndTablesIncludes[
          editorSelectionAndTablesIncludes.length - 1
        ],
      )
    ) {
      EditorSelectionAndTablesState8.getState().set(
        editorSelectionAndTablesIncludes,
      );
    }
    return;
  }
  if (!EditorSelectionAndTablesPrefs.getState().loadedOk) return;
  let spellWords: Dynamic = resolveEditorSelectionAndTablesIncludes(
    resolveEditorSelectionAndTablesSpellWords(),
    updateEditorSelectionAndTablesSpellWords2,
  );
  if (spellWords) {
    EditorSelectionAndTablesPrefs.getState().set({
      spellWords: spellWords,
    });
  }
}

var HorizontalRuleNode: Dynamic;

var editorSelectionAndTablesState: Dynamic;

var editorSelectionAndTablesState2: Dynamic;

var EditorSelectionAndTablesLeft: Dynamic;

function resolveEditorSelectionAndTablesColspan(
  editorSelectionAndTablesColspan?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (editorSelectionAndTablesColspan.type.spec.tableRole != `table`)
    throw RangeError(
      `Not a table node: ` + editorSelectionAndTablesColspan.type.name,
    );
  let editorSelectionAndTablesChildCount: Dynamic =
    resolveEditorSelectionAndTablesChildCount(editorSelectionAndTablesColspan);
  let childCount: Dynamic = editorSelectionAndTablesColspan.childCount;
  let items: Dynamic = [];
  let index: number = 0;
  let resolveEditorSelectionAndTablesColspanResult: Dynamic = null;
  let items2: Dynamic = [];
  for (
    let index2 = 0,
      amount: number = editorSelectionAndTablesChildCount * childCount;
    index2 < amount;
    index2++
  )
    items[index2] = 0;
  for (let row = 0, pos: number = 0; row < childCount; row++) {
    let child: Dynamic = editorSelectionAndTablesColspan.child(row);
    pos++;
    for (let index3 = 0; ; index3++) {
      for (; index < items.length && items[index] != 0; ) index++;
      if (index3 == child.childCount) break;
      let child2: Dynamic = child.child(index3);
      let {
        colspan: attrs,
        rowspan: attrs2,
        colwidth: attrs3,
      }: Dynamic = child2.attrs;
      for (let index4 = 0; index4 < attrs2; index4++) {
        if (index4 + row >= childCount) {
          (resolveEditorSelectionAndTablesColspanResult ||= []).push({
            type: `overlong_rowspan`,
            pos: pos,
            n: attrs2 - index4,
          });
          break;
        }
        let total: Dynamic =
          index + index4 * editorSelectionAndTablesChildCount;
        for (let index5 = 0; index5 < attrs; index5++) {
          if (items[total + index5] == 0) {
            items[total + index5] = pos;
          } else {
            (resolveEditorSelectionAndTablesColspanResult ||= []).push({
              type: `collision`,
              row: row,
              pos: pos,
              n: attrs - index5,
            });
          }
          let attrs4: Dynamic = attrs3 && attrs3[index5];
          if (attrs4) {
            let amount2 =
              ((total + index5) % editorSelectionAndTablesChildCount) * 2;
            let itemItem: Dynamic = items2[amount2];
            if (
              itemItem == null ||
              (itemItem != attrs4 && items2[amount2 + 1] == 1)
            ) {
              items2[amount2] = attrs4;
              items2[amount2 + 1] = 1;
            } else {
              if (itemItem == attrs4) {
                items2[amount2 + 1]++;
              }
            }
          }
        }
      }
      index += attrs;
      pos += child2.nodeSize;
    }
    let amount: number = (row + 1) * editorSelectionAndTablesChildCount;
    let index2 = 0;
    for (; index < amount; )
      if (items[index++] == 0) {
        index2++;
      }
    if (index2) {
      (resolveEditorSelectionAndTablesColspanResult ||= []).push({
        type: `missing`,
        row: row,
        n: index2,
      });
    }
    pos++;
  }
  if (editorSelectionAndTablesChildCount === 0 || childCount === 0) {
    (resolveEditorSelectionAndTablesColspanResult ||= []).push({
      type: `zero_sized`,
    });
  }
  let editorSelectionAndTablesLeft: Dynamic =
    new (EditorSelectionAndTablesLeft as Dynamic)(
      editorSelectionAndTablesChildCount,
      childCount,
      items,
      resolveEditorSelectionAndTablesColspanResult,
    );
  let enabled = false;
  for (let count: number = 0; !enabled && count < items2.length; count += 2)
    if (items2[count] != null && items2[count + 1] < childCount) {
      enabled = true;
    }
  if (enabled) {
    resolveEditorSelectionAndTablesPos(
      editorSelectionAndTablesLeft,
      items2,
      editorSelectionAndTablesColspan,
    );
  }
  return editorSelectionAndTablesLeft;
}

function resolveEditorSelectionAndTablesChildCount(
  editorSelectionAndTablesChildCount?: Dynamic,
  ..._extraArguments: unknown[]
): number {
  let resolveEditorSelectionAndTablesChildCountResult: number = -1;
  let enabled = false;
  for (
    let index = 0;
    index < editorSelectionAndTablesChildCount.childCount;
    index++
  ) {
    let child: Dynamic = editorSelectionAndTablesChildCount.child(index);
    let count: number = 0;
    if (enabled)
      for (let index2 = 0; index2 < index; index2++) {
        let child2: Dynamic = editorSelectionAndTablesChildCount.child(index2);
        for (let index3 = 0; index3 < child2.childCount; index3++) {
          let child3: Dynamic = child2.child(index3);
          if (index2 + child3.attrs.rowspan > index) {
            count += child3.attrs.colspan;
          }
        }
      }
    for (let index2 = 0; index2 < child.childCount; index2++) {
      let child2: Dynamic = child.child(index2);
      count += child2.attrs.colspan;
      if (child2.attrs.rowspan > 1) {
        enabled = true;
      }
    }
    if (resolveEditorSelectionAndTablesChildCountResult == -1) {
      resolveEditorSelectionAndTablesChildCountResult = count;
    } else {
      if (resolveEditorSelectionAndTablesChildCountResult != count) {
        resolveEditorSelectionAndTablesChildCountResult = Math.max(
          resolveEditorSelectionAndTablesChildCountResult,
          count,
        );
      }
    }
  }
  return resolveEditorSelectionAndTablesChildCountResult;
}

function resolveEditorSelectionAndTablesPos(
  editorSelectionAndTablesPos?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  editorSelectionAndTablesPos.problems ||= [];
  let record2: Dynamic = {};
  for (let index = 0; index < editorSelectionAndTablesPos.map.length; index++) {
    let pos: Dynamic = editorSelectionAndTablesPos.map[index];
    if (record2[pos]) continue;
    record2[pos] = true;
    let nodeAt: Dynamic = context.nodeAt(pos);
    if (!nodeAt) throw RangeError(`No cell with offset ${pos} found`);
    let colwidth: Dynamic = null;
    let attrs: Dynamic = nodeAt.attrs;
    for (let index2 = 0; index2 < attrs.colspan; index2++) {
      let optionItem: Dynamic =
        options[((index + index2) % editorSelectionAndTablesPos.width) * 2];
      if (
        optionItem != null &&
        (!attrs.colwidth || attrs.colwidth[index2] != optionItem)
      ) {
        (colwidth ||= resolveEditorSelectionAndTablesColwidth(attrs))[index2] =
          optionItem;
      }
    }
    if (colwidth) {
      editorSelectionAndTablesPos.problems.unshift({
        type: `colwidth mismatch`,
        pos: pos,
        colwidth: colwidth,
      });
    }
  }
}

function resolveEditorSelectionAndTablesColwidth(
  editorSelectionAndTablesColwidth?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (editorSelectionAndTablesColwidth.colwidth)
    return editorSelectionAndTablesColwidth.colwidth.slice();
  let items: Dynamic = [];
  for (let index = 0; index < editorSelectionAndTablesColwidth.colspan; index++)
    items.push(0);
  return items;
}

function resolveEditorSelectionAndTablesTableNodeTypes(
  file?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let tableNodeTypes: Dynamic = file.cached.tableNodeTypes;
  if (!tableNodeTypes) {
    tableNodeTypes = file.cached.tableNodeTypes = {};
    for (let resolveEditorSelectionAndTablesTableNodeTypesResult in file.nodes) {
      let nodeItem: Dynamic =
        file.nodes[resolveEditorSelectionAndTablesTableNodeTypesResult];
      let tableRole: Dynamic = nodeItem.spec.tableRole;
      if (tableRole) {
        tableNodeTypes[tableRole] = nodeItem;
      }
    }
  }
  return tableNodeTypes;
}

var SelectingCellsPluginKey: Dynamic;

function resolveEditorSelectionAndTablesDepth(
  editorSelectionAndTablesDepth?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  for (
    let difference = editorSelectionAndTablesDepth.depth - 1;
    difference > 0;
    difference--
  )
    if (
      editorSelectionAndTablesDepth.node(difference).type.spec.tableRole ==
      `row`
    )
      return editorSelectionAndTablesDepth
        .node(0)
        .resolve(editorSelectionAndTablesDepth.before(difference + 1));
  return null;
}

function resolveEditorSelectionAndTablesCell(
  editorSelectionAndTablesCell?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  for (
    let depth: Dynamic = editorSelectionAndTablesCell.depth;
    depth > 0;
    depth--
  ) {
    let tableRole: Dynamic =
      editorSelectionAndTablesCell.node(depth).type.spec.tableRole;
    if (tableRole === `cell` || tableRole === `header_cell`)
      return editorSelectionAndTablesCell.node(depth);
  }
  return null;
}

function isEditorSelectionAndTablesHead(
  editorSelectionAndTablesHead?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let $head: Dynamic = editorSelectionAndTablesHead.selection.$head;
  for (let depth: Dynamic = $head.depth; depth > 0; depth--)
    if ($head.node(depth).type.spec.tableRole == `row`) return true;
  return false;
}

function resolveEditorSelectionAndTablesNode(
  editorSelectionAndTablesNode?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let selection: Dynamic = editorSelectionAndTablesNode.selection;
  if (`$anchorCell` in selection && selection.$anchorCell)
    return selection.$anchorCell.pos > selection.$headCell.pos
      ? selection.$anchorCell
      : selection.$headCell;
  if (
    `node` in selection &&
    selection.node &&
    selection.node.type.spec.tableRole == `cell`
  )
    return selection.$anchor;
  let editorSelectionAndTablesDepth: Dynamic =
    resolveEditorSelectionAndTablesDepth(selection.$head) ||
    resolveEditorSelectionAndTablesCell2(selection.$head);
  if (editorSelectionAndTablesDepth) return editorSelectionAndTablesDepth;
  throw RangeError(`No cell found around position ${selection.head}`);
}

function resolveEditorSelectionAndTablesCell2(
  editorSelectionAndTablesCell2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  for (
    let nodeAfter: Dynamic = editorSelectionAndTablesCell2.nodeAfter,
      pos: Dynamic = editorSelectionAndTablesCell2.pos;
    nodeAfter;
    nodeAfter = nodeAfter.firstChild, pos++
  ) {
    let tableRole: Dynamic = nodeAfter.type.spec.tableRole;
    if (tableRole == `cell` || tableRole == `header_cell`)
      return editorSelectionAndTablesCell2.doc.resolve(pos);
  }
  for (
    let nodeBefore: Dynamic = editorSelectionAndTablesCell2.nodeBefore,
      pos: Dynamic = editorSelectionAndTablesCell2.pos;
    nodeBefore;
    nodeBefore = nodeBefore.lastChild, pos--
  ) {
    let tableRole: Dynamic = nodeBefore.type.spec.tableRole;
    if (tableRole == `cell` || tableRole == `header_cell`)
      return editorSelectionAndTablesCell2.doc.resolve(
        pos - nodeBefore.nodeSize,
      );
  }
}

function resolveEditorSelectionAndTablesTableRole(
  editorSelectionAndTablesTableRole?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    editorSelectionAndTablesTableRole.parent.type.spec.tableRole == `row` &&
    !!editorSelectionAndTablesTableRole.nodeAfter
  );
}

function resolveEditorSelectionAndTablesResolve(
  editorSelectionAndTablesResolve?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return editorSelectionAndTablesResolve
    .node(0)
    .resolve(
      editorSelectionAndTablesResolve.pos +
        editorSelectionAndTablesResolve.nodeAfter.nodeSize,
    );
}

function resolveEditorSelectionAndTablesDepth2(
  editorSelectionAndTablesDepth2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return (
    editorSelectionAndTablesDepth2.depth == options.depth &&
    editorSelectionAndTablesDepth2.pos >= options.start(-1) &&
    editorSelectionAndTablesDepth2.pos <= options.end(-1)
  );
}

function getEditorSelectionAndTablesNode(
  editorSelectionAndTablesNode?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let node: Dynamic = editorSelectionAndTablesNode.node(-1);
  let EditorSelectionAndTablesLeftEntry: Dynamic =
    EditorSelectionAndTablesLeft.get(node);
  let start: Dynamic = editorSelectionAndTablesNode.start(-1);
  let nextCell: Dynamic = EditorSelectionAndTablesLeftEntry.nextCell(
    editorSelectionAndTablesNode.pos - start,
    options,
    context,
  );
  return nextCell == null
    ? null
    : editorSelectionAndTablesNode.node(0).resolve(start + nextCell);
}

function resolveEditorSelectionAndTablesColspan2(
  editorSelectionAndTablesColspan2?: Dynamic,
  options?: Dynamic,
  context: Dynamic = 1,
  ..._extraArguments: unknown[]
): Dynamic {
  let record2: Dynamic = {
    ...editorSelectionAndTablesColspan2,
    colspan: editorSelectionAndTablesColspan2.colspan - context,
  };
  if (record2.colwidth) {
    record2.colwidth = record2.colwidth.slice();
    record2.colwidth.splice(options, context);
    if (
      !record2.colwidth.some(
        (colwidth?: Dynamic, ..._extraArguments: unknown[]) => colwidth > 0,
      )
    ) {
      record2.colwidth = null;
    }
  }
  return record2;
}

function resolveEditorSelectionAndTablesColspan3(
  editorSelectionAndTablesColspan3?: Dynamic,
  options?: Dynamic,
  context: Dynamic = 1,
  ..._extraArguments: unknown[]
): Dynamic {
  let record2: Dynamic = {
    ...editorSelectionAndTablesColspan3,
    colspan: editorSelectionAndTablesColspan3.colspan + context,
  };
  if (record2.colwidth) {
    record2.colwidth = record2.colwidth.slice();
    for (let index = 0; index < context; index++)
      record2.colwidth.splice(options, 0, 0);
  }
  return record2;
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeEditorSelectionAndTables1Step1(): void {
  (resolveEditorSelectionAndTablesValue = (
    ..._extraArguments: unknown[]
  ): Dynamic => isEditorExtensionsValue());
  (editorSelectionAndTablesPattern = /^(?:fn|routine):[\w-]{1,64}$/);
  (resolveEditorSelectionAndTablesTest = (
    editorSelectionAndTablesTest?: Dynamic,
    ..._extraArguments: unknown[]
  ) => editorSelectionAndTablesPattern.test(editorSelectionAndTablesTest));
  (resolveEditorSelectionAndTablesType = (
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let index = 0;
    return function (
      this: Dynamic,
      editorSelectionAndTablesType?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      if (++index > 1e4) throw TypeError(`non-reviewable: too many nodes`);
      let options2: Dynamic =
        this == null ? options : this[editorSelectionAndTablesType];
      if (typeof options2 == `bigint`)
        return {
          __type: `BigInt`,
          value: options2.toString(),
        };
      if (typeof options2 != `object` || !options2) {
        if (
          typeof options2 == `number` &&
          (!Number.isFinite(options2) || Object.is(options2, -0))
        )
          throw TypeError(`non-reviewable: non-finite number`);
        if (options2 === undefined) throw TypeError(`non-reviewable: undefined`);
        return options;
      }
      if (options2 instanceof (Map as Dynamic))
        return {
          __type: `Map`,
          entries: [...options2],
        };
      if (options2 instanceof (Set as Dynamic))
        return {
          __type: `Set`,
          values: [...options2],
        };
      let callSlice = Object.prototype.toString.call(options2).slice(8, -1);
      if (
        options2 instanceof Date ||
        options2 instanceof RegExp ||
        options2 instanceof Error ||
        options2 instanceof ArrayBuffer ||
        (ArrayBuffer.isView as Dynamic)(options2) ||
        (typeof Blob !== "undefined" && options2 instanceof Blob) ||
        callSlice === `Number` ||
        callSlice === `String` ||
        callSlice === `Boolean` ||
        typeof options2.toJSON == `function`
      )
        throw TypeError(`non-reviewable: ${callSlice}`);
      if (Array.isArray(options2)) {
        let optionsKeys = Object.keys(options2);
        if (
          optionsKeys.length !== options2.length ||
          !optionsKeys.every(
            (
              rolldownNImport2?: Dynamic,
              index2?: Dynamic,
              ..._extraArguments: unknown[]
            ) => rolldownNImport2 === String(index2),
          )
        )
          throw TypeError(`non-reviewable: array has non-index properties`);
        return options2;
      }
      let prototypeOf: Dynamic = Object.getPrototypeOf(options2);
      if (prototypeOf !== Object.prototype && prototypeOf !== null)
        throw TypeError(`non-reviewable: ${callSlice}`);
      if (Object.hasOwn(options2, `__type`))
        throw TypeError(`non-reviewable: __type sentinel collision`);
      let create2: Dynamic = Object.create(null);
      for (let resolveEditorSelectionAndTablesTypeResult of Object.keys(
        options2,
      ).toSorted() as Dynamic)
        create2[resolveEditorSelectionAndTablesTypeResult] =
          options2[resolveEditorSelectionAndTablesTypeResult];
      return create2;
    };
  });
  (resolveEditorSelectionAndTablesValue2 = (
    editorSelectionAndTablesValue2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    try {
      return JSON.stringify(
        editorSelectionAndTablesValue2 ?? null,
        resolveEditorSelectionAndTablesType(),
      );
    } catch {
      return null;
    }
  });
  (resolveEditorSelectionAndTablesValue3 = (
    editorSelectionAndTablesValue3?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `bridge-v2-confirm-skip:${editorSelectionAndTablesValue3}:${options}`);
  (resolveEditorSelectionAndTablesGetItem = (
    editorSelectionAndTablesGetItem?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    try {
      return sessionStorage.getItem(editorSelectionAndTablesGetItem);
    } catch {
      return null;
    }
  });
  (resolveEditorSelectionAndTablesSetItem = (
    editorSelectionAndTablesSetItem?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    try {
      sessionStorage.setItem(editorSelectionAndTablesSetItem, options);
    } catch {}
  });
  (editorSelectionAndTablesValue8192 = 8192);
  (resolveEditorSelectionAndTablesText = (
    editorSelectionAndTablesText?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    if (editorSelectionAndTablesText == null)
      return {
        text: ``,
        serializable: true,
        truncated: false,
      };
    try {
      let text = JSON.stringify(
        editorSelectionAndTablesText,
        resolveEditorSelectionAndTablesType(),
        2,
      );
      return text.length > 8192
        ? {
            text: `${text.slice(0, editorSelectionAndTablesValue8192)}\n… (${text.length - editorSelectionAndTablesValue8192} more chars)`,
            serializable: true,
            truncated: true,
          }
        : {
            text: text,
            serializable: true,
            truncated: false,
          };
    } catch {
      return {
        text: `(unserializable params)`,
        serializable: false,
        truncated: false,
      };
    }
  });
  (resolveEditorSelectionAndTablesReplace = (
    editorSelectionAndTablesReplace?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    resolveEditorSelectionAndTablesTest(editorSelectionAndTablesReplace)
      ? editorSelectionAndTablesReplace.replace(/^(?:fn|routine):/, ``)
      : `(invalid ref)`);
  (EditorSelectionAndTablesDataPagesPrintSurface = `data-pages-print-surface`);
  (EditorSelectionAndTablesPagesPrintDocH = `--pages-print-doc-h`);
  (EditorSelectionAndTablesDataPagesPrintMirror = `data-pages-print-mirror`);
  (EditorSelectionAndTablesDataPagesPrintGhost = `data-pages-print-ghost`);
  (EditorSelectionAndTablesDataPagesPrintSkip = `data-pages-print-skip`);
  (EditorSelectionAndTablesState = `[${EditorSelectionAndTablesDataPagesPrintSurface}]`);
  (EditorSelectionAndTablesState2 = `${`html[${EditorSelectionAndTablesDataPagesPrintMirror}]{height:100%;contain:paint;overflow:hidden}html[${EditorSelectionAndTablesDataPagesPrintMirror}] [${EditorSelectionAndTablesDataPagesPrintGhost}]{height:max(0px,calc(var(${EditorSelectionAndTablesPagesPrintDocH},0px) - 100vh));visibility:hidden;pointer-events:none}`}${EditorHostStyles6}@media print{${`html,body{background:#fff!important;height:auto!important;min-height:0!important;max-height:none!important;overflow:visible!important;contain:none!important;margin:0!important;padding:0!important}body:has(${EditorSelectionAndTablesState}) :not(:has(${EditorSelectionAndTablesState})):not(${EditorSelectionAndTablesState}){display:none!important}body:has(${EditorSelectionAndTablesState}) :has(${EditorSelectionAndTablesState}){display:block!important;position:static!important;inset:auto!important;float:none!important;width:auto!important;min-width:0!important;max-width:none!important;height:auto!important;min-height:0!important;max-height:none!important;margin:0!important;padding:0!important;border:0!important;border-radius:0!important;outline:0!important;box-shadow:none!important;background:transparent!important;overflow:visible!important;clip-path:none!important;mask:none!important;transform:none!important;filter:none!important;opacity:1!important;visibility:visible!important;contain:none!important;zoom:1!important}body [${EditorSelectionAndTablesDataPagesPrintSkip}]:has(${EditorSelectionAndTablesState}),body [${EditorSelectionAndTablesDataPagesPrintSkip}] ${EditorSelectionAndTablesState}{display:none!important}${EditorSelectionAndTablesState}{display:block!important;position:static!important;box-sizing:border-box!important;width:100%!important;min-width:0!important;max-width:100%!important;height:var(${EditorSelectionAndTablesPagesPrintDocH},100vh)!important;min-height:0!important;max-height:none!important;margin:0!important;border:0!important;transform:none!important;opacity:1!important;visibility:visible!important}`}}`);
  (editorSelectionAndTablesValue200000 = 2e5);
  (editorSelectionAndTablesWeakMap = new (WeakMap as Dynamic)());
  (resolveEditorSelectionAndTablesValue4 = (
    element?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    element.querySelector(
      `body>[${EditorSelectionAndTablesDataPagesPrintGhost}]`,
    ));
  (EditorSelectionAndTablesHide = `hide`);
  (resolveEditorSelectionAndTablesTrim = (
    editorSelectionAndTablesTrim?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => (editorSelectionAndTablesTrim ?? ``).replace(/\s+/g, ` `).trim());
  (editorSelectionAndTablesSet = new (Set as Dynamic)([
    `not_declared`,
    `no_shell`,
    `timeout`,
  ]));
  (resolveEditorSelectionAndTablesStaged = (
    editorSelectionAndTablesStaged?: Dynamic,
    ..._extraArguments: unknown[]
  ) => (editorSelectionAndTablesStaged === `staged` ? `staged` : `unavailable`));
  (resolveEditorSelectionAndTablesValue5 = (
    editorSelectionAndTablesValue5?: Dynamic,
    ..._extraArguments: unknown[]
  ) => editorSelectionAndTablesValue5 !== undefined);
  (EditorSelectionAndTablesDataClaudeTextJsonPath = `data-claude-text-json-path`);
  `${EditorSelectionAndTablesDataClaudeTextJsonPath}`;
  (EditorSelectionAndTablesReason = {
    reason: `shape`,
    detail:
      "`value` is empty — to delete the text send value: null; to change it send the new string",
  });
  (EditorSelectionAndTablesReason2 = `${EditorSelectionAndTablesReason.reason}: ${EditorSelectionAndTablesReason.detail}`);
  (editorSelectionAndTablesPattern2 = /^[A-Za-z0-9_-]{1,128}$/);
  (editorSelectionAndTablesPattern3 = /^[A-Za-z_][A-Za-z0-9_]{0,63}$/);
  (editorSelectionAndTablesPattern4 = /^(?:0|[1-9][0-9]{0,3})$/);
  (editorSelectionAndTablesSet2 = new (Set as Dynamic)([
    `__proto__`,
    `constructor`,
    `prototype`,
  ]));
  (EditorSelectionAndTablesJsonPath = `json-path:`);
  new (Set as Dynamic)([
    EditorSelectionAndTablesDataClaudeTextJsonPath,
    `data-chart-role`,
    `data-chart-role-key`,
    `data-chart-slot`,
  ]);
  (editorSelectionAndTablesIdentifierPattern = /claude-text-id\s*=\s*["'][^"']+["'][^>]*[^/>]>\s*([^<{][^<]*)</);
  (editorSelectionAndTablesPattern5 = /<h[1-4](?:\s[^>]*)?>\s*([^<{][^<]*)</);
  (editorSelectionAndTablesValue80 = 80);
  (resolveEditorSelectionAndTablesSlice2 = (
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    items.length > editorSelectionAndTablesValue80
      ? `${items.slice(0, editorSelectionAndTablesValue80)}…`
      : items);
  `${EditorHostDataLfileDatumThreads}${EditorHostDataLfileDatumDraft}`;
  `${EditorHostDataLfileWidget}`;
  (resolveEditorSelectionAndTablesValue7 = (
    items?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    items === null ||
    typeof items == `number` ||
    typeof items == `boolean` ||
    (typeof items == `string` && items.length <= 512));
  (EditorSelectionAndTablesThisBlockChangedSinceItWasLastPublished = `This block changed since it was last published.`);
  (EditorSelectionAndTablesPublishItAgainToUpdateTheRender = `Publish it again to update the render.`);
  Element.prototype.getBoundingClientRect;
  if (!(typeof UIEvent === "undefined")) {
    Object.getOwnPropertyDescriptor(UIEvent.prototype, `detail`)?.get;
  }
  (EditorSelectionAndTablesPrototype = typeof MouseEvent === "undefined" ? undefined : MouseEvent.prototype);
  if (EditorSelectionAndTablesPrototype) {
    Object.getOwnPropertyDescriptor(EditorSelectionAndTablesPrototype, `metaKey`)
      ?.get;
  }
  if (EditorSelectionAndTablesPrototype) {
    Object.getOwnPropertyDescriptor(EditorSelectionAndTablesPrototype, `ctrlKey`)
      ?.get;
  }
  if (EditorSelectionAndTablesPrototype) {
    Object.getOwnPropertyDescriptor(EditorSelectionAndTablesPrototype, `button`)
      ?.get;
  }
  (EditorSelectionAndTablesGetPrototypeOf = typeof Node === "undefined"
      ? undefined
      : Object.getPrototypeOf(Node.prototype));
  if (EditorSelectionAndTablesGetPrototypeOf) {
    Object.getOwnPropertyDescriptor(
      EditorSelectionAndTablesGetPrototypeOf,
      `addEventListener`,
    )?.value;
  }
  if (EditorSelectionAndTablesGetPrototypeOf) {
    Object.getOwnPropertyDescriptor(
      EditorSelectionAndTablesGetPrototypeOf,
      `removeEventListener`,
    )?.value;
  }
  if (!(typeof Event === "undefined")) {
    Object.getOwnPropertyDescriptor(new Event(`_`), `isTrusted`)?.get;
  }
  /Mac|iPhone|iPad|iPod/.test(
    typeof navigator !== "undefined" ? (navigator.platform ?? ``) : ``,
  );
  (resolveEditorSelectionAndTablesValue8 = (
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => (items.length > 400 ? `` : items));
  (resolveEditorSelectionAndTablesText3 = (
    items?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    text: resolveEditorSelectionAndTablesValue8(items),
    textCapped: items.length > 400,
  }));
  (EditorSelectionAndTablesAsk = create(
    (..._extraArguments: unknown[]) => ({
      ask: null,
    }),
  ));
  (editorSelectionAndTablesPattern6 = /^[A-Za-z0-9._:~-]{1,128}$/);
  (EditorSelectionAndTablesComment = `comment-`);
  (EditorSelectionAndTablesThread = `thread-`);
  (resolveEditorSelectionAndTablesValue11 = (
    editorSelectionAndTablesValue11?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => `${editorSelectionAndTablesValue11}#${options}`);
  (EditorSelectionAndTablesState3 = updateDataModelSchemasValue(
    `widgetPanel.viewMode`,
    {},
  ));
  (EditorSelectionAndTablesByKey = create(
    (
      editorSelectionAndTablesByKey?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      byKey: {},
      mark: (
        editorSelectionAndTablesByKey2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        editorSelectionAndTablesByKey(
          (
            editorSelectionAndTablesByKey3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            editorSelectionAndTablesByKey3.byKey[editorSelectionAndTablesByKey2]
              ? editorSelectionAndTablesByKey3
              : {
                  byKey: {
                    ...editorSelectionAndTablesByKey3.byKey,
                    [editorSelectionAndTablesByKey2]: true,
                  },
                },
        ),
      clear: (
        editorSelectionAndTablesByKey2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        editorSelectionAndTablesByKey(
          (
            editorSelectionAndTablesByKey3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            if (
              !(
                editorSelectionAndTablesByKey2 in
                editorSelectionAndTablesByKey3.byKey
              )
            )
              return editorSelectionAndTablesByKey3;
            let byKey: Dynamic = {
              ...editorSelectionAndTablesByKey3.byKey,
            };
            delete byKey[editorSelectionAndTablesByKey2];
            return {
              byKey: byKey,
            };
          },
        ),
    }),
  ));
  (EditorSelectionAndTablesByFile = create(
    (
      editorSelectionAndTablesByFile?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      byFile: {},
      set: (
        editorSelectionAndTablesByFile2?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        editorSelectionAndTablesByFile(
          (
            editorSelectionAndTablesByFile3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let byFileItem: Dynamic =
              editorSelectionAndTablesByFile3.byFile[
                editorSelectionAndTablesByFile2
              ];
            return byFileItem &&
              byFileItem.size === options.size &&
              [...options].every(
                (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                  byFileItem.has(item),
              )
              ? editorSelectionAndTablesByFile3
              : {
                  byFile: {
                    ...editorSelectionAndTablesByFile3.byFile,
                    [editorSelectionAndTablesByFile2]: options,
                  },
                };
          },
        ),
    }),
  ));
  (EditorSelectionAndTablesByFile2 = create(
    (
      editorSelectionAndTablesByFile2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      byFile: {},
      set: (
        editorSelectionAndTablesByFile22?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        editorSelectionAndTablesByFile2(
          (
            editorSelectionAndTablesByFile23?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            let byFileItem: Dynamic =
              editorSelectionAndTablesByFile23.byFile[
                editorSelectionAndTablesByFile22
              ];
            if (byFileItem) {
              let byFileItemKeys = Object.keys(byFileItem);
              if (
                byFileItemKeys.length === Object.keys(options).length &&
                byFileItemKeys.every(
                  (rolldownRImport2?: Dynamic, ..._extraArguments: unknown[]) => {
                    let byFileItemItem: Dynamic = byFileItem[rolldownRImport2];
                    let optionItem: Dynamic = options[rolldownRImport2];
                    return (
                      byFileItemItem !== undefined &&
                      optionItem !== undefined &&
                      byFileItemItem.top === optionItem.top &&
                      byFileItemItem.left === optionItem.left &&
                      byFileItemItem.width === optionItem.width &&
                      byFileItemItem.noun === optionItem.noun
                    );
                  },
                )
              )
                return editorSelectionAndTablesByFile23;
            } else if (Object.keys(options).length === 0)
              return editorSelectionAndTablesByFile23;
            return {
              byFile: {
                ...editorSelectionAndTablesByFile23.byFile,
                [editorSelectionAndTablesByFile22]: options,
              },
            };
          },
        ),
    }),
  ));
  (editorSelectionAndTablesValue0 = 0);
  (resolveEditorSelectionAndTablesValue12 = (
    ..._extraArguments: unknown[]
  ): number => ++editorSelectionAndTablesValue0);
  (EditorSelectionAndTablesByKey2 = create(
    (
      editorSelectionAndTablesByKey2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      byKey: {},
      set: (
        editorSelectionAndTablesByKey22?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        editorSelectionAndTablesByKey2(
          (
            editorSelectionAndTablesByKey23?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            if (options === null) {
              if (
                !(
                  editorSelectionAndTablesByKey22 in
                  editorSelectionAndTablesByKey23.byKey
                )
              )
                return editorSelectionAndTablesByKey23;
              let byKey: Dynamic = {
                ...editorSelectionAndTablesByKey23.byKey,
              };
              delete byKey[editorSelectionAndTablesByKey22];
              return {
                byKey: byKey,
              };
            }
            return {
              byKey: {
                ...editorSelectionAndTablesByKey23.byKey,
                [editorSelectionAndTablesByKey22]: options,
              },
            };
          },
        ),
    }),
  ));
  Date.now;
  (editorSelectionAndTablesValue5000 = 5e3);
  (EditorSelectionAndTablesState4 = editorSelectionAndTablesValue5000);
  (EditorSelectionAndTablesSelection = create(
    (
      editorSelectionAndTablesSelection?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      selection: null,
      pinNonce: 0,
      set: (
        editorSelectionAndTablesSelection2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        editorSelectionAndTablesSelection(
          (
            editorSelectionAndTablesSelection3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => ({
            selection:
              editorSelectionAndTablesSelection2 &&
              editorSelectionAndTablesSelection2.pinned &&
              editorSelectionAndTablesSelection2.pinnedAt === undefined
                ? {
                    ...editorSelectionAndTablesSelection2,
                    pinnedAt: Date.now(),
                  }
                : editorSelectionAndTablesSelection2,
            pinNonce: editorSelectionAndTablesSelection2?.pinned
              ? editorSelectionAndTablesSelection3.pinNonce + 1
              : editorSelectionAndTablesSelection3.pinNonce,
          }),
        ),
      clear: (
        editorSelectionAndTablesSelection2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let selection: Dynamic = options().selection;
        if (
          selection &&
          (editorSelectionAndTablesSelection2 === undefined ||
            selection.fileId === editorSelectionAndTablesSelection2)
        ) {
          editorSelectionAndTablesSelection({
            selection: null,
          });
        }
      },
      collapse: (
        editorSelectionAndTablesSelection2?: Dynamic,
        options2: Dynamic = Date.now(),
        ..._extraArguments: unknown[]
      ): undefined => {
        let selection: Dynamic = options().selection;
        if (selection) {
          if (
            !(
              selection.pinned &&
              options2 - (selection.pinnedAt ?? -1 / 0) <=
                EditorSelectionAndTablesState4
            )
          ) {
            if (selection.fileId === editorSelectionAndTablesSelection2) {
              editorSelectionAndTablesSelection({
                selection: null,
              });
            }
          }
        }
      },
    }),
  ));
  (EditorSelectionAndTablesSelection2 = create(
    (
      editorSelectionAndTablesSelection2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      selection: null,
      revealNonce: 0,
      setSelection: (
        selection?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        editorSelectionAndTablesSelection2(
          (
            editorSelectionAndTablesSelection22?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => ({
            selection: selection,
            revealNonce: editorSelectionAndTablesSelection22.revealNonce + 1,
          }),
        ),
      clear: (..._extraArguments: unknown[]): Dynamic =>
        editorSelectionAndTablesSelection2({
          selection: null,
        }),
    }),
  ));
  if (typeof window !== "undefined") {
    (window as Dynamic).__roomChatSelection = EditorSelectionAndTablesSelection2;
  }
  (EditorSelectionAndTablesState5 = null);
  (EditorSelectionAndTablesPrefs = create(
    (
      editorSelectionAndTablesPrefs?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      prefs: {},
      loaded: false,
      loadedOk: false,
      load: async (..._extraArguments: unknown[]): Promise<undefined> => {
        if (!options().loaded) {
          EditorSelectionAndTablesState5 ??= (async (
            ..._extraArguments: unknown[]
          ): Promise<undefined> => {
            try {
              editorSelectionAndTablesPrefs({
                prefs: await api.prefs.get(),
                loaded: true,
                loadedOk: true,
              });
            } catch {
              if (options().loadedOk) {
                editorSelectionAndTablesPrefs({
                  loaded: true,
                });
              } else {
                editorSelectionAndTablesPrefs({
                  prefs: {},
                  loaded: true,
                  loadedOk: false,
                });
              }
            } finally {
              EditorSelectionAndTablesState5 = null;
            }
          })();
          await EditorSelectionAndTablesState5;
        }
      },
      set: async (
        editorSelectionAndTablesPrefs2?: Dynamic,
        ..._extraArguments: unknown[]
      ) => {
        let prefs: Dynamic = options().prefs;
        editorSelectionAndTablesPrefs(
          (
            editorSelectionAndTablesPrefs3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => ({
            prefs: {
              ...editorSelectionAndTablesPrefs3.prefs,
              ...editorSelectionAndTablesPrefs2,
            },
          }),
        );
        for (let [key, editorSelectionAndTablesPrefsResult] of Object.entries(
          editorSelectionAndTablesPrefs2,
        ) as Dynamic)
          if (
            prefs[key] !== editorSelectionAndTablesPrefsResult &&
            key !== `spellWords`
          ) {
            emitAction(`ui:toggle_setting`, {
              params: {
                key: key,
                value: editorSelectionAndTablesPrefsResult,
              },
            });
          }
        try {
          editorSelectionAndTablesPrefs({
            prefs: await api.prefs.put(editorSelectionAndTablesPrefs2),
            loadedOk: true,
          });
          return true;
        } catch {
          editorSelectionAndTablesPrefs({
            prefs: prefs,
          });
          return false;
        }
      },
    }),
  ));
  (resolveEditorSelectionAndTablesReplace2 = (
    editorSelectionAndTablesReplace2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => editorSelectionAndTablesReplace2.toLowerCase().replace(/’/g, `'`));
  (EditorSelectionAndTablesState6 = updateDataModelSchemasValue(
    `spellcheck.on`,
    false,
  ));
  (EditorSelectionAndTablesState7 = updateDataModelSchemasValue(
    `spellcheck.autocorrect.builtin`,
    false,
  ));
  (EditorSelectionAndTablesRequested = create()(
    (
      editorSelectionAndTablesRequested?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      requested: false,
      targetDocId: null,
      request: (targetDocId?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        editorSelectionAndTablesRequested({
          requested: true,
          targetDocId: targetDocId,
        }),
      clear: (..._extraArguments: unknown[]): Dynamic =>
        editorSelectionAndTablesRequested({
          requested: false,
          targetDocId: null,
        }),
    }),
  ));
  (EditorSelectionAndTablesRoads = create()(
    (
      editorSelectionAndTablesRoads?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => ({
      roads: {},
      set: (
        editorSelectionAndTablesRoads2?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        editorSelectionAndTablesRoads(
          (
            editorSelectionAndTablesRoads3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            editorSelectionAndTablesRoads3.roads[
              editorSelectionAndTablesRoads2
            ] === options
              ? editorSelectionAndTablesRoads3
              : {
                  roads: {
                    ...editorSelectionAndTablesRoads3.roads,
                    [editorSelectionAndTablesRoads2]: options,
                  },
                },
        ),
      drop: (
        editorSelectionAndTablesRoads2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        editorSelectionAndTablesRoads(
          (
            editorSelectionAndTablesRoads3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            if (
              !(
                editorSelectionAndTablesRoads2 in
                editorSelectionAndTablesRoads3.roads
              )
            )
              return editorSelectionAndTablesRoads3;
            let { [editorSelectionAndTablesRoads2]: roads, ...roads2 }: Dynamic =
              editorSelectionAndTablesRoads3.roads;
            return {
              roads: roads2,
            };
          },
        ),
    }),
  ));
  (resolveEditorSelectionAndTablesSpellWords = (
    ..._extraArguments: unknown[]
  ): Dynamic => EditorSelectionAndTablesPrefs.getState().prefs.spellWords ?? []);
  (EditorSelectionAndTablesState8 = updateDataModelSchemasValue(
    `spellcheck.words${resolveEditorSelectionAndTablesKind()}`,
    [],
  ));
  (editorSelectionAndTablesPattern7 = /^(?=.*\p{L})(?!(?:[^-]*-){3})[\p{L}\p{M}\p{N}'-]{1,64}$/u);
  (resolveEditorSelectionAndTablesValue13 = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    inFrame()
      ? filterEditorSelectionAndTablesValue()
      : resolveEditorSelectionAndTablesSpellWords());
  (HorizontalRuleNode = Node2.create({
    name: `horizontalRule`,
    addOptions(..._extraArguments: unknown[]): Dynamic {
      return {
        HTMLAttributes: {},
        nextNodeType: `paragraph`,
      };
    },
    group: `block`,
    parseHTML(..._extraArguments: unknown[]) {
      return [
        {
          tag: `hr`,
        },
      ];
    },
    renderHTML(
      this: Dynamic,
      { HTMLAttributes: HTMLAttributes }: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return [`hr`, mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
    },
    markdownTokenName: `hr`,
    parseMarkdown: (
      HTMLAttributes?: unknown,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => options.createNode(`horizontalRule`),
    renderMarkdown: (..._extraArguments: unknown[]) => `---`,
    addCommands(..._extraArguments: unknown[]): Dynamic {
      return {
        setHorizontalRule:
          (..._extraArguments: unknown[]): Dynamic =>
          (
            { chain: chain, state: state }: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => {
            if (!canInsertNode(state, state.schema.nodes[this.name]))
              return false;
            let { selection: state2 }: Dynamic = state;
            let { $to: state3 }: Dynamic = state2;
            let chain2: Dynamic = chain();
            if (isNodeSelection(state2)) {
              chain2.insertContentAt(state3.pos, {
                type: this.name,
              });
            } else {
              chain2.insertContent({
                type: this.name,
              });
            }
            return chain2
              .command(
                (
                  { state: state4, tr: tr2, dispatch: dispatch }: Dynamic,
                  ..._extraArguments: unknown[]
                ) => {
                  if (dispatch) {
                    let { $to: selection }: Dynamic = tr2.selection;
                    let end: Dynamic = selection.end();
                    if (selection.nodeAfter) {
                      if (selection.nodeAfter.isTextblock) {
                        tr2.setSelection(
                          TextSelection.create(tr2.doc, selection.pos + 1),
                        );
                      } else {
                        if (selection.nodeAfter.isBlock) {
                          tr2.setSelection(
                            NodeSelection.create(tr2.doc, selection.pos),
                          );
                        } else {
                          tr2.setSelection(
                            TextSelection.create(tr2.doc, selection.pos),
                          );
                        }
                      }
                    } else {
                      let create2: Dynamic = (
                        state4.schema.nodes[this.options.nextNodeType] ||
                        selection.parent.type.contentMatch.defaultType
                      )?.create();
                      if (create2) {
                        tr2.insert(end, create2);
                        tr2.setSelection(TextSelection.create(tr2.doc, end + 1));
                      }
                    }
                    tr2.scrollIntoView();
                  }
                  return true;
                },
              )
              .run();
          },
      };
    },
    addInputRules(this: Dynamic, ..._extraArguments: unknown[]): Dynamic {
      return [
        nodeInputRule({
          find: /^(?:---|—-|___\s|\*\*\*\s)$/,
          type: this.type,
        }),
      ];
    },
  }));
  if (typeof WeakMap !== "undefined") {
    let metadata: Dynamic = new (WeakMap as Dynamic)();
    editorSelectionAndTablesState = (
      callback?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => metadata.get(callback);
    editorSelectionAndTablesState2 = (
      callback?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => (metadata.set(callback, options), options);
  } else {
    let items: Dynamic = [];
    let index = 0;
    editorSelectionAndTablesState = (
      callback?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      for (let count: number = 0; count < items.length; count += 2)
        if (items[count] == callback) return items[count + 1];
    };
    editorSelectionAndTablesState2 = (
      callback?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => (
      index == 10 && (index = 0),
      (items[index++] = callback),
      (items[index++] = options)
    );
  }
  (EditorSelectionAndTablesLeft = class {
    [key: string]: Dynamic;
    constructor(
      editorSelectionAndTablesLeft?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      dependencies?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      this.width = editorSelectionAndTablesLeft;
      this.height = options;
      this.map = context;
      this.problems = dependencies;
    }
    findCell(
      editorSelectionAndTablesLeft?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      for (let index = 0; index < this.map.length; index++) {
        let mapItem: Dynamic = this.map[index];
        if (mapItem != editorSelectionAndTablesLeft) continue;
        let left: number = index % this.width;
        let top = (index / this.width) | 0;
        let right: Dynamic = left + 1;
        let bottom = top + 1;
        for (
          let count = 1;
          right < this.width && this.map[index + count] == mapItem;
          count++
        )
          right++;
        for (
          let count = 1;
          bottom < this.height && this.map[index + this.width * count] == mapItem;
          count++
        )
          bottom++;
        return {
          left: left,
          top: top,
          right: right,
          bottom: bottom,
        };
      }
      throw RangeError(
        `No cell with offset ${editorSelectionAndTablesLeft} found`,
      );
    }
    colCount(
      editorSelectionAndTablesLeft?: Dynamic,
      ..._extraArguments: unknown[]
    ): number {
      for (let index = 0; index < this.map.length; index++)
        if (this.map[index] == editorSelectionAndTablesLeft)
          return index % this.width;
      throw RangeError(
        `No cell with offset ${editorSelectionAndTablesLeft} found`,
      );
    }
    nextCell(
      editorSelectionAndTablesLeft?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let {
        left: dependencies,
        right: findCell,
        top: findCell2,
        bottom: findCell3,
      }: Dynamic = this.findCell(editorSelectionAndTablesLeft);
      return options == `horiz`
        ? (context < 0 ? dependencies == 0 : findCell == this.width)
          ? null
          : this.map[
              findCell2 * this.width + (context < 0 ? dependencies - 1 : findCell)
            ]
        : (context < 0 ? findCell2 == 0 : findCell3 == this.height)
          ? null
          : this.map[
              dependencies +
                this.width * (context < 0 ? findCell2 - 1 : findCell3)
            ];
    }
    rectBetween(
      editorSelectionAndTablesLeft?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      let {
        left: context,
        right: dependencies,
        top: findCell,
        bottom: findCell2,
      }: Dynamic = this.findCell(editorSelectionAndTablesLeft);
      let {
        left: findCell3,
        right: findCell4,
        top: findCell5,
        bottom: findCell6,
      }: Dynamic = this.findCell(options);
      return {
        left: Math.min(context, findCell3),
        top: Math.min(findCell, findCell5),
        right: Math.max(dependencies, findCell4),
        bottom: Math.max(findCell2, findCell6),
      };
    }
    cellsInRect(
      editorSelectionAndTablesLeft?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let options: Dynamic = [];
      let context: Dynamic = {};
      for (
        let top: Dynamic = editorSelectionAndTablesLeft.top;
        top < editorSelectionAndTablesLeft.bottom;
        top++
      )
        for (
          let left: Dynamic = editorSelectionAndTablesLeft.left;
          left < editorSelectionAndTablesLeft.right;
          left++
        ) {
          let total: Dynamic = top * this.width + left;
          let mapItem: Dynamic = this.map[total];
          if (!context[mapItem]) {
            context[mapItem] = true;
            if (
              !(
                (left == editorSelectionAndTablesLeft.left &&
                  left &&
                  this.map[total - 1] == mapItem) ||
                (top == editorSelectionAndTablesLeft.top &&
                  top &&
                  this.map[total - this.width] == mapItem)
              )
            ) {
              options.push(mapItem);
            }
          }
        }
      return options;
    }
    positionAt(
      editorSelectionAndTablesLeft?: Dynamic,
      options?: Dynamic,
      context?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      for (let index = 0, count: number = 0; ; index++) {
        let total: Dynamic = count + context.child(index).nodeSize;
        if (index == editorSelectionAndTablesLeft) {
          let total2: Dynamic =
            options + editorSelectionAndTablesLeft * this.width;
          let amount: number = (editorSelectionAndTablesLeft + 1) * this.width;
          for (; total2 < amount && this.map[total2] < count; ) total2++;
          return total2 == amount ? total - 1 : this.map[total2];
        }
        count = total;
      }
    }
    static get(
      editorSelectionAndTablesLeft?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      return (
        editorSelectionAndTablesState(editorSelectionAndTablesLeft) ||
        editorSelectionAndTablesState2(
          editorSelectionAndTablesLeft,
          resolveEditorSelectionAndTablesColspan(editorSelectionAndTablesLeft),
        )
      );
    }
  });
  (SelectingCellsPluginKey = new (PluginKey as Dynamic)(
    `selectingCells`,
  ));
}

export {
  EditorSelectionAndTablesAsk,
  EditorSelectionAndTablesByFile,
  EditorSelectionAndTablesByFile2,
  EditorSelectionAndTablesByKey,
  EditorSelectionAndTablesByKey2,
  EditorSelectionAndTablesDataPagesPrintSkip,
  EditorSelectionAndTablesDataPagesPrintSurface,
  EditorSelectionAndTablesLeft,
  EditorSelectionAndTablesPrefs,
  EditorSelectionAndTablesPublishItAgainToUpdateTheRender,
  EditorSelectionAndTablesReason2,
  EditorSelectionAndTablesReq,
  EditorSelectionAndTablesRequested,
  EditorSelectionAndTablesRoads,
  EditorSelectionAndTablesSelection,
  EditorSelectionAndTablesSelection2,
  EditorSelectionAndTablesState2,
  EditorSelectionAndTablesState3,
  EditorSelectionAndTablesState6,
  EditorSelectionAndTablesState7,
  EditorSelectionAndTablesState8,
  EditorSelectionAndTablesThisBlockChangedSinceItWasLastPublished,
  HorizontalRuleNode,
  SelectingCellsPluginKey,
  collectEditorSelectionAndTablesJoin,
  filterEditorSelectionAndTablesText,
  filterEditorSelectionAndTablesValue,
  getEditorSelectionAndTablesNode,
  isEditorSelectionAndTablesHead,
  isEditorSelectionAndTablesIsActive,
  isEditorSelectionAndTablesRowIndex,
  isEditorSelectionAndTablesSpelling,
  resolveEditorSelectionAndTablesCell,
  resolveEditorSelectionAndTablesColspan2,
  resolveEditorSelectionAndTablesColspan3,
  resolveEditorSelectionAndTablesComponent2,
  resolveEditorSelectionAndTablesCreate,
  resolveEditorSelectionAndTablesDepth,
  resolveEditorSelectionAndTablesDepth2,
  resolveEditorSelectionAndTablesFallback,
  resolveEditorSelectionAndTablesFind,
  resolveEditorSelectionAndTablesHasOwn,
  resolveEditorSelectionAndTablesHash,
  resolveEditorSelectionAndTablesKeys,
  resolveEditorSelectionAndTablesLocale,
  resolveEditorSelectionAndTablesNode,
  resolveEditorSelectionAndTablesNull,
  resolveEditorSelectionAndTablesPref,
  resolveEditorSelectionAndTablesPref2,
  resolveEditorSelectionAndTablesQuote,
  resolveEditorSelectionAndTablesResolve,
  resolveEditorSelectionAndTablesRoot,
  resolveEditorSelectionAndTablesSlice,
  resolveEditorSelectionAndTablesSpellWords,
  resolveEditorSelectionAndTablesStaged,
  resolveEditorSelectionAndTablesSummon,
  resolveEditorSelectionAndTablesTableNodeTypes,
  resolveEditorSelectionAndTablesTableRole,
  resolveEditorSelectionAndTablesText3,
  resolveEditorSelectionAndTablesValue11,
  resolveEditorSelectionAndTablesValue12,
  resolveEditorSelectionAndTablesValue13,
  resolveEditorSelectionAndTablesValue2,
  resolveEditorSelectionAndTablesValue5,
  resolveEditorSelectionAndTablesValue6,
  updateEditorSelectionAndTablesAsk,
  updateEditorSelectionAndTablesChat,
  updateEditorSelectionAndTablesNodeId,
  updateEditorSelectionAndTablesPublished,
  updateEditorSelectionAndTablesReport,
  updateEditorSelectionAndTablesResolved,
  updateEditorSelectionAndTablesSpellWords,
  useEditorSelectionAndTablesPid,
  useEditorSelectionAndTablesUseSyncExternalStore,
};
