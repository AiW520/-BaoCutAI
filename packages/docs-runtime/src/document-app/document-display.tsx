/** BaoCut: document display from index-CX4IZqzA.js. */
import type { LanguageAttributes } from "../interop/recovered-contracts";
import type { DocumentFonts, TypographySeat, FontDisplay, DisplayRecord, FontPostState, FontListener, PeekFocusState, TitleEscapeState, FrameFocusState, TitleFocusState, TitleFocusDecision, KeyboardHelpState, KeyboardHelpPatch } from "./contracts";
import type { Dynamic } from "../interop/legacy-dynamic";
import {
  PlatformKeyboardAndSaveStatusGroup,
  PlatformKeyboardAndSaveStatusInTheTabsList,
  PlatformKeyboardAndSaveStatusKey,
  PlatformKeyboardAndSaveStatusText,
  PlatformSyncAndRoutingCanRename,
  PlatformSyncAndRoutingDoor,
  UiDialogsRoot,
  UiShortcutsAndSizingKeys,
  collectPlatformKeyboardAndSaveStatusMods,
  create,
  liveDoor,
  pageBusyOf,
  platformAnnouncementsPattern,
  preloadModule,
  resolvePlatformChunkLoadingLazy,
  resolvePlatformKeyboardAndSaveStatusToggle,
  resolvePlatformSyncAndRoutingRestoreOffers2,
  resolvePlatformSyncAndRoutingValue22,
  usePlatformFeatureFlagsUseSyncExternalStore,
} from "./dependencies";
import {
  React,
  mapPreloadDependencies,
} from "./bootstrap";
import {
  RouteErrorBoundary,
} from "./connection-and-errors/connector-permission-dialog";
import {
  DEFAULT_DOCUMENT_FONTS,
  DISPLAY_PROPERTY,
  DOC_FONTS_FEATURE,
  HEADING_FONT_PROPERTY,
  TEXT_FONT_PROPERTY,
  isFontSettingsObject,
} from "./run-review";
import type * as ReactComponentTypes from "react";

export const KeyboardHelpDialog: ReactComponentTypes.FC<
  Readonly<Record<string, unknown>>
> = () => {
  let versionHistoryV2: Dynamic = resolvePlatformSyncAndRoutingValue22();
  let historyRestore: Dynamic = resolvePlatformSyncAndRoutingRestoreOffers2();
  let docDisplay: Dynamic =
    usePlatformFeatureFlagsUseSyncExternalStore(DOC_FONTS_FEATURE);
  let tabsOnLeft: Dynamic = PlatformSyncAndRoutingCanRename(
    (keyboardHelpDialog?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      keyboardHelpDialog.onLeft,
  );
  let tabsCanRename: Dynamic = PlatformSyncAndRoutingCanRename(
    (keyboardHelpDialog?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      keyboardHelpDialog.canRename,
  );
  let tabsPanelHeadings: Dynamic = PlatformSyncAndRoutingCanRename(
    (keyboardHelpDialog?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      keyboardHelpDialog.panelHeadings,
  );
  let open: Dynamic = useKeyboardHelpStore(
    (keyboardHelpDialog?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      keyboardHelpDialog.open,
  );
  let onOpenChange: Dynamic = useKeyboardHelpStore(
    (keyboardHelpDialog?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      keyboardHelpDialog.set,
  );
  let current: Dynamic = useKeyboardHelpStore(
    (keyboardHelpDialog?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      keyboardHelpDialog.returnTo,
  );
  let finalFocus: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      current === null
        ? undefined
        : {
            current: current,
          },
    [current],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => (
      useKeyboardHelpStore.setState(
        (keyboardHelpDialog?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
          mounted: keyboardHelpDialog.mounted + 1,
        }),
      ),
      window.addEventListener(`keydown`, handleKeyboardHelpShortcut),
      (..._extraArguments: unknown[]): undefined => {
        window.removeEventListener(`keydown`, handleKeyboardHelpShortcut);
        useKeyboardHelpStore.setState(
          (keyboardHelpDialog?: Dynamic, ..._extraArguments: unknown[]) => ({
            mounted: Math.max(0, keyboardHelpDialog.mounted - 1),
            open: false,
            returnTo: null,
          }),
        );
      }
    ),
    [],
  );
  return (
    <UiDialogsRoot.Root open={open} onOpenChange={onOpenChange}>
      <UiDialogsRoot.Popup
        size={`2xl`}
        data-testid={`shortcut-sheet`}
        finalFocus={finalFocus}
      >
        <UiDialogsRoot.Header
          showClose={true}
        >{`Keyboard shortcuts`}</UiDialogsRoot.Header>
        <div className={`min-h-0 overflow-auto sm:columns-2 gap-x-xl`}>
          {filterKeyboardShortcuts({
            versionHistoryV2: versionHistoryV2,
            historyRestore: historyRestore,
            docDisplay: docDisplay,
            tabsOnLeft: tabsOnLeft,
            tabsCanRename: tabsCanRename,
            tabsPanelHeadings: tabsPanelHeadings,
          }).map(
            (
              filterKeyboardShortcut?: Dynamic,
              ..._extraArguments: unknown[]
            ): Dynamic => (
              <section
                aria-labelledby={`shortcut-sheet-${filterKeyboardShortcut.group}`}
                className={`mb-lg`}
                key={filterKeyboardShortcut.group}
              >
                {
                  <h3
                    id={`shortcut-sheet-${filterKeyboardShortcut.group}`}
                    className={`text-muted text-caption mb-sm break-after-avoid`}
                  >
                    {filterKeyboardShortcut.title}
                  </h3>
                }
                {
                  <ul>
                    {filterKeyboardShortcut.rows.map(
                      (event?: Dynamic, ..._extraArguments: unknown[]): Dynamic => (
                        <li
                          data-chord={event.id}
                          className={`flex flex-wrap break-inside-avoid items-center justify-between gap-x-md gap-y-0 py-1`}
                          key={event.id}
                        >
                          {
                            <span className={`text-body flex-1`}>
                              {event.label}
                              {PlatformKeyboardAndSaveStatusText[event.scope] !==
                                undefined && (
                                <span className={`text-secondary`}>
                                  {` · `}
                                  {PlatformKeyboardAndSaveStatusText[event.scope]}
                                </span>
                              )}
                            </span>
                          }
                          {
                            <span className={`ml-auto flex shrink-0 items-center gap-sm`}>
                              {[event.key, ...(event.also ?? [])].map(
                                (
                                  item?: Dynamic,
                                  index?: Dynamic,
                                  ..._extraArguments: unknown[]
                                ): Dynamic => (
                                  <span className={`flex items-center gap-sm`} key={item}>
                                    {index > 0 && (
                                      <span
                                        className={`text-muted text-caption`}
                                      >{`or`}</span>
                                    )}
                                    {
                                      <UiShortcutsAndSizingKeys
                                        keys={collectPlatformKeyboardAndSaveStatusMods(
                                          item,
                                        )}
                                      />
                                    }
                                  </span>
                                ),
                              )}
                            </span>
                          }
                        </li>
                      ),
                    )}
                  </ul>
                }
              </section>
            ),
          )}
        </div>
      </UiDialogsRoot.Popup>
    </UiDialogsRoot.Root>
  );
};

export const ProjectDoorProvider: ReactComponentTypes.FC<Dynamic> = ({
  pid: pid,
  children: children,
}) => {
  let memoized: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (pid === undefined || pid === ``) return;
      let ambient: Dynamic = {
        kind: `project`,
        id: pid,
      };
      return {
        door: liveDoor(pid),
        ambient: ambient,
      };
    },
    [pid],
  );
  return (
    <PlatformSyncAndRoutingDoor door={memoized?.door} ambient={memoized?.ambient}>
      {children}
    </PlatformSyncAndRoutingDoor>
  );
};

export const PageSkillBulbGate: ReactComponentTypes.FC<Dynamic> = ({
  seat: seat,
  chrome: chrome,
}) => {
  return !usePlatformFeatureFlagsUseSyncExternalStore(`swimming`) ||
    seat === null ? null : (
    <React.Suspense fallback={null}>
      <LazyPageSkillBulb seat={seat} chrome={chrome} />
    </React.Suspense>
  );
};

export const DocFontControlGate: ReactComponentTypes.FC<Dynamic> = ({ seat: seat }) => {
  return !usePlatformFeatureFlagsUseSyncExternalStore(`docFonts`) ||
    seat === null ||
    seat.post === undefined ? null : (
    <RouteErrorBoundary component={`docfont`} fallback={null}>
      <React.Suspense fallback={null}>
        <LazyDocFontControl seat={seat} />
      </React.Suspense>
    </RouteErrorBoundary>
  );
};

export const DocLayoutControlGate: ReactComponentTypes.FC<Dynamic> = ({ seat: seat }) => {
  return !usePlatformFeatureFlagsUseSyncExternalStore(`docFonts`) ||
    seat === null ||
    seat.post === undefined ? null : (
    <RouteErrorBoundary component={`doclayout`} fallback={null}>
      <React.Suspense fallback={null}>
        <LazyDocLayoutControl seat={seat} />
      </React.Suspense>
    </RouteErrorBoundary>
  );
};

function readDisplaySettings(displaySettings: unknown): DisplayRecord | null {
  if (!isFontSettingsObject(displaySettings)) return null;
  let displaySettingItem = displaySettings[DISPLAY_PROPERTY];
  return isFontSettingsObject(displaySettingItem) ? displaySettingItem : null;
}

var fontSettingsKey: (fontSettingsKey2: unknown) => string | undefined;

function parseDocumentFonts(documentFonts: unknown): DocumentFonts {
  if (!isFontSettingsObject(documentFonts)) return DEFAULT_DOCUMENT_FONTS;
  let documentFontItem = documentFonts[HEADING_FONT_PROPERTY];
  let documentFontItem2 = documentFonts[TEXT_FONT_PROPERTY];
  let headings: DocumentFonts["headings"] =
    documentFontItem === `sans` || documentFontItem === `mono`
      ? documentFontItem
      : `serif`;
  let text: DocumentFonts["text"] =
    documentFontItem2 === `serif` || documentFontItem2 === `mono`
      ? documentFontItem2
      : `sans`;
  return headings === `serif` && text === `sans`
    ? DEFAULT_DOCUMENT_FONTS
    : {
        headings: headings,
        text: text,
      };
}

function serializeDocumentFonts(documentFonts: DocumentFonts): FontDisplay {
  let record: FontDisplay = {};
  if (documentFonts.headings !== `serif`) {
    record.headingFont = documentFonts.headings;
  }
  if (documentFonts.text !== `sans`) {
    record.textFont = documentFonts.text;
  }
  return record;
}

var equalDocumentFonts: (equalDocumentFonts2: DocumentFonts, options: DocumentFonts) => boolean;

function withoutTypographyPost<
  Seat extends {
    post?: unknown;
  },
>(
  withoutTypographyPost2: Seat | null,
  options: boolean,
): Seat | Omit<Seat, "post"> | null {
  if (
    withoutTypographyPost2 === null ||
    !options ||
    withoutTypographyPost2.post === undefined
  )
    return withoutTypographyPost2;
  let { post: withoutTypographyPost3, ...withoutTypographyPost4 } =
    withoutTypographyPost2;
  return withoutTypographyPost4;
}

var documentFontsByProject: Map<string, DocumentFonts>;

var documentFontGeneration: Map<string, number>;

var documentFontListeners: Set<FontListener>;

var getDocumentFontGeneration: (documentFontGeneration2: string) => number;

function setDocumentFonts(
  documentFonts: string,
  options: DocumentFonts | null,
): void {
  let documentFontsByProjectEntry = documentFontsByProject.get(documentFonts);
  if (options === null) {
    if (documentFontsByProjectEntry === undefined) return;
    documentFontsByProject.delete(documentFonts);
    documentFontGeneration.set(
      documentFonts,
      getDocumentFontGeneration(documentFonts) + 1,
    );
  } else {
    if (
      documentFontsByProjectEntry !== undefined &&
      equalDocumentFonts(documentFontsByProjectEntry, options)
    )
      return;
    documentFontsByProject.set(
      documentFonts,
      equalDocumentFonts(options, DEFAULT_DOCUMENT_FONTS)
        ? DEFAULT_DOCUMENT_FONTS
        : options,
    );
  }
  for (let setDocumentFontsResult of documentFontListeners)
    setDocumentFontsResult();
}

function useDocumentFontFeed(
  pid: string,
  page2: TypographySeat | null,
  context: unknown,
): void {
  let useDocumentFontFeedResult =
    usePlatformFeatureFlagsUseSyncExternalStore(DOC_FONTS_FEATURE);
  let elementRef: import("react").RefObject<{
    pid: string;
    faces: DocumentFonts;
  } | null> = (0, (React as typeof import("react")).useRef)(null);
  if (page2 !== null && page2.pid === pid) {
    elementRef.current = {
      pid: pid,
      faces: page2.typography,
    };
  }
  let faces = useDocumentFontFeedResult
    ? elementRef.current?.pid === pid
      ? elementRef.current.faces
      : context == null
        ? null
        : parseDocumentFonts(readDisplaySettings(context))
    : null;
  let label = faces === null ? `` : `${faces.headings}/${faces.text}`;
  (0, (React as typeof import("react")).useEffect)(() => {
    if (label === ``) {
      if (!useDocumentFontFeedResult) {
        setDocumentFonts(pid, null);
      }
      return;
    }
    let [headings, text] = label.split(`/`) as [
      DocumentFonts["headings"],
      DocumentFonts["text"],
    ];
    setDocumentFonts(pid, {
      headings: headings,
      text: text,
    });
  }, [pid, label, useDocumentFontFeedResult]);
  (0, (React as typeof import("react")).useEffect)(
    () => () => {
      setDocumentFonts(pid, null);
      elementRef.current = null;
    },
    [pid],
  );
}

function applyDocumentFontsIfCurrent(
  applyDocumentFontsIfCurrent2: string,
  options: DocumentFonts,
  context: number,
): boolean {
  return !documentFontsByProject.has(applyDocumentFontsIfCurrent2) ||
    getDocumentFontGeneration(applyDocumentFontsIfCurrent2) !== context
    ? false
    : (setDocumentFonts(applyDocumentFontsIfCurrent2, options), true);
}

var getDocumentFonts: (documentFonts?: string) => DocumentFonts | null;

var subscribeDocumentFonts: (documentFonts: FontListener) => (() => boolean);

function documentFontsPostState(
  post: DocumentFonts | null,
  options: boolean,
): FontPostState {
  return post === null
    ? {
        post: options ? DEFAULT_DOCUMENT_FONTS : null,
        applied: false,
      }
    : {
        post: post,
        applied: true,
      };
}

function useDocumentFonts(documentFonts?: string): DocumentFonts | null {
  return (0, (React as typeof import("react")).useSyncExternalStore)(
    subscribeDocumentFonts,
    () => getDocumentFonts(documentFonts),
    () => null,
  );
}

function classifyTitleClick(classifyTitleClick2: {
  detail: number;
  selecting: boolean;
}): "ignore" | "open" {
  return classifyTitleClick2.detail > 1 || classifyTitleClick2.selecting
    ? `ignore`
    : `open`;
}

function canReleasePeekFocus(releasePeekFocus: PeekFocusState): boolean {
  return (
    releasePeekFocus.peekSurface &&
    releasePeekFocus.focusId !== null &&
    !releasePeekFocus.draftAnchor &&
    releasePeekFocus.dirtyCount === 0
  );
}

function classifyTitleEscape(
  classifyTitleEscape2: TitleEscapeState,
): "close-ask" | "release-peek" | "close-list" | "stay" | "exit" {
  if (classifyTitleEscape2.quietAskCard && classifyTitleEscape2.docFocused)
    return `close-ask`;
  if (canReleasePeekFocus(classifyTitleEscape2)) return `release-peek`;
  let enabled =
    !!classifyTitleEscape2.draftAnchor || classifyTitleEscape2.dirtyCount > 0;
  return classifyTitleEscape2.listPopover && !enabled
    ? classifyTitleEscape2.docFocused
      ? `close-list`
      : `stay`
    : classifyTitleEscape2.hostPopoverOpen || !classifyTitleEscape2.docFocused
      ? `stay`
      : `exit`;
}

var TEXT_INPUT_SELECTOR: string;

function classifyFrameFocusReturn(
  document2: FrameFocusState,
): "hand-back" | "leave" {
  if (!document2.hasFocus) return `leave`;
  let activeElement = document2.activeElement;
  return activeElement === null ||
    activeElement === document2.body ||
    activeElement === document2.body?.parentElement ||
    activeElement === document2.iframe ||
    document2.inDraftCard(activeElement)
    ? `hand-back`
    : `leave`;
}

function hasKeyboardFrameFocus(document2: {
  kbd: boolean;
  hasFocus: boolean;
  iframe: HTMLIFrameElement | null;
  activeElement: Element | null;
}): boolean {
  return (
    document2.kbd &&
    document2.hasFocus &&
    document2.iframe !== null &&
    document2.activeElement === document2.iframe
  );
}

function classifyTitleFocusRequest(
  classifyTitleFocusRequest2: TitleFocusState,
): TitleFocusDecision {
  let id2 =
    typeof classifyTitleFocusRequest2.id == `string` &&
    classifyTitleFocusRequest2.id.length > 0 &&
    classifyTitleFocusRequest2.id.length <= 128
      ? classifyTitleFocusRequest2.id
      : ``;
  return !id2 ||
    !classifyTitleFocusRequest2.live ||
    !classifyTitleFocusRequest2.frameFocused
    ? {
        act: `ignore`,
      }
    : !classifyTitleFocusRequest2.held(id2) ||
        classifyTitleFocusRequest2.hidden(id2)
      ? {
          act: `unavailable`,
        }
      : classifyTitleFocusRequest2.focusId !== null &&
          classifyTitleFocusRequest2.focusId !== id2 &&
          classifyTitleFocusRequest2.unsent
        ? {
            act: `refuse-unsent`,
          }
        : classifyTitleFocusRequest2.draftFloats
          ? {
              act: `refuse-draft`,
            }
          : {
              act: `open`,
              id: id2,
            };
}

var useKeyboardHelpStore: Dynamic;

function reduceKeyboardHelpVisibility(
  reduceKeyboardHelpVisibility2: KeyboardHelpState,
  open: boolean,
  returnTo: Element | null = null,
): KeyboardHelpPatch {
  return reduceKeyboardHelpVisibility2.mounted === 0
    ? {
        open: false,
      }
    : open && !reduceKeyboardHelpVisibility2.open
      ? {
          open: open,
          returnTo: returnTo,
        }
      : {
          open: open,
        };
}

var openKeyboardHelp: Dynamic;

function filterKeyboardShortcuts(
  filterKeyboardShortcuts2: Dynamic = {},
  options: Dynamic = PlatformKeyboardAndSaveStatusKey,
  ..._extraArguments: unknown[]
): Dynamic {
  let filteredOptions: Dynamic = options.filter(
    (item?: Dynamic, ..._extraArguments: unknown[]) =>
      item.only === undefined
        ? true
        : item.only === `versionHistoryV2`
          ? filterKeyboardShortcuts2.versionHistoryV2 === true
          : item.only === `docDisplay`
            ? filterKeyboardShortcuts2.docDisplay === true
            : item.only === `tabsOnLeft`
              ? filterKeyboardShortcuts2.tabsOnLeft === true
              : item.only === `tabsOnLeftRename`
                ? filterKeyboardShortcuts2.tabsOnLeft === true &&
                  filterKeyboardShortcuts2.tabsCanRename === true
                : item.only === `tabsInPanel`
                  ? filterKeyboardShortcuts2.tabsOnLeft !== true
                  : item.only === `tabsPanelHeadings`
                    ? filterKeyboardShortcuts2.tabsOnLeft !== true &&
                      filterKeyboardShortcuts2.tabsPanelHeadings === true
                    : item.only === `tabsPanelNoHeadings`
                      ? filterKeyboardShortcuts2.tabsOnLeft !== true &&
                        filterKeyboardShortcuts2.tabsPanelHeadings !== true
                      : filterKeyboardShortcuts2.versionHistoryV2 === true &&
                        filterKeyboardShortcuts2.historyRestore === true,
  );
  return PlatformKeyboardAndSaveStatusGroup.map(
    (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
      group: item.group,
      title:
        item.group === `tabs` && filterKeyboardShortcuts2.tabsOnLeft === true
          ? PlatformKeyboardAndSaveStatusInTheTabsList
          : item.title,
      rows: filteredOptions.filter(
        (filteredOption?: Dynamic, ..._extraArguments: unknown[]) =>
          filteredOption.group === item.group,
      ),
    }),
  ).filter(
    (mappedItem?: Dynamic, ..._extraArguments: unknown[]) =>
      mappedItem.rows.length > 0,
  );
}

function handleKeyboardHelpShortcut(
  event?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (event.defaultPrevented) return;
  let composedPathItem: Dynamic = event.composedPath()[0] ?? event.target;
  let inTextBox =
    composedPathItem instanceof Element &&
    composedPathItem.closest(TEXT_INPUT_SELECTOR) !== null;
  let handleKeyboardHelpShortcutResult =
    resolvePlatformKeyboardAndSaveStatusToggle({
      key: event.key,
      metaKey: event.metaKey,
      ctrlKey: event.ctrlKey,
      altKey: event.altKey,
      shiftKey: event.shiftKey,
      repeat: event.repeat,
      composing: event.isComposing,
      inTextBox: inTextBox,
    });
  if (handleKeyboardHelpShortcutResult !== null) {
    event.preventDefault();
    if (handleKeyboardHelpShortcutResult === `toggle`) {
      useKeyboardHelpStore.getState().toggle();
    } else {
      useKeyboardHelpStore.getState().set(true);
    }
  }
}

var SKILL_PROPERTY: string;

function withoutSkillPost(
  withoutSkillPost2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    withoutSkillPost2 === null ||
    !options ||
    withoutSkillPost2.post === undefined
  )
    return withoutSkillPost2;
  let { post: withoutSkillPost3, ...withoutSkillPost4 }: Dynamic =
    withoutSkillPost2;
  return withoutSkillPost4;
}

var isSkillSettingsObject: Dynamic;

function readPageSkillSettings(
  pageSkillSettings?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (!isSkillSettingsObject(pageSkillSettings)) return null;
  let pageSkillSettingItem: Dynamic = pageSkillSettings[SKILL_PROPERTY];
  return isSkillSettingsObject(pageSkillSettingItem)
    ? pageSkillSettingItem
    : null;
}

var skillSettingsKey: Dynamic;

var LazyPageSkillBulb: Dynamic;

var LazyDocFontControl: Dynamic;

var DOCUMENT_LANGUAGE_FEATURE: string;

var LANGUAGE_PROPERTY: string;

var LANGUAGE_TAG_PATTERN: RegExp;

var isLanguageSettingsObject: Dynamic;

function canonicalizeLanguageTag(
  onicalizeLanguageTag?: unknown,
  ..._extraArguments: unknown[]
): Dynamic {
  if (typeof onicalizeLanguageTag != `string`) return null;
  let replace = onicalizeLanguageTag.trim().replace(/_/g, `-`);
  if (!LANGUAGE_TAG_PATTERN.test(replace)) return null;
  let canonicalizeLanguageTagResult: Dynamic;
  try {
    let [canonicalLocales]: Dynamic = Intl.getCanonicalLocales(replace);
    if (canonicalLocales === undefined) return null;
    canonicalizeLanguageTagResult = canonicalLocales;
  } catch {
    return null;
  }
  let canonicalizeLanguageTagResultParts: Dynamic =
    canonicalizeLanguageTagResult.split(`-`);
  let canonicalizeLanguageTagResultPartIndex: Dynamic =
    canonicalizeLanguageTagResultParts.findIndex(
      (items?: Dynamic, index?: Dynamic, ..._extraArguments: unknown[]) =>
        index > 0 && items.length === 1,
    );
  let canonicalizeLanguageTagResultParts2: Dynamic =
    canonicalizeLanguageTagResultPartIndex === -1
      ? canonicalizeLanguageTagResultParts
      : canonicalizeLanguageTagResultParts.slice(
          0,
          canonicalizeLanguageTagResultPartIndex,
        );
  if (canonicalizeLanguageTagResultParts2[0]?.toLowerCase() === `und`)
    return null;
  let canonicalizeLanguageTagResultPartsText: Dynamic =
    canonicalizeLanguageTagResultParts2.join(`-`);
  return platformAnnouncementsPattern.test(
    canonicalizeLanguageTagResultPartsText,
  )
    ? canonicalizeLanguageTagResultPartsText
    : null;
}

var readDocumentLanguage: Dynamic;

var DOCUMENT_LANGUAGE_COPY: {
    title: string;
    hint: string;
};

function withoutLanguagePost(
  withoutLanguagePost2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (
    withoutLanguagePost2 === null ||
    !options ||
    withoutLanguagePost2.post === undefined
  )
    return withoutLanguagePost2;
  let { post: withoutLanguagePost3, ...withoutLanguagePost4 }: Dynamic =
    withoutLanguagePost2;
  return withoutLanguagePost4;
}

function documentLanguagePatch(
  documentLanguagePatch2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return documentLanguagePatch2 === null
    ? [
        {
          op: `delete`,
          path: [LANGUAGE_PROPERTY],
        },
      ]
    : [
        {
          op: `set`,
          path: [LANGUAGE_PROPERTY],
          value: documentLanguagePatch2,
        },
      ];
}

var documentLanguageByProject: Dynamic;

var documentLanguageGeneration: Dynamic;

var documentLanguageListeners: Dynamic;

var effectiveDocumentLanguage: Dynamic;

var notifyDocumentLanguage: (..._extraArguments: unknown[]) => undefined;

var getDocumentLanguageGeneration: Dynamic;

function clearDocumentLanguage(
  clearDocumentLanguage2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (documentLanguageByProject.has(clearDocumentLanguage2)) {
    documentLanguageByProject.delete(clearDocumentLanguage2);
    documentLanguageGeneration.set(
      clearDocumentLanguage2,
      getDocumentLanguageGeneration(clearDocumentLanguage2) + 1,
    );
    notifyDocumentLanguage();
  }
}

function storeDocumentLanguage(
  storeDocumentLanguage2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let documentLanguageByProjectEntry: Dynamic = documentLanguageByProject.get(
    storeDocumentLanguage2,
  );
  documentLanguageByProject.set(storeDocumentLanguage2, options);
  if (
    documentLanguageByProjectEntry === undefined ||
    effectiveDocumentLanguage(documentLanguageByProjectEntry) !==
      effectiveDocumentLanguage(options)
  ) {
    notifyDocumentLanguage();
  }
}

function updateReadDocumentLanguage(
  updateReadDocumentLanguage2?: Dynamic,
  read?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (read === undefined)
    return clearDocumentLanguage(updateReadDocumentLanguage2);
  let documentLanguageByProjectEntry: Dynamic = documentLanguageByProject.get(
    updateReadDocumentLanguage2,
  );
  storeDocumentLanguage(updateReadDocumentLanguage2, {
    read: read,
    pick:
      documentLanguageByProjectEntry !== undefined &&
      documentLanguageByProjectEntry.pick !== null &&
      documentLanguageByProjectEntry.read === read &&
      documentLanguageByProjectEntry.pick.tag !== read
        ? documentLanguageByProjectEntry.pick
        : null,
  });
}

function pickDocumentLanguage(
  pickDocumentLanguage2?: Dynamic,
  tag?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let documentLanguageByProjectEntry: Dynamic = documentLanguageByProject.get(
    pickDocumentLanguage2,
  );
  if (documentLanguageByProjectEntry !== undefined) {
    storeDocumentLanguage(pickDocumentLanguage2, {
      read: documentLanguageByProjectEntry.read,
      pick:
        documentLanguageByProjectEntry.read === tag
          ? null
          : {
              tag: tag,
            },
    });
  }
}

var getDocumentLanguage: Dynamic;

var subscribeDocumentLanguage: Dynamic;

function useDocumentLanguage(
  documentLanguage?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (0, React.useSyncExternalStore)(
    subscribeDocumentLanguage,
    (..._extraArguments: unknown[]): Dynamic =>
      getDocumentLanguage(documentLanguage),
    (..._extraArguments: unknown[]): undefined => undefined,
  );
}

function useDocumentLanguageFeed(
  pid?: Dynamic,
  page2?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let useDocumentLanguageFeedResult: Dynamic =
    usePlatformFeatureFlagsUseSyncExternalStore(DOCUMENT_LANGUAGE_FEATURE);
  let elementRef: Dynamic = (0, React.useRef)(null);
  if (page2 !== null && page2.pid === pid) {
    elementRef.current = {
      pid: pid,
      language: page2.language,
    };
  }
  let language: Dynamic = useDocumentLanguageFeedResult
    ? elementRef.current?.pid === pid
      ? elementRef.current.language
      : context == null
        ? undefined
        : readDocumentLanguage(context)
    : undefined;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (language === undefined) {
        if (!useDocumentLanguageFeedResult) {
          updateReadDocumentLanguage(pid, undefined);
        }
        return;
      }
      updateReadDocumentLanguage(pid, language);
    },
    [pid, language, useDocumentLanguageFeedResult],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): undefined => {
        updateReadDocumentLanguage(pid, undefined);
        elementRef.current = null;
      },
    [pid],
  );
}

function documentLanguageAttributes(
  lang?: unknown,
  options?: boolean,
  ..._extraArguments: unknown[]
): LanguageAttributes {
  return typeof lang == `string`
    ? {
        lang: lang,
        declared: true,
      }
    : {
        lang: options ? `` : undefined,
        declared: false,
      };
}

var documentLanguageWriteChains: Dynamic;

function serializeDocumentLanguageWrite(
  documentLanguageWrite?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let then: Dynamic = (
    documentLanguageWriteChains.get(documentLanguageWrite) ?? Promise.resolve()
  ).then(options, options);
  documentLanguageWriteChains.set(documentLanguageWrite, then);
  then.finally((..._extraArguments: unknown[]): undefined => {
    if (documentLanguageWriteChains.get(documentLanguageWrite) === then) {
      documentLanguageWriteChains.delete(documentLanguageWrite);
    }
  });
  return then;
}

async function sendDocumentLanguage(
  sendDocumentLanguage2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (sendDocumentLanguage2.post === undefined) return `notSent`;
  let response: Dynamic;
  try {
    response = await sendDocumentLanguage2.post(documentLanguagePatch(options));
  } catch {
    return `notSent`;
  }
  return response?.verdict === `allow`
    ? `allowed`
    : pageBusyOf(response) === null
      ? `refused`
      : `busy`;
}

function writeDocumentLanguage(
  documentLanguage?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let { pid: documentLanguage2 }: Dynamic = documentLanguage;
  let canonicalizeLanguageTag2: Dynamic =
    options === null ? null : canonicalizeLanguageTag(options);
  let documentLanguageGeneration2: Dynamic =
    getDocumentLanguageGeneration(documentLanguage2);
  return getDocumentLanguage(documentLanguage2) === canonicalizeLanguageTag2
    ? Promise.resolve(`unchanged`)
    : serializeDocumentLanguageWrite(
        documentLanguage2,
        async (..._extraArguments: unknown[]) => {
          if (
            getDocumentLanguageGeneration(documentLanguage2) !==
            documentLanguageGeneration2
          )
            return `left`;
          let documentLanguage3: Dynamic =
            getDocumentLanguage(documentLanguage2);
          if (documentLanguage3 === undefined) return `left`;
          if (documentLanguage3 === canonicalizeLanguageTag2)
            return `unchanged`;
          if (documentLanguage.post === undefined) return `notSent`;
          let documentLanguageByProjectEntry: Dynamic =
            documentLanguageByProject.get(documentLanguage2);
          let sendDocumentLanguage2 = await sendDocumentLanguage(
            documentLanguage,
            canonicalizeLanguageTag2,
          );
          return getDocumentLanguageGeneration(documentLanguage2) !==
            documentLanguageGeneration2 ||
            getDocumentLanguage(documentLanguage2) === undefined
            ? `left`
            : sendDocumentLanguage2 === `allowed`
              ? (documentLanguageByProject.get(documentLanguage2) ===
                  documentLanguageByProjectEntry &&
                  pickDocumentLanguage(
                    documentLanguage2,
                    canonicalizeLanguageTag2,
                  ),
                await documentLanguage
                  .onWritten()
                  .catch((..._extraArguments: unknown[]): undefined => {}),
                `allowed`)
              : sendDocumentLanguage2;
        },
      );
}

var PAGE_WIDTH_PROPERTY: string;

var DEFAULT_DOCUMENT_LAYOUT: Readonly<{
    width: "default";
}>;

var isLayoutSettingsObject: Dynamic;

var equalDocumentLayouts: (equalDocumentLayouts2?: Dynamic, options?: Dynamic, ..._extraArguments: unknown[]) => boolean;

function parseDocumentLayout(
  documentLayout?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return isLayoutSettingsObject(documentLayout) &&
    documentLayout.pageWidth === `wide`
    ? {
        width: `wide`,
      }
    : DEFAULT_DOCUMENT_LAYOUT;
}

function serializeDocumentLayout(
  documentLayout?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let record: Dynamic = {};
  if (documentLayout.width === `wide`) {
    record.pageWidth = `wide`;
  }
  return record;
}

var EMPTY_DISPLAY_SETTINGS: Readonly<{}>;

var asDisplaySettings: Dynamic;

var equalDisplaySettings: Dynamic;

function mergeLayoutSettings(
  mergeLayoutSettings2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let {
    [PAGE_WIDTH_PROPERTY]: mergeLayoutSettings3,
    ...mergeLayoutSettings4
  }: Dynamic = mergeLayoutSettings2;
  return {
    ...mergeLayoutSettings4,
    ...options,
  };
}

var documentDisplayByProject: Dynamic;

var documentDisplayGeneration: Dynamic;

var documentDisplayListeners: Dynamic;

var getDocumentDisplayGeneration: Dynamic;

function clearDocumentDisplay(
  clearDocumentDisplay2?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (documentDisplayByProject.has(clearDocumentDisplay2)) {
    documentDisplayByProject.delete(clearDocumentDisplay2);
    documentDisplayGeneration.set(
      clearDocumentDisplay2,
      getDocumentDisplayGeneration(clearDocumentDisplay2) + 1,
    );
    for (let clearDocumentDisplayResult of documentDisplayListeners as Dynamic)
      clearDocumentDisplayResult();
  }
}

function storeDocumentDisplay(
  storeDocumentDisplay2?: Dynamic,
  base?: Dynamic,
  pick?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let documentDisplayByProjectEntry: Dynamic = documentDisplayByProject.get(
    storeDocumentDisplay2,
  );
  let display: Dynamic = pick === null ? base : mergeLayoutSettings(base, pick);
  let matchesDocumentDisplayByProjectEntry: Dynamic =
    documentDisplayByProjectEntry !== undefined &&
    equalDisplaySettings(documentDisplayByProjectEntry.display, display);
  documentDisplayByProject.set(
    storeDocumentDisplay2,
    matchesDocumentDisplayByProjectEntry
      ? {
          ...documentDisplayByProjectEntry,
          base: base,
          pick: pick,
        }
      : {
          base: base,
          pick: pick,
          display: display,
          layout: parseDocumentLayout(display),
        },
  );
  if (!matchesDocumentDisplayByProjectEntry)
    for (let storeDocumentDisplayResult of documentDisplayListeners as Dynamic)
      storeDocumentDisplayResult();
}

function updateReadDocumentDisplay(
  updateReadDocumentDisplay2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (options === null) return clearDocumentDisplay(updateReadDocumentDisplay2);
  let asDisplaySettings2: Dynamic = asDisplaySettings(options);
  let documentDisplayByProjectEntry: Dynamic = documentDisplayByProject.get(
    updateReadDocumentDisplay2,
  );
  storeDocumentDisplay(
    updateReadDocumentDisplay2,
    asDisplaySettings2,
    documentDisplayByProjectEntry !== undefined &&
      documentDisplayByProjectEntry.pick !== null &&
      equalDocumentLayouts(
        parseDocumentLayout(documentDisplayByProjectEntry.base),
        parseDocumentLayout(asDisplaySettings2),
      )
      ? documentDisplayByProjectEntry.pick
      : null,
  );
}

function pickDocumentLayout(
  pickDocumentLayout2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  if (options === null) return clearDocumentDisplay(pickDocumentLayout2);
  storeDocumentDisplay(
    pickDocumentLayout2,
    documentDisplayByProject.get(pickDocumentLayout2)?.base ??
      EMPTY_DISPLAY_SETTINGS,
    serializeDocumentLayout(options),
  );
}

function useDocumentDisplayFeed(
  pid?: Dynamic,
  page2?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let useDocumentDisplayFeedResult: Dynamic =
    usePlatformFeatureFlagsUseSyncExternalStore(DOC_FONTS_FEATURE);
  let elementRef: Dynamic = (0, React.useRef)(null);
  if (page2 !== null && page2.pid === pid) {
    elementRef.current = {
      pid: pid,
      display: asDisplaySettings(page2.style),
    };
  }
  let display: Dynamic = useDocumentDisplayFeedResult
    ? elementRef.current?.pid === pid
      ? elementRef.current.display
      : context == null
        ? null
        : asDisplaySettings(readDisplaySettings(context))
    : null;
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (display === null) {
        if (!useDocumentDisplayFeedResult) {
          updateReadDocumentDisplay(pid, null);
        }
        return;
      }
      updateReadDocumentDisplay(pid, display);
    },
    [pid, display, useDocumentDisplayFeedResult],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic =>
      (..._extraArguments: unknown[]): undefined => {
        pickDocumentLayout(pid, null);
        elementRef.current = null;
      },
    [pid],
  );
}

function applyDocumentLayoutIfCurrent(
  applyDocumentLayoutIfCurrent2?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  return !documentDisplayByProject.has(applyDocumentLayoutIfCurrent2) ||
    getDocumentDisplayGeneration(applyDocumentLayoutIfCurrent2) !== context
    ? false
    : (pickDocumentLayout(applyDocumentLayoutIfCurrent2, options), true);
}

function clearDocumentLayoutPickIfCurrent(
  clearDocumentLayoutPickIfCurrent2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let documentDisplayByProjectEntry: Dynamic = documentDisplayByProject.get(
    clearDocumentLayoutPickIfCurrent2,
  );
  return documentDisplayByProjectEntry === undefined ||
    getDocumentDisplayGeneration(clearDocumentLayoutPickIfCurrent2) !== options
    ? false
    : (documentDisplayByProjectEntry.pick !== null &&
        storeDocumentDisplay(
          clearDocumentLayoutPickIfCurrent2,
          documentDisplayByProjectEntry.base,
          null,
        ),
      true);
}

var getDocumentDisplay: Dynamic;

var getDocumentLayout: Dynamic;

var subscribeDocumentDisplay: Dynamic;

var EMPTY_DOCUMENT_DISPLAY_POST: Readonly<{}>;

function documentDisplayPostState(
  display?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return display === null
    ? {
        post: options ? EMPTY_DOCUMENT_DISPLAY_POST : null,
        applied: false,
      }
    : {
        post: {
          display: display,
        },
        applied: true,
      };
}

function useDocumentDisplay(
  documentDisplay?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (0, React.useSyncExternalStore)(
    subscribeDocumentDisplay,
    (..._extraArguments: unknown[]): Dynamic =>
      getDocumentDisplay(documentDisplay),
    (..._extraArguments: unknown[]) => null,
  );
}

function useDocumentLayout(
  documentLayout?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (0, React.useSyncExternalStore)(
    subscribeDocumentDisplay,
    (..._extraArguments: unknown[]): Dynamic =>
      getDocumentLayout(documentLayout),
    (..._extraArguments: unknown[]) => null,
  );
}

var LazyDocLayoutControl: Dynamic;

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeDocumentDisplayStep1(): void {
  (fontSettingsKey = (fontSettingsKey2: unknown): string | undefined =>
    fontSettingsKey2 == null ? `` : JSON.stringify(fontSettingsKey2));
  (equalDocumentFonts = (
    equalDocumentFonts2: DocumentFonts,
    options: DocumentFonts,
  ): boolean =>
    equalDocumentFonts2.headings === options.headings &&
    equalDocumentFonts2.text === options.text);
  (documentFontsByProject = new Map());
  (documentFontGeneration = new Map());
  (documentFontListeners = new Set());
  (getDocumentFontGeneration = (documentFontGeneration2: string): number =>
    documentFontGeneration.get(documentFontGeneration2) ?? 0);
  (getDocumentFonts = (documentFonts?: string): DocumentFonts | null =>
    (documentFonts === undefined
      ? undefined
      : documentFontsByProject.get(documentFonts)) ?? null);
  (subscribeDocumentFonts = (documentFonts: FontListener): (() => boolean) => (
    documentFontListeners.add(documentFonts),
    () => documentFontListeners.delete(documentFonts)
  ));
  (TEXT_INPUT_SELECTOR = `textarea, select, input${[`checkbox`, `radio`, `range`, `button`, `submit`, `reset`, `image`].map((item?: Dynamic, ..._extraArguments: unknown[]) => `:not([type="${item}" i])`).join(``)}, [contenteditable=""], [contenteditable="true" i], [contenteditable="plaintext-only" i]`);
  Object.freeze({
    fromWidget: false,
    origin: null,
    originShown: false,
    body: null,
    open: Object.freeze([]),
    shadowOpen: Object.freeze([]),
    expanded: Object.freeze([]),
  });
  (useKeyboardHelpStore = create(
    (keyboardHelpStore?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
      open: false,
      mounted: 0,
      returnTo: null,
      set: (
        keyboardHelpStore2?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic =>
        keyboardHelpStore(
          (keyboardHelpStore3?: Dynamic, ..._extraArguments: unknown[]) =>
            reduceKeyboardHelpVisibility(keyboardHelpStore3, keyboardHelpStore2),
        ),
      toggle: (..._extraArguments: unknown[]): Dynamic =>
        keyboardHelpStore(
          (keyboardHelpStore2?: Dynamic, ..._extraArguments: unknown[]) =>
            reduceKeyboardHelpVisibility(
              keyboardHelpStore2,
              !keyboardHelpStore2.open,
            ),
        ),
    }),
  ));
  (openKeyboardHelp = (
    openKeyboardHelp2: Dynamic = {},
    ..._extraArguments: unknown[]
  ): Dynamic => (
    useKeyboardHelpStore.setState(
      (openKeyboardHelp3?: Dynamic, ..._extraArguments: unknown[]) =>
        reduceKeyboardHelpVisibility(
          openKeyboardHelp3,
          true,
          openKeyboardHelp2.returnTo ?? null,
        ),
    ),
    useKeyboardHelpStore.getState().open
  ));
  (SKILL_PROPERTY = `skill`);
  (isSkillSettingsObject = (
    skillSettingsObject?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof skillSettingsObject == `object` &&
    !!skillSettingsObject &&
    !Array.isArray(skillSettingsObject));
  (skillSettingsKey = (
    skillSettingsKey2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => (skillSettingsKey2 == null ? `` : JSON.stringify(skillSettingsKey2)));
  (LazyPageSkillBulb = resolvePlatformChunkLoadingLazy(
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          import("../assistant/page-skill-bulb").then(
            (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
              default: result.PageSkillBulb,
            }),
          ),
        mapPreloadDependencies([12, 1, 6, 2, 0, 3]),
        import.meta.url,
      ),
  ));
  (LazyDocFontControl = resolvePlatformChunkLoadingLazy(
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          import("./formatting/font-control").then(
            (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
              default: result.DocFontControl,
            }),
          ),
        mapPreloadDependencies([13, 1, 6, 2, 0, 3, 14, 15]),
        import.meta.url,
      ),
  ));
  (DOCUMENT_LANGUAGE_FEATURE = `docLanguage`);
  (LANGUAGE_PROPERTY = `language`);
  (LANGUAGE_TAG_PATTERN = /^[A-Za-z0-9_-]{1,255}$/);
  (isLanguageSettingsObject = (
    languageSettingsObject?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof languageSettingsObject == `object` &&
    !!languageSettingsObject &&
    !Array.isArray(languageSettingsObject));
  (readDocumentLanguage = (
    documentLanguage?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    isLanguageSettingsObject(documentLanguage)
      ? canonicalizeLanguageTag(documentLanguage[LANGUAGE_PROPERTY])
      : null);
  (DOCUMENT_LANGUAGE_COPY = {
    title: `Document language`,
    hint: `Helps screen readers pronounce this document.`,
  });
  (documentLanguageByProject = new (Map as Dynamic)());
  (documentLanguageGeneration = new (Map as Dynamic)());
  (documentLanguageListeners = new (Set as Dynamic)());
  (effectiveDocumentLanguage = (
    effectiveDocumentLanguage2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    effectiveDocumentLanguage2.pick === null
      ? effectiveDocumentLanguage2.read
      : effectiveDocumentLanguage2.pick.tag);
  (notifyDocumentLanguage = (..._extraArguments: unknown[]): undefined => {
    for (let notifyDocumentLanguageResult of documentLanguageListeners as Dynamic)
      notifyDocumentLanguageResult();
  });
  (getDocumentLanguageGeneration = (
    documentLanguageGeneration2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => documentLanguageGeneration.get(documentLanguageGeneration2) ?? 0);
  (getDocumentLanguage = (
    documentLanguage?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let documentLanguageByProjectEntry: Dynamic =
      documentLanguage === undefined
        ? undefined
        : documentLanguageByProject.get(documentLanguage);
    return documentLanguageByProjectEntry === undefined
      ? undefined
      : effectiveDocumentLanguage(documentLanguageByProjectEntry);
  });
  (subscribeDocumentLanguage = (
    documentLanguage?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => (
    documentLanguageListeners.add(documentLanguage),
    (..._extraArguments: unknown[]): Dynamic =>
      documentLanguageListeners.delete(documentLanguage)
  ));
  (documentLanguageWriteChains = new (Map as Dynamic)());
  (PAGE_WIDTH_PROPERTY = `pageWidth`);
  (DEFAULT_DOCUMENT_LAYOUT = Object.freeze({
    width: `default`,
  }));
  (isLayoutSettingsObject = (
    layoutSettingsObject?: unknown,
    ..._extraArguments: unknown[]
  ) =>
    typeof layoutSettingsObject == `object` &&
    !!layoutSettingsObject &&
    !Array.isArray(layoutSettingsObject));
  (equalDocumentLayouts = (
    equalDocumentLayouts2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => equalDocumentLayouts2.width === options.width);
  (EMPTY_DISPLAY_SETTINGS = Object.freeze({}));
  (asDisplaySettings = (
    asDisplaySettings2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    isLayoutSettingsObject(asDisplaySettings2)
      ? asDisplaySettings2
      : EMPTY_DISPLAY_SETTINGS);
  (equalDisplaySettings = (
    equalDisplaySettings2?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => {
    let toSorted: Dynamic = (
      equalDisplaySettings3?: Dynamic,
      ..._extraArguments: unknown[]
    ) =>
      JSON.stringify(
        Object.entries(equalDisplaySettings3).toSorted(
          (
            [objectEntry]: Dynamic,
            [objectEntryEntry]: Dynamic,
            ..._extraArguments: unknown[]
          ) =>
            objectEntry < objectEntryEntry
              ? -1
              : +(objectEntry > objectEntryEntry),
        ),
      );
    return (
      equalDisplaySettings2 === options ||
      toSorted(equalDisplaySettings2) === toSorted(options)
    );
  });
  (documentDisplayByProject = new (Map as Dynamic)());
  (documentDisplayGeneration = new (Map as Dynamic)());
  (documentDisplayListeners = new (Set as Dynamic)());
  (getDocumentDisplayGeneration = (
    documentDisplayGeneration2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => documentDisplayGeneration.get(documentDisplayGeneration2) ?? 0);
  (getDocumentDisplay = (
    documentDisplay?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    (documentDisplay === undefined
      ? undefined
      : documentDisplayByProject.get(documentDisplay)?.display) ?? null);
  (getDocumentLayout = (
    documentLayout?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    (documentLayout === undefined
      ? undefined
      : documentDisplayByProject.get(documentLayout)?.layout) ?? null);
  (subscribeDocumentDisplay = (
    documentDisplay?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => (
    documentDisplayListeners.add(documentDisplay),
    (..._extraArguments: unknown[]): Dynamic =>
      documentDisplayListeners.delete(documentDisplay)
  ));
  (EMPTY_DOCUMENT_DISPLAY_POST = Object.freeze({}));
  (LazyDocLayoutControl = resolvePlatformChunkLoadingLazy(
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          import("./formatting/layout-control").then(
            (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
              default: result.DocLayoutControl,
            }),
          ),
        mapPreloadDependencies([16, 1, 6, 2, 0, 3, 14, 15]),
        import.meta.url,
      ),
  ));
}

export { DOCUMENT_LANGUAGE_COPY, DOCUMENT_LANGUAGE_FEATURE, PAGE_WIDTH_PROPERTY, SKILL_PROPERTY, applyDocumentFontsIfCurrent, applyDocumentLayoutIfCurrent, canReleasePeekFocus, classifyFrameFocusReturn, classifyTitleClick, classifyTitleEscape, classifyTitleFocusRequest, clearDocumentLayoutPickIfCurrent, documentDisplayPostState, documentFontsPostState, documentLanguageAttributes, equalDocumentFonts, equalDocumentLayouts, fontSettingsKey, getDocumentDisplayGeneration, getDocumentFontGeneration, getDocumentFonts, hasKeyboardFrameFocus, openKeyboardHelp, parseDocumentFonts, parseDocumentLayout, pickDocumentLayout, readDisplaySettings, readDocumentLanguage, readPageSkillSettings, reduceKeyboardHelpVisibility, serializeDocumentFonts, serializeDocumentLayout, setDocumentFonts, skillSettingsKey, subscribeDocumentFonts, useDocumentDisplay, useDocumentDisplayFeed, useDocumentFontFeed, useDocumentFonts, useDocumentLanguage, useDocumentLanguageFeed, useDocumentLayout, useKeyboardHelpStore, withoutLanguagePost, withoutSkillPost, withoutTypographyPost, writeDocumentLanguage };
