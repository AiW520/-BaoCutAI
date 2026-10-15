/** claude-writing-sim: restored from claudeWritingSim-RVjspT5Y.js. */
import type {
  SimulationKnobs,
  SimulationParagraph,
  WritingEvent,
  WritingVerdict,
} from "./writing-contracts";
import type { Dispose, TimerScheduler } from "../boot/lifecycle-contracts";
var SIM_VERDICT_MS = 500;
var looksLikeNotWriting = (request: string): boolean =>
  /\?\s*$/.test(request) ||
  /^\s*(fix|edit|change|correct|shorten|tighten|reword|rephrase|rewrite|improve|review|check|proofread|comment|critique|explain|what|why|how|who|when|where|is|are|does|do|can|could|should)\b/i.test(
    request,
  ) ||
  /\b(feedback|typos?|thoughts on)\b/i.test(request);
var simulatedVerdict = (
  knobs: SimulationKnobs,
  request: string,
): WritingVerdict =>
  knobs.decide === `handoff` ||
  (knobs.decide === `auto` && looksLikeNotWriting(request))
    ? `handoff`
    : `write`;
var SIM_SECTION_TITLE = `The first week`;
var SIM_PARAGRAPH_BLOCKS: SimulationParagraph[] = [
  {
    line: `Day one: accounts and access`,
    text: `On day one, the admin creates accounts for the first group of users and checks that everyone can sign in. Keep this group small, ten people or fewer, so access problems show up early and are easy to fix.`,
  },
  {
    line: `Mid-week check-in`,
    text: `Around the middle of the week, hold a 30 minute check-in with the admin. Walk through the workflow you set up together, note what people actually used, and agree on one change to make before Friday.`,
  },
  {
    line: `By Friday: a short summary`,
    text: `By Friday, send a short written summary: what was set up, what changed since the kickoff call, and what is planned for week two. Two or three short paragraphs are enough. The customer should be able to forward it as it is.`,
  },
  {
    line: `Who to contact`,
    text: `If something blocks the rollout, the named contact is the first person to call. They can bring in support or an engineer the same day.`,
  },
];
var SIM_LAST_PARAGRAPH = SIM_PARAGRAPH_BLOCKS[3].text;
var SIM_BLOCK_DELAY_MS = 1500;
var SIM_TABLE_ROWS = [
  [`Day`, `Owner`, `What happens`],
  [`Monday`, `The admin`, `Accounts are created and everyone signs in`],
  [
    `Wednesday`,
    `The named contact`,
    `A 30 minute check-in on what people actually used`,
  ],
  [`Friday`, `The admin`, `A short written summary and the plan for week two`],
];
var SIM_TABLE_DELAY_MS = 900;
var simulatedRunCounter = 0;
function startSimulatedRun<Handle>(
  knobs: SimulationKnobs,
  onEvent: TimerScheduler<Handle>,
  timers: (event: WritingEvent) => void,
  headingLevel?: number,
): Dispose {
  let secondRun = simulatedRunCounter++ > 0 && headingLevel === undefined;
  let finiteOr: (candidate: unknown, fallback: number) => number = (
    simulatedRun,
    options,
  ) =>
    typeof simulatedRun == `number` && Number.isFinite(simulatedRun)
      ? simulatedRun
      : options;
  let firstWordsDelay = Math.max(0, finiteOr(knobs.firstWordsMs, 3e3));
  let paragraphCount =
    knobs.lines === 0
      ? 0
      : Math.max(2, Math.min(Math.round(finiteOr(knobs.lines, 3)), 4));
  let paragraphs =
    paragraphCount === 2
      ? [SIM_PARAGRAPH_BLOCKS[0], SIM_PARAGRAPH_BLOCKS[2]]
      : SIM_PARAGRAPH_BLOCKS.slice(0, Math.max(paragraphCount, 3));
  let timeoutIds: Handle[] = [];
  return knobs.table === true && !knobs.fail
    ? (SIM_TABLE_ROWS.forEach((SIMTABLEROWS, index) =>
        timeoutIds.push(
          onEvent.setTimeout(
            () => {
              timers({
                t: `block`,
                kind: `row`,
                header: index === 0,
                cells: [...SIMTABLEROWS],
              });
              if (index === SIM_TABLE_ROWS.length - 1) {
                timers({
                  t: `done`,
                });
              }
            },
            firstWordsDelay + Math.max(0, index - 1) * SIM_TABLE_DELAY_MS,
          ),
        ),
      ),
      () => timeoutIds.forEach((timeoutId) => onEvent.clearTimeout(timeoutId)))
    : (!secondRun &&
        paragraphCount > 0 &&
        timeoutIds.push(
          onEvent.setTimeout(
            () =>
              timers({
                t: `outline`,
                heading: SIM_SECTION_TITLE,
                lines: paragraphs.map((paragraph) => paragraph.line),
              }),
            SIM_BLOCK_DELAY_MS,
          ),
        ),
      timeoutIds.push(
        onEvent.setTimeout(() => {
          if (knobs.fail)
            return timers({
              t: `error`,
              code: `simulated`,
            });
          if (secondRun)
            timers({
              t: `block`,
              kind: `paragraph`,
              text: SIM_LAST_PARAGRAPH,
            });
          else {
            timers({
              t: `block`,
              kind: `heading`,
              text: SIM_SECTION_TITLE,
              ...(headingLevel !== undefined && {
                level: headingLevel,
              }),
            });
            for (let startSimulatedRunResult of paragraphs)
              timers({
                t: `block`,
                kind: `paragraph`,
                text: startSimulatedRunResult.text,
              });
          }
          timers({
            t: `done`,
          });
        }, firstWordsDelay),
      ),
      () => timeoutIds.forEach((timeoutId) => onEvent.clearTimeout(timeoutId)));
}
function _resetSimForTests(): void {
  simulatedRunCounter = 0;
}
export { SIM_VERDICT_MS, _resetSimForTests, looksLikeNotWriting, simulatedVerdict, startSimulatedRun };
