import { useEffect, useState } from "react";
import { DetailMessage } from "../detail-message";
import type { DatabaseDetailData, LoadState } from "../project-contracts";
import { loadDatabaseDetail } from "../project-data";
import { DatabaseGrid } from "./grid";
function DatabaseDetail({ pid, dbId }: { pid: string; dbId: string }) {
  const [database, setDatabase] =
    useState<LoadState<DatabaseDetailData | "missing">>(`loading`);
  useEffect(() => {
    let enabled = true;
    setDatabase(`loading`);
    loadDatabaseDetail(pid, dbId).then(
      (result) => enabled && setDatabase(result),
      () => enabled && setDatabase(`err`),
    );
    return (): undefined => {
      enabled = false;
    };
  }, [pid, dbId]);
  if (database === `loading`) return <DetailMessage text={`loading…`} />;
  if (database === `missing`)
    return <DetailMessage text={`That database isn't available in this project`} />;
  if (database === `err`) return <DetailMessage text={`Couldn't load this database.`} />;
  return <DatabaseGrid database={database} />;
}
export { DatabaseDetail };
