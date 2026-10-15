/** markdown-renderer: restored from MarkdownRenderer-B5dkWytq.js. */
import type { Dynamic } from "./types";
import { r as toModuleNamespace } from "./rolldown-runtime";
import {
  Bg as PlatformApiAndAuthAssign,
  HM as loadReact,
  UE as loadJsxRuntime,
  iE as UiOverlaysAndIconsCustomIcon,
  vx as toast,
  xC as Tooltip,
} from "./platform-core";
import {
  i as Streamdown,
  n as chatRehypePlugins,
  r as useMarkdownCodePlugins,
} from "./chat-markdown";
import {
  Gt as stripMarkdownFrontmatter,
  Jt as useFileSnapshot,
  Kt as saveTextFilesAndUploadOtherFiles,
} from "./platform-lazy";
var React: Dynamic = toModuleNamespace(loadReact(), 1);
var jsxRuntime: Dynamic = loadJsxRuntime();
var headingSlug: Dynamic = (
  text?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, ``)
    .replace(/\s+/g, `-`);
var childrenText: Dynamic = (
  children?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  children == null || typeof children == `boolean`
    ? ``
    : typeof children == `string` || typeof children == `number`
      ? String(children)
      : Array.isArray(children)
        ? children.map(childrenText).join(``)
        : (0, React.isValidElement)(children)
          ? childrenText(children.props.children)
          : ``;
var headingComponent: Dynamic = (
  TagComponent?: Dynamic,
  className?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  function (
    { children: children }: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic {
    return (
      <TagComponent
        id={headingSlug(childrenText(children))}
        data-heading={true}
        className={`${className} scroll-mt-4 transition-colors`}
      >
        {children}
      </TagComponent>
    );
  };
var markdownComponents: Dynamic = {
  h1: headingComponent(`h1`, `mt-6 mb-3 text-2xl font-semibold first:mt-0`),
  h2: headingComponent(`h2`, `mt-5 mb-2 text-xl font-semibold`),
  h3: headingComponent(`h3`, `mt-4 mb-2 text-lg font-semibold`),
  h4: headingComponent(`h4`, `mt-3 mb-1.5 text-base font-semibold`),
  h5: headingComponent(`h5`, `mt-3 mb-1 text-sm font-semibold`),
  h6: headingComponent(`h6`, `mt-3 mb-1 text-sm font-semibold`),
};
function MarkdownRenderer(
  { path: path, selection: selection }: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let containerRef: Dynamic = (0, React.useRef)(null);
  let {
    raw: markdownRendererResult,
    setRaw: markdownRendererResult2,
    draft: markdownRendererResult3,
    setDraft: markdownRendererResult4,
    editing: markdownRendererResult5,
    setEditing: markdownRendererResult6,
    error: markdownRendererResult7,
    mime: markdownRendererResult8,
  }: Dynamic = useFileSnapshot(path);
  let addSelection: Dynamic = PlatformApiAndAuthAssign(
    (markdownRenderer?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      markdownRenderer.add,
  );
  let isMarkdown: Dynamic =
    markdownRendererResult8 === undefined ||
    markdownRendererResult8 === `text/markdown`;
  let renderedMarkdown: Dynamic = isMarkdown
    ? stripMarkdownFrontmatter(
        markdownRendererResult3 ?? markdownRendererResult ?? ``,
      )
    : ``;
  let headings: Dynamic = useMarkdownCodePlugins(renderedMarkdown);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      if (
        !containerRef.current ||
        markdownRendererResult === undefined ||
        !selection ||
        markdownRendererResult5
      )
        return;
      let replace: Dynamic = selection.replace(/^#/, ``);
      let matchedElement: Dynamic = containerRef.current.querySelector(
        `[id="${CSS.escape(replace)}"]`,
      );
      if (!matchedElement) return;
      matchedElement.scrollIntoView({
        block: `start`,
        behavior: `smooth`,
      });
      matchedElement.classList.add(`bg-fill-brand/15`);
      let setTimeout2: Dynamic = setTimeout(
        (..._extraArguments: unknown[]): Dynamic =>
          matchedElement.classList.remove(`bg-fill-brand/15`),
        2e3,
      );
      return (..._extraArguments: unknown[]): Dynamic =>
        clearTimeout(setTimeout2);
    },
    [markdownRendererResult, selection, markdownRendererResult5],
  );
  let captureSelection = (..._extraArguments: unknown[]): undefined => {
    let selection2: Dynamic = (window as Dynamic).getSelection();
    let trimmedSelectionText: Dynamic = selection2?.toString().trim();
    if (
      !selection2 ||
      !trimmedSelectionText ||
      !containerRef.current?.contains(selection2.anchorNode)
    )
      return;
    let anchorNode: Dynamic =
      selection2.anchorNode instanceof (Element as Dynamic)
        ? selection2.anchorNode
        : selection2.anchorNode?.parentElement;
    addSelection({
      path: path,
      hash:
        [...containerRef.current.querySelectorAll(`[data-heading]`)].findLast(
          (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            anchorNode &&
            item.compareDocumentPosition(anchorNode) &
              Node.DOCUMENT_POSITION_FOLLOWING,
        )?.id ?? ``,
      text: trimmedSelectionText.slice(0, 200),
    });
  };
  let hasChanges: Dynamic =
    markdownRendererResult3 !== undefined &&
    markdownRendererResult3 !== markdownRendererResult;
  let saveDraft = async (..._extraArguments: unknown[]): Promise<undefined> => {
    if (!hasChanges || markdownRendererResult3 === undefined) return;
    let lastIndexOf: Dynamic = path.lastIndexOf(`/`);
    let pathSlice: Dynamic = path.slice(0, lastIndexOf);
    let pathSlice2: Dynamic = path.slice(lastIndexOf + 1);
    let blob: Dynamic = new (Blob as Dynamic)([markdownRendererResult3], {
      type: `text/markdown`,
    });
    await toast
      .promise(
        saveTextFilesAndUploadOtherFiles(
          pathSlice,
          {
            [pathSlice2]: blob,
          },
          [],
          {},
          {
            asEditor: true,
          },
        ),
        {
          loading: `Saving ${pathSlice2}…`,
          success: `${pathSlice2} saved`,
          error: (markdownRenderer?: Dynamic, ..._extraArguments: unknown[]) =>
            `Save failed: ${markdownRenderer}`,
        },
      )
      .unwrap();
    markdownRendererResult2(markdownRendererResult3);
  };
  return markdownRendererResult7 ? (
    <div className={`p-4 font-mono text-xs text-danger`}>
      {markdownRendererResult7}
    </div>
  ) : markdownRendererResult === undefined ? (
    <div className={`text-muted p-4 text-xs`}>{`Loading…`}</div>
  ) : (
    <div className={`relative h-full`}>
      <Tooltip content={markdownRendererResult5 ? `Preview (saves)` : `Edit`}>
        <button
          type={`button`}
          onClick={async (
            ..._extraArguments: unknown[]
          ): Promise<undefined> => {
            if (markdownRendererResult5) {
              await saveDraft();
            }
            markdownRendererResult6(
              (markdownRenderer?: Dynamic, ..._extraArguments: unknown[]) =>
                !markdownRenderer,
            );
          }}
          className={`bg-surface-popover border-strong text-secondary hover:text-primary absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded border px-2 py-1 text-xs`}
        >
          {markdownRendererResult5 ? (
            <UiOverlaysAndIconsCustomIcon name={`Eye`} customSize={14} />
          ) : (
            <UiOverlaysAndIconsCustomIcon name={`Edit`} customSize={14} />
          )}
          {markdownRendererResult5 ? `Preview` : `Edit`}
          {hasChanges && (
            <span className={`bg-fill-brand size-1.5 rounded-full`} />
          )}
        </button>
      </Tooltip>
      {markdownRendererResult5 ? (
        <textarea
          value={markdownRendererResult3}
          onChange={(event?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            markdownRendererResult4(event.target.value)
          }
          onKeyDown={(
            event?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if ((event.metaKey || event.ctrlKey) && event.key === `s`) {
              event.preventDefault();
              saveDraft();
            }
          }}
          spellCheck={false}
          className={`text-primary h-full w-full resize-none border-0 bg-transparent px-10 py-8 font-mono text-[13px] leading-relaxed outline-none`}
        />
      ) : (
        <div
          ref={containerRef}
          onMouseUp={captureSelection}
          className={`text-primary h-full overflow-y-auto px-10 py-8 text-sm leading-relaxed [&_:where(code)]:text-[0.9em] [&_:where(p,ul,ol,pre,blockquote,table)]:my-2`}
        >
          <div className={`mx-auto max-w-3xl`}>
            {isMarkdown ? (
              <Streamdown
                components={markdownComponents}
                plugins={headings}
                rehypePlugins={chatRehypePlugins}
              >
                {renderedMarkdown}
              </Streamdown>
            ) : (
              <pre className={`text-code leading-relaxed whitespace-pre-wrap`}>
                {markdownRendererResult3 ?? markdownRendererResult}
              </pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export { MarkdownRenderer };
