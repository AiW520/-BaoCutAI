/** BaoCut: ask cards from index-CX4IZqzA.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  Button,
  originalJsxProps,
  resolveCommentsActionsAndSelectionCell,
  resolveCommentsActionsAndSelectionLines2,
  resolveDataModelSchemasHasOwn,
  resolvePlatformSyncAndRoutingCompact,
} from "../dependencies";
import {
  React,
  jsxRuntime,
} from "../bootstrap";
import {
  MAX_SOURCE_PREVIEW_ROWS,
  sourceCellLabel,
} from "./target-source-popover";

function TargetDataRows(
  { rows: rows, pin: pin, note: note, total: total, locale: locale }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let targetDataRowsResult: Dynamic = resolvePlatformSyncAndRoutingCompact();
  let items: Dynamic = ((..._extraArguments: unknown[]): Dynamic => {
    let items2: Dynamic = [];
    for (let targetDataRowsResult2 of rows as Dynamic)
      for (let targetDataRowsResult3 of Object.keys(
        targetDataRowsResult2,
      ) as Dynamic)
        if (!items2.includes(targetDataRowsResult3)) {
          items2.push(targetDataRowsResult3);
        }
    return items2;
  })();
  let hiRow: Dynamic = resolveCommentsActionsAndSelectionCell(pin);
  let column: Dynamic = pin?.kind === `cell` ? pin.column : null;
  let max = Math.max(1, Math.ceil(rows.length / MAX_SOURCE_PREVIEW_ROWS));
  let floor =
    hiRow !== null && hiRow < rows.length
      ? Math.floor(hiRow / MAX_SOURCE_PREVIEW_ROWS)
      : 0;
  let [targetDataRowsState, setTargetDataRowsState]: Dynamic = (0,
  React.useState)(null);
  let page2: Dynamic =
    targetDataRowsState !== null &&
    targetDataRowsState.rows === rows &&
    targetDataRowsState.hiRow === hiRow
      ? targetDataRowsState.page
      : floor;
  let setTargetDataRowsState2: Dynamic = (
    targetDataRows?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic =>
    setTargetDataRowsState({
      rows: rows,
      hiRow: hiRow,
      page: Math.min(Math.max(0, targetDataRows), max - 1),
    });
  let amount = page2 * MAX_SOURCE_PREVIEW_ROWS;
  let min = Math.min(rows.length, amount + MAX_SOURCE_PREVIEW_ROWS);
  let elementRef: Dynamic = (0, React.useRef)(null);
  let elementRef2: Dynamic = (0, React.useRef)(null);
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      if (elementRef2.current === null) {
        if (elementRef.current !== null) {
          elementRef.current.scrollTop = 0;
        }
      } else {
        elementRef2.current.scrollIntoView?.({
          block: `center`,
          behavior: `auto`,
        });
      }
    },
    [rows, hiRow, page2],
  );
  let toLocaleString: Dynamic = (
    targetDataRows?: Dynamic,
    ..._extraArguments: unknown[]
  ): Dynamic => targetDataRows.toLocaleString(locale);
  let matchesMax = max > 1;
  let total2: Dynamic =
    total !== undefined && total > rows.length ? total : null;
  let total3 = matchesMax
    ? `rows ${toLocaleString(amount + 1)}–${toLocaleString(min)} of ${toLocaleString(rows.length)}` +
      (total2 === null
        ? ``
        : ` loaded · ${toLocaleString(total2)} in the source`)
    : total2 === null
      ? `${toLocaleString(rows.length)} row${rows.length === 1 ? `` : `s`}`
      : `showing ${toLocaleString(rows.length)} of ${toLocaleString(total2)} rows`;
  return (
    <jsxRuntime.Fragment>
      {note !== undefined && (
        <div
          className={`text-secondary bg-alpha-1 mb-2 rounded border px-3 py-2 text-footnote`}
        >
          {note}
        </div>
      )}
      {pin?.kind === `row-not-stored` && (
        <div
          className={`text-secondary bg-alpha-1 mb-2 rounded border px-3 py-2 text-footnote`}
        >
          {`The pin names row `}
          {pin.row}
          {`, but this source stores only `}
          {pin.rowCount}
          {` row`}
          {pin.rowCount === 1 ? `` : `s`}
          {` — the pinned row is not in it.`}
        </div>
      )}
      {pin?.kind === `no-column` && (
        <div
          className={`text-secondary bg-alpha-1 mb-2 rounded border px-3 py-2 text-footnote`}
        >
          {`Row `}
          {pin.row}
          {` is shown below, but it carries no "`}
          {pin.column}
          {`" column — the pinned cell is not in this source.`}
        </div>
      )}
      {pin?.kind === `bad-path` && (
        <div
          className={`text-secondary bg-alpha-1 mb-2 rounded border px-3 py-2 text-footnote`}
        >{`This link's pin address is malformed — showing the source without a highlight.`}</div>
      )}
      <div className={`overflow-hidden rounded-lg border`}>
        <div ref={elementRef} className={`max-h-[60vh] overflow-auto`}>
          <table className={`text-body w-full`}>
            <thead className={`bg-surface-popover sticky top-0 z-10`}>
              <tr className={`bg-alpha-1`}>
                {items.map((item?: Dynamic, ..._extraArguments: unknown[]) => (
                  <th
                    {...originalJsxProps(
                      {
                        className: `text-footnote border-b px-3 py-2 text-left font-medium ${item === column ? `text-primary` : `text-secondary`}`,
                        children: item,
                      },
                      item,
                    )}
                  />
                ))}
              </tr>
            </thead>
            <tbody>
              {rows
                .slice(amount, min)
                .map(
                  (
                    itemsSlice?: Dynamic,
                    index?: Dynamic,
                    ..._extraArguments: unknown[]
                  ) => {
                    let total4: Dynamic = amount + index;
                    let matchesTotal = total4 === hiRow;
                    return (
                      <tr
                        {...originalJsxProps(
                          {
                            ref: matchesTotal ? elementRef2 : undefined,
                            className: `border-b last:border-0 ${matchesTotal ? `bg-alpha-2` : ``}`,
                            "data-pinned-row": matchesTotal ? `` : undefined,
                            children: items.map(
                              (
                                item?: Dynamic,
                                ..._extraArguments: unknown[]
                              ) => {
                                let matchesTotal2 =
                                  matchesTotal && item === column;
                                return (
                                  <td
                                    {...originalJsxProps(
                                      {
                                        "data-pinned-cell": matchesTotal2
                                          ? ``
                                          : undefined,
                                        className: `px-3 py-1.5 ${typeof resolveDataModelSchemasHasOwn(itemsSlice, item) == `number` ? `text-right tabular-nums` : ``} ${matchesTotal2 ? `bg-accent text-accent font-medium` : matchesTotal ? `text-primary` : `text-secondary`}`,
                                        children: sourceCellLabel(
                                          resolveDataModelSchemasHasOwn(
                                            itemsSlice,
                                            item,
                                          ),
                                        ),
                                      },
                                      item,
                                    )}
                                  />
                                );
                              },
                            ),
                          },
                          total4,
                        )}
                      />
                    );
                  },
                )}
            </tbody>
          </table>
        </div>
      </div>
      <div
        className={`mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1`}
      >
        <div
          data-testid={`target-rows-footer`}
          className={`text-secondary text-footnote`}
        >
          {total3}
          {` · ${items.length} column${items.length === 1 ? `` : `s`}`}
        </div>
        {matchesMax && (
          <div
            role={`navigation`}
            aria-label={`Table pagination`}
            data-testid={`target-rows-pager`}
            className={`flex shrink-0 items-center gap-1`}
          >
            <Button
              size={targetDataRowsResult(`xs`)}
              variant={`ghost`}
              disabled={page2 === 0}
              onClick={(..._extraArguments: unknown[]): Dynamic =>
                setTargetDataRowsState2(0)
              }
            >{`First`}</Button>
            <Button
              size={targetDataRowsResult(`xs`)}
              variant={`ghost`}
              iconOnly={true}
              icon={`CaretLeft`}
              aria-label={`Previous page`}
              disabled={page2 === 0}
              onClick={(..._extraArguments: unknown[]): Dynamic =>
                setTargetDataRowsState2(page2 - 1)
              }
            />
            <span
              className={`text-secondary text-footnote px-1 tabular-nums`}
            >{`Page ${toLocaleString(page2 + 1)} of ${toLocaleString(max)}`}</span>
            <Button
              size={targetDataRowsResult(`xs`)}
              variant={`ghost`}
              iconOnly={true}
              icon={`CaretRight`}
              aria-label={`Next page`}
              disabled={page2 >= max - 1}
              onClick={(..._extraArguments: unknown[]): Dynamic =>
                setTargetDataRowsState2(page2 + 1)
              }
            />
            <Button
              size={targetDataRowsResult(`xs`)}
              variant={`ghost`}
              disabled={page2 >= max - 1}
              onClick={(..._extraArguments: unknown[]): Dynamic =>
                setTargetDataRowsState2(max - 1)
              }
            >{`Last`}</Button>
          </div>
        )}
      </div>
    </jsxRuntime.Fragment>
  );
}

function SourceValuePreview(
  { value: value, path: path, testimony: testimony }: Dynamic,
  ..._extraArguments: unknown[]
) {
  let elementRef: Dynamic = (0, React.useRef)(null);
  let memoized: Dynamic = (0, React.useMemo)(
    (..._extraArguments: unknown[]): Dynamic =>
      resolveCommentsActionsAndSelectionLines2(value, path),
    [value, path],
  );
  (0, React.useEffect)(
    (..._extraArguments: unknown[]): undefined => {
      elementRef.current?.scrollIntoView?.({
        block: `center`,
        behavior: `auto`,
      });
    },
    [memoized],
  );
  let { lines: memoized2, pin: memoized3 }: Dynamic = memoized;
  let memoizedSliceText: Dynamic = memoized3
    ? memoized2.slice(0, memoized3.start).join(`
`)
    : ``;
  let memoizedSliceText2: Dynamic = memoized3
    ? memoized2.slice(memoized3.start, memoized3.end + 1).join(`
`)
    : ``;
  let memoizedSliceText3: Dynamic = memoized3
    ? memoized2.slice(memoized3.end + 1).join(`
`)
    : ``;
  return (
    <jsxRuntime.Fragment>
      {memoized.unresolved !== undefined && (
        <div
          className={`text-secondary bg-alpha-1 mb-2 rounded border px-3 py-2 text-footnote`}
        >
          {`The pinned path `}
          <span className={`font-mono`}>{memoized.unresolved.pointer}</span>
          {` no longer resolves in this value — showing it without a highlight.`}
          {testimony != null &&
            ` The pin recorded ${sourceCellLabel(testimony)} here.`}
        </div>
      )}
      {memoized.truncated !== undefined && (
        <div
          className={`text-secondary bg-alpha-1 mb-2 rounded border px-3 py-2 text-footnote`}
        >
          {memoized.truncated.mode === `focus`
            ? `This value is large (${memoized.truncated.total.toLocaleString()} characters) — showing only the pinned node.`
            : `This value is large (${memoized.truncated.total.toLocaleString()} characters) — showing the first ${memoized.truncated.shown.toLocaleString()}.`}
        </div>
      )}
      <pre
        className={`bg-alpha-1 text-secondary overflow-auto rounded-lg border p-3 font-mono text-footnote whitespace-pre`}
      >
        {memoized3 === null ? (
          memoized2.join(`
`)
        ) : (
          <jsxRuntime.Fragment>
            {memoizedSliceText}
            {memoizedSliceText !== `` &&
              `
`}
            <span
              ref={elementRef}
              data-pinned-node={``}
              className={`bg-accent text-accent rounded`}
            >
              {memoizedSliceText2}
            </span>
            {memoizedSliceText3 !== `` &&
              `
`}
            {memoizedSliceText3}
          </jsxRuntime.Fragment>
        )}
      </pre>
    </jsxRuntime.Fragment>
  );
}

export { SourceValuePreview, TargetDataRows };
