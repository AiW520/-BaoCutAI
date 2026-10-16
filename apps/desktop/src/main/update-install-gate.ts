import { hasActiveWork, type UpdateChoice } from './quit-prompt.ts';
import type { ActiveWork } from './runtime-supervisor.ts';

/** 选了「等任务结束后安装」之后多久问一次 Runtime 手上的活。 */
const POLL_MS = 5_000;

export interface InstallGateDeps {
  /** 自己起的 Runtime 手上的活；Runtime 不是自己起的、已经退出或问不到时 null（没有要等的）。 */
  activeWork(): Promise<ActiveWork | null>;
  /** 有活时问用户（`updatePrompt` 的对话框）。 */
  ask(work: ActiveWork): Promise<UpdateChoice>;
  /** 更新还在「已下载」：等待期间被取消、出错或在装了，就不再等。 */
  ready(): boolean;
  /** 应用正在退出（退出对话框开着或在停 Runtime）：这一拍不装，免得换包程序等一个可能被取消的退出。 */
  quitting(): boolean;
  schedule(run: () => void, ms: number): () => void;
  pollMs?: number;
}

export interface InstallRequest {
  /** 开始安装（`AppUpdateService.install`）。 */
  install(): Promise<void>;
  /** 这次安装会不会停下应用（这台机器能自己换包）；不会的只显示安装包、打开下载页，不必问。 */
  willRestart(): Promise<boolean>;
}

export interface InstallGate {
  /** 「重启并更新」：手上没活直接装；有活时问用户，按选择现在装、等活做完再装或作罢。再点一次重新问。 */
  request(request: InstallRequest): Promise<void>;
  /** 不再等（应用要退出了）：之后到点的检查与问完的回答都作废。 */
  cancel(): void;
}

/**
 * 「重启并更新」的停止屏障（架构设计 §2.6）：安装要换掉正在运行的 Runtime，先看它手上的活。选「现在停止并安装」照常安装，
 * 应用退出时按 §2.4 停下 Runtime（换包程序在等，退出不再问）；选「等任务结束后安装」时每隔几秒问一次，活做完（或 Runtime
 * 不在了）再装。
 */
export function createInstallGate(deps: InstallGateDeps): InstallGate {
  const pollMs = deps.pollMs ?? POLL_MS;
  /** 每次请求与取消加一：晚到的回答与检查对不上就丢。 */
  let generation = 0;
  let unschedule: (() => void) | null = null;

  const stopWaiting = () => {
    unschedule?.();
    unschedule = null;
  };

  const wait = (token: number, request: InstallRequest) => {
    unschedule = deps.schedule(() => {
      unschedule = null;
      void poll(token, request);
    }, pollMs);
  };

  const poll = async (token: number, request: InstallRequest) => {
    if (token !== generation || !deps.ready()) return;
    if (deps.quitting()) return wait(token, request);
    const work = await deps.activeWork();
    if (token !== generation || !deps.ready()) return;
    if (hasActiveWork(work) || deps.quitting()) return wait(token, request);
    await request.install();
  };

  return {
    async request(request) {
      stopWaiting();
      const token = ++generation;
      // 装不了（不在「已下载」，`install` 什么都不做）或不会停下应用的，不必问。
      if (!deps.ready() || !(await request.willRestart())) return request.install();
      const work = await deps.activeWork();
      if (token !== generation) return;
      if (!hasActiveWork(work)) return request.install();
      const choice = await deps.ask(work);
      if (token !== generation) return;
      if (choice === 'now') return request.install();
      if (choice === 'wait') wait(token, request);
    },
    cancel() {
      generation += 1;
      stopWaiting();
    },
  };
}
