/** claude-verdict: restored from claudeVerdict-Cl0cSN8Z.js. */
import type {
  VerdictSuccess,
  VerdictResult,
  VerdictRunner,
  VerdictTimers,
  VerdictDesk,
  DecideRequest,
} from "./writing-contracts";
import type { UnknownRecord } from "../serialization/value-contracts";
import {
  By as resolveObservabilityBrowserAndOperationEventsFeature,
  Hy as resolveObservabilityBrowserAndOperationEventsFeature3,
  Vy as resolveObservabilityBrowserAndOperationEventsFeature2,
} from "../platform/index";
import { v as normalizeClaudeRequestText } from "../document-app/index";
var VERDICT_FEATURE = {
  feature: `write_decide`,
  trigger: `command`,
};
var REQUEST_PLACEHOLDER = `<the request, JSON-encoded>`;
var CLAUDE_VERDICT_INSTRUCTION = `Sort a request that a person typed to Claude at one line of a shared document. You see only the request, nothing of the document.

The request, as a JSON string: <the request, JSON-encoded>

WRITE: they want a new passage of text written at that line (a section, a paragraph, a summary, a draft, a sentence, a table).
HANDOFF: anything else. A question. A request for feedback, an opinion or a review. A change to text that is already there (edit, shorten, fix, rewrite, translate, move, delete). A comment or a reply to one. A chart or image. Something done to the document (share, rename, reorder, export). A request with two parts where one part is any of these.
When you cannot tell: WRITE.

Reply with exactly one word, WRITE or HANDOFF, and nothing else.`;
var verdictPrompt = (request: string): string =>
  CLAUDE_VERDICT_INSTRUCTION.replace(REQUEST_PLACEHOLDER, () =>
    JSON.stringify(request),
  );
function readVerdict(response: string): VerdictSuccess {
  let word = response.trim();
  return word === `HANDOFF`
    ? {
        verdict: `handoff`,
        stray: false,
      }
    : {
        verdict: `write`,
        stray: word !== `WRITE`,
      };
}
var errorCodeOf = (error: unknown): string => {
  if (
    typeof error === "object" &&
    error &&
    "code" in error &&
    typeof error.code === "string"
  )
    return error.code;
  return "";
};
var VERDICT_GIVE_UP_MS = 12e4;
async function askVerdict<Handle>(
  getLiveRunner: () => Promise<VerdictRunner | null>,
  request: string,
  timers: VerdictTimers<Handle>,
): Promise<VerdictResult> {
  let controller = new AbortController();
  let abort = () => controller.abort();
  if (timers.signal.aborted)
    return {
      failed: `stopped`,
    };
  timers.signal.addEventListener(`abort`, abort, {
    once: true,
  });
  let timedOut = false;
  let requestStarted = false;
  let timeoutId = timers.setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, VERDICT_GIVE_UP_MS);
  let aborted: Promise<never> = new Promise((resolve, reject) =>
    controller.signal.addEventListener(
      `abort`,
      () => reject(Error(`aborted`)),
      {
        once: true,
      },
    ),
  );
  aborted.catch(() => {});
  try {
    let race = await Promise.race([getLiveRunner().catch(() => null), aborted]);
    if (!race)
      return {
        failed: `unavailable`,
      };
    resolveObservabilityBrowserAndOperationEventsFeature(VERDICT_FEATURE);
    requestStarted = true;
    let race2 = race(verdictPrompt(request), {
      modelTier: `quick`,
      cache: false,
      signal: controller.signal,
    });
    Promise.resolve(race2).catch(() => {});
    let race3 = await Promise.race([race2, aborted]);
    return timers.signal.aborted
      ? {
          failed: `stopped`,
        }
      : (resolveObservabilityBrowserAndOperationEventsFeature2(
          VERDICT_FEATURE,
          `ok`,
        ),
        readVerdict(typeof race3?.text == `string` ? race3.text : ``));
  } catch (askVerdictResult) {
    return timers.signal.aborted
      ? {
          failed: `stopped`,
        }
      : timedOut
        ? (requestStarted &&
            resolveObservabilityBrowserAndOperationEventsFeature3(
              VERDICT_FEATURE,
              `timeout`,
            ),
          {
            failed: `timeout`,
          })
        : (resolveObservabilityBrowserAndOperationEventsFeature2(
            VERDICT_FEATURE,
            errorCodeOf(askVerdictResult),
          ),
          {
            failed: errorCodeOf(askVerdictResult) || `upstream_error`,
          });
  } finally {
    timers.clearTimeout(timeoutId);
    timers.signal.removeEventListener(`abort`, abort);
  }
}
async function decideAsk<Card, Handle>(
  desk: VerdictDesk<Card, Handle>,
  request: DecideRequest<Card>,
): Promise<VerdictResult> {
  let { deps: deps, state: state, closeFor: closeFor } = desk;
  let { card: card, signal: signal } = request;
  if (Array.from(request.words).length > 4e3)
    return {
      failed: `too_long`,
    };
  let words = request.words
    .split(
      `
`,
    )
    .map(normalizeClaudeRequestText as (text: string) => string)
    .join(
      `
`,
    )
    .trim();
  if (words === ``)
    return {
      failed: `empty_ask`,
    };
  if (signal.aborted)
    return {
      failed: `stopped`,
    };
  if (!request.simulated) {
    let live = request.live;
    let decideAskResult: "unavailable" | "too_many" | "no_gesture" | null =
      null;
    if (live === null) {
      decideAskResult = `unavailable`;
    } else {
      if (live === true) {
        if (state.realAsks >= desk.perView) {
          decideAskResult = `too_many`;
        }
      } else {
        decideAskResult = `no_gesture`;
      }
    }
    if (decideAskResult !== null) {
      closeFor(card, decideAskResult);
      return {
        failed: decideAskResult,
      };
    }
    let difference = desk.minGapMs - (deps.now() - state.lastRealAsk);
    if (
      difference > 0 &&
      (await new Promise((resolve) => {
        let setTimeout = deps.timers.setTimeout(
          () => resolve(false),
          difference,
        );
        signal.addEventListener(
          `abort`,
          () => (deps.timers.clearTimeout(setTimeout), resolve(true)),
          {
            once: true,
          },
        );
      }))
    )
      return {
        failed: `stopped`,
      };
    if (state.closed)
      return {
        failed: `off`,
      };
    state.realAsks += 1;
    state.lastRealAsk = deps.now();
  }
  let verdict: VerdictResult;
  if (request.simulated) {
    let sim = await deps.loadSim();
    if (signal.aborted)
      return {
        failed: `stopped`,
      };
    verdict = await new Promise((resolve) => {
      let setTimeout = deps.timers.setTimeout(
        () =>
          resolve({
            verdict: sim.simulatedVerdict(deps.knobs() ?? {}, words),
            stray: false,
          }),
        sim.SIM_VERDICT_MS,
      );
      signal.addEventListener(
        `abort`,
        () => (
          deps.timers.clearTimeout(setTimeout),
          resolve({
            failed: `stopped`,
          })
        ),
        {
          once: true,
        },
      );
    });
  } else
    verdict = {
      verdict: `write`,
      stray: false,
    };
  if (`failed` in verdict) {
    closeFor(card, verdict.failed);
  } else {
    if (verdict.stray) {
      deps.onStrayVerdict?.(card);
    }
  }
  return verdict;
}
export {
  CLAUDE_VERDICT_INSTRUCTION,
  VERDICT_GIVE_UP_MS,
  askVerdict,
  decideAsk,
  readVerdict,
  verdictPrompt,
};
