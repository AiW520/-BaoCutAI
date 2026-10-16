import {
  resolveDataContentAndReferencesReplace2,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  UiOverlaysAndIconsCustomIcon,
} from "../../dependencies";
import type { DatabaseColumn, DatabaseDetailData } from "../project-contracts";
import type * as React from "react";

export const DatabaseCellValue: React.FC<{ value: unknown }> = ({ value }) => {
  return value == null ? (
    <span className={`text-muted`}>{`—`}</span>
  ) : typeof value == `number` ? (
    <span className={`tabular-nums`}>{value}</span>
  ) : typeof value == `boolean` ? (
    String(value)
  ) : (
    resolveDataContentAndReferencesReplace2(
      typeof value == `string` ? value : JSON.stringify(value),
    )
  );
};

export const DatabaseGrid: React.FC<{ database: DatabaseDetailData }> = ({
  database,
}) => {
  const columnTypeLabel = (databaseDetail: DatabaseColumn) =>
    databaseDetail.type.kind === `literal`
      ? databaseDetail.type.type
      : databaseDetail.type.kind;
  return (
    <div className={`flex min-h-0 flex-1 flex-col`} data-testid={`database-detail`}>
      <div className={`flex items-center gap-1 pr-8`}>
        <div className={`text-primary text-heading min-w-0 flex-1 truncate font-medium`}>
          {resolveDataContentAndReferencesReplace2(database.name)}
        </div>
      </div>
      {database.columns.length > 0 && (
        <div className={`mt-3 flex flex-wrap items-center gap-1.5`}>
          {database.columns.map((event) => (
            <span
              className={`bg-alpha-1 text-secondary text-footnote flex items-center gap-1 rounded px-1.5 py-0.5`}
              key={event.key}
            >
              <span className={`text-primary`}>
                {resolveDataContentAndReferencesReplace2(event.key)}
              </span>
              <span className={`text-muted`}>{columnTypeLabel(event)}</span>
              {event.unique === true ? (
                <span className={`text-muted`}>{`· unique`}</span>
              ) : (
                event.required === true && (
                  <span className={`text-muted`}>{`· required`}</span>
                )
              )}
            </span>
          ))}
        </div>
      )}
      <div className={`text-muted text-footnote mt-2`}>
        {database.totalRows === 0
          ? `No rows yet`
          : database.truncated === true
            ? `Showing ${database.servedRows ?? database.rows.length} of ${database.totalRows} rows`
            : `${database.totalRows} ${database.totalRows === 1 ? `row` : `rows`}`}
      </div>
      {database.rowsNote !== undefined && database.rowsNote !== `` && (
        <div className={`text-secondary text-footnote mt-1`}>
          {resolveDataContentAndReferencesReplace2(database.rowsNote)}
        </div>
      )}
      {database.marks.length > 0 && (
        <div
          className={`text-warning text-footnote mt-2 flex flex-col gap-0.5`}
          data-testid={`database-marks`}
        >
          {database.marks.map((entry) => (
            <div
              className={`flex items-center gap-1`}
              key={`${entry.source}:${entry.kind}`}
            >
              <UiOverlaysAndIconsCustomIcon
                name={`Warning`}
                customSize={11}
                className={`shrink-0`}
              />
              <span>
                {databaseMarkLabels[entry.kind] ?? entry.kind}
                {` — `}
                {entry.count}
              </span>
            </div>
          ))}
        </div>
      )}
      {database.rows.length > 0 && (
        <div className={`mt-3 min-h-0 flex-1 overflow-auto`}>
          <Table>
            <TableHead>
              <TableRow hoverable={false}>
                {database.columns.map((event) => (
                  <TableHeaderCell key={event.key}>
                    {resolveDataContentAndReferencesReplace2(event.key)}
                  </TableHeaderCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {database.rows.map((row) => (
                <TableRow key={`${row.pk.source}:${row.pk.index}`}>
                  {database.columns.map((event) => (
                    <TableCell key={event.key}>
                      <DatabaseCellValue value={row.cells[event.key]} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

const databaseMarkLabels: Readonly<Record<string, string>> = {
  "ref-dangling": `A source reference no longer resolves`,
  "adapter-resolve-failed": `A source couldn't be decoded`,
  "row-keyless": `Rows are missing the unique key`,
  "row-nonconformant": `Rows don't match the columns`,
  "overlay-pk-dangling": `An edit points at a row that's gone`,
};
