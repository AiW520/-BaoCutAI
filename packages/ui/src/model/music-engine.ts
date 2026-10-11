import { localizeToolStatus, type ExternalToolStatus } from '@baocut/protocol';
import { TOOL_SOURCE_LABEL } from './link-import.ts';
import { M } from './music-engine-copy.ts';
import { formatBytes } from './space.ts';
import { shortenPath } from './format.ts';

/**
 * 设置 › 音乐生成的「音乐引擎」一行（设计稿 model-local-check.js `engineView`、settings-model-check.jsx `MusicEngineRow`）。
 * 引擎是受管外部工具 `audiocpp`（架构设计 §12.9）：不随应用分发，用户点「安装引擎」才经 `externalTools.install` 下载上游的
 * 预编译包；进度读 `jobs` 主题里那条 `toolInstall` 任务。这里只把 `externalTools.detect` 的结果换成这一行的状态与说法。
 */

/** 受管外部工具里音乐引擎的名字（与 `@baocut/models` 的 `AUDIO_CPP_TOOL` 一致）。 */
export const MUSIC_ENGINE_TOOL = 'audiocpp';

export type EngineCardState = 'checking' | 'unknown' | 'install' | 'installing' | 'blocked' | 'broken' | 'ready';

export interface EngineCard {
  state: EngineCardState;
  body: string;
  /** 主按钮（安装引擎 / 重新安装引擎）；没有时 null。 */
  action: string | null;
  /** 版本、大小、许可与来源，或此刻用的那一份与它的路径；一行一项。 */
  facts: string[];
}

function offerFacts(status: ExternalToolStatus): string[] {
  const o = status.offer;
  if (!o) return [];
  const size = o.sizeBytes ?? o.estimatedBytes;
  let from = '';
  try {
    from = o.url ? new URL(o.url).host : '';
  } catch {
    from = '';
  }
  return [M.factVersion(o.version, size ? formatBytes(size) : null), M.factSource(o.license, from || null)];
}

function usedFacts(status: ExternalToolStatus): string[] {
  const where = [status.version ? `audio.cpp ${status.version}` : 'audio.cpp', status.source ? TOOL_SOURCE_LABEL[status.source] : null]
    .filter(Boolean)
    .join(' · ');
  return [where, status.path ? shortenPath(status.path) : null].filter((f): f is string => !!f);
}

/** 下载包要 Vulkan 显卡驱动的平台（Windows 与 Linux 的包是 Vulkan 版）；判断不了平台时也提一句。 */
const needsVulkan = (status: ExternalToolStatus) => status.platform !== 'darwin';

/**
 * 这一行的状态。`checking` 是正在检测，`installing` 是用户刚按了安装、任务事件还没到，`error` 是检测本身的失败
 * （Runtime 没连上等）。由环境变量、用户指定的路径或随应用分发的那一份决定而不能运行时不给安装：换一份下载的也不会被用到。
 */
export function engineCard(probed: ExternalToolStatus | null | undefined, opts: { checking: boolean; installing: boolean; error?: string | null }): EngineCard {
  const status = probed && localizeToolStatus(probed);
  if (!status) {
    if (opts.checking || !opts.error) return { state: 'checking', body: M.checkingBody, action: null, facts: [] };
    return { state: 'unknown', body: M.unknownBody(opts.error), action: null, facts: [] };
  }
  if (opts.installing || status.installJobId) return { state: 'installing', body: M.installingBody, action: null, facts: offerFacts(status) };
  if (status.state === 'installed') return { state: 'ready', body: M.readyBody, action: null, facts: usedFacts(status) };
  const blocked = !status.installable || !status.offer || !!status.offer.blockedReason;
  const why = status.offer?.blockedReason ?? status.remedy ?? status.reason ?? M.blockedWhy;
  if (status.state === 'missing') {
    if (blocked) return { state: 'blocked', body: M.blockedBody(why), action: null, facts: [] };
    return { state: 'install', body: needsVulkan(status) ? `${M.installBody} ${M.vulkanNote}` : M.installBody, action: M.install, facts: offerFacts(status) };
  }
  const body = M.brokenBody(status.reason, status.remedy);
  const pinned = status.source === 'env' || status.source === 'user' || status.source === 'bundled';
  if (blocked || pinned) return { state: 'blocked', body, action: null, facts: usedFacts(status) };
  return { state: 'broken', body, action: M.reinstall, facts: offerFacts(status) };
}
