import type { MessageBoxOptions } from 'electron';
import { M } from './main-copy.ts';
import type { ActiveWork } from './runtime-supervisor.ts';

/** 退出时怎么处理自己起的 Runtime（架构设计 §2.2、产品设计 §7.8）。 */
export type QuitChoice = 'background' | 'stop' | 'cancel';

/** 按钮的顺序：第一个是缺省（回车），最后一个是取消（Esc）。 */
const CHOICES: readonly QuitChoice[] = ['background', 'stop', 'cancel'];

const BUTTONS: Record<QuitChoice, () => string> = {
  background: () => M.quitKeepRunning,
  stop: () => M.quitStop,
  cancel: () => M.cancel,
};

/**
 * 退出前要不要问、问什么。自己起的 Runtime 手上还有活时，让用户选在后台继续、停止并退出或取消；没有活、问不到，或 Runtime
 * 不是自己起的（退出本来就不停它）时不问（null），照常退出。缺省是在后台继续：回车不会丢掉进行中的工作，活做完 Runtime 自己停。
 */
export function quitPrompt(work: ActiveWork | null): MessageBoxOptions | null {
  const count = work ? work.jobs + work.tasks : 0;
  if (count === 0) return null;
  return {
    type: 'warning',
    message: M.quitBusyTitle(count),
    detail: M.quitBusyDetail,
    buttons: CHOICES.map((choice) => BUTTONS[choice]()),
    defaultId: 0,
    cancelId: CHOICES.indexOf('cancel'),
    noLink: true,
  };
}

/** 对话框的回答对应的选择；认不得的按取消。 */
export function quitChoice(response: number): QuitChoice {
  return CHOICES[response] ?? 'cancel';
}
