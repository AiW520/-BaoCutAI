import type { MessageBoxOptions } from 'electron';
import { localizeText } from '@baocut/protocol';
import { M, type MainMessages } from './main-copy.ts';
import type { ActiveWork, RemoteCall } from './runtime-supervisor.ts';

/** 退出时怎么处理自己起的 Runtime（架构设计 §2.2、产品设计 §7.8）。 */
export type QuitChoice = 'background' | 'stop' | 'cancel';

/** 「重启并更新」时还有活怎么办（架构设计 §2.6）：等活做完再装、现在停下来装，或取消。 */
export type UpdateChoice = 'wait' | 'now' | 'cancel';

/** 按钮的顺序：第一个是缺省（回车），最后一个是取消（Esc）。 */
const CHOICES: readonly QuitChoice[] = ['background', 'stop', 'cancel'];
const UPDATE_CHOICES: readonly UpdateChoice[] = ['wait', 'now', 'cancel'];

const BUTTONS: Record<QuitChoice, () => string> = {
  background: () => M.quitKeepRunning,
  stop: () => M.quitStop,
  cancel: () => M.cancel,
};

const UPDATE_BUTTONS: Record<UpdateChoice, () => string> = {
  wait: () => M.updateWait,
  now: () => M.updateNow,
  cancel: () => M.cancel,
};

/** 对话框里最多列几项远端调用，多出来的合成「还有 N 项」。 */
const REMOTE_SHOWN = 5;

/**
 * 退出前要不要问、问什么。自己起的 Runtime 手上还有活时，让用户选在后台继续、停止并退出或取消；没有活、问不到，或 Runtime
 * 不是自己起的（退出本来就不停它）时不问（null），照常退出。缺省是在后台继续：回车不会丢掉进行中的工作，活做完 Runtime 自己停。
 * 已经交给 Provider 的调用一并列出：停下也不会在那边取消，仍可能计费。
 */
export function quitPrompt(work: ActiveWork | null): MessageBoxOptions | null {
  return busyPrompt(work, M.quitBusyDetail, CHOICES.map((choice) => BUTTONS[choice]()), CHOICES.indexOf('cancel'));
}

/** 对话框的回答对应的选择；认不得的按取消。 */
export function quitChoice(response: number): QuitChoice {
  return CHOICES[response] ?? 'cancel';
}

/**
 * 「重启并更新」前要不要问、问什么（架构设计 §2.6）：自己起的 Runtime 手上还有活时，让用户选等任务结束后安装、现在停止并安装
 * 或取消，同样列出已经交给 Provider 的调用。缺省是等任务结束：回车不会中断进行中的工作。
 */
export function updatePrompt(work: ActiveWork | null): MessageBoxOptions | null {
  return busyPrompt(work, M.updateBusyDetail, UPDATE_CHOICES.map((choice) => UPDATE_BUTTONS[choice]()), UPDATE_CHOICES.indexOf('cancel'));
}

export function updateChoice(response: number): UpdateChoice {
  return UPDATE_CHOICES[response] ?? 'cancel';
}

/** 有没有要问的活：排队或运行中的 Job、没结束的 Agent 任务，或已经交出去的调用（它们总该属于前两种，这里不依赖这一点）。 */
export function hasActiveWork(work: ActiveWork | null): work is ActiveWork {
  return work !== null && work.jobs + work.tasks + work.remote.length > 0;
}

function busyPrompt(work: ActiveWork | null, detail: string, buttons: string[], cancelId: number): MessageBoxOptions | null {
  if (!hasActiveWork(work)) return null;
  return {
    type: 'warning',
    message: M.quitBusyTitle(Math.max(work.jobs + work.tasks, 1)),
    detail: detail + remoteLines(work.remote),
    buttons,
    defaultId: 0,
    cancelId,
    noLink: true,
  };
}

function remoteLines(remote: readonly RemoteCall[]): string {
  if (remote.length === 0) return '';
  const lines = remote.slice(0, REMOTE_SHOWN).map((call) => `• ${callName(call)} · ${call.provider}`);
  if (remote.length > REMOTE_SHOWN) lines.push(M.remoteMore(remote.length - REMOTE_SHOWN));
  return `\n\n${M.remoteHeading}\n${lines.join('\n')}`;
}

/** 调用出自哪里：固定流程的步骤名，否则任务种类的名字；没有任务记录的是 Agent 任务。 */
function callName(call: RemoteCall): string {
  if (call.step) return localizeText(call.step.label, call.step.labelRef);
  const kinds: MainMessages['callKind'] = M.callKind;
  if (call.kind === null) return kinds.agent;
  return Object.hasOwn(kinds, call.kind) ? kinds[call.kind as keyof typeof kinds] : kinds.task;
}
