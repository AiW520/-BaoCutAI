import type { Harness } from '@baocut/harness';
import { LINK_IMPORT_PIPELINE, type JobManager } from '@baocut/jobs';
import type { Id, JobRecord } from '@baocut/protocol';

/**
 * 会话标题跟着链接素材走（产品设计 §3.1、架构设计 §7.9）：会话里的智能体从链接下载，解析出平台给的标题时交给 Harness，
 * 由它决定要不要换掉按第一句话起的会话标题（`Harness.retitleFromMedia`）。每个任务只交一次；还没解析出标题的变化不算。
 */
export function retitleFromLinkImports(jobs: Pick<JobManager, 'onChange'>, harness: Pick<Harness, 'retitleFromMedia'>): () => void {
  const seen = new Set<Id>();
  return jobs.onChange((job) => {
    if (seen.has(job.jobId)) return;
    const found = linkImportTitle(job);
    if (!found) return;
    seen.add(job.jobId);
    harness.retitleFromMedia(found.conversationId, found.title);
  });
}

/**
 * 会话里的智能体提交的链接下载任务解析出的标题：完成时取结果摘要，之前取解析那一步的元数据。不是这种任务、或还没有标题时 null。
 */
export function linkImportTitle(job: Pick<JobRecord, 'submitter' | 'pipeline'>): { conversationId: Id; title: string } | null {
  if (job.submitter.kind !== 'agent' || job.pipeline?.name !== LINK_IMPORT_PIPELINE) return null;
  const metadata = job.pipeline.steps.find((step) => step.name === 'resolve')?.output?.metadata;
  const title =
    nonEmpty(job.pipeline.summary?.title) ??
    (metadata && typeof metadata === 'object' ? nonEmpty((metadata as Record<string, unknown>).title) : null);
  return title ? { conversationId: job.submitter.id, title } : null;
}

function nonEmpty(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}
