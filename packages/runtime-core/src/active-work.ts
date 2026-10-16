import type { Id, JobKind, JobRecord, MessageRef, ModelCapabilitiesView } from '@baocut/protocol';

/**
 * 已经交给在线或智能体 Provider 的一次调用（架构设计 §2.2 退出）：数据已经交出，停下 Runtime 也可能还在那边执行或计费。
 * 桌面端退出前列给用户看。
 */
export interface RemoteCall {
  /** 发起调用的任务的种类；进程内、没有任务记录的调用为 null。 */
  kind: JobKind | null;
  /** 接收方的名字（模型服务视图里的 Provider 名；找不到时是 providerId）。 */
  provider: string;
  /** 固定流程的步骤名（步骤里的调用）。 */
  step?: { label: string; labelRef?: MessageRef };
}

/** Runtime 手上的活（§2.2，桌面端经 IPC 问）。 */
export interface ActiveWork {
  /** 排队或运行中的 Job（含历史版本迁移）。 */
  jobs: number;
  /** 运行中或停止中的 Agent 任务。 */
  tasks: number;
  remote: RemoteCall[];
}

/**
 * 在途的外发调用（授权账本里开始了、还没结算的预留）对上任务与 Provider 名。同一任务交给同一接收方的几次调用（流程步骤逐批调用）
 * 只算一项。任务与模型服务视图只在有在途调用时才取（空闲检查也问手上的活）。
 */
export function remoteCalls(
  inFlight: readonly { jobId: Id | null; recipient: string }[],
  jobs: () => readonly JobRecord[],
  view: () => ModelCapabilitiesView,
): RemoteCall[] {
  if (inFlight.length === 0) return [];
  const byId = new Map(jobs().map((job) => [job.jobId, job]));
  const labels = new Map<string, string>();
  for (const capability of Object.values(view())) for (const provider of capability.providers) labels.set(provider.providerId, provider.label);
  const seen = new Set<string>();
  const out: RemoteCall[] = [];
  for (const { jobId, recipient } of inFlight) {
    const key = `${jobId ?? ''}\u0000${recipient}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const job = jobId ? byId.get(jobId) : undefined;
    const step = job?.step;
    out.push({
      kind: job?.kind ?? null,
      provider: labels.get(recipient) ?? recipient,
      ...(step ? { step: { label: step.label, ...(step.labelRef ? { labelRef: step.labelRef } : {}) } } : {}),
    });
  }
  return out;
}
