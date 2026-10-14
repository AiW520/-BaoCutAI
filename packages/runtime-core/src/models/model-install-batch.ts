import type { ModelInstallBatchPlan } from '@baocut/protocol';
import type { InstallPlanDetail, PlannedComponent } from '@baocut/models';

/** Runtime owns the unique download size, including resumed bytes and unknown-size estimates. */
export function mergeInstallPlans(
  details: readonly InstallPlanDetail[],
  locked: { models: boolean; tools: boolean },
): ModelInstallBatchPlan {
  const unique = new Map<string, { item: ModelInstallBatchPlan['components'][number]; detail: PlannedComponent }>();
  for (const detail of details) {
    detail.plan.components.forEach((component, i) => {
      const key = `${component.repo}@${component.revision}`;
      const previous = unique.get(key);
      const bundleIds = [...(previous?.item.bundleIds ?? []), detail.plan.bundleId];
      if (previous && (previous.item.action === 'keep' || component.action !== 'keep')) {
        previous.item.bundleIds = bundleIds;
        return;
      }
      unique.set(key, {
        item: { ...component, bundleIds, endpoint: detail.endpoints[key] ?? null,
          sourceLocked: component.origin === 'github-release' ? locked.tools : locked.models },
        detail: detail.components[i]!,
      });
    });
  }
  const items = [...unique.values()];
  const pending = items.filter((item) => item.item.action === 'download');
  const estimatedBytes = pending.reduce((sum, c) => sum + (c.detail.bytes ?? c.detail.estimatedBytes), 0);
  const downloadBytes = pending.some((c) => c.detail.bytes === null) ? null : estimatedBytes;
  const spaces = details.flatMap((d) => d.plan.availableBytes === null ? [] : [d.plan.availableBytes]);
  return {
    components: items.map((c) => c.item).sort((a, b) => Number(!!a.origin) - Number(!!b.origin)),
    downloadBytes, estimatedBytes, confirmBytes: downloadBytes ?? estimatedBytes,
    resumedBytes: pending.reduce((sum, c) => sum + c.detail.staged, 0),
    availableBytes: spaces.length ? Math.min(...spaces) : null,
    source: [...new Set(pending.map((c) => c.item.source).filter(Boolean))].join(' + '),
    upToDate: pending.length === 0,
  };
}
