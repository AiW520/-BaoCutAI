/** BaoCut: data operation control from app-core-BE6n4d7F.js. */
import type { Dynamic } from "./types";
import { helloImport } from "./platform-core-dependencies";
import { emitTelemetryEvent } from "./platform-core-observability-telemetry-3";
import {
  RATE_LIMITED_CAP_MS,
  pageBusyOf,
  rateLimitedOf,
} from "./platform-core-platform-session-and-sources-1";
import {
  resolveEditorExtensionsBlock,
  resolveEditorExtensionsSess,
  resolveEditorExtensionsTrim,
  resolveEditorExtensionsValue22,
} from "./platform-core-editor-extensions-2";
import {
  filterEditorExtensionsFilter,
  filterEditorExtensionsGap,
  isEditorExtensionsFrom5,
  resolveEditorExtensionsBlocks,
  resolveEditorExtensionsEntries,
  resolveEditorExtensionsFrom6,
  resolveEditorExtensionsSome3,
  resolveEditorExtensionsValue25,
} from "./platform-core-editor-extensions-3";
import {
  platformKeyboardAndSaveStatusValue1000000,
  resolvePlatformKeyboardAndSaveStatusKept,
  resolvePlatformKeyboardAndSaveStatusText,
} from "./platform-core-platform-keyboard-and-save-status";
import {
  createPagesLinkLateLiftEvent,
  createPagesSyncSerialHoleEvent,
} from "./platform-core-observability-browser-and-operation-events-1";
import {
  resolveDataModelSchemasCharCodeAt2,
  resolveDataModelSchemasCharCodeAt4,
  resolveDataModelSchemasDepth4,
  resolveDataModelSchemasLaw,
  resolveDataModelSchemasOps,
  resolveDataModelSchemasValue25,
} from "./platform-core-data-model-schemas-4";
import {
  reportOperationEvent,
  resolveObservabilityBootNode,
  resolveObservabilityBootNode2,
} from "./platform-core-observability-boot";
import { PlatformSyncAndRoutingState2 } from "./platform-core-platform-sync-and-routing-1";
import {
  DataOperationControlEditorOpError,
  DataOperationControlProse,
  collectDataOperationControlValue,
  filterDataOperationControlData,
  filterDataOperationControlOps,
  isDataOperationControlGot,
  isDataOperationControlOps,
  resolveDataOperationControlEvery,
  resolveDataOperationControlForEach,
  resolveDataOperationControlIdInvalid,
  resolveDataOperationControlMinted3,
  resolveDataOperationControlSess2,
  resolveDataOperationControlSpell,
  resolveDataOperationControlValue10,
  resolveDataOperationControlValue17,
} from "./platform-core-data-operation-control-1";
import {
  DataOperationControlARevABellNamedNeverCameInADelta,
  DataOperationControlARowPastRevsThisPageNeverHeard,
  DataOperationControlAccess,
  DataOperationControlAnswerTooLarge,
  DataOperationControlAnswerUnmaskable,
  DataOperationControlAtRevCold,
  DataOperationControlAtRevCold2,
  DataOperationControlMessage10,
  DataOperationControlMessage11,
  DataOperationControlMessage12,
  DataOperationControlMessage13,
  DataOperationControlMessage14,
  DataOperationControlMessage15,
  DataOperationControlMessage2,
  DataOperationControlMessage3,
  DataOperationControlMessage7,
  DataOperationControlMessage8,
  DataOperationControlMessage9,
  DataOperationControlNodeGone2,
  DataOperationControlPageGone,
  DataOperationControlState10,
  DataOperationControlState11,
  DataOperationControlState2,
  DataOperationControlState3,
  DataOperationControlState4,
  DataOperationControlState5,
  DataOperationControlState6,
  DataOperationControlState9,
  DataOperationControlStyles10,
  DataOperationControlStyles4,
  DataOperationControlStyles5,
  DataOperationControlStyles6,
  DataOperationControlStyles7,
  DataOperationControlStyles8,
  DataOperationControlStyles9,
  DataOperationControlTheLogDidNotAnswerWithinWALMS,
  DataOperationControlThisDocumentServiceIsTooOldForThisEditor,
  DataOperationControlVerdictLost,
  DataOperationControlWhy,
  DataOperationControlWhy2,
  DataOperationControlWhy3,
  DataOperationControlWhy4,
  DataOperationControlWhy5,
  dataOperationControlIdentifierPattern,
  dataOperationControlSet10,
  dataOperationControlValue1000,
  dataOperationControlValue100003,
  dataOperationControlValue100004,
  dataOperationControlValue100005,
  dataOperationControlValue10003,
  dataOperationControlValue10004,
  dataOperationControlValue150002,
  dataOperationControlValue2000,
  dataOperationControlValue20002,
  dataOperationControlValue20003,
  dataOperationControlValue20005,
  dataOperationControlValue20006,
  dataOperationControlValue20007,
  dataOperationControlValue2500,
  dataOperationControlValue3000,
  dataOperationControlValue300000,
  dataOperationControlValue3000003,
  dataOperationControlValue300002,
  dataOperationControlValue300003,
  dataOperationControlValue300004,
  dataOperationControlValue30002,
  dataOperationControlValue4000,
  dataOperationControlValue40000,
  dataOperationControlValue40002,
  dataOperationControlValue5000,
  dataOperationControlValue50004,
  dataOperationControlValue6000,
  dataOperationControlValue60000,
  dataOperationControlValue600002,
  dataOperationControlValue64,
  dataOperationControlValue8,
  dataOperationControlValue8000,
  dataOperationControlValue80000,
  filterDataOperationControlDeny,
  isDataOperationControlAllow,
  isDataOperationControlDeny,
  isDataOperationControlDeny2,
  isDataOperationControlDeny3,
  isDataOperationControlDeny4,
  isDataOperationControlDeny5,
  isDataOperationControlDeny6,
  isDataOperationControlDeny7,
  isDataOperationControlDeny8,
  isDataOperationControlUnreachable,
  resolveDataOperationControlAllow,
  resolveDataOperationControlAuthor,
  resolveDataOperationControlEvery3,
  resolveDataOperationControlFloor,
  resolveDataOperationControlFloor2,
  resolveDataOperationControlRound,
  resolveDataOperationControlRound2,
  resolveDataOperationControlRound3,
  resolveDataOperationControlRound4,
  resolveDataOperationControlValue19,
  resolveDataOperationControlValue22,
  resolveDataOperationControlValue23,
  resolveDataOperationControlValue24,
  resolveDataOperationControlValue26,
  resolveDataOperationControlValue27,
  resolveDataOperationControlValue28,
  resolveDataOperationControlVerdict,
  resolveDataOperationControlWhy,
  resolveDataOperationControlWords,
} from "./platform-core-data-operation-control-2";
import {
  DataOperationControlIdRefused,
  DataOperationControlMessage16,
  collectDataOperationControlContent,
  collectDataOperationControlSome,
  dataOperationControlIdentifierPattern2,
  dataOperationControlIdentifierPattern3,
  dataOperationControlIdentifierPattern4,
  dataOperationControlPattern11,
  dataOperationControlPattern8,
  dataOperationControlSet11,
  dataOperationControlSet13,
  dataOperationControlSet14,
  dataOperationControlSet15,
  dataOperationControlSet16,
  dataOperationControlSet17,
  dataOperationControlSet19,
  dataOperationControlSet20,
  dataOperationControlSet21,
  dataOperationControlValue256,
  filterDataOperationControlContent,
  getDataOperationControlSize,
  isDataOperationControlBatchesDone,
  isDataOperationControlDeny9,
  isDataOperationControlRevive,
  isPlainRecord,
  resolveDataOperationControlAnchorGone,
  resolveDataOperationControlAsOf,
  resolveDataOperationControlBatchesDone,
  resolveDataOperationControlBid,
  resolveDataOperationControlBlocks2,
  resolveDataOperationControlBlocks3,
  resolveDataOperationControlBlocks4,
  resolveDataOperationControlChars3,
  resolveDataOperationControlChars4,
  resolveDataOperationControlChildren,
  resolveDataOperationControlDeny,
  resolveDataOperationControlEdit,
  resolveDataOperationControlExec,
  resolveDataOperationControlFlat3,
  resolveDataOperationControlFlatMap2,
  resolveDataOperationControlFrom,
  resolveDataOperationControlHeader,
  resolveDataOperationControlInline,
  resolveDataOperationControlInsert,
  resolveDataOperationControlIsInteger2,
  resolveDataOperationControlKStart,
  resolveDataOperationControlLife,
  resolveDataOperationControlMinted4,
  resolveDataOperationControlOps2,
  resolveDataOperationControlParentId,
  resolveDataOperationControlReduce,
  resolveDataOperationControlReplace2,
  resolveDataOperationControlReplace3,
  resolveDataOperationControlRevive2,
  resolveDataOperationControlSome2,
  resolveDataOperationControlSome3,
  resolveDataOperationControlStartsWith,
  resolveDataOperationControlSure,
  resolveDataOperationControlText,
  resolveDataOperationControlUnavailable,
  resolveDataOperationControlValue30,
  updateDataOperationControlBid,
  updateDataOperationControlEditorSaid,
} from "./platform-core-data-operation-control-4";
import { createOperationNodePaintAndWords } from "./platform-core-operation-node-paint-and-words";
import { createOperationNodeMountAndReplay } from "./platform-core-operation-node-mount-and-replay";
import { createOperationNodeBlockReads } from "./platform-core-operation-node-block-reads";
import { createOperationNodeFeed } from "./platform-core-operation-node-feed";
import { createOperationNodeGap } from "./platform-core-operation-node-gap";
import { createOperationNodeTransport } from "./platform-core-operation-node-transport";
import { createOperationNodeRead } from "./platform-core-operation-node-read";
import { createOperationNodeDelta } from "./platform-core-operation-node-delta";
import { createOperationNodeProposals } from "./platform-core-operation-node-proposals";
import { createOperationNodeHealing } from "./platform-core-operation-node-healing";
import { createOperationNodePump } from "./platform-core-operation-node-pump";
import { createOperationNodeWrite } from "./platform-core-operation-node-write";
import { createOperationNodeCompletion } from "./platform-core-operation-node-completion";
import { createOperationTransport } from "./platform-core-operation-transport";
import { createOperationCapabilities } from "./platform-core-operation-capabilities";
import { createOperationLifeLocks } from "./platform-core-operation-life-locks";
import { createOperationLinkState } from "./platform-core-operation-link-state";
import { createOperationFacts } from "./platform-core-operation-facts";
import { createOperationStatus } from "./platform-core-operation-status";
import { createOperationAccess } from "./platform-core-operation-access";
import { createOperationConnectivity } from "./platform-core-operation-connectivity";
import { createOperationSession } from "./platform-core-operation-session";
import { createOperationRecovery } from "./platform-core-operation-recovery";
import { createOperationReopened } from "./platform-core-operation-reopened";
import { installOperationNodeMethods } from "./platform-core-operation-node-methods";
import type { OperationControllerScope } from "./type-models/platform-core-operation";
var dataOperationControlValue0: number;
function loadDataOperationControlVerdict(
  dataOperationControlVerdict?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  // BaoCut: accessor creation does not read the still-uninitialized controller bindings.
  const operationScope: OperationControllerScope = {
    get judged() {
      return judged;
    },
    get enabled21() {
      return enabled21;
    },
    set enabled21(operationValue: boolean) {
      enabled21 = operationValue;
    },
    get lookup() {
      return lookup;
    },
    get loadDataOperationControlVerdictHandler27() {
      return loadDataOperationControlVerdictHandler27;
    },
    get dataOperationControlVerdict() {
      return dataOperationControlVerdict;
    },
    get rekeyHolds3() {
      return rekeyHolds3;
    },
    get rekeyHolds4() {
      return rekeyHolds4;
    },
    get emit8() {
      return emit8;
    },
    get loadDataOperationControlVerdictResult18() {
      return loadDataOperationControlVerdictResult18;
    },
    get kind() {
      return kind;
    },
    set kind(operationValue: Dynamic) {
      kind = operationValue;
    },
    get loadDataOperationControlVerdictHandler25() {
      return loadDataOperationControlVerdictHandler25;
    },
    get refusalClass() {
      return refusalClass;
    },
    get enabled() {
      return enabled;
    },
    set enabled(operationValue: boolean) {
      enabled = operationValue;
    },
    get enabled18() {
      return enabled18;
    },
    set enabled18(operationValue: boolean) {
      enabled18 = operationValue;
    },
    get emit5() {
      return emit5;
    },
    get enabled19() {
      return enabled19;
    },
    set enabled19(operationValue: boolean) {
      enabled19 = operationValue;
    },
    get trim() {
      return trim;
    },
    get honourOpsOnFeed() {
      return honourOpsOnFeed;
    },
    get emit7() {
      return emit7;
    },
    get reconcile() {
      return reconcile;
    },
    get onFaces() {
      return onFaces;
    },
    get loadDataOperationControlVerdictHandler() {
      return loadDataOperationControlVerdictHandler;
    },
    get life2() {
      return life2;
    },
    get uniqueItems3() {
      return uniqueItems3;
    },
    get wait() {
      return wait;
    },
    get uniqueItems2() {
      return uniqueItems2;
    },
    get claimed() {
      return claimed;
    },
    get loadDataOperationControlVerdictResult17() {
      return loadDataOperationControlVerdictResult17;
    },
    set loadDataOperationControlVerdictResult17(operationValue: Dynamic) {
      loadDataOperationControlVerdictResult17 = operationValue;
    },
    get rekeyHolds2() {
      return rekeyHolds2;
    },
    get enabled23() {
      return enabled23;
    },
    set enabled23(operationValue: boolean) {
      enabled23 = operationValue;
    },
    get rekeyHolds5() {
      return rekeyHolds5;
    },
    get label4() {
      return label4;
    },
    get matchesReady() {
      return matchesReady;
    },
    set matchesReady(operationValue: boolean) {
      matchesReady = operationValue;
    },
    get state() {
      return state;
    },
    get index() {
      return index;
    },
    set index(operationValue: number) {
      index = operationValue;
    },
    get enabled16() {
      return enabled16;
    },
    set enabled16(operationValue: boolean) {
      enabled16 = operationValue;
    },
    get visibility() {
      return visibility;
    },
    get index3() {
      return index3;
    },
    set index3(operationValue: Dynamic) {
      index3 = operationValue;
    },
    get index4() {
      return index4;
    },
    set index4(operationValue: number) {
      index4 = operationValue;
    },
    get emit6() {
      return emit6;
    },
    get rearmGap() {
      return rearmGap;
    },
    get loadDataOperationControlVerdictHandler21() {
      return loadDataOperationControlVerdictHandler21;
    },
    get dataOperationControlFloor2() {
      return dataOperationControlFloor2;
    },
    get dataOperationControlFloor() {
      return dataOperationControlFloor;
    },
    get loadDataOperationControlVerdictResult10() {
      return loadDataOperationControlVerdictResult10;
    },
    set loadDataOperationControlVerdictResult10(operationValue: Dynamic) {
      loadDataOperationControlVerdictResult10 = operationValue;
    },
    get enabled15() {
      return enabled15;
    },
    set enabled15(operationValue: boolean) {
      enabled15 = operationValue;
    },
    get ObservabilityTelemetryUnmatched3() {
      return ObservabilityTelemetryUnmatched3;
    },
    get loadDataOperationControlVerdictHandler26() {
      return loadDataOperationControlVerdictHandler26;
    },
    get race() {
      return race;
    },
    get loadDataOperationControlVerdictHandler18() {
      return loadDataOperationControlVerdictHandler18;
    },
    get emit3() {
      return emit3;
    },
    get pageStopped() {
      return pageStopped;
    },
    get loadDataOperationControlVerdictHandler28() {
      return loadDataOperationControlVerdictHandler28;
    },
    get author() {
      return author;
    },
    get loadDataOperationControlVerdictHandler6() {
      return loadDataOperationControlVerdictHandler6;
    },
    get knockHeard2() {
      return knockHeard2;
    },
    get dataOperationControlFloor22() {
      return dataOperationControlFloor22;
    },
    get enabled22() {
      return enabled22;
    },
    set enabled22(operationValue: boolean) {
      enabled22 = operationValue;
    },
    get reopened() {
      return reopened;
    },
    get loadDataOperationControlVerdictHandler29() {
      return loadDataOperationControlVerdictHandler29;
    },
    get count9() {
      return count9;
    },
    set count9(operationValue: number) {
      count9 = operationValue;
    },
    get loadDataOperationControlVerdictResult19() {
      return loadDataOperationControlVerdictResult19;
    },
    set loadDataOperationControlVerdictResult19(operationValue: Dynamic) {
      loadDataOperationControlVerdictResult19 = operationValue;
    },
    get uniqueItems6() {
      return uniqueItems6;
    },
    get slice() {
      return slice;
    },
    get capsSettled7() {
      return capsSettled7;
    },
    get editorArm() {
      return editorArm;
    },
    get loadDataOperationControlVerdictHandler3() {
      return loadDataOperationControlVerdictHandler3;
    },
    get capsSettled2() {
      return capsSettled2;
    },
    get loadDataOperationControlVerdictHandler23() {
      return loadDataOperationControlVerdictHandler23;
    },
    get loadDataOperationControlVerdictHandler24() {
      return loadDataOperationControlVerdictHandler24;
    },
    get round() {
      return round;
    },
    get test2() {
      return test2;
    },
    get enabled3() {
      return enabled3;
    },
    set enabled3(operationValue: boolean) {
      enabled3 = operationValue;
    },
    get record3() {
      return record3;
    },
    set record3(operationValue: Dynamic) {
      record3 = operationValue;
    },
    get info() {
      return info;
    },
    get pump2() {
      return pump2;
    },
    get resolveDataOperationControlWhy2() {
      return resolveDataOperationControlWhy2;
    },
    get uniqueItems4() {
      return uniqueItems4;
    },
    get emit2() {
      return emit2;
    },
    get readsResume() {
      return readsResume;
    },
    get enabled2() {
      return enabled2;
    },
    set enabled2(operationValue: boolean) {
      enabled2 = operationValue;
    },
    get count4() {
      return count4;
    },
    set count4(operationValue: Dynamic) {
      count4 = operationValue;
    },
    get enabled24() {
      return enabled24;
    },
    set enabled24(operationValue: boolean) {
      enabled24 = operationValue;
    },
    get count8() {
      return count8;
    },
    set count8(operationValue: Dynamic) {
      count8 = operationValue;
    },
    get rekeyHolds() {
      return rekeyHolds;
    },
    get resolveDataOperationControlWhy4() {
      return resolveDataOperationControlWhy4;
    },
    get record2() {
      return record2;
    },
    get threw() {
      return threw;
    },
    get loadDataOperationControlVerdictHandler2() {
      return loadDataOperationControlVerdictHandler2;
    },
    get loadDataOperationControlVerdictHandler4() {
      return loadDataOperationControlVerdictHandler4;
    },
    get loadDataOperationControlVerdictHandler5() {
      return loadDataOperationControlVerdictHandler5;
    },
    get lookup2() {
      return lookup2;
    },
    get lifeLocks() {
      return lifeLocks;
    },
    get promise() {
      return promise;
    },
    get loadDataOperationControlVerdictResult3() {
      return loadDataOperationControlVerdictResult3;
    },
    set loadDataOperationControlVerdictResult3(operationValue: Dynamic) {
      loadDataOperationControlVerdictResult3 = operationValue;
    },
    get index2() {
      return index2;
    },
    set index2(operationValue: number) {
      index2 = operationValue;
    },
    get test() {
      return test;
    },
    get isFinite2() {
      return isFinite2;
    },
    get count() {
      return count;
    },
    set count(operationValue: number) {
      count = operationValue;
    },
    get loadDataOperationControlVerdictHandler8() {
      return loadDataOperationControlVerdictHandler8;
    },
    get isFinite3() {
      return isFinite3;
    },
    get loadDataOperationControlVerdictHandler9() {
      return loadDataOperationControlVerdictHandler9;
    },
    get label() {
      return label;
    },
    set label(operationValue: Dynamic) {
      label = operationValue;
    },
    get capsSettled3() {
      return capsSettled3;
    },
    get enabled6() {
      return enabled6;
    },
    set enabled6(operationValue: boolean) {
      enabled6 = operationValue;
    },
    get count2() {
      return count2;
    },
    set count2(operationValue: Dynamic) {
      count2 = operationValue;
    },
    get late() {
      return late;
    },
    set late(operationValue: Dynamic) {
      late = operationValue;
    },
    get now() {
      return now;
    },
    get answerMs() {
      return answerMs;
    },
    set answerMs(operationValue: Dynamic) {
      answerMs = operationValue;
    },
    get join() {
      return join;
    },
    get enabled5() {
      return enabled5;
    },
    set enabled5(operationValue: boolean) {
      enabled5 = operationValue;
    },
    get loadDataOperationControlVerdictResult4() {
      return loadDataOperationControlVerdictResult4;
    },
    set loadDataOperationControlVerdictResult4(operationValue: Dynamic) {
      loadDataOperationControlVerdictResult4 = operationValue;
    },
    get enabled7() {
      return enabled7;
    },
    set enabled7(operationValue: boolean) {
      enabled7 = operationValue;
    },
    get capsSettled4() {
      return capsSettled4;
    },
    get count3() {
      return count3;
    },
    set count3(operationValue: Dynamic) {
      count3 = operationValue;
    },
    get enabled10() {
      return enabled10;
    },
    set enabled10(operationValue: boolean) {
      enabled10 = operationValue;
    },
    get capsSettled5() {
      return capsSettled5;
    },
    get resolveDataOperationControlValue242() {
      return resolveDataOperationControlValue242;
    },
    get asks() {
      return asks;
    },
    set asks(operationValue: number) {
      asks = operationValue;
    },
    get race2() {
      return race2;
    },
    get TELEMETRYATTRIBUTENAMES2() {
      return TELEMETRYATTRIBUTENAMES2;
    },
    get TELEMETRYATTRIBUTENAMES() {
      return TELEMETRYATTRIBUTENAMES;
    },
    get roadMoved() {
      return roadMoved;
    },
    get loadDataOperationControlVerdictHandler10() {
      return loadDataOperationControlVerdictHandler10;
    },
    get pump() {
      return pump;
    },
    get enabled4() {
      return enabled4;
    },
    set enabled4(operationValue: Dynamic) {
      enabled4 = operationValue;
    },
    get enabled14() {
      return enabled14;
    },
    set enabled14(operationValue: Dynamic) {
      enabled14 = operationValue;
    },
    get enabled12() {
      return enabled12;
    },
    set enabled12(operationValue: boolean) {
      enabled12 = operationValue;
    },
    get loadDataOperationControlVerdictResult5() {
      return loadDataOperationControlVerdictResult5;
    },
    set loadDataOperationControlVerdictResult5(operationValue: Dynamic) {
      loadDataOperationControlVerdictResult5 = operationValue;
    },
    get loadDataOperationControlVerdictResult8() {
      return loadDataOperationControlVerdictResult8;
    },
    set loadDataOperationControlVerdictResult8(operationValue: Dynamic) {
      loadDataOperationControlVerdictResult8 = operationValue;
    },
    get enabled8() {
      return enabled8;
    },
    set enabled8(operationValue: boolean) {
      enabled8 = operationValue;
    },
    get enabled9() {
      return enabled9;
    },
    set enabled9(operationValue: boolean) {
      enabled9 = operationValue;
    },
    get loadDataOperationControlVerdictHandler11() {
      return loadDataOperationControlVerdictHandler11;
    },
    get loadDataOperationControlVerdictResult6() {
      return loadDataOperationControlVerdictResult6;
    },
    set loadDataOperationControlVerdictResult6(operationValue: Dynamic) {
      loadDataOperationControlVerdictResult6 = operationValue;
    },
    get loadDataOperationControlVerdictResult7() {
      return loadDataOperationControlVerdictResult7;
    },
    set loadDataOperationControlVerdictResult7(operationValue: Dynamic) {
      loadDataOperationControlVerdictResult7 = operationValue;
    },
    get enabled13() {
      return enabled13;
    },
    set enabled13(operationValue: boolean) {
      enabled13 = operationValue;
    },
    get classify() {
      return classify;
    },
    get enabled11() {
      return enabled11;
    },
    set enabled11(operationValue: Dynamic) {
      enabled11 = operationValue;
    },
    get loadDataOperationControlVerdictHandler15() {
      return loadDataOperationControlVerdictHandler15;
    },
    get loadDataOperationControlVerdictHandler16() {
      return loadDataOperationControlVerdictHandler16;
    },
    get loadDataOperationControlVerdictHandler13() {
      return loadDataOperationControlVerdictHandler13;
    },
    get race3() {
      return race3;
    },
    get race4() {
      return race4;
    },
    get loadDataOperationControlVerdictHandler14() {
      return loadDataOperationControlVerdictHandler14;
    },
    get loadObservabilityTelemetryStatus2() {
      return loadObservabilityTelemetryStatus2;
    },
    get resolveDataOperationControlRound5() {
      return resolveDataOperationControlRound5;
    },
    get total() {
      return total;
    },
    get loadDataOperationControlVerdictResult9() {
      return loadDataOperationControlVerdictResult9;
    },
    set loadDataOperationControlVerdictResult9(operationValue: Dynamic) {
      loadDataOperationControlVerdictResult9 = operationValue;
    },
    get items() {
      return items;
    },
    set items(operationValue: Dynamic) {
      items = operationValue;
    },
    get floor() {
      return floor;
    },
    get label2() {
      return label2;
    },
    set label2(operationValue: string) {
      label2 = operationValue;
    },
    get life() {
      return life;
    },
    get capsSettled() {
      return capsSettled;
    },
    get loadDataOperationControlVerdictHandler17() {
      return loadDataOperationControlVerdictHandler17;
    },
    get resolveDataOperationControlWhy3() {
      return resolveDataOperationControlWhy3;
    },
    get loadDataOperationControlVerdictResult11() {
      return loadDataOperationControlVerdictResult11;
    },
    set loadDataOperationControlVerdictResult11(operationValue: Dynamic) {
      loadDataOperationControlVerdictResult11 = operationValue;
    },
    get loadDataOperationControlVerdictHandler12() {
      return loadDataOperationControlVerdictHandler12;
    },
    get loadDataOperationControlVerdictResult12() {
      return loadDataOperationControlVerdictResult12;
    },
    set loadDataOperationControlVerdictResult12(operationValue: Dynamic) {
      loadDataOperationControlVerdictResult12 = operationValue;
    },
    get emit4() {
      return emit4;
    },
    get ObservabilityTelemetryState123() {
      return ObservabilityTelemetryState123;
    },
    get loadDataOperationControlVerdictHandler19() {
      return loadDataOperationControlVerdictHandler19;
    },
    get ObservabilityTelemetryUnmatched2() {
      return ObservabilityTelemetryUnmatched2;
    },
    get enabled17() {
      return enabled17;
    },
    set enabled17(operationValue: boolean) {
      enabled17 = operationValue;
    },
    get count5() {
      return count5;
    },
    set count5(operationValue: Dynamic) {
      count5 = operationValue;
    },
    get loadDataOperationControlVerdictHandler22() {
      return loadDataOperationControlVerdictHandler22;
    },
    get readsResume2() {
      return readsResume2;
    },
    get loadDataOperationControlVerdictHandler20() {
      return loadDataOperationControlVerdictHandler20;
    },
    get count6() {
      return count6;
    },
    set count6(operationValue: Dynamic) {
      count6 = operationValue;
    },
    get label3() {
      return label3;
    },
    set label3(operationValue: Dynamic) {
      label3 = operationValue;
    },
    get loadDataOperationControlVerdictResult14() {
      return loadDataOperationControlVerdictResult14;
    },
    set loadDataOperationControlVerdictResult14(operationValue: Dynamic) {
      loadDataOperationControlVerdictResult14 = operationValue;
    },
    get resolveDataOperationControlValue232() {
      return resolveDataOperationControlValue232;
    },
    get enabled20() {
      return enabled20;
    },
    set enabled20(operationValue: boolean) {
      enabled20 = operationValue;
    },
    get loadDataOperationControlVerdictResult13() {
      return loadDataOperationControlVerdictResult13;
    },
    set loadDataOperationControlVerdictResult13(operationValue: Dynamic) {
      loadDataOperationControlVerdictResult13 = operationValue;
    },
    get knockHeard() {
      return knockHeard;
    },
    get loadDataOperationControlVerdictResult15() {
      return loadDataOperationControlVerdictResult15;
    },
    set loadDataOperationControlVerdictResult15(operationValue: Dynamic) {
      loadDataOperationControlVerdictResult15 = operationValue;
    },
    get loadDataOperationControlVerdictResult16() {
      return loadDataOperationControlVerdictResult16;
    },
    set loadDataOperationControlVerdictResult16(operationValue: Dynamic) {
      loadDataOperationControlVerdictResult16 = operationValue;
    },
    get emit() {
      return emit;
    },
    get capsSettled6() {
      return capsSettled6;
    },
    get uniqueItems5() {
      return uniqueItems5;
    },
    get loadDataOperationControlVerdictResult2() {
      return loadDataOperationControlVerdictResult2;
    },
    set loadDataOperationControlVerdictResult2(operationValue: Dynamic) {
      loadDataOperationControlVerdictResult2 = operationValue;
    },
    get uniqueItems() {
      return uniqueItems;
    },
    get items2() {
      return items2;
    },
    get isPlainRecord2() {
      return isPlainRecord2;
    },
    get caps() {
      return caps;
    },
    get resolveObservabilityTelemetryChunk2() {
      return resolveObservabilityTelemetryChunk2;
    },
    get count7() {
      return count7;
    },
    set count7(operationValue: Dynamic) {
      count7 = operationValue;
    },
    get enabled25() {
      return enabled25;
    },
    set enabled25(operationValue: boolean) {
      enabled25 = operationValue;
    },
    get ObservabilityTelemetryState122() {
      return ObservabilityTelemetryState122;
    },
  };
  let reconcile: Dynamic = dataOperationControlVerdict.reconcile ?? false;
  let min =
    dataOperationControlVerdict.random === undefined
      ? undefined
      : Math.min(1, Math.max(0, dataOperationControlVerdict.random()));
  let loadDataOperationControlVerdictResult: Dynamic =
    min === undefined ? undefined : (..._extraArguments: unknown[]) => min;
  let dataOperationControlFloor: Dynamic = resolveDataOperationControlFloor(
    loadDataOperationControlVerdictResult,
  );
  let dataOperationControlFloor2: Dynamic = resolveDataOperationControlFloor(
    loadDataOperationControlVerdictResult,
    dataOperationControlValue300000,
  );
  let dataOperationControlFloor22 = resolveDataOperationControlFloor2(
    loadDataOperationControlVerdictResult,
  );
  let visibility: Dynamic =
    dataOperationControlVerdict.visibility ?? PlatformSyncAndRoutingState2;
  const transportOperations = createOperationTransport(operationScope);
  let loadDataOperationControlVerdictHandler: Dynamic =
    transportOperations.loadDataOperationControlVerdictHandler;
  let threw = transportOperations.threw;
  let judged = transportOperations.judged;
  let refusalClass: Dynamic = transportOperations.refusalClass;
  let onFaces: Dynamic = transportOperations.onFaces;
  let record2 = {
    verdict: `unreachable`,
    hung: true,
  };
  let race: Dynamic = transportOperations.race;
  let enabled = false;
  let enabled2 = false;
  let loadDataOperationControlVerdictResult2: Dynamic = null;
  let uniqueItems: Dynamic = new (Set as Dynamic)();
  let lookup: Dynamic = new (Map as Dynamic)();
  let idle: Dynamic = visibility.idle();
  let subscribe: Dynamic = visibility.subscribe(
    (
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): undefined => {
      let idle2: Dynamic = idle;
      idle = dataOperationControlVerdict2 === `idle`;
      if (!enabled)
        for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
          loadDataOperationControlVerdictResult22.visibilityChanged(
            dataOperationControlVerdict2,
            idle2,
          );
    },
  );
  let editorArm: Dynamic = dataOperationControlVerdict.editorArm ?? true;
  let record3: Dynamic = {};
  let enabled3 = false;
  let enabled4: Dynamic = false;
  const capabilitiesOperations = createOperationCapabilities(operationScope);
  let loadDataOperationControlVerdictHandler2: Dynamic =
    capabilitiesOperations.loadDataOperationControlVerdictHandler2;
  let loadDataOperationControlVerdictHandler3: Dynamic =
    capabilitiesOperations.loadDataOperationControlVerdictHandler3;
  let loadDataOperationControlVerdictHandler4: Dynamic =
    capabilitiesOperations.loadDataOperationControlVerdictHandler4;
  let capsSettled: Dynamic = capabilitiesOperations.capsSettled;
  let capsSettled2: Dynamic = capabilitiesOperations.capsSettled2;
  let honourOpsOnFeed: Dynamic = capabilitiesOperations.honourOpsOnFeed;
  let loadDataOperationControlVerdictHandler5: Dynamic =
    capabilitiesOperations.loadDataOperationControlVerdictHandler5;
  let loadDataOperationControlVerdictHandler6: Dynamic =
    capabilitiesOperations.loadDataOperationControlVerdictHandler6;
  let life: Dynamic = ++dataOperationControlValue0;
  let life2 = resolveDataOperationControlLife(min, life);
  let index = 0;
  let lifeLocks: Dynamic = dataOperationControlVerdict.lifeLocks ?? undefined;
  let loadDataOperationControlVerdictHandler7 = (
    ..._extraArguments: unknown[]
  ): undefined => undefined;
  let promise: Dynamic = new (Promise as Dynamic)(
    (resolve?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
      (loadDataOperationControlVerdictHandler7 = resolve),
  );
  lifeLocks?.hold(life2, promise);
  const lifeLocksOperations = createOperationLifeLocks(operationScope);
  let author: Dynamic = lifeLocksOperations.author;
  let lookup2: Dynamic = new (Map as Dynamic)();
  let claim: Dynamic = lifeLocksOperations.claim;
  let uniqueItems2: Dynamic = new (Set as Dynamic)();
  let uniqueItems3: Dynamic = new (Set as Dynamic)();
  let claimed = lifeLocksOperations.claimed;
  let looked = lifeLocksOperations.looked;
  let wait = lifeLocksOperations.wait;
  let asks = 0;
  let loadDataOperationControlVerdictResult3: Dynamic = null;
  let index2 = 0;
  let loadDataOperationControlVerdictHandler8: Dynamic =
    lifeLocksOperations.loadDataOperationControlVerdictHandler8;
  let loadDataOperationControlVerdictHandler9 =
    lifeLocksOperations.loadDataOperationControlVerdictHandler9;
  let isFinite2: Dynamic = lifeLocksOperations.isFinite2;
  let count = 0;
  let isFinite3: Dynamic = lifeLocksOperations.isFinite3;
  let race2: Dynamic = lifeLocksOperations.race2;
  let count2: Dynamic = 0;
  let enabled5 = false;
  let late: Dynamic = false;
  let now: Dynamic = dataOperationControlVerdict.now?.();
  let answerMs = -1;
  let label: Dynamic = `unasked`;
  const linkStateOperations = createOperationLinkState(operationScope);
  let loadDataOperationControlVerdictHandler10 =
    linkStateOperations.loadDataOperationControlVerdictHandler10;
  let capsSettled3: Dynamic = linkStateOperations.capsSettled3;
  let enabled6 = false;
  let capsSettled4: Dynamic = linkStateOperations.capsSettled4;
  let roadMoved = linkStateOperations.roadMoved;
  let loadDataOperationControlVerdictResult4: Dynamic = null;
  let count3: Dynamic = 0;
  let enabled7 = false;
  let resolveDataOperationControlValue242 =
    linkStateOperations.resolveDataOperationControlValue242;
  let TELEMETRYATTRIBUTENAMES = linkStateOperations.TELEMETRYATTRIBUTENAMES;
  let TELEMETRYATTRIBUTENAMES2: Dynamic =
    linkStateOperations.TELEMETRYATTRIBUTENAMES2;
  let loadDataOperationControlVerdictResult5: Dynamic = null;
  let loadDataOperationControlVerdictResult6: Dynamic = null;
  let loadDataOperationControlVerdictResult7: Dynamic = null;
  let loadDataOperationControlVerdictResult8: Dynamic = null;
  let enabled8 = false;
  let enabled9 = false;
  let count4: Dynamic = 0;
  let enabled10 = false;
  let enabled11: Dynamic = false;
  let enabled12 = false;
  let enabled13 = false;
  let total = DataOperationControlState5.length + 12 + 1;
  const factsOperations = createOperationFacts(operationScope);
  let capsSettled5: Dynamic = factsOperations.capsSettled5;
  let classify: Dynamic = factsOperations.classify;
  let loadDataOperationControlVerdictHandler11 =
    factsOperations.loadDataOperationControlVerdictHandler11;
  let loadDataOperationControlVerdictHandler12 =
    factsOperations.loadDataOperationControlVerdictHandler12;
  let loadDataOperationControlVerdictHandler13: Dynamic =
    factsOperations.loadDataOperationControlVerdictHandler13;
  let loadObservabilityTelemetryStatus2 =
    factsOperations.loadObservabilityTelemetryStatus2;
  let loadDataOperationControlVerdictHandler14 =
    factsOperations.loadDataOperationControlVerdictHandler14;
  let race3 = factsOperations.race3;
  let resolveDataOperationControlRound5 =
    factsOperations.resolveDataOperationControlRound5;
  let loadDataOperationControlVerdictHandler15: Dynamic =
    factsOperations.loadDataOperationControlVerdictHandler15;
  let race4: Dynamic = factsOperations.race4;
  let askFacts: Dynamic = factsOperations.askFacts;
  let loadDataOperationControlVerdictHandler16 =
    factsOperations.loadDataOperationControlVerdictHandler16;
  let loadDataOperationControlVerdictResult9: Dynamic = null;
  let floor: Dynamic = factsOperations.floor;
  let pump = factsOperations.pump;
  let label2 = ``;
  const statusOperations = createOperationStatus(operationScope);
  let info = statusOperations.info;
  let capsSettled6: Dynamic = statusOperations.capsSettled6;
  let emit = statusOperations.emit;
  let enabled14: Dynamic = false;
  let loadDataOperationControlVerdictHandler17: Dynamic =
    statusOperations.loadDataOperationControlVerdictHandler17;
  let emit2 = statusOperations.emit2;
  let loadDataOperationControlVerdictResult10: Dynamic = null;
  let resolveDataOperationControlWhy2: Dynamic =
    statusOperations.resolveDataOperationControlWhy2;
  let resolveDataOperationControlWhy3: Dynamic =
    statusOperations.resolveDataOperationControlWhy3;
  let resolveDataOperationControlWhy4: Dynamic =
    statusOperations.resolveDataOperationControlWhy4;
  let pageStopped = statusOperations.pageStopped;
  let enabled15 = false;
  let enabled16 = false;
  let loadDataOperationControlVerdictResult11: Dynamic = null;
  let count5: Dynamic = 0;
  let enabled17 = false;
  let loadDataOperationControlVerdictResult12: Dynamic = null;
  const accessOperations = createOperationAccess(operationScope);
  let loadDataOperationControlVerdictHandler18: Dynamic =
    accessOperations.loadDataOperationControlVerdictHandler18;
  let loadDataOperationControlVerdictHandler19: Dynamic =
    accessOperations.loadDataOperationControlVerdictHandler19;
  let ObservabilityTelemetryUnmatched2 =
    accessOperations.ObservabilityTelemetryUnmatched2;
  let ObservabilityTelemetryUnmatched3 =
    accessOperations.ObservabilityTelemetryUnmatched3;
  let loadDataOperationControlVerdictHandler20: Dynamic =
    accessOperations.loadDataOperationControlVerdictHandler20;
  let loadDataOperationControlVerdictHandler21: Dynamic =
    accessOperations.loadDataOperationControlVerdictHandler21;
  let loadDataOperationControlVerdictHandler22 =
    accessOperations.loadDataOperationControlVerdictHandler22;
  let emit3 = accessOperations.emit3;
  let emit4 = accessOperations.emit4;
  let readsResume = accessOperations.readsResume;
  let kind: Dynamic = null;
  let count6: Dynamic = 0;
  const connectivityOperations = createOperationConnectivity(operationScope);
  let loadDataOperationControlVerdictHandler23: Dynamic =
    connectivityOperations.loadDataOperationControlVerdictHandler23;
  let loadDataOperationControlVerdictHandler24: Dynamic =
    connectivityOperations.loadDataOperationControlVerdictHandler24;
  let index3: Dynamic = 0;
  let uniqueItems4: Dynamic = new (Set as Dynamic)();
  let loadDataOperationControlVerdictHandler25: Dynamic =
    connectivityOperations.loadDataOperationControlVerdictHandler25;
  let emit5 = connectivityOperations.emit5;
  let loadDataOperationControlVerdictResult13: Dynamic = null;
  let index4 = 0;
  let enabled18 = false;
  let label3: Dynamic = `write`;
  let loadDataOperationControlVerdictResult14: Dynamic = null;
  let enabled19 = false;
  let emit6 = connectivityOperations.emit6;
  let enabled20 = false;
  let knockHeard: Dynamic = connectivityOperations.knockHeard;
  let resolveDataOperationControlValue232 =
    connectivityOperations.resolveDataOperationControlValue232;
  let loadDataOperationControlVerdictResult15: Dynamic = null;
  let woke = connectivityOperations.woke;
  let loadDataOperationControlVerdictResult16: Dynamic = null;
  let knockHeard2 = connectivityOperations.knockHeard2;
  let rearmGap = connectivityOperations.rearmGap;
  let round = connectivityOperations.round;
  let loadDataOperationControlVerdictHandler26: Dynamic =
    connectivityOperations.loadDataOperationControlVerdictHandler26;
  let test: Dynamic = connectivityOperations.test;
  let capsSettled7: Dynamic = connectivityOperations.capsSettled7;
  let pump2 = connectivityOperations.pump2;
  let uniqueItems5: Dynamic = new (Set as Dynamic)([
    `stream`,
    `provenance`,
    `ids`,
    `opId`,
  ]);
  const sessionOperations = createOperationSession(operationScope);
  let test2: Dynamic = sessionOperations.test2;
  let state = sessionOperations.state;
  let emit7 = sessionOperations.emit7;
  let items: Dynamic = [];
  let items2 = [
    `idsInline`,
    `idsRequired`,
    `markIds`,
    `wrapFinal`,
    `joinDir`,
    `reviveChars`,
    `reviveText`,
    `reviveBlocks`,
    `splitResurrect`,
    `mentionLabel`,
    `personLabel`,
    `highlightColour`,
    `hrefFragment`,
    `splitBeforeAtom`,
    `insertEach`,
  ];
  let isPlainRecord2: Dynamic = sessionOperations.isPlainRecord2;
  let join = sessionOperations.join;
  let caps: Dynamic = sessionOperations.caps;
  let emit8 = sessionOperations.emit8;
  let trim = sessionOperations.trim;
  let rekeyHolds = sessionOperations.rekeyHolds;
  let resolveObservabilityTelemetryChunk2 =
    sessionOperations.resolveObservabilityTelemetryChunk2;
  let rekeyHolds2 = sessionOperations.rekeyHolds2;
  let enabled21 = false;
  let matchesReady = dataOperationControlVerdict.wal.ready === undefined;
  dataOperationControlVerdict.wal.ready?.then(
    (..._extraArguments: unknown[]) => (matchesReady = true),
    (..._extraArguments: unknown[]): undefined => undefined,
  );
  try {
    dataOperationControlVerdict.wal.kept?.(
      (
        dataOperationControlVerdict2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        if (!enabled)
          for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
            loadDataOperationControlVerdictResult22.takeKept(
              dataOperationControlVerdict2,
            );
      },
    );
    dataOperationControlVerdict.wal.twinKept?.(
      (
        dataOperationControlVerdict2?: Dynamic,
        ..._extraArguments: unknown[]
      ): undefined => {
        try {
          if (!enabled) {
            dataOperationControlVerdict.claimed?.(
              `tray`,
              dataOperationControlVerdict2,
              `twin`,
            );
          }
        } catch {}
      },
    );
  } catch {}
  let label4: Dynamic = dataOperationControlVerdict.session.get()?.label;
  let loadDataOperationControlVerdictResult17: Dynamic;
  let loadDataOperationControlVerdictHandler27: Dynamic =
    sessionOperations.loadDataOperationControlVerdictHandler27;
  let rekeyHolds3 = sessionOperations.rekeyHolds3;
  let loadDataOperationControlVerdictHandler28: Dynamic =
    sessionOperations.loadDataOperationControlVerdictHandler28;
  let slice: Dynamic = sessionOperations.slice;
  let rekeyHolds4 = sessionOperations.rekeyHolds4;
  let rekeyHolds5 = sessionOperations.rekeyHolds5;
  let loadDataOperationControlVerdictResult18 =
    sessionOperations.loadDataOperationControlVerdictResult18;
  let enabled22 = false;
  let loadDataOperationControlVerdictResult19: Dynamic = null;
  let enabled23 = false;
  let enabled24 = false;
  let uniqueItems6: Dynamic = new (Set as Dynamic)();
  let count7: Dynamic = 0;
  let loadDataOperationControlVerdictResult20: Dynamic = null;
  let count8: Dynamic = 0;
  let count9 = 0;
  let enabled25 = false;
  const recoveryOperations = createOperationRecovery(operationScope);
  let ObservabilityTelemetryState122 =
    recoveryOperations.ObservabilityTelemetryState122;
  let loadDataOperationControlVerdictHandler29: Dynamic = (
    ..._extraArguments: unknown[]
  ): Dynamic =>
    (loadDataOperationControlVerdictResult19 ??= (async (
      ..._extraArguments: unknown[]
    ): Promise<undefined> => {
      if (
        enabled ||
        ((count8 > 0 || count9 > 0) &&
          (await loadDataOperationControlVerdictHandler(
            Math.max(
              count,
              resolveDataOperationControlValue23(
                Math.max(count8, count9),
                dataOperationControlVerdict.random ??
                  ((..._extraArguments: unknown[]) => 1),
              ),
            ),
          ),
          enabled))
      )
        return;
      let sessionEntry: Dynamic = enabled21
        ? null
        : dataOperationControlVerdict.session.get();
      if (sessionEntry) {
        loadDataOperationControlVerdictResult9 = sessionEntry;
        dataOperationControlVerdict.session.set(null);
      }
      loadDataOperationControlVerdictResult20 = sessionEntry;
      let enabled26 = false;
      try {
        let loadDataOperationControlVerdictResult22: Dynamic = ++asks;
        let race5: Dynamic = race2(
          (
            dataOperationControlVerdict2?: Dynamic,
            ..._extraArguments: unknown[]
          ): Dynamic =>
            TELEMETRYATTRIBUTENAMES2(
              dataOperationControlVerdict2,
              loadDataOperationControlVerdictResult22,
            ),
        );
        let body: Dynamic = race5.body;
        let rep: Dynamic = await race5.rep;
        if (enabled) return;
        loadDataOperationControlVerdictResult20 = null;
        let dataOperationControlSure: Dynamic =
          resolveDataOperationControlSure(rep);
        judged(
          body,
          rep.busy === true && isPlainRecord(rep.said) ? rep.said : rep,
          dataOperationControlSure &&
            (dataOperationControlSure.sure ||
              loadDataOperationControlVerdictHandler26())
            ? `page_gone`
            : rep.verdict === `unreachable` || dataOperationControlSure
              ? `backoff`
              : rep.verdict === `allow`
                ? `landed`
                : test(rep)
                  ? `view_only`
                  : `no_service`,
          {
            road: `mint`,
            verb: `create`,
            seated: loadDataOperationControlVerdictHandler26(),
            opId: body.opId,
            vis: visibility.state(),
          },
        );
        if (
          dataOperationControlSure &&
          (dataOperationControlSure.sure ||
            loadDataOperationControlVerdictHandler26())
        )
          return void pageStopped(`deleted`);
        let refusalClass2: Dynamic = refusalClass();
        let classify2: Dynamic =
          refusalClass2 === null || rep.verdict === `allow`
            ? null
            : refusalClass2.classify(rep, {
                road: `mint`,
                verb: `create`,
                seated: loadDataOperationControlVerdictHandler26(),
              });
        let matchesClassify =
          classify2 !== null &&
          (classify2.source === `relay` || classify2.source === `http`) &&
          classify2.k !== `page_terminal` &&
          classify2.k !== `op_terminal`;
        count8 =
          rep.verdict === `unreachable` ||
          dataOperationControlSure ||
          matchesClassify
            ? count8 + 1
            : 0;
        if (
          refusalClass2 !== null &&
          count8 >= refusalClass2.TRANSIENT_RETRY_MAX
        ) {
          emit5(`unreached`, `create ×${count8}`, `mint`);
        }
        let next: Dynamic =
          isPlainRecord(rep.data) && typeof rep.data.next == `number`
            ? rep.data.next
            : 0;
        if (isPlainRecord(rep.data) && Array.isArray(rep.data.accepts)) {
          items = rep.data.accepts.filter(
            (accept?: unknown, ..._extraArguments: unknown[]) =>
              typeof accept == `string`,
          );
        }
        roadMoved(rep, loadDataOperationControlVerdictResult22, false);
        let refusalClass3: Dynamic = refusalClass();
        let classify3: Dynamic =
          refusalClass3 === null || rep.verdict === `allow`
            ? null
            : refusalClass2 === refusalClass3
              ? classify2
              : refusalClass3.classify(rep, {
                  road: `mint`,
                  verb: `create`,
                  seated: loadDataOperationControlVerdictHandler26(),
                });
        if (
          classify3?.k === `page_terminal` &&
          classify3.source !== `relay` &&
          classify3.source !== `http` &&
          (classify3.face === `not_governed` || classify3.face === `cmek`)
        )
          return void pageStopped(classify3.face);
        if (rep.verdict === `allow`) {
          pump2();
        }
        loadDataOperationControlVerdictHandler10(
          rep.verdict === `unreachable` || dataOperationControlSure
            ? `no_answer`
            : rep.verdict === `allow`
              ? `caps_absent`
              : `refused`,
        );
        if (rep.verdict === `unreachable` && !dataOperationControlSure) {
          resolveDataOperationControlValue242();
        }
        info();
        let matchesVerdict =
          rep.verdict === `allow` &&
          typeof rep.sess == `string` &&
          typeof rep.sessSecret == `string`;
        if (rep.verdict === `allow`) {
          enabled24 = true;
          emit2(false);
        }
        if (enabled21) return;
        if (!matchesVerdict) {
          if (rep.verdict === `allow`) {
            if (sessionEntry) {
              rekeyHolds2(
                (loadDataOperationControlVerdictResult17 = sessionEntry.label),
              );
            }
            rekeyHolds5();
            return;
          }
          if (
            rep.verdict === `unreachable` ||
            dataOperationControlSure ||
            matchesClassify
          )
            return;
          if (test(rep)) return void emit2(true);
          if (sessionEntry) {
            dataOperationControlVerdict.session.set(sessionEntry);
          }
          enabled21 =
            sessionEntry !== null ||
            dataOperationControlVerdict.session.get() !== null;
          if (enabled21) {
            emit8();
          }
          return;
        }
        enabled26 = true;
        enabled21 = true;
        count9 = 0;
        let hwm: Dynamic = floor(rep.sess, next);
        dataOperationControlVerdict.session.set({
          label: rep.sess,
          secret: rep.sessSecret,
          hwm: hwm,
        });
        rekeyHolds(rep.sess, hwm);
        if (sessionEntry) {
          rekeyHolds3(sessionEntry.label);
        }
        rekeyHolds4();
        emit8();
      } catch {
        if (enabled) return;
        loadDataOperationControlVerdictResult20 = null;
        count8 += 1;
        if (
          !enabled21 &&
          sessionEntry &&
          !dataOperationControlVerdict.session.get()
        ) {
          dataOperationControlVerdict.session.set(sessionEntry);
        }
        if (dataOperationControlVerdict.session.get()) {
          enabled21 = true;
        }
      } finally {
        if (
          !enabled26 &&
          !enabled21 &&
          sessionEntry &&
          loadDataOperationControlVerdictResult17 === undefined
        ) {
          loadDataOperationControlVerdictResult17 = sessionEntry.label;
          rekeyHolds2(sessionEntry.label);
        }
        enabled23 = true;
        if (!enabled21) {
          rekeyHolds5();
        }
        let enabled27 = enabled25;
        enabled25 = false;
        if (enabled27 && enabled14 && !enabled) {
          queueMicrotask(
            (..._extraArguments: unknown[]): undefined =>
              void (
                enabled14 &&
                enabled23 &&
                !enabled &&
                ObservabilityTelemetryState122()
              ),
          );
        }
      }
    })());
  class loadDataOperationControlVerdictResult21 {
    [key: string]: Dynamic;
    node: Dynamic;
    downs: Dynamic = new (Set as Dynamic)();
    queue: Dynamic = [];
    inflight: Dynamic = null;
    provisional: Dynamic = new (Map as Dynamic)();
    lastRev: Dynamic = -1;
    recounting: Dynamic = false;
    comparing: Dynamic = new (Map as Dynamic)();
    comparedRevs: Dynamic = new (Map as Dynamic)();
    declinedHoles: Dynamic = new (Set as Dynamic)();
    redelivered: Dynamic = new (Map as Dynamic)();
    shownRev: Dynamic = -1;
    picRev: Dynamic = -1;
    deadBids: Dynamic = new (Map as Dynamic)();
    sent: Dynamic = new (Set as Dynamic)();
    blockReads: Dynamic = new (Set as Dynamic)();
    leftWords: Dynamic = [];
    shortRevived: Dynamic = new (Map as Dynamic)();
    shortGrace: Dynamic = new (Set as Dynamic)();
    leftRead: Dynamic = false;
    strays: Dynamic = 0;
    proposedEver: Dynamic = new (Set as Dynamic)();
    grantedEver: Dynamic = new (Set as Dynamic)();
    lastBlocks: Dynamic = null;
    wordsOwed: Dynamic = false;
    remountOwed: Dynamic = false;
    mountReadonly: Dynamic = false;
    mountWait: Dynamic = null;
    mountInst: Dynamic = null;
    servedSlow: Dynamic = false;
    remountOut: Dynamic = new (Set as Dynamic)();
    ackedRecent: Dynamic = [];
    ackedRev: Dynamic = -1;
    heardRev: Dynamic = -1;
    pictureSeq: Dynamic = -1;
    heardSeq: Dynamic = -1;
    wrote: Dynamic = [];
    toldHwm: Dynamic = null;
    sessRetries: Dynamic = 0;
    pollTimer: Dynamic = null;
    pollRung: Dynamic = 0;
    pollArmedMs: Dynamic = dataOperationControlValue2000;
    retryTimer: Dynamic = null;
    streamTimer: Dynamic = null;
    freshTimer: Dynamic = null;
    wantComments: Dynamic = true;
    commentsAsk: Dynamic = 0;
    stubTimer: Dynamic = null;
    backTimer: Dynamic = null;
    backs: Dynamic = 0;
    readTop: Dynamic = -1;
    wantRev: Dynamic = -1;
    wantForeign: Dynamic = -1;
    stubs: Dynamic = 0;
    ready: Dynamic;
    dead: Dynamic = false;
    served: Dynamic = false;
    reading: Dynamic = false;
    rung: Dynamic = false;
    rungWhole: Dynamic = false;
    owed: Dynamic = false;
    oweWhole: Dynamic = false;
    slow: Dynamic = false;
    unsettled: Dynamic = false;
    halted: Dynamic = false;
    sinceHaltedAt: Dynamic = null;
    cooling: Dynamic = false;
    coolTimer: Dynamic = null;
    gaveUp: Dynamic = false;
    lookRev: Dynamic = null;
    joinTries: Dynamic = 0;
    constructor(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ) {
      this.node = dataOperationControlVerdict2;
      this.takeLeft();
      dataOperationControlVerdict.wal.ready?.then(
        (..._extraArguments: unknown[]): undefined => {
          this.takeLeft();
          emit7();
        },
        (..._extraArguments: unknown[]): undefined => undefined,
      );
      queueMicrotask(
        (..._extraArguments: unknown[]) => (
          enabled14 &&
            !enabled &&
            !this.dead &&
            this.emit(loadDataOperationControlVerdictHandler17(this.node)),
          loadDataOperationControlVerdictResult10 !== null &&
          !enabled &&
          !this.dead
            ? this.emit(resolveDataOperationControlWhy3(this.node))
            : loadDataOperationControlVerdictHandler18() &&
                !enabled &&
                !this.dead
              ? this.emit(loadDataOperationControlVerdictHandler20(this.node))
              : kind !== null &&
                !enabled14 &&
                !enabled &&
                !this.dead &&
                this.emit(loadDataOperationControlVerdictHandler25(this.node)),
          enabled21 ? emit8() : void loadDataOperationControlVerdictHandler29()
        ),
      );
      let load: Dynamic = dataOperationControlVerdict.wal.load(
        dataOperationControlVerdict2,
      );
      let race5: Dynamic = Promise.race([
        load,
        loadDataOperationControlVerdictHandler(400).then(
          (..._extraArguments: unknown[]) =>
            DataOperationControlTheLogDidNotAnswerWithinWALMS,
        ),
      ]);
      let race6: Dynamic = (
        dataOperationControlVerdict3?: Dynamic,
        ..._extraArguments: unknown[]
      ): Dynamic => {
        let uniqueItems7: Dynamic = new (Set as Dynamic)();
        for (let loadDataOperationControlVerdictResult22 of dataOperationControlVerdict3 as Dynamic)
          if (
            isPlainRecord(loadDataOperationControlVerdictResult22) &&
            typeof loadDataOperationControlVerdictResult22.life == `string` &&
            loadDataOperationControlVerdictResult22.life !== life2
          ) {
            uniqueItems7.add(loadDataOperationControlVerdictResult22.life);
          }
        let lookup3: Dynamic = new (Map as Dynamic)();
        return uniqueItems7.size === 0 || !lifeLocks
          ? lookup3
          : Promise.race([
              Promise.all(
                [...uniqueItems7].map(
                  (item?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
                    claim(item).then(
                      (
                        result?: Dynamic,
                        ..._extraArguments: unknown[]
                      ): undefined => void lookup3.set(item, result),
                    ),
                ),
              ),
              loadDataOperationControlVerdictHandler(400),
            ]).then((..._extraArguments: unknown[]): Dynamic => lookup3);
      };
      this.ready = race5.then(
        (result?: Dynamic, ..._extraArguments: unknown[]): Dynamic => {
          if (result === DataOperationControlTheLogDidNotAnswerWithinWALMS) {
            load.then(
              (..._extraArguments: unknown[]): undefined => {
                if (!enabled && !this.dead && matchesReady) {
                  this.takeLeft();
                  emit7();
                }
              },
              (..._extraArguments: unknown[]): undefined => undefined,
            );
          }
          let items3: Dynamic =
            result === DataOperationControlTheLogDidNotAnswerWithinWALMS
              ? []
              : result;
          if (items3.length === 0) {
            looked(
              result === DataOperationControlTheLogDidNotAnswerWithinWALMS
                ? `late`
                : `none`,
            );
          }
          let race7: Dynamic = race6(items3);
          return race7 instanceof (Map as Dynamic)
            ? this.replay(items3, race7)
            : race7.then((result2?: Dynamic, ..._extraArguments: unknown[]) =>
                this.replay(items3, result2),
              );
        },
        (..._extraArguments: unknown[]) => looked(`fail`),
      );
    }
    wordsBehind: Dynamic = new (Set as Dynamic)();
    wordsBehindTimer: Dynamic = null;
    heldWords: Dynamic = 0;
    heldWordsTimer: Dynamic = null;
    behindPlace: Dynamic = new (Map as Dynamic)();
    blockQueue: Dynamic = new (Map as Dynamic)();
    blockWaitMs: Dynamic = 0;
    blockTimer: Dynamic = null;
    blockCool: Dynamic = new (Map as Dynamic)();
    penBlocks: Dynamic = new (Set as Dynamic)();
    paceLeft: Dynamic = null;
    paceTimer: Dynamic = null;
    paceSpent: Dynamic = false;
    paceRefillMs: Dynamic = 500;
    paceCalmMs: Dynamic = dataOperationControlValue100004;
    paceUpTimer: Dynamic = null;
    freshOwed: Dynamic = false;
    feedUp: Dynamic = null;
    quietTimer: Dynamic = null;
    toldHeld: Dynamic = [];
    toldOverflow: Dynamic = false;
    toldRev: Dynamic = -1;
    toldSpans: Dynamic = [];
    cands: Dynamic = [];
    candGround: Dynamic = -1;
    holeRev: Dynamic = -1;
    holeTimer: Dynamic = null;
    ringDue: Dynamic = false;
    readingWhole: Dynamic = false;
    wholePicRev: Dynamic = -1;
    gapOwed: Dynamic = false;
    gapRev: Dynamic = -1;
    gapBlind: Dynamic = false;
    gapSeq: Dynamic = -1;
    gapRevUnloc: Dynamic = -1;
    gapBlindUnloc: Dynamic = false;
    gapFails: Dynamic = 0;
    lastReadWhy: Dynamic = `below`;
    gapEpisode: Dynamic = false;
    gapWaitedMs: Dynamic = 0;
    readsUnanswered: Dynamic = 0;
    gapTimer: Dynamic = null;
    gapGaveUp: Dynamic = false;
    stoodAt: Dynamic = -1;
    gapSlow: Dynamic = false;
    accessRefused: Dynamic = false;
    accessRefusedWhole: Dynamic = false;
    knockBlind: Dynamic = false;
    sheds: Dynamic = 0;
    shedTimer: Dynamic = null;
    shedHeld: Dynamic = null;
    shedAskedMs: Dynamic = 0;
    shedWaitedMs: Dynamic = 0;
    openShedAt: Dynamic = null;
    shedSeen: Dynamic = 0;
    shedPauseTimer: Dynamic = null;
    shedCalm: Dynamic = 0;
    calmTimer: Dynamic = null;
    shedWaitMs: Dynamic = 0;
    shedWaiters: Dynamic = [];
    probeHeld: Dynamic = null;
    probing: Dynamic = false;
    parked: Dynamic = new (Map as Dynamic)();
    busySaid: Dynamic = false;
    unseenOps: Dynamic = new (Set as Dynamic)();
    toldRoad: Dynamic = honourOpsOnFeed();
    orphanSaid: Dynamic = false;
    orphanLatched: Dynamic = false;
    orphanStageSaid: Dynamic = null;
    nodeGone: Dynamic = false;
    goneSaid: Dynamic = false;
    since: Dynamic = (..._extraArguments: unknown[]): Dynamic =>
      this.lastRev >= 0 ? this.lastRev : undefined;
    namedWhole: Dynamic = false;
    readingNamed: Dynamic = false;
    handedRevs: Dynamic = new (Map as Dynamic)();
    bornBehind: Dynamic = new (Map as Dynamic)();
    holds: Dynamic = new (Map as Dynamic)();
    handed: Dynamic = [];
    myWords: Dynamic = new (Map as Dynamic)();
    lastFace: Dynamic = null;
    commentsBarred: Dynamic = false;
    noReseats: Dynamic = 0;
    roomRev: Dynamic = -1;
    groundRev: Dynamic = -1;
    behindGround: Dynamic = null;
    healTimer: Dynamic = null;
    healArmedFor: Dynamic = 0;
    healCoolTimer: Dynamic = null;
    healCooling: Dynamic = false;
    healFails: Dynamic = 0;
    healDeferrals: Dynamic = 0;
    healWhy: Dynamic = ``;
    healEpisode: Dynamic = false;
    healReissues: Dynamic = 0;
    healReissueTimer: Dynamic = null;
    sentCount: Dynamic = 0;
    orderTimer: Dynamic = null;
    orderActive: Dynamic = false;
    orderDiverged: Dynamic = false;
    orderProbing: Dynamic = false;
    orderCalm: Dynamic = 0;
    orderTooLarge: Dynamic = false;
    orderAsked: Dynamic = 0;
    orderMismatches: Dynamic = 0;
    probeEar: Dynamic;
    holed: Dynamic = new (Set as Dynamic)();
    holedRead: Dynamic = new (Set as Dynamic)();
  }
  // BaoCut: install non-enumerable methods before any controller node can be created.
  installOperationNodeMethods(
    loadDataOperationControlVerdictResult21.prototype,
    [
      createOperationNodePaintAndWords(operationScope),
      createOperationNodeMountAndReplay(operationScope),
      createOperationNodeBlockReads(operationScope),
      createOperationNodeFeed(operationScope),
      createOperationNodeGap(operationScope),
      createOperationNodeTransport(operationScope),
      createOperationNodeRead(operationScope),
      createOperationNodeDelta(operationScope),
      createOperationNodeProposals(operationScope),
      createOperationNodeHealing(operationScope),
      createOperationNodePump(operationScope),
      createOperationNodeWrite(operationScope),
      createOperationNodeCompletion(operationScope),
    ],
  );
  const reopenedOperations = createOperationReopened(operationScope);
  let recovered = reopenedOperations.recovered;
  let reopened: Dynamic = reopenedOperations.reopened;
  let ObservabilityTelemetryState123: Dynamic =
    reopenedOperations.ObservabilityTelemetryState123;
  let accessChanged: Dynamic = reopenedOperations.accessChanged;
  let readsResume2: Dynamic = reopenedOperations.readsResume2;
  return {
    open(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      lookup.get(dataOperationControlVerdict2)?.close();
      let loadDataOperationControlVerdictResult22: Dynamic =
        new (loadDataOperationControlVerdictResult21 as Dynamic)(
          dataOperationControlVerdict2,
        );
      lookup.set(
        dataOperationControlVerdict2,
        loadDataOperationControlVerdictResult22,
      );
      if (enabled11) {
        enabled11 = false;
        loadDataOperationControlVerdictHandler11();
        loadDataOperationControlVerdictHandler15();
      }
      return loadDataOperationControlVerdictResult22;
    },
    close(..._extraArguments: unknown[]): undefined {
      enabled = true;
      subscribe();
      if (loadDataOperationControlVerdictResult4 !== null) {
        dataOperationControlVerdict.timers.clearTimeout(
          loadDataOperationControlVerdictResult4,
        );
      }
      loadDataOperationControlVerdictResult4 = null;
      loadDataOperationControlVerdictHandler12();
      if (loadDataOperationControlVerdictResult13 !== null) {
        dataOperationControlVerdict.timers.clearTimeout(
          loadDataOperationControlVerdictResult13,
        );
      }
      loadDataOperationControlVerdictResult13 = null;
      if (loadDataOperationControlVerdictResult11 !== null) {
        dataOperationControlVerdict.timers.clearTimeout(
          loadDataOperationControlVerdictResult11,
        );
      }
      loadDataOperationControlVerdictResult11 = null;
      if (loadDataOperationControlVerdictResult14 !== null) {
        dataOperationControlVerdict.timers.clearTimeout(
          loadDataOperationControlVerdictResult14,
        );
      }
      loadDataOperationControlVerdictResult14 = null;
      if (loadDataOperationControlVerdictResult15 !== null) {
        dataOperationControlVerdict.timers.clearTimeout(
          loadDataOperationControlVerdictResult15,
        );
      }
      loadDataOperationControlVerdictResult15 = null;
      if (loadDataOperationControlVerdictResult16 !== null) {
        dataOperationControlVerdict.timers.clearTimeout(
          loadDataOperationControlVerdictResult16,
        );
      }
      loadDataOperationControlVerdictResult16 = null;
      if (
        loadDataOperationControlVerdictResult20 !== null &&
        dataOperationControlVerdict.session.get() === null
      ) {
        dataOperationControlVerdict.session.set(
          loadDataOperationControlVerdictResult20,
        );
      }
      loadDataOperationControlVerdictResult20 = null;
      for (let loadDataOperationControlVerdictResult22 of Array.from<Dynamic>(
        lookup.values(),
      ) as Dynamic)
        loadDataOperationControlVerdictResult22.close();
      dataOperationControlVerdict.wal.release?.();
      loadDataOperationControlVerdictHandler7();
    },
    known: (..._extraArguments: unknown[]): Dynamic =>
      enabled21 ? dataOperationControlVerdict.session.get() : null,
    reopened: reopened,
    recovered: recovered,
    capsChanged: (..._extraArguments: unknown[]): undefined => {
      if (!enabled) {
        if (
          loadDataOperationControlVerdictHandler2(
            dataOperationControlVerdict.caps?.oneOrder,
          )
        ) {
          enabled3 = false;
        }
        pump2();
        for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic)
          loadDataOperationControlVerdictResult22.roadMoved();
        info();
        if (label === `no_answer`) {
          resolveDataOperationControlValue242();
        }
        loadDataOperationControlVerdictHandler15();
      }
    },
    askFacts: askFacts,
    caps: caps,
    waiting: (..._extraArguments: unknown[]): Dynamic => enabled4,
    viewOnly: (..._extraArguments: unknown[]): Dynamic => enabled14,
    readsRefused: (..._extraArguments: unknown[]): Dynamic =>
      loadDataOperationControlVerdictHandler18(),
    pageGone: (..._extraArguments: unknown[]) =>
      loadDataOperationControlVerdictResult10 !== null,
    pageGoneWhy: (..._extraArguments: unknown[]): Dynamic =>
      loadDataOperationControlVerdictResult10,
    linkDown: (..._extraArguments: unknown[]): Dynamic => kind,
    paused: (..._extraArguments: unknown[]) => kind !== null || enabled18,
    woke: woke,
    accessChanged: accessChanged,
    state: state,
    unsavedInputs: (..._extraArguments: unknown[]) => {
      let record4 = {
        tray: 0,
        shortRevived: 0,
        shortRevivedAcked: 0,
      };
      for (let loadDataOperationControlVerdictResult22 of lookup.values() as Dynamic) {
        record4.tray += loadDataOperationControlVerdictResult22.trayLines();
        record4.shortRevived +=
          loadDataOperationControlVerdictResult22.shortRevived.size;
        for (let loadDataOperationControlVerdictResult23 of loadDataOperationControlVerdictResult22.shortRevived.values() as Dynamic)
          if (loadDataOperationControlVerdictResult23) {
            record4.shortRevivedAcked += 1;
          }
      }
      return record4;
    },
    onState(
      dataOperationControlVerdict2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      uniqueItems.add(dataOperationControlVerdict2);
      return (..._extraArguments: unknown[]): Dynamic =>
        uniqueItems.delete(dataOperationControlVerdict2);
    },
  };
}

// BaoCut: called by platform-core-initialize in the recovered source order.
export function initializeDataOperationControl3Step1(): void {
  dataOperationControlValue0 = 0;
}
export { loadDataOperationControlVerdict };
