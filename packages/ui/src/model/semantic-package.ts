import type { Id, ModelBundleStatus, SpaceEntry } from '@baocut/protocol';
import { isBundleInstalled } from './models-local.ts';
import { entryVideoId } from './space-index.ts';

/**
 * 设置 › 语义索引里的「语义搜索」一个包与「索引范围」一组（创作辅助集成设计 §2.11；设计稿 settings-semantic.jsx、
 * settings-semantic-scope.jsx）。
 *
 * - 文字模型与多模态模型（两个 `capability: 'embed'` 模型包，共用运行库）合成一个包：一起装、一起删；缺一个时是「补齐」。
 *   要装的先文字后多模态；要下载多少按缺的组件算，共用的只算一次。
 * - 索引范围是所有项目减去排除的：排除的项目里已经删掉的不再列；单独设了不索引的视频按 Space 条目取名字，Space 里找不到的
 *   （视频删了）不列。
 */

export const TEXT_BUNDLE = 'embeddinggemma2-text@litert-lm';

export type PackagePartKind = 'text' | 'multimodal';
export type PackageState = 'installed' | 'partial' | 'notInstalled' | 'unsupported';

export interface PackagePart {
  bundle: ModelBundleStatus;
  kind: PackagePartKind;
  installed: boolean;
}

export interface PackageView {
  /** 先文字后多模态。 */
  parts: PackagePart[];
  state: PackageState;
  /** 还要装的，按装的先后。 */
  queue: ModelBundleStatus[];
  /** 正在下载的那一个；没有时 null。 */
  running: ModelBundleStatus | null;
  /** 有一个下到一半停着（再装是续传）。 */
  paused: boolean;
  /** 还要下载多少；有不知道大小的部分时 null。 */
  bytes: number | null;
}

export function packageView(bundles: readonly ModelBundleStatus[]): PackageView {
  const parts: PackagePart[] = bundles
    .map((bundle) => ({
      bundle,
      kind: (bundle.bundleId === TEXT_BUNDLE ? 'text' : 'multimodal') as PackagePartKind,
      installed: isBundleInstalled(bundle),
    }))
    .sort((a, b) => (a.kind === b.kind ? 0 : a.kind === 'text' ? -1 : 1));
  const queue = parts.filter((p) => !p.installed && p.bundle.reason !== 'unsupported').map((p) => p.bundle);
  const running = parts.find((p) => p.bundle.install && p.bundle.install.state !== 'paused')?.bundle ?? null;
  const paused = parts.some((p) => p.bundle.install?.state === 'paused');
  const state: PackageState =
    parts.length > 0 && parts.every((p) => p.bundle.reason === 'unsupported')
      ? 'unsupported'
      : parts.length > 0 && parts.every((p) => p.installed)
        ? 'installed'
        : parts.some((p) => p.installed)
          ? 'partial'
          : 'notInstalled';
  return { parts, state, queue, running, paused, bytes: missingBytes(queue) };
}

function missingBytes(bundles: readonly ModelBundleStatus[]): number | null {
  if (bundles.length === 0) return null;
  const seen = new Set<string>();
  let total = 0;
  for (const bundle of bundles) {
    if (!bundle.components?.length) {
      if (bundle.estimatedBytes == null) return null;
      total += bundle.estimatedBytes;
      continue;
    }
    for (const c of bundle.components) {
      if (c.state !== 'missing') continue;
      const key = `${c.repo}@${c.revision}`;
      if (seen.has(key)) continue;
      seen.add(key);
      if (c.estimatedBytes == null) return null;
      total += c.estimatedBytes;
    }
  }
  return total || null;
}

export interface ScopeProject {
  id: Id;
  name: string;
}

/** 排除的项目里还在的（按项目列表的先后）；单独不索引的视频里 Space 还有的。 */
export function scopeView(
  projects: readonly ScopeProject[],
  excludedProjects: readonly Id[],
  excludedVideos: readonly Id[],
  entries: readonly SpaceEntry[],
): { projects: number; excluded: ScopeProject[]; videos: { id: Id; name: string }[] } {
  const excludedSet = new Set(excludedProjects);
  const excluded = projects.filter((p) => excludedSet.has(p.id));
  const names = new Map<Id, string>();
  for (const entry of entries) {
    const id = entryVideoId(entry);
    if (id && !entry.user.trashedAt && !names.has(id)) names.set(id, entry.user.displayName ?? entry.name);
  }
  const videos = excludedVideos.flatMap((id) => {
    const name = names.get(id);
    return name === undefined ? [] : [{ id, name }];
  });
  return { projects: projects.length, excluded, videos };
}
