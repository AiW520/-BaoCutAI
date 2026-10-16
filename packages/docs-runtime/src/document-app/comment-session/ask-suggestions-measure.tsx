/** BaoCut: comment session from index-CX4IZqzA.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  DataModelSchemasPending,
  DataModelSchemasState24,
  DataModelSchemasState25,
  Link,
  PlatformSessionAndSourcesClaudeRepliedInTheComments,
  filterDataModelSchemasFilter3,
  heldThreads,
  quietCarrierThreads,
  resolveCommentsStoreLayer,
  resolveDataModelSchemasAgentRows,
  resolveDataModelSchemasSent,
  resolveDataModelSchemasValue8,
  resolvePlatformAnnouncementsValue,
  resolvePlatformSessionAndSourcesSent2,
  summonAskSettled,
  updateCommentsEditorFailed,
  useCommentStore,
} from "../dependencies";
import {
  React,
  jsxRuntime,
} from "../bootstrap";
import {
  CommentSessionState13,
  CommentSessionState2,
  clearCommentSessionEnd,
  clearCommentSessionThreadId,
  commentSessionLimit0,
  getCommentSessionFile,
  resolveCommentSessionNow,
  resolveCommentSessionValue5,
} from "./clear-comment-session-thread-id";
import {
  resolveCommentSessionValue7,
} from "./use-comment-session-bridge";
import type * as ReactComponentTypes from "react";

export const AskSuggestionsMeasure: ReactComponentTypes.FC<Dynamic> = ({
  items: items,
  onPick: onPick,
  className: className,
}) => {
  let elementRef: Dynamic = (0, React.useRef)(null);
  let elementRef2: Dynamic = (0, React.useRef)(null);
  let [itemsCountState, setItemsCountState]: Dynamic = (0, React.useState)(items.length);
  (0, React.useLayoutEffect)(
    (..._extraArguments: unknown[]): Dynamic => {
      let element: Dynamic = elementRef.current;
      let element2: Dynamic = elementRef2.current;
      if (!element || !element2) return;
      let querySelectorAll = (..._extraArguments: unknown[]): undefined => {
        setItemsCountState(
          resolveCommentSessionValue10(
            [...element2.querySelectorAll(`[data-suggestion]`)].map(
              (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                item.offsetLeft + item.offsetWidth,
            ),
            element.clientWidth,
          ),
        );
      };
      querySelectorAll();
      if (typeof ResizeObserver === "undefined") return;
      let resizeObserver = new ResizeObserver(querySelectorAll);
      resizeObserver.observe(element);
      return (..._extraArguments: unknown[]) => resizeObserver.disconnect();
    },
    [items],
  );
  if (items.length === 0) return null;
  let jsxs: Dynamic = (
    askSuggestionsMeasure?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ) => (
    <jsxRuntime.Fragment>
      <span className={`text-muted`} aria-hidden={options ? undefined : true}>
        {CommentSession_Try}
      </span>
      {askSuggestionsMeasure.map(
        (item?: Dynamic, index?: Dynamic, ..._extraArguments: unknown[]) => (
          <React.Fragment key={item.id}>
            {index > 0 && <span className={`text-muted`} aria-hidden={true}>{`·`}</span>}
            {options ? (
              <Link
                inheritColor={true}
                data-suggestion={item.id}
                onClick={(..._extraArguments: unknown[]): Dynamic => onPick(item)}
              >
                {item.label}
              </Link>
            ) : (
              <Link inheritColor={true} disabled={true} data-suggestion={item.id}>
                {item.label}
              </Link>
            )}
          </React.Fragment>
        ),
      )}
    </jsxRuntime.Fragment>
  );
  return (
    <div ref={elementRef} className={`relative min-w-0 ${className ?? ``}`}>
      <div
        ref={elementRef2}
        aria-hidden={true}
        className={`text-secondary text-caption pointer-events-none invisible absolute top-0 left-0 flex items-baseline gap-1.5 whitespace-nowrap`}
        data-testid={`ask-suggestions-measure`}
      >
        {jsxs(items, false)}
      </div>
      {itemsCountState > 0 && (
        <div
          role={`group`}
          aria-label={`Suggestions`}
          className={`text-secondary text-caption flex items-baseline gap-1.5 overflow-x-clip whitespace-nowrap`}
          data-testid={`ask-suggestions`}
        >
          {jsxs(items.slice(0, itemsCountState), true)}
        </div>
      )}
    </div>
  );
};

function updateCommentSessionSince2(
  updateCommentSessionSince22?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let now = Date.now();
  let since: Dynamic =
    commentSessionMap11.get(updateCommentSessionSince22)?.since ??
    now - options;
  let difference = CommentSessionCapMs.capMs - (now - since);
  if (context === `taken`) {
    difference = Math.max(
      difference,
      (commentSessionMap10.get(updateCommentSessionSince22)?.takenAt ?? 0) +
        CommentSessionCapMs.takeMs -
        now,
    );
  }
  return difference <= 0
    ? (commentSessionMap11.set(updateCommentSessionSince22, {
        since: since,
        at: 0,
      }),
      context === `working` &&
        clearCommentSessionThreadId(
          updateCommentSessionSince22,
          `still_working`,
          `runner`,
        ),
      context === `taken` &&
        commentSessionMap10.delete(updateCommentSessionSince22),
      context !== `taken`)
    : (resolveCommentSessionNow(
        updateCommentSessionSince22,
        Math.min(options, difference),
      ),
      commentSessionMap11.delete(updateCommentSessionSince22),
      commentSessionMap11.set(updateCommentSessionSince22, {
        since: since,
        at:
          DataModelSchemasPending.getState().pending[
            updateCommentSessionSince22
          ]?.at ?? 0,
      }),
      commentSessionMap11.size > commentSessionLimit2564 &&
        commentSessionMap11.delete(commentSessionMap11.keys().next().value),
      true);
}

var CommentSessionCapMs: {
    capMs: number;
    takeMs: number;
};

var commentSessionIdentity: Dynamic;

var commentSessionMap9: Dynamic;

var getCommentSessionValue: Dynamic;

var CommentSessionState14: Dynamic;

function registerCommentSessionHost(
  registerCommentSessionHost2?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  CommentSessionState14 = registerCommentSessionHost2;
  return (..._extraArguments: unknown[]): undefined => {
    if (CommentSessionState14 === registerCommentSessionHost2) {
      CommentSessionState14 = null;
    }
  };
}

var commentSessionMap10: Dynamic;

var commentSessionSet5: Dynamic;

function clearCommentSessionSize(
  clearCommentSessionSize2?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (!(options !== `working` && options !== `queued`)) {
    commentSessionSet5.add(clearCommentSessionSize2);
    if (commentSessionSet5.size > commentSessionLimit2564) {
      commentSessionSet5.delete(commentSessionSet5.values().next().value);
    }
  }
}

function updateCommentSessionCarrier(
  updateCommentSessionCarrier2?: Dynamic,
  carrier?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (
    commentSessionMap10.get(updateCommentSessionCarrier2)?.carrier !== carrier
  ) {
    commentSessionMap10.delete(updateCommentSessionCarrier2);
    commentSessionMap10.set(updateCommentSessionCarrier2, {
      carrier: carrier,
      waited: commentSessionSet5.has(carrier),
      last: ``,
      takenAt: 0,
    });
    if (commentSessionMap10.size > commentSessionLimit2564) {
      commentSessionMap10.delete(commentSessionMap10.keys().next().value);
    }
  }
}

function getCommentSessionWaited(
  commentSessionWaited?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  let commentSessionMap10Entry: Dynamic =
    commentSessionMap10.get(commentSessionWaited);
  if (commentSessionMap10Entry !== undefined) {
    if (options === `working` || options === `queued`) {
      commentSessionMap10Entry.waited = true;
    }
    if (options === `sent` && commentSessionMap10Entry.last !== `sent`) {
      commentSessionMap10Entry.takenAt = Date.now();
    }
    commentSessionMap10Entry.last = options;
  }
}

var getCommentSessionWaited2: Dynamic;

async function loadCommentSessionCanSend(
  ask?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  dependencies?: Dynamic,
  argument?: Dynamic,
  ..._extraArguments: unknown[]
): Promise<undefined> {
  let loadCommentSessionCanSendResult: Dynamic;
  try {
    loadCommentSessionCanSendResult = await context();
  } catch {
    argument.say(ask.threadId, options);
    return;
  }
  if (loadCommentSessionCanSendResult === `available`) {
    let matchesSendFirst = ask.sendFirst === true;
    let canSend: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
      matchesSendFirst
        ? context()
        : ((matchesSendFirst = true),
          Promise.resolve(loadCommentSessionCanSendResult));
    let options2: Dynamic = options;
    await dependencies(
      {
        canSend: canSend,
        note: (
          commentSessionCanSend?: Dynamic,
          options3?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          argument.note(commentSessionCanSend, options3);
          if (options3 === `sent`) {
            argument.arm(commentSessionCanSend);
          } else {
            if (
              options3 !== null &&
              options3 === options2 &&
              resolveDataModelSchemasSent(options3)
            ) {
              argument.say(commentSessionCanSend, options3);
            }
          }
          if (options3 !== null) {
            options2 = options3;
          }
        },
      },
      ask,
    ).catch((..._extraArguments: unknown[]): undefined => undefined);
    return;
  }
  if (loadCommentSessionCanSendResult === `unknown`) {
    argument.say(ask.threadId, options);
    return;
  }
  let loadCommentSessionCanSendResult2: Dynamic = resolveDataModelSchemasValue8(
    ask,
    loadCommentSessionCanSendResult,
  );
  if (loadCommentSessionCanSendResult2 !== null) {
    argument.pinDark(ask.threadId, loadCommentSessionCanSendResult2);
    argument.say(ask.threadId, loadCommentSessionCanSendResult2);
  }
}

function clearCommentSessionKey(..._extraArguments: unknown[]): Dynamic {
  return useCommentStore.subscribe(
    (
      clearCommentSessionKey2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        clearCommentSessionKey2.byPage === options.byPage &&
        clearCommentSessionKey2.allByPage === options.allByPage
      )
        return;
      if (
        CommentSessionState13.standing.n > 0 &&
        resolveCommentSessionValue5(clearCommentSessionKey2) >
          commentSessionLimit0
      ) {
        CommentSessionState13.reset();
      }
      let pending: Dynamic = DataModelSchemasPending.getState().pending;
      if (Object.keys(pending).length !== 0)
        for (let clearCommentSessionKeyResult of heldThreads(
          clearCommentSessionKey2,
        ) as Dynamic) {
          let pendingItem: Dynamic = pending[clearCommentSessionKeyResult.id];
          if (
            !(
              pendingItem === undefined ||
              !resolveDataModelSchemasAgentRows(
                pendingItem,
                clearCommentSessionKeyResult,
              )
            )
          ) {
            if (
              Object.hasOwn(
                DataModelSchemasPending.getState().pending,
                clearCommentSessionKeyResult.id,
              )
            ) {
              DataModelSchemasPending.getState().clear(
                clearCommentSessionKeyResult.id,
              );
              commentSessionMap10.delete(clearCommentSessionKeyResult.id);
              summonAskSettled(clearCommentSessionKeyResult.id);
              if (
                resolvePlatformSessionAndSourcesSent2(
                  clearCommentSessionKey2.summonNotes[
                    clearCommentSessionKeyResult.id
                  ],
                )
              ) {
                clearCommentSessionKey2.setSummonNote(
                  clearCommentSessionKeyResult.id,
                  null,
                );
              }
              if (!quietCarrierThreads.has(clearCommentSessionKeyResult.id)) {
                resolvePlatformAnnouncementsValue(
                  document,
                  PlatformSessionAndSourcesClaudeRepliedInTheComments,
                  {
                    key: `summon:${clearCommentSessionKeyResult.id}`,
                  },
                );
              }
              clearCommentSessionEnd(
                clearCommentSessionKeyResult.id,
                (..._extraArguments: unknown[]) =>
                  getCommentSessionFile(clearCommentSessionKeyResult.id)
                    ? `both`
                    : `replied`,
              );
              CommentSessionState2.replied();
            }
          }
        }
    },
  );
}

var CommentSessionState15: Dynamic;

var commentSessionSet6: Dynamic;

var commentSessionLimit2564: number;

var commentSessionMap11: Dynamic;

function resolveCommentSessionSubscribe2(
  commentSessionSubscribe2: Dynamic = (
    commentSessionSubscribe22?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    resolveCommentsStoreLayer(
      `host`,
      `summon_recovered`,
      commentSessionSubscribe22,
    ),
  ..._extraArguments: unknown[]
): Dynamic {
  return useCommentStore.subscribe(
    (
      commentSessionSubscribe22?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (
        !(
          CommentSessionState15.size === 0 ||
          (commentSessionSubscribe22.byPage === options.byPage &&
            commentSessionSubscribe22.allByPage === options.allByPage)
        )
      )
        for (let resolveCommentSessionSubscribe2Result of heldThreads(
          commentSessionSubscribe22,
        ) as Dynamic) {
          if (
            !CommentSessionState15.has(resolveCommentSessionSubscribe2Result.id)
          )
            continue;
          let answered: Dynamic = CommentSessionState15.answered(
            resolveCommentSessionSubscribe2Result.id,
            filterDataModelSchemasFilter3(
              resolveCommentSessionSubscribe2Result,
            ),
            Date.now(),
          );
          if (answered !== null) {
            commentSessionSubscribe2(answered);
            CommentSessionState2.replied();
          }
        }
    },
  );
}

var CommentSession_Try: string;

function resolveCommentSessionValue10(
  items?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) {
  let index = 0;
  for (; index < items.length && items[index] <= options; ) index++;
  return index;
}

var CommentSessionHeading: Dynamic;

var CommentSessionEmpty: Dynamic;

function resolveCommentSessionCommentOnly(
  entry?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  if (entry.commentOnly) {
    items.push(`O2`);
  }
  let CommentSessionHeadingItem: Dynamic =
    `block` in entry && entry.block
      ? CommentSessionHeading[entry.block]
      : undefined;
  switch (
    (CommentSessionHeadingItem && items.push(CommentSessionHeadingItem),
    entry.kind)
  ) {
    case `selection`:
      items.push(entry.long ? `S2` : `S1`);
      break;
    case `tableCells`:
      items.push(`S3`);
      break;
    case `image`:
      items.push(`S4`);
      break;
    case `widget`:
      items.push(`S5`);
      break;
    case `chartPoint`:
      items.push(`S6`, `S5`);
      break;
    case `inlineAsk`:
      if (entry.shape === `empty`) {
        items.push(`W1`);
      } else {
        items.push(`S7`);
        if (entry.shape) {
          items.push(CommentSessionEmpty[entry.shape]);
        }
      }
      break;
    case `page`:
      items.push(CommentSessionEmpty[entry.shape]);
      break;
  }
  if (entry.openedDirectly) {
    items.push(`O1`);
  }
  return items;
}

var resolveCommentSessionPrompt: Dynamic;

function resolveCommentSessionLabel(
  commentSessionLabel?: Dynamic,
  entry?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let row: Dynamic =
    entry.kind === `chartPoint` && entry.row ? entry.row : `this point`;
  let replaceAll: Dynamic = (
    commentSessionLabel2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    commentSessionLabel2.includes(`{row}`)
      ? commentSessionLabel2.replaceAll(`{row}`, row)
      : commentSessionLabel2;
  let label: Dynamic = replaceAll(commentSessionLabel.label);
  let prompt: Dynamic =
    commentSessionLabel.prompt === undefined
      ? undefined
      : replaceAll(commentSessionLabel.prompt);
  return label === commentSessionLabel.label &&
    prompt === commentSessionLabel.prompt
    ? commentSessionLabel
    : {
        ...commentSessionLabel,
        label: label,
        ...(prompt === undefined
          ? {}
          : {
              prompt: prompt,
            }),
      };
}

var resolveCommentSessionLabel2: Dynamic;

var resolveCommentSessionLabel3: Dynamic;

var resolveCommentSessionLabel4: Dynamic;

var CommentSessionState16: Dynamic;

var CommentAnchorsState: Dynamic;

var CommentAnchorsState2: Dynamic;

var commentAnchorsPattern: RegExp;

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeCommentSessionAskSuggestionsMeasureStep1(): void {
  (CommentSessionCapMs = {
    capMs: DataModelSchemasState25,
    takeMs: DataModelSchemasState24,
  });
}

// BaoCut: called by docs-app-initialize in the recovered source order.
export function initializeCommentSessionAskSuggestionsMeasureStep2(): void {
  (commentSessionIdentity = (
    commentSessionIdentity2?: Dynamic,
    ..._extraArguments: unknown[]
  ) => resolveCommentSessionValue7(commentSessionIdentity2));
  (commentSessionMap9 = new (Map as Dynamic)());
  (getCommentSessionValue = (
    commentSessionValue?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => commentSessionMap9.get(commentSessionValue));
  (CommentSessionState14 = null);
  (commentSessionMap10 = new (Map as Dynamic)());
  (commentSessionSet5 = new (Set as Dynamic)());
  (getCommentSessionWaited2 = (
    commentSessionWaited2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let commentSessionMap10Entry: Dynamic = commentSessionMap10.get(
      commentSessionWaited2,
    );
    return (
      commentSessionMap10Entry !== undefined &&
      commentSessionMap10Entry.waited &&
      commentSessionMap10Entry.last === `sent`
    );
  });
  (CommentSessionState15 = updateCommentsEditorFailed());
  (commentSessionSet6 = new (Set as Dynamic)());
  (commentSessionLimit2564 = 256);
  (commentSessionMap11 = new (Map as Dynamic)());
  (CommentSession_Try = `Try:`);
  (CommentSessionHeading = {
    heading: `B1`,
    list: `B2`,
    code: `B3`,
    quote: `B4`,
  });
  (CommentSessionEmpty = {
    empty: `W1`,
    short: `W2`,
    long: `W3`,
    tablesNoChart: `W4`,
  });
  (resolveCommentSessionPrompt = (
    commentSessionPrompt?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => commentSessionPrompt.prompt ?? commentSessionPrompt.label);
  (resolveCommentSessionLabel2 = (
    commentSessionLabel2?: Dynamic,
    label?: Dynamic,
    prompt?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    id: commentSessionLabel2,
    label: label,
    cat: `agentic`,
    ...(prompt === undefined
      ? {}
      : {
          prompt: prompt,
        }),
  }));
  (resolveCommentSessionLabel3 = (
    commentSessionLabel3?: Dynamic,
    label?: Dynamic,
    prompt?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    id: commentSessionLabel3,
    label: label,
    cat: `context`,
    ...(prompt === undefined
      ? {}
      : {
          prompt: prompt,
        }),
  }));
  (resolveCommentSessionLabel4 = (
    commentSessionLabel4?: Dynamic,
    label?: Dynamic,
    prompt?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ({
    id: commentSessionLabel4,
    label: label,
    cat: `editing`,
    ...(prompt === undefined
      ? {}
      : {
          prompt: prompt,
        }),
  }));
  (CommentSessionState16 = {
    S1: [
      resolveCommentSessionLabel2(
        `check-still-true`,
        `Check this is still true`,
        `Check whether this is still accurate. If it isn't, rewrite it with the current facts and say where you found them.`,
      ),
      resolveCommentSessionLabel4(
        `say-simply`,
        `Say this more simply`,
        `Rewrite this so it says the same thing more plainly, at about the same length.`,
      ),
      resolveCommentSessionLabel3(
        `explain`,
        `Explain this`,
        `Explain what this means in plain terms, in a reply — don't change the document.`,
      ),
    ],
    S2: [
      resolveCommentSessionLabel2(
        `checklist`,
        `Turn into a checklist`,
        `Turn this into a checklist of concrete steps in the order they should happen, with an owner for each where the document makes it obvious.`,
      ),
      resolveCommentSessionLabel4(
        `restructure`,
        `Restructure this`,
        `Reorganize this so the main point comes first and the supporting detail follows. Keep all the content.`,
      ),
      resolveCommentSessionLabel3(
        `summarize`,
        `Summarize this`,
        `Summarize this passage in three sentences, in a reply.`,
      ),
    ],
    S3: [
      resolveCommentSessionLabel2(
        `update-cells`,
        `Update these numbers`,
        `Find the latest values for these cells, update them in place, and tell me in a reply what changed and where each new value came from.`,
      ),
      resolveCommentSessionLabel3(
        `add-up`,
        `Do these add up?`,
        `Check these values against each other and the rest of the table (totals, percentages, sums). Tell me in a reply what doesn't add up.`,
      ),
      resolveCommentSessionLabel4(
        `match-format`,
        `Match the table's format`,
        `Make these cells use the same format as the rest of the table — units, decimals, dates, capitalization.`,
      ),
    ],
    S4: [
      resolveCommentSessionLabel2(
        `caption`,
        `Write a caption`,
        `Look at this image and add a one-sentence caption below it, in the document's tone.`,
      ),
      resolveCommentSessionLabel2(
        `recreate-chart`,
        `Recreate as a chart`,
        `If this image shows data (a chart or table), rebuild it as an editable chart in the document with the same values. Tell me if you can't read the values.`,
      ),
      resolveCommentSessionLabel4(
        `alt-text`,
        `Add alt text`,
        `Write concise alt text for this image for people who can't see it.`,
      ),
    ],
    S5: [],
    S6: [
      resolveCommentSessionLabel2(
        `check-value`,
        `Check this value`,
        `Verify the value for {row} against its source. Correct it if it's wrong and say what changed.`,
      ),
    ],
    S7: [
      resolveCommentSessionLabel2(
        `draft-next`,
        `Draft what comes next`,
        `Based on what's above this line, draft the next paragraph in the same voice and add it here.`,
      ),
      resolveCommentSessionLabel4(
        `tighten-above`,
        `Tighten the text above`,
        `Tighten the paragraph above this line: shorter sentences, no repetition, same meaning.`,
      ),
    ],
    B1: [
      resolveCommentSessionLabel2(
        `write-section`,
        `Write this section`,
        `Write the content for this section from the heading and the rest of the document. Add it under the heading in the document's voice, and flag anything you guessed in a reply.`,
      ),
      resolveCommentSessionLabel3(
        `summarize-section`,
        `Summarize this section`,
        `Add a one-sentence summary under this heading so a reader can decide whether to read on.`,
      ),
      resolveCommentSessionLabel4(
        `split-section`,
        `Split this section`,
        `If this section covers more than one topic, split it into sections with their own headings.`,
      ),
    ],
    B2: [
      resolveCommentSessionLabel2(
        `owners-dates`,
        `Add owners and dates`,
        `Turn this into a checklist where each item has an owner and a target date. Use names and dates from the document where you can; leave clear blanks where you can't.`,
      ),
      resolveCommentSessionLabel3(
        `matter-most`,
        `Which matter most?`,
        `Rank these items by importance and say why, in a reply. Don't change the list.`,
      ),
      resolveCommentSessionLabel4(
        `sort-list`,
        `Sort this list`,
        `Put these items in a sensible order (priority, time, or alphabetical) and tell me which you chose.`,
      ),
    ],
    B3: [
      resolveCommentSessionLabel2(
        `find-bug`,
        `Find the bug`,
        `Look for bugs or unhandled edge cases in this code. Fix what you can in place and explain each fix in a reply.`,
      ),
      resolveCommentSessionLabel3(
        `explain-code`,
        `Explain this code`,
        `Explain what this code does, step by step, in a reply for someone who doesn't know it.`,
      ),
      resolveCommentSessionLabel4(
        `clean-up`,
        `Clean this up`,
        `Tidy this code — consistent naming, remove anything unused, simplify where it's safe — without changing what it does.`,
      ),
    ],
    B4: [
      resolveCommentSessionLabel2(
        `find-source`,
        `Find the source`,
        `Find where this quote comes from, check the wording, and add the attribution with a link. If you can't find it, say so in a reply.`,
      ),
      resolveCommentSessionLabel4(
        `shorten`,
        `Shorten this`,
        `Trim this to the part that carries the point, without changing its meaning.`,
      ),
      resolveCommentSessionLabel4(
        `make-paragraph`,
        `Make it a paragraph`,
        `Turn this callout into a normal paragraph that flows with the text around it.`,
      ),
    ],
    W1: [
      resolveCommentSessionLabel2(
        `draft-page`,
        `Draft this doc`,
        `Draft a first version of this document from its title: headings and a short paragraph under each. Leave a reply listing anything you guessed.`,
      ),
      resolveCommentSessionLabel2(
        `similar-page`,
        `Start from a similar doc`,
        `Find the document in this workspace most like what this title suggests and use its structure as the starting point here.`,
      ),
      resolveCommentSessionLabel3(
        `suggest-outline`,
        `Suggest an outline`,
        `Suggest an outline for this document in a reply, one line per section on what it should cover.`,
      ),
    ],
    W2: [
      resolveCommentSessionLabel2(
        `expand-page`,
        `Expand into a full doc`,
        `Expand this into a complete document: add the sections a reader would expect and draft them, keeping everything that's here.`,
      ),
      resolveCommentSessionLabel2(
        `sources-throughout`,
        `Add sources throughout`,
        `Find a source for each factual claim in this document and add it as a link. List in a reply the claims you couldn't source.`,
      ),
      resolveCommentSessionLabel4(
        `add-structure`,
        `Add structure`,
        `Organize this document into sections with headings.`,
      ),
    ],
    W3: [
      resolveCommentSessionLabel2(
        `summary-top`,
        `Add a summary at the top`,
        `Read the whole document and add a short summary at the top covering the key points and any decisions or asks.`,
      ),
      resolveCommentSessionLabel3(
        `who-reviews`,
        `Who should review this?`,
        `Based on what this document covers, what kinds of people should review it, and which sections? Answer in a reply.`,
      ),
      resolveCommentSessionLabel4(
        `section-list`,
        `Add a section list`,
        `Add a short list of the sections at the top of the document so a reader can see the shape of it.`,
      ),
    ],
    W4: [
      resolveCommentSessionLabel2(
        `build-chart`,
        `Build a chart`,
        `Pick the table in this document that would be clearest as a chart, build the chart, and place it next to the table.`,
      ),
      resolveCommentSessionLabel2(
        `update-numbers`,
        `Update the numbers`,
        `Find the latest values for the figures in this document, update them, and leave a reply showing old vs new and where each came from.`,
      ),
      resolveCommentSessionLabel4(
        `tidy-tables`,
        `Tidy the tables`,
        `Make the tables consistent: units, decimals, column headers, alignment.`,
      ),
    ],
    O1: [],
    O2: [
      resolveCommentSessionLabel3(
        `summarize-reply`,
        `Summarize this`,
        `Summarize this in a reply.`,
      ),
    ],
  });
  (CommentAnchorsState = []);
  (CommentAnchorsState2 = CommentSessionState16);
  (commentAnchorsPattern = /\bkeep (this|it|them) (up to date|updated|current)|\bwatch\b|\btrack\b|\bmonitor\b|every (day|week|month|morning)|\b(daily|weekly|monthly)\b|automatic|routine|schedul|remind|recurring|notify me when/i);
}

export { CommentAnchorsState, CommentAnchorsState2, CommentSessionState14, CommentSessionState15, clearCommentSessionKey, clearCommentSessionSize, commentAnchorsPattern, commentSessionIdentity, commentSessionLimit2564, commentSessionMap11, commentSessionMap9, commentSessionSet6, getCommentSessionValue, getCommentSessionWaited, getCommentSessionWaited2, loadCommentSessionCanSend, registerCommentSessionHost, resolveCommentSessionCommentOnly, resolveCommentSessionLabel, resolveCommentSessionPrompt, resolveCommentSessionSubscribe2, updateCommentSessionCarrier, updateCommentSessionSince2 };
