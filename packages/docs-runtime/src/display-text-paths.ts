/** display-text-paths: restored from displayTextPaths-DINS3adY.js. */
import type { Dynamic } from "./types";
import {
  gi as collectEditorSelectionAndTablesJoin,
  hi as EditorSelectionAndTablesReason2,
} from "./platform-core";
import {
  c as findUnsupportedVisualizeFeature,
  d as reservedColumnNameMessage,
  f as hasTimeFormatSpecifier,
  l as truncateColumnName,
  m as parseTimeFormat,
  p as validateNumberFormat,
  u as isReservedColumnName,
} from "./platform-lazy";
var sourceNamePattern: Dynamic = /^[A-Za-z_][A-Za-z0-9_]*$/;
var sourceNameHint: Dynamic = `must be a source name — a plain identifier (letters, digits, underscore; not starting with a digit or __charts)`;
var chartMarkTypes: Dynamic = [`bar`, `line`, `area`, `point`, `tile`];
var markTypesHint: Dynamic = `types are ${chartMarkTypes.join(`, `)}`;
var widgetEscapeHatchHint: Dynamic = `hand-build it in the widget (Escape hatch)`;
var markTypeHints: Dynamic = {
  rule: `reference lines are annotations, not marks: annotations: [{"kind": "rule", "axis": "y", "value": "<column>"}] on the chart`,
  span: `shaded intervals are annotations, not marks: annotations: [{"kind": "span", "axis": "x", "range": ["<from>", "<to>"]}] on the chart`,
  marker: `event markers are annotations: [{"kind": "rule", "axis": "x", "value": "<date column>", "labels": […]}]`,
  band: `a shaded band is an annotation: [{"kind": "span", "axis": "y", "range": ["<lo>", "<hi>"]}]; an area between two columns is type "area" with y: ["<lo>", "<hi>"]`,
  text: `words on a mark are its labels: [{"kind": "text", "text": "…"}]`,
  bubble: `a bubble chart is type "point" with size: "<numeric column>"`,
  rect: `a heat map is type "tile" with shade: "<numeric column>"`,
  cell: `a heat map is type "tile" with shade: "<numeric column>"`,
  heatmap: `a heat map is type "tile" with shade: "<numeric column>"`,
  scatter: `a scatter plot is type "point"`,
  circle: `points are type "point"`,
  dot: `points are type "point"`,
  column: `vertical bars are type "bar"`,
  histogram: `bin the values in the query, then draw type "bar" over the bins`,
  boxplot: `a box plot is a bar on a [q1, q3] pair with whisker: ["min", "max"], plus a point mark for the median`,
  box: `a box plot is a bar on a [q1, q3] pair with whisker: ["min", "max"], plus a point mark for the median`,
  candlestick: `a candle is a bar on an [open, close] pair with whisker: ["low", "high"]`,
  candle: `a candle is a bar on an [open, close] pair with whisker: ["low", "high"]`,
};
var scaleTypeHints: Dynamic = {
  ordinal: `categories are type: "band"`,
  nominal: `categories are type: "band"`,
  categorical: `categories are type: "band"`,
  point: `"point" scales are not in Claude Docs charts yet — categories are type: "band"`,
  temporal: `dates are type: "time"`,
  utc: `dates are type: "time" (always UTC)`,
  date: `dates are type: "time"`,
  quantitative: `numbers are type: "linear" (the default — omit it)`,
  pow: `"pow" scales are not in Claude Docs charts yet — use "linear" or "log"`,
  sqrt: `"sqrt" scales are not in Claude Docs charts yet — use "linear" or "log"`,
  symlog: `"symlog" scales are not in Claude Docs charts yet — use "linear" or "log"`,
};
var normalizedStackHint: Dynamic = `compute the share in the query (value / SUM(value) OVER (PARTITION BY x)) and stack that column`;
var queryTransformationHint: Dynamic = `the chart draws exactly the rows it is given — shape them in the query (COALESCE, GROUP BY, date_trunc, LIMIT, a pivot), not in the definition`;
var transformationKeyHints: Dynamic = Object.fromEntries(
  `coalesce.fill.fillMissing.fillna.impute.default.defaults.missing.nulls.pivot.unpivot.melt.transpose.bin.bins.binWidth.bucket.buckets.histogram.rollup.rollUp.resample.aggregate.agg.groupBy.groupby.topN.top.limit.other.others.sample.filter.where.transform.calculate.window.cumulative.runningTotal`
    .split(`.`)
    .map(
      (input?: Dynamic, ..._extraArguments: unknown[]): Dynamic => [
        input,
        queryTransformationHint,
      ],
    ),
);
var normalizedStackKeyHints: Dynamic = Object.fromEntries(
  [
    `mode`,
    `offset`,
    `normalize`,
    `normalized`,
    `normalise`,
    `percent`,
    `percentage`,
    `expand`,
    `fill`,
    `relative`,
    `100%`,
  ].map(
    (input?: Dynamic, ..._extraArguments: unknown[]): Dynamic => [
      input,
      normalizedStackHint,
    ],
  ),
);
var colorPaletteHint: Dynamic = `no colour words in Claude Docs charts: a split (group.by) takes the palette's slots in the order group.order lists its series (slot 1 blue, 2 orange, 3 aqua, 4 yellow, 5 magenta, 6 green, 7 violet, 8 red; first-appearance order when unwritten); one series in a specific hue, or one greyed series, means hand-rolling the chart`;
var seriesCapHint: Dynamic = `there is no series cap to write — a split draws at most 8 series (more are refused at render; facet by the column or filter the source) and never folds a tail into "Other"`;
var categoryOrderHint: Dynamic = `a sort is the query's ORDER BY and row order draws it; a hand-written sequence is {"kind": "list", "values": [...]}, natural collation ("v9" before "v10") is {"kind": "natural"}`;
var descendingOrderHint: Dynamic = `there is no descending word: ORDER BY … DESC in the query (row order draws it), or list the values in the order to draw`;
var valueRankingHint: Dynamic = `ranking by a value is ORDER BY that column in the query; row order draws it`;
var rowOrderHint: Dynamic = `row order is the default: delete the order key`;
var orderKindHints: Dynamic = {
  rows: rowOrderHint,
  row: rowOrderHint,
  data: rowOrderHint,
  appearance: rowOrderHint,
  none: rowOrderHint,
  default: rowOrderHint,
  alpha: `alphabetical with numbers in numeric order is {"kind": "natural"}`,
  alphabetical: `alphabetical with numbers in numeric order is {"kind": "natural"}`,
  version: `version order ("1.2" before "1.10") is {"kind": "natural"}`,
  numeric: `numbered labels in numeric order are {"kind": "natural"}`,
  asc: categoryOrderHint,
  ascending: categoryOrderHint,
  sorted: categoryOrderHint,
  sort: categoryOrderHint,
  desc: descendingOrderHint,
  descending: descendingOrderHint,
  reverse: descendingOrderHint,
  value: valueRankingHint,
  values: `a hand-written sequence is {"kind": "list", "values": [...]}`,
  x: valueRankingHint,
  y: valueRankingHint,
  size: valueRankingHint,
  count: valueRankingHint,
  field: `not yet: order by column — sort in the query`,
  by: `not yet: order by column — sort in the query`,
};
var chartGrammarHourDayWeekValues: Dynamic = [
  `hour`,
  `day`,
  `week`,
  `month`,
  `quarter`,
  `year`,
];
var ChartGrammarHints: Dynamic = {
  daily: `spelled "day"`,
  weekly: `spelled "week"`,
  monthly: `spelled "month"`,
  quarterly: `spelled "quarter"`,
  yearly: `spelled "year"`,
  annual: `spelled "year"`,
  hourly: `spelled "hour"`,
  minute: `the finest period is hour — plot raw timestamps on a plain time axis (drop period)`,
  second: `the finest period is hour — plot raw timestamps on a plain time axis (drop period)`,
  isoweek: `weeks are ISO weeks (Monday start, UTC) — spelled "week"`,
  fiscal: `fiscal calendars are not in Claude Docs charts — truncate to your fiscal periods in the query and use a band axis`,
};
var chartGrammarHorizontalValues: Dynamic = [`horizontal`];
var ChartGrammarHints2: Dynamic = {
  vertical: `vertical is the default — drop orient`,
  h: `spelled "horizontal"`,
  horiz: `spelled "horizontal"`,
  flip: `spelled orient: "horizontal"`,
  flipped: `spelled orient: "horizontal"`,
  transpose: `spelled orient: "horizontal"`,
};
var chartGrammarChartStatTableValues: Dynamic = [`chart`, `stat`, `table`];
var chartGrammarMessage: Dynamic = `is required — "chart" (marks over axes), "stat" (one big number) or "table" (rows of stats, columns and small charts)`;
var chartGrammarStyles: Dynamic = `a second unit on its own scale is a second y entry — "y": [{"title": "…", "format": {…}}, {"side": "after", "title": "…", "format": {…}}] — with axis: 1 on the mark in that unit`;
var ChartGrammarData: Dynamic = `stacked plots are not drawn — two charts on one x column, each kind: "chart"; ${chartGrammarStyles}`;
var ChartGrammarHints3: Dynamic = {
  bar: `mark types go on marks — kind: "chart", marks: [{"type": "bar", …}]`,
  line: `mark types go on marks — kind: "chart", marks: [{"type": "line", …}]`,
  area: `mark types go on marks — kind: "chart", marks: [{"type": "area", …}]`,
  point: `mark types go on marks — kind: "chart", marks: [{"type": "point", …}]`,
  plot: `a plot is kind: "chart"`,
  graph: `a plot is kind: "chart"`,
  panes: ChartGrammarData,
  pane: ChartGrammarData,
  kpi: `a big number is kind: "stat"`,
  metric: `a big number is kind: "stat"`,
  number: `a big number is kind: "stat"`,
  tile: `a big number is kind: "stat"; several side by side are kind: "table"`,
  stats: `one figure is kind: "stat"; several side by side are kind: "table"`,
  grid: `a table of figures is kind: "table"; small multiples of ONE chart are kind: "chart" with rows / columns`,
  matrix: `a table of figures is kind: "table"; small multiples of ONE chart are kind: "chart" with rows / columns`,
  dashboard: `a table of figures and small charts is kind: "table"`,
  facet: `small multiples are kind: "chart" with columns: [{"by": "<column>"}] (or rows)`,
  column: `a printed column is a table cell: kind: "table", cells: [{"kind": "column", "column": …}]`,
};
var ChartGrammarChart: Dynamic = {
  chart: [
    `kind`,
    `title`,
    `source`,
    `note`,
    `axes`,
    `marks`,
    `annotations`,
    `columns`,
    `wrap`,
    `orient`,
  ],
  stat: [
    `kind`,
    `title`,
    `source`,
    `note`,
    `column`,
    `format`,
    `tone`,
    `labels`,
    `deltas`,
  ],
  table: [`kind`, `title`, `source`, `note`, `rows`, `columns`, `cells`],
};
var ChartGrammarChart2: Dynamic = {
  chart: {
    column: `a chart's columns ride its axes and marks: axes.x[0].column, marks[i].y — a printed value is kind: "stat" (column) or a table cell`,
    cells: `stats, columns and charts side by side are kind: "table"`,
    deltas: `a big number with deltas is its own definition — kind: "stat"`,
    asof: `an as-of stamp is a stat's column label: kind: "stat", labels: [{"kind": "column", "column": "asof", "format": {"kind": "time", …}}]`,
    stats: `a stat is its own definition (kind "stat"); put stats and charts side by side with kind "table"`,
    format: `formats sit with what they print: axes.x[0].format / axes.y[i].format, a label's format, a stat's format`,
  },
  stat: {
    axes: `a stat has no axes — a chart is kind: "chart"`,
    x: `a stat has no axes — a chart is kind: "chart"`,
    y: `a stat has no axes — a chart is kind: "chart"`,
    marks: `a stat has no marks — a chart is kind: "chart"`,
    annotations: `a stat has no annotations — a chart is kind: "chart"`,
    rows: `one stat per row is a table: kind: "table", rows: [{"by": "<column>"}], cells: [{"kind": "stat", …}]`,
    columns: `stats side by side are a table: kind: "table", cells: [{"kind": "stat", …}, …]`,
    cells: `several figures side by side are kind: "table"`,
    stats: `one figure per definition — several side by side are kind: "table"`,
    legend: `a stat has no legend`,
    orient: `a stat has no orientation`,
    wrap: `a stat never wraps`,
  },
  table: {
    axes: `a table's charts are cell templates: cells: [{"kind": "chart", "axes": …, "marks": …}]`,
    x: `a table's charts are cell templates: cells: [{"kind": "chart", …}]`,
    marks: `a table's charts are cell templates: cells: [{"kind": "chart", …}]`,
    annotations: `annotations ride a chart (or a chart cell), not the table`,
    wrap: `wrap folds a chart's facet columns — a table never wraps`,
    orient: `a table has no orientation — its cells do`,
    legend: `a table has no legend — its chart cells do`,
    facet: `a table repeats its cells per rows: [{"by": "<column>"}]; facets are a chart's rows / columns`,
    column: `a printed column is a cell: cells: [{"kind": "column", "column": …}]`,
    row: `the rows of a table are rows: [{"by": "<column>"}]`,
    stats: `a table's figures are cells: [{"kind": "stat", …}]`,
    deltas: `deltas ride a stat cell: cells: [{"kind": "stat", …, "deltas": […]}]`,
    format: `formats sit inside each cell`,
  },
};
/* Subsystem: chart-grammar */
function validateVisualizationKind(
  entry?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let kind: Dynamic = entry.kind;
  if (kind === undefined)
    return {
      path: [`kind`],
      message: chartGrammarMessage,
    };
  if (
    typeof kind != `string` ||
    !chartGrammarChartStatTableValues.includes(kind)
  ) {
    let value: Dynamic =
      typeof kind == `string`
        ? ownFieldOrUndefined(ChartGrammarHints3, kind.toLowerCase())
        : undefined;
    return {
      path: [`kind`],
      message: `must be one of ${chartGrammarChartStatTableValues.map((input?: Dynamic, ..._extraArguments: unknown[]) => `"${input}"`).join(`, `)}${value === undefined ? `` : ` — ${value}`}`,
    };
  }
  return {
    kind: kind,
  };
}
var chartHintsByKind: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => ({
  ...ChartGrammarScales,
  ...ChartGrammarChart2[input],
});
var chartGrammarNumberTimeValues: Dynamic = [`number`, `time`];
var currencyFormatHint = (input?: Dynamic, ..._extraArguments: unknown[]) =>
  `there is no currency format — a currency mark is a prefix: {"kind": "number", "spec": "~s", "prefix": ${JSON.stringify(input)}}`;
var ChartGrammarPercent: Dynamic = {
  percent: `a percent is {"kind": "number", "spec": ".0%"} over 0–1 shares`,
  percentage: `a percent is {"kind": "number", "spec": ".0%"} over 0–1 shares`,
  date: `dates are {"kind": "time", "spec": "%b %Y"}`,
  datetime: `dates are {"kind": "time", "spec": "%b %-d %H:%M"}`,
  temporal: `dates are {"kind": "time", "spec": "%b %Y"}`,
  currency: currencyFormatHint(`$`),
  money: currencyFormatHint(`$`),
  dollar: currencyFormatHint(`$`),
  dollars: currencyFormatHint(`$`),
  usd: currencyFormatHint(`$`),
  eur: currencyFormatHint(`€`),
  euro: currencyFormatHint(`€`),
  gbp: currencyFormatHint(`£`),
  si: `SI prefixes (k, M, B) are {"kind": "number", "spec": "~s"}`,
  compact: `compact numbers (1.2M) are {"kind": "number", "spec": "~s"}`,
  integer: `integers are {"kind": "number", "spec": ",d"}`,
  decimal: `decimals are {"kind": "number", "spec": ".1f"}`,
  fixed: `decimals are {"kind": "number", "spec": ".1f"}`,
  unit: `a unit is literal text: {"kind": "number", "suffix": " ms"} (or "prefix")`,
  duration: `durations are numbers with a unit: {"kind": "number", "suffix": " ms"}`,
  string: `text categories take no format (a band axis prints them as written)`,
  text: `text categories take no format (a band axis prints them as written)`,
};
var ChartGrammarTime: Dynamic = {
  number: [`kind`, `spec`, `prefix`, `suffix`],
  time: [`kind`, `spec`],
};
var substituteHintValue: Dynamic = (
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  input.replaceAll(
    `<value>`,
    JSON.stringify(truncateColumnName(options)).slice(1, -1),
  );
var chartGrammarSayTheRestInTheNote: Dynamic = `say the rest in the note`;
var orderFieldSchema: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => ({
  kind: `order`,
  noun: input,
  tier: input === `categories` ? `data-determining` : `display-only`,
  label:
    input === `categories`
      ? `Category order`
      : input === `panels`
        ? `Panel order`
        : `Order`,
  help: `Absent = ROW order (each value takes the position of its first row — the query's ORDER BY is the sort). {"kind": "list", "values": ["first", "second", …]} draws exactly those ${input} in that order (unique, non-empty strings, spelled as they print; as many as the ${input} may number — a listed value counts toward that cap, rows or not): every value present in the rows must be listed — a stray value is refused, naming it — and a listed value with no rows KEEPS its empty place. {"kind": "natural"} sorts the ${input} present by natural collation ("1.2" before "1.10", "v9" before "v10") — no list, never refuses. Ranking by a value is ORDER BY in the query.`,
});
orderFieldSchema(`values`);
var chartGrammarStyles2: Dynamic = `{"kind": "list", "values": ["first", …]} or {"kind": "natural"}`;
var chartGrammarMessage2: Dynamic = `no paint word: the key is the paint — group and stack colour the values, hatch fills bars with patterns, dash patterns lines`;
var chartGrammarMessage3: Dynamic = `is not a split key (by, order, title)`;
var chartGrammarMessage4: Dynamic = `carries <n> more keys that are not split keys (by, order, title)`;
var formatIntegerCount: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => input.toLocaleString(`en-US`);
var ChartGrammarData2: Dynamic = `the order is order: ${chartGrammarStyles2}`;
var ChartGrammarColor: Dynamic = {
  color: `the split column is by`,
  colour: `the split column is by`,
  field: `the split column is by`,
  column: `the split column is by`,
  key: `the split column is by`,
  groupBy: `the split column is by`,
  groupby: `the split column is by`,
  as: chartGrammarMessage2,
  paint: chartGrammarMessage2,
  channel: chartGrammarMessage2,
  style: chartGrammarMessage2,
  pattern: chartGrammarMessage2,
  domain: ChartGrammarData2,
  sort: `${ChartGrammarData2} — absent = row order (the query's ORDER BY)`,
  values: ChartGrammarData2,
  list: ChartGrammarData2,
  series: ChartGrammarData2,
  natural: `natural collation is order: {"kind": "natural"}`,
  role: colorPaletteHint,
  pin: colorPaletteHint,
  palette: colorPaletteHint,
  scheme: colorPaletteHint,
  colors: colorPaletteHint,
  colours: colorPaletteHint,
  range: colorPaletteHint,
  seriesCap: seriesCapHint,
  cap: seriesCapHint,
  limit: seriesCapHint,
  other: seriesCapHint,
  label: `the legend line's heading is title`,
  name: `the legend line's heading is title; the series' names are the by column's values`,
  labels: `series names are the values of the by column — rename them in the query, not in the chart`,
  seriesLabels: `series names are the values of the by column — rename them in the query, not in the chart`,
  legend: `the legend is automatic — no key shows or hides it`,
  tone: `tone is the mark's own key: tone: {"cutoffs": [0]} judges a number — never beside a colour split`,
};
var ChartGrammarStack: Dynamic = {
  ...transformationKeyHints,
  ...ChartGrammarColor,
  ...normalizedStackKeyHints,
  stack: `stacking is the mark's own stack: {"by": "<column>"} instead of group — two colour splits never meet on one mark (the inner distinction is hatch)`,
  stacked: `stacking is the mark's stack: {"by": "<column>"} instead of group`,
  dodge: `side by side is what group does — drop it`,
};
var ChartGrammarStack2: Dynamic = {
  ...ChartGrammarColor,
  ...normalizedStackKeyHints,
  stack: `a stack has no mode — the layers sit on one another as given (shares are a column the query computes)`,
  type: `a stack has no mode — the layers sit on one another as given`,
  zero: `stacking from the baseline is what stack does — drop it`,
  group: `side-by-side series are the mark's group: {"by": "<column>"} instead of stack — two colour splits never meet on one mark`,
  dodge: `side-by-side series are the mark's group: {"by": "<column>"} instead of stack`,
};
var ChartGrammarColor2: Dynamic = {
  ...ChartGrammarColor,
  color: `colour rides group or stack: {"by": "<column>"} — hatch is the fill pattern per value inside each bar`,
  colour: `colour rides group or stack: {"by": "<column>"} — hatch is the fill pattern per value inside each bar`,
  patterns: `the patterns follow split order (the first value keeps the plain fill) — at most 3; no pattern words`,
  dash: `stroke patterns ride dash: {"by": "<column>"} on a line mark`,
};
var ChartGrammarColor3: Dynamic = {
  ...ChartGrammarColor,
  color: `colour rides group: {"by": "<column>"} — dash is the stroke pattern per value`,
  colour: `colour rides group: {"by": "<column>"} — dash is the stroke pattern per value`,
  patterns: `the patterns follow split order: solid, dashed, dotted, dash-dot (the first value solid) — at most 4; no pattern words`,
  dashed: `the patterns follow split order: solid, dashed, dotted, dash-dot — no pattern words`,
  dotted: `the patterns follow split order: solid, dashed, dotted, dash-dot — no pattern words`,
  solid: `the first value in split order draws solid — no pattern words`,
  hatch: `fill patterns ride hatch: {"by": "<column>"} on a bar mark`,
};
var ChartGrammarField: Dynamic = {
  field: `the column is by`,
  column: `the column is by`,
  key: `the column is by`,
  domain: ChartGrammarData2,
  sort: `${ChartGrammarData2} — absent = row order`,
  values: ChartGrammarData2,
  list: ChartGrammarData2,
  label: `the strip's title is title; slice labels are the column's values (rename them in the query)`,
  name: `the strip's title is title`,
  limit: `a slice cap is not in Claude Docs charts — filter the source to the slices you want`,
  wrap: `wrap sits on the chart beside columns: columns: [{by}], wrap: N`,
  as: `slices do not paint — a mark's group / stack / hatch / dash splits do`,
  paint: `slices do not paint — a mark's group / stack / hatch / dash splits do`,
};
var ChartGrammarGroup: Dynamic = {
  group: `The values' ORDER: ${chartGrammarStyles2}. A list sets the dodge order and this legend line's rows and keeps a place for a listed value with no rows; natural collation reads "v9" before "v10". Absent = row order (the query's ORDER BY). Listed values count toward the 8 colours.`,
  stack: `The layers' ORDER from the baseline up: ${chartGrammarStyles2}. Absent = row order. Listed values count toward the 8 colours.`,
  hatch: `Which value keeps the plain fill (the first) and the pattern order: ${chartGrammarStyles2}. Absent = row order. Listed values count toward the 3 patterns.`,
  dash: `Which value draws solid (the first) and the stroke order: ${chartGrammarStyles2}. Absent = row order. Listed values count toward the 4 patterns.`,
  slice: `The slices' ORDER: ${chartGrammarStyles2} — a listed value absent from the rows keeps its empty panel / row / band. Absent = row order (the query's ORDER BY).`,
};
var splitFieldSchemas: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => ({
  by: {
    kind: `column`,
    tier: `data-determining`,
    label:
      input === `group`
        ? `Group by`
        : input === `stack`
          ? `Stack by`
          : input === `hatch`
            ? `Hatch by`
            : input === `dash`
              ? `Dash by`
              : `Slice by`,
    help:
      input === `group`
        ? `One series per distinct value of this column (long-form rows: one row per x per value), a colour each — bars dodge side by side in split order, lines, areas and points overlay. The series' NAMES are this column's values: rename them in the query, not in the chart.`
        : input === `stack`
          ? `One layer per distinct value of this column, a colour each, sitting on one another in one footprint (bars and areas) — layout, never a sum: shares for a 100% chart are computed in the query.`
          : input === `hatch`
            ? `One fill pattern per distinct value of this column inside each bar, the hatched parts stacked; the first value in split order keeps the plain fill. The road for a second distinction once colour is spent.`
            : input === `dash`
              ? `One stroke pattern per distinct value of this column — solid, dashed, dotted, dash-dot in split order, the first value solid (actual continued by forecast). Lines only.`
              : `One slice (panel, table row or header band) per distinct value of this column PRESENT in the source rows — never a cross product.`,
  },
  order: {
    kind: `order`,
    tier: `display-only`,
    label: input === `slice` ? `Slice order` : `Value order`,
    help: ChartGrammarGroup[input],
  },
  title: {
    kind: `text`,
    min: 1,
    max: 200,
    tier: `display-only`,
    label: input === `slice` ? `Slice title` : `Legend title`,
    help:
      input === `slice`
        ? `Heads the panel strip / table header ("Region"); omitted = the by column's name, verbatim. 1 to 200 characters. Inline text: it edits in place.`
        : `Heads this split's legend line ("Region", "Deploy ring"); omitted = the by column's name, verbatim.${input === `group` || input === `stack` ? ` Writing a title paints the legend headed by it, even on a chart whose two to four lines would otherwise end in their names.` : ``} 1 to 200 characters. Inline text: it edits in place.`,
  },
});
var splitSchema: Dynamic = (
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  value?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => ({
  kind: `group`,
  fields: splitFieldSchemas(input),
  required: [`by`],
  hints: options,
  strayKey: chartGrammarMessage3,
  strayKeysMore: chartGrammarMessage4,
  stringHint:
    input === `dash`
      ? `dash is a split: {"by": "<column>"} draws one stroke pattern per value in split order (solid, dashed, dotted, dash-dot) — "<value>" is not a key; a lone line draws solid`
      : input === `stack`
        ? `stack is an object naming the layer column: {"by": "<column>"} — there is no stack mode word (layers sit as given; a share is computed in the query)`
        : `${input === `slice` ? `a slice` : input} is an object: {"by": "<value>"}`,
  noun: input === `slice` ? `a slice` : input,
  tier: `data-determining`,
  label: value,
  help: context,
});
var chartGrammarStyles3: Dynamic = `{"column"?: "<numeric column>", "cutoffs"?: [0], "reverse"?: true}`;
var ChartGrammarData3: Dynamic = `there are no tone words and no colours — tone judges a number against cutoffs: ${chartGrammarStyles3} (negative colour below the cutoff, positive at and above; [c1, c2] adds neutral grey between)`;
var chartGrammarMessage5: Dynamic = `the thresholds are cutoffs: [c] or [c1, c2], ascending numbers (default [0])`;
var ChartGrammarTone: Dynamic = {
  kind: `group`,
  fields: {
    column: {
      kind: `column`,
      tier: `data-determining`,
      label: `Tone column`,
      help: `The NUMERIC column judged against the cutoffs — a gap, a ratio or a grade the query computed; omitted = the value's own column (a mark's y, a stat's, delta's, label's or cell's column). A bar or an area on a [from, to] pair has two value columns, so its tone writes column. A null paints muted.`,
    },
    cutoffs: {
      kind: `cutoffs`,
      tier: `data-determining`,
      label: `Cutoffs`,
      help: `[c]: bad below c, good at c and above — so {} is the sign, zero counting as good; [c1, c2] ascending: bad below c1, warn from c1 up to c2, good at c2 and above. At most 2; default [0]. Numbers, not display text: they change through the draft road.`,
    },
    reverse: {
      kind: `flag`,
      tier: `data-determining`,
      label: `Reverse`,
      help: `true: higher is worse — the colours flip (good | warn | bad), the bands stay. Absent = higher is better.`,
    },
  },
  hints: {
    field: `the column is column`,
    by: `tone reads one numeric column: column — it is not a split`,
    value: ChartGrammarData3,
    values: ChartGrammarData3,
    words: ChartGrammarData3,
    good: ChartGrammarData3,
    warn: ChartGrammarData3,
    bad: ChartGrammarData3,
    neutral: `a value that should stay ink carries no tone key — there is no neutral tone`,
    muted: `a null in the tone column paints muted — there is no muted word`,
    color: ChartGrammarData3,
    colour: ChartGrammarData3,
    colors: ChartGrammarData3,
    palette: ChartGrammarData3,
    threshold: chartGrammarMessage5,
    thresholds: chartGrammarMessage5,
    cutoff: chartGrammarMessage5,
    target: `${chartGrammarMessage5} — a target that moves per row is a query column (value − target) judged against [0]`,
    rules: chartGrammarMessage5,
    bands: chartGrammarMessage5,
    steps: chartGrammarMessage5,
    domain: chartGrammarMessage5,
    scale: `tone is three colours over one or two cutoffs, not a scale`,
    invert: `higher-is-worse is reverse: true`,
    inverse: `higher-is-worse is reverse: true`,
    flip: `higher-is-worse is reverse: true`,
    direction: `higher-is-worse is reverse: true; absent = higher is better`,
    higherIsBetter: `higher is better by default — drop it; higher-is-worse is reverse: true`,
    lowerIsBetter: `lower-is-better is reverse: true`,
  },
  stringHint: `"<value>" is not a tone — ${ChartGrammarData3}`,
  noun: `tone`,
  tier: `data-determining`,
  label: `Tone`,
  help: `Judgement colour from a number: ${chartGrammarStyles3}. Bars and points colour per row, a line or an area as a whole (one value per series); never beside a group or stack split (colour can say one thing); a tile takes none (its colour is shade). {} = the value's own sign.`,
};
var formatSchema: Dynamic = (
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => ({
  kind: `format`,
  tier: `display-only`,
  label: input,
  help: options,
});
var chartGrammarIsATextLabelAndTakesNoFormat: Dynamic = `is a text label and takes no format`;
var ChartGrammarVariants: Dynamic = {
  text: {
    kind: `group`,
    fields: {
      kind: {
        kind: `literal`,
        values: [`text`],
        tier: `data-determining`,
        label: `Label kind`,
        help: `"text": one inline string.`,
      },
      text: {
        kind: `text`,
        min: 1,
        max: 200,
        tier: `display-only`,
        label: `Label text`,
        help: `The words printed beside the value ("Plan", "FY26 target"), 1 to 200 characters. Inline text: it edits in place in the doc.`,
      },
    },
    required: [`kind`, `text`],
    keySentences: {
      format: {
        message: chartGrammarIsATextLabelAndTakesNoFormat,
        atObject: true,
      },
    },
    hints: {
      value: `inline words are text; a column's cells are kind: "column"`,
      column: `a column's cells are {"kind": "column", "column": "<column>"}`,
      tone: `text prints in ink — a toned value is {"kind": "column", "column": …, "tone": {…}}`,
      title: `the words are text`,
      label: `the words are text`,
    },
    noun: `a text label`,
    tier: `display-only`,
    label: `Text label`,
    help: `One inline string printed as written (editable in place); a text label has text and nothing else.`,
  },
  column: {
    kind: `group`,
    fields: {
      kind: {
        kind: `literal`,
        values: [`column`],
        tier: `data-determining`,
        label: `Label kind`,
        help: `"column": each row prints its own cell.`,
      },
      column: {
        kind: `column`,
        tier: `data-determining`,
        label: `Label column`,
        help: `The column of the owner's own row(s) whose cell prints — the value column itself, or any other column of the source (a change, a note). A null prints nothing for that row. Edited where the rows live.`,
      },
      format: formatSchema(
        `Label format`,
        `How the label's numbers or dates print: {"kind": "number", "spec"?: "+.1%", "prefix"?: "$", "suffix"?} | {"kind": "time", "spec": "%b %-d"}. A written format always applies; omitted: the axis format when the column IS the owner's own x or y column, else the default for its type (number ",", date "%Y-%m-%d").`,
      ),
      tone: ChartGrammarTone,
    },
    required: [`kind`, `column`],
    hints: {
      field: `the column is column`,
      value: `the column is column`,
      by: `the column is column`,
      text: `inline words are {"kind": "text", "text": "…"}`,
      title: `inline words are {"kind": "text", "text": "…"} as their own entry`,
      prefix: `units ride format: {"kind": "number", "suffix": " ms"}`,
      suffix: `units ride format: {"kind": "number", "suffix": " ms"}`,
      spec: `the format is an object: format: {"kind": "number", "spec": "+.1%"}`,
      position: `labels place themselves (above a bar, inside a stacked piece, along a line at every vertex that has room, in a tile's cell)`,
      color: `labels print in ink — a judgement colour is tone: ${chartGrammarStyles3}`,
      colour: `labels print in ink — a judgement colour is tone: ${chartGrammarStyles3}`,
    },
    noun: `a column label`,
    tier: `data-determining`,
    label: `Column label`,
    help: `Each row prints its own cell of this column, through format; tone (optional) colours it by its own number — its default column is this label's column.`,
  },
};
var ChartGrammarHints4: Dynamic = {
  value: `a column's cells are kind: "column"`,
  field: `a column's cells are kind: "column"`,
  static: `inline words are kind: "text"`,
  string: `inline words are kind: "text"`,
  literal: `inline words are kind: "text"`,
  name: `a series' legend title is the mark's own title: "<series title>", not a label`,
};
var chartGrammarJoinTheWordsInOneTextLabel: Dynamic = `join the words in one text label`;
var ChartGrammarLabels: Dynamic = {
  kind: `items`,
  min: 1,
  max: 2,
  noun: `labels`,
  item: {
    kind: `variant`,
    key: `kind`,
    variants: ChartGrammarVariants,
    hints: ChartGrammarHints4,
    stringHint: `a label is an object: {"kind": "column", "column": "<value>"} (a cell per row) or {"kind": "text", "text": "<value>"} (inline words)`,
    tier: `data-determining`,
    label: `Label`,
    help: `One printed label: {kind: "text", text} (inline words) or {kind: "column", column, format?, tone?} (each row's cell).`,
  },
  objectHint: `labels is a LIST: "labels": [{…}] (up to two entries, printed in order)`,
  overHint: chartGrammarJoinTheWordsInOneTextLabel,
  tier: `data-determining`,
  label: `Labels`,
  help: `Up to 2 labels printed beside the value — bars, floating pieces, points and tiles once per row, a line or an area once per series at its end, an annotation at its rule or span — in order, joined by a space: [{kind: "text", text: "Plan"}, {kind: "column", column: "target_usd"}] prints "Plan $1.75M". Where they print and how they thin when crowded is fixed; tooltips need no key.`,
};
var ChartGrammarHints5: Dynamic = {
  ...scaleTypeHints,
  band: `a y axis is a measure — categories run along x; lay the chart on its side with orient: "horizontal" (categories on axes.x[0], the measure on marks[i].y)`,
  time: `a y axis is a measure — dates run along x`,
  ordinal: `a y axis is a measure — categories run along x; horizontal bars are orient: "horizontal"`,
  nominal: `a y axis is a measure — categories run along x; horizontal bars are orient: "horizontal"`,
  temporal: `a y axis is a measure — dates run along x`,
};
var chartGrammarBeforeAfterValues: Dynamic = [`before`, `after`];
var ChartGrammarHints6: Dynamic = {
  left: `the y axis sits left by default — "before"; "after" moves it right`,
  right: `a y axis on the right is side: "after"`,
  top: `an x axis along the top is side: "before"`,
  bottom: `the x axis sits along the bottom by default — "after"`,
  start: `spelled "before"`,
  end: `spelled "after"`,
  secondary: `the second y entry is side: "after"`,
};
var axisSideSchema: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => ({
  kind: `literal`,
  values: chartGrammarBeforeAfterValues,
  hints: ChartGrammarHints6,
  tier: `display-only`,
  label: `Side`,
  help:
    input === `x`
      ? `"after" (the default) runs the ticks and title along the BOTTOM; "before" moves them to the top edge. Placement of the axis furniture only — the plot and every law are unchanged.`
      : `"before" (the default) prints the ticks and title at the LEFT of the plot; "after" at the right. On a lone entry placement only — never a second scale; on a second entry (axes.y[1]) "after" is REQUIRED: that entry is the right axis, its own scale, read by the marks that say axis: 1 (the first entry then stays left).`,
});
var ChartGrammarTitle: Dynamic = {
  kind: `text`,
  min: 1,
  max: 200,
  nullHint: `there is no null in the grammar — an axis has no title unless one is written; omit title`,
  tier: `display-only`,
  label: `Axis title`,
  help: `Shown beside the axis — name the quantity ("Revenue", "p99 latency"); units and currency marks print on the numbers themselves through format. No title unless written; a column name is never promoted to a title. Inline text: it edits in place.`,
};
var chartGrammarStyles4: Dynamic = `How the ticks, the tooltip values and the labels measured on this axis print — an object with a kind: {"kind": "number", "spec"?: "~s", "prefix"?: "$", "suffix"?: " ms"} prints SIGN · PREFIX · DIGITS · SUFFIX ("−$1.2M", "45% pts", "152 ms"; spec is the d3-format subset [+][,][.N][~] with a type f | d | % | s; prefix/suffix are unit text of at most 4 visible characters plus one edge space — money is prefix text); {"kind": "time", "spec": "%b %Y"} is d3-time-format on a time axis. number rides linear and log axes, time rides a time axis; a band axis takes no format.`;
var ChartGrammarColumn: Dynamic = {
  kind: `column`,
  tier: `data-determining`,
  label: `X column`,
  help: `The column laid out along the x axis — ONE per chart, read BY NAME in each mark's own source: the categories of bars, the dates of a time series, the x measure of a scatter. A mark reading another source finds it there under the same name (alias it in that query).`,
};
var xScaleTypeSchema: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => ({
  kind: `literal`,
  values: [input],
  tier: `data-determining`,
  label: `Scale`,
  help:
    input === `time`
      ? `"time": calendar dates or zoned instants, placed by date; period makes a row one whole slot.`
      : input === `band`
        ? `"band": categories printed verbatim in row order (order pins the slots) — whatever the column's type.`
        : input === `linear`
          ? `"linear": numbers.`
          : `"log": numbers above zero, one equal step per decade; no extra keys.`,
});
var xAxisFields: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => ({
  column: ChartGrammarColumn,
  type: xScaleTypeSchema(input),
  ...(input === `time`
    ? {
        period: {
          kind: `literal`,
          values: chartGrammarHourDayWeekValues,
          hints: ChartGrammarHints,
          tier: `data-determining`,
          label: `Period`,
          help: `Each row stands for a whole calendar period ("hour", "day", "week" = ISO week from Monday, "month", "quarter", "year"; UTC): the axis lays out one slot per period from the first row to the last — a missing period stays an empty slot — and ticks read as periods ("Jun 2026", "2026 Q2"). Rows must already be truncated to the period (date_trunc in the query), at most one row per slot per series. Bars, tiles and stacked areas need slots: a band axis, or a time axis WITH period.`,
        },
      }
    : {}),
  ...(input === `band`
    ? {
        order: orderFieldSchema(`categories`),
      }
    : {}),
  title: ChartGrammarTitle,
  side: axisSideSchema(`x`),
  ...(input === `band`
    ? {}
    : {
        format: formatSchema(`Axis format`, chartGrammarStyles4),
      }),
});
var xAxisKeySentences: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => ({
  ...(input === `time`
    ? {}
    : {
        period: {
          message: `rides a time axis — this x axis is type "${input}"`,
        },
      }),
  ...(input === `band`
    ? {
        format: {
          message: `on a band axis: drop it, or make the axis time, linear or log`,
        },
      }
    : {
        order: {
          message: `rides a band axis — this x axis is type "${input}"`,
        },
      }),
});
var ChartGrammarField2: Dynamic = {
  ...transformationKeyHints,
  field: `the column is spelled column`,
  sort: `no sort key in Claude Docs charts: categories draw in row order (ORDER BY in the source), or pin them with order: {"kind": "list", "values": ["first", "second", …]}`,
  categories: `category order is order: {"kind": "list", "values": ["first", "second", …]}`,
  values: `category order is order: {"kind": "list", "values": ["first", "second", …]}`,
  percent: `${normalizedStackHint}, with format: {"kind": "number", "spec": ".0%"} on the y axis`,
  normalize: `${normalizedStackHint}, with format: {"kind": "number", "spec": ".0%"} on the y axis`,
  stackOffset: normalizedStackHint,
  reverse: `axis direction is automatic (band categories on a horizontal chart read top-down) — drop it`,
  clamp: `a clamp is min and max on the y axis (a value outside them is refused, never clipped) — drop it`,
  nice: `tick rounding is automatic — drop it`,
  padding: `band padding is automatic — drop it`,
  ticks: `ticks are automatic — drop it`,
  tickCount: `ticks are automatic — drop it`,
  tickFormat: `write format`,
  labelFormat: `write format`,
  numberFormat: `write format`,
  timeFormat: `write format`,
  label: `write title`,
  axisTitle: `write title`,
  name: `an axis' words are title`,
  unit: `a unit is literal text on the numbers: format: {"kind": "number", "suffix": " ms"} (or "prefix")`,
  units: `a unit is literal text on the numbers: format: {"kind": "number", "suffix": " ms"} (or "prefix")`,
  prefix: `prefix lives inside format: {"kind": "number", "spec": "~s", "prefix": "€"}`,
  suffix: `suffix lives inside format: {"kind": "number", "spec": "~s", "suffix": " ms"}`,
  currency: `money is prefix text: format: {"kind": "number", "spec": "~s", "prefix": "€"}`,
  symbol: `a currency mark is a prefix: format: {"kind": "number", "prefix": "€"}`,
  scale: `Vega-Lite nesting — write type (and min / max on a y axis) directly on this axis object`,
  axis: `Vega-Lite nesting — write title and format directly on this axis object`,
  orient: `axis placement is side: "before" | "after"; orient: "horizontal" on the chart turns the whole chart`,
  position: `axis placement is side: "before" | "after"`,
  placement: `axis placement is side: "before" | "after"`,
  range: `pixel ranges are automatic — drop it`,
  base: `log axes use base 10 — drop it`,
  grid: `gridlines are automatic — drop it`,
  stack: `stacking is written on the mark: marks[i].stack: {"by": "<column>"}`,
  timeZone: `time zone is not authorable; timestamps with a zone render in UTC (viewer may toggle to local), dates never shift`,
  timezone: `time zone is not authorable; timestamps with a zone render in UTC (viewer may toggle to local), dates never shift`,
  tz: `time zone is not authorable; timestamps with a zone render in UTC (viewer may toggle to local), dates never shift`,
  granularity: `the calendar grain is period: "day" | "week" | "month" | … on a time axis`,
  interval: `the calendar grain is period: "day" | "week" | "month" | … on a time axis`,
  timeUnit: `the calendar grain is period: "day" | "week" | "month" | … on a time axis`,
  bucket: `the calendar grain is period on a time axis (rows already truncated in the query): period: "week"`,
  baseline: `a target line is an annotation: annotations: [{"kind": "rule", "axis": "y", "value": "<column>"}]`,
};
var ChartGrammarHints7: Dynamic = {
  ...ChartGrammarField2,
  id: `the x axis needs no id — there is exactly one`,
  zero: `the x axis of a scatter runs by its data; min and max ride the y axis`,
  domain: `the x axis spans its data — filter the range in the query; min and max ride the y axis`,
  window: `the x axis spans its data — filter the range in the query`,
  free: `free rides the y axis (axes.y[0].free) — the shared x is what panels share`,
  previous: `an earlier period is rows the query emits (both periods, told apart by a colour split) — compare is not at launch`,
  yoy: `year over year is two series the query emits (this year, last year) split by group — compare is not at launch`,
  wow: `week over week is two series the query emits split by group — compare is not at launch`,
  fiscal: `fiscal quarters are a label column the query writes, read on a band axis in row order — yearStart is not at launch`,
};
var ChartGrammarHints8: Dynamic = {
  ...ChartGrammarField2,
  column: `the y column is written on each mark (marks[i].y) — the y axis object takes type, title, format, min, max, free, side`,
  order: `a y axis is a measure — categories run along x (axes.x[0].order); lay the chart on its side with orient: "horizontal"`,
  period: `period rides the x axis (axes.x[0].period)`,
  band: `a y axis is a measure — horizontal bars are orient: "horizontal" with the categories on axes.x[0]`,
  domain: `min and max pin the scale; min: 0 pins the baseline`,
  zero: `min and max pin the scale; min: 0 pins the baseline`,
  domainMin: `min and max pin the scale — write min`,
  domainMax: `min and max pin the scale — write max`,
  window: `min and max pin the scale`,
  includeZero: `min and max pin the scale; min: 0 pins the baseline`,
  id: `y entries are addressed by position`,
  key: `y entries are addressed by position`,
  axis: `y entries are addressed by position — the MARK says axis: 1; nothing is written here`,
  index: `y entries are addressed by position — the MARK says axis: 1; nothing is written here`,
  pane: chartGrammarStyles,
  secondary: chartGrammarStyles,
  opposite: chartGrammarStyles,
  right: chartGrammarStyles,
  height: `the plot's height is automatic — drop it`,
  independent: `an independent scale per panel is free: true`,
  shared: `scales are shared unless free: true — drop it`,
};
var chartGrammarStyles5: Dynamic = `there is no colour scale to write — a mark splits into coloured series with group: {"by": "<column>"} (side by side) or stack: {"by": "<column>"} (stacked); their order is that object's order, palette slots follow it, and colours are never spelled`;
var chartGrammarStyles6: Dynamic = `there is no scales wrapper — the axes are "axes": {"x": [{"column": "<column>", "type": "band", …}], "y"?: [{…}]} beside marks`;
var xAxisSchema: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => ({
  kind: `group`,
  fields: xAxisFields(input),
  required: [`type`, `column`],
  hints: ChartGrammarHints7,
  keySentences: xAxisKeySentences(input),
  stringHint: `an x axis is an object: {"column": "<value>", "type": "band"}`,
  noun: `a ${input} x axis`,
  tier: `data-determining`,
  label: `X axis (${input})`,
  help:
    input === `time`
      ? `{type: "time", column, period?, title?, format?, side?} — dates or instants placed by date.`
      : input === `band`
        ? `{type: "band", column, order?, title?, side?} — categories printed verbatim (no format).`
        : `{type: "${input}", column, title?, format?, side?} — numbers${input === `log` ? ` above zero, by decade` : ``}.`,
});
var ChartGrammarItem: Dynamic = {
  kind: `variant`,
  key: `type`,
  variants: {
    time: xAxisSchema(`time`),
    band: xAxisSchema(`band`),
    linear: xAxisSchema(`linear`),
    log: xAxisSchema(`log`),
  },
  hints: scaleTypeHints,
  stringHint: `an x axis is an object: {"column": "<value>", "type": "band"}`,
  tier: `data-determining`,
  label: `X axis`,
  help: `The ONE shared x axis, by type: {type: "time", column, period?} | {type: "band", column, order?} | {type: "linear", column} | {type: "log", column}, each with title?, side? and (except band) format?.`,
};
var ChartGrammarFields: Dynamic = {
  type: {
    kind: `literal`,
    values: [`linear`, `log`],
    hints: ChartGrammarHints5,
    refusal: `<shown>: <hint>`,
    noHint: `a y axis is "linear" (the default) or "log" — band and time are x types`,
    tier: `data-determining`,
    label: `Scale`,
    help: `linear (the default) or log (equal RATIOS take equal distances). The y axis' discriminator: it gates the marks — zero-based bars and areas and every stacked mark are refused on a log y; a [from, to] pair bar or area sits on it as a point does — and changes the meaning of no other key. band and time are x types.`,
  },
  title: {
    ...ChartGrammarTitle,
    help: `Prints ONCE, as the strip heading over the plot ("Open tickets"); the axis itself shows ticks only. No heading unless written. Inline text: it edits in place.`,
  },
  format: formatSchema(`Axis format`, chartGrammarStyles4),
  min: {
    kind: `number`,
    tier: `data-determining`,
    label: `Scale minimum`,
    help: `Fixes the scale's low end (the high end stays fitted unless max is written). A clamp never hides a row: a value below it is refused, naming the row, never clipped. Under bars, areas and stacks min is at or below 0 (bars rise from zero); on a log axis above zero. Never beside free.`,
  },
  max: {
    kind: `number`,
    tier: `data-determining`,
    label: `Scale maximum`,
    help: `Fixes the scale's high end (min fixes the low end; either or both). A value above it is refused, naming the row — never clipped. Under bars, areas and stacks max is at or above 0. Never beside free.`,
  },
  free: {
    kind: `flag`,
    tier: `data-determining`,
    label: `Free scale`,
    help: `true: every repetition of the plot (each facet panel, each chart cell per table row) scales to ITS OWN rows instead of sharing one range. Refused beside min / max (a free scale cannot be pinned) and where nothing repeats.`,
  },
  side: axisSideSchema(`y`),
};
var ChartGrammarFields2: Dynamic = {
  x: {
    kind: `items`,
    min: 1,
    max: 1,
    noun: `x axes`,
    one: `x axis`,
    emptyHint: `one x axis per chart`,
    item: ChartGrammarItem,
    objectHint: `axes.x is a list of exactly one axis: "x": [{"column": "<column>", "type": "band"}]`,
    tier: `data-determining`,
    label: `X axes`,
    help: `Exactly one x axis — every mark and annotation shares it; a second is refused (one x axis per chart).`,
  },
  y: {
    kind: `items`,
    min: 1,
    max: 2,
    noun: `y axes`,
    one: `y axis`,
    item: {
      kind: `group`,
      fields: ChartGrammarFields,
      hints: ChartGrammarHints8,
      tileHints: {
        band: `a tile chart's y lists categories already — no type is written on axes.y`,
      },
      tileKeySentences: {
        order: {
          message: `a tile chart's rows follow the query's ORDER BY, first row at the bottom`,
          statement: true,
        },
      },
      stringHint: `a y axis is an object: {"title"?: "<value>", "format"?: {…}, "min"?: 0}`,
      noun: `a y axis`,
      tier: `data-determining`,
      label: `Y axis`,
      help: `A y axis (a measure): {type?: linear | log, title?, format?, min?, max?, free?, side?} — one scale, one unit per entry. The first entry is the left axis; a second entry carries side: "after" and is the right axis with its own scale, read by the marks that say axis: 1 (both entries titled, their formats telling the two units apart).`,
    },
    overHint: `draw the rest in a second Visualize on the same x`,
    objectHint: `axes.y is a LIST: "y": [{"title": …, "format": …}] or [{…}, {"side": "after", "title": …, "format": …}]`,
    tier: `data-determining`,
    label: `Y axes`,
    help: `One or two y axes (omitted = one linear axis fitted to the rows). One entry = the left axis; a second entry with side: "after" = the right axis, its own scale — two units read together at each x (temperature and snowfall), the mark in the second unit saying axis: 1. A third unit is a second Visualize on the same x.`,
  },
};
var chartGrammarMessage6: Dynamic = `there is no z axis — a point's size column heads its own size legend (marks[i].size), a tile's shade column its colour ramp (marks[i].shade)`;
var ChartGrammarHints9: Dynamic = {
  xAxis: `spelled x (a list of one axis)`,
  yAxis: `spelled y`,
  xAxes: `spelled x`,
  yAxes: `spelled y`,
  x2: `there is one shared x axis`,
  y2: chartGrammarStyles,
  secondary: chartGrammarStyles,
  z: chartGrammarMessage6,
  color: chartGrammarStyles5,
  colour: chartGrammarStyles5,
  size: chartGrammarMessage6,
  shape: `not yet: shape — a second distinction on points is a facet or a second chart`,
  scales: chartGrammarStyles6,
};
var chartGrammarMessage7: Dynamic = `lines and points take ONE column (floating bars and area bands are the marks that span two values)`;
var ChartGrammarSource: Dynamic = {
  kind: `source`,
  tier: `data-determining`,
  label: `Mark source`,
  help: `Names an entry of the sources prop when this mark reads a different query result than the chart's source (actuals from one query, targets from another). It must contain a column with the x axis column's NAME. Omitted = the chart's source.`,
};
var ChartGrammarTier: Dynamic = {
  kind: `channel`,
  tier: `data-determining`,
  label: `Value (y)`,
  help: `The measure: a numeric column name ("revenue") drawn from zero, or a [from, to] PAIR of column names (["q1_h", "q3_h"]) — a floating bar spanning the two values per row (a box body, a bridge step) or a filled band between them (a forecast range). Long-form data: several series are ONE value column split by a series column via group, never one mark per column.`,
};
var ChartGrammarArrayHint: Dynamic = {
  kind: `column`,
  arrayHint: `binds a [from, to] pair to <owner>, a <type> mark — ${chartGrammarMessage7}`,
  tier: `data-determining`,
  label: `Value (y)`,
  help: `The measure: one numeric column name ("p95_ms"). A line or a point takes ONE column — a range through it is whisker: ["<low>", "<high>"]; a filled band is an area on a [from, to] pair.`,
};
var ChartGrammarArrayHint2: Dynamic = {
  kind: `column`,
  arrayHint: `binds a pair to <owner>, a tile — a tile's y is ONE category column (the rows of the grid)`,
  tier: `data-determining`,
  label: `Row (y)`,
  help: `The CATEGORY column whose values become the grid's rows, bottom to top in row order ("weekday"); the x axis supplies the columns of the grid and shade the colour. A tile chart's y axis lists these values — no type is written on axes.y.`,
};
var ChartGrammarWhisker: Dynamic = {
  kind: `pair`,
  what: `a [low, high] pair`,
  example: `["ci_lo", "ci_hi"]`,
  tier: `data-determining`,
  label: `Whisker`,
  help: `A [low, high] pair of numeric columns drawn as a capped hairline through the bar, the point or the line vertex, in the mark's ink — a confidence interval, a min–max range, the wick of a box (whisker: ["min", "max"] on a bar over ["q1", "q3"]). The query computes both ends; a row with either end null draws no whisker; low above high is refused at render.`,
};
var ChartGrammarTier2: Dynamic = {
  kind: `column`,
  tier: `data-determining`,
  label: `Size`,
  help: `A numeric column that sets each point's AREA (never its radius): the largest value present draws the largest marker, zero or less the smallest visible one, a null the plain marker. Adds a size legend headed by the column's name. Points only.`,
};
var ChartGrammarShade: Dynamic = {
  kind: `column`,
  tier: `data-determining`,
  label: `Shade`,
  help: `The NUMERIC column that colours each tile on one sequential ramp, light for the lowest value present to dark for the highest; a null draws the empty-cell colour. Required on a tile — it is the tile's whole point. The legend is the ramp, labelled at its ends in the y axis format.`,
};
var ChartGrammarTitle2: Dynamic = {
  kind: `text`,
  min: 1,
  max: 200,
  nullHint: `null is not a switch: to leave a mark unnamed, omit title — an untitled mark is named by its y column`,
  tier: `display-only`,
  label: `Series title`,
  help: `Names this mark's series wherever a name prints — legend row, line end, tooltip ("Plan", "p95 latency"); omitted = the y column's name, verbatim. 1 to 200 characters. Inline text: it edits in place in the doc.`,
};
var ChartGrammarGroup2: Dynamic = splitSchema(
  `group`,
  ChartGrammarStack,
  `Splits this mark into one series per distinct value of a column, a colour each: {"by": "region", "order"?: {"kind": "list", "values": ["NA", "EMEA", "APAC"]}, "title"?: "Region"}. Bars dodge side by side within each slot; lines, areas and points overlay. Never on one mark with stack (two colour splits: the inner distinction is hatch).`,
  `Group (series)`,
);
var ChartGrammarStack3: Dynamic = splitSchema(
  `stack`,
  ChartGrammarStack2,
  `Layers this mark, one layer per distinct value of a column, a colour each, in one footprint: {"by": "tier", "order"?: {"kind": "list", "values": ["free", "pro"]}, "title"?: "Tier"} — bars and areas only. Layout, never a sum: shares are computed in the query. Never beside group, never on a [from, to] y.`,
  `Stack (layers)`,
);
var ChartGrammarHatch: Dynamic = splitSchema(
  `hatch`,
  ChartGrammarColor2,
  `Fills each bar with one pattern per distinct value of a column, the hatched parts stacked inside the bar, the first value in split order keeping the plain fill: {"by": "status"} — the second distinction once colour is spent (region by colour, forecast hatched). Bars only; at most 3 values.`,
  `Hatch (fill pattern)`,
);
var ChartGrammarDash: Dynamic = splitSchema(
  `dash`,
  ChartGrammarColor3,
  `Strokes one line per distinct value of a column, one pattern each in split order — solid, dashed, dotted, dash-dot, the first value solid: {"by": "kind"} continues actual with a dashed forecast. Lines only; at most 4 values; may sit beside group on a different column.`,
  `Dash (stroke pattern)`,
);
var ChartGrammarTitle3: Dynamic = {
  title: ChartGrammarTitle2,
  labels: ChartGrammarLabels,
  tone: ChartGrammarTone,
};
var chartGrammarTheRightAxisIsAxis1: Dynamic = `the right axis is axis: 1`;
var chartGrammarMessage8: Dynamic = `the left axis is the default — drop axis`;
var chartGrammarMessage9: Dynamic = `axis picks a y entry by index: 0 (left, the default) or 1 (right, axes.y[1])`;
var ChartGrammarAxis: Dynamic = {
  kind: `literal`,
  values: [0, 1],
  hints: {
    right: chartGrammarTheRightAxisIsAxis1,
    secondary: chartGrammarTheRightAxisIsAxis1,
    y2: chartGrammarTheRightAxisIsAxis1,
    opposite: chartGrammarTheRightAxisIsAxis1,
    after: `side places an axis; a mark picks it by index — ${chartGrammarTheRightAxisIsAxis1}`,
    left: chartGrammarMessage8,
    primary: chartGrammarMessage8,
    before: chartGrammarMessage8,
    y: `every mark is on a y axis — ${chartGrammarMessage9}`,
    y1: chartGrammarMessage9,
    x: `x is the chart's one shared axis (axes.x) — ${chartGrammarMessage9}`,
    0: `a number, not a string — axis: 0`,
    1: `a number, not a string — axis: 1`,
  },
  refusal: `<shown>: <hint>`,
  noHint: `axis is 0 (the left y axis, the default) or 1 (the right one, axes.y[1])`,
  tier: `data-determining`,
  label: `Y axis`,
  help: `Which y entry measures this mark: 0 (axes.y[0], the left axis — the default) or 1 (axes.y[1], the right axis, its own scale). Every bar and area keeps to one of them.`,
};
var ChartGrammarBar: Dynamic = {
  bar: {
    source: ChartGrammarSource,
    y: ChartGrammarTier,
    axis: ChartGrammarAxis,
    whisker: ChartGrammarWhisker,
    group: ChartGrammarGroup2,
    stack: ChartGrammarStack3,
    hatch: ChartGrammarHatch,
    ...ChartGrammarTitle3,
  },
  line: {
    source: ChartGrammarSource,
    y: ChartGrammarArrayHint,
    axis: ChartGrammarAxis,
    whisker: ChartGrammarWhisker,
    group: ChartGrammarGroup2,
    dash: ChartGrammarDash,
    ...ChartGrammarTitle3,
  },
  area: {
    source: ChartGrammarSource,
    y: ChartGrammarTier,
    axis: ChartGrammarAxis,
    group: ChartGrammarGroup2,
    stack: ChartGrammarStack3,
    ...ChartGrammarTitle3,
  },
  point: {
    source: ChartGrammarSource,
    y: ChartGrammarArrayHint,
    axis: ChartGrammarAxis,
    whisker: ChartGrammarWhisker,
    size: ChartGrammarTier2,
    group: ChartGrammarGroup2,
    ...ChartGrammarTitle3,
  },
  tile: {
    source: ChartGrammarSource,
    y: ChartGrammarArrayHint2,
    shade: ChartGrammarShade,
    labels: ChartGrammarLabels,
  },
};
var chartGrammarMessage10: Dynamic = `has no stroke to pattern — lines take dash`;
var chartGrammarMessage11: Dynamic = `a tile's colour is shade`;
var ChartGrammarBar2: Dynamic = {
  size: {
    bar: `size is only legal on point marks`,
    line: `size is only legal on point marks`,
    area: `size is only legal on point marks`,
    tile: `size is only legal on point marks`,
  },
  shade: {
    bar: `shade is only legal on tile marks`,
    line: `shade is only legal on tile marks`,
    area: `shade is only legal on tile marks`,
    point: `shade is only legal on tile marks`,
  },
  whisker: {
    area: `whisker on <owner>: an area draws its band as a [from, to] y`,
    tile: `whisker on <owner>: a tile has no whisker`,
  },
  hatch: {
    line: `hatch on <owner>: a line has no fill`,
    area: `hatch on <owner>: hatch patterns fill bars — split the area by colour (group) or facet it`,
    point: `hatch on <owner>: hatch patterns fill bars — a point's second distinction is a facet`,
    tile: `hatch on <owner>: ${chartGrammarMessage11}`,
  },
  dash: {
    bar: `dash on <owner>: a bar takes hatch`,
    area: `dash on <owner>: an area ${chartGrammarMessage10}`,
    point: `dash on <owner>: a point ${chartGrammarMessage10}`,
    tile: `dash on <owner>: a tile ${chartGrammarMessage10}`,
  },
  stack: {
    line: `stack on <owner>: lines do not stack — group draws one line per value, or stack an area`,
    point: `stack on <owner>: points do not stack — group colours them per value`,
    tile: `stack on <owner>: ${chartGrammarMessage11}`,
  },
  group: {
    tile: `group on <owner>: ${chartGrammarMessage11}`,
  },
  tone: {
    tile: `tone on <owner>: a tile's colour is its shade`,
  },
  title: {
    tile: `title on <owner>: a tile has no title — the chart title names it`,
  },
  axis: {
    tile: `axis on <owner>: a tile chart's y lists categories — no measure axis to pick`,
  },
};
var ChartGrammarBar3: Dynamic = {
  bar: ` and hatch by it`,
  line: ` and dash by it`,
};
var invalidMarkKeys: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  Object.fromEntries(
    Object.entries(ChartGrammarBar2).flatMap(
      ([input2, input3]: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
        let value: Dynamic = input3[input];
        return value === undefined
          ? []
          : [
              [
                input2,
                `is not legal on ${input === `area` ? `an` : `a`} ${input} mark — ${value}`,
              ],
            ];
      },
    ),
  );
var chartGrammarStyles7: Dynamic = `a mark is {"type": …, "y": "<column>"} plus its splits (group / stack / hatch / dash), title, labels, tone — there is no encoding block`;
var chartGrammarStyles8: Dynamic = `there is no channels wrapper — y sits directly on the mark: {"type": "line", "y": "arr"}`;
var chartGrammarStyles9: Dynamic = `a split is group: {"by": "<column>"} (one series per value, a colour each) or stack: {"by": "<column>"} (layered) on the mark`;
var chartGrammarMessage12: Dynamic = `there is no z: a point's marker area is size: "<numeric column>" (point marks only) and a tile's colour is shade: "<numeric column>"`;
var chartGrammarStyles10: Dynamic = `there is no style split: a bar's fill patterns are hatch: {"by": "<column>"}, a line's stroke patterns are dash: {"by": "<column>"} — the key is the paint`;
var chartGrammarStyles11: Dynamic = `dash is a split: dash: {"by": "<column>"} on a line mark strokes one pattern per value in split order (solid, dashed, dotted, dash-dot) — no fixed stroke word; a lone line draws solid`;
var ChartGrammarHints10: Dynamic = {
  ...transformationKeyHints,
  ...normalizedStackKeyHints,
  data: `a mark that reads another table names it with source: "<sources key>"`,
  from: `a mark that reads another table names it with source: "<sources key>"`,
  table: `a mark that reads another table names it with source: "<sources key>"`,
  kind: `a mark's discriminator is type ("bar", "line", "area", "point", "tile") — kind belongs to the definition, labels and annotations`,
  encoding: chartGrammarStyles7,
  mark: chartGrammarStyles7,
  channels: chartGrammarStyles8,
  encode: chartGrammarStyles8,
  transform: `mark transforms are not in Claude Docs charts — stacking is stack: {"by": "<column>"}; shape rows in the source query`,
  x2: `a second x position is an annotation span: annotations: [{"kind": "span", "axis": "x", "range": ["<from>", "<to>"]}]`,
  y0: `a [from, to] pair rides y itself: "y": ["<from column>", "<to column>"]`,
  y1: `a [from, to] pair rides y itself: "y": ["<from column>", "<to column>"]`,
  theta: `pie charts are not drawn — show shares as bars over a share column`,
  column: `small multiples are the chart's columns: [{"by": "<column>"}]; the mark's measure is y`,
  facet: `small multiples are the chart's columns list`,
  scales: chartGrammarStyles6,
  annotations: `annotations sit on the chart: annotations: [{kind: "rule" | "span", …}]`,
  emphasis: `emphasis is automatic (hover) — drop it`,
  curve: `lines draw straight segments between rows — no curve option`,
  x: `x is declared once for the chart in axes.x — a mark reads the column with that NAME in its own source; drop x from the mark`,
  z: chartGrammarMessage12,
  r: `a point's marker area is size: "<numeric column>"`,
  radius: `a point's marker AREA (never radius) is size: "<numeric column>"`,
  area: `a point's marker area is size: "<numeric column>"`,
  bubble: `a point's marker area is size: "<numeric column>"`,
  weight: `a point's marker area is size: "<numeric column>"`,
  magnitude: `a tile's colour is shade: "<numeric column>"`,
  heat: `a tile's colour is shade: "<numeric column>"`,
  value: `the measure is y: "<column>"; a tile's colour is shade`,
  stroke: `marks carry no literal ink: colour comes from mark order or a group split, stroke patterns from a dash split`,
  color: chartGrammarStyles9,
  colour: chartGrammarStyles9,
  colorBy: chartGrammarStyles9,
  by: chartGrammarStyles9,
  split: chartGrammarStyles9,
  series: chartGrammarStyles9,
  groupBy: chartGrammarStyles9,
  groupby: chartGrammarStyles9,
  stackBy: `stacking is stack: {"by": "<column>"}`,
  style: chartGrammarStyles10,
  pattern: chartGrammarStyles10,
  texture: `fill patterns are hatch: {"by": "<column>"} on a bar mark`,
  strokeDash: chartGrammarStyles11,
  dashed: chartGrammarStyles11,
  dashes: chartGrammarStyles11,
  lineType: chartGrammarStyles11,
  lineStyle: chartGrammarStyles11,
  dotted: chartGrammarStyles11,
  symbol: `point symbols are not drawn — a second distinction on points is a columns facet or a second chart`,
  detail: `one line per value without a legend is not a key — split by colour (group) or by stroke (dash: {"by": "<column>"})`,
  label: `labels is a LIST: "labels": [{"kind": "column", "column": "<column>"}] or [{"kind": "text", "text": "…"}]`,
  text: `words on a mark are labels: [{"kind": "text", "text": "…"}]`,
  name: `a mark's series name is title: "<series title>" (omitted = the y column's name)`,
  legend: `a mark's legend text is title: "<series title>"; the legend itself is automatic`,
  low: `a floor-to-ceiling band is ONE area mark with a [from, to] pair: y: ["<low column>", "<high column>"]; a range through a bar or point is whisker: ["<low>", "<high>"]`,
  high: `a floor-to-ceiling band is ONE area mark with a [from, to] pair: y: ["<low column>", "<high column>"]; a range through a bar or point is whisker: ["<low>", "<high>"]`,
  lo: `a range through the mark is whisker: ["<low column>", "<high column>"]`,
  hi: `a range through the mark is whisker: ["<low column>", "<high column>"]`,
  error: `an interval through the mark is whisker: ["<low column>", "<high column>"] — the query computes both ends`,
  errorbar: `an interval through the mark is whisker: ["<low column>", "<high column>"]`,
  errorBar: `an interval through the mark is whisker: ["<low column>", "<high column>"]`,
  ci: `a confidence interval is whisker: ["<low column>", "<high column>"]`,
  interval: `an interval through the mark is whisker: ["<low column>", "<high column>"]`,
  range: `a [from, to] span is the y pair on a bar or an area: y: ["<from>", "<to>"]; a hairline range is whisker: ["<low>", "<high>"]`,
  y2: `y2 is one of two things: a [from, to] pair rides IN y (y: ["<from>", "<to>"]); a second unit is its own mark with axis: 1 beside a second y entry (side: "after")`,
  yTo: `the second bound rides IN y as a pair: y: ["<from column>", "<to column>"]`,
  y_end: `the second bound rides IN y as a pair: y: ["<from column>", "<to column>"]`,
  to: `a floating piece is y: ["<from column>", "<to column>"]`,
  start: `a floating piece is y: ["<start column>", "<end column>"] — running totals are computed in the query`,
  end: `a floating piece is y: ["<start column>", "<end column>"] — running totals are computed in the query`,
  base: `a floating piece is y: ["<from column>", "<to column>"]; bars from zero need no key`,
  baseline: `bars and areas rise from zero on their own; a floating piece is y: ["<from column>", "<to column>"]`,
  waterfall: `a bridge is a bar mark with y: ["<start column>", "<end column>"] — the query computes the running totals (a window sum)`,
  muted: `judgement colour is tone: ${chartGrammarStyles3} — a null in its column paints muted`,
  highlight: `judgement colour is tone: ${chartGrammarStyles3}`,
  status: `judgement colour is tone: ${chartGrammarStyles3} — a number against cutoffs, not status words`,
  sentiment: `judgement colour is tone: ${chartGrammarStyles3}`,
  threshold: `judgement colour is tone: ${chartGrammarStyles3}; a reference line is an annotation`,
  yAxis: chartGrammarStyles,
  yAxisIndex: chartGrammarStyles,
  yAxisID: chartGrammarStyles,
  yAxisId: chartGrammarStyles,
  yaxis: chartGrammarStyles,
  secondary: chartGrammarStyles,
  secondaryAxis: chartGrammarStyles,
  onRight: chartGrammarStyles,
  axisId: chartGrammarStyles,
  axisName: chartGrammarStyles,
  side: `side places an axis (axes.y[1].side: "after"); a mark picks its axis by index: axis: 1`,
  pane: ChartGrammarData,
  panel: ChartGrammarData,
  opacity: `opacity is drawn by the renderer`,
  interpolate: `lines draw straight segments between rows — no curve option`,
  point: `vertex markers are not drawn — a point mark on the same rows overlays dots`,
  strokeWidth: `stroke width is fixed`,
  tooltip: `tooltips are automatic — they show the row's x and y`,
  aggregate: `marks draw rows as given — aggregate in the source query`,
  bin: `marks draw rows as given — bin in the source query`,
  sort: `rows draw in row order (the query's ORDER BY); a split's values take order: ${chartGrammarStyles2}`,
  order: `rows draw in row order (the query's ORDER BY); a split's values take order INSIDE the split: group: {"by": …, "order": ${chartGrammarStyles2.split(` or `)[0]}}`,
  shape: `point symbols (a shape split) are not at launch — a second distinction on points is a facet or a second chart`,
};
var markSchema: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => ({
  kind: `group`,
  fields: {
    type: {
      kind: `literal`,
      values: chartMarkTypes,
      hints: markTypeHints,
      tier: `data-determining`,
      label: `Mark type`,
      help: `What one row becomes: "bar" (rises from zero in its slot, or floats on a [from, to] pair), "line" (joins the rows in row order), "area" (that line filled to zero, or a band between a pair), "point" (a dot at (x, y) — over a linear x, the scatter plot), "tile" (one coloured cell per (x slot, y category) — the heat map). The mark's only discriminator: it decides which keys the mark may carry.`,
    },
    ...ChartGrammarBar[input],
  },
  required: input === `tile` ? [`type`, `y`, `shade`] : [`type`, `y`],
  requiredHints:
    input === `tile`
      ? {
          shade: `<owner>: a tile needs shade, the numeric column that colours it`,
        }
      : undefined,
  wrongKeys: invalidMarkKeys(input),
  hints: ChartGrammarHints10,
  stringHint: `a mark is an object: {"type": "<value>", "y": "<column>"}`,
  noun: input === `area` ? `an area mark` : `a ${input} mark`,
  tier: `data-determining`,
  label:
    input === `bar`
      ? `Bar`
      : input === `line`
        ? `Line`
        : input === `area`
          ? `Area`
          : input === `point`
            ? `Point`
            : `Tile`,
  help:
    input === `bar`
      ? `A bar per row rising from zero in its x slot (or floating on a [from, to] pair); whisker, group | stack, hatch, title, labels, tone.`
      : input === `line`
        ? `A line joining the rows in row order; whisker at each vertex, group, dash, title, labels (at the line's end), tone (one value per line).`
        : input === `area`
          ? `A line filled down to zero (or a band between a [from, to] pair); group | stack, title, labels, tone (one value per area).`
          : input === `point`
            ? `A dot per row at (x, y) — over a linear x, the scatter plot; whisker, size (marker area), group, title, labels, tone.`
            : `One coloured cell per (x slot, y category): shade (required) colours it, labels print in the cell; nothing else — a tile chart holds only tiles.`,
});
var mapMarkTypes: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => ({
  bar: input(`bar`),
  line: input(`line`),
  area: input(`area`),
  point: input(`point`),
  tile: input(`tile`),
});
var ChartGrammarVariants2: Dynamic = mapMarkTypes(markSchema);
var ChartGrammarItem2: Dynamic = {
  kind: `variant`,
  key: `type`,
  variants: ChartGrammarVariants2,
  hints: markTypeHints,
  notOneOf: markTypesHint,
  road: widgetEscapeHatchHint,
  stringHint: `a mark is an object: {"type": "<value>", "y": "<column>"}`,
  tier: `data-determining`,
  label: `Mark`,
  help: `One data mark: type (bar | line | area | point | tile) decides its keys. Colour comes from mark order, a group or stack split, or on a tile from shade — never from a key.`,
};
var chartGrammarXYValues: Dynamic = [`x`, `y`];
var chartGrammarMessage13: Dynamic = `not yet: an annotation on the second y axis; "y" reads axes.y[0] — put the unit the level belongs to on the first entry`;
var ChartGrammarHints11: Dynamic = {
  0: `the first y entry is spelled "y"`,
  1: chartGrammarMessage13,
  y2: chartGrammarMessage13,
  right: chartGrammarMessage13,
  secondary: chartGrammarMessage13,
  y1: `spelled "y"`,
  left: `spelled "y"`,
};
var annotationFieldSchemas: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => ({
  kind: {
    kind: `literal`,
    values: [input],
    tier: `data-determining`,
    label: `Annotation kind`,
    help:
      input === `rule`
        ? `"rule": a reference line per row.`
        : `"span": a shaded interval per row.`,
  },
  source: {
    kind: `source`,
    tier: `data-determining`,
    label: `Source`,
    help: `The sources key of the table whose rows place this ${input} (targets, launches, incidents — hand-typed facts live in an inline data source, never in the definition). Omitted = the chart's source. At most 8 rows.`,
  },
  axis: {
    kind: `literal`,
    values: chartGrammarXYValues,
    hints: ChartGrammarHints11,
    refusal: `<value>: axis is x or y`,
    tier: `data-determining`,
    label: `Axis`,
    help:
      input === `rule`
        ? `"x": each row's line STANDS at an x value (a date, a category, a number) and crosses the plot top to bottom; "y": each row's line LIES at a level of the y axis. Places the ink only.`
        : `"x": each row's window runs between two x values, the plot's full height; "y": each row's corridor lies between two y levels, the plot's full width. Places the ink only.`,
  },
});
var ChartGrammarLabel: Dynamic = {
  label: `words on an annotation are labels: [{"kind": "text", "text": "…"}] (or a column per row)`,
  text: `words on an annotation are labels: [{"kind": "text", "text": "…"}]`,
  title: `words on an annotation are labels: [{"kind": "text", "text": "…"}]`,
  color: `annotations wear the neutral reference ink — no colour to write`,
  colour: `annotations wear the neutral reference ink — no colour to write`,
  stroke: `annotations wear the neutral reference ink — no colour to write`,
  tone: `a status ink rides a column label: labels: [{"kind": "column", "column": …, "tone": {…}}]`,
  type: `an annotation says kind: "rule" | "span" (type is for data marks and axes)`,
  group: `annotations do not split — one line or band per row of the source`,
  stack: `annotations do not split`,
  hatch: `annotations do not split`,
  dash: `a rule never takes dash — every rule is the same dashed hairline`,
  strokeDash: `a rule never takes dash — every rule is the same dashed hairline`,
  opacity: `the wash is automatic — drop it`,
  pane: ChartGrammarData,
  yAxis: `axis is "x" or "y"`,
  on: `the axis is axis: "x" | "y"`,
  orient: `the axis is axis: "x" | "y"`,
  direction: `the axis is axis: "x" | "y"`,
};
var ChartGrammarVariants3: Dynamic = {
  rule: {
    kind: `group`,
    fields: {
      ...annotationFieldSchemas(`rule`),
      value: {
        kind: `column`,
        constantHint: `name a column of source facts`,
        tier: `data-determining`,
        label: `Value column`,
        help: `A COLUMN of the source: where each row's line stands (axis "x": a date, a category, a number) or lies (axis "y": a level in axes.y[0]'s unit). Hand-typed values live in a one-row inline data source, never in the definition.`,
      },
      labels: ChartGrammarLabels,
    },
    required: [`kind`, `axis`, `value`],
    hints: {
      ...ChartGrammarLabel,
      x: `a rule stands at axis: "x", value: "<column>"`,
      y: `a rule lies at axis: "y", value: "<column>"`,
      at: `a rule reads its position from a column: value: "<column>"`,
      column: `the column is value`,
      x2: `an interval is kind: "span" with range: ["<from>", "<to>"]`,
      y2: `an interval is kind: "span" with range: ["<from>", "<to>"]`,
      from: `an interval is kind: "span" with range: ["<from>", "<to>"]`,
      to: `an interval is kind: "span" with range: ["<from>", "<to>"]`,
    },
    keySentences: {
      range: {
        message: `is a rule and takes value, not range`,
        atObject: true,
      },
    },
    noun: `a rule`,
    tier: `data-determining`,
    label: `Rule`,
    help: `A reference line per source row: {kind: "rule", axis: "x" | "y", value: "<column>", source?, labels?}.`,
  },
  span: {
    kind: `group`,
    fields: {
      ...annotationFieldSchemas(`span`),
      range: {
        kind: `pair`,
        tier: `data-determining`,
        label: `Range columns`,
        help: `A [from, to] PAIR of columns of the source: one wash per row between the two values — a window in time on axis "x" (["incident_start", "incident_end"], end exclusive), a corridor on axis "y" (["floor", "ceiling"]). from comes before to.`,
      },
      labels: ChartGrammarLabels,
    },
    required: [`kind`, `axis`, `range`],
    hints: {
      ...ChartGrammarLabel,
      x: `a window in x is axis: "x", range: ["<from column>", "<to column>"]`,
      y: `a corridor in y is axis: "y", range: ["<lo column>", "<hi column>"]`,
      from: `the interval is range: ["<from column>", "<to column>"]`,
      to: `the interval is range: ["<from column>", "<to column>"]`,
      start: `the interval is range: ["<start column>", "<end column>"]`,
      end: `the interval is range: ["<start column>", "<end column>"]`,
      x2: `the interval is ONE key holding a pair: range: ["<from>", "<to>"]`,
      y2: `the interval is ONE key holding a pair: range: ["<from>", "<to>"]`,
      fill: `spans wear the neutral wash — no colour to write`,
    },
    keySentences: {
      value: {
        message: `is a span and takes range, not value`,
        atObject: true,
      },
    },
    noun: `a span`,
    tier: `data-determining`,
    label: `Span`,
    help: `A shaded interval per source row: {kind: "span", axis: "x" | "y", range: ["<from>", "<to>"], source?, labels?}.`,
  },
};
var ChartGrammarAnnotations: Dynamic = {
  kind: `items`,
  min: 1,
  max: 8,
  noun: `annotations`,
  item: {
    kind: `variant`,
    key: `kind`,
    variants: ChartGrammarVariants3,
    hints: {
      line: `a reference line is kind: "rule"`,
      hline: `a horizontal reference line is kind: "rule" with axis: "y"`,
      vline: `a vertical reference line is kind: "rule" with axis: "x"`,
      target: `a target line is kind: "rule" with axis: "y"`,
      threshold: `a threshold line is kind: "rule" with axis: "y"`,
      marker: `event markers are kind: "rule" with axis: "x" and a date column as value`,
      event: `event markers are kind: "rule" with axis: "x"`,
      flag: `event markers are kind: "rule" with axis: "x"`,
      band: `a shaded interval is kind: "span"`,
      rect: `a shaded interval is kind: "span"`,
      range: `a shaded interval is kind: "span"`,
      region: `a shaded interval is kind: "span"`,
      corridor: `a corridor is kind: "span" with axis: "y"`,
      window: `a shaded window in time is kind: "span" with axis: "x"`,
      text: `free text is not an annotation kind — words ride a rule or span as labels: [{"kind": "text", "text": "…"}]`,
      note: `a chart-level note is the chart's note key; words on a line are a rule's labels`,
      callout: `free callouts are comments anchored on the datum; words at a value are a rule with labels`,
      arrow: `arrows are not in Claude Docs charts — a labelled rule marks the spot`,
      trend: `trend lines are computed in the query and drawn as a line mark`,
      trendline: `trend lines are computed in the query and drawn as a line mark`,
      average: `an average line is a rule over a column the query computed: {kind: "rule", axis: "y", value: "avg_latency"}`,
      mean: `a mean line is a rule over a column the query computed: {kind: "rule", axis: "y", value: "<column>"}`,
      tick: `a reference tick per slot is a point mark at the value on each slot; one value across all slots is a rule`,
      bar: `data marks go in marks — annotations are rule | span`,
      area: `data marks go in marks — a shaded interval is kind: "span"`,
      point: `data marks go in marks — annotations are rule | span`,
    },
    stringHint: `an annotation is an object: {"kind": "rule", "axis": "y", "value": "<column>"} or {"kind": "span", "axis": "x", "range": ["<from>", "<to>"]}`,
    tier: `data-determining`,
    label: `Annotation`,
    help: `A reference line (rule) or shaded interval (span) read from a source's rows.`,
  },
  objectHint: `annotations is a LIST: "annotations": [{"kind": "rule", …}]`,
  tier: `data-determining`,
  label: `Annotations`,
  help: `Up to 8 reference layers in the neutral reference ink, each placing one line / band per row of its source (at most 8 rows): {kind: "rule", axis: "y", value} target lines, {kind: "rule", axis: "x", value} event lines, {kind: "span", axis: "x", range: [from, to]} outage windows, {kind: "span", axis: "y", range: [lo, hi]} corridors. Never series: no legend rows, no splits.`,
};
var ChartGrammarColumns: Dynamic = {
  kind: `items`,
  min: 1,
  max: 1,
  noun: `column slices`,
  one: `facet split`,
  overHint: `not yet: facet rows; facet by one column`,
  item: splitSchema(
    `slice`,
    ChartGrammarField,
    `One panel per distinct value of by: {by: "<column>", order?: {"kind": "list", "values": […]} | {"kind": "natural"}, title?}.`,
    `Facet split`,
  ),
  objectHint: `columns is a LIST of one split: "columns": [{"by": "<column>"}]`,
  tier: `data-determining`,
  label: `Columns`,
  help: `Facet: one panel per value of a column of the chart's source, side by side on shared scales: columns: [{"by": "<column>"}]; wrap folds the strip into lines. Exactly one entry (a second variable is not drawn at launch).`,
};
var ChartGrammarTitle4: Dynamic = {
  title: {
    kind: `text`,
    min: 1,
    max: 40,
    nullHint: `there is no null in the grammar — omit title and the chart has no title band`,
    overHint: chartGrammarSayTheRestInTheNote,
    tier: `display-only`,
    label: `Title`,
    help: `Names the chart in at most 40 characters (it wraps, never truncates; say the rest in the note), also its accessible name. Keep the "so what" in the doc's prose; omitted = no title band ("" is refused). Inline text: it edits in place.`,
  },
  source: {
    kind: `source`,
    tier: `data-determining`,
    label: `Source`,
    help: `The sources key every mark and annotation reads unless it names its own (nearest enclosing wins: mark → chart → table): source: "<sources key>". A source is a governed read (ref) or inline rows (data); hand-typed facts live in a data source, never in the definition.`,
  },
  note: {
    kind: `text`,
    min: 1,
    max: 200,
    tier: `display-only`,
    label: `Note`,
    help: `A quiet line under the chart (a caveat, the data's as-of, a definition) — 1 to 200 characters. Inline text: it edits in place.`,
  },
  axes: {
    kind: `group`,
    fields: ChartGrammarFields2,
    required: [`x`],
    hints: ChartGrammarHints9,
    stringHint: `axes is an object of lists: "axes": {"x": [{"column": "<value>", "type": "band"}]}`,
    noun: `axes`,
    tier: `data-determining`,
    label: `Axes`,
    help: `The scales: {x: [exactly one, by type], y?: [one, or two — the second with side: "after" is the right axis, its own scale]}.`,
  },
  marks: {
    kind: `items`,
    min: 1,
    max: 8,
    noun: `marks`,
    emptyHint: `a chart draws at least one mark`,
    overHint: `draw the rest in a second Visualize`,
    item: ChartGrammarItem2,
    objectHint: `marks is a LIST: "marks": [{"type": "bar", "y": "<column>"}]`,
    tier: `data-determining`,
    label: `Marks`,
    help: `The data layers, painted in order (1 to 8).`,
  },
  annotations: ChartGrammarAnnotations,
  columns: ChartGrammarColumns,
  wrap: {
    kind: `count`,
    min: 1,
    max: 6,
    refusal: `is <value>; <min>..<max> panels per line`,
    tier: `display-only`,
    label: `Panels per line`,
    help: `Folds the columns facet into lines of this many panels (1 to 6) — twelve regions as three lines of four. Only with columns (wrap folds facet panels).`,
  },
  orient: {
    kind: `literal`,
    values: chartGrammarHorizontalValues,
    hints: ChartGrammarHints2,
    tier: `display-only`,
    label: `Orientation`,
    help: `"horizontal" lays the chart on its side when its marks are bars and/or points (floating bars and whiskers included — range plots, dot plots, dumbbells): the x categories run down the left in row order and the value axis runs along the bottom (its min and max clamp it there). Refused with a line, area or tile mark and beside a columns facet; "vertical" is the default and is never written. The definition is written the same way either way.`,
  },
};
var chartGrammarStyles12: Dynamic = `Vega-Lite's spelling — a chart is {"kind": "chart", "axes": {"x": [{"column": "<column>"}]}, "source": "<sources key>", "marks": [{"type", "y": "<column>", "group"?: {"by"}}], "title"?}`;
var ChartGrammarScales: Dynamic = {
  ...transformationKeyHints,
  scales: chartGrammarStyles6,
  color: chartGrammarStyles5,
  colour: chartGrammarStyles5,
  x: `the x axis moved under axes: "axes": {"x": [{"column": "<column>", "type": "band", …}]}`,
  y: `the y axis moved under axes: "axes": {"x": [...], "y": [{"title"?: …, "format"?: …}]}`,
  z: chartGrammarMessage6,
  xAxis: `the x axis is axes.x: "axes": {"x": [{"column": "<column>", "type": …}]}`,
  yAxis: `the y axis is axes.y: "axes": {…, "y": [{…}]}`,
  panes: ChartGrammarData,
  facet: `a facet is the chart's columns list: "columns": [{"by": "<column>"}], "wrap"?: 4 (facet rows are not drawn at launch)`,
  row: `not yet: rows — facet by one column with columns (and wrap)`,
  column: `side-by-side panels are columns: [{"by": "<column>"}]`,
  order: `order sits with what it orders: axes.x[0].order (a band axis' categories), group.order / stack.order on the mark (series), columns[0].order (panels)`,
  sort: `order sits with what it orders: axes.x[0].order (categories), group.order / stack.order (series), columns[0].order (panels) — a sort is the query's ORDER BY`,
  seriesCap: seriesCapHint,
  seriesLabels: `series names are the values of the group.by / stack.by column — rename them in the source table, not in the chart`,
  data: `rows come from the sources prop — the definition names one with source: "<sources key>"; hand-typed facts (targets, events) are an inline data source there, never in the definition`,
  datasets: `rows come from the sources prop — the definition names the one it draws with source: "<sources key>"`,
  sources: `sources is the component's other prop, not a definition key — the definition names one with source`,
  values: `hand-typed rows are an inline data source in the sources prop ({kind: "data", data: [...]}) named by source — never in the definition`,
  dataset: `the source is source: "<sources key>"`,
  table: `the source is source: "<sources key>"; a table of figures is kind: "table"`,
  from: `the source is source: "<sources key>"`,
  mark: chartGrammarStyles12,
  encoding: chartGrammarStyles12,
  layer: chartGrammarStyles12,
  layers: `the layers are marks: [{…}, …]`,
  $schema: chartGrammarStyles12,
  config: chartGrammarStyles12,
  view: chartGrammarStyles12,
  pane: ChartGrammarData,
  vconcat: ChartGrammarData,
  hconcat: `one chart per definition — draw two charts (or facet with columns)`,
  concat: ChartGrammarData,
  repeat: `one chart per definition — facet by a column instead (columns)`,
  resolve: `scales are shared across panels unless the y axis says free: true`,
  width: `the chart sizes to its slot — drop width`,
  height: `the chart sizes to its slot — drop height`,
  autosize: `the chart sizes to its slot — drop it`,
  padding: `spacing is automatic — drop it`,
  background: `the background is the doc's — drop it`,
  description: `the accessible description is synthesized from the title and the columns — a visible caveat is note`,
  subtitle: `a quiet line under the chart is note`,
  caption: `a quiet line under the chart is note`,
  footnote: `a quiet line under the chart is note`,
  comment: `a quiet line under the chart is note`,
  transform: `transforms are not in Claude Docs charts — shape the rows in the source query; stacking is marks[i].stack: {"by": "<column>"}`,
  group: `a split is written on the mark: marks[i].group: {"by": "<column>"}`,
  groupBy: `a split is written on the mark: marks[i].group: {"by": "<column>"}`,
  stack: `stacking is written on the mark: marks[i].stack: {"by": "<column>"}`,
  normalize: normalizedStackHint,
  percent: normalizedStackHint,
  offset: normalizedStackHint,
  rules: `reference lines are annotations: [{"kind": "rule", "axis": "y", "value": "<column>"}]`,
  spans: `shaded intervals are annotations: [{"kind": "span", "axis": "x", "range": ["<from>", "<to>"]}]`,
  markers: `event markers are annotations: [{"kind": "rule", "axis": "x", "value": "<date column>", "labels": […]}]`,
  reference: `reference lines are annotations: [{"kind": "rule", "axis": "y", "value": "<column>"}]`,
  targets: `target lines are annotations: [{"kind": "rule", "axis": "y", "value": "<column>"}]`,
  annotation: `spelled annotations (a list): [{"kind": "rule" | "span", …}]`,
  compare: `not yet: compare — the query emits both periods as rows and a colour split tells them apart`,
  period: `period rides the x axis: axes.x[0].period (type time)`,
  horizontal: `spelled orient: "horizontal"`,
  orientation: `spelled orient: "horizontal"`,
  direction: `spelled orient: "horizontal"`,
  layout: `orientation is orient: "horizontal"; panels are columns (+ wrap)`,
  side: `side rides an axis: axes.y[0].side: "after" (right), axes.x[0].side: "before" (top)`,
  interactions: `interactions are automatic (tooltips, hover) — drop it`,
  params: `Vega-Lite parameters are not in Claude Docs charts — drop it`,
  selection: `selections are not in Claude Docs charts — drop it`,
  specVersion: `the spec version is stamped by the renderer — drop it`,
  legend: `the legend is automatic — 2 to 4 line series are named at their line ends when the names fit, every other encoding lists in legend rows; a written group or stack title lists them in legend rows headed by it; no key shows, hides or places it`,
  showLegend: `the legend is automatic — no key shows or hides it`,
  legendTitle: `a legend title is the split's title: group: {"by": …, "title": "Region"}`,
  tooltip: `tooltips are automatic — drop it`,
  animate: `animation is off in Claude Docs charts — drop it`,
  theme: `the theme is the doc's — drop it`,
  stats: `a stat is its own definition (kind "stat"); stats beside charts are kind: "table"`,
  labels: `labels ride a mark or an annotation: marks[i].labels: [{…}] (a stat's labels print after its title)`,
  tone: `tone rides a mark, a label or a printed value: marks[i].tone: {column}`,
  name: `a chart's words are title; a series' legend title is marks[i].title`,
  id: `a chart needs no id`,
  rows: `not yet: rows — facet by one column with columns (and wrap)`,
};
var ChartGrammarChart3: Dynamic = {
  kind: `group`,
  fields: {
    kind: {
      kind: `literal`,
      values: [`chart`],
      hints: ChartGrammarHints3,
      tier: `data-determining`,
      label: `Kind`,
      help: `What this definition is (required): "chart" — data marks over axes; "stat" — one big number; "table" — rows of stats, columns and small charts.`,
    },
    ...ChartGrammarTitle4,
  },
  required: [`kind`, `axes`, `marks`],
  hints: chartHintsByKind(`chart`),
  noun: `a chart definition`,
  tier: `data-determining`,
  label: `Chart`,
  help: `A chart: data marks over axes.`,
};
mapMarkTypes(
  (input?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
    Object.keys(ChartGrammarVariants2[input].fields),
);
mapMarkTypes(
  (input?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
    ChartGrammarVariants2[input].required ?? [],
);
Object.keys(ChartGrammarTone.fields);
ChartGrammarChart.chart;
Object.keys(xAxisFields(`time`));
Object.keys(xAxisFields(`band`));
Object.keys(xAxisFields(`linear`));
Object.keys(xAxisFields(`log`));
Object.keys(ChartGrammarVariants3.rule.fields);
Object.keys(ChartGrammarVariants3.span.fields);
var quoteDefinitionValue: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => JSON.stringify(input);
var ownFieldOrUndefined: Dynamic = (
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  input !== undefined && Object.hasOwn(input, options)
    ? input[options]
    : undefined;
var isValidPathIndex: Dynamic = (
  input?: Dynamic,
  options: Dynamic = 2 ** 53 - 1,
  ..._extraArguments: unknown[]
): Dynamic => {
  let value: Dynamic =
    typeof input == `number`
      ? input
      : input !== undefined && /^\d+$/.test(input)
        ? Number(input)
        : NaN;
  return Number.isInteger(value) && value >= 0 && value < options;
};
var chartGrammarSet: Dynamic = new (Set as Dynamic)(
  Object.values(ChartGrammarTime).flat(),
);
var isKnownAnnotationKind: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => typeof input == `string` && chartGrammarSet.has(input);
var isOrderAttributePath: Dynamic = (
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  (input === `kind` && options.length === 0) ||
  (input === `values` &&
    (options.length === 0 ||
      (options.length === 1 && isValidPathIndex(options[0]))));
var normalizeFieldTier = (input?: Dynamic, ..._extraArguments: unknown[]) =>
  input === `display-only` ? `display-only` : `data-determining`;
var unknownKeysProblem = (
  input?: Dynamic,
  options?: Dynamic,
  context: Dynamic = {},
  ..._extraArguments: unknown[]
) => {
  let value: Dynamic = input.toSorted();
  let value2: Dynamic = (
    input2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => ownFieldOrUndefined(context, input2);
  if (value.length === 1 && value2(value[0]) !== undefined)
    return `${quoteDefinitionValue(value[0])} isn't part of the grammar — ${value2(value[0])}`;
  let slice: Dynamic = value.slice(0, 3);
  let value3: Dynamic = value.length - slice.length;
  let entries: Dynamic = new (Map as Dynamic)();
  for (let value4 of slice as Dynamic) {
    let value5: Dynamic = value2(value4);
    if (value5 !== undefined) {
      entries.set(value5, [...(entries.get(value5) ?? []), value4]);
    }
  }
  let text: Dynamic = [...entries]
    .map(
      ([input2, input3]: Dynamic, ..._extraArguments: unknown[]) =>
        `; ${input3.map(quoteDefinitionValue).join(`, `)}: ${input2}`,
    )
    .join(``);
  return `${slice.map(quoteDefinitionValue).join(`, `)}${value3 > 0 ? ` and ${formatIntegerCount(value3)} more keys` : ``} ${value.length > 1 ? `aren't` : `isn't`} part of the grammar — ${options}${text}`;
};
var isGrammarRecord: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => typeof input == `object` && !!input && !Array.isArray(input);
var normalizeSplitDefinition: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  input === undefined
    ? undefined
    : {
        by: input.by,
        order: input.order,
        title: input.title,
      };
var ChartGrammarData4: Dynamic = [0];
var normalizeToneDefinition: Dynamic = (
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => ({
  column: input.column ?? options,
  cutoffs: input.cutoffs ?? ChartGrammarData4,
  reverse: input.reverse === true,
});
var normalizeLabelDefinitions: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  (input ?? []).map(
    (
      entry?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      entry.kind === `text`
        ? {
            kind: `text`,
            text: entry.text,
            index: options,
          }
        : {
            kind: `column`,
            column: entry.column,
            format: entry.format,
            tone:
              entry.tone === undefined
                ? undefined
                : normalizeToneDefinition(entry.tone, entry.column),
            index: options,
          },
  );
var isHorizontalChart = (input?: Dynamic, ..._extraArguments: unknown[]) =>
  input.orient === `horizontal`;
var primaryYAxis: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => input.axes?.y?.[0] ?? {};
var secondaryYAxis: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => input.axes?.y?.[1];
var yAxisIndex = (input?: Dynamic, ..._extraArguments: unknown[]) =>
  +(input.axis === 1);
var primaryXAxis: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => input.axes?.x?.[0];
var normalizeChannelRange: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  Array.isArray(input)
    ? {
        from: input[0],
        to: input[1],
      }
    : {
        to: input,
        from: undefined,
      };
var effectiveMarkSource: Dynamic = (
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => input.source ?? options.source ?? ``;
var marksShareGroup: Dynamic = (
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  input.group !== undefined &&
  input.group.by === options.group?.by &&
  effectiveMarkSource(input, context) === effectiveMarkSource(options, context);
var markUsesGroupedLayout = (
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) =>
  input.group === undefined
    ? false
    : input.type === `bar`
      ? true
      : input.type !== `point` ||
          input.group.by === primaryXAxis(options)?.column
        ? false
        : !(options.marks ?? []).some(
            (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              (input2.type === `line` || input2.type === `area`) &&
              marksShareGroup(input2, input, options),
          );
var pointIsOverlaidGroup: Dynamic = (
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => {
  if (input.type !== `point` || !markUsesGroupedLayout(input, options))
    return false;
  let value: Dynamic = options.marks ?? [];
  let value2: Dynamic =
    value.find(
      (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        input2.type === `bar` && markUsesGroupedLayout(input2, options),
    ) ??
    value.find(
      (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        input2.type === `point` && markUsesGroupedLayout(input2, options),
    );
  return value2 === undefined || marksShareGroup(value2, input, options);
};
var lowerMarkDefinition: Dynamic = (
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => {
  let value: Dynamic = primaryXAxis(options)?.column ?? ``;
  let { to: to, from: from }: Dynamic = normalizeChannelRange(input.y);
  let value2: Dynamic = isHorizontalChart(options);
  let value3: Dynamic = normalizeLabelDefinitions(input.labels);
  let match: Dynamic = value3.find(
    (entry?: Dynamic, ..._extraArguments: unknown[]) => entry.kind === `column`,
  );
  let value4: Dynamic =
    input.group === undefined
      ? input.stack === undefined
        ? undefined
        : `stack`
      : `group`;
  let value5: Dynamic = value4 === undefined ? undefined : input[value4];
  let value6: Dynamic =
    input.hatch !== undefined && input.type === `bar` && from === undefined;
  return {
    type: input.type,
    index: context,
    source: input.source ?? options.source ?? ``,
    axis: yAxisIndex(input),
    x: value2 ? to : value,
    y: value2 ? value : to,
    y2: from,
    whisker:
      input.whisker === undefined
        ? undefined
        : {
            lo: input.whisker[0],
            hi: input.whisker[1],
          },
    size: input.size,
    shade: input.shade,
    group: normalizeSplitDefinition(input.group),
    stackSplit: normalizeSplitDefinition(input.stack),
    hatch: normalizeSplitDefinition(input.hatch),
    dash: normalizeSplitDefinition(input.dash),
    color: value5?.by,
    colorKey: value4,
    order: value5?.order,
    cluster:
      (input.type === `bar` && input.group !== undefined) ||
      pointIsOverlaidGroup(input, options)
        ? input.group.by
        : undefined,
    stack: input.stack !== undefined || value6 ? `zero` : undefined,
    stackBy: input.stack?.by ?? (value6 ? input.hatch.by : undefined),
    label: match?.kind === `column` ? match.column : undefined,
    labelFormat: match?.kind === `column` ? match.format : undefined,
    labels: value3,
    title: input.title,
    tone:
      input.tone === undefined
        ? undefined
        : normalizeToneDefinition(input.tone, to),
  };
};
function lowerChartMarks(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return (input.marks ?? []).map(
    (
      input2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => lowerMarkDefinition(input2, input, options),
  );
}
var formatAllowedValues: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  input
    .map(
      (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        typeof input2 == `string` ? `"${input2}"` : String(input2),
    )
    .join(`, `);
function fieldValueRequirement(
  entry?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  switch (entry.kind) {
    case `text`:
      return `must be a string of ${entry.min} to ${entry.max} characters`;
    case `number`:
      return `must be a number`;
    case `column`:
      return `must be a column name (a non-empty string of at most 256 characters)`;
    case `source`:
      return sourceNameHint;
    case `channel`:
      return `must be a column name, or a [from, to] pair of two column names (["start", "end"])`;
    case `pair`:
      return `must be ${entry.what ?? `a [from, to] pair`} — exactly two column names (${entry.example ?? `["start", "end"]`})`;
    case `cutoffs`:
      return `must be [c] or [c1, c2] — one or two ascending numbers`;
    case `items`:
      return entry.max === 1
        ? `must be a list of exactly one ${entry.one ?? entry.noun}`
        : `must be a list of ${entry.min} to ${entry.max} ${entry.noun}`;
    case `variant`:
      return `must be an object whose ${entry.key} is ${Object.keys(entry.variants).map(quoteDefinitionValue).join(` or `)}`;
    case `literal`:
      return entry.values.length === 1
        ? `must be ${formatAllowedValues(entry.values)}`
        : `must be one of ${formatAllowedValues(entry.values)}`;
    case `flag`:
      return `must be true (or leave the key out)`;
    case `format`:
      return chartGrammarStyles13;
    case `order`:
      return `must be an order — ${chartGrammarStyles2}`;
    case `count`:
      return `must be a whole number from ${entry.min} to ${entry.max}`;
    case `group`:
      return `must be an object — its fields are ${Object.keys(entry.fields).join(`, `)}${entry.required?.length ? ` (${entry.required.join(`, `)} required)` : ``}`;
  }
}
var validDisplayString: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  typeof input == `string` && input.length > 0 && input.length <= 256;
var validateColumnName = (
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined => {
  if (isReservedColumnName(input)) {
    context.push({
      path: options,
      message: reservedColumnNameMessage(input),
    });
  }
};
var validateColumnNames: Dynamic = (
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  input.forEach(
    (
      input2?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => validateColumnName(input2, [...options, options2], context),
  );
var chartGrammarStyles13: Dynamic = `must be a format object — {"kind": "number", "spec"?: "~s", "prefix"?: "$", "suffix"?: " ms"} | {"kind": "time", "spec": "%b %Y"}`;
var suggestFormatObject = (input?: Dynamic, ..._extraArguments: unknown[]) => {
  if (hasTimeFormatSpecifier(input))
    return `{"kind": "time", "spec": ${JSON.stringify(input)}}`;
  if (input.includes(`$`)) {
    let value: Dynamic = input.replace(`$`, ``);
    return `{"kind": "number", "spec": ${JSON.stringify(value === `` ? `,` : value)}, "prefix": "$"}`;
  }
  return `{"kind": "number", "spec": ${JSON.stringify(input)}}`;
};
var numberFormatProblem: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => {
  if (hasTimeFormatSpecifier(input))
    return `${JSON.stringify(input)} is a date format — dates are {"kind": "time", "spec": ${JSON.stringify(input)}}`;
  if (input.length > 8)
    return `number formats are at most 8 characters ([+][,][.N][~] and a type: ",.0f", ".1%", "~s", ",d")`;
  let value: Dynamic = validateNumberFormat(input);
  if (!value.ok) return value.message;
  if (value.format.kind !== `number`) return null;
  let { type: type, precision: precision }: Dynamic = value.format;
  return (type === `f` || type === `%`) && precision === undefined
    ? `"${input}" needs a precision — "${type}" alone prints six decimals; write ".0${type}" or ".1${type}"`
    : precision !== undefined && precision > 20
      ? `precision is at most 20`
      : null;
};
var timeFormatProblem: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => {
  if (!hasTimeFormatSpecifier(input))
    return `${JSON.stringify(input)} is a number format — numbers are {"kind": "number", "spec": ${JSON.stringify(input)}}; a date format has % directives ("%b %Y", "%b %-d")`;
  if (input.length < 2 || input.length > 64)
    return `date formats are 2 to 64 characters`;
  let value: Dynamic = parseTimeFormat(input);
  return value.ok ? null : value.message;
};
var chartGrammarUnicodePattern: Dynamic = /[\p{Cc}\p{Cf}\u2028\u2029]/u;
var unitTextRequirement = (input?: Dynamic, ..._extraArguments: unknown[]) =>
  `must be unit text of 1 to 4 visible characters plus at most one edge space, with no control characters — printed verbatim ${input === `prefix` ? `before every number ("$", "€", "≈")` : `after every number (" ms", " pts", "%")`}`;
var unitTextProblem: Dynamic = (
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => {
  if (typeof input != `string` || chartGrammarUnicodePattern.test(input))
    return unitTextRequirement(options);
  let items: Dynamic = [...input];
  let value: Dynamic = +(items[0] === ` `);
  let value2: Dynamic = +(
    items.length > value && items[items.length - 1] === ` `
  );
  let slice: Dynamic = items.slice(value, items.length - value2);
  return slice.length === 0
    ? unitTextRequirement(options)
    : slice.length > 4
      ? `'${input}' is ${items.length} characters; 4 allowed — use a label`
      : slice.some(
            (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
              /\s/u.test(input2),
          )
        ? `'${input}' has a space inside — an affix is unit text (" ms", "$"); words about a value are a label`
        : value + value2 > 1
          ? `'${input}' has a space at both ends — one edge space at most (" ms" after a number, "≈ " before one)`
          : null;
};
var formatKeyHints: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => ({
  format: `the format string is spelled spec`,
  pattern: `the format string is spelled spec`,
  specifier: `the format string is spelled spec`,
  fmt: `the format string is spelled spec`,
  string: `the format string is spelled spec`,
  value: `the format string is spelled spec`,
  type: `the variant is kind; the number style is spelled in spec ("~s", ".0%", ",d")`,
  style: `the variant is kind: "number" | "currency" | "time"`,
  precision: `precision is spelled in spec: ".1f", ".2~s"`,
  decimals: `precision is spelled in spec: ".1f", ".2~s"`,
  digits: `precision is spelled in spec: ".1f", ".2~s"`,
  unit: `a unit is literal text: "suffix": " ms" (or "prefix") on {"kind": "number"}`,
  units: `a unit is literal text: "suffix": " ms" (or "prefix") on {"kind": "number"}`,
  currency: `a currency mark is "prefix": "$" on {"kind": "number"}`,
  symbol: `a currency mark (or any other mark) is "prefix": "€" on {"kind": "number"}`,
  code: `there is no currency code — the mark is "prefix": "$" on {"kind": "number"}`,
  iso: `there is no currency code — the mark is "prefix": "$" on {"kind": "number"}`,
  locale: `formats are locale-free — drop it`,
  timeZone: `times print in UTC — drop it`,
  timezone: `times print in UTC — drop it`,
  tz: `times print in UTC — drop it`,
  ...(input === `number`
    ? {}
    : {
        prefix: `date formats carry their own text — write it inside spec (e.g. "%b %Y")`,
        suffix: `date formats carry their own text — write it inside spec (e.g. "Q%q %Y")`,
      }),
});
function validateFormat(
  entry?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value = (
    input?: Dynamic,
    options2: Dynamic = options,
    ..._extraArguments: unknown[]
  ): undefined => {
    context.push({
      path: options2,
      message: input,
    });
  };
  if (!isGrammarRecord(entry))
    return value(
      typeof entry == `string`
        ? `${chartGrammarStyles13} — format is an object now: write ${suggestFormatObject(entry)}`
        : chartGrammarStyles13,
    );
  let value2: Dynamic = `must be one of ${chartGrammarNumberTimeValues.map(quoteDefinitionValue).join(`, `)}`;
  if (!Object.hasOwn(entry, `kind`) || entry.kind === undefined)
    return value(`is required — ${value2}`, [...options, `kind`]);
  let kind: Dynamic = entry.kind;
  if (typeof kind != `string` || !chartGrammarNumberTimeValues.includes(kind)) {
    let value6: Dynamic = ownFieldOrUndefined(
      ChartGrammarPercent,
      String(kind).toLowerCase(),
    );
    return value(value6 === undefined ? value2 : `${value2} — ${value6}`, [
      ...options,
      `kind`,
    ]);
  }
  let value3: Dynamic = kind;
  let value4: Dynamic = ChartGrammarTime[value3];
  let filtered: Dynamic = Object.keys(entry).filter(
    (input?: Dynamic, ..._extraArguments: unknown[]) => !value4.includes(input),
  );
  if (filtered.length > 0) {
    value(
      unknownKeysProblem(
        filtered,
        `a ${value3} format takes ${value4.join(`, `)}`,
        formatKeyHints(value3),
      ),
    );
  }
  let value5: Dynamic = Object.hasOwn(entry, `spec`) ? entry.spec : undefined;
  if (value3 === `time`) {
    if (value5 === undefined)
      value(`is required — a date format such as "%b %Y" or "%b %-d"`, [
        ...options,
        `spec`,
      ]);
    else if (typeof value5 != `string`)
      value(`must be a date format string such as "%b %Y" or "%b %-d"`, [
        ...options,
        `spec`,
      ]);
    else {
      let value6: Dynamic = timeFormatProblem(value5);
      if (value6 !== null) {
        value(value6, [...options, `spec`]);
      }
    }
    return;
  }
  if (value5 !== undefined)
    if (typeof value5 != `string`)
      value(
        `must be a number format string — [+][,][.N][~] and a type f | d | % | s (e.g. "~s", ".0%", ",.0f", ",d")`,
        [...options, `spec`],
      );
    else {
      let value6: Dynamic = numberFormatProblem(value5);
      if (value6 !== null) {
        value(value6, [...options, `spec`]);
      }
    }
  for (let value6 of [`prefix`, `suffix`] as Dynamic) {
    if (!Object.hasOwn(entry, value6) || entry[value6] === undefined) continue;
    let value7: Dynamic = unitTextProblem(entry[value6], value6);
    if (value7 !== null) {
      value(value7, [...options, value6]);
    }
  }
}
var orderValueRequirement = (..._extraArguments: unknown[]) =>
  `must be a non-empty string of at most 256 characters`;
var ChartGrammarData5: Dynamic = `must be an order — ${chartGrammarStyles2}`;
var chartGrammarKindValuesValues: Dynamic = [`kind`, `values`];
function validateOrder(
  entry?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value = (
    input?: Dynamic,
    options2: Dynamic = options,
    ..._extraArguments: unknown[]
  ): undefined => {
    context.push({
      path: options2,
      message: input,
    });
  };
  let value2: Dynamic = (
    input?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    JSON.stringify(
      typeof input == `string` ? truncateColumnName(input) : input,
    ) ?? `undefined`;
  if (Array.isArray(entry))
    return value(`is a bare list — write {"kind": "list", "values": [...]}`);
  if (typeof entry == `string`)
    return value(
      entry === `natural`
        ? `is "natural" — write {"kind": "natural"}`
        : `is ${value2(entry)} — ${ownFieldOrUndefined(orderKindHints, entry.toLowerCase()) ?? categoryOrderHint}`,
    );
  if (!isGrammarRecord(entry)) return value(ChartGrammarData5);
  let value3: Dynamic = Object.hasOwn(entry, `kind`) ? entry.kind : undefined;
  if (value3 === undefined)
    return value(`is required — "list" or "natural"`, [...options, `kind`]);
  if (value3 !== `list` && value3 !== `natural`) {
    let value5: Dynamic =
      typeof value3 == `string`
        ? ownFieldOrUndefined(orderKindHints, value3.toLowerCase())
        : undefined;
    return value(
      `${value2(value3)} is not an order kind — ${value5 ?? categoryOrderHint}`,
      [...options, `kind`],
    );
  }
  if (value3 === `natural`) {
    let filtered2: Dynamic = Object.keys(entry).filter(
      (input?: Dynamic, ..._extraArguments: unknown[]) => input !== `kind`,
    );
    if (filtered2.length > 0) {
      context.push({
        path: options,
        message: `natural takes no ${filtered2.toSorted().join(`, `)}`,
        statement: true,
      });
    }
    return;
  }
  let filtered: Dynamic = Object.keys(entry).filter(
    (input?: Dynamic, ..._extraArguments: unknown[]) =>
      !chartGrammarKindValuesValues.includes(input),
  );
  if (filtered.length > 0) {
    value(
      unknownKeysProblem(
        filtered,
        `a list order takes ${chartGrammarKindValuesValues.join(`, `)}`,
        {},
      ),
    );
  }
  let value4: Dynamic = Object.hasOwn(entry, `values`)
    ? entry.values
    : undefined;
  let items: Dynamic = [...options, `values`];
  if (value4 === undefined)
    return value(
      `is required — a list of one or more values in the order to draw`,
      items,
    );
  if (!Array.isArray(value4) || value4.length < 1)
    return value(
      `must be a list of one or more values in the order to draw`,
      items,
    );
  for (let [value5, value6] of value4.entries() as Dynamic)
    if (typeof value6 != `string` || value6.length === 0 || value6.length > 256)
      return value(orderValueRequirement(), [...items, value5]);
  let values: Dynamic = new (Set as Dynamic)();
  for (let value5 of value4 as Dynamic) {
    if (values.has(value5))
      return value(
        `lists ${JSON.stringify(value5)} twice — values are unique`,
        items,
      );
    values.add(value5);
  }
}
var explicitOrderValues: Dynamic = (
  entry?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  entry !== undefined && entry.kind === `list` ? entry.values : [];
function validateFieldValue(
  entry?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  value?: Dynamic,
  extra: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let value2 = (
    input?: Dynamic,
    options2: Dynamic = context,
    ..._extraArguments: unknown[]
  ): undefined => {
    value.push({
      path: options2,
      message: input,
    });
  };
  switch (entry.kind) {
    case `text`:
      if (options === null && entry.nullHint !== undefined)
        return value2(`${fieldValueRequirement(entry)} — ${entry.nullHint}`);
      if (typeof options != `string`)
        return value2(fieldValueRequirement(entry));
      if (options.length === 0 && entry.min > 0)
        return value2(`is empty: leave the key out`);
      if (options.length > entry.max)
        return value2(
          `is ${options.length} characters; ${entry.max} allowed${entry.overHint === undefined ? `` : ` — ${entry.overHint}`}`,
        );
      if (options.length < entry.min) {
        value2(fieldValueRequirement(entry));
      }
      return;
    case `number`:
      if (typeof options != `number` || !Number.isFinite(options)) {
        value2(fieldValueRequirement(entry));
      }
      return;
    case `column`:
      if (
        (typeof options == `number` || typeof options == `boolean`) &&
        entry.constantHint !== undefined
      )
        return value2(`is ${JSON.stringify(options)} — ${entry.constantHint}`);
      if (Array.isArray(options) && entry.arrayHint !== undefined)
        return value2(
          entry.arrayHint
            .replaceAll(
              `<owner>`,
              formatBareDefinitionPath(context.slice(0, -1)),
            )
            .replaceAll(`<type>`, extra.ownerType ?? `this`),
        );
      if (!validDisplayString(options))
        return value2(fieldValueRequirement(entry));
      validateColumnName(options, context, value);
      return;
    case `source`:
      if (
        typeof options != `string` ||
        !sourceNamePattern.test(options) ||
        options.startsWith(`__charts`)
      )
        return value2(fieldValueRequirement(entry));
      if (
        extra.sourceNames !== undefined &&
        !extra.sourceNames.includes(options)
      ) {
        value2(
          `"${options}" is not one of this chart's sources — available: ${extra.sourceNames.length > 0 ? extra.sourceNames.join(`, `) : `(none)`}`,
        );
      }
      return;
    case `channel`:
      if (typeof options == `string`) {
        if (!validDisplayString(options))
          return value2(fieldValueRequirement(entry));
        validateColumnName(options, context, value);
        return;
      }
      if (
        !Array.isArray(options) ||
        options.length !== 2 ||
        !options.every(validDisplayString)
      )
        return value2(
          Array.isArray(options)
            ? `${fieldValueRequirement(entry)} — a pair holds exactly two column names (got ${options.length === 2 ? `a non-column entry` : `${options.length}`})`
            : fieldValueRequirement(entry),
        );
      validateColumnNames(options, context, value);
      return;
    case `pair`:
      if (
        !Array.isArray(options) ||
        options.length !== 2 ||
        !options.every(validDisplayString)
      )
        return value2(
          typeof options == `string`
            ? entry.what === undefined
              ? `${fieldValueRequirement(entry)} — one column "${truncateColumnName(options)}" is a rule (kind: "rule"), an interval names two`
              : `${fieldValueRequirement(entry)} — "${truncateColumnName(options)}" is one column: name the low AND the high column the query computed`
            : fieldValueRequirement(entry),
        );
      validateColumnNames(options, context, value);
      return;
    case `cutoffs`:
      if (
        !Array.isArray(options) ||
        !options.every(
          (input?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            typeof input == `number` && Number.isFinite(input),
        )
      )
        return value2(fieldValueRequirement(entry));
      if (options.length < 1 || options.length > 2)
        return value2(
          `has ${options.length} cutoffs — tone has three colours: one or two cutoffs`,
        );
      if (options.length === 2 && !(options[0] < options[1])) {
        value2(`[${options[0]}, ${options[1]}] must ascend`);
      }
      return;
    case `items`:
      if (!Array.isArray(options))
        return value2(
          isGrammarRecord(options) && entry.objectHint !== undefined
            ? `${fieldValueRequirement(entry)} — ${entry.objectHint}`
            : fieldValueRequirement(entry),
        );
      if (options.length > entry.max)
        return value2(
          entry.max === 1 &&
            entry.one !== undefined &&
            entry.overHint === undefined
            ? `has ${options.length} entries: one ${entry.one} per chart`
            : `has ${options.length} entries; ${entry.max} allowed${entry.overHint === undefined ? `` : ` — ${entry.overHint}`}`,
        );
      if (options.length < entry.min)
        return value2(
          options.length === 0
            ? `is empty: ${entry.emptyHint ?? `leave the key out`}`
            : fieldValueRequirement(entry),
        );
      options.forEach(
        (
          input?: Dynamic,
          options2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          validateFieldValue(
            entry.item,
            input,
            [...context, options2],
            value,
            extra,
          ),
      );
      return;
    case `variant`: {
      if (!isGrammarRecord(options))
        return value2(
          typeof options == `string` && entry.stringHint !== undefined
            ? `${fieldValueRequirement(entry)} — ${substituteHintValue(entry.stringHint, options)}`
            : fieldValueRequirement(entry),
        );
      let value3: Dynamic = options[entry.key];
      let value4: Dynamic = Object.keys(entry.variants);
      if (value3 === undefined) {
        let value5: Dynamic = `is required — ${value4.map(quoteDefinitionValue).join(` or `)}`;
        return value2(
          typeof options.type == `string` && entry.key === `kind`
            ? `${value5} (this object says type: "${options.type}" — ${ownFieldOrUndefined(entry.hints, options.type) ?? `data marks say type, annotations and labels say kind`})`
            : value5,
          [...context, entry.key],
        );
      }
      if (typeof value3 != `string` || !value4.includes(value3)) {
        let value5: Dynamic =
          typeof value3 == `string`
            ? (ownFieldOrUndefined(entry.hints, value3) ??
              ownFieldOrUndefined(entry.hints, value3.toLowerCase()))
            : undefined;
        return typeof value3 == `string` && entry.notOneOf !== undefined
          ? value2(
              `${JSON.stringify(truncateColumnName(value3))}: ${entry.notOneOf} — ${value5 ?? entry.road ?? `${entry.key} is ${value4.map(quoteDefinitionValue).join(` or `)}`}`,
              [...context, entry.key],
            )
          : value2(
              `must be ${value4.map(quoteDefinitionValue).join(` or `)}${value5 === undefined ? `` : ` — ${value5}`}`,
              [...context, entry.key],
            );
      }
      validateFieldValue(
        entry.variants[value3],
        options,
        context,
        value,
        extra,
      );
      return;
    }
    case `literal`:
      if (!entry.values.includes(options)) {
        let value3: Dynamic =
          ownFieldOrUndefined(entry.hints, String(options)) ??
          ownFieldOrUndefined(entry.hints, String(options).toLowerCase());
        if (entry.refusal !== undefined) {
          let value4: Dynamic = truncateColumnName(
            typeof options == `string`
              ? options
              : (JSON.stringify(options) ?? `undefined`),
          );
          let value5: Dynamic = entry.refusal
            .replaceAll(
              `<shown>`,
              typeof options == `string` ? JSON.stringify(value4) : value4,
            )
            .replaceAll(`<value>`, value4);
          return value2(
            entry.refusal.includes(`<hint>`)
              ? value5.replaceAll(
                  `<hint>`,
                  value3 ?? entry.noHint ?? fieldValueRequirement(entry),
                )
              : value3 === undefined
                ? value5
                : `${value5} — ${value3}`,
          );
        }
        value2(
          value3 === undefined
            ? fieldValueRequirement(entry)
            : `${fieldValueRequirement(entry)} — ${value3}`,
        );
      }
      return;
    case `flag`:
      if (options === false)
        return value2(`is false: write true or leave the key out`);
      if (options !== true) {
        value2(fieldValueRequirement(entry));
      }
      return;
    case `format`:
      validateFormat(options, context, value);
      return;
    case `order`:
      validateOrder(options, context, value);
      return;
    case `count`:
      if (
        typeof options != `number` ||
        !Number.isInteger(options) ||
        options < entry.min ||
        options > entry.max
      ) {
        value2(
          entry.refusal !== undefined &&
            typeof options == `number` &&
            Number.isFinite(options)
            ? entry.refusal
                .replaceAll(`<value>`, String(options))
                .replaceAll(`<min>`, String(entry.min))
                .replaceAll(`<max>`, String(entry.max))
            : fieldValueRequirement(entry),
        );
      }
      return;
    case `group`:
      if (!isGrammarRecord(options))
        return value2(
          typeof options == `string` && entry.stringHint !== undefined
            ? `${fieldValueRequirement(entry)} — ${substituteHintValue(entry.stringHint, options)}`
            : Array.isArray(options)
              ? `${fieldValueRequirement(entry)}, not a list`
              : fieldValueRequirement(entry),
        );
      {
        let value3: Dynamic = formatBareDefinitionPath(context);
        let filtered: Dynamic = Object.keys(options).filter(
          (input?: Dynamic, ..._extraArguments: unknown[]) =>
            !Object.hasOwn(entry.fields, input),
        );
        let value4: Dynamic =
          extra.tileChart === true && entry.tileKeySentences !== undefined
            ? {
                ...entry.keySentences,
                ...entry.tileKeySentences,
              }
            : entry.keySentences;
        let filtered2: Dynamic = filtered.filter(
          (input?: Dynamic, ..._extraArguments: unknown[]) =>
            ownFieldOrUndefined(value4, input) !== undefined,
        );
        for (let value6 of filtered2.toSorted() as Dynamic) {
          let value7: Dynamic = value4[value6];
          value.push({
            path: value7.atObject ? context : [...context, value6],
            message: value7.message,
            ...(value7.statement
              ? {
                  statement: value7.statement,
                }
              : {}),
          });
        }
        let filtered3: Dynamic = filtered.filter(
          (input?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            !filtered2.includes(input) &&
            ownFieldOrUndefined(entry.wrongKeys, input) !== undefined,
        );
        for (let value6 of filtered3.toSorted() as Dynamic)
          value2(
            ownFieldOrUndefined(entry.wrongKeys, value6).replaceAll(
              `<owner>`,
              value3,
            ),
            [...context, value6],
          );
        let filtered4: Dynamic = filtered.filter(
          (input?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            !filtered2.includes(input) && !filtered3.includes(input),
        );
        let value5: Dynamic =
          extra.tileChart === true && entry.tileHints !== undefined
            ? {
                ...entry.hints,
                ...entry.tileHints,
              }
            : entry.hints;
        if (filtered4.length > 0)
          if (entry.strayKey !== undefined) {
            let value6: Dynamic = filtered4.toSorted();
            for (let value7 of value6.slice(0, 3) as Dynamic) {
              let value8: Dynamic = ownFieldOrUndefined(value5, value7);
              value2(
                value8 === undefined
                  ? entry.strayKey
                  : `${entry.strayKey} — ${value8}`,
                [...context, value7],
              );
            }
            if (value6.length > 3) {
              value2(
                (
                  entry.strayKeysMore ?? `carries <n> more unknown keys`
                ).replaceAll(`<n>`, formatIntegerCount(value6.length - 3)),
              );
            }
          } else
            value2(
              unknownKeysProblem(
                filtered4,
                objectFieldsRequirement(entry, context),
                value5,
              ),
            );
        for (let value6 of (entry.required ?? []) as Dynamic)
          if (
            !Object.hasOwn(options, value6) ||
            options[value6] === undefined
          ) {
            let value7: Dynamic = ownFieldOrUndefined(
              entry.requiredHints,
              value6,
            );
            value2(
              value7 === undefined
                ? requiredFieldMessage(entry.fields[value6], value6)
                : `is required — ${value7.replaceAll(`<owner>`, value3)}`,
              [...context, value6],
            );
          }
      }
      {
        let value3: Dynamic =
          typeof options.type == `string`
            ? {
                ...extra,
                ownerType: options.type,
              }
            : extra;
        for (let [value4, value5] of Object.entries(entry.fields) as Dynamic) {
          let value6: Dynamic = Object.hasOwn(options, value4)
            ? options[value4]
            : undefined;
          if (value6 !== undefined) {
            validateFieldValue(
              value5,
              value6,
              [...context, value4],
              value,
              value3,
            );
          }
        }
      }
      return;
  }
}
var objectFieldsRequirement = (
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) => {
  let value: Dynamic = options[options.length - 1];
  return `${input.noun ?? (typeof value == `string` ? value : `this object`)} takes ${Object.keys(input.fields).join(`, `)}`;
};
var requiredFieldMessage: Dynamic = (
  entry?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  options === `kind` && entry.kind === `literal`
    ? chartGrammarMessage
    : `is required — ${fieldValueRequirement(entry)}`;
var formatDefinitionPath: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  input
    .map((input2?: Dynamic, ..._extraArguments: unknown[]) =>
      typeof input2 == `number` ? `[${input2}]` : `.${input2}`,
    )
    .join(``);
var formatBareDefinitionPath: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => formatDefinitionPath(input).replace(/^\./, ``);
function validateChartDefinition(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = findUnsupportedVisualizeFeature(input, `chart`);
  if (value !== null)
    return [
      {
        path: [...options, ...value.path],
        message: value.message,
      },
    ];
  let items: Dynamic = [];
  let marks: Dynamic = input.marks;
  let value2: Dynamic =
    Array.isArray(marks) &&
    marks.some(
      (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        isGrammarRecord(input2) && input2.type === `tile`,
    );
  let value3: Dynamic = value2
    ? {
        ...context,
        tileChart: value2,
      }
    : context;
  validateFieldValue(ChartGrammarChart3, input, options, items, value3);
  if (items.length > 0) return items;
  for (let value4 of chartSemanticProblems(input, value3) as Dynamic)
    items.push({
      ...value4,
      path: [...options, ...value4.path],
    });
  return items;
}
var chartTierOverrides: Dynamic = {};
function registerChartTierOverride(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  chartTierOverrides[input] = options;
}
var markHasNoSplit: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  input.type !== `tile` &&
  input.group === undefined &&
  input.stack === undefined;
function markTitleOf(input?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
  if (input.title !== undefined) return input.title;
  let y2: Dynamic = input.y;
  return Array.isArray(y2) ? (y2[1] ?? ``) : (y2 ?? ``);
}
function chartSemanticProblems(
  input?: Dynamic,
  options: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  let value: Dynamic = primaryXAxis(input);
  let value2: Dynamic = value?.type;
  let items2: Dynamic = [`axes`, `x`, 0];
  let items3: Dynamic = [`axes`, `y`, 0];
  let value3: Dynamic = primaryYAxis(input);
  let value4: Dynamic = input.axes?.y?.[0];
  let value5: Dynamic = secondaryYAxis(input);
  let value6: Dynamic = input.marks ?? [];
  let value7: Dynamic = (
    input2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => [`marks`, input2];
  let value8 = (input2?: Dynamic, ..._extraArguments: unknown[]) =>
    `marks[${input2}]`;
  let value9: Dynamic = (
    input2?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => input2.type;
  let value10: Dynamic = value6.some(
    (input2?: Dynamic, ..._extraArguments: unknown[]) =>
      value9(input2) === `tile`,
  );
  let value11: Dynamic =
    options.repeats === true || input.columns !== undefined;
  let value12: Dynamic = value6.flatMap(
    (
      input2?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => (yAxisIndex(input2) === 1 ? [options2] : []),
  );
  let value13: Dynamic =
    value5 !== undefined &&
    !value10 &&
    input.columns === undefined &&
    input.orient !== `horizontal`;
  if (input.source === undefined && options.enclosingSource === undefined) {
    let index6: Dynamic = value6.findIndex(
      (input2?: Dynamic, ..._extraArguments: unknown[]) =>
        input2.source === undefined,
    );
    let index7: Dynamic = (input.annotations ?? []).findIndex(
      (input2?: Dynamic, ..._extraArguments: unknown[]) =>
        input2.source === undefined,
    );
    if (index6 >= 0 || index7 >= 0 || value6.length === 0) {
      items.push({
        path: [`source`],
        message: `is required — ${index6 >= 0 ? `marks[${index6}]` : index7 >= 0 ? `annotations[${index7}]` : `the chart`} names no source of its own: write source: "${options.sourceNames?.[0] ?? `<sources key>`}" on the chart (every mark and annotation reads it unless it names another)`,
      });
    }
  }
  let index: Dynamic = value6.findIndex(
    (input2?: Dynamic, ..._extraArguments: unknown[]) => input2.type === `tile`,
  );
  let index2: Dynamic = value6.findIndex(
    (input2?: Dynamic, ..._extraArguments: unknown[]) =>
      input2.size !== undefined,
  );
  let index3: Dynamic = value6.findIndex(
    (input2?: Dynamic, ..._extraArguments: unknown[]) =>
      input2.stack !== undefined,
  );
  let index4: Dynamic = value6.findIndex(
    (input2?: Dynamic, ..._extraArguments: unknown[]) =>
      input2.hatch !== undefined,
  );
  let index5: Dynamic = value6.findIndex(
    (input2?: Dynamic, ..._extraArguments: unknown[]) =>
      input2.dash !== undefined,
  );
  value6.forEach(
    (
      input2?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let value15: Dynamic = value7(options2);
      if (
        input2.title !== undefined &&
        (input2.group !== undefined || input2.stack !== undefined)
      ) {
        items.push({
          path: [...value15, `title`],
          message: `on ${value8(options2)}: a mark coloured by group or stack is named by its split values — title the split (group.title / stack.title) instead`,
        });
      }
      if (index >= 0 && input2.type !== `tile`) {
        items.push({
          path: [...value15, `type`],
          message: `is "${input2.type}" beside ${value8(index)}, a tile — a tile chart holds only tiles`,
        });
      }
      if (index >= 0 && input2.type === `tile` && options2 > index) {
        items.push({
          path: [...value15],
          message: `is a second tile beside ${value8(index)} — a tile chart holds ONE tile mark: one grid per picture`,
        });
      }
      if (
        Array.isArray(input2.y) &&
        (input2.type === `bar` || input2.type === `area`)
      ) {
        if (input2.y[0] === input2.y[1]) {
          items.push({
            path: [...value15, `y`],
            message: `pairs "${input2.y[0]}" with itself — a [from, to] pair names two columns`,
          });
        } else {
          if (input2.stack !== undefined) {
            items.push({
              path: [...value15, `stack`],
              message: `meets a [from, to] y — ${value8(options2)}: a floating ${input2.type === `bar` ? `bar` : `band`} is placed by its pair — drop stack`,
            });
          }
        }
      }
      if (input2.size !== undefined && options2 > index2) {
        items.push({
          path: [...value15, `size`],
          message: `on ${value8(options2)}: one size legend per picture — draw the other measure in a second Visualize`,
        });
      }
      if (input2.stack !== undefined && options2 > index3) {
        items.push({
          path: [...value15, `stack`],
          message: `on ${value8(options2)}: one stack per chart — union the measures under one column in the query and stack by it, or draw the second in a second Visualize on the same x`,
        });
      }
      if (input2.hatch !== undefined && options2 > index4) {
        let by: Dynamic = value6[index4].hatch.by;
        if (input2.hatch.by !== by) {
          items.push({
            path: [...value15, `hatch`, `by`],
            message: `${input2.hatch.by}: bars in one chart hatch by ONE column (${value8(index4)} hatches by ${by}) — hatch every bar by ${by}, or facet the second split`,
          });
        }
      }
      if (input2.dash !== undefined && options2 > index5) {
        let by: Dynamic = value6[index5].dash.by;
        if (input2.dash.by !== by) {
          items.push({
            path: [...value15, `dash`, `by`],
            message: `${input2.dash.by}: lines in one chart dash by ONE column (${value8(index5)} dashes by ${by}) — dash every line by ${by}, or facet the second split`,
          });
        }
      }
      for (let value16 of [`group`, `stack`] as Dynamic) {
        let value17: Dynamic = input2[value16]?.by;
        if (value17 === undefined) continue;
        let index6: Dynamic = value6.findIndex(
          (
            input3?: Dynamic,
            options3?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            options3 < options2 &&
            input3.type === input2.type &&
            input3[value16]?.by === value17,
        );
        if (index6 >= 0) {
          items.push({
            path: [...value15, value16, `by`],
            message: `${value17}: ${value8(index6)} already draws ${input2.type}s ${value16 === `group` ? `coloured` : `stacked`} by ${value17} — union the two measures under one column in the query${ChartGrammarBar3[value9(input2)] ?? ``}, facet by it, or draw the second measure in a second Visualize on the same x`,
          });
        }
      }
      if (
        input2.whisker !== undefined &&
        input2.whisker[0] === input2.whisker[1]
      ) {
        items.push({
          path: [...value15, `whisker`],
          message: `pairs "${input2.whisker[0]}" with itself — a whisker names two columns, low then high`,
        });
      }
      if (input2.group !== undefined && input2.stack !== undefined) {
        items.push({
          path: [...value15, `stack`],
          message: `meets group — two colour splits on ${value8(options2)}: make the inner one hatch`,
        });
      }
      for (let [value16, value17, value18] of [
        [`group`, 8, `colours`],
        [`stack`, 8, `colours`],
        [`hatch`, 3, `patterns`],
        [`dash`, 4, `patterns`],
      ] as Dynamic) {
        let value19: Dynamic = explicitOrderValues(input2[value16]?.order);
        if (value19.length > value17) {
          items.push({
            path: [...value15, value16, `order`],
            message: `lists ${value19.length} values; ${value17} ${value18} allowed — bucket in the query or facet by the column`,
          });
        }
      }
      if (input2.tone !== undefined) {
        let value16: Dynamic =
          input2.group === undefined
            ? input2.stack === undefined
              ? undefined
              : `stack`
            : `group`;
        if (value16 === undefined) {
          if (Array.isArray(input2.y) && input2.tone.column === undefined) {
            items.push({
              path: [...value15, `tone`, `column`],
              message: `is required — tone on ${value8(options2)} needs column: y is a pair`,
            });
          }
        } else {
          items.push({
            path: [...value15, `tone`],
            message: `meets ${value16} — ${value8(options2)} has ${value16} and tone: colour can say one thing`,
          });
        }
      }
      if (input2.type === `tile`) {
        let value16: Dynamic = input2.labels ?? [];
        if (value16.length > 1) {
          items.push({
            path: [...value15, `labels`, 1],
            message: `a tile prints one value per cell`,
            statement: true,
          });
        }
        value16.forEach(
          (
            entry?: Dynamic,
            options3?: Dynamic,
            ..._extraArguments: unknown[]
          ): undefined => {
            if (entry.kind === `text`) {
              items.push({
                path: [...value15, `labels`, options3],
                message: `is a text label: a tile's label names a column`,
              });
            } else {
              if (entry.tone !== undefined) {
                items.push({
                  path: [...value15, `labels`, options3, `tone`],
                  message: `a tile's shade already encodes the value`,
                  statement: true,
                });
              }
            }
          },
        );
      }
    },
  );
  {
    let items4: Dynamic = [];
    let items5: Dynamic = [];
    let values: Dynamic = new (Set as Dynamic)();
    value6.forEach(
      (
        input2?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (input2.type === `tile`) return;
        let value15: Dynamic = markTitleOf({
          y: input2.y,
        });
        let value16: Dynamic = input2.source ?? input.source ?? ``;
        let value17: Dynamic = yAxisIndex(input2);
        let value18: Dynamic = value13
          ? items5.find(
              (input3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                input3.source === value16 &&
                input3.column === value15 &&
                input3.axis !== value17,
            )
          : undefined;
        items5.push({
          i: options2,
          source: value16,
          column: value15,
          axis: value17,
        });
        if (value18 !== undefined) {
          let [value20, value21]: Dynamic =
            value17 === 1 ? [options2, value18.i] : [value18.i, options2];
          if (!values.has(value20)) {
            values.add(value20);
            items.push({
              path: [...value7(value20), `axis`],
              message: `is 1 while ${value8(value21)} draws the same column "${value15}" on axis 0 — one measure, one axis: drop this mark, or give it its own column`,
            });
          }
          if (markHasNoSplit(input2)) {
            items4.push({
              name: markTitleOf(input2),
              i: options2,
              type: input2.type,
              column: value15,
            });
          }
          return;
        }
        if (!markHasNoSplit(input2)) return;
        let value19: Dynamic = markTitleOf(input2);
        let match: Dynamic = items4.find(
          (input3?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            input3.name === value19 &&
            (input3.type === input2.type || input3.column !== value15),
        );
        if (match === undefined) {
          items4.push({
            name: value19,
            i: options2,
            type: input2.type,
            column: value15,
          });
        } else {
          items.push({
            path: value7(options2),
            message: `is named "${value19}" like ${value8(match.i)} — title one of them`,
          });
        }
      },
    );
  }
  {
    let filtered: Dynamic = value6
      .map(
        (
          input2?: Dynamic,
          options2?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic => ({
          m: input2,
          i: options2,
        }),
      )
      .filter(
        ({ m: m2 }: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          ((m2.type === `bar` || m2.type === `area`) && !Array.isArray(m2.y)) ||
          (m2.stack !== undefined && (m2.type === `bar` || m2.type === `area`)),
      );
    let value15 = (input2?: Dynamic, ..._extraArguments: unknown[]) =>
      `${input2.type}s`;
    let items4: Dynamic = [
      [0, value3, value4],
      ...(value13 && value5 !== undefined ? [[1, value5, value5]] : []),
    ];
    for (let [value16, value17, value18] of items4 as Dynamic) {
      let items5: Dynamic = [`axes`, `y`, value16];
      let type: Dynamic = value17.type;
      let filtered2: Dynamic = filtered.filter(
        ({ m: m2 }: Dynamic, ..._extraArguments: unknown[]) =>
          yAxisIndex(m2) === value16,
      );
      if (value10 && value18 !== undefined) {
        for (let value19 of [`type`, `format`, `min`, `max`, `free`] as Dynamic)
          if (value18[value19] !== undefined) {
            items.push({
              path: [...items5, value19],
              message: `a tile chart's y lists categories`,
              statement: true,
            });
          }
      } else {
        if (
          value17.min !== undefined &&
          value17.max !== undefined &&
          !(value17.min < value17.max)
        ) {
          items.push({
            path: items5,
            message: `min ${value17.min} is not below max ${value17.max}`,
            statement: true,
          });
        }
        if (type === `log`) {
          for (let value19 of [`min`, `max`] as Dynamic)
            if (value17[value19] !== undefined && value17[value19] <= 0) {
              items.push({
                path: [...items5, value19],
                message: `${value17[value19]} on a log axis: no zero on a log scale`,
              });
            }
          for (let { m: m2, i: i2 } of filtered2 as Dynamic)
            items.push({
              path: value7(i2),
              message: `is ${m2.stack === undefined ? (m2.type === `area` ? `an area` : `a bar`) : `a stacked ${m2.type}`} on a log y: ${m2.type === `area` ? `areas` : `bars`} rise from zero; a log axis has no zero`,
            });
        } else if (filtered2.length > 0) {
          let m2: Dynamic = filtered2[0].m;
          if (value17.min !== undefined && value17.min > 0) {
            items.push({
              path: [...items5, `min`],
              message: `${value17.min} under ${value15(m2)}: ${m2.type === `area` ? `areas` : `bars`} rise from zero`,
            });
          }
          if (value17.max !== undefined && value17.max < 0) {
            items.push({
              path: [...items5, `max`],
              message: `${value17.max} over ${value15(m2)}: ${m2.type === `area` ? `areas` : `bars`} rise from zero`,
            });
          }
        }
        if (value17.format !== undefined && value17.format.kind === `time`) {
          items.push({
            path: [...items5, `format`],
            message: `is a date format ({"kind": "time"}) but a y axis is a measure — dates run along x (axes.x[0] with type: "time")`,
          });
        }
        if (value17.free === true) {
          let filtered3: Dynamic = [`min`, `max`].filter(
            (input2?: Dynamic, ..._extraArguments: unknown[]) =>
              value17[input2] !== undefined,
          );
          if (filtered3.length > 0) {
            items.push({
              path: items5,
              message: `has ${filtered3.join(` and `)} and free: a free scale cannot be pinned`,
            });
          } else {
            if (!value11) {
              items.push({
                path: [...items5, `free`],
                message: `nothing repeats — free belongs to a facet panel or a table's chart cell`,
                statement: true,
              });
            }
          }
        }
      }
    }
  }
  if (value5 === undefined) {
    let value15: Dynamic = value12[0];
    if (value15 !== undefined) {
      items.push({
        path: [...value7(value15), `axis`],
        message:
          options.cell === true
            ? `is 1 in a table's chart cell — a compact cell draws one y axis: draw the two-unit chart as its own Visualize beside the table`
            : input.columns === undefined
              ? input.orient === `horizontal`
                ? `is 1 with orient horizontal — a turned chart has one value axis: drop axis, or keep the chart upright and add the second y entry`
                : `is 1 without axes.y[1] — a second unit is a second y entry: "y": [{"title": "…", "format": {…}}, {"side": "after", "title": "…", "format": {…}}]; or drop axis`
              : `is 1 beside columns — not yet: facet panels with two y axes; drop axis, or drop columns and add the second y entry`,
      });
    }
  } else if (value10)
    items.push({
      path: [`axes`, `y`, 1],
      message: `a tile chart's y lists categories — one entry`,
      statement: true,
    });
  else if (input.columns !== undefined)
    items.push({
      path: [`columns`],
      message: `with two y axes: not yet — drop columns, or facet one unit: drop axes.y[1] and its axis: 1`,
    });
  else if (value13) {
    let value15: Dynamic = value4 ?? {};
    if (value15.side === `after` && value5.side !== `after`) {
      items.push({
        path: [`axes`, `y`, 0, `side`],
        message: `is "after" while axes.y[1] is not — entries run left, right: side: "after" goes on the second entry`,
      });
    } else {
      if (value5.side === undefined) {
        items.push({
          path: [`axes`, `y`, 1, `side`],
          message: `is required — the second y entry is the axis on the right: side: "after"`,
        });
      } else {
        if (value5.side === `after`) {
          if (value15.side === `after`) {
            items.push({
              path: [`axes`, `y`, 0, `side`],
              message: `is "after" beside axes.y[1] — with two entries the first stays left: drop side`,
            });
          }
        } else {
          items.push({
            path: [`axes`, `y`, 1, `side`],
            message: `is ${JSON.stringify(value5.side)}: the second y entry is the axis on the right — side: "after"`,
          });
        }
      }
    }
    if (value12.length === 0) {
      items.push({
        path: [`axes`, `y`, 1],
        message: `no mark is on it — write axis: 1 on the mark in its unit, or drop the entry`,
        statement: true,
      });
    } else {
      if (value12.length === value6.length) {
        items.push({
          path: [`axes`, `y`, 0],
          message: `no mark is on it: every mark says axis: 1 — drop axis and the second entry; a lone y axis on the right is side: "after"`,
          statement: true,
        });
      }
    }
    {
      let filtered: Dynamic = value6
        .map(
          (
            input2?: Dynamic,
            options2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic => ({
            m: input2,
            i: options2,
          }),
        )
        .filter(
          ({ m: m2 }: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            m2.type === `bar` || (m2.type === `area` && !Array.isArray(m2.y)),
        );
      let match: Dynamic = filtered.find(
        ({ m: m2 }: Dynamic, ..._extraArguments: unknown[]) =>
          yAxisIndex(m2) === 0,
      );
      let match2: Dynamic = filtered.find(
        ({ m: m2 }: Dynamic, ..._extraArguments: unknown[]) =>
          yAxisIndex(m2) === 1,
      );
      if (match !== undefined && match2 !== undefined) {
        let value16: Dynamic =
          match.m.type === `bar`
            ? `bars`
            : match.m.stack === undefined
              ? `areas`
              : `a stacked area`;
        items.push({
          path: [...value7(match2.i), `axis`],
          message: `is 1 beside ${value8(match.i)}, ${value16} on axis 0 — bars and areas rise from one zero line: keep every bar and area on one axis and draw the other unit as a line or points`,
        });
      }
    }
    let index6: Dynamic = [value15, value5].findIndex(
      (input2?: Dynamic, ..._extraArguments: unknown[]) =>
        input2.title === undefined,
    );
    if (index6 >= 0) {
      items.push({
        path: [`axes`, `y`, index6, `title`],
        message: `is required — with two y axes each title names its measure ("Temperature", "Snowfall"); the unit rides format`,
      });
    }
    if (value15.format?.kind !== `time` && value5.format?.kind !== `time`) {
      let value16: Dynamic = (
        entry?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        if (entry === undefined || entry.kind !== `number`)
          return [``, ``, false];
        let value17: Dynamic = validateNumberFormat(entry.spec ?? `,`);
        let value18: Dynamic =
          value17.ok &&
          value17.format.kind === `number` &&
          value17.format.type === `%`;
        return [
          (entry.prefix ?? ``).trim(),
          (entry.suffix ?? ``).trim(),
          value18,
        ];
      };
      let [items4, items5]: Dynamic = [
        value16(value15.format),
        value16(value5.format),
      ];
      if (
        items4[0] === items5[0] &&
        items4[1] === items5[1] &&
        items4[2] === items5[2]
      ) {
        items.push({
          path:
            value5.format === undefined
              ? [`axes`, `y`, 1]
              : [`axes`, `y`, 1, `format`],
          message: `prints numbers like axes.y[0] (same prefix, suffix and %) — two y axes are two units: give one a unit the other lacks in format (prefix "$", suffix " cm", spec ".0%"), or keep to one y axis`,
        });
      }
    }
  }
  if (value !== undefined) {
    let value15: Dynamic = value2;
    let value16: Dynamic = `format` in value ? value.format : undefined;
    if (value16 !== undefined) {
      let kind: Dynamic = value16.kind;
      if (kind === `time` && value15 !== `time`) {
        items.push({
          path: [...items2, `format`],
          message: `is a date format ({"kind": "time"}) but axes.x[0].type is "${value15}" — date formats need type: "time"`,
        });
      } else {
        if (kind !== `time` && value15 === `time`) {
          items.push({
            path: [...items2, `format`],
            message: `is a ${kind} format but axes.x[0].type is "time" — dates are {"kind": "time", "spec": "%b %Y"}`,
          });
        }
      }
    }
    let value17: Dynamic =
      value.type === `band` ? explicitOrderValues(value.order) : [];
    if (value17.length > 120) {
      items.push({
        path: [...items2, `order`],
        message: `lists ${value17.length} values; 120 slots allowed — filter or bucket in the query`,
      });
    }
    let value18: Dynamic = value.type === `time` ? value.period : undefined;
    if (
      !(value15 === `band` || (value15 === `time` && value18 !== undefined))
    ) {
      let index6: Dynamic = value6.findIndex(
        (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
          value9(input2) === `bar` ||
          value9(input2) === `tile` ||
          (input2.type === `area` && input2.stack !== undefined),
      );
      if (index6 >= 0) {
        let value19: Dynamic = value6[index6];
        items.push({
          path: [...items2, `type`],
          message:
            value19.type === `area`
              ? `"${value15}": stack on ${value8(index6)}: a stacked area needs slots — use type band or set period`
              : `"${value15}" under ${value8(index6)} (${value9(value19)}): ${value9(value19) === `tile` ? `tiles` : `bars`} need slots: use type band or set period`,
        });
      }
    }
  }
  if (input.orient === `horizontal`) {
    let index6: Dynamic = value6.findIndex(
      (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        value9(input2) !== `bar` && value9(input2) !== `point`,
    );
    if (index6 >= 0) {
      let value15: Dynamic = value9(value6[index6]);
      items.push({
        path: [`orient`],
        message: `horizontal with ${value15 === `area` ? `an` : `a`} ${value15} mark: ${value15 === `line` ? `lines run left to right` : value15 === `area` ? `areas run left to right` : `tiles keep x across and y down`} — keep the chart upright`,
      });
    } else if (value2 !== undefined && value2 !== `band`) {
      items.push({
        path: [`orient`],
        message: `horizontal on a ${value2} axis: a turned chart runs band categories down the left — use type band, or keep the chart upright`,
      });
    } else {
      if (input.columns === undefined) {
        if (value5 !== undefined) {
          items.push({
            path: [`orient`],
            message: `horizontal with two y axes: a turned chart has one value axis along the bottom — keep the chart upright, or drop axes.y[1] and its axis: 1`,
          });
        }
      } else {
        items.push({
          path: [`orient`],
          message: `beside columns: facet panels stay upright — one turned chart per value is several Visualize in the widget, each over its own filtered source`,
        });
      }
    }
    for (let [value15, value16] of [
      [items2, value],
      [items3, value4],
    ] as Dynamic)
      if (value16 !== undefined && value16.side !== undefined) {
        items.push({
          path: [...value15, `side`],
          message: `with orient horizontal: not yet — the turned chart keeps band left, values bottom`,
        });
      }
  }
  let value14: Dynamic = input.columns?.[0];
  if (input.wrap !== undefined && value14 === undefined) {
    items.push({
      path: [`wrap`],
      message: `without columns: wrap folds facet panels`,
    });
  }
  if (value14 !== undefined) {
    let value15: Dynamic = explicitOrderValues(value14.order);
    if (value15.length > 24) {
      items.push({
        path: [`columns`, 0, `order`],
        message: `lists ${value15.length} values; 24 panels allowed — filter or bucket in the query`,
      });
    }
    if (input.source === undefined && options.enclosingSource === undefined) {
      items.push({
        path: [`source`],
        message: `is required — columns[0].by ${value14.by}: a facet reads the chart's source — write source`,
      });
    }
    lowerChartMarks(input).forEach(
      (
        input2?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (input2.color !== undefined && input2.color === value14.by) {
          items.push({
            path: [`columns`, 0, `by`],
            message: `"${value14.by}" already splits ${value8(options2)} — faceting by the same column draws one single-colour panel per series; facet by a different column or drop the split`,
          });
        }
      },
    );
  }
  (input.annotations ?? []).forEach(
    (
      entry?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let items4: Dynamic = [`annotations`, options2];
      if (value10 && entry.axis === `y`) {
        items.push({
          path: [...items4, `axis`],
          message: `y on a tile chart: the y lists categories — draw the level in a chart below`,
        });
      }
      if (
        entry.kind === `span` &&
        entry.range !== undefined &&
        entry.range[0] === entry.range[1]
      ) {
        items.push({
          path: [...items4, `range`],
          message: `pairs "${entry.range[0]}" with itself — a span runs between two columns (from, to)`,
        });
      }
    },
  );
  return items;
}
var lowerFormatDefinition: Dynamic = (
  entry?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => {
  let state: Dynamic = {
    format: undefined,
    prefix: undefined,
    suffix: undefined,
  };
  if (entry === undefined) return state;
  if (entry.kind === `time`) {
    let value2: Dynamic = parseTimeFormat(entry.spec);
    return value2.ok
      ? {
          ...state,
          format: value2.format,
        }
      : state;
  }
  let value: Dynamic = validateNumberFormat(entry.spec ?? `,`);
  return value.ok
    ? {
        format: value.format,
        prefix: entry.prefix,
        suffix: entry.suffix,
      }
    : state;
};
var statGrammarLimit40: Dynamic = 40;
var statGrammarLimit200: Dynamic = 200;
var statGrammarLimit2002: Dynamic = 200;
var statGrammarMessage: Dynamic = `is required — a figure names its metric ("DAU", "Open P0s"); a date or a basis beside it is a label`;
var statTitleLengthProblem = (input?: Dynamic, ..._extraArguments: unknown[]) =>
  `is ${input} characters; ${statGrammarLimit40} allowed — ${chartGrammarSayTheRestInTheNote}`;
var statGrammarMessage2: Dynamic = `is empty — a figure names its metric ("DAU", "Open P0s")`;
var statGrammarMessage3: Dynamic = `must be "stat" — one figure (a chart is kind "chart"; figures side by side are cells of kind "table")`;
var statGrammarMessage4: Dynamic = `must be a source name (a string)`;
var statGrammarMessage5: Dynamic = `a source name is a plain identifier: letters, digits, underscore, not starting with a digit`;
var statGrammarNamesStartingWithChartsAreReserved: Dynamic = `names starting with __charts are reserved`;
var statGrammarMessage6: Dynamic = `is required — nothing encloses this stat, so it names the source whose one row it reads: source: "<sources key>"`;
var statGrammarMessage7: Dynamic = `is required — neither this cell nor its table names a source: write source: "<sources key>" on the cell, or once on the table for every cell`;
var unknownSourceProblem = (
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) =>
  `"${input}" is not one of this chart's sources — available: ${options.length > 0 ? options.join(`, `) : `(none)`}`;
var statGrammarStyles: Dynamic = `must be a list of 1 to 3 changes: [{"column": "<column holding the change>"}, …]`;
var statGrammarStyles2: Dynamic = `one change is still a list: deltas: [{"column": …}]`;
var statGrammarMessage8: Dynamic = `is empty — leave the key out, or list 1 to 3 changes`;
var tooManyStatDeltasProblem = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
) =>
  `has ${input} entries; 3 allowed — more comparisons are a chart beside the figure`;
var statGrammarStyles3: Dynamic = `words are a text label in the list: labels: [{"kind": "text", "text": "<value>"}]`;
var statGrammarTheValueIsColumn: Dynamic = `the value is column`;
var statGrammarMessage9: Dynamic = `a stat's name is title ("DAU", "Open P0s")`;
var statGrammarAShortLineUnderTheFigureIsNote: Dynamic = `a short line under the figure is note`;
var statGrammarStyles4: Dynamic = `deltas is a list: deltas: [{"column": "<column holding the change>"}] — computed in the query`;
var statGrammarStyles5: Dynamic = `an as-of date is a column label: labels: [{"kind": "column", "column": "<date column>", "format": {"kind": "time", "spec": "%b %-d"}}] — printed under the value ("as of Aug 23")`;
var statGrammarStyles6: Dynamic = `words beside the title are a text label: labels: [{"kind": "text", "text": "…"}]`;
var statGrammarStyles7: Dynamic = `the words printed under the value are labels: labels: [{"kind": "text", "text": "as of"}, {"kind": "column", "column": "<date column>", "format": {"kind": "time", "spec": "%b %-d"}}] (up to two)`;
var StatGrammarData: Dynamic = `a judgement colour is tone: ${chartGrammarStyles3} — a number against cutoffs; there are no tone words and no colours`;
var statGrammarStyles8: Dynamic = `units ride format: {"kind": "number", "suffix": " ms"}`;
var statGrammarMessage10: Dynamic = `the widget computes nothing — put the comparison in a column and list it in deltas`;
var statGrammarMessage11: Dynamic = `NO aggregation in a stat — compute it in the query; the figure shows its one row's value`;
var statGrammarMessage12: Dynamic = `the figure reads its source's ONE row — select it in the query (WHERE … / LIMIT 1); two or more rows are refused`;
var statGrammarMessage13: Dynamic = `one figure per stat — several side by side are cells of kind "table"`;
var statGrammarMessage14: Dynamic = `a stat has no axes or marks — a chart is kind "chart"`;
var statGrammarMessage15: Dynamic = `a trend is a compact chart: a kind "chart" cell beside the figure in a kind "table"`;
var statGrammarMessage16: Dynamic = `the table a stat reads is source: "<sources key>"`;
var statGrammarMessage17: Dynamic = `figures carry no links or icons — link from the doc's prose`;
var statGrammarMessage18: Dynamic = `a figure sizes to its slot — drop it`;
var StatGrammarData2: Dynamic = `good or bad is tone: ${chartGrammarStyles3} — a number judged against cutoffs (default [0], the sign; reverse: true when lower is better)`;
var StatGrammarField: Dynamic = {
  field: statGrammarTheValueIsColumn,
  value: statGrammarTheValueIsColumn,
  metric: statGrammarTheValueIsColumn,
  measure: statGrammarTheValueIsColumn,
  number: statGrammarTheValueIsColumn,
  key: statGrammarTheValueIsColumn,
  label: statGrammarMessage9,
  name: statGrammarMessage9,
  heading: statGrammarMessage9,
  header: statGrammarMessage9,
  text: statGrammarStyles6,
  caption: statGrammarStyles7,
  subtitle: statGrammarAShortLineUnderTheFigureIsNote,
  description: statGrammarAShortLineUnderTheFigureIsNote,
  desc: statGrammarAShortLineUnderTheFigureIsNote,
  footnote: statGrammarAShortLineUnderTheFigureIsNote,
  comment: statGrammarAShortLineUnderTheFigureIsNote,
  notes: statGrammarAShortLineUnderTheFigureIsNote,
  detail: statGrammarAShortLineUnderTheFigureIsNote,
  delta: statGrammarStyles4,
  change: statGrammarStyles4,
  changes: statGrammarStyles4,
  diff: statGrammarStyles4,
  difference: statGrammarStyles4,
  delta_pct: statGrammarStyles4,
  deltaPct: statGrammarStyles4,
  pct_change: statGrammarStyles4,
  comparisons: statGrammarStyles4,
  compare: statGrammarMessage10,
  comparison: statGrammarMessage10,
  previous: statGrammarMessage10,
  prior: statGrammarMessage10,
  baseline: statGrammarMessage10,
  target: statGrammarMessage10,
  goal: statGrammarMessage10,
  vs: statGrammarMessage10,
  asof: statGrammarStyles5,
  asOf: statGrammarStyles5,
  as_of: statGrammarStyles5,
  asof_date: statGrammarStyles5,
  updated: statGrammarStyles5,
  updatedAt: statGrammarStyles5,
  updated_at: statGrammarStyles5,
  timestamp: statGrammarStyles5,
  date: statGrammarStyles5,
  period: statGrammarStyles5,
  when: statGrammarStyles5,
  latest: statGrammarStyles5,
  through: statGrammarStyles5,
  color: StatGrammarData,
  colour: StatGrammarData,
  status: StatGrammarData,
  sentiment: StatGrammarData,
  direction: StatGrammarData2,
  invert: `lower-is-better is tone: {"reverse": true}`,
  reverse: `lower-is-better is tone: {"reverse": true}`,
  good: StatGrammarData2,
  bad: StatGrammarData2,
  x: statGrammarMessage14,
  y: statGrammarMessage14,
  marks: statGrammarMessage14,
  axes: statGrammarMessage14,
  annotations: statGrammarMessage14,
  scales: statGrammarMessage14,
  legend: statGrammarMessage14,
  orient: statGrammarMessage14,
  panes: statGrammarMessage14,
  facet: `one figure per slice is a table: kind "table", rows: [{"by": "<column>"}], cells: [{"kind": "stat", …}]`,
  rows: `rows slice a kind "table" — a stat reads the one row of its source`,
  columns: `columns slice a kind "table" into header bands — a stat is one figure`,
  cells: `cells sit on kind "table" — a stat is one cell of it`,
  wrap: `wrap folds a chart's facet columns — a stat has none`,
  unit: statGrammarStyles8,
  units: statGrammarStyles8,
  prefix: statGrammarStyles8,
  suffix: statGrammarStyles8,
  currency: `a currency mark is a prefix: format: {"kind": "number", "prefix": "$", "spec": "~s"}`,
  percent: `a percent is format: {"kind": "number", "spec": ".1%"} over a 0–1 share column`,
  precision: `precision is spelled in format: {"kind": "number", "spec": ".1f"}`,
  decimals: `precision is spelled in format: {"kind": "number", "spec": ".1f"}`,
  numberFormat: `write format`,
  fmt: `write format`,
  sparkline: statGrammarMessage15,
  trend: statGrammarMessage15,
  series: statGrammarMessage15,
  history: statGrammarMessage15,
  chart: statGrammarMessage15,
  agg: statGrammarMessage11,
  aggregate: statGrammarMessage11,
  aggregation: statGrammarMessage11,
  sum: statGrammarMessage11,
  avg: statGrammarMessage11,
  average: statGrammarMessage11,
  mean: statGrammarMessage11,
  count: statGrammarMessage11,
  total: statGrammarMessage11,
  row: statGrammarMessage12,
  rowIndex: statGrammarMessage12,
  index: statGrammarMessage12,
  where: statGrammarMessage12,
  filter: statGrammarMessage12,
  limit: statGrammarMessage12,
  order: statGrammarMessage12,
  sort: statGrammarMessage12,
  stats: statGrammarMessage13,
  tiles: statGrammarMessage13,
  figures: statGrammarMessage13,
  kpis: statGrammarMessage13,
  items: statGrammarMessage13,
  values: statGrammarMessage13,
  data: statGrammarMessage16,
  from: statGrammarMessage16,
  table: statGrammarMessage16,
  dataset: statGrammarMessage16,
  sources: `sources is the component's other prop, not a definition key — the stat names one with source`,
  icon: statGrammarMessage17,
  emoji: statGrammarMessage17,
  link: statGrammarMessage17,
  href: statGrammarMessage17,
  url: statGrammarMessage17,
  tooltip: `figures have no tooltips — keep it in the doc's prose or the note`,
  size: statGrammarMessage18,
  width: statGrammarMessage18,
  height: statGrammarMessage18,
};
var statGrammarTheChangeColumnIsColumn: Dynamic = `the change column is column`;
var statGrammarStyles9: Dynamic = `the basis is the change's labels: labels: [{"kind": "text", "text": "vs Aug 10"}] ("vs Q1", "vs target")`;
var statGrammarStyles10: Dynamic = `units ride format: {"kind": "number", "suffix": " pts"}; the basis words are a text label`;
var StatGrammarHints: Dynamic = {
  field: statGrammarTheChangeColumnIsColumn,
  value: statGrammarTheChangeColumnIsColumn,
  by: statGrammarTheChangeColumnIsColumn,
  metric: statGrammarTheChangeColumnIsColumn,
  change: statGrammarTheChangeColumnIsColumn,
  delta: statGrammarTheChangeColumnIsColumn,
  title: statGrammarStyles9,
  label: statGrammarStyles9,
  caption: statGrammarStyles9,
  text: statGrammarStyles9,
  name: statGrammarStyles9,
  basis: statGrammarStyles9,
  period: statGrammarStyles9,
  vs: statGrammarStyles9,
  versus: statGrammarStyles9,
  unit: statGrammarStyles10,
  units: statGrammarStyles10,
  prefix: statGrammarStyles10,
  suffix: statGrammarStyles10,
  percent: `a percent change is format: {"kind": "number", "spec": ".1%"} over a ratio column`,
  pct: `a percent change is format: {"kind": "number", "spec": ".1%"} over a ratio column`,
  compare: statGrammarMessage10,
  previous: statGrammarMessage10,
  prior: statGrammarMessage10,
  baseline: statGrammarMessage10,
  target: statGrammarMessage10,
  from: statGrammarMessage10,
  of: statGrammarMessage10,
  color: StatGrammarData2,
  colour: StatGrammarData2,
  good: StatGrammarData2,
  bad: StatGrammarData2,
  direction: StatGrammarData2,
  positive: StatGrammarData2,
  negative: StatGrammarData2,
  status: StatGrammarData2,
  sign: `a delta always prints its sign — nothing to write`,
  signed: `a delta always prints its sign — nothing to write`,
  arrow: `a delta prints its sign, not an arrow — nothing to write`,
  icon: `a delta prints its sign; there are no icons to write`,
  reverse: `lower-is-better is tone: {"reverse": true}`,
  invert: `lower-is-better is tone: {"reverse": true}`,
  kind: `a change has no kind — it is a column, how it prints (format), its basis (labels) and an optional tone`,
  type: `a change has no kind — it is a column, how it prints (format), its basis (labels) and an optional tone`,
  source: `the change is a column of the SAME row — one source per stat`,
  asof: `a date beside the change is a column label among its labels: labels: [{"kind": "text", "text": "WoW"}, {"kind": "column", "column": "<date column>", "format": {"kind": "time", …}}]`,
  note: `the note sits on the stat itself — a change is column, labels, format, tone`,
};
var statGrammarChartGrammarToneAlias: Dynamic = ChartGrammarTone;
var statGrammarTheColumnIsColumn: Dynamic = `the column is column`;
var statGrammarStyles11: Dynamic = `inline words are {"kind": "text", "text": "…"}`;
var StatGrammarText: Dynamic = {
  kind: `group`,
  fields: {
    kind: {
      kind: `literal`,
      values: [`text`],
      tier: `data-determining`,
      label: `Label kind`,
      help: `"text": inline words, printed as written.`,
    },
    text: {
      kind: `text`,
      min: 1,
      max: statGrammarLimit2002,
      tier: `display-only`,
      label: `Label text`,
      help: `The words ("as of", "vs", "vs target") — 1 to ${statGrammarLimit2002} characters. Inline text: it edits in place in the doc.`,
    },
  },
  required: [`kind`, `text`],
  keySentences: {
    format: {
      message: chartGrammarIsATextLabelAndTakesNoFormat,
      atObject: true,
    },
  },
  hints: {
    value: `inline words are text; a value off the row is {"kind": "column", "column": "<column>"}`,
    column: `a value off the row is its own label: {"kind": "column", "column": "<column>"}`,
    tone: `text wears the muted ink — a judgement colour rides a column label: {"kind": "column", "column": …, "tone": ${chartGrammarStyles3}}`,
    title: `the words are text`,
    label: `the words are text`,
    caption: `the words are text`,
  },
  noun: `a text label`,
  tier: `display-only`,
  label: `Text label`,
  help: `Inline words printed as written (editable in place).`,
};
var StatGrammarColumn: Dynamic = {
  kind: `group`,
  fields: {
    kind: {
      kind: `literal`,
      values: [`column`],
      tier: `data-determining`,
      label: `Label kind`,
      help: `"column": a value read off the same row.`,
    },
    column: {
      kind: `column`,
      tier: `data-determining`,
      label: `Label column`,
      help: `The column of the SAME row whose value prints here — the date the figure holds for, the week a change compares against, a snapshot label. A null cell prints nothing.`,
    },
    format: {
      kind: `format`,
      tier: `display-only`,
      label: `Label format`,
      help: `How the value prints: {"kind": "time", "spec": "%b %-d"} for a date ("Aug 23"), {"kind": "time", "spec": "W%V"} for an ISO week, a number format for a figure. Omitted: ISO dates print "%b %-d", numbers "~s", text as written.`,
    },
    tone: statGrammarChartGrammarToneAlias,
  },
  required: [`kind`, `column`],
  hints: {
    field: statGrammarTheColumnIsColumn,
    value: statGrammarTheColumnIsColumn,
    by: statGrammarTheColumnIsColumn,
    date: statGrammarTheColumnIsColumn,
    text: statGrammarStyles11,
    title: `${statGrammarStyles11} as their own label`,
    label: `${statGrammarStyles11} as their own label`,
    prefix: `${statGrammarStyles11} as the label before this one; units ride format: {"kind": "number", "suffix": " ms"}`,
    suffix: `units ride format: {"kind": "number", "suffix": " ms"}`,
    spec: `the format is an object: format: {"kind": "time", "spec": "%b %-d"}`,
    timeFormat: `write format: {"kind": "time", "spec": "%b %-d"}`,
    dateFormat: `write format: {"kind": "time", "spec": "%b %-d"}`,
    color: `a label wears the muted ink — a judgement colour is tone: ${chartGrammarStyles3}`,
    colour: `a label wears the muted ink — a judgement colour is tone: ${chartGrammarStyles3}`,
    source: `a label reads a column of the SAME row — one source per stat`,
  },
  noun: `a column label`,
  tier: `data-determining`,
  label: `Column label`,
  help: `A value read off the same row, printed through format; tone (optional) colours it by a number — its default column is this label's own.`,
};
var StatGrammarHints2: Dynamic = {
  value: `a value off the row is kind: "column"`,
  field: `a value off the row is kind: "column"`,
  date: `a date off the row is kind: "column" with "format": {"kind": "time", "spec": "%b %-d"}`,
  time: `a date off the row is kind: "column" with "format": {"kind": "time", "spec": "%b %-d"}`,
  asof: `a date off the row is kind: "column" with "format": {"kind": "time", "spec": "%b %-d"}`,
  static: `inline words are kind: "text"`,
  string: `inline words are kind: "text"`,
  literal: `inline words are kind: "text"`,
  title: `inline words are kind: "text"`,
};
var statLabelsSchema: Dynamic = (
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => ({
  kind: `items`,
  min: 1,
  max: 2,
  noun: `labels`,
  item: {
    kind: `variant`,
    key: `kind`,
    variants: {
      text: StatGrammarText,
      column: StatGrammarColumn,
    },
    hints: StatGrammarHints2,
    stringHint: `a bare string is a text label: {"kind": "text", "text": "<value>"} (a value off the row is {"kind": "column", "column": "<column>"})`,
    tier: `data-determining`,
    label: `Label`,
    help: `One label: {kind: "text", text} (inline words) or {kind: "column", column, format?, tone?} (a value off the same row).`,
  },
  objectHint: `labels is a LIST: "labels": [{…}] (up to two labels, printed in order)`,
  overHint: chartGrammarJoinTheWordsInOneTextLabel,
  tier: `data-determining`,
  label: input,
  help: options,
});
var StatGrammarLabels: Dynamic = statLabelsSchema(
  `Labels`,
  `Up to 2 labels printed under the value on one line in the muted ink, joined by a space — "as of Aug 23" is labels: [{"kind": "text", "text": "as of"}, {"kind": "column", "column": "day", "format": {"kind": "time", "spec": "%b %-d"}}]. Text edits in place; a column label reads the same row (WHEN the figure holds).`,
);
var StatGrammarLabels2: Dynamic = statLabelsSchema(
  `Change basis`,
  `What the change is measured against, printed after it in the muted ink — "+548 vs Aug 10" is labels: [{"kind": "text", "text": "vs"}, {"kind": "column", "column": "basis_week", "format": {"kind": "time", "spec": "%b %-d"}}]; up to 2 labels, optional.`,
);
var StatGrammarItem: Dynamic = {
  kind: `group`,
  fields: {
    column: {
      kind: `column`,
      tier: `data-determining`,
      label: `Change column`,
      help: `The NUMERIC column of the SAME row that holds the change (this period minus last, or their ratio) — computed in the query; the figure never subtracts. It always prints its sign and colours by it (green at or above 0, red below, muted when null) unless tone says otherwise.`,
    },
    format: {
      kind: `format`,
      tier: `display-only`,
      label: `Change format`,
      help: `How the change prints — a NUMBER format: {"kind": "number", "spec": ".1%"} for a ratio column (prints "+4.6%": a delta keeps its sign through a written spec too), {"kind": "number", "suffix": " pts"} for points. Omitted: "+," ("+548", "−310"). A change is never a date.`,
    },
    tone: {
      ...ChartGrammarTone,
      label: `Change tone`,
      help: `Omitted = {}: the change is judged by its own sign against [0] — good at or above, bad below, muted when null; {"reverse": true} when the number should fall; {"column": "<numeric column>", "cutoffs": [c1, c2]} to judge it by another number. ${ChartGrammarTone.help}`,
    },
    labels: StatGrammarLabels2,
  },
  required: [`column`],
  hints: StatGrammarHints,
  stringHint: `each change is an object: {"column": "<value>"} — the query computed the column; its basis rides "labels": [{"kind": "text", "text": "vs Aug 10"}]`,
  noun: `a change`,
  tier: `data-determining`,
  label: `Change`,
  help: `One change printed on its own line under the value: {"column": "<numeric column of the same row>", "format"?: {…}, "tone"?: {…}, "labels"?: [{"kind": "text", "text": "vs Aug 10"}]} — always signed, coloured by its verdict, followed by its labels in the muted ink.`,
};
var StatGrammarDeltas: Dynamic = {
  kind: `items`,
  min: 1,
  max: 3,
  noun: `changes`,
  item: StatGrammarItem,
  objectHint: statGrammarStyles2,
  tier: `data-determining`,
  label: `Changes`,
  help: `Up to 3 changes printed under the value, one line each ("+548 vs Aug 10", "−2 pts vs Q1"), each a column of the same row with its basis.`,
};
var StatGrammarTitle: Dynamic = {
  title: {
    kind: `text`,
    min: 1,
    max: statGrammarLimit40,
    tier: `display-only`,
    label: `Title`,
    help: `Names the metric ("Signups", "Open P0s", "p99 latency") — 1 to ${statGrammarLimit40} characters, required (a bare number asserts nothing) and static: the date the value holds for is a column label under the value ("as of Aug 23"). Also the figure's accessible name and, in a table, its column header. Edits inline.`,
  },
  note: {
    kind: `text`,
    min: 1,
    max: statGrammarLimit200,
    tier: `display-only`,
    label: `Note`,
    help: `One short line under the figure ("excludes trials", "7-day average") — 1 to ${statGrammarLimit200} characters. Static text: a value that changes with the data is a column (a label, a change), never a note. A root key: a stat CELL in a table carries no note (the note belongs to the table). Edits inline.`,
  },
  column: {
    kind: `column`,
    tier: `data-determining`,
    label: `Value column`,
    help: `The NUMERIC column whose value the figure shows, read off the source's ONE row — filter and limit the query to exactly that row (the latest day, or the total row alone): zero rows print —, two or more are refused; a text or time column is refused (print it with a column cell). No aggregation happens in the figure, ever.`,
  },
  format: {
    kind: `format`,
    tier: `display-only`,
    label: `Value format`,
    help: `How the figure prints — the NUMBER format object: {"kind": "number", "spec"?: ",", "prefix"?: "$", "suffix"?: " ms"} (12480 → "12,480"; "~s" → "12.5k"; ".1%" over a 0–1 share → "2.1%"). Omitted: the default number format groups the digits as given.`,
  },
  tone: {
    ...ChartGrammarTone,
    help: `Colours the value (and, in a table, washes the stat cell's background): ${chartGrammarStyles3} — omitted column = the stat's own column. No tone key = ink. ${ChartGrammarTone.help}`,
  },
  labels: StatGrammarLabels,
};
var statGrammarKindTitleSourceValues: Dynamic = [
  `kind`,
  `title`,
  `source`,
  `note`,
  `column`,
  `format`,
  `tone`,
  `labels`,
  `deltas`,
];
/* Subsystem: stat-grammar */
Object.keys(StatGrammarText.fields);
Object.keys(StatGrammarColumn.fields);
Object.keys(ChartGrammarTone.fields);
var isStatRecord: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => typeof input == `object` && !!input && !Array.isArray(input);
var statFieldOrUndefined: Dynamic = (
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => (Object.hasOwn(input, options) ? input[options] : undefined);
var formatDefinitionProblem = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
) =>
  `definition${formatDefinitionPath(input.path)}${input.statement ? `:` : ``} ${input.message}.`;
function sourceNameProblem(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return typeof input == `string`
    ? sourceNamePattern.test(input)
      ? input.startsWith(`__charts`)
        ? statGrammarNamesStartingWithChartsAreReserved
        : options !== undefined && !options.includes(input)
          ? unknownSourceProblem(input, options)
          : null
      : statGrammarMessage5
    : statGrammarMessage4;
}
function validateDefinitionSource(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = statFieldOrUndefined(input, `source`);
  if (value === undefined)
    return options === undefined
      ? {
          path: [`source`],
          message: statGrammarMessage6,
        }
      : options.source === undefined
        ? {
            path: [`source`],
            message: statGrammarMessage7,
          }
        : null;
  let value2: Dynamic = sourceNameProblem(value, context);
  return value2 === null
    ? null
    : {
        path: [`source`],
        message: value2,
      };
}
function validateStatLabelValue(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  value?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (typeof options == `string`) {
    value.push({
      path: context,
      message: `${fieldValueRequirement(input)} — ${substituteHintValue(statGrammarStyles3, options)}`,
    });
    return;
  }
  validateFieldValue(input, options, context, value);
}
function validateStatGroup(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  value?: Dynamic,
  extra: Dynamic = {},
  ..._extraArguments: unknown[]
): undefined {
  if (!isStatRecord(options)) {
    value.push({
      path: context,
      message:
        typeof options == `string` && input.stringHint !== undefined
          ? `${fieldValueRequirement(input)} — ${substituteHintValue(input.stringHint, options)}`
          : Array.isArray(options)
            ? `${fieldValueRequirement(input)}, not a list`
            : fieldValueRequirement(input),
    });
    return;
  }
  let value2: Dynamic = Object.keys(input.fields);
  let value3: Dynamic = context[context.length - 1];
  let value4: Dynamic =
    input.noun ?? (typeof value3 == `string` ? value3 : `each entry`);
  let filtered: Dynamic = Object.keys(options).filter(
    (input2?: Dynamic, ..._extraArguments: unknown[]) =>
      !Object.hasOwn(input.fields, input2),
  );
  if (filtered.length > 0) {
    value.push({
      path: context,
      message: unknownKeysProblem(
        filtered,
        `${value4} takes ${value2.join(`, `)}`,
        input.hints,
      ),
    });
  }
  for (let value5 of (input.required ?? []) as Dynamic)
    if (statFieldOrUndefined(options, value5) === undefined) {
      value.push({
        path: [...context, value5],
        message:
          ownFieldOrUndefined(extra.requiredSentences, value5) ??
          `is required — ${fieldValueRequirement(input.fields[value5])}`,
      });
    }
  for (let [value5, value6] of Object.entries(input.fields) as Dynamic) {
    let value7: Dynamic = statFieldOrUndefined(options, value5);
    if (value7 === undefined) continue;
    let value8: Dynamic = ownFieldOrUndefined(extra.members, value5);
    if (value8 === undefined) {
      validateFieldValue(value6, value7, [...context, value5], value);
    } else {
      value8(value7, [...context, value5], value);
    }
  }
}
var statSpecialValidators: Dynamic = {
  labels: (
    input?: Dynamic,
    options?: Dynamic,
    context?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    validateStatLabelValue(StatGrammarLabels2, input, options, context),
};
function validateStatDeltas(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (!Array.isArray(input)) {
    context.push({
      path: options,
      message: isStatRecord(input)
        ? `${statGrammarStyles} — ${statGrammarStyles2}`
        : statGrammarStyles,
    });
    return;
  }
  if (input.length === 0) {
    context.push({
      path: options,
      message: statGrammarMessage8,
    });
    return;
  }
  if (input.length > 3) {
    context.push({
      path: options,
      message: tooManyStatDeltasProblem(input.length),
    });
    return;
  }
  input.forEach(
    (
      input2?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      validateStatGroup(
        StatGrammarItem,
        input2,
        [...options, options2],
        context,
        {
          members: statSpecialValidators,
        },
      ),
  );
}
function validateStatTitle(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (typeof input == `string` && input.length > statGrammarLimit40) {
    context.push({
      path: options,
      message: statTitleLengthProblem(input.length),
    });
    return;
  }
  if (input === ``) {
    context.push({
      path: options,
      message: statGrammarMessage2,
    });
    return;
  }
  validateFieldValue(StatGrammarTitle.title, input, options, context);
}
function validateStatDefinition(
  input?: Dynamic,
  options: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  let filtered: Dynamic = Object.keys(input).filter(
    (input2?: Dynamic, ..._extraArguments: unknown[]) =>
      !statGrammarKindTitleSourceValues.includes(input2),
  );
  if (filtered.length > 0) {
    items.push({
      path: [],
      message: unknownKeysProblem(
        filtered,
        `a stat takes ${statGrammarKindTitleSourceValues.join(`, `)}`,
        StatGrammarField,
      ),
    });
  }
  let value: Dynamic = statFieldOrUndefined(input, `kind`);
  if (value !== `stat`) {
    items.push({
      path: [`kind`],
      message:
        value === undefined
          ? `is required — ${statGrammarMessage3}`
          : statGrammarMessage3,
    });
  }
  let value2: Dynamic = validateDefinitionSource(
    input,
    options.enclosing,
    options.sourceNames,
  );
  if (value2 !== null) {
    items.push(value2);
  }
  if (statFieldOrUndefined(input, `title`) === undefined) {
    items.push({
      path: [`title`],
      message: statGrammarMessage,
    });
  }
  if (statFieldOrUndefined(input, `column`) === undefined) {
    items.push({
      path: [`column`],
      message: `is required — ${fieldValueRequirement(StatGrammarTitle.column)}`,
    });
  }
  for (let [value4, value5] of Object.entries(StatGrammarTitle) as Dynamic) {
    let value6: Dynamic = statFieldOrUndefined(input, value4);
    if (value6 !== undefined) {
      if (value4 === `title`) {
        validateStatTitle(value6, [value4], items);
      } else {
        if (value5.kind === `items`) {
          validateStatLabelValue(value5, value6, [value4], items);
        } else {
          validateFieldValue(value5, value6, [value4], items);
        }
      }
    }
  }
  let value3: Dynamic = statFieldOrUndefined(input, `deltas`);
  if (value3 !== undefined) {
    validateStatDeltas(value3, [`deltas`], items);
  }
  if (items.length === 0) {
    (items.push as Dynamic)(...statSemanticProblems(input));
  }
  return items;
}
function statSemanticProblems(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  if (input.format?.kind === `time`) {
    items.push({
      path: [`format`],
      message: `is a date format — a stat prints a number; a date beside it is a column label: {"kind": "column", "column": "<date column>", "format": {"kind": "time", "spec": "%b %-d"}}, and a date printed as is is a column cell`,
    });
  }
  (input.labels ?? []).forEach(
    (
      entry?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (entry.kind === `column` && entry.column === input.column) {
        items.push({
          path: [`labels`, options, `column`],
          message: `repeats column "${input.column}" — a label prints BESIDE the value: the date it holds for (another column of the same row) or words`,
        });
      }
    },
  );
  let entries: Dynamic = new (Map as Dynamic)();
  (input.deltas ?? []).forEach(
    (
      input2?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (input2.column === input.column) {
        items.push({
          path: [`deltas`, options, `column`],
          message: `repeats column "${input.column}" — a change is ANOTHER column of the same row (this period minus last, or their ratio), computed in the query`,
        });
      }
      let entry: Dynamic = entries.get(input2.column);
      if (entry === undefined) {
        entries.set(input2.column, options);
      } else {
        items.push({
          path: [`deltas`, options, `column`],
          message: `repeats deltas[${entry}].column "${input2.column}" — each change reads its own column (one per basis)`,
        });
      }
      if (input2.format?.kind === `time`) {
        items.push({
          path: [`deltas`, options, `format`],
          message: `is a date format — a change is a number (a difference or a ratio); a date beside it is a column label among its labels: {"kind": "column", "column": "<date column>", "format": {"kind": "time", "spec": "%b %-d"}}`,
        });
      }
      (input2.labels ?? []).forEach(
        (
          entry2?: Dynamic,
          options2?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          if (entry2.kind === `column` && entry2.column === input2.column) {
            items.push({
              path: [`deltas`, options, `labels`, options2, `column`],
              message: `repeats deltas[${options}].column "${input2.column}" — the change prints itself; its labels name the basis ({"kind": "text", "text": "WoW"}) or read another column (the compared period)`,
            });
          }
        },
      );
    },
  );
  return items;
}
function fieldTierAtPath(
  entry?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (entry === undefined) return `data-determining`;
  if (options.length === 0) return normalizeFieldTier(entry.tier);
  let [value, ...value2]: Dynamic = options;
  if (entry.kind === `group` && typeof value == `string`)
    return fieldTierAtPath(ownFieldOrUndefined(entry.fields, value), value2);
  if (entry.kind === `items` && isValidPathIndex(value, entry.max))
    return value2.length === 0
      ? normalizeFieldTier(entry.tier)
      : fieldTierAtPath(entry.item, value2);
  if (entry.kind === `variant` && typeof value == `string`) {
    let values: Dynamic = new (Set as Dynamic)(
      Object.values(entry.variants).flatMap(
        (input?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          let value3: Dynamic = ownFieldOrUndefined(input.fields, value);
          return value3 === undefined ? [] : [fieldTierAtPath(value3, value2)];
        },
      ),
    );
    return values.size === 1 ? [...values][0] : `data-determining`;
  }
  return (entry.kind === `order` && isOrderAttributePath(value, value2)) ||
    (entry.kind === `format` &&
      isKnownAnnotationKind(value) &&
      value2.length === 0)
    ? normalizeFieldTier(entry.tier)
    : `data-determining`;
}
var StatGrammarStat: Dynamic = {
  kind: `group`,
  fields: {
    ...StatGrammarTitle,
    deltas: StatGrammarDeltas,
  },
  tier: `data-determining`,
  label: `Stat`,
  help: `One figure.`,
};
var statTierOverrides: Dynamic = new (Map as Dynamic)();
function registerStatTierOverride(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  for (let value of input as Dynamic) statTierOverrides.set(value, options);
}
function statFieldTier(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [value]: Dynamic = input;
  if (value === undefined) return `data-determining`;
  let entry: Dynamic = statTierOverrides.get(String(value));
  return entry === undefined
    ? fieldTierAtPath(StatGrammarStat, input)
    : entry(input);
}
lowerFormatDefinition({
  kind: `number`,
  spec: `,`,
});
lowerFormatDefinition({
  kind: `number`,
  spec: `+,`,
});
lowerFormatDefinition({
  kind: `time`,
  spec: `%b %-d`,
});
registerChartTierOverride(
  `stat`,
  (
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let value: Dynamic = validateStatDefinition(input, {
      sourceNames: options.sourceNames,
    })[0];
    return value === undefined ? null : formatDefinitionProblem(value);
  },
);
var tableGrammarMessage: Dynamic = `a third chart cell: a table draws at most two chart columns — show the other figures as number cells`;
var tableGrammarMessage2: Dynamic = `a chart cell beside a columns band would draw one chart per band value — drop the band, or make it a number cell`;
var tableGrammarMessage3: Dynamic = `a compact cell prints no size legend — draw the bubbles as their own Visualize beside the table`;
var tableGrammarTheNoteBelongsToTheTable: Dynamic = `the note belongs to the table`;
var tableGrammarNoFacetInsideACell: Dynamic = `no facet inside a cell`;
var tableGrammarColumnsWrapValues: Dynamic = [`columns`, `wrap`];
var compactChartProblem = (input?: Dynamic, ..._extraArguments: unknown[]) =>
  `has ${input}: ${tableGrammarNoFacetInsideACell}`;
var tableGrammarMessage4: Dynamic = `a tile chart needs its category axis and its ramp — draw the grid as its own <Visualize> beside the table`;
var compactYAxisCountProblem = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
) =>
  `has ${input} entries: a compact cell draws one y axis — draw the two-unit chart as its own Visualize beside the table`;
/* Subsystem: table-grammar */
compactYAxisCountProblem(2);
var TableGrammarNote: Dynamic = [`note`, ...tableGrammarColumnsWrapValues];
var expandedTableWidthProblem = (
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) =>
  `${input} cells under a ${options}-value band is ${input * options} columns; 24 allowed — drop a cell, bucket the band, or split the table in two`;
var tableGrammarLimit40: Dynamic = 40;
var tableGrammarStatGrammarLimit200Alias: Dynamic = statGrammarLimit200;
var tableGrammarStatGrammarLimit40Alias: Dynamic = statGrammarLimit40;
var tableGrammarLimit200: Dynamic = 200;
var tableGrammarStatColumnChartValues: Dynamic = [`stat`, `column`, `chart`];
var tableGrammarMessage5: Dynamic = `must be "table" — cell templates (figures, printed values, compact charts) sliced by rows and columns (one figure is kind "stat"; one plot is kind "chart")`;
var tableGrammarStatGrammarMessage7Alias: Dynamic = statGrammarMessage7;
var tableGrammarStyles: Dynamic = `must be a list of 1 to 10 cell templates: [{"kind": "stat" | "column" | "chart", …}, …]`;
var TableGrammarMessage: Dynamic = `is required — ${tableGrammarStyles}`;
var tableGrammarStyles2: Dynamic = `one cell is still a list: cells: [{"kind": …, …}]`;
var tableCellCountProblem = (input?: Dynamic, ..._extraArguments: unknown[]) =>
  `has ${input} entries; 10 allowed — split the table in two`;
var tableGrammarMessage6: Dynamic = `is empty — a table lays out 1 to 10 cell templates`;
var tableGrammarMessage7: Dynamic = `is required — a table needs rows or columns; lay out independent pictures as separate <Visualize>`;
var tableSplitSourceRequirement = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
) => `is required — a table names its own source: its ${input} split reads it`;
var tableGrammarStyles3: Dynamic = `must be a cell object: {"kind": "stat" | "column" | "chart", …}`;
var tableGrammarStyles4: Dynamic = `a bare column name is a column cell: {"kind": "column", "column": "<value>"}`;
var tableGrammarMessage8: Dynamic = `cells never nest — one flat list of up to 10 templates`;
var tableGrammarMessage9: Dynamic = `is required — "stat" (a figure), "column" (a value printed as is) or "chart" (a compact chart)`;
var TableGrammarJoin: Dynamic = `must be one of ${tableGrammarStatColumnChartValues.map((input?: Dynamic, ..._extraArguments: unknown[]) => `"${input}"`).join(`, `)}`;
var maxTableSplits = (input?: Dynamic, ..._extraArguments: unknown[]) =>
  input === `rows` ? 2 : 1;
var tableSplitsRequirement = (input?: Dynamic, ..._extraArguments: unknown[]) =>
  `must be a list of ${maxTableSplits(input) === 1 ? `exactly one split` : `1 to ${maxTableSplits(input)} splits`}: ${input}: [{"by": "<column>", "order"?: ${chartGrammarStyles2}, "title"?: "…"}]`;
var singleSplitListHint = (input?: Dynamic, ..._extraArguments: unknown[]) =>
  `one split is still a list: ${input}: [{"by": "<column>"}]`;
var emptySplitsProblem = (input?: Dynamic, ..._extraArguments: unknown[]) =>
  `is empty — leave the key out, or list ${maxTableSplits(input) === 1 ? `one split` : `1 to ${maxTableSplits(input)} splits`}`;
var tooManySplitsProblem = (
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) =>
  input === `rows`
    ? `has ${options} entries; 2 allowed — join two levels into one column in the query`
    : `has ${options} entries; 1 allowed — one header band; move the other column to rows`;
var tableGrammarStyles5: Dynamic = `belongs to kind "chart" — a table's charts are cells: cells: [{"kind": "chart", "marks": […], …}]`;
var tableGrammarMessage10: Dynamic = `a table's heading is title`;
var tableGrammarAShortLineUnderTheTableIsNote: Dynamic = `a short line under the table is note`;
var tableGrammarStyles6: Dynamic = `the templates are cells: [{"kind": "stat" | "column" | "chart", …}] (1 to 10, left to right)`;
var tableGrammarStyles7: Dynamic = `rows is a list of splits: rows: [{"by": "<column>"}] — one body row per distinct value`;
var tableGrammarStyles8: Dynamic = `columns is a list of splits: columns: [{"by": "<column>"}] (header bands) — a printed column is a cell: cells: [{"kind": "column", "column": "<column>"}]`;
var TableGrammarData: Dynamic = `rows come as the query returns them — ORDER BY / WHERE / LIMIT in the query, or a split's order: ${chartGrammarStyles2}`;
var tableGrammarMessage11: Dynamic = `NO aggregation in a table — compute it in the query; each cell prints its one row`;
var tableGrammarMessage12: Dynamic = `the table's default source is source: "<sources key>" (each cell may name its own)`;
var TableGrammarData2: Dynamic = `tables carry no styling keys — tone colours a cell by a number: cell.tone: ${chartGrammarStyles3}`;
var tableGrammarMessage13: Dynamic = `a table sizes to its slot — drop it`;
var TableGrammarWrap: Dynamic = {
  wrap: `wrap folds a chart's facet columns — a table never wraps`,
  facet: `facet ${tableGrammarStyles5}`,
  x: `x ${tableGrammarStyles5}`,
  y: `y ${tableGrammarStyles5}`,
  marks: `marks ${tableGrammarStyles5}`,
  axes: `axes ${tableGrammarStyles5}`,
  annotations: `annotations ${tableGrammarStyles5}`,
  legend: `legend ${tableGrammarStyles5}`,
  orient: `orient ${tableGrammarStyles5}`,
  panes: `panes ${tableGrammarStyles5}`,
  stats: `a table's figures are cells: cells: [{"kind": "stat", "title": …, "column": …}]`,
  stat: `a table's figures are cells: cells: [{"kind": "stat", "title": …, "column": …}]`,
  charts: `a table's charts are cells: cells: [{"kind": "chart", "marks": […]}]`,
  row: tableGrammarStyles7,
  column: tableGrammarStyles8,
  field: `a figure is a cell: cells: [{"kind": "stat", "title": …, "column": "<column>"}]`,
  fields: tableGrammarStyles8,
  value: `a printed value is a cell: cells: [{"kind": "column", "column": "<column>"}]`,
  values: tableGrammarStyles6,
  items: tableGrammarStyles6,
  tiles: tableGrammarStyles6,
  figures: tableGrammarStyles6,
  kpis: tableGrammarStyles6,
  templates: tableGrammarStyles6,
  cell: tableGrammarStyles6,
  label: tableGrammarMessage10,
  name: tableGrammarMessage10,
  caption: tableGrammarMessage10,
  heading: tableGrammarMessage10,
  header: `headers come from the cells (cell.title) and the splits' values — nothing to write on the table`,
  headers: `headers come from the cells (cell.title) and the splits' values — nothing to write on the table`,
  subtitle: tableGrammarAShortLineUnderTheTableIsNote,
  description: tableGrammarAShortLineUnderTheTableIsNote,
  footnote: tableGrammarAShortLineUnderTheTableIsNote,
  footer: tableGrammarAShortLineUnderTheTableIsNote,
  notes: tableGrammarAShortLineUnderTheTableIsNote,
  data: tableGrammarMessage12,
  from: tableGrammarMessage12,
  dataset: tableGrammarMessage12,
  table: tableGrammarMessage12,
  sources: `sources is the component's other prop, not a definition key — the table or each cell names one with source`,
  groupBy: tableGrammarStyles7,
  group_by: tableGrammarStyles7,
  group: tableGrammarStyles7,
  by: tableGrammarStyles7,
  pivot: `${tableGrammarStyles7}; columns: [{"by": …}] slices header bands`,
  split: tableGrammarStyles7,
  sort: TableGrammarData,
  order: TableGrammarData,
  orderBy: TableGrammarData,
  where: TableGrammarData,
  filter: TableGrammarData,
  limit: TableGrammarData,
  top: TableGrammarData,
  page: `at most 50 rows and no paging — LIMIT in the query`,
  pageSize: `at most 50 rows and no paging — LIMIT in the query`,
  pagination: `at most 50 rows and no paging — LIMIT in the query`,
  total: `totals are rows of the source (a UNION in the query), not a table option`,
  totals: `totals are rows of the source (a UNION in the query), not a table option`,
  subtotals: `totals are rows of the source (a UNION in the query), not a table option`,
  sum: tableGrammarMessage11,
  agg: tableGrammarMessage11,
  aggregate: tableGrammarMessage11,
  format: `formats sit on each cell (cell.format) — the table has none`,
  tone: `tone sits on each cell: {"kind": "column", "column": …, "tone": ${chartGrammarStyles3}}`,
  style: TableGrammarData2,
  striped: TableGrammarData2,
  border: TableGrammarData2,
  borders: TableGrammarData2,
  color: TableGrammarData2,
  colour: TableGrammarData2,
  align: TableGrammarData2,
  width: tableGrammarMessage13,
  height: tableGrammarMessage13,
  size: tableGrammarMessage13,
  transpose: `swap rows and columns by writing them the other way round — there is no transpose flag`,
};
var tableGrammarTheSlicingColumnIsBy: Dynamic = `the slicing column is by`;
var tableGrammarMessage14: Dynamic = `the split's heading is title ("Segment") — it heads the row-header column or names the band`;
var tableGrammarMessage15: Dynamic = `slice headers print the values themselves — rename them in the query; the split's own heading is title`;
var TableGrammarHints: Dynamic = {
  as: `as paints a mark's split — table rows/columns only slice`,
  field: tableGrammarTheSlicingColumnIsBy,
  column: tableGrammarTheSlicingColumnIsBy,
  key: tableGrammarTheSlicingColumnIsBy,
  on: tableGrammarTheSlicingColumnIsBy,
  groupBy: tableGrammarTheSlicingColumnIsBy,
  group: tableGrammarTheSlicingColumnIsBy,
  sort: `there is no sort key — the slices follow the rows (ORDER BY in the query), or order: ${chartGrammarStyles2}`,
  sortBy: `there is no sort key — the slices follow the rows (ORDER BY in the query), or order: ${chartGrammarStyles2}`,
  values: `the values to show, in order, are order: {"kind": "list", "values": ["…", …]}`,
  domain: `the values to show, in order, are order: {"kind": "list", "values": ["…", …]}`,
  categories: `the values to show, in order, are order: {"kind": "list", "values": ["…", …]}`,
  natural: `natural sorting is order: {"kind": "natural"}`,
  label: tableGrammarMessage14,
  name: tableGrammarMessage14,
  header: tableGrammarMessage14,
  heading: tableGrammarMessage14,
  caption: tableGrammarMessage14,
  labels: tableGrammarMessage15,
  headers: tableGrammarMessage15,
  format: `slice values print as written — format the column in the query`,
  wrap: `wrap folds a chart's facet columns — a table never wraps`,
  limit: `at most 50 rows — LIMIT in the query`,
  top: `at most 50 rows — LIMIT in the query`,
  total: `totals are rows of the source (a UNION in the query), not a split option`,
  totals: `totals are rows of the source (a UNION in the query), not a split option`,
  subtotal: `totals are rows of the source (a UNION in the query), not a split option`,
  collapse: `every slice shows — there are no collapsible groups`,
  collapsed: `every slice shows — there are no collapsible groups`,
  desc: `there is no descending word — list the values in the order to show (order: {"kind": "list", "values": […]}), or ORDER BY … DESC in the query`,
  descending: `there is no descending word — list the values in the order to show (order: {"kind": "list", "values": […]}), or ORDER BY … DESC in the query`,
  reverse: `there is no descending word — list the values in the order to show: order: {"kind": "list", "values": […]}`,
};
var tableGrammarThePrintedColumnIsColumn: Dynamic = `the printed column is column`;
var tableGrammarTheHeaderIsTitle: Dynamic = `the header is title`;
var TableGrammarData3: Dynamic = `cells carry no styling — tone colours the value by a number: tone: ${chartGrammarStyles3}`;
var tableGrammarStyles9: Dynamic = `changes and labels belong to a figure: {"kind": "stat", "title": …, "column": …, "labels": […], "deltas": […]}`;
var TableGrammarHints2: Dynamic = {
  field: tableGrammarThePrintedColumnIsColumn,
  value: tableGrammarThePrintedColumnIsColumn,
  key: tableGrammarThePrintedColumnIsColumn,
  by: tableGrammarThePrintedColumnIsColumn,
  label: tableGrammarTheHeaderIsTitle,
  name: tableGrammarTheHeaderIsTitle,
  header: tableGrammarTheHeaderIsTitle,
  heading: tableGrammarTheHeaderIsTitle,
  text: tableGrammarTheHeaderIsTitle,
  width: TableGrammarData3,
  align: TableGrammarData3,
  alignment: TableGrammarData3,
  style: TableGrammarData3,
  bold: TableGrammarData3,
  color: TableGrammarData3,
  colour: TableGrammarData3,
  status: TableGrammarData3,
  highlight: TableGrammarData3,
  link: `links are not in table cells — link from the doc's prose`,
  href: `links are not in table cells — link from the doc's prose`,
  url: `links are not in table cells — link from the doc's prose`,
  deltas: tableGrammarStyles9,
  delta: tableGrammarStyles9,
  caption: tableGrammarStyles9,
  labels: tableGrammarStyles9,
  asof: tableGrammarStyles9,
  x: `a chart cell is {"kind": "chart", "marks": [{"type": "line", "y": "<column>"}]}`,
  y: `a chart cell is {"kind": "chart", "marks": [{"type": "line", "y": "<column>"}]}`,
  marks: `a chart cell is {"kind": "chart", "marks": […]}`,
  unit: `units ride format: {"kind": "number", "suffix": " ms"}`,
  units: `units ride format: {"kind": "number", "suffix": " ms"}`,
  prefix: `units ride format: {"kind": "number", "prefix": "$"}`,
  suffix: `units ride format: {"kind": "number", "suffix": " ms"}`,
  sum: `NO aggregation in a cell — compute it in the query; the cell prints its one row's value`,
  agg: `NO aggregation in a cell — compute it in the query; the cell prints its one row's value`,
  aggregate: `NO aggregation in a cell — compute it in the query; the cell prints its one row's value`,
  cells: tableGrammarMessage8,
};
var TableGrammarKpi: Dynamic = {
  kpi: `a figure is kind "stat"`,
  metric: `a figure is kind "stat"`,
  number: `a figure is kind "stat"`,
  figure: `a figure is kind "stat"`,
  tile: `a figure is kind "stat"`,
  stats: `a figure is kind "stat"`,
  value: `a value printed as is is kind "column"`,
  text: `a value printed as is is kind "column"`,
  string: `a value printed as is is kind "column"`,
  field: `a value printed as is is kind "column"`,
  cell: `a value printed as is is kind "column"`,
  columns: `a value printed as is is kind "column"`,
  bar: `a compact chart is kind "chart" with marks: [{"type": "bar", …}]`,
  line: `a compact chart is kind "chart" with marks: [{"type": "line", …}]`,
  area: `a compact chart is kind "chart" with marks: [{"type": "area", …}]`,
  point: `a compact chart is kind "chart" with marks: [{"type": "point", …}]`,
  sparkline: `a compact chart is kind "chart" with marks: [{"type": "line", …}]`,
  trend: `a compact chart is kind "chart" with marks: [{"type": "line", …}]`,
  plot: `a compact chart is kind "chart"`,
  graph: `a compact chart is kind "chart"`,
  charts: `a compact chart is kind "chart"`,
  table: tableGrammarMessage8,
  panes: `a chart cell has one pane — kind "chart"`,
  band: `cell groups are not in the grammar — list the cells flat (up to 6)`,
  group: `cell groups are not in the grammar — list the cells flat (up to 6)`,
};
var tableSplitSchema: Dynamic = {
  kind: `group`,
  fields: {
    by: {
      kind: `column`,
      tier: `data-determining`,
      label: `Slice by`,
      help: `The column whose distinct values slice the table — one body row (rows) or one header band column (columns) per value present; a null in it is refused (COALESCE it in the query). Two rows entries nest (segment › team): a parent line over indented sub-rows, only the pairs present in the rows, ragged as the data is; the row whose team is null is the segment's OWN row — its cells print on the parent line (at most one per parent; SQL ROLLUP), and a parent without one heads empty cells.`,
    },
    order: {
      kind: `order`,
      noun: `values`,
      tier: `data-determining`,
      label: `Slice order`,
      help: `The slices' ORDER — ${chartGrammarStyles2}: "list" draws exactly values, in that order — it must name every value present in the rows (a value it omits is refused, naming it) and a listed value absent from the rows keeps its empty row / band column; "natural" sorts the distinct values so "v9" comes before "v10" and "Q2" before "Q10". Omitted = the values present, in first-appearance row order (ORDER BY in the query). "column" (order by another column) is not built yet — sort in the query. A list is as long as the table allows: at most 50 values on rows, 12 on columns (a listed value is a row / a band column, present or not).`,
    },
    title: {
      kind: `text`,
      min: 1,
      max: tableGrammarLimit200,
      tier: `display-only`,
      label: `Slice title`,
      help: `Names the slicing column ("Segment", "Quarter") — on rows it heads the row-header column, on columns it names the band above its values; omitted = the by column's name as written heads the row-header column (rows) or the band, printed once above its values (columns). 1 to ${tableGrammarLimit200} characters. Inline text: it edits in place.`,
    },
  },
  required: [`by`],
  hints: TableGrammarHints,
  stringHint: `a split is an object: {"by": "<value>"}`,
  noun: `a split`,
  tier: `data-determining`,
  label: `Split`,
  help: `One slicing level: {"by": "<column>", "order"?: ${chartGrammarStyles2}, "title"?: "Segment"}.`,
};
var tableSplitsSchema: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => ({
  kind: `items`,
  min: 1,
  max: maxTableSplits(input),
  noun: `splits`,
  one: `split`,
  item: tableSplitSchema,
  tier: `data-determining`,
  label: input === `rows` ? `Rows` : `Columns`,
  help:
    input === `rows`
      ? `One or two slicing levels down the side: one body row per distinct value (pair) present; two entries draw a parent line (carrying the row whose sub-row column is null, if any) over indented sub-rows.`
      : `ONE header band across the top, at most 12 values: the cells repeat under each value present (a second band is not built yet — move the other column to rows).`,
});
var tableHeadingFields: Dynamic = {
  title: {
    kind: `text`,
    min: 1,
    max: tableGrammarLimit40,
    overHint: chartGrammarSayTheRestInTheNote,
    tier: `display-only`,
    label: `Title`,
    help: `Names the table in at most ${tableGrammarLimit40} characters (it wraps, never truncates; say the rest in the note), also its accessible name; omitted = no title. Edits inline.`,
  },
  note: {
    kind: `text`,
    min: 1,
    max: tableGrammarStatGrammarLimit200Alias,
    tier: `display-only`,
    label: `Note`,
    help: `One short line under the table ("ARR in USD, as booked") — 1 to ${tableGrammarStatGrammarLimit200Alias} characters. Edits inline.`,
  },
};
var columnCellFields: Dynamic = {
  column: {
    kind: `column`,
    tier: `data-determining`,
    label: `Column`,
    help: `The column whose value this cell prints for its row — as is (a name, an owner, a count the query computed). One row per cell: two rows are refused, never summed.`,
  },
  format: {
    kind: `format`,
    tier: `display-only`,
    label: `Format`,
    help: `How the value prints: {"kind": "number", "spec"?: ",", "prefix"?: "$", "suffix"?: " ms"} or {"kind": "time", "spec": "%b %-d"}. Omitted: numbers with grouped digits, dates as ISO days, text as written.`,
  },
  title: {
    kind: `text`,
    min: 1,
    max: tableGrammarStatGrammarLimit40Alias,
    tier: `display-only`,
    label: `Header`,
    help: `The column header — 1 to ${tableGrammarStatGrammarLimit40Alias} characters; omitted = the column name, humanised ("arr_usd" → "Arr usd"). Edits inline.`,
  },
  tone: {
    ...ChartGrammarTone,
    help: `Colours the printed value: ${chartGrammarStyles3} — omitted column = this cell's own column (when it holds numbers). ${ChartGrammarTone.help}`,
  },
};
var columnCellAllowedKeys: Dynamic = [
  `kind`,
  `source`,
  ...Object.keys(columnCellFields),
];
var columnCellSchema: Dynamic = {
  kind: `group`,
  fields: columnCellFields,
  required: [`column`],
  hints: TableGrammarHints2,
  noun: `a column cell`,
  tier: `data-determining`,
  label: `Column cell`,
  help: `A value printed as is.`,
};
var tableAllowedKeys: Dynamic = [
  `kind`,
  `title`,
  `source`,
  `note`,
  `rows`,
  `columns`,
  `cells`,
];
var tableSplitKeys: Dynamic = [`rows`, `columns`];
var isTableRecord: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => typeof input == `object` && !!input && !Array.isArray(input);
var tableFieldOrUndefined: Dynamic = (
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => (Object.hasOwn(input, options) ? input[options] : undefined);
var quoteTableValue: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => JSON.stringify(input);
var prefixProblemPaths: Dynamic = (
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  options.map(
    (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
      ...input2,
      path: [...input, ...input2.path],
    }),
  );
function validateTableSplits(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (!Array.isArray(input)) {
    context.push({
      path: [options],
      message: isTableRecord(input)
        ? `${tableSplitsRequirement(options)} — ${singleSplitListHint(options)}`
        : tableSplitsRequirement(options),
    });
    return;
  }
  if (input.length === 0) {
    context.push({
      path: [options],
      message: emptySplitsProblem(options),
    });
    return;
  }
  if (input.length > maxTableSplits(options)) {
    context.push({
      path: [options],
      message: tooManySplitsProblem(options, input.length),
    });
    return;
  }
  input.forEach(
    (
      input2?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic =>
      validateStatGroup(tableSplitSchema, input2, [options, options2], context),
  );
  input.forEach(
    (
      input2?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      if (!isTableRecord(input2)) return;
      let value: Dynamic = tableFieldOrUndefined(input2, `by`);
      let value2: Dynamic = tableFieldOrUndefined(input2, `order`);
      let value3: Dynamic =
        isTableRecord(value2) &&
        tableFieldOrUndefined(value2, `kind`) === `list`
          ? tableFieldOrUndefined(value2, `values`)
          : undefined;
      if (Array.isArray(value3)) {
        if (
          options === `columns` &&
          typeof value == `string` &&
          value3.length > 12
        ) {
          context.push({
            path: [options, options2, `by`],
            message: tooManyTableColumnsProblem(value, value3.length),
          });
        }
        if (options === `rows` && value3.length > 50) {
          context.push({
            path: [options, options2, `order`],
            message: tooManyTableRowsProblem(value3.length),
          });
        }
      }
    },
  );
}
var tooManyTableRowsProblem = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
) => `lists ${input} values; 50 rows allowed — filter or bucket in the query`;
var tooManyTableColumnsProblem = (
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
) =>
  `${input} has ${options} values; 12 allowed — filter or bucket in the query, or move the column to rows`;
function validateColumnCell(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  let filtered: Dynamic = Object.keys(input).filter(
    (input2?: Dynamic, ..._extraArguments: unknown[]) =>
      !columnCellAllowedKeys.includes(input2),
  );
  if (filtered.length > 0) {
    items.push({
      path: [],
      message: unknownKeysProblem(
        filtered,
        `a column cell takes ${columnCellAllowedKeys.join(`, `)}`,
        TableGrammarHints2,
      ),
    });
  }
  let value: Dynamic = validateDefinitionSource(input, options, context);
  if (value !== null) {
    items.push(value);
  }
  if (tableFieldOrUndefined(input, `column`) === undefined) {
    items.push({
      path: [`column`],
      message: `is required — ${fieldValueRequirement(columnCellFields.column)}`,
    });
  }
  for (let [value2, value3] of Object.entries(columnCellFields) as Dynamic) {
    let value4: Dynamic = tableFieldOrUndefined(input, value2);
    if (value4 !== undefined) {
      validateFieldValue(value3, value4, [value2], items);
    }
  }
  return items;
}
function validateChartCell(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = tableFieldOrUndefined(input, `marks`);
  if (
    Array.isArray(value) &&
    value.some(
      (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
        isTableRecord(input2) &&
        tableFieldOrUndefined(input2, `type`) === `tile`,
    )
  )
    return [
      {
        path: [],
        message: tableGrammarMessage4,
        statement: true,
      },
    ];
  let value2: Dynamic = tableFieldOrUndefined(input, `axes`);
  let value3: Dynamic = isTableRecord(value2)
    ? tableFieldOrUndefined(value2, `y`)
    : undefined;
  if (Array.isArray(value3) && value3.length >= 2)
    return [
      {
        path: [`axes`, `y`],
        message: compactYAxisCountProblem(value3.length),
      },
    ];
  let value4: Dynamic = validateChartDefinition(input, [], {
    sourceNames: context.sourceNames,
    repeats: true,
    cell: true,
    enclosingSource: options.source ?? null,
  });
  if (
    value4.length === 0 &&
    options.source === undefined &&
    tableFieldOrUndefined(input, `source`) === undefined
  ) {
    if (
      !(
        Array.isArray(value) &&
        value.every(
          (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
            isTableRecord(input2) &&
            typeof tableFieldOrUndefined(input2, `source`) == `string`,
        )
      )
    ) {
      value4.push({
        path: [`source`],
        message: tableGrammarStatGrammarMessage7Alias,
      });
    }
  }
  if (Array.isArray(value)) {
    value.forEach(
      (
        input2?: Dynamic,
        options2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (
          isTableRecord(input2) &&
          tableFieldOrUndefined(input2, `type`) === `point` &&
          tableFieldOrUndefined(input2, `size`) !== undefined
        ) {
          value4.push({
            path: [`marks`, options2, `size`],
            message: tableGrammarMessage3,
            statement: true,
          });
        }
      },
    );
  }
  return value4;
}
function validateTableCells(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  value?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  if (input === undefined) {
    value.push({
      path: [`cells`],
      message: TableGrammarMessage,
    });
    return;
  }
  if (!Array.isArray(input)) {
    value.push({
      path: [`cells`],
      message: isTableRecord(input)
        ? `${tableGrammarStyles} — ${tableGrammarStyles2}`
        : tableGrammarStyles,
    });
    return;
  }
  if (input.length === 0) {
    value.push({
      path: [`cells`],
      message: tableGrammarMessage6,
    });
    return;
  }
  if (input.length > 10) {
    value.push({
      path: [`cells`],
      message: tableCellCountProblem(input.length),
    });
    return;
  }
  input.forEach(
    (
      input2?: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let items: Dynamic = [`cells`, options2];
      if (!isTableRecord(input2)) {
        value.push({
          path: [...items],
          message:
            typeof input2 == `string`
              ? `${tableGrammarStyles3} — ${tableGrammarStyles4.replace(`<value>`, JSON.stringify(input2).slice(1, -1))}`
              : tableGrammarStyles3,
        });
        return;
      }
      if (tableFieldOrUndefined(input2, `cells`) !== undefined) {
        value.push({
          path: [...items],
          message: unknownKeysProblem([`cells`], ``, {
            cells: tableGrammarMessage8,
          }),
        });
        return;
      }
      let value2: Dynamic = tableFieldOrUndefined(input2, `kind`);
      if (value2 === undefined) {
        value.push({
          path: [...items, `kind`],
          message: tableGrammarMessage9,
        });
        return;
      }
      if (
        typeof value2 != `string` ||
        !tableGrammarStatColumnChartValues.includes(value2)
      ) {
        let value3: Dynamic =
          typeof value2 == `string`
            ? ownFieldOrUndefined(TableGrammarKpi, value2.toLowerCase())
            : undefined;
        value.push({
          path: [...items, `kind`],
          message:
            value3 === undefined
              ? TableGrammarJoin
              : `${TableGrammarJoin} — ${value3}`,
        });
        return;
      }
      let state: Dynamic = {
        ...input2,
      };
      if (tableFieldOrUndefined(input2, `note`) !== undefined) {
        value.push({
          path: [...items, `note`],
          message: tableGrammarTheNoteBelongsToTheTable,
          statement: true,
        });
        delete state.note;
      }
      if (value2 === `chart`)
        for (let value3 of tableGrammarColumnsWrapValues as Dynamic)
          if (tableFieldOrUndefined(input2, value3) !== undefined) {
            value.push({
              path: [...items],
              message: compactChartProblem(value3),
            });
            delete state[value3];
          }
      if (value2 === `stat`) {
        (value.push as Dynamic)(
          ...prefixProblemPaths(
            items,
            validateStatDefinition(state, {
              sourceNames: context.sourceNames,
              enclosing: options,
            }),
          ),
        );
      } else {
        if (value2 === `column`) {
          (value.push as Dynamic)(
            ...prefixProblemPaths(
              items,
              validateColumnCell(state, options, context.sourceNames),
            ),
          );
        } else {
          (value.push as Dynamic)(
            ...prefixProblemPaths(
              items,
              validateChartCell(state, options, context),
            ),
          );
        }
      }
    },
  );
}
var tableSourceContext: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => {
  let value: Dynamic = tableFieldOrUndefined(input, `source`);
  return {
    source: typeof value == `string` && value !== `` ? value : undefined,
  };
};
function validateTableShape(
  input?: Dynamic,
  options: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  if (
    tableFieldOrUndefined(input, `rows`) === undefined &&
    tableFieldOrUndefined(input, `columns`) === undefined
  ) {
    items.push({
      path: [`rows`],
      message: tableGrammarMessage7,
    });
  }
  for (let value of tableSplitKeys as Dynamic) {
    let value2: Dynamic = tableFieldOrUndefined(input, value);
    if (value2 !== undefined) {
      validateTableSplits(value2, value, items);
    }
  }
  validateTableCells(
    tableFieldOrUndefined(input, `cells`),
    tableSourceContext(input),
    options,
    items,
  );
  return items;
}
function validateTableDefinition(
  input?: Dynamic,
  options: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = findUnsupportedVisualizeFeature(input, `table`);
  if (value !== null) return [value];
  let items: Dynamic = [];
  let filtered: Dynamic = Object.keys(input).filter(
    (input2?: Dynamic, ..._extraArguments: unknown[]) =>
      !tableAllowedKeys.includes(input2),
  );
  if (filtered.length > 0) {
    items.push({
      path: [],
      message: unknownKeysProblem(
        filtered,
        `a table takes ${tableAllowedKeys.join(`, `)}`,
        TableGrammarWrap,
      ),
    });
  }
  if (tableFieldOrUndefined(input, `kind`) !== `table`) {
    let value3: Dynamic = validateVisualizationKind(input);
    items.push(
      `kind` in value3
        ? {
            path: [`kind`],
            message: tableGrammarMessage5,
          }
        : value3,
    );
  }
  let value2: Dynamic = tableFieldOrUndefined(input, `source`);
  if (value2 === undefined)
    items.push({
      path: [`source`],
      message: tableSplitSourceRequirement(
        tableFieldOrUndefined(input, `rows`) === undefined &&
          tableFieldOrUndefined(input, `columns`) !== undefined
          ? `columns`
          : `rows`,
      ),
    });
  else {
    let value3: Dynamic = sourceNameProblem(value2, options.sourceNames);
    if (value3 !== null) {
      items.push({
        path: [`source`],
        message: value3,
      });
    }
  }
  for (let [value3, value4] of Object.entries(tableHeadingFields) as Dynamic) {
    let value5: Dynamic = tableFieldOrUndefined(input, value3);
    if (value5 !== undefined) {
      validateFieldValue(value4, value5, [value3], items);
    }
  }
  (items.push as Dynamic)(...validateTableShape(input, options));
  if (items.length === 0) {
    (items.push as Dynamic)(...tableSemanticProblems(input));
  }
  return items;
}
function tableSemanticProblems(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  let value: Dynamic = input.cells.flatMap(
    (
      entry?: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => (entry.kind === `chart` ? [options] : []),
  );
  value.slice(2).forEach(
    (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      items.push({
        path: [`cells`, input2],
        message: tableGrammarMessage,
        statement: true,
      }),
  );
  if ((input.columns ?? []).length > 0)
    for (let value4 of value as Dynamic)
      items.push({
        path: [`cells`, value4],
        message: tableGrammarMessage2,
        statement: true,
      });
  let value2: Dynamic = input.columns?.[0];
  let value3: Dynamic =
    value2?.order?.kind === `list` ? value2.order.values.length : 0;
  if (value3 > 0 && value3 <= 12 && input.cells.length * value3 > 24) {
    items.push({
      path: [`columns`, 0],
      message: expandedTableWidthProblem(input.cells.length, value3),
    });
  }
  let entries: Dynamic = new (Map as Dynamic)();
  for (let value4 of tableSplitKeys as Dynamic)
    (input[value4] ?? []).forEach(
      (
        input2?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let value5: Dynamic = `${value4}[${options}]`;
        let entry: Dynamic = entries.get(input2.by);
        if (entry === undefined) {
          entries.set(input2.by, value5);
        } else {
          items.push({
            path: [value4, options, `by`],
            message: `repeats ${entry}.by ${quoteTableValue(input2.by)} — one column slices the rows OR the header band, once`,
          });
        }
      },
    );
  return items;
}
var tableSchema: Dynamic = {
  kind: `group`,
  fields: {
    ...tableHeadingFields,
    rows: tableSplitsSchema(`rows`),
    columns: tableSplitsSchema(`columns`),
  },
  tier: `data-determining`,
  label: `Table`,
  help: `Cell templates sliced by rows and columns.`,
};
function tableFieldTier(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let [value, ...value2]: Dynamic = input;
  if (value === `cells`) {
    let [value3, value4, ...value5]: Dynamic = value2;
    if (!isValidPathIndex(value3, 10) || value4 === undefined)
      return `data-determining`;
    let value6: Dynamic = String(value4);
    if (TableGrammarNote.includes(value6)) return `data-determining`;
    let values: Dynamic = new (Set as Dynamic)();
    if (
      value6 !== `kind` &&
      statGrammarKindTitleSourceValues.includes(value6)
    ) {
      values.add(statFieldTier([value6, ...value5]));
    }
    if (Object.hasOwn(columnCellSchema.fields, value6)) {
      values.add(fieldTierAtPath(columnCellSchema, [value6, ...value5]));
    }
    if (Object.hasOwn(ChartGrammarChart3.fields, value6)) {
      values.add(fieldTierAtPath(ChartGrammarChart3, [value6, ...value5]));
    }
    return values.size === 1 ? [...values][0] : `data-determining`;
  }
  return fieldTierAtPath(tableSchema, input);
}
registerChartTierOverride(
  `table`,
  (
    input?: Dynamic,
    options?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => {
    let value: Dynamic = validateTableDefinition(input, options)[0];
    return value === undefined ? null : formatDefinitionProblem(value);
  },
);
registerStatTierOverride([`cells`, `rows`, `columns`], tableFieldTier);
var isDisplayTextRecord: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => typeof input == `object` && !!input && !Array.isArray(input);
/* Subsystem: display-text */
function rootFieldOf(entry?: Dynamic, ..._extraArguments: unknown[]): Dynamic {
  let value: Dynamic = isDisplayTextRecord(entry) ? entry.kind : undefined;
  return value === `stat`
    ? StatGrammarStat
    : value === `table`
      ? tableSchema
      : ChartGrammarChart3;
}
function displayTextPaths(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  let value: Dynamic = rootFieldOf(input);
  collectDisplayTextPaths(input, value, [], false, items);
  if (
    value === tableSchema &&
    isDisplayTextRecord(input) &&
    Array.isArray(input.cells)
  ) {
    input.cells.forEach(
      (
        entry?: Dynamic,
        options?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        let value2: Dynamic = isDisplayTextRecord(entry)
          ? ownFieldOrUndefined(cellKindSchemas, String(entry.kind))
          : undefined;
        if (value2 !== undefined) {
          collectDisplayTextPaths(
            Object.fromEntries(
              Object.entries(entry).filter(
                ([input2]: Dynamic, ..._extraArguments: unknown[]) =>
                  !TableGrammarNote.includes(input2),
              ),
            ),
            value2,
            [`cells`, options],
            false,
            items,
          );
        }
      },
    );
  }
  return items;
}
var cellKindSchemas: Dynamic = {
  stat: StatGrammarStat,
  column: columnCellSchema,
  chart: ChartGrammarChart3,
};
var visualizationSchemas: Dynamic = [
  ChartGrammarChart3,
  StatGrammarStat,
  tableSchema,
];
function displayTextMaxOf(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let items: Dynamic = [];
  for (let value of visualizationSchemas as Dynamic)
    collectDisplayTextLimits(value, input, items);
  if (input[0] === `cells` && typeof input[1] == `number` && input.length > 2) {
    let slice: Dynamic = input.slice(2);
    if (!TableGrammarNote.includes(String(slice[0])))
      for (let value of Object.values(cellKindSchemas) as Dynamic)
        collectDisplayTextLimits(value, slice, items);
  }
  return items.length > 0 ? (Math.min as Dynamic)(...items) : 200;
}
function collectDisplayTextLimits(
  entry?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  switch (entry.kind) {
    case `text`:
      if (options.length === 0 && entry.tier === `display-only`) {
        context.push(entry.max);
      }
      return;
    case `group`: {
      let value: Dynamic =
        typeof options[0] == `string`
          ? ownFieldOrUndefined(entry.fields, options[0])
          : undefined;
      if (value !== undefined) {
        collectDisplayTextLimits(value, options.slice(1), context);
      }
      return;
    }
    case `items`:
      if (typeof options[0] == `number`) {
        collectDisplayTextLimits(entry.item, options.slice(1), context);
      }
      return;
    case `variant`:
      for (let value of Object.values(entry.variants) as Dynamic)
        collectDisplayTextLimits(value, options, context);
      return;
    default:
      return;
  }
}
function collectDisplayTextPaths(
  input?: Dynamic,
  entry?: Dynamic,
  context?: Dynamic,
  value?: Dynamic,
  extra?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  switch (entry.kind) {
    case `text`:
      if (entry.tier === `display-only` && typeof input == `string`) {
        extra.push({
          path: context,
          attr:
            context.length <= 8
              ? collectEditorSelectionAndTablesJoin(context)
              : null,
          value: input,
          max: entry.max,
          required: value,
        });
      }
      return;
    case `group`:
      if (!isDisplayTextRecord(input)) return;
      for (let [value2, value3] of Object.entries(entry.fields) as Dynamic)
        if (Object.hasOwn(input, value2)) {
          collectDisplayTextPaths(
            input[value2],
            value3,
            [...context, value2],
            (entry.required ?? []).includes(value2),
            extra,
          );
        }
      return;
    case `items`:
      if (!Array.isArray(input)) return;
      input.forEach(
        (
          input2?: Dynamic,
          options?: Dynamic,
          ..._extraArguments: unknown[]
        ): Dynamic =>
          collectDisplayTextPaths(
            input2,
            entry.item,
            [...context, options],
            false,
            extra,
          ),
      );
      return;
    case `variant`: {
      if (!isDisplayTextRecord(input)) return;
      let value2: Dynamic = input[entry.key];
      let value3: Dynamic =
        typeof value2 == `string`
          ? ownFieldOrUndefined(entry.variants, value2)
          : undefined;
      if (value3 !== undefined) {
        collectDisplayTextPaths(input, value3, context, value, extra);
      }
      return;
    }
    default:
      return;
  }
}
function displayTextValueProblem(
  input?: Dynamic,
  options: Dynamic = [],
  ..._extraArguments: unknown[]
): Dynamic {
  if (input === null) return;
  if (input.length === 0) return EditorSelectionAndTablesReason2;
  let value: Dynamic = displayTextMaxOf(options);
  if (input.length > value)
    return `${options.map(String).join(`.`) || `value`} is ${input.length} characters; ${value} allowed`;
}
function withDisplayText(
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (context !== null && context.length === 0)
    return {
      error: EditorSelectionAndTablesReason2,
    };
  let text: Dynamic = options.map(String).join(`.`);
  let match: Dynamic = displayTextPaths(input).find(
    (input2?: Dynamic, ..._extraArguments: unknown[]) =>
      input2.path.map(String).join(`.`) === text,
  );
  if (match === undefined) {
    if (displayFieldAtPath(input, options) === undefined)
      return {
        error: `${text || `(root)`} is not a display string of this definition`,
      };
    if (context === null)
      return {
        error: `${text} is already absent — there is no text to delete`,
      };
    let value6: Dynamic = displayTextValueProblem(context, options);
    if (value6 !== undefined)
      return {
        error: value6,
      };
    let value7: Dynamic = structuredClone(input);
    let value8: Dynamic = value7;
    for (let value9 of options.slice(0, -1) as Dynamic) value8 = value8[value9];
    value8[options[options.length - 1]] = context;
    return {
      definition: value7,
    };
  }
  if (match.attr === null)
    return {
      error: `${text} is deeper than the 8 segments an inline edit addresses`,
    };
  let value: Dynamic = displayTextValueProblem(context, options);
  if (value !== undefined)
    return {
      error: value,
    };
  if (context === null && match.required)
    return {
      error: `${text} is required — delete the whole entry, not its text`,
    };
  let value2: Dynamic = structuredClone(input);
  let value3: Dynamic = value2;
  for (let value6 of options.slice(0, -1) as Dynamic) value3 = value3[value6];
  let value4: Dynamic = options[options.length - 1];
  let value5: Dynamic = value3;
  if (context === null) {
    delete value5[value4];
  } else {
    value5[value4] = context;
  }
  return {
    definition: value2,
  };
}
function displayFieldAtPath(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  if (options.length === 0 || options.length > 8) return;
  let value: Dynamic = rootFieldOf(input);
  let value2: Dynamic = input;
  let index: Dynamic = 0;
  if (
    value === tableSchema &&
    options[0] === `cells` &&
    typeof options[1] == `number`
  ) {
    let value3: Dynamic =
      isDisplayTextRecord(input) && Array.isArray(input.cells)
        ? input.cells[options[1]]
        : undefined;
    let value4: Dynamic = isDisplayTextRecord(value3)
      ? ownFieldOrUndefined(cellKindSchemas, String(value3.kind))
      : undefined;
    if (value4 === undefined || TableGrammarNote.includes(String(options[2])))
      return;
    value = value4;
    value2 = value3;
    index = 2;
  }
  for (; index < options.length; index++) {
    let value3: Dynamic = options[index];
    for (; value.kind === `variant`; ) {
      let value4: Dynamic = isDisplayTextRecord(value2)
        ? value2[value.key]
        : undefined;
      let value5: Dynamic =
        typeof value4 == `string`
          ? ownFieldOrUndefined(value.variants, value4)
          : undefined;
      if (value5 === undefined) return;
      value = value5;
    }
    if (value.kind === `group`) {
      if (!isDisplayTextRecord(value2) || typeof value3 != `string`) return;
      let value4: Dynamic = ownFieldOrUndefined(value.fields, value3);
      if (value4 === undefined) return;
      if (index === options.length - 1)
        return value4.kind === `text` &&
          value4.tier === `display-only` &&
          !Object.hasOwn(value2, value3)
          ? value2
          : undefined;
      if (!Object.hasOwn(value2, value3)) return;
      value2 = value2[value3];
      value = value4;
      continue;
    }
    if (value.kind === `items`) {
      if (
        !Array.isArray(value2) ||
        typeof value3 != `number` ||
        value3 < 0 ||
        value3 >= value2.length
      )
        return;
      value2 = value2[value3];
      value = value.item;
      continue;
    }
    return;
  }
}
export {
  displayTextMaxOf,
  displayTextPaths,
  displayTextValueProblem,
  rootFieldOf,
  withDisplayText,
};
