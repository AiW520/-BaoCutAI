/** BaoCut: data enums and validation from app-core-BE6n4d7F.js. */
import type { Dynamic } from "./types";


var dataEnumsAndValidationCreateUpdateReadDeleteValues: string[];

var dataEnumsAndValidationJsonBlobProseIronValues: string[];

var dataEnumsAndValidationAllowDenyValues: string[];

var dataEnumsAndValidationHumanInternalExternalValues: string[];

var dataEnumsAndValidationAssistantExecutorHostValues: string[];

var dataEnumsAndValidationMcpValues: string[];

var dataEnumsAndValidationCreateUpdateDeleteValues: string[];

var dataEnumsAndValidationProjectFileNodeRunValues: string[];

var dataEnumsAndValidationAccessResultValues: string[];

var resolveDataEnumsAndValidationIncludes: Dynamic;

var DataEnumsAndValidationFilter: string[];

var dataEnumsAndValidationProjectSuiteValues: string[];

var DataEnumsAndValidationFilter2: string[];

var dataEnumsAndValidationSuiteProjectValues: string[];

var DataEnumsAndValidationMessage: string;

var DataEnumsAndValidationStatus: Readonly<{
    status: "aborted";
}>;

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeDataEnumsAndValidationStep1(): void {
  (dataEnumsAndValidationCreateUpdateReadDeleteValues = [
    `create`,
    `update`,
    `read`,
    `delete`,
  ]);
  [...dataEnumsAndValidationCreateUpdateReadDeleteValues];
  (dataEnumsAndValidationJsonBlobProseIronValues = [
    `json`,
    `blob`,
    `prose`,
    `iron`,
    `text`,
    `widget`,
    `database`,
  ]);
  (dataEnumsAndValidationAllowDenyValues = [`allow`, `deny`]);
  (dataEnumsAndValidationHumanInternalExternalValues = [
    `human`,
    `internal`,
    `external`,
  ]);
  (dataEnumsAndValidationAssistantExecutorHostValues = [
    `assistant`,
    `executor`,
    `host`,
  ]);
  (dataEnumsAndValidationMcpValues = [`mcp`]);
  [
    ...dataEnumsAndValidationAssistantExecutorHostValues,
    ...dataEnumsAndValidationMcpValues,
  ];
  (dataEnumsAndValidationCreateUpdateDeleteValues = [
    `create`,
    `update`,
    `delete`,
  ]);
  (dataEnumsAndValidationProjectFileNodeRunValues = [
    `project`,
    `file`,
    `node`,
    `run`,
    `utterance`,
    `row`,
    `table`,
    `routine`,
    `enum`,
    `spec`,
    `suite`,
    `version`,
    `blob`,
    `database`,
    `access`,
    `result`,
  ]);
  (dataEnumsAndValidationAccessResultValues = [`access`, `result`]);
  (resolveDataEnumsAndValidationIncludes = (
    dataEnumsAndValidationIncludes?: Dynamic,
    ..._extraArguments: unknown[]
  ) =>
    dataEnumsAndValidationIncludes !== undefined &&
    dataEnumsAndValidationAccessResultValues.includes(
      dataEnumsAndValidationIncludes,
    ));
  (DataEnumsAndValidationFilter = dataEnumsAndValidationProjectFileNodeRunValues.filter(
      (
        dataEnumsAndValidationProjectFileNodeRunValue?: Dynamic,
        ..._extraArguments: unknown[]
      ) =>
        !resolveDataEnumsAndValidationIncludes(
          dataEnumsAndValidationProjectFileNodeRunValue,
        ),
    ));
  (dataEnumsAndValidationProjectSuiteValues = [`project`, `suite`]);
  (DataEnumsAndValidationFilter2 = DataEnumsAndValidationFilter.filter(
    (DataEnumsAndValidationFilter3?: Dynamic, ..._extraArguments: unknown[]) =>
      !dataEnumsAndValidationProjectSuiteValues.includes(
        DataEnumsAndValidationFilter3,
      ),
  ));
  (dataEnumsAndValidationSuiteProjectValues = [`suite`, `project`]);
  (DataEnumsAndValidationMessage = ` · `);
  (DataEnumsAndValidationStatus = Object.freeze({
    status: `aborted`,
  }));
}

export {
  DataEnumsAndValidationFilter,
  DataEnumsAndValidationFilter2,
  DataEnumsAndValidationMessage,
  DataEnumsAndValidationStatus,
  dataEnumsAndValidationAllowDenyValues,
  dataEnumsAndValidationAssistantExecutorHostValues,
  dataEnumsAndValidationCreateUpdateDeleteValues,
  dataEnumsAndValidationCreateUpdateReadDeleteValues,
  dataEnumsAndValidationHumanInternalExternalValues,
  dataEnumsAndValidationJsonBlobProseIronValues,
  dataEnumsAndValidationMcpValues,
  dataEnumsAndValidationProjectFileNodeRunValues,
  dataEnumsAndValidationSuiteProjectValues,
  resolveDataEnumsAndValidationIncludes,
};
